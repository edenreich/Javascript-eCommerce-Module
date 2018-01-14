
import InvalidArgumentException from '../Exceptions/InvalidArgumentException.js';

/**
 * @file 
 * Common class.
 *
 * Adds some useful functionality for
 * common tasks - data checks or data manipulation.
 */

class Common
{
	/**
	 * Extend an object.
	 *
	 * @param object | currentObject
	 * @param object | newObject
	 * @return object
	 */
	static extend(currentObject, newObject) {
		var extended = {};
	    var prop;

	    for (prop in currentObject) {
	        if (Object.prototype.hasOwnProperty.call(currentObject, prop)) {
	            extended[prop] = currentObject[prop];
	        }
	    }

	    for (prop in newObject) {
	        if (Object.prototype.hasOwnProperty.call(newObject, prop)) {
	            extended[prop] = newObject[prop];
	        }
	    }

	    return extended;
	}

	/**
	 * Checks for a needle in hystack array.
	 *
	 * @param mixed | needle
	 * @param object | object
	 * @return bool
	 *
	 */
	static in_array(needle, hystack) {
		if(hystack.constructor !== Array) {
			throw new InvalidArgumentException;
		}

		for(var i = 0; i <= hystack.length; i++) {
			if(needle == hystack[i]) {
				return true;	
			}
		}
	
		return false;
	}

	/**
	 * Takes an array and chunks it.
	 *
	 * @param array | total
	 * @param number | chunks
	 * @return array
	 */
	static array_chunk(total, size = 5)
	{        
      	if (isNaN(size)) {
      		throw new InvalidArgumentException('Common.array_chunk() expects the second parameter to be a number, but ' + typeof size + ' passed instead.')
      	}

      	size = parseInt(size);
       
       	let i;
       	let collection = [];

        // add each chunk to the result
        for (i = 0; i < Math.ceil(total.length / size); i++) {
            
            var start = i * size;
            var end = start + size;
            
            collection.push(total.slice(start, end));
            
        }
        
        return collection;
	}

	/**
	 * Checks if an object is empty.
	 *
	 * @param object | object
	 * @return bool
	 */
	static emptyObject(object) {
		for (let prop in object) {
			return false;
		}

		return true;
	}


	/**
	 * Checks if a given object contained in an array.
	 * 
	 * @param object | object
	 * @param array | haystack
	 * @return bool
	 */
	static containsObject(object, hystack) 
	{
	    let i;

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
	 * Checks if a given parameter is an object.
	 * 
	 * @param object | object
	 * @return bool
	 */
	static isObject(object) 
	{
		return typeof object == 'object';
	}
}

export default Common;