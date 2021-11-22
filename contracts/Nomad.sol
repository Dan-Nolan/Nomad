//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

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
        address owner;
    }

    struct Resource {
        uint worldId;
    }

    function createUniverse(uint _tax, address _governor) external {
        Universe storage universe = universes.push();
        universe.tax = _tax;
        universe.governor = _governor;
    }

    function createWorld(uint universeId, string calldata name, address owner) external {
        require(msg.sender == universes[universeId].governor);
        World storage world = universes[universeId].worlds.push();
        world.name = name;
        world.owner = owner;
    }

    function addResource(address resource, uint universeId, uint worldId) external {
        require(msg.sender == universes[universeId].governor);
        universes[universeId].resources[resource] = Resource(worldId);
    }

    function moveResource(uint universeId, address resource, uint destinationWorldId) external {
        // TODO: check ownership in a standardized way 
        // reqiure(resource.isOwner(msg.sender))

        // TODO: incorporate resource tax

        universes[universeId].resources[resource].worldId = destinationWorldId;
    }
}
