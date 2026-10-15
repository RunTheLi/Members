//routes/authRouter.js

const { Router } = require("express");
const passport = require("../config/passport");

const {
  getSignUp,
  validateSignUp,
  postSignUp,
  getLogIn,
} = require("../controllers/authController");

const authRouter = Router();

authRouter.get("/sign-up", getSignUp);
authRouter.post("/sign-up", validateSignUp, postSignUp);

authRouter.get("/log-in", getLogIn);

authRouter.post(
  "/log-in",
  passport.authenticate("local", {
    failureRedirect: "/log-in",
  }),
  (req, res) => {
    res.redirect("/");
  }
);

module.exports = authRouter;
