const otpGenerator = require("otp-generator");
const { redisClient } = require("../db");
const axios = require("axios");

const generateOTP = async (req, res) => {
  try {
    const { msisdn } = req.query;
    const otp = otpGenerator.generate(5, {
      upperCaseAlphabets: false,
      specialChars: false,
      lowerCaseAlphabets: false,
      digits: true,
    });

    //Set OTP to expire in 5 minutes
    redisClient.set(msisdn, otp);
    redisClient.expire(msisdn, 60 * 5);

    const data = JSON.stringify({
      receiverAddress: [`${msisdn}`],
      message: `OTP: ${otp}. This OTP is valid for up to 5 minutes.
      `,
      senderAddress: "MTNSZ-OTP",
    });

    var config = {
      method: "post",
      url: "http://10.169.78.172:8182/sms/notifications/bulk",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    console.log({ config });
    await axios(config);
    //Log that otp was sent

    return res.status(200).json({
      message: "OTP generated Successfully",
      status: true,
    });
  } catch (Error) {
    console.log(Error);
    return res
      .status(500)
      .json({ message: "Internal Error", status: false, data: {} });
  }
};

const verifyOTP = async (req, res) => {
  try {
    const { msisdn, otp } = req.query;

    const realOTP = await redisClient.get(msisdn);

    console.log({ otp, realOTP });
    if (otp === realOTP) {
      await redisClient.del(msisdn);
      return res.status(200).json({
        message: "OTP Good!",
        status: true,
      });
    }
    return res.status(404).json({
      message: "OTP Bad!",
      status: false,
    });
  } catch (Error) {
    console.log(Error);
    return res
      .status(500)
      .json({ message: "Internal Error", status: false, data: {} });
  }
};

module.exports = { generateOTP, verifyOTP };
