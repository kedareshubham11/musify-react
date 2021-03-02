import { useEffect } from 'react';
import { getTokenFromUrl } from './apis/Spotify';
import './App.css';
import Login from "./components/Login";
import SpotifyWebApi from "spotify-web-api-js";
import Player from './components/Player';
import { useDataLayerValue } from "./context/DataLayer";

const _spotify = new SpotifyWebApi();

function App() {
  // access data layer
  const [{ token}, dispatch] = useDataLayerValue();

  useEffect(() => {

      const hash = getTokenFromUrl();
      window.location.hash ="";
      let _token = hash.access_token;
      _spotify.setAccessToken(_token);

      if (_token) {
          dispatch({
            type: 'SET_TOKEN',
            token: _token
          });
          
          _spotify.getMe().then(user => {
            
            dispatch({
              type: 'SET_USER',
              user: user,
            });
          });

          dispatch({
            type: "SET_SPOTIFY",
            spotify: _spotify,
            });

          // _spotify.getUserPlaylists(user?.id)
          
          _spotify.getMySavedAlbums().then((list) => {
            dispatch({
              type: "SET_PLAYLISTS",
              playlists: list,
            });
            // dispatch({
            //   type: "SET_ALBUM",
            //   album: playlists

            // });
            console.log('playlist 🔥🔥',list);
          });

          _spotify.getPlaylist('37i9dQZEVXcG0q8UIxmMTv').then(response => {
            dispatch({
              type: "SET_ALBUM",
              album: response 

            });
            console.log('album',response);
          });
          

          _spotify.getMyTopArtists().then((response) =>
          dispatch({
            type: "SET_TOP_ARTISTS",
            top_artists: response,
          })
        );

      }
     
      
  }, [dispatch]);


  return (
    <div className="App">
      
      {
        token ? 
          <Player spotify={_spotify} />
         : 
          <Login />    
      }
      
    </div>
  );
}

export default App;
