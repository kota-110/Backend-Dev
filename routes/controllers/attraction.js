'use strict';

var response = require('../../db/res');
var connection = require('../../db/connection/conn');
let queryResp = []

exports.attractions = function(req, res){
    connection
    .run("MATCH(n: TempatWisata) RETURN n")
    .then(function(result){        
            result.records.forEach(function(record){                
                queryResp.push(record._fields[0].properties)                
            })
            response.okpoi(queryResp, res)
    })
    .catch(function(err){
        console.log(err)
    });
    var queryResp = [];
};

exports.findAttractionsByCategory = function(req, res){

    var keyword = req.params.attraction_category;
    
    connection
    .run("MATCH (t:TempatWisata) WHERE t.kategoriWisata =~ '.*(?i)"+keyword+".*' RETURN t")
    .then(function(result){        
            result.records.forEach(function(record){                
                queryResp.push(record._fields[0].properties)                
            })
            response.okpoi(queryResp, res);            
    })
    .catch(function(err){
        console.log(err)
    });
    var queryResp = [];
};

exports.findAttractionsByCode = function(req, res){

    var keyword = req.params.attraction_code;

    let temp = []   
    let promises = [] 
    let exLength = 4

    for (let i=2;i<=exLength;i++){
        promises.push(connection.run("MATCH (t:TempatWisata) WHERE t.kdWisata = '0"+i+"' RETURN t"))
    }        
    
    connection.run("MATCH (t:TempatWisata) WHERE t.kdWisata = '"+keyword+"' RETURN t")    
    .then(function(result){                    
            result.forEach(function(record){                
                queryResp.push(record._fields[0].properties)                                                
            })
            response.okpoi(queryResp, res);
    })
    .catch(function(err){
        console.log(err)
    });    
};

exports.createAttraction = function(req, res) {
    
    var attraction_name = req.body.attraction_name;
    var attraction_desc = req.body.attraction_desc;
    var attraction_lat = req.body.attraction_lat;
    var attraction_lng = req.body.attraction_lng;
    var attraction_photo = req.body.attraction_photo;
    var attraction_category = req.body.attraction_category;
    var attraction_address = req.body.attraction_address;
    var attraction_open = req.body.attraction_open;
    var attraction_closed = req.body.attraction_closed;
    var attraction_code = req.body.attraction_code;
    var attraction_facility = req.body.attraction_facility;

    connection
    .run("CREATE (t:TempatWisata { namaWisata: '"+attraction_name+
                                "', deskripsi: '"+attraction_desc+
                                "', latitude: '"+attraction_lat+
                                "', longitude: '"+attraction_lng+
                                "', alamat: '"+attraction_address+
                                "', fasilitas: '"+attraction_facility+
                                "', kdWisata: '"+attraction_code+
                                "', jamBuka: '"+attraction_open+
                                "', jamTutup: '"+attraction_closed+
                                "', kategoriWisata: '"+attraction_category+
                                "', imageUrl: '"+attraction_photo+"'})")
    .then(function(result){    
            response.okpoi("Berhasil menambahkan Tempat Wisata!", res);    
            connection.close();            
    })
    .catch(function(err){
        console.log(err)
    });
};

exports.updateAttraction = function(req, res) {
    
    var attraction_code = req.body.attraction_code;             //current attrac
    // var attraction_updt_code = req.body.attraction_updt_code;
    var attraction_updt_name = req.body.attraction_updt_name;            //updated attraction name
    var attraction_updt_desc = req.body.attraction_updt_desc;            //updated attraction desc
    var attraction_updt_lat = req.body.attraction_updt_lat;              //updated attraction latitude
    var attraction_updt_lng = req.body.attraction_updt_lng;              //updated attraction longitude
    var attraction_updt_photo = req.body.attraction_updt_photo;              //updated attraction photo
    var attraction_updt_category = req.body.attraction_updt_category;
    var attraction_updt_address = req.body.attraction_updt_address;
    var attraction_updt_open = req.body.attraction_updt_open;
    var attraction_updt_closed = req.body.attraction_updt_closed;    
    var attraction_updt_facility = req.body.attraction_updt_facility;


    connection
    .run("MATCH (t { kdWisata: '"+ attraction_code
    +"' }) SET t = { namaWisata: '"+ attraction_updt_name
    +"', deskripsi: '"+ attraction_updt_desc
    +"', latitude: '"+ attraction_updt_lat
    +"', longitude: '"+ attraction_updt_lng
    +"', imageUrl: '"+ attraction_updt_photo
    +"', kdWisata: '"+ attraction_code
    +"', fasilitas: '"+ attraction_updt_facility
    +"', alamat: '"+ attraction_updt_address
    +"', jamBuka: '"+ attraction_updt_open
    +"', jamTutup: '"+ attraction_updt_closed
    +"', kategoriWisata: '"+ attraction_updt_category
    +"' }")
    .then(function(result){    
            response.okpoi("Berhasil memperbarui Tempat Wisata!", res);    
            connection.close();            
    })
    .catch(function(err){
        console.log(err)
    });
};

exports.deleteAttraction = function(req, res) {
    
    var attraction_name = req.body.attraction_name;

    connection
    .run("MATCH (t:TempatWisata { namaWisata: '"+ attraction_name +"' }) DELETE t")
    .then(function(result){    
            response.okpoi("Berhasil menghapus Tempat Wisata!", res);    
            connection.close();            
    })
    .catch(function(err){
        console.log(err)
    });
};

exports.index = function(req, res) {
    response.okpoi("Hai Gais !", res)
};