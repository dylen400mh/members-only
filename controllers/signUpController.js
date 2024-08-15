const db = require("../db/queries.js");
const bcrypt = require("bcryptjs");
const { body, validationResult } = require("express-validator");
const validateUser = [
  body("firstName")
    .trim()
    .isLength({ min: 1 })
    .withMessage("First name required."),
  body("lastName")
    .trim()
    .isLength({ min: 1 })
    .withMessage("Last name required."),
  body("username")
    .trim()
    .isLength({ min: 1 })
    .withMessage("Username required."),
  body("password")
    .trim()
    .isLength({ min: 1 })
    .withMessage("Password required."),
  body("confirm")
    .custom((value, { req }) => value === req.body.password)
    .withMessage("Passwords do not match."),
];

exports.signUpGet = (req, res) => {
  console.log("rendering");
  res.render("sign-up-form");
};
exports.signUpPost = [
  validateUser,
  async (req, res, next) => {
    // form validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render("sign-up-form", {
        errors: errors.array(),
      });
    }

    bcrypt.hash(req.body.password, 10, async (err, hashedPassword) => {
      if (err) {
        return next(err);
      }
      try {
        await db.insertUser(
          req.body.firstName,
          req.body.lastName,
          req.body.username,
          hashedPassword,
          "Guest"
        );
        res.redirect("/log-in");
      } catch (err) {
        return next(err);
      }
    });
  },
];
