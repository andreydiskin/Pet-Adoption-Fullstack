class ResponseHandler {
  constructor(status, success, resp) {
    this.status = status;
    this.success = success;
    this.resp = resp;

    return this.toBlock();
  }

  toBlock = () => {
    return {
      status: this.status,
      payload: {
        success: this.success,
        [this.success ? "data" : "message"]: this.resp,
      },
    };
  };
}

module.exports.ValidRes = (value) => new ResponseHandler(200, true, value);
module.exports.CreatedRes = (value) => new ResponseHandler(201, true, value);
module.exports.ErrNotAuthed = () =>
  new ResponseHandler(401, false, "You are not authorised");
module.exports.ErrConflict = () =>
  new ResponseHandler(409, false, "Conflict - Already Exist");
module.exports.ErrUserNotFound = () =>
  new ResponseHandler(404, false, "Not Found - User not found");
module.exports.ErrSchema = (erros) => new ResponseHandler(422, false, erros);
module.exports.OldPassword = (err) => new ResponseHandler(400, false, err);

module.exports.ErrPermissions = () =>
  new ResponseHandler(403, false, "You don't have permissions for it");
