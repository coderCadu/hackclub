import {
  InternalServerError,
  MethodNotAllowedError,
  DatabaseMigrationError,
} from "./errors.js";

const onNoMatchHandler = (_, res) => {
  const publicErrorObject = new MethodNotAllowedError();

  res.status(publicErrorObject.statusCode).json(publicErrorObject);
};

const onErrorHandlerInternal = (err, _, res) => {
  const publicErrorObject = new InternalServerError({
    cause: err,
    statusCode: err.statusCode,
  });

  res.status(publicErrorObject.statusCode).json(publicErrorObject);
};

const onErrorHandlerDatabase = (err, _, res) => {
  const publicErrorObject = new DatabaseMigrationError({
    cause: err,
  });

  res.status(publicErrorObject.statusCode).json(publicErrorObject);
};

export { onNoMatchHandler, onErrorHandlerInternal, onErrorHandlerDatabase };
