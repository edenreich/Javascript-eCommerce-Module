'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TurboeCommerce = function () {
	'use strict';

	var defaultMessage = 'an invalid argument was passed.';

	var InvalidArgumentException$1 = function (_Error) {
		_inherits(InvalidArgumentException$1, _Error);

		function InvalidArgumentException$1(message) {
			_classCallCheck(this, InvalidArgumentException$1);

			var _this = _possibleConstructorReturn(this, (InvalidArgumentException$1.__proto__ || Object.getPrototypeOf(InvalidArgumentException$1)).call(this));

			console.error('InvalidArgumentException: ' + message || defaultMessage);
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

	/**
  * @file 
  * Request class.
  *
  * Handles ajax requests POST, GET etc...
  */

	/**
  * Stores the default settings.
  *
  * @var object
  */

	var defaultSettings$1 = {
		headers: {
			'Content-Type': 'application/json'
		},
		async: true
	};

	var Request = function () {
		/**
   * - Initialize the settings object.
   * - Initialize the xhr object.
   *
   * @param object | settings
   * @return void
   */
		function Request(settings) {
			_classCallCheck(this, Request);

			this.xhr = new XMLHttpRequest() || new ActiveXObject("Microsoft.XMLHTTP");
			this.settings = Common.extend(defaultSettings$1, settings);
			this.setDefaultRequestHeader();
		}

		/**
   * Sets the default request headers.
   *
   * @return void
   */


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

			/**
    * Makes a POST request.
    *
    * @param object | options
    * @return Promise
    */

		}, {
			key: 'post',
			value: function post(options) {
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

					xhr.open('POST', options.url, true);

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

	var defaultMessage$1 = 'trying to bind an already existing bound.';

	var InvalidBindingException = function (_Error3) {
		_inherits(InvalidBindingException, _Error3);

		function InvalidBindingException() {
			_classCallCheck(this, InvalidBindingException);

			var _this3 = _possibleConstructorReturn(this, (InvalidBindingException.__proto__ || Object.getPrototypeOf(InvalidBindingException)).call(this));

			console.error('InvalidBindingException: ' + message || defaultMessage$1);
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
				if (typeof key != 'string') {
					throw new InvalidArgumentException$1('bind() expects the first parameter to be string, but ' + (typeof key === 'undefined' ? 'undefined' : _typeof(key)) + ' was passed instead.');
				}

				if (typeof concrete != 'function') {
					throw new InvalidArgumentException$1('bind() expects the second parameter to be a function, but ' + (typeof concrete === 'undefined' ? 'undefined' : _typeof(concrete)) + ' was passed instead.');
				}

				if (typeof this[key] != 'undefined') {
					throw new InvalidBindingException('bind() recieved an already existing bind.');
				}

				this[key] = concrete.bind(concrete, this);
			}

			/**
    * Sets an instance.
    *
    * @param string | key
    * @param object | instance
    * @param string | alias
    * @return void
    */

		}, {
			key: 'setInstance',
			value: function setInstance(key, instance) {
				var alias = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

				if (typeof key != 'string') {
					throw new InvalidArgumentException$1('setInstace() expects the first parameter to be a string, but ' + (typeof key === 'undefined' ? 'undefined' : _typeof(key)) + ' was passed instead.');
				}

				if ((typeof instance === 'undefined' ? 'undefined' : _typeof(instance)) != 'object') {
					throw new InvalidArgumentException$1('setInstance() expects the second parameter to be an object, but ' + (typeof instance === 'undefined' ? 'undefined' : _typeof(instance)) + ' was passed instead.');
				}

				_instances[key] = instance;
				_instances[alias] = instance;
				this[key] = instance;
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
					throw new InvalidArgumentException$1('getInstace() expects the first parameter to be a string, but ' + (typeof key === 'undefined' ? 'undefined' : _typeof(key)) + ' was passed instead.');
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

				throw new InvalidArgumentException$1('instanceExist() expects the first parameter to be string or an object, but ' + (typeof instance === 'undefined' ? 'undefined' : _typeof(instance)) + ' was passed instead.');
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
					throw new InvalidBindingException('The parameter you passed could not be bounded to the container, parameter: ' + (typeof object === 'undefined' ? 'undefined' : _typeof(object)));
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

	var defaultMessage$2 = 'The event you called does not exists or you supplied wrong argument';

	var BadEventCallException = function (_Error4) {
		_inherits(BadEventCallException, _Error4);

		function BadEventCallException(message) {
			_classCallCheck(this, BadEventCallException);

			var _this4 = _possibleConstructorReturn(this, (BadEventCallException.__proto__ || Object.getPrototypeOf(BadEventCallException)).call(this, message));

			console.error('BadEventCallException: ' + message || defaultMessage$2);
			return _this4;
		}

		return BadEventCallException;
	}(Error);

	/**
  * @file 
  * EventManager class.
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

		_createClass(EventManager, [{
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

	var defaultMessage$3 = 'In order to use components you must register them with the shop!';

	var ComponentNotRegisteredException = function (_Error7) {
		_inherits(ComponentNotRegisteredException, _Error7);

		function ComponentNotRegisteredException(message) {
			_classCallCheck(this, ComponentNotRegisteredException);

			var _this7 = _possibleConstructorReturn(this, (ComponentNotRegisteredException.__proto__ || Object.getPrototypeOf(ComponentNotRegisteredException)).call(this));

			console.error('ComponentNotRegisteredException: ' + message || defaultMessage$3);
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
    *
    * @param string | string
    * @return string
    */
			value: function kebabCase(string) {
				return string.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
			}

			/**
    * Generates a random string.
    *
    * @param integer | length
    * @return string
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
  * @file 
  * Cart class.
  *
  * Handles adding, removing etc... of items.
  */

	/**
  * The default settings of the cart.
  *
  * @var object
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
  *
  * @var \Core\Container
  */
	var Container$2 = void 0;

	/**
  * Stores the event manager object.
  *
  * @var \Core\EventManager
  */
	var EventManager$2 = void 0;

	/**
  * Stores the request object.
  *
  * @var \Helpers\Request
  */
	var Http = void 0;

	/**
  * Stores the cart loader.
  *
  * @var HTMLDivElement
  */
	var _loadingOverlay = void 0;

	/**
  * Stores the items wrapper.
  *
  * @var HTMLDivElement
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
		function Cart(container, http, eventManager) {
			_classCallCheck(this, Cart);

			Container$2 = container;
			Http = http;
			EventManager$2 = eventManager;

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

				EventManager$2.subscribe('cart.products.added', function (attributes) {
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
  * Stores the container object.
  * 
  * @var \Core\EventManager
  */
	var EventManager$3 = void 0;

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
		function Products(container, http, eventManager) {
			_classCallCheck(this, Products);

			Container$4 = container;
			Http$1 = http;
			EventManager$3 = eventManager;
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
						EventManager$3.publish('products.loading', product);
					}

					EventManager$3.publish('products.fetched', products);
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
						EventManager$3.publish('products.loading', product);
					}

					EventManager$3.publish('products.fetched', products);
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
					EventManager$3.publish('cart.products.added', attributes);
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

		return new Proxy(this, {
			get: function get(target, source) {
				if (Common.in_array(source, settings.components)) {
					return target.container.make(source);
				} else if (target.container.instanceExist(source)) {
					return target.container.getInstance(source);
				}

				throw new ComponentNotRegisteredException('components must be registered in order to use them.');
			}
		});
	};

	/**
  * Binds components dependencies.
  *
  * @param object | components
  * @return void
  */


	function bindComponentsDependencies(components) {

		this.container.setInstance('Events', new EventManager());

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
			return new Products(container, request, container.Events);
		});

		this.container.bind('Pagination', function (container) {
			container['Pagination'].booted = true;
			return new Pagination(container, container.make('Products'), container.Events);
		});

		this.container.bind('Cart', function (container) {
			container['Cart'].booted = true;
			return new Cart(container, request, container.Events);
		});

		this.container['Filter']['booted'] = false;
		this.container['Services']['booted'] = false;
		this.container['Products']['booted'] = false;
		this.container['Pagination']['booted'] = false;
		this.container['Cart']['booted'] = false;
	}

	return TurboeCommerce;
}();
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlR1cmJvZUNvbW1lcmNlLmpzIl0sIm5hbWVzIjpbIlR1cmJvZUNvbW1lcmNlIiwiZGVmYXVsdE1lc3NhZ2UiLCJJbnZhbGlkQXJndW1lbnRFeGNlcHRpb24kMSIsIm1lc3NhZ2UiLCJjb25zb2xlIiwiZXJyb3IiLCJFcnJvciIsIkRPTSIsInN0cmluZyIsInJlcGxhY2UiLCJlbGVtZW50IiwiY2xhc3NOYW1lIiwibmV3Q2xhc3NOYW1lIiwicmVtb3ZlQ2xhc3MiLCJhZGRDbGFzcyIsInVuZGVmaW5lZCIsImNsYXNzTmFtZXMiLCJzcGxpdCIsImZvckVhY2giLCJuYW1lIiwiY2xhc3NMaXN0IiwiYWRkIiwicmVtb3ZlIiwiaWQiLCJjc3MiLCJoZWFkIiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50c0J5VGFnTmFtZSIsInN0eWxlVGFnIiwiY3JlYXRlRWxlbWVudCIsIkNTUyIsIm1pbmlmeUNzcyIsImlubmVySFRNTCIsInNldEF0dHJpYnV0ZSIsImFwcGVuZENoaWxkIiwiZWxlbWVudFR5cGUiLCJvcHRpb25zIiwib3B0aW9uIiwic2Vjb25kQ2xhc3NOYW1lIiwidG9nZ2xlIiwic2VsZWN0b3IiLCJjb250ZXh0Iiwid2luZG93IiwicXVlcnlFbGVtZW50IiwicGFyZW50RWxlbWVudCIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJsZW5ndGgiLCJoYXNDaGlsZCIsImNoaWxkRWxlbWVudCIsIm5vZGUiLCJwYXJlbnROb2RlIiwiQ29tbW9uIiwiY3VycmVudE9iamVjdCIsIm5ld09iamVjdCIsImV4dGVuZGVkIiwicHJvcCIsIk9iamVjdCIsInByb3RvdHlwZSIsImhhc093blByb3BlcnR5IiwiY2FsbCIsIm5lZWRsZSIsImh5c3RhY2siLCJjb25zdHJ1Y3RvciIsIkFycmF5IiwiaSIsIm9iamVjdCIsIkludmFsaWREYXRhU3RydWN0dXJlRXhjZXB0aW9uIiwiZGVmYXVsdFNldHRpbmdzJDEiLCJoZWFkZXJzIiwiYXN5bmMiLCJSZXF1ZXN0Iiwic2V0dGluZ3MiLCJ4aHIiLCJYTUxIdHRwUmVxdWVzdCIsIkFjdGl2ZVhPYmplY3QiLCJleHRlbmQiLCJzZXREZWZhdWx0UmVxdWVzdEhlYWRlciIsImhlYWRlciIsIm9wZW4iLCJzZXRSZXF1ZXN0SGVhZGVyIiwicmVzcG9uc2UiLCJhcHBseSIsImFyZ3VtZW50cyIsImJlZm9yZSIsIlByb21pc2UiLCJyZXNvbHZlIiwicmVqZWN0IiwiZGF0YSIsInVybCIsInJlc3BvbnNlVHlwZSIsImRhdGFUeXBlIiwidGltZW91dCIsIm9ucmVhZHlzdGF0ZWNoYW5nZSIsInJlYWR5U3RhdGUiLCJzdGF0dXMiLCJhZnRlciIsIm9uZXJyb3IiLCJzZW5kIiwicXVlcnlTdHJpbmciLCJrZXlzIiwibWFwIiwia2V5IiwiZW5jb2RlVVJJQ29tcG9uZW50Iiwiam9pbiIsImRlZmF1bHRNZXNzYWdlJDEiLCJJbnZhbGlkQmluZGluZ0V4Y2VwdGlvbiIsImluc3RhbmNlcyIsIkNvbnRhaW5lciIsImNvbmNyZXRlIiwiYmluZCIsImluc3RhbmNlIiwiYWxpYXMiLCJpbnN0YW5jZUV4aXN0IiwiZ2V0SW5zdGFuY2UiLCJzZXRJbnN0YW5jZSIsImRlZmF1bHRNZXNzYWdlJDIiLCJCYWRFdmVudENhbGxFeGNlcHRpb24iLCJldmVudHMiLCJFdmVudE1hbmFnZXIiLCJjYWxsYmFjayIsIkludmFsaWRBcmd1bWVudEV4Y2VwdGlvbiIsInB1c2giLCJDb21wb25lbnRzRXhjZXB0aW9uIiwiTm90SW5QYWdlUmFuZ2VFeGNlcHRpb24iLCJkZWZhdWx0TWVzc2FnZSQzIiwiQ29tcG9uZW50Tm90UmVnaXN0ZXJlZEV4Y2VwdGlvbiIsIkV4Y2VwdGlvbkhhbmRsZXIiLCJzb3VyY2UiLCJsaW5lbm8iLCJjb2xubyIsIlN0ciIsInRvTG93ZXJDYXNlIiwicG9zc2libGUiLCJjaGFyQXQiLCJNYXRoIiwiZmxvb3IiLCJyYW5kb20iLCJDb29raWUiLCJ2YWx1ZSIsImRheXMiLCJKU09OIiwic3RyaW5naWZ5IiwiZXhwaXJlcyIsImRhdGUiLCJEYXRlIiwic2V0VGltZSIsImdldFRpbWUiLCJ0b0dNVFN0cmluZyIsImNvb2tpZSIsImNfc3RhcnQiLCJpbmRleE9mIiwiY19lbmQiLCJwYXJzZSIsInVuZXNjYXBlIiwic3Vic3RyaW5nIiwiZGVmYXVsdFNldHRpbmdzJDIiLCJjb29raWVfbmFtZSIsInByZXZpZXdfY2xhc3MiLCJsb2FkZXIiLCJjbGFzcyIsIndpZHRoIiwiaGVpZ2h0IiwicGxhY2VtZW50IiwiZml4ZWQiLCJob3Zlcl9jb2xvciIsIkNvbnRhaW5lciQyIiwiRXZlbnRNYW5hZ2VyJDIiLCJIdHRwIiwibG9hZGluZ092ZXJsYXkiLCJpdGVtc0RpdiIsIkNhcnQiLCJjb250YWluZXIiLCJodHRwIiwiZXZlbnRNYW5hZ2VyIiwicHJldmlld0VsZW1lbnQiLCJjcmVhdGVQcmV2aWV3RWxlbWVudCIsInN2Z0ljb24iLCJjcmVhdGVJY29uIiwic2V0RWxlbWVudCIsImJpbmRFdmVudExpc3RlbmVycyIsImFkZFN0eWxlVGFnIiwiaXNFbXB0eSIsImdldCIsImNhcnQiLCJzZXRDYXJ0IiwiZW1wdHlPYmplY3QiLCJpdGVtcyIsImZhdm9yaXRlcyIsInNldCIsIml0ZW0iLCJzcGxpY2UiLCJsaSIsImF0dHJpYnV0ZXMiLCJhdHRyaWJ1dGUiLCJzcGFuIiwidGV4dCIsImljb24iLCJmaW5kIiwicG9zaXRpb24iLCJhZGRTdHlsZSIsInNyYyIsInJlbW92ZUNoaWxkIiwicHJldmlld1N0YXJ0TG9hZGluZyIsImdldENhcnRJdGVtcyIsImFkZFRvUHJldmlldyIsInNldFRpbWVvdXQiLCJwcmV2aWV3U3RvcExvYWRpbmciLCJvbmNsaWNrIiwiZSIsInByZXZlbnREZWZhdWx0Iiwib3BlbmluZyIsInRvZ2dsZUNsYXNzIiwicmVsb2FkQ2FydFByZXZpZXciLCJzdWJzY3JpYmUiLCJjbG9zZSIsImV2ZW50Iiwic3dpdGNoQ2xhc3NlcyIsInN2ZyIsImNyZWF0ZUVsZW1lbnROUyIsImciLCJwYXRoIiwiZGVmYXVsdFNldHRpbmdzJDMiLCJDb250YWluZXIkMyIsIkZpbHRlciIsIndyYXBwZXIiLCJkZWZhdWx0U2V0dGluZ3MkNCIsIml0ZW1fY2xhc3MiLCJhZGRfYnV0dG9uX2NsYXNzIiwiZmF2b3JpdGVfYnV0dG9uX2NsYXNzIiwiQ29udGFpbmVyJDQiLCJFdmVudE1hbmFnZXIkMyIsIkh0dHAkMSIsIlByb2R1Y3RzIiwiYWRkRXZlbnRMaXN0ZW5lciIsIlBhZ2luYXRpb24iLCJib290ZWQiLCJsb2FkUGFnZVByb2R1Y3RzIiwibG9hZEFsbFByb2R1Y3RzIiwicmVxdWVzdCIsImdldFByb2R1Y3RzIiwidGhlbiIsInByb2R1Y3RzIiwiY3VycmVudEl0ZW1zIiwicHJvZHVjdCIsInB1Ymxpc2giLCJyZXBsYWNlSXRlbXMiLCJjYXRjaCIsImlzQXJyYXkiLCJidWlsZFByb2R1Y3RzIiwicGFnZU51bWJlciIsImFjdGlvbiIsImF0dHJpYnV0ZXNDb2xsZWN0aW9uIiwidGFnVHlwZSIsImJ1aWx0UHJvZHVjdHMiLCJidWlsdFByb2R1Y3QiLCJidWlsZFByb2R1Y3QiLCJvdmVybGF5IiwiaW5fYXJyYXkiLCJ0YWciLCJpbWFnZSIsImtlYmFiQ2FzZSIsImFkZFRvQ2FydCIsInR5cGUiLCJmYXZvcml0ZSIsIlNlcnZpY2VzIiwiZGVmYXVsdFNldHRpbmdzJDUiLCJwZXJfcGFnZSIsInRvdGFsX2l0ZW1zIiwiQ29udGFpbmVyJDUiLCJQcm9kdWN0cyQyIiwic2V0Q3VycmVudCIsInRvdGFsUGFnZXMiLCJjYWxjdWxhdGVUb3RhbFBhZ2VzIiwicmVwbGFjZUxpbmtzIiwibGlua3MiLCJjcmVhdGVMaW5rcyIsInBlclBhZ2UiLCJ0b3RhbEl0ZW1zIiwicGFyc2VJbnQiLCJjZWlsIiwibmV4dCIsImNoaWxkTm9kZXMiLCJyZXF1ZXN0ZWRQYWdlIiwiY3VycmVudCIsIm5vdEluUGFnZVJhbmdlIiwicHJldmlvdXMiLCJwYWdlcyIsImdldEF0dHJpYnV0ZSIsImNoYW5nZVVybCIsInNldEFjdGl2ZUxpbmsiLCJ1bCIsImNyZWF0ZVBhZ2VMaW5rcyIsImNyZWF0ZVByZXZpb3VzQnV0dG9uIiwiY3JlYXRlTmV4dEJ1dHRvbiIsInBhZ2UiLCJwYWdlSXRlbSIsImxpbmsiLCJzcGFuMSIsInNwYW4yIiwiaXNOYU4iLCJHRVRfVmFycyIsImhpc3RvcnkiLCJyZXBsYWNlU3RhdGUiLCJ1cGRhdGVVUkxQYXJhbWV0ZXIiLCJsb2NhdGlvbiIsImhyZWYiLCJ2YXJzIiwicGFydHMiLCJtIiwicGFyYW0iLCJwYXJhbVZhbCIsIm5ld0FkZGl0aW9uYWxVUkwiLCJ0ZW1wQXJyYXkiLCJiYXNlVVJMIiwiYWRkaXRpb25hbFVSTCIsInRlbXAiLCJyb3dzVGV4dCIsImRlZmF1bHRTZXR0aW5ncyIsImltcG9ydEJvb3RzdHJhcCIsImNvbXBvbmVudHMiLCJpbml0YWxpemUiLCJiaW5kQ29tcG9uZW50c0RlcGVuZGVuY2llcyIsIlByb3h5IiwidGFyZ2V0IiwibWFrZSIsIkV2ZW50cyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFBQSxJQUFJQSxpQkFBa0IsWUFBWTtBQUNsQzs7QUFFQSxLQUFJQyxpQkFBaUIsaUNBQXJCOztBQUhrQyxLQUs1QkMsMEJBTDRCO0FBQUE7O0FBT2pDLHNDQUFZQyxPQUFaLEVBQ0E7QUFBQTs7QUFBQTs7QUFFSUMsV0FBUUMsS0FBUixDQUFjLCtCQUErQkYsT0FBL0IsSUFBMENGLGNBQXhEO0FBRko7QUFHSTs7QUFYNkI7QUFBQSxHQUtPSyxLQUxQOztBQWNsQzs7Ozs7Ozs7QUFka0MsS0FzQjVCQyxHQXRCNEI7QUFBQTtBQUFBO0FBQUE7O0FBQUE7QUFBQTs7QUF3QmpDOzs7Ozs7QUF4QmlDLDZCQThCaEJDLE1BOUJnQixFQStCakM7QUFDSUEsYUFBU0EsT0FBT0MsT0FBUCxDQUFlLHdDQUFmLEVBQXlELEVBQXpELENBQVQ7QUFDQUQsYUFBU0EsT0FBT0MsT0FBUCxDQUFlLFFBQWYsRUFBeUIsR0FBekIsQ0FBVDtBQUNBRCxhQUFTQSxPQUFPQyxPQUFQLENBQWUsVUFBZixFQUEyQixJQUEzQixDQUFUO0FBQ0FELGFBQVNBLE9BQU9DLE9BQVAsQ0FBZSxVQUFmLEVBQTJCLElB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QUFMLENBQWUsVUFBZixFQUEyQixRQUEzQixJQUF1QyxLQUF2QztBQUNBLE9BQUtBLFNBQUwsQ0FBZSxZQUFmLEVBQTZCLFFBQTdCLElBQXlDLEtBQXpDO0FBQ0EsT0FBS0EsU0FBTCxDQUFlLE1BQWYsRUFBdUIsUUFBdkIsSUFBbUMsS0FBbkM7QUFDQTs7QUFFRCxRQUFPM0ssY0FBUDtBQUVDLENBNXBFcUIsRUFBdEIiLCJmaWxlIjoiVHVyYm9lQ29tbWVyY2UuanMiLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgVHVyYm9lQ29tbWVyY2UgPSAoZnVuY3Rpb24gKCkge1xuJ3VzZSBzdHJpY3QnO1xuXG5sZXQgZGVmYXVsdE1lc3NhZ2UgPSAnYW4gaW52YWxpZCBhcmd1bWVudCB3YXMgcGFzc2VkLic7XHJcblxyXG5jbGFzcyBJbnZhbGlkQXJndW1lbnRFeGNlcHRpb24kMSBleHRlbmRzIEVycm9yXHJcbntcclxuXHRjb25zdHJ1Y3RvcihtZXNzYWdlKSBcclxuXHR7IFxyXG4gICAgXHRzdXBlcigpO1xyXG4gICAgXHRjb25zb2xlLmVycm9yKCdJbnZhbGlkQXJndW1lbnRFeGNlcHRpb246ICcgKyBtZXNzYWdlIHx8IGRlZmF1bHRNZXNzYWdlKTtcclxuICAgIH1cclxufVxuXG4vKipcclxuICogQGZpbGUgXHJcbiAqIERPTSBjbGFzcy5cclxuICpcclxuICogQWRkcyBzb21lIHVzZWZ1bCBmdW5jdGlvbmFsaXR5IGZvclxyXG4gKiBmZXRjaGluZyBvciBtYW5pcHVsYXRpbmcgRE9NIGVsZW1lbnRzLlxyXG4gKi9cclxuXHJcbmNsYXNzIERPTVxyXG57XHJcblx0LyoqXHJcblx0ICogTWluaWZpZXMgdGhlIGNzcyB0ZXh0LlxyXG5cdCAqIFxyXG5cdCAqIEBwYXJhbSBzdHJpbmcgfCBzdHJpbmdcclxuXHQgKiBAcmV0dXJuIHN0cmluZ1xyXG5cdCAqL1xyXG5cdHN0YXRpYyBtaW5pZnlDc3Moc3RyaW5nKSBcclxuXHR7XHJcblx0ICAgIHN0cmluZyA9IHN0cmluZy5yZXBsYWNlKC9cXC9cXCooPzooPyFcXCpcXC8pW1xcc1xcU10pKlxcKlxcL3xbXFxyXFxuXFx0XSsvZywgJycpO1xyXG5cdCAgICBzdHJpbmcgPSBzdHJpbmcucmVwbGFjZSgvIHsyLH0vZywgJyAnKTtcclxuXHQgICAgc3RyaW5nID0gc3RyaW5nLnJlcGxhY2UoLyhbezp9XSkvZywgJyQxJyk7XHJcblx0ICAgIHN0cmluZyA9IHN0cmluZy5yZXBsYWNlKC8oWzssXSkgL2csICckMScpO1xyXG5cdCAgICBzdHJpbmcgPSBzdHJpbmcucmVwbGFjZSgvICEvZywgJyEnKTtcclxuXHQgICAgXHJcblx0ICAgIHJldHVybiBzdHJpbmc7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBTd2l0Y2hlcyBiZXR3ZWVuIHR3byBnaXZlbiBjbGFzc2VzLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIG9iamVjdCB8IGVsZW1lbnRcclxuXHQgKiBAcGFyYW0gc3RyaW5nIHwgY2xhc3NOYW1lXHJcblx0ICogQHBhcmFtIHN0cmluZyB8IG5ld0NsYXNzTmFtZVxyXG5cdCAqIEByZXR1cm4gb2JqZWN0XHJcblx0ICovXHJcblx0c3RhdGljIHN3aXRjaENsYXNzZXMoZWxlbWVudCwgY2xhc3NOYW1lLCBuZXdDbGFzc05hbWUpIFxyXG5cdHtcclxuXHRcdHRoaXMucmVtb3ZlQ2xhc3MoZWxlbWVudCwgY2xhc3NOYW1lKTtcclxuXHRcdHRoaXMuYWRkQ2xhc3MoZWxlbWVudCwgbmV3Q2xhc3NOYW1lKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEFkZHMgY2xhc3MgdG8gYSBnaXZlbiBlbGVtZW50LlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIG9iamVjdCB8IGVsZW1lbnRcclxuXHQgKiBAcGFyYW0gc3RyaW5nIHwgY2xhc3NOYW1lXHJcblx0ICogQHJldHVybiBvYmplY3RcclxuXHQgKi9cclxuXHRzdGF0aWMgYWRkQ2xhc3MoZWxlbWVudCwgY2xhc3NOYW1lKSBcclxuXHR7XHJcblx0XHRpZihlbGVtZW50ID09PSBudWxsKSB7XHJcblx0XHRcdHRocm93IG5ldyBJbnZhbGlkQXJndW1lbnRFeGNlcHRpb24kMTtcclxuXHRcdH1cclxuXHJcblx0XHRpZighIGNsYXNzTmFtZSB8fCBjbGFzc05hbWUgPT0gJycgfHwgdHlwZW9mIGNsYXNzTmFtZSA9PT0gdW5kZWZpbmVkKSB7XHJcblx0XHRcdHJldHVybiBlbGVtZW50O1xyXG5cdFx0fVxyXG5cclxuXHRcdGxldCBjbGFzc05hbWVzID0gY2xhc3NOYW1lLnNwbGl0KCcgJyk7XHJcblxyXG5cdFx0Y2xhc3NOYW1lcy5mb3JFYWNoKGZ1bmN0aW9uKG5hbWUpIHtcclxuXHRcdFx0ZWxlbWVudC5jbGFzc0xpc3QuYWRkKG5hbWUpO1xyXG5cdFx0fSk7XHJcblx0XHRcclxuXHRcdHJldHVybiBlbGVtZW50O1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogUmVtb3ZlcyBjbGFzcyBmcm9tIGEgZ2l2ZW4gZWxlbWVudC5cclxuXHQgKiBcclxuXHQgKiBAcGFyYW0gb2JqZWN0IHwgZWxlbWVudFxyXG5cdCAqIEBwYXJhbSBzdHJpbmcgfCBjbGFzc05hbWVcclxuXHQgKiBAcmV0dXJuIG9iamVjdFxyXG5cdCAqL1xyXG5cdHN0YXRpYyByZW1vdmVDbGFzcyhlbGVtZW50LCBjbGFzc05hbWUpIFxyXG5cdHtcclxuXHRcdGlmKGVsZW1lbnQgPT0gbnVsbCkge1xyXG5cdFx0XHR0aHJvdyBuZXcgSW52YWxpZEFyZ3VtZW50RXhjZXB0aW9uJDE7XHJcblx0XHR9XHJcblxyXG5cdFx0aWYoY2xhc3NOYW1lID09ICcnKSB7XHJcblx0XHRcdGVsZW1lbnQuY2xhc3NOYW1lID0gJyc7XHJcblx0XHR9IGVsc2Uge1xyXG5cclxuXHRcdFx0bGV0IGNsYXNzTmFtZXMgPSBjbGFzc05hbWUuc3BsaXQoJyAnKTtcclxuXHJcblx0XHRcdGNsYXNzTmFtZXMuZm9yRWFjaChmdW5jdGlvbihuYW1lKSB7XHJcblx0XHRcdFx0ZWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKG5hbWUpO1xyXG5cdFx0XHR9KTtcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gZWxlbWVudDtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEFkZHMgc3R5bGUgdGFnIHdpdGggZ2l2ZW4gaWQgYW5kIGNzcyB0byB0aGUgRE9NLlxyXG5cdCAqIFxyXG5cdCAqIEBwYXJhbSBzdHJpbmcgfCBpZFxyXG5cdCAqIEBwYXJhbSBzdHJpbmcgfCBjc3NcclxuXHQgKiBAcmV0dXJuIHZvaWRcclxuXHQgKi9cclxuXHRzdGF0aWMgYWRkU3R5bGUoaWQsIGNzcykgXHJcblx0e1xyXG5cdFx0aWYgKHR5cGVvZiBjc3MgIT0gJ3N0cmluZycpIHtcclxuXHRcdFx0dGhyb3cgbmV3IEludmFsaWRBcmd1bWVudEV4Y2VwdGlvbiQxO1xyXG5cdFx0fVxyXG5cclxuXHRcdGxldCBoZWFkID0gZG9jdW1lbnQuaGVhZCB8fCBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnaGVhZCcpWzBdO1xyXG5cdFx0bGV0IHN0eWxlVGFnID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3R5bGUnKTtcclxuXHJcblx0XHQvLyBwaXBlIGl0IHRocm91Z2ggdGhlIG1pbmZpZXJcclxuXHQgICAgbGV0IENTUyA9IHRoaXMubWluaWZ5Q3NzKGNzcyk7XHJcblx0ICAgIC8vIGFkZGluZyBpdCB0byB0aGUgc3R5bGV0YWdcclxuXHQgICAgc3R5bGVUYWcuaW5uZXJIVE1MID0gQ1NTO1xyXG5cdCAgICAvLyBnaXZlIGFuIGlkIHRvIHJlY29nbml6ZSB0aGUgc3R5bGUgdGFnXHJcblx0XHRzdHlsZVRhZy5zZXRBdHRyaWJ1dGUoJ2lkJywgaWQpO1xyXG5cdFx0Ly8gYXBwZW5kaW5nIHRoYXQgc3R5bGUgdGFnIHRvIHRoZSBET00gaGVhZCB0YWdcclxuXHRcdGhlYWQuYXBwZW5kQ2hpbGQoc3R5bGVUYWcpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQ3JlYXRlcyBhbiBlbGVtZW50IHdpdGggdGhlIGdpdmVuIG9wdGlvbnMuXHJcblx0ICogXHJcblx0ICogQHBhcmFtIHN0cmluZyB8IGVsZW1lbnRUeXBlXHJcblx0ICogQHBhcmFtIG9iamVjdCB8IG9wdGlvbnNcclxuXHQgKiBAcmV0dXJuIEhUTUxFbGVtZW50XHJcblx0ICovXHJcblx0c3RhdGljIGNyZWF0ZUVsZW1lbnQoZWxlbWVudFR5cGUsIG9wdGlvbnMpXHJcblx0e1xyXG5cdFx0bGV0IGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KGVsZW1lbnRUeXBlKTtcclxuXHRcclxuXHRcdGlmIChvcHRpb25zID09PSB1bmRlZmluZWQpIHtcclxuXHRcdFx0cmV0dXJuIGVsZW1lbnQ7XHJcblx0XHR9XHJcblxyXG5cdFx0Zm9yIChsZXQgb3B0aW9uIGluIG9wdGlvbnMpIHtcclxuXHRcdFx0aWYob3B0aW9uID09ICd0ZXh0Jykge1xyXG5cdFx0XHRcdGVsZW1lbnQuaW5uZXJIVE1MID0gb3B0aW9uc1tvcHRpb25dO1xyXG5cdFx0XHRcdGNvbnRpbnVlO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRlbGVtZW50LnNldEF0dHJpYnV0ZShvcHRpb24sIG9wdGlvbnNbb3B0aW9uXSk7XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIGVsZW1lbnQ7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBUb2dnbGVzIHRoZSBnaXZlbiBjbGFzc2VzLlxyXG5cdCAqIFxyXG5cdCAqIEBwYXJhbSBvYmplY3QgfCBlbGVtZW50XHJcblx0ICogQHBhcmFtIHN0cmluZyB8IGNsYXNzTmFtZVxyXG5cdCAqIEByZXR1cm4gYm9vbFxyXG5cdCAqL1xyXG5cdHN0YXRpYyB0b2dnbGVDbGFzcyhlbGVtZW50LCBjbGFzc05hbWUsIHNlY29uZENsYXNzTmFtZSlcclxuXHR7XHJcblx0XHRpZiAoZWxlbWVudCA9PSBudWxsIHx8IHR5cGVvZiBlbGVtZW50ID09ICd1bmRlZmluZWQnKSB7XHJcblx0XHRcdHRocm93IG5ldyBJbnZhbGlkQXJndW1lbnRFeGNlcHRpb24kMTtcclxuXHRcdH1cclxuXHJcblx0XHRzZWNvbmRDbGFzc05hbWUgPSBzZWNvbmRDbGFzc05hbWUgfHwgdW5kZWZpbmVkO1xyXG5cclxuXHRcdGlmKHNlY29uZENsYXNzTmFtZSkge1xyXG5cdFx0XHRlbGVtZW50LmNsYXNzTGlzdC50b2dnbGUoc2Vjb25kQ2xhc3NOYW1lKTtcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gZWxlbWVudC5jbGFzc0xpc3QudG9nZ2xlKGNsYXNzTmFtZSk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBGaW5kcyBhbiBlbGVtZW50IGluc2lkZSBvZiBwYXJlbnQuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gc3RyaW5nIHwgc2VsZWN0b3JcclxuXHQgKiBAcGFyYW0gb2JqZWN0IHwgY29udGV4dFxyXG5cdCAqIEByZXR1cm4gbWl4ZWRcclxuXHQgKi9cclxuXHRzdGF0aWMgZmluZChzZWxlY3RvciwgY29udGV4dCA9IHdpbmRvdy5kb2N1bWVudCkgXHJcblx0e1xyXG5cdFx0cmV0dXJuIHF1ZXJ5RWxlbWVudChzZWxlY3RvciwgY29udGV4dCk7XHJcblx0fVxyXG59XHJcblxyXG4vKipcclxuICogUXVlcmllcyBhbiBlbGVtZW50IGZyb20gdGhlIERPTS5cclxuICpcclxuICogQHBhcmFtIHN0cmluZyB8IHNlbGVjdG9yXHJcbiAqIEBwYXJhbSBvYmplY3QgfCBwYXJlbnRFbGVtZW50XHJcbiAqIEByZXR1cm4gbWl4ZWRcclxuICovXHJcbmZ1bmN0aW9uIHF1ZXJ5RWxlbWVudChzZWxlY3RvciwgcGFyZW50RWxlbWVudCkgXHJcbntcclxuXHRsZXQgZWxlbWVudCA9IHBhcmVudEVsZW1lbnQucXVlcnlTZWxlY3RvckFsbChzZWxlY3Rvcik7XHJcblxyXG5cdGlmIChlbGVtZW50Lmxlbmd0aCA9PSAwKSB7XHJcblx0XHRyZXR1cm4gbnVsbDtcclxuXHR9XHJcblxyXG5cdHJldHVybiAoZWxlbWVudC5sZW5ndGggPiAxKSA/IGVsZW1lbnQgOiBlbGVtZW50WzBdO1xyXG59XHJcblxyXG4vKipcclxuICogQ2hlY2tzIGlmIHBhcmVudCBoYXMgY2hpbGQuXHJcbiAqXHJcbiAqIEBwYXJhbSBvYmplY3QgfCBwYXJlbnRFbGVtZW50XHJcbiAqIEBwYXJhbSBvYmplY3QgfCBjaGlsZEVsZW1lbnRcclxuICogQHJldHVybiBib29sXHJcbiAqL1xyXG5mdW5jdGlvbiBoYXNDaGlsZChwYXJlbnRFbGVtZW50LCBjaGlsZEVsZW1lbnQpIFxyXG57XHJcbiAgICAgbGV0IG5vZGUgPSBjaGlsZEVsZW1lbnQucGFyZW50Tm9kZTtcclxuICAgICBcclxuICAgICB3aGlsZSAobm9kZSAhPSBudWxsKSB7XHJcbiAgICAgICAgIGlmIChub2RlID09IHBhcmVudEVsZW1lbnQpIHtcclxuICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICB9XHJcbiAgICAgICAgIG5vZGUgPSBub2RlLnBhcmVudE5vZGU7XHJcbiAgICAgfVxyXG4gICAgIFxyXG4gICAgIHJldHVybiBmYWxzZTtcclxufVxuXG4vKipcclxuICogQGZpbGUgXHJcbiAqIENvbW1vbiBjbGFzcy5cclxuICpcclxuICogQWRkcyBzb21lIHVzZWZ1bCBmdW5jdGlvbmFsaXR5IGZvclxyXG4gKiBjb21tb24gdGFza3MgLSBkYXRhIGNoZWNrcyBvciBkYXRhIG1hbmlwdWxhdGlvbi5cclxuICovXHJcblxyXG5jbGFzcyBDb21tb25cclxue1xyXG5cdC8qKlxyXG5cdCAqIEV4dGVuZCBhbiBvYmplY3QuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gb2JqZWN0IHwgY3VycmVudE9iamVjdFxyXG5cdCAqIEBwYXJhbSBvYmplY3QgfCBuZXdPYmplY3RcclxuXHQgKiBAcmV0dXJuIG9iamVjdFxyXG5cdCAqL1xyXG5cdHN0YXRpYyBleHRlbmQoY3VycmVudE9iamVjdCwgbmV3T2JqZWN0KSB7XHJcblx0XHR2YXIgZXh0ZW5kZWQgPSB7fTtcclxuXHQgICAgdmFyIHByb3A7XHJcblxyXG5cdCAgICBmb3IgKHByb3AgaW4gY3VycmVudE9iamVjdCkge1xyXG5cdCAgICAgICAgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChjdXJyZW50T2JqZWN0LCBwcm9wKSkge1xyXG5cdCAgICAgICAgICAgIGV4dGVuZGVkW3Byb3BdID0gY3VycmVudE9iamVjdFtwcm9wXTtcclxuXHQgICAgICAgIH1cclxuXHQgICAgfVxyXG5cclxuXHQgICAgZm9yIChwcm9wIGluIG5ld09iamVjdCkge1xyXG5cdCAgICAgICAgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChuZXdPYmplY3QsIHByb3ApKSB7XHJcblx0ICAgICAgICAgICAgZXh0ZW5kZWRbcHJvcF0gPSBuZXdPYmplY3RbcHJvcF07XHJcblx0ICAgICAgICB9XHJcblx0ICAgIH1cclxuXHJcblx0ICAgIHJldHVybiBleHRlbmRlZDtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIENoZWNrcyBmb3IgYSBuZWVkbGUgaW4gaHlzdGFjayBhcnJheS5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSBtaXhlZCB8IG5lZWRsZVxyXG5cdCAqIEBwYXJhbSBvYmplY3QgfCBvYmplY3RcclxuXHQgKiBAcmV0dXJuIGJvb2xcclxuXHQgKlxyXG5cdCAqL1xyXG5cdHN0YXRpYyBpbl9hcnJheShuZWVkbGUsIGh5c3RhY2spIHtcclxuXHRcdGlmKGh5c3RhY2suY29uc3RydWN0b3IgIT09IEFycmF5KSB7XHJcblx0XHRcdHRocm93IG5ldyBJbnZhbGlkQXJndW1lbnRFeGNlcHRpb24kMTtcclxuXHRcdH1cclxuXHJcblx0XHRmb3IodmFyIGkgPSAwOyBpIDw9IGh5c3RhY2subGVuZ3RoOyBpKyspIHtcclxuXHRcdFx0aWYobmVlZGxlID09IGh5c3RhY2tbaV0pIHtcclxuXHRcdFx0XHRyZXR1cm4gdHJ1ZTtcdFxyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0XHJcblx0XHRyZXR1cm4gZmFsc2U7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBDaGVja3MgaWYgYW4gb2JqZWN0IGlzIGVtcHR5LlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIG9iamVjdCB8IG9iamVjdFxyXG5cdCAqIEByZXR1cm4gYm9vbFxyXG5cdCAqL1xyXG5cdHN0YXRpYyBlbXB0eU9iamVjdChvYmplY3QpIHtcclxuXHRcdGZvciAobGV0IHByb3AgaW4gb2JqZWN0KSB7XHJcblx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gdHJ1ZTtcclxuXHR9XHJcblxyXG5cclxuXHQvKipcclxuXHQgKiBDaGVja3MgaWYgYSBnaXZlbiBvYmplY3QgY29udGFpbmVkIGluIGFuIGFycmF5LlxyXG5cdCAqIFxyXG5cdCAqIEBwYXJhbSBvYmplY3QgfCBvYmplY3RcclxuXHQgKiBAcGFyYW0gYXJyYXkgfCBoYXlzdGFja1xyXG5cdCAqIEByZXR1cm4gYm9vbFxyXG5cdCAqL1xyXG5cdHN0YXRpYyBjb250YWluc09iamVjdChvYmplY3QsIGh5c3RhY2spIFxyXG5cdHtcclxuXHQgICAgbGV0IGk7XHJcblxyXG5cdCAgICBmb3IgKGkgPSAwOyBpIDwgaHlzdGFjay5sZW5ndGg7IGkrKykge1xyXG5cdCAgICAgICAgaWYgKHR5cGVvZiBvYmplY3QgPT0gJ3N0cmluZycgJiYgaHlzdGFja1tpXS5jb25zdHJ1Y3Rvci5uYW1lID09PSBvYmplY3QpIHtcclxuXHQgICAgICAgIFx0cmV0dXJuIHRydWU7XHJcblx0ICAgICAgICB9XHJcblxyXG5cdCAgICAgICAgaWYgKGh5c3RhY2tbaV0gPT09IG9iamVjdCkge1xyXG5cdCAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG5cdCAgICAgICAgfVxyXG5cdCAgICB9XHJcblxyXG5cdCAgICByZXR1cm4gZmFsc2U7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBDaGVja3MgaWYgYSBnaXZlbiBwYXJhbWV0ZXIgaXMgYW4gb2JqZWN0LlxyXG5cdCAqIFxyXG5cdCAqIEBwYXJhbSBvYmplY3QgfCBvYmplY3RcclxuXHQgKiBAcmV0dXJuIGJvb2xcclxuXHQgKi9cclxuXHRzdGF0aWMgaXNPYmplY3Qob2JqZWN0KSBcclxuXHR7XHJcblx0XHRyZXR1cm4gdHlwZW9mIG9iamVjdCA9PSAnb2JqZWN0JztcclxuXHR9XHJcbn1cblxuY2xhc3MgSW52YWxpZERhdGFTdHJ1Y3R1cmVFeGNlcHRpb24gIGV4dGVuZHMgRXJyb3Jcclxue1xyXG5cdGNvbnN0cnVjdG9yKCkgXHJcblx0eyBcclxuICAgIFx0c3VwZXIoKTtcclxuICAgIH1cclxufVxuXG4vKipcclxuICogQGZpbGUgXHJcbiAqIFJlcXVlc3QgY2xhc3MuXHJcbiAqXHJcbiAqIEhhbmRsZXMgYWpheCByZXF1ZXN0cyBQT1NULCBHRVQgZXRjLi4uXHJcbiAqL1xyXG5cclxuLyoqXHJcbiAqIFN0b3JlcyB0aGUgZGVmYXVsdCBzZXR0aW5ncy5cclxuICpcclxuICogQHZhciBvYmplY3RcclxuICovXHJcblxyXG5sZXQgZGVmYXVsdFNldHRpbmdzJDEgPSB7XHJcblx0aGVhZGVyczoge1xyXG5cdFx0J0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJ1xyXG5cdH0sXHJcblx0YXN5bmM6IHRydWVcclxufTtcclxuXHJcbmNsYXNzIFJlcXVlc3Rcclxue1xyXG5cdC8qKlxyXG5cdCAqIC0gSW5pdGlhbGl6ZSB0aGUgc2V0dGluZ3Mgb2JqZWN0LlxyXG5cdCAqIC0gSW5pdGlhbGl6ZSB0aGUgeGhyIG9iamVjdC5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSBvYmplY3QgfCBzZXR0aW5nc1xyXG5cdCAqIEByZXR1cm4gdm9pZFxyXG5cdCAqL1xyXG5cdGNvbnN0cnVjdG9yKHNldHRpbmdzKVxyXG5cdHtcclxuXHRcdHRoaXMueGhyID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCkgfHwgbmV3IEFjdGl2ZVhPYmplY3QoXCJNaWNyb3NvZnQuWE1MSFRUUFwiKTtcclxuXHRcdHRoaXMuc2V0dGluZ3MgPSBDb21tb24uZXh0ZW5kKGRlZmF1bHRTZXR0aW5ncyQxLCBzZXR0aW5ncyk7XHJcblx0XHR0aGlzLnNldERlZmF1bHRSZXF1ZXN0SGVhZGVyKCk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBTZXRzIHRoZSBkZWZhdWx0IHJlcXVlc3QgaGVhZGVycy5cclxuXHQgKlxyXG5cdCAqIEByZXR1cm4gdm9pZFxyXG5cdCAqL1xyXG5cdHNldERlZmF1bHRSZXF1ZXN0SGVhZGVyKClcclxuXHR7XHJcblx0XHRsZXQgaGVhZGVyO1xyXG5cdFx0bGV0IGhlYWRlcnMgPSB0aGlzLnNldHRpbmdzLmhlYWRlcnM7XHJcblx0XHRsZXQgYXN5bmMgPSB0aGlzLnNldHRpbmdzLmFzeW5jO1xyXG5cdFx0bGV0IG9wZW4gPSBYTUxIdHRwUmVxdWVzdC5wcm90b3R5cGUub3BlbjtcclxuXHRcdGxldCBzZXRSZXF1ZXN0SGVhZGVyID0gWE1MSHR0cFJlcXVlc3QucHJvdG90eXBlLnNldFJlcXVlc3RIZWFkZXI7XHJcblxyXG5cdFx0WE1MSHR0cFJlcXVlc3QucHJvdG90eXBlLm9wZW4gPSBmdW5jdGlvbigpIHtcclxuXHRcdFx0dmFyIHJlc3BvbnNlID0gb3Blbi5hcHBseSh0aGlzLCBhcmd1bWVudHMsIGFzeW5jKTtcclxuXHJcblx0XHRcdGZvciAoaGVhZGVyIGluIGhlYWRlcnMpIHtcclxuXHRcdFx0XHR0aGlzLnNldFJlcXVlc3RIZWFkZXIoaGVhZGVyLCBoZWFkZXJzW2hlYWRlcl0pO1xyXG5cdFx0XHR9XHJcblxyXG5cdCAgXHRcdHJldHVybiByZXNwb25zZTtcclxuXHRcdH07XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBNYWtlcyBhIFBPU1QgcmVxdWVzdC5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSBvYmplY3QgfCBvcHRpb25zXHJcblx0ICogQHJldHVybiBQcm9taXNlXHJcblx0ICovXHJcblx0cG9zdChvcHRpb25zKVxyXG5cdHtcclxuXHRcdGxldCB4aHIgPSB0aGlzLnhocjtcclxuXHJcblx0XHRpZihvcHRpb25zLmhhc093blByb3BlcnR5KCdiZWZvcmUnKSAmJiB0eXBlb2Ygb3B0aW9ucy5iZWZvcmUgPT0gJ2Z1bmN0aW9uJykge1xyXG5cdFx0XHRvcHRpb25zLmJlZm9yZS5jYWxsKHRoaXMpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcclxuXHRcdFx0aWYodHlwZW9mIG9wdGlvbnMgIT09ICdvYmplY3QnKSB7XHJcblx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKCdnZXQgZXhwZWN0aW5nIGEganNvbiBvYmplY3QgdG8gYmUgcGFzc2VkIGFzIGFuIGFyZ3VtZW50LCBidXQgJysgdHlwZW9mIG9wdGlvbnMgKyAnIHdhcyBwYXNzZWQuJyk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdG9wdGlvbnMuZGF0YSA9IG9wdGlvbnMuZGF0YSB8fCB7fTtcclxuXHJcblx0XHRcdGlmKHR5cGVvZiBvcHRpb25zLmRhdGEgIT09ICdvYmplY3QnKSB7XHJcblx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKCdkYXRhIHByb3BlcnR5IGV4cGVjdGluZyBhIGpzb24gb2JqZWN0IHRvIGJlIHBhc3NlZCBhcyBhbiBhcmd1bWVudCwgYnV0ICcgKyB0eXBlb2Ygb3B0aW9ucy5kYXRhICsgJyB3YXMgcGFzc2VkLicpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHR4aHIub3BlbignUE9TVCcsIG9wdGlvbnMudXJsLCB0cnVlKTtcclxuXHJcblx0XHRcdHhoci5yZXNwb25zZVR5cGUgPSBvcHRpb25zLmRhdGFUeXBlIHx8ICdqc29uJztcclxuXHRcdFx0eGhyLnRpbWVvdXQgPSBvcHRpb25zLnRpbWVvdXQgfHwgMzAwMDtcclxuXHJcblx0XHRcdHhoci5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBmdW5jdGlvbigpIHtcclxuXHRcdFx0ICAgIGlmKHRoaXMucmVhZHlTdGF0ZSAhPSA0IHx8IHRoaXMuc3RhdHVzICE9IDIwMCkge1xyXG5cdFx0XHQgICAgXHRyZXR1cm47XHJcblx0XHRcdCAgICB9XHJcblx0ICAgICAgIFx0XHJcbiAgICAgICBcdFx0XHRyZXNvbHZlKHRoaXMucmVzcG9uc2UpO1xyXG4gICAgICAgXHRcdFx0XHJcbiAgICAgICBcdFx0XHRpZihvcHRpb25zLmhhc093blByb3BlcnR5KCdhZnRlcicpICYmIHR5cGVvZiBvcHRpb25zLmFmdGVyID09ICdmdW5jdGlvbicpIHtcclxuXHRcdFx0XHRcdG9wdGlvbnMuYWZ0ZXIuY2FsbCh0aGlzKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH07XHJcblxyXG5cdFx0XHR4aHIub25lcnJvciA9IGZ1bmN0aW9uKG1lc3NhZ2UpIHtcclxuXHRcdFx0XHRvcHRpb25zLmVycm9yKG1lc3NhZ2UpO1xyXG5cdFx0XHRcdHJlamVjdChtZXNzYWdlKTtcclxuXHRcdFx0fTtcclxuXHJcblx0XHRcdGlmKCEgb3B0aW9ucy5kYXRhKSB7XHJcblx0XHRcdFx0eGhyLnNlbmQobnVsbCk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHZhciBxdWVyeVN0cmluZyA9IE9iamVjdC5rZXlzKG9wdGlvbnMuZGF0YSkubWFwKGZ1bmN0aW9uKGtleSkge1xyXG5cdFx0ICAgICAgICAgICAgcmV0dXJuIGVuY29kZVVSSUNvbXBvbmVudChrZXkpICsgJz0nICtcclxuXHRcdCAgICAgICAgICAgICAgICBcdGVuY29kZVVSSUNvbXBvbmVudChvcHRpb25zLmRhdGFba2V5XSk7XHJcblx0XHQgICAgICAgIFx0fSkuam9pbignJicpO1xyXG5cclxuXHRcdFx0eGhyLnNlbmQocXVlcnlTdHJpbmcpO1xyXG5cdFx0fSk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBNYWtlcyBhIEdFVCBhamF4IHJlcXVlc3QuXHJcblx0ICogXHJcblx0ICogQHBhcmFtIG9iamVjdCB8IG9wdGlvbnNcclxuXHQgKiBAcmV0dXJuIFByb21pc2VcclxuXHQgKi9cclxuXHRnZXQob3B0aW9ucylcclxuXHR7XHJcblx0XHRsZXQgeGhyID0gdGhpcy54aHI7XHJcblxyXG5cdFx0aWYob3B0aW9ucy5oYXNPd25Qcm9wZXJ0eSgnYmVmb3JlJykgJiYgdHlwZW9mIG9wdGlvbnMuYmVmb3JlID09ICdmdW5jdGlvbicpIHtcclxuXHRcdFx0b3B0aW9ucy5iZWZvcmUuY2FsbCh0aGlzKTtcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XHJcblx0XHRcdGlmKHR5cGVvZiBvcHRpb25zICE9PSAnb2JqZWN0Jykge1xyXG5cdFx0XHRcdHRocm93IG5ldyBFcnJvcignZ2V0IGV4cGVjdGluZyBhIGpzb24gb2JqZWN0IHRvIGJlIHBhc3NlZCBhcyBhbiBhcmd1bWVudCwgYnV0ICcrIHR5cGVvZiBvcHRpb25zICsgJyB3YXMgcGFzc2VkLicpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRvcHRpb25zLmRhdGEgPSBvcHRpb25zLmRhdGEgfHwge307XHJcblxyXG5cdFx0XHRpZih0eXBlb2Ygb3B0aW9ucy5kYXRhICE9PSAnb2JqZWN0Jykge1xyXG5cdFx0XHRcdHRocm93IG5ldyBFcnJvcignZGF0YSBwcm9wZXJ0eSBleHBlY3RpbmcgYSBqc29uIG9iamVjdCB0byBiZSBwYXNzZWQgYXMgYW4gYXJndW1lbnQsIGJ1dCAnICsgdHlwZW9mIG9wdGlvbnMuZGF0YSArICcgd2FzIHBhc3NlZC4nKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0eGhyLm9wZW4oJ0dFVCcsIG9wdGlvbnMudXJsLCB0cnVlKTtcclxuXHJcblx0XHRcdHhoci5yZXNwb25zZVR5cGUgPSBvcHRpb25zLmRhdGFUeXBlIHx8ICdqc29uJztcclxuXHRcdFx0eGhyLnRpbWVvdXQgPSBvcHRpb25zLnRpbWVvdXQgfHwgMzAwMDtcclxuXHJcblx0XHRcdHhoci5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBmdW5jdGlvbigpIHtcclxuXHRcdFx0ICAgIGlmKHRoaXMucmVhZHlTdGF0ZSAhPSA0IHx8IHRoaXMuc3RhdHVzICE9IDIwMCkge1xyXG5cdFx0XHQgICAgXHRyZXR1cm47XHJcblx0XHRcdCAgICB9XHJcblx0ICAgICAgIFx0XHJcbiAgICAgICBcdFx0XHRyZXNvbHZlKHRoaXMucmVzcG9uc2UpO1xyXG4gICAgICAgXHRcdFx0XHJcbiAgICAgICBcdFx0XHRpZihvcHRpb25zLmhhc093blByb3BlcnR5KCdhZnRlcicpICYmIHR5cGVvZiBvcHRpb25zLmFmdGVyID09ICdmdW5jdGlvbicpIHtcclxuXHRcdFx0XHRcdG9wdGlvbnMuYWZ0ZXIuY2FsbCh0aGlzKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH07XHJcblxyXG5cdFx0XHR4aHIub25lcnJvciA9IGZ1bmN0aW9uKG1lc3NhZ2UpIHtcclxuXHRcdFx0XHRvcHRpb25zLmVycm9yKG1lc3NhZ2UpO1xyXG5cdFx0XHRcdHJlamVjdChtZXNzYWdlKTtcclxuXHRcdFx0fTtcclxuXHJcblx0XHRcdGlmKCEgb3B0aW9ucy5kYXRhKSB7XHJcblx0XHRcdFx0eGhyLnNlbmQobnVsbCk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHZhciBxdWVyeVN0cmluZyA9IE9iamVjdC5rZXlzKG9wdGlvbnMuZGF0YSkubWFwKGZ1bmN0aW9uKGtleSkge1xyXG5cdFx0ICAgICAgICAgICAgcmV0dXJuIGVuY29kZVVSSUNvbXBvbmVudChrZXkpICsgJz0nICtcclxuXHRcdCAgICAgICAgICAgICAgICBcdGVuY29kZVVSSUNvbXBvbmVudChvcHRpb25zLmRhdGFba2V5XSk7XHJcblx0XHQgICAgICAgIFx0fSkuam9pbignJicpO1xyXG5cclxuXHRcdFx0eGhyLnNlbmQocXVlcnlTdHJpbmcpO1xyXG5cdFx0fSk7XHJcblx0fVxyXG59XG5cbmxldCBkZWZhdWx0TWVzc2FnZSQxID0gJ3RyeWluZyB0byBiaW5kIGFuIGFscmVhZHkgZXhpc3RpbmcgYm91bmQuJztcclxuXHJcbmNsYXNzIEludmFsaWRCaW5kaW5nRXhjZXB0aW9uIGV4dGVuZHMgRXJyb3Jcclxue1xyXG5cdGNvbnN0cnVjdG9yKCkgXHJcblx0eyBcclxuICAgIFx0c3VwZXIoKTtcclxuICAgIFx0Y29uc29sZS5lcnJvcignSW52YWxpZEJpbmRpbmdFeGNlcHRpb246ICcgKyBtZXNzYWdlIHx8IGRlZmF1bHRNZXNzYWdlJDEpO1xyXG4gICAgfVxyXG59XG5cbi8qKlxyXG4gKiBAZmlsZSBcclxuICogQ29udGFpbmVyIGNsYXNzLlxyXG4gKlxyXG4gKiBIYW5kbGVzL0NvbnRyb2xzIHRoZSBkZXBlbmRlbmNpZXMgb2YgZWNvbW1lcmNlLlxyXG4gKi9cclxuXHJcbi8qKlxyXG4gKiBTdG9yZXMgdGhlIGluc3RhbmNlc1xyXG4gKlxyXG4gKiBAdmFyIGFycmF5XHJcbiAqL1xyXG5sZXQgaW5zdGFuY2VzID0gW107XHJcblxyXG5jbGFzcyBDb250YWluZXIgXHJcbntcclxuXHQvKipcclxuXHQgKiBCaW5kcyBrZXkgdG8gY29uY3JldGUgY2xhc3MuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gc3RyaW5nIHwga2V5XHJcblx0ICogQHBhcmFtIGNsYXNzIHwgY29uY3JldGVcclxuXHQgKiBAcmV0dXJuIHZvaWRcclxuXHQgKi9cclxuXHRiaW5kKGtleSwgY29uY3JldGUpIFxyXG5cdHtcclxuXHRcdGlmICh0eXBlb2Yga2V5ICE9ICdzdHJpbmcnKSB7XHJcblx0XHRcdHRocm93IG5ldyBJbnZhbGlkQXJndW1lbnRFeGNlcHRpb24kMSgnYmluZCgpIGV4cGVjdHMgdGhlIGZpcnN0IHBhcmFtZXRlciB0byBiZSBzdHJpbmcsIGJ1dCAnICsgdHlwZW9mIGtleSArICcgd2FzIHBhc3NlZCBpbnN0ZWFkLicpO1xyXG5cdFx0fVxyXG5cclxuXHRcdGlmICh0eXBlb2YgY29uY3JldGUgIT0gJ2Z1bmN0aW9uJykgeyBcclxuXHRcdFx0dGhyb3cgbmV3IEludmFsaWRBcmd1bWVudEV4Y2VwdGlvbiQxKCdiaW5kKCkgZXhwZWN0cyB0aGUgc2Vjb25kIHBhcmFtZXRlciB0byBiZSBhIGZ1bmN0aW9uLCBidXQgJyArIHR5cGVvZiBjb25jcmV0ZSArICcgd2FzIHBhc3NlZCBpbnN0ZWFkLicpO1xyXG5cdFx0fVxyXG5cclxuXHRcdGlmICh0eXBlb2YgdGhpc1trZXldICE9ICd1bmRlZmluZWQnKSB7XHJcblx0XHRcdHRocm93IG5ldyBJbnZhbGlkQmluZGluZ0V4Y2VwdGlvbignYmluZCgpIHJlY2lldmVkIGFuIGFscmVhZHkgZXhpc3RpbmcgYmluZC4nKTtcclxuXHRcdH1cclxuXHJcblx0XHR0aGlzW2tleV0gPSBjb25jcmV0ZS5iaW5kKGNvbmNyZXRlLCB0aGlzKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFNldHMgYW4gaW5zdGFuY2UuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gc3RyaW5nIHwga2V5XHJcblx0ICogQHBhcmFtIG9iamVjdCB8IGluc3RhbmNlXHJcblx0ICogQHBhcmFtIHN0cmluZyB8IGFsaWFzXHJcblx0ICogQHJldHVybiB2b2lkXHJcblx0ICovXHJcblx0c2V0SW5zdGFuY2Uoa2V5LCBpbnN0YW5jZSwgYWxpYXMgPSBudWxsKSBcclxuXHR7XHJcblx0XHRpZiAodHlwZW9mIGtleSAhPSAnc3RyaW5nJykge1xyXG5cdFx0XHR0aHJvdyBuZXcgSW52YWxpZEFyZ3VtZW50RXhjZXB0aW9uJDEoJ3NldEluc3RhY2UoKSBleHBlY3RzIHRoZSBmaXJzdCBwYXJhbWV0ZXIgdG8gYmUgYSBzdHJpbmcsIGJ1dCAnICsgdHlwZW9mIGtleSArICcgd2FzIHBhc3NlZCBpbnN0ZWFkLicpO1xyXG5cdFx0fVxyXG5cclxuXHRcdGlmICh0eXBlb2YgaW5zdGFuY2UgIT0gJ29iamVjdCcpIHtcclxuXHRcdFx0dGhyb3cgbmV3IEludmFsaWRBcmd1bWVudEV4Y2VwdGlvbiQxKCdzZXRJbnN0YW5jZSgpIGV4cGVjdHMgdGhlIHNlY29uZCBwYXJhbWV0ZXIgdG8gYmUgYW4gb2JqZWN0LCBidXQgJyArIHR5cGVvZiBpbnN0YW5jZSArICcgd2FzIHBhc3NlZCBpbnN0ZWFkLicpO1xyXG5cdFx0fVxyXG5cclxuXHRcdGluc3RhbmNlc1trZXldID0gaW5zdGFuY2U7XHJcblx0XHRpbnN0YW5jZXNbYWxpYXNdID0gaW5zdGFuY2U7XHJcblx0XHR0aGlzW2tleV0gPSBpbnN0YW5jZTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFJlc29sdmVzIGFuIGluc3RhbmNlIG91dCBvZiBcclxuXHQgKiB0aGUgaW9jIGNvbnRhaW5lci5cclxuXHQgKiBcclxuXHQgKiBAcGFyYW0gc3RyaW5nIHwga2V5XHJcblx0ICogQHJldHVybiBvYmplY3RcclxuXHQgKi9cclxuXHRnZXRJbnN0YW5jZShrZXkpIFxyXG5cdHtcclxuXHRcdGlmKHR5cGVvZiBrZXkgIT0gJ3N0cmluZycpIHtcclxuXHRcdFx0dGhyb3cgbmV3IEludmFsaWRBcmd1bWVudEV4Y2VwdGlvbiQxKCdnZXRJbnN0YWNlKCkgZXhwZWN0cyB0aGUgZmlyc3QgcGFyYW1ldGVyIHRvIGJlIGEgc3RyaW5nLCBidXQgJyArIHR5cGVvZiBrZXkgKyAnIHdhcyBwYXNzZWQgaW5zdGVhZC4nKTtcclxuXHRcdH1cclxuXHJcblx0XHRpZih0eXBlb2Yga2V5ID09ICdvYmplY3QnKSB7XHJcblx0XHRcdHJldHVybiBpbnN0YW5jZXNba2V5LmNvbnN0cnVjdG9yLm5hbWVdIHx8IG51bGw7XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIGluc3RhbmNlc1trZXldIHx8IG51bGw7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBDaGVja3MgaWYgYW4gaW5zdGFuY2UgZXhpc3QuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gbWl4ZWQgfCBpbnN0YW5jZVxyXG5cdCAqIEByZXR1cm4gYm9vbFxyXG5cdCAqL1xyXG5cdGluc3RhbmNlRXhpc3QoaW5zdGFuY2UpIFxyXG5cdHtcclxuXHRcdGlmICh0eXBlb2YgaW5zdGFuY2UgPT0gJ29iamVjdCcpIHtcclxuXHRcdFx0cmV0dXJuICh0eXBlb2YgaW5zdGFuY2VzW2luc3RhbmNlLmNvbnN0cnVjdG9yLm5hbWVdICE9PSAndW5kZWZpbmVkJyk7XHJcblx0XHR9IGVsc2UgaWYgKHR5cGVvZiBpbnN0YW5jZSA9PSAnc3RyaW5nJykge1xyXG5cdFx0XHRyZXR1cm4gKHR5cGVvZiBpbnN0YW5jZXNbaW5zdGFuY2VdICE9PSAndW5kZWZpbmVkJylcclxuXHRcdH1cclxuXHRcdFxyXG5cdFx0dGhyb3cgbmV3IEludmFsaWRBcmd1bWVudEV4Y2VwdGlvbiQxKCdpbnN0YW5jZUV4aXN0KCkgZXhwZWN0cyB0aGUgZmlyc3QgcGFyYW1ldGVyIHRvIGJlIHN0cmluZyBvciBhbiBvYmplY3QsIGJ1dCAnICsgdHlwZW9mIGluc3RhbmNlICsgJyB3YXMgcGFzc2VkIGluc3RlYWQuJyk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBSZXRyaWV2ZSBhbiBvYmplY3QsIGlmIG5vdCBleGlzdHNcclxuXHQgKiB3aWxsIGNyZWF0ZSBpdCwgc2V0IGl0IGluIHRoZSBpb2MgY29udGFpbmVyXHJcblx0ICogZm9yIGxhdGVyIHVzZSBhbmQgcmV0cmlldmUgaXQuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gbWl4ZWQgfCBvYmplY3QgXHJcblx0ICogQHJldHVybiBvYmplY3RcclxuXHQgKi9cclxuXHRtYWtlKG9iamVjdClcclxuXHR7XHJcblx0XHRsZXQgaW5zdGFuY2UgPSB7fTtcclxuXHRcdGxldCBrZXk7XHJcblxyXG5cdFx0aWYgKHRoaXMuaW5zdGFuY2VFeGlzdChvYmplY3QpKSB7XHJcblx0XHRcdHJldHVybiB0aGlzLmdldEluc3RhbmNlKG9iamVjdCk7XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKHR5cGVvZiBvYmplY3QgPT0gJ29iamVjdCcpIHtcclxuXHRcdFx0aW5zdGFuY2UgPSBvYmplY3Q7XHJcblx0XHRcdGtleSA9IG9iamVjdC5jb25zdHJ1Y3Rvci5uYW1lO1xyXG5cdFx0XHR0aGlzLnNldEluc3RhbmNlKGtleSwgaW5zdGFuY2UpOyBcclxuXHRcdH0gZWxzZSBpZih0eXBlb2Ygb2JqZWN0ID09ICdzdHJpbmcnICYmIHRoaXMuaGFzT3duUHJvcGVydHkob2JqZWN0KSkge1xyXG5cdFx0XHRpbnN0YW5jZSA9IG5ldyB0aGlzW29iamVjdF07XHJcblx0XHRcdGtleSA9IG9iamVjdDtcclxuXHRcdFx0dGhpcy5zZXRJbnN0YW5jZShrZXksIGluc3RhbmNlKTtcdFxyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0dGhyb3cgbmV3IEludmFsaWRCaW5kaW5nRXhjZXB0aW9uKCdUaGUgcGFyYW1ldGVyIHlvdSBwYXNzZWQgY291bGQgbm90IGJlIGJvdW5kZWQgdG8gdGhlIGNvbnRhaW5lciwgcGFyYW1ldGVyOiAnICsgdHlwZW9mIG9iamVjdCk7XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIGluc3RhbmNlO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogUmV0cmlldmUgYWxsIGluc3RhbmNlcy5cclxuXHQgKlxyXG5cdCAqIEByZXR1cm4gYXJyYXlcclxuXHQgKi9cclxuXHRpbnN0YW5jZXMoKSBcclxuXHR7XHJcblx0XHRyZXR1cm4gaW5zdGFuY2VzO1xyXG5cdH1cclxufVxuXG5sZXQgZGVmYXVsdE1lc3NhZ2UkMiA9ICdUaGUgZXZlbnQgeW91IGNhbGxlZCBkb2VzIG5vdCBleGlzdHMgb3IgeW91IHN1cHBsaWVkIHdyb25nIGFyZ3VtZW50JztcclxuXHJcbmNsYXNzIEJhZEV2ZW50Q2FsbEV4Y2VwdGlvbiBleHRlbmRzIEVycm9yXHJcbntcclxuXHRjb25zdHJ1Y3RvcihtZXNzYWdlKSBcclxuXHR7IFxyXG5cdFx0c3VwZXIobWVzc2FnZSk7XHJcbiAgICBcdGNvbnNvbGUuZXJyb3IoJ0JhZEV2ZW50Q2FsbEV4Y2VwdGlvbjogJyArIG1lc3NhZ2UgfHwgZGVmYXVsdE1lc3NhZ2UkMik7XHJcbiAgICB9XHJcbn1cblxuLyoqXHJcbiAqIEBmaWxlIFxyXG4gKiBFdmVudE1hbmFnZXIgY2xhc3MuXHJcbiAqXHJcbiAqIEhhbmRsZXMgc3Vic2NyaXBpb25zIGFuZCBwdWJsaXNoaW5nIG9mIGV2ZW50cy5cclxuICovXHJcblxyXG4vKipcclxuICogU3RvcmVzIHRoZSBldmVudHMgY2FsbGJhY2tzLlxyXG4gKiBcclxuICogQHZhciBhcnJheVxyXG4gKi9cclxubGV0IGV2ZW50cyA9IHt9O1xyXG5cclxuY2xhc3MgRXZlbnRNYW5hZ2VyXHJcbntcclxuXHQvKipcclxuXHQgKiBTdWJzY3JpYmluZyB0byBhbiBldmVudC5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSBzdHJpbmcgfCBuYW1lXHJcblx0ICogQHBhcmFtIGZ1bmN0aW9uIHwgY2FsbGJhY2tcclxuXHQgKiBAcmV0dXJuIHZvaWRcclxuXHQgKi9cclxuXHRzdWJzY3JpYmUobmFtZSwgY2FsbGJhY2spIFxyXG5cdHtcclxuXHRcdGlmICh0eXBlb2YgY2FsbGJhY2sgIT09ICdmdW5jdGlvbicpIHtcclxuXHRcdFx0dGhyb3cgbmV3IEludmFsaWRBcmd1bWVudEV4Y2VwdGlvbjtcclxuXHRcdH1cclxuXHJcblx0XHRpZiAodHlwZW9mIGV2ZW50c1tuYW1lXSA9PSAndW5kZWZpbmVkJykge1xyXG5cdFx0XHRldmVudHNbbmFtZV0gPSBbXTtcclxuXHRcdH1cclxuXHJcblx0XHRldmVudHNbbmFtZV0ucHVzaChjYWxsYmFjayk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBQdWJsaXNoIGFuIGV2ZW50IHRvIGFsbCBzdWJzY3JpYmVycy5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSBzdHJpbmcgfCBuYW1lXHJcblx0ICogQHBhcmFtIGxpc3QgfCBkYXRhXHJcblx0ICogQHJldHVybiB2b2lkXHJcblx0ICovXHJcblx0cHVibGlzaChuYW1lLCAuLi5kYXRhKSBcclxuXHR7XHJcblx0XHRkYXRhID0gZGF0YSB8fCBudWxsO1xyXG5cclxuXHRcdC8vIElmIHRoZXJlIGFyZSBubyBzdWJzY3JpYmVycyBzaW1wbHkgaWdub3JlIHRoYXQgZXZlbnQuXHJcblx0XHRpZiAodHlwZW9mIGV2ZW50c1tuYW1lXSA9PSAndW5kZWZpbmVkJykge1xyXG5cdFx0XHRyZXR1cm47XHJcblx0XHR9XHJcblxyXG5cdFx0ZXZlbnRzW25hbWVdLmZvckVhY2goZnVuY3Rpb24oY2FsbGJhY2spIHtcclxuXHRcdFx0aWYodHlwZW9mIGNhbGxiYWNrICE9ICdmdW5jdGlvbicpIHtcclxuXHRcdFx0XHR0aHJvdyBuZXcgSW52YWxpZEFyZ3VtZW50RXhjZXB0aW9uKCdsaXN0ZW4oKSBzaG91bGQgcmVjaWV2ZSBjYWxsYmFjayBhcyBzZWNvbmQgcGFyYW1ldGVyLCBidXQgJysgdHlwZW9mIGNhbGxiYWNrICsnIHdhcyBwYXNzZWQnKTtcclxuXHRcdFx0fVxyXG5cdFx0XHRcclxuXHRcdFx0cmV0dXJuIGNhbGxiYWNrKC4uLmRhdGEpO1xyXG5cdFx0fSk7XHJcblx0fVxyXG59XG5cbmNsYXNzIENvbXBvbmVudHNFeGNlcHRpb24gZXh0ZW5kcyBFcnJvclxyXG57XHJcblx0Y29uc3RydWN0b3IoKSBcclxuXHR7IFxyXG4gICAgXHRzdXBlcigpO1xyXG4gICAgXHRjb25zb2xlLmVycm9yKGBDb21wb25lbnRzRXhjZXB0aW9uLCBleHBlY3RpbmcgZm9yIGF0IGxlYXN0IG9uZSBjb21wb25lbnRzLCBidXQgbm9uZSB3YXMgZ2l2ZW4sIFxyXG5cdFx0XHRcdFx0XHRcdFx0cGxlYXNlIGFkZCBhdCBsZWFzdCBvbmUgcmVxdWlyZW1lbnQoUHJvZHVjdHMsIFNlcnZpY2VzIG9yL2FuZCBGaWx0ZXIuYCk7XHJcbiAgICB9XHJcbn1cblxuY2xhc3MgTm90SW5QYWdlUmFuZ2VFeGNlcHRpb24gZXh0ZW5kcyBFcnJvclxyXG57XHJcblx0Y29uc3RydWN0b3IoKSBcclxuXHR7IFxyXG4gICAgXHRzdXBlcigpO1xyXG4gICAgXHRjb25zb2xlLmVycm9yKGBOb3RJblBhZ2VSYW5nZUV4Y2VwdGlvbiwgc29ycnksIG5vIG1vcmUgcGFnZXMuYCk7XHJcbiAgICB9XHJcbn1cblxubGV0IGRlZmF1bHRNZXNzYWdlJDMgPSAnSW4gb3JkZXIgdG8gdXNlIGNvbXBvbmVudHMgeW91IG11c3QgcmVnaXN0ZXIgdGhlbSB3aXRoIHRoZSBzaG9wISc7IFxyXG5cclxuY2xhc3MgQ29tcG9uZW50Tm90UmVnaXN0ZXJlZEV4Y2VwdGlvbiBleHRlbmRzIEVycm9yXHJcbntcclxuXHRjb25zdHJ1Y3RvcihtZXNzYWdlKSBcclxuXHR7IFxyXG4gICAgXHRzdXBlcigpO1xyXG4gICAgXHRjb25zb2xlLmVycm9yKCdDb21wb25lbnROb3RSZWdpc3RlcmVkRXhjZXB0aW9uOiAnICsgbWVzc2FnZSB8fCBkZWZhdWx0TWVzc2FnZSQzKTtcclxuICAgIH1cclxufVxuXG5jbGFzcyBFeGNlcHRpb25IYW5kbGVyIGV4dGVuZHMgRXJyb3Jcclxue1xyXG5cdC8qKlxyXG5cdCAqIEhhbmRsZSBhbGwgdGhlIGVycm9yc1xyXG5cdCAqL1xyXG5cdHN0YXRpYyBpbml0YWxpemUoKSB7XHRcclxuXHRcdHdpbmRvdy5vbmVycm9yID0gZnVuY3Rpb24obWVzc2FnZSwgc291cmNlLCBsaW5lbm8sIGNvbG5vLCBlcnJvcikge1xyXG5cdFx0XHRcclxuXHRcdFx0aWYgKGVycm9yIGluc3RhbmNlb2YgSW52YWxpZEFyZ3VtZW50RXhjZXB0aW9uJDEpIHtcclxuXHRcdFx0XHQvLyBoYW5kbGVcclxuXHRcdFx0fSBlbHNlIGlmIChlcnJvciBpbnN0YW5jZW9mIEludmFsaWRCaW5kaW5nRXhjZXB0aW9uKSB7XHJcblx0XHRcdFx0Ly8gaGFuZGxlXHJcblx0XHRcdH0gZWxzZSBpZiAoZXJyb3IgaW5zdGFuY2VvZiBCYWRFdmVudENhbGxFeGNlcHRpb24pIHtcclxuXHRcdFx0XHQvLyBoYW5kbGVcclxuXHRcdFx0fSBlbHNlIGlmIChlcnJvciBpbnN0YW5jZW9mIENvbXBvbmVudHNFeGNlcHRpb24pIHtcclxuXHRcdFx0XHQvLyBoYW5kbGVcclxuXHRcdFx0fSBlbHNlIGlmIChlcnJvciBpbnN0YW5jZW9mIENvbXBvbmVudE5vdFJlZ2lzdGVyZWRFeGNlcHRpb24pIHtcclxuXHRcdFx0XHQvLyBoYW5kbGVcclxuXHRcdFx0fSBlbHNlIGlmIChlcnJvciBpbnN0YW5jZW9mIE5vdEluUGFnZVJhbmdlRXhjZXB0aW9uKSB7XHJcblx0XHRcdFx0Ly8gaGFuZGxlIFxyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0cmV0dXJuIHRydWU7XHJcblx0XHR9O1xyXG5cdH1cclxufVxuXG4vKipcclxuICogQGZpbGUgXHJcbiAqIFN0ciBjbGFzcy5cclxuICpcclxuICogQWRkcyBzb21lIHVzZWZ1bCBmdW5jdGlvbmFsaXR5IGZvclxyXG4gKiBtYW5pcHVsYXRpbmcgc3RyaW5ncyBvciBjcmVhdGluZyBzdHJpbmcuXHJcbiAqL1xyXG5cclxuY2xhc3MgU3RyXHJcbntcclxuXHQvKipcclxuXHQgKiBDb252ZXJ0IGNhbWVsQ2FzZSB0byBrZWJhYi1jYXNlLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIHN0cmluZyB8IHN0cmluZ1xyXG5cdCAqIEByZXR1cm4gc3RyaW5nXHJcblx0ICovXHJcblx0c3RhdGljIGtlYmFiQ2FzZShzdHJpbmcpIFxyXG5cdHtcclxuXHRcdHJldHVybiBzdHJpbmcucmVwbGFjZSgvKFthLXpdKShbQS1aXSkvZywgJyQxLSQyJykudG9Mb3dlckNhc2UoKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEdlbmVyYXRlcyBhIHJhbmRvbSBzdHJpbmcuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gaW50ZWdlciB8IGxlbmd0aFxyXG5cdCAqIEByZXR1cm4gc3RyaW5nXHJcblx0ICovXHJcblx0c3RhdGljIHJhbmRvbShsZW5ndGgpIFxyXG5cdHtcclxuXHRcdGxldCBzdHJpbmcgPSAnJztcclxuXHRcdGxldCBwb3NzaWJsZSA9IFwiQUJDREVGR0hJSktMTU5PUFFSU1RVVldYWVphYmNkZWZnaGlqa2xtbm9wcXJzdHV2d3h5ejAxMjM0NTY3ODlcIjtcclxuXHJcblx0XHRmb3IgKGxldCBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XHJcblx0ICAgIFx0c3RyaW5nICs9IHBvc3NpYmxlLmNoYXJBdChNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBwb3NzaWJsZS5sZW5ndGgpKTtcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gc3RyaW5nO1xyXG5cdH1cclxufVxuXG4vKipcclxuICogQGZpbGUgXHJcbiAqIENvb2tpZSBjbGFzcy5cclxuICpcclxuICogQWRkcyBzb21lIHVzZWZ1bCBmdW5jdGlvbmFsaXR5IGZvclxyXG4gKiBzZXR0aW5nIG9yIGdldHRpbmcgY29va2llcy5cclxuICovXHJcblx0XHJcbmNsYXNzIENvb2tpZVxyXG57XHJcblx0LyoqXHJcbiBcdCogU2V0cyBhIGNvb2tpZS5cclxuIFx0KiBcclxuIFx0KiBAcGFyYW0gc3RyaW5nIHwgbmFtZVxyXG4gXHQqIEBwYXJhbSBKU09OIHwgdmFsdWVcclxuIFx0KiBAcGFyYW0gaW50ZWdlciB8IGRheXNcclxuIFx0KiBAcmV0dXJuIHZvaWRcclxuXHQqL1xyXG5cdHN0YXRpYyBzZXQobmFtZSwgdmFsdWUsIGRheXMpIFxyXG5cdHtcclxuXHRcdGlmICh2YWx1ZS5jb25zdHJ1Y3Rvci5uYW1lICA9PSAnT2JqZWN0JyB8fCB2YWx1ZS5jb25zdHJ1Y3Rvci5uYW1lID09ICdBcnJheScpIHtcclxuXHRcdFx0dmFsdWUgPSBKU09OLnN0cmluZ2lmeSh2YWx1ZSk7XHJcblx0XHR9XHJcblxyXG5cdFx0ZGF5cyA9IGRheXMgfHwgMTA7XHJcblxyXG5cdCAgICBsZXQgZXhwaXJlcztcclxuXHQgICAgXHJcblx0ICAgIGlmIChkYXlzKSB7XHJcblx0ICAgICAgICBsZXQgZGF0ZSA9IG5ldyBEYXRlKCk7XHJcblx0ICAgICAgICBkYXRlLnNldFRpbWUoZGF0ZS5nZXRUaW1lKCkgKyAoZGF5cyAqIDI0ICogNjAgKiA2MCAqIDEwMDApKTtcclxuXHQgICAgICAgIGV4cGlyZXMgPSBcIjsgZXhwaXJlcz1cIiArIGRhdGUudG9HTVRTdHJpbmcoKTtcclxuXHQgICAgfSBlbHNlIHtcclxuXHQgICAgICAgIGV4cGlyZXMgPSBcIlwiO1xyXG5cdCAgICB9XHJcblxyXG5cdCAgICBkb2N1bWVudC5jb29raWUgPSBuYW1lICsgXCI9XCIgKyB2YWx1ZSArIGV4cGlyZXMgKyBcIjsgcGF0aD0vXCI7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBSZXRyaWV2ZXMgdGhlIGNvb2tpZSBieSBuYW1lLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIHN0cmluZyB8IG5hbWVcclxuIFx0ICogQHJldHVybiBKU09OXHJcblx0ICovXHJcblx0c3RhdGljIGdldChuYW1lKSBcclxuXHR7XHJcblx0ICAgIGlmIChkb2N1bWVudC5jb29raWUubGVuZ3RoID4gMCkge1xyXG5cdCAgICAgICAgbGV0IGNfc3RhcnQgPSBkb2N1bWVudC5jb29raWUuaW5kZXhPZihuYW1lICsgXCI9XCIpO1xyXG5cdCAgICAgICAgXHJcblx0ICAgICAgICBpZiAoY19zdGFydCAhPSAtMSkge1xyXG5cdCAgICAgICAgICAgIGNfc3RhcnQgPSBjX3N0YXJ0ICsgbmFtZS5sZW5ndGggKyAxO1xyXG5cdCAgICAgICAgICAgIGxldCBjX2VuZCA9IGRvY3VtZW50LmNvb2tpZS5pbmRleE9mKFwiO1wiLCBjX3N0YXJ0KTtcclxuXHQgICAgICAgICAgICBcclxuXHQgICAgICAgICAgICBpZiAoY19lbmQgPT0gLTEpIHtcclxuXHQgICAgICAgICAgICAgICAgY19lbmQgPSBkb2N1bWVudC5jb29raWUubGVuZ3RoO1xyXG5cdCAgICAgICAgICAgIH1cclxuXHJcblx0ICAgICAgICAgICAgcmV0dXJuIEpTT04ucGFyc2UodW5lc2NhcGUoZG9jdW1lbnQuY29va2llLnN1YnN0cmluZyhjX3N0YXJ0LCBjX2VuZCkpKTtcclxuXHQgICAgICAgIH1cclxuXHQgICAgfVxyXG5cclxuXHQgICAgcmV0dXJuIHt9O1xyXG5cdH1cclxufVxuXG4vKipcclxuICogQGZpbGUgXHJcbiAqIENhcnQgY2xhc3MuXHJcbiAqXHJcbiAqIEhhbmRsZXMgYWRkaW5nLCByZW1vdmluZyBldGMuLi4gb2YgaXRlbXMuXHJcbiAqL1xyXG5cclxuLyoqXHJcbiAqIFRoZSBkZWZhdWx0IHNldHRpbmdzIG9mIHRoZSBjYXJ0LlxyXG4gKlxyXG4gKiBAdmFyIG9iamVjdFxyXG4gKi9cclxubGV0IGRlZmF1bHRTZXR0aW5ncyQyID0ge1xyXG5cdGVsZW1lbnQ6ICcuY2FydCcsXHJcblx0Y29va2llX25hbWU6ICdjYXJ0JyxcclxuXHRwcmV2aWV3X2NsYXNzOiAnJyxcclxuXHRsb2FkZXI6ICcvaW1hZ2VzL2ljb25zL3NwaW5uZXIuc3ZnJyxcclxuXHRjbGFzczogJycsXHJcblx0d2lkdGg6ICc2MHB4JyxcclxuXHRoZWlnaHQ6ICc2MHB4JyxcclxuXHRwbGFjZW1lbnQ6ICdyaWdodC10b3AnLFxyXG5cdGZpeGVkOiB0cnVlLFxyXG5cdGhvdmVyX2NvbG9yOiAnb3JhbmdlJ1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIFN0b3JlcyB0aGUgY29udGFpbmVyIG9iamVjdC5cclxuICpcclxuICogQHZhciBcXENvcmVcXENvbnRhaW5lclxyXG4gKi9cclxubGV0IENvbnRhaW5lciQyO1xyXG5cclxuLyoqXHJcbiAqIFN0b3JlcyB0aGUgZXZlbnQgbWFuYWdlciBvYmplY3QuXHJcbiAqXHJcbiAqIEB2YXIgXFxDb3JlXFxFdmVudE1hbmFnZXJcclxuICovXHJcbmxldCBFdmVudE1hbmFnZXIkMjtcclxuXHJcbi8qKlxyXG4gKiBTdG9yZXMgdGhlIHJlcXVlc3Qgb2JqZWN0LlxyXG4gKlxyXG4gKiBAdmFyIFxcSGVscGVyc1xcUmVxdWVzdFxyXG4gKi9cclxubGV0IEh0dHA7XHJcblxyXG4vKipcclxuICogU3RvcmVzIHRoZSBjYXJ0IGxvYWRlci5cclxuICpcclxuICogQHZhciBIVE1MRGl2RWxlbWVudFxyXG4gKi9cclxubGV0IGxvYWRpbmdPdmVybGF5O1xyXG5cclxuLyoqXHJcbiAqIFN0b3JlcyB0aGUgaXRlbXMgd3JhcHBlci5cclxuICpcclxuICogQHZhciBIVE1MRGl2RWxlbWVudFxyXG4gKi9cclxubGV0IGl0ZW1zRGl2O1xyXG5cclxuLyoqXHJcbiAqIFRoZSBDYXJ0IE9iamVjdCwgaGFuZGxlcyB0aGUgY2FydCBpY29uIGFuZCBzZXNzaW9ucy5cclxuICovXHJcbmNsYXNzIENhcnQgXHJcbntcclxuXHQvKipcclxuXHQgKiBJbml0aWFsaXplIHRoZSBkZWZhdWx0IHNldHRpbmdzLCBzZXR0aW5nIHRoZSBlbGVtZW50LFxyXG5cdCAqIGFuZCBjcmVhdGluZyB0aGUgcHJldmlldyBmb3IgdGhlIGNhcnRzIGRldGFpbHMuXHJcblx0ICovXHJcblx0Y29uc3RydWN0b3IoY29udGFpbmVyLCBodHRwLCBldmVudE1hbmFnZXIpIFxyXG5cdHtcclxuXHRcdENvbnRhaW5lciQyID0gY29udGFpbmVyO1xyXG5cdFx0SHR0cCA9IGh0dHA7XHJcblx0XHRFdmVudE1hbmFnZXIkMiA9IGV2ZW50TWFuYWdlcjtcclxuXHRcdFxyXG5cdFx0dGhpcy5wcmV2aWV3RWxlbWVudCA9IHRoaXMuY3JlYXRlUHJldmlld0VsZW1lbnQoKTtcclxuXHRcdHRoaXMuc3ZnSWNvbiA9IGNyZWF0ZUljb24uY2FsbCh0aGlzKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFNldHMgdGhlIG9iamVjdCBieSB0aGUgdXNlcnMgc2V0dGluZy5cclxuXHQgKi9cclxuXHRzZXR1cChzZXR0aW5ncylcclxuXHR7XHJcblx0XHRpZih0eXBlb2Ygc2V0dGluZ3MgIT0gJ29iamVjdCcpIHtcclxuXHRcdFx0dGhyb3cgbmV3IEludmFsaWRBcmd1bWVudEV4Y2VwdGlvbiQxO1xyXG5cdFx0fVxyXG5cclxuXHRcdHRoaXMuc2V0dGluZ3MgPSBDb21tb24uZXh0ZW5kKGRlZmF1bHRTZXR0aW5ncyQyLCBzZXR0aW5ncyk7XHJcblxyXG5cdFx0dGhpcy5zZXRFbGVtZW50KHRoaXMuc2V0dGluZ3MuZWxlbWVudCk7XHJcblxyXG5cdFx0RE9NLmFkZENsYXNzKHRoaXMucHJldmlld0VsZW1lbnQsICdjbG9zZWQnKTtcclxuXHRcdERPTS5hZGRDbGFzcyh0aGlzLnByZXZpZXdFbGVtZW50LCB0aGlzLnNldHRpbmdzLnByZXZpZXdfY2xhc3MpO1xyXG5cdFx0XHJcblx0XHR0aGlzLmJpbmRFdmVudExpc3RlbmVycygpO1xyXG5cdFx0dGhpcy5hZGRTdHlsZVRhZygpO1xyXG5cclxuXHRcdGlmKHRoaXMuaXNFbXB0eShDb29raWUuZ2V0KHRoaXMuc2V0dGluZ3MuY29va2llX25hbWUpKSkge1xyXG5cdFx0XHR0aGlzLmNhcnQgPSB7fTtcclxuXHRcdFx0dGhpcy5zZXRDYXJ0KHRoaXMuY2FydCk7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBDaGVja3MgaWYgdGhlIGNhcnQgaXMgZW1wdHlcclxuXHQgKi9cclxuXHRpc0VtcHR5KGNhcnQpXHJcblx0e1xyXG5cdFx0cmV0dXJuIENvbW1vbi5lbXB0eU9iamVjdChjYXJ0KTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFNldHMgdGhlIGNhcnQgYXMgYSBjb29raWUuXHJcblx0ICovXHJcblx0c2V0Q2FydChjYXJ0KVxyXG5cdHtcclxuXHRcdHRoaXMuY2FydC5pZCA9IFN0ci5yYW5kb20oMTApO1xyXG5cdFx0dGhpcy5jYXJ0Lml0ZW1zID0gW107XHJcblx0XHR0aGlzLmNhcnQuZmF2b3JpdGVzID0gW107XHJcblx0XHRDb29raWUuc2V0KHRoaXMuc2V0dGluZ3MuY29va2llX25hbWUsIGNhcnQsIDIpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQWRkcyBhbiBpdGVtIHRvIHRoZSBjYXJ0LlxyXG5cdCAqL1xyXG5cdGFkZEl0ZW0oaXRlbSlcclxuXHR7XHJcblx0XHR0aGlzLmNhcnQgPSBDb29raWUuZ2V0KHRoaXMuc2V0dGluZ3MuY29va2llX25hbWUpO1xyXG5cclxuXHRcdHRoaXMuY2FydC5pdGVtcy5wdXNoKGl0ZW0pO1xyXG5cclxuXHRcdENvb2tpZS5zZXQodGhpcy5zZXR0aW5ncy5jb29raWVfbmFtZSwgdGhpcy5jYXJ0LCAyKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFJlbW92ZXMgYW4gaXRlbSBmcm9tIHRoZSBjYXJ0LlxyXG5cdCAqL1xyXG5cdHJlbW92ZUl0ZW0oaXRlbSlcclxuXHR7XHJcbiBcdFx0dGhpcy5jYXJ0ID0gQ29va2llLmdldCh0aGlzLnNldHRpbmdzLmNvb2tpZV9uYW1lKTtcclxuXHJcbiBcdFx0dGhpcy5jYXJ0Lml0ZW1zLnNwbGljZSh0aGlzLmNhcnQuaXRlbXMuaW5kZXhPZihpdGVtKSwgMSk7XHJcblxyXG4gXHRcdENvb2tpZS5zZXQodGhpcy5zZXR0aW5ncy5jb29raWVfbmFtZSwgdGhpcy5jYXJ0LCAyKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEFkZHMgdGhlIGl0ZW0gdG8gcHJldmlldy5cclxuXHQgKi9cclxuXHRhZGRUb1ByZXZpZXcoaXRlbXMpXHJcblx0e1xyXG5cdFx0aXRlbXNEaXYuaW5uZXJIVE1MID0gJyc7XHJcblxyXG5cdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCBpdGVtcy5sZW5ndGg7IGkrKykge1xyXG5cclxuXHRcdFx0bGV0IGxpID0gRE9NLmNyZWF0ZUVsZW1lbnQoJ2xpJywge1xyXG5cdFx0XHRcdFx0Y2xhc3M6ICdpdGVtJ1xyXG5cdFx0XHRcdH0pO1xyXG5cclxuXHRcdFx0bGV0IGF0dHJpYnV0ZXMgPSBpdGVtc1tpXTtcclxuXHJcblx0XHRcdGZvcihsZXQgYXR0cmlidXRlIGluIGF0dHJpYnV0ZXMpIHtcclxuXHRcdFx0XHRsZXQgc3BhbiA9IERPTS5jcmVhdGVFbGVtZW50KCdzcGFuJywge1xyXG5cdFx0XHRcdFx0dGV4dDogYXR0cmlidXRlc1thdHRyaWJ1dGVdXHJcblx0XHRcdFx0fSk7XHJcblxyXG5cdFx0XHRcdGxpLmFwcGVuZENoaWxkKHNwYW4pO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRpdGVtc0Rpdi5hcHBlbmRDaGlsZChsaSk7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBCaW5kcyBldmVydGhpbmcgdG8gdGhlIGVsZW1lbnQuXHJcblx0ICovXHJcblx0c2V0RWxlbWVudChzZWxlY3RvcilcclxuXHR7XHJcblx0XHR0aGlzLmljb24gPSBET00uZmluZChzZWxlY3Rvcik7XHJcblxyXG5cdFx0aWYgKHRoaXMuaWNvbikge1xyXG5cdFx0XHRET00uYWRkQ2xhc3ModGhpcy5pY29uLCB0aGlzLnNldHRpbmdzLmNsYXNzKTtcclxuXHRcdFx0RE9NLmFkZENsYXNzKHRoaXMuaWNvbiwgdGhpcy5zZXR0aW5ncy5wbGFjZW1lbnQpO1xyXG5cdFx0XHR0aGlzLmljb24uYXBwZW5kQ2hpbGQodGhpcy5zdmdJY29uKTtcclxuXHRcdFx0dGhpcy5pY29uLmFwcGVuZENoaWxkKHRoaXMucHJldmlld0VsZW1lbnQpO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQ3JlYXRlcyB0aGUgY2FydCBkZXRhaWxzIHByZXZpZXcgZWxlbWVudC5cclxuXHQgKi9cclxuXHRjcmVhdGVQcmV2aWV3RWxlbWVudCgpXHJcblx0e1xyXG5cdFx0bGV0IHByZXZpZXdFbGVtZW50ID0gRE9NLmNyZWF0ZUVsZW1lbnQoJ2RpdicsIHtcclxuXHRcdFx0aWQ6ICdwcmV2aWV3J1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0aXRlbXNEaXYgPSBET00uY3JlYXRlRWxlbWVudCgndWwnLCB7XHJcblx0XHRcdFx0Y2xhc3M6ICdpdGVtcydcclxuXHRcdFx0fSk7XHJcblxyXG5cdFx0cHJldmlld0VsZW1lbnQuYXBwZW5kQ2hpbGQoaXRlbXNEaXYpO1xyXG5cclxuXHRcdHJldHVybiBwcmV2aWV3RWxlbWVudDtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEFkZCB0aGUgZUNvbW1lcmNlIHN0eWxlIHRhZ3MgdG8gdGhlIERPTS5cclxuXHQgKi9cclxuXHRhZGRTdHlsZVRhZygpIFxyXG5cdHtcclxuXHRcdGlmKERPTS5maW5kKCcjZUNvbW1lcmNlLUNhcnQnKSkge1xyXG5cdFx0XHRyZXR1cm47XHJcblx0XHR9XHJcblxyXG5cdFx0bGV0IHBvc2l0aW9uID0gKHRoaXMuc2V0dGluZ3MuZml4ZWQpID8gJ2ZpeGVkJyA6ICdhYnNvbHV0ZSc7XHJcblxyXG5cdFx0bGV0IGNzcyA9IGBcclxuXHRcdFx0JHt0aGlzLnNldHRpbmdzLmVsZW1lbnR9IHtcclxuXHRcdFx0XHRwb3NpdGlvbjogJHtwb3NpdGlvbn07XHJcblx0XHRcdFx0Y3Vyc29yOiBwb2ludGVyO1xyXG5cdFx0XHRcdGNvbG9yOiAjZmZmZmZmO1xyXG5cdFx0XHRcdHotaW5kZXg6IDk5ODtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0JHt0aGlzLnNldHRpbmdzLmVsZW1lbnR9ID4gc3ZnIHtcclxuXHRcdFx0XHR3aWR0aDogJHt0aGlzLnNldHRpbmdzLndpZHRofTtcclxuXHRcdFx0XHRoZWlnaHQ6ICR7dGhpcy5zZXR0aW5ncy5oZWlnaHR9O1xyXG5cdFx0XHRcdHRyYW5zaXRpb246IGZpbGwgMC4zcztcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0JHt0aGlzLnNldHRpbmdzLmVsZW1lbnR9ID4gc3ZnOmhvdmVyIHtcclxuXHRcdFx0XHRmaWxsOiAke3RoaXMuc2V0dGluZ3MuaG92ZXJfY29sb3J9O1xyXG5cdFx0XHRcdHRyYW5zaXRpb246IGZpbGwgMC4zcztcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0JHt0aGlzLnNldHRpbmdzLmVsZW1lbnR9LnRvcC1yaWdodCxcclxuXHRcdFx0JHt0aGlzLnNldHRpbmdzLmVsZW1lbnR9LnJpZ2h0LXRvcCB7XHJcblx0XHRcdFx0cmlnaHQ6IDEwcHg7XHJcblx0XHRcdFx0dG9wOiAxMHB4O1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHQke3RoaXMuc2V0dGluZ3MuZWxlbWVudH0ubGVmdC10b3AsXHJcblx0XHRcdCR7dGhpcy5zZXR0aW5ncy5lbGVtZW50fS50b3AtbGVmdCB7XHJcblx0XHRcdFx0bGVmdDogMTBweDtcclxuXHRcdFx0XHR0b3A6IDEwcHg7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdCR7dGhpcy5zZXR0aW5ncy5lbGVtZW50fSA+ICNwcmV2aWV3IHtcclxuXHRcdFx0XHRwb3NpdGlvbjogJHtwb3NpdGlvbn07XHJcblx0XHRcdFx0ei1pbmRleDogOTk5OTtcclxuXHRcdFx0XHR0b3A6IGNhbGMoMTBweCArICR7dGhpcy5zZXR0aW5ncy5oZWlnaHR9KTtcclxuXHRcdFx0XHR0cmFuc2Zvcm06IHRyYW5zbGF0ZVgoNjBweCk7XHJcblx0XHRcdFx0aGVpZ2h0OiA0MDBweDtcclxuXHRcdFx0XHR3aWR0aDogMzAwcHg7XHJcblx0XHRcdFx0Ym9yZGVyOiAxcHggc29saWQgI2U0ZTRlNDtcclxuXHRcdFx0XHRiYWNrZ3JvdW5kOiAjZmZmZmZmO1xyXG5cdFx0XHRcdHRyYW5zaXRpb246IHRyYW5zZm9ybSAxcywgdmlzaWJpbGl0eSAxcztcclxuXHRcdFx0XHRjdXJzb3I6IGRlZmF1bHQ7XHJcblx0XHRcdFx0b3ZlcmZsb3ctWTogc2Nyb2xsO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHQke3RoaXMuc2V0dGluZ3MuZWxlbWVudH0gPiAjcHJldmlldy5vcGVuZWQge1xyXG5cdFx0XHRcdHZpc2liaWxpdHk6IHZpc2libGU7XHJcblx0XHRcdFx0dHJhbnNmb3JtOiB0cmFuc2xhdGVYKC0yNDBweCk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdCR7dGhpcy5zZXR0aW5ncy5lbGVtZW50fSA+ICNwcmV2aWV3LmNsb3NlZCB7XHJcblx0XHRcdFx0dmlzaWJpbGl0eTogaGlkZGVuO1xyXG5cdFx0XHRcdHRyYW5zZm9ybTogdHJhbnNsYXRlWCg2MHB4KTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0JHt0aGlzLnNldHRpbmdzLmVsZW1lbnR9ID4gI3ByZXZpZXcgPiB1bC5pdGVtcyxcclxuXHRcdFx0JHt0aGlzLnNldHRpbmdzLmVsZW1lbnR9ID4gI3ByZXZpZXcgPiB1bC5pdGVtcyA+IGxpLml0ZW0ge1xyXG5cdFx0XHRcdGNvbG9yOiAjMDAwMDAwO1xyXG5cdFx0XHRcdGxpc3Qtc3R5bGUtdHlwZTogbm9uZTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0JHt0aGlzLnNldHRpbmdzLmVsZW1lbnR9IC5pdGVtcy5sb2FkaW5nIHtcclxuXHRcdFx0XHRkaXNwbGF5OiBub25lO1xyXG5cdFx0XHRcdG92ZXJmbG93LVk6IG5vbmU7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdCR7dGhpcy5zZXR0aW5ncy5lbGVtZW50fSAuY2FydC1sb2FkZXItb3ZlcmxheSB7XHJcblx0XHRcdFx0cG9zaXRpb246IGZpeGVkO1xyXG5cdFx0XHRcdHRvcDogMDsgXHJcblx0XHRcdCAgICBsZWZ0OiAwO1xyXG5cdFx0XHQgICAgcmlnaHQ6IDA7XHJcblx0XHRcdCAgICBib3R0b206IDA7XHJcblx0XHRcdFx0YmFja2dyb3VuZDogI2ZmZmZmZjtcclxuXHRcdFx0XHR3aWR0aDogMTAwJTtcclxuXHRcdFx0XHRoZWlnaHQ6IDEwMCU7XHJcblx0XHRcdFx0bWluLWhlaWdodDogMTAwJTtcclxuXHRcdFx0XHRvdmVyZmxvdzogYXV0bztcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0JHt0aGlzLnNldHRpbmdzLmVsZW1lbnR9IC5jYXJ0LWxvYWRlci1vdmVybGF5IC5jYXJ0LWxvYWRlciB7XHJcblx0XHRcdFx0cG9zaXRpb246IGFic29sdXRlO1xyXG5cdFx0XHRcdHdpZHRoOiA1MHB4O1xyXG5cdFx0XHRcdGhlaWdodDogNTBweDtcclxuXHRcdFx0XHRtYXJnaW4tbGVmdDogLTI1cHg7XHJcblx0XHRcdFx0bWFyZ2luLXRvcDogLTI1cHg7XHJcblx0XHRcdFx0bGVmdDogNTAlO1xyXG5cdFx0XHRcdHJpZ2h0OiA1MCU7XHJcblx0XHRcdFx0dG9wOiA1MCU7XHJcblx0XHRcdFx0Ym90dG9tOiA1MCU7XHJcblx0XHRcdH1cclxuXHRcdGA7XHJcblx0ICAgIFxyXG5cdCAgICBET00uYWRkU3R5bGUoJ2VDb21tZXJjZS1DYXJ0JywgY3NzKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIENyZWF0ZXMgYW4gbG9hZGluZyBvdmVybGF5LlxyXG5cdCAqL1xyXG5cdGxvYWRpbmdPdmVybGF5KClcclxuXHR7XHJcblx0XHRpZiAobG9hZGluZ092ZXJsYXkpIHtcclxuXHRcdFx0cmV0dXJuIGxvYWRpbmdPdmVybGF5O1xyXG5cdFx0fVxyXG5cclxuXHRcdGxldCBsb2FkZXIgPSBET00uY3JlYXRlRWxlbWVudCgnaW1nJywge1xyXG5cdFx0XHRzcmM6IHRoaXMuc2V0dGluZ3MubG9hZGVyLFxyXG5cdFx0XHRjbGFzczogJ2NhcnQtbG9hZGVyJ1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0bG9hZGluZ092ZXJsYXkgPSBET00uY3JlYXRlRWxlbWVudCgnZGl2Jywge1xyXG5cdFx0XHRjbGFzczogJ2NhcnQtbG9hZGVyLW92ZXJsYXknXHJcblx0XHR9KTtcclxuXHJcblx0XHRsb2FkaW5nT3ZlcmxheS5hcHBlbmRDaGlsZChsb2FkZXIpO1xyXG5cclxuXHRcdHJldHVybiBsb2FkaW5nT3ZlcmxheTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIExvYWRpbmcgdGhlIGNhcnQgcHJldmlldy5cclxuXHQgKi9cclxuXHRwcmV2aWV3U3RhcnRMb2FkaW5nKClcclxuXHR7XHJcblx0XHRET00uYWRkQ2xhc3MoaXRlbXNEaXYsICdsb2FkaW5nJyk7XHJcblx0XHR0aGlzLnByZXZpZXdFbGVtZW50LmFwcGVuZENoaWxkKHRoaXMubG9hZGluZ092ZXJsYXkoKSk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBMb2FkaW5nIHRoZSBjYXJ0IHByZXZpZXcuXHJcblx0ICovXHJcblx0cHJldmlld1N0b3BMb2FkaW5nKClcclxuXHR7XHJcblx0XHRpZiAoRE9NLmZpbmQoJy5jYXJ0LWxvYWRlci1vdmVybGF5JywgdGhpcy5wcmV2aWV3RWxlbWVudCkpIHtcclxuXHRcdFx0dGhpcy5wcmV2aWV3RWxlbWVudC5yZW1vdmVDaGlsZCh0aGlzLmxvYWRpbmdPdmVybGF5KCkpO1xyXG5cdFx0XHRET00ucmVtb3ZlQ2xhc3MoaXRlbXNEaXYsICdsb2FkaW5nJyk7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBSZWxvYWRzIHRoZSBpdGVtcyBpbiB0aGUgY2FydCBwcmV2aWV3LlxyXG5cdCAqL1xyXG5cdHJlbG9hZENhcnRQcmV2aWV3KClcclxuXHR7XHJcblx0XHR0aGlzLnByZXZpZXdTdGFydExvYWRpbmcoKTtcclxuXHRcdGxldCBpdGVtcyA9IHRoaXMuZ2V0Q2FydEl0ZW1zKCk7XHJcblx0XHR0aGlzLmFkZFRvUHJldmlldyhpdGVtcyk7XHJcblx0XHRcclxuXHRcdGxldCBpbnN0YW5jZSA9IHRoaXM7XHJcblxyXG5cdFx0c2V0VGltZW91dChmdW5jdGlvbigpIHtcclxuXHRcdFx0aW5zdGFuY2UucHJldmlld1N0b3BMb2FkaW5nLmNhbGwoaW5zdGFuY2UpO1xyXG5cdFx0fSwgMTAwMCk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBCaW5kcyBldmVudCBsaXN0ZW5lcnMgdG8gdGhlIGNhcnQgaWNvbi5cclxuXHQgKi9cclxuXHRiaW5kRXZlbnRMaXN0ZW5lcnMoKVxyXG5cdHtcclxuXHRcdGlmKHRoaXMuc3ZnSWNvbiA9PSBudWxsKSB7XHJcblx0XHRcdHJldHVybjtcclxuXHRcdH1cclxuXHJcblx0XHR0aGlzLnN2Z0ljb24ub25jbGljayA9IGZ1bmN0aW9uKGUpIHtcclxuXHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdFx0XHRsZXQgb3BlbmluZyA9IERPTS50b2dnbGVDbGFzcyh0aGlzLnByZXZpZXdFbGVtZW50LCAnb3BlbmVkJywgJ2Nsb3NlZCcpO1xyXG5cdFx0XHRcclxuXHRcdFx0aWYgKG9wZW5pbmcpIHtcclxuXHRcdFx0XHR0aGlzLnJlbG9hZENhcnRQcmV2aWV3KCk7XHRcclxuXHRcdFx0fVxyXG5cdFx0fS5iaW5kKHRoaXMpO1xyXG5cdFx0XHJcblx0XHRFdmVudE1hbmFnZXIkMi5zdWJzY3JpYmUoJ2NhcnQucHJvZHVjdHMuYWRkZWQnLCBmdW5jdGlvbihhdHRyaWJ1dGVzKSB7XHJcblx0XHRcdGxldCBjYXJ0ID0gQ29va2llLmdldCh0aGlzLnNldHRpbmdzLmNvb2tpZV9uYW1lKTtcclxuXHRcdFx0Y2FydC5pdGVtcy5wdXNoKGF0dHJpYnV0ZXMpO1xyXG5cdFx0XHRDb29raWUuc2V0KHRoaXMuc2V0dGluZ3MuY29va2llX25hbWUsIGNhcnQpO1xyXG5cdFx0XHR0aGlzLnJlbG9hZENhcnRQcmV2aWV3KCk7XHJcblx0XHR9LmJpbmQodGhpcykpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogUmV0cmlldmUgdGhlIGNhcnRzIGl0ZW1zIGZyb20gdGhlIGNvb2tpZS5cclxuXHQgKi9cclxuXHRnZXRDYXJ0SXRlbXMoKVxyXG5cdHtcclxuXHRcdGxldCBjYXJ0ID0gQ29va2llLmdldCh0aGlzLnNldHRpbmdzLmNvb2tpZV9uYW1lKTtcclxuXHJcblx0XHRyZXR1cm4gKGNhcnQpID8gY2FydC5pdGVtcyA6IFtdO1xyXG5cdH1cclxufVxyXG5cclxuZnVuY3Rpb24gY2xvc2UoZXZlbnQpIHtcclxuXHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdERPTS5zd2l0Y2hDbGFzc2VzKHRoaXMucHJldmlld0VsZW1lbnQsICdvcGVuZWQnLCAnY2xvc2VkJyk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNyZWF0ZUljb24oKSB7XHJcblx0bGV0IHN2ZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnROUyhcImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIsIFwic3ZnXCIpO1xyXG5cdGxldCBnID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKFwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiwgXCJnXCIpO1xyXG5cdGxldCBwYXRoID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKFwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiwgXCJwYXRoXCIpO1xyXG5cclxuXHRzdmcuc2V0QXR0cmlidXRlKCd2ZXJzaW9uJywgJzEuMScpO1xyXG5cdHN2Zy5zZXRBdHRyaWJ1dGUoJ3htbG5zJywgJ2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJyk7XHJcblx0c3ZnLnNldEF0dHJpYnV0ZSgneG1sbnM6eGxpbmsnLCAnaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluaycpO1xyXG5cdHN2Zy5zZXRBdHRyaWJ1dGUoJ3gnLCAnMHB4Jyk7XHJcblx0c3ZnLnNldEF0dHJpYnV0ZSgneScsICcwcHgnKTtcclxuXHRzdmcuc2V0QXR0cmlidXRlKCd3aWR0aCcsICc0NDYuODQzcHgnKTtcclxuXHRzdmcuc2V0QXR0cmlidXRlKCdoZWlnaHQnLCAnNDQ2Ljg0M3B4Jyk7XHJcblx0c3ZnLnNldEF0dHJpYnV0ZSgndmlld0JveCcsICcwIDAgNDQ2Ljg0MyA0NDYuODQzJyk7XHJcblx0c3ZnLnNldEF0dHJpYnV0ZSgnc3R5bGUnLCAnZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA0NDYuODQzIDQ0Ni44NDM7Jyk7XHJcblx0c3ZnLnNldEF0dHJpYnV0ZSgneG1sOnNwYWNlJywgJ3ByZXNlcnZlJyk7XHJcblxyXG5cdHBhdGguc2V0QXR0cmlidXRlKCdkJywgJ000NDQuMDksOTMuMTAzYy0yLjY5OC0zLjY5OS03LjAwNi01Ljg4OC0xMS41ODQtNS44ODhIMTA5LjkyYy0wLjYyNSwwLTEuMjQ5LDAuMDM4LTEuODUsMC4xMTlsLTEzLjI3Ni0zOC4yN2MtMS4zNzYtMy45NTgtNC40MDYtNy4xMTMtOC4zLTguNjQ2TDE5LjU4NiwxNC4xMzRjLTcuMzc0LTIuODg3LTE1LjY5NSwwLjczNS0xOC41OTEsOC4xYy0yLjg5MSw3LjM2OSwwLjczLDE1LjY5NSw4LjEsMTguNTkxbDYwLjc2OCwyMy44NzJsNzQuMzgxLDIxNC4zOTljLTMuMjgzLDEuMTQ0LTYuMDY1LDMuNjYzLTcuMzMyLDcuMTg3bC0yMS41MDYsNTkuNzM5Yy0xLjMxOCwzLjY2My0wLjc3NSw3LjczMywxLjQ2OCwxMC45MTZjMi4yNCwzLjE4Myw1Ljg4Myw1LjA3OCw5Ljc3Myw1LjA3OGgxMS4wNDRjLTYuODQ0LDcuNjE2LTExLjA0NCwxNy42NDYtMTEuMDQ0LDI4LjY3NWMwLDIzLjcxOCwxOS4yOTgsNDMuMDEyLDQzLjAxMiw0My4wMTJzNDMuMDEyLTE5LjI5NCw0My4wMTItNDMuMDEyYzAtMTEuMDI5LTQuMi0yMS4wNTktMTEuMDQ0LTI4LjY3NWg5My43NzZjLTYuODQ3LDcuNjE2LTExLjA0OCwxNy42NDYtMTEuMDQ4LDI4LjY3NWMwLDIzLjcxOCwxOS4yOTQsNDMuMDEyLDQzLjAxMyw0My4wMTJjMjMuNzE4LDAsNDMuMDEyLTE5LjI5NCw0My4wMTItNDMuMDEyYzAtMTEuMDI5LTQuMi0yMS4wNTktMTEuMDQzLTI4LjY3NWgxMy40MzNjNi41OTksMCwxMS45NDctNS4zNDksMTEuOTQ3LTExLjk0OGMwLTYuNTk5LTUuMzQ5LTExLjk0Ny0xMS45NDctMTEuOTQ3SDE0My42NDdsMTMuMzE5LTM2Ljk5NmMxLjcyLDAuNzI0LDMuNTc4LDEuMTUyLDUuNTIzLDEuMTUyaDIxMC4yNzhjNi4yMzQsMCwxMS43NTEtNC4wMjcsMTMuNjUtOS45NTlsNTkuNzM5LTE4Ni4zODdDNDQ3LjU1NywxMDEuNTY3LDQ0Ni43ODgsOTYuODAyLDQ0NC4wOSw5My4xMDN6IE0xNjkuNjU5LDQwOS44MDdjLTEwLjU0MywwLTE5LjExNi04LjU3My0xOS4xMTYtMTkuMTE2czguNTczLTE5LjExNywxOS4xMTYtMTkuMTE3czE5LjExNiw4LjU3NCwxOS4xMTYsMTkuMTE3UzE4MC4yMDIsNDA5LjgwNywxNjkuNjU5LDQwOS44MDd6IE0zMjcuMzY3LDQwOS44MDdjLTEwLjU0MywwLTE5LjExNy04LjU3My0xOS4xMTctMTkuMTE2czguNTc0LTE5LjExNywxOS4xMTctMTkuMTE3YzEwLjU0MiwwLDE5LjExNiw4LjU3NCwxOS4xMTYsMTkuMTE3UzMzNy45MDksNDA5LjgwNywzMjcuMzY3LDQwOS44MDd6IE00MDIuNTIsMTQ4LjE0OWgtNzMuMTYxVjExNS44OWg4My40OTlMNDAyLjUyLDE0OC4xNDl6IE0zODEuNDUzLDIxMy44NjFoLTUyLjA5NHYtMzcuMDM4aDYzLjk2N0wzODEuNDUzLDIxMy44NjF6IE0yMzQuNTcxLDIxMy44NjF2LTM3LjAzOGg2Ni4xMTN2MzcuMDM4SDIzNC41NzF6IE0zMDAuNjg0LDI0Mi41Mzh2MzEuMDY0aC02Ni4xMTN2LTMxLjA2NEgzMDAuNjg0eiBNMTM5LjExNSwxNzYuODIzaDY2Ljc4NHYzNy4wMzhoLTUzLjkzM0wxMzkuMTE1LDE3Ni44MjN6IE0yMzQuNTcxLDE0OC4xNDlWMTE1Ljg5aDY2LjExM3YzMi4yNTlIMjM0LjU3MXogTTIwNS44OTgsMTE1Ljg5djMyLjI1OWgtNzYuNzM0bC0xMS4xOTEtMzIuMjU5SDIwNS44OTh6IE0xNjEuOTE2LDI0Mi41MzhoNDMuOTgydjMxLjA2NGgtMzMuMjA2TDE2MS45MTYsMjQyLjUzOHogTTMyOS4zNTksMjczLjYwM3YtMzEuMDY0aDQyLjkwOWwtOS45NTUsMzEuMDY0SDMyOS4zNTl6Jyk7XHJcblxyXG5cdGcuYXBwZW5kQ2hpbGQocGF0aCk7XHJcblx0c3ZnLmFwcGVuZENoaWxkKGcpO1xyXG5cclxuXHRyZXR1cm4gc3ZnO1xyXG59XG5cbi8qKlxyXG4gKiBUaGUgZGVmYXVsdCBzZXR0aW5ncyBvZiB0aGUgZmlsdGVyLlxyXG4gKi9cclxubGV0IGRlZmF1bHRTZXR0aW5ncyQzID0ge1xyXG5cdGVsZW1lbnQ6ICcuZmlsdGVyJyxcclxuXHRkYXRhOiB7fSxcclxuXHRjbGFzczogJycsXHJcblx0d2lkdGg6ICcnLFxyXG5cdGhlaWdodDogJycsXHJcbn07XHJcblxyXG4vKipcclxuICogU3RvcmVzIHRoZSBjb250YWluZXIgb2JqZWN0LlxyXG4gKi9cclxubGV0IENvbnRhaW5lciQzO1xyXG5cclxuLyoqXHJcbiAqIFRoZSBGaWx0ZXIgT2JqZWN0LCBoYW5kbGVzIHRoZSBmaWx0ZXIgb2YgdGhlIHByb2R1Y3RzL3NlcnZpY2VzLlxyXG4gKi9cclxuY2xhc3MgRmlsdGVyIFxyXG57XHJcblx0Y29uc3RydWN0b3IoY29udGFpbmVyKSBcclxuXHR7XHJcblx0XHRDb250YWluZXIkMyA9IGNvbnRhaW5lcjtcclxuXHR9XHJcblxyXG5cdHNldHVwKHNldHRpbmdzKVxyXG5cdHtcclxuXHRcdGlmKHR5cGVvZiBzZXR0aW5ncyAhPSAnb2JqZWN0Jykge1xyXG5cdFx0XHR0aHJvdyBuZXcgSW52YWxpZEFyZ3VtZW50RXhjZXB0aW9uJDE7XHJcblx0XHR9XHJcblxyXG5cdFx0dGhpcy5zZXR0aW5ncyA9IENvbW1vbi5leHRlbmQoZGVmYXVsdFNldHRpbmdzJDMsIHNldHRpbmdzKTtcclxuXHJcblx0XHR0aGlzLnNldEVsZW1lbnQodGhpcy5zZXR0aW5ncy5lbGVtZW50KTtcclxuXHR9XHJcblxyXG5cdHNldEVsZW1lbnQoc2VsZWN0b3IpXHJcblx0e1xyXG5cdFx0dGhpcy53cmFwcGVyID0gRE9NLmZpbmQoc2VsZWN0b3IpO1xyXG5cdFx0XHJcblx0XHRET00uYWRkQ2xhc3ModGhpcy53cmFwcGVyLCB0aGlzLnNldHRpbmdzLmNsYXNzKTtcclxuXHR9XHJcbn1cblxuLyoqXHJcbiAqIFRoZSBkZWZhdWx0IHNldHRpbmdzIG9mIGVhY2ggcHJvZHVjdC5cclxuICovXHJcbmxldCBkZWZhdWx0U2V0dGluZ3MkNCA9IHtcclxuXHRlbGVtZW50OiAnLnByb2R1Y3RzJyxcclxuXHRjbGFzczogJycsXHJcblx0aXRlbV9jbGFzczogJycsXHJcblx0YWRkX2J1dHRvbl9jbGFzczogJ2J0biBidG4tcHJpbWFyeScsXHJcblx0ZmF2b3JpdGVfYnV0dG9uX2NsYXNzOiAnYnRuIGJ0bi1kYW5nZXInLFxyXG5cdHdpZHRoOiAnMjAwcHgnLFxyXG5cdGhlaWdodDogJzI1MHB4JyxcclxuXHRhdHRyaWJ1dGVzOiBbJ25hbWUnLCAncHJpY2UnLCAnZGVsaXZlcnlUaW1lJywgJ2ltYWdlJ10sXHJcblx0dXJsOiAncHJvZHVjdHMucGhwJyxcclxufTtcclxuXHJcbi8qKlxyXG4gKiBTdG9yZXMgdGhlIGNvbnRhaW5lciBvYmplY3QuXHJcbiAqIFxyXG4gKiBAdmFyIFxcQ29yZVxcQ29udGFpbmVyXHJcbiAqL1xyXG5sZXQgQ29udGFpbmVyJDQ7XHJcblxyXG4vKipcclxuICogU3RvcmVzIHRoZSBjb250YWluZXIgb2JqZWN0LlxyXG4gKiBcclxuICogQHZhciBcXENvcmVcXEV2ZW50TWFuYWdlclxyXG4gKi9cclxubGV0IEV2ZW50TWFuYWdlciQzO1xyXG5cclxuLyoqXHJcbiAqIFN0b3JlcyB0aGUgcmVxdWVzdCBvYmplY3QuXHJcbiAqIFxyXG4gKiBAdmFyIFxcSGVscGVyXFxSZXF1ZXN0IFxyXG4gKi9cclxubGV0IEh0dHAkMTtcclxuXHJcbi8qKlxyXG4gKiBUaGUgUHJvZHVjdHMgT2JqZWN0LCBoYW5kbGVzIHRoZSBwcm9kdWN0cy5cclxuICovXHJcbmNsYXNzIFByb2R1Y3RzIFxyXG57XHJcblx0LyoqXHJcblx0ICogSW5pdGFsaXplIHRoZSBDb250YWluZXIuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gXFxDb3JlXFxDb250YWluZXIgfCBjb250YWluZXJcclxuXHQgKiBAcGFyYW0gXFxIZWxwZXJzXFxSZXF1ZXN0IHwgaHR0cFxyXG5cdCAqIEByZXR1cm4gdm9pZFxyXG5cdCAqL1xyXG5cdGNvbnN0cnVjdG9yKGNvbnRhaW5lciwgaHR0cCwgZXZlbnRNYW5hZ2VyKSBcclxuXHR7XHJcblx0XHRDb250YWluZXIkNCA9IGNvbnRhaW5lcjtcclxuXHRcdEh0dHAkMSA9IGh0dHA7XHJcblx0XHRFdmVudE1hbmFnZXIkMyA9IGV2ZW50TWFuYWdlcjtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFNldHMgdGhlIGdpdmVuIHNldHRpbmdzIGZyb20gdGhlIHVzZXIuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gb2JqZWN0IHwgc2V0dGluZ3NcclxuXHQgKiBAcmV0dXJuIHZvaWRcclxuXHQgKi9cclxuXHRzZXR1cChzZXR0aW5ncylcclxuXHR7XHJcblx0XHRkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgZnVuY3Rpb24oKSB7XHJcblx0XHRcdFxyXG5cdFx0aWYgKHR5cGVvZiBzZXR0aW5ncyAhPSAnb2JqZWN0Jykge1xyXG5cdFx0XHR0aHJvdyBuZXcgSW52YWxpZEFyZ3VtZW50RXhjZXB0aW9uJDE7XHJcblx0XHR9XHJcblxyXG5cdFx0dGhpcy5zZXR0aW5ncyA9IENvbW1vbi5leHRlbmQoZGVmYXVsdFNldHRpbmdzJDQsIHNldHRpbmdzKTtcclxuXHJcblx0XHR0aGlzLnNldEVsZW1lbnQodGhpcy5zZXR0aW5ncy5lbGVtZW50KTtcclxuXHJcblx0XHR0aGlzLmFkZFN0eWxlVGFnKCk7XHRcclxuXHRcdFxyXG5cdFx0aWYgKENvbnRhaW5lciQ0LlBhZ2luYXRpb24gJiYgQ29udGFpbmVyJDQuUGFnaW5hdGlvbi5ib290ZWQpIHtcclxuXHRcdFx0dGhpcy5sb2FkUGFnZVByb2R1Y3RzKCk7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHR0aGlzLmxvYWRBbGxQcm9kdWN0cygpO1xyXG5cdFx0fVxyXG5cclxuXHRcdH0uYmluZCh0aGlzKSk7XHJcblx0fVxyXG5cclxuXHRsb2FkUGFnZVByb2R1Y3RzKClcclxuXHR7XHJcblx0XHRsZXQgcmVxdWVzdCA9IHRoaXMuZ2V0UHJvZHVjdHMoMSk7XHJcblxyXG5cdFx0cmVxdWVzdC50aGVuKGZ1bmN0aW9uKHByb2R1Y3RzKSB7XHJcblx0XHRcdHRoaXMuY3VycmVudEl0ZW1zID0gcHJvZHVjdHM7XHJcblxyXG5cdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuY3VycmVudEl0ZW1zLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdFx0dmFyIHByb2R1Y3QgPSB0aGlzLmN1cnJlbnRJdGVtc1tpXTtcclxuXHRcdFx0XHRFdmVudE1hbmFnZXIkMy5wdWJsaXNoKCdwcm9kdWN0cy5sb2FkaW5nJywgcHJvZHVjdCk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdEV2ZW50TWFuYWdlciQzLnB1Ymxpc2goJ3Byb2R1Y3RzLmZldGNoZWQnLCBwcm9kdWN0cyk7XHJcblx0XHRcdHRoaXMucmVwbGFjZUl0ZW1zKHByb2R1Y3RzKTtcclxuXHRcdH0uYmluZCh0aGlzKSkuY2F0Y2goZnVuY3Rpb24oZXJyb3IpIHtcclxuXHJcblx0XHR9KTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIExvYWRzIHRoZSBwcm9kdWN0cyBhbmQgXHJcblx0ICogcmVwbGFjZSB0aGVtIGluIHRoZSBkaXYgY29udGFpbmVyLlxyXG5cdCAqXHJcblx0ICogQHJldHVybiB2b2lkXHJcblx0ICovXHJcblx0bG9hZEFsbFByb2R1Y3RzKClcclxuXHR7XHJcblx0XHRsZXQgcmVxdWVzdCA9IHRoaXMuZ2V0UHJvZHVjdHMoKTtcclxuXHRcdFx0XHJcblx0XHRyZXF1ZXN0LnRoZW4oZnVuY3Rpb24ocHJvZHVjdHMpIHtcclxuXHRcdFx0dGhpcy5jdXJyZW50SXRlbXMgPSBwcm9kdWN0cztcclxuXHJcblx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5jdXJyZW50SXRlbXMubGVuZ3RoOyBpKyspIHtcclxuXHRcdFx0XHR2YXIgcHJvZHVjdCA9IHRoaXMuY3VycmVudEl0ZW1zW2ldO1xyXG5cdFx0XHRcdEV2ZW50TWFuYWdlciQzLnB1Ymxpc2goJ3Byb2R1Y3RzLmxvYWRpbmcnLCBwcm9kdWN0KTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0RXZlbnRNYW5hZ2VyJDMucHVibGlzaCgncHJvZHVjdHMuZmV0Y2hlZCcsIHByb2R1Y3RzKTtcclxuXHRcdFx0dGhpcy5yZXBsYWNlSXRlbXMocHJvZHVjdHMpO1xyXG5cdFx0fS5iaW5kKHRoaXMpKS5jYXRjaChmdW5jdGlvbihlcnJvcikge1xyXG5cclxuXHRcdH0pO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogU2V0cyB0aGUgRE9NIGVsZW1lbnQgXHJcblx0ICogZm9yIHBvcHVsYXRpbmcgdGhlIHByb2R1Y3RzLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIHN0cmluZyB8IHNlbGVjdG9yXHJcblx0ICogQHJldHVybiB2b2lkXHJcblx0ICovXHJcblx0c2V0RWxlbWVudChzZWxlY3RvcilcclxuXHR7XHJcblx0XHR0aGlzLndyYXBwZXIgPSBET00uZmluZChzZWxlY3Rvcik7XHJcblxyXG5cdFx0aWYgKHRoaXMud3JhcHBlcikge1xyXG5cdFx0XHRET00uYWRkQ2xhc3ModGhpcy53cmFwcGVyLCB0aGlzLnNldHRpbmdzLmNsYXNzKTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFJlcGxhY2UgaXRlbXMgaW4gXHJcblx0ICogdGhlIHByb2R1Y3RzIGNvbnRhaW5lci5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSBhcnJheSB8IGl0ZW1zXHJcblx0ICogQHJldHVybiBhcnJheVxyXG5cdCAqL1xyXG5cdHJlcGxhY2VJdGVtcyhpdGVtcykgXHJcblx0e1xyXG5cdFx0aWYgKCEgQXJyYXkuaXNBcnJheShpdGVtcykgfHwgKGl0ZW1zLmxlbmd0aCA8PSAwICYmIHR5cGVvZiBpdGVtc1swXSA9PSAnc3RyaW5nJykpIHtcclxuXHRcdFx0dGhyb3cgbmV3IEludmFsaWRBcmd1bWVudEV4Y2VwdGlvbiQxO1xyXG5cdFx0fVxyXG5cclxuXHRcdGxldCBwcm9kdWN0cyA9IHRoaXMuYnVpbGRQcm9kdWN0cyhpdGVtcywgdGhpcy5zZXR0aW5ncy5pdGVtX2NsYXNzLCAnZGl2Jyk7XHJcblxyXG5cdFx0dGhpcy53cmFwcGVyLmlubmVySFRNTCA9ICcnO1xyXG5cdFx0cHJvZHVjdHMuZm9yRWFjaChmdW5jdGlvbihwcm9kdWN0KSB7XHJcblx0XHRcdHRoaXMud3JhcHBlci5hcHBlbmRDaGlsZChwcm9kdWN0KTtcclxuXHRcdH0uYmluZCh0aGlzKSk7XHJcblxyXG5cdFx0cmV0dXJuIGl0ZW1zO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogTWFrZXMgYW4gQWpheCBjYWxsIHRvIHRoZSBcclxuXHQgKiBzZXJ2ZXIgd2l0aG91dCBwYXJhbWV0ZXJzLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIGludGVnZXIgfCBwYWdlTnVtYmVyXHJcblx0ICogQHJldHVybiBQcm9taXNlXHJcblx0ICovXHJcblx0Z2V0UHJvZHVjdHMocGFnZU51bWJlciA9IDEpXHJcblx0e1xyXG5cdFx0bGV0IGFjdGlvbiA9IChwYWdlTnVtYmVyKSA/IHRoaXMuc2V0dGluZ3MudXJsICsgJz9wYWdlPScgKyBwYWdlTnVtYmVyIDogdGhpcy5zZXR0aW5ncy51cmw7XHJcblxyXG5cdFx0cmV0dXJuIEh0dHAkMS5nZXQoe1xyXG5cdFx0XHR1cmw6IGFjdGlvbixcclxuXHRcdH0pO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQnVpbGRzIHRoZSBodG1sIGZvciB0aGUgcHJvZHVjdHMuXHJcblx0ICogXHJcblx0ICogQHBhcmFtIGFycmF5IHwgYXR0cmlidXRlc0NvbGxlY3Rpb25cclxuXHQgKiBAcGFyYW0gc3RyaW5nIHwgY2xhc3NOYW1lXHJcblx0ICogQHBhcmFtIHN0cmluZyB8IHRhZ1R5cGVcclxuXHQgKiBAcmV0dXJuIGFycmF5XHJcblx0ICovXHJcblx0YnVpbGRQcm9kdWN0cyhhdHRyaWJ1dGVzQ29sbGVjdGlvbiwgY2xhc3NOYW1lLCB0YWdUeXBlKSBcclxuXHR7XHJcblx0XHRpZihhdHRyaWJ1dGVzQ29sbGVjdGlvbi5jb25zdHJ1Y3Rvci5uYW1lICE9ICdBcnJheScgKSB7XHJcblx0XHRcdHRocm93IG5ldyBJbnZhbGlkQXJndW1lbnRFeGNlcHRpb24kMTtcclxuXHRcdH1cclxuXHJcblx0XHRsZXQgYnVpbHRQcm9kdWN0cyA9IFtdO1xyXG5cclxuXHRcdGF0dHJpYnV0ZXNDb2xsZWN0aW9uLmZvckVhY2goZnVuY3Rpb24oYXR0cmlidXRlcykge1xyXG5cdFx0XHRsZXQgYnVpbHRQcm9kdWN0ID0gdGhpcy5idWlsZFByb2R1Y3QoYXR0cmlidXRlcywgY2xhc3NOYW1lLCB0YWdUeXBlKTtcclxuXHRcdFx0YnVpbHRQcm9kdWN0cy5wdXNoKGJ1aWx0UHJvZHVjdCk7XHJcblx0XHR9LmJpbmQodGhpcykpO1xyXG5cclxuXHRcdHJldHVybiBidWlsdFByb2R1Y3RzO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQnVpbGRzIHRoZSBodG1sIGZvciBhIHNpbmdsZSBwcm9kdWN0LlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIG9iamVjdCB8IGF0dHJpYnV0ZXNcclxuXHQgKiBAcGFyYW0gc3RyaW5nIHwgY2xhc3NOYW1lXHJcblx0ICogQHBhcmFtIHN0cmluZyB8IHRhZ1R5cGVcclxuXHQgKiBAcmV0dXJuIG9iamVjdFxyXG5cdCAqL1xyXG5cdGJ1aWxkUHJvZHVjdChhdHRyaWJ1dGVzLCBjbGFzc05hbWUsIHRhZ1R5cGUpIFxyXG5cdHtcclxuXHRcdGlmICh0eXBlb2YgYXR0cmlidXRlcyAhPSAnb2JqZWN0JyB8fCB0eXBlb2YgdGFnVHlwZSAhPSAnc3RyaW5nJykge1xyXG5cdFx0XHR0aHJvdyBuZXcgSW52YWxpZEFyZ3VtZW50RXhjZXB0aW9uJDE7XHJcblx0XHR9XHJcblxyXG5cdFx0Y2xhc3NOYW1lID0gY2xhc3NOYW1lIHx8IG51bGw7XHJcblxyXG5cdFx0bGV0IHByb2R1Y3QgPSBET00uY3JlYXRlRWxlbWVudCgnZGl2Jywge1xyXG5cdFx0XHRjbGFzczogJ3Byb2R1Y3QnXHJcblx0XHR9KTtcclxuXHJcblx0XHRET00uYWRkQ2xhc3MocHJvZHVjdCwgY2xhc3NOYW1lKTtcclxuXHJcblx0XHRsZXQgb3ZlcmxheSA9IERPTS5jcmVhdGVFbGVtZW50KCdkaXYnLCB7XHJcblx0XHRcdGNsYXNzOiAncHJvZHVjdC1vdmVybGF5JyxcclxuXHRcdH0pO1xyXG5cclxuXHRcdHByb2R1Y3QuYXBwZW5kQ2hpbGQob3ZlcmxheSk7XHJcblxyXG5cdFx0Zm9yICh2YXIgYXR0cmlidXRlIGluIGF0dHJpYnV0ZXMpIHtcclxuXHRcdFx0aWYgKCEgQ29tbW9uLmluX2FycmF5KGF0dHJpYnV0ZSwgdGhpcy5zZXR0aW5ncy5hdHRyaWJ1dGVzKSkge1xyXG5cdFx0XHRcdGNvbnRpbnVlO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRsZXQgdGFnID0gRE9NLmNyZWF0ZUVsZW1lbnQodGFnVHlwZSk7XHJcblxyXG5cdFx0XHRpZiAoYXR0cmlidXRlID09ICdpbWFnZScpIHtcclxuXHRcdFx0XHRsZXQgaW1hZ2UgPSBET00uY3JlYXRlRWxlbWVudCgnaW1nJywge1xyXG5cdFx0XHRcdFx0c3JjOiBhdHRyaWJ1dGVzW2F0dHJpYnV0ZV1cclxuXHRcdFx0XHR9KTtcclxuXHRcdFx0XHRwcm9kdWN0LmFwcGVuZENoaWxkKGltYWdlKTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHR0YWcuaW5uZXJIVE1MID0gYXR0cmlidXRlc1thdHRyaWJ1dGVdIHx8ICcnO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRET00uYWRkQ2xhc3ModGFnLCAncHJvZHVjdC0nICsgU3RyLmtlYmFiQ2FzZShhdHRyaWJ1dGUpKTtcclxuXHRcdFx0b3ZlcmxheS5hcHBlbmRDaGlsZCh0YWcpO1xyXG5cdFx0fVxyXG5cclxuXHRcdGxldCB0YWcgPSBET00uY3JlYXRlRWxlbWVudCgnZGl2Jywge1xyXG5cdFx0XHRpZDogJ2FjdGlvbkJ1dHRvbnMnLFxyXG5cdFx0XHRjbGFzczogJ2FjdGlvbi1idXR0b25zJ1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0bGV0IGFkZFRvQ2FydCA9IERPTS5jcmVhdGVFbGVtZW50KCdidXR0b24nLCB7XHJcblx0XHRcdGlkOiAnYWRkVG9DYXJ0JyxcclxuXHRcdFx0Y2xhc3M6IHRoaXMuc2V0dGluZ3MuYWRkX2J1dHRvbl9jbGFzcyxcclxuXHRcdFx0dHlwZTogJ2J1dHRvbicsXHJcblx0XHRcdHRleHQ6ICcrJyxcclxuXHRcdH0pO1xyXG5cclxuXHRcdGxldCBmYXZvcml0ZSA9IERPTS5jcmVhdGVFbGVtZW50KCdidXR0b24nLCB7XHJcblx0XHRcdGlkOiAnZmF2b3JpdGUnLFxyXG5cdFx0XHRjbGFzczogdGhpcy5zZXR0aW5ncy5mYXZvcml0ZV9idXR0b25fY2xhc3MsXHJcblx0XHRcdHR5cGU6ICdidXR0b24nLFxyXG5cdFx0XHR0ZXh0OiAnJmhlYXJ0czsnXHJcblx0XHR9KTtcclxuXHJcblx0XHR0YWcuYXBwZW5kQ2hpbGQoYWRkVG9DYXJ0KTtcclxuXHRcdHRhZy5hcHBlbmRDaGlsZChmYXZvcml0ZSk7XHJcblxyXG5cdFx0YWRkVG9DYXJ0LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xyXG5cdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XHJcblx0XHRcdEV2ZW50TWFuYWdlciQzLnB1Ymxpc2goJ2NhcnQucHJvZHVjdHMuYWRkZWQnLCBhdHRyaWJ1dGVzKTtcclxuXHRcdH0pO1xyXG5cclxuXHRcdG92ZXJsYXkuYXBwZW5kQ2hpbGQodGFnKTtcclxuXHJcblx0XHRyZXR1cm4gcHJvZHVjdDtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEFkZCB0aGUgZUNvbW1lcmNlIHN0eWxlIHRhZ3MgdG8gdGhlIERPTS5cclxuXHQgKi9cclxuXHRhZGRTdHlsZVRhZygpIFxyXG5cdHtcclxuXHRcdGlmKERPTS5maW5kKCcjZUNvbW1lcmNlLVByb2R1Y3RzJykpIHtcclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0fVxyXG5cclxuXHRcdGxldCBjc3MgPSBgXHJcblx0XHRcdC5wcm9kdWN0IHtcclxuXHRcdFx0XHRwb3NpdGlvbjogcmVsYXRpdmU7XHJcblx0XHRcdFx0bWFyZ2luOiA1cHggNXB4O1xyXG5cdFx0XHRcdGJvcmRlcjogMXB4IHNvbGlkICNlNGU0ZTQ7XHJcblx0XHRcdFx0d2lkdGg6ICR7dGhpcy5zZXR0aW5ncy53aWR0aH07XHJcblx0XHRcdFx0aGVpZ2h0OiAke3RoaXMuc2V0dGluZ3MuaGVpZ2h0fTtcclxuXHRcdFx0XHRjdXJzb3I6IHBvaW50ZXI7XHJcblx0XHRcdFx0Y29sb3I6ICNmZmZmZmY7XHJcblx0XHRcdFx0b3ZlcmZsb3c6IGhpZGRlbjtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0LnByb2R1Y3QgPiAucHJvZHVjdC1vdmVybGF5IHtcclxuXHRcdFx0XHRwb3NpdGlvbjogYWJzb2x1dGU7XHJcblx0XHRcdFx0dG9wOiAwO1xyXG5cdFx0XHRcdGxlZnQ6IDA7XHJcblx0XHRcdFx0d2lkdGg6IDEwMCU7XHJcblx0XHRcdFx0aGVpZ2h0OiAxMDAlO1xyXG5cdFx0XHRcdG9wYWNpdHk6IDAuNTtcclxuXHRcdFx0XHR6LWluZGV4OiA1O1xyXG5cdFx0XHRcdHRyYW5zaXRpb246IDFzIGFsbDtcclxuXHRcdFx0XHR0cmFuc2Zvcm06IHRyYW5zbGF0ZVgoLTI1MHB4KTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0LnByb2R1Y3Q6aG92ZXIgPiAucHJvZHVjdC1vdmVybGF5IHtcclxuXHRcdFx0XHRiYWNrZ3JvdW5kOiByZ2JhKDAsIDAsIDAsIDAuNDUpO1xyXG5cdFx0XHRcdHRyYW5zZm9ybTogdHJhbnNsYXRlWCgwcHgpO1xyXG5cdFx0XHRcdG9wYWNpdHk6IDE7XHJcblx0XHRcdFx0dHJhbnNpdGlvbjogMXMgYWxsO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHQucHJvZHVjdCA+IGltZyB7XHJcblx0XHRcdFx0cG9zaXRpb246IGFic29sdXRlO1xyXG5cdFx0XHRcdGxlZnQ6IDA7XHJcblx0XHRcdFx0dG9wOiAwO1xyXG5cdFx0XHRcdHdpZHRoOiAxMDAlO1xyXG5cdFx0XHRcdGhlaWdodDogMTAwJTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0LnByb2R1Y3QgPiAucHJvZHVjdC1pbWFnZSB7XHJcblx0XHRcdFx0ei1pbmRleDogMDtcclxuXHRcdFx0XHRwb3NpdGlvbjogYWJzb2x1dGU7XHJcblx0XHRcdFx0dG9wOiAwO1xyXG5cdFx0XHRcdGxlZnQ6IDA7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdC5wcm9kdWN0ID4gLnByb2R1Y3Qtb3ZlcmxheSA+IC5wcm9kdWN0LW5hbWUsIFxyXG5cdFx0XHQucHJvZHVjdCA+IC5wcm9kdWN0LW92ZXJsYXkgPiAucHJvZHVjdC1wcmljZSxcclxuXHRcdFx0LnByb2R1Y3QgPiAucHJvZHVjdC1vdmVybGF5ID4gLnByb2R1Y3QtZGVsaXZlcnktdGltZSB7XHJcblx0XHRcdFx0ei1pbmRleDogMTtcclxuXHRcdFx0XHRwb3NpdGlvbjogcmVsYXRpdmU7XHJcblx0XHRcdFx0dGV4dC1hbGlnbjogY2VudGVyO1xyXG5cdFx0XHRcdG1hcmdpbi10b3A6IDI1cHg7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdC5wcm9kdWN0ID4gLnByb2R1Y3Qtb3ZlcmxheSA+IC5hY3Rpb24tYnV0dG9ucyB7XHJcblx0XHRcdFx0d2lkdGg6IDEwMCU7XHJcblx0XHRcdFx0bWFyZ2luLXRvcDogMTBweDtcclxuXHRcdFx0XHR0ZXh0LWFsaWduOiBjZW50ZXI7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdC5wcm9kdWN0ID4gLnByb2R1Y3Qtb3ZlcmxheSA+IC5hY3Rpb24tYnV0dG9ucyA+ICNmYXZvcml0ZSB7XHJcblx0XHRcdFx0bWFyZ2luLWxlZnQ6IDEwcHg7XHJcblx0XHRcdH1cclxuXHJcblx0XHRgO1xyXG5cdCAgICBcclxuXHQgICAgRE9NLmFkZFN0eWxlKCdlQ29tbWVyY2UtUHJvZHVjdHMnLCBjc3MpO1xyXG5cdH1cclxufVxuXG4vKipcclxuICogVGhlIFNlcnZpY2VzIE9iamVjdCwgaGFuZGxlcyB0aGUgc2VydmljZXMuXHJcbiAqL1xyXG5jbGFzcyBTZXJ2aWNlcyBcclxue1xyXG5cclxufVxuXG4vKipcclxuICogVGhlIGRlZmF1bHQgc2V0dGluZ3Mgb2YgdGhlIHBhZ2luYXRpb24uXHJcbiAqL1xyXG5sZXQgZGVmYXVsdFNldHRpbmdzJDUgPSB7XHJcblx0ZWxlbWVudDogJy5wYWdpbmF0aW9uLWxpbmtzJyxcclxuXHRjbGFzczogJycsXHJcblx0cGVyX3BhZ2U6IDUsXHJcblx0dG90YWxfaXRlbXM6IDEwLFxyXG59O1xyXG5cclxuLyoqXHJcbiAqIFN0b3JlcyB0aGUgY29udGFpbmVyIG9iamVjdC5cclxuICovXHJcbmxldCBDb250YWluZXIkNTtcclxuXHJcbi8qKlxyXG4gKiBTdG9yZXMgdGhlIHByb2R1Y3RzIGNvbXBvbmVudC5cclxuICovXHJcbmxldCBQcm9kdWN0cyQyO1xyXG5cclxuLyoqXHJcbiAqIFRoZSBQYWdpbmF0aW9uIE9iamVjdCwgaGFuZGxlcyB0aGUgcGFnaW5hdGlvbi5cclxuICovXHJcbmNsYXNzIFBhZ2luYXRpb24gXHJcbntcclxuXHQvKipcclxuXHQgKiBJbml0aWFsaXplIHRoZSBjb250YWluZXIgb2JqZWN0IGFuZCB0aGUgZGVmYXVsdCBzZXR0aW5ncy5cclxuXHQgKi9cclxuXHRjb25zdHJ1Y3Rvcihjb250YWluZXIsIHByb2R1Y3RzKSBcclxuXHR7XHJcblx0XHR0aGlzLnNldEN1cnJlbnQoMSk7XHJcblx0XHRDb250YWluZXIkNSA9IGNvbnRhaW5lcjtcclxuXHRcdFByb2R1Y3RzJDIgPSBwcm9kdWN0cztcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFNldCB0aGUgUGFnaW5hdGlvbiBvYmplY3QgdXAuXHJcblx0ICovXHJcblx0c2V0dXAoc2V0dGluZ3MpXHJcblx0e1xyXG5cdFx0ZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsIGZ1bmN0aW9uKCkge1xyXG5cclxuXHRcdGlmKHR5cGVvZiBzZXR0aW5ncyAhPSAnb2JqZWN0Jykge1xyXG5cdFx0XHR0aHJvdyBuZXcgSW52YWxpZEFyZ3VtZW50RXhjZXB0aW9uJDE7XHJcblx0XHR9XHJcblxyXG5cdFx0dGhpcy5zZXR0aW5ncyA9IENvbW1vbi5leHRlbmQoZGVmYXVsdFNldHRpbmdzJDUsIHNldHRpbmdzKTtcclxuXHJcblx0XHR0aGlzLnRvdGFsUGFnZXMgPSB0aGlzLmNhbGN1bGF0ZVRvdGFsUGFnZXModGhpcy5zZXR0aW5ncy5wZXJfcGFnZSwgdGhpcy5zZXR0aW5ncy50b3RhbF9pdGVtcyk7XHJcblx0XHRcclxuXHRcdHRoaXMuc2V0RWxlbWVudCh0aGlzLnNldHRpbmdzLmVsZW1lbnQpO1xyXG5cdFx0dGhpcy5yZXBsYWNlTGlua3ModGhpcy5saW5rcyk7XHJcblxyXG5cdFx0fS5iaW5kKHRoaXMpKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFNldHMgdGhlIHdyYXBwZXIgZWxlbWVudC5cclxuXHQgKi9cclxuXHRzZXRFbGVtZW50KHNlbGVjdG9yKVxyXG5cdHtcclxuXHRcdHRoaXMud3JhcHBlciA9IERPTS5maW5kKHNlbGVjdG9yKTtcclxuXHRcdFxyXG5cdFx0RE9NLmFkZENsYXNzKHRoaXMud3JhcHBlciwgdGhpcy5zZXR0aW5ncy5jbGFzcyk7XHJcblxyXG5cdFx0dGhpcy5saW5rcyA9IHRoaXMuY3JlYXRlTGlua3MoKTtcclxuXHRcdHRoaXMuYmluZEV2ZW50TGlzdGVuZXJzKHRoaXMubGlua3MpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogUmVwbGFjZXMgdGhlIGxpbmtzIGluIHRoZSB3cmFwcGVyLlxyXG5cdCAqL1xyXG5cdHJlcGxhY2VMaW5rcyhsaW5rcylcclxuXHR7XHJcblx0XHR0aGlzLndyYXBwZXIuaW5uZXJIVE1MID0gJyc7XHJcblx0XHR0aGlzLndyYXBwZXIuYXBwZW5kQ2hpbGQobGlua3MpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQ2FsY3VsYXRlcyB0aGUgdG90YWwgcGFnZXMuXHJcblx0ICovXHJcblx0Y2FsY3VsYXRlVG90YWxQYWdlcyhwZXJQYWdlLCB0b3RhbEl0ZW1zKVxyXG5cdHtcclxuXHRcdHBlclBhZ2UgPSBwYXJzZUludChwZXJQYWdlKTtcclxuXHRcdHRvdGFsSXRlbXMgPSBwYXJzZUludCh0b3RhbEl0ZW1zKTtcclxuXHJcblx0XHRyZXR1cm4gTWF0aC5jZWlsKHRvdGFsSXRlbXMgLyBwZXJQYWdlKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEJpbmRzIHRoZSBidXR0b25zIGV2ZW50cyBsaXN0ZW5lcnMuXHJcblx0ICovXHJcblx0YmluZEV2ZW50TGlzdGVuZXJzKGxpbmtzKSBcclxuXHR7XHJcblx0XHRsZXQgaW5zdGFuY2UgPSB0aGlzO1xyXG5cclxuXHRcdHRoaXMubmV4dC5jaGlsZE5vZGVzWzBdLm9uY2xpY2sgPSBmdW5jdGlvbihlKSB7XHJcblx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcclxuXHJcblx0XHRcdGxldCByZXF1ZXN0ZWRQYWdlID0gaW5zdGFuY2UuY3VycmVudCsxO1xyXG5cclxuXHRcdFx0aWYgKGluc3RhbmNlLm5vdEluUGFnZVJhbmdlKHJlcXVlc3RlZFBhZ2UpKSB7XHJcblx0XHRcdFx0dGhyb3cgbmV3IE5vdEluUGFnZVJhbmdlRXhjZXB0aW9uO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRQcm9kdWN0cyQyLmdldFByb2R1Y3RzKHJlcXVlc3RlZFBhZ2UpLnRoZW4oZnVuY3Rpb24ocHJvZHVjdHMpIHtcclxuXHRcdFx0XHRQcm9kdWN0cyQyLnJlcGxhY2VJdGVtcyhwcm9kdWN0cyk7XHJcblx0XHRcdH0pO1xyXG5cclxuXHRcdFx0aW5zdGFuY2Uuc2V0Q3VycmVudChyZXF1ZXN0ZWRQYWdlKTtcclxuXHRcdH07XHJcblxyXG5cdFx0dGhpcy5wcmV2aW91cy5jaGlsZE5vZGVzWzBdLm9uY2xpY2sgPSBmdW5jdGlvbihlKSB7XHJcblx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcclxuXHJcblx0XHRcdGxldCByZXF1ZXN0ZWRQYWdlID0gaW5zdGFuY2UuY3VycmVudC0xO1xyXG5cclxuXHRcdFx0aWYoaW5zdGFuY2Uubm90SW5QYWdlUmFuZ2UocmVxdWVzdGVkUGFnZSkpIHtcclxuXHRcdFx0XHR0aHJvdyBuZXcgTm90SW5QYWdlUmFuZ2VFeGNlcHRpb247XHJcblx0XHRcdH1cclxuXHRcdFx0XHJcblx0XHRcdFByb2R1Y3RzJDIuZ2V0UHJvZHVjdHMocmVxdWVzdGVkUGFnZSkudGhlbihmdW5jdGlvbihwcm9kdWN0cykge1xyXG5cdFx0XHRcdFByb2R1Y3RzJDIucmVwbGFjZUl0ZW1zKHByb2R1Y3RzKTtcclxuXHRcdFx0fSk7XHJcblxyXG5cdFx0XHRpbnN0YW5jZS5zZXRDdXJyZW50KHJlcXVlc3RlZFBhZ2UpO1xyXG5cdFx0fTtcclxuXHJcblx0XHRmb3IodmFyIGkgPSAwOyBpIDwgdGhpcy5wYWdlcy5sZW5ndGg7IGkrKykge1xyXG5cdFx0XHR0aGlzLnBhZ2VzW2ldLmNoaWxkTm9kZXNbMF0ub25jbGljayA9IGZ1bmN0aW9uKGUpIHtcclxuXHRcdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XHJcblx0XHRcdFx0XHJcblx0XHRcdFx0bGV0IHJlcXVlc3RlZFBhZ2UgPSB0aGlzLmdldEF0dHJpYnV0ZSgnZGF0YS1wYWdlLW5yJyk7XHJcblx0XHRcdFx0XHJcblx0XHRcdFx0UHJvZHVjdHMkMi5nZXRQcm9kdWN0cyhyZXF1ZXN0ZWRQYWdlKS50aGVuKGZ1bmN0aW9uKHByb2R1Y3RzKSB7XHJcblx0XHRcdFx0XHRQcm9kdWN0cyQyLnJlcGxhY2VJdGVtcyhwcm9kdWN0cyk7XHJcblx0XHRcdFx0fSk7XHJcblx0XHRcdFx0XHJcblx0XHRcdFx0aW5zdGFuY2Uuc2V0Q3VycmVudChyZXF1ZXN0ZWRQYWdlKTtcclxuXHRcdFx0fTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFNldHMgdGhlIGN1cnJlbnQgcGFnZS5cclxuXHQgKi9cclxuXHRzZXRDdXJyZW50KHBhZ2VOdW1iZXIpIFxyXG5cdHtcclxuXHRcdHRoaXMuY3VycmVudCA9IHBhcnNlSW50KHBhZ2VOdW1iZXIpO1xyXG5cdFx0dGhpcy5jaGFuZ2VVcmwocGFnZU51bWJlcik7XHJcblx0XHR0aGlzLnNldEFjdGl2ZUxpbmsocGFnZU51bWJlcik7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBHZXRzIHRoZSBjdXJyZW50IHBhZ2UuXHJcblx0ICovXHJcblx0Z2V0Q3VycmVudCgpIFxyXG5cdHtcclxuXHRcdHJldHVybiB0aGlzLmN1cnJlbnQ7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBDcmVhdGVzIHRoZSBwYWdpbmF0aW9uIGxpbmtzLlxyXG5cdCAqL1xyXG5cdGNyZWF0ZUxpbmtzKCkgXHJcblx0e1xyXG5cdFx0bGV0IHVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndWwnKTtcclxuXHRcdFxyXG5cdFx0dGhpcy5wYWdlcyA9IHRoaXMuY3JlYXRlUGFnZUxpbmtzKCk7XHJcblx0XHR0aGlzLnByZXZpb3VzID0gdGhpcy5jcmVhdGVQcmV2aW91c0J1dHRvbigpO1xyXG5cdFx0dGhpcy5uZXh0ID0gdGhpcy5jcmVhdGVOZXh0QnV0dG9uKCk7XHJcblxyXG5cdFx0dWwuY2xhc3NOYW1lID0gJ3BhZ2luYXRpb24nO1xyXG5cdFx0dWwuYXBwZW5kQ2hpbGQodGhpcy5wcmV2aW91cyk7XHJcblxyXG5cdFx0dGhpcy5wYWdlcy5mb3JFYWNoKGZ1bmN0aW9uKHBhZ2UpIHtcclxuXHRcdFx0dWwuYXBwZW5kQ2hpbGQocGFnZSk7XHJcblx0XHR9KTtcclxuXHJcblx0XHR1bC5hcHBlbmRDaGlsZCh0aGlzLm5leHQpO1xyXG5cclxuXHRcdHJldHVybiB1bDtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIENyZWF0ZXMgdGhlIHBhZ2VzIGl0ZW0gbGlua3MuXHJcblx0ICovXHJcblx0Y3JlYXRlUGFnZUxpbmtzKCkgXHJcblx0e1xyXG5cdFx0dmFyIHBhZ2VzID0gW107XHJcblxyXG5cdFx0Zm9yKHZhciBpID0gMTsgaSA8PSB0aGlzLnRvdGFsUGFnZXM7IGkrKykge1xyXG5cdFx0XHR2YXIgcGFnZUl0ZW0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaScpO1xyXG5cdFx0XHR2YXIgbGluayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKTtcclxuXHRcdFx0cGFnZUl0ZW0uY2xhc3NOYW1lID0gKHRoaXMuY3VycmVudCA9PSBpKSA/ICdwYWdlLWl0ZW0gYWN0aXZlJyA6ICdwYWdlLWl0ZW0nO1xyXG5cdFx0XHRsaW5rLmNsYXNzTmFtZSA9ICdwYWdlLWxpbmsnO1xyXG5cdFx0XHRsaW5rLnNldEF0dHJpYnV0ZSgnaHJlZicsICc/cGFnZT0nKyBpKTtcclxuXHRcdFx0bGluay5zZXRBdHRyaWJ1dGUoJ2RhdGEtcGFnZS1ucicsIGkpO1xyXG5cdFx0XHRsaW5rLmlubmVySFRNTCA9IGk7XHJcblx0XHRcdHBhZ2VJdGVtLmFwcGVuZENoaWxkKGxpbmspO1xyXG5cdFx0XHRwYWdlcy5wdXNoKHBhZ2VJdGVtKTtcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gcGFnZXM7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBDcmVhdGVzIHRoZSBwcmV2aW91cyBidXR0b24gbGluay5cclxuXHQgKi9cclxuXHRjcmVhdGVQcmV2aW91c0J1dHRvbigpIFxyXG5cdHtcclxuXHRcdHZhciBsaSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJyk7XHJcblx0XHR2YXIgbGluayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKTtcclxuXHRcdHZhciBzcGFuMSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcclxuXHRcdHZhciBzcGFuMiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcclxuXHRcdFxyXG5cdFx0XHJcblx0XHRsaS5jbGFzc05hbWUgPSAncGFnZS1pdGVtJztcclxuXHRcdGxpbmsuY2xhc3NOYW1lID0gJ3BhZ2UtbGluayc7XHJcblx0XHRzcGFuMi5jbGFzc05hbWUgPSAnc3Itb25seSc7XHJcblxyXG5cdFx0bGluay5zZXRBdHRyaWJ1dGUoJ2hyZWYnLCAnJyk7XHJcblx0XHRsaW5rLnNldEF0dHJpYnV0ZSgnYXJpYS1sYWJlbCcsICdQcmV2aW91cycpO1xyXG5cdFx0c3BhbjEuc2V0QXR0cmlidXRlKCdhcmlhLWhpZGRlbicsICd0cnVlJyk7XHJcblxyXG5cdFx0c3BhbjEuaW5uZXJIVE1MID0gJyZsYXF1bzsnO1xyXG5cdFx0c3BhbjIuaW5uZXJIVE1MID0gJ1ByZXZpb3VzJztcclxuXHJcblx0XHRsaW5rLmFwcGVuZENoaWxkKHNwYW4xKTtcclxuXHRcdGxpbmsuYXBwZW5kQ2hpbGQoc3BhbjIpO1xyXG5cdFx0bGkuYXBwZW5kQ2hpbGQobGluayk7XHJcblxyXG5cdFx0cmV0dXJuIGxpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQ3JlYXRlcyB0aGUgbmV4dCBidXR0b24gbGluay5cclxuXHQgKi9cclxuXHRjcmVhdGVOZXh0QnV0dG9uKCkgXHJcblx0e1xyXG5cdFx0dmFyIGxpID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKTtcclxuXHRcdHZhciBsaW5rID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpO1xyXG5cdFx0dmFyIHNwYW4xID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xyXG5cdFx0dmFyIHNwYW4yID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xyXG5cdFx0XHJcblx0XHRsaS5jbGFzc05hbWUgPSAncGFnZS1pdGVtJztcclxuXHRcdGxpbmsuY2xhc3NOYW1lID0gJ3BhZ2UtbGluayc7XHJcblx0XHRzcGFuMi5jbGFzc05hbWUgPSAnc3Itb25seSc7XHJcblxyXG5cdFx0bGluay5zZXRBdHRyaWJ1dGUoJ2hyZWYnLCAnJyk7XHJcblx0XHRsaW5rLnNldEF0dHJpYnV0ZSgnYXJpYS1sYWJlbCcsICdOZXh0Jyk7XHJcblx0XHRzcGFuMS5zZXRBdHRyaWJ1dGUoJ2FyaWEtaGlkZGVuJywgJ3RydWUnKTtcclxuXHJcblx0XHRzcGFuMS5pbm5lckhUTUwgPSAnJnJhcXVvOyc7XHJcblx0XHRzcGFuMi5pbm5lckhUTUwgPSAnTmV4dCc7XHJcblxyXG5cdFx0bGluay5hcHBlbmRDaGlsZChzcGFuMSk7XHJcblx0XHRsaW5rLmFwcGVuZENoaWxkKHNwYW4yKTtcclxuXHRcdGxpLmFwcGVuZENoaWxkKGxpbmspO1xyXG5cclxuXHRcdHJldHVybiBsaTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIENoZWNrcyBpZiB0aGUgZ2l2ZW4gcGFnZSBpcyBpbiByYW5nZS5cclxuXHQgKi9cclxuXHRub3RJblBhZ2VSYW5nZShwYWdlTnVtYmVyKSBcclxuXHR7XHJcblx0XHRyZXR1cm4gKHBhZ2VOdW1iZXIgPiB0aGlzLnRvdGFsUGFnZXMgfHwgcGFnZU51bWJlciA8PSAwKSB8fCBpc05hTihwYWdlTnVtYmVyKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIENoYW5nZXMgdGhlIHVybCB0byBhIGdpdmVuIHBhZ2UgbnVtYmVyLlxyXG5cdCAqL1xyXG5cdGNoYW5nZVVybChwYWdlTnVtYmVyKSBcclxuXHR7XHJcblx0XHRwYWdlTnVtYmVyID0gIHBhZ2VOdW1iZXIgfHwgR0VUX1ZhcnMoKVsncGFnZSddO1xyXG5cdFx0d2luZG93Lmhpc3RvcnkucmVwbGFjZVN0YXRlKCcnLCAnJywgdGhpcy51cGRhdGVVUkxQYXJhbWV0ZXIod2luZG93LmxvY2F0aW9uLmhyZWYsICdwYWdlJywgcGFnZU51bWJlcikpO1xyXG5cdH1cclxuXHJcblx0c2V0QWN0aXZlTGluayhwYWdlTnVtYmVyKVxyXG5cdHtcclxuXHRcdGZvcih2YXIgcGFnZSBpbiB0aGlzLnBhZ2VzKSB7XHJcblx0XHRcdGlmICh0aGlzLnBhZ2VzW3BhZ2VdLmNoaWxkTm9kZXNbMF0uZ2V0QXR0cmlidXRlKCdkYXRhLXBhZ2UtbnInKSA9PSBwYWdlTnVtYmVyKSB7XHJcblx0XHRcdFx0RE9NLmFkZENsYXNzKHRoaXMucGFnZXNbcGFnZV0sICdhY3RpdmUnKTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRET00ucmVtb3ZlQ2xhc3ModGhpcy5wYWdlc1twYWdlXSwgJ2FjdGl2ZScpO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBHZXQgdGhlIGdldCB2YXJpYWJsZXMgZnJvbSB0aGUgdXJsLlxyXG5cdCAqL1xyXG5cdEdFVF9WYXJzKCkgXHJcblx0e1xyXG5cdFx0dmFyIHZhcnMgPSB7fTtcclxuXHRcdHZhciBwYXJ0cyA9IHdpbmRvdy5sb2NhdGlvbi5ocmVmLnJlcGxhY2UoL1s/Jl0rKFtePSZdKyk9KFteJl0qKS9naSwgZnVuY3Rpb24obSwga2V5LCB2YWx1ZSkge1xyXG5cdFx0XHR2YXJzW2tleV0gPSB2YWx1ZTtcclxuXHRcdH0pO1xyXG5cclxuXHRcdHJldHVybiB2YXJzO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogTW9kaWZpZXMgdGhlIGdldCBwYXJhbWV0ZXIgaW4gdGhlIHVybC5cclxuXHQgKi9cclxuXHR1cGRhdGVVUkxQYXJhbWV0ZXIodXJsLCBwYXJhbSwgcGFyYW1WYWwpIFxyXG5cdHtcclxuXHQgICAgdmFyIG5ld0FkZGl0aW9uYWxVUkwgPSBcIlwiO1xyXG5cdCAgICB2YXIgdGVtcEFycmF5ID0gdXJsLnNwbGl0KFwiP1wiKTtcclxuXHQgICAgdmFyIGJhc2VVUkwgPSB0ZW1wQXJyYXlbMF07XHJcblx0ICAgIHZhciBhZGRpdGlvbmFsVVJMID0gdGVtcEFycmF5WzFdO1xyXG5cdCAgICB2YXIgdGVtcCA9IFwiXCI7XHJcblxyXG5cdCAgICBpZiAoYWRkaXRpb25hbFVSTCkge1xyXG5cdCAgICAgICAgdGVtcEFycmF5ID0gYWRkaXRpb25hbFVSTC5zcGxpdChcIiZcIik7XHJcblx0ICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRlbXBBcnJheS5sZW5ndGg7IGkrKyl7XHJcblx0ICAgICAgICAgICAgaWYgKHRlbXBBcnJheVtpXS5zcGxpdCgnPScpWzBdICE9IHBhcmFtKXtcclxuXHQgICAgICAgICAgICAgICAgbmV3QWRkaXRpb25hbFVSTCArPSB0ZW1wICsgdGVtcEFycmF5W2ldO1xyXG5cdCAgICAgICAgICAgICAgICB0ZW1wID0gXCImXCI7XHJcblx0ICAgICAgICAgICAgfVxyXG5cdCAgICAgICAgfVxyXG5cdCAgICB9XHJcblxyXG5cdCAgICB2YXIgcm93c1RleHQgPSB0ZW1wICsgXCJcIiArIHBhcmFtICsgXCI9XCIgKyBwYXJhbVZhbDtcclxuXHQgICAgcmV0dXJuIGJhc2VVUkwgKyBcIj9cIiArIG5ld0FkZGl0aW9uYWxVUkwgKyByb3dzVGV4dDtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFJlc2V0cyB0aGUgcGFnaW5hdGlvbi5cclxuXHQgKi9cclxuXHRyZXNldCgpIFxyXG5cdHtcclxuXHRcdHRoaXMuc2V0Q3VycmVudCgxKTtcclxuXHRcdHRoaXMuY2hhbmdlVXJsKDEpO1xyXG5cdH1cclxufVxuXG5sZXQgZGVmYXVsdFNldHRpbmdzID0ge1xuXHRlbGVtZW50OiAnYm9keScsXG5cdGltcG9ydEJvb3RzdHJhcDogZmFsc2UsXG5cdGNvbXBvbmVudHM6IFsnUHJvZHVjdHMnLCAnU2VydmljZXMnLCAnRmlsdGVyJywgJ1BhZ2luYXRpb24nLCAnQ2FydCddXG59O1xuXG5jbGFzcyBUdXJib2VDb21tZXJjZVxue1xuXHRjb25zdHJ1Y3RvcihzZXR0aW5ncylcblx0e1xuXHRcdEV4Y2VwdGlvbkhhbmRsZXIuaW5pdGFsaXplKCk7XG5cblx0XHRpZih0eXBlb2Ygc2V0dGluZ3MgIT0gJ29iamVjdCcpIHtcblx0XHRcdHRocm93IG5ldyBJbnZhbGlkQXJndW1lbnRFeGNlcHRpb24kMTtcblx0XHR9XG5cblx0XHR0aGlzLmNvbnRhaW5lciA9IG5ldyBDb250YWluZXI7XG5cdFx0dGhpcy5zZXR0aW5ncyA9IENvbW1vbi5leHRlbmQoZGVmYXVsdFNldHRpbmdzLCBzZXR0aW5ncyk7XG5cdFx0dGhpcy5zZXR0aW5ncy5lbGVtZW50ID0gRE9NLmZpbmQodGhpcy5zZXR0aW5ncy5lbGVtZW50KTtcblx0XHRcblx0XHRiaW5kQ29tcG9uZW50c0RlcGVuZGVuY2llcy5jYWxsKHRoaXMsIHNldHRpbmdzLmNvbXBvbmVudHMpO1xuXG5cdFx0cmV0dXJuIG5ldyBQcm94eSh0aGlzLCB7XG5cdFx0XHRnZXQ6IGZ1bmN0aW9uKHRhcmdldCwgc291cmNlKSB7XG5cdFx0XHRcdGlmIChDb21tb24uaW5fYXJyYXkoc291cmNlLCBzZXR0aW5ncy5jb21wb25lbnRzKSkge1xuXHRcdFx0XHRcdHJldHVybiB0YXJnZXQuY29udGFpbmVyLm1ha2Uoc291cmNlKTtcblx0XHRcdFx0fSBlbHNlIGlmICh0YXJnZXQuY29udGFpbmVyLmluc3RhbmNlRXhpc3Qoc291cmNlKSkge1xuXHRcdFx0XHRcdHJldHVybiB0YXJnZXQuY29udGFpbmVyLmdldEluc3RhbmNlKHNvdXJjZSk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHR0aHJvdyBuZXcgQ29tcG9uZW50Tm90UmVnaXN0ZXJlZEV4Y2VwdGlvbignY29tcG9uZW50cyBtdXN0IGJlIHJlZ2lzdGVyZWQgaW4gb3JkZXIgdG8gdXNlIHRoZW0uJyk7XG5cdFx0XHR9XG5cdFx0fSk7XG5cdH1cbn1cblxuLyoqXG4gKiBCaW5kcyBjb21wb25lbnRzIGRlcGVuZGVuY2llcy5cbiAqXG4gKiBAcGFyYW0gb2JqZWN0IHwgY29tcG9uZW50c1xuICogQHJldHVybiB2b2lkXG4gKi9cbmZ1bmN0aW9uIGJpbmRDb21wb25lbnRzRGVwZW5kZW5jaWVzKGNvbXBvbmVudHMpIHtcblxuXHR0aGlzLmNvbnRhaW5lci5zZXRJbnN0YW5jZSgnRXZlbnRzJywgbmV3IEV2ZW50TWFuYWdlcik7XG5cblx0bGV0IHJlcXVlc3QgPSB0aGlzLmNvbnRhaW5lci5tYWtlKG5ldyBSZXF1ZXN0KTtcblxuXHR0aGlzLmNvbnRhaW5lci5iaW5kKCdGaWx0ZXInLCBmdW5jdGlvbihjb250YWluZXIpIHtcblx0XHRjb250YWluZXJbJ0ZpbHRlciddLmJvb3RlZCA9IHRydWU7XG5cdFx0cmV0dXJuIG5ldyBGaWx0ZXIoY29udGFpbmVyKTtcblx0fSk7XG5cdFxuXHR0aGlzLmNvbnRhaW5lci5iaW5kKCdTZXJ2aWNlcycsIGZ1bmN0aW9uKGNvbnRhaW5lcikgeyBcblx0XHRjb250YWluZXJbJ1NlcnZpY2VzJ10uYm9vdGVkID0gdHJ1ZTtcblx0XHRyZXR1cm4gbmV3IFNlcnZpY2VzKGNvbnRhaW5lcik7XG5cdH0pO1xuXG5cdHRoaXMuY29udGFpbmVyLmJpbmQoJ1Byb2R1Y3RzJywgZnVuY3Rpb24oY29udGFpbmVyKSB7XG5cdFx0Y29udGFpbmVyWydQcm9kdWN0cyddLmJvb3RlZCA9IHRydWU7XG5cdFx0cmV0dXJuIG5ldyBQcm9kdWN0cyhjb250YWluZXIsIHJlcXVlc3QsIGNvbnRhaW5lci5FdmVudHMpO1xuXHR9KTtcblxuXHR0aGlzLmNvbnRhaW5lci5iaW5kKCdQYWdpbmF0aW9uJywgZnVuY3Rpb24oY29udGFpbmVyKSB7XG5cdFx0Y29udGFpbmVyWydQYWdpbmF0aW9uJ10uYm9vdGVkID0gdHJ1ZTtcblx0XHRyZXR1cm4gbmV3IFBhZ2luYXRpb24oY29udGFpbmVyLCBjb250YWluZXIubWFrZSgnUHJvZHVjdHMnKSwgY29udGFpbmVyLkV2ZW50cyk7XG5cdH0pO1xuXG5cdHRoaXMuY29udGFpbmVyLmJpbmQoJ0NhcnQnLCBmdW5jdGlvbihjb250YWluZXIpIHtcblx0XHRjb250YWluZXJbJ0NhcnQnXS5ib290ZWQgPSB0cnVlO1xuXHRcdHJldHVybiBuZXcgQ2FydChjb250YWluZXIsIHJlcXVlc3QsIGNvbnRhaW5lci5FdmVudHMpO1xuXHR9KTtcblxuXHR0aGlzLmNvbnRhaW5lclsnRmlsdGVyJ11bJ2Jvb3RlZCddID0gZmFsc2U7XG5cdHRoaXMuY29udGFpbmVyWydTZXJ2aWNlcyddWydib290ZWQnXSA9IGZhbHNlO1xuXHR0aGlzLmNvbnRhaW5lclsnUHJvZHVjdHMnXVsnYm9vdGVkJ10gPSBmYWxzZTtcblx0dGhpcy5jb250YWluZXJbJ1BhZ2luYXRpb24nXVsnYm9vdGVkJ10gPSBmYWxzZTtcblx0dGhpcy5jb250YWluZXJbJ0NhcnQnXVsnYm9vdGVkJ10gPSBmYWxzZTtcbn1cblxucmV0dXJuIFR1cmJvZUNvbW1lcmNlO1xuXG59KCkpO1xuIl19
