var core = require('entipic.core');
var Promise = core.Promise;
var gm = require('gm');
var dhash = require('dhash');

var external = module.exports;

/**
 * Resize an image
 */
external.resize = function(data, size, quality) {
  return new Promise(function(resolve, reject) {
    gm(data)
      .noProfile()
      .quality(quality || 90)
      //.sharpen(0, 2)
      .resize(size, size, '^')
      .gravity('Center')
      .crop(size, size)
      //.unsharp(0)
      .toBuffer('jpg', function(error, stream) {
        if (error) return reject(error);
        resolve(stream);
      });
  });
};

/**
 * Get image dhash
 */
external.dhash = function(data) {
  return new Promise(function(resolve, reject) {
    try {
      dhash(data, function(error, hash) {
        if (error) return reject(error);
        resolve(hash.toLowerCase());
      });
    } catch (e) {
      reject(e);
    }
  });
};
