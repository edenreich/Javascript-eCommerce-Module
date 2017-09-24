
import DOM from '../Helpers/DOM.js';
import Common from '../Helpers/Common.js';
import InvalidArgumentException from '../Exceptions/InvalidArgumentException.js';

/**
 * The default settings of each product.
 */
let defaultSettings = {
	element: '.products',
	class: '',
	itemClass: '',
	width: '200px',
	height: '250px',
	attributes: ['name', 'price', 'deliveryTime', 'image'],
	url: '',
	initStaticData: {},
};

let Container;

/**
 * The Products Object, handles the products.
 */
class Products 
{
	constructor(container, paginator) 
	{
		this.setup(defaultSettings);

		Container = container;
		this.paginator = paginator;
	}

	setup(settings)
	{
		if (typeof settings != 'object') {
			throw new InvalidArgumentException;
		}

		this.settings = Common.extend(defaultSettings, settings);

		if (typeof Container == 'undefined') {
			return;
		}

		if (Container.instanceExist('Pagination'))  {
			this.paginator.reset(this.settings.initStaticData);
			this.getProducts(this.paginator.getCurrent());
		}

		this.setElement(this.settings.element);

		this.addStyleTag();
	}

	setElement(selector)
	{
		this.wrapper = DOM.element(selector);
		
		DOM.addClass(this.wrapper, this.settings.class);
	}

	/**
	 * Replace items in the container.
	 */
	replaceItems(items) {
		if (! Array.isArray(items) || typeof items[0] == 'string') {
			throw new InvalidArgumentException;
		}

		var items = this.wrapAllWithHTML(items, this.settings.itemClass, 'div');

		this.wrapper.innerHTML = items.text;

		return items;
	}

	/**
	 * Makes an Ajax call to the server.
	 */
	getProducts(pageNumber) 
	{
		return new Promise(function(resolve, reject) {
			if (this.paginator.notInPageRange(pageNumber)) {
				return reject('Not in pagination range');
			}

			var xhr = new XMLHttpRequest || new ActiveXObject("Microsoft.XMLHTTP");

			xhr.open('GET', this.settings.url + '?page='+ pageNumber, true); 

			let instance = this;

			xhr.onreadystatechange = function() {
				if(this.status == 200 && this.readyState == 4) {
					instance.currentItems = JSON.parse(this.responseText);
					
					for (var i = 0; i < instance.currentItems.length; i++) {
						var product = instance.currentItems[i];
						instance.AfterLoaded.call(this, product);
					}

					instance.replaceItems(instance.currentItems);
					resolve(instance.currentItems);
				}
			};

			xhr.onerror = function(error) {
				reject(error);
			};

			xhr.send(null);
		}.bind(this));
	}

	/**
	 * Wrap all the items with specifc tag and classname.
	 */
	wrapAllWithHTML(items, className, tagType) {
		className = className || null;
		className = (className) ? 'product ' + className : 'product';
		
		var text = '';

		items = items.map(function(product, index) {
			var item = document.createElement(tagType);
			item = DOM.addClass(item, className);

			var overlay = document.createElement('div');
			overlay.className = 'product-overlay';
			item.appendChild(overlay);

			for(var prop in product) {
				if(this.settings.attributes.indexOf(prop) == -1) {
					continue;
				}

				var tag = document.createElement(tagType);

				if(prop == 'image') {
					var image = document.createElement('img');
					image.setAttribute('src', product[prop]);
					item.appendChild(image);
				} else {
					tag.innerHTML = product[prop] || '';
				}

				tag.className = 'product-' + Common.kebabCase(prop);
				overlay.appendChild(tag);
			}

			var temp = document.createElement(tagType);
			temp.appendChild(item);
			
			text += temp.innerHTML + "\n";

			return product;
		}.bind(this));

		return {
			"data": items,
			"text": text
		};
	}

	AfterLoaded(products) 
	{
		//
	}

	/**
	 * Add the eCommerce style tags to the DOM.
	 */
	addStyleTag() 
	{
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
		`;
	    
	    return DOM.addStyle('eCommerce-Products', css);
	}
}

export default Products;
