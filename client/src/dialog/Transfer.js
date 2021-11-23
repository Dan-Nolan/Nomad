import "./Transfer.scss";
import { StoreContext } from "utils/Store";
import { useState, useContext } from 'react';
import kingdom from "images/kingdom-image.jpg";
import townsquare from "images/townsquare-image.jpg";

function Transfer() {
    const { dialog: [dialog, setDialog] } = useContext(StoreContext);
    const { game, img, name, id, currentWorld, worldId, display } = dialog;

    const canTransfer = (worldId !== undefined);
    
    const [transferTo, setTransferTo] = useState(currentWorld);

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
                            <TransferComponent 
                                dialog={dialog} 
                                transferTo={transferTo} 
                                setTransferTo={setTransferTo} />
                            <div className="initiate-transfer" disabled={!canTransfer}>
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

function TransferComponent({ dialog, transferTo, setTransferTo }) {
    const { game, currentWorld, worldId } = dialog;
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
                        { currentWorld }
                    </div>
                    <img src={game} alt="game" />
                </div>
            </div>
        </div>
    );
}

export default Transfer;
