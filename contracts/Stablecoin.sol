// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Stablecoin is ERC20, Ownable {
    constructor(string memory name, string memory symbol, address initialOwner) 
        ERC20(name, symbol) 
        Ownable(initialOwner) 
    {
        _mint(initialOwner, 1000 * 10 ** decimals());
    }

    /// @notice Mint tokens to any address (only owner can call)
    function mint(address to, uint256 amount) external onlyOwner {
        _mint(to, amount);
    }

    /// @notice Burn tokens from any address (only owner can call)
    function burnFrom(address account, uint256 amount) external onlyOwner {
        _burn(account, amount);
    }
}
