const mongoose = require("mongoose");

async function connectDb(DbUrl) {
  return mongoose.connect(DbUrl);
}

module.exports = connectDb;
