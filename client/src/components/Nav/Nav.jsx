import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import './Nav.css'

class Nav extends Component {

    render() {
        return (
            <div>
                <header>
                    <nav className='nav'>

                        <NavLink className="navLink" activeClassName='selected' exact to="/" >Home</NavLink>

                        <NavLink className="navLink" activeClassName='selected' exact to="/pokemons/" >Pokemons</NavLink>

                        <NavLink className="navLink" activeClassName='selected' to="/pokemon/create" >Create Pokemon</NavLink>
                        {/* <Link to="/types" >Types</Link> */}
                    </nav>
                </header>
            </div>
        );
    };
};

export default Nav;