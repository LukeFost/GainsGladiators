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


Generate text from a prompt
OpenAI provides simple APIs to use a large language model to generate text from a prompt, as you might using ChatGPT. These models have been trained on vast quantities of data to understand multimedia inputs and natural language instructions. From these prompts, models can generate almost any kind of text response, like code, mathematical equations, structured JSON data, or human-like prose.

Quickstart
To generate text, you can use the chat completions endpoint in the REST API, as seen in the examples below. You can either use the REST API from the HTTP client of your choice, or use one of OpenAI's official SDKs for your preferred programming language.

Generate JSON data based on a JSON Schema
javascript

import OpenAI from "openai";
const openai = new OpenAI();

const completion = await openai.chat.completions.create({
    model: "gpt-4o-2024-08-06",
    messages: [
        { role: "system", content: "You extract email addresses into JSON data." },
        {
            role: "user",
            content: "Feeling stuck? Send a message to help@mycompany.com.",
        },
    ],
    response_format: {
        // See /docs/guides/structured-outputs
        type: "json_schema",
        json_schema: {
            name: "email_schema",
            schema: {
                type: "object",
                properties: {
                    email: {
                        description: "The email address that appears in the input",
                        type: "string"
                    }
                },
                additionalProperties: false
            }
        }
    }
});

console.log(completion.choices[0].message.content);
Choosing a model
When making a text generation request, the first option to configure is which model you want to generate the response. The model you choose can greatly influence the output, and impact how much each generation request costs.

A large model like gpt-4o will offer a very high level of intelligence and strong performance, while having a higher cost per token.
A small model like gpt-4o-mini offers intelligence not quite on the level of the larger model, but is faster and less expensive per token.
A reasoning model like the o1 family of models is slower to return a result, and uses more tokens to "think", but is capable of advanced reasoning, coding, and multi-step planning.
Experiment with different models in the Playground to see which one works best for your prompts! More information on choosing a model can also be found here.

Building prompts
The process of crafting prompts to get the right output from a model is called prompt engineering. By giving the model precise instructions, examples, and necessary context information (like private or specialized information that wasn't included in the model's training data), you can improve the quality and accuracy of the model's output. Here, we'll get into some high-level guidance on building prompts, but you might also find the prompt engineering guide helpful.

In the chat completions API, you create prompts by providing an array of messages that contain instructions for the model. Each message can have a different role, which influences how the model might interpret the input.

User messages
User messages contain instructions that request a particular type of output from the model. You can think of user messages as the messages you might type in to ChatGPT as an end user.

Here's an example of a user message prompt that asks the gpt-4o model to generate a haiku poem based on a prompt.

const response = await openai.chat.completions.create({
  model: "gpt-4o",
  messages: [
    {
      "role": "user",
      "content": [
        {
          "type": "text",
          "text": "Write a haiku about programming."
        }
      ]
    }
  ]
});
System messages
Messages with the system role act as top-level instructions to the model, and typically describe what the model is supposed to do and how it should generally behave and respond.

Here's an example of a system message that modifies the behavior of the model when generating a response to a user message:

const response = await openai.chat.completions.create({
  model: "gpt-4o",
  messages: [
    {
      "role": "system",
      "content": [
        {
          "type": "text",
          "text": `
            You are a helpful assistant that answers programming questions 
            in the style of a southern belle from the southeast United States.
          `
        }
      ]
    },
    {
      "role": "user",
      "content": [
        {
          "type": "text",
          "text": "Are semicolons optional in JavaScript?"
        }
      ]
    }
  ]
});
This prompt returns a text output in the rhetorical style requested:

Well, sugar, that's a fine question you've got there! Now, in the world of 
JavaScript, semicolons are indeed a bit like the pearls on a necklace – you 
might slip by without 'em, but you sure do look more polished with 'em in place. 

Technically, JavaScript has this little thing called "automatic semicolon 
insertion" where it kindly adds semicolons for you where it thinks they 
oughta go. However, it's not always perfect, bless its heart. Sometimes, it 
might get a tad confused and cause all sorts of unexpected behavior.
Assistant messages
Messages with the assistant role are presumed to have been generated by the model, perhaps in a previous generation request (see the "Conversations" section below). They can also be used to provide examples to the model for how it should respond to the current request - a technique known as few-shot learning.

Here's an example of using an assistant message to capture the results of a previous text generation result, and making a new request based on that.

