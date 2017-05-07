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
			class: 'col-xs-4',
			width: '',
			height: '',
		};

		function init(devSettings) {
			if(typeof devSettings != 'object') {
				throw new InvalidArgumentException;
			}

			filterSettings = extend(filterSettings, devSettings);
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
			bindTo: '.products',
			class: 'col-xs-8',
			width: '',
			height: '',
			itemClass: 'col-xs-3',
			only: ['name', 'price', 'deliveryTime'],
			fetchFrom: '',
		};

		/**
		 * The DOM element to display the products.
		 */
		var container = {};

		/**
		 * The products items.
		 */
		var currentItems = [];

		/**
		 * The constructor for the developer products settings.
		 */
		function init(devSettings) {
			if(typeof devSettings != 'object') {
				throw new InvalidArgumentException;
			}

			productSettings = extend(productSettings, devSettings);

			container = document.querySelector(productSettings.bindTo);
			container.className = container.className + ' ' + productSettings.class;
		}

		/**
		 * Clear the container and add new items.
		 */
		function replaceItems(items) {
			if(! Array.isArray(items) || typeof items[0] == 'string') {
				throw new InvalidArgumentException;
			}
			
			currentItems = items;
			
			var displayItems = wrapAllWithHTML(currentItems, productSettings.itemClass, 'div');
			
			container.innerHTML = displayItems;
		}

		function wrapAllWithHTML(items, className, type) {
			className = className || '';

			var allItems = '';

			items.forEach(function(product) {
				var item = document.createElement(type);

				if(className != '') item.className = className;

				for(var prop in product) {
					if(productSettings.only.indexOf(prop) == -1) {
						continue;
					}

					var tag = document.createElement(type);
					tag.innerHTML = product[prop] || '';
					tag.className = 'product-' + kebabCase(prop);
					item.appendChild(tag);
				}

				var temp = document.createElement(type);

				temp.appendChild(item);
				
				allItems += temp.innerHTML + "\n";
			});

			return allItems;
		}

		/**
		 * Convert camelCase to kebab-case.
		 */
		function kebabCase(string) {
			return string.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
		}

		/**
		 * When the products are fully loaded in the DOM.
		 */
		function removeLoader() {
			// remove loader
			
			// let the developer do whatever he needs to do.
			this.call(this, AfterLoaded);
		}

		return {
			AfterLoaded: function() {},
			Settings: init,
			Items: replaceItems,
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
			throw new InvalidArgumentException('Please pass an object for the settings');
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

	triggerEvent('eCommerceModuleIsFullyLoaded');

	return {
		Filter: Filter || undefined,
		Services: Services || undefined,
		Products: Products || undefined,
		Settings: init,
	}
};
