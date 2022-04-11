const { Pokemon, Type, conn } = require('../../src/db.js');
const { expect } = require('chai');

var testObj = {}
describe('Pokemon model', () => {
  before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    }));

  describe('Validators', () => {
    beforeEach(() => Pokemon.sync({ force: true }));
    // beforeEach(() => { testObj = Pokemon.create({ name: 'newPokemon' }) })

    describe('name', () => {

      it('should throw an error if name is null', (done) => {
        Pokemon.create({})
          .then(() => done(new Error('It requires a valid name')))
          .catch(() => done());
      });

      it('should work when its a valid name', () => {
        Pokemon.create({ name: 'Pikachu' });
      });

      // it('should throw an error if name already exists', (done) => {
      //   Pokemon.create({ name: 'repeatedPokemon' })
      //     .then(() => done(new Error('name already in use')))
      //     .catch(() => done());
      // });

    }); // .--NAME
    
    // describe('hp', () => {
    //   it('should have a property called hp', () => {
    //     expect(testObj).to.have.property('hp').that.is.an('integer').and.is.ok
    //   })
    // })
    // describe('id', () => {

    //   it('should be unique', (done) => {
    //     Pokemon.create({})
    //       .then(() => done(new Error('It requires a valid name')))
    //       .catch(() => done());
    //   });

    //   it('should work when its a valid name', () => {
    //     Pokemon.create({ name: 'Pikachu' });
    //   });
    // }); // .--ID

  }); /// .--VALIDATORS
}); /// .-- POKEMON

describe('Type model', () => {
  before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    }));
  describe('Validators', () => {
    beforeEach(() => Type.sync({ force: true }));
    describe('name', () => {
      it('should throw an error if name is null', (done) => {
        Type.create({})
          .then(() => done(new Error('It requires a valid name')))
          .catch(() => done());
      });
      it('should work when its a valid name', () => {
        Type.create({ name: 'poison' });
      });
    });
  });
});