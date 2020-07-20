import React, { Component } from 'react';
import MoveLine from "./MoveLine";
import axios from "axios";
import Loading from "./Loading";

import { chooseColor } from "../helper";

export default class Moves extends Component {
    constructor(props)
    {
        super(props);

        this.state= 
        {
            moves: [],
            currentMoves: [],
            loading: true
        }
    }

    changeLearn = (evt) =>{
        this.setState({currentMoves: this.state.moves.filter(move => move.moveLearnMethod === evt.target.getAttribute('name'))})
    }

    async componentDidMount()
    {   
        let moves = this.props.moves.map(async move =>{
            let moveData = await axios.get(move.url);
            moveData= moveData.data
            
            let test = {
                type: moveData.type.name,
                category: moveData.damage_class.name,
                attack: moveData.power,
                pp: moveData.pp,
                accuracy: moveData.accuracy,
                effect: moveData.effect_entries[0].effect
            }
            return {...move, ...test};
        });

        moves = await Promise.all(moves);

        this.setState({moves: moves,
        currentMoves: moves.filter(move => move.moveLearnMethod === "level-up"),
        loading:false
        })
    }

    render() {
        return (
        <div className="Moves">
            <h1>Moves</h1>
            <div className = "Moves-learn">
                <div style={{background: chooseColor(this.props.color)}}
                name="level-up"
                onClick = {this.changeLearn}
                >Level-Up</div>
                <div style={{background: chooseColor(this.props.color)}}
                name = "tutor"
                onClick = {this.changeLearn}
                >Tutor</div>
                <div style={{background: chooseColor(this.props.color)}}
                name="egg"
                onClick = {this.changeLearn}
                >Egg</div>
                <div style={{background: chooseColor(this.props.color)}}
                name="machine"
                onClick = {this.changeLearn}
                >HM/TM</div>
            </div>
            <div className = "Moves-bar" style= {{background: chooseColor(this.props.color)}}>
                <p className= "Move-attrib">Level</p>
                <p className= "Move-name">Attack Name</p>
                <p className= "Move-type">Type</p>
                <p className= "Move-attrib">Cat.</p>
                <p className= "Move-attrib">Attack</p>
                <p className= "Move-attrib">Acc.</p>
                <p className= "Move-attrib">PP</p>
            </div>
            <div className={this.state.loading? "Moves-Loading":"Pokemon-Info-Moves"}>
                {this.state.loading? <Loading/>
                :this.state.currentMoves.map(move =><MoveLine move = {move} key = {move.name}/>)}
            </div>

            <div className="Moves-padding" style= {{background: chooseColor(this.props.color)}}/>
        </div>    
        )
    }
}
