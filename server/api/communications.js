const router = require('express').Router();
const Sequelize = require('sequelize');
const {User, Communication, Friend, Recurring_Pattern} = require('../db');
const jwt = require('jsonwebtoken');
const moment = require('moment');
module.exports = router;

const secret = process.env.JWT;

const authRequired = async (req, res, next) => {
  const token = req.headers.authorization;

  try {
    const {id} = await jwt.verify(token, secret);
    req.userId = id;
  } catch (error) {
    res.status(401).send({
      loggedIn: false,
      message: 'Unauthorized',
    });
    return;
  }
  next();
};

router.get('/', authRequired, async (req, res, next) => {
  try {
    if (req.userId) {
      const comm = await Communication.findAll({
        where: {
          userId: req.userId,
          is_recurring: false,
        },
      });

      if (comm.length) {
        res.status(200).json(comm);
      }
    }
  } catch (error) {
    next(error);
  }
});

router.get('/recurring', authRequired, async (req, res, next) => {
  try {
    if (req.userId) {
      const comm = await Communication.findAll({
        where: {
          userId: req.userId,
          is_recurring: true,
        },
        include: {
          model: Recurring_Pattern,
        },
      });

      // if (comm.length) {
      //   res.status(200).json(comm);
      // }
    }
  } catch (error) {
    next(error);
  }
});

router.post('/', authRequired, async (req, res, next) => {
  try {
    if (req.userId) {
      const newCommunication = await Communication.create({
        userId: req.userId,
        friendId: req.body.friendId,
        ...req.body,
      });

      res.status(200).send({
        newCommunication,
      });
    }
  } catch (error) {
    next(error);
  }
});

router.post('/recurring/:friendId', authRequired, async (req, res, next) => {
  try {
    console.log('rew time', req.body.time);
    if (req.userId) {
      // gets the next closest date
      function nextDay(x) {
        let now = moment(req.body.time);
        if (moment().isoWeekday() <= x) {
          return moment(now).isoWeekday(x);
        } else {
          return moment(now).add(1, 'weeks').isoWeekday(x);
        }
      }

      const startDate = nextDay(req.body.weekDay);
      const endDate = startDate.clone().add(1, 'hours');

      const newCommunication = await Communication.create({
        userId: req.userId,
        friendId: req.params.friendId,
        is_recurring: true,
        title: `contact ${req.body.friend}`,
        type: 'future',
        start: startDate,
        end: endDate,
      });

      let recurringType = req.body.frequency;
      let separation_count = 0;
      if (recurringType === 'daily') {
        recurringType = 1;
      } else if (recurringType === 'weekly') {
        recurringType = 2;
      } else if (recurringType === 'bi-weekly') {
        recurringType = 2;
        separation_count = 1;
      } else {
        recurringType = 3;
      }

      let recurring;
      if (req.body.week) {
        recurring = await Recurring_Pattern.create({
          commId: newCommunication.id,
          recurring_type_id: recurringType,
          separation_count,
          day_of_week: req.body.weekDay,
          week_of_month: req.body.week,
        });
      } else {
        recurring = await Recurring_Pattern.create({
          commId: newCommunication.id,
          recurring_type_id: recurringType,
          separation_count,
          day_of_week: req.body.weekDay,
        });
      }

      res.status(200).send({
        newCommunication,
        recurring,
      });
    }
  } catch (error) {
    next(error);
  }
});

router.get('/:commId', authRequired, async (req, res, next) => {
  try {
    if (req.userId) {
      const comm = await Communication.findOne({
        where: {
          userId: req.userId,
          id: req.params.commId,
        },
      });

      if (comm.id) {
        res.status(200).json(comm);
      }
    }
  } catch (error) {
    next(error);
  }
});

router.delete('/:commId', authRequired, async (req, res, next) => {
  try {
    if (req.userId) {
      const deleteCount = await Communication.destroy({
        where: {userId: req.userId, id: req.params.commId},
      });
      res.status(200).json(deleteCount);
    }
  } catch (err) {
    next(err);
  }
});
