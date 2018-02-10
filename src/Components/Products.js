
// Helpers
import DOM from '../Helpers/DOM.js';
import Str from '../Helpers/Str.js';
import Common from '../Helpers/Common.js';

// Components
import BaseComponent from './BaseComponent.js';

// Exceptions
import InvalidArgumentException from '../Exceptions/InvalidArgumentException.js';

/**
 * The default settings of each product.
 *
 * @var object
 */
let defaultSettings = {
	element: '.products',
	class: '',
	item_class: '',
	add_button_class: 'btn btn-primary',
	favorite_button_class: 'btn btn-danger',
	width: '200px',
	height: '250px',
	attributes: ['name', 'price', 'deliveryTime', 'image'],
	url: 'products.php',
	no_css: false,
	currency: '$',
};

/**
 * Stores the container object.
 * 
 * @var \Core\Container
 */
let Container;

/**
 * Stores the container object.
 * 
 * @var \Core\EventManager
 */
let EventManager;

/**
 * Stores the request object.
 * 
 * @var \Helper\Request 
 */
let Http;

/**
 * Stores the chunked per 
 * page products.
 * 
 * @var array
 */
let chunkedProducts;

/**
 * @class Products
 *
 * The Products component, handles the products tasks.
 */

class Products extends BaseComponent
{
	/**
	 * Initalize the Container.
	 *
	 * @param \Core\Container | container
	 * @param \Helpers\Request | http
	 * @return void
	 */
	constructor(container, http, eventManager) 
	{
		super();

		Container = container;
		Http = http;
		EventManager = eventManager;
		chunkedProducts = [];
	}

	/**
	 * Sets the given settings from the user.
	 *
	 * @param object | settings
	 * @return void
	 */
	setup(settings)
	{
		if (typeof settings != 'object') {
			throw new InvalidArgumentException;
		}

		this.settings = Common.extend(defaultSettings, settings);
		this.totalItems = null;

		document.addEventListener('DOMContentLoaded', function() {

			this.setElement(this.settings.element);

			this.draw();	

			this.loadProducts(1);
		}.bind(this));
	}

	/**
	 * Loads the products for the page.
	 * 
	 * @param number | pageNumber
	 * @param bool | append
	 * @return void
	 */
	loadProducts(pageNumber = 1, append = false)
	{
		if (Container.Pagination && Container.Pagination.booted) {
			
			let limit = Container.Pagination.settings.per_page;

			switch(Container.Pagination.settings.processing) 
			{
				case 'client-side':
					return this.loadPageProductsOnce(pageNumber, limit, append);
					break;
				case 'server-side':
					return this.loadPageProducts(pageNumber, limit, append);
					break;
				default:
					throw new InvalidArgumentException('for processing you can choose \'server-side\' or \'client-side\' options.');
			}
		} else {
			this.loadPageProducts();
		}
	}

	/**
	 * Loads the products and 
	 * replace them in the div container.
	 *
	 * @param number | pageNumber
	 * @param number | limit
	 * @return void
	 */
	loadPageProducts(pageNumber = null, limit = null)
	{
		let request = this.getProducts(pageNumber);

		request.then(function(products) {
			if (limit) {
				this.currentItems = products.slice(0, limit);
			} else {
				this.currentItems = products;
			}

			this.replaceProducts(this.currentItems);
			Promise.resolve(this.currentItems);
		}.bind(this)).catch(function(error) {
			// throw new Error('Could not load products! Reason: ' + error);
		});

		return request;
	}

	/**
	 * Loads the products and 
	 * replace them in the div container.
	 *
	 * @param number | pageNumber
	 * @param bool | append
	 * @return void
	 */
	loadPageProductsOnce(pageNumber, undefined, append = false)
	{
		let request;

		if (this.totalItems == null) { // need to fetch them from the server.
			request = this.getProducts();
		} else { // no need to wait can resolve immediately with the products. 
			request = Promise.resolve(this.totalItems);
		}

		return request.then(function(products) {
			this.totalItems = products;
			let pages = this.calculateClientPages(products);
			this.currentItems = pages[pageNumber-1];

			if (typeof this.currentItems == 'undefined') {
				return null;
			}

			if (append) {
				this.appendProducts(this.currentItems);
			} else {
				this.replaceProducts(this.currentItems);
			}

			return this.currentItems;
		}.bind(this)).catch(function(error) {
			// throw new Error('Could not load products! Reason: ' + error);
		});
	}

