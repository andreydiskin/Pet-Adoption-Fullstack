const jwt = require("jsonwebtoken");

require("dotenv").config();

const { PRIVATE_JWT_KEY } = process.env;

module.exports.jwtSign = (payload, expiresIn = "1h") => {
  const access_token = jwt.sign(payload, PRIVATE_JWT_KEY, { expiresIn });
  return access_token;
};

module.exports.jwtVerify = (token) => {
  const payload = jwt.verify(token, PRIVATE_JWT_KEY);
  return payload;
};
