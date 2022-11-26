const express = require("express");
const {
  addPet,
  getPetById,
  getPetsByQuery,
  updatePet,
  changePetAdoptStatus,
  returnPet,
  savePet,
  removeSavedPet,
  getPetByUser,
} = require("../controllers/pets.controllers");
const {
  petsSchema,
  petsSchemaUpdate,
  adoptOrFoster,
} = require("../dto/pets.schema");
const { validateDto } = require("../dto/validate");
const { protectedRouth } = require("../lib/permissions");
const route = express.Router();

// POST-ADD A PET (ONLY ADMIN)
route.post("/", protectedRouth("admin"), validateDto(petsSchema), addPet);

route.get("/:id", getPetById);

route.get("/", getPetsByQuery);

route.put(
  "/:id",
  protectedRouth("admin"),
  validateDto(petsSchemaUpdate),
  updatePet
);

route.post(
  "/:id/adopt",
  protectedRouth("user"),
  validateDto(adoptOrFoster),
  changePetAdoptStatus
);

route.post("/:id/return", protectedRouth("user"), returnPet);

route.post("/:id/save", protectedRouth("user"), savePet);

route.delete("/:id/save", protectedRouth("user"), removeSavedPet);

route.get("/user/:id", protectedRouth("user"), getPetByUser);

module.exports = route;
