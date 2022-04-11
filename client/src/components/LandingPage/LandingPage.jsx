import React from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css';


export default function LandingPage() {
    return (
        <div className='bgContainer'>
            <div className='overlay'>
                {/* <img src={bgImg} alt="Background" /> */}
                <div >
                    <h1>Welcome</h1>

                    <Link to='/pokemons'>
                        <button className='btn marginBot'>Catch'em all!</button>
                        {/* <div className="img"></div> */}
                        <div
                            className='landImg'>
                            <img
                                src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/International_Pok%C3%A9mon_logo.svg/2560px-International_Pok%C3%A9mon_logo.svg.png"
                                alt="Pokémon">
                            </img>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    )
}