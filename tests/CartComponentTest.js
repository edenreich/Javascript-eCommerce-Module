
import Window from 'window';
import {assert, expect} from 'chai';
import {XMLHttpRequest} from 'xmlhttprequest';

// Exceptions
import ExceptionHandler from '../src/Exceptions/ExceptionHandler.js';
import InvalidCartItemException from '../src/Exceptions/InvalidCartItemException.js';

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

		cart.addItem({"id": "1"});

		assert.isNotNull(Cookie.get('cart'));
	});

	it('removes item from the cart', function() {
		let cart = this.container.make('Cart');

		cart.setup({
			cookie_name: "cart",
			element: ".cart-icon"
		});

		cart.addItem({"id": "1"});
		cart.addItem({"id": "2"});

		cart.removeItem({"id": "1"});

		assert.lengthOf(Cookie.get('cart').items, 1);
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

			let addToCart = DOM.find('.add-to-cart')[0];
			let addToCart2 = DOM.find('.add-to-cart')[1];

			addToCart.click();
			addToCart2.click();
		
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
			let product1 = DOM.find('.add-to-cart')[0];
			let product2 = DOM.find('.add-to-cart')[4];
			let product3 = DOM.find('.add-to-cart')[3];
			let cartIcon = DOM.find('.cart-icon');
			let preview = DOM.find('#preview', cartIcon);

			product1.click();
			product2.click();
			product3.click();
			
			var items = DOM.find('.item', preview);
			
			assert.lengthOf(items, 3);
			done();
		});
	}).timeout(10000);

	it('adds existing product to the cart again increments the quantity', function(done) {
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
			let productElements = DOM.find('.product');
			let addToCartFirstProduct = DOM.find('.add-to-cart', productElements[0]);
			let addToCartSecondProduct = DOM.find('.add-to-cart', productElements[1]);
			
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

	it('favorites a product by clicking favorite button adds it to the cookie', function(done) {
		let cart = this.container.make('Cart');
		let products = this.container.make('Products');

		cart.setup({
			cookie_name: "cart",
			element: ".cart-icon"
		});

		products.setup({
			url: host + '/' + productsEndPoint,
			element: ".products"
		});

		DomEvents.dispatch('DOMContentLoaded');

		waitFor(1, function() {
			let productElements = DOM.find('.product');
			let favorite = DOM.find('.favorite', productElements[0]);

			favorite.click();
			favorite.click(); // Click it twice on purpose just to make sure we have only one record inserted.

			let favorites = Cookie.get('cart').favorites;

			assert.lengthOf(favorites, 1);
			done();
		});
	});

	it('give the possiblity to click checkout inside the cart preview', function(done) {
		let cart = this.container.make('Cart');
		let products = this.container.make('Products');

		cart.setup({
			cookie_name: "cart",
			element: ".cart-icon"
		});

		products.setup({
			url: host + '/' + productsEndPoint,
			element: ".products"
		});

		DomEvents.dispatch('DOMContentLoaded');

		waitFor(1, function() {
			let productElements = DOM.find('.product');
			let addToCartFirst = DOM.find('.add-to-cart', productElements[0]);
			let addToCartSecond = DOM.find('.add-to-cart', productElements[1]);

			addToCartFirst.click();
			addToCartSecond.click();

			waitFor(3, function() {
				let previewTable = DOM.find('.preview-table');
				let previewTableItems = DOM.find('tr', previewTable);
				let lastItem = previewTableItems[previewTableItems.length-1];
				
				let tableCells = lastItem.children;
			
				assert.lengthOf(tableCells, 1);

				let td = tableCells[0];
				
				if (td.children.length) {
					assert.equal(td.children[0].constructor.name, 'HTMLAnchorElement');
					assert.equal(td.children[0].innerHTML, 'Checkout');
				}

				done();
			});
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
	 * synonym for wait function only with callback instead.
	 *
	 * @param number | time | in seconds
	 * @param function | callback
	 * @return void
	 */
	function waitFor(time, callback) {
		setTimeout(function() {
			callback.call();
		}, time * 1000);
		
	}

});