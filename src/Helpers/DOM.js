
import InvalidArgumentException from '../Exceptions/InvalidArgumentException.js';

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
	 * Switches between two given classes.
	 */
	static switchClasses(element, className, newClassName) 
	{
		this.removeClass(element, className);
		this.addClass(element, newClassName);
	}

	/**
	 * Adds class to a given element.
	 */
	static addClass(element, className) 
	{
		if(element === null) {
			throw new InvalidArgumentException;
		}

		if(! className || className == '' || typeof className === undefined) {
			return element;
		}

		let classNames = className.split(' ');

		classNames.forEach(function(name) {
			element.classList.add(name);
		});
		
		return element;
	}

	/**
	 * Removes class from a given element.
	 */
	static removeClass(element, className) 
	{
		if(element == null) {
			throw new InvalidArgumentException;
		}

		if(className == '') {
			element.className = '';
		} else {

			let classNames = className.split(' ');

			classNames.forEach(function(name) {
				element.classList.remove(name);
			});
		}

		return element;
	}

	/**
	 * Queries the element from the DOM.
	 */
	static element(selector) 
	{
		return queryElement.call(this, document, selector);
	}

	/**
	 * Adds style tag with given id and css to the DOM.
	 */
	static addStyle(id, css) 
	{
		if(typeof css != 'string') {
			throw new InvalidArgumentException;
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

	/**
	 * Creates an element with the given options.
	 */
	static createElement(elementType, options)
	{
		let element = document.createElement(elementType);
	
		if (options === undefined) {
			return element;
		}

		for (let option in options) {
			if(option == 'text') {
				element.innerHTML = options[option];
				continue;
			}

			element.setAttribute(option, options[option]);
		}

		return element;
	}

	/**
	 * Toggles the given classes.
	 */
	static toggleClass(element, className, secondClassName)
	{
		if(element == null || typeof element == 'undefined') {
			throw new InvalidArgumentException;
		}

		secondClassName = secondClassName || undefined;

		if(secondClassName) {
			element.classList.toggle(secondClassName);
		}

		return element.classList.toggle(className);
	}

	/**
	 * Finds an element inside of parent.
	 */
	static find(element, selector) 
	{
		return queryElement(element, selector);
	}
}

/**
 * Queries an element from the DOM.
 */
function queryElement(parent, selector) {
	let element = parent.querySelectorAll(selector);

	if(element.length == 0) {
		return null;
	}

	return (element.length > 1) ? element : element[0];
}

/**
 * Checks if parent has child.
 */
function hasChild(parent, child) {
     let node = child.parentNode;
     
     while (node != null) {
         if (node == parent) {
             return true;
         }
         node = node.parentNode;
     }
     
     return false;
}

export default DOM;