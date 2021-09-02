import express from "express";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config({ path: "./config.env"});
const router = express.Router();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "surve4407@gmail.com",
    pass: process.env.EMAIL_PASS
  },
});

router.post("/contact", async (req, res) => {
  const { email, message } = req.body;


  transporter.sendMail(
    {
      from: "surve4407@gmail.com",
      to: "chinmayinbox8@gmail.com",
      subject: email,
      html: `
         <h2>contact us page</h2>
         <h4>${email}</h4>
         <h4>${message}</h4>
       `,
    },
    function (err, info) {
      if (err) {
        console.log(error);
        res.status(422);
        throw new Error("email services failed");
      } else {
        console.log("email sent" + info.response);
        res.status(200);
        res.send("successfully");
      }
    }
  );
});


export const Mailrouter = router; 