'use strict';

var response = require('../../db/res');
var Request = require("request");

exports.getNearestAirport = function(req, res){
    Request.get('http://api-sandbox.tiket.com/flight_api/'
    +'getNearestAirport?token=9b1ed923b0615f475d0a9d2fa7c25edf8969f4b8&'
    +'latitude=-6.195062&longitude=106.803181&output=json', (err, resp, body) => {
        if(err) {
            return console.log(err);
        }
        console.log(JSON.parse(body));
        response.ok(JSON.parse(body), res)
    });    
};
