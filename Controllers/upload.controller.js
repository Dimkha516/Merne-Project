const { UsersModel } = require("../Models/usersModel");
const fs = require("fs");
// const { promisify } = require("util");
// const pipeline = promisify(require("stream").pipeline);
//const { uploadErrors } = require("../Utils/errors.utils");
const sharp = require("sharp");

module.exports.uploadProfil = async (req, res) => {
  const fileName = req.body.name + ".png";
  try {
    await sharp(req.file.buffer)
      .resize({ width: 250, height: 250 })
      .png()
      .toFile(`${__dirname}/../client/public/uploads/profil/${fileName}`);
    res.status(200).send("Image uploaded successfully");

    await UsersModel.findByIdAndUpdate(
      req.body.userId,
      { $set: { picture: "./uploads/profil/" + fileName } },
      { new: true, upsert: true, setDefaultsOnInsert: true }
      // (err, docs) => {
      //   if (!err) return res.send(docs);
      //   else return res.status(402).send(err);
      // }
    );
  } catch (err) {
    // const errors = uploadErrors(err);
    res.status(400).send({ err });
  }
};
