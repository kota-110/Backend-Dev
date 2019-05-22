var express = require('express'),
    app = express(),
    port = process.env.PORT || 3000,
    bodyParser = require('body-parser'),
    controller = require('./controllers/attractionController');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var routes = require('./router/attractionRouter');
routes(app);

app.listen(port);
console.log('RESTful Api server started on : ' + port);