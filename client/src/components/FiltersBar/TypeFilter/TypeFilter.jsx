import React from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { filterByType } from '../../../redux/actions';
import { resetFilter } from '../../../redux/actions';
import { intersectFilters } from '../../../redux/actions';

const TypeFilter = () => {

    const dispatch = useDispatch()

    const [input, setInput] = React.useState({
        type: '',
    });

    const allPokemons = useSelector(state => state.allPokemons)

    const handleInputChange = function (e) {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        });
    }

    const handleSubmit = function (e) {
        e.preventDefault();
        if (!input.type) {
            dispatch(resetFilter("type"))
        } else {
            dispatch(filterByType(input))  // {input: ----}
        }
        dispatch(intersectFilters())
    }
    // 
    React.useEffect(() => {
        if (!input.type) {
            dispatch(resetFilter("type"))
        } else {
            dispatch(filterByType(input))  // {input: ----}
        }
        dispatch(intersectFilters())
        return () => {
        }
    }, [allPokemons])

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Search by Type: </label>
                    <input
                        type="text"
                        name="type"
                        value={input["type"]}
                        onChange={handleInputChange} />
                </div>

            </form>

        </div>
    );
};

export default TypeFilter;