import "./Tabs.scss";
import { useContext } from 'react';
import { StoreContext } from "./Store";

function Tabs() {
    const { profile: [profile] } = useContext(StoreContext);

    if(profile.loggedIn) {
        return (
            <div className="tabs">
                <div className="tab">
                    Inventory
                </div>
                <div className="tab">
                    Proposals
                </div>
                <div className="tab">
                    Integrations
                </div>
            </div>
        )
    }

    return null;
}

export default Tabs;
