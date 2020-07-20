import React, { Component } from 'react';
import { chooseType } from "../helper";

export default class MoveLine extends Component {

    render() {
        const move = this.props.move;
        //{`Lvl:${move.levelLearn}-${move.name} | ${move.moveLearnMethod}`}
        return (
            <div className="Moves-row">
                <div className = "Moves-stats">
                <p className= "Move-attrib">{move.levelLearn}</p>
                <p className= "Move-name">{move.name}</p>
                <img src= {chooseType(move.type)} className= "Move-type" alt= {move.type}/>
                {/* <p className= "Move-attrib">{move.type}</p> */}
                <p className= "Move-attrib">{move.category}</p>
                <p className= "Move-attrib">{move.attack !== null? move.attack: "--"}</p>
                <p className= "Move-attrib">{move.accuracy !== null? move.accuracy: "--"}</p>
                <p className= "Move-attrib">{move.pp}</p>
                </div>

                {/* <div className = "Moves-Effect">
                    <p>{move.effect}</p>
                </div> */}
            </div>
        )
    }
}
