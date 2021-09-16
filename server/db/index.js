const db = require("./database");
const User = require("./user");
const Friend = require("./friend");
const Contact = require("./contact");

User.hasMany(Friend);
Friend.belongsTo(User);

User.hasMany(Contact);
Friend.hasMany(Contact);

Contact.belongsTo(Friend);
Contact.belongsTo(User);

module.exports = {
  db,
  User,
  Friend,
  Contact,
};
