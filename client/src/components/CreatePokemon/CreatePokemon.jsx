import React from 'react';
import { createPokemon, setLoading } from '../../redux/actions';
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom';
import PokemonDetailCard from '../PokemonDetail/PokemonDetailCard';

const CreatePokemon = (props) => {
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
        type1: '',
        type2: '',
    });

    const [errorName, setErrorName] = React.useState('');
    const [errorUrl, setErrorUrl] = React.useState('');
    const [errorAttributes, setErrorAttributes] = React.useState({
        hp: '',
        strength: '',
        defence: '',
        speed: '',
        height: '',
        weight: '',
        types: ''
    });
    const [disabled, setDisabled] = React.useState(true);

    const validarForm = function () {
        let valid = true;

        for (const key in errorAttributes) {
            if (errorAttributes[key]) { valid = false }
        }
        if (errorName || errorUrl) { valid = false }

        if (valid) {
            setDisabled(false)
        } else {
            setDisabled(true)
        }
    };

    const validarTypes = function () {
        let error = '';

        if (input["type1"] === input["type2"]) {
            error = 'types must be different from eachother, and you need at least one'
        }

        setErrorAttributes({
            ...errorAttributes,
            types: error
        })
    };

    const handleInputChange = function (e) {
        const { value, name } = e.target;
        var namePattern = /^([a-zA-Z]+)(\s[a-zA-Z]+)*$/;
        var numPattern = /^\d+$/;
        var urlPattern = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/;

        switch (name) {

            case 'name':
                setErrorName(
                    namePattern.test(value) ? '' : 'Pokemons name must contain only letters and spaces (and not end in space)'
                );
                break;

            case 'hp':
            case 'strength':
            case 'defence':
            case 'speed':
            case 'height':
            case 'weight':
                // console.log("entra al switch de error")
                setErrorAttributes({
                    ...errorAttributes,
                    [name]: (numPattern.test(value)
                        // && value <= 200  // en caso de querer un limite de valores
                    ) ? '' : [name] + ' must be an integer positive number',
                });
                break;

            case 'img':
                setErrorUrl(
                    urlPattern.test(value) ? '' : 'Please enter a valid URL (starting with https://)'
                );
                break;

            default:
                break;
        }

        setInput({
            ...input,
            [name]: value
        });
    }

    React.useEffect(() => {
        validarForm()

        return () => {
        }
        // eslint-disable-next-line
    }, [errorName, errorUrl, errorAttributes])

    React.useEffect(() => {
        validarTypes()
        return () => {
        }
        // eslint-disable-next-line
    }, [input])

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(setLoading("Creating Pokemon..."));
        // if (input.img === "") { input.img = "https://i.imgur.com/DfaZPXl.png" }
        if (input.img === "") {
            setInput({ ...input, img: "https://i.imgur.com/DfaZPXl.png" })
        }
        const types = []
        if (input.type1) { types.push({ name: input.type1 }) }
        if (input.type2) { types.push({ name: input.type2 }) }
        console.log("handle submit", input)
        dispatch(createPokemon({ ...input, types: types }));
        setDisabled(true);
    }

    return (
        <div className={props.sentClassName}>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name: </label>
                    <input
                        required
                        type="text"
                        name="name"
                        value={input["name"]}
                        onChange={handleInputChange} />
                    {!errorName ?
                        <div>
                            <br className='errorMsg transparent'></br>
                        </div>
                        : <div className='errorMsg'>{errorName}</div>}
                </div>

                <div>
                    <label>HP: </label>
                    <input
                        type="number"
                        name="hp"
                        value={input["hp"]}
                        onChange={handleInputChange} />
                    {!errorAttributes.hp ?
                        <div>
                            <br className='errorMsg transparent'></br>
                        </div>
                        : <div className='errorMsg'>{errorAttributes.hp}</div>}
                </div>

                <div>
                    <label>Defence: </label>
                    <input
                        type="number"
                        name="defence"
                        value={input["defence"]}
                        onChange={handleInputChange} />
                    {!errorAttributes.defence ?
                        <div>
                            <br className='errorMsg transparent'></br>
                        </div>
                        : <div className='errorMsg'>{errorAttributes.defence}</div>}
                </div>

                <div>
                    <label>Speed: </label>
                    <input
                        type="number"
                        name="speed"
                        value={input["speed"]}
                        onChange={handleInputChange} />
                    {!errorAttributes.speed ?
                        <div>
                            <br className='errorMsg transparent'></br>
                        </div>
                        : <div className='errorMsg'>{errorAttributes.speed}</div>}

                </div>

                <div>
                    <label>Strength: </label>
                    <input
                        type="number"
                        name="strength"
                        value={input["strength"]}
                        onChange={handleInputChange} />
                    {!errorAttributes.strength ?
                        <div>
                            <br className='errorMsg transparent'></br>
                        </div>
                        : <div className='errorMsg'>{errorAttributes.strength}</div>}
                </div>

                <div>
                    <label>Height: </label>
                    <input
                        type="number"
                        name="height"
                        value={input["height"]}
                        onChange={handleInputChange} />
                    {!errorAttributes.height ?
                        <div>
                            <br className='errorMsg transparent'></br>
                        </div>
                        : <div className='errorMsg'>{errorAttributes.height}</div>}
                </div>

                <div>
                    <label>Weight: </label>
                    <input
                        type="number"
                        name="weight"
                        value={input["weight"]}
                        onChange={handleInputChange} />
                    {!errorAttributes.weight ?
                        <div>
                            <br className='errorMsg transparent'></br>
                        </div>
                        : <div className='errorMsg'>{errorAttributes.weight}</div>}
                </div>

                <div>
                    <label>Image URL: </label>
                    <input
                        type="url"
                        placeholder='https://i.imgur.com/DfaZPXl.png'
                        name="img"
                        value={input["img"]}
                        onChange={handleInputChange} />
                    {!errorUrl ?
                        <div>
                            <br className='errorMsg transparent'></br>
                        </div>
                        : <div className='errorMsg'>{errorUrl}</div>}
                </div>

                <div>
                    <select
                        name="type1"
                        className={"type_input " + props.sentClassName}
                        onChange={handleInputChange}
                        defaultValue="disabled">
                        <option value=''>-- Select Type --</option>
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
                </div>

                <div>
                    <select
                        name="type2"
                        className={"type_input " + props.sentClassName}
                        onChange={handleInputChange}
                        defaultValue="disabled">
                        <option value='' >-- Select Type --</option>
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
                </div>
                
                {!errorAttributes.types
                    ?
                    <div>
                        <br className='errorMsg transparent'></br>
                        <br className='errorMsg transparent'></br>
                        <br className='errorMsg transparent'></br>
                    </div>
                    : <p className='errorMsg'>{errorAttributes.types}</p>}

                <button
                    disabled={disabled}
                    type="submit"
                >Create
                </button>

                {/* //SHOWING THE POKEMON TO THE USER */}
                {(props.fullCreator)
                    ? <div>
                        <h3>You are creating...</h3>
                        <PokemonDetailCard
                            name={input["name"]}
                            types={[{ name: input.type1 }, { name: input.type2 }]}
                            img={input["img"]}
                            id={input.id}
                            hp={input.hp}
                            strength={input.strength}
                            defence={input.defence}
                            speed={input.speed}
                            height={input.height}
                            weight={input.weight}
                        />
                    </div>
                    : <div>
                        <br />
                        <div className='goFull'>
                            <Link className="nodec navLink "
                                to='/pokemon/create'>
                                Go to full creator
                            </Link>
                        </div>
                    </div>}


            </form>

        </div>
    );
};

export default CreatePokemon;