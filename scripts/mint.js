const { ethers } = require("hardhat");
require("dotenv").config();

async function main() {
  const to = process.env.MINT_TO_ADDRESS;
  const amount = "500"; // in tokens (not wei)

  if (!to || !process.env.PRIVATE_KEY || !process.env.STABLECOIN_ADDRESS) {
    throw new Error("Missing env variables (MINT_TO_ADDRESS, PRIVATE_KEY, STABLECOIN_ADDRESS)");
  }

  const provider = new ethers.JsonRpcProvider(process.env.ARBITRUM_RPC);
  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

  const Stablecoin = await ethers.getContractFactory("Stablecoin", wallet);
  const contract = Stablecoin.attach(process.env.STABLECOIN_ADDRESS);

  const tx = await contract.mint(to, ethers.parseUnits(amount, 18));
  await tx.wait();

  console.log(`Minted ${amount} L2USD to ${to}`);
}

main().catch((err) => {
  console.error("Mint failed:", err);
  process.exit(1);
});
