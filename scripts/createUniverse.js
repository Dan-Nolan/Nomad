const nomadAddress = "0xcFe9AA2366f5Fb67F3D8EC2a6eB48E2a5328DDF3";

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
