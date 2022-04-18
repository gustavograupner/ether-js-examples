const ethers = require("ethers");

const ERC20_ABI = [
  "function name() view returns (string)",
  "function totalSupply() view returns (uint256)",
  "function balanceOf() view returns (uint)",
  {
    constant: true,
    inputs: [],
    name: "symbol",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
];

const provider = new ethers.providers.JsonRpcProvider(
  `https://mainnet.infura.io/v3/${process.env.INFURA_PROJECT_ID}`
);

const contractAddress =
  process.argv[2] || "0x6B175474E89094C44Da98b954EedeAC495271d0F";

(async () => {
  const contract = new ethers.Contract(contractAddress, ERC20_ABI, provider);

  const result = await Promise.all([
    contract.name(),
    contract.symbol(),
    contract.totalSupply(),
  ]);

  console.log("Reading from: ", contractAddress);
  console.log("name: ", result[0]);
  console.log("symbol: ", result[1]);
  console.log("total supply: ", result[2]);
})();
