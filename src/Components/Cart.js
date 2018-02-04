
// Helpers
import Str from '../Helpers/Str.js';
import DOM from '../Helpers/DOM.js';
import Cookie from '../Helpers/Cookie.js';
import Common from '../Helpers/Common.js';

// Exceptions
import InvalidCartItemException from '../Exceptions/InvalidCartItemException.js';
import InvalidArgumentException from '../Exceptions/InvalidArgumentException.js';

/**
 * @file 
 * Cart class.
 *
 * Handles adding, removing etc... of items.
 */

/**
 * The default settings of the cart.
 *
 * @var object
 */
let defaultSettings = {
	element: '.cart',
	cookie_name: 'cart',
	preview_class: '',
	loader: '',
	class: '',
	width: '60px',
	height: '60px',
	placement: 'right-top',
	fixed: true,
	hover_color: 'orange',
	no_css: false,
};

/**
 * Stores the container object.
 *
 * @var \Core\Container
 */
let Container;

/**
 * Stores the event manager object.
 *
 * @var \Core\EventManager
 */
let EventManager;

/**
 * Stores the request object.
 *
 * @var \Helpers\Request
 */
let Http;

/**
 * Stores the cart loader.
 *
 * @var HTMLDivElement
 */
let loadingOverlay;

/**
 * Stores the items wrapper.
 *
 * @var HTMLDivElement
 */
let itemsDiv

class Cart 
{
	/**
	 * - Initialize the IoC container
	 * - Initialize the Request
	 * - Initialize the EventManager
	 * - Creates the preview and the icon of the cart.
	 *
	 * @param \Core\Container | container
	 * @param \Helpers\Request | http
	 * @param \Core\EventManager | eventManager
	 * @return void
	 */
	constructor(container, http, eventManager) 
	{
		Container = container;
		Http = http;
		EventManager = eventManager;
		
		this.previewElement = this.createPreviewElement();
		this.icon = createIcon.call(this);
	}

	/**
	 * Sets the object by the users setting.
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

		this.setElement(this.settings.element);

		DOM.addClass(this.previewElement, 'closed');
		DOM.addClass(this.previewElement, this.settings.preview_class);
		
		this.addStyleTag();
		this.bindEventListeners();
		
		if (this.isEmpty(Cookie.get(this.settings.cookie_name))) {
			this.setupCart();
			
		}
	}

	/**
	 * Checks if the cart is empty
	 *
	 * @param object | cart
	 * @return bool
	 */
	isEmpty(cart)
	{
		return Common.emptyObject(cart);
	}

	/**
	 * Initialize/Sets the cart as a cookie.
	 *
	 * @param object | cart
	 * @return void
	 */
	setupCart()
	{
		this.cart = {};
		this.cart.id = Str.random(10);
		this.cart.items = [];
		this.cart.favorites = [];
		Cookie.set(this.settings.cookie_name, this.cart, 2);
	}

	/**
	 * Adds an item to the cart.
	 *
	 * @param object | item
	 * @return void
	 */
	addItem(item)
	{
		if (typeof item != 'object') {
			throw new InvalidArgumentException('addItem() expect the first parameter to be an object, but ' + typeof item + ' was passed instead');
		}

		if (! item.hasOwnProperty('id')) {
			throw new InvalidCartItemException;
		}

		this.cart = Cookie.get(this.settings.cookie_name);

		if (!item.hasOwnProperty('quantity')) {
			item.quantity = 1;
		}

		let i;
		let incremented = false;

		for (i = 0; i < this.cart.items.length; i++) {
			if (this.cart.items[i].id == item.id) {
				this.cart.items[i].quantity++;
				incremented = true;
				break;	
			}
		}

		if (! incremented) {
			this.cart.items.push(item);
		}

		Cookie.set(this.settings.cookie_name, this.cart, 2);
	}

