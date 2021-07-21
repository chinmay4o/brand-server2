import express from 'express';
import cors from 'cors';
import dotenv from "dotenv";
import mongoose from "mongoose";
import {userRouter} from "./router/auth.js";
import {Mailrouter} from "./router/contact.js";
import {resetRouter} from "./router/reset.js";
import {resetmainRouter} from "./router/resetmain.js";

const app  = express();
app.use(express.json());
var dd = {
    origin : true,
    credentials : true
  };
  app.use(cors(dd));
dotenv.config({ path : "./config.env"});
//mongodb connection
const url = process.env.DATABASE;

mongoose.connect(url, { 
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
});
const onn = mongoose.connection;
onn.on("open" , () => console.log("mongodb connected"));

app.use("/" , userRouter);
app.use("/" , Mailrouter);
app.use("/" , resetRouter);
app.use("/" , resetmainRouter);

app.listen(process.env.PORT , () => console.log("listening on port " + process.env.PORT))