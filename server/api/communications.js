const router = require('express').Router();
const {User, Communication, Friend} = require('../db');
const jwt = require('jsonwebtoken');

// This is middleware that checks the JWT token in the cookie to see if it's valid
// if it is, we call next(), otherwise we send a 401 Unauthorized
const secret = process.env.JWT;

const authRequired = (req, res, next) => {
  // We grab the token from the cookies
  const token = req.signedCookies.token;
  // jwt verify throws an exception when the token isn't valid
  try {
    jwt.verify(token, secret);
  } catch (error) {
    res.status(401).send({
      loggedIn: false,
      message: 'Unauthorized',
    });
    return;
  }
  next();
};

router.post('/authenticated', authRequired, async (req, res, next) => {
  try {
    const singleCommunication = await Communication.create(req.body);
    await singleCommunication.setUser(req.body.user.id);
    await singleCommunication.setFriend(req.body.friend);

    res.send({
      loggedIn: true,
      message: 'Successfully Logged In',
      singleCommunication,
    });
  } catch (error) {
    if (error.username === 'SequelizeUniqueConstraintError') {
      res.status(401).send('User already exists');
    }

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

module.exports = router;