	/**
	 * Adds an item to the favorites list.
	 *
	 * @param object | item
	 * @return void
	 */
	favoriteItem(item)
	{
		if (typeof item != 'object') {
			throw new InvalidArgumentException('favoriteItem() expect the first parameter to be an object, but ' + typeof item + ' was passed instead');
		}

		if (! item.hasOwnProperty('id')) {
			throw new InvalidCartItemException;
		}

		this.cart = Cookie.get(this.settings.cookie_name);

		let i;
		let alreadyFavorited = false;

		for (i = 0; i < this.cart.favorites.length; i++) {
			if (this.cart.favorites[i].id == item.id) {
				alreadyFavorited = true;
				break;
			}
		}

		if (! alreadyFavorited) {
			this.cart.favorites.push(item);
		}

		Cookie.set(this.settings.cookie_name, this.cart, 2);
	}

	/**
	 * Removes an item from the cart.
	 *
	 * @param object | item
	 * @return void
	 */
	removeItem(item)
	{
		if (typeof item != 'object') {
			throw new InvalidArgumentException('removeItem() expect the first parameter to be an object, but ' + typeof item + ' was passed instead');
		}

		if (! item.hasOwnProperty('id')) {
			throw new InvalidCartItemException;
		}

 		this.cart = Cookie.get(this.settings.cookie_name);

 		let i;

 		for (i = 0; i < this.cart.items.length; i++) {
 			if (this.cart.items[i].id == item.id) {
 				this.cart.items.splice(i, 1);
 				break;
 			}
 		}

 		Cookie.set(this.settings.cookie_name, this.cart, 2);
	}

	/**
	 * Adds the item to preview.
	 *
	 * @param array | items
	 * @return void
	 */
	addToPreview(items)
	{
		itemsDiv.innerHTML = '';

		let table = DOM.createElement('table');

		DOM.addClass(table, 'preview-table')

		for (let i = 0; i < items.length; i++) {

			let attributes = items[i];

			let tr = DOM.createElement('tr', {
				class: 'item'
			});

			// Quantity always at the start of an item.
			let td = DOM.createElement('td');

			td.innerHTML = attributes.quantity +'x';
			tr.appendChild(td);
			
			for(let attribute in attributes) {
				switch(attribute)
				{
					case 'image':
						td = DOM.createElement('td');
						let image = DOM.createElement('img', {
							src: attributes[attribute],
							width: '50px',
							height: '50px'
						});

						td.appendChild(image);
						break;
					case 'price':
						td = DOM.createElement('td');
						let span = DOM.createElement('span', {
							html: '&nbsp' + attributes[attribute].currency
						});
						td.innerHTML = attributes[attribute].amount;
						td.appendChild(span);
						break;
					case 'name':
						td = DOM.createElement('td');
						td.innerHTML = attributes[attribute];
						break;
				}
			
				tr.appendChild(td);
			}

			table.appendChild(tr);
		}

		// create checkout button at the bottom of the preview
		let tr = DOM.createElement('tr');
		let td = DOM.createElement('td', {
			colspan: '3',
		});

		let checkout = DOM.createElement('a', {
			class: 'btn btn-primary',
			text: 'Checkout'
		});

		checkout.onclick = function(e) {
			e.preventDefault();
			EventManager.publish('cart.checkout');
		}.bind(this);

		td.appendChild(checkout);
		tr.appendChild(td);

		// create total sum at the bottom of the preview
		td = DOM.createElement('td', {
			colspan: '1',
		});

		let total = DOM.createElement('div', {
			class: 'cart-total',
			text: this.total()
		});

		td.appendChild(total);
		tr.appendChild(td);

		table.appendChild(tr);

		itemsDiv.appendChild(table);
	}

	/**
	 * Calculates the total of the cart
	 * and retrieve it.
	 *
	 * @return number 
	 */
	total()
	{
 		this.cart = Cookie.get(this.settings.cookie_name);

 		var total = 0.00;
 		let i;

 		for (i = 0; i < this.cart.items.length; i++) {
 			total += parseFloat(this.cart.items[i].price.amount) * this.cart.items[i].quantity;
 		}

 		return total.toFixed(2);
	}

	/**
	 * Binds everthing to the element.
	 *
	 * @param string | selector
	 * @return void
	 */
	setElement(selector)
	{
		this.element = DOM.find(selector);

		if (this.element) {
			DOM.addClass(this.element, this.settings.class);
			DOM.addClass(this.element, this.settings.placement);
			this.element.appendChild(this.icon);
			this.element.appendChild(this.previewElement);
		}
	}

