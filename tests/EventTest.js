
import Window from 'window';
import {assert} from 'chai';
import Event from '../src/Core/Event.js';

describe('EventTest', function() {

	it('should trigger the event after a while and execute the listener', function(done) {
		Event.listen('SomeTask', function() {
			assert.ok(true);
			done();
		});

		setTimeout(function() {
			// some tasks.
			Event.trigger('SomeTask');
		}, 5000);
	}).timeout(10000);
	
	it('should trigger an event and broadcast data to the listeners', function(done) {
		// first listener.
		Event.listen('SomeTask', function(value) {
			assert.equal(5, value);
		});

		// second listener.
		Event.listen('SomeTask', function(value) {
			assert.equal(5, value);
			done();
		});

		setTimeout(function() {
			// do some tasks.
			let value = 5;
			Event.trigger('SomeTask', [5]);
		}, 5000);
	}).timeout(10000);

});