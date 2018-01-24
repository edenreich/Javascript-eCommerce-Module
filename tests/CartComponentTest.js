
import Window from 'window';
import {assert} from 'chai';
import {XMLHttpRequest} from 'xmlhttprequest';
import DOM from '../src/Helpers/DOM.js';
import Common from '../src/Helpers/Common.js';
import Cookie from '../src/Helpers/Cookie.js';
import Container from '../src/Core/Container.js';
import Cart from '../src/Components/Cart.js';
import Products from '../src/Components/Products.js';
import DomEvents from './Helpers/DomEvents.js';
import Generator from './Helpers/Generator.js';

describe('CartComponentTest', function() {

	const baseUrl = 'http://dev.javascript-ecommerce-module.com';

	beforeEach(function() {	
		global.window = new Window;
		global.XMLHttpRequest = XMLHttpRequest;
		global.document = window.document;
		document.body.innerHTML = `<div class="cart-icon"></div>
									<div class="products"></div>
									<div class="filter"></div>
									<div class="pagination-links"></div>`;

		this.container = new Container;

		this.container.bind('Products', function(container) {
			return new Products(container);
		});

		this.container.bind('Cart', function(container) {
			return new Cart(container);
		});
	});

	it('should resolve cart object from the container', function() {
		let cart = this.container.make('Cart');

		assert.instanceOf(cart, Cart);
	});

	it('should open a window when clicking the cart icon', function() {
		let cart = this.container.make('Cart');

		cart.setup({
			element: '.cart-icon',
		});

		let icon = DOM.element('.cart-icon');

		icon.click();
		
		let box = DOM.element('#preview');
		
		assert.isNotNull(box);
	});

	it('should insert an svg icon into as the cart icon', function() {
		let cart = this.container.make('Cart');

		cart.setup({
			element: '.cart-icon',
		});

		let icon = DOM.element('.cart-icon');
		let svg = icon.querySelector('svg');

		assert.isNotNull(svg);
	});

	it('should have cart stored as a cookie', function() {
		let cart = this.container.make('Cart');

		cart.setup({
			cookie_name: 'cart',
			element: '.cart-icon',
		});

		DomEvents.dispatch('DOMContentLoaded');

		cart.addItem('something');

		assert.isNotNull(Cookie.get('cart'));
	});

	it('removes item from the cart', function() {
		let cart = this.container.make('Cart');

		cart.setup({
			cookie_name: 'cart',
			element: '.cart-icon'
		});

		cart.addItem('something');
		cart.addItem('somethingelse');

		cart.removeItem('something');

		assert.equal(-1, Cookie.get('cart').items.indexOf('something'));
		assert.equal(0, Cookie.get('cart').items.indexOf('somethingelse'));
	});

	it('adds a product to the cart when clicking on plus button', function() {
		let cart = this.container.make('Cart');
		let products = this.container.make('Products'); 

		products.setup({
			url: baseUrl + '/demo/products.php',
			element: '.products'
		});

		cart.setup({
			cookie_name: 'cart',
			element: '.cart-icon'
		});

		DomEvents.dispatch('DOMContentLoaded');

		products.replaceItems(Generator.products(5));

		let addToCart = DOM.element('#addToCart')[0];

		addToCart.click();
		addToCart.click();
	
		let items = Cookie.get('cart').items;

		assert.isNotEmpty(items);
		assert.lengthOf(items, 2);

	}).timeout(10000);

	it('displays the items which were added in the basket', function() {
		let cart = this.container.make('Cart');
		let products = this.container.make('Products'); 

		products.setup({
			url: baseUrl + '/demo/products.php',
			element: '.products'
		});

		cart.setup({
			cookie_name: 'cart',
			element: '.cart-icon'
		});
		console.log(products);
		console.log(cart);
		DomEvents.dispatch('DOMContentLoaded');

		products.replaceItems(Generator.products(5));

		let product1 = DOM.find('#addToCart')[0];
		let product2 = DOM.find('#addToCart')[4];
		let cartIcon = DOM.find('.cart-icon');
		let preview = DOM.find('#preview', cartIcon);

		product1.click();
		product2.click();

		console.log(preview.innerHTML);

	});

});