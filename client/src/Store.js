import React from 'react';

export const StoreContext = React.createContext(null);

const Store = ({ children }) => {
    const initialProfile = {
        loggedIn: false,
        metadata: null
    }

    const [profile, setProfile] = React.useState(initialProfile);

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