
import Window from 'window';
import {assert} from 'chai';
import {XMLHttpRequest} from 'xmlhttprequest';

// Core
import Container from '../src/Core/Container.js';

// Helpers
import DOM from '../src/Helpers/DOM.js';
import Request from '../src/Helpers/Request.js';

describe('RequestHelperTest', function() {

	const host = 'http://dev.turbo-ecommerce.com';
	const testEndPoint = 'server/products.php';

	beforeEach(function(done) {	
		global.window = new Window();
		global.document = window.document;
		global.XMLHttpRequest = XMLHttpRequest;
	
		this.container = new Container;
		this.container.setInstance('Request', new Request);

		done();
	});

	afterEach(function(done) {
		this.container.flush();
		this.container = undefined;
		global.window = undefined;
		global.document = undefined;
		global.XMLHttpRequest = undefined;
		done();
	});
	
	it('sends a get request to a url and recieves data', function(done) {
		let request = this.container.make('Request');
		request.get({
			url: host + '/' + testEndPoint,
		}).then(function(response) {
			assert.lengthOf(response, 15);
			done();
		});

	}).timeout(10000);
});