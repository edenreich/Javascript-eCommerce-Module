
// Extenral Packages
import Window from 'window';
import {assert} from 'chai';
import {XMLHttpRequest} from 'xmlhttprequest';

// Core
import Container from '../src/Core/Container.js';
import EventManager from '../src/Core/EventManager.js';
import ComponentsProvider from '../src/Core/ComponentsProvider.js';

// Components
import Pagination from '../src/Components/Pagination.js';
import Products from '../src/Components/Products.js';

// Helpers
import DOM from '../src/Helpers/DOM.js';
import DomEvents from './Helpers/DomEvents.js';
import Request from '../src/Helpers/Request.js';

describe('PaginationComponentTest', function() {

	const host = 'http://dev.turbo-ecommerce.com';
	const testEndPoint = 'server/products.php';

	beforeEach(function() {	
		global.window = new Window();
		global.XMLHttpRequest = XMLHttpRequest;
		global.document = window.document;
		document.body.innerHTML = `<div class="products"></div>
									<div class="filter"></div>
									<div class="pagination-links"></div>`;

		this.container = new Container;
		this.components = this.container.make('Components');
		this.components.register(['Pagination', 'Products']);

		this.Pagination = this.components.provide('Pagination');
		this.Products = this.components.provide('Products');
	});

	afterEach(function(done) {
		this.container.flush();
		this.container = undefined;
		this.components = undefined;
		done();
	});

	it('should set the amount of items per page according to the settings', function(done) {

		this.Pagination.setup({
			element: ".pagination-links",
			per_page: 2,
			total_items: 5
		});

		DomEvents.dispatch('DOMContentLoaded');

		setTimeout(function() {
			let links = DOM.find('li.page-item');
			assert.lengthOf(links, 5); // including next and prev buttons
			done();
		}, 2000);
	}).timeout(5000);

	it('should display only the amount of products that is set in per_page', function(done) {
		
		this.Products.setup({
			element: ".products",
			url: host + '/' + testEndPoint,
		});

		this.Pagination.setup({
			element: ".pagination-links",
			per_page: 2,
			total_items: 5,
			processing: "server-side",
		});

		DomEvents.dispatch('DOMContentLoaded');

		setTimeout(function() {
			let products = DOM.find('.product');
			assert.lengthOf(products, 2);
			done();
		}, 3000);
	}).timeout(5000);

	// Skip this test for now, scrollBy, scroll, scrollTo not implemented in domjs
	// @see https://github.com/jsdom/jsdom/issues/1422
	it.skip('should load more products if the page is scrolled to specific offset', function(done) {
		this.Products.setup({
			element: ".products",
			url: host + '/' + testEndPoint,
		});

		this.Pagination.setup({
			element: ".pagination-links",
			per_page: 10,
			total_items: 30,
			processing: "client-side",
		});

		DomEvents.dispatch('DOMContentLoaded');

		setTimeout(function() {
			let products = DOM.find('.product');

			window.scrollBy(0, window.innerHeight-100);

			products = DOM.find('.product');

			// No really need to wait but just to be sure.
			setTimeout(function() {
				assert.lengthOf(products, 20);
				done();
			}, 1000);
		}, 3000);
	});
});