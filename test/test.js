const { assert } = require("chai");
const { ethers } = require("hardhat");

describe("Nomad", function () {
    let addr1;
    let nomad;
    beforeEach(async () => {
        [addr1] = await ethers.provider.listAccounts();
        const Nomad = await ethers.getContractFactory("Nomad");
        nomad = await Nomad.deploy();
    });

    describe("creating a new universe controlled by an EOA", () => {
        beforeEach(async () => {
            await nomad.createUniverse(1, addr1);
        });

        it("should set the properties", async () => {
            const universe = await nomad.universes(0);
            assert.equal(universe.governor, addr1);
            assert.equal(universe.tax, 1);
        });
    });

    describe("created a new universe with governance", () => {
        let governor, votesToken, timelock;
        beforeEach(async () => {
            const TimelockController = await ethers.getContractFactory("TimelockController");
            timelock = await TimelockController.deploy(0, [addr1], [addr1]);

            const VotesToken = await ethers.getContractFactory("UniverseToken");
            const votesToken = await VotesToken.deploy("Universe1", "Uni1");

            const UniverseGovernor = await ethers.getContractFactory("UniverseGovernor");
            governor = await UniverseGovernor.deploy(votesToken.address, timelock.address);

            await nomad.createUniverse(1, governor.address);
        });

        it("should set the properties", async () => {
            const universe = await nomad.universes(0);
            assert.equal(universe.governor, governor.address);
            assert.equal(universe.tax, 1);
        });
    });
});
