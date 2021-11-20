require("@nomiclabs/hardhat-waffle");
require("dotenv").config();

module.exports = {
  solidity: "0.8.4",
  networks: {
    lukso: {
      url: "https://rpc.l14.lukso.network",
      accounts: [process.env.PRIVATE_KEY]
    }
  }
};
