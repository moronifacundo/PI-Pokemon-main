import React from 'react';
import { useDispatch } from 'react-redux'
import { searchByName, setLoading } from '../../../redux/actions'
import { resetFilter } from '../../../redux/actions';
import { intersectFilters } from '../../../redux/actions';

const NameFilter = () => {

    const dispatch = useDispatch()
    // const allPokemons = useSelector(state => state.allPokemons)

    const [input, setInput] = React.useState({
        name: '',
    });

    const handleInputChange = function (e) {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        });
    }

    const handleSubmit = (e) => {
        console.log(e.target.name)
        e.preventDefault();
        if (!input.name) {
            dispatch(resetFilter("name"));
        } else {
            // eslint-disable-next-line
            console.log("enviando name filter")
            dispatch(setLoading("Searching Pokemon..."));
            dispatch(searchByName({ ...input }));
        }
        dispatch(intersectFilters());
    }

    // React.useEffect(() => {
    //     if (!input.name) {
    //         dispatch(resetFilter("name"))
    //     } else {
    //         console.log("aca lo hace")
    //         dispatch(searchByName({ ...input }))  // {input: ----}
    //     }
    //     dispatch(intersectFilters())
    //     return () => {
    //     }
    //     // eslint-disable-next-line
    // }, [allPokemons])

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
                {/* <input type="submit" name="enviar" id="" /> */}
            </form>

        </div>
    );
};

export default NameFilter;