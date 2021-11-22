import Login from '../Login';
import { useContext } from 'react';
import { StoreContext } from "utils/Store";
import "./ProfileSection.scss";

const IPFS_BASE = "https://ipfs.lukso.network/ipfs/";

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
        <div className="profile login">
            <Login />
        </div>
    );
}

export default ProfileSection;
