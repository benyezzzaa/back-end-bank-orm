// models/client.js
const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Client = sequelize.define('clients', {


    cin: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
      },

  firstname: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  lastname: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  adress: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  
});

module.exports = Client;
