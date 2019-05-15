var neo4j = require('neo4j-driver').v1

var con = neo4j.driver('bolt://localhost:7687', neo4j.auth.basic('neo4j', 'neopass'))
var session = con.session()

module.exports = session