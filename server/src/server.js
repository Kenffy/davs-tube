import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import { mongoConnection } from "./utils/dbConfig.js";

import authRoutes from "./routes/auth.js";
import channelRoutes from "./routes/channels.js";
import videoRoutes from "./routes/videos.js";
import commentRoutes from "./routes/comments.js";

const app = express();
dotenv.config();
app.use(cors({ origin: process.env.CLIENT_URL }));

const PORT = process.env.SERVER_PORT || 5001;

//middlewares
app.use(cookieParser());
app.use(express.json());

// routes
app.use("/api/auth", authRoutes);
app.use("/api/channels", authRoutes);
app.use("/api/videos", authRoutes);
app.use("/api/comments", authRoutes);

app.listen(PORT, () => {
  mongoConnection();
  console.log("Server is listening on port: " + PORT);
});
