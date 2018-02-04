
import DOM from '../Helpers/DOM.js';
import Url from '../Helpers/Url.js';
import Common from '../Helpers/Common.js';

import NotInPageRangeException from '../Exceptions/NotInPageRangeException.js';
import InvalidArgumentException from '../Exceptions/InvalidArgumentException.js';
 
/**
 * @file 
 * Pagination class.
 *
 * The Pagination component, handles the pagination.
 */

/**
 * The default settings of the pagination.
 *
 * @var object
 */
let defaultSettings = {
	element: '.pagination-links',
	processing: 'client-side',
	class: '',
	per_page: 5,
	total_items: 5,
	url_parameter: 'page',
	separator: '#' 
};

/**
 * Stores the container object.
 *
 * @var \Core\Container
 */
let Container;

/**
 * Stores the products component.
 *
 * @var \Components\Products
 */
let Products;

/**
 * Stores the container object.
 * 
 * @var \Core\EventManager
 */
let EventManager;

class Pagination 
{
	/**
	 * - Initialize the container object.
	 * - Initialize the products component.
	 *
	 * @param \Core\Container | container
	 * @param \Components\Products | products
	 * @param \Components\Services | services
	 * @return void
	 */
	constructor(container, events, products = null, services = null) 
	{
		Container = container;
		Products = products;
		EventManager = events;
	}

	/**
	 * Setup the pagination.
	 *
	 * @param object | settings
	 * @return void
	 */
	setup(settings)
	{	
		if(typeof settings != 'object') {
			throw new InvalidArgumentException;
		}

		this.settings = Common.extend(defaultSettings, settings);
		this.setCurrent(1);

		document.addEventListener('DOMContentLoaded', function() {		
			this.setElement(this.settings.element);

			// As a fallback choose the user's settings for the total items count.
			this.totalPages = this.calculateTotalPages(this.settings.per_page, this.settings.total_items);
			this.buildPagination();
		}.bind(this));
	}

	/**
	 * Builds the pagination.
	 *
	 * @return void
	 */
	buildPagination()
	{
		this.links = this.createLinks();
		this.replaceLinks(this.links);
		this.bindEventListeners(this.links);
	}

	/**
	 * Sets the element.
	 *
	 * @param string | selector
	 * @return void
	 */
	setElement(selector)
	{
		this.element = DOM.find(selector);
		
		DOM.addClass(this.element, this.settings.class);
	}

	/**
	 * Replaces the links in the element.
	 *
	 * @param HTMLUListElement | links
	 * @return void
	 */
	replaceLinks(links)
	{
		this.element.innerHTML = '';
		this.element.appendChild(links);
	}

	/**
	 * Calculates the total pages.
	 *
	 * @param number | perPage
	 * @param number | totalItems
	 * @return number
	 */
	calculateTotalPages(perPage, totalItems)
	{
		perPage = parseInt(perPage);
		totalItems = parseInt(totalItems);

		return Math.ceil(totalItems / perPage);
	}

	/**
	 * Binds the buttons events listeners.
	 *
	 * @param HTMLUListElement | links
	 * @return void
	 */
	bindEventListeners(links) 
	{
		let instance = this;

		this.next.childNodes[0].onclick = function(e) {
			e.preventDefault();

			let requestedPage = instance.current+1;

			if (instance.notInPageRange(requestedPage)) {
				throw new NotInPageRangeException('The page you requesting does not exists');
			}

			if (Products && Products.booted) {
				Products.loadProducts(requestedPage).then(function(products) {
					instance.setCurrent(requestedPage);
				});
			}
		};

		this.previous.childNodes[0].onclick = function(e) {
			e.preventDefault();

			let requestedPage = instance.current-1;

			if(instance.notInPageRange(requestedPage)) {
				throw new NotInPageRangeException('The page you requesting does not exists');
			}
			
			if (Products && Products.booted) {
				Products.loadProducts(requestedPage).then(function(products) {
					instance.setCurrent(requestedPage);
				});
			}
		};

		for(var i = 0; i < this.pages.length; i++) {
			this.pages[i].childNodes[0].onclick = function(e) {
				e.preventDefault();
				
				let requestedPage = this.getAttribute('data-page-nr');
				
				if (Products && Products.booted) {
					Products.loadProducts(requestedPage).then(function(products) {
						instance.setCurrent(requestedPage);
					});
				}
			};
		}
	}

	/**
	 * Sets the current page.
	 *
	 * @param number | pageNumber
	 * @return void
	 */
	setCurrent(pageNumber) 
	{
		this.current = parseInt(pageNumber);
		this.changeUrl(pageNumber);
		this.setActiveLink(pageNumber);
	}

	/**
	 * Gets the current page.
	 *
	 * @return number
	 */
	getCurrent() 
	{
		return this.current;
	}

	/**
	 * Creates the pagination links.
	 *
	 * @return HTMLUListElement
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
	 *
	 * @return array<HTMLLIElement>
	 */
	createPageLinks() 
	{
		var pages = [];

		for(var i = 1; i <= this.totalPages; i++) {
			var pageItem = document.createElement('li');
			var link = document.createElement('a');
			pageItem.className = (this.current == i) ? 'page-item active' : 'page-item';
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
	 *
	 * @return HTMLLIElement
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
	 *
	 * @return HTMLLIElement
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
	 *
	 * @param number | pageNumber
	 * @return bool
	 */
	notInPageRange(pageNumber) 
	{
		return (pageNumber > this.totalPages || pageNumber <= 0) || isNaN(pageNumber);
	}

	/**
	 * Changes the url to a given page number.
	 *
	 * @param number | pageNumber
	 * @return void
	 */
	changeUrl(pageNumber) 
	{
		Url.change(this.settings.url_parameter, pageNumber, this.settings.separator);
	}

	/**
	 * Sets the active link.
	 *
	 * @param number | pageNumber
	 * @return void
	 */
	setActiveLink(pageNumber)
	{
		for(var page in this.pages) {
			if (this.pages[page].childNodes[0].getAttribute('data-page-nr') == pageNumber) {
				DOM.addClass(this.pages[page], 'active');
			} else {
				DOM.removeClass(this.pages[page], 'active');
			}
		}
	}

	/**
	 * Resets the pagination.
	 *
	 * @return void
	 */
	reset() 
	{
		this.setCurrent(1);
		this.changeUrl(1);
	}

	/**
	 * Hides the component from the DOM.
	 *
	 * @return void 
	 */
	hide()
	{
		this.element.style.display = 'none';
	}
}

export default Pagination;
