
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
	static kebabCase(string) 
	{
		return string.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
	}

	/**
	 * Checks if a given parameter is an object.
	 */
	static isObject(object) 
	{
		return typeof object == 'object';
	}

	/**
 	* Sets a cookie. 
	*/
	static createCookie(name, value, days) 
	{
		if (value.constructor.name == 'Array') {
			value = JSON.stringify(value);
		}

	    let expires;
	    
	    if (days) {
	        let date = new Date();
	        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
	        expires = "; expires=" + date.toGMTString();
	    } else {
	        expires = "";
	    }

	    document.cookie = name + "=" + value + expires + "; path=/";
	}

	/**
	 * Retrieves the cookie by name.
	 */
	static getCookie(name) 
	{
	    if (document.cookie.length > 0) {
	        let c_start = document.cookie.indexOf(name + "=");
	        
	        if (c_start != -1) {
	            c_start = c_start + name.length + 1;
	            let c_end = document.cookie.indexOf(";", c_start);
	            
	            if (c_end == -1) {
	                c_end = document.cookie.length;
	            }

	            return JSON.parse(unescape(document.cookie.substring(c_start, c_end)));
	        }
	    }

	    return [];
	}

	/**
	 * Generates a random string.
	 */
	static randomStr(length) 
	{
		let string = '';
		let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

		for (let i = 0; i < length; i++) {
	    	string += possible.charAt(Math.floor(Math.random() * possible.length));
		}

		return string;
	}
}

export default Common;