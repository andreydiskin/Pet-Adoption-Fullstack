const { getPermissionsList } = require("../lib/permissions");
const {
  ErrUserNotFound,
  ErrConflict,
  ErrNotAuthed,
} = require("../lib/ResponseHandler");
const { findPetsByQueryOnlyId } = require("../services/pets.service");
const {
  getUserByEmail,
  getUserToken,
  createNewUser,
  checkUserLogin,
  getUserByTest,
  getUserById,
  updateUserService,
  getAllUsersService,
  getUserByIdFullDataService,
} = require("../services/users.service");

//GET /me
module.exports.getMe = (req, res) => {
  const { user } = req;
  user.permissions = getPermissionsList(user.permissionId);
  res.ok(user);
};

//POST /register
module.exports.postRegister = async (req, res, next) => {
  const { email } = req.body;
  const user = await getUserByEmail(email);
  if (user) return next(ErrConflict());
  const newUser = await createNewUser(req.body);
  res.create(newUser);
};

//POST /login
module.exports.postLogin = async (req, res, next) => {
  //get the user
  const { email, password } = req.body;

  const user = await getUserByEmail(email);

  if (!user) {
    return next(ErrUserNotFound());
  }

  const loginRes = await checkUserLogin(user, password, next);

  if (loginRes) {
    const access_token = getUserToken(user);

    //respond back
    res.ok({ access_token, user });
  } else {
    return next(ErrNotAuthed());
  }
};

module.exports.test = async (req, res) => {
  const user = await getUserByTest(req.body);
  res.send(user);
};

module.exports.getUserbyId = async (req, res) => {
  const { id } = req.params;
  const user = await getUserById(id);
  res.ok(user);
};

module.exports.updateUser = async (req, res) => {
  const { id } = req.params;
  const json = req.body;

  const updatedUser = await updateUserService(id, json);
  res.ok(updatedUser);
};

module.exports.getAllUsers = async (req, res) => {
  const resp = await getAllUsersService();
  res.ok(resp);
};

module.exports.getUserbyIdFullData = async (req, res) => {
  const { id } = req.params;
  const queryString = { ownerId: id };

  const petByOwner = await findPetsByQueryOnlyId(queryString);
  let user = await getUserByIdFullDataService(id);

  const newUser = {
    ...user._doc,
    pets: { own: petByOwner, saved: [...user.savedPets] },
  };
  delete newUser.savedPets;
  res.ok(newUser);
};
