const fetch = require("node-fetch");
const request = require("request");
const csv = require("csvtojson");

exports.getRiskData = async (grain, year) => {
    var url = "https://www.fira.gob.mx/Nd/riesgosSAB.json";
    var headers = {
        accept: "*/*",
        "accept-language": "es-ES,es;q=0.9,en;q=0.8",
        "cache-control": "no-cache",
        "content-type": "application/json",
        pragma: "no-cache",
        "sec-fetch-mode": "cors",
    };

    let response = await fetch(url, {
        method: "GET",
        headers: headers,
        mode: "cors"
    });

    let jsonResponse = await response.json();
    // console.log(jsonResponse);
    return jsonResponse;
};


exports.getAllAgrocosts = async () => {
    let jsonObj = await csv().fromStream(
        request.get("https://www.fira.gob.mx//Nd/agrocosto_data_completa.csv")
    );

    return jsonObj;
}
