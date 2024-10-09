const hostname = '127.0.0.1';
const port = 12000;


var express = require('express');
var app = express();
var fs = require("fs");
const path = require("path");
app.use(express.static(path.join(__dirname, "static")));
var DB_json

var bodyParser = require('body-parser')
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function (req, res) {
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.status(200)

    const filePath = path.join(__dirname, "static", "html/home.html");
    res.write(fs.readFileSync(filePath, "utf-8"));

    res.end();
});

app.get('/:html', function (req, res) {
    res.setHeader('Content-Type', 'text/html');
    if (req.params.html == "yugioh") {
        res.setHeader('Content-Type', 'text/html; charset=utf-8');
        res.status(200)

        const filePath = path.join(__dirname, "static", "html/yugioh.html");
        res.write(fs.readFileSync(filePath, "utf-8"));

        res.end();
    }
    else if (req.params.html == "cardfightvanguard") {
        res.setHeader('Content-Type', 'text/html; charset=utf-8');
        res.status(200)

        const filePath = path.join(__dirname, "static", "html/cardfightvanguard.html");
        res.write(fs.readFileSync(filePath, "utf-8"));

        res.end();
    }
    else if (req.params.html == "lordoftherings") {
        res.setHeader('Content-Type', 'text/html; charset=utf-8');
        res.status(200)

        const filePath = path.join(__dirname, "static", "html/lordoftherings.html");
        res.write(fs.readFileSync(filePath, "utf-8"));

        res.end();
    }
    else if (req.params.html == "magicthegathering") {
        res.setHeader('Content-Type', 'text/html; charset=utf-8');
        res.status(200)

        const filePath = path.join(__dirname, "static", "html/magicthegathering.html");
        res.write(fs.readFileSync(filePath, "utf-8"));

        res.end();
    }
    else if (req.params.html == "pokemon") {
        res.setHeader('Content-Type', 'text/html; charset=utf-8');
        res.status(200)

        const filePath = path.join(__dirname, "static", "html/pokemon.html");
        res.write(fs.readFileSync(filePath, "utf-8"));

        res.end();
    }
    else if (req.params.html == "dragonball") {
        res.setHeader('Content-Type', 'text/html; charset=utf-8');
        res.status(200)

        const filePath = path.join(__dirname, "static", "html/dragonball.html");
        res.write(fs.readFileSync(filePath, "utf-8"));

        res.end();
    }
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
})