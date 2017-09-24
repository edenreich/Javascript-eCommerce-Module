
class Event
{
	/**
	 * Listen to an event.
	 */
	static listen(name, callback) {
		if (typeof callback !== 'function') {
			throw new InvalidArgumentException;
		}

		events[name] = callback;
	}

	/**
	 * Fires an event.
	 */
	static trigger(name, data) {
		data = data || null;

		if(typeof events[name] !== 'function') {
			throw new BadEventCallException;
		}

		if(data != null && data instanceof Array) {
	
			return events[name](...data);
		}

		events[name]();
	}
}

export default Event;