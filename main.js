'use strict';

var Mocha = require('mocha');
var fs = require('fs');
var path = require('path');
var testFiles = undefined;

var watchFiles = Mocha.utils.files(path.join(process.cwd(), '..')).filter(function (name) {
  return name !== __filename;
});

Mocha.utils.watch(watchFiles, function () {
  window.location.reload();
});

function findAllSpecfiles() {
  var walk = function(dir, done) {
    var results = [];
    fs.readdir(dir, function(err, list) {
      if (err) return done(err);
      var pending = list.length;
      if (!pending) return done(null, results);
      list.forEach(function(file) {
        file = dir + '/' + file;
        fs.stat(file, function(err, stat) {
          if (stat && stat.isDirectory()) {
            walk(file, function(err, res) {
              results = results.concat(res);
              if (!--pending) done(null, results);
            });
          } else {
            results.push(file);
            if (!--pending) done(null, results);
          }
        });
      });
    });
  };

  walk('.',function(err,files){
    testFiles=files.filter(function (name) {
      return (/^\..*\.spec.js$/).test(name);
    });
    runTestsAndWatch();
  });
}

function runTestsAndWatch() {
  watchFiles.forEach(function (file) {
    delete require.cache[file];
  });

  var mocha = new Mocha();
  mocha.reporter('html');
  mocha.ui('bdd');

  var query = Mocha.utils.parseQuery(window.location.search || '');
  if (query.grep) mocha.grep(query.grep);
  if (query.invert) mocha.invert();

  mocha.files = testFiles;

  mocha.run(function () {
    Mocha.utils.highlightTags('code');
    console.log('Waiting for changes...');
  });
};

exports.run = function() {
  findAllSpecfiles();
};
