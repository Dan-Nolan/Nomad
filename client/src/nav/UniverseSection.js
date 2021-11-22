import { useContext } from 'react';
import { StoreContext } from "utils/Store";
import "./UniverseSection.scss";

function UniverseSection() {
    const { profile: [profile] } = useContext(StoreContext);

    if(profile.loggedIn) {
        return (
            <div className="universe">
                Alpha Universe
            </div>
        );
    }

    return null;
}

export default UniverseSection;
