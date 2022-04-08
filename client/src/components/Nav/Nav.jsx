import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Nav.css'

class Nav extends Component {

    render() {
        return (
            <div>
                <header>
                    <nav>
                        <ul>
                            <li>
                                <Link to="/" >Home</Link>
                            </li>
                            <li>
                                <Link to="/pokemon/create" >Create Pokemon</Link>
                            </li>
                            <li>
                                <Link to="/pokemons/" >Pokemons</Link>
                            </li>
                            <li>
                                <Link to="/types" >Types</Link>
                            </li>
                        </ul>
                    </nav>
                </header>
            </div>
        );
    };
};

export default Nav;