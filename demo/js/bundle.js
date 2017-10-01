'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var eCommerce = function () {
	'use strict';

	var InvalidArgumentException$1 = function InvalidArgumentException$1() {
		_classCallCheck(this, InvalidArgumentException$1);

		console.error(this.constructor.name + ', passing invalid arguments.');

		throw new Error();
	};

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
    * Switches between two given classes.
    */

		}, {
			key: 'switchClasses',
			value: function switchClasses(element, className, newClassName) {
				this.removeClass(element, className);
				this.addClass(element, newClassName);
			}

			/**
    * Adds class to a given element.
    */

		}, {
			key: 'addClass',
			value: function addClass(element, className) {
				if (element === null) {
					throw new InvalidArgumentException$1();
				}

				if (!className || className == '' || (typeof className === 'undefined' ? 'undefined' : _typeof(className)) === undefined) {
					return element;
				}

				var classNames = className.split(' ');

				classNames.forEach(function (name) {
					element.classList.add(name);
				});

				return element;
			}

			/**
    * Removes class from a given element.
    */

		}, {
			key: 'removeClass',
			value: function removeClass(element, className) {
				if (element == null) {
					throw new InvalidArgumentException$1();
				}

				if (className == '') {
					element.className = '';
				} else {

					var classNames = className.split(' ');

					classNames.forEach(function (name) {
						element.classList.remove(name);
					});
				}

				return element;
			}

			/**
    * Queries the element from the DOM.
    */

		}, {
			key: 'element',
			value: function element(selector) {
				var element = queryElement(selector);
				return element;
			}

			/**
    * Adds style tag with given id and css to the DOM.
    */

		}, {
			key: 'addStyle',
			value: function addStyle(id, css) {
				if (typeof css != 'string') {
					throw new InvalidArgumentException$1();
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

			/**
    * Creates an element with the given options.
    */

		}, {
			key: 'createElement',
			value: function createElement(elementType, options) {
				var element = document.createElement(elementType);

				if (options === undefined) {
					return element;
				}

				for (var option in options) {
					if (option == 'text') {
						element.innerHTML = options[option];
						continue;
					}

					element.setAttribute(option, options[option]);
				}

				return element;
			}
		}, {
			key: 'toggleClass',
			value: function toggleClass(element, className, secondClassName) {
				if (element == null || typeof element == 'undefined') {
					throw new InvalidArgumentException$1();
				}

				secondClassName = secondClassName || undefined;

				element.classList.toggle(className);

				if (secondClassName) {
					element.classList.toggle(secondClassName);
				}
			}
		}]);

		return DOM;
	}();

	/**
  * Queries an element from the DOM.
  */


	function queryElement(selector) {
		var element = document.querySelectorAll(selector) || null;

		if (element.length == 0) {
			return null;
		}

		return element.length > 1 ? element : element[0];
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

				this[key] = concrete.bind(concrete, this);
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
					} else {
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
		url: 'products.php'
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
					this.paginator.reset();
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

				if (this.wrapper) {
					DOM.addClass(this.wrapper, this.settings.class);
				}
			}

			/**
    * Replace items in the container.
    */

		}, {
			key: 'replaceItems',
			value: function replaceItems(items) {
				if (!Array.isArray(items) || items.length <= 0 && typeof items[0] == 'string') {
					throw new InvalidArgumentException$1();
				}

				if (Container$2.instanceExist('Pagination')) {
					var perPage = this.paginator.settings.per_page;
					items = items.slice(0, perPage);
				}

				var products = this.buildProducts(items, this.settings.item_class, 'div');

				this.wrapper.innerHTML = products;

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
    * Builds the html for the products.
    */

		}, {
			key: 'buildProducts',
			value: function buildProducts(attributesCollection, className, tagType) {
				if (attributesCollection.constructor.name != 'Array') {
					throw new InvalidArgumentException$1();
				}

				var builtProducts = '';

				attributesCollection.forEach(function (attributes) {
					builtProducts += this.buildProduct(attributes, className, tagType);
				}.bind(this));

				return builtProducts;
			}

			/**
    * Builds the html for a single product.
    */

		}, {
			key: 'buildProduct',
			value: function buildProduct(attributes, className, tagType) {
				if ((typeof attributes === 'undefined' ? 'undefined' : _typeof(attributes)) != 'object' || typeof tagType != 'string') {
					throw new InvalidArgumentException$1();
				}

				className = className || null;

				var product = DOM.createElement('div', {
					class: 'product'
				});

				DOM.addClass(product, className);

				var overlay = DOM.createElement('div', {
					class: 'product-overlay'
				});

				product.appendChild(overlay);

				for (var attribute in attributes) {
					if (!Common.in_array(attribute, this.settings.attributes)) {
						continue;
					}

					var _tag = DOM.createElement(tagType);

					if (attribute == 'image') {
						var image = DOM.createElement('img', {
							src: attributes[attribute]
						});
						product.appendChild(image);
					} else {
						_tag.innerHTML = attributes[attribute] || '';
					}

					DOM.addClass(_tag, 'product-' + Common.kebabCase(attribute));
					overlay.appendChild(_tag);
				}

				var tag = DOM.createElement('div', {
					id: 'actionButtons',
					class: 'action-buttons'
				});

				var addToCart = DOM.createElement('button', {
					id: 'addToCart',
					class: 'btn btn-primary',
					type: 'button',
					text: '+'
				});

				var favorite = DOM.createElement('button', {
					id: 'favorite',
					class: 'btn btn-danger',
					type: 'button',
					text: '&hearts;'
				});

				tag.appendChild(addToCart);
				tag.appendChild(favorite);

				overlay.appendChild(tag);

				return product.outerHTML;
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
				if (DOM.element('#eCommerce-Products')) {
					return;
				}

				var css = '\n\t\t\t.product {\n\t\t\t\tposition: relative;\n\t\t\t\tmargin: 5px 5px;\n\t\t\t\tborder: 1px solid #e4e4e4;\n\t\t\t\twidth: ' + this.settings.width + ';\n\t\t\t\theight: ' + this.settings.height + ';\n\t\t\t\tcursor: pointer;\n\t\t\t\tcolor: #ffffff;\n\t\t\t\toverflow: hidden;\n\t\t\t}\n\n\t\t\t.product > .product-overlay {\n\t\t\t\tposition: absolute;\n\t\t\t\ttop: 0;\n\t\t\t\tleft: 0;\n\t\t\t\twidth: 100%;\n\t\t\t\theight: 100%;\n\t\t\t\topacity: 0.5;\n\t\t\t\tz-index: 5;\n\t\t\t\ttransition: 1s all;\n\t\t\t\ttransform: translateX(-250px);\n\t\t\t}\n\n\t\t\t.product:hover > .product-overlay {\n\t\t\t\tbackground: rgba(0, 0, 0, 0.45);\n\t\t\t\ttransform: translateX(0px);\n\t\t\t\topacity: 1;\n\t\t\t\ttransition: 1s all;\n\t\t\t}\n\n\t\t\t.product > img {\n\t\t\t\tposition: absolute;\n\t\t\t\tleft: 0;\n\t\t\t\ttop: 0;\n\t\t\t\twidth: 100%;\n\t\t\t\theight: 100%;\n\t\t\t}\n\n\t\t\t.product > .product-image {\n\t\t\t\tz-index: 0;\n\t\t\t\tposition: absolute;\n\t\t\t\ttop: 0;\n\t\t\t\tleft: 0;\n\t\t\t}\n\n\t\t\t.product > .product-overlay > .product-name, \n\t\t\t.product > .product-overlay > .product-price,\n\t\t\t.product > .product-overlay > .product-delivery-time {\n\t\t\t\tz-index: 1;\n\t\t\t\tposition: relative;\n\t\t\t\ttext-align: center;\n\t\t\t\tmargin-top: 25px;\n\t\t\t}\n\n\t\t\t.product > .product-overlay > .action-buttons {\n\t\t\t\twidth: 100%;\n\t\t\t\tmargin-top: 10px;\n\t\t\t\ttext-align: center;\n\t\t\t}\n\n\t\t\t.product > .product-overlay > .action-buttons > #favorite {\n\t\t\t\tmargin-left: 10px;\n\t\t\t}\n\n\t\t';

				DOM.addStyle('eCommerce-Products', css);
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

	/**
  * The default settings of the cart.
  */


	var defaultSettings$4 = {
		element: '.cart',
		preview_class: '',
		class: '',
		width: '60px',
		height: '60px',
		placement: 'right-top',
		fixed: true,
		hover_color: 'orange'
	};

	/**
  * Stores the container object.
  */
	var Container$4 = void 0;

	/**
  * The Cart Object, handles the cart icon and sessions.
  */

	var Cart = function () {
		/**
   * Initialize the default settings, setting the element,
   * and creating the preview for the carts details.
   */
		function Cart(container) {
			_classCallCheck(this, Cart);

			Container$4 = container;

			this.previewElement = this.createPreviewElement();
			this.svgIcon = createIcon.call(this);
		}

		/**
   * Sets the object by the users setting.
   */


		_createClass(Cart, [{
			key: 'setup',
			value: function setup(settings) {
				if ((typeof settings === 'undefined' ? 'undefined' : _typeof(settings)) != 'object') {
					throw new InvalidArgumentException$1();
				}

				this.settings = Common.extend(defaultSettings$4, settings);

				this.setElement(this.settings.element);
				DOM.addClass(this.previewElement, 'closed');
				DOM.addClass(this.previewElement, this.settings.preview_class);
				this.bindEventListeners();

				this.addStyleTag();
			}

			/**
    * Binds everthing to the element.
    */

		}, {
			key: 'setElement',
			value: function setElement(selector) {
				this.icon = DOM.element(selector);

				if (this.icon) {
					DOM.addClass(this.icon, this.settings.class);
					DOM.addClass(this.icon, this.settings.placement);
					this.icon.appendChild(this.svgIcon);
					this.icon.appendChild(this.previewElement);
				}
			}

			/**
    * Creates the cart details preview element.
    */

		}, {
			key: 'createPreviewElement',
			value: function createPreviewElement() {
				var previewElement = DOM.createElement('div', {
					id: 'preview'
				});

				return previewElement;
			}

			/**
    * Add the eCommerce style tags to the DOM.
    */

		}, {
			key: 'addStyleTag',
			value: function addStyleTag() {
				if (DOM.element('#eCommerce-Cart')) {
					return;
				}

				var position = this.settings.fixed ? 'fixed' : 'absolute';

				var css = '\n\t\t\t' + this.settings.element + ' {\n\t\t\t\tposition: ' + position + ';\n\t\t\t\tcursor: pointer;\n\t\t\t\tcolor: #ffffff;\n\t\t\t\tz-index: 998;\n\t\t\t}\n\n\t\t\t' + this.settings.element + ' > svg {\n\t\t\t\twidth: ' + this.settings.width + ';\n\t\t\t\theight: ' + this.settings.height + ';\n\t\t\t\ttransition: fill 0.3s;\n\t\t\t}\n\n\t\t\t' + this.settings.element + ' > svg:hover {\n\t\t\t\tfill: ' + this.settings.hover_color + ';\n\t\t\t\ttransition: fill 0.3s;\n\t\t\t}\n\n\t\t\t' + this.settings.element + '.top-right,\n\t\t\t' + this.settings.element + '.right-top {\n\t\t\t\tright: 10px;\n\t\t\t\ttop: 10px;\n\t\t\t}\n\n\t\t\t' + this.settings.element + '.left-top,\n\t\t\t' + this.settings.element + '.top-left {\n\t\t\t\tleft: 10px;\n\t\t\t\ttop: 10px;\n\t\t\t}\n\n\t\t\t' + this.settings.element + ' > #preview {\n\t\t\t\tposition: ' + position + ';\n\t\t\t\tz-index: 9999;\n\t\t\t\ttop: calc(10px + ' + this.settings.height + ');\n\t\t\t\ttransform: translateX(60px);\n\t\t\t\theight: 400px;\n\t\t\t\twidth: 300px;\n\t\t\t\tborder: 1px solid #e4e4e4;\n\t\t\t\tbackground: #ffffff;\n\t\t\t\ttransition: transform 1s, visibility 1s;\n\t\t\t}\n\n\t\t\t' + this.settings.element + ' > #preview.opened {\n\t\t\t\tvisibility: visible;\n\t\t\t\ttransform: translateX(-240px);\n\t\t\t}\n\n\t\t\t' + this.settings.element + ' > #preview.closed {\n\t\t\t\tvisibility: hidden;\n\t\t\t\ttransform: translateX(60px);\n\t\t\t}\n\t\t';

				DOM.addStyle('eCommerce-Cart', css);
			}

			/**
    * Binds event listeners to the cart icon.
    */

		}, {
			key: 'bindEventListeners',
			value: function bindEventListeners() {
				if (this.svgIcon == null) {
					return;
				}

				this.svgIcon.onclick = function (event) {
					event.preventDefault();
					DOM.toggleClass(this.previewElement, 'opened', 'closed');
				}.bind(this);

				this.previewElement.onmouseout = function (event) {
					close.call(this, event);
				}.bind(this);
			}
		}]);

		return Cart;
	}();

	function close(event) {
		event.preventDefault();
		DOM.switchClasses(this.previewElement, 'opened', 'closed');
	}

	function createIcon() {
		var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
		var g = document.createElementNS("http://www.w3.org/2000/svg", "g");
		var path = document.createElementNS("http://www.w3.org/2000/svg", "path");

		svg.setAttribute('version', '1.1');
		svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
		svg.setAttribute('xmlns:xlink', 'http://www.w3.org/1999/xlink');
		svg.setAttribute('x', '0px');
		svg.setAttribute('y', '0px');
		svg.setAttribute('width', '446.843px');
		svg.setAttribute('height', '446.843px');
		svg.setAttribute('viewBox', '0 0 446.843 446.843');
		svg.setAttribute('style', 'enable-background:new 0 0 446.843 446.843;');
		svg.setAttribute('xml:space', 'preserve');

		path.setAttribute('d', 'M444.09,93.103c-2.698-3.699-7.006-5.888-11.584-5.888H109.92c-0.625,0-1.249,0.038-1.85,0.119l-13.276-38.27c-1.376-3.958-4.406-7.113-8.3-8.646L19.586,14.134c-7.374-2.887-15.695,0.735-18.591,8.1c-2.891,7.369,0.73,15.695,8.1,18.591l60.768,23.872l74.381,214.399c-3.283,1.144-6.065,3.663-7.332,7.187l-21.506,59.739c-1.318,3.663-0.775,7.733,1.468,10.916c2.24,3.183,5.883,5.078,9.773,5.078h11.044c-6.844,7.616-11.044,17.646-11.044,28.675c0,23.718,19.298,43.012,43.012,43.012s43.012-19.294,43.012-43.012c0-11.029-4.2-21.059-11.044-28.675h93.776c-6.847,7.616-11.048,17.646-11.048,28.675c0,23.718,19.294,43.012,43.013,43.012c23.718,0,43.012-19.294,43.012-43.012c0-11.029-4.2-21.059-11.043-28.675h13.433c6.599,0,11.947-5.349,11.947-11.948c0-6.599-5.349-11.947-11.947-11.947H143.647l13.319-36.996c1.72,0.724,3.578,1.152,5.523,1.152h210.278c6.234,0,11.751-4.027,13.65-9.959l59.739-186.387C447.557,101.567,446.788,96.802,444.09,93.103z M169.659,409.807c-10.543,0-19.116-8.573-19.116-19.116s8.573-19.117,19.116-19.117s19.116,8.574,19.116,19.117S180.202,409.807,169.659,409.807z M327.367,409.807c-10.543,0-19.117-8.573-19.117-19.116s8.574-19.117,19.117-19.117c10.542,0,19.116,8.574,19.116,19.117S337.909,409.807,327.367,409.807z M402.52,148.149h-73.161V115.89h83.499L402.52,148.149z M381.453,213.861h-52.094v-37.038h63.967L381.453,213.861z M234.571,213.861v-37.038h66.113v37.038H234.571z M300.684,242.538v31.064h-66.113v-31.064H300.684z M139.115,176.823h66.784v37.038h-53.933L139.115,176.823z M234.571,148.149V115.89h66.113v32.259H234.571z M205.898,115.89v32.259h-76.734l-11.191-32.259H205.898z M161.916,242.538h43.982v31.064h-33.206L161.916,242.538z M329.359,273.603v-31.064h42.909l-9.955,31.064H329.359z');

		g.appendChild(path);
		svg.appendChild(g);

		return svg;
	}

	var initalized = false;

	var defaultSettings = {
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
		this.container.bind('Filter', function (container) {
			return new Filter(container);
		});

		this.container.bind('Services', function (container) {
			return new Services(container);
		});

		this.container.bind('Pagination', function (container) {
			return new Pagination(container);
		});

		this.container.bind('Products', function (container) {
			return new Products(container, container.make('Pagination'));
		});

		this.container.bind('Cart', function (container) {
			return new Cart(container);
		});
	}

	return eCommerce;
}();
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVDb21tZXJjZS5qcyJdLCJuYW1lcyI6WyJlQ29tbWVyY2UiLCJJbnZhbGlkQXJndW1lbnRFeGNlcHRpb24kMSIsImNvbnNvbGUiLCJlcnJvciIsImNvbnN0cnVjdG9yIiwibmFtZSIsIkVycm9yIiwiRE9NIiwic3RyaW5nIiwicmVwbGFjZSIsImVsZW1lbnQiLCJjbGFzc05hbWUiLCJuZXdDbGFzc05hbWUiLCJyZW1vdmVDbGFzcyIsImFkZENsYXNzIiwidW5kZWZpbmVkIiwiY2xhc3NOYW1lcyIsInNwbGl0IiwiZm9yRWFjaCIsImNsYXNzTGlzdCIsImFkZCIsInJlbW92ZSIsInNlbGVjdG9yIiwicXVlcnlFbGVtZW50IiwiaWQiLCJjc3MiLCJoZWFkIiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50c0J5VGFnTmFtZSIsInN0eWxlVGFnIiwiY3JlYXRlRWxlbWVudCIsIkNTUyIsIm1pbmlmeUNzcyIsImlubmVySFRNTCIsInNldEF0dHJpYnV0ZSIsImFwcGVuZENoaWxkIiwiZWxlbWVudFR5cGUiLCJvcHRpb25zIiwib3B0aW9uIiwic2Vjb25kQ2xhc3NOYW1lIiwidG9nZ2xlIiwicXVlcnlTZWxlY3RvckFsbCIsImxlbmd0aCIsIkV2ZW50IiwiY2FsbGJhY2siLCJJbnZhbGlkQXJndW1lbnRFeGNlcHRpb24iLCJldmVudHMiLCJkYXRhIiwiQmFkRXZlbnRDYWxsRXhjZXB0aW9uIiwiQXJyYXkiLCJDb21tb24iLCJjdXJyZW50T2JqIiwibmV3T2JqIiwiZXh0ZW5kZWQiLCJwcm9wIiwiT2JqZWN0IiwicHJvdG90eXBlIiwiaGFzT3duUHJvcGVydHkiLCJjYWxsIiwibmVlZGxlIiwiaHlzdGFjayIsImkiLCJvYmplY3QiLCJ0b0xvd2VyQ2FzZSIsIkludmFsaWRCaW5kaW5nRXhjZXB0aW9uIiwiaW5zdGFuY2VzIiwiQ29udGFpbmVyIiwia2V5IiwiY29uY3JldGUiLCJiaW5kIiwiaW5zdGFuY2UiLCJpbnN0YW5jZUV4aXN0IiwiZ2V0SW5zdGFuY2UiLCJzZXRJbnN0YW5jZSIsIkNvbXBvbmVudHNFeGNlcHRpb24iLCJCYWRFdmVudENhbGxFeGNlcHRpb24kMSIsIkNvbXBvbmVudE5vdFJlZ2lzdGVyZWRFeGNlcHRpb24iLCJFeGNlcHRpb25IYW5kbGVyIiwid2luZG93Iiwib25lcnJvciIsIm1lc3NhZ2UiLCJzb3VyY2UiLCJsaW5lbm8iLCJjb2xubyIsImRlZmF1bHRTZXR0aW5ncyQxIiwiY2xhc3MiLCJ3aWR0aCIsImhlaWdodCIsIkZpbHRlciIsImNvbnRhaW5lciIsInNldHVwIiwic2V0dGluZ3MiLCJleHRlbmQiLCJzZXRFbGVtZW50Iiwid3JhcHBlciIsImRlZmF1bHRTZXR0aW5ncyQyIiwiaXRlbV9jbGFzcyIsImF0dHJpYnV0ZXMiLCJ1cmwiLCJDb250YWluZXIkMiIsIlByb2R1Y3RzIiwicGFnaW5hdG9yIiwiYWRkU3R5bGVUYWciLCJyZXNldCIsInJlcXVlc3QiLCJnZXRQcm9kdWN0c0J5UGFnZSIsImdldEN1cnJlbnQiLCJ0aGVuIiwiaXRlbXMiLCJyZXBsYWNlSXRlbXMiLCJjYXRjaCIsImlzQXJyYXkiLCJwZXJQYWdlIiwicGVyX3BhZ2UiLCJzbGljZSIsInByb2R1Y3RzIiwiYnVpbGRQcm9kdWN0cyIsInBhZ2VOdW1iZXIiLCJQcm9taXNlIiwicmVzb2x2ZSIsInJlamVjdCIsIm5vdEluUGFnZVJhbmdlIiwieGhyIiwiWE1MSHR0cFJlcXVlc3QiLCJBY3RpdmVYT2JqZWN0Iiwib3BlbiIsInNldFJlcXVlc3RIZWFkZXIiLCJvbnJlYWR5c3RhdGVjaGFuZ2UiLCJyZWFkeVN0YXRlIiwic3RhdHVzIiwiY3VycmVudEl0ZW1zIiwicmVzcG9uc2VUZXh0IiwiSlNPTiIsInBhcnNlIiwicHJvZHVjdCIsIkFmdGVyTG9hZGVkIiwic3RhdHVzVGV4dCIsInNlbmQiLCJhdHRyaWJ1dGVzQ29sbGVjdGlvbiIsInRhZ1R5cGUiLCJidWlsdFByb2R1Y3RzIiwiYnVpbGRQcm9kdWN0Iiwib3ZlcmxheSIsImF0dHJpYnV0ZSIsImluX2FycmF5IiwidGFnIiwiaW1hZ2UiLCJzcmMiLCJrZWJhYkNhc2UiLCJhZGRUb0NhcnQiLCJ0eXBlIiwidGV4dCIsImZhdm9yaXRlIiwib3V0ZXJIVE1MIiwiYWRkU3R5bGUiLCJTZXJ2aWNlcyIsImRlZmF1bHRTZXR0aW5ncyQzIiwidG90YWxfaXRlbXMiLCJDb250YWluZXIkMyIsIlBhZ2luYXRpb24iLCJ0b3RhbFBhZ2VzIiwiY2FsY3VsYXRlVG90YWxQYWdlcyIsInJlcGxhY2VMaW5rcyIsImxpbmtzIiwiY3JlYXRlTGlua3MiLCJiaW5kRXZlbnRMaXN0ZW5lcnMiLCJ0b3RhbEl0ZW1zIiwicGFyc2VJbnQiLCJNYXRoIiwiY2VpbCIsIm5leHQiLCJjaGlsZE5vZGVzIiwib25jbGljayIsImV2ZW50IiwicHJldmVudERlZmF1bHQiLCJjdXJyZW50Iiwic2V0Q3VycmVudCIsInByZXZpb3VzIiwicGFnZXMiLCJnZXRBdHRyaWJ1dGUiLCJjaGFuZ2VVcmwiLCJ1bCIsImNyZWF0ZVBhZ2VMaW5rcyIsImNyZWF0ZVByZXZpb3VzQnV0dG9uIiwiY3JlYXRlTmV4dEJ1dHRvbiIsInBhZ2UiLCJwYWdlSXRlbSIsImxpbmsiLCJwdXNoIiwibGkiLCJzcGFuMSIsInNwYW4yIiwiaXNOYU4iLCJHRVRfVmFycyIsImhpc3RvcnkiLCJyZXBsYWNlU3RhdGUiLCJ1cGRhdGVVUkxQYXJhbWV0ZXIiLCJsb2NhdGlvbiIsImhyZWYiLCJ2YXJzIiwicGFydHMiLCJtIiwidmFsdWUiLCJwYXJhbSIsInBhcmFtVmFsIiwibmV3QWRkaXRpb25hbFVSTCIsInRlbXBBcnJheSIsImJhc2VVUkwiLCJhZGRpdGlvbmFsVVJMIiwidGVtcCIsInJvd3NUZXh0IiwiZGVmYXVsdFNldHRpbmdzJDQiLCJwcmV2aWV3X2NsYXNzIiwicGxhY2VtZW50IiwiZml4ZWQiLCJob3Zlcl9jb2xvciIsIkNvbnRhaW5lciQ0IiwiQ2FydCIsInByZXZpZXdFbGVtZW50IiwiY3JlYXRlUHJldmlld0VsZW1lbnQiLCJzdmdJY29uIiwiY3JlYXRlSWNvbiIsImljb24iLCJwb3NpdGlvbiIsInRvZ2dsZUNsYXNzIiwib25tb3VzZW91dCIsImNsb3NlIiwic3dpdGNoQ2xhc3NlcyIsInN2ZyIsImNyZWF0ZUVsZW1lbnROUyIsImciLCJwYXRoIiwiaW5pdGFsaXplZCIsImRlZmF1bHRTZXR0aW5ncyIsImltcG9ydEJvb3RzdHJhcCIsImNvbXBvbmVudHMiLCJpbml0YWxpemUiLCJiaW5kQ29tcG9uZW50c0RlcGVuZGVuY2llcyIsIlByb3h5IiwiZ2V0IiwidGFyZ2V0IiwibWFrZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLElBQUlBLFlBQWEsWUFBWTtBQUM3Qjs7QUFENkIsS0FHdkJDLDBCQUh1QixHQUs1QixzQ0FDQTtBQUFBOztBQUNJQyxVQUFRQyxLQUFSLENBQWlCLEtBQUtDLFdBQUwsQ0FBaUJDLElBQWxDOztBQUVBLFFBQU0sSUFBSUMsS0FBSixFQUFOO0FBQ0EsRUFWd0I7O0FBQUEsS0FhdkJDLEdBYnVCO0FBQUE7QUFBQTtBQUFBOztBQUFBO0FBQUE7O0FBZTVCOzs7QUFmNEIsNkJBa0JYQyxNQWxCVyxFQW1CNUI7QUFDSUEsYUFBU0EsT0FBT0MsT0FBUCxDQUFlLHdDQUFmLEVBQXlELEVBQXpELENBQVQ7QUFDQUQsYUFBU0EsT0FBT0MsT0FBUCxDQUFlLFFBQWYsRUFBeUIsR0FBekIsQ0FBVDtBQUNBRCxhQUFTQSxPQUFPQyxPQUFQLENBQWUsVUFBZixFQUEyQixJQUEzQixDQUFUO0FBQ0FELGFBQVNBLE9BQU9DLE9BQVAsQ0FBZSxVQUFmLEVBQTJCLElBQTNCLENBQVQ7QUFDQUQsYUFBU0EsT0FBT0MsT0FBUCxDQUFlLEtBQWYsRUFBc0IsR0FBdEIsQ0FBVDs7QUFFQSxXQUFPRCxNQUFQO0FBQ0g7O0FBRUQ7Ozs7QUE3QjRCO0FBQUE7QUFBQSxpQ0FnQ1BFLE9BaENPLEVBZ0NFQyxTQWhDRixFQWdDYUMsWUFoQ2IsRUFpQzVCO0FBQ0MsU0FBS0MsV0FBTCxDQUFpQkgsT0FBakIsRUFBMEJDLFNBQTFCO0FBQ0EsU0FBS0csUUFBTCxDQUFjSixPQUFkLEVBQXVC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QVQsRUFBaUJsTCxNQUFqQixFQUF5QjtBQUM3QixXQUFPa0wsT0FBT3ZKLFNBQVAsQ0FBaUJ3SixJQUFqQixDQUFzQm5MLE1BQXRCLENBQVA7QUFDQTtBQUhxQixHQUFoQixDQUFQO0FBS0EsRUE5ekMyQjs7QUFpMEM3Qjs7Ozs7QUFHQSxVQUFTK0ssMEJBQVQsQ0FBb0NGLFVBQXBDLEVBQWdEO0FBQy9DLE9BQUtsSixTQUFMLENBQWVwQixJQUFmLENBQW9CLFFBQXBCLEVBQThCLFVBQVNvQixTQUFULEVBQW9CO0FBQ2pELFVBQU8sSUFBSUQsTUFBSixDQUFXQyxTQUFYLENBQVA7QUFDQSxHQUZEOztBQUlBLE9BQUtBLFNBQUwsQ0FBZXBCLElBQWYsQ0FBb0IsVUFBcEIsRUFBZ0MsVUFBU29CLFNBQVQsRUFBb0I7QUFDbkQsVUFBTyxJQUFJa0UsUUFBSixDQUFhbEUsU0FBYixDQUFQO0FBQ0EsR0FGRDs7QUFJQSxPQUFLQSxTQUFMLENBQWVwQixJQUFmLENBQW9CLFlBQXBCLEVBQWtDLFVBQVNvQixTQUFULEVBQW9CO0FBQ3JELFVBQU8sSUFBSXNFLFVBQUosQ0FBZXRFLFNBQWYsQ0FBUDtBQUNBLEdBRkQ7O0FBSUEsT0FBS0EsU0FBTCxDQUFlcEIsSUFBZixDQUFvQixVQUFwQixFQUFnQyxVQUFTb0IsU0FBVCxFQUFvQjtBQUNuRCxVQUFPLElBQUlXLFFBQUosQ0FBYVgsU0FBYixFQUF3QkEsVUFBVXdKLElBQVYsQ0FBZSxZQUFmLENBQXhCLENBQVA7QUFDQSxHQUZEOztBQUlBLE9BQUt4SixTQUFMLENBQWVwQixJQUFmLENBQW9CLE1BQXBCLEVBQTRCLFVBQVNvQixTQUFULEVBQW9CO0FBQy9DLFVBQU8sSUFBSWdJLElBQUosQ0FBU2hJLFNBQVQsQ0FBUDtBQUNBLEdBRkQ7QUFHQTs7QUFFRCxRQUFPekYsU0FBUDtBQUVDLENBNTFDZ0IsRUFBakIiLCJmaWxlIjoiZUNvbW1lcmNlLmpzIiwic291cmNlc0NvbnRlbnQiOlsidmFyIGVDb21tZXJjZSA9IChmdW5jdGlvbiAoKSB7XG4ndXNlIHN0cmljdCc7XG5cbmNsYXNzIEludmFsaWRBcmd1bWVudEV4Y2VwdGlvbiQxXHJcbntcclxuXHRjb25zdHJ1Y3RvcigpIFxyXG5cdHsgXHJcbiAgICBcdGNvbnNvbGUuZXJyb3IoYCR7dGhpcy5jb25zdHJ1Y3Rvci5uYW1lfSwgcGFzc2luZyBpbnZhbGlkIGFyZ3VtZW50cy5gKTtcclxuXHJcbiAgICBcdHRocm93IG5ldyBFcnJvcjtcclxuICAgIH1cclxufVxuXG5jbGFzcyBET01cclxue1xyXG5cdC8qKlxyXG5cdCAqIE1pbmlmaWVzIHRoZSBjc3MgdGV4dC5cclxuXHQgKi9cclxuXHRzdGF0aWMgbWluaWZ5Q3NzKHN0cmluZykgXHJcblx0e1xyXG5cdCAgICBzdHJpbmcgPSBzdHJpbmcucmVwbGFjZSgvXFwvXFwqKD86KD8hXFwqXFwvKVtcXHNcXFNdKSpcXCpcXC98W1xcclxcblxcdF0rL2csICcnKTtcclxuXHQgICAgc3RyaW5nID0gc3RyaW5nLnJlcGxhY2UoLyB7Mix9L2csICcgJyk7XHJcblx0ICAgIHN0cmluZyA9IHN0cmluZy5yZXBsYWNlKC8oW3s6fV0pL2csICckMScpO1xyXG5cdCAgICBzdHJpbmcgPSBzdHJpbmcucmVwbGFjZSgvKFs7LF0pIC9nLCAnJDEnKTtcclxuXHQgICAgc3RyaW5nID0gc3RyaW5nLnJlcGxhY2UoLyAhL2csICchJyk7XHJcblx0ICAgIFxyXG5cdCAgICByZXR1cm4gc3RyaW5nO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogU3dpdGNoZXMgYmV0d2VlbiB0d28gZ2l2ZW4gY2xhc3Nlcy5cclxuXHQgKi9cclxuXHRzdGF0aWMgc3dpdGNoQ2xhc3NlcyhlbGVtZW50LCBjbGFzc05hbWUsIG5ld0NsYXNzTmFtZSkgXHJcblx0e1xyXG5cdFx0dGhpcy5yZW1vdmVDbGFzcyhlbGVtZW50LCBjbGFzc05hbWUpO1xyXG5cdFx0dGhpcy5hZGRDbGFzcyhlbGVtZW50LCBuZXdDbGFzc05hbWUpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQWRkcyBjbGFzcyB0byBhIGdpdmVuIGVsZW1lbnQuXHJcblx0ICovXHJcblx0c3RhdGljIGFkZENsYXNzKGVsZW1lbnQsIGNsYXNzTmFtZSkgXHJcblx0e1xyXG5cdFx0aWYoZWxlbWVudCA9PT0gbnVsbCkge1xyXG5cdFx0XHR0aHJvdyBuZXcgSW52YWxpZEFyZ3VtZW50RXhjZXB0aW9uJDE7XHJcblx0XHR9XHJcblxyXG5cdFx0aWYoISBjbGFzc05hbWUgfHwgY2xhc3NOYW1lID09ICcnIHx8IHR5cGVvZiBjbGFzc05hbWUgPT09IHVuZGVmaW5lZCkge1xyXG5cdFx0XHRyZXR1cm4gZWxlbWVudDtcclxuXHRcdH1cclxuXHJcblx0XHRsZXQgY2xhc3NOYW1lcyA9IGNsYXNzTmFtZS5zcGxpdCgnICcpO1xyXG5cclxuXHRcdGNsYXNzTmFtZXMuZm9yRWFjaChmdW5jdGlvbihuYW1lKSB7XHJcblx0XHRcdGVsZW1lbnQuY2xhc3NMaXN0LmFkZChuYW1lKTtcclxuXHRcdH0pO1xyXG5cdFx0XHJcblx0XHRyZXR1cm4gZWxlbWVudDtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFJlbW92ZXMgY2xhc3MgZnJvbSBhIGdpdmVuIGVsZW1lbnQuXHJcblx0ICovXHJcblx0c3RhdGljIHJlbW92ZUNsYXNzKGVsZW1lbnQsIGNsYXNzTmFtZSkgXHJcblx0e1xyXG5cdFx0aWYoZWxlbWVudCA9PSBudWxsKSB7XHJcblx0XHRcdHRocm93IG5ldyBJbnZhbGlkQXJndW1lbnRFeGNlcHRpb24kMTtcclxuXHRcdH1cclxuXHJcblx0XHRpZihjbGFzc05hbWUgPT0gJycpIHtcclxuXHRcdFx0ZWxlbWVudC5jbGFzc05hbWUgPSAnJztcclxuXHRcdH0gZWxzZSB7XHJcblxyXG5cdFx0XHRsZXQgY2xhc3NOYW1lcyA9IGNsYXNzTmFtZS5zcGxpdCgnICcpO1xyXG5cclxuXHRcdFx0Y2xhc3NOYW1lcy5mb3JFYWNoKGZ1bmN0aW9uKG5hbWUpIHtcclxuXHRcdFx0XHRlbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUobmFtZSk7XHJcblx0XHRcdH0pO1xyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiBlbGVtZW50O1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogUXVlcmllcyB0aGUgZWxlbWVudCBmcm9tIHRoZSBET00uXHJcblx0ICovXHJcblx0c3RhdGljIGVsZW1lbnQoc2VsZWN0b3IpIFxyXG5cdHtcclxuXHRcdGxldCBlbGVtZW50ID0gcXVlcnlFbGVtZW50KHNlbGVjdG9yKTtcclxuXHRcdHJldHVybiBlbGVtZW50O1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQWRkcyBzdHlsZSB0YWcgd2l0aCBnaXZlbiBpZCBhbmQgY3NzIHRvIHRoZSBET00uXHJcblx0ICovXHJcblx0c3RhdGljIGFkZFN0eWxlKGlkLCBjc3MpIFxyXG5cdHtcclxuXHRcdGlmKHR5cGVvZiBjc3MgIT0gJ3N0cmluZycpIHtcclxuXHRcdFx0dGhyb3cgbmV3IEludmFsaWRBcmd1bWVudEV4Y2VwdGlvbiQxO1xyXG5cdFx0fVxyXG5cclxuXHRcdGxldCBoZWFkID0gZG9jdW1lbnQuaGVhZCB8fCBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnaGVhZCcpWzBdO1xyXG5cdFx0bGV0IHN0eWxlVGFnID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3R5bGUnKTtcclxuXHJcblx0XHQvLyBwaXBlIGl0IHRocm91Z2ggdGhlIG1pbmZpZXJcclxuXHQgICAgbGV0IENTUyA9IHRoaXMubWluaWZ5Q3NzKGNzcyk7XHJcblx0ICAgIC8vIGFkZGluZyBpdCB0byB0aGUgc3R5bGV0YWdcclxuXHQgICAgc3R5bGVUYWcuaW5uZXJIVE1MID0gQ1NTO1xyXG5cdCAgICAvLyBnaXZlIGFuIGlkIHRvIHJlY29nbml6ZSB0aGUgc3R5bGUgdGFnXHJcblx0XHRzdHlsZVRhZy5zZXRBdHRyaWJ1dGUoJ2lkJywgaWQpO1xyXG5cdFx0Ly8gYXBwZW5kaW5nIHRoYXQgc3R5bGUgdGFnIHRvIHRoZSBET00gaGVhZCB0YWdcclxuXHRcdGhlYWQuYXBwZW5kQ2hpbGQoc3R5bGVUYWcpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQ3JlYXRlcyBhbiBlbGVtZW50IHdpdGggdGhlIGdpdmVuIG9wdGlvbnMuXHJcblx0ICovXHJcblx0c3RhdGljIGNyZWF0ZUVsZW1lbnQoZWxlbWVudFR5cGUsIG9wdGlvbnMpXHJcblx0e1xyXG5cdFx0bGV0IGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KGVsZW1lbnRUeXBlKTtcclxuXHRcclxuXHRcdGlmIChvcHRpb25zID09PSB1bmRlZmluZWQpIHtcclxuXHRcdFx0cmV0dXJuIGVsZW1lbnQ7XHJcblx0XHR9XHJcblxyXG5cdFx0Zm9yIChsZXQgb3B0aW9uIGluIG9wdGlvbnMpIHtcclxuXHRcdFx0aWYob3B0aW9uID09ICd0ZXh0Jykge1xyXG5cdFx0XHRcdGVsZW1lbnQuaW5uZXJIVE1MID0gb3B0aW9uc1tvcHRpb25dO1xyXG5cdFx0XHRcdGNvbnRpbnVlO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRlbGVtZW50LnNldEF0dHJpYnV0ZShvcHRpb24sIG9wdGlvbnNbb3B0aW9uXSk7XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIGVsZW1lbnQ7XHJcblx0fVxyXG5cclxuXHRzdGF0aWMgdG9nZ2xlQ2xhc3MoZWxlbWVudCwgY2xhc3NOYW1lLCBzZWNvbmRDbGFzc05hbWUpXHJcblx0e1xyXG5cdFx0aWYoZWxlbWVudCA9PSBudWxsIHx8IHR5cGVvZiBlbGVtZW50ID09ICd1bmRlZmluZWQnKSB7XHJcblx0XHRcdHRocm93IG5ldyBJbnZhbGlkQXJndW1lbnRFeGNlcHRpb24kMTtcclxuXHRcdH1cclxuXHJcblx0XHRzZWNvbmRDbGFzc05hbWUgPSBzZWNvbmRDbGFzc05hbWUgfHwgdW5kZWZpbmVkO1xyXG5cclxuXHRcdGVsZW1lbnQuY2xhc3NMaXN0LnRvZ2dsZShjbGFzc05hbWUpO1xyXG5cclxuXHRcdGlmKHNlY29uZENsYXNzTmFtZSkge1xyXG5cdFx0XHRlbGVtZW50LmNsYXNzTGlzdC50b2dnbGUoc2Vjb25kQ2xhc3NOYW1lKTtcclxuXHRcdH1cclxuXHR9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBRdWVyaWVzIGFuIGVsZW1lbnQgZnJvbSB0aGUgRE9NLlxyXG4gKi9cclxuZnVuY3Rpb24gcXVlcnlFbGVtZW50KHNlbGVjdG9yKSB7XHJcblx0bGV0IGVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9yKSB8fCBudWxsO1xyXG5cclxuXHRpZihlbGVtZW50Lmxlbmd0aCA9PSAwKSB7XHJcblx0XHRyZXR1cm4gbnVsbDtcclxuXHR9XHJcblxyXG5cdHJldHVybiAoZWxlbWVudC5sZW5ndGggPiAxKSA/IGVsZW1lbnQgOiBlbGVtZW50WzBdO1xyXG59XG5cbmNsYXNzIEV2ZW50XHJcbntcclxuXHQvKipcclxuXHQgKiBMaXN0ZW4gdG8gYW4gZXZlbnQuXHJcblx0ICovXHJcblx0c3RhdGljIGxpc3RlbihuYW1lLCBjYWxsYmFjaykge1xyXG5cdFx0aWYgKHR5cGVvZiBjYWxsYmFjayAhPT0gJ2Z1bmN0aW9uJykge1xyXG5cdFx0XHR0aHJvdyBuZXcgSW52YWxpZEFyZ3VtZW50RXhjZXB0aW9uO1xyXG5cdFx0fVxyXG5cclxuXHRcdGV2ZW50c1tuYW1lXSA9IGNhbGxiYWNrO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogRmlyZXMgYW4gZXZlbnQuXHJcblx0ICovXHJcblx0c3RhdGljIHRyaWdnZXIobmFtZSwgZGF0YSkge1xyXG5cdFx0ZGF0YSA9IGRhdGEgfHwgbnVsbDtcclxuXHJcblx0XHRpZih0eXBlb2YgZXZlbnRzW25hbWVdICE9PSAnZnVuY3Rpb24nKSB7XHJcblx0XHRcdHRocm93IG5ldyBCYWRFdmVudENhbGxFeGNlcHRpb247XHJcblx0XHR9XHJcblxyXG5cdFx0aWYoZGF0YSAhPSBudWxsICYmIGRhdGEgaW5zdGFuY2VvZiBBcnJheSkge1xyXG5cdFxyXG5cdFx0XHRyZXR1cm4gZXZlbnRzW25hbWVdKC4uLmRhdGEpO1xyXG5cdFx0fVxyXG5cclxuXHRcdGV2ZW50c1tuYW1lXSgpO1xyXG5cdH1cclxufVxuXG5jbGFzcyBDb21tb25cclxue1xyXG5cdC8qKlxyXG5cdCAqIEV4dGVuZCBhbiBvYmplY3QuXHJcblx0ICovXHJcblx0c3RhdGljIGV4dGVuZChjdXJyZW50T2JqLCBuZXdPYmogKSB7XHJcblx0XHR2YXIgZXh0ZW5kZWQgPSB7fTtcclxuXHQgICAgdmFyIHByb3A7XHJcblxyXG5cdCAgICBmb3IgKHByb3AgaW4gY3VycmVudE9iaikge1xyXG5cdCAgICAgICAgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChjdXJyZW50T2JqLCBwcm9wKSkge1xyXG5cdCAgICAgICAgICAgIGV4dGVuZGVkW3Byb3BdID0gY3VycmVudE9ialtwcm9wXTtcclxuXHQgICAgICAgIH1cclxuXHQgICAgfVxyXG5cclxuXHQgICAgZm9yIChwcm9wIGluIG5ld09iaikge1xyXG5cdCAgICAgICAgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChuZXdPYmosIHByb3ApKSB7XHJcblx0ICAgICAgICAgICAgZXh0ZW5kZWRbcHJvcF0gPSBuZXdPYmpbcHJvcF07XHJcblx0ICAgICAgICB9XHJcblx0ICAgIH1cclxuXHJcblx0ICAgIHJldHVybiBleHRlbmRlZDtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIENoZWNrcyBmb3IgYSBuZWVkbGUgaW4gaHlzdGFjay5cclxuXHQgKi9cclxuXHRzdGF0aWMgaW5fYXJyYXkobmVlZGxlLCBoeXN0YWNrKSB7XHJcblx0XHRpZihoeXN0YWNrLmNvbnN0cnVjdG9yICE9PSBBcnJheSkgcmV0dXJuO1xyXG5cclxuXHRcdGZvcih2YXIgaSA9IDA7IGkgPD0gaHlzdGFjay5sZW5ndGg7IGkrKykge1xyXG5cdFx0XHRpZihuZWVkbGUgPT0gaHlzdGFja1tpXSkgcmV0dXJuIHRydWU7XHRcclxuXHRcdH1cclxuXHRcclxuXHRcdHJldHVybiBmYWxzZTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIENoZWNrcyBpZiBhbiBvYmplY3QgaXMgZW1wdHkuXHJcblx0ICovXHJcblx0c3RhdGljIGVtcHR5T2JqZWN0KG9iamVjdCkge1xyXG5cdFx0Zm9yKHZhciBwcm9wIGluIG9iamVjdCkge1xyXG5cdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIHRydWU7XHJcblx0fVxyXG5cclxuXHRzdGF0aWMgY29udGFpbnNPYmplY3Qob2JqZWN0LCBoeXN0YWNrKSBcclxuXHR7XHJcblx0ICAgIHZhciBpO1xyXG5cclxuXHQgICAgZm9yIChpID0gMDsgaSA8IGh5c3RhY2subGVuZ3RoOyBpKyspIHtcclxuXHQgICAgICAgIGlmICh0eXBlb2Ygb2JqZWN0ID09ICdzdHJpbmcnICYmIGh5c3RhY2tbaV0uY29uc3RydWN0b3IubmFtZSA9PT0gb2JqZWN0KSB7XHJcblx0ICAgICAgICBcdHJldHVybiB0cnVlO1xyXG5cdCAgICAgICAgfVxyXG5cclxuXHQgICAgICAgIGlmIChoeXN0YWNrW2ldID09PSBvYmplY3QpIHtcclxuXHQgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuXHQgICAgICAgIH1cclxuXHQgICAgfVxyXG5cclxuXHQgICAgcmV0dXJuIGZhbHNlO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQ29udmVydCBjYW1lbENhc2UgdG8ga2ViYWItY2FzZS5cclxuXHQgKi9cclxuXHRzdGF0aWMga2ViYWJDYXNlKHN0cmluZykge1xyXG5cdFx0cmV0dXJuIHN0cmluZy5yZXBsYWNlKC8oW2Etel0pKFtBLVpdKS9nLCAnJDEtJDInKS50b0xvd2VyQ2FzZSgpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQ2hlY2tzIGlmIGEgZ2l2ZW4gcGFyYW1ldGVyIGlzIGFuIG9iamVjdC5cclxuXHQgKi9cclxuXHRzdGF0aWMgaXNPYmplY3Qob2JqZWN0KSB7XHJcblx0XHRyZXR1cm4gdHlwZW9mIG9iamVjdCA9PSAnb2JqZWN0JztcclxuXHR9XHJcbn1cblxuY2xhc3MgSW52YWxpZEJpbmRpbmdFeGNlcHRpb25cclxue1xyXG5cdGNvbnN0cnVjdG9yKCkgXHJcblx0eyBcclxuICAgIFx0Y29uc29sZS5lcnJvcihgJHt0aGlzLmNvbnN0cnVjdG9yLm5hbWV9LCB0cnlpbmcgdG8gYmluZCBhbiBhbHJlYWR5IGV4aXN0aW5nIGJvdW5kLmApO1xyXG5cclxuICAgIFx0dGhyb3cgbmV3IEVycm9yO1xyXG4gICAgfVxyXG59XG5cbmxldCBpbnN0YW5jZXMgPSBbXTtcclxuXHJcbmNsYXNzIENvbnRhaW5lciBcclxue1xyXG5cdC8qKlxyXG5cdCAqIEJpbmRzIGtleSB0byBjb25jcmV0ZSBjbGFzcy5cclxuXHQgKi9cclxuXHRiaW5kKGtleSwgY29uY3JldGUpIFxyXG5cdHtcclxuXHRcdGlmICh0eXBlb2Yga2V5ICE9ICdzdHJpbmcnIHx8IHR5cGVvZiBjb25jcmV0ZSAhPSAnZnVuY3Rpb24nKSB7XHJcblx0XHRcdHRocm93IG5ldyBJbnZhbGlkQXJndW1lbnRFeGNlcHRpb24kMTtcclxuXHRcdH1cclxuXHJcblx0XHRpZiAodHlwZW9mIHRoaXNba2V5XSAhPSAndW5kZWZpbmVkJykge1xyXG5cdFx0XHR0aHJvdyBuZXcgSW52YWxpZEJpbmRpbmdFeGNlcHRpb247XHJcblx0XHR9XHJcblxyXG5cdFx0dGhpc1trZXldID0gY29uY3JldGUuYmluZChjb25jcmV0ZSwgdGhpcyk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBTZXRzIGFuIGluc3RhbmNlLlxyXG5cdCAqL1xyXG5cdHNldEluc3RhbmNlKGtleSwgaW5zdGFuY2UpIFxyXG5cdHtcclxuXHRcdGlmKHR5cGVvZiBrZXkgIT0gJ3N0cmluZycgfHwgdHlwZW9mIGluc3RhbmNlICE9ICdvYmplY3QnKSB7XHJcblx0XHRcdHRocm93IG5ldyBJbnZhbGlkQXJndW1lbnRFeGNlcHRpb24kMTtcclxuXHRcdH1cclxuXHJcblx0XHRpbnN0YW5jZXNba2V5XSA9IGluc3RhbmNlO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogR2V0cyBhbiBpbnN0YW5jZS5cclxuXHQgKi9cclxuXHRnZXRJbnN0YW5jZShrZXkpIFxyXG5cdHtcclxuXHRcdGlmKHR5cGVvZiBrZXkgIT0gJ3N0cmluZycpIHtcclxuXHRcdFx0dGhyb3cgbmV3IEludmFsaWRBcmd1bWVudEV4Y2VwdGlvbiQxO1xyXG5cdFx0fVxyXG5cclxuXHRcdGlmKHR5cGVvZiBrZXkgPT0gJ29iamVjdCcpIHtcclxuXHRcdFx0cmV0dXJuIGluc3RhbmNlc1trZXkuY29uc3RydWN0b3IubmFtZV0gfHwgbnVsbDtcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gaW5zdGFuY2VzW2tleV0gfHwgbnVsbDtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIENoZWNrcyBpZiBhbiBpbnN0YW5jZSBleGlzdC5cclxuXHQgKi9cclxuXHRpbnN0YW5jZUV4aXN0KGluc3RhbmNlKSBcclxuXHR7XHJcblx0XHRpZih0eXBlb2YgaW5zdGFuY2UgPT0gJ29iamVjdCcpIHtcclxuXHRcdFx0cmV0dXJuICh0eXBlb2YgaW5zdGFuY2VzW2luc3RhbmNlLmNvbnN0cnVjdG9yLm5hbWVdICE9PSAndW5kZWZpbmVkJyk7XHJcblx0XHR9XHJcblx0XHRcclxuXHRcdFxyXG5cdFx0cmV0dXJuIChpbnN0YW5jZSBpbiBpbnN0YW5jZXMpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQ3JlYXRlcyBhbiBpbnN0YW5jZS5cclxuXHQgKi9cclxuXHRtYWtlKG9iamVjdClcclxuXHR7XHJcblx0XHRsZXQgaW5zdGFuY2UgPSB7fTtcclxuXHJcblx0XHRpZiAodGhpcy5pbnN0YW5jZUV4aXN0KG9iamVjdCkpIHtcclxuXHRcdFx0cmV0dXJuIHRoaXMuZ2V0SW5zdGFuY2Uob2JqZWN0KTtcclxuXHRcdH1cclxuXHJcblx0XHRpZiAodHlwZW9mIG9iamVjdCA9PSAnb2JqZWN0Jykge1xyXG5cdFx0XHRpbnN0YW5jZSA9IG9iamVjdDtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdGluc3RhbmNlID0gbmV3IHRoaXNbb2JqZWN0XTtcdFxyXG5cdFx0fVxyXG5cclxuXHRcdHRoaXMuc2V0SW5zdGFuY2Uob2JqZWN0LCBpbnN0YW5jZSk7IFxyXG5cclxuXHRcdHJldHVybiBpbnN0YW5jZTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFJldHJpZXZlIGFsbCBpbnN0YW5jZXMuXHJcblx0ICovXHJcblx0aW5zdGFuY2VzKCkgXHJcblx0e1xyXG5cdFx0cmV0dXJuIGluc3RhbmNlcztcclxuXHR9XHJcbn1cblxuY2xhc3MgQ29tcG9uZW50c0V4Y2VwdGlvblxyXG57XHJcblx0Y29uc3RydWN0b3IoKSBcclxuXHR7IFxyXG4gICAgXHRjb25zb2xlLmVycm9yKGAke3RoaXMuY29uc3RydWN0b3IubmFtZX0sIGV4cGVjdGluZyBmb3IgYXQgbGVhc3Qgb25lIGNvbXBvbmVudHMsIGJ1dCBub25lIHdhcyBnaXZlbiwgXHJcblx0XHRcdFx0XHRcdFx0XHRwbGVhc2UgYWRkIGF0IGxlYXN0IG9uZSByZXF1aXJlbWVudChQcm9kdWN0cywgU2VydmljZXMgb3IvYW5kIEZpbHRlcmApO1xyXG5cclxuICAgIFx0dGhyb3cgbmV3IEVycm9yO1xyXG4gICAgfVxyXG59XG5cbmNsYXNzIEJhZEV2ZW50Q2FsbEV4Y2VwdGlvbiQxXHJcbntcclxuXHRjb25zdHJ1Y3RvcigpIFxyXG5cdHsgXHJcbiAgICBcdGNvbnNvbGUuZXJyb3IoYCR7dGhpcy5jb25zdHJ1Y3Rvci5uYW1lfSwgbGlzdGVuaW5nIHRvIGEgbm9uZS1leGlzdGluZyBldmVudGApO1xyXG5cclxuICAgIFx0dGhyb3cgbmV3IEVycm9yO1xyXG4gICAgfVxyXG59XG5cbmNsYXNzIENvbXBvbmVudE5vdFJlZ2lzdGVyZWRFeGNlcHRpb25cclxue1xyXG5cdGNvbnN0cnVjdG9yKCkgXHJcblx0eyBcclxuICAgIFx0Y29uc29sZS5lcnJvcihgJHt0aGlzLmNvbnN0cnVjdG9yLm5hbWV9LCBjb21wb25lbnRzIG11c3QgYmUgcmVnaXN0ZXJlZCBpbiBvcmRlciB0byB1c2UgdGhlbWApO1xyXG5cclxuICAgIFx0dGhyb3cgbmV3IEVycm9yO1xyXG4gICAgfVxyXG59XG5cbmNsYXNzIEV4Y2VwdGlvbkhhbmRsZXJcclxue1xyXG5cdC8qKlxyXG5cdCAqIEhhbmRsZSBhbGwgdGhlIGVycm9yc1xyXG5cdCAqL1xyXG5cdHN0YXRpYyBpbml0YWxpemUoKSB7XHRcclxuXHRcdHdpbmRvdy5vbmVycm9yID0gZnVuY3Rpb24obWVzc2FnZSwgc291cmNlLCBsaW5lbm8sIGNvbG5vLCBlcnJvcikge1xyXG5cclxuXHRcdFx0aWYgKGVycm9yIGluc3RhbmNlb2YgSW52YWxpZEFyZ3VtZW50RXhjZXB0aW9uJDEpIHtcclxuXHRcdFx0XHQvLyBoYW5kbGVcclxuXHRcdFx0fSBlbHNlIGlmIChlcnJvciBpbnN0YW5jZW9mIEludmFsaWRCaW5kaW5nRXhjZXB0aW9uKSB7XHJcblx0XHRcdFx0Ly8gaGFuZGxlXHJcblx0XHRcdH0gZWxzZSBpZiAoZXJyb3IgaW5zdGFuY2VvZiBCYWRFdmVudENhbGxFeGNlcHRpb24kMSkge1xyXG5cdFx0XHRcdC8vIGhhbmRsZVxyXG5cdFx0XHR9IGVsc2UgaWYgKGVycm9yIGluc3RhbmNlb2YgQ29tcG9uZW50c0V4Y2VwdGlvbikge1xyXG5cdFx0XHRcdC8vIGhhbmRsZVxyXG5cdFx0XHR9IGVsc2UgaWYgKGVycm9yIGluc3RhbmNlb2YgQ29tcG9uZW50Tm90UmVnaXN0ZXJlZEV4Y2VwdGlvbikge1xyXG5cdFx0XHRcdC8vIGhhbmRsZVxyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0cmV0dXJuIHRydWU7XHJcblx0XHR9O1xyXG5cdH1cclxufVxuXG4vKipcclxuICogVGhlIGRlZmF1bHQgc2V0dGluZ3Mgb2YgdGhlIGZpbHRlci5cclxuICovXHJcbmxldCBkZWZhdWx0U2V0dGluZ3MkMSA9IHtcclxuXHRlbGVtZW50OiAnLmZpbHRlcicsXHJcblx0ZGF0YToge30sXHJcblx0Y2xhc3M6ICdjb2wteHMtMicsXHJcblx0d2lkdGg6ICcnLFxyXG5cdGhlaWdodDogJycsXHJcbn07XHJcblxyXG5cclxuLyoqXHJcbiAqIFRoZSBGaWx0ZXIgT2JqZWN0LCBoYW5kbGVzIHRoZSBmaWx0ZXIgb2YgdGhlIHByb2R1Y3RzL3NlcnZpY2VzLlxyXG4gKi9cclxuY2xhc3MgRmlsdGVyIFxyXG57XHJcblx0Y29uc3RydWN0b3IoY29udGFpbmVyKSBcclxuXHR7XHJcblx0XHR0aGlzLnNldHVwKGRlZmF1bHRTZXR0aW5ncyQxKTtcclxuXHR9XHJcblxyXG5cdHNldHVwKHNldHRpbmdzKVxyXG5cdHtcclxuXHRcdGlmKHR5cGVvZiBzZXR0aW5ncyAhPSAnb2JqZWN0Jykge1xyXG5cdFx0XHR0aHJvdyBuZXcgSW52YWxpZEFyZ3VtZW50RXhjZXB0aW9uJDE7XHJcblx0XHR9XHJcblxyXG5cdFx0dGhpcy5zZXR0aW5ncyA9IENvbW1vbi5leHRlbmQoZGVmYXVsdFNldHRpbmdzJDEsIHNldHRpbmdzKTtcclxuXHJcblx0XHR0aGlzLnNldEVsZW1lbnQodGhpcy5zZXR0aW5ncy5lbGVtZW50KTtcclxuXHR9XHJcblxyXG5cdHNldEVsZW1lbnQoc2VsZWN0b3IpXHJcblx0e1xyXG5cdFx0dGhpcy53cmFwcGVyID0gRE9NLmVsZW1lbnQoc2VsZWN0b3IpO1xyXG5cdFx0XHJcblx0XHRET00uYWRkQ2xhc3ModGhpcy53cmFwcGVyLCB0aGlzLnNldHRpbmdzLmNsYXNzKTtcclxuXHR9XHJcbn1cblxuLyoqXHJcbiAqIFRoZSBkZWZhdWx0IHNldHRpbmdzIG9mIGVhY2ggcHJvZHVjdC5cclxuICovXHJcbmxldCBkZWZhdWx0U2V0dGluZ3MkMiA9IHtcclxuXHRlbGVtZW50OiAnLnByb2R1Y3RzJyxcclxuXHRjbGFzczogJycsXHJcblx0aXRlbV9jbGFzczogJycsXHJcblx0d2lkdGg6ICcyMDBweCcsXHJcblx0aGVpZ2h0OiAnMjUwcHgnLFxyXG5cdGF0dHJpYnV0ZXM6IFsnbmFtZScsICdwcmljZScsICdkZWxpdmVyeVRpbWUnLCAnaW1hZ2UnXSxcclxuXHR1cmw6ICdwcm9kdWN0cy5waHAnLFxyXG59O1xyXG5cclxuLyoqXHJcbiAqIFN0b3JlcyB0aGUgY29udGFpbmVyIG9iamVjdC5cclxuICovXHJcbmxldCBDb250YWluZXIkMjtcclxuXHJcbi8qKlxyXG4gKiBUaGUgUHJvZHVjdHMgT2JqZWN0LCBoYW5kbGVzIHRoZSBwcm9kdWN0cy5cclxuICovXHJcbmNsYXNzIFByb2R1Y3RzIFxyXG57XHJcblx0LyoqXHJcblx0ICogSW5pdGFsaXplIHRoZSBDb250YWluZXIgYW5kIHRoZSBwYWdpbmF0b3IuXHJcblx0ICovXHJcblx0Y29uc3RydWN0b3IoY29udGFpbmVyLCBwYWdpbmF0b3IpIFxyXG5cdHtcclxuXHRcdHRoaXMuc2V0dXAoZGVmYXVsdFNldHRpbmdzJDIpO1xyXG5cclxuXHRcdENvbnRhaW5lciQyID0gY29udGFpbmVyO1xyXG5cdFx0dGhpcy5wYWdpbmF0b3IgPSBwYWdpbmF0b3I7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBTZXRzIHRoZSBnaXZlbiBzZXR0aW5ncyBmcm9tIHRoZSB1c2VyLlxyXG5cdCAqL1xyXG5cdHNldHVwKHNldHRpbmdzKVxyXG5cdHtcclxuXHRcdGlmICh0eXBlb2Ygc2V0dGluZ3MgIT0gJ29iamVjdCcpIHtcclxuXHRcdFx0dGhyb3cgbmV3IEludmFsaWRBcmd1bWVudEV4Y2VwdGlvbiQxO1xyXG5cdFx0fVxyXG5cclxuXHRcdHRoaXMuc2V0dGluZ3MgPSBDb21tb24uZXh0ZW5kKGRlZmF1bHRTZXR0aW5ncyQyLCBzZXR0aW5ncyk7XHJcblxyXG5cdFx0dGhpcy5zZXRFbGVtZW50KHRoaXMuc2V0dGluZ3MuZWxlbWVudCk7XHJcblxyXG5cdFx0dGhpcy5hZGRTdHlsZVRhZygpO1x0XHJcblx0XHJcblx0XHRpZiAodHlwZW9mIENvbnRhaW5lciQyID09ICd1bmRlZmluZWQnKSB7XHJcblx0XHRcdHJldHVybjtcclxuXHRcdH1cclxuXHJcblx0XHRpZiAoQ29udGFpbmVyJDIuaW5zdGFuY2VFeGlzdCgnUGFnaW5hdGlvbicpKSB7XHJcblx0XHRcdHRoaXMucGFnaW5hdG9yLnJlc2V0KCk7XHJcblx0XHRcdGxldCByZXF1ZXN0ID0gdGhpcy5nZXRQcm9kdWN0c0J5UGFnZSh0aGlzLnBhZ2luYXRvci5nZXRDdXJyZW50KCkpO1xyXG5cdFx0XHRcclxuXHRcdFx0cmVxdWVzdC50aGVuKGZ1bmN0aW9uKGl0ZW1zKSB7XHJcblx0XHRcdFx0dGhpcy5yZXBsYWNlSXRlbXMoaXRlbXMpO1xyXG5cdFx0XHR9LmJpbmQodGhpcykpLmNhdGNoKGZ1bmN0aW9uKGVycm9yKSB7XHJcblxyXG5cdFx0XHR9KTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFNldHMgdGhlIERPTSBlbGVtZW50IGZvciBwb3B1bGF0aW5nIHRoZSBwcm9kdWN0cy5cclxuXHQgKi9cclxuXHRzZXRFbGVtZW50KHNlbGVjdG9yKVxyXG5cdHtcclxuXHRcdHRoaXMud3JhcHBlciA9IERPTS5lbGVtZW50KHNlbGVjdG9yKTtcclxuXHJcblx0XHRpZiAodGhpcy53cmFwcGVyKSB7XHJcblx0XHRcdERPTS5hZGRDbGFzcyh0aGlzLndyYXBwZXIsIHRoaXMuc2V0dGluZ3MuY2xhc3MpO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogUmVwbGFjZSBpdGVtcyBpbiB0aGUgY29udGFpbmVyLlxyXG5cdCAqL1xyXG5cdHJlcGxhY2VJdGVtcyhpdGVtcykgXHJcblx0e1xyXG5cdFx0aWYgKCEgQXJyYXkuaXNBcnJheShpdGVtcykgfHwgKGl0ZW1zLmxlbmd0aCA8PSAwICYmIHR5cGVvZiBpdGVtc1swXSA9PSAnc3RyaW5nJykpIHtcclxuXHRcdFx0dGhyb3cgbmV3IEludmFsaWRBcmd1bWVudEV4Y2VwdGlvbiQxO1xyXG5cdFx0fVxyXG5cclxuXHRcdGlmIChDb250YWluZXIkMi5pbnN0YW5jZUV4aXN0KCdQYWdpbmF0aW9uJykpIHtcclxuXHRcdFx0bGV0IHBlclBhZ2UgPSB0aGlzLnBhZ2luYXRvci5zZXR0aW5ncy5wZXJfcGFnZTtcclxuXHRcdFx0aXRlbXMgPSBpdGVtcy5zbGljZSgwLCBwZXJQYWdlKTtcclxuXHRcdH1cclxuXHJcblx0XHRsZXQgcHJvZHVjdHMgPSB0aGlzLmJ1aWxkUHJvZHVjdHMoaXRlbXMsIHRoaXMuc2V0dGluZ3MuaXRlbV9jbGFzcywgJ2RpdicpO1xyXG5cclxuXHRcdHRoaXMud3JhcHBlci5pbm5lckhUTUwgPSBwcm9kdWN0cztcclxuXHJcblx0XHRyZXR1cm4gaXRlbXM7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBNYWtlcyBhbiBBamF4IGNhbGwgdG8gdGhlIHNlcnZlci5cclxuXHQgKi9cclxuXHRnZXRQcm9kdWN0c0J5UGFnZShwYWdlTnVtYmVyKSBcclxuXHR7XHJcblx0XHRyZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XHJcblx0XHRcdGlmICh0aGlzLnBhZ2luYXRvci5ub3RJblBhZ2VSYW5nZShwYWdlTnVtYmVyKSkge1xyXG5cdFx0XHRcdHJldHVybiByZWplY3QoJ05vdCBpbiBwYWdpbmF0aW9uIHJhbmdlJyk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGxldCB4aHIgPSBuZXcgWE1MSHR0cFJlcXVlc3QgfHwgbmV3IEFjdGl2ZVhPYmplY3QoXCJNaWNyb3NvZnQuWE1MSFRUUFwiKTtcclxuXHJcblx0XHRcdHhoci5vcGVuKCdHRVQnLCB0aGlzLnNldHRpbmdzLnVybCArICc/cGFnZT0nICsgcGFnZU51bWJlciwgdHJ1ZSk7IFxyXG5cdFx0XHR4aHIuc2V0UmVxdWVzdEhlYWRlcignQ29udGVudC1UeXBlJywgJ2FwcGxpY2F0aW9uL2pzb24nKTtcclxuXHRcdFx0XHJcblx0XHRcdGxldCBpbnN0YW5jZSA9IHRoaXM7XHJcblxyXG5cdFx0XHR4aHIub25yZWFkeXN0YXRlY2hhbmdlID0gZnVuY3Rpb24oKSB7XHJcblx0XHRcdFx0aWYgKHRoaXMucmVhZHlTdGF0ZSA9PSA0KSB7XHJcblx0XHRcdFx0XHRpZiAodGhpcy5zdGF0dXMgPT0gMjAwKSB7XHJcblx0XHRcdFx0XHRcdGluc3RhbmNlLmN1cnJlbnRJdGVtcyA9ICh0aGlzLnJlc3BvbnNlVGV4dCA9PSAnJykgPyBbXSA6IEpTT04ucGFyc2UodGhpcy5yZXNwb25zZVRleHQpO1xyXG5cdFx0XHRcdFx0XHJcblx0XHRcdFx0XHRcdGlmKGluc3RhbmNlLmN1cnJlbnRJdGVtcy5sZW5ndGggPT09IDApIHtcclxuXHRcdFx0XHRcdFx0XHRyZWplY3QoJ05vIEl0ZW1zIHdlcmUgcmV0cmlldmVkIScpO1xyXG5cdFx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGluc3RhbmNlLmN1cnJlbnRJdGVtcy5sZW5ndGg7IGkrKykge1xyXG5cdFx0XHRcdFx0XHRcdHZhciBwcm9kdWN0ID0gaW5zdGFuY2UuY3VycmVudEl0ZW1zW2ldO1xyXG5cdFx0XHRcdFx0XHRcdGluc3RhbmNlLkFmdGVyTG9hZGVkLmNhbGwodGhpcywgcHJvZHVjdCk7XHJcblx0XHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0XHRcdHJlc29sdmUoaW5zdGFuY2UuY3VycmVudEl0ZW1zKTtcclxuXHRcdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRcdHJlamVjdCh0aGlzLnN0YXR1c1RleHQpO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0fTtcclxuXHJcblx0XHRcdHhoci5vbmVycm9yID0gZnVuY3Rpb24oZXJyb3IpIHtcclxuXHRcdFx0XHRyZWplY3QoZXJyb3IpO1xyXG5cdFx0XHR9O1xyXG5cclxuXHRcdFx0eGhyLnNlbmQobnVsbCk7XHJcblx0XHR9LmJpbmQodGhpcykpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQnVpbGRzIHRoZSBodG1sIGZvciB0aGUgcHJvZHVjdHMuXHJcblx0ICovXHJcblx0YnVpbGRQcm9kdWN0cyhhdHRyaWJ1dGVzQ29sbGVjdGlvbiwgY2xhc3NOYW1lLCB0YWdUeXBlKSBcclxuXHR7XHJcblx0XHRpZihhdHRyaWJ1dGVzQ29sbGVjdGlvbi5jb25zdHJ1Y3Rvci5uYW1lICE9ICdBcnJheScgKSB7XHJcblx0XHRcdHRocm93IG5ldyBJbnZhbGlkQXJndW1lbnRFeGNlcHRpb24kMTtcclxuXHRcdH1cclxuXHJcblx0XHRsZXQgYnVpbHRQcm9kdWN0cyA9ICcnO1xyXG5cclxuXHRcdGF0dHJpYnV0ZXNDb2xsZWN0aW9uLmZvckVhY2goZnVuY3Rpb24oYXR0cmlidXRlcykge1xyXG5cdFx0XHRidWlsdFByb2R1Y3RzICs9IHRoaXMuYnVpbGRQcm9kdWN0KGF0dHJpYnV0ZXMsIGNsYXNzTmFtZSwgdGFnVHlwZSk7XHJcblx0XHR9LmJpbmQodGhpcykpO1xyXG5cclxuXHRcdHJldHVybiBidWlsdFByb2R1Y3RzO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQnVpbGRzIHRoZSBodG1sIGZvciBhIHNpbmdsZSBwcm9kdWN0LlxyXG5cdCAqL1xyXG5cdGJ1aWxkUHJvZHVjdChhdHRyaWJ1dGVzLCBjbGFzc05hbWUsIHRhZ1R5cGUpIFxyXG5cdHtcclxuXHRcdGlmICh0eXBlb2YgYXR0cmlidXRlcyAhPSAnb2JqZWN0JyB8fCB0eXBlb2YgdGFnVHlwZSAhPSAnc3RyaW5nJykge1xyXG5cdFx0XHR0aHJvdyBuZXcgSW52YWxpZEFyZ3VtZW50RXhjZXB0aW9uJDE7XHJcblx0XHR9XHJcblxyXG5cdFx0Y2xhc3NOYW1lID0gY2xhc3NOYW1lIHx8IG51bGw7XHJcblxyXG5cdFx0bGV0IHByb2R1Y3QgPSBET00uY3JlYXRlRWxlbWVudCgnZGl2Jywge1xyXG5cdFx0XHRjbGFzczogJ3Byb2R1Y3QnXHJcblx0XHR9KTtcclxuXHJcblx0XHRET00uYWRkQ2xhc3MocHJvZHVjdCwgY2xhc3NOYW1lKTtcclxuXHJcblx0XHRsZXQgb3ZlcmxheSA9IERPTS5jcmVhdGVFbGVtZW50KCdkaXYnLCB7XHJcblx0XHRcdGNsYXNzOiAncHJvZHVjdC1vdmVybGF5JyxcclxuXHRcdH0pO1xyXG5cclxuXHRcdHByb2R1Y3QuYXBwZW5kQ2hpbGQob3ZlcmxheSk7XHJcblxyXG5cdFx0Zm9yICh2YXIgYXR0cmlidXRlIGluIGF0dHJpYnV0ZXMpIHtcclxuXHRcdFx0aWYgKCEgQ29tbW9uLmluX2FycmF5KGF0dHJpYnV0ZSwgdGhpcy5zZXR0aW5ncy5hdHRyaWJ1dGVzKSkge1xyXG5cdFx0XHRcdGNvbnRpbnVlO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRsZXQgdGFnID0gRE9NLmNyZWF0ZUVsZW1lbnQodGFnVHlwZSk7XHJcblxyXG5cdFx0XHRpZiAoYXR0cmlidXRlID09ICdpbWFnZScpIHtcclxuXHRcdFx0XHRsZXQgaW1hZ2UgPSBET00uY3JlYXRlRWxlbWVudCgnaW1nJywge1xyXG5cdFx0XHRcdFx0c3JjOiBhdHRyaWJ1dGVzW2F0dHJpYnV0ZV1cclxuXHRcdFx0XHR9KTtcclxuXHRcdFx0XHRwcm9kdWN0LmFwcGVuZENoaWxkKGltYWdlKTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHR0YWcuaW5uZXJIVE1MID0gYXR0cmlidXRlc1thdHRyaWJ1dGVdIHx8ICcnO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRET00uYWRkQ2xhc3ModGFnLCAncHJvZHVjdC0nICsgQ29tbW9uLmtlYmFiQ2FzZShhdHRyaWJ1dGUpKTtcclxuXHRcdFx0b3ZlcmxheS5hcHBlbmRDaGlsZCh0YWcpO1xyXG5cdFx0fVxyXG5cclxuXHRcdGxldCB0YWcgPSBET00uY3JlYXRlRWxlbWVudCgnZGl2Jywge1xyXG5cdFx0XHRpZDogJ2FjdGlvbkJ1dHRvbnMnLFxyXG5cdFx0XHRjbGFzczogJ2FjdGlvbi1idXR0b25zJ1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0bGV0IGFkZFRvQ2FydCA9IERPTS5jcmVhdGVFbGVtZW50KCdidXR0b24nLCB7XHJcblx0XHRcdGlkOiAnYWRkVG9DYXJ0JyxcclxuXHRcdFx0Y2xhc3M6ICdidG4gYnRuLXByaW1hcnknLFxyXG5cdFx0XHR0eXBlOiAnYnV0dG9uJyxcclxuXHRcdFx0dGV4dDogJysnLFxyXG5cdFx0fSk7XHJcblxyXG5cdFx0bGV0IGZhdm9yaXRlID0gRE9NLmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicsIHtcclxuXHRcdFx0aWQ6ICdmYXZvcml0ZScsXHJcblx0XHRcdGNsYXNzOiAnYnRuIGJ0bi1kYW5nZXInLFxyXG5cdFx0XHR0eXBlOiAnYnV0dG9uJyxcclxuXHRcdFx0dGV4dDogJyZoZWFydHM7J1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0dGFnLmFwcGVuZENoaWxkKGFkZFRvQ2FydCk7XHJcblx0XHR0YWcuYXBwZW5kQ2hpbGQoZmF2b3JpdGUpO1xyXG5cclxuXHRcdG92ZXJsYXkuYXBwZW5kQ2hpbGQodGFnKTtcclxuXHJcblx0XHRyZXR1cm4gcHJvZHVjdC5vdXRlckhUTUw7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBBbiBldmVudCBmb3IgdGhlIGNsaWVudCBvZiB3aGVuIHRoZSBwcm9kdWN0cyBhcyBiZWVuIGxvYWRlZC5cclxuXHQgKi9cclxuXHRBZnRlckxvYWRlZChwcm9kdWN0KSBcclxuXHR7XHJcblx0XHQvL1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQWRkIHRoZSBlQ29tbWVyY2Ugc3R5bGUgdGFncyB0byB0aGUgRE9NLlxyXG5cdCAqL1xyXG5cdGFkZFN0eWxlVGFnKCkgXHJcblx0e1xyXG5cdFx0aWYoRE9NLmVsZW1lbnQoJyNlQ29tbWVyY2UtUHJvZHVjdHMnKSkge1xyXG5cdFx0XHRyZXR1cm47XHJcblx0XHR9XHJcblxyXG5cdFx0bGV0IGNzcyA9IGBcclxuXHRcdFx0LnByb2R1Y3Qge1xyXG5cdFx0XHRcdHBvc2l0aW9uOiByZWxhdGl2ZTtcclxuXHRcdFx0XHRtYXJnaW46IDVweCA1cHg7XHJcblx0XHRcdFx0Ym9yZGVyOiAxcHggc29saWQgI2U0ZTRlNDtcclxuXHRcdFx0XHR3aWR0aDogJHt0aGlzLnNldHRpbmdzLndpZHRofTtcclxuXHRcdFx0XHRoZWlnaHQ6ICR7dGhpcy5zZXR0aW5ncy5oZWlnaHR9O1xyXG5cdFx0XHRcdGN1cnNvcjogcG9pbnRlcjtcclxuXHRcdFx0XHRjb2xvcjogI2ZmZmZmZjtcclxuXHRcdFx0XHRvdmVyZmxvdzogaGlkZGVuO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHQucHJvZHVjdCA+IC5wcm9kdWN0LW92ZXJsYXkge1xyXG5cdFx0XHRcdHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuXHRcdFx0XHR0b3A6IDA7XHJcblx0XHRcdFx0bGVmdDogMDtcclxuXHRcdFx0XHR3aWR0aDogMTAwJTtcclxuXHRcdFx0XHRoZWlnaHQ6IDEwMCU7XHJcblx0XHRcdFx0b3BhY2l0eTogMC41O1xyXG5cdFx0XHRcdHotaW5kZXg6IDU7XHJcblx0XHRcdFx0dHJhbnNpdGlvbjogMXMgYWxsO1xyXG5cdFx0XHRcdHRyYW5zZm9ybTogdHJhbnNsYXRlWCgtMjUwcHgpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHQucHJvZHVjdDpob3ZlciA+IC5wcm9kdWN0LW92ZXJsYXkge1xyXG5cdFx0XHRcdGJhY2tncm91bmQ6IHJnYmEoMCwgMCwgMCwgMC40NSk7XHJcblx0XHRcdFx0dHJhbnNmb3JtOiB0cmFuc2xhdGVYKDBweCk7XHJcblx0XHRcdFx0b3BhY2l0eTogMTtcclxuXHRcdFx0XHR0cmFuc2l0aW9uOiAxcyBhbGw7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdC5wcm9kdWN0ID4gaW1nIHtcclxuXHRcdFx0XHRwb3NpdGlvbjogYWJzb2x1dGU7XHJcblx0XHRcdFx0bGVmdDogMDtcclxuXHRcdFx0XHR0b3A6IDA7XHJcblx0XHRcdFx0d2lkdGg6IDEwMCU7XHJcblx0XHRcdFx0aGVpZ2h0OiAxMDAlO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHQucHJvZHVjdCA+IC5wcm9kdWN0LWltYWdlIHtcclxuXHRcdFx0XHR6LWluZGV4OiAwO1xyXG5cdFx0XHRcdHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuXHRcdFx0XHR0b3A6IDA7XHJcblx0XHRcdFx0bGVmdDogMDtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0LnByb2R1Y3QgPiAucHJvZHVjdC1vdmVybGF5ID4gLnByb2R1Y3QtbmFtZSwgXHJcblx0XHRcdC5wcm9kdWN0ID4gLnByb2R1Y3Qtb3ZlcmxheSA+IC5wcm9kdWN0LXByaWNlLFxyXG5cdFx0XHQucHJvZHVjdCA+IC5wcm9kdWN0LW92ZXJsYXkgPiAucHJvZHVjdC1kZWxpdmVyeS10aW1lIHtcclxuXHRcdFx0XHR6LWluZGV4OiAxO1xyXG5cdFx0XHRcdHBvc2l0aW9uOiByZWxhdGl2ZTtcclxuXHRcdFx0XHR0ZXh0LWFsaWduOiBjZW50ZXI7XHJcblx0XHRcdFx0bWFyZ2luLXRvcDogMjVweDtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0LnByb2R1Y3QgPiAucHJvZHVjdC1vdmVybGF5ID4gLmFjdGlvbi1idXR0b25zIHtcclxuXHRcdFx0XHR3aWR0aDogMTAwJTtcclxuXHRcdFx0XHRtYXJnaW4tdG9wOiAxMHB4O1xyXG5cdFx0XHRcdHRleHQtYWxpZ246IGNlbnRlcjtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0LnByb2R1Y3QgPiAucHJvZHVjdC1vdmVybGF5ID4gLmFjdGlvbi1idXR0b25zID4gI2Zhdm9yaXRlIHtcclxuXHRcdFx0XHRtYXJnaW4tbGVmdDogMTBweDtcclxuXHRcdFx0fVxyXG5cclxuXHRcdGA7XHJcblx0ICAgIFxyXG5cdCAgICBET00uYWRkU3R5bGUoJ2VDb21tZXJjZS1Qcm9kdWN0cycsIGNzcyk7XHJcblx0fVxyXG59XG5cbi8qKlxyXG4gKiBUaGUgU2VydmljZXMgT2JqZWN0LCBoYW5kbGVzIHRoZSBzZXJ2aWNlcy5cclxuICovXHJcbmNsYXNzIFNlcnZpY2VzIFxyXG57XHJcblxyXG59XG5cbi8qKlxyXG4gKiBUaGUgZGVmYXVsdCBzZXR0aW5ncyBvZiB0aGUgcGFnaW5hdGlvbi5cclxuICovXHJcbmxldCBkZWZhdWx0U2V0dGluZ3MkMyA9IHtcclxuXHRlbGVtZW50OiAnLnBhZ2luYXRpb24tbGlua3MnLFxyXG5cdGNsYXNzOiAnY29sLXhzLW9mZnNldC00IGNvbC14cy04JyxcclxuXHRwZXJfcGFnZTogNSxcclxuXHR0b3RhbF9pdGVtczogMTAsXHJcbn07XHJcblxyXG4vKipcclxuICogU3RvcmVzIHRoZSBjb250YWluZXIgb2JqZWN0LlxyXG4gKi9cclxubGV0IENvbnRhaW5lciQzO1xyXG5cclxuLyoqXHJcbiAqIFRoZSBQYWdpbmF0aW9uIE9iamVjdCwgaGFuZGxlcyB0aGUgcGFnaW5hdGlvbi5cclxuICovXHJcbmNsYXNzIFBhZ2luYXRpb24gXHJcbntcclxuXHQvKipcclxuXHQgKiBJbml0aWFsaXplIHRoZSBjb250YWluZXIgb2JqZWN0IGFuZCB0aGUgZGVmYXVsdCBzZXR0aW5ncy5cclxuXHQgKi9cclxuXHRjb25zdHJ1Y3Rvcihjb250YWluZXIpIFxyXG5cdHtcclxuXHRcdENvbnRhaW5lciQzID0gY29udGFpbmVyO1xyXG5cdFx0dGhpcy5zZXR1cChkZWZhdWx0U2V0dGluZ3MkMyk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBTZXQgdGhlIFBhZ2luYXRpb24gb2JqZWN0IHVwLlxyXG5cdCAqL1xyXG5cdHNldHVwKHNldHRpbmdzKVxyXG5cdHtcclxuXHRcdGlmKHR5cGVvZiBzZXR0aW5ncyAhPSAnb2JqZWN0Jykge1xyXG5cdFx0XHR0aHJvdyBuZXcgSW52YWxpZEFyZ3VtZW50RXhjZXB0aW9uJDE7XHJcblx0XHR9XHJcblxyXG5cdFx0dGhpcy5zZXR0aW5ncyA9IENvbW1vbi5leHRlbmQoZGVmYXVsdFNldHRpbmdzJDMsIHNldHRpbmdzKTtcclxuXHJcblx0XHR0aGlzLnRvdGFsUGFnZXMgPSB0aGlzLmNhbGN1bGF0ZVRvdGFsUGFnZXModGhpcy5zZXR0aW5ncy5wZXJfcGFnZSwgdGhpcy5zZXR0aW5ncy50b3RhbF9pdGVtcyk7XHJcblx0XHRcclxuXHRcdHRoaXMuc2V0RWxlbWVudCh0aGlzLnNldHRpbmdzLmVsZW1lbnQpO1xyXG5cdFx0dGhpcy5yZXBsYWNlTGlua3ModGhpcy5saW5rcyk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBTZXRzIHRoZSB3cmFwcGVyIGVsZW1lbnQuXHJcblx0ICovXHJcblx0c2V0RWxlbWVudChzZWxlY3RvcilcclxuXHR7XHJcblx0XHR0aGlzLndyYXBwZXIgPSBET00uZWxlbWVudChzZWxlY3Rvcik7XHJcblx0XHRcclxuXHRcdERPTS5hZGRDbGFzcyh0aGlzLndyYXBwZXIsIHRoaXMuc2V0dGluZ3MuY2xhc3MpO1xyXG5cclxuXHRcdHRoaXMubGlua3MgPSB0aGlzLmNyZWF0ZUxpbmtzKCk7XHJcblx0XHR0aGlzLmJpbmRFdmVudExpc3RlbmVycyh0aGlzLmxpbmtzKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFJlcGxhY2VzIHRoZSBsaW5rcyBpbiB0aGUgd3JhcHBlci5cclxuXHQgKi9cclxuXHRyZXBsYWNlTGlua3MobGlua3MpXHJcblx0e1xyXG5cdFx0dGhpcy53cmFwcGVyLmlubmVySFRNTCA9ICcnO1xyXG5cdFx0dGhpcy53cmFwcGVyLmFwcGVuZENoaWxkKGxpbmtzKTtcclxuXHR9XHJcblxyXG5cdGNhbGN1bGF0ZVRvdGFsUGFnZXMocGVyUGFnZSwgdG90YWxJdGVtcylcclxuXHR7XHJcblx0XHRwZXJQYWdlID0gcGFyc2VJbnQocGVyUGFnZSk7XHJcblx0XHR0b3RhbEl0ZW1zID0gcGFyc2VJbnQodG90YWxJdGVtcyk7XHJcblxyXG5cdFx0cmV0dXJuIE1hdGguY2VpbCh0b3RhbEl0ZW1zIC8gcGVyUGFnZSk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBCaW5kcyB0aGUgYnV0dG9ucyBldmVudHMgbGlzdGVuZXJzLlxyXG5cdCAqL1xyXG5cdGJpbmRFdmVudExpc3RlbmVycyhsaW5rcykgXHJcblx0e1xyXG5cdFx0bGV0IGluc3RhbmNlID0gdGhpcztcclxuXHRcdGxldCBQcm9kdWN0cyA9IENvbnRhaW5lciQzLmdldEluc3RhbmNlKCdQcm9kdWN0cycpO1xyXG5cclxuXHRcdHRoaXMubmV4dC5jaGlsZE5vZGVzWzBdLm9uY2xpY2sgPSBmdW5jdGlvbihldmVudCkge1xyXG5cdFx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuXHRcdFx0UHJvZHVjdHMuZ2V0UHJvZHVjdHNCeVBhZ2UoaW5zdGFuY2UuY3VycmVudCsxKS50aGVuKGZ1bmN0aW9uKHByb2R1Y3RzKSB7XHJcblx0XHRcdFx0UHJvZHVjdHMucmVwbGFjZUl0ZW1zKHByb2R1Y3RzKTtcclxuXHRcdFx0fSk7XHJcblxyXG5cdFx0XHRpbnN0YW5jZS5zZXRDdXJyZW50KGluc3RhbmNlLmN1cnJlbnQrMSk7XHJcblx0XHR9O1xyXG5cclxuXHRcdHRoaXMucHJldmlvdXMuY2hpbGROb2Rlc1swXS5vbmNsaWNrID0gZnVuY3Rpb24oZXZlbnQpIHtcclxuXHRcdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuXHRcdFx0XHJcblx0XHRcdFByb2R1Y3RzLmdldFByb2R1Y3RzQnlQYWdlKGluc3RhbmNlLmN1cnJlbnQtMSkudGhlbihmdW5jdGlvbihwcm9kdWN0cykge1xyXG5cdFx0XHRcdFByb2R1Y3RzLnJlcGxhY2VJdGVtcyhwcm9kdWN0cyk7XHJcblx0XHRcdH0pO1xyXG5cclxuXHRcdFx0aW5zdGFuY2Uuc2V0Q3VycmVudChpbnN0YW5jZS5jdXJyZW50LTEpO1xyXG5cdFx0fTtcclxuXHJcblx0XHRmb3IodmFyIGkgPSAwOyBpIDwgdGhpcy5wYWdlcy5sZW5ndGg7IGkrKykge1xyXG5cdFx0XHR0aGlzLnBhZ2VzW2ldLmNoaWxkTm9kZXNbMF0ub25jbGljayA9IGZ1bmN0aW9uKGV2ZW50KSB7XHJcblx0XHRcdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuXHRcdFx0XHR2YXIgcGFnZU51bWJlciA9IHRoaXMuZ2V0QXR0cmlidXRlKCdkYXRhLXBhZ2UtbnInKTtcclxuXHRcdFx0XHRcclxuXHRcdFx0XHRQcm9kdWN0cy5nZXRQcm9kdWN0c0J5UGFnZShwYWdlTnVtYmVyKS50aGVuKGZ1bmN0aW9uKHByb2R1Y3RzKSB7XHJcblx0XHRcdFx0XHRQcm9kdWN0cy5yZXBsYWNlSXRlbXMocHJvZHVjdHMpO1xyXG5cdFx0XHRcdH0pO1xyXG5cdFx0XHRcdFxyXG5cdFx0XHRcdGluc3RhbmNlLnNldEN1cnJlbnQocGFnZU51bWJlcik7XHJcblx0XHRcdH07XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBTZXRzIHRoZSBjdXJyZW50IHBhZ2UuXHJcblx0ICovXHJcblx0c2V0Q3VycmVudChwYWdlTnVtYmVyKSBcclxuXHR7XHJcblx0XHRpZih0aGlzLm5vdEluUGFnZVJhbmdlKHBhZ2VOdW1iZXIpKSB7XHJcblx0XHRcdHJldHVybjtcclxuXHRcdH1cclxuXHJcblx0XHR0aGlzLmN1cnJlbnQgPSBwYXJzZUludChwYWdlTnVtYmVyKTtcclxuXHRcdHRoaXMuY2hhbmdlVXJsKHBhZ2VOdW1iZXIpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogR2V0cyB0aGUgY3VycmVudCBwYWdlLlxyXG5cdCAqL1xyXG5cdGdldEN1cnJlbnQoKSBcclxuXHR7XHJcblx0XHRyZXR1cm4gdGhpcy5jdXJyZW50O1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQ3JlYXRlcyB0aGUgcGFnaW5hdGlvbiBsaW5rcy5cclxuXHQgKi9cclxuXHRjcmVhdGVMaW5rcygpIFxyXG5cdHtcdFxyXG5cdFx0bGV0IHVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndWwnKTtcclxuXHRcdFxyXG5cdFx0dGhpcy5wYWdlcyA9IHRoaXMuY3JlYXRlUGFnZUxpbmtzKCk7XHJcblx0XHR0aGlzLnByZXZpb3VzID0gdGhpcy5jcmVhdGVQcmV2aW91c0J1dHRvbigpO1xyXG5cdFx0dGhpcy5uZXh0ID0gdGhpcy5jcmVhdGVOZXh0QnV0dG9uKCk7XHJcblxyXG5cdFx0dWwuY2xhc3NOYW1lID0gJ3BhZ2luYXRpb24nO1xyXG5cdFx0dWwuYXBwZW5kQ2hpbGQodGhpcy5wcmV2aW91cyk7XHJcblxyXG5cdFx0dGhpcy5wYWdlcy5mb3JFYWNoKGZ1bmN0aW9uKHBhZ2UpIHtcclxuXHRcdFx0dWwuYXBwZW5kQ2hpbGQocGFnZSk7XHJcblx0XHR9KTtcclxuXHJcblx0XHR1bC5hcHBlbmRDaGlsZCh0aGlzLm5leHQpO1xyXG5cclxuXHRcdHJldHVybiB1bDtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIENyZWF0ZXMgdGhlIHBhZ2VzIGl0ZW0gbGlua3MuXHJcblx0ICovXHJcblx0Y3JlYXRlUGFnZUxpbmtzKCkgXHJcblx0e1xyXG5cdFx0dmFyIHBhZ2VzID0gW107XHJcblxyXG5cdFx0Zm9yKHZhciBpID0gMTsgaSA8PSB0aGlzLnRvdGFsUGFnZXM7IGkrKykge1xyXG5cdFx0XHR2YXIgcGFnZUl0ZW0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaScpO1xyXG5cdFx0XHR2YXIgbGluayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKTtcclxuXHRcdFx0cGFnZUl0ZW0uY2xhc3NOYW1lID0gJ3BhZ2UtaXRlbSc7XHJcblx0XHRcdGxpbmsuY2xhc3NOYW1lID0gJ3BhZ2UtbGluayc7XHJcblx0XHRcdGxpbmsuc2V0QXR0cmlidXRlKCdocmVmJywgJz9wYWdlPScrIGkpO1xyXG5cdFx0XHRsaW5rLnNldEF0dHJpYnV0ZSgnZGF0YS1wYWdlLW5yJywgaSk7XHJcblx0XHRcdGxpbmsuaW5uZXJIVE1MID0gaTtcclxuXHRcdFx0cGFnZUl0ZW0uYXBwZW5kQ2hpbGQobGluayk7XHJcblx0XHRcdHBhZ2VzLnB1c2gocGFnZUl0ZW0pO1xyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiBwYWdlcztcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIENyZWF0ZXMgdGhlIHByZXZpb3VzIGJ1dHRvbiBsaW5rLlxyXG5cdCAqL1xyXG5cdGNyZWF0ZVByZXZpb3VzQnV0dG9uKCkgXHJcblx0e1xyXG5cdFx0dmFyIGxpID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKTtcclxuXHRcdHZhciBsaW5rID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpO1xyXG5cdFx0dmFyIHNwYW4xID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xyXG5cdFx0dmFyIHNwYW4yID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xyXG5cdFx0XHJcblx0XHRcclxuXHRcdGxpLmNsYXNzTmFtZSA9ICdwYWdlLWl0ZW0nO1xyXG5cdFx0bGluay5jbGFzc05hbWUgPSAncGFnZS1saW5rJztcclxuXHRcdHNwYW4yLmNsYXNzTmFtZSA9ICdzci1vbmx5JztcclxuXHJcblx0XHRsaW5rLnNldEF0dHJpYnV0ZSgnaHJlZicsICcnKTtcclxuXHRcdGxpbmsuc2V0QXR0cmlidXRlKCdhcmlhLWxhYmVsJywgJ1ByZXZpb3VzJyk7XHJcblx0XHRzcGFuMS5zZXRBdHRyaWJ1dGUoJ2FyaWEtaGlkZGVuJywgJ3RydWUnKTtcclxuXHJcblx0XHRzcGFuMS5pbm5lckhUTUwgPSAnJmxhcXVvOyc7XHJcblx0XHRzcGFuMi5pbm5lckhUTUwgPSAnUHJldmlvdXMnO1xyXG5cclxuXHRcdGxpbmsuYXBwZW5kQ2hpbGQoc3BhbjEpO1xyXG5cdFx0bGluay5hcHBlbmRDaGlsZChzcGFuMik7XHJcblx0XHRsaS5hcHBlbmRDaGlsZChsaW5rKTtcclxuXHJcblx0XHRyZXR1cm4gbGk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBDcmVhdGVzIHRoZSBuZXh0IGJ1dHRvbiBsaW5rLlxyXG5cdCAqL1xyXG5cdGNyZWF0ZU5leHRCdXR0b24oKSBcclxuXHR7XHJcblx0XHR2YXIgbGkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaScpO1xyXG5cdFx0dmFyIGxpbmsgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJyk7XHJcblx0XHR2YXIgc3BhbjEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XHJcblx0XHR2YXIgc3BhbjIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XHJcblx0XHRcclxuXHRcdGxpLmNsYXNzTmFtZSA9ICdwYWdlLWl0ZW0nO1xyXG5cdFx0bGluay5jbGFzc05hbWUgPSAncGFnZS1saW5rJztcclxuXHRcdHNwYW4yLmNsYXNzTmFtZSA9ICdzci1vbmx5JztcclxuXHJcblx0XHRsaW5rLnNldEF0dHJpYnV0ZSgnaHJlZicsICcnKTtcclxuXHRcdGxpbmsuc2V0QXR0cmlidXRlKCdhcmlhLWxhYmVsJywgJ05leHQnKTtcclxuXHRcdHNwYW4xLnNldEF0dHJpYnV0ZSgnYXJpYS1oaWRkZW4nLCAndHJ1ZScpO1xyXG5cclxuXHRcdHNwYW4xLmlubmVySFRNTCA9ICcmcmFxdW87JztcclxuXHRcdHNwYW4yLmlubmVySFRNTCA9ICdOZXh0JztcclxuXHJcblx0XHRsaW5rLmFwcGVuZENoaWxkKHNwYW4xKTtcclxuXHRcdGxpbmsuYXBwZW5kQ2hpbGQoc3BhbjIpO1xyXG5cdFx0bGkuYXBwZW5kQ2hpbGQobGluayk7XHJcblxyXG5cdFx0cmV0dXJuIGxpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQ2hlY2tzIGlmIHRoZSBnaXZlbiBwYWdlIGlzIGluIHJhbmdlLlxyXG5cdCAqL1xyXG5cdG5vdEluUGFnZVJhbmdlKHBhZ2VOdW1iZXIpIFxyXG5cdHtcclxuXHRcdHJldHVybiAocGFnZU51bWJlciA+IHRoaXMudG90YWxQYWdlcyB8fCBwYWdlTnVtYmVyIDw9IDApIHx8IGlzTmFOKHBhZ2VOdW1iZXIpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQ2hhbmdlcyB0aGUgdXJsIHRvIGEgZ2l2ZW4gcGFnZSBudW1iZXIuXHJcblx0ICovXHJcblx0Y2hhbmdlVXJsKHBhZ2VOdW1iZXIpIFxyXG5cdHtcclxuXHRcdHBhZ2VOdW1iZXIgPSAgcGFnZU51bWJlciB8fCBHRVRfVmFycygpWydwYWdlJ107XHJcblx0XHR3aW5kb3cuaGlzdG9yeS5yZXBsYWNlU3RhdGUoJycsICcnLCB0aGlzLnVwZGF0ZVVSTFBhcmFtZXRlcih3aW5kb3cubG9jYXRpb24uaHJlZiwgJ3BhZ2UnLCBwYWdlTnVtYmVyKSk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBHZXQgdGhlIGdldCB2YXJpYWJsZXMgZnJvbSB0aGUgdXJsLlxyXG5cdCAqL1xyXG5cdEdFVF9WYXJzKCkgXHJcblx0e1xyXG5cdFx0dmFyIHZhcnMgPSB7fTtcclxuXHRcdHZhciBwYXJ0cyA9IHdpbmRvdy5sb2NhdGlvbi5ocmVmLnJlcGxhY2UoL1s/Jl0rKFtePSZdKyk9KFteJl0qKS9naSwgZnVuY3Rpb24obSwga2V5LCB2YWx1ZSkge1xyXG5cdFx0XHR2YXJzW2tleV0gPSB2YWx1ZTtcclxuXHRcdH0pO1xyXG5cclxuXHRcdHJldHVybiB2YXJzO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogTW9kaWZpZXMgdGhlIGdldCBwYXJhbWV0ZXIgaW4gdGhlIHVybC5cclxuXHQgKi9cclxuXHR1cGRhdGVVUkxQYXJhbWV0ZXIodXJsLCBwYXJhbSwgcGFyYW1WYWwpIFxyXG5cdHtcclxuXHQgICAgdmFyIG5ld0FkZGl0aW9uYWxVUkwgPSBcIlwiO1xyXG5cdCAgICB2YXIgdGVtcEFycmF5ID0gdXJsLnNwbGl0KFwiP1wiKTtcclxuXHQgICAgdmFyIGJhc2VVUkwgPSB0ZW1wQXJyYXlbMF07XHJcblx0ICAgIHZhciBhZGRpdGlvbmFsVVJMID0gdGVtcEFycmF5WzFdO1xyXG5cdCAgICB2YXIgdGVtcCA9IFwiXCI7XHJcblxyXG5cdCAgICBpZiAoYWRkaXRpb25hbFVSTCkge1xyXG5cdCAgICAgICAgdGVtcEFycmF5ID0gYWRkaXRpb25hbFVSTC5zcGxpdChcIiZcIik7XHJcblx0ICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRlbXBBcnJheS5sZW5ndGg7IGkrKyl7XHJcblx0ICAgICAgICAgICAgaWYgKHRlbXBBcnJheVtpXS5zcGxpdCgnPScpWzBdICE9IHBhcmFtKXtcclxuXHQgICAgICAgICAgICAgICAgbmV3QWRkaXRpb25hbFVSTCArPSB0ZW1wICsgdGVtcEFycmF5W2ldO1xyXG5cdCAgICAgICAgICAgICAgICB0ZW1wID0gXCImXCI7XHJcblx0ICAgICAgICAgICAgfVxyXG5cdCAgICAgICAgfVxyXG5cdCAgICB9XHJcblxyXG5cdCAgICB2YXIgcm93c1RleHQgPSB0ZW1wICsgXCJcIiArIHBhcmFtICsgXCI9XCIgKyBwYXJhbVZhbDtcclxuXHQgICAgcmV0dXJuIGJhc2VVUkwgKyBcIj9cIiArIG5ld0FkZGl0aW9uYWxVUkwgKyByb3dzVGV4dDtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFJlc2V0cyB0aGUgcGFnaW5hdGlvbi5cclxuXHQgKi9cclxuXHRyZXNldCgpIFxyXG5cdHtcclxuXHRcdHRoaXMuc2V0Q3VycmVudCgxKTtcclxuXHRcdHRoaXMuY2hhbmdlVXJsKDEpO1xyXG5cdH1cclxufVxuXG4vKipcclxuICogVGhlIGRlZmF1bHQgc2V0dGluZ3Mgb2YgdGhlIGNhcnQuXHJcbiAqL1xyXG5sZXQgZGVmYXVsdFNldHRpbmdzJDQgPSB7XHJcblx0ZWxlbWVudDogJy5jYXJ0JyxcclxuXHRwcmV2aWV3X2NsYXNzOiAnJyxcclxuXHRjbGFzczogJycsXHJcblx0d2lkdGg6ICc2MHB4JyxcclxuXHRoZWlnaHQ6ICc2MHB4JyxcclxuXHRwbGFjZW1lbnQ6ICdyaWdodC10b3AnLFxyXG5cdGZpeGVkOiB0cnVlLFxyXG5cdGhvdmVyX2NvbG9yOiAnb3JhbmdlJ1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIFN0b3JlcyB0aGUgY29udGFpbmVyIG9iamVjdC5cclxuICovXHJcbmxldCBDb250YWluZXIkNDtcclxuXHJcbi8qKlxyXG4gKiBUaGUgQ2FydCBPYmplY3QsIGhhbmRsZXMgdGhlIGNhcnQgaWNvbiBhbmQgc2Vzc2lvbnMuXHJcbiAqL1xyXG5jbGFzcyBDYXJ0IFxyXG57XHJcblx0LyoqXHJcblx0ICogSW5pdGlhbGl6ZSB0aGUgZGVmYXVsdCBzZXR0aW5ncywgc2V0dGluZyB0aGUgZWxlbWVudCxcclxuXHQgKiBhbmQgY3JlYXRpbmcgdGhlIHByZXZpZXcgZm9yIHRoZSBjYXJ0cyBkZXRhaWxzLlxyXG5cdCAqL1xyXG5cdGNvbnN0cnVjdG9yKGNvbnRhaW5lcikgXHJcblx0e1xyXG5cdFx0Q29udGFpbmVyJDQgPSBjb250YWluZXI7XHJcblxyXG5cdFx0dGhpcy5wcmV2aWV3RWxlbWVudCA9IHRoaXMuY3JlYXRlUHJldmlld0VsZW1lbnQoKTtcclxuXHRcdHRoaXMuc3ZnSWNvbiA9IGNyZWF0ZUljb24uY2FsbCh0aGlzKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFNldHMgdGhlIG9iamVjdCBieSB0aGUgdXNlcnMgc2V0dGluZy5cclxuXHQgKi9cclxuXHRzZXR1cChzZXR0aW5ncylcclxuXHR7XHJcblx0XHRpZih0eXBlb2Ygc2V0dGluZ3MgIT0gJ29iamVjdCcpIHtcclxuXHRcdFx0dGhyb3cgbmV3IEludmFsaWRBcmd1bWVudEV4Y2VwdGlvbiQxO1xyXG5cdFx0fVxyXG5cclxuXHRcdHRoaXMuc2V0dGluZ3MgPSBDb21tb24uZXh0ZW5kKGRlZmF1bHRTZXR0aW5ncyQ0LCBzZXR0aW5ncyk7XHJcblxyXG5cdFx0dGhpcy5zZXRFbGVtZW50KHRoaXMuc2V0dGluZ3MuZWxlbWVudCk7XHJcblx0XHRET00uYWRkQ2xhc3ModGhpcy5wcmV2aWV3RWxlbWVudCwgJ2Nsb3NlZCcpO1xyXG5cdFx0RE9NLmFkZENsYXNzKHRoaXMucHJldmlld0VsZW1lbnQsIHRoaXMuc2V0dGluZ3MucHJldmlld19jbGFzcyk7XHJcblx0XHR0aGlzLmJpbmRFdmVudExpc3RlbmVycygpO1xyXG5cclxuXHRcdHRoaXMuYWRkU3R5bGVUYWcoKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEJpbmRzIGV2ZXJ0aGluZyB0byB0aGUgZWxlbWVudC5cclxuXHQgKi9cclxuXHRzZXRFbGVtZW50KHNlbGVjdG9yKVxyXG5cdHtcclxuXHRcdHRoaXMuaWNvbiA9IERPTS5lbGVtZW50KHNlbGVjdG9yKTtcclxuXHJcblx0XHRpZiAodGhpcy5pY29uKSB7XHJcblx0XHRcdERPTS5hZGRDbGFzcyh0aGlzLmljb24sIHRoaXMuc2V0dGluZ3MuY2xhc3MpO1xyXG5cdFx0XHRET00uYWRkQ2xhc3ModGhpcy5pY29uLCB0aGlzLnNldHRpbmdzLnBsYWNlbWVudCk7XHJcblx0XHRcdHRoaXMuaWNvbi5hcHBlbmRDaGlsZCh0aGlzLnN2Z0ljb24pO1xyXG5cdFx0XHR0aGlzLmljb24uYXBwZW5kQ2hpbGQodGhpcy5wcmV2aWV3RWxlbWVudCk7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBDcmVhdGVzIHRoZSBjYXJ0IGRldGFpbHMgcHJldmlldyBlbGVtZW50LlxyXG5cdCAqL1xyXG5cdGNyZWF0ZVByZXZpZXdFbGVtZW50KClcclxuXHR7XHJcblx0XHRsZXQgcHJldmlld0VsZW1lbnQgPSBET00uY3JlYXRlRWxlbWVudCgnZGl2Jywge1xyXG5cdFx0XHRpZDogJ3ByZXZpZXcnXHJcblx0XHR9KTtcclxuXHJcblx0XHRyZXR1cm4gcHJldmlld0VsZW1lbnQ7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBBZGQgdGhlIGVDb21tZXJjZSBzdHlsZSB0YWdzIHRvIHRoZSBET00uXHJcblx0ICovXHJcblx0YWRkU3R5bGVUYWcoKSBcclxuXHR7XHJcblx0XHRpZihET00uZWxlbWVudCgnI2VDb21tZXJjZS1DYXJ0JykpIHtcclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0fVxyXG5cclxuXHRcdGxldCBwb3NpdGlvbiA9ICh0aGlzLnNldHRpbmdzLmZpeGVkKSA/ICdmaXhlZCcgOiAnYWJzb2x1dGUnO1xyXG5cclxuXHRcdGxldCBjc3MgPSBgXHJcblx0XHRcdCR7dGhpcy5zZXR0aW5ncy5lbGVtZW50fSB7XHJcblx0XHRcdFx0cG9zaXRpb246ICR7cG9zaXRpb259O1xyXG5cdFx0XHRcdGN1cnNvcjogcG9pbnRlcjtcclxuXHRcdFx0XHRjb2xvcjogI2ZmZmZmZjtcclxuXHRcdFx0XHR6LWluZGV4OiA5OTg7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdCR7dGhpcy5zZXR0aW5ncy5lbGVtZW50fSA+IHN2ZyB7XHJcblx0XHRcdFx0d2lkdGg6ICR7dGhpcy5zZXR0aW5ncy53aWR0aH07XHJcblx0XHRcdFx0aGVpZ2h0OiAke3RoaXMuc2V0dGluZ3MuaGVpZ2h0fTtcclxuXHRcdFx0XHR0cmFuc2l0aW9uOiBmaWxsIDAuM3M7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdCR7dGhpcy5zZXR0aW5ncy5lbGVtZW50fSA+IHN2Zzpob3ZlciB7XHJcblx0XHRcdFx0ZmlsbDogJHt0aGlzLnNldHRpbmdzLmhvdmVyX2NvbG9yfTtcclxuXHRcdFx0XHR0cmFuc2l0aW9uOiBmaWxsIDAuM3M7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdCR7dGhpcy5zZXR0aW5ncy5lbGVtZW50fS50b3AtcmlnaHQsXHJcblx0XHRcdCR7dGhpcy5zZXR0aW5ncy5lbGVtZW50fS5yaWdodC10b3Age1xyXG5cdFx0XHRcdHJpZ2h0OiAxMHB4O1xyXG5cdFx0XHRcdHRvcDogMTBweDtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0JHt0aGlzLnNldHRpbmdzLmVsZW1lbnR9LmxlZnQtdG9wLFxyXG5cdFx0XHQke3RoaXMuc2V0dGluZ3MuZWxlbWVudH0udG9wLWxlZnQge1xyXG5cdFx0XHRcdGxlZnQ6IDEwcHg7XHJcblx0XHRcdFx0dG9wOiAxMHB4O1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHQke3RoaXMuc2V0dGluZ3MuZWxlbWVudH0gPiAjcHJldmlldyB7XHJcblx0XHRcdFx0cG9zaXRpb246ICR7cG9zaXRpb259O1xyXG5cdFx0XHRcdHotaW5kZXg6IDk5OTk7XHJcblx0XHRcdFx0dG9wOiBjYWxjKDEwcHggKyAke3RoaXMuc2V0dGluZ3MuaGVpZ2h0fSk7XHJcblx0XHRcdFx0dHJhbnNmb3JtOiB0cmFuc2xhdGVYKDYwcHgpO1xyXG5cdFx0XHRcdGhlaWdodDogNDAwcHg7XHJcblx0XHRcdFx0d2lkdGg6IDMwMHB4O1xyXG5cdFx0XHRcdGJvcmRlcjogMXB4IHNvbGlkICNlNGU0ZTQ7XHJcblx0XHRcdFx0YmFja2dyb3VuZDogI2ZmZmZmZjtcclxuXHRcdFx0XHR0cmFuc2l0aW9uOiB0cmFuc2Zvcm0gMXMsIHZpc2liaWxpdHkgMXM7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdCR7dGhpcy5zZXR0aW5ncy5lbGVtZW50fSA+ICNwcmV2aWV3Lm9wZW5lZCB7XHJcblx0XHRcdFx0dmlzaWJpbGl0eTogdmlzaWJsZTtcclxuXHRcdFx0XHR0cmFuc2Zvcm06IHRyYW5zbGF0ZVgoLTI0MHB4KTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0JHt0aGlzLnNldHRpbmdzLmVsZW1lbnR9ID4gI3ByZXZpZXcuY2xvc2VkIHtcclxuXHRcdFx0XHR2aXNpYmlsaXR5OiBoaWRkZW47XHJcblx0XHRcdFx0dHJhbnNmb3JtOiB0cmFuc2xhdGVYKDYwcHgpO1xyXG5cdFx0XHR9XHJcblx0XHRgO1xyXG5cdCAgICBcclxuXHQgICAgRE9NLmFkZFN0eWxlKCdlQ29tbWVyY2UtQ2FydCcsIGNzcyk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBCaW5kcyBldmVudCBsaXN0ZW5lcnMgdG8gdGhlIGNhcnQgaWNvbi5cclxuXHQgKi9cclxuXHRiaW5kRXZlbnRMaXN0ZW5lcnMoKVxyXG5cdHtcclxuXHRcdGlmKHRoaXMuc3ZnSWNvbiA9PSBudWxsKSB7XHJcblx0XHRcdHJldHVybjtcclxuXHRcdH1cclxuXHJcblx0XHR0aGlzLnN2Z0ljb24ub25jbGljayA9IGZ1bmN0aW9uKGV2ZW50KSB7XHJcblx0XHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcblx0XHRcdERPTS50b2dnbGVDbGFzcyh0aGlzLnByZXZpZXdFbGVtZW50LCAnb3BlbmVkJywgJ2Nsb3NlZCcpO1xyXG5cdFx0fS5iaW5kKHRoaXMpO1xyXG5cclxuXHRcdHRoaXMucHJldmlld0VsZW1lbnQub25tb3VzZW91dCA9IGZ1bmN0aW9uKGV2ZW50KSB7XHJcblx0XHRcdGNsb3NlLmNhbGwodGhpcywgZXZlbnQpO1xyXG5cdFx0fS5iaW5kKHRoaXMpO1xyXG5cdH1cclxufVxyXG5cclxuZnVuY3Rpb24gY2xvc2UoZXZlbnQpIHtcclxuXHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdERPTS5zd2l0Y2hDbGFzc2VzKHRoaXMucHJldmlld0VsZW1lbnQsICdvcGVuZWQnLCAnY2xvc2VkJyk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNyZWF0ZUljb24oKSB7XHJcblx0bGV0IHN2ZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnROUyhcImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIsIFwic3ZnXCIpO1xyXG5cdGxldCBnID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKFwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiwgXCJnXCIpO1xyXG5cdGxldCBwYXRoID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKFwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiwgXCJwYXRoXCIpO1xyXG5cclxuXHRzdmcuc2V0QXR0cmlidXRlKCd2ZXJzaW9uJywgJzEuMScpO1xyXG5cdHN2Zy5zZXRBdHRyaWJ1dGUoJ3htbG5zJywgJ2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJyk7XHJcblx0c3ZnLnNldEF0dHJpYnV0ZSgneG1sbnM6eGxpbmsnLCAnaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluaycpO1xyXG5cdHN2Zy5zZXRBdHRyaWJ1dGUoJ3gnLCAnMHB4Jyk7XHJcblx0c3ZnLnNldEF0dHJpYnV0ZSgneScsICcwcHgnKTtcclxuXHRzdmcuc2V0QXR0cmlidXRlKCd3aWR0aCcsICc0NDYuODQzcHgnKTtcclxuXHRzdmcuc2V0QXR0cmlidXRlKCdoZWlnaHQnLCAnNDQ2Ljg0M3B4Jyk7XHJcblx0c3ZnLnNldEF0dHJpYnV0ZSgndmlld0JveCcsICcwIDAgNDQ2Ljg0MyA0NDYuODQzJyk7XHJcblx0c3ZnLnNldEF0dHJpYnV0ZSgnc3R5bGUnLCAnZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA0NDYuODQzIDQ0Ni44NDM7Jyk7XHJcblx0c3ZnLnNldEF0dHJpYnV0ZSgneG1sOnNwYWNlJywgJ3ByZXNlcnZlJyk7XHJcblxyXG5cdHBhdGguc2V0QXR0cmlidXRlKCdkJywgJ000NDQuMDksOTMuMTAzYy0yLjY5OC0zLjY5OS03LjAwNi01Ljg4OC0xMS41ODQtNS44ODhIMTA5LjkyYy0wLjYyNSwwLTEuMjQ5LDAuMDM4LTEuODUsMC4xMTlsLTEzLjI3Ni0zOC4yN2MtMS4zNzYtMy45NTgtNC40MDYtNy4xMTMtOC4zLTguNjQ2TDE5LjU4NiwxNC4xMzRjLTcuMzc0LTIuODg3LTE1LjY5NSwwLjczNS0xOC41OTEsOC4xYy0yLjg5MSw3LjM2OSwwLjczLDE1LjY5NSw4LjEsMTguNTkxbDYwLjc2OCwyMy44NzJsNzQuMzgxLDIxNC4zOTljLTMuMjgzLDEuMTQ0LTYuMDY1LDMuNjYzLTcuMzMyLDcuMTg3bC0yMS41MDYsNTkuNzM5Yy0xLjMxOCwzLjY2My0wLjc3NSw3LjczMywxLjQ2OCwxMC45MTZjMi4yNCwzLjE4Myw1Ljg4Myw1LjA3OCw5Ljc3Myw1LjA3OGgxMS4wNDRjLTYuODQ0LDcuNjE2LTExLjA0NCwxNy42NDYtMTEuMDQ0LDI4LjY3NWMwLDIzLjcxOCwxOS4yOTgsNDMuMDEyLDQzLjAxMiw0My4wMTJzNDMuMDEyLTE5LjI5NCw0My4wMTItNDMuMDEyYzAtMTEuMDI5LTQuMi0yMS4wNTktMTEuMDQ0LTI4LjY3NWg5My43NzZjLTYuODQ3LDcuNjE2LTExLjA0OCwxNy42NDYtMTEuMDQ4LDI4LjY3NWMwLDIzLjcxOCwxOS4yOTQsNDMuMDEyLDQzLjAxMyw0My4wMTJjMjMuNzE4LDAsNDMuMDEyLTE5LjI5NCw0My4wMTItNDMuMDEyYzAtMTEuMDI5LTQuMi0yMS4wNTktMTEuMDQzLTI4LjY3NWgxMy40MzNjNi41OTksMCwxMS45NDctNS4zNDksMTEuOTQ3LTExLjk0OGMwLTYuNTk5LTUuMzQ5LTExLjk0Ny0xMS45NDctMTEuOTQ3SDE0My42NDdsMTMuMzE5LTM2Ljk5NmMxLjcyLDAuNzI0LDMuNTc4LDEuMTUyLDUuNTIzLDEuMTUyaDIxMC4yNzhjNi4yMzQsMCwxMS43NTEtNC4wMjcsMTMuNjUtOS45NTlsNTkuNzM5LTE4Ni4zODdDNDQ3LjU1NywxMDEuNTY3LDQ0Ni43ODgsOTYuODAyLDQ0NC4wOSw5My4xMDN6IE0xNjkuNjU5LDQwOS44MDdjLTEwLjU0MywwLTE5LjExNi04LjU3My0xOS4xMTYtMTkuMTE2czguNTczLTE5LjExNywxOS4xMTYtMTkuMTE3czE5LjExNiw4LjU3NCwxOS4xMTYsMTkuMTE3UzE4MC4yMDIsNDA5LjgwNywxNjkuNjU5LDQwOS44MDd6IE0zMjcuMzY3LDQwOS44MDdjLTEwLjU0MywwLTE5LjExNy04LjU3My0xOS4xMTctMTkuMTE2czguNTc0LTE5LjExNywxOS4xMTctMTkuMTE3YzEwLjU0MiwwLDE5LjExNiw4LjU3NCwxOS4xMTYsMTkuMTE3UzMzNy45MDksNDA5LjgwNywzMjcuMzY3LDQwOS44MDd6IE00MDIuNTIsMTQ4LjE0OWgtNzMuMTYxVjExNS44OWg4My40OTlMNDAyLjUyLDE0OC4xNDl6IE0zODEuNDUzLDIxMy44NjFoLTUyLjA5NHYtMzcuMDM4aDYzLjk2N0wzODEuNDUzLDIxMy44NjF6IE0yMzQuNTcxLDIxMy44NjF2LTM3LjAzOGg2Ni4xMTN2MzcuMDM4SDIzNC41NzF6IE0zMDAuNjg0LDI0Mi41Mzh2MzEuMDY0aC02Ni4xMTN2LTMxLjA2NEgzMDAuNjg0eiBNMTM5LjExNSwxNzYuODIzaDY2Ljc4NHYzNy4wMzhoLTUzLjkzM0wxMzkuMTE1LDE3Ni44MjN6IE0yMzQuNTcxLDE0OC4xNDlWMTE1Ljg5aDY2LjExM3YzMi4yNTlIMjM0LjU3MXogTTIwNS44OTgsMTE1Ljg5djMyLjI1OWgtNzYuNzM0bC0xMS4xOTEtMzIuMjU5SDIwNS44OTh6IE0xNjEuOTE2LDI0Mi41MzhoNDMuOTgydjMxLjA2NGgtMzMuMjA2TDE2MS45MTYsMjQyLjUzOHogTTMyOS4zNTksMjczLjYwM3YtMzEuMDY0aDQyLjkwOWwtOS45NTUsMzEuMDY0SDMyOS4zNTl6Jyk7XHJcblxyXG5cdGcuYXBwZW5kQ2hpbGQocGF0aCk7XHJcblx0c3ZnLmFwcGVuZENoaWxkKGcpO1xyXG5cclxuXHJcblx0cmV0dXJuIHN2ZztcclxufVxuXG5sZXQgaW5pdGFsaXplZCA9IGZhbHNlO1xuXG5sZXQgZGVmYXVsdFNldHRpbmdzID0ge1xuXHRpbXBvcnRCb290c3RyYXA6IGZhbHNlLFxuXHRjb21wb25lbnRzOiBbJ1Byb2R1Y3RzJywgJ1NlcnZpY2VzJywgJ0ZpbHRlcicsICdQYWdpbmF0aW9uJ11cbn07XG5cbmNsYXNzIGVDb21tZXJjZVxue1xuXHRjb25zdHJ1Y3RvcihzZXR0aW5ncylcblx0e1xuXHRcdEV4Y2VwdGlvbkhhbmRsZXIuaW5pdGFsaXplKCk7XG5cblx0XHRpZih0eXBlb2Ygc2V0dGluZ3MgIT0gJ29iamVjdCcpIHtcblx0XHRcdHRocm93IG5ldyBJbnZhbGlkQXJndW1lbnRFeGNlcHRpb24kMTtcblx0XHR9XG5cblx0XHR0aGlzLmNvbnRhaW5lciA9IG5ldyBDb250YWluZXI7XG5cdFx0dGhpcy5zZXR0aW5ncyA9IENvbW1vbi5leHRlbmQoZGVmYXVsdFNldHRpbmdzLCBzZXR0aW5ncyk7XG5cdFx0XG5cdFx0YmluZENvbXBvbmVudHNEZXBlbmRlbmNpZXMuY2FsbCh0aGlzLCBzZXR0aW5ncy5jb21wb25lbnRzKTtcblxuXHRcdGluaXRhbGl6ZWQgPSB0cnVlO1xuXG5cdFx0cmV0dXJuIG5ldyBQcm94eSh0aGlzLCB7XG5cdFx0XHRnZXQ6IGZ1bmN0aW9uKHRhcmdldCwgb2JqZWN0KSB7XG5cdFx0XHRcdHJldHVybiB0YXJnZXQuY29udGFpbmVyLm1ha2Uob2JqZWN0KTtcblx0XHRcdH1cblx0XHR9KTtcblx0fVxufVxuXG4vKipcbiAqIEJpbmRzIGNvbXBvbmVudHMgZGVwZW5kZW5jaWVzLlxuICovXG5mdW5jdGlvbiBiaW5kQ29tcG9uZW50c0RlcGVuZGVuY2llcyhjb21wb25lbnRzKSB7XG5cdHRoaXMuY29udGFpbmVyLmJpbmQoJ0ZpbHRlcicsIGZ1bmN0aW9uKGNvbnRhaW5lcikge1xuXHRcdHJldHVybiBuZXcgRmlsdGVyKGNvbnRhaW5lcik7XG5cdH0pO1xuXHRcblx0dGhpcy5jb250YWluZXIuYmluZCgnU2VydmljZXMnLCBmdW5jdGlvbihjb250YWluZXIpIHsgXG5cdFx0cmV0dXJuIG5ldyBTZXJ2aWNlcyhjb250YWluZXIpO1xuXHR9KTtcblxuXHR0aGlzLmNvbnRhaW5lci5iaW5kKCdQYWdpbmF0aW9uJywgZnVuY3Rpb24oY29udGFpbmVyKSB7XG5cdFx0cmV0dXJuIG5ldyBQYWdpbmF0aW9uKGNvbnRhaW5lcik7XG5cdH0pO1xuXG5cdHRoaXMuY29udGFpbmVyLmJpbmQoJ1Byb2R1Y3RzJywgZnVuY3Rpb24oY29udGFpbmVyKSB7XG5cdFx0cmV0dXJuIG5ldyBQcm9kdWN0cyhjb250YWluZXIsIGNvbnRhaW5lci5tYWtlKCdQYWdpbmF0aW9uJykpO1xuXHR9KTtcblxuXHR0aGlzLmNvbnRhaW5lci5iaW5kKCdDYXJ0JywgZnVuY3Rpb24oY29udGFpbmVyKSB7XG5cdFx0cmV0dXJuIG5ldyBDYXJ0KGNvbnRhaW5lcik7XG5cdH0pO1xufVxuXG5yZXR1cm4gZUNvbW1lcmNlO1xuXG59KCkpO1xuIl19
