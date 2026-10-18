//routes/authRouter.js
const { Router } = require("express");
const passport = require("../config/passport");

const {
  getSignUp,
  validateSignUp,
  postSignUp,
  getLogIn,
  getJoinClub,
  postJoinClub,
} = require("../controllers/authController");

const { requireAuth } = require("../middleware/authMiddleware");

// 1. ประกาศ authRouter ก่อน
const authRouter = Router();

// 2. จากนั้นค่อยกำหนด routes
authRouter.get("/sign-up", getSignUp);
authRouter.post("/sign-up", validateSignUp, postSignUp);

authRouter.get("/log-in", getLogIn);

authRouter.post(
  "/log-in",
  passport.authenticate("local", { failureRedirect: "/log-in" }),
  (req, res) => res.redirect("/")
);

authRouter.post("/log-out", (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);
    res.redirect("/");
  });
});

authRouter.get("/join-club", requireAuth, getJoinClub);
authRouter.post("/join-club", requireAuth, postJoinClub);

// 3. Export หลังจากกำหนด routes
module.exports = authRouter;
