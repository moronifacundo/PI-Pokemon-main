import React from 'react';
import './PokemonCard.css';


const PokemonCard = (props) => {
    // console.log(props)

    return (
        <div className='card'>
            <h1 className='name'>{props.name}</h1>
            <img className='img' src={props.img} alt={props.name} />
            <div className='types'>
                <h4>Tipos:</h4>
                {props.types?.map(t => {
                    return (<p key={t.id}>{t.name}</p>)
                })}
            </div>
        </div>
    );
};

export default PokemonCard;