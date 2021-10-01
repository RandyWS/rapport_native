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
      console.log('req body', req.body);
      const newCommunication = await Communication.create({
        userId: req.userId,
        friendId: 8,
        ...req.body,
      });
      console.log('nnew communication', newCommunication);
      res.status(200).send({
        newCommunication,
      });
    }
  } catch (error) {
    next(error);
  }
});

router.get(
  '/authenticated/byUserId/:userId',
  authRequired,
  async (req, res, next) => {
    try {
      const communications = await Communication.findAll({
        where: {
          userId: req.params.userId,
        },
      });

      res.send({
        communications,
      });
    } catch (error) {
      next(error);
    }
  },
);

router.get(
  '/authenticated/byCommunicationId/:communicationId',
  authRequired,
  async (req, res, next) => {
    try {
      const singleCommunication = await Communication.findByPk(
        req.params.communicationId,
        {
          include: {
            model: Friend,
          },
        },
      );

      res.send({
        singleCommunication,
      });
    } catch (error) {
      next(error);
    }
  },
);
