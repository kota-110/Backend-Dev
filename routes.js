'use strict';

module.exports = function(app) {
    var attractionList = require('./controller');

    app.route('/')
        .get(attractionList.index);

    app.route('/attractions')
        .get(attractionList.attractions);
};