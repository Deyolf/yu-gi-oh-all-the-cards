const hostname = '127.0.0.1';
const port = 12000;


var express = require('express');
var app = express();
var fs = require("fs");
var DB_json

var Homepage
var yugioh
var altro

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
})