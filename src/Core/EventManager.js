
import BadEventCallException from '../Exceptions/BadEventCallException';

/**
 * @file 
 * EventManager class.
 *
 * Handles subscripions and publishing of events.
 */

class EventManager
{
	/**
	 * Stores the events callbacks.
	 * 
	 * @var array
	 */
	constructor()
	{
		this.events = {};
	}

	/**
	 * Subscribing to an event.
	 *
	 * @param string | name
	 * @param function | callback
	 * @return void
	 */
	subscribe(name, callback) 
	{
		if (typeof callback !== 'function') {
			throw new InvalidArgumentException;
		}

		if (typeof this.events[name] == 'undefined') {
			this.events[name] = [];
		}

		this.events[name].push(callback);
	}

	/**
	 * Publish an event to all subscribers.
	 *
	 * @param string | name
	 * @param list | data
	 * @return void
	 */
	publish(name, ...data) 
	{
		data = data || null;

		// If there are no subscribers simply ignore that event.
		if (typeof this.events[name] == 'undefined') {
			return;
		}

		this.events[name].forEach(function(callback) {
			if(typeof callback != 'function') {
				throw new InvalidArgumentException('subscribe() should recieve callback as second parameter, but '+ typeof callback +' was passed');
			}
			
			return callback(...data);
		});
	}
}

export default EventManager;