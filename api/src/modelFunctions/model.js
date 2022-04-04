const axios = require('axios');
const bodyParser = require('body-parser');
const { Pokemon, Type } = require("../db");


module.exports = { // Instructor hace todo por front, SE TRAE todo desde el back, con esto
    //////// Funciones auxiliares /////////
    getTypeId: (url) => {
        var arr = url.split("/");
        var id = Number(arr[arr.length - 2])
        return id
        // "https://pokeapi.co/api/v2/type/12/", -> 12
        // "https://pokeapi.co/api/v2/type/4/" -> 4
    },

    onlyNameUrl: async () => {
        // console.log("entra")
        var fullPokeArray = await axios.get('https://pokeapi.co/api/v2/pokemon')
        // console.log("busco ", fullPokeArray.data.results)
        return (fullPokeArray.data.results)
    },

    getSummaryApiPokemon: async () => {
        // var nameUrls = await this.onlyNameUrl() //// NO ME RECONOCE LA FUNCION NO SE PQ
        var fullPokeArray = await axios.get('https://pokeapi.co/api/v2/pokemon')
        // console.log("busco ", fullPokeArray.data.results)
        var nameUrls = (fullPokeArray.data.results)
        var pokeDetails = await Promise.all(
            nameUrls.map(async e => {  // creo q await no servia con maps
                var pokemonInfo = await axios.get(e.url);
                // console.log("POKEMON INFO ", pokemonInfo)
                return {
                    id: pokemonInfo.data.id,
                    name: pokemonInfo.data.name,
                    img: pokemonInfo.data.sprites.other["official-artwork"].front_default,
                    types: pokemonInfo.data.types.map(iType => {
                        var arr = iType.type.url.split("/");
                        var id = Number(arr[arr.length - 2])
                        return {
                            name: iType.type.name,
                            id: id
                        }
                    })
                }
            }))
        return pokeDetails
    },
    /*
        .types []
        0: {
            slot: int
            type:{
                name: "----"
                url: "------"
                }
            } 
    */

    getFullApiPokemon: async () => {
        var fullPokeArray = await axios.get('https://pokeapi.co/api/v2/pokemon')
        var pokeDetails = fullPokeArray.map(async e => {
            var pokemonInfo = await axios.get(e.url);
            return {
                id: pokemonInfo.id,
                name: pokemonInfo.name,
                hp: pokemonInfo.stats[0].base_stat,
                strength: pokemonInfo.stats[1].base_stat,
                defence: pokemonInfo.stats[2].base_stat,
                speed: pokemonInfo.stats[5].base_stat,
                height: pokemonInfo.height,
                weight: pokemonInfo.weight,
                img: pokemonInfo.sprites.other.official - artwork.front_default,
                types: pokemonInfo.types.map(type => {
                    return {
                        name: type.name,
                        id: this.getTypeId(type.url)
                    }
                })
            }
        })
        return pokeDetails
    },

    getDbPokemon: async () => { // Para traerme los de la base de datos
        return await Pokemon.findAll({
            include: {
                model: Type,
                attributes: ['name'],
                through: {
                    attributes: [],
                },
            }
        })
    },

    getAllPokemon: async () => {
        const apiPokemon = await getApiPokemon();
        const dbPokemon = await getdbPokemon();
        const totalPokemon = apiPokemon.concat(dbPokemon)
        return totalPokemon
    },

    getPokemonByName: async (name) => { // Devuelve un pokemon de nombre pasado por query
        let allPokemon = await getAllPokemon()
        let wantedPokemon = allPokemon.filter(e => e.name.toLowerCase() === name.toLowerCase());
        return wantedPokemon
    },


}