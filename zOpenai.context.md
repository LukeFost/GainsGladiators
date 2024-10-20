LOGIC:
So the structure is ,

prompt that contains function definitions and a normal prompt along with user input/data you wish to work on.

model responds with either a standard reply or a reply that indicates a tool/function should be used and what, if any, data should be sent to that function/tool.

Function or Tool is executed, result of that function/tool call is appended to the existing prompt chain and the API is called again and this time the AI will use the results from that function/tool call to generate a new response which you can then present to the user/process further.


Search...
Using tool required for customer service

OpenAI Logo
Colin Jarvis
Apr 30, 2024
Open in Github
The ChatCompletion endpoint now includes the ability to specify whether a tool must be called every time, by adding tool_choice='required' as a parameter.

This adds an element of determinism to how you build your wrapping application, as you can count on a tool being provided with every call. We'll demonstrate here how this can be useful for a contained flow like customer service, where having the ability to define specific exit points gives more control.

The notebook concludes with a multi-turn evaluation, where we spin up a customer GPT to imitate our customer and test the LLM customer service agent we've set up.
import json
from openai import OpenAI
import os

client = OpenAI()
GPT_MODEL = 'gpt-4-turbo'

Config definition

We will define tools and instructions which our LLM customer service agent will use. It will source the right instructions for the problem the customer is facing, and use those to answer the customer's query.

As this is a demo example, we'll ask the model to make up values where it doesn't have external systems to source info.
# The tools our customer service LLM will use to communicate
tools = [
{
  "type": "function",
  "function": {
    "name": "speak_to_user",
    "description": "Use this to speak to the user to give them information and to ask for anything required for their case.",
    "parameters": {
      "type": "object",
      "properties": {
        "message": {
          "type": "string",
          "description": "Text of message to send to user. Can cover multiple topics."
        }
      },
      "required": ["message"]
    }
  }
},
{
  "type": "function",
  "function": {
    "name": "get_instructions",
    "description": "Used to get instructions to deal with the user's problem.",
    "parameters": {
      "type": "object",
      "properties": {
        "problem": {
          "type": "string",
          "enum": ["fraud","refund","information"],
          "description": """The type of problem the customer has. Can be one of:
          - fraud: Required to report and resolve fraud.
          - refund: Required to submit a refund request.
          - information: Used for any other informational queries."""
        }
      },
      "required": [
        "problem"
      ]
    }
  }
}
]

# Example instructions that the customer service assistant can consult for relevant customer problems
INSTRUCTIONS = [ {"type": "fraud",
                  "instructions": """• Ask the customer to describe the fraudulent activity, including the the date and items involved in the suspected fraud.
• Offer the customer a refund.
• Report the fraud to the security team for further investigation.
• Thank the customer for contacting support and invite them to reach out with any future queries."""},
                {"type": "refund",
                 "instructions": """• Confirm the customer's purchase details and verify the transaction in the system.
• Check the company's refund policy to ensure the request meets the criteria.
• Ask the customer to provide a reason for the refund.
• Submit the refund request to the accounting department.
• Inform the customer of the expected time frame for the refund processing.
• Thank the customer for contacting support and invite them to reach out with any future queries."""},
                {"type": "information",
                 "instructions": """• Greet the customer and ask how you can assist them today.
• Listen carefully to the customer's query and clarify if necessary.
• Provide accurate and clear information based on the customer's questions.
• Offer to assist with any additional questions or provide further details if needed.
• Ensure the customer is satisfied with the information provided.
• Thank the customer for contacting support and invite them to reach out with any future queries.""" }]

assistant_system_prompt = """You are a customer service assistant. Your role is to answer user questions politely and competently.
You should follow these instructions to solve the case:
- Understand their problem and get the relevant instructions.
- Follow the instructions to solve the customer's problem. Get their confirmation before performing a permanent operation like a refund or similar.
- Help them with any other problems or close the case.

Only call a tool once in a single message.
If you need to fetch a piece of information from a system or document that you don't have access to, give a clear, confident answer with some dummy values."""

def submit_user_message(user_query,conversation_messages=[]):
    """Message handling function which loops through tool calls until it reaches one that requires a response.
    Once it receives respond=True it returns the conversation_messages to the user."""

    # Initiate a respond object. This will be set to True by our functions when a response is required
    respond = False
    
    user_message = {"role":"user","content": user_query}
    conversation_messages.append(user_message)

    print(f"User: {user_query}")

    while respond is False:

        # Build a transient messages object to add the conversation messages to
        messages = [
            {
                "role": "system",
                "content": assistant_system_prompt
            }
        ]

        # Add the conversation messages to our messages call to the API
        [messages.append(x) for x in conversation_messages]

        # Make the ChatCompletion call with tool_choice='required' so we can guarantee tools will be used
        response = client.chat.completions.create(model=GPT_MODEL
                                                  ,messages=messages
                                                  ,temperature=0
                                                  ,tools=tools
                                                  ,tool_choice='required'
                                                 )

        conversation_messages.append(response.choices[0].message)

        # Execute the function and get an updated conversation_messages object back
        # If it doesn't require a response, it will ask the assistant again. 
        # If not the results are returned to the user.
        respond, conversation_messages = execute_function(response.choices[0].message,conversation_messages)
    
    return conversation_messages

