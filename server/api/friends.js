const router = require('express').Router();
const {User, Contact, Friend} = require('../db');
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

router.post('/authenticated', authRequired, async (req, res, next) => {
  try {
    console.log(req.body);
    const singleFriend = await Friend.create(req.body);
    await singleFriend.setUser(req.body.user.id);

    res.send({
      loggedIn: true,
      message: 'Successfully Logged In',
      singleFriend,
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
