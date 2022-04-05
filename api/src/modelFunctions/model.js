const axios = require('axios');
// const bodyParser = require('body-parser');
const { Pokemon, Type, Pokemon_Type } = require("../db");
var pokeID = 1;

module.exports = { // Instructor hace todo por front, SE TRAE todo desde el back, con esto

    getSummaryApiPokemon: async function () {
        var nameUrls = (await axios.get('https://pokeapi.co/api/v2/pokemon')).data.results
        var pokeDetails = await Promise.all(
            nameUrls.map(async e => {  // await no servia con maps, tuve q usar promiseall
                var pokemonInfo = await axios.get(e.url);
                return {
                    id: pokemonInfo.data.id,
                    name: pokemonInfo.data.name,
                    img: pokemonInfo.data.sprites.other["official-artwork"].front_default,
                    types: pokemonInfo.data.types.map(iType => {
                        var id = this.getTypeIdFromURL(iType.type.url) // para obtener el id de types
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

    getDbPokemon: async function () { // Para traerme los de la base de datos
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

    getAllPokemon: async function () {
        const apiPokemon = await this.getSummaryApiPokemon();
        const dbPokemon = await this.getDbPokemon();
        const totalPokemon = apiPokemon.concat(dbPokemon)
        return totalPokemon
    },

    addTypesToDB: async function () { // AGREGA LOS TYPES A MI DB APENAS ALZO EL SERVER
        var typesArray = await axios.get('https://pokeapi.co/api/v2/type')
        typesArray.data.results.map(async t => {
            var type = await Type.create({
                name: t.name,
                id: this.getTypeIdFromURL(t.url)
            });
        })
    },

    createPokemon: async function (name, hp, strength, defence, speed, height, weight, types = ["normal"], id = pokeID) {
        pokeID++
        try {
            const newPokemon = await Pokemon.create({
                name,
                hp,
                strength,
                defence,
                speed,
                height,
                weight,
                id
            });
            types.map(async type => {
                const newType = await Type.findOne({
                    where: { name: type }
                })
                await newPokemon.addType(newType)
            })
        } catch (error) {
            return (error);
        }
        return ("Has creado a " + name)
    },

    getPokemon: async function (query) {
        // CASO BASE DE DATOS
        /////// SI ES ID
        if ((query * 0) === 0) { // si es un numero me da 0, sino me da NaN
            var querried = "de id número " + query
            var pokemon = await Pokemon.findOne({
                where: { id: query },
                include: {
                    model: Type,
                    attributes: ['name'],
                    through: {
                        attributes: [],
                    },
                }
            });
        }
        ///////SI ES NAME
        else {
            var querried = "de nombre " + query;
            query = query.toLowerCase()
            var pokemon = await Pokemon.findOne({
                where: { name: query },
                include: {
                    model: Type,
                    attributes: ['name'],
                    through: {
                        attributes: [],
                    },
                }
            });
        }
        if (pokemon) {
            return pokemon
        }
        // CASO API
        if (!pokemon) {
            try {
                pokemon = await axios.get(`https://pokeapi.co/api/v2/pokemon/${query}`);
            }
            catch (error) {
                return (`El pokemon ${querried} no existe`);
            }
            return (this.wantedPokeInfo(pokemon.data));
        }
    },

    getTypes: async function () {
        return await Type.findAll()
    },
    /// AUXILIARES

    getTypeIdFromURL: function (url) {
        var arr = url.split("/");
        var id = Number(arr[arr.length - 2]);
        return id;
        // "https://pokeapi.co/api/v2/type/12/", -> 12
        // "https://pokeapi.co/api/v2/type/4/" -> 4
    },

    wantedPokeInfo(pokeInfoData) {
        return {
            id: pokeInfoData.id,
            name: pokeInfoData.name,
            hp: pokeInfoData.stats[0].base_stat,
            strength: pokeInfoData.stats[1].base_stat,
            defence: pokeInfoData.stats[2].base_stat,
            speed: pokeInfoData.stats[5].base_stat,
            height: pokeInfoData.height,
            weight: pokeInfoData.weight,
            img: pokeInfoData.sprites.other["official-artwork"].front_default,
            types: pokeInfoData.types.map(iType => {
                return {
                    name: iType.type.name,
                    id: this.getTypeIdFromURL(iType.type.url)
                }
            })
        }
    }
}