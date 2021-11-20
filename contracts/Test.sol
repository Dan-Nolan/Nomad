//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "./ILSP6KeyManager.sol";
import "hardhat/console.sol";

contract Test {
    constructor() {
        console.logBytes4(type(ILSP6KeyManager).interfaceId);
    }
}
