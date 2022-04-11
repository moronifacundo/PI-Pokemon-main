/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Pokemon, conn } = require('../../src/db.js');

const agent = session(app);
const pokemon = {
  name: 'Pikamon',
  id: 3000
};


describe("Pokemon routes", function() {
  this.timeout(20 * 1000); // seteo el timeout en 10 seg porque la api es lenta
  before(() =>
  conn.authenticate().catch((err) => {
    console.error("Unable to connect to the database:", err);
  })
  );
  beforeEach(() =>
  Pokemon.sync({ force: true }).then(() => Pokemon.create(pokemon))
  );
  describe("GET /pokemons", () => {
    it("should get 200", () => agent.get("/pokemons").expect(200));
  })

  describe("GET /pokemons/:pokemonID", () => {
    it("should get 200 when given a valid pokemonID", () => agent.get("/pokemons/25").expect(200));

    it("should get 404 when given a non valid pokemonID", () => agent.get("/pokemons/invalidPokemonID").expect(404));
  });
});



// describe('Pokemon routes', () => {
//   before(() => conn.authenticate()
//     .catch((err) => {
//       console.error('Unable to connect to the database:', err);
//     }));


//   // beforeEach(() => Pokemon.sync({ force: true })
//   //   .then(() => Pokemon.create(pokemon)));

//   describe('GET /pokemons', () => {
//     it('should get 200', (done) =>
//       agent.get('/pokemons').then(done()).expect(200)
//     );
//   });

//   // describe('GET /pokemons/:pokemonID', () => {
//   //   it('should get 200 if id exists', (done) =>
//   //     agent.get('/pokemons/25456654').then(done()).expect(200)
//   //   );
//   // });

//   // describe('GET /pokemons', () => {
//   //   it('should get 404 if id does not exist', (done) =>
//   //     agent.get('/pokemons/inexistentPokemon').then(done()).expect(404)
//   //   );
//   // });

//   describe("GET /recipes", () => {
//     it("should get 200 when sent a valid ID", () => agent.get("/pokemons/25").expect(200));
//   });

//   describe("GET /recipes", () => {
//     it("should get 200 when sent an invalid ID", () => agent.get("/pokemons/invalidID").expect(404));
//   });

// });
