const { network, ethers } = require("hardhat");
const {
  developmentChains,
  networkConfig,
} = require("../helper-hardhat-config");
const { verify } = require("../utils/verify");
const FUND_AMOUNT = ethers.utils.parseEther("1");
module.exports = async function ({ getNamedAccounts, deployments }) {
  const { deploy, log } = deployments;
  const { deployer } = await getNamedAccounts;
  const chainId = network.config.chainId;
  let vrfCoordinatorV2Address, subscriptionId;
  if (developmentChains.includes(network.name)) {
    const vrfCoordinatorV2Mock = await ethers.getContract(
      "VRFCoordinatorV2Mock"
    );

    vrfCoordinatorV2Address = vrfCoordinatorV2Mock.address;
    const transactionResponse = await vrfCoordinatorV2Mock.createSubscription();

    const transactionReciept = await transactionResponse.wait(1);
    subscriptionId = transactionReciept.events[0].args.subId;

    try {
      await vrfCoordinatorV2Mock.fundSubscription(subscriptionId, FUND_AMOUNT);
    } catch (error) {
      console.log(error);
    }
  } else {
    vrfCoordinatorV2Address = networkConfig[chainId]["vrfCoordinatorv2"];
    subscriptionId = networkConfig[chainId]["subscription"];
  }
  const gasLane = networkConfig[chainId]["gasLane"];
  const entranceFee = networkConfig[chainId]["entranceFee"];
  log(gasLane);
  const callbackGasLimit = networkConfig[chainId]["callbackGasLimit"];
  const interval = networkConfig[chainId]["interval"];
  const args = [
    vrfCoordinatorV2Address,
    entranceFee,
    gasLane,
    subscriptionId,
    callbackGasLimit,
    interval,
  ];

  const raffle = await deploy("Raffle", {
    from: deployer,
    args: args,
    log: true,
    waitConfirmations: network.config.blockConfirmations || 1,
  });
  if (!developmentChains.includes(network.name) && process.env.ETHERSCAN_API) {
    log("Verifying.....");
    await verify(raffle.address, args);
  }
  log("--------------------");
};
module.exports.tags = ["all", "raffle"];
//15:20
