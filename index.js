import express from 'express';
import cors from 'cors';
import dotenv from "dotenv";
import mongoose from "mongoose";
import {userRouter} from "./router/auth.js";
import {Mailrouter} from "./router/contact.js";
import {resetRouter} from "./router/reset.js";
import {resetmainRouter} from "./router/resetmain.js";
import {routerUrl} from "./router/UrlShortner/url.js";
import {routerRedirect} from "./router/UrlShortner/redirect.js";
import cookieParser from "cookie-parser";

const app  = express();
app.use(express.json({
  extended: false
}));
var dd = {
    // origin : 'http://localhost:3001/',
    origin : true,
    credentials : true
  };
  app.use(cors(dd));
  app.use((req, res, next) => {
  // res.header({"Access-Control-Allow-Origin": "*"});
  next();
}) ;
  // app.use(cors());
  app.use(cookieParser());
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
app.use("/" , routerUrl);
app.use("/" , routerRedirect);

app.listen(process.env.PORT , () => console.log("listening on port " + process.env.PORT))


// Enable CORS
// app.use((req, res, next) => {
//   res.header('Access-Control-Allow-Origin', '*');
//   res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE');
//   res.header('Access-Control-Allow-Headers', 'Origin, X-Requested With, Content-Type, Accept');
//   next();
// });

// app.use((req, res, next) => {
//   res.header({"Access-Control-Allow-Origin": "*"});
//   next();
// }) ;