const Populars = require("../models/populars");
const Attractions = require("../models/attractions");
const mongoose = require("mongoose");

exports.GET_POPULARS = (req, res, next) => {
  Populars.find()
    .exec()
    .then((docs) => {
      if (docs.length < 1) {
        res.status(500).json({
          error: "Popular attraction not found!",
        });
      } else {
        res.status(200).json(
          docs.map((item) => ({
            _id: item._id,
            attraction: item.attraction,
          }))
        );
      }
    })
    .catch(() => {
      res.status(500).json({
        error: "Popular attraction not found!",
      });
    });
};

exports.POST_POPULARS = (req, res, next) => {
  Attractions.findById(req.body.attractionId)
    .exec()
    .then((doc) => {
      if (!doc) {
        res.status(500).json({
          error: "Attraction not found!",
        });
      } else {
        const popular = new Populars({
          _id: new mongoose.Types.ObjectId(),
          attraction: req.body.attractionId,
        });

        popular
          .save()
          .then((doc) => {
            res.status(200).json({
              message: doc,
            });
          })
          .catch(() => {
            res.status(500).json({
              error: "Create popular attraction failed!",
            });
          });
      }
    })
    .catch(() => {
      res.status(500).json({
        error: "Create popular attraction failed!",
      });
    });
};

exports.DELETE_POPULARS = (req, res, next) => {
  Populars.deleteOne({ _id: req.params.id });
};
