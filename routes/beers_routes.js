const express = require("express")
const Beer = require('./../models/Beer')
var beer_router = express.Router()

beer_router.route('/')
    .get((req, res) => {
        Beer.find({}, (err, result) => {
            res.json(result)
        })
    })


beer_router.route('/:id')
    .get((req, res) => {
        Beer.findById(req.params.id, (err, result) => {
            res.json(result)
        })
    })
beer_router.route('/add')
    .post((req, res, next) => {
        var exists;
        Beer.find({ name: req.body.name }, (err, result) => {
            if (result.length) {
                exists = true
            }
            else {
                exists = false
            }
            if (!exists) {
                console.log(exists)
                var beer = new Beer(req.body)
                beer.save()
                    .then((result) => {
                        res.json(result)
                    })
                    .catch((err) => {
                        res.json(err)
                    })
            } else {
                res.send("Beer already in database")
            }
        })
    })
beer_router.route('/edit/:id')
    .put((req, res) => {
        var modifs = req.body
        Beer.findByIdAndUpdate(req.params.id, modifs, { new: true }, (err, result) => {
            res.json(result)
        })
    })

beer_router.route('/delete/:id')
    .delete((req, res) => {
        Beer.findByIdAndRemove(req.params.id, (err, removedBeer) => {
            res.json(removedBeer)
        })
    })
module.exports = beer_router
