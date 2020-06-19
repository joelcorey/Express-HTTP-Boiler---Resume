var myApp = require("./myApp");
var express = require("express");
var bodyParser = require('body-parser')
var app = express();
var myApp = require("./myApp");
let port = process.env.port || 3000;

require('dotenv').config();

app.use(bodyParser.json());
//app.use(cors); // cors causing arror

app.use((req, res, next) => {
	res.set({
		'API-Version': '1',
		'Access-Control-Allow-Origin': '*',
		'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
		'Access-Control-Allow-Headers': 'Content-Type',
		'Access-Control-Allow-Credentials': true,
	});
	return next();
});

app.use("/", (req, res, next) => {
    console.log(`${req.method} ${req.path} - ${req.ip}`);
    next();
});

app.get("/", function(req, res, next) {
    res.sendFile(__dirname + "/views/index.html");
});

app.listen(port, () => console.log(`server listening on port ${port}!`));

app.use(function errorHandler(error, req, res, next) {
	let response
	if (process.env.NODE_ENV === 'production') {
		response = { error: 'Server error' }
	} else {
		console.error(error)
		response = { error: error.message, object: error }
	}
	res.status(500).json(response);
});
