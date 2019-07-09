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

    app.route('/attractions/:attraction_name')
        .get(attractionController.findAttractionsByName);

    app.route('/attractions')
        .post(attractionController.createAttraction);

    app.route('/attractions')
        .put(attractionController.updateAttraction);

    app.route('/attractions')
        .delete(attractionController.deleteAttraction);

    app.route('/recomendation/:firstLat/:firstLng/:secondLat/:secondLng')
        .get(recomendationController.searchRecomendation);

    app.route('/nearestairport')
        .get(tiketcomService.getNearestAirport);

    app.route('/train')
        .get(tiketcomService.searchTrain);

    app.route('/station')
        .get(tiketcomService.searchStation);

    app.route('/poi')
        .get(recomendationController.pointOfInterest);

    app.route('/transportation')
        .get(recomendationController.transportation);

};