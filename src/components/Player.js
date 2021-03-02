import React, { useEffect, useRef } from 'react';
import { useDataLayerValue } from '../context/DataLayer';
import "./../assets/styles/Player.css";
import Body from './Body';
import Footer from './Footer';
import Sidebar from './Sidebar';

function Player({ spotify }) {
    const audioRef = useRef(null);
    const [{ current_song }, dispatch] = useDataLayerValue();

    useEffect(() => {
        audioRef.current.pause();
    }, [current_song]);

    
    return (
        <div className="player">
            <div className="player__body">
                {/* sidebar */}
                <Sidebar />
                {/* Body */}
                <Body spotify={spotify} audioRef={audioRef}/>
            </div>
            
            {/* footer */}
            <audio ref={audioRef} src={current_song} ></audio>
            {/* onTimeUpdate={handleTimeUpdate} onLoadedMetadata={handleTimeUpdate} onEnded={skipSong} */}
            <Footer spotify={spotify} audioRef={audioRef}/>
        </div>
    )
}

export default Player;
