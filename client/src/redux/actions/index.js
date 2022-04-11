import axios from 'axios';

export const GET_ALL_POKEMONS = 'GET_ALL_POKEMONS';
export const CREATE_POKEMON = 'CREATE_POKEMON';
export const GET_POKEMON = 'GET_POKEMON';
export const DELETE_POKEMON = 'DELETE_POKEMON';
export const GET_TYPES = 'GET_TYPES';
export const FILTER_BY_NAME = 'FILTER_BY_NAME';
export const FILTER_BY_TYPE = 'FILTER_BY_TYPE';
export const FILTER_BY_SOURCE = 'FILTER_BY_SOURCE';
export const RESET_FILTER = 'RESET_FILTER';
export const ORDER_ALL_POKEMONS = 'ORDER_ALL_POKEMONS';
export const INTERSECT = 'INTERSECT';

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
        try {
            const createName = await axios.get('http://localhost:3001/pokemons?name=' + payload.name.toLowerCase());
            console.log("lo q me devuelve el createName es :", createName)
            alert("There is another pokemon with that name. Try a different one")
            return
        } catch (error) {
            console.log("Pokemon doesn't exist, you may continue")
        }
        if (payload.img === "") { payload.img = "https://i.imgur.com/DfaZPXl.png" }
        if (!(payload.types[0] || payload.types[1])) { payload.types = [{ name: "normal" }] }
        // console.log("el payload es... ", payload)
        const newPokemon = await axios.post('http://localhost:3001/pokemons', payload);
        // console.log("el post devolvio ,", newPokemon.data)
        await axios.get('http://localhost:3001/pokemons', payload);

        return dispatch({
            type: CREATE_POKEMON,
            payload: { ...newPokemon.data, types: payload.types }
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

export const searchByName = (payload) => async dispatch => {
    try {
        const pokemon = await axios.get('http://localhost:3001/pokemons?name=' + payload.name.toLowerCase());
        // console.log("pokemon data", pokemon.data)
        return dispatch({ type: FILTER_BY_NAME, payload: pokemon.data });
    } catch (error) {
        alert("el pokemon buscado no existe")
    }
};

export const resetFilter = (payload) => {
    // console.log("reseteando filter ", payload)
    return { type: RESET_FILTER, payload };
};

export const filterByType = (payload) => {
    // console.log("filtra by type, ", payload.type)
    return { type: FILTER_BY_TYPE, payload: payload.type };
};

export const filterBySource = (payload) => {
    // console.log("filtra by source, ", payload.source)
    return { type: FILTER_BY_SOURCE, payload: payload.source };
};

export const orderAllPokemons = (payload) => {
    console.log("actions esta")
    return { type: ORDER_ALL_POKEMONS, payload: payload.order };
};

export const intersectFilters = (payload) => {
    // console.log("intersectando!")
    return { type: INTERSECT }
}