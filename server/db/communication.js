const Sequelize = require('sequelize');
const db = require('./database');

const types = [
  'phone-call',
  'text',
  'in-person',
  'social-media',
  'email',
  'letter',
  'other',
];

const Communication = db.define('communication', {
  title: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  content: {
    type: Sequelize.TEXT,
  },
  type: {
    type: Sequelize.STRING,
    validate: {
      isIn: [types],
    },
  },
  date: {
    type: Sequelize.DATE,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
});

module.exports = Communication;
