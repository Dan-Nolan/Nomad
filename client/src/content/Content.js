import { useContext } from 'react';
import { StoreContext } from "utils/Store";
import { Routes, Route } from "react-router-dom";
import Integrations from "./Integrations";
import Proposals from "./Proposals";
import Inventory from "./Inventory";
import LoginCard from './LoginCard';
import "./Content.scss";

function Content() {
    const { profile: [profile] } = useContext(StoreContext);

    if (profile.loggedIn) {
        return (
            <div className="content">
                <Routes>
                    <Route path="/" element={<Inventory />} />
                    <Route path="proposals" element={<Proposals />} />
                    <Route path="integrations" element={<Integrations />} />
                </Routes>
            </div>
        );
    }

    return (
        <div className="content">
            <LoginCard />
        </div>
    );
}

export default Content;
