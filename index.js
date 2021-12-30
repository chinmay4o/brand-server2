import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { userRouter } from "./router/auth.js";
import { Mailrouter } from "./router/contact.js";
import { resetRouter } from "./router/reset.js";
import { resetmainRouter } from "./router/resetmain.js";
import { routerUrl } from "./router/UrlShortner/url.js";
import { routerRedirect } from "./router/UrlShortner/redirect.js";
import { updateRouter } from "./router/UrlShortner/userUrl.js";
import { customerRouter } from "./router/customer.js";
import cookieParser from "cookie-parser";

const app = express();
app.use(
  express.json({
    extended: false,
  })
);

var dd = {
  // origin: "https://urlshortner4o2.netlify.app",
  origin: "https://onebrand4o.netlify.app/",
  // origin: true,
  credentials: true,
};

app.use(cors(dd));

app.use(cookieParser());
dotenv.config({ path: "./config.env" });
//mongodb connection
const url = process.env.DATABASE;

mongoose.connect(url, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});
const onn = mongoose.connection;
onn.on("open", () => console.log("mongodb connected"));

app.use("/", userRouter);

app.use("/brand", customerRouter);

app.listen(process.env.PORT, () =>
  console.log("listening on port " + process.env.PORT)
);
