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

	var InvalidDataStructureException = function (_Error2) {
		_inherits(InvalidDataStructureException, _Error2);

		function InvalidDataStructureException() {
			_classCallCheck(this, InvalidDataStructureException);

			return _possibleConstructorReturn(this, (InvalidDataStructureException.__proto__ || Object.getPrototypeOf(InvalidDataStructureException)).call(this));
		}

		return InvalidDataStructureException;
	}(Error);

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

			/**
    * Makes a GET ajax request.
    * 
    * @param object | options
    * @return Promise
    */

		}, {
			key: 'get',
			value: function get(options) {
				var xhr = this.xhr;

				if (options.hasOwnProperty('before') && typeof options.before == 'function') {
					options.before.call(this);
				}

				return new Promise(function (resolve, reject) {
					if ((typeof options === 'undefined' ? 'undefined' : _typeof(options)) !== 'object') {
						throw new Error('get expecting a json object to be passed as an argument, but ' + (typeof options === 'undefined' ? 'undefined' : _typeof(options)) + ' was passed.');
					}

					options.data = options.data || {};

					if (_typeof(options.data) !== 'object') {
						throw new Error('data property expecting a json object to be passed as an argument, but ' + _typeof(options.data) + ' was passed.');
					}

					xhr.open('GET', options.url, true);

					xhr.responseType = options.dataType || 'json';
					xhr.timeout = options.timeout || 3000;

					xhr.onreadystatechange = function () {
						if (this.readyState != 4 || this.status != 200) {
							return;
						}

						resolve(this.response);

						if (options.hasOwnProperty('after') && typeof options.after == 'function') {
							options.after.call(this);
						}
					};

					xhr.onerror = function (message) {
						options.error(message);
						reject(message);
					};

					if (!options.data) {
						xhr.send(null);
					}

					var queryString = Object.keys(options.data).map(function (key) {
						return encodeURIComponent(key) + '=' + encodeURIComponent(options.data[key]);
					}).join('&');

					xhr.send(queryString);
				});
			}
		}]);

		return Request;
	}();

	var InvalidBindingException = function (_Error3) {
		_inherits(InvalidBindingException, _Error3);

		function InvalidBindingException() {
			_classCallCheck(this, InvalidBindingException);

			var _this3 = _possibleConstructorReturn(this, (InvalidBindingException.__proto__ || Object.getPrototypeOf(InvalidBindingException)).call(this));

			console.error('InvalidBindingException, trying to bind an already existing bound.');
			return _this3;
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

	var ComponentsException = function (_Error4) {
		_inherits(ComponentsException, _Error4);

		function ComponentsException() {
			_classCallCheck(this, ComponentsException);

			var _this4 = _possibleConstructorReturn(this, (ComponentsException.__proto__ || Object.getPrototypeOf(ComponentsException)).call(this));

			console.error('ComponentsException, expecting for at least one components, but none was given, \n\t\t\t\t\t\t\t\tplease add at least one requirement(Products, Services or/and Filter.');
			return _this4;
		}

		return ComponentsException;
	}(Error);

	var BadEventCallException$1 = function (_Error5) {
		_inherits(BadEventCallException$1, _Error5);

		function BadEventCallException$1() {
			_classCallCheck(this, BadEventCallException$1);

			var _this5 = _possibleConstructorReturn(this, (BadEventCallException$1.__proto__ || Object.getPrototypeOf(BadEventCallException$1)).call(this));

			console.error('BadEventCallException, listening to a none-existing event.');
			return _this5;
		}

		return BadEventCallException$1;
	}(Error);

	var NotInPageRangeException = function (_Error6) {
		_inherits(NotInPageRangeException, _Error6);

		function NotInPageRangeException() {
			_classCallCheck(this, NotInPageRangeException);

			var _this6 = _possibleConstructorReturn(this, (NotInPageRangeException.__proto__ || Object.getPrototypeOf(NotInPageRangeException)).call(this));

			console.error('NotInPageRangeException, sorry, no more pages.');
			return _this6;
		}

		return NotInPageRangeException;
	}(Error);

	var ComponentNotRegisteredException = function (_Error7) {
		_inherits(ComponentNotRegisteredException, _Error7);

		function ComponentNotRegisteredException() {
			_classCallCheck(this, ComponentNotRegisteredException);

			var _this7 = _possibleConstructorReturn(this, (ComponentNotRegisteredException.__proto__ || Object.getPrototypeOf(ComponentNotRegisteredException)).call(this));

			console.error('ComponentNotRegisteredException, components must be registered in order to use them.');
			return _this7;
		}

		return ComponentNotRegisteredException;
	}(Error);

	var ExceptionHandler = function (_Error8) {
		_inherits(ExceptionHandler, _Error8);

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

						instance.getProducts(1).then(function (products) {
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

					this.currentItems = items;

					for (var i = 0; i < this.currentItems.length; i++) {
						var product = this.currentItems[i];
						this.AfterLoaded.call(this, product);
					}

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
				var pageNumber = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

				var action = pageNumber ? this.settings.url + '?page=' + pageNumber : this.settings.url;

				return Http.get({
					url: action
				});
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

					Products$2.getProducts(requestedPage).then(function (products) {
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

					Products$2.getProducts(requestedPage).then(function (products) {
						Products$2.replaceItems(products);
					});

					instance.setCurrent(requestedPage);
				};

				for (var i = 0; i < this.pages.length; i++) {
					this.pages[i].childNodes[0].onclick = function (event) {
						event.preventDefault();

						var requestedPage = this.getAttribute('data-page-nr');

						Products$2.getProducts(requestedPage).then(function (products) {
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
  * Stores the items wrapper.
  */
	var itemsDiv = void 0;

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

				itemsDiv = DOM.createElement('ul', {
					class: 'items'
				});

				previewElement.appendChild(itemsDiv);

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

				var css = '\n\t\t\t' + this.settings.element + ' {\n\t\t\t\tposition: ' + position + ';\n\t\t\t\tcursor: pointer;\n\t\t\t\tcolor: #ffffff;\n\t\t\t\tz-index: 998;\n\t\t\t}\n\n\t\t\t' + this.settings.element + ' > svg {\n\t\t\t\twidth: ' + this.settings.width + ';\n\t\t\t\theight: ' + this.settings.height + ';\n\t\t\t\ttransition: fill 0.3s;\n\t\t\t}\n\n\t\t\t' + this.settings.element + ' > svg:hover {\n\t\t\t\tfill: ' + this.settings.hover_color + ';\n\t\t\t\ttransition: fill 0.3s;\n\t\t\t}\n\n\t\t\t' + this.settings.element + '.top-right,\n\t\t\t' + this.settings.element + '.right-top {\n\t\t\t\tright: 10px;\n\t\t\t\ttop: 10px;\n\t\t\t}\n\n\t\t\t' + this.settings.element + '.left-top,\n\t\t\t' + this.settings.element + '.top-left {\n\t\t\t\tleft: 10px;\n\t\t\t\ttop: 10px;\n\t\t\t}\n\n\t\t\t' + this.settings.element + ' > #preview {\n\t\t\t\tposition: ' + position + ';\n\t\t\t\tz-index: 9999;\n\t\t\t\ttop: calc(10px + ' + this.settings.height + ');\n\t\t\t\ttransform: translateX(60px);\n\t\t\t\theight: 400px;\n\t\t\t\twidth: 300px;\n\t\t\t\tborder: 1px solid #e4e4e4;\n\t\t\t\tbackground: #ffffff;\n\t\t\t\ttransition: transform 1s, visibility 1s;\n\t\t\t\tcursor: default;\n\t\t\t\toverflow-Y: scroll;\n\t\t\t}\n\n\t\t\t' + this.settings.element + ' > #preview.opened {\n\t\t\t\tvisibility: visible;\n\t\t\t\ttransform: translateX(-240px);\n\t\t\t}\n\n\t\t\t' + this.settings.element + ' > #preview.closed {\n\t\t\t\tvisibility: hidden;\n\t\t\t\ttransform: translateX(60px);\n\t\t\t}\n\n\t\t\t' + this.settings.element + ' > #preview > ul.items,\n\t\t\t' + this.settings.element + ' > #preview > ul.items > li.item {\n\t\t\t\tcolor: #000000;\n\t\t\t\tlist-style-type: none;\n\t\t\t}\n\n\t\t\t' + this.settings.element + ' .items.loading {\n\t\t\t\tdisplay: none;\n\t\t\t\toverflow-Y: none;\n\t\t\t}\n\n\t\t\t' + this.settings.element + ' .cart-loader-overlay {\n\t\t\t\tposition: fixed;\n\t\t\t\ttop: 0; \n\t\t\t    left: 0;\n\t\t\t    right: 0;\n\t\t\t    bottom: 0;\n\t\t\t\tbackground: #ffffff;\n\t\t\t\twidth: 100%;\n\t\t\t\theight: 100%;\n\t\t\t\tmin-height: 100%;\n\t\t\t\toverflow: auto;\n\t\t\t}\n\n\t\t\t' + this.settings.element + ' .cart-loader-overlay .cart-loader {\n\t\t\t\tposition: absolute;\n\t\t\t\twidth: 50px;\n\t\t\t\theight: 50px;\n\t\t\t\tmargin-left: -25px;\n\t\t\t\tmargin-top: -25px;\n\t\t\t\tleft: 50%;\n\t\t\t\tright: 50%;\n\t\t\t\ttop: 50%;\n\t\t\t\tbottom: 50%;\n\t\t\t}\n\t\t';

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
				DOM.addClass(itemsDiv, 'loading');
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
					DOM.removeClass(itemsDiv, 'loading');
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
				}, 1000);
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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVDb21tZXJjZS5qcyJdLCJuYW1lcyI6WyJlQ29tbWVyY2UiLCJJbnZhbGlkQXJndW1lbnRFeGNlcHRpb24kMSIsImNvbnNvbGUiLCJlcnJvciIsIkVycm9yIiwiRE9NIiwic3RyaW5nIiwicmVwbGFjZSIsImVsZW1lbnQiLCJjbGFzc05hbWUiLCJuZXdDbGFzc05hbWUiLCJyZW1vdmVDbGFzcyIsImFkZENsYXNzIiwidW5kZWZpbmVkIiwiY2xhc3NOYW1lcyIsInNwbGl0IiwiZm9yRWFjaCIsIm5hbWUiLCJjbGFzc0xpc3QiLCJhZGQiLCJyZW1vdmUiLCJpZCIsImNzcyIsImhlYWQiLCJkb2N1bWVudCIsImdldEVsZW1lbnRzQnlUYWdOYW1lIiwic3R5bGVUYWciLCJjcmVhdGVFbGVtZW50IiwiQ1NTIiwibWluaWZ5Q3NzIiwiaW5uZXJIVE1MIiwic2V0QXR0cmlidXRlIiwiYXBwZW5kQ2hpbGQiLCJlbGVtZW50VHlwZSIsIm9wdGlvbnMiLCJvcHRpb24iLCJzZWNvbmRDbGFzc05hbWUiLCJ0b2dnbGUiLCJzZWxlY3RvciIsImNvbnRleHQiLCJ3aW5kb3ciLCJxdWVyeUVsZW1lbnQiLCJwYXJlbnRFbGVtZW50IiwicXVlcnlTZWxlY3RvckFsbCIsImxlbmd0aCIsImhhc0NoaWxkIiwiY2hpbGRFbGVtZW50Iiwibm9kZSIsInBhcmVudE5vZGUiLCJldmVudHMiLCJFdmVudCIsImNhbGxiYWNrIiwiSW52YWxpZEFyZ3VtZW50RXhjZXB0aW9uIiwicHVzaCIsImRhdGEiLCJCYWRFdmVudENhbGxFeGNlcHRpb24iLCJDb21tb24iLCJjdXJyZW50T2JqZWN0IiwibmV3T2JqZWN0IiwiZXh0ZW5kZWQiLCJwcm9wIiwiT2JqZWN0IiwicHJvdG90eXBlIiwiaGFzT3duUHJvcGVydHkiLCJjYWxsIiwibmVlZGxlIiwiaHlzdGFjayIsImNvbnN0cnVjdG9yIiwiQXJyYXkiLCJpIiwib2JqZWN0IiwiSW52YWxpZERhdGFTdHJ1Y3R1cmVFeGNlcHRpb24iLCJkZWZhdWx0U2V0dGluZ3MkMSIsImhlYWRlcnMiLCJhc3luYyIsIlJlcXVlc3QiLCJzZXR0aW5ncyIsInhociIsIlhNTEh0dHBSZXF1ZXN0IiwiQWN0aXZlWE9iamVjdCIsImV4dGVuZCIsInNldERlZmF1bHRSZXF1ZXN0SGVhZGVyIiwiaGVhZGVyIiwib3BlbiIsInNldFJlcXVlc3RIZWFkZXIiLCJyZXNwb25zZSIsImFwcGx5IiwiYXJndW1lbnRzIiwidXJsIiwiYmVmb3JlIiwib25yZWFkeXN0YXRlY2hhbmdlIiwicmVhZHlTdGF0ZSIsInN0YXR1cyIsInN1Y2Nlc3MiLCJKU09OIiwicGFyc2UiLCJhZnRlciIsIm9uZXJyb3IiLCJtZXNzYWdlIiwiYSIsImIiLCJzZW5kIiwicXVlcnlTdHJpbmciLCJrZXlzIiwibWFwIiwia2V5IiwiZW5jb2RlVVJJQ29tcG9uZW50Iiwiam9pbiIsIlByb21pc2UiLCJyZXNvbHZlIiwicmVqZWN0IiwicmVzcG9uc2VUeXBlIiwiZGF0YVR5cGUiLCJ0aW1lb3V0IiwiSW52YWxpZEJpbmRpbmdFeGNlcHRpb24iLCJpbnN0YW5jZXMiLCJDb250YWluZXIiLCJjb25jcmV0ZSIsImJpbmQiLCJpbnN0YW5jZSIsImluc3RhbmNlRXhpc3QiLCJnZXRJbnN0YW5jZSIsInNldEluc3RhbmNlIiwiQ29tcG9uZW50c0V4Y2VwdGlvbiIsIkJhZEV2ZW50Q2FsbEV4Y2VwdGlvbiQxIiwiTm90SW5QYWdlUmFuZ2VFeGNlcHRpb24iLCJDb21wb25lbnROb3RSZWdpc3RlcmVkRXhjZXB0aW9uIiwiRXhjZXB0aW9uSGFuZGxlciIsInNvdXJjZSIsImxpbmVubyIsImNvbG5vIiwiZGVmYXVsdFNldHRpbmdzJDIiLCJjbGFzcyIsIndpZHRoIiwiaGVpZ2h0IiwiQ29udGFpbmVyJDIiLCJGaWx0ZXIiLCJjb250YWluZXIiLCJzZXRFbGVtZW50Iiwid3JhcHBlciIsImZpbmQiLCJTdHIiLCJ0b0xvd2VyQ2FzZSIsInBvc3NpYmxlIiwiY2hhckF0IiwiTWF0aCIsImZsb29yIiwicmFuZG9tIiwiZGVmYXVsdFNldHRpbmdzJDMiLCJpdGVtX2NsYXNzIiwiYWRkX2J1dHRvbl9jbGFzcyIsImZhdm9yaXRlX2J1dHRvbl9jbGFzcyIsImF0dHJpYnV0ZXMiLCJDb250YWluZXIkMyIsIkh0dHAiLCJQcm9kdWN0cyIsImh0dHAiLCJhZGRFdmVudExpc3RlbmVyIiwiYWRkU3R5bGVUYWciLCJQYWdpbmF0aW9uIiwiYm9vdGVkIiwiZ2V0UHJvZHVjdHMiLCJ0aGVuIiwicHJvZHVjdHMiLCJyZXBsYWNlSXRlbXMiLCJsb2FkQWxsUHJvZHVjdHMiLCJyZXF1ZXN0IiwiaXRlbXMiLCJjdXJyZW50SXRlbXMiLCJwcm9kdWN0IiwiQWZ0ZXJMb2FkZWQiLCJ0cmlnZ2VyIiwiY2F0Y2giLCJpc0FycmF5IiwiYnVpbGRQcm9kdWN0cyIsInBhZ2VOdW1iZXIiLCJhY3Rpb24iLCJnZXQiLCJhdHRyaWJ1dGVzQ29sbGVjdGlvbiIsInRhZ1R5cGUiLCJidWlsdFByb2R1Y3RzIiwiYnVpbHRQcm9kdWN0IiwiYnVpbGRQcm9kdWN0Iiwib3ZlcmxheSIsImF0dHJpYnV0ZSIsImluX2FycmF5IiwidGFnIiwiaW1hZ2UiLCJzcmMiLCJrZWJhYkNhc2UiLCJhZGRUb0NhcnQiLCJ0eXBlIiwidGV4dCIsImZhdm9yaXRlIiwiZXZlbnQiLCJwcmV2ZW50RGVmYXVsdCIsImFkZFN0eWxlIiwiU2VydmljZXMiLCJkZWZhdWx0U2V0dGluZ3MkNCIsInBlcl9wYWdlIiwidG90YWxfaXRlbXMiLCJDb250YWluZXIkNCIsIlByb2R1Y3RzJDIiLCJzZXRDdXJyZW50IiwidG90YWxQYWdlcyIsImNhbGN1bGF0ZVRvdGFsUGFnZXMiLCJyZXBsYWNlTGlua3MiLCJsaW5rcyIsImNyZWF0ZUxpbmtzIiwiYmluZEV2ZW50TGlzdGVuZXJzIiwicGVyUGFnZSIsInRvdGFsSXRlbXMiLCJwYXJzZUludCIsImNlaWwiLCJuZXh0IiwiY2hpbGROb2RlcyIsIm9uY2xpY2siLCJyZXF1ZXN0ZWRQYWdlIiwiY3VycmVudCIsIm5vdEluUGFnZVJhbmdlIiwicHJldmlvdXMiLCJwYWdlcyIsImdldEF0dHJpYnV0ZSIsImNoYW5nZVVybCIsInNldEFjdGl2ZUxpbmsiLCJ1bCIsImNyZWF0ZVBhZ2VMaW5rcyIsImNyZWF0ZVByZXZpb3VzQnV0dG9uIiwiY3JlYXRlTmV4dEJ1dHRvbiIsInBhZ2UiLCJwYWdlSXRlbSIsImxpbmsiLCJsaSIsInNwYW4xIiwic3BhbjIiLCJpc05hTiIsIkdFVF9WYXJzIiwiaGlzdG9yeSIsInJlcGxhY2VTdGF0ZSIsInVwZGF0ZVVSTFBhcmFtZXRlciIsImxvY2F0aW9uIiwiaHJlZiIsInZhcnMiLCJwYXJ0cyIsIm0iLCJ2YWx1ZSIsInBhcmFtIiwicGFyYW1WYWwiLCJuZXdBZGRpdGlvbmFsVVJMIiwidGVtcEFycmF5IiwiYmFzZVVSTCIsImFkZGl0aW9uYWxVUkwiLCJ0ZW1wIiwicm93c1RleHQiLCJDb29raWUiLCJkYXlzIiwic3RyaW5naWZ5IiwiZXhwaXJlcyIsImRhdGUiLCJEYXRlIiwic2V0VGltZSIsImdldFRpbWUiLCJ0b0dNVFN0cmluZyIsImNvb2tpZSIsImNfc3RhcnQiLCJpbmRleE9mIiwiY19lbmQiLCJ1bmVzY2FwZSIsInN1YnN0cmluZyIsImRlZmF1bHRTZXR0aW5ncyQ1IiwiY29va2llX25hbWUiLCJwcmV2aWV3X2NsYXNzIiwibG9hZGVyIiwicGxhY2VtZW50IiwiZml4ZWQiLCJob3Zlcl9jb2xvciIsIkNvbnRhaW5lciQ1IiwiSHR0cCQxIiwibG9hZGluZ092ZXJsYXkiLCJpdGVtc0RpdiIsIkNhcnQiLCJwcmV2aWV3RWxlbWVudCIsImNyZWF0ZVByZXZpZXdFbGVtZW50Iiwic3ZnSWNvbiIsImNyZWF0ZUljb24iLCJpc0VtcHR5IiwiY2FydCIsInNldENhcnQiLCJlbXB0eU9iamVjdCIsImZhdm9yaXRlcyIsInNldCIsIml0ZW0iLCJzcGxpY2UiLCJzcGFuIiwiaWNvbiIsInBvc2l0aW9uIiwicmVtb3ZlQ2hpbGQiLCJwcmV2aWV3U3RhcnRMb2FkaW5nIiwiZ2V0Q2FydEl0ZW1zIiwiYWRkVG9QcmV2aWV3Iiwic2V0VGltZW91dCIsInByZXZpZXdTdG9wTG9hZGluZyIsImUiLCJvcGVuaW5nIiwidG9nZ2xlQ2xhc3MiLCJyZWxvYWRDYXJ0UHJldmlldyIsImxpc3RlbiIsImNsb3NlIiwic3dpdGNoQ2xhc3NlcyIsInN2ZyIsImNyZWF0ZUVsZW1lbnROUyIsImciLCJwYXRoIiwiaW5pdGFsaXplZCIsImRlZmF1bHRTZXR0aW5ncyIsImltcG9ydEJvb3RzdHJhcCIsImNvbXBvbmVudHMiLCJpbml0YWxpemUiLCJiaW5kQ29tcG9uZW50c0RlcGVuZGVuY2llcyIsIlByb3h5IiwidGFyZ2V0IiwibWFrZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFBQSxJQUFJQSxZQUFhLFlBQVk7QUFDN0I7O0FBRDZCLEtBR3ZCQywwQkFIdUI7QUFBQTs7QUFLNUIsd0NBQ0E7QUFBQTs7QUFBQTs7QUFFSUMsV0FBUUMsS0FBUjtBQUZKO0FBR0k7O0FBVHdCO0FBQUEsR0FHWUMsS0FIWjs7QUFZN0I7Ozs7Ozs7O0FBWjZCLEtBb0J2QkMsR0FwQnVCO0FBQUE7QUFBQTtBQUFBOztBQUFBO0FBQUE7O0FBc0I1Qjs7Ozs7O0FBdEI0Qiw2QkE0QlhDLE1BNUJXLEVBNkI1QjtBQUNJQSxhQUFTQSxPQUFPQyxPQUFQLENBQWUsd0NBQWYsRUFBeUQsRUFBekQsQ0FBVDtBQUNBRCxhQUFTQSxPQUFPQyxPQUFQLENBQWUsUUFBZixFQUF5QixHQUF6QixDQUFUO0FBQ0FELGFBQVNBLE9BQU9DLE9BQVAsQ0FBZSxVQUFmLEVBQTJCLElBQTNCLENBQVQ7QUFDQUQsYUFBU0EsT0FBT0MsT0FBUCxDQUFlLFVBQWYsRUFBMkIsSUFBM0IsQ0FBVDtBQUNBRCxhQUFTQSxPQUFPQyxPQUFQLENBQWUsS0FBZixFQUFzQixHQUF0QixDQUFUOztBQUVBLFdBQU9ELE1BQVA7QUFDSDs7QUFFRDs7Ozs7Ozs7O0FBdkM0QjtBQUFBO0FBQUEsaUNBK0NQRSxPQS9DTyxFQStDRUMsU0EvQ0YsRUErQ2FDLFlBL0NiLEVBZ0Q1QjtBQUNDLFNBQUtDLFdBQUwsQ0FBaUJI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ekM7QUFDQSxPQUFLQSxTQUFMLENBQWUsTUFBZixFQUF1QixRQUF2QixJQUFtQyxLQUFuQztBQUNBOztBQUVELFFBQU96SSxTQUFQO0FBRUMsQ0E5OURnQixFQUFqQiIsImZpbGUiOiJlQ29tbWVyY2UuanMiLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgZUNvbW1lcmNlID0gKGZ1bmN0aW9uICgpIHtcbid1c2Ugc3RyaWN0JztcblxuY2xhc3MgSW52YWxpZEFyZ3VtZW50RXhjZXB0aW9uJDEgZXh0ZW5kcyBFcnJvclxyXG57XHJcblx0Y29uc3RydWN0b3IoKSBcclxuXHR7IFxyXG4gICAgXHRzdXBlcigpO1xyXG4gICAgXHRjb25zb2xlLmVycm9yKGBJbnZhbGlkQXJndW1lbnRFeGNlcHRpb24sIGFuIGludmFsaWQgYXJndW1lbnQgd2FzIHBhc3NlZC5gKTtcclxuICAgIH1cclxufVxuXG4vKipcclxuICogQGZpbGUgXHJcbiAqIERPTSBjbGFzcy5cclxuICpcclxuICogQWRkcyBzb21lIHVzZWZ1bCBmdW5jdGlvbmFsaXR5IGZvclxyXG4gKiBmZXRjaGluZyBvciBtYW5pcHVsYXRpbmcgRE9NIGVsZW1lbnRzLlxyXG4gKi9cclxuXHJcbmNsYXNzIERPTVxyXG57XHJcblx0LyoqXHJcblx0ICogTWluaWZpZXMgdGhlIGNzcyB0ZXh0LlxyXG5cdCAqIFxyXG5cdCAqIEBwYXJhbSBzdHJpbmcgfCBzdHJpbmdcclxuXHQgKiBAcmV0dXJuIHN0cmluZ1xyXG5cdCAqL1xyXG5cdHN0YXRpYyBtaW5pZnlDc3Moc3RyaW5nKSBcclxuXHR7XHJcblx0ICAgIHN0cmluZyA9IHN0cmluZy5yZXBsYWNlKC9cXC9cXCooPzooPyFcXCpcXC8pW1xcc1xcU10pKlxcKlxcL3xbXFxyXFxuXFx0XSsvZywgJycpO1xyXG5cdCAgICBzdHJpbmcgPSBzdHJpbmcucmVwbGFjZSgvIHsyLH0vZywgJyAnKTtcclxuXHQgICAgc3RyaW5nID0gc3RyaW5nLnJlcGxhY2UoLyhbezp9XSkvZywgJyQxJyk7XHJcblx0ICAgIHN0cmluZyA9IHN0cmluZy5yZXBsYWNlKC8oWzssXSkgL2csICckMScpO1xyXG5cdCAgICBzdHJpbmcgPSBzdHJpbmcucmVwbGFjZSgvICEvZywgJyEnKTtcclxuXHQgICAgXHJcblx0ICAgIHJldHVybiBzdHJpbmc7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBTd2l0Y2hlcyBiZXR3ZWVuIHR3byBnaXZlbiBjbGFzc2VzLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIG9iamVjdCB8IGVsZW1lbnRcclxuXHQgKiBAcGFyYW0gc3RyaW5nIHwgY2xhc3NOYW1lXHJcblx0ICogQHBhcmFtIHN0cmluZyB8IG5ld0NsYXNzTmFtZVxyXG5cdCAqIEByZXR1cm4gb2JqZWN0XHJcblx0ICovXHJcblx0c3RhdGljIHN3aXRjaENsYXNzZXMoZWxlbWVudCwgY2xhc3NOYW1lLCBuZXdDbGFzc05hbWUpIFxyXG5cdHtcclxuXHRcdHRoaXMucmVtb3ZlQ2xhc3MoZWxlbWVudCwgY2xhc3NOYW1lKTtcclxuXHRcdHRoaXMuYWRkQ2xhc3MoZWxlbWVudCwgbmV3Q2xhc3NOYW1lKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEFkZHMgY2xhc3MgdG8gYSBnaXZlbiBlbGVtZW50LlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIG9iamVjdCB8IGVsZW1lbnRcclxuXHQgKiBAcGFyYW0gc3RyaW5nIHwgY2xhc3NOYW1lXHJcblx0ICogQHJldHVybiBvYmplY3RcclxuXHQgKi9cclxuXHRzdGF0aWMgYWRkQ2xhc3MoZWxlbWVudCwgY2xhc3NOYW1lKSBcclxuXHR7XHJcblx0XHRpZihlbGVtZW50ID09PSBudWxsKSB7XHJcblx0XHRcdHRocm93IG5ldyBJbnZhbGlkQXJndW1lbnRFeGNlcHRpb24kMTtcclxuXHRcdH1cclxuXHJcblx0XHRpZighIGNsYXNzTmFtZSB8fCBjbGFzc05hbWUgPT0gJycgfHwgdHlwZW9mIGNsYXNzTmFtZSA9PT0gdW5kZWZpbmVkKSB7XHJcblx0XHRcdHJldHVybiBlbGVtZW50O1xyXG5cdFx0fVxyXG5cclxuXHRcdGxldCBjbGFzc05hbWVzID0gY2xhc3NOYW1lLnNwbGl0KCcgJyk7XHJcblxyXG5cdFx0Y2xhc3NOYW1lcy5mb3JFYWNoKGZ1bmN0aW9uKG5hbWUpIHtcclxuXHRcdFx0ZWxlbWVudC5jbGFzc0xpc3QuYWRkKG5hbWUpO1xyXG5cdFx0fSk7XHJcblx0XHRcclxuXHRcdHJldHVybiBlbGVtZW50O1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogUmVtb3ZlcyBjbGFzcyBmcm9tIGEgZ2l2ZW4gZWxlbWVudC5cclxuXHQgKiBcclxuXHQgKiBAcGFyYW0gb2JqZWN0IHwgZWxlbWVudFxyXG5cdCAqIEBwYXJhbSBzdHJpbmcgfCBjbGFzc05hbWVcclxuXHQgKiBAcmV0dXJuIG9iamVjdFxyXG5cdCAqL1xyXG5cdHN0YXRpYyByZW1vdmVDbGFzcyhlbGVtZW50LCBjbGFzc05hbWUpIFxyXG5cdHtcclxuXHRcdGlmKGVsZW1lbnQgPT0gbnVsbCkge1xyXG5cdFx0XHR0aHJvdyBuZXcgSW52YWxpZEFyZ3VtZW50RXhjZXB0aW9uJDE7XHJcblx0XHR9XHJcblxyXG5cdFx0aWYoY2xhc3NOYW1lID09ICcnKSB7XHJcblx0XHRcdGVsZW1lbnQuY2xhc3NOYW1lID0gJyc7XHJcblx0XHR9IGVsc2Uge1xyXG5cclxuXHRcdFx0bGV0IGNsYXNzTmFtZXMgPSBjbGFzc05hbWUuc3BsaXQoJyAnKTtcclxuXHJcblx0XHRcdGNsYXNzTmFtZXMuZm9yRWFjaChmdW5jdGlvbihuYW1lKSB7XHJcblx0XHRcdFx0ZWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKG5hbWUpO1xyXG5cdFx0XHR9KTtcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gZWxlbWVudDtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEFkZHMgc3R5bGUgdGFnIHdpdGggZ2l2ZW4gaWQgYW5kIGNzcyB0byB0aGUgRE9NLlxyXG5cdCAqIFxyXG5cdCAqIEBwYXJhbSBzdHJpbmcgfCBpZFxyXG5cdCAqIEBwYXJhbSBzdHJpbmcgfCBjc3NcclxuXHQgKiBAcmV0dXJuIHZvaWRcclxuXHQgKi9cclxuXHRzdGF0aWMgYWRkU3R5bGUoaWQsIGNzcykgXHJcblx0e1xyXG5cdFx0aWYgKHR5cGVvZiBjc3MgIT0gJ3N0cmluZycpIHtcclxuXHRcdFx0dGhyb3cgbmV3IEludmFsaWRBcmd1bWVudEV4Y2VwdGlvbiQxO1xyXG5cdFx0fVxyXG5cclxuXHRcdGxldCBoZWFkID0gZG9jdW1lbnQuaGVhZCB8fCBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnaGVhZCcpWzBdO1xyXG5cdFx0bGV0IHN0eWxlVGFnID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3R5bGUnKTtcclxuXHJcblx0XHQvLyBwaXBlIGl0IHRocm91Z2ggdGhlIG1pbmZpZXJcclxuXHQgICAgbGV0IENTUyA9IHRoaXMubWluaWZ5Q3NzKGNzcyk7XHJcblx0ICAgIC8vIGFkZGluZyBpdCB0byB0aGUgc3R5bGV0YWdcclxuXHQgICAgc3R5bGVUYWcuaW5uZXJIVE1MID0gQ1NTO1xyXG5cdCAgICAvLyBnaXZlIGFuIGlkIHRvIHJlY29nbml6ZSB0aGUgc3R5bGUgdGFnXHJcblx0XHRzdHlsZVRhZy5zZXRBdHRyaWJ1dGUoJ2lkJywgaWQpO1xyXG5cdFx0Ly8gYXBwZW5kaW5nIHRoYXQgc3R5bGUgdGFnIHRvIHRoZSBET00gaGVhZCB0YWdcclxuXHRcdGhlYWQuYXBwZW5kQ2hpbGQoc3R5bGVUYWcpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQ3JlYXRlcyBhbiBlbGVtZW50IHdpdGggdGhlIGdpdmVuIG9wdGlvbnMuXHJcblx0ICogXHJcblx0ICogQHBhcmFtIHN0cmluZyB8IGVsZW1lbnRUeXBlXHJcblx0ICogQHBhcmFtIG9iamVjdCB8IG9wdGlvbnNcclxuXHQgKiBAcmV0dXJuIEhUTUxFbGVtZW50XHJcblx0ICovXHJcblx0c3RhdGljIGNyZWF0ZUVsZW1lbnQoZWxlbWVudFR5cGUsIG9wdGlvbnMpXHJcblx0e1xyXG5cdFx0bGV0IGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KGVsZW1lbnRUeXBlKTtcclxuXHRcclxuXHRcdGlmIChvcHRpb25zID09PSB1bmRlZmluZWQpIHtcclxuXHRcdFx0cmV0dXJuIGVsZW1lbnQ7XHJcblx0XHR9XHJcblxyXG5cdFx0Zm9yIChsZXQgb3B0aW9uIGluIG9wdGlvbnMpIHtcclxuXHRcdFx0aWYob3B0aW9uID09ICd0ZXh0Jykge1xyXG5cdFx0XHRcdGVsZW1lbnQuaW5uZXJIVE1MID0gb3B0aW9uc1tvcHRpb25dO1xyXG5cdFx0XHRcdGNvbnRpbnVlO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRlbGVtZW50LnNldEF0dHJpYnV0ZShvcHRpb24sIG9wdGlvbnNbb3B0aW9uXSk7XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIGVsZW1lbnQ7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBUb2dnbGVzIHRoZSBnaXZlbiBjbGFzc2VzLlxyXG5cdCAqIFxyXG5cdCAqIEBwYXJhbSBvYmplY3QgfCBlbGVtZW50XHJcblx0ICogQHBhcmFtIHN0cmluZyB8IGNsYXNzTmFtZVxyXG5cdCAqIEByZXR1cm4gYm9vbFxyXG5cdCAqL1xyXG5cdHN0YXRpYyB0b2dnbGVDbGFzcyhlbGVtZW50LCBjbGFzc05hbWUsIHNlY29uZENsYXNzTmFtZSlcclxuXHR7XHJcblx0XHRpZiAoZWxlbWVudCA9PSBudWxsIHx8IHR5cGVvZiBlbGVtZW50ID09ICd1bmRlZmluZWQnKSB7XHJcblx0XHRcdHRocm93IG5ldyBJbnZhbGlkQXJndW1lbnRFeGNlcHRpb24kMTtcclxuXHRcdH1cclxuXHJcblx0XHRzZWNvbmRDbGFzc05hbWUgPSBzZWNvbmRDbGFzc05hbWUgfHwgdW5kZWZpbmVkO1xyXG5cclxuXHRcdGlmKHNlY29uZENsYXNzTmFtZSkge1xyXG5cdFx0XHRlbGVtZW50LmNsYXNzTGlzdC50b2dnbGUoc2Vjb25kQ2xhc3NOYW1lKTtcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gZWxlbWVudC5jbGFzc0xpc3QudG9nZ2xlKGNsYXNzTmFtZSk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBGaW5kcyBhbiBlbGVtZW50IGluc2lkZSBvZiBwYXJlbnQuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gc3RyaW5nIHwgc2VsZWN0b3JcclxuXHQgKiBAcGFyYW0gb2JqZWN0IHwgY29udGV4dFxyXG5cdCAqIEByZXR1cm4gbWl4ZWRcclxuXHQgKi9cclxuXHRzdGF0aWMgZmluZChzZWxlY3RvciwgY29udGV4dCA9IHdpbmRvdy5kb2N1bWVudCkgXHJcblx0e1xyXG5cdFx0cmV0dXJuIHF1ZXJ5RWxlbWVudChzZWxlY3RvciwgY29udGV4dCk7XHJcblx0fVxyXG59XHJcblxyXG4vKipcclxuICogUXVlcmllcyBhbiBlbGVtZW50IGZyb20gdGhlIERPTS5cclxuICpcclxuICogQHBhcmFtIHN0cmluZyB8IHNlbGVjdG9yXHJcbiAqIEBwYXJhbSBvYmplY3QgfCBwYXJlbnRFbGVtZW50XHJcbiAqIEByZXR1cm4gbWl4ZWRcclxuICovXHJcbmZ1bmN0aW9uIHF1ZXJ5RWxlbWVudChzZWxlY3RvciwgcGFyZW50RWxlbWVudCkgXHJcbntcclxuXHRsZXQgZWxlbWVudCA9IHBhcmVudEVsZW1lbnQucXVlcnlTZWxlY3RvckFsbChzZWxlY3Rvcik7XHJcblxyXG5cdGlmIChlbGVtZW50Lmxlbmd0aCA9PSAwKSB7XHJcblx0XHRyZXR1cm4gbnVsbDtcclxuXHR9XHJcblxyXG5cdHJldHVybiAoZWxlbWVudC5sZW5ndGggPiAxKSA/IGVsZW1lbnQgOiBlbGVtZW50WzBdO1xyXG59XHJcblxyXG4vKipcclxuICogQ2hlY2tzIGlmIHBhcmVudCBoYXMgY2hpbGQuXHJcbiAqXHJcbiAqIEBwYXJhbSBvYmplY3QgfCBwYXJlbnRFbGVtZW50XHJcbiAqIEBwYXJhbSBvYmplY3QgfCBjaGlsZEVsZW1lbnRcclxuICogQHJldHVybiBib29sXHJcbiAqL1xyXG5mdW5jdGlvbiBoYXNDaGlsZChwYXJlbnRFbGVtZW50LCBjaGlsZEVsZW1lbnQpIFxyXG57XHJcbiAgICAgbGV0IG5vZGUgPSBjaGlsZEVsZW1lbnQucGFyZW50Tm9kZTtcclxuICAgICBcclxuICAgICB3aGlsZSAobm9kZSAhPSBudWxsKSB7XHJcbiAgICAgICAgIGlmIChub2RlID09IHBhcmVudEVsZW1lbnQpIHtcclxuICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICB9XHJcbiAgICAgICAgIG5vZGUgPSBub2RlLnBhcmVudE5vZGU7XHJcbiAgICAgfVxyXG4gICAgIFxyXG4gICAgIHJldHVybiBmYWxzZTtcclxufVxuXG5sZXQgZXZlbnRzID0gW107XHJcblxyXG5jbGFzcyBFdmVudFxyXG57XHJcblx0LyoqXHJcblx0ICogTGlzdGVuIHRvIGFuIGV2ZW50LlxyXG5cdCAqL1xyXG5cdHN0YXRpYyBsaXN0ZW4obmFtZSwgY2FsbGJhY2spIHtcclxuXHRcdGlmICh0eXBlb2YgY2FsbGJhY2sgIT09ICdmdW5jdGlvbicpIHtcclxuXHRcdFx0dGhyb3cgbmV3IEludmFsaWRBcmd1bWVudEV4Y2VwdGlvbjtcclxuXHRcdH1cclxuXHJcblx0XHRpZiAodHlwZW9mIGV2ZW50c1tuYW1lXSA9PSAndW5kZWZpbmVkJykge1xyXG5cdFx0XHRldmVudHNbbmFtZV0gPSBbXTtcclxuXHRcdH1cclxuXHJcblx0XHRldmVudHNbbmFtZV0ucHVzaChjYWxsYmFjayk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBGaXJlcyBhbiBldmVudC5cclxuXHQgKi9cclxuXHRzdGF0aWMgdHJpZ2dlcihuYW1lLCAuLi5kYXRhKSB7XHJcblx0XHRkYXRhID0gZGF0YSB8fCBudWxsO1xyXG5cclxuXHRcdGV2ZW50c1tuYW1lXS5mb3JFYWNoKGZ1bmN0aW9uKGNhbGxiYWNrKSB7XHJcblx0XHRcdGlmKHR5cGVvZiBjYWxsYmFjayAhPT0gJ2Z1bmN0aW9uJykge1xyXG5cdFx0XHRcdHRocm93IG5ldyBCYWRFdmVudENhbGxFeGNlcHRpb247XHJcblx0XHRcdH1cclxuXHRcdFx0XHJcblx0XHRcdHJldHVybiBjYWxsYmFjayguLi5kYXRhKTtcclxuXHRcdH0pO1xyXG5cdH1cclxufVxuXG4vKipcclxuICogQGZpbGUgXHJcbiAqIENvbW1vbiBjbGFzcy5cclxuICpcclxuICogQWRkcyBzb21lIHVzZWZ1bCBmdW5jdGlvbmFsaXR5IGZvclxyXG4gKiBjb21tb24gdGFza3MgLSBkYXRhIGNoZWNrcyBvciBkYXRhIG1hbmlwdWxhdGlvbi5cclxuICovXHJcblxyXG5jbGFzcyBDb21tb25cclxue1xyXG5cdC8qKlxyXG5cdCAqIEV4dGVuZCBhbiBvYmplY3QuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gb2JqZWN0IHwgY3VycmVudE9iamVjdFxyXG5cdCAqIEBwYXJhbSBvYmplY3QgfCBuZXdPYmplY3RcclxuXHQgKiBAcmV0dXJuIG9iamVjdFxyXG5cdCAqL1xyXG5cdHN0YXRpYyBleHRlbmQoY3VycmVudE9iamVjdCwgbmV3T2JqZWN0KSB7XHJcblx0XHR2YXIgZXh0ZW5kZWQgPSB7fTtcclxuXHQgICAgdmFyIHByb3A7XHJcblxyXG5cdCAgICBmb3IgKHByb3AgaW4gY3VycmVudE9iamVjdCkge1xyXG5cdCAgICAgICAgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChjdXJyZW50T2JqZWN0LCBwcm9wKSkge1xyXG5cdCAgICAgICAgICAgIGV4dGVuZGVkW3Byb3BdID0gY3VycmVudE9iamVjdFtwcm9wXTtcclxuXHQgICAgICAgIH1cclxuXHQgICAgfVxyXG5cclxuXHQgICAgZm9yIChwcm9wIGluIG5ld09iamVjdCkge1xyXG5cdCAgICAgICAgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChuZXdPYmplY3QsIHByb3ApKSB7XHJcblx0ICAgICAgICAgICAgZXh0ZW5kZWRbcHJvcF0gPSBuZXdPYmplY3RbcHJvcF07XHJcblx0ICAgICAgICB9XHJcblx0ICAgIH1cclxuXHJcblx0ICAgIHJldHVybiBleHRlbmRlZDtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIENoZWNrcyBmb3IgYSBuZWVkbGUgaW4gaHlzdGFjayBhcnJheS5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSBtaXhlZCB8IG5lZWRsZVxyXG5cdCAqIEBwYXJhbSBvYmplY3QgfCBvYmplY3RcclxuXHQgKiBAcmV0dXJuIGJvb2xcclxuXHQgKlxyXG5cdCAqL1xyXG5cdHN0YXRpYyBpbl9hcnJheShuZWVkbGUsIGh5c3RhY2spIHtcclxuXHRcdGlmKGh5c3RhY2suY29uc3RydWN0b3IgIT09IEFycmF5KSB7XHJcblx0XHRcdHRocm93IG5ldyBJbnZhbGlkQXJndW1lbnRFeGNlcHRpb24kMTtcclxuXHRcdH1cclxuXHJcblx0XHRmb3IodmFyIGkgPSAwOyBpIDw9IGh5c3RhY2subGVuZ3RoOyBpKyspIHtcclxuXHRcdFx0aWYobmVlZGxlID09IGh5c3RhY2tbaV0pIHtcclxuXHRcdFx0XHRyZXR1cm4gdHJ1ZTtcdFxyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0XHJcblx0XHRyZXR1cm4gZmFsc2U7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBDaGVja3MgaWYgYW4gb2JqZWN0IGlzIGVtcHR5LlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIG9iamVjdCB8IG9iamVjdFxyXG5cdCAqIEByZXR1cm4gYm9vbFxyXG5cdCAqL1xyXG5cdHN0YXRpYyBlbXB0eU9iamVjdChvYmplY3QpIHtcclxuXHRcdGZvciAobGV0IHByb3AgaW4gb2JqZWN0KSB7XHJcblx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gdHJ1ZTtcclxuXHR9XHJcblxyXG5cclxuXHQvKipcclxuXHQgKiBDaGVja3MgaWYgYSBnaXZlbiBvYmplY3QgY29udGFpbmVkIGluIGFuIGFycmF5LlxyXG5cdCAqIFxyXG5cdCAqIEBwYXJhbSBvYmplY3QgfCBvYmplY3RcclxuXHQgKiBAcGFyYW0gYXJyYXkgfCBoYXlzdGFja1xyXG5cdCAqIEByZXR1cm4gYm9vbFxyXG5cdCAqL1xyXG5cdHN0YXRpYyBjb250YWluc09iamVjdChvYmplY3QsIGh5c3RhY2spIFxyXG5cdHtcclxuXHQgICAgbGV0IGk7XHJcblxyXG5cdCAgICBmb3IgKGkgPSAwOyBpIDwgaHlzdGFjay5sZW5ndGg7IGkrKykge1xyXG5cdCAgICAgICAgaWYgKHR5cGVvZiBvYmplY3QgPT0gJ3N0cmluZycgJiYgaHlzdGFja1tpXS5jb25zdHJ1Y3Rvci5uYW1lID09PSBvYmplY3QpIHtcclxuXHQgICAgICAgIFx0cmV0dXJuIHRydWU7XHJcblx0ICAgICAgICB9XHJcblxyXG5cdCAgICAgICAgaWYgKGh5c3RhY2tbaV0gPT09IG9iamVjdCkge1xyXG5cdCAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG5cdCAgICAgICAgfVxyXG5cdCAgICB9XHJcblxyXG5cdCAgICByZXR1cm4gZmFsc2U7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBDaGVja3MgaWYgYSBnaXZlbiBwYXJhbWV0ZXIgaXMgYW4gb2JqZWN0LlxyXG5cdCAqIFxyXG5cdCAqIEBwYXJhbSBvYmplY3QgfCBvYmplY3RcclxuXHQgKiBAcmV0dXJuIGJvb2xcclxuXHQgKi9cclxuXHRzdGF0aWMgaXNPYmplY3Qob2JqZWN0KSBcclxuXHR7XHJcblx0XHRyZXR1cm4gdHlwZW9mIG9iamVjdCA9PSAnb2JqZWN0JztcclxuXHR9XHJcbn1cblxuY2xhc3MgSW52YWxpZERhdGFTdHJ1Y3R1cmVFeGNlcHRpb24gIGV4dGVuZHMgRXJyb3Jcclxue1xyXG5cdGNvbnN0cnVjdG9yKCkgXHJcblx0eyBcclxuICAgIFx0c3VwZXIoKTtcclxuICAgIH1cclxufVxuXG5sZXQgZGVmYXVsdFNldHRpbmdzJDEgPSB7XHJcblx0aGVhZGVyczoge1xyXG5cdFx0J0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJ1xyXG5cdH0sXHJcblx0YXN5bmM6IHRydWVcclxufTtcclxuXHJcblxyXG5jbGFzcyBSZXF1ZXN0XHJcbntcclxuXHRjb25zdHJ1Y3RvcihzZXR0aW5ncylcclxuXHR7XHJcblx0XHR0aGlzLnhociA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpIHx8IG5ldyBBY3RpdmVYT2JqZWN0KFwiTWljcm9zb2Z0LlhNTEhUVFBcIik7XHJcblx0XHR0aGlzLnNldHRpbmdzID0gQ29tbW9uLmV4dGVuZChkZWZhdWx0U2V0dGluZ3MkMSwgc2V0dGluZ3MpO1xyXG5cdFx0dGhpcy5zZXREZWZhdWx0UmVxdWVzdEhlYWRlcigpO1xyXG5cdH1cclxuXHJcblx0c2V0RGVmYXVsdFJlcXVlc3RIZWFkZXIoKVxyXG5cdHtcclxuXHRcdGxldCBoZWFkZXI7XHJcblx0XHRsZXQgaGVhZGVycyA9IHRoaXMuc2V0dGluZ3MuaGVhZGVycztcclxuXHRcdGxldCBhc3luYyA9IHRoaXMuc2V0dGluZ3MuYXN5bmM7XHJcblx0XHRsZXQgb3BlbiA9IFhNTEh0dHBSZXF1ZXN0LnByb3RvdHlwZS5vcGVuO1xyXG5cdFx0bGV0IHNldFJlcXVlc3RIZWFkZXIgPSBYTUxIdHRwUmVxdWVzdC5wcm90b3R5cGUuc2V0UmVxdWVzdEhlYWRlcjtcclxuXHJcblx0XHRYTUxIdHRwUmVxdWVzdC5wcm90b3R5cGUub3BlbiA9IGZ1bmN0aW9uKCkge1xyXG5cdFx0XHR2YXIgcmVzcG9uc2UgPSBvcGVuLmFwcGx5KHRoaXMsIGFyZ3VtZW50cywgYXN5bmMpO1xyXG5cclxuXHRcdFx0Zm9yIChoZWFkZXIgaW4gaGVhZGVycykge1xyXG5cdFx0XHRcdHRoaXMuc2V0UmVxdWVzdEhlYWRlcihoZWFkZXIsIGhlYWRlcnNbaGVhZGVyXSk7XHJcblx0XHRcdH1cclxuXHJcblx0ICBcdFx0cmV0dXJuIHJlc3BvbnNlO1xyXG5cdFx0fTtcclxuXHR9XHJcblxyXG5cdHBvc3Qob3B0aW9ucylcclxuXHR7XHJcblx0XHRpZih0eXBlb2Ygb3B0aW9ucyAhPT0gJ29iamVjdCcpIHtcclxuXHRcdFx0dGhyb3cgbmV3IEVycm9yKCdwb3N0IGV4cGVjdGluZyBhIGpzb24gb2JqZWN0IHRvIGJlIHBhc3NlZCBhcyBhbiBhcmd1bWVudCwgYnV0ICcrIHR5cGVvZiBvcHRpb25zICsgJyB3YXMgcGFzc2VkLicpO1xyXG5cdFx0fVxyXG5cclxuXHRcdGlmKHR5cGVvZiBvcHRpb25zLmRhdGEgIT09ICdvYmplY3QnKSB7XHJcblx0XHRcdHRocm93IG5ldyBFcnJvcignZGF0YSBwcm9wZXJ0eSBleHBlY3RpbmcgYSBqc29uIG9iamVjdCB0byBiZSBwYXNzZWQgYXMgYW4gYXJndW1lbnQsIGJ1dCAnICsgdHlwZW9mIG9wdGlvbnMuZGF0YSArICcgd2FzIHBhc3NlZC4nKTtcclxuXHRcdH1cclxuXHJcblx0XHRvcHRpb25zLmRhdGEgPSBvcHRpb25zLmRhdGEgfHwgbnVsbDtcclxuXHJcblx0XHR4aHIub3BlbignUE9TVCcsIG9wdGlvbnMudXJsLCB0cnVlKTtcclxuXHRcdHhoci5zZXRSZXF1ZXN0SGVhZGVyKFwiQ29udGVudC10eXBlXCIsIG9wdGlvbnMuaGVhZGVycyB8fCBcImFwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZFwiKTtcclxuXHJcblx0XHRpZihvcHRpb25zLmhhc093blByb3BlcnR5KCdiZWZvcmUnKSAmJiB0eXBlb2Ygb3B0aW9ucy5iZWZvcmUgPT0gJ2Z1bmN0aW9uJykge1xyXG5cdFx0XHRvcHRpb25zLmJlZm9yZSgpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHhoci5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBmdW5jdGlvbigpIHtcclxuXHRcdCAgICBpZih0aGlzLnJlYWR5U3RhdGUgPT0gNCAmJiB0aGlzLnN0YXR1cyA9PSAyMDApIHtcclxuXHRcdCAgICAgICBcdGlmKG9wdGlvbnMuaGFzT3duUHJvcGVydHkoJ3N1Y2Nlc3MnKSAmJiB0eXBlb2Ygb3B0aW9ucy5zdWNjZXNzID09ICdmdW5jdGlvbicpIHtcclxuXHRcdCAgICAgICBcdFx0b3B0aW9ucy5zdWNjZXNzKEpTT04ucGFyc2UodGhpcy5yZXNwb25zZSkpO1xyXG5cdFx0ICAgXHRcdH1cclxuXHRcdCAgICAgICBcclxuXHRcdCAgICAgICBcdGlmKG9wdGlvbnMuaGFzT3duUHJvcGVydHkoJ2FmdGVyJykgJiYgdHlwZW9mIG9wdGlvbnMuYWZ0ZXIgPT0gJ2Z1bmN0aW9uJykge1xyXG5cdFx0ICAgICAgIFx0XHRvcHRpb25zLmFmdGVyKHRoaXMucmVzcG9uc2UpO1xyXG5cdFx0ICAgXHRcdH1cclxuXHRcdCAgICB9XHJcblx0XHR9O1xyXG5cclxuXHRcdHhoci5vbmVycm9yID0gZnVuY3Rpb24obWVzc2FnZSwgYSwgYikge1xyXG5cdFx0XHRpZihvcHRpb25zLmhhc093blByb3BlcnR5KCdlcnJvcicpICYmIHR5cGVvZiBvcHRpb25zLmVycm9yID09ICdmdW5jdGlvbicpIHtcclxuXHRcdFx0XHRvcHRpb25zLmVycm9yKG1lc3NhZ2UsIGEsIGIpO1xyXG5cdFx0XHR9XHJcblx0XHR9O1xyXG5cclxuXHRcdGlmKCEgb3B0aW9ucy5kYXRhKSB7XHJcblx0XHRcdHhoci5zZW5kKG51bGwpO1xyXG5cdFx0XHRyZXR1cm4gb3B0aW9ucztcclxuXHRcdH1cclxuXHJcblx0XHR2YXIgcXVlcnlTdHJpbmcgPSBPYmplY3Qua2V5cyhvcHRpb25zLmRhdGEpLm1hcChmdW5jdGlvbihrZXkpIHtcclxuXHQgICAgICAgICAgICByZXR1cm4gZW5jb2RlVVJJQ29tcG9uZW50KGtleSkgKyAnPScgK1xyXG5cdCAgICAgICAgICAgICAgICBcdGVuY29kZVVSSUNvbXBvbmVudChvcHRpb25zLmRhdGFba2V5XSk7XHJcblx0ICAgICAgICBcdH0pLmpvaW4oJyYnKTtcclxuXHJcblx0XHR4aHIuc2VuZChxdWVyeVN0cmluZyk7XHJcblxyXG5cdFx0cmV0dXJuIG9wdGlvbnM7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBNYWtlcyBhIEdFVCBhamF4IHJlcXVlc3QuXHJcblx0ICogXHJcblx0ICogQHBhcmFtIG9iamVjdCB8IG9wdGlvbnNcclxuXHQgKiBAcmV0dXJuIFByb21pc2VcclxuXHQgKi9cclxuXHRnZXQob3B0aW9ucylcclxuXHR7XHJcblx0XHRsZXQgeGhyID0gdGhpcy54aHI7XHJcblxyXG5cdFx0aWYob3B0aW9ucy5oYXNPd25Qcm9wZXJ0eSgnYmVmb3JlJykgJiYgdHlwZW9mIG9wdGlvbnMuYmVmb3JlID09ICdmdW5jdGlvbicpIHtcclxuXHRcdFx0b3B0aW9ucy5iZWZvcmUuY2FsbCh0aGlzKTtcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XHJcblx0XHRcdGlmKHR5cGVvZiBvcHRpb25zICE9PSAnb2JqZWN0Jykge1xyXG5cdFx0XHRcdHRocm93IG5ldyBFcnJvcignZ2V0IGV4cGVjdGluZyBhIGpzb24gb2JqZWN0IHRvIGJlIHBhc3NlZCBhcyBhbiBhcmd1bWVudCwgYnV0ICcrIHR5cGVvZiBvcHRpb25zICsgJyB3YXMgcGFzc2VkLicpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRvcHRpb25zLmRhdGEgPSBvcHRpb25zLmRhdGEgfHwge307XHJcblxyXG5cdFx0XHRpZih0eXBlb2Ygb3B0aW9ucy5kYXRhICE9PSAnb2JqZWN0Jykge1xyXG5cdFx0XHRcdHRocm93IG5ldyBFcnJvcignZGF0YSBwcm9wZXJ0eSBleHBlY3RpbmcgYSBqc29uIG9iamVjdCB0byBiZSBwYXNzZWQgYXMgYW4gYXJndW1lbnQsIGJ1dCAnICsgdHlwZW9mIG9wdGlvbnMuZGF0YSArICcgd2FzIHBhc3NlZC4nKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0eGhyLm9wZW4oJ0dFVCcsIG9wdGlvbnMudXJsLCB0cnVlKTtcclxuXHJcblx0XHRcdHhoci5yZXNwb25zZVR5cGUgPSBvcHRpb25zLmRhdGFUeXBlIHx8ICdqc29uJztcclxuXHRcdFx0eGhyLnRpbWVvdXQgPSBvcHRpb25zLnRpbWVvdXQgfHwgMzAwMDtcclxuXHJcblx0XHRcdHhoci5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBmdW5jdGlvbigpIHtcclxuXHRcdFx0ICAgIGlmKHRoaXMucmVhZHlTdGF0ZSAhPSA0IHx8IHRoaXMuc3RhdHVzICE9IDIwMCkge1xyXG5cdFx0XHQgICAgXHRyZXR1cm47XHJcblx0XHRcdCAgICB9XHJcblx0ICAgICAgIFx0XHJcbiAgICAgICBcdFx0XHRyZXNvbHZlKHRoaXMucmVzcG9uc2UpO1xyXG4gICAgICAgXHRcdFx0XHJcbiAgICAgICBcdFx0XHRpZihvcHRpb25zLmhhc093blByb3BlcnR5KCdhZnRlcicpICYmIHR5cGVvZiBvcHRpb25zLmFmdGVyID09ICdmdW5jdGlvbicpIHtcclxuXHRcdFx0XHRcdG9wdGlvbnMuYWZ0ZXIuY2FsbCh0aGlzKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH07XHJcblxyXG5cdFx0XHR4aHIub25lcnJvciA9IGZ1bmN0aW9uKG1lc3NhZ2UpIHtcclxuXHRcdFx0XHRvcHRpb25zLmVycm9yKG1lc3NhZ2UpO1xyXG5cdFx0XHRcdHJlamVjdChtZXNzYWdlKTtcclxuXHRcdFx0fTtcclxuXHJcblx0XHRcdGlmKCEgb3B0aW9ucy5kYXRhKSB7XHJcblx0XHRcdFx0eGhyLnNlbmQobnVsbCk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHZhciBxdWVyeVN0cmluZyA9IE9iamVjdC5rZXlzKG9wdGlvbnMuZGF0YSkubWFwKGZ1bmN0aW9uKGtleSkge1xyXG5cdFx0ICAgICAgICAgICAgcmV0dXJuIGVuY29kZVVSSUNvbXBvbmVudChrZXkpICsgJz0nICtcclxuXHRcdCAgICAgICAgICAgICAgICBcdGVuY29kZVVSSUNvbXBvbmVudChvcHRpb25zLmRhdGFba2V5XSk7XHJcblx0XHQgICAgICAgIFx0fSkuam9pbignJicpO1xyXG5cclxuXHRcdFx0eGhyLnNlbmQocXVlcnlTdHJpbmcpO1xyXG5cdFx0fSk7XHJcblx0fVxyXG59XG5cbmNsYXNzIEludmFsaWRCaW5kaW5nRXhjZXB0aW9uIGV4dGVuZHMgRXJyb3Jcclxue1xyXG5cdGNvbnN0cnVjdG9yKCkgXHJcblx0eyBcclxuICAgIFx0c3VwZXIoKTtcclxuICAgIFx0Y29uc29sZS5lcnJvcihgSW52YWxpZEJpbmRpbmdFeGNlcHRpb24sIHRyeWluZyB0byBiaW5kIGFuIGFscmVhZHkgZXhpc3RpbmcgYm91bmQuYCk7XHJcbiAgICB9XHJcbn1cblxubGV0IGluc3RhbmNlcyA9IFtdO1xyXG5cclxuY2xhc3MgQ29udGFpbmVyIFxyXG57XHJcblx0LyoqXHJcblx0ICogQmluZHMga2V5IHRvIGNvbmNyZXRlIGNsYXNzLlxyXG5cdCAqL1xyXG5cdGJpbmQoa2V5LCBjb25jcmV0ZSkgXHJcblx0e1xyXG5cdFx0aWYgKHR5cGVvZiBrZXkgIT0gJ3N0cmluZycgfHwgdHlwZW9mIGNvbmNyZXRlICE9ICdmdW5jdGlvbicpIHtcclxuXHRcdFx0dGhyb3cgbmV3IEludmFsaWRBcmd1bWVudEV4Y2VwdGlvbiQxO1xyXG5cdFx0fVxyXG5cclxuXHRcdGlmICh0eXBlb2YgdGhpc1trZXldICE9ICd1bmRlZmluZWQnKSB7XHJcblx0XHRcdHRocm93IG5ldyBJbnZhbGlkQmluZGluZ0V4Y2VwdGlvbjtcclxuXHRcdH1cclxuXHJcblx0XHR0aGlzW2tleV0gPSBjb25jcmV0ZS5iaW5kKGNvbmNyZXRlLCB0aGlzKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFNldHMgYW4gaW5zdGFuY2UuXHJcblx0ICovXHJcblx0c2V0SW5zdGFuY2Uoa2V5LCBpbnN0YW5jZSkgXHJcblx0e1xyXG5cdFx0aWYodHlwZW9mIGtleSAhPSAnc3RyaW5nJyB8fCB0eXBlb2YgaW5zdGFuY2UgIT0gJ29iamVjdCcpIHtcclxuXHRcdFx0dGhyb3cgbmV3IEludmFsaWRBcmd1bWVudEV4Y2VwdGlvbiQxO1xyXG5cdFx0fVxyXG5cclxuXHRcdGluc3RhbmNlc1trZXldID0gaW5zdGFuY2U7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBHZXRzIGFuIGluc3RhbmNlLlxyXG5cdCAqL1xyXG5cdGdldEluc3RhbmNlKGtleSkgXHJcblx0e1xyXG5cdFx0aWYodHlwZW9mIGtleSAhPSAnc3RyaW5nJykge1xyXG5cdFx0XHR0aHJvdyBuZXcgSW52YWxpZEFyZ3VtZW50RXhjZXB0aW9uJDE7XHJcblx0XHR9XHJcblxyXG5cdFx0aWYodHlwZW9mIGtleSA9PSAnb2JqZWN0Jykge1xyXG5cdFx0XHRyZXR1cm4gaW5zdGFuY2VzW2tleS5jb25zdHJ1Y3Rvci5uYW1lXSB8fCBudWxsO1xyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiBpbnN0YW5jZXNba2V5XSB8fCBudWxsO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQ2hlY2tzIGlmIGFuIGluc3RhbmNlIGV4aXN0LlxyXG5cdCAqL1xyXG5cdGluc3RhbmNlRXhpc3QoaW5zdGFuY2UpIFxyXG5cdHtcclxuXHRcdGlmKHR5cGVvZiBpbnN0YW5jZSA9PSAnb2JqZWN0Jykge1xyXG5cdFx0XHRyZXR1cm4gKHR5cGVvZiBpbnN0YW5jZXNbaW5zdGFuY2UuY29uc3RydWN0b3IubmFtZV0gIT09ICd1bmRlZmluZWQnKTtcclxuXHRcdH1cclxuXHRcdFxyXG5cdFx0XHJcblx0XHRyZXR1cm4gKGluc3RhbmNlIGluIGluc3RhbmNlcyk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBDcmVhdGVzIGFuIGluc3RhbmNlLlxyXG5cdCAqL1xyXG5cdG1ha2Uob2JqZWN0KVxyXG5cdHtcclxuXHRcdGxldCBpbnN0YW5jZSA9IHt9O1xyXG5cdFx0bGV0IGtleTtcclxuXHJcblx0XHRpZiAodGhpcy5pbnN0YW5jZUV4aXN0KG9iamVjdCkpIHtcclxuXHRcdFx0cmV0dXJuIHRoaXMuZ2V0SW5zdGFuY2Uob2JqZWN0KTtcclxuXHRcdH1cclxuXHJcblx0XHRpZiAodHlwZW9mIG9iamVjdCA9PSAnb2JqZWN0Jykge1xyXG5cdFx0XHRpbnN0YW5jZSA9IG9iamVjdDtcclxuXHRcdFx0a2V5ID0gb2JqZWN0LmNvbnN0cnVjdG9yLm5hbWU7XHJcblx0XHRcdHRoaXMuc2V0SW5zdGFuY2Uoa2V5LCBpbnN0YW5jZSk7IFxyXG5cdFx0fSBlbHNlIGlmKHR5cGVvZiBvYmplY3QgPT0gJ3N0cmluZycgJiYgdGhpcy5oYXNPd25Qcm9wZXJ0eShvYmplY3QpKSB7XHJcblx0XHRcdGluc3RhbmNlID0gbmV3IHRoaXNbb2JqZWN0XTtcclxuXHRcdFx0a2V5ID0gb2JqZWN0O1xyXG5cdFx0XHR0aGlzLnNldEluc3RhbmNlKGtleSwgaW5zdGFuY2UpO1x0XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHR0aHJvdyBuZXcgSW52YWxpZEJpbmRpbmdFeGNlcHRpb247XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIGluc3RhbmNlO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogUmV0cmlldmUgYWxsIGluc3RhbmNlcy5cclxuXHQgKi9cclxuXHRpbnN0YW5jZXMoKSBcclxuXHR7XHJcblx0XHRyZXR1cm4gaW5zdGFuY2VzO1xyXG5cdH1cclxufVxuXG5jbGFzcyBDb21wb25lbnRzRXhjZXB0aW9uIGV4dGVuZHMgRXJyb3Jcclxue1xyXG5cdGNvbnN0cnVjdG9yKCkgXHJcblx0eyBcclxuICAgIFx0c3VwZXIoKTtcclxuICAgIFx0Y29uc29sZS5lcnJvcihgQ29tcG9uZW50c0V4Y2VwdGlvbiwgZXhwZWN0aW5nIGZvciBhdCBsZWFzdCBvbmUgY29tcG9uZW50cywgYnV0IG5vbmUgd2FzIGdpdmVuLCBcclxuXHRcdFx0XHRcdFx0XHRcdHBsZWFzZSBhZGQgYXQgbGVhc3Qgb25lIHJlcXVpcmVtZW50KFByb2R1Y3RzLCBTZXJ2aWNlcyBvci9hbmQgRmlsdGVyLmApO1xyXG4gICAgfVxyXG59XG5cbmNsYXNzIEJhZEV2ZW50Q2FsbEV4Y2VwdGlvbiQxIGV4dGVuZHMgRXJyb3Jcclxue1xyXG5cdGNvbnN0cnVjdG9yKCkgXHJcblx0eyBcclxuXHRcdHN1cGVyKCk7XHJcbiAgICBcdGNvbnNvbGUuZXJyb3IoYEJhZEV2ZW50Q2FsbEV4Y2VwdGlvbiwgbGlzdGVuaW5nIHRvIGEgbm9uZS1leGlzdGluZyBldmVudC5gKTtcclxuICAgIH1cclxufVxuXG5jbGFzcyBOb3RJblBhZ2VSYW5nZUV4Y2VwdGlvbiBleHRlbmRzIEVycm9yXHJcbntcclxuXHRjb25zdHJ1Y3RvcigpIFxyXG5cdHsgXHJcbiAgICBcdHN1cGVyKCk7XHJcbiAgICBcdGNvbnNvbGUuZXJyb3IoYE5vdEluUGFnZVJhbmdlRXhjZXB0aW9uLCBzb3JyeSwgbm8gbW9yZSBwYWdlcy5gKTtcclxuICAgIH1cclxufVxuXG5jbGFzcyBDb21wb25lbnROb3RSZWdpc3RlcmVkRXhjZXB0aW9uIGV4dGVuZHMgRXJyb3Jcclxue1xyXG5cdGNvbnN0cnVjdG9yKCkgXHJcblx0eyBcclxuICAgIFx0c3VwZXIoKTtcclxuICAgIFx0Y29uc29sZS5lcnJvcihgQ29tcG9uZW50Tm90UmVnaXN0ZXJlZEV4Y2VwdGlvbiwgY29tcG9uZW50cyBtdXN0IGJlIHJlZ2lzdGVyZWQgaW4gb3JkZXIgdG8gdXNlIHRoZW0uYCk7XHJcbiAgICB9XHJcbn1cblxuY2xhc3MgRXhjZXB0aW9uSGFuZGxlciBleHRlbmRzIEVycm9yXHJcbntcclxuXHQvKipcclxuXHQgKiBIYW5kbGUgYWxsIHRoZSBlcnJvcnNcclxuXHQgKi9cclxuXHRzdGF0aWMgaW5pdGFsaXplKCkge1x0XHJcblx0XHR3aW5kb3cub25lcnJvciA9IGZ1bmN0aW9uKG1lc3NhZ2UsIHNvdXJjZSwgbGluZW5vLCBjb2xubywgZXJyb3IpIHtcclxuXHRcdFx0XHJcblx0XHRcdGlmIChlcnJvciBpbnN0YW5jZW9mIEludmFsaWRBcmd1bWVudEV4Y2VwdGlvbiQxKSB7XHJcblx0XHRcdFx0Ly8gaGFuZGxlXHJcblx0XHRcdH0gZWxzZSBpZiAoZXJyb3IgaW5zdGFuY2VvZiBJbnZhbGlkQmluZGluZ0V4Y2VwdGlvbikge1xyXG5cdFx0XHRcdC8vIGhhbmRsZVxyXG5cdFx0XHR9IGVsc2UgaWYgKGVycm9yIGluc3RhbmNlb2YgQmFkRXZlbnRDYWxsRXhjZXB0aW9uJDEpIHtcclxuXHRcdFx0XHQvLyBoYW5kbGVcclxuXHRcdFx0fSBlbHNlIGlmIChlcnJvciBpbnN0YW5jZW9mIENvbXBvbmVudHNFeGNlcHRpb24pIHtcclxuXHRcdFx0XHQvLyBoYW5kbGVcclxuXHRcdFx0fSBlbHNlIGlmIChlcnJvciBpbnN0YW5jZW9mIENvbXBvbmVudE5vdFJlZ2lzdGVyZWRFeGNlcHRpb24pIHtcclxuXHRcdFx0XHQvLyBoYW5kbGVcclxuXHRcdFx0fSBlbHNlIGlmIChlcnJvciBpbnN0YW5jZW9mIE5vdEluUGFnZVJhbmdlRXhjZXB0aW9uKSB7XHJcblx0XHRcdFx0Ly8gaGFuZGxlIFxyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0cmV0dXJuIHRydWU7XHJcblx0XHR9O1xyXG5cdH1cclxufVxuXG4vKipcclxuICogVGhlIGRlZmF1bHQgc2V0dGluZ3Mgb2YgdGhlIGZpbHRlci5cclxuICovXHJcbmxldCBkZWZhdWx0U2V0dGluZ3MkMiA9IHtcclxuXHRlbGVtZW50OiAnLmZpbHRlcicsXHJcblx0ZGF0YToge30sXHJcblx0Y2xhc3M6ICcnLFxyXG5cdHdpZHRoOiAnJyxcclxuXHRoZWlnaHQ6ICcnLFxyXG59O1xyXG5cclxuLyoqXHJcbiAqIFN0b3JlcyB0aGUgY29udGFpbmVyIG9iamVjdC5cclxuICovXHJcbmxldCBDb250YWluZXIkMjtcclxuXHJcbi8qKlxyXG4gKiBUaGUgRmlsdGVyIE9iamVjdCwgaGFuZGxlcyB0aGUgZmlsdGVyIG9mIHRoZSBwcm9kdWN0cy9zZXJ2aWNlcy5cclxuICovXHJcbmNsYXNzIEZpbHRlciBcclxue1xyXG5cdGNvbnN0cnVjdG9yKGNvbnRhaW5lcikgXHJcblx0e1xyXG5cdFx0Q29udGFpbmVyJDIgPSBjb250YWluZXI7XHJcblx0fVxyXG5cclxuXHRzZXR1cChzZXR0aW5ncylcclxuXHR7XHJcblx0XHRpZih0eXBlb2Ygc2V0dGluZ3MgIT0gJ29iamVjdCcpIHtcclxuXHRcdFx0dGhyb3cgbmV3IEludmFsaWRBcmd1bWVudEV4Y2VwdGlvbiQxO1xyXG5cdFx0fVxyXG5cclxuXHRcdHRoaXMuc2V0dGluZ3MgPSBDb21tb24uZXh0ZW5kKGRlZmF1bHRTZXR0aW5ncyQyLCBzZXR0aW5ncyk7XHJcblxyXG5cdFx0dGhpcy5zZXRFbGVtZW50KHRoaXMuc2V0dGluZ3MuZWxlbWVudCk7XHJcblx0fVxyXG5cclxuXHRzZXRFbGVtZW50KHNlbGVjdG9yKVxyXG5cdHtcclxuXHRcdHRoaXMud3JhcHBlciA9IERPTS5maW5kKHNlbGVjdG9yKTtcclxuXHRcdFxyXG5cdFx0RE9NLmFkZENsYXNzKHRoaXMud3JhcHBlciwgdGhpcy5zZXR0aW5ncy5jbGFzcyk7XHJcblx0fVxyXG59XG5cbi8qKlxyXG4gKiBAZmlsZSBcclxuICogU3RyIGNsYXNzLlxyXG4gKlxyXG4gKiBBZGRzIHNvbWUgdXNlZnVsIGZ1bmN0aW9uYWxpdHkgZm9yXHJcbiAqIG1hbmlwdWxhdGluZyBzdHJpbmdzIG9yIGNyZWF0aW5nIHN0cmluZy5cclxuICovXHJcblxyXG5jbGFzcyBTdHJcclxue1xyXG5cclxuXHQvKipcclxuXHQgKiBDb252ZXJ0IGNhbWVsQ2FzZSB0byBrZWJhYi1jYXNlLlxyXG5cdCAqL1xyXG5cdHN0YXRpYyBrZWJhYkNhc2Uoc3RyaW5nKSBcclxuXHR7XHJcblx0XHRyZXR1cm4gc3RyaW5nLnJlcGxhY2UoLyhbYS16XSkoW0EtWl0pL2csICckMS0kMicpLnRvTG93ZXJDYXNlKCk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBHZW5lcmF0ZXMgYSByYW5kb20gc3RyaW5nLlxyXG5cdCAqL1xyXG5cdHN0YXRpYyByYW5kb20obGVuZ3RoKSBcclxuXHR7XHJcblx0XHRsZXQgc3RyaW5nID0gJyc7XHJcblx0XHRsZXQgcG9zc2libGUgPSBcIkFCQ0RFRkdISUpLTE1OT1BRUlNUVVZXWFlaYWJjZGVmZ2hpamtsbW5vcHFyc3R1dnd4eXowMTIzNDU2Nzg5XCI7XHJcblxyXG5cdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xyXG5cdCAgICBcdHN0cmluZyArPSBwb3NzaWJsZS5jaGFyQXQoTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogcG9zc2libGUubGVuZ3RoKSk7XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIHN0cmluZztcclxuXHR9XHJcblxyXG59XG5cbi8qKlxyXG4gKiBUaGUgZGVmYXVsdCBzZXR0aW5ncyBvZiBlYWNoIHByb2R1Y3QuXHJcbiAqL1xyXG5sZXQgZGVmYXVsdFNldHRpbmdzJDMgPSB7XHJcblx0ZWxlbWVudDogJy5wcm9kdWN0cycsXHJcblx0Y2xhc3M6ICcnLFxyXG5cdGl0ZW1fY2xhc3M6ICcnLFxyXG5cdGFkZF9idXR0b25fY2xhc3M6ICdidG4gYnRuLXByaW1hcnknLFxyXG5cdGZhdm9yaXRlX2J1dHRvbl9jbGFzczogJ2J0biBidG4tZGFuZ2VyJyxcclxuXHR3aWR0aDogJzIwMHB4JyxcclxuXHRoZWlnaHQ6ICcyNTBweCcsXHJcblx0YXR0cmlidXRlczogWyduYW1lJywgJ3ByaWNlJywgJ2RlbGl2ZXJ5VGltZScsICdpbWFnZSddLFxyXG5cdHVybDogJ3Byb2R1Y3RzLnBocCcsXHJcbn07XHJcblxyXG4vKipcclxuICogU3RvcmVzIHRoZSBjb250YWluZXIgb2JqZWN0LlxyXG4gKi9cclxubGV0IENvbnRhaW5lciQzO1xyXG5cclxuLyoqXHJcbiAqIFN0b3JlcyB0aGUgcmVxdWVzdCBvYmplY3QuXHJcbiAqL1xyXG5sZXQgSHR0cDtcclxuXHJcbi8qKlxyXG4gKiBUaGUgUHJvZHVjdHMgT2JqZWN0LCBoYW5kbGVzIHRoZSBwcm9kdWN0cy5cclxuICovXHJcbmNsYXNzIFByb2R1Y3RzIFxyXG57XHJcblx0LyoqXHJcblx0ICogSW5pdGFsaXplIHRoZSBDb250YWluZXIuXHJcblx0ICovXHJcblx0Y29uc3RydWN0b3IoY29udGFpbmVyLCBodHRwKSBcclxuXHR7XHJcblx0XHRDb250YWluZXIkMyA9IGNvbnRhaW5lcjtcclxuXHRcdEh0dHAgPSBodHRwO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogU2V0cyB0aGUgZ2l2ZW4gc2V0dGluZ3MgZnJvbSB0aGUgdXNlci5cclxuXHQgKi9cclxuXHRzZXR1cChzZXR0aW5ncylcclxuXHR7XHJcblx0XHRkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgZnVuY3Rpb24oKSB7XHJcblx0XHRcdFxyXG5cdFx0aWYgKHR5cGVvZiBzZXR0aW5ncyAhPSAnb2JqZWN0Jykge1xyXG5cdFx0XHR0aHJvdyBuZXcgSW52YWxpZEFyZ3VtZW50RXhjZXB0aW9uJDE7XHJcblx0XHR9XHJcblxyXG5cdFx0dGhpcy5zZXR0aW5ncyA9IENvbW1vbi5leHRlbmQoZGVmYXVsdFNldHRpbmdzJDMsIHNldHRpbmdzKTtcclxuXHJcblx0XHR0aGlzLnNldEVsZW1lbnQodGhpcy5zZXR0aW5ncy5lbGVtZW50KTtcclxuXHJcblx0XHR0aGlzLmFkZFN0eWxlVGFnKCk7XHRcclxuXHRcdFxyXG5cdFx0aWYgKENvbnRhaW5lciQzLlBhZ2luYXRpb24gJiYgQ29udGFpbmVyJDMuUGFnaW5hdGlvbi5ib290ZWQpIHtcclxuXHRcdFx0bGV0IGluc3RhbmNlID0gdGhpcztcclxuXHJcblx0XHRcdGluc3RhbmNlLmdldFByb2R1Y3RzKDEpLnRoZW4oZnVuY3Rpb24ocHJvZHVjdHMpIHtcclxuXHRcdFx0XHRpbnN0YW5jZS5yZXBsYWNlSXRlbXMocHJvZHVjdHMpO1xyXG5cdFx0XHR9KTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdHRoaXMubG9hZEFsbFByb2R1Y3RzKCk7XHJcblx0XHR9XHJcblxyXG5cdFx0fS5iaW5kKHRoaXMpKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIExvYWRzIHRoZSBwcm9kdWN0cyBhbmQgcmVwbGFjZSB0aGVtIGluIHRoZSBkaXYgY29udGFpbmVyLlxyXG5cdCAqL1xyXG5cdGxvYWRBbGxQcm9kdWN0cygpXHJcblx0e1xyXG5cdFx0bGV0IHJlcXVlc3QgPSB0aGlzLmdldFByb2R1Y3RzKCk7XHJcblx0XHRcdFxyXG5cdFx0cmVxdWVzdC50aGVuKGZ1bmN0aW9uKGl0ZW1zKSB7XHJcblxyXG5cdFx0XHR0aGlzLmN1cnJlbnRJdGVtcyA9IGl0ZW1zO1xyXG5cclxuXHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLmN1cnJlbnRJdGVtcy5sZW5ndGg7IGkrKykge1xyXG5cdFx0XHRcdHZhciBwcm9kdWN0ID0gdGhpcy5jdXJyZW50SXRlbXNbaV07XHJcblx0XHRcdFx0dGhpcy5BZnRlckxvYWRlZC5jYWxsKHRoaXMsIHByb2R1Y3QpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRFdmVudC50cmlnZ2VyKCdQcm9kdWN0c1dlcmVGZXRjaGVkJywgaXRlbXMpO1xyXG5cdFx0XHR0aGlzLnJlcGxhY2VJdGVtcyhpdGVtcyk7XHJcblx0XHR9LmJpbmQodGhpcykpLmNhdGNoKGZ1bmN0aW9uKGVycm9yKSB7XHJcblxyXG5cdFx0fSk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBTZXRzIHRoZSBET00gZWxlbWVudCBmb3IgcG9wdWxhdGluZyB0aGUgcHJvZHVjdHMuXHJcblx0ICovXHJcblx0c2V0RWxlbWVudChzZWxlY3RvcilcclxuXHR7XHJcblx0XHR0aGlzLndyYXBwZXIgPSBET00uZmluZChzZWxlY3Rvcik7XHJcblxyXG5cdFx0aWYgKHRoaXMud3JhcHBlcikge1xyXG5cdFx0XHRET00uYWRkQ2xhc3ModGhpcy53cmFwcGVyLCB0aGlzLnNldHRpbmdzLmNsYXNzKTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFJlcGxhY2UgaXRlbXMgaW4gdGhlIGNvbnRhaW5lci5cclxuXHQgKi9cclxuXHRyZXBsYWNlSXRlbXMoaXRlbXMpIFxyXG5cdHtcclxuXHRcdGlmICghIEFycmF5LmlzQXJyYXkoaXRlbXMpIHx8IChpdGVtcy5sZW5ndGggPD0gMCAmJiB0eXBlb2YgaXRlbXNbMF0gPT0gJ3N0cmluZycpKSB7XHJcblx0XHRcdHRocm93IG5ldyBJbnZhbGlkQXJndW1lbnRFeGNlcHRpb24kMTtcclxuXHRcdH1cclxuXHJcblx0XHRsZXQgcHJvZHVjdHMgPSB0aGlzLmJ1aWxkUHJvZHVjdHMoaXRlbXMsIHRoaXMuc2V0dGluZ3MuaXRlbV9jbGFzcywgJ2RpdicpO1xyXG5cclxuXHRcdHRoaXMud3JhcHBlci5pbm5lckhUTUwgPSAnJztcclxuXHRcdHByb2R1Y3RzLmZvckVhY2goZnVuY3Rpb24ocHJvZHVjdCkge1xyXG5cdFx0XHR0aGlzLndyYXBwZXIuYXBwZW5kQ2hpbGQocHJvZHVjdCk7XHJcblx0XHR9LmJpbmQodGhpcykpO1xyXG5cclxuXHRcdHJldHVybiBpdGVtcztcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIE1ha2VzIGFuIEFqYXggY2FsbCB0byB0aGUgc2VydmVyIHdpdGhvdXQgcGFyYW1ldGVycy5cclxuXHQgKi9cclxuXHRnZXRQcm9kdWN0cyhwYWdlTnVtYmVyID0gbnVsbClcclxuXHR7XHJcblx0XHRsZXQgYWN0aW9uID0gKHBhZ2VOdW1iZXIpID8gdGhpcy5zZXR0aW5ncy51cmwgKyAnP3BhZ2U9JyArIHBhZ2VOdW1iZXIgOiB0aGlzLnNldHRpbmdzLnVybDtcclxuXHJcblx0XHRyZXR1cm4gSHR0cC5nZXQoe1xyXG5cdFx0XHR1cmw6IGFjdGlvbixcclxuXHRcdH0pO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQnVpbGRzIHRoZSBodG1sIGZvciB0aGUgcHJvZHVjdHMuXHJcblx0ICovXHJcblx0YnVpbGRQcm9kdWN0cyhhdHRyaWJ1dGVzQ29sbGVjdGlvbiwgY2xhc3NOYW1lLCB0YWdUeXBlKSBcclxuXHR7XHJcblx0XHRpZihhdHRyaWJ1dGVzQ29sbGVjdGlvbi5jb25zdHJ1Y3Rvci5uYW1lICE9ICdBcnJheScgKSB7XHJcblx0XHRcdHRocm93IG5ldyBJbnZhbGlkQXJndW1lbnRFeGNlcHRpb24kMTtcclxuXHRcdH1cclxuXHJcblx0XHRsZXQgYnVpbHRQcm9kdWN0cyA9IFtdO1xyXG5cclxuXHRcdGF0dHJpYnV0ZXNDb2xsZWN0aW9uLmZvckVhY2goZnVuY3Rpb24oYXR0cmlidXRlcykge1xyXG5cdFx0XHRsZXQgYnVpbHRQcm9kdWN0ID0gdGhpcy5idWlsZFByb2R1Y3QoYXR0cmlidXRlcywgY2xhc3NOYW1lLCB0YWdUeXBlKTtcclxuXHRcdFx0YnVpbHRQcm9kdWN0cy5wdXNoKGJ1aWx0UHJvZHVjdCk7XHJcblx0XHR9LmJpbmQodGhpcykpO1xyXG5cclxuXHRcdHJldHVybiBidWlsdFByb2R1Y3RzO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQnVpbGRzIHRoZSBodG1sIGZvciBhIHNpbmdsZSBwcm9kdWN0LlxyXG5cdCAqL1xyXG5cdGJ1aWxkUHJvZHVjdChhdHRyaWJ1dGVzLCBjbGFzc05hbWUsIHRhZ1R5cGUpIFxyXG5cdHtcclxuXHRcdGlmICh0eXBlb2YgYXR0cmlidXRlcyAhPSAnb2JqZWN0JyB8fCB0eXBlb2YgdGFnVHlwZSAhPSAnc3RyaW5nJykge1xyXG5cdFx0XHR0aHJvdyBuZXcgSW52YWxpZEFyZ3VtZW50RXhjZXB0aW9uJDE7XHJcblx0XHR9XHJcblxyXG5cdFx0Y2xhc3NOYW1lID0gY2xhc3NOYW1lIHx8IG51bGw7XHJcblxyXG5cdFx0bGV0IHByb2R1Y3QgPSBET00uY3JlYXRlRWxlbWVudCgnZGl2Jywge1xyXG5cdFx0XHRjbGFzczogJ3Byb2R1Y3QnXHJcblx0XHR9KTtcclxuXHJcblx0XHRET00uYWRkQ2xhc3MocHJvZHVjdCwgY2xhc3NOYW1lKTtcclxuXHJcblx0XHRsZXQgb3ZlcmxheSA9IERPTS5jcmVhdGVFbGVtZW50KCdkaXYnLCB7XHJcblx0XHRcdGNsYXNzOiAncHJvZHVjdC1vdmVybGF5JyxcclxuXHRcdH0pO1xyXG5cclxuXHRcdHByb2R1Y3QuYXBwZW5kQ2hpbGQob3ZlcmxheSk7XHJcblxyXG5cdFx0Zm9yICh2YXIgYXR0cmlidXRlIGluIGF0dHJpYnV0ZXMpIHtcclxuXHRcdFx0aWYgKCEgQ29tbW9uLmluX2FycmF5KGF0dHJpYnV0ZSwgdGhpcy5zZXR0aW5ncy5hdHRyaWJ1dGVzKSkge1xyXG5cdFx0XHRcdGNvbnRpbnVlO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRsZXQgdGFnID0gRE9NLmNyZWF0ZUVsZW1lbnQodGFnVHlwZSk7XHJcblxyXG5cdFx0XHRpZiAoYXR0cmlidXRlID09ICdpbWFnZScpIHtcclxuXHRcdFx0XHRsZXQgaW1hZ2UgPSBET00uY3JlYXRlRWxlbWVudCgnaW1nJywge1xyXG5cdFx0XHRcdFx0c3JjOiBhdHRyaWJ1dGVzW2F0dHJpYnV0ZV1cclxuXHRcdFx0XHR9KTtcclxuXHRcdFx0XHRwcm9kdWN0LmFwcGVuZENoaWxkKGltYWdlKTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHR0YWcuaW5uZXJIVE1MID0gYXR0cmlidXRlc1thdHRyaWJ1dGVdIHx8ICcnO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRET00uYWRkQ2xhc3ModGFnLCAncHJvZHVjdC0nICsgU3RyLmtlYmFiQ2FzZShhdHRyaWJ1dGUpKTtcclxuXHRcdFx0b3ZlcmxheS5hcHBlbmRDaGlsZCh0YWcpO1xyXG5cdFx0fVxyXG5cclxuXHRcdGxldCB0YWcgPSBET00uY3JlYXRlRWxlbWVudCgnZGl2Jywge1xyXG5cdFx0XHRpZDogJ2FjdGlvbkJ1dHRvbnMnLFxyXG5cdFx0XHRjbGFzczogJ2FjdGlvbi1idXR0b25zJ1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0bGV0IGFkZFRvQ2FydCA9IERPTS5jcmVhdGVFbGVtZW50KCdidXR0b24nLCB7XHJcblx0XHRcdGlkOiAnYWRkVG9DYXJ0JyxcclxuXHRcdFx0Y2xhc3M6IHRoaXMuc2V0dGluZ3MuYWRkX2J1dHRvbl9jbGFzcyxcclxuXHRcdFx0dHlwZTogJ2J1dHRvbicsXHJcblx0XHRcdHRleHQ6ICcrJyxcclxuXHRcdH0pO1xyXG5cclxuXHRcdGxldCBmYXZvcml0ZSA9IERPTS5jcmVhdGVFbGVtZW50KCdidXR0b24nLCB7XHJcblx0XHRcdGlkOiAnZmF2b3JpdGUnLFxyXG5cdFx0XHRjbGFzczogdGhpcy5zZXR0aW5ncy5mYXZvcml0ZV9idXR0b25fY2xhc3MsXHJcblx0XHRcdHR5cGU6ICdidXR0b24nLFxyXG5cdFx0XHR0ZXh0OiAnJmhlYXJ0czsnXHJcblx0XHR9KTtcclxuXHJcblx0XHR0YWcuYXBwZW5kQ2hpbGQoYWRkVG9DYXJ0KTtcclxuXHRcdHRhZy5hcHBlbmRDaGlsZChmYXZvcml0ZSk7XHJcblxyXG5cdFx0YWRkVG9DYXJ0LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oZXZlbnQpIHtcclxuXHRcdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuXHRcdFx0RXZlbnQudHJpZ2dlcignUHJvZHVjdFdhc0FkZGVkJywgYXR0cmlidXRlcyk7XHJcblx0XHR9KTtcclxuXHJcblx0XHRvdmVybGF5LmFwcGVuZENoaWxkKHRhZyk7XHJcblxyXG5cdFx0cmV0dXJuIHByb2R1Y3Q7XHJcblx0fVxyXG5cclxuXHRhZGRUb0NhcnQoZXZlbnQpXHJcblx0e1xyXG5cdFx0XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBBbiBldmVudCBmb3IgdGhlIGNsaWVudCBvZiB3aGVuIHRoZSBwcm9kdWN0cyBhcyBiZWVuIGxvYWRlZC5cclxuXHQgKi9cclxuXHRBZnRlckxvYWRlZChwcm9kdWN0KSBcclxuXHR7XHJcblx0XHQvL1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQWRkIHRoZSBlQ29tbWVyY2Ugc3R5bGUgdGFncyB0byB0aGUgRE9NLlxyXG5cdCAqL1xyXG5cdGFkZFN0eWxlVGFnKCkgXHJcblx0e1xyXG5cdFx0aWYoRE9NLmZpbmQoJyNlQ29tbWVyY2UtUHJvZHVjdHMnKSkge1xyXG5cdFx0XHRyZXR1cm47XHJcblx0XHR9XHJcblxyXG5cdFx0bGV0IGNzcyA9IGBcclxuXHRcdFx0LnByb2R1Y3Qge1xyXG5cdFx0XHRcdHBvc2l0aW9uOiByZWxhdGl2ZTtcclxuXHRcdFx0XHRtYXJnaW46IDVweCA1cHg7XHJcblx0XHRcdFx0Ym9yZGVyOiAxcHggc29saWQgI2U0ZTRlNDtcclxuXHRcdFx0XHR3aWR0aDogJHt0aGlzLnNldHRpbmdzLndpZHRofTtcclxuXHRcdFx0XHRoZWlnaHQ6ICR7dGhpcy5zZXR0aW5ncy5oZWlnaHR9O1xyXG5cdFx0XHRcdGN1cnNvcjogcG9pbnRlcjtcclxuXHRcdFx0XHRjb2xvcjogI2ZmZmZmZjtcclxuXHRcdFx0XHRvdmVyZmxvdzogaGlkZGVuO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHQucHJvZHVjdCA+IC5wcm9kdWN0LW92ZXJsYXkge1xyXG5cdFx0XHRcdHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuXHRcdFx0XHR0b3A6IDA7XHJcblx0XHRcdFx0bGVmdDogMDtcclxuXHRcdFx0XHR3aWR0aDogMTAwJTtcclxuXHRcdFx0XHRoZWlnaHQ6IDEwMCU7XHJcblx0XHRcdFx0b3BhY2l0eTogMC41O1xyXG5cdFx0XHRcdHotaW5kZXg6IDU7XHJcblx0XHRcdFx0dHJhbnNpdGlvbjogMXMgYWxsO1xyXG5cdFx0XHRcdHRyYW5zZm9ybTogdHJhbnNsYXRlWCgtMjUwcHgpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHQucHJvZHVjdDpob3ZlciA+IC5wcm9kdWN0LW92ZXJsYXkge1xyXG5cdFx0XHRcdGJhY2tncm91bmQ6IHJnYmEoMCwgMCwgMCwgMC40NSk7XHJcblx0XHRcdFx0dHJhbnNmb3JtOiB0cmFuc2xhdGVYKDBweCk7XHJcblx0XHRcdFx0b3BhY2l0eTogMTtcclxuXHRcdFx0XHR0cmFuc2l0aW9uOiAxcyBhbGw7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdC5wcm9kdWN0ID4gaW1nIHtcclxuXHRcdFx0XHRwb3NpdGlvbjogYWJzb2x1dGU7XHJcblx0XHRcdFx0bGVmdDogMDtcclxuXHRcdFx0XHR0b3A6IDA7XHJcblx0XHRcdFx0d2lkdGg6IDEwMCU7XHJcblx0XHRcdFx0aGVpZ2h0OiAxMDAlO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHQucHJvZHVjdCA+IC5wcm9kdWN0LWltYWdlIHtcclxuXHRcdFx0XHR6LWluZGV4OiAwO1xyXG5cdFx0XHRcdHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuXHRcdFx0XHR0b3A6IDA7XHJcblx0XHRcdFx0bGVmdDogMDtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0LnByb2R1Y3QgPiAucHJvZHVjdC1vdmVybGF5ID4gLnByb2R1Y3QtbmFtZSwgXHJcblx0XHRcdC5wcm9kdWN0ID4gLnByb2R1Y3Qtb3ZlcmxheSA+IC5wcm9kdWN0LXByaWNlLFxyXG5cdFx0XHQucHJvZHVjdCA+IC5wcm9kdWN0LW92ZXJsYXkgPiAucHJvZHVjdC1kZWxpdmVyeS10aW1lIHtcclxuXHRcdFx0XHR6LWluZGV4OiAxO1xyXG5cdFx0XHRcdHBvc2l0aW9uOiByZWxhdGl2ZTtcclxuXHRcdFx0XHR0ZXh0LWFsaWduOiBjZW50ZXI7XHJcblx0XHRcdFx0bWFyZ2luLXRvcDogMjVweDtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0LnByb2R1Y3QgPiAucHJvZHVjdC1vdmVybGF5ID4gLmFjdGlvbi1idXR0b25zIHtcclxuXHRcdFx0XHR3aWR0aDogMTAwJTtcclxuXHRcdFx0XHRtYXJnaW4tdG9wOiAxMHB4O1xyXG5cdFx0XHRcdHRleHQtYWxpZ246IGNlbnRlcjtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0LnByb2R1Y3QgPiAucHJvZHVjdC1vdmVybGF5ID4gLmFjdGlvbi1idXR0b25zID4gI2Zhdm9yaXRlIHtcclxuXHRcdFx0XHRtYXJnaW4tbGVmdDogMTBweDtcclxuXHRcdFx0fVxyXG5cclxuXHRcdGA7XHJcblx0ICAgIFxyXG5cdCAgICBET00uYWRkU3R5bGUoJ2VDb21tZXJjZS1Qcm9kdWN0cycsIGNzcyk7XHJcblx0fVxyXG59XG5cbi8qKlxyXG4gKiBUaGUgU2VydmljZXMgT2JqZWN0LCBoYW5kbGVzIHRoZSBzZXJ2aWNlcy5cclxuICovXHJcbmNsYXNzIFNlcnZpY2VzIFxyXG57XHJcblxyXG59XG5cbi8qKlxyXG4gKiBUaGUgZGVmYXVsdCBzZXR0aW5ncyBvZiB0aGUgcGFnaW5hdGlvbi5cclxuICovXHJcbmxldCBkZWZhdWx0U2V0dGluZ3MkNCA9IHtcclxuXHRlbGVtZW50OiAnLnBhZ2luYXRpb24tbGlua3MnLFxyXG5cdGNsYXNzOiAnJyxcclxuXHRwZXJfcGFnZTogNSxcclxuXHR0b3RhbF9pdGVtczogMTAsXHJcbn07XHJcblxyXG4vKipcclxuICogU3RvcmVzIHRoZSBjb250YWluZXIgb2JqZWN0LlxyXG4gKi9cclxubGV0IENvbnRhaW5lciQ0O1xyXG5cclxuLyoqXHJcbiAqIFN0b3JlcyB0aGUgcHJvZHVjdHMgY29tcG9uZW50LlxyXG4gKi9cclxubGV0IFByb2R1Y3RzJDI7XHJcblxyXG4vKipcclxuICogVGhlIFBhZ2luYXRpb24gT2JqZWN0LCBoYW5kbGVzIHRoZSBwYWdpbmF0aW9uLlxyXG4gKi9cclxuY2xhc3MgUGFnaW5hdGlvbiBcclxue1xyXG5cdC8qKlxyXG5cdCAqIEluaXRpYWxpemUgdGhlIGNvbnRhaW5lciBvYmplY3QgYW5kIHRoZSBkZWZhdWx0IHNldHRpbmdzLlxyXG5cdCAqL1xyXG5cdGNvbnN0cnVjdG9yKGNvbnRhaW5lciwgcHJvZHVjdHMpIFxyXG5cdHtcclxuXHRcdHRoaXMuc2V0Q3VycmVudCgxKTtcclxuXHRcdENvbnRhaW5lciQ0ID0gY29udGFpbmVyO1xyXG5cdFx0UHJvZHVjdHMkMiA9IHByb2R1Y3RzO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogU2V0IHRoZSBQYWdpbmF0aW9uIG9iamVjdCB1cC5cclxuXHQgKi9cclxuXHRzZXR1cChzZXR0aW5ncylcclxuXHR7XHJcblx0XHRkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgZnVuY3Rpb24oKSB7XHJcblxyXG5cdFx0aWYodHlwZW9mIHNldHRpbmdzICE9ICdvYmplY3QnKSB7XHJcblx0XHRcdHRocm93IG5ldyBJbnZhbGlkQXJndW1lbnRFeGNlcHRpb24kMTtcclxuXHRcdH1cclxuXHJcblx0XHR0aGlzLnNldHRpbmdzID0gQ29tbW9uLmV4dGVuZChkZWZhdWx0U2V0dGluZ3MkNCwgc2V0dGluZ3MpO1xyXG5cclxuXHRcdHRoaXMudG90YWxQYWdlcyA9IHRoaXMuY2FsY3VsYXRlVG90YWxQYWdlcyh0aGlzLnNldHRpbmdzLnBlcl9wYWdlLCB0aGlzLnNldHRpbmdzLnRvdGFsX2l0ZW1zKTtcclxuXHRcdFxyXG5cdFx0dGhpcy5zZXRFbGVtZW50KHRoaXMuc2V0dGluZ3MuZWxlbWVudCk7XHJcblx0XHR0aGlzLnJlcGxhY2VMaW5rcyh0aGlzLmxpbmtzKTtcclxuXHJcblx0XHR9LmJpbmQodGhpcykpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogU2V0cyB0aGUgd3JhcHBlciBlbGVtZW50LlxyXG5cdCAqL1xyXG5cdHNldEVsZW1lbnQoc2VsZWN0b3IpXHJcblx0e1xyXG5cdFx0dGhpcy53cmFwcGVyID0gRE9NLmZpbmQoc2VsZWN0b3IpO1xyXG5cdFx0XHJcblx0XHRET00uYWRkQ2xhc3ModGhpcy53cmFwcGVyLCB0aGlzLnNldHRpbmdzLmNsYXNzKTtcclxuXHJcblx0XHR0aGlzLmxpbmtzID0gdGhpcy5jcmVhdGVMaW5rcygpO1xyXG5cdFx0dGhpcy5iaW5kRXZlbnRMaXN0ZW5lcnModGhpcy5saW5rcyk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBSZXBsYWNlcyB0aGUgbGlua3MgaW4gdGhlIHdyYXBwZXIuXHJcblx0ICovXHJcblx0cmVwbGFjZUxpbmtzKGxpbmtzKVxyXG5cdHtcclxuXHRcdHRoaXMud3JhcHBlci5pbm5lckhUTUwgPSAnJztcclxuXHRcdHRoaXMud3JhcHBlci5hcHBlbmRDaGlsZChsaW5rcyk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBDYWxjdWxhdGVzIHRoZSB0b3RhbCBwYWdlcy5cclxuXHQgKi9cclxuXHRjYWxjdWxhdGVUb3RhbFBhZ2VzKHBlclBhZ2UsIHRvdGFsSXRlbXMpXHJcblx0e1xyXG5cdFx0cGVyUGFnZSA9IHBhcnNlSW50KHBlclBhZ2UpO1xyXG5cdFx0dG90YWxJdGVtcyA9IHBhcnNlSW50KHRvdGFsSXRlbXMpO1xyXG5cclxuXHRcdHJldHVybiBNYXRoLmNlaWwodG90YWxJdGVtcyAvIHBlclBhZ2UpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQmluZHMgdGhlIGJ1dHRvbnMgZXZlbnRzIGxpc3RlbmVycy5cclxuXHQgKi9cclxuXHRiaW5kRXZlbnRMaXN0ZW5lcnMobGlua3MpIFxyXG5cdHtcclxuXHRcdGxldCBpbnN0YW5jZSA9IHRoaXM7XHJcblxyXG5cdFx0dGhpcy5uZXh0LmNoaWxkTm9kZXNbMF0ub25jbGljayA9IGZ1bmN0aW9uKGV2ZW50KSB7XHJcblx0XHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG5cdFx0XHRsZXQgcmVxdWVzdGVkUGFnZSA9IGluc3RhbmNlLmN1cnJlbnQrMTtcclxuXHJcblx0XHRcdGlmIChpbnN0YW5jZS5ub3RJblBhZ2VSYW5nZShyZXF1ZXN0ZWRQYWdlKSkge1xyXG5cdFx0XHRcdHRocm93IG5ldyBOb3RJblBhZ2VSYW5nZUV4Y2VwdGlvbjtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0UHJvZHVjdHMkMi5nZXRQcm9kdWN0cyhyZXF1ZXN0ZWRQYWdlKS50aGVuKGZ1bmN0aW9uKHByb2R1Y3RzKSB7XHJcblx0XHRcdFx0UHJvZHVjdHMkMi5yZXBsYWNlSXRlbXMocHJvZHVjdHMpO1xyXG5cdFx0XHR9KTtcclxuXHJcblx0XHRcdGluc3RhbmNlLnNldEN1cnJlbnQocmVxdWVzdGVkUGFnZSk7XHJcblx0XHR9O1xyXG5cclxuXHRcdHRoaXMucHJldmlvdXMuY2hpbGROb2Rlc1swXS5vbmNsaWNrID0gZnVuY3Rpb24oZXZlbnQpIHtcclxuXHRcdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuXHJcblx0XHRcdGxldCByZXF1ZXN0ZWRQYWdlID0gaW5zdGFuY2UuY3VycmVudC0xO1xyXG5cclxuXHRcdFx0aWYoaW5zdGFuY2Uubm90SW5QYWdlUmFuZ2UocmVxdWVzdGVkUGFnZSkpIHtcclxuXHRcdFx0XHR0aHJvdyBuZXcgTm90SW5QYWdlUmFuZ2VFeGNlcHRpb247XHJcblx0XHRcdH1cclxuXHRcdFx0XHJcblx0XHRcdFByb2R1Y3RzJDIuZ2V0UHJvZHVjdHMocmVxdWVzdGVkUGFnZSkudGhlbihmdW5jdGlvbihwcm9kdWN0cykge1xyXG5cdFx0XHRcdFByb2R1Y3RzJDIucmVwbGFjZUl0ZW1zKHByb2R1Y3RzKTtcclxuXHRcdFx0fSk7XHJcblxyXG5cdFx0XHRpbnN0YW5jZS5zZXRDdXJyZW50KHJlcXVlc3RlZFBhZ2UpO1xyXG5cdFx0fTtcclxuXHJcblx0XHRmb3IodmFyIGkgPSAwOyBpIDwgdGhpcy5wYWdlcy5sZW5ndGg7IGkrKykge1xyXG5cdFx0XHR0aGlzLnBhZ2VzW2ldLmNoaWxkTm9kZXNbMF0ub25jbGljayA9IGZ1bmN0aW9uKGV2ZW50KSB7XHJcblx0XHRcdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuXHRcdFx0XHRcclxuXHRcdFx0XHRsZXQgcmVxdWVzdGVkUGFnZSA9IHRoaXMuZ2V0QXR0cmlidXRlKCdkYXRhLXBhZ2UtbnInKTtcclxuXHRcdFx0XHRcclxuXHRcdFx0XHRQcm9kdWN0cyQyLmdldFByb2R1Y3RzKHJlcXVlc3RlZFBhZ2UpLnRoZW4oZnVuY3Rpb24ocHJvZHVjdHMpIHtcclxuXHRcdFx0XHRcdFByb2R1Y3RzJDIucmVwbGFjZUl0ZW1zKHByb2R1Y3RzKTtcclxuXHRcdFx0XHR9KTtcclxuXHRcdFx0XHRcclxuXHRcdFx0XHRpbnN0YW5jZS5zZXRDdXJyZW50KHJlcXVlc3RlZFBhZ2UpO1xyXG5cdFx0XHR9O1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogU2V0cyB0aGUgY3VycmVudCBwYWdlLlxyXG5cdCAqL1xyXG5cdHNldEN1cnJlbnQocGFnZU51bWJlcikgXHJcblx0e1xyXG5cdFx0dGhpcy5jdXJyZW50ID0gcGFyc2VJbnQocGFnZU51bWJlcik7XHJcblx0XHR0aGlzLmNoYW5nZVVybChwYWdlTnVtYmVyKTtcclxuXHRcdHRoaXMuc2V0QWN0aXZlTGluayhwYWdlTnVtYmVyKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEdldHMgdGhlIGN1cnJlbnQgcGFnZS5cclxuXHQgKi9cclxuXHRnZXRDdXJyZW50KCkgXHJcblx0e1xyXG5cdFx0cmV0dXJuIHRoaXMuY3VycmVudDtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIENyZWF0ZXMgdGhlIHBhZ2luYXRpb24gbGlua3MuXHJcblx0ICovXHJcblx0Y3JlYXRlTGlua3MoKSBcclxuXHR7XHJcblx0XHRsZXQgdWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd1bCcpO1xyXG5cdFx0XHJcblx0XHR0aGlzLnBhZ2VzID0gdGhpcy5jcmVhdGVQYWdlTGlua3MoKTtcclxuXHRcdHRoaXMucHJldmlvdXMgPSB0aGlzLmNyZWF0ZVByZXZpb3VzQnV0dG9uKCk7XHJcblx0XHR0aGlzLm5leHQgPSB0aGlzLmNyZWF0ZU5leHRCdXR0b24oKTtcclxuXHJcblx0XHR1bC5jbGFzc05hbWUgPSAncGFnaW5hdGlvbic7XHJcblx0XHR1bC5hcHBlbmRDaGlsZCh0aGlzLnByZXZpb3VzKTtcclxuXHJcblx0XHR0aGlzLnBhZ2VzLmZvckVhY2goZnVuY3Rpb24ocGFnZSkge1xyXG5cdFx0XHR1bC5hcHBlbmRDaGlsZChwYWdlKTtcclxuXHRcdH0pO1xyXG5cclxuXHRcdHVsLmFwcGVuZENoaWxkKHRoaXMubmV4dCk7XHJcblxyXG5cdFx0cmV0dXJuIHVsO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQ3JlYXRlcyB0aGUgcGFnZXMgaXRlbSBsaW5rcy5cclxuXHQgKi9cclxuXHRjcmVhdGVQYWdlTGlua3MoKSBcclxuXHR7XHJcblx0XHR2YXIgcGFnZXMgPSBbXTtcclxuXHJcblx0XHRmb3IodmFyIGkgPSAxOyBpIDw9IHRoaXMudG90YWxQYWdlczsgaSsrKSB7XHJcblx0XHRcdHZhciBwYWdlSXRlbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJyk7XHJcblx0XHRcdHZhciBsaW5rID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpO1xyXG5cdFx0XHRwYWdlSXRlbS5jbGFzc05hbWUgPSAodGhpcy5jdXJyZW50ID09IGkpID8gJ3BhZ2UtaXRlbSBhY3RpdmUnIDogJ3BhZ2UtaXRlbSc7XHJcblx0XHRcdGxpbmsuY2xhc3NOYW1lID0gJ3BhZ2UtbGluayc7XHJcblx0XHRcdGxpbmsuc2V0QXR0cmlidXRlKCdocmVmJywgJz9wYWdlPScrIGkpO1xyXG5cdFx0XHRsaW5rLnNldEF0dHJpYnV0ZSgnZGF0YS1wYWdlLW5yJywgaSk7XHJcblx0XHRcdGxpbmsuaW5uZXJIVE1MID0gaTtcclxuXHRcdFx0cGFnZUl0ZW0uYXBwZW5kQ2hpbGQobGluayk7XHJcblx0XHRcdHBhZ2VzLnB1c2gocGFnZUl0ZW0pO1xyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiBwYWdlcztcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIENyZWF0ZXMgdGhlIHByZXZpb3VzIGJ1dHRvbiBsaW5rLlxyXG5cdCAqL1xyXG5cdGNyZWF0ZVByZXZpb3VzQnV0dG9uKCkgXHJcblx0e1xyXG5cdFx0dmFyIGxpID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKTtcclxuXHRcdHZhciBsaW5rID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpO1xyXG5cdFx0dmFyIHNwYW4xID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xyXG5cdFx0dmFyIHNwYW4yID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xyXG5cdFx0XHJcblx0XHRcclxuXHRcdGxpLmNsYXNzTmFtZSA9ICdwYWdlLWl0ZW0nO1xyXG5cdFx0bGluay5jbGFzc05hbWUgPSAncGFnZS1saW5rJztcclxuXHRcdHNwYW4yLmNsYXNzTmFtZSA9ICdzci1vbmx5JztcclxuXHJcblx0XHRsaW5rLnNldEF0dHJpYnV0ZSgnaHJlZicsICcnKTtcclxuXHRcdGxpbmsuc2V0QXR0cmlidXRlKCdhcmlhLWxhYmVsJywgJ1ByZXZpb3VzJyk7XHJcblx0XHRzcGFuMS5zZXRBdHRyaWJ1dGUoJ2FyaWEtaGlkZGVuJywgJ3RydWUnKTtcclxuXHJcblx0XHRzcGFuMS5pbm5lckhUTUwgPSAnJmxhcXVvOyc7XHJcblx0XHRzcGFuMi5pbm5lckhUTUwgPSAnUHJldmlvdXMnO1xyXG5cclxuXHRcdGxpbmsuYXBwZW5kQ2hpbGQoc3BhbjEpO1xyXG5cdFx0bGluay5hcHBlbmRDaGlsZChzcGFuMik7XHJcblx0XHRsaS5hcHBlbmRDaGlsZChsaW5rKTtcclxuXHJcblx0XHRyZXR1cm4gbGk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBDcmVhdGVzIHRoZSBuZXh0IGJ1dHRvbiBsaW5rLlxyXG5cdCAqL1xyXG5cdGNyZWF0ZU5leHRCdXR0b24oKSBcclxuXHR7XHJcblx0XHR2YXIgbGkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaScpO1xyXG5cdFx0dmFyIGxpbmsgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJyk7XHJcblx0XHR2YXIgc3BhbjEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XHJcblx0XHR2YXIgc3BhbjIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XHJcblx0XHRcclxuXHRcdGxpLmNsYXNzTmFtZSA9ICdwYWdlLWl0ZW0nO1xyXG5cdFx0bGluay5jbGFzc05hbWUgPSAncGFnZS1saW5rJztcclxuXHRcdHNwYW4yLmNsYXNzTmFtZSA9ICdzci1vbmx5JztcclxuXHJcblx0XHRsaW5rLnNldEF0dHJpYnV0ZSgnaHJlZicsICcnKTtcclxuXHRcdGxpbmsuc2V0QXR0cmlidXRlKCdhcmlhLWxhYmVsJywgJ05leHQnKTtcclxuXHRcdHNwYW4xLnNldEF0dHJpYnV0ZSgnYXJpYS1oaWRkZW4nLCAndHJ1ZScpO1xyXG5cclxuXHRcdHNwYW4xLmlubmVySFRNTCA9ICcmcmFxdW87JztcclxuXHRcdHNwYW4yLmlubmVySFRNTCA9ICdOZXh0JztcclxuXHJcblx0XHRsaW5rLmFwcGVuZENoaWxkKHNwYW4xKTtcclxuXHRcdGxpbmsuYXBwZW5kQ2hpbGQoc3BhbjIpO1xyXG5cdFx0bGkuYXBwZW5kQ2hpbGQobGluayk7XHJcblxyXG5cdFx0cmV0dXJuIGxpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQ2hlY2tzIGlmIHRoZSBnaXZlbiBwYWdlIGlzIGluIHJhbmdlLlxyXG5cdCAqL1xyXG5cdG5vdEluUGFnZVJhbmdlKHBhZ2VOdW1iZXIpIFxyXG5cdHtcclxuXHRcdHJldHVybiAocGFnZU51bWJlciA+IHRoaXMudG90YWxQYWdlcyB8fCBwYWdlTnVtYmVyIDw9IDApIHx8IGlzTmFOKHBhZ2VOdW1iZXIpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQ2hhbmdlcyB0aGUgdXJsIHRvIGEgZ2l2ZW4gcGFnZSBudW1iZXIuXHJcblx0ICovXHJcblx0Y2hhbmdlVXJsKHBhZ2VOdW1iZXIpIFxyXG5cdHtcclxuXHRcdHBhZ2VOdW1iZXIgPSAgcGFnZU51bWJlciB8fCBHRVRfVmFycygpWydwYWdlJ107XHJcblx0XHR3aW5kb3cuaGlzdG9yeS5yZXBsYWNlU3RhdGUoJycsICcnLCB0aGlzLnVwZGF0ZVVSTFBhcmFtZXRlcih3aW5kb3cubG9jYXRpb24uaHJlZiwgJ3BhZ2UnLCBwYWdlTnVtYmVyKSk7XHJcblx0fVxyXG5cclxuXHRzZXRBY3RpdmVMaW5rKHBhZ2VOdW1iZXIpXHJcblx0e1xyXG5cdFx0Zm9yKHZhciBwYWdlIGluIHRoaXMucGFnZXMpIHtcclxuXHRcdFx0aWYgKHRoaXMucGFnZXNbcGFnZV0uY2hpbGROb2Rlc1swXS5nZXRBdHRyaWJ1dGUoJ2RhdGEtcGFnZS1ucicpID09IHBhZ2VOdW1iZXIpIHtcclxuXHRcdFx0XHRET00uYWRkQ2xhc3ModGhpcy5wYWdlc1twYWdlXSwgJ2FjdGl2ZScpO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdERPTS5yZW1vdmVDbGFzcyh0aGlzLnBhZ2VzW3BhZ2VdLCAnYWN0aXZlJyk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEdldCB0aGUgZ2V0IHZhcmlhYmxlcyBmcm9tIHRoZSB1cmwuXHJcblx0ICovXHJcblx0R0VUX1ZhcnMoKSBcclxuXHR7XHJcblx0XHR2YXIgdmFycyA9IHt9O1xyXG5cdFx0dmFyIHBhcnRzID0gd2luZG93LmxvY2F0aW9uLmhyZWYucmVwbGFjZSgvWz8mXSsoW149Jl0rKT0oW14mXSopL2dpLCBmdW5jdGlvbihtLCBrZXksIHZhbHVlKSB7XHJcblx0XHRcdHZhcnNba2V5XSA9IHZhbHVlO1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0cmV0dXJuIHZhcnM7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBNb2RpZmllcyB0aGUgZ2V0IHBhcmFtZXRlciBpbiB0aGUgdXJsLlxyXG5cdCAqL1xyXG5cdHVwZGF0ZVVSTFBhcmFtZXRlcih1cmwsIHBhcmFtLCBwYXJhbVZhbCkgXHJcblx0e1xyXG5cdCAgICB2YXIgbmV3QWRkaXRpb25hbFVSTCA9IFwiXCI7XHJcblx0ICAgIHZhciB0ZW1wQXJyYXkgPSB1cmwuc3BsaXQoXCI/XCIpO1xyXG5cdCAgICB2YXIgYmFzZVVSTCA9IHRlbXBBcnJheVswXTtcclxuXHQgICAgdmFyIGFkZGl0aW9uYWxVUkwgPSB0ZW1wQXJyYXlbMV07XHJcblx0ICAgIHZhciB0ZW1wID0gXCJcIjtcclxuXHJcblx0ICAgIGlmIChhZGRpdGlvbmFsVVJMKSB7XHJcblx0ICAgICAgICB0ZW1wQXJyYXkgPSBhZGRpdGlvbmFsVVJMLnNwbGl0KFwiJlwiKTtcclxuXHQgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGVtcEFycmF5Lmxlbmd0aDsgaSsrKXtcclxuXHQgICAgICAgICAgICBpZiAodGVtcEFycmF5W2ldLnNwbGl0KCc9JylbMF0gIT0gcGFyYW0pe1xyXG5cdCAgICAgICAgICAgICAgICBuZXdBZGRpdGlvbmFsVVJMICs9IHRlbXAgKyB0ZW1wQXJyYXlbaV07XHJcblx0ICAgICAgICAgICAgICAgIHRlbXAgPSBcIiZcIjtcclxuXHQgICAgICAgICAgICB9XHJcblx0ICAgICAgICB9XHJcblx0ICAgIH1cclxuXHJcblx0ICAgIHZhciByb3dzVGV4dCA9IHRlbXAgKyBcIlwiICsgcGFyYW0gKyBcIj1cIiArIHBhcmFtVmFsO1xyXG5cdCAgICByZXR1cm4gYmFzZVVSTCArIFwiP1wiICsgbmV3QWRkaXRpb25hbFVSTCArIHJvd3NUZXh0O1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogUmVzZXRzIHRoZSBwYWdpbmF0aW9uLlxyXG5cdCAqL1xyXG5cdHJlc2V0KCkgXHJcblx0e1xyXG5cdFx0dGhpcy5zZXRDdXJyZW50KDEpO1xyXG5cdFx0dGhpcy5jaGFuZ2VVcmwoMSk7XHJcblx0fVxyXG59XG5cbi8qKlxyXG4gKiBAZmlsZSBcclxuICogQ29va2llIGNsYXNzLlxyXG4gKlxyXG4gKiBBZGRzIHNvbWUgdXNlZnVsIGZ1bmN0aW9uYWxpdHkgZm9yXHJcbiAqIHNldHRpbmcgb3IgZ2V0dGluZyBjb29raWVzLlxyXG4gKi9cclxuXHRcclxuY2xhc3MgQ29va2llXHJcbntcclxuXHQvKipcclxuIFx0KiBTZXRzIGEgY29va2llLlxyXG4gXHQqIFxyXG4gXHQqIEBwYXJhbSBzdHJpbmcgfCBuYW1lXHJcbiBcdCogQHBhcmFtIEpTT04gfCB2YWx1ZVxyXG4gXHQqIEBwYXJhbSBpbnRlZ2VyIHwgZGF5c1xyXG4gXHQqIEByZXR1cm4gdm9pZFxyXG5cdCovXHJcblx0c3RhdGljIHNldChuYW1lLCB2YWx1ZSwgZGF5cykgXHJcblx0e1xyXG5cdFx0aWYgKHZhbHVlLmNvbnN0cnVjdG9yLm5hbWUgID09ICdPYmplY3QnIHx8IHZhbHVlLmNvbnN0cnVjdG9yLm5hbWUgPT0gJ0FycmF5Jykge1xyXG5cdFx0XHR2YWx1ZSA9IEpTT04uc3RyaW5naWZ5KHZhbHVlKTtcclxuXHRcdH1cclxuXHJcblx0XHRkYXlzID0gZGF5cyB8fCAxMDtcclxuXHJcblx0ICAgIGxldCBleHBpcmVzO1xyXG5cdCAgICBcclxuXHQgICAgaWYgKGRheXMpIHtcclxuXHQgICAgICAgIGxldCBkYXRlID0gbmV3IERhdGUoKTtcclxuXHQgICAgICAgIGRhdGUuc2V0VGltZShkYXRlLmdldFRpbWUoKSArIChkYXlzICogMjQgKiA2MCAqIDYwICogMTAwMCkpO1xyXG5cdCAgICAgICAgZXhwaXJlcyA9IFwiOyBleHBpcmVzPVwiICsgZGF0ZS50b0dNVFN0cmluZygpO1xyXG5cdCAgICB9IGVsc2Uge1xyXG5cdCAgICAgICAgZXhwaXJlcyA9IFwiXCI7XHJcblx0ICAgIH1cclxuXHJcblx0ICAgIGRvY3VtZW50LmNvb2tpZSA9IG5hbWUgKyBcIj1cIiArIHZhbHVlICsgZXhwaXJlcyArIFwiOyBwYXRoPS9cIjtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFJldHJpZXZlcyB0aGUgY29va2llIGJ5IG5hbWUuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gc3RyaW5nIHwgbmFtZVxyXG4gXHQgKiBAcmV0dXJuIEpTT05cclxuXHQgKi9cclxuXHRzdGF0aWMgZ2V0KG5hbWUpIFxyXG5cdHtcclxuXHQgICAgaWYgKGRvY3VtZW50LmNvb2tpZS5sZW5ndGggPiAwKSB7XHJcblx0ICAgICAgICBsZXQgY19zdGFydCA9IGRvY3VtZW50LmNvb2tpZS5pbmRleE9mKG5hbWUgKyBcIj1cIik7XHJcblx0ICAgICAgICBcclxuXHQgICAgICAgIGlmIChjX3N0YXJ0ICE9IC0xKSB7XHJcblx0ICAgICAgICAgICAgY19zdGFydCA9IGNfc3RhcnQgKyBuYW1lLmxlbmd0aCArIDE7XHJcblx0ICAgICAgICAgICAgbGV0IGNfZW5kID0gZG9jdW1lbnQuY29va2llLmluZGV4T2YoXCI7XCIsIGNfc3RhcnQpO1xyXG5cdCAgICAgICAgICAgIFxyXG5cdCAgICAgICAgICAgIGlmIChjX2VuZCA9PSAtMSkge1xyXG5cdCAgICAgICAgICAgICAgICBjX2VuZCA9IGRvY3VtZW50LmNvb2tpZS5sZW5ndGg7XHJcblx0ICAgICAgICAgICAgfVxyXG5cclxuXHQgICAgICAgICAgICByZXR1cm4gSlNPTi5wYXJzZSh1bmVzY2FwZShkb2N1bWVudC5jb29raWUuc3Vic3RyaW5nKGNfc3RhcnQsIGNfZW5kKSkpO1xyXG5cdCAgICAgICAgfVxyXG5cdCAgICB9XHJcblxyXG5cdCAgICByZXR1cm4ge307XHJcblx0fVxyXG59XG5cbi8qKlxyXG4gKiBUaGUgZGVmYXVsdCBzZXR0aW5ncyBvZiB0aGUgY2FydC5cclxuICovXHJcbmxldCBkZWZhdWx0U2V0dGluZ3MkNSA9IHtcclxuXHRlbGVtZW50OiAnLmNhcnQnLFxyXG5cdGNvb2tpZV9uYW1lOiAnY2FydCcsXHJcblx0cHJldmlld19jbGFzczogJycsXHJcblx0bG9hZGVyOiAnL2ltYWdlcy9pY29ucy9zcGlubmVyLnN2ZycsXHJcblx0Y2xhc3M6ICcnLFxyXG5cdHdpZHRoOiAnNjBweCcsXHJcblx0aGVpZ2h0OiAnNjBweCcsXHJcblx0cGxhY2VtZW50OiAncmlnaHQtdG9wJyxcclxuXHRmaXhlZDogdHJ1ZSxcclxuXHRob3Zlcl9jb2xvcjogJ29yYW5nZSdcclxufTtcclxuXHJcbi8qKlxyXG4gKiBTdG9yZXMgdGhlIGNvbnRhaW5lciBvYmplY3QuXHJcbiAqL1xyXG5sZXQgQ29udGFpbmVyJDU7XHJcblxyXG4vKipcclxuICogU3RvcmVzIHRoZSByZXF1ZXN0IG9iamVjdC5cclxuICovXHJcbmxldCBIdHRwJDE7XHJcblxyXG4vKipcclxuICogU3RvcmVzIHRoZSBjYXJ0IGxvYWRlci5cclxuICovXHJcbmxldCBsb2FkaW5nT3ZlcmxheTtcclxuXHJcbi8qKlxyXG4gKiBTdG9yZXMgdGhlIGl0ZW1zIHdyYXBwZXIuXHJcbiAqL1xyXG5sZXQgaXRlbXNEaXY7XHJcblxyXG4vKipcclxuICogVGhlIENhcnQgT2JqZWN0LCBoYW5kbGVzIHRoZSBjYXJ0IGljb24gYW5kIHNlc3Npb25zLlxyXG4gKi9cclxuY2xhc3MgQ2FydCBcclxue1xyXG5cdC8qKlxyXG5cdCAqIEluaXRpYWxpemUgdGhlIGRlZmF1bHQgc2V0dGluZ3MsIHNldHRpbmcgdGhlIGVsZW1lbnQsXHJcblx0ICogYW5kIGNyZWF0aW5nIHRoZSBwcmV2aWV3IGZvciB0aGUgY2FydHMgZGV0YWlscy5cclxuXHQgKi9cclxuXHRjb25zdHJ1Y3Rvcihjb250YWluZXIsIGh0dHApIFxyXG5cdHtcclxuXHRcdENvbnRhaW5lciQ1ID0gY29udGFpbmVyO1xyXG5cdFx0SHR0cCQxID0gaHR0cDtcclxuXHRcdFxyXG5cdFx0dGhpcy5wcmV2aWV3RWxlbWVudCA9IHRoaXMuY3JlYXRlUHJldmlld0VsZW1lbnQoKTtcclxuXHRcdHRoaXMuc3ZnSWNvbiA9IGNyZWF0ZUljb24uY2FsbCh0aGlzKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFNldHMgdGhlIG9iamVjdCBieSB0aGUgdXNlcnMgc2V0dGluZy5cclxuXHQgKi9cclxuXHRzZXR1cChzZXR0aW5ncylcclxuXHR7XHJcblx0XHRpZih0eXBlb2Ygc2V0dGluZ3MgIT0gJ29iamVjdCcpIHtcclxuXHRcdFx0dGhyb3cgbmV3IEludmFsaWRBcmd1bWVudEV4Y2VwdGlvbiQxO1xyXG5cdFx0fVxyXG5cclxuXHRcdHRoaXMuc2V0dGluZ3MgPSBDb21tb24uZXh0ZW5kKGRlZmF1bHRTZXR0aW5ncyQ1LCBzZXR0aW5ncyk7XHJcblxyXG5cdFx0dGhpcy5zZXRFbGVtZW50KHRoaXMuc2V0dGluZ3MuZWxlbWVudCk7XHJcblxyXG5cdFx0RE9NLmFkZENsYXNzKHRoaXMucHJldmlld0VsZW1lbnQsICdjbG9zZWQnKTtcclxuXHRcdERPTS5hZGRDbGFzcyh0aGlzLnByZXZpZXdFbGVtZW50LCB0aGlzLnNldHRpbmdzLnByZXZpZXdfY2xhc3MpO1xyXG5cdFx0XHJcblx0XHR0aGlzLmJpbmRFdmVudExpc3RlbmVycygpO1xyXG5cdFx0dGhpcy5hZGRTdHlsZVRhZygpO1xyXG5cclxuXHRcdGlmKHRoaXMuaXNFbXB0eShDb29raWUuZ2V0KHRoaXMuc2V0dGluZ3MuY29va2llX25hbWUpKSkge1xyXG5cdFx0XHR0aGlzLmNhcnQgPSB7fTtcclxuXHRcdFx0dGhpcy5zZXRDYXJ0KHRoaXMuY2FydCk7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBDaGVja3MgaWYgdGhlIGNhcnQgaXMgZW1wdHlcclxuXHQgKi9cclxuXHRpc0VtcHR5KGNhcnQpXHJcblx0e1xyXG5cdFx0cmV0dXJuIENvbW1vbi5lbXB0eU9iamVjdChjYXJ0KTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFNldHMgdGhlIGNhcnQgYXMgYSBjb29raWUuXHJcblx0ICovXHJcblx0c2V0Q2FydChjYXJ0KVxyXG5cdHtcclxuXHRcdHRoaXMuY2FydC5pZCA9IFN0ci5yYW5kb20oMTApO1xyXG5cdFx0dGhpcy5jYXJ0Lml0ZW1zID0gW107XHJcblx0XHR0aGlzLmNhcnQuZmF2b3JpdGVzID0gW107XHJcblx0XHRDb29raWUuc2V0KHRoaXMuc2V0dGluZ3MuY29va2llX25hbWUsIGNhcnQsIDIpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQWRkcyBhbiBpdGVtIHRvIHRoZSBjYXJ0LlxyXG5cdCAqL1xyXG5cdGFkZEl0ZW0oaXRlbSlcclxuXHR7XHJcblx0XHR0aGlzLmNhcnQgPSBDb29raWUuZ2V0KHRoaXMuc2V0dGluZ3MuY29va2llX25hbWUpO1xyXG5cclxuXHRcdHRoaXMuY2FydC5pdGVtcy5wdXNoKGl0ZW0pO1xyXG5cclxuXHRcdENvb2tpZS5zZXQodGhpcy5zZXR0aW5ncy5jb29raWVfbmFtZSwgdGhpcy5jYXJ0LCAyKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFJlbW92ZXMgYW4gaXRlbSBmcm9tIHRoZSBjYXJ0LlxyXG5cdCAqL1xyXG5cdHJlbW92ZUl0ZW0oaXRlbSlcclxuXHR7XHJcbiBcdFx0dGhpcy5jYXJ0ID0gQ29va2llLmdldCh0aGlzLnNldHRpbmdzLmNvb2tpZV9uYW1lKTtcclxuXHJcbiBcdFx0dGhpcy5jYXJ0Lml0ZW1zLnNwbGljZSh0aGlzLmNhcnQuaXRlbXMuaW5kZXhPZihpdGVtKSwgMSk7XHJcblxyXG4gXHRcdENvb2tpZS5zZXQodGhpcy5zZXR0aW5ncy5jb29raWVfbmFtZSwgdGhpcy5jYXJ0LCAyKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEFkZHMgdGhlIGl0ZW0gdG8gcHJldmlldy5cclxuXHQgKi9cclxuXHRhZGRUb1ByZXZpZXcoaXRlbXMpXHJcblx0e1xyXG5cdFx0aXRlbXNEaXYuaW5uZXJIVE1MID0gJyc7XHJcblxyXG5cdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCBpdGVtcy5sZW5ndGg7IGkrKykge1xyXG5cclxuXHRcdFx0bGV0IGxpID0gRE9NLmNyZWF0ZUVsZW1lbnQoJ2xpJywge1xyXG5cdFx0XHRcdFx0Y2xhc3M6ICdpdGVtJ1xyXG5cdFx0XHRcdH0pO1xyXG5cclxuXHRcdFx0bGV0IGF0dHJpYnV0ZXMgPSBpdGVtc1tpXTtcclxuXHJcblx0XHRcdGZvcihsZXQgYXR0cmlidXRlIGluIGF0dHJpYnV0ZXMpIHtcclxuXHRcdFx0XHRsZXQgc3BhbiA9IERPTS5jcmVhdGVFbGVtZW50KCdzcGFuJywge1xyXG5cdFx0XHRcdFx0dGV4dDogYXR0cmlidXRlc1thdHRyaWJ1dGVdXHJcblx0XHRcdFx0fSk7XHJcblxyXG5cdFx0XHRcdGxpLmFwcGVuZENoaWxkKHNwYW4pO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRpdGVtc0Rpdi5hcHBlbmRDaGlsZChsaSk7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBCaW5kcyBldmVydGhpbmcgdG8gdGhlIGVsZW1lbnQuXHJcblx0ICovXHJcblx0c2V0RWxlbWVudChzZWxlY3RvcilcclxuXHR7XHJcblx0XHR0aGlzLmljb24gPSBET00uZmluZChzZWxlY3Rvcik7XHJcblxyXG5cdFx0aWYgKHRoaXMuaWNvbikge1xyXG5cdFx0XHRET00uYWRkQ2xhc3ModGhpcy5pY29uLCB0aGlzLnNldHRpbmdzLmNsYXNzKTtcclxuXHRcdFx0RE9NLmFkZENsYXNzKHRoaXMuaWNvbiwgdGhpcy5zZXR0aW5ncy5wbGFjZW1lbnQpO1xyXG5cdFx0XHR0aGlzLmljb24uYXBwZW5kQ2hpbGQodGhpcy5zdmdJY29uKTtcclxuXHRcdFx0dGhpcy5pY29uLmFwcGVuZENoaWxkKHRoaXMucHJldmlld0VsZW1lbnQpO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQ3JlYXRlcyB0aGUgY2FydCBkZXRhaWxzIHByZXZpZXcgZWxlbWVudC5cclxuXHQgKi9cclxuXHRjcmVhdGVQcmV2aWV3RWxlbWVudCgpXHJcblx0e1xyXG5cdFx0bGV0IHByZXZpZXdFbGVtZW50ID0gRE9NLmNyZWF0ZUVsZW1lbnQoJ2RpdicsIHtcclxuXHRcdFx0aWQ6ICdwcmV2aWV3J1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0aXRlbXNEaXYgPSBET00uY3JlYXRlRWxlbWVudCgndWwnLCB7XHJcblx0XHRcdFx0Y2xhc3M6ICdpdGVtcydcclxuXHRcdFx0fSk7XHJcblxyXG5cdFx0cHJldmlld0VsZW1lbnQuYXBwZW5kQ2hpbGQoaXRlbXNEaXYpO1xyXG5cclxuXHRcdHJldHVybiBwcmV2aWV3RWxlbWVudDtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEFkZCB0aGUgZUNvbW1lcmNlIHN0eWxlIHRhZ3MgdG8gdGhlIERPTS5cclxuXHQgKi9cclxuXHRhZGRTdHlsZVRhZygpIFxyXG5cdHtcclxuXHRcdGlmKERPTS5maW5kKCcjZUNvbW1lcmNlLUNhcnQnKSkge1xyXG5cdFx0XHRyZXR1cm47XHJcblx0XHR9XHJcblxyXG5cdFx0bGV0IHBvc2l0aW9uID0gKHRoaXMuc2V0dGluZ3MuZml4ZWQpID8gJ2ZpeGVkJyA6ICdhYnNvbHV0ZSc7XHJcblxyXG5cdFx0bGV0IGNzcyA9IGBcclxuXHRcdFx0JHt0aGlzLnNldHRpbmdzLmVsZW1lbnR9IHtcclxuXHRcdFx0XHRwb3NpdGlvbjogJHtwb3NpdGlvbn07XHJcblx0XHRcdFx0Y3Vyc29yOiBwb2ludGVyO1xyXG5cdFx0XHRcdGNvbG9yOiAjZmZmZmZmO1xyXG5cdFx0XHRcdHotaW5kZXg6IDk5ODtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0JHt0aGlzLnNldHRpbmdzLmVsZW1lbnR9ID4gc3ZnIHtcclxuXHRcdFx0XHR3aWR0aDogJHt0aGlzLnNldHRpbmdzLndpZHRofTtcclxuXHRcdFx0XHRoZWlnaHQ6ICR7dGhpcy5zZXR0aW5ncy5oZWlnaHR9O1xyXG5cdFx0XHRcdHRyYW5zaXRpb246IGZpbGwgMC4zcztcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0JHt0aGlzLnNldHRpbmdzLmVsZW1lbnR9ID4gc3ZnOmhvdmVyIHtcclxuXHRcdFx0XHRmaWxsOiAke3RoaXMuc2V0dGluZ3MuaG92ZXJfY29sb3J9O1xyXG5cdFx0XHRcdHRyYW5zaXRpb246IGZpbGwgMC4zcztcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0JHt0aGlzLnNldHRpbmdzLmVsZW1lbnR9LnRvcC1yaWdodCxcclxuXHRcdFx0JHt0aGlzLnNldHRpbmdzLmVsZW1lbnR9LnJpZ2h0LXRvcCB7XHJcblx0XHRcdFx0cmlnaHQ6IDEwcHg7XHJcblx0XHRcdFx0dG9wOiAxMHB4O1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHQke3RoaXMuc2V0dGluZ3MuZWxlbWVudH0ubGVmdC10b3AsXHJcblx0XHRcdCR7dGhpcy5zZXR0aW5ncy5lbGVtZW50fS50b3AtbGVmdCB7XHJcblx0XHRcdFx0bGVmdDogMTBweDtcclxuXHRcdFx0XHR0b3A6IDEwcHg7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdCR7dGhpcy5zZXR0aW5ncy5lbGVtZW50fSA+ICNwcmV2aWV3IHtcclxuXHRcdFx0XHRwb3NpdGlvbjogJHtwb3NpdGlvbn07XHJcblx0XHRcdFx0ei1pbmRleDogOTk5OTtcclxuXHRcdFx0XHR0b3A6IGNhbGMoMTBweCArICR7dGhpcy5zZXR0aW5ncy5oZWlnaHR9KTtcclxuXHRcdFx0XHR0cmFuc2Zvcm06IHRyYW5zbGF0ZVgoNjBweCk7XHJcblx0XHRcdFx0aGVpZ2h0OiA0MDBweDtcclxuXHRcdFx0XHR3aWR0aDogMzAwcHg7XHJcblx0XHRcdFx0Ym9yZGVyOiAxcHggc29saWQgI2U0ZTRlNDtcclxuXHRcdFx0XHRiYWNrZ3JvdW5kOiAjZmZmZmZmO1xyXG5cdFx0XHRcdHRyYW5zaXRpb246IHRyYW5zZm9ybSAxcywgdmlzaWJpbGl0eSAxcztcclxuXHRcdFx0XHRjdXJzb3I6IGRlZmF1bHQ7XHJcblx0XHRcdFx0b3ZlcmZsb3ctWTogc2Nyb2xsO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHQke3RoaXMuc2V0dGluZ3MuZWxlbWVudH0gPiAjcHJldmlldy5vcGVuZWQge1xyXG5cdFx0XHRcdHZpc2liaWxpdHk6IHZpc2libGU7XHJcblx0XHRcdFx0dHJhbnNmb3JtOiB0cmFuc2xhdGVYKC0yNDBweCk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdCR7dGhpcy5zZXR0aW5ncy5lbGVtZW50fSA+ICNwcmV2aWV3LmNsb3NlZCB7XHJcblx0XHRcdFx0dmlzaWJpbGl0eTogaGlkZGVuO1xyXG5cdFx0XHRcdHRyYW5zZm9ybTogdHJhbnNsYXRlWCg2MHB4KTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0JHt0aGlzLnNldHRpbmdzLmVsZW1lbnR9ID4gI3ByZXZpZXcgPiB1bC5pdGVtcyxcclxuXHRcdFx0JHt0aGlzLnNldHRpbmdzLmVsZW1lbnR9ID4gI3ByZXZpZXcgPiB1bC5pdGVtcyA+IGxpLml0ZW0ge1xyXG5cdFx0XHRcdGNvbG9yOiAjMDAwMDAwO1xyXG5cdFx0XHRcdGxpc3Qtc3R5bGUtdHlwZTogbm9uZTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0JHt0aGlzLnNldHRpbmdzLmVsZW1lbnR9IC5pdGVtcy5sb2FkaW5nIHtcclxuXHRcdFx0XHRkaXNwbGF5OiBub25lO1xyXG5cdFx0XHRcdG92ZXJmbG93LVk6IG5vbmU7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdCR7dGhpcy5zZXR0aW5ncy5lbGVtZW50fSAuY2FydC1sb2FkZXItb3ZlcmxheSB7XHJcblx0XHRcdFx0cG9zaXRpb246IGZpeGVkO1xyXG5cdFx0XHRcdHRvcDogMDsgXHJcblx0XHRcdCAgICBsZWZ0OiAwO1xyXG5cdFx0XHQgICAgcmlnaHQ6IDA7XHJcblx0XHRcdCAgICBib3R0b206IDA7XHJcblx0XHRcdFx0YmFja2dyb3VuZDogI2ZmZmZmZjtcclxuXHRcdFx0XHR3aWR0aDogMTAwJTtcclxuXHRcdFx0XHRoZWlnaHQ6IDEwMCU7XHJcblx0XHRcdFx0bWluLWhlaWdodDogMTAwJTtcclxuXHRcdFx0XHRvdmVyZmxvdzogYXV0bztcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0JHt0aGlzLnNldHRpbmdzLmVsZW1lbnR9IC5jYXJ0LWxvYWRlci1vdmVybGF5IC5jYXJ0LWxvYWRlciB7XHJcblx0XHRcdFx0cG9zaXRpb246IGFic29sdXRlO1xyXG5cdFx0XHRcdHdpZHRoOiA1MHB4O1xyXG5cdFx0XHRcdGhlaWdodDogNTBweDtcclxuXHRcdFx0XHRtYXJnaW4tbGVmdDogLTI1cHg7XHJcblx0XHRcdFx0bWFyZ2luLXRvcDogLTI1cHg7XHJcblx0XHRcdFx0bGVmdDogNTAlO1xyXG5cdFx0XHRcdHJpZ2h0OiA1MCU7XHJcblx0XHRcdFx0dG9wOiA1MCU7XHJcblx0XHRcdFx0Ym90dG9tOiA1MCU7XHJcblx0XHRcdH1cclxuXHRcdGA7XHJcblx0ICAgIFxyXG5cdCAgICBET00uYWRkU3R5bGUoJ2VDb21tZXJjZS1DYXJ0JywgY3NzKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIENyZWF0ZXMgYW4gbG9hZGluZyBvdmVybGF5LlxyXG5cdCAqL1xyXG5cdGxvYWRpbmdPdmVybGF5KClcclxuXHR7XHJcblx0XHRpZiAobG9hZGluZ092ZXJsYXkpIHtcclxuXHRcdFx0cmV0dXJuIGxvYWRpbmdPdmVybGF5O1xyXG5cdFx0fVxyXG5cclxuXHRcdGxldCBsb2FkZXIgPSBET00uY3JlYXRlRWxlbWVudCgnaW1nJywge1xyXG5cdFx0XHRzcmM6IHRoaXMuc2V0dGluZ3MubG9hZGVyLFxyXG5cdFx0XHRjbGFzczogJ2NhcnQtbG9hZGVyJ1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0bG9hZGluZ092ZXJsYXkgPSBET00uY3JlYXRlRWxlbWVudCgnZGl2Jywge1xyXG5cdFx0XHRjbGFzczogJ2NhcnQtbG9hZGVyLW92ZXJsYXknXHJcblx0XHR9KTtcclxuXHJcblx0XHRsb2FkaW5nT3ZlcmxheS5hcHBlbmRDaGlsZChsb2FkZXIpO1xyXG5cclxuXHRcdHJldHVybiBsb2FkaW5nT3ZlcmxheTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIExvYWRpbmcgdGhlIGNhcnQgcHJldmlldy5cclxuXHQgKi9cclxuXHRwcmV2aWV3U3RhcnRMb2FkaW5nKClcclxuXHR7XHJcblx0XHRET00uYWRkQ2xhc3MoaXRlbXNEaXYsICdsb2FkaW5nJyk7XHJcblx0XHR0aGlzLnByZXZpZXdFbGVtZW50LmFwcGVuZENoaWxkKHRoaXMubG9hZGluZ092ZXJsYXkoKSk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBMb2FkaW5nIHRoZSBjYXJ0IHByZXZpZXcuXHJcblx0ICovXHJcblx0cHJldmlld1N0b3BMb2FkaW5nKClcclxuXHR7XHJcblx0XHRpZiAoRE9NLmZpbmQoJy5jYXJ0LWxvYWRlci1vdmVybGF5JywgdGhpcy5wcmV2aWV3RWxlbWVudCkpIHtcclxuXHRcdFx0dGhpcy5wcmV2aWV3RWxlbWVudC5yZW1vdmVDaGlsZCh0aGlzLmxvYWRpbmdPdmVybGF5KCkpO1xyXG5cdFx0XHRET00ucmVtb3ZlQ2xhc3MoaXRlbXNEaXYsICdsb2FkaW5nJyk7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBSZWxvYWRzIHRoZSBpdGVtcyBpbiB0aGUgY2FydCBwcmV2aWV3LlxyXG5cdCAqL1xyXG5cdHJlbG9hZENhcnRQcmV2aWV3KClcclxuXHR7XHJcblx0XHR0aGlzLnByZXZpZXdTdGFydExvYWRpbmcoKTtcclxuXHRcdGxldCBpdGVtcyA9IHRoaXMuZ2V0Q2FydEl0ZW1zKCk7XHJcblx0XHR0aGlzLmFkZFRvUHJldmlldyhpdGVtcyk7XHJcblx0XHRcclxuXHRcdGxldCBpbnN0YW5jZSA9IHRoaXM7XHJcblxyXG5cdFx0c2V0VGltZW91dChmdW5jdGlvbigpIHtcclxuXHRcdFx0aW5zdGFuY2UucHJldmlld1N0b3BMb2FkaW5nLmNhbGwoaW5zdGFuY2UpO1xyXG5cdFx0fSwgMTAwMCk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBCaW5kcyBldmVudCBsaXN0ZW5lcnMgdG8gdGhlIGNhcnQgaWNvbi5cclxuXHQgKi9cclxuXHRiaW5kRXZlbnRMaXN0ZW5lcnMoKVxyXG5cdHtcclxuXHRcdGlmKHRoaXMuc3ZnSWNvbiA9PSBudWxsKSB7XHJcblx0XHRcdHJldHVybjtcclxuXHRcdH1cclxuXHJcblx0XHR0aGlzLnN2Z0ljb24ub25jbGljayA9IGZ1bmN0aW9uKGUpIHtcclxuXHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdFx0XHRsZXQgb3BlbmluZyA9IERPTS50b2dnbGVDbGFzcyh0aGlzLnByZXZpZXdFbGVtZW50LCAnb3BlbmVkJywgJ2Nsb3NlZCcpO1xyXG5cdFx0XHRcclxuXHRcdFx0aWYgKG9wZW5pbmcpIHtcclxuXHRcdFx0XHR0aGlzLnJlbG9hZENhcnRQcmV2aWV3KCk7XHRcclxuXHRcdFx0fVxyXG5cdFx0fS5iaW5kKHRoaXMpO1xyXG5cclxuXHRcdEV2ZW50Lmxpc3RlbignUHJvZHVjdFdhc0FkZGVkJywgZnVuY3Rpb24oYXR0cmlidXRlcykge1xyXG5cdFx0XHRsZXQgY2FydCA9IENvb2tpZS5nZXQodGhpcy5zZXR0aW5ncy5jb29raWVfbmFtZSk7XHJcblx0XHRcdGNhcnQuaXRlbXMucHVzaChhdHRyaWJ1dGVzKTtcclxuXHRcdFx0Q29va2llLnNldCh0aGlzLnNldHRpbmdzLmNvb2tpZV9uYW1lLCBjYXJ0KTtcclxuXHRcdFx0dGhpcy5yZWxvYWRDYXJ0UHJldmlldygpO1xyXG5cdFx0fS5iaW5kKHRoaXMpKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFJldHJpZXZlIHRoZSBjYXJ0cyBpdGVtcyBmcm9tIHRoZSBjb29raWUuXHJcblx0ICovXHJcblx0Z2V0Q2FydEl0ZW1zKClcclxuXHR7XHJcblx0XHRsZXQgY2FydCA9IENvb2tpZS5nZXQodGhpcy5zZXR0aW5ncy5jb29raWVfbmFtZSk7XHJcblxyXG5cdFx0cmV0dXJuIChjYXJ0KSA/IGNhcnQuaXRlbXMgOiBbXTtcclxuXHR9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNsb3NlKGV2ZW50KSB7XHJcblx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuXHRET00uc3dpdGNoQ2xhc3Nlcyh0aGlzLnByZXZpZXdFbGVtZW50LCAnb3BlbmVkJywgJ2Nsb3NlZCcpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBjcmVhdGVJY29uKCkge1xyXG5cdGxldCBzdmcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50TlMoXCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiLCBcInN2Z1wiKTtcclxuXHRsZXQgZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnROUyhcImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIsIFwiZ1wiKTtcclxuXHRsZXQgcGF0aCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnROUyhcImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIsIFwicGF0aFwiKTtcclxuXHJcblx0c3ZnLnNldEF0dHJpYnV0ZSgndmVyc2lvbicsICcxLjEnKTtcclxuXHRzdmcuc2V0QXR0cmlidXRlKCd4bWxucycsICdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZycpO1xyXG5cdHN2Zy5zZXRBdHRyaWJ1dGUoJ3htbG5zOnhsaW5rJywgJ2h0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsnKTtcclxuXHRzdmcuc2V0QXR0cmlidXRlKCd4JywgJzBweCcpO1xyXG5cdHN2Zy5zZXRBdHRyaWJ1dGUoJ3knLCAnMHB4Jyk7XHJcblx0c3ZnLnNldEF0dHJpYnV0ZSgnd2lkdGgnLCAnNDQ2Ljg0M3B4Jyk7XHJcblx0c3ZnLnNldEF0dHJpYnV0ZSgnaGVpZ2h0JywgJzQ0Ni44NDNweCcpO1xyXG5cdHN2Zy5zZXRBdHRyaWJ1dGUoJ3ZpZXdCb3gnLCAnMCAwIDQ0Ni44NDMgNDQ2Ljg0MycpO1xyXG5cdHN2Zy5zZXRBdHRyaWJ1dGUoJ3N0eWxlJywgJ2VuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgNDQ2Ljg0MyA0NDYuODQzOycpO1xyXG5cdHN2Zy5zZXRBdHRyaWJ1dGUoJ3htbDpzcGFjZScsICdwcmVzZXJ2ZScpO1xyXG5cclxuXHRwYXRoLnNldEF0dHJpYnV0ZSgnZCcsICdNNDQ0LjA5LDkzLjEwM2MtMi42OTgtMy42OTktNy4wMDYtNS44ODgtMTEuNTg0LTUuODg4SDEwOS45MmMtMC42MjUsMC0xLjI0OSwwLjAzOC0xLjg1LDAuMTE5bC0xMy4yNzYtMzguMjdjLTEuMzc2LTMuOTU4LTQuNDA2LTcuMTEzLTguMy04LjY0NkwxOS41ODYsMTQuMTM0Yy03LjM3NC0yLjg4Ny0xNS42OTUsMC43MzUtMTguNTkxLDguMWMtMi44OTEsNy4zNjksMC43MywxNS42OTUsOC4xLDE4LjU5MWw2MC43NjgsMjMuODcybDc0LjM4MSwyMTQuMzk5Yy0zLjI4MywxLjE0NC02LjA2NSwzLjY2My03LjMzMiw3LjE4N2wtMjEuNTA2LDU5LjczOWMtMS4zMTgsMy42NjMtMC43NzUsNy43MzMsMS40NjgsMTAuOTE2YzIuMjQsMy4xODMsNS44ODMsNS4wNzgsOS43NzMsNS4wNzhoMTEuMDQ0Yy02Ljg0NCw3LjYxNi0xMS4wNDQsMTcuNjQ2LTExLjA0NCwyOC42NzVjMCwyMy43MTgsMTkuMjk4LDQzLjAxMiw0My4wMTIsNDMuMDEyczQzLjAxMi0xOS4yOTQsNDMuMDEyLTQzLjAxMmMwLTExLjAyOS00LjItMjEuMDU5LTExLjA0NC0yOC42NzVoOTMuNzc2Yy02Ljg0Nyw3LjYxNi0xMS4wNDgsMTcuNjQ2LTExLjA0OCwyOC42NzVjMCwyMy43MTgsMTkuMjk0LDQzLjAxMiw0My4wMTMsNDMuMDEyYzIzLjcxOCwwLDQzLjAxMi0xOS4yOTQsNDMuMDEyLTQzLjAxMmMwLTExLjAyOS00LjItMjEuMDU5LTExLjA0My0yOC42NzVoMTMuNDMzYzYuNTk5LDAsMTEuOTQ3LTUuMzQ5LDExLjk0Ny0xMS45NDhjMC02LjU5OS01LjM0OS0xMS45NDctMTEuOTQ3LTExLjk0N0gxNDMuNjQ3bDEzLjMxOS0zNi45OTZjMS43MiwwLjcyNCwzLjU3OCwxLjE1Miw1LjUyMywxLjE1MmgyMTAuMjc4YzYuMjM0LDAsMTEuNzUxLTQuMDI3LDEzLjY1LTkuOTU5bDU5LjczOS0xODYuMzg3QzQ0Ny41NTcsMTAxLjU2Nyw0NDYuNzg4LDk2LjgwMiw0NDQuMDksOTMuMTAzeiBNMTY5LjY1OSw0MDkuODA3Yy0xMC41NDMsMC0xOS4xMTYtOC41NzMtMTkuMTE2LTE5LjExNnM4LjU3My0xOS4xMTcsMTkuMTE2LTE5LjExN3MxOS4xMTYsOC41NzQsMTkuMTE2LDE5LjExN1MxODAuMjAyLDQwOS44MDcsMTY5LjY1OSw0MDkuODA3eiBNMzI3LjM2Nyw0MDkuODA3Yy0xMC41NDMsMC0xOS4xMTctOC41NzMtMTkuMTE3LTE5LjExNnM4LjU3NC0xOS4xMTcsMTkuMTE3LTE5LjExN2MxMC41NDIsMCwxOS4xMTYsOC41NzQsMTkuMTE2LDE5LjExN1MzMzcuOTA5LDQwOS44MDcsMzI3LjM2Nyw0MDkuODA3eiBNNDAyLjUyLDE0OC4xNDloLTczLjE2MVYxMTUuODloODMuNDk5TDQwMi41MiwxNDguMTQ5eiBNMzgxLjQ1MywyMTMuODYxaC01Mi4wOTR2LTM3LjAzOGg2My45NjdMMzgxLjQ1MywyMTMuODYxeiBNMjM0LjU3MSwyMTMuODYxdi0zNy4wMzhoNjYuMTEzdjM3LjAzOEgyMzQuNTcxeiBNMzAwLjY4NCwyNDIuNTM4djMxLjA2NGgtNjYuMTEzdi0zMS4wNjRIMzAwLjY4NHogTTEzOS4xMTUsMTc2LjgyM2g2Ni43ODR2MzcuMDM4aC01My45MzNMMTM5LjExNSwxNzYuODIzeiBNMjM0LjU3MSwxNDguMTQ5VjExNS44OWg2Ni4xMTN2MzIuMjU5SDIzNC41NzF6IE0yMDUuODk4LDExNS44OXYzMi4yNTloLTc2LjczNGwtMTEuMTkxLTMyLjI1OUgyMDUuODk4eiBNMTYxLjkxNiwyNDIuNTM4aDQzLjk4MnYzMS4wNjRoLTMzLjIwNkwxNjEuOTE2LDI0Mi41Mzh6IE0zMjkuMzU5LDI3My42MDN2LTMxLjA2NGg0Mi45MDlsLTkuOTU1LDMxLjA2NEgzMjkuMzU5eicpO1xyXG5cclxuXHRnLmFwcGVuZENoaWxkKHBhdGgpO1xyXG5cdHN2Zy5hcHBlbmRDaGlsZChnKTtcclxuXHJcblx0cmV0dXJuIHN2ZztcclxufVxuXG5sZXQgaW5pdGFsaXplZCA9IGZhbHNlO1xuXG5sZXQgZGVmYXVsdFNldHRpbmdzID0ge1xuXHRlbGVtZW50OiAnYm9keScsXG5cdGltcG9ydEJvb3RzdHJhcDogZmFsc2UsXG5cdGNvbXBvbmVudHM6IFsnUHJvZHVjdHMnLCAnU2VydmljZXMnLCAnRmlsdGVyJywgJ1BhZ2luYXRpb24nLCAnQ2FydCddXG59O1xuXG5jbGFzcyBlQ29tbWVyY2Vcbntcblx0Y29uc3RydWN0b3Ioc2V0dGluZ3MpXG5cdHtcblx0XHRFeGNlcHRpb25IYW5kbGVyLmluaXRhbGl6ZSgpO1xuXG5cdFx0aWYodHlwZW9mIHNldHRpbmdzICE9ICdvYmplY3QnKSB7XG5cdFx0XHR0aHJvdyBuZXcgSW52YWxpZEFyZ3VtZW50RXhjZXB0aW9uJDE7XG5cdFx0fVxuXG5cdFx0dGhpcy5jb250YWluZXIgPSBuZXcgQ29udGFpbmVyO1xuXHRcdHRoaXMuc2V0dGluZ3MgPSBDb21tb24uZXh0ZW5kKGRlZmF1bHRTZXR0aW5ncywgc2V0dGluZ3MpO1xuXHRcdHRoaXMuc2V0dGluZ3MuZWxlbWVudCA9IERPTS5maW5kKHRoaXMuc2V0dGluZ3MuZWxlbWVudCk7XG5cdFx0XG5cdFx0YmluZENvbXBvbmVudHNEZXBlbmRlbmNpZXMuY2FsbCh0aGlzLCBzZXR0aW5ncy5jb21wb25lbnRzKTtcblxuXHRcdGluaXRhbGl6ZWQgPSB0cnVlO1xuXG5cdFx0cmV0dXJuIG5ldyBQcm94eSh0aGlzLCB7XG5cdFx0XHRnZXQ6IGZ1bmN0aW9uKHRhcmdldCwgb2JqZWN0KSB7XG5cdFx0XHRcdGlmKCEgQ29tbW9uLmluX2FycmF5KG9iamVjdCwgc2V0dGluZ3MuY29tcG9uZW50cykpIHtcblx0XHRcdFx0XHR0aHJvdyBuZXcgQ29tcG9uZW50Tm90UmVnaXN0ZXJlZEV4Y2VwdGlvbjtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdHJldHVybiB0YXJnZXQuY29udGFpbmVyLm1ha2Uob2JqZWN0KTtcblx0XHRcdH1cblx0XHR9KTtcblx0fVxufVxuXG4vKipcbiAqIEJpbmRzIGNvbXBvbmVudHMgZGVwZW5kZW5jaWVzLlxuICovXG5mdW5jdGlvbiBiaW5kQ29tcG9uZW50c0RlcGVuZGVuY2llcyhjb21wb25lbnRzKSB7XG5cblx0bGV0IHJlcXVlc3QgPSB0aGlzLmNvbnRhaW5lci5tYWtlKG5ldyBSZXF1ZXN0KTtcblxuXHR0aGlzLmNvbnRhaW5lci5iaW5kKCdGaWx0ZXInLCBmdW5jdGlvbihjb250YWluZXIpIHtcblx0XHRjb250YWluZXJbJ0ZpbHRlciddLmJvb3RlZCA9IHRydWU7XG5cdFx0cmV0dXJuIG5ldyBGaWx0ZXIoY29udGFpbmVyKTtcblx0fSk7XG5cdFxuXHR0aGlzLmNvbnRhaW5lci5iaW5kKCdTZXJ2aWNlcycsIGZ1bmN0aW9uKGNvbnRhaW5lcikgeyBcblx0XHRjb250YWluZXJbJ1NlcnZpY2VzJ10uYm9vdGVkID0gdHJ1ZTtcblx0XHRyZXR1cm4gbmV3IFNlcnZpY2VzKGNvbnRhaW5lcik7XG5cdH0pO1xuXG5cdHRoaXMuY29udGFpbmVyLmJpbmQoJ1Byb2R1Y3RzJywgZnVuY3Rpb24oY29udGFpbmVyKSB7XG5cdFx0Y29udGFpbmVyWydQcm9kdWN0cyddLmJvb3RlZCA9IHRydWU7XG5cdFx0cmV0dXJuIG5ldyBQcm9kdWN0cyhjb250YWluZXIsIHJlcXVlc3QpO1xuXHR9KTtcblxuXHR0aGlzLmNvbnRhaW5lci5iaW5kKCdQYWdpbmF0aW9uJywgZnVuY3Rpb24oY29udGFpbmVyKSB7XG5cdFx0Y29udGFpbmVyWydQYWdpbmF0aW9uJ10uYm9vdGVkID0gdHJ1ZTtcblx0XHRyZXR1cm4gbmV3IFBhZ2luYXRpb24oY29udGFpbmVyLCBjb250YWluZXIubWFrZSgnUHJvZHVjdHMnKSk7XG5cdH0pO1xuXG5cdHRoaXMuY29udGFpbmVyLmJpbmQoJ0NhcnQnLCBmdW5jdGlvbihjb250YWluZXIpIHtcblx0XHRjb250YWluZXJbJ0NhcnQnXS5ib290ZWQgPSB0cnVlO1xuXHRcdHJldHVybiBuZXcgQ2FydChjb250YWluZXIsIHJlcXVlc3QpO1xuXHR9KTtcblxuXHR0aGlzLmNvbnRhaW5lclsnRmlsdGVyJ11bJ2Jvb3RlZCddID0gZmFsc2U7XG5cdHRoaXMuY29udGFpbmVyWydTZXJ2aWNlcyddWydib290ZWQnXSA9IGZhbHNlO1xuXHR0aGlzLmNvbnRhaW5lclsnUHJvZHVjdHMnXVsnYm9vdGVkJ10gPSBmYWxzZTtcblx0dGhpcy5jb250YWluZXJbJ1BhZ2luYXRpb24nXVsnYm9vdGVkJ10gPSBmYWxzZTtcblx0dGhpcy5jb250YWluZXJbJ0NhcnQnXVsnYm9vdGVkJ10gPSBmYWxzZTtcbn1cblxucmV0dXJuIGVDb21tZXJjZTtcblxufSgpKTtcbiJdfQ==
