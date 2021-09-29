const db = require('./database');
const User = require('./user');
const Friend = require('./friend');
const Communication = require('./communication');

User.hasMany(Friend, {foreignKey: 'userId'});
Friend.belongsTo(User, {foreignKey: 'userId'});

User.hasMany(Communication, {foreignKey: 'userId'});
Communication.belongsTo(User, {foreignKey: 'userId'});

Friend.hasMany(Communication, {foreignKey: 'friendId'});
Communication.belongsTo(Friend, {foreignKey: 'friendId'});

module.exports = {
  db,
  User,
  Friend,
  Communication,
};
