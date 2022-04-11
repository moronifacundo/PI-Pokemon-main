const { DataTypes } = require('sequelize');
// const { get } = require('../routes');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('pokemon', {
    id: {
      type: DataTypes.INTEGER,  // Voy a usar un id de solo un numero, pero va a empezar de 3000 para no pisar api (hay 898 id usados.)
      allowNull: false,
      primaryKey: true,
      // autoIncrement: true,
      // get() {
      //   return 'db' + this.getDataValue('ide');
      // }
      // set(value) {
      //   this.setDataValue('id', value + 3000);
      // }
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true, 
      set(value) {
        this.setDataValue('name', value.toLowerCase());
      }
    },
    hp: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    strength: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    defence: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    speed: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    height: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    weight: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    img: {
      type: DataTypes.STRING,
      allowNull: true
    }
  });
};
