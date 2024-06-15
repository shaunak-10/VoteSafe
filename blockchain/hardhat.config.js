require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.24",
  networks: {
    localNetwork: {
      url: "http://127.0.0.1:8545/",
      accounts: [
        "0x4bbbf85ce3377467afe5d46f804f221813b2bb87f24d81f60f1fcdbf7cbf4356",
      ],
      gasPrice: 1000000000,
    },
  },
};
