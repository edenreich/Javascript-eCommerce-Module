
import Str from './Helpers/Str.js';
import DOM from './Helpers/DOM.js';
import Common from './Helpers/Common.js';
import Request from './Helpers/Request.js';
import Container from './Core/Container.js';
import EventManager from './Core/EventManager.js';
import ExceptionHandler from './Exceptions/ExceptionHandler.js';

import Cart from './Components/Cart.js';
import Filter from './Components/Filter.js';
import Products from './Components/Products.js';
import Services from './Components/Services.js';
import Pagination from './Components/Pagination.js';

import InvalidArgumentException from './Exceptions/InvalidArgumentException.js';
import ComponentNotRegisteredException from './Exceptions/ComponentNotRegisteredException.js';

let defaultSettings = {
	debug_level: 'error',
	element: 'body',
	inject_libraries: [],
	components: ['Products', 'Services', 'Filter', 'Pagination', 'Cart']
};

let externalLibraries = {
	bootstrap: 'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css',
};

let debugLevel;

class TurboeCommerce
{
	constructor(settings)
	{
		if(typeof settings != 'object') {
			throw new InvalidArgumentException;
		}

		this.container = new Container;
		this.settings = Common.extend(defaultSettings, settings);

		this.loadExternalLibraries();
		this.addStyleTag();

		debugLevel = this.settings.debug_level;
		
		if (debugLevel == 'warning' || debugLevel == 'info') {
			window.onerror = function() { return true; };
		}

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
	 * Add the eCommerce style tags to the DOM.
	 */
	addStyleTag() 
	{
		if(DOM.find('#Turboe-Commerce')) {
			return;
		}

		let css = `
			${this.settings.element} {
				position: relative;
				clear: both;
			}
		`;
	    
	    DOM.addStyle('Turbo-eCommerce', css);
	}

	static debugLevel()
	{
		return debugLevel;
	}
}

/**
 * Binds components dependencies.
 *
 * @param object | components
 * @return void
 */
function bindComponentsDependencies(components) {

	this.container.setInstance('Events', new EventManager);

	let request = this.container.make(new Request);

	this.container.bind('Filter', function(container) {
		container['Filter'].booted = true;
		return new Filter(container);
	});
	
	this.container.bind('Services', function(container) { 
		container['Services'].booted = true;
		return new Services(container);
	});

	this.container.bind('Products', function(container) {
		container['Products'].booted = true;
		return new Products(container, request, container.Events);
	});

	this.container.bind('Pagination', function(container) {
		container['Pagination'].booted = true;
		return new Pagination(container, container.make('Products'), container.Events);
	});

	this.container.bind('Cart', function(container) {
		container['Cart'].booted = true;
		return new Cart(container, request, container.Events);
	});

	this.container['Filter']['booted'] = false;
	this.container['Services']['booted'] = false;
	this.container['Products']['booted'] = false;
	this.container['Pagination']['booted'] = false;
	this.container['Cart']['booted'] = false;
}

export default TurboeCommerce; 
