const express = require("express");
const route = express.Router();

const {
  userRegistrationSchema,
  userLoginSchema,
  userUpdateSchema,
} = require("../dto/users.schema");
const { validateDto } = require("../dto/validate");

const {
  postLogin,
  postRegister,
  getMe,
  getUserbyId,
  updateUser,
  getAllUsers,
  getUserbyIdFullData,
} = require("../controllers/users.controllers");
const { protectedRouth } = require("../lib/permissions");

route.get("/me", getMe);
route.post("/signup", validateDto(userRegistrationSchema), postRegister);

route.post("/login", validateDto(userLoginSchema), postLogin);

route.get("/", protectedRouth("admin"), getAllUsers);

route.get("/:id", protectedRouth("user"), getUserbyId);

route.put(
  "/:id",
  protectedRouth("user"),
  validateDto(userUpdateSchema),
  updateUser
);

route.get("/:id/full", protectedRouth("user"), getUserbyIdFullData);

module.exports = route;
