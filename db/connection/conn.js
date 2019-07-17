var neo4j = require('neo4j-driver').v1
require('dotenv').config();

var con = neo4j.driver(process.env.NEO_BOLT_URL, neo4j.auth.basic(process.env.NEO_USERNAME, process.env.NEO_PASSWORD_LOCAL))
var session = con.session()

module.exports = session