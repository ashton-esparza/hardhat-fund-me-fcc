// function deployFunc() {
//   console.log("Hello World!");
// }

// module.exports.default = deployFunc;

const { getNamedAccounts, network } = require("hardhat");
const {
  networkConfig,
  developmentChains,
} = require("../helper-hardhat-config");
//const ethUsdPriceFeedAddress = networkConfig[chainId]["ethUsdPriceFeed"];

module.exports = async ({ getNamedAccounts, deployments }) => {
  const { deploy, log } = deployments;
  const { deployer } = await getNamedAccounts();
  const chainId = network.config.chainId;
  //const ethUsdPriceFeedAddress = networkConfig[chainId]["ethUsdPriceFeed"];
  let ethUsdPriceFeedAddress;

  if (developmentChains.includes(network.name)) {
    const ethUsdAggregator = await deployments.get("MockV3Aggregator");
    ethUsdPriceFeedAddress = ethUsdAggregator.address;
  } else {
    ethUsdPriceFeedAddress = networkConfig[chainId]["ethUsdPriceFeed"];
  }

  log("Deploying FundMe.sol...");
  log("------------------------------------------------");
  const fundMe = await deploy("FundMe", {
    from: deployer,
    args: [ethUsdPriceFeedAddress], //price feed address
    log: true,
  });
  log("------------------------------------------------");
};

module.exports.tags = ["all", "fundme"];
