
class Common
{
	/**
	 * Extend an object.
	 */
	static extend(currentObj, newObj ) {
		var extended = {};
	    var prop;

	    for (prop in currentObj) {
	        if (Object.prototype.hasOwnProperty.call(currentObj, prop)) {
	            extended[prop] = currentObj[prop];
	        }
	    }

	    for (prop in newObj) {
	        if (Object.prototype.hasOwnProperty.call(newObj, prop)) {
	            extended[prop] = newObj[prop];
	        }
	    }

	    return extended;
	}

	/**
	 * Checks for a needle in hystack.
	 */
	static in_array(needle, hystack) {
		if(hystack.constructor !== Array) return;

		for(var i = 0; i <= hystack.length; i++) {
			if(needle == hystack[i]) return true;	
		}
	
		return false;
	}

	/**
	 * Checks if an object is empty.
	 */
	static emptyObject(object) {
		for(var prop in object) {
			return false;
		}

		return true;
	}

	static containsObject(object, hystack) 
	{
	    var i;

	    for (i = 0; i < hystack.length; i++) {
	        if (typeof object == 'string' && hystack[i].constructor.name === object) {
	        	return true;
	        }

	        if (hystack[i] === object) {
	            return true;
	        }
	    }

	    return false;
	}

	/**
	 * Convert camelCase to kebab-case.
	 */
	static kebabCase(string) {
		return string.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
	}

	/**
	 * Checks if a given parameter is an object.
	 */
	static isObject(object) {
		return typeof object == 'object';
	}
}

export default Common;