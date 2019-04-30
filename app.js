const express = require ('express'); // create a constant express that will require express
const app = express();//create a new constant called app that will execute express like a function
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const animalsRoutes = require('./api/routes/animals');
const adoptionRoutes = require('./api/routes/adoption');

mongoose.connect
("mongodb://sofia:" +
    process.env.MONGO_ATLAS_PW +
    "@node-rest-shelter-shard-00-00-wtibh.mongodb.net:27017,node-rest-shelter-shard-00-01-wtibh.mongodb.net:27017,node-rest-shelter-shard-00-02-wtibh.mongodb.net:27017/test?ssl=true&replicaSet=node-rest-shelter-shard-0&authSource=admin",
    {
        useNewUrlParser: true
    });
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use((req, res, next)=> {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    if(req.method === 'OPTION') {
        res.header('Access-Control-Allow-Methids', 'PUT, POST, PATCH, DELETE')
        return res.status(200).json({});
    }
    next();
    });
//Routes which should handle requests

app.use('/animals', animalsRoutes);
app.use('/adoption', adoptionRoutes);

app.use((req, res, next) => {
    const error = new Error('Not Found');
    error.status = 404;
    next(error);

})

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });

    });
//app.use((req, res, next)=> { //call a method on that app (middleware)
//  res.status(200).json({
//     message: 'It works!'
// });
//});
module.exports = app;