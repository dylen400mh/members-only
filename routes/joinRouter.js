const { Router } = require("express");
const joinController = require("../controllers/joinController");
const joinRouter = Router();

joinRouter.get("/", joinController.joinGet);
joinRouter.post("/", joinController.joinPost);

module.exports = joinRouter;
