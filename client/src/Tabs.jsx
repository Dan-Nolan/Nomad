import "./Tabs.scss";
import { useContext } from 'react';
import { StoreContext } from "./Store";
import { Link } from "react-router-dom";

function Tabs() {
    const { profile: [profile] } = useContext(StoreContext);

    if (profile.loggedIn) {
        return (
            <div className="tabs">
                <div className="tab">
                    <Link to="/">
                        Inventory
                    </Link>
                </div>
                <div className="tab">
                    <Link to="/proposals">
                        Proposals
                    </Link>
                </div>
                <div className="tab">
                    <Link to="/integrations">
                        Integrations
                    </Link>
                </div>
            </div>
        )
    }

    return null;
}

export default Tabs;
