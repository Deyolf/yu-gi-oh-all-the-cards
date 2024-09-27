const hostname = '127.0.0.1';
const port = 12000;


var express = require('express');
var app = express();
var fs = require("fs");
var DB_json

var Homepage
var yugioh
var cardfightvanguard
var lordofhterings
var magicthegathering
var pokemon
var dragonball

var bodyParser = require('body-parser')
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function (req, res) {
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.end(Homepage);
});

app.get('/:html', function (req, res) {
    res.setHeader('Content-Type', 'text/html');
    let risorsa
    if(req.params.html == "yugioh"){
        res.write(yugioh);
    }
    else if(req.params.html == "cardfightvanguard"){
        res.write(cardfightvanguard);
    }
    else if(req.params.html == "lordoftherings"){
        res.write(lordoftherings);
    }
    else if(req.params.html == "magicthegathering"){
        res.write(magicthegathering);
    }
    else if(req.params.html == "pokemon"){
        res.write(pokemon);
    }
    else if(req.params.html == "dragonball"){
        res.write(dragonball);
    }
    res.end();
})
app.post('/', function (req, res) {
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    var users = DB_json;
    var user = req.body;
    users[users.length] = user
    res.end(JSON.stringify(users));
})
var server = app.listen(port, hostname, () => {
    console.log(`Express App running at http://${hostname}:${port}/`);
    fs.readFile(`${__dirname}/html/home.html`, 'utf8', function (err, data) {
        Homepage = data
    })
    fs.readFile(`${__dirname}/html/yugioh.html`, 'utf8', function (err, data) {
        yugioh = data
    })
    fs.readFile(`${__dirname}/html/dragonball.html`, 'utf8', function (err, data) {
        dragonball = data
    })
    fs.readFile(`${__dirname}/html/lordoftherings.html`, 'utf8', function (err, data) {
        lordoftherings = data
    })
    fs.readFile(`${__dirname}/html/pokemon.html`, 'utf8', function (err, data) {
        pokemon = data
    })
    fs.readFile(`${__dirname}/html/cardfightvanguard.html`, 'utf8', function (err, data) {
        cardfightvanguard = data
    })
    fs.readFile(`${__dirname}/html/magicthegathering.html`, 'utf8', function (err, data) {
        magicthegathering = data
    })
})