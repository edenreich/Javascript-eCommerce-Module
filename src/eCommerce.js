/**
 * A module to handle common eCommerce tasks
 */
var eCommerce = function(devSettings) {
	
	'use strict';

	/**
	 * Make the settings optional.
	 */
	devSettings = devSettings || null;

	/**
	 * The default global settings.
	 */
	var globalSettings = {
		cartSessionId: [],
		importBootstrap: false,
		components: ['Products', 'Services', 'Filter', 'Pagination'],
	};

	/**
	 * The default settings of each product.
	 */
	var productSettings = {
		element: '.products',
		class: '',
		itemClass: '',
		width: '200px',
		height: '250px',
		attributes: ['name', 'price', 'deliveryTime', 'image'],
		url: '',
		initStaticData: {},
	};

	/**
	 * Stores all the events.
	 */
	var events = [];

	/**
	 * Checks if the eCommerce has been loaded.
	 */
	var initialized = false;

	/**
	 * Stores the current ecommerce instance.
	 */
	var eCommerceInstance = this;

	/**
	 * The Filter Object, handles the filter of the products/services.
	 */
	this.Filter = function() {

		var filterSettings = {
			bindTo: '.filter',
			data: {},
			class: 'col-xs-2',
			width: '',
			height: '',
		};

		var filterContainer = {};

		function init(devSettings) {
			if(typeof devSettings != 'object') {
				throw new InvalidArgumentException;
			}

			filterSettings = extend(filterSettings, devSettings);

			filterContainer = queryElement(filterSettings.bindTo);
			filterContainer = addClass(filterContainer, filterSettings.class);
		}

		return {
			Settings: init,
		};
	};
	
	/**
	 * The Services Object, handles the services.
	 */
	this.Services = function() {

		return {};
	};

	this.Pagination = function() {

		/**
		 * Stores the total pages.
		 */
		var totalPages = 3;

		/**
		 * Stores the current page.
		 */
		var current = 1;

		/**
		 * Stores the pagination links.
		 */
		var paginationLinks = {};

		/**
		 * Stores the current pagination instance.
		 */
		var paginationInstance = {};

		/**
		 * Stores the next button DOM element.
		 */
		var next = {};

		/**
		 * Stores the previous button DOM element.
		 */
		var previous = {};

		/**
		 * Stores the pages buttons DOM elements.
		 */
		var pages = {};

		/**
		 * The default settings of each product.
		 */
		var paginationSettings = {
			element: '.pagination-links',
			class: 'col-xs-offset-4 col-xs-8',
			perPage: 5,
			totalPages: 3,
		};

		function init(devSettings) {
			if (typeof devSettings != 'object') {
				throw new InvalidArgumentException;
			}
			
			paginationInstance = this;
			paginationLinks = queryElement(paginationSettings.element);
			paginationLinks = addClass(paginationLinks, paginationSettings.class);

			var links = createLinks();
			bindEventListeners(links);
			paginationLinks.appendChild(links);
		}

		function bindEventListeners(links) {
			next.childNodes[0].onclick = function(event) {
				event.preventDefault();
				Container.getInstance('Products').replaceItems(current+1);
				setCurrent(current+1);
			}

			previous.childNodes[0].onclick = function(event) {
				event.preventDefault();
				Container.getInstance('Products').replaceItems(current-1);
				setCurrent(current-1);
			}

			for(var i = 0; i < pages.length; i++) {
				pages[i].childNodes[0].onclick = function(event) {
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
		function setCurrent(pageNumber) {
			if(notInPageRange(pageNumber)) return;
			current = pageNumber;
			changeUrl(pageNumber);
		}

		/**
		 * Gets the current page.
		 */
		function getCurrent() {
			return current;
		}

		/**
		 * Creates the pagination links.
		 */
		function createLinks() {	
			var ul = document.createElement('ul');
			
			pages = createPageLinks();
			previous = createPreviousButton();
			next = createNextButton();

			ul.className = 'pagination';
			ul.appendChild(previous);

			pages.forEach(function(page) {
				ul.appendChild(page);
			});

			ul.appendChild(next);

			return ul;
		}

		/**
		 * Creates the pages item links.
		 */
		function createPageLinks() {
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
		function createPreviousButton() {
			var li = document.createElement('li');
			var link = document.createElement('a');
			var span1 = document.createElement('span');
			var span2 = document.createElement('span');
			
			
			li.className = 'page-item';
			link.className = 'page-link';
			span2.className = 'sr-only';

			link.setAttribute('href', '#');
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
		function createNextButton() {
			var li = document.createElement('li');
			var link = document.createElement('a');
			var span1 = document.createElement('span');
			var span2 = document.createElement('span');
			
			li.className = 'page-item';
			link.className = 'page-link';
			span2.className = 'sr-only';

			link.setAttribute('href', '#');
			link.setAttribute('aria-label', 'Next');
			span1.setAttribute('aria-hidden', 'true');

			span1.innerHTML = '&raquo;';
			span2.innerHTML = 'Next';

			link.appendChild(span1);
			link.appendChild(span2);
			li.appendChild(link);

			next = link; 

			return li;
		}

		/**
		 * Checks if the given page is in range.
		 */
		function notInPageRange(pageNumber) {
			return pageNumber > totalPages || pageNumber <= 0;
		}

		/**
		 * Changes the url to a given page number.
		 */
		function changeUrl(pageNumber) {
			pageNumber =  pageNumber || GET_Vars()['page'];
			window.history.replaceState('', '', updateURLParameter(window.location.href, 'page', pageNumber));
		}

		/**
		 * Get the get variables from the url.
		 */
		function GET_Vars() {
			var vars = {};
			var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m, key, value) {
				vars[key] = value;
			});

			return vars;
		}

		/**
		 * Modifies the get parameter in the url.
		 */
		function updateURLParameter(url, param, paramVal) {
		    var newAdditionalURL = "";
		    var tempArray = url.split("?");
		    var baseURL = tempArray[0];
		    var additionalURL = tempArray[1];
		    var temp = "";

		    if (additionalURL) {
		        tempArray = additionalURL.split("&");
		        for (var i=0; i<tempArray.length; i++){
		            if(tempArray[i].split('=')[0] != param){
		                newAdditionalURL += temp + tempArray[i];
		                temp = "&";
		            }
		        }
		    }

		    var rowsText = temp + "" + param + "=" + paramVal;
		    return baseURL + "?" + newAdditionalURL + rowsText;
		}

		function reset() {
			setCurrent(1);
			changeUrl(1);
		}

		return {
			Settings: init,
			setCurrent: setCurrent,
			getCurrent: getCurrent,
			notInPageRange: notInPageRange,
			next: next,
			previous: previous,
			pages: pages,
			reset: reset,
		};
	}
	
	/**
	 * The Products Object, handles the products.
	 */
	this.Products = function() {

		/**
		 * The DOM element to display the products.
		 */
		var productsContainer = {};

		/**
		 * The products items.
		 */
		var currentItems = [];

		/**
		 * The current instance
		 */
		var productInstance = {};

		/**
		 * Stores the pagination object.
		 */
		var paginator = {};

		/**
		 * The constructor for the developer products settings.
		 */
		function init(devSettings) {
			if (typeof devSettings != 'object') {
				throw new InvalidArgumentException;
			}

			productInstance = this;
			productSettings = extend(productSettings, devSettings);

			productsContainer = queryElement(productSettings.element);
			productsContainer = addClass(productsContainer, productSettings.class);

			if (Container.instanceExist('Pagination'))  {
				paginator = Container.getInstance('Pagination');
				paginator.reset(productSettings.initStaticData);

				var request = getProducts(paginator.getCurrent());

				request.then(function(products) {
					
					for (var i = 0; i < products.length; i++) {
						var product = products[i];
						productInstance.AfterLoaded.call(this, product);
					}
				}).catch(function(e) {
					console.log(e);
				});
			}
			
			eCommerceStyleTagsAdd();
		}

		/**
		 * Replace items in the container.
		 */
		function replaceItems(items) {
			if (! Array.isArray(items) || typeof items[0] == 'string') {
				throw new InvalidArgumentException;
			}

			var items = wrapAllWithHTML(items, productSettings.itemClass, 'div');

			productsContainer.innerHTML = items.text;

			return items;
		}

		/**
		 * Makes an Ajax call to the server.
		 */
		function getProducts(pageNumber) {
			return new Promise(function(resolve, reject) {
				if (paginator.notInPageRange(pageNumber)) {
					return reject('Not in pagination range');
				}

				var xhr = new XMLHttpRequest || new ActiveXObject("Microsoft.XMLHTTP");

				xhr.open('GET', productSettings.url + '?page='+ pageNumber, true); 

				xhr.onreadystatechange = function() {
					if(this.status == 200 && this.readyState == 4) {
						currentItems = JSON.parse(this.responseText);
						replaceItems(currentItems);
						resolve(currentItems);
					}
				};

				xhr.onerror = function(error) {
					reject(error);
				};

				xhr.send(null);
			});
		}

		/**
		 * Wrap all the items with specifc tag and classname.
		 */
		function wrapAllWithHTML(items, className, tagType) {
			className = className || null;
			className = (className) ? 'product ' + className : 'product';
			
			var text = '';

			items = items.map(function(product, index) {
				var item = document.createElement(tagType);
				item = addClass(item, className);

				for(var prop in product) {
					if(productSettings.attributes.indexOf(prop) == -1) {
						continue;
					}

					var tag = document.createElement(tagType);
					tag.innerHTML = product[prop] || '';
					tag.className = 'product-' + kebabCase(prop);
					item.appendChild(tag);
				}

				var temp = document.createElement(tagType);
				temp.appendChild(item);
				
				text += temp.innerHTML + "\n";

				return product;
			});

			return {
				"data": items,
				"text": text
			};
		}

		/**
		 * Add the eCommerce style tags to the DOM.
		 */
		function eCommerceStyleTagsAdd() {
			var head = document.head || document.getElementsByTagName('head')[0];
			var styleTag = document.createElement('style');
			var CSS = `
				.product {
					margin: 15px 3px;
					border: 1px solid #e4e4e4;
					width: ${productSettings.width};
					height: ${productSettings.height};
				}
			`;
		    
		    // pipe it through the minfier
		    CSS = minify_css(CSS);
		    // adding it to the styletag
		    styleTag.innerHTML= CSS;
		    // give an id to recognize the style tag
			styleTag.setAttribute('id', 'eCommerce');
			// appending that style tag to the DOM head tag
			head.appendChild(styleTag);
		}

		return {
			Settings: init,
			AfterLoaded: function() {},
			replaceItems: getProducts,
			Pagination: Container.make('Pagination'),
		};
	};

	var Container = (function () {

		/**
		 * Stores all instances.
		 */
		var instances = [];

		/**
		 * Sets an instance.
		 */
		function setInstance(key, instance) {
			var object = [];
			object[key] = instance;
			instances.push(object);
		}

		/**
		 * Gets an instance.
		 */
		function getInstance(key) {
			for (var i = 0; i < instances.length; i++) {
				if(instances[i].hasOwnProperty(key)) return instances[i][key];
			}
		
			return null;
		}

		/**
		 * Checks if an instance exist.
		 */
		function instanceExist(key) {
			for (var i = 0; i < instances.length; i++) {
				if(instances[i].hasOwnProperty(key)) return true;
			}

			return false;
		}

		/**
		 * Creates an instance.
		 */
		function make(object) {
			if(! in_array(object, globalSettings.components)) {
				throw new ComponentNotRegisteredException;
			}
			
			var args = Array.prototype.slice.call(arguments, 1);
			
			var instance = {};

			if (instanceExist(object)) {
				instance = getInstance(object);
			} else if (typeof eCommerceInstance[object] == 'object') {
				instance = eCommerceInstance[object];
				Container.setInstance(object, instance);
			} else if (typeof eCommerceInstance[object] == 'function') {
				instance = new eCommerceInstance[object](...args);
				Container.setInstance(object, instance);
			} else {
				instance = new eCommerceInstance[object];
				Container.setInstance(object, instance);
			}

			return instance; 
		}

		return {
			setInstance: setInstance,
			getInstance: getInstance,
			instanceExist: instanceExist,
			instances: instances,
			make: make,
		};
	})();

	// Event for when the module is fully loaded.
	listen('eCommerceModuleIsFullyLoaded', function() {
		// Set the errors handler.
		errorHandler();
	});

	function init(devSettings) {
		// Make sure the developer passed an object, if not give feedback.
		if (typeof devSettings != 'object') {
			throw new InvalidArgumentException;
		}

		globalSettings = extend(globalSettings, devSettings);

		if (globalSettings.components[0] == null) {
			throw new ComponentsException;
		}

		globalSettings.components.map(function(component) {
			Container.make(component);
		});

		initialized = true;
	}

	/**
	 * Listen to an event.
	 */
	function listen(name, callback) {
		if (typeof callback !== 'function') {
			throw new InvalidArgumentException;
		}

		events[name] = callback;
	}

	/**
	 * Fires an event.
	 */
	function triggerEvent(name, data) {
		data = data || null;

		if(typeof events[name] !== 'function') {
			throw new BadEventCallException;
		}

		if(data != null && data instanceof Array) {
	
			return events[name](...data);
		}

		events[name]();
	}

	/**
	 * Extend an object.
	 */
	function extend(currentObj, newObj ) {
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
	function in_array(needle, hystack) {
		if(hystack.constructor !== Array) return;

		for(var i = 0; i <= hystack.length; i++) {
			if(needle == hystack[i]) return true;	
		}
	
		return false;
	}

	/**
	 * Queries an element from the DOM.
	 */
	function queryElement(selector) {
		var element = document.querySelector(selector) || null;

		if(! element) {
			throw new NodeElementDoesNotExistException;
		}

		return element;
	}

	/**
	 * Adds class to a given element.
	 */
	function addClass(element, className) {
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
	function removeClass(element, className) {
		element.classList.remove(className);
		
		return element;
	}

	/**
	 * Checks if an object is empty.
	 */
	function emptyObject(object) {
		for(var prop in object) {
			return false;
		}

		return true;
	}

	/**
	 * Convert camelCase to kebab-case.
	 */
	function kebabCase(string) {
		return string.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
	}

	/**
	 * Checks if a given parameter is an object.
	 */
	function isObject(object) {
		return typeof object == 'object';
	}

	/**
	 * Handle all the errors
	 */
	function errorHandler() {	
		window.onerror = function(message, source, lineno, colno, error) {
			if(error instanceof InvalidArgumentException) {
				console.error(`InvalidArgumentException in ${source} on line ${lineno}`);
			} else if(error instanceof BadEventCallException) {
				console.error(`BadEventCallException in ${source} on line ${lineno}`);
			} else if(error instanceof ComponentsException) {
				console.error(`ComponentsException, expecting for at least one components, but none was given in ${source} on line ${lineno}, 
								please add at least one requirement(Products, Services or/and Filter)`);
			} else if(error instanceof ComponentNotRegisteredException) {
				console.error(`ComponentNotRegisteredException, components must be registered in order to use them, in ${source} on line ${lineno}`);
			} else if(error instanceof NodeElementDoesNotExistException) {
				console.error(`NodeElementDoesNotExistException in ${source} on line ${lineno}, 
								please select an existing node element.`);
			} else {
				return false;
			}

			return true;
		};
	}

	/**
	 * Minifies the css text.
	 */
	function minify_css(string) {
	    string = string.replace(/\/\*(?:(?!\*\/)[\s\S])*\*\/|[\r\n\t]+/g, '');
	    string = string.replace(/ {2,}/g, ' ');
	    string = string.replace(/([{:}])/g, '$1');
	    string = string.replace(/([;,]) /g, '$1');
	    string = string.replace(/ !/g, '!');
	    
	    return string;
	}

	// Decalring some custom exceptions
	function InvalidArgumentException() {};
	function BadEventCallException() {};
	function ComponentsException() {};
	function ComponentNotRegisteredException() {};
	function NodeElementDoesNotExistException() {};

	triggerEvent('eCommerceModuleIsFullyLoaded');

	return {
		Filter: Container.make.bind(Container, 'Filter'), 
		Pagination: Container.make.bind(Container, 'Pagination'),
		Services: Container.make.bind(Container, 'Services'),
		Products: Container.make.bind(Container, 'Products'),
		Settings: init,
	}
};
