async function main() {
  const Sword = await hre.ethers.getContractFactory("Sword");
  const sword = await Sword.deploy({ gasPrice: ethers.utils.parseUnits("20", "gwei") });

  await sword.deployed();

  console.log("Sword NFT deployed to:", sword.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
