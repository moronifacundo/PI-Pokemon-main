const axios = require('axios');
// const bodyParser = require('body-parser');
const { Pokemon, Type } = require("../db");
var pokeID = 1;

module.exports = { // Instructor hace todo por front, SE TRAE todo desde el back, con esto

    getSummaryApiPokemon: async function () {
        var nameUrls = (await axios.get('https://pokeapi.co/api/v2/pokemon?limit=4')).data.results
        var pokeDetails = await Promise.all(
            nameUrls.map(async e => {  // await no servia con maps, tuve q usar promiseall
                try {

                    var pokemonInfo = await axios.get(e.url);
                    console.log("la url de ", e.name, "es ", e.url)
                    var ob = { ///// PRUEBA
                        // return {   //final
                        id: pokemonInfo.data.id,
                        name: pokemonInfo.data.name,
                        img: pokemonInfo.data.sprites.other["official-artwork"].front_default,
                        types: pokemonInfo.data.types.map(iType => {
                            // var id = this.getTypeIdFromURL(iType.type.url) // para obtener el id de types
                            return {
                                name: iType.type.name,
                                // id: id
                            }
                        })
                    }
                    console.log(ob); return (ob)   ///// PRUEBA
                } catch (error) {
                    return { ///// PRUEBA
                        // return {   //final
                        id: Math.random,
                        name: "no lo agarra",
                        img: "",
                        types: ["fire"]
                    }
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
        console.log("entro a buscar a la db")
        return await Pokemon.findAll({
            include: {
                model: Type,
                attributes: ['name', 'id'],
                through: {
                    attributes: [],
                },
            }
        })
    },

    getAllPokemon: async function () {
        const apiPokemon = await this.getSummaryApiPokemon();
        console.log("trajo de la api")
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
        var types = await Type.findAll();
        return types
    },

    deletePokemon: async function (id) {
        var removedPokemon = await Pokemon.findOne({
            where: { id: id },
        })
        removedPokemon.destroy()
    },
    /// AUXILIARES

    getTypeIdFromURL: function (url) {
        var arr = url.split("/");
        var id = Number(arr[arr.length - 2]);
        return id;
        // "https://pokeapi.co/api/v2/type/12/", -> 12
        // "https://pokeapi.co/api/v2/type/4/" -> 4
    },

    createPokemon: async function (name, hp, strength, defence, speed, height, weight, img, types, id = pokeID) {
        console.log("agregando a base de datos " + name)
        if (img === "") { img = "https://i.imgur.com/DfaZPXl.png" }
        pokeID++
        try {
            const [newPokemon, created] = await Pokemon.findOrCreate({
                where: { name: name },
                defaults: {
                    hp,
                    strength,
                    defence,
                    speed,
                    height,
                    weight,
                    img,
                    id
                }
            });
            if (created) {
                types?.map(async type => {
                    console.log("adding type " + type)
                    const newType = await Type.findOne({
                        where: { name: type }
                    })
                    await newPokemon.addType(newType)
                })
                return ("You've created " + name)
            }
        } catch (error) {
            return (error);
        }
        return (name + " already exists. Try a different name")
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