const response = await openai.chat.completions.create({
  model: "gpt-4o",
  messages: [
    {
      "role": "user",
      "content": [{ "type": "text", "text": "knock knock." }]
    },
    {
      "role": "assistant",
      "content": [{ "type": "text", "text": "Who's there?" }]
    },
    {
      "role": "user",
      "content": [{ "type": "text", "text": "Orange." }]
    }
  ]
});
Giving the model additional data to use for generation
The message types above can also be used to provide additional information to the model which may be outside its training data. You might want to include the results of a database query, a text document, or other resources to help the model generate a relevant response. This technique is often referred to as retrieval augmented generation, or RAG. Learn more about RAG techniques here.

Conversations and context
While each text generation request is independent and stateless (unless you are using assistants), you can still implement multi-turn conversations by providing additional messages as parameters to your text generation request. Consider the "knock knock" joke example shown above:

const response = await openai.chat.completions.create({
  model: "gpt-4o",
  messages: [
    {
      "role": "user",
      "content": [{ "type": "text", "text": "knock knock." }]
    },
    {
      "role": "assistant",
      "content": [{ "type": "text", "text": "Who's there?" }]
    },
    {
      "role": "user",
      "content": [{ "type": "text", "text": "Orange." }]
    }
  ]
});
By using alternating user and assistant messages, you can capture the previous state of a conversation in one request to the model.

Managing context for text generation
As your inputs become more complex, or you include more and more turns in a conversation, you will need to consider both output token and context window limits. Model inputs and outputs are metered in tokens, which are parsed from inputs to analyze their content and intent, and assembled to render logical outputs. Models have limits on how many tokens can be used during the lifecycle of a text generation request.

Output tokens are the tokens that are generated by a model in response to a prompt. Each model supports different limits for output tokens, documented here. For example, gpt-4o-2024-08-06 can generate a maximum of 16,384 output tokens.
A context window describes the total tokens that can be used for both input tokens and output tokens (and for some models, reasoning tokens), documented here. For example, gpt-4o-2024-08-06 has a total context window of 128k tokens.
If you create a very large prompt (usually by including a lot of conversation context or additional data/examples for the model), you run the risk of exceeding the allocated context window for a model, which might result in truncated outputs.

You can use the tokenizer tool (which uses the tiktoken library) to see how many tokens are present in a string of text.

Optimizing model outputs
As you iterate on your prompts, you will be continually trying to improve accuracy, cost, and latency.

GOAL	AVAILABLE TECHNIQUES
Accuracy

Ensure the model produces accurate and useful responses to your prompts.

Accurate responses require that the model has all the information it needs to generate a response, and knows how to go about creating a response (from interpreting input to formatting and styling). Often, this will require a mix of prompt engineering, RAG, and model fine-tuning.

Learn about optimizing for accuracy here.

Cost

Drive down the total cost of model usage by reducing token usage and using cheaper models when possible.

To control costs, you can try to use fewer tokens or smaller, cheaper models. Learn more about optimizing for cost here.

Latency

Decrease the time it takes to generate responses to your prompts.

Optimzing latency is a multi-faceted process including prompt engineering, parallelism in your own code, and more. Learn more here.


Embeddings

Learn how to turn text into numbers, unlocking use cases like search.

New embedding models

text-embedding-3-small and text-embedding-3-large, our newest and most performant embedding models are now available, with lower costs, higher multilingual performance, and new parameters to control the overall size.
What are embeddings?
OpenAI’s text embeddings measure the relatedness of text strings. Embeddings are commonly used for:

Search (where results are ranked by relevance to a query string)
Clustering (where text strings are grouped by similarity)
Recommendations (where items with related text strings are recommended)
Anomaly detection (where outliers with little relatedness are identified)
Diversity measurement (where similarity distributions are analyzed)
Classification (where text strings are classified by their most similar label)
An embedding is a vector (list) of floating point numbers. The distance between two vectors measures their relatedness. Small distances suggest high relatedness and large distances suggest low relatedness.

Visit our pricing page to learn about Embeddings pricing. Requests are billed based on the number of tokens in the input.

How to get embeddings
To get an embedding, send your text string to the embeddings API endpoint along with the embedding model name (e.g. text-embedding-3-small). The response will contain an embedding (list of floating point numbers), which you can extract, save in a vector database, and use for many different use cases:

Example: Getting embeddings
curl

curl https://api.openai.com/v1/embeddings \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -d '{
    "input": "Your text string goes here",
    "model": "text-embedding-3-small"
  }'
The response will contain the embedding vector along with some additional metadata.

Example embedding response
json

