'use strict';

const request = require('request');
const cheerio = require('cheerio');
const moment = require('moment');
const extractor = require('./lib/extractor.js');

let MOVIES = [];

let args = process.argv.slice(2);
let inputDate = moment(args[0]);
if (inputDate.isValid() === false) process.exit(1);

var [WEEK, YEAR] = [inputDate.week(), inputDate.year()];

let getURL = function(week, year){
  return `http://www.senscritique.com/films/sorties-cinema/${year}/semaine/${week}`;
};

request(getURL(WEEK, YEAR), function(err, res, html){
  if (err) return;

  const $ = cheerio.load(html);
  const data = $('.elpr-list');

  let movies = data.children('.elpr-item');
  movies.each(function(index, movie){
    let $movie = $(movie);

    MOVIES.push({
      title: extractor.getTitle($movie),
      release: extractor.getReleaseDate($movie),
      description: extractor.getDescription($movie),
      duration: extractor.getDuration($movie),
      poster: extractor.getPosterURL($movie)
    });

  });

  console.log(JSON.stringify(MOVIES));

});

