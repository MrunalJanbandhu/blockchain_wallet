const { ethers } = require("hardhat");
require("dotenv").config();

async function main() {
	const to = process.env.TRANSFER_TO_ADDRESS;
	const amount = "100";

	if(!to || !process.env.PRIVATE_KEY || !process.env.STABLECOIN_ADDRESS) {
		throw new Error("Missing env variables (TRANSFER_TO_ADDRESS, etc)");
	}

	const provider = new ethers.JsonRpcProvider(process.env.ARBITRUM_RPC);
	const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

	const Stablecoin = await ethers.getContractFactory("Stablecoin", wallet);
	const contract = Stablecoin.attach(process.env.STABLECOIN_ADDRESS);

	const tx = await contract.transfer(to, ethers.parseUnits(amount, 18));
	await tx.wait();

	console.log(`Transfered ${amount} L2USD to ${to}`);
}

main().catch( (err) => {
	console.error("Transfer failed:", err);
	process.exit(1);
});