	/**
	 * Calculates the amount of pages for the client.
	 *
	 * @param array | products
	 * @return array
	 */
	calculateClientPages(products)
	{	
		// We are using pagination so we need to update it too.
		Container.Pagination.settings.total_items = products.length;
		
		let perPage = Container.Pagination.settings.per_page; 

		// We need to calculate the pages on full http request 
		// only once. so we check to see if we have results in our cache.
		if (chunkedProducts.length != 0) {
			return chunkedProducts;
		}

		chunkedProducts = Common.array_chunk(products, perPage);
		return chunkedProducts;
	}

	/**
	 * Sets the DOM element 
	 * for populating the products.
	 *
	 * @param string | selector
	 * @return void
	 */
	setElement(selector)
	{
		this.element = DOM.find(selector);

		if (this.element) {
			DOM.addClass(this.element, this.settings.class);
		}
	}

	/**
	 * Replace products in 
	 * the products container.
	 *
	 * @param array | rawProducts
	 * @return array
	 */
	replaceProducts(rawProducts) 
	{
		if (! Array.isArray(rawProducts) || (rawProducts.length <= 0 && typeof rawProducts[0] == 'string')) {
			throw new InvalidArgumentException;
		}

		let products = this.buildProducts(rawProducts, this.settings.item_class, 'div');

		this.element.innerHTML = '';
		products.forEach(function(product) {
			EventManager.publish('products.loading', product);
			this.element.appendChild(product);
		}.bind(this));

		EventManager.publish('products.loaded', products);

		return products;
	}

	/**
	 * Appends more products to the
	 * div container.
	 *
	 * @param array | rawProducts
	 * @return array
	 */
	appendProducts(rawProducts)
	{
		if (! Array.isArray(rawProducts) || (rawProducts.length <= 0 && typeof rawProducts[0] == 'string')) {
			throw new InvalidArgumentException;
		}

		let products = this.buildProducts(rawProducts, this.settings.item_class, 'div');

		products.forEach(function(product) {
			EventManager.publish('products.loading', product);
			this.element.appendChild(product);
		}.bind(this));

		EventManager.publish('products.loaded', products);

		return products;
	}

	/**
	 * Makes an Ajax call to the 
	 * server without parameters.
	 *
	 * @param number | pageNumber
	 * @return Promise
	 */
	getProducts(pageNumber = null)
	{
		let action = (pageNumber) ? this.settings.url + '?page=' + pageNumber : this.settings.url;

		return Http.get({
			url: action,
		});
	}

	/**
	 * Builds the html for the products.
	 * 
	 * @param array | attributesCollection
	 * @param string | className
	 * @param string | tagType
	 * @return array
	 */
	buildProducts(attributesCollection, className, tagType) 
	{
		if(attributesCollection.constructor.name != 'Array' ) {
			throw new InvalidArgumentException;
		}

		let builtProducts = [];

		// Enter default attribute.
		if (this.settings.attributes.indexOf('currency') == -1) {
			this.settings.attributes.push('currency');
		}
		
		attributesCollection.forEach(function(attributes) {
			let builtProduct = this.buildProduct(attributes, className, tagType);
			builtProducts.push(builtProduct);
		}.bind(this));

		return builtProducts;
	}

