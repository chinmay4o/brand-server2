import express from "express";
import nodemailer from "nodemailer";
import bcrypt from "bcrypt";
import { Users } from "../models/userSchema.js";

const router = express.Router();

var transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "surve4407@gmail.com",
    pass: "148010117494",
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
      //   const user = await Users.findOne({
      //     resetToken: resetToken,
      //     sessionExpiry: { $gt: new Date(Date.now()) },
      //   });
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
          from: "surve4407@gmail.com",
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