async function main() {
  const Nomad = await hre.ethers.getContractFactory("Nomad");
  const nomad = await Nomad.deploy();

  await nomad.deployed();

  console.log("Nomad deployed to:", nomad.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
