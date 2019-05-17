'use strict';

var response = require('./res');
var connection = require('./conn');
var queryResp = [];                     //array for storing array of response

exports.attractions = function(req, res){
    connection
    .run("MATCH(n: TempatWisata) RETURN n")
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

exports.findAttractionsByName = function(req, res){

    var keyword = req.params.attraction_name;

    connection
    .run("MATCH (t:TempatWisata) WHERE t.NamaTempatWisata =~ '.*(?i)"+keyword+".*' RETURN t")
    .then(function(result){        
            result.records.forEach(function(record){                
                queryResp.push(record._fields[0].properties)                
            })
            response.ok(queryResp, res);            
    })
    .catch(function(err){
        console.log(err)
    });
    var queryResp = [];
};

exports.createAttraction = function(req, res) {
    
    var attraction_name = req.body.attraction_name;
    var attraction_desc = req.body.attraction_desc;
    var attraction_lat = req.body.attraction_lat;
    var attraction_lng = req.body.attraction_lng;

    connection
    .run("CREATE (t:TempatWisata { NamaTempatWisata: '"+attraction_name+
                                "', DeskripsiTempatWisata: '"+attraction_desc+
                                "', Latitude: '"+attraction_lat+
                                "', Longitude: '"+attraction_lng+"'})")
    .then(function(result){    
            response.ok("Berhasil menambahkan Tempat Wisata!", res);    
            connection.close();            
    })
    .catch(function(err){
        console.log(err)
    });
};

exports.deleteAttraction = function(req, res) {
    
    var attraction_name = req.body.attraction_name;

    connection
    .run("MATCH (t:TempatWisata { NamaTempatWisata: '"+ attraction_name +"' }) DELETE t")
    .then(function(result){    
            response.ok("Berhasil menghapus Tempat Wisata!", res);    
            connection.close();            
    })
    .catch(function(err){
        console.log(err)
    });
};

exports.index = function(req, res) {
    response.ok("Hai Gais !", res)
};