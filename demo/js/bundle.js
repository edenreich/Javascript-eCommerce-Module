'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var eCommerce = function () {
	'use strict';

	var DOM = function () {
		function DOM() {
			_classCallCheck(this, DOM);
		}

		_createClass(DOM, null, [{
			key: 'minifyCss',

			/**
    * Minifies the css text.
    */
			value: function minifyCss(string) {
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

		}, {
			key: 'addClass',
			value: function addClass(element, className) {
				if (className == '') return element;

				className = className.trim();
				className = className.split(' ');

				for (var i = 0; i < className.length; i++) {
					element.classList.add(className[i]);
				}

				return element;
			}

			/**
    * Removes class from a given element.
    */

		}, {
			key: 'removeClass',
			value: function removeClass(element, className) {
				element.classList.remove(className);

				return element;
			}
		}, {
			key: 'element',
			value: function element(selector) {
				var element = queryElement(selector);
				return element;
			}
		}, {
			key: 'addStyle',
			value: function addStyle(id, css) {
				if (typeof css != 'string') {
					throw new invalidArgumentException();
				}

				var head = document.head || document.getElementsByTagName('head')[0];
				var styleTag = document.createElement('style');

				// pipe it through the minfier
				var CSS = this.minifyCss(css);
				// adding it to the styletag
				styleTag.innerHTML = CSS;
				// give an id to recognize the style tag
				styleTag.setAttribute('id', id);
				// appending that style tag to the DOM head tag
				head.appendChild(styleTag);
			}
		}]);

		return DOM;
	}();

	/**
  * Queries an element from the DOM.
  */


	function queryElement(selector) {
		var element = document.querySelector(selector) || null;

		if (!element) {
			throw new NodeElementDoesNotExistException();
		}

		return element;
	}

	var Event = function () {
		function Event() {
			_classCallCheck(this, Event);
		}

		_createClass(Event, null, [{
			key: 'listen',

			/**
    * Listen to an event.
    */
			value: function listen(name, callback) {
				if (typeof callback !== 'function') {
					throw new InvalidArgumentException();
				}

				events[name] = callback;
			}

			/**
    * Fires an event.
    */

		}, {
			key: 'trigger',
			value: function trigger(name, data) {
				data = data || null;

				if (typeof events[name] !== 'function') {
					throw new BadEventCallException();
				}

				if (data != null && data instanceof Array) {
					var _events;

					return (_events = events)[name].apply(_events, _toConsumableArray(data));
				}

				events[name]();
			}
		}]);

		return Event;
	}();

	var Common = function () {
		function Common() {
			_classCallCheck(this, Common);
		}

		_createClass(Common, null, [{
			key: 'extend',

			/**
    * Extend an object.
    */
			value: function extend(currentObj, newObj) {
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

		}, {
			key: 'in_array',
			value: function in_array(needle, hystack) {
				if (hystack.constructor !== Array) return;

				for (var i = 0; i <= hystack.length; i++) {
					if (needle == hystack[i]) return true;
				}

				return false;
			}

			/**
    * Checks if an object is empty.
    */

		}, {
			key: 'emptyObject',
			value: function emptyObject(object) {
				for (var prop in object) {
					return false;
				}

				return true;
			}
		}, {
			key: 'containsObject',
			value: function containsObject(object, hystack) {
				var i;

				for (i = 0; i < hystack.length; i++) {
					if (typeof object == 'string' && hystack[i].constructor.name === object) {
						return true;
					}

					if (hystack[i] === object) {
						return true;
					}
				}

				return false;
			}

			/**
    * Convert camelCase to kebab-case.
    */

		}, {
			key: 'kebabCase',
			value: function kebabCase(string) {
				return string.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
			}

			/**
    * Checks if a given parameter is an object.
    */

		}, {
			key: 'isObject',
			value: function isObject(object) {
				return (typeof object === 'undefined' ? 'undefined' : _typeof(object)) == 'object';
			}
		}]);

		return Common;
	}();

	var InvalidBindingException = function InvalidBindingException() {
		_classCallCheck(this, InvalidBindingException);

		console.error(this.constructor.name + ', trying to bind an already existing bound.');

		throw new Error();
	};

	var InvalidArgumentException$1 = function InvalidArgumentException$1() {
		_classCallCheck(this, InvalidArgumentException$1);

		console.error(this.constructor.name + ', passing invalid arguments.');

		throw new Error();
	};

	var _instances = [];

	var Container = function () {
		function Container() {
			_classCallCheck(this, Container);
		}

		_createClass(Container, [{
			key: 'bind',

			/**
    * Binds key to concrete class.
    */
			value: function bind(key, concrete) {
				if (typeof key != 'string' || typeof concrete != 'function') {
					throw new InvalidArgumentException$1();
				}

				if (typeof this[key] != 'undefined') {
					throw new InvalidBindingException();
				}

				this[key] = concrete;
				this[key].bind(concrete);
			}

			/**
    * Sets an instance.
    */

		}, {
			key: 'setInstance',
			value: function setInstance(key, instance) {
				if (typeof key != 'string' || (typeof instance === 'undefined' ? 'undefined' : _typeof(instance)) != 'object') {
					throw new InvalidArgumentException$1();
				}

				_instances[key] = instance;
			}

			/**
    * Gets an instance.
    */

		}, {
			key: 'getInstance',
			value: function getInstance(key) {
				if (typeof key != 'string') {
					throw new InvalidArgumentException$1();
				}

				if ((typeof key === 'undefined' ? 'undefined' : _typeof(key)) == 'object') {
					return _instances[key.constructor.name] || null;
				}

				return _instances[key] || null;
			}

			/**
    * Checks if an instance exist.
    */

		}, {
			key: 'instanceExist',
			value: function instanceExist(instance) {
				if ((typeof instance === 'undefined' ? 'undefined' : _typeof(instance)) == 'object') {
					return typeof _instances[instance.constructor.name] !== 'undefined';
				}

				return instance in _instances;
			}

			/**
    * Creates an instance.
    */

		}, {
			key: 'make',
			value: function make(object) {
				var instance = {};

				if (this.instanceExist(object)) {
					return this.getInstance(object);
				}

				if ((typeof object === 'undefined' ? 'undefined' : _typeof(object)) == 'object') {
					instance = object;
				} else {
					instance = new this[object]();
				}

				this.setInstance(object, instance);

				return instance;
			}

			/**
    * Retrieve all instances.
    */

		}, {
			key: 'instances',
			value: function instances() {
				return _instances;
			}
		}]);

		return Container;
	}();

	var ComponentsException = function ComponentsException() {
		_classCallCheck(this, ComponentsException);

		console.error(this.constructor.name + ', expecting for at least one components, but none was given, \n\t\t\t\t\t\t\t\tplease add at least one requirement(Products, Services or/and Filter');

		throw new Error();
	};

	var BadEventCallException$1 = function BadEventCallException$1() {
		_classCallCheck(this, BadEventCallException$1);

		console.error(this.constructor.name + ', listening to a none-existing event');

		throw new Error();
	};

	var ComponentNotRegisteredException = function ComponentNotRegisteredException() {
		_classCallCheck(this, ComponentNotRegisteredException);

		console.error(this.constructor.name + ', components must be registered in order to use them');

		throw new Error();
	};

	var NodeElementDoesNotExistException$1 = function NodeElementDoesNotExistException$1() {
		_classCallCheck(this, NodeElementDoesNotExistException$1);

		console.error(this.constructor.name + ', trying to fetch an none-existing element from the DOM');

		throw new Error();
	};

	var ExceptionHandler = function () {
		function ExceptionHandler() {
			_classCallCheck(this, ExceptionHandler);
		}

		_createClass(ExceptionHandler, null, [{
			key: 'initalize',

			/**
    * Handle all the errors
    */
			value: function initalize() {
				window.onerror = function (message, source, lineno, colno, error) {

					if (error instanceof InvalidArgumentException$1) {
						// handle
					} else if (error instanceof InvalidBindingException) {
						// handle
					} else if (error instanceof BadEventCallException$1) {
						// handle
					} else if (error instanceof ComponentsException) {
						// handle
					} else if (error instanceof ComponentNotRegisteredException) {
						// handle
					} else if (error instanceof NodeElementDoesNotExistException$1) {} else {
						return false;
					}

					return true;
				};
			}
		}]);

		return ExceptionHandler;
	}();

	/**
  * The default settings of the filter.
  */


	var defaultSettings$1 = {
		element: '.filter',
		data: {},
		class: 'col-xs-2',
		width: '',
		height: ''
	};

	/**
  * The Filter Object, handles the filter of the products/services.
  */

	var Filter = function () {
		function Filter(container) {
			_classCallCheck(this, Filter);

			this.setup(defaultSettings$1);
		}

		_createClass(Filter, [{
			key: 'setup',
			value: function setup(settings) {
				if ((typeof settings === 'undefined' ? 'undefined' : _typeof(settings)) != 'object') {
					throw new InvalidArgumentException$1();
				}

				this.settings = Common.extend(defaultSettings$1, settings);

				this.setElement(this.settings.element);
			}
		}, {
			key: 'setElement',
			value: function setElement(selector) {
				this.wrapper = DOM.element(selector);

				DOM.addClass(this.wrapper, this.settings.class);
			}
		}]);

		return Filter;
	}();

	/**
  * The default settings of each product.
  */


	var defaultSettings$2 = {
		element: '.products',
		class: '',
		item_class: '',
		width: '200px',
		height: '250px',
		attributes: ['name', 'price', 'deliveryTime', 'image'],
		url: 'products.php',
		init_static_data: {}
	};

	/**
  * Stores the container object.
  */
	var Container$2 = void 0;

	/**
  * The Products Object, handles the products.
  */

	var Products = function () {
		/**
   * Initalize the Container and the paginator.
   */
		function Products(container, paginator) {
			_classCallCheck(this, Products);

			this.setup(defaultSettings$2);

			Container$2 = container;
			this.paginator = paginator;
		}

		/**
   * Sets the given settings from the user.
   */


		_createClass(Products, [{
			key: 'setup',
			value: function setup(settings) {
				if ((typeof settings === 'undefined' ? 'undefined' : _typeof(settings)) != 'object') {
					throw new InvalidArgumentException$1();
				}

				this.settings = Common.extend(defaultSettings$2, settings);

				this.setElement(this.settings.element);

				this.addStyleTag();

				if (typeof Container$2 == 'undefined') {
					return;
				}

				if (Container$2.instanceExist('Pagination')) {
					this.paginator.reset(this.settings.init_static_data);
					var request = this.getProductsByPage(this.paginator.getCurrent());

					request.then(function (items) {
						this.replaceItems(items);
					}.bind(this)).catch(function (error) {});
				}
			}

			/**
    * Sets the DOM element for populating the products.
    */

		}, {
			key: 'setElement',
			value: function setElement(selector) {
				this.wrapper = DOM.element(selector);

				DOM.addClass(this.wrapper, this.settings.class);
			}

			/**
    * Replace items in the container.
    */

		}, {
			key: 'replaceItems',
			value: function replaceItems(items) {
				if (!Array.isArray(items) || typeof items[0] == 'string') {
					throw new InvalidArgumentException$1();
				}

				if (Container$2.instanceExist('Pagination')) {
					var perPage = this.paginator.settings.per_page;
					items = items.slice(0, perPage);
				}

				var wrappedItems = this.wrapAllWithHTML(items, this.settings.item_class, 'div');

				this.wrapper.innerHTML = wrappedItems;

				return items;
			}

			/**
    * Makes an Ajax call to the server.
    */

		}, {
			key: 'getProductsByPage',
			value: function getProductsByPage(pageNumber) {
				return new Promise(function (resolve, reject) {
					if (this.paginator.notInPageRange(pageNumber)) {
						return reject('Not in pagination range');
					}

					var xhr = new XMLHttpRequest() || new ActiveXObject("Microsoft.XMLHTTP");

					xhr.open('GET', this.settings.url + '?page=' + pageNumber, true);
					xhr.setRequestHeader('Content-Type', 'application/json');

					var instance = this;

					xhr.onreadystatechange = function () {
						if (this.readyState == 4) {
							if (this.status == 200) {
								instance.currentItems = this.responseText == '' ? [] : JSON.parse(this.responseText);

								if (instance.currentItems.length === 0) {
									reject('No Items were retrieved!');
								}

								for (var i = 0; i < instance.currentItems.length; i++) {
									var product = instance.currentItems[i];
									instance.AfterLoaded.call(this, product);
								}

								resolve(instance.currentItems);
							} else {
								reject(this.statusText);
							}
						}
					};

					xhr.onerror = function (error) {
						reject(error);
					};

					xhr.send(null);
				}.bind(this));
			}

			/**
    * Wrap all the items with specifc tag and classname.
    */

		}, {
			key: 'wrapAllWithHTML',
			value: function wrapAllWithHTML(items, className, tagType) {
				className = className || null;
				className = className ? 'product ' + className : 'product';

				var wrappedItems = '';

				items = items.map(function (product, index) {
					var item = document.createElement(tagType);
					item = DOM.addClass(item, className);

					var overlay = document.createElement('div');
					overlay.className = 'product-overlay';
					item.appendChild(overlay);

					for (var prop in product) {
						if (this.settings.attributes.indexOf(prop) == -1) {
							continue;
						}

						var tag = document.createElement(tagType);

						if (prop == 'image') {
							var image = document.createElement('img');
							image.setAttribute('src', product[prop]);
							item.appendChild(image);
						} else {
							tag.innerHTML = product[prop] || '';
						}

						tag.className = 'product-' + Common.kebabCase(prop);
						overlay.appendChild(tag);
					}

					var temp = document.createElement(tagType);
					temp.appendChild(item);

					wrappedItems += temp.innerHTML + "\n";

					return product;
				}.bind(this));

				return wrappedItems;
			}

			/**
    * An event for the client of when the products as been loaded.
    */

		}, {
			key: 'AfterLoaded',
			value: function AfterLoaded(product) {}
			//


			/**
    * Add the eCommerce style tags to the DOM.
    */

		}, {
			key: 'addStyleTag',
			value: function addStyleTag() {
				var css = '\n\t\t\t.product {\n\t\t\t\tposition: relative;\n\t\t\t\tmargin: 5px 5px;\n\t\t\t\tborder: 1px solid #e4e4e4;\n\t\t\t\twidth: ' + this.settings.width + ';\n\t\t\t\theight: ' + this.settings.height + ';\n\t\t\t\tcursor: pointer;\n\t\t\t\tcolor: #ffffff;\n\t\t\t\toverflow: hidden;\n\t\t\t}\n\n\t\t\t.product > .product-overlay {\n\t\t\t\tposition: absolute;\n\t\t\t\ttop: 0;\n\t\t\t\tleft: 0;\n\t\t\t\twidth: 100%;\n\t\t\t\theight: 100%;\n\t\t\t\topacity: 0.5;\n\t\t\t\tz-index: 5;\n\t\t\t\ttransition: 1s all;\n\t\t\t\ttransform: translateX(-250px);\n\t\t\t}\n\n\t\t\t.product:hover > .product-overlay {\n\t\t\t\tbackground: rgba(0, 0, 0, 0.45);\n\t\t\t\ttransform: translateX(0px);\n\t\t\t\topacity: 1;\n\t\t\t\ttransition: 1s all;\n\t\t\t}\n\n\t\t\t.product > img {\n\t\t\t\tposition: absolute;\n\t\t\t\tleft: 0;\n\t\t\t\ttop: 0;\n\t\t\t\twidth: 100%;\n\t\t\t\theight: 100%;\n\t\t\t}\n\n\t\t\t.product > .product-image {\n\t\t\t\tz-index: 0;\n\t\t\t\tposition: absolute;\n\t\t\t\ttop: 0;\n\t\t\t\tleft: 0;\n\t\t\t}\n\n\t\t\t.product > .product-overlay > .product-name, \n\t\t\t.product > .product-overlay > .product-price,\n\t\t\t.product > .product-overlay > .product-delivery-time {\n\t\t\t\tz-index: 1;\n\t\t\t\tposition: relative;\n\t\t\t\ttext-align: center;\n\t\t\t\tmargin-top: 25px;\n\t\t\t}\n\t\t';

				return DOM.addStyle('eCommerce-Products', css);
			}
		}]);

		return Products;
	}();

	/**
  * The Services Object, handles the services.
  */


	var Services = function Services() {
		_classCallCheck(this, Services);
	};

	/**
  * The default settings of the pagination.
  */


	var defaultSettings$3 = {
		element: '.pagination-links',
		class: 'col-xs-offset-4 col-xs-8',
		per_page: 5,
		total_items: 10
	};

	/**
  * Stores the container object.
  */
	var Container$3 = void 0;

	/**
  * The Pagination Object, handles the pagination.
  */

	var Pagination = function () {
		/**
   * Initialize the container object and the default settings.
   */
		function Pagination(container) {
			_classCallCheck(this, Pagination);

			Container$3 = container;
			this.setup(defaultSettings$3);
		}

		/**
   * Set the Pagination object up.
   */


		_createClass(Pagination, [{
			key: 'setup',
			value: function setup(settings) {
				if ((typeof settings === 'undefined' ? 'undefined' : _typeof(settings)) != 'object') {
					throw new InvalidArgumentException$1();
				}

				this.settings = Common.extend(defaultSettings$3, settings);

				this.totalPages = this.calculateTotalPages(this.settings.per_page, this.settings.total_items);
				this.setElement(this.settings.element);
				this.replaceLinks(this.links);
			}

			/**
    * Sets the wrapper element.
    */

		}, {
			key: 'setElement',
			value: function setElement(selector) {
				this.wrapper = DOM.element(selector);

				DOM.addClass(this.wrapper, this.settings.class);

				this.links = this.createLinks();
				this.bindEventListeners(this.links);
			}

			/**
    * Replaces the links in the wrapper.
    */

		}, {
			key: 'replaceLinks',
			value: function replaceLinks(links) {
				this.wrapper.innerHTML = '';
				this.wrapper.appendChild(links);
			}
		}, {
			key: 'calculateTotalPages',
			value: function calculateTotalPages(perPage, totalItems) {
				perPage = parseInt(perPage);
				totalItems = parseInt(totalItems);

				return Math.ceil(totalItems / perPage);
			}

			/**
    * Binds the buttons events listeners.
    */

		}, {
			key: 'bindEventListeners',
			value: function bindEventListeners(links) {
				var instance = this;
				var Products = Container$3.getInstance('Products');

				this.next.childNodes[0].onclick = function (event) {
					event.preventDefault();

					Products.getProductsByPage(instance.current + 1).then(function (products) {
						Products.replaceItems(products);
					});

					instance.setCurrent(instance.current + 1);
				};

				this.previous.childNodes[0].onclick = function (event) {
					event.preventDefault();

					Products.getProductsByPage(instance.current - 1).then(function (products) {
						Products.replaceItems(products);
					});

					instance.setCurrent(instance.current - 1);
				};

				for (var i = 0; i < this.pages.length; i++) {
					this.pages[i].childNodes[0].onclick = function (event) {
						event.preventDefault();
						var pageNumber = this.getAttribute('data-page-nr');

						Products.getProductsByPage(pageNumber).then(function (products) {
							Products.replaceItems(products);
						});

						instance.setCurrent(pageNumber);
					};
				}
			}

			/**
    * Sets the current page.
    */

		}, {
			key: 'setCurrent',
			value: function setCurrent(pageNumber) {
				if (this.notInPageRange(pageNumber)) {
					return;
				}

				this.current = parseInt(pageNumber);
				this.changeUrl(pageNumber);
			}

			/**
    * Gets the current page.
    */

		}, {
			key: 'getCurrent',
			value: function getCurrent() {
				return this.current;
			}

			/**
    * Creates the pagination links.
    */

		}, {
			key: 'createLinks',
			value: function createLinks() {
				var ul = document.createElement('ul');

				this.pages = this.createPageLinks();
				this.previous = this.createPreviousButton();
				this.next = this.createNextButton();

				ul.className = 'pagination';
				ul.appendChild(this.previous);

				this.pages.forEach(function (page) {
					ul.appendChild(page);
				});

				ul.appendChild(this.next);

				return ul;
			}

			/**
    * Creates the pages item links.
    */

		}, {
			key: 'createPageLinks',
			value: function createPageLinks() {
				var pages = [];

				for (var i = 1; i <= this.totalPages; i++) {
					var pageItem = document.createElement('li');
					var link = document.createElement('a');
					pageItem.className = 'page-item';
					link.className = 'page-link';
					link.setAttribute('href', '?page=' + i);
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

		}, {
			key: 'createPreviousButton',
			value: function createPreviousButton() {
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

		}, {
			key: 'createNextButton',
			value: function createNextButton() {
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

		}, {
			key: 'notInPageRange',
			value: function notInPageRange(pageNumber) {
				return pageNumber > this.totalPages || pageNumber <= 0 || isNaN(pageNumber);
			}

			/**
    * Changes the url to a given page number.
    */

		}, {
			key: 'changeUrl',
			value: function changeUrl(pageNumber) {
				pageNumber = pageNumber || GET_Vars()['page'];
				window.history.replaceState('', '', this.updateURLParameter(window.location.href, 'page', pageNumber));
			}

			/**
    * Get the get variables from the url.
    */

		}, {
			key: 'GET_Vars',
			value: function GET_Vars() {
				var vars = {};
				var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (m, key, value) {
					vars[key] = value;
				});

				return vars;
			}

			/**
    * Modifies the get parameter in the url.
    */

		}, {
			key: 'updateURLParameter',
			value: function updateURLParameter(url, param, paramVal) {
				var newAdditionalURL = "";
				var tempArray = url.split("?");
				var baseURL = tempArray[0];
				var additionalURL = tempArray[1];
				var temp = "";

				if (additionalURL) {
					tempArray = additionalURL.split("&");
					for (var i = 0; i < tempArray.length; i++) {
						if (tempArray[i].split('=')[0] != param) {
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

		}, {
			key: 'reset',
			value: function reset() {
				this.setCurrent(1);
				this.changeUrl(1);
			}
		}]);

		return Pagination;
	}();

	var initalized = false;

	var defaultSettings = {
		cartSessionId: [],
		importBootstrap: false,
		components: ['Products', 'Services', 'Filter', 'Pagination']
	};

	var eCommerce = function eCommerce(settings) {
		_classCallCheck(this, eCommerce);

		ExceptionHandler.initalize();

		if ((typeof settings === 'undefined' ? 'undefined' : _typeof(settings)) != 'object') {
			throw new InvalidArgumentException$1();
		}

		this.container = new Container();
		this.settings = Common.extend(defaultSettings, settings);

		bindComponentsDependencies.call(this, settings.components);

		initalized = true;

		return new Proxy(this, {
			get: function get(target, object) {
				return target.container.make(object);
			}
		});
	};

	/**
  * Binds components dependencies.
  */


	function bindComponentsDependencies(components) {
		var container = this.container;

		container.bind('Filter', function () {
			return new Filter(container);
		});

		container.bind('Services', function () {
			return new Services(container);
		});

		container.bind('Pagination', function () {
			return new Pagination(container);
		});

		container.bind('Products', function () {
			return new Products(container, container.make('Pagination'));
		});
	}

	return eCommerce;
}();
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVDb21tZXJjZS5qcyJdLCJuYW1lcyI6WyJlQ29tbWVyY2UiLCJET00iLCJzdHJpbmciLCJyZXBsYWNlIiwiZWxlbWVudCIsImNsYXNzTmFtZSIsInRyaW0iLCJzcGxpdCIsImkiLCJsZW5ndGgiLCJjbGFzc0xpc3QiLCJhZGQiLCJyZW1vdmUiLCJzZWxlY3RvciIsInF1ZXJ5RWxlbWVudCIsImlkIiwiY3NzIiwiaW52YWxpZEFyZ3VtZW50RXhjZXB0aW9uIiwiaGVhZCIsImRvY3VtZW50IiwiZ2V0RWxlbWVudHNCeVRhZ05hbWUiLCJzdHlsZVRhZyIsImNyZWF0ZUVsZW1lbnQiLCJDU1MiLCJtaW5pZnlDc3MiLCJpbm5lckhUTUwiLCJzZXRBdHRyaWJ1dGUiLCJhcHBlbmRDaGlsZCIsInF1ZXJ5U2VsZWN0b3IiLCJOb2RlRWxlbWVudERvZXNOb3RFeGlzdEV4Y2VwdGlvbiIsIkV2ZW50IiwibmFtZSIsImNhbGxiYWNrIiwiSW52YWxpZEFyZ3VtZW50RXhjZXB0aW9uIiwiZXZlbnRzIiwiZGF0YSIsIkJhZEV2ZW50Q2FsbEV4Y2VwdGlvbiIsIkFycmF5IiwiQ29tbW9uIiwiY3VycmVudE9iaiIsIm5ld09iaiIsImV4dGVuZGVkIiwicHJvcCIsIk9iamVjdCIsInByb3RvdHlwZSIsImhhc093blByb3BlcnR5IiwiY2FsbCIsIm5lZWRsZSIsImh5c3RhY2siLCJjb25zdHJ1Y3RvciIsIm9iamVjdCIsInRvTG93ZXJDYXNlIiwiSW52YWxpZEJpbmRpbmdFeGNlcHRpb24iLCJjb25zb2xlIiwiZXJyb3IiLCJFcnJvciIsIkludmFsaWRBcmd1bWVudEV4Y2VwdGlvbiQxIiwiaW5zdGFuY2VzIiwiQ29udGFpbmVyIiwia2V5IiwiY29uY3JldGUiLCJiaW5kIiwiaW5zdGFuY2UiLCJpbnN0YW5jZUV4aXN0IiwiZ2V0SW5zdGFuY2UiLCJzZXRJbnN0YW5jZSIsIkNvbXBvbmVudHNFeGNlcHRpb24iLCJCYWRFdmVudENhbGxFeGNlcHRpb24kMSIsIkNvbXBvbmVudE5vdFJlZ2lzdGVyZWRFeGNlcHRpb24iLCJOb2RlRWxlbWVudERvZXNOb3RFeGlzdEV4Y2VwdGlvbiQxIiwiRXhjZXB0aW9uSGFuZGxlciIsIndpbmRvdyIsIm9uZXJyb3IiLCJtZXNzYWdlIiwic291cmNlIiwibGluZW5vIiwiY29sbm8iLCJkZWZhdWx0U2V0dGluZ3MkMSIsImNsYXNzIiwid2lkdGgiLCJoZWlnaHQiLCJGaWx0ZXIiLCJjb250YWluZXIiLCJzZXR1cCIsInNldHRpbmdzIiwiZXh0ZW5kIiwic2V0RWxlbWVudCIsIndyYXBwZXIiLCJhZGRDbGFzcyIsImRlZmF1bHRTZXR0aW5ncyQyIiwiaXRlbV9jbGFzcyIsImF0dHJpYnV0ZXMiLCJ1cmwiLCJpbml0X3N0YXRpY19kYXRhIiwiQ29udGFpbmVyJDIiLCJQcm9kdWN0cyIsInBhZ2luYXRvciIsImFkZFN0eWxlVGFnIiwicmVzZXQiLCJyZXF1ZXN0IiwiZ2V0UHJvZHVjdHNCeVBhZ2UiLCJnZXRDdXJyZW50IiwidGhlbiIsIml0ZW1zIiwicmVwbGFjZUl0ZW1zIiwiY2F0Y2giLCJpc0FycmF5IiwicGVyUGFnZSIsInBlcl9wYWdlIiwic2xpY2UiLCJ3cmFwcGVkSXRlbXMiLCJ3cmFwQWxsV2l0aEhUTUwiLCJwYWdlTnVtYmVyIiwiUHJvbWlzZSIsInJlc29sdmUiLCJyZWplY3QiLCJub3RJblBhZ2VSYW5nZSIsInhociIsIlhNTEh0dHBSZXF1ZXN0IiwiQWN0aXZlWE9iamVjdCIsIm9wZW4iLCJzZXRSZXF1ZXN0SGVhZGVyIiwib25yZWFkeXN0YXRlY2hhbmdlIiwicmVhZHlTdGF0ZSIsInN0YXR1cyIsImN1cnJlbnRJdGVtcyIsInJlc3BvbnNlVGV4dCIsIkpTT04iLCJwYXJzZSIsInByb2R1Y3QiLCJBZnRlckxvYWRlZCIsInN0YXR1c1RleHQiLCJzZW5kIiwidGFnVHlwZSIsIm1hcCIsImluZGV4IiwiaXRlbSIsIm92ZXJsYXkiLCJpbmRleE9mIiwidGFnIiwiaW1hZ2UiLCJrZWJhYkNhc2UiLCJ0ZW1wIiwiYWRkU3R5bGUiLCJTZXJ2aWNlcyIsImRlZmF1bHRTZXR0aW5ncyQzIiwidG90YWxfaXRlbXMiLCJDb250YWluZXIkMyIsIlBhZ2luYXRpb24iLCJ0b3RhbFBhZ2VzIiwiY2FsY3VsYXRlVG90YWxQYWdlcyIsInJlcGxhY2VMaW5rcyIsImxpbmtzIiwiY3JlYXRlTGlua3MiLCJiaW5kRXZlbnRMaXN0ZW5lcnMiLCJ0b3RhbEl0ZW1zIiwicGFyc2VJbnQiLCJNYXRoIiwiY2VpbCIsIm5leHQiLCJjaGlsZE5vZGVzIiwib25jbGljayIsImV2ZW50IiwicHJldmVudERlZmF1bHQiLCJjdXJyZW50IiwicHJvZHVjdHMiLCJzZXRDdXJyZW50IiwicHJldmlvdXMiLCJwYWdlcyIsImdldEF0dHJpYnV0ZSIsImNoYW5nZVVybCIsInVsIiwiY3JlYXRlUGFnZUxpbmtzIiwiY3JlYXRlUHJldmlvdXNCdXR0b24iLCJjcmVhdGVOZXh0QnV0dG9uIiwiZm9yRWFjaCIsInBhZ2UiLCJwYWdlSXRlbSIsImxpbmsiLCJwdXNoIiwibGkiLCJzcGFuMSIsInNwYW4yIiwiaXNOYU4iLCJHRVRfVmFycyIsImhpc3RvcnkiLCJyZXBsYWNlU3RhdGUiLCJ1cGRhdGVVUkxQYXJhbWV0ZXIiLCJsb2NhdGlvbiIsImhyZWYiLCJ2YXJzIiwicGFydHMiLCJtIiwidmFsdWUiLCJwYXJhbSIsInBhcmFtVmFsIiwibmV3QWRkaXRpb25hbFVSTCIsInRlbXBBcnJheSIsImJhc2VVUkwiLCJhZGRpdGlvbmFsVVJMIiwicm93c1RleHQiLCJpbml0YWxpemVkIiwiZGVmYXVsdFNldHRpbmdzIiwiY2FydFNlc3Npb25JZCIsImltcG9ydEJvb3RzdHJhcCIsImNvbXBvbmVudHMiLCJpbml0YWxpemUiLCJiaW5kQ29tcG9uZW50c0RlcGVuZGVuY2llcyIsIlByb3h5IiwiZ2V0IiwidGFyZ2V0IiwibWFrZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLElBQUlBLFlBQWEsWUFBWTtBQUM3Qjs7QUFENkIsS0FHdkJDLEdBSHVCO0FBQUE7QUFBQTtBQUFBOztBQUFBO0FB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SyxPQUFPaEksU0FBUCxDQUFpQmlJLElBQWpCLENBQXNCakssTUFBdEIsQ0FBUDtBQUNBO0FBSHFCLEdBQWhCLENBQVA7QUFLQSxFQXBnQzJCOztBQXVnQzdCOzs7OztBQUdBLFVBQVM2SiwwQkFBVCxDQUFvQ0YsVUFBcEMsRUFBZ0Q7QUFDL0MsTUFBSTNILFlBQVksS0FBS0EsU0FBckI7O0FBRUFBLFlBQVVyQixJQUFWLENBQWUsUUFBZixFQUF5QixZQUFXO0FBQ25DLFVBQU8sSUFBSW9CLE1BQUosQ0FBV0MsU0FBWCxDQUFQO0FBQ0EsR0FGRDs7QUFJQUEsWUFBVXJCLElBQVYsQ0FBZSxVQUFmLEVBQTJCLFlBQVc7QUFDckMsVUFBTyxJQUFJbUYsUUFBSixDQUFhOUQsU0FBYixDQUFQO0FBQ0EsR0FGRDs7QUFJQUEsWUFBVXJCLElBQVYsQ0FBZSxZQUFmLEVBQTZCLFlBQVc7QUFDdkMsVUFBTyxJQUFJdUYsVUFBSixDQUFlbEUsU0FBZixDQUFQO0FBQ0EsR0FGRDs7QUFJQUEsWUFBVXJCLElBQVYsQ0FBZSxVQUFmLEVBQTJCLFlBQVc7QUFDckMsVUFBTyxJQUFJa0MsUUFBSixDQUFhYixTQUFiLEVBQXdCQSxVQUFVaUksSUFBVixDQUFlLFlBQWYsQ0FBeEIsQ0FBUDtBQUNBLEdBRkQ7QUFHQTs7QUFFRCxRQUFPbk4sU0FBUDtBQUVDLENBaGlDZ0IsRUFBakIiLCJmaWxlIjoiZUNvbW1lcmNlLmpzIiwic291cmNlc0NvbnRlbnQiOlsidmFyIGVDb21tZXJjZSA9IChmdW5jdGlvbiAoKSB7XG4ndXNlIHN0cmljdCc7XG5cbmNsYXNzIERPTVxyXG57XHJcblx0LyoqXHJcblx0ICogTWluaWZpZXMgdGhlIGNzcyB0ZXh0LlxyXG5cdCAqL1xyXG5cdHN0YXRpYyBtaW5pZnlDc3Moc3RyaW5nKSBcclxuXHR7XHJcblx0ICAgIHN0cmluZyA9IHN0cmluZy5yZXBsYWNlKC9cXC9cXCooPzooPyFcXCpcXC8pW1xcc1xcU10pKlxcKlxcL3xbXFxyXFxuXFx0XSsvZywgJycpO1xyXG5cdCAgICBzdHJpbmcgPSBzdHJpbmcucmVwbGFjZSgvIHsyLH0vZywgJyAnKTtcclxuXHQgICAgc3RyaW5nID0gc3RyaW5nLnJlcGxhY2UoLyhbezp9XSkvZywgJyQxJyk7XHJcblx0ICAgIHN0cmluZyA9IHN0cmluZy5yZXBsYWNlKC8oWzssXSkgL2csICckMScpO1xyXG5cdCAgICBzdHJpbmcgPSBzdHJpbmcucmVwbGFjZSgvICEvZywgJyEnKTtcclxuXHQgICAgXHJcblx0ICAgIHJldHVybiBzdHJpbmc7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBBZGRzIGNsYXNzIHRvIGEgZ2l2ZW4gZWxlbWVudC5cclxuXHQgKi9cclxuXHRzdGF0aWMgYWRkQ2xhc3MoZWxlbWVudCwgY2xhc3NOYW1lKSBcclxuXHR7XHJcblx0XHRpZihjbGFzc05hbWUgPT0gJycpIHJldHVybiBlbGVtZW50O1xyXG5cclxuXHRcdGNsYXNzTmFtZSA9IGNsYXNzTmFtZS50cmltKCk7XHJcblx0XHRjbGFzc05hbWUgPSBjbGFzc05hbWUuc3BsaXQoJyAnKTtcclxuXHJcblx0XHRmb3IodmFyIGkgPSAwOyBpIDwgY2xhc3NOYW1lLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdGVsZW1lbnQuY2xhc3NMaXN0LmFkZChjbGFzc05hbWVbaV0pO1xyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiBlbGVtZW50O1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogUmVtb3ZlcyBjbGFzcyBmcm9tIGEgZ2l2ZW4gZWxlbWVudC5cclxuXHQgKi9cclxuXHRzdGF0aWMgcmVtb3ZlQ2xhc3MoZWxlbWVudCwgY2xhc3NOYW1lKSBcclxuXHR7XHJcblx0XHRlbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoY2xhc3NOYW1lKTtcclxuXHRcdFxyXG5cdFx0cmV0dXJuIGVsZW1lbnQ7XHJcblx0fVxyXG5cclxuXHRzdGF0aWMgZWxlbWVudChzZWxlY3RvcikgXHJcblx0e1xyXG5cdFx0bGV0IGVsZW1lbnQgPSBxdWVyeUVsZW1lbnQoc2VsZWN0b3IpO1xyXG5cdFx0cmV0dXJuIGVsZW1lbnQ7XHJcblx0fVxyXG5cclxuXHRzdGF0aWMgYWRkU3R5bGUoaWQsIGNzcykgXHJcblx0e1xyXG5cdFx0aWYodHlwZW9mIGNzcyAhPSAnc3RyaW5nJykge1xyXG5cdFx0XHR0aHJvdyBuZXcgaW52YWxpZEFyZ3VtZW50RXhjZXB0aW9uO1xyXG5cdFx0fVxyXG5cclxuXHRcdGxldCBoZWFkID0gZG9jdW1lbnQuaGVhZCB8fCBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnaGVhZCcpWzBdO1xyXG5cdFx0bGV0IHN0eWxlVGFnID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3R5bGUnKTtcclxuXHJcblx0XHQvLyBwaXBlIGl0IHRocm91Z2ggdGhlIG1pbmZpZXJcclxuXHQgICAgbGV0IENTUyA9IHRoaXMubWluaWZ5Q3NzKGNzcyk7XHJcblx0ICAgIC8vIGFkZGluZyBpdCB0byB0aGUgc3R5bGV0YWdcclxuXHQgICAgc3R5bGVUYWcuaW5uZXJIVE1MID0gQ1NTO1xyXG5cdCAgICAvLyBnaXZlIGFuIGlkIHRvIHJlY29nbml6ZSB0aGUgc3R5bGUgdGFnXHJcblx0XHRzdHlsZVRhZy5zZXRBdHRyaWJ1dGUoJ2lkJywgaWQpO1xyXG5cdFx0Ly8gYXBwZW5kaW5nIHRoYXQgc3R5bGUgdGFnIHRvIHRoZSBET00gaGVhZCB0YWdcclxuXHRcdGhlYWQuYXBwZW5kQ2hpbGQoc3R5bGVUYWcpO1xyXG5cdH1cclxufVxyXG5cclxuLyoqXHJcbiAqIFF1ZXJpZXMgYW4gZWxlbWVudCBmcm9tIHRoZSBET00uXHJcbiAqL1xyXG5mdW5jdGlvbiBxdWVyeUVsZW1lbnQoc2VsZWN0b3IpIHtcclxuXHRsZXQgZWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3Ioc2VsZWN0b3IpIHx8IG51bGw7XHJcblxyXG5cdGlmKCEgZWxlbWVudCkge1xyXG5cdFx0dGhyb3cgbmV3IE5vZGVFbGVtZW50RG9lc05vdEV4aXN0RXhjZXB0aW9uO1xyXG5cdH1cclxuXHJcblx0cmV0dXJuIGVsZW1lbnQ7XHJcbn1cblxuY2xhc3MgRXZlbnRcclxue1xyXG5cdC8qKlxyXG5cdCAqIExpc3RlbiB0byBhbiBldmVudC5cclxuXHQgKi9cclxuXHRzdGF0aWMgbGlzdGVuKG5hbWUsIGNhbGxiYWNrKSB7XHJcblx0XHRpZiAodHlwZW9mIGNhbGxiYWNrICE9PSAnZnVuY3Rpb24nKSB7XHJcblx0XHRcdHRocm93IG5ldyBJbnZhbGlkQXJndW1lbnRFeGNlcHRpb247XHJcblx0XHR9XHJcblxyXG5cdFx0ZXZlbnRzW25hbWVdID0gY2FsbGJhY2s7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBGaXJlcyBhbiBldmVudC5cclxuXHQgKi9cclxuXHRzdGF0aWMgdHJpZ2dlcihuYW1lLCBkYXRhKSB7XHJcblx0XHRkYXRhID0gZGF0YSB8fCBudWxsO1xyXG5cclxuXHRcdGlmKHR5cGVvZiBldmVudHNbbmFtZV0gIT09ICdmdW5jdGlvbicpIHtcclxuXHRcdFx0dGhyb3cgbmV3IEJhZEV2ZW50Q2FsbEV4Y2VwdGlvbjtcclxuXHRcdH1cclxuXHJcblx0XHRpZihkYXRhICE9IG51bGwgJiYgZGF0YSBpbnN0YW5jZW9mIEFycmF5KSB7XHJcblx0XHJcblx0XHRcdHJldHVybiBldmVudHNbbmFtZV0oLi4uZGF0YSk7XHJcblx0XHR9XHJcblxyXG5cdFx0ZXZlbnRzW25hbWVdKCk7XHJcblx0fVxyXG59XG5cbmNsYXNzIENvbW1vblxyXG57XHJcblx0LyoqXHJcblx0ICogRXh0ZW5kIGFuIG9iamVjdC5cclxuXHQgKi9cclxuXHRzdGF0aWMgZXh0ZW5kKGN1cnJlbnRPYmosIG5ld09iaiApIHtcclxuXHRcdHZhciBleHRlbmRlZCA9IHt9O1xyXG5cdCAgICB2YXIgcHJvcDtcclxuXHJcblx0ICAgIGZvciAocHJvcCBpbiBjdXJyZW50T2JqKSB7XHJcblx0ICAgICAgICBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGN1cnJlbnRPYmosIHByb3ApKSB7XHJcblx0ICAgICAgICAgICAgZXh0ZW5kZWRbcHJvcF0gPSBjdXJyZW50T2JqW3Byb3BdO1xyXG5cdCAgICAgICAgfVxyXG5cdCAgICB9XHJcblxyXG5cdCAgICBmb3IgKHByb3AgaW4gbmV3T2JqKSB7XHJcblx0ICAgICAgICBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG5ld09iaiwgcHJvcCkpIHtcclxuXHQgICAgICAgICAgICBleHRlbmRlZFtwcm9wXSA9IG5ld09ialtwcm9wXTtcclxuXHQgICAgICAgIH1cclxuXHQgICAgfVxyXG5cclxuXHQgICAgcmV0dXJuIGV4dGVuZGVkO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQ2hlY2tzIGZvciBhIG5lZWRsZSBpbiBoeXN0YWNrLlxyXG5cdCAqL1xyXG5cdHN0YXRpYyBpbl9hcnJheShuZWVkbGUsIGh5c3RhY2spIHtcclxuXHRcdGlmKGh5c3RhY2suY29uc3RydWN0b3IgIT09IEFycmF5KSByZXR1cm47XHJcblxyXG5cdFx0Zm9yKHZhciBpID0gMDsgaSA8PSBoeXN0YWNrLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdGlmKG5lZWRsZSA9PSBoeXN0YWNrW2ldKSByZXR1cm4gdHJ1ZTtcdFxyXG5cdFx0fVxyXG5cdFxyXG5cdFx0cmV0dXJuIGZhbHNlO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQ2hlY2tzIGlmIGFuIG9iamVjdCBpcyBlbXB0eS5cclxuXHQgKi9cclxuXHRzdGF0aWMgZW1wdHlPYmplY3Qob2JqZWN0KSB7XHJcblx0XHRmb3IodmFyIHByb3AgaW4gb2JqZWN0KSB7XHJcblx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gdHJ1ZTtcclxuXHR9XHJcblxyXG5cdHN0YXRpYyBjb250YWluc09iamVjdChvYmplY3QsIGh5c3RhY2spIFxyXG5cdHtcclxuXHQgICAgdmFyIGk7XHJcblxyXG5cdCAgICBmb3IgKGkgPSAwOyBpIDwgaHlzdGFjay5sZW5ndGg7IGkrKykge1xyXG5cdCAgICAgICAgaWYgKHR5cGVvZiBvYmplY3QgPT0gJ3N0cmluZycgJiYgaHlzdGFja1tpXS5jb25zdHJ1Y3Rvci5uYW1lID09PSBvYmplY3QpIHtcclxuXHQgICAgICAgIFx0cmV0dXJuIHRydWU7XHJcblx0ICAgICAgICB9XHJcblxyXG5cdCAgICAgICAgaWYgKGh5c3RhY2tbaV0gPT09IG9iamVjdCkge1xyXG5cdCAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG5cdCAgICAgICAgfVxyXG5cdCAgICB9XHJcblxyXG5cdCAgICByZXR1cm4gZmFsc2U7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBDb252ZXJ0IGNhbWVsQ2FzZSB0byBrZWJhYi1jYXNlLlxyXG5cdCAqL1xyXG5cdHN0YXRpYyBrZWJhYkNhc2Uoc3RyaW5nKSB7XHJcblx0XHRyZXR1cm4gc3RyaW5nLnJlcGxhY2UoLyhbYS16XSkoW0EtWl0pL2csICckMS0kMicpLnRvTG93ZXJDYXNlKCk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBDaGVja3MgaWYgYSBnaXZlbiBwYXJhbWV0ZXIgaXMgYW4gb2JqZWN0LlxyXG5cdCAqL1xyXG5cdHN0YXRpYyBpc09iamVjdChvYmplY3QpIHtcclxuXHRcdHJldHVybiB0eXBlb2Ygb2JqZWN0ID09ICdvYmplY3QnO1xyXG5cdH1cclxufVxuXG5jbGFzcyBJbnZhbGlkQmluZGluZ0V4Y2VwdGlvblxyXG57XHJcblx0Y29uc3RydWN0b3IoKSBcclxuXHR7IFxyXG4gICAgXHRjb25zb2xlLmVycm9yKGAke3RoaXMuY29uc3RydWN0b3IubmFtZX0sIHRyeWluZyB0byBiaW5kIGFuIGFscmVhZHkgZXhpc3RpbmcgYm91bmQuYCk7XHJcblxyXG4gICAgXHR0aHJvdyBuZXcgRXJyb3I7XHJcbiAgICB9XHJcbn1cblxuY2xhc3MgSW52YWxpZEFyZ3VtZW50RXhjZXB0aW9uJDFcclxue1xyXG5cdGNvbnN0cnVjdG9yKCkgXHJcblx0eyBcclxuICAgIFx0Y29uc29sZS5lcnJvcihgJHt0aGlzLmNvbnN0cnVjdG9yLm5hbWV9LCBwYXNzaW5nIGludmFsaWQgYXJndW1lbnRzLmApO1xyXG5cclxuICAgIFx0dGhyb3cgbmV3IEVycm9yO1xyXG4gICAgfVxyXG59XG5cbmxldCBpbnN0YW5jZXMgPSBbXTtcclxuXHJcbmNsYXNzIENvbnRhaW5lciBcclxue1xyXG5cdC8qKlxyXG5cdCAqIEJpbmRzIGtleSB0byBjb25jcmV0ZSBjbGFzcy5cclxuXHQgKi9cclxuXHRiaW5kKGtleSwgY29uY3JldGUpIFxyXG5cdHtcclxuXHRcdGlmICh0eXBlb2Yga2V5ICE9ICdzdHJpbmcnIHx8IHR5cGVvZiBjb25jcmV0ZSAhPSAnZnVuY3Rpb24nKSB7XHJcblx0XHRcdHRocm93IG5ldyBJbnZhbGlkQXJndW1lbnRFeGNlcHRpb24kMTtcclxuXHRcdH1cclxuXHJcblx0XHRpZiAodHlwZW9mIHRoaXNba2V5XSAhPSAndW5kZWZpbmVkJykge1xyXG5cdFx0XHR0aHJvdyBuZXcgSW52YWxpZEJpbmRpbmdFeGNlcHRpb247XHJcblx0XHR9XHJcblxyXG5cdFx0dGhpc1trZXldID0gY29uY3JldGU7XHJcblx0XHR0aGlzW2tleV0uYmluZChjb25jcmV0ZSk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBTZXRzIGFuIGluc3RhbmNlLlxyXG5cdCAqL1xyXG5cdHNldEluc3RhbmNlKGtleSwgaW5zdGFuY2UpIFxyXG5cdHtcclxuXHRcdGlmKHR5cGVvZiBrZXkgIT0gJ3N0cmluZycgfHwgdHlwZW9mIGluc3RhbmNlICE9ICdvYmplY3QnKSB7XHJcblx0XHRcdHRocm93IG5ldyBJbnZhbGlkQXJndW1lbnRFeGNlcHRpb24kMTtcclxuXHRcdH1cclxuXHJcblx0XHRpbnN0YW5jZXNba2V5XSA9IGluc3RhbmNlO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogR2V0cyBhbiBpbnN0YW5jZS5cclxuXHQgKi9cclxuXHRnZXRJbnN0YW5jZShrZXkpIFxyXG5cdHtcclxuXHRcdGlmKHR5cGVvZiBrZXkgIT0gJ3N0cmluZycpIHtcclxuXHRcdFx0dGhyb3cgbmV3IEludmFsaWRBcmd1bWVudEV4Y2VwdGlvbiQxO1xyXG5cdFx0fVxyXG5cclxuXHRcdGlmKHR5cGVvZiBrZXkgPT0gJ29iamVjdCcpIHtcclxuXHRcdFx0cmV0dXJuIGluc3RhbmNlc1trZXkuY29uc3RydWN0b3IubmFtZV0gfHwgbnVsbDtcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gaW5zdGFuY2VzW2tleV0gfHwgbnVsbDtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIENoZWNrcyBpZiBhbiBpbnN0YW5jZSBleGlzdC5cclxuXHQgKi9cclxuXHRpbnN0YW5jZUV4aXN0KGluc3RhbmNlKSBcclxuXHR7XHJcblx0XHRpZih0eXBlb2YgaW5zdGFuY2UgPT0gJ29iamVjdCcpIHtcclxuXHRcdFx0cmV0dXJuICh0eXBlb2YgaW5zdGFuY2VzW2luc3RhbmNlLmNvbnN0cnVjdG9yLm5hbWVdICE9PSAndW5kZWZpbmVkJyk7XHJcblx0XHR9XHJcblx0XHRcclxuXHRcdFxyXG5cdFx0cmV0dXJuIChpbnN0YW5jZSBpbiBpbnN0YW5jZXMpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQ3JlYXRlcyBhbiBpbnN0YW5jZS5cclxuXHQgKi9cclxuXHRtYWtlKG9iamVjdClcclxuXHR7XHJcblx0XHRsZXQgaW5zdGFuY2UgPSB7fTtcclxuXHJcblx0XHRpZiAodGhpcy5pbnN0YW5jZUV4aXN0KG9iamVjdCkpIHtcclxuXHRcdFx0cmV0dXJuIHRoaXMuZ2V0SW5zdGFuY2Uob2JqZWN0KTtcclxuXHRcdH1cclxuXHJcblx0XHRpZiAodHlwZW9mIG9iamVjdCA9PSAnb2JqZWN0Jykge1xyXG5cdFx0XHRpbnN0YW5jZSA9IG9iamVjdDtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdGluc3RhbmNlID0gbmV3IHRoaXNbb2JqZWN0XTtcdFxyXG5cdFx0fVxyXG5cclxuXHRcdHRoaXMuc2V0SW5zdGFuY2Uob2JqZWN0LCBpbnN0YW5jZSk7IFxyXG5cclxuXHRcdHJldHVybiBpbnN0YW5jZTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFJldHJpZXZlIGFsbCBpbnN0YW5jZXMuXHJcblx0ICovXHJcblx0aW5zdGFuY2VzKCkgXHJcblx0e1xyXG5cdFx0cmV0dXJuIGluc3RhbmNlcztcclxuXHR9XHJcbn1cblxuY2xhc3MgQ29tcG9uZW50c0V4Y2VwdGlvblxyXG57XHJcblx0Y29uc3RydWN0b3IoKSBcclxuXHR7IFxyXG4gICAgXHRjb25zb2xlLmVycm9yKGAke3RoaXMuY29uc3RydWN0b3IubmFtZX0sIGV4cGVjdGluZyBmb3IgYXQgbGVhc3Qgb25lIGNvbXBvbmVudHMsIGJ1dCBub25lIHdhcyBnaXZlbiwgXHJcblx0XHRcdFx0XHRcdFx0XHRwbGVhc2UgYWRkIGF0IGxlYXN0IG9uZSByZXF1aXJlbWVudChQcm9kdWN0cywgU2VydmljZXMgb3IvYW5kIEZpbHRlcmApO1xyXG5cclxuICAgIFx0dGhyb3cgbmV3IEVycm9yO1xyXG4gICAgfVxyXG59XG5cbmNsYXNzIEJhZEV2ZW50Q2FsbEV4Y2VwdGlvbiQxXHJcbntcclxuXHRjb25zdHJ1Y3RvcigpIFxyXG5cdHsgXHJcbiAgICBcdGNvbnNvbGUuZXJyb3IoYCR7dGhpcy5jb25zdHJ1Y3Rvci5uYW1lfSwgbGlzdGVuaW5nIHRvIGEgbm9uZS1leGlzdGluZyBldmVudGApO1xyXG5cclxuICAgIFx0dGhyb3cgbmV3IEVycm9yO1xyXG4gICAgfVxyXG59XG5cbmNsYXNzIENvbXBvbmVudE5vdFJlZ2lzdGVyZWRFeGNlcHRpb25cclxue1xyXG5cdGNvbnN0cnVjdG9yKCkgXHJcblx0eyBcclxuICAgIFx0Y29uc29sZS5lcnJvcihgJHt0aGlzLmNvbnN0cnVjdG9yLm5hbWV9LCBjb21wb25lbnRzIG11c3QgYmUgcmVnaXN0ZXJlZCBpbiBvcmRlciB0byB1c2UgdGhlbWApO1xyXG5cclxuICAgIFx0dGhyb3cgbmV3IEVycm9yO1xyXG4gICAgfVxyXG59XG5cbmNsYXNzIE5vZGVFbGVtZW50RG9lc05vdEV4aXN0RXhjZXB0aW9uJDFcclxue1xyXG5cdGNvbnN0cnVjdG9yKCkgXHJcblx0eyBcclxuICAgIFx0Y29uc29sZS5lcnJvcihgJHt0aGlzLmNvbnN0cnVjdG9yLm5hbWV9LCB0cnlpbmcgdG8gZmV0Y2ggYW4gbm9uZS1leGlzdGluZyBlbGVtZW50IGZyb20gdGhlIERPTWApO1xyXG5cclxuICAgIFx0dGhyb3cgbmV3IEVycm9yO1xyXG4gICAgfVxyXG59XG5cbmNsYXNzIEV4Y2VwdGlvbkhhbmRsZXJcclxue1xyXG5cdC8qKlxyXG5cdCAqIEhhbmRsZSBhbGwgdGhlIGVycm9yc1xyXG5cdCAqL1xyXG5cdHN0YXRpYyBpbml0YWxpemUoKSB7XHRcclxuXHRcdHdpbmRvdy5vbmVycm9yID0gZnVuY3Rpb24obWVzc2FnZSwgc291cmNlLCBsaW5lbm8sIGNvbG5vLCBlcnJvcikge1xyXG5cclxuXHRcdFx0aWYgKGVycm9yIGluc3RhbmNlb2YgSW52YWxpZEFyZ3VtZW50RXhjZXB0aW9uJDEpIHtcclxuXHRcdFx0XHQvLyBoYW5kbGVcclxuXHRcdFx0fSBlbHNlIGlmIChlcnJvciBpbnN0YW5jZW9mIEludmFsaWRCaW5kaW5nRXhjZXB0aW9uKSB7XHJcblx0XHRcdFx0Ly8gaGFuZGxlXHJcblx0XHRcdH0gZWxzZSBpZiAoZXJyb3IgaW5zdGFuY2VvZiBCYWRFdmVudENhbGxFeGNlcHRpb24kMSkge1xyXG5cdFx0XHRcdC8vIGhhbmRsZVxyXG5cdFx0XHR9IGVsc2UgaWYgKGVycm9yIGluc3RhbmNlb2YgQ29tcG9uZW50c0V4Y2VwdGlvbikge1xyXG5cdFx0XHRcdC8vIGhhbmRsZVxyXG5cdFx0XHR9IGVsc2UgaWYgKGVycm9yIGluc3RhbmNlb2YgQ29tcG9uZW50Tm90UmVnaXN0ZXJlZEV4Y2VwdGlvbikge1xyXG5cdFx0XHRcdC8vIGhhbmRsZVxyXG5cdFx0XHR9IGVsc2UgaWYgKGVycm9yIGluc3RhbmNlb2YgTm9kZUVsZW1lbnREb2VzTm90RXhpc3RFeGNlcHRpb24kMSkge1xyXG5cdFx0XHRcdFxyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0cmV0dXJuIHRydWU7XHJcblx0XHR9O1xyXG5cdH1cclxufVxuXG4vKipcclxuICogVGhlIGRlZmF1bHQgc2V0dGluZ3Mgb2YgdGhlIGZpbHRlci5cclxuICovXHJcbmxldCBkZWZhdWx0U2V0dGluZ3MkMSA9IHtcclxuXHRlbGVtZW50OiAnLmZpbHRlcicsXHJcblx0ZGF0YToge30sXHJcblx0Y2xhc3M6ICdjb2wteHMtMicsXHJcblx0d2lkdGg6ICcnLFxyXG5cdGhlaWdodDogJycsXHJcbn07XHJcblxyXG5cclxuLyoqXHJcbiAqIFRoZSBGaWx0ZXIgT2JqZWN0LCBoYW5kbGVzIHRoZSBmaWx0ZXIgb2YgdGhlIHByb2R1Y3RzL3NlcnZpY2VzLlxyXG4gKi9cclxuY2xhc3MgRmlsdGVyIFxyXG57XHJcblx0Y29uc3RydWN0b3IoY29udGFpbmVyKSBcclxuXHR7XHJcblx0XHR0aGlzLnNldHVwKGRlZmF1bHRTZXR0aW5ncyQxKTtcclxuXHR9XHJcblxyXG5cdHNldHVwKHNldHRpbmdzKVxyXG5cdHtcclxuXHRcdGlmKHR5cGVvZiBzZXR0aW5ncyAhPSAnb2JqZWN0Jykge1xyXG5cdFx0XHR0aHJvdyBuZXcgSW52YWxpZEFyZ3VtZW50RXhjZXB0aW9uJDE7XHJcblx0XHR9XHJcblxyXG5cdFx0dGhpcy5zZXR0aW5ncyA9IENvbW1vbi5leHRlbmQoZGVmYXVsdFNldHRpbmdzJDEsIHNldHRpbmdzKTtcclxuXHJcblx0XHR0aGlzLnNldEVsZW1lbnQodGhpcy5zZXR0aW5ncy5lbGVtZW50KTtcclxuXHR9XHJcblxyXG5cdHNldEVsZW1lbnQoc2VsZWN0b3IpXHJcblx0e1xyXG5cdFx0dGhpcy53cmFwcGVyID0gRE9NLmVsZW1lbnQoc2VsZWN0b3IpO1xyXG5cdFx0XHJcblx0XHRET00uYWRkQ2xhc3ModGhpcy53cmFwcGVyLCB0aGlzLnNldHRpbmdzLmNsYXNzKTtcclxuXHR9XHJcbn1cblxuLyoqXHJcbiAqIFRoZSBkZWZhdWx0IHNldHRpbmdzIG9mIGVhY2ggcHJvZHVjdC5cclxuICovXHJcbmxldCBkZWZhdWx0U2V0dGluZ3MkMiA9IHtcclxuXHRlbGVtZW50OiAnLnByb2R1Y3RzJyxcclxuXHRjbGFzczogJycsXHJcblx0aXRlbV9jbGFzczogJycsXHJcblx0d2lkdGg6ICcyMDBweCcsXHJcblx0aGVpZ2h0OiAnMjUwcHgnLFxyXG5cdGF0dHJpYnV0ZXM6IFsnbmFtZScsICdwcmljZScsICdkZWxpdmVyeVRpbWUnLCAnaW1hZ2UnXSxcclxuXHR1cmw6ICdwcm9kdWN0cy5waHAnLFxyXG5cdGluaXRfc3RhdGljX2RhdGE6IHt9LFxyXG59O1xyXG5cclxuLyoqXHJcbiAqIFN0b3JlcyB0aGUgY29udGFpbmVyIG9iamVjdC5cclxuICovXHJcbmxldCBDb250YWluZXIkMjtcclxuXHJcbi8qKlxyXG4gKiBUaGUgUHJvZHVjdHMgT2JqZWN0LCBoYW5kbGVzIHRoZSBwcm9kdWN0cy5cclxuICovXHJcbmNsYXNzIFByb2R1Y3RzIFxyXG57XHJcblx0LyoqXHJcblx0ICogSW5pdGFsaXplIHRoZSBDb250YWluZXIgYW5kIHRoZSBwYWdpbmF0b3IuXHJcblx0ICovXHJcblx0Y29uc3RydWN0b3IoY29udGFpbmVyLCBwYWdpbmF0b3IpIFxyXG5cdHtcclxuXHRcdHRoaXMuc2V0dXAoZGVmYXVsdFNldHRpbmdzJDIpO1xyXG5cclxuXHRcdENvbnRhaW5lciQyID0gY29udGFpbmVyO1xyXG5cdFx0dGhpcy5wYWdpbmF0b3IgPSBwYWdpbmF0b3I7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBTZXRzIHRoZSBnaXZlbiBzZXR0aW5ncyBmcm9tIHRoZSB1c2VyLlxyXG5cdCAqL1xyXG5cdHNldHVwKHNldHRpbmdzKVxyXG5cdHtcclxuXHRcdGlmICh0eXBlb2Ygc2V0dGluZ3MgIT0gJ29iamVjdCcpIHtcclxuXHRcdFx0dGhyb3cgbmV3IEludmFsaWRBcmd1bWVudEV4Y2VwdGlvbiQxO1xyXG5cdFx0fVxyXG5cclxuXHRcdHRoaXMuc2V0dGluZ3MgPSBDb21tb24uZXh0ZW5kKGRlZmF1bHRTZXR0aW5ncyQyLCBzZXR0aW5ncyk7XHJcblxyXG5cdFx0dGhpcy5zZXRFbGVtZW50KHRoaXMuc2V0dGluZ3MuZWxlbWVudCk7XHJcblxyXG5cdFx0dGhpcy5hZGRTdHlsZVRhZygpO1x0XHJcblx0XHJcblx0XHRpZiAodHlwZW9mIENvbnRhaW5lciQyID09ICd1bmRlZmluZWQnKSB7XHJcblx0XHRcdHJldHVybjtcclxuXHRcdH1cclxuXHJcblx0XHRpZiAoQ29udGFpbmVyJDIuaW5zdGFuY2VFeGlzdCgnUGFnaW5hdGlvbicpKSB7XHJcblx0XHRcdHRoaXMucGFnaW5hdG9yLnJlc2V0KHRoaXMuc2V0dGluZ3MuaW5pdF9zdGF0aWNfZGF0YSk7XHJcblx0XHRcdGxldCByZXF1ZXN0ID0gdGhpcy5nZXRQcm9kdWN0c0J5UGFnZSh0aGlzLnBhZ2luYXRvci5nZXRDdXJyZW50KCkpO1xyXG5cdFx0XHRcclxuXHRcdFx0cmVxdWVzdC50aGVuKGZ1bmN0aW9uKGl0ZW1zKSB7XHJcblx0XHRcdFx0dGhpcy5yZXBsYWNlSXRlbXMoaXRlbXMpO1xyXG5cdFx0XHR9LmJpbmQodGhpcykpLmNhdGNoKGZ1bmN0aW9uKGVycm9yKSB7XHJcblxyXG5cdFx0XHR9KTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFNldHMgdGhlIERPTSBlbGVtZW50IGZvciBwb3B1bGF0aW5nIHRoZSBwcm9kdWN0cy5cclxuXHQgKi9cclxuXHRzZXRFbGVtZW50KHNlbGVjdG9yKVxyXG5cdHtcclxuXHRcdHRoaXMud3JhcHBlciA9IERPTS5lbGVtZW50KHNlbGVjdG9yKTtcclxuXHRcdFxyXG5cdFx0RE9NLmFkZENsYXNzKHRoaXMud3JhcHBlciwgdGhpcy5zZXR0aW5ncy5jbGFzcyk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBSZXBsYWNlIGl0ZW1zIGluIHRoZSBjb250YWluZXIuXHJcblx0ICovXHJcblx0cmVwbGFjZUl0ZW1zKGl0ZW1zKSBcclxuXHR7XHJcblx0XHRpZiAoISBBcnJheS5pc0FycmF5KGl0ZW1zKSB8fCB0eXBlb2YgaXRlbXNbMF0gPT0gJ3N0cmluZycpIHtcclxuXHRcdFx0dGhyb3cgbmV3IEludmFsaWRBcmd1bWVudEV4Y2VwdGlvbiQxO1xyXG5cdFx0fVxyXG5cclxuXHRcdGlmIChDb250YWluZXIkMi5pbnN0YW5jZUV4aXN0KCdQYWdpbmF0aW9uJykpIHtcclxuXHRcdFx0bGV0IHBlclBhZ2UgPSB0aGlzLnBhZ2luYXRvci5zZXR0aW5ncy5wZXJfcGFnZTtcclxuXHRcdFx0aXRlbXMgPSBpdGVtcy5zbGljZSgwLCBwZXJQYWdlKTtcclxuXHRcdH1cclxuXHJcblx0XHRsZXQgd3JhcHBlZEl0ZW1zID0gdGhpcy53cmFwQWxsV2l0aEhUTUwoaXRlbXMsIHRoaXMuc2V0dGluZ3MuaXRlbV9jbGFzcywgJ2RpdicpO1xyXG5cclxuXHRcdHRoaXMud3JhcHBlci5pbm5lckhUTUwgPSB3cmFwcGVkSXRlbXM7XHJcblxyXG5cdFx0cmV0dXJuIGl0ZW1zO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogTWFrZXMgYW4gQWpheCBjYWxsIHRvIHRoZSBzZXJ2ZXIuXHJcblx0ICovXHJcblx0Z2V0UHJvZHVjdHNCeVBhZ2UocGFnZU51bWJlcikgXHJcblx0e1xyXG5cdFx0cmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xyXG5cdFx0XHRpZiAodGhpcy5wYWdpbmF0b3Iubm90SW5QYWdlUmFuZ2UocGFnZU51bWJlcikpIHtcclxuXHRcdFx0XHRyZXR1cm4gcmVqZWN0KCdOb3QgaW4gcGFnaW5hdGlvbiByYW5nZScpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRsZXQgeGhyID0gbmV3IFhNTEh0dHBSZXF1ZXN0IHx8IG5ldyBBY3RpdmVYT2JqZWN0KFwiTWljcm9zb2Z0LlhNTEhUVFBcIik7XHJcblxyXG5cdFx0XHR4aHIub3BlbignR0VUJywgdGhpcy5zZXR0aW5ncy51cmwgKyAnP3BhZ2U9JyArIHBhZ2VOdW1iZXIsIHRydWUpOyBcclxuXHRcdFx0eGhyLnNldFJlcXVlc3RIZWFkZXIoJ0NvbnRlbnQtVHlwZScsICdhcHBsaWNhdGlvbi9qc29uJyk7XHJcblx0XHRcdFxyXG5cdFx0XHRsZXQgaW5zdGFuY2UgPSB0aGlzO1xyXG5cclxuXHRcdFx0eGhyLm9ucmVhZHlzdGF0ZWNoYW5nZSA9IGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRcdGlmICh0aGlzLnJlYWR5U3RhdGUgPT0gNCkge1xyXG5cdFx0XHRcdFx0aWYgKHRoaXMuc3RhdHVzID09IDIwMCkge1xyXG5cdFx0XHRcdFx0XHRpbnN0YW5jZS5jdXJyZW50SXRlbXMgPSAodGhpcy5yZXNwb25zZVRleHQgPT0gJycpID8gW10gOiBKU09OLnBhcnNlKHRoaXMucmVzcG9uc2VUZXh0KTtcclxuXHRcdFx0XHRcdFxyXG5cdFx0XHRcdFx0XHRpZihpbnN0YW5jZS5jdXJyZW50SXRlbXMubGVuZ3RoID09PSAwKSB7XHJcblx0XHRcdFx0XHRcdFx0cmVqZWN0KCdObyBJdGVtcyB3ZXJlIHJldHJpZXZlZCEnKTtcclxuXHRcdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBpbnN0YW5jZS5jdXJyZW50SXRlbXMubGVuZ3RoOyBpKyspIHtcclxuXHRcdFx0XHRcdFx0XHR2YXIgcHJvZHVjdCA9IGluc3RhbmNlLmN1cnJlbnRJdGVtc1tpXTtcclxuXHRcdFx0XHRcdFx0XHRpbnN0YW5jZS5BZnRlckxvYWRlZC5jYWxsKHRoaXMsIHByb2R1Y3QpO1xyXG5cdFx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0XHRyZXNvbHZlKGluc3RhbmNlLmN1cnJlbnRJdGVtcyk7XHJcblx0XHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0XHRyZWplY3QodGhpcy5zdGF0dXNUZXh0KTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9XHJcblx0XHRcdH07XHJcblxyXG5cdFx0XHR4aHIub25lcnJvciA9IGZ1bmN0aW9uKGVycm9yKSB7XHJcblx0XHRcdFx0cmVqZWN0KGVycm9yKTtcclxuXHRcdFx0fTtcclxuXHJcblx0XHRcdHhoci5zZW5kKG51bGwpO1xyXG5cdFx0fS5iaW5kKHRoaXMpKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFdyYXAgYWxsIHRoZSBpdGVtcyB3aXRoIHNwZWNpZmMgdGFnIGFuZCBjbGFzc25hbWUuXHJcblx0ICovXHJcblx0d3JhcEFsbFdpdGhIVE1MKGl0ZW1zLCBjbGFzc05hbWUsIHRhZ1R5cGUpIFxyXG5cdHtcclxuXHRcdGNsYXNzTmFtZSA9IGNsYXNzTmFtZSB8fCBudWxsO1xyXG5cdFx0Y2xhc3NOYW1lID0gKGNsYXNzTmFtZSkgPyAncHJvZHVjdCAnICsgY2xhc3NOYW1lIDogJ3Byb2R1Y3QnO1xyXG5cdFx0XHJcblx0XHR2YXIgd3JhcHBlZEl0ZW1zID0gJyc7XHJcblxyXG5cdFx0aXRlbXMgPSBpdGVtcy5tYXAoZnVuY3Rpb24ocHJvZHVjdCwgaW5kZXgpIHtcclxuXHRcdFx0dmFyIGl0ZW0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KHRhZ1R5cGUpO1xyXG5cdFx0XHRpdGVtID0gRE9NLmFkZENsYXNzKGl0ZW0sIGNsYXNzTmFtZSk7XHJcblxyXG5cdFx0XHR2YXIgb3ZlcmxheSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG5cdFx0XHRvdmVybGF5LmNsYXNzTmFtZSA9ICdwcm9kdWN0LW92ZXJsYXknO1xyXG5cdFx0XHRpdGVtLmFwcGVuZENoaWxkKG92ZXJsYXkpO1xyXG5cclxuXHRcdFx0Zm9yKHZhciBwcm9wIGluIHByb2R1Y3QpIHtcclxuXHRcdFx0XHRpZih0aGlzLnNldHRpbmdzLmF0dHJpYnV0ZXMuaW5kZXhPZihwcm9wKSA9PSAtMSkge1xyXG5cdFx0XHRcdFx0Y29udGludWU7XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHR2YXIgdGFnID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCh0YWdUeXBlKTtcclxuXHJcblx0XHRcdFx0aWYocHJvcCA9PSAnaW1hZ2UnKSB7XHJcblx0XHRcdFx0XHR2YXIgaW1hZ2UgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKTtcclxuXHRcdFx0XHRcdGltYWdlLnNldEF0dHJpYnV0ZSgnc3JjJywgcHJvZHVjdFtwcm9wXSk7XHJcblx0XHRcdFx0XHRpdGVtLmFwcGVuZENoaWxkKGltYWdlKTtcclxuXHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0dGFnLmlubmVySFRNTCA9IHByb2R1Y3RbcHJvcF0gfHwgJyc7XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHR0YWcuY2xhc3NOYW1lID0gJ3Byb2R1Y3QtJyArIENvbW1vbi5rZWJhYkNhc2UocHJvcCk7XHJcblx0XHRcdFx0b3ZlcmxheS5hcHBlbmRDaGlsZCh0YWcpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHR2YXIgdGVtcCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQodGFnVHlwZSk7XHJcblx0XHRcdHRlbXAuYXBwZW5kQ2hpbGQoaXRlbSk7XHJcblx0XHRcdFxyXG5cdFx0XHR3cmFwcGVkSXRlbXMgKz0gdGVtcC5pbm5lckhUTUwgKyBcIlxcblwiO1xyXG5cclxuXHRcdFx0cmV0dXJuIHByb2R1Y3Q7XHJcblx0XHR9LmJpbmQodGhpcykpO1xyXG5cclxuXHRcdHJldHVybiB3cmFwcGVkSXRlbXM7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBBbiBldmVudCBmb3IgdGhlIGNsaWVudCBvZiB3aGVuIHRoZSBwcm9kdWN0cyBhcyBiZWVuIGxvYWRlZC5cclxuXHQgKi9cclxuXHRBZnRlckxvYWRlZChwcm9kdWN0KSBcclxuXHR7XHJcblx0XHQvL1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQWRkIHRoZSBlQ29tbWVyY2Ugc3R5bGUgdGFncyB0byB0aGUgRE9NLlxyXG5cdCAqL1xyXG5cdGFkZFN0eWxlVGFnKCkgXHJcblx0e1xyXG5cdFx0bGV0IGNzcyA9IGBcclxuXHRcdFx0LnByb2R1Y3Qge1xyXG5cdFx0XHRcdHBvc2l0aW9uOiByZWxhdGl2ZTtcclxuXHRcdFx0XHRtYXJnaW46IDVweCA1cHg7XHJcblx0XHRcdFx0Ym9yZGVyOiAxcHggc29saWQgI2U0ZTRlNDtcclxuXHRcdFx0XHR3aWR0aDogJHt0aGlzLnNldHRpbmdzLndpZHRofTtcclxuXHRcdFx0XHRoZWlnaHQ6ICR7dGhpcy5zZXR0aW5ncy5oZWlnaHR9O1xyXG5cdFx0XHRcdGN1cnNvcjogcG9pbnRlcjtcclxuXHRcdFx0XHRjb2xvcjogI2ZmZmZmZjtcclxuXHRcdFx0XHRvdmVyZmxvdzogaGlkZGVuO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHQucHJvZHVjdCA+IC5wcm9kdWN0LW92ZXJsYXkge1xyXG5cdFx0XHRcdHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuXHRcdFx0XHR0b3A6IDA7XHJcblx0XHRcdFx0bGVmdDogMDtcclxuXHRcdFx0XHR3aWR0aDogMTAwJTtcclxuXHRcdFx0XHRoZWlnaHQ6IDEwMCU7XHJcblx0XHRcdFx0b3BhY2l0eTogMC41O1xyXG5cdFx0XHRcdHotaW5kZXg6IDU7XHJcblx0XHRcdFx0dHJhbnNpdGlvbjogMXMgYWxsO1xyXG5cdFx0XHRcdHRyYW5zZm9ybTogdHJhbnNsYXRlWCgtMjUwcHgpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHQucHJvZHVjdDpob3ZlciA+IC5wcm9kdWN0LW92ZXJsYXkge1xyXG5cdFx0XHRcdGJhY2tncm91bmQ6IHJnYmEoMCwgMCwgMCwgMC40NSk7XHJcblx0XHRcdFx0dHJhbnNmb3JtOiB0cmFuc2xhdGVYKDBweCk7XHJcblx0XHRcdFx0b3BhY2l0eTogMTtcclxuXHRcdFx0XHR0cmFuc2l0aW9uOiAxcyBhbGw7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdC5wcm9kdWN0ID4gaW1nIHtcclxuXHRcdFx0XHRwb3NpdGlvbjogYWJzb2x1dGU7XHJcblx0XHRcdFx0bGVmdDogMDtcclxuXHRcdFx0XHR0b3A6IDA7XHJcblx0XHRcdFx0d2lkdGg6IDEwMCU7XHJcblx0XHRcdFx0aGVpZ2h0OiAxMDAlO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHQucHJvZHVjdCA+IC5wcm9kdWN0LWltYWdlIHtcclxuXHRcdFx0XHR6LWluZGV4OiAwO1xyXG5cdFx0XHRcdHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuXHRcdFx0XHR0b3A6IDA7XHJcblx0XHRcdFx0bGVmdDogMDtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0LnByb2R1Y3QgPiAucHJvZHVjdC1vdmVybGF5ID4gLnByb2R1Y3QtbmFtZSwgXHJcblx0XHRcdC5wcm9kdWN0ID4gLnByb2R1Y3Qtb3ZlcmxheSA+IC5wcm9kdWN0LXByaWNlLFxyXG5cdFx0XHQucHJvZHVjdCA+IC5wcm9kdWN0LW92ZXJsYXkgPiAucHJvZHVjdC1kZWxpdmVyeS10aW1lIHtcclxuXHRcdFx0XHR6LWluZGV4OiAxO1xyXG5cdFx0XHRcdHBvc2l0aW9uOiByZWxhdGl2ZTtcclxuXHRcdFx0XHR0ZXh0LWFsaWduOiBjZW50ZXI7XHJcblx0XHRcdFx0bWFyZ2luLXRvcDogMjVweDtcclxuXHRcdFx0fVxyXG5cdFx0YDtcclxuXHQgICAgXHJcblx0ICAgIHJldHVybiBET00uYWRkU3R5bGUoJ2VDb21tZXJjZS1Qcm9kdWN0cycsIGNzcyk7XHJcblx0fVxyXG59XG5cbi8qKlxyXG4gKiBUaGUgU2VydmljZXMgT2JqZWN0LCBoYW5kbGVzIHRoZSBzZXJ2aWNlcy5cclxuICovXHJcbmNsYXNzIFNlcnZpY2VzIFxyXG57XHJcblxyXG59XG5cbi8qKlxyXG4gKiBUaGUgZGVmYXVsdCBzZXR0aW5ncyBvZiB0aGUgcGFnaW5hdGlvbi5cclxuICovXHJcbmxldCBkZWZhdWx0U2V0dGluZ3MkMyA9IHtcclxuXHRlbGVtZW50OiAnLnBhZ2luYXRpb24tbGlua3MnLFxyXG5cdGNsYXNzOiAnY29sLXhzLW9mZnNldC00IGNvbC14cy04JyxcclxuXHRwZXJfcGFnZTogNSxcclxuXHR0b3RhbF9pdGVtczogMTAsXHJcbn07XHJcblxyXG4vKipcclxuICogU3RvcmVzIHRoZSBjb250YWluZXIgb2JqZWN0LlxyXG4gKi9cclxubGV0IENvbnRhaW5lciQzO1xyXG5cclxuLyoqXHJcbiAqIFRoZSBQYWdpbmF0aW9uIE9iamVjdCwgaGFuZGxlcyB0aGUgcGFnaW5hdGlvbi5cclxuICovXHJcbmNsYXNzIFBhZ2luYXRpb24gXHJcbntcclxuXHQvKipcclxuXHQgKiBJbml0aWFsaXplIHRoZSBjb250YWluZXIgb2JqZWN0IGFuZCB0aGUgZGVmYXVsdCBzZXR0aW5ncy5cclxuXHQgKi9cclxuXHRjb25zdHJ1Y3Rvcihjb250YWluZXIpIFxyXG5cdHtcclxuXHRcdENvbnRhaW5lciQzID0gY29udGFpbmVyO1xyXG5cdFx0dGhpcy5zZXR1cChkZWZhdWx0U2V0dGluZ3MkMyk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBTZXQgdGhlIFBhZ2luYXRpb24gb2JqZWN0IHVwLlxyXG5cdCAqL1xyXG5cdHNldHVwKHNldHRpbmdzKVxyXG5cdHtcclxuXHRcdGlmKHR5cGVvZiBzZXR0aW5ncyAhPSAnb2JqZWN0Jykge1xyXG5cdFx0XHR0aHJvdyBuZXcgSW52YWxpZEFyZ3VtZW50RXhjZXB0aW9uJDE7XHJcblx0XHR9XHJcblxyXG5cdFx0dGhpcy5zZXR0aW5ncyA9IENvbW1vbi5leHRlbmQoZGVmYXVsdFNldHRpbmdzJDMsIHNldHRpbmdzKTtcclxuXHJcblx0XHR0aGlzLnRvdGFsUGFnZXMgPSB0aGlzLmNhbGN1bGF0ZVRvdGFsUGFnZXModGhpcy5zZXR0aW5ncy5wZXJfcGFnZSwgdGhpcy5zZXR0aW5ncy50b3RhbF9pdGVtcyk7XHJcblx0XHR0aGlzLnNldEVsZW1lbnQodGhpcy5zZXR0aW5ncy5lbGVtZW50KTtcclxuXHRcdHRoaXMucmVwbGFjZUxpbmtzKHRoaXMubGlua3MpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogU2V0cyB0aGUgd3JhcHBlciBlbGVtZW50LlxyXG5cdCAqL1xyXG5cdHNldEVsZW1lbnQoc2VsZWN0b3IpXHJcblx0e1xyXG5cdFx0dGhpcy53cmFwcGVyID0gRE9NLmVsZW1lbnQoc2VsZWN0b3IpO1xyXG5cdFx0XHJcblx0XHRET00uYWRkQ2xhc3ModGhpcy53cmFwcGVyLCB0aGlzLnNldHRpbmdzLmNsYXNzKTtcclxuXHJcblx0XHR0aGlzLmxpbmtzID0gdGhpcy5jcmVhdGVMaW5rcygpO1xyXG5cdFx0dGhpcy5iaW5kRXZlbnRMaXN0ZW5lcnModGhpcy5saW5rcyk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBSZXBsYWNlcyB0aGUgbGlua3MgaW4gdGhlIHdyYXBwZXIuXHJcblx0ICovXHJcblx0cmVwbGFjZUxpbmtzKGxpbmtzKVxyXG5cdHtcclxuXHRcdHRoaXMud3JhcHBlci5pbm5lckhUTUwgPSAnJztcclxuXHRcdHRoaXMud3JhcHBlci5hcHBlbmRDaGlsZChsaW5rcyk7XHJcblx0fVxyXG5cclxuXHRjYWxjdWxhdGVUb3RhbFBhZ2VzKHBlclBhZ2UsIHRvdGFsSXRlbXMpXHJcblx0e1xyXG5cdFx0cGVyUGFnZSA9IHBhcnNlSW50KHBlclBhZ2UpO1xyXG5cdFx0dG90YWxJdGVtcyA9IHBhcnNlSW50KHRvdGFsSXRlbXMpO1xyXG5cclxuXHRcdHJldHVybiBNYXRoLmNlaWwodG90YWxJdGVtcyAvIHBlclBhZ2UpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQmluZHMgdGhlIGJ1dHRvbnMgZXZlbnRzIGxpc3RlbmVycy5cclxuXHQgKi9cclxuXHRiaW5kRXZlbnRMaXN0ZW5lcnMobGlua3MpIFxyXG5cdHtcclxuXHRcdGxldCBpbnN0YW5jZSA9IHRoaXM7XHJcblx0XHRsZXQgUHJvZHVjdHMgPSBDb250YWluZXIkMy5nZXRJbnN0YW5jZSgnUHJvZHVjdHMnKTtcclxuXHJcblx0XHR0aGlzLm5leHQuY2hpbGROb2Rlc1swXS5vbmNsaWNrID0gZnVuY3Rpb24oZXZlbnQpIHtcclxuXHRcdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuXHJcblx0XHRcdFByb2R1Y3RzLmdldFByb2R1Y3RzQnlQYWdlKGluc3RhbmNlLmN1cnJlbnQrMSkudGhlbihmdW5jdGlvbihwcm9kdWN0cykge1xyXG5cdFx0XHRcdFByb2R1Y3RzLnJlcGxhY2VJdGVtcyhwcm9kdWN0cyk7XHJcblx0XHRcdH0pO1xyXG5cclxuXHRcdFx0aW5zdGFuY2Uuc2V0Q3VycmVudChpbnN0YW5jZS5jdXJyZW50KzEpO1xyXG5cdFx0fTtcclxuXHJcblx0XHR0aGlzLnByZXZpb3VzLmNoaWxkTm9kZXNbMF0ub25jbGljayA9IGZ1bmN0aW9uKGV2ZW50KSB7XHJcblx0XHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcblx0XHRcdFxyXG5cdFx0XHRQcm9kdWN0cy5nZXRQcm9kdWN0c0J5UGFnZShpbnN0YW5jZS5jdXJyZW50LTEpLnRoZW4oZnVuY3Rpb24ocHJvZHVjdHMpIHtcclxuXHRcdFx0XHRQcm9kdWN0cy5yZXBsYWNlSXRlbXMocHJvZHVjdHMpO1xyXG5cdFx0XHR9KTtcclxuXHJcblx0XHRcdGluc3RhbmNlLnNldEN1cnJlbnQoaW5zdGFuY2UuY3VycmVudC0xKTtcclxuXHRcdH07XHJcblxyXG5cdFx0Zm9yKHZhciBpID0gMDsgaSA8IHRoaXMucGFnZXMubGVuZ3RoOyBpKyspIHtcclxuXHRcdFx0dGhpcy5wYWdlc1tpXS5jaGlsZE5vZGVzWzBdLm9uY2xpY2sgPSBmdW5jdGlvbihldmVudCkge1xyXG5cdFx0XHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcblx0XHRcdFx0dmFyIHBhZ2VOdW1iZXIgPSB0aGlzLmdldEF0dHJpYnV0ZSgnZGF0YS1wYWdlLW5yJyk7XHJcblx0XHRcdFx0XHJcblx0XHRcdFx0UHJvZHVjdHMuZ2V0UHJvZHVjdHNCeVBhZ2UocGFnZU51bWJlcikudGhlbihmdW5jdGlvbihwcm9kdWN0cykge1xyXG5cdFx0XHRcdFx0UHJvZHVjdHMucmVwbGFjZUl0ZW1zKHByb2R1Y3RzKTtcclxuXHRcdFx0XHR9KTtcclxuXHRcdFx0XHRcclxuXHRcdFx0XHRpbnN0YW5jZS5zZXRDdXJyZW50KHBhZ2VOdW1iZXIpO1xyXG5cdFx0XHR9O1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogU2V0cyB0aGUgY3VycmVudCBwYWdlLlxyXG5cdCAqL1xyXG5cdHNldEN1cnJlbnQocGFnZU51bWJlcikgXHJcblx0e1xyXG5cdFx0aWYodGhpcy5ub3RJblBhZ2VSYW5nZShwYWdlTnVtYmVyKSkge1xyXG5cdFx0XHRyZXR1cm47XHJcblx0XHR9XHJcblxyXG5cdFx0dGhpcy5jdXJyZW50ID0gcGFyc2VJbnQocGFnZU51bWJlcik7XHJcblx0XHR0aGlzLmNoYW5nZVVybChwYWdlTnVtYmVyKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEdldHMgdGhlIGN1cnJlbnQgcGFnZS5cclxuXHQgKi9cclxuXHRnZXRDdXJyZW50KCkgXHJcblx0e1xyXG5cdFx0cmV0dXJuIHRoaXMuY3VycmVudDtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIENyZWF0ZXMgdGhlIHBhZ2luYXRpb24gbGlua3MuXHJcblx0ICovXHJcblx0Y3JlYXRlTGlua3MoKSBcclxuXHR7XHRcclxuXHRcdGxldCB1bCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3VsJyk7XHJcblx0XHRcclxuXHRcdHRoaXMucGFnZXMgPSB0aGlzLmNyZWF0ZVBhZ2VMaW5rcygpO1xyXG5cdFx0dGhpcy5wcmV2aW91cyA9IHRoaXMuY3JlYXRlUHJldmlvdXNCdXR0b24oKTtcclxuXHRcdHRoaXMubmV4dCA9IHRoaXMuY3JlYXRlTmV4dEJ1dHRvbigpO1xyXG5cclxuXHRcdHVsLmNsYXNzTmFtZSA9ICdwYWdpbmF0aW9uJztcclxuXHRcdHVsLmFwcGVuZENoaWxkKHRoaXMucHJldmlvdXMpO1xyXG5cclxuXHRcdHRoaXMucGFnZXMuZm9yRWFjaChmdW5jdGlvbihwYWdlKSB7XHJcblx0XHRcdHVsLmFwcGVuZENoaWxkKHBhZ2UpO1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0dWwuYXBwZW5kQ2hpbGQodGhpcy5uZXh0KTtcclxuXHJcblx0XHRyZXR1cm4gdWw7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBDcmVhdGVzIHRoZSBwYWdlcyBpdGVtIGxpbmtzLlxyXG5cdCAqL1xyXG5cdGNyZWF0ZVBhZ2VMaW5rcygpIFxyXG5cdHtcclxuXHRcdHZhciBwYWdlcyA9IFtdO1xyXG5cclxuXHRcdGZvcih2YXIgaSA9IDE7IGkgPD0gdGhpcy50b3RhbFBhZ2VzOyBpKyspIHtcclxuXHRcdFx0dmFyIHBhZ2VJdGVtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKTtcclxuXHRcdFx0dmFyIGxpbmsgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJyk7XHJcblx0XHRcdHBhZ2VJdGVtLmNsYXNzTmFtZSA9ICdwYWdlLWl0ZW0nO1xyXG5cdFx0XHRsaW5rLmNsYXNzTmFtZSA9ICdwYWdlLWxpbmsnO1xyXG5cdFx0XHRsaW5rLnNldEF0dHJpYnV0ZSgnaHJlZicsICc/cGFnZT0nKyBpKTtcclxuXHRcdFx0bGluay5zZXRBdHRyaWJ1dGUoJ2RhdGEtcGFnZS1ucicsIGkpO1xyXG5cdFx0XHRsaW5rLmlubmVySFRNTCA9IGk7XHJcblx0XHRcdHBhZ2VJdGVtLmFwcGVuZENoaWxkKGxpbmspO1xyXG5cdFx0XHRwYWdlcy5wdXNoKHBhZ2VJdGVtKTtcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gcGFnZXM7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBDcmVhdGVzIHRoZSBwcmV2aW91cyBidXR0b24gbGluay5cclxuXHQgKi9cclxuXHRjcmVhdGVQcmV2aW91c0J1dHRvbigpIFxyXG5cdHtcclxuXHRcdHZhciBsaSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJyk7XHJcblx0XHR2YXIgbGluayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKTtcclxuXHRcdHZhciBzcGFuMSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcclxuXHRcdHZhciBzcGFuMiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcclxuXHRcdFxyXG5cdFx0XHJcblx0XHRsaS5jbGFzc05hbWUgPSAncGFnZS1pdGVtJztcclxuXHRcdGxpbmsuY2xhc3NOYW1lID0gJ3BhZ2UtbGluayc7XHJcblx0XHRzcGFuMi5jbGFzc05hbWUgPSAnc3Itb25seSc7XHJcblxyXG5cdFx0bGluay5zZXRBdHRyaWJ1dGUoJ2hyZWYnLCAnJyk7XHJcblx0XHRsaW5rLnNldEF0dHJpYnV0ZSgnYXJpYS1sYWJlbCcsICdQcmV2aW91cycpO1xyXG5cdFx0c3BhbjEuc2V0QXR0cmlidXRlKCdhcmlhLWhpZGRlbicsICd0cnVlJyk7XHJcblxyXG5cdFx0c3BhbjEuaW5uZXJIVE1MID0gJyZsYXF1bzsnO1xyXG5cdFx0c3BhbjIuaW5uZXJIVE1MID0gJ1ByZXZpb3VzJztcclxuXHJcblx0XHRsaW5rLmFwcGVuZENoaWxkKHNwYW4xKTtcclxuXHRcdGxpbmsuYXBwZW5kQ2hpbGQoc3BhbjIpO1xyXG5cdFx0bGkuYXBwZW5kQ2hpbGQobGluayk7XHJcblxyXG5cdFx0cmV0dXJuIGxpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQ3JlYXRlcyB0aGUgbmV4dCBidXR0b24gbGluay5cclxuXHQgKi9cclxuXHRjcmVhdGVOZXh0QnV0dG9uKCkgXHJcblx0e1xyXG5cdFx0dmFyIGxpID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKTtcclxuXHRcdHZhciBsaW5rID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpO1xyXG5cdFx0dmFyIHNwYW4xID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xyXG5cdFx0dmFyIHNwYW4yID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xyXG5cdFx0XHJcblx0XHRsaS5jbGFzc05hbWUgPSAncGFnZS1pdGVtJztcclxuXHRcdGxpbmsuY2xhc3NOYW1lID0gJ3BhZ2UtbGluayc7XHJcblx0XHRzcGFuMi5jbGFzc05hbWUgPSAnc3Itb25seSc7XHJcblxyXG5cdFx0bGluay5zZXRBdHRyaWJ1dGUoJ2hyZWYnLCAnJyk7XHJcblx0XHRsaW5rLnNldEF0dHJpYnV0ZSgnYXJpYS1sYWJlbCcsICdOZXh0Jyk7XHJcblx0XHRzcGFuMS5zZXRBdHRyaWJ1dGUoJ2FyaWEtaGlkZGVuJywgJ3RydWUnKTtcclxuXHJcblx0XHRzcGFuMS5pbm5lckhUTUwgPSAnJnJhcXVvOyc7XHJcblx0XHRzcGFuMi5pbm5lckhUTUwgPSAnTmV4dCc7XHJcblxyXG5cdFx0bGluay5hcHBlbmRDaGlsZChzcGFuMSk7XHJcblx0XHRsaW5rLmFwcGVuZENoaWxkKHNwYW4yKTtcclxuXHRcdGxpLmFwcGVuZENoaWxkKGxpbmspO1xyXG5cclxuXHRcdHJldHVybiBsaTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIENoZWNrcyBpZiB0aGUgZ2l2ZW4gcGFnZSBpcyBpbiByYW5nZS5cclxuXHQgKi9cclxuXHRub3RJblBhZ2VSYW5nZShwYWdlTnVtYmVyKSBcclxuXHR7XHJcblx0XHRyZXR1cm4gKHBhZ2VOdW1iZXIgPiB0aGlzLnRvdGFsUGFnZXMgfHwgcGFnZU51bWJlciA8PSAwKSB8fCBpc05hTihwYWdlTnVtYmVyKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIENoYW5nZXMgdGhlIHVybCB0byBhIGdpdmVuIHBhZ2UgbnVtYmVyLlxyXG5cdCAqL1xyXG5cdGNoYW5nZVVybChwYWdlTnVtYmVyKSBcclxuXHR7XHJcblx0XHRwYWdlTnVtYmVyID0gIHBhZ2VOdW1iZXIgfHwgR0VUX1ZhcnMoKVsncGFnZSddO1xyXG5cdFx0d2luZG93Lmhpc3RvcnkucmVwbGFjZVN0YXRlKCcnLCAnJywgdGhpcy51cGRhdGVVUkxQYXJhbWV0ZXIod2luZG93LmxvY2F0aW9uLmhyZWYsICdwYWdlJywgcGFnZU51bWJlcikpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogR2V0IHRoZSBnZXQgdmFyaWFibGVzIGZyb20gdGhlIHVybC5cclxuXHQgKi9cclxuXHRHRVRfVmFycygpIFxyXG5cdHtcclxuXHRcdHZhciB2YXJzID0ge307XHJcblx0XHR2YXIgcGFydHMgPSB3aW5kb3cubG9jYXRpb24uaHJlZi5yZXBsYWNlKC9bPyZdKyhbXj0mXSspPShbXiZdKikvZ2ksIGZ1bmN0aW9uKG0sIGtleSwgdmFsdWUpIHtcclxuXHRcdFx0dmFyc1trZXldID0gdmFsdWU7XHJcblx0XHR9KTtcclxuXHJcblx0XHRyZXR1cm4gdmFycztcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIE1vZGlmaWVzIHRoZSBnZXQgcGFyYW1ldGVyIGluIHRoZSB1cmwuXHJcblx0ICovXHJcblx0dXBkYXRlVVJMUGFyYW1ldGVyKHVybCwgcGFyYW0sIHBhcmFtVmFsKSBcclxuXHR7XHJcblx0ICAgIHZhciBuZXdBZGRpdGlvbmFsVVJMID0gXCJcIjtcclxuXHQgICAgdmFyIHRlbXBBcnJheSA9IHVybC5zcGxpdChcIj9cIik7XHJcblx0ICAgIHZhciBiYXNlVVJMID0gdGVtcEFycmF5WzBdO1xyXG5cdCAgICB2YXIgYWRkaXRpb25hbFVSTCA9IHRlbXBBcnJheVsxXTtcclxuXHQgICAgdmFyIHRlbXAgPSBcIlwiO1xyXG5cclxuXHQgICAgaWYgKGFkZGl0aW9uYWxVUkwpIHtcclxuXHQgICAgICAgIHRlbXBBcnJheSA9IGFkZGl0aW9uYWxVUkwuc3BsaXQoXCImXCIpO1xyXG5cdCAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0ZW1wQXJyYXkubGVuZ3RoOyBpKyspe1xyXG5cdCAgICAgICAgICAgIGlmICh0ZW1wQXJyYXlbaV0uc3BsaXQoJz0nKVswXSAhPSBwYXJhbSl7XHJcblx0ICAgICAgICAgICAgICAgIG5ld0FkZGl0aW9uYWxVUkwgKz0gdGVtcCArIHRlbXBBcnJheVtpXTtcclxuXHQgICAgICAgICAgICAgICAgdGVtcCA9IFwiJlwiO1xyXG5cdCAgICAgICAgICAgIH1cclxuXHQgICAgICAgIH1cclxuXHQgICAgfVxyXG5cclxuXHQgICAgdmFyIHJvd3NUZXh0ID0gdGVtcCArIFwiXCIgKyBwYXJhbSArIFwiPVwiICsgcGFyYW1WYWw7XHJcblx0ICAgIHJldHVybiBiYXNlVVJMICsgXCI/XCIgKyBuZXdBZGRpdGlvbmFsVVJMICsgcm93c1RleHQ7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBSZXNldHMgdGhlIHBhZ2luYXRpb24uXHJcblx0ICovXHJcblx0cmVzZXQoKSBcclxuXHR7XHJcblx0XHR0aGlzLnNldEN1cnJlbnQoMSk7XHJcblx0XHR0aGlzLmNoYW5nZVVybCgxKTtcclxuXHR9XHJcbn1cblxubGV0IGluaXRhbGl6ZWQgPSBmYWxzZTtcblxubGV0IGRlZmF1bHRTZXR0aW5ncyA9IHtcblx0Y2FydFNlc3Npb25JZDogW10sXG5cdGltcG9ydEJvb3RzdHJhcDogZmFsc2UsXG5cdGNvbXBvbmVudHM6IFsnUHJvZHVjdHMnLCAnU2VydmljZXMnLCAnRmlsdGVyJywgJ1BhZ2luYXRpb24nXVxufTtcblxuY2xhc3MgZUNvbW1lcmNlXG57XG5cdGNvbnN0cnVjdG9yKHNldHRpbmdzKVxuXHR7XG5cdFx0RXhjZXB0aW9uSGFuZGxlci5pbml0YWxpemUoKTtcblxuXHRcdGlmKHR5cGVvZiBzZXR0aW5ncyAhPSAnb2JqZWN0Jykge1xuXHRcdFx0dGhyb3cgbmV3IEludmFsaWRBcmd1bWVudEV4Y2VwdGlvbiQxO1xuXHRcdH1cblxuXHRcdHRoaXMuY29udGFpbmVyID0gbmV3IENvbnRhaW5lcjtcblx0XHR0aGlzLnNldHRpbmdzID0gQ29tbW9uLmV4dGVuZChkZWZhdWx0U2V0dGluZ3MsIHNldHRpbmdzKTtcblx0XHRcblx0XHRiaW5kQ29tcG9uZW50c0RlcGVuZGVuY2llcy5jYWxsKHRoaXMsIHNldHRpbmdzLmNvbXBvbmVudHMpO1xuXG5cdFx0aW5pdGFsaXplZCA9IHRydWU7XG5cblx0XHRyZXR1cm4gbmV3IFByb3h5KHRoaXMsIHtcblx0XHRcdGdldDogZnVuY3Rpb24odGFyZ2V0LCBvYmplY3QpIHtcblx0XHRcdFx0cmV0dXJuIHRhcmdldC5jb250YWluZXIubWFrZShvYmplY3QpO1xuXHRcdFx0fVxuXHRcdH0pO1xuXHR9XG59XG5cbi8qKlxuICogQmluZHMgY29tcG9uZW50cyBkZXBlbmRlbmNpZXMuXG4gKi9cbmZ1bmN0aW9uIGJpbmRDb21wb25lbnRzRGVwZW5kZW5jaWVzKGNvbXBvbmVudHMpIHtcblx0bGV0IGNvbnRhaW5lciA9IHRoaXMuY29udGFpbmVyO1xuXG5cdGNvbnRhaW5lci5iaW5kKCdGaWx0ZXInLCBmdW5jdGlvbigpIHtcblx0XHRyZXR1cm4gbmV3IEZpbHRlcihjb250YWluZXIpO1xuXHR9KTtcblx0XG5cdGNvbnRhaW5lci5iaW5kKCdTZXJ2aWNlcycsIGZ1bmN0aW9uKCkgeyBcblx0XHRyZXR1cm4gbmV3IFNlcnZpY2VzKGNvbnRhaW5lcik7XG5cdH0pO1xuXG5cdGNvbnRhaW5lci5iaW5kKCdQYWdpbmF0aW9uJywgZnVuY3Rpb24oKSB7XG5cdFx0cmV0dXJuIG5ldyBQYWdpbmF0aW9uKGNvbnRhaW5lcik7XG5cdH0pO1xuXG5cdGNvbnRhaW5lci5iaW5kKCdQcm9kdWN0cycsIGZ1bmN0aW9uKCkge1xuXHRcdHJldHVybiBuZXcgUHJvZHVjdHMoY29udGFpbmVyLCBjb250YWluZXIubWFrZSgnUGFnaW5hdGlvbicpKTtcblx0fSk7XG59XG5cbnJldHVybiBlQ29tbWVyY2U7XG5cbn0oKSk7XG4iXX0=
