const mongoose = require('mongoose');

const urlSchema = new mongoose.Schema({

    longUrl: {
        type : String,
        required: [true, "Url is required"],
        unique : true,
        lowercase : true,
        trim: true
    },
    shortUrl: {
        type : String,
        required: [true, "Url is required"],
        unique : true,
        trim: true
    },
    urlCode: {
        type :  String,
        required: [true, "urlCode is required"],
        unique : true,
        lowercase : true,
        trim: true
    },
},{timestamps :true})

/* `exporting a Mongoose model named `Url` that is based on the `urlSchema`
schema. This allows other parts of the application to use the `Url` model to interact with the
MongoDB database. */

module.exports = mongoose.model('Url', urlSchema)





// { urlCode: { mandatory, unique, lowercase, trim }, longUrl: {mandatory, valid url}, shortUrl: {mandatory, unique} }