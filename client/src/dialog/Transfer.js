import "./Transfer.scss";
import { StoreContext } from "utils/Store";
import { useState, useContext } from 'react';
import kingdom from "images/kingdom-image.jpg";
import townsquare from "images/townsquare-image.jpg";

function Transfer() {
    const { dialog: [dialog, setDialog] } = useContext(StoreContext);

    // game: kingdom,
    // img: swordKingdom,
    // name: "Sword",
    // id: 4237,
    // worldId,

    if(dialog.display) {
        const { game, img, name, id, worldId } = dialog;
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
                            <div className="initiate-transfer">
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

export default Transfer;
