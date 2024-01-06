import Channel from "../models/Channel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req, res, next) => {
  try {
    const hashPassword = bcrypt.hashSync(
      req.body.password,
      bcrypt.genSaltSync(10)
    );
    const tmpChannel = new Channel({ ...req.body, password: hashPassword });
    await tmpChannel.save();
    res.status(200).send("Channel has been created!");
  } catch (err) {
    next(err);
  }
};

export const login = async (req, res, next) => {
  try {
    const channel = await Channel.findOne({
      email: req.body.email,
    });
    if (!channel) return res.status(404).json("Channel not found!");

    const checkedPassword = await bcrypt.compare(
      req.body.password,
      channel.password
    );
    if (!checkedPassword)
      return res.status(400).json("Wrong password or channel name!");

    const accessToken = jwt.sign({ id: channel._id }, process.env.JWT_SECRET, {
      expiresIn: "2m",
    });

    const tempChannel = {
      id: channel._id,
      name: channel.name,
      profile: channel.profile,
    };

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
    });

    res.status(200).json(tempChannel);
  } catch (err) {
    next(err);
  }
};
