import React from 'react';
import { useDataLayerValue } from '../context/DataLayer';
import './../assets/styles/SidebarOption.css';

function SidebarOption({ title, Icon, onClick }) {
    const [{ album }, dispatch] = useDataLayerValue();

    function click() {
        if(onClick){
        dispatch({
            type: "SET_ALBUM",
            album: onClick
        });

        console.log(album);
    }
    }

    return (
        <div className="sidebarOption" onClick={click}>
            {Icon && <Icon className="sidebarOption__icon" />}
            {Icon ? <h4>{title}</h4> : <p>{title}</p>}
        </div>
    )
}

export default SidebarOption
