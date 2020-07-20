import React, { Component } from 'react';
import { chooseColor, capitalize} from "../helper";

export default class Species extends Component {
    render() {
        return (
            <div className = "PokemonInfo-species"
                style={{backgroundColor: chooseColor(this.props.color)}}
                >
                    <h1>Species Info</h1>
                    <div className = "PokemonInfo-species-item"><b>Egg Groups:</b> 
                        <div className="egg-groups">
                            {this.props.speciesInfo.eggGroups.map(egg => ` ${capitalize(egg)} `)}
                        </div>
                    </div>

                    <div className = "PokemonInfo-species-item gender">
                        <b>Gender Ratio:</b> 

                        <div className="PokemonInfo-gender">
                            <p> {`${this.props.speciesInfo.genderRatio[0]}%`}<i className="fas fa-mars"></i></p>
                            <p> {`${this.props.speciesInfo.genderRatio[1]}%`}<i className="fas fa-venus"></i></p>
                        </div>

                    </div>
            
                    <div className = "PokemonInfo-species-item">
                    <b>Hatch Steps:</b> {`${this.props.speciesInfo.hatchRate} Steps`}
                    </div>
                    
                    <div className = "PokemonInfo-species-item">
                        <b>Catch Rate:</b> {this.props.speciesInfo.catchRate}
                    </div>

                    <div className = "PokemonInfo-species-item">
                        <b>Height:</b> {`${this.props.speciesInfo.height.meters} M
                        (${this.props.speciesInfo.height.feet}) `}
                    </div>

                    <div className = "PokemonInfo-species-item">
                        <b>Weight:</b>{` ${this.props.speciesInfo.weight}lb`}
                    </div>
                </div>
        )
    }
}
