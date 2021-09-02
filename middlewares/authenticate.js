import express from "express";
import jwt from "jsonwebtoken";
import { Users } from "../models/userSchema.js";


const authenticate = async (req, res, next) => {
  const token = req.cookies.jwttoken;
  try {
    const verifyToken = jwt.verify(token, process.env.SECRET_KEY);
    if (!verifyToken) {
      throw new Error("token not Found");
    }

    const rootUser = await Users.findOne({ _id: verifyToken._id , "tokens.token" : token });

    if (!rootUser) {
      throw new Error("User not Found");
    }

    req.token = token;
    req.rootUser = rootUser;
    req.userID = rootUser._id;
    // throw new Error('User not Found');
    next();
  } catch (err) {
    res.status(401).json({message : "Unauthorized:No token provided"});
    console.log(err);
  }
};

export { authenticate };
