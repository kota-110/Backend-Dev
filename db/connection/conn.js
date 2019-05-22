var neo4j = require('neo4j-driver').v1

var con = neo4j.driver('bolt://hobby-aekopbghpjjagbkeegcmcdcl.dbs.graphenedb.com:24787', neo4j.auth.basic('neo4j', 'b.BgRzwF0VdxcX.Vl83zESwaJbh9SKW'))
var session = con.session()

module.exports = session