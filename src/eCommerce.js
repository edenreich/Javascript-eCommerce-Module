
import DOM from './Helpers/DOM.js';
import Event from './Core/Event.js';
import Common from './Helpers/Common.js';
import Container from './Core/Container.js';
import ExceptionHandler from './Exceptions/ExceptionHandler.js';

import Filter from './Components/Filter.js';
import Products from './Components/Products.js';
import Services from './Components/Services.js';
import Pagination from './Components/Pagination.js';
import Cart from './Components/Cart.js';

import InvalidArgumentException from './Exceptions/InvalidArgumentException.js';
import ComponentNotRegisteredException from './Exceptions/ComponentNotRegisteredException.js';

let initalized = false;

let defaultSettings = {
	element: 'body',
	importBootstrap: false,
	components: ['Products', 'Services', 'Filter', 'Pagination', 'Cart']
};

class eCommerce
{
	constructor(settings)
	{
		ExceptionHandler.initalize();

		if(typeof settings != 'object') {
			throw new InvalidArgumentException;
		}

		this.container = new Container;
		this.settings = Common.extend(defaultSettings, settings);
		this.settings.element = DOM.find(this.settings.element);
		
		bindComponentsDependencies.call(this, settings.components);

		initalized = true;

		return new Proxy(this, {
			get: function(target, object) {
				if(! Common.in_array(object, settings.components)) {
					throw new ComponentNotRegisteredException;
				}

				return target.container.make(object);
			}
		});
	}
}

/**
 * Binds components dependencies.
 */
function bindComponentsDependencies(components) {
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
		return new Products(container);
	});

	this.container.bind('Pagination', function(container) {
		container['Pagination'].booted = true;
		return new Pagination(container, container.make('Products'));
	});

	this.container.bind('Cart', function(container) {
		container['Cart'].booted = true;
		return new Cart(container);
	});

	this.container['Filter']['booted'] = false;
	this.container['Services']['booted'] = false;
	this.container['Products']['booted'] = false;
	this.container['Pagination']['booted'] = false;
	this.container['Cart']['booted'] = false;
}

export default eCommerce;
