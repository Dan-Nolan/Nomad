import {ethers} from 'ethers';

const SWORD_ADDRESS = "0x49Cda4f63Fe81b653007D04c49591a2096Ea39B7";
const NOMAD_ADDRESS = "0xa0687B0d5C66C46260B448AAd68555c13e46D160";

async function getSword() {
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = await provider.getSigner(0);
        
    const abi = [
        "function mint(address) external returns(uint)"
    ];

    const sword = new ethers.Contract(SWORD_ADDRESS, abi, signer);
    
    const [tokenId] = await sword.tokenIdsOf(await signer.getAddress());


}

export default getSword;