{
  "object": "list",
  "data": [
    {
      "object": "embedding",
      "index": 0,
      "embedding": [
        -0.006929283495992422,
        -0.005336422007530928,
        ... (omitted for spacing)
        -4.547132266452536e-05,
        -0.024047505110502243
      ],
    }
  ],
  "model": "text-embedding-3-small",
  "usage": {
    "prompt_tokens": 5,
    "total_tokens": 5
  }
}
By default, the length of the embedding vector will be 1536 for text-embedding-3-small or 3072 for text-embedding-3-large. You can reduce the dimensions of the embedding by passing in the dimensions parameter without the embedding losing its concept-representing properties. We go into more detail on embedding dimensions in the embedding use case section.

Embedding models
OpenAI offers two powerful third-generation embedding model (denoted by -3 in the model ID). You can read the embedding v3 announcement blog post for more details.

Usage is priced per input token, below is an example of pricing pages of text per US dollar (assuming ~800 tokens per page):

MODEL	~ PAGES PER DOLLAR	PERFORMANCE ON MTEB EVAL	MAX INPUT
text-embedding-3-small	62,500	62.3%	8191
text-embedding-3-large	9,615	64.6%	8191
text-embedding-ada-002	12,500	61.0%	8191
Use cases
Here we show some representative use cases. We will use the Amazon fine-food reviews dataset for the following examples.

Obtaining the embeddings
The dataset contains a total of 568,454 food reviews Amazon users left up to October 2012. We will use a subset of 1,000 most recent reviews for illustration purposes. The reviews are in English and tend to be positive or negative. Each review has a ProductId, UserId, Score, review title (Summary) and review body (Text). For example:

PRODUCT ID	USER ID	SCORE	SUMMARY	TEXT
B001E4KFG0	A3SGXH7AUHU8GW	5	Good Quality Dog Food	I have bought several of the Vitality canned...
B00813GRG4	A1D87F6ZCVE5NK	1	Not as Advertised	Product arrived labeled as Jumbo Salted Peanut...
We will combine the review summary and review text into a single combined text. The model will encode this combined text and output a single vector embedding.

Get_embeddings_from_dataset.ipynb

 from openai import OpenAI
client = OpenAI()

def get_embedding(text, model="text-embedding-3-small"):
   text = text.replace("\n", " ")
   return client.embeddings.create(input = [text], model=model).data[0].embedding

df['ada_embedding'] = df.combined.apply(lambda x: get_embedding(x, model='text-embedding-3-small'))
df.to_csv('output/embedded_1k_reviews.csv', index=False)
To load the data from a saved file, you can run the following:

import pandas as pd

df = pd.read_csv('output/embedded_1k_reviews.csv')
df['ada_embedding'] = df.ada_embedding.apply(eval).apply(np.array)


Function calling
Learn how to connect large language models to external tools.

Introduction
Function calling allows you to connect models like gpt-4o to external tools and systems. This is useful for many things such as empowering AI assistants with capabilities, or building deep integrations between your applications and the models.

In August 2024, we launched Structured Outputs. When you turn it on by setting strict: true, in your function definition, Structured Outputs ensures that the arguments generated by the model for a function call exactly match the JSON Schema you provided in the function definition.

As an alternative to function calling you can instead constrain the model's regular output to match a JSON Schema of your choosing. Learn more about when to use function calling vs when to control the model's normal output by using response_format.
Example use cases
Function calling is useful for a large number of use cases, such as:

Enabling assistants to fetch data: an AI assistant needs to fetch the latest customer data from an internal system when a user asks “what are my recent orders?” before it can generate the response to the user
Enabling assistants to take actions: an AI assistant needs to schedule meetings based on user preferences and calendar availability.
Enabling assistants to perform computation: a math tutor assistant needs to perform a math computation.
Building rich workflows: a data extraction pipeline that fetches raw text, then converts it to structured data and saves it in a database.
Modifying your applications' UI: you can use function calls that update the UI based on user input, for example, rendering a pin on a map.
The lifecycle of a function call


Function Calling diagram

When you use the OpenAI API with function calling, the model never actually executes functions itself, instead in step 3 the model simply generates parameters that can be used to call your function, which your code can then choose how to handle, likely by calling the indicated function. Your application is always in full control.

How to use function calling


Function calling is supported in both the Chat Completions API, Assistants API, and the Batch API. This guide focuses on function calling using the Chat Completions API. We have a separate guide for function calling using the Assistants API.

For the following example, we are building a conversational assistant which is able to help users with their delivery orders. Rather than requiring your users to interact with a typical form, your user can chat with an AI-powered assistant. In order to make this assistant helpful, we want to give it the ability to look up orders and reply with real data about the user’s orders.

Step 1: Pick a function in your codebase that the model should be able to call
The starting point for function calling is choosing a function in your own codebase that you’d like to enable the model to generate arguments for.

