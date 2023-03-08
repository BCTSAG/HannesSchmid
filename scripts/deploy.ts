const { ethers } = require("hardhat");

async function main() {

  // Get the contract owner
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);
  console.log("Account balance:", (await deployer.getBalance()).toString());

  // Hardhat helper to get the ethers contractFactory object
  const HSMickJagger = await ethers.getContractFactory('HSMickJagger');
  const HSFreddieMercury = await ethers.getContractFactory('HSMickJagger');
  const HSPeterAllen = await ethers.getContractFactory('HSPeterAllen');
  const HSPhilCollins = await ethers.getContractFactory('HSPhilCollins');
  const HSDavidLeeRoth = await ethers.getContractFactory('HSDavidLeeRoth');

  // Deploy all contracts
  console.log('Deploying HSMickJagger...');
  const hsMickJagger = await HSMickJagger.deploy();
  await hsMickJagger.deployed();
  console.log(`HSMickJagger deployed to: ${hsMickJagger.address}`)

  console.log('Deploying HSFreddieMercury...');
  const hsFreddieMercury = await HSFreddieMercury.deploy();
  await hsFreddieMercury.deployed();
  console.log(`HSFreddieMercury deployed to: ${hsFreddieMercury.address}`)

  console.log('Deploying HSPeterAllen...');
  const hsPeterAllen = await HSPeterAllen.deploy();
  await hsPeterAllen.deployed();
  console.log(`HSPeterAllen deployed to: ${hsPeterAllen.address}`)

  console.log('Deploying HSPhilCollins...');
  const hsPhilCollins = await HSPhilCollins.deploy();
  await hsPhilCollins.deployed();
  console.log(`HSPhilCollins deployed to: ${hsPhilCollins.address}`)

  console.log('Deploying HSDavidLeeRoth...');
  const hsDavidLeeRoth = await HSDavidLeeRoth.deploy();
  await hsDavidLeeRoth.deployed();
  console.log(`HSDavidLeeRoth deployed to: ${hsDavidLeeRoth.address}`)

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });