//controllers/authControllwe.js
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const { createUser, joinClub } = require("../db/queries");

function getSignUp(req, res) {
  res.render("sign-up", { errors: [] });
}

const validateSignUp = [
  body("firstName")
    .trim()
    .notEmpty()
    .withMessage("First name is required.")
    .isLength({ max: 100 })
    .withMessage("First name must be at most 100 characters."),

  body("lastName")
    .trim()
    .notEmpty()
    .withMessage("Last name is required.")
    .isLength({ max: 100 })
    .withMessage("Last name must be at most 100 characters."),

  body("username")
    .trim()
    .notEmpty()
    .withMessage("Username is required.")
    .isLength({ max: 100 })
    .withMessage("Username must be at most 100 characters."),

  body("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long."),

  body("confirmPassword")
    .custom((value, { req }) => value === req.body.password)
    .withMessage("Passwords do not match."),
];


async function postSignUp(req, res, next) {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).render("sign-up", {
      errors: errors.array(),
    });
  }

  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    await createUser({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      username: req.body.username,
      password: hashedPassword,
    });

    res.send("Account created successfully!");
  } catch (err) {
    if (err.code === "23505") {
      return res.status(400).render("sign-up", {
        errors: [{ msg: "Username is already taken." }],
      });
    }

    next(err);
  }
}

function getLogIn(req, res) {
  res.render("log-in", {
    errors: [],
  });
}

function getJoinClub(req, res) {
  res.render("join-club", { error: null });
}

async function postJoinClub(req, res) {
  const { passcode } = req.body;


  if (passcode !== process.env.CLUB_PASSCODE) {
    return res.status(400).render("join-club", {
      error: "Incorrect secret passcode. Please try again.",
    });
  }

  try {
    await joinClub(req.user.id);
    res.redirect("/");
  } catch (error) {
    next (error);
  }
}

module.exports = {
  getSignUp,
  validateSignUp,
  postSignUp,
  getLogIn,
  getJoinClub,
  postJoinClub
};