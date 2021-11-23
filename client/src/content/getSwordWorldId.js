import {ethers} from 'ethers';

const ethereum = window.ethereum;

const SWORD_ADDRESS = "0xcB8bA41AC64727A850e29a9971fECdFFB87dBd00";
const NOMAD_ADDRESS = "0xcFe9AA2366f5Fb67F3D8EC2a6eB48E2a5328DDF3";

async function getSwordWorldId() {
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = await provider.getSigner(0);

    const sword = new ethers.Contract(SWORD_ADDRESS, [
        "function tokenIdsOf(address tokenOwner) public view returns (bytes32[] memory)"
    ], signer);
    
    let [tokenId] = await sword.tokenIdsOf(await signer.getAddress());
    
    tokenId = parseInt(tokenId);

    const nomad = new ethers.Contract(NOMAD_ADDRESS, [
        "function getResourceWorldId(uint, address, uint) external view returns(uint)"
    ], signer);

    let worldId = -1;
    try {
        worldId = await nomad.getResourceWorldId(0, sword.address, tokenId);
    }
    catch(ex) {

    }

    return worldId;
}

export default getSwordWorldId;


