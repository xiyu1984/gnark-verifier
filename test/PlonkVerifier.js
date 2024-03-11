const {
    time,
    loadFixture,
  } = require("@nomicfoundation/hardhat-toolbox/network-helpers");
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
const { expect } = require("chai");
const fs = require('fs');

describe("PlonkVerifier", function () {
    async function deployAddVerifier() {
        // Contracts are deployed using the first signer/account by default
        const [owner, otherAccount] = await ethers.getSigners();
    
        const verifierFactory = await ethers.getContractFactory("PlonkVerifier");
        const verifier = await verifierFactory.deploy();
    
        return verifier;
    }

    describe("Simple add circuit KZG verification", function () {
        it("deploy and verify should pass", async function () {
            const verifier = await loadFixture(deployAddVerifier);

            const proof_bytes = fs.readFileSync('./data/add_proof.proof');
            const pis_json = JSON.parse(fs.readFileSync('./data/add_public.wit'));
            
            const pis_arr = pis_json.X.concat(pis_json.Y);

            await expect(verifier.Verify(proof_bytes, pis_arr)).not.to.be.reverted;
        });
    })
})