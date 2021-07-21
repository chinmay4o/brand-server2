import express from "express";
import nodemailer from "nodemailer";

const router = express.Router();

router.post("/contact", async (req, res) => {
  const { email, message } = req.body;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "surve4407@gmail.com",
      pass: "148010117494",
    },
  });

  transporter.sendMail(
    {
      from: "surve4407@gmail.com",
      to: "chinmayinbox8@gmail.com",
      subject: email,
      html: `
         <h2>contact us page</h2>
         <p>${email}</p>
         <p>${message}</p>
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