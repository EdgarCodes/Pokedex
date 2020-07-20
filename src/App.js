import React, { Component } from 'react';
import { Switch, Route, Redirect } from "react-router-dom";
import './App.css';

import Pokedex from "./components/Pokedex";
import PokemonInfo from "./components/PokemonInfo";

export default class App extends Component {
  render() {
    return (
      <div className="App">
        <Switch>
          <Route exact path="/pokedex" render={(props) => <Pokedex {...props}/>}/>
          <Route exact path="/pokedex/:id" render={(props) => <PokemonInfo {...props}
            key ={`testid= /pokedex/:${props.match.params.id}`}  
          />}/>
          <Redirect to = "/pokedex"/>
        </Switch>
      </div>
    )
  }
}
