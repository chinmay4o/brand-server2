import express from "express";
import nodemailer from "nodemailer";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
dotenv.config({ path: "./config.env"});
import { Users } from "../models/userSchema.js";

const router = express.Router();

const transporter = nodemailer.createTransport({
  host: "in-v3.mailjet.com",
  port: 587,
  auth: {
    user: process.env.MAIL_USERNAME,
    pass: process.env.MAIL_PASSWORD,
  },
});

router.post("/resetmain", async (req, res) => {
  const { password, cpassword, resetToken } = req.body;

  try {
    if (password !== cpassword || !password || !cpassword || !resetToken) {
      res.status(422).send("invalid detailes");
      throw new Error("invalid detailes");
    } else {
      const user = await Users.findOne({ resetToken: resetToken });
        // const user = await Users.findOne({
        //   resetToken: resetToken,
        //   sessionExpiry: { $gt: new Date(Date.now()) },
        // });
      if (!user) {
        res.status(422).send("user not found");
        throw new Error("user not found");
      }
      const hashedPassword = await bcrypt.hash(password, 12);
      user.password = hashedPassword;
      user.resetToken = undefined;
      user.sessionExpiry = undefined;
      await user.save();

      //sending confirmation mail
      transporter.sendMail(
        {
          from: process.env.EMAIL,
          to: "chinmayinbox8@gmail.com",
          subject: "password reset successful",
          html: `
       
        <h4> your password reset was successful</h4><br>
        <h5>  go to login: http://localhost:3000/login</h5>
        `,
        },
        function (err, info) {
          if (err) {
            res.status(422).send("mail error");
          } else {
            res.send("mail successful :" + info.response);
          }
        }
      );
      res.send("success");
    }
  } catch (err) {
      console.log(err);
    res.status(422).send(err);
  }
});

export const resetmainRouter = router;