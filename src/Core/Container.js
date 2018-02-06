
// Helpers
import Common from '../Helpers/Common.js';
import Request from '../Helpers/Request.js';

// Core
import Router from './Router.js';
import EventManager from './EventManager.js';
import ComponentsProvider from './ComponentsProvider.js';

// Exceptions
import InvalidBindingException from '../Exceptions/InvalidBindingException.js';
import InvalidArgumentException from '../Exceptions/InvalidArgumentException.js';

/**
 * @file 
 * Container class.
 *
 * Handles/Controls the dependencies of ecommerce.
 */

class Container 
{
	/**
	 * - Initialize instances member.
	 * - Register bindings.
	 *
	 * @return void
	 */
	constructor()
	{
		this.instances = [];
		this.register();
		this.registerProviders();
		this.registerRouter();
	}

	/**
	 * Binds key to concrete class.
	 *
	 * @param string | key
	 * @param class | concrete
	 * @return void
	 */
	bind(key, concrete, namespace = null) 
	{
		if (typeof key != 'string') {
			throw new InvalidArgumentException('bind() expects the first parameter to be string, but ' + typeof key + ' was passed instead.');
		}

		if (typeof concrete != 'function') { 
			throw new InvalidArgumentException('bind() expects the second parameter to be a function, but ' + typeof concrete + ' was passed instead.');
		}

		if (namespace) {
			if (typeof this[namespace] == 'undefined') {
				this[namespace] = {};
			}

			this[namespace][key] = concrete.bind(concrete, this, key);
		} else {
			this[key] = concrete.bind(concrete, this, key);
		}
	}

	/**
	 * Sets an instance.
	 *
	 * @param string | key
	 * @param object | instance
	 * @param string | alias
	 * @return void
	 */
	setInstance(key, instance, alias = null) 
	{
		if (typeof key != 'string') {
			throw new InvalidArgumentException('setInstace() expects the first parameter to be a string, but ' + typeof key + ' was passed instead.');
		}

		if (typeof instance != 'object') {
			throw new InvalidArgumentException('setInstance() expects the second parameter to be an object, but ' + typeof instance + ' was passed instead.');
		}

		this.instances[key] = instance;
		this[key] = instance;
	}

	/**
	 * Resolves an instance out of 
	 * the ioc container.
	 * 
	 * @param string | key
	 * @return object
	 */
	getInstance(key) 
	{
		if (typeof key != 'string' && typeof key != 'object') {
			throw new InvalidArgumentException('getInstace() expects the first parameter to be a string, but ' + typeof key + ' was passed instead.');
		}

		if (typeof key == 'object') {
			return this.instances[key.constructor.name] || null;
		}

		return this.instances[key] || null;
	}

	/**
	 * Checks if an instance exist.
	 *
	 * @param mixed | instance
	 * @return bool
	 */
	instanceExist(instance) 
	{
		if (typeof instance == 'object' || typeof instance == 'symbol') {
			return (typeof this.instances[instance.constructor.name] !== 'undefined');
		} else if (typeof instance == 'string') {
			return (typeof this.instances[instance] !== 'undefined')
		}
		
		throw new InvalidArgumentException('instanceExist() expects the first parameter to be string or an object, but ' + typeof instance + ' was passed instead.');
	}

	/**
	 * Retrieve an object, if not exists
	 * will create it, set it in the ioc container
	 * for later use and retrieve it.
	 *
	 * @param mixed | object 
	 * @return object
	 */
	make(object)
	{
		let instance = {};
		let key;
		
		if (this.instanceExist(object)) {
			return this.getInstance(object);
		}

		if (typeof object == 'object') {
			instance = object;
			key = object.constructor.name;
			this.setInstance(key, instance); 
		} else if (typeof object == 'string' && this.hasOwnProperty(object)) {
			instance = new this[object];
			key = object;
			this.setInstance(key, instance);	
		} else if (typeof object == 'string' && this.Components.exists(object)) {
			instance = new this.components[object];
			key = object;
			this.setInstance(key, instance);
		} else {
			throw new InvalidBindingException('Container.make() could not create the object!');
		}

		return instance;
	}

	/**
	 * Remove all existing instances.
	 *
	 * @return void 
	 */
	flush()
	{
		this.instances = [];
	}

	/**
	 * Registers the dependecies.
	 *
	 * @return void 
	 */
	register()
	{
		this.setInstance('Request', new Request);
		this.setInstance('Events', new EventManager);
	}

	/**
	 * Registers the providers.
	 *
	 * @return void 
	 */
	registerProviders()
	{
		this.setInstance('Components', new ComponentsProvider(this));
	}

	registerRouter()
	{
		this.setInstance('Router', new Router(this));
	}
}

export default Container;