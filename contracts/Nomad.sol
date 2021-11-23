//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "@lukso/universalprofile-smart-contracts/contracts/LSP8IdentifiableDigitalAsset/ILSP8IdentifiableDigitalAsset.sol";

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
        uint worldId;
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

    function addResource(address resource, uint universeId, uint worldId) external {
        require(msg.sender == universes[universeId].governor);
        universes[universeId].resources[resource] = Resource(worldId);
    }

    function moveResource(address resource, uint universeId, uint destinationWorldId, uint tokenId) external payable {
        require(ILSP8IdentifiableDigitalAsset(resource).tokenOwnerOf(bytes32(tokenId)) == msg.sender, "Not the Resource Owner");

        Universe storage universe = universes[universeId];

        require(msg.value == universe.tax, "Must pay the universe tax");

        World storage destination = universe.worlds[destinationWorldId];

        payable(destination.treasury).transfer(msg.value);

        universe.resources[resource].worldId = destinationWorldId;
    }
}
