import React from 'react';
import { useDispatch } from 'react-redux'
import { filterByType } from '../../redux/actions';
import { fillPokemonStore } from '../../redux/actions';

const TypeFilter = () => {

    const dispatch = useDispatch()

    const [input, setInput] = React.useState({
        type: '',
    });

    const handleInputChange = function (e) {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        });
    }

    const handleSubmit = function (e) {
        e.preventDefault();
        if (!input.type) {
            dispatch(fillPokemonStore())
        } else {
            dispatch(filterByType(input))  // {input: ----}
        }
    }

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