	/**
	 * Creates the cart details preview element.
	 *
	 * @return HTMLDivElement
	 */
	createPreviewElement()
	{
		let previewElement = DOM.createElement('div', {
			id: 'preview'
		});

		itemsDiv = DOM.createElement('ul', {
				class: 'items'
			});

		previewElement.appendChild(itemsDiv);

		return previewElement;
	}

	/**
	 * Add the eCommerce style tags to the DOM.
	 *
	 * @return void
	 */
	addStyleTag() 
	{
		if (DOM.find('#Turbo-eCommerce-Cart')) {
			return;
		}

		if (this.settings.no_css) {
			return;
		}

		let position = (this.settings.fixed) ? 'fixed' : 'absolute';

		let css = `
			${this.settings.element} {
				position: ${position};
				cursor: pointer;
				color: #ffffff;
				z-index: 998;
			}

			${this.settings.element} svg {
				width: ${this.settings.width};
				height: ${this.settings.height};
				transition: fill 0.3s;
			}

			${this.settings.element} svg:hover {
				fill: ${this.settings.hover_color};
				transition: fill 0.3s;
			}

			${this.settings.element}.top-right,
			${this.settings.element}.right-top {
				right: 10px;
				top: 10px;
			}

			${this.settings.element}.left-top,
			${this.settings.element}.top-left {
				left: 10px;
				top: 10px;
			}

			${this.settings.element} > #preview {
				position: ${position};
				z-index: 9999;
				top: calc(10px + ${this.settings.height});
				transform: translateX(60px);
				height: 400px;
				width: 300px;
				border: 1px solid #e4e4e4;
				background: #ffffff;
				transition: transform 1s, visibility 1s;
				cursor: default;
				overflow-Y: scroll;
			}

			${this.settings.element} > #preview.opened {
				visibility: visible;
				transform: translateX(-240px);
			}

			${this.settings.element} > #preview.closed {
				visibility: hidden;
				transform: translateX(60px);
			}

			${this.settings.element} #preview > ul.items {
				padding: 0;
				color: #000000;
				list-style-type: none;
			}

			${this.settings.element} #preview > ul.items > .preview-table {
				width: 100%;
			}

			${this.settings.element} #preview > ul.items > .preview-table td {
				padding: 4px;
			}

			${this.settings.element} .items.loading {
				display: none;
				overflow-Y: none;
			}

			${this.settings.element} .cart-loader-overlay {
				position: fixed;
				top: 0; 
			    left: 0;
			    right: 0;
			    bottom: 0;
				background: #ffffff;
				width: 100%;
				height: 100%;
				min-height: 100%;
				overflow: auto;
			}

			${this.settings.element} .cart-loader-overlay .cart-loader {
				position: absolute;
				width: 50px;
				height: 50px;
				margin-left: -25px;
				margin-top: -25px;
				left: 50%;
				right: 50%;
				top: 50%;
				bottom: 50%;
			}
		`;
	    
	    DOM.addStyle('Turbo-eCommerce-Cart', css);
	}

	/**
	 * Creates an loading overlay.
	 *
	 * @return HTMLDivElement
	 */
	loadingOverlay()
	{
		if (loadingOverlay) {
			return loadingOverlay;
		}

		let loader;

		if (this.settings.loader) {
			loader = DOM.createElement('img', {
				src: this.settings.loader,
				class: 'cart-loader'
			});
		} else {
			loader = createLoader();
		}

		loadingOverlay = DOM.createElement('div', {
			class: 'cart-loader-overlay'
		});

		loadingOverlay.appendChild(loader);

		return loadingOverlay;
	}

	/**
	 * Loading the cart preview.
	 *
	 * @return void
	 */
	previewStartLoading()
	{
		DOM.addClass(itemsDiv, 'loading');
		this.previewElement.appendChild(this.loadingOverlay());
	}

