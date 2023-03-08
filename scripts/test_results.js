const { ethers } = require("hardhat");

// Fill out contract addresses received when deployed
const contractAddressHSDLR = '0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9';
const contractAddressHSFM = '0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512';
const contractAddressHSMJ = '0x5FbDB2315678afecb367f032d93F642f64180aa3';
const contractAddressHSPA = '0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0';
const contractAddressHSPC = '0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9';

async function main() {
    const signers = await ethers.getSigners();
    const contractOwner = signers[0].address;

    console.log('Getting the HSMickJagger token contract...\n');
    const hsMickJagger = await ethers.getContractAt('HSMickJagger', contractAddressHSMJ);

    let provi = await ethers.provider.getCode(contractAddressHSMJ);
    console.log(provi);

    let total_supply = await hsMickJagger.totalSupply();
    console.log(total_supply);

}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exitCode = 1;
    });