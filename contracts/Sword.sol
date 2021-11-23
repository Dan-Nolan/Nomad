// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./Asset.sol";

contract Sword is Asset {
    constructor() LSP8IdentifiableDigitalAsset("Sword", "SWD", msg.sender) {}
}
