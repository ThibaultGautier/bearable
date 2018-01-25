const express = require("express")
const User = require('./../models/User')
var user_router = express.Router()

user_router.route('/pseudo')
    .get((req, res) => {
        User.find()
            .then((user) => {
                console.log(user)
                if (!user.length) {
                    res.send("Aucun utilisateur")
                }
                else {
                    res.json(user)
                }
            })
    })

user_router.route('/add')
    .post((req, res, next) => {
        var exists;
        User.find({ pseudo: req.body.pseudo }, (err, result) => {
            if (result.length) {
                exists = true
            }
            else {
                exists = false
            }
            if (!exists) {
                console.log(exists)
                var newUser = new User(req.body)
                newUser.save()
                    .then((result) => {
                        res.json(result)
                    })
                    .catch((err) => {
                        res.json(err)
                    })
            } else {
                res.send("User already exists")
            }
        })
    })

user_router.route('/:id')
    .get((req, res) => {
        User.findById(req.params.id)
            .then((user) => {
                res.json(user)
            })
    })

user_router.route('/pseudo/:pseudo')
    .get((req, res) => {
        User.find({ pseudo: req.params.pseudo })
            .then((user) => {
                res.json(user)
            })
    })

user_router.route('/edit/:id')
    .put((req, res) => {
        var pass = req.body.newPassword
        User.findByIdAndUpdate(req.params.id, {$set: {password:pass}}, { new: true }, (err, result) => {
            res.json(result)
        })
    })

user_router.route('/delete/:id')
    .delete((req, res)=>{
        User.findByIdAndRemove(req.params.id)
            .then((removed)=>{
                res.send(removed)
            })
    })


module.exports = user_router