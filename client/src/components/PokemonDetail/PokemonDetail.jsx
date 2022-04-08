import React from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { getPokemon } from '../../redux/actions';
import './PokemonDetail.css';


const PokemonDetail = (props) => {

    const dispatch = useDispatch()
    const pokemon = useSelector(state => state.pokemon)

    React.useEffect(() => {
        dispatch(getPokemon(props.match.params.pokemonId))

        return () => {
        }
    })

    return (
        <div className='detalle'>
            <h1>{pokemon.name}</h1>
            <img src={pokemon.img} alt={pokemon.name} />
            <div className="stats">
                <p>hp: {pokemon.hp}</p>
                <p>strength: {pokemon.strength}</p>
                <p>defence: {pokemon.defence}</p>
                <p>speed: {pokemon.speed}</p>
                <p>height: {pokemon.height}</p>
                <p>weight: {pokemon.weight}</p>
            </div>
        </div>
    );
};

export default PokemonDetail;
