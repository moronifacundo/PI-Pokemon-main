import React, { Component } from 'react';
import CreatePokemon from './CreatePokemon';
import './CreatePokemon.css'

class createPokemonWrapper extends Component {

    render() {
        return (
            <div>
                <h2>Create your own Pokemon</h2>
                <CreatePokemon
                    fullCreator={true}
                    sentClassName="fullCreator" />
            </div>
        );
    };
};

export default createPokemonWrapper;