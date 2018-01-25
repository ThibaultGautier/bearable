const mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
    pseudo: {
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Users', UserSchema)