import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

// ADD PRIVATE_KEY AND ALCHEMY_API_KEY IF NEEDED
const ALCHEMY_API_KEY = "";
const PRIVATE_KEY = "";

const config: HardhatUserConfig = {
  solidity: "0.8.18",
  networks: {
    eth_mainnet: {
      url: `https://eth-mainnet.g.alchemy.com/v2/${ALCHEMY_API_KEY}`,
      accounts: [PRIVATE_KEY]
    },
    goerli: {
    url: `https://eth-goerli.alchemyapi.io/v2/${ALCHEMY_API_KEY}`,
    accounts: [PRIVATE_KEY]
    },
    polygon_mumbai: {
      url: "https://rpc-mumbai.maticvigil.com",
      accounts: [PRIVATE_KEY]
    },
    sepolia: {
      url: "https://rpc.sepolia.org",
      accounts: [PRIVATE_KEY]
    }
  }
};

export default config;
