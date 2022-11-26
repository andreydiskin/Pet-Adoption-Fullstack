const { ErrSchema } = require("../lib/ResponseHandler");

const validateDto = (schema) => {
  return (req, res, next) => {
    schema
      .validate(req.body, { abortEarly: false })
      .then(() => {
        next();
      })
      .catch(function (err) {
        next(ErrSchema(err.errors));
      });
  };
};

module.exports = {
  validateDto,
};
