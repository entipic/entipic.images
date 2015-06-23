var _ = require('entipic.core')._;
var Client = require('./client');
var instance;
var external = module.exports;

/**
 * Create a new client
 */
external.create = Client.create;

/**
 * Supported sizes
 */
external.sizes = _.cloneDeep(Client.sizes);

/**
 * Singleton instance
 */
external.instance = function(options) {
  if (!instance) {
    instance = external.create(options);
  }
  
  return instance;
};
