
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

let initalized = false;

let defaultSettings = {
	importBootstrap: false,
	components: ['Products', 'Services', 'Filter', 'Pagination']
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
		
		bindComponentsDependencies.call(this, settings.components);

		initalized = true;

		return new Proxy(this, {
			get: function(target, object) {
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
		return new Filter(container);
	});
	
	this.container.bind('Services', function(container) { 
		return new Services(container);
	});

	this.container.bind('Pagination', function(container) {
		return new Pagination(container);
	});

	this.container.bind('Products', function(container) {
		return new Products(container, container.make('Pagination'));
	});

	this.container.bind('Cart', function(container) {
		return new Cart(container);
	});
}

export default eCommerce;
