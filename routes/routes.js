'use strict';

module.exports = function(app) {
    var attractionController = require('./controllers/attraction');
    var recomendationController = require('./controllers/recomendation');
    var tiketcomController = require('./controllers/tiketcom');

    app.route('/')
        .get(attractionController.index);

    app.route('/attractions')
        .get(attractionController.attractions);

    app.route('/attractions/:attraction_category')
        .get(attractionController.findAttractionsByCategory);

    app.route('/attractions')
        .post(attractionController.createAttraction);

    app.route('/attractions')
        .put(attractionController.updateAttraction);

    app.route('/attractions')
        .delete(attractionController.deleteAttraction);

    app.route('/recomendation')
        .get(recomendationController.searchRecomendation);

    app.route('/nearestairport')
        .get(tiketcomController.getNearestAirport);
};