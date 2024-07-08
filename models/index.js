// models/index.js
const User = require('./user');
const Organisation = require('./organization');

User.belongsToMany(Organisation, { through: 'UserOrganisations' });
Organisation.belongsToMany(User, { through: 'UserOrganisations' });

module.exports = { User, Organisation };
