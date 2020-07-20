import React, { Component } from 'react';
import axios from "axios";

import "./css/Pokedex.css";

import PokemonCard from "./PokemonCard";
import Loading from "./Loading";
import { Link } from 'react-router-dom';

let NUM_POKEMON = 78;
let EXTRA_POKEMON= 60;

export default class Pokedex extends Component {
    constructor(props)
    {
        super(props);
        
        this.state= 
        {
            pokemon: [],
            loading: true,
            isLoadingMore: false
        }

        this.observer = React.createRef();
    }

    callBack = (element) =>
    {
        if(this.observer.current) this.observer.current.disconnect();

        this.observer.current = new IntersectionObserver(entries =>{
            if(entries[0].isIntersecting)
            {
                if(this.LoadPokemon() === false)
                {
                    console.log("cant load anymore!")
                }
            }
        });

        if(element) this.observer.current.observe(element)
    }

    async componentDidMount()
    {
        //Here we get the list of all the pokemon from 0 to NUM_POKEMON, the name is included here
        const pokemonList= await axios.get(`https://pokeapi.co/api/v2/pokemon/?offset=0&limit=${NUM_POKEMON}`);

        //In this we look at each individual pokemon and request more information on them so we can get id
        const pData = pokemonList.data.results.map(async pk =>{
            let pkInfo = await axios.get(pk.url);
            const types = pkInfo.data.types.map(type => type.type)
            return {name: pk.name, id:pkInfo.data.id, types: types}
        });

        //we wait for all the data to arrive for each pokemon in the pData array
        const pokemonData = await Promise.all(pData);

        //Updating the state with new the new pokemon array
        this.setState({pokemon: pokemonData, loading: false})
    }

    async LoadPokemon()
    {
        this.setState({isLoadingMore: true});
        console.log(NUM_POKEMON);
        if(NUM_POKEMON >= 780){
            return false
        }
        //Here we get the list of all the pokemon from 0 to NUM_POKEMON, the name is included here
        const pokemonList= await axios.get(`https://pokeapi.co/api/v2/pokemon/?offset=${NUM_POKEMON}&limit=${EXTRA_POKEMON}`);

        //In this we look at each individual pokemon and request more information on them so we can get id
        const pData = pokemonList.data.results.map(async pk =>{
            let pkInfo = await axios.get(pk.url);
            const types = pkInfo.data.types.map(type => type.type)
            return {name: pk.name, id:pkInfo.data.id, types: types}
        });

        //we wait for all the data to arrive for each pokemon in the pData array
        const pokemonData = await Promise.all(pData);

        NUM_POKEMON = NUM_POKEMON + EXTRA_POKEMON;

        console.log([...this.state.pokemon, ...pokemonData]);

        this.setState(st =>
        {
            return {pokemon: [...st.pokemon, ...pokemonData], isLoadingMore: false}
        })
    }

    render() {
        // const pokemonList = this.state.pokemon.map(pk =>{
        //     return <PokemonCard 
        //     name= {pk.name}
        //     id= {pk.id} 
        //     key={pk.id}
        //     types={pk.types}
        //     goToPokemon={this.goToPokemon}
        //     />
        // }); 

        const pokemonList = this.state.pokemon.map((pk,index) =>{
            if(this.state.pokemon.length-10 === index + 1)
            {
                return(
                <div ref={this.callBack} style= {{display: "inline-block"}} key={pk.id}>
                    <PokemonCard 
                        name= {pk.name}
                        id= {pk.id} 
                        key={pk.id}
                        types={pk.types}
                        goToPokemon={this.goToPokemon}
                    />
                </div>
                )
            }
            else
            {
                return(             
                <div style= {{display: "inline-block"}} key={pk.id}>
                    <PokemonCard 
                        name= {pk.name}
                        id= {pk.id} 
                        key={pk.id}
                        types={pk.types}
                        goToPokemon={this.goToPokemon}
                    />
                </div>
                )
            }
        });

        return (
            <div >
                <div className = "header">
                    <h1>Pokedex</h1>
                    <Link
                    to={`/pokedex/${Math.floor(Math.random()* 721)}`} 
                    className="Pokedex-random"
                    >Random</Link>
                </div>
                <div className="Pokedex">
                    {this.state.loading ? <Loading/>: pokemonList}
                    {this.state.isLoadingMore && <Loading/>}
                </div>
            </div>
        )
    }
}
