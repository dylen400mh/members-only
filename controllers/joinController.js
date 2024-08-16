const db = require("../db/queries");
const { body, validationResult } = require("express-validator");

const validatePasscode = [
  body("passcode")
    .custom((value) => value === "TOP")
    .withMessage("Incorrect passcode."),
];
exports.joinGet = (req, res) => {
  res.render("join-form");
};

exports.joinPost = [
  validatePasscode,
  async (req, res, next) => {
    // form validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render("join-form", {
        errors: errors.array(),
      });
    }

    const { id, firstname, lastname, username, password } = req.user;
    try {
      await db.updateUser(
        id,
        firstname,
        lastname,
        username,
        password,
        "Member"
      );
      res.redirect("/");
    } catch (err) {
      return next(err);
    }
  },
];
