
// Helpers
import Str from './Helpers/Str.js';
import DOM from './Helpers/DOM.js';
import Common from './Helpers/Common.js';

// Core
import Container from './Core/Container.js';

// Exceptions
import ExceptionHandler from './Exceptions/ExceptionHandler.js';
import InvalidArgumentException from './Exceptions/InvalidArgumentException.js';

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
	loading_animation: true,
	hash_navigation: false,
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

		this.settings = Common.extend(defaultSettings, settings);

		ExceptionHandler.setDebugLevel = this.settings.debug_level;
		
		this.loadExternalLibraries();
		
		this.container = new Container;

		this.components = this.container.make('Components');
		this.components.register(this.settings.components);

		document.addEventListener('DOMContentLoaded', function() {
			this.setElement(this.settings.element);

			this.container.Router.register();

			if (this.settings.loading_animation) {
				startLoading.call(this);
			}

			this.addStyleTag();
		}.bind(this));

		return new Proxy(this, {
			get: function(shop, source) {
				if (shop.components.exists(source)) {
					return shop.components.provide(source);
				} 

				if (shop.container.instanceExist(source)) {
					return shop.container.getInstance(source);
				}
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
		this.element = DOM.find(selector);
		
		DOM.addClass(this.element, this.settings.class);
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

	let content = this.element;

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
