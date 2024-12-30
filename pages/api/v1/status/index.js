import database from "infra/database";
import { InternalServerError } from "infra/errors";

async function apiStatus(req, res) {
  try {
    const { maxConnections, openedCoonections, databaseVersion } =
      await database.databaseStatus();

    const updatedAt = new Date().toISOString();

    if (!maxConnections || !openedCoonections || !databaseVersion) {
      throw new InternalServerError();
    }

    res.status(200).json({
      updated_at: updatedAt,
      dependencies: {
        database: {
          max_connections: parseInt(maxConnections),
          opened_connections: openedCoonections,
          version: databaseVersion,
        },
      },
    });
  } catch (error) {
    const publicErrorObject = new InternalServerError({
      cause: error,
    });

    res.status(publicErrorObject.statusCode).json(publicErrorObject);
  }
}

export default apiStatus;
