
let events = [];

class Event
{
	/**
	 * Listen to an event.
	 */
	static listen(name, callback) {
		if (typeof callback !== 'function') {
			throw new InvalidArgumentException;
		}

		if (typeof events[name] == 'undefined') {
			events[name] = [];
		}

		events[name].push(callback);
	}

	/**
	 * Fires an event.
	 */
	static trigger(name, ...data) {
		data = data || null;

		events[name].forEach(function(callback) {
			if(typeof callback !== 'function') {
				throw new BadEventCallException;
			}
			
			return callback(...data);
		});
	}
}

export default Event;