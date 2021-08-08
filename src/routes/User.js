const express = require("express");
const router = express.Router();
const loginHandler = require("./../controllers/userOnboarding/login.js");
const verifyHandler = require("./../controllers/userOnboarding/verify.js");
const signupHandler = require("./../controllers/userOnboarding/signUp");
const jwtMiddleware = require("./../middlewares/verifyToken");
router.get("/login", loginHandler);
router.get("/verify", verifyHandler);

router.post("/signup", jwtMiddleware, signupHandler);

module.exports = router;
