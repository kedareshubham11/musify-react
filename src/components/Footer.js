import React, { useEffect, useState } from 'react';
import './../assets/styles/Footer.css';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import PauseCircleOutlineIcon from '@material-ui/icons/PauseCircleOutline';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import ShuffleIcon from '@material-ui/icons/Shuffle';
import RepeatIcon from '@material-ui/icons/Repeat';
import { Grid, Slider } from '@material-ui/core';
import PlaylistPlayIcon from '@material-ui/icons/PlaylistPlay';
import VolumeDownIcon from '@material-ui/icons/VolumeDown';
import { useDataLayerValue } from '../context/DataLayer';

function Footer({ spotify, audioRef }) {
    const [{ item, playing, album, current_index }, dispatch] = useDataLayerValue();
    const [sliderValue, setSliderValue] = useState(50);

    const [shuffle, setShuffle] = useState(false);
    const [repeat, setRepeat] = useState(false);

    useEffect(() => {
        spotify.getMyCurrentPlaybackState().then((r) => {
            console.log('🚀r',r);

            dispatch({
                type: "SET_PLAYING",
                playing: r.is_playing,
            });

            dispatch({
                type: "SET_ITEM",
                item: r.item,
            });
        });
    }, [spotify, dispatch]);

    const handlePlayPause = () => {
        if (playing) {
          //
          audioRef.current.pause();
          // spotify.pause();
          dispatch({
            type: "SET_PLAYING",
            playing: false,
          });
        } else {
          //
          audioRef.current.play();
          // spotify.play();
          dispatch({
            type: "SET_PLAYING",
            playing: true,
          });
        }
        
      };
    
    const skipNext = () => {

        if(current_index === album.tracks.items.length -1){

          dispatch({
            type: "SET_CURRENT_INDEX",
            current_index: 0
          });
        }
        else
        {
          dispatch({
            type: "SET_CURRENT_INDEX",
            current_index: current_index + 1
          });

        }

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
      
       
      
    
    const skipPrevious = () => {
      if(current_index > 0)
      {
        dispatch({
          type: "SET_CURRENT_INDEX",
          current_index: current_index -1
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
      };

    const handleVolume = (event, newValue) => {
      audioRef.current.volume = newValue/100;
      setSliderValue(newValue);
    }

    return (
        <div className="footer">
            <div className="footer__left">
                <img 
                className="footer__albumLogo"
                src={item?.album.images[0].url} alt={item?.name} 
                />
                {item? (
                <div className="footer__songInfo">
                    <h4>{item.name}</h4>
                    <p>{item.artists.map((artist) => artist.name).join(", ")}</p>
                </div>
                ) : (
                    <div>
                        <h4>No song is playing</h4>
                        <p>....</p>
                    </div>
                )}
            </div>

            <div className="footer__center">
                <span onClick={()=> shuffle? setShuffle(false) : setShuffle(true)}>
                <ShuffleIcon className={`footer__icon ${shuffle? 'footer__green' : ''}`}/>
                </span>
                
                <SkipPreviousIcon onClick={skipPrevious} className="footer__icon" />
                {playing ? (
                    <PauseCircleOutlineIcon
                        onClick={handlePlayPause}
                        fontSize="large"
                        className="footer__icon"
                    />
                ) : (
                    <PlayCircleOutlineIcon
                        onClick={handlePlayPause}
                        fontSize="large"
                        className="footer__icon"
                    />
                )}
                
                <SkipNextIcon onClick={skipNext} className="footer__icon" />
                <span onClick={() => repeat? setRepeat(false) : setRepeat(true)}>
                <RepeatIcon className={`footer__icon ${repeat? 'footer__green' : ''}`} />
                </span>
                
            </div>

            <div className="footer__right">
                <Grid container spacing={2}>
                    <Grid item>
                        <PlaylistPlayIcon />
                    </Grid>
                    <Grid item>
                        <VolumeDownIcon />
                    </Grid>
                    <Grid item xs>
                        <Slider value={sliderValue} onChange={handleVolume} aria-labelledby="continuous-slider"/>
                    </Grid>
                </Grid>
            </div>
        </div>
    )
}

export default Footer;
