const router = require('express').Router();
const {User, Friend, Communication} = require('../db');
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

router.get('/', authRequired, async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: {
        id: req.userId,
      },
      include: [
        {
          model: Friend,
          include: [{model: Communication}],
        },
      ],
    });

    if (user.id) {
      console.log('user sent');
      res.status(200).json(user);
    }
  } catch (error) {
    next(error);
  }
});
