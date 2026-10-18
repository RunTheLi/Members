// app.js
require("dotenv").config();

const authRouter = require("./routes/authRouter");
const indexRouter = require("./routes/indexRouter");
const session = require("express-session");
const passport = require("./config/passport");
const messageRouter = require("./routes/messageRouter");


const express = require("express");
const path = require("node:path");

const app = express();

const PORT = process.env.PORT || 3000;

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use("/", indexRouter);
app.use("/", authRouter);
app.use("/", messageRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

console.log(
  app.router.stack
    .filter((layer) => layer.route)
    .map((layer) => layer.route.path)
);