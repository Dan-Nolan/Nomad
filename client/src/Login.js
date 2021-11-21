/* global BigInt */
import { useState, useContext } from 'react';
import "./Login.scss";
import { ethers } from "ethers";
import { StoreContext } from "utils/Store";
import getERC725 from 'utils/getERC725';

const { ethereum } = window;
const ADDRESS_PERMISSION_PREFIX = "0x4b80742d0000000082ac0000";
const LSP3_PROFILE_KEY = "0x5ef83ad9559033e6e941db7d7c495acdce616347d28e90c7ce47cbfcfcad3bc5";
const SIGN_PERMISSION = 0x200;

// demo profile: 0x92836Fda575E13947dc7b5D5d9a0418fCf152670

function Login() {
    const [inputMode, setInputMode] = useState(false);
    const [inputValue, setInputValue] = useState("");

    const { profile: [profile, setProfile] } = useContext(StoreContext);

    if (profile.loggedIn) {
        return null;
    }

    if (inputMode) {
        return (
            <input
                autoFocus
                type="text"
                value={inputValue}
                className="upl-input"
                onChange={checkAddress}
                placeholder="Enter Profile Address..." />
        )
    }

    async function checkAddress(event) {
        const profileAddress = event.target.value;
        setInputValue(profileAddress);
        if (ethers.utils.isAddress(profileAddress)) {
            await ethereum.request({ method: 'eth_requestAccounts' });
            const permissionKey = ADDRESS_PERMISSION_PREFIX + ethereum.selectedAddress.slice(2);

            const erc725 = await getERC725(profileAddress, ethereum.selectedAddress);

            const provider = new ethers.providers.Web3Provider(ethereum);

            const data = await getData(provider, profileAddress, permissionKey);
            if (data === "0x") {
                alert("No profile permissions found on selected address: " + ethereum.selectedAddress);
                return;
            }

            const hasSignPermission = Boolean(BigInt(SIGN_PERMISSION) & BigInt(data));

            if (hasSignPermission) {
                const signer = await provider.getSigner(0);
                signer.signMessage("Verify your account on Nomad to use your Universal Profile").then(async () => {
                    const { LSP3Profile: { LSP3Profile } } = await erc725.fetchData("LSP3Profile");
                    setProfile({ loggedIn: true, LSP3Profile });
                }).catch(console.log);
            } else {
                alert("Sign permission not found on selected address: " + ethereum.selectedAddress);
            }
        }
    }

    return (
        <div className="upl" onClick={() => setInputMode(true)}>
            Universal Profile Login
        </div>
    );
}

const iface = new ethers.utils.Interface([
    "function getData(bytes32[] memory _keys) view returns (bytes[] memory values)"
]);

async function getData(provider, profileAddress, key) {
    const calldata = iface.encodeFunctionData("getData", [
        [key]
    ]);

    const result = await provider.call({
        to: profileAddress,
        data: calldata
    })

    const [[data]] = iface.decodeFunctionResult("getData", result);
    return data;
}

export default Login;
