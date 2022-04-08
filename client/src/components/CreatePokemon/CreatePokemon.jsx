import React from 'react';
import { createPokemon } from '../../redux/actions';
import { useDispatch } from 'react-redux'


const CreatePokemon = () => {

    const dispatch = useDispatch()

    const [input, setInput] = React.useState({
        name: '',
        hp: '',
        strength: '',
        defence: '',
        speed: '',
        height: '',
        weight: '',
        img: '',
        type1: undefined,
        type2: undefined
    });

    const handleInputChange = function (e) {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        });
    }

    const handleSubmit = function (e) {
        e.preventDefault();

        dispatch(createPokemon({ ...input, types: [input.type1, input.type2]}))
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name: </label>
                    <input
                        type="text"
                        name="name"
                        value={input["name"]}
                        onChange={handleInputChange} />
                </div>

                <div>
                    <label>HP: </label>
                    <input
                        type="number"
                        name="hp"
                        value={input["hp"]}
                        onChange={handleInputChange} />
                </div>

                <div>
                    <label>Defence: </label>
                    <input
                        type="number"
                        name="defence"
                        value={input["defence"]}
                        onChange={handleInputChange} />
                </div>

                <div>
                    <label>Speed: </label>
                    <input
                        type="number"
                        name="speed"
                        value={input["speed"]}
                        onChange={handleInputChange} />
                </div>

                <div>
                    <label>Strength: </label>
                    <input
                        type="number"
                        name="strength"
                        value={input["strength"]}
                        onChange={handleInputChange} />
                </div>

                <div>
                    <label>Height: </label>
                    <input
                        type="number"
                        name="height"
                        value={input["height"]}
                        onChange={handleInputChange} />
                </div>

                <div>
                    <label>Weight: </label>
                    <input
                        type="range"
                        name="weight"
                        value={input["weight"]}
                        onChange={handleInputChange} />
                </div>

                <div>
                    <label>Image URL: </label>
                    <input
                        type="url"
                        placeholder='https://i.imgur.com/DfaZPXl.png'
                        name="img"
                        value={input["img"]}
                        onChange={handleInputChange} />
                </div>

                <select
                    name="type1"
                    className="type_input"
                    onChange={handleInputChange}
                    defaultValue="disabled">
                    <option value="disabled" disabled>-- Seleccione tipo --</option>
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

                <select
                    name="type2"
                    className="type_input"
                    onChange={handleInputChange}
                    defaultValue="disabled">
                    <option value="disabled" disabled>-- Seleccione tipo --</option>
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

                <button type="submit">Create</button>

            </form>

        </div>
    );
};

export default CreatePokemon;