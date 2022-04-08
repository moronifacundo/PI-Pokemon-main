import { getAllPokemons } from '../../redux/actions';
import React from 'react';
import { Link } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux'
import './Pokemons.css'

import PokemonCard from '../PokemonCard/PokemonCard';

const Pokemons = (props) => {

    const dispatch = useDispatch()
    const pokemons = useSelector(state => state.pokemons)
    // const allPokemons = useSelector(state => state.allPokemons)

    React.useEffect(() => {
        dispatch(getAllPokemons())

        return () => {
        }
    }, [dispatch])



    return (
        <div>
            <h1>Pokemons</h1>
            {/* <img src={img} alt="main-img" /> */}
            <div className='pokemons'>
                {
                    pokemons?.map((p) => {
                        return (
                            <Link className="nodec" key={p.id} to={`/pokemons/${p.id}`} >
                                <PokemonCard
                                    id={p.id}
                                    name={p.name}
                                    img={p.img}
                                    types={p.types}
                                />
                            </Link>
                        )
                    })
                }
            </div>
        </div>
    );
};



export default Pokemons;