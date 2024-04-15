const Channel = require("../models/Channel");
const Video = require("../models/Video");

const getVideos = async (req, res, next) => {
  try {
    const videos = await Video.find();
    const l_videos = await fetchChannelInfos(videos);

    if (l_videos) {
      res.status(200).json(l_videos);
    } else {
      res.status(200).json("No comment record found!");
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const getVideo = async (req, res, next) => {
  try {
    const video = await Video.findOneAndUpdate(
      { _id: req.params.id },
      { $inc: { views: 1 } },
      { new: true }
    );

    const tempChannel = await Channel.findById(
      video.channelId,
      "name profile subscribers"
    ).exec();
    const { _id, ...channel } = tempChannel._doc;
    res.status(200).json({ ...video._doc, ...channel });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const searchVideo = async (req, res, next) => {
  const search = req.query.search;
  try {
    const videos = await Video.find({
      title: { $regex: search, $options: "i" },
      desc: { $regex: search, $options: "i" },
    });

    const l_videos = await fetchChannelInfos(videos);

    if (l_videos) {
      res.status(200).json(l_videos);
    } else {
      res.status(200).json("No comment record found!");
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const getVideosByChannelId = async (req, res, next) => {
  const channelId = req.params.id;
  try {
    const videos = await Video.find({ channelId });
    const l_videos = await fetchChannelInfos(videos);

    if (l_videos) {
      res.status(200).json(l_videos);
    } else {
      res.status(200).json("No comment record found!");
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const addVideo = async (req, res, next) => {
  const tmpVideo = new Video({ channelId: req.channel.id, ...req.body });
  try {
    const savedVideo = await tmpVideo.save();
    const tmpChannel = await Channel.findById(savedVideo.channelId);

    await tmpChannel.updateOne({
      $push: { videos: savedVideo._id.toString() },
    });

    const channel = {
      name: tmpChannel.name,
      profile: tmpChannel.profile,
      subscribers: tmpChannel.subscribers,
    };

    res.status(200).json({ ...savedVideo._doc, ...channel });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const updateVideo = async (req, res, next) => {
  try {
    const video = await Video.findById(req.params.id);
    if (!video) return res.status(404).json("Video not found!");
    if (req.channel.id === video.channelId) {
      const updatedVideo = await Video.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true }
      );

      const tmpChannel = await Channel.findById(
        video.channelId,
        "name profile subscribers"
      ).exec();
      const { _id, ...channel } = tmpChannel._doc;
      res.status(200).json({ ...updatedVideo._doc, ...channel });
    } else {
      return res.status(403).json("Update videos others channels not allowed!");
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const deleteVideo = async (req, res, next) => {
  try {
    const video = await Video.findById(req.params.id);
    if (!video) return res.status(404).json("Video not found!");
    const channel = await Channel.findById(video.channelId);
    if (channel && req.channel.id === video.channelId) {
      if (channel.videos.includes(video._id.toString())) {
        await channel.updateOne({
          $pull: { videos: video._id.toString() },
        });
      }
      await video.deleteOne();
      res.status(200).json("The video has been deleted.");
    } else {
      return res.status(403).json("Delete videos others channels not allowed!");
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const likeVideo = async (req, res, next) => {
  const id = req.channel.id;
  const videoId = req.params.videoId;
  try {
    await Video.findByIdAndUpdate(videoId, {
      $addToSet: { likes: id },
      $pull: { dislikes: id },
    });
    res.status(200).json("Video liked.");
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const dislikeVideo = async (req, res, next) => {
  const id = req.channel.id;
  const videoId = req.params.videoId;
  try {
    await Video.findByIdAndUpdate(videoId, {
      $addToSet: { dislikes: id },
      $pull: { likes: id },
    });
    res.status(200).json("Video disliked.");
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const fetchChannelInfos = async (videos) => {
  let results = [];
  if (videos.length === 0) return results;

  if (videos.length > 0) {
    for (const video of videos) {
      const tempChannel = await Channel.findById(
        video.channelId,
        "name profile subscribers"
      ).exec();
      const { _id, ...channel } = tempChannel._doc;
      results.push({ ...video._doc, ...channel });
    }
    return results;
  }
};

module.exports = {
  getVideo,
  getVideos,
  searchVideo,
  getVideosByChannelId,
  addVideo,
  updateVideo,
  deleteVideo,
  likeVideo,
  dislikeVideo,
};
