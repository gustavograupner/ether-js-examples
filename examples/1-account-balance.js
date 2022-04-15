const ethers = require("ethers");
const { formatEther } = require("ethers/lib/utils");

const url = process.env.BLOCKCHAIN_URL;
const provider = new ethers.providers.JsonRpcProvider(url);

(async () => {
  const address =
    process.argv[2] || "0xD1eab77E09239D854e248efCF71fE0DA0F5408ef";
  const balance = await provider.getBalance(address);
  console.log(`Address: ${address}\nBalance: ${formatEther(balance)} ETH`);
})();
