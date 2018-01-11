
import BadEventCallException from '../Exceptions/BadEventCallException';

/**
 * @file 
 * EventManager class.
 *
 * Handles subscripions and publishing of events.
 */

/**
 * Stores the events callbacks.
 * 
 * @var array
 */
let events = {};

class EventManager
{
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

		if (typeof events[name] == 'undefined') {
			events[name] = [];
		}

		events[name].push(callback);
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
		if (typeof events[name] == 'undefined') {
			return;
		}

		events[name].forEach(function(callback) {
			if(typeof callback != 'function') {
				throw new InvalidArgumentException('listen() should recieve callback as second parameter, but '+ typeof callback +' was passed');
			}
			
			return callback(...data);
		});
	}
}

export default EventManager;