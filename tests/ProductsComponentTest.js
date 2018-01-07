
import Window from 'window';
import {assert} from 'chai';
import {XMLHttpRequest} from 'xmlhttprequest';
import DOM from '../src/Helpers/DOM.js';
import Container from '../src/Core/Container.js';
import Pagination from '../src/Components/Pagination.js';
import Products from '../src/Components/Products.js';
import Generator from './Helpers/Generator.js';
import DomEvents from './Helpers/DomEvents.js';

describe('ProductsComponentTest', function() {

	const baseUrl = 'http://dev.javascript-ecommerce-module.com';

	beforeEach(function(done) {	
		global.window = new Window;
		global.XMLHttpRequest = XMLHttpRequest;
		global.document = window.document;
		document.body.innerHTML = `<div class="products"></div>
									<div class="filter"></div>
									<div class="pagination-links"></div>`;

		this.container = new Container;

		this.container.bind('Pagination', function(container) {
			return new Pagination(container, container.make('Products'));
		});

		this.container.bind('Products', function(container) {
			return new Products(container);
		});

		done();
	});

	it('should set the given settings from the user', function(done) {
		let products = this.container.make('Products');

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
		let products = this.container.make('Products');

		products.setup({});

		DomEvents.dispatch('DOMContentLoaded');

		products.replaceItems(Generator.products(3));

		let productNodeElements = DOM.element('.product');

		assert.lengthOf(productNodeElements, 3);
		assert.equal('product-name', productNodeElements[0].childNodes[0].childNodes[0].getAttribute('class'));
		done();
	});

	it('should have for each product a button with id #favorite and button with id #addToCart', function(done) {
		let products = this.container.make('Products');

		products.setup({});

		DomEvents.dispatch('DOMContentLoaded');

		products.replaceItems(Generator.products(3));
		
		let buttons = DOM.element('.action-buttons')[0];
		let favoriteButton = DOM.find('#favorite', buttons);
		let addToCartButton = DOM.find('#addToCart', buttons);

		assert.isNotNull(favoriteButton);
		assert.isNotNull(addToCartButton);
		done();
	});

	it('should let the developer override the default buttons classes', function(done) {
		let products = this.container.make('Products');

		products.setup({
			add_button_class: 'test-class',
			favorite_button_class: 'second-test-class'
		});

		DomEvents.dispatch('DOMContentLoaded');

		products.replaceItems(Generator.products(3));

		let productElements = DOM.element('.product');
		let buttons = DOM.find('.action-buttons', productElements[0]);
		let addToCartButton = buttons.childNodes[0];
		let favoriteButton = buttons.childNodes[1];

		assert.equal(addToCartButton.className, 'test-class');
		assert.equal(favoriteButton.className, 'second-test-class');
		done();
	});

	it('should get products from the server side', function(done) {
		let products = this.container.make('Products');

		products.setup({
			url: baseUrl + '/demo/products.php'
		});

		DomEvents.dispatch('DOMContentLoaded');

		let request = products.getProductsByPage(1);

		request.then(function(items) {
			assert.lengthOf(items, 5);
			done();
		}).catch(function(error) {
			console.log(error);
			done();
		});
	}).timeout(5000);
});