const router = require("express").Router();
const { User, Friend, Contact } = require("../db");
const jwt = require("jsonwebtoken");

// This is middleware that checks the JWT token in the cookie to see if it's valid
// if it is, we call next(), otherwise we send a 401 Unauthorized
const secret = process.env.JWT;
const authRequired = (req, res, next) => {
  // We grab the token from the cookies
  const token = req.signedCookies.token;

  // jwt verify throws an exception when the token isn't valid
  try {
    console.log(jwt.verify(token, secret));
    jwt.verify(token, secret);

    req.username = jwt.verify(token, secret).username;
    next();
  } catch (error) {
    res.send({
      loggedIn: false,
      message: "Unauthorized",
    });
    // return;
  }
};

router.post("/login", async (req, res, next) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({
      where: {
        userName: username,
      },
    });

    // if the username exists
    if (user) {
      // and they inputted the correct password
      if (await user.correctPassword(password)) {
        // We sign a JWT and store it in a cookie on the response.
        // The browser will store it and send it back down
        res.cookie(
          "token",
          jwt.sign(
            {
              username,
            },
            secret
          ),
          {
            sameSite: "strict",
            httpOnly: true,
            signed: true,
          }
        );
        res.send({
          loggedIn: true,
          message: "Successfully Logged In",
        });
      } else {
        res.send({
          loggedIn: false,
          message: "Password may be incorrect",
        });
      }
    } else {
      res.send({
        loggedIn: false,
        message: "Username may not exist",
      });
    }
  } catch (error) {
    next(error);
  }
});

router.post("/signup", async (req, res, next) => {
  try {
    const { userName } = req.body;
    const user = await User.create(req.body);
    res.cookie(
      "token",
      jwt.sign(
        {
          userName,
        },
        secret
      ),
      {
        sameSite: "strict",
        httpOnly: true,
        signed: true,
      }
    );
    res.send({
      loggedIn: true,
      message: "Successfully Logged In",
      user,
    });
  } catch (error) {
    if (error.username === "SequelizeUniqueConstraintError") {
      res.status(401).send("User already exists");
    }

    next(error);
  }
});

// This logs the user out by clearing the token cookie
router.get("/logout", authRequired, (req, res, next) => {
  try {
    // We just clear the token cookie to log the user out.

    res.clearCookie("token", {
      sameSite: "strict",
      httpOnly: true,
      signed: true,
    });
    res.send({
      loggedIn: false,
      message: "Logged Out",
    });
  } catch (error) {
    next(error);
  }
});

// This is an authenticated route, it uses our authRequired Middleware
// You can't see this unless you are logged in
router.get("/authenticated", authRequired, async (req, res, next) => {
  try {
    res.send({
      loggedIn: true,
      message: "user is logged in",
    });
  } catch (error) {
    next(error);
  }
});

router.get("/authenticated/:username", authRequired, async (req, res, next) => {
  try {
    if (req.username !== req.params.username) {
      res.send({
        loggedIn: false,
        message: "Unauthorized",
      });
    }
    const user = await User.findOne({
      where: {
        userName: req.params.username,
      },
      include: [
        {
          model: Friend,
          include: [{ model: Contact }],
        },
      ],
    });

    res.send({
      user,
      loggedIn: true,
      message: "user is logged in",
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
