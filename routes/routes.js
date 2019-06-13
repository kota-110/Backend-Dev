'use strict';

module.exports = function(app) {
    var attractionController = require('./controllers/attraction');
    var recomendationController = require('./controllers/recomendation');

    app.route('/')
        .get(attractionController.index);

    app.route('/attractions')
        .get(attractionController.attractions);

    app.route('/attractions/:attraction_name')
        .get(attractionController.findAttractionsByName);

    app.route('/attractions')
        .post(attractionController.createAttraction);

    app.route('/attractions')
        .put(attractionController.updateAttraction);

    app.route('/attractions')
        .delete(attractionController.deleteAttraction);

    app.route('/recomendation/:locations')
        .get(recomendationController.searchRecomendation);
};