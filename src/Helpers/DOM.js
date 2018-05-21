
import InvalidArgumentException from '../Exceptions/InvalidArgumentException.js';

/**
 * @file 
 * DOM class.
 *
 * Adds some useful functionality for
 * fetching or manipulating DOM elements.
 */

class DOM
{
	/**
	 * Minifies the css text.
	 * 
	 * @param string | string
	 * @return string
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
	 *
	 * @param object | element
	 * @param string | className
	 * @param string | newClassName
	 * @return object
	 */
	static switchClasses(element, className, newClassName) 
	{
		this.removeClass(element, className);
		this.addClass(element, newClassName);
	}

	/**
	 * Adds class to a given element.
	 *
	 * @param object | element
	 * @param string | className
	 * @return object
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
	 * Checks if an element has a class.
	 *
	 * @param HTMLElement | element
	 * @param string | className
	 * @return bool
	 */
	static hasClass(element, className)
	{
		if (element === null) {
			throw new InvalidArgumentException('hasClass() expects the first argument to be an HTMLElement but null was passed.');
		}

		if (! className || className == '' || typeof className == 'undefined') {
			return;
		}

		return element.className.indexOf(className) != -1;
	}

	/**
	 * Removes class from a given element.
	 * 
	 * @param object | element
	 * @param string | className
	 * @return object
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
	 * Removes an element from the DOM.
	 *
	 * @param HTMLElement
	 * @return void
	 */
	static remove(element)
	{
		element.parentNode.removeChild(element);
	}

	/**
	 * Adds style tag with given id and css to the DOM.
	 * 
	 * @param string | id
	 * @param string | css
	 * @return void
	 */
	static addStyle(id, css)
	{
		if (typeof css != 'string') {
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
	 * Adds linked style tag with given id and src to the DOM.
	 * 
	 * @param string | id
	 * @param string | source
	 * @return void
	 */
	static addLinkedStyle(id, source) 
	{
		if (typeof source != 'string') {
			throw new InvalidArgumentException('DOM.addLinkedStyle() excpects the second parameter to be string, but ' + typeof source + ' was passed instead.');
		}

		let head = document.head || document.getElementsByTagName('head')[0];
		let linkedStyleTag = document.createElement('link');

	    // give an id to recognize the style tag
		linkedStyleTag.setAttribute('id', id);
		linkedStyleTag.setAttribute('href', source);
		linkedStyleTag.setAttribute('rel', 'stylesheet');
		linkedStyleTag.setAttribute('type', 'text/css');
		// appending that style tag to the DOM head tag
		head.appendChild(linkedStyleTag);
	}

	/**
	 * Creates an element with the given options.
	 * 
	 * @param string | elementType
	 * @param object | options
	 * @return HTMLElement
	 */
	static createElement(elementType, options)
	{
		let element = document.createElement(elementType);
	
		if (options === undefined) {
			return element;
		}

		for (let option in options) {
			switch(option)
			{
				case 'text':
				case 'html':
					element.innerHTML = options[option];
					break;
				default:
					element.setAttribute(option, options[option]);
					break;
			}
		}

		return element;
	}

	/**
	 * Toggles the given classes.
	 * 
	 * @param object | element
	 * @param string | className
	 * @return bool
	 */
	static toggleClass(element, className, secondClassName)
	{
		if (element == null || typeof element == 'undefined') {
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
	 *
	 * @param string | selector
	 * @param object | context
	 * @return mixed
	 */
	static find(selector, context = window.document) 
	{
		return queryElement(selector, context);
	}

	/**
	 * Get the document height.
	 *
	 * @return number 
	 */
	static documentHeight()
	{
		return Math.max(
	        document.body.scrollHeight, document.documentElement.scrollHeight,
	       	document.body.offsetHeight, document.documentElement.offsetHeight,
	        document.body.clientHeight, document.documentElement.clientHeight
	    )
	}

	/**
	 * Get the window height.
	 *
	 * @return number 
	 */
	static windowHeight()
	{
		return window.innerHeight || (document.documentElement || document.body).clientHeight;
	}

	/**
	 * Get the scroll offset position.
	 *
	 * @return number
	 */
	static scrollYOffset()
	{
		return window.pageYOffset || (document.documentElement || document.body.parentNode || document.body).scrollTop;
	}
}

/**
 * Queries an element from the DOM.
 *
 * @param string | selector
 * @param object | parentElement
 * @return mixed
 */
function queryElement(selector, parentElement) 
{
	if (typeof selector != 'string') {
		throw new InvalidArgumentException('queryElement() expects first parameter to be a string, but ' + typeof selector + ' was passed instead.');
	}

	let element = parentElement.querySelectorAll(selector);

	if (element.length == 0) {
		return null;
	}

	return (element.length > 1) ? element : element[0];
}

/**
 * Checks if parent has child.
 *
 * @param object | parentElement
 * @param object | childElement
 * @return bool
 */
function hasChild(parentElement, childElement) 
{
     let node = childElement.parentNode;
     
     while (node != null) {
         if (node == parentElement) {
             return true;
         }
         node = node.parentNode;
     }
     
     return false;
}

export default DOM;