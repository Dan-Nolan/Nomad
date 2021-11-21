import Web3 from 'web3';
import { ERC725 } from '@erc725/erc725.js';

const RPC_ENDPOINT = 'https://rpc.l14.lukso.network';
const IPFS_GATEWAY = 'https://ipfs.lukso.network/ipfs/';

const schema = [
    {
        name: 'LSP3Profile',
        key: '0x5ef83ad9559033e6e941db7d7c495acdce616347d28e90c7ce47cbfcfcad3bc5',
        keyType: 'Singleton',
        valueContent: 'JSONURL',
        valueType: 'bytes',
    },
];

const provider = new Web3.providers.HttpProvider(RPC_ENDPOINT);
const config = {
    ipfsGateway: IPFS_GATEWAY,
};

const getERC725 = (contractAddress) => {
    return new ERC725(schema, contractAddress, provider, config);
}

export default getERC725;