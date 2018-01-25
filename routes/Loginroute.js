
var jwt = require('jsonwebtoken');
var bcrypt = require("bcrypt")
var express = require('express')
var Users = require('./../models/User')
module.exports = () => {
    var login_router = express.Router()


    login_router.route('/')
        .post((req, res, next) => {
            console.log(req.body)
            Users.findOne({ pseudo: req.body.pseudo }, function (err, user) {

                if (err) return res.status(500).send('Error on the server.');
                if (!user) return res.status(404).send('No user found.');

                if (user.password !== req.body.password) {
                    res.status(403).send("Accès refusé")
                }
                //var token = jwt.sign({ id: user._id }, config.secretkey.jwtkey, {
                var token = jwt.sign({ usertoken }, config.secretkey.jwtkey, {
                    expiresIn: 300
                });


                // return the information including token as JSON
                res.status(200).send({ auth: true, token: token });
            });
        })


    return login_router

}