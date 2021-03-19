const Users = require("../models/users");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

exports.GET_USER = (req, res, next) => {
  Users.find()
    .select("_id email")
    .exec()
    .then((docs) => {
      res.status(200).json({
        count: docs.length,
        users: docs.map((user) => ({
          _id: user._id,
          email: user.email,
        })),
      });
    })
    .catch(() => {
      res.status(404).json({
        error: "User not found!",
      });
    });
};

exports.SIGNUP_USER = (req, res, next) => {
  const { email, password } = req.body;

  Users.findOne({ email: email })
    .exec()
    .then((doc) => {
      if (doc) {
        return res.status(500).json({
          error: "create account failed!",
        });
      } else {
        bcrypt.hash(password, 10, (err, hadh) => {
          if (err) {
            return res.status(500).json({
              error: "create account failed!",
            });
          } else {
            const user = new Users({
              _id: new mongoose.Types.ObjectId(),
              email: email,
              password: password,
            });

            user
              .save()
              .then(() => {
                res.status(200).json({
                  message: "account created!",
                });
              })
              .catch(() => {
                res.status(500).json({
                  error: "create account failed!",
                });
              });
          }
        });
      }
    });
};

exports.LOGIN_USER = (req, res, next) => {
  const { email, password } = req.body;

  Users.findOne({ email: email })
    .exec()
    .then((doc) => {
      if (doc.password != password) {
        return res.status(500).json({
          error: "Login failed!",
        });
      } else {
        bcrypt.compare(password, doc.password, (err, result) => {
          if (err) {
            return res.status(500).json({
              error: "Login failed!",
            });
          }

          if (result) {
            return res.status(200).json({
              message: "Login successfully!",
            });
          }

          res.status(500).json({
            error: "Login failed!",
          });
        });
      }
    })
    .catch(() => {
      res.status(401).json({
        error: "Login failed!",
      });
    });
};

exports.DELETE_USER = (req, res, next) => {
  const { userId } = req.params;

  Users.findOne({ _id: userId })
    .exec()
    .then((doc) => {
      if (!doc) {
        return res.status(401).json({
          error: "Delete failed!",
        });
      } else {
        Users.deleteOne({ _id: userId }, null, (err, result) => {
          if (err) {
            return res.status(401).json({
              error: "Delete failed!",
            });
          }

          if (result) {
            return res.status(200).json({
              message: "Delete successfully!",
            });
          }

          res.status(401).json({
            error: "Delete failed!",
          });
        });
      }
    })
    .catch(() => {
      res.status(401).json({
        error: "Delete failed!",
      });
    });
};
