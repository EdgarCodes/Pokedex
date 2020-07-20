import bug from "./images/PokemonTypes_01.png";
import dark from "./images/PokemonTypes_02.png";
import dragon from "./images/PokemonTypes_03.png";
import electric from "./images/PokemonTypes_04.png";
import fairy from "./images/PokemonTypes_05.png";
import fighting from "./images/PokemonTypes_06.png";
import fire from "./images/PokemonTypes_07.png";
import flying from "./images/PokemonTypes_08.png";
import ghost from "./images/PokemonTypes_09.png";
import grass from "./images/PokemonTypes_10.png";
import ground from "./images/PokemonTypes_11.png";
import ice from "./images/PokemonTypes_12.png";
import normal from "./images/PokemonTypes_13.png";
import poison from "./images/PokemonTypes_14.png";
import psychic from "./images/PokemonTypes_15.png";
import rock from "./images/PokemonTypes_16.png";
import steel from "./images/PokemonTypes_17.png";
import water from "./images/PokemonTypes_18.png";

const pad = function(num, size) {
    var s = String(num);
    while (s.length < (size || 2)) {s = "0" + s;}
    return s;
}


const chooseColor = ((type) => {

    switch(type){
        case "normal":
            return "#A8A878";
        case "fire":
            return "#F08030";
        case "fighting":
            return "#C03028";
        case "water":
            return "#6890F0";
        case "flying":
            return "#A890F0";
        case "grass":
            return "#78C850";
        case "poison":
            return "#A040A0";
        case "electric":
            return "#F8D030";
        case "ground":
            return "#E0C068";
        case "psychic":
            return "#F85888";
        case "rock":
            return "#B8A038";
        case "ice":
            return "#98D8D8";
        case "bug":
            return "#A8B820";
        case "dragon":
            return "#7038F8";
        case "ghost":
            return "#705898";
        case "dark":
            return "#705848";
        case "steel":
            return "#B8B8D0";
        case "fairy":
            return "#EE99AC";
        default:
            return "grey";
    }
});

const capitalize = ((string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
});

const chooseType = ((type) =>{
    switch(type){
        case "normal":
            return normal;
        case "fire":
            return fire;
        case "fighting":
            return fighting;
        case "water":
            return water;
        case "flying":
            return flying;
        case "grass":
            return grass;
        case "poison":
            return poison;
        case "electric":
            return electric;
        case "ground":
            return ground;
        case "psychic":
            return psychic;
        case "rock":
            return rock;
        case "ice":
            return ice;
        case "bug":
            return bug;
        case "dragon":
            return dragon;
        case "ghost":
            return ghost;
        case "dark":
            return dark;
        case "steel":
            return steel;
        case "fairy":
            return fairy;
        default:
            return normal;
    }
});

const getGenderRatio = (num) =>{
    if(num === -1) return ["None", "None"];

    let f = num*12.5;

    let m = 100-f;

    return [m, f]
}

const toMeters= (dm) =>{
    return dm/10;
}

const toFeet= (dm) =>{
    let realFeet = dm/3.048;

    let feet = Math.floor(realFeet);
    let inches = Math.round((realFeet - feet) * 12);

    return feet + "'" + inches + '"';;
}

const getStats = (stats) => {
    const realStats = stats.map(stat => stat.base_stat);
    //base_stats are in stats[i].base_stat
    const maxStat = Math.max(...realStats);
    
    const toShow = realStats.map(stat =>{
        return (stat/maxStat)*100 + "%"; 
    });

    return toShow;
}

const evolutionLine = (currentEvo, a = []) =>{
    if(currentEvo.evolves_to.length === 0)
    {
        a.push({evolution: currentEvo.species,info:  currentEvo.evolution_details[0], hasNext: false})
        return a;
    }

    a.push({evolution: currentEvo.species,info:  currentEvo.evolution_details[0], hasNext:true});

    return evolutionLine(currentEvo.evolves_to[0], a);
}

const getMoves = (moveList, game) =>{
    //we want to get moveName, URL, level learn, move learn method name, version-group

    const unFilterMoves = moveList.map(move =>{
        const versionData = move.version_group_details[0];

        return {
            name: move.move.name, 
            url: move.move.url,
            levelLearn : versionData.level_learned_at,
            moveLearnMethod: versionData.move_learn_method.name
        }
    })

    return unFilterMoves;
}

const getMoveMatchup = (dmg) =>{
    let computedList = [];
    
    computedList.push(...dmg.double_damage_from.map(type =>{
        return {name: type.name, effectiveness: 2}
    }));

    computedList.push(...dmg.half_damage_from.map(type =>{
        return {name: type.name, effectiveness: 0.5}
    }));

    computedList.push(...dmg.no_damage_from.map(type =>{
        return {name: type.name, effectiveness: 0}
    }));

    return computedList;
}


export {getMoveMatchup, pad, chooseColor, capitalize, chooseType, getGenderRatio, toFeet, toMeters, getStats, evolutionLine
,getMoves};