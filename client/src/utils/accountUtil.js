import jsCookie from 'js-cookie';

const PROFILE_KEY = process.env.REACT_APP_USER_TOKEN || 'x-nomad-profile';
const COOKIE_DOMAIN = process.env.REACT_APP_COOKIE_DOMAIN || 'localhost';

export const logout = () => {
    removeProfile();
}

export const getProfile = () => {
    const profile = jsCookie.get(PROFILE_KEY);
    let result;
    try {
        result = JSON.parse(profile);
    }
    catch(ex) {
        console.log(ex);
    }
    return result;
}

export const removeProfile = () => {
    jsCookie.remove(PROFILE_KEY, { path: '/', domain: COOKIE_DOMAIN });
}

export const setProfile = (profile) => {
    jsCookie.set(PROFILE_KEY, JSON.stringify(profile), { expires: 365, path: '/', domain: COOKIE_DOMAIN });
}

export const hasProfile = () => {
    return !!getProfile();
}