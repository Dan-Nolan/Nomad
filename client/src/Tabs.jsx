import "./Tabs.scss";
import { useContext } from 'react';
import { StoreContext } from "utils/Store";
import { NavLink } from "react-router-dom";

function Tabs() {
    const { profile: [profile] } = useContext(StoreContext);

    if (profile.loggedIn) {
        return (
            <div className="tabs">
                <div className="tab">
                    <NavLink to="/" activeClassName="active">
                        Inventory
                    </NavLink>
                </div>
                <div className="tab">
                    <NavLink to="/proposals" activeClassName="active">
                        Proposals
                    </NavLink>
                </div>
                <div className="tab">
                    <NavLink to="/integrations" activeClassName="active">
                        Integrations
                    </NavLink>
                </div>
            </div>
        )
    }

    return null;
}

export default Tabs;
