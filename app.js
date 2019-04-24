// function sayHello(name) {
// 	console.log('hello' + name);
// }

//sayHello('Truong');
var http = require('http');
var dt = require('./logger');

http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
    res.write("The date and time are currently: " + dt.myDateTime());

  res.end('Hello World!');
}).listen(8080);