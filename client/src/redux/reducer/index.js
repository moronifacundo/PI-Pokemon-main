//IMPORTAR ACTIONS
import { GET_ALL_POKEMONS } from '../actions/index';
import { GET_POKEMON } from '../actions/index';
import { CREATE_POKEMON } from '../actions/index';
import { DELETE_POKEMON } from '../actions/index';
import { GET_TYPES } from '../actions/index';
import { FILTER_BY_NAME } from '../actions/index';
import { FILTER_BY_TYPE } from '../actions/index';
import { FILTER_BY_SOURCE } from '../actions/index';
import { RESET_FILTER } from '../actions/index';
import { ORDER_ALL_POKEMONS } from '../actions/index';
import { INTERSECT } from '../actions/index';

const initialState = {
    sourcePokemons: [],
    namePokemons: [],
    typePokemons: [],
    pokemons: [], // ESTE ES EL QUE RENDERIZO, es la interseccion de los otros 3
    pokemon: {},
    types: [],
    allPokemons: [],
    source: "all",
};

function intersect(arr1, arr2, arr3) {
    // HERMOSO CODE Q ENCONTRE QUE BUSCA INTERESECCIONES -> los ordena por como aparecen e el primero
    // var array1 = [666, "Lorem", "quick", "ipsum", "dolor"],
    // array2 = ["Lorem", "ipsum", 666, "quick", "brown", "foo"],
    // array3 = ["quick","Jumps",666, "Over", "Lazy", "ipsum","quick", "Lorem"],
    // array4 = [1337, 420, 666, "Lorem","quick","ipsum"],
    // data = [array1, array2, array3, array4],
    // result = data.reduce((a, b) => a.filter(c => b.includes(c)));
    // console.log(result);
    var data = [arr1, arr2, arr3]
    var result = data.reduce((a, b) => a.filter(c => b.includes(c)));
    return result
}

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        // Acá va tu código:
        case GET_ALL_POKEMONS:
            // console.log("dispatched getallpl")
            return {
                ...state,
                pokemons: action.payload,
                allPokemons: action.payload,
                sourcePokemons: action.payload,
                namePokemons: action.payload,
                typePokemons: action.payload
            }

        case GET_POKEMON:
            return {
                ...state,
                pokemon: action.payload
            }

        case CREATE_POKEMON:
            // console.log("reducer create pokemon", action.payload)
            return {
                ...state,
                pokemons: [...state.pokemons, action.payload],
                allPokemons: [...state.allPokemons, action.payload]
            }

        case DELETE_POKEMON:
            return {
                ...state,
                pokemons: state.pokemons.filter(p => p.id !== action.payload)
            }

        case GET_TYPES:
            return {
                ...state,
                types: action.payload
            }

        case FILTER_BY_NAME:
            console.log("reducer filt by name")
            return {
                ...state,
                // allPokemons: [...state.allPokemons, action.payload],
                pokemons: [action.payload]
            }

        case FILTER_BY_TYPE:
            return {
                ...state,
                typePokemons: state.allPokemons.filter(p => (p.types[0]?.name === action.payload || p.types[1]?.name === action.payload))
            }

        case FILTER_BY_SOURCE:
            // console.log("filtrando by src", action.payload)
            switch (action.payload) {

                case "api":
                    return {
                        ...state,
                        source: action.payload,
                        sourcePokemons: state.allPokemons.filter(p => (p.id < 3000))
                    }
                case "db":
                    return {
                        ...state,
                        source: action.payload,
                        sourcePokemons: state.allPokemons.filter(p => (p.id > 3000))
                    }
                default:
                    return {
                        ...state,
                        source: action.payload,
                        sourcePokemons: state.allPokemons
                    }
            }

        case RESET_FILTER:
            switch (action.payload) {

                case "name":
                    return {
                        ...state,
                        namePokemons: state.allPokemons
                    }
                case "type":
                    return {
                        ...state,
                        typePokemons: state.allPokemons
                    }
                case "source":
                    return {
                        ...state,
                        sourcePokemons: state.allPokemons
                    }
                default:
                    return {
                        ...state,
                        namePokemons: state.allPokemons,
                        typePokemons: state.allPokemons,
                        sourcePokemons: state.allPokemons
                    }
            }

        case ORDER_ALL_POKEMONS:
            console.log("ordenando por el orden ", action.payload)
            var auxPokemon = [...state.allPokemons]
            switch (action.payload) {
                case "A to Z":
                    var orderedPokemons = auxPokemon.sort((a, b) => (a.name > b.name) ? 1 : -1);
                    return {
                        ...state,
                        allPokemons: [...orderedPokemons]
                    }
                case "Z to A":
                    var orderedPokemons = auxPokemon.sort((a, b) => (a.name < b.name) ? 1 : -1);
                    return {
                        ...state,
                        allPokemons: [...orderedPokemons]
                    }
                case "by Strength (max)":
                    console.log("no esta entrando a default")
                    console.log(auxPokemon[0], auxPokemon[1])
                    var orderedPokemons = auxPokemon.sort((a, b) => (a.strength < b.strength) ? 1 : -1);
                    return {
                        ...state,
                        allPokemons: [...orderedPokemons]
                    }
                case "by Strength (min)":
                    var orderedPokemons = auxPokemon.sort((a, b) => (a.strength > b.strength) ? 1 : -1);
                    return {
                        ...state,
                        allPokemons: [...orderedPokemons]
                    }
                default:
                    return {
                        ...state
                    }
            }

        case INTERSECT:
            return {
                ...state,
                pokemons: intersect(state.allPokemons, state.sourcePokemons, state.typePokemons, state.namePokemons)
            }

        default:
            return state
    };
};

export default rootReducer;
