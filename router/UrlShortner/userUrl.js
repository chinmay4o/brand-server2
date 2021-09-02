import express from "express";
import { Users } from "../../models/userSchema.js";
// import {Users} from "../../models/userSchema";

const router = express.Router();

router.post("/updateuser", async (req, res) => {
  const { id, shortUrl, longUrl } = req.body;

  try {
    const currentUser = await Users.findOne({ _id: id });

    currentUser.myUrls = currentUser.myUrls.concat({ shorten: shortUrl });
    await currentUser.save();
    res.send(currentUser);
  } catch (err) {
    res.status(401).json("Invalid longUrl");
  }
});

export const updateRouter = router;
