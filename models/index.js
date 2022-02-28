'use strict';
const path = require('path');
const Sequelize = require('sequelize');
const db = {};
console.log(__dirname);

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: process.cwd() +'/database.sqlite3',
  logging: false
});

// This doesn't work with packaging. But, we have at most 2 or 3 models. We can add them by hand.
const model = require(path.join(__dirname, '/region.js'))(sequelize, Sequelize.DataTypes);
db[model.name] = model;
  

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
