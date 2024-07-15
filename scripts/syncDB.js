// scripts/syncDB.js
const { sequelize } = require('../config/database');
const Client = require('../models/client');
const ProspectClient = require('../models/ProspectClient');

const syncDB = async () => {
  await sequelize.sync({ force: true });
  console.log('Database synchronized');
};

syncDB();
