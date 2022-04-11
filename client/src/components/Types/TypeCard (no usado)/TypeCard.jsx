import React from 'react';
// import './TypeCard.css';


const TypeCard = (props) => {
    return (
        <div className='card'>
            <p className='name'>{props.name}</p>
        </div>
    );
};

export default TypeCard;