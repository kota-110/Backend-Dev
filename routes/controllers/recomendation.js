'use strict';

let response = require('../../db/res');
let connection = require('../../db/connection/conn');
let request = require("request"); 

let possibleTransportationsMap = {}
let segmentCoordinates = []

function getSingleWayIdDatabase(segmentCoordinates){                        
        return new Promise(function(resolve, reject){            
            let query = "MATCH (n:OSMNode) WHERE distance(point({latitude: n.lat, longitude: n.lon}), point({latitude: "+segmentCoordinates[1]+", longitude: "+segmentCoordinates[0]+"})) < 20 WITH n AS result ORDER BY n ASC LIMIT 1 MATCH (ow:OSMWay)-[:FIRST_NODE]->(:OSMWayNode)-[r:NEXT*0..1000]->(ownb:OSMWayNode)-[:NODE]->(result) return ID(ow)"
            connection        
                .run(query)
                .then(function(result){      
                    result.records.forEach(function(record){                                                                    
                        resolve(record._fields[0])
                    })                              
                    connection.close();
                })
                .catch(function(err){
                    console.log(err)
                    return reject(err)
                });        
        });
}

function getWayNames(wayId){
    return new Promise(function(resolve, reject){            
        let query = "MATCH (w:OSMWay) where ID(w) ="+wayId+" return w"
        connection        
            .run(query)
            .then(function(result){      
                result.records.forEach(function(record){                                                                    
                    resolve(record._fields[0].properties.name)
                })                              
                connection.close();
            })
            .catch(function(err){
                console.log(err)
                return reject(err)
            });        
    });
}

function getSingleWayTransportation(databaseWayId){
    let transportations = []
    return new Promise(function(resolve, reject){
        let query = "MATCH (w:OSMWay) where ID(w) = "+databaseWayId
                    +" MATCH (r:OSMRelation)-[:MEMBER]->(w) return r"
        connection        
            .run(query)
            .then(function(result){      
                result.records.forEach(function(record){
                    transportations.push(record._fields[0].properties.name)                    
                })                              
                resolve(transportations)
                connection.close();
            })
            .catch(function(err){
                console.log(err)
                return reject(err)
            });        
    });
}

async function getTransportations (segmentCoordinates){    
    let tempDbWayId = 0
    let tempTransportation
    let tempWayNames

    for (let i=0;i<segmentCoordinates.length;i++){
        tempDbWayId = await getSingleWayIdDatabase(segmentCoordinates[i])        
        // console.log(tempDbWayId['low'])
        tempWayNames = await getWayNames(tempDbWayId)
        if (tempWayNames == undefined){
            tempWayNames = "noname"
        }
        // console.log(tempWayNames)
        tempTransportation = await getSingleWayTransportation(tempDbWayId['low'])
        // console.log(tempTransportation)
        possibleTransportationsMap[tempWayNames] = tempTransportation
    }

    return new Promise(function(resolve, reject){        
        resolve(possibleTransportationsMap)
    })        
}

