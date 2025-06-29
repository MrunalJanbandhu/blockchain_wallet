const {ethers} = require("hardhat");
require("dotenv").config();

async function main() {
	const from = process.env.BURN_FROM_ADDRESS;
	const amount = "200";

	if(!from || !process.env.PRIVATE_KEY || !process.env.STABLECOIN_ADDRESS) {
		throw new Error("Missing env variables (BURN_FROM_ADDRESS, etc)");
	}

	const provider = new ethers.JsonRpcProvider(process.env.ARBITRUM_RPC);
	const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

	const Stablecoin = await ethers.getContractFactory("Stablecoin", wallet);
	const contract = Stablecoin.attach(process.env.STABLECOIN_ADDRESS);

	const tx = await contract.burnFrom(from, ethers.parseUnits(amount, 18));
	await tx.wait();

	console.log(`Burned ${amount} L2USD from ${from}`);
}

main().catch((err) => {
	console.error("Burn failed:", err);
	process.exit(1);
});
