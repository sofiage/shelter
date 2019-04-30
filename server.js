const http = require('http'); //import http from node js to speed up the server and store it on the constant http
const app = require('./app');
const port = process.env.PORT || 3000; // assign a port on which this project migh run and get it to an environment variable or hardcoded
const server = http.createServer(app); //create server
server.listen(port); //starts listening to this port and the executs the//a function that is executed when we get requests
