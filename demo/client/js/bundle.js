'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var TurboEcommerce = function () {
	'use strict';

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

			/**
    * Changes the first letter 
    * of the string to uppercase.
    * 
    * @param string | string
    * @return string
    */

		}, {
			key: 'ucfirst',
			value: function ucfirst(string) {
				return string.charAt(0).toUpperCase() + string.slice(1);
			}
		}]);

		return Str;
	}();

	/**
  * Stores the debug level.
  *
  * @var string 
  */


	var debugLevel = void 0;

	var ExceptionHandler = function () {
		_createClass(ExceptionHandler, null, [{
			key: 'setDebugLevel',

			/**
    * Setter for the debug level.
    *
    * @param string | level
    * @return void
    */
			set: function set(level) {
				// Suppress errors depends on the debug level.
				if (level == 'warning' || level == 'info') {
					window.onerror = function () {
						return true;
					};
				}

				debugLevel = level;
			}

			/**
    * Extended constructor, captures the
    * stack trace.
    *
    * @return void
    */

		}]);

		function ExceptionHandler() {
			_classCallCheck(this, ExceptionHandler);

			if (Error.captureStackTrace) {
				Error.captureStackTrace(this, this.constructor.name);
			}
		}

		/**
   * Handles all exceptions.
   *
   * @param object | error | Throwen Exception Object
   * @param string | message
   * @return void
   */


		_createClass(ExceptionHandler, [{
			key: 'stackTrace',
			value: function stackTrace(error, message) {
				this.customActions(error, message);

				switch (debugLevel) {
					case 'error':
						this.handleErrors(error, message);break;
					case 'warning':
						this.handleWarnings(error, message);break;
					case 'info':
						this.handleInfos(error, message);break;
					default:
						this.handleInfos(error, message);break;
				}
			}

			/**
    * Take action for specific Exceptions.
    *
    * @param object | error | Throwen Exception Object
    * @param string | message
    * @return bool
    */

		}, {
			key: 'customActions',
			value: function customActions(error, message) {
				if (error.constructor.name == 'InvalidArgumentException') {
					// handle
				} else if (error.constructor.name == 'InvalidBindingException') {
					// handle
				} else if (error.constructor.name == 'BadEventCallException') {
					// handle
				} else if (error.constructor.name == 'ComponentsException') {
					// handle
				} else if (error.constructor.name == 'ComponentNotRegisteredException') {
					// handle
				} else if (error.constructor.name == 'NotInPageRangeException') {
					// handle
				} else {
					return false;
				}

				return false;
			}
		}, {
			key: 'handleErrors',
			value: function handleErrors(error, message) {
				console.error(error.constructor.name + ': ' + message);
			}
		}, {
			key: 'handleWarnings',
			value: function handleWarnings(error, message) {
				console.warn(error.constructor.name + ': ' + message);
			}
		}, {
			key: 'handleInfos',
			value: function handleInfos(error, message) {
				console.info(error.constructor.name + ': ' + message);
			}
		}]);

		return ExceptionHandler;
	}();

	var defaultMessage = 'An invalid argument was passed.';

	var InvalidArgumentException$1 = function (_ExceptionHandler) {
		_inherits(InvalidArgumentException$1, _ExceptionHandler);

		function InvalidArgumentException$1() {
			var message = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

			_classCallCheck(this, InvalidArgumentException$1);

			message = message || defaultMessage;

			var _this = _possibleConstructorReturn(this, (InvalidArgumentException$1.__proto__ || Object.getPrototypeOf(InvalidArgumentException$1)).call(this, message));

			_get(InvalidArgumentException$1.prototype.__proto__ || Object.getPrototypeOf(InvalidArgumentException$1.prototype), 'stackTrace', _this).call(_this, _this, message);
			return _this;
		}

		return InvalidArgumentException$1;
	}(ExceptionHandler);

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
    * Checks if an element has a class.
    *
    * @param HTMLElement | element
    * @param string | className
    * @return bool
    */

		}, {
			key: 'hasClass',
			value: function hasClass(element, className) {
				if (element === null) {
					throw new InvalidArgumentException$1('hasClass() expects the first argument to be an HTMLElement but null was passed.');
				}

				if (!className || className == '' || typeof className == 'undefined') {
					return;
				}

				return element.className.indexOf(className) != -1;
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
    * Removes an element from the DOM.
    *
    * @param HTMLElement
    * @return void
    */

		}, {
			key: 'remove',
			value: function remove(element) {
				element.parentNode.removeChild(element);
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
    * Adds linked style tag with given id and src to the DOM.
    * 
    * @param string | id
    * @param string | source
    * @return void
    */

		}, {
			key: 'addLinkedStyle',
			value: function addLinkedStyle(id, source) {
				if (typeof source != 'string') {
					throw new InvalidArgumentException$1('DOM.addLinkedStyle() excpects the second parameter to be string, but ' + (typeof source === 'undefined' ? 'undefined' : _typeof(source)) + ' was passed instead.');
				}

				var head = document.head || document.getElementsByTagName('head')[0];
				var linkedStyleTag = document.createElement('link');

				// give an id to recognize the style tag
				linkedStyleTag.setAttribute('id', id);
				linkedStyleTag.setAttribute('href', source);
				linkedStyleTag.setAttribute('rel', 'stylesheet');
				linkedStyleTag.setAttribute('type', 'text/css');
				// appending that style tag to the DOM head tag
				head.appendChild(linkedStyleTag);
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
		if (typeof selector != 'string') {
			throw new InvalidArgumentException$1('queryElement() expects first parameter to be a string, but ' + (typeof selector === 'undefined' ? 'undefined' : _typeof(selector)) + ' was passed instead.');
		}

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
				if (typeof hystack == 'undefined' || hystack.constructor !== Array) {
					throw new InvalidArgumentException$1('Common.in_array() expects the second parameter to be an array, but ' + (typeof hystack === 'undefined' ? 'undefined' : _typeof(hystack)) + ' was passd instead');
				}

				for (var i = 0; i <= hystack.length; i++) {
					if (needle == hystack[i]) {
						return true;
					}
				}

				return false;
			}

			/**
    * Takes an array and chunks it.
    *
    * @param array | total
    * @param number | chunks
    * @return array
    */

		}, {
			key: 'array_chunk',
			value: function array_chunk(total) {
				var size = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 5;

				if (isNaN(size)) {
					throw new InvalidArgumentException$1('Common.array_chunk() expects the second parameter to be a number, but ' + (typeof size === 'undefined' ? 'undefined' : _typeof(size)) + ' passed instead.');
				}

				size = parseInt(size);

				var i = void 0;
				var collection = [];

				// add each chunk to the result
				for (i = 0; i < Math.ceil(total.length / size); i++) {

					var start = i * size;
					var end = start + size;

					collection.push(total.slice(start, end));
				}

				return collection;
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

	var InvalidDataStructureException = function (_ExceptionHandler2) {
		_inherits(InvalidDataStructureException, _ExceptionHandler2);

		function InvalidDataStructureException() {
			var message = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

			_classCallCheck(this, InvalidDataStructureException);

			message = message || defaultMessage$1;

			var _this2 = _possibleConstructorReturn(this, (InvalidDataStructureException.__proto__ || Object.getPrototypeOf(InvalidDataStructureException)).call(this, message));

			_get(InvalidDataStructureException.prototype.__proto__ || Object.getPrototypeOf(InvalidDataStructureException.prototype), 'stackTrace', _this2).call(_this2, _this2, message);
			return _this2;
		}

		return InvalidDataStructureException;
	}(ExceptionHandler);

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

	var defaultSettings = {
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

			this.settings = Common.extend(defaultSettings, settings);
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
						if (options.hasOwnProperty('error') && typeof options.error == 'function') {
							options.error(message);
						}

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
				var xhr = new XMLHttpRequest() || new ActiveXObject("Microsoft.XMLHTTP");

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

					if (xhr.responseType == 'json') {
						xhr.setRequestHeader('Content-Type', 'application/json');
						xhr.setRequestHeader('Accept', 'application/json');
					}

					xhr.onreadystatechange = function () {
						if (this.readyState != 4 || this.status != 200) {
							return;
						}

						var response = this.response || this.responseText;
						response = xhr.responseType == 'json' && (typeof response === 'undefined' ? 'undefined' : _typeof(response)) != 'object' ? JSON.parse(response) : response;
						resolve(response);

						if (options.hasOwnProperty('after') && typeof options.after == 'function') {
							options.after.call(this);
						}
					};

					xhr.onerror = function (message) {
						if (options.hasOwnProperty('error') && typeof options.error == 'function') {
							options.error(message);
						}

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

	var defaultMessage$2 = 'The event you called does not exists or you supplied wrong argument';

	var BadEventCallException = function (_ExceptionHandler3) {
		_inherits(BadEventCallException, _ExceptionHandler3);

		function BadEventCallException() {
			var message = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

			_classCallCheck(this, BadEventCallException);

			message = message || defaultMessage$2;

			var _this3 = _possibleConstructorReturn(this, (BadEventCallException.__proto__ || Object.getPrototypeOf(BadEventCallException)).call(this, message));

			_get(BadEventCallException.prototype.__proto__ || Object.getPrototypeOf(BadEventCallException.prototype), 'stackTrace', _this3).call(_this3, _this3, message);
			return _this3;
		}

		return BadEventCallException;
	}(ExceptionHandler);

	/**
  * @file 
  * EventManager class.
  *
  * Handles subscripions and publishing of events.
  */

	var EventManager = function () {
		/**
   * Stores the events callbacks.
   * 
   * @var array
   */
		function EventManager() {
			_classCallCheck(this, EventManager);

			this.events = {};
		}

		/**
   * Subscribing to an event.
   *
   * @param string | name
   * @param function | callback
   * @return void
   */


		_createClass(EventManager, [{
			key: 'subscribe',
			value: function subscribe(name, callback) {
				if (typeof callback !== 'function') {
					throw new InvalidArgumentException();
				}

				if (typeof this.events[name] == 'undefined') {
					this.events[name] = [];
				}

				this.events[name].push(callback);
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
				if (typeof this.events[name] == 'undefined') {
					return;
				}

				this.events[name].forEach(function (callback) {
					if (typeof callback != 'function') {
						throw new InvalidArgumentException('subscribe() should recieve callback as second parameter, but ' + (typeof callback === 'undefined' ? 'undefined' : _typeof(callback)) + ' was passed');
					}

					return callback.apply(undefined, _toConsumableArray(data));
				});
			}
		}]);

		return EventManager;
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

	var defaultMessage$3 = 'The item you are trying to add must contain a unique id';

	var InvalidCartItemException = function (_ExceptionHandler4) {
		_inherits(InvalidCartItemException, _ExceptionHandler4);

		function InvalidCartItemException() {
			var message = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

			_classCallCheck(this, InvalidCartItemException);

			message = message || defaultMessage$3;

			var _this4 = _possibleConstructorReturn(this, (InvalidCartItemException.__proto__ || Object.getPrototypeOf(InvalidCartItemException)).call(this, message));

			_get(InvalidCartItemException.prototype.__proto__ || Object.getPrototypeOf(InvalidCartItemException.prototype), 'stackTrace', _this4).call(_this4, _this4, message);
			return _this4;
		}

		return InvalidCartItemException;
	}(ExceptionHandler);

	// Helpers
	// Exceptions
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


	var defaultSettings$1 = {
		element: '.cart',
		cookie_name: 'cart',
		preview_class: '',
		loader: '',
		class: '',
		width: '60px',
		height: '60px',
		placement: 'right-top',
		fixed: true,
		hover_color: 'orange',
		no_css: false
	};

	/**
  * Stores the container object.
  *
  * @var \Core\Container
  */
	var Container = void 0;

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

			Container = container;
			Http = http;
			EventManager$2 = eventManager;

			this.previewElement = this.createPreviewElement();
			this.icon = createIcon.call(this);
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

				this.settings = Common.extend(defaultSettings$1, settings);

				this.setElement(this.settings.element);

				DOM.addClass(this.previewElement, 'closed');
				DOM.addClass(this.previewElement, this.settings.preview_class);

				this.addStyleTag();
				this.bindEventListeners();

				if (this.isEmpty(Cookie.get(this.settings.cookie_name))) {
					this.setupCart();
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
			key: 'setupCart',
			value: function setupCart() {
				this.cart = {};
				this.cart.id = Str.random(10);
				this.cart.items = [];
				this.cart.favorites = [];
				Cookie.set(this.settings.cookie_name, this.cart, 2);
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
				if ((typeof item === 'undefined' ? 'undefined' : _typeof(item)) != 'object') {
					throw new InvalidArgumentException$1('addItem() expect the first parameter to be an object, but ' + (typeof item === 'undefined' ? 'undefined' : _typeof(item)) + ' was passed instead');
				}

				if (!item.hasOwnProperty('id')) {
					throw new InvalidCartItemException();
				}

				this.cart = Cookie.get(this.settings.cookie_name);

				if (!item.hasOwnProperty('quantity')) {
					item.quantity = 1;
				}

				var i = void 0;
				var incremented = false;

				for (i = 0; i < this.cart.items.length; i++) {
					if (this.cart.items[i].id == item.id) {
						this.cart.items[i].quantity++;
						incremented = true;
						break;
					}
				}

				if (!incremented) {
					this.cart.items.push(item);
				}

				Cookie.set(this.settings.cookie_name, this.cart, 2);
			}

			/**
    * Adds an item to the favorites list.
    *
    * @param object | item
    * @return void
    */

		}, {
			key: 'favoriteItem',
			value: function favoriteItem(item) {
				if ((typeof item === 'undefined' ? 'undefined' : _typeof(item)) != 'object') {
					throw new InvalidArgumentException$1('favoriteItem() expect the first parameter to be an object, but ' + (typeof item === 'undefined' ? 'undefined' : _typeof(item)) + ' was passed instead');
				}

				if (!item.hasOwnProperty('id')) {
					throw new InvalidCartItemException();
				}

				this.cart = Cookie.get(this.settings.cookie_name);

				var i = void 0;
				var alreadyFavorited = false;

				for (i = 0; i < this.cart.favorites.length; i++) {
					if (this.cart.favorites[i].id == item.id) {
						alreadyFavorited = true;
						break;
					}
				}

				if (!alreadyFavorited) {
					this.cart.favorites.push(item);
				}

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
				if ((typeof item === 'undefined' ? 'undefined' : _typeof(item)) != 'object') {
					throw new InvalidArgumentException$1('removeItem() expect the first parameter to be an object, but ' + (typeof item === 'undefined' ? 'undefined' : _typeof(item)) + ' was passed instead');
				}

				if (!item.hasOwnProperty('id')) {
					throw new InvalidCartItemException();
				}

				this.cart = Cookie.get(this.settings.cookie_name);

				var i = void 0;

				for (i = 0; i < this.cart.items.length; i++) {
					if (this.cart.items[i].id == item.id) {
						this.cart.items.splice(i, 1);
						break;
					}
				}

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

				var table = DOM.createElement('table');

				DOM.addClass(table, 'preview-table');

				for (var i = 0; i < items.length; i++) {

					var attributes = items[i];

					var _tr = DOM.createElement('tr', {
						class: 'item'
					});

					// Quantity always at the start of an item.
					var _td = DOM.createElement('td');

					_td.innerHTML = attributes.quantity + 'x';
					_tr.appendChild(_td);

					for (var attribute in attributes) {
						switch (attribute) {
							case 'image':
								_td = DOM.createElement('td');
								var image = DOM.createElement('img', {
									src: attributes[attribute],
									width: '50px',
									height: '50px'
								});

								_td.appendChild(image);
								break;
							case 'name':
							case 'price':
								_td = DOM.createElement('td');
								_td.innerHTML = attributes[attribute];
								break;
						}

						_tr.appendChild(_td);
					}

					table.appendChild(_tr);
				}

				// create checkout button at the buttom
				var tr = DOM.createElement('tr');
				var td = DOM.createElement('td', {
					colspan: '4'
				});

				var checkout = DOM.createElement('a', {
					class: 'btn btn-primary',
					text: 'Checkout'
				});

				checkout.onclick = function (e) {
					e.preventDefault();
					EventManager$2.publish('cart.checkout');
				}.bind(this);

				td.appendChild(checkout);
				tr.appendChild(td);

				table.appendChild(tr);

				itemsDiv.appendChild(table);
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
				this.element = DOM.find(selector);

				if (this.element) {
					DOM.addClass(this.element, this.settings.class);
					DOM.addClass(this.element, this.settings.placement);
					this.element.appendChild(this.icon);
					this.element.appendChild(this.previewElement);
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
				if (DOM.find('#Turbo-eCommerce-Cart')) {
					return;
				}

				if (this.settings.no_css) {
					return;
				}

				var position = this.settings.fixed ? 'fixed' : 'absolute';

				var css = '\n\t\t\t' + this.settings.element + ' {\n\t\t\t\tposition: ' + position + ';\n\t\t\t\tcursor: pointer;\n\t\t\t\tcolor: #ffffff;\n\t\t\t\tz-index: 998;\n\t\t\t}\n\n\t\t\t' + this.settings.element + ' svg {\n\t\t\t\twidth: ' + this.settings.width + ';\n\t\t\t\theight: ' + this.settings.height + ';\n\t\t\t\ttransition: fill 0.3s;\n\t\t\t}\n\n\t\t\t' + this.settings.element + ' svg:hover {\n\t\t\t\tfill: ' + this.settings.hover_color + ';\n\t\t\t\ttransition: fill 0.3s;\n\t\t\t}\n\n\t\t\t' + this.settings.element + '.top-right,\n\t\t\t' + this.settings.element + '.right-top {\n\t\t\t\tright: 10px;\n\t\t\t\ttop: 10px;\n\t\t\t}\n\n\t\t\t' + this.settings.element + '.left-top,\n\t\t\t' + this.settings.element + '.top-left {\n\t\t\t\tleft: 10px;\n\t\t\t\ttop: 10px;\n\t\t\t}\n\n\t\t\t' + this.settings.element + ' > #preview {\n\t\t\t\tposition: ' + position + ';\n\t\t\t\tz-index: 9999;\n\t\t\t\ttop: calc(10px + ' + this.settings.height + ');\n\t\t\t\ttransform: translateX(60px);\n\t\t\t\theight: 400px;\n\t\t\t\twidth: 300px;\n\t\t\t\tborder: 1px solid #e4e4e4;\n\t\t\t\tbackground: #ffffff;\n\t\t\t\ttransition: transform 1s, visibility 1s;\n\t\t\t\tcursor: default;\n\t\t\t\toverflow-Y: scroll;\n\t\t\t}\n\n\t\t\t' + this.settings.element + ' > #preview.opened {\n\t\t\t\tvisibility: visible;\n\t\t\t\ttransform: translateX(-240px);\n\t\t\t}\n\n\t\t\t' + this.settings.element + ' > #preview.closed {\n\t\t\t\tvisibility: hidden;\n\t\t\t\ttransform: translateX(60px);\n\t\t\t}\n\n\t\t\t' + this.settings.element + ' #preview > ul.items {\n\t\t\t\tpadding: 0;\n\t\t\t\tcolor: #000000;\n\t\t\t\tlist-style-type: none;\n\t\t\t}\n\n\t\t\t' + this.settings.element + ' #preview > ul.items > .preview-table {\n\t\t\t\twidth: 100%;\n\t\t\t}\n\n\t\t\t' + this.settings.element + ' #preview > ul.items > .preview-table td {\n\t\t\t\tpadding: 4px;\n\t\t\t}\n\n\t\t\t' + this.settings.element + ' .items.loading {\n\t\t\t\tdisplay: none;\n\t\t\t\toverflow-Y: none;\n\t\t\t}\n\n\t\t\t' + this.settings.element + ' .cart-loader-overlay {\n\t\t\t\tposition: fixed;\n\t\t\t\ttop: 0; \n\t\t\t    left: 0;\n\t\t\t    right: 0;\n\t\t\t    bottom: 0;\n\t\t\t\tbackground: #ffffff;\n\t\t\t\twidth: 100%;\n\t\t\t\theight: 100%;\n\t\t\t\tmin-height: 100%;\n\t\t\t\toverflow: auto;\n\t\t\t}\n\n\t\t\t' + this.settings.element + ' .cart-loader-overlay .cart-loader {\n\t\t\t\tposition: absolute;\n\t\t\t\twidth: 50px;\n\t\t\t\theight: 50px;\n\t\t\t\tmargin-left: -25px;\n\t\t\t\tmargin-top: -25px;\n\t\t\t\tleft: 50%;\n\t\t\t\tright: 50%;\n\t\t\t\ttop: 50%;\n\t\t\t\tbottom: 50%;\n\t\t\t}\n\t\t';

				DOM.addStyle('Turbo-eCommerce-Cart', css);
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

				var loader = void 0;

				if (this.settings.loader) {
					loader = DOM.createElement('img', {
						src: this.settings.loader,
						class: 'cart-loader'
					});
				} else {
					loader = createLoader();
				}

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
				this.icon.onclick = function (e) {
					e.preventDefault();
					this.toggleCartPreview();
				}.bind(this);

				EventManager$2.subscribe('cart.product.added', function (attributes) {
					this.openCartPreview();
					this.addItem(attributes);
					this.reloadCartPreview();
				}.bind(this));

				EventManager$2.subscribe('cart.product.favorited', function (attributes) {
					this.favoriteItem(attributes);
				}.bind(this));
			}

			/**
    * Opens the cart preview.
    *
    * @return void 
    */

		}, {
			key: 'openCartPreview',
			value: function openCartPreview() {
				if (DOM.hasClass(this.previewElement, 'opened')) {
					this.reloadCartPreview();
				}

				DOM.switchClasses(this.previewElement, 'closed', 'opened');
				this.reloadCartPreview();
			}

			/**
    * Toggles the opening closing of the cart preview.
    *
    * @return void 
    */

		}, {
			key: 'toggleCartPreview',
			value: function toggleCartPreview() {
				var opening = DOM.toggleClass(this.previewElement, 'opened', 'closed');

				if (opening) {
					this.reloadCartPreview();
				}
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

			/**
    * Hides the component from the DOM.
    *
    * @return void 
    */

		}, {
			key: 'hide',
			value: function hide() {
				this.element.style.display = 'none';
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
		svg.setAttribute('width', '40px');
		svg.setAttribute('height', '40px');
		svg.setAttribute('viewBox', '0 0 446.843 446.843');
		svg.setAttribute('style', 'enable-background:new 0 0 446.843 446.843;');
		svg.setAttribute('xml:space', 'preserve');

		path.setAttribute('d', 'M444.09,93.103c-2.698-3.699-7.006-5.888-11.584-5.888H109.92c-0.625,0-1.249,0.038-1.85,0.119l-13.276-38.27c-1.376-3.958-4.406-7.113-8.3-8.646L19.586,14.134c-7.374-2.887-15.695,0.735-18.591,8.1c-2.891,7.369,0.73,15.695,8.1,18.591l60.768,23.872l74.381,214.399c-3.283,1.144-6.065,3.663-7.332,7.187l-21.506,59.739c-1.318,3.663-0.775,7.733,1.468,10.916c2.24,3.183,5.883,5.078,9.773,5.078h11.044c-6.844,7.616-11.044,17.646-11.044,28.675c0,23.718,19.298,43.012,43.012,43.012s43.012-19.294,43.012-43.012c0-11.029-4.2-21.059-11.044-28.675h93.776c-6.847,7.616-11.048,17.646-11.048,28.675c0,23.718,19.294,43.012,43.013,43.012c23.718,0,43.012-19.294,43.012-43.012c0-11.029-4.2-21.059-11.043-28.675h13.433c6.599,0,11.947-5.349,11.947-11.948c0-6.599-5.349-11.947-11.947-11.947H143.647l13.319-36.996c1.72,0.724,3.578,1.152,5.523,1.152h210.278c6.234,0,11.751-4.027,13.65-9.959l59.739-186.387C447.557,101.567,446.788,96.802,444.09,93.103z M169.659,409.807c-10.543,0-19.116-8.573-19.116-19.116s8.573-19.117,19.116-19.117s19.116,8.574,19.116,19.117S180.202,409.807,169.659,409.807z M327.367,409.807c-10.543,0-19.117-8.573-19.117-19.116s8.574-19.117,19.117-19.117c10.542,0,19.116,8.574,19.116,19.117S337.909,409.807,327.367,409.807z M402.52,148.149h-73.161V115.89h83.499L402.52,148.149z M381.453,213.861h-52.094v-37.038h63.967L381.453,213.861z M234.571,213.861v-37.038h66.113v37.038H234.571z M300.684,242.538v31.064h-66.113v-31.064H300.684z M139.115,176.823h66.784v37.038h-53.933L139.115,176.823z M234.571,148.149V115.89h66.113v32.259H234.571z M205.898,115.89v32.259h-76.734l-11.191-32.259H205.898z M161.916,242.538h43.982v31.064h-33.206L161.916,242.538z M329.359,273.603v-31.064h42.909l-9.955,31.064H329.359z');

		g.appendChild(path);
		svg.appendChild(g);

		var div = DOM.createElement('div', {
			id: 'cartIcon'
		});

		div.appendChild(svg);

		return div;
	}

	/**
  * Creates the cart loader icon.
  *
  * @return SVGSVGElement
  */
	function createLoader() {
		var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
		var count = 12;
		var groups = [];
		var rectangels = [];
		var animations = [];

		svg.setAttribute('class', 'lds-spinner');
		svg.setAttribute('width', '200px');
		svg.setAttribute('height', '200px');
		svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
		svg.setAttribute('xmlns:xlink', 'http://www.w3.org/1999/xlink');
		svg.setAttribute('viewBox', '0 0 100 100');
		svg.setAttribute('preserveAspectRatio', 'xMidYMid');
		svg.setAttribute('style', 'background: none;');

		var rotation = 0;

		for (var i = 0; i < count; i++) {
			var group = document.createElementNS("http://www.w3.org/2000/svg", "g");
			group.setAttribute('transform', 'rotate(' + rotation + ' 50 50)');
			rotation += 30;
			groups.push(group);
		}

		for (var i = 0; i < count; i++) {
			var rectangel = document.createElementNS("http://www.w3.org/2000/svg", "rect");
			rectangel.setAttribute('x', '47');
			rectangel.setAttribute('y', '24');
			rectangel.setAttribute('rx', '9.4');
			rectangel.setAttribute('ry', '4.8');
			rectangel.setAttribute('width', '6');
			rectangel.setAttribute('height', '12');
			rectangel.setAttribute('fill', '#4658ac');
			rectangels.push(rectangel);
		}

		var begin = 0.09 * 11;

		for (var i = 0; i < count; i++) {
			var animate = document.createElementNS("http://www.w3.org/2000/svg", "animate");
			animate.setAttribute('attributeName', 'opacity');
			animate.setAttribute('values', '1;0');
			animate.setAttribute('times', '0;1');
			animate.setAttribute('dur', '1s');
			animate.setAttribute('begin', begin.toFixed(8) + 's');
			animate.setAttribute('repeatCount', 'indefinite');
			animations.push(animate);
			begin -= 0.09;
		}

		for (var i = 0; i < groups.length; i++) {
			var _group = groups[i];
			var _rectangel = rectangels[i];
			var _animate = animations[i];
			_rectangel.appendChild(_animate);
			_group.appendChild(_rectangel);
			svg.appendChild(_group);
		}

		DOM.addClass(svg, 'cart-loader');

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
	var defaultSettings$2 = {
		element: '.filter',
		class: '',
		width: '',
		height: '',
		no_css: false
	};

	/**
  * Stores the container object.
  *
  * @var \Core\Container
  */
	var Container$1 = void 0;

	var Filter = function () {
		/**
   * - Initialize the IoC container.
   *
   * @param \Core\Container | container
   * @return void
   */
		function Filter(container) {
			_classCallCheck(this, Filter);

			Container$1 = container;
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

				this.settings = Common.extend(defaultSettings$2, settings);

				document.addEventListener('DOMContentLoaded', function () {

					this.setElement(this.settings.element);

					this.addStyleTag();
				}.bind(this));
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
				this.element = DOM.find(selector);

				DOM.addClass(this.element, this.settings.class);
			}

			/**
    * Add the eCommerce style tags to the DOM.
    */

		}, {
			key: 'addStyleTag',
			value: function addStyleTag() {
				if (DOM.find('#Turbo-eCommerce-Filter')) {
					return;
				}

				if (this.settings.no_css) {
					return;
				}

				var width = this.settings.width ? 'width:' + this.settings.width + ';' : '';
				var minWidth = this.settings.min_width || '200px';
				var height = this.settings.height || 'auto';

				var css = '\n\t\t\t' + this.settings.element + ' {\n\t\t\t\tposition: relative;\n\t\t\t\tmargin: 5px 5px;\n\t\t\t\tborder: 1px solid #e4e4e4;\n\t\t\t\t' + width + '\n\t\t\t\tmin-width: ' + minWidth + ';\n\t\t\t\theight: ' + height + ';\n\t\t\t\tmin-height: 200px;\n\t\t\t\tcolor: #ffffff;\n\t\t\t\toverflow: hidden;\n\t\t\t}\n\n\t\t';

				DOM.addStyle('Turbo-eCommerce-Filter', css);
			}

			/**
    * Hides the component from the DOM.
    *
    * @return void 
    */

		}, {
			key: 'hide',
			value: function hide() {
				this.element.style.display = 'none';
			}
		}]);

		return Filter;
	}();

	// Helpers
	// Exceptions
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


	var defaultSettings$3 = {
		element: '.checkout',
		no_css: false
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
	var EventManager$3 = void 0;

	/**
  * Stores the request object.
  *
  * @var \Helpers\Request
  */
	var Http$1 = void 0;

	var Checkout = function () {
		/**
   * - Initialize the IoC container
   * - Initialize the Request
   * - Initialize the EventManager
   * - Listen to checkout event.
   *
   * @param \Core\Container | container
   * @param \Helpers\Request | http
   * @param \Core\EventManager | eventManager
   * @return void
   */
		function Checkout(container, http, eventManager) {
			_classCallCheck(this, Checkout);

			Container$2 = container;
			Http$1 = http;
			EventManager$3 = eventManager;

			EventManager$3.subscribe('cart.checkout', function () {
				this.hideAll();
				this.show();
			}.bind(this));
		}

		/**
   * Sets the object by the users setting.
   *
   * @param object | settings
   * @return void
   */


		_createClass(Checkout, [{
			key: 'setup',
			value: function setup(settings) {
				if ((typeof settings === 'undefined' ? 'undefined' : _typeof(settings)) != 'object') {
					throw new InvalidArgumentException$1();
				}

				this.settings = Common.extend(defaultSettings$3, settings);

				document.addEventListener('DOMContentLoaded', function () {

					this.setElement(this.settings.element);
					this.hide();
					this.addStyleTag();
				}.bind(this));
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
				this.element = DOM.find(selector);

				if (this.element) {
					DOM.addClass(this.element, this.settings.class);
				}
			}

			/**
    * Add the eCommerce style tags to the DOM.
    *
    * @return void
    */

		}, {
			key: 'addStyleTag',
			value: function addStyleTag() {
				if (DOM.find('#Turbo-eCommerce-Checkout')) {
					return;
				}

				if (this.settings.no_css) {
					return;
				}

				var position = this.settings.fixed ? 'fixed' : 'absolute';

				var css = '\n\t\t\t' + this.settings.element + ' {\n\t\t\t\twidth: 100%;\n\t\t\t\tmin-height: 400px;\n\t\t\t\tborder: 1px solid #e4e4e4;\n\t\t\t}\n\t\t';

				DOM.addStyle('Turbo-eCommerce-Checkout', css);
			}

			/**
    * Hides all irrelevant elements from the DOM.
    *
    * @return void 
    */

		}, {
			key: 'hideAll',
			value: function hideAll() {
				Container$2.Components.booted.forEach(function (component) {
					if (component.constructor.name != 'Checkout') {
						component.hide();
					}
				});
			}

			/**
    * Hides the component from the DOM.
    *
    * @return void 
    */

		}, {
			key: 'hide',
			value: function hide() {
				this.element.style.display = 'none';
			}

			/**
    * Shows the element on the DOM.
    *
    * @return void 
    */

		}, {
			key: 'show',
			value: function show() {
				this.element.style.display = 'block';
			}
		}]);

		return Checkout;
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
		url: 'products.php',
		no_css: false
	};

	/**
  * Stores the container object.
  * 
  * @var \Core\Container
  */
	var Container$3 = void 0;

	/**
  * Stores the container object.
  * 
  * @var \Core\EventManager
  */
	var EventManager$4 = void 0;

	/**
  * Stores the request object.
  * 
  * @var \Helper\Request 
  */
	var Http$2 = void 0;

	/**
  * Stores the chunked per 
  * page products.
  * 
  * @var array
  */
	var chunkedProducts = void 0;

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

			Container$3 = container;
			Http$2 = http;
			EventManager$4 = eventManager;
			chunkedProducts = [];
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
				if ((typeof settings === 'undefined' ? 'undefined' : _typeof(settings)) != 'object') {
					throw new InvalidArgumentException$1();
				}

				this.settings = Common.extend(defaultSettings$4, settings);
				this.totalItems = null;

				document.addEventListener('DOMContentLoaded', function () {

					this.setElement(this.settings.element);

					this.addStyleTag();

					this.loadProducts(1);
				}.bind(this));
			}

			/**
    * Loads the products for the page.
    * 
    * @param number | pageNumber
    * @return void
    */

		}, {
			key: 'loadProducts',
			value: function loadProducts() {
				var pageNumber = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;

				if (Container$3.Pagination && Container$3.Pagination.booted) {
					switch (Container$3.Pagination.settings.proccessing) {
						case 'client-side':
							return this.loadPageProductsByClient(pageNumber);
							break;
						case 'server-side':
							return this.loadPageProductsByServer(pageNumber);
							break;
						default:
							throw new InvalidArgumentException$1('for proccessing you can choose \'server-side\' or \'client-side\' options.');
					}
				} else {
					this.loadPageProductsByServer();
				}
			}

			/**
    * Loads the products and 
    * replace them in the div container.
    *
    * @param number | pageNumber
    * @return void
    */

		}, {
			key: 'loadPageProductsByServer',
			value: function loadPageProductsByServer() {
				var pageNumber = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

				var request = this.getProducts(pageNumber);

				request.then(function (products) {

					this.currentItems = products;

					for (var i = 0; i < this.currentItems.length; i++) {
						var product = this.currentItems[i];
						EventManager$4.publish('products.loading', product);
					}

					EventManager$4.publish('products.loaded', products);
					this.replaceItems(products);
					resolve();
				}.bind(this)).catch(function (error) {});

				return request;
			}

			/**
    * Loads the products and 
    * replace them in the div container.
    *
    * @return void
    */

		}, {
			key: 'loadPageProductsByClient',
			value: function loadPageProductsByClient(pageNumber) {
				var request = void 0;

				if (this.totalItems == null) {
					// need to fetch them from the server.
					request = this.getProducts();
				} else {
					// no need to wait can resolve immediately with the products. 
					request = Promise.resolve(this.totalItems);
				}

				request.then(function (products) {
					this.totalItems = products;

					var pages = this.calculateClientPages(products);

					this.currentItems = pages[pageNumber - 1];

					for (var i = 0; i < this.currentItems.length; i++) {
						var product = this.currentItems[i];
						EventManager$4.publish('products.loading', product);
					}

					EventManager$4.publish('products.loaded', products);
					this.replaceItems(this.currentItems);
					Promise.resolve(this.currentItems);
				}.bind(this)).catch(function (error) {});

				return request;
			}

			/**
    * Calculates the amount of pages for the client.
    *
    * @param array | products
    * @return array
    */

		}, {
			key: 'calculateClientPages',
			value: function calculateClientPages(products) {
				// We are using pagination so we need to update it too.
				Container$3.Pagination.settings.total_items = products.length;

				var perPage = Container$3.Pagination.settings.per_page;

				// We need to calculate the pages on full http request 
				// only once. so we check to see if we have results in our cache.
				if (chunkedProducts.length != 0) {
					return chunkedProducts;
				}

				chunkedProducts = Common.array_chunk(products, perPage);
				return chunkedProducts;
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
				this.element = DOM.find(selector);

				if (this.element) {
					DOM.addClass(this.element, this.settings.class);
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

				this.element.innerHTML = '';
				products.forEach(function (product) {
					this.element.appendChild(product);
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
				var pageNumber = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

				var action = pageNumber ? this.settings.url + '?page=' + pageNumber : this.settings.url;

				return Http$2.get({
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
					class: 'action-buttons'
				});

				var addToCart = DOM.createElement('button', {
					class: 'add-to-cart',
					type: 'button',
					text: '+'
				});

				var favorite = DOM.createElement('button', {
					class: 'favorite',
					type: 'button',
					text: '&hearts;'
				});

				if (this.settings.add_button_class) {
					DOM.addClass(addToCart, this.settings.add_button_class);
				}

				if (this.settings.favorite_button_class) {
					DOM.addClass(favorite, this.settings.favorite_button_class);
				}

				tag.appendChild(addToCart);
				tag.appendChild(favorite);

				addToCart.addEventListener('click', function (e) {
					e.preventDefault();
					EventManager$4.publish('cart.product.added', attributes);
				});

				favorite.addEventListener('click', function (e) {
					e.preventDefault();
					this.innerHTML = '&#x2713;';
					EventManager$4.publish('cart.product.favorited', attributes);
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
				if (DOM.find('#Turbo-eCommerce-Products')) {
					return;
				}

				if (this.settings.no_css) {
					return;
				}

				var width = this.settings.width || 'auto';
				var height = this.settings.height || '200px';
				var minWidth = this.settings.min_width || '200px';
				var maxWidth = this.settings.max_width || '250px';

				var css = '\n\t\t\t.product {\n\t\t\t\tposition: relative;\n\t\t\t\tmargin: 5px 5px;\n\t\t\t\tborder: 1px solid #e4e4e4;\n\t\t\t\twidth: ' + width + ';\n\t\t\t\tmin-width: ' + minWidth + ';\n\t\t\t\tmax-width: ' + maxWidth + ';\n\t\t\t\theight: ' + height + ';\n\t\t\t\tcursor: pointer;\n\t\t\t\tcolor: #ffffff;\n\t\t\t\toverflow: hidden;\n\t\t\t}\n\n\t\t\t.product > .product-overlay {\n\t\t\t\tposition: absolute;\n\t\t\t\ttop: 0;\n\t\t\t\tleft: 0;\n\t\t\t\twidth: 100%;\n\t\t\t\theight: 100%;\n\t\t\t\topacity: 0.5;\n\t\t\t\tz-index: 5;\n\t\t\t\ttransition: 1s all;\n\t\t\t\ttransform: translateX(-250px);\n\t\t\t}\n\n\t\t\t.product:hover > .product-overlay {\n\t\t\t\tbackground: rgba(0, 0, 0, 0.45);\n\t\t\t\ttransform: translateX(0px);\n\t\t\t\topacity: 1;\n\t\t\t\ttransition: 0.5s all;\n\t\t\t}\n\n\t\t\t.product > img {\n\t\t\t\tposition: absolute;\n\t\t\t\tleft: 0;\n\t\t\t\ttop: 0;\n\t\t\t\twidth: 100%;\n\t\t\t\theight: 100%;\n\t\t\t}\n\n\t\t\t.product > .product-image {\n\t\t\t\tz-index: 0;\n\t\t\t\tposition: absolute;\n\t\t\t\ttop: 0;\n\t\t\t\tleft: 0;\n\t\t\t}\n\n\t\t\t.product > .product-overlay > .product-name, \n\t\t\t.product > .product-overlay > .product-price,\n\t\t\t.product > .product-overlay > .product-delivery-time {\n\t\t\t\tz-index: 1;\n\t\t\t\tposition: relative;\n\t\t\t\ttext-align: center;\n\t\t\t\tmargin-top: 25px;\n\t\t\t}\n\n\t\t\t.product > .product-overlay > .action-buttons {\n\t\t\t\twidth: 100%;\n\t\t\t\tmargin-top: 10px;\n\t\t\t\ttext-align: center;\n\t\t\t}\n\n\t\t\t.product > .product-overlay > .action-buttons > .favorite {\n\t\t\t\tmargin-left: 10px;\n\t\t\t}\n\n\t\t';

				DOM.addStyle('Turbo-eCommerce-Products', css);
			}

			/**
    * Hides the component from the DOM.
    *
    * @return void 
    */

		}, {
			key: 'hide',
			value: function hide() {
				this.element.style.display = 'none';
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

	var defaultMessage$4 = 'Sorry, no more pages.';

	var NotInPageRangeException = function (_ExceptionHandler5) {
		_inherits(NotInPageRangeException, _ExceptionHandler5);

		function NotInPageRangeException() {
			var message = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

			_classCallCheck(this, NotInPageRangeException);

			message = message || defaultMessage$4;

			var _this5 = _possibleConstructorReturn(this, (NotInPageRangeException.__proto__ || Object.getPrototypeOf(NotInPageRangeException)).call(this));

			_get(NotInPageRangeException.prototype.__proto__ || Object.getPrototypeOf(NotInPageRangeException.prototype), 'stackTrace', _this5).call(_this5, _this5, message);
			return _this5;
		}

		return NotInPageRangeException;
	}(ExceptionHandler);

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
		element: '.pagination',
		proccessing: 'client-side',
		class: '',
		per_page: 5,
		total_items: 5
	};

	/**
  * Stores the container object.
  *
  * @var \Core\Container
  */
	var Container$4 = void 0;

	/**
  * Stores the products component.
  *
  * @var \Components\Products
  */
	var Products$2 = void 0;

	/**
  * Stores the container object.
  * 
  * @var \Core\EventManager
  */
	var EventManager$5 = void 0;

	var Pagination = function () {
		/**
   * - Initialize the container object.
   * - Initialize the products component.
   *
   * @param \Core\Container | container
   * @param \Components\Products | products
   * @return void
   */
		function Pagination(container, products, events) {
			_classCallCheck(this, Pagination);

			this.setCurrent(1);
			Container$4 = container;
			Products$2 = products;
			EventManager$5 = events;
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
				if ((typeof settings === 'undefined' ? 'undefined' : _typeof(settings)) != 'object') {
					throw new InvalidArgumentException$1();
				}

				this.settings = Common.extend(defaultSettings$5, settings);

				this.setElement(this.settings.element);

				// Listen to when products are being loaded and update the pagination
				// with the actual items count.
				EventManager$5.subscribe('products.loaded', function (products) {
					this.totalPages = this.calculateTotalPages(this.settings.per_page, products.length);
					this.buildPagination();
				}.bind(this));

				// As a fallback choose the user's settings for the total items count.
				this.totalPages = this.calculateTotalPages(this.settings.per_page, this.settings.total_items);
				this.buildPagination();
			}

			/**
    * Builds the pagination.
    *
    * @return void
    */

		}, {
			key: 'buildPagination',
			value: function buildPagination() {
				this.links = this.createLinks();
				this.replaceLinks(this.links);
				this.bindEventListeners(this.links);
			}

			/**
    * Sets the element.
    *
    * @param string | selector
    * @return void
    */

		}, {
			key: 'setElement',
			value: function setElement(selector) {
				this.element = DOM.find(selector);

				DOM.addClass(this.element, this.settings.class);
			}

			/**
    * Replaces the links in the element.
    *
    * @param HTMLUListElement | links
    * @return void
    */

		}, {
			key: 'replaceLinks',
			value: function replaceLinks(links) {
				this.element.innerHTML = '';
				this.element.appendChild(links);
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
						throw new NotInPageRangeException('The page you requesting does not exists');
					}

					Products$2.loadProducts(requestedPage).then(function (products) {
						instance.setCurrent(requestedPage);
					});
				};

				this.previous.childNodes[0].onclick = function (e) {
					e.preventDefault();

					var requestedPage = instance.current - 1;

					if (instance.notInPageRange(requestedPage)) {
						throw new NotInPageRangeException('The page you requesting does not exists');
					}

					Products$2.loadProducts(requestedPage).then(function (products) {
						instance.setCurrent(requestedPage);
					});
				};

				for (var i = 0; i < this.pages.length; i++) {
					this.pages[i].childNodes[0].onclick = function (e) {
						e.preventDefault();

						var requestedPage = this.getAttribute('data-page-nr');

						Products$2.loadProducts(requestedPage).then(function (products) {
							instance.setCurrent(requestedPage);
						});
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

			/**
    * Hides the component from the DOM.
    *
    * @return void 
    */

		}, {
			key: 'hide',
			value: function hide() {
				this.element.style.display = 'none';
			}
		}]);

		return Pagination;
	}();

	var defaultMessage$5 = 'In order to use components you must register them with the shop!';

	var ComponentNotRegisteredException = function (_ExceptionHandler6) {
		_inherits(ComponentNotRegisteredException, _ExceptionHandler6);

		function ComponentNotRegisteredException() {
			var message = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

			_classCallCheck(this, ComponentNotRegisteredException);

			message = message || defaultMessage$5;

			var _this6 = _possibleConstructorReturn(this, (ComponentNotRegisteredException.__proto__ || Object.getPrototypeOf(ComponentNotRegisteredException)).call(this, message));

			_get(ComponentNotRegisteredException.prototype.__proto__ || Object.getPrototypeOf(ComponentNotRegisteredException.prototype), 'stackTrace', _this6).call(_this6, _this6, message);
			return _this6;
		}

		return ComponentNotRegisteredException;
	}(ExceptionHandler);

	// Components
	// Helpers
	// Exceptions


	var ComponentsProvider = function () {
		/**
   * - Set the container as a member.
   * - declare the components.
   *
   * @param \Core\Container | container
   * @return void
   */
		function ComponentsProvider(container) {
			_classCallCheck(this, ComponentsProvider);

			this.container = container;

			this.components = {};
			this.components.Filter = {};
			this.components.Services = {};
			this.components.Products = {};
			this.components.Pagination = {};
			this.components.Cart = {};
			this.components.Checkout = {};
		}

		/**
  * Registers the components.
  *
  * @param object | components
  * @return void
  */


		_createClass(ComponentsProvider, [{
			key: 'register',
			value: function register(components) {
				this.available = components;
				this.booted = [];
				this.components.Filter.booted = false;
				this.components.Services.booted = false;
				this.components.Products.booted = false;
				this.components.Pagination.booted = false;
				this.components.Cart.booted = false;
				this.components.Checkout.booted = false;

				var instance = this;

				this.container.bind('Filter', function (container, component) {
					instance.components[component] = new Filter(container);
					instance.components[component].booted = true;
					instance.booted.push(instance.components[component]);
					return instance.components[component];
				}, 'components');

				this.container.bind('Services', function (container, component) {
					instance.components[component] = new Services(container);
					instance.components[component].booted = true;
					instance.booted.push(instance.components[component]);
					return instance.components[component];
				}, 'components');

				this.container.bind('Products', function (container, component) {
					instance.components[component] = new Products(container, container.Request, container.Events);
					instance.components[component].booted = true;
					instance.booted.push(instance.components[component]);
					return instance.components[component];
				}, 'components');

				this.container.bind('Pagination', function (container, component) {
					instance.components[component] = new Pagination(container, instance.provide('Products'), container.Events);
					instance.components[component].booted = true;
					instance.booted.push(instance.components[component]);
					return instance.components[component];
				}, 'components');

				this.container.bind('Cart', function (container, component) {
					instance.components[component] = new Cart(container, container.Request, container.Events);
					instance.components[component].booted = true;
					instance.booted.push(instance.components[component]);
					return instance.components[component];
				}, 'components');

				this.container.bind('Checkout', function (container, component) {
					instance.components[component] = new Checkout(container, container.Request, container.Events);
					instance.components[component].booted = true;
					instance.booted.push(instance.components[component]);
					return instance.components[component];
				}, 'components');
			}

			/**
    * Provide a registered component.
    *
    * @param string | component
    * @return object
    */

		}, {
			key: 'provide',
			value: function provide(component) {
				if (Common.in_array(component, this.available)) {
					return this.container.make(component);
				}

				throw new ComponentNotRegisteredException('components must be registered in order to use them.');
			}

			/**
    * Checks if component exists.
    *
    * @param string | name
    * @return bool
    */

		}, {
			key: 'exists',
			value: function exists(name) {
				return this.components.hasOwnProperty(name);
			}
		}]);

		return ComponentsProvider;
	}();

	var defaultMessage$6 = 'Trying to bind an already existing bound.';

	var InvalidBindingException = function (_ExceptionHandler7) {
		_inherits(InvalidBindingException, _ExceptionHandler7);

		function InvalidBindingException() {
			var message = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

			_classCallCheck(this, InvalidBindingException);

			message = message || defaultMessage$6;

			var _this7 = _possibleConstructorReturn(this, (InvalidBindingException.__proto__ || Object.getPrototypeOf(InvalidBindingException)).call(this, message));

			_get(InvalidBindingException.prototype.__proto__ || Object.getPrototypeOf(InvalidBindingException.prototype), 'stackTrace', _this7).call(_this7, _this7, message);
			return _this7;
		}

		return InvalidBindingException;
	}(ExceptionHandler);

	// Helpers
	// Core
	// Exceptions
	/**
  * @file 
  * Container class.
  *
  * Handles/Controls the dependencies of ecommerce.
  */

	var Container$5 = function () {
		/**
   * - Initialize instances member.
   * - Register bindings.
   *
   * @return void
   */
		function Container$5() {
			_classCallCheck(this, Container$5);

			this.instances = [];
			this.register();
			this.registerProviders();
		}

		/**
   * Binds key to concrete class.
   *
   * @param string | key
   * @param class | concrete
   * @return void
   */


		_createClass(Container$5, [{
			key: 'bind',
			value: function bind(key, concrete) {
				var namespace = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

				if (typeof key != 'string') {
					throw new InvalidArgumentException$1('bind() expects the first parameter to be string, but ' + (typeof key === 'undefined' ? 'undefined' : _typeof(key)) + ' was passed instead.');
				}

				if (typeof concrete != 'function') {
					throw new InvalidArgumentException$1('bind() expects the second parameter to be a function, but ' + (typeof concrete === 'undefined' ? 'undefined' : _typeof(concrete)) + ' was passed instead.');
				}

				if (namespace) {
					if (typeof this[namespace] == 'undefined') {
						this[namespace] = {};
					}

					this[namespace][key] = concrete.bind(concrete, this, key);
				} else {
					this[key] = concrete.bind(concrete, this, key);
				}
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

				this.instances[key] = instance;
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
				if (typeof key != 'string' && (typeof key === 'undefined' ? 'undefined' : _typeof(key)) != 'object') {
					throw new InvalidArgumentException$1('getInstace() expects the first parameter to be a string, but ' + (typeof key === 'undefined' ? 'undefined' : _typeof(key)) + ' was passed instead.');
				}

				if ((typeof key === 'undefined' ? 'undefined' : _typeof(key)) == 'object') {
					return this.instances[key.constructor.name] || null;
				}

				return this.instances[key] || null;
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
				if ((typeof instance === 'undefined' ? 'undefined' : _typeof(instance)) == 'object' || (typeof instance === 'undefined' ? 'undefined' : _typeof(instance)) == 'symbol') {
					return typeof this.instances[instance.constructor.name] !== 'undefined';
				} else if (typeof instance == 'string') {
					return typeof this.instances[instance] !== 'undefined';
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
				} else if (typeof object == 'string' && this.Components.exists(object)) {
					instance = new this.components[object]();
					key = object;
					this.setInstance(key, instance);
				} else {
					throw new InvalidBindingException('Container.make() could not create the object!');
				}

				return instance;
			}

			/**
    * Remove all existing instances.
    *
    * @return void 
    */

		}, {
			key: 'flush',
			value: function flush() {
				this.instances = [];
			}

			/**
    * Registers the dependecies.
    *
    * @return void 
    */

		}, {
			key: 'register',
			value: function register() {
				this.setInstance('Request', new Request());
				this.setInstance('Events', new EventManager());
			}

			/**
    * Registers the providers.
    *
    * @return void 
    */

		}, {
			key: 'registerProviders',
			value: function registerProviders() {
				this.setInstance('Components', new ComponentsProvider(this));
			}
		}]);

		return Container$5;
	}();

	// Helpers
	// Core
	// Exceptions
	/**
  * Stores the default settings.
  *
  * @var object
  */


	var defaultSettings$6 = {
		debug_level: 'error',
		element: 'body',
		inject_libraries: [],
		components: ['Products', 'Services', 'Filter', 'Pagination', 'Cart'],
		loading_animation: true
	};

	/**
  * Stores the optional, 
  * injectable external libraries 
  *
  * @var object
  */
	var externalLibraries = {
		bootstrap: 'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css'
	};

	var TurboEcommerce = function () {
		/**
   * The entery for the shop.
   * - Setting the exception handler.
   * - Setting the ioc container.
   * - Extending the user settings.
   * - Setting the element.
   * - Disabling default errors.
   * - Passing calls via proxy to the components.
   *
   * @param object | settings
   * @return Proxy
   */
		function TurboEcommerce(settings) {
			_classCallCheck(this, TurboEcommerce);

			if ((typeof settings === 'undefined' ? 'undefined' : _typeof(settings)) != 'object') {
				throw new InvalidArgumentException$1();
			}

			this.settings = Common.extend(defaultSettings$6, settings);

			ExceptionHandler.setDebugLevel = this.settings.debug_level;

			this.loadExternalLibraries();

			this.container = new Container$5();

			this.components = this.container.make('Components');
			this.components.register(this.settings.components);

			document.addEventListener('DOMContentLoaded', function () {
				this.setElement(this.settings.element);

				if (this.settings.loading_animation) {
					startLoading.call(this);
				}

				this.addStyleTag();
			}.bind(this));

			return new Proxy(this, {
				get: function get(shop, source) {
					if (shop.components.exists(source)) {
						return shop.components.provide(source);
					}

					if (shop.container.instanceExist(source)) {
						return shop.container.getInstance(source);
					}
				}
			});
		}

		/**
   * Loads the external libraries which was specified.
   * 
   * @return void
   */


		_createClass(TurboEcommerce, [{
			key: 'loadExternalLibraries',
			value: function loadExternalLibraries() {
				var i = void 0;
				var libraries = this.settings.inject_libraries;

				for (i = 0; i < libraries.length; i++) {
					if (externalLibraries.hasOwnProperty(libraries[i])) {
						var id = 'Turbo-eCommerce-' + Str.ucfirst(libraries[i]);

						if (!DOM.find(id)) {
							DOM.addLinkedStyle(id, externalLibraries[libraries[i]]);
						}
					}
				}
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
				this.element = DOM.find(selector);

				DOM.addClass(this.element, this.settings.class);
			}

			/**
    * Add the eCommerce style tags to the DOM.
    *
    * @return void
    */

		}, {
			key: 'addStyleTag',
			value: function addStyleTag() {
				if (DOM.find('#Turboe-Commerce')) {
					return;
				}

				var css = '\n\t\t\t' + this.settings.element + ' {\n\t\t\t\tposition: relative;\n\t\t\t\tclear: both;\n\t\t\t}\n\n\t\t\t.loading-progress-bar {\n\t\t\t\tposition: fixed;\n\t\t\t\ttop: 0;\n\t\t\t\tleft: 0;\n\t\t\t\theight: 5px;\n\t\t\t\twidth: 100%;\n\t\t\t\t-webkit-box-shadow: 0px 0px 5px 1px rgba(168,168,168,1);\n\t\t\t\t-moz-box-shadow: 0px 0px 5px 1px rgba(168,168,168,1);\n\t\t\t\tbox-shadow: 0px 0px 5px 1px rgba(168,168,168,1);\n\t\t\t}\n\n\t\t\t.loading-progress-bar > .loading-progress-fill {\n\t\t\t\twidth: 100%;\n\t\t\t\theight: 100%;\n\t\t\t\tposition: absolute;\n\t\t\t\tbackground-color: #9dd2ff;\n\t\t\t\ttransform: translateX(-' + document.documentElement.clientWidth + 'px);\n\t\t\t}\n\t\t';

				DOM.addStyle('Turbo-eCommerce', css);
			}
		}]);

		return TurboEcommerce;
	}();

	/**
  * Attaches a loader to the top of the screen
  * and hides the content.
  * Stops automatically after 20% reached.
  *
  * @return void 
  */


	function startLoading() {
		var loader = DOM.createElement('div', {
			class: 'loading-progress-bar'
		});

		var fill = DOM.createElement('span', {
			class: 'loading-progress-fill'
		});

		loader.appendChild(fill);
		document.body.appendChild(loader);

		var progress = document.documentElement.clientWidth;
		var maxSize = document.documentElement.clientWidth * 0.80;

		window.requestAnimationFrame(progressDraw);

		var content = this.element;

		content.style.display = 'none';

		function progressDraw() {
			fill.style.transform = 'translateX(-' + progress + 'px)';
			progress -= 7;

			if (progress < maxSize) {
				done();
				return;
			}

			window.requestAnimationFrame(progressDraw);
		}

		function done() {
			fill.style.opacity = progress / 1000;
			fill.style.transform = 'translateX(-' + progress + 'px)';

			progress -= 15;

			if (progress <= 0) {
				content.style.display = 'block';

				if (typeof loader != 'undefined') {
					DOM.remove(loader);
				}

				return;
			}

			window.requestAnimationFrame(done);
		}
	}

	return TurboEcommerce;
}();
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlR1cmJvRWNvbW1lcmNlLmpzIl0sIm5hbWVzIjpbIlR1cmJvRWNvbW1lcmNlIiwiU3RyIiwic3RyaW5nIiwicmVwbGFjZSIsInRvTG93ZXJDYXNlIiwibGVuZ3RoIiwicG9zc2libGUiLCJpIiwiY2hhckF0IiwiTWF0aCIsImZsb29yIiwicmFuZG9tIiwidG9VcHBlckNhc2UiLCJzbGljZSIsImRlYnVnTGV2ZWwiLCJFeGNlcHRpb25IYW5kbGVyIiwibGV2ZWwiLCJ3aW5kb3ciLCJvbmVycm9yIiwiRXJyb3IiLCJjYXB0dXJlU3RhY2tUcmFjZSIsImNvbnN0cnVjdG9yIiwibmFtZSIsImVycm9yIiwibWVzc2FnZSIsImN1c3RvbUFjdGlvbnMiLCJoYW5kbGVFcnJvcnMiLCJoYW5kbGVXYXJuaW5ncyIsImhhbmRsZUluZm9zIiwiY29uc29sZSIsIndhcm4iLCJpbmZvIiwiZGVmYXVsdE1lc3NhZ2UiLCJJbnZhbGlkQXJndW1lbnRFeGNlcHRpb24kMSIsIkRPTSIsImVsZW1lbnQiLCJjbGFzc05hbWUiLCJuZXdDbGFzc05hbWUiLCJyZW1vdmVDbGFzcyIsImFkZENsYXNzIiwidW5kZWZpbmVkIiwiY2xhc3NOYW1lcyIsInNwbGl0IiwiZm9yRWFjaCIsImNsYXNzTGlzdCIsImFkZCIsImluZGV4T2YiLCJyZW1vdmUiLCJwYXJlbnROb2RlIiwicmVtb3ZlQ2hpbGQiLCJpZCIsImNzcyIsImhlYWQiLCJkb2N1bWVudCIsImdldEVsZW1lbnRzQnlUYWdOYW1lIiwic3R5bGVUYWciLCJjcmVhdGVFbGVtZW50IiwiQ1NTIiwibWluaWZ5Q3NzIiwiaW5uZXJIVE1MIiwic2V0QXR0cmlidXRlIiwiYXBwZW5kQ2hpbGQiLCJzb3VyY2UiLCJsaW5rZWRTdHlsZVRhZyIsImVsZW1lbnRUeXBlIiwib3B0aW9ucyIsIm9wdGlvbiIsInNlY29uZENsYXNzTmFtZSIsInRvZ2dsZSIsInNlbGVjdG9yIiwiY29udGV4dCIsInF1ZXJ5RWxlbWVudCIsInBhcmVudEVsZW1lbnQiLCJxdWVyeVNlbGVjdG9yQWxsIiwiaGFzQ2hpbGQiLCJjaGlsZEVsZW1lbnQiLCJub2RlIiwiQ29tbW9uIiwiY3VycmVudE9iamVjdCIsIm5ld09iamVjdCIsImV4dGVuZGVkIiwicHJvcCIsIk9iamVjdCIsInByb3RvdHlwZSIsImhhc093blByb3BlcnR5IiwiY2FsbCIsIm5lZWRsZSIsImh5c3RhY2siLCJBcnJheSIsInRvdGFsIiwic2l6ZSIsImlzTmFOIiwicGFyc2VJbnQiLCJjb2xsZWN0aW9uIiwiY2VpbCIsInN0YXJ0IiwiZW5kIiwicHVzaCIsIm9iamVjdCIsImRlZmF1bHRNZXNzYWdlJDEiLCJJbnZhbGlkRGF0YVN0cnVjdHVyZUV4Y2VwdGlvbiIsImRlZmF1bHRTZXR0aW5ncyIsImhlYWRlcnMiLCJhc3luYyIsIlJlcXVlc3QiLCJzZXR0aW5ncyIsImV4dGVuZCIsInNldERlZmF1bHRSZXF1ZXN0SGVhZGVyIiwiaGVhZGVyIiwib3BlbiIsIlhNTEh0dHBSZXF1ZXN0Iiwic2V0UmVxdWVzdEhlYWRlciIsInJlc3BvbnNlIiwiYXBwbHkiLCJhcmd1bWVudHMiLCJ4aHIiLCJiZWZvcmUiLCJQcm9taXNlIiwicmVzb2x2ZSIsInJlamVjdCIsImRhdGEiLCJ1cmwiLCJyZXNwb25zZVR5cGUiLCJkYXRhVHlwZSIsInRpbWVvdXQiLCJvbnJlYWR5c3RhdGVjaGFuZ2UiLCJyZWFkeVN0YXRlIiwic3RhdHVzIiwiYWZ0ZXIiLCJzZW5kIiwicXVlcnlTdHJpbmciLCJrZXlzIiwibWFwIiwia2V5IiwiZW5jb2RlVVJJQ29tcG9uZW50Iiwiam9pbiIsIkFjdGl2ZVhPYmplY3QiLCJyZXNwb25zZVRleHQiLCJKU09OIiwicGFyc2UiLCJkZWZhdWx0TWVzc2FnZSQyIiwiQmFkRXZlbnRDYWxsRXhjZXB0aW9uIiwiRXZlbnRNYW5hZ2VyIiwiZXZlbnRzIiwiY2FsbGJhY2siLCJJbnZhbGlkQXJndW1lbnRFeGNlcHRpb24iLCJDb29raWUiLCJ2YWx1ZSIsImRheXMiLCJzdHJpbmdpZnkiLCJleHBpcmVzIiwiZGF0ZSIsIkRhdGUiLCJzZXRUaW1lIiwiZ2V0VGltZSIsInRvR01UU3RyaW5nIiwiY29va2llIiwiY19zdGFydCIsImNfZW5kIiwidW5lc2NhcGUiLCJzdWJzdHJpbmciLCJkZWZhdWx0TWVzc2FnZSQzIiwiSW52YWxpZENhcnRJdGVtRXhjZXB0aW9uIiwiZGVmYXVsdFNldHRpbmdzJDEiLCJjb29raWVfbmFtZSIsInByZXZpZXdfY2xhc3MiLCJsb2FkZXIiLCJjbGFzcyIsIndpZHRoIiwiaGVpZ2h0IiwicGxhY2VtZW50IiwiZml4ZWQiLCJob3Zlcl9jb2xvciIsIm5vX2NzcyIsIkNvbnRhaW5lciIsIkV2ZW50TWFuYWdlciQyIiwiSHR0cCIsImxvYWRpbmdPdmVybGF5IiwiaXRlbXNEaXYiLCJDYXJ0IiwiY29udGFpbmVyIiwiaHR0cCIsImV2ZW50TWFuYWdlciIsInByZXZpZXdFbGVtZW50IiwiY3JlYXRlUHJldmlld0VsZW1lbnQiLCJpY29uIiwiY3JlYXRlSWNvbiIsInNldEVsZW1lbnQiLCJhZGRTdHlsZVRhZyIsImJpbmRFdmVudExpc3RlbmVycyIsImlzRW1wdHkiLCJnZXQiLCJzZXR1cENhcnQiLCJjYXJ0IiwiZW1wdHlPYmplY3QiLCJpdGVtcyIsImZhdm9yaXRlcyIsInNldCIsIml0ZW0iLCJxdWFudGl0eSIsImluY3JlbWVudGVkIiwiYWxyZWFkeUZhdm9yaXRlZCIsInNwbGljZSIsInRhYmxlIiwiYXR0cmlidXRlcyIsInRyIiwidGQiLCJhdHRyaWJ1dGUiLCJpbWFnZSIsInNyYyIsImNvbHNwYW4iLCJjaGVja291dCIsInRleHQiLCJvbmNsaWNrIiwiZSIsInByZXZlbnREZWZhdWx0IiwicHVibGlzaCIsImJpbmQiLCJmaW5kIiwicG9zaXRpb24iLCJhZGRTdHlsZSIsImNyZWF0ZUxvYWRlciIsInByZXZpZXdTdGFydExvYWRpbmciLCJnZXRDYXJ0SXRlbXMiLCJhZGRUb1ByZXZpZXciLCJpbnN0YW5jZSIsInNldFRpbWVvdXQiLCJwcmV2aWV3U3RvcExvYWRpbmciLCJ0b2dnbGVDYXJ0UHJldmlldyIsInN1YnNjcmliZSIsIm9wZW5DYXJ0UHJldmlldyIsImFkZEl0ZW0iLCJyZWxvYWRDYXJ0UHJldmlldyIsImZhdm9yaXRlSXRlbSIsImhhc0NsYXNzIiwic3dpdGNoQ2xhc3NlcyIsIm9wZW5pbmciLCJ0b2dnbGVDbGFzcyIsInN0eWxlIiwiZGlzcGxheSIsImNsb3NlIiwiZXZlbnQiLCJzdmciLCJjcmVhdGVFbGVtZW50TlMiLCJnIiwicGF0aCIsImRpdiIsImNvdW50IiwiZ3JvdXBzIiwicmVjdGFuZ2VscyIsImFuaW1hdGlvbnMiLCJyb3RhdGlvbiIsImdyb3VwIiwicmVjdGFuZ2VsIiwiYmVnaW4iLCJhbmltYXRlIiwidG9GaXhlZCIsImRlZmF1bHRTZXR0aW5ncyQyIiwiQ29udGFpbmVyJDEiLCJGaWx0ZXIiLCJhZGRFdmVudExpc3RlbmVyIiwibWluV2lkdGgiLCJtaW5fd2lkdGgiLCJkZWZhdWx0U2V0dGluZ3MkMyIsIkNvbnRhaW5lciQyIiwiRXZlbnRNYW5hZ2VyJDMiLCJIdHRwJDEiLCJDaGVja291dCIsImhpZGVBbGwiLCJzaG93IiwiaGlkZSIsIkNvbXBvbmVudHMiLCJib290ZWQiLCJjb21wb25lbnQiLCJkZWZhdWx0U2V0dGluZ3MkNCIsIml0ZW1fY2xhc3MiLCJhZGRfYnV0dG9uX2NsYXNzIiwiZmF2b3JpdGVfYnV0dG9uX2NsYXNzIiwiQ29udGFpbmVyJDMiLCJFdmVudE1hbmFnZXIkNCIsIkh0dHAkMiIsImNodW5rZWRQcm9kdWN0cyIsIlByb2R1Y3RzIiwidG90YWxJdGVtcyIsImxvYWRQcm9kdWN0cyIsInBhZ2VOdW1iZXIiLCJQYWdpbmF0aW9uIiwicHJvY2Nlc3NpbmciLCJsb2FkUGFnZVByb2R1Y3RzQnlDbGllbnQiLCJsb2FkUGFnZVByb2R1Y3RzQnlTZXJ2ZXIiLCJyZXF1ZXN0IiwiZ2V0UHJvZHVjdHMiLCJ0aGVuIiwicHJvZHVjdHMiLCJjdXJyZW50SXRlbXMiLCJwcm9kdWN0IiwicmVwbGFjZUl0ZW1zIiwiY2F0Y2giLCJwYWdlcyIsImNhbGN1bGF0ZUNsaWVudFBhZ2VzIiwidG90YWxfaXRlbXMiLCJwZXJQYWdlIiwicGVyX3BhZ2UiLCJhcnJheV9jaHVuayIsImlzQXJyYXkiLCJidWlsZFByb2R1Y3RzIiwiYWN0aW9uIiwiYXR0cmlidXRlc0NvbGxlY3Rpb24iLCJ0YWdUeXBlIiwiYnVpbHRQcm9kdWN0cyIsImJ1aWx0UHJvZHVjdCIsImJ1aWxkUHJvZHVjdCIsIm92ZXJsYXkiLCJpbl9hcnJheSIsInRhZyIsImtlYmFiQ2FzZSIsImFkZFRvQ2FydCIsInR5cGUiLCJmYXZvcml0ZSIsIm1heFdpZHRoIiwibWF4X3dpZHRoIiwiU2VydmljZXMiLCJkZWZhdWx0TWVzc2FnZSQ0IiwiTm90SW5QYWdlUmFuZ2VFeGNlcHRpb24iLCJkZWZhdWx0U2V0dGluZ3MkNSIsIkNvbnRhaW5lciQ0IiwiUHJvZHVjdHMkMiIsIkV2ZW50TWFuYWdlciQ1Iiwic2V0Q3VycmVudCIsInRvdGFsUGFnZXMiLCJjYWxjdWxhdGVUb3RhbFBhZ2VzIiwiYnVpbGRQYWdpbmF0aW9uIiwibGlua3MiLCJjcmVhdGVMaW5rcyIsInJlcGxhY2VMaW5rcyIsIm5leHQiLCJjaGlsZE5vZGVzIiwicmVxdWVzdGVkUGFnZSIsImN1cnJlbnQiLCJub3RJblBhZ2VSYW5nZSIsInByZXZpb3VzIiwiZ2V0QXR0cmlidXRlIiwiY2hhbmdlVXJsIiwic2V0QWN0aXZlTGluayIsInVsIiwiY3JlYXRlUGFnZUxpbmtzIiwiY3JlYXRlUHJldmlvdXNCdXR0b24iLCJjcmVhdGVOZXh0QnV0dG9uIiwicGFnZSIsInBhZ2VJdGVtIiwibGluayIsImxpIiwic3BhbjEiLCJzcGFuMiIsImhpc3RvcnkiLCJyZXBsYWNlU3RhdGUiLCJ1cGRhdGVVUkxQYXJhbWV0ZXIiLCJsb2NhdGlvbiIsImhyZWYiLCJ2YXJzIiwicGFydHMiLCJtIiwicGFyYW0iLCJwYXJhbVZhbCIsIm5ld0FkZGl0aW9uYWxVUkwiLCJ0ZW1wQXJyYXkiLCJiYXNlVVJMIiwiYWRkaXRpb25hbFVSTCIsInRlbXAiLCJyb3dzVGV4dCIsImRlZmF1bHRNZXNzYWdlJDUiLCJDb21wb25lbnROb3RSZWdpc3RlcmVkRXhjZXB0aW9uIiwiQ29tcG9uZW50c1Byb3ZpZGVyIiwiY29tcG9uZW50cyIsImF2YWlsYWJsZSIsIkV2ZW50cyIsInByb3ZpZGUiLCJtYWtlIiwiZGVmYXVsdE1lc3NhZ2UkNiIsIkludmFsaWRCaW5kaW5nRXhjZXB0aW9uIiwiQ29udGFpbmVyJDUiLCJpbnN0YW5jZXMiLCJyZWdpc3RlciIsInJlZ2lzdGVyUHJvdmlkZXJzIiwiY29uY3JldGUiLCJuYW1lc3BhY2UiLCJhbGlhcyIsImluc3RhbmNlRXhpc3QiLCJnZXRJbnN0YW5jZSIsInNldEluc3RhbmNlIiwiZXhpc3RzIiwiZGVmYXVsdFNldHRpbmdzJDYiLCJkZWJ1Z19sZXZlbCIsImluamVjdF9saWJyYXJpZXMiLCJsb2FkaW5nX2FuaW1hdGlvbiIsImV4dGVybmFsTGlicmFyaWVzIiwiYm9vdHN0cmFwIiwic2V0RGVidWdMZXZlbCIsImxvYWRFeHRlcm5hbExpYnJhcmllcyIsInN0YXJ0TG9hZGluZyIsIlByb3h5Iiwic2hvcCIsImxpYnJhcmllcyIsInVjZmlyc3QiLCJhZGRMaW5rZWRTdHlsZSIsImRvY3VtZW50RWxlbWVudCIsImNsaWVudFdpZHRoIiwiZmlsbCIsImJvZHkiLCJwcm9ncmVzcyIsIm1heFNpemUiLCJyZXF1ZXN0QW5pbWF0aW9uRnJhbWUiLCJwcm9ncmVzc0RyYXciLCJjb250ZW50IiwidHJhbnNmb3JtIiwiZG9uZSIsIm9wYWNpdHkiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxJQUFJQSxpQkFBa0IsWUFBWTtBQUNsQzs7QUFFQTs7Ozs7Ozs7QUFIa0MsS0FXNUJDLEdBWDRCO0FBQUE7QUFBQTtBQUFBOztBQUFBO0FBQUE7O0FBYWpDOzs7Ozs7QUFiaUMsNkJBbUJoQkMsTUFuQmdCLEVBb0JqQztBQUNDLFdBQU9BLE9BQU9DLE9BQVAsQ0FBZSxpQkFBZixFQUFrQyxPQUFsQyxFQUEyQ0MsV0FBM0MsRUFBUDtBQUNBOztBQUVEOzs7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cUIsRUFBdEIiLCJmaWxlIjoiVHVyYm9FY29tbWVyY2UuanMiLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgVHVyYm9FY29tbWVyY2UgPSAoZnVuY3Rpb24gKCkge1xuJ3VzZSBzdHJpY3QnO1xuXG4vKipcclxuICogQGZpbGUgXHJcbiAqIFN0ciBjbGFzcy5cclxuICpcclxuICogQWRkcyBzb21lIHVzZWZ1bCBmdW5jdGlvbmFsaXR5IGZvclxyXG4gKiBtYW5pcHVsYXRpbmcgc3RyaW5ncyBvciBjcmVhdGluZyBzdHJpbmcuXHJcbiAqL1xyXG5cclxuY2xhc3MgU3RyXHJcbntcclxuXHQvKipcclxuXHQgKiBDb252ZXJ0IGNhbWVsQ2FzZSB0byBrZWJhYi1jYXNlLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIHN0cmluZyB8IHN0cmluZ1xyXG5cdCAqIEByZXR1cm4gc3RyaW5nXHJcblx0ICovXHJcblx0c3RhdGljIGtlYmFiQ2FzZShzdHJpbmcpIFxyXG5cdHtcclxuXHRcdHJldHVybiBzdHJpbmcucmVwbGFjZSgvKFthLXpdKShbQS1aXSkvZywgJyQxLSQyJykudG9Mb3dlckNhc2UoKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEdlbmVyYXRlcyBhIHJhbmRvbSBzdHJpbmcuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gaW50ZWdlciB8IGxlbmd0aFxyXG5cdCAqIEByZXR1cm4gc3RyaW5nXHJcblx0ICovXHJcblx0c3RhdGljIHJhbmRvbShsZW5ndGgpIFxyXG5cdHtcclxuXHRcdGxldCBzdHJpbmcgPSAnJztcclxuXHRcdGxldCBwb3NzaWJsZSA9IFwiQUJDREVGR0hJSktMTU5PUFFSU1RVVldYWVphYmNkZWZnaGlqa2xtbm9wcXJzdHV2d3h5ejAxMjM0NTY3ODlcIjtcclxuXHJcblx0XHRmb3IgKGxldCBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XHJcblx0ICAgIFx0c3RyaW5nICs9IHBvc3NpYmxlLmNoYXJBdChNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBwb3NzaWJsZS5sZW5ndGgpKTtcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gc3RyaW5nO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQ2hhbmdlcyB0aGUgZmlyc3QgbGV0dGVyIFxyXG5cdCAqIG9mIHRoZSBzdHJpbmcgdG8gdXBwZXJjYXNlLlxyXG5cdCAqIFxyXG5cdCAqIEBwYXJhbSBzdHJpbmcgfCBzdHJpbmdcclxuXHQgKiBAcmV0dXJuIHN0cmluZ1xyXG5cdCAqL1xyXG5cdHN0YXRpYyB1Y2ZpcnN0KHN0cmluZykgXHJcblx0e1xyXG5cdCAgICByZXR1cm4gc3RyaW5nLmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpICsgc3RyaW5nLnNsaWNlKDEpO1xyXG5cdH1cclxufVxuXG4vKipcclxuICogU3RvcmVzIHRoZSBkZWJ1ZyBsZXZlbC5cclxuICpcclxuICogQHZhciBzdHJpbmcgXHJcbiAqL1xyXG5sZXQgZGVidWdMZXZlbDtcclxuXHJcbmNsYXNzIEV4Y2VwdGlvbkhhbmRsZXJcclxue1xyXG5cdC8qKlxyXG5cdCAqIFNldHRlciBmb3IgdGhlIGRlYnVnIGxldmVsLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIHN0cmluZyB8IGxldmVsXHJcblx0ICogQHJldHVybiB2b2lkXHJcblx0ICovXHJcblx0c3RhdGljIHNldCBzZXREZWJ1Z0xldmVsKGxldmVsKVxyXG5cdHtcclxuXHRcdC8vIFN1cHByZXNzIGVycm9ycyBkZXBlbmRzIG9uIHRoZSBkZWJ1ZyBsZXZlbC5cclxuXHRcdGlmIChsZXZlbCA9PSAnd2FybmluZycgfHwgbGV2ZWwgPT0gJ2luZm8nKSB7XHJcblx0XHRcdHdpbmRvdy5vbmVycm9yID0gZnVuY3Rpb24oKSB7IHJldHVybiB0cnVlOyB9O1xyXG5cdFx0fVxyXG5cclxuXHRcdGRlYnVnTGV2ZWwgPSBsZXZlbDtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEV4dGVuZGVkIGNvbnN0cnVjdG9yLCBjYXB0dXJlcyB0aGVcclxuXHQgKiBzdGFjayB0cmFjZS5cclxuXHQgKlxyXG5cdCAqIEByZXR1cm4gdm9pZFxyXG5cdCAqL1xyXG5cdGNvbnN0cnVjdG9yKClcclxuXHR7XHJcblx0XHRpZiAoRXJyb3IuY2FwdHVyZVN0YWNrVHJhY2UpIHtcclxuXHRcdFx0RXJyb3IuY2FwdHVyZVN0YWNrVHJhY2UodGhpcywgdGhpcy5jb25zdHJ1Y3Rvci5uYW1lKTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEhhbmRsZXMgYWxsIGV4Y2VwdGlvbnMuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gb2JqZWN0IHwgZXJyb3IgfCBUaHJvd2VuIEV4Y2VwdGlvbiBPYmplY3RcclxuXHQgKiBAcGFyYW0gc3RyaW5nIHwgbWVzc2FnZVxyXG5cdCAqIEByZXR1cm4gdm9pZFxyXG5cdCAqL1xyXG5cdHN0YWNrVHJhY2UoZXJyb3IsIG1lc3NhZ2UpIFxyXG5cdHtcclxuXHRcdHRoaXMuY3VzdG9tQWN0aW9ucyhlcnJvciwgbWVzc2FnZSk7XHJcblxyXG5cdFx0c3dpdGNoKGRlYnVnTGV2ZWwpXHJcblx0XHR7XHJcblx0XHRcdGNhc2UgJ2Vycm9yJzogdGhpcy5oYW5kbGVFcnJvcnMoZXJyb3IsIG1lc3NhZ2UpOyBicmVhaztcclxuXHRcdFx0Y2FzZSAnd2FybmluZyc6IHRoaXMuaGFuZGxlV2FybmluZ3MoZXJyb3IsIG1lc3NhZ2UpOyBicmVhaztcclxuXHRcdFx0Y2FzZSAnaW5mbyc6IHRoaXMuaGFuZGxlSW5mb3MoZXJyb3IsIG1lc3NhZ2UpOyBicmVhaztcclxuXHRcdFx0ZGVmYXVsdDogdGhpcy5oYW5kbGVJbmZvcyhlcnJvciwgbWVzc2FnZSk7IGJyZWFrO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogVGFrZSBhY3Rpb24gZm9yIHNwZWNpZmljIEV4Y2VwdGlvbnMuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gb2JqZWN0IHwgZXJyb3IgfCBUaHJvd2VuIEV4Y2VwdGlvbiBPYmplY3RcclxuXHQgKiBAcGFyYW0gc3RyaW5nIHwgbWVzc2FnZVxyXG5cdCAqIEByZXR1cm4gYm9vbFxyXG5cdCAqL1xyXG5cdGN1c3RvbUFjdGlvbnMoZXJyb3IsIG1lc3NhZ2UpXHJcblx0e1xyXG5cdFx0aWYgKGVycm9yLmNvbnN0cnVjdG9yLm5hbWUgPT0gJ0ludmFsaWRBcmd1bWVudEV4Y2VwdGlvbicpIHtcclxuXHRcdFx0Ly8gaGFuZGxlXHJcblx0XHR9IGVsc2UgaWYgKGVycm9yLmNvbnN0cnVjdG9yLm5hbWUgPT0gJ0ludmFsaWRCaW5kaW5nRXhjZXB0aW9uJykge1xyXG5cdFx0XHQvLyBoYW5kbGVcclxuXHRcdH0gZWxzZSBpZiAoZXJyb3IuY29uc3RydWN0b3IubmFtZSA9PSAnQmFkRXZlbnRDYWxsRXhjZXB0aW9uJykge1xyXG5cdFx0XHQvLyBoYW5kbGVcclxuXHRcdH0gZWxzZSBpZiAoZXJyb3IuY29uc3RydWN0b3IubmFtZSA9PSAnQ29tcG9uZW50c0V4Y2VwdGlvbicpIHtcclxuXHRcdFx0Ly8gaGFuZGxlXHJcblx0XHR9IGVsc2UgaWYgKGVycm9yLmNvbnN0cnVjdG9yLm5hbWUgPT0gJ0NvbXBvbmVudE5vdFJlZ2lzdGVyZWRFeGNlcHRpb24nKSB7XHJcblx0XHRcdC8vIGhhbmRsZVxyXG5cdFx0fSBlbHNlIGlmIChlcnJvci5jb25zdHJ1Y3Rvci5uYW1lID09ICdOb3RJblBhZ2VSYW5nZUV4Y2VwdGlvbicpIHtcclxuXHRcdFx0Ly8gaGFuZGxlXHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIGZhbHNlO1xyXG5cdH1cclxuXHJcblx0aGFuZGxlRXJyb3JzKGVycm9yLCBtZXNzYWdlKVxyXG5cdHtcclxuXHRcdGNvbnNvbGUuZXJyb3IoZXJyb3IuY29uc3RydWN0b3IubmFtZSArICc6ICcgKyBtZXNzYWdlKTtcclxuXHR9XHJcblxyXG5cdGhhbmRsZVdhcm5pbmdzKGVycm9yLCBtZXNzYWdlKVxyXG5cdHtcclxuXHRcdGNvbnNvbGUud2FybihlcnJvci5jb25zdHJ1Y3Rvci5uYW1lICsgJzogJyArIG1lc3NhZ2UpO1xyXG5cdH1cclxuXHJcblx0aGFuZGxlSW5mb3MoZXJyb3IsIG1lc3NhZ2UpXHJcblx0e1xyXG5cdFx0Y29uc29sZS5pbmZvKGVycm9yLmNvbnN0cnVjdG9yLm5hbWUgKyAnOiAnICsgbWVzc2FnZSk7XHJcblx0fVxyXG59XG5cbmxldCBkZWZhdWx0TWVzc2FnZSA9ICdBbiBpbnZhbGlkIGFyZ3VtZW50IHdhcyBwYXNzZWQuJztcclxuXHJcbmNsYXNzIEludmFsaWRBcmd1bWVudEV4Y2VwdGlvbiQxIGV4dGVuZHMgRXhjZXB0aW9uSGFuZGxlclxyXG57XHJcblx0Y29uc3RydWN0b3IobWVzc2FnZSA9IG51bGwpIFxyXG5cdHtcclxuXHRcdG1lc3NhZ2UgPSBtZXNzYWdlIHx8IGRlZmF1bHRNZXNzYWdlO1xyXG5cdFx0c3VwZXIobWVzc2FnZSk7XHJcbiAgICBcdHN1cGVyLnN0YWNrVHJhY2UodGhpcywgbWVzc2FnZSk7XHJcbiAgICB9XHJcbn1cblxuLyoqXHJcbiAqIEBmaWxlIFxyXG4gKiBET00gY2xhc3MuXHJcbiAqXHJcbiAqIEFkZHMgc29tZSB1c2VmdWwgZnVuY3Rpb25hbGl0eSBmb3JcclxuICogZmV0Y2hpbmcgb3IgbWFuaXB1bGF0aW5nIERPTSBlbGVtZW50cy5cclxuICovXHJcblxyXG5jbGFzcyBET01cclxue1xyXG5cdC8qKlxyXG5cdCAqIE1pbmlmaWVzIHRoZSBjc3MgdGV4dC5cclxuXHQgKiBcclxuXHQgKiBAcGFyYW0gc3RyaW5nIHwgc3RyaW5nXHJcblx0ICogQHJldHVybiBzdHJpbmdcclxuXHQgKi9cclxuXHRzdGF0aWMgbWluaWZ5Q3NzKHN0cmluZykgXHJcblx0e1xyXG5cdCAgICBzdHJpbmcgPSBzdHJpbmcucmVwbGFjZSgvXFwvXFwqKD86KD8hXFwqXFwvKVtcXHNcXFNdKSpcXCpcXC98W1xcclxcblxcdF0rL2csICcnKTtcclxuXHQgICAgc3RyaW5nID0gc3RyaW5nLnJlcGxhY2UoLyB7Mix9L2csICcgJyk7XHJcblx0ICAgIHN0cmluZyA9IHN0cmluZy5yZXBsYWNlKC8oW3s6fV0pL2csICckMScpO1xyXG5cdCAgICBzdHJpbmcgPSBzdHJpbmcucmVwbGFjZSgvKFs7LF0pIC9nLCAnJDEnKTtcclxuXHQgICAgc3RyaW5nID0gc3RyaW5nLnJlcGxhY2UoLyAhL2csICchJyk7XHJcblx0ICAgIFxyXG5cdCAgICByZXR1cm4gc3RyaW5nO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogU3dpdGNoZXMgYmV0d2VlbiB0d28gZ2l2ZW4gY2xhc3Nlcy5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSBvYmplY3QgfCBlbGVtZW50XHJcblx0ICogQHBhcmFtIHN0cmluZyB8IGNsYXNzTmFtZVxyXG5cdCAqIEBwYXJhbSBzdHJpbmcgfCBuZXdDbGFzc05hbWVcclxuXHQgKiBAcmV0dXJuIG9iamVjdFxyXG5cdCAqL1xyXG5cdHN0YXRpYyBzd2l0Y2hDbGFzc2VzKGVsZW1lbnQsIGNsYXNzTmFtZSwgbmV3Q2xhc3NOYW1lKSBcclxuXHR7XHJcblx0XHR0aGlzLnJlbW92ZUNsYXNzKGVsZW1lbnQsIGNsYXNzTmFtZSk7XHJcblx0XHR0aGlzLmFkZENsYXNzKGVsZW1lbnQsIG5ld0NsYXNzTmFtZSk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBBZGRzIGNsYXNzIHRvIGEgZ2l2ZW4gZWxlbWVudC5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSBvYmplY3QgfCBlbGVtZW50XHJcblx0ICogQHBhcmFtIHN0cmluZyB8IGNsYXNzTmFtZVxyXG5cdCAqIEByZXR1cm4gb2JqZWN0XHJcblx0ICovXHJcblx0c3RhdGljIGFkZENsYXNzKGVsZW1lbnQsIGNsYXNzTmFtZSkgXHJcblx0e1xyXG5cdFx0aWYoZWxlbWVudCA9PT0gbnVsbCkge1xyXG5cdFx0XHR0aHJvdyBuZXcgSW52YWxpZEFyZ3VtZW50RXhjZXB0aW9uJDE7XHJcblx0XHR9XHJcblxyXG5cdFx0aWYoISBjbGFzc05hbWUgfHwgY2xhc3NOYW1lID09ICcnIHx8IHR5cGVvZiBjbGFzc05hbWUgPT09IHVuZGVmaW5lZCkge1xyXG5cdFx0XHRyZXR1cm4gZWxlbWVudDtcclxuXHRcdH1cclxuXHJcblx0XHRsZXQgY2xhc3NOYW1lcyA9IGNsYXNzTmFtZS5zcGxpdCgnICcpO1xyXG5cclxuXHRcdGNsYXNzTmFtZXMuZm9yRWFjaChmdW5jdGlvbihuYW1lKSB7XHJcblx0XHRcdGVsZW1lbnQuY2xhc3NMaXN0LmFkZChuYW1lKTtcclxuXHRcdH0pO1xyXG5cdFx0XHJcblx0XHRyZXR1cm4gZWxlbWVudDtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIENoZWNrcyBpZiBhbiBlbGVtZW50IGhhcyBhIGNsYXNzLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIEhUTUxFbGVtZW50IHwgZWxlbWVudFxyXG5cdCAqIEBwYXJhbSBzdHJpbmcgfCBjbGFzc05hbWVcclxuXHQgKiBAcmV0dXJuIGJvb2xcclxuXHQgKi9cclxuXHRzdGF0aWMgaGFzQ2xhc3MoZWxlbWVudCwgY2xhc3NOYW1lKVxyXG5cdHtcclxuXHRcdGlmIChlbGVtZW50ID09PSBudWxsKSB7XHJcblx0XHRcdHRocm93IG5ldyBJbnZhbGlkQXJndW1lbnRFeGNlcHRpb24kMSgnaGFzQ2xhc3MoKSBleHBlY3RzIHRoZSBmaXJzdCBhcmd1bWVudCB0byBiZSBhbiBIVE1MRWxlbWVudCBidXQgbnVsbCB3YXMgcGFzc2VkLicpO1xyXG5cdFx0fVxyXG5cclxuXHRcdGlmICghIGNsYXNzTmFtZSB8fCBjbGFzc05hbWUgPT0gJycgfHwgdHlwZW9mIGNsYXNzTmFtZSA9PSAndW5kZWZpbmVkJykge1xyXG5cdFx0XHRyZXR1cm47XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIGVsZW1lbnQuY2xhc3NOYW1lLmluZGV4T2YoY2xhc3NOYW1lKSAhPSAtMTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFJlbW92ZXMgY2xhc3MgZnJvbSBhIGdpdmVuIGVsZW1lbnQuXHJcblx0ICogXHJcblx0ICogQHBhcmFtIG9iamVjdCB8IGVsZW1lbnRcclxuXHQgKiBAcGFyYW0gc3RyaW5nIHwgY2xhc3NOYW1lXHJcblx0ICogQHJldHVybiBvYmplY3RcclxuXHQgKi9cclxuXHRzdGF0aWMgcmVtb3ZlQ2xhc3MoZWxlbWVudCwgY2xhc3NOYW1lKSBcclxuXHR7XHJcblx0XHRpZihlbGVtZW50ID09IG51bGwpIHtcclxuXHRcdFx0dGhyb3cgbmV3IEludmFsaWRBcmd1bWVudEV4Y2VwdGlvbiQxO1xyXG5cdFx0fVxyXG5cclxuXHRcdGlmKGNsYXNzTmFtZSA9PSAnJykge1xyXG5cdFx0XHRlbGVtZW50LmNsYXNzTmFtZSA9ICcnO1xyXG5cdFx0fSBlbHNlIHtcclxuXHJcblx0XHRcdGxldCBjbGFzc05hbWVzID0gY2xhc3NOYW1lLnNwbGl0KCcgJyk7XHJcblxyXG5cdFx0XHRjbGFzc05hbWVzLmZvckVhY2goZnVuY3Rpb24obmFtZSkge1xyXG5cdFx0XHRcdGVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShuYW1lKTtcclxuXHRcdFx0fSk7XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIGVsZW1lbnQ7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBSZW1vdmVzIGFuIGVsZW1lbnQgZnJvbSB0aGUgRE9NLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIEhUTUxFbGVtZW50XHJcblx0ICogQHJldHVybiB2b2lkXHJcblx0ICovXHJcblx0c3RhdGljIHJlbW92ZShlbGVtZW50KVxyXG5cdHtcclxuXHRcdGVsZW1lbnQucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChlbGVtZW50KTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEFkZHMgc3R5bGUgdGFnIHdpdGggZ2l2ZW4gaWQgYW5kIGNzcyB0byB0aGUgRE9NLlxyXG5cdCAqIFxyXG5cdCAqIEBwYXJhbSBzdHJpbmcgfCBpZFxyXG5cdCAqIEBwYXJhbSBzdHJpbmcgfCBjc3NcclxuXHQgKiBAcmV0dXJuIHZvaWRcclxuXHQgKi9cclxuXHRzdGF0aWMgYWRkU3R5bGUoaWQsIGNzcylcclxuXHR7XHJcblx0XHRpZiAodHlwZW9mIGNzcyAhPSAnc3RyaW5nJykge1xyXG5cdFx0XHR0aHJvdyBuZXcgSW52YWxpZEFyZ3VtZW50RXhjZXB0aW9uJDE7XHJcblx0XHR9XHJcblxyXG5cdFx0bGV0IGhlYWQgPSBkb2N1bWVudC5oZWFkIHx8IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdoZWFkJylbMF07XHJcblx0XHRsZXQgc3R5bGVUYWcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzdHlsZScpO1xyXG5cclxuXHRcdC8vIHBpcGUgaXQgdGhyb3VnaCB0aGUgbWluZmllclxyXG5cdCAgICBsZXQgQ1NTID0gdGhpcy5taW5pZnlDc3MoY3NzKTtcclxuXHQgICAgLy8gYWRkaW5nIGl0IHRvIHRoZSBzdHlsZXRhZ1xyXG5cdCAgICBzdHlsZVRhZy5pbm5lckhUTUwgPSBDU1M7XHJcblx0ICAgIC8vIGdpdmUgYW4gaWQgdG8gcmVjb2duaXplIHRoZSBzdHlsZSB0YWdcclxuXHRcdHN0eWxlVGFnLnNldEF0dHJpYnV0ZSgnaWQnLCBpZCk7XHJcblx0XHQvLyBhcHBlbmRpbmcgdGhhdCBzdHlsZSB0YWcgdG8gdGhlIERPTSBoZWFkIHRhZ1xyXG5cdFx0aGVhZC5hcHBlbmRDaGlsZChzdHlsZVRhZyk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBBZGRzIGxpbmtlZCBzdHlsZSB0YWcgd2l0aCBnaXZlbiBpZCBhbmQgc3JjIHRvIHRoZSBET00uXHJcblx0ICogXHJcblx0ICogQHBhcmFtIHN0cmluZyB8IGlkXHJcblx0ICogQHBhcmFtIHN0cmluZyB8IHNvdXJjZVxyXG5cdCAqIEByZXR1cm4gdm9pZFxyXG5cdCAqL1xyXG5cdHN0YXRpYyBhZGRMaW5rZWRTdHlsZShpZCwgc291cmNlKSBcclxuXHR7XHJcblx0XHRpZiAodHlwZW9mIHNvdXJjZSAhPSAnc3RyaW5nJykge1xyXG5cdFx0XHR0aHJvdyBuZXcgSW52YWxpZEFyZ3VtZW50RXhjZXB0aW9uJDEoJ0RPTS5hZGRMaW5rZWRTdHlsZSgpIGV4Y3BlY3RzIHRoZSBzZWNvbmQgcGFyYW1ldGVyIHRvIGJlIHN0cmluZywgYnV0ICcgKyB0eXBlb2Ygc291cmNlICsgJyB3YXMgcGFzc2VkIGluc3RlYWQuJyk7XHJcblx0XHR9XHJcblxyXG5cdFx0bGV0IGhlYWQgPSBkb2N1bWVudC5oZWFkIHx8IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdoZWFkJylbMF07XHJcblx0XHRsZXQgbGlua2VkU3R5bGVUYWcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaW5rJyk7XHJcblxyXG5cdCAgICAvLyBnaXZlIGFuIGlkIHRvIHJlY29nbml6ZSB0aGUgc3R5bGUgdGFnXHJcblx0XHRsaW5rZWRTdHlsZVRhZy5zZXRBdHRyaWJ1dGUoJ2lkJywgaWQpO1xyXG5cdFx0bGlua2VkU3R5bGVUYWcuc2V0QXR0cmlidXRlKCdocmVmJywgc291cmNlKTtcclxuXHRcdGxpbmtlZFN0eWxlVGFnLnNldEF0dHJpYnV0ZSgncmVsJywgJ3N0eWxlc2hlZXQnKTtcclxuXHRcdGxpbmtlZFN0eWxlVGFnLnNldEF0dHJpYnV0ZSgndHlwZScsICd0ZXh0L2NzcycpO1xyXG5cdFx0Ly8gYXBwZW5kaW5nIHRoYXQgc3R5bGUgdGFnIHRvIHRoZSBET00gaGVhZCB0YWdcclxuXHRcdGhlYWQuYXBwZW5kQ2hpbGQobGlua2VkU3R5bGVUYWcpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQ3JlYXRlcyBhbiBlbGVtZW50IHdpdGggdGhlIGdpdmVuIG9wdGlvbnMuXHJcblx0ICogXHJcblx0ICogQHBhcmFtIHN0cmluZyB8IGVsZW1lbnRUeXBlXHJcblx0ICogQHBhcmFtIG9iamVjdCB8IG9wdGlvbnNcclxuXHQgKiBAcmV0dXJuIEhUTUxFbGVtZW50XHJcblx0ICovXHJcblx0c3RhdGljIGNyZWF0ZUVsZW1lbnQoZWxlbWVudFR5cGUsIG9wdGlvbnMpXHJcblx0e1xyXG5cdFx0bGV0IGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KGVsZW1lbnRUeXBlKTtcclxuXHRcclxuXHRcdGlmIChvcHRpb25zID09PSB1bmRlZmluZWQpIHtcclxuXHRcdFx0cmV0dXJuIGVsZW1lbnQ7XHJcblx0XHR9XHJcblxyXG5cdFx0Zm9yIChsZXQgb3B0aW9uIGluIG9wdGlvbnMpIHtcclxuXHRcdFx0aWYob3B0aW9uID09ICd0ZXh0Jykge1xyXG5cdFx0XHRcdGVsZW1lbnQuaW5uZXJIVE1MID0gb3B0aW9uc1tvcHRpb25dO1xyXG5cdFx0XHRcdGNvbnRpbnVlO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRlbGVtZW50LnNldEF0dHJpYnV0ZShvcHRpb24sIG9wdGlvbnNbb3B0aW9uXSk7XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIGVsZW1lbnQ7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBUb2dnbGVzIHRoZSBnaXZlbiBjbGFzc2VzLlxyXG5cdCAqIFxyXG5cdCAqIEBwYXJhbSBvYmplY3QgfCBlbGVtZW50XHJcblx0ICogQHBhcmFtIHN0cmluZyB8IGNsYXNzTmFtZVxyXG5cdCAqIEByZXR1cm4gYm9vbFxyXG5cdCAqL1xyXG5cdHN0YXRpYyB0b2dnbGVDbGFzcyhlbGVtZW50LCBjbGFzc05hbWUsIHNlY29uZENsYXNzTmFtZSlcclxuXHR7XHJcblx0XHRpZiAoZWxlbWVudCA9PSBudWxsIHx8IHR5cGVvZiBlbGVtZW50ID09ICd1bmRlZmluZWQnKSB7XHJcblx0XHRcdHRocm93IG5ldyBJbnZhbGlkQXJndW1lbnRFeGNlcHRpb24kMTtcclxuXHRcdH1cclxuXHJcblx0XHRzZWNvbmRDbGFzc05hbWUgPSBzZWNvbmRDbGFzc05hbWUgfHwgdW5kZWZpbmVkO1xyXG5cclxuXHRcdGlmKHNlY29uZENsYXNzTmFtZSkge1xyXG5cdFx0XHRlbGVtZW50LmNsYXNzTGlzdC50b2dnbGUoc2Vjb25kQ2xhc3NOYW1lKTtcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gZWxlbWVudC5jbGFzc0xpc3QudG9nZ2xlKGNsYXNzTmFtZSk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBGaW5kcyBhbiBlbGVtZW50IGluc2lkZSBvZiBwYXJlbnQuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gc3RyaW5nIHwgc2VsZWN0b3JcclxuXHQgKiBAcGFyYW0gb2JqZWN0IHwgY29udGV4dFxyXG5cdCAqIEByZXR1cm4gbWl4ZWRcclxuXHQgKi9cclxuXHRzdGF0aWMgZmluZChzZWxlY3RvciwgY29udGV4dCA9IHdpbmRvdy5kb2N1bWVudCkgXHJcblx0e1xyXG5cdFx0cmV0dXJuIHF1ZXJ5RWxlbWVudChzZWxlY3RvciwgY29udGV4dCk7XHJcblx0fVxyXG59XHJcblxyXG4vKipcclxuICogUXVlcmllcyBhbiBlbGVtZW50IGZyb20gdGhlIERPTS5cclxuICpcclxuICogQHBhcmFtIHN0cmluZyB8IHNlbGVjdG9yXHJcbiAqIEBwYXJhbSBvYmplY3QgfCBwYXJlbnRFbGVtZW50XHJcbiAqIEByZXR1cm4gbWl4ZWRcclxuICovXHJcbmZ1bmN0aW9uIHF1ZXJ5RWxlbWVudChzZWxlY3RvciwgcGFyZW50RWxlbWVudCkgXHJcbntcclxuXHRpZiAodHlwZW9mIHNlbGVjdG9yICE9ICdzdHJpbmcnKSB7XHJcblx0XHR0aHJvdyBuZXcgSW52YWxpZEFyZ3VtZW50RXhjZXB0aW9uJDEoJ3F1ZXJ5RWxlbWVudCgpIGV4cGVjdHMgZmlyc3QgcGFyYW1ldGVyIHRvIGJlIGEgc3RyaW5nLCBidXQgJyArIHR5cGVvZiBzZWxlY3RvciArICcgd2FzIHBhc3NlZCBpbnN0ZWFkLicpO1xyXG5cdH1cclxuXHJcblx0bGV0IGVsZW1lbnQgPSBwYXJlbnRFbGVtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3IpO1xyXG5cclxuXHRpZiAoZWxlbWVudC5sZW5ndGggPT0gMCkge1xyXG5cdFx0cmV0dXJuIG51bGw7XHJcblx0fVxyXG5cclxuXHRyZXR1cm4gKGVsZW1lbnQubGVuZ3RoID4gMSkgPyBlbGVtZW50IDogZWxlbWVudFswXTtcclxufVxyXG5cclxuLyoqXHJcbiAqIENoZWNrcyBpZiBwYXJlbnQgaGFzIGNoaWxkLlxyXG4gKlxyXG4gKiBAcGFyYW0gb2JqZWN0IHwgcGFyZW50RWxlbWVudFxyXG4gKiBAcGFyYW0gb2JqZWN0IHwgY2hpbGRFbGVtZW50XHJcbiAqIEByZXR1cm4gYm9vbFxyXG4gKi9cclxuZnVuY3Rpb24gaGFzQ2hpbGQocGFyZW50RWxlbWVudCwgY2hpbGRFbGVtZW50KSBcclxue1xyXG4gICAgIGxldCBub2RlID0gY2hpbGRFbGVtZW50LnBhcmVudE5vZGU7XHJcbiAgICAgXHJcbiAgICAgd2hpbGUgKG5vZGUgIT0gbnVsbCkge1xyXG4gICAgICAgICBpZiAobm9kZSA9PSBwYXJlbnRFbGVtZW50KSB7XHJcbiAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgfVxyXG4gICAgICAgICBub2RlID0gbm9kZS5wYXJlbnROb2RlO1xyXG4gICAgIH1cclxuICAgICBcclxuICAgICByZXR1cm4gZmFsc2U7XHJcbn1cblxuLyoqXHJcbiAqIEBmaWxlIFxyXG4gKiBDb21tb24gY2xhc3MuXHJcbiAqXHJcbiAqIEFkZHMgc29tZSB1c2VmdWwgZnVuY3Rpb25hbGl0eSBmb3JcclxuICogY29tbW9uIHRhc2tzIC0gZGF0YSBjaGVja3Mgb3IgZGF0YSBtYW5pcHVsYXRpb24uXHJcbiAqL1xyXG5cclxuY2xhc3MgQ29tbW9uXHJcbntcclxuXHQvKipcclxuXHQgKiBFeHRlbmQgYW4gb2JqZWN0LlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIG9iamVjdCB8IGN1cnJlbnRPYmplY3RcclxuXHQgKiBAcGFyYW0gb2JqZWN0IHwgbmV3T2JqZWN0XHJcblx0ICogQHJldHVybiBvYmplY3RcclxuXHQgKi9cclxuXHRzdGF0aWMgZXh0ZW5kKGN1cnJlbnRPYmplY3QsIG5ld09iamVjdCkge1xyXG5cdFx0dmFyIGV4dGVuZGVkID0ge307XHJcblx0ICAgIHZhciBwcm9wO1xyXG5cclxuXHQgICAgZm9yIChwcm9wIGluIGN1cnJlbnRPYmplY3QpIHtcclxuXHQgICAgICAgIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoY3VycmVudE9iamVjdCwgcHJvcCkpIHtcclxuXHQgICAgICAgICAgICBleHRlbmRlZFtwcm9wXSA9IGN1cnJlbnRPYmplY3RbcHJvcF07XHJcblx0ICAgICAgICB9XHJcblx0ICAgIH1cclxuXHJcblx0ICAgIGZvciAocHJvcCBpbiBuZXdPYmplY3QpIHtcclxuXHQgICAgICAgIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwobmV3T2JqZWN0LCBwcm9wKSkge1xyXG5cdCAgICAgICAgICAgIGV4dGVuZGVkW3Byb3BdID0gbmV3T2JqZWN0W3Byb3BdO1xyXG5cdCAgICAgICAgfVxyXG5cdCAgICB9XHJcblxyXG5cdCAgICByZXR1cm4gZXh0ZW5kZWQ7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBDaGVja3MgZm9yIGEgbmVlZGxlIGluIGh5c3RhY2sgYXJyYXkuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gbWl4ZWQgfCBuZWVkbGVcclxuXHQgKiBAcGFyYW0gb2JqZWN0IHwgb2JqZWN0XHJcblx0ICogQHJldHVybiBib29sXHJcblx0ICpcclxuXHQgKi9cclxuXHRzdGF0aWMgaW5fYXJyYXkobmVlZGxlLCBoeXN0YWNrKSB7XHJcblx0XHRpZiAodHlwZW9mIGh5c3RhY2sgPT0gJ3VuZGVmaW5lZCcgfHwgaHlzdGFjay5jb25zdHJ1Y3RvciAhPT0gQXJyYXkpIHtcclxuXHRcdFx0dGhyb3cgbmV3IEludmFsaWRBcmd1bWVudEV4Y2VwdGlvbiQxKCdDb21tb24uaW5fYXJyYXkoKSBleHBlY3RzIHRoZSBzZWNvbmQgcGFyYW1ldGVyIHRvIGJlIGFuIGFycmF5LCBidXQgJyArIHR5cGVvZiBoeXN0YWNrICsgJyB3YXMgcGFzc2QgaW5zdGVhZCcpO1xyXG5cdFx0fVxyXG5cclxuXHRcdGZvciAodmFyIGkgPSAwOyBpIDw9IGh5c3RhY2subGVuZ3RoOyBpKyspIHtcclxuXHRcdFx0aWYgKG5lZWRsZSA9PSBoeXN0YWNrW2ldKSB7XHJcblx0XHRcdFx0cmV0dXJuIHRydWU7XHRcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdFxyXG5cdFx0cmV0dXJuIGZhbHNlO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogVGFrZXMgYW4gYXJyYXkgYW5kIGNodW5rcyBpdC5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSBhcnJheSB8IHRvdGFsXHJcblx0ICogQHBhcmFtIG51bWJlciB8IGNodW5rc1xyXG5cdCAqIEByZXR1cm4gYXJyYXlcclxuXHQgKi9cclxuXHRzdGF0aWMgYXJyYXlfY2h1bmsodG90YWwsIHNpemUgPSA1KVxyXG5cdHsgICAgICAgIFxyXG4gICAgICBcdGlmIChpc05hTihzaXplKSkge1xyXG4gICAgICBcdFx0dGhyb3cgbmV3IEludmFsaWRBcmd1bWVudEV4Y2VwdGlvbiQxKCdDb21tb24uYXJyYXlfY2h1bmsoKSBleHBlY3RzIHRoZSBzZWNvbmQgcGFyYW1ldGVyIHRvIGJlIGEgbnVtYmVyLCBidXQgJyArIHR5cGVvZiBzaXplICsgJyBwYXNzZWQgaW5zdGVhZC4nKVxyXG4gICAgICBcdH1cclxuXHJcbiAgICAgIFx0c2l6ZSA9IHBhcnNlSW50KHNpemUpO1xyXG4gICAgICAgXHJcbiAgICAgICBcdGxldCBpO1xyXG4gICAgICAgXHRsZXQgY29sbGVjdGlvbiA9IFtdO1xyXG5cclxuICAgICAgICAvLyBhZGQgZWFjaCBjaHVuayB0byB0aGUgcmVzdWx0XHJcbiAgICAgICAgZm9yIChpID0gMDsgaSA8IE1hdGguY2VpbCh0b3RhbC5sZW5ndGggLyBzaXplKTsgaSsrKSB7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB2YXIgc3RhcnQgPSBpICogc2l6ZTtcclxuICAgICAgICAgICAgdmFyIGVuZCA9IHN0YXJ0ICsgc2l6ZTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGNvbGxlY3Rpb24ucHVzaCh0b3RhbC5zbGljZShzdGFydCwgZW5kKSk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICByZXR1cm4gY29sbGVjdGlvbjtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIENoZWNrcyBpZiBhbiBvYmplY3QgaXMgZW1wdHkuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gb2JqZWN0IHwgb2JqZWN0XHJcblx0ICogQHJldHVybiBib29sXHJcblx0ICovXHJcblx0c3RhdGljIGVtcHR5T2JqZWN0KG9iamVjdCkge1xyXG5cdFx0Zm9yIChsZXQgcHJvcCBpbiBvYmplY3QpIHtcclxuXHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiB0cnVlO1xyXG5cdH1cclxuXHJcblxyXG5cdC8qKlxyXG5cdCAqIENoZWNrcyBpZiBhIGdpdmVuIG9iamVjdCBjb250YWluZWQgaW4gYW4gYXJyYXkuXHJcblx0ICogXHJcblx0ICogQHBhcmFtIG9iamVjdCB8IG9iamVjdFxyXG5cdCAqIEBwYXJhbSBhcnJheSB8IGhheXN0YWNrXHJcblx0ICogQHJldHVybiBib29sXHJcblx0ICovXHJcblx0c3RhdGljIGNvbnRhaW5zT2JqZWN0KG9iamVjdCwgaHlzdGFjaykgXHJcblx0e1xyXG5cdCAgICBsZXQgaTtcclxuXHJcblx0ICAgIGZvciAoaSA9IDA7IGkgPCBoeXN0YWNrLmxlbmd0aDsgaSsrKSB7XHJcblx0ICAgICAgICBpZiAodHlwZW9mIG9iamVjdCA9PSAnc3RyaW5nJyAmJiBoeXN0YWNrW2ldLmNvbnN0cnVjdG9yLm5hbWUgPT09IG9iamVjdCkge1xyXG5cdCAgICAgICAgXHRyZXR1cm4gdHJ1ZTtcclxuXHQgICAgICAgIH1cclxuXHJcblx0ICAgICAgICBpZiAoaHlzdGFja1tpXSA9PT0gb2JqZWN0KSB7XHJcblx0ICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcblx0ICAgICAgICB9XHJcblx0ICAgIH1cclxuXHJcblx0ICAgIHJldHVybiBmYWxzZTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIENoZWNrcyBpZiBhIGdpdmVuIHBhcmFtZXRlciBpcyBhbiBvYmplY3QuXHJcblx0ICogXHJcblx0ICogQHBhcmFtIG9iamVjdCB8IG9iamVjdFxyXG5cdCAqIEByZXR1cm4gYm9vbFxyXG5cdCAqL1xyXG5cdHN0YXRpYyBpc09iamVjdChvYmplY3QpIFxyXG5cdHtcclxuXHRcdHJldHVybiB0eXBlb2Ygb2JqZWN0ID09ICdvYmplY3QnO1xyXG5cdH1cclxufVxuXG5sZXQgZGVmYXVsdE1lc3NhZ2UkMSA9ICdUaGUgZGF0YSBzdHJ1Y3R1cmUgaXMgaW52YWxpZCc7XHJcblxyXG5jbGFzcyBJbnZhbGlkRGF0YVN0cnVjdHVyZUV4Y2VwdGlvbiBleHRlbmRzIEV4Y2VwdGlvbkhhbmRsZXJcclxue1xyXG5cdGNvbnN0cnVjdG9yKG1lc3NhZ2UgPSBudWxsKSBcclxuXHR7XHJcblx0XHRtZXNzYWdlID0gbWVzc2FnZSB8fCBkZWZhdWx0TWVzc2FnZSQxO1xyXG5cdFx0c3VwZXIobWVzc2FnZSk7XHJcbiAgICBcdHN1cGVyLnN0YWNrVHJhY2UodGhpcywgbWVzc2FnZSk7XHJcbiAgICB9XHJcbn1cblxuLyoqXHJcbiAqIEBmaWxlIFxyXG4gKiBSZXF1ZXN0IGNsYXNzLlxyXG4gKlxyXG4gKiBIYW5kbGVzIGFqYXggcmVxdWVzdHMgUE9TVCwgR0VUIGV0Yy4uLlxyXG4gKi9cclxuXHJcbi8qKlxyXG4gKiBTdG9yZXMgdGhlIGRlZmF1bHQgc2V0dGluZ3MuXHJcbiAqXHJcbiAqIEB2YXIgb2JqZWN0XHJcbiAqL1xyXG5cclxubGV0IGRlZmF1bHRTZXR0aW5ncyA9IHtcclxuXHRoZWFkZXJzOiB7XHJcblx0XHQnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nXHJcblx0fSxcclxuXHRhc3luYzogdHJ1ZVxyXG59O1xyXG5cclxuY2xhc3MgUmVxdWVzdFxyXG57XHJcblx0LyoqXHJcblx0ICogLSBJbml0aWFsaXplIHRoZSBzZXR0aW5ncyBvYmplY3QuXHJcblx0ICogLSBJbml0aWFsaXplIHRoZSB4aHIgb2JqZWN0LlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIG9iamVjdCB8IHNldHRpbmdzXHJcblx0ICogQHJldHVybiB2b2lkXHJcblx0ICovXHJcblx0Y29uc3RydWN0b3Ioc2V0dGluZ3MpXHJcblx0e1xyXG5cdFx0dGhpcy5zZXR0aW5ncyA9IENvbW1vbi5leHRlbmQoZGVmYXVsdFNldHRpbmdzLCBzZXR0aW5ncyk7XHJcblx0XHR0aGlzLnNldERlZmF1bHRSZXF1ZXN0SGVhZGVyKCk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBTZXRzIHRoZSBkZWZhdWx0IHJlcXVlc3QgaGVhZGVycy5cclxuXHQgKlxyXG5cdCAqIEByZXR1cm4gdm9pZFxyXG5cdCAqL1xyXG5cdHNldERlZmF1bHRSZXF1ZXN0SGVhZGVyKClcclxuXHR7XHJcblx0XHRsZXQgaGVhZGVyO1xyXG5cdFx0bGV0IGhlYWRlcnMgPSB0aGlzLnNldHRpbmdzLmhlYWRlcnM7XHJcblx0XHRsZXQgYXN5bmMgPSB0aGlzLnNldHRpbmdzLmFzeW5jO1xyXG5cdFx0bGV0IG9wZW4gPSBYTUxIdHRwUmVxdWVzdC5wcm90b3R5cGUub3BlbjtcclxuXHRcdGxldCBzZXRSZXF1ZXN0SGVhZGVyID0gWE1MSHR0cFJlcXVlc3QucHJvdG90eXBlLnNldFJlcXVlc3RIZWFkZXI7XHJcblxyXG5cdFx0WE1MSHR0cFJlcXVlc3QucHJvdG90eXBlLm9wZW4gPSBmdW5jdGlvbigpIHtcclxuXHRcdFx0dmFyIHJlc3BvbnNlID0gb3Blbi5hcHBseSh0aGlzLCBhcmd1bWVudHMsIGFzeW5jKTtcclxuXHJcblx0XHRcdGZvciAoaGVhZGVyIGluIGhlYWRlcnMpIHtcclxuXHRcdFx0XHR0aGlzLnNldFJlcXVlc3RIZWFkZXIoaGVhZGVyLCBoZWFkZXJzW2hlYWRlcl0pO1xyXG5cdFx0XHR9XHJcblxyXG5cdCAgXHRcdHJldHVybiByZXNwb25zZTtcclxuXHRcdH07XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBNYWtlcyBhIFBPU1QgcmVxdWVzdC5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSBvYmplY3QgfCBvcHRpb25zXHJcblx0ICogQHJldHVybiBQcm9taXNlXHJcblx0ICovXHJcblx0cG9zdChvcHRpb25zKVxyXG5cdHtcclxuXHRcdGxldCB4aHIgPSB0aGlzLnhocjtcclxuXHJcblx0XHRpZihvcHRpb25zLmhhc093blByb3BlcnR5KCdiZWZvcmUnKSAmJiB0eXBlb2Ygb3B0aW9ucy5iZWZvcmUgPT0gJ2Z1bmN0aW9uJykge1xyXG5cdFx0XHRvcHRpb25zLmJlZm9yZS5jYWxsKHRoaXMpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcclxuXHRcdFx0aWYodHlwZW9mIG9wdGlvbnMgIT09ICdvYmplY3QnKSB7XHJcblx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKCdnZXQgZXhwZWN0aW5nIGEganNvbiBvYmplY3QgdG8gYmUgcGFzc2VkIGFzIGFuIGFyZ3VtZW50LCBidXQgJysgdHlwZW9mIG9wdGlvbnMgKyAnIHdhcyBwYXNzZWQuJyk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdG9wdGlvbnMuZGF0YSA9IG9wdGlvbnMuZGF0YSB8fCB7fTtcclxuXHJcblx0XHRcdGlmKHR5cGVvZiBvcHRpb25zLmRhdGEgIT09ICdvYmplY3QnKSB7XHJcblx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKCdkYXRhIHByb3BlcnR5IGV4cGVjdGluZyBhIGpzb24gb2JqZWN0IHRvIGJlIHBhc3NlZCBhcyBhbiBhcmd1bWVudCwgYnV0ICcgKyB0eXBlb2Ygb3B0aW9ucy5kYXRhICsgJyB3YXMgcGFzc2VkLicpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHR4aHIub3BlbignUE9TVCcsIG9wdGlvbnMudXJsLCB0cnVlKTtcclxuXHJcblx0XHRcdHhoci5yZXNwb25zZVR5cGUgPSBvcHRpb25zLmRhdGFUeXBlIHx8ICdqc29uJztcclxuXHRcdFx0eGhyLnRpbWVvdXQgPSBvcHRpb25zLnRpbWVvdXQgfHwgMzAwMDtcclxuXHJcblx0XHRcdHhoci5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBmdW5jdGlvbigpIHtcclxuXHRcdFx0ICAgIGlmKHRoaXMucmVhZHlTdGF0ZSAhPSA0IHx8IHRoaXMuc3RhdHVzICE9IDIwMCkge1xyXG5cdFx0XHQgICAgXHRyZXR1cm47XHJcblx0XHRcdCAgICB9XHJcblx0ICAgICAgIFx0XHJcbiAgICAgICBcdFx0XHRyZXNvbHZlKHRoaXMucmVzcG9uc2UpO1xyXG4gICAgICAgXHRcdFx0XHJcbiAgICAgICBcdFx0XHRpZihvcHRpb25zLmhhc093blByb3BlcnR5KCdhZnRlcicpICYmIHR5cGVvZiBvcHRpb25zLmFmdGVyID09ICdmdW5jdGlvbicpIHtcclxuXHRcdFx0XHRcdG9wdGlvbnMuYWZ0ZXIuY2FsbCh0aGlzKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH07XHJcblxyXG5cdFx0XHR4aHIub25lcnJvciA9IGZ1bmN0aW9uKG1lc3NhZ2UpIHtcclxuXHRcdFx0XHRpZihvcHRpb25zLmhhc093blByb3BlcnR5KCdlcnJvcicpICYmIHR5cGVvZiBvcHRpb25zLmVycm9yID09ICdmdW5jdGlvbicpIHtcclxuXHRcdFx0XHRcdG9wdGlvbnMuZXJyb3IobWVzc2FnZSk7XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRyZWplY3QobWVzc2FnZSk7XHJcblx0XHRcdH07XHJcblxyXG5cdFx0XHRpZighIG9wdGlvbnMuZGF0YSkge1xyXG5cdFx0XHRcdHhoci5zZW5kKG51bGwpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHR2YXIgcXVlcnlTdHJpbmcgPSBPYmplY3Qua2V5cyhvcHRpb25zLmRhdGEpLm1hcChmdW5jdGlvbihrZXkpIHtcclxuXHRcdCAgICAgICAgICAgIHJldHVybiBlbmNvZGVVUklDb21wb25lbnQoa2V5KSArICc9JyArXHJcblx0XHQgICAgICAgICAgICAgICAgXHRlbmNvZGVVUklDb21wb25lbnQob3B0aW9ucy5kYXRhW2tleV0pO1xyXG5cdFx0ICAgICAgICBcdH0pLmpvaW4oJyYnKTtcclxuXHJcblx0XHRcdHhoci5zZW5kKHF1ZXJ5U3RyaW5nKTtcclxuXHRcdH0pO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogTWFrZXMgYSBHRVQgYWpheCByZXF1ZXN0LlxyXG5cdCAqIFxyXG5cdCAqIEBwYXJhbSBvYmplY3QgfCBvcHRpb25zXHJcblx0ICogQHJldHVybiBQcm9taXNlXHJcblx0ICovXHJcblx0Z2V0KG9wdGlvbnMpXHJcblx0e1xyXG5cdFx0bGV0IHhociA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpIHx8IG5ldyBBY3RpdmVYT2JqZWN0KFwiTWljcm9zb2Z0LlhNTEhUVFBcIik7XHRcdFx0XHJcblxyXG5cdFx0aWYob3B0aW9ucy5oYXNPd25Qcm9wZXJ0eSgnYmVmb3JlJykgJiYgdHlwZW9mIG9wdGlvbnMuYmVmb3JlID09ICdmdW5jdGlvbicpIHtcclxuXHRcdFx0b3B0aW9ucy5iZWZvcmUuY2FsbCh0aGlzKTtcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XHJcblx0XHRcdGlmKHR5cGVvZiBvcHRpb25zICE9PSAnb2JqZWN0Jykge1xyXG5cdFx0XHRcdHRocm93IG5ldyBFcnJvcignZ2V0IGV4cGVjdGluZyBhIGpzb24gb2JqZWN0IHRvIGJlIHBhc3NlZCBhcyBhbiBhcmd1bWVudCwgYnV0ICcrIHR5cGVvZiBvcHRpb25zICsgJyB3YXMgcGFzc2VkLicpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRvcHRpb25zLmRhdGEgPSBvcHRpb25zLmRhdGEgfHwge307XHJcblxyXG5cdFx0XHRpZih0eXBlb2Ygb3B0aW9ucy5kYXRhICE9PSAnb2JqZWN0Jykge1xyXG5cdFx0XHRcdHRocm93IG5ldyBFcnJvcignZGF0YSBwcm9wZXJ0eSBleHBlY3RpbmcgYSBqc29uIG9iamVjdCB0byBiZSBwYXNzZWQgYXMgYW4gYXJndW1lbnQsIGJ1dCAnICsgdHlwZW9mIG9wdGlvbnMuZGF0YSArICcgd2FzIHBhc3NlZC4nKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0eGhyLm9wZW4oJ0dFVCcsIG9wdGlvbnMudXJsLCB0cnVlKTtcclxuXHJcblx0XHRcdHhoci5yZXNwb25zZVR5cGUgPSBvcHRpb25zLmRhdGFUeXBlIHx8ICdqc29uJztcclxuXHRcdFx0eGhyLnRpbWVvdXQgPSBvcHRpb25zLnRpbWVvdXQgfHwgMzAwMDtcclxuXHJcblx0XHRcdGlmICh4aHIucmVzcG9uc2VUeXBlID09ICdqc29uJykge1xyXG5cdFx0XHRcdHhoci5zZXRSZXF1ZXN0SGVhZGVyKCdDb250ZW50LVR5cGUnLCAnYXBwbGljYXRpb24vanNvbicpO1xyXG5cdFx0XHRcdHhoci5zZXRSZXF1ZXN0SGVhZGVyKCdBY2NlcHQnLCAnYXBwbGljYXRpb24vanNvbicpO1xyXG5cdFx0XHR9XHJcblx0XHRcdFxyXG5cdFx0XHR4aHIub25yZWFkeXN0YXRlY2hhbmdlID0gZnVuY3Rpb24oKSB7XHJcblx0XHRcdCAgICBpZih0aGlzLnJlYWR5U3RhdGUgIT0gNCB8fCB0aGlzLnN0YXR1cyAhPSAyMDApIHtcclxuXHRcdFx0ICAgIFx0cmV0dXJuO1xyXG5cdFx0XHQgICAgfVxyXG5cclxuXHRcdFx0ICAgIGxldCByZXNwb25zZSA9IHRoaXMucmVzcG9uc2UgfHwgdGhpcy5yZXNwb25zZVRleHQ7IFxyXG5cdFx0XHQgICAgcmVzcG9uc2UgPSAoeGhyLnJlc3BvbnNlVHlwZSA9PSAnanNvbicgJiYgdHlwZW9mIHJlc3BvbnNlICE9ICdvYmplY3QnKSA/IEpTT04ucGFyc2UocmVzcG9uc2UpIDogcmVzcG9uc2U7XHJcblx0XHRcdCAgICByZXNvbHZlKHJlc3BvbnNlKTtcdFxyXG4gICAgICAgXHRcdFx0XHJcbiAgICAgICBcdFx0XHRpZihvcHRpb25zLmhhc093blByb3BlcnR5KCdhZnRlcicpICYmIHR5cGVvZiBvcHRpb25zLmFmdGVyID09ICdmdW5jdGlvbicpIHtcclxuXHRcdFx0XHRcdG9wdGlvbnMuYWZ0ZXIuY2FsbCh0aGlzKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH07XHJcblxyXG5cdFx0XHR4aHIub25lcnJvciA9IGZ1bmN0aW9uKG1lc3NhZ2UpIHtcclxuXHRcdFx0XHRpZihvcHRpb25zLmhhc093blByb3BlcnR5KCdlcnJvcicpICYmIHR5cGVvZiBvcHRpb25zLmVycm9yID09ICdmdW5jdGlvbicpIHtcclxuXHRcdFx0XHRcdG9wdGlvbnMuZXJyb3IobWVzc2FnZSk7XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRyZWplY3QobWVzc2FnZSk7XHJcblx0XHRcdH07XHJcblxyXG5cdFx0XHRpZighIG9wdGlvbnMuZGF0YSkge1xyXG5cdFx0XHRcdHhoci5zZW5kKG51bGwpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHR2YXIgcXVlcnlTdHJpbmcgPSBPYmplY3Qua2V5cyhvcHRpb25zLmRhdGEpLm1hcChmdW5jdGlvbihrZXkpIHtcclxuXHRcdCAgICAgICAgICAgIHJldHVybiBlbmNvZGVVUklDb21wb25lbnQoa2V5KSArICc9JyArXHJcblx0XHQgICAgICAgICAgICAgICAgXHRlbmNvZGVVUklDb21wb25lbnQob3B0aW9ucy5kYXRhW2tleV0pO1xyXG5cdFx0ICAgICAgICBcdH0pLmpvaW4oJyYnKTtcclxuXHJcblx0XHRcdHhoci5zZW5kKHF1ZXJ5U3RyaW5nKTtcclxuXHRcdH0pO1xyXG5cdH1cclxufVxuXG5sZXQgZGVmYXVsdE1lc3NhZ2UkMiA9ICdUaGUgZXZlbnQgeW91IGNhbGxlZCBkb2VzIG5vdCBleGlzdHMgb3IgeW91IHN1cHBsaWVkIHdyb25nIGFyZ3VtZW50JztcclxuXHJcbmNsYXNzIEJhZEV2ZW50Q2FsbEV4Y2VwdGlvbiBleHRlbmRzIEV4Y2VwdGlvbkhhbmRsZXJcclxue1xyXG5cdGNvbnN0cnVjdG9yKG1lc3NhZ2UgPSBudWxsKSBcclxuXHR7XHJcblx0XHRtZXNzYWdlID0gbWVzc2FnZSB8fCBkZWZhdWx0TWVzc2FnZSQyO1xyXG5cdFx0c3VwZXIobWVzc2FnZSk7XHJcbiAgICBcdHN1cGVyLnN0YWNrVHJhY2UodGhpcywgbWVzc2FnZSk7XHJcbiAgICB9XHJcbn1cblxuLyoqXHJcbiAqIEBmaWxlIFxyXG4gKiBFdmVudE1hbmFnZXIgY2xhc3MuXHJcbiAqXHJcbiAqIEhhbmRsZXMgc3Vic2NyaXBpb25zIGFuZCBwdWJsaXNoaW5nIG9mIGV2ZW50cy5cclxuICovXHJcblxyXG5jbGFzcyBFdmVudE1hbmFnZXJcclxue1xyXG5cdC8qKlxyXG5cdCAqIFN0b3JlcyB0aGUgZXZlbnRzIGNhbGxiYWNrcy5cclxuXHQgKiBcclxuXHQgKiBAdmFyIGFycmF5XHJcblx0ICovXHJcblx0Y29uc3RydWN0b3IoKVxyXG5cdHtcclxuXHRcdHRoaXMuZXZlbnRzID0ge307XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBTdWJzY3JpYmluZyB0byBhbiBldmVudC5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSBzdHJpbmcgfCBuYW1lXHJcblx0ICogQHBhcmFtIGZ1bmN0aW9uIHwgY2FsbGJhY2tcclxuXHQgKiBAcmV0dXJuIHZvaWRcclxuXHQgKi9cclxuXHRzdWJzY3JpYmUobmFtZSwgY2FsbGJhY2spIFxyXG5cdHtcclxuXHRcdGlmICh0eXBlb2YgY2FsbGJhY2sgIT09ICdmdW5jdGlvbicpIHtcclxuXHRcdFx0dGhyb3cgbmV3IEludmFsaWRBcmd1bWVudEV4Y2VwdGlvbjtcclxuXHRcdH1cclxuXHJcblx0XHRpZiAodHlwZW9mIHRoaXMuZXZlbnRzW25hbWVdID09ICd1bmRlZmluZWQnKSB7XHJcblx0XHRcdHRoaXMuZXZlbnRzW25hbWVdID0gW107XHJcblx0XHR9XHJcblxyXG5cdFx0dGhpcy5ldmVudHNbbmFtZV0ucHVzaChjYWxsYmFjayk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBQdWJsaXNoIGFuIGV2ZW50IHRvIGFsbCBzdWJzY3JpYmVycy5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSBzdHJpbmcgfCBuYW1lXHJcblx0ICogQHBhcmFtIGxpc3QgfCBkYXRhXHJcblx0ICogQHJldHVybiB2b2lkXHJcblx0ICovXHJcblx0cHVibGlzaChuYW1lLCAuLi5kYXRhKSBcclxuXHR7XHJcblx0XHRkYXRhID0gZGF0YSB8fCBudWxsO1xyXG5cclxuXHRcdC8vIElmIHRoZXJlIGFyZSBubyBzdWJzY3JpYmVycyBzaW1wbHkgaWdub3JlIHRoYXQgZXZlbnQuXHJcblx0XHRpZiAodHlwZW9mIHRoaXMuZXZlbnRzW25hbWVdID09ICd1bmRlZmluZWQnKSB7XHJcblx0XHRcdHJldHVybjtcclxuXHRcdH1cclxuXHJcblx0XHR0aGlzLmV2ZW50c1tuYW1lXS5mb3JFYWNoKGZ1bmN0aW9uKGNhbGxiYWNrKSB7XHJcblx0XHRcdGlmKHR5cGVvZiBjYWxsYmFjayAhPSAnZnVuY3Rpb24nKSB7XHJcblx0XHRcdFx0dGhyb3cgbmV3IEludmFsaWRBcmd1bWVudEV4Y2VwdGlvbignc3Vic2NyaWJlKCkgc2hvdWxkIHJlY2lldmUgY2FsbGJhY2sgYXMgc2Vjb25kIHBhcmFtZXRlciwgYnV0ICcrIHR5cGVvZiBjYWxsYmFjayArJyB3YXMgcGFzc2VkJyk7XHJcblx0XHRcdH1cclxuXHRcdFx0XHJcblx0XHRcdHJldHVybiBjYWxsYmFjayguLi5kYXRhKTtcclxuXHRcdH0pO1xyXG5cdH1cclxufVxuXG4vKipcclxuICogQGZpbGUgXHJcbiAqIENvb2tpZSBjbGFzcy5cclxuICpcclxuICogQWRkcyBzb21lIHVzZWZ1bCBmdW5jdGlvbmFsaXR5IGZvclxyXG4gKiBzZXR0aW5nIG9yIGdldHRpbmcgY29va2llcy5cclxuICovXHJcblx0XHJcbmNsYXNzIENvb2tpZVxyXG57XHJcblx0LyoqXHJcbiBcdCogU2V0cyBhIGNvb2tpZS5cclxuIFx0KiBcclxuIFx0KiBAcGFyYW0gc3RyaW5nIHwgbmFtZVxyXG4gXHQqIEBwYXJhbSBKU09OIHwgdmFsdWVcclxuIFx0KiBAcGFyYW0gaW50ZWdlciB8IGRheXNcclxuIFx0KiBAcmV0dXJuIHZvaWRcclxuXHQqL1xyXG5cdHN0YXRpYyBzZXQobmFtZSwgdmFsdWUsIGRheXMpIFxyXG5cdHtcclxuXHRcdGlmICh2YWx1ZS5jb25zdHJ1Y3Rvci5uYW1lICA9PSAnT2JqZWN0JyB8fCB2YWx1ZS5jb25zdHJ1Y3Rvci5uYW1lID09ICdBcnJheScpIHtcclxuXHRcdFx0dmFsdWUgPSBKU09OLnN0cmluZ2lmeSh2YWx1ZSk7XHJcblx0XHR9XHJcblxyXG5cdFx0ZGF5cyA9IGRheXMgfHwgMTA7XHJcblxyXG5cdCAgICBsZXQgZXhwaXJlcztcclxuXHQgICAgXHJcblx0ICAgIGlmIChkYXlzKSB7XHJcblx0ICAgICAgICBsZXQgZGF0ZSA9IG5ldyBEYXRlKCk7XHJcblx0ICAgICAgICBkYXRlLnNldFRpbWUoZGF0ZS5nZXRUaW1lKCkgKyAoZGF5cyAqIDI0ICogNjAgKiA2MCAqIDEwMDApKTtcclxuXHQgICAgICAgIGV4cGlyZXMgPSBcIjsgZXhwaXJlcz1cIiArIGRhdGUudG9HTVRTdHJpbmcoKTtcclxuXHQgICAgfSBlbHNlIHtcclxuXHQgICAgICAgIGV4cGlyZXMgPSBcIlwiO1xyXG5cdCAgICB9XHJcblxyXG5cdCAgICBkb2N1bWVudC5jb29raWUgPSBuYW1lICsgXCI9XCIgKyB2YWx1ZSArIGV4cGlyZXMgKyBcIjsgcGF0aD0vXCI7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBSZXRyaWV2ZXMgdGhlIGNvb2tpZSBieSBuYW1lLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIHN0cmluZyB8IG5hbWVcclxuIFx0ICogQHJldHVybiBKU09OXHJcblx0ICovXHJcblx0c3RhdGljIGdldChuYW1lKSBcclxuXHR7XHJcblx0ICAgIGlmIChkb2N1bWVudC5jb29raWUubGVuZ3RoID4gMCkge1xyXG5cdCAgICAgICAgbGV0IGNfc3RhcnQgPSBkb2N1bWVudC5jb29raWUuaW5kZXhPZihuYW1lICsgXCI9XCIpO1xyXG5cdCAgICAgICAgXHJcblx0ICAgICAgICBpZiAoY19zdGFydCAhPSAtMSkge1xyXG5cdCAgICAgICAgICAgIGNfc3RhcnQgPSBjX3N0YXJ0ICsgbmFtZS5sZW5ndGggKyAxO1xyXG5cdCAgICAgICAgICAgIGxldCBjX2VuZCA9IGRvY3VtZW50LmNvb2tpZS5pbmRleE9mKFwiO1wiLCBjX3N0YXJ0KTtcclxuXHQgICAgICAgICAgICBcclxuXHQgICAgICAgICAgICBpZiAoY19lbmQgPT0gLTEpIHtcclxuXHQgICAgICAgICAgICAgICAgY19lbmQgPSBkb2N1bWVudC5jb29raWUubGVuZ3RoO1xyXG5cdCAgICAgICAgICAgIH1cclxuXHJcblx0ICAgICAgICAgICAgcmV0dXJuIEpTT04ucGFyc2UodW5lc2NhcGUoZG9jdW1lbnQuY29va2llLnN1YnN0cmluZyhjX3N0YXJ0LCBjX2VuZCkpKTtcclxuXHQgICAgICAgIH1cclxuXHQgICAgfVxyXG5cclxuXHQgICAgcmV0dXJuIHt9O1xyXG5cdH1cclxufVxuXG5sZXQgZGVmYXVsdE1lc3NhZ2UkMyA9ICdUaGUgaXRlbSB5b3UgYXJlIHRyeWluZyB0byBhZGQgbXVzdCBjb250YWluIGEgdW5pcXVlIGlkJztcclxuXHJcbmNsYXNzIEludmFsaWRDYXJ0SXRlbUV4Y2VwdGlvbiBleHRlbmRzIEV4Y2VwdGlvbkhhbmRsZXJcclxue1xyXG5cdGNvbnN0cnVjdG9yKG1lc3NhZ2UgPSBudWxsKSBcclxuXHR7XHJcblx0XHRtZXNzYWdlID0gbWVzc2FnZSB8fCBkZWZhdWx0TWVzc2FnZSQzO1xyXG5cdFx0c3VwZXIobWVzc2FnZSk7XHJcbiAgICBcdHN1cGVyLnN0YWNrVHJhY2UodGhpcywgbWVzc2FnZSk7XHJcbiAgICB9XHJcbn1cblxuLy8gSGVscGVyc1xyXG4vLyBFeGNlcHRpb25zXHJcbi8qKlxyXG4gKiBAZmlsZSBcclxuICogQ2FydCBjbGFzcy5cclxuICpcclxuICogSGFuZGxlcyBhZGRpbmcsIHJlbW92aW5nIGV0Yy4uLiBvZiBpdGVtcy5cclxuICovXHJcblxyXG4vKipcclxuICogVGhlIGRlZmF1bHQgc2V0dGluZ3Mgb2YgdGhlIGNhcnQuXHJcbiAqXHJcbiAqIEB2YXIgb2JqZWN0XHJcbiAqL1xyXG5sZXQgZGVmYXVsdFNldHRpbmdzJDEgPSB7XHJcblx0ZWxlbWVudDogJy5jYXJ0JyxcclxuXHRjb29raWVfbmFtZTogJ2NhcnQnLFxyXG5cdHByZXZpZXdfY2xhc3M6ICcnLFxyXG5cdGxvYWRlcjogJycsXHJcblx0Y2xhc3M6ICcnLFxyXG5cdHdpZHRoOiAnNjBweCcsXHJcblx0aGVpZ2h0OiAnNjBweCcsXHJcblx0cGxhY2VtZW50OiAncmlnaHQtdG9wJyxcclxuXHRmaXhlZDogdHJ1ZSxcclxuXHRob3Zlcl9jb2xvcjogJ29yYW5nZScsXHJcblx0bm9fY3NzOiBmYWxzZSxcclxufTtcclxuXHJcbi8qKlxyXG4gKiBTdG9yZXMgdGhlIGNvbnRhaW5lciBvYmplY3QuXHJcbiAqXHJcbiAqIEB2YXIgXFxDb3JlXFxDb250YWluZXJcclxuICovXHJcbmxldCBDb250YWluZXI7XHJcblxyXG4vKipcclxuICogU3RvcmVzIHRoZSBldmVudCBtYW5hZ2VyIG9iamVjdC5cclxuICpcclxuICogQHZhciBcXENvcmVcXEV2ZW50TWFuYWdlclxyXG4gKi9cclxubGV0IEV2ZW50TWFuYWdlciQyO1xyXG5cclxuLyoqXHJcbiAqIFN0b3JlcyB0aGUgcmVxdWVzdCBvYmplY3QuXHJcbiAqXHJcbiAqIEB2YXIgXFxIZWxwZXJzXFxSZXF1ZXN0XHJcbiAqL1xyXG5sZXQgSHR0cDtcclxuXHJcbi8qKlxyXG4gKiBTdG9yZXMgdGhlIGNhcnQgbG9hZGVyLlxyXG4gKlxyXG4gKiBAdmFyIEhUTUxEaXZFbGVtZW50XHJcbiAqL1xyXG5sZXQgbG9hZGluZ092ZXJsYXk7XHJcblxyXG4vKipcclxuICogU3RvcmVzIHRoZSBpdGVtcyB3cmFwcGVyLlxyXG4gKlxyXG4gKiBAdmFyIEhUTUxEaXZFbGVtZW50XHJcbiAqL1xyXG5sZXQgaXRlbXNEaXY7XHJcblxyXG5jbGFzcyBDYXJ0IFxyXG57XHJcblx0LyoqXHJcblx0ICogLSBJbml0aWFsaXplIHRoZSBJb0MgY29udGFpbmVyXHJcblx0ICogLSBJbml0aWFsaXplIHRoZSBSZXF1ZXN0XHJcblx0ICogLSBJbml0aWFsaXplIHRoZSBFdmVudE1hbmFnZXJcclxuXHQgKiAtIENyZWF0ZXMgdGhlIHByZXZpZXcgYW5kIHRoZSBpY29uIG9mIHRoZSBjYXJ0LlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIFxcQ29yZVxcQ29udGFpbmVyIHwgY29udGFpbmVyXHJcblx0ICogQHBhcmFtIFxcSGVscGVyc1xcUmVxdWVzdCB8IGh0dHBcclxuXHQgKiBAcGFyYW0gXFxDb3JlXFxFdmVudE1hbmFnZXIgfCBldmVudE1hbmFnZXJcclxuXHQgKiBAcmV0dXJuIHZvaWRcclxuXHQgKi9cclxuXHRjb25zdHJ1Y3Rvcihjb250YWluZXIsIGh0dHAsIGV2ZW50TWFuYWdlcikgXHJcblx0e1xyXG5cdFx0Q29udGFpbmVyID0gY29udGFpbmVyO1xyXG5cdFx0SHR0cCA9IGh0dHA7XHJcblx0XHRFdmVudE1hbmFnZXIkMiA9IGV2ZW50TWFuYWdlcjtcclxuXHRcdFxyXG5cdFx0dGhpcy5wcmV2aWV3RWxlbWVudCA9IHRoaXMuY3JlYXRlUHJldmlld0VsZW1lbnQoKTtcclxuXHRcdHRoaXMuaWNvbiA9IGNyZWF0ZUljb24uY2FsbCh0aGlzKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFNldHMgdGhlIG9iamVjdCBieSB0aGUgdXNlcnMgc2V0dGluZy5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSBvYmplY3QgfCBzZXR0aW5nc1xyXG5cdCAqIEByZXR1cm4gdm9pZFxyXG5cdCAqL1xyXG5cdHNldHVwKHNldHRpbmdzKVxyXG5cdHtcclxuXHRcdGlmICh0eXBlb2Ygc2V0dGluZ3MgIT0gJ29iamVjdCcpIHtcclxuXHRcdFx0dGhyb3cgbmV3IEludmFsaWRBcmd1bWVudEV4Y2VwdGlvbiQxO1xyXG5cdFx0fVxyXG5cclxuXHRcdHRoaXMuc2V0dGluZ3MgPSBDb21tb24uZXh0ZW5kKGRlZmF1bHRTZXR0aW5ncyQxLCBzZXR0aW5ncyk7XHJcblxyXG5cdFx0dGhpcy5zZXRFbGVtZW50KHRoaXMuc2V0dGluZ3MuZWxlbWVudCk7XHJcblxyXG5cdFx0RE9NLmFkZENsYXNzKHRoaXMucHJldmlld0VsZW1lbnQsICdjbG9zZWQnKTtcclxuXHRcdERPTS5hZGRDbGFzcyh0aGlzLnByZXZpZXdFbGVtZW50LCB0aGlzLnNldHRpbmdzLnByZXZpZXdfY2xhc3MpO1xyXG5cdFx0XHJcblx0XHR0aGlzLmFkZFN0eWxlVGFnKCk7XHJcblx0XHR0aGlzLmJpbmRFdmVudExpc3RlbmVycygpO1xyXG5cdFx0XHJcblx0XHRpZiAodGhpcy5pc0VtcHR5KENvb2tpZS5nZXQodGhpcy5zZXR0aW5ncy5jb29raWVfbmFtZSkpKSB7XHJcblx0XHRcdHRoaXMuc2V0dXBDYXJ0KCk7XHJcblx0XHRcdFxyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQ2hlY2tzIGlmIHRoZSBjYXJ0IGlzIGVtcHR5XHJcblx0ICpcclxuXHQgKiBAcGFyYW0gb2JqZWN0IHwgY2FydFxyXG5cdCAqIEByZXR1cm4gYm9vbFxyXG5cdCAqL1xyXG5cdGlzRW1wdHkoY2FydClcclxuXHR7XHJcblx0XHRyZXR1cm4gQ29tbW9uLmVtcHR5T2JqZWN0KGNhcnQpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogSW5pdGlhbGl6ZS9TZXRzIHRoZSBjYXJ0IGFzIGEgY29va2llLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIG9iamVjdCB8IGNhcnRcclxuXHQgKiBAcmV0dXJuIHZvaWRcclxuXHQgKi9cclxuXHRzZXR1cENhcnQoKVxyXG5cdHtcclxuXHRcdHRoaXMuY2FydCA9IHt9O1xyXG5cdFx0dGhpcy5jYXJ0LmlkID0gU3RyLnJhbmRvbSgxMCk7XHJcblx0XHR0aGlzLmNhcnQuaXRlbXMgPSBbXTtcclxuXHRcdHRoaXMuY2FydC5mYXZvcml0ZXMgPSBbXTtcclxuXHRcdENvb2tpZS5zZXQodGhpcy5zZXR0aW5ncy5jb29raWVfbmFtZSwgdGhpcy5jYXJ0LCAyKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEFkZHMgYW4gaXRlbSB0byB0aGUgY2FydC5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSBvYmplY3QgfCBpdGVtXHJcblx0ICogQHJldHVybiB2b2lkXHJcblx0ICovXHJcblx0YWRkSXRlbShpdGVtKVxyXG5cdHtcclxuXHRcdGlmICh0eXBlb2YgaXRlbSAhPSAnb2JqZWN0Jykge1xyXG5cdFx0XHR0aHJvdyBuZXcgSW52YWxpZEFyZ3VtZW50RXhjZXB0aW9uJDEoJ2FkZEl0ZW0oKSBleHBlY3QgdGhlIGZpcnN0IHBhcmFtZXRlciB0byBiZSBhbiBvYmplY3QsIGJ1dCAnICsgdHlwZW9mIGl0ZW0gKyAnIHdhcyBwYXNzZWQgaW5zdGVhZCcpO1xyXG5cdFx0fVxyXG5cclxuXHRcdGlmICghIGl0ZW0uaGFzT3duUHJvcGVydHkoJ2lkJykpIHtcclxuXHRcdFx0dGhyb3cgbmV3IEludmFsaWRDYXJ0SXRlbUV4Y2VwdGlvbjtcclxuXHRcdH1cclxuXHJcblx0XHR0aGlzLmNhcnQgPSBDb29raWUuZ2V0KHRoaXMuc2V0dGluZ3MuY29va2llX25hbWUpO1xyXG5cclxuXHRcdGlmICghaXRlbS5oYXNPd25Qcm9wZXJ0eSgncXVhbnRpdHknKSkge1xyXG5cdFx0XHRpdGVtLnF1YW50aXR5ID0gMTtcclxuXHRcdH1cclxuXHJcblx0XHRsZXQgaTtcclxuXHRcdGxldCBpbmNyZW1lbnRlZCA9IGZhbHNlO1xyXG5cclxuXHRcdGZvciAoaSA9IDA7IGkgPCB0aGlzLmNhcnQuaXRlbXMubGVuZ3RoOyBpKyspIHtcclxuXHRcdFx0aWYgKHRoaXMuY2FydC5pdGVtc1tpXS5pZCA9PSBpdGVtLmlkKSB7XHJcblx0XHRcdFx0dGhpcy5jYXJ0Lml0ZW1zW2ldLnF1YW50aXR5Kys7XHJcblx0XHRcdFx0aW5jcmVtZW50ZWQgPSB0cnVlO1xyXG5cdFx0XHRcdGJyZWFrO1x0XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0XHRpZiAoISBpbmNyZW1lbnRlZCkge1xyXG5cdFx0XHR0aGlzLmNhcnQuaXRlbXMucHVzaChpdGVtKTtcclxuXHRcdH1cclxuXHJcblx0XHRDb29raWUuc2V0KHRoaXMuc2V0dGluZ3MuY29va2llX25hbWUsIHRoaXMuY2FydCwgMik7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBBZGRzIGFuIGl0ZW0gdG8gdGhlIGZhdm9yaXRlcyBsaXN0LlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIG9iamVjdCB8IGl0ZW1cclxuXHQgKiBAcmV0dXJuIHZvaWRcclxuXHQgKi9cclxuXHRmYXZvcml0ZUl0ZW0oaXRlbSlcclxuXHR7XHJcblx0XHRpZiAodHlwZW9mIGl0ZW0gIT0gJ29iamVjdCcpIHtcclxuXHRcdFx0dGhyb3cgbmV3IEludmFsaWRBcmd1bWVudEV4Y2VwdGlvbiQxKCdmYXZvcml0ZUl0ZW0oKSBleHBlY3QgdGhlIGZpcnN0IHBhcmFtZXRlciB0byBiZSBhbiBvYmplY3QsIGJ1dCAnICsgdHlwZW9mIGl0ZW0gKyAnIHdhcyBwYXNzZWQgaW5zdGVhZCcpO1xyXG5cdFx0fVxyXG5cclxuXHRcdGlmICghIGl0ZW0uaGFzT3duUHJvcGVydHkoJ2lkJykpIHtcclxuXHRcdFx0dGhyb3cgbmV3IEludmFsaWRDYXJ0SXRlbUV4Y2VwdGlvbjtcclxuXHRcdH1cclxuXHJcblx0XHR0aGlzLmNhcnQgPSBDb29raWUuZ2V0KHRoaXMuc2V0dGluZ3MuY29va2llX25hbWUpO1xyXG5cclxuXHRcdGxldCBpO1xyXG5cdFx0bGV0IGFscmVhZHlGYXZvcml0ZWQgPSBmYWxzZTtcclxuXHJcblx0XHRmb3IgKGkgPSAwOyBpIDwgdGhpcy5jYXJ0LmZhdm9yaXRlcy5sZW5ndGg7IGkrKykge1xyXG5cdFx0XHRpZiAodGhpcy5jYXJ0LmZhdm9yaXRlc1tpXS5pZCA9PSBpdGVtLmlkKSB7XHJcblx0XHRcdFx0YWxyZWFkeUZhdm9yaXRlZCA9IHRydWU7XHJcblx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0XHRpZiAoISBhbHJlYWR5RmF2b3JpdGVkKSB7XHJcblx0XHRcdHRoaXMuY2FydC5mYXZvcml0ZXMucHVzaChpdGVtKTtcclxuXHRcdH1cclxuXHJcblx0XHRDb29raWUuc2V0KHRoaXMuc2V0dGluZ3MuY29va2llX25hbWUsIHRoaXMuY2FydCwgMik7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBSZW1vdmVzIGFuIGl0ZW0gZnJvbSB0aGUgY2FydC5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSBvYmplY3QgfCBpdGVtXHJcblx0ICogQHJldHVybiB2b2lkXHJcblx0ICovXHJcblx0cmVtb3ZlSXRlbShpdGVtKVxyXG5cdHtcclxuXHRcdGlmICh0eXBlb2YgaXRlbSAhPSAnb2JqZWN0Jykge1xyXG5cdFx0XHR0aHJvdyBuZXcgSW52YWxpZEFyZ3VtZW50RXhjZXB0aW9uJDEoJ3JlbW92ZUl0ZW0oKSBleHBlY3QgdGhlIGZpcnN0IHBhcmFtZXRlciB0byBiZSBhbiBvYmplY3QsIGJ1dCAnICsgdHlwZW9mIGl0ZW0gKyAnIHdhcyBwYXNzZWQgaW5zdGVhZCcpO1xyXG5cdFx0fVxyXG5cclxuXHRcdGlmICghIGl0ZW0uaGFzT3duUHJvcGVydHkoJ2lkJykpIHtcclxuXHRcdFx0dGhyb3cgbmV3IEludmFsaWRDYXJ0SXRlbUV4Y2VwdGlvbjtcclxuXHRcdH1cclxuXHJcbiBcdFx0dGhpcy5jYXJ0ID0gQ29va2llLmdldCh0aGlzLnNldHRpbmdzLmNvb2tpZV9uYW1lKTtcclxuXHJcbiBcdFx0bGV0IGk7XHJcblxyXG4gXHRcdGZvciAoaSA9IDA7IGkgPCB0aGlzLmNhcnQuaXRlbXMubGVuZ3RoOyBpKyspIHtcclxuIFx0XHRcdGlmICh0aGlzLmNhcnQuaXRlbXNbaV0uaWQgPT0gaXRlbS5pZCkge1xyXG4gXHRcdFx0XHR0aGlzLmNhcnQuaXRlbXMuc3BsaWNlKGksIDEpO1xyXG4gXHRcdFx0XHRicmVhaztcclxuIFx0XHRcdH1cclxuIFx0XHR9XHJcblxyXG4gXHRcdENvb2tpZS5zZXQodGhpcy5zZXR0aW5ncy5jb29raWVfbmFtZSwgdGhpcy5jYXJ0LCAyKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEFkZHMgdGhlIGl0ZW0gdG8gcHJldmlldy5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSBhcnJheSB8IGl0ZW1zXHJcblx0ICogQHJldHVybiB2b2lkXHJcblx0ICovXHJcblx0YWRkVG9QcmV2aWV3KGl0ZW1zKVxyXG5cdHtcclxuXHRcdGl0ZW1zRGl2LmlubmVySFRNTCA9ICcnO1xyXG5cclxuXHRcdGxldCB0YWJsZSA9IERPTS5jcmVhdGVFbGVtZW50KCd0YWJsZScpO1xyXG5cclxuXHRcdERPTS5hZGRDbGFzcyh0YWJsZSwgJ3ByZXZpZXctdGFibGUnKTtcclxuXHJcblx0XHRmb3IgKGxldCBpID0gMDsgaSA8IGl0ZW1zLmxlbmd0aDsgaSsrKSB7XHJcblxyXG5cdFx0XHRsZXQgYXR0cmlidXRlcyA9IGl0ZW1zW2ldO1xyXG5cclxuXHRcdFx0bGV0IHRyID0gRE9NLmNyZWF0ZUVsZW1lbnQoJ3RyJywge1xyXG5cdFx0XHRcdGNsYXNzOiAnaXRlbSdcclxuXHRcdFx0fSk7XHJcblxyXG5cdFx0XHQvLyBRdWFudGl0eSBhbHdheXMgYXQgdGhlIHN0YXJ0IG9mIGFuIGl0ZW0uXHJcblx0XHRcdGxldCB0ZCA9IERPTS5jcmVhdGVFbGVtZW50KCd0ZCcpO1xyXG5cclxuXHRcdFx0dGQuaW5uZXJIVE1MID0gYXR0cmlidXRlcy5xdWFudGl0eSArJ3gnO1xyXG5cdFx0XHR0ci5hcHBlbmRDaGlsZCh0ZCk7XHJcblx0XHRcdFxyXG5cdFx0XHRmb3IobGV0IGF0dHJpYnV0ZSBpbiBhdHRyaWJ1dGVzKSB7XHJcblx0XHRcdFx0c3dpdGNoKGF0dHJpYnV0ZSlcclxuXHRcdFx0XHR7XHJcblx0XHRcdFx0XHRjYXNlICdpbWFnZSc6XHJcblx0XHRcdFx0XHRcdHRkID0gRE9NLmNyZWF0ZUVsZW1lbnQoJ3RkJyk7XHJcblx0XHRcdFx0XHRcdGxldCBpbWFnZSA9IERPTS5jcmVhdGVFbGVtZW50KCdpbWcnLCB7XHJcblx0XHRcdFx0XHRcdFx0c3JjOiBhdHRyaWJ1dGVzW2F0dHJpYnV0ZV0sXHJcblx0XHRcdFx0XHRcdFx0d2lkdGg6ICc1MHB4JyxcclxuXHRcdFx0XHRcdFx0XHRoZWlnaHQ6ICc1MHB4J1xyXG5cdFx0XHRcdFx0XHR9KTtcclxuXHJcblx0XHRcdFx0XHRcdHRkLmFwcGVuZENoaWxkKGltYWdlKTtcclxuXHRcdFx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdFx0XHRjYXNlICduYW1lJzpcclxuXHRcdFx0XHRcdGNhc2UgJ3ByaWNlJzpcclxuXHRcdFx0XHRcdFx0dGQgPSBET00uY3JlYXRlRWxlbWVudCgndGQnKTtcclxuXHRcdFx0XHRcdFx0dGQuaW5uZXJIVE1MID0gYXR0cmlidXRlc1thdHRyaWJ1dGVdO1xyXG5cdFx0XHRcdFx0XHRicmVhaztcclxuXHRcdFx0XHR9XHJcblx0XHRcdFxyXG5cdFx0XHRcdHRyLmFwcGVuZENoaWxkKHRkKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0dGFibGUuYXBwZW5kQ2hpbGQodHIpO1xyXG5cdFx0fVxyXG5cclxuXHRcdC8vIGNyZWF0ZSBjaGVja291dCBidXR0b24gYXQgdGhlIGJ1dHRvbVxyXG5cdFx0bGV0IHRyID0gRE9NLmNyZWF0ZUVsZW1lbnQoJ3RyJyk7XHJcblx0XHRsZXQgdGQgPSBET00uY3JlYXRlRWxlbWVudCgndGQnLCB7XHJcblx0XHRcdGNvbHNwYW46ICc0JyxcclxuXHRcdH0pO1xyXG5cclxuXHRcdGxldCBjaGVja291dCA9IERPTS5jcmVhdGVFbGVtZW50KCdhJywge1xyXG5cdFx0XHRjbGFzczogJ2J0biBidG4tcHJpbWFyeScsXHJcblx0XHRcdHRleHQ6ICdDaGVja291dCdcclxuXHRcdH0pO1xyXG5cclxuXHRcdGNoZWNrb3V0Lm9uY2xpY2sgPSBmdW5jdGlvbihlKSB7XHJcblx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcclxuXHRcdFx0RXZlbnRNYW5hZ2VyJDIucHVibGlzaCgnY2FydC5jaGVja291dCcpO1xyXG5cdFx0fS5iaW5kKHRoaXMpO1xyXG5cclxuXHRcdHRkLmFwcGVuZENoaWxkKCBjaGVja291dCk7XHJcblx0XHR0ci5hcHBlbmRDaGlsZCh0ZCk7XHJcblxyXG5cdFx0dGFibGUuYXBwZW5kQ2hpbGQodHIpO1xyXG5cclxuXHRcdGl0ZW1zRGl2LmFwcGVuZENoaWxkKHRhYmxlKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEJpbmRzIGV2ZXJ0aGluZyB0byB0aGUgZWxlbWVudC5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSBzdHJpbmcgfCBzZWxlY3RvclxyXG5cdCAqIEByZXR1cm4gdm9pZFxyXG5cdCAqL1xyXG5cdHNldEVsZW1lbnQoc2VsZWN0b3IpXHJcblx0e1xyXG5cdFx0dGhpcy5lbGVtZW50ID0gRE9NLmZpbmQoc2VsZWN0b3IpO1xyXG5cclxuXHRcdGlmICh0aGlzLmVsZW1lbnQpIHtcclxuXHRcdFx0RE9NLmFkZENsYXNzKHRoaXMuZWxlbWVudCwgdGhpcy5zZXR0aW5ncy5jbGFzcyk7XHJcblx0XHRcdERPTS5hZGRDbGFzcyh0aGlzLmVsZW1lbnQsIHRoaXMuc2V0dGluZ3MucGxhY2VtZW50KTtcclxuXHRcdFx0dGhpcy5lbGVtZW50LmFwcGVuZENoaWxkKHRoaXMuaWNvbik7XHJcblx0XHRcdHRoaXMuZWxlbWVudC5hcHBlbmRDaGlsZCh0aGlzLnByZXZpZXdFbGVtZW50KTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIENyZWF0ZXMgdGhlIGNhcnQgZGV0YWlscyBwcmV2aWV3IGVsZW1lbnQuXHJcblx0ICpcclxuXHQgKiBAcmV0dXJuIEhUTUxEaXZFbGVtZW50XHJcblx0ICovXHJcblx0Y3JlYXRlUHJldmlld0VsZW1lbnQoKVxyXG5cdHtcclxuXHRcdGxldCBwcmV2aWV3RWxlbWVudCA9IERPTS5jcmVhdGVFbGVtZW50KCdkaXYnLCB7XHJcblx0XHRcdGlkOiAncHJldmlldydcclxuXHRcdH0pO1xyXG5cclxuXHRcdGl0ZW1zRGl2ID0gRE9NLmNyZWF0ZUVsZW1lbnQoJ3VsJywge1xyXG5cdFx0XHRcdGNsYXNzOiAnaXRlbXMnXHJcblx0XHRcdH0pO1xyXG5cclxuXHRcdHByZXZpZXdFbGVtZW50LmFwcGVuZENoaWxkKGl0ZW1zRGl2KTtcclxuXHJcblx0XHRyZXR1cm4gcHJldmlld0VsZW1lbnQ7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBBZGQgdGhlIGVDb21tZXJjZSBzdHlsZSB0YWdzIHRvIHRoZSBET00uXHJcblx0ICpcclxuXHQgKiBAcmV0dXJuIHZvaWRcclxuXHQgKi9cclxuXHRhZGRTdHlsZVRhZygpIFxyXG5cdHtcclxuXHRcdGlmIChET00uZmluZCgnI1R1cmJvLWVDb21tZXJjZS1DYXJ0JykpIHtcclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0fVxyXG5cclxuXHRcdGlmICh0aGlzLnNldHRpbmdzLm5vX2Nzcykge1xyXG5cdFx0XHRyZXR1cm47XHJcblx0XHR9XHJcblxyXG5cdFx0bGV0IHBvc2l0aW9uID0gKHRoaXMuc2V0dGluZ3MuZml4ZWQpID8gJ2ZpeGVkJyA6ICdhYnNvbHV0ZSc7XHJcblxyXG5cdFx0bGV0IGNzcyA9IGBcclxuXHRcdFx0JHt0aGlzLnNldHRpbmdzLmVsZW1lbnR9IHtcclxuXHRcdFx0XHRwb3NpdGlvbjogJHtwb3NpdGlvbn07XHJcblx0XHRcdFx0Y3Vyc29yOiBwb2ludGVyO1xyXG5cdFx0XHRcdGNvbG9yOiAjZmZmZmZmO1xyXG5cdFx0XHRcdHotaW5kZXg6IDk5ODtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0JHt0aGlzLnNldHRpbmdzLmVsZW1lbnR9IHN2ZyB7XHJcblx0XHRcdFx0d2lkdGg6ICR7dGhpcy5zZXR0aW5ncy53aWR0aH07XHJcblx0XHRcdFx0aGVpZ2h0OiAke3RoaXMuc2V0dGluZ3MuaGVpZ2h0fTtcclxuXHRcdFx0XHR0cmFuc2l0aW9uOiBmaWxsIDAuM3M7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdCR7dGhpcy5zZXR0aW5ncy5lbGVtZW50fSBzdmc6aG92ZXIge1xyXG5cdFx0XHRcdGZpbGw6ICR7dGhpcy5zZXR0aW5ncy5ob3Zlcl9jb2xvcn07XHJcblx0XHRcdFx0dHJhbnNpdGlvbjogZmlsbCAwLjNzO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHQke3RoaXMuc2V0dGluZ3MuZWxlbWVudH0udG9wLXJpZ2h0LFxyXG5cdFx0XHQke3RoaXMuc2V0dGluZ3MuZWxlbWVudH0ucmlnaHQtdG9wIHtcclxuXHRcdFx0XHRyaWdodDogMTBweDtcclxuXHRcdFx0XHR0b3A6IDEwcHg7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdCR7dGhpcy5zZXR0aW5ncy5lbGVtZW50fS5sZWZ0LXRvcCxcclxuXHRcdFx0JHt0aGlzLnNldHRpbmdzLmVsZW1lbnR9LnRvcC1sZWZ0IHtcclxuXHRcdFx0XHRsZWZ0OiAxMHB4O1xyXG5cdFx0XHRcdHRvcDogMTBweDtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0JHt0aGlzLnNldHRpbmdzLmVsZW1lbnR9ID4gI3ByZXZpZXcge1xyXG5cdFx0XHRcdHBvc2l0aW9uOiAke3Bvc2l0aW9ufTtcclxuXHRcdFx0XHR6LWluZGV4OiA5OTk5O1xyXG5cdFx0XHRcdHRvcDogY2FsYygxMHB4ICsgJHt0aGlzLnNldHRpbmdzLmhlaWdodH0pO1xyXG5cdFx0XHRcdHRyYW5zZm9ybTogdHJhbnNsYXRlWCg2MHB4KTtcclxuXHRcdFx0XHRoZWlnaHQ6IDQwMHB4O1xyXG5cdFx0XHRcdHdpZHRoOiAzMDBweDtcclxuXHRcdFx0XHRib3JkZXI6IDFweCBzb2xpZCAjZTRlNGU0O1xyXG5cdFx0XHRcdGJhY2tncm91bmQ6ICNmZmZmZmY7XHJcblx0XHRcdFx0dHJhbnNpdGlvbjogdHJhbnNmb3JtIDFzLCB2aXNpYmlsaXR5IDFzO1xyXG5cdFx0XHRcdGN1cnNvcjogZGVmYXVsdDtcclxuXHRcdFx0XHRvdmVyZmxvdy1ZOiBzY3JvbGw7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdCR7dGhpcy5zZXR0aW5ncy5lbGVtZW50fSA+ICNwcmV2aWV3Lm9wZW5lZCB7XHJcblx0XHRcdFx0dmlzaWJpbGl0eTogdmlzaWJsZTtcclxuXHRcdFx0XHR0cmFuc2Zvcm06IHRyYW5zbGF0ZVgoLTI0MHB4KTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0JHt0aGlzLnNldHRpbmdzLmVsZW1lbnR9ID4gI3ByZXZpZXcuY2xvc2VkIHtcclxuXHRcdFx0XHR2aXNpYmlsaXR5OiBoaWRkZW47XHJcblx0XHRcdFx0dHJhbnNmb3JtOiB0cmFuc2xhdGVYKDYwcHgpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHQke3RoaXMuc2V0dGluZ3MuZWxlbWVudH0gI3ByZXZpZXcgPiB1bC5pdGVtcyB7XHJcblx0XHRcdFx0cGFkZGluZzogMDtcclxuXHRcdFx0XHRjb2xvcjogIzAwMDAwMDtcclxuXHRcdFx0XHRsaXN0LXN0eWxlLXR5cGU6IG5vbmU7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdCR7dGhpcy5zZXR0aW5ncy5lbGVtZW50fSAjcHJldmlldyA+IHVsLml0ZW1zID4gLnByZXZpZXctdGFibGUge1xyXG5cdFx0XHRcdHdpZHRoOiAxMDAlO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHQke3RoaXMuc2V0dGluZ3MuZWxlbWVudH0gI3ByZXZpZXcgPiB1bC5pdGVtcyA+IC5wcmV2aWV3LXRhYmxlIHRkIHtcclxuXHRcdFx0XHRwYWRkaW5nOiA0cHg7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdCR7dGhpcy5zZXR0aW5ncy5lbGVtZW50fSAuaXRlbXMubG9hZGluZyB7XHJcblx0XHRcdFx0ZGlzcGxheTogbm9uZTtcclxuXHRcdFx0XHRvdmVyZmxvdy1ZOiBub25lO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHQke3RoaXMuc2V0dGluZ3MuZWxlbWVudH0gLmNhcnQtbG9hZGVyLW92ZXJsYXkge1xyXG5cdFx0XHRcdHBvc2l0aW9uOiBmaXhlZDtcclxuXHRcdFx0XHR0b3A6IDA7IFxyXG5cdFx0XHQgICAgbGVmdDogMDtcclxuXHRcdFx0ICAgIHJpZ2h0OiAwO1xyXG5cdFx0XHQgICAgYm90dG9tOiAwO1xyXG5cdFx0XHRcdGJhY2tncm91bmQ6ICNmZmZmZmY7XHJcblx0XHRcdFx0d2lkdGg6IDEwMCU7XHJcblx0XHRcdFx0aGVpZ2h0OiAxMDAlO1xyXG5cdFx0XHRcdG1pbi1oZWlnaHQ6IDEwMCU7XHJcblx0XHRcdFx0b3ZlcmZsb3c6IGF1dG87XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdCR7dGhpcy5zZXR0aW5ncy5lbGVtZW50fSAuY2FydC1sb2FkZXItb3ZlcmxheSAuY2FydC1sb2FkZXIge1xyXG5cdFx0XHRcdHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuXHRcdFx0XHR3aWR0aDogNTBweDtcclxuXHRcdFx0XHRoZWlnaHQ6IDUwcHg7XHJcblx0XHRcdFx0bWFyZ2luLWxlZnQ6IC0yNXB4O1xyXG5cdFx0XHRcdG1hcmdpbi10b3A6IC0yNXB4O1xyXG5cdFx0XHRcdGxlZnQ6IDUwJTtcclxuXHRcdFx0XHRyaWdodDogNTAlO1xyXG5cdFx0XHRcdHRvcDogNTAlO1xyXG5cdFx0XHRcdGJvdHRvbTogNTAlO1xyXG5cdFx0XHR9XHJcblx0XHRgO1xyXG5cdCAgICBcclxuXHQgICAgRE9NLmFkZFN0eWxlKCdUdXJiby1lQ29tbWVyY2UtQ2FydCcsIGNzcyk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBDcmVhdGVzIGFuIGxvYWRpbmcgb3ZlcmxheS5cclxuXHQgKlxyXG5cdCAqIEByZXR1cm4gSFRNTERpdkVsZW1lbnRcclxuXHQgKi9cclxuXHRsb2FkaW5nT3ZlcmxheSgpXHJcblx0e1xyXG5cdFx0aWYgKGxvYWRpbmdPdmVybGF5KSB7XHJcblx0XHRcdHJldHVybiBsb2FkaW5nT3ZlcmxheTtcclxuXHRcdH1cclxuXHJcblx0XHRsZXQgbG9hZGVyO1xyXG5cclxuXHRcdGlmICh0aGlzLnNldHRpbmdzLmxvYWRlcikge1xyXG5cdFx0XHRsb2FkZXIgPSBET00uY3JlYXRlRWxlbWVudCgnaW1nJywge1xyXG5cdFx0XHRcdHNyYzogdGhpcy5zZXR0aW5ncy5sb2FkZXIsXHJcblx0XHRcdFx0Y2xhc3M6ICdjYXJ0LWxvYWRlcidcclxuXHRcdFx0fSk7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRsb2FkZXIgPSBjcmVhdGVMb2FkZXIoKTtcclxuXHRcdH1cclxuXHJcblx0XHRsb2FkaW5nT3ZlcmxheSA9IERPTS5jcmVhdGVFbGVtZW50KCdkaXYnLCB7XHJcblx0XHRcdGNsYXNzOiAnY2FydC1sb2FkZXItb3ZlcmxheSdcclxuXHRcdH0pO1xyXG5cclxuXHRcdGxvYWRpbmdPdmVybGF5LmFwcGVuZENoaWxkKGxvYWRlcik7XHJcblxyXG5cdFx0cmV0dXJuIGxvYWRpbmdPdmVybGF5O1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogTG9hZGluZyB0aGUgY2FydCBwcmV2aWV3LlxyXG5cdCAqXHJcblx0ICogQHJldHVybiB2b2lkXHJcblx0ICovXHJcblx0cHJldmlld1N0YXJ0TG9hZGluZygpXHJcblx0e1xyXG5cdFx0RE9NLmFkZENsYXNzKGl0ZW1zRGl2LCAnbG9hZGluZycpO1xyXG5cdFx0dGhpcy5wcmV2aWV3RWxlbWVudC5hcHBlbmRDaGlsZCh0aGlzLmxvYWRpbmdPdmVybGF5KCkpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogTG9hZGluZyB0aGUgY2FydCBwcmV2aWV3LlxyXG5cdCAqXHJcblx0ICogQHJldHVybiB2b2lkXHJcblx0ICovXHJcblx0cHJldmlld1N0b3BMb2FkaW5nKClcclxuXHR7XHJcblx0XHRpZiAoRE9NLmZpbmQoJy5jYXJ0LWxvYWRlci1vdmVybGF5JywgdGhpcy5wcmV2aWV3RWxlbWVudCkpIHtcclxuXHRcdFx0dGhpcy5wcmV2aWV3RWxlbWVudC5yZW1vdmVDaGlsZCh0aGlzLmxvYWRpbmdPdmVybGF5KCkpO1xyXG5cdFx0XHRET00ucmVtb3ZlQ2xhc3MoaXRlbXNEaXYsICdsb2FkaW5nJyk7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBSZWxvYWRzIHRoZSBpdGVtcyBpbiB0aGUgY2FydCBwcmV2aWV3LlxyXG5cdCAqXHJcblx0ICogQHJldHVybiB2b2lkXHJcblx0ICovXHJcblx0cmVsb2FkQ2FydFByZXZpZXcoKVxyXG5cdHtcclxuXHRcdHRoaXMucHJldmlld1N0YXJ0TG9hZGluZygpO1xyXG5cdFx0bGV0IGl0ZW1zID0gdGhpcy5nZXRDYXJ0SXRlbXMoKTtcclxuXHRcdHRoaXMuYWRkVG9QcmV2aWV3KGl0ZW1zKTtcclxuXHRcdFxyXG5cdFx0bGV0IGluc3RhbmNlID0gdGhpcztcclxuXHJcblx0XHRzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRpbnN0YW5jZS5wcmV2aWV3U3RvcExvYWRpbmcuY2FsbChpbnN0YW5jZSk7XHJcblx0XHR9LCAxMDAwKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEJpbmRzIGV2ZW50IGxpc3RlbmVycyB0byB0aGUgY2FydCBpY29uLlxyXG5cdCAqXHJcblx0ICogQHJldHVybiB2b2lkXHJcblx0ICovXHJcblx0YmluZEV2ZW50TGlzdGVuZXJzKClcclxuXHR7XHJcblx0XHR0aGlzLmljb24ub25jbGljayA9IGZ1bmN0aW9uKGUpIHtcclxuXHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdFx0XHR0aGlzLnRvZ2dsZUNhcnRQcmV2aWV3KCk7XHJcblx0XHR9LmJpbmQodGhpcyk7XHJcblxyXG5cdFx0RXZlbnRNYW5hZ2VyJDIuc3Vic2NyaWJlKCdjYXJ0LnByb2R1Y3QuYWRkZWQnLCBmdW5jdGlvbihhdHRyaWJ1dGVzKSB7XHJcblx0XHRcdHRoaXMub3BlbkNhcnRQcmV2aWV3KCk7XHJcblx0XHRcdHRoaXMuYWRkSXRlbShhdHRyaWJ1dGVzKTtcclxuXHRcdFx0dGhpcy5yZWxvYWRDYXJ0UHJldmlldygpO1xyXG5cdFx0fS5iaW5kKHRoaXMpKTtcclxuXHJcblx0XHRFdmVudE1hbmFnZXIkMi5zdWJzY3JpYmUoJ2NhcnQucHJvZHVjdC5mYXZvcml0ZWQnLCBmdW5jdGlvbihhdHRyaWJ1dGVzKSB7XHJcblx0XHRcdHRoaXMuZmF2b3JpdGVJdGVtKGF0dHJpYnV0ZXMpO1xyXG5cdFx0fS5iaW5kKHRoaXMpKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIE9wZW5zIHRoZSBjYXJ0IHByZXZpZXcuXHJcblx0ICpcclxuXHQgKiBAcmV0dXJuIHZvaWQgXHJcblx0ICovXHJcblx0b3BlbkNhcnRQcmV2aWV3KClcclxuXHR7XHJcblx0XHRpZiAoRE9NLmhhc0NsYXNzKHRoaXMucHJldmlld0VsZW1lbnQsICdvcGVuZWQnKSkge1xyXG5cdFx0XHR0aGlzLnJlbG9hZENhcnRQcmV2aWV3KCk7XHJcblx0XHR9XHJcblxyXG5cdFx0RE9NLnN3aXRjaENsYXNzZXModGhpcy5wcmV2aWV3RWxlbWVudCwgJ2Nsb3NlZCcsICdvcGVuZWQnKTtcclxuXHRcdHRoaXMucmVsb2FkQ2FydFByZXZpZXcoKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFRvZ2dsZXMgdGhlIG9wZW5pbmcgY2xvc2luZyBvZiB0aGUgY2FydCBwcmV2aWV3LlxyXG5cdCAqXHJcblx0ICogQHJldHVybiB2b2lkIFxyXG5cdCAqL1xyXG5cdHRvZ2dsZUNhcnRQcmV2aWV3KClcclxuXHR7XHJcblx0XHRsZXQgb3BlbmluZyA9IERPTS50b2dnbGVDbGFzcyh0aGlzLnByZXZpZXdFbGVtZW50LCAnb3BlbmVkJywgJ2Nsb3NlZCcpO1xyXG5cdFx0XHRcclxuXHRcdGlmIChvcGVuaW5nKSB7XHJcblx0XHRcdHRoaXMucmVsb2FkQ2FydFByZXZpZXcoKTtcdFxyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogUmV0cmlldmUgdGhlIGNhcnRzIGl0ZW1zIGZyb20gdGhlIGNvb2tpZS5cclxuXHQgKlxyXG5cdCAqIEByZXR1cm4gb2JqZWN0XHJcblx0ICovXHJcblx0Z2V0Q2FydEl0ZW1zKClcclxuXHR7XHJcblx0XHRsZXQgY2FydCA9IENvb2tpZS5nZXQodGhpcy5zZXR0aW5ncy5jb29raWVfbmFtZSk7XHJcblxyXG5cdFx0cmV0dXJuIChjYXJ0KSA/IGNhcnQuaXRlbXMgOiBbXTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEhpZGVzIHRoZSBjb21wb25lbnQgZnJvbSB0aGUgRE9NLlxyXG5cdCAqXHJcblx0ICogQHJldHVybiB2b2lkIFxyXG5cdCAqL1xyXG5cdGhpZGUoKVxyXG5cdHtcclxuXHRcdHRoaXMuZWxlbWVudC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xyXG5cdH1cclxufVxyXG5cclxuLyoqXHJcbiAqIENsb3NlcyB0aGUgY2FydCBwcmV2aWV3IGVsZW1lbnQuXHJcbiAqXHJcbiAqIEBwYXJhbSBldmVudC5jbGlja1xyXG4gKi9cclxuZnVuY3Rpb24gY2xvc2UoZXZlbnQpIHtcclxuXHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdERPTS5zd2l0Y2hDbGFzc2VzKHRoaXMucHJldmlld0VsZW1lbnQsICdvcGVuZWQnLCAnY2xvc2VkJyk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBDcmVhdGVzIHRoZSBjYXJ0IHN2ZyBpY29uLlxyXG4gKlxyXG4gKiBAcmV0dXJuIFNWR1NWR0VsZW1lbnRcclxuICovXHJcbmZ1bmN0aW9uIGNyZWF0ZUljb24oKSB7XHJcblx0bGV0IHN2ZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnROUyhcImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIsIFwic3ZnXCIpO1xyXG5cdGxldCBnID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKFwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiwgXCJnXCIpO1xyXG5cdGxldCBwYXRoID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKFwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiwgXCJwYXRoXCIpO1xyXG5cclxuXHRzdmcuc2V0QXR0cmlidXRlKCd2ZXJzaW9uJywgJzEuMScpO1xyXG5cdHN2Zy5zZXRBdHRyaWJ1dGUoJ3htbG5zJywgJ2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJyk7XHJcblx0c3ZnLnNldEF0dHJpYnV0ZSgneG1sbnM6eGxpbmsnLCAnaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluaycpO1xyXG5cdHN2Zy5zZXRBdHRyaWJ1dGUoJ3gnLCAnMHB4Jyk7XHJcblx0c3ZnLnNldEF0dHJpYnV0ZSgneScsICcwcHgnKTtcclxuXHRzdmcuc2V0QXR0cmlidXRlKCd3aWR0aCcsICc0MHB4Jyk7XHJcblx0c3ZnLnNldEF0dHJpYnV0ZSgnaGVpZ2h0JywgJzQwcHgnKTtcclxuXHRzdmcuc2V0QXR0cmlidXRlKCd2aWV3Qm94JywgJzAgMCA0NDYuODQzIDQ0Ni44NDMnKTtcclxuXHRzdmcuc2V0QXR0cmlidXRlKCdzdHlsZScsICdlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDQ0Ni44NDMgNDQ2Ljg0MzsnKTtcclxuXHRzdmcuc2V0QXR0cmlidXRlKCd4bWw6c3BhY2UnLCAncHJlc2VydmUnKTtcclxuXHJcblx0cGF0aC5zZXRBdHRyaWJ1dGUoJ2QnLCAnTTQ0NC4wOSw5My4xMDNjLTIuNjk4LTMuNjk5LTcuMDA2LTUuODg4LTExLjU4NC01Ljg4OEgxMDkuOTJjLTAuNjI1LDAtMS4yNDksMC4wMzgtMS44NSwwLjExOWwtMTMuMjc2LTM4LjI3Yy0xLjM3Ni0zLjk1OC00LjQwNi03LjExMy04LjMtOC42NDZMMTkuNTg2LDE0LjEzNGMtNy4zNzQtMi44ODctMTUuNjk1LDAuNzM1LTE4LjU5MSw4LjFjLTIuODkxLDcuMzY5LDAuNzMsMTUuNjk1LDguMSwxOC41OTFsNjAuNzY4LDIzLjg3Mmw3NC4zODEsMjE0LjM5OWMtMy4yODMsMS4xNDQtNi4wNjUsMy42NjMtNy4zMzIsNy4xODdsLTIxLjUwNiw1OS43MzljLTEuMzE4LDMuNjYzLTAuNzc1LDcuNzMzLDEuNDY4LDEwLjkxNmMyLjI0LDMuMTgzLDUuODgzLDUuMDc4LDkuNzczLDUuMDc4aDExLjA0NGMtNi44NDQsNy42MTYtMTEuMDQ0LDE3LjY0Ni0xMS4wNDQsMjguNjc1YzAsMjMuNzE4LDE5LjI5OCw0My4wMTIsNDMuMDEyLDQzLjAxMnM0My4wMTItMTkuMjk0LDQzLjAxMi00My4wMTJjMC0xMS4wMjktNC4yLTIxLjA1OS0xMS4wNDQtMjguNjc1aDkzLjc3NmMtNi44NDcsNy42MTYtMTEuMDQ4LDE3LjY0Ni0xMS4wNDgsMjguNjc1YzAsMjMuNzE4LDE5LjI5NCw0My4wMTIsNDMuMDEzLDQzLjAxMmMyMy43MTgsMCw0My4wMTItMTkuMjk0LDQzLjAxMi00My4wMTJjMC0xMS4wMjktNC4yLTIxLjA1OS0xMS4wNDMtMjguNjc1aDEzLjQzM2M2LjU5OSwwLDExLjk0Ny01LjM0OSwxMS45NDctMTEuOTQ4YzAtNi41OTktNS4zNDktMTEuOTQ3LTExLjk0Ny0xMS45NDdIMTQzLjY0N2wxMy4zMTktMzYuOTk2YzEuNzIsMC43MjQsMy41NzgsMS4xNTIsNS41MjMsMS4xNTJoMjEwLjI3OGM2LjIzNCwwLDExLjc1MS00LjAyNywxMy42NS05Ljk1OWw1OS43MzktMTg2LjM4N0M0NDcuNTU3LDEwMS41NjcsNDQ2Ljc4OCw5Ni44MDIsNDQ0LjA5LDkzLjEwM3ogTTE2OS42NTksNDA5LjgwN2MtMTAuNTQzLDAtMTkuMTE2LTguNTczLTE5LjExNi0xOS4xMTZzOC41NzMtMTkuMTE3LDE5LjExNi0xOS4xMTdzMTkuMTE2LDguNTc0LDE5LjExNiwxOS4xMTdTMTgwLjIwMiw0MDkuODA3LDE2OS42NTksNDA5LjgwN3ogTTMyNy4zNjcsNDA5LjgwN2MtMTAuNTQzLDAtMTkuMTE3LTguNTczLTE5LjExNy0xOS4xMTZzOC41NzQtMTkuMTE3LDE5LjExNy0xOS4xMTdjMTAuNTQyLDAsMTkuMTE2LDguNTc0LDE5LjExNiwxOS4xMTdTMzM3LjkwOSw0MDkuODA3LDMyNy4zNjcsNDA5LjgwN3ogTTQwMi41MiwxNDguMTQ5aC03My4xNjFWMTE1Ljg5aDgzLjQ5OUw0MDIuNTIsMTQ4LjE0OXogTTM4MS40NTMsMjEzLjg2MWgtNTIuMDk0di0zNy4wMzhoNjMuOTY3TDM4MS40NTMsMjEzLjg2MXogTTIzNC41NzEsMjEzLjg2MXYtMzcuMDM4aDY2LjExM3YzNy4wMzhIMjM0LjU3MXogTTMwMC42ODQsMjQyLjUzOHYzMS4wNjRoLTY2LjExM3YtMzEuMDY0SDMwMC42ODR6IE0xMzkuMTE1LDE3Ni44MjNoNjYuNzg0djM3LjAzOGgtNTMuOTMzTDEzOS4xMTUsMTc2LjgyM3ogTTIzNC41NzEsMTQ4LjE0OVYxMTUuODloNjYuMTEzdjMyLjI1OUgyMzQuNTcxeiBNMjA1Ljg5OCwxMTUuODl2MzIuMjU5aC03Ni43MzRsLTExLjE5MS0zMi4yNTlIMjA1Ljg5OHogTTE2MS45MTYsMjQyLjUzOGg0My45ODJ2MzEuMDY0aC0zMy4yMDZMMTYxLjkxNiwyNDIuNTM4eiBNMzI5LjM1OSwyNzMuNjAzdi0zMS4wNjRoNDIuOTA5bC05Ljk1NSwzMS4wNjRIMzI5LjM1OXonKTtcclxuXHJcblx0Zy5hcHBlbmRDaGlsZChwYXRoKTtcclxuXHRzdmcuYXBwZW5kQ2hpbGQoZyk7XHJcblxyXG5cdGxldCAgZGl2ID0gRE9NLmNyZWF0ZUVsZW1lbnQoJ2RpdicsIHtcclxuXHRcdGlkOiAnY2FydEljb24nLFxyXG5cdH0pO1xyXG5cclxuXHRkaXYuYXBwZW5kQ2hpbGQoc3ZnKTtcclxuXHJcblx0cmV0dXJuIGRpdjtcclxufVxyXG5cclxuLyoqXHJcbiAqIENyZWF0ZXMgdGhlIGNhcnQgbG9hZGVyIGljb24uXHJcbiAqXHJcbiAqIEByZXR1cm4gU1ZHU1ZHRWxlbWVudFxyXG4gKi9cclxuZnVuY3Rpb24gY3JlYXRlTG9hZGVyKCkge1xyXG5cdGxldCBzdmcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50TlMoXCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiLCBcInN2Z1wiKTtcclxuXHRsZXQgY291bnQgPSAxMjtcclxuXHRsZXQgZ3JvdXBzID0gW107XHJcblx0bGV0IHJlY3RhbmdlbHMgPSBbXTtcclxuXHRsZXQgYW5pbWF0aW9ucyA9IFtdO1xyXG5cclxuXHRzdmcuc2V0QXR0cmlidXRlKCdjbGFzcycsICdsZHMtc3Bpbm5lcicpO1xyXG5cdHN2Zy5zZXRBdHRyaWJ1dGUoJ3dpZHRoJywgJzIwMHB4Jyk7XHJcblx0c3ZnLnNldEF0dHJpYnV0ZSgnaGVpZ2h0JywgJzIwMHB4Jyk7XHJcblx0c3ZnLnNldEF0dHJpYnV0ZSgneG1sbnMnLCAnaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnKTtcclxuXHRzdmcuc2V0QXR0cmlidXRlKCd4bWxuczp4bGluaycsICdodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rJyk7XHJcblx0c3ZnLnNldEF0dHJpYnV0ZSgndmlld0JveCcsICcwIDAgMTAwIDEwMCcpO1xyXG5cdHN2Zy5zZXRBdHRyaWJ1dGUoJ3ByZXNlcnZlQXNwZWN0UmF0aW8nLCAneE1pZFlNaWQnKTtcclxuXHRzdmcuc2V0QXR0cmlidXRlKCdzdHlsZScsICdiYWNrZ3JvdW5kOiBub25lOycpO1xyXG5cdFxyXG5cdHZhciByb3RhdGlvbiA9IDA7XHJcblxyXG5cdGZvciAodmFyIGkgPSAwOyBpIDwgY291bnQ7IGkrKykge1xyXG5cdFx0bGV0IGdyb3VwID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKFwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiwgXCJnXCIpO1xyXG5cdFx0Z3JvdXAuc2V0QXR0cmlidXRlKCd0cmFuc2Zvcm0nLCAncm90YXRlKCcgKyByb3RhdGlvbiArICcgNTAgNTApJyk7XHJcblx0XHRyb3RhdGlvbiArPSAzMDtcclxuXHRcdGdyb3Vwcy5wdXNoKGdyb3VwKTtcclxuXHR9XHJcblxyXG5cdGZvciAodmFyIGkgPSAwOyBpIDwgY291bnQ7IGkrKykge1xyXG5cdFx0bGV0IHJlY3RhbmdlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnROUyhcImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIsIFwicmVjdFwiKTtcclxuXHRcdHJlY3RhbmdlbC5zZXRBdHRyaWJ1dGUoJ3gnLCAnNDcnKTtcclxuXHRcdHJlY3RhbmdlbC5zZXRBdHRyaWJ1dGUoJ3knLCAnMjQnKTtcclxuXHRcdHJlY3RhbmdlbC5zZXRBdHRyaWJ1dGUoJ3J4JywgJzkuNCcpO1xyXG5cdFx0cmVjdGFuZ2VsLnNldEF0dHJpYnV0ZSgncnknLCAnNC44Jyk7XHJcblx0XHRyZWN0YW5nZWwuc2V0QXR0cmlidXRlKCd3aWR0aCcsICc2Jyk7XHJcblx0XHRyZWN0YW5nZWwuc2V0QXR0cmlidXRlKCdoZWlnaHQnLCAnMTInKTtcclxuXHRcdHJlY3RhbmdlbC5zZXRBdHRyaWJ1dGUoJ2ZpbGwnLCAnIzQ2NThhYycpO1xyXG5cdFx0cmVjdGFuZ2Vscy5wdXNoKHJlY3RhbmdlbCk7XHJcblx0fVxyXG5cclxuXHR2YXIgYmVnaW4gPSAwLjA5ICogMTE7XHJcblxyXG5cdGZvciAodmFyIGkgPSAwOyBpIDwgY291bnQ7IGkrKykge1xyXG5cdFx0bGV0IGFuaW1hdGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50TlMoXCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiLCBcImFuaW1hdGVcIik7XHJcblx0XHRhbmltYXRlLnNldEF0dHJpYnV0ZSgnYXR0cmlidXRlTmFtZScsICdvcGFjaXR5Jyk7XHJcblx0XHRhbmltYXRlLnNldEF0dHJpYnV0ZSgndmFsdWVzJywgJzE7MCcpO1xyXG5cdFx0YW5pbWF0ZS5zZXRBdHRyaWJ1dGUoJ3RpbWVzJywgJzA7MScpO1xyXG5cdFx0YW5pbWF0ZS5zZXRBdHRyaWJ1dGUoJ2R1cicsICcxcycpO1xyXG5cdFx0YW5pbWF0ZS5zZXRBdHRyaWJ1dGUoJ2JlZ2luJywgYmVnaW4udG9GaXhlZCg4KSArICdzJyk7XHJcblx0XHRhbmltYXRlLnNldEF0dHJpYnV0ZSgncmVwZWF0Q291bnQnLCAnaW5kZWZpbml0ZScpO1xyXG5cdFx0YW5pbWF0aW9ucy5wdXNoKGFuaW1hdGUpO1xyXG5cdFx0YmVnaW4gLT0gMC4wOTtcclxuXHR9XHJcblxyXG5cdGZvciAodmFyIGkgPSAwOyBpIDwgZ3JvdXBzLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRsZXQgZ3JvdXAgPSBncm91cHNbaV07XHRcdFxyXG5cdFx0bGV0IHJlY3RhbmdlbCA9IHJlY3RhbmdlbHNbaV07XHJcblx0XHRsZXQgYW5pbWF0ZSA9IGFuaW1hdGlvbnNbaV07XHJcblx0XHRyZWN0YW5nZWwuYXBwZW5kQ2hpbGQoYW5pbWF0ZSk7XHJcblx0XHRncm91cC5hcHBlbmRDaGlsZChyZWN0YW5nZWwpO1xyXG5cdFx0c3ZnLmFwcGVuZENoaWxkKGdyb3VwKTtcclxuXHR9XHJcblxyXG5cdERPTS5hZGRDbGFzcyhzdmcsICdjYXJ0LWxvYWRlcicpO1xyXG5cclxuXHRyZXR1cm4gc3ZnO1x0XHJcbn1cblxuLyoqXHJcbiAqIEBmaWxlIFxyXG4gKiBGaWx0ZXIgY2xhc3MuXHJcbiAqXHJcbiAqIFRoZSBGaWx0ZXIgT2JqZWN0LCBoYW5kbGVzIHRoZSBmaWx0ZXIgb2YgdGhlIHByb2R1Y3RzL3NlcnZpY2VzLlxyXG4gKi9cclxuXHJcbi8qKlxyXG4gKiBUaGUgZGVmYXVsdCBzZXR0aW5ncyBvZiB0aGUgZmlsdGVyLlxyXG4gKi9cclxubGV0IGRlZmF1bHRTZXR0aW5ncyQyID0ge1xyXG5cdGVsZW1lbnQ6ICcuZmlsdGVyJyxcclxuXHRjbGFzczogJycsXHJcblx0d2lkdGg6ICcnLFxyXG5cdGhlaWdodDogJycsXHJcblx0bm9fY3NzOiBmYWxzZSxcclxufTtcclxuXHJcbi8qKlxyXG4gKiBTdG9yZXMgdGhlIGNvbnRhaW5lciBvYmplY3QuXHJcbiAqXHJcbiAqIEB2YXIgXFxDb3JlXFxDb250YWluZXJcclxuICovXHJcbmxldCBDb250YWluZXIkMTtcclxuXHJcbmNsYXNzIEZpbHRlciBcclxue1xyXG5cdC8qKlxyXG5cdCAqIC0gSW5pdGlhbGl6ZSB0aGUgSW9DIGNvbnRhaW5lci5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSBcXENvcmVcXENvbnRhaW5lciB8IGNvbnRhaW5lclxyXG5cdCAqIEByZXR1cm4gdm9pZFxyXG5cdCAqL1xyXG5cdGNvbnN0cnVjdG9yKGNvbnRhaW5lcikgXHJcblx0e1xyXG5cdFx0Q29udGFpbmVyJDEgPSBjb250YWluZXI7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBTZXR1cCB0aGUgZmlsdGVyIGNsYXNzLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIG9iamVjdCB8IHNldHRpbmdzXHJcblx0ICogQHJldHVybiB2b2lkXHJcblx0ICovXHJcblx0c2V0dXAoc2V0dGluZ3MpXHJcblx0e1xyXG5cdFx0aWYodHlwZW9mIHNldHRpbmdzICE9ICdvYmplY3QnKSB7XHJcblx0XHRcdHRocm93IG5ldyBJbnZhbGlkQXJndW1lbnRFeGNlcHRpb24kMTtcclxuXHRcdH1cclxuXHJcblx0XHR0aGlzLnNldHRpbmdzID0gQ29tbW9uLmV4dGVuZChkZWZhdWx0U2V0dGluZ3MkMiwgc2V0dGluZ3MpO1xyXG5cclxuXHRcdGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCBmdW5jdGlvbigpIHtcclxuXHJcblx0XHRcdHRoaXMuc2V0RWxlbWVudCh0aGlzLnNldHRpbmdzLmVsZW1lbnQpO1xyXG5cclxuXHRcdFx0dGhpcy5hZGRTdHlsZVRhZygpO1x0XHJcblx0XHR9LmJpbmQodGhpcykpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogU2V0cyB0aGUgZWxlbWVudCB0byBiZSBib3VuZCB0by5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSBzdHJpbmcgfCBzZWxlY3RvclxyXG5cdCAqIEByZXR1cm4gdm9pZFxyXG5cdCAqL1xyXG5cdHNldEVsZW1lbnQoc2VsZWN0b3IpXHJcblx0e1xyXG5cdFx0dGhpcy5lbGVtZW50ID0gRE9NLmZpbmQoc2VsZWN0b3IpO1xyXG5cdFx0XHJcblx0XHRET00uYWRkQ2xhc3ModGhpcy5lbGVtZW50LCB0aGlzLnNldHRpbmdzLmNsYXNzKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEFkZCB0aGUgZUNvbW1lcmNlIHN0eWxlIHRhZ3MgdG8gdGhlIERPTS5cclxuXHQgKi9cclxuXHRhZGRTdHlsZVRhZygpIFxyXG5cdHtcclxuXHRcdGlmIChET00uZmluZCgnI1R1cmJvLWVDb21tZXJjZS1GaWx0ZXInKSkge1xyXG5cdFx0XHRyZXR1cm47XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKHRoaXMuc2V0dGluZ3Mubm9fY3NzKSB7XHJcblx0XHRcdHJldHVybjtcclxuXHRcdH1cclxuXHJcblx0XHRsZXQgd2lkdGggPSAodGhpcy5zZXR0aW5ncy53aWR0aCkgPyAnd2lkdGg6JyArIHRoaXMuc2V0dGluZ3Mud2lkdGggKyAnOycgOiAnJztcclxuXHRcdGxldCBtaW5XaWR0aCA9IHRoaXMuc2V0dGluZ3MubWluX3dpZHRoIHx8ICcyMDBweCc7XHJcblx0XHRsZXQgaGVpZ2h0ID0gdGhpcy5zZXR0aW5ncy5oZWlnaHQgfHwgJ2F1dG8nO1xyXG5cclxuXHRcdGxldCBjc3MgPSBgXHJcblx0XHRcdCR7dGhpcy5zZXR0aW5ncy5lbGVtZW50fSB7XHJcblx0XHRcdFx0cG9zaXRpb246IHJlbGF0aXZlO1xyXG5cdFx0XHRcdG1hcmdpbjogNXB4IDVweDtcclxuXHRcdFx0XHRib3JkZXI6IDFweCBzb2xpZCAjZTRlNGU0O1xyXG5cdFx0XHRcdCR7d2lkdGh9XHJcblx0XHRcdFx0bWluLXdpZHRoOiAke21pbldpZHRofTtcclxuXHRcdFx0XHRoZWlnaHQ6ICR7aGVpZ2h0fTtcclxuXHRcdFx0XHRtaW4taGVpZ2h0OiAyMDBweDtcclxuXHRcdFx0XHRjb2xvcjogI2ZmZmZmZjtcclxuXHRcdFx0XHRvdmVyZmxvdzogaGlkZGVuO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0YDtcclxuXHQgICAgXHJcblx0ICAgIERPTS5hZGRTdHlsZSgnVHVyYm8tZUNvbW1lcmNlLUZpbHRlcicsIGNzcyk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBIaWRlcyB0aGUgY29tcG9uZW50IGZyb20gdGhlIERPTS5cclxuXHQgKlxyXG5cdCAqIEByZXR1cm4gdm9pZCBcclxuXHQgKi9cclxuXHRoaWRlKClcclxuXHR7XHJcblx0XHR0aGlzLmVsZW1lbnQuc3R5bGUuZGlzcGxheSA9ICdub25lJztcclxuXHR9XHJcbn1cblxuLy8gSGVscGVyc1xyXG4vLyBFeGNlcHRpb25zXHJcbi8qKlxyXG4gKiBAZmlsZSBcclxuICogQ2FydCBjbGFzcy5cclxuICpcclxuICogSGFuZGxlcyBhZGRpbmcsIHJlbW92aW5nIGV0Yy4uLiBvZiBpdGVtcy5cclxuICovXHJcblxyXG4vKipcclxuICogVGhlIGRlZmF1bHQgc2V0dGluZ3Mgb2YgdGhlIGNhcnQuXHJcbiAqXHJcbiAqIEB2YXIgb2JqZWN0XHJcbiAqL1xyXG5sZXQgZGVmYXVsdFNldHRpbmdzJDMgPSB7XHJcblx0ZWxlbWVudDogJy5jaGVja291dCcsXHJcblx0bm9fY3NzOiBmYWxzZSxcclxufTtcclxuXHJcbi8qKlxyXG4gKiBTdG9yZXMgdGhlIGNvbnRhaW5lciBvYmplY3QuXHJcbiAqXHJcbiAqIEB2YXIgXFxDb3JlXFxDb250YWluZXJcclxuICovXHJcbmxldCBDb250YWluZXIkMjtcclxuXHJcbi8qKlxyXG4gKiBTdG9yZXMgdGhlIGV2ZW50IG1hbmFnZXIgb2JqZWN0LlxyXG4gKlxyXG4gKiBAdmFyIFxcQ29yZVxcRXZlbnRNYW5hZ2VyXHJcbiAqL1xyXG5sZXQgRXZlbnRNYW5hZ2VyJDM7XHJcblxyXG4vKipcclxuICogU3RvcmVzIHRoZSByZXF1ZXN0IG9iamVjdC5cclxuICpcclxuICogQHZhciBcXEhlbHBlcnNcXFJlcXVlc3RcclxuICovXHJcbmxldCBIdHRwJDE7XHJcblxyXG5cclxuY2xhc3MgQ2hlY2tvdXQgXHJcbntcclxuXHQvKipcclxuXHQgKiAtIEluaXRpYWxpemUgdGhlIElvQyBjb250YWluZXJcclxuXHQgKiAtIEluaXRpYWxpemUgdGhlIFJlcXVlc3RcclxuXHQgKiAtIEluaXRpYWxpemUgdGhlIEV2ZW50TWFuYWdlclxyXG5cdCAqIC0gTGlzdGVuIHRvIGNoZWNrb3V0IGV2ZW50LlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIFxcQ29yZVxcQ29udGFpbmVyIHwgY29udGFpbmVyXHJcblx0ICogQHBhcmFtIFxcSGVscGVyc1xcUmVxdWVzdCB8IGh0dHBcclxuXHQgKiBAcGFyYW0gXFxDb3JlXFxFdmVudE1hbmFnZXIgfCBldmVudE1hbmFnZXJcclxuXHQgKiBAcmV0dXJuIHZvaWRcclxuXHQgKi9cclxuXHRjb25zdHJ1Y3Rvcihjb250YWluZXIsIGh0dHAsIGV2ZW50TWFuYWdlcikgXHJcblx0e1xyXG5cdFx0Q29udGFpbmVyJDIgPSBjb250YWluZXI7XHJcblx0XHRIdHRwJDEgPSBodHRwO1xyXG5cdFx0RXZlbnRNYW5hZ2VyJDMgPSBldmVudE1hbmFnZXI7XHJcblx0XHRcclxuXHRcdEV2ZW50TWFuYWdlciQzLnN1YnNjcmliZSgnY2FydC5jaGVja291dCcsIGZ1bmN0aW9uKCkge1x0XHJcblx0XHRcdHRoaXMuaGlkZUFsbCgpO1xyXG5cdFx0XHR0aGlzLnNob3coKTtcclxuXHRcdH0uYmluZCh0aGlzKSk7XHRcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFNldHMgdGhlIG9iamVjdCBieSB0aGUgdXNlcnMgc2V0dGluZy5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSBvYmplY3QgfCBzZXR0aW5nc1xyXG5cdCAqIEByZXR1cm4gdm9pZFxyXG5cdCAqL1xyXG5cdHNldHVwKHNldHRpbmdzKVxyXG5cdHtcclxuXHRcdGlmICh0eXBlb2Ygc2V0dGluZ3MgIT0gJ29iamVjdCcpIHtcclxuXHRcdFx0dGhyb3cgbmV3IEludmFsaWRBcmd1bWVudEV4Y2VwdGlvbiQxO1xyXG5cdFx0fVxyXG5cclxuXHRcdHRoaXMuc2V0dGluZ3MgPSBDb21tb24uZXh0ZW5kKGRlZmF1bHRTZXR0aW5ncyQzLCBzZXR0aW5ncyk7XHJcblxyXG5cdFx0ZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsIGZ1bmN0aW9uKCkge1xyXG5cclxuXHRcdFx0dGhpcy5zZXRFbGVtZW50KHRoaXMuc2V0dGluZ3MuZWxlbWVudCk7XHJcblx0XHRcdHRoaXMuaGlkZSgpO1xyXG5cdFx0XHR0aGlzLmFkZFN0eWxlVGFnKCk7XHJcblx0XHR9LmJpbmQodGhpcykpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQmluZHMgZXZlcnRoaW5nIHRvIHRoZSBlbGVtZW50LlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIHN0cmluZyB8IHNlbGVjdG9yXHJcblx0ICogQHJldHVybiB2b2lkXHJcblx0ICovXHJcblx0c2V0RWxlbWVudChzZWxlY3RvcilcclxuXHR7XHJcblx0XHR0aGlzLmVsZW1lbnQgPSBET00uZmluZChzZWxlY3Rvcik7XHJcblxyXG5cdFx0aWYgKHRoaXMuZWxlbWVudCkge1xyXG5cdFx0XHRET00uYWRkQ2xhc3ModGhpcy5lbGVtZW50LCB0aGlzLnNldHRpbmdzLmNsYXNzKTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEFkZCB0aGUgZUNvbW1lcmNlIHN0eWxlIHRhZ3MgdG8gdGhlIERPTS5cclxuXHQgKlxyXG5cdCAqIEByZXR1cm4gdm9pZFxyXG5cdCAqL1xyXG5cdGFkZFN0eWxlVGFnKCkgXHJcblx0e1xyXG5cdFx0aWYgKERPTS5maW5kKCcjVHVyYm8tZUNvbW1lcmNlLUNoZWNrb3V0JykpIHtcclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0fVxyXG5cclxuXHRcdGlmICh0aGlzLnNldHRpbmdzLm5vX2Nzcykge1xyXG5cdFx0XHRyZXR1cm47XHJcblx0XHR9XHJcblxyXG5cdFx0bGV0IHBvc2l0aW9uID0gKHRoaXMuc2V0dGluZ3MuZml4ZWQpID8gJ2ZpeGVkJyA6ICdhYnNvbHV0ZSc7XHJcblxyXG5cdFx0bGV0IGNzcyA9IGBcclxuXHRcdFx0JHt0aGlzLnNldHRpbmdzLmVsZW1lbnR9IHtcclxuXHRcdFx0XHR3aWR0aDogMTAwJTtcclxuXHRcdFx0XHRtaW4taGVpZ2h0OiA0MDBweDtcclxuXHRcdFx0XHRib3JkZXI6IDFweCBzb2xpZCAjZTRlNGU0O1xyXG5cdFx0XHR9XHJcblx0XHRgO1xyXG5cdCAgICBcclxuXHQgICAgRE9NLmFkZFN0eWxlKCdUdXJiby1lQ29tbWVyY2UtQ2hlY2tvdXQnLCBjc3MpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogSGlkZXMgYWxsIGlycmVsZXZhbnQgZWxlbWVudHMgZnJvbSB0aGUgRE9NLlxyXG5cdCAqXHJcblx0ICogQHJldHVybiB2b2lkIFxyXG5cdCAqL1xyXG5cdGhpZGVBbGwoKVxyXG5cdHtcdFxyXG5cdFx0Q29udGFpbmVyJDIuQ29tcG9uZW50cy5ib290ZWQuZm9yRWFjaChmdW5jdGlvbihjb21wb25lbnQpIHtcclxuXHRcdFx0aWYgKGNvbXBvbmVudC5jb25zdHJ1Y3Rvci5uYW1lICE9ICdDaGVja291dCcpIHtcclxuXHRcdFx0XHRjb21wb25lbnQuaGlkZSgpO1xyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEhpZGVzIHRoZSBjb21wb25lbnQgZnJvbSB0aGUgRE9NLlxyXG5cdCAqXHJcblx0ICogQHJldHVybiB2b2lkIFxyXG5cdCAqL1xyXG5cdGhpZGUoKVxyXG5cdHtcclxuXHRcdHRoaXMuZWxlbWVudC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogU2hvd3MgdGhlIGVsZW1lbnQgb24gdGhlIERPTS5cclxuXHQgKlxyXG5cdCAqIEByZXR1cm4gdm9pZCBcclxuXHQgKi9cclxuXHRzaG93KClcclxuXHR7XHJcblx0XHR0aGlzLmVsZW1lbnQuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XHJcblx0fVxyXG59XG5cbi8qKlxyXG4gKiBAZmlsZSBcclxuICogUHJvZHVjdHMgY2xhc3MuXHJcbiAqXHJcbiAqIFRoZSBQcm9kdWN0cyBjb21wb25lbnQsIGhhbmRsZXMgdGhlIHByb2R1Y3RzIHRhc2tzLlxyXG4gKi9cclxuXHJcblxyXG4vKipcclxuICogVGhlIGRlZmF1bHQgc2V0dGluZ3Mgb2YgZWFjaCBwcm9kdWN0LlxyXG4gKlxyXG4gKiBAdmFyIG9iamVjdFxyXG4gKi9cclxubGV0IGRlZmF1bHRTZXR0aW5ncyQ0ID0ge1xyXG5cdGVsZW1lbnQ6ICcucHJvZHVjdHMnLFxyXG5cdGNsYXNzOiAnJyxcclxuXHRpdGVtX2NsYXNzOiAnJyxcclxuXHRhZGRfYnV0dG9uX2NsYXNzOiAnYnRuIGJ0bi1wcmltYXJ5JyxcclxuXHRmYXZvcml0ZV9idXR0b25fY2xhc3M6ICdidG4gYnRuLWRhbmdlcicsXHJcblx0d2lkdGg6ICcyMDBweCcsXHJcblx0aGVpZ2h0OiAnMjUwcHgnLFxyXG5cdGF0dHJpYnV0ZXM6IFsnbmFtZScsICdwcmljZScsICdkZWxpdmVyeVRpbWUnLCAnaW1hZ2UnXSxcclxuXHR1cmw6ICdwcm9kdWN0cy5waHAnLFxyXG5cdG5vX2NzczogZmFsc2UsXHJcbn07XHJcblxyXG4vKipcclxuICogU3RvcmVzIHRoZSBjb250YWluZXIgb2JqZWN0LlxyXG4gKiBcclxuICogQHZhciBcXENvcmVcXENvbnRhaW5lclxyXG4gKi9cclxubGV0IENvbnRhaW5lciQzO1xyXG5cclxuLyoqXHJcbiAqIFN0b3JlcyB0aGUgY29udGFpbmVyIG9iamVjdC5cclxuICogXHJcbiAqIEB2YXIgXFxDb3JlXFxFdmVudE1hbmFnZXJcclxuICovXHJcbmxldCBFdmVudE1hbmFnZXIkNDtcclxuXHJcbi8qKlxyXG4gKiBTdG9yZXMgdGhlIHJlcXVlc3Qgb2JqZWN0LlxyXG4gKiBcclxuICogQHZhciBcXEhlbHBlclxcUmVxdWVzdCBcclxuICovXHJcbmxldCBIdHRwJDI7XHJcblxyXG4vKipcclxuICogU3RvcmVzIHRoZSBjaHVua2VkIHBlciBcclxuICogcGFnZSBwcm9kdWN0cy5cclxuICogXHJcbiAqIEB2YXIgYXJyYXlcclxuICovXHJcbmxldCBjaHVua2VkUHJvZHVjdHM7XHJcblxyXG5jbGFzcyBQcm9kdWN0cyBcclxue1xyXG5cdC8qKlxyXG5cdCAqIEluaXRhbGl6ZSB0aGUgQ29udGFpbmVyLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIFxcQ29yZVxcQ29udGFpbmVyIHwgY29udGFpbmVyXHJcblx0ICogQHBhcmFtIFxcSGVscGVyc1xcUmVxdWVzdCB8IGh0dHBcclxuXHQgKiBAcmV0dXJuIHZvaWRcclxuXHQgKi9cclxuXHRjb25zdHJ1Y3Rvcihjb250YWluZXIsIGh0dHAsIGV2ZW50TWFuYWdlcikgXHJcblx0e1xyXG5cdFx0Q29udGFpbmVyJDMgPSBjb250YWluZXI7XHJcblx0XHRIdHRwJDIgPSBodHRwO1xyXG5cdFx0RXZlbnRNYW5hZ2VyJDQgPSBldmVudE1hbmFnZXI7XHJcblx0XHRjaHVua2VkUHJvZHVjdHMgPSBbXTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFNldHMgdGhlIGdpdmVuIHNldHRpbmdzIGZyb20gdGhlIHVzZXIuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gb2JqZWN0IHwgc2V0dGluZ3NcclxuXHQgKiBAcmV0dXJuIHZvaWRcclxuXHQgKi9cclxuXHRzZXR1cChzZXR0aW5ncylcclxuXHR7XHJcblx0XHRpZiAodHlwZW9mIHNldHRpbmdzICE9ICdvYmplY3QnKSB7XHJcblx0XHRcdHRocm93IG5ldyBJbnZhbGlkQXJndW1lbnRFeGNlcHRpb24kMTtcclxuXHRcdH1cclxuXHJcblx0XHR0aGlzLnNldHRpbmdzID0gQ29tbW9uLmV4dGVuZChkZWZhdWx0U2V0dGluZ3MkNCwgc2V0dGluZ3MpO1xyXG5cdFx0dGhpcy50b3RhbEl0ZW1zID0gbnVsbDtcclxuXHJcblx0XHRkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgZnVuY3Rpb24oKSB7XHJcblxyXG5cdFx0XHR0aGlzLnNldEVsZW1lbnQodGhpcy5zZXR0aW5ncy5lbGVtZW50KTtcclxuXHJcblx0XHRcdHRoaXMuYWRkU3R5bGVUYWcoKTtcdFxyXG5cclxuXHRcdFx0dGhpcy5sb2FkUHJvZHVjdHMoMSk7XHJcblx0XHR9LmJpbmQodGhpcykpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogTG9hZHMgdGhlIHByb2R1Y3RzIGZvciB0aGUgcGFnZS5cclxuXHQgKiBcclxuXHQgKiBAcGFyYW0gbnVtYmVyIHwgcGFnZU51bWJlclxyXG5cdCAqIEByZXR1cm4gdm9pZFxyXG5cdCAqL1xyXG5cdGxvYWRQcm9kdWN0cyhwYWdlTnVtYmVyID0gMSlcclxuXHR7XHJcblx0XHRpZiAoQ29udGFpbmVyJDMuUGFnaW5hdGlvbiAmJiBDb250YWluZXIkMy5QYWdpbmF0aW9uLmJvb3RlZCkge1xyXG5cdFx0XHRzd2l0Y2goQ29udGFpbmVyJDMuUGFnaW5hdGlvbi5zZXR0aW5ncy5wcm9jY2Vzc2luZykgXHJcblx0XHRcdHtcclxuXHRcdFx0XHRjYXNlICdjbGllbnQtc2lkZSc6XHJcblx0XHRcdFx0XHRyZXR1cm4gdGhpcy5sb2FkUGFnZVByb2R1Y3RzQnlDbGllbnQocGFnZU51bWJlcik7XHJcblx0XHRcdFx0XHRicmVhaztcclxuXHRcdFx0XHRjYXNlICdzZXJ2ZXItc2lkZSc6XHJcblx0XHRcdFx0XHRyZXR1cm4gdGhpcy5sb2FkUGFnZVByb2R1Y3RzQnlTZXJ2ZXIocGFnZU51bWJlcik7XHJcblx0XHRcdFx0XHRicmVhaztcclxuXHRcdFx0XHRkZWZhdWx0OlxyXG5cdFx0XHRcdFx0dGhyb3cgbmV3IEludmFsaWRBcmd1bWVudEV4Y2VwdGlvbiQxKCdmb3IgcHJvY2Nlc3NpbmcgeW91IGNhbiBjaG9vc2UgXFwnc2VydmVyLXNpZGVcXCcgb3IgXFwnY2xpZW50LXNpZGVcXCcgb3B0aW9ucy4nKTtcclxuXHRcdFx0fVxyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0dGhpcy5sb2FkUGFnZVByb2R1Y3RzQnlTZXJ2ZXIoKTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIExvYWRzIHRoZSBwcm9kdWN0cyBhbmQgXHJcblx0ICogcmVwbGFjZSB0aGVtIGluIHRoZSBkaXYgY29udGFpbmVyLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIG51bWJlciB8IHBhZ2VOdW1iZXJcclxuXHQgKiBAcmV0dXJuIHZvaWRcclxuXHQgKi9cclxuXHRsb2FkUGFnZVByb2R1Y3RzQnlTZXJ2ZXIocGFnZU51bWJlciA9IG51bGwpXHJcblx0e1xyXG5cdFx0bGV0IHJlcXVlc3QgPSB0aGlzLmdldFByb2R1Y3RzKHBhZ2VOdW1iZXIpO1xyXG5cclxuXHRcdHJlcXVlc3QudGhlbihmdW5jdGlvbihwcm9kdWN0cykge1xyXG5cclxuXHRcdFx0dGhpcy5jdXJyZW50SXRlbXMgPSBwcm9kdWN0cztcclxuXHJcblx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5jdXJyZW50SXRlbXMubGVuZ3RoOyBpKyspIHtcclxuXHRcdFx0XHR2YXIgcHJvZHVjdCA9IHRoaXMuY3VycmVudEl0ZW1zW2ldO1xyXG5cdFx0XHRcdEV2ZW50TWFuYWdlciQ0LnB1Ymxpc2goJ3Byb2R1Y3RzLmxvYWRpbmcnLCBwcm9kdWN0KTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0RXZlbnRNYW5hZ2VyJDQucHVibGlzaCgncHJvZHVjdHMubG9hZGVkJywgcHJvZHVjdHMpO1xyXG5cdFx0XHR0aGlzLnJlcGxhY2VJdGVtcyhwcm9kdWN0cyk7XHJcblx0XHRcdHJlc29sdmUoKTtcclxuXHRcdH0uYmluZCh0aGlzKSkuY2F0Y2goZnVuY3Rpb24oZXJyb3IpIHtcclxuXHJcblx0XHR9KTtcclxuXHJcblx0XHRyZXR1cm4gcmVxdWVzdDtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIExvYWRzIHRoZSBwcm9kdWN0cyBhbmQgXHJcblx0ICogcmVwbGFjZSB0aGVtIGluIHRoZSBkaXYgY29udGFpbmVyLlxyXG5cdCAqXHJcblx0ICogQHJldHVybiB2b2lkXHJcblx0ICovXHJcblx0bG9hZFBhZ2VQcm9kdWN0c0J5Q2xpZW50KHBhZ2VOdW1iZXIpXHJcblx0e1xyXG5cdFx0bGV0IHJlcXVlc3Q7XHJcblxyXG5cdFx0aWYgKHRoaXMudG90YWxJdGVtcyA9PSBudWxsKSB7IC8vIG5lZWQgdG8gZmV0Y2ggdGhlbSBmcm9tIHRoZSBzZXJ2ZXIuXHJcblx0XHRcdHJlcXVlc3QgPSB0aGlzLmdldFByb2R1Y3RzKCk7XHJcblx0XHR9IGVsc2UgeyAvLyBubyBuZWVkIHRvIHdhaXQgY2FuIHJlc29sdmUgaW1tZWRpYXRlbHkgd2l0aCB0aGUgcHJvZHVjdHMuIFxyXG5cdFx0XHRyZXF1ZXN0ID0gUHJvbWlzZS5yZXNvbHZlKHRoaXMudG90YWxJdGVtcyk7XHJcblx0XHR9XHJcblxyXG5cdFx0cmVxdWVzdC50aGVuKGZ1bmN0aW9uKHByb2R1Y3RzKSB7XHJcblx0XHRcdHRoaXMudG90YWxJdGVtcyA9IHByb2R1Y3RzO1xyXG5cclxuXHRcdFx0bGV0IHBhZ2VzID0gdGhpcy5jYWxjdWxhdGVDbGllbnRQYWdlcyhwcm9kdWN0cyk7XHJcblxyXG5cdFx0XHR0aGlzLmN1cnJlbnRJdGVtcyA9IHBhZ2VzW3BhZ2VOdW1iZXItMV07XHJcblxyXG5cdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuY3VycmVudEl0ZW1zLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdFx0dmFyIHByb2R1Y3QgPSB0aGlzLmN1cnJlbnRJdGVtc1tpXTtcclxuXHRcdFx0XHRFdmVudE1hbmFnZXIkNC5wdWJsaXNoKCdwcm9kdWN0cy5sb2FkaW5nJywgcHJvZHVjdCk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdEV2ZW50TWFuYWdlciQ0LnB1Ymxpc2goJ3Byb2R1Y3RzLmxvYWRlZCcsIHByb2R1Y3RzKTtcclxuXHRcdFx0dGhpcy5yZXBsYWNlSXRlbXModGhpcy5jdXJyZW50SXRlbXMpO1xyXG5cdFx0XHRQcm9taXNlLnJlc29sdmUodGhpcy5jdXJyZW50SXRlbXMpO1xyXG5cclxuXHRcdH0uYmluZCh0aGlzKSkuY2F0Y2goZnVuY3Rpb24oZXJyb3IpIHtcclxuXHJcblx0XHR9KTtcclxuXHJcblx0XHRyZXR1cm4gcmVxdWVzdDtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIENhbGN1bGF0ZXMgdGhlIGFtb3VudCBvZiBwYWdlcyBmb3IgdGhlIGNsaWVudC5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSBhcnJheSB8IHByb2R1Y3RzXHJcblx0ICogQHJldHVybiBhcnJheVxyXG5cdCAqL1xyXG5cdGNhbGN1bGF0ZUNsaWVudFBhZ2VzKHByb2R1Y3RzKVxyXG5cdHtcdFxyXG5cdFx0Ly8gV2UgYXJlIHVzaW5nIHBhZ2luYXRpb24gc28gd2UgbmVlZCB0byB1cGRhdGUgaXQgdG9vLlxyXG5cdFx0Q29udGFpbmVyJDMuUGFnaW5hdGlvbi5zZXR0aW5ncy50b3RhbF9pdGVtcyA9IHByb2R1Y3RzLmxlbmd0aDtcclxuXHRcdFxyXG5cdFx0bGV0IHBlclBhZ2UgPSBDb250YWluZXIkMy5QYWdpbmF0aW9uLnNldHRpbmdzLnBlcl9wYWdlOyBcclxuXHJcblx0XHQvLyBXZSBuZWVkIHRvIGNhbGN1bGF0ZSB0aGUgcGFnZXMgb24gZnVsbCBodHRwIHJlcXVlc3QgXHJcblx0XHQvLyBvbmx5IG9uY2UuIHNvIHdlIGNoZWNrIHRvIHNlZSBpZiB3ZSBoYXZlIHJlc3VsdHMgaW4gb3VyIGNhY2hlLlxyXG5cdFx0aWYgKGNodW5rZWRQcm9kdWN0cy5sZW5ndGggIT0gMCkge1xyXG5cdFx0XHRyZXR1cm4gY2h1bmtlZFByb2R1Y3RzO1xyXG5cdFx0fVxyXG5cclxuXHRcdGNodW5rZWRQcm9kdWN0cyA9IENvbW1vbi5hcnJheV9jaHVuayhwcm9kdWN0cywgcGVyUGFnZSk7XHJcblx0XHRyZXR1cm4gY2h1bmtlZFByb2R1Y3RzO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogU2V0cyB0aGUgRE9NIGVsZW1lbnQgXHJcblx0ICogZm9yIHBvcHVsYXRpbmcgdGhlIHByb2R1Y3RzLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIHN0cmluZyB8IHNlbGVjdG9yXHJcblx0ICogQHJldHVybiB2b2lkXHJcblx0ICovXHJcblx0c2V0RWxlbWVudChzZWxlY3RvcilcclxuXHR7XHJcblx0XHR0aGlzLmVsZW1lbnQgPSBET00uZmluZChzZWxlY3Rvcik7XHJcblxyXG5cdFx0aWYgKHRoaXMuZWxlbWVudCkge1xyXG5cdFx0XHRET00uYWRkQ2xhc3ModGhpcy5lbGVtZW50LCB0aGlzLnNldHRpbmdzLmNsYXNzKTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFJlcGxhY2UgaXRlbXMgaW4gXHJcblx0ICogdGhlIHByb2R1Y3RzIGNvbnRhaW5lci5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSBhcnJheSB8IGl0ZW1zXHJcblx0ICogQHJldHVybiBhcnJheVxyXG5cdCAqL1xyXG5cdHJlcGxhY2VJdGVtcyhpdGVtcykgXHJcblx0e1xyXG5cdFx0aWYgKCEgQXJyYXkuaXNBcnJheShpdGVtcykgfHwgKGl0ZW1zLmxlbmd0aCA8PSAwICYmIHR5cGVvZiBpdGVtc1swXSA9PSAnc3RyaW5nJykpIHtcclxuXHRcdFx0dGhyb3cgbmV3IEludmFsaWRBcmd1bWVudEV4Y2VwdGlvbiQxO1xyXG5cdFx0fVxyXG5cclxuXHRcdGxldCBwcm9kdWN0cyA9IHRoaXMuYnVpbGRQcm9kdWN0cyhpdGVtcywgdGhpcy5zZXR0aW5ncy5pdGVtX2NsYXNzLCAnZGl2Jyk7XHJcblxyXG5cdFx0dGhpcy5lbGVtZW50LmlubmVySFRNTCA9ICcnO1xyXG5cdFx0cHJvZHVjdHMuZm9yRWFjaChmdW5jdGlvbihwcm9kdWN0KSB7XHJcblx0XHRcdHRoaXMuZWxlbWVudC5hcHBlbmRDaGlsZChwcm9kdWN0KTtcclxuXHRcdH0uYmluZCh0aGlzKSk7XHJcblxyXG5cdFx0cmV0dXJuIGl0ZW1zO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogTWFrZXMgYW4gQWpheCBjYWxsIHRvIHRoZSBcclxuXHQgKiBzZXJ2ZXIgd2l0aG91dCBwYXJhbWV0ZXJzLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIG51bWJlciB8IHBhZ2VOdW1iZXJcclxuXHQgKiBAcmV0dXJuIFByb21pc2VcclxuXHQgKi9cclxuXHRnZXRQcm9kdWN0cyhwYWdlTnVtYmVyID0gbnVsbClcclxuXHR7XHJcblx0XHRsZXQgYWN0aW9uID0gKHBhZ2VOdW1iZXIpID8gdGhpcy5zZXR0aW5ncy51cmwgKyAnP3BhZ2U9JyArIHBhZ2VOdW1iZXIgOiB0aGlzLnNldHRpbmdzLnVybDtcclxuXHJcblx0XHRyZXR1cm4gSHR0cCQyLmdldCh7XHJcblx0XHRcdHVybDogYWN0aW9uLFxyXG5cdFx0fSk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBCdWlsZHMgdGhlIGh0bWwgZm9yIHRoZSBwcm9kdWN0cy5cclxuXHQgKiBcclxuXHQgKiBAcGFyYW0gYXJyYXkgfCBhdHRyaWJ1dGVzQ29sbGVjdGlvblxyXG5cdCAqIEBwYXJhbSBzdHJpbmcgfCBjbGFzc05hbWVcclxuXHQgKiBAcGFyYW0gc3RyaW5nIHwgdGFnVHlwZVxyXG5cdCAqIEByZXR1cm4gYXJyYXlcclxuXHQgKi9cclxuXHRidWlsZFByb2R1Y3RzKGF0dHJpYnV0ZXNDb2xsZWN0aW9uLCBjbGFzc05hbWUsIHRhZ1R5cGUpIFxyXG5cdHtcclxuXHRcdGlmKGF0dHJpYnV0ZXNDb2xsZWN0aW9uLmNvbnN0cnVjdG9yLm5hbWUgIT0gJ0FycmF5JyApIHtcclxuXHRcdFx0dGhyb3cgbmV3IEludmFsaWRBcmd1bWVudEV4Y2VwdGlvbiQxO1xyXG5cdFx0fVxyXG5cclxuXHRcdGxldCBidWlsdFByb2R1Y3RzID0gW107XHJcblxyXG5cdFx0YXR0cmlidXRlc0NvbGxlY3Rpb24uZm9yRWFjaChmdW5jdGlvbihhdHRyaWJ1dGVzKSB7XHJcblx0XHRcdGxldCBidWlsdFByb2R1Y3QgPSB0aGlzLmJ1aWxkUHJvZHVjdChhdHRyaWJ1dGVzLCBjbGFzc05hbWUsIHRhZ1R5cGUpO1xyXG5cdFx0XHRidWlsdFByb2R1Y3RzLnB1c2goYnVpbHRQcm9kdWN0KTtcclxuXHRcdH0uYmluZCh0aGlzKSk7XHJcblxyXG5cdFx0cmV0dXJuIGJ1aWx0UHJvZHVjdHM7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBCdWlsZHMgdGhlIGh0bWwgZm9yIGEgc2luZ2xlIHByb2R1Y3QuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gb2JqZWN0IHwgYXR0cmlidXRlc1xyXG5cdCAqIEBwYXJhbSBzdHJpbmcgfCBjbGFzc05hbWVcclxuXHQgKiBAcGFyYW0gc3RyaW5nIHwgdGFnVHlwZVxyXG5cdCAqIEByZXR1cm4gb2JqZWN0XHJcblx0ICovXHJcblx0YnVpbGRQcm9kdWN0KGF0dHJpYnV0ZXMsIGNsYXNzTmFtZSwgdGFnVHlwZSkgXHJcblx0e1xyXG5cdFx0aWYgKHR5cGVvZiBhdHRyaWJ1dGVzICE9ICdvYmplY3QnIHx8IHR5cGVvZiB0YWdUeXBlICE9ICdzdHJpbmcnKSB7XHJcblx0XHRcdHRocm93IG5ldyBJbnZhbGlkQXJndW1lbnRFeGNlcHRpb24kMTtcclxuXHRcdH1cclxuXHJcblx0XHRjbGFzc05hbWUgPSBjbGFzc05hbWUgfHwgbnVsbDtcclxuXHJcblx0XHRsZXQgcHJvZHVjdCA9IERPTS5jcmVhdGVFbGVtZW50KCdkaXYnLCB7XHJcblx0XHRcdGNsYXNzOiAncHJvZHVjdCdcclxuXHRcdH0pO1xyXG5cclxuXHRcdERPTS5hZGRDbGFzcyhwcm9kdWN0LCBjbGFzc05hbWUpO1xyXG5cclxuXHRcdGxldCBvdmVybGF5ID0gRE9NLmNyZWF0ZUVsZW1lbnQoJ2RpdicsIHtcclxuXHRcdFx0Y2xhc3M6ICdwcm9kdWN0LW92ZXJsYXknLFxyXG5cdFx0fSk7XHJcblxyXG5cdFx0cHJvZHVjdC5hcHBlbmRDaGlsZChvdmVybGF5KTtcclxuXHJcblx0XHRmb3IgKHZhciBhdHRyaWJ1dGUgaW4gYXR0cmlidXRlcykge1xyXG5cdFx0XHRpZiAoISBDb21tb24uaW5fYXJyYXkoYXR0cmlidXRlLCB0aGlzLnNldHRpbmdzLmF0dHJpYnV0ZXMpKSB7XHJcblx0XHRcdFx0Y29udGludWU7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGxldCB0YWcgPSBET00uY3JlYXRlRWxlbWVudCh0YWdUeXBlKTtcclxuXHJcblx0XHRcdGlmIChhdHRyaWJ1dGUgPT0gJ2ltYWdlJykge1xyXG5cdFx0XHRcdGxldCBpbWFnZSA9IERPTS5jcmVhdGVFbGVtZW50KCdpbWcnLCB7XHJcblx0XHRcdFx0XHRzcmM6IGF0dHJpYnV0ZXNbYXR0cmlidXRlXVxyXG5cdFx0XHRcdH0pO1xyXG5cdFx0XHRcdHByb2R1Y3QuYXBwZW5kQ2hpbGQoaW1hZ2UpO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdHRhZy5pbm5lckhUTUwgPSBhdHRyaWJ1dGVzW2F0dHJpYnV0ZV0gfHwgJyc7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdERPTS5hZGRDbGFzcyh0YWcsICdwcm9kdWN0LScgKyBTdHIua2ViYWJDYXNlKGF0dHJpYnV0ZSkpO1xyXG5cdFx0XHRvdmVybGF5LmFwcGVuZENoaWxkKHRhZyk7XHJcblx0XHR9XHJcblxyXG5cdFx0bGV0IHRhZyA9IERPTS5jcmVhdGVFbGVtZW50KCdkaXYnLCB7XHJcblx0XHRcdGNsYXNzOiAnYWN0aW9uLWJ1dHRvbnMnXHJcblx0XHR9KTtcclxuXHJcblx0XHRsZXQgYWRkVG9DYXJ0ID0gRE9NLmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicsIHtcclxuXHRcdFx0Y2xhc3M6ICdhZGQtdG8tY2FydCcsXHJcblx0XHRcdHR5cGU6ICdidXR0b24nLFxyXG5cdFx0XHR0ZXh0OiAnKycsXHJcblx0XHR9KTtcclxuXHJcblx0XHRsZXQgZmF2b3JpdGUgPSBET00uY3JlYXRlRWxlbWVudCgnYnV0dG9uJywge1xyXG5cdFx0XHRjbGFzczogJ2Zhdm9yaXRlJyxcclxuXHRcdFx0dHlwZTogJ2J1dHRvbicsXHJcblx0XHRcdHRleHQ6ICcmaGVhcnRzOydcclxuXHRcdH0pO1xyXG5cclxuXHRcdGlmICh0aGlzLnNldHRpbmdzLmFkZF9idXR0b25fY2xhc3MpIHtcclxuXHRcdFx0RE9NLmFkZENsYXNzKGFkZFRvQ2FydCwgdGhpcy5zZXR0aW5ncy5hZGRfYnV0dG9uX2NsYXNzKTtcclxuXHRcdH1cclxuXHJcblx0XHRpZiAodGhpcy5zZXR0aW5ncy5mYXZvcml0ZV9idXR0b25fY2xhc3MpIHtcclxuXHRcdFx0RE9NLmFkZENsYXNzKGZhdm9yaXRlLCB0aGlzLnNldHRpbmdzLmZhdm9yaXRlX2J1dHRvbl9jbGFzcyk7XHJcblx0XHR9XHJcblxyXG5cdFx0dGFnLmFwcGVuZENoaWxkKGFkZFRvQ2FydCk7XHJcblx0XHR0YWcuYXBwZW5kQ2hpbGQoZmF2b3JpdGUpO1xyXG5cclxuXHRcdGFkZFRvQ2FydC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcclxuXHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdFx0XHRFdmVudE1hbmFnZXIkNC5wdWJsaXNoKCdjYXJ0LnByb2R1Y3QuYWRkZWQnLCBhdHRyaWJ1dGVzKTtcclxuXHRcdH0pO1xyXG5cclxuXHRcdGZhdm9yaXRlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xyXG5cdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XHJcblx0XHRcdHRoaXMuaW5uZXJIVE1MID0gJyYjeDI3MTM7JztcclxuXHRcdFx0RXZlbnRNYW5hZ2VyJDQucHVibGlzaCgnY2FydC5wcm9kdWN0LmZhdm9yaXRlZCcsIGF0dHJpYnV0ZXMpO1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0b3ZlcmxheS5hcHBlbmRDaGlsZCh0YWcpO1xyXG5cclxuXHRcdHJldHVybiBwcm9kdWN0O1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQWRkIHRoZSBlQ29tbWVyY2Ugc3R5bGUgdGFncyB0byB0aGUgRE9NLlxyXG5cdCAqL1xyXG5cdGFkZFN0eWxlVGFnKCkgXHJcblx0e1xyXG5cdFx0aWYgKERPTS5maW5kKCcjVHVyYm8tZUNvbW1lcmNlLVByb2R1Y3RzJykpIHtcclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0fVxyXG5cclxuXHRcdGlmICh0aGlzLnNldHRpbmdzLm5vX2Nzcykge1xyXG5cdFx0XHRyZXR1cm47XHJcblx0XHR9XHJcblxyXG5cdFx0bGV0IHdpZHRoID0gdGhpcy5zZXR0aW5ncy53aWR0aCB8fCAnYXV0byc7XHJcblx0XHRsZXQgaGVpZ2h0ID0gdGhpcy5zZXR0aW5ncy5oZWlnaHQgfHwgJzIwMHB4JztcclxuXHRcdGxldCBtaW5XaWR0aCA9IHRoaXMuc2V0dGluZ3MubWluX3dpZHRoIHx8ICcyMDBweCc7XHJcblx0XHRsZXQgbWF4V2lkdGggPSB0aGlzLnNldHRpbmdzLm1heF93aWR0aCB8fCAnMjUwcHgnO1xyXG5cclxuXHRcdGxldCBjc3MgPSBgXHJcblx0XHRcdC5wcm9kdWN0IHtcclxuXHRcdFx0XHRwb3NpdGlvbjogcmVsYXRpdmU7XHJcblx0XHRcdFx0bWFyZ2luOiA1cHggNXB4O1xyXG5cdFx0XHRcdGJvcmRlcjogMXB4IHNvbGlkICNlNGU0ZTQ7XHJcblx0XHRcdFx0d2lkdGg6ICR7d2lkdGh9O1xyXG5cdFx0XHRcdG1pbi13aWR0aDogJHttaW5XaWR0aH07XHJcblx0XHRcdFx0bWF4LXdpZHRoOiAke21heFdpZHRofTtcclxuXHRcdFx0XHRoZWlnaHQ6ICR7aGVpZ2h0fTtcclxuXHRcdFx0XHRjdXJzb3I6IHBvaW50ZXI7XHJcblx0XHRcdFx0Y29sb3I6ICNmZmZmZmY7XHJcblx0XHRcdFx0b3ZlcmZsb3c6IGhpZGRlbjtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0LnByb2R1Y3QgPiAucHJvZHVjdC1vdmVybGF5IHtcclxuXHRcdFx0XHRwb3NpdGlvbjogYWJzb2x1dGU7XHJcblx0XHRcdFx0dG9wOiAwO1xyXG5cdFx0XHRcdGxlZnQ6IDA7XHJcblx0XHRcdFx0d2lkdGg6IDEwMCU7XHJcblx0XHRcdFx0aGVpZ2h0OiAxMDAlO1xyXG5cdFx0XHRcdG9wYWNpdHk6IDAuNTtcclxuXHRcdFx0XHR6LWluZGV4OiA1O1xyXG5cdFx0XHRcdHRyYW5zaXRpb246IDFzIGFsbDtcclxuXHRcdFx0XHR0cmFuc2Zvcm06IHRyYW5zbGF0ZVgoLTI1MHB4KTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0LnByb2R1Y3Q6aG92ZXIgPiAucHJvZHVjdC1vdmVybGF5IHtcclxuXHRcdFx0XHRiYWNrZ3JvdW5kOiByZ2JhKDAsIDAsIDAsIDAuNDUpO1xyXG5cdFx0XHRcdHRyYW5zZm9ybTogdHJhbnNsYXRlWCgwcHgpO1xyXG5cdFx0XHRcdG9wYWNpdHk6IDE7XHJcblx0XHRcdFx0dHJhbnNpdGlvbjogMC41cyBhbGw7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdC5wcm9kdWN0ID4gaW1nIHtcclxuXHRcdFx0XHRwb3NpdGlvbjogYWJzb2x1dGU7XHJcblx0XHRcdFx0bGVmdDogMDtcclxuXHRcdFx0XHR0b3A6IDA7XHJcblx0XHRcdFx0d2lkdGg6IDEwMCU7XHJcblx0XHRcdFx0aGVpZ2h0OiAxMDAlO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHQucHJvZHVjdCA+IC5wcm9kdWN0LWltYWdlIHtcclxuXHRcdFx0XHR6LWluZGV4OiAwO1xyXG5cdFx0XHRcdHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuXHRcdFx0XHR0b3A6IDA7XHJcblx0XHRcdFx0bGVmdDogMDtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0LnByb2R1Y3QgPiAucHJvZHVjdC1vdmVybGF5ID4gLnByb2R1Y3QtbmFtZSwgXHJcblx0XHRcdC5wcm9kdWN0ID4gLnByb2R1Y3Qtb3ZlcmxheSA+IC5wcm9kdWN0LXByaWNlLFxyXG5cdFx0XHQucHJvZHVjdCA+IC5wcm9kdWN0LW92ZXJsYXkgPiAucHJvZHVjdC1kZWxpdmVyeS10aW1lIHtcclxuXHRcdFx0XHR6LWluZGV4OiAxO1xyXG5cdFx0XHRcdHBvc2l0aW9uOiByZWxhdGl2ZTtcclxuXHRcdFx0XHR0ZXh0LWFsaWduOiBjZW50ZXI7XHJcblx0XHRcdFx0bWFyZ2luLXRvcDogMjVweDtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0LnByb2R1Y3QgPiAucHJvZHVjdC1vdmVybGF5ID4gLmFjdGlvbi1idXR0b25zIHtcclxuXHRcdFx0XHR3aWR0aDogMTAwJTtcclxuXHRcdFx0XHRtYXJnaW4tdG9wOiAxMHB4O1xyXG5cdFx0XHRcdHRleHQtYWxpZ246IGNlbnRlcjtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0LnByb2R1Y3QgPiAucHJvZHVjdC1vdmVybGF5ID4gLmFjdGlvbi1idXR0b25zID4gLmZhdm9yaXRlIHtcclxuXHRcdFx0XHRtYXJnaW4tbGVmdDogMTBweDtcclxuXHRcdFx0fVxyXG5cclxuXHRcdGA7XHJcblx0ICAgIFxyXG5cdCAgICBET00uYWRkU3R5bGUoJ1R1cmJvLWVDb21tZXJjZS1Qcm9kdWN0cycsIGNzcyk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBIaWRlcyB0aGUgY29tcG9uZW50IGZyb20gdGhlIERPTS5cclxuXHQgKlxyXG5cdCAqIEByZXR1cm4gdm9pZCBcclxuXHQgKi9cclxuXHRoaWRlKClcclxuXHR7XHJcblx0XHR0aGlzLmVsZW1lbnQuc3R5bGUuZGlzcGxheSA9ICdub25lJztcclxuXHR9XHJcbn1cblxuLyoqXHJcbiAqIFRoZSBTZXJ2aWNlcyBPYmplY3QsIGhhbmRsZXMgdGhlIHNlcnZpY2VzLlxyXG4gKi9cclxuY2xhc3MgU2VydmljZXMgXHJcbntcclxuXHJcbn1cblxubGV0IGRlZmF1bHRNZXNzYWdlJDQgPSAnU29ycnksIG5vIG1vcmUgcGFnZXMuJztcclxuXHJcbmNsYXNzIE5vdEluUGFnZVJhbmdlRXhjZXB0aW9uIGV4dGVuZHMgRXhjZXB0aW9uSGFuZGxlclxyXG57XHJcblx0Y29uc3RydWN0b3IobWVzc2FnZSA9IG51bGwpIFxyXG5cdHtcclxuXHRcdG1lc3NhZ2UgPSBtZXNzYWdlIHx8IGRlZmF1bHRNZXNzYWdlJDQ7XHJcblx0XHRzdXBlcigpO1xyXG4gICAgXHRzdXBlci5zdGFja1RyYWNlKHRoaXMsIG1lc3NhZ2UpO1xyXG4gICAgfVxyXG59XG5cbi8qKlxyXG4gKiBAZmlsZSBcclxuICogUGFnaW5hdGlvbiBjbGFzcy5cclxuICpcclxuICogVGhlIFBhZ2luYXRpb24gY29tcG9uZW50LCBoYW5kbGVzIHRoZSBwYWdpbmF0aW9uLlxyXG4gKi9cclxuXHJcbi8qKlxyXG4gKiBUaGUgZGVmYXVsdCBzZXR0aW5ncyBvZiB0aGUgcGFnaW5hdGlvbi5cclxuICpcclxuICogQHZhciBvYmplY3RcclxuICovXHJcbmxldCBkZWZhdWx0U2V0dGluZ3MkNSA9IHtcclxuXHRlbGVtZW50OiAnLnBhZ2luYXRpb24nLFxyXG5cdHByb2NjZXNzaW5nOiAnY2xpZW50LXNpZGUnLFxyXG5cdGNsYXNzOiAnJyxcclxuXHRwZXJfcGFnZTogNSxcclxuXHR0b3RhbF9pdGVtczogNSxcclxufTtcclxuXHJcbi8qKlxyXG4gKiBTdG9yZXMgdGhlIGNvbnRhaW5lciBvYmplY3QuXHJcbiAqXHJcbiAqIEB2YXIgXFxDb3JlXFxDb250YWluZXJcclxuICovXHJcbmxldCBDb250YWluZXIkNDtcclxuXHJcbi8qKlxyXG4gKiBTdG9yZXMgdGhlIHByb2R1Y3RzIGNvbXBvbmVudC5cclxuICpcclxuICogQHZhciBcXENvbXBvbmVudHNcXFByb2R1Y3RzXHJcbiAqL1xyXG5sZXQgUHJvZHVjdHMkMjtcclxuXHJcbi8qKlxyXG4gKiBTdG9yZXMgdGhlIGNvbnRhaW5lciBvYmplY3QuXHJcbiAqIFxyXG4gKiBAdmFyIFxcQ29yZVxcRXZlbnRNYW5hZ2VyXHJcbiAqL1xyXG5sZXQgRXZlbnRNYW5hZ2VyJDU7XHJcblxyXG5jbGFzcyBQYWdpbmF0aW9uIFxyXG57XHJcblx0LyoqXHJcblx0ICogLSBJbml0aWFsaXplIHRoZSBjb250YWluZXIgb2JqZWN0LlxyXG5cdCAqIC0gSW5pdGlhbGl6ZSB0aGUgcHJvZHVjdHMgY29tcG9uZW50LlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIFxcQ29yZVxcQ29udGFpbmVyIHwgY29udGFpbmVyXHJcblx0ICogQHBhcmFtIFxcQ29tcG9uZW50c1xcUHJvZHVjdHMgfCBwcm9kdWN0c1xyXG5cdCAqIEByZXR1cm4gdm9pZFxyXG5cdCAqL1xyXG5cdGNvbnN0cnVjdG9yKGNvbnRhaW5lciwgcHJvZHVjdHMsIGV2ZW50cykgXHJcblx0e1xyXG5cdFx0dGhpcy5zZXRDdXJyZW50KDEpO1xyXG5cdFx0Q29udGFpbmVyJDQgPSBjb250YWluZXI7XHJcblx0XHRQcm9kdWN0cyQyID0gcHJvZHVjdHM7XHJcblx0XHRFdmVudE1hbmFnZXIkNSA9IGV2ZW50cztcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFNldHVwIHRoZSBwYWdpbmF0aW9uLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIG9iamVjdCB8IHNldHRpbmdzXHJcblx0ICogQHJldHVybiB2b2lkXHJcblx0ICovXHJcblx0c2V0dXAoc2V0dGluZ3MpXHJcblx0e1x0XHJcblx0XHRpZih0eXBlb2Ygc2V0dGluZ3MgIT0gJ29iamVjdCcpIHtcclxuXHRcdFx0dGhyb3cgbmV3IEludmFsaWRBcmd1bWVudEV4Y2VwdGlvbiQxO1xyXG5cdFx0fVxyXG5cclxuXHRcdHRoaXMuc2V0dGluZ3MgPSBDb21tb24uZXh0ZW5kKGRlZmF1bHRTZXR0aW5ncyQ1LCBzZXR0aW5ncyk7XHJcblxyXG5cdFx0dGhpcy5zZXRFbGVtZW50KHRoaXMuc2V0dGluZ3MuZWxlbWVudCk7XHJcblxyXG5cdFx0Ly8gTGlzdGVuIHRvIHdoZW4gcHJvZHVjdHMgYXJlIGJlaW5nIGxvYWRlZCBhbmQgdXBkYXRlIHRoZSBwYWdpbmF0aW9uXHJcblx0XHQvLyB3aXRoIHRoZSBhY3R1YWwgaXRlbXMgY291bnQuXHJcblx0XHRFdmVudE1hbmFnZXIkNS5zdWJzY3JpYmUoJ3Byb2R1Y3RzLmxvYWRlZCcsIGZ1bmN0aW9uKHByb2R1Y3RzKSB7XHJcblx0XHRcdHRoaXMudG90YWxQYWdlcyA9IHRoaXMuY2FsY3VsYXRlVG90YWxQYWdlcyh0aGlzLnNldHRpbmdzLnBlcl9wYWdlLCBwcm9kdWN0cy5sZW5ndGgpO1xyXG5cdFx0XHR0aGlzLmJ1aWxkUGFnaW5hdGlvbigpO1xyXG5cdFx0fS5iaW5kKHRoaXMpKTtcclxuXHJcblx0XHQvLyBBcyBhIGZhbGxiYWNrIGNob29zZSB0aGUgdXNlcidzIHNldHRpbmdzIGZvciB0aGUgdG90YWwgaXRlbXMgY291bnQuXHJcblx0XHR0aGlzLnRvdGFsUGFnZXMgPSB0aGlzLmNhbGN1bGF0ZVRvdGFsUGFnZXModGhpcy5zZXR0aW5ncy5wZXJfcGFnZSwgdGhpcy5zZXR0aW5ncy50b3RhbF9pdGVtcyk7XHJcblx0XHR0aGlzLmJ1aWxkUGFnaW5hdGlvbigpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQnVpbGRzIHRoZSBwYWdpbmF0aW9uLlxyXG5cdCAqXHJcblx0ICogQHJldHVybiB2b2lkXHJcblx0ICovXHJcblx0YnVpbGRQYWdpbmF0aW9uKClcclxuXHR7XHJcblx0XHR0aGlzLmxpbmtzID0gdGhpcy5jcmVhdGVMaW5rcygpO1xyXG5cdFx0dGhpcy5yZXBsYWNlTGlua3ModGhpcy5saW5rcyk7XHJcblx0XHR0aGlzLmJpbmRFdmVudExpc3RlbmVycyh0aGlzLmxpbmtzKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFNldHMgdGhlIGVsZW1lbnQuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gc3RyaW5nIHwgc2VsZWN0b3JcclxuXHQgKiBAcmV0dXJuIHZvaWRcclxuXHQgKi9cclxuXHRzZXRFbGVtZW50KHNlbGVjdG9yKVxyXG5cdHtcclxuXHRcdHRoaXMuZWxlbWVudCA9IERPTS5maW5kKHNlbGVjdG9yKTtcclxuXHRcdFxyXG5cdFx0RE9NLmFkZENsYXNzKHRoaXMuZWxlbWVudCwgdGhpcy5zZXR0aW5ncy5jbGFzcyk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBSZXBsYWNlcyB0aGUgbGlua3MgaW4gdGhlIGVsZW1lbnQuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gSFRNTFVMaXN0RWxlbWVudCB8IGxpbmtzXHJcblx0ICogQHJldHVybiB2b2lkXHJcblx0ICovXHJcblx0cmVwbGFjZUxpbmtzKGxpbmtzKVxyXG5cdHtcclxuXHRcdHRoaXMuZWxlbWVudC5pbm5lckhUTUwgPSAnJztcclxuXHRcdHRoaXMuZWxlbWVudC5hcHBlbmRDaGlsZChsaW5rcyk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBDYWxjdWxhdGVzIHRoZSB0b3RhbCBwYWdlcy5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSBudW1iZXIgfCBwZXJQYWdlXHJcblx0ICogQHBhcmFtIG51bWJlciB8IHRvdGFsSXRlbXNcclxuXHQgKiBAcmV0dXJuIG51bWJlclxyXG5cdCAqL1xyXG5cdGNhbGN1bGF0ZVRvdGFsUGFnZXMocGVyUGFnZSwgdG90YWxJdGVtcylcclxuXHR7XHJcblx0XHRwZXJQYWdlID0gcGFyc2VJbnQocGVyUGFnZSk7XHJcblx0XHR0b3RhbEl0ZW1zID0gcGFyc2VJbnQodG90YWxJdGVtcyk7XHJcblxyXG5cdFx0cmV0dXJuIE1hdGguY2VpbCh0b3RhbEl0ZW1zIC8gcGVyUGFnZSk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBCaW5kcyB0aGUgYnV0dG9ucyBldmVudHMgbGlzdGVuZXJzLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIEhUTUxVTGlzdEVsZW1lbnQgfCBsaW5rc1xyXG5cdCAqIEByZXR1cm4gdm9pZFxyXG5cdCAqL1xyXG5cdGJpbmRFdmVudExpc3RlbmVycyhsaW5rcykgXHJcblx0e1xyXG5cdFx0bGV0IGluc3RhbmNlID0gdGhpcztcclxuXHJcblx0XHR0aGlzLm5leHQuY2hpbGROb2Rlc1swXS5vbmNsaWNrID0gZnVuY3Rpb24oZSkge1xyXG5cdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG5cdFx0XHRsZXQgcmVxdWVzdGVkUGFnZSA9IGluc3RhbmNlLmN1cnJlbnQrMTtcclxuXHJcblx0XHRcdGlmIChpbnN0YW5jZS5ub3RJblBhZ2VSYW5nZShyZXF1ZXN0ZWRQYWdlKSkge1xyXG5cdFx0XHRcdHRocm93IG5ldyBOb3RJblBhZ2VSYW5nZUV4Y2VwdGlvbignVGhlIHBhZ2UgeW91IHJlcXVlc3RpbmcgZG9lcyBub3QgZXhpc3RzJyk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdFByb2R1Y3RzJDIubG9hZFByb2R1Y3RzKHJlcXVlc3RlZFBhZ2UpLnRoZW4oZnVuY3Rpb24ocHJvZHVjdHMpIHtcclxuXHRcdFx0XHRpbnN0YW5jZS5zZXRDdXJyZW50KHJlcXVlc3RlZFBhZ2UpO1xyXG5cdFx0XHR9KTtcclxuXHRcdH07XHJcblxyXG5cdFx0dGhpcy5wcmV2aW91cy5jaGlsZE5vZGVzWzBdLm9uY2xpY2sgPSBmdW5jdGlvbihlKSB7XHJcblx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcclxuXHJcblx0XHRcdGxldCByZXF1ZXN0ZWRQYWdlID0gaW5zdGFuY2UuY3VycmVudC0xO1xyXG5cclxuXHRcdFx0aWYoaW5zdGFuY2Uubm90SW5QYWdlUmFuZ2UocmVxdWVzdGVkUGFnZSkpIHtcclxuXHRcdFx0XHR0aHJvdyBuZXcgTm90SW5QYWdlUmFuZ2VFeGNlcHRpb24oJ1RoZSBwYWdlIHlvdSByZXF1ZXN0aW5nIGRvZXMgbm90IGV4aXN0cycpO1xyXG5cdFx0XHR9XHJcblx0XHRcdFxyXG5cdFx0XHRQcm9kdWN0cyQyLmxvYWRQcm9kdWN0cyhyZXF1ZXN0ZWRQYWdlKS50aGVuKGZ1bmN0aW9uKHByb2R1Y3RzKSB7XHJcblx0XHRcdFx0aW5zdGFuY2Uuc2V0Q3VycmVudChyZXF1ZXN0ZWRQYWdlKTtcclxuXHRcdFx0fSk7XHJcblx0XHR9O1xyXG5cclxuXHRcdGZvcih2YXIgaSA9IDA7IGkgPCB0aGlzLnBhZ2VzLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdHRoaXMucGFnZXNbaV0uY2hpbGROb2Rlc1swXS5vbmNsaWNrID0gZnVuY3Rpb24oZSkge1xyXG5cdFx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcclxuXHRcdFx0XHRcclxuXHRcdFx0XHRsZXQgcmVxdWVzdGVkUGFnZSA9IHRoaXMuZ2V0QXR0cmlidXRlKCdkYXRhLXBhZ2UtbnInKTtcclxuXHRcdFx0XHRcclxuXHRcdFx0XHRQcm9kdWN0cyQyLmxvYWRQcm9kdWN0cyhyZXF1ZXN0ZWRQYWdlKS50aGVuKGZ1bmN0aW9uKHByb2R1Y3RzKSB7XHJcblx0XHRcdFx0XHRpbnN0YW5jZS5zZXRDdXJyZW50KHJlcXVlc3RlZFBhZ2UpO1xyXG5cdFx0XHRcdH0pO1xyXG5cdFx0XHR9O1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogU2V0cyB0aGUgY3VycmVudCBwYWdlLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIG51bWJlciB8IHBhZ2VOdW1iZXJcclxuXHQgKiBAcmV0dXJuIHZvaWRcclxuXHQgKi9cclxuXHRzZXRDdXJyZW50KHBhZ2VOdW1iZXIpIFxyXG5cdHtcclxuXHRcdHRoaXMuY3VycmVudCA9IHBhcnNlSW50KHBhZ2VOdW1iZXIpO1xyXG5cdFx0dGhpcy5jaGFuZ2VVcmwocGFnZU51bWJlcik7XHJcblx0XHR0aGlzLnNldEFjdGl2ZUxpbmsocGFnZU51bWJlcik7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBHZXRzIHRoZSBjdXJyZW50IHBhZ2UuXHJcblx0ICpcclxuXHQgKiBAcmV0dXJuIG51bWJlclxyXG5cdCAqL1xyXG5cdGdldEN1cnJlbnQoKSBcclxuXHR7XHJcblx0XHRyZXR1cm4gdGhpcy5jdXJyZW50O1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQ3JlYXRlcyB0aGUgcGFnaW5hdGlvbiBsaW5rcy5cclxuXHQgKlxyXG5cdCAqIEByZXR1cm4gSFRNTFVMaXN0RWxlbWVudFxyXG5cdCAqL1xyXG5cdGNyZWF0ZUxpbmtzKCkgXHJcblx0e1xyXG5cdFx0bGV0IHVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndWwnKTtcclxuXHRcdFxyXG5cdFx0dGhpcy5wYWdlcyA9IHRoaXMuY3JlYXRlUGFnZUxpbmtzKCk7XHJcblx0XHR0aGlzLnByZXZpb3VzID0gdGhpcy5jcmVhdGVQcmV2aW91c0J1dHRvbigpO1xyXG5cdFx0dGhpcy5uZXh0ID0gdGhpcy5jcmVhdGVOZXh0QnV0dG9uKCk7XHJcblxyXG5cdFx0dWwuY2xhc3NOYW1lID0gJ3BhZ2luYXRpb24nO1xyXG5cdFx0dWwuYXBwZW5kQ2hpbGQodGhpcy5wcmV2aW91cyk7XHJcblxyXG5cdFx0dGhpcy5wYWdlcy5mb3JFYWNoKGZ1bmN0aW9uKHBhZ2UpIHtcclxuXHRcdFx0dWwuYXBwZW5kQ2hpbGQocGFnZSk7XHJcblx0XHR9KTtcclxuXHJcblx0XHR1bC5hcHBlbmRDaGlsZCh0aGlzLm5leHQpO1xyXG5cclxuXHRcdHJldHVybiB1bDtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIENyZWF0ZXMgdGhlIHBhZ2VzIGl0ZW0gbGlua3MuXHJcblx0ICpcclxuXHQgKiBAcmV0dXJuIGFycmF5PEhUTUxMSUVsZW1lbnQ+XHJcblx0ICovXHJcblx0Y3JlYXRlUGFnZUxpbmtzKCkgXHJcblx0e1xyXG5cdFx0dmFyIHBhZ2VzID0gW107XHJcblxyXG5cdFx0Zm9yKHZhciBpID0gMTsgaSA8PSB0aGlzLnRvdGFsUGFnZXM7IGkrKykge1xyXG5cdFx0XHR2YXIgcGFnZUl0ZW0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaScpO1xyXG5cdFx0XHR2YXIgbGluayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKTtcclxuXHRcdFx0cGFnZUl0ZW0uY2xhc3NOYW1lID0gKHRoaXMuY3VycmVudCA9PSBpKSA/ICdwYWdlLWl0ZW0gYWN0aXZlJyA6ICdwYWdlLWl0ZW0nO1xyXG5cdFx0XHRsaW5rLmNsYXNzTmFtZSA9ICdwYWdlLWxpbmsnO1xyXG5cdFx0XHRsaW5rLnNldEF0dHJpYnV0ZSgnaHJlZicsICc/cGFnZT0nKyBpKTtcclxuXHRcdFx0bGluay5zZXRBdHRyaWJ1dGUoJ2RhdGEtcGFnZS1ucicsIGkpO1xyXG5cdFx0XHRsaW5rLmlubmVySFRNTCA9IGk7XHJcblx0XHRcdHBhZ2VJdGVtLmFwcGVuZENoaWxkKGxpbmspO1xyXG5cdFx0XHRwYWdlcy5wdXNoKHBhZ2VJdGVtKTtcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gcGFnZXM7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBDcmVhdGVzIHRoZSBwcmV2aW91cyBidXR0b24gbGluay5cclxuXHQgKlxyXG5cdCAqIEByZXR1cm4gSFRNTExJRWxlbWVudFxyXG5cdCAqL1xyXG5cdGNyZWF0ZVByZXZpb3VzQnV0dG9uKCkgXHJcblx0e1xyXG5cdFx0dmFyIGxpID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKTtcclxuXHRcdHZhciBsaW5rID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpO1xyXG5cdFx0dmFyIHNwYW4xID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xyXG5cdFx0dmFyIHNwYW4yID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xyXG5cdFx0XHJcblx0XHRcclxuXHRcdGxpLmNsYXNzTmFtZSA9ICdwYWdlLWl0ZW0nO1xyXG5cdFx0bGluay5jbGFzc05hbWUgPSAncGFnZS1saW5rJztcclxuXHRcdHNwYW4yLmNsYXNzTmFtZSA9ICdzci1vbmx5JztcclxuXHJcblx0XHRsaW5rLnNldEF0dHJpYnV0ZSgnaHJlZicsICcnKTtcclxuXHRcdGxpbmsuc2V0QXR0cmlidXRlKCdhcmlhLWxhYmVsJywgJ1ByZXZpb3VzJyk7XHJcblx0XHRzcGFuMS5zZXRBdHRyaWJ1dGUoJ2FyaWEtaGlkZGVuJywgJ3RydWUnKTtcclxuXHJcblx0XHRzcGFuMS5pbm5lckhUTUwgPSAnJmxhcXVvOyc7XHJcblx0XHRzcGFuMi5pbm5lckhUTUwgPSAnUHJldmlvdXMnO1xyXG5cclxuXHRcdGxpbmsuYXBwZW5kQ2hpbGQoc3BhbjEpO1xyXG5cdFx0bGluay5hcHBlbmRDaGlsZChzcGFuMik7XHJcblx0XHRsaS5hcHBlbmRDaGlsZChsaW5rKTtcclxuXHJcblx0XHRyZXR1cm4gbGk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBDcmVhdGVzIHRoZSBuZXh0IGJ1dHRvbiBsaW5rLlxyXG5cdCAqXHJcblx0ICogQHJldHVybiBIVE1MTElFbGVtZW50XHJcblx0ICovXHJcblx0Y3JlYXRlTmV4dEJ1dHRvbigpIFxyXG5cdHtcclxuXHRcdHZhciBsaSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJyk7XHJcblx0XHR2YXIgbGluayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKTtcclxuXHRcdHZhciBzcGFuMSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcclxuXHRcdHZhciBzcGFuMiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcclxuXHRcdFxyXG5cdFx0bGkuY2xhc3NOYW1lID0gJ3BhZ2UtaXRlbSc7XHJcblx0XHRsaW5rLmNsYXNzTmFtZSA9ICdwYWdlLWxpbmsnO1xyXG5cdFx0c3BhbjIuY2xhc3NOYW1lID0gJ3NyLW9ubHknO1xyXG5cclxuXHRcdGxpbmsuc2V0QXR0cmlidXRlKCdocmVmJywgJycpO1xyXG5cdFx0bGluay5zZXRBdHRyaWJ1dGUoJ2FyaWEtbGFiZWwnLCAnTmV4dCcpO1xyXG5cdFx0c3BhbjEuc2V0QXR0cmlidXRlKCdhcmlhLWhpZGRlbicsICd0cnVlJyk7XHJcblxyXG5cdFx0c3BhbjEuaW5uZXJIVE1MID0gJyZyYXF1bzsnO1xyXG5cdFx0c3BhbjIuaW5uZXJIVE1MID0gJ05leHQnO1xyXG5cclxuXHRcdGxpbmsuYXBwZW5kQ2hpbGQoc3BhbjEpO1xyXG5cdFx0bGluay5hcHBlbmRDaGlsZChzcGFuMik7XHJcblx0XHRsaS5hcHBlbmRDaGlsZChsaW5rKTtcclxuXHJcblx0XHRyZXR1cm4gbGk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBDaGVja3MgaWYgdGhlIGdpdmVuIHBhZ2UgaXMgaW4gcmFuZ2UuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gbnVtYmVyIHwgcGFnZU51bWJlclxyXG5cdCAqIEByZXR1cm4gYm9vbFxyXG5cdCAqL1xyXG5cdG5vdEluUGFnZVJhbmdlKHBhZ2VOdW1iZXIpIFxyXG5cdHtcclxuXHRcdHJldHVybiAocGFnZU51bWJlciA+IHRoaXMudG90YWxQYWdlcyB8fCBwYWdlTnVtYmVyIDw9IDApIHx8IGlzTmFOKHBhZ2VOdW1iZXIpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQ2hhbmdlcyB0aGUgdXJsIHRvIGEgZ2l2ZW4gcGFnZSBudW1iZXIuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gbnVtYmVyIHwgcGFnZU51bWJlclxyXG5cdCAqIEByZXR1cm4gdm9pZFxyXG5cdCAqL1xyXG5cdGNoYW5nZVVybChwYWdlTnVtYmVyKSBcclxuXHR7XHJcblx0XHRwYWdlTnVtYmVyID0gIHBhZ2VOdW1iZXIgfHwgcXVlcnlTdHJpbmcoKVsncGFnZSddO1xyXG5cdFx0d2luZG93Lmhpc3RvcnkucmVwbGFjZVN0YXRlKCcnLCAnJywgdGhpcy51cGRhdGVVUkxQYXJhbWV0ZXIod2luZG93LmxvY2F0aW9uLmhyZWYsICdwYWdlJywgcGFnZU51bWJlcikpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogU2V0cyB0aGUgYWN0aXZlIGxpbmsuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gbnVtYmVyIHwgcGFnZU51bWJlclxyXG5cdCAqIEByZXR1cm4gdm9pZFxyXG5cdCAqL1xyXG5cdHNldEFjdGl2ZUxpbmsocGFnZU51bWJlcilcclxuXHR7XHJcblx0XHRmb3IodmFyIHBhZ2UgaW4gdGhpcy5wYWdlcykge1xyXG5cdFx0XHRpZiAodGhpcy5wYWdlc1twYWdlXS5jaGlsZE5vZGVzWzBdLmdldEF0dHJpYnV0ZSgnZGF0YS1wYWdlLW5yJykgPT0gcGFnZU51bWJlcikge1xyXG5cdFx0XHRcdERPTS5hZGRDbGFzcyh0aGlzLnBhZ2VzW3BhZ2VdLCAnYWN0aXZlJyk7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0RE9NLnJlbW92ZUNsYXNzKHRoaXMucGFnZXNbcGFnZV0sICdhY3RpdmUnKTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogR2V0IHRoZSBnZXQgdmFyaWFibGVzIGZyb20gdGhlIHVybC5cclxuXHQgKlxyXG5cdCAqIEByZXR1cm4gYXJyYXlcclxuXHQgKi9cclxuXHRxdWVyeVN0cmluZygpIFxyXG5cdHtcclxuXHRcdHZhciB2YXJzID0ge307XHJcblx0XHR2YXIgcGFydHMgPSB3aW5kb3cubG9jYXRpb24uaHJlZi5yZXBsYWNlKC9bPyZdKyhbXj0mXSspPShbXiZdKikvZ2ksIGZ1bmN0aW9uKG0sIGtleSwgdmFsdWUpIHtcclxuXHRcdFx0dmFyc1trZXldID0gdmFsdWU7XHJcblx0XHR9KTtcclxuXHJcblx0XHRyZXR1cm4gdmFycztcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIE1vZGlmaWVzIHRoZSBnZXQgcGFyYW1ldGVyIGluIHRoZSB1cmwuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gc3RyaW5nIHwgdXJsXHJcblx0ICogQHBhcmFtIHN0cmluZyB8IHBhcmFtXHJcblx0ICogQHBhcmFtIG51bWJlciB8IHBhcmFtVmFsXHJcblx0ICogQHJldHVybiBzdHJpbmdcclxuXHQgKi9cclxuXHR1cGRhdGVVUkxQYXJhbWV0ZXIodXJsLCBwYXJhbSwgcGFyYW1WYWwpIFxyXG5cdHtcclxuXHQgICAgdmFyIG5ld0FkZGl0aW9uYWxVUkwgPSBcIlwiO1xyXG5cdCAgICB2YXIgdGVtcEFycmF5ID0gdXJsLnNwbGl0KFwiP1wiKTtcclxuXHQgICAgdmFyIGJhc2VVUkwgPSB0ZW1wQXJyYXlbMF07XHJcblx0ICAgIHZhciBhZGRpdGlvbmFsVVJMID0gdGVtcEFycmF5WzFdO1xyXG5cdCAgICB2YXIgdGVtcCA9IFwiXCI7XHJcblxyXG5cdCAgICBpZiAoYWRkaXRpb25hbFVSTCkge1xyXG5cdCAgICAgICAgdGVtcEFycmF5ID0gYWRkaXRpb25hbFVSTC5zcGxpdChcIiZcIik7XHJcblx0ICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRlbXBBcnJheS5sZW5ndGg7IGkrKyl7XHJcblx0ICAgICAgICAgICAgaWYgKHRlbXBBcnJheVtpXS5zcGxpdCgnPScpWzBdICE9IHBhcmFtKXtcclxuXHQgICAgICAgICAgICAgICAgbmV3QWRkaXRpb25hbFVSTCArPSB0ZW1wICsgdGVtcEFycmF5W2ldO1xyXG5cdCAgICAgICAgICAgICAgICB0ZW1wID0gXCImXCI7XHJcblx0ICAgICAgICAgICAgfVxyXG5cdCAgICAgICAgfVxyXG5cdCAgICB9XHJcblxyXG5cdCAgICB2YXIgcm93c1RleHQgPSB0ZW1wICsgXCJcIiArIHBhcmFtICsgXCI9XCIgKyBwYXJhbVZhbDtcclxuXHQgICAgcmV0dXJuIGJhc2VVUkwgKyBcIj9cIiArIG5ld0FkZGl0aW9uYWxVUkwgKyByb3dzVGV4dDtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFJlc2V0cyB0aGUgcGFnaW5hdGlvbi5cclxuXHQgKlxyXG5cdCAqIEByZXR1cm4gdm9pZFxyXG5cdCAqL1xyXG5cdHJlc2V0KCkgXHJcblx0e1xyXG5cdFx0dGhpcy5zZXRDdXJyZW50KDEpO1xyXG5cdFx0dGhpcy5jaGFuZ2VVcmwoMSk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBIaWRlcyB0aGUgY29tcG9uZW50IGZyb20gdGhlIERPTS5cclxuXHQgKlxyXG5cdCAqIEByZXR1cm4gdm9pZCBcclxuXHQgKi9cclxuXHRoaWRlKClcclxuXHR7XHJcblx0XHR0aGlzLmVsZW1lbnQuc3R5bGUuZGlzcGxheSA9ICdub25lJztcclxuXHR9XHJcbn1cblxubGV0IGRlZmF1bHRNZXNzYWdlJDUgPSAnSW4gb3JkZXIgdG8gdXNlIGNvbXBvbmVudHMgeW91IG11c3QgcmVnaXN0ZXIgdGhlbSB3aXRoIHRoZSBzaG9wISc7IFxyXG5cclxuY2xhc3MgQ29tcG9uZW50Tm90UmVnaXN0ZXJlZEV4Y2VwdGlvbiBleHRlbmRzIEV4Y2VwdGlvbkhhbmRsZXJcclxue1xyXG5cdGNvbnN0cnVjdG9yKG1lc3NhZ2UgPSBudWxsKSBcclxuXHR7XHJcblx0XHRtZXNzYWdlID0gbWVzc2FnZSB8fCBkZWZhdWx0TWVzc2FnZSQ1O1xyXG5cdFx0c3VwZXIobWVzc2FnZSk7XHJcbiAgICBcdHN1cGVyLnN0YWNrVHJhY2UodGhpcywgbWVzc2FnZSk7XHJcbiAgICB9XHJcbn1cblxuLy8gQ29tcG9uZW50c1xyXG4vLyBIZWxwZXJzXHJcbi8vIEV4Y2VwdGlvbnNcclxuY2xhc3MgQ29tcG9uZW50c1Byb3ZpZGVyXHJcbntcclxuXHQvKipcclxuXHQgKiAtIFNldCB0aGUgY29udGFpbmVyIGFzIGEgbWVtYmVyLlxyXG5cdCAqIC0gZGVjbGFyZSB0aGUgY29tcG9uZW50cy5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSBcXENvcmVcXENvbnRhaW5lciB8IGNvbnRhaW5lclxyXG5cdCAqIEByZXR1cm4gdm9pZFxyXG5cdCAqL1xyXG5cdGNvbnN0cnVjdG9yKGNvbnRhaW5lcilcclxuXHR7XHJcblx0XHR0aGlzLmNvbnRhaW5lciA9IGNvbnRhaW5lcjtcclxuXHJcblx0XHR0aGlzLmNvbXBvbmVudHMgPSB7fTtcclxuXHRcdHRoaXMuY29tcG9uZW50cy5GaWx0ZXIgPSB7fTtcclxuXHRcdHRoaXMuY29tcG9uZW50cy5TZXJ2aWNlcyA9IHt9O1xyXG5cdFx0dGhpcy5jb21wb25lbnRzLlByb2R1Y3RzID0ge307XHJcblx0XHR0aGlzLmNvbXBvbmVudHMuUGFnaW5hdGlvbiA9IHt9O1xyXG5cdFx0dGhpcy5jb21wb25lbnRzLkNhcnQgPSB7fTtcclxuXHRcdHRoaXMuY29tcG9uZW50cy5DaGVja291dCA9IHt9O1xyXG5cdH1cclxuXHJcbiAgIC8qKlxyXG5cdCogUmVnaXN0ZXJzIHRoZSBjb21wb25lbnRzLlxyXG5cdCpcclxuXHQqIEBwYXJhbSBvYmplY3QgfCBjb21wb25lbnRzXHJcblx0KiBAcmV0dXJuIHZvaWRcclxuXHQqL1xyXG5cdHJlZ2lzdGVyKGNvbXBvbmVudHMpXHJcblx0e1xyXG5cdFx0dGhpcy5hdmFpbGFibGUgPSBjb21wb25lbnRzO1xyXG5cdFx0dGhpcy5ib290ZWQgPSBbXTtcclxuXHQgXHR0aGlzLmNvbXBvbmVudHMuRmlsdGVyLmJvb3RlZCA9IGZhbHNlO1xyXG5cdFx0dGhpcy5jb21wb25lbnRzLlNlcnZpY2VzLmJvb3RlZCA9IGZhbHNlO1xyXG5cdFx0dGhpcy5jb21wb25lbnRzLlByb2R1Y3RzLmJvb3RlZCA9IGZhbHNlO1xyXG5cdFx0dGhpcy5jb21wb25lbnRzLlBhZ2luYXRpb24uYm9vdGVkID0gZmFsc2U7XHJcblx0XHR0aGlzLmNvbXBvbmVudHMuQ2FydC5ib290ZWQgPSBmYWxzZTtcclxuXHRcdHRoaXMuY29tcG9uZW50cy5DaGVja291dC5ib290ZWQgPSBmYWxzZTtcclxuXHJcblx0XHRsZXQgaW5zdGFuY2UgPSB0aGlzO1xyXG5cclxuXHRcdHRoaXMuY29udGFpbmVyLmJpbmQoJ0ZpbHRlcicsIGZ1bmN0aW9uKGNvbnRhaW5lciwgY29tcG9uZW50KSB7XHJcblx0XHRcdGluc3RhbmNlLmNvbXBvbmVudHNbY29tcG9uZW50XSA9IG5ldyBGaWx0ZXIoY29udGFpbmVyKTtcclxuXHRcdFx0aW5zdGFuY2UuY29tcG9uZW50c1tjb21wb25lbnRdLmJvb3RlZCA9IHRydWU7XHJcblx0XHRcdGluc3RhbmNlLmJvb3RlZC5wdXNoKGluc3RhbmNlLmNvbXBvbmVudHNbY29tcG9uZW50XSk7XHJcblx0XHRcdHJldHVybiBpbnN0YW5jZS5jb21wb25lbnRzW2NvbXBvbmVudF07XHJcblx0XHR9LCAnY29tcG9uZW50cycpO1xyXG5cdFx0XHJcblx0XHR0aGlzLmNvbnRhaW5lci5iaW5kKCdTZXJ2aWNlcycsIGZ1bmN0aW9uKGNvbnRhaW5lciwgY29tcG9uZW50KSB7IFxyXG5cdFx0XHRpbnN0YW5jZS5jb21wb25lbnRzW2NvbXBvbmVudF0gPSBuZXcgU2VydmljZXMoY29udGFpbmVyKTtcclxuXHRcdFx0aW5zdGFuY2UuY29tcG9uZW50c1tjb21wb25lbnRdLmJvb3RlZCA9IHRydWU7XHJcblx0XHRcdGluc3RhbmNlLmJvb3RlZC5wdXNoKGluc3RhbmNlLmNvbXBvbmVudHNbY29tcG9uZW50XSk7XHJcblx0XHRcdHJldHVybiBpbnN0YW5jZS5jb21wb25lbnRzW2NvbXBvbmVudF07XHJcblx0XHR9LCAnY29tcG9uZW50cycpO1xyXG5cclxuXHRcdHRoaXMuY29udGFpbmVyLmJpbmQoJ1Byb2R1Y3RzJywgZnVuY3Rpb24oY29udGFpbmVyLCBjb21wb25lbnQpIHtcclxuXHRcdFx0aW5zdGFuY2UuY29tcG9uZW50c1tjb21wb25lbnRdID0gbmV3IFByb2R1Y3RzKGNvbnRhaW5lciwgY29udGFpbmVyLlJlcXVlc3QsIGNvbnRhaW5lci5FdmVudHMpO1xyXG5cdFx0XHRpbnN0YW5jZS5jb21wb25lbnRzW2NvbXBvbmVudF0uYm9vdGVkID0gdHJ1ZTtcclxuXHRcdFx0aW5zdGFuY2UuYm9vdGVkLnB1c2goaW5zdGFuY2UuY29tcG9uZW50c1tjb21wb25lbnRdKTtcclxuXHRcdFx0cmV0dXJuIGluc3RhbmNlLmNvbXBvbmVudHNbY29tcG9uZW50XTtcclxuXHRcdH0sICdjb21wb25lbnRzJyk7XHJcblxyXG5cdFx0dGhpcy5jb250YWluZXIuYmluZCgnUGFnaW5hdGlvbicsIGZ1bmN0aW9uKGNvbnRhaW5lciwgY29tcG9uZW50KSB7XHJcblx0XHRcdGluc3RhbmNlLmNvbXBvbmVudHNbY29tcG9uZW50XSA9IG5ldyBQYWdpbmF0aW9uKGNvbnRhaW5lciwgaW5zdGFuY2UucHJvdmlkZSgnUHJvZHVjdHMnKSwgY29udGFpbmVyLkV2ZW50cyk7XHJcblx0XHRcdGluc3RhbmNlLmNvbXBvbmVudHNbY29tcG9uZW50XS5ib290ZWQgPSB0cnVlO1xyXG5cdFx0XHRpbnN0YW5jZS5ib290ZWQucHVzaChpbnN0YW5jZS5jb21wb25lbnRzW2NvbXBvbmVudF0pO1xyXG5cdFx0XHRyZXR1cm4gaW5zdGFuY2UuY29tcG9uZW50c1tjb21wb25lbnRdO1xyXG5cdFx0fSwgJ2NvbXBvbmVudHMnKTtcclxuXHJcblx0XHR0aGlzLmNvbnRhaW5lci5iaW5kKCdDYXJ0JywgZnVuY3Rpb24oY29udGFpbmVyLCBjb21wb25lbnQpIHtcclxuXHRcdFx0aW5zdGFuY2UuY29tcG9uZW50c1tjb21wb25lbnRdID0gbmV3IENhcnQoY29udGFpbmVyLCBjb250YWluZXIuUmVxdWVzdCwgY29udGFpbmVyLkV2ZW50cyk7XHJcblx0XHRcdGluc3RhbmNlLmNvbXBvbmVudHNbY29tcG9uZW50XS5ib290ZWQgPSB0cnVlO1xyXG5cdFx0XHRpbnN0YW5jZS5ib290ZWQucHVzaChpbnN0YW5jZS5jb21wb25lbnRzW2NvbXBvbmVudF0pO1xyXG5cdFx0XHRyZXR1cm4gaW5zdGFuY2UuY29tcG9uZW50c1tjb21wb25lbnRdO1xyXG5cdFx0fSwgJ2NvbXBvbmVudHMnKTtcclxuXHJcblx0XHR0aGlzLmNvbnRhaW5lci5iaW5kKCdDaGVja291dCcsIGZ1bmN0aW9uKGNvbnRhaW5lciwgY29tcG9uZW50KSB7XHJcblx0XHRcdGluc3RhbmNlLmNvbXBvbmVudHNbY29tcG9uZW50XSA9IG5ldyBDaGVja291dChjb250YWluZXIsIGNvbnRhaW5lci5SZXF1ZXN0LCBjb250YWluZXIuRXZlbnRzKTtcclxuXHRcdFx0aW5zdGFuY2UuY29tcG9uZW50c1tjb21wb25lbnRdLmJvb3RlZCA9IHRydWU7XHJcblx0XHRcdGluc3RhbmNlLmJvb3RlZC5wdXNoKGluc3RhbmNlLmNvbXBvbmVudHNbY29tcG9uZW50XSk7XHJcblx0XHRcdHJldHVybiBpbnN0YW5jZS5jb21wb25lbnRzW2NvbXBvbmVudF07XHJcblx0XHR9LCAnY29tcG9uZW50cycpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogUHJvdmlkZSBhIHJlZ2lzdGVyZWQgY29tcG9uZW50LlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIHN0cmluZyB8IGNvbXBvbmVudFxyXG5cdCAqIEByZXR1cm4gb2JqZWN0XHJcblx0ICovXHJcblx0cHJvdmlkZShjb21wb25lbnQpXHJcblx0e1xyXG5cdFx0aWYgKENvbW1vbi5pbl9hcnJheShjb21wb25lbnQsIHRoaXMuYXZhaWxhYmxlKSkge1xyXG5cdFx0XHRyZXR1cm4gdGhpcy5jb250YWluZXIubWFrZShjb21wb25lbnQpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHRocm93IG5ldyBDb21wb25lbnROb3RSZWdpc3RlcmVkRXhjZXB0aW9uKCdjb21wb25lbnRzIG11c3QgYmUgcmVnaXN0ZXJlZCBpbiBvcmRlciB0byB1c2UgdGhlbS4nKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIENoZWNrcyBpZiBjb21wb25lbnQgZXhpc3RzLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIHN0cmluZyB8IG5hbWVcclxuXHQgKiBAcmV0dXJuIGJvb2xcclxuXHQgKi9cclxuXHRleGlzdHMobmFtZSlcclxuXHR7XHJcblx0XHRyZXR1cm4gdGhpcy5jb21wb25lbnRzLmhhc093blByb3BlcnR5KG5hbWUpO1xyXG5cdH1cclxufVxuXG5sZXQgZGVmYXVsdE1lc3NhZ2UkNiA9ICdUcnlpbmcgdG8gYmluZCBhbiBhbHJlYWR5IGV4aXN0aW5nIGJvdW5kLic7XHJcblxyXG5jbGFzcyBJbnZhbGlkQmluZGluZ0V4Y2VwdGlvbiBleHRlbmRzIEV4Y2VwdGlvbkhhbmRsZXJcclxue1xyXG5cdGNvbnN0cnVjdG9yKG1lc3NhZ2UgPSBudWxsKSBcclxuXHR7XHJcblx0XHRtZXNzYWdlID0gbWVzc2FnZSB8fCBkZWZhdWx0TWVzc2FnZSQ2O1xyXG5cdFx0c3VwZXIobWVzc2FnZSk7XHJcbiAgICBcdHN1cGVyLnN0YWNrVHJhY2UodGhpcywgbWVzc2FnZSk7XHJcbiAgICB9XHJcbn1cblxuLy8gSGVscGVyc1xyXG4vLyBDb3JlXHJcbi8vIEV4Y2VwdGlvbnNcclxuLyoqXHJcbiAqIEBmaWxlIFxyXG4gKiBDb250YWluZXIgY2xhc3MuXHJcbiAqXHJcbiAqIEhhbmRsZXMvQ29udHJvbHMgdGhlIGRlcGVuZGVuY2llcyBvZiBlY29tbWVyY2UuXHJcbiAqL1xyXG5cclxuY2xhc3MgQ29udGFpbmVyJDUgXHJcbntcclxuXHQvKipcclxuXHQgKiAtIEluaXRpYWxpemUgaW5zdGFuY2VzIG1lbWJlci5cclxuXHQgKiAtIFJlZ2lzdGVyIGJpbmRpbmdzLlxyXG5cdCAqXHJcblx0ICogQHJldHVybiB2b2lkXHJcblx0ICovXHJcblx0Y29uc3RydWN0b3IoKVxyXG5cdHtcclxuXHRcdHRoaXMuaW5zdGFuY2VzID0gW107XHJcblx0XHR0aGlzLnJlZ2lzdGVyKCk7XHJcblx0XHR0aGlzLnJlZ2lzdGVyUHJvdmlkZXJzKCk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBCaW5kcyBrZXkgdG8gY29uY3JldGUgY2xhc3MuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gc3RyaW5nIHwga2V5XHJcblx0ICogQHBhcmFtIGNsYXNzIHwgY29uY3JldGVcclxuXHQgKiBAcmV0dXJuIHZvaWRcclxuXHQgKi9cclxuXHRiaW5kKGtleSwgY29uY3JldGUsIG5hbWVzcGFjZSA9IG51bGwpIFxyXG5cdHtcclxuXHRcdGlmICh0eXBlb2Yga2V5ICE9ICdzdHJpbmcnKSB7XHJcblx0XHRcdHRocm93IG5ldyBJbnZhbGlkQXJndW1lbnRFeGNlcHRpb24kMSgnYmluZCgpIGV4cGVjdHMgdGhlIGZpcnN0IHBhcmFtZXRlciB0byBiZSBzdHJpbmcsIGJ1dCAnICsgdHlwZW9mIGtleSArICcgd2FzIHBhc3NlZCBpbnN0ZWFkLicpO1xyXG5cdFx0fVxyXG5cclxuXHRcdGlmICh0eXBlb2YgY29uY3JldGUgIT0gJ2Z1bmN0aW9uJykgeyBcclxuXHRcdFx0dGhyb3cgbmV3IEludmFsaWRBcmd1bWVudEV4Y2VwdGlvbiQxKCdiaW5kKCkgZXhwZWN0cyB0aGUgc2Vjb25kIHBhcmFtZXRlciB0byBiZSBhIGZ1bmN0aW9uLCBidXQgJyArIHR5cGVvZiBjb25jcmV0ZSArICcgd2FzIHBhc3NlZCBpbnN0ZWFkLicpO1xyXG5cdFx0fVxyXG5cclxuXHRcdGlmIChuYW1lc3BhY2UpIHtcclxuXHRcdFx0aWYgKHR5cGVvZiB0aGlzW25hbWVzcGFjZV0gPT0gJ3VuZGVmaW5lZCcpIHtcclxuXHRcdFx0XHR0aGlzW25hbWVzcGFjZV0gPSB7fTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0dGhpc1tuYW1lc3BhY2VdW2tleV0gPSBjb25jcmV0ZS5iaW5kKGNvbmNyZXRlLCB0aGlzLCBrZXkpO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0dGhpc1trZXldID0gY29uY3JldGUuYmluZChjb25jcmV0ZSwgdGhpcywga2V5KTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFNldHMgYW4gaW5zdGFuY2UuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gc3RyaW5nIHwga2V5XHJcblx0ICogQHBhcmFtIG9iamVjdCB8IGluc3RhbmNlXHJcblx0ICogQHBhcmFtIHN0cmluZyB8IGFsaWFzXHJcblx0ICogQHJldHVybiB2b2lkXHJcblx0ICovXHJcblx0c2V0SW5zdGFuY2Uoa2V5LCBpbnN0YW5jZSwgYWxpYXMgPSBudWxsKSBcclxuXHR7XHJcblx0XHRpZiAodHlwZW9mIGtleSAhPSAnc3RyaW5nJykge1xyXG5cdFx0XHR0aHJvdyBuZXcgSW52YWxpZEFyZ3VtZW50RXhjZXB0aW9uJDEoJ3NldEluc3RhY2UoKSBleHBlY3RzIHRoZSBmaXJzdCBwYXJhbWV0ZXIgdG8gYmUgYSBzdHJpbmcsIGJ1dCAnICsgdHlwZW9mIGtleSArICcgd2FzIHBhc3NlZCBpbnN0ZWFkLicpO1xyXG5cdFx0fVxyXG5cclxuXHRcdGlmICh0eXBlb2YgaW5zdGFuY2UgIT0gJ29iamVjdCcpIHtcclxuXHRcdFx0dGhyb3cgbmV3IEludmFsaWRBcmd1bWVudEV4Y2VwdGlvbiQxKCdzZXRJbnN0YW5jZSgpIGV4cGVjdHMgdGhlIHNlY29uZCBwYXJhbWV0ZXIgdG8gYmUgYW4gb2JqZWN0LCBidXQgJyArIHR5cGVvZiBpbnN0YW5jZSArICcgd2FzIHBhc3NlZCBpbnN0ZWFkLicpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHRoaXMuaW5zdGFuY2VzW2tleV0gPSBpbnN0YW5jZTtcclxuXHRcdHRoaXNba2V5XSA9IGluc3RhbmNlO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogUmVzb2x2ZXMgYW4gaW5zdGFuY2Ugb3V0IG9mIFxyXG5cdCAqIHRoZSBpb2MgY29udGFpbmVyLlxyXG5cdCAqIFxyXG5cdCAqIEBwYXJhbSBzdHJpbmcgfCBrZXlcclxuXHQgKiBAcmV0dXJuIG9iamVjdFxyXG5cdCAqL1xyXG5cdGdldEluc3RhbmNlKGtleSkgXHJcblx0e1xyXG5cdFx0aWYgKHR5cGVvZiBrZXkgIT0gJ3N0cmluZycgJiYgdHlwZW9mIGtleSAhPSAnb2JqZWN0Jykge1xyXG5cdFx0XHR0aHJvdyBuZXcgSW52YWxpZEFyZ3VtZW50RXhjZXB0aW9uJDEoJ2dldEluc3RhY2UoKSBleHBlY3RzIHRoZSBmaXJzdCBwYXJhbWV0ZXIgdG8gYmUgYSBzdHJpbmcsIGJ1dCAnICsgdHlwZW9mIGtleSArICcgd2FzIHBhc3NlZCBpbnN0ZWFkLicpO1xyXG5cdFx0fVxyXG5cclxuXHRcdGlmICh0eXBlb2Yga2V5ID09ICdvYmplY3QnKSB7XHJcblx0XHRcdHJldHVybiB0aGlzLmluc3RhbmNlc1trZXkuY29uc3RydWN0b3IubmFtZV0gfHwgbnVsbDtcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gdGhpcy5pbnN0YW5jZXNba2V5XSB8fCBudWxsO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQ2hlY2tzIGlmIGFuIGluc3RhbmNlIGV4aXN0LlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIG1peGVkIHwgaW5zdGFuY2VcclxuXHQgKiBAcmV0dXJuIGJvb2xcclxuXHQgKi9cclxuXHRpbnN0YW5jZUV4aXN0KGluc3RhbmNlKSBcclxuXHR7XHJcblx0XHRpZiAodHlwZW9mIGluc3RhbmNlID09ICdvYmplY3QnIHx8IHR5cGVvZiBpbnN0YW5jZSA9PSAnc3ltYm9sJykge1xyXG5cdFx0XHRyZXR1cm4gKHR5cGVvZiB0aGlzLmluc3RhbmNlc1tpbnN0YW5jZS5jb25zdHJ1Y3Rvci5uYW1lXSAhPT0gJ3VuZGVmaW5lZCcpO1xyXG5cdFx0fSBlbHNlIGlmICh0eXBlb2YgaW5zdGFuY2UgPT0gJ3N0cmluZycpIHtcclxuXHRcdFx0cmV0dXJuICh0eXBlb2YgdGhpcy5pbnN0YW5jZXNbaW5zdGFuY2VdICE9PSAndW5kZWZpbmVkJylcclxuXHRcdH1cclxuXHRcdFxyXG5cdFx0dGhyb3cgbmV3IEludmFsaWRBcmd1bWVudEV4Y2VwdGlvbiQxKCdpbnN0YW5jZUV4aXN0KCkgZXhwZWN0cyB0aGUgZmlyc3QgcGFyYW1ldGVyIHRvIGJlIHN0cmluZyBvciBhbiBvYmplY3QsIGJ1dCAnICsgdHlwZW9mIGluc3RhbmNlICsgJyB3YXMgcGFzc2VkIGluc3RlYWQuJyk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBSZXRyaWV2ZSBhbiBvYmplY3QsIGlmIG5vdCBleGlzdHNcclxuXHQgKiB3aWxsIGNyZWF0ZSBpdCwgc2V0IGl0IGluIHRoZSBpb2MgY29udGFpbmVyXHJcblx0ICogZm9yIGxhdGVyIHVzZSBhbmQgcmV0cmlldmUgaXQuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gbWl4ZWQgfCBvYmplY3QgXHJcblx0ICogQHJldHVybiBvYmplY3RcclxuXHQgKi9cclxuXHRtYWtlKG9iamVjdClcclxuXHR7XHJcblx0XHRsZXQgaW5zdGFuY2UgPSB7fTtcclxuXHRcdGxldCBrZXk7XHJcblx0XHRcclxuXHRcdGlmICh0aGlzLmluc3RhbmNlRXhpc3Qob2JqZWN0KSkge1xyXG5cdFx0XHRyZXR1cm4gdGhpcy5nZXRJbnN0YW5jZShvYmplY3QpO1xyXG5cdFx0fVxyXG5cclxuXHRcdGlmICh0eXBlb2Ygb2JqZWN0ID09ICdvYmplY3QnKSB7XHJcblx0XHRcdGluc3RhbmNlID0gb2JqZWN0O1xyXG5cdFx0XHRrZXkgPSBvYmplY3QuY29uc3RydWN0b3IubmFtZTtcclxuXHRcdFx0dGhpcy5zZXRJbnN0YW5jZShrZXksIGluc3RhbmNlKTsgXHJcblx0XHR9IGVsc2UgaWYgKHR5cGVvZiBvYmplY3QgPT0gJ3N0cmluZycgJiYgdGhpcy5oYXNPd25Qcm9wZXJ0eShvYmplY3QpKSB7XHJcblx0XHRcdGluc3RhbmNlID0gbmV3IHRoaXNbb2JqZWN0XTtcclxuXHRcdFx0a2V5ID0gb2JqZWN0O1xyXG5cdFx0XHR0aGlzLnNldEluc3RhbmNlKGtleSwgaW5zdGFuY2UpO1x0XHJcblx0XHR9IGVsc2UgaWYgKHR5cGVvZiBvYmplY3QgPT0gJ3N0cmluZycgJiYgdGhpcy5Db21wb25lbnRzLmV4aXN0cyhvYmplY3QpKSB7XHJcblx0XHRcdGluc3RhbmNlID0gbmV3IHRoaXMuY29tcG9uZW50c1tvYmplY3RdO1xyXG5cdFx0XHRrZXkgPSBvYmplY3Q7XHJcblx0XHRcdHRoaXMuc2V0SW5zdGFuY2Uoa2V5LCBpbnN0YW5jZSk7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHR0aHJvdyBuZXcgSW52YWxpZEJpbmRpbmdFeGNlcHRpb24oJ0NvbnRhaW5lci5tYWtlKCkgY291bGQgbm90IGNyZWF0ZSB0aGUgb2JqZWN0IScpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiBpbnN0YW5jZTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFJlbW92ZSBhbGwgZXhpc3RpbmcgaW5zdGFuY2VzLlxyXG5cdCAqXHJcblx0ICogQHJldHVybiB2b2lkIFxyXG5cdCAqL1xyXG5cdGZsdXNoKClcclxuXHR7XHJcblx0XHR0aGlzLmluc3RhbmNlcyA9IFtdO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogUmVnaXN0ZXJzIHRoZSBkZXBlbmRlY2llcy5cclxuXHQgKlxyXG5cdCAqIEByZXR1cm4gdm9pZCBcclxuXHQgKi9cclxuXHRyZWdpc3RlcigpXHJcblx0e1xyXG5cdFx0dGhpcy5zZXRJbnN0YW5jZSgnUmVxdWVzdCcsIG5ldyBSZXF1ZXN0KTtcclxuXHRcdHRoaXMuc2V0SW5zdGFuY2UoJ0V2ZW50cycsIG5ldyBFdmVudE1hbmFnZXIpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogUmVnaXN0ZXJzIHRoZSBwcm92aWRlcnMuXHJcblx0ICpcclxuXHQgKiBAcmV0dXJuIHZvaWQgXHJcblx0ICovXHJcblx0cmVnaXN0ZXJQcm92aWRlcnMoKVxyXG5cdHtcclxuXHRcdHRoaXMuc2V0SW5zdGFuY2UoJ0NvbXBvbmVudHMnLCBuZXcgQ29tcG9uZW50c1Byb3ZpZGVyKHRoaXMpKTtcclxuXHR9XHJcbn1cblxuLy8gSGVscGVyc1xyXG4vLyBDb3JlXHJcbi8vIEV4Y2VwdGlvbnNcclxuLyoqXHJcbiAqIFN0b3JlcyB0aGUgZGVmYXVsdCBzZXR0aW5ncy5cclxuICpcclxuICogQHZhciBvYmplY3RcclxuICovXHJcbmxldCBkZWZhdWx0U2V0dGluZ3MkNiA9IHtcclxuXHRkZWJ1Z19sZXZlbDogJ2Vycm9yJyxcclxuXHRlbGVtZW50OiAnYm9keScsXHJcblx0aW5qZWN0X2xpYnJhcmllczogW10sXHJcblx0Y29tcG9uZW50czogWydQcm9kdWN0cycsICdTZXJ2aWNlcycsICdGaWx0ZXInLCAnUGFnaW5hdGlvbicsICdDYXJ0J10sXHJcblx0bG9hZGluZ19hbmltYXRpb246IHRydWVcclxufTtcclxuXHJcbi8qKlxyXG4gKiBTdG9yZXMgdGhlIG9wdGlvbmFsLCBcclxuICogaW5qZWN0YWJsZSBleHRlcm5hbCBsaWJyYXJpZXMgXHJcbiAqXHJcbiAqIEB2YXIgb2JqZWN0XHJcbiAqL1xyXG5sZXQgZXh0ZXJuYWxMaWJyYXJpZXMgPSB7XHJcblx0Ym9vdHN0cmFwOiAnaHR0cHM6Ly9tYXhjZG4uYm9vdHN0cmFwY2RuLmNvbS9ib290c3RyYXAvMy4zLjcvY3NzL2Jvb3RzdHJhcC5taW4uY3NzJyxcclxufTtcclxuXHJcbmNsYXNzIFR1cmJvRWNvbW1lcmNlXHJcbntcclxuXHQvKipcclxuXHQgKiBUaGUgZW50ZXJ5IGZvciB0aGUgc2hvcC5cclxuXHQgKiAtIFNldHRpbmcgdGhlIGV4Y2VwdGlvbiBoYW5kbGVyLlxyXG5cdCAqIC0gU2V0dGluZyB0aGUgaW9jIGNvbnRhaW5lci5cclxuXHQgKiAtIEV4dGVuZGluZyB0aGUgdXNlciBzZXR0aW5ncy5cclxuXHQgKiAtIFNldHRpbmcgdGhlIGVsZW1lbnQuXHJcblx0ICogLSBEaXNhYmxpbmcgZGVmYXVsdCBlcnJvcnMuXHJcblx0ICogLSBQYXNzaW5nIGNhbGxzIHZpYSBwcm94eSB0byB0aGUgY29tcG9uZW50cy5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSBvYmplY3QgfCBzZXR0aW5nc1xyXG5cdCAqIEByZXR1cm4gUHJveHlcclxuXHQgKi9cclxuXHRjb25zdHJ1Y3RvcihzZXR0aW5ncylcclxuXHR7XHJcblx0XHRpZiAodHlwZW9mIHNldHRpbmdzICE9ICdvYmplY3QnKSB7XHJcblx0XHRcdHRocm93IG5ldyBJbnZhbGlkQXJndW1lbnRFeGNlcHRpb24kMTtcclxuXHRcdH1cclxuXHJcblx0XHR0aGlzLnNldHRpbmdzID0gQ29tbW9uLmV4dGVuZChkZWZhdWx0U2V0dGluZ3MkNiwgc2V0dGluZ3MpO1xyXG5cclxuXHRcdEV4Y2VwdGlvbkhhbmRsZXIuc2V0RGVidWdMZXZlbCA9IHRoaXMuc2V0dGluZ3MuZGVidWdfbGV2ZWw7XHJcblx0XHRcclxuXHRcdHRoaXMubG9hZEV4dGVybmFsTGlicmFyaWVzKCk7XHJcblx0XHRcclxuXHRcdHRoaXMuY29udGFpbmVyID0gbmV3IENvbnRhaW5lciQ1O1xyXG5cclxuXHRcdHRoaXMuY29tcG9uZW50cyA9IHRoaXMuY29udGFpbmVyLm1ha2UoJ0NvbXBvbmVudHMnKTtcclxuXHRcdHRoaXMuY29tcG9uZW50cy5yZWdpc3Rlcih0aGlzLnNldHRpbmdzLmNvbXBvbmVudHMpO1xyXG5cclxuXHRcdGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCBmdW5jdGlvbigpIHtcclxuXHRcdFx0dGhpcy5zZXRFbGVtZW50KHRoaXMuc2V0dGluZ3MuZWxlbWVudCk7XHJcblxyXG5cdFx0XHRpZiAodGhpcy5zZXR0aW5ncy5sb2FkaW5nX2FuaW1hdGlvbikge1xyXG5cdFx0XHRcdHN0YXJ0TG9hZGluZy5jYWxsKHRoaXMpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHR0aGlzLmFkZFN0eWxlVGFnKCk7XHJcblx0XHR9LmJpbmQodGhpcykpO1xyXG5cclxuXHRcdHJldHVybiBuZXcgUHJveHkodGhpcywge1xyXG5cdFx0XHRnZXQ6IGZ1bmN0aW9uKHNob3AsIHNvdXJjZSkge1xyXG5cdFx0XHRcdGlmIChzaG9wLmNvbXBvbmVudHMuZXhpc3RzKHNvdXJjZSkpIHtcclxuXHRcdFx0XHRcdHJldHVybiBzaG9wLmNvbXBvbmVudHMucHJvdmlkZShzb3VyY2UpO1xyXG5cdFx0XHRcdH0gXHJcblxyXG5cdFx0XHRcdGlmIChzaG9wLmNvbnRhaW5lci5pbnN0YW5jZUV4aXN0KHNvdXJjZSkpIHtcclxuXHRcdFx0XHRcdHJldHVybiBzaG9wLmNvbnRhaW5lci5nZXRJbnN0YW5jZShzb3VyY2UpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0fSk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBMb2FkcyB0aGUgZXh0ZXJuYWwgbGlicmFyaWVzIHdoaWNoIHdhcyBzcGVjaWZpZWQuXHJcblx0ICogXHJcblx0ICogQHJldHVybiB2b2lkXHJcblx0ICovXHJcblx0bG9hZEV4dGVybmFsTGlicmFyaWVzKClcclxuXHR7XHJcblx0XHRsZXQgaTtcclxuXHRcdGxldCBsaWJyYXJpZXMgPSB0aGlzLnNldHRpbmdzLmluamVjdF9saWJyYXJpZXM7XHJcblxyXG5cdFx0Zm9yIChpID0gMDsgaSA8IGxpYnJhcmllcy5sZW5ndGg7IGkrKykge1xyXG5cdFx0XHRpZiAoZXh0ZXJuYWxMaWJyYXJpZXMuaGFzT3duUHJvcGVydHkobGlicmFyaWVzW2ldKSkge1xyXG5cdFx0XHRcdGxldCBpZCA9ICdUdXJiby1lQ29tbWVyY2UtJyArIFN0ci51Y2ZpcnN0KGxpYnJhcmllc1tpXSk7XHJcblx0XHRcdFx0XHJcblx0XHRcdFx0aWYgKCEgRE9NLmZpbmQoaWQpKSB7XHJcblx0XHRcdFx0XHRET00uYWRkTGlua2VkU3R5bGUoaWQsIGV4dGVybmFsTGlicmFyaWVzW2xpYnJhcmllc1tpXV0pO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogU2V0cyB0aGUgZWxlbWVudCB0byBiZSBib3VuZCB0by5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSBzdHJpbmcgfCBzZWxlY3RvclxyXG5cdCAqIEByZXR1cm4gdm9pZFxyXG5cdCAqL1xyXG5cdHNldEVsZW1lbnQoc2VsZWN0b3IpXHJcblx0e1xyXG5cdFx0dGhpcy5lbGVtZW50ID0gRE9NLmZpbmQoc2VsZWN0b3IpO1xyXG5cdFx0XHJcblx0XHRET00uYWRkQ2xhc3ModGhpcy5lbGVtZW50LCB0aGlzLnNldHRpbmdzLmNsYXNzKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEFkZCB0aGUgZUNvbW1lcmNlIHN0eWxlIHRhZ3MgdG8gdGhlIERPTS5cclxuXHQgKlxyXG5cdCAqIEByZXR1cm4gdm9pZFxyXG5cdCAqL1xyXG5cdGFkZFN0eWxlVGFnKCkgXHJcblx0e1xyXG5cdFx0aWYgKERPTS5maW5kKCcjVHVyYm9lLUNvbW1lcmNlJykpIHtcclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0fVxyXG5cclxuXHRcdGxldCBjc3MgPSBgXHJcblx0XHRcdCR7dGhpcy5zZXR0aW5ncy5lbGVtZW50fSB7XHJcblx0XHRcdFx0cG9zaXRpb246IHJlbGF0aXZlO1xyXG5cdFx0XHRcdGNsZWFyOiBib3RoO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHQubG9hZGluZy1wcm9ncmVzcy1iYXIge1xyXG5cdFx0XHRcdHBvc2l0aW9uOiBmaXhlZDtcclxuXHRcdFx0XHR0b3A6IDA7XHJcblx0XHRcdFx0bGVmdDogMDtcclxuXHRcdFx0XHRoZWlnaHQ6IDVweDtcclxuXHRcdFx0XHR3aWR0aDogMTAwJTtcclxuXHRcdFx0XHQtd2Via2l0LWJveC1zaGFkb3c6IDBweCAwcHggNXB4IDFweCByZ2JhKDE2OCwxNjgsMTY4LDEpO1xyXG5cdFx0XHRcdC1tb3otYm94LXNoYWRvdzogMHB4IDBweCA1cHggMXB4IHJnYmEoMTY4LDE2OCwxNjgsMSk7XHJcblx0XHRcdFx0Ym94LXNoYWRvdzogMHB4IDBweCA1cHggMXB4IHJnYmEoMTY4LDE2OCwxNjgsMSk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdC5sb2FkaW5nLXByb2dyZXNzLWJhciA+IC5sb2FkaW5nLXByb2dyZXNzLWZpbGwge1xyXG5cdFx0XHRcdHdpZHRoOiAxMDAlO1xyXG5cdFx0XHRcdGhlaWdodDogMTAwJTtcclxuXHRcdFx0XHRwb3NpdGlvbjogYWJzb2x1dGU7XHJcblx0XHRcdFx0YmFja2dyb3VuZC1jb2xvcjogIzlkZDJmZjtcclxuXHRcdFx0XHR0cmFuc2Zvcm06IHRyYW5zbGF0ZVgoLSR7ZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudFdpZHRofXB4KTtcclxuXHRcdFx0fVxyXG5cdFx0YDtcclxuXHQgICAgXHJcblx0ICAgIERPTS5hZGRTdHlsZSgnVHVyYm8tZUNvbW1lcmNlJywgY3NzKTtcclxuXHR9XHJcbn1cclxuXHJcblxyXG4vKipcclxuICogQXR0YWNoZXMgYSBsb2FkZXIgdG8gdGhlIHRvcCBvZiB0aGUgc2NyZWVuXHJcbiAqIGFuZCBoaWRlcyB0aGUgY29udGVudC5cclxuICogU3RvcHMgYXV0b21hdGljYWxseSBhZnRlciAyMCUgcmVhY2hlZC5cclxuICpcclxuICogQHJldHVybiB2b2lkIFxyXG4gKi9cclxuZnVuY3Rpb24gc3RhcnRMb2FkaW5nKCkge1xyXG5cdGxldCBsb2FkZXIgPSBET00uY3JlYXRlRWxlbWVudCgnZGl2Jywge1xyXG5cdFx0Y2xhc3M6ICdsb2FkaW5nLXByb2dyZXNzLWJhcidcclxuXHR9KTtcclxuXHJcblx0bGV0IGZpbGwgPSBET00uY3JlYXRlRWxlbWVudCgnc3BhbicsIHtcclxuXHRcdGNsYXNzOiAnbG9hZGluZy1wcm9ncmVzcy1maWxsJ1xyXG5cdH0pO1xyXG5cclxuXHRsb2FkZXIuYXBwZW5kQ2hpbGQoZmlsbCk7XHJcblx0ZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChsb2FkZXIpO1xyXG5cclxuXHJcblx0bGV0IHByb2dyZXNzID0gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudFdpZHRoO1xyXG5cdGxldCBtYXhTaXplID0gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudFdpZHRoICogMC44MDtcclxuXHJcblx0d2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZShwcm9ncmVzc0RyYXcpO1xyXG5cclxuXHRsZXQgY29udGVudCA9IHRoaXMuZWxlbWVudDtcclxuXHJcblx0Y29udGVudC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xyXG5cdFxyXG5cdGZ1bmN0aW9uIHByb2dyZXNzRHJhdygpIHtcclxuXHRcdGZpbGwuc3R5bGUudHJhbnNmb3JtID0gJ3RyYW5zbGF0ZVgoLScgKyBwcm9ncmVzcyArICdweCknO1xyXG5cdFx0cHJvZ3Jlc3MgLT0gNztcclxuXHJcblx0XHRpZiAocHJvZ3Jlc3MgPCBtYXhTaXplKSB7XHJcblx0XHRcdGRvbmUoKTtcclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0fVxyXG5cclxuXHRcdHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUocHJvZ3Jlc3NEcmF3KTtcclxuXHR9XHJcblxyXG5cdGZ1bmN0aW9uIGRvbmUoKSB7XHJcblx0XHRmaWxsLnN0eWxlLm9wYWNpdHkgPSBwcm9ncmVzcyAvIDEwMDA7XHJcblx0XHRmaWxsLnN0eWxlLnRyYW5zZm9ybSA9ICd0cmFuc2xhdGVYKC0nICsgcHJvZ3Jlc3MgKyAncHgpJztcclxuXHRcclxuXHRcdHByb2dyZXNzIC09IDE1O1xyXG5cclxuXHRcdGlmIChwcm9ncmVzcyA8PSAwKSB7XHJcblx0XHRcdGNvbnRlbnQuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XHJcblx0XHRcdFxyXG5cdFx0XHRpZiAodHlwZW9mIGxvYWRlciAhPSAndW5kZWZpbmVkJykge1xyXG5cdFx0XHRcdERPTS5yZW1vdmUobG9hZGVyKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0fVxyXG5cclxuXHRcdHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoZG9uZSk7XHJcblx0fVxyXG59XG5cbnJldHVybiBUdXJib0Vjb21tZXJjZTtcblxufSgpKTtcbiJdfQ==
