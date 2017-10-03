
import DOM from '../Helpers/DOM.js';
import Common from '../Helpers/Common.js';

import NotInPageRangeException from '../Exceptions/NotInPageRangeException.js';
import InvalidArgumentException from '../Exceptions/InvalidArgumentException.js';
 
/**
 * The default settings of the pagination.
 */
let defaultSettings = {
	element: '.pagination-links',
	class: 'col-xs-offset-4 col-xs-8',
	per_page: 5,
	total_items: 10,
};

/**
 * Stores the container object.
 */
let Container;

/**
 * Stores the products component.
 */
let Products;

/**
 * The Pagination Object, handles the pagination.
 */
class Pagination 
{
	/**
	 * Initialize the container object and the default settings.
	 */
	constructor(container, products) 
	{
		Container = container;
		Products = products;
	}

	/**
	 * Set the Pagination object up.
	 */
	setup(settings)
	{
		document.addEventListener('DOMContentLoaded', function() {

		if(typeof settings != 'object') {
			throw new InvalidArgumentException;
		}

		this.settings = Common.extend(defaultSettings, settings);

		this.totalPages = this.calculateTotalPages(this.settings.per_page, this.settings.total_items);
		
		this.setElement(this.settings.element);
		this.replaceLinks(this.links);

		}.bind(this));
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
	 * Replaces the links in the wrapper.
	 */
	replaceLinks(links)
	{
		this.wrapper.innerHTML = '';
		this.wrapper.appendChild(links);
	}

	calculateTotalPages(perPage, totalItems)
	{
		perPage = parseInt(perPage);
		totalItems = parseInt(totalItems);

		return Math.ceil(totalItems / perPage);
	}

	/**
	 * Binds the buttons events listeners.
	 */
	bindEventListeners(links) 
	{
		let instance = this;

		this.next.childNodes[0].onclick = function(event) {
			event.preventDefault();

			let requestedPage = instance.current+1;

			if(instance.notInPageRange(requestedPage)) {
				throw new NotInPageRangeException;
			}

			Products.getProductsByPage(requestedPage).then(function(products) {
				Products.replaceItems(products);
			});

			instance.setCurrent(requestedPage);
		};

		this.previous.childNodes[0].onclick = function(event) {
			event.preventDefault();

			let requestedPage = instance.current-1;

			if(instance.notInPageRange(requestedPage)) {
				throw new NotInPageRangeException;
			}
			
			Products.getProductsByPage(requestedPage).then(function(products) {
				Products.replaceItems(products);
			});

			instance.setCurrent(requestedPage);
		};

		for(var i = 0; i < this.pages.length; i++) {
			this.pages[i].childNodes[0].onclick = function(event) {
				event.preventDefault();
				
				let requestedPage = this.getAttribute('data-page-nr');
				
				Products.getProductsByPage(requestedPage).then(function(products) {
					Products.replaceItems(products);
				});
				
				instance.setCurrent(requestedPage);
			};
		}
	}

	/**
	 * Sets the current page.
	 */
	setCurrent(pageNumber) 
	{
		this.current = parseInt(pageNumber);
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
	createLinks() 
	{	
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

		for(var i = 1; i <= this.totalPages; i++) {
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

		return li;
	}

	/**
	 * Checks if the given page is in range.
	 */
	notInPageRange(pageNumber) 
	{
		return (pageNumber > this.totalPages || pageNumber <= 0) || isNaN(pageNumber);
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

	/**
	 * Resets the pagination.
	 */
	reset() 
	{
		this.setCurrent(1);
		this.changeUrl(1);
	}
}

export default Pagination;
