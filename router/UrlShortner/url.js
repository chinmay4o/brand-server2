import express from "express";
import validUrl from "valid-url";
import shortid from "shortid";
import {Urls} from "../../models/UrlModel.js";
const router = express.Router();
// import {Users} from "../../models/userSchema";

router.post("/shorten", async (req, res) => {
  const { longUrl } = req.body; // destructure the longUrl

  // const baseUrl = "http://localhost:5002";
  // const baseUrl = "http://localhost:3000";
  const baseUrl = "https://urlshortner4o2.netlify.app";

  if (!validUrl.isUri(baseUrl)) {
    return res.status(401).json("Invalid base URL");
  }

  // if valid, we create the url code
  const urlCode = shortid.generate();

  // check long url if valid using the validUrl.isUri method
  if (validUrl.isUri(longUrl)) {
    try {
     
      let url = await Urls.findOne({longUrl : longUrl});

      // url exist and return the response
      if (url) {
        res.json(url);
      } else {
        // join the generated short code the the base url
        const shortUrl = baseUrl + "/" + urlCode;

        // invoking the Url model and saving to the DB
        let newUrl = new Urls({
          longUrl,
          shortUrl,
          urlCode,
          date: new Date(),
        });


        await newUrl.save();
        res.send(newUrl);
      }
    } catch (err) {
      // exception handler
      console.log(err);
      res.status(500).json("Server Error");
    }
  } else {
    res.status(401).json("Invalid longUrl");
  }
});



export const routerUrl = router;



 /* The findOne() provides a match to only the subset of the documents 
            in the collection that match the query. In this case, before creating the short URL,
            we check if the long URL was in the DB ,else we create it.
            */