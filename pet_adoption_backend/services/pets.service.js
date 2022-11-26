const Pets = require("../models/pets.model.schema");
const { queryBuilder } = require("../helpers/utils");

module.exports.createNewPet = async (req) => {
  let data = { ...req.body, ownerId: "none" };
  if (data.adoptionStatus === "Adopted" || data.adoptionStatus === "Fostered") {
    data.ownerId = req.user._id;
  }
  const pet = await Pets.create(data);

  return pet;
};

module.exports.findPetById = async (id) => {
  const pet = await Pets.findById(id);
  return pet;
};

module.exports.findPetsByQuery = async (query) => {
  const currQuery = queryBuilder(query);
  const foundPets = await Pets.find(currQuery);
  return foundPets;
};

module.exports.findPetsByQueryOnlyId = async (query) => {
  const currQuery = queryBuilder(query);
  const foundPets = await Pets.find(currQuery, "_id");
  const ids = foundPets.map((i) => i._id.toString());
  return ids;
};

module.exports.updatePetService = async (id, data) => {
  return await Pets.findByIdAndUpdate(id, data, { returnDocument: "after" });
};

module.exports.findManyById = async (ids) => {
  return await Pets.find({
    _id: {
      $in: ids,
    },
  });
};
