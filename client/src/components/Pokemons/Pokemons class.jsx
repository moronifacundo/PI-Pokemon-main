import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getAllPokemons } from '../../redux/actions';
// import { deletePokemon } from '../../redux/actions';
import PokemonCard from '../PokemonCard/PokemonCard';
import './Pokemons.css'


export class Pokemons extends Component {

    componentDidMount() {
        this.props.getAllPokemons()
    }

    render() {
        return (
            <div>
                <h1>Pokemons</h1>
                <div className='pokemons'>
                    {/* <img src={img} alt="main-img" /> yo se que esto no carga la img, pero el test no anda con la otra ruta */}
                    {/* <h3>Pokemons</h3> */}
                    {/* Aqui tienes que escribir tu codigo para mostrar la lista de peliculas */
                        this.props.pokemons?.map(p => {
                            return (
                                <PokemonCard
                                    key={p.id}
                                    id={p.id}
                                    name={p.name}
                                    img={p.img}
                                    types={p.types}
                                />
                            )
                        })
                    }
                </div>
            </div>
        );
    };
};

export const mapStateToProps = (state) => {
    return {
        pokemons: state.pokemons
    };
};

export const mapDispatchToProps = (dispatch) => {
    return {
        getAllPokemons: () => dispatch(getAllPokemons()),
    }
};


export default connect(mapStateToProps, mapDispatchToProps)(Pokemons);