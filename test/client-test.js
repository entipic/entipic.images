'use strict';

var assert = require('assert');
var images = require('../lib');
var client = images.create();

describe('Client', function() {
	describe('formatKey', function() {
		it('ok', function() {
			assert.equal('323f/a/323f4f34f34f35.jpg', client.formatKey('a', '323f4f34f34f35'));
		});
	});
});
