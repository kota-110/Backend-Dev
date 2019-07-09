class Recomendations{
    
    constructor(){
        let transportationList = {}
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

    searchTransportation() {
        return this.transportationList
    }

}

module.exports = Recomendations