For this example, let’s imagine you want to allow the model to call the get_delivery_date function in your codebase which accepts an order_id and queries your database to determine the delivery date for a given package. Your function might look like something like the following.

node.js

// This is the function that we want the model to be able to call
const getDeliveryDate = async (orderId: string): datetime => { 
    const connection = await createConnection({
        host: 'localhost',
        user: 'root',
        // ...
    });
}
Step 2: Describe your function to the model so it knows how to call it
Now we know what function we wish to allow the model to call, we will create a “function definition” that describes the function to the model. This definition describes both what the function does (and potentially when it should be called) and what parameters are required to call the function.

The parameters section of your function definition should be described using JSON Schema. If and when the model generates a function call, it will use this information to generate arguments according to your provided schema.

In this example it may look like this:

{
    "name": "get_delivery_date",
    "description": "Get the delivery date for a customer's order. Call this whenever you need to know the delivery date, for example when a customer asks 'Where is my package'",
    "parameters": {
        "type": "object",
        "properties": {
            "order_id": {
                "type": "string",
                "description": "The customer's order ID.",
            },
        },
        "required": ["order_id"],
        "additionalProperties": false,
    }
}
Step 3: Pass your function definitions as available “tools” to the model, along with the messages
Next we need to provide our function definitions within an array of available “tools” when calling the Chat Completions API.

As always, we will provide an array of “messages”, which could for example contain your prompt or a whole back and forth conversation between the user and an assistant.

This example shows how you may call the Chat Completions API providing relevant functions and messages for an assistant that handles customer inquiries for a store.

node.js

const tools = [
    {
        type: "function",
        function: {
            name: "get_delivery_date",
            description: "Get the delivery date for a customer's order. Call this whenever you need to know the delivery date, for example when a customer asks 'Where is my package'",
            parameters: {
                type: "object",
                properties: {
                    order_id: {
                        type: "string",
                        description: "The customer's order ID.",
                    },
                },
                required: ["order_id"],
                additionalProperties: false,
            },
        }
    }
];

const messages = [
    { role: "system", content: "You are a helpful customer support assistant. Use the supplied tools to assist the user." },
    { role: "user", content: "Hi, can you tell me the delivery date for my order?" }
];

const response = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: messages,
    tools: tools,
});
Step 4: Receive and handle the model response
If the model decides that no function should be called
If the model does not generate a function call, then the response will contain a direct reply to the user in the normal way that Chat Completions does.

For example, in this case chat_response.choices[0].message may contain:

node.js

{
  role: 'assistant',
  content: "I'd be happy to help with that. Could you please provide me with your order ID?",
}
In an assistant use case you will typically want to show this response to the user and let them respond to it, in which case you will call the API again (with both the latest responses from the assistant and user appended to the messages).

Let's assume our user responded with their order id, and we sent the following request to the API.

node.js

const tools = [
    {
        type: "function",
        function: {
            name: "get_delivery_date",
            description: "Get the delivery date for a customer's order. Call this whenever you need to know the delivery date, for example when a customer asks 'Where is my package'",
            parameters: {
                type: "object",
                properties: {
                    order_id: {
                        type: "string",
                        description: "The customer's order ID."
                    }
                },
                required: ["order_id"],
                additionalProperties: false
            }
        }
    }
];

const messages = [];
messages.push({ role: "system", content: "You are a helpful customer support assistant. Use the supplied tools to assist the user." });
messages.push({ role: "user", content: "Hi, can you tell me the delivery date for my order?" });
messages.push({ role: "assistant", content: "Hi there! I can help with that. Can you please provide your order ID?" });
messages.push({ role: "user", content: "i think it is order_12345" });

const response = await client.chat.completions.create({
    model: 'gpt-4o',
    messages: messages,
    tools: tools
});
If the model generated a function call
If the model generated a function call, it will generate the arguments for the call (based on the parameters definition you provided).

Here is an example response showing this:

node.js

{
    finish_reason: 'tool_calls',
    index: 0,
    logprobs: null,
    message: {
        content: null,
        role: 'assistant',
        function_call: null,
        tool_calls: [
            {
                id: 'call_62136354',
                function: {
                    arguments: '{"order_id":"order_12345"}',
                    name: 'get_delivery_date'
                },
                type: 'function'
            }
        ]
    }
}
Handling the model response indicating that a function should be called
Assuming the response indicates that a function should be called, your code will now handle this:

node.js

// Extract the arguments for get_delivery_date
// Note this code assumes we have already determined that the model generated a function call. See below for a more production ready example that shows how to check if the model generated a function call
const toolCall = response.choices[0].message.tool_calls[0];
const arguments = JSON.parse(toolCall.function.arguments);

