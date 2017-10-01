
import Window from 'window';
import {assert} from 'chai';
import {XMLHttpRequest} from 'xmlhttprequest';
import DOM from '../src/Helpers/DOM.js';
import Container from '../src/Core/Container.js';
import Pagination from '../src/Components/Pagination.js';
import Products from '../src/Components/Products.js';

describe('ProductsComponentTest', function() {

	const baseUrl = 'http://dev.javascript-ecommerce-module.com';

	beforeEach(function(done) {	
		global.window = new Window;
		global.XMLHttpRequest = XMLHttpRequest;
		global.document = window.document;
		document.body.innerHTML = `<div class="products"></div>
									<div class="filter"></div>
									<div class="pagination-links"></div>`;

		let container = new Container;

		container.bind('Pagination', function() {
			return new Pagination(container);
		});

		container.bind('Products', function() {
			return new Products(container, container.make('Pagination'));
		});

		this.productGenerator = new ProductsGenerator;
		this.Products = container.make('Products');
		done();
	});

	it('should set the given settings from the user', function(done) {
		this.Products.setup({
			element: '.products',
			class: '.test-class',
			itemClass: '',
			width: '200px',
		});

		assert.equal(this.Products.settings.class, '.test-class');
		assert.equal(this.Products.settings.height, '250px');
		done();
	});

	it('should replace the items in the products container div', function(done) {
		this.Products.replaceItems(this.productGenerator.products());

		let productNodeElements = this.Products.wrapper.getElementsByClassName('product');

		assert.lengthOf(productNodeElements, 3);
		assert.equal('product-name', productNodeElements[0].childNodes[0].childNodes[0].getAttribute('class'));
		done();
	});

	it('should have for each product a button with id #favorite and button with id #addToCart', function(done) {
		this.Products.replaceItems(this.productGenerator.products());

		this.Products.setup({});
		
		let buttons = DOM.element('.action-buttons')[0];
		let favoriteButton = DOM.find(buttons, '#favorite');
		let addToCartButton = DOM.find(buttons, '#addToCart');

		assert.isNotNull(favoriteButton);
		assert.isNotNull(addToCartButton);
		done();
	});

	it('should let the developer override the default buttons classes', function(done) {
		this.Products.setup({
			add_button_class: 'test-class',
			favorite_button_class: 'second-test-class'
		});

		this.Products.replaceItems(this.productGenerator.products());

		let products = DOM.element('.product');
		let buttons = DOM.find(products[0], '.action-buttons');
		let addToCartButton = buttons.childNodes[0];
		let favoriteButton = buttons.childNodes[1];

		assert.equal(addToCartButton.className, 'test-class');
		assert.equal(favoriteButton.className, 'second-test-class');
		done();
	});

	it('should get products from the server side', function(done) {
		this.Products.setup({
			url: baseUrl + '/demo/products.php'
		});

		let request = this.Products.getProductsByPage(1);

		request.then(function(items) {
			assert.lengthOf(items, 5);
			done();
		}).catch(function(error) {
			console.log(error);
			done();
		});
	}).timeout(5000);
});

class ProductsGenerator
{
	products()
	{
		return [
			{
				name: "Example Product 1", 
				price: 100, 
				deliveryTime: "6 days", 
				image: "images/1.jpg"
			},
			{
				name: "Example Product 2", 
				price: 120, 
				deliveryTime: "6 days", 
				image: "images/2.jpg"
			},
			{
				name: "Example Product 3", 
				price: 105, 
				deliveryTime: "6 days", 
				image: "images/3.jpg"
			}
		];
	}
}