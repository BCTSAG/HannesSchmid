const { ethers } = require("hardhat");

async function main() {
    console.log('Getting the HSMickJagger token contract...\n');
    const contractAddress = '0x0F5B66F06881C66b90CB5Fe51022c0E5F37A876d';
    const hsMickJagger = await ethers.getContractAt('HSMickJagger', contractAddress);
    const signers = await ethers.getSigners();
    const contractOwner = signers[0].address;

    console.log(`Minting initial NFT collection to ${contractOwner}...`)
    let tx = await hsMickJagger.safeMint(signers[0].address,  "ipfs://bafkreifa22jqyp74ufyqlfp4belsljlmrframo7p3oghlmalima6qfpnfa");
    await tx.wait(); // wait for this tx to finish to avoid nonce issues
    console.log(`NFT minted to ${contractOwner}`);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exitCode = 1;
    });