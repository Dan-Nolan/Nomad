import "./Inventory.scss";
import { useContext } from 'react';
import { StoreContext } from "utils/Store";

const IPFS_BASE = "https://ipfs.lukso.network/ipfs/";

function Inventory() {
    const { profile: [profile] } = useContext(StoreContext);
    
    if(profile.loggedIn) {
        const { name, profileImage: [profileImage] } = profile.LSP3Profile;
        const ipfsURL = IPFS_BASE + profileImage.url.slice(7);

        return (
            <div className="inventory">
                <div className="profile-header">
                    <img src={ipfsURL} alt="profile" />
                    <div className="info">
                        <div className="tag">
                            <div className="name">
                                @{ name }
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
    
            </div>
        );
    }

    return null;
}

export default Inventory;