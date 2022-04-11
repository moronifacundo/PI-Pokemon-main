import { Route } from 'react-router-dom';
import './App.css';
import Types from './components/Types/Types';
import Pokemons from './components/Pokemons/Pokemons';
import PokemonDetail from './components/PokemonDetail/PokemonDetail';
import LandingPage from './components/LandingPage/LandingPage';
import Nav from './components/Nav/Nav';
import CreatePokemon from './components/CreatePokemon/CreatePokemon';
import FiltersBar from './components/FiltersBar/FiltersBar';
import CreateBar from './components/CreateBar/CreateBar';

function App() {
  return (
    <div className="App">
      <Route exact path="/" component={LandingPage} />
      <Route path="/:any" component={Nav} />
      <Route exact path="/:any" component={FiltersBar} />
      <Route exact path="/:any" component={CreateBar} />
      <Route exact path="/pokemons" component={Pokemons} />
      <Route exact path="/types" component={Types} />
      <Route exact path="/pokemon/create" component={CreatePokemon} />
      <Route exact path="/pokemons/:pokemonId" component={PokemonDetail} />
    </div>
  );
}

export default App;
