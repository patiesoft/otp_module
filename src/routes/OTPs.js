const router = require("express").Router();
const { generateOTP, verifyOTP } = require("../controllers");

router.get("/otp/generate", generateOTP);
router.get("/otp/verify", verifyOTP);

module.exports = router;
