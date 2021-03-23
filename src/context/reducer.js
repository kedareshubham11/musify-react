export const initialState = {
    user: null,
    playlists: [],
    spotify: null,
    album: null,
    top_artists: null,
    playing: false,
    item: null,
    playlist_songs: [],
    current_song:'https://p.scdn.co/mp3-preview/5cd4cbec6d344b76efe855c5ad483456f507ca6a?cid=1b79a67cb030485192a2497e1137c5c1',
    current_index: 0,
    // remove after finish developing
    
    // token: 'BQDbjA_xcFQ3mLK9ujtENz9VIdIeFCJ_EJmZQt9P1yISfBqYm5QQBO3IFR4gs4aDfzT0amyG1BamWiAGzNBFQl6LxvmbQbEgjY7tre_TKm0AXnbbdRanU9xYBCGPoLZvoVh0WZ4cbGe3QO2bEDfp5kLFycTZxOeGu48CKyzwq8SsvDX-TiIiU1B6',
}

const reducer = (state, action) => {
console.log(action);
switch(action.type) {
    case "SET_USER":
        return {
            ...state,
            user: action.user
        }

    case "SET_PLAYING":
        return {
          ...state,
          playing: action.playing,
        };
      
    case "SET_ITEM":
        return {
            ...state,
            item: action.item,
        };

    case "SET_TOKEN":
        return {
            ...state,
            token: action.token
        }
    
    case "SET_SPOTIFY":
        return {
            ...state,
            spotify: action.spotify,
      };
    
    case "SET_TOP_ARTISTS":
        return {
            ...state,
            top_artists: action.top_artists,
        };

    case "SET_PLAYLISTS":
        return {
            ...state,
            playlists: [...state.playlists, action.playlists]
        }
    
    case "SET_PLAYLIST_SONGS":
        return {
            ...state,
            playlist_songs: action.playlist_song,
        }
    case "SET_PLAYLIST_SONGS_SIZE":
        return {
            ...state,
            playlist_songs_size: action.playlist_songs_size,
        }

    case "SET_ALBUM":
        return {
            ...state,
            album: action.album
        }

    case "SET_CURRENT_SONG":
        return {
            ...state,
            current_song: action.current_song
        }
    
    case "SET_CURRENT_INDEX":
        return {
            ...state,
            current_index: action.current_index
        }
        
    default: 
        return state;
}
}

export default reducer;