const order_id = arguments.order_id;

// Call the get_delivery_date function with the extracted order_id
const delivery_date = get_delivery_date(order_id);
Step 5: Provide the function call result back to the model
Now we have executed the function call locally, we need to provide the result of this function call back to the Chat Completions API so the model can generate the actual response that the user should see:

node.js

// Simulate the order_id and delivery_date
const order_id = "order_12345";
const delivery_date = moment();

// Simulate the tool call response
const response = {
    choices: [
        {
            message: {
                tool_calls: [
                    { id: "tool_call_1" }
                ]
            }
        }
    ]
};

// Create a message containing the result of the function call
const function_call_result_message = {
    role: "tool",
    content: JSON.stringify({
        order_id: order_id,
        delivery_date: delivery_date.format('YYYY-MM-DD HH:mm:ss')
    }),
    tool_call_id: response.choices[0].message.tool_calls[0].id
};

// Prepare the chat completion call payload
const completion_payload = {
    model: "gpt-4o",
    messages: [
        { role: "system", content: "You are a helpful customer support assistant. Use the supplied tools to assist the user." },
        { role: "user", content: "Hi, can you tell me the delivery date for my order?" },
        { role: "assistant", content: "Hi there! I can help with that. Can you please provide your order ID?" },
        { role: "user", content: "i think it is order_12345" },
        response.choices[0].message,
        function_call_result_message
    ]
};

// Call the OpenAI API's chat completions endpoint to send the tool call result back to the model
const final_response = await openai.chat.completions.create({
    model: completion_payload.model,
    messages: completion_payload.messages
});

// Print the response from the API. In this case it will typically contain a message such as "The delivery date for your order #12345 is xyz. Is there anything else I can help you with?"
console.log(final_response);
That’s all you need to give gpt-4o access to your functions.

Handling edge cases


We recommend using the SDK to handle the edge cases described below. If for any reason you cannot use the SDK, you should handle these cases in your code.
When you receive a response from the API, if you're not using the SDK, there are a number of edge cases that production code should handle.

In general, the API will return a valid function call, but there are some edge cases when this won’t happen, such as when you have specified max_tokens and the model’s response is cut off as a result.

This sample explains them:

node.js

// Check if the conversation was too long for the context window
if (response.choices[0].message.finish_reason === "length") {
    console.log("Error: The conversation was too long for the context window.");
    // Handle the error as needed, e.g., by truncating the conversation or asking for clarification
    handleLengthError(response);
}

// Check if the model's output included copyright material (or similar)
if (response.choices[0].message.finish_reason === "content_filter") {
    console.log("Error: The content was filtered due to policy violations.");
    // Handle the error as needed, e.g., by modifying the request or notifying the user
    handleContentFilterError(response);
}

// Check if the model has made a tool_call. This is the case either if the "finish_reason" is "tool_calls" or if the "finish_reason" is "stop" and our API request had forced a function call
if (response.choices[0].message.finish_reason === "tool_calls" || 
    (ourApiRequestForcedAToolCall && response.choices[0].message.finish_reason === "stop")) {
    // Handle tool call
    console.log("Model made a tool call.");
    // Your code to handle tool calls
    handleToolCall(response);
}

// Else finish_reason is "stop", in which case the model was just responding directly to the user
else if (response.choices[0].message.finish_reason === "stop") {
    // Handle the normal stop case
    console.log("Model responded directly to the user.");
    // Your code to handle normal responses
    handleNormalResponse(response);
}

// Catch any other case, this is unexpected
else {
    console.log("Unexpected finish_reason:", response.choices[0].message.finish_reason);
    // Handle unexpected cases as needed
    handleUnexpectedCase(response);
}
Function calling with Structured Outputs
By default, when you use function calling, the API will offer best-effort matching for your parameters, which means that occasionally the model may miss parameters or get their types wrong when using complicated schemas.

Structured Outputs is a feature that ensures model outputs for function calls will exactly match your supplied schema.

Structured Outputs for function calling can be enabled with a single parameter, just by supplying strict: true.

node.js

import OpenAI from "openai";
import { z } from "zod";
import { zodFunction } from "openai/helpers/zod";

const OrderParameters = z.object({
  order_id: z.string().describe("The customer's order ID."),
});

const tools = [
  zodFunction({ name: "getDeliveryDate", parameters: OrderParameters }),
];

const messages = [
  {
    role: "system",
    content:
      "You are a helpful customer support assistant. Use the supplied tools to assist the user.",
  },
  {
    role: "user",
    content: "Hi, can you tell me the delivery date for my order #12345?",
  },
];

