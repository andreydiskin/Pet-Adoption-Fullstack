const {
  createNewPet,
  findPetById,
  findPetsByQuery,
  updatePetService,
} = require("../services/pets.service");
const {
  addPetToUser,
  removeUserSavedPet,
  getUserSavedPets,
} = require("../services/users.service");

module.exports.addPet = async (req, res) => {
  const newPet = await createNewPet(req);
  res.create(newPet);
};

module.exports.getPetById = async (req, res) => {
  const { id } = req.params;

  const pet = await findPetById(id);

  res.ok(pet);
};

module.exports.getPetsByQuery = async (req, res) => {
  const queryString = req.query;

  const pets = await findPetsByQuery(queryString);

  res.ok(pets);
};

module.exports.updatePet = async (req, res) => {
  const { id } = req.params;
  const json = req.body;

  const resp = await updatePetService(id, json);
  res.ok(resp);
};

module.exports.changePetAdoptStatus = async (req, res) => {
  const userId = req.user._id.toString();
  const petId = req.params.id;

  const json = { ...req.body, ownerId: userId };
  const resp = await updatePetService(petId, json);
  res.ok(resp);
};

module.exports.returnPet = async (req, res) => {
  const petId = req.params.id;
  const json = { adoptionStatus: "Available", ownerId: "none" };
  const resp = await updatePetService(petId, json);
  res.ok(resp);
};

module.exports.savePet = async (req, res) => {
  const petId = req.params.id;
  let user = req.user;

  const resp = await addPetToUser(petId, user);
  res.ok(resp);
};

module.exports.removeSavedPet = async (req, res) => {
  const petId = req.params.id;
  let user = req.user;

  const resp = await removeUserSavedPet(petId, user);
  res.ok(resp);
};

module.exports.getPetByUser = async (req, res) => {
  const userId = req.params.id;
  const queryString = { ownerId: userId };

  const petByOwner = await findPetsByQuery(queryString);
  const petBySaved = await getUserSavedPets(userId);
  const resp = { own: petByOwner, saved: petBySaved };

  res.ok(resp);
};
