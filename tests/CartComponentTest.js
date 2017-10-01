
import Window from 'window';
import {assert} from 'chai';
import {XMLHttpRequest} from 'xmlhttprequest';
import DOM from '../src/Helpers/DOM.js';
import Common from '../src/Helpers/Common.js';
import Container from '../src/Core/Container.js';
import Cart from '../src/Components/Cart.js';

describe.only('CartComponentTest', function() {

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

		cart.addItem('something');

		assert.isNotNull(Common.getCookie('cart'));
	});

});