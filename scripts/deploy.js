const { ethers } = require("hardhat");

async function main() {
  const signer = (await ethers.getSigners())[0];
  const Stablecoin = await ethers.getContractFactory("Stablecoin");
  const token = await Stablecoin.deploy("L2Stablecoin", "L2USD", signer.address);

  await token.waitForDeployment();
  console.log("Stablecoin deployed to:", token.target);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
