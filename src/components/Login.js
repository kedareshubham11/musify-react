import React from 'react';
import { loginUrl } from '../apis/Spotify';
import './../assets/styles/Login.css';


export default function Login() {
  

    return (
        <div className="login">
            <div className="login__container">

                <img 
                src="images/Musify.png"
                alt="logo"/>

                <a href={loginUrl}>LOGIN WITH SPOTIFY</a>
            </div>
        </div>
    )
}
