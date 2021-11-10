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
}
