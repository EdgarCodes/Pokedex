import React, { Component } from 'react';
import { chooseType } from "../helper";

export default class TypeLine extends Component {
    render() {
        return (
            <div className="TypeLine">
                <h1>{this.props.times}</h1>
                <div className= "TypeLine-Types">
                    {this.props.typeEffect.map(type => <img 
                    className="TypeLine-img"
                    src= {chooseType(type.name)}
                    alt={type.name}
                    key = {type.name}    
                    />)}
                </div>
            </div>
        )
    }
}
