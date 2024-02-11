const { getUser } = require("../services/auth");
async function restrictToLoggedInOnly(req, res, next) {
  const userUid = req.cookies?.uid;
  if (!userUid) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  const user = getUser(userUid);
  if (!user) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  req.user = user;
  next();
}
module.exports = { restrictToLoggedInOnly };
