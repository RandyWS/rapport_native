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
    defaultValue: 'other',
  },
  date: {
    type: Sequelize.DATEONLY,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
    defaultValue: Sequelize.NOW,
  },
  start: {
    type: Sequelize.DATE,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
    defaultValue: Sequelize.NOW,
  },
  end: {
    type: Sequelize.DATE,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
    defaultValue: Sequelize.NOW,
  },
});

module.exports = Communication;
