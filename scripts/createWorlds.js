const nomadAddress = "0xa0687B0d5C66C46260B448AAd68555c13e46D160";
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
