import React from 'react';
import './PokemonCard.css';


const PokemonCard = (props) => {
    // console.log(props)
    // const errorHandler = (e) => {
    // console.log("entro al error handler con, ", e)
    // e.target.src = 'https://placeimg.com/200/300/animals'
    // e.target.onerror = null;
    // e.this.src= 'https://placeimg.com/200/300/animals'
    // }

    return (
        <div key={props.name} className='card'>
            <h1 className='name'>{props.name}</h1>
            <img className='img'
                src={props.img}
                // onError={errorHandler}
                // onAbort={errorHandler}
                alt={props.name} />
            <h4>Types:</h4>
            <div className='types'>
                {props.types?.map((t, i) => {
                    return (<p key={i}>{t?.name}</p>)
                })}
            </div>
        </div>
    );
};

export default PokemonCard;