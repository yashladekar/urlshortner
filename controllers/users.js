const User = require("../models/users");
const { v4: uuidv4 } = require("uuid");
const { setUser } = require("../services/auth");

async function handleSignup(req, res) {
  const { email, password, name } = req.body;
  if (!email || !password || !name) {
    return res.status(400).json({ message: "All fields are required" });
  }
  const user = await User.create({
    email: email,
    password: password,
    name: name,
  });

  return res.status(201).json({ user });
}

async function handleLogin(req, res) {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }
  const user = await User.findOne({ email: email, password: password });
  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" });
  }
  // const sessionId = uuidv4();
  // setUser(sessionId, user);
  const token = setUser(user);
  res.cookie("uid", token);
  return res.status(200).json({ user });
}

module.exports = { handleSignup, handleLogin };
