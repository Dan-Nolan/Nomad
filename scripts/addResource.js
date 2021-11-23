const nomadAddress = "0xcFe9AA2366f5Fb67F3D8EC2a6eB48E2a5328DDF3";
const swordContractAddr = "0xcB8bA41AC64727A850e29a9971fECdFFB87dBd00";
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
