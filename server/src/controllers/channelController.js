const Channel = require("../models/Channel");

const updateChannel = async (req, res, next) => {
  if (req.params.id === req.Channel.id) {
    try {
      const updatedChannel = await Channel.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true }
      );
      res.status(200).json(updatedChannel);
    } catch (err) {
      next(err);
    }
  } else {
    return res.status(403).json("Modify others channels infos not allowed!");
  }
};

const getChannel = async (req, res, next) => {
  try {
    const tmpChannel = await Channel.findById(req.params.id);
    const { createdAt, updatedAt, password, ...channel } = tmpChannel._doc;
    res.status(200).json(channel);
  } catch (err) {
    next(err);
  }
};

const subscribe = async (req, res, next) => {
  try {
    await Channel.findByIdAndUpdate(req.channel.id, {
      $push: { subscriptions: req.params.id },
    });
    await Channel.findByIdAndUpdate(req.params.id, {
      $push: { subscribers: req.channel.id },
    });
    res.status(200).json("Subscription successfull.");
  } catch (err) {
    next(err);
  }
};

const unsubscribe = async (req, res, next) => {
  try {
    try {
      await Channel.findByIdAndUpdate(req.channel.id, {
        $pull: { subscriptions: req.params.id },
      });
      await Channel.findByIdAndUpdate(req.params.id, {
        $pull: { subscribers: req.channel.id },
      });
      res.status(200).json("Unsubscription successfull.");
    } catch (err) {
      next(err);
    }
  } catch (err) {
    next(err);
  }
};

module.exports = { updateChannel, getChannel, subscribe, unsubscribe };
