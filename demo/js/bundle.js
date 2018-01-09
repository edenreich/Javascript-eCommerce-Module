'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TurboeCommerce = function () {
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

	/**
  * @file 
  * Container class.
  *
  * Handles/Controls the dependencies of ecommerce.
  */

	/**
  * Stores the instances
  *
  * @var array
  */


	var _instances = [];

	var Container = function () {
		function Container() {
			_classCallCheck(this, Container);
		}

		_createClass(Container, [{
			key: 'bind',

			/**
    * Binds key to concrete class.
    *
    * @param string | key
    * @param class | concrete
    * @return void
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
    *
    * @param string | key
    * @param object | instance
    * @return void
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
    * Resolves an instance out of 
    * the ioc container.
    * 
    * @param string | key
    * @return object
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
    *
    * @param mixed | instance
    * @return bool
    */

		}, {
			key: 'instanceExist',
			value: function instanceExist(instance) {
				if ((typeof instance === 'undefined' ? 'undefined' : _typeof(instance)) == 'object') {
					return typeof _instances[instance.constructor.name] !== 'undefined';
				} else if (typeof instance == 'string') {
					return typeof _instances[instance] !== 'undefined';
				}

				throw new InvalidArgumentException$1();
			}

			/**
    * Retrieve an object, if not exists
    * will create it, set it in the ioc container
    * for later use and retrieve it.
    *
    * @param mixed | object 
    * @return object
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
    *
    * @return array
    */

		}, {
			key: 'instances',
			value: function instances() {
				return _instances;
			}
		}]);

		return Container;
	}();

	var BadEventCallException = function (_Error4) {
		_inherits(BadEventCallException, _Error4);

		function BadEventCallException(message) {
			_classCallCheck(this, BadEventCallException);

			var _this4 = _possibleConstructorReturn(this, (BadEventCallException.__proto__ || Object.getPrototypeOf(BadEventCallException)).call(this, message));

			console.error('BadEventCallException: ' + message);
			return _this4;
		}

		return BadEventCallException;
	}(Error);

	/**
  * @file 
  * Event class.
  *
  * Handles subscripions and publishing of events.
  */

	/**
  * Stores the events callbacks.
  * 
  * @var array
  */


	var events = {};

	var EventManager = function () {
		function EventManager() {
			_classCallCheck(this, EventManager);
		}

		_createClass(EventManager, null, [{
			key: 'subscribe',

			/**
    * Subscribing to an event.
    *
    * @param string | name
    * @param function | callback
    * @return void
    */
			value: function subscribe(name, callback) {
				if (typeof callback !== 'function') {
					throw new InvalidArgumentException();
				}

				if (typeof events[name] == 'undefined') {
					events[name] = [];
				}

				events[name].push(callback);
			}

			/**
    * Publish an event to all subscribers.
    *
    * @param string | name
    * @param list | data
    * @return void
    */

		}, {
			key: 'publish',
			value: function publish(name) {
				for (var _len = arguments.length, data = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
					data[_key - 1] = arguments[_key];
				}

				data = data || null;

				// If there are no subscribers simply ignore that event.
				if (typeof events[name] == 'undefined') {
					return;
				}

				events[name].forEach(function (callback) {
					if (typeof callback != 'function') {
						throw new InvalidArgumentException('listen() should recieve callback as second parameter, but ' + (typeof callback === 'undefined' ? 'undefined' : _typeof(callback)) + ' was passed');
					}

					return callback.apply(undefined, _toConsumableArray(data));
				});
			}
		}]);

		return EventManager;
	}();

	var ComponentsException = function (_Error5) {
		_inherits(ComponentsException, _Error5);

		function ComponentsException() {
			_classCallCheck(this, ComponentsException);

			var _this5 = _possibleConstructorReturn(this, (ComponentsException.__proto__ || Object.getPrototypeOf(ComponentsException)).call(this));

			console.error('ComponentsException, expecting for at least one components, but none was given, \n\t\t\t\t\t\t\t\tplease add at least one requirement(Products, Services or/and Filter.');
			return _this5;
		}

		return ComponentsException;
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
					} else if (error instanceof BadEventCallException) {
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


	var defaultSettings$2 = {
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
	var Container$2 = void 0;

	/**
  * Stores the request object.
  */
	var Http = void 0;

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

			Container$2 = container;
			Http = http;

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

				this.settings = Common.extend(defaultSettings$2, settings);

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

				EventManager.subscribe('ProductWasAdded', function (attributes) {
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

	/**
  * The default settings of the filter.
  */
	var defaultSettings$3 = {
		element: '.filter',
		data: {},
		class: '',
		width: '',
		height: ''
	};

	/**
  * Stores the container object.
  */
	var Container$3 = void 0;

	/**
  * The Filter Object, handles the filter of the products/services.
  */

	var Filter = function () {
		function Filter(container) {
			_classCallCheck(this, Filter);

			Container$3 = container;
		}

		_createClass(Filter, [{
			key: 'setup',
			value: function setup(settings) {
				if ((typeof settings === 'undefined' ? 'undefined' : _typeof(settings)) != 'object') {
					throw new InvalidArgumentException$1();
				}

				this.settings = Common.extend(defaultSettings$3, settings);

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
  * The default settings of each product.
  */


	var defaultSettings$4 = {
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
  * 
  * @var \Core\Container
  */
	var Container$4 = void 0;

	/**
  * Stores the request object.
  * 
  * @var \Helper\Request 
  */
	var Http$1 = void 0;

	/**
  * The Products Object, handles the products.
  */

	var Products = function () {
		/**
   * Initalize the Container.
   *
   * @param \Core\Container | container
   * @param \Helpers\Request | http
   * @return void
   */
		function Products(container, http) {
			_classCallCheck(this, Products);

			Container$4 = container;
			Http$1 = http;
		}

		/**
   * Sets the given settings from the user.
   *
   * @param object | settings
   * @return void
   */


		_createClass(Products, [{
			key: 'setup',
			value: function setup(settings) {
				document.addEventListener('DOMContentLoaded', function () {

					if ((typeof settings === 'undefined' ? 'undefined' : _typeof(settings)) != 'object') {
						throw new InvalidArgumentException$1();
					}

					this.settings = Common.extend(defaultSettings$4, settings);

					this.setElement(this.settings.element);

					this.addStyleTag();

					if (Container$4.Pagination && Container$4.Pagination.booted) {
						this.loadPageProducts();
					} else {
						this.loadAllProducts();
					}
				}.bind(this));
			}
		}, {
			key: 'loadPageProducts',
			value: function loadPageProducts() {
				var request = this.getProducts(1);

				request.then(function (products) {
					this.currentItems = products;

					for (var i = 0; i < this.currentItems.length; i++) {
						var product = this.currentItems[i];
						EventManager.publish('AfterLoaded', product);
					}

					EventManager.publish('ProductsWereFetched', products);
					this.replaceItems(products);
				}.bind(this)).catch(function (error) {});
			}

			/**
    * Loads the products and 
    * replace them in the div container.
    *
    * @return void
    */

		}, {
			key: 'loadAllProducts',
			value: function loadAllProducts() {
				var request = this.getProducts();

				request.then(function (products) {
					this.currentItems = products;

					for (var i = 0; i < this.currentItems.length; i++) {
						var product = this.currentItems[i];
						EventManager.publish('AfterLoaded', product);
					}

					EventManager.publish('ProductsWereFetched', products);
					this.replaceItems(products);
				}.bind(this)).catch(function (error) {});
			}

			/**
    * Sets the DOM element 
    * for populating the products.
    *
    * @param string | selector
    * @return void
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
    * Replace items in 
    * the products container.
    *
    * @param array | items
    * @return array
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
    * Makes an Ajax call to the 
    * server without parameters.
    *
    * @param integer | pageNumber
    * @return Promise
    */

		}, {
			key: 'getProducts',
			value: function getProducts() {
				var pageNumber = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;

				var action = pageNumber ? this.settings.url + '?page=' + pageNumber : this.settings.url;

				return Http$1.get({
					url: action
				});
			}

			/**
    * Builds the html for the products.
    * 
    * @param array | attributesCollection
    * @param string | className
    * @param string | tagType
    * @return array
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
    *
    * @param object | attributes
    * @param string | className
    * @param string | tagType
    * @return object
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

				addToCart.addEventListener('click', function (e) {
					e.preventDefault();
					EventManager.publish('ProductWasAdded', attributes);
				});

				overlay.appendChild(tag);

				return product;
			}

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


	var defaultSettings$5 = {
		element: '.pagination-links',
		class: '',
		per_page: 5,
		total_items: 10
	};

	/**
  * Stores the container object.
  */
	var Container$5 = void 0;

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
			Container$5 = container;
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

					this.settings = Common.extend(defaultSettings$5, settings);

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

				this.next.childNodes[0].onclick = function (e) {
					e.preventDefault();

					var requestedPage = instance.current + 1;

					if (instance.notInPageRange(requestedPage)) {
						throw new NotInPageRangeException();
					}

					Products$2.getProducts(requestedPage).then(function (products) {
						Products$2.replaceItems(products);
					});

					instance.setCurrent(requestedPage);
				};

				this.previous.childNodes[0].onclick = function (e) {
					e.preventDefault();

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
					this.pages[i].childNodes[0].onclick = function (e) {
						e.preventDefault();

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

	var initalized = false;

	var defaultSettings = {
		element: 'body',
		importBootstrap: false,
		components: ['Products', 'Services', 'Filter', 'Pagination', 'Cart']
	};

	var TurboeCommerce = function TurboeCommerce(settings) {
		_classCallCheck(this, TurboeCommerce);

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
				if (object == 'Events') {
					return EventManager;
				}

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

	return TurboeCommerce;
}();
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlR1cmJvZUNvbW1lcmNlLmpzIl0sIm5hbWVzIjpbIlR1cmJvZUNvbW1lcmNlIiwiSW52YWxpZEFyZ3VtZW50RXhjZXB0aW9uJDEiLCJjb25zb2xlIiwiZXJyb3IiLCJFcnJvciIsIkRPTSIsInN0cmluZyIsInJlcGxhY2UiLCJlbGVtZW50IiwiY2xhc3NOYW1lIiwibmV3Q2xhc3NOYW1lIiwicmVtb3ZlQ2xhc3MiLCJhZGRDbGFzcyIsInVuZGVmaW5lZCIsImNsYXNzTmFtZXMiLCJzcGxpdCIsImZvckVhY2giLCJuYW1lIiwiY2xhc3NMaXN0IiwiYWRkIiwicmVtb3ZlIiwiaWQiLCJjc3MiLCJoZWFkIiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50c0J5VGFnTmFtZSIsInN0eWxlVGFnIiwiY3JlYXRlRWxlbWVudCIsIkNTUyIsIm1pbmlmeUNzcyIsImlubmVySFRNTCIsInNldEF0dHJpYnV0ZSIsImFwcGVuZENoaWxkIiwiZWxlbWVudFR5cGUiLCJvcHRpb25zIiwib3B0aW9uIiwic2Vjb25kQ2xhc3NOYW1lIiwidG9nZ2xlIiwic2VsZWN0b3IiLCJjb250ZXh0Iiwid2luZG93IiwicXVlcnlFbGVtZW50IiwicGFyZW50RWxlbWVudCIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJsZW5ndGgiLCJoYXNDaGlsZCIsImNoaWxkRWxlbWVudCIsIm5vZGUiLCJwYXJlbnROb2RlIiwiQ29tbW9uIiwiY3VycmVudE9iamVjdCIsIm5ld09iamVjdCIsImV4dGVuZGVkIiwicHJvcCIsIk9iamVjdCIsInByb3RvdHlwZSIsImhhc093blByb3BlcnR5IiwiY2FsbCIsIm5lZWRsZSIsImh5c3RhY2siLCJjb25zdHJ1Y3RvciIsIkFycmF5IiwiaSIsIm9iamVjdCIsIkludmFsaWREYXRhU3RydWN0dXJlRXhjZXB0aW9uIiwiZGVmYXVsdFNldHRpbmdzJDEiLCJoZWFkZXJzIiwiYXN5bmMiLCJSZXF1ZXN0Iiwic2V0dGluZ3MiLCJ4aHIiLCJYTUxIdHRwUmVxdWVzdCIsIkFjdGl2ZVhPYmplY3QiLCJleHRlbmQiLCJzZXREZWZhdWx0UmVxdWVzdEhlYWRlciIsImhlYWRlciIsIm9wZW4iLCJzZXRSZXF1ZXN0SGVhZGVyIiwicmVzcG9uc2UiLCJhcHBseSIsImFyZ3VtZW50cyIsImRhdGEiLCJ1cmwiLCJiZWZvcmUiLCJvbnJlYWR5c3RhdGVjaGFuZ2UiLCJyZWFkeVN0YXRlIiwic3RhdHVzIiwic3VjY2VzcyIsIkpTT04iLCJwYXJzZSIsImFmdGVyIiwib25lcnJvciIsIm1lc3NhZ2UiLCJhIiwiYiIsInNlbmQiLCJxdWVyeVN0cmluZyIsImtleXMiLCJtYXAiLCJrZXkiLCJlbmNvZGVVUklDb21wb25lbnQiLCJqb2luIiwiUHJvbWlzZSIsInJlc29sdmUiLCJyZWplY3QiLCJyZXNwb25zZVR5cGUiLCJkYXRhVHlwZSIsInRpbWVvdXQiLCJJbnZhbGlkQmluZGluZ0V4Y2VwdGlvbiIsImluc3RhbmNlcyIsIkNvbnRhaW5lciIsImNvbmNyZXRlIiwiYmluZCIsImluc3RhbmNlIiwiaW5zdGFuY2VFeGlzdCIsImdldEluc3RhbmNlIiwic2V0SW5zdGFuY2UiLCJCYWRFdmVudENhbGxFeGNlcHRpb24iLCJldmVudHMiLCJFdmVudE1hbmFnZXIiLCJjYWxsYmFjayIsIkludmFsaWRBcmd1bWVudEV4Y2VwdGlvbiIsInB1c2giLCJDb21wb25lbnRzRXhjZXB0aW9uIiwiTm90SW5QYWdlUmFuZ2VFeGNlcHRpb24iLCJDb21wb25lbnROb3RSZWdpc3RlcmVkRXhjZXB0aW9uIiwiRXhjZXB0aW9uSGFuZGxlciIsInNvdXJjZSIsImxpbmVubyIsImNvbG5vIiwiU3RyIiwidG9Mb3dlckNhc2UiLCJwb3NzaWJsZSIsImNoYXJBdCIsIk1hdGgiLCJmbG9vciIsInJhbmRvbSIsIkNvb2tpZSIsInZhbHVlIiwiZGF5cyIsInN0cmluZ2lmeSIsImV4cGlyZXMiLCJkYXRlIiwiRGF0ZSIsInNldFRpbWUiLCJnZXRUaW1lIiwidG9HTVRTdHJpbmciLCJjb29raWUiLCJjX3N0YXJ0IiwiaW5kZXhPZiIsImNfZW5kIiwidW5lc2NhcGUiLCJzdWJzdHJpbmciLCJkZWZhdWx0U2V0dGluZ3MkMiIsImNvb2tpZV9uYW1lIiwicHJldmlld19jbGFzcyIsImxvYWRlciIsImNsYXNzIiwid2lkdGgiLCJoZWlnaHQiLCJwbGFjZW1lbnQiLCJmaXhlZCIsImhvdmVyX2NvbG9yIiwiQ29udGFpbmVyJDIiLCJIdHRwIiwibG9hZGluZ092ZXJsYXkiLCJpdGVtc0RpdiIsIkNhcnQiLCJjb250YWluZXIiLCJodHRwIiwicHJldmlld0VsZW1lbnQiLCJjcmVhdGVQcmV2aWV3RWxlbWVudCIsInN2Z0ljb24iLCJjcmVhdGVJY29uIiwic2V0RWxlbWVudCIsImJpbmRFdmVudExpc3RlbmVycyIsImFkZFN0eWxlVGFnIiwiaXNFbXB0eSIsImdldCIsImNhcnQiLCJzZXRDYXJ0IiwiZW1wdHlPYmplY3QiLCJpdGVtcyIsImZhdm9yaXRlcyIsInNldCIsIml0ZW0iLCJzcGxpY2UiLCJsaSIsImF0dHJpYnV0ZXMiLCJhdHRyaWJ1dGUiLCJzcGFuIiwidGV4dCIsImljb24iLCJmaW5kIiwicG9zaXRpb24iLCJhZGRTdHlsZSIsInNyYyIsInJlbW92ZUNoaWxkIiwicHJldmlld1N0YXJ0TG9hZGluZyIsImdldENhcnRJdGVtcyIsImFkZFRvUHJldmlldyIsInNldFRpbWVvdXQiLCJwcmV2aWV3U3RvcExvYWRpbmciLCJvbmNsaWNrIiwiZSIsInByZXZlbnREZWZhdWx0Iiwib3BlbmluZyIsInRvZ2dsZUNsYXNzIiwicmVsb2FkQ2FydFByZXZpZXciLCJzdWJzY3JpYmUiLCJjbG9zZSIsImV2ZW50Iiwic3dpdGNoQ2xhc3NlcyIsInN2ZyIsImNyZWF0ZUVsZW1lbnROUyIsImciLCJwYXRoIiwiZGVmYXVsdFNldHRpbmdzJDMiLCJDb250YWluZXIkMyIsIkZpbHRlciIsIndyYXBwZXIiLCJkZWZhdWx0U2V0dGluZ3MkNCIsIml0ZW1fY2xhc3MiLCJhZGRfYnV0dG9uX2NsYXNzIiwiZmF2b3JpdGVfYnV0dG9uX2NsYXNzIiwiQ29udGFpbmVyJDQiLCJIdHRwJDEiLCJQcm9kdWN0cyIsImFkZEV2ZW50TGlzdGVuZXIiLCJQYWdpbmF0aW9uIiwiYm9vdGVkIiwibG9hZFBhZ2VQcm9kdWN0cyIsImxvYWRBbGxQcm9kdWN0cyIsInJlcXVlc3QiLCJnZXRQcm9kdWN0cyIsInRoZW4iLCJwcm9kdWN0cyIsImN1cnJlbnRJdGVtcyIsInByb2R1Y3QiLCJwdWJsaXNoIiwicmVwbGFjZUl0ZW1zIiwiY2F0Y2giLCJpc0FycmF5IiwiYnVpbGRQcm9kdWN0cyIsInBhZ2VOdW1iZXIiLCJhY3Rpb24iLCJhdHRyaWJ1dGVzQ29sbGVjdGlvbiIsInRhZ1R5cGUiLCJidWlsdFByb2R1Y3RzIiwiYnVpbHRQcm9kdWN0IiwiYnVpbGRQcm9kdWN0Iiwib3ZlcmxheSIsImluX2FycmF5IiwidGFnIiwiaW1hZ2UiLCJrZWJhYkNhc2UiLCJhZGRUb0NhcnQiLCJ0eXBlIiwiZmF2b3JpdGUiLCJTZXJ2aWNlcyIsImRlZmF1bHRTZXR0aW5ncyQ1IiwicGVyX3BhZ2UiLCJ0b3RhbF9pdGVtcyIsIkNvbnRhaW5lciQ1IiwiUHJvZHVjdHMkMiIsInNldEN1cnJlbnQiLCJ0b3RhbFBhZ2VzIiwiY2FsY3VsYXRlVG90YWxQYWdlcyIsInJlcGxhY2VMaW5rcyIsImxpbmtzIiwiY3JlYXRlTGlua3MiLCJwZXJQYWdlIiwidG90YWxJdGVtcyIsInBhcnNlSW50IiwiY2VpbCIsIm5leHQiLCJjaGlsZE5vZGVzIiwicmVxdWVzdGVkUGFnZSIsImN1cnJlbnQiLCJub3RJblBhZ2VSYW5nZSIsInByZXZpb3VzIiwicGFnZXMiLCJnZXRBdHRyaWJ1dGUiLCJjaGFuZ2VVcmwiLCJzZXRBY3RpdmVMaW5rIiwidWwiLCJjcmVhdGVQYWdlTGlua3MiLCJjcmVhdGVQcmV2aW91c0J1dHRvbiIsImNyZWF0ZU5leHRCdXR0b24iLCJwYWdlIiwicGFnZUl0ZW0iLCJsaW5rIiwic3BhbjEiLCJzcGFuMiIsImlzTmFOIiwiR0VUX1ZhcnMiLCJoaXN0b3J5IiwicmVwbGFjZVN0YXRlIiwidXBkYXRlVVJMUGFyYW1ldGVyIiwibG9jYXRpb24iLCJocmVmIiwidmFycyIsInBhcnRzIiwibSIsInBhcmFtIiwicGFyYW1WYWwiLCJuZXdBZGRpdGlvbmFsVVJMIiwidGVtcEFycmF5IiwiYmFzZVVSTCIsImFkZGl0aW9uYWxVUkwiLCJ0ZW1wIiwicm93c1RleHQiLCJpbml0YWxpemVkIiwiZGVmYXVsdFNldHRpbmdzIiwiaW1wb3J0Qm9vdHN0cmFwIiwiY29tcG9uZW50cyIsImluaXRhbGl6ZSIsImJpbmRDb21wb25lbnRzRGVwZW5kZW5jaWVzIiwiUHJveHkiLCJ0YXJnZXQiLCJtYWtlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUFBLElBQUlBLGlCQUFrQixZQUFZO0FBQ2xDOztBQURrQyxLQUc1QkMsMEJBSDRCO0FBQUE7O0FBS2pDLHdDQUNBO0FBQUE7O0FBQUE7O0FBRUlDLFdBQVFDLEtBQVI7QUFGSjtBQUdJOztBQVQ2QjtBQUFBLEdBR09DLEtBSFA7O0FBWWxDOzs7Ozs7OztBQVprQyxLQW9CNUJDLEdBcEI0QjtBQUFBO0FBQUE7QUFBQTs7QUFBQTtBQUFBOztBQXNCakM7Ozs7OztBQXRCaUMsNkJBNEJoQkMsTUE1QmdCLEVBNkJqQztBQUNJQSxhQUFTQSxPQUFPQyxPQUFQLENBQWUsd0NBQWYsRUFBeUQsRUFBekQsQ0FBVDtBQUNBRCxhQUFTQSxPQUFPQyxPQUFQLENBQWUsUUFBZixFQUF5QixHQUF6QixDQUFUO0FBQ0FELGFBQVNBLE9BQU9DLE9BQVAsQ0FBZSxVQUFmLEVBQTJCLElBQTNCLENBQVQ7QUFDQUQsYUFBU0EsT0FBT0MsT0FBUCxDQUFlLFVBQWYsRUFBMkIsSUFBM0IsQ0FBVDtBQUNBRCxhQUFTQSxPQUFPQyxPQUFQLENBQWUsS0FBZixFQUFzQixHQUF0QixDQUFUOztBQUVBLFdBQU9ELE1BQVA7QUFDSDs7QUFFRDs7Ozs7Ozs7O0FBdkNpQztBQUFBO0FBQUEsaUNBK0NaRSxPQS9DWSxFQStDSEMsU0EvQ0csRUErQ1FDLFlBL0NSLEVBZ0RqQztBQUNDLFNBQUtDLFdBQUwsQ0FB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Q0FBb0IsVUFBcEIsRUFBZ0MsVUFBU3dELFNBQVQsRUFBb0I7QUFDbkRBLGFBQVUsVUFBVixFQUFzQjhELE1BQXRCLEdBQStCLElBQS9CO0FBQ0EsVUFBTyxJQUFJSCxRQUFKLENBQWEzRCxTQUFiLEVBQXdCaUUsT0FBeEIsQ0FBUDtBQUNBLEdBSEQ7O0FBS0EsT0FBS2pFLFNBQUwsQ0FBZXhELElBQWYsQ0FBb0IsWUFBcEIsRUFBa0MsVUFBU3dELFNBQVQsRUFBb0I7QUFDckRBLGFBQVUsWUFBVixFQUF3QjhELE1BQXhCLEdBQWlDLElBQWpDO0FBQ0EsVUFBTyxJQUFJRCxVQUFKLENBQWU3RCxTQUFmLEVBQTBCQSxVQUFVd0osSUFBVixDQUFlLFVBQWYsQ0FBMUIsQ0FBUDtBQUNBLEdBSEQ7O0FBS0EsT0FBS3hKLFNBQUwsQ0FBZXhELElBQWYsQ0FBb0IsTUFBcEIsRUFBNEIsVUFBU3dELFNBQVQsRUFBb0I7QUFDL0NBLGFBQVUsTUFBVixFQUFrQjhELE1BQWxCLEdBQTJCLElBQTNCO0FBQ0EsVUFBTyxJQUFJL0QsSUFBSixDQUFTQyxTQUFULEVBQW9CaUUsT0FBcEIsQ0FBUDtBQUNBLEdBSEQ7O0FBS0EsT0FBS2pFLFNBQUwsQ0FBZSxRQUFmLEVBQXlCLFFBQXpCLElBQXFDLEtBQXJDO0FBQ0EsT0FBS0EsU0FBTCxDQUFlLFVBQWYsRUFBMkIsUUFBM0IsSUFBdUMsS0FBdkM7QUFDQSxPQUFLQSxTQUFMLENBQWUsVUFBZixFQUEyQixRQUEzQixJQUF1QyxLQUF2QztBQUNBLE9BQUtBLFNBQUwsQ0FBZSxZQUFmLEVBQTZCLFFBQTdCLElBQXlDLEtBQXpDO0FBQ0EsT0FBS0EsU0FBTCxDQUFlLE1BQWYsRUFBdUIsUUFBdkIsSUFBbUMsS0FBbkM7QUFDQTs7QUFFRCxRQUFPeEssY0FBUDtBQUVDLENBbmtFcUIsRUFBdEIiLCJmaWxlIjoiVHVyYm9lQ29tbWVyY2UuanMiLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgVHVyYm9lQ29tbWVyY2UgPSAoZnVuY3Rpb24gKCkge1xuJ3VzZSBzdHJpY3QnO1xuXG5jbGFzcyBJbnZhbGlkQXJndW1lbnRFeGNlcHRpb24kMSBleHRlbmRzIEVycm9yXHJcbntcclxuXHRjb25zdHJ1Y3RvcigpIFxyXG5cdHsgXHJcbiAgICBcdHN1cGVyKCk7XHJcbiAgICBcdGNvbnNvbGUuZXJyb3IoYEludmFsaWRBcmd1bWVudEV4Y2VwdGlvbiwgYW4gaW52YWxpZCBhcmd1bWVudCB3YXMgcGFzc2VkLmApO1xyXG4gICAgfVxyXG59XG5cbi8qKlxyXG4gKiBAZmlsZSBcclxuICogRE9NIGNsYXNzLlxyXG4gKlxyXG4gKiBBZGRzIHNvbWUgdXNlZnVsIGZ1bmN0aW9uYWxpdHkgZm9yXHJcbiAqIGZldGNoaW5nIG9yIG1hbmlwdWxhdGluZyBET00gZWxlbWVudHMuXHJcbiAqL1xyXG5cclxuY2xhc3MgRE9NXHJcbntcclxuXHQvKipcclxuXHQgKiBNaW5pZmllcyB0aGUgY3NzIHRleHQuXHJcblx0ICogXHJcblx0ICogQHBhcmFtIHN0cmluZyB8IHN0cmluZ1xyXG5cdCAqIEByZXR1cm4gc3RyaW5nXHJcblx0ICovXHJcblx0c3RhdGljIG1pbmlmeUNzcyhzdHJpbmcpIFxyXG5cdHtcclxuXHQgICAgc3RyaW5nID0gc3RyaW5nLnJlcGxhY2UoL1xcL1xcKig/Oig/IVxcKlxcLylbXFxzXFxTXSkqXFwqXFwvfFtcXHJcXG5cXHRdKy9nLCAnJyk7XHJcblx0ICAgIHN0cmluZyA9IHN0cmluZy5yZXBsYWNlKC8gezIsfS9nLCAnICcpO1xyXG5cdCAgICBzdHJpbmcgPSBzdHJpbmcucmVwbGFjZSgvKFt7On1dKS9nLCAnJDEnKTtcclxuXHQgICAgc3RyaW5nID0gc3RyaW5nLnJlcGxhY2UoLyhbOyxdKSAvZywgJyQxJyk7XHJcblx0ICAgIHN0cmluZyA9IHN0cmluZy5yZXBsYWNlKC8gIS9nLCAnIScpO1xyXG5cdCAgICBcclxuXHQgICAgcmV0dXJuIHN0cmluZztcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFN3aXRjaGVzIGJldHdlZW4gdHdvIGdpdmVuIGNsYXNzZXMuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gb2JqZWN0IHwgZWxlbWVudFxyXG5cdCAqIEBwYXJhbSBzdHJpbmcgfCBjbGFzc05hbWVcclxuXHQgKiBAcGFyYW0gc3RyaW5nIHwgbmV3Q2xhc3NOYW1lXHJcblx0ICogQHJldHVybiBvYmplY3RcclxuXHQgKi9cclxuXHRzdGF0aWMgc3dpdGNoQ2xhc3NlcyhlbGVtZW50LCBjbGFzc05hbWUsIG5ld0NsYXNzTmFtZSkgXHJcblx0e1xyXG5cdFx0dGhpcy5yZW1vdmVDbGFzcyhlbGVtZW50LCBjbGFzc05hbWUpO1xyXG5cdFx0dGhpcy5hZGRDbGFzcyhlbGVtZW50LCBuZXdDbGFzc05hbWUpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQWRkcyBjbGFzcyB0byBhIGdpdmVuIGVsZW1lbnQuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gb2JqZWN0IHwgZWxlbWVudFxyXG5cdCAqIEBwYXJhbSBzdHJpbmcgfCBjbGFzc05hbWVcclxuXHQgKiBAcmV0dXJuIG9iamVjdFxyXG5cdCAqL1xyXG5cdHN0YXRpYyBhZGRDbGFzcyhlbGVtZW50LCBjbGFzc05hbWUpIFxyXG5cdHtcclxuXHRcdGlmKGVsZW1lbnQgPT09IG51bGwpIHtcclxuXHRcdFx0dGhyb3cgbmV3IEludmFsaWRBcmd1bWVudEV4Y2VwdGlvbiQxO1xyXG5cdFx0fVxyXG5cclxuXHRcdGlmKCEgY2xhc3NOYW1lIHx8IGNsYXNzTmFtZSA9PSAnJyB8fCB0eXBlb2YgY2xhc3NOYW1lID09PSB1bmRlZmluZWQpIHtcclxuXHRcdFx0cmV0dXJuIGVsZW1lbnQ7XHJcblx0XHR9XHJcblxyXG5cdFx0bGV0IGNsYXNzTmFtZXMgPSBjbGFzc05hbWUuc3BsaXQoJyAnKTtcclxuXHJcblx0XHRjbGFzc05hbWVzLmZvckVhY2goZnVuY3Rpb24obmFtZSkge1xyXG5cdFx0XHRlbGVtZW50LmNsYXNzTGlzdC5hZGQobmFtZSk7XHJcblx0XHR9KTtcclxuXHRcdFxyXG5cdFx0cmV0dXJuIGVsZW1lbnQ7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBSZW1vdmVzIGNsYXNzIGZyb20gYSBnaXZlbiBlbGVtZW50LlxyXG5cdCAqIFxyXG5cdCAqIEBwYXJhbSBvYmplY3QgfCBlbGVtZW50XHJcblx0ICogQHBhcmFtIHN0cmluZyB8IGNsYXNzTmFtZVxyXG5cdCAqIEByZXR1cm4gb2JqZWN0XHJcblx0ICovXHJcblx0c3RhdGljIHJlbW92ZUNsYXNzKGVsZW1lbnQsIGNsYXNzTmFtZSkgXHJcblx0e1xyXG5cdFx0aWYoZWxlbWVudCA9PSBudWxsKSB7XHJcblx0XHRcdHRocm93IG5ldyBJbnZhbGlkQXJndW1lbnRFeGNlcHRpb24kMTtcclxuXHRcdH1cclxuXHJcblx0XHRpZihjbGFzc05hbWUgPT0gJycpIHtcclxuXHRcdFx0ZWxlbWVudC5jbGFzc05hbWUgPSAnJztcclxuXHRcdH0gZWxzZSB7XHJcblxyXG5cdFx0XHRsZXQgY2xhc3NOYW1lcyA9IGNsYXNzTmFtZS5zcGxpdCgnICcpO1xyXG5cclxuXHRcdFx0Y2xhc3NOYW1lcy5mb3JFYWNoKGZ1bmN0aW9uKG5hbWUpIHtcclxuXHRcdFx0XHRlbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUobmFtZSk7XHJcblx0XHRcdH0pO1xyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiBlbGVtZW50O1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQWRkcyBzdHlsZSB0YWcgd2l0aCBnaXZlbiBpZCBhbmQgY3NzIHRvIHRoZSBET00uXHJcblx0ICogXHJcblx0ICogQHBhcmFtIHN0cmluZyB8IGlkXHJcblx0ICogQHBhcmFtIHN0cmluZyB8IGNzc1xyXG5cdCAqIEByZXR1cm4gdm9pZFxyXG5cdCAqL1xyXG5cdHN0YXRpYyBhZGRTdHlsZShpZCwgY3NzKSBcclxuXHR7XHJcblx0XHRpZiAodHlwZW9mIGNzcyAhPSAnc3RyaW5nJykge1xyXG5cdFx0XHR0aHJvdyBuZXcgSW52YWxpZEFyZ3VtZW50RXhjZXB0aW9uJDE7XHJcblx0XHR9XHJcblxyXG5cdFx0bGV0IGhlYWQgPSBkb2N1bWVudC5oZWFkIHx8IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdoZWFkJylbMF07XHJcblx0XHRsZXQgc3R5bGVUYWcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzdHlsZScpO1xyXG5cclxuXHRcdC8vIHBpcGUgaXQgdGhyb3VnaCB0aGUgbWluZmllclxyXG5cdCAgICBsZXQgQ1NTID0gdGhpcy5taW5pZnlDc3MoY3NzKTtcclxuXHQgICAgLy8gYWRkaW5nIGl0IHRvIHRoZSBzdHlsZXRhZ1xyXG5cdCAgICBzdHlsZVRhZy5pbm5lckhUTUwgPSBDU1M7XHJcblx0ICAgIC8vIGdpdmUgYW4gaWQgdG8gcmVjb2duaXplIHRoZSBzdHlsZSB0YWdcclxuXHRcdHN0eWxlVGFnLnNldEF0dHJpYnV0ZSgnaWQnLCBpZCk7XHJcblx0XHQvLyBhcHBlbmRpbmcgdGhhdCBzdHlsZSB0YWcgdG8gdGhlIERPTSBoZWFkIHRhZ1xyXG5cdFx0aGVhZC5hcHBlbmRDaGlsZChzdHlsZVRhZyk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBDcmVhdGVzIGFuIGVsZW1lbnQgd2l0aCB0aGUgZ2l2ZW4gb3B0aW9ucy5cclxuXHQgKiBcclxuXHQgKiBAcGFyYW0gc3RyaW5nIHwgZWxlbWVudFR5cGVcclxuXHQgKiBAcGFyYW0gb2JqZWN0IHwgb3B0aW9uc1xyXG5cdCAqIEByZXR1cm4gSFRNTEVsZW1lbnRcclxuXHQgKi9cclxuXHRzdGF0aWMgY3JlYXRlRWxlbWVudChlbGVtZW50VHlwZSwgb3B0aW9ucylcclxuXHR7XHJcblx0XHRsZXQgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoZWxlbWVudFR5cGUpO1xyXG5cdFxyXG5cdFx0aWYgKG9wdGlvbnMgPT09IHVuZGVmaW5lZCkge1xyXG5cdFx0XHRyZXR1cm4gZWxlbWVudDtcclxuXHRcdH1cclxuXHJcblx0XHRmb3IgKGxldCBvcHRpb24gaW4gb3B0aW9ucykge1xyXG5cdFx0XHRpZihvcHRpb24gPT0gJ3RleHQnKSB7XHJcblx0XHRcdFx0ZWxlbWVudC5pbm5lckhUTUwgPSBvcHRpb25zW29wdGlvbl07XHJcblx0XHRcdFx0Y29udGludWU7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGVsZW1lbnQuc2V0QXR0cmlidXRlKG9wdGlvbiwgb3B0aW9uc1tvcHRpb25dKTtcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gZWxlbWVudDtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFRvZ2dsZXMgdGhlIGdpdmVuIGNsYXNzZXMuXHJcblx0ICogXHJcblx0ICogQHBhcmFtIG9iamVjdCB8IGVsZW1lbnRcclxuXHQgKiBAcGFyYW0gc3RyaW5nIHwgY2xhc3NOYW1lXHJcblx0ICogQHJldHVybiBib29sXHJcblx0ICovXHJcblx0c3RhdGljIHRvZ2dsZUNsYXNzKGVsZW1lbnQsIGNsYXNzTmFtZSwgc2Vjb25kQ2xhc3NOYW1lKVxyXG5cdHtcclxuXHRcdGlmIChlbGVtZW50ID09IG51bGwgfHwgdHlwZW9mIGVsZW1lbnQgPT0gJ3VuZGVmaW5lZCcpIHtcclxuXHRcdFx0dGhyb3cgbmV3IEludmFsaWRBcmd1bWVudEV4Y2VwdGlvbiQxO1xyXG5cdFx0fVxyXG5cclxuXHRcdHNlY29uZENsYXNzTmFtZSA9IHNlY29uZENsYXNzTmFtZSB8fCB1bmRlZmluZWQ7XHJcblxyXG5cdFx0aWYoc2Vjb25kQ2xhc3NOYW1lKSB7XHJcblx0XHRcdGVsZW1lbnQuY2xhc3NMaXN0LnRvZ2dsZShzZWNvbmRDbGFzc05hbWUpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiBlbGVtZW50LmNsYXNzTGlzdC50b2dnbGUoY2xhc3NOYW1lKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEZpbmRzIGFuIGVsZW1lbnQgaW5zaWRlIG9mIHBhcmVudC5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSBzdHJpbmcgfCBzZWxlY3RvclxyXG5cdCAqIEBwYXJhbSBvYmplY3QgfCBjb250ZXh0XHJcblx0ICogQHJldHVybiBtaXhlZFxyXG5cdCAqL1xyXG5cdHN0YXRpYyBmaW5kKHNlbGVjdG9yLCBjb250ZXh0ID0gd2luZG93LmRvY3VtZW50KSBcclxuXHR7XHJcblx0XHRyZXR1cm4gcXVlcnlFbGVtZW50KHNlbGVjdG9yLCBjb250ZXh0KTtcclxuXHR9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBRdWVyaWVzIGFuIGVsZW1lbnQgZnJvbSB0aGUgRE9NLlxyXG4gKlxyXG4gKiBAcGFyYW0gc3RyaW5nIHwgc2VsZWN0b3JcclxuICogQHBhcmFtIG9iamVjdCB8IHBhcmVudEVsZW1lbnRcclxuICogQHJldHVybiBtaXhlZFxyXG4gKi9cclxuZnVuY3Rpb24gcXVlcnlFbGVtZW50KHNlbGVjdG9yLCBwYXJlbnRFbGVtZW50KSBcclxue1xyXG5cdGxldCBlbGVtZW50ID0gcGFyZW50RWxlbWVudC5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9yKTtcclxuXHJcblx0aWYgKGVsZW1lbnQubGVuZ3RoID09IDApIHtcclxuXHRcdHJldHVybiBudWxsO1xyXG5cdH1cclxuXHJcblx0cmV0dXJuIChlbGVtZW50Lmxlbmd0aCA+IDEpID8gZWxlbWVudCA6IGVsZW1lbnRbMF07XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBDaGVja3MgaWYgcGFyZW50IGhhcyBjaGlsZC5cclxuICpcclxuICogQHBhcmFtIG9iamVjdCB8IHBhcmVudEVsZW1lbnRcclxuICogQHBhcmFtIG9iamVjdCB8IGNoaWxkRWxlbWVudFxyXG4gKiBAcmV0dXJuIGJvb2xcclxuICovXHJcbmZ1bmN0aW9uIGhhc0NoaWxkKHBhcmVudEVsZW1lbnQsIGNoaWxkRWxlbWVudCkgXHJcbntcclxuICAgICBsZXQgbm9kZSA9IGNoaWxkRWxlbWVudC5wYXJlbnROb2RlO1xyXG4gICAgIFxyXG4gICAgIHdoaWxlIChub2RlICE9IG51bGwpIHtcclxuICAgICAgICAgaWYgKG5vZGUgPT0gcGFyZW50RWxlbWVudCkge1xyXG4gICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgIH1cclxuICAgICAgICAgbm9kZSA9IG5vZGUucGFyZW50Tm9kZTtcclxuICAgICB9XHJcbiAgICAgXHJcbiAgICAgcmV0dXJuIGZhbHNlO1xyXG59XG5cbi8qKlxyXG4gKiBAZmlsZSBcclxuICogQ29tbW9uIGNsYXNzLlxyXG4gKlxyXG4gKiBBZGRzIHNvbWUgdXNlZnVsIGZ1bmN0aW9uYWxpdHkgZm9yXHJcbiAqIGNvbW1vbiB0YXNrcyAtIGRhdGEgY2hlY2tzIG9yIGRhdGEgbWFuaXB1bGF0aW9uLlxyXG4gKi9cclxuXHJcbmNsYXNzIENvbW1vblxyXG57XHJcblx0LyoqXHJcblx0ICogRXh0ZW5kIGFuIG9iamVjdC5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSBvYmplY3QgfCBjdXJyZW50T2JqZWN0XHJcblx0ICogQHBhcmFtIG9iamVjdCB8IG5ld09iamVjdFxyXG5cdCAqIEByZXR1cm4gb2JqZWN0XHJcblx0ICovXHJcblx0c3RhdGljIGV4dGVuZChjdXJyZW50T2JqZWN0LCBuZXdPYmplY3QpIHtcclxuXHRcdHZhciBleHRlbmRlZCA9IHt9O1xyXG5cdCAgICB2YXIgcHJvcDtcclxuXHJcblx0ICAgIGZvciAocHJvcCBpbiBjdXJyZW50T2JqZWN0KSB7XHJcblx0ICAgICAgICBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGN1cnJlbnRPYmplY3QsIHByb3ApKSB7XHJcblx0ICAgICAgICAgICAgZXh0ZW5kZWRbcHJvcF0gPSBjdXJyZW50T2JqZWN0W3Byb3BdO1xyXG5cdCAgICAgICAgfVxyXG5cdCAgICB9XHJcblxyXG5cdCAgICBmb3IgKHByb3AgaW4gbmV3T2JqZWN0KSB7XHJcblx0ICAgICAgICBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG5ld09iamVjdCwgcHJvcCkpIHtcclxuXHQgICAgICAgICAgICBleHRlbmRlZFtwcm9wXSA9IG5ld09iamVjdFtwcm9wXTtcclxuXHQgICAgICAgIH1cclxuXHQgICAgfVxyXG5cclxuXHQgICAgcmV0dXJuIGV4dGVuZGVkO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQ2hlY2tzIGZvciBhIG5lZWRsZSBpbiBoeXN0YWNrIGFycmF5LlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIG1peGVkIHwgbmVlZGxlXHJcblx0ICogQHBhcmFtIG9iamVjdCB8IG9iamVjdFxyXG5cdCAqIEByZXR1cm4gYm9vbFxyXG5cdCAqXHJcblx0ICovXHJcblx0c3RhdGljIGluX2FycmF5KG5lZWRsZSwgaHlzdGFjaykge1xyXG5cdFx0aWYoaHlzdGFjay5jb25zdHJ1Y3RvciAhPT0gQXJyYXkpIHtcclxuXHRcdFx0dGhyb3cgbmV3IEludmFsaWRBcmd1bWVudEV4Y2VwdGlvbiQxO1xyXG5cdFx0fVxyXG5cclxuXHRcdGZvcih2YXIgaSA9IDA7IGkgPD0gaHlzdGFjay5sZW5ndGg7IGkrKykge1xyXG5cdFx0XHRpZihuZWVkbGUgPT0gaHlzdGFja1tpXSkge1xyXG5cdFx0XHRcdHJldHVybiB0cnVlO1x0XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHRcclxuXHRcdHJldHVybiBmYWxzZTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIENoZWNrcyBpZiBhbiBvYmplY3QgaXMgZW1wdHkuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gb2JqZWN0IHwgb2JqZWN0XHJcblx0ICogQHJldHVybiBib29sXHJcblx0ICovXHJcblx0c3RhdGljIGVtcHR5T2JqZWN0KG9iamVjdCkge1xyXG5cdFx0Zm9yIChsZXQgcHJvcCBpbiBvYmplY3QpIHtcclxuXHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiB0cnVlO1xyXG5cdH1cclxuXHJcblxyXG5cdC8qKlxyXG5cdCAqIENoZWNrcyBpZiBhIGdpdmVuIG9iamVjdCBjb250YWluZWQgaW4gYW4gYXJyYXkuXHJcblx0ICogXHJcblx0ICogQHBhcmFtIG9iamVjdCB8IG9iamVjdFxyXG5cdCAqIEBwYXJhbSBhcnJheSB8IGhheXN0YWNrXHJcblx0ICogQHJldHVybiBib29sXHJcblx0ICovXHJcblx0c3RhdGljIGNvbnRhaW5zT2JqZWN0KG9iamVjdCwgaHlzdGFjaykgXHJcblx0e1xyXG5cdCAgICBsZXQgaTtcclxuXHJcblx0ICAgIGZvciAoaSA9IDA7IGkgPCBoeXN0YWNrLmxlbmd0aDsgaSsrKSB7XHJcblx0ICAgICAgICBpZiAodHlwZW9mIG9iamVjdCA9PSAnc3RyaW5nJyAmJiBoeXN0YWNrW2ldLmNvbnN0cnVjdG9yLm5hbWUgPT09IG9iamVjdCkge1xyXG5cdCAgICAgICAgXHRyZXR1cm4gdHJ1ZTtcclxuXHQgICAgICAgIH1cclxuXHJcblx0ICAgICAgICBpZiAoaHlzdGFja1tpXSA9PT0gb2JqZWN0KSB7XHJcblx0ICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcblx0ICAgICAgICB9XHJcblx0ICAgIH1cclxuXHJcblx0ICAgIHJldHVybiBmYWxzZTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIENoZWNrcyBpZiBhIGdpdmVuIHBhcmFtZXRlciBpcyBhbiBvYmplY3QuXHJcblx0ICogXHJcblx0ICogQHBhcmFtIG9iamVjdCB8IG9iamVjdFxyXG5cdCAqIEByZXR1cm4gYm9vbFxyXG5cdCAqL1xyXG5cdHN0YXRpYyBpc09iamVjdChvYmplY3QpIFxyXG5cdHtcclxuXHRcdHJldHVybiB0eXBlb2Ygb2JqZWN0ID09ICdvYmplY3QnO1xyXG5cdH1cclxufVxuXG5jbGFzcyBJbnZhbGlkRGF0YVN0cnVjdHVyZUV4Y2VwdGlvbiAgZXh0ZW5kcyBFcnJvclxyXG57XHJcblx0Y29uc3RydWN0b3IoKSBcclxuXHR7IFxyXG4gICAgXHRzdXBlcigpO1xyXG4gICAgfVxyXG59XG5cbmxldCBkZWZhdWx0U2V0dGluZ3MkMSA9IHtcclxuXHRoZWFkZXJzOiB7XHJcblx0XHQnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nXHJcblx0fSxcclxuXHRhc3luYzogdHJ1ZVxyXG59O1xyXG5cclxuXHJcbmNsYXNzIFJlcXVlc3Rcclxue1xyXG5cdGNvbnN0cnVjdG9yKHNldHRpbmdzKVxyXG5cdHtcclxuXHRcdHRoaXMueGhyID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCkgfHwgbmV3IEFjdGl2ZVhPYmplY3QoXCJNaWNyb3NvZnQuWE1MSFRUUFwiKTtcclxuXHRcdHRoaXMuc2V0dGluZ3MgPSBDb21tb24uZXh0ZW5kKGRlZmF1bHRTZXR0aW5ncyQxLCBzZXR0aW5ncyk7XHJcblx0XHR0aGlzLnNldERlZmF1bHRSZXF1ZXN0SGVhZGVyKCk7XHJcblx0fVxyXG5cclxuXHRzZXREZWZhdWx0UmVxdWVzdEhlYWRlcigpXHJcblx0e1xyXG5cdFx0bGV0IGhlYWRlcjtcclxuXHRcdGxldCBoZWFkZXJzID0gdGhpcy5zZXR0aW5ncy5oZWFkZXJzO1xyXG5cdFx0bGV0IGFzeW5jID0gdGhpcy5zZXR0aW5ncy5hc3luYztcclxuXHRcdGxldCBvcGVuID0gWE1MSHR0cFJlcXVlc3QucHJvdG90eXBlLm9wZW47XHJcblx0XHRsZXQgc2V0UmVxdWVzdEhlYWRlciA9IFhNTEh0dHBSZXF1ZXN0LnByb3RvdHlwZS5zZXRSZXF1ZXN0SGVhZGVyO1xyXG5cclxuXHRcdFhNTEh0dHBSZXF1ZXN0LnByb3RvdHlwZS5vcGVuID0gZnVuY3Rpb24oKSB7XHJcblx0XHRcdHZhciByZXNwb25zZSA9IG9wZW4uYXBwbHkodGhpcywgYXJndW1lbnRzLCBhc3luYyk7XHJcblxyXG5cdFx0XHRmb3IgKGhlYWRlciBpbiBoZWFkZXJzKSB7XHJcblx0XHRcdFx0dGhpcy5zZXRSZXF1ZXN0SGVhZGVyKGhlYWRlciwgaGVhZGVyc1toZWFkZXJdKTtcclxuXHRcdFx0fVxyXG5cclxuXHQgIFx0XHRyZXR1cm4gcmVzcG9uc2U7XHJcblx0XHR9O1xyXG5cdH1cclxuXHJcblx0cG9zdChvcHRpb25zKVxyXG5cdHtcclxuXHRcdGlmKHR5cGVvZiBvcHRpb25zICE9PSAnb2JqZWN0Jykge1xyXG5cdFx0XHR0aHJvdyBuZXcgRXJyb3IoJ3Bvc3QgZXhwZWN0aW5nIGEganNvbiBvYmplY3QgdG8gYmUgcGFzc2VkIGFzIGFuIGFyZ3VtZW50LCBidXQgJysgdHlwZW9mIG9wdGlvbnMgKyAnIHdhcyBwYXNzZWQuJyk7XHJcblx0XHR9XHJcblxyXG5cdFx0aWYodHlwZW9mIG9wdGlvbnMuZGF0YSAhPT0gJ29iamVjdCcpIHtcclxuXHRcdFx0dGhyb3cgbmV3IEVycm9yKCdkYXRhIHByb3BlcnR5IGV4cGVjdGluZyBhIGpzb24gb2JqZWN0IHRvIGJlIHBhc3NlZCBhcyBhbiBhcmd1bWVudCwgYnV0ICcgKyB0eXBlb2Ygb3B0aW9ucy5kYXRhICsgJyB3YXMgcGFzc2VkLicpO1xyXG5cdFx0fVxyXG5cclxuXHRcdG9wdGlvbnMuZGF0YSA9IG9wdGlvbnMuZGF0YSB8fCBudWxsO1xyXG5cclxuXHRcdHhoci5vcGVuKCdQT1NUJywgb3B0aW9ucy51cmwsIHRydWUpO1xyXG5cdFx0eGhyLnNldFJlcXVlc3RIZWFkZXIoXCJDb250ZW50LXR5cGVcIiwgb3B0aW9ucy5oZWFkZXJzIHx8IFwiYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkXCIpO1xyXG5cclxuXHRcdGlmKG9wdGlvbnMuaGFzT3duUHJvcGVydHkoJ2JlZm9yZScpICYmIHR5cGVvZiBvcHRpb25zLmJlZm9yZSA9PSAnZnVuY3Rpb24nKSB7XHJcblx0XHRcdG9wdGlvbnMuYmVmb3JlKCk7XHJcblx0XHR9XHJcblxyXG5cdFx0eGhyLm9ucmVhZHlzdGF0ZWNoYW5nZSA9IGZ1bmN0aW9uKCkge1xyXG5cdFx0ICAgIGlmKHRoaXMucmVhZHlTdGF0ZSA9PSA0ICYmIHRoaXMuc3RhdHVzID09IDIwMCkge1xyXG5cdFx0ICAgICAgIFx0aWYob3B0aW9ucy5oYXNPd25Qcm9wZXJ0eSgnc3VjY2VzcycpICYmIHR5cGVvZiBvcHRpb25zLnN1Y2Nlc3MgPT0gJ2Z1bmN0aW9uJykge1xyXG5cdFx0ICAgICAgIFx0XHRvcHRpb25zLnN1Y2Nlc3MoSlNPTi5wYXJzZSh0aGlzLnJlc3BvbnNlKSk7XHJcblx0XHQgICBcdFx0fVxyXG5cdFx0ICAgICAgIFxyXG5cdFx0ICAgICAgIFx0aWYob3B0aW9ucy5oYXNPd25Qcm9wZXJ0eSgnYWZ0ZXInKSAmJiB0eXBlb2Ygb3B0aW9ucy5hZnRlciA9PSAnZnVuY3Rpb24nKSB7XHJcblx0XHQgICAgICAgXHRcdG9wdGlvbnMuYWZ0ZXIodGhpcy5yZXNwb25zZSk7XHJcblx0XHQgICBcdFx0fVxyXG5cdFx0ICAgIH1cclxuXHRcdH07XHJcblxyXG5cdFx0eGhyLm9uZXJyb3IgPSBmdW5jdGlvbihtZXNzYWdlLCBhLCBiKSB7XHJcblx0XHRcdGlmKG9wdGlvbnMuaGFzT3duUHJvcGVydHkoJ2Vycm9yJykgJiYgdHlwZW9mIG9wdGlvbnMuZXJyb3IgPT0gJ2Z1bmN0aW9uJykge1xyXG5cdFx0XHRcdG9wdGlvbnMuZXJyb3IobWVzc2FnZSwgYSwgYik7XHJcblx0XHRcdH1cclxuXHRcdH07XHJcblxyXG5cdFx0aWYoISBvcHRpb25zLmRhdGEpIHtcclxuXHRcdFx0eGhyLnNlbmQobnVsbCk7XHJcblx0XHRcdHJldHVybiBvcHRpb25zO1xyXG5cdFx0fVxyXG5cclxuXHRcdHZhciBxdWVyeVN0cmluZyA9IE9iamVjdC5rZXlzKG9wdGlvbnMuZGF0YSkubWFwKGZ1bmN0aW9uKGtleSkge1xyXG5cdCAgICAgICAgICAgIHJldHVybiBlbmNvZGVVUklDb21wb25lbnQoa2V5KSArICc9JyArXHJcblx0ICAgICAgICAgICAgICAgIFx0ZW5jb2RlVVJJQ29tcG9uZW50KG9wdGlvbnMuZGF0YVtrZXldKTtcclxuXHQgICAgICAgIFx0fSkuam9pbignJicpO1xyXG5cclxuXHRcdHhoci5zZW5kKHF1ZXJ5U3RyaW5nKTtcclxuXHJcblx0XHRyZXR1cm4gb3B0aW9ucztcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIE1ha2VzIGEgR0VUIGFqYXggcmVxdWVzdC5cclxuXHQgKiBcclxuXHQgKiBAcGFyYW0gb2JqZWN0IHwgb3B0aW9uc1xyXG5cdCAqIEByZXR1cm4gUHJvbWlzZVxyXG5cdCAqL1xyXG5cdGdldChvcHRpb25zKVxyXG5cdHtcclxuXHRcdGxldCB4aHIgPSB0aGlzLnhocjtcclxuXHJcblx0XHRpZihvcHRpb25zLmhhc093blByb3BlcnR5KCdiZWZvcmUnKSAmJiB0eXBlb2Ygb3B0aW9ucy5iZWZvcmUgPT0gJ2Z1bmN0aW9uJykge1xyXG5cdFx0XHRvcHRpb25zLmJlZm9yZS5jYWxsKHRoaXMpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcclxuXHRcdFx0aWYodHlwZW9mIG9wdGlvbnMgIT09ICdvYmplY3QnKSB7XHJcblx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKCdnZXQgZXhwZWN0aW5nIGEganNvbiBvYmplY3QgdG8gYmUgcGFzc2VkIGFzIGFuIGFyZ3VtZW50LCBidXQgJysgdHlwZW9mIG9wdGlvbnMgKyAnIHdhcyBwYXNzZWQuJyk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdG9wdGlvbnMuZGF0YSA9IG9wdGlvbnMuZGF0YSB8fCB7fTtcclxuXHJcblx0XHRcdGlmKHR5cGVvZiBvcHRpb25zLmRhdGEgIT09ICdvYmplY3QnKSB7XHJcblx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKCdkYXRhIHByb3BlcnR5IGV4cGVjdGluZyBhIGpzb24gb2JqZWN0IHRvIGJlIHBhc3NlZCBhcyBhbiBhcmd1bWVudCwgYnV0ICcgKyB0eXBlb2Ygb3B0aW9ucy5kYXRhICsgJyB3YXMgcGFzc2VkLicpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHR4aHIub3BlbignR0VUJywgb3B0aW9ucy51cmwsIHRydWUpO1xyXG5cclxuXHRcdFx0eGhyLnJlc3BvbnNlVHlwZSA9IG9wdGlvbnMuZGF0YVR5cGUgfHwgJ2pzb24nO1xyXG5cdFx0XHR4aHIudGltZW91dCA9IG9wdGlvbnMudGltZW91dCB8fCAzMDAwO1xyXG5cclxuXHRcdFx0eGhyLm9ucmVhZHlzdGF0ZWNoYW5nZSA9IGZ1bmN0aW9uKCkge1xyXG5cdFx0XHQgICAgaWYodGhpcy5yZWFkeVN0YXRlICE9IDQgfHwgdGhpcy5zdGF0dXMgIT0gMjAwKSB7XHJcblx0XHRcdCAgICBcdHJldHVybjtcclxuXHRcdFx0ICAgIH1cclxuXHQgICAgICAgXHRcclxuICAgICAgIFx0XHRcdHJlc29sdmUodGhpcy5yZXNwb25zZSk7XHJcbiAgICAgICBcdFx0XHRcclxuICAgICAgIFx0XHRcdGlmKG9wdGlvbnMuaGFzT3duUHJvcGVydHkoJ2FmdGVyJykgJiYgdHlwZW9mIG9wdGlvbnMuYWZ0ZXIgPT0gJ2Z1bmN0aW9uJykge1xyXG5cdFx0XHRcdFx0b3B0aW9ucy5hZnRlci5jYWxsKHRoaXMpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fTtcclxuXHJcblx0XHRcdHhoci5vbmVycm9yID0gZnVuY3Rpb24obWVzc2FnZSkge1xyXG5cdFx0XHRcdG9wdGlvbnMuZXJyb3IobWVzc2FnZSk7XHJcblx0XHRcdFx0cmVqZWN0KG1lc3NhZ2UpO1xyXG5cdFx0XHR9O1xyXG5cclxuXHRcdFx0aWYoISBvcHRpb25zLmRhdGEpIHtcclxuXHRcdFx0XHR4aHIuc2VuZChudWxsKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0dmFyIHF1ZXJ5U3RyaW5nID0gT2JqZWN0LmtleXMob3B0aW9ucy5kYXRhKS5tYXAoZnVuY3Rpb24oa2V5KSB7XHJcblx0XHQgICAgICAgICAgICByZXR1cm4gZW5jb2RlVVJJQ29tcG9uZW50KGtleSkgKyAnPScgK1xyXG5cdFx0ICAgICAgICAgICAgICAgIFx0ZW5jb2RlVVJJQ29tcG9uZW50KG9wdGlvbnMuZGF0YVtrZXldKTtcclxuXHRcdCAgICAgICAgXHR9KS5qb2luKCcmJyk7XHJcblxyXG5cdFx0XHR4aHIuc2VuZChxdWVyeVN0cmluZyk7XHJcblx0XHR9KTtcclxuXHR9XHJcbn1cblxuY2xhc3MgSW52YWxpZEJpbmRpbmdFeGNlcHRpb24gZXh0ZW5kcyBFcnJvclxyXG57XHJcblx0Y29uc3RydWN0b3IoKSBcclxuXHR7IFxyXG4gICAgXHRzdXBlcigpO1xyXG4gICAgXHRjb25zb2xlLmVycm9yKGBJbnZhbGlkQmluZGluZ0V4Y2VwdGlvbiwgdHJ5aW5nIHRvIGJpbmQgYW4gYWxyZWFkeSBleGlzdGluZyBib3VuZC5gKTtcclxuICAgIH1cclxufVxuXG4vKipcclxuICogQGZpbGUgXHJcbiAqIENvbnRhaW5lciBjbGFzcy5cclxuICpcclxuICogSGFuZGxlcy9Db250cm9scyB0aGUgZGVwZW5kZW5jaWVzIG9mIGVjb21tZXJjZS5cclxuICovXHJcblxyXG4vKipcclxuICogU3RvcmVzIHRoZSBpbnN0YW5jZXNcclxuICpcclxuICogQHZhciBhcnJheVxyXG4gKi9cclxubGV0IGluc3RhbmNlcyA9IFtdO1xyXG5cclxuY2xhc3MgQ29udGFpbmVyIFxyXG57XHJcblx0LyoqXHJcblx0ICogQmluZHMga2V5IHRvIGNvbmNyZXRlIGNsYXNzLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIHN0cmluZyB8IGtleVxyXG5cdCAqIEBwYXJhbSBjbGFzcyB8IGNvbmNyZXRlXHJcblx0ICogQHJldHVybiB2b2lkXHJcblx0ICovXHJcblx0YmluZChrZXksIGNvbmNyZXRlKSBcclxuXHR7XHJcblx0XHRpZiAodHlwZW9mIGtleSAhPSAnc3RyaW5nJyB8fCB0eXBlb2YgY29uY3JldGUgIT0gJ2Z1bmN0aW9uJykge1xyXG5cdFx0XHR0aHJvdyBuZXcgSW52YWxpZEFyZ3VtZW50RXhjZXB0aW9uJDE7XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKHR5cGVvZiB0aGlzW2tleV0gIT0gJ3VuZGVmaW5lZCcpIHtcclxuXHRcdFx0dGhyb3cgbmV3IEludmFsaWRCaW5kaW5nRXhjZXB0aW9uO1xyXG5cdFx0fVxyXG5cclxuXHRcdHRoaXNba2V5XSA9IGNvbmNyZXRlLmJpbmQoY29uY3JldGUsIHRoaXMpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogU2V0cyBhbiBpbnN0YW5jZS5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSBzdHJpbmcgfCBrZXlcclxuXHQgKiBAcGFyYW0gb2JqZWN0IHwgaW5zdGFuY2VcclxuXHQgKiBAcmV0dXJuIHZvaWRcclxuXHQgKi9cclxuXHRzZXRJbnN0YW5jZShrZXksIGluc3RhbmNlKSBcclxuXHR7XHJcblx0XHRpZih0eXBlb2Yga2V5ICE9ICdzdHJpbmcnIHx8IHR5cGVvZiBpbnN0YW5jZSAhPSAnb2JqZWN0Jykge1xyXG5cdFx0XHR0aHJvdyBuZXcgSW52YWxpZEFyZ3VtZW50RXhjZXB0aW9uJDE7XHJcblx0XHR9XHJcblxyXG5cdFx0aW5zdGFuY2VzW2tleV0gPSBpbnN0YW5jZTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFJlc29sdmVzIGFuIGluc3RhbmNlIG91dCBvZiBcclxuXHQgKiB0aGUgaW9jIGNvbnRhaW5lci5cclxuXHQgKiBcclxuXHQgKiBAcGFyYW0gc3RyaW5nIHwga2V5XHJcblx0ICogQHJldHVybiBvYmplY3RcclxuXHQgKi9cclxuXHRnZXRJbnN0YW5jZShrZXkpIFxyXG5cdHtcclxuXHRcdGlmKHR5cGVvZiBrZXkgIT0gJ3N0cmluZycpIHtcclxuXHRcdFx0dGhyb3cgbmV3IEludmFsaWRBcmd1bWVudEV4Y2VwdGlvbiQxO1xyXG5cdFx0fVxyXG5cclxuXHRcdGlmKHR5cGVvZiBrZXkgPT0gJ29iamVjdCcpIHtcclxuXHRcdFx0cmV0dXJuIGluc3RhbmNlc1trZXkuY29uc3RydWN0b3IubmFtZV0gfHwgbnVsbDtcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gaW5zdGFuY2VzW2tleV0gfHwgbnVsbDtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIENoZWNrcyBpZiBhbiBpbnN0YW5jZSBleGlzdC5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSBtaXhlZCB8IGluc3RhbmNlXHJcblx0ICogQHJldHVybiBib29sXHJcblx0ICovXHJcblx0aW5zdGFuY2VFeGlzdChpbnN0YW5jZSkgXHJcblx0e1xyXG5cdFx0aWYgKHR5cGVvZiBpbnN0YW5jZSA9PSAnb2JqZWN0Jykge1xyXG5cdFx0XHRyZXR1cm4gKHR5cGVvZiBpbnN0YW5jZXNbaW5zdGFuY2UuY29uc3RydWN0b3IubmFtZV0gIT09ICd1bmRlZmluZWQnKTtcclxuXHRcdH0gZWxzZSBpZiAodHlwZW9mIGluc3RhbmNlID09ICdzdHJpbmcnKSB7XHJcblx0XHRcdHJldHVybiAodHlwZW9mIGluc3RhbmNlc1tpbnN0YW5jZV0gIT09ICd1bmRlZmluZWQnKVxyXG5cdFx0fVxyXG5cdFx0XHJcblx0XHR0aHJvdyBuZXcgSW52YWxpZEFyZ3VtZW50RXhjZXB0aW9uJDE7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBSZXRyaWV2ZSBhbiBvYmplY3QsIGlmIG5vdCBleGlzdHNcclxuXHQgKiB3aWxsIGNyZWF0ZSBpdCwgc2V0IGl0IGluIHRoZSBpb2MgY29udGFpbmVyXHJcblx0ICogZm9yIGxhdGVyIHVzZSBhbmQgcmV0cmlldmUgaXQuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gbWl4ZWQgfCBvYmplY3QgXHJcblx0ICogQHJldHVybiBvYmplY3RcclxuXHQgKi9cclxuXHRtYWtlKG9iamVjdClcclxuXHR7XHJcblx0XHRsZXQgaW5zdGFuY2UgPSB7fTtcclxuXHRcdGxldCBrZXk7XHJcblxyXG5cdFx0aWYgKHRoaXMuaW5zdGFuY2VFeGlzdChvYmplY3QpKSB7XHJcblx0XHRcdHJldHVybiB0aGlzLmdldEluc3RhbmNlKG9iamVjdCk7XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKHR5cGVvZiBvYmplY3QgPT0gJ29iamVjdCcpIHtcclxuXHRcdFx0aW5zdGFuY2UgPSBvYmplY3Q7XHJcblx0XHRcdGtleSA9IG9iamVjdC5jb25zdHJ1Y3Rvci5uYW1lO1xyXG5cdFx0XHR0aGlzLnNldEluc3RhbmNlKGtleSwgaW5zdGFuY2UpOyBcclxuXHRcdH0gZWxzZSBpZih0eXBlb2Ygb2JqZWN0ID09ICdzdHJpbmcnICYmIHRoaXMuaGFzT3duUHJvcGVydHkob2JqZWN0KSkge1xyXG5cdFx0XHRpbnN0YW5jZSA9IG5ldyB0aGlzW29iamVjdF07XHJcblx0XHRcdGtleSA9IG9iamVjdDtcclxuXHRcdFx0dGhpcy5zZXRJbnN0YW5jZShrZXksIGluc3RhbmNlKTtcdFxyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0dGhyb3cgbmV3IEludmFsaWRCaW5kaW5nRXhjZXB0aW9uO1xyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiBpbnN0YW5jZTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFJldHJpZXZlIGFsbCBpbnN0YW5jZXMuXHJcblx0ICpcclxuXHQgKiBAcmV0dXJuIGFycmF5XHJcblx0ICovXHJcblx0aW5zdGFuY2VzKCkgXHJcblx0e1xyXG5cdFx0cmV0dXJuIGluc3RhbmNlcztcclxuXHR9XHJcbn1cblxuY2xhc3MgQmFkRXZlbnRDYWxsRXhjZXB0aW9uIGV4dGVuZHMgRXJyb3Jcclxue1xyXG5cdGNvbnN0cnVjdG9yKG1lc3NhZ2UpIFxyXG5cdHsgXHJcblx0XHRzdXBlcihtZXNzYWdlKTtcclxuICAgIFx0Y29uc29sZS5lcnJvcignQmFkRXZlbnRDYWxsRXhjZXB0aW9uOiAnICsgbWVzc2FnZSk7XHJcbiAgICB9XHJcbn1cblxuLyoqXHJcbiAqIEBmaWxlIFxyXG4gKiBFdmVudCBjbGFzcy5cclxuICpcclxuICogSGFuZGxlcyBzdWJzY3JpcGlvbnMgYW5kIHB1Ymxpc2hpbmcgb2YgZXZlbnRzLlxyXG4gKi9cclxuXHJcbi8qKlxyXG4gKiBTdG9yZXMgdGhlIGV2ZW50cyBjYWxsYmFja3MuXHJcbiAqIFxyXG4gKiBAdmFyIGFycmF5XHJcbiAqL1xyXG5sZXQgZXZlbnRzID0ge307XHJcblxyXG5jbGFzcyBFdmVudE1hbmFnZXJcclxue1xyXG5cdC8qKlxyXG5cdCAqIFN1YnNjcmliaW5nIHRvIGFuIGV2ZW50LlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIHN0cmluZyB8IG5hbWVcclxuXHQgKiBAcGFyYW0gZnVuY3Rpb24gfCBjYWxsYmFja1xyXG5cdCAqIEByZXR1cm4gdm9pZFxyXG5cdCAqL1xyXG5cdHN0YXRpYyBzdWJzY3JpYmUobmFtZSwgY2FsbGJhY2spIHtcclxuXHRcdGlmICh0eXBlb2YgY2FsbGJhY2sgIT09ICdmdW5jdGlvbicpIHtcclxuXHRcdFx0dGhyb3cgbmV3IEludmFsaWRBcmd1bWVudEV4Y2VwdGlvbjtcclxuXHRcdH1cclxuXHJcblx0XHRpZiAodHlwZW9mIGV2ZW50c1tuYW1lXSA9PSAndW5kZWZpbmVkJykge1xyXG5cdFx0XHRldmVudHNbbmFtZV0gPSBbXTtcclxuXHRcdH1cclxuXHJcblx0XHRldmVudHNbbmFtZV0ucHVzaChjYWxsYmFjayk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBQdWJsaXNoIGFuIGV2ZW50IHRvIGFsbCBzdWJzY3JpYmVycy5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSBzdHJpbmcgfCBuYW1lXHJcblx0ICogQHBhcmFtIGxpc3QgfCBkYXRhXHJcblx0ICogQHJldHVybiB2b2lkXHJcblx0ICovXHJcblx0c3RhdGljIHB1Ymxpc2gobmFtZSwgLi4uZGF0YSkge1xyXG5cdFx0ZGF0YSA9IGRhdGEgfHwgbnVsbDtcclxuXHJcblx0XHQvLyBJZiB0aGVyZSBhcmUgbm8gc3Vic2NyaWJlcnMgc2ltcGx5IGlnbm9yZSB0aGF0IGV2ZW50LlxyXG5cdFx0aWYgKHR5cGVvZiBldmVudHNbbmFtZV0gPT0gJ3VuZGVmaW5lZCcpIHtcclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0fVxyXG5cclxuXHRcdGV2ZW50c1tuYW1lXS5mb3JFYWNoKGZ1bmN0aW9uKGNhbGxiYWNrKSB7XHJcblx0XHRcdGlmKHR5cGVvZiBjYWxsYmFjayAhPSAnZnVuY3Rpb24nKSB7XHJcblx0XHRcdFx0dGhyb3cgbmV3IEludmFsaWRBcmd1bWVudEV4Y2VwdGlvbignbGlzdGVuKCkgc2hvdWxkIHJlY2lldmUgY2FsbGJhY2sgYXMgc2Vjb25kIHBhcmFtZXRlciwgYnV0ICcrIHR5cGVvZiBjYWxsYmFjayArJyB3YXMgcGFzc2VkJyk7XHJcblx0XHRcdH1cclxuXHRcdFx0XHJcblx0XHRcdHJldHVybiBjYWxsYmFjayguLi5kYXRhKTtcclxuXHRcdH0pO1xyXG5cdH1cclxufVxuXG5jbGFzcyBDb21wb25lbnRzRXhjZXB0aW9uIGV4dGVuZHMgRXJyb3Jcclxue1xyXG5cdGNvbnN0cnVjdG9yKCkgXHJcblx0eyBcclxuICAgIFx0c3VwZXIoKTtcclxuICAgIFx0Y29uc29sZS5lcnJvcihgQ29tcG9uZW50c0V4Y2VwdGlvbiwgZXhwZWN0aW5nIGZvciBhdCBsZWFzdCBvbmUgY29tcG9uZW50cywgYnV0IG5vbmUgd2FzIGdpdmVuLCBcclxuXHRcdFx0XHRcdFx0XHRcdHBsZWFzZSBhZGQgYXQgbGVhc3Qgb25lIHJlcXVpcmVtZW50KFByb2R1Y3RzLCBTZXJ2aWNlcyBvci9hbmQgRmlsdGVyLmApO1xyXG4gICAgfVxyXG59XG5cbmNsYXNzIE5vdEluUGFnZVJhbmdlRXhjZXB0aW9uIGV4dGVuZHMgRXJyb3Jcclxue1xyXG5cdGNvbnN0cnVjdG9yKCkgXHJcblx0eyBcclxuICAgIFx0c3VwZXIoKTtcclxuICAgIFx0Y29uc29sZS5lcnJvcihgTm90SW5QYWdlUmFuZ2VFeGNlcHRpb24sIHNvcnJ5LCBubyBtb3JlIHBhZ2VzLmApO1xyXG4gICAgfVxyXG59XG5cbmNsYXNzIENvbXBvbmVudE5vdFJlZ2lzdGVyZWRFeGNlcHRpb24gZXh0ZW5kcyBFcnJvclxyXG57XHJcblx0Y29uc3RydWN0b3IoKSBcclxuXHR7IFxyXG4gICAgXHRzdXBlcigpO1xyXG4gICAgXHRjb25zb2xlLmVycm9yKGBDb21wb25lbnROb3RSZWdpc3RlcmVkRXhjZXB0aW9uLCBjb21wb25lbnRzIG11c3QgYmUgcmVnaXN0ZXJlZCBpbiBvcmRlciB0byB1c2UgdGhlbS5gKTtcclxuICAgIH1cclxufVxuXG5jbGFzcyBFeGNlcHRpb25IYW5kbGVyIGV4dGVuZHMgRXJyb3Jcclxue1xyXG5cdC8qKlxyXG5cdCAqIEhhbmRsZSBhbGwgdGhlIGVycm9yc1xyXG5cdCAqL1xyXG5cdHN0YXRpYyBpbml0YWxpemUoKSB7XHRcclxuXHRcdHdpbmRvdy5vbmVycm9yID0gZnVuY3Rpb24obWVzc2FnZSwgc291cmNlLCBsaW5lbm8sIGNvbG5vLCBlcnJvcikge1xyXG5cdFx0XHRcclxuXHRcdFx0aWYgKGVycm9yIGluc3RhbmNlb2YgSW52YWxpZEFyZ3VtZW50RXhjZXB0aW9uJDEpIHtcclxuXHRcdFx0XHQvLyBoYW5kbGVcclxuXHRcdFx0fSBlbHNlIGlmIChlcnJvciBpbnN0YW5jZW9mIEludmFsaWRCaW5kaW5nRXhjZXB0aW9uKSB7XHJcblx0XHRcdFx0Ly8gaGFuZGxlXHJcblx0XHRcdH0gZWxzZSBpZiAoZXJyb3IgaW5zdGFuY2VvZiBCYWRFdmVudENhbGxFeGNlcHRpb24pIHtcclxuXHRcdFx0XHQvLyBoYW5kbGVcclxuXHRcdFx0fSBlbHNlIGlmIChlcnJvciBpbnN0YW5jZW9mIENvbXBvbmVudHNFeGNlcHRpb24pIHtcclxuXHRcdFx0XHQvLyBoYW5kbGVcclxuXHRcdFx0fSBlbHNlIGlmIChlcnJvciBpbnN0YW5jZW9mIENvbXBvbmVudE5vdFJlZ2lzdGVyZWRFeGNlcHRpb24pIHtcclxuXHRcdFx0XHQvLyBoYW5kbGVcclxuXHRcdFx0fSBlbHNlIGlmIChlcnJvciBpbnN0YW5jZW9mIE5vdEluUGFnZVJhbmdlRXhjZXB0aW9uKSB7XHJcblx0XHRcdFx0Ly8gaGFuZGxlIFxyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0cmV0dXJuIHRydWU7XHJcblx0XHR9O1xyXG5cdH1cclxufVxuXG4vKipcclxuICogQGZpbGUgXHJcbiAqIFN0ciBjbGFzcy5cclxuICpcclxuICogQWRkcyBzb21lIHVzZWZ1bCBmdW5jdGlvbmFsaXR5IGZvclxyXG4gKiBtYW5pcHVsYXRpbmcgc3RyaW5ncyBvciBjcmVhdGluZyBzdHJpbmcuXHJcbiAqL1xyXG5cclxuY2xhc3MgU3RyXHJcbntcclxuXHJcblx0LyoqXHJcblx0ICogQ29udmVydCBjYW1lbENhc2UgdG8ga2ViYWItY2FzZS5cclxuXHQgKi9cclxuXHRzdGF0aWMga2ViYWJDYXNlKHN0cmluZykgXHJcblx0e1xyXG5cdFx0cmV0dXJuIHN0cmluZy5yZXBsYWNlKC8oW2Etel0pKFtBLVpdKS9nLCAnJDEtJDInKS50b0xvd2VyQ2FzZSgpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogR2VuZXJhdGVzIGEgcmFuZG9tIHN0cmluZy5cclxuXHQgKi9cclxuXHRzdGF0aWMgcmFuZG9tKGxlbmd0aCkgXHJcblx0e1xyXG5cdFx0bGV0IHN0cmluZyA9ICcnO1xyXG5cdFx0bGV0IHBvc3NpYmxlID0gXCJBQkNERUZHSElKS0xNTk9QUVJTVFVWV1hZWmFiY2RlZmdoaWprbG1ub3BxcnN0dXZ3eHl6MDEyMzQ1Njc4OVwiO1xyXG5cclxuXHRcdGZvciAobGV0IGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcclxuXHQgICAgXHRzdHJpbmcgKz0gcG9zc2libGUuY2hhckF0KE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIHBvc3NpYmxlLmxlbmd0aCkpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiBzdHJpbmc7XHJcblx0fVxyXG5cclxufVxuXG4vKipcclxuICogQGZpbGUgXHJcbiAqIENvb2tpZSBjbGFzcy5cclxuICpcclxuICogQWRkcyBzb21lIHVzZWZ1bCBmdW5jdGlvbmFsaXR5IGZvclxyXG4gKiBzZXR0aW5nIG9yIGdldHRpbmcgY29va2llcy5cclxuICovXHJcblx0XHJcbmNsYXNzIENvb2tpZVxyXG57XHJcblx0LyoqXHJcbiBcdCogU2V0cyBhIGNvb2tpZS5cclxuIFx0KiBcclxuIFx0KiBAcGFyYW0gc3RyaW5nIHwgbmFtZVxyXG4gXHQqIEBwYXJhbSBKU09OIHwgdmFsdWVcclxuIFx0KiBAcGFyYW0gaW50ZWdlciB8IGRheXNcclxuIFx0KiBAcmV0dXJuIHZvaWRcclxuXHQqL1xyXG5cdHN0YXRpYyBzZXQobmFtZSwgdmFsdWUsIGRheXMpIFxyXG5cdHtcclxuXHRcdGlmICh2YWx1ZS5jb25zdHJ1Y3Rvci5uYW1lICA9PSAnT2JqZWN0JyB8fCB2YWx1ZS5jb25zdHJ1Y3Rvci5uYW1lID09ICdBcnJheScpIHtcclxuXHRcdFx0dmFsdWUgPSBKU09OLnN0cmluZ2lmeSh2YWx1ZSk7XHJcblx0XHR9XHJcblxyXG5cdFx0ZGF5cyA9IGRheXMgfHwgMTA7XHJcblxyXG5cdCAgICBsZXQgZXhwaXJlcztcclxuXHQgICAgXHJcblx0ICAgIGlmIChkYXlzKSB7XHJcblx0ICAgICAgICBsZXQgZGF0ZSA9IG5ldyBEYXRlKCk7XHJcblx0ICAgICAgICBkYXRlLnNldFRpbWUoZGF0ZS5nZXRUaW1lKCkgKyAoZGF5cyAqIDI0ICogNjAgKiA2MCAqIDEwMDApKTtcclxuXHQgICAgICAgIGV4cGlyZXMgPSBcIjsgZXhwaXJlcz1cIiArIGRhdGUudG9HTVRTdHJpbmcoKTtcclxuXHQgICAgfSBlbHNlIHtcclxuXHQgICAgICAgIGV4cGlyZXMgPSBcIlwiO1xyXG5cdCAgICB9XHJcblxyXG5cdCAgICBkb2N1bWVudC5jb29raWUgPSBuYW1lICsgXCI9XCIgKyB2YWx1ZSArIGV4cGlyZXMgKyBcIjsgcGF0aD0vXCI7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBSZXRyaWV2ZXMgdGhlIGNvb2tpZSBieSBuYW1lLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIHN0cmluZyB8IG5hbWVcclxuIFx0ICogQHJldHVybiBKU09OXHJcblx0ICovXHJcblx0c3RhdGljIGdldChuYW1lKSBcclxuXHR7XHJcblx0ICAgIGlmIChkb2N1bWVudC5jb29raWUubGVuZ3RoID4gMCkge1xyXG5cdCAgICAgICAgbGV0IGNfc3RhcnQgPSBkb2N1bWVudC5jb29raWUuaW5kZXhPZihuYW1lICsgXCI9XCIpO1xyXG5cdCAgICAgICAgXHJcblx0ICAgICAgICBpZiAoY19zdGFydCAhPSAtMSkge1xyXG5cdCAgICAgICAgICAgIGNfc3RhcnQgPSBjX3N0YXJ0ICsgbmFtZS5sZW5ndGggKyAxO1xyXG5cdCAgICAgICAgICAgIGxldCBjX2VuZCA9IGRvY3VtZW50LmNvb2tpZS5pbmRleE9mKFwiO1wiLCBjX3N0YXJ0KTtcclxuXHQgICAgICAgICAgICBcclxuXHQgICAgICAgICAgICBpZiAoY19lbmQgPT0gLTEpIHtcclxuXHQgICAgICAgICAgICAgICAgY19lbmQgPSBkb2N1bWVudC5jb29raWUubGVuZ3RoO1xyXG5cdCAgICAgICAgICAgIH1cclxuXHJcblx0ICAgICAgICAgICAgcmV0dXJuIEpTT04ucGFyc2UodW5lc2NhcGUoZG9jdW1lbnQuY29va2llLnN1YnN0cmluZyhjX3N0YXJ0LCBjX2VuZCkpKTtcclxuXHQgICAgICAgIH1cclxuXHQgICAgfVxyXG5cclxuXHQgICAgcmV0dXJuIHt9O1xyXG5cdH1cclxufVxuXG4vKipcclxuICogVGhlIGRlZmF1bHQgc2V0dGluZ3Mgb2YgdGhlIGNhcnQuXHJcbiAqL1xyXG5sZXQgZGVmYXVsdFNldHRpbmdzJDIgPSB7XHJcblx0ZWxlbWVudDogJy5jYXJ0JyxcclxuXHRjb29raWVfbmFtZTogJ2NhcnQnLFxyXG5cdHByZXZpZXdfY2xhc3M6ICcnLFxyXG5cdGxvYWRlcjogJy9pbWFnZXMvaWNvbnMvc3Bpbm5lci5zdmcnLFxyXG5cdGNsYXNzOiAnJyxcclxuXHR3aWR0aDogJzYwcHgnLFxyXG5cdGhlaWdodDogJzYwcHgnLFxyXG5cdHBsYWNlbWVudDogJ3JpZ2h0LXRvcCcsXHJcblx0Zml4ZWQ6IHRydWUsXHJcblx0aG92ZXJfY29sb3I6ICdvcmFuZ2UnXHJcbn07XHJcblxyXG4vKipcclxuICogU3RvcmVzIHRoZSBjb250YWluZXIgb2JqZWN0LlxyXG4gKi9cclxubGV0IENvbnRhaW5lciQyO1xyXG5cclxuLyoqXHJcbiAqIFN0b3JlcyB0aGUgcmVxdWVzdCBvYmplY3QuXHJcbiAqL1xyXG5sZXQgSHR0cDtcclxuXHJcbi8qKlxyXG4gKiBTdG9yZXMgdGhlIGNhcnQgbG9hZGVyLlxyXG4gKi9cclxubGV0IGxvYWRpbmdPdmVybGF5O1xyXG5cclxuLyoqXHJcbiAqIFN0b3JlcyB0aGUgaXRlbXMgd3JhcHBlci5cclxuICovXHJcbmxldCBpdGVtc0RpdjtcclxuXHJcbi8qKlxyXG4gKiBUaGUgQ2FydCBPYmplY3QsIGhhbmRsZXMgdGhlIGNhcnQgaWNvbiBhbmQgc2Vzc2lvbnMuXHJcbiAqL1xyXG5jbGFzcyBDYXJ0IFxyXG57XHJcblx0LyoqXHJcblx0ICogSW5pdGlhbGl6ZSB0aGUgZGVmYXVsdCBzZXR0aW5ncywgc2V0dGluZyB0aGUgZWxlbWVudCxcclxuXHQgKiBhbmQgY3JlYXRpbmcgdGhlIHByZXZpZXcgZm9yIHRoZSBjYXJ0cyBkZXRhaWxzLlxyXG5cdCAqL1xyXG5cdGNvbnN0cnVjdG9yKGNvbnRhaW5lciwgaHR0cCkgXHJcblx0e1xyXG5cdFx0Q29udGFpbmVyJDIgPSBjb250YWluZXI7XHJcblx0XHRIdHRwID0gaHR0cDtcclxuXHRcdFxyXG5cdFx0dGhpcy5wcmV2aWV3RWxlbWVudCA9IHRoaXMuY3JlYXRlUHJldmlld0VsZW1lbnQoKTtcclxuXHRcdHRoaXMuc3ZnSWNvbiA9IGNyZWF0ZUljb24uY2FsbCh0aGlzKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFNldHMgdGhlIG9iamVjdCBieSB0aGUgdXNlcnMgc2V0dGluZy5cclxuXHQgKi9cclxuXHRzZXR1cChzZXR0aW5ncylcclxuXHR7XHJcblx0XHRpZih0eXBlb2Ygc2V0dGluZ3MgIT0gJ29iamVjdCcpIHtcclxuXHRcdFx0dGhyb3cgbmV3IEludmFsaWRBcmd1bWVudEV4Y2VwdGlvbiQxO1xyXG5cdFx0fVxyXG5cclxuXHRcdHRoaXMuc2V0dGluZ3MgPSBDb21tb24uZXh0ZW5kKGRlZmF1bHRTZXR0aW5ncyQyLCBzZXR0aW5ncyk7XHJcblxyXG5cdFx0dGhpcy5zZXRFbGVtZW50KHRoaXMuc2V0dGluZ3MuZWxlbWVudCk7XHJcblxyXG5cdFx0RE9NLmFkZENsYXNzKHRoaXMucHJldmlld0VsZW1lbnQsICdjbG9zZWQnKTtcclxuXHRcdERPTS5hZGRDbGFzcyh0aGlzLnByZXZpZXdFbGVtZW50LCB0aGlzLnNldHRpbmdzLnByZXZpZXdfY2xhc3MpO1xyXG5cdFx0XHJcblx0XHR0aGlzLmJpbmRFdmVudExpc3RlbmVycygpO1xyXG5cdFx0dGhpcy5hZGRTdHlsZVRhZygpO1xyXG5cclxuXHRcdGlmKHRoaXMuaXNFbXB0eShDb29raWUuZ2V0KHRoaXMuc2V0dGluZ3MuY29va2llX25hbWUpKSkge1xyXG5cdFx0XHR0aGlzLmNhcnQgPSB7fTtcclxuXHRcdFx0dGhpcy5zZXRDYXJ0KHRoaXMuY2FydCk7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBDaGVja3MgaWYgdGhlIGNhcnQgaXMgZW1wdHlcclxuXHQgKi9cclxuXHRpc0VtcHR5KGNhcnQpXHJcblx0e1xyXG5cdFx0cmV0dXJuIENvbW1vbi5lbXB0eU9iamVjdChjYXJ0KTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFNldHMgdGhlIGNhcnQgYXMgYSBjb29raWUuXHJcblx0ICovXHJcblx0c2V0Q2FydChjYXJ0KVxyXG5cdHtcclxuXHRcdHRoaXMuY2FydC5pZCA9IFN0ci5yYW5kb20oMTApO1xyXG5cdFx0dGhpcy5jYXJ0Lml0ZW1zID0gW107XHJcblx0XHR0aGlzLmNhcnQuZmF2b3JpdGVzID0gW107XHJcblx0XHRDb29raWUuc2V0KHRoaXMuc2V0dGluZ3MuY29va2llX25hbWUsIGNhcnQsIDIpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQWRkcyBhbiBpdGVtIHRvIHRoZSBjYXJ0LlxyXG5cdCAqL1xyXG5cdGFkZEl0ZW0oaXRlbSlcclxuXHR7XHJcblx0XHR0aGlzLmNhcnQgPSBDb29raWUuZ2V0KHRoaXMuc2V0dGluZ3MuY29va2llX25hbWUpO1xyXG5cclxuXHRcdHRoaXMuY2FydC5pdGVtcy5wdXNoKGl0ZW0pO1xyXG5cclxuXHRcdENvb2tpZS5zZXQodGhpcy5zZXR0aW5ncy5jb29raWVfbmFtZSwgdGhpcy5jYXJ0LCAyKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFJlbW92ZXMgYW4gaXRlbSBmcm9tIHRoZSBjYXJ0LlxyXG5cdCAqL1xyXG5cdHJlbW92ZUl0ZW0oaXRlbSlcclxuXHR7XHJcbiBcdFx0dGhpcy5jYXJ0ID0gQ29va2llLmdldCh0aGlzLnNldHRpbmdzLmNvb2tpZV9uYW1lKTtcclxuXHJcbiBcdFx0dGhpcy5jYXJ0Lml0ZW1zLnNwbGljZSh0aGlzLmNhcnQuaXRlbXMuaW5kZXhPZihpdGVtKSwgMSk7XHJcblxyXG4gXHRcdENvb2tpZS5zZXQodGhpcy5zZXR0aW5ncy5jb29raWVfbmFtZSwgdGhpcy5jYXJ0LCAyKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEFkZHMgdGhlIGl0ZW0gdG8gcHJldmlldy5cclxuXHQgKi9cclxuXHRhZGRUb1ByZXZpZXcoaXRlbXMpXHJcblx0e1xyXG5cdFx0aXRlbXNEaXYuaW5uZXJIVE1MID0gJyc7XHJcblxyXG5cdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCBpdGVtcy5sZW5ndGg7IGkrKykge1xyXG5cclxuXHRcdFx0bGV0IGxpID0gRE9NLmNyZWF0ZUVsZW1lbnQoJ2xpJywge1xyXG5cdFx0XHRcdFx0Y2xhc3M6ICdpdGVtJ1xyXG5cdFx0XHRcdH0pO1xyXG5cclxuXHRcdFx0bGV0IGF0dHJpYnV0ZXMgPSBpdGVtc1tpXTtcclxuXHJcblx0XHRcdGZvcihsZXQgYXR0cmlidXRlIGluIGF0dHJpYnV0ZXMpIHtcclxuXHRcdFx0XHRsZXQgc3BhbiA9IERPTS5jcmVhdGVFbGVtZW50KCdzcGFuJywge1xyXG5cdFx0XHRcdFx0dGV4dDogYXR0cmlidXRlc1thdHRyaWJ1dGVdXHJcblx0XHRcdFx0fSk7XHJcblxyXG5cdFx0XHRcdGxpLmFwcGVuZENoaWxkKHNwYW4pO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRpdGVtc0Rpdi5hcHBlbmRDaGlsZChsaSk7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBCaW5kcyBldmVydGhpbmcgdG8gdGhlIGVsZW1lbnQuXHJcblx0ICovXHJcblx0c2V0RWxlbWVudChzZWxlY3RvcilcclxuXHR7XHJcblx0XHR0aGlzLmljb24gPSBET00uZmluZChzZWxlY3Rvcik7XHJcblxyXG5cdFx0aWYgKHRoaXMuaWNvbikge1xyXG5cdFx0XHRET00uYWRkQ2xhc3ModGhpcy5pY29uLCB0aGlzLnNldHRpbmdzLmNsYXNzKTtcclxuXHRcdFx0RE9NLmFkZENsYXNzKHRoaXMuaWNvbiwgdGhpcy5zZXR0aW5ncy5wbGFjZW1lbnQpO1xyXG5cdFx0XHR0aGlzLmljb24uYXBwZW5kQ2hpbGQodGhpcy5zdmdJY29uKTtcclxuXHRcdFx0dGhpcy5pY29uLmFwcGVuZENoaWxkKHRoaXMucHJldmlld0VsZW1lbnQpO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQ3JlYXRlcyB0aGUgY2FydCBkZXRhaWxzIHByZXZpZXcgZWxlbWVudC5cclxuXHQgKi9cclxuXHRjcmVhdGVQcmV2aWV3RWxlbWVudCgpXHJcblx0e1xyXG5cdFx0bGV0IHByZXZpZXdFbGVtZW50ID0gRE9NLmNyZWF0ZUVsZW1lbnQoJ2RpdicsIHtcclxuXHRcdFx0aWQ6ICdwcmV2aWV3J1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0aXRlbXNEaXYgPSBET00uY3JlYXRlRWxlbWVudCgndWwnLCB7XHJcblx0XHRcdFx0Y2xhc3M6ICdpdGVtcydcclxuXHRcdFx0fSk7XHJcblxyXG5cdFx0cHJldmlld0VsZW1lbnQuYXBwZW5kQ2hpbGQoaXRlbXNEaXYpO1xyXG5cclxuXHRcdHJldHVybiBwcmV2aWV3RWxlbWVudDtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEFkZCB0aGUgZUNvbW1lcmNlIHN0eWxlIHRhZ3MgdG8gdGhlIERPTS5cclxuXHQgKi9cclxuXHRhZGRTdHlsZVRhZygpIFxyXG5cdHtcclxuXHRcdGlmKERPTS5maW5kKCcjZUNvbW1lcmNlLUNhcnQnKSkge1xyXG5cdFx0XHRyZXR1cm47XHJcblx0XHR9XHJcblxyXG5cdFx0bGV0IHBvc2l0aW9uID0gKHRoaXMuc2V0dGluZ3MuZml4ZWQpID8gJ2ZpeGVkJyA6ICdhYnNvbHV0ZSc7XHJcblxyXG5cdFx0bGV0IGNzcyA9IGBcclxuXHRcdFx0JHt0aGlzLnNldHRpbmdzLmVsZW1lbnR9IHtcclxuXHRcdFx0XHRwb3NpdGlvbjogJHtwb3NpdGlvbn07XHJcblx0XHRcdFx0Y3Vyc29yOiBwb2ludGVyO1xyXG5cdFx0XHRcdGNvbG9yOiAjZmZmZmZmO1xyXG5cdFx0XHRcdHotaW5kZXg6IDk5ODtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0JHt0aGlzLnNldHRpbmdzLmVsZW1lbnR9ID4gc3ZnIHtcclxuXHRcdFx0XHR3aWR0aDogJHt0aGlzLnNldHRpbmdzLndpZHRofTtcclxuXHRcdFx0XHRoZWlnaHQ6ICR7dGhpcy5zZXR0aW5ncy5oZWlnaHR9O1xyXG5cdFx0XHRcdHRyYW5zaXRpb246IGZpbGwgMC4zcztcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0JHt0aGlzLnNldHRpbmdzLmVsZW1lbnR9ID4gc3ZnOmhvdmVyIHtcclxuXHRcdFx0XHRmaWxsOiAke3RoaXMuc2V0dGluZ3MuaG92ZXJfY29sb3J9O1xyXG5cdFx0XHRcdHRyYW5zaXRpb246IGZpbGwgMC4zcztcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0JHt0aGlzLnNldHRpbmdzLmVsZW1lbnR9LnRvcC1yaWdodCxcclxuXHRcdFx0JHt0aGlzLnNldHRpbmdzLmVsZW1lbnR9LnJpZ2h0LXRvcCB7XHJcblx0XHRcdFx0cmlnaHQ6IDEwcHg7XHJcblx0XHRcdFx0dG9wOiAxMHB4O1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHQke3RoaXMuc2V0dGluZ3MuZWxlbWVudH0ubGVmdC10b3AsXHJcblx0XHRcdCR7dGhpcy5zZXR0aW5ncy5lbGVtZW50fS50b3AtbGVmdCB7XHJcblx0XHRcdFx0bGVmdDogMTBweDtcclxuXHRcdFx0XHR0b3A6IDEwcHg7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdCR7dGhpcy5zZXR0aW5ncy5lbGVtZW50fSA+ICNwcmV2aWV3IHtcclxuXHRcdFx0XHRwb3NpdGlvbjogJHtwb3NpdGlvbn07XHJcblx0XHRcdFx0ei1pbmRleDogOTk5OTtcclxuXHRcdFx0XHR0b3A6IGNhbGMoMTBweCArICR7dGhpcy5zZXR0aW5ncy5oZWlnaHR9KTtcclxuXHRcdFx0XHR0cmFuc2Zvcm06IHRyYW5zbGF0ZVgoNjBweCk7XHJcblx0XHRcdFx0aGVpZ2h0OiA0MDBweDtcclxuXHRcdFx0XHR3aWR0aDogMzAwcHg7XHJcblx0XHRcdFx0Ym9yZGVyOiAxcHggc29saWQgI2U0ZTRlNDtcclxuXHRcdFx0XHRiYWNrZ3JvdW5kOiAjZmZmZmZmO1xyXG5cdFx0XHRcdHRyYW5zaXRpb246IHRyYW5zZm9ybSAxcywgdmlzaWJpbGl0eSAxcztcclxuXHRcdFx0XHRjdXJzb3I6IGRlZmF1bHQ7XHJcblx0XHRcdFx0b3ZlcmZsb3ctWTogc2Nyb2xsO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHQke3RoaXMuc2V0dGluZ3MuZWxlbWVudH0gPiAjcHJldmlldy5vcGVuZWQge1xyXG5cdFx0XHRcdHZpc2liaWxpdHk6IHZpc2libGU7XHJcblx0XHRcdFx0dHJhbnNmb3JtOiB0cmFuc2xhdGVYKC0yNDBweCk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdCR7dGhpcy5zZXR0aW5ncy5lbGVtZW50fSA+ICNwcmV2aWV3LmNsb3NlZCB7XHJcblx0XHRcdFx0dmlzaWJpbGl0eTogaGlkZGVuO1xyXG5cdFx0XHRcdHRyYW5zZm9ybTogdHJhbnNsYXRlWCg2MHB4KTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0JHt0aGlzLnNldHRpbmdzLmVsZW1lbnR9ID4gI3ByZXZpZXcgPiB1bC5pdGVtcyxcclxuXHRcdFx0JHt0aGlzLnNldHRpbmdzLmVsZW1lbnR9ID4gI3ByZXZpZXcgPiB1bC5pdGVtcyA+IGxpLml0ZW0ge1xyXG5cdFx0XHRcdGNvbG9yOiAjMDAwMDAwO1xyXG5cdFx0XHRcdGxpc3Qtc3R5bGUtdHlwZTogbm9uZTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0JHt0aGlzLnNldHRpbmdzLmVsZW1lbnR9IC5pdGVtcy5sb2FkaW5nIHtcclxuXHRcdFx0XHRkaXNwbGF5OiBub25lO1xyXG5cdFx0XHRcdG92ZXJmbG93LVk6IG5vbmU7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdCR7dGhpcy5zZXR0aW5ncy5lbGVtZW50fSAuY2FydC1sb2FkZXItb3ZlcmxheSB7XHJcblx0XHRcdFx0cG9zaXRpb246IGZpeGVkO1xyXG5cdFx0XHRcdHRvcDogMDsgXHJcblx0XHRcdCAgICBsZWZ0OiAwO1xyXG5cdFx0XHQgICAgcmlnaHQ6IDA7XHJcblx0XHRcdCAgICBib3R0b206IDA7XHJcblx0XHRcdFx0YmFja2dyb3VuZDogI2ZmZmZmZjtcclxuXHRcdFx0XHR3aWR0aDogMTAwJTtcclxuXHRcdFx0XHRoZWlnaHQ6IDEwMCU7XHJcblx0XHRcdFx0bWluLWhlaWdodDogMTAwJTtcclxuXHRcdFx0XHRvdmVyZmxvdzogYXV0bztcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0JHt0aGlzLnNldHRpbmdzLmVsZW1lbnR9IC5jYXJ0LWxvYWRlci1vdmVybGF5IC5jYXJ0LWxvYWRlciB7XHJcblx0XHRcdFx0cG9zaXRpb246IGFic29sdXRlO1xyXG5cdFx0XHRcdHdpZHRoOiA1MHB4O1xyXG5cdFx0XHRcdGhlaWdodDogNTBweDtcclxuXHRcdFx0XHRtYXJnaW4tbGVmdDogLTI1cHg7XHJcblx0XHRcdFx0bWFyZ2luLXRvcDogLTI1cHg7XHJcblx0XHRcdFx0bGVmdDogNTAlO1xyXG5cdFx0XHRcdHJpZ2h0OiA1MCU7XHJcblx0XHRcdFx0dG9wOiA1MCU7XHJcblx0XHRcdFx0Ym90dG9tOiA1MCU7XHJcblx0XHRcdH1cclxuXHRcdGA7XHJcblx0ICAgIFxyXG5cdCAgICBET00uYWRkU3R5bGUoJ2VDb21tZXJjZS1DYXJ0JywgY3NzKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIENyZWF0ZXMgYW4gbG9hZGluZyBvdmVybGF5LlxyXG5cdCAqL1xyXG5cdGxvYWRpbmdPdmVybGF5KClcclxuXHR7XHJcblx0XHRpZiAobG9hZGluZ092ZXJsYXkpIHtcclxuXHRcdFx0cmV0dXJuIGxvYWRpbmdPdmVybGF5O1xyXG5cdFx0fVxyXG5cclxuXHRcdGxldCBsb2FkZXIgPSBET00uY3JlYXRlRWxlbWVudCgnaW1nJywge1xyXG5cdFx0XHRzcmM6IHRoaXMuc2V0dGluZ3MubG9hZGVyLFxyXG5cdFx0XHRjbGFzczogJ2NhcnQtbG9hZGVyJ1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0bG9hZGluZ092ZXJsYXkgPSBET00uY3JlYXRlRWxlbWVudCgnZGl2Jywge1xyXG5cdFx0XHRjbGFzczogJ2NhcnQtbG9hZGVyLW92ZXJsYXknXHJcblx0XHR9KTtcclxuXHJcblx0XHRsb2FkaW5nT3ZlcmxheS5hcHBlbmRDaGlsZChsb2FkZXIpO1xyXG5cclxuXHRcdHJldHVybiBsb2FkaW5nT3ZlcmxheTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIExvYWRpbmcgdGhlIGNhcnQgcHJldmlldy5cclxuXHQgKi9cclxuXHRwcmV2aWV3U3RhcnRMb2FkaW5nKClcclxuXHR7XHJcblx0XHRET00uYWRkQ2xhc3MoaXRlbXNEaXYsICdsb2FkaW5nJyk7XHJcblx0XHR0aGlzLnByZXZpZXdFbGVtZW50LmFwcGVuZENoaWxkKHRoaXMubG9hZGluZ092ZXJsYXkoKSk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBMb2FkaW5nIHRoZSBjYXJ0IHByZXZpZXcuXHJcblx0ICovXHJcblx0cHJldmlld1N0b3BMb2FkaW5nKClcclxuXHR7XHJcblx0XHRpZiAoRE9NLmZpbmQoJy5jYXJ0LWxvYWRlci1vdmVybGF5JywgdGhpcy5wcmV2aWV3RWxlbWVudCkpIHtcclxuXHRcdFx0dGhpcy5wcmV2aWV3RWxlbWVudC5yZW1vdmVDaGlsZCh0aGlzLmxvYWRpbmdPdmVybGF5KCkpO1xyXG5cdFx0XHRET00ucmVtb3ZlQ2xhc3MoaXRlbXNEaXYsICdsb2FkaW5nJyk7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBSZWxvYWRzIHRoZSBpdGVtcyBpbiB0aGUgY2FydCBwcmV2aWV3LlxyXG5cdCAqL1xyXG5cdHJlbG9hZENhcnRQcmV2aWV3KClcclxuXHR7XHJcblx0XHR0aGlzLnByZXZpZXdTdGFydExvYWRpbmcoKTtcclxuXHRcdGxldCBpdGVtcyA9IHRoaXMuZ2V0Q2FydEl0ZW1zKCk7XHJcblx0XHR0aGlzLmFkZFRvUHJldmlldyhpdGVtcyk7XHJcblx0XHRcclxuXHRcdGxldCBpbnN0YW5jZSA9IHRoaXM7XHJcblxyXG5cdFx0c2V0VGltZW91dChmdW5jdGlvbigpIHtcclxuXHRcdFx0aW5zdGFuY2UucHJldmlld1N0b3BMb2FkaW5nLmNhbGwoaW5zdGFuY2UpO1xyXG5cdFx0fSwgMTAwMCk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBCaW5kcyBldmVudCBsaXN0ZW5lcnMgdG8gdGhlIGNhcnQgaWNvbi5cclxuXHQgKi9cclxuXHRiaW5kRXZlbnRMaXN0ZW5lcnMoKVxyXG5cdHtcclxuXHRcdGlmKHRoaXMuc3ZnSWNvbiA9PSBudWxsKSB7XHJcblx0XHRcdHJldHVybjtcclxuXHRcdH1cclxuXHJcblx0XHR0aGlzLnN2Z0ljb24ub25jbGljayA9IGZ1bmN0aW9uKGUpIHtcclxuXHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdFx0XHRsZXQgb3BlbmluZyA9IERPTS50b2dnbGVDbGFzcyh0aGlzLnByZXZpZXdFbGVtZW50LCAnb3BlbmVkJywgJ2Nsb3NlZCcpO1xyXG5cdFx0XHRcclxuXHRcdFx0aWYgKG9wZW5pbmcpIHtcclxuXHRcdFx0XHR0aGlzLnJlbG9hZENhcnRQcmV2aWV3KCk7XHRcclxuXHRcdFx0fVxyXG5cdFx0fS5iaW5kKHRoaXMpO1xyXG5cclxuXHRcdEV2ZW50TWFuYWdlci5zdWJzY3JpYmUoJ1Byb2R1Y3RXYXNBZGRlZCcsIGZ1bmN0aW9uKGF0dHJpYnV0ZXMpIHtcclxuXHRcdFx0bGV0IGNhcnQgPSBDb29raWUuZ2V0KHRoaXMuc2V0dGluZ3MuY29va2llX25hbWUpO1xyXG5cdFx0XHRjYXJ0Lml0ZW1zLnB1c2goYXR0cmlidXRlcyk7XHJcblx0XHRcdENvb2tpZS5zZXQodGhpcy5zZXR0aW5ncy5jb29raWVfbmFtZSwgY2FydCk7XHJcblx0XHRcdHRoaXMucmVsb2FkQ2FydFByZXZpZXcoKTtcclxuXHRcdH0uYmluZCh0aGlzKSk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBSZXRyaWV2ZSB0aGUgY2FydHMgaXRlbXMgZnJvbSB0aGUgY29va2llLlxyXG5cdCAqL1xyXG5cdGdldENhcnRJdGVtcygpXHJcblx0e1xyXG5cdFx0bGV0IGNhcnQgPSBDb29raWUuZ2V0KHRoaXMuc2V0dGluZ3MuY29va2llX25hbWUpO1xyXG5cclxuXHRcdHJldHVybiAoY2FydCkgPyBjYXJ0Lml0ZW1zIDogW107XHJcblx0fVxyXG59XHJcblxyXG5mdW5jdGlvbiBjbG9zZShldmVudCkge1xyXG5cdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcblx0RE9NLnN3aXRjaENsYXNzZXModGhpcy5wcmV2aWV3RWxlbWVudCwgJ29wZW5lZCcsICdjbG9zZWQnKTtcclxufVxyXG5cclxuZnVuY3Rpb24gY3JlYXRlSWNvbigpIHtcclxuXHRsZXQgc3ZnID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKFwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiwgXCJzdmdcIik7XHJcblx0bGV0IGcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50TlMoXCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiLCBcImdcIik7XHJcblx0bGV0IHBhdGggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50TlMoXCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiLCBcInBhdGhcIik7XHJcblxyXG5cdHN2Zy5zZXRBdHRyaWJ1dGUoJ3ZlcnNpb24nLCAnMS4xJyk7XHJcblx0c3ZnLnNldEF0dHJpYnV0ZSgneG1sbnMnLCAnaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnKTtcclxuXHRzdmcuc2V0QXR0cmlidXRlKCd4bWxuczp4bGluaycsICdodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rJyk7XHJcblx0c3ZnLnNldEF0dHJpYnV0ZSgneCcsICcwcHgnKTtcclxuXHRzdmcuc2V0QXR0cmlidXRlKCd5JywgJzBweCcpO1xyXG5cdHN2Zy5zZXRBdHRyaWJ1dGUoJ3dpZHRoJywgJzQ0Ni44NDNweCcpO1xyXG5cdHN2Zy5zZXRBdHRyaWJ1dGUoJ2hlaWdodCcsICc0NDYuODQzcHgnKTtcclxuXHRzdmcuc2V0QXR0cmlidXRlKCd2aWV3Qm94JywgJzAgMCA0NDYuODQzIDQ0Ni44NDMnKTtcclxuXHRzdmcuc2V0QXR0cmlidXRlKCdzdHlsZScsICdlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDQ0Ni44NDMgNDQ2Ljg0MzsnKTtcclxuXHRzdmcuc2V0QXR0cmlidXRlKCd4bWw6c3BhY2UnLCAncHJlc2VydmUnKTtcclxuXHJcblx0cGF0aC5zZXRBdHRyaWJ1dGUoJ2QnLCAnTTQ0NC4wOSw5My4xMDNjLTIuNjk4LTMuNjk5LTcuMDA2LTUuODg4LTExLjU4NC01Ljg4OEgxMDkuOTJjLTAuNjI1LDAtMS4yNDksMC4wMzgtMS44NSwwLjExOWwtMTMuMjc2LTM4LjI3Yy0xLjM3Ni0zLjk1OC00LjQwNi03LjExMy04LjMtOC42NDZMMTkuNTg2LDE0LjEzNGMtNy4zNzQtMi44ODctMTUuNjk1LDAuNzM1LTE4LjU5MSw4LjFjLTIuODkxLDcuMzY5LDAuNzMsMTUuNjk1LDguMSwxOC41OTFsNjAuNzY4LDIzLjg3Mmw3NC4zODEsMjE0LjM5OWMtMy4yODMsMS4xNDQtNi4wNjUsMy42NjMtNy4zMzIsNy4xODdsLTIxLjUwNiw1OS43MzljLTEuMzE4LDMuNjYzLTAuNzc1LDcuNzMzLDEuNDY4LDEwLjkxNmMyLjI0LDMuMTgzLDUuODgzLDUuMDc4LDkuNzczLDUuMDc4aDExLjA0NGMtNi44NDQsNy42MTYtMTEuMDQ0LDE3LjY0Ni0xMS4wNDQsMjguNjc1YzAsMjMuNzE4LDE5LjI5OCw0My4wMTIsNDMuMDEyLDQzLjAxMnM0My4wMTItMTkuMjk0LDQzLjAxMi00My4wMTJjMC0xMS4wMjktNC4yLTIxLjA1OS0xMS4wNDQtMjguNjc1aDkzLjc3NmMtNi44NDcsNy42MTYtMTEuMDQ4LDE3LjY0Ni0xMS4wNDgsMjguNjc1YzAsMjMuNzE4LDE5LjI5NCw0My4wMTIsNDMuMDEzLDQzLjAxMmMyMy43MTgsMCw0My4wMTItMTkuMjk0LDQzLjAxMi00My4wMTJjMC0xMS4wMjktNC4yLTIxLjA1OS0xMS4wNDMtMjguNjc1aDEzLjQzM2M2LjU5OSwwLDExLjk0Ny01LjM0OSwxMS45NDctMTEuOTQ4YzAtNi41OTktNS4zNDktMTEuOTQ3LTExLjk0Ny0xMS45NDdIMTQzLjY0N2wxMy4zMTktMzYuOTk2YzEuNzIsMC43MjQsMy41NzgsMS4xNTIsNS41MjMsMS4xNTJoMjEwLjI3OGM2LjIzNCwwLDExLjc1MS00LjAyNywxMy42NS05Ljk1OWw1OS43MzktMTg2LjM4N0M0NDcuNTU3LDEwMS41NjcsNDQ2Ljc4OCw5Ni44MDIsNDQ0LjA5LDkzLjEwM3ogTTE2OS42NTksNDA5LjgwN2MtMTAuNTQzLDAtMTkuMTE2LTguNTczLTE5LjExNi0xOS4xMTZzOC41NzMtMTkuMTE3LDE5LjExNi0xOS4xMTdzMTkuMTE2LDguNTc0LDE5LjExNiwxOS4xMTdTMTgwLjIwMiw0MDkuODA3LDE2OS42NTksNDA5LjgwN3ogTTMyNy4zNjcsNDA5LjgwN2MtMTAuNTQzLDAtMTkuMTE3LTguNTczLTE5LjExNy0xOS4xMTZzOC41NzQtMTkuMTE3LDE5LjExNy0xOS4xMTdjMTAuNTQyLDAsMTkuMTE2LDguNTc0LDE5LjExNiwxOS4xMTdTMzM3LjkwOSw0MDkuODA3LDMyNy4zNjcsNDA5LjgwN3ogTTQwMi41MiwxNDguMTQ5aC03My4xNjFWMTE1Ljg5aDgzLjQ5OUw0MDIuNTIsMTQ4LjE0OXogTTM4MS40NTMsMjEzLjg2MWgtNTIuMDk0di0zNy4wMzhoNjMuOTY3TDM4MS40NTMsMjEzLjg2MXogTTIzNC41NzEsMjEzLjg2MXYtMzcuMDM4aDY2LjExM3YzNy4wMzhIMjM0LjU3MXogTTMwMC42ODQsMjQyLjUzOHYzMS4wNjRoLTY2LjExM3YtMzEuMDY0SDMwMC42ODR6IE0xMzkuMTE1LDE3Ni44MjNoNjYuNzg0djM3LjAzOGgtNTMuOTMzTDEzOS4xMTUsMTc2LjgyM3ogTTIzNC41NzEsMTQ4LjE0OVYxMTUuODloNjYuMTEzdjMyLjI1OUgyMzQuNTcxeiBNMjA1Ljg5OCwxMTUuODl2MzIuMjU5aC03Ni43MzRsLTExLjE5MS0zMi4yNTlIMjA1Ljg5OHogTTE2MS45MTYsMjQyLjUzOGg0My45ODJ2MzEuMDY0aC0zMy4yMDZMMTYxLjkxNiwyNDIuNTM4eiBNMzI5LjM1OSwyNzMuNjAzdi0zMS4wNjRoNDIuOTA5bC05Ljk1NSwzMS4wNjRIMzI5LjM1OXonKTtcclxuXHJcblx0Zy5hcHBlbmRDaGlsZChwYXRoKTtcclxuXHRzdmcuYXBwZW5kQ2hpbGQoZyk7XHJcblxyXG5cdHJldHVybiBzdmc7XHJcbn1cblxuLyoqXHJcbiAqIFRoZSBkZWZhdWx0IHNldHRpbmdzIG9mIHRoZSBmaWx0ZXIuXHJcbiAqL1xyXG5sZXQgZGVmYXVsdFNldHRpbmdzJDMgPSB7XHJcblx0ZWxlbWVudDogJy5maWx0ZXInLFxyXG5cdGRhdGE6IHt9LFxyXG5cdGNsYXNzOiAnJyxcclxuXHR3aWR0aDogJycsXHJcblx0aGVpZ2h0OiAnJyxcclxufTtcclxuXHJcbi8qKlxyXG4gKiBTdG9yZXMgdGhlIGNvbnRhaW5lciBvYmplY3QuXHJcbiAqL1xyXG5sZXQgQ29udGFpbmVyJDM7XHJcblxyXG4vKipcclxuICogVGhlIEZpbHRlciBPYmplY3QsIGhhbmRsZXMgdGhlIGZpbHRlciBvZiB0aGUgcHJvZHVjdHMvc2VydmljZXMuXHJcbiAqL1xyXG5jbGFzcyBGaWx0ZXIgXHJcbntcclxuXHRjb25zdHJ1Y3Rvcihjb250YWluZXIpIFxyXG5cdHtcclxuXHRcdENvbnRhaW5lciQzID0gY29udGFpbmVyO1xyXG5cdH1cclxuXHJcblx0c2V0dXAoc2V0dGluZ3MpXHJcblx0e1xyXG5cdFx0aWYodHlwZW9mIHNldHRpbmdzICE9ICdvYmplY3QnKSB7XHJcblx0XHRcdHRocm93IG5ldyBJbnZhbGlkQXJndW1lbnRFeGNlcHRpb24kMTtcclxuXHRcdH1cclxuXHJcblx0XHR0aGlzLnNldHRpbmdzID0gQ29tbW9uLmV4dGVuZChkZWZhdWx0U2V0dGluZ3MkMywgc2V0dGluZ3MpO1xyXG5cclxuXHRcdHRoaXMuc2V0RWxlbWVudCh0aGlzLnNldHRpbmdzLmVsZW1lbnQpO1xyXG5cdH1cclxuXHJcblx0c2V0RWxlbWVudChzZWxlY3RvcilcclxuXHR7XHJcblx0XHR0aGlzLndyYXBwZXIgPSBET00uZmluZChzZWxlY3Rvcik7XHJcblx0XHRcclxuXHRcdERPTS5hZGRDbGFzcyh0aGlzLndyYXBwZXIsIHRoaXMuc2V0dGluZ3MuY2xhc3MpO1xyXG5cdH1cclxufVxuXG4vKipcclxuICogVGhlIGRlZmF1bHQgc2V0dGluZ3Mgb2YgZWFjaCBwcm9kdWN0LlxyXG4gKi9cclxubGV0IGRlZmF1bHRTZXR0aW5ncyQ0ID0ge1xyXG5cdGVsZW1lbnQ6ICcucHJvZHVjdHMnLFxyXG5cdGNsYXNzOiAnJyxcclxuXHRpdGVtX2NsYXNzOiAnJyxcclxuXHRhZGRfYnV0dG9uX2NsYXNzOiAnYnRuIGJ0bi1wcmltYXJ5JyxcclxuXHRmYXZvcml0ZV9idXR0b25fY2xhc3M6ICdidG4gYnRuLWRhbmdlcicsXHJcblx0d2lkdGg6ICcyMDBweCcsXHJcblx0aGVpZ2h0OiAnMjUwcHgnLFxyXG5cdGF0dHJpYnV0ZXM6IFsnbmFtZScsICdwcmljZScsICdkZWxpdmVyeVRpbWUnLCAnaW1hZ2UnXSxcclxuXHR1cmw6ICdwcm9kdWN0cy5waHAnLFxyXG59O1xyXG5cclxuLyoqXHJcbiAqIFN0b3JlcyB0aGUgY29udGFpbmVyIG9iamVjdC5cclxuICogXHJcbiAqIEB2YXIgXFxDb3JlXFxDb250YWluZXJcclxuICovXHJcbmxldCBDb250YWluZXIkNDtcclxuXHJcbi8qKlxyXG4gKiBTdG9yZXMgdGhlIHJlcXVlc3Qgb2JqZWN0LlxyXG4gKiBcclxuICogQHZhciBcXEhlbHBlclxcUmVxdWVzdCBcclxuICovXHJcbmxldCBIdHRwJDE7XHJcblxyXG4vKipcclxuICogVGhlIFByb2R1Y3RzIE9iamVjdCwgaGFuZGxlcyB0aGUgcHJvZHVjdHMuXHJcbiAqL1xyXG5jbGFzcyBQcm9kdWN0cyBcclxue1xyXG5cdC8qKlxyXG5cdCAqIEluaXRhbGl6ZSB0aGUgQ29udGFpbmVyLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIFxcQ29yZVxcQ29udGFpbmVyIHwgY29udGFpbmVyXHJcblx0ICogQHBhcmFtIFxcSGVscGVyc1xcUmVxdWVzdCB8IGh0dHBcclxuXHQgKiBAcmV0dXJuIHZvaWRcclxuXHQgKi9cclxuXHRjb25zdHJ1Y3Rvcihjb250YWluZXIsIGh0dHApIFxyXG5cdHtcclxuXHRcdENvbnRhaW5lciQ0ID0gY29udGFpbmVyO1xyXG5cdFx0SHR0cCQxID0gaHR0cDtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFNldHMgdGhlIGdpdmVuIHNldHRpbmdzIGZyb20gdGhlIHVzZXIuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gb2JqZWN0IHwgc2V0dGluZ3NcclxuXHQgKiBAcmV0dXJuIHZvaWRcclxuXHQgKi9cclxuXHRzZXR1cChzZXR0aW5ncylcclxuXHR7XHJcblx0XHRkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgZnVuY3Rpb24oKSB7XHJcblx0XHRcdFxyXG5cdFx0aWYgKHR5cGVvZiBzZXR0aW5ncyAhPSAnb2JqZWN0Jykge1xyXG5cdFx0XHR0aHJvdyBuZXcgSW52YWxpZEFyZ3VtZW50RXhjZXB0aW9uJDE7XHJcblx0XHR9XHJcblxyXG5cdFx0dGhpcy5zZXR0aW5ncyA9IENvbW1vbi5leHRlbmQoZGVmYXVsdFNldHRpbmdzJDQsIHNldHRpbmdzKTtcclxuXHJcblx0XHR0aGlzLnNldEVsZW1lbnQodGhpcy5zZXR0aW5ncy5lbGVtZW50KTtcclxuXHJcblx0XHR0aGlzLmFkZFN0eWxlVGFnKCk7XHRcclxuXHRcdFxyXG5cdFx0aWYgKENvbnRhaW5lciQ0LlBhZ2luYXRpb24gJiYgQ29udGFpbmVyJDQuUGFnaW5hdGlvbi5ib290ZWQpIHtcclxuXHRcdFx0dGhpcy5sb2FkUGFnZVByb2R1Y3RzKCk7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHR0aGlzLmxvYWRBbGxQcm9kdWN0cygpO1xyXG5cdFx0fVxyXG5cclxuXHRcdH0uYmluZCh0aGlzKSk7XHJcblx0fVxyXG5cclxuXHRsb2FkUGFnZVByb2R1Y3RzKClcclxuXHR7XHJcblx0XHRsZXQgcmVxdWVzdCA9IHRoaXMuZ2V0UHJvZHVjdHMoMSk7XHJcblxyXG5cdFx0cmVxdWVzdC50aGVuKGZ1bmN0aW9uKHByb2R1Y3RzKSB7XHJcblx0XHRcdHRoaXMuY3VycmVudEl0ZW1zID0gcHJvZHVjdHM7XHJcblxyXG5cdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuY3VycmVudEl0ZW1zLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdFx0dmFyIHByb2R1Y3QgPSB0aGlzLmN1cnJlbnRJdGVtc1tpXTtcclxuXHRcdFx0XHRFdmVudE1hbmFnZXIucHVibGlzaCgnQWZ0ZXJMb2FkZWQnLCBwcm9kdWN0KTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0RXZlbnRNYW5hZ2VyLnB1Ymxpc2goJ1Byb2R1Y3RzV2VyZUZldGNoZWQnLCBwcm9kdWN0cyk7XHJcblx0XHRcdHRoaXMucmVwbGFjZUl0ZW1zKHByb2R1Y3RzKTtcclxuXHRcdH0uYmluZCh0aGlzKSkuY2F0Y2goZnVuY3Rpb24oZXJyb3IpIHtcclxuXHJcblx0XHR9KTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIExvYWRzIHRoZSBwcm9kdWN0cyBhbmQgXHJcblx0ICogcmVwbGFjZSB0aGVtIGluIHRoZSBkaXYgY29udGFpbmVyLlxyXG5cdCAqXHJcblx0ICogQHJldHVybiB2b2lkXHJcblx0ICovXHJcblx0bG9hZEFsbFByb2R1Y3RzKClcclxuXHR7XHJcblx0XHRsZXQgcmVxdWVzdCA9IHRoaXMuZ2V0UHJvZHVjdHMoKTtcclxuXHRcdFx0XHJcblx0XHRyZXF1ZXN0LnRoZW4oZnVuY3Rpb24ocHJvZHVjdHMpIHtcclxuXHRcdFx0dGhpcy5jdXJyZW50SXRlbXMgPSBwcm9kdWN0cztcclxuXHJcblx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5jdXJyZW50SXRlbXMubGVuZ3RoOyBpKyspIHtcclxuXHRcdFx0XHR2YXIgcHJvZHVjdCA9IHRoaXMuY3VycmVudEl0ZW1zW2ldO1xyXG5cdFx0XHRcdEV2ZW50TWFuYWdlci5wdWJsaXNoKCdBZnRlckxvYWRlZCcsIHByb2R1Y3QpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRFdmVudE1hbmFnZXIucHVibGlzaCgnUHJvZHVjdHNXZXJlRmV0Y2hlZCcsIHByb2R1Y3RzKTtcclxuXHRcdFx0dGhpcy5yZXBsYWNlSXRlbXMocHJvZHVjdHMpO1xyXG5cdFx0fS5iaW5kKHRoaXMpKS5jYXRjaChmdW5jdGlvbihlcnJvcikge1xyXG5cclxuXHRcdH0pO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogU2V0cyB0aGUgRE9NIGVsZW1lbnQgXHJcblx0ICogZm9yIHBvcHVsYXRpbmcgdGhlIHByb2R1Y3RzLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIHN0cmluZyB8IHNlbGVjdG9yXHJcblx0ICogQHJldHVybiB2b2lkXHJcblx0ICovXHJcblx0c2V0RWxlbWVudChzZWxlY3RvcilcclxuXHR7XHJcblx0XHR0aGlzLndyYXBwZXIgPSBET00uZmluZChzZWxlY3Rvcik7XHJcblxyXG5cdFx0aWYgKHRoaXMud3JhcHBlcikge1xyXG5cdFx0XHRET00uYWRkQ2xhc3ModGhpcy53cmFwcGVyLCB0aGlzLnNldHRpbmdzLmNsYXNzKTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFJlcGxhY2UgaXRlbXMgaW4gXHJcblx0ICogdGhlIHByb2R1Y3RzIGNvbnRhaW5lci5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSBhcnJheSB8IGl0ZW1zXHJcblx0ICogQHJldHVybiBhcnJheVxyXG5cdCAqL1xyXG5cdHJlcGxhY2VJdGVtcyhpdGVtcykgXHJcblx0e1xyXG5cdFx0aWYgKCEgQXJyYXkuaXNBcnJheShpdGVtcykgfHwgKGl0ZW1zLmxlbmd0aCA8PSAwICYmIHR5cGVvZiBpdGVtc1swXSA9PSAnc3RyaW5nJykpIHtcclxuXHRcdFx0dGhyb3cgbmV3IEludmFsaWRBcmd1bWVudEV4Y2VwdGlvbiQxO1xyXG5cdFx0fVxyXG5cclxuXHRcdGxldCBwcm9kdWN0cyA9IHRoaXMuYnVpbGRQcm9kdWN0cyhpdGVtcywgdGhpcy5zZXR0aW5ncy5pdGVtX2NsYXNzLCAnZGl2Jyk7XHJcblxyXG5cdFx0dGhpcy53cmFwcGVyLmlubmVySFRNTCA9ICcnO1xyXG5cdFx0cHJvZHVjdHMuZm9yRWFjaChmdW5jdGlvbihwcm9kdWN0KSB7XHJcblx0XHRcdHRoaXMud3JhcHBlci5hcHBlbmRDaGlsZChwcm9kdWN0KTtcclxuXHRcdH0uYmluZCh0aGlzKSk7XHJcblxyXG5cdFx0cmV0dXJuIGl0ZW1zO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogTWFrZXMgYW4gQWpheCBjYWxsIHRvIHRoZSBcclxuXHQgKiBzZXJ2ZXIgd2l0aG91dCBwYXJhbWV0ZXJzLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIGludGVnZXIgfCBwYWdlTnVtYmVyXHJcblx0ICogQHJldHVybiBQcm9taXNlXHJcblx0ICovXHJcblx0Z2V0UHJvZHVjdHMocGFnZU51bWJlciA9IDEpXHJcblx0e1xyXG5cdFx0bGV0IGFjdGlvbiA9IChwYWdlTnVtYmVyKSA/IHRoaXMuc2V0dGluZ3MudXJsICsgJz9wYWdlPScgKyBwYWdlTnVtYmVyIDogdGhpcy5zZXR0aW5ncy51cmw7XHJcblxyXG5cdFx0cmV0dXJuIEh0dHAkMS5nZXQoe1xyXG5cdFx0XHR1cmw6IGFjdGlvbixcclxuXHRcdH0pO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQnVpbGRzIHRoZSBodG1sIGZvciB0aGUgcHJvZHVjdHMuXHJcblx0ICogXHJcblx0ICogQHBhcmFtIGFycmF5IHwgYXR0cmlidXRlc0NvbGxlY3Rpb25cclxuXHQgKiBAcGFyYW0gc3RyaW5nIHwgY2xhc3NOYW1lXHJcblx0ICogQHBhcmFtIHN0cmluZyB8IHRhZ1R5cGVcclxuXHQgKiBAcmV0dXJuIGFycmF5XHJcblx0ICovXHJcblx0YnVpbGRQcm9kdWN0cyhhdHRyaWJ1dGVzQ29sbGVjdGlvbiwgY2xhc3NOYW1lLCB0YWdUeXBlKSBcclxuXHR7XHJcblx0XHRpZihhdHRyaWJ1dGVzQ29sbGVjdGlvbi5jb25zdHJ1Y3Rvci5uYW1lICE9ICdBcnJheScgKSB7XHJcblx0XHRcdHRocm93IG5ldyBJbnZhbGlkQXJndW1lbnRFeGNlcHRpb24kMTtcclxuXHRcdH1cclxuXHJcblx0XHRsZXQgYnVpbHRQcm9kdWN0cyA9IFtdO1xyXG5cclxuXHRcdGF0dHJpYnV0ZXNDb2xsZWN0aW9uLmZvckVhY2goZnVuY3Rpb24oYXR0cmlidXRlcykge1xyXG5cdFx0XHRsZXQgYnVpbHRQcm9kdWN0ID0gdGhpcy5idWlsZFByb2R1Y3QoYXR0cmlidXRlcywgY2xhc3NOYW1lLCB0YWdUeXBlKTtcclxuXHRcdFx0YnVpbHRQcm9kdWN0cy5wdXNoKGJ1aWx0UHJvZHVjdCk7XHJcblx0XHR9LmJpbmQodGhpcykpO1xyXG5cclxuXHRcdHJldHVybiBidWlsdFByb2R1Y3RzO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQnVpbGRzIHRoZSBodG1sIGZvciBhIHNpbmdsZSBwcm9kdWN0LlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIG9iamVjdCB8IGF0dHJpYnV0ZXNcclxuXHQgKiBAcGFyYW0gc3RyaW5nIHwgY2xhc3NOYW1lXHJcblx0ICogQHBhcmFtIHN0cmluZyB8IHRhZ1R5cGVcclxuXHQgKiBAcmV0dXJuIG9iamVjdFxyXG5cdCAqL1xyXG5cdGJ1aWxkUHJvZHVjdChhdHRyaWJ1dGVzLCBjbGFzc05hbWUsIHRhZ1R5cGUpIFxyXG5cdHtcclxuXHRcdGlmICh0eXBlb2YgYXR0cmlidXRlcyAhPSAnb2JqZWN0JyB8fCB0eXBlb2YgdGFnVHlwZSAhPSAnc3RyaW5nJykge1xyXG5cdFx0XHR0aHJvdyBuZXcgSW52YWxpZEFyZ3VtZW50RXhjZXB0aW9uJDE7XHJcblx0XHR9XHJcblxyXG5cdFx0Y2xhc3NOYW1lID0gY2xhc3NOYW1lIHx8IG51bGw7XHJcblxyXG5cdFx0bGV0IHByb2R1Y3QgPSBET00uY3JlYXRlRWxlbWVudCgnZGl2Jywge1xyXG5cdFx0XHRjbGFzczogJ3Byb2R1Y3QnXHJcblx0XHR9KTtcclxuXHJcblx0XHRET00uYWRkQ2xhc3MocHJvZHVjdCwgY2xhc3NOYW1lKTtcclxuXHJcblx0XHRsZXQgb3ZlcmxheSA9IERPTS5jcmVhdGVFbGVtZW50KCdkaXYnLCB7XHJcblx0XHRcdGNsYXNzOiAncHJvZHVjdC1vdmVybGF5JyxcclxuXHRcdH0pO1xyXG5cclxuXHRcdHByb2R1Y3QuYXBwZW5kQ2hpbGQob3ZlcmxheSk7XHJcblxyXG5cdFx0Zm9yICh2YXIgYXR0cmlidXRlIGluIGF0dHJpYnV0ZXMpIHtcclxuXHRcdFx0aWYgKCEgQ29tbW9uLmluX2FycmF5KGF0dHJpYnV0ZSwgdGhpcy5zZXR0aW5ncy5hdHRyaWJ1dGVzKSkge1xyXG5cdFx0XHRcdGNvbnRpbnVlO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRsZXQgdGFnID0gRE9NLmNyZWF0ZUVsZW1lbnQodGFnVHlwZSk7XHJcblxyXG5cdFx0XHRpZiAoYXR0cmlidXRlID09ICdpbWFnZScpIHtcclxuXHRcdFx0XHRsZXQgaW1hZ2UgPSBET00uY3JlYXRlRWxlbWVudCgnaW1nJywge1xyXG5cdFx0XHRcdFx0c3JjOiBhdHRyaWJ1dGVzW2F0dHJpYnV0ZV1cclxuXHRcdFx0XHR9KTtcclxuXHRcdFx0XHRwcm9kdWN0LmFwcGVuZENoaWxkKGltYWdlKTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHR0YWcuaW5uZXJIVE1MID0gYXR0cmlidXRlc1thdHRyaWJ1dGVdIHx8ICcnO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRET00uYWRkQ2xhc3ModGFnLCAncHJvZHVjdC0nICsgU3RyLmtlYmFiQ2FzZShhdHRyaWJ1dGUpKTtcclxuXHRcdFx0b3ZlcmxheS5hcHBlbmRDaGlsZCh0YWcpO1xyXG5cdFx0fVxyXG5cclxuXHRcdGxldCB0YWcgPSBET00uY3JlYXRlRWxlbWVudCgnZGl2Jywge1xyXG5cdFx0XHRpZDogJ2FjdGlvbkJ1dHRvbnMnLFxyXG5cdFx0XHRjbGFzczogJ2FjdGlvbi1idXR0b25zJ1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0bGV0IGFkZFRvQ2FydCA9IERPTS5jcmVhdGVFbGVtZW50KCdidXR0b24nLCB7XHJcblx0XHRcdGlkOiAnYWRkVG9DYXJ0JyxcclxuXHRcdFx0Y2xhc3M6IHRoaXMuc2V0dGluZ3MuYWRkX2J1dHRvbl9jbGFzcyxcclxuXHRcdFx0dHlwZTogJ2J1dHRvbicsXHJcblx0XHRcdHRleHQ6ICcrJyxcclxuXHRcdH0pO1xyXG5cclxuXHRcdGxldCBmYXZvcml0ZSA9IERPTS5jcmVhdGVFbGVtZW50KCdidXR0b24nLCB7XHJcblx0XHRcdGlkOiAnZmF2b3JpdGUnLFxyXG5cdFx0XHRjbGFzczogdGhpcy5zZXR0aW5ncy5mYXZvcml0ZV9idXR0b25fY2xhc3MsXHJcblx0XHRcdHR5cGU6ICdidXR0b24nLFxyXG5cdFx0XHR0ZXh0OiAnJmhlYXJ0czsnXHJcblx0XHR9KTtcclxuXHJcblx0XHR0YWcuYXBwZW5kQ2hpbGQoYWRkVG9DYXJ0KTtcclxuXHRcdHRhZy5hcHBlbmRDaGlsZChmYXZvcml0ZSk7XHJcblxyXG5cdFx0YWRkVG9DYXJ0LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xyXG5cdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XHJcblx0XHRcdEV2ZW50TWFuYWdlci5wdWJsaXNoKCdQcm9kdWN0V2FzQWRkZWQnLCBhdHRyaWJ1dGVzKTtcclxuXHRcdH0pO1xyXG5cclxuXHRcdG92ZXJsYXkuYXBwZW5kQ2hpbGQodGFnKTtcclxuXHJcblx0XHRyZXR1cm4gcHJvZHVjdDtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEFkZCB0aGUgZUNvbW1lcmNlIHN0eWxlIHRhZ3MgdG8gdGhlIERPTS5cclxuXHQgKi9cclxuXHRhZGRTdHlsZVRhZygpIFxyXG5cdHtcclxuXHRcdGlmKERPTS5maW5kKCcjZUNvbW1lcmNlLVByb2R1Y3RzJykpIHtcclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0fVxyXG5cclxuXHRcdGxldCBjc3MgPSBgXHJcblx0XHRcdC5wcm9kdWN0IHtcclxuXHRcdFx0XHRwb3NpdGlvbjogcmVsYXRpdmU7XHJcblx0XHRcdFx0bWFyZ2luOiA1cHggNXB4O1xyXG5cdFx0XHRcdGJvcmRlcjogMXB4IHNvbGlkICNlNGU0ZTQ7XHJcblx0XHRcdFx0d2lkdGg6ICR7dGhpcy5zZXR0aW5ncy53aWR0aH07XHJcblx0XHRcdFx0aGVpZ2h0OiAke3RoaXMuc2V0dGluZ3MuaGVpZ2h0fTtcclxuXHRcdFx0XHRjdXJzb3I6IHBvaW50ZXI7XHJcblx0XHRcdFx0Y29sb3I6ICNmZmZmZmY7XHJcblx0XHRcdFx0b3ZlcmZsb3c6IGhpZGRlbjtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0LnByb2R1Y3QgPiAucHJvZHVjdC1vdmVybGF5IHtcclxuXHRcdFx0XHRwb3NpdGlvbjogYWJzb2x1dGU7XHJcblx0XHRcdFx0dG9wOiAwO1xyXG5cdFx0XHRcdGxlZnQ6IDA7XHJcblx0XHRcdFx0d2lkdGg6IDEwMCU7XHJcblx0XHRcdFx0aGVpZ2h0OiAxMDAlO1xyXG5cdFx0XHRcdG9wYWNpdHk6IDAuNTtcclxuXHRcdFx0XHR6LWluZGV4OiA1O1xyXG5cdFx0XHRcdHRyYW5zaXRpb246IDFzIGFsbDtcclxuXHRcdFx0XHR0cmFuc2Zvcm06IHRyYW5zbGF0ZVgoLTI1MHB4KTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0LnByb2R1Y3Q6aG92ZXIgPiAucHJvZHVjdC1vdmVybGF5IHtcclxuXHRcdFx0XHRiYWNrZ3JvdW5kOiByZ2JhKDAsIDAsIDAsIDAuNDUpO1xyXG5cdFx0XHRcdHRyYW5zZm9ybTogdHJhbnNsYXRlWCgwcHgpO1xyXG5cdFx0XHRcdG9wYWNpdHk6IDE7XHJcblx0XHRcdFx0dHJhbnNpdGlvbjogMXMgYWxsO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHQucHJvZHVjdCA+IGltZyB7XHJcblx0XHRcdFx0cG9zaXRpb246IGFic29sdXRlO1xyXG5cdFx0XHRcdGxlZnQ6IDA7XHJcblx0XHRcdFx0dG9wOiAwO1xyXG5cdFx0XHRcdHdpZHRoOiAxMDAlO1xyXG5cdFx0XHRcdGhlaWdodDogMTAwJTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0LnByb2R1Y3QgPiAucHJvZHVjdC1pbWFnZSB7XHJcblx0XHRcdFx0ei1pbmRleDogMDtcclxuXHRcdFx0XHRwb3NpdGlvbjogYWJzb2x1dGU7XHJcblx0XHRcdFx0dG9wOiAwO1xyXG5cdFx0XHRcdGxlZnQ6IDA7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdC5wcm9kdWN0ID4gLnByb2R1Y3Qtb3ZlcmxheSA+IC5wcm9kdWN0LW5hbWUsIFxyXG5cdFx0XHQucHJvZHVjdCA+IC5wcm9kdWN0LW92ZXJsYXkgPiAucHJvZHVjdC1wcmljZSxcclxuXHRcdFx0LnByb2R1Y3QgPiAucHJvZHVjdC1vdmVybGF5ID4gLnByb2R1Y3QtZGVsaXZlcnktdGltZSB7XHJcblx0XHRcdFx0ei1pbmRleDogMTtcclxuXHRcdFx0XHRwb3NpdGlvbjogcmVsYXRpdmU7XHJcblx0XHRcdFx0dGV4dC1hbGlnbjogY2VudGVyO1xyXG5cdFx0XHRcdG1hcmdpbi10b3A6IDI1cHg7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdC5wcm9kdWN0ID4gLnByb2R1Y3Qtb3ZlcmxheSA+IC5hY3Rpb24tYnV0dG9ucyB7XHJcblx0XHRcdFx0d2lkdGg6IDEwMCU7XHJcblx0XHRcdFx0bWFyZ2luLXRvcDogMTBweDtcclxuXHRcdFx0XHR0ZXh0LWFsaWduOiBjZW50ZXI7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdC5wcm9kdWN0ID4gLnByb2R1Y3Qtb3ZlcmxheSA+IC5hY3Rpb24tYnV0dG9ucyA+ICNmYXZvcml0ZSB7XHJcblx0XHRcdFx0bWFyZ2luLWxlZnQ6IDEwcHg7XHJcblx0XHRcdH1cclxuXHJcblx0XHRgO1xyXG5cdCAgICBcclxuXHQgICAgRE9NLmFkZFN0eWxlKCdlQ29tbWVyY2UtUHJvZHVjdHMnLCBjc3MpO1xyXG5cdH1cclxufVxuXG4vKipcclxuICogVGhlIFNlcnZpY2VzIE9iamVjdCwgaGFuZGxlcyB0aGUgc2VydmljZXMuXHJcbiAqL1xyXG5jbGFzcyBTZXJ2aWNlcyBcclxue1xyXG5cclxufVxuXG4vKipcclxuICogVGhlIGRlZmF1bHQgc2V0dGluZ3Mgb2YgdGhlIHBhZ2luYXRpb24uXHJcbiAqL1xyXG5sZXQgZGVmYXVsdFNldHRpbmdzJDUgPSB7XHJcblx0ZWxlbWVudDogJy5wYWdpbmF0aW9uLWxpbmtzJyxcclxuXHRjbGFzczogJycsXHJcblx0cGVyX3BhZ2U6IDUsXHJcblx0dG90YWxfaXRlbXM6IDEwLFxyXG59O1xyXG5cclxuLyoqXHJcbiAqIFN0b3JlcyB0aGUgY29udGFpbmVyIG9iamVjdC5cclxuICovXHJcbmxldCBDb250YWluZXIkNTtcclxuXHJcbi8qKlxyXG4gKiBTdG9yZXMgdGhlIHByb2R1Y3RzIGNvbXBvbmVudC5cclxuICovXHJcbmxldCBQcm9kdWN0cyQyO1xyXG5cclxuLyoqXHJcbiAqIFRoZSBQYWdpbmF0aW9uIE9iamVjdCwgaGFuZGxlcyB0aGUgcGFnaW5hdGlvbi5cclxuICovXHJcbmNsYXNzIFBhZ2luYXRpb24gXHJcbntcclxuXHQvKipcclxuXHQgKiBJbml0aWFsaXplIHRoZSBjb250YWluZXIgb2JqZWN0IGFuZCB0aGUgZGVmYXVsdCBzZXR0aW5ncy5cclxuXHQgKi9cclxuXHRjb25zdHJ1Y3Rvcihjb250YWluZXIsIHByb2R1Y3RzKSBcclxuXHR7XHJcblx0XHR0aGlzLnNldEN1cnJlbnQoMSk7XHJcblx0XHRDb250YWluZXIkNSA9IGNvbnRhaW5lcjtcclxuXHRcdFByb2R1Y3RzJDIgPSBwcm9kdWN0cztcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFNldCB0aGUgUGFnaW5hdGlvbiBvYmplY3QgdXAuXHJcblx0ICovXHJcblx0c2V0dXAoc2V0dGluZ3MpXHJcblx0e1xyXG5cdFx0ZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsIGZ1bmN0aW9uKCkge1xyXG5cclxuXHRcdGlmKHR5cGVvZiBzZXR0aW5ncyAhPSAnb2JqZWN0Jykge1xyXG5cdFx0XHR0aHJvdyBuZXcgSW52YWxpZEFyZ3VtZW50RXhjZXB0aW9uJDE7XHJcblx0XHR9XHJcblxyXG5cdFx0dGhpcy5zZXR0aW5ncyA9IENvbW1vbi5leHRlbmQoZGVmYXVsdFNldHRpbmdzJDUsIHNldHRpbmdzKTtcclxuXHJcblx0XHR0aGlzLnRvdGFsUGFnZXMgPSB0aGlzLmNhbGN1bGF0ZVRvdGFsUGFnZXModGhpcy5zZXR0aW5ncy5wZXJfcGFnZSwgdGhpcy5zZXR0aW5ncy50b3RhbF9pdGVtcyk7XHJcblx0XHRcclxuXHRcdHRoaXMuc2V0RWxlbWVudCh0aGlzLnNldHRpbmdzLmVsZW1lbnQpO1xyXG5cdFx0dGhpcy5yZXBsYWNlTGlua3ModGhpcy5saW5rcyk7XHJcblxyXG5cdFx0fS5iaW5kKHRoaXMpKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFNldHMgdGhlIHdyYXBwZXIgZWxlbWVudC5cclxuXHQgKi9cclxuXHRzZXRFbGVtZW50KHNlbGVjdG9yKVxyXG5cdHtcclxuXHRcdHRoaXMud3JhcHBlciA9IERPTS5maW5kKHNlbGVjdG9yKTtcclxuXHRcdFxyXG5cdFx0RE9NLmFkZENsYXNzKHRoaXMud3JhcHBlciwgdGhpcy5zZXR0aW5ncy5jbGFzcyk7XHJcblxyXG5cdFx0dGhpcy5saW5rcyA9IHRoaXMuY3JlYXRlTGlua3MoKTtcclxuXHRcdHRoaXMuYmluZEV2ZW50TGlzdGVuZXJzKHRoaXMubGlua3MpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogUmVwbGFjZXMgdGhlIGxpbmtzIGluIHRoZSB3cmFwcGVyLlxyXG5cdCAqL1xyXG5cdHJlcGxhY2VMaW5rcyhsaW5rcylcclxuXHR7XHJcblx0XHR0aGlzLndyYXBwZXIuaW5uZXJIVE1MID0gJyc7XHJcblx0XHR0aGlzLndyYXBwZXIuYXBwZW5kQ2hpbGQobGlua3MpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQ2FsY3VsYXRlcyB0aGUgdG90YWwgcGFnZXMuXHJcblx0ICovXHJcblx0Y2FsY3VsYXRlVG90YWxQYWdlcyhwZXJQYWdlLCB0b3RhbEl0ZW1zKVxyXG5cdHtcclxuXHRcdHBlclBhZ2UgPSBwYXJzZUludChwZXJQYWdlKTtcclxuXHRcdHRvdGFsSXRlbXMgPSBwYXJzZUludCh0b3RhbEl0ZW1zKTtcclxuXHJcblx0XHRyZXR1cm4gTWF0aC5jZWlsKHRvdGFsSXRlbXMgLyBwZXJQYWdlKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEJpbmRzIHRoZSBidXR0b25zIGV2ZW50cyBsaXN0ZW5lcnMuXHJcblx0ICovXHJcblx0YmluZEV2ZW50TGlzdGVuZXJzKGxpbmtzKSBcclxuXHR7XHJcblx0XHRsZXQgaW5zdGFuY2UgPSB0aGlzO1xyXG5cclxuXHRcdHRoaXMubmV4dC5jaGlsZE5vZGVzWzBdLm9uY2xpY2sgPSBmdW5jdGlvbihlKSB7XHJcblx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcclxuXHJcblx0XHRcdGxldCByZXF1ZXN0ZWRQYWdlID0gaW5zdGFuY2UuY3VycmVudCsxO1xyXG5cclxuXHRcdFx0aWYgKGluc3RhbmNlLm5vdEluUGFnZVJhbmdlKHJlcXVlc3RlZFBhZ2UpKSB7XHJcblx0XHRcdFx0dGhyb3cgbmV3IE5vdEluUGFnZVJhbmdlRXhjZXB0aW9uO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRQcm9kdWN0cyQyLmdldFByb2R1Y3RzKHJlcXVlc3RlZFBhZ2UpLnRoZW4oZnVuY3Rpb24ocHJvZHVjdHMpIHtcclxuXHRcdFx0XHRQcm9kdWN0cyQyLnJlcGxhY2VJdGVtcyhwcm9kdWN0cyk7XHJcblx0XHRcdH0pO1xyXG5cclxuXHRcdFx0aW5zdGFuY2Uuc2V0Q3VycmVudChyZXF1ZXN0ZWRQYWdlKTtcclxuXHRcdH07XHJcblxyXG5cdFx0dGhpcy5wcmV2aW91cy5jaGlsZE5vZGVzWzBdLm9uY2xpY2sgPSBmdW5jdGlvbihlKSB7XHJcblx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcclxuXHJcblx0XHRcdGxldCByZXF1ZXN0ZWRQYWdlID0gaW5zdGFuY2UuY3VycmVudC0xO1xyXG5cclxuXHRcdFx0aWYoaW5zdGFuY2Uubm90SW5QYWdlUmFuZ2UocmVxdWVzdGVkUGFnZSkpIHtcclxuXHRcdFx0XHR0aHJvdyBuZXcgTm90SW5QYWdlUmFuZ2VFeGNlcHRpb247XHJcblx0XHRcdH1cclxuXHRcdFx0XHJcblx0XHRcdFByb2R1Y3RzJDIuZ2V0UHJvZHVjdHMocmVxdWVzdGVkUGFnZSkudGhlbihmdW5jdGlvbihwcm9kdWN0cykge1xyXG5cdFx0XHRcdFByb2R1Y3RzJDIucmVwbGFjZUl0ZW1zKHByb2R1Y3RzKTtcclxuXHRcdFx0fSk7XHJcblxyXG5cdFx0XHRpbnN0YW5jZS5zZXRDdXJyZW50KHJlcXVlc3RlZFBhZ2UpO1xyXG5cdFx0fTtcclxuXHJcblx0XHRmb3IodmFyIGkgPSAwOyBpIDwgdGhpcy5wYWdlcy5sZW5ndGg7IGkrKykge1xyXG5cdFx0XHR0aGlzLnBhZ2VzW2ldLmNoaWxkTm9kZXNbMF0ub25jbGljayA9IGZ1bmN0aW9uKGUpIHtcclxuXHRcdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XHJcblx0XHRcdFx0XHJcblx0XHRcdFx0bGV0IHJlcXVlc3RlZFBhZ2UgPSB0aGlzLmdldEF0dHJpYnV0ZSgnZGF0YS1wYWdlLW5yJyk7XHJcblx0XHRcdFx0XHJcblx0XHRcdFx0UHJvZHVjdHMkMi5nZXRQcm9kdWN0cyhyZXF1ZXN0ZWRQYWdlKS50aGVuKGZ1bmN0aW9uKHByb2R1Y3RzKSB7XHJcblx0XHRcdFx0XHRQcm9kdWN0cyQyLnJlcGxhY2VJdGVtcyhwcm9kdWN0cyk7XHJcblx0XHRcdFx0fSk7XHJcblx0XHRcdFx0XHJcblx0XHRcdFx0aW5zdGFuY2Uuc2V0Q3VycmVudChyZXF1ZXN0ZWRQYWdlKTtcclxuXHRcdFx0fTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFNldHMgdGhlIGN1cnJlbnQgcGFnZS5cclxuXHQgKi9cclxuXHRzZXRDdXJyZW50KHBhZ2VOdW1iZXIpIFxyXG5cdHtcclxuXHRcdHRoaXMuY3VycmVudCA9IHBhcnNlSW50KHBhZ2VOdW1iZXIpO1xyXG5cdFx0dGhpcy5jaGFuZ2VVcmwocGFnZU51bWJlcik7XHJcblx0XHR0aGlzLnNldEFjdGl2ZUxpbmsocGFnZU51bWJlcik7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBHZXRzIHRoZSBjdXJyZW50IHBhZ2UuXHJcblx0ICovXHJcblx0Z2V0Q3VycmVudCgpIFxyXG5cdHtcclxuXHRcdHJldHVybiB0aGlzLmN1cnJlbnQ7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBDcmVhdGVzIHRoZSBwYWdpbmF0aW9uIGxpbmtzLlxyXG5cdCAqL1xyXG5cdGNyZWF0ZUxpbmtzKCkgXHJcblx0e1xyXG5cdFx0bGV0IHVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndWwnKTtcclxuXHRcdFxyXG5cdFx0dGhpcy5wYWdlcyA9IHRoaXMuY3JlYXRlUGFnZUxpbmtzKCk7XHJcblx0XHR0aGlzLnByZXZpb3VzID0gdGhpcy5jcmVhdGVQcmV2aW91c0J1dHRvbigpO1xyXG5cdFx0dGhpcy5uZXh0ID0gdGhpcy5jcmVhdGVOZXh0QnV0dG9uKCk7XHJcblxyXG5cdFx0dWwuY2xhc3NOYW1lID0gJ3BhZ2luYXRpb24nO1xyXG5cdFx0dWwuYXBwZW5kQ2hpbGQodGhpcy5wcmV2aW91cyk7XHJcblxyXG5cdFx0dGhpcy5wYWdlcy5mb3JFYWNoKGZ1bmN0aW9uKHBhZ2UpIHtcclxuXHRcdFx0dWwuYXBwZW5kQ2hpbGQocGFnZSk7XHJcblx0XHR9KTtcclxuXHJcblx0XHR1bC5hcHBlbmRDaGlsZCh0aGlzLm5leHQpO1xyXG5cclxuXHRcdHJldHVybiB1bDtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIENyZWF0ZXMgdGhlIHBhZ2VzIGl0ZW0gbGlua3MuXHJcblx0ICovXHJcblx0Y3JlYXRlUGFnZUxpbmtzKCkgXHJcblx0e1xyXG5cdFx0dmFyIHBhZ2VzID0gW107XHJcblxyXG5cdFx0Zm9yKHZhciBpID0gMTsgaSA8PSB0aGlzLnRvdGFsUGFnZXM7IGkrKykge1xyXG5cdFx0XHR2YXIgcGFnZUl0ZW0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaScpO1xyXG5cdFx0XHR2YXIgbGluayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKTtcclxuXHRcdFx0cGFnZUl0ZW0uY2xhc3NOYW1lID0gKHRoaXMuY3VycmVudCA9PSBpKSA/ICdwYWdlLWl0ZW0gYWN0aXZlJyA6ICdwYWdlLWl0ZW0nO1xyXG5cdFx0XHRsaW5rLmNsYXNzTmFtZSA9ICdwYWdlLWxpbmsnO1xyXG5cdFx0XHRsaW5rLnNldEF0dHJpYnV0ZSgnaHJlZicsICc/cGFnZT0nKyBpKTtcclxuXHRcdFx0bGluay5zZXRBdHRyaWJ1dGUoJ2RhdGEtcGFnZS1ucicsIGkpO1xyXG5cdFx0XHRsaW5rLmlubmVySFRNTCA9IGk7XHJcblx0XHRcdHBhZ2VJdGVtLmFwcGVuZENoaWxkKGxpbmspO1xyXG5cdFx0XHRwYWdlcy5wdXNoKHBhZ2VJdGVtKTtcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gcGFnZXM7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBDcmVhdGVzIHRoZSBwcmV2aW91cyBidXR0b24gbGluay5cclxuXHQgKi9cclxuXHRjcmVhdGVQcmV2aW91c0J1dHRvbigpIFxyXG5cdHtcclxuXHRcdHZhciBsaSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJyk7XHJcblx0XHR2YXIgbGluayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKTtcclxuXHRcdHZhciBzcGFuMSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcclxuXHRcdHZhciBzcGFuMiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcclxuXHRcdFxyXG5cdFx0XHJcblx0XHRsaS5jbGFzc05hbWUgPSAncGFnZS1pdGVtJztcclxuXHRcdGxpbmsuY2xhc3NOYW1lID0gJ3BhZ2UtbGluayc7XHJcblx0XHRzcGFuMi5jbGFzc05hbWUgPSAnc3Itb25seSc7XHJcblxyXG5cdFx0bGluay5zZXRBdHRyaWJ1dGUoJ2hyZWYnLCAnJyk7XHJcblx0XHRsaW5rLnNldEF0dHJpYnV0ZSgnYXJpYS1sYWJlbCcsICdQcmV2aW91cycpO1xyXG5cdFx0c3BhbjEuc2V0QXR0cmlidXRlKCdhcmlhLWhpZGRlbicsICd0cnVlJyk7XHJcblxyXG5cdFx0c3BhbjEuaW5uZXJIVE1MID0gJyZsYXF1bzsnO1xyXG5cdFx0c3BhbjIuaW5uZXJIVE1MID0gJ1ByZXZpb3VzJztcclxuXHJcblx0XHRsaW5rLmFwcGVuZENoaWxkKHNwYW4xKTtcclxuXHRcdGxpbmsuYXBwZW5kQ2hpbGQoc3BhbjIpO1xyXG5cdFx0bGkuYXBwZW5kQ2hpbGQobGluayk7XHJcblxyXG5cdFx0cmV0dXJuIGxpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQ3JlYXRlcyB0aGUgbmV4dCBidXR0b24gbGluay5cclxuXHQgKi9cclxuXHRjcmVhdGVOZXh0QnV0dG9uKCkgXHJcblx0e1xyXG5cdFx0dmFyIGxpID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKTtcclxuXHRcdHZhciBsaW5rID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpO1xyXG5cdFx0dmFyIHNwYW4xID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xyXG5cdFx0dmFyIHNwYW4yID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xyXG5cdFx0XHJcblx0XHRsaS5jbGFzc05hbWUgPSAncGFnZS1pdGVtJztcclxuXHRcdGxpbmsuY2xhc3NOYW1lID0gJ3BhZ2UtbGluayc7XHJcblx0XHRzcGFuMi5jbGFzc05hbWUgPSAnc3Itb25seSc7XHJcblxyXG5cdFx0bGluay5zZXRBdHRyaWJ1dGUoJ2hyZWYnLCAnJyk7XHJcblx0XHRsaW5rLnNldEF0dHJpYnV0ZSgnYXJpYS1sYWJlbCcsICdOZXh0Jyk7XHJcblx0XHRzcGFuMS5zZXRBdHRyaWJ1dGUoJ2FyaWEtaGlkZGVuJywgJ3RydWUnKTtcclxuXHJcblx0XHRzcGFuMS5pbm5lckhUTUwgPSAnJnJhcXVvOyc7XHJcblx0XHRzcGFuMi5pbm5lckhUTUwgPSAnTmV4dCc7XHJcblxyXG5cdFx0bGluay5hcHBlbmRDaGlsZChzcGFuMSk7XHJcblx0XHRsaW5rLmFwcGVuZENoaWxkKHNwYW4yKTtcclxuXHRcdGxpLmFwcGVuZENoaWxkKGxpbmspO1xyXG5cclxuXHRcdHJldHVybiBsaTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIENoZWNrcyBpZiB0aGUgZ2l2ZW4gcGFnZSBpcyBpbiByYW5nZS5cclxuXHQgKi9cclxuXHRub3RJblBhZ2VSYW5nZShwYWdlTnVtYmVyKSBcclxuXHR7XHJcblx0XHRyZXR1cm4gKHBhZ2VOdW1iZXIgPiB0aGlzLnRvdGFsUGFnZXMgfHwgcGFnZU51bWJlciA8PSAwKSB8fCBpc05hTihwYWdlTnVtYmVyKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIENoYW5nZXMgdGhlIHVybCB0byBhIGdpdmVuIHBhZ2UgbnVtYmVyLlxyXG5cdCAqL1xyXG5cdGNoYW5nZVVybChwYWdlTnVtYmVyKSBcclxuXHR7XHJcblx0XHRwYWdlTnVtYmVyID0gIHBhZ2VOdW1iZXIgfHwgR0VUX1ZhcnMoKVsncGFnZSddO1xyXG5cdFx0d2luZG93Lmhpc3RvcnkucmVwbGFjZVN0YXRlKCcnLCAnJywgdGhpcy51cGRhdGVVUkxQYXJhbWV0ZXIod2luZG93LmxvY2F0aW9uLmhyZWYsICdwYWdlJywgcGFnZU51bWJlcikpO1xyXG5cdH1cclxuXHJcblx0c2V0QWN0aXZlTGluayhwYWdlTnVtYmVyKVxyXG5cdHtcclxuXHRcdGZvcih2YXIgcGFnZSBpbiB0aGlzLnBhZ2VzKSB7XHJcblx0XHRcdGlmICh0aGlzLnBhZ2VzW3BhZ2VdLmNoaWxkTm9kZXNbMF0uZ2V0QXR0cmlidXRlKCdkYXRhLXBhZ2UtbnInKSA9PSBwYWdlTnVtYmVyKSB7XHJcblx0XHRcdFx0RE9NLmFkZENsYXNzKHRoaXMucGFnZXNbcGFnZV0sICdhY3RpdmUnKTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRET00ucmVtb3ZlQ2xhc3ModGhpcy5wYWdlc1twYWdlXSwgJ2FjdGl2ZScpO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBHZXQgdGhlIGdldCB2YXJpYWJsZXMgZnJvbSB0aGUgdXJsLlxyXG5cdCAqL1xyXG5cdEdFVF9WYXJzKCkgXHJcblx0e1xyXG5cdFx0dmFyIHZhcnMgPSB7fTtcclxuXHRcdHZhciBwYXJ0cyA9IHdpbmRvdy5sb2NhdGlvbi5ocmVmLnJlcGxhY2UoL1s/Jl0rKFtePSZdKyk9KFteJl0qKS9naSwgZnVuY3Rpb24obSwga2V5LCB2YWx1ZSkge1xyXG5cdFx0XHR2YXJzW2tleV0gPSB2YWx1ZTtcclxuXHRcdH0pO1xyXG5cclxuXHRcdHJldHVybiB2YXJzO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogTW9kaWZpZXMgdGhlIGdldCBwYXJhbWV0ZXIgaW4gdGhlIHVybC5cclxuXHQgKi9cclxuXHR1cGRhdGVVUkxQYXJhbWV0ZXIodXJsLCBwYXJhbSwgcGFyYW1WYWwpIFxyXG5cdHtcclxuXHQgICAgdmFyIG5ld0FkZGl0aW9uYWxVUkwgPSBcIlwiO1xyXG5cdCAgICB2YXIgdGVtcEFycmF5ID0gdXJsLnNwbGl0KFwiP1wiKTtcclxuXHQgICAgdmFyIGJhc2VVUkwgPSB0ZW1wQXJyYXlbMF07XHJcblx0ICAgIHZhciBhZGRpdGlvbmFsVVJMID0gdGVtcEFycmF5WzFdO1xyXG5cdCAgICB2YXIgdGVtcCA9IFwiXCI7XHJcblxyXG5cdCAgICBpZiAoYWRkaXRpb25hbFVSTCkge1xyXG5cdCAgICAgICAgdGVtcEFycmF5ID0gYWRkaXRpb25hbFVSTC5zcGxpdChcIiZcIik7XHJcblx0ICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRlbXBBcnJheS5sZW5ndGg7IGkrKyl7XHJcblx0ICAgICAgICAgICAgaWYgKHRlbXBBcnJheVtpXS5zcGxpdCgnPScpWzBdICE9IHBhcmFtKXtcclxuXHQgICAgICAgICAgICAgICAgbmV3QWRkaXRpb25hbFVSTCArPSB0ZW1wICsgdGVtcEFycmF5W2ldO1xyXG5cdCAgICAgICAgICAgICAgICB0ZW1wID0gXCImXCI7XHJcblx0ICAgICAgICAgICAgfVxyXG5cdCAgICAgICAgfVxyXG5cdCAgICB9XHJcblxyXG5cdCAgICB2YXIgcm93c1RleHQgPSB0ZW1wICsgXCJcIiArIHBhcmFtICsgXCI9XCIgKyBwYXJhbVZhbDtcclxuXHQgICAgcmV0dXJuIGJhc2VVUkwgKyBcIj9cIiArIG5ld0FkZGl0aW9uYWxVUkwgKyByb3dzVGV4dDtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFJlc2V0cyB0aGUgcGFnaW5hdGlvbi5cclxuXHQgKi9cclxuXHRyZXNldCgpIFxyXG5cdHtcclxuXHRcdHRoaXMuc2V0Q3VycmVudCgxKTtcclxuXHRcdHRoaXMuY2hhbmdlVXJsKDEpO1xyXG5cdH1cclxufVxuXG5sZXQgaW5pdGFsaXplZCA9IGZhbHNlO1xuXG5sZXQgZGVmYXVsdFNldHRpbmdzID0ge1xuXHRlbGVtZW50OiAnYm9keScsXG5cdGltcG9ydEJvb3RzdHJhcDogZmFsc2UsXG5cdGNvbXBvbmVudHM6IFsnUHJvZHVjdHMnLCAnU2VydmljZXMnLCAnRmlsdGVyJywgJ1BhZ2luYXRpb24nLCAnQ2FydCddXG59O1xuXG5jbGFzcyBUdXJib2VDb21tZXJjZVxue1xuXHRjb25zdHJ1Y3RvcihzZXR0aW5ncylcblx0e1xuXHRcdEV4Y2VwdGlvbkhhbmRsZXIuaW5pdGFsaXplKCk7XG5cblx0XHRpZih0eXBlb2Ygc2V0dGluZ3MgIT0gJ29iamVjdCcpIHtcblx0XHRcdHRocm93IG5ldyBJbnZhbGlkQXJndW1lbnRFeGNlcHRpb24kMTtcblx0XHR9XG5cblx0XHR0aGlzLmNvbnRhaW5lciA9IG5ldyBDb250YWluZXI7XG5cdFx0dGhpcy5zZXR0aW5ncyA9IENvbW1vbi5leHRlbmQoZGVmYXVsdFNldHRpbmdzLCBzZXR0aW5ncyk7XG5cdFx0dGhpcy5zZXR0aW5ncy5lbGVtZW50ID0gRE9NLmZpbmQodGhpcy5zZXR0aW5ncy5lbGVtZW50KTtcblx0XHRcblx0XHRiaW5kQ29tcG9uZW50c0RlcGVuZGVuY2llcy5jYWxsKHRoaXMsIHNldHRpbmdzLmNvbXBvbmVudHMpO1xuXG5cdFx0aW5pdGFsaXplZCA9IHRydWU7XG5cblx0XHRyZXR1cm4gbmV3IFByb3h5KHRoaXMsIHtcblx0XHRcdGdldDogZnVuY3Rpb24odGFyZ2V0LCBvYmplY3QpIHtcblx0XHRcdFx0aWYgKG9iamVjdCA9PSAnRXZlbnRzJykge1xuXHRcdFx0XHRcdHJldHVybiBFdmVudE1hbmFnZXI7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRpZiAoISBDb21tb24uaW5fYXJyYXkob2JqZWN0LCBzZXR0aW5ncy5jb21wb25lbnRzKSkge1xuXHRcdFx0XHRcdHRocm93IG5ldyBDb21wb25lbnROb3RSZWdpc3RlcmVkRXhjZXB0aW9uO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0cmV0dXJuIHRhcmdldC5jb250YWluZXIubWFrZShvYmplY3QpO1xuXHRcdFx0fVxuXHRcdH0pO1xuXHR9XG59XG5cbi8qKlxuICogQmluZHMgY29tcG9uZW50cyBkZXBlbmRlbmNpZXMuXG4gKi9cbmZ1bmN0aW9uIGJpbmRDb21wb25lbnRzRGVwZW5kZW5jaWVzKGNvbXBvbmVudHMpIHtcblxuXHRsZXQgcmVxdWVzdCA9IHRoaXMuY29udGFpbmVyLm1ha2UobmV3IFJlcXVlc3QpO1xuXG5cdHRoaXMuY29udGFpbmVyLmJpbmQoJ0ZpbHRlcicsIGZ1bmN0aW9uKGNvbnRhaW5lcikge1xuXHRcdGNvbnRhaW5lclsnRmlsdGVyJ10uYm9vdGVkID0gdHJ1ZTtcblx0XHRyZXR1cm4gbmV3IEZpbHRlcihjb250YWluZXIpO1xuXHR9KTtcblx0XG5cdHRoaXMuY29udGFpbmVyLmJpbmQoJ1NlcnZpY2VzJywgZnVuY3Rpb24oY29udGFpbmVyKSB7IFxuXHRcdGNvbnRhaW5lclsnU2VydmljZXMnXS5ib290ZWQgPSB0cnVlO1xuXHRcdHJldHVybiBuZXcgU2VydmljZXMoY29udGFpbmVyKTtcblx0fSk7XG5cblx0dGhpcy5jb250YWluZXIuYmluZCgnUHJvZHVjdHMnLCBmdW5jdGlvbihjb250YWluZXIpIHtcblx0XHRjb250YWluZXJbJ1Byb2R1Y3RzJ10uYm9vdGVkID0gdHJ1ZTtcblx0XHRyZXR1cm4gbmV3IFByb2R1Y3RzKGNvbnRhaW5lciwgcmVxdWVzdCk7XG5cdH0pO1xuXG5cdHRoaXMuY29udGFpbmVyLmJpbmQoJ1BhZ2luYXRpb24nLCBmdW5jdGlvbihjb250YWluZXIpIHtcblx0XHRjb250YWluZXJbJ1BhZ2luYXRpb24nXS5ib290ZWQgPSB0cnVlO1xuXHRcdHJldHVybiBuZXcgUGFnaW5hdGlvbihjb250YWluZXIsIGNvbnRhaW5lci5tYWtlKCdQcm9kdWN0cycpKTtcblx0fSk7XG5cblx0dGhpcy5jb250YWluZXIuYmluZCgnQ2FydCcsIGZ1bmN0aW9uKGNvbnRhaW5lcikge1xuXHRcdGNvbnRhaW5lclsnQ2FydCddLmJvb3RlZCA9IHRydWU7XG5cdFx0cmV0dXJuIG5ldyBDYXJ0KGNvbnRhaW5lciwgcmVxdWVzdCk7XG5cdH0pO1xuXG5cdHRoaXMuY29udGFpbmVyWydGaWx0ZXInXVsnYm9vdGVkJ10gPSBmYWxzZTtcblx0dGhpcy5jb250YWluZXJbJ1NlcnZpY2VzJ11bJ2Jvb3RlZCddID0gZmFsc2U7XG5cdHRoaXMuY29udGFpbmVyWydQcm9kdWN0cyddWydib290ZWQnXSA9IGZhbHNlO1xuXHR0aGlzLmNvbnRhaW5lclsnUGFnaW5hdGlvbiddWydib290ZWQnXSA9IGZhbHNlO1xuXHR0aGlzLmNvbnRhaW5lclsnQ2FydCddWydib290ZWQnXSA9IGZhbHNlO1xufVxuXG5yZXR1cm4gVHVyYm9lQ29tbWVyY2U7XG5cbn0oKSk7XG4iXX0=
