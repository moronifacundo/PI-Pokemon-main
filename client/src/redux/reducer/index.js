//IMPORTAR ACTIONS
import { GET_ALL_POKEMONS } from '../actions/index';
import { GET_POKEMON } from '../actions/index';
import { CREATE_POKEMON } from '../actions/index';
import { DELETE_POKEMON } from '../actions/index';
import { GET_TYPES } from '../actions/index';
import { FILTER_BY_NAME } from '../actions/index';

const initialState = {
    pokemons: [],
    pokemon: {},
    types: [],
    allPokemons: []
};

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        // Acá va tu código:
        case GET_ALL_POKEMONS:
            return {
                ...state,
                pokemons: action.payload,
                allPokemons: action.payload
            }

        case GET_POKEMON:
            return {
                ...state,
                pokemon: action.payload
            }

        case CREATE_POKEMON:
            return {
                ...state,
                pokemons: [...state.pokemons, action.payload]
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
            return {
                ...state,
                pokemons: state.allPokemons.filter(p => p.name == action.payload)
            }

        default:
            return state
    };
};

export default rootReducer;
