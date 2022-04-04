const { Router } = require('express'); 
const express = require('express'); // esto no estaba
const model = require("../modelFunctions/model");
const { Pokemon } = require("../models/Pokemon");
const { Type } = require("../models/Type");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

// const router = Router(); //ESTO ESTABA ANTES, PREGUNTAR A LOS PIBES
var router = express();
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

//MIDDLEWARES
router.use(express.json())

// POKEMONS
router.get("/pokemons", async (req, res) => {
    res.json(await model.getSummaryApiPokemon())
})

module.exports = router;
