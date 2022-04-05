const { Router } = require('express');
// const express = require('express'); // esto no estaba
const model = require("../modelFunctions/model");
// const { Pokemon } = require("../models/Pokemon");
// const { Type } = require("../models/Type");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

// const router = Router(); //ESTO ESTABA ANTES, PREGUNTAR A LOS PIBES
var router = Router();
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

//MIDDLEWARES
// router.use(express.json())

// POKEMONS
//   /// GET

router.get("/pokemons/:idPokemon", async (req, res) => {
    var {idPokemon} = req.params
    var result = (await model.getPokemon(idPokemon))
    res.json(result)
})

router.get("/pokemons", async (req, res) => {
    var {name} = req.query
    if (name) { res.json(await model.getPokemon(name)) }
    else {
        res.json(await model.getAllPokemon())
    }
})
//   /// POST

router.post("/pokemons", async (req, res) => {
    var { name, hp, strength, defence, speed, height, weight, types } = req.body;
    res.json(await model.createPokemon(name, hp, strength, defence, speed, height, weight, types))
})

// TYPE
//   /// GET
router.get("/types", async (req, res) => {
    res.json(await model.getTypes())
})

module.exports = router;
