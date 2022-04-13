import { Route, Switch, Redirect } from 'react-router-dom';
import './App.css';
import Types from './components/Types/Types';
import Pokemons from './components/Pokemons/Pokemons';
import PokemonDetail from './components/PokemonDetail/PokemonDetail';
import LandingPage from './components/LandingPage/LandingPage';
import Nav from './components/Nav/Nav';
import FiltersBar from './components/FiltersBar/FiltersBar';
import CreateBar from './components/CreateBar/CreateBar';
import ErrorPokemon404 from './components/ErrorPokemon404/ErrorPokemon404';
import notFound from './components/notFound/notFound';
import createPokemonWrapper from './components/CreatePokemon/CreatePokemonWrapper.jsx';
// import background from './img/bgapp.png'

function App() {
  return (
    <div className="App background">
      <Route exact path="/" component={LandingPage} />
      <Route path="/:any" component={Nav} />
      <Route exact path="/:any" component={FiltersBar} />
      <Route exact path="/:any" component={CreateBar} />
      <Switch>
        <Route exact path="/pokemons" component={Pokemons} />
        <Route exact path="/types" component={Types} />
        <Route exact path="/pokemon/create" component={createPokemonWrapper} />
        <Route exact path="/pokemons/:pokemonId" component={PokemonDetail} />
        <Route exact path="/error/404" component={ErrorPokemon404} />
        <Route exact path="/404notFound" component={notFound} />
        <Route path="/:any" ><Redirect to="/404notFound" /> </Route>
      </Switch>
    </div>
  );
}

export default App;
