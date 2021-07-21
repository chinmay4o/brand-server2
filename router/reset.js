import express from "express";
import { Users } from "../models/userSchema.js";
import nodemailer from "nodemailer";
import crypto from "crypto";
const router = express.Router();

var transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "surve4407@gmail.com",
    pass: "148010117494"
  },
});

router.post("/reset", async (req, res) => {
  const { email } = req.body;

  try {
    const user = await Users.findOne({ email: email });
    if (!user) {
      res.status(422).send("users doesn't exists");
      throw new Error("users doesn't exists");
    }

    crypto.randomBytes(32, async (err, buffer) => {
      if (err) {
        res.status(422);
        throw new Error("reset link problem");
      }
      const token = buffer.toString("hex");

      user.resetToken = token;
      user.sessionExpiry = new Date(Date.now() + 3600000);
      await user.save();
      console.log(user);

      transporter.sendMail(
        {
          from: "surve4407@gmail.com",
          to: "chinmayinbox8@gmail.com",
          subject: "link for password reset",
          html: `
          <P>Your password reset link</p>
          <h4> click on the link below to reset your password </h4><br>
          <h5>  Link: http://localhost:3000/resetmain/${token} </h5>
          `,
        },
        function (error, info) {
          if (error) {
            console.log(error);
            res.status(422);
            res.send("error"); // if error occurs send error as response to client
            throw new Error("can't send mail chinmay");
          } else {
            console.log(info.response);
            res.send(info.response);
          }
        }
      );
    });
  } catch (err) {
    res.status(422).send("failure");
    console.log(err);
  }
});


export const resetRouter = router;