function filterTransportation(possibleTransportationsMap){    
    let valueToStr, temp
    let tempTransportationMap = {}                  // Map for storing transportation name as key and number of emerge as value
    let transportationArray = []                    // array for storing all possible transportation
    let possibleTransportationsMapKeys = []

    for (let i=0, keys = Object.keys(possibleTransportationsMap), ii = keys.length;i<ii;i++){        //looping for storing all of transportation into array
        possibleTransportationsMapKeys.push(keys[i])
        valueToStr = possibleTransportationsMap[keys[i]] + ''
        let arrayOfVal = valueToStr.split(",")
        for (let j=0;j<arrayOfVal.length;j++){
            if (transportationArray.includes(arrayOfVal[j]) == false 
            && arrayOfVal[j] != '' ){
                transportationArray.push(arrayOfVal[j])
            }            
        }
    }

    for (let i=0;i<transportationArray.length;i++){                     //looping for constructing tempTransportation map with name of transportation as a key and way as values
        tempTransportationMap[transportationArray[i]] = []
    }

    for (let i=0, keys = Object.keys(possibleTransportationsMap), ii = keys.length;i<ii;i++){        //looping for storing all of transportation into array
        valueToStr = possibleTransportationsMap[keys[i]] + ''
        let arrayOfVal = valueToStr.split(",")
        for (let j=0;j<arrayOfVal.length;j++){
            for (let k=0;k<transportationArray.length;k++){
                if (transportationArray[k] == arrayOfVal[j]){                                         
                    tempTransportationMap[transportationArray[k]].push(keys[i])
                }
            }
        }
    }
    
    let tempKeys = []                                                                   //sorting
    let tempValues = []    
    for (let i=0, keys = Object.keys(tempTransportationMap), ii = keys.length;i<ii;i++){
        tempKeys.push(keys[i])
        tempValues.push(tempTransportationMap[keys[i]])
    }

    for (let i=0; i<tempValues.length; i++){
        for (let j=0; j<tempValues.length-1-i;j++){
            if (tempValues[j].length < tempValues[j+1].length){
                temp = tempValues[j]
                tempValues[j] = tempValues[j+1]
                tempValues[j+1] = temp

                temp = tempKeys[j]
                tempKeys[j] = tempKeys[j+1]
                tempKeys[j+1] = temp
            }
        }
    }

    for (let i=0;i<tempKeys.length;i++){                     //looping for constructing tempTransportation map with name of transportation as a key and way as values
        tempTransportationMap[tempKeys[i]] = tempValues[i]
    }

    // for (let i=0, keys = Object.keys(tempTransportationMap), ii = keys.length;i<ii;i++){
    //     console.log("key : "+keys[i])
    //     console.log("value : "+tempTransportationMap[keys[i]])
    // }

    // tempValues[1].splice(0,1)
    let index = 0
    for (let h=0;h<tempKeys.length;h++){
        for (let i=h+1;i<tempKeys.length;i++){
            for (let j=0;j<tempValues[h].length;j++){
                for (let k=0;k<tempValues[i].length;k++){
                    if (tempValues[h][j] == tempValues[i][k]){
                        index = tempValues[i][k]
                        tempValues[i].splice(index,1)
                    }
                }                
            }        
        }
    }            

    let finalTransportationMap = {}
    for (let i=0, keys = Object.keys(tempTransportationMap), ii = keys.length;i<ii;i++){        
        if (tempTransportationMap[keys[i]].length > 0){
            finalTransportationMap[tempTransportationMap[keys[i]]] = keys[i]
            // console.log(tempTransportationMap[keys[i]]+" : "+keys[i])
        }
    }

    return finalTransportationMap
}

exports.searchRecomendation = async function(req, res){
    
    let firstLat = req.params.firstLat;
    let firstLon = req.params.firstLon;
    let secondLat = req.params.secondLat;
    let secondLon = req.params.secondLon;    

    let pathNode = []
    let ways = []
    let segmentWayPoints = []       //just storing first segment waypoints from a segment
    let recomendationsResp = {}            
    let distance, nodesTemp
    let nodes = []
    let nodesObj
    
    request.get(process.env.BASE_ORS+"&start="+firstLon+","+firstLat+"&end="+secondLon+","+secondLat+"", 
    (err, resp, body) => {
        if(err) {
            return console.log(err);
        }
        distance = JSON.parse(body)['features'][0]['properties']['segments'][0]['distance']
        nodesTemp = JSON.parse(body)['features'][0]['geometry']['coordinates']

        for (let i=0; i<nodesTemp.length;i++){
            nodesObj = {
                latitude: nodesTemp[i][0],
                longitude: nodesTemp[i][1]
            }
            nodes.push(nodesObj)
        }

        for (let i=0;i<JSON.parse(body)['features'][0]['properties']['segments'][0]['steps'].length;i++){
            ways.push(JSON.parse(body)['features'][0]['properties']['segments'][0]['steps'][i]['name'])
            pathNode.push(JSON.parse(body)['features'][0]['properties']['segments'][0]['steps'][i]['way_points'])
            segmentWayPoints.push(JSON.parse(body)['features'][0]['properties']['segments'][0]['steps'][i]['way_points'][0])
        }
        
        for (let i=0;i<segmentWayPoints.length;i++){
            segmentCoordinates.push(JSON.parse(body)['features'][0]['geometry']['coordinates'][segmentWayPoints[i]])
        }
 
        getTransportations(segmentCoordinates).then(function(possibleTransportationsMap){                    
            possibleTransportationsMap = filterTransportation(possibleTransportationsMap)            

            recomendationsResp['total_biaya'] = Object.keys(possibleTransportationsMap).length * 2000
            recomendationsResp['total_jarak'] = distance    
            recomendationsResp['path'] = nodes
            recomendationsResp['path_node'] = pathNode
            recomendationsResp['ways'] = ways            
            // recomendationsResp['way point every segment'] = segmentWayPoints
            // recomendationsResp['Coordinate in Segments'] = segmentCoordinates
            recomendationsResp['transportations'] = possibleTransportationsMap

            response.okrecomendation(recomendationsResp, res)
        })        
    });
};

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