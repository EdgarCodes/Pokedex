import React, { Component } from 'react';
import { pad, capitalize, chooseType} from "../helper";
import {Link} from "react-router-dom";
import "./css/PokemonCard.css";

export default class PokemonCard extends Component {
    render() {
        const {name, id, types} = this.props;

        return (
            <Link className="Pokecard" to={`/pokedex/${id}`}>   
                <h1 className="Pokecard-id">{pad(id, 3)}</h1>
                <h1 className="Pokecard-name">{capitalize(name)}</h1>

                <div className= "Pokecard-img-container">
                    <img 
                    className= "Pokecard-img" 
                    src={`https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${pad(id, 3)}.png`} 
                    alt = {name}
                    />
                </div>

                <div className = "Pokecard-types">
                    {types.map(type => <img 
                    src={chooseType(type.name)} 
                    alt={type.name} 
                    key= {type.name}
                    />)}
                </div>
            </Link>
        )
    }
}
