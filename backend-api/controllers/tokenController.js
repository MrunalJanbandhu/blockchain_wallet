// backend-api/controllers/tokenController.js
const { ethers } = require("ethers");
const abi = require("../utils/abi.json").abi;

const provider = new ethers.JsonRpcProvider(process.env.ARBITRUM_RPC);
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
const contract = new ethers.Contract(process.env.STABLECOIN_ADDRESS, abi, wallet);
const logger = require("../utils/logger");

// MINT (Admin only, validated in middleware)
exports.mintToken = async (req, res) => {
  const { to, amount } = req.body;
  const caller = req.headers["x-wallet-address"]?.toLowerCase();

  try {
    const checksummedTo = ethers.getAddress(to);
    const parsedAmount = ethers.parseUnits(amount, 18);
    const tx = await contract.mint(checksummedTo, parsedAmount);
    await tx.wait();

    logger.info("Mint request successful", { caller, to, amount, txHash: tx.hash });
    res.json({ success: true, txHash: tx.hash });
  } catch (err) {
    logger.error("Mint failed", { caller, error: err.message });
    res.status(500).json({ error: err.message });
  }
};

// TRANSFER (Open to anyone)
exports.transferToken = async (req, res) => {
  const { to, amount } = req.body;
  const caller = req.headers["x-wallet-address"]?.toLowerCase();

  try {
    const parsedAmount = ethers.parseUnits(amount, 18);
    const tx = await contract.transfer(to, parsedAmount);
    await tx.wait();

    logger.info("Transfer successful", { caller, to, amount, txHash: tx.hash });
    res.json({ success: true, txHash: tx.hash });
  } catch (err) {
    logger.error("Transfer failed", { caller, error: err.message });
    res.status(500).json({ error: err.message });
  }
};

// BURN (Admin only)
exports.burnToken = async (req, res) => {
  const { from, amount } = req.body;
  const caller = req.headers["x-wallet-address"]?.toLowerCase();

  try {
    const parsedAmount = ethers.parseUnits(amount, 18);
    const tx = await contract.burnFrom(from, parsedAmount);
    await tx.wait();

    logger.info("Burn successful", { caller, from, amount, txHash: tx.hash });
    res.json({ success: true, txHash: tx.hash });
  } catch (err) {
    logger.error("Burn failed", { caller, error: err.message });
    res.status(500).json({ error: err.message });
  }
};

// BALANCE CHECK
exports.balanceToken = async (req, res) => {
  const { address } = req.body;
  const caller = req.headers["x-wallet-address"]?.toLowerCase();

  try {
    const rawBalance = await contract.balanceOf(address);
    const decimals = await contract.decimals();
    const balance = ethers.formatUnits(rawBalance, decimals);

    logger.info("Balance check", { caller, address, balance });
    res.json({ success: true, balance });
  } catch (err) {
    logger.error("Balance check failed", { caller, error: err.message });
    res.status(500).json({ error: err.message });
  }
};
