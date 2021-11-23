// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@lukso/universalprofile-smart-contracts/contracts/LSP8IdentifiableDigitalAsset/LSP8IdentifiableDigitalAsset.sol";

contract Sword is LSP8IdentifiableDigitalAsset {
    uint count = 0;

    constructor() LSP8IdentifiableDigitalAsset("Sword", "SWD", msg.sender) {}

    function mint(address _recipient) external returns(uint _tokenId) {
        _tokenId = count;
        _mint(_recipient, bytes32(_tokenId), true, "");
        count++;
    }
}
