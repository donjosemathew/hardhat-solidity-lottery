const { ethers } = require("hardhat");

const networkConfig = {
  4: {
    name: "rinkeby",
    entranceFee: ethers.utils.parseEther("0.01"),
    ethUsdPriceFeed: "0x5f4eC3Df9cbd43714FE2740f5E3616155c5b8419",
    gasLane:
      "0x79d3d8832d904592c0bf9818b621522c988bb8b0c05cdc3b15aea1b6e8db0c15",
    subscriptionId: "0",
    callbackGasLimit: "500000",
    interval: "30",
  },
  137: {
    name: "polygon",
    gasLane:
      "0x79d3d8832d904592c0bf9818b621522c988bb8b0c05cdc3b15aea1b6e8db0c15",
    entranceFee: ethers.utils.parseEther("0.01"),
    ethUsdPriceFeed: "0xF9680D99D6C9589e2a93a78A04A279e509205945",
    callbackGasLimit: "500000",
    interval: "30",
  },
  5: {
    name: "goerli",
    callbackGasLimit: "500000",
    interval: "30",
    gasLane:
      "0x79d3d8832d904592c0bf9818b621522c988bb8b0c05cdc3b15aea1b6e8db0c15",
    entranceFee: ethers.utils.parseEther("0.01"),
    vrfCoordinatorV2: "0x2Ca8E0C643bDe4C2E08ab1fA0da3401AdAD7734D",
    ethUsdPriceFeed: "0xD4a33860578De61DBAbDc8BFdb98FD742fA7028e",
  },
  31337: {
    name: "localhost",
    entranceFee: ethers.utils.parseEther("0.01"),
    subscriptionId: "588",
    gasLane:
      "0xd89b2bf150e3b9e13446986e571fb9cab24b13cea0a43ea20a6049a85cc807cc", // 30 gwei
    keepersUpdateInterval: "30",
    raffleEntranceFee: ethers.utils.parseEther("0.01"), // 0.01 ETH
    callbackGasLimit: "500000", // 500,000 gas
    interval: "30",
  },
};

const developmentChains = ["hardhat", "localhost"];
const DECIMALS = 8;
const INITIAL_ANSWER = 200000000;
module.exports = { networkConfig, developmentChains, DECIMALS, INITIAL_ANSWER };
