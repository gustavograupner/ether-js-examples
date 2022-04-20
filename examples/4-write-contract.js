const ethers = require("ethers");

const senderAddress = "0x70Ff01aafD7Da0BCCb19a6978C4d97eeD64E9b08";
const recipientAddress = "0x32A69C6A232d32298b3cae9334DA1e238845bb87";
const contractAddress = "0xa36085F69e2889c224210F603D836748e7dC0088";

// Declare de ERC_20 functions that will be used (balanceOf and transfer)
const ERC20 = [
  "function balanceOf(address) view returns (uint)",
  "function transfer(address to, uint256 value) returns (bool)",
  "function symbol() view returns (string)",
];

// Connect to the provider
const provider = new ethers.providers.JsonRpcProvider(
  `https://kovan.infura.io/v3/${process.env.INFURA_PROJECT_ID}`
);

// Connect to the Chainlink contract
const contract = new ethers.Contract(contractAddress, ERC20, provider);

// Connect to sender wallet
const senderWallet = new ethers.Wallet(
  process.env.EXAMPLE_3_PRIVATE_KEY_SENDER,
  provider
);

// Connect sender wallet with the contract
const contractWithWallet = contract.connect(senderWallet);

const printBalance = async (contract, address) => {
  const balance = await contract.balanceOf(address);
  const symbol = await contract.symbol();
  console.log("Address:", address);
  console.log(`Balance ${symbol} ${ethers.utils.formatEther(balance)}`);
};

(async () => {
  // Print sender and recipient balances before transfer (from the contract);
  await printBalance(contract, senderAddress);
  await printBalance(contract, recipientAddress);

  // Amount to be transferred
  const senderBalance = await contract.balanceOf(senderAddress);

  // Get the chainlink contract and make the transfer
  const responseTransaction = await contractWithWallet.transfer(
    recipientAddress,
    senderBalance
  );

  // Wait util the transaction finishes
  await responseTransaction.wait();
  console.log(responseTransaction);

  // Print sender and recipient balances after transfer;
  await printBalance(contract, senderAddress);
  await printBalance(contract, recipientAddress);
})();
