const { Router } = require('express');
// const express = require('express'); // esto no estaba
const model = require("../modelFunctions/model");
// const { Pokemon } = require("../models/Pokemon");
const { Type } = require("../db");
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
    var { idPokemon } = req.params
    var result = (await model.getPokemon(idPokemon))
    // console.log(result.response.status) // me tira el codigo de error
    if (typeof result === "string") { res.status(404) }
    res.json(result)
})

router.get("/pokemons", async (req, res) => {
    var { name } = req.query
    if (name) { var result = await model.getPokemon(name) }
    else {
        // console.log("haciedno getallpok")
        return res.json(await model.getAllPokemon())
    }
    if (typeof result === "string") { res.status(404) }
    res.json(result)
})
//   /// POST
router.post("/pokemons", async (req, res) => {
    var { name, hp, strength, defence, speed, height, weight, img, types } = req.body;
    hp = Number(hp);
    strength = Number(strength);
    defence = Number(defence);
    speed = Number(speed);
    height = Number(height);
    weight = Number(weight);
    res.json(await model.createPokemon(name, hp, strength, defence, speed, height, weight, img, types))
})

// TYPE
//   /// GET
router.get("/types", async (req, res) => {
    res.json(await model.getTypes())
})

router.get("/types/:typesId", async (req, res) => {
    var { typesID } = req.params
    const type = await Type.findByPk(typesID)
    res.json(type)
})

module.exports = router;
