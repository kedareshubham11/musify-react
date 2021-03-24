import React, { useState } from 'react';
import { useDataLayerValue } from '../context/DataLayer';
import './../assets/styles/Body.css';
import Header from './Header';
import PlayCircleFilledWhiteIcon from '@material-ui/icons/PlayCircleFilledWhite';
import FavoriteIcon from '@material-ui/icons/Favorite';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import SongRow from './SongRow';

function Body({ spotify, audioRef }) {
    const [{ album, current_index }, dispatch] = useDataLayerValue();
    const [fav, setFav] = useState(null);
    // const [playlist, setPlaylist]= useState([]);

    /*const playPlaylist = (alb) => {
            if(alb){
            setPlaylist(alb?.tracks.items);
            console.log('lisst', playlist);
          }*/
            
              // dispatch({
              //   type: "SET_ITEM",
              //   item: r.item,
              // });
              // dispatch({
              //   type: "SET_PLAYING",
              //   playing: true,
              // });
         
      // }
    // useEffect(() => {
    //   let songs = [];
    //   album?.tracks.items.map(item => {
    //     songs.push(item);
    //     return null;
    //   });

    //   dispatch({
    //     type: "SET_PLAYLIST_SONGS",
    //     playlist_songs: songs,
    //   })
    //   dispatch({
    //     type: "SET_PLAYLIST_SONG_SIZE",
    //     playlist_song: songs.length
    //   })
    //   console.log('SONGS ARRAY', playlist_songs);
    // }, [album, playlist_songs, dispatch]);

      const playSong = (track, index) => {

        dispatch({
          type: "SET_ITEM",
          item: track,
        });

        dispatch({
          type: "SET_CURRENT_SONG",
          current_song:track.preview_url
        });

        dispatch({
          type: "SET_CURRENT_INDEX",
          current_index:index
        });

        dispatch({
          type: "SET_PLAYING",
          playing: true
        });
        audioRef.current.src = track.preview_url;
        audioRef.current.play();

        
            
      }

    const playShuffle = ()=> {
      dispatch({
        type: "SET_CURRENT_INDEX",
        current_index: 0
      });

      dispatch({
        type: "SET_ITEM",
        item: album.tracks.items[current_index].track,
      });

      dispatch({
        type: "SET_CURRENT_SONG",
        current_song: album.tracks.items[current_index].track.preview_url
      });


      dispatch({
        type: "SET_PLAYING",
        playing: true
      });
      audioRef.current.src = album.tracks.items[current_index].track.preview_url;
      audioRef.current.play();
    }
    

    return (
        <div className="body">
            <Header spotify={spotify}/>

            <div className="body__info">
                <img src={album?.images[0].url} alt="" />

                <div className="body__infoText">
                    <strong>PLAYLISTS</strong>
                    <h2>{album?.name}</h2>
                    <p>{album?.description}</p>
                </div>
            </div>

            <div className="body__songs">
              <div className="body__icons">
                <span onClick={playShuffle}>
                <PlayCircleFilledWhiteIcon 
                className="body__shuffle" 
                // onClick={playPlaylist(album)}
                />
                </span>
                <span onClick={()=> fav? setFav(null) : setFav('Fav')}>
                <FavoriteIcon className={`body__fav ${fav? "body__fav2" :'' } `}/>
                </span>
                <MoreHorizIcon />
                </div>

                {/* list of songs */}
                {album?.tracks.items.map((item, index) => (
                    <SongRow playSong={playSong} track={item.track} index={index}/>
                ))}
            </div>
        </div>
    )
}

export default Body;
