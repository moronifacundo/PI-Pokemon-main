import React from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { filterBySource } from '../../../redux/actions';
import { intersectFilters } from '../../../redux/actions';

const TypeFilter = () => {

    const dispatch = useDispatch()
    const allPokemons = useSelector(state => state.allPokemons)

    const [input, setInput] = React.useState({
        source: '',
    });

    const handleInputChange = function (e) {
        setInput({
            ...input,
            source: e.target.value
        })
        // dispatch(filterBySource(input))
    }

    React.useEffect(() => {
        dispatch(filterBySource(input))
        dispatch(intersectFilters())
        return () => {
        }
        // eslint-disable-next-line
    }, [input, allPokemons])

    // React.useEffect(() => {
    //     dispatch(resetFilter("source"))
    //     dispatch(intersectFilters())
    //     return () => {
    //     }
    // }, [allPokemons])
    // const handleSubmit = function (e) {
    //     e.preventDefault();
    //     dispatch(filterBySource(input))
    //     dispatch(intersectFilters())
    // }

    return (
        <div>
            <form className="form"
                // onSubmit={handleSubmit}
                onChange={handleInputChange}>
                <p>Show pokemons:</p>
                <div>
                    <div>
                        <input
                            className='radio'
                            type="radio"
                            id="all"
                            name="source"
                            value="all" />
                        <label htmlFor="all">All</label>
                    </div>

                    <div>
                        <input
                            className='radio'
                            type="radio"
                            id="api"
                            name="source"
                            value="api" />
                        <label htmlFor="api">From External Api</label>
                    </div>

                    <div>
                        <input
                            className='radio'
                            type="radio"
                            id="db"
                            name="source"
                            value="db" />
                        <label htmlFor="db">from Database</label>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default TypeFilter;