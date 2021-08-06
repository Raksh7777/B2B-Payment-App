const express = require("express");
const router = express.Router();
const loginHandler = require("./../controllers/userOnboarding/login.js");
const verifyHandler = require("./../controllers/userOnboarding/verify.js");

router.get("/login", loginHandler);
router.get("/verify", verifyHandler);

module.exports = router;
