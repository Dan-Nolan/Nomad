const nomadAddress = "0x0A48c6EE52c23a68D1cd9205333B21D0D2E5abA2";
const universeId = 0;

async function main() {
    const nomad = await hre.ethers.getContractAt("Nomad", nomadAddress);
    const [addr1] = await ethers.provider.listAccounts();
    
    const tx = await nomad.createWorld(universeId, "The Lost Kingdom", addr1, {
        gasPrice: ethers.utils.parseUnits("20", "gwei")
    });
    await tx.wait();

    const tx2 = await nomad.createWorld(universeId, "Town Square", addr1, {
        gasPrice: ethers.utils.parseUnits("20", "gwei")
    });
    await tx2.wait();
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
