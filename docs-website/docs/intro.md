---
sidebar_position: 1
---

# Torque Intro

Let's discover **Torque in less than 5 minutes**.

# What is Torque?

Torque is a growth protocol that allows builders to launch offers for users to complete specific onchain actions. When offers are launched, they can be accessed by using the Torque SDK to query the user's publicKey and see if they are qualified to complete the action.

Advertisers create offers which dictate:
* the audience who qualifies based on onchain conditions
* the timeline for the offer
* the conditions required for the reward for the user
* the reward structure for either the user AND/OR the publisher

Publishers share offers to the qualified users and receive the specified reward when the targeted action is performed by a qualified user. 

# What is special about Torque?

1. **Onchain Campaigns**:
    - Torque stands out by ensuring that all campaigns are fully onchain, and accessible via a users public key, providing the sovereignty to the user and providing transparency in the process. 
    - Any user can easily query the onchain data via the DAS API to understand the campaign performance.

2. **Targeted and Reward-Based Campaigns**:
    - Torque enables campaigns to be precisely targeted to specific audiences using both onchain and offchain data, ensuring that the right users are reached.
    - The reward conditions for campaigns are based on any onchain action, giving advertisers the ability to incentivize participation that's aligned to their business goals.
    - Rewards are distributed as crypto-native assets (tokens), making them valuable and relevant to users.

3. **Publisher and Advertiser Benefits**:
    - Every offer has a built-in kickback, meaning publishers can share offers with users and receive rewards when the user completes the desired action, incentivizing participation.
    - Advertisers benefit from a cost-effective model where they only pay when a qualified user performs the desired action, ensuring a return on investment.
    - Advertisers will be able to set different distribution models for their offers, such as  a flat token payment, raffles, percentage of the total amount, or paying a higher amount for the first N users via a bonding curve.

# Why Torque?
Torque was created to help builders easily grow their companies through the use of onchain assets and rewarding the right users for their actions. Without Torque, builders would have to setup their own infrastructure and reward system which is costly, time consuming, and takes away from engineering resources for product development. We believe the future of token distribution will be programmatic and decentralized, and Torque is the first step towards that.

# Share some examples?
Here is a table of some examples focusing on the category, objective, audience and different reward structures.

| Category       | Objective                          | Audience                                       | Action                                        | User Reward                          | Publisher Reward                  |
| -------------- | ---------------------------------- | ---------------------------------------------- | --------------------------------------------- | ----------------------------------- | --------------------------------- |
| Memecoins      | Acquire holders           | Popular memecoin holders who hold > X        | Buy X Memecoin                               | Receive bonus Y Memecoin           | Receive Y Memecoin               |
| Gaming         | Acquire new users              | Users who have gaming NFTs or spent N Sol trading | Sign up                                      | Entered into raffle                 | Additional entry into raffle      |
| NFT Marketplaces | Drive Floor Purchases               | Traders with N volume of NFT sales             | Buy Floor | Raffle for NFTs                              | $5 USDC                           |
| Validators     | Swap to your LST                   | SOL holders native staking >= 1000 SOL         | Stake and receive LST                         | Raffle entry of validator rewards   | Raffle entry of validator rewards |
| Lending        | Convert USDC holders to deposit into lending protocol | USDC or SOL holders, holding 10k in wallet    | Deposit                                       | Points                              | Percentage of deposit                        |

# How can I use Torque?

1. **I'm a technical builder, with a project**:
    - Download our NPM package & SDK and walkthrough the tutorial and tests to setup your first campaign.
    - Join our Discord and ask questions.
    - Add the Torque SDK to your website and become a publisher. If users convert, get paid!

2. **I'm a Publisher or consumer app, with users**:
    - Download our NPM package & SDK, and walkthrough the tutorial to query the public key and start showing offers to users. 
    - If users convert, get paid!

3. **I'm nontechnical, and want to distribute my project**:
    - Access our app to launch, manage, and monitor your campaigns in a no-code manner.

# Who is Torque?
Torque is made up of a team of developers who have been building on Solana for the last 2 years. Torque won multiple hackathons and is building the attention economy.