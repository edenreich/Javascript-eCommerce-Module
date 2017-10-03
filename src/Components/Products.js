
import DOM from '../Helpers/DOM.js';
import Common from '../Helpers/Common.js';
import InvalidArgumentException from '../Exceptions/InvalidArgumentException.js';

/**
 * The default settings of each product.
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
 */
let Container;

/**
 * The Products Object, handles the products.
 */
class Products 
{
	/**
	 * Initalize the Container.
	 */
	constructor(container) 
	{
		Container = container;
	}

	/**
	 * Sets the given settings from the user.
	 */
	setup(settings)
	{
		document.addEventListener('DOMContentLoaded', function() {
			
		if (typeof settings != 'object') {
			throw new InvalidArgumentException;
		}

		this.settings = Common.extend(defaultSettings, settings);

		this.setElement(this.settings.element);

		this.addStyleTag();	
		
		this.loadProducts();

		}.bind(this));
	}

	/**
	 * Loads the products and replace them in the div container.
	 */
	loadProducts()
	{
		let request = this.getProducts();
			
		request.then(function(items) {
			this.replaceItems(items);
		}.bind(this)).catch(function(error) {

		});
	}

	/**
	 * Sets the DOM element for populating the products.
	 */
	setElement(selector)
	{
		this.wrapper = DOM.element(selector);

		if (this.wrapper) {
			DOM.addClass(this.wrapper, this.settings.class);
		}
	}

	/**
	 * Replace items in the container.
	 */
	replaceItems(items) 
	{
		if (! Array.isArray(items) || (items.length <= 0 && typeof items[0] == 'string')) {
			throw new InvalidArgumentException;
		}

		let products = this.buildProducts(items, this.settings.item_class, 'div');

		this.wrapper.innerHTML = products;

		return items;
	}

	/**
	 * Makes an Ajax call to the server without parameters.
	 */
	getProducts()
	{
		return this.askServer();
	}

	/**
	 * Makes an Ajax call to the server.
	 */
	getProductsByPage(pageNumber) 
	{
		return this.askServer(pageNumber);
	}

	/**
	 * Sends the request to the server.
	 */
	askServer(pageNumber)
	{
		pageNumber = pageNumber || null;

		return new Promise(function(resolve, reject) {

			let xhr = new XMLHttpRequest || new ActiveXObject("Microsoft.XMLHTTP");

			if(pageNumber) {
				xhr.open('GET', this.settings.url + '?page=' + pageNumber, true);
			} else {
				xhr.open('GET', this.settings.url, true);
			}

			xhr.setRequestHeader('Content-Type', 'application/json');
			
			let instance = this;

			xhr.onreadystatechange = function() {
				if (this.readyState == 4) {
					if (this.status == 200) {
						instance.currentItems = (this.responseText == '') ? [] : JSON.parse(this.responseText);
					
						if(instance.currentItems.length === 0) {
							reject('No Items were retrieved!');
						}

						for (var i = 0; i < instance.currentItems.length; i++) {
							var product = instance.currentItems[i];
							instance.AfterLoaded.call(this, product);
						}

						resolve(instance.currentItems);
					} else {
						reject(this.statusText);
					}
				}
			};

			xhr.onerror = function(error) {
				reject(error);
			};

			xhr.send(null);
		}.bind(this));
	}

	/**
	 * Builds the html for the products.
	 */
	buildProducts(attributesCollection, className, tagType) 
	{
		if(attributesCollection.constructor.name != 'Array' ) {
			throw new InvalidArgumentException;
		}

		let builtProducts = '';

		attributesCollection.forEach(function(attributes) {
			builtProducts += this.buildProduct(attributes, className, tagType);
		}.bind(this));

		return builtProducts;
	}

	/**
	 * Builds the html for a single product.
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

			DOM.addClass(tag, 'product-' + Common.kebabCase(attribute));
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

		overlay.appendChild(tag);

		return product.outerHTML;
	}

	/**
	 * An event for the client of when the products as been loaded.
	 */
	AfterLoaded(product) 
	{
		//
	}

	/**
	 * Add the eCommerce style tags to the DOM.
	 */
	addStyleTag() 
	{
		if(DOM.element('#eCommerce-Products')) {
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
	    
	    DOM.addStyle('eCommerce-Products', css);
	}
}

export default Products;
