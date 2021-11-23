const nomadAddress = "0xa0687B0d5C66C46260B448AAd68555c13e46D160";

async function main() {
    const nomad = await hre.ethers.getContractAt("Nomad", nomadAddress);
    const [addr1] = await ethers.provider.listAccounts();
    await nomad.createUniverse(1, addr1, {
        gasPrice: ethers.utils.parseUnits("20", "gwei")
    });
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
