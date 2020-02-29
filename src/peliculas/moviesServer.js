var http = require('http');
var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var mongoOps = require('../../MongoOperations.js');

var port = process.env.port || 1337;

var app = express();
app.use(bodyParser());

app.get('/ListadoPeliculas', function (req, res) {
    res.sendfile("./listaPeliculas.html");
});

app.get('/ListadoPeliculas/api/movies', mongoOps.fetch);

app.post('/ListadoPeliculas/api/movies', mongoOps.add);

app.put('/ListadoPeliculas/api/movies/:movieId', mongoOps.modify);

app.use('/ListadoPeliculas', express.static(path.join(__dirname, 'public')));

app.listen(port);