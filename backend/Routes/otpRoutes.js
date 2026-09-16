// backend/Routes/otpRoutes.js
const express = require("express");
const router = express.Router();
const axios = require("axios");
require("dotenv").config();

const otpStore = {};

// ✅ SEND OTP
router.post("/send", async (req, res) => {
  try {
    const { phone } = req.body || {};
    if (!phone)
      return res.status(400).json({ success: false, message: "Phone required" });

    const otp = Math.floor(100000 + Math.random() * 900000);
    otpStore[phone] = otp;

    const message = `🍽️ Restaurant OTP: ${otp}`;

    // ✅ Correct domain: console.smslocal.com
    const response = await axios.get("https://console.smslocal.com/api/smsapi", {
      params: {
        key: process.env.SMSLOCAL_API_KEY,
        sender: process.env.SENDER_ID || "RESTAP",
        route: process.env.ROUTE || "otp",
        sms: message,
        number: phone.startsWith("+91") ? phone.slice(3) : phone,
      },
      httpsAgent: new (require("https").Agent)({ rejectUnauthorized: false }),
    });

    console.log(`✅ OTP sent to ${phone}: ${otp}`);
    res.json({ success: true, message: "OTP sent successfully" });
  } catch (err) {
    console.error("❌ SMS Local Error:", err.message);
    res.status(500).json({
      success: false,
      message: "Failed to send OTP",
      error: err.message,
    });
  }
});

// ✅ VERIFY OTP
router.post("/verify", (req, res) => {
  try {
    const { phone, otp } = req.body || {};
    if (!phone || !otp)
      return res.status(400).json({ success: false, message: "Phone and OTP required" });

    if (otpStore[phone] && otpStore[phone].toString() === otp.toString()) {
      delete otpStore[phone];
      console.log(`✅ OTP verified for ${phone}`);
      return res.json({ success: true, message: "OTP verified successfully" });
    }

    res.status(400).json({ success: false, message: "Invalid OTP" });
  } catch (err) {
    console.error("❌ Verify OTP Error:", err.message);
    res.status(500).json({ success: false, message: "Server error verifying OTP" });
  }
});

module.exports = router;




