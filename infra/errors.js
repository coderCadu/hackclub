export class DatabaseError extends Error {
  constructor({ cause }) {
    super("A database error occurred", { cause });
    this.name = "Database Error";
    this.message = "An error occurred while trying to connect to the database";
    this.action = "Drink some Coffee or Tea and try again later";
    this.statusCode = "500";
  }

  toJSON() {
    return {
      name: this.name,
      message: this.message,
      action: this.action,
      status_code: this.statusCode,
    };
  }
}

export class GenericError extends Error {
  constructor({ cause }) {
    super("A generic error occurred", { cause });
    this.name = "Generic Error";
    this.message = "An error occurred";
    this.action = "Please message the support team and try again later";
    this.statusCode = "500";
  }

  toJSON() {
    return {
      name: this.name,
      message: this.message,
      action: this.action,
      status_code: this.statusCode,
    };
  }
}

export class InternalServerError extends Error {
  constructor({ cause }) {
    super("An error occurred", { cause });
    this.name = "Internal Server Error";
    this.action = "Please message the support team";
    this.statusCode = "500";
  }

  toJSON() {
    return {
      name: this.name,
      message: this.message,
      action: this.action,
      status_code: this.statusCode,
    };
  }
}