	/**
	 * Loading the cart preview.
	 *
	 * @return void
	 */
	previewStopLoading()
	{
		if (DOM.find('.cart-loader-overlay', this.previewElement)) {
			this.previewElement.removeChild(this.loadingOverlay());
			DOM.removeClass(itemsDiv, 'loading');
		}
	}

	/**
	 * Reloads the items in the cart preview.
	 *
	 * @return void
	 */
	reloadCartPreview()
	{
		this.previewStartLoading();
		let items = this.getCartItems();
		this.addToPreview(items);
		
		let instance = this;

		setTimeout(function() {
			instance.previewStopLoading.call(instance);
		}, 1000);
	}

	/**
	 * Binds event listeners to the cart icon.
	 *
	 * @return void
	 */
	bindEventListeners()
	{
		this.icon.onclick = function(e) {
			e.preventDefault();
			this.toggleCartPreview();
		}.bind(this);

		EventManager.subscribe('cart.product.added', function(attributes) {
			this.openCartPreview();
			this.addItem(attributes);
			this.reloadCartPreview();
		}.bind(this));

		EventManager.subscribe('cart.product.favorited', function(attributes) {
			this.favoriteItem(attributes);
		}.bind(this));
	}

	/**
	 * Opens the cart preview.
	 *
	 * @return void 
	 */
	openCartPreview()
	{
		if (DOM.hasClass(this.previewElement, 'opened')) {
			this.reloadCartPreview();
		}

		DOM.switchClasses(this.previewElement, 'closed', 'opened');
		this.reloadCartPreview();
	}

	/**
	 * Toggles the opening closing of the cart preview.
	 *
	 * @return void 
	 */
	toggleCartPreview()
	{
		let opening = DOM.toggleClass(this.previewElement, 'opened', 'closed');
			
		if (opening) {
			this.reloadCartPreview();	
		}
	}

	/**
	 * Retrieve the carts items from the cookie.
	 *
	 * @return object
	 */
	getCartItems()
	{
		let cart = Cookie.get(this.settings.cookie_name);

		return (cart) ? cart.items : [];
	}

	/**
	 * Hides the component from the DOM.
	 *
	 * @return void 
	 */
	hide()
	{
		this.element.style.display = 'none';
	}
}

/**
 * Closes the cart preview element.
 *
 * @param event.click
 */
function close(event) {
	event.preventDefault();
	DOM.switchClasses(this.previewElement, 'opened', 'closed');
}

/**
 * Creates the cart svg icon.
 *
 * @return SVGSVGElement
 */
