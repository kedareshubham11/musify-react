import React, { useState } from 'react';
import { useDataLayerValue } from '../context/DataLayer';
import './../assets/styles/Body.css';
import Header from './Header';
import PlayCircleFilledWhiteIcon from '@material-ui/icons/PlayCircleFilledWhite';
import FavoriteIcon from '@material-ui/icons/Favorite';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import SongRow from './SongRow';

function Body({ spotify, audioRef }) {
    const [{ album }, dispatch] = useDataLayerValue();
    const [playlist, setPlaylist]= useState([]);

    const playPlaylist = (alb) => {
            if(alb){
            setPlaylist(alb?.tracks.items);
            console.log('lisst', playlist);
          }
            
              // dispatch({
              //   type: "SET_ITEM",
              //   item: r.item,
              // });
              // dispatch({
              //   type: "SET_PLAYING",
              //   playing: true,
              // });
         
      }
    
      const playSong = (track) => {

        dispatch({
          type: "SET_ITEM",
          item: track,
        });

        dispatch({
          type: "SET_CURRENT_SONG",
          current_song:track.preview_url
        });

        audioRef.current.play();
        audioRef.current.play();

        dispatch({
          type: "SET_PLAYING",
          playing: true
        });
            
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
                <PlayCircleFilledWhiteIcon 
                className="body__shuffle" 
                // onClick={playPlaylist(album)}
                />

                <FavoriteIcon fontSize="large" className="body__fav"/>
                <MoreHorizIcon />
                </div>

                {/* list of songs */}
                {album?.tracks.items.map(item => (
                    <SongRow playSong={playSong} track={item.track} />
                ))}
            </div>
        </div>
    )
}

export default Body;
