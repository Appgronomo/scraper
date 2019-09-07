// jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const $ = require("cheerio");
var accents = require("remove-accents");
var _ = require("lodash");
const siapScraper = require(__dirname + "/scraper/siapScraper.js");
const firaScraper = require(__dirname + "/scraper/firaScraper.js");


const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// GET Methods
app.get("/parser/siap/:grain/:year", (req, res) => {
    let grain = req.params.grain;
    let year = req.params.year;
    siapScraper.getSiapData(grain, year).then(siapData => {
        let dataArray = [];
        let dataLength = $("tr > td", siapData).length;
        for(let i = 0; i < 32; i++) {
            let dataRow = [];
            for(let k = i*9; k < i*9 + 9; k++) {
                data = $($("tr > td", siapData)[k]).text();
                dataRow.push(data);
            }
            let dataJson = {
                "id": dataRow[0],
                "entidad": dataRow[1],
                "superficieSembrada": dataRow[2],
                "superficieCosechada": dataRow[3],
                "superficieSiniestrada": dataRow[4],
                "produccion": dataRow[5],
                "rendimiento": dataRow[6],
                "pmr": dataRow[7],
                "valorProduccion": dataRow[8]
            }
            dataArray.push(dataJson);
        }
        res.json(dataArray);
    }).catch(err => {
        res.send("Error en la consulta");
    });
});

app.get("/parser/fira/risks", (req, res) => {
    firaScraper.getRiskData().then(data => {
        res.json(data);
    }).catch(err => {
        res.send("Error en la consulta");
    })
});

app.get("/parser/fira/allAgrocosts", (req, res) => {
    firaScraper.getAllAgrocosts().then(jsonArray => {
        res.json(jsonArray)
    }).catch(err => {
        res.send("Error en la consulta");
    })
});

app.get("/parser/fira/agrocosts/:cultivo", (req, res) => {
    let cultivo = accents.remove(_.lowerCase(req.params.cultivo));
    let estado = _.lowerCase(req.query.estado);
    firaScraper
        .getAllAgrocosts()
        .then(jsonArray => {
            filteredArray = jsonArray.filter(item => {
                if(estado) {
                    return accents.remove(_.lowerCase(item.Cultivo)) == cultivo &&
                           accents.remove(_.lowerCase(item.Estado)) == estado;                    
                } else {
                    return accents.remove(_.lowerCase(item.Cultivo)) == cultivo;
                }
            });
            res.json(filteredArray);
        })
        .catch(err => {
            res.send("Error en la consulta: " + err);
        });
});

app.post("/", (req, res) => {
    // CODE:
});

// Listening on port 3000
app.listen(3000, () => {
    console.log(
        "Server running on http://localhost:3000/. Listening on port 3000"
    );
});
