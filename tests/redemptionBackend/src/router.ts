import { Router } from "express";

const router = Router();

router.get("/", (req, res) => res.sendStatus(200));
router.post("/", (req, res) => {
  console.log(
    "Receive POST request",
    req.url,
    req.query,
    req.params,
    req.body,
    req.headers
  );
  setTimeout(() => {
    res.sendStatus(200);
  }, 2000);
});

export default router;
