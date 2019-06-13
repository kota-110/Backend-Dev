'use strict';

var response = require('../../db/res');
var connection = require('../../db/connection/conn');

var firstLat = -6.8715552
var firstLng = 107.5940509
var secondLat = -6.8703438
var secondLng = 107.5917527

var query = "MATCH (start:PointOfInterest{lat:"+firstLat+
            ", lon:"+firstLng+
            "}), (end:PointOfInterest{lat:"+secondLat+
            ", lon:"+secondLng+
            "})CALL algo.shortestPath.stream(start, end, 'distance') YIELD nodeId, cost RETURN {name: algo.asNode(nodeId).name, lat: algo.asNode(nodeId).lat, lng: algo.asNode(nodeId).lon, cost: cost}"

exports.searchRecomendation = function(req, res){
    connection
    .run(query)
    .then(function(result){        
            result.records.forEach(function(record){                
                queryResp.push(record._fields)
                //console.log(record._fields)
            })
            response.ok(queryResp, res)
    })
    .catch(function(err){
        console.log(err)
    });
    var queryResp = [];
};