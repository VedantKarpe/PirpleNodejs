
const http = require('http');
var url = require('url');

var httpServer = http.createServer(function(req, res) {
    myServer(req, res);
});

httpServer.listen(3000, function () {
    console.log('Server listening on '+ 3000);
});

var handlers = {};

handlers.notFound = function(callback) {
    callback(404, { payloadString: 'Path must contain hello' });
}

handlers.welcome = function(callback) {
    callback(200, { payloadString: 'My First Node.js Assignment' });
}

var router = {
    'hello': handlers.welcome
};

var myServer = function(req, res) {
    var parsedURL = url.parse(req.url, true); 
    var path = parsedURL.pathname;
    var trimmedPath = path.replace(/^\/+|\/+$/g ,'');
        var chosenHandler = typeof(router[trimmedPath]) !== 'undefined' ? router[trimmedPath] : handlers.notFound;
        chosenHandler(function(statusCode, data) {
            res.setHeader('Content-Type', 'application/json');
            res.writeHead(statusCode);
            res.end(data.payloadString);
        });
}