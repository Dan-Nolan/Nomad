import "./Inventory.scss";
import { useContext } from 'react';
import { StoreContext } from "utils/Store";
import bow from "images/nft-bow-kingdom.jpg";
import potion from "images/nft-potion-kingdom.jpg";
import quarter from "images/nft-quarter-pacman.jpg";
import shoes from "images/nft-shoes-townsquare.jpg";
import sneakers from "images/nft-sneakers-townsquare.jpg";
import sword from "images/nft-sword-kingdom.jpg";
import kingdom from "images/kingdom-square-logo.jpg";
import pacman from "images/pacman-square-logo.jpg";
import townsquare from "images/townsquare-square-logo.jpg";

const IPFS_BASE = "https://ipfs.lukso.network/ipfs/";

const items = [{
    game: kingdom,
    img: bow,
    name: "Bow + Arrow",
    id: 4156
}, {
    game: kingdom,
    img: sword,
    name: "Sword",
    id: 4237
}, {
    game: kingdom,
    img: potion,
    name: "Health Potion",
    id: 4684
}, {
    game: pacman,
    img: quarter,
    name: "Extra Life Quarter",
    id: 4321
}, {
    game: townsquare,
    img: sneakers,
    name: "Air Jordan 4 Fire Red",
    id: 1379
}, {
    game: townsquare,
    img: shoes,
    name: "MIX'AIR X RN",
    id: 9433
}];


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
                    {items.map(({ name, id, img, game }) => (
                        <div className="item">
                            <div className="display-image">
                                <img src={img} alt={name} />
                            </div>
                            <div className="info">
                                <div className="identifying">
                                    <div className="header">
                                        {name}
                                    </div>
                                    <div className="token-id">
                                        ID: #{id}
                                    </div>
                                </div>
                                <div className="game">
                                    <img src={game} alt={name + " game"} />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    return null;
}

export default Inventory;