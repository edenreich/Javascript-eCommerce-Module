
import DOM from '../Helpers/DOM.js';
import Common from '../Helpers/Common.js';
import Str from '../Helpers/Str.js';
import InvalidArgumentException from '../Exceptions/InvalidArgumentException.js';

/**
 * @file 
 * Products class.
 *
 * The Products component, handles the products tasks.
 */


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

class Products 
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

			this.addStyleTag();	

			this.loadProducts(1);
		}.bind(this));
	}

	/**
	 * Loads the products for the page.
	 * 
	 * @param number | pageNumber
	 * @param bool | all
	 */
	loadProducts(pageNumber = 1, all)
	{
		if (Container.Pagination && Container.Pagination.booted) {

			if (Container.Pagination.settings.proccessing == 'client-side') {
				return this.loadPageProductsByClient(pageNumber);
			} else if (Container.Pagination.settings.proccessing == 'server-side') {
				return this.loadPageProductsByServer(pageNumber);
			} else {
				throw new InvalidArgumentException('for proccessing you can choose \'server-side\' or \'client-side\' options.');
			}
		} else {
			this.loadPageProductsByServer();
		}
	}

	/**
	 * Loads the products and 
	 * replace them in the div container.
	 *
	 * @param number | pageNumber
	 * @return void
	 */
	loadPageProductsByServer(pageNumber = null)
	{
		let request = this.getProducts(pageNumber);

		request.then(function(products) {

			this.currentItems = products;

			for (var i = 0; i < this.currentItems.length; i++) {
				var product = this.currentItems[i];
				EventManager.publish('products.loading', product);
			}

			EventManager.publish('products.loaded', products);
			this.replaceItems(products);
			resolve();
		}.bind(this)).catch(function(error) {

		});

		return request;
	}

	/**
	 * Loads the products and 
	 * replace them in the div container.
	 *
	 * @return void
	 */
	loadPageProductsByClient(pageNumber)
	{
		let request;

		if (this.totalItems == null) { // need to fetch them from the server.
			request = this.getProducts();
		} else { // no need to wait can resolve immediately with the products. 
			request = Promise.resolve(this.totalItems);
		}

		request.then(function(products) {
			this.totalItems = products;
			let perPage = Container.Pagination.settings.per_page; 
			Container.Pagination.settings.total_items = products.length;
			
			if (chunkedProducts.length == 0) {
				chunkedProducts = Common.array_chunk(products, perPage);
			}

			let pages = chunkedProducts;
			this.currentItems = pages[pageNumber-1];

			for (var i = 0; i < this.currentItems.length; i++) {
				var product = this.currentItems[i];
				EventManager.publish('products.loading', product);
			}

			EventManager.publish('products.loaded', products);
			this.replaceItems(this.currentItems);
			Promise.resolve(this.currentItems);

		}.bind(this)).catch(function(error) {

		});

		return request;
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
		this.wrapper = DOM.find(selector);

		if (this.wrapper) {
			DOM.addClass(this.wrapper, this.settings.class);
		}
	}

	/**
	 * Replace items in 
	 * the products container.
	 *
	 * @param array | items
	 * @return array
	 */
	replaceItems(items) 
	{
		if (! Array.isArray(items) || (items.length <= 0 && typeof items[0] == 'string')) {
			throw new InvalidArgumentException;
		}

		let products = this.buildProducts(items, this.settings.item_class, 'div');

		this.wrapper.innerHTML = '';
		products.forEach(function(product) {
			this.wrapper.appendChild(product);
		}.bind(this));

		return items;
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

		for (var attribute in attributes) {
			if (! Common.in_array(attribute, this.settings.attributes)) {
				continue;
			}

			let tag = DOM.createElement(tagType);

			if (attribute == 'image') {
				let image = DOM.createElement('img', {
					src: attributes[attribute]
				});
				product.appendChild(image);
			} else {
				tag.innerHTML = attributes[attribute] || '';
			}

			DOM.addClass(tag, 'product-' + Str.kebabCase(attribute));
			overlay.appendChild(tag);
		}

		let tag = DOM.createElement('div', {
			id: 'actionButtons',
			class: 'action-buttons'
		});

		let addToCart = DOM.createElement('button', {
			id: 'addToCart',
			class: this.settings.add_button_class,
			type: 'button',
			text: '+',
		});

		let favorite = DOM.createElement('button', {
			id: 'favorite',
			class: this.settings.favorite_button_class,
			type: 'button',
			text: '&hearts;'
		});

		tag.appendChild(addToCart);
		tag.appendChild(favorite);

		addToCart.addEventListener('click', function(e) {
			e.preventDefault();
			EventManager.publish('cart.products.added', attributes);
		});

		overlay.appendChild(tag);

		return product;
	}

	/**
	 * Add the eCommerce style tags to the DOM.
	 */
	addStyleTag() 
	{
		if(DOM.find('#Turbo-eCommerce-Products')) {
			return;
		}

		let css = `
			.product {
				position: relative;
				margin: 5px 5px;
				border: 1px solid #e4e4e4;
				width: ${this.settings.width};
				height: ${this.settings.height};
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
				transition: 1s all;
			}

			.product > img {
				position: absolute;
				left: 0;
				top: 0;
				width: 100%;
				height: 100%;
			}

			.product > .product-image {
				z-index: 0;
				position: absolute;
				top: 0;
				left: 0;
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

			.product > .product-overlay > .action-buttons > #favorite {
				margin-left: 10px;
			}

		`;
	    
	    DOM.addStyle('Turbo-eCommerce-Products', css);
	}
}

export default Products;
