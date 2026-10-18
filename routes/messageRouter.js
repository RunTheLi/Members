//routes/messageRouter.js

const { Router } = require("express");
const { requireAuth } = require("../middleware/authMiddleware");
const { createMessage, deleteMessage, } = require("../db/queries");

const messageRouter = Router();

messageRouter.get("/new-message", requireAuth, (req, res) => {
  res.render("new-message");
});

messageRouter.post("/new-message", requireAuth, async (req, res, next) => {
  try {
    await createMessage({
      title: req.body.title,
      text: req.body.text,
      userId: req.user.id,
    });

    res.redirect("/");
  } catch (err) {
    next(err);
  }
});

messageRouter.post(
  "/messages/:id/delete",
  requireAuth,
  async (req, res, next) => {
    try {
      if (!req.user.is_admin) {
        return res.sendStatus(403);
      }

      await deleteMessage(req.params.id);

      res.redirect("/");
    } catch (err) {
      next(err);
    }
  }
);

module.exports = messageRouter;

