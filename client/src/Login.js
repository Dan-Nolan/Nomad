/* global BigInt */
import { useState } from 'react';
import "./Login.scss";
import { ethers } from "ethers";

const { ethereum } = window;
const ADDRESS_PERMISSION_PREFIX = "0x4b80742d0000000082ac0000";
const SIGN_PERMISSION = 0x200;

// demo profile: 0x92836Fda575E13947dc7b5D5d9a0418fCf152670

function Login() {
    const [inputMode, setInputMode] = useState(false);
    const [inputValue, setInputValue] = useState("");

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

            const provider = new ethers.providers.Web3Provider(ethereum);
            const iface = new ethers.utils.Interface([
                "function getData(bytes32[] memory _keys) view returns (bytes[] memory values)"
            ]);
            const calldata = iface.encodeFunctionData("getData", [
                [permissionKey]
            ]);

            const result = await provider.call({
                to: profileAddress,
                data: calldata
            })

            const [[data]] = iface.decodeFunctionResult("getData", result);
            if(data === "0x") {
                alert("No profile permissions found on selected address: " + ethereum.selectedAddress);
                return;
            }
            
            const permissions = BigInt(data);
            const hasSignPermission = Boolean(BigInt(SIGN_PERMISSION) & permissions);

            if(hasSignPermission) {
                const signer = await provider.getSigner(0);
                signer.signMessage("Verify your account on Nomad to use your Universal Profile").then(() => {
                    console.log("log in!");
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

export default Login;
