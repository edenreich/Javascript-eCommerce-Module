
import DOM from './Helpers/DOM.js';
import Event from './Core/Event.js';
import Common from './Helpers/Common.js';
import Container from './Core/Container.js';
import ExceptionHandler from './Exceptions/ExceptionHandler.js';

import Filter from './Components/Filter.js';
import Products from './Components/Products.js';
import Services from './Components/Services.js';
import Pagination from './Components/Pagination.js';

import ComponentsException from './Exceptions/ComponentsException.js';
import BadEventCallException from './Exceptions/BadEventCallException.js';
import InvalidArgumentException from './Exceptions/InvalidArgumentException.js';
import ComponentNotRegisteredException from './Exceptions/ComponentNotRegisteredException.js';
import NodeElementDoesNotExistException from './Exceptions/NodeElementDoesNotExistException.js';

let initalized = false;

let defaultSettings = {
	cartSessionId: [],
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
	let container = this.container;

	container.bind('Filter', function() {
		return new Filter(container);
	});
	
	container.bind('Services', function() { 
		return new Services(container);
	});

	container.bind('Pagination', function() {
		return new Pagination(container);
	});

	container.bind('Products', function() {
		return new Products(container, container.make('Pagination'));
	});
}

export default eCommerce;
