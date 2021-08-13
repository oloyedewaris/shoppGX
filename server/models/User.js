const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const saltRounds = 10;
const jwt = require("jsonwebtoken");
const moment = require("moment");

const userSchema = mongoose.Schema({
  firstname: {
    type: String,
    maxlength: 50
  },
  email: {
    type: String,
    trim: true,
    unique: 1
  },
  password: {
    type: String,
    minglength: 5
  },
  lastname: {
    type: String,
    maxlength: 50
  },
  role: {
    type: Number,
    default: 0
  },
  image: String,
  token: {
    type: String
  },
  tokenExp: {
    type: Number
  },
  history: {
    type: Array,
    default: []
  },
  savedProducts: {
    type: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product"
    }],
    default: []
  }
});

userSchema.pre("save", function (next) {
  try {
    var user = this;

    if (user.isModified("password")) {
      bcrypt.genSalt(saltRounds, function (err, salt) {
        if (err) return next(err);

        bcrypt.hash(user.password, salt, function (err, hash) {
          if (err) return next(err);
          user.password = hash;
          next();
        });
      });
    } else {
      next();
    }
  } catch (err) {
    console.log(err)
  }
});

userSchema.methods.comparePassword = function (plainPassword, cb) {
  try {
    bcrypt.compare(plainPassword, this.password, function (err, isMatch) {
      if (err) return cb(err);
      cb(null, isMatch);
    });
  } catch (err) {
    console.log(err)
  }
};

userSchema.methods.generateToken = function (cb) {
  try {
    var user = this;
    var token = jwt.sign(user._id.toHexString(), "secret");
    var oneHour = moment()
      .add(1, "hour")
      .valueOf();

    user.tokenExp = oneHour;
    user.token = token;
    user.save(function (err, user) {
      if (err) return cb(err);
      cb(null, user);
    });
  } catch (err) {
    console.log(err)
  }
};

userSchema.statics.findByToken = function (token, cb) {
  try {
    var user = this;

    jwt.verify(token, "secret", function (err, decode) {
      user.findOne({ _id: decode, token: token }, function (err, user) {
        if (err) return cb(err);
        cb(null, user);
      });
    });
  } catch (err) {
    console.log(err)
  }
};

const User = mongoose.model("User", userSchema);

module.exports = { User };
