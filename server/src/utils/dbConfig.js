import mongoose from "mongoose";

export const mongoConnection = () => {
  mongoose
    .connect(process.env.DATABASE_URL)
    .then(() => {
      console.log("Connected to mongoDB");
    })
    .catch((err) => {
      throw err;
    });
};
