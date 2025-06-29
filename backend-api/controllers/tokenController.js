// backend-api/controllers/tokenController.js
const { ethers } = require("ethers");
const abi = require("../utils/abi.json").abi;

const provider = new ethers.JsonRpcProvider(process.env.ARBITRUM_RPC);
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
const contract = new ethers.Contract(process.env.STABLECOIN_ADDRESS, abi, wallet);

// MINT (Admin only, validated in middleware)
exports.mintToken = async (req, res) => {
  const { to, amount } = req.body;
  try {
    const checksummedTo = ethers.getAddress(to);
    const parsedAmount = ethers.parseUnits(amount, 18);
    const tx = await contract.mint(checksummedTo, parsedAmount);
    await tx.wait();
    res.json({ success: true, txHash: tx.hash });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// TRANSFER (Open to anyone)
exports.transferToken = async (req, res) => {
  const { to, amount } = req.body;
  try {
    const tx = await contract.transfer(to, ethers.parseUnits(amount, 18));
    await tx.wait();
    res.json({ success: true, txHash: tx.hash });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// BURN (Admin only, validated in middleware)
exports.burnToken = async (req, res) => {
  const { from, amount } = req.body;
  try {
    const tx = await contract.burnFrom(from, ethers.parseUnits(amount, 18));
    await tx.wait();
    res.json({ success: true, txHash: tx.hash });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// BALANCE CHECK (Open to anyone)
exports.balanceToken = async (req, res) => {
  const { address } = req.body;
  try {
    const rawBalance = await contract.balanceOf(address);
    const decimals = await contract.decimals();
    const balance = ethers.formatUnits(rawBalance, decimals);
    res.json({ success: true, balance });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