	/**
	 * Builds the html for a single product.
	 *
	 * @param object | attributes
	 * @param string | className
	 * @param string | tagType
	 * @return object
	 */
	buildProduct(attributes, className, tagType) 
	{
		if (typeof attributes != 'object' || typeof tagType != 'string') {
			throw new InvalidArgumentException;
		}

		className = className || null;

		let product = DOM.createElement('div', {
			class: 'product'
		});

		DOM.addClass(product, className);

		let overlay = DOM.createElement('div', {
			class: 'product-overlay',
		});

		product.appendChild(overlay);

		attributes = this.addDefaultAttributes(attributes);

		if (attributes.hasOwnProperty('image')) {
			let image = DOM.createElement('img', {
				src: attributes['image']
			});
			
			let tag = DOM.createElement(tagType, {
				class: 'product-image',
				html: image.outerHTML
			});
			
			product.appendChild(tag);
		}

		if (attributes.hasOwnProperty('price')) {
			let tag = DOM.createElement(tagType, {
				class: 'product-price',
			});

			let span = DOM.createElement('span', {
				class: 'product-amount',
				html: attributes.price.amount
			});

			let span2 = DOM.createElement('span', {
				class: 'product-currency',
				html: attributes.price.currency
			});

			tag.appendChild(span);
			tag.appendChild(span2);
			overlay.appendChild(tag);
		}

		for (var attribute in attributes) {
			if (! Common.in_array(attribute, this.settings.attributes)) {
				continue;
			}

			if (attribute == 'price' || attribute == 'image') {
				continue;
			}

			let tag = DOM.createElement(tagType);
			tag.innerHTML = attributes[attribute] || '';
			
			DOM.addClass(tag, 'product-' + Str.kebabCase(attribute));
			overlay.appendChild(tag);
		}

		let tag = DOM.createElement('div', {
			class: 'action-buttons'
		});

		let addToCart = DOM.createElement('button', {
			class: 'add-to-cart',
			type: 'button',
			text: '+',
		});

		let favorite = DOM.createElement('button', {
			class: 'favorite',
			type: 'button',
			text: '&hearts;'
		});

		if (this.settings.add_button_class) {
			DOM.addClass(addToCart, this.settings.add_button_class);
		}

		if (this.settings.favorite_button_class) {
			DOM.addClass(favorite, this.settings.favorite_button_class);
		}

		tag.appendChild(addToCart);
		tag.appendChild(favorite);

		addToCart.addEventListener('click', function(e) {
			e.preventDefault();
			EventManager.publish('cart.product.added', attributes);
		});

		favorite.addEventListener('click', function(e) {
			e.preventDefault();
			this.innerHTML = '&#x2713;';
			EventManager.publish('cart.product.favorited', attributes);
		});

		overlay.appendChild(tag);

		return product;
	}

	/**
	 * Adds default attributes
	 * to the supplied attributes.
	 *
	 * @param object | attributes
	 * @return object
	 */
	addDefaultAttributes(attributes)
	{
		if (attributes.hasOwnProperty('price') && typeof attributes.price != 'object') {
			attributes.price = {
				"amount": attributes.price,
				"currency": this.settings.currency
			};
		}

		return attributes;
	}

	/**
	 * Add the eCommerce style tags to the DOM.
	 */
	draw() 
	{
		if (DOM.find('#Turbo-eCommerce-Products')) {
			return;
		}

		if (this.settings.no_css) {
			return;
		}

		let width = this.settings.width || 'auto';
		let height = this.settings.height || '200px';
		let minWidth = this.settings.min_width || '200px';
		let maxWidth = this.settings.max_width || '250px';

		let css = `
			.product {
				position: relative;
				margin: 5px 5px;
				border: 1px solid #e4e4e4;
				width: ${width};
				min-width: ${minWidth};
				max-width: ${maxWidth};
				height: ${height};
				cursor: pointer;
				color: #ffffff;
				overflow: hidden;
			}

			.product > .product-overlay {
				position: absolute;
				top: 0;
				left: 0;
				width: 100%;
				height: 100%;
				opacity: 0.5;
				z-index: 5;
				transition: 1s all;
				transform: translateX(-250px);
			}

			.product:hover > .product-overlay {
				background: rgba(0, 0, 0, 0.45);
				transform: translateX(0px);
				opacity: 1;
				transition: 0.5s all;
			}

			.product > .product-image > img {
				position: absolute;
				left: 0;
				top: 0;
				width: 100%;
				height: 100%;
			}

			.product > .product-overlay > .product-name, 
			.product > .product-overlay > .product-price,
			.product > .product-overlay > .product-delivery-time {
				z-index: 1;
				position: relative;
				text-align: center;
				margin-top: 25px;
			}

			.product > .product-overlay > .action-buttons {
				width: 100%;
				margin-top: 10px;
				text-align: center;
			}

			.product > .product-overlay > .action-buttons > .favorite {
				margin-left: 10px;
			}

		`;
	    
	    DOM.addStyle('Turbo-eCommerce-Products', css);
	}

	/**
	 * Hides all irrelevant elements from the DOM.
	 *
	 * @return void 
	 */
	hideAll()
	{	
		Container.Components.booted.forEach(function(component) {
			if (component.constructor.name != 'Products') {
				component.hide();
			}
		});
	}
}

export default Products;
