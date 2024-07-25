// routes/userRoutes.js
const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.post("/registrasi", (req, res) => {
  userController
    .registrasiUser(req.body)
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.json(err);
    });
});

router.post("/login", (req, res) => {
  userController
    .loginUser(req.body)
    .then((result) => {
      console.log(result);
      res.json(result);
    })
    .catch((err) => {
      res.json(err);
    });
});

module.exports = router;
