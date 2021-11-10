const { assert } = require("chai");
const { ethers } = require("hardhat");

describe("Nomad", function () {
    let addr1;
    let nomad;
    before(async () => {
        [addr1] = await ethers.provider.listAccounts();
        const Nomad = await ethers.getContractFactory("Nomad");
        nomad = await Nomad.deploy();
        await nomad.deployed();
    });

    describe("creating a new universe", () => {
        before(async () => {
            await nomad.createUniverse(1, addr1);
        });

        it("should set the properties", async () => {
            const universe = await nomad.universes(0);
            assert.equal(universe.governor, addr1);
            assert.equal(universe.tax, 1);
        });
    });
});
