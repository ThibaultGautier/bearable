const mongoose = require('mongoose');

var beerSchema = new mongoose.Schema({

    bars: [{
        type: mongoose.Schema.Types.String,
        ref: 'Bars'
    }],
    name: {
        type: String,
        require: true,
        unique: true
    },
    type: {
        type: String
    },
    color: {
        type: String,
        required: true
    },
    degree: {
        type: Number,
        required: true
    },
    price: {
        type: Number
    },
    country: {
        type: String,
        required: true
    },
    brand: {
        type: String,
        required: true
    }
    
})

module.exports = mongoose.model('Beers', beerSchema)