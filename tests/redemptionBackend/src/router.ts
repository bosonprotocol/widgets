import { Router } from "express";

import { receive } from "./service";

const router = Router();

router.get("/", (req, res) => res.sendStatus(200));
router.post("/", (req, res, next) => {
  console.log(
    "Receive POST request",
    req.url,
    req.query,
    req.params,
    req.body,
    req.headers
  );
  receive(req.body)
    .then(() => {
      setTimeout(() => {
        res.sendStatus(200);
      }, 2000);
    })
    .catch(next);
});

export default router;
