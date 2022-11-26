const mongoose = require("mongoose");

const petsSchema = mongoose.Schema({
  petName: {
    type: String,
    required: true,
  },
  adoptionStatus: {
    type: String,
    enum: ["Adopted", "Fostered", "Available"],
    required: true,
  },
  weight: {
    type: Number,
    required: true,
  },
  height: {
    type: Number,
    required: true,
  },
  type: {
    type: String,
    enum: ["Dog", "Cat", "Fish", "Hamster", "Turtle"],
    required: true,
  },
  pic: {
    type: String,
    required: true,
  },
  hypoallergenic: {
    type: Boolean,
  },
  color: {
    type: String,
    required: true,
  },
  ownerId: {
    type: String,
    required: false,
  },
  breed: {
    type: String,
    required: true,
  },
  bio: {
    type: String,
    required: true,
  },
  restiction: {
    type: String,
    required: true,
  },

  permissionId: {
    type: Number,
  },
});

const Pets = mongoose.model("pets", petsSchema);
module.exports = Pets;
