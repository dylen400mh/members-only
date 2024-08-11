const express = require("express");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const db = require("./db/pool");
const { body, validationResult } = require("express-validator");
const signUpRouter = require("./routes/signUpRouter");
const path = require("node:path");

const app = express();
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(session({ secret: "cats", resave: false, saveUninitialized: false }));
app.use(passport.session());
app.use(express.urlencoded({ extended: false }));
app.use("/sign-up", signUpRouter);

app.get("/", (req, res) => res.render("index"));

app.listen(3000, () => console.log("app listening on port 3000"));
