const mongoose = require("mongoose");

const usersSchema = mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  savedPets: {
    type: [String],
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  bio: {
    type: String,
  },
  permissionId: {
    type: Number,
  },
  permissions: {
    type: Object,
  },
});

const Users = mongoose.model("users", usersSchema);
module.exports = Users;
