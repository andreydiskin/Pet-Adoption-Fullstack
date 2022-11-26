const express = require("express");
const { protectedRouth } = require("../lib/permissions");
const route = express.Router();
const { upload } = require("../storage/storage");

route.post(
  "/pet",
  protectedRouth("admin"),
  upload.single("image"),
  (req, res) => {
    res.send(req.fileName);
  }
);

module.exports = route;
