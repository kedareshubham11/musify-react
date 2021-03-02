import React from 'react';
import { loginUrl } from '../apis/Spotify';
import './../assets/styles/Login.css';


export default function Login() {
  

    return (
        <div className="login">
            <div className="login__container">

                <img 
                src="https://cdn.telanganatoday.com/wp-content/uploads/2020/06/Spotify-now-works-with-Amaz.jpg"
                alt="logo"/>

                <a href={loginUrl}>LOGIN WITH SPOTIFY</a>
            </div>
        </div>
    )
}
