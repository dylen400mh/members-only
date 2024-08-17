const db = require("../db/queries");
const { body, validationResult } = require("express-validator");

const validateMessage = [
  body("title").trim().isLength({ min: 1 }).withMessage("Title required."),
  body("text").trim().isLength({ min: 1 }).withMessage("Message  required."),
];

exports.createMessageGet = (req, res) => {
  res.render("create-message");
};

exports.createMessagePost = [
  validateMessage,
  async (req, res, next) => {
    // form validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render("create-message", {
        errors: errors.array(),
      });
    }

    const userid = req.user.id;
    const { title, text } = req.body;
    try {
      await db.createMessage(userid, title, text);
      res.redirect("/");
    } catch (err) {
      return next(err);
    }
  },
];
