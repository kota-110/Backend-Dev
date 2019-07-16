class Recomendations{        

    constructor(){
        this.route = {}
    }
    
    getTransportation() {
        const connection = require('../db/connection/conn');                
        const TransportationRoute = require('../core/transportationRoute')
        var queryResp = [];

        let tRoute = new TransportationRoute()

        connection
        .run("MATCH (n:Transportation) RETURN {jurusan: n.jurusan, trayek: n.trayek}")
        .then(function(result){
                result.records.forEach(function(record){                                    
                    queryResp.push(record._fields[0])                    
                })                   
        })
        .catch(function(err){
            console.log(err)
        });                
        return tRoute.getTRoute()
    };

    setTransportationRoute(){
        transportationList["Cibogo Caheum"] = [21,22,26,30]
        transportationList["Sarijadi Cibogo"] = [6,7,11,12,13,14,15,19]
        transportationList["Polban Sarijadi"] = [5,6,7,8,9,10,18,19]        
        transportationList["Gerlong Polban"] = [1,2,3,5,6]        
    }

    createRouteResponse(distance, nodes){
        var routeResp = {}
        routeResp['distance'] = distance
        routeResp['nodes'] = nodes            
        this.route = routeResp

        console.log(this.route)

        return this.route
    }        

    searchRecomendation() {        

        let firstLat = 52.50931
        let secondLon = 13.43872
        let firstLon = 13.42936
        let secondLat = 52.50274

        let request = require("request"); 
        let response = require('../db/res');

        let distance, nodes
        
        request.get('https://api.tomtom.com/routing/1/calculateRoute/'+
        firstLat +','+ firstLon +':'+ secondLat +','+ secondLon + 
        "/json?routeType=shortest&avoid=unpavedRoads&avoid=motorways&key=ohR9cyh0INyGsybHv3xYlNEbA5vAyFhV", 
        (err, resp, body) => {
            if(err) {
                return console.log(err);
            }                                             
            distance = JSON.parse(body)['routes'][0]['summary']['lengthInMeters']
            nodes = JSON.parse(body)['routes'][0]['legs'][0]['points']            

            // console.log(this.createRouteResponse(distance, nodes))            
            response.ok('haha', resp)
        });
        return this.route
    }
}

module.exports = Recomendations