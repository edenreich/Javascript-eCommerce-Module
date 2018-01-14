
/**
 * @file 
 * Str class.
 *
 * Adds some useful functionality for
 * manipulating strings or creating string.
 */

class Str
{
	/**
	 * Convert camelCase to kebab-case.
	 *
	 * @param string | string
	 * @return string
	 */
	static kebabCase(string) 
	{
		return string.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
	}

	/**
	 * Generates a random string.
	 *
	 * @param integer | length
	 * @return string
	 */
	static random(length) 
	{
		let string = '';
		let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

		for (let i = 0; i < length; i++) {
	    	string += possible.charAt(Math.floor(Math.random() * possible.length));
		}

		return string;
	}

	/**
	 * Changes the first letter 
	 * of the string to uppercase.
	 * 
	 * @param string | string
	 * @return string
	 */
	static ucfirst(string) 
	{
	    return string.charAt(0).toUpperCase() + string.slice(1);
	}
}

export default Str;