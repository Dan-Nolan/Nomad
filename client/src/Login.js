import { useState } from 'react';
import "./Login.scss";
import { ethers } from "ethers";

const { ethereum } = window;
const addressPermissionPrefix = "4b80742d0000000082ac0000";
const getDataSelector = "4e3e6e9c";

// 0x4b80742d0000000082ac0000 0x4b80742d0000000082ac000092836Fda575E13947dc7b5D5d9a0418fCf152670
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
        if(ethers.utils.isAddress(profileAddress)) {
            await ethereum.request({ method: 'eth_requestAccounts' });
            const permission = addressPermissionPrefix + ethereum.selectedAddress.slice(2);

            const provider = new ethers.providers.Web3Provider(ethereum);
            const permissions = await provider.call({
                to: profileAddress,
                data: "0x" + getDataSelector + permission
            })
            console.log("hey");
            console.log(permissions);
            // console.log("address!");
        }
    }

    return (
        <div className="upl" onClick={() => setInputMode(true)}>
            Universal Profile Login
        </div>
    );
}

export default Login;
