// jshint esversion:6

const fetch = require("node-fetch");

exports.getSiapData = async (grain, year) => {
    var url = "https://nube.siap.gob.mx/cierreagricola/";
    var headers = {
        accept: "*/*",
        "accept-language": "es-ES,es;q=0.9,en;q=0.8",
        "cache-control": "no-cache",
        "content-type": "application/x-www-form-urlencoded",
        pragma: "no-cache",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-origin"
    };

    var data;

    if(grain == "maiz") {
        data =
        "xajax=reporte&xajaxr=1567837258991&xajaxargs[]=5&xajaxargs[]="+ year +"&xajaxargs[]=225&xajaxargs[]=%3Cxjxobj%3E%3C%2Fxjxobj%3E&xajaxargs[]=0&xajaxargs[]=%3Cxjxobj%3E%3C%2Fxjxobj%3E&xajaxargs[]=2&xajaxargs[]=3&xajaxargs[]=2&xajaxargs[]=undefined&xajaxargs[]=1&xajaxargs[]=%3Cxjxobj%3E%3C%2Fxjxobj%3E";
    } else if(grain == "trigo") {
        data =
            "xajax=reporte&xajaxr=1567848958298&xajaxargs[]=5&xajaxargs[]=" + year + "&xajaxargs[]=395&xajaxargs[]=%3Cxjxobj%3E%3C%2Fxjxobj%3E&xajaxargs[]=0&xajaxargs[]=%3Cxjxobj%3E%3C%2Fxjxobj%3E&xajaxargs[]=2&xajaxargs[]=3&xajaxargs[]=2&xajaxargs[]=undefined&xajaxargs[]=1&xajaxargs[]=%3Cxjxobj%3E%3C%2Fxjxobj%3E";
    }

    let response = await fetch(url, {
        method: "POST",
        headers: headers,
        body: data,
        mode: "cors"
    });

    let xmlResponse = await response.textConverted();
    // console.log(xmlResponse);
    return xmlResponse;
};