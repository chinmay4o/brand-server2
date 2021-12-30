import express from "express";
import { Customers } from "../models/bhima/customerSchema.js"
import { Recharge } from "../models/bhima/rechargeSchema.js";
import { Contact } from "../models/bhima/ContactSchema.js";
import { Users } from "../models/bhima/userSchema.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


const router = express.Router();

//   getting customers from the database
router.get("/customers", async (req, res) => {
  const data = await Customers.find();
  res.send(data);
});

//   adding customers to the database
router.post("/data", async (req, res) => {
  const { cname, email, number, address } = req.body;

  const newData = new Customers({
    name: cname,
    email,
    number,
    address,
  });

  await newData.save();

  res.json(newData);
});

//   adding recharge customers to the database
router.post("/recharge", async (req, res) => {
  const { cname, number } = req.body;

  const newData = new Recharge({
    name: cname,
    number,
  });

  await newData.save();

  res.json(newData);
});

//   sending recharge customers to the database
router.get("/recharge", async (req, res) => {
  const data = await Recharge.find();
  res.json(data);
});


//   post request for contact form
router.post("/contact", async (req, res) => {
  const { cname, email, number, address } = req.body;

  const newData = new Contact({
    name: cname,
    email,
    number,
    address,
  });

  await newData.save();

  res.json(newData);
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
        const token = await jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
        user.tokens = user.tokens.concat({ token: token });
        await user.save();
        console.log(token);

        res.json({user , tokenAll : token});
      } else {
        throw new Error("passsword not valid");
      }
    }
  } catch (err) {
    console.log(err);
    res.status(422).send(err);
  }
});



export const customerRouter = router;
