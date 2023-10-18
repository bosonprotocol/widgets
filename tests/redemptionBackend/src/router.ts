import { Router } from "express";

import { confirmed, deliveryInfo, submitted } from "./service";

const router = Router();

router.get("/", (req, res) => res.sendStatus(200));
router.post("/fail", (req, res, next) => {
  console.log(
    "Receive POST request",
    req.url,
    req.query,
    req.params,
    req.body,
    req.headers
  );
  setTimeout(() => {
    res.sendStatus(500);
  }, 2000);
});

router.post("/fail2", (req, res, next) => {
  console.log(
    "Receive POST request",
    req.url,
    req.query,
    req.params,
    req.body,
    req.headers
  );
  setTimeout(() => {
    res.status(409).json({
      accepted: false,
      resume: false,
      reason: `Unsupported delivery jurisdiction`
    });
  }, 2000);
});

router.post("/fail3", (req, res, next) => {
  console.log(
    "Receive POST request",
    req.url,
    req.query,
    req.params,
    req.body,
    req.headers
  );
  setTimeout(() => {
    res.status(409).json({
      accepted: false,
      reason: `Something has gone wrong`
    });
  }, 2000);
});

router.post("/fail4", (req, res, next) => {
  console.log(
    "Receive POST request",
    req.url,
    req.query,
    req.params,
    req.body,
    req.headers
  );
  setTimeout(() => {
    res.status(409).send(`Help me please....`);
  }, 2000);
});

router.post("/deliveryInfo", (req, res, next) => {
  console.log(
    "Receive POST request",
    req.url,
    req.query,
    req.params,
    req.body,
    req.headers
  );
  deliveryInfo(req.body)
    .then(() => {
      setTimeout(() => {
        res.status(200).json({
          accepted: true,
          resume: true,
          reason: ""
        });
      }, 2000);
    })
    .catch(next);
});

router.post("/deliveryInfoThenClose", (req, res, next) => {
  console.log(
    "Receive POST request",
    req.url,
    req.query,
    req.params,
    req.body,
    req.headers
  );
  deliveryInfo(req.body)
    .then(() => {
      setTimeout(() => {
        res.status(200).json({
          accepted: true,
          resume: false,
          reason: ""
        });
      }, 2000);
    })
    .catch(next);
});

router.post("/submitted", (req, res, next) => {
  console.log(
    "Receive POST request",
    req.url,
    req.query,
    req.params,
    req.body,
    req.headers
  );
  submitted(req.body)
    .then(() => {
      setTimeout(() => {
        res.sendStatus(200);
      }, 2000);
    })
    .catch(next);
});

router.post("/confirmed", (req, res, next) => {
  console.log(
    "Receive POST request",
    req.url,
    req.query,
    req.params,
    req.body,
    req.headers
  );
  confirmed(req.body)
    .then(() => {
      setTimeout(() => {
        res.sendStatus(200);
      }, 2000);
    })
    .catch(next);
});

export default router;
