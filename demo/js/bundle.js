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
				return queryElement.call(this, document, selector);
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

			/**
    * Toggles the given classes.
    */

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

			/**
    * Finds an element inside of parent.
    */

		}, {
			key: 'find',
			value: function find(element, selector) {
				return queryElement(element, selector);
			}
		}]);

		return DOM;
	}();

	/**
  * Queries an element from the DOM.
  */


	function queryElement(parent, selector) {
		var element = parent.querySelectorAll(selector);

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

			/**
   	* Sets a cookie. 
   */

		}, {
			key: 'createCookie',
			value: function createCookie(name, value, days) {
				if (value.constructor.name == 'Array') {
					value = JSON.stringify(value);
				}

				var expires = void 0;

				if (days) {
					var date = new Date();
					date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
					expires = "; expires=" + date.toGMTString();
				} else {
					expires = "";
				}

				document.cookie = name + "=" + value + expires + "; path=/";
			}

			/**
    * Retrieves the cookie by name.
    */

		}, {
			key: 'getCookie',
			value: function getCookie(name) {
				if (document.cookie.length > 0) {
					var c_start = document.cookie.indexOf(name + "=");

					if (c_start != -1) {
						c_start = c_start + name.length + 1;
						var c_end = document.cookie.indexOf(";", c_start);

						if (c_end == -1) {
							c_end = document.cookie.length;
						}

						return JSON.parse(unescape(document.cookie.substring(c_start, c_end)));
					}
				}

				return [];
			}

			/**
    * Generates a random string.
    */

		}, {
			key: 'randomStr',
			value: function randomStr(length) {
				var string = '';
				var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

				for (var i = 0; i < length; i++) {
					string += possible.charAt(Math.floor(Math.random() * possible.length));
				}

				return string;
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
		add_button_class: 'btn btn-primary',
		favorite_button_class: 'btn btn-danger',
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
					class: this.settings.add_button_class,
					type: 'button',
					text: '+'
				});

				var favorite = DOM.createElement('button', {
					id: 'favorite',
					class: this.settings.favorite_button_class,
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
			// this.setup(defaultSettings);
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
		cookie_name: 'cart',
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
			this.items = [];
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

				this.setCartCookie(this.settings.cookie_name);
			}
		}, {
			key: 'addItem',
			value: function addItem(item) {
				this.items = Common.getCookie('cart');

				this.items.push(item);

				Common.createCookie(this.settings.cookie_name, this.items, 2);
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
		}, {
			key: 'setCartCookie',
			value: function setCartCookie(name) {
				if (Common.getCookie(name)) {
					return;
				}

				Common.createCookie('cart', [], 2);
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
				if (!Common.in_array(object, settings.components)) {
					throw new ComponentNotRegisteredException();
				}

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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVDb21tZXJjZS5qcyJdLCJuYW1lcyI6WyJlQ29tbWVyY2UiLCJJbnZhbGlkQXJndW1lbnRFeGNlcHRpb24kMSIsImNvbnNvbGUiLCJlcnJvciIsImNvbnN0cnVjdG9yIiwibmFtZSIsIkVycm9yIiwiRE9NIiwic3RyaW5nIiwicmVwbGFjZSIsImVsZW1lbnQiLCJjbGFzc05hbWUiLCJuZXdDbGFzc05hbWUiLCJyZW1vdmVDbGFzcyIsImFkZENsYXNzIiwidW5kZWZpbmVkIiwiY2xhc3NOYW1lcyIsInNwbGl0IiwiZm9yRWFjaCIsImNsYXNzTGlzdCIsImFkZCIsInJlbW92ZSIsInNlbGVjdG9yIiwicXVlcnlFbGVtZW50IiwiY2FsbCIsImRvY3VtZW50IiwiaWQiLCJjc3MiLCJoZWFkIiwiZ2V0RWxlbWVudHNCeVRhZ05hbWUiLCJzdHlsZVRhZyIsImNyZWF0ZUVsZW1lbnQiLCJDU1MiLCJtaW5pZnlDc3MiLCJpbm5lckhUTUwiLCJzZXRBdHRyaWJ1dGUiLCJhcHBlbmRDaGlsZCIsImVsZW1lbnRUeXBlIiwib3B0aW9ucyIsIm9wdGlvbiIsInNlY29uZENsYXNzTmFtZSIsInRvZ2dsZSIsInBhcmVudCIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJsZW5ndGgiLCJFdmVudCIsImNhbGxiYWNrIiwiSW52YWxpZEFyZ3VtZW50RXhjZXB0aW9uIiwiZXZlbnRzIiwiZGF0YSIsIkJhZEV2ZW50Q2FsbEV4Y2VwdGlvbiIsIkFycmF5IiwiQ29tbW9uIiwiY3VycmVudE9iaiIsIm5ld09iaiIsImV4dGVuZGVkIiwicHJvcCIsIk9iamVjdCIsInByb3RvdHlwZSIsImhhc093blByb3BlcnR5IiwibmVlZGxlIiwiaHlzdGFjayIsImkiLCJvYmplY3QiLCJ0b0xvd2VyQ2FzZSIsInZhbHVlIiwiZGF5cyIsIkpTT04iLCJzdHJpbmdpZnkiLCJleHBpcmVzIiwiZGF0ZSIsIkRhdGUiLCJzZXRUaW1lIiwiZ2V0VGltZSIsInRvR01UU3RyaW5nIiwiY29va2llIiwiY19zdGFydCIsImluZGV4T2YiLCJjX2VuZCIsInBhcnNlIiwidW5lc2NhcGUiLCJzdWJzdHJpbmciLCJwb3NzaWJsZSIsImNoYXJBdCIsIk1hdGgiLCJmbG9vciIsInJhbmRvbSIsIkludmFsaWRCaW5kaW5nRXhjZXB0aW9uIiwiaW5zdGFuY2VzIiwiQ29udGFpbmVyIiwia2V5IiwiY29uY3JldGUiLCJiaW5kIiwiaW5zdGFuY2UiLCJpbnN0YW5jZUV4aXN0IiwiZ2V0SW5zdGFuY2UiLCJzZXRJbnN0YW5jZSIsIkNvbXBvbmVudHNFeGNlcHRpb24iLCJCYWRFdmVudENhbGxFeGNlcHRpb24kMSIsIkNvbXBvbmVudE5vdFJlZ2lzdGVyZWRFeGNlcHRpb24iLCJFeGNlcHRpb25IYW5kbGVyIiwid2luZG93Iiwib25lcnJvciIsIm1lc3NhZ2UiLCJzb3VyY2UiLCJsaW5lbm8iLCJjb2xubyIsImRlZmF1bHRTZXR0aW5ncyQxIiwiY2xhc3MiLCJ3aWR0aCIsImhlaWdodCIsIkZpbHRlciIsImNvbnRhaW5lciIsInNldHVwIiwic2V0dGluZ3MiLCJleHRlbmQiLCJzZXRFbGVtZW50Iiwid3JhcHBlciIsImRlZmF1bHRTZXR0aW5ncyQyIiwiaXRlbV9jbGFzcyIsImFkZF9idXR0b25fY2xhc3MiLCJmYXZvcml0ZV9idXR0b25fY2xhc3MiLCJhdHRyaWJ1dGVzIiwidXJsIiwiQ29udGFpbmVyJDIiLCJQcm9kdWN0cyIsInBhZ2luYXRvciIsImFkZFN0eWxlVGFnIiwicmVzZXQiLCJyZXF1ZXN0IiwiZ2V0UHJvZHVjdHNCeVBhZ2UiLCJnZXRDdXJyZW50IiwidGhlbiIsIml0ZW1zIiwicmVwbGFjZUl0ZW1zIiwiY2F0Y2giLCJpc0FycmF5IiwicGVyUGFnZSIsInBlcl9wYWdlIiwic2xpY2UiLCJwcm9kdWN0cyIsImJ1aWxkUHJvZHVjdHMiLCJwYWdlTnVtYmVyIiwiUHJvbWlzZSIsInJlc29sdmUiLCJyZWplY3QiLCJub3RJblBhZ2VSYW5nZSIsInhociIsIlhNTEh0dHBSZXF1ZXN0IiwiQWN0aXZlWE9iamVjdCIsIm9wZW4iLCJzZXRSZXF1ZXN0SGVhZGVyIiwib25yZWFkeXN0YXRlY2hhbmdlIiwicmVhZHlTdGF0ZSIsInN0YXR1cyIsImN1cnJlbnRJdGVtcyIsInJlc3BvbnNlVGV4dCIsInByb2R1Y3QiLCJBZnRlckxvYWRlZCIsInN0YXR1c1RleHQiLCJzZW5kIiwiYXR0cmlidXRlc0NvbGxlY3Rpb24iLCJ0YWdUeXBlIiwiYnVpbHRQcm9kdWN0cyIsImJ1aWxkUHJvZHVjdCIsIm92ZXJsYXkiLCJhdHRyaWJ1dGUiLCJpbl9hcnJheSIsInRhZyIsImltYWdlIiwic3JjIiwia2ViYWJDYXNlIiwiYWRkVG9DYXJ0IiwidHlwZSIsInRleHQiLCJmYXZvcml0ZSIsIm91dGVySFRNTCIsImFkZFN0eWxlIiwiU2VydmljZXMiLCJkZWZhdWx0U2V0dGluZ3MkMyIsInRvdGFsX2l0ZW1zIiwiQ29udGFpbmVyJDMiLCJQYWdpbmF0aW9uIiwidG90YWxQYWdlcyIsImNhbGN1bGF0ZVRvdGFsUGFnZXMiLCJyZXBsYWNlTGlua3MiLCJsaW5rcyIsImNyZWF0ZUxpbmtzIiwiYmluZEV2ZW50TGlzdGVuZXJzIiwidG90YWxJdGVtcyIsInBhcnNlSW50IiwiY2VpbCIsIm5leHQiLCJjaGlsZE5vZGVzIiwib25jbGljayIsImV2ZW50IiwicHJldmVudERlZmF1bHQiLCJjdXJyZW50Iiwic2V0Q3VycmVudCIsInByZXZpb3VzIiwicGFnZXMiLCJnZXRBdHRyaWJ1dGUiLCJjaGFuZ2VVcmwiLCJ1bCIsImNyZWF0ZVBhZ2VMaW5rcyIsImNyZWF0ZVByZXZpb3VzQnV0dG9uIiwiY3JlYXRlTmV4dEJ1dHRvbiIsInBhZ2UiLCJwYWdlSXRlbSIsImxpbmsiLCJwdXNoIiwibGkiLCJzcGFuMSIsInNwYW4yIiwiaXNOYU4iLCJHRVRfVmFycyIsImhpc3RvcnkiLCJyZXBsYWNlU3RhdGUiLCJ1cGRhdGVVUkxQYXJhbWV0ZXIiLCJsb2NhdGlvbiIsImhyZWYiLCJ2YXJzIiwicGFydHMiLCJtIiwicGFyYW0iLCJwYXJhbVZhbCIsIm5ld0FkZGl0aW9uYWxVUkwiLCJ0ZW1wQXJyYXkiLCJiYXNlVVJMIiwiYWRkaXRpb25hbFVSTCIsInRlbXAiLCJyb3dzVGV4dCIsImRlZmF1bHRTZXR0aW5ncyQ0IiwiY29va2llX25hbWUiLCJwcmV2aWV3X2NsYXNzIiwicGxhY2VtZW50IiwiZml4ZWQiLCJob3Zlcl9jb2xvciIsIkNvbnRhaW5lciQ0IiwiQ2FydCIsInByZXZpZXdFbGVtZW50IiwiY3JlYXRlUHJldmlld0VsZW1lbnQiLCJzdmdJY29uIiwiY3JlYXRlSWNvbiIsInNldENhcnRDb29raWUiLCJpdGVtIiwiZ2V0Q29va2llIiwiY3JlYXRlQ29va2llIiwiaWNvbiIsInBvc2l0aW9uIiwidG9nZ2xlQ2xhc3MiLCJvbm1vdXNlb3V0IiwiY2xvc2UiLCJzd2l0Y2hDbGFzc2VzIiwic3ZnIiwiY3JlYXRlRWxlbWVudE5TIiwiZyIsInBhdGgiLCJpbml0YWxpemVkIiwiZGVmYXVsdFNldHRpbmdzIiwiaW1wb3J0Qm9vdHN0cmFwIiwiY29tcG9uZW50cyIsImluaXRhbGl6ZSIsImJpbmRDb21wb25lbnRzRGVwZW5kZW5jaWVzIiwiUHJveHkiLCJnZXQiLCJ0YXJnZXQiLCJtYWtlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsSUFBSUEsWUFBYSxZQUFZO0FBQzdCOztBQUQ2QixLQUd2QkMsMEJBSHVCLEdBSzVCLHNDQUNBO0FBQUE7O0FBQ0lDLFVBQVFDLEtBQVIsQ0FBaUIsS0FBS0MsV0FBTCxDQUFpQkMsSUFBbEM7O0FBRUEsUUFBTSxJQUFJQyxLQUFKLEVBQU47QUFDQSxFQVZ3Qjs7QUFBQSxLQWF2QkMsR0FidUI7QUFBQTtBQUFBO0FBQUE7O0FBQUE7QUFBQTs7QUFlNUI7OztBQWY0Qiw2QkFrQlhDLE1BbEJXLEVBbUI1QjtBQUNJQSxhQUFTQSxPQUFPQyxPQUFQLENBQWUsd0NBQWYsRUFBeUQsRUFBekQsQ0FBVDtBQUNBRCxhQUFTQSxPQUFPQyxPQUFQLENBQWUsUUFBZixFQUF5QixHQUF6QixDQUFUO0FBQ0FELGFBQVNBLE9BQU9DLE9BQVAsQ0FBZSxV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T0FBS0EsU0FBTCxDQUFlcEIsSUFBZixDQUFvQixVQUFwQixFQUFnQyxVQUFTb0IsU0FBVCxFQUFvQjtBQUNuRCxVQUFPLElBQUlrRSxRQUFKLENBQWFsRSxTQUFiLENBQVA7QUFDQSxHQUZEOztBQUlBLE9BQUtBLFNBQUwsQ0FBZXBCLElBQWYsQ0FBb0IsWUFBcEIsRUFBa0MsVUFBU29CLFNBQVQsRUFBb0I7QUFDckQsVUFBTyxJQUFJc0UsVUFBSixDQUFldEUsU0FBZixDQUFQO0FBQ0EsR0FGRDs7QUFJQSxPQUFLQSxTQUFMLENBQWVwQixJQUFmLENBQW9CLFVBQXBCLEVBQWdDLFVBQVNvQixTQUFULEVBQW9CO0FBQ25ELFVBQU8sSUFBSWEsUUFBSixDQUFhYixTQUFiLEVBQXdCQSxVQUFVMkosSUFBVixDQUFlLFlBQWYsQ0FBeEIsQ0FBUDtBQUNBLEdBRkQ7O0FBSUEsT0FBSzNKLFNBQUwsQ0FBZXBCLElBQWYsQ0FBb0IsTUFBcEIsRUFBNEIsVUFBU29CLFNBQVQsRUFBb0I7QUFDL0MsVUFBTyxJQUFJK0gsSUFBSixDQUFTL0gsU0FBVCxDQUFQO0FBQ0EsR0FGRDtBQUdBOztBQUVELFFBQU9oSCxTQUFQO0FBRUMsQ0FoOENnQixFQUFqQiIsImZpbGUiOiJlQ29tbWVyY2UuanMiLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgZUNvbW1lcmNlID0gKGZ1bmN0aW9uICgpIHtcbid1c2Ugc3RyaWN0JztcblxuY2xhc3MgSW52YWxpZEFyZ3VtZW50RXhjZXB0aW9uJDFcclxue1xyXG5cdGNvbnN0cnVjdG9yKCkgXHJcblx0eyBcclxuICAgIFx0Y29uc29sZS5lcnJvcihgJHt0aGlzLmNvbnN0cnVjdG9yLm5hbWV9LCBwYXNzaW5nIGludmFsaWQgYXJndW1lbnRzLmApO1xyXG5cclxuICAgIFx0dGhyb3cgbmV3IEVycm9yO1xyXG4gICAgfVxyXG59XG5cbmNsYXNzIERPTVxyXG57XHJcblx0LyoqXHJcblx0ICogTWluaWZpZXMgdGhlIGNzcyB0ZXh0LlxyXG5cdCAqL1xyXG5cdHN0YXRpYyBtaW5pZnlDc3Moc3RyaW5nKSBcclxuXHR7XHJcblx0ICAgIHN0cmluZyA9IHN0cmluZy5yZXBsYWNlKC9cXC9cXCooPzooPyFcXCpcXC8pW1xcc1xcU10pKlxcKlxcL3xbXFxyXFxuXFx0XSsvZywgJycpO1xyXG5cdCAgICBzdHJpbmcgPSBzdHJpbmcucmVwbGFjZSgvIHsyLH0vZywgJyAnKTtcclxuXHQgICAgc3RyaW5nID0gc3RyaW5nLnJlcGxhY2UoLyhbezp9XSkvZywgJyQxJyk7XHJcblx0ICAgIHN0cmluZyA9IHN0cmluZy5yZXBsYWNlKC8oWzssXSkgL2csICckMScpO1xyXG5cdCAgICBzdHJpbmcgPSBzdHJpbmcucmVwbGFjZSgvICEvZywgJyEnKTtcclxuXHQgICAgXHJcblx0ICAgIHJldHVybiBzdHJpbmc7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBTd2l0Y2hlcyBiZXR3ZWVuIHR3byBnaXZlbiBjbGFzc2VzLlxyXG5cdCAqL1xyXG5cdHN0YXRpYyBzd2l0Y2hDbGFzc2VzKGVsZW1lbnQsIGNsYXNzTmFtZSwgbmV3Q2xhc3NOYW1lKSBcclxuXHR7XHJcblx0XHR0aGlzLnJlbW92ZUNsYXNzKGVsZW1lbnQsIGNsYXNzTmFtZSk7XHJcblx0XHR0aGlzLmFkZENsYXNzKGVsZW1lbnQsIG5ld0NsYXNzTmFtZSk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBBZGRzIGNsYXNzIHRvIGEgZ2l2ZW4gZWxlbWVudC5cclxuXHQgKi9cclxuXHRzdGF0aWMgYWRkQ2xhc3MoZWxlbWVudCwgY2xhc3NOYW1lKSBcclxuXHR7XHJcblx0XHRpZihlbGVtZW50ID09PSBudWxsKSB7XHJcblx0XHRcdHRocm93IG5ldyBJbnZhbGlkQXJndW1lbnRFeGNlcHRpb24kMTtcclxuXHRcdH1cclxuXHJcblx0XHRpZighIGNsYXNzTmFtZSB8fCBjbGFzc05hbWUgPT0gJycgfHwgdHlwZW9mIGNsYXNzTmFtZSA9PT0gdW5kZWZpbmVkKSB7XHJcblx0XHRcdHJldHVybiBlbGVtZW50O1xyXG5cdFx0fVxyXG5cclxuXHRcdGxldCBjbGFzc05hbWVzID0gY2xhc3NOYW1lLnNwbGl0KCcgJyk7XHJcblxyXG5cdFx0Y2xhc3NOYW1lcy5mb3JFYWNoKGZ1bmN0aW9uKG5hbWUpIHtcclxuXHRcdFx0ZWxlbWVudC5jbGFzc0xpc3QuYWRkKG5hbWUpO1xyXG5cdFx0fSk7XHJcblx0XHRcclxuXHRcdHJldHVybiBlbGVtZW50O1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogUmVtb3ZlcyBjbGFzcyBmcm9tIGEgZ2l2ZW4gZWxlbWVudC5cclxuXHQgKi9cclxuXHRzdGF0aWMgcmVtb3ZlQ2xhc3MoZWxlbWVudCwgY2xhc3NOYW1lKSBcclxuXHR7XHJcblx0XHRpZihlbGVtZW50ID09IG51bGwpIHtcclxuXHRcdFx0dGhyb3cgbmV3IEludmFsaWRBcmd1bWVudEV4Y2VwdGlvbiQxO1xyXG5cdFx0fVxyXG5cclxuXHRcdGlmKGNsYXNzTmFtZSA9PSAnJykge1xyXG5cdFx0XHRlbGVtZW50LmNsYXNzTmFtZSA9ICcnO1xyXG5cdFx0fSBlbHNlIHtcclxuXHJcblx0XHRcdGxldCBjbGFzc05hbWVzID0gY2xhc3NOYW1lLnNwbGl0KCcgJyk7XHJcblxyXG5cdFx0XHRjbGFzc05hbWVzLmZvckVhY2goZnVuY3Rpb24obmFtZSkge1xyXG5cdFx0XHRcdGVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShuYW1lKTtcclxuXHRcdFx0fSk7XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIGVsZW1lbnQ7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBRdWVyaWVzIHRoZSBlbGVtZW50IGZyb20gdGhlIERPTS5cclxuXHQgKi9cclxuXHRzdGF0aWMgZWxlbWVudChzZWxlY3RvcikgXHJcblx0e1xyXG5cdFx0cmV0dXJuIHF1ZXJ5RWxlbWVudC5jYWxsKHRoaXMsIGRvY3VtZW50LCBzZWxlY3Rvcik7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBBZGRzIHN0eWxlIHRhZyB3aXRoIGdpdmVuIGlkIGFuZCBjc3MgdG8gdGhlIERPTS5cclxuXHQgKi9cclxuXHRzdGF0aWMgYWRkU3R5bGUoaWQsIGNzcykgXHJcblx0e1xyXG5cdFx0aWYodHlwZW9mIGNzcyAhPSAnc3RyaW5nJykge1xyXG5cdFx0XHR0aHJvdyBuZXcgSW52YWxpZEFyZ3VtZW50RXhjZXB0aW9uJDE7XHJcblx0XHR9XHJcblxyXG5cdFx0bGV0IGhlYWQgPSBkb2N1bWVudC5oZWFkIHx8IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdoZWFkJylbMF07XHJcblx0XHRsZXQgc3R5bGVUYWcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzdHlsZScpO1xyXG5cclxuXHRcdC8vIHBpcGUgaXQgdGhyb3VnaCB0aGUgbWluZmllclxyXG5cdCAgICBsZXQgQ1NTID0gdGhpcy5taW5pZnlDc3MoY3NzKTtcclxuXHQgICAgLy8gYWRkaW5nIGl0IHRvIHRoZSBzdHlsZXRhZ1xyXG5cdCAgICBzdHlsZVRhZy5pbm5lckhUTUwgPSBDU1M7XHJcblx0ICAgIC8vIGdpdmUgYW4gaWQgdG8gcmVjb2duaXplIHRoZSBzdHlsZSB0YWdcclxuXHRcdHN0eWxlVGFnLnNldEF0dHJpYnV0ZSgnaWQnLCBpZCk7XHJcblx0XHQvLyBhcHBlbmRpbmcgdGhhdCBzdHlsZSB0YWcgdG8gdGhlIERPTSBoZWFkIHRhZ1xyXG5cdFx0aGVhZC5hcHBlbmRDaGlsZChzdHlsZVRhZyk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBDcmVhdGVzIGFuIGVsZW1lbnQgd2l0aCB0aGUgZ2l2ZW4gb3B0aW9ucy5cclxuXHQgKi9cclxuXHRzdGF0aWMgY3JlYXRlRWxlbWVudChlbGVtZW50VHlwZSwgb3B0aW9ucylcclxuXHR7XHJcblx0XHRsZXQgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoZWxlbWVudFR5cGUpO1xyXG5cdFxyXG5cdFx0aWYgKG9wdGlvbnMgPT09IHVuZGVmaW5lZCkge1xyXG5cdFx0XHRyZXR1cm4gZWxlbWVudDtcclxuXHRcdH1cclxuXHJcblx0XHRmb3IgKGxldCBvcHRpb24gaW4gb3B0aW9ucykge1xyXG5cdFx0XHRpZihvcHRpb24gPT0gJ3RleHQnKSB7XHJcblx0XHRcdFx0ZWxlbWVudC5pbm5lckhUTUwgPSBvcHRpb25zW29wdGlvbl07XHJcblx0XHRcdFx0Y29udGludWU7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGVsZW1lbnQuc2V0QXR0cmlidXRlKG9wdGlvbiwgb3B0aW9uc1tvcHRpb25dKTtcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gZWxlbWVudDtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFRvZ2dsZXMgdGhlIGdpdmVuIGNsYXNzZXMuXHJcblx0ICovXHJcblx0c3RhdGljIHRvZ2dsZUNsYXNzKGVsZW1lbnQsIGNsYXNzTmFtZSwgc2Vjb25kQ2xhc3NOYW1lKVxyXG5cdHtcclxuXHRcdGlmKGVsZW1lbnQgPT0gbnVsbCB8fCB0eXBlb2YgZWxlbWVudCA9PSAndW5kZWZpbmVkJykge1xyXG5cdFx0XHR0aHJvdyBuZXcgSW52YWxpZEFyZ3VtZW50RXhjZXB0aW9uJDE7XHJcblx0XHR9XHJcblxyXG5cdFx0c2Vjb25kQ2xhc3NOYW1lID0gc2Vjb25kQ2xhc3NOYW1lIHx8IHVuZGVmaW5lZDtcclxuXHJcblx0XHRlbGVtZW50LmNsYXNzTGlzdC50b2dnbGUoY2xhc3NOYW1lKTtcclxuXHJcblx0XHRpZihzZWNvbmRDbGFzc05hbWUpIHtcclxuXHRcdFx0ZWxlbWVudC5jbGFzc0xpc3QudG9nZ2xlKHNlY29uZENsYXNzTmFtZSk7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBGaW5kcyBhbiBlbGVtZW50IGluc2lkZSBvZiBwYXJlbnQuXHJcblx0ICovXHJcblx0c3RhdGljIGZpbmQoZWxlbWVudCwgc2VsZWN0b3IpIFxyXG5cdHtcclxuXHRcdHJldHVybiBxdWVyeUVsZW1lbnQoZWxlbWVudCwgc2VsZWN0b3IpO1xyXG5cdH1cclxufVxyXG5cclxuLyoqXHJcbiAqIFF1ZXJpZXMgYW4gZWxlbWVudCBmcm9tIHRoZSBET00uXHJcbiAqL1xyXG5mdW5jdGlvbiBxdWVyeUVsZW1lbnQocGFyZW50LCBzZWxlY3Rvcikge1xyXG5cdHZhciBlbGVtZW50ID0gcGFyZW50LnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3IpO1xyXG5cclxuXHRpZihlbGVtZW50Lmxlbmd0aCA9PSAwKSB7XHJcblx0XHRyZXR1cm4gbnVsbDtcclxuXHR9XHJcblxyXG5cdHJldHVybiAoZWxlbWVudC5sZW5ndGggPiAxKSA/IGVsZW1lbnQgOiBlbGVtZW50WzBdO1xyXG59XG5cbmNsYXNzIEV2ZW50XHJcbntcclxuXHQvKipcclxuXHQgKiBMaXN0ZW4gdG8gYW4gZXZlbnQuXHJcblx0ICovXHJcblx0c3RhdGljIGxpc3RlbihuYW1lLCBjYWxsYmFjaykge1xyXG5cdFx0aWYgKHR5cGVvZiBjYWxsYmFjayAhPT0gJ2Z1bmN0aW9uJykge1xyXG5cdFx0XHR0aHJvdyBuZXcgSW52YWxpZEFyZ3VtZW50RXhjZXB0aW9uO1xyXG5cdFx0fVxyXG5cclxuXHRcdGV2ZW50c1tuYW1lXSA9IGNhbGxiYWNrO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogRmlyZXMgYW4gZXZlbnQuXHJcblx0ICovXHJcblx0c3RhdGljIHRyaWdnZXIobmFtZSwgZGF0YSkge1xyXG5cdFx0ZGF0YSA9IGRhdGEgfHwgbnVsbDtcclxuXHJcblx0XHRpZih0eXBlb2YgZXZlbnRzW25hbWVdICE9PSAnZnVuY3Rpb24nKSB7XHJcblx0XHRcdHRocm93IG5ldyBCYWRFdmVudENhbGxFeGNlcHRpb247XHJcblx0XHR9XHJcblxyXG5cdFx0aWYoZGF0YSAhPSBudWxsICYmIGRhdGEgaW5zdGFuY2VvZiBBcnJheSkge1xyXG5cdFxyXG5cdFx0XHRyZXR1cm4gZXZlbnRzW25hbWVdKC4uLmRhdGEpO1xyXG5cdFx0fVxyXG5cclxuXHRcdGV2ZW50c1tuYW1lXSgpO1xyXG5cdH1cclxufVxuXG5jbGFzcyBDb21tb25cclxue1xyXG5cdC8qKlxyXG5cdCAqIEV4dGVuZCBhbiBvYmplY3QuXHJcblx0ICovXHJcblx0c3RhdGljIGV4dGVuZChjdXJyZW50T2JqLCBuZXdPYmogKSB7XHJcblx0XHR2YXIgZXh0ZW5kZWQgPSB7fTtcclxuXHQgICAgdmFyIHByb3A7XHJcblxyXG5cdCAgICBmb3IgKHByb3AgaW4gY3VycmVudE9iaikge1xyXG5cdCAgICAgICAgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChjdXJyZW50T2JqLCBwcm9wKSkge1xyXG5cdCAgICAgICAgICAgIGV4dGVuZGVkW3Byb3BdID0gY3VycmVudE9ialtwcm9wXTtcclxuXHQgICAgICAgIH1cclxuXHQgICAgfVxyXG5cclxuXHQgICAgZm9yIChwcm9wIGluIG5ld09iaikge1xyXG5cdCAgICAgICAgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChuZXdPYmosIHByb3ApKSB7XHJcblx0ICAgICAgICAgICAgZXh0ZW5kZWRbcHJvcF0gPSBuZXdPYmpbcHJvcF07XHJcblx0ICAgICAgICB9XHJcblx0ICAgIH1cclxuXHJcblx0ICAgIHJldHVybiBleHRlbmRlZDtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIENoZWNrcyBmb3IgYSBuZWVkbGUgaW4gaHlzdGFjay5cclxuXHQgKi9cclxuXHRzdGF0aWMgaW5fYXJyYXkobmVlZGxlLCBoeXN0YWNrKSB7XHJcblx0XHRpZihoeXN0YWNrLmNvbnN0cnVjdG9yICE9PSBBcnJheSkgcmV0dXJuO1xyXG5cclxuXHRcdGZvcih2YXIgaSA9IDA7IGkgPD0gaHlzdGFjay5sZW5ndGg7IGkrKykge1xyXG5cdFx0XHRpZihuZWVkbGUgPT0gaHlzdGFja1tpXSkgcmV0dXJuIHRydWU7XHRcclxuXHRcdH1cclxuXHRcclxuXHRcdHJldHVybiBmYWxzZTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIENoZWNrcyBpZiBhbiBvYmplY3QgaXMgZW1wdHkuXHJcblx0ICovXHJcblx0c3RhdGljIGVtcHR5T2JqZWN0KG9iamVjdCkge1xyXG5cdFx0Zm9yKHZhciBwcm9wIGluIG9iamVjdCkge1xyXG5cdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIHRydWU7XHJcblx0fVxyXG5cclxuXHRzdGF0aWMgY29udGFpbnNPYmplY3Qob2JqZWN0LCBoeXN0YWNrKSBcclxuXHR7XHJcblx0ICAgIHZhciBpO1xyXG5cclxuXHQgICAgZm9yIChpID0gMDsgaSA8IGh5c3RhY2subGVuZ3RoOyBpKyspIHtcclxuXHQgICAgICAgIGlmICh0eXBlb2Ygb2JqZWN0ID09ICdzdHJpbmcnICYmIGh5c3RhY2tbaV0uY29uc3RydWN0b3IubmFtZSA9PT0gb2JqZWN0KSB7XHJcblx0ICAgICAgICBcdHJldHVybiB0cnVlO1xyXG5cdCAgICAgICAgfVxyXG5cclxuXHQgICAgICAgIGlmIChoeXN0YWNrW2ldID09PSBvYmplY3QpIHtcclxuXHQgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuXHQgICAgICAgIH1cclxuXHQgICAgfVxyXG5cclxuXHQgICAgcmV0dXJuIGZhbHNlO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQ29udmVydCBjYW1lbENhc2UgdG8ga2ViYWItY2FzZS5cclxuXHQgKi9cclxuXHRzdGF0aWMga2ViYWJDYXNlKHN0cmluZykgXHJcblx0e1xyXG5cdFx0cmV0dXJuIHN0cmluZy5yZXBsYWNlKC8oW2Etel0pKFtBLVpdKS9nLCAnJDEtJDInKS50b0xvd2VyQ2FzZSgpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQ2hlY2tzIGlmIGEgZ2l2ZW4gcGFyYW1ldGVyIGlzIGFuIG9iamVjdC5cclxuXHQgKi9cclxuXHRzdGF0aWMgaXNPYmplY3Qob2JqZWN0KSBcclxuXHR7XHJcblx0XHRyZXR1cm4gdHlwZW9mIG9iamVjdCA9PSAnb2JqZWN0JztcclxuXHR9XHJcblxyXG5cdC8qKlxyXG4gXHQqIFNldHMgYSBjb29raWUuIFxyXG5cdCovXHJcblx0c3RhdGljIGNyZWF0ZUNvb2tpZShuYW1lLCB2YWx1ZSwgZGF5cykgXHJcblx0e1xyXG5cdFx0aWYgKHZhbHVlLmNvbnN0cnVjdG9yLm5hbWUgPT0gJ0FycmF5Jykge1xyXG5cdFx0XHR2YWx1ZSA9IEpTT04uc3RyaW5naWZ5KHZhbHVlKTtcclxuXHRcdH1cclxuXHJcblx0ICAgIGxldCBleHBpcmVzO1xyXG5cdCAgICBcclxuXHQgICAgaWYgKGRheXMpIHtcclxuXHQgICAgICAgIGxldCBkYXRlID0gbmV3IERhdGUoKTtcclxuXHQgICAgICAgIGRhdGUuc2V0VGltZShkYXRlLmdldFRpbWUoKSArIChkYXlzICogMjQgKiA2MCAqIDYwICogMTAwMCkpO1xyXG5cdCAgICAgICAgZXhwaXJlcyA9IFwiOyBleHBpcmVzPVwiICsgZGF0ZS50b0dNVFN0cmluZygpO1xyXG5cdCAgICB9IGVsc2Uge1xyXG5cdCAgICAgICAgZXhwaXJlcyA9IFwiXCI7XHJcblx0ICAgIH1cclxuXHJcblx0ICAgIGRvY3VtZW50LmNvb2tpZSA9IG5hbWUgKyBcIj1cIiArIHZhbHVlICsgZXhwaXJlcyArIFwiOyBwYXRoPS9cIjtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFJldHJpZXZlcyB0aGUgY29va2llIGJ5IG5hbWUuXHJcblx0ICovXHJcblx0c3RhdGljIGdldENvb2tpZShuYW1lKSBcclxuXHR7XHJcblx0ICAgIGlmIChkb2N1bWVudC5jb29raWUubGVuZ3RoID4gMCkge1xyXG5cdCAgICAgICAgbGV0IGNfc3RhcnQgPSBkb2N1bWVudC5jb29raWUuaW5kZXhPZihuYW1lICsgXCI9XCIpO1xyXG5cdCAgICAgICAgXHJcblx0ICAgICAgICBpZiAoY19zdGFydCAhPSAtMSkge1xyXG5cdCAgICAgICAgICAgIGNfc3RhcnQgPSBjX3N0YXJ0ICsgbmFtZS5sZW5ndGggKyAxO1xyXG5cdCAgICAgICAgICAgIGxldCBjX2VuZCA9IGRvY3VtZW50LmNvb2tpZS5pbmRleE9mKFwiO1wiLCBjX3N0YXJ0KTtcclxuXHQgICAgICAgICAgICBcclxuXHQgICAgICAgICAgICBpZiAoY19lbmQgPT0gLTEpIHtcclxuXHQgICAgICAgICAgICAgICAgY19lbmQgPSBkb2N1bWVudC5jb29raWUubGVuZ3RoO1xyXG5cdCAgICAgICAgICAgIH1cclxuXHJcblx0ICAgICAgICAgICAgcmV0dXJuIEpTT04ucGFyc2UodW5lc2NhcGUoZG9jdW1lbnQuY29va2llLnN1YnN0cmluZyhjX3N0YXJ0LCBjX2VuZCkpKTtcclxuXHQgICAgICAgIH1cclxuXHQgICAgfVxyXG5cclxuXHQgICAgcmV0dXJuIFtdO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogR2VuZXJhdGVzIGEgcmFuZG9tIHN0cmluZy5cclxuXHQgKi9cclxuXHRzdGF0aWMgcmFuZG9tU3RyKGxlbmd0aCkgXHJcblx0e1xyXG5cdFx0bGV0IHN0cmluZyA9ICcnO1xyXG5cdFx0bGV0IHBvc3NpYmxlID0gXCJBQkNERUZHSElKS0xNTk9QUVJTVFVWV1hZWmFiY2RlZmdoaWprbG1ub3BxcnN0dXZ3eHl6MDEyMzQ1Njc4OVwiO1xyXG5cclxuXHRcdGZvciAobGV0IGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcclxuXHQgICAgXHRzdHJpbmcgKz0gcG9zc2libGUuY2hhckF0KE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIHBvc3NpYmxlLmxlbmd0aCkpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiBzdHJpbmc7XHJcblx0fVxyXG59XG5cbmNsYXNzIEludmFsaWRCaW5kaW5nRXhjZXB0aW9uXHJcbntcclxuXHRjb25zdHJ1Y3RvcigpIFxyXG5cdHsgXHJcbiAgICBcdGNvbnNvbGUuZXJyb3IoYCR7dGhpcy5jb25zdHJ1Y3Rvci5uYW1lfSwgdHJ5aW5nIHRvIGJpbmQgYW4gYWxyZWFkeSBleGlzdGluZyBib3VuZC5gKTtcclxuXHJcbiAgICBcdHRocm93IG5ldyBFcnJvcjtcclxuICAgIH1cclxufVxuXG5sZXQgaW5zdGFuY2VzID0gW107XHJcblxyXG5jbGFzcyBDb250YWluZXIgXHJcbntcclxuXHQvKipcclxuXHQgKiBCaW5kcyBrZXkgdG8gY29uY3JldGUgY2xhc3MuXHJcblx0ICovXHJcblx0YmluZChrZXksIGNvbmNyZXRlKSBcclxuXHR7XHJcblx0XHRpZiAodHlwZW9mIGtleSAhPSAnc3RyaW5nJyB8fCB0eXBlb2YgY29uY3JldGUgIT0gJ2Z1bmN0aW9uJykge1xyXG5cdFx0XHR0aHJvdyBuZXcgSW52YWxpZEFyZ3VtZW50RXhjZXB0aW9uJDE7XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKHR5cGVvZiB0aGlzW2tleV0gIT0gJ3VuZGVmaW5lZCcpIHtcclxuXHRcdFx0dGhyb3cgbmV3IEludmFsaWRCaW5kaW5nRXhjZXB0aW9uO1xyXG5cdFx0fVxyXG5cclxuXHRcdHRoaXNba2V5XSA9IGNvbmNyZXRlLmJpbmQoY29uY3JldGUsIHRoaXMpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogU2V0cyBhbiBpbnN0YW5jZS5cclxuXHQgKi9cclxuXHRzZXRJbnN0YW5jZShrZXksIGluc3RhbmNlKSBcclxuXHR7XHJcblx0XHRpZih0eXBlb2Yga2V5ICE9ICdzdHJpbmcnIHx8IHR5cGVvZiBpbnN0YW5jZSAhPSAnb2JqZWN0Jykge1xyXG5cdFx0XHR0aHJvdyBuZXcgSW52YWxpZEFyZ3VtZW50RXhjZXB0aW9uJDE7XHJcblx0XHR9XHJcblxyXG5cdFx0aW5zdGFuY2VzW2tleV0gPSBpbnN0YW5jZTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEdldHMgYW4gaW5zdGFuY2UuXHJcblx0ICovXHJcblx0Z2V0SW5zdGFuY2Uoa2V5KSBcclxuXHR7XHJcblx0XHRpZih0eXBlb2Yga2V5ICE9ICdzdHJpbmcnKSB7XHJcblx0XHRcdHRocm93IG5ldyBJbnZhbGlkQXJndW1lbnRFeGNlcHRpb24kMTtcclxuXHRcdH1cclxuXHJcblx0XHRpZih0eXBlb2Yga2V5ID09ICdvYmplY3QnKSB7XHJcblx0XHRcdHJldHVybiBpbnN0YW5jZXNba2V5LmNvbnN0cnVjdG9yLm5hbWVdIHx8IG51bGw7XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIGluc3RhbmNlc1trZXldIHx8IG51bGw7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBDaGVja3MgaWYgYW4gaW5zdGFuY2UgZXhpc3QuXHJcblx0ICovXHJcblx0aW5zdGFuY2VFeGlzdChpbnN0YW5jZSkgXHJcblx0e1xyXG5cdFx0aWYodHlwZW9mIGluc3RhbmNlID09ICdvYmplY3QnKSB7XHJcblx0XHRcdHJldHVybiAodHlwZW9mIGluc3RhbmNlc1tpbnN0YW5jZS5jb25zdHJ1Y3Rvci5uYW1lXSAhPT0gJ3VuZGVmaW5lZCcpO1xyXG5cdFx0fVxyXG5cdFx0XHJcblx0XHRcclxuXHRcdHJldHVybiAoaW5zdGFuY2UgaW4gaW5zdGFuY2VzKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIENyZWF0ZXMgYW4gaW5zdGFuY2UuXHJcblx0ICovXHJcblx0bWFrZShvYmplY3QpXHJcblx0e1xyXG5cdFx0bGV0IGluc3RhbmNlID0ge307XHJcblxyXG5cdFx0aWYgKHRoaXMuaW5zdGFuY2VFeGlzdChvYmplY3QpKSB7XHJcblx0XHRcdHJldHVybiB0aGlzLmdldEluc3RhbmNlKG9iamVjdCk7XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKHR5cGVvZiBvYmplY3QgPT0gJ29iamVjdCcpIHtcclxuXHRcdFx0aW5zdGFuY2UgPSBvYmplY3Q7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRpbnN0YW5jZSA9IG5ldyB0aGlzW29iamVjdF07XHRcclxuXHRcdH1cclxuXHJcblx0XHR0aGlzLnNldEluc3RhbmNlKG9iamVjdCwgaW5zdGFuY2UpOyBcclxuXHJcblx0XHRyZXR1cm4gaW5zdGFuY2U7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBSZXRyaWV2ZSBhbGwgaW5zdGFuY2VzLlxyXG5cdCAqL1xyXG5cdGluc3RhbmNlcygpIFxyXG5cdHtcclxuXHRcdHJldHVybiBpbnN0YW5jZXM7XHJcblx0fVxyXG59XG5cbmNsYXNzIENvbXBvbmVudHNFeGNlcHRpb25cclxue1xyXG5cdGNvbnN0cnVjdG9yKCkgXHJcblx0eyBcclxuICAgIFx0Y29uc29sZS5lcnJvcihgJHt0aGlzLmNvbnN0cnVjdG9yLm5hbWV9LCBleHBlY3RpbmcgZm9yIGF0IGxlYXN0IG9uZSBjb21wb25lbnRzLCBidXQgbm9uZSB3YXMgZ2l2ZW4sIFxyXG5cdFx0XHRcdFx0XHRcdFx0cGxlYXNlIGFkZCBhdCBsZWFzdCBvbmUgcmVxdWlyZW1lbnQoUHJvZHVjdHMsIFNlcnZpY2VzIG9yL2FuZCBGaWx0ZXJgKTtcclxuXHJcbiAgICBcdHRocm93IG5ldyBFcnJvcjtcclxuICAgIH1cclxufVxuXG5jbGFzcyBCYWRFdmVudENhbGxFeGNlcHRpb24kMVxyXG57XHJcblx0Y29uc3RydWN0b3IoKSBcclxuXHR7IFxyXG4gICAgXHRjb25zb2xlLmVycm9yKGAke3RoaXMuY29uc3RydWN0b3IubmFtZX0sIGxpc3RlbmluZyB0byBhIG5vbmUtZXhpc3RpbmcgZXZlbnRgKTtcclxuXHJcbiAgICBcdHRocm93IG5ldyBFcnJvcjtcclxuICAgIH1cclxufVxuXG5jbGFzcyBDb21wb25lbnROb3RSZWdpc3RlcmVkRXhjZXB0aW9uXHJcbntcclxuXHRjb25zdHJ1Y3RvcigpIFxyXG5cdHsgXHJcbiAgICBcdGNvbnNvbGUuZXJyb3IoYCR7dGhpcy5jb25zdHJ1Y3Rvci5uYW1lfSwgY29tcG9uZW50cyBtdXN0IGJlIHJlZ2lzdGVyZWQgaW4gb3JkZXIgdG8gdXNlIHRoZW1gKTtcclxuXHJcbiAgICBcdHRocm93IG5ldyBFcnJvcjtcclxuICAgIH1cclxufVxuXG5jbGFzcyBFeGNlcHRpb25IYW5kbGVyXHJcbntcclxuXHQvKipcclxuXHQgKiBIYW5kbGUgYWxsIHRoZSBlcnJvcnNcclxuXHQgKi9cclxuXHRzdGF0aWMgaW5pdGFsaXplKCkge1x0XHJcblx0XHR3aW5kb3cub25lcnJvciA9IGZ1bmN0aW9uKG1lc3NhZ2UsIHNvdXJjZSwgbGluZW5vLCBjb2xubywgZXJyb3IpIHtcclxuXHJcblx0XHRcdGlmIChlcnJvciBpbnN0YW5jZW9mIEludmFsaWRBcmd1bWVudEV4Y2VwdGlvbiQxKSB7XHJcblx0XHRcdFx0Ly8gaGFuZGxlXHJcblx0XHRcdH0gZWxzZSBpZiAoZXJyb3IgaW5zdGFuY2VvZiBJbnZhbGlkQmluZGluZ0V4Y2VwdGlvbikge1xyXG5cdFx0XHRcdC8vIGhhbmRsZVxyXG5cdFx0XHR9IGVsc2UgaWYgKGVycm9yIGluc3RhbmNlb2YgQmFkRXZlbnRDYWxsRXhjZXB0aW9uJDEpIHtcclxuXHRcdFx0XHQvLyBoYW5kbGVcclxuXHRcdFx0fSBlbHNlIGlmIChlcnJvciBpbnN0YW5jZW9mIENvbXBvbmVudHNFeGNlcHRpb24pIHtcclxuXHRcdFx0XHQvLyBoYW5kbGVcclxuXHRcdFx0fSBlbHNlIGlmIChlcnJvciBpbnN0YW5jZW9mIENvbXBvbmVudE5vdFJlZ2lzdGVyZWRFeGNlcHRpb24pIHtcclxuXHRcdFx0XHQvLyBoYW5kbGVcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHJldHVybiB0cnVlO1xyXG5cdFx0fTtcclxuXHR9XHJcbn1cblxuLyoqXHJcbiAqIFRoZSBkZWZhdWx0IHNldHRpbmdzIG9mIHRoZSBmaWx0ZXIuXHJcbiAqL1xyXG5sZXQgZGVmYXVsdFNldHRpbmdzJDEgPSB7XHJcblx0ZWxlbWVudDogJy5maWx0ZXInLFxyXG5cdGRhdGE6IHt9LFxyXG5cdGNsYXNzOiAnY29sLXhzLTInLFxyXG5cdHdpZHRoOiAnJyxcclxuXHRoZWlnaHQ6ICcnLFxyXG59O1xyXG5cclxuXHJcbi8qKlxyXG4gKiBUaGUgRmlsdGVyIE9iamVjdCwgaGFuZGxlcyB0aGUgZmlsdGVyIG9mIHRoZSBwcm9kdWN0cy9zZXJ2aWNlcy5cclxuICovXHJcbmNsYXNzIEZpbHRlciBcclxue1xyXG5cdGNvbnN0cnVjdG9yKGNvbnRhaW5lcikgXHJcblx0e1xyXG5cdFx0dGhpcy5zZXR1cChkZWZhdWx0U2V0dGluZ3MkMSk7XHJcblx0fVxyXG5cclxuXHRzZXR1cChzZXR0aW5ncylcclxuXHR7XHJcblx0XHRpZih0eXBlb2Ygc2V0dGluZ3MgIT0gJ29iamVjdCcpIHtcclxuXHRcdFx0dGhyb3cgbmV3IEludmFsaWRBcmd1bWVudEV4Y2VwdGlvbiQxO1xyXG5cdFx0fVxyXG5cclxuXHRcdHRoaXMuc2V0dGluZ3MgPSBDb21tb24uZXh0ZW5kKGRlZmF1bHRTZXR0aW5ncyQxLCBzZXR0aW5ncyk7XHJcblxyXG5cdFx0dGhpcy5zZXRFbGVtZW50KHRoaXMuc2V0dGluZ3MuZWxlbWVudCk7XHJcblx0fVxyXG5cclxuXHRzZXRFbGVtZW50KHNlbGVjdG9yKVxyXG5cdHtcclxuXHRcdHRoaXMud3JhcHBlciA9IERPTS5lbGVtZW50KHNlbGVjdG9yKTtcclxuXHRcdFxyXG5cdFx0RE9NLmFkZENsYXNzKHRoaXMud3JhcHBlciwgdGhpcy5zZXR0aW5ncy5jbGFzcyk7XHJcblx0fVxyXG59XG5cbi8qKlxyXG4gKiBUaGUgZGVmYXVsdCBzZXR0aW5ncyBvZiBlYWNoIHByb2R1Y3QuXHJcbiAqL1xyXG5sZXQgZGVmYXVsdFNldHRpbmdzJDIgPSB7XHJcblx0ZWxlbWVudDogJy5wcm9kdWN0cycsXHJcblx0Y2xhc3M6ICcnLFxyXG5cdGl0ZW1fY2xhc3M6ICcnLFxyXG5cdGFkZF9idXR0b25fY2xhc3M6ICdidG4gYnRuLXByaW1hcnknLFxyXG5cdGZhdm9yaXRlX2J1dHRvbl9jbGFzczogJ2J0biBidG4tZGFuZ2VyJyxcclxuXHR3aWR0aDogJzIwMHB4JyxcclxuXHRoZWlnaHQ6ICcyNTBweCcsXHJcblx0YXR0cmlidXRlczogWyduYW1lJywgJ3ByaWNlJywgJ2RlbGl2ZXJ5VGltZScsICdpbWFnZSddLFxyXG5cdHVybDogJ3Byb2R1Y3RzLnBocCcsXHJcbn07XHJcblxyXG4vKipcclxuICogU3RvcmVzIHRoZSBjb250YWluZXIgb2JqZWN0LlxyXG4gKi9cclxubGV0IENvbnRhaW5lciQyO1xyXG5cclxuLyoqXHJcbiAqIFRoZSBQcm9kdWN0cyBPYmplY3QsIGhhbmRsZXMgdGhlIHByb2R1Y3RzLlxyXG4gKi9cclxuY2xhc3MgUHJvZHVjdHMgXHJcbntcclxuXHQvKipcclxuXHQgKiBJbml0YWxpemUgdGhlIENvbnRhaW5lciBhbmQgdGhlIHBhZ2luYXRvci5cclxuXHQgKi9cclxuXHRjb25zdHJ1Y3Rvcihjb250YWluZXIsIHBhZ2luYXRvcikgXHJcblx0e1xyXG5cdFx0dGhpcy5zZXR1cChkZWZhdWx0U2V0dGluZ3MkMik7XHJcblxyXG5cdFx0Q29udGFpbmVyJDIgPSBjb250YWluZXI7XHJcblx0XHR0aGlzLnBhZ2luYXRvciA9IHBhZ2luYXRvcjtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFNldHMgdGhlIGdpdmVuIHNldHRpbmdzIGZyb20gdGhlIHVzZXIuXHJcblx0ICovXHJcblx0c2V0dXAoc2V0dGluZ3MpXHJcblx0e1xyXG5cdFx0aWYgKHR5cGVvZiBzZXR0aW5ncyAhPSAnb2JqZWN0Jykge1xyXG5cdFx0XHR0aHJvdyBuZXcgSW52YWxpZEFyZ3VtZW50RXhjZXB0aW9uJDE7XHJcblx0XHR9XHJcblxyXG5cdFx0dGhpcy5zZXR0aW5ncyA9IENvbW1vbi5leHRlbmQoZGVmYXVsdFNldHRpbmdzJDIsIHNldHRpbmdzKTtcclxuXHJcblx0XHR0aGlzLnNldEVsZW1lbnQodGhpcy5zZXR0aW5ncy5lbGVtZW50KTtcclxuXHJcblx0XHR0aGlzLmFkZFN0eWxlVGFnKCk7XHRcclxuXHRcclxuXHRcdGlmICh0eXBlb2YgQ29udGFpbmVyJDIgPT0gJ3VuZGVmaW5lZCcpIHtcclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0fVxyXG5cclxuXHRcdGlmIChDb250YWluZXIkMi5pbnN0YW5jZUV4aXN0KCdQYWdpbmF0aW9uJykpIHtcclxuXHRcdFx0dGhpcy5wYWdpbmF0b3IucmVzZXQoKTtcclxuXHRcdFx0bGV0IHJlcXVlc3QgPSB0aGlzLmdldFByb2R1Y3RzQnlQYWdlKHRoaXMucGFnaW5hdG9yLmdldEN1cnJlbnQoKSk7XHJcblx0XHRcdFxyXG5cdFx0XHRyZXF1ZXN0LnRoZW4oZnVuY3Rpb24oaXRlbXMpIHtcclxuXHRcdFx0XHR0aGlzLnJlcGxhY2VJdGVtcyhpdGVtcyk7XHJcblx0XHRcdH0uYmluZCh0aGlzKSkuY2F0Y2goZnVuY3Rpb24oZXJyb3IpIHtcclxuXHJcblx0XHRcdH0pO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogU2V0cyB0aGUgRE9NIGVsZW1lbnQgZm9yIHBvcHVsYXRpbmcgdGhlIHByb2R1Y3RzLlxyXG5cdCAqL1xyXG5cdHNldEVsZW1lbnQoc2VsZWN0b3IpXHJcblx0e1xyXG5cdFx0dGhpcy53cmFwcGVyID0gRE9NLmVsZW1lbnQoc2VsZWN0b3IpO1xyXG5cclxuXHRcdGlmICh0aGlzLndyYXBwZXIpIHtcclxuXHRcdFx0RE9NLmFkZENsYXNzKHRoaXMud3JhcHBlciwgdGhpcy5zZXR0aW5ncy5jbGFzcyk7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBSZXBsYWNlIGl0ZW1zIGluIHRoZSBjb250YWluZXIuXHJcblx0ICovXHJcblx0cmVwbGFjZUl0ZW1zKGl0ZW1zKSBcclxuXHR7XHJcblx0XHRpZiAoISBBcnJheS5pc0FycmF5KGl0ZW1zKSB8fCAoaXRlbXMubGVuZ3RoIDw9IDAgJiYgdHlwZW9mIGl0ZW1zWzBdID09ICdzdHJpbmcnKSkge1xyXG5cdFx0XHR0aHJvdyBuZXcgSW52YWxpZEFyZ3VtZW50RXhjZXB0aW9uJDE7XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKENvbnRhaW5lciQyLmluc3RhbmNlRXhpc3QoJ1BhZ2luYXRpb24nKSkge1xyXG5cdFx0XHRsZXQgcGVyUGFnZSA9IHRoaXMucGFnaW5hdG9yLnNldHRpbmdzLnBlcl9wYWdlO1xyXG5cdFx0XHRpdGVtcyA9IGl0ZW1zLnNsaWNlKDAsIHBlclBhZ2UpO1xyXG5cdFx0fVxyXG5cclxuXHRcdGxldCBwcm9kdWN0cyA9IHRoaXMuYnVpbGRQcm9kdWN0cyhpdGVtcywgdGhpcy5zZXR0aW5ncy5pdGVtX2NsYXNzLCAnZGl2Jyk7XHJcblxyXG5cdFx0dGhpcy53cmFwcGVyLmlubmVySFRNTCA9IHByb2R1Y3RzO1xyXG5cclxuXHRcdHJldHVybiBpdGVtcztcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIE1ha2VzIGFuIEFqYXggY2FsbCB0byB0aGUgc2VydmVyLlxyXG5cdCAqL1xyXG5cdGdldFByb2R1Y3RzQnlQYWdlKHBhZ2VOdW1iZXIpIFxyXG5cdHtcclxuXHRcdHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcclxuXHRcdFx0aWYgKHRoaXMucGFnaW5hdG9yLm5vdEluUGFnZVJhbmdlKHBhZ2VOdW1iZXIpKSB7XHJcblx0XHRcdFx0cmV0dXJuIHJlamVjdCgnTm90IGluIHBhZ2luYXRpb24gcmFuZ2UnKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0bGV0IHhociA9IG5ldyBYTUxIdHRwUmVxdWVzdCB8fCBuZXcgQWN0aXZlWE9iamVjdChcIk1pY3Jvc29mdC5YTUxIVFRQXCIpO1xyXG5cclxuXHRcdFx0eGhyLm9wZW4oJ0dFVCcsIHRoaXMuc2V0dGluZ3MudXJsICsgJz9wYWdlPScgKyBwYWdlTnVtYmVyLCB0cnVlKTsgXHJcblx0XHRcdHhoci5zZXRSZXF1ZXN0SGVhZGVyKCdDb250ZW50LVR5cGUnLCAnYXBwbGljYXRpb24vanNvbicpO1xyXG5cdFx0XHRcclxuXHRcdFx0bGV0IGluc3RhbmNlID0gdGhpcztcclxuXHJcblx0XHRcdHhoci5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBmdW5jdGlvbigpIHtcclxuXHRcdFx0XHRpZiAodGhpcy5yZWFkeVN0YXRlID09IDQpIHtcclxuXHRcdFx0XHRcdGlmICh0aGlzLnN0YXR1cyA9PSAyMDApIHtcclxuXHRcdFx0XHRcdFx0aW5zdGFuY2UuY3VycmVudEl0ZW1zID0gKHRoaXMucmVzcG9uc2VUZXh0ID09ICcnKSA/IFtdIDogSlNPTi5wYXJzZSh0aGlzLnJlc3BvbnNlVGV4dCk7XHJcblx0XHRcdFx0XHRcclxuXHRcdFx0XHRcdFx0aWYoaW5zdGFuY2UuY3VycmVudEl0ZW1zLmxlbmd0aCA9PT0gMCkge1xyXG5cdFx0XHRcdFx0XHRcdHJlamVjdCgnTm8gSXRlbXMgd2VyZSByZXRyaWV2ZWQhJyk7XHJcblx0XHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgaW5zdGFuY2UuY3VycmVudEl0ZW1zLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdFx0XHRcdFx0dmFyIHByb2R1Y3QgPSBpbnN0YW5jZS5jdXJyZW50SXRlbXNbaV07XHJcblx0XHRcdFx0XHRcdFx0aW5zdGFuY2UuQWZ0ZXJMb2FkZWQuY2FsbCh0aGlzLCBwcm9kdWN0KTtcclxuXHRcdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRcdFx0cmVzb2x2ZShpbnN0YW5jZS5jdXJyZW50SXRlbXMpO1xyXG5cdFx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdFx0cmVqZWN0KHRoaXMuc3RhdHVzVGV4dCk7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9O1xyXG5cclxuXHRcdFx0eGhyLm9uZXJyb3IgPSBmdW5jdGlvbihlcnJvcikge1xyXG5cdFx0XHRcdHJlamVjdChlcnJvcik7XHJcblx0XHRcdH07XHJcblxyXG5cdFx0XHR4aHIuc2VuZChudWxsKTtcclxuXHRcdH0uYmluZCh0aGlzKSk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBCdWlsZHMgdGhlIGh0bWwgZm9yIHRoZSBwcm9kdWN0cy5cclxuXHQgKi9cclxuXHRidWlsZFByb2R1Y3RzKGF0dHJpYnV0ZXNDb2xsZWN0aW9uLCBjbGFzc05hbWUsIHRhZ1R5cGUpIFxyXG5cdHtcclxuXHRcdGlmKGF0dHJpYnV0ZXNDb2xsZWN0aW9uLmNvbnN0cnVjdG9yLm5hbWUgIT0gJ0FycmF5JyApIHtcclxuXHRcdFx0dGhyb3cgbmV3IEludmFsaWRBcmd1bWVudEV4Y2VwdGlvbiQxO1xyXG5cdFx0fVxyXG5cclxuXHRcdGxldCBidWlsdFByb2R1Y3RzID0gJyc7XHJcblxyXG5cdFx0YXR0cmlidXRlc0NvbGxlY3Rpb24uZm9yRWFjaChmdW5jdGlvbihhdHRyaWJ1dGVzKSB7XHJcblx0XHRcdGJ1aWx0UHJvZHVjdHMgKz0gdGhpcy5idWlsZFByb2R1Y3QoYXR0cmlidXRlcywgY2xhc3NOYW1lLCB0YWdUeXBlKTtcclxuXHRcdH0uYmluZCh0aGlzKSk7XHJcblxyXG5cdFx0cmV0dXJuIGJ1aWx0UHJvZHVjdHM7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBCdWlsZHMgdGhlIGh0bWwgZm9yIGEgc2luZ2xlIHByb2R1Y3QuXHJcblx0ICovXHJcblx0YnVpbGRQcm9kdWN0KGF0dHJpYnV0ZXMsIGNsYXNzTmFtZSwgdGFnVHlwZSkgXHJcblx0e1xyXG5cdFx0aWYgKHR5cGVvZiBhdHRyaWJ1dGVzICE9ICdvYmplY3QnIHx8IHR5cGVvZiB0YWdUeXBlICE9ICdzdHJpbmcnKSB7XHJcblx0XHRcdHRocm93IG5ldyBJbnZhbGlkQXJndW1lbnRFeGNlcHRpb24kMTtcclxuXHRcdH1cclxuXHJcblx0XHRjbGFzc05hbWUgPSBjbGFzc05hbWUgfHwgbnVsbDtcclxuXHJcblx0XHRsZXQgcHJvZHVjdCA9IERPTS5jcmVhdGVFbGVtZW50KCdkaXYnLCB7XHJcblx0XHRcdGNsYXNzOiAncHJvZHVjdCdcclxuXHRcdH0pO1xyXG5cclxuXHRcdERPTS5hZGRDbGFzcyhwcm9kdWN0LCBjbGFzc05hbWUpO1xyXG5cclxuXHRcdGxldCBvdmVybGF5ID0gRE9NLmNyZWF0ZUVsZW1lbnQoJ2RpdicsIHtcclxuXHRcdFx0Y2xhc3M6ICdwcm9kdWN0LW92ZXJsYXknLFxyXG5cdFx0fSk7XHJcblxyXG5cdFx0cHJvZHVjdC5hcHBlbmRDaGlsZChvdmVybGF5KTtcclxuXHJcblx0XHRmb3IgKHZhciBhdHRyaWJ1dGUgaW4gYXR0cmlidXRlcykge1xyXG5cdFx0XHRpZiAoISBDb21tb24uaW5fYXJyYXkoYXR0cmlidXRlLCB0aGlzLnNldHRpbmdzLmF0dHJpYnV0ZXMpKSB7XHJcblx0XHRcdFx0Y29udGludWU7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGxldCB0YWcgPSBET00uY3JlYXRlRWxlbWVudCh0YWdUeXBlKTtcclxuXHJcblx0XHRcdGlmIChhdHRyaWJ1dGUgPT0gJ2ltYWdlJykge1xyXG5cdFx0XHRcdGxldCBpbWFnZSA9IERPTS5jcmVhdGVFbGVtZW50KCdpbWcnLCB7XHJcblx0XHRcdFx0XHRzcmM6IGF0dHJpYnV0ZXNbYXR0cmlidXRlXVxyXG5cdFx0XHRcdH0pO1xyXG5cdFx0XHRcdHByb2R1Y3QuYXBwZW5kQ2hpbGQoaW1hZ2UpO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdHRhZy5pbm5lckhUTUwgPSBhdHRyaWJ1dGVzW2F0dHJpYnV0ZV0gfHwgJyc7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdERPTS5hZGRDbGFzcyh0YWcsICdwcm9kdWN0LScgKyBDb21tb24ua2ViYWJDYXNlKGF0dHJpYnV0ZSkpO1xyXG5cdFx0XHRvdmVybGF5LmFwcGVuZENoaWxkKHRhZyk7XHJcblx0XHR9XHJcblxyXG5cdFx0bGV0IHRhZyA9IERPTS5jcmVhdGVFbGVtZW50KCdkaXYnLCB7XHJcblx0XHRcdGlkOiAnYWN0aW9uQnV0dG9ucycsXHJcblx0XHRcdGNsYXNzOiAnYWN0aW9uLWJ1dHRvbnMnXHJcblx0XHR9KTtcclxuXHJcblx0XHRsZXQgYWRkVG9DYXJ0ID0gRE9NLmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicsIHtcclxuXHRcdFx0aWQ6ICdhZGRUb0NhcnQnLFxyXG5cdFx0XHRjbGFzczogdGhpcy5zZXR0aW5ncy5hZGRfYnV0dG9uX2NsYXNzLFxyXG5cdFx0XHR0eXBlOiAnYnV0dG9uJyxcclxuXHRcdFx0dGV4dDogJysnLFxyXG5cdFx0fSk7XHJcblxyXG5cdFx0bGV0IGZhdm9yaXRlID0gRE9NLmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicsIHtcclxuXHRcdFx0aWQ6ICdmYXZvcml0ZScsXHJcblx0XHRcdGNsYXNzOiB0aGlzLnNldHRpbmdzLmZhdm9yaXRlX2J1dHRvbl9jbGFzcyxcclxuXHRcdFx0dHlwZTogJ2J1dHRvbicsXHJcblx0XHRcdHRleHQ6ICcmaGVhcnRzOydcclxuXHRcdH0pO1xyXG5cclxuXHRcdHRhZy5hcHBlbmRDaGlsZChhZGRUb0NhcnQpO1xyXG5cdFx0dGFnLmFwcGVuZENoaWxkKGZhdm9yaXRlKTtcclxuXHJcblx0XHRvdmVybGF5LmFwcGVuZENoaWxkKHRhZyk7XHJcblxyXG5cdFx0cmV0dXJuIHByb2R1Y3Qub3V0ZXJIVE1MO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQW4gZXZlbnQgZm9yIHRoZSBjbGllbnQgb2Ygd2hlbiB0aGUgcHJvZHVjdHMgYXMgYmVlbiBsb2FkZWQuXHJcblx0ICovXHJcblx0QWZ0ZXJMb2FkZWQocHJvZHVjdCkgXHJcblx0e1xyXG5cdFx0Ly9cclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEFkZCB0aGUgZUNvbW1lcmNlIHN0eWxlIHRhZ3MgdG8gdGhlIERPTS5cclxuXHQgKi9cclxuXHRhZGRTdHlsZVRhZygpIFxyXG5cdHtcclxuXHRcdGlmKERPTS5lbGVtZW50KCcjZUNvbW1lcmNlLVByb2R1Y3RzJykpIHtcclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0fVxyXG5cclxuXHRcdGxldCBjc3MgPSBgXHJcblx0XHRcdC5wcm9kdWN0IHtcclxuXHRcdFx0XHRwb3NpdGlvbjogcmVsYXRpdmU7XHJcblx0XHRcdFx0bWFyZ2luOiA1cHggNXB4O1xyXG5cdFx0XHRcdGJvcmRlcjogMXB4IHNvbGlkICNlNGU0ZTQ7XHJcblx0XHRcdFx0d2lkdGg6ICR7dGhpcy5zZXR0aW5ncy53aWR0aH07XHJcblx0XHRcdFx0aGVpZ2h0OiAke3RoaXMuc2V0dGluZ3MuaGVpZ2h0fTtcclxuXHRcdFx0XHRjdXJzb3I6IHBvaW50ZXI7XHJcblx0XHRcdFx0Y29sb3I6ICNmZmZmZmY7XHJcblx0XHRcdFx0b3ZlcmZsb3c6IGhpZGRlbjtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0LnByb2R1Y3QgPiAucHJvZHVjdC1vdmVybGF5IHtcclxuXHRcdFx0XHRwb3NpdGlvbjogYWJzb2x1dGU7XHJcblx0XHRcdFx0dG9wOiAwO1xyXG5cdFx0XHRcdGxlZnQ6IDA7XHJcblx0XHRcdFx0d2lkdGg6IDEwMCU7XHJcblx0XHRcdFx0aGVpZ2h0OiAxMDAlO1xyXG5cdFx0XHRcdG9wYWNpdHk6IDAuNTtcclxuXHRcdFx0XHR6LWluZGV4OiA1O1xyXG5cdFx0XHRcdHRyYW5zaXRpb246IDFzIGFsbDtcclxuXHRcdFx0XHR0cmFuc2Zvcm06IHRyYW5zbGF0ZVgoLTI1MHB4KTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0LnByb2R1Y3Q6aG92ZXIgPiAucHJvZHVjdC1vdmVybGF5IHtcclxuXHRcdFx0XHRiYWNrZ3JvdW5kOiByZ2JhKDAsIDAsIDAsIDAuNDUpO1xyXG5cdFx0XHRcdHRyYW5zZm9ybTogdHJhbnNsYXRlWCgwcHgpO1xyXG5cdFx0XHRcdG9wYWNpdHk6IDE7XHJcblx0XHRcdFx0dHJhbnNpdGlvbjogMXMgYWxsO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHQucHJvZHVjdCA+IGltZyB7XHJcblx0XHRcdFx0cG9zaXRpb246IGFic29sdXRlO1xyXG5cdFx0XHRcdGxlZnQ6IDA7XHJcblx0XHRcdFx0dG9wOiAwO1xyXG5cdFx0XHRcdHdpZHRoOiAxMDAlO1xyXG5cdFx0XHRcdGhlaWdodDogMTAwJTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0LnByb2R1Y3QgPiAucHJvZHVjdC1pbWFnZSB7XHJcblx0XHRcdFx0ei1pbmRleDogMDtcclxuXHRcdFx0XHRwb3NpdGlvbjogYWJzb2x1dGU7XHJcblx0XHRcdFx0dG9wOiAwO1xyXG5cdFx0XHRcdGxlZnQ6IDA7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdC5wcm9kdWN0ID4gLnByb2R1Y3Qtb3ZlcmxheSA+IC5wcm9kdWN0LW5hbWUsIFxyXG5cdFx0XHQucHJvZHVjdCA+IC5wcm9kdWN0LW92ZXJsYXkgPiAucHJvZHVjdC1wcmljZSxcclxuXHRcdFx0LnByb2R1Y3QgPiAucHJvZHVjdC1vdmVybGF5ID4gLnByb2R1Y3QtZGVsaXZlcnktdGltZSB7XHJcblx0XHRcdFx0ei1pbmRleDogMTtcclxuXHRcdFx0XHRwb3NpdGlvbjogcmVsYXRpdmU7XHJcblx0XHRcdFx0dGV4dC1hbGlnbjogY2VudGVyO1xyXG5cdFx0XHRcdG1hcmdpbi10b3A6IDI1cHg7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdC5wcm9kdWN0ID4gLnByb2R1Y3Qtb3ZlcmxheSA+IC5hY3Rpb24tYnV0dG9ucyB7XHJcblx0XHRcdFx0d2lkdGg6IDEwMCU7XHJcblx0XHRcdFx0bWFyZ2luLXRvcDogMTBweDtcclxuXHRcdFx0XHR0ZXh0LWFsaWduOiBjZW50ZXI7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdC5wcm9kdWN0ID4gLnByb2R1Y3Qtb3ZlcmxheSA+IC5hY3Rpb24tYnV0dG9ucyA+ICNmYXZvcml0ZSB7XHJcblx0XHRcdFx0bWFyZ2luLWxlZnQ6IDEwcHg7XHJcblx0XHRcdH1cclxuXHJcblx0XHRgO1xyXG5cdCAgICBcclxuXHQgICAgRE9NLmFkZFN0eWxlKCdlQ29tbWVyY2UtUHJvZHVjdHMnLCBjc3MpO1xyXG5cdH1cclxufVxuXG4vKipcclxuICogVGhlIFNlcnZpY2VzIE9iamVjdCwgaGFuZGxlcyB0aGUgc2VydmljZXMuXHJcbiAqL1xyXG5jbGFzcyBTZXJ2aWNlcyBcclxue1xyXG5cclxufVxuXG4vKipcclxuICogVGhlIGRlZmF1bHQgc2V0dGluZ3Mgb2YgdGhlIHBhZ2luYXRpb24uXHJcbiAqL1xyXG5sZXQgZGVmYXVsdFNldHRpbmdzJDMgPSB7XHJcblx0ZWxlbWVudDogJy5wYWdpbmF0aW9uLWxpbmtzJyxcclxuXHRjbGFzczogJ2NvbC14cy1vZmZzZXQtNCBjb2wteHMtOCcsXHJcblx0cGVyX3BhZ2U6IDUsXHJcblx0dG90YWxfaXRlbXM6IDEwLFxyXG59O1xyXG5cclxuLyoqXHJcbiAqIFN0b3JlcyB0aGUgY29udGFpbmVyIG9iamVjdC5cclxuICovXHJcbmxldCBDb250YWluZXIkMztcclxuXHJcbi8qKlxyXG4gKiBUaGUgUGFnaW5hdGlvbiBPYmplY3QsIGhhbmRsZXMgdGhlIHBhZ2luYXRpb24uXHJcbiAqL1xyXG5jbGFzcyBQYWdpbmF0aW9uIFxyXG57XHJcblx0LyoqXHJcblx0ICogSW5pdGlhbGl6ZSB0aGUgY29udGFpbmVyIG9iamVjdCBhbmQgdGhlIGRlZmF1bHQgc2V0dGluZ3MuXHJcblx0ICovXHJcblx0Y29uc3RydWN0b3IoY29udGFpbmVyKSBcclxuXHR7XHJcblx0XHRDb250YWluZXIkMyA9IGNvbnRhaW5lcjtcclxuXHRcdC8vIHRoaXMuc2V0dXAoZGVmYXVsdFNldHRpbmdzKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFNldCB0aGUgUGFnaW5hdGlvbiBvYmplY3QgdXAuXHJcblx0ICovXHJcblx0c2V0dXAoc2V0dGluZ3MpXHJcblx0e1xyXG5cdFx0aWYodHlwZW9mIHNldHRpbmdzICE9ICdvYmplY3QnKSB7XHJcblx0XHRcdHRocm93IG5ldyBJbnZhbGlkQXJndW1lbnRFeGNlcHRpb24kMTtcclxuXHRcdH1cclxuXHJcblx0XHR0aGlzLnNldHRpbmdzID0gQ29tbW9uLmV4dGVuZChkZWZhdWx0U2V0dGluZ3MkMywgc2V0dGluZ3MpO1xyXG5cclxuXHRcdHRoaXMudG90YWxQYWdlcyA9IHRoaXMuY2FsY3VsYXRlVG90YWxQYWdlcyh0aGlzLnNldHRpbmdzLnBlcl9wYWdlLCB0aGlzLnNldHRpbmdzLnRvdGFsX2l0ZW1zKTtcclxuXHRcdFxyXG5cdFx0dGhpcy5zZXRFbGVtZW50KHRoaXMuc2V0dGluZ3MuZWxlbWVudCk7XHJcblx0XHR0aGlzLnJlcGxhY2VMaW5rcyh0aGlzLmxpbmtzKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFNldHMgdGhlIHdyYXBwZXIgZWxlbWVudC5cclxuXHQgKi9cclxuXHRzZXRFbGVtZW50KHNlbGVjdG9yKVxyXG5cdHtcclxuXHRcdHRoaXMud3JhcHBlciA9IERPTS5lbGVtZW50KHNlbGVjdG9yKTtcclxuXHRcdFxyXG5cdFx0RE9NLmFkZENsYXNzKHRoaXMud3JhcHBlciwgdGhpcy5zZXR0aW5ncy5jbGFzcyk7XHJcblxyXG5cdFx0dGhpcy5saW5rcyA9IHRoaXMuY3JlYXRlTGlua3MoKTtcclxuXHRcdHRoaXMuYmluZEV2ZW50TGlzdGVuZXJzKHRoaXMubGlua3MpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogUmVwbGFjZXMgdGhlIGxpbmtzIGluIHRoZSB3cmFwcGVyLlxyXG5cdCAqL1xyXG5cdHJlcGxhY2VMaW5rcyhsaW5rcylcclxuXHR7XHJcblx0XHR0aGlzLndyYXBwZXIuaW5uZXJIVE1MID0gJyc7XHJcblx0XHR0aGlzLndyYXBwZXIuYXBwZW5kQ2hpbGQobGlua3MpO1xyXG5cdH1cclxuXHJcblx0Y2FsY3VsYXRlVG90YWxQYWdlcyhwZXJQYWdlLCB0b3RhbEl0ZW1zKVxyXG5cdHtcclxuXHRcdHBlclBhZ2UgPSBwYXJzZUludChwZXJQYWdlKTtcclxuXHRcdHRvdGFsSXRlbXMgPSBwYXJzZUludCh0b3RhbEl0ZW1zKTtcclxuXHJcblx0XHRyZXR1cm4gTWF0aC5jZWlsKHRvdGFsSXRlbXMgLyBwZXJQYWdlKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEJpbmRzIHRoZSBidXR0b25zIGV2ZW50cyBsaXN0ZW5lcnMuXHJcblx0ICovXHJcblx0YmluZEV2ZW50TGlzdGVuZXJzKGxpbmtzKSBcclxuXHR7XHJcblx0XHRsZXQgaW5zdGFuY2UgPSB0aGlzO1xyXG5cdFx0bGV0IFByb2R1Y3RzID0gQ29udGFpbmVyJDMuZ2V0SW5zdGFuY2UoJ1Byb2R1Y3RzJyk7XHJcblxyXG5cdFx0dGhpcy5uZXh0LmNoaWxkTm9kZXNbMF0ub25jbGljayA9IGZ1bmN0aW9uKGV2ZW50KSB7XHJcblx0XHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG5cdFx0XHRQcm9kdWN0cy5nZXRQcm9kdWN0c0J5UGFnZShpbnN0YW5jZS5jdXJyZW50KzEpLnRoZW4oZnVuY3Rpb24ocHJvZHVjdHMpIHtcclxuXHRcdFx0XHRQcm9kdWN0cy5yZXBsYWNlSXRlbXMocHJvZHVjdHMpO1xyXG5cdFx0XHR9KTtcclxuXHJcblx0XHRcdGluc3RhbmNlLnNldEN1cnJlbnQoaW5zdGFuY2UuY3VycmVudCsxKTtcclxuXHRcdH07XHJcblxyXG5cdFx0dGhpcy5wcmV2aW91cy5jaGlsZE5vZGVzWzBdLm9uY2xpY2sgPSBmdW5jdGlvbihldmVudCkge1xyXG5cdFx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdFx0XHRcclxuXHRcdFx0UHJvZHVjdHMuZ2V0UHJvZHVjdHNCeVBhZ2UoaW5zdGFuY2UuY3VycmVudC0xKS50aGVuKGZ1bmN0aW9uKHByb2R1Y3RzKSB7XHJcblx0XHRcdFx0UHJvZHVjdHMucmVwbGFjZUl0ZW1zKHByb2R1Y3RzKTtcclxuXHRcdFx0fSk7XHJcblxyXG5cdFx0XHRpbnN0YW5jZS5zZXRDdXJyZW50KGluc3RhbmNlLmN1cnJlbnQtMSk7XHJcblx0XHR9O1xyXG5cclxuXHRcdGZvcih2YXIgaSA9IDA7IGkgPCB0aGlzLnBhZ2VzLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdHRoaXMucGFnZXNbaV0uY2hpbGROb2Rlc1swXS5vbmNsaWNrID0gZnVuY3Rpb24oZXZlbnQpIHtcclxuXHRcdFx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdFx0XHRcdHZhciBwYWdlTnVtYmVyID0gdGhpcy5nZXRBdHRyaWJ1dGUoJ2RhdGEtcGFnZS1ucicpO1xyXG5cdFx0XHRcdFxyXG5cdFx0XHRcdFByb2R1Y3RzLmdldFByb2R1Y3RzQnlQYWdlKHBhZ2VOdW1iZXIpLnRoZW4oZnVuY3Rpb24ocHJvZHVjdHMpIHtcclxuXHRcdFx0XHRcdFByb2R1Y3RzLnJlcGxhY2VJdGVtcyhwcm9kdWN0cyk7XHJcblx0XHRcdFx0fSk7XHJcblx0XHRcdFx0XHJcblx0XHRcdFx0aW5zdGFuY2Uuc2V0Q3VycmVudChwYWdlTnVtYmVyKTtcclxuXHRcdFx0fTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFNldHMgdGhlIGN1cnJlbnQgcGFnZS5cclxuXHQgKi9cclxuXHRzZXRDdXJyZW50KHBhZ2VOdW1iZXIpIFxyXG5cdHtcclxuXHRcdGlmKHRoaXMubm90SW5QYWdlUmFuZ2UocGFnZU51bWJlcikpIHtcclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0fVxyXG5cclxuXHRcdHRoaXMuY3VycmVudCA9IHBhcnNlSW50KHBhZ2VOdW1iZXIpO1xyXG5cdFx0dGhpcy5jaGFuZ2VVcmwocGFnZU51bWJlcik7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBHZXRzIHRoZSBjdXJyZW50IHBhZ2UuXHJcblx0ICovXHJcblx0Z2V0Q3VycmVudCgpIFxyXG5cdHtcclxuXHRcdHJldHVybiB0aGlzLmN1cnJlbnQ7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBDcmVhdGVzIHRoZSBwYWdpbmF0aW9uIGxpbmtzLlxyXG5cdCAqL1xyXG5cdGNyZWF0ZUxpbmtzKCkgXHJcblx0e1x0XHJcblx0XHRsZXQgdWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd1bCcpO1xyXG5cdFx0XHJcblx0XHR0aGlzLnBhZ2VzID0gdGhpcy5jcmVhdGVQYWdlTGlua3MoKTtcclxuXHRcdHRoaXMucHJldmlvdXMgPSB0aGlzLmNyZWF0ZVByZXZpb3VzQnV0dG9uKCk7XHJcblx0XHR0aGlzLm5leHQgPSB0aGlzLmNyZWF0ZU5leHRCdXR0b24oKTtcclxuXHJcblx0XHR1bC5jbGFzc05hbWUgPSAncGFnaW5hdGlvbic7XHJcblx0XHR1bC5hcHBlbmRDaGlsZCh0aGlzLnByZXZpb3VzKTtcclxuXHJcblx0XHR0aGlzLnBhZ2VzLmZvckVhY2goZnVuY3Rpb24ocGFnZSkge1xyXG5cdFx0XHR1bC5hcHBlbmRDaGlsZChwYWdlKTtcclxuXHRcdH0pO1xyXG5cclxuXHRcdHVsLmFwcGVuZENoaWxkKHRoaXMubmV4dCk7XHJcblxyXG5cdFx0cmV0dXJuIHVsO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQ3JlYXRlcyB0aGUgcGFnZXMgaXRlbSBsaW5rcy5cclxuXHQgKi9cclxuXHRjcmVhdGVQYWdlTGlua3MoKSBcclxuXHR7XHJcblx0XHR2YXIgcGFnZXMgPSBbXTtcclxuXHJcblx0XHRmb3IodmFyIGkgPSAxOyBpIDw9IHRoaXMudG90YWxQYWdlczsgaSsrKSB7XHJcblx0XHRcdHZhciBwYWdlSXRlbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJyk7XHJcblx0XHRcdHZhciBsaW5rID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpO1xyXG5cdFx0XHRwYWdlSXRlbS5jbGFzc05hbWUgPSAncGFnZS1pdGVtJztcclxuXHRcdFx0bGluay5jbGFzc05hbWUgPSAncGFnZS1saW5rJztcclxuXHRcdFx0bGluay5zZXRBdHRyaWJ1dGUoJ2hyZWYnLCAnP3BhZ2U9JysgaSk7XHJcblx0XHRcdGxpbmsuc2V0QXR0cmlidXRlKCdkYXRhLXBhZ2UtbnInLCBpKTtcclxuXHRcdFx0bGluay5pbm5lckhUTUwgPSBpO1xyXG5cdFx0XHRwYWdlSXRlbS5hcHBlbmRDaGlsZChsaW5rKTtcclxuXHRcdFx0cGFnZXMucHVzaChwYWdlSXRlbSk7XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIHBhZ2VzO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQ3JlYXRlcyB0aGUgcHJldmlvdXMgYnV0dG9uIGxpbmsuXHJcblx0ICovXHJcblx0Y3JlYXRlUHJldmlvdXNCdXR0b24oKSBcclxuXHR7XHJcblx0XHR2YXIgbGkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaScpO1xyXG5cdFx0dmFyIGxpbmsgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJyk7XHJcblx0XHR2YXIgc3BhbjEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XHJcblx0XHR2YXIgc3BhbjIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XHJcblx0XHRcclxuXHRcdFxyXG5cdFx0bGkuY2xhc3NOYW1lID0gJ3BhZ2UtaXRlbSc7XHJcblx0XHRsaW5rLmNsYXNzTmFtZSA9ICdwYWdlLWxpbmsnO1xyXG5cdFx0c3BhbjIuY2xhc3NOYW1lID0gJ3NyLW9ubHknO1xyXG5cclxuXHRcdGxpbmsuc2V0QXR0cmlidXRlKCdocmVmJywgJycpO1xyXG5cdFx0bGluay5zZXRBdHRyaWJ1dGUoJ2FyaWEtbGFiZWwnLCAnUHJldmlvdXMnKTtcclxuXHRcdHNwYW4xLnNldEF0dHJpYnV0ZSgnYXJpYS1oaWRkZW4nLCAndHJ1ZScpO1xyXG5cclxuXHRcdHNwYW4xLmlubmVySFRNTCA9ICcmbGFxdW87JztcclxuXHRcdHNwYW4yLmlubmVySFRNTCA9ICdQcmV2aW91cyc7XHJcblxyXG5cdFx0bGluay5hcHBlbmRDaGlsZChzcGFuMSk7XHJcblx0XHRsaW5rLmFwcGVuZENoaWxkKHNwYW4yKTtcclxuXHRcdGxpLmFwcGVuZENoaWxkKGxpbmspO1xyXG5cclxuXHRcdHJldHVybiBsaTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIENyZWF0ZXMgdGhlIG5leHQgYnV0dG9uIGxpbmsuXHJcblx0ICovXHJcblx0Y3JlYXRlTmV4dEJ1dHRvbigpIFxyXG5cdHtcclxuXHRcdHZhciBsaSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJyk7XHJcblx0XHR2YXIgbGluayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKTtcclxuXHRcdHZhciBzcGFuMSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcclxuXHRcdHZhciBzcGFuMiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcclxuXHRcdFxyXG5cdFx0bGkuY2xhc3NOYW1lID0gJ3BhZ2UtaXRlbSc7XHJcblx0XHRsaW5rLmNsYXNzTmFtZSA9ICdwYWdlLWxpbmsnO1xyXG5cdFx0c3BhbjIuY2xhc3NOYW1lID0gJ3NyLW9ubHknO1xyXG5cclxuXHRcdGxpbmsuc2V0QXR0cmlidXRlKCdocmVmJywgJycpO1xyXG5cdFx0bGluay5zZXRBdHRyaWJ1dGUoJ2FyaWEtbGFiZWwnLCAnTmV4dCcpO1xyXG5cdFx0c3BhbjEuc2V0QXR0cmlidXRlKCdhcmlhLWhpZGRlbicsICd0cnVlJyk7XHJcblxyXG5cdFx0c3BhbjEuaW5uZXJIVE1MID0gJyZyYXF1bzsnO1xyXG5cdFx0c3BhbjIuaW5uZXJIVE1MID0gJ05leHQnO1xyXG5cclxuXHRcdGxpbmsuYXBwZW5kQ2hpbGQoc3BhbjEpO1xyXG5cdFx0bGluay5hcHBlbmRDaGlsZChzcGFuMik7XHJcblx0XHRsaS5hcHBlbmRDaGlsZChsaW5rKTtcclxuXHJcblx0XHRyZXR1cm4gbGk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBDaGVja3MgaWYgdGhlIGdpdmVuIHBhZ2UgaXMgaW4gcmFuZ2UuXHJcblx0ICovXHJcblx0bm90SW5QYWdlUmFuZ2UocGFnZU51bWJlcikgXHJcblx0e1xyXG5cdFx0cmV0dXJuIChwYWdlTnVtYmVyID4gdGhpcy50b3RhbFBhZ2VzIHx8IHBhZ2VOdW1iZXIgPD0gMCkgfHwgaXNOYU4ocGFnZU51bWJlcik7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBDaGFuZ2VzIHRoZSB1cmwgdG8gYSBnaXZlbiBwYWdlIG51bWJlci5cclxuXHQgKi9cclxuXHRjaGFuZ2VVcmwocGFnZU51bWJlcikgXHJcblx0e1xyXG5cdFx0cGFnZU51bWJlciA9ICBwYWdlTnVtYmVyIHx8IEdFVF9WYXJzKClbJ3BhZ2UnXTtcclxuXHRcdHdpbmRvdy5oaXN0b3J5LnJlcGxhY2VTdGF0ZSgnJywgJycsIHRoaXMudXBkYXRlVVJMUGFyYW1ldGVyKHdpbmRvdy5sb2NhdGlvbi5ocmVmLCAncGFnZScsIHBhZ2VOdW1iZXIpKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEdldCB0aGUgZ2V0IHZhcmlhYmxlcyBmcm9tIHRoZSB1cmwuXHJcblx0ICovXHJcblx0R0VUX1ZhcnMoKSBcclxuXHR7XHJcblx0XHR2YXIgdmFycyA9IHt9O1xyXG5cdFx0dmFyIHBhcnRzID0gd2luZG93LmxvY2F0aW9uLmhyZWYucmVwbGFjZSgvWz8mXSsoW149Jl0rKT0oW14mXSopL2dpLCBmdW5jdGlvbihtLCBrZXksIHZhbHVlKSB7XHJcblx0XHRcdHZhcnNba2V5XSA9IHZhbHVlO1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0cmV0dXJuIHZhcnM7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBNb2RpZmllcyB0aGUgZ2V0IHBhcmFtZXRlciBpbiB0aGUgdXJsLlxyXG5cdCAqL1xyXG5cdHVwZGF0ZVVSTFBhcmFtZXRlcih1cmwsIHBhcmFtLCBwYXJhbVZhbCkgXHJcblx0e1xyXG5cdCAgICB2YXIgbmV3QWRkaXRpb25hbFVSTCA9IFwiXCI7XHJcblx0ICAgIHZhciB0ZW1wQXJyYXkgPSB1cmwuc3BsaXQoXCI/XCIpO1xyXG5cdCAgICB2YXIgYmFzZVVSTCA9IHRlbXBBcnJheVswXTtcclxuXHQgICAgdmFyIGFkZGl0aW9uYWxVUkwgPSB0ZW1wQXJyYXlbMV07XHJcblx0ICAgIHZhciB0ZW1wID0gXCJcIjtcclxuXHJcblx0ICAgIGlmIChhZGRpdGlvbmFsVVJMKSB7XHJcblx0ICAgICAgICB0ZW1wQXJyYXkgPSBhZGRpdGlvbmFsVVJMLnNwbGl0KFwiJlwiKTtcclxuXHQgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGVtcEFycmF5Lmxlbmd0aDsgaSsrKXtcclxuXHQgICAgICAgICAgICBpZiAodGVtcEFycmF5W2ldLnNwbGl0KCc9JylbMF0gIT0gcGFyYW0pe1xyXG5cdCAgICAgICAgICAgICAgICBuZXdBZGRpdGlvbmFsVVJMICs9IHRlbXAgKyB0ZW1wQXJyYXlbaV07XHJcblx0ICAgICAgICAgICAgICAgIHRlbXAgPSBcIiZcIjtcclxuXHQgICAgICAgICAgICB9XHJcblx0ICAgICAgICB9XHJcblx0ICAgIH1cclxuXHJcblx0ICAgIHZhciByb3dzVGV4dCA9IHRlbXAgKyBcIlwiICsgcGFyYW0gKyBcIj1cIiArIHBhcmFtVmFsO1xyXG5cdCAgICByZXR1cm4gYmFzZVVSTCArIFwiP1wiICsgbmV3QWRkaXRpb25hbFVSTCArIHJvd3NUZXh0O1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogUmVzZXRzIHRoZSBwYWdpbmF0aW9uLlxyXG5cdCAqL1xyXG5cdHJlc2V0KCkgXHJcblx0e1xyXG5cdFx0dGhpcy5zZXRDdXJyZW50KDEpO1xyXG5cdFx0dGhpcy5jaGFuZ2VVcmwoMSk7XHJcblx0fVxyXG59XG5cbi8qKlxyXG4gKiBUaGUgZGVmYXVsdCBzZXR0aW5ncyBvZiB0aGUgY2FydC5cclxuICovXHJcbmxldCBkZWZhdWx0U2V0dGluZ3MkNCA9IHtcclxuXHRlbGVtZW50OiAnLmNhcnQnLFxyXG5cdGNvb2tpZV9uYW1lOiAnY2FydCcsXHJcblx0cHJldmlld19jbGFzczogJycsXHJcblx0Y2xhc3M6ICcnLFxyXG5cdHdpZHRoOiAnNjBweCcsXHJcblx0aGVpZ2h0OiAnNjBweCcsXHJcblx0cGxhY2VtZW50OiAncmlnaHQtdG9wJyxcclxuXHRmaXhlZDogdHJ1ZSxcclxuXHRob3Zlcl9jb2xvcjogJ29yYW5nZSdcclxufTtcclxuXHJcbi8qKlxyXG4gKiBTdG9yZXMgdGhlIGNvbnRhaW5lciBvYmplY3QuXHJcbiAqL1xyXG5sZXQgQ29udGFpbmVyJDQ7XHJcblxyXG4vKipcclxuICogVGhlIENhcnQgT2JqZWN0LCBoYW5kbGVzIHRoZSBjYXJ0IGljb24gYW5kIHNlc3Npb25zLlxyXG4gKi9cclxuY2xhc3MgQ2FydCBcclxue1xyXG5cdC8qKlxyXG5cdCAqIEluaXRpYWxpemUgdGhlIGRlZmF1bHQgc2V0dGluZ3MsIHNldHRpbmcgdGhlIGVsZW1lbnQsXHJcblx0ICogYW5kIGNyZWF0aW5nIHRoZSBwcmV2aWV3IGZvciB0aGUgY2FydHMgZGV0YWlscy5cclxuXHQgKi9cclxuXHRjb25zdHJ1Y3Rvcihjb250YWluZXIpIFxyXG5cdHtcclxuXHRcdENvbnRhaW5lciQ0ID0gY29udGFpbmVyO1xyXG5cdFx0XHJcblx0XHR0aGlzLnByZXZpZXdFbGVtZW50ID0gdGhpcy5jcmVhdGVQcmV2aWV3RWxlbWVudCgpO1xyXG5cdFx0dGhpcy5zdmdJY29uID0gY3JlYXRlSWNvbi5jYWxsKHRoaXMpO1xyXG5cdFx0dGhpcy5pdGVtcyA9IFtdO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogU2V0cyB0aGUgb2JqZWN0IGJ5IHRoZSB1c2VycyBzZXR0aW5nLlxyXG5cdCAqL1xyXG5cdHNldHVwKHNldHRpbmdzKVxyXG5cdHtcclxuXHRcdGlmKHR5cGVvZiBzZXR0aW5ncyAhPSAnb2JqZWN0Jykge1xyXG5cdFx0XHR0aHJvdyBuZXcgSW52YWxpZEFyZ3VtZW50RXhjZXB0aW9uJDE7XHJcblx0XHR9XHJcblxyXG5cdFx0dGhpcy5zZXR0aW5ncyA9IENvbW1vbi5leHRlbmQoZGVmYXVsdFNldHRpbmdzJDQsIHNldHRpbmdzKTtcclxuXHJcblx0XHR0aGlzLnNldEVsZW1lbnQodGhpcy5zZXR0aW5ncy5lbGVtZW50KTtcclxuXHRcdERPTS5hZGRDbGFzcyh0aGlzLnByZXZpZXdFbGVtZW50LCAnY2xvc2VkJyk7XHJcblx0XHRET00uYWRkQ2xhc3ModGhpcy5wcmV2aWV3RWxlbWVudCwgdGhpcy5zZXR0aW5ncy5wcmV2aWV3X2NsYXNzKTtcclxuXHRcdFxyXG5cdFx0dGhpcy5iaW5kRXZlbnRMaXN0ZW5lcnMoKTtcclxuXHRcdHRoaXMuYWRkU3R5bGVUYWcoKTtcclxuXHRcdFxyXG5cdFx0dGhpcy5zZXRDYXJ0Q29va2llKHRoaXMuc2V0dGluZ3MuY29va2llX25hbWUpO1xyXG5cdH1cclxuXHJcblx0YWRkSXRlbShpdGVtKVxyXG5cdHtcclxuXHRcdHRoaXMuaXRlbXMgPSBDb21tb24uZ2V0Q29va2llKCdjYXJ0Jyk7XHJcblxyXG5cdFx0dGhpcy5pdGVtcy5wdXNoKGl0ZW0pO1xyXG5cclxuXHRcdENvbW1vbi5jcmVhdGVDb29raWUodGhpcy5zZXR0aW5ncy5jb29raWVfbmFtZSwgdGhpcy5pdGVtcywgMik7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBCaW5kcyBldmVydGhpbmcgdG8gdGhlIGVsZW1lbnQuXHJcblx0ICovXHJcblx0c2V0RWxlbWVudChzZWxlY3RvcilcclxuXHR7XHJcblx0XHR0aGlzLmljb24gPSBET00uZWxlbWVudChzZWxlY3Rvcik7XHJcblxyXG5cdFx0aWYgKHRoaXMuaWNvbikge1xyXG5cdFx0XHRET00uYWRkQ2xhc3ModGhpcy5pY29uLCB0aGlzLnNldHRpbmdzLmNsYXNzKTtcclxuXHRcdFx0RE9NLmFkZENsYXNzKHRoaXMuaWNvbiwgdGhpcy5zZXR0aW5ncy5wbGFjZW1lbnQpO1xyXG5cdFx0XHR0aGlzLmljb24uYXBwZW5kQ2hpbGQodGhpcy5zdmdJY29uKTtcclxuXHRcdFx0dGhpcy5pY29uLmFwcGVuZENoaWxkKHRoaXMucHJldmlld0VsZW1lbnQpO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQ3JlYXRlcyB0aGUgY2FydCBkZXRhaWxzIHByZXZpZXcgZWxlbWVudC5cclxuXHQgKi9cclxuXHRjcmVhdGVQcmV2aWV3RWxlbWVudCgpXHJcblx0e1xyXG5cdFx0bGV0IHByZXZpZXdFbGVtZW50ID0gRE9NLmNyZWF0ZUVsZW1lbnQoJ2RpdicsIHtcclxuXHRcdFx0aWQ6ICdwcmV2aWV3J1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0cmV0dXJuIHByZXZpZXdFbGVtZW50O1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQWRkIHRoZSBlQ29tbWVyY2Ugc3R5bGUgdGFncyB0byB0aGUgRE9NLlxyXG5cdCAqL1xyXG5cdGFkZFN0eWxlVGFnKCkgXHJcblx0e1xyXG5cdFx0aWYoRE9NLmVsZW1lbnQoJyNlQ29tbWVyY2UtQ2FydCcpKSB7XHJcblx0XHRcdHJldHVybjtcclxuXHRcdH1cclxuXHJcblx0XHRsZXQgcG9zaXRpb24gPSAodGhpcy5zZXR0aW5ncy5maXhlZCkgPyAnZml4ZWQnIDogJ2Fic29sdXRlJztcclxuXHJcblx0XHRsZXQgY3NzID0gYFxyXG5cdFx0XHQke3RoaXMuc2V0dGluZ3MuZWxlbWVudH0ge1xyXG5cdFx0XHRcdHBvc2l0aW9uOiAke3Bvc2l0aW9ufTtcclxuXHRcdFx0XHRjdXJzb3I6IHBvaW50ZXI7XHJcblx0XHRcdFx0Y29sb3I6ICNmZmZmZmY7XHJcblx0XHRcdFx0ei1pbmRleDogOTk4O1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHQke3RoaXMuc2V0dGluZ3MuZWxlbWVudH0gPiBzdmcge1xyXG5cdFx0XHRcdHdpZHRoOiAke3RoaXMuc2V0dGluZ3Mud2lkdGh9O1xyXG5cdFx0XHRcdGhlaWdodDogJHt0aGlzLnNldHRpbmdzLmhlaWdodH07XHJcblx0XHRcdFx0dHJhbnNpdGlvbjogZmlsbCAwLjNzO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHQke3RoaXMuc2V0dGluZ3MuZWxlbWVudH0gPiBzdmc6aG92ZXIge1xyXG5cdFx0XHRcdGZpbGw6ICR7dGhpcy5zZXR0aW5ncy5ob3Zlcl9jb2xvcn07XHJcblx0XHRcdFx0dHJhbnNpdGlvbjogZmlsbCAwLjNzO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHQke3RoaXMuc2V0dGluZ3MuZWxlbWVudH0udG9wLXJpZ2h0LFxyXG5cdFx0XHQke3RoaXMuc2V0dGluZ3MuZWxlbWVudH0ucmlnaHQtdG9wIHtcclxuXHRcdFx0XHRyaWdodDogMTBweDtcclxuXHRcdFx0XHR0b3A6IDEwcHg7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdCR7dGhpcy5zZXR0aW5ncy5lbGVtZW50fS5sZWZ0LXRvcCxcclxuXHRcdFx0JHt0aGlzLnNldHRpbmdzLmVsZW1lbnR9LnRvcC1sZWZ0IHtcclxuXHRcdFx0XHRsZWZ0OiAxMHB4O1xyXG5cdFx0XHRcdHRvcDogMTBweDtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0JHt0aGlzLnNldHRpbmdzLmVsZW1lbnR9ID4gI3ByZXZpZXcge1xyXG5cdFx0XHRcdHBvc2l0aW9uOiAke3Bvc2l0aW9ufTtcclxuXHRcdFx0XHR6LWluZGV4OiA5OTk5O1xyXG5cdFx0XHRcdHRvcDogY2FsYygxMHB4ICsgJHt0aGlzLnNldHRpbmdzLmhlaWdodH0pO1xyXG5cdFx0XHRcdHRyYW5zZm9ybTogdHJhbnNsYXRlWCg2MHB4KTtcclxuXHRcdFx0XHRoZWlnaHQ6IDQwMHB4O1xyXG5cdFx0XHRcdHdpZHRoOiAzMDBweDtcclxuXHRcdFx0XHRib3JkZXI6IDFweCBzb2xpZCAjZTRlNGU0O1xyXG5cdFx0XHRcdGJhY2tncm91bmQ6ICNmZmZmZmY7XHJcblx0XHRcdFx0dHJhbnNpdGlvbjogdHJhbnNmb3JtIDFzLCB2aXNpYmlsaXR5IDFzO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHQke3RoaXMuc2V0dGluZ3MuZWxlbWVudH0gPiAjcHJldmlldy5vcGVuZWQge1xyXG5cdFx0XHRcdHZpc2liaWxpdHk6IHZpc2libGU7XHJcblx0XHRcdFx0dHJhbnNmb3JtOiB0cmFuc2xhdGVYKC0yNDBweCk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdCR7dGhpcy5zZXR0aW5ncy5lbGVtZW50fSA+ICNwcmV2aWV3LmNsb3NlZCB7XHJcblx0XHRcdFx0dmlzaWJpbGl0eTogaGlkZGVuO1xyXG5cdFx0XHRcdHRyYW5zZm9ybTogdHJhbnNsYXRlWCg2MHB4KTtcclxuXHRcdFx0fVxyXG5cdFx0YDtcclxuXHQgICAgXHJcblx0ICAgIERPTS5hZGRTdHlsZSgnZUNvbW1lcmNlLUNhcnQnLCBjc3MpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQmluZHMgZXZlbnQgbGlzdGVuZXJzIHRvIHRoZSBjYXJ0IGljb24uXHJcblx0ICovXHJcblx0YmluZEV2ZW50TGlzdGVuZXJzKClcclxuXHR7XHJcblx0XHRpZih0aGlzLnN2Z0ljb24gPT0gbnVsbCkge1xyXG5cdFx0XHRyZXR1cm47XHJcblx0XHR9XHJcblxyXG5cdFx0dGhpcy5zdmdJY29uLm9uY2xpY2sgPSBmdW5jdGlvbihldmVudCkge1xyXG5cdFx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdFx0XHRET00udG9nZ2xlQ2xhc3ModGhpcy5wcmV2aWV3RWxlbWVudCwgJ29wZW5lZCcsICdjbG9zZWQnKTtcclxuXHRcdH0uYmluZCh0aGlzKTtcclxuXHJcblx0XHR0aGlzLnByZXZpZXdFbGVtZW50Lm9ubW91c2VvdXQgPSBmdW5jdGlvbihldmVudCkge1xyXG5cdFx0XHRjbG9zZS5jYWxsKHRoaXMsIGV2ZW50KTtcclxuXHRcdH0uYmluZCh0aGlzKTtcclxuXHR9XHJcblxyXG5cdHNldENhcnRDb29raWUobmFtZSlcclxuXHR7XHJcblx0XHRpZihDb21tb24uZ2V0Q29va2llKG5hbWUpKSB7XHJcblx0XHRcdHJldHVybjtcclxuXHRcdH1cclxuXHJcblx0XHRDb21tb24uY3JlYXRlQ29va2llKCdjYXJ0JywgW10sIDIpOyBcclxuXHR9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNsb3NlKGV2ZW50KSB7XHJcblx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuXHRET00uc3dpdGNoQ2xhc3Nlcyh0aGlzLnByZXZpZXdFbGVtZW50LCAnb3BlbmVkJywgJ2Nsb3NlZCcpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBjcmVhdGVJY29uKCkge1xyXG5cdGxldCBzdmcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50TlMoXCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiLCBcInN2Z1wiKTtcclxuXHRsZXQgZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnROUyhcImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIsIFwiZ1wiKTtcclxuXHRsZXQgcGF0aCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnROUyhcImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIsIFwicGF0aFwiKTtcclxuXHJcblx0c3ZnLnNldEF0dHJpYnV0ZSgndmVyc2lvbicsICcxLjEnKTtcclxuXHRzdmcuc2V0QXR0cmlidXRlKCd4bWxucycsICdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZycpO1xyXG5cdHN2Zy5zZXRBdHRyaWJ1dGUoJ3htbG5zOnhsaW5rJywgJ2h0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsnKTtcclxuXHRzdmcuc2V0QXR0cmlidXRlKCd4JywgJzBweCcpO1xyXG5cdHN2Zy5zZXRBdHRyaWJ1dGUoJ3knLCAnMHB4Jyk7XHJcblx0c3ZnLnNldEF0dHJpYnV0ZSgnd2lkdGgnLCAnNDQ2Ljg0M3B4Jyk7XHJcblx0c3ZnLnNldEF0dHJpYnV0ZSgnaGVpZ2h0JywgJzQ0Ni44NDNweCcpO1xyXG5cdHN2Zy5zZXRBdHRyaWJ1dGUoJ3ZpZXdCb3gnLCAnMCAwIDQ0Ni44NDMgNDQ2Ljg0MycpO1xyXG5cdHN2Zy5zZXRBdHRyaWJ1dGUoJ3N0eWxlJywgJ2VuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgNDQ2Ljg0MyA0NDYuODQzOycpO1xyXG5cdHN2Zy5zZXRBdHRyaWJ1dGUoJ3htbDpzcGFjZScsICdwcmVzZXJ2ZScpO1xyXG5cclxuXHRwYXRoLnNldEF0dHJpYnV0ZSgnZCcsICdNNDQ0LjA5LDkzLjEwM2MtMi42OTgtMy42OTktNy4wMDYtNS44ODgtMTEuNTg0LTUuODg4SDEwOS45MmMtMC42MjUsMC0xLjI0OSwwLjAzOC0xLjg1LDAuMTE5bC0xMy4yNzYtMzguMjdjLTEuMzc2LTMuOTU4LTQuNDA2LTcuMTEzLTguMy04LjY0NkwxOS41ODYsMTQuMTM0Yy03LjM3NC0yLjg4Ny0xNS42OTUsMC43MzUtMTguNTkxLDguMWMtMi44OTEsNy4zNjksMC43MywxNS42OTUsOC4xLDE4LjU5MWw2MC43NjgsMjMuODcybDc0LjM4MSwyMTQuMzk5Yy0zLjI4MywxLjE0NC02LjA2NSwzLjY2My03LjMzMiw3LjE4N2wtMjEuNTA2LDU5LjczOWMtMS4zMTgsMy42NjMtMC43NzUsNy43MzMsMS40NjgsMTAuOTE2YzIuMjQsMy4xODMsNS44ODMsNS4wNzgsOS43NzMsNS4wNzhoMTEuMDQ0Yy02Ljg0NCw3LjYxNi0xMS4wNDQsMTcuNjQ2LTExLjA0NCwyOC42NzVjMCwyMy43MTgsMTkuMjk4LDQzLjAxMiw0My4wMTIsNDMuMDEyczQzLjAxMi0xOS4yOTQsNDMuMDEyLTQzLjAxMmMwLTExLjAyOS00LjItMjEuMDU5LTExLjA0NC0yOC42NzVoOTMuNzc2Yy02Ljg0Nyw3LjYxNi0xMS4wNDgsMTcuNjQ2LTExLjA0OCwyOC42NzVjMCwyMy43MTgsMTkuMjk0LDQzLjAxMiw0My4wMTMsNDMuMDEyYzIzLjcxOCwwLDQzLjAxMi0xOS4yOTQsNDMuMDEyLTQzLjAxMmMwLTExLjAyOS00LjItMjEuMDU5LTExLjA0My0yOC42NzVoMTMuNDMzYzYuNTk5LDAsMTEuOTQ3LTUuMzQ5LDExLjk0Ny0xMS45NDhjMC02LjU5OS01LjM0OS0xMS45NDctMTEuOTQ3LTExLjk0N0gxNDMuNjQ3bDEzLjMxOS0zNi45OTZjMS43MiwwLjcyNCwzLjU3OCwxLjE1Miw1LjUyMywxLjE1MmgyMTAuMjc4YzYuMjM0LDAsMTEuNzUxLTQuMDI3LDEzLjY1LTkuOTU5bDU5LjczOS0xODYuMzg3QzQ0Ny41NTcsMTAxLjU2Nyw0NDYuNzg4LDk2LjgwMiw0NDQuMDksOTMuMTAzeiBNMTY5LjY1OSw0MDkuODA3Yy0xMC41NDMsMC0xOS4xMTYtOC41NzMtMTkuMTE2LTE5LjExNnM4LjU3My0xOS4xMTcsMTkuMTE2LTE5LjExN3MxOS4xMTYsOC41NzQsMTkuMTE2LDE5LjExN1MxODAuMjAyLDQwOS44MDcsMTY5LjY1OSw0MDkuODA3eiBNMzI3LjM2Nyw0MDkuODA3Yy0xMC41NDMsMC0xOS4xMTctOC41NzMtMTkuMTE3LTE5LjExNnM4LjU3NC0xOS4xMTcsMTkuMTE3LTE5LjExN2MxMC41NDIsMCwxOS4xMTYsOC41NzQsMTkuMTE2LDE5LjExN1MzMzcuOTA5LDQwOS44MDcsMzI3LjM2Nyw0MDkuODA3eiBNNDAyLjUyLDE0OC4xNDloLTczLjE2MVYxMTUuODloODMuNDk5TDQwMi41MiwxNDguMTQ5eiBNMzgxLjQ1MywyMTMuODYxaC01Mi4wOTR2LTM3LjAzOGg2My45NjdMMzgxLjQ1MywyMTMuODYxeiBNMjM0LjU3MSwyMTMuODYxdi0zNy4wMzhoNjYuMTEzdjM3LjAzOEgyMzQuNTcxeiBNMzAwLjY4NCwyNDIuNTM4djMxLjA2NGgtNjYuMTEzdi0zMS4wNjRIMzAwLjY4NHogTTEzOS4xMTUsMTc2LjgyM2g2Ni43ODR2MzcuMDM4aC01My45MzNMMTM5LjExNSwxNzYuODIzeiBNMjM0LjU3MSwxNDguMTQ5VjExNS44OWg2Ni4xMTN2MzIuMjU5SDIzNC41NzF6IE0yMDUuODk4LDExNS44OXYzMi4yNTloLTc2LjczNGwtMTEuMTkxLTMyLjI1OUgyMDUuODk4eiBNMTYxLjkxNiwyNDIuNTM4aDQzLjk4MnYzMS4wNjRoLTMzLjIwNkwxNjEuOTE2LDI0Mi41Mzh6IE0zMjkuMzU5LDI3My42MDN2LTMxLjA2NGg0Mi45MDlsLTkuOTU1LDMxLjA2NEgzMjkuMzU5eicpO1xyXG5cclxuXHRnLmFwcGVuZENoaWxkKHBhdGgpO1xyXG5cdHN2Zy5hcHBlbmRDaGlsZChnKTtcclxuXHJcblxyXG5cdHJldHVybiBzdmc7XHJcbn1cblxubGV0IGluaXRhbGl6ZWQgPSBmYWxzZTtcblxubGV0IGRlZmF1bHRTZXR0aW5ncyA9IHtcblx0aW1wb3J0Qm9vdHN0cmFwOiBmYWxzZSxcblx0Y29tcG9uZW50czogWydQcm9kdWN0cycsICdTZXJ2aWNlcycsICdGaWx0ZXInLCAnUGFnaW5hdGlvbiddXG59O1xuXG5jbGFzcyBlQ29tbWVyY2Vcbntcblx0Y29uc3RydWN0b3Ioc2V0dGluZ3MpXG5cdHtcblx0XHRFeGNlcHRpb25IYW5kbGVyLmluaXRhbGl6ZSgpO1xuXG5cdFx0aWYodHlwZW9mIHNldHRpbmdzICE9ICdvYmplY3QnKSB7XG5cdFx0XHR0aHJvdyBuZXcgSW52YWxpZEFyZ3VtZW50RXhjZXB0aW9uJDE7XG5cdFx0fVxuXG5cdFx0dGhpcy5jb250YWluZXIgPSBuZXcgQ29udGFpbmVyO1xuXHRcdHRoaXMuc2V0dGluZ3MgPSBDb21tb24uZXh0ZW5kKGRlZmF1bHRTZXR0aW5ncywgc2V0dGluZ3MpO1xuXHRcdFxuXHRcdGJpbmRDb21wb25lbnRzRGVwZW5kZW5jaWVzLmNhbGwodGhpcywgc2V0dGluZ3MuY29tcG9uZW50cyk7XG5cblx0XHRpbml0YWxpemVkID0gdHJ1ZTtcblxuXHRcdHJldHVybiBuZXcgUHJveHkodGhpcywge1xuXHRcdFx0Z2V0OiBmdW5jdGlvbih0YXJnZXQsIG9iamVjdCkge1xuXHRcdFx0XHRpZighIENvbW1vbi5pbl9hcnJheShvYmplY3QsIHNldHRpbmdzLmNvbXBvbmVudHMpKSB7XG5cdFx0XHRcdFx0dGhyb3cgbmV3IENvbXBvbmVudE5vdFJlZ2lzdGVyZWRFeGNlcHRpb247XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRyZXR1cm4gdGFyZ2V0LmNvbnRhaW5lci5tYWtlKG9iamVjdCk7XG5cdFx0XHR9XG5cdFx0fSk7XG5cdH1cbn1cblxuLyoqXG4gKiBCaW5kcyBjb21wb25lbnRzIGRlcGVuZGVuY2llcy5cbiAqL1xuZnVuY3Rpb24gYmluZENvbXBvbmVudHNEZXBlbmRlbmNpZXMoY29tcG9uZW50cykge1xuXHR0aGlzLmNvbnRhaW5lci5iaW5kKCdGaWx0ZXInLCBmdW5jdGlvbihjb250YWluZXIpIHtcblx0XHRyZXR1cm4gbmV3IEZpbHRlcihjb250YWluZXIpO1xuXHR9KTtcblx0XG5cdHRoaXMuY29udGFpbmVyLmJpbmQoJ1NlcnZpY2VzJywgZnVuY3Rpb24oY29udGFpbmVyKSB7IFxuXHRcdHJldHVybiBuZXcgU2VydmljZXMoY29udGFpbmVyKTtcblx0fSk7XG5cblx0dGhpcy5jb250YWluZXIuYmluZCgnUGFnaW5hdGlvbicsIGZ1bmN0aW9uKGNvbnRhaW5lcikge1xuXHRcdHJldHVybiBuZXcgUGFnaW5hdGlvbihjb250YWluZXIpO1xuXHR9KTtcblxuXHR0aGlzLmNvbnRhaW5lci5iaW5kKCdQcm9kdWN0cycsIGZ1bmN0aW9uKGNvbnRhaW5lcikge1xuXHRcdHJldHVybiBuZXcgUHJvZHVjdHMoY29udGFpbmVyLCBjb250YWluZXIubWFrZSgnUGFnaW5hdGlvbicpKTtcblx0fSk7XG5cblx0dGhpcy5jb250YWluZXIuYmluZCgnQ2FydCcsIGZ1bmN0aW9uKGNvbnRhaW5lcikge1xuXHRcdHJldHVybiBuZXcgQ2FydChjb250YWluZXIpO1xuXHR9KTtcbn1cblxucmV0dXJuIGVDb21tZXJjZTtcblxufSgpKTtcbiJdfQ==
