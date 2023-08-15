import express, { ErrorRequestHandler, Response } from "express";
import morgan from "morgan";

import router from "./router";

function handleError(error: Error, res: Response): void {
  console.error(`${error}, stack: ${error.stack}`);
  res.status(500).send({
    message: `Internal server error: ${error.message}`
  });
}

export function startApp() {
  const app = express();

  app.use(express.json());

  app.use(morgan("dev"));

  app.use("/", router);

  app.use(((error, req, res, next) => {
    next(handleError(error, res));
  }) as ErrorRequestHandler);

  const port = process.env.PORT || "3666";
  app.listen(port, () => {
    console.log("Server started on port", port);
  });
}
