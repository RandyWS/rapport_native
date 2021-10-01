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

router.get('/authenticated/:friendId', authRequired, async (req, res, next) => {
  try {
    const singleFriend = await Friend.findByPk(req.params.friendId);

    res.send({
      singleFriend,
    });
  } catch (error) {
    next(error);
  }
});

router.post('/', authRequired, async (req, res, next) => {
  try {
    if (req.userId) {
      const newFriend = await Friend.create({userId: req.userId, ...req.body});

      res.status(200).send({
        newFriend,
      });
    }
  } catch (error) {
    next(error);
  }
});
