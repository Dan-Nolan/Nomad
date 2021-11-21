import Login from './Login';
import "./Navbar.scss";
import { useContext } from 'react';
import { StoreContext } from "./Store";

const IPFS_BASE = "https://ipfs.lukso.network/ipfs/";

function Navbar() {
    return (
        <div className="navbar">
            <div className="left">
                Welcome to Nomad
            </div>
            <div className="universe">
                Alpha Universe
            </div>
            <ProfileSection />
        </div>
    );
}

function ProfileSection() {
    const { profile: [profile] } = useContext(StoreContext);

    if(profile.loggedIn) {
        const { profileImage: [profileImage] } = profile.LSP3Profile;
        const ipfsURL = IPFS_BASE + profileImage.url.slice(7);

        return (
            <div className="profile">
                <img src={ipfsURL} alt="profile" />
            </div>
        )
    }
    
    return (
        <Login />
    );
}

export default Navbar;
