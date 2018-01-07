'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var eCommerce = function () {
	'use strict';

	var InvalidArgumentException$1 = function (_Error) {
		_inherits(InvalidArgumentException$1, _Error);

		function InvalidArgumentException$1() {
			_classCallCheck(this, InvalidArgumentException$1);

			var _this = _possibleConstructorReturn(this, (InvalidArgumentException$1.__proto__ || Object.getPrototypeOf(InvalidArgumentException$1)).call(this));

			console.error('InvalidArgumentException, an invalid argument was passed.');
			return _this;
		}

		return InvalidArgumentException$1;
	}(Error);

	/**
  * @file 
  * DOM class.
  *
  * Adds some useful functionality for
  * fetching or manipulating DOM elements.
  */

	var DOM = function () {
		function DOM() {
			_classCallCheck(this, DOM);
		}

		_createClass(DOM, null, [{
			key: 'minifyCss',

			/**
    * Minifies the css text.
    * 
    * @param string | string
    * @return string
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
    *
    * @param object | element
    * @param string | className
    * @param string | newClassName
    * @return object
    */

		}, {
			key: 'switchClasses',
			value: function switchClasses(element, className, newClassName) {
				this.removeClass(element, className);
				this.addClass(element, newClassName);
			}

			/**
    * Adds class to a given element.
    *
    * @param object | element
    * @param string | className
    * @return object
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
    * 
    * @param object | element
    * @param string | className
    * @return object
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
    * Adds style tag with given id and css to the DOM.
    * 
    * @param string | id
    * @param string | css
    * @return void
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
    * 
    * @param string | elementType
    * @param object | options
    * @return HTMLElement
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
    * 
    * @param object | element
    * @param string | className
    * @return bool
    */

		}, {
			key: 'toggleClass',
			value: function toggleClass(element, className, secondClassName) {
				if (element == null || typeof element == 'undefined') {
					throw new InvalidArgumentException$1();
				}

				secondClassName = secondClassName || undefined;

				if (secondClassName) {
					element.classList.toggle(secondClassName);
				}

				return element.classList.toggle(className);
			}

			/**
    * Finds an element inside of parent.
    *
    * @param string | selector
    * @param object | context
    * @return mixed
    */

		}, {
			key: 'find',
			value: function find(selector) {
				var context = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : window.document;

				return queryElement(selector, context);
			}
		}]);

		return DOM;
	}();

	/**
  * Queries an element from the DOM.
  *
  * @param string | selector
  * @param object | parentElement
  * @return mixed
  */


	function queryElement(selector, parentElement) {
		var element = parentElement.querySelectorAll(selector);

		if (element.length == 0) {
			return null;
		}

		return element.length > 1 ? element : element[0];
	}

	/**
  * Checks if parent has child.
  *
  * @param object | parentElement
  * @param object | childElement
  * @return bool
  */
	function hasChild(parentElement, childElement) {
		var node = childElement.parentNode;

		while (node != null) {
			if (node == parentElement) {
				return true;
			}
			node = node.parentNode;
		}

		return false;
	}

	var events = [];

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

				if (typeof events[name] == 'undefined') {
					events[name] = [];
				}

				events[name].push(callback);
			}

			/**
    * Fires an event.
    */

		}, {
			key: 'trigger',
			value: function trigger(name) {
				for (var _len = arguments.length, data = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
					data[_key - 1] = arguments[_key];
				}

				data = data || null;

				events[name].forEach(function (callback) {
					if (typeof callback !== 'function') {
						throw new BadEventCallException();
					}

					return callback.apply(undefined, _toConsumableArray(data));
				});
			}
		}]);

		return Event;
	}();

	/**
  * @file 
  * Common class.
  *
  * Adds some useful functionality for
  * common tasks - data checks or data manipulation.
  */

	var Common = function () {
		function Common() {
			_classCallCheck(this, Common);
		}

		_createClass(Common, null, [{
			key: 'extend',

			/**
    * Extend an object.
    *
    * @param object | currentObject
    * @param object | newObject
    * @return object
    */
			value: function extend(currentObject, newObject) {
				var extended = {};
				var prop;

				for (prop in currentObject) {
					if (Object.prototype.hasOwnProperty.call(currentObject, prop)) {
						extended[prop] = currentObject[prop];
					}
				}

				for (prop in newObject) {
					if (Object.prototype.hasOwnProperty.call(newObject, prop)) {
						extended[prop] = newObject[prop];
					}
				}

				return extended;
			}

			/**
    * Checks for a needle in hystack array.
    *
    * @param mixed | needle
    * @param object | object
    * @return bool
    *
    */

		}, {
			key: 'in_array',
			value: function in_array(needle, hystack) {
				if (hystack.constructor !== Array) {
					throw new InvalidArgumentException$1();
				}

				for (var i = 0; i <= hystack.length; i++) {
					if (needle == hystack[i]) {
						return true;
					}
				}

				return false;
			}

			/**
    * Checks if an object is empty.
    *
    * @param object | object
    * @return bool
    */

		}, {
			key: 'emptyObject',
			value: function emptyObject(object) {
				for (var prop in object) {
					return false;
				}

				return true;
			}

			/**
    * Checks if a given object contained in an array.
    * 
    * @param object | object
    * @param array | haystack
    * @return bool
    */

		}, {
			key: 'containsObject',
			value: function containsObject(object, hystack) {
				var i = void 0;

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
    * Checks if a given parameter is an object.
    * 
    * @param object | object
    * @return bool
    */

		}, {
			key: 'isObject',
			value: function isObject(object) {
				return (typeof object === 'undefined' ? 'undefined' : _typeof(object)) == 'object';
			}
		}]);

		return Common;
	}();

	var defaultSettings$1 = {
		headers: {
			'Content-Type': 'application/json'
		},
		async: true
	};

	var Request = function () {
		function Request(settings) {
			_classCallCheck(this, Request);

			this.xhr = new XMLHttpRequest() || new ActiveXObject("Microsoft.XMLHTTP");
			this.settings = Common.extend(defaultSettings$1, settings);
			this.setDefaultRequestHeader();
		}

		_createClass(Request, [{
			key: 'setDefaultRequestHeader',
			value: function setDefaultRequestHeader() {
				var header = void 0;
				var headers = this.settings.headers;
				var async = this.settings.async;
				var open = XMLHttpRequest.prototype.open;
				var setRequestHeader = XMLHttpRequest.prototype.setRequestHeader;

				XMLHttpRequest.prototype.open = function () {
					var response = open.apply(this, arguments, async);

					for (header in headers) {
						this.setRequestHeader(header, headers[header]);
					}

					return response;
				};
			}
		}, {
			key: 'post',
			value: function post(options) {
				if ((typeof options === 'undefined' ? 'undefined' : _typeof(options)) !== 'object') {
					throw new Error('post expecting a json object to be passed as an argument, but ' + (typeof options === 'undefined' ? 'undefined' : _typeof(options)) + ' was passed.');
				}

				if (_typeof(options.data) !== 'object') {
					throw new Error('data property expecting a json object to be passed as an argument, but ' + _typeof(options.data) + ' was passed.');
				}

				options.data = options.data || null;

				xhr.open('POST', options.url, true);
				xhr.setRequestHeader("Content-type", options.headers || "application/x-www-form-urlencoded");

				if (options.hasOwnProperty('before') && typeof options.before == 'function') {
					options.before();
				}

				xhr.onreadystatechange = function () {
					if (this.readyState == 4 && this.status == 200) {
						if (options.hasOwnProperty('success') && typeof options.success == 'function') {
							options.success(JSON.parse(this.response));
						}

						if (options.hasOwnProperty('after') && typeof options.after == 'function') {
							options.after(this.response);
						}
					}
				};

				xhr.onerror = function (message, a, b) {
					if (options.hasOwnProperty('error') && typeof options.error == 'function') {
						options.error(message, a, b);
					}
				};

				if (!options.data) {
					xhr.send(null);
					return options;
				}

				var queryString = Object.keys(options.data).map(function (key) {
					return encodeURIComponent(key) + '=' + encodeURIComponent(options.data[key]);
				}).join('&');

				xhr.send(queryString);

				return options;
			}
		}, {
			key: 'get',
			value: function get(options) {
				if ((typeof options === 'undefined' ? 'undefined' : _typeof(options)) !== 'object') {
					throw new Error('get expecting a json object to be passed as an argument, but ' + (typeof options === 'undefined' ? 'undefined' : _typeof(options)) + ' was passed.');
				}

				options.data = options.data || {};

				if (_typeof(options.data) !== 'object') {
					throw new Error('data property expecting a json object to be passed as an argument, but ' + _typeof(options.data) + ' was passed.');
				}

				this.xhr.open('GET', options.url, true);
				//xhr.setRequestHeader("Content-type", options.headers || "application/x-www-form-urlencoded");

				if (options.hasOwnProperty('before') && typeof options.before == 'function') {
					options.before();
				}

				this.xhr.onreadystatechange = function () {
					if (this.readyState == 4 && this.status == 200) {
						if (options.hasOwnProperty('success') && typeof options.success == 'function') {
							options.success(JSON.parse(this.response));
						}

						if (options.hasOwnProperty('after') && typeof options.after == 'function') {
							options.after(this.response);
						}
					}
				};

				this.xhr.onerror = function (message) {
					if (options.hasOwnProperty('error') && typeof options.error == 'function') {
						options.error(message);
					}
				};

				if (!options.data) {
					this.xhr.send(null);
					return options;
				}

				var queryString = Object.keys(options.data).map(function (key) {
					return encodeURIComponent(key) + '=' + encodeURIComponent(options.data[key]);
				}).join('&');

				this.xhr.send(queryString);

				return options;
			}
		}]);

		return Request;
	}();

	var InvalidBindingException = function (_Error2) {
		_inherits(InvalidBindingException, _Error2);

		function InvalidBindingException() {
			_classCallCheck(this, InvalidBindingException);

			var _this2 = _possibleConstructorReturn(this, (InvalidBindingException.__proto__ || Object.getPrototypeOf(InvalidBindingException)).call(this));

			console.error('InvalidBindingException, trying to bind an already existing bound.');
			return _this2;
		}

		return InvalidBindingException;
	}(Error);

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
				var key = void 0;

				if (this.instanceExist(object)) {
					return this.getInstance(object);
				}

				if ((typeof object === 'undefined' ? 'undefined' : _typeof(object)) == 'object') {
					instance = object;
					key = object.constructor.name;
					this.setInstance(key, instance);
				} else if (typeof object == 'string' && this.hasOwnProperty(object)) {
					instance = new this[object]();
					key = object;
					this.setInstance(key, instance);
				} else {
					throw new InvalidBindingException();
				}

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

	var ComponentsException = function (_Error3) {
		_inherits(ComponentsException, _Error3);

		function ComponentsException() {
			_classCallCheck(this, ComponentsException);

			var _this3 = _possibleConstructorReturn(this, (ComponentsException.__proto__ || Object.getPrototypeOf(ComponentsException)).call(this));

			console.error('ComponentsException, expecting for at least one components, but none was given, \n\t\t\t\t\t\t\t\tplease add at least one requirement(Products, Services or/and Filter.');
			return _this3;
		}

		return ComponentsException;
	}(Error);

	var BadEventCallException$1 = function (_Error4) {
		_inherits(BadEventCallException$1, _Error4);

		function BadEventCallException$1() {
			_classCallCheck(this, BadEventCallException$1);

			var _this4 = _possibleConstructorReturn(this, (BadEventCallException$1.__proto__ || Object.getPrototypeOf(BadEventCallException$1)).call(this));

			console.error('BadEventCallException, listening to a none-existing event.');
			return _this4;
		}

		return BadEventCallException$1;
	}(Error);

	var NotInPageRangeException = function (_Error5) {
		_inherits(NotInPageRangeException, _Error5);

		function NotInPageRangeException() {
			_classCallCheck(this, NotInPageRangeException);

			var _this5 = _possibleConstructorReturn(this, (NotInPageRangeException.__proto__ || Object.getPrototypeOf(NotInPageRangeException)).call(this));

			console.error('NotInPageRangeException, sorry, no more pages.');
			return _this5;
		}

		return NotInPageRangeException;
	}(Error);

	var ComponentNotRegisteredException = function (_Error6) {
		_inherits(ComponentNotRegisteredException, _Error6);

		function ComponentNotRegisteredException() {
			_classCallCheck(this, ComponentNotRegisteredException);

			var _this6 = _possibleConstructorReturn(this, (ComponentNotRegisteredException.__proto__ || Object.getPrototypeOf(ComponentNotRegisteredException)).call(this));

			console.error('ComponentNotRegisteredException, components must be registered in order to use them.');
			return _this6;
		}

		return ComponentNotRegisteredException;
	}(Error);

	var ExceptionHandler = function (_Error7) {
		_inherits(ExceptionHandler, _Error7);

		function ExceptionHandler() {
			_classCallCheck(this, ExceptionHandler);

			return _possibleConstructorReturn(this, (ExceptionHandler.__proto__ || Object.getPrototypeOf(ExceptionHandler)).apply(this, arguments));
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
					} else if (error instanceof NotInPageRangeException) {
						// handle 
					} else {
						return false;
					}

					return true;
				};
			}
		}]);

		return ExceptionHandler;
	}(Error);

	/**
  * The default settings of the filter.
  */


	var defaultSettings$2 = {
		element: '.filter',
		data: {},
		class: '',
		width: '',
		height: ''
	};

	/**
  * Stores the container object.
  */
	var Container$2 = void 0;

	/**
  * The Filter Object, handles the filter of the products/services.
  */

	var Filter = function () {
		function Filter(container) {
			_classCallCheck(this, Filter);

			Container$2 = container;
		}

		_createClass(Filter, [{
			key: 'setup',
			value: function setup(settings) {
				if ((typeof settings === 'undefined' ? 'undefined' : _typeof(settings)) != 'object') {
					throw new InvalidArgumentException$1();
				}

				this.settings = Common.extend(defaultSettings$2, settings);

				this.setElement(this.settings.element);
			}
		}, {
			key: 'setElement',
			value: function setElement(selector) {
				this.wrapper = DOM.find(selector);

				DOM.addClass(this.wrapper, this.settings.class);
			}
		}]);

		return Filter;
	}();

	/**
  * @file 
  * Str class.
  *
  * Adds some useful functionality for
  * manipulating strings or creating string.
  */

	var Str = function () {
		function Str() {
			_classCallCheck(this, Str);
		}

		_createClass(Str, null, [{
			key: 'kebabCase',


			/**
    * Convert camelCase to kebab-case.
    */
			value: function kebabCase(string) {
				return string.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
			}

			/**
    * Generates a random string.
    */

		}, {
			key: 'random',
			value: function random(length) {
				var string = '';
				var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

				for (var i = 0; i < length; i++) {
					string += possible.charAt(Math.floor(Math.random() * possible.length));
				}

				return string;
			}
		}]);

		return Str;
	}();

	/**
  * The default settings of each product.
  */


	var defaultSettings$3 = {
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
	var Container$3 = void 0;

	/**
  * Stores the request object.
  */
	var Http = void 0;

	/**
  * The Products Object, handles the products.
  */

	var Products = function () {
		/**
   * Initalize the Container.
   */
		function Products(container, http) {
			_classCallCheck(this, Products);

			Container$3 = container;
			Http = http;
		}

		/**
   * Sets the given settings from the user.
   */


		_createClass(Products, [{
			key: 'setup',
			value: function setup(settings) {
				document.addEventListener('DOMContentLoaded', function () {

					if ((typeof settings === 'undefined' ? 'undefined' : _typeof(settings)) != 'object') {
						throw new InvalidArgumentException$1();
					}

					this.settings = Common.extend(defaultSettings$3, settings);

					this.setElement(this.settings.element);

					this.addStyleTag();

					if (Container$3.Pagination && Container$3.Pagination.booted) {
						var instance = this;

						instance.getProductsByPage(1).then(function (products) {
							instance.replaceItems(products);
						});
					} else {
						this.loadAllProducts();
					}
				}.bind(this));
			}

			/**
    * Loads the products and replace them in the div container.
    */

		}, {
			key: 'loadAllProducts',
			value: function loadAllProducts() {
				var request = this.getProducts();

				request.then(function (items) {
					Event.trigger('ProductsWereFetched', items);
					this.replaceItems(items);
				}.bind(this)).catch(function (error) {});
			}

			/**
    * Sets the DOM element for populating the products.
    */

		}, {
			key: 'setElement',
			value: function setElement(selector) {
				this.wrapper = DOM.find(selector);

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

				var products = this.buildProducts(items, this.settings.item_class, 'div');

				this.wrapper.innerHTML = '';
				products.forEach(function (product) {
					this.wrapper.appendChild(product);
				}.bind(this));

				return items;
			}

			/**
    * Makes an Ajax call to the server without parameters.
    */

		}, {
			key: 'getProducts',
			value: function getProducts() {
				return this.askServer();
			}

			/**
    * Makes an Ajax call to the server.
    */

		}, {
			key: 'getProductsByPage',
			value: function getProductsByPage(pageNumber) {
				return this.askServer(pageNumber);
			}

			/**
    * Sends the request to the server.
    */

		}, {
			key: 'askServer',
			value: function askServer(pageNumber) {
				pageNumber = pageNumber || null;

				return new Promise(function (resolve, reject) {

					var action = pageNumber ? this.settings.url + '?page=' + pageNumber : this.settings.url;

					Http.get({
						url: action,
						success: function success(response) {
							console.log(response);
						}

					});

					var xhr = new XMLHttpRequest() || new ActiveXObject("Microsoft.XMLHTTP");

					if (pageNumber) {
						xhr.open('GET', this.settings.url + '?page=' + pageNumber, true);
					} else {
						xhr.open('GET', this.settings.url, true);
					}

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

				var builtProducts = [];

				attributesCollection.forEach(function (attributes) {
					var builtProduct = this.buildProduct(attributes, className, tagType);
					builtProducts.push(builtProduct);
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

					DOM.addClass(_tag, 'product-' + Str.kebabCase(attribute));
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

				addToCart.addEventListener('click', function (event) {
					event.preventDefault();
					Event.trigger('ProductWasAdded', attributes);
				});

				overlay.appendChild(tag);

				return product;
			}
		}, {
			key: 'addToCart',
			value: function addToCart(event) {}

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
				if (DOM.find('#eCommerce-Products')) {
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


	var defaultSettings$4 = {
		element: '.pagination-links',
		class: '',
		per_page: 5,
		total_items: 10
	};

	/**
  * Stores the container object.
  */
	var Container$4 = void 0;

	/**
  * Stores the products component.
  */
	var Products$2 = void 0;

	/**
  * The Pagination Object, handles the pagination.
  */

	var Pagination = function () {
		/**
   * Initialize the container object and the default settings.
   */
		function Pagination(container, products) {
			_classCallCheck(this, Pagination);

			this.setCurrent(1);
			Container$4 = container;
			Products$2 = products;
		}

		/**
   * Set the Pagination object up.
   */


		_createClass(Pagination, [{
			key: 'setup',
			value: function setup(settings) {
				document.addEventListener('DOMContentLoaded', function () {

					if ((typeof settings === 'undefined' ? 'undefined' : _typeof(settings)) != 'object') {
						throw new InvalidArgumentException$1();
					}

					this.settings = Common.extend(defaultSettings$4, settings);

					this.totalPages = this.calculateTotalPages(this.settings.per_page, this.settings.total_items);

					this.setElement(this.settings.element);
					this.replaceLinks(this.links);
				}.bind(this));
			}

			/**
    * Sets the wrapper element.
    */

		}, {
			key: 'setElement',
			value: function setElement(selector) {
				this.wrapper = DOM.find(selector);

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

			/**
    * Calculates the total pages.
    */

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

				this.next.childNodes[0].onclick = function (event) {
					event.preventDefault();

					var requestedPage = instance.current + 1;

					if (instance.notInPageRange(requestedPage)) {
						throw new NotInPageRangeException();
					}

					Products$2.getProductsByPage(requestedPage).then(function (products) {
						Products$2.replaceItems(products);
					});

					instance.setCurrent(requestedPage);
				};

				this.previous.childNodes[0].onclick = function (event) {
					event.preventDefault();

					var requestedPage = instance.current - 1;

					if (instance.notInPageRange(requestedPage)) {
						throw new NotInPageRangeException();
					}

					Products$2.getProductsByPage(requestedPage).then(function (products) {
						Products$2.replaceItems(products);
					});

					instance.setCurrent(requestedPage);
				};

				for (var i = 0; i < this.pages.length; i++) {
					this.pages[i].childNodes[0].onclick = function (event) {
						event.preventDefault();

						var requestedPage = this.getAttribute('data-page-nr');

						Products$2.getProductsByPage(requestedPage).then(function (products) {
							Products$2.replaceItems(products);
						});

						instance.setCurrent(requestedPage);
					};
				}
			}

			/**
    * Sets the current page.
    */

		}, {
			key: 'setCurrent',
			value: function setCurrent(pageNumber) {
				this.current = parseInt(pageNumber);
				this.changeUrl(pageNumber);
				this.setActiveLink(pageNumber);
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
					pageItem.className = this.current == i ? 'page-item active' : 'page-item';
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
		}, {
			key: 'setActiveLink',
			value: function setActiveLink(pageNumber) {
				for (var page in this.pages) {
					if (this.pages[page].childNodes[0].getAttribute('data-page-nr') == pageNumber) {
						DOM.addClass(this.pages[page], 'active');
					} else {
						DOM.removeClass(this.pages[page], 'active');
					}
				}
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
  * @file 
  * Cookie class.
  *
  * Adds some useful functionality for
  * setting or getting cookies.
  */

	var Cookie = function () {
		function Cookie() {
			_classCallCheck(this, Cookie);
		}

		_createClass(Cookie, null, [{
			key: 'set',

			/**
   	* Sets a cookie.
   	* 
   	* @param string | name
   	* @param JSON | value
   	* @param integer | days
   	* @return void
   */
			value: function set(name, value, days) {
				if (value.constructor.name == 'Object' || value.constructor.name == 'Array') {
					value = JSON.stringify(value);
				}

				days = days || 10;

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
    *
    * @param string | name
   	 * @return JSON
    */

		}, {
			key: 'get',
			value: function get(name) {
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

				return {};
			}
		}]);

		return Cookie;
	}();

	/**
  * The default settings of the cart.
  */


	var defaultSettings$5 = {
		element: '.cart',
		cookie_name: 'cart',
		preview_class: '',
		loader: '/images/icons/spinner.svg',
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
	var Container$5 = void 0;

	/**
  * Stores the request object.
  */
	var Http$1 = void 0;

	/**
  * Stores the cart loader.
  */
	var _loadingOverlay = void 0;

	/**
  * The Cart Object, handles the cart icon and sessions.
  */

	var Cart = function () {
		/**
   * Initialize the default settings, setting the element,
   * and creating the preview for the carts details.
   */
		function Cart(container, http) {
			_classCallCheck(this, Cart);

			Container$5 = container;
			Http$1 = http;

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

				this.settings = Common.extend(defaultSettings$5, settings);

				this.setElement(this.settings.element);

				DOM.addClass(this.previewElement, 'closed');
				DOM.addClass(this.previewElement, this.settings.preview_class);

				this.bindEventListeners();
				this.addStyleTag();

				if (this.isEmpty(Cookie.get(this.settings.cookie_name))) {
					this.cart = {};
					this.setCart(this.cart);
				}
			}

			/**
    * Checks if the cart is empty
    */

		}, {
			key: 'isEmpty',
			value: function isEmpty(cart) {
				return Common.emptyObject(cart);
			}

			/**
    * Sets the cart as a cookie.
    */

		}, {
			key: 'setCart',
			value: function setCart(cart) {
				this.cart.id = Str.random(10);
				this.cart.items = [];
				this.cart.favorites = [];
				Cookie.set(this.settings.cookie_name, cart, 2);
			}

			/**
    * Adds an item to the cart.
    */

		}, {
			key: 'addItem',
			value: function addItem(item) {
				this.cart = Cookie.get(this.settings.cookie_name);

				this.cart.items.push(item);

				Cookie.set(this.settings.cookie_name, this.cart, 2);
			}

			/**
    * Removes an item from the cart.
    */

		}, {
			key: 'removeItem',
			value: function removeItem(item) {
				this.cart = Cookie.get(this.settings.cookie_name);

				this.cart.items.splice(this.cart.items.indexOf(item), 1);

				Cookie.set(this.settings.cookie_name, this.cart, 2);
			}

			/**
    * Adds the item to preview.
    */

		}, {
			key: 'addToPreview',
			value: function addToPreview(items) {
				var itemsDiv = DOM.find('.items', this.previewElement);

				itemsDiv.innerHTML = '';
				for (var i = 0; i < items.length; i++) {

					var li = DOM.createElement('li', {
						class: 'item'
					});

					var attributes = items[i];

					for (var attribute in attributes) {
						var span = DOM.createElement('span', {
							text: attributes[attribute]
						});

						li.appendChild(span);
					}

					itemsDiv.appendChild(li);
				}
			}

			/**
    * Binds everthing to the element.
    */

		}, {
			key: 'setElement',
			value: function setElement(selector) {
				this.icon = DOM.find(selector);

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

				var ul = DOM.createElement('ul', {
					class: 'items'
				});

				previewElement.appendChild(ul);

				return previewElement;
			}

			/**
    * Add the eCommerce style tags to the DOM.
    */

		}, {
			key: 'addStyleTag',
			value: function addStyleTag() {
				if (DOM.find('#eCommerce-Cart')) {
					return;
				}

				var position = this.settings.fixed ? 'fixed' : 'absolute';

				var css = '\n\t\t\t' + this.settings.element + ' {\n\t\t\t\tposition: ' + position + ';\n\t\t\t\tcursor: pointer;\n\t\t\t\tcolor: #ffffff;\n\t\t\t\tz-index: 998;\n\t\t\t}\n\n\t\t\t' + this.settings.element + ' > svg {\n\t\t\t\twidth: ' + this.settings.width + ';\n\t\t\t\theight: ' + this.settings.height + ';\n\t\t\t\ttransition: fill 0.3s;\n\t\t\t}\n\n\t\t\t' + this.settings.element + ' > svg:hover {\n\t\t\t\tfill: ' + this.settings.hover_color + ';\n\t\t\t\ttransition: fill 0.3s;\n\t\t\t}\n\n\t\t\t' + this.settings.element + '.top-right,\n\t\t\t' + this.settings.element + '.right-top {\n\t\t\t\tright: 10px;\n\t\t\t\ttop: 10px;\n\t\t\t}\n\n\t\t\t' + this.settings.element + '.left-top,\n\t\t\t' + this.settings.element + '.top-left {\n\t\t\t\tleft: 10px;\n\t\t\t\ttop: 10px;\n\t\t\t}\n\n\t\t\t' + this.settings.element + ' > #preview {\n\t\t\t\tposition: ' + position + ';\n\t\t\t\tz-index: 9999;\n\t\t\t\ttop: calc(10px + ' + this.settings.height + ');\n\t\t\t\ttransform: translateX(60px);\n\t\t\t\theight: 400px;\n\t\t\t\twidth: 300px;\n\t\t\t\tborder: 1px solid #e4e4e4;\n\t\t\t\tbackground: #ffffff;\n\t\t\t\ttransition: transform 1s, visibility 1s;\n\t\t\t\tcursor: default;\n\t\t\t\toverflow-Y: scroll;\n\t\t\t}\n\n\t\t\t' + this.settings.element + ' > #preview.opened {\n\t\t\t\tvisibility: visible;\n\t\t\t\ttransform: translateX(-240px);\n\t\t\t}\n\n\t\t\t' + this.settings.element + ' > #preview.closed {\n\t\t\t\tvisibility: hidden;\n\t\t\t\ttransform: translateX(60px);\n\t\t\t}\n\n\t\t\t' + this.settings.element + ' > #preview > ul.items,\n\t\t\t' + this.settings.element + ' > #preview > ul.items > li.item {\n\t\t\t\tcolor: #000000;\n\t\t\t\tlist-style-type: none;\n\t\t\t}\n\n\t\t\t.cart-loader-overlay {\n\t\t\t\tposition: absolute;\n\t\t\t\ttop: 0;\n\t\t\t\tleft: 0;\n\t\t\t\tbackground: #ffffff;\n\t\t\t\twidth: 100%;\n\t\t\t\theight: 100%;\n\t\t\t}\n\n\t\t\t.cart-loader-overlay .cart-loader {\n\t\t\t\tposition: absolute;\n\t\t\t\twidth: 50px;\n\t\t\t\theight: 50px;\n\t\t\t\tmargin-left: -25px;\n\t\t\t\tmargin-top: -25px;\n\t\t\t\tleft: 50%;\n\t\t\t\tright: 50%;\n\t\t\t\ttop: 50%;\n\t\t\t\tbottom: 50%;\n\t\t\t}\n\t\t';

				DOM.addStyle('eCommerce-Cart', css);
			}

			/**
    * Creates an loading overlay.
    */

		}, {
			key: 'loadingOverlay',
			value: function loadingOverlay() {
				if (_loadingOverlay) {
					return _loadingOverlay;
				}

				var loader = DOM.createElement('img', {
					src: this.settings.loader,
					class: 'cart-loader'
				});

				_loadingOverlay = DOM.createElement('div', {
					class: 'cart-loader-overlay'
				});

				_loadingOverlay.appendChild(loader);

				return _loadingOverlay;
			}

			/**
    * Loading the cart preview.
    */

		}, {
			key: 'previewStartLoading',
			value: function previewStartLoading() {
				this.previewElement.appendChild(this.loadingOverlay());
			}

			/**
    * Loading the cart preview.
    */

		}, {
			key: 'previewStopLoading',
			value: function previewStopLoading() {
				if (DOM.find('.cart-loader-overlay', this.previewElement)) {
					this.previewElement.removeChild(this.loadingOverlay());
				}
			}

			/**
    * Reloads the items in the cart preview.
    */

		}, {
			key: 'reloadCartPreview',
			value: function reloadCartPreview() {
				this.previewStartLoading();
				var items = this.getCartItems();
				this.addToPreview(items);

				var instance = this;

				setTimeout(function () {
					instance.previewStopLoading.call(instance);
				}, 2000);
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

				this.svgIcon.onclick = function (e) {
					e.preventDefault();
					var opening = DOM.toggleClass(this.previewElement, 'opened', 'closed');

					if (opening) {
						this.reloadCartPreview();
					}
				}.bind(this);

				Event.listen('ProductWasAdded', function (attributes) {
					var cart = Cookie.get(this.settings.cookie_name);
					cart.items.push(attributes);
					Cookie.set(this.settings.cookie_name, cart);
					this.reloadCartPreview();
				}.bind(this));
			}

			/**
    * Retrieve the carts items from the cookie.
    */

		}, {
			key: 'getCartItems',
			value: function getCartItems() {
				var cart = Cookie.get(this.settings.cookie_name);

				return cart ? cart.items : [];
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
		element: 'body',
		importBootstrap: false,
		components: ['Products', 'Services', 'Filter', 'Pagination', 'Cart']
	};

	var eCommerce = function eCommerce(settings) {
		_classCallCheck(this, eCommerce);

		ExceptionHandler.initalize();

		if ((typeof settings === 'undefined' ? 'undefined' : _typeof(settings)) != 'object') {
			throw new InvalidArgumentException$1();
		}

		this.container = new Container();
		this.settings = Common.extend(defaultSettings, settings);
		this.settings.element = DOM.find(this.settings.element);

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

		var request = this.container.make(new Request());

		this.container.bind('Filter', function (container) {
			container['Filter'].booted = true;
			return new Filter(container);
		});

		this.container.bind('Services', function (container) {
			container['Services'].booted = true;
			return new Services(container);
		});

		this.container.bind('Products', function (container) {
			container['Products'].booted = true;
			return new Products(container, request);
		});

		this.container.bind('Pagination', function (container) {
			container['Pagination'].booted = true;
			return new Pagination(container, container.make('Products'));
		});

		this.container.bind('Cart', function (container) {
			container['Cart'].booted = true;
			return new Cart(container, request);
		});

		this.container['Filter']['booted'] = false;
		this.container['Services']['booted'] = false;
		this.container['Products']['booted'] = false;
		this.container['Pagination']['booted'] = false;
		this.container['Cart']['booted'] = false;
	}

	return eCommerce;
}();
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVDb21tZXJjZS5qcyJdLCJuYW1lcyI6WyJlQ29tbWVyY2UiLCJJbnZhbGlkQXJndW1lbnRFeGNlcHRpb24kMSIsImNvbnNvbGUiLCJlcnJvciIsIkVycm9yIiwiRE9NIiwic3RyaW5nIiwicmVwbGFjZSIsImVsZW1lbnQiLCJjbGFzc05hbWUiLCJuZXdDbGFzc05hbWUiLCJyZW1vdmVDbGFzcyIsImFkZENsYXNzIiwidW5kZWZpbmVkIiwiY2xhc3NOYW1lcyIsInNwbGl0IiwiZm9yRWFjaCIsIm5hbWUiLCJjbGFzc0xpc3QiLCJhZGQiLCJyZW1vdmUiLCJpZCIsImNzcyIsImhlYWQiLCJkb2N1bWVudCIsImdldEVsZW1lbnRzQnlUYWdOYW1lIiwic3R5bGVUYWciLCJjcmVhdGVFbGVtZW50IiwiQ1NTIiwibWluaWZ5Q3NzIiwiaW5uZXJIVE1MIiwic2V0QXR0cmlidXRlIiwiYXBwZW5kQ2hpbGQiLCJlbGVtZW50VHlwZSIsIm9wdGlvbnMiLCJvcHRpb24iLCJzZWNvbmRDbGFzc05hbWUiLCJ0b2dnbGUiLCJzZWxlY3RvciIsImNvbnRleHQiLCJ3aW5kb3ciLCJxdWVyeUVsZW1lbnQiLCJwYXJlbnRFbGVtZW50IiwicXVlcnlTZWxlY3RvckFsbCIsImxlbmd0aCIsImhhc0NoaWxkIiwiY2hpbGRFbGVtZW50Iiwibm9kZSIsInBhcmVudE5vZGUiLCJldmVudHMiLCJFdmVudCIsImNhbGxiYWNrIiwiSW52YWxpZEFyZ3VtZW50RXhjZXB0aW9uIiwicHVzaCIsImRhdGEiLCJCYWRFdmVudENhbGxFeGNlcHRpb24iLCJDb21tb24iLCJjdXJyZW50T2JqZWN0IiwibmV3T2JqZWN0IiwiZXh0ZW5kZWQiLCJwcm9wIiwiT2JqZWN0IiwicHJvdG90eXBlIiwiaGFzT3duUHJvcGVydHkiLCJjYWxsIiwibmVlZGxlIiwiaHlzdGFjayIsImNvbnN0cnVjdG9yIiwiQXJyYXkiLCJpIiwib2JqZWN0IiwiZGVmYXVsdFNldHRpbmdzJDEiLCJoZWFkZXJzIiwiYXN5bmMiLCJSZXF1ZXN0Iiwic2V0dGluZ3MiLCJ4aHIiLCJYTUxIdHRwUmVxdWVzdCIsIkFjdGl2ZVhPYmplY3QiLCJleHRlbmQiLCJzZXREZWZhdWx0UmVxdWVzdEhlYWRlciIsImhlYWRlciIsIm9wZW4iLCJzZXRSZXF1ZXN0SGVhZGVyIiwicmVzcG9uc2UiLCJhcHBseSIsImFyZ3VtZW50cyIsInVybCIsImJlZm9yZSIsIm9ucmVhZHlzdGF0ZWNoYW5nZSIsInJlYWR5U3RhdGUiLCJzdGF0dXMiLCJzdWNjZXNzIiwiSlNPTiIsInBhcnNlIiwiYWZ0ZXIiLCJvbmVycm9yIiwibWVzc2FnZSIsImEiLCJiIiwic2VuZCIsInF1ZXJ5U3RyaW5nIiwia2V5cyIsIm1hcCIsImtleSIsImVuY29kZVVSSUNvbXBvbmVudCIsImpvaW4iLCJJbnZhbGlkQmluZGluZ0V4Y2VwdGlvbiIsImluc3RhbmNlcyIsIkNvbnRhaW5lciIsImNvbmNyZXRlIiwiYmluZCIsImluc3RhbmNlIiwiaW5zdGFuY2VFeGlzdCIsImdldEluc3RhbmNlIiwic2V0SW5zdGFuY2UiLCJDb21wb25lbnRzRXhjZXB0aW9uIiwiQmFkRXZlbnRDYWxsRXhjZXB0aW9uJDEiLCJOb3RJblBhZ2VSYW5nZUV4Y2VwdGlvbiIsIkNvbXBvbmVudE5vdFJlZ2lzdGVyZWRFeGNlcHRpb24iLCJFeGNlcHRpb25IYW5kbGVyIiwic291cmNlIiwibGluZW5vIiwiY29sbm8iLCJkZWZhdWx0U2V0dGluZ3MkMiIsImNsYXNzIiwid2lkdGgiLCJoZWlnaHQiLCJDb250YWluZXIkMiIsIkZpbHRlciIsImNvbnRhaW5lciIsInNldEVsZW1lbnQiLCJ3cmFwcGVyIiwiZmluZCIsIlN0ciIsInRvTG93ZXJDYXNlIiwicG9zc2libGUiLCJjaGFyQXQiLCJNYXRoIiwiZmxvb3IiLCJyYW5kb20iLCJkZWZhdWx0U2V0dGluZ3MkMyIsIml0ZW1fY2xhc3MiLCJhZGRfYnV0dG9uX2NsYXNzIiwiZmF2b3JpdGVfYnV0dG9uX2NsYXNzIiwiYXR0cmlidXRlcyIsIkNvbnRhaW5lciQzIiwiSHR0cCIsIlByb2R1Y3RzIiwiaHR0cCIsImFkZEV2ZW50TGlzdGVuZXIiLCJhZGRTdHlsZVRhZyIsIlBhZ2luYXRpb24iLCJib290ZWQiLCJnZXRQcm9kdWN0c0J5UGFnZSIsInRoZW4iLCJwcm9kdWN0cyIsInJlcGxhY2VJdGVtcyIsImxvYWRBbGxQcm9kdWN0cyIsInJlcXVlc3QiLCJnZXRQcm9kdWN0cyIsIml0ZW1zIiwidHJpZ2dlciIsImNhdGNoIiwiaXNBcnJheSIsImJ1aWxkUHJvZHVjdHMiLCJwcm9kdWN0IiwiYXNrU2VydmVyIiwicGFnZU51bWJlciIsIlByb21pc2UiLCJyZXNvbHZlIiwicmVqZWN0IiwiYWN0aW9uIiwiZ2V0IiwibG9nIiwiY3VycmVudEl0ZW1zIiwicmVzcG9uc2VUZXh0IiwiQWZ0ZXJMb2FkZWQiLCJzdGF0dXNUZXh0IiwiYXR0cmlidXRlc0NvbGxlY3Rpb24iLCJ0YWdUeXBlIiwiYnVpbHRQcm9kdWN0cyIsImJ1aWx0UHJvZHVjdCIsImJ1aWxkUHJvZHVjdCIsIm92ZXJsYXkiLCJhdHRyaWJ1dGUiLCJpbl9hcnJheSIsInRhZyIsImltYWdlIiwic3JjIiwia2ViYWJDYXNlIiwiYWRkVG9DYXJ0IiwidHlwZSIsInRleHQiLCJmYXZvcml0ZSIsImV2ZW50IiwicHJldmVudERlZmF1bHQiLCJhZGRTdHlsZSIsIlNlcnZpY2VzIiwiZGVmYXVsdFNldHRpbmdzJDQiLCJwZXJfcGFnZSIsInRvdGFsX2l0ZW1zIiwiQ29udGFpbmVyJDQiLCJQcm9kdWN0cyQyIiwic2V0Q3VycmVudCIsInRvdGFsUGFnZXMiLCJjYWxjdWxhdGVUb3RhbFBhZ2VzIiwicmVwbGFjZUxpbmtzIiwibGlua3MiLCJjcmVhdGVMaW5rcyIsImJpbmRFdmVudExpc3RlbmVycyIsInBlclBhZ2UiLCJ0b3RhbEl0ZW1zIiwicGFyc2VJbnQiLCJjZWlsIiwibmV4dCIsImNoaWxkTm9kZXMiLCJvbmNsaWNrIiwicmVxdWVzdGVkUGFnZSIsImN1cnJlbnQiLCJub3RJblBhZ2VSYW5nZSIsInByZXZpb3VzIiwicGFnZXMiLCJnZXRBdHRyaWJ1dGUiLCJjaGFuZ2VVcmwiLCJzZXRBY3RpdmVMaW5rIiwidWwiLCJjcmVhdGVQYWdlTGlua3MiLCJjcmVhdGVQcmV2aW91c0J1dHRvbiIsImNyZWF0ZU5leHRCdXR0b24iLCJwYWdlIiwicGFnZUl0ZW0iLCJsaW5rIiwibGkiLCJzcGFuMSIsInNwYW4yIiwiaXNOYU4iLCJHRVRfVmFycyIsImhpc3RvcnkiLCJyZXBsYWNlU3RhdGUiLCJ1cGRhdGVVUkxQYXJhbWV0ZXIiLCJsb2NhdGlvbiIsImhyZWYiLCJ2YXJzIiwicGFydHMiLCJtIiwidmFsdWUiLCJwYXJhbSIsInBhcmFtVmFsIiwibmV3QWRkaXRpb25hbFVSTCIsInRlbXBBcnJheSIsImJhc2VVUkwiLCJhZGRpdGlvbmFsVVJMIiwidGVtcCIsInJvd3NUZXh0IiwiQ29va2llIiwiZGF5cyIsInN0cmluZ2lmeSIsImV4cGlyZXMiLCJkYXRlIiwiRGF0ZSIsInNldFRpbWUiLCJnZXRUaW1lIiwidG9HTVRTdHJpbmciLCJjb29raWUiLCJjX3N0YXJ0IiwiaW5kZXhPZiIsImNfZW5kIiwidW5lc2NhcGUiLCJzdWJzdHJpbmciLCJkZWZhdWx0U2V0dGluZ3MkNSIsImNvb2tpZV9uYW1lIiwicHJldmlld19jbGFzcyIsImxvYWRlciIsInBsYWNlbWVudCIsImZpeGVkIiwiaG92ZXJfY29sb3IiLCJDb250YWluZXIkNSIsIkh0dHAkMSIsImxvYWRpbmdPdmVybGF5IiwiQ2FydCIsInByZXZpZXdFbGVtZW50IiwiY3JlYXRlUHJldmlld0VsZW1lbnQiLCJzdmdJY29uIiwiY3JlYXRlSWNvbiIsImlzRW1wdHkiLCJjYXJ0Iiwic2V0Q2FydCIsImVtcHR5T2JqZWN0IiwiZmF2b3JpdGVzIiwic2V0IiwiaXRlbSIsInNwbGljZSIsIml0ZW1zRGl2Iiwic3BhbiIsImljb24iLCJwb3NpdGlvbiIsInJlbW92ZUNoaWxkIiwicHJldmlld1N0YXJ0TG9hZGluZyIsImdldENhcnRJdGVtcyIsImFkZFRvUHJldmlldyIsInNldFRpbWVvdXQiLCJwcmV2aWV3U3RvcExvYWRpbmciLCJlIiwib3BlbmluZyIsInRvZ2dsZUNsYXNzIiwicmVsb2FkQ2FydFByZXZpZXciLCJsaXN0ZW4iLCJjbG9zZSIsInN3aXRjaENsYXNzZXMiLCJzdmciLCJjcmVhdGVFbGVtZW50TlMiLCJnIiwicGF0aCIsImluaXRhbGl6ZWQiLCJkZWZhdWx0U2V0dGluZ3MiLCJpbXBvcnRCb290c3RyYXAiLCJjb21wb25lbnRzIiwiaW5pdGFsaXplIiwiYmluZENvbXBvbmVudHNEZXBlbmRlbmNpZXMiLCJQcm94eSIsInRhcmdldCIsIm1ha2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUEsSUFBSUEsWUFBYSxZQUFZO0FBQzdCOztBQUQ2QixLQUd2QkMsMEJBSHVCO0FBQUE7O0FBSzVCLHdDQUNBO0FBQUE7O0FBQUE7O0FBRUlDLFdBQVFDLEtBQVI7QUFGSjtBQUdJOztBQVR3QjtBQUFBLEdBR1lDLEtBSFo7O0FBWTdCOzs7Ozs7OztBQVo2QixLQW9CdkJDLEdBcEJ1QjtBQUFBO0FBQUE7QUFBQTs7QUFBQTtBQUFBOztBQXNCNUI7Ozs7OztBQXRCNEIsNkJBNEJYQyxNQTVCVyxFQTZCNUI7QUFDSUEsYUFBU0EsT0FBT0MsT0FBUCxDQUFlLHdDQUFmLEVBQXlELEVBQXpELENBQVQ7QUFDQUQsYUFBU0EsT0FBT0MsT0FBUCxDQUFlLFFBQWYsRUFBeUIsR0FBekIsQ0FBVDtBQUNBRCxhQUFTQSxPQUFPQyxPQUFQLENBQWUsVUFBZixFQUEyQixJQUEzQixDQUFUO0FBQ0FELGFBQVNBLE9BQU9DLE9BQVAsQ0FBZSxVQUFmLEVBQTJCLElBQTNCLENBQVQ7QUFDQUQsYUFBU0EsT0FBT0MsT0FBUCxDQUFlLEtBQWYsRUFBc0IsR0FBdEIsQ0FBVDs7QUFFQSxXQUFPRCxNQUFQO0FBQ0g7O0FBRUQ7Ozs7Ozs7OztBQXZDNEI7QUFBQTtBQUFBLGlDQStDUEUsT0EvQ08sRUErQ0VDLFNBL0NGLEVBK0NhQyxZQS9DYixFQWdENUI7QUFDQyxTQUFLQyxXQUFMLENBQWlCSCxP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Q0EsT0FBS0EsU0FBTCxDQUFlLE1BQWYsRUFBdUIsUUFBdkIsSUFBbUMsS0FBbkM7QUFDQTs7QUFFRCxRQUFPbEksU0FBUDtBQUVDLENBdi9EZ0IsRUFBakIiLCJmaWxlIjoiZUNvbW1lcmNlLmpzIiwic291cmNlc0NvbnRlbnQiOlsidmFyIGVDb21tZXJjZSA9IChmdW5jdGlvbiAoKSB7XG4ndXNlIHN0cmljdCc7XG5cbmNsYXNzIEludmFsaWRBcmd1bWVudEV4Y2VwdGlvbiQxIGV4dGVuZHMgRXJyb3Jcclxue1xyXG5cdGNvbnN0cnVjdG9yKCkgXHJcblx0eyBcclxuICAgIFx0c3VwZXIoKTtcclxuICAgIFx0Y29uc29sZS5lcnJvcihgSW52YWxpZEFyZ3VtZW50RXhjZXB0aW9uLCBhbiBpbnZhbGlkIGFyZ3VtZW50IHdhcyBwYXNzZWQuYCk7XHJcbiAgICB9XHJcbn1cblxuLyoqXHJcbiAqIEBmaWxlIFxyXG4gKiBET00gY2xhc3MuXHJcbiAqXHJcbiAqIEFkZHMgc29tZSB1c2VmdWwgZnVuY3Rpb25hbGl0eSBmb3JcclxuICogZmV0Y2hpbmcgb3IgbWFuaXB1bGF0aW5nIERPTSBlbGVtZW50cy5cclxuICovXHJcblxyXG5jbGFzcyBET01cclxue1xyXG5cdC8qKlxyXG5cdCAqIE1pbmlmaWVzIHRoZSBjc3MgdGV4dC5cclxuXHQgKiBcclxuXHQgKiBAcGFyYW0gc3RyaW5nIHwgc3RyaW5nXHJcblx0ICogQHJldHVybiBzdHJpbmdcclxuXHQgKi9cclxuXHRzdGF0aWMgbWluaWZ5Q3NzKHN0cmluZykgXHJcblx0e1xyXG5cdCAgICBzdHJpbmcgPSBzdHJpbmcucmVwbGFjZSgvXFwvXFwqKD86KD8hXFwqXFwvKVtcXHNcXFNdKSpcXCpcXC98W1xcclxcblxcdF0rL2csICcnKTtcclxuXHQgICAgc3RyaW5nID0gc3RyaW5nLnJlcGxhY2UoLyB7Mix9L2csICcgJyk7XHJcblx0ICAgIHN0cmluZyA9IHN0cmluZy5yZXBsYWNlKC8oW3s6fV0pL2csICckMScpO1xyXG5cdCAgICBzdHJpbmcgPSBzdHJpbmcucmVwbGFjZSgvKFs7LF0pIC9nLCAnJDEnKTtcclxuXHQgICAgc3RyaW5nID0gc3RyaW5nLnJlcGxhY2UoLyAhL2csICchJyk7XHJcblx0ICAgIFxyXG5cdCAgICByZXR1cm4gc3RyaW5nO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogU3dpdGNoZXMgYmV0d2VlbiB0d28gZ2l2ZW4gY2xhc3Nlcy5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSBvYmplY3QgfCBlbGVtZW50XHJcblx0ICogQHBhcmFtIHN0cmluZyB8IGNsYXNzTmFtZVxyXG5cdCAqIEBwYXJhbSBzdHJpbmcgfCBuZXdDbGFzc05hbWVcclxuXHQgKiBAcmV0dXJuIG9iamVjdFxyXG5cdCAqL1xyXG5cdHN0YXRpYyBzd2l0Y2hDbGFzc2VzKGVsZW1lbnQsIGNsYXNzTmFtZSwgbmV3Q2xhc3NOYW1lKSBcclxuXHR7XHJcblx0XHR0aGlzLnJlbW92ZUNsYXNzKGVsZW1lbnQsIGNsYXNzTmFtZSk7XHJcblx0XHR0aGlzLmFkZENsYXNzKGVsZW1lbnQsIG5ld0NsYXNzTmFtZSk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBBZGRzIGNsYXNzIHRvIGEgZ2l2ZW4gZWxlbWVudC5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSBvYmplY3QgfCBlbGVtZW50XHJcblx0ICogQHBhcmFtIHN0cmluZyB8IGNsYXNzTmFtZVxyXG5cdCAqIEByZXR1cm4gb2JqZWN0XHJcblx0ICovXHJcblx0c3RhdGljIGFkZENsYXNzKGVsZW1lbnQsIGNsYXNzTmFtZSkgXHJcblx0e1xyXG5cdFx0aWYoZWxlbWVudCA9PT0gbnVsbCkge1xyXG5cdFx0XHR0aHJvdyBuZXcgSW52YWxpZEFyZ3VtZW50RXhjZXB0aW9uJDE7XHJcblx0XHR9XHJcblxyXG5cdFx0aWYoISBjbGFzc05hbWUgfHwgY2xhc3NOYW1lID09ICcnIHx8IHR5cGVvZiBjbGFzc05hbWUgPT09IHVuZGVmaW5lZCkge1xyXG5cdFx0XHRyZXR1cm4gZWxlbWVudDtcclxuXHRcdH1cclxuXHJcblx0XHRsZXQgY2xhc3NOYW1lcyA9IGNsYXNzTmFtZS5zcGxpdCgnICcpO1xyXG5cclxuXHRcdGNsYXNzTmFtZXMuZm9yRWFjaChmdW5jdGlvbihuYW1lKSB7XHJcblx0XHRcdGVsZW1lbnQuY2xhc3NMaXN0LmFkZChuYW1lKTtcclxuXHRcdH0pO1xyXG5cdFx0XHJcblx0XHRyZXR1cm4gZWxlbWVudDtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFJlbW92ZXMgY2xhc3MgZnJvbSBhIGdpdmVuIGVsZW1lbnQuXHJcblx0ICogXHJcblx0ICogQHBhcmFtIG9iamVjdCB8IGVsZW1lbnRcclxuXHQgKiBAcGFyYW0gc3RyaW5nIHwgY2xhc3NOYW1lXHJcblx0ICogQHJldHVybiBvYmplY3RcclxuXHQgKi9cclxuXHRzdGF0aWMgcmVtb3ZlQ2xhc3MoZWxlbWVudCwgY2xhc3NOYW1lKSBcclxuXHR7XHJcblx0XHRpZihlbGVtZW50ID09IG51bGwpIHtcclxuXHRcdFx0dGhyb3cgbmV3IEludmFsaWRBcmd1bWVudEV4Y2VwdGlvbiQxO1xyXG5cdFx0fVxyXG5cclxuXHRcdGlmKGNsYXNzTmFtZSA9PSAnJykge1xyXG5cdFx0XHRlbGVtZW50LmNsYXNzTmFtZSA9ICcnO1xyXG5cdFx0fSBlbHNlIHtcclxuXHJcblx0XHRcdGxldCBjbGFzc05hbWVzID0gY2xhc3NOYW1lLnNwbGl0KCcgJyk7XHJcblxyXG5cdFx0XHRjbGFzc05hbWVzLmZvckVhY2goZnVuY3Rpb24obmFtZSkge1xyXG5cdFx0XHRcdGVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShuYW1lKTtcclxuXHRcdFx0fSk7XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIGVsZW1lbnQ7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBBZGRzIHN0eWxlIHRhZyB3aXRoIGdpdmVuIGlkIGFuZCBjc3MgdG8gdGhlIERPTS5cclxuXHQgKiBcclxuXHQgKiBAcGFyYW0gc3RyaW5nIHwgaWRcclxuXHQgKiBAcGFyYW0gc3RyaW5nIHwgY3NzXHJcblx0ICogQHJldHVybiB2b2lkXHJcblx0ICovXHJcblx0c3RhdGljIGFkZFN0eWxlKGlkLCBjc3MpIFxyXG5cdHtcclxuXHRcdGlmICh0eXBlb2YgY3NzICE9ICdzdHJpbmcnKSB7XHJcblx0XHRcdHRocm93IG5ldyBJbnZhbGlkQXJndW1lbnRFeGNlcHRpb24kMTtcclxuXHRcdH1cclxuXHJcblx0XHRsZXQgaGVhZCA9IGRvY3VtZW50LmhlYWQgfHwgZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2hlYWQnKVswXTtcclxuXHRcdGxldCBzdHlsZVRhZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3N0eWxlJyk7XHJcblxyXG5cdFx0Ly8gcGlwZSBpdCB0aHJvdWdoIHRoZSBtaW5maWVyXHJcblx0ICAgIGxldCBDU1MgPSB0aGlzLm1pbmlmeUNzcyhjc3MpO1xyXG5cdCAgICAvLyBhZGRpbmcgaXQgdG8gdGhlIHN0eWxldGFnXHJcblx0ICAgIHN0eWxlVGFnLmlubmVySFRNTCA9IENTUztcclxuXHQgICAgLy8gZ2l2ZSBhbiBpZCB0byByZWNvZ25pemUgdGhlIHN0eWxlIHRhZ1xyXG5cdFx0c3R5bGVUYWcuc2V0QXR0cmlidXRlKCdpZCcsIGlkKTtcclxuXHRcdC8vIGFwcGVuZGluZyB0aGF0IHN0eWxlIHRhZyB0byB0aGUgRE9NIGhlYWQgdGFnXHJcblx0XHRoZWFkLmFwcGVuZENoaWxkKHN0eWxlVGFnKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIENyZWF0ZXMgYW4gZWxlbWVudCB3aXRoIHRoZSBnaXZlbiBvcHRpb25zLlxyXG5cdCAqIFxyXG5cdCAqIEBwYXJhbSBzdHJpbmcgfCBlbGVtZW50VHlwZVxyXG5cdCAqIEBwYXJhbSBvYmplY3QgfCBvcHRpb25zXHJcblx0ICogQHJldHVybiBIVE1MRWxlbWVudFxyXG5cdCAqL1xyXG5cdHN0YXRpYyBjcmVhdGVFbGVtZW50KGVsZW1lbnRUeXBlLCBvcHRpb25zKVxyXG5cdHtcclxuXHRcdGxldCBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChlbGVtZW50VHlwZSk7XHJcblx0XHJcblx0XHRpZiAob3B0aW9ucyA9PT0gdW5kZWZpbmVkKSB7XHJcblx0XHRcdHJldHVybiBlbGVtZW50O1xyXG5cdFx0fVxyXG5cclxuXHRcdGZvciAobGV0IG9wdGlvbiBpbiBvcHRpb25zKSB7XHJcblx0XHRcdGlmKG9wdGlvbiA9PSAndGV4dCcpIHtcclxuXHRcdFx0XHRlbGVtZW50LmlubmVySFRNTCA9IG9wdGlvbnNbb3B0aW9uXTtcclxuXHRcdFx0XHRjb250aW51ZTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0ZWxlbWVudC5zZXRBdHRyaWJ1dGUob3B0aW9uLCBvcHRpb25zW29wdGlvbl0pO1xyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiBlbGVtZW50O1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogVG9nZ2xlcyB0aGUgZ2l2ZW4gY2xhc3Nlcy5cclxuXHQgKiBcclxuXHQgKiBAcGFyYW0gb2JqZWN0IHwgZWxlbWVudFxyXG5cdCAqIEBwYXJhbSBzdHJpbmcgfCBjbGFzc05hbWVcclxuXHQgKiBAcmV0dXJuIGJvb2xcclxuXHQgKi9cclxuXHRzdGF0aWMgdG9nZ2xlQ2xhc3MoZWxlbWVudCwgY2xhc3NOYW1lLCBzZWNvbmRDbGFzc05hbWUpXHJcblx0e1xyXG5cdFx0aWYgKGVsZW1lbnQgPT0gbnVsbCB8fCB0eXBlb2YgZWxlbWVudCA9PSAndW5kZWZpbmVkJykge1xyXG5cdFx0XHR0aHJvdyBuZXcgSW52YWxpZEFyZ3VtZW50RXhjZXB0aW9uJDE7XHJcblx0XHR9XHJcblxyXG5cdFx0c2Vjb25kQ2xhc3NOYW1lID0gc2Vjb25kQ2xhc3NOYW1lIHx8IHVuZGVmaW5lZDtcclxuXHJcblx0XHRpZihzZWNvbmRDbGFzc05hbWUpIHtcclxuXHRcdFx0ZWxlbWVudC5jbGFzc0xpc3QudG9nZ2xlKHNlY29uZENsYXNzTmFtZSk7XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIGVsZW1lbnQuY2xhc3NMaXN0LnRvZ2dsZShjbGFzc05hbWUpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogRmluZHMgYW4gZWxlbWVudCBpbnNpZGUgb2YgcGFyZW50LlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIHN0cmluZyB8IHNlbGVjdG9yXHJcblx0ICogQHBhcmFtIG9iamVjdCB8IGNvbnRleHRcclxuXHQgKiBAcmV0dXJuIG1peGVkXHJcblx0ICovXHJcblx0c3RhdGljIGZpbmQoc2VsZWN0b3IsIGNvbnRleHQgPSB3aW5kb3cuZG9jdW1lbnQpIFxyXG5cdHtcclxuXHRcdHJldHVybiBxdWVyeUVsZW1lbnQoc2VsZWN0b3IsIGNvbnRleHQpO1xyXG5cdH1cclxufVxyXG5cclxuLyoqXHJcbiAqIFF1ZXJpZXMgYW4gZWxlbWVudCBmcm9tIHRoZSBET00uXHJcbiAqXHJcbiAqIEBwYXJhbSBzdHJpbmcgfCBzZWxlY3RvclxyXG4gKiBAcGFyYW0gb2JqZWN0IHwgcGFyZW50RWxlbWVudFxyXG4gKiBAcmV0dXJuIG1peGVkXHJcbiAqL1xyXG5mdW5jdGlvbiBxdWVyeUVsZW1lbnQoc2VsZWN0b3IsIHBhcmVudEVsZW1lbnQpIFxyXG57XHJcblx0bGV0IGVsZW1lbnQgPSBwYXJlbnRFbGVtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3IpO1xyXG5cclxuXHRpZiAoZWxlbWVudC5sZW5ndGggPT0gMCkge1xyXG5cdFx0cmV0dXJuIG51bGw7XHJcblx0fVxyXG5cclxuXHRyZXR1cm4gKGVsZW1lbnQubGVuZ3RoID4gMSkgPyBlbGVtZW50IDogZWxlbWVudFswXTtcclxufVxyXG5cclxuLyoqXHJcbiAqIENoZWNrcyBpZiBwYXJlbnQgaGFzIGNoaWxkLlxyXG4gKlxyXG4gKiBAcGFyYW0gb2JqZWN0IHwgcGFyZW50RWxlbWVudFxyXG4gKiBAcGFyYW0gb2JqZWN0IHwgY2hpbGRFbGVtZW50XHJcbiAqIEByZXR1cm4gYm9vbFxyXG4gKi9cclxuZnVuY3Rpb24gaGFzQ2hpbGQocGFyZW50RWxlbWVudCwgY2hpbGRFbGVtZW50KSBcclxue1xyXG4gICAgIGxldCBub2RlID0gY2hpbGRFbGVtZW50LnBhcmVudE5vZGU7XHJcbiAgICAgXHJcbiAgICAgd2hpbGUgKG5vZGUgIT0gbnVsbCkge1xyXG4gICAgICAgICBpZiAobm9kZSA9PSBwYXJlbnRFbGVtZW50KSB7XHJcbiAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgfVxyXG4gICAgICAgICBub2RlID0gbm9kZS5wYXJlbnROb2RlO1xyXG4gICAgIH1cclxuICAgICBcclxuICAgICByZXR1cm4gZmFsc2U7XHJcbn1cblxubGV0IGV2ZW50cyA9IFtdO1xyXG5cclxuY2xhc3MgRXZlbnRcclxue1xyXG5cdC8qKlxyXG5cdCAqIExpc3RlbiB0byBhbiBldmVudC5cclxuXHQgKi9cclxuXHRzdGF0aWMgbGlzdGVuKG5hbWUsIGNhbGxiYWNrKSB7XHJcblx0XHRpZiAodHlwZW9mIGNhbGxiYWNrICE9PSAnZnVuY3Rpb24nKSB7XHJcblx0XHRcdHRocm93IG5ldyBJbnZhbGlkQXJndW1lbnRFeGNlcHRpb247XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKHR5cGVvZiBldmVudHNbbmFtZV0gPT0gJ3VuZGVmaW5lZCcpIHtcclxuXHRcdFx0ZXZlbnRzW25hbWVdID0gW107XHJcblx0XHR9XHJcblxyXG5cdFx0ZXZlbnRzW25hbWVdLnB1c2goY2FsbGJhY2spO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogRmlyZXMgYW4gZXZlbnQuXHJcblx0ICovXHJcblx0c3RhdGljIHRyaWdnZXIobmFtZSwgLi4uZGF0YSkge1xyXG5cdFx0ZGF0YSA9IGRhdGEgfHwgbnVsbDtcclxuXHJcblx0XHRldmVudHNbbmFtZV0uZm9yRWFjaChmdW5jdGlvbihjYWxsYmFjaykge1xyXG5cdFx0XHRpZih0eXBlb2YgY2FsbGJhY2sgIT09ICdmdW5jdGlvbicpIHtcclxuXHRcdFx0XHR0aHJvdyBuZXcgQmFkRXZlbnRDYWxsRXhjZXB0aW9uO1xyXG5cdFx0XHR9XHJcblx0XHRcdFxyXG5cdFx0XHRyZXR1cm4gY2FsbGJhY2soLi4uZGF0YSk7XHJcblx0XHR9KTtcclxuXHR9XHJcbn1cblxuLyoqXHJcbiAqIEBmaWxlIFxyXG4gKiBDb21tb24gY2xhc3MuXHJcbiAqXHJcbiAqIEFkZHMgc29tZSB1c2VmdWwgZnVuY3Rpb25hbGl0eSBmb3JcclxuICogY29tbW9uIHRhc2tzIC0gZGF0YSBjaGVja3Mgb3IgZGF0YSBtYW5pcHVsYXRpb24uXHJcbiAqL1xyXG5cclxuY2xhc3MgQ29tbW9uXHJcbntcclxuXHQvKipcclxuXHQgKiBFeHRlbmQgYW4gb2JqZWN0LlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIG9iamVjdCB8IGN1cnJlbnRPYmplY3RcclxuXHQgKiBAcGFyYW0gb2JqZWN0IHwgbmV3T2JqZWN0XHJcblx0ICogQHJldHVybiBvYmplY3RcclxuXHQgKi9cclxuXHRzdGF0aWMgZXh0ZW5kKGN1cnJlbnRPYmplY3QsIG5ld09iamVjdCkge1xyXG5cdFx0dmFyIGV4dGVuZGVkID0ge307XHJcblx0ICAgIHZhciBwcm9wO1xyXG5cclxuXHQgICAgZm9yIChwcm9wIGluIGN1cnJlbnRPYmplY3QpIHtcclxuXHQgICAgICAgIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoY3VycmVudE9iamVjdCwgcHJvcCkpIHtcclxuXHQgICAgICAgICAgICBleHRlbmRlZFtwcm9wXSA9IGN1cnJlbnRPYmplY3RbcHJvcF07XHJcblx0ICAgICAgICB9XHJcblx0ICAgIH1cclxuXHJcblx0ICAgIGZvciAocHJvcCBpbiBuZXdPYmplY3QpIHtcclxuXHQgICAgICAgIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwobmV3T2JqZWN0LCBwcm9wKSkge1xyXG5cdCAgICAgICAgICAgIGV4dGVuZGVkW3Byb3BdID0gbmV3T2JqZWN0W3Byb3BdO1xyXG5cdCAgICAgICAgfVxyXG5cdCAgICB9XHJcblxyXG5cdCAgICByZXR1cm4gZXh0ZW5kZWQ7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBDaGVja3MgZm9yIGEgbmVlZGxlIGluIGh5c3RhY2sgYXJyYXkuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gbWl4ZWQgfCBuZWVkbGVcclxuXHQgKiBAcGFyYW0gb2JqZWN0IHwgb2JqZWN0XHJcblx0ICogQHJldHVybiBib29sXHJcblx0ICpcclxuXHQgKi9cclxuXHRzdGF0aWMgaW5fYXJyYXkobmVlZGxlLCBoeXN0YWNrKSB7XHJcblx0XHRpZihoeXN0YWNrLmNvbnN0cnVjdG9yICE9PSBBcnJheSkge1xyXG5cdFx0XHR0aHJvdyBuZXcgSW52YWxpZEFyZ3VtZW50RXhjZXB0aW9uJDE7XHJcblx0XHR9XHJcblxyXG5cdFx0Zm9yKHZhciBpID0gMDsgaSA8PSBoeXN0YWNrLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdGlmKG5lZWRsZSA9PSBoeXN0YWNrW2ldKSB7XHJcblx0XHRcdFx0cmV0dXJuIHRydWU7XHRcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdFxyXG5cdFx0cmV0dXJuIGZhbHNlO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQ2hlY2tzIGlmIGFuIG9iamVjdCBpcyBlbXB0eS5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSBvYmplY3QgfCBvYmplY3RcclxuXHQgKiBAcmV0dXJuIGJvb2xcclxuXHQgKi9cclxuXHRzdGF0aWMgZW1wdHlPYmplY3Qob2JqZWN0KSB7XHJcblx0XHRmb3IgKGxldCBwcm9wIGluIG9iamVjdCkge1xyXG5cdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIHRydWU7XHJcblx0fVxyXG5cclxuXHJcblx0LyoqXHJcblx0ICogQ2hlY2tzIGlmIGEgZ2l2ZW4gb2JqZWN0IGNvbnRhaW5lZCBpbiBhbiBhcnJheS5cclxuXHQgKiBcclxuXHQgKiBAcGFyYW0gb2JqZWN0IHwgb2JqZWN0XHJcblx0ICogQHBhcmFtIGFycmF5IHwgaGF5c3RhY2tcclxuXHQgKiBAcmV0dXJuIGJvb2xcclxuXHQgKi9cclxuXHRzdGF0aWMgY29udGFpbnNPYmplY3Qob2JqZWN0LCBoeXN0YWNrKSBcclxuXHR7XHJcblx0ICAgIGxldCBpO1xyXG5cclxuXHQgICAgZm9yIChpID0gMDsgaSA8IGh5c3RhY2subGVuZ3RoOyBpKyspIHtcclxuXHQgICAgICAgIGlmICh0eXBlb2Ygb2JqZWN0ID09ICdzdHJpbmcnICYmIGh5c3RhY2tbaV0uY29uc3RydWN0b3IubmFtZSA9PT0gb2JqZWN0KSB7XHJcblx0ICAgICAgICBcdHJldHVybiB0cnVlO1xyXG5cdCAgICAgICAgfVxyXG5cclxuXHQgICAgICAgIGlmIChoeXN0YWNrW2ldID09PSBvYmplY3QpIHtcclxuXHQgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuXHQgICAgICAgIH1cclxuXHQgICAgfVxyXG5cclxuXHQgICAgcmV0dXJuIGZhbHNlO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQ2hlY2tzIGlmIGEgZ2l2ZW4gcGFyYW1ldGVyIGlzIGFuIG9iamVjdC5cclxuXHQgKiBcclxuXHQgKiBAcGFyYW0gb2JqZWN0IHwgb2JqZWN0XHJcblx0ICogQHJldHVybiBib29sXHJcblx0ICovXHJcblx0c3RhdGljIGlzT2JqZWN0KG9iamVjdCkgXHJcblx0e1xyXG5cdFx0cmV0dXJuIHR5cGVvZiBvYmplY3QgPT0gJ29iamVjdCc7XHJcblx0fVxyXG59XG5cbmxldCBkZWZhdWx0U2V0dGluZ3MkMSA9IHtcclxuXHRoZWFkZXJzOiB7XHJcblx0XHQnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nXHJcblx0fSxcclxuXHRhc3luYzogdHJ1ZVxyXG59O1xyXG5cclxuXHJcbmNsYXNzIFJlcXVlc3Rcclxue1xyXG5cdGNvbnN0cnVjdG9yKHNldHRpbmdzKVxyXG5cdHtcclxuXHRcdHRoaXMueGhyID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCkgfHwgbmV3IEFjdGl2ZVhPYmplY3QoXCJNaWNyb3NvZnQuWE1MSFRUUFwiKTtcclxuXHRcdHRoaXMuc2V0dGluZ3MgPSBDb21tb24uZXh0ZW5kKGRlZmF1bHRTZXR0aW5ncyQxLCBzZXR0aW5ncyk7XHJcblx0XHR0aGlzLnNldERlZmF1bHRSZXF1ZXN0SGVhZGVyKCk7XHJcblx0fVxyXG5cclxuXHRzZXREZWZhdWx0UmVxdWVzdEhlYWRlcigpXHJcblx0e1xyXG5cdFx0bGV0IGhlYWRlcjtcclxuXHRcdGxldCBoZWFkZXJzID0gdGhpcy5zZXR0aW5ncy5oZWFkZXJzO1xyXG5cdFx0bGV0IGFzeW5jID0gdGhpcy5zZXR0aW5ncy5hc3luYztcclxuXHRcdGxldCBvcGVuID0gWE1MSHR0cFJlcXVlc3QucHJvdG90eXBlLm9wZW47XHJcblx0XHRsZXQgc2V0UmVxdWVzdEhlYWRlciA9IFhNTEh0dHBSZXF1ZXN0LnByb3RvdHlwZS5zZXRSZXF1ZXN0SGVhZGVyO1xyXG5cclxuXHRcdFhNTEh0dHBSZXF1ZXN0LnByb3RvdHlwZS5vcGVuID0gZnVuY3Rpb24oKSB7XHJcblx0XHRcdHZhciByZXNwb25zZSA9IG9wZW4uYXBwbHkodGhpcywgYXJndW1lbnRzLCBhc3luYyk7XHJcblxyXG5cdFx0XHRmb3IgKGhlYWRlciBpbiBoZWFkZXJzKSB7XHJcblx0XHRcdFx0dGhpcy5zZXRSZXF1ZXN0SGVhZGVyKGhlYWRlciwgaGVhZGVyc1toZWFkZXJdKTtcclxuXHRcdFx0fVxyXG5cclxuXHQgIFx0XHRyZXR1cm4gcmVzcG9uc2U7XHJcblx0XHR9O1xyXG5cdH1cclxuXHJcblx0cG9zdChvcHRpb25zKVxyXG5cdHtcclxuXHRcdGlmKHR5cGVvZiBvcHRpb25zICE9PSAnb2JqZWN0Jykge1xyXG5cdFx0XHR0aHJvdyBuZXcgRXJyb3IoJ3Bvc3QgZXhwZWN0aW5nIGEganNvbiBvYmplY3QgdG8gYmUgcGFzc2VkIGFzIGFuIGFyZ3VtZW50LCBidXQgJysgdHlwZW9mIG9wdGlvbnMgKyAnIHdhcyBwYXNzZWQuJyk7XHJcblx0XHR9XHJcblxyXG5cdFx0aWYodHlwZW9mIG9wdGlvbnMuZGF0YSAhPT0gJ29iamVjdCcpIHtcclxuXHRcdFx0dGhyb3cgbmV3IEVycm9yKCdkYXRhIHByb3BlcnR5IGV4cGVjdGluZyBhIGpzb24gb2JqZWN0IHRvIGJlIHBhc3NlZCBhcyBhbiBhcmd1bWVudCwgYnV0ICcgKyB0eXBlb2Ygb3B0aW9ucy5kYXRhICsgJyB3YXMgcGFzc2VkLicpO1xyXG5cdFx0fVxyXG5cclxuXHRcdG9wdGlvbnMuZGF0YSA9IG9wdGlvbnMuZGF0YSB8fCBudWxsO1xyXG5cclxuXHRcdHhoci5vcGVuKCdQT1NUJywgb3B0aW9ucy51cmwsIHRydWUpO1xyXG5cdFx0eGhyLnNldFJlcXVlc3RIZWFkZXIoXCJDb250ZW50LXR5cGVcIiwgb3B0aW9ucy5oZWFkZXJzIHx8IFwiYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkXCIpO1xyXG5cclxuXHRcdGlmKG9wdGlvbnMuaGFzT3duUHJvcGVydHkoJ2JlZm9yZScpICYmIHR5cGVvZiBvcHRpb25zLmJlZm9yZSA9PSAnZnVuY3Rpb24nKSB7XHJcblx0XHRcdG9wdGlvbnMuYmVmb3JlKCk7XHJcblx0XHR9XHJcblxyXG5cdFx0eGhyLm9ucmVhZHlzdGF0ZWNoYW5nZSA9IGZ1bmN0aW9uKCkge1xyXG5cdFx0ICAgIGlmKHRoaXMucmVhZHlTdGF0ZSA9PSA0ICYmIHRoaXMuc3RhdHVzID09IDIwMCkge1xyXG5cdFx0ICAgICAgIFx0aWYob3B0aW9ucy5oYXNPd25Qcm9wZXJ0eSgnc3VjY2VzcycpICYmIHR5cGVvZiBvcHRpb25zLnN1Y2Nlc3MgPT0gJ2Z1bmN0aW9uJykge1xyXG5cdFx0ICAgICAgIFx0XHRvcHRpb25zLnN1Y2Nlc3MoSlNPTi5wYXJzZSh0aGlzLnJlc3BvbnNlKSk7XHJcblx0XHQgICBcdFx0fVxyXG5cdFx0ICAgICAgIFxyXG5cdFx0ICAgICAgIFx0aWYob3B0aW9ucy5oYXNPd25Qcm9wZXJ0eSgnYWZ0ZXInKSAmJiB0eXBlb2Ygb3B0aW9ucy5hZnRlciA9PSAnZnVuY3Rpb24nKSB7XHJcblx0XHQgICAgICAgXHRcdG9wdGlvbnMuYWZ0ZXIodGhpcy5yZXNwb25zZSk7XHJcblx0XHQgICBcdFx0fVxyXG5cdFx0ICAgIH1cclxuXHRcdH07XHJcblxyXG5cdFx0eGhyLm9uZXJyb3IgPSBmdW5jdGlvbihtZXNzYWdlLCBhLCBiKSB7XHJcblx0XHRcdGlmKG9wdGlvbnMuaGFzT3duUHJvcGVydHkoJ2Vycm9yJykgJiYgdHlwZW9mIG9wdGlvbnMuZXJyb3IgPT0gJ2Z1bmN0aW9uJykge1xyXG5cdFx0XHRcdG9wdGlvbnMuZXJyb3IobWVzc2FnZSwgYSwgYik7XHJcblx0XHRcdH1cclxuXHRcdH07XHJcblxyXG5cdFx0aWYoISBvcHRpb25zLmRhdGEpIHtcclxuXHRcdFx0eGhyLnNlbmQobnVsbCk7XHJcblx0XHRcdHJldHVybiBvcHRpb25zO1xyXG5cdFx0fVxyXG5cclxuXHRcdHZhciBxdWVyeVN0cmluZyA9IE9iamVjdC5rZXlzKG9wdGlvbnMuZGF0YSkubWFwKGZ1bmN0aW9uKGtleSkge1xyXG5cdCAgICAgICAgICAgIHJldHVybiBlbmNvZGVVUklDb21wb25lbnQoa2V5KSArICc9JyArXHJcblx0ICAgICAgICAgICAgICAgIFx0ZW5jb2RlVVJJQ29tcG9uZW50KG9wdGlvbnMuZGF0YVtrZXldKTtcclxuXHQgICAgICAgIFx0fSkuam9pbignJicpO1xyXG5cclxuXHRcdHhoci5zZW5kKHF1ZXJ5U3RyaW5nKTtcclxuXHJcblx0XHRyZXR1cm4gb3B0aW9ucztcclxuXHR9XHJcblxyXG5cdGdldChvcHRpb25zKVxyXG5cdHtcclxuXHRcdGlmKHR5cGVvZiBvcHRpb25zICE9PSAnb2JqZWN0Jykge1xyXG5cdFx0XHR0aHJvdyBuZXcgRXJyb3IoJ2dldCBleHBlY3RpbmcgYSBqc29uIG9iamVjdCB0byBiZSBwYXNzZWQgYXMgYW4gYXJndW1lbnQsIGJ1dCAnKyB0eXBlb2Ygb3B0aW9ucyArICcgd2FzIHBhc3NlZC4nKTtcclxuXHRcdH1cclxuXHJcblx0XHRvcHRpb25zLmRhdGEgPSBvcHRpb25zLmRhdGEgfHwge307XHJcblxyXG5cdFx0aWYodHlwZW9mIG9wdGlvbnMuZGF0YSAhPT0gJ29iamVjdCcpIHtcclxuXHRcdFx0dGhyb3cgbmV3IEVycm9yKCdkYXRhIHByb3BlcnR5IGV4cGVjdGluZyBhIGpzb24gb2JqZWN0IHRvIGJlIHBhc3NlZCBhcyBhbiBhcmd1bWVudCwgYnV0ICcgKyB0eXBlb2Ygb3B0aW9ucy5kYXRhICsgJyB3YXMgcGFzc2VkLicpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHRoaXMueGhyLm9wZW4oJ0dFVCcsIG9wdGlvbnMudXJsLCB0cnVlKTtcclxuXHRcdC8veGhyLnNldFJlcXVlc3RIZWFkZXIoXCJDb250ZW50LXR5cGVcIiwgb3B0aW9ucy5oZWFkZXJzIHx8IFwiYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkXCIpO1xyXG5cclxuXHRcdGlmKG9wdGlvbnMuaGFzT3duUHJvcGVydHkoJ2JlZm9yZScpICYmIHR5cGVvZiBvcHRpb25zLmJlZm9yZSA9PSAnZnVuY3Rpb24nKSB7XHJcblx0XHRcdG9wdGlvbnMuYmVmb3JlKCk7XHJcblx0XHR9XHJcblxyXG5cdFx0dGhpcy54aHIub25yZWFkeXN0YXRlY2hhbmdlID0gZnVuY3Rpb24oKSB7XHJcblx0XHQgICAgaWYodGhpcy5yZWFkeVN0YXRlID09IDQgJiYgdGhpcy5zdGF0dXMgPT0gMjAwKSB7XHJcblx0XHQgICAgICAgXHRpZihvcHRpb25zLmhhc093blByb3BlcnR5KCdzdWNjZXNzJykgJiYgdHlwZW9mIG9wdGlvbnMuc3VjY2VzcyA9PSAnZnVuY3Rpb24nKSB7XHJcblx0XHQgICAgICAgXHRcdG9wdGlvbnMuc3VjY2VzcyhKU09OLnBhcnNlKHRoaXMucmVzcG9uc2UpKTtcclxuXHRcdCAgIFx0XHR9XHJcblx0XHQgICAgICAgXHJcblx0XHQgICAgICAgXHRpZihvcHRpb25zLmhhc093blByb3BlcnR5KCdhZnRlcicpICYmIHR5cGVvZiBvcHRpb25zLmFmdGVyID09ICdmdW5jdGlvbicpIHtcclxuXHRcdCAgICAgICBcdFx0b3B0aW9ucy5hZnRlcih0aGlzLnJlc3BvbnNlKTtcclxuXHRcdCAgIFx0XHR9XHJcblx0XHQgICAgfVxyXG5cdFx0fTtcclxuXHJcblx0XHR0aGlzLnhoci5vbmVycm9yID0gZnVuY3Rpb24obWVzc2FnZSkge1xyXG5cdFx0XHRpZihvcHRpb25zLmhhc093blByb3BlcnR5KCdlcnJvcicpICYmIHR5cGVvZiBvcHRpb25zLmVycm9yID09ICdmdW5jdGlvbicpIHtcclxuXHRcdFx0XHRvcHRpb25zLmVycm9yKG1lc3NhZ2UpO1xyXG5cdFx0XHR9XHJcblx0XHR9O1xyXG5cclxuXHRcdGlmKCEgb3B0aW9ucy5kYXRhKSB7XHJcblx0XHRcdHRoaXMueGhyLnNlbmQobnVsbCk7XHJcblx0XHRcdHJldHVybiBvcHRpb25zO1xyXG5cdFx0fVxyXG5cclxuXHRcdHZhciBxdWVyeVN0cmluZyA9IE9iamVjdC5rZXlzKG9wdGlvbnMuZGF0YSkubWFwKGZ1bmN0aW9uKGtleSkge1xyXG5cdCAgICAgICAgICAgIHJldHVybiBlbmNvZGVVUklDb21wb25lbnQoa2V5KSArICc9JyArXHJcblx0ICAgICAgICAgICAgICAgIFx0ZW5jb2RlVVJJQ29tcG9uZW50KG9wdGlvbnMuZGF0YVtrZXldKTtcclxuXHQgICAgICAgIFx0fSkuam9pbignJicpO1xyXG5cclxuXHRcdHRoaXMueGhyLnNlbmQocXVlcnlTdHJpbmcpO1xyXG5cclxuXHRcdHJldHVybiBvcHRpb25zO1xyXG5cdH1cclxufVxuXG5jbGFzcyBJbnZhbGlkQmluZGluZ0V4Y2VwdGlvbiBleHRlbmRzIEVycm9yXHJcbntcclxuXHRjb25zdHJ1Y3RvcigpIFxyXG5cdHsgXHJcbiAgICBcdHN1cGVyKCk7XHJcbiAgICBcdGNvbnNvbGUuZXJyb3IoYEludmFsaWRCaW5kaW5nRXhjZXB0aW9uLCB0cnlpbmcgdG8gYmluZCBhbiBhbHJlYWR5IGV4aXN0aW5nIGJvdW5kLmApO1xyXG4gICAgfVxyXG59XG5cbmxldCBpbnN0YW5jZXMgPSBbXTtcclxuXHJcbmNsYXNzIENvbnRhaW5lciBcclxue1xyXG5cdC8qKlxyXG5cdCAqIEJpbmRzIGtleSB0byBjb25jcmV0ZSBjbGFzcy5cclxuXHQgKi9cclxuXHRiaW5kKGtleSwgY29uY3JldGUpIFxyXG5cdHtcclxuXHRcdGlmICh0eXBlb2Yga2V5ICE9ICdzdHJpbmcnIHx8IHR5cGVvZiBjb25jcmV0ZSAhPSAnZnVuY3Rpb24nKSB7XHJcblx0XHRcdHRocm93IG5ldyBJbnZhbGlkQXJndW1lbnRFeGNlcHRpb24kMTtcclxuXHRcdH1cclxuXHJcblx0XHRpZiAodHlwZW9mIHRoaXNba2V5XSAhPSAndW5kZWZpbmVkJykge1xyXG5cdFx0XHR0aHJvdyBuZXcgSW52YWxpZEJpbmRpbmdFeGNlcHRpb247XHJcblx0XHR9XHJcblxyXG5cdFx0dGhpc1trZXldID0gY29uY3JldGUuYmluZChjb25jcmV0ZSwgdGhpcyk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBTZXRzIGFuIGluc3RhbmNlLlxyXG5cdCAqL1xyXG5cdHNldEluc3RhbmNlKGtleSwgaW5zdGFuY2UpIFxyXG5cdHtcclxuXHRcdGlmKHR5cGVvZiBrZXkgIT0gJ3N0cmluZycgfHwgdHlwZW9mIGluc3RhbmNlICE9ICdvYmplY3QnKSB7XHJcblx0XHRcdHRocm93IG5ldyBJbnZhbGlkQXJndW1lbnRFeGNlcHRpb24kMTtcclxuXHRcdH1cclxuXHJcblx0XHRpbnN0YW5jZXNba2V5XSA9IGluc3RhbmNlO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogR2V0cyBhbiBpbnN0YW5jZS5cclxuXHQgKi9cclxuXHRnZXRJbnN0YW5jZShrZXkpIFxyXG5cdHtcclxuXHRcdGlmKHR5cGVvZiBrZXkgIT0gJ3N0cmluZycpIHtcclxuXHRcdFx0dGhyb3cgbmV3IEludmFsaWRBcmd1bWVudEV4Y2VwdGlvbiQxO1xyXG5cdFx0fVxyXG5cclxuXHRcdGlmKHR5cGVvZiBrZXkgPT0gJ29iamVjdCcpIHtcclxuXHRcdFx0cmV0dXJuIGluc3RhbmNlc1trZXkuY29uc3RydWN0b3IubmFtZV0gfHwgbnVsbDtcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gaW5zdGFuY2VzW2tleV0gfHwgbnVsbDtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIENoZWNrcyBpZiBhbiBpbnN0YW5jZSBleGlzdC5cclxuXHQgKi9cclxuXHRpbnN0YW5jZUV4aXN0KGluc3RhbmNlKSBcclxuXHR7XHJcblx0XHRpZih0eXBlb2YgaW5zdGFuY2UgPT0gJ29iamVjdCcpIHtcclxuXHRcdFx0cmV0dXJuICh0eXBlb2YgaW5zdGFuY2VzW2luc3RhbmNlLmNvbnN0cnVjdG9yLm5hbWVdICE9PSAndW5kZWZpbmVkJyk7XHJcblx0XHR9XHJcblx0XHRcclxuXHRcdFxyXG5cdFx0cmV0dXJuIChpbnN0YW5jZSBpbiBpbnN0YW5jZXMpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQ3JlYXRlcyBhbiBpbnN0YW5jZS5cclxuXHQgKi9cclxuXHRtYWtlKG9iamVjdClcclxuXHR7XHJcblx0XHRsZXQgaW5zdGFuY2UgPSB7fTtcclxuXHRcdGxldCBrZXk7XHJcblxyXG5cdFx0aWYgKHRoaXMuaW5zdGFuY2VFeGlzdChvYmplY3QpKSB7XHJcblx0XHRcdHJldHVybiB0aGlzLmdldEluc3RhbmNlKG9iamVjdCk7XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKHR5cGVvZiBvYmplY3QgPT0gJ29iamVjdCcpIHtcclxuXHRcdFx0aW5zdGFuY2UgPSBvYmplY3Q7XHJcblx0XHRcdGtleSA9IG9iamVjdC5jb25zdHJ1Y3Rvci5uYW1lO1xyXG5cdFx0XHR0aGlzLnNldEluc3RhbmNlKGtleSwgaW5zdGFuY2UpOyBcclxuXHRcdH0gZWxzZSBpZih0eXBlb2Ygb2JqZWN0ID09ICdzdHJpbmcnICYmIHRoaXMuaGFzT3duUHJvcGVydHkob2JqZWN0KSkge1xyXG5cdFx0XHRpbnN0YW5jZSA9IG5ldyB0aGlzW29iamVjdF07XHJcblx0XHRcdGtleSA9IG9iamVjdDtcclxuXHRcdFx0dGhpcy5zZXRJbnN0YW5jZShrZXksIGluc3RhbmNlKTtcdFxyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0dGhyb3cgbmV3IEludmFsaWRCaW5kaW5nRXhjZXB0aW9uO1xyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiBpbnN0YW5jZTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFJldHJpZXZlIGFsbCBpbnN0YW5jZXMuXHJcblx0ICovXHJcblx0aW5zdGFuY2VzKCkgXHJcblx0e1xyXG5cdFx0cmV0dXJuIGluc3RhbmNlcztcclxuXHR9XHJcbn1cblxuY2xhc3MgQ29tcG9uZW50c0V4Y2VwdGlvbiBleHRlbmRzIEVycm9yXHJcbntcclxuXHRjb25zdHJ1Y3RvcigpIFxyXG5cdHsgXHJcbiAgICBcdHN1cGVyKCk7XHJcbiAgICBcdGNvbnNvbGUuZXJyb3IoYENvbXBvbmVudHNFeGNlcHRpb24sIGV4cGVjdGluZyBmb3IgYXQgbGVhc3Qgb25lIGNvbXBvbmVudHMsIGJ1dCBub25lIHdhcyBnaXZlbiwgXHJcblx0XHRcdFx0XHRcdFx0XHRwbGVhc2UgYWRkIGF0IGxlYXN0IG9uZSByZXF1aXJlbWVudChQcm9kdWN0cywgU2VydmljZXMgb3IvYW5kIEZpbHRlci5gKTtcclxuICAgIH1cclxufVxuXG5jbGFzcyBCYWRFdmVudENhbGxFeGNlcHRpb24kMSBleHRlbmRzIEVycm9yXHJcbntcclxuXHRjb25zdHJ1Y3RvcigpIFxyXG5cdHsgXHJcblx0XHRzdXBlcigpO1xyXG4gICAgXHRjb25zb2xlLmVycm9yKGBCYWRFdmVudENhbGxFeGNlcHRpb24sIGxpc3RlbmluZyB0byBhIG5vbmUtZXhpc3RpbmcgZXZlbnQuYCk7XHJcbiAgICB9XHJcbn1cblxuY2xhc3MgTm90SW5QYWdlUmFuZ2VFeGNlcHRpb24gZXh0ZW5kcyBFcnJvclxyXG57XHJcblx0Y29uc3RydWN0b3IoKSBcclxuXHR7IFxyXG4gICAgXHRzdXBlcigpO1xyXG4gICAgXHRjb25zb2xlLmVycm9yKGBOb3RJblBhZ2VSYW5nZUV4Y2VwdGlvbiwgc29ycnksIG5vIG1vcmUgcGFnZXMuYCk7XHJcbiAgICB9XHJcbn1cblxuY2xhc3MgQ29tcG9uZW50Tm90UmVnaXN0ZXJlZEV4Y2VwdGlvbiBleHRlbmRzIEVycm9yXHJcbntcclxuXHRjb25zdHJ1Y3RvcigpIFxyXG5cdHsgXHJcbiAgICBcdHN1cGVyKCk7XHJcbiAgICBcdGNvbnNvbGUuZXJyb3IoYENvbXBvbmVudE5vdFJlZ2lzdGVyZWRFeGNlcHRpb24sIGNvbXBvbmVudHMgbXVzdCBiZSByZWdpc3RlcmVkIGluIG9yZGVyIHRvIHVzZSB0aGVtLmApO1xyXG4gICAgfVxyXG59XG5cbmNsYXNzIEV4Y2VwdGlvbkhhbmRsZXIgZXh0ZW5kcyBFcnJvclxyXG57XHJcblx0LyoqXHJcblx0ICogSGFuZGxlIGFsbCB0aGUgZXJyb3JzXHJcblx0ICovXHJcblx0c3RhdGljIGluaXRhbGl6ZSgpIHtcdFxyXG5cdFx0d2luZG93Lm9uZXJyb3IgPSBmdW5jdGlvbihtZXNzYWdlLCBzb3VyY2UsIGxpbmVubywgY29sbm8sIGVycm9yKSB7XHJcblx0XHRcdFxyXG5cdFx0XHRpZiAoZXJyb3IgaW5zdGFuY2VvZiBJbnZhbGlkQXJndW1lbnRFeGNlcHRpb24kMSkge1xyXG5cdFx0XHRcdC8vIGhhbmRsZVxyXG5cdFx0XHR9IGVsc2UgaWYgKGVycm9yIGluc3RhbmNlb2YgSW52YWxpZEJpbmRpbmdFeGNlcHRpb24pIHtcclxuXHRcdFx0XHQvLyBoYW5kbGVcclxuXHRcdFx0fSBlbHNlIGlmIChlcnJvciBpbnN0YW5jZW9mIEJhZEV2ZW50Q2FsbEV4Y2VwdGlvbiQxKSB7XHJcblx0XHRcdFx0Ly8gaGFuZGxlXHJcblx0XHRcdH0gZWxzZSBpZiAoZXJyb3IgaW5zdGFuY2VvZiBDb21wb25lbnRzRXhjZXB0aW9uKSB7XHJcblx0XHRcdFx0Ly8gaGFuZGxlXHJcblx0XHRcdH0gZWxzZSBpZiAoZXJyb3IgaW5zdGFuY2VvZiBDb21wb25lbnROb3RSZWdpc3RlcmVkRXhjZXB0aW9uKSB7XHJcblx0XHRcdFx0Ly8gaGFuZGxlXHJcblx0XHRcdH0gZWxzZSBpZiAoZXJyb3IgaW5zdGFuY2VvZiBOb3RJblBhZ2VSYW5nZUV4Y2VwdGlvbikge1xyXG5cdFx0XHRcdC8vIGhhbmRsZSBcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHJldHVybiB0cnVlO1xyXG5cdFx0fTtcclxuXHR9XHJcbn1cblxuLyoqXHJcbiAqIFRoZSBkZWZhdWx0IHNldHRpbmdzIG9mIHRoZSBmaWx0ZXIuXHJcbiAqL1xyXG5sZXQgZGVmYXVsdFNldHRpbmdzJDIgPSB7XHJcblx0ZWxlbWVudDogJy5maWx0ZXInLFxyXG5cdGRhdGE6IHt9LFxyXG5cdGNsYXNzOiAnJyxcclxuXHR3aWR0aDogJycsXHJcblx0aGVpZ2h0OiAnJyxcclxufTtcclxuXHJcbi8qKlxyXG4gKiBTdG9yZXMgdGhlIGNvbnRhaW5lciBvYmplY3QuXHJcbiAqL1xyXG5sZXQgQ29udGFpbmVyJDI7XHJcblxyXG4vKipcclxuICogVGhlIEZpbHRlciBPYmplY3QsIGhhbmRsZXMgdGhlIGZpbHRlciBvZiB0aGUgcHJvZHVjdHMvc2VydmljZXMuXHJcbiAqL1xyXG5jbGFzcyBGaWx0ZXIgXHJcbntcclxuXHRjb25zdHJ1Y3Rvcihjb250YWluZXIpIFxyXG5cdHtcclxuXHRcdENvbnRhaW5lciQyID0gY29udGFpbmVyO1xyXG5cdH1cclxuXHJcblx0c2V0dXAoc2V0dGluZ3MpXHJcblx0e1xyXG5cdFx0aWYodHlwZW9mIHNldHRpbmdzICE9ICdvYmplY3QnKSB7XHJcblx0XHRcdHRocm93IG5ldyBJbnZhbGlkQXJndW1lbnRFeGNlcHRpb24kMTtcclxuXHRcdH1cclxuXHJcblx0XHR0aGlzLnNldHRpbmdzID0gQ29tbW9uLmV4dGVuZChkZWZhdWx0U2V0dGluZ3MkMiwgc2V0dGluZ3MpO1xyXG5cclxuXHRcdHRoaXMuc2V0RWxlbWVudCh0aGlzLnNldHRpbmdzLmVsZW1lbnQpO1xyXG5cdH1cclxuXHJcblx0c2V0RWxlbWVudChzZWxlY3RvcilcclxuXHR7XHJcblx0XHR0aGlzLndyYXBwZXIgPSBET00uZmluZChzZWxlY3Rvcik7XHJcblx0XHRcclxuXHRcdERPTS5hZGRDbGFzcyh0aGlzLndyYXBwZXIsIHRoaXMuc2V0dGluZ3MuY2xhc3MpO1xyXG5cdH1cclxufVxuXG4vKipcclxuICogQGZpbGUgXHJcbiAqIFN0ciBjbGFzcy5cclxuICpcclxuICogQWRkcyBzb21lIHVzZWZ1bCBmdW5jdGlvbmFsaXR5IGZvclxyXG4gKiBtYW5pcHVsYXRpbmcgc3RyaW5ncyBvciBjcmVhdGluZyBzdHJpbmcuXHJcbiAqL1xyXG5cclxuY2xhc3MgU3RyXHJcbntcclxuXHJcblx0LyoqXHJcblx0ICogQ29udmVydCBjYW1lbENhc2UgdG8ga2ViYWItY2FzZS5cclxuXHQgKi9cclxuXHRzdGF0aWMga2ViYWJDYXNlKHN0cmluZykgXHJcblx0e1xyXG5cdFx0cmV0dXJuIHN0cmluZy5yZXBsYWNlKC8oW2Etel0pKFtBLVpdKS9nLCAnJDEtJDInKS50b0xvd2VyQ2FzZSgpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogR2VuZXJhdGVzIGEgcmFuZG9tIHN0cmluZy5cclxuXHQgKi9cclxuXHRzdGF0aWMgcmFuZG9tKGxlbmd0aCkgXHJcblx0e1xyXG5cdFx0bGV0IHN0cmluZyA9ICcnO1xyXG5cdFx0bGV0IHBvc3NpYmxlID0gXCJBQkNERUZHSElKS0xNTk9QUVJTVFVWV1hZWmFiY2RlZmdoaWprbG1ub3BxcnN0dXZ3eHl6MDEyMzQ1Njc4OVwiO1xyXG5cclxuXHRcdGZvciAobGV0IGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcclxuXHQgICAgXHRzdHJpbmcgKz0gcG9zc2libGUuY2hhckF0KE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIHBvc3NpYmxlLmxlbmd0aCkpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiBzdHJpbmc7XHJcblx0fVxyXG5cclxufVxuXG4vKipcclxuICogVGhlIGRlZmF1bHQgc2V0dGluZ3Mgb2YgZWFjaCBwcm9kdWN0LlxyXG4gKi9cclxubGV0IGRlZmF1bHRTZXR0aW5ncyQzID0ge1xyXG5cdGVsZW1lbnQ6ICcucHJvZHVjdHMnLFxyXG5cdGNsYXNzOiAnJyxcclxuXHRpdGVtX2NsYXNzOiAnJyxcclxuXHRhZGRfYnV0dG9uX2NsYXNzOiAnYnRuIGJ0bi1wcmltYXJ5JyxcclxuXHRmYXZvcml0ZV9idXR0b25fY2xhc3M6ICdidG4gYnRuLWRhbmdlcicsXHJcblx0d2lkdGg6ICcyMDBweCcsXHJcblx0aGVpZ2h0OiAnMjUwcHgnLFxyXG5cdGF0dHJpYnV0ZXM6IFsnbmFtZScsICdwcmljZScsICdkZWxpdmVyeVRpbWUnLCAnaW1hZ2UnXSxcclxuXHR1cmw6ICdwcm9kdWN0cy5waHAnLFxyXG59O1xyXG5cclxuLyoqXHJcbiAqIFN0b3JlcyB0aGUgY29udGFpbmVyIG9iamVjdC5cclxuICovXHJcbmxldCBDb250YWluZXIkMztcclxuXHJcbi8qKlxyXG4gKiBTdG9yZXMgdGhlIHJlcXVlc3Qgb2JqZWN0LlxyXG4gKi9cclxubGV0IEh0dHA7XHJcblxyXG4vKipcclxuICogVGhlIFByb2R1Y3RzIE9iamVjdCwgaGFuZGxlcyB0aGUgcHJvZHVjdHMuXHJcbiAqL1xyXG5jbGFzcyBQcm9kdWN0cyBcclxue1xyXG5cdC8qKlxyXG5cdCAqIEluaXRhbGl6ZSB0aGUgQ29udGFpbmVyLlxyXG5cdCAqL1xyXG5cdGNvbnN0cnVjdG9yKGNvbnRhaW5lciwgaHR0cCkgXHJcblx0e1xyXG5cdFx0Q29udGFpbmVyJDMgPSBjb250YWluZXI7XHJcblx0XHRIdHRwID0gaHR0cDtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFNldHMgdGhlIGdpdmVuIHNldHRpbmdzIGZyb20gdGhlIHVzZXIuXHJcblx0ICovXHJcblx0c2V0dXAoc2V0dGluZ3MpXHJcblx0e1xyXG5cdFx0ZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsIGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRcclxuXHRcdGlmICh0eXBlb2Ygc2V0dGluZ3MgIT0gJ29iamVjdCcpIHtcclxuXHRcdFx0dGhyb3cgbmV3IEludmFsaWRBcmd1bWVudEV4Y2VwdGlvbiQxO1xyXG5cdFx0fVxyXG5cclxuXHRcdHRoaXMuc2V0dGluZ3MgPSBDb21tb24uZXh0ZW5kKGRlZmF1bHRTZXR0aW5ncyQzLCBzZXR0aW5ncyk7XHJcblxyXG5cdFx0dGhpcy5zZXRFbGVtZW50KHRoaXMuc2V0dGluZ3MuZWxlbWVudCk7XHJcblxyXG5cdFx0dGhpcy5hZGRTdHlsZVRhZygpO1x0XHJcblx0XHRcclxuXHRcdGlmIChDb250YWluZXIkMy5QYWdpbmF0aW9uICYmIENvbnRhaW5lciQzLlBhZ2luYXRpb24uYm9vdGVkKSB7XHJcblx0XHRcdGxldCBpbnN0YW5jZSA9IHRoaXM7XHJcblxyXG5cdFx0XHRpbnN0YW5jZS5nZXRQcm9kdWN0c0J5UGFnZSgxKS50aGVuKGZ1bmN0aW9uKHByb2R1Y3RzKSB7XHJcblx0XHRcdFx0aW5zdGFuY2UucmVwbGFjZUl0ZW1zKHByb2R1Y3RzKTtcclxuXHRcdFx0fSk7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHR0aGlzLmxvYWRBbGxQcm9kdWN0cygpO1xyXG5cdFx0fVxyXG5cclxuXHRcdH0uYmluZCh0aGlzKSk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBMb2FkcyB0aGUgcHJvZHVjdHMgYW5kIHJlcGxhY2UgdGhlbSBpbiB0aGUgZGl2IGNvbnRhaW5lci5cclxuXHQgKi9cclxuXHRsb2FkQWxsUHJvZHVjdHMoKVxyXG5cdHtcclxuXHRcdGxldCByZXF1ZXN0ID0gdGhpcy5nZXRQcm9kdWN0cygpO1xyXG5cdFx0XHRcclxuXHRcdHJlcXVlc3QudGhlbihmdW5jdGlvbihpdGVtcykge1xyXG5cdFx0XHRFdmVudC50cmlnZ2VyKCdQcm9kdWN0c1dlcmVGZXRjaGVkJywgaXRlbXMpO1xyXG5cdFx0XHR0aGlzLnJlcGxhY2VJdGVtcyhpdGVtcyk7XHJcblx0XHR9LmJpbmQodGhpcykpLmNhdGNoKGZ1bmN0aW9uKGVycm9yKSB7XHJcblxyXG5cdFx0fSk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBTZXRzIHRoZSBET00gZWxlbWVudCBmb3IgcG9wdWxhdGluZyB0aGUgcHJvZHVjdHMuXHJcblx0ICovXHJcblx0c2V0RWxlbWVudChzZWxlY3RvcilcclxuXHR7XHJcblx0XHR0aGlzLndyYXBwZXIgPSBET00uZmluZChzZWxlY3Rvcik7XHJcblxyXG5cdFx0aWYgKHRoaXMud3JhcHBlcikge1xyXG5cdFx0XHRET00uYWRkQ2xhc3ModGhpcy53cmFwcGVyLCB0aGlzLnNldHRpbmdzLmNsYXNzKTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFJlcGxhY2UgaXRlbXMgaW4gdGhlIGNvbnRhaW5lci5cclxuXHQgKi9cclxuXHRyZXBsYWNlSXRlbXMoaXRlbXMpIFxyXG5cdHtcclxuXHRcdGlmICghIEFycmF5LmlzQXJyYXkoaXRlbXMpIHx8IChpdGVtcy5sZW5ndGggPD0gMCAmJiB0eXBlb2YgaXRlbXNbMF0gPT0gJ3N0cmluZycpKSB7XHJcblx0XHRcdHRocm93IG5ldyBJbnZhbGlkQXJndW1lbnRFeGNlcHRpb24kMTtcclxuXHRcdH1cclxuXHJcblx0XHRsZXQgcHJvZHVjdHMgPSB0aGlzLmJ1aWxkUHJvZHVjdHMoaXRlbXMsIHRoaXMuc2V0dGluZ3MuaXRlbV9jbGFzcywgJ2RpdicpO1xyXG5cclxuXHRcdHRoaXMud3JhcHBlci5pbm5lckhUTUwgPSAnJztcclxuXHRcdHByb2R1Y3RzLmZvckVhY2goZnVuY3Rpb24ocHJvZHVjdCkge1xyXG5cdFx0XHR0aGlzLndyYXBwZXIuYXBwZW5kQ2hpbGQocHJvZHVjdCk7XHJcblx0XHR9LmJpbmQodGhpcykpO1xyXG5cclxuXHRcdHJldHVybiBpdGVtcztcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIE1ha2VzIGFuIEFqYXggY2FsbCB0byB0aGUgc2VydmVyIHdpdGhvdXQgcGFyYW1ldGVycy5cclxuXHQgKi9cclxuXHRnZXRQcm9kdWN0cygpXHJcblx0e1xyXG5cdFx0cmV0dXJuIHRoaXMuYXNrU2VydmVyKCk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBNYWtlcyBhbiBBamF4IGNhbGwgdG8gdGhlIHNlcnZlci5cclxuXHQgKi9cclxuXHRnZXRQcm9kdWN0c0J5UGFnZShwYWdlTnVtYmVyKSBcclxuXHR7XHJcblx0XHRyZXR1cm4gdGhpcy5hc2tTZXJ2ZXIocGFnZU51bWJlcik7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBTZW5kcyB0aGUgcmVxdWVzdCB0byB0aGUgc2VydmVyLlxyXG5cdCAqL1xyXG5cdGFza1NlcnZlcihwYWdlTnVtYmVyKVxyXG5cdHtcclxuXHRcdHBhZ2VOdW1iZXIgPSBwYWdlTnVtYmVyIHx8IG51bGw7XHJcblxyXG5cdFx0cmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xyXG5cclxuXHRcdFx0bGV0IGFjdGlvbiA9IChwYWdlTnVtYmVyKSA/IHRoaXMuc2V0dGluZ3MudXJsICsgJz9wYWdlPScgKyBwYWdlTnVtYmVyIDogdGhpcy5zZXR0aW5ncy51cmw7XHJcblxyXG5cdFx0XHRIdHRwLmdldCh7XHJcblx0XHRcdFx0dXJsOiBhY3Rpb24sXHJcblx0XHRcdFx0c3VjY2VzczogZnVuY3Rpb24ocmVzcG9uc2UpIHtcclxuXHRcdFx0XHRcdGNvbnNvbGUubG9nKHJlc3BvbnNlKTtcclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHR9KTtcclxuXHJcblx0XHRcdGxldCB4aHIgPSBuZXcgWE1MSHR0cFJlcXVlc3QgfHwgbmV3IEFjdGl2ZVhPYmplY3QoXCJNaWNyb3NvZnQuWE1MSFRUUFwiKTtcclxuXHJcblx0XHRcdGlmKHBhZ2VOdW1iZXIpIHtcclxuXHRcdFx0XHR4aHIub3BlbignR0VUJywgdGhpcy5zZXR0aW5ncy51cmwgKyAnP3BhZ2U9JyArIHBhZ2VOdW1iZXIsIHRydWUpO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdHhoci5vcGVuKCdHRVQnLCB0aGlzLnNldHRpbmdzLnVybCwgdHJ1ZSk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcclxuXHRcdFx0XHJcblx0XHRcdGxldCBpbnN0YW5jZSA9IHRoaXM7XHJcblxyXG5cdFx0XHR4aHIub25yZWFkeXN0YXRlY2hhbmdlID0gZnVuY3Rpb24oKSB7XHJcblx0XHRcdFx0aWYgKHRoaXMucmVhZHlTdGF0ZSA9PSA0KSB7XHJcblx0XHRcdFx0XHRpZiAodGhpcy5zdGF0dXMgPT0gMjAwKSB7XHJcblx0XHRcdFx0XHRcdGluc3RhbmNlLmN1cnJlbnRJdGVtcyA9ICh0aGlzLnJlc3BvbnNlVGV4dCA9PSAnJykgPyBbXSA6IEpTT04ucGFyc2UodGhpcy5yZXNwb25zZVRleHQpO1xyXG5cdFx0XHRcdFx0XHJcblx0XHRcdFx0XHRcdGlmKGluc3RhbmNlLmN1cnJlbnRJdGVtcy5sZW5ndGggPT09IDApIHtcclxuXHRcdFx0XHRcdFx0XHRyZWplY3QoJ05vIEl0ZW1zIHdlcmUgcmV0cmlldmVkIScpO1xyXG5cdFx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGluc3RhbmNlLmN1cnJlbnRJdGVtcy5sZW5ndGg7IGkrKykge1xyXG5cdFx0XHRcdFx0XHRcdHZhciBwcm9kdWN0ID0gaW5zdGFuY2UuY3VycmVudEl0ZW1zW2ldO1xyXG5cdFx0XHRcdFx0XHRcdGluc3RhbmNlLkFmdGVyTG9hZGVkLmNhbGwodGhpcywgcHJvZHVjdCk7XHJcblx0XHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0XHRcdHJlc29sdmUoaW5zdGFuY2UuY3VycmVudEl0ZW1zKTtcclxuXHRcdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRcdHJlamVjdCh0aGlzLnN0YXR1c1RleHQpO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0fTtcclxuXHJcblx0XHRcdHhoci5vbmVycm9yID0gZnVuY3Rpb24oZXJyb3IpIHtcclxuXHRcdFx0XHRyZWplY3QoZXJyb3IpO1xyXG5cdFx0XHR9O1xyXG5cclxuXHRcdFx0eGhyLnNlbmQobnVsbCk7XHJcblx0XHR9LmJpbmQodGhpcykpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQnVpbGRzIHRoZSBodG1sIGZvciB0aGUgcHJvZHVjdHMuXHJcblx0ICovXHJcblx0YnVpbGRQcm9kdWN0cyhhdHRyaWJ1dGVzQ29sbGVjdGlvbiwgY2xhc3NOYW1lLCB0YWdUeXBlKSBcclxuXHR7XHJcblx0XHRpZihhdHRyaWJ1dGVzQ29sbGVjdGlvbi5jb25zdHJ1Y3Rvci5uYW1lICE9ICdBcnJheScgKSB7XHJcblx0XHRcdHRocm93IG5ldyBJbnZhbGlkQXJndW1lbnRFeGNlcHRpb24kMTtcclxuXHRcdH1cclxuXHJcblx0XHRsZXQgYnVpbHRQcm9kdWN0cyA9IFtdO1xyXG5cclxuXHRcdGF0dHJpYnV0ZXNDb2xsZWN0aW9uLmZvckVhY2goZnVuY3Rpb24oYXR0cmlidXRlcykge1xyXG5cdFx0XHRsZXQgYnVpbHRQcm9kdWN0ID0gdGhpcy5idWlsZFByb2R1Y3QoYXR0cmlidXRlcywgY2xhc3NOYW1lLCB0YWdUeXBlKTtcclxuXHRcdFx0YnVpbHRQcm9kdWN0cy5wdXNoKGJ1aWx0UHJvZHVjdCk7XHJcblx0XHR9LmJpbmQodGhpcykpO1xyXG5cclxuXHRcdHJldHVybiBidWlsdFByb2R1Y3RzO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQnVpbGRzIHRoZSBodG1sIGZvciBhIHNpbmdsZSBwcm9kdWN0LlxyXG5cdCAqL1xyXG5cdGJ1aWxkUHJvZHVjdChhdHRyaWJ1dGVzLCBjbGFzc05hbWUsIHRhZ1R5cGUpIFxyXG5cdHtcclxuXHRcdGlmICh0eXBlb2YgYXR0cmlidXRlcyAhPSAnb2JqZWN0JyB8fCB0eXBlb2YgdGFnVHlwZSAhPSAnc3RyaW5nJykge1xyXG5cdFx0XHR0aHJvdyBuZXcgSW52YWxpZEFyZ3VtZW50RXhjZXB0aW9uJDE7XHJcblx0XHR9XHJcblxyXG5cdFx0Y2xhc3NOYW1lID0gY2xhc3NOYW1lIHx8IG51bGw7XHJcblxyXG5cdFx0bGV0IHByb2R1Y3QgPSBET00uY3JlYXRlRWxlbWVudCgnZGl2Jywge1xyXG5cdFx0XHRjbGFzczogJ3Byb2R1Y3QnXHJcblx0XHR9KTtcclxuXHJcblx0XHRET00uYWRkQ2xhc3MocHJvZHVjdCwgY2xhc3NOYW1lKTtcclxuXHJcblx0XHRsZXQgb3ZlcmxheSA9IERPTS5jcmVhdGVFbGVtZW50KCdkaXYnLCB7XHJcblx0XHRcdGNsYXNzOiAncHJvZHVjdC1vdmVybGF5JyxcclxuXHRcdH0pO1xyXG5cclxuXHRcdHByb2R1Y3QuYXBwZW5kQ2hpbGQob3ZlcmxheSk7XHJcblxyXG5cdFx0Zm9yICh2YXIgYXR0cmlidXRlIGluIGF0dHJpYnV0ZXMpIHtcclxuXHRcdFx0aWYgKCEgQ29tbW9uLmluX2FycmF5KGF0dHJpYnV0ZSwgdGhpcy5zZXR0aW5ncy5hdHRyaWJ1dGVzKSkge1xyXG5cdFx0XHRcdGNvbnRpbnVlO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRsZXQgdGFnID0gRE9NLmNyZWF0ZUVsZW1lbnQodGFnVHlwZSk7XHJcblxyXG5cdFx0XHRpZiAoYXR0cmlidXRlID09ICdpbWFnZScpIHtcclxuXHRcdFx0XHRsZXQgaW1hZ2UgPSBET00uY3JlYXRlRWxlbWVudCgnaW1nJywge1xyXG5cdFx0XHRcdFx0c3JjOiBhdHRyaWJ1dGVzW2F0dHJpYnV0ZV1cclxuXHRcdFx0XHR9KTtcclxuXHRcdFx0XHRwcm9kdWN0LmFwcGVuZENoaWxkKGltYWdlKTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHR0YWcuaW5uZXJIVE1MID0gYXR0cmlidXRlc1thdHRyaWJ1dGVdIHx8ICcnO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRET00uYWRkQ2xhc3ModGFnLCAncHJvZHVjdC0nICsgU3RyLmtlYmFiQ2FzZShhdHRyaWJ1dGUpKTtcclxuXHRcdFx0b3ZlcmxheS5hcHBlbmRDaGlsZCh0YWcpO1xyXG5cdFx0fVxyXG5cclxuXHRcdGxldCB0YWcgPSBET00uY3JlYXRlRWxlbWVudCgnZGl2Jywge1xyXG5cdFx0XHRpZDogJ2FjdGlvbkJ1dHRvbnMnLFxyXG5cdFx0XHRjbGFzczogJ2FjdGlvbi1idXR0b25zJ1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0bGV0IGFkZFRvQ2FydCA9IERPTS5jcmVhdGVFbGVtZW50KCdidXR0b24nLCB7XHJcblx0XHRcdGlkOiAnYWRkVG9DYXJ0JyxcclxuXHRcdFx0Y2xhc3M6IHRoaXMuc2V0dGluZ3MuYWRkX2J1dHRvbl9jbGFzcyxcclxuXHRcdFx0dHlwZTogJ2J1dHRvbicsXHJcblx0XHRcdHRleHQ6ICcrJyxcclxuXHRcdH0pO1xyXG5cclxuXHRcdGxldCBmYXZvcml0ZSA9IERPTS5jcmVhdGVFbGVtZW50KCdidXR0b24nLCB7XHJcblx0XHRcdGlkOiAnZmF2b3JpdGUnLFxyXG5cdFx0XHRjbGFzczogdGhpcy5zZXR0aW5ncy5mYXZvcml0ZV9idXR0b25fY2xhc3MsXHJcblx0XHRcdHR5cGU6ICdidXR0b24nLFxyXG5cdFx0XHR0ZXh0OiAnJmhlYXJ0czsnXHJcblx0XHR9KTtcclxuXHJcblx0XHR0YWcuYXBwZW5kQ2hpbGQoYWRkVG9DYXJ0KTtcclxuXHRcdHRhZy5hcHBlbmRDaGlsZChmYXZvcml0ZSk7XHJcblxyXG5cdFx0YWRkVG9DYXJ0LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oZXZlbnQpIHtcclxuXHRcdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuXHRcdFx0RXZlbnQudHJpZ2dlcignUHJvZHVjdFdhc0FkZGVkJywgYXR0cmlidXRlcyk7XHJcblx0XHR9KTtcclxuXHJcblx0XHRvdmVybGF5LmFwcGVuZENoaWxkKHRhZyk7XHJcblxyXG5cdFx0cmV0dXJuIHByb2R1Y3Q7XHJcblx0fVxyXG5cclxuXHRhZGRUb0NhcnQoZXZlbnQpXHJcblx0e1xyXG5cdFx0XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBBbiBldmVudCBmb3IgdGhlIGNsaWVudCBvZiB3aGVuIHRoZSBwcm9kdWN0cyBhcyBiZWVuIGxvYWRlZC5cclxuXHQgKi9cclxuXHRBZnRlckxvYWRlZChwcm9kdWN0KSBcclxuXHR7XHJcblx0XHQvL1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQWRkIHRoZSBlQ29tbWVyY2Ugc3R5bGUgdGFncyB0byB0aGUgRE9NLlxyXG5cdCAqL1xyXG5cdGFkZFN0eWxlVGFnKCkgXHJcblx0e1xyXG5cdFx0aWYoRE9NLmZpbmQoJyNlQ29tbWVyY2UtUHJvZHVjdHMnKSkge1xyXG5cdFx0XHRyZXR1cm47XHJcblx0XHR9XHJcblxyXG5cdFx0bGV0IGNzcyA9IGBcclxuXHRcdFx0LnByb2R1Y3Qge1xyXG5cdFx0XHRcdHBvc2l0aW9uOiByZWxhdGl2ZTtcclxuXHRcdFx0XHRtYXJnaW46IDVweCA1cHg7XHJcblx0XHRcdFx0Ym9yZGVyOiAxcHggc29saWQgI2U0ZTRlNDtcclxuXHRcdFx0XHR3aWR0aDogJHt0aGlzLnNldHRpbmdzLndpZHRofTtcclxuXHRcdFx0XHRoZWlnaHQ6ICR7dGhpcy5zZXR0aW5ncy5oZWlnaHR9O1xyXG5cdFx0XHRcdGN1cnNvcjogcG9pbnRlcjtcclxuXHRcdFx0XHRjb2xvcjogI2ZmZmZmZjtcclxuXHRcdFx0XHRvdmVyZmxvdzogaGlkZGVuO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHQucHJvZHVjdCA+IC5wcm9kdWN0LW92ZXJsYXkge1xyXG5cdFx0XHRcdHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuXHRcdFx0XHR0b3A6IDA7XHJcblx0XHRcdFx0bGVmdDogMDtcclxuXHRcdFx0XHR3aWR0aDogMTAwJTtcclxuXHRcdFx0XHRoZWlnaHQ6IDEwMCU7XHJcblx0XHRcdFx0b3BhY2l0eTogMC41O1xyXG5cdFx0XHRcdHotaW5kZXg6IDU7XHJcblx0XHRcdFx0dHJhbnNpdGlvbjogMXMgYWxsO1xyXG5cdFx0XHRcdHRyYW5zZm9ybTogdHJhbnNsYXRlWCgtMjUwcHgpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHQucHJvZHVjdDpob3ZlciA+IC5wcm9kdWN0LW92ZXJsYXkge1xyXG5cdFx0XHRcdGJhY2tncm91bmQ6IHJnYmEoMCwgMCwgMCwgMC40NSk7XHJcblx0XHRcdFx0dHJhbnNmb3JtOiB0cmFuc2xhdGVYKDBweCk7XHJcblx0XHRcdFx0b3BhY2l0eTogMTtcclxuXHRcdFx0XHR0cmFuc2l0aW9uOiAxcyBhbGw7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdC5wcm9kdWN0ID4gaW1nIHtcclxuXHRcdFx0XHRwb3NpdGlvbjogYWJzb2x1dGU7XHJcblx0XHRcdFx0bGVmdDogMDtcclxuXHRcdFx0XHR0b3A6IDA7XHJcblx0XHRcdFx0d2lkdGg6IDEwMCU7XHJcblx0XHRcdFx0aGVpZ2h0OiAxMDAlO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHQucHJvZHVjdCA+IC5wcm9kdWN0LWltYWdlIHtcclxuXHRcdFx0XHR6LWluZGV4OiAwO1xyXG5cdFx0XHRcdHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuXHRcdFx0XHR0b3A6IDA7XHJcblx0XHRcdFx0bGVmdDogMDtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0LnByb2R1Y3QgPiAucHJvZHVjdC1vdmVybGF5ID4gLnByb2R1Y3QtbmFtZSwgXHJcblx0XHRcdC5wcm9kdWN0ID4gLnByb2R1Y3Qtb3ZlcmxheSA+IC5wcm9kdWN0LXByaWNlLFxyXG5cdFx0XHQucHJvZHVjdCA+IC5wcm9kdWN0LW92ZXJsYXkgPiAucHJvZHVjdC1kZWxpdmVyeS10aW1lIHtcclxuXHRcdFx0XHR6LWluZGV4OiAxO1xyXG5cdFx0XHRcdHBvc2l0aW9uOiByZWxhdGl2ZTtcclxuXHRcdFx0XHR0ZXh0LWFsaWduOiBjZW50ZXI7XHJcblx0XHRcdFx0bWFyZ2luLXRvcDogMjVweDtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0LnByb2R1Y3QgPiAucHJvZHVjdC1vdmVybGF5ID4gLmFjdGlvbi1idXR0b25zIHtcclxuXHRcdFx0XHR3aWR0aDogMTAwJTtcclxuXHRcdFx0XHRtYXJnaW4tdG9wOiAxMHB4O1xyXG5cdFx0XHRcdHRleHQtYWxpZ246IGNlbnRlcjtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0LnByb2R1Y3QgPiAucHJvZHVjdC1vdmVybGF5ID4gLmFjdGlvbi1idXR0b25zID4gI2Zhdm9yaXRlIHtcclxuXHRcdFx0XHRtYXJnaW4tbGVmdDogMTBweDtcclxuXHRcdFx0fVxyXG5cclxuXHRcdGA7XHJcblx0ICAgIFxyXG5cdCAgICBET00uYWRkU3R5bGUoJ2VDb21tZXJjZS1Qcm9kdWN0cycsIGNzcyk7XHJcblx0fVxyXG59XG5cbi8qKlxyXG4gKiBUaGUgU2VydmljZXMgT2JqZWN0LCBoYW5kbGVzIHRoZSBzZXJ2aWNlcy5cclxuICovXHJcbmNsYXNzIFNlcnZpY2VzIFxyXG57XHJcblxyXG59XG5cbi8qKlxyXG4gKiBUaGUgZGVmYXVsdCBzZXR0aW5ncyBvZiB0aGUgcGFnaW5hdGlvbi5cclxuICovXHJcbmxldCBkZWZhdWx0U2V0dGluZ3MkNCA9IHtcclxuXHRlbGVtZW50OiAnLnBhZ2luYXRpb24tbGlua3MnLFxyXG5cdGNsYXNzOiAnJyxcclxuXHRwZXJfcGFnZTogNSxcclxuXHR0b3RhbF9pdGVtczogMTAsXHJcbn07XHJcblxyXG4vKipcclxuICogU3RvcmVzIHRoZSBjb250YWluZXIgb2JqZWN0LlxyXG4gKi9cclxubGV0IENvbnRhaW5lciQ0O1xyXG5cclxuLyoqXHJcbiAqIFN0b3JlcyB0aGUgcHJvZHVjdHMgY29tcG9uZW50LlxyXG4gKi9cclxubGV0IFByb2R1Y3RzJDI7XHJcblxyXG4vKipcclxuICogVGhlIFBhZ2luYXRpb24gT2JqZWN0LCBoYW5kbGVzIHRoZSBwYWdpbmF0aW9uLlxyXG4gKi9cclxuY2xhc3MgUGFnaW5hdGlvbiBcclxue1xyXG5cdC8qKlxyXG5cdCAqIEluaXRpYWxpemUgdGhlIGNvbnRhaW5lciBvYmplY3QgYW5kIHRoZSBkZWZhdWx0IHNldHRpbmdzLlxyXG5cdCAqL1xyXG5cdGNvbnN0cnVjdG9yKGNvbnRhaW5lciwgcHJvZHVjdHMpIFxyXG5cdHtcclxuXHRcdHRoaXMuc2V0Q3VycmVudCgxKTtcclxuXHRcdENvbnRhaW5lciQ0ID0gY29udGFpbmVyO1xyXG5cdFx0UHJvZHVjdHMkMiA9IHByb2R1Y3RzO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogU2V0IHRoZSBQYWdpbmF0aW9uIG9iamVjdCB1cC5cclxuXHQgKi9cclxuXHRzZXR1cChzZXR0aW5ncylcclxuXHR7XHJcblx0XHRkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgZnVuY3Rpb24oKSB7XHJcblxyXG5cdFx0aWYodHlwZW9mIHNldHRpbmdzICE9ICdvYmplY3QnKSB7XHJcblx0XHRcdHRocm93IG5ldyBJbnZhbGlkQXJndW1lbnRFeGNlcHRpb24kMTtcclxuXHRcdH1cclxuXHJcblx0XHR0aGlzLnNldHRpbmdzID0gQ29tbW9uLmV4dGVuZChkZWZhdWx0U2V0dGluZ3MkNCwgc2V0dGluZ3MpO1xyXG5cclxuXHRcdHRoaXMudG90YWxQYWdlcyA9IHRoaXMuY2FsY3VsYXRlVG90YWxQYWdlcyh0aGlzLnNldHRpbmdzLnBlcl9wYWdlLCB0aGlzLnNldHRpbmdzLnRvdGFsX2l0ZW1zKTtcclxuXHRcdFxyXG5cdFx0dGhpcy5zZXRFbGVtZW50KHRoaXMuc2V0dGluZ3MuZWxlbWVudCk7XHJcblx0XHR0aGlzLnJlcGxhY2VMaW5rcyh0aGlzLmxpbmtzKTtcclxuXHJcblx0XHR9LmJpbmQodGhpcykpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogU2V0cyB0aGUgd3JhcHBlciBlbGVtZW50LlxyXG5cdCAqL1xyXG5cdHNldEVsZW1lbnQoc2VsZWN0b3IpXHJcblx0e1xyXG5cdFx0dGhpcy53cmFwcGVyID0gRE9NLmZpbmQoc2VsZWN0b3IpO1xyXG5cdFx0XHJcblx0XHRET00uYWRkQ2xhc3ModGhpcy53cmFwcGVyLCB0aGlzLnNldHRpbmdzLmNsYXNzKTtcclxuXHJcblx0XHR0aGlzLmxpbmtzID0gdGhpcy5jcmVhdGVMaW5rcygpO1xyXG5cdFx0dGhpcy5iaW5kRXZlbnRMaXN0ZW5lcnModGhpcy5saW5rcyk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBSZXBsYWNlcyB0aGUgbGlua3MgaW4gdGhlIHdyYXBwZXIuXHJcblx0ICovXHJcblx0cmVwbGFjZUxpbmtzKGxpbmtzKVxyXG5cdHtcclxuXHRcdHRoaXMud3JhcHBlci5pbm5lckhUTUwgPSAnJztcclxuXHRcdHRoaXMud3JhcHBlci5hcHBlbmRDaGlsZChsaW5rcyk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBDYWxjdWxhdGVzIHRoZSB0b3RhbCBwYWdlcy5cclxuXHQgKi9cclxuXHRjYWxjdWxhdGVUb3RhbFBhZ2VzKHBlclBhZ2UsIHRvdGFsSXRlbXMpXHJcblx0e1xyXG5cdFx0cGVyUGFnZSA9IHBhcnNlSW50KHBlclBhZ2UpO1xyXG5cdFx0dG90YWxJdGVtcyA9IHBhcnNlSW50KHRvdGFsSXRlbXMpO1xyXG5cclxuXHRcdHJldHVybiBNYXRoLmNlaWwodG90YWxJdGVtcyAvIHBlclBhZ2UpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQmluZHMgdGhlIGJ1dHRvbnMgZXZlbnRzIGxpc3RlbmVycy5cclxuXHQgKi9cclxuXHRiaW5kRXZlbnRMaXN0ZW5lcnMobGlua3MpIFxyXG5cdHtcclxuXHRcdGxldCBpbnN0YW5jZSA9IHRoaXM7XHJcblxyXG5cdFx0dGhpcy5uZXh0LmNoaWxkTm9kZXNbMF0ub25jbGljayA9IGZ1bmN0aW9uKGV2ZW50KSB7XHJcblx0XHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG5cdFx0XHRsZXQgcmVxdWVzdGVkUGFnZSA9IGluc3RhbmNlLmN1cnJlbnQrMTtcclxuXHJcblx0XHRcdGlmIChpbnN0YW5jZS5ub3RJblBhZ2VSYW5nZShyZXF1ZXN0ZWRQYWdlKSkge1xyXG5cdFx0XHRcdHRocm93IG5ldyBOb3RJblBhZ2VSYW5nZUV4Y2VwdGlvbjtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0UHJvZHVjdHMkMi5nZXRQcm9kdWN0c0J5UGFnZShyZXF1ZXN0ZWRQYWdlKS50aGVuKGZ1bmN0aW9uKHByb2R1Y3RzKSB7XHJcblx0XHRcdFx0UHJvZHVjdHMkMi5yZXBsYWNlSXRlbXMocHJvZHVjdHMpO1xyXG5cdFx0XHR9KTtcclxuXHJcblx0XHRcdGluc3RhbmNlLnNldEN1cnJlbnQocmVxdWVzdGVkUGFnZSk7XHJcblx0XHR9O1xyXG5cclxuXHRcdHRoaXMucHJldmlvdXMuY2hpbGROb2Rlc1swXS5vbmNsaWNrID0gZnVuY3Rpb24oZXZlbnQpIHtcclxuXHRcdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuXHJcblx0XHRcdGxldCByZXF1ZXN0ZWRQYWdlID0gaW5zdGFuY2UuY3VycmVudC0xO1xyXG5cclxuXHRcdFx0aWYoaW5zdGFuY2Uubm90SW5QYWdlUmFuZ2UocmVxdWVzdGVkUGFnZSkpIHtcclxuXHRcdFx0XHR0aHJvdyBuZXcgTm90SW5QYWdlUmFuZ2VFeGNlcHRpb247XHJcblx0XHRcdH1cclxuXHRcdFx0XHJcblx0XHRcdFByb2R1Y3RzJDIuZ2V0UHJvZHVjdHNCeVBhZ2UocmVxdWVzdGVkUGFnZSkudGhlbihmdW5jdGlvbihwcm9kdWN0cykge1xyXG5cdFx0XHRcdFByb2R1Y3RzJDIucmVwbGFjZUl0ZW1zKHByb2R1Y3RzKTtcclxuXHRcdFx0fSk7XHJcblxyXG5cdFx0XHRpbnN0YW5jZS5zZXRDdXJyZW50KHJlcXVlc3RlZFBhZ2UpO1xyXG5cdFx0fTtcclxuXHJcblx0XHRmb3IodmFyIGkgPSAwOyBpIDwgdGhpcy5wYWdlcy5sZW5ndGg7IGkrKykge1xyXG5cdFx0XHR0aGlzLnBhZ2VzW2ldLmNoaWxkTm9kZXNbMF0ub25jbGljayA9IGZ1bmN0aW9uKGV2ZW50KSB7XHJcblx0XHRcdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuXHRcdFx0XHRcclxuXHRcdFx0XHRsZXQgcmVxdWVzdGVkUGFnZSA9IHRoaXMuZ2V0QXR0cmlidXRlKCdkYXRhLXBhZ2UtbnInKTtcclxuXHRcdFx0XHRcclxuXHRcdFx0XHRQcm9kdWN0cyQyLmdldFByb2R1Y3RzQnlQYWdlKHJlcXVlc3RlZFBhZ2UpLnRoZW4oZnVuY3Rpb24ocHJvZHVjdHMpIHtcclxuXHRcdFx0XHRcdFByb2R1Y3RzJDIucmVwbGFjZUl0ZW1zKHByb2R1Y3RzKTtcclxuXHRcdFx0XHR9KTtcclxuXHRcdFx0XHRcclxuXHRcdFx0XHRpbnN0YW5jZS5zZXRDdXJyZW50KHJlcXVlc3RlZFBhZ2UpO1xyXG5cdFx0XHR9O1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogU2V0cyB0aGUgY3VycmVudCBwYWdlLlxyXG5cdCAqL1xyXG5cdHNldEN1cnJlbnQocGFnZU51bWJlcikgXHJcblx0e1xyXG5cdFx0dGhpcy5jdXJyZW50ID0gcGFyc2VJbnQocGFnZU51bWJlcik7XHJcblx0XHR0aGlzLmNoYW5nZVVybChwYWdlTnVtYmVyKTtcclxuXHRcdHRoaXMuc2V0QWN0aXZlTGluayhwYWdlTnVtYmVyKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEdldHMgdGhlIGN1cnJlbnQgcGFnZS5cclxuXHQgKi9cclxuXHRnZXRDdXJyZW50KCkgXHJcblx0e1xyXG5cdFx0cmV0dXJuIHRoaXMuY3VycmVudDtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIENyZWF0ZXMgdGhlIHBhZ2luYXRpb24gbGlua3MuXHJcblx0ICovXHJcblx0Y3JlYXRlTGlua3MoKSBcclxuXHR7XHJcblx0XHRsZXQgdWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd1bCcpO1xyXG5cdFx0XHJcblx0XHR0aGlzLnBhZ2VzID0gdGhpcy5jcmVhdGVQYWdlTGlua3MoKTtcclxuXHRcdHRoaXMucHJldmlvdXMgPSB0aGlzLmNyZWF0ZVByZXZpb3VzQnV0dG9uKCk7XHJcblx0XHR0aGlzLm5leHQgPSB0aGlzLmNyZWF0ZU5leHRCdXR0b24oKTtcclxuXHJcblx0XHR1bC5jbGFzc05hbWUgPSAncGFnaW5hdGlvbic7XHJcblx0XHR1bC5hcHBlbmRDaGlsZCh0aGlzLnByZXZpb3VzKTtcclxuXHJcblx0XHR0aGlzLnBhZ2VzLmZvckVhY2goZnVuY3Rpb24ocGFnZSkge1xyXG5cdFx0XHR1bC5hcHBlbmRDaGlsZChwYWdlKTtcclxuXHRcdH0pO1xyXG5cclxuXHRcdHVsLmFwcGVuZENoaWxkKHRoaXMubmV4dCk7XHJcblxyXG5cdFx0cmV0dXJuIHVsO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQ3JlYXRlcyB0aGUgcGFnZXMgaXRlbSBsaW5rcy5cclxuXHQgKi9cclxuXHRjcmVhdGVQYWdlTGlua3MoKSBcclxuXHR7XHJcblx0XHR2YXIgcGFnZXMgPSBbXTtcclxuXHJcblx0XHRmb3IodmFyIGkgPSAxOyBpIDw9IHRoaXMudG90YWxQYWdlczsgaSsrKSB7XHJcblx0XHRcdHZhciBwYWdlSXRlbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJyk7XHJcblx0XHRcdHZhciBsaW5rID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpO1xyXG5cdFx0XHRwYWdlSXRlbS5jbGFzc05hbWUgPSAodGhpcy5jdXJyZW50ID09IGkpID8gJ3BhZ2UtaXRlbSBhY3RpdmUnIDogJ3BhZ2UtaXRlbSc7XHJcblx0XHRcdGxpbmsuY2xhc3NOYW1lID0gJ3BhZ2UtbGluayc7XHJcblx0XHRcdGxpbmsuc2V0QXR0cmlidXRlKCdocmVmJywgJz9wYWdlPScrIGkpO1xyXG5cdFx0XHRsaW5rLnNldEF0dHJpYnV0ZSgnZGF0YS1wYWdlLW5yJywgaSk7XHJcblx0XHRcdGxpbmsuaW5uZXJIVE1MID0gaTtcclxuXHRcdFx0cGFnZUl0ZW0uYXBwZW5kQ2hpbGQobGluayk7XHJcblx0XHRcdHBhZ2VzLnB1c2gocGFnZUl0ZW0pO1xyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiBwYWdlcztcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIENyZWF0ZXMgdGhlIHByZXZpb3VzIGJ1dHRvbiBsaW5rLlxyXG5cdCAqL1xyXG5cdGNyZWF0ZVByZXZpb3VzQnV0dG9uKCkgXHJcblx0e1xyXG5cdFx0dmFyIGxpID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKTtcclxuXHRcdHZhciBsaW5rID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpO1xyXG5cdFx0dmFyIHNwYW4xID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xyXG5cdFx0dmFyIHNwYW4yID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xyXG5cdFx0XHJcblx0XHRcclxuXHRcdGxpLmNsYXNzTmFtZSA9ICdwYWdlLWl0ZW0nO1xyXG5cdFx0bGluay5jbGFzc05hbWUgPSAncGFnZS1saW5rJztcclxuXHRcdHNwYW4yLmNsYXNzTmFtZSA9ICdzci1vbmx5JztcclxuXHJcblx0XHRsaW5rLnNldEF0dHJpYnV0ZSgnaHJlZicsICcnKTtcclxuXHRcdGxpbmsuc2V0QXR0cmlidXRlKCdhcmlhLWxhYmVsJywgJ1ByZXZpb3VzJyk7XHJcblx0XHRzcGFuMS5zZXRBdHRyaWJ1dGUoJ2FyaWEtaGlkZGVuJywgJ3RydWUnKTtcclxuXHJcblx0XHRzcGFuMS5pbm5lckhUTUwgPSAnJmxhcXVvOyc7XHJcblx0XHRzcGFuMi5pbm5lckhUTUwgPSAnUHJldmlvdXMnO1xyXG5cclxuXHRcdGxpbmsuYXBwZW5kQ2hpbGQoc3BhbjEpO1xyXG5cdFx0bGluay5hcHBlbmRDaGlsZChzcGFuMik7XHJcblx0XHRsaS5hcHBlbmRDaGlsZChsaW5rKTtcclxuXHJcblx0XHRyZXR1cm4gbGk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBDcmVhdGVzIHRoZSBuZXh0IGJ1dHRvbiBsaW5rLlxyXG5cdCAqL1xyXG5cdGNyZWF0ZU5leHRCdXR0b24oKSBcclxuXHR7XHJcblx0XHR2YXIgbGkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaScpO1xyXG5cdFx0dmFyIGxpbmsgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJyk7XHJcblx0XHR2YXIgc3BhbjEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XHJcblx0XHR2YXIgc3BhbjIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XHJcblx0XHRcclxuXHRcdGxpLmNsYXNzTmFtZSA9ICdwYWdlLWl0ZW0nO1xyXG5cdFx0bGluay5jbGFzc05hbWUgPSAncGFnZS1saW5rJztcclxuXHRcdHNwYW4yLmNsYXNzTmFtZSA9ICdzci1vbmx5JztcclxuXHJcblx0XHRsaW5rLnNldEF0dHJpYnV0ZSgnaHJlZicsICcnKTtcclxuXHRcdGxpbmsuc2V0QXR0cmlidXRlKCdhcmlhLWxhYmVsJywgJ05leHQnKTtcclxuXHRcdHNwYW4xLnNldEF0dHJpYnV0ZSgnYXJpYS1oaWRkZW4nLCAndHJ1ZScpO1xyXG5cclxuXHRcdHNwYW4xLmlubmVySFRNTCA9ICcmcmFxdW87JztcclxuXHRcdHNwYW4yLmlubmVySFRNTCA9ICdOZXh0JztcclxuXHJcblx0XHRsaW5rLmFwcGVuZENoaWxkKHNwYW4xKTtcclxuXHRcdGxpbmsuYXBwZW5kQ2hpbGQoc3BhbjIpO1xyXG5cdFx0bGkuYXBwZW5kQ2hpbGQobGluayk7XHJcblxyXG5cdFx0cmV0dXJuIGxpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQ2hlY2tzIGlmIHRoZSBnaXZlbiBwYWdlIGlzIGluIHJhbmdlLlxyXG5cdCAqL1xyXG5cdG5vdEluUGFnZVJhbmdlKHBhZ2VOdW1iZXIpIFxyXG5cdHtcclxuXHRcdHJldHVybiAocGFnZU51bWJlciA+IHRoaXMudG90YWxQYWdlcyB8fCBwYWdlTnVtYmVyIDw9IDApIHx8IGlzTmFOKHBhZ2VOdW1iZXIpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQ2hhbmdlcyB0aGUgdXJsIHRvIGEgZ2l2ZW4gcGFnZSBudW1iZXIuXHJcblx0ICovXHJcblx0Y2hhbmdlVXJsKHBhZ2VOdW1iZXIpIFxyXG5cdHtcclxuXHRcdHBhZ2VOdW1iZXIgPSAgcGFnZU51bWJlciB8fCBHRVRfVmFycygpWydwYWdlJ107XHJcblx0XHR3aW5kb3cuaGlzdG9yeS5yZXBsYWNlU3RhdGUoJycsICcnLCB0aGlzLnVwZGF0ZVVSTFBhcmFtZXRlcih3aW5kb3cubG9jYXRpb24uaHJlZiwgJ3BhZ2UnLCBwYWdlTnVtYmVyKSk7XHJcblx0fVxyXG5cclxuXHRzZXRBY3RpdmVMaW5rKHBhZ2VOdW1iZXIpXHJcblx0e1xyXG5cdFx0Zm9yKHZhciBwYWdlIGluIHRoaXMucGFnZXMpIHtcclxuXHRcdFx0aWYgKHRoaXMucGFnZXNbcGFnZV0uY2hpbGROb2Rlc1swXS5nZXRBdHRyaWJ1dGUoJ2RhdGEtcGFnZS1ucicpID09IHBhZ2VOdW1iZXIpIHtcclxuXHRcdFx0XHRET00uYWRkQ2xhc3ModGhpcy5wYWdlc1twYWdlXSwgJ2FjdGl2ZScpO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdERPTS5yZW1vdmVDbGFzcyh0aGlzLnBhZ2VzW3BhZ2VdLCAnYWN0aXZlJyk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEdldCB0aGUgZ2V0IHZhcmlhYmxlcyBmcm9tIHRoZSB1cmwuXHJcblx0ICovXHJcblx0R0VUX1ZhcnMoKSBcclxuXHR7XHJcblx0XHR2YXIgdmFycyA9IHt9O1xyXG5cdFx0dmFyIHBhcnRzID0gd2luZG93LmxvY2F0aW9uLmhyZWYucmVwbGFjZSgvWz8mXSsoW149Jl0rKT0oW14mXSopL2dpLCBmdW5jdGlvbihtLCBrZXksIHZhbHVlKSB7XHJcblx0XHRcdHZhcnNba2V5XSA9IHZhbHVlO1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0cmV0dXJuIHZhcnM7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBNb2RpZmllcyB0aGUgZ2V0IHBhcmFtZXRlciBpbiB0aGUgdXJsLlxyXG5cdCAqL1xyXG5cdHVwZGF0ZVVSTFBhcmFtZXRlcih1cmwsIHBhcmFtLCBwYXJhbVZhbCkgXHJcblx0e1xyXG5cdCAgICB2YXIgbmV3QWRkaXRpb25hbFVSTCA9IFwiXCI7XHJcblx0ICAgIHZhciB0ZW1wQXJyYXkgPSB1cmwuc3BsaXQoXCI/XCIpO1xyXG5cdCAgICB2YXIgYmFzZVVSTCA9IHRlbXBBcnJheVswXTtcclxuXHQgICAgdmFyIGFkZGl0aW9uYWxVUkwgPSB0ZW1wQXJyYXlbMV07XHJcblx0ICAgIHZhciB0ZW1wID0gXCJcIjtcclxuXHJcblx0ICAgIGlmIChhZGRpdGlvbmFsVVJMKSB7XHJcblx0ICAgICAgICB0ZW1wQXJyYXkgPSBhZGRpdGlvbmFsVVJMLnNwbGl0KFwiJlwiKTtcclxuXHQgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGVtcEFycmF5Lmxlbmd0aDsgaSsrKXtcclxuXHQgICAgICAgICAgICBpZiAodGVtcEFycmF5W2ldLnNwbGl0KCc9JylbMF0gIT0gcGFyYW0pe1xyXG5cdCAgICAgICAgICAgICAgICBuZXdBZGRpdGlvbmFsVVJMICs9IHRlbXAgKyB0ZW1wQXJyYXlbaV07XHJcblx0ICAgICAgICAgICAgICAgIHRlbXAgPSBcIiZcIjtcclxuXHQgICAgICAgICAgICB9XHJcblx0ICAgICAgICB9XHJcblx0ICAgIH1cclxuXHJcblx0ICAgIHZhciByb3dzVGV4dCA9IHRlbXAgKyBcIlwiICsgcGFyYW0gKyBcIj1cIiArIHBhcmFtVmFsO1xyXG5cdCAgICByZXR1cm4gYmFzZVVSTCArIFwiP1wiICsgbmV3QWRkaXRpb25hbFVSTCArIHJvd3NUZXh0O1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogUmVzZXRzIHRoZSBwYWdpbmF0aW9uLlxyXG5cdCAqL1xyXG5cdHJlc2V0KCkgXHJcblx0e1xyXG5cdFx0dGhpcy5zZXRDdXJyZW50KDEpO1xyXG5cdFx0dGhpcy5jaGFuZ2VVcmwoMSk7XHJcblx0fVxyXG59XG5cbi8qKlxyXG4gKiBAZmlsZSBcclxuICogQ29va2llIGNsYXNzLlxyXG4gKlxyXG4gKiBBZGRzIHNvbWUgdXNlZnVsIGZ1bmN0aW9uYWxpdHkgZm9yXHJcbiAqIHNldHRpbmcgb3IgZ2V0dGluZyBjb29raWVzLlxyXG4gKi9cclxuXHRcclxuY2xhc3MgQ29va2llXHJcbntcclxuXHQvKipcclxuIFx0KiBTZXRzIGEgY29va2llLlxyXG4gXHQqIFxyXG4gXHQqIEBwYXJhbSBzdHJpbmcgfCBuYW1lXHJcbiBcdCogQHBhcmFtIEpTT04gfCB2YWx1ZVxyXG4gXHQqIEBwYXJhbSBpbnRlZ2VyIHwgZGF5c1xyXG4gXHQqIEByZXR1cm4gdm9pZFxyXG5cdCovXHJcblx0c3RhdGljIHNldChuYW1lLCB2YWx1ZSwgZGF5cykgXHJcblx0e1xyXG5cdFx0aWYgKHZhbHVlLmNvbnN0cnVjdG9yLm5hbWUgID09ICdPYmplY3QnIHx8IHZhbHVlLmNvbnN0cnVjdG9yLm5hbWUgPT0gJ0FycmF5Jykge1xyXG5cdFx0XHR2YWx1ZSA9IEpTT04uc3RyaW5naWZ5KHZhbHVlKTtcclxuXHRcdH1cclxuXHJcblx0XHRkYXlzID0gZGF5cyB8fCAxMDtcclxuXHJcblx0ICAgIGxldCBleHBpcmVzO1xyXG5cdCAgICBcclxuXHQgICAgaWYgKGRheXMpIHtcclxuXHQgICAgICAgIGxldCBkYXRlID0gbmV3IERhdGUoKTtcclxuXHQgICAgICAgIGRhdGUuc2V0VGltZShkYXRlLmdldFRpbWUoKSArIChkYXlzICogMjQgKiA2MCAqIDYwICogMTAwMCkpO1xyXG5cdCAgICAgICAgZXhwaXJlcyA9IFwiOyBleHBpcmVzPVwiICsgZGF0ZS50b0dNVFN0cmluZygpO1xyXG5cdCAgICB9IGVsc2Uge1xyXG5cdCAgICAgICAgZXhwaXJlcyA9IFwiXCI7XHJcblx0ICAgIH1cclxuXHJcblx0ICAgIGRvY3VtZW50LmNvb2tpZSA9IG5hbWUgKyBcIj1cIiArIHZhbHVlICsgZXhwaXJlcyArIFwiOyBwYXRoPS9cIjtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFJldHJpZXZlcyB0aGUgY29va2llIGJ5IG5hbWUuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gc3RyaW5nIHwgbmFtZVxyXG4gXHQgKiBAcmV0dXJuIEpTT05cclxuXHQgKi9cclxuXHRzdGF0aWMgZ2V0KG5hbWUpIFxyXG5cdHtcclxuXHQgICAgaWYgKGRvY3VtZW50LmNvb2tpZS5sZW5ndGggPiAwKSB7XHJcblx0ICAgICAgICBsZXQgY19zdGFydCA9IGRvY3VtZW50LmNvb2tpZS5pbmRleE9mKG5hbWUgKyBcIj1cIik7XHJcblx0ICAgICAgICBcclxuXHQgICAgICAgIGlmIChjX3N0YXJ0ICE9IC0xKSB7XHJcblx0ICAgICAgICAgICAgY19zdGFydCA9IGNfc3RhcnQgKyBuYW1lLmxlbmd0aCArIDE7XHJcblx0ICAgICAgICAgICAgbGV0IGNfZW5kID0gZG9jdW1lbnQuY29va2llLmluZGV4T2YoXCI7XCIsIGNfc3RhcnQpO1xyXG5cdCAgICAgICAgICAgIFxyXG5cdCAgICAgICAgICAgIGlmIChjX2VuZCA9PSAtMSkge1xyXG5cdCAgICAgICAgICAgICAgICBjX2VuZCA9IGRvY3VtZW50LmNvb2tpZS5sZW5ndGg7XHJcblx0ICAgICAgICAgICAgfVxyXG5cclxuXHQgICAgICAgICAgICByZXR1cm4gSlNPTi5wYXJzZSh1bmVzY2FwZShkb2N1bWVudC5jb29raWUuc3Vic3RyaW5nKGNfc3RhcnQsIGNfZW5kKSkpO1xyXG5cdCAgICAgICAgfVxyXG5cdCAgICB9XHJcblxyXG5cdCAgICByZXR1cm4ge307XHJcblx0fVxyXG59XG5cbi8qKlxyXG4gKiBUaGUgZGVmYXVsdCBzZXR0aW5ncyBvZiB0aGUgY2FydC5cclxuICovXHJcbmxldCBkZWZhdWx0U2V0dGluZ3MkNSA9IHtcclxuXHRlbGVtZW50OiAnLmNhcnQnLFxyXG5cdGNvb2tpZV9uYW1lOiAnY2FydCcsXHJcblx0cHJldmlld19jbGFzczogJycsXHJcblx0bG9hZGVyOiAnL2ltYWdlcy9pY29ucy9zcGlubmVyLnN2ZycsXHJcblx0Y2xhc3M6ICcnLFxyXG5cdHdpZHRoOiAnNjBweCcsXHJcblx0aGVpZ2h0OiAnNjBweCcsXHJcblx0cGxhY2VtZW50OiAncmlnaHQtdG9wJyxcclxuXHRmaXhlZDogdHJ1ZSxcclxuXHRob3Zlcl9jb2xvcjogJ29yYW5nZSdcclxufTtcclxuXHJcbi8qKlxyXG4gKiBTdG9yZXMgdGhlIGNvbnRhaW5lciBvYmplY3QuXHJcbiAqL1xyXG5sZXQgQ29udGFpbmVyJDU7XHJcblxyXG4vKipcclxuICogU3RvcmVzIHRoZSByZXF1ZXN0IG9iamVjdC5cclxuICovXHJcbmxldCBIdHRwJDE7XHJcblxyXG4vKipcclxuICogU3RvcmVzIHRoZSBjYXJ0IGxvYWRlci5cclxuICovXHJcbmxldCBsb2FkaW5nT3ZlcmxheTtcclxuXHJcbi8qKlxyXG4gKiBUaGUgQ2FydCBPYmplY3QsIGhhbmRsZXMgdGhlIGNhcnQgaWNvbiBhbmQgc2Vzc2lvbnMuXHJcbiAqL1xyXG5jbGFzcyBDYXJ0IFxyXG57XHJcblx0LyoqXHJcblx0ICogSW5pdGlhbGl6ZSB0aGUgZGVmYXVsdCBzZXR0aW5ncywgc2V0dGluZyB0aGUgZWxlbWVudCxcclxuXHQgKiBhbmQgY3JlYXRpbmcgdGhlIHByZXZpZXcgZm9yIHRoZSBjYXJ0cyBkZXRhaWxzLlxyXG5cdCAqL1xyXG5cdGNvbnN0cnVjdG9yKGNvbnRhaW5lciwgaHR0cCkgXHJcblx0e1xyXG5cdFx0Q29udGFpbmVyJDUgPSBjb250YWluZXI7XHJcblx0XHRIdHRwJDEgPSBodHRwO1xyXG5cdFx0XHJcblx0XHR0aGlzLnByZXZpZXdFbGVtZW50ID0gdGhpcy5jcmVhdGVQcmV2aWV3RWxlbWVudCgpO1xyXG5cdFx0dGhpcy5zdmdJY29uID0gY3JlYXRlSWNvbi5jYWxsKHRoaXMpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogU2V0cyB0aGUgb2JqZWN0IGJ5IHRoZSB1c2VycyBzZXR0aW5nLlxyXG5cdCAqL1xyXG5cdHNldHVwKHNldHRpbmdzKVxyXG5cdHtcclxuXHRcdGlmKHR5cGVvZiBzZXR0aW5ncyAhPSAnb2JqZWN0Jykge1xyXG5cdFx0XHR0aHJvdyBuZXcgSW52YWxpZEFyZ3VtZW50RXhjZXB0aW9uJDE7XHJcblx0XHR9XHJcblxyXG5cdFx0dGhpcy5zZXR0aW5ncyA9IENvbW1vbi5leHRlbmQoZGVmYXVsdFNldHRpbmdzJDUsIHNldHRpbmdzKTtcclxuXHJcblx0XHR0aGlzLnNldEVsZW1lbnQodGhpcy5zZXR0aW5ncy5lbGVtZW50KTtcclxuXHJcblx0XHRET00uYWRkQ2xhc3ModGhpcy5wcmV2aWV3RWxlbWVudCwgJ2Nsb3NlZCcpO1xyXG5cdFx0RE9NLmFkZENsYXNzKHRoaXMucHJldmlld0VsZW1lbnQsIHRoaXMuc2V0dGluZ3MucHJldmlld19jbGFzcyk7XHJcblx0XHRcclxuXHRcdHRoaXMuYmluZEV2ZW50TGlzdGVuZXJzKCk7XHJcblx0XHR0aGlzLmFkZFN0eWxlVGFnKCk7XHJcblxyXG5cdFx0aWYodGhpcy5pc0VtcHR5KENvb2tpZS5nZXQodGhpcy5zZXR0aW5ncy5jb29raWVfbmFtZSkpKSB7XHJcblx0XHRcdHRoaXMuY2FydCA9IHt9O1xyXG5cdFx0XHR0aGlzLnNldENhcnQodGhpcy5jYXJ0KTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIENoZWNrcyBpZiB0aGUgY2FydCBpcyBlbXB0eVxyXG5cdCAqL1xyXG5cdGlzRW1wdHkoY2FydClcclxuXHR7XHJcblx0XHRyZXR1cm4gQ29tbW9uLmVtcHR5T2JqZWN0KGNhcnQpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogU2V0cyB0aGUgY2FydCBhcyBhIGNvb2tpZS5cclxuXHQgKi9cclxuXHRzZXRDYXJ0KGNhcnQpXHJcblx0e1xyXG5cdFx0dGhpcy5jYXJ0LmlkID0gU3RyLnJhbmRvbSgxMCk7XHJcblx0XHR0aGlzLmNhcnQuaXRlbXMgPSBbXTtcclxuXHRcdHRoaXMuY2FydC5mYXZvcml0ZXMgPSBbXTtcclxuXHRcdENvb2tpZS5zZXQodGhpcy5zZXR0aW5ncy5jb29raWVfbmFtZSwgY2FydCwgMik7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBBZGRzIGFuIGl0ZW0gdG8gdGhlIGNhcnQuXHJcblx0ICovXHJcblx0YWRkSXRlbShpdGVtKVxyXG5cdHtcclxuXHRcdHRoaXMuY2FydCA9IENvb2tpZS5nZXQodGhpcy5zZXR0aW5ncy5jb29raWVfbmFtZSk7XHJcblxyXG5cdFx0dGhpcy5jYXJ0Lml0ZW1zLnB1c2goaXRlbSk7XHJcblxyXG5cdFx0Q29va2llLnNldCh0aGlzLnNldHRpbmdzLmNvb2tpZV9uYW1lLCB0aGlzLmNhcnQsIDIpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogUmVtb3ZlcyBhbiBpdGVtIGZyb20gdGhlIGNhcnQuXHJcblx0ICovXHJcblx0cmVtb3ZlSXRlbShpdGVtKVxyXG5cdHtcclxuIFx0XHR0aGlzLmNhcnQgPSBDb29raWUuZ2V0KHRoaXMuc2V0dGluZ3MuY29va2llX25hbWUpO1xyXG5cclxuIFx0XHR0aGlzLmNhcnQuaXRlbXMuc3BsaWNlKHRoaXMuY2FydC5pdGVtcy5pbmRleE9mKGl0ZW0pLCAxKTtcclxuXHJcbiBcdFx0Q29va2llLnNldCh0aGlzLnNldHRpbmdzLmNvb2tpZV9uYW1lLCB0aGlzLmNhcnQsIDIpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQWRkcyB0aGUgaXRlbSB0byBwcmV2aWV3LlxyXG5cdCAqL1xyXG5cdGFkZFRvUHJldmlldyhpdGVtcylcclxuXHR7XHJcblx0XHRsZXQgaXRlbXNEaXYgPSBET00uZmluZCgnLml0ZW1zJywgdGhpcy5wcmV2aWV3RWxlbWVudCk7XHJcblxyXG5cdFx0aXRlbXNEaXYuaW5uZXJIVE1MID0gJyc7XHJcblx0XHRmb3IgKGxldCBpID0gMDsgaSA8IGl0ZW1zLmxlbmd0aDsgaSsrKSB7XHJcblxyXG5cdFx0XHRsZXQgbGkgPSBET00uY3JlYXRlRWxlbWVudCgnbGknLCB7XHJcblx0XHRcdFx0XHRjbGFzczogJ2l0ZW0nXHJcblx0XHRcdFx0fSk7XHJcblxyXG5cdFx0XHRsZXQgYXR0cmlidXRlcyA9IGl0ZW1zW2ldO1xyXG5cclxuXHRcdFx0Zm9yKGxldCBhdHRyaWJ1dGUgaW4gYXR0cmlidXRlcykge1xyXG5cdFx0XHRcdGxldCBzcGFuID0gRE9NLmNyZWF0ZUVsZW1lbnQoJ3NwYW4nLCB7XHJcblx0XHRcdFx0XHR0ZXh0OiBhdHRyaWJ1dGVzW2F0dHJpYnV0ZV1cclxuXHRcdFx0XHR9KTtcclxuXHJcblx0XHRcdFx0bGkuYXBwZW5kQ2hpbGQoc3Bhbik7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGl0ZW1zRGl2LmFwcGVuZENoaWxkKGxpKTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEJpbmRzIGV2ZXJ0aGluZyB0byB0aGUgZWxlbWVudC5cclxuXHQgKi9cclxuXHRzZXRFbGVtZW50KHNlbGVjdG9yKVxyXG5cdHtcclxuXHRcdHRoaXMuaWNvbiA9IERPTS5maW5kKHNlbGVjdG9yKTtcclxuXHJcblx0XHRpZiAodGhpcy5pY29uKSB7XHJcblx0XHRcdERPTS5hZGRDbGFzcyh0aGlzLmljb24sIHRoaXMuc2V0dGluZ3MuY2xhc3MpO1xyXG5cdFx0XHRET00uYWRkQ2xhc3ModGhpcy5pY29uLCB0aGlzLnNldHRpbmdzLnBsYWNlbWVudCk7XHJcblx0XHRcdHRoaXMuaWNvbi5hcHBlbmRDaGlsZCh0aGlzLnN2Z0ljb24pO1xyXG5cdFx0XHR0aGlzLmljb24uYXBwZW5kQ2hpbGQodGhpcy5wcmV2aWV3RWxlbWVudCk7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBDcmVhdGVzIHRoZSBjYXJ0IGRldGFpbHMgcHJldmlldyBlbGVtZW50LlxyXG5cdCAqL1xyXG5cdGNyZWF0ZVByZXZpZXdFbGVtZW50KClcclxuXHR7XHJcblx0XHRsZXQgcHJldmlld0VsZW1lbnQgPSBET00uY3JlYXRlRWxlbWVudCgnZGl2Jywge1xyXG5cdFx0XHRpZDogJ3ByZXZpZXcnXHJcblx0XHR9KTtcclxuXHJcblx0XHRsZXQgdWwgPSBET00uY3JlYXRlRWxlbWVudCgndWwnLCB7XHJcblx0XHRcdFx0Y2xhc3M6ICdpdGVtcydcclxuXHRcdFx0fSk7XHJcblxyXG5cdFx0cHJldmlld0VsZW1lbnQuYXBwZW5kQ2hpbGQodWwpO1xyXG5cclxuXHRcdHJldHVybiBwcmV2aWV3RWxlbWVudDtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEFkZCB0aGUgZUNvbW1lcmNlIHN0eWxlIHRhZ3MgdG8gdGhlIERPTS5cclxuXHQgKi9cclxuXHRhZGRTdHlsZVRhZygpIFxyXG5cdHtcclxuXHRcdGlmKERPTS5maW5kKCcjZUNvbW1lcmNlLUNhcnQnKSkge1xyXG5cdFx0XHRyZXR1cm47XHJcblx0XHR9XHJcblxyXG5cdFx0bGV0IHBvc2l0aW9uID0gKHRoaXMuc2V0dGluZ3MuZml4ZWQpID8gJ2ZpeGVkJyA6ICdhYnNvbHV0ZSc7XHJcblxyXG5cdFx0bGV0IGNzcyA9IGBcclxuXHRcdFx0JHt0aGlzLnNldHRpbmdzLmVsZW1lbnR9IHtcclxuXHRcdFx0XHRwb3NpdGlvbjogJHtwb3NpdGlvbn07XHJcblx0XHRcdFx0Y3Vyc29yOiBwb2ludGVyO1xyXG5cdFx0XHRcdGNvbG9yOiAjZmZmZmZmO1xyXG5cdFx0XHRcdHotaW5kZXg6IDk5ODtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0JHt0aGlzLnNldHRpbmdzLmVsZW1lbnR9ID4gc3ZnIHtcclxuXHRcdFx0XHR3aWR0aDogJHt0aGlzLnNldHRpbmdzLndpZHRofTtcclxuXHRcdFx0XHRoZWlnaHQ6ICR7dGhpcy5zZXR0aW5ncy5oZWlnaHR9O1xyXG5cdFx0XHRcdHRyYW5zaXRpb246IGZpbGwgMC4zcztcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0JHt0aGlzLnNldHRpbmdzLmVsZW1lbnR9ID4gc3ZnOmhvdmVyIHtcclxuXHRcdFx0XHRmaWxsOiAke3RoaXMuc2V0dGluZ3MuaG92ZXJfY29sb3J9O1xyXG5cdFx0XHRcdHRyYW5zaXRpb246IGZpbGwgMC4zcztcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0JHt0aGlzLnNldHRpbmdzLmVsZW1lbnR9LnRvcC1yaWdodCxcclxuXHRcdFx0JHt0aGlzLnNldHRpbmdzLmVsZW1lbnR9LnJpZ2h0LXRvcCB7XHJcblx0XHRcdFx0cmlnaHQ6IDEwcHg7XHJcblx0XHRcdFx0dG9wOiAxMHB4O1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHQke3RoaXMuc2V0dGluZ3MuZWxlbWVudH0ubGVmdC10b3AsXHJcblx0XHRcdCR7dGhpcy5zZXR0aW5ncy5lbGVtZW50fS50b3AtbGVmdCB7XHJcblx0XHRcdFx0bGVmdDogMTBweDtcclxuXHRcdFx0XHR0b3A6IDEwcHg7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdCR7dGhpcy5zZXR0aW5ncy5lbGVtZW50fSA+ICNwcmV2aWV3IHtcclxuXHRcdFx0XHRwb3NpdGlvbjogJHtwb3NpdGlvbn07XHJcblx0XHRcdFx0ei1pbmRleDogOTk5OTtcclxuXHRcdFx0XHR0b3A6IGNhbGMoMTBweCArICR7dGhpcy5zZXR0aW5ncy5oZWlnaHR9KTtcclxuXHRcdFx0XHR0cmFuc2Zvcm06IHRyYW5zbGF0ZVgoNjBweCk7XHJcblx0XHRcdFx0aGVpZ2h0OiA0MDBweDtcclxuXHRcdFx0XHR3aWR0aDogMzAwcHg7XHJcblx0XHRcdFx0Ym9yZGVyOiAxcHggc29saWQgI2U0ZTRlNDtcclxuXHRcdFx0XHRiYWNrZ3JvdW5kOiAjZmZmZmZmO1xyXG5cdFx0XHRcdHRyYW5zaXRpb246IHRyYW5zZm9ybSAxcywgdmlzaWJpbGl0eSAxcztcclxuXHRcdFx0XHRjdXJzb3I6IGRlZmF1bHQ7XHJcblx0XHRcdFx0b3ZlcmZsb3ctWTogc2Nyb2xsO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHQke3RoaXMuc2V0dGluZ3MuZWxlbWVudH0gPiAjcHJldmlldy5vcGVuZWQge1xyXG5cdFx0XHRcdHZpc2liaWxpdHk6IHZpc2libGU7XHJcblx0XHRcdFx0dHJhbnNmb3JtOiB0cmFuc2xhdGVYKC0yNDBweCk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdCR7dGhpcy5zZXR0aW5ncy5lbGVtZW50fSA+ICNwcmV2aWV3LmNsb3NlZCB7XHJcblx0XHRcdFx0dmlzaWJpbGl0eTogaGlkZGVuO1xyXG5cdFx0XHRcdHRyYW5zZm9ybTogdHJhbnNsYXRlWCg2MHB4KTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0JHt0aGlzLnNldHRpbmdzLmVsZW1lbnR9ID4gI3ByZXZpZXcgPiB1bC5pdGVtcyxcclxuXHRcdFx0JHt0aGlzLnNldHRpbmdzLmVsZW1lbnR9ID4gI3ByZXZpZXcgPiB1bC5pdGVtcyA+IGxpLml0ZW0ge1xyXG5cdFx0XHRcdGNvbG9yOiAjMDAwMDAwO1xyXG5cdFx0XHRcdGxpc3Qtc3R5bGUtdHlwZTogbm9uZTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0LmNhcnQtbG9hZGVyLW92ZXJsYXkge1xyXG5cdFx0XHRcdHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuXHRcdFx0XHR0b3A6IDA7XHJcblx0XHRcdFx0bGVmdDogMDtcclxuXHRcdFx0XHRiYWNrZ3JvdW5kOiAjZmZmZmZmO1xyXG5cdFx0XHRcdHdpZHRoOiAxMDAlO1xyXG5cdFx0XHRcdGhlaWdodDogMTAwJTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0LmNhcnQtbG9hZGVyLW92ZXJsYXkgLmNhcnQtbG9hZGVyIHtcclxuXHRcdFx0XHRwb3NpdGlvbjogYWJzb2x1dGU7XHJcblx0XHRcdFx0d2lkdGg6IDUwcHg7XHJcblx0XHRcdFx0aGVpZ2h0OiA1MHB4O1xyXG5cdFx0XHRcdG1hcmdpbi1sZWZ0OiAtMjVweDtcclxuXHRcdFx0XHRtYXJnaW4tdG9wOiAtMjVweDtcclxuXHRcdFx0XHRsZWZ0OiA1MCU7XHJcblx0XHRcdFx0cmlnaHQ6IDUwJTtcclxuXHRcdFx0XHR0b3A6IDUwJTtcclxuXHRcdFx0XHRib3R0b206IDUwJTtcclxuXHRcdFx0fVxyXG5cdFx0YDtcclxuXHQgICAgXHJcblx0ICAgIERPTS5hZGRTdHlsZSgnZUNvbW1lcmNlLUNhcnQnLCBjc3MpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQ3JlYXRlcyBhbiBsb2FkaW5nIG92ZXJsYXkuXHJcblx0ICovXHJcblx0bG9hZGluZ092ZXJsYXkoKVxyXG5cdHtcclxuXHRcdGlmIChsb2FkaW5nT3ZlcmxheSkge1xyXG5cdFx0XHRyZXR1cm4gbG9hZGluZ092ZXJsYXk7XHJcblx0XHR9XHJcblxyXG5cdFx0bGV0IGxvYWRlciA9IERPTS5jcmVhdGVFbGVtZW50KCdpbWcnLCB7XHJcblx0XHRcdHNyYzogdGhpcy5zZXR0aW5ncy5sb2FkZXIsXHJcblx0XHRcdGNsYXNzOiAnY2FydC1sb2FkZXInXHJcblx0XHR9KTtcclxuXHJcblx0XHRsb2FkaW5nT3ZlcmxheSA9IERPTS5jcmVhdGVFbGVtZW50KCdkaXYnLCB7XHJcblx0XHRcdGNsYXNzOiAnY2FydC1sb2FkZXItb3ZlcmxheSdcclxuXHRcdH0pO1xyXG5cclxuXHRcdGxvYWRpbmdPdmVybGF5LmFwcGVuZENoaWxkKGxvYWRlcik7XHJcblxyXG5cdFx0cmV0dXJuIGxvYWRpbmdPdmVybGF5O1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogTG9hZGluZyB0aGUgY2FydCBwcmV2aWV3LlxyXG5cdCAqL1xyXG5cdHByZXZpZXdTdGFydExvYWRpbmcoKVxyXG5cdHtcclxuXHRcdHRoaXMucHJldmlld0VsZW1lbnQuYXBwZW5kQ2hpbGQodGhpcy5sb2FkaW5nT3ZlcmxheSgpKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIExvYWRpbmcgdGhlIGNhcnQgcHJldmlldy5cclxuXHQgKi9cclxuXHRwcmV2aWV3U3RvcExvYWRpbmcoKVxyXG5cdHtcclxuXHRcdGlmIChET00uZmluZCgnLmNhcnQtbG9hZGVyLW92ZXJsYXknLCB0aGlzLnByZXZpZXdFbGVtZW50KSkge1xyXG5cdFx0XHR0aGlzLnByZXZpZXdFbGVtZW50LnJlbW92ZUNoaWxkKHRoaXMubG9hZGluZ092ZXJsYXkoKSk7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBSZWxvYWRzIHRoZSBpdGVtcyBpbiB0aGUgY2FydCBwcmV2aWV3LlxyXG5cdCAqL1xyXG5cdHJlbG9hZENhcnRQcmV2aWV3KClcclxuXHR7XHJcblx0XHR0aGlzLnByZXZpZXdTdGFydExvYWRpbmcoKTtcclxuXHRcdGxldCBpdGVtcyA9IHRoaXMuZ2V0Q2FydEl0ZW1zKCk7XHJcblx0XHR0aGlzLmFkZFRvUHJldmlldyhpdGVtcyk7XHJcblx0XHRcclxuXHRcdGxldCBpbnN0YW5jZSA9IHRoaXM7XHJcblxyXG5cdFx0c2V0VGltZW91dChmdW5jdGlvbigpIHtcclxuXHRcdFx0aW5zdGFuY2UucHJldmlld1N0b3BMb2FkaW5nLmNhbGwoaW5zdGFuY2UpO1xyXG5cdFx0fSwgMjAwMCk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBCaW5kcyBldmVudCBsaXN0ZW5lcnMgdG8gdGhlIGNhcnQgaWNvbi5cclxuXHQgKi9cclxuXHRiaW5kRXZlbnRMaXN0ZW5lcnMoKVxyXG5cdHtcclxuXHRcdGlmKHRoaXMuc3ZnSWNvbiA9PSBudWxsKSB7XHJcblx0XHRcdHJldHVybjtcclxuXHRcdH1cclxuXHJcblx0XHR0aGlzLnN2Z0ljb24ub25jbGljayA9IGZ1bmN0aW9uKGUpIHtcclxuXHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdFx0XHRsZXQgb3BlbmluZyA9IERPTS50b2dnbGVDbGFzcyh0aGlzLnByZXZpZXdFbGVtZW50LCAnb3BlbmVkJywgJ2Nsb3NlZCcpO1xyXG5cdFx0XHRcclxuXHRcdFx0aWYgKG9wZW5pbmcpIHtcclxuXHRcdFx0XHR0aGlzLnJlbG9hZENhcnRQcmV2aWV3KCk7XHRcclxuXHRcdFx0fVxyXG5cdFx0fS5iaW5kKHRoaXMpO1xyXG5cclxuXHRcdEV2ZW50Lmxpc3RlbignUHJvZHVjdFdhc0FkZGVkJywgZnVuY3Rpb24oYXR0cmlidXRlcykge1xyXG5cdFx0XHRsZXQgY2FydCA9IENvb2tpZS5nZXQodGhpcy5zZXR0aW5ncy5jb29raWVfbmFtZSk7XHJcblx0XHRcdGNhcnQuaXRlbXMucHVzaChhdHRyaWJ1dGVzKTtcclxuXHRcdFx0Q29va2llLnNldCh0aGlzLnNldHRpbmdzLmNvb2tpZV9uYW1lLCBjYXJ0KTtcclxuXHRcdFx0dGhpcy5yZWxvYWRDYXJ0UHJldmlldygpO1xyXG5cdFx0fS5iaW5kKHRoaXMpKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFJldHJpZXZlIHRoZSBjYXJ0cyBpdGVtcyBmcm9tIHRoZSBjb29raWUuXHJcblx0ICovXHJcblx0Z2V0Q2FydEl0ZW1zKClcclxuXHR7XHJcblx0XHRsZXQgY2FydCA9IENvb2tpZS5nZXQodGhpcy5zZXR0aW5ncy5jb29raWVfbmFtZSk7XHJcblxyXG5cdFx0cmV0dXJuIChjYXJ0KSA/IGNhcnQuaXRlbXMgOiBbXTtcclxuXHR9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNsb3NlKGV2ZW50KSB7XHJcblx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuXHRET00uc3dpdGNoQ2xhc3Nlcyh0aGlzLnByZXZpZXdFbGVtZW50LCAnb3BlbmVkJywgJ2Nsb3NlZCcpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBjcmVhdGVJY29uKCkge1xyXG5cdGxldCBzdmcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50TlMoXCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiLCBcInN2Z1wiKTtcclxuXHRsZXQgZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnROUyhcImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIsIFwiZ1wiKTtcclxuXHRsZXQgcGF0aCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnROUyhcImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIsIFwicGF0aFwiKTtcclxuXHJcblx0c3ZnLnNldEF0dHJpYnV0ZSgndmVyc2lvbicsICcxLjEnKTtcclxuXHRzdmcuc2V0QXR0cmlidXRlKCd4bWxucycsICdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZycpO1xyXG5cdHN2Zy5zZXRBdHRyaWJ1dGUoJ3htbG5zOnhsaW5rJywgJ2h0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsnKTtcclxuXHRzdmcuc2V0QXR0cmlidXRlKCd4JywgJzBweCcpO1xyXG5cdHN2Zy5zZXRBdHRyaWJ1dGUoJ3knLCAnMHB4Jyk7XHJcblx0c3ZnLnNldEF0dHJpYnV0ZSgnd2lkdGgnLCAnNDQ2Ljg0M3B4Jyk7XHJcblx0c3ZnLnNldEF0dHJpYnV0ZSgnaGVpZ2h0JywgJzQ0Ni44NDNweCcpO1xyXG5cdHN2Zy5zZXRBdHRyaWJ1dGUoJ3ZpZXdCb3gnLCAnMCAwIDQ0Ni44NDMgNDQ2Ljg0MycpO1xyXG5cdHN2Zy5zZXRBdHRyaWJ1dGUoJ3N0eWxlJywgJ2VuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgNDQ2Ljg0MyA0NDYuODQzOycpO1xyXG5cdHN2Zy5zZXRBdHRyaWJ1dGUoJ3htbDpzcGFjZScsICdwcmVzZXJ2ZScpO1xyXG5cclxuXHRwYXRoLnNldEF0dHJpYnV0ZSgnZCcsICdNNDQ0LjA5LDkzLjEwM2MtMi42OTgtMy42OTktNy4wMDYtNS44ODgtMTEuNTg0LTUuODg4SDEwOS45MmMtMC42MjUsMC0xLjI0OSwwLjAzOC0xLjg1LDAuMTE5bC0xMy4yNzYtMzguMjdjLTEuMzc2LTMuOTU4LTQuNDA2LTcuMTEzLTguMy04LjY0NkwxOS41ODYsMTQuMTM0Yy03LjM3NC0yLjg4Ny0xNS42OTUsMC43MzUtMTguNTkxLDguMWMtMi44OTEsNy4zNjksMC43MywxNS42OTUsOC4xLDE4LjU5MWw2MC43NjgsMjMuODcybDc0LjM4MSwyMTQuMzk5Yy0zLjI4MywxLjE0NC02LjA2NSwzLjY2My03LjMzMiw3LjE4N2wtMjEuNTA2LDU5LjczOWMtMS4zMTgsMy42NjMtMC43NzUsNy43MzMsMS40NjgsMTAuOTE2YzIuMjQsMy4xODMsNS44ODMsNS4wNzgsOS43NzMsNS4wNzhoMTEuMDQ0Yy02Ljg0NCw3LjYxNi0xMS4wNDQsMTcuNjQ2LTExLjA0NCwyOC42NzVjMCwyMy43MTgsMTkuMjk4LDQzLjAxMiw0My4wMTIsNDMuMDEyczQzLjAxMi0xOS4yOTQsNDMuMDEyLTQzLjAxMmMwLTExLjAyOS00LjItMjEuMDU5LTExLjA0NC0yOC42NzVoOTMuNzc2Yy02Ljg0Nyw3LjYxNi0xMS4wNDgsMTcuNjQ2LTExLjA0OCwyOC42NzVjMCwyMy43MTgsMTkuMjk0LDQzLjAxMiw0My4wMTMsNDMuMDEyYzIzLjcxOCwwLDQzLjAxMi0xOS4yOTQsNDMuMDEyLTQzLjAxMmMwLTExLjAyOS00LjItMjEuMDU5LTExLjA0My0yOC42NzVoMTMuNDMzYzYuNTk5LDAsMTEuOTQ3LTUuMzQ5LDExLjk0Ny0xMS45NDhjMC02LjU5OS01LjM0OS0xMS45NDctMTEuOTQ3LTExLjk0N0gxNDMuNjQ3bDEzLjMxOS0zNi45OTZjMS43MiwwLjcyNCwzLjU3OCwxLjE1Miw1LjUyMywxLjE1MmgyMTAuMjc4YzYuMjM0LDAsMTEuNzUxLTQuMDI3LDEzLjY1LTkuOTU5bDU5LjczOS0xODYuMzg3QzQ0Ny41NTcsMTAxLjU2Nyw0NDYuNzg4LDk2LjgwMiw0NDQuMDksOTMuMTAzeiBNMTY5LjY1OSw0MDkuODA3Yy0xMC41NDMsMC0xOS4xMTYtOC41NzMtMTkuMTE2LTE5LjExNnM4LjU3My0xOS4xMTcsMTkuMTE2LTE5LjExN3MxOS4xMTYsOC41NzQsMTkuMTE2LDE5LjExN1MxODAuMjAyLDQwOS44MDcsMTY5LjY1OSw0MDkuODA3eiBNMzI3LjM2Nyw0MDkuODA3Yy0xMC41NDMsMC0xOS4xMTctOC41NzMtMTkuMTE3LTE5LjExNnM4LjU3NC0xOS4xMTcsMTkuMTE3LTE5LjExN2MxMC41NDIsMCwxOS4xMTYsOC41NzQsMTkuMTE2LDE5LjExN1MzMzcuOTA5LDQwOS44MDcsMzI3LjM2Nyw0MDkuODA3eiBNNDAyLjUyLDE0OC4xNDloLTczLjE2MVYxMTUuODloODMuNDk5TDQwMi41MiwxNDguMTQ5eiBNMzgxLjQ1MywyMTMuODYxaC01Mi4wOTR2LTM3LjAzOGg2My45NjdMMzgxLjQ1MywyMTMuODYxeiBNMjM0LjU3MSwyMTMuODYxdi0zNy4wMzhoNjYuMTEzdjM3LjAzOEgyMzQuNTcxeiBNMzAwLjY4NCwyNDIuNTM4djMxLjA2NGgtNjYuMTEzdi0zMS4wNjRIMzAwLjY4NHogTTEzOS4xMTUsMTc2LjgyM2g2Ni43ODR2MzcuMDM4aC01My45MzNMMTM5LjExNSwxNzYuODIzeiBNMjM0LjU3MSwxNDguMTQ5VjExNS44OWg2Ni4xMTN2MzIuMjU5SDIzNC41NzF6IE0yMDUuODk4LDExNS44OXYzMi4yNTloLTc2LjczNGwtMTEuMTkxLTMyLjI1OUgyMDUuODk4eiBNMTYxLjkxNiwyNDIuNTM4aDQzLjk4MnYzMS4wNjRoLTMzLjIwNkwxNjEuOTE2LDI0Mi41Mzh6IE0zMjkuMzU5LDI3My42MDN2LTMxLjA2NGg0Mi45MDlsLTkuOTU1LDMxLjA2NEgzMjkuMzU5eicpO1xyXG5cclxuXHRnLmFwcGVuZENoaWxkKHBhdGgpO1xyXG5cdHN2Zy5hcHBlbmRDaGlsZChnKTtcclxuXHJcblx0cmV0dXJuIHN2ZztcclxufVxuXG5sZXQgaW5pdGFsaXplZCA9IGZhbHNlO1xuXG5sZXQgZGVmYXVsdFNldHRpbmdzID0ge1xuXHRlbGVtZW50OiAnYm9keScsXG5cdGltcG9ydEJvb3RzdHJhcDogZmFsc2UsXG5cdGNvbXBvbmVudHM6IFsnUHJvZHVjdHMnLCAnU2VydmljZXMnLCAnRmlsdGVyJywgJ1BhZ2luYXRpb24nLCAnQ2FydCddXG59O1xuXG5jbGFzcyBlQ29tbWVyY2Vcbntcblx0Y29uc3RydWN0b3Ioc2V0dGluZ3MpXG5cdHtcblx0XHRFeGNlcHRpb25IYW5kbGVyLmluaXRhbGl6ZSgpO1xuXG5cdFx0aWYodHlwZW9mIHNldHRpbmdzICE9ICdvYmplY3QnKSB7XG5cdFx0XHR0aHJvdyBuZXcgSW52YWxpZEFyZ3VtZW50RXhjZXB0aW9uJDE7XG5cdFx0fVxuXG5cdFx0dGhpcy5jb250YWluZXIgPSBuZXcgQ29udGFpbmVyO1xuXHRcdHRoaXMuc2V0dGluZ3MgPSBDb21tb24uZXh0ZW5kKGRlZmF1bHRTZXR0aW5ncywgc2V0dGluZ3MpO1xuXHRcdHRoaXMuc2V0dGluZ3MuZWxlbWVudCA9IERPTS5maW5kKHRoaXMuc2V0dGluZ3MuZWxlbWVudCk7XG5cdFx0XG5cdFx0YmluZENvbXBvbmVudHNEZXBlbmRlbmNpZXMuY2FsbCh0aGlzLCBzZXR0aW5ncy5jb21wb25lbnRzKTtcblxuXHRcdGluaXRhbGl6ZWQgPSB0cnVlO1xuXG5cdFx0cmV0dXJuIG5ldyBQcm94eSh0aGlzLCB7XG5cdFx0XHRnZXQ6IGZ1bmN0aW9uKHRhcmdldCwgb2JqZWN0KSB7XG5cdFx0XHRcdGlmKCEgQ29tbW9uLmluX2FycmF5KG9iamVjdCwgc2V0dGluZ3MuY29tcG9uZW50cykpIHtcblx0XHRcdFx0XHR0aHJvdyBuZXcgQ29tcG9uZW50Tm90UmVnaXN0ZXJlZEV4Y2VwdGlvbjtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdHJldHVybiB0YXJnZXQuY29udGFpbmVyLm1ha2Uob2JqZWN0KTtcblx0XHRcdH1cblx0XHR9KTtcblx0fVxufVxuXG4vKipcbiAqIEJpbmRzIGNvbXBvbmVudHMgZGVwZW5kZW5jaWVzLlxuICovXG5mdW5jdGlvbiBiaW5kQ29tcG9uZW50c0RlcGVuZGVuY2llcyhjb21wb25lbnRzKSB7XG5cblx0bGV0IHJlcXVlc3QgPSB0aGlzLmNvbnRhaW5lci5tYWtlKG5ldyBSZXF1ZXN0KTtcblxuXHR0aGlzLmNvbnRhaW5lci5iaW5kKCdGaWx0ZXInLCBmdW5jdGlvbihjb250YWluZXIpIHtcblx0XHRjb250YWluZXJbJ0ZpbHRlciddLmJvb3RlZCA9IHRydWU7XG5cdFx0cmV0dXJuIG5ldyBGaWx0ZXIoY29udGFpbmVyKTtcblx0fSk7XG5cdFxuXHR0aGlzLmNvbnRhaW5lci5iaW5kKCdTZXJ2aWNlcycsIGZ1bmN0aW9uKGNvbnRhaW5lcikgeyBcblx0XHRjb250YWluZXJbJ1NlcnZpY2VzJ10uYm9vdGVkID0gdHJ1ZTtcblx0XHRyZXR1cm4gbmV3IFNlcnZpY2VzKGNvbnRhaW5lcik7XG5cdH0pO1xuXG5cdHRoaXMuY29udGFpbmVyLmJpbmQoJ1Byb2R1Y3RzJywgZnVuY3Rpb24oY29udGFpbmVyKSB7XG5cdFx0Y29udGFpbmVyWydQcm9kdWN0cyddLmJvb3RlZCA9IHRydWU7XG5cdFx0cmV0dXJuIG5ldyBQcm9kdWN0cyhjb250YWluZXIsIHJlcXVlc3QpO1xuXHR9KTtcblxuXHR0aGlzLmNvbnRhaW5lci5iaW5kKCdQYWdpbmF0aW9uJywgZnVuY3Rpb24oY29udGFpbmVyKSB7XG5cdFx0Y29udGFpbmVyWydQYWdpbmF0aW9uJ10uYm9vdGVkID0gdHJ1ZTtcblx0XHRyZXR1cm4gbmV3IFBhZ2luYXRpb24oY29udGFpbmVyLCBjb250YWluZXIubWFrZSgnUHJvZHVjdHMnKSk7XG5cdH0pO1xuXG5cdHRoaXMuY29udGFpbmVyLmJpbmQoJ0NhcnQnLCBmdW5jdGlvbihjb250YWluZXIpIHtcblx0XHRjb250YWluZXJbJ0NhcnQnXS5ib290ZWQgPSB0cnVlO1xuXHRcdHJldHVybiBuZXcgQ2FydChjb250YWluZXIsIHJlcXVlc3QpO1xuXHR9KTtcblxuXHR0aGlzLmNvbnRhaW5lclsnRmlsdGVyJ11bJ2Jvb3RlZCddID0gZmFsc2U7XG5cdHRoaXMuY29udGFpbmVyWydTZXJ2aWNlcyddWydib290ZWQnXSA9IGZhbHNlO1xuXHR0aGlzLmNvbnRhaW5lclsnUHJvZHVjdHMnXVsnYm9vdGVkJ10gPSBmYWxzZTtcblx0dGhpcy5jb250YWluZXJbJ1BhZ2luYXRpb24nXVsnYm9vdGVkJ10gPSBmYWxzZTtcblx0dGhpcy5jb250YWluZXJbJ0NhcnQnXVsnYm9vdGVkJ10gPSBmYWxzZTtcbn1cblxucmV0dXJuIGVDb21tZXJjZTtcblxufSgpKTtcbiJdfQ==
