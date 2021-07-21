import express from "express";
import { Users } from "../models/userSchema.js";
import bcrypt from "bcrypt";
import nodemailer from "nodemailer";
import jwt from "jsonwebtoken";
import {authenticate} from "../middlewares/authenticate.js"

const router = express.Router();

//nodemailer transpot]rter
var transporter = nodemailer.createTransport({
    service: "gmail",
    auth : {
        user: "surve4407@gmail.com",
        pass : "148010117494",
    }
})


// sampe request
router.get("/users", async (req, res) => {
  const data = await Users.find();
  res.send(data);
});

//register
router.post("/register", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(422).send("fill the details first ");
  }

  const user = await Users.findOne({ email: email });
  if (user) {
    res.status(422).send("user already exists");
    throw new Error("user already exists");
  }
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new Users({ email, password: hashedPassword });
    await newUser.save();

    transporter.sendMail({
        from : "surve4407@gmail.com",
        to : "chinmayinbox8@gmail.com",
        subject : email,
        html : `
        <h2>contact us page</h2>
        <p>${email}</p>
        <p>${newUser}</p>
        `
    }, function (err , info){
        if(err) {
            res.send("problem in mail")
        } else {
            res.send("mail successful")
            console.log(info.response)
        }
    })
    res.send(newUser);
  } catch (err) {
    console.lpg(err);
    res.status(422).send(err);
  }
});

//Login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(422).send("fill the details first ");
  }
  try {
    const user = await Users.findOne({ email: email });
    if (user) {
      const verifyUser = await bcrypt.compare(password, user.password);
      if (verifyUser) {
       const token = await jwt.sign({_id : user._id} , process.env.SECRET_KEY);
       user.tokens = user.tokens.concat({ token : token});
       await user.save();
       console.log(token);

       res.cookie("jwttoken" , token);
        res.send(user);
      } else {
        throw new Error("passsword not valid");
        res.send("error");
      }
    }
  } catch (err) {
    console.log(err);
    res.status(422).send(err);
  }
});

// about page auth
router.get("/about" ,authenticate , async (req, res) => {
    console.log(req.rootUser);
    res.send(req.rootUser);

    // res.send("success");
})

export const userRouter = router;
