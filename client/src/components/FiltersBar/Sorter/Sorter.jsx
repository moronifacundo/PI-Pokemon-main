import React from 'react';
import { useDispatch} from 'react-redux'
import {  orderAllPokemons } from '../../../redux/actions';
// import { intersectFilters } from '../../../redux/actions';

const TypeFilter = () => {

    const dispatch = useDispatch()
    // const allPokemons = useSelector(state => state.allPokemons)

    // const [input, setInput] = React.useState({
    //     order: '',
    // });

    // const handleInputChange = function (e) {
    //     setInput({
    //         ...input,
    //         order: e.target.value
    //     })
    // }

    const handleSubmit = (e) => {
        // console.log("handle submit with ", e.target.value)
        dispatch(orderAllPokemons({ order: e.target.value }))
    }

    return (
        <div>
            <form className="form"
            // onSubmit={handleSubmit}
            // onChange={handleInputChange}
            >
                <p>Order Pokemons:</p>
                <div>
                    <div>
                        <input
                            onClick={handleSubmit}
                            className='orderBtn'
                            type="button"
                            id="A to Z"
                            name="order"
                            value="A to Z" />
                    </div>

                    <div>
                        <input
                            onClick={handleSubmit}
                            className='orderBtn'
                            type="button"
                            id="Z to A"
                            name="order"
                            value="Z to A" />
                    </div>

                    <div>
                        <input
                            onClick={handleSubmit}
                            className='orderBtn'
                            type="button"
                            id="by Strength (max)"
                            name="order"
                            value="by Strength (max)" />
                    </div>

                    <div>
                        <input
                            onClick={handleSubmit}
                            className='orderBtn'
                            type="button"
                            id="by Strength (min)"
                            name="order"
                            value="by Strength (min)" />
                    </div>

                </div>
            </form>
        </div>
    );
};

export default TypeFilter;