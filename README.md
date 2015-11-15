Movily
======

CLI tool wich return a JSON object of every movie releasing this week or at a specific date.

Data are extracted from [SensCritique](http://senscritique.fr)

Installation
------------

  git clone https://github.com/yadomi/movily && cd movily
  npm install

Since this module use es2015 feature, you may need to install `babel-node`:

  npm install babel-cli

Usage
-----

```
babel-node app.js [DATE]
```
DATE can be any date in ISO-8601 format
Here's an example with today date:

```
$ babel-node app.js $(date --iso-8601)
[{"title":"Hunger Games : La Révolte, partie 2","release":"2015-11-18T00:00:00+01:00","description":"Alors que Panem est ravagé par une guerre désormais totale, Katniss et le Président Snow  vont s’affronter pour la dernière fois. Katniss et ses plus proches..."
...
```

You can pipe the ouput with `jq` to prettify or for parsing it

```
$ babel-node app.js 2015-11-15
[
{
  "title": "Hunger Games : La Révolte, partie 2",
  "release": "2015-11-18T00:00:00+01:00",
  "description": "Alors que Panem est ravagé par une guerre désormais totale, Katniss et le Président Snow  vont s’affronter pour la dernière fois. Katniss et ses plus proches...",
  "duration": 136,
  "poster": "http://media.senscritique.com/media/000011742196/150/Hunger_Games_La_Revolte_partie_2.jpg"
},
{
  "title": "Macbeth",
  "release": "2015-11-18T00:00:00+01:00",
  "description": "11e siècle : Ecosse. Macbeth, chef des armées, sort victorieux de la guerre qui fait rage dans tout le pays. Sur son chemin, trois sorcières lui prédisent...",
  "duration": 113,
  "poster": "http://media.senscritique.com/media/000012343914/150/Macbeth.jpg"
},
...
```
