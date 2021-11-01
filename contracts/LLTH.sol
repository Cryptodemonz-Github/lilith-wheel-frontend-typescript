//SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract LLTH is ERC20, Ownable {
    mapping(address => bool) public managers;

    event MintEvent(address user, uint256 amount);
    event BurnEvent(address user, uint256 amount);

    constructor() ERC20("Lilith", "LLTH") {
        _mint(owner(), 1000000 * (10**18));
        _mint(0xdD26F23913Af16078E7500bE45b8416dE263bC0C, 1000000 * (10**18));
        _mint(0x44042F9942130947C634bF92376520cAF5Aedc65, 1000000 * (10**18));
    }

    /**@dev Allows execution by managers only */
    modifier managerOnly() {
        require(managers[msg.sender]);
        _;
    }

    function setManager(address manager, bool state) external onlyOwner {
        managers[manager] = state;
    }

    function mint(address user, uint256 amount) external managerOnly {
        _mint(user, amount);
        emit MintEvent(user, amount);
    }

    function burn(address user, uint256 amount) public managerOnly {
        _burn(user, amount);
        emit BurnEvent(user, amount);
    }
}
