import React from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { searchByName } from '../../../redux/actions'
import { resetFilter } from '../../../redux/actions';
import { intersectFilters } from '../../../redux/actions';

const NameFilter = () => {

    const dispatch = useDispatch()
    const allPokemons = useSelector(state => state.allPokemons)

    const [input, setInput] = React.useState({
        name: '',
    });

    const handleInputChange = function (e) {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        });
    }

    const handleSubmit = function (e) {
        e.preventDefault();
        if (!input.name) {
            dispatch(resetFilter("name"))
        } else {
            dispatch(searchByName({ ...input }))
        }
        dispatch(intersectFilters())
    }
    
    React.useEffect(() => {
        if (!input.name) {
            dispatch(resetFilter("name"))
        } else {
            dispatch(searchByName({ ...input }))  // {input: ----}
        }
        dispatch(intersectFilters())
        return () => {
        }
    }, [allPokemons])

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Search by Name: </label>
                    <input
                        type="text"
                        name="name"
                        value={input["name"]}
                        onChange={handleInputChange} />
                </div>

            </form>

        </div>
    );
};

export default NameFilter;