const { PostsModel } = require("../Models/postsModel");
const { UsersModel } = require("../Models/usersModel");
const mongoose = require("mongoose");
const ObjectID = mongoose.Types.ObjectId;
const sharp = require("sharp");
// ************************ POSTS ******************************
// CREATE NEW POST:
module.exports.createPost = async (req, res) => {
  let fileName;

  if (req.file !== undefined) {
    fileName = req.body.posterId + Date.now() + ".png";
    try {
      await sharp(req.file.buffer)
        .resize({ width: 250, height: 250 })
        .png()
        .toFile(`${__dirname}/../client/public/uploads/post/${fileName}`);
      res.status(200).send("Image uploaded successfully");
    } catch (err) {
      res.status(406).send({ err });
    }
  }

  const newPost = new PostsModel({
    posterId: req.body.posterId,
    message: req.body.message,
    picture: req.file !== undefined ? "./uploads/post/" + fileName : "",
    video: req.body.video,
    likers: [],
    comments: [],
  });

  try {
    const post = await newPost.save();
    return res.status(200).json(post);
  } catch (err) {
    return { message: err };
  }
};

// GET ALL POSTS:
module.exports.getPosts = (req, res) => {
  PostsModel.find((err, docs) => {
    if (!err) return res.status(200).send(docs);
    else return res.status(400).send({ err });
  }).sort({ createdAt: -1 });
};

// GET UNIQUE POST:
module.exports.getPost = (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(500).send({ message: "Invalide ID : " + req.params.id });

  PostsModel.findById(req.params.id, (err, docs) => {
    if (!err) return res.status(200).send(docs);
    else return res.status(400).send({ message: err });
  });
};

// UPDATE POST :
module.exports.updatePost = (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(500).send("Invalid ID:" + req.params.id);

  const updateRecord = {
    message: req.body.message,
  };

  PostsModel.findByIdAndUpdate(
    req.params.id,
    { $set: updateRecord },
    { new: true },
    (err, docs) => {
      if (!err) return res.status(201).send(docs);
      else return res.status(401).send("Failed updating post: " + err);
    }
  );
};

// DELETE POST :
module.exports.deletePost = (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(500).send("Invalid ID:" + req.params.id);

  PostsModel.findOneAndRemove(req.params.id, (err, docs) => {
    if (!err) res.send("Post deleted succesfully ");
    else res.send("Failed deleting post: " + err);
  });
};
// ************************ LIKES/UNLIKES ******************************
module.exports.likePost = async (req, res) => {
  if (!ObjectID.isValid(req.params.id) || !ObjectID.isValid(req.body.id))
    return res.status(400).send("Invalide ID : " + req.params.id);

  try {
    await PostsModel.findByIdAndUpdate(
      req.params.id,
      { $addToSet: { likers: req.body.id } },
      { new: true, upsert: true }
    );
    await UsersModel.findByIdAndUpdate(
      req.body.id,
      { $addToSet: { likes: req.params.id } },
      { new: true, upsert: true },
      (err, docs) => {
        if (!err) return res.status(200).send(docs);
        else return res.status(400).send("Error updating data : " + err);
      }
    );
  } catch (error) {
    return { error };
  }
};

module.exports.unlikePost = async (req, res) => {
  if (!ObjectID.isValid(req.params.id) || !ObjectID.isValid(req.body.id))
    return res.status.send("Error, ID invalid : " + req.params.id);

  try {
    await PostsModel.findByIdAndUpdate(
      req.params.id,
      { $pull: { likers: req.body.id } },
      { new: true, upsert: true }
    );
    await UsersModel.findByIdAndUpdate(
      req.body.id,
      { $pull: { likes: req.params.id } },
      { new: true, upsert: true },
      (err, docs) => {
        if (!err) return res.status(200).send(docs);
        else return res.status(400).send("Error updating datas : " + err);
      }
    );
  } catch (error) {
    return { error };
  }
};

module.exports.addComment = async (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res
      .status(400)
      .send("ID commenter or post invalid : " + req.params.id);

  try {
    await PostsModel.findByIdAndUpdate(
      req.params.id,
      {
        $push: {
          comments: {
            commenterId: req.body.commenterId,
            commenterPseudo: req.body.commenterPseudo,
            text: req.body.text,
            timestamp: new Date().getTime(),
          },
        },
      },
      { new: true },
      (err, docs) => {
        if (!err) res.status(200).send(docs);
        else return res.status(400).send("Error to add comment : " + err);
      }
    );
  } catch (error) {
    return { error };
  }
};

//
module.exports.editComment = async (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknow : " + req.params.id);

  try {
    return PostsModel.findById(req.params.id, (err, docs) => {
      const theComment = docs.comments.find((comment) =>
        comment._id.equals(req.body.commentId)
      );
      if (!theComment) return res.status(404).send("Comment not found");
      theComment.text = req.body.text;

      return docs.save((err) => {
        if (!err) return res.status(200).send(docs);
        else return res.status(500).send(err);
      });
    });
  } catch (error) {
    return res.status(400).send(error);
  }
};
//

module.exports.deleteComment = async (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(401).send("Invalid ID : " + req.params.id);

  try {
    await PostsModel.findByIdAndUpdate(
      req.params.id,
      {
        $pull: {
          comments: {
            _id: req.body.commentId,
          },
        },
      },
      { new: true },
      (err, docs) => {
        if (!err) res.status(200).send(docs);
        else res.status(500).send("Error to delete comment : " + err);
      }
    );
  } catch (error) {
    return { error };
  }
};
