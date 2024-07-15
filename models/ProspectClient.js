// models/prospectClient.js
const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const ProspectClient = sequelize.define('ProspectClient', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  status: {
    type: DataTypes.STRING,
    defaultValue: 'pending',
  },
  reason: {
    type: DataTypes.STRING,
    allowNull: true,
  },
}, {
  timestamps: true,
});

module.exports = ProspectClient;