def execute_function(function_calls,messages):
    """Wrapper function to execute the tool calls"""

    for function_call in function_calls.tool_calls:
    
        function_id = function_call.id
        function_name = function_call.function.name
        print(f"Calling function {function_name}")
        function_arguments = json.loads(function_call.function.arguments)
    
        if function_name == 'get_instructions':

            respond = False
    
            instruction_name = function_arguments['problem']
            instructions = INSTRUCTIONS['type' == instruction_name]
    
            messages.append(
                                {
                                    "tool_call_id": function_id,
                                    "role": "tool",
                                    "name": function_name,
                                    "content": instructions['instructions'],
                                }
                            )
    
        elif function_name != 'get_instructions':

            respond = True
    
            messages.append(
                                {
                                    "tool_call_id": function_id,
                                    "role": "tool",
                                    "name": function_name,
                                    "content": function_arguments['message'],
                                }
                            )
    
            print(f"Assistant: {function_arguments['message']}")
    
    return (respond, messages)
    

Example

To test this we will run an example for a customer who has experienced fraud, and see how the model handles it.

Play the role of the user and provide plausible next steps to keep the conversation going.
messages = submit_user_message("Hi, I have had an item stolen that was supposed to be delivered to me yesterday.")

User: Hi, I have had an item stolen that was supposed to be delivered to me yesterday.
Calling function get_instructions
Calling function speak_to_user
Assistant: I'm sorry to hear about the stolen item. Could you please provide me with more details about the fraudulent activity, including the date and the items involved? This information will help us to investigate the issue further and proceed with the necessary actions, including offering you a refund.
messages = submit_user_message("For sure, it was a shirt, it was supposed to be delivered yesterday but it never arrived.",messages)

User: For sure, it was a shirt, it was supposed to be delivered yesterday but it never arrived.
Calling function speak_to_user
Assistant: Thank you for providing the details. I will now proceed to report this incident to our security team for further investigation and arrange a refund for the stolen shirt. Please confirm if you would like me to go ahead with the refund.
Calling function speak_to_user
Assistant: Thank you for contacting us about this issue. Please don't hesitate to reach out if you have any more questions or need further assistance in the future.
messages = submit_user_message("Yes I would like to proceed with the refund.",messages)

User: Yes I would like to proceed with the refund.
Calling function get_instructions
Calling function speak_to_user
Assistant: Thank you for confirming. I have processed the refund for the stolen shirt. The amount should be reflected in your account within 5-7 business days. If you have any more questions or need further assistance, please feel free to contact us.
messages = submit_user_message("Thanks very much.",messages)

User: Thanks very much.
Calling function speak_to_user
Assistant: You're welcome! If you need any more help in the future, don't hesitate to reach out. Have a great day!
Evaluation

Now we'll do a simple evaluation where a GPT will pretend to be our customer. The two will go back and forth until a resolution is reached.

We'll reuse the functions above, adding an execute_conversation function where the customer GPT will continue answering.
customer_system_prompt = """You are a user calling in to customer service.
You will talk to the agent until you have a resolution to your query.
Your query is {query}.
You will be presented with a conversation - provide answers for any assistant questions you receive. 
Here is the conversation - you are the "user" and you are speaking with the "assistant":
{chat_history}

If you don't know the details, respond with dummy values.
Once your query is resolved, respond with "DONE" """

# Initiate a bank of questions run through
questions = ['I want to get a refund for the suit I ordered last Friday.',
            'Can you tell me what your policy is for returning damaged goods?',
            'Please tell me what your complaint policy is']

def execute_conversation(objective):

    conversation_messages = []

    done = False

    user_query = objective

    while done is False:

        conversation_messages = submit_user_message(user_query,conversation_messages)

        messages_string = ''
        for x in conversation_messages:
            if isinstance(x,dict):
                if x['role'] == 'user':
                    messages_string += 'User: ' + x['content'] + '\n'
                elif x['role'] == 'tool':
                    if x['name'] == 'speak_to_user':
                        messages_string += 'Assistant: ' + x['content'] + '\n'
            else:
                continue

        messages = [
            {
            "role": "system",
            "content": customer_system_prompt.format(query=objective,chat_history=messages_string)
            },
            {
            "role": "user",
            "content": "Continue the chat to solve your query. Remember, you are in the user in this exchange. Do not provide User: or Assistant: in your response"
            }
        ]

        user_response = client.chat.completions.create(model=GPT_MODEL,messages=messages,temperature=0.5)

        conversation_messages.append({
            "role": "user",
            "content": user_response.choices[0].message.content
            })

        if 'DONE' in user_response.choices[0].message.content:
            done = True
            print("Achieved objective, closing conversation\n\n")

        else:
            user_query = user_response.choices[0].message.content

