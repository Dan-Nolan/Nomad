// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@lukso/universalprofile-smart-contracts/contracts/LSP8IdentifiableDigitalAsset/LSP8IdentifiableDigitalAsset.sol";

abstract contract Asset is LSP8IdentifiableDigitalAsset {
    uint idCounter = 1;

    function mint(address _recipient) external returns(uint _tokenId) {
        _tokenId = idCounter;
        _mint(_recipient, bytes32(_tokenId), true, "");
        idCounter++;
    }
}
