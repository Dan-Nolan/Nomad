const { LSPFactory } = require("@lukso/lsp-factory.js");

// NOTE: using lspFactory requires node 16.6+ 
async function main() {
  const deployKey = hre.config.networks.lukso.accounts[0];
  const provider = hre.config.networks.lukso.url;
  const chainId = 22; 

  const lspFactory = new LSPFactory(provider, {
    deployKey,
    chainId
  });

  const signer = await hre.ethers.provider.getSigner(0);
  const address = await signer.getAddress();
  const myContracts = await lspFactory.LSP3UniversalProfile.deploy({
    controllingAccounts: [address], 
    lsp3Profile: "ipfs://QmRQyy97xxex2CmKZS6ccM8BfuZprfe8MxXXA6vKd9RJzk"
  });

  console.log(myContracts.ERC725Account.address)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
