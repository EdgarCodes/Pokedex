import React, { Component } from 'react';
import {chooseColor, getStats} from "../helper";

export default class Stats extends Component {
    render() {
        const stats = getStats(this.props.stats);

        return (
            <div className="PokemonInfo-stats">
                <h1 className = "Stat-title">Base Stats</h1>
                {this.props.stats.map((stat,i) => 
                 <div className ="Stat" key={stat.stat.name}>
                     <p className="Stat-name">{stat.stat.name}</p>
                     <div className="Stat-bar">
                        <div className="Stat-bar-fill"
                        style={{backgroundColor:chooseColor(this.props.color), 
                        width:  stats[i]}}
                        >
                            <p className="Stat-num">{stat.base_stat}</p>
                         </div>
                     </div>
                 </div>
                )}
            </div>
        )
    }
}
