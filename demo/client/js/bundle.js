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
						if (this.readyState == 4 && this.status >= 400 && this.status <= 500) {
							reject(this.responseText);
						}

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

					if (xhr.responseType == 'document') {
						xhr.overrideMimeType('text/xml');
						xhr.setRequestHeader('Content-Type', 'text/html');
						xhr.setRequestHeader('Accept', 'text/html');
					}

					xhr.onreadystatechange = function () {
						if (this.readyState == 4 && this.status >= 400 && this.status <= 500) {
							reject(this.responseText);
						}

						if (this.readyState == 4 && this.status == 200) {
							var response = this.response || this.responseText;
							response = xhr.responseType == 'json' && (typeof response === 'undefined' ? 'undefined' : _typeof(response)) != 'object' ? JSON.parse(response) : response;
							resolve(response);

							if (options.hasOwnProperty('after') && typeof options.after == 'function') {
								options.after.call(this);
							}
						}
					};

					xhr.onabort = xhr.onerror = function (message) {
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

	var Url = function () {
		function Url() {
			_classCallCheck(this, Url);
		}

		_createClass(Url, null, [{
			key: 'processAjaxData',
			value: function processAjaxData(selector, content, urlPath) {
				var context = DOM.find(selector);

				context.innerHTML = content;
				var title = DOM.find('title', context);
				document.title = title.innerHTML;
				window.history.pushState({ "html": content, "pageTitle": title.innerHTML }, "", urlPath);

				window.onpopstate = function (e) {
					if (e.state) {
						context.innerHTML = e.state.html;
						document.title = e.state.pageTitle;
					}
				};
			}

			/**
    * Modifies the get parameter in the url.
    *
    * @param string | url
    * @param string | key
    * @param number | value
    * @param string | separator
    * @return string
    */

		}, {
			key: 'changeQueryParameterValue',
			value: function changeQueryParameterValue(url, key, value) {
				var separator = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : '=';

				var regExp = new RegExp("([?&])" + key + separator + ".*?(&|$)", "i");
				var pairSeparator = url.indexOf('?') !== -1 ? "&" : "?";

				if (url.match(regExp)) {
					return url.replace(regExp, '$1' + key + separator + value + '$2');
				} else {
					return url + pairSeparator + key + separator + value;
				}
			}

			/**
    * Changes the url to a given page number.
    *
    * @param string | parameterKey
    * @param string | parameterValue
    * @param string | separator
    * @return void
    */

		}, {
			key: 'change',
			value: function change(parameterKey, parameterValue) {
				var separator = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '=';

				parameterValue = parameterValue || this.queryString()[parameterKey];
				var requestedUrl = this.changeQueryParameterValue(window.location.href, parameterKey, parameterValue, separator);
				console.log(requestedUrl);
				window.history.replaceState('', '', requestedUrl);
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
		}]);

		return Url;
	}();

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
		total_items: 5,
		url_parameter: 'page',
		separator: '#'
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
				this.setCurrent(1);

				document.addEventListener('DOMContentLoaded', function () {
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
				}.bind(this));
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
				Url.change(this.settings.url_parameter, pageNumber, this.settings.separator);
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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlR1cmJvRWNvbW1lcmNlLmpzIl0sIm5hbWVzIjpbIlR1cmJvRWNvbW1lcmNlIiwiU3RyIiwic3RyaW5nIiwicmVwbGFjZSIsInRvTG93ZXJDYXNlIiwibGVuZ3RoIiwicG9zc2libGUiLCJpIiwiY2hhckF0IiwiTWF0aCIsImZsb29yIiwicmFuZG9tIiwidG9VcHBlckNhc2UiLCJzbGljZSIsImRlYnVnTGV2ZWwiLCJFeGNlcHRpb25IYW5kbGVyIiwibGV2ZWwiLCJ3aW5kb3ciLCJvbmVycm9yIiwiRXJyb3IiLCJjYXB0dXJlU3RhY2tUcmFjZSIsImNvbnN0cnVjdG9yIiwibmFtZSIsImVycm9yIiwibWVzc2FnZSIsImN1c3RvbUFjdGlvbnMiLCJoYW5kbGVFcnJvcnMiLCJoYW5kbGVXYXJuaW5ncyIsImhhbmRsZUluZm9zIiwiY29uc29sZSIsIndhcm4iLCJpbmZvIiwiZGVmYXVsdE1lc3NhZ2UiLCJJbnZhbGlkQXJndW1lbnRFeGNlcHRpb24kMSIsIkRPTSIsImVsZW1lbnQiLCJjbGFzc05hbWUiLCJuZXdDbGFzc05hbWUiLCJyZW1vdmVDbGFzcyIsImFkZENsYXNzIiwidW5kZWZpbmVkIiwiY2xhc3NOYW1lcyIsInNwbGl0IiwiZm9yRWFjaCIsImNsYXNzTGlzdCIsImFkZCIsImluZGV4T2YiLCJyZW1vdmUiLCJwYXJlbnROb2RlIiwicmVtb3ZlQ2hpbGQiLCJpZCIsImNzcyIsImhlYWQiLCJkb2N1bWVudCIsImdldEVsZW1lbnRzQnlUYWdOYW1lIiwic3R5bGVUYWciLCJjcmVhdGVFbGVtZW50IiwiQ1NTIiwibWluaWZ5Q3NzIiwiaW5uZXJIVE1MIiwic2V0QXR0cmlidXRlIiwiYXBwZW5kQ2hpbGQiLCJzb3VyY2UiLCJsaW5rZWRTdHlsZVRhZyIsImVsZW1lbnRUeXBlIiwib3B0aW9ucyIsIm9wdGlvbiIsInNlY29uZENsYXNzTmFtZSIsInRvZ2dsZSIsInNlbGVjdG9yIiwiY29udGV4dCIsInF1ZXJ5RWxlbWVudCIsInBhcmVudEVsZW1lbnQiLCJxdWVyeVNlbGVjdG9yQWxsIiwiaGFzQ2hpbGQiLCJjaGlsZEVsZW1lbnQiLCJub2RlIiwiQ29tbW9uIiwiY3VycmVudE9iamVjdCIsIm5ld09iamVjdCIsImV4dGVuZGVkIiwicHJvcCIsIk9iamVjdCIsInByb3RvdHlwZSIsImhhc093blByb3BlcnR5IiwiY2FsbCIsIm5lZWRsZSIsImh5c3RhY2siLCJBcnJheSIsInRvdGFsIiwic2l6ZSIsImlzTmFOIiwicGFyc2VJbnQiLCJjb2xsZWN0aW9uIiwiY2VpbCIsInN0YXJ0IiwiZW5kIiwicHVzaCIsIm9iamVjdCIsImRlZmF1bHRNZXNzYWdlJDEiLCJJbnZhbGlkRGF0YVN0cnVjdHVyZUV4Y2VwdGlvbiIsImRlZmF1bHRTZXR0aW5ncyIsImhlYWRlcnMiLCJhc3luYyIsIlJlcXVlc3QiLCJzZXR0aW5ncyIsImV4dGVuZCIsInNldERlZmF1bHRSZXF1ZXN0SGVhZGVyIiwiaGVhZGVyIiwib3BlbiIsIlhNTEh0dHBSZXF1ZXN0Iiwic2V0UmVxdWVzdEhlYWRlciIsInJlc3BvbnNlIiwiYXBwbHkiLCJhcmd1bWVudHMiLCJ4aHIiLCJiZWZvcmUiLCJQcm9taXNlIiwicmVzb2x2ZSIsInJlamVjdCIsImRhdGEiLCJ1cmwiLCJyZXNwb25zZVR5cGUiLCJkYXRhVHlwZSIsInRpbWVvdXQiLCJvbnJlYWR5c3RhdGVjaGFuZ2UiLCJyZWFkeVN0YXRlIiwic3RhdHVzIiwicmVzcG9uc2VUZXh0IiwiYWZ0ZXIiLCJzZW5kIiwicXVlcnlTdHJpbmciLCJrZXlzIiwibWFwIiwia2V5IiwiZW5jb2RlVVJJQ29tcG9uZW50Iiwiam9pbiIsIkFjdGl2ZVhPYmplY3QiLCJvdmVycmlkZU1pbWVUeXBlIiwiSlNPTiIsInBhcnNlIiwib25hYm9ydCIsImRlZmF1bHRNZXNzYWdlJDIiLCJCYWRFdmVudENhbGxFeGNlcHRpb24iLCJFdmVudE1hbmFnZXIiLCJldmVudHMiLCJjYWxsYmFjayIsIkludmFsaWRBcmd1bWVudEV4Y2VwdGlvbiIsIkNvb2tpZSIsInZhbHVlIiwiZGF5cyIsInN0cmluZ2lmeSIsImV4cGlyZXMiLCJkYXRlIiwiRGF0ZSIsInNldFRpbWUiLCJnZXRUaW1lIiwidG9HTVRTdHJpbmciLCJjb29raWUiLCJjX3N0YXJ0IiwiY19lbmQiLCJ1bmVzY2FwZSIsInN1YnN0cmluZyIsImRlZmF1bHRNZXNzYWdlJDMiLCJJbnZhbGlkQ2FydEl0ZW1FeGNlcHRpb24iLCJkZWZhdWx0U2V0dGluZ3MkMSIsImNvb2tpZV9uYW1lIiwicHJldmlld19jbGFzcyIsImxvYWRlciIsImNsYXNzIiwid2lkdGgiLCJoZWlnaHQiLCJwbGFjZW1lbnQiLCJmaXhlZCIsImhvdmVyX2NvbG9yIiwibm9fY3NzIiwiQ29udGFpbmVyIiwiRXZlbnRNYW5hZ2VyJDIiLCJIdHRwIiwibG9hZGluZ092ZXJsYXkiLCJpdGVtc0RpdiIsIkNhcnQiLCJjb250YWluZXIiLCJodHRwIiwiZXZlbnRNYW5hZ2VyIiwicHJldmlld0VsZW1lbnQiLCJjcmVhdGVQcmV2aWV3RWxlbWVudCIsImljb24iLCJjcmVhdGVJY29uIiwic2V0RWxlbWVudCIsImFkZFN0eWxlVGFnIiwiYmluZEV2ZW50TGlzdGVuZXJzIiwiaXNFbXB0eSIsImdldCIsInNldHVwQ2FydCIsImNhcnQiLCJlbXB0eU9iamVjdCIsIml0ZW1zIiwiZmF2b3JpdGVzIiwic2V0IiwiaXRlbSIsInF1YW50aXR5IiwiaW5jcmVtZW50ZWQiLCJhbHJlYWR5RmF2b3JpdGVkIiwic3BsaWNlIiwidGFibGUiLCJhdHRyaWJ1dGVzIiwidHIiLCJ0ZCIsImF0dHJpYnV0ZSIsImltYWdlIiwic3JjIiwiY29sc3BhbiIsImNoZWNrb3V0IiwidGV4dCIsIm9uY2xpY2siLCJlIiwicHJldmVudERlZmF1bHQiLCJwdWJsaXNoIiwiYmluZCIsImZpbmQiLCJwb3NpdGlvbiIsImFkZFN0eWxlIiwiY3JlYXRlTG9hZGVyIiwicHJldmlld1N0YXJ0TG9hZGluZyIsImdldENhcnRJdGVtcyIsImFkZFRvUHJldmlldyIsImluc3RhbmNlIiwic2V0VGltZW91dCIsInByZXZpZXdTdG9wTG9hZGluZyIsInRvZ2dsZUNhcnRQcmV2aWV3Iiwic3Vic2NyaWJlIiwib3BlbkNhcnRQcmV2aWV3IiwiYWRkSXRlbSIsInJlbG9hZENhcnRQcmV2aWV3IiwiZmF2b3JpdGVJdGVtIiwiaGFzQ2xhc3MiLCJzd2l0Y2hDbGFzc2VzIiwib3BlbmluZyIsInRvZ2dsZUNsYXNzIiwic3R5bGUiLCJkaXNwbGF5IiwiY2xvc2UiLCJldmVudCIsInN2ZyIsImNyZWF0ZUVsZW1lbnROUyIsImciLCJwYXRoIiwiZGl2IiwiY291bnQiLCJncm91cHMiLCJyZWN0YW5nZWxzIiwiYW5pbWF0aW9ucyIsInJvdGF0aW9uIiwiZ3JvdXAiLCJyZWN0YW5nZWwiLCJiZWdpbiIsImFuaW1hdGUiLCJ0b0ZpeGVkIiwiZGVmYXVsdFNldHRpbmdzJDIiLCJDb250YWluZXIkMSIsIkZpbHRlciIsImFkZEV2ZW50TGlzdGVuZXIiLCJtaW5XaWR0aCIsIm1pbl93aWR0aCIsImRlZmF1bHRTZXR0aW5ncyQzIiwiQ29udGFpbmVyJDIiLCJFdmVudE1hbmFnZXIkMyIsIkh0dHAkMSIsIkNoZWNrb3V0IiwiaGlkZUFsbCIsInNob3ciLCJoaWRlIiwiQ29tcG9uZW50cyIsImJvb3RlZCIsImNvbXBvbmVudCIsImRlZmF1bHRTZXR0aW5ncyQ0IiwiaXRlbV9jbGFzcyIsImFkZF9idXR0b25fY2xhc3MiLCJmYXZvcml0ZV9idXR0b25fY2xhc3MiLCJDb250YWluZXIkMyIsIkV2ZW50TWFuYWdlciQ0IiwiSHR0cCQyIiwiY2h1bmtlZFByb2R1Y3RzIiwiUHJvZHVjdHMiLCJ0b3RhbEl0ZW1zIiwibG9hZFByb2R1Y3RzIiwicGFnZU51bWJlciIsIlBhZ2luYXRpb24iLCJwcm9jY2Vzc2luZyIsImxvYWRQYWdlUHJvZHVjdHNCeUNsaWVudCIsImxvYWRQYWdlUHJvZHVjdHNCeVNlcnZlciIsInJlcXVlc3QiLCJnZXRQcm9kdWN0cyIsInRoZW4iLCJwcm9kdWN0cyIsImN1cnJlbnRJdGVtcyIsInByb2R1Y3QiLCJyZXBsYWNlSXRlbXMiLCJjYXRjaCIsInBhZ2VzIiwiY2FsY3VsYXRlQ2xpZW50UGFnZXMiLCJ0b3RhbF9pdGVtcyIsInBlclBhZ2UiLCJwZXJfcGFnZSIsImFycmF5X2NodW5rIiwiaXNBcnJheSIsImJ1aWxkUHJvZHVjdHMiLCJhY3Rpb24iLCJhdHRyaWJ1dGVzQ29sbGVjdGlvbiIsInRhZ1R5cGUiLCJidWlsdFByb2R1Y3RzIiwiYnVpbHRQcm9kdWN0IiwiYnVpbGRQcm9kdWN0Iiwib3ZlcmxheSIsImluX2FycmF5IiwidGFnIiwia2ViYWJDYXNlIiwiYWRkVG9DYXJ0IiwidHlwZSIsImZhdm9yaXRlIiwibWF4V2lkdGgiLCJtYXhfd2lkdGgiLCJTZXJ2aWNlcyIsIlVybCIsImNvbnRlbnQiLCJ1cmxQYXRoIiwidGl0bGUiLCJoaXN0b3J5IiwicHVzaFN0YXRlIiwib25wb3BzdGF0ZSIsInN0YXRlIiwiaHRtbCIsInBhZ2VUaXRsZSIsInNlcGFyYXRvciIsInJlZ0V4cCIsIlJlZ0V4cCIsInBhaXJTZXBhcmF0b3IiLCJtYXRjaCIsInBhcmFtZXRlcktleSIsInBhcmFtZXRlclZhbHVlIiwicmVxdWVzdGVkVXJsIiwiY2hhbmdlUXVlcnlQYXJhbWV0ZXJWYWx1ZSIsImxvY2F0aW9uIiwiaHJlZiIsImxvZyIsInJlcGxhY2VTdGF0ZSIsInZhcnMiLCJwYXJ0cyIsIm0iLCJkZWZhdWx0TWVzc2FnZSQ0IiwiTm90SW5QYWdlUmFuZ2VFeGNlcHRpb24iLCJkZWZhdWx0U2V0dGluZ3MkNSIsInVybF9wYXJhbWV0ZXIiLCJDb250YWluZXIkNCIsIlByb2R1Y3RzJDIiLCJFdmVudE1hbmFnZXIkNSIsInNldEN1cnJlbnQiLCJ0b3RhbFBhZ2VzIiwiY2FsY3VsYXRlVG90YWxQYWdlcyIsImJ1aWxkUGFnaW5hdGlvbiIsImxpbmtzIiwiY3JlYXRlTGlua3MiLCJyZXBsYWNlTGlua3MiLCJuZXh0IiwiY2hpbGROb2RlcyIsInJlcXVlc3RlZFBhZ2UiLCJjdXJyZW50Iiwibm90SW5QYWdlUmFuZ2UiLCJwcmV2aW91cyIsImdldEF0dHJpYnV0ZSIsImNoYW5nZVVybCIsInNldEFjdGl2ZUxpbmsiLCJ1bCIsImNyZWF0ZVBhZ2VMaW5rcyIsImNyZWF0ZVByZXZpb3VzQnV0dG9uIiwiY3JlYXRlTmV4dEJ1dHRvbiIsInBhZ2UiLCJwYWdlSXRlbSIsImxpbmsiLCJsaSIsInNwYW4xIiwic3BhbjIiLCJjaGFuZ2UiLCJkZWZhdWx0TWVzc2FnZSQ1IiwiQ29tcG9uZW50Tm90UmVnaXN0ZXJlZEV4Y2VwdGlvbiIsIkNvbXBvbmVudHNQcm92aWRlciIsImNvbXBvbmVudHMiLCJhdmFpbGFibGUiLCJFdmVudHMiLCJwcm92aWRlIiwibWFrZSIsImRlZmF1bHRNZXNzYWdlJDYiLCJJbnZhbGlkQmluZGluZ0V4Y2VwdGlvbiIsIkNvbnRhaW5lciQ1IiwiaW5zdGFuY2VzIiwicmVnaXN0ZXIiLCJyZWdpc3RlclByb3ZpZGVycyIsImNvbmNyZXRlIiwibmFtZXNwYWNlIiwiYWxpYXMiLCJpbnN0YW5jZUV4aXN0IiwiZ2V0SW5zdGFuY2UiLCJzZXRJbnN0YW5jZSIsImV4aXN0cyIsImRlZmF1bHRTZXR0aW5ncyQ2IiwiZGVidWdfbGV2ZWwiLCJpbmplY3RfbGlicmFyaWVzIiwibG9hZGluZ19hbmltYXRpb24iLCJleHRlcm5hbExpYnJhcmllcyIsImJvb3RzdHJhcCIsInNldERlYnVnTGV2ZWwiLCJsb2FkRXh0ZXJuYWxMaWJyYXJpZXMiLCJzdGFydExvYWRpbmciLCJQcm94eSIsInNob3AiLCJsaWJyYXJpZXMiLCJ1Y2ZpcnN0IiwiYWRkTGlua2VkU3R5bGUiLCJkb2N1bWVudEVsZW1lbnQiLCJjbGllbnRXaWR0aCIsImZpbGwiLCJib2R5IiwicHJvZ3Jlc3MiLCJtYXhTaXplIiwicmVxdWVzdEFuaW1hdGlvbkZyYW1lIiwicHJvZ3Jlc3NEcmF3IiwidHJhbnNmb3JtIiwiZG9uZSIsIm9wYWNpdHkiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxJQUFJQSxpQkFBa0IsWUFBWTtBQUNsQzs7QUFFQTs7Ozs7Ozs7QUFIa0MsS0FXNUJD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TUFBeEI7O0FBRUEsV0FBU3lMLFlBQVQsR0FBd0I7QUFDdkJMLFFBQUtyTCxLQUFMLENBQVcyTCxTQUFYLEdBQXVCLGlCQUFpQkosUUFBakIsR0FBNEIsS0FBbkQ7QUFDQUEsZUFBWSxDQUFaOztBQUVBLE9BQUlBLFdBQVdDLE9BQWYsRUFBd0I7QUFDdkJJO0FBQ0E7QUFDQTs7QUFFRDNaLFVBQU93WixxQkFBUCxDQUE2QkMsWUFBN0I7QUFDQTs7QUFFRCxXQUFTRSxJQUFULEdBQWdCO0FBQ2ZQLFFBQUtyTCxLQUFMLENBQVc2TCxPQUFYLEdBQXFCTixXQUFXLElBQWhDO0FBQ0FGLFFBQUtyTCxLQUFMLENBQVcyTCxTQUFYLEdBQXVCLGlCQUFpQkosUUFBakIsR0FBNEIsS0FBbkQ7O0FBRUFBLGVBQVksRUFBWjs7QUFFQSxPQUFJQSxZQUFZLENBQWhCLEVBQW1CO0FBQ2xCbEcsWUFBUXJGLEtBQVIsQ0FBY0MsT0FBZCxHQUF3QixPQUF4Qjs7QUFFQSxRQUFJLE9BQU96RSxNQUFQLElBQWlCLFdBQXJCLEVBQWtDO0FBQ2pDdEksU0FBSWEsTUFBSixDQUFXeUgsTUFBWDtBQUNBOztBQUVEO0FBQ0E7O0FBRUR2SixVQUFPd1oscUJBQVAsQ0FBNkJHLElBQTdCO0FBQ0E7QUFDRDs7QUFFRCxRQUFPNWEsY0FBUDtBQUVDLENBdjZHcUIsRUFBdEIiLCJmaWxlIjoiVHVyYm9FY29tbWVyY2UuanMiLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgVHVyYm9FY29tbWVyY2UgPSAoZnVuY3Rpb24gKCkge1xuJ3VzZSBzdHJpY3QnO1xuXG4vKipcclxuICogQGZpbGUgXHJcbiAqIFN0ciBjbGFzcy5cclxuICpcclxuICogQWRkcyBzb21lIHVzZWZ1bCBmdW5jdGlvbmFsaXR5IGZvclxyXG4gKiBtYW5pcHVsYXRpbmcgc3RyaW5ncyBvciBjcmVhdGluZyBzdHJpbmcuXHJcbiAqL1xyXG5cclxuY2xhc3MgU3RyXHJcbntcclxuXHQvKipcclxuXHQgKiBDb252ZXJ0IGNhbWVsQ2FzZSB0byBrZWJhYi1jYXNlLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIHN0cmluZyB8IHN0cmluZ1xyXG5cdCAqIEByZXR1cm4gc3RyaW5nXHJcblx0ICovXHJcblx0c3RhdGljIGtlYmFiQ2FzZShzdHJpbmcpIFxyXG5cdHtcclxuXHRcdHJldHVybiBzdHJpbmcucmVwbGFjZSgvKFthLXpdKShbQS1aXSkvZywgJyQxLSQyJykudG9Mb3dlckNhc2UoKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEdlbmVyYXRlcyBhIHJhbmRvbSBzdHJpbmcuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gaW50ZWdlciB8IGxlbmd0aFxyXG5cdCAqIEByZXR1cm4gc3RyaW5nXHJcblx0ICovXHJcblx0c3RhdGljIHJhbmRvbShsZW5ndGgpIFxyXG5cdHtcclxuXHRcdGxldCBzdHJpbmcgPSAnJztcclxuXHRcdGxldCBwb3NzaWJsZSA9IFwiQUJDREVGR0hJSktMTU5PUFFSU1RVVldYWVphYmNkZWZnaGlqa2xtbm9wcXJzdHV2d3h5ejAxMjM0NTY3ODlcIjtcclxuXHJcblx0XHRmb3IgKGxldCBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XHJcblx0ICAgIFx0c3RyaW5nICs9IHBvc3NpYmxlLmNoYXJBdChNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBwb3NzaWJsZS5sZW5ndGgpKTtcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gc3RyaW5nO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQ2hhbmdlcyB0aGUgZmlyc3QgbGV0dGVyIFxyXG5cdCAqIG9mIHRoZSBzdHJpbmcgdG8gdXBwZXJjYXNlLlxyXG5cdCAqIFxyXG5cdCAqIEBwYXJhbSBzdHJpbmcgfCBzdHJpbmdcclxuXHQgKiBAcmV0dXJuIHN0cmluZ1xyXG5cdCAqL1xyXG5cdHN0YXRpYyB1Y2ZpcnN0KHN0cmluZykgXHJcblx0e1xyXG5cdCAgICByZXR1cm4gc3RyaW5nLmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpICsgc3RyaW5nLnNsaWNlKDEpO1xyXG5cdH1cclxufVxuXG4vKipcclxuICogU3RvcmVzIHRoZSBkZWJ1ZyBsZXZlbC5cclxuICpcclxuICogQHZhciBzdHJpbmcgXHJcbiAqL1xyXG5sZXQgZGVidWdMZXZlbDtcclxuXHJcbmNsYXNzIEV4Y2VwdGlvbkhhbmRsZXJcclxue1xyXG5cdC8qKlxyXG5cdCAqIFNldHRlciBmb3IgdGhlIGRlYnVnIGxldmVsLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIHN0cmluZyB8IGxldmVsXHJcblx0ICogQHJldHVybiB2b2lkXHJcblx0ICovXHJcblx0c3RhdGljIHNldCBzZXREZWJ1Z0xldmVsKGxldmVsKVxyXG5cdHtcclxuXHRcdC8vIFN1cHByZXNzIGVycm9ycyBkZXBlbmRzIG9uIHRoZSBkZWJ1ZyBsZXZlbC5cclxuXHRcdGlmIChsZXZlbCA9PSAnd2FybmluZycgfHwgbGV2ZWwgPT0gJ2luZm8nKSB7XHJcblx0XHRcdHdpbmRvdy5vbmVycm9yID0gZnVuY3Rpb24oKSB7IHJldHVybiB0cnVlOyB9O1xyXG5cdFx0fVxyXG5cclxuXHRcdGRlYnVnTGV2ZWwgPSBsZXZlbDtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEV4dGVuZGVkIGNvbnN0cnVjdG9yLCBjYXB0dXJlcyB0aGVcclxuXHQgKiBzdGFjayB0cmFjZS5cclxuXHQgKlxyXG5cdCAqIEByZXR1cm4gdm9pZFxyXG5cdCAqL1xyXG5cdGNvbnN0cnVjdG9yKClcclxuXHR7XHJcblx0XHRpZiAoRXJyb3IuY2FwdHVyZVN0YWNrVHJhY2UpIHtcclxuXHRcdFx0RXJyb3IuY2FwdHVyZVN0YWNrVHJhY2UodGhpcywgdGhpcy5jb25zdHJ1Y3Rvci5uYW1lKTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEhhbmRsZXMgYWxsIGV4Y2VwdGlvbnMuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gb2JqZWN0IHwgZXJyb3IgfCBUaHJvd2VuIEV4Y2VwdGlvbiBPYmplY3RcclxuXHQgKiBAcGFyYW0gc3RyaW5nIHwgbWVzc2FnZVxyXG5cdCAqIEByZXR1cm4gdm9pZFxyXG5cdCAqL1xyXG5cdHN0YWNrVHJhY2UoZXJyb3IsIG1lc3NhZ2UpIFxyXG5cdHtcclxuXHRcdHRoaXMuY3VzdG9tQWN0aW9ucyhlcnJvciwgbWVzc2FnZSk7XHJcblxyXG5cdFx0c3dpdGNoKGRlYnVnTGV2ZWwpXHJcblx0XHR7XHJcblx0XHRcdGNhc2UgJ2Vycm9yJzogdGhpcy5oYW5kbGVFcnJvcnMoZXJyb3IsIG1lc3NhZ2UpOyBicmVhaztcclxuXHRcdFx0Y2FzZSAnd2FybmluZyc6IHRoaXMuaGFuZGxlV2FybmluZ3MoZXJyb3IsIG1lc3NhZ2UpOyBicmVhaztcclxuXHRcdFx0Y2FzZSAnaW5mbyc6IHRoaXMuaGFuZGxlSW5mb3MoZXJyb3IsIG1lc3NhZ2UpOyBicmVhaztcclxuXHRcdFx0ZGVmYXVsdDogdGhpcy5oYW5kbGVJbmZvcyhlcnJvciwgbWVzc2FnZSk7IGJyZWFrO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogVGFrZSBhY3Rpb24gZm9yIHNwZWNpZmljIEV4Y2VwdGlvbnMuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gb2JqZWN0IHwgZXJyb3IgfCBUaHJvd2VuIEV4Y2VwdGlvbiBPYmplY3RcclxuXHQgKiBAcGFyYW0gc3RyaW5nIHwgbWVzc2FnZVxyXG5cdCAqIEByZXR1cm4gYm9vbFxyXG5cdCAqL1xyXG5cdGN1c3RvbUFjdGlvbnMoZXJyb3IsIG1lc3NhZ2UpXHJcblx0e1xyXG5cdFx0aWYgKGVycm9yLmNvbnN0cnVjdG9yLm5hbWUgPT0gJ0ludmFsaWRBcmd1bWVudEV4Y2VwdGlvbicpIHtcclxuXHRcdFx0Ly8gaGFuZGxlXHJcblx0XHR9IGVsc2UgaWYgKGVycm9yLmNvbnN0cnVjdG9yLm5hbWUgPT0gJ0ludmFsaWRCaW5kaW5nRXhjZXB0aW9uJykge1xyXG5cdFx0XHQvLyBoYW5kbGVcclxuXHRcdH0gZWxzZSBpZiAoZXJyb3IuY29uc3RydWN0b3IubmFtZSA9PSAnQmFkRXZlbnRDYWxsRXhjZXB0aW9uJykge1xyXG5cdFx0XHQvLyBoYW5kbGVcclxuXHRcdH0gZWxzZSBpZiAoZXJyb3IuY29uc3RydWN0b3IubmFtZSA9PSAnQ29tcG9uZW50c0V4Y2VwdGlvbicpIHtcclxuXHRcdFx0Ly8gaGFuZGxlXHJcblx0XHR9IGVsc2UgaWYgKGVycm9yLmNvbnN0cnVjdG9yLm5hbWUgPT0gJ0NvbXBvbmVudE5vdFJlZ2lzdGVyZWRFeGNlcHRpb24nKSB7XHJcblx0XHRcdC8vIGhhbmRsZVxyXG5cdFx0fSBlbHNlIGlmIChlcnJvci5jb25zdHJ1Y3Rvci5uYW1lID09ICdOb3RJblBhZ2VSYW5nZUV4Y2VwdGlvbicpIHtcclxuXHRcdFx0Ly8gaGFuZGxlXHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIGZhbHNlO1xyXG5cdH1cclxuXHJcblx0aGFuZGxlRXJyb3JzKGVycm9yLCBtZXNzYWdlKVxyXG5cdHtcclxuXHRcdGNvbnNvbGUuZXJyb3IoZXJyb3IuY29uc3RydWN0b3IubmFtZSArICc6ICcgKyBtZXNzYWdlKTtcclxuXHR9XHJcblxyXG5cdGhhbmRsZVdhcm5pbmdzKGVycm9yLCBtZXNzYWdlKVxyXG5cdHtcclxuXHRcdGNvbnNvbGUud2FybihlcnJvci5jb25zdHJ1Y3Rvci5uYW1lICsgJzogJyArIG1lc3NhZ2UpO1xyXG5cdH1cclxuXHJcblx0aGFuZGxlSW5mb3MoZXJyb3IsIG1lc3NhZ2UpXHJcblx0e1xyXG5cdFx0Y29uc29sZS5pbmZvKGVycm9yLmNvbnN0cnVjdG9yLm5hbWUgKyAnOiAnICsgbWVzc2FnZSk7XHJcblx0fVxyXG59XG5cbmxldCBkZWZhdWx0TWVzc2FnZSA9ICdBbiBpbnZhbGlkIGFyZ3VtZW50IHdhcyBwYXNzZWQuJztcclxuXHJcbmNsYXNzIEludmFsaWRBcmd1bWVudEV4Y2VwdGlvbiQxIGV4dGVuZHMgRXhjZXB0aW9uSGFuZGxlclxyXG57XHJcblx0Y29uc3RydWN0b3IobWVzc2FnZSA9IG51bGwpIFxyXG5cdHtcclxuXHRcdG1lc3NhZ2UgPSBtZXNzYWdlIHx8IGRlZmF1bHRNZXNzYWdlO1xyXG5cdFx0c3VwZXIobWVzc2FnZSk7XHJcbiAgICBcdHN1cGVyLnN0YWNrVHJhY2UodGhpcywgbWVzc2FnZSk7XHJcbiAgICB9XHJcbn1cblxuLyoqXHJcbiAqIEBmaWxlIFxyXG4gKiBET00gY2xhc3MuXHJcbiAqXHJcbiAqIEFkZHMgc29tZSB1c2VmdWwgZnVuY3Rpb25hbGl0eSBmb3JcclxuICogZmV0Y2hpbmcgb3IgbWFuaXB1bGF0aW5nIERPTSBlbGVtZW50cy5cclxuICovXHJcblxyXG5jbGFzcyBET01cclxue1xyXG5cdC8qKlxyXG5cdCAqIE1pbmlmaWVzIHRoZSBjc3MgdGV4dC5cclxuXHQgKiBcclxuXHQgKiBAcGFyYW0gc3RyaW5nIHwgc3RyaW5nXHJcblx0ICogQHJldHVybiBzdHJpbmdcclxuXHQgKi9cclxuXHRzdGF0aWMgbWluaWZ5Q3NzKHN0cmluZykgXHJcblx0e1xyXG5cdCAgICBzdHJpbmcgPSBzdHJpbmcucmVwbGFjZSgvXFwvXFwqKD86KD8hXFwqXFwvKVtcXHNcXFNdKSpcXCpcXC98W1xcclxcblxcdF0rL2csICcnKTtcclxuXHQgICAgc3RyaW5nID0gc3RyaW5nLnJlcGxhY2UoLyB7Mix9L2csICcgJyk7XHJcblx0ICAgIHN0cmluZyA9IHN0cmluZy5yZXBsYWNlKC8oW3s6fV0pL2csICckMScpO1xyXG5cdCAgICBzdHJpbmcgPSBzdHJpbmcucmVwbGFjZSgvKFs7LF0pIC9nLCAnJDEnKTtcclxuXHQgICAgc3RyaW5nID0gc3RyaW5nLnJlcGxhY2UoLyAhL2csICchJyk7XHJcblx0ICAgIFxyXG5cdCAgICByZXR1cm4gc3RyaW5nO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogU3dpdGNoZXMgYmV0d2VlbiB0d28gZ2l2ZW4gY2xhc3Nlcy5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSBvYmplY3QgfCBlbGVtZW50XHJcblx0ICogQHBhcmFtIHN0cmluZyB8IGNsYXNzTmFtZVxyXG5cdCAqIEBwYXJhbSBzdHJpbmcgfCBuZXdDbGFzc05hbWVcclxuXHQgKiBAcmV0dXJuIG9iamVjdFxyXG5cdCAqL1xyXG5cdHN0YXRpYyBzd2l0Y2hDbGFzc2VzKGVsZW1lbnQsIGNsYXNzTmFtZSwgbmV3Q2xhc3NOYW1lKSBcclxuXHR7XHJcblx0XHR0aGlzLnJlbW92ZUNsYXNzKGVsZW1lbnQsIGNsYXNzTmFtZSk7XHJcblx0XHR0aGlzLmFkZENsYXNzKGVsZW1lbnQsIG5ld0NsYXNzTmFtZSk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBBZGRzIGNsYXNzIHRvIGEgZ2l2ZW4gZWxlbWVudC5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSBvYmplY3QgfCBlbGVtZW50XHJcblx0ICogQHBhcmFtIHN0cmluZyB8IGNsYXNzTmFtZVxyXG5cdCAqIEByZXR1cm4gb2JqZWN0XHJcblx0ICovXHJcblx0c3RhdGljIGFkZENsYXNzKGVsZW1lbnQsIGNsYXNzTmFtZSkgXHJcblx0e1xyXG5cdFx0aWYoZWxlbWVudCA9PT0gbnVsbCkge1xyXG5cdFx0XHR0aHJvdyBuZXcgSW52YWxpZEFyZ3VtZW50RXhjZXB0aW9uJDE7XHJcblx0XHR9XHJcblxyXG5cdFx0aWYoISBjbGFzc05hbWUgfHwgY2xhc3NOYW1lID09ICcnIHx8IHR5cGVvZiBjbGFzc05hbWUgPT09IHVuZGVmaW5lZCkge1xyXG5cdFx0XHRyZXR1cm4gZWxlbWVudDtcclxuXHRcdH1cclxuXHJcblx0XHRsZXQgY2xhc3NOYW1lcyA9IGNsYXNzTmFtZS5zcGxpdCgnICcpO1xyXG5cclxuXHRcdGNsYXNzTmFtZXMuZm9yRWFjaChmdW5jdGlvbihuYW1lKSB7XHJcblx0XHRcdGVsZW1lbnQuY2xhc3NMaXN0LmFkZChuYW1lKTtcclxuXHRcdH0pO1xyXG5cdFx0XHJcblx0XHRyZXR1cm4gZWxlbWVudDtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIENoZWNrcyBpZiBhbiBlbGVtZW50IGhhcyBhIGNsYXNzLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIEhUTUxFbGVtZW50IHwgZWxlbWVudFxyXG5cdCAqIEBwYXJhbSBzdHJpbmcgfCBjbGFzc05hbWVcclxuXHQgKiBAcmV0dXJuIGJvb2xcclxuXHQgKi9cclxuXHRzdGF0aWMgaGFzQ2xhc3MoZWxlbWVudCwgY2xhc3NOYW1lKVxyXG5cdHtcclxuXHRcdGlmIChlbGVtZW50ID09PSBudWxsKSB7XHJcblx0XHRcdHRocm93IG5ldyBJbnZhbGlkQXJndW1lbnRFeGNlcHRpb24kMSgnaGFzQ2xhc3MoKSBleHBlY3RzIHRoZSBmaXJzdCBhcmd1bWVudCB0byBiZSBhbiBIVE1MRWxlbWVudCBidXQgbnVsbCB3YXMgcGFzc2VkLicpO1xyXG5cdFx0fVxyXG5cclxuXHRcdGlmICghIGNsYXNzTmFtZSB8fCBjbGFzc05hbWUgPT0gJycgfHwgdHlwZW9mIGNsYXNzTmFtZSA9PSAndW5kZWZpbmVkJykge1xyXG5cdFx0XHRyZXR1cm47XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIGVsZW1lbnQuY2xhc3NOYW1lLmluZGV4T2YoY2xhc3NOYW1lKSAhPSAtMTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFJlbW92ZXMgY2xhc3MgZnJvbSBhIGdpdmVuIGVsZW1lbnQuXHJcblx0ICogXHJcblx0ICogQHBhcmFtIG9iamVjdCB8IGVsZW1lbnRcclxuXHQgKiBAcGFyYW0gc3RyaW5nIHwgY2xhc3NOYW1lXHJcblx0ICogQHJldHVybiBvYmplY3RcclxuXHQgKi9cclxuXHRzdGF0aWMgcmVtb3ZlQ2xhc3MoZWxlbWVudCwgY2xhc3NOYW1lKSBcclxuXHR7XHJcblx0XHRpZihlbGVtZW50ID09IG51bGwpIHtcclxuXHRcdFx0dGhyb3cgbmV3IEludmFsaWRBcmd1bWVudEV4Y2VwdGlvbiQxO1xyXG5cdFx0fVxyXG5cclxuXHRcdGlmKGNsYXNzTmFtZSA9PSAnJykge1xyXG5cdFx0XHRlbGVtZW50LmNsYXNzTmFtZSA9ICcnO1xyXG5cdFx0fSBlbHNlIHtcclxuXHJcblx0XHRcdGxldCBjbGFzc05hbWVzID0gY2xhc3NOYW1lLnNwbGl0KCcgJyk7XHJcblxyXG5cdFx0XHRjbGFzc05hbWVzLmZvckVhY2goZnVuY3Rpb24obmFtZSkge1xyXG5cdFx0XHRcdGVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShuYW1lKTtcclxuXHRcdFx0fSk7XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIGVsZW1lbnQ7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBSZW1vdmVzIGFuIGVsZW1lbnQgZnJvbSB0aGUgRE9NLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIEhUTUxFbGVtZW50XHJcblx0ICogQHJldHVybiB2b2lkXHJcblx0ICovXHJcblx0c3RhdGljIHJlbW92ZShlbGVtZW50KVxyXG5cdHtcclxuXHRcdGVsZW1lbnQucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChlbGVtZW50KTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEFkZHMgc3R5bGUgdGFnIHdpdGggZ2l2ZW4gaWQgYW5kIGNzcyB0byB0aGUgRE9NLlxyXG5cdCAqIFxyXG5cdCAqIEBwYXJhbSBzdHJpbmcgfCBpZFxyXG5cdCAqIEBwYXJhbSBzdHJpbmcgfCBjc3NcclxuXHQgKiBAcmV0dXJuIHZvaWRcclxuXHQgKi9cclxuXHRzdGF0aWMgYWRkU3R5bGUoaWQsIGNzcylcclxuXHR7XHJcblx0XHRpZiAodHlwZW9mIGNzcyAhPSAnc3RyaW5nJykge1xyXG5cdFx0XHR0aHJvdyBuZXcgSW52YWxpZEFyZ3VtZW50RXhjZXB0aW9uJDE7XHJcblx0XHR9XHJcblxyXG5cdFx0bGV0IGhlYWQgPSBkb2N1bWVudC5oZWFkIHx8IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdoZWFkJylbMF07XHJcblx0XHRsZXQgc3R5bGVUYWcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzdHlsZScpO1xyXG5cclxuXHRcdC8vIHBpcGUgaXQgdGhyb3VnaCB0aGUgbWluZmllclxyXG5cdCAgICBsZXQgQ1NTID0gdGhpcy5taW5pZnlDc3MoY3NzKTtcclxuXHQgICAgLy8gYWRkaW5nIGl0IHRvIHRoZSBzdHlsZXRhZ1xyXG5cdCAgICBzdHlsZVRhZy5pbm5lckhUTUwgPSBDU1M7XHJcblx0ICAgIC8vIGdpdmUgYW4gaWQgdG8gcmVjb2duaXplIHRoZSBzdHlsZSB0YWdcclxuXHRcdHN0eWxlVGFnLnNldEF0dHJpYnV0ZSgnaWQnLCBpZCk7XHJcblx0XHQvLyBhcHBlbmRpbmcgdGhhdCBzdHlsZSB0YWcgdG8gdGhlIERPTSBoZWFkIHRhZ1xyXG5cdFx0aGVhZC5hcHBlbmRDaGlsZChzdHlsZVRhZyk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBBZGRzIGxpbmtlZCBzdHlsZSB0YWcgd2l0aCBnaXZlbiBpZCBhbmQgc3JjIHRvIHRoZSBET00uXHJcblx0ICogXHJcblx0ICogQHBhcmFtIHN0cmluZyB8IGlkXHJcblx0ICogQHBhcmFtIHN0cmluZyB8IHNvdXJjZVxyXG5cdCAqIEByZXR1cm4gdm9pZFxyXG5cdCAqL1xyXG5cdHN0YXRpYyBhZGRMaW5rZWRTdHlsZShpZCwgc291cmNlKSBcclxuXHR7XHJcblx0XHRpZiAodHlwZW9mIHNvdXJjZSAhPSAnc3RyaW5nJykge1xyXG5cdFx0XHR0aHJvdyBuZXcgSW52YWxpZEFyZ3VtZW50RXhjZXB0aW9uJDEoJ0RPTS5hZGRMaW5rZWRTdHlsZSgpIGV4Y3BlY3RzIHRoZSBzZWNvbmQgcGFyYW1ldGVyIHRvIGJlIHN0cmluZywgYnV0ICcgKyB0eXBlb2Ygc291cmNlICsgJyB3YXMgcGFzc2VkIGluc3RlYWQuJyk7XHJcblx0XHR9XHJcblxyXG5cdFx0bGV0IGhlYWQgPSBkb2N1bWVudC5oZWFkIHx8IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdoZWFkJylbMF07XHJcblx0XHRsZXQgbGlua2VkU3R5bGVUYWcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaW5rJyk7XHJcblxyXG5cdCAgICAvLyBnaXZlIGFuIGlkIHRvIHJlY29nbml6ZSB0aGUgc3R5bGUgdGFnXHJcblx0XHRsaW5rZWRTdHlsZVRhZy5zZXRBdHRyaWJ1dGUoJ2lkJywgaWQpO1xyXG5cdFx0bGlua2VkU3R5bGVUYWcuc2V0QXR0cmlidXRlKCdocmVmJywgc291cmNlKTtcclxuXHRcdGxpbmtlZFN0eWxlVGFnLnNldEF0dHJpYnV0ZSgncmVsJywgJ3N0eWxlc2hlZXQnKTtcclxuXHRcdGxpbmtlZFN0eWxlVGFnLnNldEF0dHJpYnV0ZSgndHlwZScsICd0ZXh0L2NzcycpO1xyXG5cdFx0Ly8gYXBwZW5kaW5nIHRoYXQgc3R5bGUgdGFnIHRvIHRoZSBET00gaGVhZCB0YWdcclxuXHRcdGhlYWQuYXBwZW5kQ2hpbGQobGlua2VkU3R5bGVUYWcpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQ3JlYXRlcyBhbiBlbGVtZW50IHdpdGggdGhlIGdpdmVuIG9wdGlvbnMuXHJcblx0ICogXHJcblx0ICogQHBhcmFtIHN0cmluZyB8IGVsZW1lbnRUeXBlXHJcblx0ICogQHBhcmFtIG9iamVjdCB8IG9wdGlvbnNcclxuXHQgKiBAcmV0dXJuIEhUTUxFbGVtZW50XHJcblx0ICovXHJcblx0c3RhdGljIGNyZWF0ZUVsZW1lbnQoZWxlbWVudFR5cGUsIG9wdGlvbnMpXHJcblx0e1xyXG5cdFx0bGV0IGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KGVsZW1lbnRUeXBlKTtcclxuXHRcclxuXHRcdGlmIChvcHRpb25zID09PSB1bmRlZmluZWQpIHtcclxuXHRcdFx0cmV0dXJuIGVsZW1lbnQ7XHJcblx0XHR9XHJcblxyXG5cdFx0Zm9yIChsZXQgb3B0aW9uIGluIG9wdGlvbnMpIHtcclxuXHRcdFx0aWYob3B0aW9uID09ICd0ZXh0Jykge1xyXG5cdFx0XHRcdGVsZW1lbnQuaW5uZXJIVE1MID0gb3B0aW9uc1tvcHRpb25dO1xyXG5cdFx0XHRcdGNvbnRpbnVlO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRlbGVtZW50LnNldEF0dHJpYnV0ZShvcHRpb24sIG9wdGlvbnNbb3B0aW9uXSk7XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIGVsZW1lbnQ7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBUb2dnbGVzIHRoZSBnaXZlbiBjbGFzc2VzLlxyXG5cdCAqIFxyXG5cdCAqIEBwYXJhbSBvYmplY3QgfCBlbGVtZW50XHJcblx0ICogQHBhcmFtIHN0cmluZyB8IGNsYXNzTmFtZVxyXG5cdCAqIEByZXR1cm4gYm9vbFxyXG5cdCAqL1xyXG5cdHN0YXRpYyB0b2dnbGVDbGFzcyhlbGVtZW50LCBjbGFzc05hbWUsIHNlY29uZENsYXNzTmFtZSlcclxuXHR7XHJcblx0XHRpZiAoZWxlbWVudCA9PSBudWxsIHx8IHR5cGVvZiBlbGVtZW50ID09ICd1bmRlZmluZWQnKSB7XHJcblx0XHRcdHRocm93IG5ldyBJbnZhbGlkQXJndW1lbnRFeGNlcHRpb24kMTtcclxuXHRcdH1cclxuXHJcblx0XHRzZWNvbmRDbGFzc05hbWUgPSBzZWNvbmRDbGFzc05hbWUgfHwgdW5kZWZpbmVkO1xyXG5cclxuXHRcdGlmKHNlY29uZENsYXNzTmFtZSkge1xyXG5cdFx0XHRlbGVtZW50LmNsYXNzTGlzdC50b2dnbGUoc2Vjb25kQ2xhc3NOYW1lKTtcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gZWxlbWVudC5jbGFzc0xpc3QudG9nZ2xlKGNsYXNzTmFtZSk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBGaW5kcyBhbiBlbGVtZW50IGluc2lkZSBvZiBwYXJlbnQuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gc3RyaW5nIHwgc2VsZWN0b3JcclxuXHQgKiBAcGFyYW0gb2JqZWN0IHwgY29udGV4dFxyXG5cdCAqIEByZXR1cm4gbWl4ZWRcclxuXHQgKi9cclxuXHRzdGF0aWMgZmluZChzZWxlY3RvciwgY29udGV4dCA9IHdpbmRvdy5kb2N1bWVudCkgXHJcblx0e1xyXG5cdFx0cmV0dXJuIHF1ZXJ5RWxlbWVudChzZWxlY3RvciwgY29udGV4dCk7XHJcblx0fVxyXG59XHJcblxyXG4vKipcclxuICogUXVlcmllcyBhbiBlbGVtZW50IGZyb20gdGhlIERPTS5cclxuICpcclxuICogQHBhcmFtIHN0cmluZyB8IHNlbGVjdG9yXHJcbiAqIEBwYXJhbSBvYmplY3QgfCBwYXJlbnRFbGVtZW50XHJcbiAqIEByZXR1cm4gbWl4ZWRcclxuICovXHJcbmZ1bmN0aW9uIHF1ZXJ5RWxlbWVudChzZWxlY3RvciwgcGFyZW50RWxlbWVudCkgXHJcbntcclxuXHRpZiAodHlwZW9mIHNlbGVjdG9yICE9ICdzdHJpbmcnKSB7XHJcblx0XHR0aHJvdyBuZXcgSW52YWxpZEFyZ3VtZW50RXhjZXB0aW9uJDEoJ3F1ZXJ5RWxlbWVudCgpIGV4cGVjdHMgZmlyc3QgcGFyYW1ldGVyIHRvIGJlIGEgc3RyaW5nLCBidXQgJyArIHR5cGVvZiBzZWxlY3RvciArICcgd2FzIHBhc3NlZCBpbnN0ZWFkLicpO1xyXG5cdH1cclxuXHJcblx0bGV0IGVsZW1lbnQgPSBwYXJlbnRFbGVtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3IpO1xyXG5cclxuXHRpZiAoZWxlbWVudC5sZW5ndGggPT0gMCkge1xyXG5cdFx0cmV0dXJuIG51bGw7XHJcblx0fVxyXG5cclxuXHRyZXR1cm4gKGVsZW1lbnQubGVuZ3RoID4gMSkgPyBlbGVtZW50IDogZWxlbWVudFswXTtcclxufVxyXG5cclxuLyoqXHJcbiAqIENoZWNrcyBpZiBwYXJlbnQgaGFzIGNoaWxkLlxyXG4gKlxyXG4gKiBAcGFyYW0gb2JqZWN0IHwgcGFyZW50RWxlbWVudFxyXG4gKiBAcGFyYW0gb2JqZWN0IHwgY2hpbGRFbGVtZW50XHJcbiAqIEByZXR1cm4gYm9vbFxyXG4gKi9cclxuZnVuY3Rpb24gaGFzQ2hpbGQocGFyZW50RWxlbWVudCwgY2hpbGRFbGVtZW50KSBcclxue1xyXG4gICAgIGxldCBub2RlID0gY2hpbGRFbGVtZW50LnBhcmVudE5vZGU7XHJcbiAgICAgXHJcbiAgICAgd2hpbGUgKG5vZGUgIT0gbnVsbCkge1xyXG4gICAgICAgICBpZiAobm9kZSA9PSBwYXJlbnRFbGVtZW50KSB7XHJcbiAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgfVxyXG4gICAgICAgICBub2RlID0gbm9kZS5wYXJlbnROb2RlO1xyXG4gICAgIH1cclxuICAgICBcclxuICAgICByZXR1cm4gZmFsc2U7XHJcbn1cblxuLyoqXHJcbiAqIEBmaWxlIFxyXG4gKiBDb21tb24gY2xhc3MuXHJcbiAqXHJcbiAqIEFkZHMgc29tZSB1c2VmdWwgZnVuY3Rpb25hbGl0eSBmb3JcclxuICogY29tbW9uIHRhc2tzIC0gZGF0YSBjaGVja3Mgb3IgZGF0YSBtYW5pcHVsYXRpb24uXHJcbiAqL1xyXG5cclxuY2xhc3MgQ29tbW9uXHJcbntcclxuXHQvKipcclxuXHQgKiBFeHRlbmQgYW4gb2JqZWN0LlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIG9iamVjdCB8IGN1cnJlbnRPYmplY3RcclxuXHQgKiBAcGFyYW0gb2JqZWN0IHwgbmV3T2JqZWN0XHJcblx0ICogQHJldHVybiBvYmplY3RcclxuXHQgKi9cclxuXHRzdGF0aWMgZXh0ZW5kKGN1cnJlbnRPYmplY3QsIG5ld09iamVjdCkge1xyXG5cdFx0dmFyIGV4dGVuZGVkID0ge307XHJcblx0ICAgIHZhciBwcm9wO1xyXG5cclxuXHQgICAgZm9yIChwcm9wIGluIGN1cnJlbnRPYmplY3QpIHtcclxuXHQgICAgICAgIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoY3VycmVudE9iamVjdCwgcHJvcCkpIHtcclxuXHQgICAgICAgICAgICBleHRlbmRlZFtwcm9wXSA9IGN1cnJlbnRPYmplY3RbcHJvcF07XHJcblx0ICAgICAgICB9XHJcblx0ICAgIH1cclxuXHJcblx0ICAgIGZvciAocHJvcCBpbiBuZXdPYmplY3QpIHtcclxuXHQgICAgICAgIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwobmV3T2JqZWN0LCBwcm9wKSkge1xyXG5cdCAgICAgICAgICAgIGV4dGVuZGVkW3Byb3BdID0gbmV3T2JqZWN0W3Byb3BdO1xyXG5cdCAgICAgICAgfVxyXG5cdCAgICB9XHJcblxyXG5cdCAgICByZXR1cm4gZXh0ZW5kZWQ7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBDaGVja3MgZm9yIGEgbmVlZGxlIGluIGh5c3RhY2sgYXJyYXkuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gbWl4ZWQgfCBuZWVkbGVcclxuXHQgKiBAcGFyYW0gb2JqZWN0IHwgb2JqZWN0XHJcblx0ICogQHJldHVybiBib29sXHJcblx0ICpcclxuXHQgKi9cclxuXHRzdGF0aWMgaW5fYXJyYXkobmVlZGxlLCBoeXN0YWNrKSB7XHJcblx0XHRpZiAodHlwZW9mIGh5c3RhY2sgPT0gJ3VuZGVmaW5lZCcgfHwgaHlzdGFjay5jb25zdHJ1Y3RvciAhPT0gQXJyYXkpIHtcclxuXHRcdFx0dGhyb3cgbmV3IEludmFsaWRBcmd1bWVudEV4Y2VwdGlvbiQxKCdDb21tb24uaW5fYXJyYXkoKSBleHBlY3RzIHRoZSBzZWNvbmQgcGFyYW1ldGVyIHRvIGJlIGFuIGFycmF5LCBidXQgJyArIHR5cGVvZiBoeXN0YWNrICsgJyB3YXMgcGFzc2QgaW5zdGVhZCcpO1xyXG5cdFx0fVxyXG5cclxuXHRcdGZvciAodmFyIGkgPSAwOyBpIDw9IGh5c3RhY2subGVuZ3RoOyBpKyspIHtcclxuXHRcdFx0aWYgKG5lZWRsZSA9PSBoeXN0YWNrW2ldKSB7XHJcblx0XHRcdFx0cmV0dXJuIHRydWU7XHRcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdFxyXG5cdFx0cmV0dXJuIGZhbHNlO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogVGFrZXMgYW4gYXJyYXkgYW5kIGNodW5rcyBpdC5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSBhcnJheSB8IHRvdGFsXHJcblx0ICogQHBhcmFtIG51bWJlciB8IGNodW5rc1xyXG5cdCAqIEByZXR1cm4gYXJyYXlcclxuXHQgKi9cclxuXHRzdGF0aWMgYXJyYXlfY2h1bmsodG90YWwsIHNpemUgPSA1KVxyXG5cdHsgICAgICAgIFxyXG4gICAgICBcdGlmIChpc05hTihzaXplKSkge1xyXG4gICAgICBcdFx0dGhyb3cgbmV3IEludmFsaWRBcmd1bWVudEV4Y2VwdGlvbiQxKCdDb21tb24uYXJyYXlfY2h1bmsoKSBleHBlY3RzIHRoZSBzZWNvbmQgcGFyYW1ldGVyIHRvIGJlIGEgbnVtYmVyLCBidXQgJyArIHR5cGVvZiBzaXplICsgJyBwYXNzZWQgaW5zdGVhZC4nKVxyXG4gICAgICBcdH1cclxuXHJcbiAgICAgIFx0c2l6ZSA9IHBhcnNlSW50KHNpemUpO1xyXG4gICAgICAgXHJcbiAgICAgICBcdGxldCBpO1xyXG4gICAgICAgXHRsZXQgY29sbGVjdGlvbiA9IFtdO1xyXG5cclxuICAgICAgICAvLyBhZGQgZWFjaCBjaHVuayB0byB0aGUgcmVzdWx0XHJcbiAgICAgICAgZm9yIChpID0gMDsgaSA8IE1hdGguY2VpbCh0b3RhbC5sZW5ndGggLyBzaXplKTsgaSsrKSB7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB2YXIgc3RhcnQgPSBpICogc2l6ZTtcclxuICAgICAgICAgICAgdmFyIGVuZCA9IHN0YXJ0ICsgc2l6ZTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGNvbGxlY3Rpb24ucHVzaCh0b3RhbC5zbGljZShzdGFydCwgZW5kKSk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICByZXR1cm4gY29sbGVjdGlvbjtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIENoZWNrcyBpZiBhbiBvYmplY3QgaXMgZW1wdHkuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gb2JqZWN0IHwgb2JqZWN0XHJcblx0ICogQHJldHVybiBib29sXHJcblx0ICovXHJcblx0c3RhdGljIGVtcHR5T2JqZWN0KG9iamVjdCkge1xyXG5cdFx0Zm9yIChsZXQgcHJvcCBpbiBvYmplY3QpIHtcclxuXHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiB0cnVlO1xyXG5cdH1cclxuXHJcblxyXG5cdC8qKlxyXG5cdCAqIENoZWNrcyBpZiBhIGdpdmVuIG9iamVjdCBjb250YWluZWQgaW4gYW4gYXJyYXkuXHJcblx0ICogXHJcblx0ICogQHBhcmFtIG9iamVjdCB8IG9iamVjdFxyXG5cdCAqIEBwYXJhbSBhcnJheSB8IGhheXN0YWNrXHJcblx0ICogQHJldHVybiBib29sXHJcblx0ICovXHJcblx0c3RhdGljIGNvbnRhaW5zT2JqZWN0KG9iamVjdCwgaHlzdGFjaykgXHJcblx0e1xyXG5cdCAgICBsZXQgaTtcclxuXHJcblx0ICAgIGZvciAoaSA9IDA7IGkgPCBoeXN0YWNrLmxlbmd0aDsgaSsrKSB7XHJcblx0ICAgICAgICBpZiAodHlwZW9mIG9iamVjdCA9PSAnc3RyaW5nJyAmJiBoeXN0YWNrW2ldLmNvbnN0cnVjdG9yLm5hbWUgPT09IG9iamVjdCkge1xyXG5cdCAgICAgICAgXHRyZXR1cm4gdHJ1ZTtcclxuXHQgICAgICAgIH1cclxuXHJcblx0ICAgICAgICBpZiAoaHlzdGFja1tpXSA9PT0gb2JqZWN0KSB7XHJcblx0ICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcblx0ICAgICAgICB9XHJcblx0ICAgIH1cclxuXHJcblx0ICAgIHJldHVybiBmYWxzZTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIENoZWNrcyBpZiBhIGdpdmVuIHBhcmFtZXRlciBpcyBhbiBvYmplY3QuXHJcblx0ICogXHJcblx0ICogQHBhcmFtIG9iamVjdCB8IG9iamVjdFxyXG5cdCAqIEByZXR1cm4gYm9vbFxyXG5cdCAqL1xyXG5cdHN0YXRpYyBpc09iamVjdChvYmplY3QpIFxyXG5cdHtcclxuXHRcdHJldHVybiB0eXBlb2Ygb2JqZWN0ID09ICdvYmplY3QnO1xyXG5cdH1cclxufVxuXG5sZXQgZGVmYXVsdE1lc3NhZ2UkMSA9ICdUaGUgZGF0YSBzdHJ1Y3R1cmUgaXMgaW52YWxpZCc7XHJcblxyXG5jbGFzcyBJbnZhbGlkRGF0YVN0cnVjdHVyZUV4Y2VwdGlvbiBleHRlbmRzIEV4Y2VwdGlvbkhhbmRsZXJcclxue1xyXG5cdGNvbnN0cnVjdG9yKG1lc3NhZ2UgPSBudWxsKSBcclxuXHR7XHJcblx0XHRtZXNzYWdlID0gbWVzc2FnZSB8fCBkZWZhdWx0TWVzc2FnZSQxO1xyXG5cdFx0c3VwZXIobWVzc2FnZSk7XHJcbiAgICBcdHN1cGVyLnN0YWNrVHJhY2UodGhpcywgbWVzc2FnZSk7XHJcbiAgICB9XHJcbn1cblxuLyoqXHJcbiAqIEBmaWxlIFxyXG4gKiBSZXF1ZXN0IGNsYXNzLlxyXG4gKlxyXG4gKiBIYW5kbGVzIGFqYXggcmVxdWVzdHMgUE9TVCwgR0VUIGV0Yy4uLlxyXG4gKi9cclxuXHJcbi8qKlxyXG4gKiBTdG9yZXMgdGhlIGRlZmF1bHQgc2V0dGluZ3MuXHJcbiAqXHJcbiAqIEB2YXIgb2JqZWN0XHJcbiAqL1xyXG5cclxubGV0IGRlZmF1bHRTZXR0aW5ncyA9IHtcclxuXHRoZWFkZXJzOiB7XHJcblx0XHQnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nXHJcblx0fSxcclxuXHRhc3luYzogdHJ1ZVxyXG59O1xyXG5cclxuY2xhc3MgUmVxdWVzdFxyXG57XHJcblx0LyoqXHJcblx0ICogLSBJbml0aWFsaXplIHRoZSBzZXR0aW5ncyBvYmplY3QuXHJcblx0ICogLSBJbml0aWFsaXplIHRoZSB4aHIgb2JqZWN0LlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIG9iamVjdCB8IHNldHRpbmdzXHJcblx0ICogQHJldHVybiB2b2lkXHJcblx0ICovXHJcblx0Y29uc3RydWN0b3Ioc2V0dGluZ3MpXHJcblx0e1xyXG5cdFx0dGhpcy5zZXR0aW5ncyA9IENvbW1vbi5leHRlbmQoZGVmYXVsdFNldHRpbmdzLCBzZXR0aW5ncyk7XHJcblx0XHR0aGlzLnNldERlZmF1bHRSZXF1ZXN0SGVhZGVyKCk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBTZXRzIHRoZSBkZWZhdWx0IHJlcXVlc3QgaGVhZGVycy5cclxuXHQgKlxyXG5cdCAqIEByZXR1cm4gdm9pZFxyXG5cdCAqL1xyXG5cdHNldERlZmF1bHRSZXF1ZXN0SGVhZGVyKClcclxuXHR7XHJcblx0XHRsZXQgaGVhZGVyO1xyXG5cdFx0bGV0IGhlYWRlcnMgPSB0aGlzLnNldHRpbmdzLmhlYWRlcnM7XHJcblx0XHRsZXQgYXN5bmMgPSB0aGlzLnNldHRpbmdzLmFzeW5jO1xyXG5cdFx0bGV0IG9wZW4gPSBYTUxIdHRwUmVxdWVzdC5wcm90b3R5cGUub3BlbjtcclxuXHRcdGxldCBzZXRSZXF1ZXN0SGVhZGVyID0gWE1MSHR0cFJlcXVlc3QucHJvdG90eXBlLnNldFJlcXVlc3RIZWFkZXI7XHJcblxyXG5cdFx0WE1MSHR0cFJlcXVlc3QucHJvdG90eXBlLm9wZW4gPSBmdW5jdGlvbigpIHtcclxuXHRcdFx0dmFyIHJlc3BvbnNlID0gb3Blbi5hcHBseSh0aGlzLCBhcmd1bWVudHMsIGFzeW5jKTtcclxuXHJcblx0XHRcdGZvciAoaGVhZGVyIGluIGhlYWRlcnMpIHtcclxuXHRcdFx0XHR0aGlzLnNldFJlcXVlc3RIZWFkZXIoaGVhZGVyLCBoZWFkZXJzW2hlYWRlcl0pO1xyXG5cdFx0XHR9XHJcblxyXG5cdCAgXHRcdHJldHVybiByZXNwb25zZTtcclxuXHRcdH07XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBNYWtlcyBhIFBPU1QgcmVxdWVzdC5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSBvYmplY3QgfCBvcHRpb25zXHJcblx0ICogQHJldHVybiBQcm9taXNlXHJcblx0ICovXHJcblx0cG9zdChvcHRpb25zKVxyXG5cdHtcclxuXHRcdGxldCB4aHIgPSB0aGlzLnhocjtcclxuXHJcblx0XHRpZihvcHRpb25zLmhhc093blByb3BlcnR5KCdiZWZvcmUnKSAmJiB0eXBlb2Ygb3B0aW9ucy5iZWZvcmUgPT0gJ2Z1bmN0aW9uJykge1xyXG5cdFx0XHRvcHRpb25zLmJlZm9yZS5jYWxsKHRoaXMpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcclxuXHRcdFx0aWYodHlwZW9mIG9wdGlvbnMgIT09ICdvYmplY3QnKSB7XHJcblx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKCdnZXQgZXhwZWN0aW5nIGEganNvbiBvYmplY3QgdG8gYmUgcGFzc2VkIGFzIGFuIGFyZ3VtZW50LCBidXQgJysgdHlwZW9mIG9wdGlvbnMgKyAnIHdhcyBwYXNzZWQuJyk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdG9wdGlvbnMuZGF0YSA9IG9wdGlvbnMuZGF0YSB8fCB7fTtcclxuXHJcblx0XHRcdGlmKHR5cGVvZiBvcHRpb25zLmRhdGEgIT09ICdvYmplY3QnKSB7XHJcblx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKCdkYXRhIHByb3BlcnR5IGV4cGVjdGluZyBhIGpzb24gb2JqZWN0IHRvIGJlIHBhc3NlZCBhcyBhbiBhcmd1bWVudCwgYnV0ICcgKyB0eXBlb2Ygb3B0aW9ucy5kYXRhICsgJyB3YXMgcGFzc2VkLicpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHR4aHIub3BlbignUE9TVCcsIG9wdGlvbnMudXJsLCB0cnVlKTtcclxuXHJcblx0XHRcdHhoci5yZXNwb25zZVR5cGUgPSBvcHRpb25zLmRhdGFUeXBlIHx8ICdqc29uJztcclxuXHRcdFx0eGhyLnRpbWVvdXQgPSBvcHRpb25zLnRpbWVvdXQgfHwgMzAwMDtcclxuXHJcblx0XHRcdHhoci5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBmdW5jdGlvbigpIHtcclxuXHRcdFx0XHRpZiAodGhpcy5yZWFkeVN0YXRlID09IDQgJiYgKHRoaXMuc3RhdHVzID49IDQwMCAmJiB0aGlzLnN0YXR1cyA8PSA1MDApKSB7XHJcblx0XHRcdCAgICBcdHJlamVjdCh0aGlzLnJlc3BvbnNlVGV4dCk7XHJcblx0XHRcdCAgICB9XHJcblx0XHRcdCAgICBcclxuXHRcdFx0ICAgIGlmICh0aGlzLnJlYWR5U3RhdGUgIT0gNCB8fCB0aGlzLnN0YXR1cyAhPSAyMDApIHtcclxuXHRcdFx0ICAgIFx0cmV0dXJuO1xyXG5cdFx0XHQgICAgfVxyXG5cdCAgICAgICBcdFxyXG4gICAgICAgXHRcdFx0cmVzb2x2ZSh0aGlzLnJlc3BvbnNlKTtcclxuICAgICAgIFx0XHRcdFxyXG4gICAgICAgXHRcdFx0aWYgKG9wdGlvbnMuaGFzT3duUHJvcGVydHkoJ2FmdGVyJykgJiYgdHlwZW9mIG9wdGlvbnMuYWZ0ZXIgPT0gJ2Z1bmN0aW9uJykge1xyXG5cdFx0XHRcdFx0b3B0aW9ucy5hZnRlci5jYWxsKHRoaXMpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fTtcclxuXHJcblx0XHRcdHhoci5vbmVycm9yID0gZnVuY3Rpb24obWVzc2FnZSkge1xyXG5cdFx0XHRcdGlmKG9wdGlvbnMuaGFzT3duUHJvcGVydHkoJ2Vycm9yJykgJiYgdHlwZW9mIG9wdGlvbnMuZXJyb3IgPT0gJ2Z1bmN0aW9uJykge1xyXG5cdFx0XHRcdFx0b3B0aW9ucy5lcnJvcihtZXNzYWdlKTtcclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdHJlamVjdChtZXNzYWdlKTtcclxuXHRcdFx0fTtcclxuXHJcblx0XHRcdGlmKCEgb3B0aW9ucy5kYXRhKSB7XHJcblx0XHRcdFx0eGhyLnNlbmQobnVsbCk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHZhciBxdWVyeVN0cmluZyA9IE9iamVjdC5rZXlzKG9wdGlvbnMuZGF0YSkubWFwKGZ1bmN0aW9uKGtleSkge1xyXG5cdFx0ICAgICAgICAgICAgcmV0dXJuIGVuY29kZVVSSUNvbXBvbmVudChrZXkpICsgJz0nICtcclxuXHRcdCAgICAgICAgICAgICAgICBcdGVuY29kZVVSSUNvbXBvbmVudChvcHRpb25zLmRhdGFba2V5XSk7XHJcblx0XHQgICAgICAgIFx0fSkuam9pbignJicpO1xyXG5cclxuXHRcdFx0eGhyLnNlbmQocXVlcnlTdHJpbmcpO1xyXG5cdFx0fSk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBNYWtlcyBhIEdFVCBhamF4IHJlcXVlc3QuXHJcblx0ICogXHJcblx0ICogQHBhcmFtIG9iamVjdCB8IG9wdGlvbnNcclxuXHQgKiBAcmV0dXJuIFByb21pc2VcclxuXHQgKi9cclxuXHRnZXQob3B0aW9ucylcclxuXHR7XHJcblx0XHRsZXQgeGhyID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCkgfHwgbmV3IEFjdGl2ZVhPYmplY3QoXCJNaWNyb3NvZnQuWE1MSFRUUFwiKTtcdFx0XHRcclxuXHJcblx0XHRpZiAob3B0aW9ucy5oYXNPd25Qcm9wZXJ0eSgnYmVmb3JlJykgJiYgdHlwZW9mIG9wdGlvbnMuYmVmb3JlID09ICdmdW5jdGlvbicpIHtcclxuXHRcdFx0b3B0aW9ucy5iZWZvcmUuY2FsbCh0aGlzKTtcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XHJcblx0XHRcdGlmICh0eXBlb2Ygb3B0aW9ucyAhPT0gJ29iamVjdCcpIHtcclxuXHRcdFx0XHR0aHJvdyBuZXcgRXJyb3IoJ2dldCBleHBlY3RpbmcgYSBqc29uIG9iamVjdCB0byBiZSBwYXNzZWQgYXMgYW4gYXJndW1lbnQsIGJ1dCAnKyB0eXBlb2Ygb3B0aW9ucyArICcgd2FzIHBhc3NlZC4nKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0b3B0aW9ucy5kYXRhID0gb3B0aW9ucy5kYXRhIHx8IHt9O1xyXG5cclxuXHRcdFx0aWYgKHR5cGVvZiBvcHRpb25zLmRhdGEgIT09ICdvYmplY3QnKSB7XHJcblx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKCdkYXRhIHByb3BlcnR5IGV4cGVjdGluZyBhIGpzb24gb2JqZWN0IHRvIGJlIHBhc3NlZCBhcyBhbiBhcmd1bWVudCwgYnV0ICcgKyB0eXBlb2Ygb3B0aW9ucy5kYXRhICsgJyB3YXMgcGFzc2VkLicpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHR4aHIub3BlbignR0VUJywgb3B0aW9ucy51cmwsIHRydWUpO1xyXG5cclxuXHRcdFx0eGhyLnJlc3BvbnNlVHlwZSA9IG9wdGlvbnMuZGF0YVR5cGUgfHwgJ2pzb24nO1xyXG5cdFx0XHR4aHIudGltZW91dCA9IG9wdGlvbnMudGltZW91dCB8fCAzMDAwO1xyXG5cclxuXHRcdFx0aWYgKHhoci5yZXNwb25zZVR5cGUgPT0gJ2pzb24nKSB7XHJcblx0XHRcdFx0eGhyLnNldFJlcXVlc3RIZWFkZXIoJ0NvbnRlbnQtVHlwZScsICdhcHBsaWNhdGlvbi9qc29uJyk7XHJcblx0XHRcdFx0eGhyLnNldFJlcXVlc3RIZWFkZXIoJ0FjY2VwdCcsICdhcHBsaWNhdGlvbi9qc29uJyk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGlmICh4aHIucmVzcG9uc2VUeXBlID09ICdkb2N1bWVudCcpIHtcclxuXHRcdFx0XHR4aHIub3ZlcnJpZGVNaW1lVHlwZSgndGV4dC94bWwnKTtcclxuXHRcdFx0XHR4aHIuc2V0UmVxdWVzdEhlYWRlcignQ29udGVudC1UeXBlJywgJ3RleHQvaHRtbCcpO1xyXG5cdFx0XHRcdHhoci5zZXRSZXF1ZXN0SGVhZGVyKCdBY2NlcHQnLCAndGV4dC9odG1sJyk7XHRcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0eGhyLm9ucmVhZHlzdGF0ZWNoYW5nZSA9IGZ1bmN0aW9uKCkge1xyXG5cdFx0XHQgICAgaWYgKHRoaXMucmVhZHlTdGF0ZSA9PSA0ICYmICh0aGlzLnN0YXR1cyA+PSA0MDAgJiYgdGhpcy5zdGF0dXMgPD0gNTAwKSkge1xyXG5cdFx0XHQgICAgXHRyZWplY3QodGhpcy5yZXNwb25zZVRleHQpO1xyXG5cdFx0XHQgICAgfVxyXG5cdFx0XHQgICBcclxuXHRcdFx0ICAgIGlmICh0aGlzLnJlYWR5U3RhdGUgPT0gNCAmJiB0aGlzLnN0YXR1cyA9PSAyMDApIHtcclxuXHRcdFx0XHQgICAgbGV0IHJlc3BvbnNlID0gdGhpcy5yZXNwb25zZSB8fCB0aGlzLnJlc3BvbnNlVGV4dDtcclxuXHRcdFx0XHQgICAgcmVzcG9uc2UgPSAoeGhyLnJlc3BvbnNlVHlwZSA9PSAnanNvbicgJiYgdHlwZW9mIHJlc3BvbnNlICE9ICdvYmplY3QnKSA/IEpTT04ucGFyc2UocmVzcG9uc2UpIDogcmVzcG9uc2U7XHJcblx0XHRcdFx0ICAgIHJlc29sdmUocmVzcG9uc2UpO1xyXG5cdCAgICAgICBcdFx0XHRcclxuXHQgICAgICAgXHRcdFx0aWYgKG9wdGlvbnMuaGFzT3duUHJvcGVydHkoJ2FmdGVyJykgJiYgdHlwZW9mIG9wdGlvbnMuYWZ0ZXIgPT0gJ2Z1bmN0aW9uJykge1xyXG5cdFx0XHRcdFx0XHRvcHRpb25zLmFmdGVyLmNhbGwodGhpcyk7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9O1xyXG5cclxuXHRcdFx0eGhyLm9uYWJvcnQgPSB4aHIub25lcnJvciA9IGZ1bmN0aW9uKG1lc3NhZ2UpIHtcclxuXHRcdFx0XHRpZiAob3B0aW9ucy5oYXNPd25Qcm9wZXJ0eSgnZXJyb3InKSAmJiB0eXBlb2Ygb3B0aW9ucy5lcnJvciA9PSAnZnVuY3Rpb24nKSB7XHJcblx0XHRcdFx0XHRvcHRpb25zLmVycm9yKG1lc3NhZ2UpO1xyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0cmVqZWN0KG1lc3NhZ2UpO1xyXG5cdFx0XHR9O1xyXG5cclxuXHRcdFx0aWYgKCEgb3B0aW9ucy5kYXRhKSB7XHJcblx0XHRcdFx0eGhyLnNlbmQobnVsbCk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHZhciBxdWVyeVN0cmluZyA9IE9iamVjdC5rZXlzKG9wdGlvbnMuZGF0YSkubWFwKGZ1bmN0aW9uKGtleSkge1xyXG5cdFx0ICAgICAgICAgICAgcmV0dXJuIGVuY29kZVVSSUNvbXBvbmVudChrZXkpICsgJz0nICtcclxuXHRcdCAgICAgICAgICAgICAgICBcdGVuY29kZVVSSUNvbXBvbmVudChvcHRpb25zLmRhdGFba2V5XSk7XHJcblx0XHQgICAgICAgIFx0fSkuam9pbignJicpO1xyXG5cclxuXHRcdFx0eGhyLnNlbmQocXVlcnlTdHJpbmcpO1xyXG5cdFx0fSk7XHJcblx0fVxyXG59XG5cbmxldCBkZWZhdWx0TWVzc2FnZSQyID0gJ1RoZSBldmVudCB5b3UgY2FsbGVkIGRvZXMgbm90IGV4aXN0cyBvciB5b3Ugc3VwcGxpZWQgd3JvbmcgYXJndW1lbnQnO1xyXG5cclxuY2xhc3MgQmFkRXZlbnRDYWxsRXhjZXB0aW9uIGV4dGVuZHMgRXhjZXB0aW9uSGFuZGxlclxyXG57XHJcblx0Y29uc3RydWN0b3IobWVzc2FnZSA9IG51bGwpIFxyXG5cdHtcclxuXHRcdG1lc3NhZ2UgPSBtZXNzYWdlIHx8IGRlZmF1bHRNZXNzYWdlJDI7XHJcblx0XHRzdXBlcihtZXNzYWdlKTtcclxuICAgIFx0c3VwZXIuc3RhY2tUcmFjZSh0aGlzLCBtZXNzYWdlKTtcclxuICAgIH1cclxufVxuXG4vKipcclxuICogQGZpbGUgXHJcbiAqIEV2ZW50TWFuYWdlciBjbGFzcy5cclxuICpcclxuICogSGFuZGxlcyBzdWJzY3JpcGlvbnMgYW5kIHB1Ymxpc2hpbmcgb2YgZXZlbnRzLlxyXG4gKi9cclxuXHJcbmNsYXNzIEV2ZW50TWFuYWdlclxyXG57XHJcblx0LyoqXHJcblx0ICogU3RvcmVzIHRoZSBldmVudHMgY2FsbGJhY2tzLlxyXG5cdCAqIFxyXG5cdCAqIEB2YXIgYXJyYXlcclxuXHQgKi9cclxuXHRjb25zdHJ1Y3RvcigpXHJcblx0e1xyXG5cdFx0dGhpcy5ldmVudHMgPSB7fTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFN1YnNjcmliaW5nIHRvIGFuIGV2ZW50LlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIHN0cmluZyB8IG5hbWVcclxuXHQgKiBAcGFyYW0gZnVuY3Rpb24gfCBjYWxsYmFja1xyXG5cdCAqIEByZXR1cm4gdm9pZFxyXG5cdCAqL1xyXG5cdHN1YnNjcmliZShuYW1lLCBjYWxsYmFjaykgXHJcblx0e1xyXG5cdFx0aWYgKHR5cGVvZiBjYWxsYmFjayAhPT0gJ2Z1bmN0aW9uJykge1xyXG5cdFx0XHR0aHJvdyBuZXcgSW52YWxpZEFyZ3VtZW50RXhjZXB0aW9uO1xyXG5cdFx0fVxyXG5cclxuXHRcdGlmICh0eXBlb2YgdGhpcy5ldmVudHNbbmFtZV0gPT0gJ3VuZGVmaW5lZCcpIHtcclxuXHRcdFx0dGhpcy5ldmVudHNbbmFtZV0gPSBbXTtcclxuXHRcdH1cclxuXHJcblx0XHR0aGlzLmV2ZW50c1tuYW1lXS5wdXNoKGNhbGxiYWNrKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFB1Ymxpc2ggYW4gZXZlbnQgdG8gYWxsIHN1YnNjcmliZXJzLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIHN0cmluZyB8IG5hbWVcclxuXHQgKiBAcGFyYW0gbGlzdCB8IGRhdGFcclxuXHQgKiBAcmV0dXJuIHZvaWRcclxuXHQgKi9cclxuXHRwdWJsaXNoKG5hbWUsIC4uLmRhdGEpIFxyXG5cdHtcclxuXHRcdGRhdGEgPSBkYXRhIHx8IG51bGw7XHJcblxyXG5cdFx0Ly8gSWYgdGhlcmUgYXJlIG5vIHN1YnNjcmliZXJzIHNpbXBseSBpZ25vcmUgdGhhdCBldmVudC5cclxuXHRcdGlmICh0eXBlb2YgdGhpcy5ldmVudHNbbmFtZV0gPT0gJ3VuZGVmaW5lZCcpIHtcclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0fVxyXG5cclxuXHRcdHRoaXMuZXZlbnRzW25hbWVdLmZvckVhY2goZnVuY3Rpb24oY2FsbGJhY2spIHtcclxuXHRcdFx0aWYodHlwZW9mIGNhbGxiYWNrICE9ICdmdW5jdGlvbicpIHtcclxuXHRcdFx0XHR0aHJvdyBuZXcgSW52YWxpZEFyZ3VtZW50RXhjZXB0aW9uKCdzdWJzY3JpYmUoKSBzaG91bGQgcmVjaWV2ZSBjYWxsYmFjayBhcyBzZWNvbmQgcGFyYW1ldGVyLCBidXQgJysgdHlwZW9mIGNhbGxiYWNrICsnIHdhcyBwYXNzZWQnKTtcclxuXHRcdFx0fVxyXG5cdFx0XHRcclxuXHRcdFx0cmV0dXJuIGNhbGxiYWNrKC4uLmRhdGEpO1xyXG5cdFx0fSk7XHJcblx0fVxyXG59XG5cbi8qKlxyXG4gKiBAZmlsZSBcclxuICogQ29va2llIGNsYXNzLlxyXG4gKlxyXG4gKiBBZGRzIHNvbWUgdXNlZnVsIGZ1bmN0aW9uYWxpdHkgZm9yXHJcbiAqIHNldHRpbmcgb3IgZ2V0dGluZyBjb29raWVzLlxyXG4gKi9cclxuXHRcclxuY2xhc3MgQ29va2llXHJcbntcclxuXHQvKipcclxuIFx0KiBTZXRzIGEgY29va2llLlxyXG4gXHQqIFxyXG4gXHQqIEBwYXJhbSBzdHJpbmcgfCBuYW1lXHJcbiBcdCogQHBhcmFtIEpTT04gfCB2YWx1ZVxyXG4gXHQqIEBwYXJhbSBpbnRlZ2VyIHwgZGF5c1xyXG4gXHQqIEByZXR1cm4gdm9pZFxyXG5cdCovXHJcblx0c3RhdGljIHNldChuYW1lLCB2YWx1ZSwgZGF5cykgXHJcblx0e1xyXG5cdFx0aWYgKHZhbHVlLmNvbnN0cnVjdG9yLm5hbWUgID09ICdPYmplY3QnIHx8IHZhbHVlLmNvbnN0cnVjdG9yLm5hbWUgPT0gJ0FycmF5Jykge1xyXG5cdFx0XHR2YWx1ZSA9IEpTT04uc3RyaW5naWZ5KHZhbHVlKTtcclxuXHRcdH1cclxuXHJcblx0XHRkYXlzID0gZGF5cyB8fCAxMDtcclxuXHJcblx0ICAgIGxldCBleHBpcmVzO1xyXG5cdCAgICBcclxuXHQgICAgaWYgKGRheXMpIHtcclxuXHQgICAgICAgIGxldCBkYXRlID0gbmV3IERhdGUoKTtcclxuXHQgICAgICAgIGRhdGUuc2V0VGltZShkYXRlLmdldFRpbWUoKSArIChkYXlzICogMjQgKiA2MCAqIDYwICogMTAwMCkpO1xyXG5cdCAgICAgICAgZXhwaXJlcyA9IFwiOyBleHBpcmVzPVwiICsgZGF0ZS50b0dNVFN0cmluZygpO1xyXG5cdCAgICB9IGVsc2Uge1xyXG5cdCAgICAgICAgZXhwaXJlcyA9IFwiXCI7XHJcblx0ICAgIH1cclxuXHJcblx0ICAgIGRvY3VtZW50LmNvb2tpZSA9IG5hbWUgKyBcIj1cIiArIHZhbHVlICsgZXhwaXJlcyArIFwiOyBwYXRoPS9cIjtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFJldHJpZXZlcyB0aGUgY29va2llIGJ5IG5hbWUuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gc3RyaW5nIHwgbmFtZVxyXG4gXHQgKiBAcmV0dXJuIEpTT05cclxuXHQgKi9cclxuXHRzdGF0aWMgZ2V0KG5hbWUpIFxyXG5cdHtcclxuXHQgICAgaWYgKGRvY3VtZW50LmNvb2tpZS5sZW5ndGggPiAwKSB7XHJcblx0ICAgICAgICBsZXQgY19zdGFydCA9IGRvY3VtZW50LmNvb2tpZS5pbmRleE9mKG5hbWUgKyBcIj1cIik7XHJcblx0ICAgICAgICBcclxuXHQgICAgICAgIGlmIChjX3N0YXJ0ICE9IC0xKSB7XHJcblx0ICAgICAgICAgICAgY19zdGFydCA9IGNfc3RhcnQgKyBuYW1lLmxlbmd0aCArIDE7XHJcblx0ICAgICAgICAgICAgbGV0IGNfZW5kID0gZG9jdW1lbnQuY29va2llLmluZGV4T2YoXCI7XCIsIGNfc3RhcnQpO1xyXG5cdCAgICAgICAgICAgIFxyXG5cdCAgICAgICAgICAgIGlmIChjX2VuZCA9PSAtMSkge1xyXG5cdCAgICAgICAgICAgICAgICBjX2VuZCA9IGRvY3VtZW50LmNvb2tpZS5sZW5ndGg7XHJcblx0ICAgICAgICAgICAgfVxyXG5cclxuXHQgICAgICAgICAgICByZXR1cm4gSlNPTi5wYXJzZSh1bmVzY2FwZShkb2N1bWVudC5jb29raWUuc3Vic3RyaW5nKGNfc3RhcnQsIGNfZW5kKSkpO1xyXG5cdCAgICAgICAgfVxyXG5cdCAgICB9XHJcblxyXG5cdCAgICByZXR1cm4ge307XHJcblx0fVxyXG59XG5cbmxldCBkZWZhdWx0TWVzc2FnZSQzID0gJ1RoZSBpdGVtIHlvdSBhcmUgdHJ5aW5nIHRvIGFkZCBtdXN0IGNvbnRhaW4gYSB1bmlxdWUgaWQnO1xyXG5cclxuY2xhc3MgSW52YWxpZENhcnRJdGVtRXhjZXB0aW9uIGV4dGVuZHMgRXhjZXB0aW9uSGFuZGxlclxyXG57XHJcblx0Y29uc3RydWN0b3IobWVzc2FnZSA9IG51bGwpIFxyXG5cdHtcclxuXHRcdG1lc3NhZ2UgPSBtZXNzYWdlIHx8IGRlZmF1bHRNZXNzYWdlJDM7XHJcblx0XHRzdXBlcihtZXNzYWdlKTtcclxuICAgIFx0c3VwZXIuc3RhY2tUcmFjZSh0aGlzLCBtZXNzYWdlKTtcclxuICAgIH1cclxufVxuXG4vLyBIZWxwZXJzXHJcbi8vIEV4Y2VwdGlvbnNcclxuLyoqXHJcbiAqIEBmaWxlIFxyXG4gKiBDYXJ0IGNsYXNzLlxyXG4gKlxyXG4gKiBIYW5kbGVzIGFkZGluZywgcmVtb3ZpbmcgZXRjLi4uIG9mIGl0ZW1zLlxyXG4gKi9cclxuXHJcbi8qKlxyXG4gKiBUaGUgZGVmYXVsdCBzZXR0aW5ncyBvZiB0aGUgY2FydC5cclxuICpcclxuICogQHZhciBvYmplY3RcclxuICovXHJcbmxldCBkZWZhdWx0U2V0dGluZ3MkMSA9IHtcclxuXHRlbGVtZW50OiAnLmNhcnQnLFxyXG5cdGNvb2tpZV9uYW1lOiAnY2FydCcsXHJcblx0cHJldmlld19jbGFzczogJycsXHJcblx0bG9hZGVyOiAnJyxcclxuXHRjbGFzczogJycsXHJcblx0d2lkdGg6ICc2MHB4JyxcclxuXHRoZWlnaHQ6ICc2MHB4JyxcclxuXHRwbGFjZW1lbnQ6ICdyaWdodC10b3AnLFxyXG5cdGZpeGVkOiB0cnVlLFxyXG5cdGhvdmVyX2NvbG9yOiAnb3JhbmdlJyxcclxuXHRub19jc3M6IGZhbHNlLFxyXG59O1xyXG5cclxuLyoqXHJcbiAqIFN0b3JlcyB0aGUgY29udGFpbmVyIG9iamVjdC5cclxuICpcclxuICogQHZhciBcXENvcmVcXENvbnRhaW5lclxyXG4gKi9cclxubGV0IENvbnRhaW5lcjtcclxuXHJcbi8qKlxyXG4gKiBTdG9yZXMgdGhlIGV2ZW50IG1hbmFnZXIgb2JqZWN0LlxyXG4gKlxyXG4gKiBAdmFyIFxcQ29yZVxcRXZlbnRNYW5hZ2VyXHJcbiAqL1xyXG5sZXQgRXZlbnRNYW5hZ2VyJDI7XHJcblxyXG4vKipcclxuICogU3RvcmVzIHRoZSByZXF1ZXN0IG9iamVjdC5cclxuICpcclxuICogQHZhciBcXEhlbHBlcnNcXFJlcXVlc3RcclxuICovXHJcbmxldCBIdHRwO1xyXG5cclxuLyoqXHJcbiAqIFN0b3JlcyB0aGUgY2FydCBsb2FkZXIuXHJcbiAqXHJcbiAqIEB2YXIgSFRNTERpdkVsZW1lbnRcclxuICovXHJcbmxldCBsb2FkaW5nT3ZlcmxheTtcclxuXHJcbi8qKlxyXG4gKiBTdG9yZXMgdGhlIGl0ZW1zIHdyYXBwZXIuXHJcbiAqXHJcbiAqIEB2YXIgSFRNTERpdkVsZW1lbnRcclxuICovXHJcbmxldCBpdGVtc0RpdjtcclxuXHJcbmNsYXNzIENhcnQgXHJcbntcclxuXHQvKipcclxuXHQgKiAtIEluaXRpYWxpemUgdGhlIElvQyBjb250YWluZXJcclxuXHQgKiAtIEluaXRpYWxpemUgdGhlIFJlcXVlc3RcclxuXHQgKiAtIEluaXRpYWxpemUgdGhlIEV2ZW50TWFuYWdlclxyXG5cdCAqIC0gQ3JlYXRlcyB0aGUgcHJldmlldyBhbmQgdGhlIGljb24gb2YgdGhlIGNhcnQuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gXFxDb3JlXFxDb250YWluZXIgfCBjb250YWluZXJcclxuXHQgKiBAcGFyYW0gXFxIZWxwZXJzXFxSZXF1ZXN0IHwgaHR0cFxyXG5cdCAqIEBwYXJhbSBcXENvcmVcXEV2ZW50TWFuYWdlciB8IGV2ZW50TWFuYWdlclxyXG5cdCAqIEByZXR1cm4gdm9pZFxyXG5cdCAqL1xyXG5cdGNvbnN0cnVjdG9yKGNvbnRhaW5lciwgaHR0cCwgZXZlbnRNYW5hZ2VyKSBcclxuXHR7XHJcblx0XHRDb250YWluZXIgPSBjb250YWluZXI7XHJcblx0XHRIdHRwID0gaHR0cDtcclxuXHRcdEV2ZW50TWFuYWdlciQyID0gZXZlbnRNYW5hZ2VyO1xyXG5cdFx0XHJcblx0XHR0aGlzLnByZXZpZXdFbGVtZW50ID0gdGhpcy5jcmVhdGVQcmV2aWV3RWxlbWVudCgpO1xyXG5cdFx0dGhpcy5pY29uID0gY3JlYXRlSWNvbi5jYWxsKHRoaXMpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogU2V0cyB0aGUgb2JqZWN0IGJ5IHRoZSB1c2VycyBzZXR0aW5nLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIG9iamVjdCB8IHNldHRpbmdzXHJcblx0ICogQHJldHVybiB2b2lkXHJcblx0ICovXHJcblx0c2V0dXAoc2V0dGluZ3MpXHJcblx0e1xyXG5cdFx0aWYgKHR5cGVvZiBzZXR0aW5ncyAhPSAnb2JqZWN0Jykge1xyXG5cdFx0XHR0aHJvdyBuZXcgSW52YWxpZEFyZ3VtZW50RXhjZXB0aW9uJDE7XHJcblx0XHR9XHJcblxyXG5cdFx0dGhpcy5zZXR0aW5ncyA9IENvbW1vbi5leHRlbmQoZGVmYXVsdFNldHRpbmdzJDEsIHNldHRpbmdzKTtcclxuXHJcblx0XHR0aGlzLnNldEVsZW1lbnQodGhpcy5zZXR0aW5ncy5lbGVtZW50KTtcclxuXHJcblx0XHRET00uYWRkQ2xhc3ModGhpcy5wcmV2aWV3RWxlbWVudCwgJ2Nsb3NlZCcpO1xyXG5cdFx0RE9NLmFkZENsYXNzKHRoaXMucHJldmlld0VsZW1lbnQsIHRoaXMuc2V0dGluZ3MucHJldmlld19jbGFzcyk7XHJcblx0XHRcclxuXHRcdHRoaXMuYWRkU3R5bGVUYWcoKTtcclxuXHRcdHRoaXMuYmluZEV2ZW50TGlzdGVuZXJzKCk7XHJcblx0XHRcclxuXHRcdGlmICh0aGlzLmlzRW1wdHkoQ29va2llLmdldCh0aGlzLnNldHRpbmdzLmNvb2tpZV9uYW1lKSkpIHtcclxuXHRcdFx0dGhpcy5zZXR1cENhcnQoKTtcclxuXHRcdFx0XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBDaGVja3MgaWYgdGhlIGNhcnQgaXMgZW1wdHlcclxuXHQgKlxyXG5cdCAqIEBwYXJhbSBvYmplY3QgfCBjYXJ0XHJcblx0ICogQHJldHVybiBib29sXHJcblx0ICovXHJcblx0aXNFbXB0eShjYXJ0KVxyXG5cdHtcclxuXHRcdHJldHVybiBDb21tb24uZW1wdHlPYmplY3QoY2FydCk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBJbml0aWFsaXplL1NldHMgdGhlIGNhcnQgYXMgYSBjb29raWUuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gb2JqZWN0IHwgY2FydFxyXG5cdCAqIEByZXR1cm4gdm9pZFxyXG5cdCAqL1xyXG5cdHNldHVwQ2FydCgpXHJcblx0e1xyXG5cdFx0dGhpcy5jYXJ0ID0ge307XHJcblx0XHR0aGlzLmNhcnQuaWQgPSBTdHIucmFuZG9tKDEwKTtcclxuXHRcdHRoaXMuY2FydC5pdGVtcyA9IFtdO1xyXG5cdFx0dGhpcy5jYXJ0LmZhdm9yaXRlcyA9IFtdO1xyXG5cdFx0Q29va2llLnNldCh0aGlzLnNldHRpbmdzLmNvb2tpZV9uYW1lLCB0aGlzLmNhcnQsIDIpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQWRkcyBhbiBpdGVtIHRvIHRoZSBjYXJ0LlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIG9iamVjdCB8IGl0ZW1cclxuXHQgKiBAcmV0dXJuIHZvaWRcclxuXHQgKi9cclxuXHRhZGRJdGVtKGl0ZW0pXHJcblx0e1xyXG5cdFx0aWYgKHR5cGVvZiBpdGVtICE9ICdvYmplY3QnKSB7XHJcblx0XHRcdHRocm93IG5ldyBJbnZhbGlkQXJndW1lbnRFeGNlcHRpb24kMSgnYWRkSXRlbSgpIGV4cGVjdCB0aGUgZmlyc3QgcGFyYW1ldGVyIHRvIGJlIGFuIG9iamVjdCwgYnV0ICcgKyB0eXBlb2YgaXRlbSArICcgd2FzIHBhc3NlZCBpbnN0ZWFkJyk7XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKCEgaXRlbS5oYXNPd25Qcm9wZXJ0eSgnaWQnKSkge1xyXG5cdFx0XHR0aHJvdyBuZXcgSW52YWxpZENhcnRJdGVtRXhjZXB0aW9uO1xyXG5cdFx0fVxyXG5cclxuXHRcdHRoaXMuY2FydCA9IENvb2tpZS5nZXQodGhpcy5zZXR0aW5ncy5jb29raWVfbmFtZSk7XHJcblxyXG5cdFx0aWYgKCFpdGVtLmhhc093blByb3BlcnR5KCdxdWFudGl0eScpKSB7XHJcblx0XHRcdGl0ZW0ucXVhbnRpdHkgPSAxO1xyXG5cdFx0fVxyXG5cclxuXHRcdGxldCBpO1xyXG5cdFx0bGV0IGluY3JlbWVudGVkID0gZmFsc2U7XHJcblxyXG5cdFx0Zm9yIChpID0gMDsgaSA8IHRoaXMuY2FydC5pdGVtcy5sZW5ndGg7IGkrKykge1xyXG5cdFx0XHRpZiAodGhpcy5jYXJ0Lml0ZW1zW2ldLmlkID09IGl0ZW0uaWQpIHtcclxuXHRcdFx0XHR0aGlzLmNhcnQuaXRlbXNbaV0ucXVhbnRpdHkrKztcclxuXHRcdFx0XHRpbmNyZW1lbnRlZCA9IHRydWU7XHJcblx0XHRcdFx0YnJlYWs7XHRcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdGlmICghIGluY3JlbWVudGVkKSB7XHJcblx0XHRcdHRoaXMuY2FydC5pdGVtcy5wdXNoKGl0ZW0pO1xyXG5cdFx0fVxyXG5cclxuXHRcdENvb2tpZS5zZXQodGhpcy5zZXR0aW5ncy5jb29raWVfbmFtZSwgdGhpcy5jYXJ0LCAyKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEFkZHMgYW4gaXRlbSB0byB0aGUgZmF2b3JpdGVzIGxpc3QuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gb2JqZWN0IHwgaXRlbVxyXG5cdCAqIEByZXR1cm4gdm9pZFxyXG5cdCAqL1xyXG5cdGZhdm9yaXRlSXRlbShpdGVtKVxyXG5cdHtcclxuXHRcdGlmICh0eXBlb2YgaXRlbSAhPSAnb2JqZWN0Jykge1xyXG5cdFx0XHR0aHJvdyBuZXcgSW52YWxpZEFyZ3VtZW50RXhjZXB0aW9uJDEoJ2Zhdm9yaXRlSXRlbSgpIGV4cGVjdCB0aGUgZmlyc3QgcGFyYW1ldGVyIHRvIGJlIGFuIG9iamVjdCwgYnV0ICcgKyB0eXBlb2YgaXRlbSArICcgd2FzIHBhc3NlZCBpbnN0ZWFkJyk7XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKCEgaXRlbS5oYXNPd25Qcm9wZXJ0eSgnaWQnKSkge1xyXG5cdFx0XHR0aHJvdyBuZXcgSW52YWxpZENhcnRJdGVtRXhjZXB0aW9uO1xyXG5cdFx0fVxyXG5cclxuXHRcdHRoaXMuY2FydCA9IENvb2tpZS5nZXQodGhpcy5zZXR0aW5ncy5jb29raWVfbmFtZSk7XHJcblxyXG5cdFx0bGV0IGk7XHJcblx0XHRsZXQgYWxyZWFkeUZhdm9yaXRlZCA9IGZhbHNlO1xyXG5cclxuXHRcdGZvciAoaSA9IDA7IGkgPCB0aGlzLmNhcnQuZmF2b3JpdGVzLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdGlmICh0aGlzLmNhcnQuZmF2b3JpdGVzW2ldLmlkID09IGl0ZW0uaWQpIHtcclxuXHRcdFx0XHRhbHJlYWR5RmF2b3JpdGVkID0gdHJ1ZTtcclxuXHRcdFx0XHRicmVhaztcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdGlmICghIGFscmVhZHlGYXZvcml0ZWQpIHtcclxuXHRcdFx0dGhpcy5jYXJ0LmZhdm9yaXRlcy5wdXNoKGl0ZW0pO1xyXG5cdFx0fVxyXG5cclxuXHRcdENvb2tpZS5zZXQodGhpcy5zZXR0aW5ncy5jb29raWVfbmFtZSwgdGhpcy5jYXJ0LCAyKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFJlbW92ZXMgYW4gaXRlbSBmcm9tIHRoZSBjYXJ0LlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIG9iamVjdCB8IGl0ZW1cclxuXHQgKiBAcmV0dXJuIHZvaWRcclxuXHQgKi9cclxuXHRyZW1vdmVJdGVtKGl0ZW0pXHJcblx0e1xyXG5cdFx0aWYgKHR5cGVvZiBpdGVtICE9ICdvYmplY3QnKSB7XHJcblx0XHRcdHRocm93IG5ldyBJbnZhbGlkQXJndW1lbnRFeGNlcHRpb24kMSgncmVtb3ZlSXRlbSgpIGV4cGVjdCB0aGUgZmlyc3QgcGFyYW1ldGVyIHRvIGJlIGFuIG9iamVjdCwgYnV0ICcgKyB0eXBlb2YgaXRlbSArICcgd2FzIHBhc3NlZCBpbnN0ZWFkJyk7XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKCEgaXRlbS5oYXNPd25Qcm9wZXJ0eSgnaWQnKSkge1xyXG5cdFx0XHR0aHJvdyBuZXcgSW52YWxpZENhcnRJdGVtRXhjZXB0aW9uO1xyXG5cdFx0fVxyXG5cclxuIFx0XHR0aGlzLmNhcnQgPSBDb29raWUuZ2V0KHRoaXMuc2V0dGluZ3MuY29va2llX25hbWUpO1xyXG5cclxuIFx0XHRsZXQgaTtcclxuXHJcbiBcdFx0Zm9yIChpID0gMDsgaSA8IHRoaXMuY2FydC5pdGVtcy5sZW5ndGg7IGkrKykge1xyXG4gXHRcdFx0aWYgKHRoaXMuY2FydC5pdGVtc1tpXS5pZCA9PSBpdGVtLmlkKSB7XHJcbiBcdFx0XHRcdHRoaXMuY2FydC5pdGVtcy5zcGxpY2UoaSwgMSk7XHJcbiBcdFx0XHRcdGJyZWFrO1xyXG4gXHRcdFx0fVxyXG4gXHRcdH1cclxuXHJcbiBcdFx0Q29va2llLnNldCh0aGlzLnNldHRpbmdzLmNvb2tpZV9uYW1lLCB0aGlzLmNhcnQsIDIpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQWRkcyB0aGUgaXRlbSB0byBwcmV2aWV3LlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIGFycmF5IHwgaXRlbXNcclxuXHQgKiBAcmV0dXJuIHZvaWRcclxuXHQgKi9cclxuXHRhZGRUb1ByZXZpZXcoaXRlbXMpXHJcblx0e1xyXG5cdFx0aXRlbXNEaXYuaW5uZXJIVE1MID0gJyc7XHJcblxyXG5cdFx0bGV0IHRhYmxlID0gRE9NLmNyZWF0ZUVsZW1lbnQoJ3RhYmxlJyk7XHJcblxyXG5cdFx0RE9NLmFkZENsYXNzKHRhYmxlLCAncHJldmlldy10YWJsZScpO1xyXG5cclxuXHRcdGZvciAobGV0IGkgPSAwOyBpIDwgaXRlbXMubGVuZ3RoOyBpKyspIHtcclxuXHJcblx0XHRcdGxldCBhdHRyaWJ1dGVzID0gaXRlbXNbaV07XHJcblxyXG5cdFx0XHRsZXQgdHIgPSBET00uY3JlYXRlRWxlbWVudCgndHInLCB7XHJcblx0XHRcdFx0Y2xhc3M6ICdpdGVtJ1xyXG5cdFx0XHR9KTtcclxuXHJcblx0XHRcdC8vIFF1YW50aXR5IGFsd2F5cyBhdCB0aGUgc3RhcnQgb2YgYW4gaXRlbS5cclxuXHRcdFx0bGV0IHRkID0gRE9NLmNyZWF0ZUVsZW1lbnQoJ3RkJyk7XHJcblxyXG5cdFx0XHR0ZC5pbm5lckhUTUwgPSBhdHRyaWJ1dGVzLnF1YW50aXR5ICsneCc7XHJcblx0XHRcdHRyLmFwcGVuZENoaWxkKHRkKTtcclxuXHRcdFx0XHJcblx0XHRcdGZvcihsZXQgYXR0cmlidXRlIGluIGF0dHJpYnV0ZXMpIHtcclxuXHRcdFx0XHRzd2l0Y2goYXR0cmlidXRlKVxyXG5cdFx0XHRcdHtcclxuXHRcdFx0XHRcdGNhc2UgJ2ltYWdlJzpcclxuXHRcdFx0XHRcdFx0dGQgPSBET00uY3JlYXRlRWxlbWVudCgndGQnKTtcclxuXHRcdFx0XHRcdFx0bGV0IGltYWdlID0gRE9NLmNyZWF0ZUVsZW1lbnQoJ2ltZycsIHtcclxuXHRcdFx0XHRcdFx0XHRzcmM6IGF0dHJpYnV0ZXNbYXR0cmlidXRlXSxcclxuXHRcdFx0XHRcdFx0XHR3aWR0aDogJzUwcHgnLFxyXG5cdFx0XHRcdFx0XHRcdGhlaWdodDogJzUwcHgnXHJcblx0XHRcdFx0XHRcdH0pO1xyXG5cclxuXHRcdFx0XHRcdFx0dGQuYXBwZW5kQ2hpbGQoaW1hZ2UpO1xyXG5cdFx0XHRcdFx0XHRicmVhaztcclxuXHRcdFx0XHRcdGNhc2UgJ25hbWUnOlxyXG5cdFx0XHRcdFx0Y2FzZSAncHJpY2UnOlxyXG5cdFx0XHRcdFx0XHR0ZCA9IERPTS5jcmVhdGVFbGVtZW50KCd0ZCcpO1xyXG5cdFx0XHRcdFx0XHR0ZC5pbm5lckhUTUwgPSBhdHRyaWJ1dGVzW2F0dHJpYnV0ZV07XHJcblx0XHRcdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHJcblx0XHRcdFx0dHIuYXBwZW5kQ2hpbGQodGQpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHR0YWJsZS5hcHBlbmRDaGlsZCh0cik7XHJcblx0XHR9XHJcblxyXG5cdFx0Ly8gY3JlYXRlIGNoZWNrb3V0IGJ1dHRvbiBhdCB0aGUgYnV0dG9tXHJcblx0XHRsZXQgdHIgPSBET00uY3JlYXRlRWxlbWVudCgndHInKTtcclxuXHRcdGxldCB0ZCA9IERPTS5jcmVhdGVFbGVtZW50KCd0ZCcsIHtcclxuXHRcdFx0Y29sc3BhbjogJzQnLFxyXG5cdFx0fSk7XHJcblxyXG5cdFx0bGV0IGNoZWNrb3V0ID0gRE9NLmNyZWF0ZUVsZW1lbnQoJ2EnLCB7XHJcblx0XHRcdGNsYXNzOiAnYnRuIGJ0bi1wcmltYXJ5JyxcclxuXHRcdFx0dGV4dDogJ0NoZWNrb3V0J1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0Y2hlY2tvdXQub25jbGljayA9IGZ1bmN0aW9uKGUpIHtcclxuXHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdFx0XHRFdmVudE1hbmFnZXIkMi5wdWJsaXNoKCdjYXJ0LmNoZWNrb3V0Jyk7XHJcblx0XHR9LmJpbmQodGhpcyk7XHJcblxyXG5cdFx0dGQuYXBwZW5kQ2hpbGQoIGNoZWNrb3V0KTtcclxuXHRcdHRyLmFwcGVuZENoaWxkKHRkKTtcclxuXHJcblx0XHR0YWJsZS5hcHBlbmRDaGlsZCh0cik7XHJcblxyXG5cdFx0aXRlbXNEaXYuYXBwZW5kQ2hpbGQodGFibGUpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQmluZHMgZXZlcnRoaW5nIHRvIHRoZSBlbGVtZW50LlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIHN0cmluZyB8IHNlbGVjdG9yXHJcblx0ICogQHJldHVybiB2b2lkXHJcblx0ICovXHJcblx0c2V0RWxlbWVudChzZWxlY3RvcilcclxuXHR7XHJcblx0XHR0aGlzLmVsZW1lbnQgPSBET00uZmluZChzZWxlY3Rvcik7XHJcblxyXG5cdFx0aWYgKHRoaXMuZWxlbWVudCkge1xyXG5cdFx0XHRET00uYWRkQ2xhc3ModGhpcy5lbGVtZW50LCB0aGlzLnNldHRpbmdzLmNsYXNzKTtcclxuXHRcdFx0RE9NLmFkZENsYXNzKHRoaXMuZWxlbWVudCwgdGhpcy5zZXR0aW5ncy5wbGFjZW1lbnQpO1xyXG5cdFx0XHR0aGlzLmVsZW1lbnQuYXBwZW5kQ2hpbGQodGhpcy5pY29uKTtcclxuXHRcdFx0dGhpcy5lbGVtZW50LmFwcGVuZENoaWxkKHRoaXMucHJldmlld0VsZW1lbnQpO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQ3JlYXRlcyB0aGUgY2FydCBkZXRhaWxzIHByZXZpZXcgZWxlbWVudC5cclxuXHQgKlxyXG5cdCAqIEByZXR1cm4gSFRNTERpdkVsZW1lbnRcclxuXHQgKi9cclxuXHRjcmVhdGVQcmV2aWV3RWxlbWVudCgpXHJcblx0e1xyXG5cdFx0bGV0IHByZXZpZXdFbGVtZW50ID0gRE9NLmNyZWF0ZUVsZW1lbnQoJ2RpdicsIHtcclxuXHRcdFx0aWQ6ICdwcmV2aWV3J1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0aXRlbXNEaXYgPSBET00uY3JlYXRlRWxlbWVudCgndWwnLCB7XHJcblx0XHRcdFx0Y2xhc3M6ICdpdGVtcydcclxuXHRcdFx0fSk7XHJcblxyXG5cdFx0cHJldmlld0VsZW1lbnQuYXBwZW5kQ2hpbGQoaXRlbXNEaXYpO1xyXG5cclxuXHRcdHJldHVybiBwcmV2aWV3RWxlbWVudDtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEFkZCB0aGUgZUNvbW1lcmNlIHN0eWxlIHRhZ3MgdG8gdGhlIERPTS5cclxuXHQgKlxyXG5cdCAqIEByZXR1cm4gdm9pZFxyXG5cdCAqL1xyXG5cdGFkZFN0eWxlVGFnKCkgXHJcblx0e1xyXG5cdFx0aWYgKERPTS5maW5kKCcjVHVyYm8tZUNvbW1lcmNlLUNhcnQnKSkge1xyXG5cdFx0XHRyZXR1cm47XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKHRoaXMuc2V0dGluZ3Mubm9fY3NzKSB7XHJcblx0XHRcdHJldHVybjtcclxuXHRcdH1cclxuXHJcblx0XHRsZXQgcG9zaXRpb24gPSAodGhpcy5zZXR0aW5ncy5maXhlZCkgPyAnZml4ZWQnIDogJ2Fic29sdXRlJztcclxuXHJcblx0XHRsZXQgY3NzID0gYFxyXG5cdFx0XHQke3RoaXMuc2V0dGluZ3MuZWxlbWVudH0ge1xyXG5cdFx0XHRcdHBvc2l0aW9uOiAke3Bvc2l0aW9ufTtcclxuXHRcdFx0XHRjdXJzb3I6IHBvaW50ZXI7XHJcblx0XHRcdFx0Y29sb3I6ICNmZmZmZmY7XHJcblx0XHRcdFx0ei1pbmRleDogOTk4O1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHQke3RoaXMuc2V0dGluZ3MuZWxlbWVudH0gc3ZnIHtcclxuXHRcdFx0XHR3aWR0aDogJHt0aGlzLnNldHRpbmdzLndpZHRofTtcclxuXHRcdFx0XHRoZWlnaHQ6ICR7dGhpcy5zZXR0aW5ncy5oZWlnaHR9O1xyXG5cdFx0XHRcdHRyYW5zaXRpb246IGZpbGwgMC4zcztcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0JHt0aGlzLnNldHRpbmdzLmVsZW1lbnR9IHN2Zzpob3ZlciB7XHJcblx0XHRcdFx0ZmlsbDogJHt0aGlzLnNldHRpbmdzLmhvdmVyX2NvbG9yfTtcclxuXHRcdFx0XHR0cmFuc2l0aW9uOiBmaWxsIDAuM3M7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdCR7dGhpcy5zZXR0aW5ncy5lbGVtZW50fS50b3AtcmlnaHQsXHJcblx0XHRcdCR7dGhpcy5zZXR0aW5ncy5lbGVtZW50fS5yaWdodC10b3Age1xyXG5cdFx0XHRcdHJpZ2h0OiAxMHB4O1xyXG5cdFx0XHRcdHRvcDogMTBweDtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0JHt0aGlzLnNldHRpbmdzLmVsZW1lbnR9LmxlZnQtdG9wLFxyXG5cdFx0XHQke3RoaXMuc2V0dGluZ3MuZWxlbWVudH0udG9wLWxlZnQge1xyXG5cdFx0XHRcdGxlZnQ6IDEwcHg7XHJcblx0XHRcdFx0dG9wOiAxMHB4O1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHQke3RoaXMuc2V0dGluZ3MuZWxlbWVudH0gPiAjcHJldmlldyB7XHJcblx0XHRcdFx0cG9zaXRpb246ICR7cG9zaXRpb259O1xyXG5cdFx0XHRcdHotaW5kZXg6IDk5OTk7XHJcblx0XHRcdFx0dG9wOiBjYWxjKDEwcHggKyAke3RoaXMuc2V0dGluZ3MuaGVpZ2h0fSk7XHJcblx0XHRcdFx0dHJhbnNmb3JtOiB0cmFuc2xhdGVYKDYwcHgpO1xyXG5cdFx0XHRcdGhlaWdodDogNDAwcHg7XHJcblx0XHRcdFx0d2lkdGg6IDMwMHB4O1xyXG5cdFx0XHRcdGJvcmRlcjogMXB4IHNvbGlkICNlNGU0ZTQ7XHJcblx0XHRcdFx0YmFja2dyb3VuZDogI2ZmZmZmZjtcclxuXHRcdFx0XHR0cmFuc2l0aW9uOiB0cmFuc2Zvcm0gMXMsIHZpc2liaWxpdHkgMXM7XHJcblx0XHRcdFx0Y3Vyc29yOiBkZWZhdWx0O1xyXG5cdFx0XHRcdG92ZXJmbG93LVk6IHNjcm9sbDtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0JHt0aGlzLnNldHRpbmdzLmVsZW1lbnR9ID4gI3ByZXZpZXcub3BlbmVkIHtcclxuXHRcdFx0XHR2aXNpYmlsaXR5OiB2aXNpYmxlO1xyXG5cdFx0XHRcdHRyYW5zZm9ybTogdHJhbnNsYXRlWCgtMjQwcHgpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHQke3RoaXMuc2V0dGluZ3MuZWxlbWVudH0gPiAjcHJldmlldy5jbG9zZWQge1xyXG5cdFx0XHRcdHZpc2liaWxpdHk6IGhpZGRlbjtcclxuXHRcdFx0XHR0cmFuc2Zvcm06IHRyYW5zbGF0ZVgoNjBweCk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdCR7dGhpcy5zZXR0aW5ncy5lbGVtZW50fSAjcHJldmlldyA+IHVsLml0ZW1zIHtcclxuXHRcdFx0XHRwYWRkaW5nOiAwO1xyXG5cdFx0XHRcdGNvbG9yOiAjMDAwMDAwO1xyXG5cdFx0XHRcdGxpc3Qtc3R5bGUtdHlwZTogbm9uZTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0JHt0aGlzLnNldHRpbmdzLmVsZW1lbnR9ICNwcmV2aWV3ID4gdWwuaXRlbXMgPiAucHJldmlldy10YWJsZSB7XHJcblx0XHRcdFx0d2lkdGg6IDEwMCU7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdCR7dGhpcy5zZXR0aW5ncy5lbGVtZW50fSAjcHJldmlldyA+IHVsLml0ZW1zID4gLnByZXZpZXctdGFibGUgdGQge1xyXG5cdFx0XHRcdHBhZGRpbmc6IDRweDtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0JHt0aGlzLnNldHRpbmdzLmVsZW1lbnR9IC5pdGVtcy5sb2FkaW5nIHtcclxuXHRcdFx0XHRkaXNwbGF5OiBub25lO1xyXG5cdFx0XHRcdG92ZXJmbG93LVk6IG5vbmU7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdCR7dGhpcy5zZXR0aW5ncy5lbGVtZW50fSAuY2FydC1sb2FkZXItb3ZlcmxheSB7XHJcblx0XHRcdFx0cG9zaXRpb246IGZpeGVkO1xyXG5cdFx0XHRcdHRvcDogMDsgXHJcblx0XHRcdCAgICBsZWZ0OiAwO1xyXG5cdFx0XHQgICAgcmlnaHQ6IDA7XHJcblx0XHRcdCAgICBib3R0b206IDA7XHJcblx0XHRcdFx0YmFja2dyb3VuZDogI2ZmZmZmZjtcclxuXHRcdFx0XHR3aWR0aDogMTAwJTtcclxuXHRcdFx0XHRoZWlnaHQ6IDEwMCU7XHJcblx0XHRcdFx0bWluLWhlaWdodDogMTAwJTtcclxuXHRcdFx0XHRvdmVyZmxvdzogYXV0bztcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0JHt0aGlzLnNldHRpbmdzLmVsZW1lbnR9IC5jYXJ0LWxvYWRlci1vdmVybGF5IC5jYXJ0LWxvYWRlciB7XHJcblx0XHRcdFx0cG9zaXRpb246IGFic29sdXRlO1xyXG5cdFx0XHRcdHdpZHRoOiA1MHB4O1xyXG5cdFx0XHRcdGhlaWdodDogNTBweDtcclxuXHRcdFx0XHRtYXJnaW4tbGVmdDogLTI1cHg7XHJcblx0XHRcdFx0bWFyZ2luLXRvcDogLTI1cHg7XHJcblx0XHRcdFx0bGVmdDogNTAlO1xyXG5cdFx0XHRcdHJpZ2h0OiA1MCU7XHJcblx0XHRcdFx0dG9wOiA1MCU7XHJcblx0XHRcdFx0Ym90dG9tOiA1MCU7XHJcblx0XHRcdH1cclxuXHRcdGA7XHJcblx0ICAgIFxyXG5cdCAgICBET00uYWRkU3R5bGUoJ1R1cmJvLWVDb21tZXJjZS1DYXJ0JywgY3NzKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIENyZWF0ZXMgYW4gbG9hZGluZyBvdmVybGF5LlxyXG5cdCAqXHJcblx0ICogQHJldHVybiBIVE1MRGl2RWxlbWVudFxyXG5cdCAqL1xyXG5cdGxvYWRpbmdPdmVybGF5KClcclxuXHR7XHJcblx0XHRpZiAobG9hZGluZ092ZXJsYXkpIHtcclxuXHRcdFx0cmV0dXJuIGxvYWRpbmdPdmVybGF5O1xyXG5cdFx0fVxyXG5cclxuXHRcdGxldCBsb2FkZXI7XHJcblxyXG5cdFx0aWYgKHRoaXMuc2V0dGluZ3MubG9hZGVyKSB7XHJcblx0XHRcdGxvYWRlciA9IERPTS5jcmVhdGVFbGVtZW50KCdpbWcnLCB7XHJcblx0XHRcdFx0c3JjOiB0aGlzLnNldHRpbmdzLmxvYWRlcixcclxuXHRcdFx0XHRjbGFzczogJ2NhcnQtbG9hZGVyJ1xyXG5cdFx0XHR9KTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdGxvYWRlciA9IGNyZWF0ZUxvYWRlcigpO1xyXG5cdFx0fVxyXG5cclxuXHRcdGxvYWRpbmdPdmVybGF5ID0gRE9NLmNyZWF0ZUVsZW1lbnQoJ2RpdicsIHtcclxuXHRcdFx0Y2xhc3M6ICdjYXJ0LWxvYWRlci1vdmVybGF5J1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0bG9hZGluZ092ZXJsYXkuYXBwZW5kQ2hpbGQobG9hZGVyKTtcclxuXHJcblx0XHRyZXR1cm4gbG9hZGluZ092ZXJsYXk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBMb2FkaW5nIHRoZSBjYXJ0IHByZXZpZXcuXHJcblx0ICpcclxuXHQgKiBAcmV0dXJuIHZvaWRcclxuXHQgKi9cclxuXHRwcmV2aWV3U3RhcnRMb2FkaW5nKClcclxuXHR7XHJcblx0XHRET00uYWRkQ2xhc3MoaXRlbXNEaXYsICdsb2FkaW5nJyk7XHJcblx0XHR0aGlzLnByZXZpZXdFbGVtZW50LmFwcGVuZENoaWxkKHRoaXMubG9hZGluZ092ZXJsYXkoKSk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBMb2FkaW5nIHRoZSBjYXJ0IHByZXZpZXcuXHJcblx0ICpcclxuXHQgKiBAcmV0dXJuIHZvaWRcclxuXHQgKi9cclxuXHRwcmV2aWV3U3RvcExvYWRpbmcoKVxyXG5cdHtcclxuXHRcdGlmIChET00uZmluZCgnLmNhcnQtbG9hZGVyLW92ZXJsYXknLCB0aGlzLnByZXZpZXdFbGVtZW50KSkge1xyXG5cdFx0XHR0aGlzLnByZXZpZXdFbGVtZW50LnJlbW92ZUNoaWxkKHRoaXMubG9hZGluZ092ZXJsYXkoKSk7XHJcblx0XHRcdERPTS5yZW1vdmVDbGFzcyhpdGVtc0RpdiwgJ2xvYWRpbmcnKTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFJlbG9hZHMgdGhlIGl0ZW1zIGluIHRoZSBjYXJ0IHByZXZpZXcuXHJcblx0ICpcclxuXHQgKiBAcmV0dXJuIHZvaWRcclxuXHQgKi9cclxuXHRyZWxvYWRDYXJ0UHJldmlldygpXHJcblx0e1xyXG5cdFx0dGhpcy5wcmV2aWV3U3RhcnRMb2FkaW5nKCk7XHJcblx0XHRsZXQgaXRlbXMgPSB0aGlzLmdldENhcnRJdGVtcygpO1xyXG5cdFx0dGhpcy5hZGRUb1ByZXZpZXcoaXRlbXMpO1xyXG5cdFx0XHJcblx0XHRsZXQgaW5zdGFuY2UgPSB0aGlzO1xyXG5cclxuXHRcdHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XHJcblx0XHRcdGluc3RhbmNlLnByZXZpZXdTdG9wTG9hZGluZy5jYWxsKGluc3RhbmNlKTtcclxuXHRcdH0sIDEwMDApO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQmluZHMgZXZlbnQgbGlzdGVuZXJzIHRvIHRoZSBjYXJ0IGljb24uXHJcblx0ICpcclxuXHQgKiBAcmV0dXJuIHZvaWRcclxuXHQgKi9cclxuXHRiaW5kRXZlbnRMaXN0ZW5lcnMoKVxyXG5cdHtcclxuXHRcdHRoaXMuaWNvbi5vbmNsaWNrID0gZnVuY3Rpb24oZSkge1xyXG5cdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XHJcblx0XHRcdHRoaXMudG9nZ2xlQ2FydFByZXZpZXcoKTtcclxuXHRcdH0uYmluZCh0aGlzKTtcclxuXHJcblx0XHRFdmVudE1hbmFnZXIkMi5zdWJzY3JpYmUoJ2NhcnQucHJvZHVjdC5hZGRlZCcsIGZ1bmN0aW9uKGF0dHJpYnV0ZXMpIHtcclxuXHRcdFx0dGhpcy5vcGVuQ2FydFByZXZpZXcoKTtcclxuXHRcdFx0dGhpcy5hZGRJdGVtKGF0dHJpYnV0ZXMpO1xyXG5cdFx0XHR0aGlzLnJlbG9hZENhcnRQcmV2aWV3KCk7XHJcblx0XHR9LmJpbmQodGhpcykpO1xyXG5cclxuXHRcdEV2ZW50TWFuYWdlciQyLnN1YnNjcmliZSgnY2FydC5wcm9kdWN0LmZhdm9yaXRlZCcsIGZ1bmN0aW9uKGF0dHJpYnV0ZXMpIHtcclxuXHRcdFx0dGhpcy5mYXZvcml0ZUl0ZW0oYXR0cmlidXRlcyk7XHJcblx0XHR9LmJpbmQodGhpcykpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogT3BlbnMgdGhlIGNhcnQgcHJldmlldy5cclxuXHQgKlxyXG5cdCAqIEByZXR1cm4gdm9pZCBcclxuXHQgKi9cclxuXHRvcGVuQ2FydFByZXZpZXcoKVxyXG5cdHtcclxuXHRcdGlmIChET00uaGFzQ2xhc3ModGhpcy5wcmV2aWV3RWxlbWVudCwgJ29wZW5lZCcpKSB7XHJcblx0XHRcdHRoaXMucmVsb2FkQ2FydFByZXZpZXcoKTtcclxuXHRcdH1cclxuXHJcblx0XHRET00uc3dpdGNoQ2xhc3Nlcyh0aGlzLnByZXZpZXdFbGVtZW50LCAnY2xvc2VkJywgJ29wZW5lZCcpO1xyXG5cdFx0dGhpcy5yZWxvYWRDYXJ0UHJldmlldygpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogVG9nZ2xlcyB0aGUgb3BlbmluZyBjbG9zaW5nIG9mIHRoZSBjYXJ0IHByZXZpZXcuXHJcblx0ICpcclxuXHQgKiBAcmV0dXJuIHZvaWQgXHJcblx0ICovXHJcblx0dG9nZ2xlQ2FydFByZXZpZXcoKVxyXG5cdHtcclxuXHRcdGxldCBvcGVuaW5nID0gRE9NLnRvZ2dsZUNsYXNzKHRoaXMucHJldmlld0VsZW1lbnQsICdvcGVuZWQnLCAnY2xvc2VkJyk7XHJcblx0XHRcdFxyXG5cdFx0aWYgKG9wZW5pbmcpIHtcclxuXHRcdFx0dGhpcy5yZWxvYWRDYXJ0UHJldmlldygpO1x0XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBSZXRyaWV2ZSB0aGUgY2FydHMgaXRlbXMgZnJvbSB0aGUgY29va2llLlxyXG5cdCAqXHJcblx0ICogQHJldHVybiBvYmplY3RcclxuXHQgKi9cclxuXHRnZXRDYXJ0SXRlbXMoKVxyXG5cdHtcclxuXHRcdGxldCBjYXJ0ID0gQ29va2llLmdldCh0aGlzLnNldHRpbmdzLmNvb2tpZV9uYW1lKTtcclxuXHJcblx0XHRyZXR1cm4gKGNhcnQpID8gY2FydC5pdGVtcyA6IFtdO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogSGlkZXMgdGhlIGNvbXBvbmVudCBmcm9tIHRoZSBET00uXHJcblx0ICpcclxuXHQgKiBAcmV0dXJuIHZvaWQgXHJcblx0ICovXHJcblx0aGlkZSgpXHJcblx0e1xyXG5cdFx0dGhpcy5lbGVtZW50LnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcblx0fVxyXG59XHJcblxyXG4vKipcclxuICogQ2xvc2VzIHRoZSBjYXJ0IHByZXZpZXcgZWxlbWVudC5cclxuICpcclxuICogQHBhcmFtIGV2ZW50LmNsaWNrXHJcbiAqL1xyXG5mdW5jdGlvbiBjbG9zZShldmVudCkge1xyXG5cdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcblx0RE9NLnN3aXRjaENsYXNzZXModGhpcy5wcmV2aWV3RWxlbWVudCwgJ29wZW5lZCcsICdjbG9zZWQnKTtcclxufVxyXG5cclxuLyoqXHJcbiAqIENyZWF0ZXMgdGhlIGNhcnQgc3ZnIGljb24uXHJcbiAqXHJcbiAqIEByZXR1cm4gU1ZHU1ZHRWxlbWVudFxyXG4gKi9cclxuZnVuY3Rpb24gY3JlYXRlSWNvbigpIHtcclxuXHRsZXQgc3ZnID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKFwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiwgXCJzdmdcIik7XHJcblx0bGV0IGcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50TlMoXCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiLCBcImdcIik7XHJcblx0bGV0IHBhdGggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50TlMoXCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiLCBcInBhdGhcIik7XHJcblxyXG5cdHN2Zy5zZXRBdHRyaWJ1dGUoJ3ZlcnNpb24nLCAnMS4xJyk7XHJcblx0c3ZnLnNldEF0dHJpYnV0ZSgneG1sbnMnLCAnaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnKTtcclxuXHRzdmcuc2V0QXR0cmlidXRlKCd4bWxuczp4bGluaycsICdodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rJyk7XHJcblx0c3ZnLnNldEF0dHJpYnV0ZSgneCcsICcwcHgnKTtcclxuXHRzdmcuc2V0QXR0cmlidXRlKCd5JywgJzBweCcpO1xyXG5cdHN2Zy5zZXRBdHRyaWJ1dGUoJ3dpZHRoJywgJzQwcHgnKTtcclxuXHRzdmcuc2V0QXR0cmlidXRlKCdoZWlnaHQnLCAnNDBweCcpO1xyXG5cdHN2Zy5zZXRBdHRyaWJ1dGUoJ3ZpZXdCb3gnLCAnMCAwIDQ0Ni44NDMgNDQ2Ljg0MycpO1xyXG5cdHN2Zy5zZXRBdHRyaWJ1dGUoJ3N0eWxlJywgJ2VuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgNDQ2Ljg0MyA0NDYuODQzOycpO1xyXG5cdHN2Zy5zZXRBdHRyaWJ1dGUoJ3htbDpzcGFjZScsICdwcmVzZXJ2ZScpO1xyXG5cclxuXHRwYXRoLnNldEF0dHJpYnV0ZSgnZCcsICdNNDQ0LjA5LDkzLjEwM2MtMi42OTgtMy42OTktNy4wMDYtNS44ODgtMTEuNTg0LTUuODg4SDEwOS45MmMtMC42MjUsMC0xLjI0OSwwLjAzOC0xLjg1LDAuMTE5bC0xMy4yNzYtMzguMjdjLTEuMzc2LTMuOTU4LTQuNDA2LTcuMTEzLTguMy04LjY0NkwxOS41ODYsMTQuMTM0Yy03LjM3NC0yLjg4Ny0xNS42OTUsMC43MzUtMTguNTkxLDguMWMtMi44OTEsNy4zNjksMC43MywxNS42OTUsOC4xLDE4LjU5MWw2MC43NjgsMjMuODcybDc0LjM4MSwyMTQuMzk5Yy0zLjI4MywxLjE0NC02LjA2NSwzLjY2My03LjMzMiw3LjE4N2wtMjEuNTA2LDU5LjczOWMtMS4zMTgsMy42NjMtMC43NzUsNy43MzMsMS40NjgsMTAuOTE2YzIuMjQsMy4xODMsNS44ODMsNS4wNzgsOS43NzMsNS4wNzhoMTEuMDQ0Yy02Ljg0NCw3LjYxNi0xMS4wNDQsMTcuNjQ2LTExLjA0NCwyOC42NzVjMCwyMy43MTgsMTkuMjk4LDQzLjAxMiw0My4wMTIsNDMuMDEyczQzLjAxMi0xOS4yOTQsNDMuMDEyLTQzLjAxMmMwLTExLjAyOS00LjItMjEuMDU5LTExLjA0NC0yOC42NzVoOTMuNzc2Yy02Ljg0Nyw3LjYxNi0xMS4wNDgsMTcuNjQ2LTExLjA0OCwyOC42NzVjMCwyMy43MTgsMTkuMjk0LDQzLjAxMiw0My4wMTMsNDMuMDEyYzIzLjcxOCwwLDQzLjAxMi0xOS4yOTQsNDMuMDEyLTQzLjAxMmMwLTExLjAyOS00LjItMjEuMDU5LTExLjA0My0yOC42NzVoMTMuNDMzYzYuNTk5LDAsMTEuOTQ3LTUuMzQ5LDExLjk0Ny0xMS45NDhjMC02LjU5OS01LjM0OS0xMS45NDctMTEuOTQ3LTExLjk0N0gxNDMuNjQ3bDEzLjMxOS0zNi45OTZjMS43MiwwLjcyNCwzLjU3OCwxLjE1Miw1LjUyMywxLjE1MmgyMTAuMjc4YzYuMjM0LDAsMTEuNzUxLTQuMDI3LDEzLjY1LTkuOTU5bDU5LjczOS0xODYuMzg3QzQ0Ny41NTcsMTAxLjU2Nyw0NDYuNzg4LDk2LjgwMiw0NDQuMDksOTMuMTAzeiBNMTY5LjY1OSw0MDkuODA3Yy0xMC41NDMsMC0xOS4xMTYtOC41NzMtMTkuMTE2LTE5LjExNnM4LjU3My0xOS4xMTcsMTkuMTE2LTE5LjExN3MxOS4xMTYsOC41NzQsMTkuMTE2LDE5LjExN1MxODAuMjAyLDQwOS44MDcsMTY5LjY1OSw0MDkuODA3eiBNMzI3LjM2Nyw0MDkuODA3Yy0xMC41NDMsMC0xOS4xMTctOC41NzMtMTkuMTE3LTE5LjExNnM4LjU3NC0xOS4xMTcsMTkuMTE3LTE5LjExN2MxMC41NDIsMCwxOS4xMTYsOC41NzQsMTkuMTE2LDE5LjExN1MzMzcuOTA5LDQwOS44MDcsMzI3LjM2Nyw0MDkuODA3eiBNNDAyLjUyLDE0OC4xNDloLTczLjE2MVYxMTUuODloODMuNDk5TDQwMi41MiwxNDguMTQ5eiBNMzgxLjQ1MywyMTMuODYxaC01Mi4wOTR2LTM3LjAzOGg2My45NjdMMzgxLjQ1MywyMTMuODYxeiBNMjM0LjU3MSwyMTMuODYxdi0zNy4wMzhoNjYuMTEzdjM3LjAzOEgyMzQuNTcxeiBNMzAwLjY4NCwyNDIuNTM4djMxLjA2NGgtNjYuMTEzdi0zMS4wNjRIMzAwLjY4NHogTTEzOS4xMTUsMTc2LjgyM2g2Ni43ODR2MzcuMDM4aC01My45MzNMMTM5LjExNSwxNzYuODIzeiBNMjM0LjU3MSwxNDguMTQ5VjExNS44OWg2Ni4xMTN2MzIuMjU5SDIzNC41NzF6IE0yMDUuODk4LDExNS44OXYzMi4yNTloLTc2LjczNGwtMTEuMTkxLTMyLjI1OUgyMDUuODk4eiBNMTYxLjkxNiwyNDIuNTM4aDQzLjk4MnYzMS4wNjRoLTMzLjIwNkwxNjEuOTE2LDI0Mi41Mzh6IE0zMjkuMzU5LDI3My42MDN2LTMxLjA2NGg0Mi45MDlsLTkuOTU1LDMxLjA2NEgzMjkuMzU5eicpO1xyXG5cclxuXHRnLmFwcGVuZENoaWxkKHBhdGgpO1xyXG5cdHN2Zy5hcHBlbmRDaGlsZChnKTtcclxuXHJcblx0bGV0ICBkaXYgPSBET00uY3JlYXRlRWxlbWVudCgnZGl2Jywge1xyXG5cdFx0aWQ6ICdjYXJ0SWNvbicsXHJcblx0fSk7XHJcblxyXG5cdGRpdi5hcHBlbmRDaGlsZChzdmcpO1xyXG5cclxuXHRyZXR1cm4gZGl2O1xyXG59XHJcblxyXG4vKipcclxuICogQ3JlYXRlcyB0aGUgY2FydCBsb2FkZXIgaWNvbi5cclxuICpcclxuICogQHJldHVybiBTVkdTVkdFbGVtZW50XHJcbiAqL1xyXG5mdW5jdGlvbiBjcmVhdGVMb2FkZXIoKSB7XHJcblx0bGV0IHN2ZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnROUyhcImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIsIFwic3ZnXCIpO1xyXG5cdGxldCBjb3VudCA9IDEyO1xyXG5cdGxldCBncm91cHMgPSBbXTtcclxuXHRsZXQgcmVjdGFuZ2VscyA9IFtdO1xyXG5cdGxldCBhbmltYXRpb25zID0gW107XHJcblxyXG5cdHN2Zy5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgJ2xkcy1zcGlubmVyJyk7XHJcblx0c3ZnLnNldEF0dHJpYnV0ZSgnd2lkdGgnLCAnMjAwcHgnKTtcclxuXHRzdmcuc2V0QXR0cmlidXRlKCdoZWlnaHQnLCAnMjAwcHgnKTtcclxuXHRzdmcuc2V0QXR0cmlidXRlKCd4bWxucycsICdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZycpO1xyXG5cdHN2Zy5zZXRBdHRyaWJ1dGUoJ3htbG5zOnhsaW5rJywgJ2h0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsnKTtcclxuXHRzdmcuc2V0QXR0cmlidXRlKCd2aWV3Qm94JywgJzAgMCAxMDAgMTAwJyk7XHJcblx0c3ZnLnNldEF0dHJpYnV0ZSgncHJlc2VydmVBc3BlY3RSYXRpbycsICd4TWlkWU1pZCcpO1xyXG5cdHN2Zy5zZXRBdHRyaWJ1dGUoJ3N0eWxlJywgJ2JhY2tncm91bmQ6IG5vbmU7Jyk7XHJcblx0XHJcblx0dmFyIHJvdGF0aW9uID0gMDtcclxuXHJcblx0Zm9yICh2YXIgaSA9IDA7IGkgPCBjb3VudDsgaSsrKSB7XHJcblx0XHRsZXQgZ3JvdXAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50TlMoXCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiLCBcImdcIik7XHJcblx0XHRncm91cC5zZXRBdHRyaWJ1dGUoJ3RyYW5zZm9ybScsICdyb3RhdGUoJyArIHJvdGF0aW9uICsgJyA1MCA1MCknKTtcclxuXHRcdHJvdGF0aW9uICs9IDMwO1xyXG5cdFx0Z3JvdXBzLnB1c2goZ3JvdXApO1xyXG5cdH1cclxuXHJcblx0Zm9yICh2YXIgaSA9IDA7IGkgPCBjb3VudDsgaSsrKSB7XHJcblx0XHRsZXQgcmVjdGFuZ2VsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKFwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiwgXCJyZWN0XCIpO1xyXG5cdFx0cmVjdGFuZ2VsLnNldEF0dHJpYnV0ZSgneCcsICc0NycpO1xyXG5cdFx0cmVjdGFuZ2VsLnNldEF0dHJpYnV0ZSgneScsICcyNCcpO1xyXG5cdFx0cmVjdGFuZ2VsLnNldEF0dHJpYnV0ZSgncngnLCAnOS40Jyk7XHJcblx0XHRyZWN0YW5nZWwuc2V0QXR0cmlidXRlKCdyeScsICc0LjgnKTtcclxuXHRcdHJlY3RhbmdlbC5zZXRBdHRyaWJ1dGUoJ3dpZHRoJywgJzYnKTtcclxuXHRcdHJlY3RhbmdlbC5zZXRBdHRyaWJ1dGUoJ2hlaWdodCcsICcxMicpO1xyXG5cdFx0cmVjdGFuZ2VsLnNldEF0dHJpYnV0ZSgnZmlsbCcsICcjNDY1OGFjJyk7XHJcblx0XHRyZWN0YW5nZWxzLnB1c2gocmVjdGFuZ2VsKTtcclxuXHR9XHJcblxyXG5cdHZhciBiZWdpbiA9IDAuMDkgKiAxMTtcclxuXHJcblx0Zm9yICh2YXIgaSA9IDA7IGkgPCBjb3VudDsgaSsrKSB7XHJcblx0XHRsZXQgYW5pbWF0ZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnROUyhcImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIsIFwiYW5pbWF0ZVwiKTtcclxuXHRcdGFuaW1hdGUuc2V0QXR0cmlidXRlKCdhdHRyaWJ1dGVOYW1lJywgJ29wYWNpdHknKTtcclxuXHRcdGFuaW1hdGUuc2V0QXR0cmlidXRlKCd2YWx1ZXMnLCAnMTswJyk7XHJcblx0XHRhbmltYXRlLnNldEF0dHJpYnV0ZSgndGltZXMnLCAnMDsxJyk7XHJcblx0XHRhbmltYXRlLnNldEF0dHJpYnV0ZSgnZHVyJywgJzFzJyk7XHJcblx0XHRhbmltYXRlLnNldEF0dHJpYnV0ZSgnYmVnaW4nLCBiZWdpbi50b0ZpeGVkKDgpICsgJ3MnKTtcclxuXHRcdGFuaW1hdGUuc2V0QXR0cmlidXRlKCdyZXBlYXRDb3VudCcsICdpbmRlZmluaXRlJyk7XHJcblx0XHRhbmltYXRpb25zLnB1c2goYW5pbWF0ZSk7XHJcblx0XHRiZWdpbiAtPSAwLjA5O1xyXG5cdH1cclxuXHJcblx0Zm9yICh2YXIgaSA9IDA7IGkgPCBncm91cHMubGVuZ3RoOyBpKyspIHtcclxuXHRcdGxldCBncm91cCA9IGdyb3Vwc1tpXTtcdFx0XHJcblx0XHRsZXQgcmVjdGFuZ2VsID0gcmVjdGFuZ2Vsc1tpXTtcclxuXHRcdGxldCBhbmltYXRlID0gYW5pbWF0aW9uc1tpXTtcclxuXHRcdHJlY3RhbmdlbC5hcHBlbmRDaGlsZChhbmltYXRlKTtcclxuXHRcdGdyb3VwLmFwcGVuZENoaWxkKHJlY3RhbmdlbCk7XHJcblx0XHRzdmcuYXBwZW5kQ2hpbGQoZ3JvdXApO1xyXG5cdH1cclxuXHJcblx0RE9NLmFkZENsYXNzKHN2ZywgJ2NhcnQtbG9hZGVyJyk7XHJcblxyXG5cdHJldHVybiBzdmc7XHRcclxufVxuXG4vKipcclxuICogQGZpbGUgXHJcbiAqIEZpbHRlciBjbGFzcy5cclxuICpcclxuICogVGhlIEZpbHRlciBPYmplY3QsIGhhbmRsZXMgdGhlIGZpbHRlciBvZiB0aGUgcHJvZHVjdHMvc2VydmljZXMuXHJcbiAqL1xyXG5cclxuLyoqXHJcbiAqIFRoZSBkZWZhdWx0IHNldHRpbmdzIG9mIHRoZSBmaWx0ZXIuXHJcbiAqL1xyXG5sZXQgZGVmYXVsdFNldHRpbmdzJDIgPSB7XHJcblx0ZWxlbWVudDogJy5maWx0ZXInLFxyXG5cdGNsYXNzOiAnJyxcclxuXHR3aWR0aDogJycsXHJcblx0aGVpZ2h0OiAnJyxcclxuXHRub19jc3M6IGZhbHNlLFxyXG59O1xyXG5cclxuLyoqXHJcbiAqIFN0b3JlcyB0aGUgY29udGFpbmVyIG9iamVjdC5cclxuICpcclxuICogQHZhciBcXENvcmVcXENvbnRhaW5lclxyXG4gKi9cclxubGV0IENvbnRhaW5lciQxO1xyXG5cclxuY2xhc3MgRmlsdGVyIFxyXG57XHJcblx0LyoqXHJcblx0ICogLSBJbml0aWFsaXplIHRoZSBJb0MgY29udGFpbmVyLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIFxcQ29yZVxcQ29udGFpbmVyIHwgY29udGFpbmVyXHJcblx0ICogQHJldHVybiB2b2lkXHJcblx0ICovXHJcblx0Y29uc3RydWN0b3IoY29udGFpbmVyKSBcclxuXHR7XHJcblx0XHRDb250YWluZXIkMSA9IGNvbnRhaW5lcjtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFNldHVwIHRoZSBmaWx0ZXIgY2xhc3MuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gb2JqZWN0IHwgc2V0dGluZ3NcclxuXHQgKiBAcmV0dXJuIHZvaWRcclxuXHQgKi9cclxuXHRzZXR1cChzZXR0aW5ncylcclxuXHR7XHJcblx0XHRpZih0eXBlb2Ygc2V0dGluZ3MgIT0gJ29iamVjdCcpIHtcclxuXHRcdFx0dGhyb3cgbmV3IEludmFsaWRBcmd1bWVudEV4Y2VwdGlvbiQxO1xyXG5cdFx0fVxyXG5cclxuXHRcdHRoaXMuc2V0dGluZ3MgPSBDb21tb24uZXh0ZW5kKGRlZmF1bHRTZXR0aW5ncyQyLCBzZXR0aW5ncyk7XHJcblxyXG5cdFx0ZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsIGZ1bmN0aW9uKCkge1xyXG5cclxuXHRcdFx0dGhpcy5zZXRFbGVtZW50KHRoaXMuc2V0dGluZ3MuZWxlbWVudCk7XHJcblxyXG5cdFx0XHR0aGlzLmFkZFN0eWxlVGFnKCk7XHRcclxuXHRcdH0uYmluZCh0aGlzKSk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBTZXRzIHRoZSBlbGVtZW50IHRvIGJlIGJvdW5kIHRvLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIHN0cmluZyB8IHNlbGVjdG9yXHJcblx0ICogQHJldHVybiB2b2lkXHJcblx0ICovXHJcblx0c2V0RWxlbWVudChzZWxlY3RvcilcclxuXHR7XHJcblx0XHR0aGlzLmVsZW1lbnQgPSBET00uZmluZChzZWxlY3Rvcik7XHJcblx0XHRcclxuXHRcdERPTS5hZGRDbGFzcyh0aGlzLmVsZW1lbnQsIHRoaXMuc2V0dGluZ3MuY2xhc3MpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQWRkIHRoZSBlQ29tbWVyY2Ugc3R5bGUgdGFncyB0byB0aGUgRE9NLlxyXG5cdCAqL1xyXG5cdGFkZFN0eWxlVGFnKCkgXHJcblx0e1xyXG5cdFx0aWYgKERPTS5maW5kKCcjVHVyYm8tZUNvbW1lcmNlLUZpbHRlcicpKSB7XHJcblx0XHRcdHJldHVybjtcclxuXHRcdH1cclxuXHJcblx0XHRpZiAodGhpcy5zZXR0aW5ncy5ub19jc3MpIHtcclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0fVxyXG5cclxuXHRcdGxldCB3aWR0aCA9ICh0aGlzLnNldHRpbmdzLndpZHRoKSA/ICd3aWR0aDonICsgdGhpcy5zZXR0aW5ncy53aWR0aCArICc7JyA6ICcnO1xyXG5cdFx0bGV0IG1pbldpZHRoID0gdGhpcy5zZXR0aW5ncy5taW5fd2lkdGggfHwgJzIwMHB4JztcclxuXHRcdGxldCBoZWlnaHQgPSB0aGlzLnNldHRpbmdzLmhlaWdodCB8fCAnYXV0byc7XHJcblxyXG5cdFx0bGV0IGNzcyA9IGBcclxuXHRcdFx0JHt0aGlzLnNldHRpbmdzLmVsZW1lbnR9IHtcclxuXHRcdFx0XHRwb3NpdGlvbjogcmVsYXRpdmU7XHJcblx0XHRcdFx0bWFyZ2luOiA1cHggNXB4O1xyXG5cdFx0XHRcdGJvcmRlcjogMXB4IHNvbGlkICNlNGU0ZTQ7XHJcblx0XHRcdFx0JHt3aWR0aH1cclxuXHRcdFx0XHRtaW4td2lkdGg6ICR7bWluV2lkdGh9O1xyXG5cdFx0XHRcdGhlaWdodDogJHtoZWlnaHR9O1xyXG5cdFx0XHRcdG1pbi1oZWlnaHQ6IDIwMHB4O1xyXG5cdFx0XHRcdGNvbG9yOiAjZmZmZmZmO1xyXG5cdFx0XHRcdG92ZXJmbG93OiBoaWRkZW47XHJcblx0XHRcdH1cclxuXHJcblx0XHRgO1xyXG5cdCAgICBcclxuXHQgICAgRE9NLmFkZFN0eWxlKCdUdXJiby1lQ29tbWVyY2UtRmlsdGVyJywgY3NzKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEhpZGVzIHRoZSBjb21wb25lbnQgZnJvbSB0aGUgRE9NLlxyXG5cdCAqXHJcblx0ICogQHJldHVybiB2b2lkIFxyXG5cdCAqL1xyXG5cdGhpZGUoKVxyXG5cdHtcclxuXHRcdHRoaXMuZWxlbWVudC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xyXG5cdH1cclxufVxuXG4vLyBIZWxwZXJzXHJcbi8vIEV4Y2VwdGlvbnNcclxuLyoqXHJcbiAqIEBmaWxlIFxyXG4gKiBDYXJ0IGNsYXNzLlxyXG4gKlxyXG4gKiBIYW5kbGVzIGFkZGluZywgcmVtb3ZpbmcgZXRjLi4uIG9mIGl0ZW1zLlxyXG4gKi9cclxuXHJcbi8qKlxyXG4gKiBUaGUgZGVmYXVsdCBzZXR0aW5ncyBvZiB0aGUgY2FydC5cclxuICpcclxuICogQHZhciBvYmplY3RcclxuICovXHJcbmxldCBkZWZhdWx0U2V0dGluZ3MkMyA9IHtcclxuXHRlbGVtZW50OiAnLmNoZWNrb3V0JyxcclxuXHRub19jc3M6IGZhbHNlLFxyXG59O1xyXG5cclxuLyoqXHJcbiAqIFN0b3JlcyB0aGUgY29udGFpbmVyIG9iamVjdC5cclxuICpcclxuICogQHZhciBcXENvcmVcXENvbnRhaW5lclxyXG4gKi9cclxubGV0IENvbnRhaW5lciQyO1xyXG5cclxuLyoqXHJcbiAqIFN0b3JlcyB0aGUgZXZlbnQgbWFuYWdlciBvYmplY3QuXHJcbiAqXHJcbiAqIEB2YXIgXFxDb3JlXFxFdmVudE1hbmFnZXJcclxuICovXHJcbmxldCBFdmVudE1hbmFnZXIkMztcclxuXHJcbi8qKlxyXG4gKiBTdG9yZXMgdGhlIHJlcXVlc3Qgb2JqZWN0LlxyXG4gKlxyXG4gKiBAdmFyIFxcSGVscGVyc1xcUmVxdWVzdFxyXG4gKi9cclxubGV0IEh0dHAkMTtcclxuXHJcblxyXG5jbGFzcyBDaGVja291dCBcclxue1xyXG5cdC8qKlxyXG5cdCAqIC0gSW5pdGlhbGl6ZSB0aGUgSW9DIGNvbnRhaW5lclxyXG5cdCAqIC0gSW5pdGlhbGl6ZSB0aGUgUmVxdWVzdFxyXG5cdCAqIC0gSW5pdGlhbGl6ZSB0aGUgRXZlbnRNYW5hZ2VyXHJcblx0ICogLSBMaXN0ZW4gdG8gY2hlY2tvdXQgZXZlbnQuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gXFxDb3JlXFxDb250YWluZXIgfCBjb250YWluZXJcclxuXHQgKiBAcGFyYW0gXFxIZWxwZXJzXFxSZXF1ZXN0IHwgaHR0cFxyXG5cdCAqIEBwYXJhbSBcXENvcmVcXEV2ZW50TWFuYWdlciB8IGV2ZW50TWFuYWdlclxyXG5cdCAqIEByZXR1cm4gdm9pZFxyXG5cdCAqL1xyXG5cdGNvbnN0cnVjdG9yKGNvbnRhaW5lciwgaHR0cCwgZXZlbnRNYW5hZ2VyKSBcclxuXHR7XHJcblx0XHRDb250YWluZXIkMiA9IGNvbnRhaW5lcjtcclxuXHRcdEh0dHAkMSA9IGh0dHA7XHJcblx0XHRFdmVudE1hbmFnZXIkMyA9IGV2ZW50TWFuYWdlcjtcclxuXHRcdFxyXG5cdFx0RXZlbnRNYW5hZ2VyJDMuc3Vic2NyaWJlKCdjYXJ0LmNoZWNrb3V0JywgZnVuY3Rpb24oKSB7XHRcclxuXHRcdFx0dGhpcy5oaWRlQWxsKCk7XHJcblx0XHRcdHRoaXMuc2hvdygpO1xyXG5cdFx0fS5iaW5kKHRoaXMpKTtcdFxyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogU2V0cyB0aGUgb2JqZWN0IGJ5IHRoZSB1c2VycyBzZXR0aW5nLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIG9iamVjdCB8IHNldHRpbmdzXHJcblx0ICogQHJldHVybiB2b2lkXHJcblx0ICovXHJcblx0c2V0dXAoc2V0dGluZ3MpXHJcblx0e1xyXG5cdFx0aWYgKHR5cGVvZiBzZXR0aW5ncyAhPSAnb2JqZWN0Jykge1xyXG5cdFx0XHR0aHJvdyBuZXcgSW52YWxpZEFyZ3VtZW50RXhjZXB0aW9uJDE7XHJcblx0XHR9XHJcblxyXG5cdFx0dGhpcy5zZXR0aW5ncyA9IENvbW1vbi5leHRlbmQoZGVmYXVsdFNldHRpbmdzJDMsIHNldHRpbmdzKTtcclxuXHJcblx0XHRkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgZnVuY3Rpb24oKSB7XHJcblxyXG5cdFx0XHR0aGlzLnNldEVsZW1lbnQodGhpcy5zZXR0aW5ncy5lbGVtZW50KTtcclxuXHRcdFx0dGhpcy5oaWRlKCk7XHJcblx0XHRcdHRoaXMuYWRkU3R5bGVUYWcoKTtcclxuXHRcdH0uYmluZCh0aGlzKSk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBCaW5kcyBldmVydGhpbmcgdG8gdGhlIGVsZW1lbnQuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gc3RyaW5nIHwgc2VsZWN0b3JcclxuXHQgKiBAcmV0dXJuIHZvaWRcclxuXHQgKi9cclxuXHRzZXRFbGVtZW50KHNlbGVjdG9yKVxyXG5cdHtcclxuXHRcdHRoaXMuZWxlbWVudCA9IERPTS5maW5kKHNlbGVjdG9yKTtcclxuXHJcblx0XHRpZiAodGhpcy5lbGVtZW50KSB7XHJcblx0XHRcdERPTS5hZGRDbGFzcyh0aGlzLmVsZW1lbnQsIHRoaXMuc2V0dGluZ3MuY2xhc3MpO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQWRkIHRoZSBlQ29tbWVyY2Ugc3R5bGUgdGFncyB0byB0aGUgRE9NLlxyXG5cdCAqXHJcblx0ICogQHJldHVybiB2b2lkXHJcblx0ICovXHJcblx0YWRkU3R5bGVUYWcoKSBcclxuXHR7XHJcblx0XHRpZiAoRE9NLmZpbmQoJyNUdXJiby1lQ29tbWVyY2UtQ2hlY2tvdXQnKSkge1xyXG5cdFx0XHRyZXR1cm47XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKHRoaXMuc2V0dGluZ3Mubm9fY3NzKSB7XHJcblx0XHRcdHJldHVybjtcclxuXHRcdH1cclxuXHJcblx0XHRsZXQgcG9zaXRpb24gPSAodGhpcy5zZXR0aW5ncy5maXhlZCkgPyAnZml4ZWQnIDogJ2Fic29sdXRlJztcclxuXHJcblx0XHRsZXQgY3NzID0gYFxyXG5cdFx0XHQke3RoaXMuc2V0dGluZ3MuZWxlbWVudH0ge1xyXG5cdFx0XHRcdHdpZHRoOiAxMDAlO1xyXG5cdFx0XHRcdG1pbi1oZWlnaHQ6IDQwMHB4O1xyXG5cdFx0XHRcdGJvcmRlcjogMXB4IHNvbGlkICNlNGU0ZTQ7XHJcblx0XHRcdH1cclxuXHRcdGA7XHJcblx0ICAgIFxyXG5cdCAgICBET00uYWRkU3R5bGUoJ1R1cmJvLWVDb21tZXJjZS1DaGVja291dCcsIGNzcyk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBIaWRlcyBhbGwgaXJyZWxldmFudCBlbGVtZW50cyBmcm9tIHRoZSBET00uXHJcblx0ICpcclxuXHQgKiBAcmV0dXJuIHZvaWQgXHJcblx0ICovXHJcblx0aGlkZUFsbCgpXHJcblx0e1x0XHJcblx0XHRDb250YWluZXIkMi5Db21wb25lbnRzLmJvb3RlZC5mb3JFYWNoKGZ1bmN0aW9uKGNvbXBvbmVudCkge1xyXG5cdFx0XHRpZiAoY29tcG9uZW50LmNvbnN0cnVjdG9yLm5hbWUgIT0gJ0NoZWNrb3V0Jykge1xyXG5cdFx0XHRcdGNvbXBvbmVudC5oaWRlKCk7XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogSGlkZXMgdGhlIGNvbXBvbmVudCBmcm9tIHRoZSBET00uXHJcblx0ICpcclxuXHQgKiBAcmV0dXJuIHZvaWQgXHJcblx0ICovXHJcblx0aGlkZSgpXHJcblx0e1xyXG5cdFx0dGhpcy5lbGVtZW50LnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBTaG93cyB0aGUgZWxlbWVudCBvbiB0aGUgRE9NLlxyXG5cdCAqXHJcblx0ICogQHJldHVybiB2b2lkIFxyXG5cdCAqL1xyXG5cdHNob3coKVxyXG5cdHtcclxuXHRcdHRoaXMuZWxlbWVudC5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcclxuXHR9XHJcbn1cblxuLyoqXHJcbiAqIEBmaWxlIFxyXG4gKiBQcm9kdWN0cyBjbGFzcy5cclxuICpcclxuICogVGhlIFByb2R1Y3RzIGNvbXBvbmVudCwgaGFuZGxlcyB0aGUgcHJvZHVjdHMgdGFza3MuXHJcbiAqL1xyXG5cclxuXHJcbi8qKlxyXG4gKiBUaGUgZGVmYXVsdCBzZXR0aW5ncyBvZiBlYWNoIHByb2R1Y3QuXHJcbiAqXHJcbiAqIEB2YXIgb2JqZWN0XHJcbiAqL1xyXG5sZXQgZGVmYXVsdFNldHRpbmdzJDQgPSB7XHJcblx0ZWxlbWVudDogJy5wcm9kdWN0cycsXHJcblx0Y2xhc3M6ICcnLFxyXG5cdGl0ZW1fY2xhc3M6ICcnLFxyXG5cdGFkZF9idXR0b25fY2xhc3M6ICdidG4gYnRuLXByaW1hcnknLFxyXG5cdGZhdm9yaXRlX2J1dHRvbl9jbGFzczogJ2J0biBidG4tZGFuZ2VyJyxcclxuXHR3aWR0aDogJzIwMHB4JyxcclxuXHRoZWlnaHQ6ICcyNTBweCcsXHJcblx0YXR0cmlidXRlczogWyduYW1lJywgJ3ByaWNlJywgJ2RlbGl2ZXJ5VGltZScsICdpbWFnZSddLFxyXG5cdHVybDogJ3Byb2R1Y3RzLnBocCcsXHJcblx0bm9fY3NzOiBmYWxzZSxcclxufTtcclxuXHJcbi8qKlxyXG4gKiBTdG9yZXMgdGhlIGNvbnRhaW5lciBvYmplY3QuXHJcbiAqIFxyXG4gKiBAdmFyIFxcQ29yZVxcQ29udGFpbmVyXHJcbiAqL1xyXG5sZXQgQ29udGFpbmVyJDM7XHJcblxyXG4vKipcclxuICogU3RvcmVzIHRoZSBjb250YWluZXIgb2JqZWN0LlxyXG4gKiBcclxuICogQHZhciBcXENvcmVcXEV2ZW50TWFuYWdlclxyXG4gKi9cclxubGV0IEV2ZW50TWFuYWdlciQ0O1xyXG5cclxuLyoqXHJcbiAqIFN0b3JlcyB0aGUgcmVxdWVzdCBvYmplY3QuXHJcbiAqIFxyXG4gKiBAdmFyIFxcSGVscGVyXFxSZXF1ZXN0IFxyXG4gKi9cclxubGV0IEh0dHAkMjtcclxuXHJcbi8qKlxyXG4gKiBTdG9yZXMgdGhlIGNodW5rZWQgcGVyIFxyXG4gKiBwYWdlIHByb2R1Y3RzLlxyXG4gKiBcclxuICogQHZhciBhcnJheVxyXG4gKi9cclxubGV0IGNodW5rZWRQcm9kdWN0cztcclxuXHJcbmNsYXNzIFByb2R1Y3RzIFxyXG57XHJcblx0LyoqXHJcblx0ICogSW5pdGFsaXplIHRoZSBDb250YWluZXIuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gXFxDb3JlXFxDb250YWluZXIgfCBjb250YWluZXJcclxuXHQgKiBAcGFyYW0gXFxIZWxwZXJzXFxSZXF1ZXN0IHwgaHR0cFxyXG5cdCAqIEByZXR1cm4gdm9pZFxyXG5cdCAqL1xyXG5cdGNvbnN0cnVjdG9yKGNvbnRhaW5lciwgaHR0cCwgZXZlbnRNYW5hZ2VyKSBcclxuXHR7XHJcblx0XHRDb250YWluZXIkMyA9IGNvbnRhaW5lcjtcclxuXHRcdEh0dHAkMiA9IGh0dHA7XHJcblx0XHRFdmVudE1hbmFnZXIkNCA9IGV2ZW50TWFuYWdlcjtcclxuXHRcdGNodW5rZWRQcm9kdWN0cyA9IFtdO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogU2V0cyB0aGUgZ2l2ZW4gc2V0dGluZ3MgZnJvbSB0aGUgdXNlci5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSBvYmplY3QgfCBzZXR0aW5nc1xyXG5cdCAqIEByZXR1cm4gdm9pZFxyXG5cdCAqL1xyXG5cdHNldHVwKHNldHRpbmdzKVxyXG5cdHtcclxuXHRcdGlmICh0eXBlb2Ygc2V0dGluZ3MgIT0gJ29iamVjdCcpIHtcclxuXHRcdFx0dGhyb3cgbmV3IEludmFsaWRBcmd1bWVudEV4Y2VwdGlvbiQxO1xyXG5cdFx0fVxyXG5cclxuXHRcdHRoaXMuc2V0dGluZ3MgPSBDb21tb24uZXh0ZW5kKGRlZmF1bHRTZXR0aW5ncyQ0LCBzZXR0aW5ncyk7XHJcblx0XHR0aGlzLnRvdGFsSXRlbXMgPSBudWxsO1xyXG5cclxuXHRcdGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCBmdW5jdGlvbigpIHtcclxuXHJcblx0XHRcdHRoaXMuc2V0RWxlbWVudCh0aGlzLnNldHRpbmdzLmVsZW1lbnQpO1xyXG5cclxuXHRcdFx0dGhpcy5hZGRTdHlsZVRhZygpO1x0XHJcblxyXG5cdFx0XHR0aGlzLmxvYWRQcm9kdWN0cygxKTtcclxuXHRcdH0uYmluZCh0aGlzKSk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBMb2FkcyB0aGUgcHJvZHVjdHMgZm9yIHRoZSBwYWdlLlxyXG5cdCAqIFxyXG5cdCAqIEBwYXJhbSBudW1iZXIgfCBwYWdlTnVtYmVyXHJcblx0ICogQHJldHVybiB2b2lkXHJcblx0ICovXHJcblx0bG9hZFByb2R1Y3RzKHBhZ2VOdW1iZXIgPSAxKVxyXG5cdHtcclxuXHRcdGlmIChDb250YWluZXIkMy5QYWdpbmF0aW9uICYmIENvbnRhaW5lciQzLlBhZ2luYXRpb24uYm9vdGVkKSB7XHJcblx0XHRcdHN3aXRjaChDb250YWluZXIkMy5QYWdpbmF0aW9uLnNldHRpbmdzLnByb2NjZXNzaW5nKSBcclxuXHRcdFx0e1xyXG5cdFx0XHRcdGNhc2UgJ2NsaWVudC1zaWRlJzpcclxuXHRcdFx0XHRcdHJldHVybiB0aGlzLmxvYWRQYWdlUHJvZHVjdHNCeUNsaWVudChwYWdlTnVtYmVyKTtcclxuXHRcdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRcdGNhc2UgJ3NlcnZlci1zaWRlJzpcclxuXHRcdFx0XHRcdHJldHVybiB0aGlzLmxvYWRQYWdlUHJvZHVjdHNCeVNlcnZlcihwYWdlTnVtYmVyKTtcclxuXHRcdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRcdGRlZmF1bHQ6XHJcblx0XHRcdFx0XHR0aHJvdyBuZXcgSW52YWxpZEFyZ3VtZW50RXhjZXB0aW9uJDEoJ2ZvciBwcm9jY2Vzc2luZyB5b3UgY2FuIGNob29zZSBcXCdzZXJ2ZXItc2lkZVxcJyBvciBcXCdjbGllbnQtc2lkZVxcJyBvcHRpb25zLicpO1xyXG5cdFx0XHR9XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHR0aGlzLmxvYWRQYWdlUHJvZHVjdHNCeVNlcnZlcigpO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogTG9hZHMgdGhlIHByb2R1Y3RzIGFuZCBcclxuXHQgKiByZXBsYWNlIHRoZW0gaW4gdGhlIGRpdiBjb250YWluZXIuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gbnVtYmVyIHwgcGFnZU51bWJlclxyXG5cdCAqIEByZXR1cm4gdm9pZFxyXG5cdCAqL1xyXG5cdGxvYWRQYWdlUHJvZHVjdHNCeVNlcnZlcihwYWdlTnVtYmVyID0gbnVsbClcclxuXHR7XHJcblx0XHRsZXQgcmVxdWVzdCA9IHRoaXMuZ2V0UHJvZHVjdHMocGFnZU51bWJlcik7XHJcblxyXG5cdFx0cmVxdWVzdC50aGVuKGZ1bmN0aW9uKHByb2R1Y3RzKSB7XHJcblxyXG5cdFx0XHR0aGlzLmN1cnJlbnRJdGVtcyA9IHByb2R1Y3RzO1xyXG5cclxuXHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLmN1cnJlbnRJdGVtcy5sZW5ndGg7IGkrKykge1xyXG5cdFx0XHRcdHZhciBwcm9kdWN0ID0gdGhpcy5jdXJyZW50SXRlbXNbaV07XHJcblx0XHRcdFx0RXZlbnRNYW5hZ2VyJDQucHVibGlzaCgncHJvZHVjdHMubG9hZGluZycsIHByb2R1Y3QpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRFdmVudE1hbmFnZXIkNC5wdWJsaXNoKCdwcm9kdWN0cy5sb2FkZWQnLCBwcm9kdWN0cyk7XHJcblx0XHRcdHRoaXMucmVwbGFjZUl0ZW1zKHByb2R1Y3RzKTtcclxuXHRcdFx0cmVzb2x2ZSgpO1xyXG5cdFx0fS5iaW5kKHRoaXMpKS5jYXRjaChmdW5jdGlvbihlcnJvcikge1xyXG5cclxuXHRcdH0pO1xyXG5cclxuXHRcdHJldHVybiByZXF1ZXN0O1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogTG9hZHMgdGhlIHByb2R1Y3RzIGFuZCBcclxuXHQgKiByZXBsYWNlIHRoZW0gaW4gdGhlIGRpdiBjb250YWluZXIuXHJcblx0ICpcclxuXHQgKiBAcmV0dXJuIHZvaWRcclxuXHQgKi9cclxuXHRsb2FkUGFnZVByb2R1Y3RzQnlDbGllbnQocGFnZU51bWJlcilcclxuXHR7XHJcblx0XHRsZXQgcmVxdWVzdDtcclxuXHJcblx0XHRpZiAodGhpcy50b3RhbEl0ZW1zID09IG51bGwpIHsgLy8gbmVlZCB0byBmZXRjaCB0aGVtIGZyb20gdGhlIHNlcnZlci5cclxuXHRcdFx0cmVxdWVzdCA9IHRoaXMuZ2V0UHJvZHVjdHMoKTtcclxuXHRcdH0gZWxzZSB7IC8vIG5vIG5lZWQgdG8gd2FpdCBjYW4gcmVzb2x2ZSBpbW1lZGlhdGVseSB3aXRoIHRoZSBwcm9kdWN0cy4gXHJcblx0XHRcdHJlcXVlc3QgPSBQcm9taXNlLnJlc29sdmUodGhpcy50b3RhbEl0ZW1zKTtcclxuXHRcdH1cclxuXHJcblx0XHRyZXF1ZXN0LnRoZW4oZnVuY3Rpb24ocHJvZHVjdHMpIHtcclxuXHRcdFx0dGhpcy50b3RhbEl0ZW1zID0gcHJvZHVjdHM7XHJcblxyXG5cdFx0XHRsZXQgcGFnZXMgPSB0aGlzLmNhbGN1bGF0ZUNsaWVudFBhZ2VzKHByb2R1Y3RzKTtcclxuXHJcblx0XHRcdHRoaXMuY3VycmVudEl0ZW1zID0gcGFnZXNbcGFnZU51bWJlci0xXTtcclxuXHJcblx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5jdXJyZW50SXRlbXMubGVuZ3RoOyBpKyspIHtcclxuXHRcdFx0XHR2YXIgcHJvZHVjdCA9IHRoaXMuY3VycmVudEl0ZW1zW2ldO1xyXG5cdFx0XHRcdEV2ZW50TWFuYWdlciQ0LnB1Ymxpc2goJ3Byb2R1Y3RzLmxvYWRpbmcnLCBwcm9kdWN0KTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0RXZlbnRNYW5hZ2VyJDQucHVibGlzaCgncHJvZHVjdHMubG9hZGVkJywgcHJvZHVjdHMpO1xyXG5cdFx0XHR0aGlzLnJlcGxhY2VJdGVtcyh0aGlzLmN1cnJlbnRJdGVtcyk7XHJcblx0XHRcdFByb21pc2UucmVzb2x2ZSh0aGlzLmN1cnJlbnRJdGVtcyk7XHJcblxyXG5cdFx0fS5iaW5kKHRoaXMpKS5jYXRjaChmdW5jdGlvbihlcnJvcikge1xyXG5cclxuXHRcdH0pO1xyXG5cclxuXHRcdHJldHVybiByZXF1ZXN0O1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQ2FsY3VsYXRlcyB0aGUgYW1vdW50IG9mIHBhZ2VzIGZvciB0aGUgY2xpZW50LlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIGFycmF5IHwgcHJvZHVjdHNcclxuXHQgKiBAcmV0dXJuIGFycmF5XHJcblx0ICovXHJcblx0Y2FsY3VsYXRlQ2xpZW50UGFnZXMocHJvZHVjdHMpXHJcblx0e1x0XHJcblx0XHQvLyBXZSBhcmUgdXNpbmcgcGFnaW5hdGlvbiBzbyB3ZSBuZWVkIHRvIHVwZGF0ZSBpdCB0b28uXHJcblx0XHRDb250YWluZXIkMy5QYWdpbmF0aW9uLnNldHRpbmdzLnRvdGFsX2l0ZW1zID0gcHJvZHVjdHMubGVuZ3RoO1xyXG5cdFx0XHJcblx0XHRsZXQgcGVyUGFnZSA9IENvbnRhaW5lciQzLlBhZ2luYXRpb24uc2V0dGluZ3MucGVyX3BhZ2U7IFxyXG5cclxuXHRcdC8vIFdlIG5lZWQgdG8gY2FsY3VsYXRlIHRoZSBwYWdlcyBvbiBmdWxsIGh0dHAgcmVxdWVzdCBcclxuXHRcdC8vIG9ubHkgb25jZS4gc28gd2UgY2hlY2sgdG8gc2VlIGlmIHdlIGhhdmUgcmVzdWx0cyBpbiBvdXIgY2FjaGUuXHJcblx0XHRpZiAoY2h1bmtlZFByb2R1Y3RzLmxlbmd0aCAhPSAwKSB7XHJcblx0XHRcdHJldHVybiBjaHVua2VkUHJvZHVjdHM7XHJcblx0XHR9XHJcblxyXG5cdFx0Y2h1bmtlZFByb2R1Y3RzID0gQ29tbW9uLmFycmF5X2NodW5rKHByb2R1Y3RzLCBwZXJQYWdlKTtcclxuXHRcdHJldHVybiBjaHVua2VkUHJvZHVjdHM7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBTZXRzIHRoZSBET00gZWxlbWVudCBcclxuXHQgKiBmb3IgcG9wdWxhdGluZyB0aGUgcHJvZHVjdHMuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gc3RyaW5nIHwgc2VsZWN0b3JcclxuXHQgKiBAcmV0dXJuIHZvaWRcclxuXHQgKi9cclxuXHRzZXRFbGVtZW50KHNlbGVjdG9yKVxyXG5cdHtcclxuXHRcdHRoaXMuZWxlbWVudCA9IERPTS5maW5kKHNlbGVjdG9yKTtcclxuXHJcblx0XHRpZiAodGhpcy5lbGVtZW50KSB7XHJcblx0XHRcdERPTS5hZGRDbGFzcyh0aGlzLmVsZW1lbnQsIHRoaXMuc2V0dGluZ3MuY2xhc3MpO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogUmVwbGFjZSBpdGVtcyBpbiBcclxuXHQgKiB0aGUgcHJvZHVjdHMgY29udGFpbmVyLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIGFycmF5IHwgaXRlbXNcclxuXHQgKiBAcmV0dXJuIGFycmF5XHJcblx0ICovXHJcblx0cmVwbGFjZUl0ZW1zKGl0ZW1zKSBcclxuXHR7XHJcblx0XHRpZiAoISBBcnJheS5pc0FycmF5KGl0ZW1zKSB8fCAoaXRlbXMubGVuZ3RoIDw9IDAgJiYgdHlwZW9mIGl0ZW1zWzBdID09ICdzdHJpbmcnKSkge1xyXG5cdFx0XHR0aHJvdyBuZXcgSW52YWxpZEFyZ3VtZW50RXhjZXB0aW9uJDE7XHJcblx0XHR9XHJcblxyXG5cdFx0bGV0IHByb2R1Y3RzID0gdGhpcy5idWlsZFByb2R1Y3RzKGl0ZW1zLCB0aGlzLnNldHRpbmdzLml0ZW1fY2xhc3MsICdkaXYnKTtcclxuXHJcblx0XHR0aGlzLmVsZW1lbnQuaW5uZXJIVE1MID0gJyc7XHJcblx0XHRwcm9kdWN0cy5mb3JFYWNoKGZ1bmN0aW9uKHByb2R1Y3QpIHtcclxuXHRcdFx0dGhpcy5lbGVtZW50LmFwcGVuZENoaWxkKHByb2R1Y3QpO1xyXG5cdFx0fS5iaW5kKHRoaXMpKTtcclxuXHJcblx0XHRyZXR1cm4gaXRlbXM7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBNYWtlcyBhbiBBamF4IGNhbGwgdG8gdGhlIFxyXG5cdCAqIHNlcnZlciB3aXRob3V0IHBhcmFtZXRlcnMuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gbnVtYmVyIHwgcGFnZU51bWJlclxyXG5cdCAqIEByZXR1cm4gUHJvbWlzZVxyXG5cdCAqL1xyXG5cdGdldFByb2R1Y3RzKHBhZ2VOdW1iZXIgPSBudWxsKVxyXG5cdHtcclxuXHRcdGxldCBhY3Rpb24gPSAocGFnZU51bWJlcikgPyB0aGlzLnNldHRpbmdzLnVybCArICc/cGFnZT0nICsgcGFnZU51bWJlciA6IHRoaXMuc2V0dGluZ3MudXJsO1xyXG5cclxuXHRcdHJldHVybiBIdHRwJDIuZ2V0KHtcclxuXHRcdFx0dXJsOiBhY3Rpb24sXHJcblx0XHR9KTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEJ1aWxkcyB0aGUgaHRtbCBmb3IgdGhlIHByb2R1Y3RzLlxyXG5cdCAqIFxyXG5cdCAqIEBwYXJhbSBhcnJheSB8IGF0dHJpYnV0ZXNDb2xsZWN0aW9uXHJcblx0ICogQHBhcmFtIHN0cmluZyB8IGNsYXNzTmFtZVxyXG5cdCAqIEBwYXJhbSBzdHJpbmcgfCB0YWdUeXBlXHJcblx0ICogQHJldHVybiBhcnJheVxyXG5cdCAqL1xyXG5cdGJ1aWxkUHJvZHVjdHMoYXR0cmlidXRlc0NvbGxlY3Rpb24sIGNsYXNzTmFtZSwgdGFnVHlwZSkgXHJcblx0e1xyXG5cdFx0aWYoYXR0cmlidXRlc0NvbGxlY3Rpb24uY29uc3RydWN0b3IubmFtZSAhPSAnQXJyYXknICkge1xyXG5cdFx0XHR0aHJvdyBuZXcgSW52YWxpZEFyZ3VtZW50RXhjZXB0aW9uJDE7XHJcblx0XHR9XHJcblxyXG5cdFx0bGV0IGJ1aWx0UHJvZHVjdHMgPSBbXTtcclxuXHJcblx0XHRhdHRyaWJ1dGVzQ29sbGVjdGlvbi5mb3JFYWNoKGZ1bmN0aW9uKGF0dHJpYnV0ZXMpIHtcclxuXHRcdFx0bGV0IGJ1aWx0UHJvZHVjdCA9IHRoaXMuYnVpbGRQcm9kdWN0KGF0dHJpYnV0ZXMsIGNsYXNzTmFtZSwgdGFnVHlwZSk7XHJcblx0XHRcdGJ1aWx0UHJvZHVjdHMucHVzaChidWlsdFByb2R1Y3QpO1xyXG5cdFx0fS5iaW5kKHRoaXMpKTtcclxuXHJcblx0XHRyZXR1cm4gYnVpbHRQcm9kdWN0cztcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEJ1aWxkcyB0aGUgaHRtbCBmb3IgYSBzaW5nbGUgcHJvZHVjdC5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSBvYmplY3QgfCBhdHRyaWJ1dGVzXHJcblx0ICogQHBhcmFtIHN0cmluZyB8IGNsYXNzTmFtZVxyXG5cdCAqIEBwYXJhbSBzdHJpbmcgfCB0YWdUeXBlXHJcblx0ICogQHJldHVybiBvYmplY3RcclxuXHQgKi9cclxuXHRidWlsZFByb2R1Y3QoYXR0cmlidXRlcywgY2xhc3NOYW1lLCB0YWdUeXBlKSBcclxuXHR7XHJcblx0XHRpZiAodHlwZW9mIGF0dHJpYnV0ZXMgIT0gJ29iamVjdCcgfHwgdHlwZW9mIHRhZ1R5cGUgIT0gJ3N0cmluZycpIHtcclxuXHRcdFx0dGhyb3cgbmV3IEludmFsaWRBcmd1bWVudEV4Y2VwdGlvbiQxO1xyXG5cdFx0fVxyXG5cclxuXHRcdGNsYXNzTmFtZSA9IGNsYXNzTmFtZSB8fCBudWxsO1xyXG5cclxuXHRcdGxldCBwcm9kdWN0ID0gRE9NLmNyZWF0ZUVsZW1lbnQoJ2RpdicsIHtcclxuXHRcdFx0Y2xhc3M6ICdwcm9kdWN0J1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0RE9NLmFkZENsYXNzKHByb2R1Y3QsIGNsYXNzTmFtZSk7XHJcblxyXG5cdFx0bGV0IG92ZXJsYXkgPSBET00uY3JlYXRlRWxlbWVudCgnZGl2Jywge1xyXG5cdFx0XHRjbGFzczogJ3Byb2R1Y3Qtb3ZlcmxheScsXHJcblx0XHR9KTtcclxuXHJcblx0XHRwcm9kdWN0LmFwcGVuZENoaWxkKG92ZXJsYXkpO1xyXG5cclxuXHRcdGZvciAodmFyIGF0dHJpYnV0ZSBpbiBhdHRyaWJ1dGVzKSB7XHJcblx0XHRcdGlmICghIENvbW1vbi5pbl9hcnJheShhdHRyaWJ1dGUsIHRoaXMuc2V0dGluZ3MuYXR0cmlidXRlcykpIHtcclxuXHRcdFx0XHRjb250aW51ZTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0bGV0IHRhZyA9IERPTS5jcmVhdGVFbGVtZW50KHRhZ1R5cGUpO1xyXG5cclxuXHRcdFx0aWYgKGF0dHJpYnV0ZSA9PSAnaW1hZ2UnKSB7XHJcblx0XHRcdFx0bGV0IGltYWdlID0gRE9NLmNyZWF0ZUVsZW1lbnQoJ2ltZycsIHtcclxuXHRcdFx0XHRcdHNyYzogYXR0cmlidXRlc1thdHRyaWJ1dGVdXHJcblx0XHRcdFx0fSk7XHJcblx0XHRcdFx0cHJvZHVjdC5hcHBlbmRDaGlsZChpbWFnZSk7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0dGFnLmlubmVySFRNTCA9IGF0dHJpYnV0ZXNbYXR0cmlidXRlXSB8fCAnJztcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0RE9NLmFkZENsYXNzKHRhZywgJ3Byb2R1Y3QtJyArIFN0ci5rZWJhYkNhc2UoYXR0cmlidXRlKSk7XHJcblx0XHRcdG92ZXJsYXkuYXBwZW5kQ2hpbGQodGFnKTtcclxuXHRcdH1cclxuXHJcblx0XHRsZXQgdGFnID0gRE9NLmNyZWF0ZUVsZW1lbnQoJ2RpdicsIHtcclxuXHRcdFx0Y2xhc3M6ICdhY3Rpb24tYnV0dG9ucydcclxuXHRcdH0pO1xyXG5cclxuXHRcdGxldCBhZGRUb0NhcnQgPSBET00uY3JlYXRlRWxlbWVudCgnYnV0dG9uJywge1xyXG5cdFx0XHRjbGFzczogJ2FkZC10by1jYXJ0JyxcclxuXHRcdFx0dHlwZTogJ2J1dHRvbicsXHJcblx0XHRcdHRleHQ6ICcrJyxcclxuXHRcdH0pO1xyXG5cclxuXHRcdGxldCBmYXZvcml0ZSA9IERPTS5jcmVhdGVFbGVtZW50KCdidXR0b24nLCB7XHJcblx0XHRcdGNsYXNzOiAnZmF2b3JpdGUnLFxyXG5cdFx0XHR0eXBlOiAnYnV0dG9uJyxcclxuXHRcdFx0dGV4dDogJyZoZWFydHM7J1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0aWYgKHRoaXMuc2V0dGluZ3MuYWRkX2J1dHRvbl9jbGFzcykge1xyXG5cdFx0XHRET00uYWRkQ2xhc3MoYWRkVG9DYXJ0LCB0aGlzLnNldHRpbmdzLmFkZF9idXR0b25fY2xhc3MpO1xyXG5cdFx0fVxyXG5cclxuXHRcdGlmICh0aGlzLnNldHRpbmdzLmZhdm9yaXRlX2J1dHRvbl9jbGFzcykge1xyXG5cdFx0XHRET00uYWRkQ2xhc3MoZmF2b3JpdGUsIHRoaXMuc2V0dGluZ3MuZmF2b3JpdGVfYnV0dG9uX2NsYXNzKTtcclxuXHRcdH1cclxuXHJcblx0XHR0YWcuYXBwZW5kQ2hpbGQoYWRkVG9DYXJ0KTtcclxuXHRcdHRhZy5hcHBlbmRDaGlsZChmYXZvcml0ZSk7XHJcblxyXG5cdFx0YWRkVG9DYXJ0LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xyXG5cdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XHJcblx0XHRcdEV2ZW50TWFuYWdlciQ0LnB1Ymxpc2goJ2NhcnQucHJvZHVjdC5hZGRlZCcsIGF0dHJpYnV0ZXMpO1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0ZmF2b3JpdGUuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbihlKSB7XHJcblx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcclxuXHRcdFx0dGhpcy5pbm5lckhUTUwgPSAnJiN4MjcxMzsnO1xyXG5cdFx0XHRFdmVudE1hbmFnZXIkNC5wdWJsaXNoKCdjYXJ0LnByb2R1Y3QuZmF2b3JpdGVkJywgYXR0cmlidXRlcyk7XHJcblx0XHR9KTtcclxuXHJcblx0XHRvdmVybGF5LmFwcGVuZENoaWxkKHRhZyk7XHJcblxyXG5cdFx0cmV0dXJuIHByb2R1Y3Q7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBBZGQgdGhlIGVDb21tZXJjZSBzdHlsZSB0YWdzIHRvIHRoZSBET00uXHJcblx0ICovXHJcblx0YWRkU3R5bGVUYWcoKSBcclxuXHR7XHJcblx0XHRpZiAoRE9NLmZpbmQoJyNUdXJiby1lQ29tbWVyY2UtUHJvZHVjdHMnKSkge1xyXG5cdFx0XHRyZXR1cm47XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKHRoaXMuc2V0dGluZ3Mubm9fY3NzKSB7XHJcblx0XHRcdHJldHVybjtcclxuXHRcdH1cclxuXHJcblx0XHRsZXQgd2lkdGggPSB0aGlzLnNldHRpbmdzLndpZHRoIHx8ICdhdXRvJztcclxuXHRcdGxldCBoZWlnaHQgPSB0aGlzLnNldHRpbmdzLmhlaWdodCB8fCAnMjAwcHgnO1xyXG5cdFx0bGV0IG1pbldpZHRoID0gdGhpcy5zZXR0aW5ncy5taW5fd2lkdGggfHwgJzIwMHB4JztcclxuXHRcdGxldCBtYXhXaWR0aCA9IHRoaXMuc2V0dGluZ3MubWF4X3dpZHRoIHx8ICcyNTBweCc7XHJcblxyXG5cdFx0bGV0IGNzcyA9IGBcclxuXHRcdFx0LnByb2R1Y3Qge1xyXG5cdFx0XHRcdHBvc2l0aW9uOiByZWxhdGl2ZTtcclxuXHRcdFx0XHRtYXJnaW46IDVweCA1cHg7XHJcblx0XHRcdFx0Ym9yZGVyOiAxcHggc29saWQgI2U0ZTRlNDtcclxuXHRcdFx0XHR3aWR0aDogJHt3aWR0aH07XHJcblx0XHRcdFx0bWluLXdpZHRoOiAke21pbldpZHRofTtcclxuXHRcdFx0XHRtYXgtd2lkdGg6ICR7bWF4V2lkdGh9O1xyXG5cdFx0XHRcdGhlaWdodDogJHtoZWlnaHR9O1xyXG5cdFx0XHRcdGN1cnNvcjogcG9pbnRlcjtcclxuXHRcdFx0XHRjb2xvcjogI2ZmZmZmZjtcclxuXHRcdFx0XHRvdmVyZmxvdzogaGlkZGVuO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHQucHJvZHVjdCA+IC5wcm9kdWN0LW92ZXJsYXkge1xyXG5cdFx0XHRcdHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuXHRcdFx0XHR0b3A6IDA7XHJcblx0XHRcdFx0bGVmdDogMDtcclxuXHRcdFx0XHR3aWR0aDogMTAwJTtcclxuXHRcdFx0XHRoZWlnaHQ6IDEwMCU7XHJcblx0XHRcdFx0b3BhY2l0eTogMC41O1xyXG5cdFx0XHRcdHotaW5kZXg6IDU7XHJcblx0XHRcdFx0dHJhbnNpdGlvbjogMXMgYWxsO1xyXG5cdFx0XHRcdHRyYW5zZm9ybTogdHJhbnNsYXRlWCgtMjUwcHgpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHQucHJvZHVjdDpob3ZlciA+IC5wcm9kdWN0LW92ZXJsYXkge1xyXG5cdFx0XHRcdGJhY2tncm91bmQ6IHJnYmEoMCwgMCwgMCwgMC40NSk7XHJcblx0XHRcdFx0dHJhbnNmb3JtOiB0cmFuc2xhdGVYKDBweCk7XHJcblx0XHRcdFx0b3BhY2l0eTogMTtcclxuXHRcdFx0XHR0cmFuc2l0aW9uOiAwLjVzIGFsbDtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0LnByb2R1Y3QgPiBpbWcge1xyXG5cdFx0XHRcdHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuXHRcdFx0XHRsZWZ0OiAwO1xyXG5cdFx0XHRcdHRvcDogMDtcclxuXHRcdFx0XHR3aWR0aDogMTAwJTtcclxuXHRcdFx0XHRoZWlnaHQ6IDEwMCU7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdC5wcm9kdWN0ID4gLnByb2R1Y3QtaW1hZ2Uge1xyXG5cdFx0XHRcdHotaW5kZXg6IDA7XHJcblx0XHRcdFx0cG9zaXRpb246IGFic29sdXRlO1xyXG5cdFx0XHRcdHRvcDogMDtcclxuXHRcdFx0XHRsZWZ0OiAwO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHQucHJvZHVjdCA+IC5wcm9kdWN0LW92ZXJsYXkgPiAucHJvZHVjdC1uYW1lLCBcclxuXHRcdFx0LnByb2R1Y3QgPiAucHJvZHVjdC1vdmVybGF5ID4gLnByb2R1Y3QtcHJpY2UsXHJcblx0XHRcdC5wcm9kdWN0ID4gLnByb2R1Y3Qtb3ZlcmxheSA+IC5wcm9kdWN0LWRlbGl2ZXJ5LXRpbWUge1xyXG5cdFx0XHRcdHotaW5kZXg6IDE7XHJcblx0XHRcdFx0cG9zaXRpb246IHJlbGF0aXZlO1xyXG5cdFx0XHRcdHRleHQtYWxpZ246IGNlbnRlcjtcclxuXHRcdFx0XHRtYXJnaW4tdG9wOiAyNXB4O1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHQucHJvZHVjdCA+IC5wcm9kdWN0LW92ZXJsYXkgPiAuYWN0aW9uLWJ1dHRvbnMge1xyXG5cdFx0XHRcdHdpZHRoOiAxMDAlO1xyXG5cdFx0XHRcdG1hcmdpbi10b3A6IDEwcHg7XHJcblx0XHRcdFx0dGV4dC1hbGlnbjogY2VudGVyO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHQucHJvZHVjdCA+IC5wcm9kdWN0LW92ZXJsYXkgPiAuYWN0aW9uLWJ1dHRvbnMgPiAuZmF2b3JpdGUge1xyXG5cdFx0XHRcdG1hcmdpbi1sZWZ0OiAxMHB4O1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0YDtcclxuXHQgICAgXHJcblx0ICAgIERPTS5hZGRTdHlsZSgnVHVyYm8tZUNvbW1lcmNlLVByb2R1Y3RzJywgY3NzKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEhpZGVzIHRoZSBjb21wb25lbnQgZnJvbSB0aGUgRE9NLlxyXG5cdCAqXHJcblx0ICogQHJldHVybiB2b2lkIFxyXG5cdCAqL1xyXG5cdGhpZGUoKVxyXG5cdHtcclxuXHRcdHRoaXMuZWxlbWVudC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xyXG5cdH1cclxufVxuXG4vKipcclxuICogVGhlIFNlcnZpY2VzIE9iamVjdCwgaGFuZGxlcyB0aGUgc2VydmljZXMuXHJcbiAqL1xyXG5jbGFzcyBTZXJ2aWNlcyBcclxue1xyXG5cclxufVxuXG5jbGFzcyBVcmxcclxue1xyXG5cdCBzdGF0aWMgcHJvY2Vzc0FqYXhEYXRhKHNlbGVjdG9yLCBjb250ZW50LCB1cmxQYXRoKVxyXG5cdCB7XHJcblx0ICAgIGxldCBjb250ZXh0ID0gRE9NLmZpbmQoc2VsZWN0b3IpO1xyXG5cclxuXHQgICAgY29udGV4dC5pbm5lckhUTUwgPSBjb250ZW50O1xyXG5cdCAgICBsZXQgdGl0bGUgPSBET00uZmluZCgndGl0bGUnLCBjb250ZXh0KTtcclxuXHQgICAgZG9jdW1lbnQudGl0bGUgPSB0aXRsZS5pbm5lckhUTUw7XHJcblx0ICAgIHdpbmRvdy5oaXN0b3J5LnB1c2hTdGF0ZSh7XCJodG1sXCI6Y29udGVudCxcInBhZ2VUaXRsZVwiOiB0aXRsZS5pbm5lckhUTUx9LCBcIlwiLCB1cmxQYXRoKTtcclxuXHJcblx0IFx0d2luZG93Lm9ucG9wc3RhdGUgPSBmdW5jdGlvbihlKSB7XHJcblx0XHQgICAgaWYgKGUuc3RhdGUpIHtcclxuXHRcdCAgICAgICAgY29udGV4dC5pbm5lckhUTUwgPSBlLnN0YXRlLmh0bWw7XHJcblx0XHQgICAgICAgIGRvY3VtZW50LnRpdGxlID0gZS5zdGF0ZS5wYWdlVGl0bGU7XHJcblx0XHQgICAgfVxyXG5cdFx0fTtcclxuXHQgfVxyXG5cclxuXHQvKipcclxuXHQgKiBNb2RpZmllcyB0aGUgZ2V0IHBhcmFtZXRlciBpbiB0aGUgdXJsLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIHN0cmluZyB8IHVybFxyXG5cdCAqIEBwYXJhbSBzdHJpbmcgfCBrZXlcclxuXHQgKiBAcGFyYW0gbnVtYmVyIHwgdmFsdWVcclxuXHQgKiBAcGFyYW0gc3RyaW5nIHwgc2VwYXJhdG9yXHJcblx0ICogQHJldHVybiBzdHJpbmdcclxuXHQgKi9cclxuXHRzdGF0aWMgY2hhbmdlUXVlcnlQYXJhbWV0ZXJWYWx1ZSh1cmwsIGtleSwgdmFsdWUsIHNlcGFyYXRvciA9ICc9JykgXHJcblx0e1xyXG5cdFx0bGV0IHJlZ0V4cCA9IG5ldyBSZWdFeHAoXCIoWz8mXSlcIiArIGtleSArIHNlcGFyYXRvciArIFwiLio/KCZ8JClcIiwgXCJpXCIpO1xyXG5cdFx0bGV0IHBhaXJTZXBhcmF0b3IgPSB1cmwuaW5kZXhPZignPycpICE9PSAtMSA/IFwiJlwiIDogXCI/XCI7XHJcblx0XHQgIFxyXG5cdFx0aWYgKHVybC5tYXRjaChyZWdFeHApKSB7XHJcblx0XHRcdHJldHVybiB1cmwucmVwbGFjZShyZWdFeHAsICckMScgKyBrZXkgKyBzZXBhcmF0b3IgKyB2YWx1ZSArICckMicpO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdCAgICByZXR1cm4gdXJsICsgcGFpclNlcGFyYXRvciArIGtleSArIHNlcGFyYXRvciArIHZhbHVlO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQ2hhbmdlcyB0aGUgdXJsIHRvIGEgZ2l2ZW4gcGFnZSBudW1iZXIuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gc3RyaW5nIHwgcGFyYW1ldGVyS2V5XHJcblx0ICogQHBhcmFtIHN0cmluZyB8IHBhcmFtZXRlclZhbHVlXHJcblx0ICogQHBhcmFtIHN0cmluZyB8IHNlcGFyYXRvclxyXG5cdCAqIEByZXR1cm4gdm9pZFxyXG5cdCAqL1xyXG5cdHN0YXRpYyBjaGFuZ2UocGFyYW1ldGVyS2V5LCBwYXJhbWV0ZXJWYWx1ZSwgc2VwYXJhdG9yID0gJz0nKVxyXG5cdHtcclxuXHRcdHBhcmFtZXRlclZhbHVlID0gIHBhcmFtZXRlclZhbHVlIHx8IHRoaXMucXVlcnlTdHJpbmcoKVtwYXJhbWV0ZXJLZXldO1xyXG5cdFx0bGV0IHJlcXVlc3RlZFVybCA9IHRoaXMuY2hhbmdlUXVlcnlQYXJhbWV0ZXJWYWx1ZSh3aW5kb3cubG9jYXRpb24uaHJlZiwgcGFyYW1ldGVyS2V5LCBwYXJhbWV0ZXJWYWx1ZSwgc2VwYXJhdG9yKTtcclxuXHRcdGNvbnNvbGUubG9nKHJlcXVlc3RlZFVybCk7XHJcblx0XHR3aW5kb3cuaGlzdG9yeS5yZXBsYWNlU3RhdGUoJycsICcnLCByZXF1ZXN0ZWRVcmwpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogR2V0IHRoZSBnZXQgdmFyaWFibGVzIGZyb20gdGhlIHVybC5cclxuXHQgKlxyXG5cdCAqIEByZXR1cm4gYXJyYXlcclxuXHQgKi9cclxuXHRzdGF0aWMgcXVlcnlTdHJpbmcoKSBcclxuXHR7XHJcblx0XHRsZXQgdmFycyA9IHt9O1xyXG5cdFx0bGV0IHBhcnRzID0gd2luZG93LmxvY2F0aW9uLmhyZWYucmVwbGFjZSgvWz8mXSsoW149Jl0rKT0oW14mXSopL2dpLCBmdW5jdGlvbihtLCBrZXksIHZhbHVlKSB7XHJcblx0XHRcdHZhcnNba2V5XSA9IHZhbHVlO1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0cmV0dXJuIHZhcnM7XHJcblx0fVxyXG5cclxuXHJcbn1cblxubGV0IGRlZmF1bHRNZXNzYWdlJDQgPSAnU29ycnksIG5vIG1vcmUgcGFnZXMuJztcclxuXHJcbmNsYXNzIE5vdEluUGFnZVJhbmdlRXhjZXB0aW9uIGV4dGVuZHMgRXhjZXB0aW9uSGFuZGxlclxyXG57XHJcblx0Y29uc3RydWN0b3IobWVzc2FnZSA9IG51bGwpIFxyXG5cdHtcclxuXHRcdG1lc3NhZ2UgPSBtZXNzYWdlIHx8IGRlZmF1bHRNZXNzYWdlJDQ7XHJcblx0XHRzdXBlcigpO1xyXG4gICAgXHRzdXBlci5zdGFja1RyYWNlKHRoaXMsIG1lc3NhZ2UpO1xyXG4gICAgfVxyXG59XG5cbi8qKlxyXG4gKiBAZmlsZSBcclxuICogUGFnaW5hdGlvbiBjbGFzcy5cclxuICpcclxuICogVGhlIFBhZ2luYXRpb24gY29tcG9uZW50LCBoYW5kbGVzIHRoZSBwYWdpbmF0aW9uLlxyXG4gKi9cclxuXHJcbi8qKlxyXG4gKiBUaGUgZGVmYXVsdCBzZXR0aW5ncyBvZiB0aGUgcGFnaW5hdGlvbi5cclxuICpcclxuICogQHZhciBvYmplY3RcclxuICovXHJcbmxldCBkZWZhdWx0U2V0dGluZ3MkNSA9IHtcclxuXHRlbGVtZW50OiAnLnBhZ2luYXRpb24nLFxyXG5cdHByb2NjZXNzaW5nOiAnY2xpZW50LXNpZGUnLFxyXG5cdGNsYXNzOiAnJyxcclxuXHRwZXJfcGFnZTogNSxcclxuXHR0b3RhbF9pdGVtczogNSxcclxuXHR1cmxfcGFyYW1ldGVyOiAncGFnZScsXHJcblx0c2VwYXJhdG9yOiAnIycgXHJcbn07XHJcblxyXG4vKipcclxuICogU3RvcmVzIHRoZSBjb250YWluZXIgb2JqZWN0LlxyXG4gKlxyXG4gKiBAdmFyIFxcQ29yZVxcQ29udGFpbmVyXHJcbiAqL1xyXG5sZXQgQ29udGFpbmVyJDQ7XHJcblxyXG4vKipcclxuICogU3RvcmVzIHRoZSBwcm9kdWN0cyBjb21wb25lbnQuXHJcbiAqXHJcbiAqIEB2YXIgXFxDb21wb25lbnRzXFxQcm9kdWN0c1xyXG4gKi9cclxubGV0IFByb2R1Y3RzJDI7XHJcblxyXG4vKipcclxuICogU3RvcmVzIHRoZSBjb250YWluZXIgb2JqZWN0LlxyXG4gKiBcclxuICogQHZhciBcXENvcmVcXEV2ZW50TWFuYWdlclxyXG4gKi9cclxubGV0IEV2ZW50TWFuYWdlciQ1O1xyXG5cclxuY2xhc3MgUGFnaW5hdGlvbiBcclxue1xyXG5cdC8qKlxyXG5cdCAqIC0gSW5pdGlhbGl6ZSB0aGUgY29udGFpbmVyIG9iamVjdC5cclxuXHQgKiAtIEluaXRpYWxpemUgdGhlIHByb2R1Y3RzIGNvbXBvbmVudC5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSBcXENvcmVcXENvbnRhaW5lciB8IGNvbnRhaW5lclxyXG5cdCAqIEBwYXJhbSBcXENvbXBvbmVudHNcXFByb2R1Y3RzIHwgcHJvZHVjdHNcclxuXHQgKiBAcmV0dXJuIHZvaWRcclxuXHQgKi9cclxuXHRjb25zdHJ1Y3Rvcihjb250YWluZXIsIHByb2R1Y3RzLCBldmVudHMpIFxyXG5cdHtcclxuXHRcdENvbnRhaW5lciQ0ID0gY29udGFpbmVyO1xyXG5cdFx0UHJvZHVjdHMkMiA9IHByb2R1Y3RzO1xyXG5cdFx0RXZlbnRNYW5hZ2VyJDUgPSBldmVudHM7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBTZXR1cCB0aGUgcGFnaW5hdGlvbi5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSBvYmplY3QgfCBzZXR0aW5nc1xyXG5cdCAqIEByZXR1cm4gdm9pZFxyXG5cdCAqL1xyXG5cdHNldHVwKHNldHRpbmdzKVxyXG5cdHtcdFxyXG5cdFx0aWYodHlwZW9mIHNldHRpbmdzICE9ICdvYmplY3QnKSB7XHJcblx0XHRcdHRocm93IG5ldyBJbnZhbGlkQXJndW1lbnRFeGNlcHRpb24kMTtcclxuXHRcdH1cclxuXHJcblx0XHR0aGlzLnNldHRpbmdzID0gQ29tbW9uLmV4dGVuZChkZWZhdWx0U2V0dGluZ3MkNSwgc2V0dGluZ3MpO1xyXG5cdFx0dGhpcy5zZXRDdXJyZW50KDEpO1xyXG5cclxuXHRcdGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCBmdW5jdGlvbigpIHtcdFx0XHJcblx0XHRcdHRoaXMuc2V0RWxlbWVudCh0aGlzLnNldHRpbmdzLmVsZW1lbnQpO1xyXG5cclxuXHRcdFx0Ly8gTGlzdGVuIHRvIHdoZW4gcHJvZHVjdHMgYXJlIGJlaW5nIGxvYWRlZCBhbmQgdXBkYXRlIHRoZSBwYWdpbmF0aW9uXHJcblx0XHRcdC8vIHdpdGggdGhlIGFjdHVhbCBpdGVtcyBjb3VudC5cclxuXHRcdFx0RXZlbnRNYW5hZ2VyJDUuc3Vic2NyaWJlKCdwcm9kdWN0cy5sb2FkZWQnLCBmdW5jdGlvbihwcm9kdWN0cykge1xyXG5cdFx0XHRcdHRoaXMudG90YWxQYWdlcyA9IHRoaXMuY2FsY3VsYXRlVG90YWxQYWdlcyh0aGlzLnNldHRpbmdzLnBlcl9wYWdlLCBwcm9kdWN0cy5sZW5ndGgpO1xyXG5cdFx0XHRcdHRoaXMuYnVpbGRQYWdpbmF0aW9uKCk7XHJcblx0XHRcdH0uYmluZCh0aGlzKSk7XHJcblxyXG5cdFx0XHQvLyBBcyBhIGZhbGxiYWNrIGNob29zZSB0aGUgdXNlcidzIHNldHRpbmdzIGZvciB0aGUgdG90YWwgaXRlbXMgY291bnQuXHJcblx0XHRcdHRoaXMudG90YWxQYWdlcyA9IHRoaXMuY2FsY3VsYXRlVG90YWxQYWdlcyh0aGlzLnNldHRpbmdzLnBlcl9wYWdlLCB0aGlzLnNldHRpbmdzLnRvdGFsX2l0ZW1zKTtcclxuXHRcdFx0dGhpcy5idWlsZFBhZ2luYXRpb24oKTtcclxuXHRcdH0uYmluZCh0aGlzKSk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBCdWlsZHMgdGhlIHBhZ2luYXRpb24uXHJcblx0ICpcclxuXHQgKiBAcmV0dXJuIHZvaWRcclxuXHQgKi9cclxuXHRidWlsZFBhZ2luYXRpb24oKVxyXG5cdHtcclxuXHRcdHRoaXMubGlua3MgPSB0aGlzLmNyZWF0ZUxpbmtzKCk7XHJcblx0XHR0aGlzLnJlcGxhY2VMaW5rcyh0aGlzLmxpbmtzKTtcclxuXHRcdHRoaXMuYmluZEV2ZW50TGlzdGVuZXJzKHRoaXMubGlua3MpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogU2V0cyB0aGUgZWxlbWVudC5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSBzdHJpbmcgfCBzZWxlY3RvclxyXG5cdCAqIEByZXR1cm4gdm9pZFxyXG5cdCAqL1xyXG5cdHNldEVsZW1lbnQoc2VsZWN0b3IpXHJcblx0e1xyXG5cdFx0dGhpcy5lbGVtZW50ID0gRE9NLmZpbmQoc2VsZWN0b3IpO1xyXG5cdFx0XHJcblx0XHRET00uYWRkQ2xhc3ModGhpcy5lbGVtZW50LCB0aGlzLnNldHRpbmdzLmNsYXNzKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFJlcGxhY2VzIHRoZSBsaW5rcyBpbiB0aGUgZWxlbWVudC5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSBIVE1MVUxpc3RFbGVtZW50IHwgbGlua3NcclxuXHQgKiBAcmV0dXJuIHZvaWRcclxuXHQgKi9cclxuXHRyZXBsYWNlTGlua3MobGlua3MpXHJcblx0e1xyXG5cdFx0dGhpcy5lbGVtZW50LmlubmVySFRNTCA9ICcnO1xyXG5cdFx0dGhpcy5lbGVtZW50LmFwcGVuZENoaWxkKGxpbmtzKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIENhbGN1bGF0ZXMgdGhlIHRvdGFsIHBhZ2VzLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIG51bWJlciB8IHBlclBhZ2VcclxuXHQgKiBAcGFyYW0gbnVtYmVyIHwgdG90YWxJdGVtc1xyXG5cdCAqIEByZXR1cm4gbnVtYmVyXHJcblx0ICovXHJcblx0Y2FsY3VsYXRlVG90YWxQYWdlcyhwZXJQYWdlLCB0b3RhbEl0ZW1zKVxyXG5cdHtcclxuXHRcdHBlclBhZ2UgPSBwYXJzZUludChwZXJQYWdlKTtcclxuXHRcdHRvdGFsSXRlbXMgPSBwYXJzZUludCh0b3RhbEl0ZW1zKTtcclxuXHJcblx0XHRyZXR1cm4gTWF0aC5jZWlsKHRvdGFsSXRlbXMgLyBwZXJQYWdlKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEJpbmRzIHRoZSBidXR0b25zIGV2ZW50cyBsaXN0ZW5lcnMuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gSFRNTFVMaXN0RWxlbWVudCB8IGxpbmtzXHJcblx0ICogQHJldHVybiB2b2lkXHJcblx0ICovXHJcblx0YmluZEV2ZW50TGlzdGVuZXJzKGxpbmtzKSBcclxuXHR7XHJcblx0XHRsZXQgaW5zdGFuY2UgPSB0aGlzO1xyXG5cclxuXHRcdHRoaXMubmV4dC5jaGlsZE5vZGVzWzBdLm9uY2xpY2sgPSBmdW5jdGlvbihlKSB7XHJcblx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcclxuXHJcblx0XHRcdGxldCByZXF1ZXN0ZWRQYWdlID0gaW5zdGFuY2UuY3VycmVudCsxO1xyXG5cclxuXHRcdFx0aWYgKGluc3RhbmNlLm5vdEluUGFnZVJhbmdlKHJlcXVlc3RlZFBhZ2UpKSB7XHJcblx0XHRcdFx0dGhyb3cgbmV3IE5vdEluUGFnZVJhbmdlRXhjZXB0aW9uKCdUaGUgcGFnZSB5b3UgcmVxdWVzdGluZyBkb2VzIG5vdCBleGlzdHMnKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0UHJvZHVjdHMkMi5sb2FkUHJvZHVjdHMocmVxdWVzdGVkUGFnZSkudGhlbihmdW5jdGlvbihwcm9kdWN0cykge1xyXG5cdFx0XHRcdGluc3RhbmNlLnNldEN1cnJlbnQocmVxdWVzdGVkUGFnZSk7XHJcblx0XHRcdH0pO1xyXG5cdFx0fTtcclxuXHJcblx0XHR0aGlzLnByZXZpb3VzLmNoaWxkTm9kZXNbMF0ub25jbGljayA9IGZ1bmN0aW9uKGUpIHtcclxuXHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuXHRcdFx0bGV0IHJlcXVlc3RlZFBhZ2UgPSBpbnN0YW5jZS5jdXJyZW50LTE7XHJcblxyXG5cdFx0XHRpZihpbnN0YW5jZS5ub3RJblBhZ2VSYW5nZShyZXF1ZXN0ZWRQYWdlKSkge1xyXG5cdFx0XHRcdHRocm93IG5ldyBOb3RJblBhZ2VSYW5nZUV4Y2VwdGlvbignVGhlIHBhZ2UgeW91IHJlcXVlc3RpbmcgZG9lcyBub3QgZXhpc3RzJyk7XHJcblx0XHRcdH1cclxuXHRcdFx0XHJcblx0XHRcdFByb2R1Y3RzJDIubG9hZFByb2R1Y3RzKHJlcXVlc3RlZFBhZ2UpLnRoZW4oZnVuY3Rpb24ocHJvZHVjdHMpIHtcclxuXHRcdFx0XHRpbnN0YW5jZS5zZXRDdXJyZW50KHJlcXVlc3RlZFBhZ2UpO1xyXG5cdFx0XHR9KTtcclxuXHRcdH07XHJcblxyXG5cdFx0Zm9yKHZhciBpID0gMDsgaSA8IHRoaXMucGFnZXMubGVuZ3RoOyBpKyspIHtcclxuXHRcdFx0dGhpcy5wYWdlc1tpXS5jaGlsZE5vZGVzWzBdLm9uY2xpY2sgPSBmdW5jdGlvbihlKSB7XHJcblx0XHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdFx0XHRcdFxyXG5cdFx0XHRcdGxldCByZXF1ZXN0ZWRQYWdlID0gdGhpcy5nZXRBdHRyaWJ1dGUoJ2RhdGEtcGFnZS1ucicpO1xyXG5cdFx0XHRcdFxyXG5cdFx0XHRcdFByb2R1Y3RzJDIubG9hZFByb2R1Y3RzKHJlcXVlc3RlZFBhZ2UpLnRoZW4oZnVuY3Rpb24ocHJvZHVjdHMpIHtcclxuXHRcdFx0XHRcdGluc3RhbmNlLnNldEN1cnJlbnQocmVxdWVzdGVkUGFnZSk7XHJcblx0XHRcdFx0fSk7XHJcblx0XHRcdH07XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBTZXRzIHRoZSBjdXJyZW50IHBhZ2UuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gbnVtYmVyIHwgcGFnZU51bWJlclxyXG5cdCAqIEByZXR1cm4gdm9pZFxyXG5cdCAqL1xyXG5cdHNldEN1cnJlbnQocGFnZU51bWJlcikgXHJcblx0e1xyXG5cdFx0dGhpcy5jdXJyZW50ID0gcGFyc2VJbnQocGFnZU51bWJlcik7XHJcblx0XHR0aGlzLmNoYW5nZVVybChwYWdlTnVtYmVyKTtcclxuXHRcdHRoaXMuc2V0QWN0aXZlTGluayhwYWdlTnVtYmVyKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEdldHMgdGhlIGN1cnJlbnQgcGFnZS5cclxuXHQgKlxyXG5cdCAqIEByZXR1cm4gbnVtYmVyXHJcblx0ICovXHJcblx0Z2V0Q3VycmVudCgpIFxyXG5cdHtcclxuXHRcdHJldHVybiB0aGlzLmN1cnJlbnQ7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBDcmVhdGVzIHRoZSBwYWdpbmF0aW9uIGxpbmtzLlxyXG5cdCAqXHJcblx0ICogQHJldHVybiBIVE1MVUxpc3RFbGVtZW50XHJcblx0ICovXHJcblx0Y3JlYXRlTGlua3MoKSBcclxuXHR7XHJcblx0XHRsZXQgdWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd1bCcpO1xyXG5cdFx0XHJcblx0XHR0aGlzLnBhZ2VzID0gdGhpcy5jcmVhdGVQYWdlTGlua3MoKTtcclxuXHRcdHRoaXMucHJldmlvdXMgPSB0aGlzLmNyZWF0ZVByZXZpb3VzQnV0dG9uKCk7XHJcblx0XHR0aGlzLm5leHQgPSB0aGlzLmNyZWF0ZU5leHRCdXR0b24oKTtcclxuXHJcblx0XHR1bC5jbGFzc05hbWUgPSAncGFnaW5hdGlvbic7XHJcblx0XHR1bC5hcHBlbmRDaGlsZCh0aGlzLnByZXZpb3VzKTtcclxuXHJcblx0XHR0aGlzLnBhZ2VzLmZvckVhY2goZnVuY3Rpb24ocGFnZSkge1xyXG5cdFx0XHR1bC5hcHBlbmRDaGlsZChwYWdlKTtcclxuXHRcdH0pO1xyXG5cclxuXHRcdHVsLmFwcGVuZENoaWxkKHRoaXMubmV4dCk7XHJcblxyXG5cdFx0cmV0dXJuIHVsO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQ3JlYXRlcyB0aGUgcGFnZXMgaXRlbSBsaW5rcy5cclxuXHQgKlxyXG5cdCAqIEByZXR1cm4gYXJyYXk8SFRNTExJRWxlbWVudD5cclxuXHQgKi9cclxuXHRjcmVhdGVQYWdlTGlua3MoKSBcclxuXHR7XHJcblx0XHR2YXIgcGFnZXMgPSBbXTtcclxuXHJcblx0XHRmb3IodmFyIGkgPSAxOyBpIDw9IHRoaXMudG90YWxQYWdlczsgaSsrKSB7XHJcblx0XHRcdHZhciBwYWdlSXRlbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJyk7XHJcblx0XHRcdHZhciBsaW5rID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpO1xyXG5cdFx0XHRwYWdlSXRlbS5jbGFzc05hbWUgPSAodGhpcy5jdXJyZW50ID09IGkpID8gJ3BhZ2UtaXRlbSBhY3RpdmUnIDogJ3BhZ2UtaXRlbSc7XHJcblx0XHRcdGxpbmsuY2xhc3NOYW1lID0gJ3BhZ2UtbGluayc7XHJcblx0XHRcdGxpbmsuc2V0QXR0cmlidXRlKCdocmVmJywgJz9wYWdlPScrIGkpO1xyXG5cdFx0XHRsaW5rLnNldEF0dHJpYnV0ZSgnZGF0YS1wYWdlLW5yJywgaSk7XHJcblx0XHRcdGxpbmsuaW5uZXJIVE1MID0gaTtcclxuXHRcdFx0cGFnZUl0ZW0uYXBwZW5kQ2hpbGQobGluayk7XHJcblx0XHRcdHBhZ2VzLnB1c2gocGFnZUl0ZW0pO1xyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiBwYWdlcztcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIENyZWF0ZXMgdGhlIHByZXZpb3VzIGJ1dHRvbiBsaW5rLlxyXG5cdCAqXHJcblx0ICogQHJldHVybiBIVE1MTElFbGVtZW50XHJcblx0ICovXHJcblx0Y3JlYXRlUHJldmlvdXNCdXR0b24oKSBcclxuXHR7XHJcblx0XHR2YXIgbGkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaScpO1xyXG5cdFx0dmFyIGxpbmsgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJyk7XHJcblx0XHR2YXIgc3BhbjEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XHJcblx0XHR2YXIgc3BhbjIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XHJcblx0XHRcclxuXHRcdFxyXG5cdFx0bGkuY2xhc3NOYW1lID0gJ3BhZ2UtaXRlbSc7XHJcblx0XHRsaW5rLmNsYXNzTmFtZSA9ICdwYWdlLWxpbmsnO1xyXG5cdFx0c3BhbjIuY2xhc3NOYW1lID0gJ3NyLW9ubHknO1xyXG5cclxuXHRcdGxpbmsuc2V0QXR0cmlidXRlKCdocmVmJywgJycpO1xyXG5cdFx0bGluay5zZXRBdHRyaWJ1dGUoJ2FyaWEtbGFiZWwnLCAnUHJldmlvdXMnKTtcclxuXHRcdHNwYW4xLnNldEF0dHJpYnV0ZSgnYXJpYS1oaWRkZW4nLCAndHJ1ZScpO1xyXG5cclxuXHRcdHNwYW4xLmlubmVySFRNTCA9ICcmbGFxdW87JztcclxuXHRcdHNwYW4yLmlubmVySFRNTCA9ICdQcmV2aW91cyc7XHJcblxyXG5cdFx0bGluay5hcHBlbmRDaGlsZChzcGFuMSk7XHJcblx0XHRsaW5rLmFwcGVuZENoaWxkKHNwYW4yKTtcclxuXHRcdGxpLmFwcGVuZENoaWxkKGxpbmspO1xyXG5cclxuXHRcdHJldHVybiBsaTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIENyZWF0ZXMgdGhlIG5leHQgYnV0dG9uIGxpbmsuXHJcblx0ICpcclxuXHQgKiBAcmV0dXJuIEhUTUxMSUVsZW1lbnRcclxuXHQgKi9cclxuXHRjcmVhdGVOZXh0QnV0dG9uKCkgXHJcblx0e1xyXG5cdFx0dmFyIGxpID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKTtcclxuXHRcdHZhciBsaW5rID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpO1xyXG5cdFx0dmFyIHNwYW4xID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xyXG5cdFx0dmFyIHNwYW4yID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xyXG5cdFx0XHJcblx0XHRsaS5jbGFzc05hbWUgPSAncGFnZS1pdGVtJztcclxuXHRcdGxpbmsuY2xhc3NOYW1lID0gJ3BhZ2UtbGluayc7XHJcblx0XHRzcGFuMi5jbGFzc05hbWUgPSAnc3Itb25seSc7XHJcblxyXG5cdFx0bGluay5zZXRBdHRyaWJ1dGUoJ2hyZWYnLCAnJyk7XHJcblx0XHRsaW5rLnNldEF0dHJpYnV0ZSgnYXJpYS1sYWJlbCcsICdOZXh0Jyk7XHJcblx0XHRzcGFuMS5zZXRBdHRyaWJ1dGUoJ2FyaWEtaGlkZGVuJywgJ3RydWUnKTtcclxuXHJcblx0XHRzcGFuMS5pbm5lckhUTUwgPSAnJnJhcXVvOyc7XHJcblx0XHRzcGFuMi5pbm5lckhUTUwgPSAnTmV4dCc7XHJcblxyXG5cdFx0bGluay5hcHBlbmRDaGlsZChzcGFuMSk7XHJcblx0XHRsaW5rLmFwcGVuZENoaWxkKHNwYW4yKTtcclxuXHRcdGxpLmFwcGVuZENoaWxkKGxpbmspO1xyXG5cclxuXHRcdHJldHVybiBsaTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIENoZWNrcyBpZiB0aGUgZ2l2ZW4gcGFnZSBpcyBpbiByYW5nZS5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSBudW1iZXIgfCBwYWdlTnVtYmVyXHJcblx0ICogQHJldHVybiBib29sXHJcblx0ICovXHJcblx0bm90SW5QYWdlUmFuZ2UocGFnZU51bWJlcikgXHJcblx0e1xyXG5cdFx0cmV0dXJuIChwYWdlTnVtYmVyID4gdGhpcy50b3RhbFBhZ2VzIHx8IHBhZ2VOdW1iZXIgPD0gMCkgfHwgaXNOYU4ocGFnZU51bWJlcik7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBDaGFuZ2VzIHRoZSB1cmwgdG8gYSBnaXZlbiBwYWdlIG51bWJlci5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSBudW1iZXIgfCBwYWdlTnVtYmVyXHJcblx0ICogQHJldHVybiB2b2lkXHJcblx0ICovXHJcblx0Y2hhbmdlVXJsKHBhZ2VOdW1iZXIpIFxyXG5cdHtcclxuXHRcdFVybC5jaGFuZ2UodGhpcy5zZXR0aW5ncy51cmxfcGFyYW1ldGVyLCBwYWdlTnVtYmVyLCB0aGlzLnNldHRpbmdzLnNlcGFyYXRvcik7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBTZXRzIHRoZSBhY3RpdmUgbGluay5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSBudW1iZXIgfCBwYWdlTnVtYmVyXHJcblx0ICogQHJldHVybiB2b2lkXHJcblx0ICovXHJcblx0c2V0QWN0aXZlTGluayhwYWdlTnVtYmVyKVxyXG5cdHtcclxuXHRcdGZvcih2YXIgcGFnZSBpbiB0aGlzLnBhZ2VzKSB7XHJcblx0XHRcdGlmICh0aGlzLnBhZ2VzW3BhZ2VdLmNoaWxkTm9kZXNbMF0uZ2V0QXR0cmlidXRlKCdkYXRhLXBhZ2UtbnInKSA9PSBwYWdlTnVtYmVyKSB7XHJcblx0XHRcdFx0RE9NLmFkZENsYXNzKHRoaXMucGFnZXNbcGFnZV0sICdhY3RpdmUnKTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRET00ucmVtb3ZlQ2xhc3ModGhpcy5wYWdlc1twYWdlXSwgJ2FjdGl2ZScpO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBSZXNldHMgdGhlIHBhZ2luYXRpb24uXHJcblx0ICpcclxuXHQgKiBAcmV0dXJuIHZvaWRcclxuXHQgKi9cclxuXHRyZXNldCgpIFxyXG5cdHtcclxuXHRcdHRoaXMuc2V0Q3VycmVudCgxKTtcclxuXHRcdHRoaXMuY2hhbmdlVXJsKDEpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogSGlkZXMgdGhlIGNvbXBvbmVudCBmcm9tIHRoZSBET00uXHJcblx0ICpcclxuXHQgKiBAcmV0dXJuIHZvaWQgXHJcblx0ICovXHJcblx0aGlkZSgpXHJcblx0e1xyXG5cdFx0dGhpcy5lbGVtZW50LnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcblx0fVxyXG59XG5cbmxldCBkZWZhdWx0TWVzc2FnZSQ1ID0gJ0luIG9yZGVyIHRvIHVzZSBjb21wb25lbnRzIHlvdSBtdXN0IHJlZ2lzdGVyIHRoZW0gd2l0aCB0aGUgc2hvcCEnOyBcclxuXHJcbmNsYXNzIENvbXBvbmVudE5vdFJlZ2lzdGVyZWRFeGNlcHRpb24gZXh0ZW5kcyBFeGNlcHRpb25IYW5kbGVyXHJcbntcclxuXHRjb25zdHJ1Y3RvcihtZXNzYWdlID0gbnVsbCkgXHJcblx0e1xyXG5cdFx0bWVzc2FnZSA9IG1lc3NhZ2UgfHwgZGVmYXVsdE1lc3NhZ2UkNTtcclxuXHRcdHN1cGVyKG1lc3NhZ2UpO1xyXG4gICAgXHRzdXBlci5zdGFja1RyYWNlKHRoaXMsIG1lc3NhZ2UpO1xyXG4gICAgfVxyXG59XG5cbi8vIENvbXBvbmVudHNcclxuLy8gSGVscGVyc1xyXG4vLyBFeGNlcHRpb25zXHJcbmNsYXNzIENvbXBvbmVudHNQcm92aWRlclxyXG57XHJcblx0LyoqXHJcblx0ICogLSBTZXQgdGhlIGNvbnRhaW5lciBhcyBhIG1lbWJlci5cclxuXHQgKiAtIGRlY2xhcmUgdGhlIGNvbXBvbmVudHMuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gXFxDb3JlXFxDb250YWluZXIgfCBjb250YWluZXJcclxuXHQgKiBAcmV0dXJuIHZvaWRcclxuXHQgKi9cclxuXHRjb25zdHJ1Y3Rvcihjb250YWluZXIpXHJcblx0e1xyXG5cdFx0dGhpcy5jb250YWluZXIgPSBjb250YWluZXI7XHJcblxyXG5cdFx0dGhpcy5jb21wb25lbnRzID0ge307XHJcblx0XHR0aGlzLmNvbXBvbmVudHMuRmlsdGVyID0ge307XHJcblx0XHR0aGlzLmNvbXBvbmVudHMuU2VydmljZXMgPSB7fTtcclxuXHRcdHRoaXMuY29tcG9uZW50cy5Qcm9kdWN0cyA9IHt9O1xyXG5cdFx0dGhpcy5jb21wb25lbnRzLlBhZ2luYXRpb24gPSB7fTtcclxuXHRcdHRoaXMuY29tcG9uZW50cy5DYXJ0ID0ge307XHJcblx0XHR0aGlzLmNvbXBvbmVudHMuQ2hlY2tvdXQgPSB7fTtcclxuXHR9XHJcblxyXG4gICAvKipcclxuXHQqIFJlZ2lzdGVycyB0aGUgY29tcG9uZW50cy5cclxuXHQqXHJcblx0KiBAcGFyYW0gb2JqZWN0IHwgY29tcG9uZW50c1xyXG5cdCogQHJldHVybiB2b2lkXHJcblx0Ki9cclxuXHRyZWdpc3Rlcihjb21wb25lbnRzKVxyXG5cdHtcclxuXHRcdHRoaXMuYXZhaWxhYmxlID0gY29tcG9uZW50cztcclxuXHRcdHRoaXMuYm9vdGVkID0gW107XHJcblx0IFx0dGhpcy5jb21wb25lbnRzLkZpbHRlci5ib290ZWQgPSBmYWxzZTtcclxuXHRcdHRoaXMuY29tcG9uZW50cy5TZXJ2aWNlcy5ib290ZWQgPSBmYWxzZTtcclxuXHRcdHRoaXMuY29tcG9uZW50cy5Qcm9kdWN0cy5ib290ZWQgPSBmYWxzZTtcclxuXHRcdHRoaXMuY29tcG9uZW50cy5QYWdpbmF0aW9uLmJvb3RlZCA9IGZhbHNlO1xyXG5cdFx0dGhpcy5jb21wb25lbnRzLkNhcnQuYm9vdGVkID0gZmFsc2U7XHJcblx0XHR0aGlzLmNvbXBvbmVudHMuQ2hlY2tvdXQuYm9vdGVkID0gZmFsc2U7XHJcblxyXG5cdFx0bGV0IGluc3RhbmNlID0gdGhpcztcclxuXHJcblx0XHR0aGlzLmNvbnRhaW5lci5iaW5kKCdGaWx0ZXInLCBmdW5jdGlvbihjb250YWluZXIsIGNvbXBvbmVudCkge1xyXG5cdFx0XHRpbnN0YW5jZS5jb21wb25lbnRzW2NvbXBvbmVudF0gPSBuZXcgRmlsdGVyKGNvbnRhaW5lcik7XHJcblx0XHRcdGluc3RhbmNlLmNvbXBvbmVudHNbY29tcG9uZW50XS5ib290ZWQgPSB0cnVlO1xyXG5cdFx0XHRpbnN0YW5jZS5ib290ZWQucHVzaChpbnN0YW5jZS5jb21wb25lbnRzW2NvbXBvbmVudF0pO1xyXG5cdFx0XHRyZXR1cm4gaW5zdGFuY2UuY29tcG9uZW50c1tjb21wb25lbnRdO1xyXG5cdFx0fSwgJ2NvbXBvbmVudHMnKTtcclxuXHRcdFxyXG5cdFx0dGhpcy5jb250YWluZXIuYmluZCgnU2VydmljZXMnLCBmdW5jdGlvbihjb250YWluZXIsIGNvbXBvbmVudCkgeyBcclxuXHRcdFx0aW5zdGFuY2UuY29tcG9uZW50c1tjb21wb25lbnRdID0gbmV3IFNlcnZpY2VzKGNvbnRhaW5lcik7XHJcblx0XHRcdGluc3RhbmNlLmNvbXBvbmVudHNbY29tcG9uZW50XS5ib290ZWQgPSB0cnVlO1xyXG5cdFx0XHRpbnN0YW5jZS5ib290ZWQucHVzaChpbnN0YW5jZS5jb21wb25lbnRzW2NvbXBvbmVudF0pO1xyXG5cdFx0XHRyZXR1cm4gaW5zdGFuY2UuY29tcG9uZW50c1tjb21wb25lbnRdO1xyXG5cdFx0fSwgJ2NvbXBvbmVudHMnKTtcclxuXHJcblx0XHR0aGlzLmNvbnRhaW5lci5iaW5kKCdQcm9kdWN0cycsIGZ1bmN0aW9uKGNvbnRhaW5lciwgY29tcG9uZW50KSB7XHJcblx0XHRcdGluc3RhbmNlLmNvbXBvbmVudHNbY29tcG9uZW50XSA9IG5ldyBQcm9kdWN0cyhjb250YWluZXIsIGNvbnRhaW5lci5SZXF1ZXN0LCBjb250YWluZXIuRXZlbnRzKTtcclxuXHRcdFx0aW5zdGFuY2UuY29tcG9uZW50c1tjb21wb25lbnRdLmJvb3RlZCA9IHRydWU7XHJcblx0XHRcdGluc3RhbmNlLmJvb3RlZC5wdXNoKGluc3RhbmNlLmNvbXBvbmVudHNbY29tcG9uZW50XSk7XHJcblx0XHRcdHJldHVybiBpbnN0YW5jZS5jb21wb25lbnRzW2NvbXBvbmVudF07XHJcblx0XHR9LCAnY29tcG9uZW50cycpO1xyXG5cclxuXHRcdHRoaXMuY29udGFpbmVyLmJpbmQoJ1BhZ2luYXRpb24nLCBmdW5jdGlvbihjb250YWluZXIsIGNvbXBvbmVudCkge1xyXG5cdFx0XHRpbnN0YW5jZS5jb21wb25lbnRzW2NvbXBvbmVudF0gPSBuZXcgUGFnaW5hdGlvbihjb250YWluZXIsIGluc3RhbmNlLnByb3ZpZGUoJ1Byb2R1Y3RzJyksIGNvbnRhaW5lci5FdmVudHMpO1xyXG5cdFx0XHRpbnN0YW5jZS5jb21wb25lbnRzW2NvbXBvbmVudF0uYm9vdGVkID0gdHJ1ZTtcclxuXHRcdFx0aW5zdGFuY2UuYm9vdGVkLnB1c2goaW5zdGFuY2UuY29tcG9uZW50c1tjb21wb25lbnRdKTtcclxuXHRcdFx0cmV0dXJuIGluc3RhbmNlLmNvbXBvbmVudHNbY29tcG9uZW50XTtcclxuXHRcdH0sICdjb21wb25lbnRzJyk7XHJcblxyXG5cdFx0dGhpcy5jb250YWluZXIuYmluZCgnQ2FydCcsIGZ1bmN0aW9uKGNvbnRhaW5lciwgY29tcG9uZW50KSB7XHJcblx0XHRcdGluc3RhbmNlLmNvbXBvbmVudHNbY29tcG9uZW50XSA9IG5ldyBDYXJ0KGNvbnRhaW5lciwgY29udGFpbmVyLlJlcXVlc3QsIGNvbnRhaW5lci5FdmVudHMpO1xyXG5cdFx0XHRpbnN0YW5jZS5jb21wb25lbnRzW2NvbXBvbmVudF0uYm9vdGVkID0gdHJ1ZTtcclxuXHRcdFx0aW5zdGFuY2UuYm9vdGVkLnB1c2goaW5zdGFuY2UuY29tcG9uZW50c1tjb21wb25lbnRdKTtcclxuXHRcdFx0cmV0dXJuIGluc3RhbmNlLmNvbXBvbmVudHNbY29tcG9uZW50XTtcclxuXHRcdH0sICdjb21wb25lbnRzJyk7XHJcblxyXG5cdFx0dGhpcy5jb250YWluZXIuYmluZCgnQ2hlY2tvdXQnLCBmdW5jdGlvbihjb250YWluZXIsIGNvbXBvbmVudCkge1xyXG5cdFx0XHRpbnN0YW5jZS5jb21wb25lbnRzW2NvbXBvbmVudF0gPSBuZXcgQ2hlY2tvdXQoY29udGFpbmVyLCBjb250YWluZXIuUmVxdWVzdCwgY29udGFpbmVyLkV2ZW50cyk7XHJcblx0XHRcdGluc3RhbmNlLmNvbXBvbmVudHNbY29tcG9uZW50XS5ib290ZWQgPSB0cnVlO1xyXG5cdFx0XHRpbnN0YW5jZS5ib290ZWQucHVzaChpbnN0YW5jZS5jb21wb25lbnRzW2NvbXBvbmVudF0pO1xyXG5cdFx0XHRyZXR1cm4gaW5zdGFuY2UuY29tcG9uZW50c1tjb21wb25lbnRdO1xyXG5cdFx0fSwgJ2NvbXBvbmVudHMnKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFByb3ZpZGUgYSByZWdpc3RlcmVkIGNvbXBvbmVudC5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSBzdHJpbmcgfCBjb21wb25lbnRcclxuXHQgKiBAcmV0dXJuIG9iamVjdFxyXG5cdCAqL1xyXG5cdHByb3ZpZGUoY29tcG9uZW50KVxyXG5cdHtcclxuXHRcdGlmIChDb21tb24uaW5fYXJyYXkoY29tcG9uZW50LCB0aGlzLmF2YWlsYWJsZSkpIHtcclxuXHRcdFx0cmV0dXJuIHRoaXMuY29udGFpbmVyLm1ha2UoY29tcG9uZW50KTtcclxuXHRcdH1cclxuXHJcblx0XHR0aHJvdyBuZXcgQ29tcG9uZW50Tm90UmVnaXN0ZXJlZEV4Y2VwdGlvbignY29tcG9uZW50cyBtdXN0IGJlIHJlZ2lzdGVyZWQgaW4gb3JkZXIgdG8gdXNlIHRoZW0uJyk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBDaGVja3MgaWYgY29tcG9uZW50IGV4aXN0cy5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSBzdHJpbmcgfCBuYW1lXHJcblx0ICogQHJldHVybiBib29sXHJcblx0ICovXHJcblx0ZXhpc3RzKG5hbWUpXHJcblx0e1xyXG5cdFx0cmV0dXJuIHRoaXMuY29tcG9uZW50cy5oYXNPd25Qcm9wZXJ0eShuYW1lKTtcclxuXHR9XHJcbn1cblxubGV0IGRlZmF1bHRNZXNzYWdlJDYgPSAnVHJ5aW5nIHRvIGJpbmQgYW4gYWxyZWFkeSBleGlzdGluZyBib3VuZC4nO1xyXG5cclxuY2xhc3MgSW52YWxpZEJpbmRpbmdFeGNlcHRpb24gZXh0ZW5kcyBFeGNlcHRpb25IYW5kbGVyXHJcbntcclxuXHRjb25zdHJ1Y3RvcihtZXNzYWdlID0gbnVsbCkgXHJcblx0e1xyXG5cdFx0bWVzc2FnZSA9IG1lc3NhZ2UgfHwgZGVmYXVsdE1lc3NhZ2UkNjtcclxuXHRcdHN1cGVyKG1lc3NhZ2UpO1xyXG4gICAgXHRzdXBlci5zdGFja1RyYWNlKHRoaXMsIG1lc3NhZ2UpO1xyXG4gICAgfVxyXG59XG5cbi8vIEhlbHBlcnNcclxuLy8gQ29yZVxyXG4vLyBFeGNlcHRpb25zXHJcbi8qKlxyXG4gKiBAZmlsZSBcclxuICogQ29udGFpbmVyIGNsYXNzLlxyXG4gKlxyXG4gKiBIYW5kbGVzL0NvbnRyb2xzIHRoZSBkZXBlbmRlbmNpZXMgb2YgZWNvbW1lcmNlLlxyXG4gKi9cclxuXHJcbmNsYXNzIENvbnRhaW5lciQ1IFxyXG57XHJcblx0LyoqXHJcblx0ICogLSBJbml0aWFsaXplIGluc3RhbmNlcyBtZW1iZXIuXHJcblx0ICogLSBSZWdpc3RlciBiaW5kaW5ncy5cclxuXHQgKlxyXG5cdCAqIEByZXR1cm4gdm9pZFxyXG5cdCAqL1xyXG5cdGNvbnN0cnVjdG9yKClcclxuXHR7XHJcblx0XHR0aGlzLmluc3RhbmNlcyA9IFtdO1xyXG5cdFx0dGhpcy5yZWdpc3RlcigpO1xyXG5cdFx0dGhpcy5yZWdpc3RlclByb3ZpZGVycygpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQmluZHMga2V5IHRvIGNvbmNyZXRlIGNsYXNzLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIHN0cmluZyB8IGtleVxyXG5cdCAqIEBwYXJhbSBjbGFzcyB8IGNvbmNyZXRlXHJcblx0ICogQHJldHVybiB2b2lkXHJcblx0ICovXHJcblx0YmluZChrZXksIGNvbmNyZXRlLCBuYW1lc3BhY2UgPSBudWxsKSBcclxuXHR7XHJcblx0XHRpZiAodHlwZW9mIGtleSAhPSAnc3RyaW5nJykge1xyXG5cdFx0XHR0aHJvdyBuZXcgSW52YWxpZEFyZ3VtZW50RXhjZXB0aW9uJDEoJ2JpbmQoKSBleHBlY3RzIHRoZSBmaXJzdCBwYXJhbWV0ZXIgdG8gYmUgc3RyaW5nLCBidXQgJyArIHR5cGVvZiBrZXkgKyAnIHdhcyBwYXNzZWQgaW5zdGVhZC4nKTtcclxuXHRcdH1cclxuXHJcblx0XHRpZiAodHlwZW9mIGNvbmNyZXRlICE9ICdmdW5jdGlvbicpIHsgXHJcblx0XHRcdHRocm93IG5ldyBJbnZhbGlkQXJndW1lbnRFeGNlcHRpb24kMSgnYmluZCgpIGV4cGVjdHMgdGhlIHNlY29uZCBwYXJhbWV0ZXIgdG8gYmUgYSBmdW5jdGlvbiwgYnV0ICcgKyB0eXBlb2YgY29uY3JldGUgKyAnIHdhcyBwYXNzZWQgaW5zdGVhZC4nKTtcclxuXHRcdH1cclxuXHJcblx0XHRpZiAobmFtZXNwYWNlKSB7XHJcblx0XHRcdGlmICh0eXBlb2YgdGhpc1tuYW1lc3BhY2VdID09ICd1bmRlZmluZWQnKSB7XHJcblx0XHRcdFx0dGhpc1tuYW1lc3BhY2VdID0ge307XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHRoaXNbbmFtZXNwYWNlXVtrZXldID0gY29uY3JldGUuYmluZChjb25jcmV0ZSwgdGhpcywga2V5KTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdHRoaXNba2V5XSA9IGNvbmNyZXRlLmJpbmQoY29uY3JldGUsIHRoaXMsIGtleSk7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBTZXRzIGFuIGluc3RhbmNlLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIHN0cmluZyB8IGtleVxyXG5cdCAqIEBwYXJhbSBvYmplY3QgfCBpbnN0YW5jZVxyXG5cdCAqIEBwYXJhbSBzdHJpbmcgfCBhbGlhc1xyXG5cdCAqIEByZXR1cm4gdm9pZFxyXG5cdCAqL1xyXG5cdHNldEluc3RhbmNlKGtleSwgaW5zdGFuY2UsIGFsaWFzID0gbnVsbCkgXHJcblx0e1xyXG5cdFx0aWYgKHR5cGVvZiBrZXkgIT0gJ3N0cmluZycpIHtcclxuXHRcdFx0dGhyb3cgbmV3IEludmFsaWRBcmd1bWVudEV4Y2VwdGlvbiQxKCdzZXRJbnN0YWNlKCkgZXhwZWN0cyB0aGUgZmlyc3QgcGFyYW1ldGVyIHRvIGJlIGEgc3RyaW5nLCBidXQgJyArIHR5cGVvZiBrZXkgKyAnIHdhcyBwYXNzZWQgaW5zdGVhZC4nKTtcclxuXHRcdH1cclxuXHJcblx0XHRpZiAodHlwZW9mIGluc3RhbmNlICE9ICdvYmplY3QnKSB7XHJcblx0XHRcdHRocm93IG5ldyBJbnZhbGlkQXJndW1lbnRFeGNlcHRpb24kMSgnc2V0SW5zdGFuY2UoKSBleHBlY3RzIHRoZSBzZWNvbmQgcGFyYW1ldGVyIHRvIGJlIGFuIG9iamVjdCwgYnV0ICcgKyB0eXBlb2YgaW5zdGFuY2UgKyAnIHdhcyBwYXNzZWQgaW5zdGVhZC4nKTtcclxuXHRcdH1cclxuXHJcblx0XHR0aGlzLmluc3RhbmNlc1trZXldID0gaW5zdGFuY2U7XHJcblx0XHR0aGlzW2tleV0gPSBpbnN0YW5jZTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFJlc29sdmVzIGFuIGluc3RhbmNlIG91dCBvZiBcclxuXHQgKiB0aGUgaW9jIGNvbnRhaW5lci5cclxuXHQgKiBcclxuXHQgKiBAcGFyYW0gc3RyaW5nIHwga2V5XHJcblx0ICogQHJldHVybiBvYmplY3RcclxuXHQgKi9cclxuXHRnZXRJbnN0YW5jZShrZXkpIFxyXG5cdHtcclxuXHRcdGlmICh0eXBlb2Yga2V5ICE9ICdzdHJpbmcnICYmIHR5cGVvZiBrZXkgIT0gJ29iamVjdCcpIHtcclxuXHRcdFx0dGhyb3cgbmV3IEludmFsaWRBcmd1bWVudEV4Y2VwdGlvbiQxKCdnZXRJbnN0YWNlKCkgZXhwZWN0cyB0aGUgZmlyc3QgcGFyYW1ldGVyIHRvIGJlIGEgc3RyaW5nLCBidXQgJyArIHR5cGVvZiBrZXkgKyAnIHdhcyBwYXNzZWQgaW5zdGVhZC4nKTtcclxuXHRcdH1cclxuXHJcblx0XHRpZiAodHlwZW9mIGtleSA9PSAnb2JqZWN0Jykge1xyXG5cdFx0XHRyZXR1cm4gdGhpcy5pbnN0YW5jZXNba2V5LmNvbnN0cnVjdG9yLm5hbWVdIHx8IG51bGw7XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIHRoaXMuaW5zdGFuY2VzW2tleV0gfHwgbnVsbDtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIENoZWNrcyBpZiBhbiBpbnN0YW5jZSBleGlzdC5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSBtaXhlZCB8IGluc3RhbmNlXHJcblx0ICogQHJldHVybiBib29sXHJcblx0ICovXHJcblx0aW5zdGFuY2VFeGlzdChpbnN0YW5jZSkgXHJcblx0e1xyXG5cdFx0aWYgKHR5cGVvZiBpbnN0YW5jZSA9PSAnb2JqZWN0JyB8fCB0eXBlb2YgaW5zdGFuY2UgPT0gJ3N5bWJvbCcpIHtcclxuXHRcdFx0cmV0dXJuICh0eXBlb2YgdGhpcy5pbnN0YW5jZXNbaW5zdGFuY2UuY29uc3RydWN0b3IubmFtZV0gIT09ICd1bmRlZmluZWQnKTtcclxuXHRcdH0gZWxzZSBpZiAodHlwZW9mIGluc3RhbmNlID09ICdzdHJpbmcnKSB7XHJcblx0XHRcdHJldHVybiAodHlwZW9mIHRoaXMuaW5zdGFuY2VzW2luc3RhbmNlXSAhPT0gJ3VuZGVmaW5lZCcpXHJcblx0XHR9XHJcblx0XHRcclxuXHRcdHRocm93IG5ldyBJbnZhbGlkQXJndW1lbnRFeGNlcHRpb24kMSgnaW5zdGFuY2VFeGlzdCgpIGV4cGVjdHMgdGhlIGZpcnN0IHBhcmFtZXRlciB0byBiZSBzdHJpbmcgb3IgYW4gb2JqZWN0LCBidXQgJyArIHR5cGVvZiBpbnN0YW5jZSArICcgd2FzIHBhc3NlZCBpbnN0ZWFkLicpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogUmV0cmlldmUgYW4gb2JqZWN0LCBpZiBub3QgZXhpc3RzXHJcblx0ICogd2lsbCBjcmVhdGUgaXQsIHNldCBpdCBpbiB0aGUgaW9jIGNvbnRhaW5lclxyXG5cdCAqIGZvciBsYXRlciB1c2UgYW5kIHJldHJpZXZlIGl0LlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIG1peGVkIHwgb2JqZWN0IFxyXG5cdCAqIEByZXR1cm4gb2JqZWN0XHJcblx0ICovXHJcblx0bWFrZShvYmplY3QpXHJcblx0e1xyXG5cdFx0bGV0IGluc3RhbmNlID0ge307XHJcblx0XHRsZXQga2V5O1xyXG5cdFx0XHJcblx0XHRpZiAodGhpcy5pbnN0YW5jZUV4aXN0KG9iamVjdCkpIHtcclxuXHRcdFx0cmV0dXJuIHRoaXMuZ2V0SW5zdGFuY2Uob2JqZWN0KTtcclxuXHRcdH1cclxuXHJcblx0XHRpZiAodHlwZW9mIG9iamVjdCA9PSAnb2JqZWN0Jykge1xyXG5cdFx0XHRpbnN0YW5jZSA9IG9iamVjdDtcclxuXHRcdFx0a2V5ID0gb2JqZWN0LmNvbnN0cnVjdG9yLm5hbWU7XHJcblx0XHRcdHRoaXMuc2V0SW5zdGFuY2Uoa2V5LCBpbnN0YW5jZSk7IFxyXG5cdFx0fSBlbHNlIGlmICh0eXBlb2Ygb2JqZWN0ID09ICdzdHJpbmcnICYmIHRoaXMuaGFzT3duUHJvcGVydHkob2JqZWN0KSkge1xyXG5cdFx0XHRpbnN0YW5jZSA9IG5ldyB0aGlzW29iamVjdF07XHJcblx0XHRcdGtleSA9IG9iamVjdDtcclxuXHRcdFx0dGhpcy5zZXRJbnN0YW5jZShrZXksIGluc3RhbmNlKTtcdFxyXG5cdFx0fSBlbHNlIGlmICh0eXBlb2Ygb2JqZWN0ID09ICdzdHJpbmcnICYmIHRoaXMuQ29tcG9uZW50cy5leGlzdHMob2JqZWN0KSkge1xyXG5cdFx0XHRpbnN0YW5jZSA9IG5ldyB0aGlzLmNvbXBvbmVudHNbb2JqZWN0XTtcclxuXHRcdFx0a2V5ID0gb2JqZWN0O1xyXG5cdFx0XHR0aGlzLnNldEluc3RhbmNlKGtleSwgaW5zdGFuY2UpO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0dGhyb3cgbmV3IEludmFsaWRCaW5kaW5nRXhjZXB0aW9uKCdDb250YWluZXIubWFrZSgpIGNvdWxkIG5vdCBjcmVhdGUgdGhlIG9iamVjdCEnKTtcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gaW5zdGFuY2U7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBSZW1vdmUgYWxsIGV4aXN0aW5nIGluc3RhbmNlcy5cclxuXHQgKlxyXG5cdCAqIEByZXR1cm4gdm9pZCBcclxuXHQgKi9cclxuXHRmbHVzaCgpXHJcblx0e1xyXG5cdFx0dGhpcy5pbnN0YW5jZXMgPSBbXTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFJlZ2lzdGVycyB0aGUgZGVwZW5kZWNpZXMuXHJcblx0ICpcclxuXHQgKiBAcmV0dXJuIHZvaWQgXHJcblx0ICovXHJcblx0cmVnaXN0ZXIoKVxyXG5cdHtcclxuXHRcdHRoaXMuc2V0SW5zdGFuY2UoJ1JlcXVlc3QnLCBuZXcgUmVxdWVzdCk7XHJcblx0XHR0aGlzLnNldEluc3RhbmNlKCdFdmVudHMnLCBuZXcgRXZlbnRNYW5hZ2VyKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFJlZ2lzdGVycyB0aGUgcHJvdmlkZXJzLlxyXG5cdCAqXHJcblx0ICogQHJldHVybiB2b2lkIFxyXG5cdCAqL1xyXG5cdHJlZ2lzdGVyUHJvdmlkZXJzKClcclxuXHR7XHJcblx0XHR0aGlzLnNldEluc3RhbmNlKCdDb21wb25lbnRzJywgbmV3IENvbXBvbmVudHNQcm92aWRlcih0aGlzKSk7XHJcblx0fVxyXG59XG5cbi8vIEhlbHBlcnNcclxuLy8gQ29yZVxyXG4vLyBFeGNlcHRpb25zXHJcbi8qKlxyXG4gKiBTdG9yZXMgdGhlIGRlZmF1bHQgc2V0dGluZ3MuXHJcbiAqXHJcbiAqIEB2YXIgb2JqZWN0XHJcbiAqL1xyXG5sZXQgZGVmYXVsdFNldHRpbmdzJDYgPSB7XHJcblx0ZGVidWdfbGV2ZWw6ICdlcnJvcicsXHJcblx0ZWxlbWVudDogJ2JvZHknLFxyXG5cdGluamVjdF9saWJyYXJpZXM6IFtdLFxyXG5cdGNvbXBvbmVudHM6IFsnUHJvZHVjdHMnLCAnU2VydmljZXMnLCAnRmlsdGVyJywgJ1BhZ2luYXRpb24nLCAnQ2FydCddLFxyXG5cdGxvYWRpbmdfYW5pbWF0aW9uOiB0cnVlXHJcbn07XHJcblxyXG4vKipcclxuICogU3RvcmVzIHRoZSBvcHRpb25hbCwgXHJcbiAqIGluamVjdGFibGUgZXh0ZXJuYWwgbGlicmFyaWVzIFxyXG4gKlxyXG4gKiBAdmFyIG9iamVjdFxyXG4gKi9cclxubGV0IGV4dGVybmFsTGlicmFyaWVzID0ge1xyXG5cdGJvb3RzdHJhcDogJ2h0dHBzOi8vbWF4Y2RuLmJvb3RzdHJhcGNkbi5jb20vYm9vdHN0cmFwLzMuMy43L2Nzcy9ib290c3RyYXAubWluLmNzcycsXHJcbn07XHJcblxyXG5jbGFzcyBUdXJib0Vjb21tZXJjZVxyXG57XHJcblx0LyoqXHJcblx0ICogVGhlIGVudGVyeSBmb3IgdGhlIHNob3AuXHJcblx0ICogLSBTZXR0aW5nIHRoZSBleGNlcHRpb24gaGFuZGxlci5cclxuXHQgKiAtIFNldHRpbmcgdGhlIGlvYyBjb250YWluZXIuXHJcblx0ICogLSBFeHRlbmRpbmcgdGhlIHVzZXIgc2V0dGluZ3MuXHJcblx0ICogLSBTZXR0aW5nIHRoZSBlbGVtZW50LlxyXG5cdCAqIC0gRGlzYWJsaW5nIGRlZmF1bHQgZXJyb3JzLlxyXG5cdCAqIC0gUGFzc2luZyBjYWxscyB2aWEgcHJveHkgdG8gdGhlIGNvbXBvbmVudHMuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gb2JqZWN0IHwgc2V0dGluZ3NcclxuXHQgKiBAcmV0dXJuIFByb3h5XHJcblx0ICovXHJcblx0Y29uc3RydWN0b3Ioc2V0dGluZ3MpXHJcblx0e1xyXG5cdFx0aWYgKHR5cGVvZiBzZXR0aW5ncyAhPSAnb2JqZWN0Jykge1xyXG5cdFx0XHR0aHJvdyBuZXcgSW52YWxpZEFyZ3VtZW50RXhjZXB0aW9uJDE7XHJcblx0XHR9XHJcblxyXG5cdFx0dGhpcy5zZXR0aW5ncyA9IENvbW1vbi5leHRlbmQoZGVmYXVsdFNldHRpbmdzJDYsIHNldHRpbmdzKTtcclxuXHJcblx0XHRFeGNlcHRpb25IYW5kbGVyLnNldERlYnVnTGV2ZWwgPSB0aGlzLnNldHRpbmdzLmRlYnVnX2xldmVsO1xyXG5cdFx0XHJcblx0XHR0aGlzLmxvYWRFeHRlcm5hbExpYnJhcmllcygpO1xyXG5cdFx0XHJcblx0XHR0aGlzLmNvbnRhaW5lciA9IG5ldyBDb250YWluZXIkNTtcclxuXHJcblx0XHR0aGlzLmNvbXBvbmVudHMgPSB0aGlzLmNvbnRhaW5lci5tYWtlKCdDb21wb25lbnRzJyk7XHJcblx0XHR0aGlzLmNvbXBvbmVudHMucmVnaXN0ZXIodGhpcy5zZXR0aW5ncy5jb21wb25lbnRzKTtcclxuXHJcblx0XHRkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgZnVuY3Rpb24oKSB7XHJcblx0XHRcdHRoaXMuc2V0RWxlbWVudCh0aGlzLnNldHRpbmdzLmVsZW1lbnQpO1xyXG5cclxuXHRcdFx0aWYgKHRoaXMuc2V0dGluZ3MubG9hZGluZ19hbmltYXRpb24pIHtcclxuXHRcdFx0XHRzdGFydExvYWRpbmcuY2FsbCh0aGlzKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0dGhpcy5hZGRTdHlsZVRhZygpO1xyXG5cdFx0fS5iaW5kKHRoaXMpKTtcclxuXHJcblx0XHRyZXR1cm4gbmV3IFByb3h5KHRoaXMsIHtcclxuXHRcdFx0Z2V0OiBmdW5jdGlvbihzaG9wLCBzb3VyY2UpIHtcclxuXHRcdFx0XHRpZiAoc2hvcC5jb21wb25lbnRzLmV4aXN0cyhzb3VyY2UpKSB7XHJcblx0XHRcdFx0XHRyZXR1cm4gc2hvcC5jb21wb25lbnRzLnByb3ZpZGUoc291cmNlKTtcclxuXHRcdFx0XHR9IFxyXG5cclxuXHRcdFx0XHRpZiAoc2hvcC5jb250YWluZXIuaW5zdGFuY2VFeGlzdChzb3VyY2UpKSB7XHJcblx0XHRcdFx0XHRyZXR1cm4gc2hvcC5jb250YWluZXIuZ2V0SW5zdGFuY2Uoc291cmNlKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogTG9hZHMgdGhlIGV4dGVybmFsIGxpYnJhcmllcyB3aGljaCB3YXMgc3BlY2lmaWVkLlxyXG5cdCAqIFxyXG5cdCAqIEByZXR1cm4gdm9pZFxyXG5cdCAqL1xyXG5cdGxvYWRFeHRlcm5hbExpYnJhcmllcygpXHJcblx0e1xyXG5cdFx0bGV0IGk7XHJcblx0XHRsZXQgbGlicmFyaWVzID0gdGhpcy5zZXR0aW5ncy5pbmplY3RfbGlicmFyaWVzO1xyXG5cclxuXHRcdGZvciAoaSA9IDA7IGkgPCBsaWJyYXJpZXMubGVuZ3RoOyBpKyspIHtcclxuXHRcdFx0aWYgKGV4dGVybmFsTGlicmFyaWVzLmhhc093blByb3BlcnR5KGxpYnJhcmllc1tpXSkpIHtcclxuXHRcdFx0XHRsZXQgaWQgPSAnVHVyYm8tZUNvbW1lcmNlLScgKyBTdHIudWNmaXJzdChsaWJyYXJpZXNbaV0pO1xyXG5cdFx0XHRcdFxyXG5cdFx0XHRcdGlmICghIERPTS5maW5kKGlkKSkge1xyXG5cdFx0XHRcdFx0RE9NLmFkZExpbmtlZFN0eWxlKGlkLCBleHRlcm5hbExpYnJhcmllc1tsaWJyYXJpZXNbaV1dKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFNldHMgdGhlIGVsZW1lbnQgdG8gYmUgYm91bmQgdG8uXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gc3RyaW5nIHwgc2VsZWN0b3JcclxuXHQgKiBAcmV0dXJuIHZvaWRcclxuXHQgKi9cclxuXHRzZXRFbGVtZW50KHNlbGVjdG9yKVxyXG5cdHtcclxuXHRcdHRoaXMuZWxlbWVudCA9IERPTS5maW5kKHNlbGVjdG9yKTtcclxuXHRcdFxyXG5cdFx0RE9NLmFkZENsYXNzKHRoaXMuZWxlbWVudCwgdGhpcy5zZXR0aW5ncy5jbGFzcyk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBBZGQgdGhlIGVDb21tZXJjZSBzdHlsZSB0YWdzIHRvIHRoZSBET00uXHJcblx0ICpcclxuXHQgKiBAcmV0dXJuIHZvaWRcclxuXHQgKi9cclxuXHRhZGRTdHlsZVRhZygpIFxyXG5cdHtcclxuXHRcdGlmIChET00uZmluZCgnI1R1cmJvZS1Db21tZXJjZScpKSB7XHJcblx0XHRcdHJldHVybjtcclxuXHRcdH1cclxuXHJcblx0XHRsZXQgY3NzID0gYFxyXG5cdFx0XHQke3RoaXMuc2V0dGluZ3MuZWxlbWVudH0ge1xyXG5cdFx0XHRcdHBvc2l0aW9uOiByZWxhdGl2ZTtcclxuXHRcdFx0XHRjbGVhcjogYm90aDtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0LmxvYWRpbmctcHJvZ3Jlc3MtYmFyIHtcclxuXHRcdFx0XHRwb3NpdGlvbjogZml4ZWQ7XHJcblx0XHRcdFx0dG9wOiAwO1xyXG5cdFx0XHRcdGxlZnQ6IDA7XHJcblx0XHRcdFx0aGVpZ2h0OiA1cHg7XHJcblx0XHRcdFx0d2lkdGg6IDEwMCU7XHJcblx0XHRcdFx0LXdlYmtpdC1ib3gtc2hhZG93OiAwcHggMHB4IDVweCAxcHggcmdiYSgxNjgsMTY4LDE2OCwxKTtcclxuXHRcdFx0XHQtbW96LWJveC1zaGFkb3c6IDBweCAwcHggNXB4IDFweCByZ2JhKDE2OCwxNjgsMTY4LDEpO1xyXG5cdFx0XHRcdGJveC1zaGFkb3c6IDBweCAwcHggNXB4IDFweCByZ2JhKDE2OCwxNjgsMTY4LDEpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHQubG9hZGluZy1wcm9ncmVzcy1iYXIgPiAubG9hZGluZy1wcm9ncmVzcy1maWxsIHtcclxuXHRcdFx0XHR3aWR0aDogMTAwJTtcclxuXHRcdFx0XHRoZWlnaHQ6IDEwMCU7XHJcblx0XHRcdFx0cG9zaXRpb246IGFic29sdXRlO1xyXG5cdFx0XHRcdGJhY2tncm91bmQtY29sb3I6ICM5ZGQyZmY7XHJcblx0XHRcdFx0dHJhbnNmb3JtOiB0cmFuc2xhdGVYKC0ke2RvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRXaWR0aH1weCk7XHJcblx0XHRcdH1cclxuXHRcdGA7XHJcblx0ICAgIFxyXG5cdCAgICBET00uYWRkU3R5bGUoJ1R1cmJvLWVDb21tZXJjZScsIGNzcyk7XHJcblx0fVxyXG59XHJcblxyXG5cclxuLyoqXHJcbiAqIEF0dGFjaGVzIGEgbG9hZGVyIHRvIHRoZSB0b3Agb2YgdGhlIHNjcmVlblxyXG4gKiBhbmQgaGlkZXMgdGhlIGNvbnRlbnQuXHJcbiAqIFN0b3BzIGF1dG9tYXRpY2FsbHkgYWZ0ZXIgMjAlIHJlYWNoZWQuXHJcbiAqXHJcbiAqIEByZXR1cm4gdm9pZCBcclxuICovXHJcbmZ1bmN0aW9uIHN0YXJ0TG9hZGluZygpIHtcclxuXHRsZXQgbG9hZGVyID0gRE9NLmNyZWF0ZUVsZW1lbnQoJ2RpdicsIHtcclxuXHRcdGNsYXNzOiAnbG9hZGluZy1wcm9ncmVzcy1iYXInXHJcblx0fSk7XHJcblxyXG5cdGxldCBmaWxsID0gRE9NLmNyZWF0ZUVsZW1lbnQoJ3NwYW4nLCB7XHJcblx0XHRjbGFzczogJ2xvYWRpbmctcHJvZ3Jlc3MtZmlsbCdcclxuXHR9KTtcclxuXHJcblx0bG9hZGVyLmFwcGVuZENoaWxkKGZpbGwpO1xyXG5cdGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQobG9hZGVyKTtcclxuXHJcblxyXG5cdGxldCBwcm9ncmVzcyA9IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRXaWR0aDtcclxuXHRsZXQgbWF4U2l6ZSA9IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRXaWR0aCAqIDAuODA7XHJcblxyXG5cdHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUocHJvZ3Jlc3NEcmF3KTtcclxuXHJcblx0bGV0IGNvbnRlbnQgPSB0aGlzLmVsZW1lbnQ7XHJcblxyXG5cdGNvbnRlbnQuc3R5bGUuZGlzcGxheSA9ICdub25lJztcclxuXHRcclxuXHRmdW5jdGlvbiBwcm9ncmVzc0RyYXcoKSB7XHJcblx0XHRmaWxsLnN0eWxlLnRyYW5zZm9ybSA9ICd0cmFuc2xhdGVYKC0nICsgcHJvZ3Jlc3MgKyAncHgpJztcclxuXHRcdHByb2dyZXNzIC09IDc7XHJcblxyXG5cdFx0aWYgKHByb2dyZXNzIDwgbWF4U2l6ZSkge1xyXG5cdFx0XHRkb25lKCk7XHJcblx0XHRcdHJldHVybjtcclxuXHRcdH1cclxuXHJcblx0XHR3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKHByb2dyZXNzRHJhdyk7XHJcblx0fVxyXG5cclxuXHRmdW5jdGlvbiBkb25lKCkge1xyXG5cdFx0ZmlsbC5zdHlsZS5vcGFjaXR5ID0gcHJvZ3Jlc3MgLyAxMDAwO1xyXG5cdFx0ZmlsbC5zdHlsZS50cmFuc2Zvcm0gPSAndHJhbnNsYXRlWCgtJyArIHByb2dyZXNzICsgJ3B4KSc7XHJcblx0XHJcblx0XHRwcm9ncmVzcyAtPSAxNTtcclxuXHJcblx0XHRpZiAocHJvZ3Jlc3MgPD0gMCkge1xyXG5cdFx0XHRjb250ZW50LnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xyXG5cdFx0XHRcclxuXHRcdFx0aWYgKHR5cGVvZiBsb2FkZXIgIT0gJ3VuZGVmaW5lZCcpIHtcclxuXHRcdFx0XHRET00ucmVtb3ZlKGxvYWRlcik7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHJldHVybjtcclxuXHRcdH1cclxuXHJcblx0XHR3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKGRvbmUpO1xyXG5cdH1cclxufVxuXG5yZXR1cm4gVHVyYm9FY29tbWVyY2U7XG5cbn0oKSk7XG4iXX0=
