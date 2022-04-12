import { getAllPokemons, setLoading } from '../../redux/actions';
import React from 'react';
import { Link } from 'react-router-dom';
import loadingGIF from '../../img/loading.gif'

import { useSelector, useDispatch } from 'react-redux'
import './Pokemons.css'
import PokemonCard from './PokemonCard/PokemonCard';

const Pokemons = (props) => {
    const dispatch = useDispatch()
    const pokemons = useSelector(state => state.pokemons)
    const loading = useSelector(state => state.loading)
    const [page, setPage] = React.useState(1)

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
        dispatch(getAllPokemons());
        return () => {
            dispatch(setLoading(false))
        }
    }, [dispatch])

    React.useEffect(() => {
        setPage(1)
    }, [pokemons])

    return (
        <div>
            {(!loading) ? <div className='pages'>
                <p>Page</p>
                {
                    pages.map((p) => {
                        var disabled = false
                        if (p === page) { disabled = true }
                        return (<button
                            key={p}
                            disabled={disabled}
                            onClick={() => setPage(p)}
                        >{p}</button>)
                    })
                }
            </div>
                : <div>
                    <img src={loadingGIF} alt="Loading resources" />
                    <p>{loading}</p>
                </div>
            }

            <h1>Pokemons</h1>
            {/* <img src={img} alt="main-img" /> */}
            <div className='pokemons'>
                {(pokemons.length) || loading ?
                    pokemons?.map((p, i) => {
                        if (inPage(i)) {
                            // if (true) {
                            return (
                                <Link
                                    className="nodec cardBox"
                                    key={p.id}
                                    to={`/pokemons/${p.id}`} >
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
                        return false//ESTO ES SOLO POR UN WARNING
                    })
                    : <div className='notPokemonsFound'>
                        <img
                            src="https://stickers.wiki/static/stickers/piikachu/file_948258.gif"
                            alt="Not Pokemons found" />
                        <h4>Not pokemons found</h4>
                    </div>
                }
            </div>
        </div>
    );
};



export default Pokemons;