function createIcon() {
	let svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
	let g = document.createElementNS("http://www.w3.org/2000/svg", "g");
	let path = document.createElementNS("http://www.w3.org/2000/svg", "path");

	svg.setAttribute('version', '1.1');
	svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
	svg.setAttribute('xmlns:xlink', 'http://www.w3.org/1999/xlink');
	svg.setAttribute('x', '0px');
	svg.setAttribute('y', '0px');
	svg.setAttribute('width', '40px');
	svg.setAttribute('height', '40px');
	svg.setAttribute('viewBox', '0 0 446.843 446.843');
	svg.setAttribute('style', 'enable-background:new 0 0 446.843 446.843;');
	svg.setAttribute('xml:space', 'preserve');

	path.setAttribute('d', 'M444.09,93.103c-2.698-3.699-7.006-5.888-11.584-5.888H109.92c-0.625,0-1.249,0.038-1.85,0.119l-13.276-38.27c-1.376-3.958-4.406-7.113-8.3-8.646L19.586,14.134c-7.374-2.887-15.695,0.735-18.591,8.1c-2.891,7.369,0.73,15.695,8.1,18.591l60.768,23.872l74.381,214.399c-3.283,1.144-6.065,3.663-7.332,7.187l-21.506,59.739c-1.318,3.663-0.775,7.733,1.468,10.916c2.24,3.183,5.883,5.078,9.773,5.078h11.044c-6.844,7.616-11.044,17.646-11.044,28.675c0,23.718,19.298,43.012,43.012,43.012s43.012-19.294,43.012-43.012c0-11.029-4.2-21.059-11.044-28.675h93.776c-6.847,7.616-11.048,17.646-11.048,28.675c0,23.718,19.294,43.012,43.013,43.012c23.718,0,43.012-19.294,43.012-43.012c0-11.029-4.2-21.059-11.043-28.675h13.433c6.599,0,11.947-5.349,11.947-11.948c0-6.599-5.349-11.947-11.947-11.947H143.647l13.319-36.996c1.72,0.724,3.578,1.152,5.523,1.152h210.278c6.234,0,11.751-4.027,13.65-9.959l59.739-186.387C447.557,101.567,446.788,96.802,444.09,93.103z M169.659,409.807c-10.543,0-19.116-8.573-19.116-19.116s8.573-19.117,19.116-19.117s19.116,8.574,19.116,19.117S180.202,409.807,169.659,409.807z M327.367,409.807c-10.543,0-19.117-8.573-19.117-19.116s8.574-19.117,19.117-19.117c10.542,0,19.116,8.574,19.116,19.117S337.909,409.807,327.367,409.807z M402.52,148.149h-73.161V115.89h83.499L402.52,148.149z M381.453,213.861h-52.094v-37.038h63.967L381.453,213.861z M234.571,213.861v-37.038h66.113v37.038H234.571z M300.684,242.538v31.064h-66.113v-31.064H300.684z M139.115,176.823h66.784v37.038h-53.933L139.115,176.823z M234.571,148.149V115.89h66.113v32.259H234.571z M205.898,115.89v32.259h-76.734l-11.191-32.259H205.898z M161.916,242.538h43.982v31.064h-33.206L161.916,242.538z M329.359,273.603v-31.064h42.909l-9.955,31.064H329.359z');

	g.appendChild(path);
	svg.appendChild(g);

	let  div = DOM.createElement('div', {
		id: 'cartIcon',
	});

	div.appendChild(svg);

	return div;
}

/**
 * Creates the cart loader icon.
 *
 * @return SVGSVGElement
 */
function createLoader() {
	let svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
	let count = 12;
	let groups = [];
	let rectangels = [];
	let animations = [];

	svg.setAttribute('class', 'lds-spinner');
	svg.setAttribute('width', '200px');
	svg.setAttribute('height', '200px');
	svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
	svg.setAttribute('xmlns:xlink', 'http://www.w3.org/1999/xlink');
	svg.setAttribute('viewBox', '0 0 100 100');
	svg.setAttribute('preserveAspectRatio', 'xMidYMid');
	svg.setAttribute('style', 'background: none;');
	
	var rotation = 0;

	for (var i = 0; i < count; i++) {
		let group = document.createElementNS("http://www.w3.org/2000/svg", "g");
		group.setAttribute('transform', 'rotate(' + rotation + ' 50 50)');
		rotation += 30;
		groups.push(group);
	}

	for (var i = 0; i < count; i++) {
		let rectangel = document.createElementNS("http://www.w3.org/2000/svg", "rect");
		rectangel.setAttribute('x', '47');
		rectangel.setAttribute('y', '24');
		rectangel.setAttribute('rx', '9.4');
		rectangel.setAttribute('ry', '4.8');
		rectangel.setAttribute('width', '6');
		rectangel.setAttribute('height', '12');
		rectangel.setAttribute('fill', '#4658ac');
		rectangels.push(rectangel);
	}

	var begin = 0.09 * 11;

	for (var i = 0; i < count; i++) {
		let animate = document.createElementNS("http://www.w3.org/2000/svg", "animate");
		animate.setAttribute('attributeName', 'opacity');
		animate.setAttribute('values', '1;0');
		animate.setAttribute('times', '0;1');
		animate.setAttribute('dur', '1s');
		animate.setAttribute('begin', begin.toFixed(8) + 's');
		animate.setAttribute('repeatCount', 'indefinite');
		animations.push(animate);
		begin -= 0.09;
	}

	for (var i = 0; i < groups.length; i++) {
		let group = groups[i];		
		let rectangel = rectangels[i];
		let animate = animations[i];
		rectangel.appendChild(animate);
		group.appendChild(rectangel);
		svg.appendChild(group);
	}

	DOM.addClass(svg, 'cart-loader');

	return svg;	
}

export default Cart;
