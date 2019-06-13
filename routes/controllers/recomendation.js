'use strict';

var response = require('../../db/res');
var connection = require('../../db/connection/conn');

exports.searchRecomendation = function(req, res){
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
