// scripts/balance.js
const { ethers } = require("hardhat");
require("dotenv").config();

async function main() {
  const address = process.argv[2] || process.env.DEFAULT_ADDRESS;

  if (!address) {
    console.log("Please provide an address or set DEFAULT_ADDRESS in .env.");
    return;
  }

  const provider = new ethers.JsonRpcProvider(process.env.ARBITRUM_RPC);
  const abi = [
    "function balanceOf(address) view returns (uint256)",
    "function decimals() view returns (uint8)"
  ];
  const contract = new ethers.Contract(process.env.STABLECOIN_ADDRESS, abi, provider);

  const rawBalance = await contract.balanceOf(address);
  const decimals = await contract.decimals();
  const formatted = ethers.formatUnits(rawBalance, decimals);

  console.log(`Balance of ${address}: ${formatted} L2USD`);
}

main().catch(console.error);
