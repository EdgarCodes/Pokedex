import React, { Component } from 'react';
import pokeballLogo from "../images/pokeball.png";
import "./css/Loading.css";

export default class Loading extends Component {
    render() {
        return (
            <div className="lds-ring">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <img 
                src= {pokeballLogo}
                className= "pokeball"
                alt="Loading"
                ></img>
                <p>Loading...</p>
            </div>
        )
    }
}
