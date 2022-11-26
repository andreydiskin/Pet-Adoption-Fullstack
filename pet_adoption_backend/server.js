const express = require("express");
require("./lib/mongoose");
const cors = require("cors");
const {
  ValidRes,
  ErrNotAuth,
  ErrNotAuthed,
  CreatedRes,
  ErrUserNotFound,
} = require("./lib/ResponseHandler");
const { jwtVerify } = require("./lib/JWT");
const { getUserById } = require("./services/users.service");
const { getPermissionsList } = require("./lib/permissions");

const app = express();

// auth layer
app.use(
  cors({
    origin: "https://andrey-pet-adoption.netlify.app/",
  })
);

const port = process.env.PORT || 4000;

// preparation layer

//receive body as json
app.use(express.json());

app.use((req, res, next) => {
  res.ok = (data) => {
    const resp = ValidRes(data);

    res.block(resp);
  };

  res.create = (data) => {
    const resp = CreatedRes(data);
    res.block(resp);
  };

  res.block = (resp) => {
    res.status(resp.status).send(resp.payload);
  };

  next();
});


//auth middleware
app.use(async (req, res, next) => {
  const authorized = ["/users/login", "/users/signup"];

  if (authorized.includes(req.url)) {
    return next();
  }

  const { authorization } = req.headers;

  // search when the user not logged it
  if (req.url.includes("/pets") && req.method === "GET" && !authorization) {
    return next();
  }

  try {
    const decoded = jwtVerify(authorization);

    const user = await getUserById(decoded.id);

    if (!user) {
      return next(ErrUserNotFound());
    }

    delete user.password;

    user.permissions = getPermissionsList(user.permissionId);

    req.user = user;

    return next();
  } catch (error) {
    next(ErrNotAuthed());
  }
});

// route layer
app.use("/users", require("./routes/users.route"));
app.use("/pets", require("./routes/pets.route"));
app.use("/upload", require("./routes/upload.route"));

// error layer
app.use((err, req, res, next) => {
  console.log("err ->>> ", err);
  res.block(err);
});

app.listen(port, () => {
  console.log("Express is listening on port " + port);
});
