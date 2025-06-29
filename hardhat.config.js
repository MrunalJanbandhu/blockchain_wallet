require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

module.exports = {
  solidity: "0.8.20",
  networks: {
    arbitrum_sepolia: {
      url: process.env.ARBITRUM_RPC,
      accounts: [process.env.PRIVATE_KEY],
    },
  },
};
