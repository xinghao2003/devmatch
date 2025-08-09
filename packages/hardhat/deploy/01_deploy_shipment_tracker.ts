import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";

const deployShipmentTracker: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployer } = await hre.getNamedAccounts();
  const { deploy, log } = hre.deployments;

  const result = await deploy("ShipmentTracker", {
    from: deployer,
    args: [],
    log: true,
    autoMine: true,
  });

  log(`ShipmentTracker deployed at ${result.address}`);
};

export default deployShipmentTracker;
deployShipmentTracker.tags = ["ShipmentTracker"];

