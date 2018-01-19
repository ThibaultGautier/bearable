const express = require('express');
const Breweries = require('./../models/Brasserie');

var breweries_route = express.Router()

breweries_route.route('/')
    .get((req, res) => {
        Breweries.find({}, (err, result) => {
            if(!result.length) res.send("Aucune brasseries trouvée")
            else res.json(result)
        })
    })

breweries_route.route('/:id')
    .get((req, res) => {
        Breweries.findById(req.params.id, (err, result) => {
            res.json(result)
        })
    })

breweries_route.route('/add')
    .post((req, res)=>{
        var exists;
        Breweries.find({ name: req.body.name }, (err, result) => {
            if (result.length) {
                exists = true
            }
            else {
                exists = false
            }
            if (!exists) {
                console.log(exists)
                var beer = new Breweries(req.body)
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

    breweries_route.route('/edit/:id')
    .put((req, res) => {
        var modifs = req.body
        Breweries.findByIdAndUpdate(req.params.id, modifs, { new: true }, (err, result) => {
            res.json(result)
        })
    })
    breweries_route.route('/delete/:id')    
    .delete((req, res)=>{
        Breweries.findByIdAndRemove(req.params.id, (err, removedBrewery) => {
            res.json(removedBrewery)
        })
    })

module.exports =  breweries_route