
import Common from '../Helpers/Common.js';

import InvalidBindingException from '../Exceptions/InvalidBindingException.js';
import InvalidArgumentException from '../Exceptions/InvalidArgumentException.js';

/**
 * @file 
 * Container class.
 *
 * Handles/Controls the dependencies of ecommerce.
 */

/**
 * Stores the instances
 *
 * @var array
 */
let instances = [];

class Container 
{
	/**
	 * Binds key to concrete class.
	 *
	 * @param string | key
	 * @param class | concrete
	 * @return void
	 */
	bind(key, concrete) 
	{
		if (typeof key != 'string' || typeof concrete != 'function') {
			throw new InvalidArgumentException;
		}

		if (typeof this[key] != 'undefined') {
			throw new InvalidBindingException;
		}

		this[key] = concrete.bind(concrete, this);
	}

	/**
	 * Sets an instance.
	 *
	 * @param string | key
	 * @param object | instance
	 * @return void
	 */
	setInstance(key, instance) 
	{
		if(typeof key != 'string' || typeof instance != 'object') {
			throw new InvalidArgumentException;
		}

		instances[key] = instance;
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
		if(typeof key != 'string') {
			throw new InvalidArgumentException;
		}

		if(typeof key == 'object') {
			return instances[key.constructor.name] || null;
		}

		return instances[key] || null;
	}

	/**
	 * Checks if an instance exist.
	 *
	 * @param mixed | instance
	 * @return bool
	 */
	instanceExist(instance) 
	{
		if (typeof instance == 'object') {
			return (typeof instances[instance.constructor.name] !== 'undefined');
		} else if (typeof instance == 'string') {
			return (typeof instances[instance] !== 'undefined')
		}
		
		throw new InvalidArgumentException;
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
		} else if(typeof object == 'string' && this.hasOwnProperty(object)) {
			instance = new this[object];
			key = object;
			this.setInstance(key, instance);	
		} else {
			throw new InvalidBindingException;
		}

		return instance;
	}

	/**
	 * Retrieve all instances.
	 *
	 * @return array
	 */
	instances() 
	{
		return instances;
	}
}

export default Container;