
/**
 * @file 
 * Cookie class.
 *
 * Adds some useful functionality for
 * setting or getting cookies.
 */
	
class Cookie
{
	/**
 	* Sets a cookie.
 	* 
 	* @param string | name
 	* @param JSON | value
 	* @param integer | days
 	* @return void
	*/
	static set(name, value, days) 
	{
		if (value.constructor.name  == 'Object' || value.constructor.name == 'Array') {
			value = JSON.stringify(value);
		}

		days = days || 10;

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
	 *
	 * @param string | name
 	 * @return JSON
	 */
	static get(name) 
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

	    return {};
	}
}

export default Cookie;