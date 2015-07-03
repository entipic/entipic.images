var core = require('entipic.core');
var Promise = core.Promise;
var _ = core._;
var util = require('util');
var S3 = require('aws-sdk').S3;
var internal = {};
var KEY_FORMAT = 'images/%s/%s.jpg';
var gm = require('./gm');

var external = module.exports;

/**
 * Create a new client
 */
external.create = function create(options) {
  var s3 = new S3(options);
  var bucket = options && options.bucket || process.env.S3_IMAGES_BUCKET;

  var client = {
    save: function(id, body, sizes) {
      return internal.save(client, id, body, sizes);
    },
    putObject: function(key, body) {
      var params = {
        Bucket: bucket,
        Key: key,
        CacheControl: 'public, max-age=' + (86400 * 30),
        ContentType: 'image/jpeg',
        Body: body,
        ACL: 'public-read'
      };

      return internal.put(s3, params);
    },
    dhash: function(data) {
      return gm.dhash(data);
    }
  };

  return client;
};

external.formatKey = function formatKey(size, id) {
  return util.format(KEY_FORMAT, size, id);
};

var SIZES = external.sizes = [{
  name: 'x',
  size: 25,
  quality: 85
}, {
  name: 'a',
  size: 50,
  quality: 85
}, {
  name: 'b',
  size: 100,
  quality: 80
}, {
  name: 'c',
  size: 150,
  quality: 80
}, {
  name: 'd',
  size: 200,
  quality: 80
}, {
  name: 'e',
  size: 250,
  quality: 80
}, {
  name: 'f',
  size: 300,
  quality: 90
}];

SIZES.reverse();

/**
 * Save image for all sizes
 */
internal.save = function(client, id, body, sizes) {
  sizes = sizes || SIZES;
  return Promise.resolve(sizes).each(function(size) {
    return gm.resize(body, size.size, size.quality).then(function(data) {
      var key = external.formatKey(size.name, id);
      return client.putObject(key, data);
    });
  });
};


/**
 * Upload image to S3
 */
internal.put = function(s3, params) {
  return new Promise(function(resolve, reject) {
    s3.putObject(params, function(err) {
      if (err) return reject(err);
      resolve();
    });
  });
};
