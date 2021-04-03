const News = require("../models/news");
const mongoose = require("mongoose");

exports.GET_NEWS = (req, res, next) => {
  News.find()
    .exec()
    .then((docs) => {
      if (docs.length < 1) {
        res.status(500).json({
          error: "news not found!",
        });
      } else {
        res.status(200).json(
          docs.map((item) => ({
            id: item._id,
            headline: item.headline,
            location: item.location,
            date: item.date,
            imageURL: item.imageURL,
            body: item.body,
          }))
        );
      }
    })
    .catch(() => {
      res.status(500).json({
        error: "news not found!",
      });
    });
};

exports.POST_NEWS = (req, res, next) => {
  const { headline, body, location } = req.body;
  const image = req.file.path;
  const date = new Date();

  News.find({ headline: headline })
    .exec()
    .then((doc) => {
      if (doc.length >= 1) {
        res.status(500).json({
          error: "Create news failed!",
        });
      } else {
        const news = new News({
          _id: new mongoose.Types.ObjectId(),
          headline: headline,
          date: date.toDateString(),
          location: location,
          body: body,
          imageURL: image,
        });

        news
          .save()
          .then((doc) => {
            res.status(200).json({
              message: doc,
            });
          })
          .catch((error) => {
            res.status(500).json({
              error: "Create news failed!",
            });
          });
      }
    })
    .catch(() => {
      res.status(500).json({
        error: "Create news failed!",
      });
    });
};

exports.DELETE_NEWS = (req, res, next) => {
  News.deleteOne({ _id: req.params.id })
    .exec()
    .then((result) => {
      res.status(200).json({
        message: "News deleted",
      });
    })
    .catch((error) =>
      res.status(500).json({
        error: error,
      })
    );
};
