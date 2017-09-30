
import Window from 'window';
import {assert} from 'chai';
import {XMLHttpRequest} from 'xmlhttprequest';
import Container from '../src/Core/Container.js';
import Pagination from '../src/Components/Pagination.js';
import Products from '../src/Components/Products.js';

describe.only('PaginationComponentTest', function() {

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

		this.Pagination = container.make('Pagination');
		this.Products = container.make('Products');
		this.Products.setup({
			url: baseUrl + '/demo/products.php'
		});
	});

	it('should set the amount of items per page according to the settings', function(done) {
		this.Pagination.setup({
			element: '.pagination-links',
			class: 'col-xs-offset-4 col-xs-8',
			per_page: 2,
			total_items: 10
		});

		setTimeout(function() {
			let items = document.getElementsByClassName('product');
			assert.lengthOf(items, 2);
			done();
		}, 5000);
	}).timeout(15000);

	it.only('should show the links corresponding to the amount of pages', function(done) {
		this.Pagination.setup({
			element: '.pagination-links',
			class: 'col-xs-offset-4 col-xs-8',
			per_page: 2,
			total_items: 10
		});

		setTimeout(function() {
			let links = document.querySelectorAll('li.page-item');
			let prev = links[0];
			let next = links[links.length-1];
			// do not count next  or prev buttons
			prev.parentElement.removeChild(prev);
			next.parentElement.removeChild(next);

			links = document.querySelectorAll('li.page-item');
			
			assert.lengthOf(links, 5);
			done();
		}, 5000);
	}).timeout(15000);
});