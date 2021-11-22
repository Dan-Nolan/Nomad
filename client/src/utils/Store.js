import React from 'react';
import { getProfile, hasProfile } from "./accountUtil";

export const StoreContext = React.createContext(null);

const INITIAL_STATE = {
    loggedIn: false
}

const Store = ({ children }) => {
    const currentProfile = hasProfile() ? getProfile() : INITIAL_STATE;

    const [profile, setProfile] = React.useState(currentProfile);

    const storeValue = {
        profile: [profile, setProfile]
    }

    return (
        <StoreContext.Provider value={storeValue}>
            {children}
        </StoreContext.Provider>
    );
}

export default Store;