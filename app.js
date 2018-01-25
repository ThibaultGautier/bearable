const express = require("express")
const app = express()
const mongoose = require("mongoose");
mongoose.Promise = require('bluebird');
const bodyParser = require('body-parser');
const db = require("./utils/db");
const PORT = process.env.PORT || 3000;
const cors = require('cors');
const beers_route = require('./routes/beers_routes');
const brewery_route = require('./routes/brewery_routes');
const bar_route = require('./routes/bar_routes');
const user_route = require('./routes/user_routes');
const cookieParser = require('cookie-parser');
const logroute = require('./routes/Loginroute');
//APP Config :
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());
app.use(cors({credentials: true, origin: 'http://localhost:1337'}));

app.use('/beers', beers_route);
app.use('/breweries', brewery_route);
app.use('/bars', bar_route);
app.use('/users', user_route);
app.use('/login', logroute);



mongoose.connect(db.development_db)
    .then(()=>{
        console.log('connexion à mlab réussie')
    })

//Start API
app.listen(PORT, function () {
    console.log("API en cours d'exécution sur le port " + PORT);
});