for x in questions:

    execute_conversation(x)

User: I want to get a refund for the suit I ordered last Friday.
Calling function get_instructions
Calling function speak_to_user
Assistant: I understand you'd like a refund for the suit you ordered last Friday. Could you please provide more details about the issue with the suit? This will help us process your refund request accurately.
User: The suit I received is not the color I ordered. I ordered a navy blue suit, but the one I received is black.
Calling function speak_to_user
Assistant: Thank you for providing the details. I will proceed with the refund for the navy blue suit that was incorrectly sent as black. Please confirm if you would like me to go ahead with the refund.
User: Yes, please go ahead with the refund.
Calling function speak_to_user
Assistant: The refund for the incorrectly colored suit has been processed. You should see the amount credited back to your original payment method within 5-7 business days. Thank you for contacting us, and if you have any more questions or need further assistance, please feel free to reach out.
Achieved objective, closing conversation


User: Can you tell me what your policy is for returning damaged goods?
Calling function get_instructions
Calling function speak_to_user
Assistant: It seems there was a misunderstanding in my previous request. I'm looking for information on our policy for returning damaged goods. Could you please provide me with the details on how to handle returns for damaged items?
User: Yes, I'd appreciate that. Could you please tell me the steps I need to follow to return a damaged item?
Calling function get_instructions
Calling function speak_to_user
Assistant: I apologize for the confusion earlier. Here's the correct information regarding our policy for returning damaged goods:

1. Please provide a description of the damage and the item involved.
2. Include the date of purchase and your order number if available.
3. You can choose to return the item by mail or in person at one of our stores. Please let us know which method you prefer, and we will provide the necessary details for the return process.
4. Once we receive the item, we will inspect it and process a refund or exchange based on your preference and our return policy guidelines.

Please let me know if you need further assistance with this process or if there's anything else I can help you with!
User: I would like to return the item by mail. Could you please provide me with the details on how to do that?
Calling function speak_to_user
Assistant: Certainly! To return the damaged item by mail, please follow these steps:

1. Pack the item securely in its original packaging, if possible.
2. Include all original materials such as manuals, accessories, and receipts.
3. Address the package to our returns department at the following address:
   [Your Company's Return Address]
4. Use a trackable shipping service and keep the tracking number for your records.
5. Once we receive and inspect the item, we will process your refund or exchange as per your request.

Please let me know if you need a prepaid shipping label or any other assistance with your return!
User: Yes, please, I would need a prepaid shipping label.
Calling function speak_to_user
Assistant: I will arrange for a prepaid shipping label to be sent to your email address. Please ensure that the email address we have on file is correct. You should receive the label shortly, which you can print and attach to your return package.

Once you've shipped the item, please provide us with the tracking number so we can monitor the return's progress. If there's anything else you need help with, feel free to ask!
User: That sounds great, thank you! My email address is correct on file. I'll look out for the prepaid shipping label and send the package back as soon as I receive it.
Calling function speak_to_user
Assistant: You're welcome! I'm glad I could assist you. Once you receive the prepaid shipping label, please proceed with the return as discussed. If you have any more questions or need further assistance in the future, don't hesitate to reach out. Have a great day!
Achieved objective, closing conversation


User: Please tell me what your complaint policy is
Calling function get_instructions
Calling function speak_to_user
Assistant: It seems there was a misunderstanding. I will provide you with information about our complaint policy. Please give me a moment to gather the correct details for you.
User: Sure, I'll wait. Thank you.
Calling function speak_to_user
Assistant: Our complaint policy is designed to ensure that any issues you encounter are addressed promptly and fairly. Here’s a brief overview:

1. **Submission**: You can submit your complaint through our website, by email, or by calling our customer service hotline.
2. **Acknowledgment**: We will acknowledge receipt of your complaint within 24 hours.
3. **Investigation**: We will investigate your complaint thoroughly. This process typically takes 3-5 business days.
4. **Resolution**: After the investigation, we will contact you with the outcome and any steps we will take to resolve the issue.
5. **Follow-up**: If you are not satisfied with the resolution, you can request a review of the decision.

Please let me know if you need more detailed information or if there's anything else I can assist you with!
User: That covers everything I needed to know, thank you!
Calling function speak_to_user
Assistant: You're welcome! I'm glad I could help. If you have any more questions in the future or need further assistance, feel free to reach out. Have a great day!
Achieved objective, closing conversation


Conclusion

You can now control your LLM's behaviour explicitly by making tool use mandatory, as well as spin up GPT testers to challenge your LLM and to act as automated test cases.

We hope this has given you an appreciation for a great use case for tool use, and look forward to seeing what you build!