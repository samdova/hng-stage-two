// models/organisation.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Organisation = sequelize.define('Organisation', {
  orgId: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
  },
}, {
  timestamps: true,
});

module.exports = Organisation;
