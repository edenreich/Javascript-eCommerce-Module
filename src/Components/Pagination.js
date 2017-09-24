
import DOM from '../Helpers/DOM.js';
import Common from '../Helpers/Common.js';

import InvalidArgumentException from '../Exceptions/InvalidArgumentException.js';
 
/**
 * The default settings of the pagination.
 */
let defaultSettings = {
	element: '.pagination-links',
	class: 'col-xs-offset-4 col-xs-8',
	per_page: 5,
	total_pages: 3,
};

let Container;

class Pagination 
{
	constructor(container) 
	{
		Container = container;
		this.setup(defaultSettings);
	}

	/**
	 * Set the Pagination object up.
	 */
	setup(settings)
	{
		if(typeof settings != 'object') {
			throw new InvalidArgumentException;
		}

		this.settings = Common.extend(defaultSettings, settings);

		this.setElement(this.settings.element);
		this.replaceLinks(this.links);
	}

	/**
	 * Replaces the links in the wrapper.
	 */
	replaceLinks(links)
	{
		this.wrapper.innerHTML = '';
		this.wrapper.appendChild(links);
	}

	/**
	 * Sets the wrapper element.
	 */
	setElement(selector)
	{
		this.wrapper = DOM.element(selector);
		
		DOM.addClass(this.wrapper, this.settings.class);

		this.links = this.createLinks();
		this.bindEventListeners(this.links);
	}

	/**
	 * Binds the buttons events listeners.
	 */
	bindEventListeners(links) 
	{
		this.next.childNodes[0].onclick = function(event) {
			event.preventDefault();
			Container.getInstance('Products').replaceItems(this.current+1);
			setCurrent(current+1);
		}

		this.previous.childNodes[0].onclick = function(event) {
			event.preventDefault();
			Container.getInstance('Products').replaceItems(this.current-1);
			setCurrent(current-1);
		}

		for(var i = 0; i < this.pages.length; i++) {
			this.pages[i].childNodes[0].onclick = function(event) {
				event.preventDefault();
				var pageNumber = this.getAttribute('data-page-nr');
				Container.getInstance('Products').replaceItems(pageNumber);
				setCurrent(pageNumber);
			}
		}
	}

	/**
	 * Sets the current page.
	 */
	setCurrent(pageNumber) 
	{
		if(this.notInPageRange(pageNumber)) {
			return;
		}

		this.current = pageNumber;
		this.changeUrl(pageNumber);
	}

	/**
	 * Gets the current page.
	 */
	getCurrent() 
	{
		return this.current;
	}

	/**
	 * Creates the pagination links.
	 */
	createLinks() {	
		let ul = document.createElement('ul');
		
		this.pages = this.createPageLinks();
		this.previous = this.createPreviousButton();
		this.next = this.createNextButton();

		ul.className = 'pagination';
		ul.appendChild(this.previous);

		this.pages.forEach(function(page) {
			ul.appendChild(page);
		});

		ul.appendChild(this.next);

		return ul;
	}

	/**
	 * Creates the pages item links.
	 */
	createPageLinks() 
	{
		var pages = [];
		
		for(var i = 1; i <= 3; i++) {
			var pageItem = document.createElement('li');
			var link = document.createElement('a');
			pageItem.className = 'page-item';
			link.className = 'page-link';
			link.setAttribute('href', '?page='+ i);
			link.setAttribute('data-page-nr', i);
			link.innerHTML = i;
			pageItem.appendChild(link);
			pages.push(pageItem);
		}

		return pages;
	}

	/**
	 * Creates the previous button link.
	 */
	createPreviousButton() 
	{
		var li = document.createElement('li');
		var link = document.createElement('a');
		var span1 = document.createElement('span');
		var span2 = document.createElement('span');
		
		
		li.className = 'page-item';
		link.className = 'page-link';
		span2.className = 'sr-only';

		link.setAttribute('href', '');
		link.setAttribute('aria-label', 'Previous');
		span1.setAttribute('aria-hidden', 'true');

		span1.innerHTML = '&laquo;';
		span2.innerHTML = 'Previous';

		link.appendChild(span1);
		link.appendChild(span2);
		li.appendChild(link);

		return li;
	}

	/**
	 * Creates the next button link.
	 */
	createNextButton() 
	{
		var li = document.createElement('li');
		var link = document.createElement('a');
		var span1 = document.createElement('span');
		var span2 = document.createElement('span');
		
		li.className = 'page-item';
		link.className = 'page-link';
		span2.className = 'sr-only';

		link.setAttribute('href', '');
		link.setAttribute('aria-label', 'Next');
		span1.setAttribute('aria-hidden', 'true');

		span1.innerHTML = '&raquo;';
		span2.innerHTML = 'Next';

		link.appendChild(span1);
		link.appendChild(span2);
		li.appendChild(link);

		this.next = link; 

		return li;
	}

	/**
	 * Checks if the given page is in range.
	 */
	notInPageRange(pageNumber) 
	{
		return pageNumber > this.totalPages || pageNumber <= 0;
	}

	/**
	 * Changes the url to a given page number.
	 */
	changeUrl(pageNumber) 
	{
		pageNumber =  pageNumber || GET_Vars()['page'];
		window.history.replaceState('', '', this.updateURLParameter(window.location.href, 'page', pageNumber));
	}

	/**
	 * Get the get variables from the url.
	 */
	GET_Vars() 
	{
		var vars = {};
		var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m, key, value) {
			vars[key] = value;
		});

		return vars;
	}

	/**
	 * Modifies the get parameter in the url.
	 */
	updateURLParameter(url, param, paramVal) 
	{
	    var newAdditionalURL = "";
	    var tempArray = url.split("?");
	    var baseURL = tempArray[0];
	    var additionalURL = tempArray[1];
	    var temp = "";

	    if (additionalURL) {
	        tempArray = additionalURL.split("&");
	        for (var i = 0; i < tempArray.length; i++){
	            if (tempArray[i].split('=')[0] != param){
	                newAdditionalURL += temp + tempArray[i];
	                temp = "&";
	            }
	        }
	    }

	    var rowsText = temp + "" + param + "=" + paramVal;
	    return baseURL + "?" + newAdditionalURL + rowsText;
	}

	reset() 
	{
		this.setCurrent(1);
		this.changeUrl(1);
	}
}

export default Pagination;
