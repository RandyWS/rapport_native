const db = require('./database');
const User = require('./User');
const Friend = require('./Friend');
const Communication = require('./Communication');
const Recurring_Pattern = require('./Recurring_Pattern');
const Recurring_Type = require('./Recurring_Type');

User.hasMany(Friend, {foreignKey: 'userId'});
Friend.belongsTo(User, {foreignKey: 'userId'});

User.hasMany(Communication, {foreignKey: 'userId'});
Communication.belongsTo(User, {foreignKey: 'userId'});

Friend.hasMany(Communication, {foreignKey: 'friendId'});
Communication.belongsTo(Friend, {foreignKey: 'friendId'});

Communication.hasOne(Recurring_Pattern, {foreignKey: 'commId'});
Recurring_Pattern.belongsTo(Communication, {foreignKey: 'commId'});

Recurring_Type.hasMany(Recurring_Pattern, {foreignKey: 'recurring_type_id'});
Recurring_Pattern.belongsTo(Recurring_Type, {foreignKey: 'recurring_type_id'});

module.exports = {
  db,
  User,
  Friend,
  Communication,
  Recurring_Pattern,
  Recurring_Type,
};
