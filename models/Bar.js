const mongoose = require('mongoose');

var BarSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    town: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    latitude: {
        type: String,
    },
    longitude: {
        type: String,
    },
    HappyHourStart: {
        type: String,
    },
    HappyHourEnd: {
        type: String,
    },
    beers: [{
        type: mongoose.Schema.Types.String,
        ref: 'Beers'
    }]

})

module.exports = mongoose.model('Bars', BarSchema)