const Sequelize = require('sequelize');
const db = require('./database');
const moment = require('moment');

const types = [
  'phone-call',
  'text',
  'in-person',
  'social-media',
  'email',
  'letter',
  'other',
  'future',
];

const Communication = db.define('communication', {
  title: {
    type: Sequelize.STRING,
  },
  content: {
    type: Sequelize.TEXT,
  },
  type: {
    type: Sequelize.STRING,
    validate: {
      isIn: [types],
    },
    defaultValue: 'future',
  },
  start: {
    type: Sequelize.DATE,
    allowNull: false,
  },
  end: {
    type: Sequelize.DATE,
    allowNull: false,
  },
  is_recurring: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
});

module.exports = Communication;
