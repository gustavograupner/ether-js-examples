## EthersJS examples

Examples using EthersJS library to communicate with the Ethererum blockchain. In this project I've used Ganache to run a local blockchain, you can find more information here: https://trufflesuite.com/ganache/

# Dependencies
 - EthersJS https://docs.ethers.io
 - Dotenv https://www.npmjs.com/package/dotenv
 - Infura (create a free account) https://infura.io

# SetUp
1. Clone the repository.
2. Install dependencies using:
`yarn install`
3. Add variable INFURA_PROJECT_ID on `.env` file.

# Running the Examples:

- **1-account-balance.js read account balance**: run the command below passing the account address as a arg:
`yarn accountBalance 0x2D3117C2B6b1bE0B2d93CE27622458Be0BE5C9f0`

- **2-read-smart-contracts.js read smart contract**: run the command below passing the contract address as a arg:
`yarn accountBalance 0x6B175474E89094C44Da98b954EedeAC495271d0F`

- **3-send-signed-transactions.js send signed transaction**: send ether to a recipent account using Kovan Test Network. To receive some ethers to make tests, go to the website https://faucets.chain.link/ choose the network and paste your account address.
`yarn sendSignedTransaction`
> The link below shows the result of the transaction. https://kovan.etherscan.io/tx/0x5657d898ef7f1f86dd2553d0520eebe6e9dba8e1ce346e4754773869624f1acaAaa
