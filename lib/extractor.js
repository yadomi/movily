'use strict';

const moment = require('moment');

exports.getTitle = function(movie){
  const selector = '.elco-title a';
  return movie.find(selector).text();
};

exports.getDescription = function(movie){
  const selector = '.elco-description';
  return movie.find(selector).text();
};

exports.getReleaseDate = function(movie) {
  const selector = '.elco-baseline time[datetime]';
  const release = movie.find(selector).text();
  return moment(release, 'D MMMM YYYY', 'fr').format();
};

exports.getDuration = function(movie) {
  const selector = '.elco-baseline.elco-options';
  const duration = movie.find(selector).text().trim().split('\n')[0];
  if (!duration.match(/\d{1}\sh\s\d{2}\smin./)) return '';
  const m = moment(duration, 'H [h] mm [min.]');
  return (m.hour()*60) + m.minute();
};

exports.getPosterURL = function(movie) {
  const selector = 'figure[class^=\'d-media\'] .d-link img';
  return movie.find(selector).attr('src');
};