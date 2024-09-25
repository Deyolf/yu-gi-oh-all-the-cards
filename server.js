const hostname = '127.0.0.1';
const port = 12000;


var express = require('express');
var app = express();
var fs = require("fs");
var DB_json
var Homepage

var bodyParser = require('body-parser')
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function (req, res) {
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.write(Homepage);
    res.end();
});

app.get('/:html', function (req, res) {
    res.setHeader('Content-Type', 'text/css');
    let risorsa
    fs.readFile(`${__dirname}/html/${req.params.html}.html`, 'utf8', function (err, data) {
        risorsa = data
    })
    res.write(risorsa);
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
})