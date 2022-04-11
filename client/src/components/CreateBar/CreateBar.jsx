import React, { Component } from 'react';
import './CreateBar.css'
import CreatePokemon from '../CreatePokemon/CreatePokemon';

class CreateBar extends Component {

    render() {
        return (
            <div className="createBar">
                <li>
                    <CreatePokemon />
                </li>
            </div>
        );
    };
};

export default CreateBar;