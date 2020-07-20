import React, { Component } from 'react';
import axios from "axios";
import { getMoveMatchup } from "../helper";

import TypeLine from "./TypeLine";

export default class TypeMatchups extends Component {
    constructor(props)
    {
        super(props);
        this.state = {
            fourTimesEffective:[],//4x
            twoTimesEffective: [],//2x
            notVeryEffective: [],//.25x
            notEffective: [],//.5x
            notDamaged: []//0x
        }
    }

    async componentDidMount()
    {
        let moveEffList = this.props.types.map(async type => {


            let typeData= await axios.get(type.url);
            typeData = typeData.data.damage_relations;

            return getMoveMatchup(typeData);
        })

        moveEffList = await Promise.all(moveEffList);

        let updatedFirstType=[];
        let updatedSecondType=[];

        //if the pokemon has two types
        if(moveEffList.length === 2)
        {
            //first we check if the two types have any type in common and then multiply the effectiveness
            updatedFirstType = moveEffList[0].map(type =>{
                for(let i=0; i< moveEffList[1].length; i++)
                {
                    if(moveEffList[1][i].name === type.name)
                    {
                        return{name: type.name, effectiveness: moveEffList[1][i].effectiveness * type.effectiveness}
                    }
                }
                return type;
            });

            //we still have left the types that didnt match so we add them by checking if that type is
            //already included in the array
            let typeNameArray = moveEffList[0].map(item => item.name)

            //we add type that isnt in the array
            for(let i =0; i< moveEffList[1].length; i++)
            {
                if(!typeNameArray.includes(moveEffList[1][i].name))
                {
                    updatedSecondType.push(moveEffList[1][i]);
                }
            }

            //finally we have our types!
            const finalTypeMatchups = [...updatedSecondType, ...updatedFirstType].filter(item => item.effectiveness !== 1)
           //filter out 1 since it does not matter to the player

           console.log(finalTypeMatchups);
           this.setState({
               fourTimesEffective: finalTypeMatchups.filter(type => type.effectiveness === 4),
               twoTimesEffective: finalTypeMatchups.filter(type => type.effectiveness === 2),
               notEffective: finalTypeMatchups.filter(type => type.effectiveness === .5),
               notVeryEffective: finalTypeMatchups.filter(type => type.effectiveness === .25),
               notDamaged: finalTypeMatchups.filter(type => type.effectiveness === 0)
           })
        }
        else
        {
            //if only one type than moveEffList[0] will do!
            this.setState({
                fourTimesEffective: moveEffList[0].filter(type => type.effectiveness === 4),
                twoTimesEffective: moveEffList[0].filter(type => type.effectiveness === 2),
                notEffective: moveEffList[0].filter(type => type.effectiveness === .5),
                notVeryEffective: moveEffList[0].filter(type => type.effectiveness === .25),
                notDamaged: moveEffList[0].filter(type => type.effectiveness === 0)
            })
        }
    }

    render() {
        return (
            <div className= "TypeMatchups">
                <h1>Type Matchups</h1>
               <TypeLine typeEffect= {this.state.fourTimesEffective} times="4X"/>
               <TypeLine typeEffect= {this.state.twoTimesEffective} times="2X"/>
               <TypeLine typeEffect= {this.state.notEffective} times="0.5X"/>
               <TypeLine typeEffect= {this.state.notVeryEffective} times="0.25X"/>
               <TypeLine typeEffect= {this.state.notDamaged}  times="0X"/>
            </div>
        )
    }
}
