import "./Transfer.scss";
import { StoreContext } from "utils/Store";
import { useState, useContext } from 'react';
import kingdom from "images/kingdom-square-logo.jpg";
import townsquare from "images/townsquare-square-logo.jpg";
import { ethers } from 'ethers';

const ethereum = window.ethereum;
const SWORD_ADDRESS = "0xc95439940280a6964b270b0373F25258d6F53c6C";
const NOMAD_ADDRESS = "0x4731478A76e4bC5f012a569D061bE19c03c9177F";

function Transfer() {
    const { dialog: [dialog, setDialog] } = useContext(StoreContext);
    const { game, img, name, id, currentWorld, worldId, display } = dialog;

    const [transferring, setTransferring] = useState(false);

    const canTransfer = (worldId !== undefined) && !transferring;

    async function runTransfer() {
        if(canTransfer) {
            await ethereum.request({ method: 'eth_requestAccounts' });
            
            const provider = new ethers.providers.Web3Provider(ethereum);
            const signer = await provider.getSigner(0);
            
            const nomad = new ethers.Contract(NOMAD_ADDRESS, [
                "function moveResource(address resource, uint universeId, uint destinationWorldId, uint tokenId) external payable"
            ], signer);
            
            const tx = await nomad.moveResource(SWORD_ADDRESS, 0, worldId === 0 ? 1: 0, 1, {
                value: 1
            });

            setTransferring(true);

            await tx.wait();

            setTransferring(false);

            window.location.reload();
        }
    }

    if(display) {
        return (
            <div className="dialog">
                <div className="transfer">
                    <div className="display-image">
                        <img src={img} alt="display" />
                    </div>
                    <div className="info">
                        <div className="top">
                            <div className="title">
                                { name }
                            </div>
                            <div className="token-id">
                                ID: #{id}
                            </div>
                        </div>
                        <div className="bottom">
                            <TransferComponent game={game} currentWorld={currentWorld} worldId={worldId} />
                            <div className="initiate-transfer" disabled={!canTransfer} onClick={runTransfer}>
                                Initiate Transfer
                            </div>
                        </div>
                    </div>
                </div>
                <div className="overlay" onClick={() => setDialog({ display: false })} />
            </div>
        );
    }

    return null;
}

function TransferComponent({ game, currentWorld, worldId }) {
    let otherWorld = currentWorld; 
    let otherGame = game;
    if(worldId !== undefined) {
        if(worldId === 0) {
            otherGame = townsquare;
            otherWorld = "Town Square";
        }
        else if(worldId === 1) {
            otherGame = kingdom;
            otherWorld = "The Lost Kingdom";
        }
    }
    return (
        <div className="transfer-component">
            <div className="transfer-input">
                <label>Current Location:</label>
                <div className="field">
                    <div className="location">
                        { currentWorld }
                    </div>
                    <img src={game} alt="game" />
                </div>
            </div>

            <div className="transfer-input">
                <label>Transfer To:</label>
                <div className="field">
                    <div className="location">
                        { otherWorld }
                    </div>
                    <img src={otherGame} alt="game" />
                </div>
            </div>
        </div>
    );
}

export default Transfer;
