
// External Packages
import Window from 'window';
import {assert} from 'chai';
import {XMLHttpRequest} from 'xmlhttprequest';

// Core
import Container from '../src/Core/Container.js';
import EventManager from '../src/Core/EventManager.js';

describe('EventManagerTest', function() {

	beforeEach(function() {	
		global.window = new Window();
		global.XMLHttpRequest = XMLHttpRequest;
		global.document = window.document;

		this.container = new Container;
	});

	afterEach(function() {
		this.container.flush();
	});

	it('publish the event to the subscribers', function(done) {
		let Events = this.container.make('Events');
		let firstSubscriberWasNotified = false;
		let secondSubscriberWasNotified = false;

		Events.subscribe('SomeTask', function() {
			firstSubscriberWasNotified = true;
		});

		Events.subscribe('SomeTask', function() {
			secondSubscriberWasNotified = true;
		});

		setTimeout(function() {
			// some long operation / tasks.
			Events.publish('SomeTask');
			assert.ok(firstSubscriberWasNotified, 'first subscriber was notified');
			assert.ok(secondSubscriberWasNotified, 'second subscriber was notified');
			done();
		}, 5000);
	}).timeout(10000);
	
	it('passes data to the subscribers', function(done) {
		let Events = this.container.make('Events');

		// first listener.
		Events.subscribe('SomeTask', function(value) {
			assert.equal(5, value);
		});

		// second listener.
		Events.subscribe('SomeTask', function(value) {
			assert.equal(5, value);
			done();
		});

		setTimeout(function() {
			// do some tasks.
			let value = 5;
			Events.publish('SomeTask', [5]);
		}, 5000);
	}).timeout(10000);
});