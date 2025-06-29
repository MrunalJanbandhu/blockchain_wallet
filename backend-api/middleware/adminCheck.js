// middleware/adminCheck.js
require("dotenv").config();

module.exports = function adminCheck(req, res, next) {
  const caller = req.headers["x-wallet-address"]?.toLowerCase();
  const admin = process.env.ADMIN_WALLET?.toLowerCase();

  if (!caller) {
    return res.status(400).json({ error: "Missing x-wallet-address header" });
  }

  if (caller !== admin) {
    return res.status(403).json({ error: "Forbidden: Admins only" });
  }

  next();
};
