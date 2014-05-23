/**
 * This file defines a simple Node Server
 *
 * This is used to server the static HTML files which we are developing.
 *
 * */

//Get some colors
require("colors");

//Get connect package, will use to create simple quick static file server
var connect = require("connect"),
    path = require("path"),
    staticServerMiddleWare = connect.static(path.join(__dirname, 'serverRoot'));

//Import the HTTP protocol provider
var http = require("http");

//Create the server
var server = http.createServer(dispatcher);

//Listen to a port
server.listen(8080, function () {
    console.log("-->".yellow.bold, "Server listening on port:".green, "8080".magenta);
});


/**
 * Dispatcher method.
 * Simple dispatcher for handling requests and sending responses
 * */
function dispatcher(request, response) {
    staticServerMiddleWare(request, response, function () {
        response.end("No! File found with the specified name.");
    });
}