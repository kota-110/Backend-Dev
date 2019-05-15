'use strict';

var response = require('./res');
var connection = require('./conn');
var queryResp = [];                     //array for storing array of response

exports.attractions = function(req, res){
    connection
    .run('MATCH(n: TempatWisata) RETURN n')
    .then(function(result){        
            result.records.forEach(function(record){                
                queryResp.push(record._fields[0].properties)                
            })
            response.ok(queryResp, res)
    })
    .catch(function(err){
        console.log(err)
    });
};

exports.index = function(req, res) {
    response.ok("Hello from the Node JS RESTful side!", res)
};