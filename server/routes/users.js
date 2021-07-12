const express = require("express");
const router = express.Router();
const { User } = require("../models/User");
const { History } = require("../models/History");

const { auth } = require("../middleware/auth");

//=================================
//             User
//=================================

router.post("/register", (req, res) => {
  try {
    User.findOne({ email: req.body.email }, (err, existingUser) => {
      if (err)
        return res.status(200).json({ registerSuccess: false, message: err });
      if (existingUser) {
        return res.status(200).json({
          registerSuccess: false,
          message: "email already existed"
        });
      }

      const user = new User(req.body);

      user.save((err, doc) => {
        if (err)
          return res.status(200).json({ registerSuccess: false, message: err });
        user.generateToken((err, user) => {
          if (err)
            return res.status(200).json({ regsterSuccess: false, message: err });
          res.status(200).json({
            tokenExp: user.tokenExp,
            token: user.token,
            registerSuccess: true,
            userId: user._id,
            userData: {
              _id: user._id,
              isAdmin: user.role === 0 ? false : true,
              isAuth: true,
              email: user.email,
              name: user.name,
              firstname: user.firstname,
              lastname: user.lastname,
              role: user.role,
              image: user.image,
              cart: user.cart,
              history: user.history
            }
          });
        });
      });
    });
  } catch (Err) {
    return res.status(400).json({ success: false, err });
  }
});

router.post("/login", (req, res) => {
  try {
    User.findOne({ email: req.body.email }, (err, user) => {
      if (!user)
        return res.status(200).json({
          loginSuccess: false,
          message: "Email not found"
        });

      user.comparePassword(req.body.password, (err, isMatch) => {
        if (!isMatch)
          return res.json({ loginSuccess: false, message: "Wrong password" });

        user.generateToken((err, user) => {
          if (err)
            return res.status(200).json({ loginSuccess: false, message: err });
          res.status(200).json({
            tokenExp: user.tokenExp,
            token: user.token,
            loginSuccess: true,
            userId: user._id,
            userData: {
              _id: user._id,
              isAdmin: user.role === 0 ? false : true,
              isAuth: true,
              email: user.email,
              name: user.name,
              firstname: user.firstname,
              lastname: user.lastname,
              role: user.role,
              image: user.image,
              cart: user.cart,
              history: user.history
            }
          });
        });
      });
    });
  } catch (err) {
    return res.status(400).json({ success: false, err });
  }
});

router.get("/logout", auth, (req, res) => {
  try {
    User.findOneAndUpdate(
      { _id: req.user._id },
      { $set: { token: "", tokenExp: "" } },
      (err, doc) => {
        if (err) return res.json({ success: false, err });
        return res.status(200).send({
          success: true
        });
      }
    );
  } catch (err) {
    return res.status(400).json({ success: false, err });
  }
});

router.get("/history", auth, (req, res) => {
  try {
    History.find({
      "user.id": req.query.userId
    })
      .then(histories => res.status(200).json({ success: true, histories }))
      .catch(err => res.status(400).json({ success: false, message: err }));
  } catch (err) {
    return res.status(400).json({ success: false, err });
  }
});

module.exports = router;
