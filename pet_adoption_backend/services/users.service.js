const { jwtSign } = require("../lib/JWT");
const bcrypt = require("bcrypt");
const { ErrSchema } = require("../lib/ResponseHandler");

const Users = require("../models/users.model.schema");
const { findManyById } = require("./pets.service");

const saltRounds = 10;

module.exports.getUserByEmail = async (mail) => {
  const user = await Users.findOne({ email: mail });

  return user;
};

module.exports.getUserById = async (userId) => {
  try {
    const user = await Users.findById(userId).select({ password: 0 });
    return user;
  } catch (err) {
    console.log("ERROR", err);
  }
};

module.exports.getUserByIdWithPassword = async (userId) => {
  try {
    const user = await Users.findById(userId);

    return user;
  } catch (err) {
    console.log("ERROR", err);
  }
};

module.exports.createNewUser = async (user) => {
  const salt = await bcrypt.genSalt(saltRounds);
  const hashedPassWord = await bcrypt.hash(user.password, salt);

  user.password = hashedPassWord;
  user.permissionId = 0;

  await Users.create(user);

  return user;
};

module.exports.checkUserLogin = async (user, testedPassword, next) => {
  const { password } = user;

  try {
    const comparedResult = await bcrypt.compare(testedPassword, password);

    return comparedResult;
  } catch (err) {
    next(ErrSchema(err));
  }
};

module.exports.getUserToken = (user) => {
  const { _id } = user;

  delete user.password;
  const id = _id;
  const access_token = jwtSign({ id });
  return access_token;
};

module.exports.addPetToUser = async (petId, user) => {
  const newUser = await Users.findByIdAndUpdate(
    user._id.toString(),
    {
      $addToSet: { savedPets: petId },
    },
    { safe: true, upsert: true, returnDocument: "after" }
  );

  return newUser;
};

module.exports.removeUserSavedPet = async (petId, user) => {
  const newUser = await Users.findByIdAndUpdate(
    user._id.toString(),
    {
      $pull: { savedPets: petId },
    },
    { safe: true, upsert: true, returnDocument: "after" }
  );

  return newUser;
};

module.exports.getUserSavedPets = async (userId) => {
  const user = await Users.findOne({ _id: userId }).select({ password: 0 });
  const savedPets = await findManyById(user.savedPets);
  return savedPets;
};

module.exports.updateUserService = async (id, data) => {
  const salt = await bcrypt.genSalt(saltRounds);
  const hashedPassWord = await bcrypt.hash(data.password, salt);

  data.password = hashedPassWord;

  return await Users.findByIdAndUpdate(id, data, { returnDocument: "after" });
};

module.exports.getAllUsersService = async () => {
  return await Users.find({}).select({
    password: 0,
    permissionId: 0,
    savedPets: 0,
  });
};

module.exports.getUserByIdFullDataService = async (id) => {
  return await Users.findById(id).select({ password: 0 });
};
