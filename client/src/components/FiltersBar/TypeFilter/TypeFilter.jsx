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

    // const handleSubmit = function (e) {
    //     e.preventDefault();
    //     if (!input.type) {
    //         dispatch(resetFilter("type"))
    //     } else {
    //         dispatch(filterByType(input))  // {input: ----}
    //     }
    //     dispatch(intersectFilters())
    // }
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
        // eslint-disable-next-line
    }, [allPokemons, input])

    return (
        <div className='marginBot'>
            <form
            // onSubmit={handleSubmit}
            >
                <div>
                    <label>Filter by Type: </label>
                    <select
                        name="type"
                        className="type_input"
                        onChange={handleInputChange}
                        defaultValue="disabled">
                        <option value='' >All</option>
                        <option value="normal" className="type_option">normal</option>
                        <option value="fighting" className="type_option">fighting</option>
                        <option value="flying" className="type_option">flying</option>
                        <option value="poison" className="type_option">poison</option>
                        <option value="ground" className="type_option">ground</option>
                        <option value="rock" className="type_option">rock</option>
                        <option value="bug" className="type_option">bug</option>
                        <option value="ghost" className="type_option">ghost</option>
                        <option value="steel" className="type_option">steel</option>
                        <option value="fire" className="type_option">fire</option>
                        <option value="water" className="type_option">water</option>
                        <option value="grass" className="type_option">grass</option>
                        <option value="electric" className="type_option">electric</option>
                        <option value="psychic" className="type_option">psychic</option>
                        <option value="ice" className="type_option">ice</option>
                        <option value="dragon" className="type_option">dragon</option>
                        <option value="dark" className="type_option">dark</option>
                        <option value="fairy" className="type_option">fairy</option>
                        <option value="unknown" className="type_option">unknown</option>
                        <option value="shadow" className="type_option">shadow</option>
                    </select>
                    {/* <input
                        type="text"
                        name="type"
                        value={input["type"]}
                        onChange={handleInputChange} /> */}
                </div>

            </form>

        </div>
    );
};

export default TypeFilter;