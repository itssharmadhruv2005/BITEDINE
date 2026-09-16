// backend/server.js

const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

// ================= MIDDLEWARE =================

app.use(cors());
app.use(express.json());


// ================= IMPORT ROUTES =================

const authRoutes = require("./Routes/authRoutes");
const menuRoutes = require("./Routes/menuRoutes");
const orderRoutes = require("./Routes/orderRoutes");
const otpRoutes = require("./Routes/otpRoutes");


// ================= NODEMAILER CONFIG =================

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});


// ================= TEST EMAIL API =================
// Used to check whether Nodemailer is working

app.get("/test-email", async (req, res) => {
  try {

    await transporter.sendMail({
      from: `"Bite & Dine" <${process.env.EMAIL_USER}>`,
      to: "dhruvsharma27chitkara@gmail.com",
      subject: "Bite & Dine Test Email",
      text: "Nodemailer is working successfully! 🍽️",
    });

    console.log("✅ Test email sent successfully");

    res.json({
      success: true,
      message: "Email sent successfully ✅",
    });

  } catch (error) {

    console.error("❌ MAIL ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Email failed ❌",
      error: error.message,
    });

  }
});


// ================= SUPPORT EMAIL API =================

app.post("/api/send-mail", async (req, res) => {

  const { userEmail, message } = req.body;

  if (!userEmail || !message) {
    return res.status(400).json({
      success: false,
      message: "User email and message are required",
    });
  }

  try {

    await transporter.sendMail({

      // Your Bite & Dine Gmail
      from: `"Bite & Dine" <${process.env.EMAIL_USER}>`,

      // All support emails will come here
      to: "dhruvsharma27chitkara@gmail.com",

      // Reply directly to the customer
      replyTo: userEmail,

      subject: "Support Request - Bite & Dine",

      text: `Message from ${userEmail}:

${message}`,

    });

    console.log("✅ Support email sent");

    res.json({
      success: true,
      message: "Email sent successfully ✅",
    });

  } catch (error) {

    console.error("❌ MAIL ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Email failed ❌",
      error: error.message,
    });

  }

});


// ================= USE ROUTES =================

app.use("/api/auth", authRoutes);

app.use("/api/menu", menuRoutes);

app.use("/api/orders", orderRoutes);

app.use("/api/otp", otpRoutes);


// ================= SERVER =================

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});