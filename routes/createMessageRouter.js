const { Router } = require("express");
const createMessageController = require("../controllers/createMessageController");
const createMessageRouter = Router();

createMessageRouter.get("/", createMessageController.createMessageGet);
createMessageRouter.post("/", createMessageController.createMessagePost);

module.exports = createMessageRouter;
