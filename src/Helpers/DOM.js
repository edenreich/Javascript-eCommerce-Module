
class DOM
{
	/**
	 * Minifies the css text.
	 */
	static minifyCss(string) 
	{
	    string = string.replace(/\/\*(?:(?!\*\/)[\s\S])*\*\/|[\r\n\t]+/g, '');
	    string = string.replace(/ {2,}/g, ' ');
	    string = string.replace(/([{:}])/g, '$1');
	    string = string.replace(/([;,]) /g, '$1');
	    string = string.replace(/ !/g, '!');
	    
	    return string;
	}

	/**
	 * Adds class to a given element.
	 */
	static addClass(element, className) 
	{
		if(className == '') return element;

		className = className.trim();
		className = className.split(' ');

		for(var i = 0; i < className.length; i++) {
			element.classList.add(className[i]);
		}

		return element;
	}

	/**
	 * Removes class from a given element.
	 */
	static removeClass(element, className) 
	{
		element.classList.remove(className);
		
		return element;
	}

	static element(selector) 
	{
		let element = queryElement(selector);
		return element;
	}

	static addStyle(id, css) 
	{
		if(typeof css != 'string') {
			throw new invalidArgumentException;
		}

		let head = document.head || document.getElementsByTagName('head')[0];
		let styleTag = document.createElement('style');

		// pipe it through the minfier
	    let CSS = this.minifyCss(css);
	    // adding it to the styletag
	    styleTag.innerHTML = CSS;
	    // give an id to recognize the style tag
		styleTag.setAttribute('id', id);
		// appending that style tag to the DOM head tag
		head.appendChild(styleTag);
	}
}

/**
 * Queries an element from the DOM.
 */
function queryElement(selector) {
	let element = document.querySelector(selector) || null;

	if(! element) {
		throw new NodeElementDoesNotExistException;
	}

	return element;
}

export default DOM;