
class Str
{

	/**
	 * Convert camelCase to kebab-case.
	 */
	static kebabCase(string) 
	{
		return string.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
	}

	/**
	 * Generates a random string.
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

}

export default Str;