const openai = new OpenAI();

const response = await openai.chat.completions.create({
  model: "gpt-4o-2024-08-06",
  messages: messages,
  tools: tools,
});

console.log(response.choices[0].message.tool_calls?.[0].function);
When you enable Structured Outputs by supplying strict: true, the OpenAI API will pre-process your supplied schema on your first request, and then use this artifact to constrain the model to your schema.

As a result, the model will always follow your exact schema, except in a few circumstances:

When the model’s response is cut off (either due to max_tokens, stop tokens, or maximum context length)
When a model refusal happens
When there is a content_filter finish reason
Note that the first time you send a request with a new schema using Structured Outputs, there will be additional latency as the schema is processed, but subsequent requests should incur no overhead.
Supported schemas
Function calling with Structured Outputs supports a subset of the JSON Schema language.

For more information on supported schemas, see the Structured Outputs guide.

Customizing function calling behavior
Function calling supports a number of advanced features such as ability to force function calls, parallel function calling and more.

Configuring parallel function calling
Any models released on or after Nov 6, 2023 may by default generate multiple function calls in a single response, indicating that they should be called in parallel.

This is especially useful if executing the given functions takes a long time. For example, the model may call functions to get the weather in 3 different locations at the same time, which will result in a message with 3 function calls in the tool_calls array.

Example response:

node.js

const response = {
    finish_reason: 'tool_calls',
    index: 0,
    logprobs: null,
    message: {
        content: null,
        role: 'assistant',
        function_call: null,
        tool_calls: [
            {
                id: 'call_62136355',
                function: {
                    arguments: '{"city":"New York"}',
                    name: 'check_weather'
                },
                type: 'function'
            },
            {
                id: 'call_62136356',
                function: {
                    arguments: '{"city":"London"}',
                    name: 'check_weather'
                },
                type: 'function'
            },
            {
                id: 'call_62136357',
                function: {
                    arguments: '{"city":"Tokyo"}',
                    name: 'check_weather'
                },
                type: 'function'
            }
        ]
    }
};

// Iterate through tool calls to handle each weather check
response.message.tool_calls.forEach(tool_call => {
    const arguments = JSON.parse(tool_call.function.arguments);
    const city = arguments.city;
    check_weather(city).then(weather_info => {
        console.log(`Weather in ${city}: ${weather_info}`);
    });
});
Each function call in the array has a unique id.

Once you've executed these function calls in your application, you can provide the result back to the model by adding one new message to the conversation for each function call, each containing the result of one function call, with a tool_call_id referencing the id from tool_calls, for example:

node.js

// Assume we have fetched the weather data from somewhere
const weather_data = {
    "New York": { "temperature": "22°C", "condition": "Sunny" },
    "London": { "temperature": "15°C", "condition": "Cloudy" },
    "Tokyo": { "temperature": "25°C", "condition": "Rainy" }
};

// Prepare the chat completion call payload with inline function call result creation
const completion_payload = {
    model: "gpt-4o",
    messages: [
        { role: "system", content: "You are a helpful assistant providing weather updates." },
        { role: "user", content: "Can you tell me the weather in New York, London, and Tokyo?" },
        // Append the original function calls to the conversation
        response.message,
        // Include the result of the function calls
        {
            role: "tool",
            content: JSON.stringify({
                city: "New York",
                weather: weather_data["New York"]
            }),
            // Here we specify the tool_call_id that this result corresponds to
            tool_call_id: response.message.tool_calls[0].id
        },
        {
            role: "tool",
            content: JSON.stringify({
                city: "London",
                weather: weather_data["London"]
            }),
            tool_call_id: response.message.tool_calls[1].id
        },
        {
            role: "tool",
            content: JSON.stringify({
                city: "Tokyo",
                weather: weather_data["Tokyo"]
            }),
            tool_call_id: response.message.tool_calls[2].id
        }
    ]
};

// Call the OpenAI API's chat completions endpoint to send the tool call result back to the model
const response = await openai.chat.completions.create({
    model: completion_payload.model,
    messages: completion_payload.messages
});

// Print the response from the API, which will return something like "In New York the weather is..."
console.log(response);
You can also disable parallel function calling by setting parallel_tool_calls: false.
Parallel function calling and Structured Outputs
When the model outputs multiple function calls via parallel function calling, model outputs may not match strict schemas supplied in tools.

In order to ensure strict schema adherence, disable parallel function calls by supplying parallel_tool_calls: false. With this setting, the model will generate one function call at a time.

Configuring function calling behavior using the tool_choice parameter
By default, the model is configured to automatically select which functions to call, as determined by the tool_choice: "auto" setting.

