const Channel = require("../models/Channel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const register = async (req, res, next) => {
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

const login = async (req, res, next) => {
  const nameOrEmail = req.body.email;
  try {
    const channel = await Channel.findOne({
      $or: [{ email: nameOrEmail }, { name: nameOrEmail }],
    });

    if (!channel) return res.status(404).json("Channel not found!");

    const checkedPassword = await bcrypt.compare(
      req.body.password,
      channel.password
    );
    if (!checkedPassword)
      return res.status(400).json("Wrong password or channel name!");

    const accessToken = jwt.sign({ id: channel._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    const tempChannel = {
      id: channel._id,
      name: channel.name,
      profile: channel.profile,
    };

    res
      .cookie("accessToken", accessToken, {
        maxAge: 7 * 24 * 60 * 60 * 1000, // expires in 7 days and will be automatically deleted from the browser
        httpOnly: true,
        secure: true,
        sameSite: "strict",
      })
      .status(200)
      .json(tempChannel);
  } catch (err) {
    next(err);
  }
};

module.exports = { register, login };
