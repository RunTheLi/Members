//middleware/authMiddleware.js
function requireAuth(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }

  res.redirect("/log-in");
}

module.exports = {
  requireAuth,
};
