
import Common from '../Helpers/Common.js';

import InvalidBindingException from '../Exceptions/InvalidBindingException.js';
import InvalidArgumentException from '../Exceptions/InvalidArgumentException.js';

let instances = [];

class Container 
{
	/**
	 * Binds key to concrete class.
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
	 */
	setInstance(key, instance) 
	{
		if(typeof key != 'string' || typeof instance != 'object') {
			throw new InvalidArgumentException;
		}

		instances[key] = instance;
	}

	/**
	 * Gets an instance.
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
	 */
	instanceExist(instance) 
	{
		if(typeof instance == 'object') {
			return (typeof instances[instance.constructor.name] !== 'undefined');
		}
		
		
		return (instance in instances);
	}

	/**
	 * Creates an instance.
	 */
	make(object)
	{
		let instance = {};

		if (this.instanceExist(object)) {
			return this.getInstance(object);
		}

		if (typeof object == 'object') {
			instance = object;
		} else if(typeof object == 'string' && this.hasOwnProperty(object)) {
			instance = new this[object];	
		} else {
			throw new InvalidBindingException;
		}

		this.setInstance(object, instance); 

		return instance;
	}

	/**
	 * Retrieve all instances.
	 */
	instances() 
	{
		return instances;
	}
}

export default Container;