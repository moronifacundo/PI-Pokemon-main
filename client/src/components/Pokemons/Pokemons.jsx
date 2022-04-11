import { getAllPokemons } from '../../redux/actions';
import React from 'react';
import { Link } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux'
import './Pokemons.css'

import PokemonCard from './PokemonCard/PokemonCard';

const Pokemons = (props) => {
    const dispatch = useDispatch()
    const pokemons = useSelector(state => state.pokemons)
    const [page, setPage] = React.useState(1)
    // const [disabled, setDisabled] = React.useState(true)

    var pokeOnPage = 12
    var pagesRequired = Math.ceil(pokemons.length / 12)
    var pages = []

    for (let i = 1; i <= pagesRequired; i++) {
        pages.push(i)
    }

    const inPage = function (index) {
        let begin = (page - 1) * pokeOnPage;
        let end = page * pokeOnPage;
        if (index < end && index >= begin) { return true }
        return false
    }

    React.useEffect(() => {
        dispatch(getAllPokemons())

        return () => {
        }
    }, [dispatch])

    return (
        <div>
            <p>Page</p>
            {
                pages.map(p => {

                    var disabled = false
                    if (p === page) { disabled = true }
                    return (<button
                        disabled={disabled}
                        onClick={() => setPage(p)}
                    >{p}</button>)
                })
            }

            <h1>Pokemons</h1>
            {/* <img src={img} alt="main-img" /> */}
            <div className='pokemons'>
                {
                    pokemons?.map((p, i) => {
                        if (inPage(i)) {
                            // if (true) {
                            return (
                                <Link className="nodec" key={p.id} to={`/pokemons/${p.id}`} >
                                    <PokemonCard
                                        key={p.id}
                                        id={p.id}
                                        name={p.name}
                                        img={p.img}
                                        types={p.types}
                                    />
                                </Link>
                            )
                        }
                    })
                }
            </div>
        </div>
    );
};



export default Pokemons;