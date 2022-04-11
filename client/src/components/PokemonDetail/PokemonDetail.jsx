import React from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { getPokemon, resetDetails, setLoading } from '../../redux/actions';
import './PokemonDetail.css';
import loading from '../../img/loading.gif'

const PokemonDetail = (props) => {

    const dispatch = useDispatch()
    const pokemon = useSelector(state => state.pokemon)

    React.useEffect(() => {
        dispatch(getPokemon(props.match.params.pokemonId))
        dispatch(setLoading("Loading... Please Wait"))
        return () => {
            dispatch(resetDetails())
        }
        // eslint-disable-next-line
    }, [])

    return (
        <div className='detalle'>
            <h1 className='name'>{pokemon.name}</h1>
            <img src={pokemon.img} alt={pokemon.name} />
            {pokemon.name ? <div className="stats">
                <p>hp: {pokemon.hp}</p>
                <p>strength: {pokemon.strength}</p>
                <p>defence: {pokemon.defence}</p>
                <p>speed: {pokemon.speed}</p>
                <p>height: {pokemon.height}</p>
                <p>weight: {pokemon.weight}</p>
                <h4>Types:</h4>
                {pokemon.types?.map(t => {
                    return (<p key={t?.id}>{t?.name}</p>)
                })}
            </div>
                : <div>
                    <img src={loading} alt="Loading resources" />
                    <p>Loading...</p>
                </div>}
        </div>
    );
};

export default PokemonDetail;
