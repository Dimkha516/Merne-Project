const { UsersModel } = require("../Models/usersModel");
const mongoose = require("mongoose");
const ObjectID = mongoose.Types.ObjectId;

//GET ALL USERS:
module.exports.getUsers = async (req, res) => {
  try {
    const users = await UsersModel.find().select("-password");
    res.send(users);
  } catch (err) {
    res.status(400).send({ err });
  }
};

// GET UNIQUE USER:
module.exports.getUser = (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID invalid : " + req.params.id);

  UsersModel.findById(req.params.id, (err, docs) => {
    if (!err) return res.status(200).send(docs);
    else return res.status(401).send(err);
  }).select("-password");
};

// UPDATE USER:
module.exports.updateUser = async (req, res) => {
  if (!ObjectID.isValid(req.params.id)) return "ID invalid:" + req.params.id;

  try {
    await UsersModel.findOneAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          bio: req.body.bio,
        },
      },
      { new: true, upsert: true, setDefaultsOnInsert: true },
      (err, docs) => {
        if (!err) return res.send(docs);
        if (err) return res.status(500).send({ message: err });
      }
    );
  } catch (err) {
    return { err };
  }
};

// DELETE USER :
module.exports.deleteUser = async (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(500).send("Invalid ID : " + req.params.id);
  try {
    await UsersModel.deleteOne({ _id: req.params.id }).exec();
    res.send({ message: "User deleted succcessfully" });
  } catch (err) {
    return res.send(err);
  }
};

// FOLLOW :
module.exports.follow = async (req, res) => {
  if (
    !ObjectID.isValid(req.params.id) ||
    !ObjectID.isValid(req.body.idToFollow)
  )
    return res.status(400).send("Error ID invalid :" + req.params.id);

  try {
    await UsersModel.findByIdAndUpdate(
      req.params.id,
      {
        $addToSet: { followings: req.body.idToFollow },
      },
      { new: true, upsert: true }
    );
    await UsersModel.findByIdAndUpdate(
      req.body.idToFollow,
      { $addToSet: { followers: req.params.id } },
      { new: true, upsert: true },
      (err, docs) => {
        if (!err) return res.status(200).send(docs);
        else return res.status(400).send("Error");
      }
    );
  } catch (error) {
    return { error };
  }
};
// UNFOLLOW :
module.exports.unfollow = async (req, res) => {
  if (
    !ObjectID.isValid(req.params.id) ||
    !ObjectID.isValid(req.body.idToUnFollow)
  )
    return res.status(400).send("Error ID unknow : " + req.params.id);

  try {
    await UsersModel.findByIdAndUpdate(
      req.params.id,
      { $pull: { followings: req.body.idToUnFollow } },
      { new: true, upsert: true }
    ),
      await UsersModel.findByIdAndUpdate(
        req.body.idToUnFollow,
        { $pull: { followers: req.params.id } },
        { new: true, upsert: true },
        (err, docs) => {
          if (!err) return res.status(200).send(docs);
          else return res.status(400).send("Error Updating data: " + err);
        }
      );
  } catch (error) {
    return { error };
  }
};
