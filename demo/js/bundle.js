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

			var _this = _possibleConstructorReturn(this, (InvalidArgumentException$1.__proto__ || Object.getPrototypeOf(InvalidArgumentException$1)).call(this, message || defaultMessage));

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

	var defaultMessage$1 = 'The data structure is invalid';

	var InvalidDataStructureException = function (_Error2) {
		_inherits(InvalidDataStructureException, _Error2);

		function InvalidDataStructureException(message) {
			_classCallCheck(this, InvalidDataStructureException);

			var _this2 = _possibleConstructorReturn(this, (InvalidDataStructureException.__proto__ || Object.getPrototypeOf(InvalidDataStructureException)).call(this, message || defaultMessage$1));

			console.error('InvalidDataStructureException: ' + message || defaultMessage$1);
			return _this2;
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

	var defaultMessage$2 = 'trying to bind an already existing bound.';

	var InvalidBindingException = function (_Error3) {
		_inherits(InvalidBindingException, _Error3);

		function InvalidBindingException(message) {
			_classCallCheck(this, InvalidBindingException);

			var _this3 = _possibleConstructorReturn(this, (InvalidBindingException.__proto__ || Object.getPrototypeOf(InvalidBindingException)).call(this, message || defaultMessage$2));

			console.error('InvalidBindingException: ' + message || defaultMessage$2);
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

	var defaultMessage$3 = 'The event you called does not exists or you supplied wrong argument';

	var BadEventCallException = function (_Error4) {
		_inherits(BadEventCallException, _Error4);

		function BadEventCallException(message) {
			_classCallCheck(this, BadEventCallException);

			var _this4 = _possibleConstructorReturn(this, (BadEventCallException.__proto__ || Object.getPrototypeOf(BadEventCallException)).call(this, message || defaultMessage$3));

			console.error('BadEventCallException: ' + message || defaultMessage$3);
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

	var defaultMessage$4 = 'expecting for at least one components, but none was given, \n\t\t\t\t\t please add at least one requirement(Products, Services or/and Filter.';

	var ComponentsException = function (_Error5) {
		_inherits(ComponentsException, _Error5);

		function ComponentsException(message) {
			_classCallCheck(this, ComponentsException);

			var _this5 = _possibleConstructorReturn(this, (ComponentsException.__proto__ || Object.getPrototypeOf(ComponentsException)).call(this, message || defaultMessage$4));

			console.error('ComponentsException: ' + message || defaultMessage$4);
			return _this5;
		}

		return ComponentsException;
	}(Error);

	var defaultMessage$5 = 'sorry, no more pages.';

	var NotInPageRangeException = function (_Error6) {
		_inherits(NotInPageRangeException, _Error6);

		function NotInPageRangeException(message) {
			_classCallCheck(this, NotInPageRangeException);

			var _this6 = _possibleConstructorReturn(this, (NotInPageRangeException.__proto__ || Object.getPrototypeOf(NotInPageRangeException)).call(this, message || defaultMessage$5));

			console.error('NotInPageRangeException: ' + message || defaultMessage$5);
			return _this6;
		}

		return NotInPageRangeException;
	}(Error);

	var defaultMessage$6 = 'In order to use components you must register them with the shop!';

	var ComponentNotRegisteredException = function (_Error7) {
		_inherits(ComponentNotRegisteredException, _Error7);

		function ComponentNotRegisteredException(message) {
			_classCallCheck(this, ComponentNotRegisteredException);

			var _this7 = _possibleConstructorReturn(this, (ComponentNotRegisteredException.__proto__ || Object.getPrototypeOf(ComponentNotRegisteredException)).call(this, message || defaultMessage$6));

			console.error('ComponentNotRegisteredException: ' + message || defaultMessage$6);
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

	var Cart = function () {
		/**
   * - Initialize the IoC container
   * - Initialize the Request
   * - Initialize the EventManager
   * - Creates the preview and the icon of the cart.
   *
   * @param \Core\Container | container
   * @param \Helpers\Request | http
   * @param \Core\EventManager | eventManager
   * @return void
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
   *
   * @param object | settings
   * @return void
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
    *
    * @param object | cart
    * @return bool
    */

		}, {
			key: 'isEmpty',
			value: function isEmpty(cart) {
				return Common.emptyObject(cart);
			}

			/**
    * Initialize/Sets the cart as a cookie.
    *
    * @param object | cart
    * @return void
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
    *
    * @param object | item
    * @return void
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
    *
    * @param object | item
    * @return void
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
    *
    * @param array | items
    * @return void
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
    *
    * @param string | selector
    * @return void
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
    *
    * @return HTMLDivElement
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
    *
    * @return void
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
    *
    * @return HTMLDivElement
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
    *
    * @return void
    */

		}, {
			key: 'previewStartLoading',
			value: function previewStartLoading() {
				DOM.addClass(itemsDiv, 'loading');
				this.previewElement.appendChild(this.loadingOverlay());
			}

			/**
    * Loading the cart preview.
    *
    * @return void
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
    *
    * @return void
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
    *
    * @return void
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
    *
    * @return object
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

	/**
  * Closes the cart preview element.
  *
  * @param event.click
  */


	function close(event) {
		event.preventDefault();
		DOM.switchClasses(this.previewElement, 'opened', 'closed');
	}

	/**
  * Creates the cart svg icon.
  *
  * @return SVGSVGElement
  */
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
  * @file 
  * Filter class.
  *
  * The Filter Object, handles the filter of the products/services.
  */

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
  *
  * @var \Core\Container
  */
	var Container$3 = void 0;

	var Filter = function () {
		/**
   * - Initialize the IoC container.
   *
   * @param \Core\Container | container
   * @return void
   */
		function Filter(container) {
			_classCallCheck(this, Filter);

			Container$3 = container;
		}

		/**
   * Setup the filter class.
   *
   * @param object | settings
   * @return void
   */


		_createClass(Filter, [{
			key: 'setup',
			value: function setup(settings) {
				if ((typeof settings === 'undefined' ? 'undefined' : _typeof(settings)) != 'object') {
					throw new InvalidArgumentException$1();
				}

				this.settings = Common.extend(defaultSettings$3, settings);

				this.setElement(this.settings.element);
			}

			/**
    * Sets the element to be bound to.
    *
    * @param string | selector
    * @return void
    */

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
  * Products class.
  *
  * The Products component, handles the products tasks.
  */

	/**
  * The default settings of each product.
  *
  * @var object
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

			/**
    * Loads the products and 
    * replace them in the div container.
    *
    * @return void
    */

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

					EventManager$3.publish('products.loaded', products);
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

					EventManager$3.publish('products.loaded', products);
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
    * @param number | pageNumber
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
  * @file 
  * Pagination class.
  *
  * The Pagination component, handles the pagination.
  */

	/**
  * The default settings of the pagination.
  *
  * @var object
  */


	var defaultSettings$5 = {
		element: '.pagination-links',
		class: '',
		per_page: 5,
		total_items: 10
	};

	/**
  * Stores the container object.
  *
  * @var \Core\Container
  */
	var Container$5 = void 0;

	/**
  * Stores the products component.
  *
  * @var \Components\Products
  */
	var Products$2 = void 0;

	var Pagination = function () {
		/**
   * - Initialize the container object.
   * - Initialize the products component.
   *
   * @param \Core\Container | container
   * @param \Components\Products | products
   * @return void
   */
		function Pagination(container, products) {
			_classCallCheck(this, Pagination);

			this.setCurrent(1);
			Container$5 = container;
			Products$2 = products;
		}

		/**
   * Setup the pagination.
   *
   * @param object | settings
   * @return void
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
    *
    * @param string | selector
    * @return void
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
    *
    * @param HTMLUListElement | links
    * @return void
    */

		}, {
			key: 'replaceLinks',
			value: function replaceLinks(links) {
				this.wrapper.innerHTML = '';
				this.wrapper.appendChild(links);
			}

			/**
    * Calculates the total pages.
    *
    * @param number | perPage
    * @param number | totalItems
    * @return number
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
    *
    * @param HTMLUListElement | links
    * @return void
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
    *
    * @param number | pageNumber
    * @return void
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
    *
    * @return number
    */

		}, {
			key: 'getCurrent',
			value: function getCurrent() {
				return this.current;
			}

			/**
    * Creates the pagination links.
    *
    * @return HTMLUListElement
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
    *
    * @return array<HTMLLIElement>
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
    *
    * @return HTMLLIElement
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
    *
    * @return HTMLLIElement
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
    *
    * @param number | pageNumber
    * @return bool
    */

		}, {
			key: 'notInPageRange',
			value: function notInPageRange(pageNumber) {
				return pageNumber > this.totalPages || pageNumber <= 0 || isNaN(pageNumber);
			}

			/**
    * Changes the url to a given page number.
    *
    * @param number | pageNumber
    * @return void
    */

		}, {
			key: 'changeUrl',
			value: function changeUrl(pageNumber) {
				pageNumber = pageNumber || queryString()['page'];
				window.history.replaceState('', '', this.updateURLParameter(window.location.href, 'page', pageNumber));
			}

			/**
    * Sets the active link.
    *
    * @param number | pageNumber
    * @return void
    */

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
    *
    * @return array
    */

		}, {
			key: 'queryString',
			value: function queryString() {
				var vars = {};
				var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (m, key, value) {
					vars[key] = value;
				});

				return vars;
			}

			/**
    * Modifies the get parameter in the url.
    *
    * @param string | url
    * @param string | param
    * @param number | paramVal
    * @return string
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
    *
    * @return void
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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlR1cmJvZUNvbW1lcmNlLmpzIl0sIm5hbWVzIjpbIlR1cmJvZUNvbW1lcmNlIiwiZGVmYXVsdE1lc3NhZ2UiLCJJbnZhbGlkQXJndW1lbnRFeGNlcHRpb24kMSIsIm1lc3NhZ2UiLCJjb25zb2xlIiwiZXJyb3IiLCJFcnJvciIsIkRPTSIsInN0cmluZyIsInJlcGxhY2UiLCJlbGVtZW50IiwiY2xhc3NOYW1lIiwibmV3Q2xhc3NOYW1lIiwicmVtb3ZlQ2xhc3MiLCJhZGRDbGFzcyIsInVuZGVmaW5lZCIsImNsYXNzTmFtZXMiLCJzcGxpdCIsImZvckVhY2giLCJuYW1lIiwiY2xhc3NMaXN0IiwiYWRkIiwicmVtb3ZlIiwiaWQiLCJjc3MiLCJoZWFkIiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50c0J5VGFnTmFtZSIsInN0eWxlVGFnIiwiY3JlYXRlRWxlbWVudCIsIkNTUyIsIm1pbmlmeUNzcyIsImlubmVySFRNTCIsInNldEF0dHJpYnV0ZSIsImFwcGVuZENoaWxkIiwiZWxlbWVudFR5cGUiLCJvcHRpb25zIiwib3B0aW9uIiwic2Vjb25kQ2xhc3NOYW1lIiwidG9nZ2xlIiwic2VsZWN0b3IiLCJjb250ZXh0Iiwid2luZG93IiwicXVlcnlFbGVtZW50IiwicGFyZW50RWxlbWVudCIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJsZW5ndGgiLCJoYXNDaGlsZCIsImNoaWxkRWxlbWVudCIsIm5vZGUiLCJwYXJlbnROb2RlIiwiQ29tbW9uIiwiY3VycmVudE9iamVjdCIsIm5ld09iamVjdCIsImV4dGVuZGVkIiwicHJvcCIsIk9iamVjdCIsInByb3RvdHlwZSIsImhhc093blByb3BlcnR5IiwiY2FsbCIsIm5lZWRsZSIsImh5c3RhY2siLCJjb25zdHJ1Y3RvciIsIkFycmF5IiwiaSIsIm9iamVjdCIsImRlZmF1bHRNZXNzYWdlJDEiLCJJbnZhbGlkRGF0YVN0cnVjdHVyZUV4Y2VwdGlvbiIsImRlZmF1bHRTZXR0aW5ncyQxIiwiaGVhZGVycyIsImFzeW5jIiwiUmVxdWVzdCIsInNldHRpbmdzIiwieGhyIiwiWE1MSHR0cFJlcXVlc3QiLCJBY3RpdmVYT2JqZWN0IiwiZXh0ZW5kIiwic2V0RGVmYXVsdFJlcXVlc3RIZWFkZXIiLCJoZWFkZXIiLCJvcGVuIiwic2V0UmVxdWVzdEhlYWRlciIsInJlc3BvbnNlIiwiYXBwbHkiLCJhcmd1bWVudHMiLCJiZWZvcmUiLCJQcm9taXNlIiwicmVzb2x2ZSIsInJlamVjdCIsImRhdGEiLCJ1cmwiLCJyZXNwb25zZVR5cGUiLCJkYXRhVHlwZSIsInRpbWVvdXQiLCJvbnJlYWR5c3RhdGVjaGFuZ2UiLCJyZWFkeVN0YXRlIiwic3RhdHVzIiwiYWZ0ZXIiLCJvbmVycm9yIiwic2VuZCIsInF1ZXJ5U3RyaW5nIiwia2V5cyIsIm1hcCIsImtleSIsImVuY29kZVVSSUNvbXBvbmVudCIsImpvaW4iLCJkZWZhdWx0TWVzc2FnZSQyIiwiSW52YWxpZEJpbmRpbmdFeGNlcHRpb24iLCJpbnN0YW5jZXMiLCJDb250YWluZXIiLCJjb25jcmV0ZSIsImJpbmQiLCJpbnN0YW5jZSIsImFsaWFzIiwiaW5zdGFuY2VFeGlzdCIsImdldEluc3RhbmNlIiwic2V0SW5zdGFuY2UiLCJkZWZhdWx0TWVzc2FnZSQzIiwiQmFkRXZlbnRDYWxsRXhjZXB0aW9uIiwiZXZlbnRzIiwiRXZlbnRNYW5hZ2VyIiwiY2FsbGJhY2siLCJJbnZhbGlkQXJndW1lbnRFeGNlcHRpb24iLCJwdXNoIiwiZGVmYXVsdE1lc3NhZ2UkNCIsIkNvbXBvbmVudHNFeGNlcHRpb24iLCJkZWZhdWx0TWVzc2FnZSQ1IiwiTm90SW5QYWdlUmFuZ2VFeGNlcHRpb24iLCJkZWZhdWx0TWVzc2FnZSQ2IiwiQ29tcG9uZW50Tm90UmVnaXN0ZXJlZEV4Y2VwdGlvbiIsIkV4Y2VwdGlvbkhhbmRsZXIiLCJzb3VyY2UiLCJsaW5lbm8iLCJjb2xubyIsIlN0ciIsInRvTG93ZXJDYXNlIiwicG9zc2libGUiLCJjaGFyQXQiLCJNYXRoIiwiZmxvb3IiLCJyYW5kb20iLCJDb29raWUiLCJ2YWx1ZSIsImRheXMiLCJKU09OIiwic3RyaW5naWZ5IiwiZXhwaXJlcyIsImRhdGUiLCJEYXRlIiwic2V0VGltZSIsImdldFRpbWUiLCJ0b0dNVFN0cmluZyIsImNvb2tpZSIsImNfc3RhcnQiLCJpbmRleE9mIiwiY19lbmQiLCJwYXJzZSIsInVuZXNjYXBlIiwic3Vic3RyaW5nIiwiZGVmYXVsdFNldHRpbmdzJDIiLCJjb29raWVfbmFtZSIsInByZXZpZXdfY2xhc3MiLCJsb2FkZXIiLCJjbGFzcyIsIndpZHRoIiwiaGVpZ2h0IiwicGxhY2VtZW50IiwiZml4ZWQiLCJob3Zlcl9jb2xvciIsIkNvbnRhaW5lciQyIiwiRXZlbnRNYW5hZ2VyJDIiLCJIdHRwIiwibG9hZGluZ092ZXJsYXkiLCJpdGVtc0RpdiIsIkNhcnQiLCJjb250YWluZXIiLCJodHRwIiwiZXZlbnRNYW5hZ2VyIiwicHJldmlld0VsZW1lbnQiLCJjcmVhdGVQcmV2aWV3RWxlbWVudCIsInN2Z0ljb24iLCJjcmVhdGVJY29uIiwic2V0RWxlbWVudCIsImJpbmRFdmVudExpc3RlbmVycyIsImFkZFN0eWxlVGFnIiwiaXNFbXB0eSIsImdldCIsImNhcnQiLCJzZXRDYXJ0IiwiZW1wdHlPYmplY3QiLCJpdGVtcyIsImZhdm9yaXRlcyIsInNldCIsIml0ZW0iLCJzcGxpY2UiLCJsaSIsImF0dHJpYnV0ZXMiLCJhdHRyaWJ1dGUiLCJzcGFuIiwidGV4dCIsImljb24iLCJmaW5kIiwicG9zaXRpb24iLCJhZGRTdHlsZSIsInNyYyIsInJlbW92ZUNoaWxkIiwicHJldmlld1N0YXJ0TG9hZGluZyIsImdldENhcnRJdGVtcyIsImFkZFRvUHJldmlldyIsInNldFRpbWVvdXQiLCJwcmV2aWV3U3RvcExvYWRpbmciLCJvbmNsaWNrIiwiZSIsInByZXZlbnREZWZhdWx0Iiwib3BlbmluZyIsInRvZ2dsZUNsYXNzIiwicmVsb2FkQ2FydFByZXZpZXciLCJzdWJzY3JpYmUiLCJjbG9zZSIsImV2ZW50Iiwic3dpdGNoQ2xhc3NlcyIsInN2ZyIsImNyZWF0ZUVsZW1lbnROUyIsImciLCJwYXRoIiwiZGVmYXVsdFNldHRpbmdzJDMiLCJDb250YWluZXIkMyIsIkZpbHRlciIsIndyYXBwZXIiLCJkZWZhdWx0U2V0dGluZ3MkNCIsIml0ZW1fY2xhc3MiLCJhZGRfYnV0dG9uX2NsYXNzIiwiZmF2b3JpdGVfYnV0dG9uX2NsYXNzIiwiQ29udGFpbmVyJDQiLCJFdmVudE1hbmFnZXIkMyIsIkh0dHAkMSIsIlByb2R1Y3RzIiwiYWRkRXZlbnRMaXN0ZW5lciIsIlBhZ2luYXRpb24iLCJib290ZWQiLCJsb2FkUGFnZVByb2R1Y3RzIiwibG9hZEFsbFByb2R1Y3RzIiwicmVxdWVzdCIsImdldFByb2R1Y3RzIiwidGhlbiIsInByb2R1Y3RzIiwiY3VycmVudEl0ZW1zIiwicHJvZHVjdCIsInB1Ymxpc2giLCJyZXBsYWNlSXRlbXMiLCJjYXRjaCIsImlzQXJyYXkiLCJidWlsZFByb2R1Y3RzIiwicGFnZU51bWJlciIsImFjdGlvbiIsImF0dHJpYnV0ZXNDb2xsZWN0aW9uIiwidGFnVHlwZSIsImJ1aWx0UHJvZHVjdHMiLCJidWlsdFByb2R1Y3QiLCJidWlsZFByb2R1Y3QiLCJvdmVybGF5IiwiaW5fYXJyYXkiLCJ0YWciLCJpbWFnZSIsImtlYmFiQ2FzZSIsImFkZFRvQ2FydCIsInR5cGUiLCJmYXZvcml0ZSIsIlNlcnZpY2VzIiwiZGVmYXVsdFNldHRpbmdzJDUiLCJwZXJfcGFnZSIsInRvdGFsX2l0ZW1zIiwiQ29udGFpbmVyJDUiLCJQcm9kdWN0cyQyIiwic2V0Q3VycmVudCIsInRvdGFsUGFnZXMiLCJjYWxjdWxhdGVUb3RhbFBhZ2VzIiwicmVwbGFjZUxpbmtzIiwibGlua3MiLCJjcmVhdGVMaW5rcyIsInBlclBhZ2UiLCJ0b3RhbEl0ZW1zIiwicGFyc2VJbnQiLCJjZWlsIiwibmV4dCIsImNoaWxkTm9kZXMiLCJyZXF1ZXN0ZWRQYWdlIiwiY3VycmVudCIsIm5vdEluUGFnZVJhbmdlIiwicHJldmlvdXMiLCJwYWdlcyIsImdldEF0dHJpYnV0ZSIsImNoYW5nZVVybCIsInNldEFjdGl2ZUxpbmsiLCJ1bCIsImNyZWF0ZVBhZ2VMaW5rcyIsImNyZWF0ZVByZXZpb3VzQnV0dG9uIiwiY3JlYXRlTmV4dEJ1dHRvbiIsInBhZ2UiLCJwYWdlSXRlbSIsImxpbmsiLCJzcGFuMSIsInNwYW4yIiwiaXNOYU4iLCJoaXN0b3J5IiwicmVwbGFjZVN0YXRlIiwidXBkYXRlVVJMUGFyYW1ldGVyIiwibG9jYXRpb24iLCJocmVmIiwidmFycyIsInBhcnRzIiwibSIsInBhcmFtIiwicGFyYW1WYWwiLCJuZXdBZGRpdGlvbmFsVVJMIiwidGVtcEFycmF5IiwiYmFzZVVSTCIsImFkZGl0aW9uYWxVUkwiLCJ0ZW1wIiwicm93c1RleHQiLCJkZWZhdWx0U2V0dGluZ3MiLCJpbXBvcnRCb290c3RyYXAiLCJjb21wb25lbnRzIiwiaW5pdGFsaXplIiwiYmluZENvbXBvbmVudHNEZXBlbmRlbmNpZXMiLCJQcm94eSIsInRhcmdldCIsIm1ha2UiLCJFdmVudHMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUEsSUFBSUEsaUJBQWtCLFlBQVk7QUFDbEM7O0FBRUEsS0FBSUMsaUJBQWlCLGlDQUFyQjs7QUFIa0MsS0FLNUJDLDBCQUw0QjtBQUFBOztBQU9qQyxzQ0FBWUMsT0FBWixFQUNBO0FBQUE7O0FBQUEsdUpBQ1VBLFdBQVdGLGNBRHJCOztBQUVJRyxXQUFRQyxLQUFSLENBQWMsK0JBQStCRixPQUEvQixJQUEwQ0YsY0FBeEQ7QUFGSjtBQUdJOztBQVg2QjtBQUFBLEdBS09LLEtBTFA7O0FBY2xDOzs7Ozs7OztBQWRrQyxLQXNCNUJDLEdBdEI0QjtBQUFBO0FBQUE7QUFBQTs7QUFBQTtBQUFBOztBQXdCakM7Ozs7OztBQXhCaUMsNkJBOEJoQkMsTUE5QmdCLEVBK0JqQztBQUNJQSxhQUFTQSxPQUFPQyxPQUFQLENBQWUsd0NBQWYsRUFBeUQsRUFBekQsQ0FBVDtBQUNBRCxhQUFTQSxPQUFPQyxPQUFQLENBQWUsUUFBZixFQUF5QixHQUF6QixDQUFUO0FBQ0FELGFBQVNBLE9BQU9DLE9BQVAsQ0FB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QUFzQmdFLE1BQXRCLEdBQStCLElBQS9CO0FBQ0EsVUFBTyxJQUFJSCxRQUFKLENBQWE3RCxTQUFiLEVBQXdCbUUsT0FBeEIsRUFBaUNuRSxVQUFVeUosTUFBM0MsQ0FBUDtBQUNBLEdBSEQ7O0FBS0EsT0FBS3pKLFNBQUwsQ0FBZWhFLElBQWYsQ0FBb0IsWUFBcEIsRUFBa0MsVUFBU2dFLFNBQVQsRUFBb0I7QUFDckRBLGFBQVUsWUFBVixFQUF3QmdFLE1BQXhCLEdBQWlDLElBQWpDO0FBQ0EsVUFBTyxJQUFJRCxVQUFKLENBQWUvRCxTQUFmLEVBQTBCQSxVQUFVd0osSUFBVixDQUFlLFVBQWYsQ0FBMUIsRUFBc0R4SixVQUFVeUosTUFBaEUsQ0FBUDtBQUNBLEdBSEQ7O0FBS0EsT0FBS3pKLFNBQUwsQ0FBZWhFLElBQWYsQ0FBb0IsTUFBcEIsRUFBNEIsVUFBU2dFLFNBQVQsRUFBb0I7QUFDL0NBLGFBQVUsTUFBVixFQUFrQmdFLE1BQWxCLEdBQTJCLElBQTNCO0FBQ0EsVUFBTyxJQUFJakUsSUFBSixDQUFTQyxTQUFULEVBQW9CbUUsT0FBcEIsRUFBNkJuRSxVQUFVeUosTUFBdkMsQ0FBUDtBQUNBLEdBSEQ7O0FBS0EsT0FBS3pKLFNBQUwsQ0FBZSxRQUFmLEVBQXlCLFFBQXpCLElBQXFDLEtBQXJDO0FBQ0EsT0FBS0EsU0FBTCxDQUFlLFVBQWYsRUFBMkIsUUFBM0IsSUFBdUMsS0FBdkM7QUFDQSxPQUFLQSxTQUFMLENBQWUsVUFBZixFQUEyQixRQUEzQixJQUF1QyxLQUF2QztBQUNBLE9BQUtBLFNBQUwsQ0FBZSxZQUFmLEVBQTZCLFFBQTdCLElBQXlDLEtBQXpDO0FBQ0EsT0FBS0EsU0FBTCxDQUFlLE1BQWYsRUFBdUIsUUFBdkIsSUFBbUMsS0FBbkM7QUFDQTs7QUFFRCxRQUFPOUssY0FBUDtBQUVDLENBNXpFcUIsRUFBdEIiLCJmaWxlIjoiVHVyYm9lQ29tbWVyY2UuanMiLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgVHVyYm9lQ29tbWVyY2UgPSAoZnVuY3Rpb24gKCkge1xuJ3VzZSBzdHJpY3QnO1xuXG5sZXQgZGVmYXVsdE1lc3NhZ2UgPSAnYW4gaW52YWxpZCBhcmd1bWVudCB3YXMgcGFzc2VkLic7XHJcblxyXG5jbGFzcyBJbnZhbGlkQXJndW1lbnRFeGNlcHRpb24kMSBleHRlbmRzIEVycm9yXHJcbntcclxuXHRjb25zdHJ1Y3RvcihtZXNzYWdlKSBcclxuXHR7IFxyXG4gICAgXHRzdXBlcihtZXNzYWdlIHx8IGRlZmF1bHRNZXNzYWdlKTtcclxuICAgIFx0Y29uc29sZS5lcnJvcignSW52YWxpZEFyZ3VtZW50RXhjZXB0aW9uOiAnICsgbWVzc2FnZSB8fCBkZWZhdWx0TWVzc2FnZSk7XHJcbiAgICB9XHJcbn1cblxuLyoqXHJcbiAqIEBmaWxlIFxyXG4gKiBET00gY2xhc3MuXHJcbiAqXHJcbiAqIEFkZHMgc29tZSB1c2VmdWwgZnVuY3Rpb25hbGl0eSBmb3JcclxuICogZmV0Y2hpbmcgb3IgbWFuaXB1bGF0aW5nIERPTSBlbGVtZW50cy5cclxuICovXHJcblxyXG5jbGFzcyBET01cclxue1xyXG5cdC8qKlxyXG5cdCAqIE1pbmlmaWVzIHRoZSBjc3MgdGV4dC5cclxuXHQgKiBcclxuXHQgKiBAcGFyYW0gc3RyaW5nIHwgc3RyaW5nXHJcblx0ICogQHJldHVybiBzdHJpbmdcclxuXHQgKi9cclxuXHRzdGF0aWMgbWluaWZ5Q3NzKHN0cmluZykgXHJcblx0e1xyXG5cdCAgICBzdHJpbmcgPSBzdHJpbmcucmVwbGFjZSgvXFwvXFwqKD86KD8hXFwqXFwvKVtcXHNcXFNdKSpcXCpcXC98W1xcclxcblxcdF0rL2csICcnKTtcclxuXHQgICAgc3RyaW5nID0gc3RyaW5nLnJlcGxhY2UoLyB7Mix9L2csICcgJyk7XHJcblx0ICAgIHN0cmluZyA9IHN0cmluZy5yZXBsYWNlKC8oW3s6fV0pL2csICckMScpO1xyXG5cdCAgICBzdHJpbmcgPSBzdHJpbmcucmVwbGFjZSgvKFs7LF0pIC9nLCAnJDEnKTtcclxuXHQgICAgc3RyaW5nID0gc3RyaW5nLnJlcGxhY2UoLyAhL2csICchJyk7XHJcblx0ICAgIFxyXG5cdCAgICByZXR1cm4gc3RyaW5nO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogU3dpdGNoZXMgYmV0d2VlbiB0d28gZ2l2ZW4gY2xhc3Nlcy5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSBvYmplY3QgfCBlbGVtZW50XHJcblx0ICogQHBhcmFtIHN0cmluZyB8IGNsYXNzTmFtZVxyXG5cdCAqIEBwYXJhbSBzdHJpbmcgfCBuZXdDbGFzc05hbWVcclxuXHQgKiBAcmV0dXJuIG9iamVjdFxyXG5cdCAqL1xyXG5cdHN0YXRpYyBzd2l0Y2hDbGFzc2VzKGVsZW1lbnQsIGNsYXNzTmFtZSwgbmV3Q2xhc3NOYW1lKSBcclxuXHR7XHJcblx0XHR0aGlzLnJlbW92ZUNsYXNzKGVsZW1lbnQsIGNsYXNzTmFtZSk7XHJcblx0XHR0aGlzLmFkZENsYXNzKGVsZW1lbnQsIG5ld0NsYXNzTmFtZSk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBBZGRzIGNsYXNzIHRvIGEgZ2l2ZW4gZWxlbWVudC5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSBvYmplY3QgfCBlbGVtZW50XHJcblx0ICogQHBhcmFtIHN0cmluZyB8IGNsYXNzTmFtZVxyXG5cdCAqIEByZXR1cm4gb2JqZWN0XHJcblx0ICovXHJcblx0c3RhdGljIGFkZENsYXNzKGVsZW1lbnQsIGNsYXNzTmFtZSkgXHJcblx0e1xyXG5cdFx0aWYoZWxlbWVudCA9PT0gbnVsbCkge1xyXG5cdFx0XHR0aHJvdyBuZXcgSW52YWxpZEFyZ3VtZW50RXhjZXB0aW9uJDE7XHJcblx0XHR9XHJcblxyXG5cdFx0aWYoISBjbGFzc05hbWUgfHwgY2xhc3NOYW1lID09ICcnIHx8IHR5cGVvZiBjbGFzc05hbWUgPT09IHVuZGVmaW5lZCkge1xyXG5cdFx0XHRyZXR1cm4gZWxlbWVudDtcclxuXHRcdH1cclxuXHJcblx0XHRsZXQgY2xhc3NOYW1lcyA9IGNsYXNzTmFtZS5zcGxpdCgnICcpO1xyXG5cclxuXHRcdGNsYXNzTmFtZXMuZm9yRWFjaChmdW5jdGlvbihuYW1lKSB7XHJcblx0XHRcdGVsZW1lbnQuY2xhc3NMaXN0LmFkZChuYW1lKTtcclxuXHRcdH0pO1xyXG5cdFx0XHJcblx0XHRyZXR1cm4gZWxlbWVudDtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFJlbW92ZXMgY2xhc3MgZnJvbSBhIGdpdmVuIGVsZW1lbnQuXHJcblx0ICogXHJcblx0ICogQHBhcmFtIG9iamVjdCB8IGVsZW1lbnRcclxuXHQgKiBAcGFyYW0gc3RyaW5nIHwgY2xhc3NOYW1lXHJcblx0ICogQHJldHVybiBvYmplY3RcclxuXHQgKi9cclxuXHRzdGF0aWMgcmVtb3ZlQ2xhc3MoZWxlbWVudCwgY2xhc3NOYW1lKSBcclxuXHR7XHJcblx0XHRpZihlbGVtZW50ID09IG51bGwpIHtcclxuXHRcdFx0dGhyb3cgbmV3IEludmFsaWRBcmd1bWVudEV4Y2VwdGlvbiQxO1xyXG5cdFx0fVxyXG5cclxuXHRcdGlmKGNsYXNzTmFtZSA9PSAnJykge1xyXG5cdFx0XHRlbGVtZW50LmNsYXNzTmFtZSA9ICcnO1xyXG5cdFx0fSBlbHNlIHtcclxuXHJcblx0XHRcdGxldCBjbGFzc05hbWVzID0gY2xhc3NOYW1lLnNwbGl0KCcgJyk7XHJcblxyXG5cdFx0XHRjbGFzc05hbWVzLmZvckVhY2goZnVuY3Rpb24obmFtZSkge1xyXG5cdFx0XHRcdGVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShuYW1lKTtcclxuXHRcdFx0fSk7XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIGVsZW1lbnQ7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBBZGRzIHN0eWxlIHRhZyB3aXRoIGdpdmVuIGlkIGFuZCBjc3MgdG8gdGhlIERPTS5cclxuXHQgKiBcclxuXHQgKiBAcGFyYW0gc3RyaW5nIHwgaWRcclxuXHQgKiBAcGFyYW0gc3RyaW5nIHwgY3NzXHJcblx0ICogQHJldHVybiB2b2lkXHJcblx0ICovXHJcblx0c3RhdGljIGFkZFN0eWxlKGlkLCBjc3MpIFxyXG5cdHtcclxuXHRcdGlmICh0eXBlb2YgY3NzICE9ICdzdHJpbmcnKSB7XHJcblx0XHRcdHRocm93IG5ldyBJbnZhbGlkQXJndW1lbnRFeGNlcHRpb24kMTtcclxuXHRcdH1cclxuXHJcblx0XHRsZXQgaGVhZCA9IGRvY3VtZW50LmhlYWQgfHwgZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2hlYWQnKVswXTtcclxuXHRcdGxldCBzdHlsZVRhZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3N0eWxlJyk7XHJcblxyXG5cdFx0Ly8gcGlwZSBpdCB0aHJvdWdoIHRoZSBtaW5maWVyXHJcblx0ICAgIGxldCBDU1MgPSB0aGlzLm1pbmlmeUNzcyhjc3MpO1xyXG5cdCAgICAvLyBhZGRpbmcgaXQgdG8gdGhlIHN0eWxldGFnXHJcblx0ICAgIHN0eWxlVGFnLmlubmVySFRNTCA9IENTUztcclxuXHQgICAgLy8gZ2l2ZSBhbiBpZCB0byByZWNvZ25pemUgdGhlIHN0eWxlIHRhZ1xyXG5cdFx0c3R5bGVUYWcuc2V0QXR0cmlidXRlKCdpZCcsIGlkKTtcclxuXHRcdC8vIGFwcGVuZGluZyB0aGF0IHN0eWxlIHRhZyB0byB0aGUgRE9NIGhlYWQgdGFnXHJcblx0XHRoZWFkLmFwcGVuZENoaWxkKHN0eWxlVGFnKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIENyZWF0ZXMgYW4gZWxlbWVudCB3aXRoIHRoZSBnaXZlbiBvcHRpb25zLlxyXG5cdCAqIFxyXG5cdCAqIEBwYXJhbSBzdHJpbmcgfCBlbGVtZW50VHlwZVxyXG5cdCAqIEBwYXJhbSBvYmplY3QgfCBvcHRpb25zXHJcblx0ICogQHJldHVybiBIVE1MRWxlbWVudFxyXG5cdCAqL1xyXG5cdHN0YXRpYyBjcmVhdGVFbGVtZW50KGVsZW1lbnRUeXBlLCBvcHRpb25zKVxyXG5cdHtcclxuXHRcdGxldCBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChlbGVtZW50VHlwZSk7XHJcblx0XHJcblx0XHRpZiAob3B0aW9ucyA9PT0gdW5kZWZpbmVkKSB7XHJcblx0XHRcdHJldHVybiBlbGVtZW50O1xyXG5cdFx0fVxyXG5cclxuXHRcdGZvciAobGV0IG9wdGlvbiBpbiBvcHRpb25zKSB7XHJcblx0XHRcdGlmKG9wdGlvbiA9PSAndGV4dCcpIHtcclxuXHRcdFx0XHRlbGVtZW50LmlubmVySFRNTCA9IG9wdGlvbnNbb3B0aW9uXTtcclxuXHRcdFx0XHRjb250aW51ZTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0ZWxlbWVudC5zZXRBdHRyaWJ1dGUob3B0aW9uLCBvcHRpb25zW29wdGlvbl0pO1xyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiBlbGVtZW50O1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogVG9nZ2xlcyB0aGUgZ2l2ZW4gY2xhc3Nlcy5cclxuXHQgKiBcclxuXHQgKiBAcGFyYW0gb2JqZWN0IHwgZWxlbWVudFxyXG5cdCAqIEBwYXJhbSBzdHJpbmcgfCBjbGFzc05hbWVcclxuXHQgKiBAcmV0dXJuIGJvb2xcclxuXHQgKi9cclxuXHRzdGF0aWMgdG9nZ2xlQ2xhc3MoZWxlbWVudCwgY2xhc3NOYW1lLCBzZWNvbmRDbGFzc05hbWUpXHJcblx0e1xyXG5cdFx0aWYgKGVsZW1lbnQgPT0gbnVsbCB8fCB0eXBlb2YgZWxlbWVudCA9PSAndW5kZWZpbmVkJykge1xyXG5cdFx0XHR0aHJvdyBuZXcgSW52YWxpZEFyZ3VtZW50RXhjZXB0aW9uJDE7XHJcblx0XHR9XHJcblxyXG5cdFx0c2Vjb25kQ2xhc3NOYW1lID0gc2Vjb25kQ2xhc3NOYW1lIHx8IHVuZGVmaW5lZDtcclxuXHJcblx0XHRpZihzZWNvbmRDbGFzc05hbWUpIHtcclxuXHRcdFx0ZWxlbWVudC5jbGFzc0xpc3QudG9nZ2xlKHNlY29uZENsYXNzTmFtZSk7XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIGVsZW1lbnQuY2xhc3NMaXN0LnRvZ2dsZShjbGFzc05hbWUpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogRmluZHMgYW4gZWxlbWVudCBpbnNpZGUgb2YgcGFyZW50LlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIHN0cmluZyB8IHNlbGVjdG9yXHJcblx0ICogQHBhcmFtIG9iamVjdCB8IGNvbnRleHRcclxuXHQgKiBAcmV0dXJuIG1peGVkXHJcblx0ICovXHJcblx0c3RhdGljIGZpbmQoc2VsZWN0b3IsIGNvbnRleHQgPSB3aW5kb3cuZG9jdW1lbnQpIFxyXG5cdHtcclxuXHRcdHJldHVybiBxdWVyeUVsZW1lbnQoc2VsZWN0b3IsIGNvbnRleHQpO1xyXG5cdH1cclxufVxyXG5cclxuLyoqXHJcbiAqIFF1ZXJpZXMgYW4gZWxlbWVudCBmcm9tIHRoZSBET00uXHJcbiAqXHJcbiAqIEBwYXJhbSBzdHJpbmcgfCBzZWxlY3RvclxyXG4gKiBAcGFyYW0gb2JqZWN0IHwgcGFyZW50RWxlbWVudFxyXG4gKiBAcmV0dXJuIG1peGVkXHJcbiAqL1xyXG5mdW5jdGlvbiBxdWVyeUVsZW1lbnQoc2VsZWN0b3IsIHBhcmVudEVsZW1lbnQpIFxyXG57XHJcblx0bGV0IGVsZW1lbnQgPSBwYXJlbnRFbGVtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3IpO1xyXG5cclxuXHRpZiAoZWxlbWVudC5sZW5ndGggPT0gMCkge1xyXG5cdFx0cmV0dXJuIG51bGw7XHJcblx0fVxyXG5cclxuXHRyZXR1cm4gKGVsZW1lbnQubGVuZ3RoID4gMSkgPyBlbGVtZW50IDogZWxlbWVudFswXTtcclxufVxyXG5cclxuLyoqXHJcbiAqIENoZWNrcyBpZiBwYXJlbnQgaGFzIGNoaWxkLlxyXG4gKlxyXG4gKiBAcGFyYW0gb2JqZWN0IHwgcGFyZW50RWxlbWVudFxyXG4gKiBAcGFyYW0gb2JqZWN0IHwgY2hpbGRFbGVtZW50XHJcbiAqIEByZXR1cm4gYm9vbFxyXG4gKi9cclxuZnVuY3Rpb24gaGFzQ2hpbGQocGFyZW50RWxlbWVudCwgY2hpbGRFbGVtZW50KSBcclxue1xyXG4gICAgIGxldCBub2RlID0gY2hpbGRFbGVtZW50LnBhcmVudE5vZGU7XHJcbiAgICAgXHJcbiAgICAgd2hpbGUgKG5vZGUgIT0gbnVsbCkge1xyXG4gICAgICAgICBpZiAobm9kZSA9PSBwYXJlbnRFbGVtZW50KSB7XHJcbiAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgfVxyXG4gICAgICAgICBub2RlID0gbm9kZS5wYXJlbnROb2RlO1xyXG4gICAgIH1cclxuICAgICBcclxuICAgICByZXR1cm4gZmFsc2U7XHJcbn1cblxuLyoqXHJcbiAqIEBmaWxlIFxyXG4gKiBDb21tb24gY2xhc3MuXHJcbiAqXHJcbiAqIEFkZHMgc29tZSB1c2VmdWwgZnVuY3Rpb25hbGl0eSBmb3JcclxuICogY29tbW9uIHRhc2tzIC0gZGF0YSBjaGVja3Mgb3IgZGF0YSBtYW5pcHVsYXRpb24uXHJcbiAqL1xyXG5cclxuY2xhc3MgQ29tbW9uXHJcbntcclxuXHQvKipcclxuXHQgKiBFeHRlbmQgYW4gb2JqZWN0LlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIG9iamVjdCB8IGN1cnJlbnRPYmplY3RcclxuXHQgKiBAcGFyYW0gb2JqZWN0IHwgbmV3T2JqZWN0XHJcblx0ICogQHJldHVybiBvYmplY3RcclxuXHQgKi9cclxuXHRzdGF0aWMgZXh0ZW5kKGN1cnJlbnRPYmplY3QsIG5ld09iamVjdCkge1xyXG5cdFx0dmFyIGV4dGVuZGVkID0ge307XHJcblx0ICAgIHZhciBwcm9wO1xyXG5cclxuXHQgICAgZm9yIChwcm9wIGluIGN1cnJlbnRPYmplY3QpIHtcclxuXHQgICAgICAgIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoY3VycmVudE9iamVjdCwgcHJvcCkpIHtcclxuXHQgICAgICAgICAgICBleHRlbmRlZFtwcm9wXSA9IGN1cnJlbnRPYmplY3RbcHJvcF07XHJcblx0ICAgICAgICB9XHJcblx0ICAgIH1cclxuXHJcblx0ICAgIGZvciAocHJvcCBpbiBuZXdPYmplY3QpIHtcclxuXHQgICAgICAgIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwobmV3T2JqZWN0LCBwcm9wKSkge1xyXG5cdCAgICAgICAgICAgIGV4dGVuZGVkW3Byb3BdID0gbmV3T2JqZWN0W3Byb3BdO1xyXG5cdCAgICAgICAgfVxyXG5cdCAgICB9XHJcblxyXG5cdCAgICByZXR1cm4gZXh0ZW5kZWQ7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBDaGVja3MgZm9yIGEgbmVlZGxlIGluIGh5c3RhY2sgYXJyYXkuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gbWl4ZWQgfCBuZWVkbGVcclxuXHQgKiBAcGFyYW0gb2JqZWN0IHwgb2JqZWN0XHJcblx0ICogQHJldHVybiBib29sXHJcblx0ICpcclxuXHQgKi9cclxuXHRzdGF0aWMgaW5fYXJyYXkobmVlZGxlLCBoeXN0YWNrKSB7XHJcblx0XHRpZihoeXN0YWNrLmNvbnN0cnVjdG9yICE9PSBBcnJheSkge1xyXG5cdFx0XHR0aHJvdyBuZXcgSW52YWxpZEFyZ3VtZW50RXhjZXB0aW9uJDE7XHJcblx0XHR9XHJcblxyXG5cdFx0Zm9yKHZhciBpID0gMDsgaSA8PSBoeXN0YWNrLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdGlmKG5lZWRsZSA9PSBoeXN0YWNrW2ldKSB7XHJcblx0XHRcdFx0cmV0dXJuIHRydWU7XHRcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdFxyXG5cdFx0cmV0dXJuIGZhbHNlO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQ2hlY2tzIGlmIGFuIG9iamVjdCBpcyBlbXB0eS5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSBvYmplY3QgfCBvYmplY3RcclxuXHQgKiBAcmV0dXJuIGJvb2xcclxuXHQgKi9cclxuXHRzdGF0aWMgZW1wdHlPYmplY3Qob2JqZWN0KSB7XHJcblx0XHRmb3IgKGxldCBwcm9wIGluIG9iamVjdCkge1xyXG5cdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIHRydWU7XHJcblx0fVxyXG5cclxuXHJcblx0LyoqXHJcblx0ICogQ2hlY2tzIGlmIGEgZ2l2ZW4gb2JqZWN0IGNvbnRhaW5lZCBpbiBhbiBhcnJheS5cclxuXHQgKiBcclxuXHQgKiBAcGFyYW0gb2JqZWN0IHwgb2JqZWN0XHJcblx0ICogQHBhcmFtIGFycmF5IHwgaGF5c3RhY2tcclxuXHQgKiBAcmV0dXJuIGJvb2xcclxuXHQgKi9cclxuXHRzdGF0aWMgY29udGFpbnNPYmplY3Qob2JqZWN0LCBoeXN0YWNrKSBcclxuXHR7XHJcblx0ICAgIGxldCBpO1xyXG5cclxuXHQgICAgZm9yIChpID0gMDsgaSA8IGh5c3RhY2subGVuZ3RoOyBpKyspIHtcclxuXHQgICAgICAgIGlmICh0eXBlb2Ygb2JqZWN0ID09ICdzdHJpbmcnICYmIGh5c3RhY2tbaV0uY29uc3RydWN0b3IubmFtZSA9PT0gb2JqZWN0KSB7XHJcblx0ICAgICAgICBcdHJldHVybiB0cnVlO1xyXG5cdCAgICAgICAgfVxyXG5cclxuXHQgICAgICAgIGlmIChoeXN0YWNrW2ldID09PSBvYmplY3QpIHtcclxuXHQgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuXHQgICAgICAgIH1cclxuXHQgICAgfVxyXG5cclxuXHQgICAgcmV0dXJuIGZhbHNlO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQ2hlY2tzIGlmIGEgZ2l2ZW4gcGFyYW1ldGVyIGlzIGFuIG9iamVjdC5cclxuXHQgKiBcclxuXHQgKiBAcGFyYW0gb2JqZWN0IHwgb2JqZWN0XHJcblx0ICogQHJldHVybiBib29sXHJcblx0ICovXHJcblx0c3RhdGljIGlzT2JqZWN0KG9iamVjdCkgXHJcblx0e1xyXG5cdFx0cmV0dXJuIHR5cGVvZiBvYmplY3QgPT0gJ29iamVjdCc7XHJcblx0fVxyXG59XG5cbmxldCBkZWZhdWx0TWVzc2FnZSQxID0gJ1RoZSBkYXRhIHN0cnVjdHVyZSBpcyBpbnZhbGlkJztcclxuXHJcbmNsYXNzIEludmFsaWREYXRhU3RydWN0dXJlRXhjZXB0aW9uICBleHRlbmRzIEVycm9yXHJcbntcclxuXHRjb25zdHJ1Y3RvcihtZXNzYWdlKSBcclxuXHR7IFxyXG4gICAgXHRzdXBlcihtZXNzYWdlIHx8IGRlZmF1bHRNZXNzYWdlJDEpO1xyXG4gICAgXHRjb25zb2xlLmVycm9yKCdJbnZhbGlkRGF0YVN0cnVjdHVyZUV4Y2VwdGlvbjogJyArIG1lc3NhZ2UgfHwgZGVmYXVsdE1lc3NhZ2UkMSk7XHJcbiAgICB9XHJcbn1cblxuLyoqXHJcbiAqIEBmaWxlIFxyXG4gKiBSZXF1ZXN0IGNsYXNzLlxyXG4gKlxyXG4gKiBIYW5kbGVzIGFqYXggcmVxdWVzdHMgUE9TVCwgR0VUIGV0Yy4uLlxyXG4gKi9cclxuXHJcbi8qKlxyXG4gKiBTdG9yZXMgdGhlIGRlZmF1bHQgc2V0dGluZ3MuXHJcbiAqXHJcbiAqIEB2YXIgb2JqZWN0XHJcbiAqL1xyXG5cclxubGV0IGRlZmF1bHRTZXR0aW5ncyQxID0ge1xyXG5cdGhlYWRlcnM6IHtcclxuXHRcdCdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbidcclxuXHR9LFxyXG5cdGFzeW5jOiB0cnVlXHJcbn07XHJcblxyXG5jbGFzcyBSZXF1ZXN0XHJcbntcclxuXHQvKipcclxuXHQgKiAtIEluaXRpYWxpemUgdGhlIHNldHRpbmdzIG9iamVjdC5cclxuXHQgKiAtIEluaXRpYWxpemUgdGhlIHhociBvYmplY3QuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gb2JqZWN0IHwgc2V0dGluZ3NcclxuXHQgKiBAcmV0dXJuIHZvaWRcclxuXHQgKi9cclxuXHRjb25zdHJ1Y3RvcihzZXR0aW5ncylcclxuXHR7XHJcblx0XHR0aGlzLnhociA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpIHx8IG5ldyBBY3RpdmVYT2JqZWN0KFwiTWljcm9zb2Z0LlhNTEhUVFBcIik7XHJcblx0XHR0aGlzLnNldHRpbmdzID0gQ29tbW9uLmV4dGVuZChkZWZhdWx0U2V0dGluZ3MkMSwgc2V0dGluZ3MpO1xyXG5cdFx0dGhpcy5zZXREZWZhdWx0UmVxdWVzdEhlYWRlcigpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogU2V0cyB0aGUgZGVmYXVsdCByZXF1ZXN0IGhlYWRlcnMuXHJcblx0ICpcclxuXHQgKiBAcmV0dXJuIHZvaWRcclxuXHQgKi9cclxuXHRzZXREZWZhdWx0UmVxdWVzdEhlYWRlcigpXHJcblx0e1xyXG5cdFx0bGV0IGhlYWRlcjtcclxuXHRcdGxldCBoZWFkZXJzID0gdGhpcy5zZXR0aW5ncy5oZWFkZXJzO1xyXG5cdFx0bGV0IGFzeW5jID0gdGhpcy5zZXR0aW5ncy5hc3luYztcclxuXHRcdGxldCBvcGVuID0gWE1MSHR0cFJlcXVlc3QucHJvdG90eXBlLm9wZW47XHJcblx0XHRsZXQgc2V0UmVxdWVzdEhlYWRlciA9IFhNTEh0dHBSZXF1ZXN0LnByb3RvdHlwZS5zZXRSZXF1ZXN0SGVhZGVyO1xyXG5cclxuXHRcdFhNTEh0dHBSZXF1ZXN0LnByb3RvdHlwZS5vcGVuID0gZnVuY3Rpb24oKSB7XHJcblx0XHRcdHZhciByZXNwb25zZSA9IG9wZW4uYXBwbHkodGhpcywgYXJndW1lbnRzLCBhc3luYyk7XHJcblxyXG5cdFx0XHRmb3IgKGhlYWRlciBpbiBoZWFkZXJzKSB7XHJcblx0XHRcdFx0dGhpcy5zZXRSZXF1ZXN0SGVhZGVyKGhlYWRlciwgaGVhZGVyc1toZWFkZXJdKTtcclxuXHRcdFx0fVxyXG5cclxuXHQgIFx0XHRyZXR1cm4gcmVzcG9uc2U7XHJcblx0XHR9O1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogTWFrZXMgYSBQT1NUIHJlcXVlc3QuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gb2JqZWN0IHwgb3B0aW9uc1xyXG5cdCAqIEByZXR1cm4gUHJvbWlzZVxyXG5cdCAqL1xyXG5cdHBvc3Qob3B0aW9ucylcclxuXHR7XHJcblx0XHRsZXQgeGhyID0gdGhpcy54aHI7XHJcblxyXG5cdFx0aWYob3B0aW9ucy5oYXNPd25Qcm9wZXJ0eSgnYmVmb3JlJykgJiYgdHlwZW9mIG9wdGlvbnMuYmVmb3JlID09ICdmdW5jdGlvbicpIHtcclxuXHRcdFx0b3B0aW9ucy5iZWZvcmUuY2FsbCh0aGlzKTtcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XHJcblx0XHRcdGlmKHR5cGVvZiBvcHRpb25zICE9PSAnb2JqZWN0Jykge1xyXG5cdFx0XHRcdHRocm93IG5ldyBFcnJvcignZ2V0IGV4cGVjdGluZyBhIGpzb24gb2JqZWN0IHRvIGJlIHBhc3NlZCBhcyBhbiBhcmd1bWVudCwgYnV0ICcrIHR5cGVvZiBvcHRpb25zICsgJyB3YXMgcGFzc2VkLicpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRvcHRpb25zLmRhdGEgPSBvcHRpb25zLmRhdGEgfHwge307XHJcblxyXG5cdFx0XHRpZih0eXBlb2Ygb3B0aW9ucy5kYXRhICE9PSAnb2JqZWN0Jykge1xyXG5cdFx0XHRcdHRocm93IG5ldyBFcnJvcignZGF0YSBwcm9wZXJ0eSBleHBlY3RpbmcgYSBqc29uIG9iamVjdCB0byBiZSBwYXNzZWQgYXMgYW4gYXJndW1lbnQsIGJ1dCAnICsgdHlwZW9mIG9wdGlvbnMuZGF0YSArICcgd2FzIHBhc3NlZC4nKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0eGhyLm9wZW4oJ1BPU1QnLCBvcHRpb25zLnVybCwgdHJ1ZSk7XHJcblxyXG5cdFx0XHR4aHIucmVzcG9uc2VUeXBlID0gb3B0aW9ucy5kYXRhVHlwZSB8fCAnanNvbic7XHJcblx0XHRcdHhoci50aW1lb3V0ID0gb3B0aW9ucy50aW1lb3V0IHx8IDMwMDA7XHJcblxyXG5cdFx0XHR4aHIub25yZWFkeXN0YXRlY2hhbmdlID0gZnVuY3Rpb24oKSB7XHJcblx0XHRcdCAgICBpZih0aGlzLnJlYWR5U3RhdGUgIT0gNCB8fCB0aGlzLnN0YXR1cyAhPSAyMDApIHtcclxuXHRcdFx0ICAgIFx0cmV0dXJuO1xyXG5cdFx0XHQgICAgfVxyXG5cdCAgICAgICBcdFxyXG4gICAgICAgXHRcdFx0cmVzb2x2ZSh0aGlzLnJlc3BvbnNlKTtcclxuICAgICAgIFx0XHRcdFxyXG4gICAgICAgXHRcdFx0aWYob3B0aW9ucy5oYXNPd25Qcm9wZXJ0eSgnYWZ0ZXInKSAmJiB0eXBlb2Ygb3B0aW9ucy5hZnRlciA9PSAnZnVuY3Rpb24nKSB7XHJcblx0XHRcdFx0XHRvcHRpb25zLmFmdGVyLmNhbGwodGhpcyk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9O1xyXG5cclxuXHRcdFx0eGhyLm9uZXJyb3IgPSBmdW5jdGlvbihtZXNzYWdlKSB7XHJcblx0XHRcdFx0b3B0aW9ucy5lcnJvcihtZXNzYWdlKTtcclxuXHRcdFx0XHRyZWplY3QobWVzc2FnZSk7XHJcblx0XHRcdH07XHJcblxyXG5cdFx0XHRpZighIG9wdGlvbnMuZGF0YSkge1xyXG5cdFx0XHRcdHhoci5zZW5kKG51bGwpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHR2YXIgcXVlcnlTdHJpbmcgPSBPYmplY3Qua2V5cyhvcHRpb25zLmRhdGEpLm1hcChmdW5jdGlvbihrZXkpIHtcclxuXHRcdCAgICAgICAgICAgIHJldHVybiBlbmNvZGVVUklDb21wb25lbnQoa2V5KSArICc9JyArXHJcblx0XHQgICAgICAgICAgICAgICAgXHRlbmNvZGVVUklDb21wb25lbnQob3B0aW9ucy5kYXRhW2tleV0pO1xyXG5cdFx0ICAgICAgICBcdH0pLmpvaW4oJyYnKTtcclxuXHJcblx0XHRcdHhoci5zZW5kKHF1ZXJ5U3RyaW5nKTtcclxuXHRcdH0pO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogTWFrZXMgYSBHRVQgYWpheCByZXF1ZXN0LlxyXG5cdCAqIFxyXG5cdCAqIEBwYXJhbSBvYmplY3QgfCBvcHRpb25zXHJcblx0ICogQHJldHVybiBQcm9taXNlXHJcblx0ICovXHJcblx0Z2V0KG9wdGlvbnMpXHJcblx0e1xyXG5cdFx0bGV0IHhociA9IHRoaXMueGhyO1xyXG5cclxuXHRcdGlmKG9wdGlvbnMuaGFzT3duUHJvcGVydHkoJ2JlZm9yZScpICYmIHR5cGVvZiBvcHRpb25zLmJlZm9yZSA9PSAnZnVuY3Rpb24nKSB7XHJcblx0XHRcdG9wdGlvbnMuYmVmb3JlLmNhbGwodGhpcyk7XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xyXG5cdFx0XHRpZih0eXBlb2Ygb3B0aW9ucyAhPT0gJ29iamVjdCcpIHtcclxuXHRcdFx0XHR0aHJvdyBuZXcgRXJyb3IoJ2dldCBleHBlY3RpbmcgYSBqc29uIG9iamVjdCB0byBiZSBwYXNzZWQgYXMgYW4gYXJndW1lbnQsIGJ1dCAnKyB0eXBlb2Ygb3B0aW9ucyArICcgd2FzIHBhc3NlZC4nKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0b3B0aW9ucy5kYXRhID0gb3B0aW9ucy5kYXRhIHx8IHt9O1xyXG5cclxuXHRcdFx0aWYodHlwZW9mIG9wdGlvbnMuZGF0YSAhPT0gJ29iamVjdCcpIHtcclxuXHRcdFx0XHR0aHJvdyBuZXcgRXJyb3IoJ2RhdGEgcHJvcGVydHkgZXhwZWN0aW5nIGEganNvbiBvYmplY3QgdG8gYmUgcGFzc2VkIGFzIGFuIGFyZ3VtZW50LCBidXQgJyArIHR5cGVvZiBvcHRpb25zLmRhdGEgKyAnIHdhcyBwYXNzZWQuJyk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHhoci5vcGVuKCdHRVQnLCBvcHRpb25zLnVybCwgdHJ1ZSk7XHJcblxyXG5cdFx0XHR4aHIucmVzcG9uc2VUeXBlID0gb3B0aW9ucy5kYXRhVHlwZSB8fCAnanNvbic7XHJcblx0XHRcdHhoci50aW1lb3V0ID0gb3B0aW9ucy50aW1lb3V0IHx8IDMwMDA7XHJcblxyXG5cdFx0XHR4aHIub25yZWFkeXN0YXRlY2hhbmdlID0gZnVuY3Rpb24oKSB7XHJcblx0XHRcdCAgICBpZih0aGlzLnJlYWR5U3RhdGUgIT0gNCB8fCB0aGlzLnN0YXR1cyAhPSAyMDApIHtcclxuXHRcdFx0ICAgIFx0cmV0dXJuO1xyXG5cdFx0XHQgICAgfVxyXG5cdCAgICAgICBcdFxyXG4gICAgICAgXHRcdFx0cmVzb2x2ZSh0aGlzLnJlc3BvbnNlKTtcclxuICAgICAgIFx0XHRcdFxyXG4gICAgICAgXHRcdFx0aWYob3B0aW9ucy5oYXNPd25Qcm9wZXJ0eSgnYWZ0ZXInKSAmJiB0eXBlb2Ygb3B0aW9ucy5hZnRlciA9PSAnZnVuY3Rpb24nKSB7XHJcblx0XHRcdFx0XHRvcHRpb25zLmFmdGVyLmNhbGwodGhpcyk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9O1xyXG5cclxuXHRcdFx0eGhyLm9uZXJyb3IgPSBmdW5jdGlvbihtZXNzYWdlKSB7XHJcblx0XHRcdFx0b3B0aW9ucy5lcnJvcihtZXNzYWdlKTtcclxuXHRcdFx0XHRyZWplY3QobWVzc2FnZSk7XHJcblx0XHRcdH07XHJcblxyXG5cdFx0XHRpZighIG9wdGlvbnMuZGF0YSkge1xyXG5cdFx0XHRcdHhoci5zZW5kKG51bGwpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHR2YXIgcXVlcnlTdHJpbmcgPSBPYmplY3Qua2V5cyhvcHRpb25zLmRhdGEpLm1hcChmdW5jdGlvbihrZXkpIHtcclxuXHRcdCAgICAgICAgICAgIHJldHVybiBlbmNvZGVVUklDb21wb25lbnQoa2V5KSArICc9JyArXHJcblx0XHQgICAgICAgICAgICAgICAgXHRlbmNvZGVVUklDb21wb25lbnQob3B0aW9ucy5kYXRhW2tleV0pO1xyXG5cdFx0ICAgICAgICBcdH0pLmpvaW4oJyYnKTtcclxuXHJcblx0XHRcdHhoci5zZW5kKHF1ZXJ5U3RyaW5nKTtcclxuXHRcdH0pO1xyXG5cdH1cclxufVxuXG5sZXQgZGVmYXVsdE1lc3NhZ2UkMiA9ICd0cnlpbmcgdG8gYmluZCBhbiBhbHJlYWR5IGV4aXN0aW5nIGJvdW5kLic7XHJcblxyXG5jbGFzcyBJbnZhbGlkQmluZGluZ0V4Y2VwdGlvbiBleHRlbmRzIEVycm9yXHJcbntcclxuXHRjb25zdHJ1Y3RvcihtZXNzYWdlKSBcclxuXHR7IFxyXG4gICAgXHRzdXBlcihtZXNzYWdlIHx8IGRlZmF1bHRNZXNzYWdlJDIpO1xyXG4gICAgXHRjb25zb2xlLmVycm9yKCdJbnZhbGlkQmluZGluZ0V4Y2VwdGlvbjogJyArIG1lc3NhZ2UgfHwgZGVmYXVsdE1lc3NhZ2UkMik7XHJcbiAgICB9XHJcbn1cblxuLyoqXHJcbiAqIEBmaWxlIFxyXG4gKiBDb250YWluZXIgY2xhc3MuXHJcbiAqXHJcbiAqIEhhbmRsZXMvQ29udHJvbHMgdGhlIGRlcGVuZGVuY2llcyBvZiBlY29tbWVyY2UuXHJcbiAqL1xyXG5cclxuLyoqXHJcbiAqIFN0b3JlcyB0aGUgaW5zdGFuY2VzXHJcbiAqXHJcbiAqIEB2YXIgYXJyYXlcclxuICovXHJcbmxldCBpbnN0YW5jZXMgPSBbXTtcclxuXHJcbmNsYXNzIENvbnRhaW5lciBcclxue1xyXG5cdC8qKlxyXG5cdCAqIEJpbmRzIGtleSB0byBjb25jcmV0ZSBjbGFzcy5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSBzdHJpbmcgfCBrZXlcclxuXHQgKiBAcGFyYW0gY2xhc3MgfCBjb25jcmV0ZVxyXG5cdCAqIEByZXR1cm4gdm9pZFxyXG5cdCAqL1xyXG5cdGJpbmQoa2V5LCBjb25jcmV0ZSkgXHJcblx0e1xyXG5cdFx0aWYgKHR5cGVvZiBrZXkgIT0gJ3N0cmluZycpIHtcclxuXHRcdFx0dGhyb3cgbmV3IEludmFsaWRBcmd1bWVudEV4Y2VwdGlvbiQxKCdiaW5kKCkgZXhwZWN0cyB0aGUgZmlyc3QgcGFyYW1ldGVyIHRvIGJlIHN0cmluZywgYnV0ICcgKyB0eXBlb2Yga2V5ICsgJyB3YXMgcGFzc2VkIGluc3RlYWQuJyk7XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKHR5cGVvZiBjb25jcmV0ZSAhPSAnZnVuY3Rpb24nKSB7IFxyXG5cdFx0XHR0aHJvdyBuZXcgSW52YWxpZEFyZ3VtZW50RXhjZXB0aW9uJDEoJ2JpbmQoKSBleHBlY3RzIHRoZSBzZWNvbmQgcGFyYW1ldGVyIHRvIGJlIGEgZnVuY3Rpb24sIGJ1dCAnICsgdHlwZW9mIGNvbmNyZXRlICsgJyB3YXMgcGFzc2VkIGluc3RlYWQuJyk7XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKHR5cGVvZiB0aGlzW2tleV0gIT0gJ3VuZGVmaW5lZCcpIHtcclxuXHRcdFx0dGhyb3cgbmV3IEludmFsaWRCaW5kaW5nRXhjZXB0aW9uKCdiaW5kKCkgcmVjaWV2ZWQgYW4gYWxyZWFkeSBleGlzdGluZyBiaW5kLicpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHRoaXNba2V5XSA9IGNvbmNyZXRlLmJpbmQoY29uY3JldGUsIHRoaXMpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogU2V0cyBhbiBpbnN0YW5jZS5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSBzdHJpbmcgfCBrZXlcclxuXHQgKiBAcGFyYW0gb2JqZWN0IHwgaW5zdGFuY2VcclxuXHQgKiBAcGFyYW0gc3RyaW5nIHwgYWxpYXNcclxuXHQgKiBAcmV0dXJuIHZvaWRcclxuXHQgKi9cclxuXHRzZXRJbnN0YW5jZShrZXksIGluc3RhbmNlLCBhbGlhcyA9IG51bGwpIFxyXG5cdHtcclxuXHRcdGlmICh0eXBlb2Yga2V5ICE9ICdzdHJpbmcnKSB7XHJcblx0XHRcdHRocm93IG5ldyBJbnZhbGlkQXJndW1lbnRFeGNlcHRpb24kMSgnc2V0SW5zdGFjZSgpIGV4cGVjdHMgdGhlIGZpcnN0IHBhcmFtZXRlciB0byBiZSBhIHN0cmluZywgYnV0ICcgKyB0eXBlb2Yga2V5ICsgJyB3YXMgcGFzc2VkIGluc3RlYWQuJyk7XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKHR5cGVvZiBpbnN0YW5jZSAhPSAnb2JqZWN0Jykge1xyXG5cdFx0XHR0aHJvdyBuZXcgSW52YWxpZEFyZ3VtZW50RXhjZXB0aW9uJDEoJ3NldEluc3RhbmNlKCkgZXhwZWN0cyB0aGUgc2Vjb25kIHBhcmFtZXRlciB0byBiZSBhbiBvYmplY3QsIGJ1dCAnICsgdHlwZW9mIGluc3RhbmNlICsgJyB3YXMgcGFzc2VkIGluc3RlYWQuJyk7XHJcblx0XHR9XHJcblxyXG5cdFx0aW5zdGFuY2VzW2tleV0gPSBpbnN0YW5jZTtcclxuXHRcdGluc3RhbmNlc1thbGlhc10gPSBpbnN0YW5jZTtcclxuXHRcdHRoaXNba2V5XSA9IGluc3RhbmNlO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogUmVzb2x2ZXMgYW4gaW5zdGFuY2Ugb3V0IG9mIFxyXG5cdCAqIHRoZSBpb2MgY29udGFpbmVyLlxyXG5cdCAqIFxyXG5cdCAqIEBwYXJhbSBzdHJpbmcgfCBrZXlcclxuXHQgKiBAcmV0dXJuIG9iamVjdFxyXG5cdCAqL1xyXG5cdGdldEluc3RhbmNlKGtleSkgXHJcblx0e1xyXG5cdFx0aWYodHlwZW9mIGtleSAhPSAnc3RyaW5nJykge1xyXG5cdFx0XHR0aHJvdyBuZXcgSW52YWxpZEFyZ3VtZW50RXhjZXB0aW9uJDEoJ2dldEluc3RhY2UoKSBleHBlY3RzIHRoZSBmaXJzdCBwYXJhbWV0ZXIgdG8gYmUgYSBzdHJpbmcsIGJ1dCAnICsgdHlwZW9mIGtleSArICcgd2FzIHBhc3NlZCBpbnN0ZWFkLicpO1xyXG5cdFx0fVxyXG5cclxuXHRcdGlmKHR5cGVvZiBrZXkgPT0gJ29iamVjdCcpIHtcclxuXHRcdFx0cmV0dXJuIGluc3RhbmNlc1trZXkuY29uc3RydWN0b3IubmFtZV0gfHwgbnVsbDtcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gaW5zdGFuY2VzW2tleV0gfHwgbnVsbDtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIENoZWNrcyBpZiBhbiBpbnN0YW5jZSBleGlzdC5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSBtaXhlZCB8IGluc3RhbmNlXHJcblx0ICogQHJldHVybiBib29sXHJcblx0ICovXHJcblx0aW5zdGFuY2VFeGlzdChpbnN0YW5jZSkgXHJcblx0e1xyXG5cdFx0aWYgKHR5cGVvZiBpbnN0YW5jZSA9PSAnb2JqZWN0Jykge1xyXG5cdFx0XHRyZXR1cm4gKHR5cGVvZiBpbnN0YW5jZXNbaW5zdGFuY2UuY29uc3RydWN0b3IubmFtZV0gIT09ICd1bmRlZmluZWQnKTtcclxuXHRcdH0gZWxzZSBpZiAodHlwZW9mIGluc3RhbmNlID09ICdzdHJpbmcnKSB7XHJcblx0XHRcdHJldHVybiAodHlwZW9mIGluc3RhbmNlc1tpbnN0YW5jZV0gIT09ICd1bmRlZmluZWQnKVxyXG5cdFx0fVxyXG5cdFx0XHJcblx0XHR0aHJvdyBuZXcgSW52YWxpZEFyZ3VtZW50RXhjZXB0aW9uJDEoJ2luc3RhbmNlRXhpc3QoKSBleHBlY3RzIHRoZSBmaXJzdCBwYXJhbWV0ZXIgdG8gYmUgc3RyaW5nIG9yIGFuIG9iamVjdCwgYnV0ICcgKyB0eXBlb2YgaW5zdGFuY2UgKyAnIHdhcyBwYXNzZWQgaW5zdGVhZC4nKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFJldHJpZXZlIGFuIG9iamVjdCwgaWYgbm90IGV4aXN0c1xyXG5cdCAqIHdpbGwgY3JlYXRlIGl0LCBzZXQgaXQgaW4gdGhlIGlvYyBjb250YWluZXJcclxuXHQgKiBmb3IgbGF0ZXIgdXNlIGFuZCByZXRyaWV2ZSBpdC5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSBtaXhlZCB8IG9iamVjdCBcclxuXHQgKiBAcmV0dXJuIG9iamVjdFxyXG5cdCAqL1xyXG5cdG1ha2Uob2JqZWN0KVxyXG5cdHtcclxuXHRcdGxldCBpbnN0YW5jZSA9IHt9O1xyXG5cdFx0bGV0IGtleTtcclxuXHJcblx0XHRpZiAodGhpcy5pbnN0YW5jZUV4aXN0KG9iamVjdCkpIHtcclxuXHRcdFx0cmV0dXJuIHRoaXMuZ2V0SW5zdGFuY2Uob2JqZWN0KTtcclxuXHRcdH1cclxuXHJcblx0XHRpZiAodHlwZW9mIG9iamVjdCA9PSAnb2JqZWN0Jykge1xyXG5cdFx0XHRpbnN0YW5jZSA9IG9iamVjdDtcclxuXHRcdFx0a2V5ID0gb2JqZWN0LmNvbnN0cnVjdG9yLm5hbWU7XHJcblx0XHRcdHRoaXMuc2V0SW5zdGFuY2Uoa2V5LCBpbnN0YW5jZSk7IFxyXG5cdFx0fSBlbHNlIGlmKHR5cGVvZiBvYmplY3QgPT0gJ3N0cmluZycgJiYgdGhpcy5oYXNPd25Qcm9wZXJ0eShvYmplY3QpKSB7XHJcblx0XHRcdGluc3RhbmNlID0gbmV3IHRoaXNbb2JqZWN0XTtcclxuXHRcdFx0a2V5ID0gb2JqZWN0O1xyXG5cdFx0XHR0aGlzLnNldEluc3RhbmNlKGtleSwgaW5zdGFuY2UpO1x0XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHR0aHJvdyBuZXcgSW52YWxpZEJpbmRpbmdFeGNlcHRpb24oJ1RoZSBwYXJhbWV0ZXIgeW91IHBhc3NlZCBjb3VsZCBub3QgYmUgYm91bmRlZCB0byB0aGUgY29udGFpbmVyLCBwYXJhbWV0ZXI6ICcgKyB0eXBlb2Ygb2JqZWN0KTtcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gaW5zdGFuY2U7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBSZXRyaWV2ZSBhbGwgaW5zdGFuY2VzLlxyXG5cdCAqXHJcblx0ICogQHJldHVybiBhcnJheVxyXG5cdCAqL1xyXG5cdGluc3RhbmNlcygpIFxyXG5cdHtcclxuXHRcdHJldHVybiBpbnN0YW5jZXM7XHJcblx0fVxyXG59XG5cbmxldCBkZWZhdWx0TWVzc2FnZSQzID0gJ1RoZSBldmVudCB5b3UgY2FsbGVkIGRvZXMgbm90IGV4aXN0cyBvciB5b3Ugc3VwcGxpZWQgd3JvbmcgYXJndW1lbnQnO1xyXG5cclxuY2xhc3MgQmFkRXZlbnRDYWxsRXhjZXB0aW9uIGV4dGVuZHMgRXJyb3Jcclxue1xyXG5cdGNvbnN0cnVjdG9yKG1lc3NhZ2UpIFxyXG5cdHsgXHJcblx0XHRzdXBlcihtZXNzYWdlIHx8IGRlZmF1bHRNZXNzYWdlJDMpO1xyXG4gICAgXHRjb25zb2xlLmVycm9yKCdCYWRFdmVudENhbGxFeGNlcHRpb246ICcgKyBtZXNzYWdlIHx8IGRlZmF1bHRNZXNzYWdlJDMpO1xyXG4gICAgfVxyXG59XG5cbi8qKlxyXG4gKiBAZmlsZSBcclxuICogRXZlbnRNYW5hZ2VyIGNsYXNzLlxyXG4gKlxyXG4gKiBIYW5kbGVzIHN1YnNjcmlwaW9ucyBhbmQgcHVibGlzaGluZyBvZiBldmVudHMuXHJcbiAqL1xyXG5cclxuLyoqXHJcbiAqIFN0b3JlcyB0aGUgZXZlbnRzIGNhbGxiYWNrcy5cclxuICogXHJcbiAqIEB2YXIgYXJyYXlcclxuICovXHJcbmxldCBldmVudHMgPSB7fTtcclxuXHJcbmNsYXNzIEV2ZW50TWFuYWdlclxyXG57XHJcblx0LyoqXHJcblx0ICogU3Vic2NyaWJpbmcgdG8gYW4gZXZlbnQuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gc3RyaW5nIHwgbmFtZVxyXG5cdCAqIEBwYXJhbSBmdW5jdGlvbiB8IGNhbGxiYWNrXHJcblx0ICogQHJldHVybiB2b2lkXHJcblx0ICovXHJcblx0c3Vic2NyaWJlKG5hbWUsIGNhbGxiYWNrKSBcclxuXHR7XHJcblx0XHRpZiAodHlwZW9mIGNhbGxiYWNrICE9PSAnZnVuY3Rpb24nKSB7XHJcblx0XHRcdHRocm93IG5ldyBJbnZhbGlkQXJndW1lbnRFeGNlcHRpb247XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKHR5cGVvZiBldmVudHNbbmFtZV0gPT0gJ3VuZGVmaW5lZCcpIHtcclxuXHRcdFx0ZXZlbnRzW25hbWVdID0gW107XHJcblx0XHR9XHJcblxyXG5cdFx0ZXZlbnRzW25hbWVdLnB1c2goY2FsbGJhY2spO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogUHVibGlzaCBhbiBldmVudCB0byBhbGwgc3Vic2NyaWJlcnMuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gc3RyaW5nIHwgbmFtZVxyXG5cdCAqIEBwYXJhbSBsaXN0IHwgZGF0YVxyXG5cdCAqIEByZXR1cm4gdm9pZFxyXG5cdCAqL1xyXG5cdHB1Ymxpc2gobmFtZSwgLi4uZGF0YSkgXHJcblx0e1xyXG5cdFx0ZGF0YSA9IGRhdGEgfHwgbnVsbDtcclxuXHJcblx0XHQvLyBJZiB0aGVyZSBhcmUgbm8gc3Vic2NyaWJlcnMgc2ltcGx5IGlnbm9yZSB0aGF0IGV2ZW50LlxyXG5cdFx0aWYgKHR5cGVvZiBldmVudHNbbmFtZV0gPT0gJ3VuZGVmaW5lZCcpIHtcclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0fVxyXG5cclxuXHRcdGV2ZW50c1tuYW1lXS5mb3JFYWNoKGZ1bmN0aW9uKGNhbGxiYWNrKSB7XHJcblx0XHRcdGlmKHR5cGVvZiBjYWxsYmFjayAhPSAnZnVuY3Rpb24nKSB7XHJcblx0XHRcdFx0dGhyb3cgbmV3IEludmFsaWRBcmd1bWVudEV4Y2VwdGlvbignbGlzdGVuKCkgc2hvdWxkIHJlY2lldmUgY2FsbGJhY2sgYXMgc2Vjb25kIHBhcmFtZXRlciwgYnV0ICcrIHR5cGVvZiBjYWxsYmFjayArJyB3YXMgcGFzc2VkJyk7XHJcblx0XHRcdH1cclxuXHRcdFx0XHJcblx0XHRcdHJldHVybiBjYWxsYmFjayguLi5kYXRhKTtcclxuXHRcdH0pO1xyXG5cdH1cclxufVxuXG5sZXQgZGVmYXVsdE1lc3NhZ2UkNCA9IGBleHBlY3RpbmcgZm9yIGF0IGxlYXN0IG9uZSBjb21wb25lbnRzLCBidXQgbm9uZSB3YXMgZ2l2ZW4sIFxyXG5cdFx0XHRcdFx0IHBsZWFzZSBhZGQgYXQgbGVhc3Qgb25lIHJlcXVpcmVtZW50KFByb2R1Y3RzLCBTZXJ2aWNlcyBvci9hbmQgRmlsdGVyLmA7XHJcblxyXG5jbGFzcyBDb21wb25lbnRzRXhjZXB0aW9uIGV4dGVuZHMgRXJyb3Jcclxue1xyXG5cdGNvbnN0cnVjdG9yKG1lc3NhZ2UpIFxyXG5cdHsgXHJcbiAgICBcdHN1cGVyKG1lc3NhZ2UgfHwgZGVmYXVsdE1lc3NhZ2UkNCk7XHJcbiAgICBcdGNvbnNvbGUuZXJyb3IoJ0NvbXBvbmVudHNFeGNlcHRpb246ICcgKyBtZXNzYWdlIHx8IGRlZmF1bHRNZXNzYWdlJDQpO1xyXG4gICAgfVxyXG59XG5cbmxldCBkZWZhdWx0TWVzc2FnZSQ1ID0gJ3NvcnJ5LCBubyBtb3JlIHBhZ2VzLic7XHJcblxyXG5jbGFzcyBOb3RJblBhZ2VSYW5nZUV4Y2VwdGlvbiBleHRlbmRzIEVycm9yXHJcbntcclxuXHRjb25zdHJ1Y3RvcihtZXNzYWdlKSBcclxuXHR7IFxyXG4gICAgXHRzdXBlcihtZXNzYWdlIHx8IGRlZmF1bHRNZXNzYWdlJDUpO1xyXG4gICAgXHRjb25zb2xlLmVycm9yKCdOb3RJblBhZ2VSYW5nZUV4Y2VwdGlvbjogJyArIG1lc3NhZ2UgfHwgZGVmYXVsdE1lc3NhZ2UkNSk7XHJcbiAgICB9XHJcbn1cblxubGV0IGRlZmF1bHRNZXNzYWdlJDYgPSAnSW4gb3JkZXIgdG8gdXNlIGNvbXBvbmVudHMgeW91IG11c3QgcmVnaXN0ZXIgdGhlbSB3aXRoIHRoZSBzaG9wISc7IFxyXG5cclxuY2xhc3MgQ29tcG9uZW50Tm90UmVnaXN0ZXJlZEV4Y2VwdGlvbiBleHRlbmRzIEVycm9yXHJcbntcclxuXHRjb25zdHJ1Y3RvcihtZXNzYWdlKSBcclxuXHR7IFxyXG4gICAgXHRzdXBlcihtZXNzYWdlIHx8IGRlZmF1bHRNZXNzYWdlJDYpO1xyXG4gICAgXHRjb25zb2xlLmVycm9yKCdDb21wb25lbnROb3RSZWdpc3RlcmVkRXhjZXB0aW9uOiAnICsgbWVzc2FnZSB8fCBkZWZhdWx0TWVzc2FnZSQ2KTtcclxuICAgIH1cclxufVxuXG5jbGFzcyBFeGNlcHRpb25IYW5kbGVyIGV4dGVuZHMgRXJyb3Jcclxue1xyXG5cdC8qKlxyXG5cdCAqIEhhbmRsZSBhbGwgdGhlIGVycm9yc1xyXG5cdCAqL1xyXG5cdHN0YXRpYyBpbml0YWxpemUoKSB7XHRcclxuXHRcdHdpbmRvdy5vbmVycm9yID0gZnVuY3Rpb24obWVzc2FnZSwgc291cmNlLCBsaW5lbm8sIGNvbG5vLCBlcnJvcikge1xyXG5cdFx0XHRcclxuXHRcdFx0aWYgKGVycm9yIGluc3RhbmNlb2YgSW52YWxpZEFyZ3VtZW50RXhjZXB0aW9uJDEpIHtcclxuXHRcdFx0XHQvLyBoYW5kbGVcclxuXHRcdFx0fSBlbHNlIGlmIChlcnJvciBpbnN0YW5jZW9mIEludmFsaWRCaW5kaW5nRXhjZXB0aW9uKSB7XHJcblx0XHRcdFx0Ly8gaGFuZGxlXHJcblx0XHRcdH0gZWxzZSBpZiAoZXJyb3IgaW5zdGFuY2VvZiBCYWRFdmVudENhbGxFeGNlcHRpb24pIHtcclxuXHRcdFx0XHQvLyBoYW5kbGVcclxuXHRcdFx0fSBlbHNlIGlmIChlcnJvciBpbnN0YW5jZW9mIENvbXBvbmVudHNFeGNlcHRpb24pIHtcclxuXHRcdFx0XHQvLyBoYW5kbGVcclxuXHRcdFx0fSBlbHNlIGlmIChlcnJvciBpbnN0YW5jZW9mIENvbXBvbmVudE5vdFJlZ2lzdGVyZWRFeGNlcHRpb24pIHtcclxuXHRcdFx0XHQvLyBoYW5kbGVcclxuXHRcdFx0fSBlbHNlIGlmIChlcnJvciBpbnN0YW5jZW9mIE5vdEluUGFnZVJhbmdlRXhjZXB0aW9uKSB7XHJcblx0XHRcdFx0Ly8gaGFuZGxlIFxyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0cmV0dXJuIHRydWU7XHJcblx0XHR9O1xyXG5cdH1cclxufVxuXG4vKipcclxuICogQGZpbGUgXHJcbiAqIFN0ciBjbGFzcy5cclxuICpcclxuICogQWRkcyBzb21lIHVzZWZ1bCBmdW5jdGlvbmFsaXR5IGZvclxyXG4gKiBtYW5pcHVsYXRpbmcgc3RyaW5ncyBvciBjcmVhdGluZyBzdHJpbmcuXHJcbiAqL1xyXG5cclxuY2xhc3MgU3RyXHJcbntcclxuXHQvKipcclxuXHQgKiBDb252ZXJ0IGNhbWVsQ2FzZSB0byBrZWJhYi1jYXNlLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIHN0cmluZyB8IHN0cmluZ1xyXG5cdCAqIEByZXR1cm4gc3RyaW5nXHJcblx0ICovXHJcblx0c3RhdGljIGtlYmFiQ2FzZShzdHJpbmcpIFxyXG5cdHtcclxuXHRcdHJldHVybiBzdHJpbmcucmVwbGFjZSgvKFthLXpdKShbQS1aXSkvZywgJyQxLSQyJykudG9Mb3dlckNhc2UoKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEdlbmVyYXRlcyBhIHJhbmRvbSBzdHJpbmcuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gaW50ZWdlciB8IGxlbmd0aFxyXG5cdCAqIEByZXR1cm4gc3RyaW5nXHJcblx0ICovXHJcblx0c3RhdGljIHJhbmRvbShsZW5ndGgpIFxyXG5cdHtcclxuXHRcdGxldCBzdHJpbmcgPSAnJztcclxuXHRcdGxldCBwb3NzaWJsZSA9IFwiQUJDREVGR0hJSktMTU5PUFFSU1RVVldYWVphYmNkZWZnaGlqa2xtbm9wcXJzdHV2d3h5ejAxMjM0NTY3ODlcIjtcclxuXHJcblx0XHRmb3IgKGxldCBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XHJcblx0ICAgIFx0c3RyaW5nICs9IHBvc3NpYmxlLmNoYXJBdChNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBwb3NzaWJsZS5sZW5ndGgpKTtcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gc3RyaW5nO1xyXG5cdH1cclxufVxuXG4vKipcclxuICogQGZpbGUgXHJcbiAqIENvb2tpZSBjbGFzcy5cclxuICpcclxuICogQWRkcyBzb21lIHVzZWZ1bCBmdW5jdGlvbmFsaXR5IGZvclxyXG4gKiBzZXR0aW5nIG9yIGdldHRpbmcgY29va2llcy5cclxuICovXHJcblx0XHJcbmNsYXNzIENvb2tpZVxyXG57XHJcblx0LyoqXHJcbiBcdCogU2V0cyBhIGNvb2tpZS5cclxuIFx0KiBcclxuIFx0KiBAcGFyYW0gc3RyaW5nIHwgbmFtZVxyXG4gXHQqIEBwYXJhbSBKU09OIHwgdmFsdWVcclxuIFx0KiBAcGFyYW0gaW50ZWdlciB8IGRheXNcclxuIFx0KiBAcmV0dXJuIHZvaWRcclxuXHQqL1xyXG5cdHN0YXRpYyBzZXQobmFtZSwgdmFsdWUsIGRheXMpIFxyXG5cdHtcclxuXHRcdGlmICh2YWx1ZS5jb25zdHJ1Y3Rvci5uYW1lICA9PSAnT2JqZWN0JyB8fCB2YWx1ZS5jb25zdHJ1Y3Rvci5uYW1lID09ICdBcnJheScpIHtcclxuXHRcdFx0dmFsdWUgPSBKU09OLnN0cmluZ2lmeSh2YWx1ZSk7XHJcblx0XHR9XHJcblxyXG5cdFx0ZGF5cyA9IGRheXMgfHwgMTA7XHJcblxyXG5cdCAgICBsZXQgZXhwaXJlcztcclxuXHQgICAgXHJcblx0ICAgIGlmIChkYXlzKSB7XHJcblx0ICAgICAgICBsZXQgZGF0ZSA9IG5ldyBEYXRlKCk7XHJcblx0ICAgICAgICBkYXRlLnNldFRpbWUoZGF0ZS5nZXRUaW1lKCkgKyAoZGF5cyAqIDI0ICogNjAgKiA2MCAqIDEwMDApKTtcclxuXHQgICAgICAgIGV4cGlyZXMgPSBcIjsgZXhwaXJlcz1cIiArIGRhdGUudG9HTVRTdHJpbmcoKTtcclxuXHQgICAgfSBlbHNlIHtcclxuXHQgICAgICAgIGV4cGlyZXMgPSBcIlwiO1xyXG5cdCAgICB9XHJcblxyXG5cdCAgICBkb2N1bWVudC5jb29raWUgPSBuYW1lICsgXCI9XCIgKyB2YWx1ZSArIGV4cGlyZXMgKyBcIjsgcGF0aD0vXCI7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBSZXRyaWV2ZXMgdGhlIGNvb2tpZSBieSBuYW1lLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIHN0cmluZyB8IG5hbWVcclxuIFx0ICogQHJldHVybiBKU09OXHJcblx0ICovXHJcblx0c3RhdGljIGdldChuYW1lKSBcclxuXHR7XHJcblx0ICAgIGlmIChkb2N1bWVudC5jb29raWUubGVuZ3RoID4gMCkge1xyXG5cdCAgICAgICAgbGV0IGNfc3RhcnQgPSBkb2N1bWVudC5jb29raWUuaW5kZXhPZihuYW1lICsgXCI9XCIpO1xyXG5cdCAgICAgICAgXHJcblx0ICAgICAgICBpZiAoY19zdGFydCAhPSAtMSkge1xyXG5cdCAgICAgICAgICAgIGNfc3RhcnQgPSBjX3N0YXJ0ICsgbmFtZS5sZW5ndGggKyAxO1xyXG5cdCAgICAgICAgICAgIGxldCBjX2VuZCA9IGRvY3VtZW50LmNvb2tpZS5pbmRleE9mKFwiO1wiLCBjX3N0YXJ0KTtcclxuXHQgICAgICAgICAgICBcclxuXHQgICAgICAgICAgICBpZiAoY19lbmQgPT0gLTEpIHtcclxuXHQgICAgICAgICAgICAgICAgY19lbmQgPSBkb2N1bWVudC5jb29raWUubGVuZ3RoO1xyXG5cdCAgICAgICAgICAgIH1cclxuXHJcblx0ICAgICAgICAgICAgcmV0dXJuIEpTT04ucGFyc2UodW5lc2NhcGUoZG9jdW1lbnQuY29va2llLnN1YnN0cmluZyhjX3N0YXJ0LCBjX2VuZCkpKTtcclxuXHQgICAgICAgIH1cclxuXHQgICAgfVxyXG5cclxuXHQgICAgcmV0dXJuIHt9O1xyXG5cdH1cclxufVxuXG4vKipcclxuICogQGZpbGUgXHJcbiAqIENhcnQgY2xhc3MuXHJcbiAqXHJcbiAqIEhhbmRsZXMgYWRkaW5nLCByZW1vdmluZyBldGMuLi4gb2YgaXRlbXMuXHJcbiAqL1xyXG5cclxuLyoqXHJcbiAqIFRoZSBkZWZhdWx0IHNldHRpbmdzIG9mIHRoZSBjYXJ0LlxyXG4gKlxyXG4gKiBAdmFyIG9iamVjdFxyXG4gKi9cclxubGV0IGRlZmF1bHRTZXR0aW5ncyQyID0ge1xyXG5cdGVsZW1lbnQ6ICcuY2FydCcsXHJcblx0Y29va2llX25hbWU6ICdjYXJ0JyxcclxuXHRwcmV2aWV3X2NsYXNzOiAnJyxcclxuXHRsb2FkZXI6ICcvaW1hZ2VzL2ljb25zL3NwaW5uZXIuc3ZnJyxcclxuXHRjbGFzczogJycsXHJcblx0d2lkdGg6ICc2MHB4JyxcclxuXHRoZWlnaHQ6ICc2MHB4JyxcclxuXHRwbGFjZW1lbnQ6ICdyaWdodC10b3AnLFxyXG5cdGZpeGVkOiB0cnVlLFxyXG5cdGhvdmVyX2NvbG9yOiAnb3JhbmdlJ1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIFN0b3JlcyB0aGUgY29udGFpbmVyIG9iamVjdC5cclxuICpcclxuICogQHZhciBcXENvcmVcXENvbnRhaW5lclxyXG4gKi9cclxubGV0IENvbnRhaW5lciQyO1xyXG5cclxuLyoqXHJcbiAqIFN0b3JlcyB0aGUgZXZlbnQgbWFuYWdlciBvYmplY3QuXHJcbiAqXHJcbiAqIEB2YXIgXFxDb3JlXFxFdmVudE1hbmFnZXJcclxuICovXHJcbmxldCBFdmVudE1hbmFnZXIkMjtcclxuXHJcbi8qKlxyXG4gKiBTdG9yZXMgdGhlIHJlcXVlc3Qgb2JqZWN0LlxyXG4gKlxyXG4gKiBAdmFyIFxcSGVscGVyc1xcUmVxdWVzdFxyXG4gKi9cclxubGV0IEh0dHA7XHJcblxyXG4vKipcclxuICogU3RvcmVzIHRoZSBjYXJ0IGxvYWRlci5cclxuICpcclxuICogQHZhciBIVE1MRGl2RWxlbWVudFxyXG4gKi9cclxubGV0IGxvYWRpbmdPdmVybGF5O1xyXG5cclxuLyoqXHJcbiAqIFN0b3JlcyB0aGUgaXRlbXMgd3JhcHBlci5cclxuICpcclxuICogQHZhciBIVE1MRGl2RWxlbWVudFxyXG4gKi9cclxubGV0IGl0ZW1zRGl2O1xyXG5cclxuY2xhc3MgQ2FydCBcclxue1xyXG5cdC8qKlxyXG5cdCAqIC0gSW5pdGlhbGl6ZSB0aGUgSW9DIGNvbnRhaW5lclxyXG5cdCAqIC0gSW5pdGlhbGl6ZSB0aGUgUmVxdWVzdFxyXG5cdCAqIC0gSW5pdGlhbGl6ZSB0aGUgRXZlbnRNYW5hZ2VyXHJcblx0ICogLSBDcmVhdGVzIHRoZSBwcmV2aWV3IGFuZCB0aGUgaWNvbiBvZiB0aGUgY2FydC5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSBcXENvcmVcXENvbnRhaW5lciB8IGNvbnRhaW5lclxyXG5cdCAqIEBwYXJhbSBcXEhlbHBlcnNcXFJlcXVlc3QgfCBodHRwXHJcblx0ICogQHBhcmFtIFxcQ29yZVxcRXZlbnRNYW5hZ2VyIHwgZXZlbnRNYW5hZ2VyXHJcblx0ICogQHJldHVybiB2b2lkXHJcblx0ICovXHJcblx0Y29uc3RydWN0b3IoY29udGFpbmVyLCBodHRwLCBldmVudE1hbmFnZXIpIFxyXG5cdHtcclxuXHRcdENvbnRhaW5lciQyID0gY29udGFpbmVyO1xyXG5cdFx0SHR0cCA9IGh0dHA7XHJcblx0XHRFdmVudE1hbmFnZXIkMiA9IGV2ZW50TWFuYWdlcjtcclxuXHRcdFxyXG5cdFx0dGhpcy5wcmV2aWV3RWxlbWVudCA9IHRoaXMuY3JlYXRlUHJldmlld0VsZW1lbnQoKTtcclxuXHRcdHRoaXMuc3ZnSWNvbiA9IGNyZWF0ZUljb24uY2FsbCh0aGlzKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFNldHMgdGhlIG9iamVjdCBieSB0aGUgdXNlcnMgc2V0dGluZy5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSBvYmplY3QgfCBzZXR0aW5nc1xyXG5cdCAqIEByZXR1cm4gdm9pZFxyXG5cdCAqL1xyXG5cdHNldHVwKHNldHRpbmdzKVxyXG5cdHtcclxuXHRcdGlmKHR5cGVvZiBzZXR0aW5ncyAhPSAnb2JqZWN0Jykge1xyXG5cdFx0XHR0aHJvdyBuZXcgSW52YWxpZEFyZ3VtZW50RXhjZXB0aW9uJDE7XHJcblx0XHR9XHJcblxyXG5cdFx0dGhpcy5zZXR0aW5ncyA9IENvbW1vbi5leHRlbmQoZGVmYXVsdFNldHRpbmdzJDIsIHNldHRpbmdzKTtcclxuXHJcblx0XHR0aGlzLnNldEVsZW1lbnQodGhpcy5zZXR0aW5ncy5lbGVtZW50KTtcclxuXHJcblx0XHRET00uYWRkQ2xhc3ModGhpcy5wcmV2aWV3RWxlbWVudCwgJ2Nsb3NlZCcpO1xyXG5cdFx0RE9NLmFkZENsYXNzKHRoaXMucHJldmlld0VsZW1lbnQsIHRoaXMuc2V0dGluZ3MucHJldmlld19jbGFzcyk7XHJcblx0XHRcclxuXHRcdHRoaXMuYmluZEV2ZW50TGlzdGVuZXJzKCk7XHJcblx0XHR0aGlzLmFkZFN0eWxlVGFnKCk7XHJcblxyXG5cdFx0aWYodGhpcy5pc0VtcHR5KENvb2tpZS5nZXQodGhpcy5zZXR0aW5ncy5jb29raWVfbmFtZSkpKSB7XHJcblx0XHRcdHRoaXMuY2FydCA9IHt9O1xyXG5cdFx0XHR0aGlzLnNldENhcnQodGhpcy5jYXJ0KTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIENoZWNrcyBpZiB0aGUgY2FydCBpcyBlbXB0eVxyXG5cdCAqXHJcblx0ICogQHBhcmFtIG9iamVjdCB8IGNhcnRcclxuXHQgKiBAcmV0dXJuIGJvb2xcclxuXHQgKi9cclxuXHRpc0VtcHR5KGNhcnQpXHJcblx0e1xyXG5cdFx0cmV0dXJuIENvbW1vbi5lbXB0eU9iamVjdChjYXJ0KTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEluaXRpYWxpemUvU2V0cyB0aGUgY2FydCBhcyBhIGNvb2tpZS5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSBvYmplY3QgfCBjYXJ0XHJcblx0ICogQHJldHVybiB2b2lkXHJcblx0ICovXHJcblx0c2V0Q2FydChjYXJ0KVxyXG5cdHtcclxuXHRcdHRoaXMuY2FydC5pZCA9IFN0ci5yYW5kb20oMTApO1xyXG5cdFx0dGhpcy5jYXJ0Lml0ZW1zID0gW107XHJcblx0XHR0aGlzLmNhcnQuZmF2b3JpdGVzID0gW107XHJcblx0XHRDb29raWUuc2V0KHRoaXMuc2V0dGluZ3MuY29va2llX25hbWUsIGNhcnQsIDIpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQWRkcyBhbiBpdGVtIHRvIHRoZSBjYXJ0LlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIG9iamVjdCB8IGl0ZW1cclxuXHQgKiBAcmV0dXJuIHZvaWRcclxuXHQgKi9cclxuXHRhZGRJdGVtKGl0ZW0pXHJcblx0e1xyXG5cdFx0dGhpcy5jYXJ0ID0gQ29va2llLmdldCh0aGlzLnNldHRpbmdzLmNvb2tpZV9uYW1lKTtcclxuXHJcblx0XHR0aGlzLmNhcnQuaXRlbXMucHVzaChpdGVtKTtcclxuXHJcblx0XHRDb29raWUuc2V0KHRoaXMuc2V0dGluZ3MuY29va2llX25hbWUsIHRoaXMuY2FydCwgMik7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBSZW1vdmVzIGFuIGl0ZW0gZnJvbSB0aGUgY2FydC5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSBvYmplY3QgfCBpdGVtXHJcblx0ICogQHJldHVybiB2b2lkXHJcblx0ICovXHJcblx0cmVtb3ZlSXRlbShpdGVtKVxyXG5cdHtcclxuIFx0XHR0aGlzLmNhcnQgPSBDb29raWUuZ2V0KHRoaXMuc2V0dGluZ3MuY29va2llX25hbWUpO1xyXG5cclxuIFx0XHR0aGlzLmNhcnQuaXRlbXMuc3BsaWNlKHRoaXMuY2FydC5pdGVtcy5pbmRleE9mKGl0ZW0pLCAxKTtcclxuXHJcbiBcdFx0Q29va2llLnNldCh0aGlzLnNldHRpbmdzLmNvb2tpZV9uYW1lLCB0aGlzLmNhcnQsIDIpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQWRkcyB0aGUgaXRlbSB0byBwcmV2aWV3LlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIGFycmF5IHwgaXRlbXNcclxuXHQgKiBAcmV0dXJuIHZvaWRcclxuXHQgKi9cclxuXHRhZGRUb1ByZXZpZXcoaXRlbXMpXHJcblx0e1xyXG5cdFx0aXRlbXNEaXYuaW5uZXJIVE1MID0gJyc7XHJcblxyXG5cdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCBpdGVtcy5sZW5ndGg7IGkrKykge1xyXG5cclxuXHRcdFx0bGV0IGxpID0gRE9NLmNyZWF0ZUVsZW1lbnQoJ2xpJywge1xyXG5cdFx0XHRcdFx0Y2xhc3M6ICdpdGVtJ1xyXG5cdFx0XHRcdH0pO1xyXG5cclxuXHRcdFx0bGV0IGF0dHJpYnV0ZXMgPSBpdGVtc1tpXTtcclxuXHJcblx0XHRcdGZvcihsZXQgYXR0cmlidXRlIGluIGF0dHJpYnV0ZXMpIHtcclxuXHRcdFx0XHRsZXQgc3BhbiA9IERPTS5jcmVhdGVFbGVtZW50KCdzcGFuJywge1xyXG5cdFx0XHRcdFx0dGV4dDogYXR0cmlidXRlc1thdHRyaWJ1dGVdXHJcblx0XHRcdFx0fSk7XHJcblxyXG5cdFx0XHRcdGxpLmFwcGVuZENoaWxkKHNwYW4pO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRpdGVtc0Rpdi5hcHBlbmRDaGlsZChsaSk7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBCaW5kcyBldmVydGhpbmcgdG8gdGhlIGVsZW1lbnQuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gc3RyaW5nIHwgc2VsZWN0b3JcclxuXHQgKiBAcmV0dXJuIHZvaWRcclxuXHQgKi9cclxuXHRzZXRFbGVtZW50KHNlbGVjdG9yKVxyXG5cdHtcclxuXHRcdHRoaXMuaWNvbiA9IERPTS5maW5kKHNlbGVjdG9yKTtcclxuXHJcblx0XHRpZiAodGhpcy5pY29uKSB7XHJcblx0XHRcdERPTS5hZGRDbGFzcyh0aGlzLmljb24sIHRoaXMuc2V0dGluZ3MuY2xhc3MpO1xyXG5cdFx0XHRET00uYWRkQ2xhc3ModGhpcy5pY29uLCB0aGlzLnNldHRpbmdzLnBsYWNlbWVudCk7XHJcblx0XHRcdHRoaXMuaWNvbi5hcHBlbmRDaGlsZCh0aGlzLnN2Z0ljb24pO1xyXG5cdFx0XHR0aGlzLmljb24uYXBwZW5kQ2hpbGQodGhpcy5wcmV2aWV3RWxlbWVudCk7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBDcmVhdGVzIHRoZSBjYXJ0IGRldGFpbHMgcHJldmlldyBlbGVtZW50LlxyXG5cdCAqXHJcblx0ICogQHJldHVybiBIVE1MRGl2RWxlbWVudFxyXG5cdCAqL1xyXG5cdGNyZWF0ZVByZXZpZXdFbGVtZW50KClcclxuXHR7XHJcblx0XHRsZXQgcHJldmlld0VsZW1lbnQgPSBET00uY3JlYXRlRWxlbWVudCgnZGl2Jywge1xyXG5cdFx0XHRpZDogJ3ByZXZpZXcnXHJcblx0XHR9KTtcclxuXHJcblx0XHRpdGVtc0RpdiA9IERPTS5jcmVhdGVFbGVtZW50KCd1bCcsIHtcclxuXHRcdFx0XHRjbGFzczogJ2l0ZW1zJ1xyXG5cdFx0XHR9KTtcclxuXHJcblx0XHRwcmV2aWV3RWxlbWVudC5hcHBlbmRDaGlsZChpdGVtc0Rpdik7XHJcblxyXG5cdFx0cmV0dXJuIHByZXZpZXdFbGVtZW50O1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQWRkIHRoZSBlQ29tbWVyY2Ugc3R5bGUgdGFncyB0byB0aGUgRE9NLlxyXG5cdCAqXHJcblx0ICogQHJldHVybiB2b2lkXHJcblx0ICovXHJcblx0YWRkU3R5bGVUYWcoKSBcclxuXHR7XHJcblx0XHRpZihET00uZmluZCgnI2VDb21tZXJjZS1DYXJ0JykpIHtcclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0fVxyXG5cclxuXHRcdGxldCBwb3NpdGlvbiA9ICh0aGlzLnNldHRpbmdzLmZpeGVkKSA/ICdmaXhlZCcgOiAnYWJzb2x1dGUnO1xyXG5cclxuXHRcdGxldCBjc3MgPSBgXHJcblx0XHRcdCR7dGhpcy5zZXR0aW5ncy5lbGVtZW50fSB7XHJcblx0XHRcdFx0cG9zaXRpb246ICR7cG9zaXRpb259O1xyXG5cdFx0XHRcdGN1cnNvcjogcG9pbnRlcjtcclxuXHRcdFx0XHRjb2xvcjogI2ZmZmZmZjtcclxuXHRcdFx0XHR6LWluZGV4OiA5OTg7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdCR7dGhpcy5zZXR0aW5ncy5lbGVtZW50fSA+IHN2ZyB7XHJcblx0XHRcdFx0d2lkdGg6ICR7dGhpcy5zZXR0aW5ncy53aWR0aH07XHJcblx0XHRcdFx0aGVpZ2h0OiAke3RoaXMuc2V0dGluZ3MuaGVpZ2h0fTtcclxuXHRcdFx0XHR0cmFuc2l0aW9uOiBmaWxsIDAuM3M7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdCR7dGhpcy5zZXR0aW5ncy5lbGVtZW50fSA+IHN2Zzpob3ZlciB7XHJcblx0XHRcdFx0ZmlsbDogJHt0aGlzLnNldHRpbmdzLmhvdmVyX2NvbG9yfTtcclxuXHRcdFx0XHR0cmFuc2l0aW9uOiBmaWxsIDAuM3M7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdCR7dGhpcy5zZXR0aW5ncy5lbGVtZW50fS50b3AtcmlnaHQsXHJcblx0XHRcdCR7dGhpcy5zZXR0aW5ncy5lbGVtZW50fS5yaWdodC10b3Age1xyXG5cdFx0XHRcdHJpZ2h0OiAxMHB4O1xyXG5cdFx0XHRcdHRvcDogMTBweDtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0JHt0aGlzLnNldHRpbmdzLmVsZW1lbnR9LmxlZnQtdG9wLFxyXG5cdFx0XHQke3RoaXMuc2V0dGluZ3MuZWxlbWVudH0udG9wLWxlZnQge1xyXG5cdFx0XHRcdGxlZnQ6IDEwcHg7XHJcblx0XHRcdFx0dG9wOiAxMHB4O1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHQke3RoaXMuc2V0dGluZ3MuZWxlbWVudH0gPiAjcHJldmlldyB7XHJcblx0XHRcdFx0cG9zaXRpb246ICR7cG9zaXRpb259O1xyXG5cdFx0XHRcdHotaW5kZXg6IDk5OTk7XHJcblx0XHRcdFx0dG9wOiBjYWxjKDEwcHggKyAke3RoaXMuc2V0dGluZ3MuaGVpZ2h0fSk7XHJcblx0XHRcdFx0dHJhbnNmb3JtOiB0cmFuc2xhdGVYKDYwcHgpO1xyXG5cdFx0XHRcdGhlaWdodDogNDAwcHg7XHJcblx0XHRcdFx0d2lkdGg6IDMwMHB4O1xyXG5cdFx0XHRcdGJvcmRlcjogMXB4IHNvbGlkICNlNGU0ZTQ7XHJcblx0XHRcdFx0YmFja2dyb3VuZDogI2ZmZmZmZjtcclxuXHRcdFx0XHR0cmFuc2l0aW9uOiB0cmFuc2Zvcm0gMXMsIHZpc2liaWxpdHkgMXM7XHJcblx0XHRcdFx0Y3Vyc29yOiBkZWZhdWx0O1xyXG5cdFx0XHRcdG92ZXJmbG93LVk6IHNjcm9sbDtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0JHt0aGlzLnNldHRpbmdzLmVsZW1lbnR9ID4gI3ByZXZpZXcub3BlbmVkIHtcclxuXHRcdFx0XHR2aXNpYmlsaXR5OiB2aXNpYmxlO1xyXG5cdFx0XHRcdHRyYW5zZm9ybTogdHJhbnNsYXRlWCgtMjQwcHgpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHQke3RoaXMuc2V0dGluZ3MuZWxlbWVudH0gPiAjcHJldmlldy5jbG9zZWQge1xyXG5cdFx0XHRcdHZpc2liaWxpdHk6IGhpZGRlbjtcclxuXHRcdFx0XHR0cmFuc2Zvcm06IHRyYW5zbGF0ZVgoNjBweCk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdCR7dGhpcy5zZXR0aW5ncy5lbGVtZW50fSA+ICNwcmV2aWV3ID4gdWwuaXRlbXMsXHJcblx0XHRcdCR7dGhpcy5zZXR0aW5ncy5lbGVtZW50fSA+ICNwcmV2aWV3ID4gdWwuaXRlbXMgPiBsaS5pdGVtIHtcclxuXHRcdFx0XHRjb2xvcjogIzAwMDAwMDtcclxuXHRcdFx0XHRsaXN0LXN0eWxlLXR5cGU6IG5vbmU7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdCR7dGhpcy5zZXR0aW5ncy5lbGVtZW50fSAuaXRlbXMubG9hZGluZyB7XHJcblx0XHRcdFx0ZGlzcGxheTogbm9uZTtcclxuXHRcdFx0XHRvdmVyZmxvdy1ZOiBub25lO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHQke3RoaXMuc2V0dGluZ3MuZWxlbWVudH0gLmNhcnQtbG9hZGVyLW92ZXJsYXkge1xyXG5cdFx0XHRcdHBvc2l0aW9uOiBmaXhlZDtcclxuXHRcdFx0XHR0b3A6IDA7IFxyXG5cdFx0XHQgICAgbGVmdDogMDtcclxuXHRcdFx0ICAgIHJpZ2h0OiAwO1xyXG5cdFx0XHQgICAgYm90dG9tOiAwO1xyXG5cdFx0XHRcdGJhY2tncm91bmQ6ICNmZmZmZmY7XHJcblx0XHRcdFx0d2lkdGg6IDEwMCU7XHJcblx0XHRcdFx0aGVpZ2h0OiAxMDAlO1xyXG5cdFx0XHRcdG1pbi1oZWlnaHQ6IDEwMCU7XHJcblx0XHRcdFx0b3ZlcmZsb3c6IGF1dG87XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdCR7dGhpcy5zZXR0aW5ncy5lbGVtZW50fSAuY2FydC1sb2FkZXItb3ZlcmxheSAuY2FydC1sb2FkZXIge1xyXG5cdFx0XHRcdHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuXHRcdFx0XHR3aWR0aDogNTBweDtcclxuXHRcdFx0XHRoZWlnaHQ6IDUwcHg7XHJcblx0XHRcdFx0bWFyZ2luLWxlZnQ6IC0yNXB4O1xyXG5cdFx0XHRcdG1hcmdpbi10b3A6IC0yNXB4O1xyXG5cdFx0XHRcdGxlZnQ6IDUwJTtcclxuXHRcdFx0XHRyaWdodDogNTAlO1xyXG5cdFx0XHRcdHRvcDogNTAlO1xyXG5cdFx0XHRcdGJvdHRvbTogNTAlO1xyXG5cdFx0XHR9XHJcblx0XHRgO1xyXG5cdCAgICBcclxuXHQgICAgRE9NLmFkZFN0eWxlKCdlQ29tbWVyY2UtQ2FydCcsIGNzcyk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBDcmVhdGVzIGFuIGxvYWRpbmcgb3ZlcmxheS5cclxuXHQgKlxyXG5cdCAqIEByZXR1cm4gSFRNTERpdkVsZW1lbnRcclxuXHQgKi9cclxuXHRsb2FkaW5nT3ZlcmxheSgpXHJcblx0e1xyXG5cdFx0aWYgKGxvYWRpbmdPdmVybGF5KSB7XHJcblx0XHRcdHJldHVybiBsb2FkaW5nT3ZlcmxheTtcclxuXHRcdH1cclxuXHJcblx0XHRsZXQgbG9hZGVyID0gRE9NLmNyZWF0ZUVsZW1lbnQoJ2ltZycsIHtcclxuXHRcdFx0c3JjOiB0aGlzLnNldHRpbmdzLmxvYWRlcixcclxuXHRcdFx0Y2xhc3M6ICdjYXJ0LWxvYWRlcidcclxuXHRcdH0pO1xyXG5cclxuXHRcdGxvYWRpbmdPdmVybGF5ID0gRE9NLmNyZWF0ZUVsZW1lbnQoJ2RpdicsIHtcclxuXHRcdFx0Y2xhc3M6ICdjYXJ0LWxvYWRlci1vdmVybGF5J1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0bG9hZGluZ092ZXJsYXkuYXBwZW5kQ2hpbGQobG9hZGVyKTtcclxuXHJcblx0XHRyZXR1cm4gbG9hZGluZ092ZXJsYXk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBMb2FkaW5nIHRoZSBjYXJ0IHByZXZpZXcuXHJcblx0ICpcclxuXHQgKiBAcmV0dXJuIHZvaWRcclxuXHQgKi9cclxuXHRwcmV2aWV3U3RhcnRMb2FkaW5nKClcclxuXHR7XHJcblx0XHRET00uYWRkQ2xhc3MoaXRlbXNEaXYsICdsb2FkaW5nJyk7XHJcblx0XHR0aGlzLnByZXZpZXdFbGVtZW50LmFwcGVuZENoaWxkKHRoaXMubG9hZGluZ092ZXJsYXkoKSk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBMb2FkaW5nIHRoZSBjYXJ0IHByZXZpZXcuXHJcblx0ICpcclxuXHQgKiBAcmV0dXJuIHZvaWRcclxuXHQgKi9cclxuXHRwcmV2aWV3U3RvcExvYWRpbmcoKVxyXG5cdHtcclxuXHRcdGlmIChET00uZmluZCgnLmNhcnQtbG9hZGVyLW92ZXJsYXknLCB0aGlzLnByZXZpZXdFbGVtZW50KSkge1xyXG5cdFx0XHR0aGlzLnByZXZpZXdFbGVtZW50LnJlbW92ZUNoaWxkKHRoaXMubG9hZGluZ092ZXJsYXkoKSk7XHJcblx0XHRcdERPTS5yZW1vdmVDbGFzcyhpdGVtc0RpdiwgJ2xvYWRpbmcnKTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFJlbG9hZHMgdGhlIGl0ZW1zIGluIHRoZSBjYXJ0IHByZXZpZXcuXHJcblx0ICpcclxuXHQgKiBAcmV0dXJuIHZvaWRcclxuXHQgKi9cclxuXHRyZWxvYWRDYXJ0UHJldmlldygpXHJcblx0e1xyXG5cdFx0dGhpcy5wcmV2aWV3U3RhcnRMb2FkaW5nKCk7XHJcblx0XHRsZXQgaXRlbXMgPSB0aGlzLmdldENhcnRJdGVtcygpO1xyXG5cdFx0dGhpcy5hZGRUb1ByZXZpZXcoaXRlbXMpO1xyXG5cdFx0XHJcblx0XHRsZXQgaW5zdGFuY2UgPSB0aGlzO1xyXG5cclxuXHRcdHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XHJcblx0XHRcdGluc3RhbmNlLnByZXZpZXdTdG9wTG9hZGluZy5jYWxsKGluc3RhbmNlKTtcclxuXHRcdH0sIDEwMDApO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQmluZHMgZXZlbnQgbGlzdGVuZXJzIHRvIHRoZSBjYXJ0IGljb24uXHJcblx0ICpcclxuXHQgKiBAcmV0dXJuIHZvaWRcclxuXHQgKi9cclxuXHRiaW5kRXZlbnRMaXN0ZW5lcnMoKVxyXG5cdHtcclxuXHRcdGlmKHRoaXMuc3ZnSWNvbiA9PSBudWxsKSB7XHJcblx0XHRcdHJldHVybjtcclxuXHRcdH1cclxuXHJcblx0XHR0aGlzLnN2Z0ljb24ub25jbGljayA9IGZ1bmN0aW9uKGUpIHtcclxuXHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdFx0XHRsZXQgb3BlbmluZyA9IERPTS50b2dnbGVDbGFzcyh0aGlzLnByZXZpZXdFbGVtZW50LCAnb3BlbmVkJywgJ2Nsb3NlZCcpO1xyXG5cdFx0XHRcclxuXHRcdFx0aWYgKG9wZW5pbmcpIHtcclxuXHRcdFx0XHR0aGlzLnJlbG9hZENhcnRQcmV2aWV3KCk7XHRcclxuXHRcdFx0fVxyXG5cdFx0fS5iaW5kKHRoaXMpO1xyXG5cdFx0XHJcblx0XHRFdmVudE1hbmFnZXIkMi5zdWJzY3JpYmUoJ2NhcnQucHJvZHVjdHMuYWRkZWQnLCBmdW5jdGlvbihhdHRyaWJ1dGVzKSB7XHJcblx0XHRcdGxldCBjYXJ0ID0gQ29va2llLmdldCh0aGlzLnNldHRpbmdzLmNvb2tpZV9uYW1lKTtcclxuXHRcdFx0Y2FydC5pdGVtcy5wdXNoKGF0dHJpYnV0ZXMpO1xyXG5cdFx0XHRDb29raWUuc2V0KHRoaXMuc2V0dGluZ3MuY29va2llX25hbWUsIGNhcnQpO1xyXG5cdFx0XHR0aGlzLnJlbG9hZENhcnRQcmV2aWV3KCk7XHJcblx0XHR9LmJpbmQodGhpcykpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogUmV0cmlldmUgdGhlIGNhcnRzIGl0ZW1zIGZyb20gdGhlIGNvb2tpZS5cclxuXHQgKlxyXG5cdCAqIEByZXR1cm4gb2JqZWN0XHJcblx0ICovXHJcblx0Z2V0Q2FydEl0ZW1zKClcclxuXHR7XHJcblx0XHRsZXQgY2FydCA9IENvb2tpZS5nZXQodGhpcy5zZXR0aW5ncy5jb29raWVfbmFtZSk7XHJcblxyXG5cdFx0cmV0dXJuIChjYXJ0KSA/IGNhcnQuaXRlbXMgOiBbXTtcclxuXHR9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBDbG9zZXMgdGhlIGNhcnQgcHJldmlldyBlbGVtZW50LlxyXG4gKlxyXG4gKiBAcGFyYW0gZXZlbnQuY2xpY2tcclxuICovXHJcbmZ1bmN0aW9uIGNsb3NlKGV2ZW50KSB7XHJcblx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuXHRET00uc3dpdGNoQ2xhc3Nlcyh0aGlzLnByZXZpZXdFbGVtZW50LCAnb3BlbmVkJywgJ2Nsb3NlZCcpO1xyXG59XHJcblxyXG4vKipcclxuICogQ3JlYXRlcyB0aGUgY2FydCBzdmcgaWNvbi5cclxuICpcclxuICogQHJldHVybiBTVkdTVkdFbGVtZW50XHJcbiAqL1xyXG5mdW5jdGlvbiBjcmVhdGVJY29uKCkge1xyXG5cdGxldCBzdmcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50TlMoXCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiLCBcInN2Z1wiKTtcclxuXHRsZXQgZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnROUyhcImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIsIFwiZ1wiKTtcclxuXHRsZXQgcGF0aCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnROUyhcImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIsIFwicGF0aFwiKTtcclxuXHJcblx0c3ZnLnNldEF0dHJpYnV0ZSgndmVyc2lvbicsICcxLjEnKTtcclxuXHRzdmcuc2V0QXR0cmlidXRlKCd4bWxucycsICdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZycpO1xyXG5cdHN2Zy5zZXRBdHRyaWJ1dGUoJ3htbG5zOnhsaW5rJywgJ2h0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsnKTtcclxuXHRzdmcuc2V0QXR0cmlidXRlKCd4JywgJzBweCcpO1xyXG5cdHN2Zy5zZXRBdHRyaWJ1dGUoJ3knLCAnMHB4Jyk7XHJcblx0c3ZnLnNldEF0dHJpYnV0ZSgnd2lkdGgnLCAnNDQ2Ljg0M3B4Jyk7XHJcblx0c3ZnLnNldEF0dHJpYnV0ZSgnaGVpZ2h0JywgJzQ0Ni44NDNweCcpO1xyXG5cdHN2Zy5zZXRBdHRyaWJ1dGUoJ3ZpZXdCb3gnLCAnMCAwIDQ0Ni44NDMgNDQ2Ljg0MycpO1xyXG5cdHN2Zy5zZXRBdHRyaWJ1dGUoJ3N0eWxlJywgJ2VuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgNDQ2Ljg0MyA0NDYuODQzOycpO1xyXG5cdHN2Zy5zZXRBdHRyaWJ1dGUoJ3htbDpzcGFjZScsICdwcmVzZXJ2ZScpO1xyXG5cclxuXHRwYXRoLnNldEF0dHJpYnV0ZSgnZCcsICdNNDQ0LjA5LDkzLjEwM2MtMi42OTgtMy42OTktNy4wMDYtNS44ODgtMTEuNTg0LTUuODg4SDEwOS45MmMtMC42MjUsMC0xLjI0OSwwLjAzOC0xLjg1LDAuMTE5bC0xMy4yNzYtMzguMjdjLTEuMzc2LTMuOTU4LTQuNDA2LTcuMTEzLTguMy04LjY0NkwxOS41ODYsMTQuMTM0Yy03LjM3NC0yLjg4Ny0xNS42OTUsMC43MzUtMTguNTkxLDguMWMtMi44OTEsNy4zNjksMC43MywxNS42OTUsOC4xLDE4LjU5MWw2MC43NjgsMjMuODcybDc0LjM4MSwyMTQuMzk5Yy0zLjI4MywxLjE0NC02LjA2NSwzLjY2My03LjMzMiw3LjE4N2wtMjEuNTA2LDU5LjczOWMtMS4zMTgsMy42NjMtMC43NzUsNy43MzMsMS40NjgsMTAuOTE2YzIuMjQsMy4xODMsNS44ODMsNS4wNzgsOS43NzMsNS4wNzhoMTEuMDQ0Yy02Ljg0NCw3LjYxNi0xMS4wNDQsMTcuNjQ2LTExLjA0NCwyOC42NzVjMCwyMy43MTgsMTkuMjk4LDQzLjAxMiw0My4wMTIsNDMuMDEyczQzLjAxMi0xOS4yOTQsNDMuMDEyLTQzLjAxMmMwLTExLjAyOS00LjItMjEuMDU5LTExLjA0NC0yOC42NzVoOTMuNzc2Yy02Ljg0Nyw3LjYxNi0xMS4wNDgsMTcuNjQ2LTExLjA0OCwyOC42NzVjMCwyMy43MTgsMTkuMjk0LDQzLjAxMiw0My4wMTMsNDMuMDEyYzIzLjcxOCwwLDQzLjAxMi0xOS4yOTQsNDMuMDEyLTQzLjAxMmMwLTExLjAyOS00LjItMjEuMDU5LTExLjA0My0yOC42NzVoMTMuNDMzYzYuNTk5LDAsMTEuOTQ3LTUuMzQ5LDExLjk0Ny0xMS45NDhjMC02LjU5OS01LjM0OS0xMS45NDctMTEuOTQ3LTExLjk0N0gxNDMuNjQ3bDEzLjMxOS0zNi45OTZjMS43MiwwLjcyNCwzLjU3OCwxLjE1Miw1LjUyMywxLjE1MmgyMTAuMjc4YzYuMjM0LDAsMTEuNzUxLTQuMDI3LDEzLjY1LTkuOTU5bDU5LjczOS0xODYuMzg3QzQ0Ny41NTcsMTAxLjU2Nyw0NDYuNzg4LDk2LjgwMiw0NDQuMDksOTMuMTAzeiBNMTY5LjY1OSw0MDkuODA3Yy0xMC41NDMsMC0xOS4xMTYtOC41NzMtMTkuMTE2LTE5LjExNnM4LjU3My0xOS4xMTcsMTkuMTE2LTE5LjExN3MxOS4xMTYsOC41NzQsMTkuMTE2LDE5LjExN1MxODAuMjAyLDQwOS44MDcsMTY5LjY1OSw0MDkuODA3eiBNMzI3LjM2Nyw0MDkuODA3Yy0xMC41NDMsMC0xOS4xMTctOC41NzMtMTkuMTE3LTE5LjExNnM4LjU3NC0xOS4xMTcsMTkuMTE3LTE5LjExN2MxMC41NDIsMCwxOS4xMTYsOC41NzQsMTkuMTE2LDE5LjExN1MzMzcuOTA5LDQwOS44MDcsMzI3LjM2Nyw0MDkuODA3eiBNNDAyLjUyLDE0OC4xNDloLTczLjE2MVYxMTUuODloODMuNDk5TDQwMi41MiwxNDguMTQ5eiBNMzgxLjQ1MywyMTMuODYxaC01Mi4wOTR2LTM3LjAzOGg2My45NjdMMzgxLjQ1MywyMTMuODYxeiBNMjM0LjU3MSwyMTMuODYxdi0zNy4wMzhoNjYuMTEzdjM3LjAzOEgyMzQuNTcxeiBNMzAwLjY4NCwyNDIuNTM4djMxLjA2NGgtNjYuMTEzdi0zMS4wNjRIMzAwLjY4NHogTTEzOS4xMTUsMTc2LjgyM2g2Ni43ODR2MzcuMDM4aC01My45MzNMMTM5LjExNSwxNzYuODIzeiBNMjM0LjU3MSwxNDguMTQ5VjExNS44OWg2Ni4xMTN2MzIuMjU5SDIzNC41NzF6IE0yMDUuODk4LDExNS44OXYzMi4yNTloLTc2LjczNGwtMTEuMTkxLTMyLjI1OUgyMDUuODk4eiBNMTYxLjkxNiwyNDIuNTM4aDQzLjk4MnYzMS4wNjRoLTMzLjIwNkwxNjEuOTE2LDI0Mi41Mzh6IE0zMjkuMzU5LDI3My42MDN2LTMxLjA2NGg0Mi45MDlsLTkuOTU1LDMxLjA2NEgzMjkuMzU5eicpO1xyXG5cclxuXHRnLmFwcGVuZENoaWxkKHBhdGgpO1xyXG5cdHN2Zy5hcHBlbmRDaGlsZChnKTtcclxuXHJcblx0cmV0dXJuIHN2ZztcclxufVxuXG4vKipcclxuICogQGZpbGUgXHJcbiAqIEZpbHRlciBjbGFzcy5cclxuICpcclxuICogVGhlIEZpbHRlciBPYmplY3QsIGhhbmRsZXMgdGhlIGZpbHRlciBvZiB0aGUgcHJvZHVjdHMvc2VydmljZXMuXHJcbiAqL1xyXG5cclxuLyoqXHJcbiAqIFRoZSBkZWZhdWx0IHNldHRpbmdzIG9mIHRoZSBmaWx0ZXIuXHJcbiAqL1xyXG5sZXQgZGVmYXVsdFNldHRpbmdzJDMgPSB7XHJcblx0ZWxlbWVudDogJy5maWx0ZXInLFxyXG5cdGRhdGE6IHt9LFxyXG5cdGNsYXNzOiAnJyxcclxuXHR3aWR0aDogJycsXHJcblx0aGVpZ2h0OiAnJyxcclxufTtcclxuXHJcbi8qKlxyXG4gKiBTdG9yZXMgdGhlIGNvbnRhaW5lciBvYmplY3QuXHJcbiAqXHJcbiAqIEB2YXIgXFxDb3JlXFxDb250YWluZXJcclxuICovXHJcbmxldCBDb250YWluZXIkMztcclxuXHJcbmNsYXNzIEZpbHRlciBcclxue1xyXG5cdC8qKlxyXG5cdCAqIC0gSW5pdGlhbGl6ZSB0aGUgSW9DIGNvbnRhaW5lci5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSBcXENvcmVcXENvbnRhaW5lciB8IGNvbnRhaW5lclxyXG5cdCAqIEByZXR1cm4gdm9pZFxyXG5cdCAqL1xyXG5cdGNvbnN0cnVjdG9yKGNvbnRhaW5lcikgXHJcblx0e1xyXG5cdFx0Q29udGFpbmVyJDMgPSBjb250YWluZXI7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBTZXR1cCB0aGUgZmlsdGVyIGNsYXNzLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIG9iamVjdCB8IHNldHRpbmdzXHJcblx0ICogQHJldHVybiB2b2lkXHJcblx0ICovXHJcblx0c2V0dXAoc2V0dGluZ3MpXHJcblx0e1xyXG5cdFx0aWYodHlwZW9mIHNldHRpbmdzICE9ICdvYmplY3QnKSB7XHJcblx0XHRcdHRocm93IG5ldyBJbnZhbGlkQXJndW1lbnRFeGNlcHRpb24kMTtcclxuXHRcdH1cclxuXHJcblx0XHR0aGlzLnNldHRpbmdzID0gQ29tbW9uLmV4dGVuZChkZWZhdWx0U2V0dGluZ3MkMywgc2V0dGluZ3MpO1xyXG5cclxuXHRcdHRoaXMuc2V0RWxlbWVudCh0aGlzLnNldHRpbmdzLmVsZW1lbnQpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogU2V0cyB0aGUgZWxlbWVudCB0byBiZSBib3VuZCB0by5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSBzdHJpbmcgfCBzZWxlY3RvclxyXG5cdCAqIEByZXR1cm4gdm9pZFxyXG5cdCAqL1xyXG5cdHNldEVsZW1lbnQoc2VsZWN0b3IpXHJcblx0e1xyXG5cdFx0dGhpcy53cmFwcGVyID0gRE9NLmZpbmQoc2VsZWN0b3IpO1xyXG5cdFx0XHJcblx0XHRET00uYWRkQ2xhc3ModGhpcy53cmFwcGVyLCB0aGlzLnNldHRpbmdzLmNsYXNzKTtcclxuXHR9XHJcbn1cblxuLyoqXHJcbiAqIEBmaWxlIFxyXG4gKiBQcm9kdWN0cyBjbGFzcy5cclxuICpcclxuICogVGhlIFByb2R1Y3RzIGNvbXBvbmVudCwgaGFuZGxlcyB0aGUgcHJvZHVjdHMgdGFza3MuXHJcbiAqL1xyXG5cclxuXHJcbi8qKlxyXG4gKiBUaGUgZGVmYXVsdCBzZXR0aW5ncyBvZiBlYWNoIHByb2R1Y3QuXHJcbiAqXHJcbiAqIEB2YXIgb2JqZWN0XHJcbiAqL1xyXG5sZXQgZGVmYXVsdFNldHRpbmdzJDQgPSB7XHJcblx0ZWxlbWVudDogJy5wcm9kdWN0cycsXHJcblx0Y2xhc3M6ICcnLFxyXG5cdGl0ZW1fY2xhc3M6ICcnLFxyXG5cdGFkZF9idXR0b25fY2xhc3M6ICdidG4gYnRuLXByaW1hcnknLFxyXG5cdGZhdm9yaXRlX2J1dHRvbl9jbGFzczogJ2J0biBidG4tZGFuZ2VyJyxcclxuXHR3aWR0aDogJzIwMHB4JyxcclxuXHRoZWlnaHQ6ICcyNTBweCcsXHJcblx0YXR0cmlidXRlczogWyduYW1lJywgJ3ByaWNlJywgJ2RlbGl2ZXJ5VGltZScsICdpbWFnZSddLFxyXG5cdHVybDogJ3Byb2R1Y3RzLnBocCcsXHJcbn07XHJcblxyXG4vKipcclxuICogU3RvcmVzIHRoZSBjb250YWluZXIgb2JqZWN0LlxyXG4gKiBcclxuICogQHZhciBcXENvcmVcXENvbnRhaW5lclxyXG4gKi9cclxubGV0IENvbnRhaW5lciQ0O1xyXG5cclxuLyoqXHJcbiAqIFN0b3JlcyB0aGUgY29udGFpbmVyIG9iamVjdC5cclxuICogXHJcbiAqIEB2YXIgXFxDb3JlXFxFdmVudE1hbmFnZXJcclxuICovXHJcbmxldCBFdmVudE1hbmFnZXIkMztcclxuXHJcbi8qKlxyXG4gKiBTdG9yZXMgdGhlIHJlcXVlc3Qgb2JqZWN0LlxyXG4gKiBcclxuICogQHZhciBcXEhlbHBlclxcUmVxdWVzdCBcclxuICovXHJcbmxldCBIdHRwJDE7XHJcblxyXG5jbGFzcyBQcm9kdWN0cyBcclxue1xyXG5cdC8qKlxyXG5cdCAqIEluaXRhbGl6ZSB0aGUgQ29udGFpbmVyLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIFxcQ29yZVxcQ29udGFpbmVyIHwgY29udGFpbmVyXHJcblx0ICogQHBhcmFtIFxcSGVscGVyc1xcUmVxdWVzdCB8IGh0dHBcclxuXHQgKiBAcmV0dXJuIHZvaWRcclxuXHQgKi9cclxuXHRjb25zdHJ1Y3Rvcihjb250YWluZXIsIGh0dHAsIGV2ZW50TWFuYWdlcikgXHJcblx0e1xyXG5cdFx0Q29udGFpbmVyJDQgPSBjb250YWluZXI7XHJcblx0XHRIdHRwJDEgPSBodHRwO1xyXG5cdFx0RXZlbnRNYW5hZ2VyJDMgPSBldmVudE1hbmFnZXI7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBTZXRzIHRoZSBnaXZlbiBzZXR0aW5ncyBmcm9tIHRoZSB1c2VyLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIG9iamVjdCB8IHNldHRpbmdzXHJcblx0ICogQHJldHVybiB2b2lkXHJcblx0ICovXHJcblx0c2V0dXAoc2V0dGluZ3MpXHJcblx0e1xyXG5cdFx0ZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsIGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRcclxuXHRcdGlmICh0eXBlb2Ygc2V0dGluZ3MgIT0gJ29iamVjdCcpIHtcclxuXHRcdFx0dGhyb3cgbmV3IEludmFsaWRBcmd1bWVudEV4Y2VwdGlvbiQxO1xyXG5cdFx0fVxyXG5cclxuXHRcdHRoaXMuc2V0dGluZ3MgPSBDb21tb24uZXh0ZW5kKGRlZmF1bHRTZXR0aW5ncyQ0LCBzZXR0aW5ncyk7XHJcblxyXG5cdFx0dGhpcy5zZXRFbGVtZW50KHRoaXMuc2V0dGluZ3MuZWxlbWVudCk7XHJcblxyXG5cdFx0dGhpcy5hZGRTdHlsZVRhZygpO1x0XHJcblx0XHRcclxuXHRcdGlmIChDb250YWluZXIkNC5QYWdpbmF0aW9uICYmIENvbnRhaW5lciQ0LlBhZ2luYXRpb24uYm9vdGVkKSB7XHJcblx0XHRcdHRoaXMubG9hZFBhZ2VQcm9kdWN0cygpO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0dGhpcy5sb2FkQWxsUHJvZHVjdHMoKTtcclxuXHRcdH1cclxuXHJcblx0XHR9LmJpbmQodGhpcykpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogTG9hZHMgdGhlIHByb2R1Y3RzIGFuZCBcclxuXHQgKiByZXBsYWNlIHRoZW0gaW4gdGhlIGRpdiBjb250YWluZXIuXHJcblx0ICpcclxuXHQgKiBAcmV0dXJuIHZvaWRcclxuXHQgKi9cclxuXHRsb2FkUGFnZVByb2R1Y3RzKClcclxuXHR7XHJcblx0XHRsZXQgcmVxdWVzdCA9IHRoaXMuZ2V0UHJvZHVjdHMoMSk7XHJcblxyXG5cdFx0cmVxdWVzdC50aGVuKGZ1bmN0aW9uKHByb2R1Y3RzKSB7XHJcblx0XHRcdHRoaXMuY3VycmVudEl0ZW1zID0gcHJvZHVjdHM7XHJcblxyXG5cdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuY3VycmVudEl0ZW1zLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdFx0dmFyIHByb2R1Y3QgPSB0aGlzLmN1cnJlbnRJdGVtc1tpXTtcclxuXHRcdFx0XHRFdmVudE1hbmFnZXIkMy5wdWJsaXNoKCdwcm9kdWN0cy5sb2FkaW5nJywgcHJvZHVjdCk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdEV2ZW50TWFuYWdlciQzLnB1Ymxpc2goJ3Byb2R1Y3RzLmxvYWRlZCcsIHByb2R1Y3RzKTtcclxuXHRcdFx0dGhpcy5yZXBsYWNlSXRlbXMocHJvZHVjdHMpO1xyXG5cdFx0fS5iaW5kKHRoaXMpKS5jYXRjaChmdW5jdGlvbihlcnJvcikge1xyXG5cclxuXHRcdH0pO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogTG9hZHMgdGhlIHByb2R1Y3RzIGFuZCBcclxuXHQgKiByZXBsYWNlIHRoZW0gaW4gdGhlIGRpdiBjb250YWluZXIuXHJcblx0ICpcclxuXHQgKiBAcmV0dXJuIHZvaWRcclxuXHQgKi9cclxuXHRsb2FkQWxsUHJvZHVjdHMoKVxyXG5cdHtcclxuXHRcdGxldCByZXF1ZXN0ID0gdGhpcy5nZXRQcm9kdWN0cygpO1xyXG5cdFx0XHRcclxuXHRcdHJlcXVlc3QudGhlbihmdW5jdGlvbihwcm9kdWN0cykge1xyXG5cdFx0XHR0aGlzLmN1cnJlbnRJdGVtcyA9IHByb2R1Y3RzO1xyXG5cclxuXHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLmN1cnJlbnRJdGVtcy5sZW5ndGg7IGkrKykge1xyXG5cdFx0XHRcdHZhciBwcm9kdWN0ID0gdGhpcy5jdXJyZW50SXRlbXNbaV07XHJcblx0XHRcdFx0RXZlbnRNYW5hZ2VyJDMucHVibGlzaCgncHJvZHVjdHMubG9hZGluZycsIHByb2R1Y3QpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRFdmVudE1hbmFnZXIkMy5wdWJsaXNoKCdwcm9kdWN0cy5sb2FkZWQnLCBwcm9kdWN0cyk7XHJcblx0XHRcdHRoaXMucmVwbGFjZUl0ZW1zKHByb2R1Y3RzKTtcclxuXHRcdH0uYmluZCh0aGlzKSkuY2F0Y2goZnVuY3Rpb24oZXJyb3IpIHtcclxuXHJcblx0XHR9KTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFNldHMgdGhlIERPTSBlbGVtZW50IFxyXG5cdCAqIGZvciBwb3B1bGF0aW5nIHRoZSBwcm9kdWN0cy5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSBzdHJpbmcgfCBzZWxlY3RvclxyXG5cdCAqIEByZXR1cm4gdm9pZFxyXG5cdCAqL1xyXG5cdHNldEVsZW1lbnQoc2VsZWN0b3IpXHJcblx0e1xyXG5cdFx0dGhpcy53cmFwcGVyID0gRE9NLmZpbmQoc2VsZWN0b3IpO1xyXG5cclxuXHRcdGlmICh0aGlzLndyYXBwZXIpIHtcclxuXHRcdFx0RE9NLmFkZENsYXNzKHRoaXMud3JhcHBlciwgdGhpcy5zZXR0aW5ncy5jbGFzcyk7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBSZXBsYWNlIGl0ZW1zIGluIFxyXG5cdCAqIHRoZSBwcm9kdWN0cyBjb250YWluZXIuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gYXJyYXkgfCBpdGVtc1xyXG5cdCAqIEByZXR1cm4gYXJyYXlcclxuXHQgKi9cclxuXHRyZXBsYWNlSXRlbXMoaXRlbXMpIFxyXG5cdHtcclxuXHRcdGlmICghIEFycmF5LmlzQXJyYXkoaXRlbXMpIHx8IChpdGVtcy5sZW5ndGggPD0gMCAmJiB0eXBlb2YgaXRlbXNbMF0gPT0gJ3N0cmluZycpKSB7XHJcblx0XHRcdHRocm93IG5ldyBJbnZhbGlkQXJndW1lbnRFeGNlcHRpb24kMTtcclxuXHRcdH1cclxuXHJcblx0XHRsZXQgcHJvZHVjdHMgPSB0aGlzLmJ1aWxkUHJvZHVjdHMoaXRlbXMsIHRoaXMuc2V0dGluZ3MuaXRlbV9jbGFzcywgJ2RpdicpO1xyXG5cclxuXHRcdHRoaXMud3JhcHBlci5pbm5lckhUTUwgPSAnJztcclxuXHRcdHByb2R1Y3RzLmZvckVhY2goZnVuY3Rpb24ocHJvZHVjdCkge1xyXG5cdFx0XHR0aGlzLndyYXBwZXIuYXBwZW5kQ2hpbGQocHJvZHVjdCk7XHJcblx0XHR9LmJpbmQodGhpcykpO1xyXG5cclxuXHRcdHJldHVybiBpdGVtcztcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIE1ha2VzIGFuIEFqYXggY2FsbCB0byB0aGUgXHJcblx0ICogc2VydmVyIHdpdGhvdXQgcGFyYW1ldGVycy5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSBudW1iZXIgfCBwYWdlTnVtYmVyXHJcblx0ICogQHJldHVybiBQcm9taXNlXHJcblx0ICovXHJcblx0Z2V0UHJvZHVjdHMocGFnZU51bWJlciA9IDEpXHJcblx0e1xyXG5cdFx0bGV0IGFjdGlvbiA9IChwYWdlTnVtYmVyKSA/IHRoaXMuc2V0dGluZ3MudXJsICsgJz9wYWdlPScgKyBwYWdlTnVtYmVyIDogdGhpcy5zZXR0aW5ncy51cmw7XHJcblxyXG5cdFx0cmV0dXJuIEh0dHAkMS5nZXQoe1xyXG5cdFx0XHR1cmw6IGFjdGlvbixcclxuXHRcdH0pO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQnVpbGRzIHRoZSBodG1sIGZvciB0aGUgcHJvZHVjdHMuXHJcblx0ICogXHJcblx0ICogQHBhcmFtIGFycmF5IHwgYXR0cmlidXRlc0NvbGxlY3Rpb25cclxuXHQgKiBAcGFyYW0gc3RyaW5nIHwgY2xhc3NOYW1lXHJcblx0ICogQHBhcmFtIHN0cmluZyB8IHRhZ1R5cGVcclxuXHQgKiBAcmV0dXJuIGFycmF5XHJcblx0ICovXHJcblx0YnVpbGRQcm9kdWN0cyhhdHRyaWJ1dGVzQ29sbGVjdGlvbiwgY2xhc3NOYW1lLCB0YWdUeXBlKSBcclxuXHR7XHJcblx0XHRpZihhdHRyaWJ1dGVzQ29sbGVjdGlvbi5jb25zdHJ1Y3Rvci5uYW1lICE9ICdBcnJheScgKSB7XHJcblx0XHRcdHRocm93IG5ldyBJbnZhbGlkQXJndW1lbnRFeGNlcHRpb24kMTtcclxuXHRcdH1cclxuXHJcblx0XHRsZXQgYnVpbHRQcm9kdWN0cyA9IFtdO1xyXG5cclxuXHRcdGF0dHJpYnV0ZXNDb2xsZWN0aW9uLmZvckVhY2goZnVuY3Rpb24oYXR0cmlidXRlcykge1xyXG5cdFx0XHRsZXQgYnVpbHRQcm9kdWN0ID0gdGhpcy5idWlsZFByb2R1Y3QoYXR0cmlidXRlcywgY2xhc3NOYW1lLCB0YWdUeXBlKTtcclxuXHRcdFx0YnVpbHRQcm9kdWN0cy5wdXNoKGJ1aWx0UHJvZHVjdCk7XHJcblx0XHR9LmJpbmQodGhpcykpO1xyXG5cclxuXHRcdHJldHVybiBidWlsdFByb2R1Y3RzO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQnVpbGRzIHRoZSBodG1sIGZvciBhIHNpbmdsZSBwcm9kdWN0LlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIG9iamVjdCB8IGF0dHJpYnV0ZXNcclxuXHQgKiBAcGFyYW0gc3RyaW5nIHwgY2xhc3NOYW1lXHJcblx0ICogQHBhcmFtIHN0cmluZyB8IHRhZ1R5cGVcclxuXHQgKiBAcmV0dXJuIG9iamVjdFxyXG5cdCAqL1xyXG5cdGJ1aWxkUHJvZHVjdChhdHRyaWJ1dGVzLCBjbGFzc05hbWUsIHRhZ1R5cGUpIFxyXG5cdHtcclxuXHRcdGlmICh0eXBlb2YgYXR0cmlidXRlcyAhPSAnb2JqZWN0JyB8fCB0eXBlb2YgdGFnVHlwZSAhPSAnc3RyaW5nJykge1xyXG5cdFx0XHR0aHJvdyBuZXcgSW52YWxpZEFyZ3VtZW50RXhjZXB0aW9uJDE7XHJcblx0XHR9XHJcblxyXG5cdFx0Y2xhc3NOYW1lID0gY2xhc3NOYW1lIHx8IG51bGw7XHJcblxyXG5cdFx0bGV0IHByb2R1Y3QgPSBET00uY3JlYXRlRWxlbWVudCgnZGl2Jywge1xyXG5cdFx0XHRjbGFzczogJ3Byb2R1Y3QnXHJcblx0XHR9KTtcclxuXHJcblx0XHRET00uYWRkQ2xhc3MocHJvZHVjdCwgY2xhc3NOYW1lKTtcclxuXHJcblx0XHRsZXQgb3ZlcmxheSA9IERPTS5jcmVhdGVFbGVtZW50KCdkaXYnLCB7XHJcblx0XHRcdGNsYXNzOiAncHJvZHVjdC1vdmVybGF5JyxcclxuXHRcdH0pO1xyXG5cclxuXHRcdHByb2R1Y3QuYXBwZW5kQ2hpbGQob3ZlcmxheSk7XHJcblxyXG5cdFx0Zm9yICh2YXIgYXR0cmlidXRlIGluIGF0dHJpYnV0ZXMpIHtcclxuXHRcdFx0aWYgKCEgQ29tbW9uLmluX2FycmF5KGF0dHJpYnV0ZSwgdGhpcy5zZXR0aW5ncy5hdHRyaWJ1dGVzKSkge1xyXG5cdFx0XHRcdGNvbnRpbnVlO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRsZXQgdGFnID0gRE9NLmNyZWF0ZUVsZW1lbnQodGFnVHlwZSk7XHJcblxyXG5cdFx0XHRpZiAoYXR0cmlidXRlID09ICdpbWFnZScpIHtcclxuXHRcdFx0XHRsZXQgaW1hZ2UgPSBET00uY3JlYXRlRWxlbWVudCgnaW1nJywge1xyXG5cdFx0XHRcdFx0c3JjOiBhdHRyaWJ1dGVzW2F0dHJpYnV0ZV1cclxuXHRcdFx0XHR9KTtcclxuXHRcdFx0XHRwcm9kdWN0LmFwcGVuZENoaWxkKGltYWdlKTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHR0YWcuaW5uZXJIVE1MID0gYXR0cmlidXRlc1thdHRyaWJ1dGVdIHx8ICcnO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRET00uYWRkQ2xhc3ModGFnLCAncHJvZHVjdC0nICsgU3RyLmtlYmFiQ2FzZShhdHRyaWJ1dGUpKTtcclxuXHRcdFx0b3ZlcmxheS5hcHBlbmRDaGlsZCh0YWcpO1xyXG5cdFx0fVxyXG5cclxuXHRcdGxldCB0YWcgPSBET00uY3JlYXRlRWxlbWVudCgnZGl2Jywge1xyXG5cdFx0XHRpZDogJ2FjdGlvbkJ1dHRvbnMnLFxyXG5cdFx0XHRjbGFzczogJ2FjdGlvbi1idXR0b25zJ1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0bGV0IGFkZFRvQ2FydCA9IERPTS5jcmVhdGVFbGVtZW50KCdidXR0b24nLCB7XHJcblx0XHRcdGlkOiAnYWRkVG9DYXJ0JyxcclxuXHRcdFx0Y2xhc3M6IHRoaXMuc2V0dGluZ3MuYWRkX2J1dHRvbl9jbGFzcyxcclxuXHRcdFx0dHlwZTogJ2J1dHRvbicsXHJcblx0XHRcdHRleHQ6ICcrJyxcclxuXHRcdH0pO1xyXG5cclxuXHRcdGxldCBmYXZvcml0ZSA9IERPTS5jcmVhdGVFbGVtZW50KCdidXR0b24nLCB7XHJcblx0XHRcdGlkOiAnZmF2b3JpdGUnLFxyXG5cdFx0XHRjbGFzczogdGhpcy5zZXR0aW5ncy5mYXZvcml0ZV9idXR0b25fY2xhc3MsXHJcblx0XHRcdHR5cGU6ICdidXR0b24nLFxyXG5cdFx0XHR0ZXh0OiAnJmhlYXJ0czsnXHJcblx0XHR9KTtcclxuXHJcblx0XHR0YWcuYXBwZW5kQ2hpbGQoYWRkVG9DYXJ0KTtcclxuXHRcdHRhZy5hcHBlbmRDaGlsZChmYXZvcml0ZSk7XHJcblxyXG5cdFx0YWRkVG9DYXJ0LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xyXG5cdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XHJcblx0XHRcdEV2ZW50TWFuYWdlciQzLnB1Ymxpc2goJ2NhcnQucHJvZHVjdHMuYWRkZWQnLCBhdHRyaWJ1dGVzKTtcclxuXHRcdH0pO1xyXG5cclxuXHRcdG92ZXJsYXkuYXBwZW5kQ2hpbGQodGFnKTtcclxuXHJcblx0XHRyZXR1cm4gcHJvZHVjdDtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEFkZCB0aGUgZUNvbW1lcmNlIHN0eWxlIHRhZ3MgdG8gdGhlIERPTS5cclxuXHQgKi9cclxuXHRhZGRTdHlsZVRhZygpIFxyXG5cdHtcclxuXHRcdGlmKERPTS5maW5kKCcjZUNvbW1lcmNlLVByb2R1Y3RzJykpIHtcclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0fVxyXG5cclxuXHRcdGxldCBjc3MgPSBgXHJcblx0XHRcdC5wcm9kdWN0IHtcclxuXHRcdFx0XHRwb3NpdGlvbjogcmVsYXRpdmU7XHJcblx0XHRcdFx0bWFyZ2luOiA1cHggNXB4O1xyXG5cdFx0XHRcdGJvcmRlcjogMXB4IHNvbGlkICNlNGU0ZTQ7XHJcblx0XHRcdFx0d2lkdGg6ICR7dGhpcy5zZXR0aW5ncy53aWR0aH07XHJcblx0XHRcdFx0aGVpZ2h0OiAke3RoaXMuc2V0dGluZ3MuaGVpZ2h0fTtcclxuXHRcdFx0XHRjdXJzb3I6IHBvaW50ZXI7XHJcblx0XHRcdFx0Y29sb3I6ICNmZmZmZmY7XHJcblx0XHRcdFx0b3ZlcmZsb3c6IGhpZGRlbjtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0LnByb2R1Y3QgPiAucHJvZHVjdC1vdmVybGF5IHtcclxuXHRcdFx0XHRwb3NpdGlvbjogYWJzb2x1dGU7XHJcblx0XHRcdFx0dG9wOiAwO1xyXG5cdFx0XHRcdGxlZnQ6IDA7XHJcblx0XHRcdFx0d2lkdGg6IDEwMCU7XHJcblx0XHRcdFx0aGVpZ2h0OiAxMDAlO1xyXG5cdFx0XHRcdG9wYWNpdHk6IDAuNTtcclxuXHRcdFx0XHR6LWluZGV4OiA1O1xyXG5cdFx0XHRcdHRyYW5zaXRpb246IDFzIGFsbDtcclxuXHRcdFx0XHR0cmFuc2Zvcm06IHRyYW5zbGF0ZVgoLTI1MHB4KTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0LnByb2R1Y3Q6aG92ZXIgPiAucHJvZHVjdC1vdmVybGF5IHtcclxuXHRcdFx0XHRiYWNrZ3JvdW5kOiByZ2JhKDAsIDAsIDAsIDAuNDUpO1xyXG5cdFx0XHRcdHRyYW5zZm9ybTogdHJhbnNsYXRlWCgwcHgpO1xyXG5cdFx0XHRcdG9wYWNpdHk6IDE7XHJcblx0XHRcdFx0dHJhbnNpdGlvbjogMXMgYWxsO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHQucHJvZHVjdCA+IGltZyB7XHJcblx0XHRcdFx0cG9zaXRpb246IGFic29sdXRlO1xyXG5cdFx0XHRcdGxlZnQ6IDA7XHJcblx0XHRcdFx0dG9wOiAwO1xyXG5cdFx0XHRcdHdpZHRoOiAxMDAlO1xyXG5cdFx0XHRcdGhlaWdodDogMTAwJTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0LnByb2R1Y3QgPiAucHJvZHVjdC1pbWFnZSB7XHJcblx0XHRcdFx0ei1pbmRleDogMDtcclxuXHRcdFx0XHRwb3NpdGlvbjogYWJzb2x1dGU7XHJcblx0XHRcdFx0dG9wOiAwO1xyXG5cdFx0XHRcdGxlZnQ6IDA7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdC5wcm9kdWN0ID4gLnByb2R1Y3Qtb3ZlcmxheSA+IC5wcm9kdWN0LW5hbWUsIFxyXG5cdFx0XHQucHJvZHVjdCA+IC5wcm9kdWN0LW92ZXJsYXkgPiAucHJvZHVjdC1wcmljZSxcclxuXHRcdFx0LnByb2R1Y3QgPiAucHJvZHVjdC1vdmVybGF5ID4gLnByb2R1Y3QtZGVsaXZlcnktdGltZSB7XHJcblx0XHRcdFx0ei1pbmRleDogMTtcclxuXHRcdFx0XHRwb3NpdGlvbjogcmVsYXRpdmU7XHJcblx0XHRcdFx0dGV4dC1hbGlnbjogY2VudGVyO1xyXG5cdFx0XHRcdG1hcmdpbi10b3A6IDI1cHg7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdC5wcm9kdWN0ID4gLnByb2R1Y3Qtb3ZlcmxheSA+IC5hY3Rpb24tYnV0dG9ucyB7XHJcblx0XHRcdFx0d2lkdGg6IDEwMCU7XHJcblx0XHRcdFx0bWFyZ2luLXRvcDogMTBweDtcclxuXHRcdFx0XHR0ZXh0LWFsaWduOiBjZW50ZXI7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdC5wcm9kdWN0ID4gLnByb2R1Y3Qtb3ZlcmxheSA+IC5hY3Rpb24tYnV0dG9ucyA+ICNmYXZvcml0ZSB7XHJcblx0XHRcdFx0bWFyZ2luLWxlZnQ6IDEwcHg7XHJcblx0XHRcdH1cclxuXHJcblx0XHRgO1xyXG5cdCAgICBcclxuXHQgICAgRE9NLmFkZFN0eWxlKCdlQ29tbWVyY2UtUHJvZHVjdHMnLCBjc3MpO1xyXG5cdH1cclxufVxuXG4vKipcclxuICogVGhlIFNlcnZpY2VzIE9iamVjdCwgaGFuZGxlcyB0aGUgc2VydmljZXMuXHJcbiAqL1xyXG5jbGFzcyBTZXJ2aWNlcyBcclxue1xyXG5cclxufVxuXG4vKipcclxuICogQGZpbGUgXHJcbiAqIFBhZ2luYXRpb24gY2xhc3MuXHJcbiAqXHJcbiAqIFRoZSBQYWdpbmF0aW9uIGNvbXBvbmVudCwgaGFuZGxlcyB0aGUgcGFnaW5hdGlvbi5cclxuICovXHJcblxyXG4vKipcclxuICogVGhlIGRlZmF1bHQgc2V0dGluZ3Mgb2YgdGhlIHBhZ2luYXRpb24uXHJcbiAqXHJcbiAqIEB2YXIgb2JqZWN0XHJcbiAqL1xyXG5sZXQgZGVmYXVsdFNldHRpbmdzJDUgPSB7XHJcblx0ZWxlbWVudDogJy5wYWdpbmF0aW9uLWxpbmtzJyxcclxuXHRjbGFzczogJycsXHJcblx0cGVyX3BhZ2U6IDUsXHJcblx0dG90YWxfaXRlbXM6IDEwLFxyXG59O1xyXG5cclxuLyoqXHJcbiAqIFN0b3JlcyB0aGUgY29udGFpbmVyIG9iamVjdC5cclxuICpcclxuICogQHZhciBcXENvcmVcXENvbnRhaW5lclxyXG4gKi9cclxubGV0IENvbnRhaW5lciQ1O1xyXG5cclxuLyoqXHJcbiAqIFN0b3JlcyB0aGUgcHJvZHVjdHMgY29tcG9uZW50LlxyXG4gKlxyXG4gKiBAdmFyIFxcQ29tcG9uZW50c1xcUHJvZHVjdHNcclxuICovXHJcbmxldCBQcm9kdWN0cyQyO1xyXG5cclxuY2xhc3MgUGFnaW5hdGlvbiBcclxue1xyXG5cdC8qKlxyXG5cdCAqIC0gSW5pdGlhbGl6ZSB0aGUgY29udGFpbmVyIG9iamVjdC5cclxuXHQgKiAtIEluaXRpYWxpemUgdGhlIHByb2R1Y3RzIGNvbXBvbmVudC5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSBcXENvcmVcXENvbnRhaW5lciB8IGNvbnRhaW5lclxyXG5cdCAqIEBwYXJhbSBcXENvbXBvbmVudHNcXFByb2R1Y3RzIHwgcHJvZHVjdHNcclxuXHQgKiBAcmV0dXJuIHZvaWRcclxuXHQgKi9cclxuXHRjb25zdHJ1Y3Rvcihjb250YWluZXIsIHByb2R1Y3RzKSBcclxuXHR7XHJcblx0XHR0aGlzLnNldEN1cnJlbnQoMSk7XHJcblx0XHRDb250YWluZXIkNSA9IGNvbnRhaW5lcjtcclxuXHRcdFByb2R1Y3RzJDIgPSBwcm9kdWN0cztcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFNldHVwIHRoZSBwYWdpbmF0aW9uLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIG9iamVjdCB8IHNldHRpbmdzXHJcblx0ICogQHJldHVybiB2b2lkXHJcblx0ICovXHJcblx0c2V0dXAoc2V0dGluZ3MpXHJcblx0e1xyXG5cdFx0ZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsIGZ1bmN0aW9uKCkge1xyXG5cclxuXHRcdGlmKHR5cGVvZiBzZXR0aW5ncyAhPSAnb2JqZWN0Jykge1xyXG5cdFx0XHR0aHJvdyBuZXcgSW52YWxpZEFyZ3VtZW50RXhjZXB0aW9uJDE7XHJcblx0XHR9XHJcblxyXG5cdFx0dGhpcy5zZXR0aW5ncyA9IENvbW1vbi5leHRlbmQoZGVmYXVsdFNldHRpbmdzJDUsIHNldHRpbmdzKTtcclxuXHJcblx0XHR0aGlzLnRvdGFsUGFnZXMgPSB0aGlzLmNhbGN1bGF0ZVRvdGFsUGFnZXModGhpcy5zZXR0aW5ncy5wZXJfcGFnZSwgdGhpcy5zZXR0aW5ncy50b3RhbF9pdGVtcyk7XHJcblx0XHRcclxuXHRcdHRoaXMuc2V0RWxlbWVudCh0aGlzLnNldHRpbmdzLmVsZW1lbnQpO1xyXG5cdFx0dGhpcy5yZXBsYWNlTGlua3ModGhpcy5saW5rcyk7XHJcblxyXG5cdFx0fS5iaW5kKHRoaXMpKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFNldHMgdGhlIHdyYXBwZXIgZWxlbWVudC5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSBzdHJpbmcgfCBzZWxlY3RvclxyXG5cdCAqIEByZXR1cm4gdm9pZFxyXG5cdCAqL1xyXG5cdHNldEVsZW1lbnQoc2VsZWN0b3IpXHJcblx0e1xyXG5cdFx0dGhpcy53cmFwcGVyID0gRE9NLmZpbmQoc2VsZWN0b3IpO1xyXG5cdFx0XHJcblx0XHRET00uYWRkQ2xhc3ModGhpcy53cmFwcGVyLCB0aGlzLnNldHRpbmdzLmNsYXNzKTtcclxuXHJcblx0XHR0aGlzLmxpbmtzID0gdGhpcy5jcmVhdGVMaW5rcygpO1xyXG5cdFx0dGhpcy5iaW5kRXZlbnRMaXN0ZW5lcnModGhpcy5saW5rcyk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBSZXBsYWNlcyB0aGUgbGlua3MgaW4gdGhlIHdyYXBwZXIuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gSFRNTFVMaXN0RWxlbWVudCB8IGxpbmtzXHJcblx0ICogQHJldHVybiB2b2lkXHJcblx0ICovXHJcblx0cmVwbGFjZUxpbmtzKGxpbmtzKVxyXG5cdHtcclxuXHRcdHRoaXMud3JhcHBlci5pbm5lckhUTUwgPSAnJztcclxuXHRcdHRoaXMud3JhcHBlci5hcHBlbmRDaGlsZChsaW5rcyk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBDYWxjdWxhdGVzIHRoZSB0b3RhbCBwYWdlcy5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSBudW1iZXIgfCBwZXJQYWdlXHJcblx0ICogQHBhcmFtIG51bWJlciB8IHRvdGFsSXRlbXNcclxuXHQgKiBAcmV0dXJuIG51bWJlclxyXG5cdCAqL1xyXG5cdGNhbGN1bGF0ZVRvdGFsUGFnZXMocGVyUGFnZSwgdG90YWxJdGVtcylcclxuXHR7XHJcblx0XHRwZXJQYWdlID0gcGFyc2VJbnQocGVyUGFnZSk7XHJcblx0XHR0b3RhbEl0ZW1zID0gcGFyc2VJbnQodG90YWxJdGVtcyk7XHJcblxyXG5cdFx0cmV0dXJuIE1hdGguY2VpbCh0b3RhbEl0ZW1zIC8gcGVyUGFnZSk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBCaW5kcyB0aGUgYnV0dG9ucyBldmVudHMgbGlzdGVuZXJzLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIEhUTUxVTGlzdEVsZW1lbnQgfCBsaW5rc1xyXG5cdCAqIEByZXR1cm4gdm9pZFxyXG5cdCAqL1xyXG5cdGJpbmRFdmVudExpc3RlbmVycyhsaW5rcykgXHJcblx0e1xyXG5cdFx0bGV0IGluc3RhbmNlID0gdGhpcztcclxuXHJcblx0XHR0aGlzLm5leHQuY2hpbGROb2Rlc1swXS5vbmNsaWNrID0gZnVuY3Rpb24oZSkge1xyXG5cdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG5cdFx0XHRsZXQgcmVxdWVzdGVkUGFnZSA9IGluc3RhbmNlLmN1cnJlbnQrMTtcclxuXHJcblx0XHRcdGlmIChpbnN0YW5jZS5ub3RJblBhZ2VSYW5nZShyZXF1ZXN0ZWRQYWdlKSkge1xyXG5cdFx0XHRcdHRocm93IG5ldyBOb3RJblBhZ2VSYW5nZUV4Y2VwdGlvbjtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0UHJvZHVjdHMkMi5nZXRQcm9kdWN0cyhyZXF1ZXN0ZWRQYWdlKS50aGVuKGZ1bmN0aW9uKHByb2R1Y3RzKSB7XHJcblx0XHRcdFx0UHJvZHVjdHMkMi5yZXBsYWNlSXRlbXMocHJvZHVjdHMpO1xyXG5cdFx0XHR9KTtcclxuXHJcblx0XHRcdGluc3RhbmNlLnNldEN1cnJlbnQocmVxdWVzdGVkUGFnZSk7XHJcblx0XHR9O1xyXG5cclxuXHRcdHRoaXMucHJldmlvdXMuY2hpbGROb2Rlc1swXS5vbmNsaWNrID0gZnVuY3Rpb24oZSkge1xyXG5cdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG5cdFx0XHRsZXQgcmVxdWVzdGVkUGFnZSA9IGluc3RhbmNlLmN1cnJlbnQtMTtcclxuXHJcblx0XHRcdGlmKGluc3RhbmNlLm5vdEluUGFnZVJhbmdlKHJlcXVlc3RlZFBhZ2UpKSB7XHJcblx0XHRcdFx0dGhyb3cgbmV3IE5vdEluUGFnZVJhbmdlRXhjZXB0aW9uO1xyXG5cdFx0XHR9XHJcblx0XHRcdFxyXG5cdFx0XHRQcm9kdWN0cyQyLmdldFByb2R1Y3RzKHJlcXVlc3RlZFBhZ2UpLnRoZW4oZnVuY3Rpb24ocHJvZHVjdHMpIHtcclxuXHRcdFx0XHRQcm9kdWN0cyQyLnJlcGxhY2VJdGVtcyhwcm9kdWN0cyk7XHJcblx0XHRcdH0pO1xyXG5cclxuXHRcdFx0aW5zdGFuY2Uuc2V0Q3VycmVudChyZXF1ZXN0ZWRQYWdlKTtcclxuXHRcdH07XHJcblxyXG5cdFx0Zm9yKHZhciBpID0gMDsgaSA8IHRoaXMucGFnZXMubGVuZ3RoOyBpKyspIHtcclxuXHRcdFx0dGhpcy5wYWdlc1tpXS5jaGlsZE5vZGVzWzBdLm9uY2xpY2sgPSBmdW5jdGlvbihlKSB7XHJcblx0XHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdFx0XHRcdFxyXG5cdFx0XHRcdGxldCByZXF1ZXN0ZWRQYWdlID0gdGhpcy5nZXRBdHRyaWJ1dGUoJ2RhdGEtcGFnZS1ucicpO1xyXG5cdFx0XHRcdFxyXG5cdFx0XHRcdFByb2R1Y3RzJDIuZ2V0UHJvZHVjdHMocmVxdWVzdGVkUGFnZSkudGhlbihmdW5jdGlvbihwcm9kdWN0cykge1xyXG5cdFx0XHRcdFx0UHJvZHVjdHMkMi5yZXBsYWNlSXRlbXMocHJvZHVjdHMpO1xyXG5cdFx0XHRcdH0pO1xyXG5cdFx0XHRcdFxyXG5cdFx0XHRcdGluc3RhbmNlLnNldEN1cnJlbnQocmVxdWVzdGVkUGFnZSk7XHJcblx0XHRcdH07XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBTZXRzIHRoZSBjdXJyZW50IHBhZ2UuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gbnVtYmVyIHwgcGFnZU51bWJlclxyXG5cdCAqIEByZXR1cm4gdm9pZFxyXG5cdCAqL1xyXG5cdHNldEN1cnJlbnQocGFnZU51bWJlcikgXHJcblx0e1xyXG5cdFx0dGhpcy5jdXJyZW50ID0gcGFyc2VJbnQocGFnZU51bWJlcik7XHJcblx0XHR0aGlzLmNoYW5nZVVybChwYWdlTnVtYmVyKTtcclxuXHRcdHRoaXMuc2V0QWN0aXZlTGluayhwYWdlTnVtYmVyKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEdldHMgdGhlIGN1cnJlbnQgcGFnZS5cclxuXHQgKlxyXG5cdCAqIEByZXR1cm4gbnVtYmVyXHJcblx0ICovXHJcblx0Z2V0Q3VycmVudCgpIFxyXG5cdHtcclxuXHRcdHJldHVybiB0aGlzLmN1cnJlbnQ7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBDcmVhdGVzIHRoZSBwYWdpbmF0aW9uIGxpbmtzLlxyXG5cdCAqXHJcblx0ICogQHJldHVybiBIVE1MVUxpc3RFbGVtZW50XHJcblx0ICovXHJcblx0Y3JlYXRlTGlua3MoKSBcclxuXHR7XHJcblx0XHRsZXQgdWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd1bCcpO1xyXG5cdFx0XHJcblx0XHR0aGlzLnBhZ2VzID0gdGhpcy5jcmVhdGVQYWdlTGlua3MoKTtcclxuXHRcdHRoaXMucHJldmlvdXMgPSB0aGlzLmNyZWF0ZVByZXZpb3VzQnV0dG9uKCk7XHJcblx0XHR0aGlzLm5leHQgPSB0aGlzLmNyZWF0ZU5leHRCdXR0b24oKTtcclxuXHJcblx0XHR1bC5jbGFzc05hbWUgPSAncGFnaW5hdGlvbic7XHJcblx0XHR1bC5hcHBlbmRDaGlsZCh0aGlzLnByZXZpb3VzKTtcclxuXHJcblx0XHR0aGlzLnBhZ2VzLmZvckVhY2goZnVuY3Rpb24ocGFnZSkge1xyXG5cdFx0XHR1bC5hcHBlbmRDaGlsZChwYWdlKTtcclxuXHRcdH0pO1xyXG5cclxuXHRcdHVsLmFwcGVuZENoaWxkKHRoaXMubmV4dCk7XHJcblxyXG5cdFx0cmV0dXJuIHVsO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQ3JlYXRlcyB0aGUgcGFnZXMgaXRlbSBsaW5rcy5cclxuXHQgKlxyXG5cdCAqIEByZXR1cm4gYXJyYXk8SFRNTExJRWxlbWVudD5cclxuXHQgKi9cclxuXHRjcmVhdGVQYWdlTGlua3MoKSBcclxuXHR7XHJcblx0XHR2YXIgcGFnZXMgPSBbXTtcclxuXHJcblx0XHRmb3IodmFyIGkgPSAxOyBpIDw9IHRoaXMudG90YWxQYWdlczsgaSsrKSB7XHJcblx0XHRcdHZhciBwYWdlSXRlbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJyk7XHJcblx0XHRcdHZhciBsaW5rID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpO1xyXG5cdFx0XHRwYWdlSXRlbS5jbGFzc05hbWUgPSAodGhpcy5jdXJyZW50ID09IGkpID8gJ3BhZ2UtaXRlbSBhY3RpdmUnIDogJ3BhZ2UtaXRlbSc7XHJcblx0XHRcdGxpbmsuY2xhc3NOYW1lID0gJ3BhZ2UtbGluayc7XHJcblx0XHRcdGxpbmsuc2V0QXR0cmlidXRlKCdocmVmJywgJz9wYWdlPScrIGkpO1xyXG5cdFx0XHRsaW5rLnNldEF0dHJpYnV0ZSgnZGF0YS1wYWdlLW5yJywgaSk7XHJcblx0XHRcdGxpbmsuaW5uZXJIVE1MID0gaTtcclxuXHRcdFx0cGFnZUl0ZW0uYXBwZW5kQ2hpbGQobGluayk7XHJcblx0XHRcdHBhZ2VzLnB1c2gocGFnZUl0ZW0pO1xyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiBwYWdlcztcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIENyZWF0ZXMgdGhlIHByZXZpb3VzIGJ1dHRvbiBsaW5rLlxyXG5cdCAqXHJcblx0ICogQHJldHVybiBIVE1MTElFbGVtZW50XHJcblx0ICovXHJcblx0Y3JlYXRlUHJldmlvdXNCdXR0b24oKSBcclxuXHR7XHJcblx0XHR2YXIgbGkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaScpO1xyXG5cdFx0dmFyIGxpbmsgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJyk7XHJcblx0XHR2YXIgc3BhbjEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XHJcblx0XHR2YXIgc3BhbjIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XHJcblx0XHRcclxuXHRcdFxyXG5cdFx0bGkuY2xhc3NOYW1lID0gJ3BhZ2UtaXRlbSc7XHJcblx0XHRsaW5rLmNsYXNzTmFtZSA9ICdwYWdlLWxpbmsnO1xyXG5cdFx0c3BhbjIuY2xhc3NOYW1lID0gJ3NyLW9ubHknO1xyXG5cclxuXHRcdGxpbmsuc2V0QXR0cmlidXRlKCdocmVmJywgJycpO1xyXG5cdFx0bGluay5zZXRBdHRyaWJ1dGUoJ2FyaWEtbGFiZWwnLCAnUHJldmlvdXMnKTtcclxuXHRcdHNwYW4xLnNldEF0dHJpYnV0ZSgnYXJpYS1oaWRkZW4nLCAndHJ1ZScpO1xyXG5cclxuXHRcdHNwYW4xLmlubmVySFRNTCA9ICcmbGFxdW87JztcclxuXHRcdHNwYW4yLmlubmVySFRNTCA9ICdQcmV2aW91cyc7XHJcblxyXG5cdFx0bGluay5hcHBlbmRDaGlsZChzcGFuMSk7XHJcblx0XHRsaW5rLmFwcGVuZENoaWxkKHNwYW4yKTtcclxuXHRcdGxpLmFwcGVuZENoaWxkKGxpbmspO1xyXG5cclxuXHRcdHJldHVybiBsaTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIENyZWF0ZXMgdGhlIG5leHQgYnV0dG9uIGxpbmsuXHJcblx0ICpcclxuXHQgKiBAcmV0dXJuIEhUTUxMSUVsZW1lbnRcclxuXHQgKi9cclxuXHRjcmVhdGVOZXh0QnV0dG9uKCkgXHJcblx0e1xyXG5cdFx0dmFyIGxpID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKTtcclxuXHRcdHZhciBsaW5rID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpO1xyXG5cdFx0dmFyIHNwYW4xID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xyXG5cdFx0dmFyIHNwYW4yID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xyXG5cdFx0XHJcblx0XHRsaS5jbGFzc05hbWUgPSAncGFnZS1pdGVtJztcclxuXHRcdGxpbmsuY2xhc3NOYW1lID0gJ3BhZ2UtbGluayc7XHJcblx0XHRzcGFuMi5jbGFzc05hbWUgPSAnc3Itb25seSc7XHJcblxyXG5cdFx0bGluay5zZXRBdHRyaWJ1dGUoJ2hyZWYnLCAnJyk7XHJcblx0XHRsaW5rLnNldEF0dHJpYnV0ZSgnYXJpYS1sYWJlbCcsICdOZXh0Jyk7XHJcblx0XHRzcGFuMS5zZXRBdHRyaWJ1dGUoJ2FyaWEtaGlkZGVuJywgJ3RydWUnKTtcclxuXHJcblx0XHRzcGFuMS5pbm5lckhUTUwgPSAnJnJhcXVvOyc7XHJcblx0XHRzcGFuMi5pbm5lckhUTUwgPSAnTmV4dCc7XHJcblxyXG5cdFx0bGluay5hcHBlbmRDaGlsZChzcGFuMSk7XHJcblx0XHRsaW5rLmFwcGVuZENoaWxkKHNwYW4yKTtcclxuXHRcdGxpLmFwcGVuZENoaWxkKGxpbmspO1xyXG5cclxuXHRcdHJldHVybiBsaTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIENoZWNrcyBpZiB0aGUgZ2l2ZW4gcGFnZSBpcyBpbiByYW5nZS5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSBudW1iZXIgfCBwYWdlTnVtYmVyXHJcblx0ICogQHJldHVybiBib29sXHJcblx0ICovXHJcblx0bm90SW5QYWdlUmFuZ2UocGFnZU51bWJlcikgXHJcblx0e1xyXG5cdFx0cmV0dXJuIChwYWdlTnVtYmVyID4gdGhpcy50b3RhbFBhZ2VzIHx8IHBhZ2VOdW1iZXIgPD0gMCkgfHwgaXNOYU4ocGFnZU51bWJlcik7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBDaGFuZ2VzIHRoZSB1cmwgdG8gYSBnaXZlbiBwYWdlIG51bWJlci5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSBudW1iZXIgfCBwYWdlTnVtYmVyXHJcblx0ICogQHJldHVybiB2b2lkXHJcblx0ICovXHJcblx0Y2hhbmdlVXJsKHBhZ2VOdW1iZXIpIFxyXG5cdHtcclxuXHRcdHBhZ2VOdW1iZXIgPSAgcGFnZU51bWJlciB8fCBxdWVyeVN0cmluZygpWydwYWdlJ107XHJcblx0XHR3aW5kb3cuaGlzdG9yeS5yZXBsYWNlU3RhdGUoJycsICcnLCB0aGlzLnVwZGF0ZVVSTFBhcmFtZXRlcih3aW5kb3cubG9jYXRpb24uaHJlZiwgJ3BhZ2UnLCBwYWdlTnVtYmVyKSk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBTZXRzIHRoZSBhY3RpdmUgbGluay5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSBudW1iZXIgfCBwYWdlTnVtYmVyXHJcblx0ICogQHJldHVybiB2b2lkXHJcblx0ICovXHJcblx0c2V0QWN0aXZlTGluayhwYWdlTnVtYmVyKVxyXG5cdHtcclxuXHRcdGZvcih2YXIgcGFnZSBpbiB0aGlzLnBhZ2VzKSB7XHJcblx0XHRcdGlmICh0aGlzLnBhZ2VzW3BhZ2VdLmNoaWxkTm9kZXNbMF0uZ2V0QXR0cmlidXRlKCdkYXRhLXBhZ2UtbnInKSA9PSBwYWdlTnVtYmVyKSB7XHJcblx0XHRcdFx0RE9NLmFkZENsYXNzKHRoaXMucGFnZXNbcGFnZV0sICdhY3RpdmUnKTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRET00ucmVtb3ZlQ2xhc3ModGhpcy5wYWdlc1twYWdlXSwgJ2FjdGl2ZScpO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBHZXQgdGhlIGdldCB2YXJpYWJsZXMgZnJvbSB0aGUgdXJsLlxyXG5cdCAqXHJcblx0ICogQHJldHVybiBhcnJheVxyXG5cdCAqL1xyXG5cdHF1ZXJ5U3RyaW5nKCkgXHJcblx0e1xyXG5cdFx0dmFyIHZhcnMgPSB7fTtcclxuXHRcdHZhciBwYXJ0cyA9IHdpbmRvdy5sb2NhdGlvbi5ocmVmLnJlcGxhY2UoL1s/Jl0rKFtePSZdKyk9KFteJl0qKS9naSwgZnVuY3Rpb24obSwga2V5LCB2YWx1ZSkge1xyXG5cdFx0XHR2YXJzW2tleV0gPSB2YWx1ZTtcclxuXHRcdH0pO1xyXG5cclxuXHRcdHJldHVybiB2YXJzO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogTW9kaWZpZXMgdGhlIGdldCBwYXJhbWV0ZXIgaW4gdGhlIHVybC5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSBzdHJpbmcgfCB1cmxcclxuXHQgKiBAcGFyYW0gc3RyaW5nIHwgcGFyYW1cclxuXHQgKiBAcGFyYW0gbnVtYmVyIHwgcGFyYW1WYWxcclxuXHQgKiBAcmV0dXJuIHN0cmluZ1xyXG5cdCAqL1xyXG5cdHVwZGF0ZVVSTFBhcmFtZXRlcih1cmwsIHBhcmFtLCBwYXJhbVZhbCkgXHJcblx0e1xyXG5cdCAgICB2YXIgbmV3QWRkaXRpb25hbFVSTCA9IFwiXCI7XHJcblx0ICAgIHZhciB0ZW1wQXJyYXkgPSB1cmwuc3BsaXQoXCI/XCIpO1xyXG5cdCAgICB2YXIgYmFzZVVSTCA9IHRlbXBBcnJheVswXTtcclxuXHQgICAgdmFyIGFkZGl0aW9uYWxVUkwgPSB0ZW1wQXJyYXlbMV07XHJcblx0ICAgIHZhciB0ZW1wID0gXCJcIjtcclxuXHJcblx0ICAgIGlmIChhZGRpdGlvbmFsVVJMKSB7XHJcblx0ICAgICAgICB0ZW1wQXJyYXkgPSBhZGRpdGlvbmFsVVJMLnNwbGl0KFwiJlwiKTtcclxuXHQgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGVtcEFycmF5Lmxlbmd0aDsgaSsrKXtcclxuXHQgICAgICAgICAgICBpZiAodGVtcEFycmF5W2ldLnNwbGl0KCc9JylbMF0gIT0gcGFyYW0pe1xyXG5cdCAgICAgICAgICAgICAgICBuZXdBZGRpdGlvbmFsVVJMICs9IHRlbXAgKyB0ZW1wQXJyYXlbaV07XHJcblx0ICAgICAgICAgICAgICAgIHRlbXAgPSBcIiZcIjtcclxuXHQgICAgICAgICAgICB9XHJcblx0ICAgICAgICB9XHJcblx0ICAgIH1cclxuXHJcblx0ICAgIHZhciByb3dzVGV4dCA9IHRlbXAgKyBcIlwiICsgcGFyYW0gKyBcIj1cIiArIHBhcmFtVmFsO1xyXG5cdCAgICByZXR1cm4gYmFzZVVSTCArIFwiP1wiICsgbmV3QWRkaXRpb25hbFVSTCArIHJvd3NUZXh0O1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogUmVzZXRzIHRoZSBwYWdpbmF0aW9uLlxyXG5cdCAqXHJcblx0ICogQHJldHVybiB2b2lkXHJcblx0ICovXHJcblx0cmVzZXQoKSBcclxuXHR7XHJcblx0XHR0aGlzLnNldEN1cnJlbnQoMSk7XHJcblx0XHR0aGlzLmNoYW5nZVVybCgxKTtcclxuXHR9XHJcbn1cblxubGV0IGRlZmF1bHRTZXR0aW5ncyA9IHtcblx0ZWxlbWVudDogJ2JvZHknLFxuXHRpbXBvcnRCb290c3RyYXA6IGZhbHNlLFxuXHRjb21wb25lbnRzOiBbJ1Byb2R1Y3RzJywgJ1NlcnZpY2VzJywgJ0ZpbHRlcicsICdQYWdpbmF0aW9uJywgJ0NhcnQnXVxufTtcblxuY2xhc3MgVHVyYm9lQ29tbWVyY2Vcbntcblx0Y29uc3RydWN0b3Ioc2V0dGluZ3MpXG5cdHtcblx0XHRFeGNlcHRpb25IYW5kbGVyLmluaXRhbGl6ZSgpO1xuXG5cdFx0aWYodHlwZW9mIHNldHRpbmdzICE9ICdvYmplY3QnKSB7XG5cdFx0XHR0aHJvdyBuZXcgSW52YWxpZEFyZ3VtZW50RXhjZXB0aW9uJDE7XG5cdFx0fVxuXG5cdFx0dGhpcy5jb250YWluZXIgPSBuZXcgQ29udGFpbmVyO1xuXHRcdHRoaXMuc2V0dGluZ3MgPSBDb21tb24uZXh0ZW5kKGRlZmF1bHRTZXR0aW5ncywgc2V0dGluZ3MpO1xuXHRcdHRoaXMuc2V0dGluZ3MuZWxlbWVudCA9IERPTS5maW5kKHRoaXMuc2V0dGluZ3MuZWxlbWVudCk7XG5cdFx0XG5cdFx0YmluZENvbXBvbmVudHNEZXBlbmRlbmNpZXMuY2FsbCh0aGlzLCBzZXR0aW5ncy5jb21wb25lbnRzKTtcblxuXHRcdHJldHVybiBuZXcgUHJveHkodGhpcywge1xuXHRcdFx0Z2V0OiBmdW5jdGlvbih0YXJnZXQsIHNvdXJjZSkge1xuXHRcdFx0XHRpZiAoQ29tbW9uLmluX2FycmF5KHNvdXJjZSwgc2V0dGluZ3MuY29tcG9uZW50cykpIHtcblx0XHRcdFx0XHRyZXR1cm4gdGFyZ2V0LmNvbnRhaW5lci5tYWtlKHNvdXJjZSk7XG5cdFx0XHRcdH0gZWxzZSBpZiAodGFyZ2V0LmNvbnRhaW5lci5pbnN0YW5jZUV4aXN0KHNvdXJjZSkpIHtcblx0XHRcdFx0XHRyZXR1cm4gdGFyZ2V0LmNvbnRhaW5lci5nZXRJbnN0YW5jZShzb3VyY2UpO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0dGhyb3cgbmV3IENvbXBvbmVudE5vdFJlZ2lzdGVyZWRFeGNlcHRpb24oJ2NvbXBvbmVudHMgbXVzdCBiZSByZWdpc3RlcmVkIGluIG9yZGVyIHRvIHVzZSB0aGVtLicpO1xuXHRcdFx0fVxuXHRcdH0pO1xuXHR9XG59XG5cbi8qKlxuICogQmluZHMgY29tcG9uZW50cyBkZXBlbmRlbmNpZXMuXG4gKlxuICogQHBhcmFtIG9iamVjdCB8IGNvbXBvbmVudHNcbiAqIEByZXR1cm4gdm9pZFxuICovXG5mdW5jdGlvbiBiaW5kQ29tcG9uZW50c0RlcGVuZGVuY2llcyhjb21wb25lbnRzKSB7XG5cblx0dGhpcy5jb250YWluZXIuc2V0SW5zdGFuY2UoJ0V2ZW50cycsIG5ldyBFdmVudE1hbmFnZXIpO1xuXG5cdGxldCByZXF1ZXN0ID0gdGhpcy5jb250YWluZXIubWFrZShuZXcgUmVxdWVzdCk7XG5cblx0dGhpcy5jb250YWluZXIuYmluZCgnRmlsdGVyJywgZnVuY3Rpb24oY29udGFpbmVyKSB7XG5cdFx0Y29udGFpbmVyWydGaWx0ZXInXS5ib290ZWQgPSB0cnVlO1xuXHRcdHJldHVybiBuZXcgRmlsdGVyKGNvbnRhaW5lcik7XG5cdH0pO1xuXHRcblx0dGhpcy5jb250YWluZXIuYmluZCgnU2VydmljZXMnLCBmdW5jdGlvbihjb250YWluZXIpIHsgXG5cdFx0Y29udGFpbmVyWydTZXJ2aWNlcyddLmJvb3RlZCA9IHRydWU7XG5cdFx0cmV0dXJuIG5ldyBTZXJ2aWNlcyhjb250YWluZXIpO1xuXHR9KTtcblxuXHR0aGlzLmNvbnRhaW5lci5iaW5kKCdQcm9kdWN0cycsIGZ1bmN0aW9uKGNvbnRhaW5lcikge1xuXHRcdGNvbnRhaW5lclsnUHJvZHVjdHMnXS5ib290ZWQgPSB0cnVlO1xuXHRcdHJldHVybiBuZXcgUHJvZHVjdHMoY29udGFpbmVyLCByZXF1ZXN0LCBjb250YWluZXIuRXZlbnRzKTtcblx0fSk7XG5cblx0dGhpcy5jb250YWluZXIuYmluZCgnUGFnaW5hdGlvbicsIGZ1bmN0aW9uKGNvbnRhaW5lcikge1xuXHRcdGNvbnRhaW5lclsnUGFnaW5hdGlvbiddLmJvb3RlZCA9IHRydWU7XG5cdFx0cmV0dXJuIG5ldyBQYWdpbmF0aW9uKGNvbnRhaW5lciwgY29udGFpbmVyLm1ha2UoJ1Byb2R1Y3RzJyksIGNvbnRhaW5lci5FdmVudHMpO1xuXHR9KTtcblxuXHR0aGlzLmNvbnRhaW5lci5iaW5kKCdDYXJ0JywgZnVuY3Rpb24oY29udGFpbmVyKSB7XG5cdFx0Y29udGFpbmVyWydDYXJ0J10uYm9vdGVkID0gdHJ1ZTtcblx0XHRyZXR1cm4gbmV3IENhcnQoY29udGFpbmVyLCByZXF1ZXN0LCBjb250YWluZXIuRXZlbnRzKTtcblx0fSk7XG5cblx0dGhpcy5jb250YWluZXJbJ0ZpbHRlciddWydib290ZWQnXSA9IGZhbHNlO1xuXHR0aGlzLmNvbnRhaW5lclsnU2VydmljZXMnXVsnYm9vdGVkJ10gPSBmYWxzZTtcblx0dGhpcy5jb250YWluZXJbJ1Byb2R1Y3RzJ11bJ2Jvb3RlZCddID0gZmFsc2U7XG5cdHRoaXMuY29udGFpbmVyWydQYWdpbmF0aW9uJ11bJ2Jvb3RlZCddID0gZmFsc2U7XG5cdHRoaXMuY29udGFpbmVyWydDYXJ0J11bJ2Jvb3RlZCddID0gZmFsc2U7XG59XG5cbnJldHVybiBUdXJib2VDb21tZXJjZTtcblxufSgpKTtcbiJdfQ==
