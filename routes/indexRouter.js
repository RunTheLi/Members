// routes/indexRouter.js
const { Router } = require("express");
const { getAllMessages } = require("../db/queries");

const indexRouter = Router();

indexRouter.get("/", async (req, res, next) => {
  try {
    const messages = await getAllMessages();

    console.log("Logged-in user:", req.user);
    
    res.render("index", { messages });
  } catch (err) {
    next(err);
  }
});



module.exports = indexRouter;
