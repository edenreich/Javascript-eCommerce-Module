
// Helpers
import Str from './Helpers/Str.js';
import DOM from './Helpers/DOM.js';
import Common from './Helpers/Common.js';
import Request from './Helpers/Request.js';

// Core
import Container from './Core/Container.js';
import EventManager from './Core/EventManager.js';

// Components
import Cart from './Components/Cart.js';
import Filter from './Components/Filter.js';
import Checkout from './Components/Checkout.js';
import Products from './Components/Products.js';
import Services from './Components/Services.js';
import Pagination from './Components/Pagination.js';

// Exceptions
import ExceptionHandler from './Exceptions/ExceptionHandler.js';
import InvalidArgumentException from './Exceptions/InvalidArgumentException.js';
import ComponentNotRegisteredException from './Exceptions/ComponentNotRegisteredException.js';

/**
 * Stores the default settings.
 *
 * @var object
 */
let defaultSettings = {
	debug_level: 'error',
	element: 'body',
	inject_libraries: [],
	components: ['Products', 'Services', 'Filter', 'Pagination', 'Cart'],
	loading_animation: true
};

/**
 * Stores the optional, 
 * injectable external libraries 
 *
 * @var object
 */
let externalLibraries = {
	bootstrap: 'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css',
};

class TurboEcommerce
{
	/**
	 * The entery for the shop.
	 * - Setting the exception handler.
	 * - Setting the ioc container.
	 * - Extending the user settings.
	 * - Setting the element.
	 * - Disabling default errors.
	 * - Passing calls via proxy to the components.
	 *
	 * @param object | settings
	 * @return Proxy
	 */
	constructor(settings)
	{
		if (typeof settings != 'object') {
			throw new InvalidArgumentException;
		}

		this.container = new Container;
		this.settings = Common.extend(defaultSettings, settings);

		ExceptionHandler.setDebugLevel = this.settings.debug_level;
		this.loadExternalLibraries();

		document.addEventListener('DOMContentLoaded', function() {
			this.setElement(this.settings.element);
			
			if (this.settings.loading_animation) {
				startLoading.call(this);
			}

			this.addStyleTag();
		}.bind(this));

		bindComponentsDependencies.call(this, settings.components);

		return new Proxy(this, {
			get: function(target, source) {
				if (Common.in_array(source, settings.components)) {
					return target.container.make(source);
				} else if (target.container.instanceExist(source)) {
					return target.container.getInstance(source);
				}

				throw new ComponentNotRegisteredException('components must be registered in order to use them.');
			}
		});
	}

	/**
	 * Loads the external libraries which was specified.
	 * 
	 * @return void
	 */
	loadExternalLibraries()
	{
		let i;
		let libraries = this.settings.inject_libraries;

		for (i = 0; i < libraries.length; i++) {
			if (externalLibraries.hasOwnProperty(libraries[i])) {
				let id = 'Turbo-eCommerce-' + Str.ucfirst(libraries[i]);
				
				if (! DOM.find(id)) {
					DOM.addLinkedStyle(id, externalLibraries[libraries[i]]);
				}
			}
		}
	}

	/**
	 * Sets the element to be bound to.
	 *
	 * @param string | selector
	 * @return void
	 */
	setElement(selector)
	{
		this.wrapper = DOM.find(selector);
		
		DOM.addClass(this.wrapper, this.settings.class);
	}

	/**
	 * Add the eCommerce style tags to the DOM.
	 *
	 * @return void
	 */
	addStyleTag() 
	{
		if (DOM.find('#Turboe-Commerce')) {
			return;
		}

		let css = `
			${this.settings.element} {
				position: relative;
				clear: both;
			}

			.loading-progress-bar {
				position: fixed;
				top: 0;
				left: 0;
				height: 5px;
				width: 100%;
				-webkit-box-shadow: 0px 0px 5px 1px rgba(168,168,168,1);
				-moz-box-shadow: 0px 0px 5px 1px rgba(168,168,168,1);
				box-shadow: 0px 0px 5px 1px rgba(168,168,168,1);
			}

			.loading-progress-bar > .loading-progress-fill {
				width: 100%;
				height: 100%;
				position: absolute;
				background-color: #9dd2ff;
				transform: translateX(-${document.documentElement.clientWidth}px);
			}
		`;
	    
	    DOM.addStyle('Turbo-eCommerce', css);
	}
}

/**
 * Binds components dependencies.
 *
 * @param object | components
 * @return void
 */
function bindComponentsDependencies(components) {

	this.container.setInstance('Request', new Request);
	this.container.setInstance('Events', new EventManager);

	this.container.bind('Filter', function(container) {
		let component = new Filter(container);
		component.booted = true; 
		return component;
	});
	
	this.container.bind('Services', function(container) { 
		let component = new Services(container); 
		component.booted = true;
		return component;
	});

	this.container.bind('Products', function(container) {
		let component = new Products(container, container.Request, container.Events);
		component.booted = true;
		return component;
	});

	this.container.bind('Pagination', function(container) {
		let component = new Pagination(container, container.make('Products'), container.Events);
		component.booted = true;
		return component;
	});

	this.container.bind('Cart', function(container) {
		let component = new Cart(container, container.Request, container.Events);
		component.booted = true;
		return component;
	});

	this.container.bind('Checkout', function(container) {
		let component = new Checkout(container, container.Request, container.Events);
		component.booted = true;
		return component;
	});

	this.container.Filter.booted = false;
	this.container.Services.booted = false;
	this.container.Products.booted = false;
	this.container.Pagination.booted = false;
	this.container.Cart.booted = false;
	this.container.Checkout.booted = false;
}

/**
 * Attaches a loader to the top of the screen
 * and hides the content.
 * Stops automatically after 20% reached.
 *
 * @return void 
 */
function startLoading() {
	let loader = DOM.createElement('div', {
		class: 'loading-progress-bar'
	});

	let fill = DOM.createElement('span', {
		class: 'loading-progress-fill'
	});

	loader.appendChild(fill);
	document.body.appendChild(loader);


	let progress = document.documentElement.clientWidth;
	let maxSize = document.documentElement.clientWidth * 0.80;

	window.requestAnimationFrame(progressDraw)

	let content = this.wrapper;

	content.style.display = 'none';
	
	function progressDraw() {
		fill.style.transform = 'translateX(-' + progress + 'px)';
		progress -= 7;

		if (progress < maxSize) {
			done();
			return;
		}

		window.requestAnimationFrame(progressDraw);
	}

	function done() {
		fill.style.opacity = progress / 1000;
		fill.style.transform = 'translateX(-' + progress + 'px)';
	
		progress -= 15;

		if (progress <= 0) {
			content.style.display = 'block';
			
			if (typeof loader != 'undefined') {
				DOM.remove(loader);
			}

			return;
		}

		window.requestAnimationFrame(done);
	}
}

export default TurboEcommerce; 
