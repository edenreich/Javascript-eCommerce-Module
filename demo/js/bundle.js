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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVDb21tZXJjZS5qcyJdLCJuYW1lcyI6WyJlQ29tbWVyY2UiLCJJbnZhbGlkQXJndW1lbnRFeGNlcHRpb24kMSIsImNvbnNvbGUiLCJlcnJvciIsImNvbnN0cnVjdG9yIiwibmFtZSIsIkVycm9yIiwiRE9NIiwic3RyaW5nIiwicmVwbGFjZSIsImVsZW1lbnQiLCJjbGFzc05hbWUiLCJuZXdDbGFzc05hbWUiLCJyZW1vdmVDbGFzcyIsImFkZENsYXNzIiwidW5kZWZpbmVkIiwiY2xhc3NOYW1lcyIsInNwbGl0IiwiZm9yRWFjaCIsImNsYXNzTGlzdCIsImFkZCIsInJlbW92ZSIsInNlbGVjdG9yIiwicXVlcnlFbGVtZW50IiwiY2FsbCIsImRvY3VtZW50IiwiaWQiLCJjc3MiLCJoZWFkIiwiZ2V0RWxlbWVudHNCeVRhZ05hbWUiLCJzdHlsZVRhZyIsImNyZWF0ZUVsZW1lbnQiLCJDU1MiLCJtaW5pZnlDc3MiLCJpbm5lckhUTUwiLCJzZXRBdHRyaWJ1dGUiLCJhcHBlbmRDaGlsZCIsImVsZW1lbnRUeXBlIiwib3B0aW9ucyIsIm9wdGlvbiIsInNlY29uZENsYXNzTmFtZSIsInRvZ2dsZSIsInBhcmVudCIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJsZW5ndGgiLCJFdmVudCIsImNhbGxiYWNrIiwiSW52YWxpZEFyZ3VtZW50RXhjZXB0aW9uIiwiZXZlbnRzIiwiZGF0YSIsIkJhZEV2ZW50Q2FsbEV4Y2VwdGlvbiIsIkFycmF5IiwiQ29tbW9uIiwiY3VycmVudE9iaiIsIm5ld09iaiIsImV4dGVuZGVkIiwicHJvcCIsIk9iamVjdCIsInByb3RvdHlwZSIsImhhc093blByb3BlcnR5IiwibmVlZGxlIiwiaHlzdGFjayIsImkiLCJvYmplY3QiLCJ0b0xvd2VyQ2FzZSIsInZhbHVlIiwiZGF5cyIsIkpTT04iLCJzdHJpbmdpZnkiLCJleHBpcmVzIiwiZGF0ZSIsIkRhdGUiLCJzZXRUaW1lIiwiZ2V0VGltZSIsInRvR01UU3RyaW5nIiwiY29va2llIiwiY19zdGFydCIsImluZGV4T2YiLCJjX2VuZCIsInBhcnNlIiwidW5lc2NhcGUiLCJzdWJzdHJpbmciLCJwb3NzaWJsZSIsImNoYXJBdCIsIk1hdGgiLCJmbG9vciIsInJhbmRvbSIsIkludmFsaWRCaW5kaW5nRXhjZXB0aW9uIiwiaW5zdGFuY2VzIiwiQ29udGFpbmVyIiwia2V5IiwiY29uY3JldGUiLCJiaW5kIiwiaW5zdGFuY2UiLCJpbnN0YW5jZUV4aXN0IiwiZ2V0SW5zdGFuY2UiLCJzZXRJbnN0YW5jZSIsIkNvbXBvbmVudHNFeGNlcHRpb24iLCJCYWRFdmVudENhbGxFeGNlcHRpb24kMSIsIkNvbXBvbmVudE5vdFJlZ2lzdGVyZWRFeGNlcHRpb24iLCJFeGNlcHRpb25IYW5kbGVyIiwid2luZG93Iiwib25lcnJvciIsIm1lc3NhZ2UiLCJzb3VyY2UiLCJsaW5lbm8iLCJjb2xubyIsImRlZmF1bHRTZXR0aW5ncyQxIiwiY2xhc3MiLCJ3aWR0aCIsImhlaWdodCIsIkZpbHRlciIsImNvbnRhaW5lciIsInNldHVwIiwic2V0dGluZ3MiLCJleHRlbmQiLCJzZXRFbGVtZW50Iiwid3JhcHBlciIsImRlZmF1bHRTZXR0aW5ncyQyIiwiaXRlbV9jbGFzcyIsImFkZF9idXR0b25fY2xhc3MiLCJmYXZvcml0ZV9idXR0b25fY2xhc3MiLCJhdHRyaWJ1dGVzIiwidXJsIiwiQ29udGFpbmVyJDIiLCJQcm9kdWN0cyIsInBhZ2luYXRvciIsImFkZFN0eWxlVGFnIiwicmVzZXQiLCJyZXF1ZXN0IiwiZ2V0UHJvZHVjdHNCeVBhZ2UiLCJnZXRDdXJyZW50IiwidGhlbiIsIml0ZW1zIiwicmVwbGFjZUl0ZW1zIiwiY2F0Y2giLCJpc0FycmF5IiwicGVyUGFnZSIsInBlcl9wYWdlIiwic2xpY2UiLCJwcm9kdWN0cyIsImJ1aWxkUHJvZHVjdHMiLCJwYWdlTnVtYmVyIiwiUHJvbWlzZSIsInJlc29sdmUiLCJyZWplY3QiLCJub3RJblBhZ2VSYW5nZSIsInhociIsIlhNTEh0dHBSZXF1ZXN0IiwiQWN0aXZlWE9iamVjdCIsIm9wZW4iLCJzZXRSZXF1ZXN0SGVhZGVyIiwib25yZWFkeXN0YXRlY2hhbmdlIiwicmVhZHlTdGF0ZSIsInN0YXR1cyIsImN1cnJlbnRJdGVtcyIsInJlc3BvbnNlVGV4dCIsInByb2R1Y3QiLCJBZnRlckxvYWRlZCIsInN0YXR1c1RleHQiLCJzZW5kIiwiYXR0cmlidXRlc0NvbGxlY3Rpb24iLCJ0YWdUeXBlIiwiYnVpbHRQcm9kdWN0cyIsImJ1aWxkUHJvZHVjdCIsIm92ZXJsYXkiLCJhdHRyaWJ1dGUiLCJpbl9hcnJheSIsInRhZyIsImltYWdlIiwic3JjIiwia2ViYWJDYXNlIiwiYWRkVG9DYXJ0IiwidHlwZSIsInRleHQiLCJmYXZvcml0ZSIsIm91dGVySFRNTCIsImFkZFN0eWxlIiwiU2VydmljZXMiLCJkZWZhdWx0U2V0dGluZ3MkMyIsInRvdGFsX2l0ZW1zIiwiQ29udGFpbmVyJDMiLCJQYWdpbmF0aW9uIiwidG90YWxQYWdlcyIsImNhbGN1bGF0ZVRvdGFsUGFnZXMiLCJyZXBsYWNlTGlua3MiLCJsaW5rcyIsImNyZWF0ZUxpbmtzIiwiYmluZEV2ZW50TGlzdGVuZXJzIiwidG90YWxJdGVtcyIsInBhcnNlSW50IiwiY2VpbCIsIm5leHQiLCJjaGlsZE5vZGVzIiwib25jbGljayIsImV2ZW50IiwicHJldmVudERlZmF1bHQiLCJjdXJyZW50Iiwic2V0Q3VycmVudCIsInByZXZpb3VzIiwicGFnZXMiLCJnZXRBdHRyaWJ1dGUiLCJjaGFuZ2VVcmwiLCJ1bCIsImNyZWF0ZVBhZ2VMaW5rcyIsImNyZWF0ZVByZXZpb3VzQnV0dG9uIiwiY3JlYXRlTmV4dEJ1dHRvbiIsInBhZ2UiLCJwYWdlSXRlbSIsImxpbmsiLCJwdXNoIiwibGkiLCJzcGFuMSIsInNwYW4yIiwiaXNOYU4iLCJHRVRfVmFycyIsImhpc3RvcnkiLCJyZXBsYWNlU3RhdGUiLCJ1cGRhdGVVUkxQYXJhbWV0ZXIiLCJsb2NhdGlvbiIsImhyZWYiLCJ2YXJzIiwicGFydHMiLCJtIiwicGFyYW0iLCJwYXJhbVZhbCIsIm5ld0FkZGl0aW9uYWxVUkwiLCJ0ZW1wQXJyYXkiLCJiYXNlVVJMIiwiYWRkaXRpb25hbFVSTCIsInRlbXAiLCJyb3dzVGV4dCIsImRlZmF1bHRTZXR0aW5ncyQ0IiwiY29va2llX25hbWUiLCJwcmV2aWV3X2NsYXNzIiwicGxhY2VtZW50IiwiZml4ZWQiLCJob3Zlcl9jb2xvciIsIkNvbnRhaW5lciQ0IiwiQ2FydCIsInByZXZpZXdFbGVtZW50IiwiY3JlYXRlUHJldmlld0VsZW1lbnQiLCJzdmdJY29uIiwiY3JlYXRlSWNvbiIsInNldENhcnRDb29raWUiLCJpdGVtIiwiZ2V0Q29va2llIiwiY3JlYXRlQ29va2llIiwiaWNvbiIsInBvc2l0aW9uIiwidG9nZ2xlQ2xhc3MiLCJvbm1vdXNlb3V0IiwiY2xvc2UiLCJzd2l0Y2hDbGFzc2VzIiwic3ZnIiwiY3JlYXRlRWxlbWVudE5TIiwiZyIsInBhdGgiLCJpbml0YWxpemVkIiwiZGVmYXVsdFNldHRpbmdzIiwiaW1wb3J0Qm9vdHN0cmFwIiwiY29tcG9uZW50cyIsImluaXRhbGl6ZSIsImJpbmRDb21wb25lbnRzRGVwZW5kZW5jaWVzIiwiUHJveHkiLCJnZXQiLCJ0YXJnZXQiLCJtYWtlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsSUFBSUEsWUFBYSxZQUFZO0FBQzdCOztBQUQ2QixLQUd2QkMsMEJBSHVCLEdBSzVCLHNDQUNBO0FBQUE7O0FBQ0lDLFVBQVFDLEtBQVIsQ0FBaUIsS0FBS0MsV0FBTCxDQUFpQkMsSUFBbEM7O0FBRUEsUUFBTSxJQUFJQyxLQUFKLEVBQU47QUFDQSxFQVZ3Qjs7QUFBQSxLQWF2QkMsR0FidUI7QUFBQTtBQUFBO0FBQUE7O0FBQUE7QUFBQTs7QUFlNUI7OztBQWY0Qiw2QkFrQlhDLE1BbEJXLEVBbUI1QjtBQUNJQSxhQUFTQSxPQUFPQyxPQUFQLENBQWUsd0NBQWYsRUFBeUQsRUFBekQsQ0FBVDtBQUNBRCxhQUFTQSxPQUFPQyxPQUFQLENBQWUsUUFBZixFQUF5QixHQUF6QixDQUFUO0FBQ0FELGFBQVNBLE9BQU9DLE9BQVAsQ0FBZSxV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QWFsRSxTQUFiLENBQVA7QUFDQSxHQUZEOztBQUlBLE9BQUtBLFNBQUwsQ0FBZXBCLElBQWYsQ0FBb0IsWUFBcEIsRUFBa0MsVUFBU29CLFNBQVQsRUFBb0I7QUFDckQsVUFBTyxJQUFJc0UsVUFBSixDQUFldEUsU0FBZixDQUFQO0FBQ0EsR0FGRDs7QUFJQSxPQUFLQSxTQUFMLENBQWVwQixJQUFmLENBQW9CLFVBQXBCLEVBQWdDLFVBQVNvQixTQUFULEVBQW9CO0FBQ25ELFVBQU8sSUFBSWEsUUFBSixDQUFhYixTQUFiLEVBQXdCQSxVQUFVMkosSUFBVixDQUFlLFlBQWYsQ0FBeEIsQ0FBUDtBQUNBLEdBRkQ7O0FBSUEsT0FBSzNKLFNBQUwsQ0FBZXBCLElBQWYsQ0FBb0IsTUFBcEIsRUFBNEIsVUFBU29CLFNBQVQsRUFBb0I7QUFDL0MsVUFBTyxJQUFJK0gsSUFBSixDQUFTL0gsU0FBVCxDQUFQO0FBQ0EsR0FGRDtBQUdBOztBQUVELFFBQU9oSCxTQUFQO0FBRUMsQ0E1N0NnQixFQUFqQiIsImZpbGUiOiJlQ29tbWVyY2UuanMiLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgZUNvbW1lcmNlID0gKGZ1bmN0aW9uICgpIHtcbid1c2Ugc3RyaWN0JztcblxuY2xhc3MgSW52YWxpZEFyZ3VtZW50RXhjZXB0aW9uJDFcclxue1xyXG5cdGNvbnN0cnVjdG9yKCkgXHJcblx0eyBcclxuICAgIFx0Y29uc29sZS5lcnJvcihgJHt0aGlzLmNvbnN0cnVjdG9yLm5hbWV9LCBwYXNzaW5nIGludmFsaWQgYXJndW1lbnRzLmApO1xyXG5cclxuICAgIFx0dGhyb3cgbmV3IEVycm9yO1xyXG4gICAgfVxyXG59XG5cbmNsYXNzIERPTVxyXG57XHJcblx0LyoqXHJcblx0ICogTWluaWZpZXMgdGhlIGNzcyB0ZXh0LlxyXG5cdCAqL1xyXG5cdHN0YXRpYyBtaW5pZnlDc3Moc3RyaW5nKSBcclxuXHR7XHJcblx0ICAgIHN0cmluZyA9IHN0cmluZy5yZXBsYWNlKC9cXC9cXCooPzooPyFcXCpcXC8pW1xcc1xcU10pKlxcKlxcL3xbXFxyXFxuXFx0XSsvZywgJycpO1xyXG5cdCAgICBzdHJpbmcgPSBzdHJpbmcucmVwbGFjZSgvIHsyLH0vZywgJyAnKTtcclxuXHQgICAgc3RyaW5nID0gc3RyaW5nLnJlcGxhY2UoLyhbezp9XSkvZywgJyQxJyk7XHJcblx0ICAgIHN0cmluZyA9IHN0cmluZy5yZXBsYWNlKC8oWzssXSkgL2csICckMScpO1xyXG5cdCAgICBzdHJpbmcgPSBzdHJpbmcucmVwbGFjZSgvICEvZywgJyEnKTtcclxuXHQgICAgXHJcblx0ICAgIHJldHVybiBzdHJpbmc7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBTd2l0Y2hlcyBiZXR3ZWVuIHR3byBnaXZlbiBjbGFzc2VzLlxyXG5cdCAqL1xyXG5cdHN0YXRpYyBzd2l0Y2hDbGFzc2VzKGVsZW1lbnQsIGNsYXNzTmFtZSwgbmV3Q2xhc3NOYW1lKSBcclxuXHR7XHJcblx0XHR0aGlzLnJlbW92ZUNsYXNzKGVsZW1lbnQsIGNsYXNzTmFtZSk7XHJcblx0XHR0aGlzLmFkZENsYXNzKGVsZW1lbnQsIG5ld0NsYXNzTmFtZSk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBBZGRzIGNsYXNzIHRvIGEgZ2l2ZW4gZWxlbWVudC5cclxuXHQgKi9cclxuXHRzdGF0aWMgYWRkQ2xhc3MoZWxlbWVudCwgY2xhc3NOYW1lKSBcclxuXHR7XHJcblx0XHRpZihlbGVtZW50ID09PSBudWxsKSB7XHJcblx0XHRcdHRocm93IG5ldyBJbnZhbGlkQXJndW1lbnRFeGNlcHRpb24kMTtcclxuXHRcdH1cclxuXHJcblx0XHRpZighIGNsYXNzTmFtZSB8fCBjbGFzc05hbWUgPT0gJycgfHwgdHlwZW9mIGNsYXNzTmFtZSA9PT0gdW5kZWZpbmVkKSB7XHJcblx0XHRcdHJldHVybiBlbGVtZW50O1xyXG5cdFx0fVxyXG5cclxuXHRcdGxldCBjbGFzc05hbWVzID0gY2xhc3NOYW1lLnNwbGl0KCcgJyk7XHJcblxyXG5cdFx0Y2xhc3NOYW1lcy5mb3JFYWNoKGZ1bmN0aW9uKG5hbWUpIHtcclxuXHRcdFx0ZWxlbWVudC5jbGFzc0xpc3QuYWRkKG5hbWUpO1xyXG5cdFx0fSk7XHJcblx0XHRcclxuXHRcdHJldHVybiBlbGVtZW50O1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogUmVtb3ZlcyBjbGFzcyBmcm9tIGEgZ2l2ZW4gZWxlbWVudC5cclxuXHQgKi9cclxuXHRzdGF0aWMgcmVtb3ZlQ2xhc3MoZWxlbWVudCwgY2xhc3NOYW1lKSBcclxuXHR7XHJcblx0XHRpZihlbGVtZW50ID09IG51bGwpIHtcclxuXHRcdFx0dGhyb3cgbmV3IEludmFsaWRBcmd1bWVudEV4Y2VwdGlvbiQxO1xyXG5cdFx0fVxyXG5cclxuXHRcdGlmKGNsYXNzTmFtZSA9PSAnJykge1xyXG5cdFx0XHRlbGVtZW50LmNsYXNzTmFtZSA9ICcnO1xyXG5cdFx0fSBlbHNlIHtcclxuXHJcblx0XHRcdGxldCBjbGFzc05hbWVzID0gY2xhc3NOYW1lLnNwbGl0KCcgJyk7XHJcblxyXG5cdFx0XHRjbGFzc05hbWVzLmZvckVhY2goZnVuY3Rpb24obmFtZSkge1xyXG5cdFx0XHRcdGVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShuYW1lKTtcclxuXHRcdFx0fSk7XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIGVsZW1lbnQ7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBRdWVyaWVzIHRoZSBlbGVtZW50IGZyb20gdGhlIERPTS5cclxuXHQgKi9cclxuXHRzdGF0aWMgZWxlbWVudChzZWxlY3RvcikgXHJcblx0e1xyXG5cdFx0cmV0dXJuIHF1ZXJ5RWxlbWVudC5jYWxsKHRoaXMsIGRvY3VtZW50LCBzZWxlY3Rvcik7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBBZGRzIHN0eWxlIHRhZyB3aXRoIGdpdmVuIGlkIGFuZCBjc3MgdG8gdGhlIERPTS5cclxuXHQgKi9cclxuXHRzdGF0aWMgYWRkU3R5bGUoaWQsIGNzcykgXHJcblx0e1xyXG5cdFx0aWYodHlwZW9mIGNzcyAhPSAnc3RyaW5nJykge1xyXG5cdFx0XHR0aHJvdyBuZXcgSW52YWxpZEFyZ3VtZW50RXhjZXB0aW9uJDE7XHJcblx0XHR9XHJcblxyXG5cdFx0bGV0IGhlYWQgPSBkb2N1bWVudC5oZWFkIHx8IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdoZWFkJylbMF07XHJcblx0XHRsZXQgc3R5bGVUYWcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzdHlsZScpO1xyXG5cclxuXHRcdC8vIHBpcGUgaXQgdGhyb3VnaCB0aGUgbWluZmllclxyXG5cdCAgICBsZXQgQ1NTID0gdGhpcy5taW5pZnlDc3MoY3NzKTtcclxuXHQgICAgLy8gYWRkaW5nIGl0IHRvIHRoZSBzdHlsZXRhZ1xyXG5cdCAgICBzdHlsZVRhZy5pbm5lckhUTUwgPSBDU1M7XHJcblx0ICAgIC8vIGdpdmUgYW4gaWQgdG8gcmVjb2duaXplIHRoZSBzdHlsZSB0YWdcclxuXHRcdHN0eWxlVGFnLnNldEF0dHJpYnV0ZSgnaWQnLCBpZCk7XHJcblx0XHQvLyBhcHBlbmRpbmcgdGhhdCBzdHlsZSB0YWcgdG8gdGhlIERPTSBoZWFkIHRhZ1xyXG5cdFx0aGVhZC5hcHBlbmRDaGlsZChzdHlsZVRhZyk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBDcmVhdGVzIGFuIGVsZW1lbnQgd2l0aCB0aGUgZ2l2ZW4gb3B0aW9ucy5cclxuXHQgKi9cclxuXHRzdGF0aWMgY3JlYXRlRWxlbWVudChlbGVtZW50VHlwZSwgb3B0aW9ucylcclxuXHR7XHJcblx0XHRsZXQgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoZWxlbWVudFR5cGUpO1xyXG5cdFxyXG5cdFx0aWYgKG9wdGlvbnMgPT09IHVuZGVmaW5lZCkge1xyXG5cdFx0XHRyZXR1cm4gZWxlbWVudDtcclxuXHRcdH1cclxuXHJcblx0XHRmb3IgKGxldCBvcHRpb24gaW4gb3B0aW9ucykge1xyXG5cdFx0XHRpZihvcHRpb24gPT0gJ3RleHQnKSB7XHJcblx0XHRcdFx0ZWxlbWVudC5pbm5lckhUTUwgPSBvcHRpb25zW29wdGlvbl07XHJcblx0XHRcdFx0Y29udGludWU7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGVsZW1lbnQuc2V0QXR0cmlidXRlKG9wdGlvbiwgb3B0aW9uc1tvcHRpb25dKTtcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gZWxlbWVudDtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFRvZ2dsZXMgdGhlIGdpdmVuIGNsYXNzZXMuXHJcblx0ICovXHJcblx0c3RhdGljIHRvZ2dsZUNsYXNzKGVsZW1lbnQsIGNsYXNzTmFtZSwgc2Vjb25kQ2xhc3NOYW1lKVxyXG5cdHtcclxuXHRcdGlmKGVsZW1lbnQgPT0gbnVsbCB8fCB0eXBlb2YgZWxlbWVudCA9PSAndW5kZWZpbmVkJykge1xyXG5cdFx0XHR0aHJvdyBuZXcgSW52YWxpZEFyZ3VtZW50RXhjZXB0aW9uJDE7XHJcblx0XHR9XHJcblxyXG5cdFx0c2Vjb25kQ2xhc3NOYW1lID0gc2Vjb25kQ2xhc3NOYW1lIHx8IHVuZGVmaW5lZDtcclxuXHJcblx0XHRlbGVtZW50LmNsYXNzTGlzdC50b2dnbGUoY2xhc3NOYW1lKTtcclxuXHJcblx0XHRpZihzZWNvbmRDbGFzc05hbWUpIHtcclxuXHRcdFx0ZWxlbWVudC5jbGFzc0xpc3QudG9nZ2xlKHNlY29uZENsYXNzTmFtZSk7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBGaW5kcyBhbiBlbGVtZW50IGluc2lkZSBvZiBwYXJlbnQuXHJcblx0ICovXHJcblx0c3RhdGljIGZpbmQoZWxlbWVudCwgc2VsZWN0b3IpIFxyXG5cdHtcclxuXHRcdHJldHVybiBxdWVyeUVsZW1lbnQoZWxlbWVudCwgc2VsZWN0b3IpO1xyXG5cdH1cclxufVxyXG5cclxuLyoqXHJcbiAqIFF1ZXJpZXMgYW4gZWxlbWVudCBmcm9tIHRoZSBET00uXHJcbiAqL1xyXG5mdW5jdGlvbiBxdWVyeUVsZW1lbnQocGFyZW50LCBzZWxlY3Rvcikge1xyXG5cdHZhciBlbGVtZW50ID0gcGFyZW50LnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3IpO1xyXG5cclxuXHRpZihlbGVtZW50Lmxlbmd0aCA9PSAwKSB7XHJcblx0XHRyZXR1cm4gbnVsbDtcclxuXHR9XHJcblxyXG5cdHJldHVybiAoZWxlbWVudC5sZW5ndGggPiAxKSA/IGVsZW1lbnQgOiBlbGVtZW50WzBdO1xyXG59XG5cbmNsYXNzIEV2ZW50XHJcbntcclxuXHQvKipcclxuXHQgKiBMaXN0ZW4gdG8gYW4gZXZlbnQuXHJcblx0ICovXHJcblx0c3RhdGljIGxpc3RlbihuYW1lLCBjYWxsYmFjaykge1xyXG5cdFx0aWYgKHR5cGVvZiBjYWxsYmFjayAhPT0gJ2Z1bmN0aW9uJykge1xyXG5cdFx0XHR0aHJvdyBuZXcgSW52YWxpZEFyZ3VtZW50RXhjZXB0aW9uO1xyXG5cdFx0fVxyXG5cclxuXHRcdGV2ZW50c1tuYW1lXSA9IGNhbGxiYWNrO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogRmlyZXMgYW4gZXZlbnQuXHJcblx0ICovXHJcblx0c3RhdGljIHRyaWdnZXIobmFtZSwgZGF0YSkge1xyXG5cdFx0ZGF0YSA9IGRhdGEgfHwgbnVsbDtcclxuXHJcblx0XHRpZih0eXBlb2YgZXZlbnRzW25hbWVdICE9PSAnZnVuY3Rpb24nKSB7XHJcblx0XHRcdHRocm93IG5ldyBCYWRFdmVudENhbGxFeGNlcHRpb247XHJcblx0XHR9XHJcblxyXG5cdFx0aWYoZGF0YSAhPSBudWxsICYmIGRhdGEgaW5zdGFuY2VvZiBBcnJheSkge1xyXG5cdFxyXG5cdFx0XHRyZXR1cm4gZXZlbnRzW25hbWVdKC4uLmRhdGEpO1xyXG5cdFx0fVxyXG5cclxuXHRcdGV2ZW50c1tuYW1lXSgpO1xyXG5cdH1cclxufVxuXG5jbGFzcyBDb21tb25cclxue1xyXG5cdC8qKlxyXG5cdCAqIEV4dGVuZCBhbiBvYmplY3QuXHJcblx0ICovXHJcblx0c3RhdGljIGV4dGVuZChjdXJyZW50T2JqLCBuZXdPYmogKSB7XHJcblx0XHR2YXIgZXh0ZW5kZWQgPSB7fTtcclxuXHQgICAgdmFyIHByb3A7XHJcblxyXG5cdCAgICBmb3IgKHByb3AgaW4gY3VycmVudE9iaikge1xyXG5cdCAgICAgICAgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChjdXJyZW50T2JqLCBwcm9wKSkge1xyXG5cdCAgICAgICAgICAgIGV4dGVuZGVkW3Byb3BdID0gY3VycmVudE9ialtwcm9wXTtcclxuXHQgICAgICAgIH1cclxuXHQgICAgfVxyXG5cclxuXHQgICAgZm9yIChwcm9wIGluIG5ld09iaikge1xyXG5cdCAgICAgICAgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChuZXdPYmosIHByb3ApKSB7XHJcblx0ICAgICAgICAgICAgZXh0ZW5kZWRbcHJvcF0gPSBuZXdPYmpbcHJvcF07XHJcblx0ICAgICAgICB9XHJcblx0ICAgIH1cclxuXHJcblx0ICAgIHJldHVybiBleHRlbmRlZDtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIENoZWNrcyBmb3IgYSBuZWVkbGUgaW4gaHlzdGFjay5cclxuXHQgKi9cclxuXHRzdGF0aWMgaW5fYXJyYXkobmVlZGxlLCBoeXN0YWNrKSB7XHJcblx0XHRpZihoeXN0YWNrLmNvbnN0cnVjdG9yICE9PSBBcnJheSkgcmV0dXJuO1xyXG5cclxuXHRcdGZvcih2YXIgaSA9IDA7IGkgPD0gaHlzdGFjay5sZW5ndGg7IGkrKykge1xyXG5cdFx0XHRpZihuZWVkbGUgPT0gaHlzdGFja1tpXSkgcmV0dXJuIHRydWU7XHRcclxuXHRcdH1cclxuXHRcclxuXHRcdHJldHVybiBmYWxzZTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIENoZWNrcyBpZiBhbiBvYmplY3QgaXMgZW1wdHkuXHJcblx0ICovXHJcblx0c3RhdGljIGVtcHR5T2JqZWN0KG9iamVjdCkge1xyXG5cdFx0Zm9yKHZhciBwcm9wIGluIG9iamVjdCkge1xyXG5cdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIHRydWU7XHJcblx0fVxyXG5cclxuXHRzdGF0aWMgY29udGFpbnNPYmplY3Qob2JqZWN0LCBoeXN0YWNrKSBcclxuXHR7XHJcblx0ICAgIHZhciBpO1xyXG5cclxuXHQgICAgZm9yIChpID0gMDsgaSA8IGh5c3RhY2subGVuZ3RoOyBpKyspIHtcclxuXHQgICAgICAgIGlmICh0eXBlb2Ygb2JqZWN0ID09ICdzdHJpbmcnICYmIGh5c3RhY2tbaV0uY29uc3RydWN0b3IubmFtZSA9PT0gb2JqZWN0KSB7XHJcblx0ICAgICAgICBcdHJldHVybiB0cnVlO1xyXG5cdCAgICAgICAgfVxyXG5cclxuXHQgICAgICAgIGlmIChoeXN0YWNrW2ldID09PSBvYmplY3QpIHtcclxuXHQgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuXHQgICAgICAgIH1cclxuXHQgICAgfVxyXG5cclxuXHQgICAgcmV0dXJuIGZhbHNlO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQ29udmVydCBjYW1lbENhc2UgdG8ga2ViYWItY2FzZS5cclxuXHQgKi9cclxuXHRzdGF0aWMga2ViYWJDYXNlKHN0cmluZykgXHJcblx0e1xyXG5cdFx0cmV0dXJuIHN0cmluZy5yZXBsYWNlKC8oW2Etel0pKFtBLVpdKS9nLCAnJDEtJDInKS50b0xvd2VyQ2FzZSgpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQ2hlY2tzIGlmIGEgZ2l2ZW4gcGFyYW1ldGVyIGlzIGFuIG9iamVjdC5cclxuXHQgKi9cclxuXHRzdGF0aWMgaXNPYmplY3Qob2JqZWN0KSBcclxuXHR7XHJcblx0XHRyZXR1cm4gdHlwZW9mIG9iamVjdCA9PSAnb2JqZWN0JztcclxuXHR9XHJcblxyXG5cdC8qKlxyXG4gXHQqIFNldHMgYSBjb29raWUuIFxyXG5cdCovXHJcblx0c3RhdGljIGNyZWF0ZUNvb2tpZShuYW1lLCB2YWx1ZSwgZGF5cykgXHJcblx0e1xyXG5cdFx0aWYgKHZhbHVlLmNvbnN0cnVjdG9yLm5hbWUgPT0gJ0FycmF5Jykge1xyXG5cdFx0XHR2YWx1ZSA9IEpTT04uc3RyaW5naWZ5KHZhbHVlKTtcclxuXHRcdH1cclxuXHJcblx0ICAgIGxldCBleHBpcmVzO1xyXG5cdCAgICBcclxuXHQgICAgaWYgKGRheXMpIHtcclxuXHQgICAgICAgIGxldCBkYXRlID0gbmV3IERhdGUoKTtcclxuXHQgICAgICAgIGRhdGUuc2V0VGltZShkYXRlLmdldFRpbWUoKSArIChkYXlzICogMjQgKiA2MCAqIDYwICogMTAwMCkpO1xyXG5cdCAgICAgICAgZXhwaXJlcyA9IFwiOyBleHBpcmVzPVwiICsgZGF0ZS50b0dNVFN0cmluZygpO1xyXG5cdCAgICB9IGVsc2Uge1xyXG5cdCAgICAgICAgZXhwaXJlcyA9IFwiXCI7XHJcblx0ICAgIH1cclxuXHJcblx0ICAgIGRvY3VtZW50LmNvb2tpZSA9IG5hbWUgKyBcIj1cIiArIHZhbHVlICsgZXhwaXJlcyArIFwiOyBwYXRoPS9cIjtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFJldHJpZXZlcyB0aGUgY29va2llIGJ5IG5hbWUuXHJcblx0ICovXHJcblx0c3RhdGljIGdldENvb2tpZShuYW1lKSBcclxuXHR7XHJcblx0ICAgIGlmIChkb2N1bWVudC5jb29raWUubGVuZ3RoID4gMCkge1xyXG5cdCAgICAgICAgbGV0IGNfc3RhcnQgPSBkb2N1bWVudC5jb29raWUuaW5kZXhPZihuYW1lICsgXCI9XCIpO1xyXG5cdCAgICAgICAgXHJcblx0ICAgICAgICBpZiAoY19zdGFydCAhPSAtMSkge1xyXG5cdCAgICAgICAgICAgIGNfc3RhcnQgPSBjX3N0YXJ0ICsgbmFtZS5sZW5ndGggKyAxO1xyXG5cdCAgICAgICAgICAgIGxldCBjX2VuZCA9IGRvY3VtZW50LmNvb2tpZS5pbmRleE9mKFwiO1wiLCBjX3N0YXJ0KTtcclxuXHQgICAgICAgICAgICBcclxuXHQgICAgICAgICAgICBpZiAoY19lbmQgPT0gLTEpIHtcclxuXHQgICAgICAgICAgICAgICAgY19lbmQgPSBkb2N1bWVudC5jb29raWUubGVuZ3RoO1xyXG5cdCAgICAgICAgICAgIH1cclxuXHJcblx0ICAgICAgICAgICAgcmV0dXJuIEpTT04ucGFyc2UodW5lc2NhcGUoZG9jdW1lbnQuY29va2llLnN1YnN0cmluZyhjX3N0YXJ0LCBjX2VuZCkpKTtcclxuXHQgICAgICAgIH1cclxuXHQgICAgfVxyXG5cclxuXHQgICAgcmV0dXJuIFtdO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogR2VuZXJhdGVzIGEgcmFuZG9tIHN0cmluZy5cclxuXHQgKi9cclxuXHRzdGF0aWMgcmFuZG9tU3RyKGxlbmd0aCkgXHJcblx0e1xyXG5cdFx0bGV0IHN0cmluZyA9ICcnO1xyXG5cdFx0bGV0IHBvc3NpYmxlID0gXCJBQkNERUZHSElKS0xNTk9QUVJTVFVWV1hZWmFiY2RlZmdoaWprbG1ub3BxcnN0dXZ3eHl6MDEyMzQ1Njc4OVwiO1xyXG5cclxuXHRcdGZvciAobGV0IGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcclxuXHQgICAgXHRzdHJpbmcgKz0gcG9zc2libGUuY2hhckF0KE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIHBvc3NpYmxlLmxlbmd0aCkpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiBzdHJpbmc7XHJcblx0fVxyXG59XG5cbmNsYXNzIEludmFsaWRCaW5kaW5nRXhjZXB0aW9uXHJcbntcclxuXHRjb25zdHJ1Y3RvcigpIFxyXG5cdHsgXHJcbiAgICBcdGNvbnNvbGUuZXJyb3IoYCR7dGhpcy5jb25zdHJ1Y3Rvci5uYW1lfSwgdHJ5aW5nIHRvIGJpbmQgYW4gYWxyZWFkeSBleGlzdGluZyBib3VuZC5gKTtcclxuXHJcbiAgICBcdHRocm93IG5ldyBFcnJvcjtcclxuICAgIH1cclxufVxuXG5sZXQgaW5zdGFuY2VzID0gW107XHJcblxyXG5jbGFzcyBDb250YWluZXIgXHJcbntcclxuXHQvKipcclxuXHQgKiBCaW5kcyBrZXkgdG8gY29uY3JldGUgY2xhc3MuXHJcblx0ICovXHJcblx0YmluZChrZXksIGNvbmNyZXRlKSBcclxuXHR7XHJcblx0XHRpZiAodHlwZW9mIGtleSAhPSAnc3RyaW5nJyB8fCB0eXBlb2YgY29uY3JldGUgIT0gJ2Z1bmN0aW9uJykge1xyXG5cdFx0XHR0aHJvdyBuZXcgSW52YWxpZEFyZ3VtZW50RXhjZXB0aW9uJDE7XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKHR5cGVvZiB0aGlzW2tleV0gIT0gJ3VuZGVmaW5lZCcpIHtcclxuXHRcdFx0dGhyb3cgbmV3IEludmFsaWRCaW5kaW5nRXhjZXB0aW9uO1xyXG5cdFx0fVxyXG5cclxuXHRcdHRoaXNba2V5XSA9IGNvbmNyZXRlLmJpbmQoY29uY3JldGUsIHRoaXMpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogU2V0cyBhbiBpbnN0YW5jZS5cclxuXHQgKi9cclxuXHRzZXRJbnN0YW5jZShrZXksIGluc3RhbmNlKSBcclxuXHR7XHJcblx0XHRpZih0eXBlb2Yga2V5ICE9ICdzdHJpbmcnIHx8IHR5cGVvZiBpbnN0YW5jZSAhPSAnb2JqZWN0Jykge1xyXG5cdFx0XHR0aHJvdyBuZXcgSW52YWxpZEFyZ3VtZW50RXhjZXB0aW9uJDE7XHJcblx0XHR9XHJcblxyXG5cdFx0aW5zdGFuY2VzW2tleV0gPSBpbnN0YW5jZTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEdldHMgYW4gaW5zdGFuY2UuXHJcblx0ICovXHJcblx0Z2V0SW5zdGFuY2Uoa2V5KSBcclxuXHR7XHJcblx0XHRpZih0eXBlb2Yga2V5ICE9ICdzdHJpbmcnKSB7XHJcblx0XHRcdHRocm93IG5ldyBJbnZhbGlkQXJndW1lbnRFeGNlcHRpb24kMTtcclxuXHRcdH1cclxuXHJcblx0XHRpZih0eXBlb2Yga2V5ID09ICdvYmplY3QnKSB7XHJcblx0XHRcdHJldHVybiBpbnN0YW5jZXNba2V5LmNvbnN0cnVjdG9yLm5hbWVdIHx8IG51bGw7XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIGluc3RhbmNlc1trZXldIHx8IG51bGw7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBDaGVja3MgaWYgYW4gaW5zdGFuY2UgZXhpc3QuXHJcblx0ICovXHJcblx0aW5zdGFuY2VFeGlzdChpbnN0YW5jZSkgXHJcblx0e1xyXG5cdFx0aWYodHlwZW9mIGluc3RhbmNlID09ICdvYmplY3QnKSB7XHJcblx0XHRcdHJldHVybiAodHlwZW9mIGluc3RhbmNlc1tpbnN0YW5jZS5jb25zdHJ1Y3Rvci5uYW1lXSAhPT0gJ3VuZGVmaW5lZCcpO1xyXG5cdFx0fVxyXG5cdFx0XHJcblx0XHRcclxuXHRcdHJldHVybiAoaW5zdGFuY2UgaW4gaW5zdGFuY2VzKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIENyZWF0ZXMgYW4gaW5zdGFuY2UuXHJcblx0ICovXHJcblx0bWFrZShvYmplY3QpXHJcblx0e1xyXG5cdFx0bGV0IGluc3RhbmNlID0ge307XHJcblxyXG5cdFx0aWYgKHRoaXMuaW5zdGFuY2VFeGlzdChvYmplY3QpKSB7XHJcblx0XHRcdHJldHVybiB0aGlzLmdldEluc3RhbmNlKG9iamVjdCk7XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKHR5cGVvZiBvYmplY3QgPT0gJ29iamVjdCcpIHtcclxuXHRcdFx0aW5zdGFuY2UgPSBvYmplY3Q7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRpbnN0YW5jZSA9IG5ldyB0aGlzW29iamVjdF07XHRcclxuXHRcdH1cclxuXHJcblx0XHR0aGlzLnNldEluc3RhbmNlKG9iamVjdCwgaW5zdGFuY2UpOyBcclxuXHJcblx0XHRyZXR1cm4gaW5zdGFuY2U7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBSZXRyaWV2ZSBhbGwgaW5zdGFuY2VzLlxyXG5cdCAqL1xyXG5cdGluc3RhbmNlcygpIFxyXG5cdHtcclxuXHRcdHJldHVybiBpbnN0YW5jZXM7XHJcblx0fVxyXG59XG5cbmNsYXNzIENvbXBvbmVudHNFeGNlcHRpb25cclxue1xyXG5cdGNvbnN0cnVjdG9yKCkgXHJcblx0eyBcclxuICAgIFx0Y29uc29sZS5lcnJvcihgJHt0aGlzLmNvbnN0cnVjdG9yLm5hbWV9LCBleHBlY3RpbmcgZm9yIGF0IGxlYXN0IG9uZSBjb21wb25lbnRzLCBidXQgbm9uZSB3YXMgZ2l2ZW4sIFxyXG5cdFx0XHRcdFx0XHRcdFx0cGxlYXNlIGFkZCBhdCBsZWFzdCBvbmUgcmVxdWlyZW1lbnQoUHJvZHVjdHMsIFNlcnZpY2VzIG9yL2FuZCBGaWx0ZXJgKTtcclxuXHJcbiAgICBcdHRocm93IG5ldyBFcnJvcjtcclxuICAgIH1cclxufVxuXG5jbGFzcyBCYWRFdmVudENhbGxFeGNlcHRpb24kMVxyXG57XHJcblx0Y29uc3RydWN0b3IoKSBcclxuXHR7IFxyXG4gICAgXHRjb25zb2xlLmVycm9yKGAke3RoaXMuY29uc3RydWN0b3IubmFtZX0sIGxpc3RlbmluZyB0byBhIG5vbmUtZXhpc3RpbmcgZXZlbnRgKTtcclxuXHJcbiAgICBcdHRocm93IG5ldyBFcnJvcjtcclxuICAgIH1cclxufVxuXG5jbGFzcyBDb21wb25lbnROb3RSZWdpc3RlcmVkRXhjZXB0aW9uXHJcbntcclxuXHRjb25zdHJ1Y3RvcigpIFxyXG5cdHsgXHJcbiAgICBcdGNvbnNvbGUuZXJyb3IoYCR7dGhpcy5jb25zdHJ1Y3Rvci5uYW1lfSwgY29tcG9uZW50cyBtdXN0IGJlIHJlZ2lzdGVyZWQgaW4gb3JkZXIgdG8gdXNlIHRoZW1gKTtcclxuXHJcbiAgICBcdHRocm93IG5ldyBFcnJvcjtcclxuICAgIH1cclxufVxuXG5jbGFzcyBFeGNlcHRpb25IYW5kbGVyXHJcbntcclxuXHQvKipcclxuXHQgKiBIYW5kbGUgYWxsIHRoZSBlcnJvcnNcclxuXHQgKi9cclxuXHRzdGF0aWMgaW5pdGFsaXplKCkge1x0XHJcblx0XHR3aW5kb3cub25lcnJvciA9IGZ1bmN0aW9uKG1lc3NhZ2UsIHNvdXJjZSwgbGluZW5vLCBjb2xubywgZXJyb3IpIHtcclxuXHJcblx0XHRcdGlmIChlcnJvciBpbnN0YW5jZW9mIEludmFsaWRBcmd1bWVudEV4Y2VwdGlvbiQxKSB7XHJcblx0XHRcdFx0Ly8gaGFuZGxlXHJcblx0XHRcdH0gZWxzZSBpZiAoZXJyb3IgaW5zdGFuY2VvZiBJbnZhbGlkQmluZGluZ0V4Y2VwdGlvbikge1xyXG5cdFx0XHRcdC8vIGhhbmRsZVxyXG5cdFx0XHR9IGVsc2UgaWYgKGVycm9yIGluc3RhbmNlb2YgQmFkRXZlbnRDYWxsRXhjZXB0aW9uJDEpIHtcclxuXHRcdFx0XHQvLyBoYW5kbGVcclxuXHRcdFx0fSBlbHNlIGlmIChlcnJvciBpbnN0YW5jZW9mIENvbXBvbmVudHNFeGNlcHRpb24pIHtcclxuXHRcdFx0XHQvLyBoYW5kbGVcclxuXHRcdFx0fSBlbHNlIGlmIChlcnJvciBpbnN0YW5jZW9mIENvbXBvbmVudE5vdFJlZ2lzdGVyZWRFeGNlcHRpb24pIHtcclxuXHRcdFx0XHQvLyBoYW5kbGVcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHJldHVybiB0cnVlO1xyXG5cdFx0fTtcclxuXHR9XHJcbn1cblxuLyoqXHJcbiAqIFRoZSBkZWZhdWx0IHNldHRpbmdzIG9mIHRoZSBmaWx0ZXIuXHJcbiAqL1xyXG5sZXQgZGVmYXVsdFNldHRpbmdzJDEgPSB7XHJcblx0ZWxlbWVudDogJy5maWx0ZXInLFxyXG5cdGRhdGE6IHt9LFxyXG5cdGNsYXNzOiAnY29sLXhzLTInLFxyXG5cdHdpZHRoOiAnJyxcclxuXHRoZWlnaHQ6ICcnLFxyXG59O1xyXG5cclxuXHJcbi8qKlxyXG4gKiBUaGUgRmlsdGVyIE9iamVjdCwgaGFuZGxlcyB0aGUgZmlsdGVyIG9mIHRoZSBwcm9kdWN0cy9zZXJ2aWNlcy5cclxuICovXHJcbmNsYXNzIEZpbHRlciBcclxue1xyXG5cdGNvbnN0cnVjdG9yKGNvbnRhaW5lcikgXHJcblx0e1xyXG5cdFx0dGhpcy5zZXR1cChkZWZhdWx0U2V0dGluZ3MkMSk7XHJcblx0fVxyXG5cclxuXHRzZXR1cChzZXR0aW5ncylcclxuXHR7XHJcblx0XHRpZih0eXBlb2Ygc2V0dGluZ3MgIT0gJ29iamVjdCcpIHtcclxuXHRcdFx0dGhyb3cgbmV3IEludmFsaWRBcmd1bWVudEV4Y2VwdGlvbiQxO1xyXG5cdFx0fVxyXG5cclxuXHRcdHRoaXMuc2V0dGluZ3MgPSBDb21tb24uZXh0ZW5kKGRlZmF1bHRTZXR0aW5ncyQxLCBzZXR0aW5ncyk7XHJcblxyXG5cdFx0dGhpcy5zZXRFbGVtZW50KHRoaXMuc2V0dGluZ3MuZWxlbWVudCk7XHJcblx0fVxyXG5cclxuXHRzZXRFbGVtZW50KHNlbGVjdG9yKVxyXG5cdHtcclxuXHRcdHRoaXMud3JhcHBlciA9IERPTS5lbGVtZW50KHNlbGVjdG9yKTtcclxuXHRcdFxyXG5cdFx0RE9NLmFkZENsYXNzKHRoaXMud3JhcHBlciwgdGhpcy5zZXR0aW5ncy5jbGFzcyk7XHJcblx0fVxyXG59XG5cbi8qKlxyXG4gKiBUaGUgZGVmYXVsdCBzZXR0aW5ncyBvZiBlYWNoIHByb2R1Y3QuXHJcbiAqL1xyXG5sZXQgZGVmYXVsdFNldHRpbmdzJDIgPSB7XHJcblx0ZWxlbWVudDogJy5wcm9kdWN0cycsXHJcblx0Y2xhc3M6ICcnLFxyXG5cdGl0ZW1fY2xhc3M6ICcnLFxyXG5cdGFkZF9idXR0b25fY2xhc3M6ICdidG4gYnRuLXByaW1hcnknLFxyXG5cdGZhdm9yaXRlX2J1dHRvbl9jbGFzczogJ2J0biBidG4tZGFuZ2VyJyxcclxuXHR3aWR0aDogJzIwMHB4JyxcclxuXHRoZWlnaHQ6ICcyNTBweCcsXHJcblx0YXR0cmlidXRlczogWyduYW1lJywgJ3ByaWNlJywgJ2RlbGl2ZXJ5VGltZScsICdpbWFnZSddLFxyXG5cdHVybDogJ3Byb2R1Y3RzLnBocCcsXHJcbn07XHJcblxyXG4vKipcclxuICogU3RvcmVzIHRoZSBjb250YWluZXIgb2JqZWN0LlxyXG4gKi9cclxubGV0IENvbnRhaW5lciQyO1xyXG5cclxuLyoqXHJcbiAqIFRoZSBQcm9kdWN0cyBPYmplY3QsIGhhbmRsZXMgdGhlIHByb2R1Y3RzLlxyXG4gKi9cclxuY2xhc3MgUHJvZHVjdHMgXHJcbntcclxuXHQvKipcclxuXHQgKiBJbml0YWxpemUgdGhlIENvbnRhaW5lciBhbmQgdGhlIHBhZ2luYXRvci5cclxuXHQgKi9cclxuXHRjb25zdHJ1Y3Rvcihjb250YWluZXIsIHBhZ2luYXRvcikgXHJcblx0e1xyXG5cdFx0dGhpcy5zZXR1cChkZWZhdWx0U2V0dGluZ3MkMik7XHJcblxyXG5cdFx0Q29udGFpbmVyJDIgPSBjb250YWluZXI7XHJcblx0XHR0aGlzLnBhZ2luYXRvciA9IHBhZ2luYXRvcjtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFNldHMgdGhlIGdpdmVuIHNldHRpbmdzIGZyb20gdGhlIHVzZXIuXHJcblx0ICovXHJcblx0c2V0dXAoc2V0dGluZ3MpXHJcblx0e1xyXG5cdFx0aWYgKHR5cGVvZiBzZXR0aW5ncyAhPSAnb2JqZWN0Jykge1xyXG5cdFx0XHR0aHJvdyBuZXcgSW52YWxpZEFyZ3VtZW50RXhjZXB0aW9uJDE7XHJcblx0XHR9XHJcblxyXG5cdFx0dGhpcy5zZXR0aW5ncyA9IENvbW1vbi5leHRlbmQoZGVmYXVsdFNldHRpbmdzJDIsIHNldHRpbmdzKTtcclxuXHJcblx0XHR0aGlzLnNldEVsZW1lbnQodGhpcy5zZXR0aW5ncy5lbGVtZW50KTtcclxuXHJcblx0XHR0aGlzLmFkZFN0eWxlVGFnKCk7XHRcclxuXHRcclxuXHRcdGlmICh0eXBlb2YgQ29udGFpbmVyJDIgPT0gJ3VuZGVmaW5lZCcpIHtcclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0fVxyXG5cclxuXHRcdGlmIChDb250YWluZXIkMi5pbnN0YW5jZUV4aXN0KCdQYWdpbmF0aW9uJykpIHtcclxuXHRcdFx0dGhpcy5wYWdpbmF0b3IucmVzZXQoKTtcclxuXHRcdFx0bGV0IHJlcXVlc3QgPSB0aGlzLmdldFByb2R1Y3RzQnlQYWdlKHRoaXMucGFnaW5hdG9yLmdldEN1cnJlbnQoKSk7XHJcblx0XHRcdFxyXG5cdFx0XHRyZXF1ZXN0LnRoZW4oZnVuY3Rpb24oaXRlbXMpIHtcclxuXHRcdFx0XHR0aGlzLnJlcGxhY2VJdGVtcyhpdGVtcyk7XHJcblx0XHRcdH0uYmluZCh0aGlzKSkuY2F0Y2goZnVuY3Rpb24oZXJyb3IpIHtcclxuXHJcblx0XHRcdH0pO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogU2V0cyB0aGUgRE9NIGVsZW1lbnQgZm9yIHBvcHVsYXRpbmcgdGhlIHByb2R1Y3RzLlxyXG5cdCAqL1xyXG5cdHNldEVsZW1lbnQoc2VsZWN0b3IpXHJcblx0e1xyXG5cdFx0dGhpcy53cmFwcGVyID0gRE9NLmVsZW1lbnQoc2VsZWN0b3IpO1xyXG5cclxuXHRcdGlmICh0aGlzLndyYXBwZXIpIHtcclxuXHRcdFx0RE9NLmFkZENsYXNzKHRoaXMud3JhcHBlciwgdGhpcy5zZXR0aW5ncy5jbGFzcyk7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBSZXBsYWNlIGl0ZW1zIGluIHRoZSBjb250YWluZXIuXHJcblx0ICovXHJcblx0cmVwbGFjZUl0ZW1zKGl0ZW1zKSBcclxuXHR7XHJcblx0XHRpZiAoISBBcnJheS5pc0FycmF5KGl0ZW1zKSB8fCAoaXRlbXMubGVuZ3RoIDw9IDAgJiYgdHlwZW9mIGl0ZW1zWzBdID09ICdzdHJpbmcnKSkge1xyXG5cdFx0XHR0aHJvdyBuZXcgSW52YWxpZEFyZ3VtZW50RXhjZXB0aW9uJDE7XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKENvbnRhaW5lciQyLmluc3RhbmNlRXhpc3QoJ1BhZ2luYXRpb24nKSkge1xyXG5cdFx0XHRsZXQgcGVyUGFnZSA9IHRoaXMucGFnaW5hdG9yLnNldHRpbmdzLnBlcl9wYWdlO1xyXG5cdFx0XHRpdGVtcyA9IGl0ZW1zLnNsaWNlKDAsIHBlclBhZ2UpO1xyXG5cdFx0fVxyXG5cclxuXHRcdGxldCBwcm9kdWN0cyA9IHRoaXMuYnVpbGRQcm9kdWN0cyhpdGVtcywgdGhpcy5zZXR0aW5ncy5pdGVtX2NsYXNzLCAnZGl2Jyk7XHJcblxyXG5cdFx0dGhpcy53cmFwcGVyLmlubmVySFRNTCA9IHByb2R1Y3RzO1xyXG5cclxuXHRcdHJldHVybiBpdGVtcztcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIE1ha2VzIGFuIEFqYXggY2FsbCB0byB0aGUgc2VydmVyLlxyXG5cdCAqL1xyXG5cdGdldFByb2R1Y3RzQnlQYWdlKHBhZ2VOdW1iZXIpIFxyXG5cdHtcclxuXHRcdHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcclxuXHRcdFx0aWYgKHRoaXMucGFnaW5hdG9yLm5vdEluUGFnZVJhbmdlKHBhZ2VOdW1iZXIpKSB7XHJcblx0XHRcdFx0cmV0dXJuIHJlamVjdCgnTm90IGluIHBhZ2luYXRpb24gcmFuZ2UnKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0bGV0IHhociA9IG5ldyBYTUxIdHRwUmVxdWVzdCB8fCBuZXcgQWN0aXZlWE9iamVjdChcIk1pY3Jvc29mdC5YTUxIVFRQXCIpO1xyXG5cclxuXHRcdFx0eGhyLm9wZW4oJ0dFVCcsIHRoaXMuc2V0dGluZ3MudXJsICsgJz9wYWdlPScgKyBwYWdlTnVtYmVyLCB0cnVlKTsgXHJcblx0XHRcdHhoci5zZXRSZXF1ZXN0SGVhZGVyKCdDb250ZW50LVR5cGUnLCAnYXBwbGljYXRpb24vanNvbicpO1xyXG5cdFx0XHRcclxuXHRcdFx0bGV0IGluc3RhbmNlID0gdGhpcztcclxuXHJcblx0XHRcdHhoci5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBmdW5jdGlvbigpIHtcclxuXHRcdFx0XHRpZiAodGhpcy5yZWFkeVN0YXRlID09IDQpIHtcclxuXHRcdFx0XHRcdGlmICh0aGlzLnN0YXR1cyA9PSAyMDApIHtcclxuXHRcdFx0XHRcdFx0aW5zdGFuY2UuY3VycmVudEl0ZW1zID0gKHRoaXMucmVzcG9uc2VUZXh0ID09ICcnKSA/IFtdIDogSlNPTi5wYXJzZSh0aGlzLnJlc3BvbnNlVGV4dCk7XHJcblx0XHRcdFx0XHRcclxuXHRcdFx0XHRcdFx0aWYoaW5zdGFuY2UuY3VycmVudEl0ZW1zLmxlbmd0aCA9PT0gMCkge1xyXG5cdFx0XHRcdFx0XHRcdHJlamVjdCgnTm8gSXRlbXMgd2VyZSByZXRyaWV2ZWQhJyk7XHJcblx0XHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgaW5zdGFuY2UuY3VycmVudEl0ZW1zLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdFx0XHRcdFx0dmFyIHByb2R1Y3QgPSBpbnN0YW5jZS5jdXJyZW50SXRlbXNbaV07XHJcblx0XHRcdFx0XHRcdFx0aW5zdGFuY2UuQWZ0ZXJMb2FkZWQuY2FsbCh0aGlzLCBwcm9kdWN0KTtcclxuXHRcdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRcdFx0cmVzb2x2ZShpbnN0YW5jZS5jdXJyZW50SXRlbXMpO1xyXG5cdFx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdFx0cmVqZWN0KHRoaXMuc3RhdHVzVGV4dCk7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9O1xyXG5cclxuXHRcdFx0eGhyLm9uZXJyb3IgPSBmdW5jdGlvbihlcnJvcikge1xyXG5cdFx0XHRcdHJlamVjdChlcnJvcik7XHJcblx0XHRcdH07XHJcblxyXG5cdFx0XHR4aHIuc2VuZChudWxsKTtcclxuXHRcdH0uYmluZCh0aGlzKSk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBCdWlsZHMgdGhlIGh0bWwgZm9yIHRoZSBwcm9kdWN0cy5cclxuXHQgKi9cclxuXHRidWlsZFByb2R1Y3RzKGF0dHJpYnV0ZXNDb2xsZWN0aW9uLCBjbGFzc05hbWUsIHRhZ1R5cGUpIFxyXG5cdHtcclxuXHRcdGlmKGF0dHJpYnV0ZXNDb2xsZWN0aW9uLmNvbnN0cnVjdG9yLm5hbWUgIT0gJ0FycmF5JyApIHtcclxuXHRcdFx0dGhyb3cgbmV3IEludmFsaWRBcmd1bWVudEV4Y2VwdGlvbiQxO1xyXG5cdFx0fVxyXG5cclxuXHRcdGxldCBidWlsdFByb2R1Y3RzID0gJyc7XHJcblxyXG5cdFx0YXR0cmlidXRlc0NvbGxlY3Rpb24uZm9yRWFjaChmdW5jdGlvbihhdHRyaWJ1dGVzKSB7XHJcblx0XHRcdGJ1aWx0UHJvZHVjdHMgKz0gdGhpcy5idWlsZFByb2R1Y3QoYXR0cmlidXRlcywgY2xhc3NOYW1lLCB0YWdUeXBlKTtcclxuXHRcdH0uYmluZCh0aGlzKSk7XHJcblxyXG5cdFx0cmV0dXJuIGJ1aWx0UHJvZHVjdHM7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBCdWlsZHMgdGhlIGh0bWwgZm9yIGEgc2luZ2xlIHByb2R1Y3QuXHJcblx0ICovXHJcblx0YnVpbGRQcm9kdWN0KGF0dHJpYnV0ZXMsIGNsYXNzTmFtZSwgdGFnVHlwZSkgXHJcblx0e1xyXG5cdFx0aWYgKHR5cGVvZiBhdHRyaWJ1dGVzICE9ICdvYmplY3QnIHx8IHR5cGVvZiB0YWdUeXBlICE9ICdzdHJpbmcnKSB7XHJcblx0XHRcdHRocm93IG5ldyBJbnZhbGlkQXJndW1lbnRFeGNlcHRpb24kMTtcclxuXHRcdH1cclxuXHJcblx0XHRjbGFzc05hbWUgPSBjbGFzc05hbWUgfHwgbnVsbDtcclxuXHJcblx0XHRsZXQgcHJvZHVjdCA9IERPTS5jcmVhdGVFbGVtZW50KCdkaXYnLCB7XHJcblx0XHRcdGNsYXNzOiAncHJvZHVjdCdcclxuXHRcdH0pO1xyXG5cclxuXHRcdERPTS5hZGRDbGFzcyhwcm9kdWN0LCBjbGFzc05hbWUpO1xyXG5cclxuXHRcdGxldCBvdmVybGF5ID0gRE9NLmNyZWF0ZUVsZW1lbnQoJ2RpdicsIHtcclxuXHRcdFx0Y2xhc3M6ICdwcm9kdWN0LW92ZXJsYXknLFxyXG5cdFx0fSk7XHJcblxyXG5cdFx0cHJvZHVjdC5hcHBlbmRDaGlsZChvdmVybGF5KTtcclxuXHJcblx0XHRmb3IgKHZhciBhdHRyaWJ1dGUgaW4gYXR0cmlidXRlcykge1xyXG5cdFx0XHRpZiAoISBDb21tb24uaW5fYXJyYXkoYXR0cmlidXRlLCB0aGlzLnNldHRpbmdzLmF0dHJpYnV0ZXMpKSB7XHJcblx0XHRcdFx0Y29udGludWU7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGxldCB0YWcgPSBET00uY3JlYXRlRWxlbWVudCh0YWdUeXBlKTtcclxuXHJcblx0XHRcdGlmIChhdHRyaWJ1dGUgPT0gJ2ltYWdlJykge1xyXG5cdFx0XHRcdGxldCBpbWFnZSA9IERPTS5jcmVhdGVFbGVtZW50KCdpbWcnLCB7XHJcblx0XHRcdFx0XHRzcmM6IGF0dHJpYnV0ZXNbYXR0cmlidXRlXVxyXG5cdFx0XHRcdH0pO1xyXG5cdFx0XHRcdHByb2R1Y3QuYXBwZW5kQ2hpbGQoaW1hZ2UpO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdHRhZy5pbm5lckhUTUwgPSBhdHRyaWJ1dGVzW2F0dHJpYnV0ZV0gfHwgJyc7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdERPTS5hZGRDbGFzcyh0YWcsICdwcm9kdWN0LScgKyBDb21tb24ua2ViYWJDYXNlKGF0dHJpYnV0ZSkpO1xyXG5cdFx0XHRvdmVybGF5LmFwcGVuZENoaWxkKHRhZyk7XHJcblx0XHR9XHJcblxyXG5cdFx0bGV0IHRhZyA9IERPTS5jcmVhdGVFbGVtZW50KCdkaXYnLCB7XHJcblx0XHRcdGlkOiAnYWN0aW9uQnV0dG9ucycsXHJcblx0XHRcdGNsYXNzOiAnYWN0aW9uLWJ1dHRvbnMnXHJcblx0XHR9KTtcclxuXHJcblx0XHRsZXQgYWRkVG9DYXJ0ID0gRE9NLmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicsIHtcclxuXHRcdFx0aWQ6ICdhZGRUb0NhcnQnLFxyXG5cdFx0XHRjbGFzczogdGhpcy5zZXR0aW5ncy5hZGRfYnV0dG9uX2NsYXNzLFxyXG5cdFx0XHR0eXBlOiAnYnV0dG9uJyxcclxuXHRcdFx0dGV4dDogJysnLFxyXG5cdFx0fSk7XHJcblxyXG5cdFx0bGV0IGZhdm9yaXRlID0gRE9NLmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicsIHtcclxuXHRcdFx0aWQ6ICdmYXZvcml0ZScsXHJcblx0XHRcdGNsYXNzOiB0aGlzLnNldHRpbmdzLmZhdm9yaXRlX2J1dHRvbl9jbGFzcyxcclxuXHRcdFx0dHlwZTogJ2J1dHRvbicsXHJcblx0XHRcdHRleHQ6ICcmaGVhcnRzOydcclxuXHRcdH0pO1xyXG5cclxuXHRcdHRhZy5hcHBlbmRDaGlsZChhZGRUb0NhcnQpO1xyXG5cdFx0dGFnLmFwcGVuZENoaWxkKGZhdm9yaXRlKTtcclxuXHJcblx0XHRvdmVybGF5LmFwcGVuZENoaWxkKHRhZyk7XHJcblxyXG5cdFx0cmV0dXJuIHByb2R1Y3Qub3V0ZXJIVE1MO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQW4gZXZlbnQgZm9yIHRoZSBjbGllbnQgb2Ygd2hlbiB0aGUgcHJvZHVjdHMgYXMgYmVlbiBsb2FkZWQuXHJcblx0ICovXHJcblx0QWZ0ZXJMb2FkZWQocHJvZHVjdCkgXHJcblx0e1xyXG5cdFx0Ly9cclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEFkZCB0aGUgZUNvbW1lcmNlIHN0eWxlIHRhZ3MgdG8gdGhlIERPTS5cclxuXHQgKi9cclxuXHRhZGRTdHlsZVRhZygpIFxyXG5cdHtcclxuXHRcdGlmKERPTS5lbGVtZW50KCcjZUNvbW1lcmNlLVByb2R1Y3RzJykpIHtcclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0fVxyXG5cclxuXHRcdGxldCBjc3MgPSBgXHJcblx0XHRcdC5wcm9kdWN0IHtcclxuXHRcdFx0XHRwb3NpdGlvbjogcmVsYXRpdmU7XHJcblx0XHRcdFx0bWFyZ2luOiA1cHggNXB4O1xyXG5cdFx0XHRcdGJvcmRlcjogMXB4IHNvbGlkICNlNGU0ZTQ7XHJcblx0XHRcdFx0d2lkdGg6ICR7dGhpcy5zZXR0aW5ncy53aWR0aH07XHJcblx0XHRcdFx0aGVpZ2h0OiAke3RoaXMuc2V0dGluZ3MuaGVpZ2h0fTtcclxuXHRcdFx0XHRjdXJzb3I6IHBvaW50ZXI7XHJcblx0XHRcdFx0Y29sb3I6ICNmZmZmZmY7XHJcblx0XHRcdFx0b3ZlcmZsb3c6IGhpZGRlbjtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0LnByb2R1Y3QgPiAucHJvZHVjdC1vdmVybGF5IHtcclxuXHRcdFx0XHRwb3NpdGlvbjogYWJzb2x1dGU7XHJcblx0XHRcdFx0dG9wOiAwO1xyXG5cdFx0XHRcdGxlZnQ6IDA7XHJcblx0XHRcdFx0d2lkdGg6IDEwMCU7XHJcblx0XHRcdFx0aGVpZ2h0OiAxMDAlO1xyXG5cdFx0XHRcdG9wYWNpdHk6IDAuNTtcclxuXHRcdFx0XHR6LWluZGV4OiA1O1xyXG5cdFx0XHRcdHRyYW5zaXRpb246IDFzIGFsbDtcclxuXHRcdFx0XHR0cmFuc2Zvcm06IHRyYW5zbGF0ZVgoLTI1MHB4KTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0LnByb2R1Y3Q6aG92ZXIgPiAucHJvZHVjdC1vdmVybGF5IHtcclxuXHRcdFx0XHRiYWNrZ3JvdW5kOiByZ2JhKDAsIDAsIDAsIDAuNDUpO1xyXG5cdFx0XHRcdHRyYW5zZm9ybTogdHJhbnNsYXRlWCgwcHgpO1xyXG5cdFx0XHRcdG9wYWNpdHk6IDE7XHJcblx0XHRcdFx0dHJhbnNpdGlvbjogMXMgYWxsO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHQucHJvZHVjdCA+IGltZyB7XHJcblx0XHRcdFx0cG9zaXRpb246IGFic29sdXRlO1xyXG5cdFx0XHRcdGxlZnQ6IDA7XHJcblx0XHRcdFx0dG9wOiAwO1xyXG5cdFx0XHRcdHdpZHRoOiAxMDAlO1xyXG5cdFx0XHRcdGhlaWdodDogMTAwJTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0LnByb2R1Y3QgPiAucHJvZHVjdC1pbWFnZSB7XHJcblx0XHRcdFx0ei1pbmRleDogMDtcclxuXHRcdFx0XHRwb3NpdGlvbjogYWJzb2x1dGU7XHJcblx0XHRcdFx0dG9wOiAwO1xyXG5cdFx0XHRcdGxlZnQ6IDA7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdC5wcm9kdWN0ID4gLnByb2R1Y3Qtb3ZlcmxheSA+IC5wcm9kdWN0LW5hbWUsIFxyXG5cdFx0XHQucHJvZHVjdCA+IC5wcm9kdWN0LW92ZXJsYXkgPiAucHJvZHVjdC1wcmljZSxcclxuXHRcdFx0LnByb2R1Y3QgPiAucHJvZHVjdC1vdmVybGF5ID4gLnByb2R1Y3QtZGVsaXZlcnktdGltZSB7XHJcblx0XHRcdFx0ei1pbmRleDogMTtcclxuXHRcdFx0XHRwb3NpdGlvbjogcmVsYXRpdmU7XHJcblx0XHRcdFx0dGV4dC1hbGlnbjogY2VudGVyO1xyXG5cdFx0XHRcdG1hcmdpbi10b3A6IDI1cHg7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdC5wcm9kdWN0ID4gLnByb2R1Y3Qtb3ZlcmxheSA+IC5hY3Rpb24tYnV0dG9ucyB7XHJcblx0XHRcdFx0d2lkdGg6IDEwMCU7XHJcblx0XHRcdFx0bWFyZ2luLXRvcDogMTBweDtcclxuXHRcdFx0XHR0ZXh0LWFsaWduOiBjZW50ZXI7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdC5wcm9kdWN0ID4gLnByb2R1Y3Qtb3ZlcmxheSA+IC5hY3Rpb24tYnV0dG9ucyA+ICNmYXZvcml0ZSB7XHJcblx0XHRcdFx0bWFyZ2luLWxlZnQ6IDEwcHg7XHJcblx0XHRcdH1cclxuXHJcblx0XHRgO1xyXG5cdCAgICBcclxuXHQgICAgRE9NLmFkZFN0eWxlKCdlQ29tbWVyY2UtUHJvZHVjdHMnLCBjc3MpO1xyXG5cdH1cclxufVxuXG4vKipcclxuICogVGhlIFNlcnZpY2VzIE9iamVjdCwgaGFuZGxlcyB0aGUgc2VydmljZXMuXHJcbiAqL1xyXG5jbGFzcyBTZXJ2aWNlcyBcclxue1xyXG5cclxufVxuXG4vKipcclxuICogVGhlIGRlZmF1bHQgc2V0dGluZ3Mgb2YgdGhlIHBhZ2luYXRpb24uXHJcbiAqL1xyXG5sZXQgZGVmYXVsdFNldHRpbmdzJDMgPSB7XHJcblx0ZWxlbWVudDogJy5wYWdpbmF0aW9uLWxpbmtzJyxcclxuXHRjbGFzczogJ2NvbC14cy1vZmZzZXQtNCBjb2wteHMtOCcsXHJcblx0cGVyX3BhZ2U6IDUsXHJcblx0dG90YWxfaXRlbXM6IDEwLFxyXG59O1xyXG5cclxuLyoqXHJcbiAqIFN0b3JlcyB0aGUgY29udGFpbmVyIG9iamVjdC5cclxuICovXHJcbmxldCBDb250YWluZXIkMztcclxuXHJcbi8qKlxyXG4gKiBUaGUgUGFnaW5hdGlvbiBPYmplY3QsIGhhbmRsZXMgdGhlIHBhZ2luYXRpb24uXHJcbiAqL1xyXG5jbGFzcyBQYWdpbmF0aW9uIFxyXG57XHJcblx0LyoqXHJcblx0ICogSW5pdGlhbGl6ZSB0aGUgY29udGFpbmVyIG9iamVjdCBhbmQgdGhlIGRlZmF1bHQgc2V0dGluZ3MuXHJcblx0ICovXHJcblx0Y29uc3RydWN0b3IoY29udGFpbmVyKSBcclxuXHR7XHJcblx0XHRDb250YWluZXIkMyA9IGNvbnRhaW5lcjtcclxuXHRcdHRoaXMuc2V0dXAoZGVmYXVsdFNldHRpbmdzJDMpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogU2V0IHRoZSBQYWdpbmF0aW9uIG9iamVjdCB1cC5cclxuXHQgKi9cclxuXHRzZXR1cChzZXR0aW5ncylcclxuXHR7XHJcblx0XHRpZih0eXBlb2Ygc2V0dGluZ3MgIT0gJ29iamVjdCcpIHtcclxuXHRcdFx0dGhyb3cgbmV3IEludmFsaWRBcmd1bWVudEV4Y2VwdGlvbiQxO1xyXG5cdFx0fVxyXG5cclxuXHRcdHRoaXMuc2V0dGluZ3MgPSBDb21tb24uZXh0ZW5kKGRlZmF1bHRTZXR0aW5ncyQzLCBzZXR0aW5ncyk7XHJcblxyXG5cdFx0dGhpcy50b3RhbFBhZ2VzID0gdGhpcy5jYWxjdWxhdGVUb3RhbFBhZ2VzKHRoaXMuc2V0dGluZ3MucGVyX3BhZ2UsIHRoaXMuc2V0dGluZ3MudG90YWxfaXRlbXMpO1xyXG5cdFx0XHJcblx0XHR0aGlzLnNldEVsZW1lbnQodGhpcy5zZXR0aW5ncy5lbGVtZW50KTtcclxuXHRcdHRoaXMucmVwbGFjZUxpbmtzKHRoaXMubGlua3MpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogU2V0cyB0aGUgd3JhcHBlciBlbGVtZW50LlxyXG5cdCAqL1xyXG5cdHNldEVsZW1lbnQoc2VsZWN0b3IpXHJcblx0e1xyXG5cdFx0dGhpcy53cmFwcGVyID0gRE9NLmVsZW1lbnQoc2VsZWN0b3IpO1xyXG5cdFx0XHJcblx0XHRET00uYWRkQ2xhc3ModGhpcy53cmFwcGVyLCB0aGlzLnNldHRpbmdzLmNsYXNzKTtcclxuXHJcblx0XHR0aGlzLmxpbmtzID0gdGhpcy5jcmVhdGVMaW5rcygpO1xyXG5cdFx0dGhpcy5iaW5kRXZlbnRMaXN0ZW5lcnModGhpcy5saW5rcyk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBSZXBsYWNlcyB0aGUgbGlua3MgaW4gdGhlIHdyYXBwZXIuXHJcblx0ICovXHJcblx0cmVwbGFjZUxpbmtzKGxpbmtzKVxyXG5cdHtcclxuXHRcdHRoaXMud3JhcHBlci5pbm5lckhUTUwgPSAnJztcclxuXHRcdHRoaXMud3JhcHBlci5hcHBlbmRDaGlsZChsaW5rcyk7XHJcblx0fVxyXG5cclxuXHRjYWxjdWxhdGVUb3RhbFBhZ2VzKHBlclBhZ2UsIHRvdGFsSXRlbXMpXHJcblx0e1xyXG5cdFx0cGVyUGFnZSA9IHBhcnNlSW50KHBlclBhZ2UpO1xyXG5cdFx0dG90YWxJdGVtcyA9IHBhcnNlSW50KHRvdGFsSXRlbXMpO1xyXG5cclxuXHRcdHJldHVybiBNYXRoLmNlaWwodG90YWxJdGVtcyAvIHBlclBhZ2UpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQmluZHMgdGhlIGJ1dHRvbnMgZXZlbnRzIGxpc3RlbmVycy5cclxuXHQgKi9cclxuXHRiaW5kRXZlbnRMaXN0ZW5lcnMobGlua3MpIFxyXG5cdHtcclxuXHRcdGxldCBpbnN0YW5jZSA9IHRoaXM7XHJcblx0XHRsZXQgUHJvZHVjdHMgPSBDb250YWluZXIkMy5nZXRJbnN0YW5jZSgnUHJvZHVjdHMnKTtcclxuXHJcblx0XHR0aGlzLm5leHQuY2hpbGROb2Rlc1swXS5vbmNsaWNrID0gZnVuY3Rpb24oZXZlbnQpIHtcclxuXHRcdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuXHJcblx0XHRcdFByb2R1Y3RzLmdldFByb2R1Y3RzQnlQYWdlKGluc3RhbmNlLmN1cnJlbnQrMSkudGhlbihmdW5jdGlvbihwcm9kdWN0cykge1xyXG5cdFx0XHRcdFByb2R1Y3RzLnJlcGxhY2VJdGVtcyhwcm9kdWN0cyk7XHJcblx0XHRcdH0pO1xyXG5cclxuXHRcdFx0aW5zdGFuY2Uuc2V0Q3VycmVudChpbnN0YW5jZS5jdXJyZW50KzEpO1xyXG5cdFx0fTtcclxuXHJcblx0XHR0aGlzLnByZXZpb3VzLmNoaWxkTm9kZXNbMF0ub25jbGljayA9IGZ1bmN0aW9uKGV2ZW50KSB7XHJcblx0XHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcblx0XHRcdFxyXG5cdFx0XHRQcm9kdWN0cy5nZXRQcm9kdWN0c0J5UGFnZShpbnN0YW5jZS5jdXJyZW50LTEpLnRoZW4oZnVuY3Rpb24ocHJvZHVjdHMpIHtcclxuXHRcdFx0XHRQcm9kdWN0cy5yZXBsYWNlSXRlbXMocHJvZHVjdHMpO1xyXG5cdFx0XHR9KTtcclxuXHJcblx0XHRcdGluc3RhbmNlLnNldEN1cnJlbnQoaW5zdGFuY2UuY3VycmVudC0xKTtcclxuXHRcdH07XHJcblxyXG5cdFx0Zm9yKHZhciBpID0gMDsgaSA8IHRoaXMucGFnZXMubGVuZ3RoOyBpKyspIHtcclxuXHRcdFx0dGhpcy5wYWdlc1tpXS5jaGlsZE5vZGVzWzBdLm9uY2xpY2sgPSBmdW5jdGlvbihldmVudCkge1xyXG5cdFx0XHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcblx0XHRcdFx0dmFyIHBhZ2VOdW1iZXIgPSB0aGlzLmdldEF0dHJpYnV0ZSgnZGF0YS1wYWdlLW5yJyk7XHJcblx0XHRcdFx0XHJcblx0XHRcdFx0UHJvZHVjdHMuZ2V0UHJvZHVjdHNCeVBhZ2UocGFnZU51bWJlcikudGhlbihmdW5jdGlvbihwcm9kdWN0cykge1xyXG5cdFx0XHRcdFx0UHJvZHVjdHMucmVwbGFjZUl0ZW1zKHByb2R1Y3RzKTtcclxuXHRcdFx0XHR9KTtcclxuXHRcdFx0XHRcclxuXHRcdFx0XHRpbnN0YW5jZS5zZXRDdXJyZW50KHBhZ2VOdW1iZXIpO1xyXG5cdFx0XHR9O1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogU2V0cyB0aGUgY3VycmVudCBwYWdlLlxyXG5cdCAqL1xyXG5cdHNldEN1cnJlbnQocGFnZU51bWJlcikgXHJcblx0e1xyXG5cdFx0aWYodGhpcy5ub3RJblBhZ2VSYW5nZShwYWdlTnVtYmVyKSkge1xyXG5cdFx0XHRyZXR1cm47XHJcblx0XHR9XHJcblxyXG5cdFx0dGhpcy5jdXJyZW50ID0gcGFyc2VJbnQocGFnZU51bWJlcik7XHJcblx0XHR0aGlzLmNoYW5nZVVybChwYWdlTnVtYmVyKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEdldHMgdGhlIGN1cnJlbnQgcGFnZS5cclxuXHQgKi9cclxuXHRnZXRDdXJyZW50KCkgXHJcblx0e1xyXG5cdFx0cmV0dXJuIHRoaXMuY3VycmVudDtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIENyZWF0ZXMgdGhlIHBhZ2luYXRpb24gbGlua3MuXHJcblx0ICovXHJcblx0Y3JlYXRlTGlua3MoKSBcclxuXHR7XHRcclxuXHRcdGxldCB1bCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3VsJyk7XHJcblx0XHRcclxuXHRcdHRoaXMucGFnZXMgPSB0aGlzLmNyZWF0ZVBhZ2VMaW5rcygpO1xyXG5cdFx0dGhpcy5wcmV2aW91cyA9IHRoaXMuY3JlYXRlUHJldmlvdXNCdXR0b24oKTtcclxuXHRcdHRoaXMubmV4dCA9IHRoaXMuY3JlYXRlTmV4dEJ1dHRvbigpO1xyXG5cclxuXHRcdHVsLmNsYXNzTmFtZSA9ICdwYWdpbmF0aW9uJztcclxuXHRcdHVsLmFwcGVuZENoaWxkKHRoaXMucHJldmlvdXMpO1xyXG5cclxuXHRcdHRoaXMucGFnZXMuZm9yRWFjaChmdW5jdGlvbihwYWdlKSB7XHJcblx0XHRcdHVsLmFwcGVuZENoaWxkKHBhZ2UpO1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0dWwuYXBwZW5kQ2hpbGQodGhpcy5uZXh0KTtcclxuXHJcblx0XHRyZXR1cm4gdWw7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBDcmVhdGVzIHRoZSBwYWdlcyBpdGVtIGxpbmtzLlxyXG5cdCAqL1xyXG5cdGNyZWF0ZVBhZ2VMaW5rcygpIFxyXG5cdHtcclxuXHRcdHZhciBwYWdlcyA9IFtdO1xyXG5cclxuXHRcdGZvcih2YXIgaSA9IDE7IGkgPD0gdGhpcy50b3RhbFBhZ2VzOyBpKyspIHtcclxuXHRcdFx0dmFyIHBhZ2VJdGVtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKTtcclxuXHRcdFx0dmFyIGxpbmsgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJyk7XHJcblx0XHRcdHBhZ2VJdGVtLmNsYXNzTmFtZSA9ICdwYWdlLWl0ZW0nO1xyXG5cdFx0XHRsaW5rLmNsYXNzTmFtZSA9ICdwYWdlLWxpbmsnO1xyXG5cdFx0XHRsaW5rLnNldEF0dHJpYnV0ZSgnaHJlZicsICc/cGFnZT0nKyBpKTtcclxuXHRcdFx0bGluay5zZXRBdHRyaWJ1dGUoJ2RhdGEtcGFnZS1ucicsIGkpO1xyXG5cdFx0XHRsaW5rLmlubmVySFRNTCA9IGk7XHJcblx0XHRcdHBhZ2VJdGVtLmFwcGVuZENoaWxkKGxpbmspO1xyXG5cdFx0XHRwYWdlcy5wdXNoKHBhZ2VJdGVtKTtcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gcGFnZXM7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBDcmVhdGVzIHRoZSBwcmV2aW91cyBidXR0b24gbGluay5cclxuXHQgKi9cclxuXHRjcmVhdGVQcmV2aW91c0J1dHRvbigpIFxyXG5cdHtcclxuXHRcdHZhciBsaSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJyk7XHJcblx0XHR2YXIgbGluayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKTtcclxuXHRcdHZhciBzcGFuMSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcclxuXHRcdHZhciBzcGFuMiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcclxuXHRcdFxyXG5cdFx0XHJcblx0XHRsaS5jbGFzc05hbWUgPSAncGFnZS1pdGVtJztcclxuXHRcdGxpbmsuY2xhc3NOYW1lID0gJ3BhZ2UtbGluayc7XHJcblx0XHRzcGFuMi5jbGFzc05hbWUgPSAnc3Itb25seSc7XHJcblxyXG5cdFx0bGluay5zZXRBdHRyaWJ1dGUoJ2hyZWYnLCAnJyk7XHJcblx0XHRsaW5rLnNldEF0dHJpYnV0ZSgnYXJpYS1sYWJlbCcsICdQcmV2aW91cycpO1xyXG5cdFx0c3BhbjEuc2V0QXR0cmlidXRlKCdhcmlhLWhpZGRlbicsICd0cnVlJyk7XHJcblxyXG5cdFx0c3BhbjEuaW5uZXJIVE1MID0gJyZsYXF1bzsnO1xyXG5cdFx0c3BhbjIuaW5uZXJIVE1MID0gJ1ByZXZpb3VzJztcclxuXHJcblx0XHRsaW5rLmFwcGVuZENoaWxkKHNwYW4xKTtcclxuXHRcdGxpbmsuYXBwZW5kQ2hpbGQoc3BhbjIpO1xyXG5cdFx0bGkuYXBwZW5kQ2hpbGQobGluayk7XHJcblxyXG5cdFx0cmV0dXJuIGxpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQ3JlYXRlcyB0aGUgbmV4dCBidXR0b24gbGluay5cclxuXHQgKi9cclxuXHRjcmVhdGVOZXh0QnV0dG9uKCkgXHJcblx0e1xyXG5cdFx0dmFyIGxpID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKTtcclxuXHRcdHZhciBsaW5rID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpO1xyXG5cdFx0dmFyIHNwYW4xID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xyXG5cdFx0dmFyIHNwYW4yID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xyXG5cdFx0XHJcblx0XHRsaS5jbGFzc05hbWUgPSAncGFnZS1pdGVtJztcclxuXHRcdGxpbmsuY2xhc3NOYW1lID0gJ3BhZ2UtbGluayc7XHJcblx0XHRzcGFuMi5jbGFzc05hbWUgPSAnc3Itb25seSc7XHJcblxyXG5cdFx0bGluay5zZXRBdHRyaWJ1dGUoJ2hyZWYnLCAnJyk7XHJcblx0XHRsaW5rLnNldEF0dHJpYnV0ZSgnYXJpYS1sYWJlbCcsICdOZXh0Jyk7XHJcblx0XHRzcGFuMS5zZXRBdHRyaWJ1dGUoJ2FyaWEtaGlkZGVuJywgJ3RydWUnKTtcclxuXHJcblx0XHRzcGFuMS5pbm5lckhUTUwgPSAnJnJhcXVvOyc7XHJcblx0XHRzcGFuMi5pbm5lckhUTUwgPSAnTmV4dCc7XHJcblxyXG5cdFx0bGluay5hcHBlbmRDaGlsZChzcGFuMSk7XHJcblx0XHRsaW5rLmFwcGVuZENoaWxkKHNwYW4yKTtcclxuXHRcdGxpLmFwcGVuZENoaWxkKGxpbmspO1xyXG5cclxuXHRcdHJldHVybiBsaTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIENoZWNrcyBpZiB0aGUgZ2l2ZW4gcGFnZSBpcyBpbiByYW5nZS5cclxuXHQgKi9cclxuXHRub3RJblBhZ2VSYW5nZShwYWdlTnVtYmVyKSBcclxuXHR7XHJcblx0XHRyZXR1cm4gKHBhZ2VOdW1iZXIgPiB0aGlzLnRvdGFsUGFnZXMgfHwgcGFnZU51bWJlciA8PSAwKSB8fCBpc05hTihwYWdlTnVtYmVyKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIENoYW5nZXMgdGhlIHVybCB0byBhIGdpdmVuIHBhZ2UgbnVtYmVyLlxyXG5cdCAqL1xyXG5cdGNoYW5nZVVybChwYWdlTnVtYmVyKSBcclxuXHR7XHJcblx0XHRwYWdlTnVtYmVyID0gIHBhZ2VOdW1iZXIgfHwgR0VUX1ZhcnMoKVsncGFnZSddO1xyXG5cdFx0d2luZG93Lmhpc3RvcnkucmVwbGFjZVN0YXRlKCcnLCAnJywgdGhpcy51cGRhdGVVUkxQYXJhbWV0ZXIod2luZG93LmxvY2F0aW9uLmhyZWYsICdwYWdlJywgcGFnZU51bWJlcikpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogR2V0IHRoZSBnZXQgdmFyaWFibGVzIGZyb20gdGhlIHVybC5cclxuXHQgKi9cclxuXHRHRVRfVmFycygpIFxyXG5cdHtcclxuXHRcdHZhciB2YXJzID0ge307XHJcblx0XHR2YXIgcGFydHMgPSB3aW5kb3cubG9jYXRpb24uaHJlZi5yZXBsYWNlKC9bPyZdKyhbXj0mXSspPShbXiZdKikvZ2ksIGZ1bmN0aW9uKG0sIGtleSwgdmFsdWUpIHtcclxuXHRcdFx0dmFyc1trZXldID0gdmFsdWU7XHJcblx0XHR9KTtcclxuXHJcblx0XHRyZXR1cm4gdmFycztcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIE1vZGlmaWVzIHRoZSBnZXQgcGFyYW1ldGVyIGluIHRoZSB1cmwuXHJcblx0ICovXHJcblx0dXBkYXRlVVJMUGFyYW1ldGVyKHVybCwgcGFyYW0sIHBhcmFtVmFsKSBcclxuXHR7XHJcblx0ICAgIHZhciBuZXdBZGRpdGlvbmFsVVJMID0gXCJcIjtcclxuXHQgICAgdmFyIHRlbXBBcnJheSA9IHVybC5zcGxpdChcIj9cIik7XHJcblx0ICAgIHZhciBiYXNlVVJMID0gdGVtcEFycmF5WzBdO1xyXG5cdCAgICB2YXIgYWRkaXRpb25hbFVSTCA9IHRlbXBBcnJheVsxXTtcclxuXHQgICAgdmFyIHRlbXAgPSBcIlwiO1xyXG5cclxuXHQgICAgaWYgKGFkZGl0aW9uYWxVUkwpIHtcclxuXHQgICAgICAgIHRlbXBBcnJheSA9IGFkZGl0aW9uYWxVUkwuc3BsaXQoXCImXCIpO1xyXG5cdCAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0ZW1wQXJyYXkubGVuZ3RoOyBpKyspe1xyXG5cdCAgICAgICAgICAgIGlmICh0ZW1wQXJyYXlbaV0uc3BsaXQoJz0nKVswXSAhPSBwYXJhbSl7XHJcblx0ICAgICAgICAgICAgICAgIG5ld0FkZGl0aW9uYWxVUkwgKz0gdGVtcCArIHRlbXBBcnJheVtpXTtcclxuXHQgICAgICAgICAgICAgICAgdGVtcCA9IFwiJlwiO1xyXG5cdCAgICAgICAgICAgIH1cclxuXHQgICAgICAgIH1cclxuXHQgICAgfVxyXG5cclxuXHQgICAgdmFyIHJvd3NUZXh0ID0gdGVtcCArIFwiXCIgKyBwYXJhbSArIFwiPVwiICsgcGFyYW1WYWw7XHJcblx0ICAgIHJldHVybiBiYXNlVVJMICsgXCI/XCIgKyBuZXdBZGRpdGlvbmFsVVJMICsgcm93c1RleHQ7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBSZXNldHMgdGhlIHBhZ2luYXRpb24uXHJcblx0ICovXHJcblx0cmVzZXQoKSBcclxuXHR7XHJcblx0XHR0aGlzLnNldEN1cnJlbnQoMSk7XHJcblx0XHR0aGlzLmNoYW5nZVVybCgxKTtcclxuXHR9XHJcbn1cblxuLyoqXHJcbiAqIFRoZSBkZWZhdWx0IHNldHRpbmdzIG9mIHRoZSBjYXJ0LlxyXG4gKi9cclxubGV0IGRlZmF1bHRTZXR0aW5ncyQ0ID0ge1xyXG5cdGVsZW1lbnQ6ICcuY2FydCcsXHJcblx0Y29va2llX25hbWU6ICdjYXJ0JyxcclxuXHRwcmV2aWV3X2NsYXNzOiAnJyxcclxuXHRjbGFzczogJycsXHJcblx0d2lkdGg6ICc2MHB4JyxcclxuXHRoZWlnaHQ6ICc2MHB4JyxcclxuXHRwbGFjZW1lbnQ6ICdyaWdodC10b3AnLFxyXG5cdGZpeGVkOiB0cnVlLFxyXG5cdGhvdmVyX2NvbG9yOiAnb3JhbmdlJ1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIFN0b3JlcyB0aGUgY29udGFpbmVyIG9iamVjdC5cclxuICovXHJcbmxldCBDb250YWluZXIkNDtcclxuXHJcbi8qKlxyXG4gKiBUaGUgQ2FydCBPYmplY3QsIGhhbmRsZXMgdGhlIGNhcnQgaWNvbiBhbmQgc2Vzc2lvbnMuXHJcbiAqL1xyXG5jbGFzcyBDYXJ0IFxyXG57XHJcblx0LyoqXHJcblx0ICogSW5pdGlhbGl6ZSB0aGUgZGVmYXVsdCBzZXR0aW5ncywgc2V0dGluZyB0aGUgZWxlbWVudCxcclxuXHQgKiBhbmQgY3JlYXRpbmcgdGhlIHByZXZpZXcgZm9yIHRoZSBjYXJ0cyBkZXRhaWxzLlxyXG5cdCAqL1xyXG5cdGNvbnN0cnVjdG9yKGNvbnRhaW5lcikgXHJcblx0e1xyXG5cdFx0Q29udGFpbmVyJDQgPSBjb250YWluZXI7XHJcblx0XHRcclxuXHRcdHRoaXMucHJldmlld0VsZW1lbnQgPSB0aGlzLmNyZWF0ZVByZXZpZXdFbGVtZW50KCk7XHJcblx0XHR0aGlzLnN2Z0ljb24gPSBjcmVhdGVJY29uLmNhbGwodGhpcyk7XHJcblx0XHR0aGlzLml0ZW1zID0gW107XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBTZXRzIHRoZSBvYmplY3QgYnkgdGhlIHVzZXJzIHNldHRpbmcuXHJcblx0ICovXHJcblx0c2V0dXAoc2V0dGluZ3MpXHJcblx0e1xyXG5cdFx0aWYodHlwZW9mIHNldHRpbmdzICE9ICdvYmplY3QnKSB7XHJcblx0XHRcdHRocm93IG5ldyBJbnZhbGlkQXJndW1lbnRFeGNlcHRpb24kMTtcclxuXHRcdH1cclxuXHJcblx0XHR0aGlzLnNldHRpbmdzID0gQ29tbW9uLmV4dGVuZChkZWZhdWx0U2V0dGluZ3MkNCwgc2V0dGluZ3MpO1xyXG5cclxuXHRcdHRoaXMuc2V0RWxlbWVudCh0aGlzLnNldHRpbmdzLmVsZW1lbnQpO1xyXG5cdFx0RE9NLmFkZENsYXNzKHRoaXMucHJldmlld0VsZW1lbnQsICdjbG9zZWQnKTtcclxuXHRcdERPTS5hZGRDbGFzcyh0aGlzLnByZXZpZXdFbGVtZW50LCB0aGlzLnNldHRpbmdzLnByZXZpZXdfY2xhc3MpO1xyXG5cdFx0XHJcblx0XHR0aGlzLmJpbmRFdmVudExpc3RlbmVycygpO1xyXG5cdFx0dGhpcy5hZGRTdHlsZVRhZygpO1xyXG5cdFx0XHJcblx0XHR0aGlzLnNldENhcnRDb29raWUodGhpcy5zZXR0aW5ncy5jb29raWVfbmFtZSk7XHJcblx0fVxyXG5cclxuXHRhZGRJdGVtKGl0ZW0pXHJcblx0e1xyXG5cdFx0dGhpcy5pdGVtcyA9IENvbW1vbi5nZXRDb29raWUoJ2NhcnQnKTtcclxuXHJcblx0XHR0aGlzLml0ZW1zLnB1c2goaXRlbSk7XHJcblxyXG5cdFx0Q29tbW9uLmNyZWF0ZUNvb2tpZSh0aGlzLnNldHRpbmdzLmNvb2tpZV9uYW1lLCB0aGlzLml0ZW1zLCAyKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEJpbmRzIGV2ZXJ0aGluZyB0byB0aGUgZWxlbWVudC5cclxuXHQgKi9cclxuXHRzZXRFbGVtZW50KHNlbGVjdG9yKVxyXG5cdHtcclxuXHRcdHRoaXMuaWNvbiA9IERPTS5lbGVtZW50KHNlbGVjdG9yKTtcclxuXHJcblx0XHRpZiAodGhpcy5pY29uKSB7XHJcblx0XHRcdERPTS5hZGRDbGFzcyh0aGlzLmljb24sIHRoaXMuc2V0dGluZ3MuY2xhc3MpO1xyXG5cdFx0XHRET00uYWRkQ2xhc3ModGhpcy5pY29uLCB0aGlzLnNldHRpbmdzLnBsYWNlbWVudCk7XHJcblx0XHRcdHRoaXMuaWNvbi5hcHBlbmRDaGlsZCh0aGlzLnN2Z0ljb24pO1xyXG5cdFx0XHR0aGlzLmljb24uYXBwZW5kQ2hpbGQodGhpcy5wcmV2aWV3RWxlbWVudCk7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBDcmVhdGVzIHRoZSBjYXJ0IGRldGFpbHMgcHJldmlldyBlbGVtZW50LlxyXG5cdCAqL1xyXG5cdGNyZWF0ZVByZXZpZXdFbGVtZW50KClcclxuXHR7XHJcblx0XHRsZXQgcHJldmlld0VsZW1lbnQgPSBET00uY3JlYXRlRWxlbWVudCgnZGl2Jywge1xyXG5cdFx0XHRpZDogJ3ByZXZpZXcnXHJcblx0XHR9KTtcclxuXHJcblx0XHRyZXR1cm4gcHJldmlld0VsZW1lbnQ7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBBZGQgdGhlIGVDb21tZXJjZSBzdHlsZSB0YWdzIHRvIHRoZSBET00uXHJcblx0ICovXHJcblx0YWRkU3R5bGVUYWcoKSBcclxuXHR7XHJcblx0XHRpZihET00uZWxlbWVudCgnI2VDb21tZXJjZS1DYXJ0JykpIHtcclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0fVxyXG5cclxuXHRcdGxldCBwb3NpdGlvbiA9ICh0aGlzLnNldHRpbmdzLmZpeGVkKSA/ICdmaXhlZCcgOiAnYWJzb2x1dGUnO1xyXG5cclxuXHRcdGxldCBjc3MgPSBgXHJcblx0XHRcdCR7dGhpcy5zZXR0aW5ncy5lbGVtZW50fSB7XHJcblx0XHRcdFx0cG9zaXRpb246ICR7cG9zaXRpb259O1xyXG5cdFx0XHRcdGN1cnNvcjogcG9pbnRlcjtcclxuXHRcdFx0XHRjb2xvcjogI2ZmZmZmZjtcclxuXHRcdFx0XHR6LWluZGV4OiA5OTg7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdCR7dGhpcy5zZXR0aW5ncy5lbGVtZW50fSA+IHN2ZyB7XHJcblx0XHRcdFx0d2lkdGg6ICR7dGhpcy5zZXR0aW5ncy53aWR0aH07XHJcblx0XHRcdFx0aGVpZ2h0OiAke3RoaXMuc2V0dGluZ3MuaGVpZ2h0fTtcclxuXHRcdFx0XHR0cmFuc2l0aW9uOiBmaWxsIDAuM3M7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdCR7dGhpcy5zZXR0aW5ncy5lbGVtZW50fSA+IHN2Zzpob3ZlciB7XHJcblx0XHRcdFx0ZmlsbDogJHt0aGlzLnNldHRpbmdzLmhvdmVyX2NvbG9yfTtcclxuXHRcdFx0XHR0cmFuc2l0aW9uOiBmaWxsIDAuM3M7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdCR7dGhpcy5zZXR0aW5ncy5lbGVtZW50fS50b3AtcmlnaHQsXHJcblx0XHRcdCR7dGhpcy5zZXR0aW5ncy5lbGVtZW50fS5yaWdodC10b3Age1xyXG5cdFx0XHRcdHJpZ2h0OiAxMHB4O1xyXG5cdFx0XHRcdHRvcDogMTBweDtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0JHt0aGlzLnNldHRpbmdzLmVsZW1lbnR9LmxlZnQtdG9wLFxyXG5cdFx0XHQke3RoaXMuc2V0dGluZ3MuZWxlbWVudH0udG9wLWxlZnQge1xyXG5cdFx0XHRcdGxlZnQ6IDEwcHg7XHJcblx0XHRcdFx0dG9wOiAxMHB4O1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHQke3RoaXMuc2V0dGluZ3MuZWxlbWVudH0gPiAjcHJldmlldyB7XHJcblx0XHRcdFx0cG9zaXRpb246ICR7cG9zaXRpb259O1xyXG5cdFx0XHRcdHotaW5kZXg6IDk5OTk7XHJcblx0XHRcdFx0dG9wOiBjYWxjKDEwcHggKyAke3RoaXMuc2V0dGluZ3MuaGVpZ2h0fSk7XHJcblx0XHRcdFx0dHJhbnNmb3JtOiB0cmFuc2xhdGVYKDYwcHgpO1xyXG5cdFx0XHRcdGhlaWdodDogNDAwcHg7XHJcblx0XHRcdFx0d2lkdGg6IDMwMHB4O1xyXG5cdFx0XHRcdGJvcmRlcjogMXB4IHNvbGlkICNlNGU0ZTQ7XHJcblx0XHRcdFx0YmFja2dyb3VuZDogI2ZmZmZmZjtcclxuXHRcdFx0XHR0cmFuc2l0aW9uOiB0cmFuc2Zvcm0gMXMsIHZpc2liaWxpdHkgMXM7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdCR7dGhpcy5zZXR0aW5ncy5lbGVtZW50fSA+ICNwcmV2aWV3Lm9wZW5lZCB7XHJcblx0XHRcdFx0dmlzaWJpbGl0eTogdmlzaWJsZTtcclxuXHRcdFx0XHR0cmFuc2Zvcm06IHRyYW5zbGF0ZVgoLTI0MHB4KTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0JHt0aGlzLnNldHRpbmdzLmVsZW1lbnR9ID4gI3ByZXZpZXcuY2xvc2VkIHtcclxuXHRcdFx0XHR2aXNpYmlsaXR5OiBoaWRkZW47XHJcblx0XHRcdFx0dHJhbnNmb3JtOiB0cmFuc2xhdGVYKDYwcHgpO1xyXG5cdFx0XHR9XHJcblx0XHRgO1xyXG5cdCAgICBcclxuXHQgICAgRE9NLmFkZFN0eWxlKCdlQ29tbWVyY2UtQ2FydCcsIGNzcyk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBCaW5kcyBldmVudCBsaXN0ZW5lcnMgdG8gdGhlIGNhcnQgaWNvbi5cclxuXHQgKi9cclxuXHRiaW5kRXZlbnRMaXN0ZW5lcnMoKVxyXG5cdHtcclxuXHRcdGlmKHRoaXMuc3ZnSWNvbiA9PSBudWxsKSB7XHJcblx0XHRcdHJldHVybjtcclxuXHRcdH1cclxuXHJcblx0XHR0aGlzLnN2Z0ljb24ub25jbGljayA9IGZ1bmN0aW9uKGV2ZW50KSB7XHJcblx0XHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcblx0XHRcdERPTS50b2dnbGVDbGFzcyh0aGlzLnByZXZpZXdFbGVtZW50LCAnb3BlbmVkJywgJ2Nsb3NlZCcpO1xyXG5cdFx0fS5iaW5kKHRoaXMpO1xyXG5cclxuXHRcdHRoaXMucHJldmlld0VsZW1lbnQub25tb3VzZW91dCA9IGZ1bmN0aW9uKGV2ZW50KSB7XHJcblx0XHRcdGNsb3NlLmNhbGwodGhpcywgZXZlbnQpO1xyXG5cdFx0fS5iaW5kKHRoaXMpO1xyXG5cdH1cclxuXHJcblx0c2V0Q2FydENvb2tpZShuYW1lKVxyXG5cdHtcclxuXHRcdGlmKENvbW1vbi5nZXRDb29raWUobmFtZSkpIHtcclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0fVxyXG5cclxuXHRcdENvbW1vbi5jcmVhdGVDb29raWUoJ2NhcnQnLCBbXSwgMik7IFxyXG5cdH1cclxufVxyXG5cclxuZnVuY3Rpb24gY2xvc2UoZXZlbnQpIHtcclxuXHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdERPTS5zd2l0Y2hDbGFzc2VzKHRoaXMucHJldmlld0VsZW1lbnQsICdvcGVuZWQnLCAnY2xvc2VkJyk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNyZWF0ZUljb24oKSB7XHJcblx0bGV0IHN2ZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnROUyhcImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIsIFwic3ZnXCIpO1xyXG5cdGxldCBnID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKFwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiwgXCJnXCIpO1xyXG5cdGxldCBwYXRoID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKFwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiwgXCJwYXRoXCIpO1xyXG5cclxuXHRzdmcuc2V0QXR0cmlidXRlKCd2ZXJzaW9uJywgJzEuMScpO1xyXG5cdHN2Zy5zZXRBdHRyaWJ1dGUoJ3htbG5zJywgJ2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJyk7XHJcblx0c3ZnLnNldEF0dHJpYnV0ZSgneG1sbnM6eGxpbmsnLCAnaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluaycpO1xyXG5cdHN2Zy5zZXRBdHRyaWJ1dGUoJ3gnLCAnMHB4Jyk7XHJcblx0c3ZnLnNldEF0dHJpYnV0ZSgneScsICcwcHgnKTtcclxuXHRzdmcuc2V0QXR0cmlidXRlKCd3aWR0aCcsICc0NDYuODQzcHgnKTtcclxuXHRzdmcuc2V0QXR0cmlidXRlKCdoZWlnaHQnLCAnNDQ2Ljg0M3B4Jyk7XHJcblx0c3ZnLnNldEF0dHJpYnV0ZSgndmlld0JveCcsICcwIDAgNDQ2Ljg0MyA0NDYuODQzJyk7XHJcblx0c3ZnLnNldEF0dHJpYnV0ZSgnc3R5bGUnLCAnZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA0NDYuODQzIDQ0Ni44NDM7Jyk7XHJcblx0c3ZnLnNldEF0dHJpYnV0ZSgneG1sOnNwYWNlJywgJ3ByZXNlcnZlJyk7XHJcblxyXG5cdHBhdGguc2V0QXR0cmlidXRlKCdkJywgJ000NDQuMDksOTMuMTAzYy0yLjY5OC0zLjY5OS03LjAwNi01Ljg4OC0xMS41ODQtNS44ODhIMTA5LjkyYy0wLjYyNSwwLTEuMjQ5LDAuMDM4LTEuODUsMC4xMTlsLTEzLjI3Ni0zOC4yN2MtMS4zNzYtMy45NTgtNC40MDYtNy4xMTMtOC4zLTguNjQ2TDE5LjU4NiwxNC4xMzRjLTcuMzc0LTIuODg3LTE1LjY5NSwwLjczNS0xOC41OTEsOC4xYy0yLjg5MSw3LjM2OSwwLjczLDE1LjY5NSw4LjEsMTguNTkxbDYwLjc2OCwyMy44NzJsNzQuMzgxLDIxNC4zOTljLTMuMjgzLDEuMTQ0LTYuMDY1LDMuNjYzLTcuMzMyLDcuMTg3bC0yMS41MDYsNTkuNzM5Yy0xLjMxOCwzLjY2My0wLjc3NSw3LjczMywxLjQ2OCwxMC45MTZjMi4yNCwzLjE4Myw1Ljg4Myw1LjA3OCw5Ljc3Myw1LjA3OGgxMS4wNDRjLTYuODQ0LDcuNjE2LTExLjA0NCwxNy42NDYtMTEuMDQ0LDI4LjY3NWMwLDIzLjcxOCwxOS4yOTgsNDMuMDEyLDQzLjAxMiw0My4wMTJzNDMuMDEyLTE5LjI5NCw0My4wMTItNDMuMDEyYzAtMTEuMDI5LTQuMi0yMS4wNTktMTEuMDQ0LTI4LjY3NWg5My43NzZjLTYuODQ3LDcuNjE2LTExLjA0OCwxNy42NDYtMTEuMDQ4LDI4LjY3NWMwLDIzLjcxOCwxOS4yOTQsNDMuMDEyLDQzLjAxMyw0My4wMTJjMjMuNzE4LDAsNDMuMDEyLTE5LjI5NCw0My4wMTItNDMuMDEyYzAtMTEuMDI5LTQuMi0yMS4wNTktMTEuMDQzLTI4LjY3NWgxMy40MzNjNi41OTksMCwxMS45NDctNS4zNDksMTEuOTQ3LTExLjk0OGMwLTYuNTk5LTUuMzQ5LTExLjk0Ny0xMS45NDctMTEuOTQ3SDE0My42NDdsMTMuMzE5LTM2Ljk5NmMxLjcyLDAuNzI0LDMuNTc4LDEuMTUyLDUuNTIzLDEuMTUyaDIxMC4yNzhjNi4yMzQsMCwxMS43NTEtNC4wMjcsMTMuNjUtOS45NTlsNTkuNzM5LTE4Ni4zODdDNDQ3LjU1NywxMDEuNTY3LDQ0Ni43ODgsOTYuODAyLDQ0NC4wOSw5My4xMDN6IE0xNjkuNjU5LDQwOS44MDdjLTEwLjU0MywwLTE5LjExNi04LjU3My0xOS4xMTYtMTkuMTE2czguNTczLTE5LjExNywxOS4xMTYtMTkuMTE3czE5LjExNiw4LjU3NCwxOS4xMTYsMTkuMTE3UzE4MC4yMDIsNDA5LjgwNywxNjkuNjU5LDQwOS44MDd6IE0zMjcuMzY3LDQwOS44MDdjLTEwLjU0MywwLTE5LjExNy04LjU3My0xOS4xMTctMTkuMTE2czguNTc0LTE5LjExNywxOS4xMTctMTkuMTE3YzEwLjU0MiwwLDE5LjExNiw4LjU3NCwxOS4xMTYsMTkuMTE3UzMzNy45MDksNDA5LjgwNywzMjcuMzY3LDQwOS44MDd6IE00MDIuNTIsMTQ4LjE0OWgtNzMuMTYxVjExNS44OWg4My40OTlMNDAyLjUyLDE0OC4xNDl6IE0zODEuNDUzLDIxMy44NjFoLTUyLjA5NHYtMzcuMDM4aDYzLjk2N0wzODEuNDUzLDIxMy44NjF6IE0yMzQuNTcxLDIxMy44NjF2LTM3LjAzOGg2Ni4xMTN2MzcuMDM4SDIzNC41NzF6IE0zMDAuNjg0LDI0Mi41Mzh2MzEuMDY0aC02Ni4xMTN2LTMxLjA2NEgzMDAuNjg0eiBNMTM5LjExNSwxNzYuODIzaDY2Ljc4NHYzNy4wMzhoLTUzLjkzM0wxMzkuMTE1LDE3Ni44MjN6IE0yMzQuNTcxLDE0OC4xNDlWMTE1Ljg5aDY2LjExM3YzMi4yNTlIMjM0LjU3MXogTTIwNS44OTgsMTE1Ljg5djMyLjI1OWgtNzYuNzM0bC0xMS4xOTEtMzIuMjU5SDIwNS44OTh6IE0xNjEuOTE2LDI0Mi41MzhoNDMuOTgydjMxLjA2NGgtMzMuMjA2TDE2MS45MTYsMjQyLjUzOHogTTMyOS4zNTksMjczLjYwM3YtMzEuMDY0aDQyLjkwOWwtOS45NTUsMzEuMDY0SDMyOS4zNTl6Jyk7XHJcblxyXG5cdGcuYXBwZW5kQ2hpbGQocGF0aCk7XHJcblx0c3ZnLmFwcGVuZENoaWxkKGcpO1xyXG5cclxuXHJcblx0cmV0dXJuIHN2ZztcclxufVxuXG5sZXQgaW5pdGFsaXplZCA9IGZhbHNlO1xuXG5sZXQgZGVmYXVsdFNldHRpbmdzID0ge1xuXHRpbXBvcnRCb290c3RyYXA6IGZhbHNlLFxuXHRjb21wb25lbnRzOiBbJ1Byb2R1Y3RzJywgJ1NlcnZpY2VzJywgJ0ZpbHRlcicsICdQYWdpbmF0aW9uJ11cbn07XG5cbmNsYXNzIGVDb21tZXJjZVxue1xuXHRjb25zdHJ1Y3RvcihzZXR0aW5ncylcblx0e1xuXHRcdEV4Y2VwdGlvbkhhbmRsZXIuaW5pdGFsaXplKCk7XG5cblx0XHRpZih0eXBlb2Ygc2V0dGluZ3MgIT0gJ29iamVjdCcpIHtcblx0XHRcdHRocm93IG5ldyBJbnZhbGlkQXJndW1lbnRFeGNlcHRpb24kMTtcblx0XHR9XG5cblx0XHR0aGlzLmNvbnRhaW5lciA9IG5ldyBDb250YWluZXI7XG5cdFx0dGhpcy5zZXR0aW5ncyA9IENvbW1vbi5leHRlbmQoZGVmYXVsdFNldHRpbmdzLCBzZXR0aW5ncyk7XG5cdFx0XG5cdFx0YmluZENvbXBvbmVudHNEZXBlbmRlbmNpZXMuY2FsbCh0aGlzLCBzZXR0aW5ncy5jb21wb25lbnRzKTtcblxuXHRcdGluaXRhbGl6ZWQgPSB0cnVlO1xuXG5cdFx0cmV0dXJuIG5ldyBQcm94eSh0aGlzLCB7XG5cdFx0XHRnZXQ6IGZ1bmN0aW9uKHRhcmdldCwgb2JqZWN0KSB7XG5cdFx0XHRcdHJldHVybiB0YXJnZXQuY29udGFpbmVyLm1ha2Uob2JqZWN0KTtcblx0XHRcdH1cblx0XHR9KTtcblx0fVxufVxuXG4vKipcbiAqIEJpbmRzIGNvbXBvbmVudHMgZGVwZW5kZW5jaWVzLlxuICovXG5mdW5jdGlvbiBiaW5kQ29tcG9uZW50c0RlcGVuZGVuY2llcyhjb21wb25lbnRzKSB7XG5cdHRoaXMuY29udGFpbmVyLmJpbmQoJ0ZpbHRlcicsIGZ1bmN0aW9uKGNvbnRhaW5lcikge1xuXHRcdHJldHVybiBuZXcgRmlsdGVyKGNvbnRhaW5lcik7XG5cdH0pO1xuXHRcblx0dGhpcy5jb250YWluZXIuYmluZCgnU2VydmljZXMnLCBmdW5jdGlvbihjb250YWluZXIpIHsgXG5cdFx0cmV0dXJuIG5ldyBTZXJ2aWNlcyhjb250YWluZXIpO1xuXHR9KTtcblxuXHR0aGlzLmNvbnRhaW5lci5iaW5kKCdQYWdpbmF0aW9uJywgZnVuY3Rpb24oY29udGFpbmVyKSB7XG5cdFx0cmV0dXJuIG5ldyBQYWdpbmF0aW9uKGNvbnRhaW5lcik7XG5cdH0pO1xuXG5cdHRoaXMuY29udGFpbmVyLmJpbmQoJ1Byb2R1Y3RzJywgZnVuY3Rpb24oY29udGFpbmVyKSB7XG5cdFx0cmV0dXJuIG5ldyBQcm9kdWN0cyhjb250YWluZXIsIGNvbnRhaW5lci5tYWtlKCdQYWdpbmF0aW9uJykpO1xuXHR9KTtcblxuXHR0aGlzLmNvbnRhaW5lci5iaW5kKCdDYXJ0JywgZnVuY3Rpb24oY29udGFpbmVyKSB7XG5cdFx0cmV0dXJuIG5ldyBDYXJ0KGNvbnRhaW5lcik7XG5cdH0pO1xufVxuXG5yZXR1cm4gZUNvbW1lcmNlO1xuXG59KCkpO1xuIl19
