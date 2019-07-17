'use strict';

exports.okrecomendation = function(values, res) {
  var data = {
      'status': 200,
      'recomendation': values
  };
  res.json(data);
  res.end();
};

exports.okpoi = function(values, res) {
  var data = {
      'status': 200,
      'poi': values
  };
  res.json(data);
  res.end();
};