const db = require("../db/queries.js");
const bcrypt = require("bcryptjs");

exports.signUpGet = (req, res) => {
  console.log("rendering");
  res.render("sign-up-form");
};
exports.signUpPost = async (req, res, next) => {
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
};
