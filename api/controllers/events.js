const Events = require("../models/events");
const mongoose = require("mongoose");

exports.GET_EVENT = (req, res, next) => {
  Events.find()
    .exec()
    .then((docs) => {
      if (docs.length < 1) {
        res.status(500).json({
          error: "event not found!",
        });
      } else {
        res.status(200).json(
          docs.map((item) => ({
            id: item._id,
            title: item.title,
            category: item.category,
            location: item.location,
            date: item.date,
            detailURL: item.detailURL,
            imageURL: item.imageURL,
          }))
        );
      }
    })
    .catch(() => {
      res.status(500).json({
        error: "event not found!",
      });
    });
};

exports.POST_EVENT = (req, res, next) => {
  const { title, category, location, date, detailURL } = req.body;
  const image = req.file.path;

  Events.find({ title: title })
    .exec()
    .then((doc) => {
      if (doc.length >= 1) {
        res.status(500).json({
          error: "Create event failed!",
        });
      } else {
        const event = new Events({
          _id: new mongoose.Types.ObjectId(),
          title: title,
          category: category,
          location: location,
          date: date,
          detailURL: detailURL,
          imageURL: image,
        });

        event
          .save()
          .then((doc) => {
            res.status(200).json({
              message: doc,
            });
          })
          .catch((error) => {
            res.status(500).json({
              error: "Create event failed!",
            });
          });
      }
    })
    .catch(() => {
      res.status(500).json({
        error: "Create event failed!",
      });
    });
};

exports.DELETE_EVENT = (req, res, next) => {
  Events.deleteOne({ _id: req.params.id })
    .exec()
    .then((result) => {
      res.status(200).json({
        message: "Event deleted",
      });
    })
    .catch((error) =>
      res.status(500).json({
        error: error,
      })
    );
};
