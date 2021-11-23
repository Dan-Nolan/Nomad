const nomadAddress = "0x4731478A76e4bC5f012a569D061bE19c03c9177F";
const swordContractAddr = "0xc95439940280a6964b270b0373F25258d6F53c6C";
const universeId = 0;

async function main() {
    const nomad = await hre.ethers.getContractAt("Nomad", nomadAddress);
    await nomad.addResource(swordContractAddr, universeId, {
        gasPrice: ethers.utils.parseUnits("20", "gwei")
    });
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
