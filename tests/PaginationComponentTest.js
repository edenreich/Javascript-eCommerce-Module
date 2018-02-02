
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
			element: '.pagination-links',
			class: 'col-xs-offset-4 col-xs-8',
			per_page: 2,
			total_items: 5,
			processing: 'client-side',
		});


		setTimeout(function() {
			let links = DOM.find('li.page-item');
	
			assert.lengthOf(links, 5); // including next and prev buttons
			done();
		}, 5000);
	}).timeout(15000);

	it('should show the links corresponding to the amount of products and ignoring the users total_items', function(done) {
		this.Products.setup({
			element: '.products',
			class: 'col-xs-12 col-md-8',
			item_class: 'col-xs-12 col-md-4',
			add_button_class: 'btn btn-primary',
			favorite_button_class: 'btn btn-danger',
			min_width: '200px',
			max_width: '300px',
			height: '280px',
			attributes: ['image', 'name', 'price', 'deliveryTime'],
			url: host + '/server/products.php'
		});

		// Create pagin
		this.Pagination.setup({
			element: '.pagination-links',
			class: 'col-xs-offset-4 col-xs-8',
			per_page: 5,
			total_items: 5
		});

		DomEvents.dispatch('DOMContentLoaded');

		setTimeout(function() {

			let links = DOM.find('li.page-item');
			
			// 30 records / 5 = 6 // including the next and prev buttons should give 8
			assert.lengthOf(links, 8); 
			done();
		}, 5000);
	}).timeout(15000);
});