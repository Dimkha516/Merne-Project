// posterId; message; picture; video; likers; comments --- timestamps
const mongoose = require("mongoose");

const PostsSchema = mongoose.Schema(
  {
    posterId: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
      trim: true,
      maxLength: 500,
    },
    picture: {
      type: String,
    },
    video: {
      type: String,
    },
    likers: {
      type: [String],
      required: true,
    },
    comments: {
      type: [
        {
          commenterId: String,
          commenterPseudo: String,
          text: String,
          timestamp: Number,
        },
      ],
      required: true,
    },
  },
  //
  {
    timestamps: true,
  }
);

const PostsModel = mongoose.model("posts", PostsSchema);
module.exports = { PostsModel };
