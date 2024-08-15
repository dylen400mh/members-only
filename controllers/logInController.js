const db = require("../db/queries.js");
const bcrypt = require("bcryptjs");
const { body, validationResult } = require("express-validator");
const LocalStrategy = require("passport-local").Strategy;
const passport = require("passport");

passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      console.log(username);
      const { rows } = await db.getUserByUsername(username);
      const user = rows[0];

      if (!user) {
        return done(null, false, { message: "Incorrect username" });
      }

      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        return done(null, false, { message: "Incorrect password" });
      }

      return done(null, user);
    } catch (err) {
      return done(err);
    }
  })
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const { rows } = await db.getUserById(id);
    console.log(rows);
    const user = rows[0];

    done(null, user);
  } catch (err) {
    done(err);
  }
});

const validateUser = [
  body("username")
    .trim()
    .isLength({ min: 1 })
    .withMessage("Username required."),
  body("password")
    .trim()
    .isLength({ min: 1 })
    .withMessage("Password required."),
];

exports.logInGet = (req, res) => {
  const error = req.session.messages || [];
  req.session.messages = [];
  res.render("login-form", { error });
};
exports.logInPost = [
  validateUser,
  async (req, res, next) => {
    // form validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render("login-form", {
        errors: errors.array(),
      });
    }

    // authenticate
    passport.authenticate("local", {
      successRedirect: "/",
      failureRedirect: "/log-in",
      failureMessage: true,
    })(req, res, next);
  },
];
