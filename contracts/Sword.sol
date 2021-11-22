// Sword.sol
// SPDX-License-Identifier: MIT

import "@lukso/universalprofile-smart-contracts/contracts/LSP7DigitalAsset/LSP7DigitalAsset.sol";

pragma solidity ^0.8.0;

contract Sword is LSP7DigitalAsset {
    constructor() LSP7DigitalAsset("Sword", "SWD", msg.sender, true) {}

    function mint(address _recipient) external {
        _mint(_recipient, 1, true, "");
    }
}
