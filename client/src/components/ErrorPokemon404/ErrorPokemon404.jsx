import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// import './ErrorPokemon404.css'

class ErrorPokemon404 extends Component {
    render() {
        return (
            <div>

                <div>
                    <img
                        src="https://i.imgur.com/jn0Bfpj.png"
                        alt="404 pokemon not found"
                    />
                </div>

                <div>
                    <button>
                        <Link className='nodec' to="/pokemons" >
                            Go Back to Page
                        </Link>
                    </button>
                </div>

            </div>
        );
    };
};

export default ErrorPokemon404;