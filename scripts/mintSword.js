const swordContractAddr = "0x49Cda4f63Fe81b653007D04c49591a2096Ea39B7";
const recipient = "0x92836Fda575E13947dc7b5D5d9a0418fCf152670";

async function main() {
  const sword = await hre.ethers.getContractAt("Sword", swordContractAddr);
  await sword.mint(recipient, {
    gasPrice: ethers.utils.parseUnits("20", "gwei")
  });
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
