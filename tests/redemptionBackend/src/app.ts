import cors from "cors";
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

  // options for cors middleware
  const options: cors.CorsOptions = {
    allowedHeaders: [
      "Origin",
      "X-Requested-With",
      "Content-Type",
      "Accept",
      "X-Access-Token",
      "*"
    ],
    credentials: true,
    methods: "GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE",
    origin: true,
    preflightContinue: false
  };
  app.use(cors(options));

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
