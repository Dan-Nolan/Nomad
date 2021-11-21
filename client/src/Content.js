import Login from './Login';
import { useContext } from 'react';
import { StoreContext } from "./Store";
import { Routes, Route } from "react-router-dom";
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
            <Login />
        </div>
    );
}

function Inventory() {
    return (
        <div>Inventory</div>
    );
}

function Proposals() {
    return (
        <div>Proposals</div>
    );
}

function Integrations() {
    return (
        <div>Integrations</div>
    );
}

export default Content;
