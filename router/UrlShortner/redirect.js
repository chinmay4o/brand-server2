import express from "express";
import {Urls} from "../../models/UrlModel.js"
const router = express.Router()



// : app.get(/:code)

// @route       GET /:code
// @description    Redirect to the long/original URL 
router.get('/:code', async (req, res) => {
    try {
        // find a document match to the code in req.params.code
        const url = await Urls.findOne({
            urlCode: req.params.code
        })
        if (url) {
            // when valid we perform a redirect
            return res.redirect(url.longUrl)
        } else {
            // else return a not found 404 status
            return res.status(404).json('No URL Found')
        }

    }
    // exception handler
    catch (err) {
        console.error(err)
        res.status(500).json('Server Error')
    }
})


export const routerRedirect = router;