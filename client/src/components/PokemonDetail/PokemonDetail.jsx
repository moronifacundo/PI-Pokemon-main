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
        <div>
            {pokemon.name ?
                <div className='detalle card'>
                    <h1 className='name detailsTitle'>{pokemon.name}</h1>
                    <img
                        className='detailsIMG'
                        src={pokemon.img}
                        alt={pokemon.name}
                    />
                    <div className="detailStats">
                        <h3>Stats:</h3>
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
                </div>
                : <div className='pikachuContainer'>
                    <img
                        className='pikachu'
                        src={loading}
                        alt="Loading resources"
                    />
                    <p className='loading'>Loading...</p>
                </div>}
        </div>
    );
};

export default PokemonDetail;
