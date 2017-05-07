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
		require: ['Products', 'Services', 'Filter'],
	};

	/**
	 * Stores all instances.
	 */
	var instances = [];

	/**
	 * Stores all the events.
	 */
	var events = [];

	/**
	 * The Filter Object, handles the filter of the products/services.
	 */
	var Filter = function() {

		var filterSettings = {
			bindTo: '.filter',
			class: '',
			width: '',
			height: '',
		};

		var filterContainer = {};

		function init(devSettings) {
			if(typeof devSettings != 'object') {
				throw new InvalidArgumentException;
			}

			filterSettings = extend(filterSettings, devSettings);
			
			filterContainer = document.querySelector(filterSettings.bindTo);
			filterContainer.className = filterContainer.className + ' ' + filterSettings.class;
		}

		return {
			Settings: init,
		};
	};
	
	/**
	 * The Services Object, handles the services.
	 */
	var Services = function() {

		return {};
	};
	
	/**
	 * The Products Object, handles the products.
	 */
	var Products = function() {

		/**
		 * The default settings of each product.
		 */
		var productSettings = {
			bindProductsTo: '.products',
			containerClass: '',
			bindLinksTo: '',
			itemClass: '',
			paginationClass: '',
			width: '200px',
			height: '250px',
			only: ['name', 'price', 'deliveryTime'],
			fetchFrom: '',
		};

		/**
		 * The DOM element to display the products.
		 */
		var productsContainer = {};

		/**
		 * The DOM element to display the product-links.
		 */
		var paginationLinks = {};

		/**
		 * The products items.
		 */
		var currentItems = [];

		/**
		 * The current instance
		 */
		var _currentInstance = {};

		/**
		 * The constructor for the developer products settings.
		 */
		function init(devSettings) {
			if(typeof devSettings != 'object') {
				throw new InvalidArgumentException;
			}
			_currentInstance = this;
			productSettings = extend(productSettings, devSettings);
			
			productsContainer = document.querySelector(productSettings.bindProductsTo);
			
			if(productSettings.bindLinksTo != '')  {
				paginationLinks = document.querySelector(productSettings.bindLinksTo) || null;

				if(! paginationLinks) {
					throw new NodeElementDoesNotExistException;
				}

				var links = createLinks();
				paginationLinks.className = paginationLinks.className + ' ' + productSettings.paginationClass;
				paginationLinks.appendChild(links);
			}

			productsContainer.className = productsContainer.className + ' ' + productSettings.containerClass;

			eCommerceStyleTagsAdd();

			replaceItems.call(this, 1);
		}

		/**
		 * Creates the pagination links.
		 */
		function createLinks() {	
			
			var ul = document.createElement('ul');
			var previous = createPreviousButton();
			var pages = createPageLinks();
			var next = createNextButton();

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

				link.onclick = function(e) {
					e.preventDefault();

					replaceItems(this.getAttribute('data-page-nr'));
				};
			}

			return pages;
		}

		/**
		 * Creates the previous button link.
		 */
		function createPreviousButton() {
			var li = document.createElement('li');
			var a = document.createElement('a');
			var span1 = document.createElement('span');
			var span2 = document.createElement('span');
			
			
			li.className = 'page-item';
			a.className = 'page-link';
			span2.className = 'sr-only';

			a.setAttribute('href', '#');
			a.setAttribute('aria-label', 'Previous');
			span1.setAttribute('aria-hidden', 'true');

			span1.innerHTML = '&laquo;';
			span2.innerHTML = 'Previous';

			a.appendChild(span1);
			a.appendChild(span2);
			li.appendChild(a);

			a.onclick = function(e) {
				e.preventDefault();
			} 

			return li;
		}

		/**
		 * Creates the next button link.
		 */
		function createNextButton() {
			var li = document.createElement('li');
			var a = document.createElement('a');
			var span1 = document.createElement('span');
			var span2 = document.createElement('span');
			
			li.className = 'page-item';
			a.className = 'page-link';
			span2.className = 'sr-only';

			a.setAttribute('href', '#');
			a.setAttribute('aria-label', 'Next');
			span1.setAttribute('aria-hidden', 'true');

			span1.innerHTML = '&raquo;';
			span2.innerHTML = 'Next';

			a.appendChild(span1);
			a.appendChild(span2);
			li.appendChild(a);

			a.onclick = function(e) {
				e.preventDefault();
			} 

			return li;
		}

		/**
		 * Clear the container and add new items.
		 */
		function replaceItems(pageNumber) {
			pageNumber =  pageNumber || GET_Vars()['page'];
			window.history.replaceState('', '', updateURLParameter(window.location.href, "page", pageNumber));
			var xhr = new XMLHttpRequest || new ActiveXObject("Microsoft.XMLHTTP");

			xhr.open('GET', productSettings.fetchFrom + '?page='+ pageNumber, false); 

			xhr.onreadystatechange = function() {
				if(this.status == 200 && this.readyState == 4) {
					currentItems = JSON.parse(this.responseText);
				}
			};

			xhr.send(null);
			
			if(! Array.isArray(currentItems) || typeof currentItems[0] == 'string') {
				throw new InvalidArgumentException;
			}
			
			var displayItems = wrapAllWithHTML(currentItems, productSettings.itemClass, 'div');
			
			productsContainer.innerHTML = displayItems;
			
			_currentInstance.AfterLoaded.call(this);
		}

		/**
		 * Wrap all the items with specifc tag and classname.
		 */
		function wrapAllWithHTML(items, className, tagType) {
			className = className || '';

			var allItems = '';

			items.forEach(function(product) {
				var item = document.createElement(tagType);

				if(className != '') item.className = 'product ' + className;

				for(var prop in product) {
					if(productSettings.only.indexOf(prop) == -1) {
						continue;
					}

					var tag = document.createElement(tagType);
					tag.innerHTML = product[prop] || '';
					tag.className = 'product-' + kebabCase(prop);
					item.appendChild(tag);
				}

				var temp = document.createElement(tagType);

				temp.appendChild(item);
				
				allItems += temp.innerHTML + "\n";
			});

			return allItems;
		}

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

		/**
		 * Convert camelCase to kebab-case.
		 */
		function kebabCase(string) {
			return string.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
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

		    var rows_txt = temp + "" + param + "=" + paramVal;
		    return baseURL + "?" + newAdditionalURL + rows_txt;
		}

		return {
			Settings: init,
			AfterLoaded: function() {},
		};
	};

	// Event for when the module is fully loaded.
	listen('eCommerceModuleIsFullyLoaded', function() {
		// Set the errors handler.
		errorHandler();
	});


	function init(devSettings) {
		// Make sure the developer passed an object, if not give feedback.
		if(typeof devSettings != 'object') {
			throw new InvalidArgumentException;
		}

		globalSettings = extend(globalSettings, devSettings);
	
		if (globalSettings.require[0] == null) {
			throw new NoneWasRequiredException;
		}

		var currentInstance = this;

		globalSettings.require.forEach(function(_object) {
			currentInstance[_object] = new currentInstance[_object];
		});
	}

	/**
	 * Listen to an event.
	 */
	function listen(name, callback) {
		if(typeof callback !== 'function') {
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
			var one = data[0] || undefined;
			var two = data[1] || undefined;
			var three = data[2] || undefined;
			return events[name](one, two, three);
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
	 * Handle all the errors
	 */
	function errorHandler() {	
		window.onerror = function(message, source, lineno, colno, error) {
			if(error instanceof InvalidArgumentException) {
				console.error(`InvalidArgumentException in ${source} on line ${lineno}`);
			} else if(error instanceof BadEventCallException) {
				console.error(`BadEventCallException in ${source} on line ${lineno}`);
			} else if(error instanceof NoneWasRequiredException) {
				console.error(`NoneWasRequiredException in ${source} on line ${lineno}, 
								please add at least one requirement(Products, Services or/and Filter)`);
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
	 * minifies the css text.
	 */
	function minify_css(string) {
	    string = string.replace(/\/\*(?:(?!\*\/)[\s\S])*\*\/|[\r\n\t]+/g, '');
	    string = string.replace(/ {2,}/g, ' ');
	    string = string.replace(/([{:}])/g, '$1');
	    string = string.replace(/([;,]) /g, '$1');
	    string = string.replace(/ !/g, '!');
	    
	    return string;
	}

	// decalre some custom exceptions
	function InvalidArgumentException() {};
	function BadEventCallException() {};
	function NoneWasRequiredException() {};
	function NodeElementDoesNotExistException() {};

	triggerEvent('eCommerceModuleIsFullyLoaded');

	return {
		Filter: Filter || undefined,
		Services: Services || undefined,
		Products: Products || undefined,
		Settings: init,
	}
};
