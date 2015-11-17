'use strict';

const moment = require('moment');
const request = require('request');
const cheerio = require('cheerio');

const extractor = require('./extractor.js');

const getURL = function(week, year){
  return `http://www.senscritique.com/films/sorties-cinema/${year}/semaine/${week}`;
};

const createMovie = function(movie){
  return {
        title: extractor.getTitle(movie),
        release: extractor.getReleaseDate(movie),
        description: extractor.getDescription(movie),
        duration: extractor.getDuration(movie),
        poster: extractor.getPosterURL(movie)
  };
};

exports.getReleasingMovies = function(date){
  date = moment(date);
  const MOVIES = [];

  return new Promise((resolve, reject) => {
    request(getURL(date.week(), date.year()), (err, res, html) => {
      if (err) reject(err);

      const $ = cheerio.load(html);
      const data = $('.elpr-list');

      const movies = data.children('.elpr-item');
      movies.each((index, movie) => {
        MOVIES.push(createMovie($(movie)));
      });

      resolve(MOVIES);

    });
  });

};
