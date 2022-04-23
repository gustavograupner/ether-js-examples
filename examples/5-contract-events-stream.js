const ethers = require("ethers");

const contractAddress = "0x6B175474E89094C44Da98b954EedeAC495271d0F"; //DAI

// Config the ERC20_ABI function that will be used in this example
const ERC_20_ABI = [
  "event Transfer(address indexed _from, address indexed _to, uint256 _value)",
];

// Connect to the provider
const provider = new ethers.providers.JsonRpcProvider(
  `https://mainnet.infura.io/v3/${process.env.INFURA_PROJECT_ID}`
);

// Connect to the smart contract
const contract = new ethers.Contract(contractAddress, ERC_20_ABI, provider);

(async () => {
  // get the latest block number from the provider
  const latestBlock = await provider.getBlockNumber();

  // get events from the latest block - 10 blocks
  const transferEvent = await contract.queryFilter(
    "Transfer",
    latestBlock - 10,
    latestBlock
  );
  console.log(transferEvent);
})();
