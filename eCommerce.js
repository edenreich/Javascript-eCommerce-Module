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
			perPage: 5,
			totalPages: 3,
			bindLinksTo: '',
			itemClass: '',
			paginationClass: '',
			width: '200px',
			height: '250px',
			attributes: ['name', 'price', 'deliveryTime', 'image'],
			url: '',
			initStaticData: {},
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
		 * Stores the current page.
		 */
		var currentPage = 1;

		/**
		 * Stores the total pages.
		 */
		var totalPages = 3;

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
			
			totalPages = productSettings.totalPages;

			productsContainer = queryElement(productSettings.bindProductsTo);
			productsContainer = addClass(productsContainer, productSettings.containerClass);

			if(productSettings.bindLinksTo != '')  {
				paginationLinks = queryElement(productSettings.bindLinksTo);

				var links = createLinks();
				paginationLinks = addClass(paginationLinks, productSettings.paginationClass);
				paginationLinks.appendChild(links);
			}

			eCommerceStyleTagsAdd();

			if(emptyObject(productSettings.initStaticData)) {
				replaceItemsViaAjax(1);
			} else {
				replaceItems(productSettings.initStaticData);
			}
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

					replaceItemsViaAjax(this.getAttribute('data-page-nr'));
				};
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

			link.onclick = function(event) {
				event.preventDefault();
				replaceItemsViaAjax(currentPage-1);
			} 

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

			link.onclick = function(event) {
				event.preventDefault();
				replaceItemsViaAjax(currentPage+1);
			} 

			return li;
		}

		/**
		 * Clear the container and add new items.
		 */
		function replaceItemsViaAjax(pageNumber) {
			if(notInPageRange(pageNumber) || currentPage == pageNumber) return;

			changeUrl(pageNumber);

			var request = getItems(pageNumber);

			request.then(function(items) {
				replaceItems(items);
			}).catch(function(error) {

			});
		}

		function notInPageRange(pageNumber) {
			return pageNumber > totalPages || pageNumber <= 0;
		}

		/**
		 * Replace items in the container.
		 */
		function replaceItems(items) {
			if(! Array.isArray(items) || typeof items[0] == 'string') {
				throw new InvalidArgumentException;
			}

			var items = wrapAllWithHTML(items, productSettings.itemClass, 'div');
			productsContainer.innerHTML = items.text;
			
			for(var i = 0; i < items.data.length; i++) {
				var product = items.data[i];
				_currentInstance.AfterLoaded.call(this, product);
			}
		}

		/**
		 * Changes the url to a given page number.
		 */
		function changeUrl(pageNumber) {
			pageNumber =  pageNumber || GET_Vars()['page'];
			currentPage = pageNumber;
			window.history.replaceState('', '', updateURLParameter(window.location.href, "page", pageNumber));
		}

		/**
		 * Makes an Ajax call to the server.
		 */
		function getItems(pageNumber) {
			return new Promise(function(resolve, reject) {
				var xhr = new XMLHttpRequest || new ActiveXObject("Microsoft.XMLHTTP");

				xhr.open('GET', productSettings.url + '?page='+ pageNumber, true); 

				xhr.onreadystatechange = function() {
					if(this.status == 200 && this.readyState == 4) {
						currentItems = JSON.parse(this.responseText);
						resolve(currentItems);
					}
				};

				xhr.onerror = reject;

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
