import "./Inventory.scss";
import { useContext, useState, useEffect } from 'react';
import { StoreContext } from "utils/Store";
import bow from "images/nft-bow-kingdom.jpg";
import potion from "images/nft-potion-kingdom.jpg";
import quarter from "images/nft-quarter-pacman.jpg";
import shoes from "images/nft-shoes-townsquare.jpg";
import sneakers from "images/nft-sneakers-townsquare.jpg";
import swordKingdom from "images/nft-sword-kingdom.jpg";
import swordTown from "images/nft-sword-townsquare.jpg";
import kingdom from "images/kingdom-square-logo.jpg";
import pacman from "images/pacman-square-logo.jpg";
import townsquare from "images/townsquare-square-logo.jpg";
import getSwordWorldId from './getSwordWorldId';

const IPFS_BASE = "https://ipfs.lukso.network/ipfs/";

const INITIAL_ITEMS = [{
    game: kingdom,
    currentWorld: "The Lost Kingdom",
    img: bow,
    name: "Bow + Arrow",
    id: 4156
}, {
    game: kingdom,
    currentWorld: "The Lost Kingdom",
    img: potion,
    name: "Health Potion",
    id: 4684
}, {
    game: pacman,
    currentWorld: "Pac-Man World",
    img: quarter,
    name: "Extra Life Quarter",
    id: 4321
}, {
    game: townsquare,
    currentWorld: "Town Square",
    img: sneakers,
    name: "Air Jordan 4 Fire Red",
    id: 1379
}, {
    game: townsquare,
    currentWorld: "Town Square",
    img: shoes,
    name: "MIX'AIR X RN",
    id: 9433
}];

function Inventory() {
    const { profile: [profile] } = useContext(StoreContext);
    const { dialog: [dialog, setDialog] } = useContext(StoreContext);

    const [items, updateItems] = useState(INITIAL_ITEMS);

    useEffect(() => {
        (async () => {
            const worldId = await getSwordWorldId();
            if (worldId === 0) {
                updateItems([{
                    game: kingdom,
                    img: swordKingdom,
                    currentWorld: "The Lost Kingdom",
                    name: "Sword",
                    id: 4237,
                    worldId,
                }, ...items])
            }
            else if (worldId === 1) {
                updateItems([{
                    game: townsquare,
                    img: swordTown,
                    currentWorld: "Town Square",
                    name: "Sword",
                    id: 4237,
                    worldId
                }, ...items])
            }
        })();
        // run effect once
        // eslint-disable-next-line
    }, []);

    if (profile.loggedIn) {
        const { address, LSP3Profile } = profile;
        const { name, profileImage: [profileImage] } = LSP3Profile;
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
                                #{address.slice(2, 6)}
                            </div>
                        </div>
                        <h1>
                            Inventory
                        </h1>
                    </div>
                </div>

                <div className="items">
                    {items.map(({ name, id, img, game, currentWorld, worldId }) => (
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
                            <div className="transfer-nft" onClick={() => setDialog({ display: true, name, id, img, game, currentWorld, worldId })}>
                                Transfer NFT
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