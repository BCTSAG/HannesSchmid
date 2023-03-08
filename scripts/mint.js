const { ethers } = require("hardhat");
const fs = require('fs');

// ADD YOUR CONTRACT ADDRESSES HERE WHEN DEPLOYED!
const contractAddressHSDLR = '';
const contractAddressHSFM = '';
const contractAddressHSMJ = '';
const contractAddressHSPA = '';
const contractAddressHSPC = '';

async function main() {
    let raw_addresses = fs.readFileSync(require('path').resolve(__dirname, '../PublicAddressHannesSchmid.json'));
    let addresses = JSON.parse(raw_addresses);

    const signers = await ethers.getSigners();
    const contractOwner = signers[0].address;

    console.log(`Minting initial HSMJ Collection...\n`);
    const hsMickJagger = await ethers.getContractAt('HSMickJagger', contractAddressHSMJ);
    let rawdata_hsmj = fs.readFileSync(require('path').resolve(__dirname, '../metadata/ipfs_links/HSMJ.json'));
    let hsmj_ipfs = JSON.parse(rawdata_hsmj);
    await mintBatch(addresses, hsmj_ipfs, hsMickJagger, contractOwner);

    // console.log(`Minting initial HSFM Collection...\n`);
    // const hsFreddieMercury = await ethers.getContractAt('HSFreddieMercury', contractAddressHSFM);
    // let rawdata_hsfm = fs.readFileSync(require('path').resolve(__dirname, '../metadata/ipfs_links/HSFM.json'));
    // let hsfm_ipfs = JSON.parse(rawdata_hsfm);
    // await mintBatch(addresses, hsfm_ipfs, hsFreddieMercury);

    // console.log(`Minting initial HSPA Collection...\n`);
    // const hsPeterAllen = await ethers.getContractAt('HSPeterAllen', contractAddressHSPA);
    // let rawdata_hspa = fs.readFileSync(require('path').resolve(__dirname, '../metadata/ipfs_links/HSPA.json'));
    // let hspa_ipfs = JSON.parse(rawdata_hspa);
    // await mintBatch(addresses, hspa_ipfs, hsPeterAllen);

    // console.log(`Minting initial HSPC Collection...\n`);
    // const hsPhilCollins = await ethers.getContractAt('HSPhilCollins', contractAddressHSPC);
    // let rawdata_hspc = fs.readFileSync(require('path').resolve(__dirname, '../metadata/ipfs_links/HSPC.json'));
    // let hspc_ipfs = JSON.parse(rawdata_hspc);
    // await mintBatch(addresses, hspc_ipfs, hsPhilCollins);

    // console.log(`Minting initial HSDLR Collection...\n`);
    // const hsDavidLeeRoth = await ethers.getContractAt('HSDavidLeeRoth', contractAddressHSDLR);
    // let rawdata_hsdlr = fs.readFileSync(require('path').resolve(__dirname, '../metadata/ipfs_links/HSDLR.json'));
    // let hsdlr_ipfs = JSON.parse(rawdata_hsdlr);
    // await mintBatch(addresses, hsdlr_ipfs, hsDavidLeeRoth);

}

async function mintBatch(addresses, ipfs_links, contract) {
    let count = 0;
    for (let addressObj of addresses) {
        count = count + 1;
        let address = addressObj['public_address'];
        let uri = findTokenURI(ipfs_links, count);
        if (uri) {
            let tokenURI = "ipfs://" + uri['cid'] + "/" + count + ".json";
            let tx = await contract.safeMint(address, tokenURI);
            await tx.wait(); // wait for this tx to finish to avoid nonce issues    
            console.log("Minted to address: " + address);
        } else {
            console.log("error minting: " + count);
        }

    }
}

function findTokenURI(ipfs_links, count) {
    for (let uri of ipfs_links) {
        if (uri['id'] == count) {
            return uri;
        }
    }
    return null;
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exitCode = 1;
    });