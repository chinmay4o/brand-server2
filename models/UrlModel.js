// const mongoose = require('mongoose')
import mongoose from 'mongoose';

// instantiate a mongoose schema
const URLSchema = new mongoose.Schema({
    urlCode: String,
    longUrl: String,
    shortUrl: String,
    date: {
        type: String,
        default: Date.now
    }
})

// create a model from schema and export it
// module.exports = mongoose.model('Url', URLSchema)
export const Urls = mongoose.model("Url" , URLSchema);