import express from "express";
import { Urls } from "../../models/UrlModel.js";
const router = express.Router();

// Redirect to the long/original URL
router.get("/:code", async (req, res) => {
  try {
    // find a document match to the code in req.params.code
    const url = await Urls.findOne({
      urlCode: req.params.code,
    });
    if (url) {
      // when valid redirect
      res.send(url);
      // return res.redirect(url.longUrl);
    } else {
      return res.status(404).json("No URL Found");
    }
  } catch (err) {
    // exception handler
    console.error(err);
    res.status(500).json("Server Error");
  }
});



export const routerRedirect = router;
