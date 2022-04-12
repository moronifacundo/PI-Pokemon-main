import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// import './notFound.css'

class notFound extends Component {

    render() {
        return (
            <div>

                <div>
                    <img
                        src="https://i.imgur.com/BK3X1IS.png"
                        alt="404 path not found"
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

export default notFound;