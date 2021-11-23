const nomadAddress = "0x4731478A76e4bC5f012a569D061bE19c03c9177F";

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