We offer three ways to customize the default behavior:

To force the model to always call one or more functions, you can set tool_choice: "required". The model will then always select one or more function(s) to call. This is useful for example if you want the model to pick between multiple actions to perform next.
To force the model to call a specific function, you can set tool_choice: {"type": "function", "function": {"name": "my_function"}}.
To disable function calling and force the model to only generate a user-facing message, you can either provide no tools, or set tool_choice: "none".
Note that if you do either 1 or 2 (i.e. force the model to call a function) then the subsequent finish_reason will be "stop" instead of being "tool_calls".

node.js

import { OpenAI } from "openai";
const openai = new OpenAI();

// Define a set of tools to use
const tools = [
  {
    type: "function",
    function: {
      name: "get_weather",
      strict: true,
      parameters: {
        type: "object",
        properties: {
          location: { type: "string" },
          unit: { type: "string", enum: ["c", "f"] },
        },
        required: ["location", "unit"],
        additionalProperties: false,
      },
    },
  },
  {
    type: "function",
    function: {
      name: "get_stock_price",
      strict: true,
      parameters: {
        type: "object",
        properties: {
          symbol: { type: "string" },
        },
        required: ["symbol"],
        additionalProperties: false,
      },
    },
  },
];

// Call the OpenAI API's chat completions endpoint
const response = await openai.chat.completions.create({
  model: "gpt-4o",
  messages: [
    {
      role: "user",
      content: "Can you tell me the weather in Tokyo?",
    },
  ],
  tool_choice: "required",
  tools,
});

// Print the response from the API
console.log(response);
Understanding token usage
Under the hood, functions are injected into the system message in a syntax the model has been trained on. This means functions count against the model's context limit and are billed as input tokens. If you run into token limits, we suggest limiting the number of functions or the length of the descriptions you provide for function parameters.

It is also possible to use fine-tuning to reduce the number of tokens used if you have many functions defined in your tools specification.

Tips and best practices
Turn on Structured Outputs by setting strict: "true"
When Structured Outputs is turned on, the arguments generated by the model for function calls will reliably match the JSON Schema that you provide.

If you are not using Structured Outputs, then the structure of arguments is not guaranteed to be correct, so we recommend the use of a validation library like Pydantic to first verify the arguments prior to using them.

Name functions intuitively, with detailed descriptions
If you find the model does not generate calls to the correct functions, you may need to update your function names and descriptions so the model more clearly understands when it should select each function. Avoid using abbreviations or acronyms to shorten function and argument names.

You can also include detailed descriptions for when a tool should be called. For complex functions, you should include descriptions for each of the arguments to help the model know what it needs to ask the user to collect that argument.

Name function parameters intuitively, with detailed descriptions
Use clear and descriptive names for function parameters. For example, specify the expected format for a date parameter (e.g., YYYY-mm-dd or dd/mm/yy) in the description.

Consider providing additional information about how and when to call functions in your system message
Providing clear instructions in your system message can significantly improve the model's function calling accuracy. For example, guide the model with things like, "Use check_order_status when the user inquires about the status of their order, such as 'Where is my order?' or 'Has my order shipped yet?'". Provide context for complex scenarios, like "Before scheduling a meeting with schedule_meeting, check the user's calendar for availability using check_availability to avoid conflicts."

Use enums for function arguments when possible
If your use case allows, you can use enums to constrain the possible values for arguments. This can help reduce hallucinations.

For example, say you have an AI assistant that helps with ordering a T-shirt. You likely have a fixed set of sizes for the T-shirt, and you might want the model to output in a specific format. If you want the model to output “s”, “m”, “l”, etc for small, medium, and large, then you could provide those values in the enum, for example:

{
    "name": "pick_tshirt_size",
    "description": "Call this if the user specifies which size t-shirt they want",
    "parameters": {
        "type": "object",
        "properties": {
            "size": {
                "type": "string",
                "enum": ["s", "m", "l"],
                "description": "The size of the t-shirt that the user would like to order"
            }
        },
        "required": ["size"],
        "additionalProperties": false
    }
}
If you don’t constrain the output, a user may say “large” or “L”, and the model may return either value. Your code may expect a specific structure, so it’s important to limit the number of possible formats the model can choose from.

Keep the number of functions low for higher accuracy
We recommend that you use no more than 20 functions in a single tool call. Developers typically see a reduction in the model’s ability to select the correct tool once they have between 10-20 tools.

If your use case requires the model to be able to pick between a large number of functions, you may want to explore fine-tuning (learn more) or break out the tools and group them logically to create a multi-agent system.

