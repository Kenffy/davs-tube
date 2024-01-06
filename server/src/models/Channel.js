import mongoose from "mongoose";

const ChannelSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    profile: {
      type: String,
    },
    desc: {
      type: String,
    },
    subscribers: {
      type: [String],
    },
    subscriptions: {
      type: [String],
    },
    videos: {
      type: [String],
    },
  },
  { timestamps: true }
);

export default mongoose.model("Channel", ChannelSchema);
