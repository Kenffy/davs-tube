const Comment = require("../models/Comment");
const Video = require("../models/Video");
const Channel = require("../models/Channel");

const addComment = async (req, res, next) => {
  const newComment = new Comment({ ...req.body, userId: req.channel.id });
  try {
    const currentVideo = await Video.findById(req.body.videoId);
    if (!currentVideo) return next(createError(404, "Video not found!"));

    const savedComment = await newComment.save();

    await currentVideo.updateOne({
      $push: { comments: savedComment._id.toString() },
    });

    const tmpChannel = await Channel.findById(
      savedComment.channelId,
      "name profile"
    ).exec();

    const { _id, ...channel } = tmpChannel._doc;
    res.status(200).json({ ...savedComment._doc, ...channel });
  } catch (err) {
    next(err);
  }
};

const deleteComment = async (req, res, next) => {
  try {
    const comment = await Comment.findById(res.params.id);
    if (!comment) return next(createError(404, "Comment not found!"));
    const video = await Video.findById(res.params.id);
    if (
      video &&
      (req.channel.id === comment.channelId ||
        req.channel.id === video.channelId)
    ) {
      await video.updateOne({
        $pull: { comments: comment._id.toString() },
      });
      await comment.deleteOne(req.params.id);
      res.status(200).json("The comment has been deleted.");
    } else {
      return next(createError(403, "You can delete ony your comment!"));
    }
  } catch (err) {
    next(err);
  }
};

const getComments = async (req, res, next) => {
  try {
    const comments = await Comment.find({ videoId: req.params.videoId });
    if (comments) {
      let results = [];
      for (const comment of comments) {
        const tmpChannel = await Channel.findById(
          comment.channelId,
          "name profile"
        ).exec();
        const { _id, ...channel } = tmpChannel._doc;
        results.push({ ...comment._doc, ...channel });
      }
      res.status(200).json(results);
    } else {
      res.status(200).json("No comment record found!");
    }
  } catch (err) {
    next(err);
  }
};

const likeComment = async (req, res, next) => {
  const id = req.channel.id;
  const commentId = req.params.commentId;
  try {
    await Comment.findByIdAndUpdate(commentId, {
      $addToSet: { likes: id },
      $pull: { dislikes: id },
    });
    res.status(200).json("The comment has been liked.");
  } catch (err) {
    next(err);
  }
};

const dislikeComment = async (req, res, next) => {
  const id = req.channle.id;
  const commentId = req.params.commentId;
  try {
    await Comment.findByIdAndUpdate(commentId, {
      $addToSet: { dislikes: id },
      $pull: { likes: id },
    });
    res.status(200).json("The comment has been disliked.");
  } catch (err) {
    next(err);
  }
};

module.exports = {
  addComment,
  getComments,
  deleteComment,
  likeComment,
  dislikeComment,
};
