// const sessionIdToUserMap = new Map();

const jwt = require("jsonwebtoken");
const secret = "mysecretss";

function setUser(user) {
  // sessionIdToUserMap.set(id, user);
  const payload = {
    id: user._id,
    email: user.email,
  };
  const token = jwt.sign(payload, secret);
  return token;
}

function getUser(token) {
  // return sessionIdToUserMap.get(id);
  if (!token) return null;
  try {
    return jwt.verify(token, secret);
  } catch (err) {
    return null;
  }
}

module.exports = { setUser, getUser };
