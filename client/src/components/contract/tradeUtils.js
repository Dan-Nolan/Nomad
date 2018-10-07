import {
  ContractWrappers,
  Web3ProviderEngine,
  generatePseudoRandomSalt,
  orderHashUtils,
  signatureUtils,
  assetDataUtils,
  RPCSubprovider,
  SignerType,
} from '0x.js';
import { SignerSubprovider } from '@0xproject/subproviders';
import { Web3Wrapper } from '@0xproject/web3-wrapper';

import {web3} from './web3util.js';
import BigNumber from 'bignumber.js';

const weiToEth = Math.pow(10, 18);
const ZERO = "0";
const NULL_ADDRESS = "0x0000000000000000000000000000000000000000";

const KOVAN_NETWORK_ID = 42;
const KOVAN_RPC = 'https://kovan.infura.io';
const WETH9 = "0xd0a1e359811322d97991e03f863a0c30c2cf029c";
const POINT_ONE_ETHER = Web3Wrapper.toBaseUnitAmount(new BigNumber(0.01), 18);

const providerEngine = new Web3ProviderEngine({ pollingInterval: 10000 });
// All signing based requests are handled by the SignerSubprovider
providerEngine.addProvider(new SignerSubprovider(web3.currentProvider));
// All other requests will fall through to the next subprovider, such as data requests
providerEngine.addProvider(new RPCSubprovider(KOVAN_RPC));
providerEngine.start();

const erc20ProxyContractAddress = "0x5bc0de240e1c1b211538ca077a82bb39f4179087";
const erc721ProxyContractAddress = "0x6b17ec0b94810e58eac961e501dba27ff35da0fb";
const exchangeContractAddress = "0xb65619b82c4d385de0c5b4005452c2fdee0f86d1";

const wrappers = new ContractWrappers(providerEngine, {
  networkId: KOVAN_NETWORK_ID,
	erc20ProxyContractAddress,
	erc721ProxyContractAddress,
	exchangeContractAddress,
});
const etherTokenWrapper = wrappers.etherToken;
const erc20TokenWrapper = wrappers.erc20Token;
const erc721TokenWrapper = wrappers.erc721Token;
const exchangeWrapper = wrappers.exchange;
const web3Wrapper = new Web3Wrapper(providerEngine);

function getWethBalance(address) {
  return erc20TokenWrapper.getBalanceAsync(WETH9, address);
}

function wrap(address, weth) {
  return etherTokenWrapper.depositAsync(WETH9, new BigNumber(weth * weiToEth), address);
}

async function createSignedOrder(maker, makerTokenAddress, makerTokenId) {
  // Allow the 0x ERC20 Proxy to move ERC721s on behalf of makerAccount
  const makerERC721ApprovalTxHash = await erc721TokenWrapper.setProxyApprovalForAllAsync(
    makerTokenAddress.toLowerCase(),
    maker.toLowerCase(),
    true,
  );
  await web3Wrapper.awaitTransactionSuccessAsync(makerERC721ApprovalTxHash);

  const exchangeAddress = exchangeWrapper.getContractAddress();

  const order = {
    exchangeAddress,
    makerAddress: maker.toLowerCase(),
    takerAddress: NULL_ADDRESS,
    senderAddress: NULL_ADDRESS,
    feeRecipientAddress: NULL_ADDRESS,
    expirationTimeSeconds: new BigNumber(1578704538944),
    salt: generatePseudoRandomSalt(),
    makerAssetAmount: new BigNumber(1),
    takerAssetAmount: POINT_ONE_ETHER,
    makerAssetData: assetDataUtils.encodeERC721AssetData(makerTokenAddress.toLowerCase(), new BigNumber(1)),
    takerAssetData: assetDataUtils.encodeERC20AssetData(WETH9.toLowerCase()),
    makerFee: ZERO,
    takerFee: ZERO,
  }
  const orderHashHex = orderHashUtils.getOrderHashHex(order);
  const signature = await signatureUtils.ecSignOrderHashAsync(providerEngine, orderHashHex, maker.toLowerCase(), SignerType.Metamask);
  return { ...order, signature };
}

async function trade(signedOrder, taker) {
  // Allow the 0x ERC20 Proxy to move WETH on behalf of takerAccount
  const takerWETHApprovalTxHash = await erc20TokenWrapper.setUnlimitedProxyAllowanceAsync(
      WETH9.toLowerCase(),
      taker.toLowerCase()
  );
  await web3Wrapper.awaitTransactionSuccessAsync(takerWETHApprovalTxHash);

  try {
    await exchangeWrapper.validateFillOrderThrowIfInvalidAsync(signedOrder, POINT_ONE_ETHER, taker.toLowerCase());
    let txHash = await exchangeWrapper.fillOrderAsync(signedOrder, POINT_ONE_ETHER, taker.toLowerCase(), {
        gasLimit: 400000,
    });
    return await web3Wrapper.awaitTransactionSuccessAsync(txHash);
  }
  catch(ex) {
    console.log(ex);
    debugger;
  }
}

export { wrap, getWethBalance, trade, createSignedOrder };
