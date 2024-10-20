
Outline:
Bayesian Market Maker Prediction Market to Assign probabilities of what AI wins:
Two AI’s compete with each other depending on their trade volume. The AI that is worth more than it came in with is considered to win the duel.
Set a 50% default chance to both AI’s at the creation of the prediction market
The market will update the prices of the shares of the prediction market as more people are buying it
Users will add to the prediction market by purchasing shares of a liquidity pool
The more people who buy shares of the prediction market to predict which model will win. It would be more expensive to buy the side with the larger percentage

Disable default liquidity provision:
Will immediately trigger when someone tries to add liquidity to the pools without going through our system
 Code will look something like this:
function beforeAddLiquidity(
   address,
   PoolKey calldata,
   IPoolManager.ModifyLiquidityParams calldata,
   bytes calldata
) external pure override returns (bytes4) {
   revert AddLiquidityThroughHook();
}
Create custom function to add liquidity to the pool
Users can add liquidity to the pool through interacting with hook contract
This function must include: PoolKey, amount and types of tokens used in pool, and a function call to manipulate the position of the pool
The tokens used in the liquidity pool would be a bet an AI A and a bet on AI B
GPT example
// Custom add liquidity function
function customAddLiquidity(
    PoolKey calldata key,  // Information about the pool (token pair, fee tier, etc.)
    uint256 amountEach     // The amount of each token to add
) external {
    // Unlock the pool to allow position manipulation
    poolManager.unlock(
        abi.encode(
            CallbackData(
                amountEach,
                key.currency0,
                key.currency1,
                msg.sender
            )
        )
    );
}
Callback function to add liquidity 
This function will perform the transfer of tokens to the pool and manage liquidity position
Will need the following fields: 
CallbackData: contains information about liquidity addition like sender address and token count. Will look something like this:
CallbackData(Uint256 amountEach, Address coin#1,Address coin#2,Address msg.sender )
Settle: function which transfers tokens from user to pool
Take: At the result of the gamble, the prediction market rewards those in the winning bracket with coins in the losing bracket equal to their initial share
Program will take a 0.5 percent fee on this translation 


Code Explanation:

Pragma and Imports
solidity
Copy code
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";

License Identifier: Specifies that the contract is licensed under the MIT License.
Pragma Directive: Indicates that the Solidity compiler version should be 0.8.24 or higher.
Import Statement: Imports the IERC20 interface from OpenZeppelin, which defines the standard functions for ERC20 tokens.

Contract Declaration
solidity
Copy code
/// @title AI Prediction Market Contract
/// @notice This contract allows users to bet on which AI will win in a competition.
contract AIPredictionMarket {

Contract Name: AIPredictionMarket
Purpose: A marketplace where users can place bets on either AI A or AI B.

State Variables
solidity
Copy code
// Mapping to keep track of users' bets on AI A and AI B
mapping(address => uint256) public betsOnA;
mapping(address => uint256) public betsOnB;

// Total bets on each AI
uint256 public totalBetsOnA;
uint256 public totalBetsOnB;

// Token used for bets
IERC20 public betToken;

// Address to receive the collected fees
address public feeRecipient;

// Market settlement status
bool public marketSettled;
bool public aiAWon;

// Mapping to track if users have claimed their rewards
mapping(address => bool) public rewardClaimed;

// Fee percentage (0.5%)
uint256 public constant FEE_DIVISOR = 1000; // Divisor for fee calculation
uint256 public feePercent = 5; // 0.5% (feePercent / FEE_DIVISOR)

// Events for logging activities
event BetPlaced(address indexed user, bool betOnA, uint256 amount);
event MarketSettled(bool aiAWon);
event RewardClaimed(address indexed user, uint256 amount);

// Flag to ensure the fee is transferred only once
bool private feeTransferred;

Bets Tracking:
betsOnA: Maps user addresses to their bet amounts on AI A.
betsOnB: Maps user addresses to their bet amounts on AI B.
Total Bets:
totalBetsOnA: The cumulative amount bet on AI A.
totalBetsOnB: The cumulative amount bet on AI B.
Bet Token:
betToken: The ERC20 token used for placing bets.
Fee Recipient:
feeRecipient: Address that receives the collected fees.
Market Status:
marketSettled: Indicates whether the market outcome has been decided.
aiAWon: Indicates whether AI A won (true) or AI B won (false).
Rewards Tracking:
rewardClaimed: Keeps track of whether a user has claimed their reward.
Fee Configuration:
FEE_DIVISOR: Constant used to calculate the fee percentage (set to 1000 for precision).
feePercent: The fee percentage (set to 5, representing 0.5% when divided by FEE_DIVISOR).
Events:
BetPlaced: Emitted when a user places a bet.
MarketSettled: Emitted when the market outcome is decided.
RewardClaimed: Emitted when a user claims their reward.
Fee Transfer Flag:
feeTransferred: Ensures that the fee is transferred to the feeRecipient only once.

Constructor
solidity
Copy code
/// @notice Constructor to initialize the contract
/// @param _betToken The ERC20 token used for bets
/// @param _feeRecipient The address that will receive the fees
constructor(
    IERC20 _betToken,
    address _feeRecipient
) {
    betToken = _betToken;
    feeRecipient = _feeRecipient;
}

Purpose: Initializes the contract with the specified bet token and fee recipient.
Parameters:
_betToken: The ERC20 token contract used for betting.
_feeRecipient: The address designated to receive the collected fees.
Initialization:
Sets the betToken and feeRecipient state variables with the provided values.

Placing a Bet
solidity
Copy code
/// @notice Allows users to place a bet on AI A or AI B
/// @param amount The amount of tokens to bet
/// @param betOnA True if betting on AI A, false if on AI B
function placeBet(uint256 amount, bool betOnA) external {
    require(!marketSettled, "Market already settled");
    require(amount > 0, "Amount must be greater than zero");

    // Transfer betToken from user to contract
    require(betToken.transferFrom(msg.sender, address(this), amount), "Token transfer failed");

    if (betOnA) {
        betsOnA[msg.sender] += amount;
        totalBetsOnA += amount;
    } else {
        betsOnB[msg.sender] += amount;
        totalBetsOnB += amount;
    }

    emit BetPlaced(msg.sender, betOnA, amount);
}

Function: placeBet
Purpose: Allows users to place a bet on either AI A or AI B.
Parameters:
amount: The amount of tokens the user wants to bet.
betOnA: A boolean indicating if the bet is on AI A (true) or AI B (false).
Logic:
Market Check: Ensures the market hasn't been settled yet.
Amount Check: Validates that the bet amount is greater than zero.
Token Transfer: Transfers the bet amount from the user's address to the contract using transferFrom.
Bet Recording:
Updates the appropriate mapping (betsOnA or betsOnB) with the user's bet.
Increments the total bets on the selected AI.
Event Emission: Emits a BetPlaced event with details of the bet.

Settling the Market
solidity
Copy code
/// @notice Settles the market by declaring the winning AI
/// @param _aiAWon True if AI A won, false if AI B won
function settleMarket(bool _aiAWon) external {
    require(!marketSettled, "Market already settled");
    // In production, this should be restricted or use an oracle
    aiAWon = _aiAWon;
    marketSettled = true;
    emit MarketSettled(aiAWon);
}

Function: settleMarket
Purpose: Declares the winning AI and settles the market.
Parameters:
_aiAWon: A boolean indicating if AI A won (true) or AI B won (false).
Logic:
Market Check: Ensures the market hasn't already been settled.
Outcome Setting:
Updates aiAWon with the result.
Sets marketSettled to true.
Event Emission: Emits a MarketSettled event with the outcome.
Note: In a production environment, this function should be restricted to authorized personnel or use an oracle to prevent manipulation.

Claiming Rewards
solidity
Copy code
/// @notice Allows users to claim their rewards after the market is settled
function claimReward() external {
    require(marketSettled, "Market not settled yet");
    require(!rewardClaimed[msg.sender], "Reward already claimed");

    uint256 userBet;
    uint256 userReward;
    uint256 totalWinningBets;
    uint256 totalLosingBets;

    if (aiAWon) {
        userBet = betsOnA[msg.sender];
        require(userBet > 0, "No winning bet");
        totalWinningBets = totalBetsOnA;
        totalLosingBets = totalBetsOnB;
    } else {
        userBet = betsOnB[msg.sender];
        require(userBet > 0, "No winning bet");
        totalWinningBets = totalBetsOnB;
        totalLosingBets = totalBetsOnA;
    }

    // Calculate fee
    uint256 totalPool = totalWinningBets + totalLosingBets;
    uint256 feeAmount = (totalPool * feePercent) / FEE_DIVISOR;
    uint256 totalPoolAfterFees = totalPool - feeAmount;

    // Calculate user's reward
    userReward = (userBet * totalPoolAfterFees) / totalWinningBets;

    // Mark reward as claimed
    rewardClaimed[msg.sender] = true;

    // Transfer reward to user
    require(betToken.transfer(msg.sender, userReward), "Token transfer failed");

    // Transfer fee to feeRecipient (only once)
    if (!feeTransferred && feeAmount > 0 && feeRecipient != address(0)) {
        feeTransferred = true;
        require(betToken.transfer(feeRecipient, feeAmount), "Fee transfer failed");
    }

    emit RewardClaimed(msg.sender, userReward);
}

Function: claimReward
Purpose: Allows users who placed winning bets to claim their rewards after the market has been settled.
Logic:
Market Check: Ensures the market has been settled.
Claim Check: Verifies that the user hasn't already claimed their reward.
Bet Verification:
Determines if the user had a winning bet based on aiAWon.
Retrieves the user's bet amount from the appropriate mapping.
Ensures the user had a winning bet.
Calculations:
Total Pool: Sum of total bets on both AIs.
Fee Calculation: Computes the fee amount using feePercent and FEE_DIVISOR.
Total Pool After Fees: Subtracts the fee from the total pool.
User Reward: Calculates the user's share of the winning pool proportionally.
State Updates:
Marks the user's reward as claimed in rewardClaimed.
Transfers:
Transfers the calculated reward to the user.
Transfers the fee to the feeRecipient if it hasn't been transferred yet.
Event Emission: Emits a RewardClaimed event with the reward details.

Getting Current Odds
solidity
Copy code
/// @notice Returns the current odds for each AI based on total bets
/// @return oddsA Odds for AI A (multiplied by 1000 for precision)
/// @return oddsB Odds for AI B (multiplied by 1000 for precision)
function getOdds() external view returns (uint256 oddsA, uint256 oddsB) {
    uint256 totalBets = totalBetsOnA + totalBetsOnB;
    if (totalBets == 0) {
        return (500, 500); // Default to 50% each
    } else {
        oddsA = (totalBetsOnA * 1000) / totalBets; // Odds in permille (‰)
        oddsB = (totalBetsOnB * 1000) / totalBets;
        return (oddsA, oddsB);
    }
}

Function: getOdds
Purpose: Provides the current betting odds for both AI A and AI B.
Returns:
oddsA: Odds for AI A, scaled by 1000 for decimal precision.
oddsB: Odds for AI B, scaled by 1000.
Logic:
Total Bets Calculation: Adds totalBetsOnA and totalBetsOnB.
Odds Calculation:
If no bets have been placed, defaults to 50% odds for each AI.
Otherwise, calculates the odds based on the proportion of total bets on each AI.
Multiplies by 1000 to maintain precision in integer division (permille units).

Withdrawing Bets
solidity
Copy code
/// @notice Allows users to withdraw their bets before the market is settled
/// @param betOnA True if withdrawing a bet on AI A, false if on AI B
function withdrawBet(bool betOnA) external {
    require(!marketSettled, "Market already settled");

    uint256 userBet;

    if (betOnA) {
        userBet = betsOnA[msg.sender];
        require(userBet > 0, "No bet to withdraw");

        betsOnA[msg.sender] = 0;
        totalBetsOnA -= userBet;
    } else {
        userBet = betsOnB[msg.sender];
        require(userBet > 0, "No bet to withdraw");

        betsOnB[msg.sender] = 0;
        totalBetsOnB -= userBet;
    }

    // Transfer tokens back to user
    require(betToken.transfer(msg.sender, userBet), "Token transfer failed");
}

Function: withdrawBet
Purpose: Allows users to withdraw their bets before the market outcome is decided.
Parameters:
betOnA: A boolean indicating if the withdrawal is for a bet on AI A (true) or AI B (false).
Logic:
Market Check: Ensures the market hasn't been settled yet.
Bet Verification:
Retrieves the user's bet amount from the appropriate mapping.
Ensures the user has a bet to withdraw.
State Updates:
Resets the user's bet amount in the mapping to zero.
Decrements the total bets on the selected AI.
Token Transfer:
Transfers the bet amount back to the user's address.

Overall Workflow
Bet Placement:
Users call placeBet to bet on AI A or AI B by specifying the amount and choice.
The contract records the bet and updates total bets.
Market Settlement:
An authorized entity calls settleMarket to declare the winning AI.
The market is marked as settled, and the outcome is recorded.
Reward Claiming:
Users who placed winning bets call claimReward to receive their winnings.
Rewards are calculated proportionally after deducting a 0.5% fee.
The fee is transferred to the feeRecipient.
Odds Calculation:
Users can call getOdds at any time to see the current betting odds for each AI.
Bet Withdrawal:
Before the market is settled, users can withdraw their bets by calling withdrawBet.

Important Notes
Fee Mechanism:
A 0.5% fee is collected from the total pool when rewards are claimed.
The fee is transferred to the feeRecipient only once during the first reward claim.
Security Considerations:
In a production environment, functions like settleMarket should be restricted to prevent unauthorized manipulation.
The contract assumes that betToken conforms to the ERC20 standard and that transferFrom and transfer functions return a boolean indicating success.
Precision Handling:
The contract uses a FEE_DIVISOR of 1000 to handle percentages with one decimal precision (e.g., 0.5%).
Event Logging:
The contract emits events for key actions to facilitate off-chain monitoring and integration with user interfaces.

I hope this detailed explanation helps you understand how the AIPredictionMarket contract functions. Let me know if you have any questions or need further clarification on any part of the contract.
o1































Docs for code:
Name:
AI Prediction Market Smart Contract
Description:
Contract allows users to bet on the outcome in a competition between two AI models using ERC20 tokens. Users can place bets, claim rewards, and withdraw money before the event's conclusion. The event is ended whenever the contract Owner decides to settle the market. After the market is settled is when users may claim their rewards.
Features:
Bet Placement: Users may bet on AI model A or B
Settle Market: Contract owner decides when competition is over (which AI wins)
Claim rewards: Those who made the correct prediction can claim their share of the prize money at the end of the event
Bet withdrawal: Users can withdrawal their bets before the market is settled
Fee structure: A 0.5% fee is levied from the total pool after the market is settled
Function names and how to use them:
placeBet(uint256 amount, bool betOnA):
Purpose: Users may place a bet on either AI model
Parameters: amount: amount of tokens to bet. betonA: true if user is betting on A, false if B
Usage: Function is called after approving the contract to spend their tokens using ERC20 approve function
settleMarket(bool _aiAWon):
Purpose: Declares winner of competition
Parameters: True if A wins, false if B wins
Restrictions: Function is called by contract owner
Can only be called once competition has concluded
claimReward()
Purpose: Allows users to claim rewards after market is settled
getOdds()
Purpose: Returns current betting odds for AI A and AI B
Returns: 
oddsA: odds for AI A multiplied by 1000 for precision
oddsB: odds for AI B multiplied by 1000 for precision
Usage: Users can call this function at any time to check odds before market settled
withdrawBet(bool betonA)
Purpose: Allows users to withdrawal bets before market settles
Parameters: betOnA: true if user bet on A, false if B
Events:
BetPlaced(address indexed user, bool betOnA, uint256 amount)
Emitted when user places a bet on A or B
Parameters:
User: address of user who placed bet
betonA: indicates if bet was placed on A(true) or B(false)
Amount: amount of tokens bet
MarketSettled(bool aiAWon)
Emitted when the market is settled and the winning AI is declared
Parameters: aiAWon: true if A won, false if B
RewardClaimed(address indexed user, uint 256 amount):
Emitted when a user successfully claim their reward after the market has been settled
Parameters: user: address of user claiming award. Amount: amount of reward tokens claimed
Fee Structure
0.5% fee
Security Considerations:
Only owner can call settleMarket
Users need to approve their contract spending their coins
Ensure feeRecipient address is correct and capable of receiving tokens
How to interact with the contract:
Place bet, settle market, claim rewards, withdrawal bets, check odds
Deployment and configuration:
_betToken: The address of the ERC20 token used for placing bets.
_feeRecipient: The address that will receive the collected fees.
AIPredictionMarket predictionMarket = new AIPredictionMarket(betTokenAddress, feeRecipientAddress);
Versioning and Compatibility:
^0.8.24 version
Uses Ownable and IERC20 contracts from OpenZeppelin
Testing and simulation:
Unit testing: 
Make sure users can successfully place bets
Make sure users can withdraw before market is settled
Checks to see if contract correctly handles market settlement calculates rewards, and delivers rewards
Test that only the owner can call the settleMarket function



Limitations and Assumptions
Market must be settled manually by the contract winner which assumes they will honestly declare the winner
0.5% fixed fee is hardcoded and cannot be changed after deployment
When market is settled, bets can’t be changed or withdrawn


