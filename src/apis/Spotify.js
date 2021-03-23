
export const authEndpoint = "https://accounts.spotify.com/authorize";

const redirectUri = "https://shubham-kedare-musify-react.netlify.app/";
// const redirectUri = "http://localhost:3000/";

const client_id = "1b79a67cb030485192a2497e1137c5c1"; //original
// const client_id = "1dffab23499740809dc996557ae5987a";

const scopes = [
    "user-read-currently-playing",
    "user-read-recently-played",
    "user-read-playback-state",
    "user-top-read",
    "user-modify-playback-state",
];

export const getTokenFromUrl = () => {
    return window.location.hash
    .substring(1)
    .split('&')
    .reduce((initial, item) => {
        // accessToken = key&name
        let parts = item.split('=');
        initial[parts[0]] = decodeURIComponent(parts[1]);

        return initial;
    }, {});
};

export const loginUrl = `${authEndpoint}?client_id=${client_id}&redirect_uri=${redirectUri}&scope=${scopes.join("%20")}&response_type=token&show_dialog=true`;