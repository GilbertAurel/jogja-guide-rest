const Attraction = require("../models/attractions");
const mongoose = require("mongoose");

exports.GET_ATTRACTIONS = (req, res, next) => {
  Attraction.find()
    .select(
      "_id title category description imageURL rating priceRating address coordinate"
    )
    .exec()
    .then((docs) => {
      if (docs.length < 1) {
        res.status(500).json({
          error: "attraction not found!",
        });
      } else {
        res.status(200).json(
          docs.map((item) => ({
            id: item._id,
            title: item.title,
            category: item.category,
            rating: item.rating,
            price: item.priceRating,
            description: item.description,
            address: item.address,
            coordinate: item.coordinate,
            imageURL: item.imageURL,
          }))
        );
      }
    })
    .catch(() => {
      res.status(500).json({
        error: "attraction not found!",
      });
    });
};

exports.POST_ATTRACTIONS = (req, res, next) => {
  const {
    title,
    category,
    description,
    rating,
    priceRating,
    address,
    latitude,
    longitude,
  } = req.body;
  const image = req.file.path;

  Attraction.find({ title: title })
    .exec()
    .then((doc) => {
      if (doc.length >= 1) {
        res.status(500).json({
          error: "Create attraction failed!",
        });
      } else {
        const attraction = new Attraction({
          _id: new mongoose.Types.ObjectId(),
          title: title,
          category: category,
          description: description,
          imageURL: image,
          rating: rating,
          priceRating: priceRating,
          address: address,
          coordinate: {
            latitude: latitude,
            longitude: longitude,
          },
        });

        attraction
          .save()
          .then((doc) => {
            res.status(200).json({
              message: doc,
            });
          })
          .catch(() => {
            res.status(500).json({
              error: "Create attraction failed!",
            });
          });
      }
    })
    .catch(() => {
      res.status(500).json({
        error: "Create attraction failed!",
      });
    });
};

exports.DELETE_ATTRACTIONS = (req, res, next) => {
  Attraction.deleteOne({ _id: req.params.id });
};
