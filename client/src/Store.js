import React from 'react';

export const StoreContext = React.createContext(null);

export default ({ children }) => {
    const initialProfile = {
        loggedIn: false,
        metadata: null
    }

    const [profile, setProfile] = React.useState(initialProfile);

    const store = {
        profile: [profile, setProfile]
    }

    return (
        <StoreContext.Provider value={store}>
            {children}
        </StoreContext.Provider>
    );
}