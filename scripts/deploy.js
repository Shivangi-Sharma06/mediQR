const hre = require("hardhat");

async function main() {
  const MediQR = await hre.ethers.getContractFactory("mediQR");
  const mediQR = await MediQR.deploy();
  await mediQR.waitForDeployment();
  console.log("Contract deployed to:", await mediQR.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
