
import Window from 'window';
import {assert} from 'chai';
import {XMLHttpRequest} from 'xmlhttprequest';
import Container from '../src/Core/Container.js';
import Pagination from '../src/Components/Pagination.js';
import Products from '../src/Components/Products.js';

describe('ProductsComponentTest', function() {

	const baseUrl = 'http://dev.javascript-ecommerce-module.com';

	beforeEach(function() {	
		global.window = new Window();
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
		this.Products.setup({
			url: baseUrl + '/demo/products.php'
		});
	});

	it('should set the given settings from the user', function() {

		this.Products.setup({
			element: '.products',
			class: '.test-class',
			itemClass: '',
			width: '200px',
		});

		assert.equal(this.Products.settings.class, '.test-class');
		assert.equal(this.Products.settings.height, '250px');

	});

	it('should replace the items in the products container div', function() {
		this.Products.replaceItems(this.productGenerator.products());

		let productNodeElements = this.Products.wrapper.getElementsByClassName('product');

		assert.lengthOf(productNodeElements, 3);
		assert.equal('product-name', productNodeElements[0].childNodes[0].childNodes[0].getAttribute('class'));
	});

	it('should get products from the server side', function(done) {
		let request = this.Products.getProductsByPage(1);

		request.then(function(items) {
			assert.lengthOf(items, 5);
			done();
		}).catch(function(error) {
			console.log(error);
			done();
		});
	}).timeout(15000);
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