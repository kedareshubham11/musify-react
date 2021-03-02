import React from 'react';
import './../assets/styles/Sidebar.css';
import HomeIcon from '@material-ui/icons/Home';
import SearchIcon from '@material-ui/icons/Search';
import LibraryMusicIcon from '@material-ui/icons/LibraryMusic';
import SidebarOption from './SidebarOption';
import { useDataLayerValue } from '../context/DataLayer';

function Sidebar() {
    const [{ playlists, dispatch}] = useDataLayerValue();
    return (
        <div className="sidebar">
            <img 
            className="sidebar__logo"
            src="images/Musify.png"
            alt="" />

            <SidebarOption title="Home" Icon={HomeIcon}/>
            <SidebarOption title="Search" Icon={SearchIcon}/>
            <SidebarOption title="Your Library" Icon={LibraryMusicIcon}/>

            <br />
            <strong className="sidebar__title">PLAYLIST</strong>
            <hr />

            {playlists?.items?.map(playlist => (
              <SidebarOption title={playlist.name}/>  
            ))}
        </div>
    )
}

export default Sidebar
