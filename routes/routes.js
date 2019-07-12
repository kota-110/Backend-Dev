'use strict';

module.exports = function(app) {
    var attractionController = require('./controllers/attraction');
    var recomendationController = require('./controllers/recomendation');    
    var tiketcomService = require('../services/tiketcom');    

    app.route('/')
        .get(attractionController.index);

    app.route('/attractions')
        .get(attractionController.attractions);

    app.route('/attractions/:attraction_category')
        .get(attractionController.findAttractionsByCategory);

    app.route('/attractions/filter/:attraction_code')
        .get(attractionController.findAttractionsByCode);

    app.route('/attractions')
        .post(attractionController.createAttraction);

    app.route('/attractions')
        .put(attractionController.updateAttraction);

    app.route('/attractions')
        .delete(attractionController.deleteAttraction);

    app.route('/nearestairport')
        .get(tiketcomService.getNearestAirport);

    app.route('/train')
        .get(tiketcomService.searchTrain);

    app.route('/station')
        .get(tiketcomService.searchStation);

    app.route('/poi')
        .get(recomendationController.pointOfInterest);

    app.route('/recomendation/:firstLat/:firstLon/:secondLat/:secondLon')
        .get(recomendationController.searchRecomendation);

};