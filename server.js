// var express = require("express");
// var http = require('http')
// var bodyParser = require('body-parser')
// var reload = require('reload');

// var app = express();

// require('dotenv').config();
// let port = process.env.port || 3000;

// app.use(bodyParser.json());
// //app.use(cors); // cors causing arror

// app.use((req, res, next) => {
// 	res.set({
// 		'API-Version': '1',
// 		'Access-Control-Allow-Origin': '*',
// 		'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
// 		'Access-Control-Allow-Headers': 'Content-Type',
// 		'Access-Control-Allow-Credentials': true,
// 	});
// 	return next();
// });

// app.use("/", (req, res, next) => {
//     console.log(`${req.method} ${req.path} - ${req.ip}`);
//     next();
// });

// app.get("/", function(req, res, next) {
//     res.sendFile(__dirname + "/views/index.html");
// });

// app.listen(port, () => console.log(`server listening on port ${port}!`));

// app.use(function errorHandler(error, req, res, next) {
// 	let response
// 	if (process.env.NODE_ENV === 'production') {
// 		response = { error: 'Server error' }
// 	} else {
// 		console.error(error)
// 		response = { error: error.message, object: error }
// 	}
// 	res.status(500).json(response);
// });

// var server = http.createServer(app)

// reload(app).then(function (reloadReturned) {
//     // reloadReturned is documented in the returns API in the README
   
//     // Reload started, start web server
//     server.listen(app.get('port'), function () {
//       console.log('Web server listening on port ' + app.get('port'))
//     })
//     }).catch(function (err) {
//     console.error('Reload could not start, could not start server/sample app', err)
// })


var express = require('express')
var http = require('http')
var path = require('path')
var reload = require('reload')
var bodyParser = require('body-parser')
var logger = require('morgan')
 
var app = express()
 
var publicDir = path.join(__dirname, 'public')
 
app.set('port', process.env.PORT || 3000)
app.use(logger('dev'))
app.use(bodyParser.json()) // Parses json, multi-part (file), url-encoded
 
app.get('/', function (req, res) {
  res.sendFile(path.join(publicDir, 'index.html'))
})
 
var server = http.createServer(app)
 
// Reload code here
reload(app).then(function (reloadReturned) {
  // reloadReturned is documented in the returns API in the README
 
  // Reload started, start web server
  server.listen(app.get('port'), function () {
    console.log('Web server listening on port ' + app.get('port'))
  })
}).catch(function (err) {
  console.error('Reload could not start, could not start server/sample app', err)
})