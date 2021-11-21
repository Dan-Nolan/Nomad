import "./Inventory.scss";
import { useContext } from 'react';
import { StoreContext } from "utils/Store";

const IPFS_BASE = "https://ipfs.lukso.network/ipfs/";

function Inventory() {
    const { profile: [profile] } = useContext(StoreContext);

    if (profile.loggedIn) {
        const { name, profileImage: [profileImage] } = profile.LSP3Profile;
        const ipfsURL = IPFS_BASE + profileImage.url.slice(7);

        return (
            <div className="inventory">
                <div className="profile-header">
                    <img src={ipfsURL} alt="profile" />
                    <div className="info">
                        <div className="tag">
                            <div className="name">
                                @{name}
                            </div>
                            <div className="num">
                                #6498
                            </div>
                        </div>
                        <h1>
                            Inventory
                        </h1>
                    </div>
                </div>

                <div className="items">
                    <div className="item">
                        <div className="display-image">

                        </div>
                        <div className="info">
                            <div className="header">
                                Bow + Arrow
                            </div>
                            <div className="token-id">
                                ID: #4156
                            </div>
                        </div>
                    </div>

                    <div className="item">
                        <div className="display-image">

                        </div>
                        <div className="info">
                            <div className="header">
                                Health Potion
                            </div>
                            <div className="token-id">
                                ID: #4884
                            </div>
                        </div>
                    </div>

                    <div className="item">
                        <div className="display-image">

                        </div>
                        <div className="info">
                            <div className="header">
                                Extra Life Quarter
                            </div>
                            <div className="token-id">
                                ID: #4321
                            </div>
                        </div>
                    </div>

                    <div className="item">
                        <div className="display-image">

                        </div>
                        <div className="info">
                            <div className="header">
                                Air Jordan 4 Fire Red
                            </div>
                            <div className="token-id">
                                ID: #1379
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return null;
}

export default Inventory;