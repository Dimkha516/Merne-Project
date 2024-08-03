// PSEUDO, EMAIL, PASS, PICT, BIO, FOLL/FOLL, LIKES --- TIMESTAMPS
const mongoose = require("mongoose");
const { isEmail } = require("validator");
const bcrypt = require("bcrypt");

const usersSchema = mongoose.Schema(
  {
    pseudo: {
      type: String,
      required: true,
      unique: true,
      minLength: 3,
      maxLength: 16,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      validate: [isEmail],
    },
    password: {
      type: String,
      required: true,
      minLength: 6,
      maxLength: 64,
    },
    picture: {
      type: String,
      default: "./uploads/profil/random.jpg",
    },
    bio: {
      type: String,
    },
    followers: {
      type: [String],
    },
    followings: {
      type: [String],
    },
    likes: {
      type: [String],
    },
  },
  {
    timestamps: true,
  }
);

// CRYPTAGE MOT DE PASSE AVEC BCRYPT:
usersSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// DECRYPTAGE MOT DE PASSE AVEC BCRYPT:
usersSchema.statics.login = async function (email, password) {
  const user = await this.findOne({ email });
  if (user) {
    const auth = await bcrypt.compare(password, user.password);
    if (auth) {
      return user;
    }
    throw Error("Incorrect password");
  }
  throw Error("Incorrect email");
};

const UsersModel = mongoose.model("users", usersSchema);
module.exports = { UsersModel };
