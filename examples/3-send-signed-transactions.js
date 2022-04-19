const ethers = require("ethers");

const provider = new ethers.providers.JsonRpcProvider(
  `https://kovan.infura.io/v3/${process.env.INFURA_PROJECT_ID}`
);

const sender = "0x70Ff01aafD7Da0BCCb19a6978C4d97eeD64E9b08";
const recipient = "0x32A69C6A232d32298b3cae9334DA1e238845bb87";
const privateKeySender = process.env.EXAMPLE_3_PRIVATE_KEY_SENDER;

async function getBalance(address) {
  const balance = await provider.getBalance(address);
  return ethers.utils.formatEther(balance);
}

(async () => {
  const balancesBefore = await Promise.all([
    getBalance(sender),
    getBalance(recipient),
  ]);
  console.log("#### balances before transaction ####");
  console.log("balance sender:", balancesBefore[0]);
  console.log("balance recipient:", balancesBefore[1]);
  console.log("###############################");

  const wallet = new ethers.Wallet(privateKeySender, provider);
  const response = await wallet.sendTransaction({
    to: recipient,
    value: ethers.utils.parseEther("0.025"),
  });
  await response.wait();
  console.log(response);

  const balancesAfter = await Promise.all([
    getBalance(sender),
    getBalance(recipient),
  ]);
  console.log("#### balances after transaction ####");
  console.log("balance sender:", balancesAfter[0]);
  console.log("balance recipient:", balancesAfter[1]);
  console.log("###############################");
})();
