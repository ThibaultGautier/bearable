const mongoose = require("mongoose");

var BrewerySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    address:{
        type: String,
        required: true
    },
    beers: [{
        type: mongoose.Schema.Types.String,
        ref: 'Beers'
    }],
    creationDate:{
       type: Date 
    },
    country:{
        type: String,
        required: true
    },
    brand: {
        type: String,
        required: true
    },
    description:{
        type: String,
    }
})

module.exports = mongoose.model('Breweries', BrewerySchema)