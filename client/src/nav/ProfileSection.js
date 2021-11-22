import Login from './UPLogin';
import { useContext } from 'react';
import { StoreContext } from "utils/Store";
import * as accountUtil from 'utils/accountUtil';
import "./ProfileSection.scss";

const IPFS_BASE = "https://ipfs.lukso.network/ipfs/";

function ProfileSection() {
    const { profile: [profile, setProfile] } = useContext(StoreContext);

    function logout() {
        accountUtil.logout();
        setProfile({ loggedIn: false });
    }

    if(profile.loggedIn) {
        const { profileImage: [profileImage] } = profile.LSP3Profile;
        const ipfsURL = IPFS_BASE + profileImage.url.slice(7);

        return (
            <div className="profile">
                <img src={ipfsURL} alt="profile" />
                <div className="tokens">
                    0 $NMDA
                </div>
                <div className="logout" onClick={logout}>
                    Log Out
                </div>
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
