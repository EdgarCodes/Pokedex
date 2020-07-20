import React, { Component } from 'react';
import axios from "axios";

import Species from "./Species";
import Stats from "./Stats";
import Moves from "./Moves";
import TypeMatchups from "./TypeMatchups";
import Loading from "./Loading";
import { pad , chooseColor, chooseType,getGenderRatio, toFeet, toMeters, evolutionLine,getMoves } from "../helper";


import "./css/PokemonInfo.css";
import { Link } from 'react-router-dom';

export default class PokemonInfo extends Component {
    constructor(props)
    {
        super(props);

        this.state=
        {
            loading:true,
            name:"",
            genera:"", 
            types: [{name:"", url:""}],
            speciesInfo: {
                eggGroups: [], 
                genderRatio: "", 
                hatchRate: "", 
                catchRate: "", 
                height: {feet:"", meters:""}, 
                weight: ""
            },
            stats: [],
            abilities:[],
            evoLine:[],
            moves:[]
        }

        this.id = this.props.match.params.id;
        this.url_pokemon = `https://pokeapi.co/api/v2/pokemon/${this.id}`;
        this.url_species = `https://pokeapi.co/api/v2/pokemon-species/${this.id}/`;
    }

    async componentDidMount()
    {
        let pokemon = await axios.get(this.url_pokemon);
        pokemon = pokemon.data;

        let species = await axios.get(this.url_species);
        species = species.data;

        
        //getting Evolution Line URL
        const evoURL = species.evolution_chain.url;
        let evolutions = await axios.get(evoURL);
        evolutions = evolutions.data.chain;


        //getting genera
        let genera = species.genera.filter(text => text.language.name === "en");
        genera = genera[0].genus;

        //getting types
        const types = pokemon.types.map(type => type.type);

        //Getting eggGroups
        const eggGroups = species.egg_groups.map(group => group.name);
        
        //getting gender ratio
        const genderRatio = getGenderRatio(species.gender_rate);

        //getting hatch rate
        const hatchRate = (species.hatch_counter + 1) * 255;

        //getting catch rate
        const catchRate = species.capture_rate;

        //getting height and weight
        const height = {meters: toMeters(pokemon.height), feet: toFeet(pokemon.height)};
        const weight = Math.round(10* (pokemon.weight/4.536))/10;

        //Getting stats
        const stats = pokemon.stats;

        //getting abilities
        const abilities = pokemon.abilities;

        //getting evolutions
        const evoLine = evolutionLine(evolutions);
        evoLine.forEach(evo => {
            evo.id = evo.evolution.url.split("/")[6]
        });

        //Getting Moves and getting info for each
        let moveList =  getMoves(pokemon.moves);

        
        this.setState({
            loading:false,
            name:pokemon.name, 
            genera: genera, types: types,
            speciesInfo: {eggGroups: eggGroups, 
                genderRatio, 
                hatchRate: hatchRate,
                catchRate:catchRate,
                height: height,
                weight:weight
            },
            stats:stats,
            abilities: abilities,
            evoLine:evoLine,
            moves:moveList
        })
    }

    goNext = () =>{
        //TODO make sure user cant go past max or min
        console.log(+this.id + 1);
        if(+this.id + 1 === 808)
        {
            this.props.history.push(`/pokedex/1`);
        }
        else
        {
            this.props.history.push(`/pokedex/${parseInt(this.id)+1}`);
        }
    }

    goPrevious = () =>{
        this.props.history.push(`/pokedex/${parseInt(this.id)-1}`);
    }

    goTo = (num) =>
    {
        this.props.history.push(`/pokedex/${num}`);
    }

    render() {
        this.state.moves.sort((a,b) => a.levelLearn-b.levelLearn);
        return (
            this.state.loading? <Loading/>: <div className="PokemonInfo">
                <div className= "PokemonInfo-title">
                    <h1 
                    onClick= {this.goPrevious} 
                    className = "arrow"
                    >
                    <i className="fas fa-arrow-left"></i>
                    </h1>

                    <h1 className = "PokemonInfo-name">{this.state.name}</h1>
                    <h1 className = "PokemonInfo-id">{`#${this.id}`}</h1>

                    <h1 
                    onClick= {this.goNext} 
                    className = "arrow"
                    >
                    <i className="fas fa-arrow-right"></i>
                    </h1>
                </div>

                <Link
                    className= "exit" 
                    to="/pokedex"><i className="fas fa-times"></i>
                </Link>
                
                <h2 className = "PokemonInfo-genus"
                style={{backgroundColor: chooseColor(this.state.types[0].name)}}
                >{`The ${this.state.genera}`}</h2>

                <div className = "PokemonInfo-img-container">
                    <img src= {`https://assets.pokemon.com/assets/cms2/img/pokedex/full/${pad(this.id, 3)}.png`}
                    alt = {this.state.name}
                    className = "PokemonInfo-img"
                    />
                </div>

                <div className = "PokemonInfo-types">
                    {this.state.types.map(type => <img 
                    src={chooseType(type.name)} 
                    alt={type.name} 
                    key= {type.name}
                    />)}
                </div>
                
                <div className= "PokemonInfo-Row-1">

                    <Species 
                        color = {this.state.types[0].name}
                        speciesInfo = {this.state.speciesInfo}
                    />

                    <Stats stats = {this.state.stats} 
                        color= {this.state.types[0].name}
                    />
                </div>


                <div className= "PokemonInfo-abilities">
                    {/* TODO: Make this a component where if the item is hovered it shows description of ability */}
                    <h1>Abilities</h1>
                    <div className = "ability-container">
                        {this.state.abilities.map (ability => 
                            <div className= "ability"
                            key = {ability.ability.name}
                            style={ability.is_hidden? {}:{backgroundColor: chooseColor(this.state.types[0].name)}}
                            >{ability.ability.name}</div>
                        )}
                    </div>
                </div>

                <div className = "Pokemon-Info-evolutions">
                    <h1>Evolution Line</h1>
                    <div className="evolutions">
                        {this.state.evoLine.map(evo =>
                            <div key = {evo.id} onClick = {this.goTo.bind(this ,evo.id)} className= "evolution">
                                <div>
                                    <img src={`https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${pad(evo.id, 3)}.png`}
                                        alt= {evo.name}
                                    />
                                    <p>{evo.evolution.name}</p>
                                </div>
                                {evo.hasNext && <i className="fas fa-arrow-right fa-2x evolution-arrow"></i>}
                            </div>
                        )}
                    </div>
                </div>

                <Moves moves = {this.state.moves} color= {this.state.types[0].name}/>
                
                <TypeMatchups types = {this.state.types}/>

            </div>           
        )
    }
}
