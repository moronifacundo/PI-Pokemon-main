import { getTypes } from '../../redux/actions';
import React from 'react';
// import { Link } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux'
import './Types.css'

// import TypeCard from '../TypeCard/TypeCard';


const Types = () => {

    const dispatch = useDispatch()
    const types = useSelector(state => state.types)

    React.useEffect(() => {
        dispatch(getTypes())

        return () => {
        }
    }, [dispatch])

    return (
        <div>
            <h1>Types</h1>
            <div className='types'>
                {
                    types?.map((p) => {
                        return (
                            <p key={p.id}>{p.name}</p>
                        )
                    })
                }
            </div>
        </div>
    );
};

export default Types;