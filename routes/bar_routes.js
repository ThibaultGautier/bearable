const express = require('express');
const Bars = require('./../models/Bar');
const Beer = require('./../models/Beer');

var bar_route = express.Router()

bar_route.route('/')
    .get((req, res) => {
        Bars.find({}, (err, result) => {
            if (!result.length) res.send("Aucun bar trouvé")
            else res.json(result)
        })
    })
bar_route.route('/:id')
    .get((req, res) => {
        Bars.findById(req.params.id, (err, result) => {
            console.log(result)
            if (!result) res.send("Aucun bar trouvé")
            else res.json(result)
        })
    })

bar_route.route('/town/:town')
    .get((req, res) => {
        Bars.find({ town: req.param.town }, (err, result) => {
            if (!result.length) res.send("Aucun bar trouvé")
            else res.json(result)
        })
    })

bar_route.route('/add')
    .post((req, res) => {
        var exists;
        Bars.find({ name: req.body.name }, (err, result) => {
            if (result.length) {
                exists = true
            }
            else {
                exists = false
            }
            if (!exists) {
                console.log(exists)
                var bar = new Bars(req.body)
                bar.save()
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

bar_route.route('/add/:id/beer')

    .post((req, res) => {
        var newBeer;
        Beer.find({ name: req.body.name }, (err, beer) => {
            if (!beer.length) {
                newBeer = new Beer(req.body)
                newBeer.save()
            } else {
                newBeer = beer
            }
        })
        Bars.findByIdAndUpdate(req.params.id, (err, result) => {
            console.log(result)
            if (result) {
                result.beers.push(newBeer)
                result.save()
            }
            else {
                res.send("can't add beer, no bar found")
            }
        })
    })

bar_route.route('/edit/:id')
    .put((req, res) => {
        var modifs = req.body
        Bars.findByIdAndUpdate(req.params.id, modifs, { new: true }, (err, result) => {
            res.json(result)
        })
    })


module.exports = bar_route