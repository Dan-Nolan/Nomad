const { assert } = require("chai");
const { ethers } = require("hardhat");

describe("Nomad", function () {
    let addr1, treasury;
    let nomad;
    beforeEach(async () => {
        treasury = ethers.Wallet.createRandom();
        [addr1] = await ethers.provider.listAccounts();
        const Nomad = await ethers.getContractFactory("Nomad");
        nomad = await Nomad.deploy();
    });

    describe("creating a new universe controlled by an EOA", () => {
        const universeId = 0;
        let tax = 1;
        beforeEach(async () => {
            await nomad.createUniverse(1, addr1);
        });

        it("should set the properties", async () => {
            const universe = await nomad.universes(universeId);
            assert.equal(universe.governor, addr1);
            assert.equal(universe.tax, tax);
        });

        describe("moving a resource", () => {
            let sword;
            const tokenId = 1;
            beforeEach(async () => {
                await nomad.createWorld(universeId, "The Lost Kingdom", treasury.address);
                await nomad.createWorld(universeId, "Town Square", treasury.address);

                const Sword = await hre.ethers.getContractFactory("Sword");
                sword = await Sword.deploy();

                await nomad.addResource(sword.address, universeId);

                await sword.mint(addr1);

                await nomad.moveResource(sword.address, universeId, 1, tokenId, {
                    value: tax
                });
            });

            it("should move the resource to world 1", async () => {
                const worldId = await nomad.getResourceWorldId(universeId, sword.address, tokenId);

                assert(worldId.eq(1));
            });

            it("should pay the world treasury", async () => {
                const balance = await ethers.provider.getBalance(treasury.address);
                
                assert(balance.eq(tax))
            });
        });
    });

    describe("created a new universe with governance", () => {
        let governor, votesToken, timelock;
        beforeEach(async () => {
            const TimelockController = await ethers.getContractFactory("TimelockController");
            timelock = await TimelockController.deploy(0, [addr1], [addr1]);

            const VotesToken = await ethers.getContractFactory("UniverseToken");
            votesToken = await VotesToken.deploy("Universe1", "Uni1");

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
