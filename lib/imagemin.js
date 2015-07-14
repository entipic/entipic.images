'use strict';

var Imagemin = require('imagemin');
var Promise = require('entipic.core').Promise;

module.exports = function(file) {
	return new Promise(function(resolve, reject) {
		try {
			new Imagemin()
				.src(file)
				.use(Imagemin.jpegtran({
					progressive: true
				}))
				.run(function(err, files) {
					if (err) {
						return reject(err);
					}
					resolve(files[0].contents);
				});
		} catch (e) {
			reject(e);
		}
	});
};
