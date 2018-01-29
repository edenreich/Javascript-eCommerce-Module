
import Window from 'window';
import {assert, expect} from 'chai';
import {XMLHttpRequest} from 'xmlhttprequest';

// Exceptions
import ExceptionHandler from '../src/Exceptions/ExceptionHandler.js';

// Core
import Container from '../src/Core/Container.js';
import EventManager from '../src/Core/EventManager.js';

// Components
import Cart from '../src/Components/Cart.js';
import Products from '../src/Components/Products.js';

// Helpers
import DomEvents from './Helpers/DomEvents.js';
import Generator from './Helpers/Generator.js';
import DOM from '../src/Helpers/DOM.js';
import Common from '../src/Helpers/Common.js';
import Cookie from '../src/Helpers/Cookie.js';
import Request from '../src/Helpers/Request.js';

describe.only('CartComponentTest', function() {

	const host = 'http://dev.turbo-ecommerce.com';

	const productsEndPoint = 'server/products.php';

	beforeEach(function() {	
		global.window = new Window;
		global.XMLHttpRequest = XMLHttpRequest;
		global.document = window.document;
		document.body.innerHTML = `<div class="cart-icon"></div>
									<div class="products"></div>
									<div class="filter"></div>
									<div class="pagination-links"></div>`;

		this.container = new Container;

		this.container.setInstance('Events', new EventManager);
		let request = this.container.make(new Request);

		ExceptionHandler.setDebugLevel = 'error';

		this.container.bind('Products', function(container) {
			return new Products(container, request, container.Events);
		});

		this.container.bind('Cart', function(container) {
			return new Cart(container, request, container.Events);
		});
	});

	afterEach(function(done) {
		this.container.flush();
		this.container = undefined;
		done();
	});

	it('should resolve cart object from the container', function() {
		let cart = this.container.make('Cart');

		assert.instanceOf(cart, Cart);
	});

	it('should open a window when clicking the cart icon', function() {
		let cart = this.container.make('Cart');

		cart.setup({
			element: ".cart-icon",
		});

		let icon = DOM.find('.cart-icon');

		icon.click();
		
		let box = DOM.find('#preview');

		assert.isNotNull(box);
	});

	it('should insert an svg icon into as the cart icon', function() {
		let cart = this.container.make('Cart');

		cart.setup({
			element: ".cart-icon",
		});

		let icon = DOM.find('.cart-icon');
		let svg = DOM.find('svg', icon);

		assert.isNotNull(svg);
	});

	it('should have cart stored as a cookie', function() {
		let cart = this.container.make('Cart');

		cart.setup({
			cookie_name: "cart",
			element: ".cart-icon",
		});

		DomEvents.dispatch('DOMContentLoaded');

		cart.addItem('something');

		assert.isNotNull(Cookie.get('cart'));
	});

	it('removes item from the cart', function() {
		let cart = this.container.make('Cart');

		cart.setup({
			cookie_name: "cart",
			element: ".cart-icon"
		});

		cart.addItem('something');
		cart.addItem('somethingelse');

		cart.removeItem('something');

		assert.equal(-1, Cookie.get('cart').items.indexOf('something'));
		assert.equal(0, Cookie.get('cart').items.indexOf('somethingelse'));
	});

	it('adds a product to the cart when clicking on plus button', function(done) {
		let cart = this.container.make('Cart');
		let products = this.container.make('Products'); 

		products.setup({
			url: host + '/' + productsEndPoint,
			element: ".products"
		});

		cart.setup({
			cookie_name: "cart",
			element: ".cart-icon"
		});

		DomEvents.dispatch('DOMContentLoaded');

		// wait 2 seconds for products to load.
		wait(2).then(function() { 
			let domElements = DOM.find('.product'); 

			let addToCart = DOM.find('#addToCart')[0];

			addToCart.click();
			addToCart.click();
		
			let items = Cookie.get('cart').items;

			assert.isNotEmpty(items);
			assert.lengthOf(items, 2);
			done();
		});

	}).timeout(10000);

	it('displays the items which were added in the basket', function(done) {
		let cart = this.container.make('Cart');
		let products = this.container.make('Products'); 

		products.setup({
			url: host + '/' + productsEndPoint,
			element: ".products"
		});

		cart.setup({
			cookie_name: "cart",
			element: ".cart-icon"
		});

		DomEvents.dispatch('DOMContentLoaded');

		// wait 2 seconds for products to load.
		wait(2).then(function() {
			let product1 = DOM.find('#addToCart')[0];
			let product2 = DOM.find('#addToCart')[4];
			let product3 = DOM.find('#addToCart')[3];
			let cartIcon = DOM.find('.cart-icon');
			let preview = DOM.find('#preview', cartIcon);

			product1.click();
			product2.click();
			product3.click();

			cartIcon.click();
			
			var items = DOM.find('.item', preview);
			
			assert.lengthOf(items, 3);
			done();
		});
	}).timeout(10000);

	it.only('adds existing product to the cart again increments the quantity', function(done) {
		let cart = this.container.make('Cart');
		let products = this.container.make('Products');

		cart.setup({
			cookie_name: "cart",
			element: ".cart-icon",
		}); 


		products.setup({
			url: host + '/' + productsEndPoint,
			element: ".products"
		});

		DomEvents.dispatch('DOMContentLoaded');
		
		waitFor(1, function() {
			let products = DOM.find('.product');
			let addToCartFirstProduct = DOM.find('.add-to-cart', products[0]);
			let addToCartSecondProduct = DOM.find('.add-to-cart', products[1]);
			
			// clicking same product twice.
			addToCartFirstProduct.click();
			addToCartFirstProduct.click();

			addToCartSecondProduct.click();

			let items = Cookie.get('cart').items;

			assert.lengthOf(items, 2);
			expect(items[0]).to.have.property('quantity');
			done();
		});
	}).timeout(10000);


	/**
	 * Simple helper, for async operations.
	 *
	 * @param number | time | in seconds
	 * @return Promise
	 */
	function wait(time) {
		return new Promise(function(resolve, reject) {
			setTimeout(function() {
				resolve();
			}, time * 1000);
		});
	}

	/**
	 * Simple helper, for async operations.
	 *
	 * @param number | time | in seconds
	 * @return void
	 */
	function waitFor(time, callback) {
		setTimeout(function() {
			callback.call();
		}, time * 1000);
		
	}

});