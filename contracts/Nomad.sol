//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "./Asset.sol";

contract Nomad {
    Universe[] public universes;

    struct Universe {
        mapping(address => Resource) resources;
        World[] worlds;
        address governor;
        uint tax;
    }

    struct World {
        string name;
        address treasury;
    }

    struct Resource {
        mapping(uint => uint) tokenToWorldId;
        bool initialized; 
    }

    function createUniverse(uint _tax, address _governor) external {
        Universe storage universe = universes.push();
        universe.tax = _tax;
        universe.governor = _governor;
    }

    function createWorld(uint universeId, string calldata name, address treasury) external {
        require(msg.sender == universes[universeId].governor);
        World storage world = universes[universeId].worlds.push();
        world.name = name;
        world.treasury = treasury;
    }

    function getWorld(uint universeId, uint worldId) external view returns(World memory) {
        return universes[universeId].worlds[worldId];
    }

    function addResource(address resource, uint universeId) external {
        require(msg.sender == universes[universeId].governor);
        Resource storage res = universes[universeId].resources[resource];
        res.initialized = true;
    }

    function mintResource(address resource, uint universeId, uint destinationWorldId) external {
        uint tokenId = Asset(resource).mint(msg.sender);
        Universe storage universe = universes[universeId];
        universe.resources[resource].tokenToWorldId[tokenId] = destinationWorldId;
    }

    function getResourceWorldId(uint universeId, address resource, uint tokenId) external view returns(uint) {
        return universes[universeId].resources[resource].tokenToWorldId[tokenId];
    }

    function moveResource(address resource, uint universeId, uint destinationWorldId, uint tokenId) external payable {
        require(ILSP8IdentifiableDigitalAsset(resource).tokenOwnerOf(bytes32(tokenId)) == msg.sender, "Not the Resource Owner");

        Universe storage universe = universes[universeId];

        require(msg.value == universe.tax, "Must pay the universe tax");

        World storage destination = universe.worlds[destinationWorldId];

        payable(destination.treasury).transfer(msg.value);

        universe.resources[resource].tokenToWorldId[tokenId] = destinationWorldId;
    }
}
