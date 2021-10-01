const router = require('express').Router();
const {User, Communication, Friend} = require('../db');
const jwt = require('jsonwebtoken');
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

router.post('/', authRequired, async (req, res, next) => {
  try {
    if (req.userId) {
      const newCommunication = await Communication.create({
        userId: req.userId,
        friendId: 8,
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
