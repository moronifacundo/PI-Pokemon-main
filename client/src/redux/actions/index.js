import axios from 'axios';

export const GET_ALL_POKEMONS = 'GET_ALL_POKEMONS';
export const CREATE_POKEMON = 'CREATE_POKEMON';
export const GET_POKEMON = 'GET_POKEMON';
export const DELETE_POKEMON = 'DELETE_POKEMON';
export const GET_TYPES = 'GET_TYPES';
export const FILTER_BY_NAME = 'FILTER_BY_NAME';
export const FILTER_BY_TYPE = 'FILTER_BY_TYPE';
export const FILL_POKEMON_STORE = 'FILL_POKEMON_STORE';

//////////////////////

export const getAllPokemons = () => dispatch => {
    return fetch("http://localhost:3001/pokemons")
        .then(response => response.json())
        .then(json => {
            dispatch({ type: GET_ALL_POKEMONS, payload: json });
        });
};
export const getPokemon = (id) => dispatch => {
    return fetch('http://localhost:3001/pokemons/' + id)
        .then(response => response.json())
        .then(json => {
            dispatch({ type: GET_POKEMON, payload: json });
        });
};

export function createPokemon(payload) {
    return async function (dispatch) {
        let poke = await axios.post('http://localhost:3001/pokemons', payload);
        return dispatch({
            type: CREATE_POKEMON,
            payload: poke.data
        })
    }
};

export const getTypes = () => dispatch => {
    return fetch("http://localhost:3001/types")
        .then(response => response.json())
        .then(json => {
            dispatch({ type: GET_TYPES, payload: json });
        });
};

export const deletePokemon = (payload) => {
    return { type: DELETE_POKEMON, payload };
};

export const searchByName = (payload) => {
    return { type: FILTER_BY_NAME, payload: payload.name.toLowerCase() };
};

export const fillPokemonStore = () => {
    return { type: FILL_POKEMON_STORE };
};

export const filterByType = (payload) => {
    console.log("filtra by type, ", payload.type)
    return { type: FILTER_BY_TYPE, payload: payload.type };
};