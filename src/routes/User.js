const express = require("express");

const router = express.Router();
const loginHandler = require("./../controllers/userOnboarding/login.js");
const verifyHandler = require("./../controllers/userOnboarding/verify.js");
const signupHandler = require("./../controllers/userOnboarding/signUp");
const jwtMiddleware = require("./../middlewares/verifyToken");
const paymentRequestHandler = require("./../controllers/paymentHandling/paymentRequest");
const sendMoneyHandler = require("./../controllers/paymentHandling/sendMoney");
const addMoneyHandler = require("./../controllers/paymentHandling/addMoney");
const getuserHandler = require("./../controllers/paymentHandling/getUser");
router.get("/login", loginHandler);
router.get("/verify", verifyHandler);
router.get("/getuser", jwtMiddleware, getuserHandler);

router.post("/signup", jwtMiddleware, signupHandler);
router.post("/paymentrequest", jwtMiddleware, paymentRequestHandler);
router.post("/sendmoney", jwtMiddleware, sendMoneyHandler);
router.post("/addmoney", jwtMiddleware, addMoneyHandler);

module.exports = router;
