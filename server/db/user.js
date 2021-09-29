const Sequelize = require('sequelize');
const db = require('./database');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const SALT_ROUNDS = 5;

const User = db.define('user', {
  userName: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
    validate: {
      notEmpty: true,
    },
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  firstName: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  lastName: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  email: {
    type: Sequelize.TEXT,
    allowNull: false,
    validate: {
      notEmpty: true,
      isUrl: true,
    },
  },
  imageUrl: {
    type: Sequelize.TEXT,
    defaultValue: 'https://static.thenounproject.com/png/1081856-200.png',
    allowNull: true,
    validate: {
      isUrl: true,
    },
  },
});

User.prototype.correctPassword = function (candidatePwd) {
  //we need to compare the plain version to an encrypted version of the password
  return bcrypt.compare(candidatePwd, this.password);
};

// User.prototype.generateToken = function () {
//   console.log(this.userName, process.env.JWT);
//   return jwt.sign({ username: this.userName }, secret);
// };

// User.authenticate = async function ({ username, password }) {
//   const user = await this.findOne({ where: { username } });
//   if (!user || !(await user.correctPassword(password))) {
//     const error = Error("Incorrect username/password");
//     error.status = 401;
//     throw error;
//   }
//   return user.generateToken();
// };

// User.findByToken = async function (token) {
//   try {
//     const { id } = await jwt.verify(token, process.env.JWT);
//     const user = User.findByPk(id);
//     if (!user) {
//       throw "nooo";
//     }
//     return user;
//   } catch (ex) {
//     const error = Error("bad token");
//     error.status = 401;
//     throw error;
//   }
// };

const hashPassword = async user => {
  //in case the password has been changed, we want to encrypt it with bcrypt
  if (user.changed('password')) {
    user.password = await bcrypt.hash(user.password, SALT_ROUNDS);
  }
};

// sets default value if image is empty string
User.beforeValidate((user, options) => {
  if (options.fields.includes('imageUrl')) {
    if (user.imageUrl === '') {
      user.imageUrl = 'https://static.thenounproject.com/png/1081856-200.png';
    }
  }
});

User.beforeCreate(async user => {
  try {
    user.password = await bcrypt.hash(user.password, SALT_ROUNDS);
  } catch (error) {
    console.log(error);
  }
});

module.exports = User;
