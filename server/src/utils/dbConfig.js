const mongoose = require("mongoose");

const mongoConnection = () => {
  mongoose
    .connect(process.env.DATABASE_URL)
    .then(() => {
      console.log("Connected to mongoDB");
    })
    .catch((err) => {
      throw err;
    });
};

module.exports = mongoConnection;
