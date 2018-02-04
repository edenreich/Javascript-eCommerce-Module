
// External Packages
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
import Request from '../src/Helpers/Request.js';

// Test Helpers
import Generator from './Helpers/Generator.js';
import DomEvents from './Helpers/DomEvents.js';

describe('ProductsComponentTest', function() {

	const host = 'http://dev.turbo-ecommerce.com';

	beforeEach(function(done) {	
		global.window = new Window;
		global.XMLHttpRequest = XMLHttpRequest;
		global.document = window.document;
		document.body.innerHTML = `<div class="products"></div>
									<div class="filter"></div>
									<div class="pagination-links"></div>`;

		this.container = new Container;
		this.components = this.container.make('Components');
		this.components.register(['Pagination', 'Products']);

		done();
	});

	it('should set the given settings from the user', function(done) {
		let products = this.components.provide('Products');

		products.setup({
			element: '.products',
			class: '.test-class',
			itemClass: '',
			width: '200px',
		});

		DomEvents.dispatch('DOMContentLoaded');
		
		assert.equal(products.settings.class, '.test-class');
		assert.equal(products.settings.height, '250px');
		done();
	});

	it('should replace the items in the products container div', function(done) {
		let products = this.components.provide('Products');

		products.setup({});

		DomEvents.dispatch('DOMContentLoaded');

		products.replaceItems(Generator.products(3));

		let productNodeElements = DOM.find('.product');

		assert.lengthOf(productNodeElements, 3);
		assert.equal('product-name', productNodeElements[0].childNodes[0].childNodes[0].getAttribute('class'));
		done();
	});

	it('checks that each product have .add-to-cart and .favorite classes', function(done) {
		let products = this.components.provide('Products');

		products.setup({});

		DomEvents.dispatch('DOMContentLoaded');

		products.replaceItems(Generator.products(3));
		
		let buttons = DOM.find('.action-buttons')[0];
		let favoriteButton = DOM.find('.favorite', buttons);
		let addToCartButton = DOM.find('.add-to-cart', buttons);

		assert.isNotNull(favoriteButton);
		assert.isNotNull(addToCartButton);
		done();
	});

	it('should let the developer to add css class to the buttons', function(done) {
		let products = this.components.provide('Products');

		products.setup({
			add_button_class: 'test-class',
			favorite_button_class: 'second-test-class'
		});

		DomEvents.dispatch('DOMContentLoaded');

		products.replaceItems(Generator.products(3));

		let productElements = DOM.find('.product');
		let buttons = DOM.find('.action-buttons', productElements[0]);
		let addToCartButton = buttons.childNodes[0];
		let favoriteButton = buttons.childNodes[1];

		assert.isOk(DOM.hasClass(addToCartButton, 'test-class'));
		assert.isOk(DOM.hasClass(favoriteButton, 'second-test-class'));
		done();
	});

	it('should get products from the server side', function(done) {
		let products = this.components.provide('Products');

		products.setup({
			url: host + '/server/products.php'
		});

		DomEvents.dispatch('DOMContentLoaded');

		let request = products.loadPageProductsByServer(1);

		request.then(function(items) {
			assert.lengthOf(items, 5);
			done();
		}).catch(function(error) {
			console.log(error);
			done();
		});
	}).timeout(5000);

	it('should create default currency attribute if the developer did not supply one', function(done) {
		let products = this.components.provide('Products');

		products.setup({
			url: host + '/server/products.php'
		});

		DomEvents.dispatch('DOMContentLoaded');

		let request = products.loadPageProductsByServer(1);

		request.then(function(items) {
			let product = items[0];

			assert.isOk(product.hasOwnProperty('currency'));
			done();
		});
	}).timeout(5000);

	it('should display currency on the product', function(done) {
		let products = this.components.provide('Products');

		products.setup({
			url: host + '/server/products.php',
			currency: '€'
		});

		DomEvents.dispatch('DOMContentLoaded');

		let request = products.loadPageProductsByServer(1);

		request.then(function(items) {
			let product = items[0];
			let productElement = DOM.find('.product')[0];
			let currency = DOM.find('.product-currency', productElement);

			assert.equal(currency.innerHTML, '€')
			done();
		});
	}).timeout(5000);
});