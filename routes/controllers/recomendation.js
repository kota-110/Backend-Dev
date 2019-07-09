'use strict';

const Recomendations = require('../../core/recomendations');

var response = require('../../db/res');
var connection = require('../../db/connection/conn');


// var firstLat = -6.859301
// var firstLng = 107.595003
// var secondLat = -6.872452
// var secondLng = 107.574087

exports.searchRecomendation = function(req, res){

    var firstLat = req.params.firstLat
    var firstLng = req.params.firstLng
    var secondLat = req.params.secondLat
    var secondLng = req.params.secondLng

    var query = "MATCH (start:PointOfInterest{lat:"+firstLat+
    ", lon:"+firstLng+
    "}), (end:PointOfInterest{lat:"+secondLat+
    ", lon:"+secondLng+
    "})CALL algo.shortestPath.stream(start, end, 'distance', {relationshipQuery: 'NEXT', nodeQuery:'Routing', defaultValue:1.0}) YIELD nodeId, cost RETURN {name: algo.asNode(nodeId).name, lat: algo.asNode(nodeId).lat, lng: algo.asNode(nodeId).lon, transportation: algo.asNode(nodeId).transportation, transportationCost: algo.asNode(nodeId).transportationCost, distance: cost, NodeID: ID(algo.asNode(nodeId))}";

    var routeResp = [];
    var queryResp = [];

    let recomendations = new Recomendations("trans");
    let transportationResult = []

    connection
    .run(query)
    .then(function(result){        
            result.records.forEach(function(record){                                
                routeResp.push(record._fields[0])                
            })
            //queryResp.push("distance : "+routeResp[routeResp.length - 1]["distance"])            
            //routeResp.push(recomendations.getTransportationRoute(routeResp))
            // for (let i in routeResp){
            //     console.log(routeResp[i])
            // }
            // transportationResult.push(recomendations.getTransportationRoute(routeResp))
            // for (let i in transportationResult){
            //     console.log(transportationResult[i])
            // }          
            //console.log(routeResp);   
            response.ok(routeResp, res)
    })
    .catch(function(err){
        console.log(err)
    });
    
};

exports.transportation = function(req, res){
    let recomendations = new Recomendations()
    let transportationList = recomendations.searchTransportation()    

    for (var item in transportationList){        
        console.log(item)
    }

}

exports.pointOfInterest = function(req, res){
    connection
    .run("MATCH(n: PointOfInterest) RETURN n")
    .then(function(result){        
            result.records.forEach(function(record){                
                queryResp.push(record._fields[0].properties)                
            })
            response.ok(queryResp, res)
    })
    .catch(function(err){
        console.log(err)
    });
    var queryResp = [];
};