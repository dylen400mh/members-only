const db = require("../db/queries");

exports.deleteMessagePost = async (req, res, next) => {
  const id = req.params.id;
  try {
    await db.deleteMessage(id);
    res.redirect("/");
  } catch (err) {
    return next(err);
  }
};