Set up evals to act as an aid in prompt engineering your function definitions and system messages
We recommend for non-trivial uses of function calling that you set up a suite of evals that allow you to measure how frequently the correct function is called or correct arguments are generated for a wide variety of possible user messages. Learn more about setting up evals on the OpenAI Cookbook.

You can then use these to measure whether adjustments to your function definitions and system messages will improve or hurt your integration.

Fine-tuning may help improve accuracy for function calling
Fine-tuning a model can improve performance at function calling for your use case, especially if you have a large number of functions, or complex, nuanced or similar functions.

See our fine-tuning for function calling cookbook for more information.

Fine-tuning for function calling
Learn how to fine-tune a model for function calling

FAQ
How do functions differ from tools?
When using function calling with the OpenAI API, you provide them as tools, configure them with tool_choice and monitor for finish_reason: "tool_calls".

The parameters named things like functions and function_call etc are now deprecated.

Should I include function call instructions in the tool specification or in the system prompt?
We recommend including instructions regarding when to call a function in the system prompt, while using the function definition to provide instructions on how to call the function and how to generate the parameters.

Which models support function calling?
Function calling was introduced with the release of gpt-4-turbo on June 13, 2023. This includes: gpt-4o, gpt-4o-2024-08-06, gpt-4o-2024-05-13, gpt-4o-mini, gpt-4o-mini-2024-07-18, gpt-4-turbo, gpt-4-turbo-2024-04-09, gpt-4-turbo-preview, gpt-4-0125-preview, gpt-4-1106-preview, gpt-4, gpt-4-0613, gpt-3.5-turbo, gpt-3.5-turbo-0125, gpt-3.5-turbo-1106, and gpt-3.5-turbo-0613.

Legacy models released before this date were not trained to support function calling.

Parallel function calling is supported on models released on or after Nov 6, 2023. This includes: gpt-4o, gpt-4o-2024-08-06, gpt-4o-2024-05-13, gpt-4o-mini, gpt-4o-mini-2024-07-18, gpt-4-turbo, gpt-4-turbo-2024-04-09, gpt-4-turbo-preview, gpt-4-0125-preview, gpt-4-1106-preview, gpt-3.5-turbo, gpt-3.5-turbo-0125, and gpt-3.5-turbo-1106.

What are some example functions?
Data Retrieval:

Scenario: A chatbot needs to fetch the latest customer data from an internal system when a user asks “who are my top customers?”
Implementation: Define a functionget_customers(min_revenue: int, created_before: string, limit: int) that retrieves customer data from your internal API. The model can suggest calling this function with the appropriate parameters based on user input.
Task Automation:

Scenario: An assistant bot schedules meetings based on user preferences and calendar availability.
Implementation: Define a function scheduleMeeting(date: str, time: str, participants: list) that interacts with a calendar API. The model can suggest the best times and dates to call this function.
Computational Tasks:

Scenario: A financial application calculates loan payments based on user input.
Implementation: Define a function calculateLoanPayment(principal: float, interestRate: float, term: int) to perform the necessary calculations. The model can provide the input values for this function.
Customer Support:

Scenario: A customer support bot assists users by providing the status of their orders.
Implementation: Define a function getOrderStatus(orderId: str) that retrieves order status information from a database. The model can suggest calling this function with the appropriate order ID parameter based on user input.
Can the model execute functions itself?
No, the model only suggests function calls and generates arguments. Your application handles the execution of the functions based on these suggestions (and returns the results of calling those functions to the model).

What are Structured Outputs?
Structured Outputs, introduced in August 2024, is a feature that ensures that the arguments generated by the model exactly match the provided JSON Schema, enhancing reliability and reducing errors. We recommend its use and it can be enabled by setting "strict": true.

Why might I not want to turn on Structured Outputs?
The main reasons to not use Structured Outputs are:

If you need to use some feature of JSON Schema that is not yet supported (learn more), for example recursive schemas.
If each of your API requests will include a novel schema (i.e. your schemas are not fixed, but are generated on-demand and rarely repeat), since the first request with a novel JSON Schema will have increased latency as the schema is pre-processed and cached for future generations to constrain the output of the model.
How do I ensure the model calls the correct function?
Use intuitive names and detailed descriptions for functions and parameters. Provide clear guidance in the system message to enhance the model’s ability to pick the correct function.

What does Structured Outputs mean for Zero Data Retention?
When Structured Outputs is turned on, schemas provided are not eligible for zero data retention.

Resources
The OpenAI Cookbook has several end-to-end examples to help you implement function calling. In our introductory cookbook how to call functions with chat models, we outline two examples of how the models can use function calling. This one is a great resource to follow as you get started: