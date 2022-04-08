import React from 'react';
import { useDispatch } from 'react-redux'
import { searchByName } from '../../redux/actions';
import { fillPokemonStore } from '../../redux/actions';

const NameFilter = () => {

    const dispatch = useDispatch()

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
            dispatch(fillPokemonStore())
        } else {
            dispatch(searchByName({ ...input }))
        }
    }

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