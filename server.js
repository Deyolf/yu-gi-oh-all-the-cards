const hostname = '0.0.0.0';
const port = 5000;

var express = require('express');
var app = express();
var fs = require("fs");
const path = require("path");
app.use(express.static(path.join(__dirname, "static")));

let Pokemon_Api

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
    else if (req.params.html == "deck") {
        res.setHeader('Content-Type', 'text/html; charset=utf-8');
        res.status(200)

        const filePath = path.join(__dirname, "static", "html/deck.html");
        res.write(fs.readFileSync(filePath, "utf-8"));

        res.end();
    }
})
app.get('/api/pokemon', function (req, res) {
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    res.write(JSON.stringify(Pokemon_Api))
    res.end()
})
var server = app.listen(port, hostname, () => {
    fs.readFile(__dirname + "/apis/pokemon.json", 'utf8', function (err, data) {
        let items = []
        Pokemon_Api = JSON.parse(data)
        /* Pokemon_Api.forEach(card => {
            fetch('https://api.tcgdex.net/v2/en/cards/' + card.id)
                .then(response => response.json())
                .then(data => {
                    dataconvertita = JSON.parse(dataconvertita)
                    item = { category: dataconvertita.category, id: dataconvertita.id, illustrator: dataconvertita.illustrator, image: dataconvertita.image, name:dataconvertita.name, rarity: dataconvertita.rarity }
                    console.log(item)
                })
                .catch(error => console.error('Errore durante il recupero delle carte:', error));
        }); */
    })
    console.log(`Express App running at http://${hostname}:${port}/`);
})