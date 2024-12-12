class database_error extends Error {
  constructor(...params) {
    super(...params);
    this.name = "Database Error";
    this.message = "An error occurred while trying to connect to the database";
    this.action = "Please try again later";
    this.status_code = "500";
  }
}

class generic_error extends Error {
  constructor(...params) {
    super(...params);
    this.name = "GenericError";
    this.message = "An error occurred";
    this.action = "Please try again later";
    this.status_code = "500";
  }
}

class server_down extends Error {
  constructor(...params) {
    super(...params);
    this.name = "Server Error";
    this.message = "An error occurred while trying to connect to the server";
    this.action = "Please try again later";
    this.status_code = "500";
  }
}

export const customErrors = {
  database_error,
  generic_error,
  server_down,
};
