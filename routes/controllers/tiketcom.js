'use strict';

var response = require('../../db/res');
var Request = require("request");

https://api-sandbox.tiket.com/train_api/train_station?token=e5c768171ff1ac186b2881e90c7f976320d4c285&output=json

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

exports.searchTrain = function(req, res){
    Request.get('https://api-sandbox.tiket.com/search/train'+
    '?d=GMR&a=BD&date=2019-06-20&ret_date=&adult=1&child=0&class=all&'+
    'token=e5c768171ff1ac186b2881e90c7f976320d4c285&output=json', (err, resp, body) => {
        if(err) {
            return console.log(err);
        }
        console.log(JSON.parse(body));
        response.ok(JSON.parse(body), res)
    });    
};

exports.searchStation = function(req, res){
    Request.get('https://api-sandbox.tiket.com/train_api/train_station'+
    '?token=e5c768171ff1ac186b2881e90c7f976320d4c285&output=json', (err, resp, body) => {
        if(err) {
            return console.log(err);
        }
        console.log(JSON.parse(body));
        response.ok(JSON.parse(body), res)
    });    
};