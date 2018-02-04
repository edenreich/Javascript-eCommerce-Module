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
					switch (option) {
						case 'text':
						case 'html':
							element.innerHTML = options[option];
							break;
						default:
							element.setAttribute(option, options[option]);
							break;
					}
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
							case 'price':
								_td = DOM.createElement('td');
								var span = DOM.createElement('span', {
									html: '&nbsp' + attributes[attribute].currency
								});
								_td.innerHTML = attributes[attribute].amount;
								_td.appendChild(span);
								break;
							case 'name':
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
		no_css: false,
		currency: '$'
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

					var limit = Container$3.Pagination.settings.per_page;

					switch (Container$3.Pagination.settings.processing) {
						case 'client-side':
							return this.loadPageProductsOnce(pageNumber, limit);
							break;
						case 'server-side':
							return this.loadPageProducts(pageNumber, limit);
							break;
						default:
							throw new InvalidArgumentException$1('for processing you can choose \'server-side\' or \'client-side\' options.');
					}
				} else {
					this.loadPageProducts();
				}
			}

			/**
    * Loads the products and 
    * replace them in the div container.
    *
    * @param number | pageNumber
    * @param number | limit
    * @return void
    */

		}, {
			key: 'loadPageProducts',
			value: function loadPageProducts() {
				var pageNumber = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
				var limit = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

				var request = this.getProducts(pageNumber);

				request.then(function (products) {
					if (limit) {
						this.currentItems = products.slice(0, limit);
					} else {
						this.currentItems = products;
					}

					this.replaceProducts(this.currentItems);
					Promise.resolve(this.currentItems);
				}.bind(this)).catch(function (error) {
					// throw new Error('Could not load products! Reason: ' + error);
				});

				return request;
			}

			/**
    * Loads the products and 
    * replace them in the div container.
    *
    * @return void
    */

		}, {
			key: 'loadPageProductsOnce',
			value: function loadPageProductsOnce(pageNumber) {
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
					this.replaceProducts(this.currentItems);
					Promise.resolve(this.currentItems);
				}.bind(this)).catch(function (error) {
					// throw new Error('Could not load products! Reason: ' + error);
				});

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
    * Replace products in 
    * the products container.
    *
    * @param array | rawProducts
    * @return array
    */

		}, {
			key: 'replaceProducts',
			value: function replaceProducts(rawProducts) {
				if (!Array.isArray(rawProducts) || rawProducts.length <= 0 && typeof rawProducts[0] == 'string') {
					throw new InvalidArgumentException$1();
				}

				var products = this.buildProducts(rawProducts, this.settings.item_class, 'div');

				this.element.innerHTML = '';
				products.forEach(function (product) {
					EventManager$4.publish('products.loading', product);
					this.element.appendChild(product);
				}.bind(this));

				EventManager$4.publish('products.loaded', products);

				return products;
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

				// Enter default attribute.
				if (this.settings.attributes.indexOf('currency') == -1) {
					this.settings.attributes.push('currency');
				}

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

				attributes = this.addDefaultAttributes(attributes);

				if (attributes.hasOwnProperty('image')) {
					var image = DOM.createElement('img', {
						src: attributes['image']
					});

					var _tag = DOM.createElement(tagType, {
						class: 'product-image',
						html: image.outerHTML
					});

					product.appendChild(_tag);
				}

				if (attributes.hasOwnProperty('price')) {
					var _tag2 = DOM.createElement(tagType, {
						class: 'product-price',
						text: attributes.price.amount
					});
					var span = DOM.createElement('span', {
						class: 'product-currency',
						html: attributes.price.currency
					});

					_tag2.appendChild(span);
					overlay.appendChild(_tag2);
				}

				for (var attribute in attributes) {
					if (!Common.in_array(attribute, this.settings.attributes)) {
						continue;
					}

					if (attribute == 'price' || attribute == 'image') {
						continue;
					}

					var _tag3 = DOM.createElement(tagType);
					_tag3.innerHTML = attributes[attribute] || '';

					DOM.addClass(_tag3, 'product-' + Str.kebabCase(attribute));
					overlay.appendChild(_tag3);
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
    * Adds default attributes
    * to the supplied attributes.
    *
    * @param object | attributes
    * @return object
    */

		}, {
			key: 'addDefaultAttributes',
			value: function addDefaultAttributes(attributes) {
				if (attributes.hasOwnProperty('price') && _typeof(attributes.price) != 'object') {
					attributes.price = {
						"amount": attributes.price,
						"currency": this.settings.currency
					};
				}

				return attributes;
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

				var css = '\n\t\t\t.product {\n\t\t\t\tposition: relative;\n\t\t\t\tmargin: 5px 5px;\n\t\t\t\tborder: 1px solid #e4e4e4;\n\t\t\t\twidth: ' + width + ';\n\t\t\t\tmin-width: ' + minWidth + ';\n\t\t\t\tmax-width: ' + maxWidth + ';\n\t\t\t\theight: ' + height + ';\n\t\t\t\tcursor: pointer;\n\t\t\t\tcolor: #ffffff;\n\t\t\t\toverflow: hidden;\n\t\t\t}\n\n\t\t\t.product > .product-overlay {\n\t\t\t\tposition: absolute;\n\t\t\t\ttop: 0;\n\t\t\t\tleft: 0;\n\t\t\t\twidth: 100%;\n\t\t\t\theight: 100%;\n\t\t\t\topacity: 0.5;\n\t\t\t\tz-index: 5;\n\t\t\t\ttransition: 1s all;\n\t\t\t\ttransform: translateX(-250px);\n\t\t\t}\n\n\t\t\t.product:hover > .product-overlay {\n\t\t\t\tbackground: rgba(0, 0, 0, 0.45);\n\t\t\t\ttransform: translateX(0px);\n\t\t\t\topacity: 1;\n\t\t\t\ttransition: 0.5s all;\n\t\t\t}\n\n\t\t\t.product > .product-image > img {\n\t\t\t\tposition: absolute;\n\t\t\t\tleft: 0;\n\t\t\t\ttop: 0;\n\t\t\t\twidth: 100%;\n\t\t\t\theight: 100%;\n\t\t\t}\n\n\t\t\t.product > .product-overlay > .product-name, \n\t\t\t.product > .product-overlay > .product-price,\n\t\t\t.product > .product-overlay > .product-delivery-time {\n\t\t\t\tz-index: 1;\n\t\t\t\tposition: relative;\n\t\t\t\ttext-align: center;\n\t\t\t\tmargin-top: 25px;\n\t\t\t}\n\n\t\t\t.product > .product-overlay > .action-buttons {\n\t\t\t\twidth: 100%;\n\t\t\t\tmargin-top: 10px;\n\t\t\t\ttext-align: center;\n\t\t\t}\n\n\t\t\t.product > .product-overlay > .action-buttons > .favorite {\n\t\t\t\tmargin-left: 10px;\n\t\t\t}\n\n\t\t';

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
		element: '.pagination-links',
		processing: 'client-side',
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
   * @param \Components\Services | services
   * @return void
   */
		function Pagination(container, events) {
			var products = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
			var services = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;

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

					if (Products$2 && Products$2.booted) {
						Products$2.loadProducts(requestedPage).then(function (products) {
							instance.setCurrent(requestedPage);
						});
					}
				};

				this.previous.childNodes[0].onclick = function (e) {
					e.preventDefault();

					var requestedPage = instance.current - 1;

					if (instance.notInPageRange(requestedPage)) {
						throw new NotInPageRangeException('The page you requesting does not exists');
					}

					if (Products$2 && Products$2.booted) {
						Products$2.loadProducts(requestedPage).then(function (products) {
							instance.setCurrent(requestedPage);
						});
					}
				};

				for (var i = 0; i < this.pages.length; i++) {
					this.pages[i].childNodes[0].onclick = function (e) {
						e.preventDefault();

						var requestedPage = this.getAttribute('data-page-nr');

						if (Products$2 && Products$2.booted) {
							Products$2.loadProducts(requestedPage).then(function (products) {
								instance.setCurrent(requestedPage);
							});
						}
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
					var products = instance.exists('Products') ? instance.components['Products'] : null;
					var services = instance.exists('Services') ? instance.components['Services'] : null;
					instance.components[component] = new Pagination(container, container.Events, products, services);
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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlR1cmJvRWNvbW1lcmNlLmpzIl0sIm5hbWVzIjpbIlR1cmJvRWNvbW1lcmNlIiwiU3RyIiwic3RyaW5nIiwicmVwbGFjZSIsInRvTG93ZXJDYXNlIiwibGVuZ3RoIiwicG9zc2libGUiLCJpIiwiY2hhckF0IiwiTWF0aCIsImZsb29yIiwicmFuZG9tIiwidG9VcHBlckNhc2UiLCJzbGljZSIsImRlYnVnTGV2ZWwiLCJFeGNlcHRpb25IYW5kbGVyIiwibGV2ZWwiLCJ3aW5kb3ciLCJvbmVycm9yIiwiRXJyb3IiLCJjYXB0dXJlU3RhY2tUcmFjZSIsImNvbnN0cnVjdG9yIiwibmFtZSIsImVycm9yIiwibWVzc2FnZSIsImN1c3RvbUFjdGlvbnMiLCJoYW5kbGVFcnJvcnMiLCJoYW5kbGVXYXJuaW5ncyIsImhhbmRsZUluZm9zIiwiY29uc29sZSIsIndhcm4iLCJpbmZvIiwiZGVmYXVsdE1lc3NhZ2UiLCJJbnZhbGlkQXJndW1lbnRFeGNlcHRpb24kMSIsIkRPTSIsImVsZW1lbnQiLCJjbGFzc05hbWUiLCJuZXdDbGFzc05hbWUiLCJyZW1vdmVDbGFzcyIsImFkZENsYXNzIiwidW5kZWZpbmVkIiwiY2xhc3NOYW1lcyIsInNwbGl0IiwiZm9yRWFjaCIsImNsYXNzTGlzdCIsImFkZCIsImluZGV4T2YiLCJyZW1vdmUiLCJwYXJlbnROb2RlIiwicmVtb3ZlQ2hpbGQiLCJpZCIsImNzcyIsImhlYWQiLCJkb2N1bWVudCIsImdldEVsZW1lbnRzQnlUYWdOYW1lIiwic3R5bGVUYWciLCJjcmVhdGVFbGVtZW50IiwiQ1NTIiwibWluaWZ5Q3NzIiwiaW5uZXJIVE1MIiwic2V0QXR0cmlidXRlIiwiYXBwZW5kQ2hpbGQiLCJzb3VyY2UiLCJsaW5rZWRTdHlsZVRhZyIsImVsZW1lbnRUeXBlIiwib3B0aW9ucyIsIm9wdGlvbiIsInNlY29uZENsYXNzTmFtZSIsInRvZ2dsZSIsInNlbGVjdG9yIiwiY29udGV4dCIsInF1ZXJ5RWxlbWVudCIsInBhcmVudEVsZW1lbnQiLCJxdWVyeVNlbGVjdG9yQWxsIiwiaGFzQ2hpbGQiLCJjaGlsZEVsZW1lbnQiLCJub2RlIiwiQ29tbW9uIiwiY3VycmVudE9iamVjdCIsIm5ld09iamVjdCIsImV4dGVuZGVkIiwicHJvcCIsIk9iamVjdCIsInByb3RvdHlwZSIsImhhc093blByb3BlcnR5IiwiY2FsbCIsIm5lZWRsZSIsImh5c3RhY2siLCJBcnJheSIsInRvdGFsIiwic2l6ZSIsImlzTmFOIiwicGFyc2VJbnQiLCJjb2xsZWN0aW9uIiwiY2VpbCIsInN0YXJ0IiwiZW5kIiwicHVzaCIsIm9iamVjdCIsImRlZmF1bHRNZXNzYWdlJDEiLCJJbnZhbGlkRGF0YVN0cnVjdHVyZUV4Y2VwdGlvbiIsImRlZmF1bHRTZXR0aW5ncyIsImhlYWRlcnMiLCJhc3luYyIsIlJlcXVlc3QiLCJzZXR0aW5ncyIsImV4dGVuZCIsInNldERlZmF1bHRSZXF1ZXN0SGVhZGVyIiwiaGVhZGVyIiwib3BlbiIsIlhNTEh0dHBSZXF1ZXN0Iiwic2V0UmVxdWVzdEhlYWRlciIsInJlc3BvbnNlIiwiYXBwbHkiLCJhcmd1bWVudHMiLCJ4aHIiLCJiZWZvcmUiLCJQcm9taXNlIiwicmVzb2x2ZSIsInJlamVjdCIsImRhdGEiLCJ1cmwiLCJyZXNwb25zZVR5cGUiLCJkYXRhVHlwZSIsInRpbWVvdXQiLCJvbnJlYWR5c3RhdGVjaGFuZ2UiLCJyZWFkeVN0YXRlIiwic3RhdHVzIiwicmVzcG9uc2VUZXh0IiwiYWZ0ZXIiLCJzZW5kIiwicXVlcnlTdHJpbmciLCJrZXlzIiwibWFwIiwia2V5IiwiZW5jb2RlVVJJQ29tcG9uZW50Iiwiam9pbiIsIkFjdGl2ZVhPYmplY3QiLCJvdmVycmlkZU1pbWVUeXBlIiwiSlNPTiIsInBhcnNlIiwib25hYm9ydCIsImRlZmF1bHRNZXNzYWdlJDIiLCJCYWRFdmVudENhbGxFeGNlcHRpb24iLCJFdmVudE1hbmFnZXIiLCJldmVudHMiLCJjYWxsYmFjayIsIkludmFsaWRBcmd1bWVudEV4Y2VwdGlvbiIsIkNvb2tpZSIsInZhbHVlIiwiZGF5cyIsInN0cmluZ2lmeSIsImV4cGlyZXMiLCJkYXRlIiwiRGF0ZSIsInNldFRpbWUiLCJnZXRUaW1lIiwidG9HTVRTdHJpbmciLCJjb29raWUiLCJjX3N0YXJ0IiwiY19lbmQiLCJ1bmVzY2FwZSIsInN1YnN0cmluZyIsImRlZmF1bHRNZXNzYWdlJDMiLCJJbnZhbGlkQ2FydEl0ZW1FeGNlcHRpb24iLCJkZWZhdWx0U2V0dGluZ3MkMSIsImNvb2tpZV9uYW1lIiwicHJldmlld19jbGFzcyIsImxvYWRlciIsImNsYXNzIiwid2lkdGgiLCJoZWlnaHQiLCJwbGFjZW1lbnQiLCJmaXhlZCIsImhvdmVyX2NvbG9yIiwibm9fY3NzIiwiQ29udGFpbmVyIiwiRXZlbnRNYW5hZ2VyJDIiLCJIdHRwIiwibG9hZGluZ092ZXJsYXkiLCJpdGVtc0RpdiIsIkNhcnQiLCJjb250YWluZXIiLCJodHRwIiwiZXZlbnRNYW5hZ2VyIiwicHJldmlld0VsZW1lbnQiLCJjcmVhdGVQcmV2aWV3RWxlbWVudCIsImljb24iLCJjcmVhdGVJY29uIiwic2V0RWxlbWVudCIsImFkZFN0eWxlVGFnIiwiYmluZEV2ZW50TGlzdGVuZXJzIiwiaXNFbXB0eSIsImdldCIsInNldHVwQ2FydCIsImNhcnQiLCJlbXB0eU9iamVjdCIsIml0ZW1zIiwiZmF2b3JpdGVzIiwic2V0IiwiaXRlbSIsInF1YW50aXR5IiwiaW5jcmVtZW50ZWQiLCJhbHJlYWR5RmF2b3JpdGVkIiwic3BsaWNlIiwidGFibGUiLCJhdHRyaWJ1dGVzIiwidHIiLCJ0ZCIsImF0dHJpYnV0ZSIsImltYWdlIiwic3JjIiwic3BhbiIsImh0bWwiLCJjdXJyZW5jeSIsImFtb3VudCIsImNvbHNwYW4iLCJjaGVja291dCIsInRleHQiLCJvbmNsaWNrIiwiZSIsInByZXZlbnREZWZhdWx0IiwicHVibGlzaCIsImJpbmQiLCJmaW5kIiwicG9zaXRpb24iLCJhZGRTdHlsZSIsImNyZWF0ZUxvYWRlciIsInByZXZpZXdTdGFydExvYWRpbmciLCJnZXRDYXJ0SXRlbXMiLCJhZGRUb1ByZXZpZXciLCJpbnN0YW5jZSIsInNldFRpbWVvdXQiLCJwcmV2aWV3U3RvcExvYWRpbmciLCJ0b2dnbGVDYXJ0UHJldmlldyIsInN1YnNjcmliZSIsIm9wZW5DYXJ0UHJldmlldyIsImFkZEl0ZW0iLCJyZWxvYWRDYXJ0UHJldmlldyIsImZhdm9yaXRlSXRlbSIsImhhc0NsYXNzIiwic3dpdGNoQ2xhc3NlcyIsIm9wZW5pbmciLCJ0b2dnbGVDbGFzcyIsInN0eWxlIiwiZGlzcGxheSIsImNsb3NlIiwiZXZlbnQiLCJzdmciLCJjcmVhdGVFbGVtZW50TlMiLCJnIiwicGF0aCIsImRpdiIsImNvdW50IiwiZ3JvdXBzIiwicmVjdGFuZ2VscyIsImFuaW1hdGlvbnMiLCJyb3RhdGlvbiIsImdyb3VwIiwicmVjdGFuZ2VsIiwiYmVnaW4iLCJhbmltYXRlIiwidG9GaXhlZCIsImRlZmF1bHRTZXR0aW5ncyQyIiwiQ29udGFpbmVyJDEiLCJGaWx0ZXIiLCJhZGRFdmVudExpc3RlbmVyIiwibWluV2lkdGgiLCJtaW5fd2lkdGgiLCJkZWZhdWx0U2V0dGluZ3MkMyIsIkNvbnRhaW5lciQyIiwiRXZlbnRNYW5hZ2VyJDMiLCJIdHRwJDEiLCJDaGVja291dCIsImhpZGVBbGwiLCJzaG93IiwiaGlkZSIsIkNvbXBvbmVudHMiLCJib290ZWQiLCJjb21wb25lbnQiLCJkZWZhdWx0U2V0dGluZ3MkNCIsIml0ZW1fY2xhc3MiLCJhZGRfYnV0dG9uX2NsYXNzIiwiZmF2b3JpdGVfYnV0dG9uX2NsYXNzIiwiQ29udGFpbmVyJDMiLCJFdmVudE1hbmFnZXIkNCIsIkh0dHAkMiIsImNodW5rZWRQcm9kdWN0cyIsIlByb2R1Y3RzIiwidG90YWxJdGVtcyIsImxvYWRQcm9kdWN0cyIsInBhZ2VOdW1iZXIiLCJQYWdpbmF0aW9uIiwibGltaXQiLCJwZXJfcGFnZSIsInByb2Nlc3NpbmciLCJsb2FkUGFnZVByb2R1Y3RzT25jZSIsImxvYWRQYWdlUHJvZHVjdHMiLCJyZXF1ZXN0IiwiZ2V0UHJvZHVjdHMiLCJ0aGVuIiwicHJvZHVjdHMiLCJjdXJyZW50SXRlbXMiLCJyZXBsYWNlUHJvZHVjdHMiLCJjYXRjaCIsInBhZ2VzIiwiY2FsY3VsYXRlQ2xpZW50UGFnZXMiLCJ0b3RhbF9pdGVtcyIsInBlclBhZ2UiLCJhcnJheV9jaHVuayIsInJhd1Byb2R1Y3RzIiwiaXNBcnJheSIsImJ1aWxkUHJvZHVjdHMiLCJwcm9kdWN0IiwiYWN0aW9uIiwiYXR0cmlidXRlc0NvbGxlY3Rpb24iLCJ0YWdUeXBlIiwiYnVpbHRQcm9kdWN0cyIsImJ1aWx0UHJvZHVjdCIsImJ1aWxkUHJvZHVjdCIsIm92ZXJsYXkiLCJhZGREZWZhdWx0QXR0cmlidXRlcyIsInRhZyIsIm91dGVySFRNTCIsInByaWNlIiwiaW5fYXJyYXkiLCJrZWJhYkNhc2UiLCJhZGRUb0NhcnQiLCJ0eXBlIiwiZmF2b3JpdGUiLCJtYXhXaWR0aCIsIm1heF93aWR0aCIsIlNlcnZpY2VzIiwiVXJsIiwiY29udGVudCIsInVybFBhdGgiLCJ0aXRsZSIsImhpc3RvcnkiLCJwdXNoU3RhdGUiLCJvbnBvcHN0YXRlIiwic3RhdGUiLCJwYWdlVGl0bGUiLCJzZXBhcmF0b3IiLCJyZWdFeHAiLCJSZWdFeHAiLCJwYWlyU2VwYXJhdG9yIiwibWF0Y2giLCJwYXJhbWV0ZXJLZXkiLCJwYXJhbWV0ZXJWYWx1ZSIsInJlcXVlc3RlZFVybCIsImNoYW5nZVF1ZXJ5UGFyYW1ldGVyVmFsdWUiLCJsb2NhdGlvbiIsImhyZWYiLCJyZXBsYWNlU3RhdGUiLCJ2YXJzIiwicGFydHMiLCJtIiwiZGVmYXVsdE1lc3NhZ2UkNCIsIk5vdEluUGFnZVJhbmdlRXhjZXB0aW9uIiwiZGVmYXVsdFNldHRpbmdzJDUiLCJ1cmxfcGFyYW1ldGVyIiwiQ29udGFpbmVyJDQiLCJQcm9kdWN0cyQyIiwiRXZlbnRNYW5hZ2VyJDUiLCJzZXJ2aWNlcyIsInNldEN1cnJlbnQiLCJ0b3RhbFBhZ2VzIiwiY2FsY3VsYXRlVG90YWxQYWdlcyIsImJ1aWxkUGFnaW5hdGlvbiIsImxpbmtzIiwiY3JlYXRlTGlua3MiLCJyZXBsYWNlTGlua3MiLCJuZXh0IiwiY2hpbGROb2RlcyIsInJlcXVlc3RlZFBhZ2UiLCJjdXJyZW50Iiwibm90SW5QYWdlUmFuZ2UiLCJwcmV2aW91cyIsImdldEF0dHJpYnV0ZSIsImNoYW5nZVVybCIsInNldEFjdGl2ZUxpbmsiLCJ1bCIsImNyZWF0ZVBhZ2VMaW5rcyIsImNyZWF0ZVByZXZpb3VzQnV0dG9uIiwiY3JlYXRlTmV4dEJ1dHRvbiIsInBhZ2UiLCJwYWdlSXRlbSIsImxpbmsiLCJsaSIsInNwYW4xIiwic3BhbjIiLCJjaGFuZ2UiLCJkZWZhdWx0TWVzc2FnZSQ1IiwiQ29tcG9uZW50Tm90UmVnaXN0ZXJlZEV4Y2VwdGlvbiIsIkNvbXBvbmVudHNQcm92aWRlciIsImNvbXBvbmVudHMiLCJhdmFpbGFibGUiLCJFdmVudHMiLCJleGlzdHMiLCJtYWtlIiwiZGVmYXVsdE1lc3NhZ2UkNiIsIkludmFsaWRCaW5kaW5nRXhjZXB0aW9uIiwiQ29udGFpbmVyJDUiLCJpbnN0YW5jZXMiLCJyZWdpc3RlciIsInJlZ2lzdGVyUHJvdmlkZXJzIiwiY29uY3JldGUiLCJuYW1lc3BhY2UiLCJhbGlhcyIsImluc3RhbmNlRXhpc3QiLCJnZXRJbnN0YW5jZSIsInNldEluc3RhbmNlIiwiZGVmYXVsdFNldHRpbmdzJDYiLCJkZWJ1Z19sZXZlbCIsImluamVjdF9saWJyYXJpZXMiLCJsb2FkaW5nX2FuaW1hdGlvbiIsImV4dGVybmFsTGlicmFyaWVzIiwiYm9vdHN0cmFwIiwic2V0RGVidWdMZXZlbCIsImxvYWRFeHRlcm5hbExpYnJhcmllcyIsInN0YXJ0TG9hZGluZyIsIlByb3h5Iiwic2hvcCIsInByb3ZpZGUiLCJsaWJyYXJpZXMiLCJ1Y2ZpcnN0IiwiYWRkTGlua2VkU3R5bGUiLCJkb2N1bWVudEVsZW1lbnQiLCJjbGllbnRXaWR0aCIsImZpbGwiLCJib2R5IiwicHJvZ3Jlc3MiLCJtYXhTaXplIiwicmVxdWVzdEFuaW1hdGlvbkZyYW1lIiwicHJvZ3Jlc3NEcmF3IiwidHJhbnNmb3JtIiwiZG9uZSIsIm9wYWNp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QztBQUNqQ3RJLFNBQUlhLE1BQUosQ0FBV3lILE1BQVg7QUFDQTs7QUFFRDtBQUNBOztBQUVEdkosVUFBT2dhLHFCQUFQLENBQTZCRyxJQUE3QjtBQUNBO0FBQ0Q7O0FBRUQsUUFBT3BiLGNBQVA7QUFFQyxDQXg5R3FCLEVBQXRCIiwiZmlsZSI6IlR1cmJvRWNvbW1lcmNlLmpzIiwic291cmNlc0NvbnRlbnQiOlsidmFyIFR1cmJvRWNvbW1lcmNlID0gKGZ1bmN0aW9uICgpIHtcbid1c2Ugc3RyaWN0JztcblxuLyoqXHJcbiAqIEBmaWxlIFxyXG4gKiBTdHIgY2xhc3MuXHJcbiAqXHJcbiAqIEFkZHMgc29tZSB1c2VmdWwgZnVuY3Rpb25hbGl0eSBmb3JcclxuICogbWFuaXB1bGF0aW5nIHN0cmluZ3Mgb3IgY3JlYXRpbmcgc3RyaW5nLlxyXG4gKi9cclxuXHJcbmNsYXNzIFN0clxyXG57XHJcblx0LyoqXHJcblx0ICogQ29udmVydCBjYW1lbENhc2UgdG8ga2ViYWItY2FzZS5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSBzdHJpbmcgfCBzdHJpbmdcclxuXHQgKiBAcmV0dXJuIHN0cmluZ1xyXG5cdCAqL1xyXG5cdHN0YXRpYyBrZWJhYkNhc2Uoc3RyaW5nKSBcclxuXHR7XHJcblx0XHRyZXR1cm4gc3RyaW5nLnJlcGxhY2UoLyhbYS16XSkoW0EtWl0pL2csICckMS0kMicpLnRvTG93ZXJDYXNlKCk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBHZW5lcmF0ZXMgYSByYW5kb20gc3RyaW5nLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIGludGVnZXIgfCBsZW5ndGhcclxuXHQgKiBAcmV0dXJuIHN0cmluZ1xyXG5cdCAqL1xyXG5cdHN0YXRpYyByYW5kb20obGVuZ3RoKSBcclxuXHR7XHJcblx0XHRsZXQgc3RyaW5nID0gJyc7XHJcblx0XHRsZXQgcG9zc2libGUgPSBcIkFCQ0RFRkdISUpLTE1OT1BRUlNUVVZXWFlaYWJjZGVmZ2hpamtsbW5vcHFyc3R1dnd4eXowMTIzNDU2Nzg5XCI7XHJcblxyXG5cdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xyXG5cdCAgICBcdHN0cmluZyArPSBwb3NzaWJsZS5jaGFyQXQoTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogcG9zc2libGUubGVuZ3RoKSk7XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIHN0cmluZztcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIENoYW5nZXMgdGhlIGZpcnN0IGxldHRlciBcclxuXHQgKiBvZiB0aGUgc3RyaW5nIHRvIHVwcGVyY2FzZS5cclxuXHQgKiBcclxuXHQgKiBAcGFyYW0gc3RyaW5nIHwgc3RyaW5nXHJcblx0ICogQHJldHVybiBzdHJpbmdcclxuXHQgKi9cclxuXHRzdGF0aWMgdWNmaXJzdChzdHJpbmcpIFxyXG5cdHtcclxuXHQgICAgcmV0dXJuIHN0cmluZy5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSArIHN0cmluZy5zbGljZSgxKTtcclxuXHR9XHJcbn1cblxuLyoqXHJcbiAqIFN0b3JlcyB0aGUgZGVidWcgbGV2ZWwuXHJcbiAqXHJcbiAqIEB2YXIgc3RyaW5nIFxyXG4gKi9cclxubGV0IGRlYnVnTGV2ZWw7XHJcblxyXG5jbGFzcyBFeGNlcHRpb25IYW5kbGVyXHJcbntcclxuXHQvKipcclxuXHQgKiBTZXR0ZXIgZm9yIHRoZSBkZWJ1ZyBsZXZlbC5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSBzdHJpbmcgfCBsZXZlbFxyXG5cdCAqIEByZXR1cm4gdm9pZFxyXG5cdCAqL1xyXG5cdHN0YXRpYyBzZXQgc2V0RGVidWdMZXZlbChsZXZlbClcclxuXHR7XHJcblx0XHQvLyBTdXBwcmVzcyBlcnJvcnMgZGVwZW5kcyBvbiB0aGUgZGVidWcgbGV2ZWwuXHJcblx0XHRpZiAobGV2ZWwgPT0gJ3dhcm5pbmcnIHx8IGxldmVsID09ICdpbmZvJykge1xyXG5cdFx0XHR3aW5kb3cub25lcnJvciA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gdHJ1ZTsgfTtcclxuXHRcdH1cclxuXHJcblx0XHRkZWJ1Z0xldmVsID0gbGV2ZWw7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBFeHRlbmRlZCBjb25zdHJ1Y3RvciwgY2FwdHVyZXMgdGhlXHJcblx0ICogc3RhY2sgdHJhY2UuXHJcblx0ICpcclxuXHQgKiBAcmV0dXJuIHZvaWRcclxuXHQgKi9cclxuXHRjb25zdHJ1Y3RvcigpXHJcblx0e1xyXG5cdFx0aWYgKEVycm9yLmNhcHR1cmVTdGFja1RyYWNlKSB7XHJcblx0XHRcdEVycm9yLmNhcHR1cmVTdGFja1RyYWNlKHRoaXMsIHRoaXMuY29uc3RydWN0b3IubmFtZSk7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBIYW5kbGVzIGFsbCBleGNlcHRpb25zLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIG9iamVjdCB8IGVycm9yIHwgVGhyb3dlbiBFeGNlcHRpb24gT2JqZWN0XHJcblx0ICogQHBhcmFtIHN0cmluZyB8IG1lc3NhZ2VcclxuXHQgKiBAcmV0dXJuIHZvaWRcclxuXHQgKi9cclxuXHRzdGFja1RyYWNlKGVycm9yLCBtZXNzYWdlKSBcclxuXHR7XHJcblx0XHR0aGlzLmN1c3RvbUFjdGlvbnMoZXJyb3IsIG1lc3NhZ2UpO1xyXG5cclxuXHRcdHN3aXRjaChkZWJ1Z0xldmVsKVxyXG5cdFx0e1xyXG5cdFx0XHRjYXNlICdlcnJvcic6IHRoaXMuaGFuZGxlRXJyb3JzKGVycm9yLCBtZXNzYWdlKTsgYnJlYWs7XHJcblx0XHRcdGNhc2UgJ3dhcm5pbmcnOiB0aGlzLmhhbmRsZVdhcm5pbmdzKGVycm9yLCBtZXNzYWdlKTsgYnJlYWs7XHJcblx0XHRcdGNhc2UgJ2luZm8nOiB0aGlzLmhhbmRsZUluZm9zKGVycm9yLCBtZXNzYWdlKTsgYnJlYWs7XHJcblx0XHRcdGRlZmF1bHQ6IHRoaXMuaGFuZGxlSW5mb3MoZXJyb3IsIG1lc3NhZ2UpOyBicmVhaztcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFRha2UgYWN0aW9uIGZvciBzcGVjaWZpYyBFeGNlcHRpb25zLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIG9iamVjdCB8IGVycm9yIHwgVGhyb3dlbiBFeGNlcHRpb24gT2JqZWN0XHJcblx0ICogQHBhcmFtIHN0cmluZyB8IG1lc3NhZ2VcclxuXHQgKiBAcmV0dXJuIGJvb2xcclxuXHQgKi9cclxuXHRjdXN0b21BY3Rpb25zKGVycm9yLCBtZXNzYWdlKVxyXG5cdHtcclxuXHRcdGlmIChlcnJvci5jb25zdHJ1Y3Rvci5uYW1lID09ICdJbnZhbGlkQXJndW1lbnRFeGNlcHRpb24nKSB7XHJcblx0XHRcdC8vIGhhbmRsZVxyXG5cdFx0fSBlbHNlIGlmIChlcnJvci5jb25zdHJ1Y3Rvci5uYW1lID09ICdJbnZhbGlkQmluZGluZ0V4Y2VwdGlvbicpIHtcclxuXHRcdFx0Ly8gaGFuZGxlXHJcblx0XHR9IGVsc2UgaWYgKGVycm9yLmNvbnN0cnVjdG9yLm5hbWUgPT0gJ0JhZEV2ZW50Q2FsbEV4Y2VwdGlvbicpIHtcclxuXHRcdFx0Ly8gaGFuZGxlXHJcblx0XHR9IGVsc2UgaWYgKGVycm9yLmNvbnN0cnVjdG9yLm5hbWUgPT0gJ0NvbXBvbmVudHNFeGNlcHRpb24nKSB7XHJcblx0XHRcdC8vIGhhbmRsZVxyXG5cdFx0fSBlbHNlIGlmIChlcnJvci5jb25zdHJ1Y3Rvci5uYW1lID09ICdDb21wb25lbnROb3RSZWdpc3RlcmVkRXhjZXB0aW9uJykge1xyXG5cdFx0XHQvLyBoYW5kbGVcclxuXHRcdH0gZWxzZSBpZiAoZXJyb3IuY29uc3RydWN0b3IubmFtZSA9PSAnTm90SW5QYWdlUmFuZ2VFeGNlcHRpb24nKSB7XHJcblx0XHRcdC8vIGhhbmRsZVxyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiBmYWxzZTtcclxuXHR9XHJcblxyXG5cdGhhbmRsZUVycm9ycyhlcnJvciwgbWVzc2FnZSlcclxuXHR7XHJcblx0XHRjb25zb2xlLmVycm9yKGVycm9yLmNvbnN0cnVjdG9yLm5hbWUgKyAnOiAnICsgbWVzc2FnZSk7XHJcblx0fVxyXG5cclxuXHRoYW5kbGVXYXJuaW5ncyhlcnJvciwgbWVzc2FnZSlcclxuXHR7XHJcblx0XHRjb25zb2xlLndhcm4oZXJyb3IuY29uc3RydWN0b3IubmFtZSArICc6ICcgKyBtZXNzYWdlKTtcclxuXHR9XHJcblxyXG5cdGhhbmRsZUluZm9zKGVycm9yLCBtZXNzYWdlKVxyXG5cdHtcclxuXHRcdGNvbnNvbGUuaW5mbyhlcnJvci5jb25zdHJ1Y3Rvci5uYW1lICsgJzogJyArIG1lc3NhZ2UpO1xyXG5cdH1cclxufVxuXG5sZXQgZGVmYXVsdE1lc3NhZ2UgPSAnQW4gaW52YWxpZCBhcmd1bWVudCB3YXMgcGFzc2VkLic7XHJcblxyXG5jbGFzcyBJbnZhbGlkQXJndW1lbnRFeGNlcHRpb24kMSBleHRlbmRzIEV4Y2VwdGlvbkhhbmRsZXJcclxue1xyXG5cdGNvbnN0cnVjdG9yKG1lc3NhZ2UgPSBudWxsKSBcclxuXHR7XHJcblx0XHRtZXNzYWdlID0gbWVzc2FnZSB8fCBkZWZhdWx0TWVzc2FnZTtcclxuXHRcdHN1cGVyKG1lc3NhZ2UpO1xyXG4gICAgXHRzdXBlci5zdGFja1RyYWNlKHRoaXMsIG1lc3NhZ2UpO1xyXG4gICAgfVxyXG59XG5cbi8qKlxyXG4gKiBAZmlsZSBcclxuICogRE9NIGNsYXNzLlxyXG4gKlxyXG4gKiBBZGRzIHNvbWUgdXNlZnVsIGZ1bmN0aW9uYWxpdHkgZm9yXHJcbiAqIGZldGNoaW5nIG9yIG1hbmlwdWxhdGluZyBET00gZWxlbWVudHMuXHJcbiAqL1xyXG5cclxuY2xhc3MgRE9NXHJcbntcclxuXHQvKipcclxuXHQgKiBNaW5pZmllcyB0aGUgY3NzIHRleHQuXHJcblx0ICogXHJcblx0ICogQHBhcmFtIHN0cmluZyB8IHN0cmluZ1xyXG5cdCAqIEByZXR1cm4gc3RyaW5nXHJcblx0ICovXHJcblx0c3RhdGljIG1pbmlmeUNzcyhzdHJpbmcpIFxyXG5cdHtcclxuXHQgICAgc3RyaW5nID0gc3RyaW5nLnJlcGxhY2UoL1xcL1xcKig/Oig/IVxcKlxcLylbXFxzXFxTXSkqXFwqXFwvfFtcXHJcXG5cXHRdKy9nLCAnJyk7XHJcblx0ICAgIHN0cmluZyA9IHN0cmluZy5yZXBsYWNlKC8gezIsfS9nLCAnICcpO1xyXG5cdCAgICBzdHJpbmcgPSBzdHJpbmcucmVwbGFjZSgvKFt7On1dKS9nLCAnJDEnKTtcclxuXHQgICAgc3RyaW5nID0gc3RyaW5nLnJlcGxhY2UoLyhbOyxdKSAvZywgJyQxJyk7XHJcblx0ICAgIHN0cmluZyA9IHN0cmluZy5yZXBsYWNlKC8gIS9nLCAnIScpO1xyXG5cdCAgICBcclxuXHQgICAgcmV0dXJuIHN0cmluZztcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFN3aXRjaGVzIGJldHdlZW4gdHdvIGdpdmVuIGNsYXNzZXMuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gb2JqZWN0IHwgZWxlbWVudFxyXG5cdCAqIEBwYXJhbSBzdHJpbmcgfCBjbGFzc05hbWVcclxuXHQgKiBAcGFyYW0gc3RyaW5nIHwgbmV3Q2xhc3NOYW1lXHJcblx0ICogQHJldHVybiBvYmplY3RcclxuXHQgKi9cclxuXHRzdGF0aWMgc3dpdGNoQ2xhc3NlcyhlbGVtZW50LCBjbGFzc05hbWUsIG5ld0NsYXNzTmFtZSkgXHJcblx0e1xyXG5cdFx0dGhpcy5yZW1vdmVDbGFzcyhlbGVtZW50LCBjbGFzc05hbWUpO1xyXG5cdFx0dGhpcy5hZGRDbGFzcyhlbGVtZW50LCBuZXdDbGFzc05hbWUpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQWRkcyBjbGFzcyB0byBhIGdpdmVuIGVsZW1lbnQuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gb2JqZWN0IHwgZWxlbWVudFxyXG5cdCAqIEBwYXJhbSBzdHJpbmcgfCBjbGFzc05hbWVcclxuXHQgKiBAcmV0dXJuIG9iamVjdFxyXG5cdCAqL1xyXG5cdHN0YXRpYyBhZGRDbGFzcyhlbGVtZW50LCBjbGFzc05hbWUpIFxyXG5cdHtcclxuXHRcdGlmKGVsZW1lbnQgPT09IG51bGwpIHtcclxuXHRcdFx0dGhyb3cgbmV3IEludmFsaWRBcmd1bWVudEV4Y2VwdGlvbiQxO1xyXG5cdFx0fVxyXG5cclxuXHRcdGlmKCEgY2xhc3NOYW1lIHx8IGNsYXNzTmFtZSA9PSAnJyB8fCB0eXBlb2YgY2xhc3NOYW1lID09PSB1bmRlZmluZWQpIHtcclxuXHRcdFx0cmV0dXJuIGVsZW1lbnQ7XHJcblx0XHR9XHJcblxyXG5cdFx0bGV0IGNsYXNzTmFtZXMgPSBjbGFzc05hbWUuc3BsaXQoJyAnKTtcclxuXHJcblx0XHRjbGFzc05hbWVzLmZvckVhY2goZnVuY3Rpb24obmFtZSkge1xyXG5cdFx0XHRlbGVtZW50LmNsYXNzTGlzdC5hZGQobmFtZSk7XHJcblx0XHR9KTtcclxuXHRcdFxyXG5cdFx0cmV0dXJuIGVsZW1lbnQ7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBDaGVja3MgaWYgYW4gZWxlbWVudCBoYXMgYSBjbGFzcy5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSBIVE1MRWxlbWVudCB8IGVsZW1lbnRcclxuXHQgKiBAcGFyYW0gc3RyaW5nIHwgY2xhc3NOYW1lXHJcblx0ICogQHJldHVybiBib29sXHJcblx0ICovXHJcblx0c3RhdGljIGhhc0NsYXNzKGVsZW1lbnQsIGNsYXNzTmFtZSlcclxuXHR7XHJcblx0XHRpZiAoZWxlbWVudCA9PT0gbnVsbCkge1xyXG5cdFx0XHR0aHJvdyBuZXcgSW52YWxpZEFyZ3VtZW50RXhjZXB0aW9uJDEoJ2hhc0NsYXNzKCkgZXhwZWN0cyB0aGUgZmlyc3QgYXJndW1lbnQgdG8gYmUgYW4gSFRNTEVsZW1lbnQgYnV0IG51bGwgd2FzIHBhc3NlZC4nKTtcclxuXHRcdH1cclxuXHJcblx0XHRpZiAoISBjbGFzc05hbWUgfHwgY2xhc3NOYW1lID09ICcnIHx8IHR5cGVvZiBjbGFzc05hbWUgPT0gJ3VuZGVmaW5lZCcpIHtcclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiBlbGVtZW50LmNsYXNzTmFtZS5pbmRleE9mKGNsYXNzTmFtZSkgIT0gLTE7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBSZW1vdmVzIGNsYXNzIGZyb20gYSBnaXZlbiBlbGVtZW50LlxyXG5cdCAqIFxyXG5cdCAqIEBwYXJhbSBvYmplY3QgfCBlbGVtZW50XHJcblx0ICogQHBhcmFtIHN0cmluZyB8IGNsYXNzTmFtZVxyXG5cdCAqIEByZXR1cm4gb2JqZWN0XHJcblx0ICovXHJcblx0c3RhdGljIHJlbW92ZUNsYXNzKGVsZW1lbnQsIGNsYXNzTmFtZSkgXHJcblx0e1xyXG5cdFx0aWYoZWxlbWVudCA9PSBudWxsKSB7XHJcblx0XHRcdHRocm93IG5ldyBJbnZhbGlkQXJndW1lbnRFeGNlcHRpb24kMTtcclxuXHRcdH1cclxuXHJcblx0XHRpZihjbGFzc05hbWUgPT0gJycpIHtcclxuXHRcdFx0ZWxlbWVudC5jbGFzc05hbWUgPSAnJztcclxuXHRcdH0gZWxzZSB7XHJcblxyXG5cdFx0XHRsZXQgY2xhc3NOYW1lcyA9IGNsYXNzTmFtZS5zcGxpdCgnICcpO1xyXG5cclxuXHRcdFx0Y2xhc3NOYW1lcy5mb3JFYWNoKGZ1bmN0aW9uKG5hbWUpIHtcclxuXHRcdFx0XHRlbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUobmFtZSk7XHJcblx0XHRcdH0pO1xyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiBlbGVtZW50O1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogUmVtb3ZlcyBhbiBlbGVtZW50IGZyb20gdGhlIERPTS5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSBIVE1MRWxlbWVudFxyXG5cdCAqIEByZXR1cm4gdm9pZFxyXG5cdCAqL1xyXG5cdHN0YXRpYyByZW1vdmUoZWxlbWVudClcclxuXHR7XHJcblx0XHRlbGVtZW50LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoZWxlbWVudCk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBBZGRzIHN0eWxlIHRhZyB3aXRoIGdpdmVuIGlkIGFuZCBjc3MgdG8gdGhlIERPTS5cclxuXHQgKiBcclxuXHQgKiBAcGFyYW0gc3RyaW5nIHwgaWRcclxuXHQgKiBAcGFyYW0gc3RyaW5nIHwgY3NzXHJcblx0ICogQHJldHVybiB2b2lkXHJcblx0ICovXHJcblx0c3RhdGljIGFkZFN0eWxlKGlkLCBjc3MpXHJcblx0e1xyXG5cdFx0aWYgKHR5cGVvZiBjc3MgIT0gJ3N0cmluZycpIHtcclxuXHRcdFx0dGhyb3cgbmV3IEludmFsaWRBcmd1bWVudEV4Y2VwdGlvbiQxO1xyXG5cdFx0fVxyXG5cclxuXHRcdGxldCBoZWFkID0gZG9jdW1lbnQuaGVhZCB8fCBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnaGVhZCcpWzBdO1xyXG5cdFx0bGV0IHN0eWxlVGFnID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3R5bGUnKTtcclxuXHJcblx0XHQvLyBwaXBlIGl0IHRocm91Z2ggdGhlIG1pbmZpZXJcclxuXHQgICAgbGV0IENTUyA9IHRoaXMubWluaWZ5Q3NzKGNzcyk7XHJcblx0ICAgIC8vIGFkZGluZyBpdCB0byB0aGUgc3R5bGV0YWdcclxuXHQgICAgc3R5bGVUYWcuaW5uZXJIVE1MID0gQ1NTO1xyXG5cdCAgICAvLyBnaXZlIGFuIGlkIHRvIHJlY29nbml6ZSB0aGUgc3R5bGUgdGFnXHJcblx0XHRzdHlsZVRhZy5zZXRBdHRyaWJ1dGUoJ2lkJywgaWQpO1xyXG5cdFx0Ly8gYXBwZW5kaW5nIHRoYXQgc3R5bGUgdGFnIHRvIHRoZSBET00gaGVhZCB0YWdcclxuXHRcdGhlYWQuYXBwZW5kQ2hpbGQoc3R5bGVUYWcpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQWRkcyBsaW5rZWQgc3R5bGUgdGFnIHdpdGggZ2l2ZW4gaWQgYW5kIHNyYyB0byB0aGUgRE9NLlxyXG5cdCAqIFxyXG5cdCAqIEBwYXJhbSBzdHJpbmcgfCBpZFxyXG5cdCAqIEBwYXJhbSBzdHJpbmcgfCBzb3VyY2VcclxuXHQgKiBAcmV0dXJuIHZvaWRcclxuXHQgKi9cclxuXHRzdGF0aWMgYWRkTGlua2VkU3R5bGUoaWQsIHNvdXJjZSkgXHJcblx0e1xyXG5cdFx0aWYgKHR5cGVvZiBzb3VyY2UgIT0gJ3N0cmluZycpIHtcclxuXHRcdFx0dGhyb3cgbmV3IEludmFsaWRBcmd1bWVudEV4Y2VwdGlvbiQxKCdET00uYWRkTGlua2VkU3R5bGUoKSBleGNwZWN0cyB0aGUgc2Vjb25kIHBhcmFtZXRlciB0byBiZSBzdHJpbmcsIGJ1dCAnICsgdHlwZW9mIHNvdXJjZSArICcgd2FzIHBhc3NlZCBpbnN0ZWFkLicpO1xyXG5cdFx0fVxyXG5cclxuXHRcdGxldCBoZWFkID0gZG9jdW1lbnQuaGVhZCB8fCBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnaGVhZCcpWzBdO1xyXG5cdFx0bGV0IGxpbmtlZFN0eWxlVGFnID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGluaycpO1xyXG5cclxuXHQgICAgLy8gZ2l2ZSBhbiBpZCB0byByZWNvZ25pemUgdGhlIHN0eWxlIHRhZ1xyXG5cdFx0bGlua2VkU3R5bGVUYWcuc2V0QXR0cmlidXRlKCdpZCcsIGlkKTtcclxuXHRcdGxpbmtlZFN0eWxlVGFnLnNldEF0dHJpYnV0ZSgnaHJlZicsIHNvdXJjZSk7XHJcblx0XHRsaW5rZWRTdHlsZVRhZy5zZXRBdHRyaWJ1dGUoJ3JlbCcsICdzdHlsZXNoZWV0Jyk7XHJcblx0XHRsaW5rZWRTdHlsZVRhZy5zZXRBdHRyaWJ1dGUoJ3R5cGUnLCAndGV4dC9jc3MnKTtcclxuXHRcdC8vIGFwcGVuZGluZyB0aGF0IHN0eWxlIHRhZyB0byB0aGUgRE9NIGhlYWQgdGFnXHJcblx0XHRoZWFkLmFwcGVuZENoaWxkKGxpbmtlZFN0eWxlVGFnKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIENyZWF0ZXMgYW4gZWxlbWVudCB3aXRoIHRoZSBnaXZlbiBvcHRpb25zLlxyXG5cdCAqIFxyXG5cdCAqIEBwYXJhbSBzdHJpbmcgfCBlbGVtZW50VHlwZVxyXG5cdCAqIEBwYXJhbSBvYmplY3QgfCBvcHRpb25zXHJcblx0ICogQHJldHVybiBIVE1MRWxlbWVudFxyXG5cdCAqL1xyXG5cdHN0YXRpYyBjcmVhdGVFbGVtZW50KGVsZW1lbnRUeXBlLCBvcHRpb25zKVxyXG5cdHtcclxuXHRcdGxldCBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChlbGVtZW50VHlwZSk7XHJcblx0XHJcblx0XHRpZiAob3B0aW9ucyA9PT0gdW5kZWZpbmVkKSB7XHJcblx0XHRcdHJldHVybiBlbGVtZW50O1xyXG5cdFx0fVxyXG5cclxuXHRcdGZvciAobGV0IG9wdGlvbiBpbiBvcHRpb25zKSB7XHJcblx0XHRcdHN3aXRjaChvcHRpb24pXHJcblx0XHRcdHtcclxuXHRcdFx0XHRjYXNlICd0ZXh0JzpcclxuXHRcdFx0XHRjYXNlICdodG1sJzpcclxuXHRcdFx0XHRcdGVsZW1lbnQuaW5uZXJIVE1MID0gb3B0aW9uc1tvcHRpb25dO1xyXG5cdFx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdFx0ZGVmYXVsdDpcclxuXHRcdFx0XHRcdGVsZW1lbnQuc2V0QXR0cmlidXRlKG9wdGlvbiwgb3B0aW9uc1tvcHRpb25dKTtcclxuXHRcdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIGVsZW1lbnQ7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBUb2dnbGVzIHRoZSBnaXZlbiBjbGFzc2VzLlxyXG5cdCAqIFxyXG5cdCAqIEBwYXJhbSBvYmplY3QgfCBlbGVtZW50XHJcblx0ICogQHBhcmFtIHN0cmluZyB8IGNsYXNzTmFtZVxyXG5cdCAqIEByZXR1cm4gYm9vbFxyXG5cdCAqL1xyXG5cdHN0YXRpYyB0b2dnbGVDbGFzcyhlbGVtZW50LCBjbGFzc05hbWUsIHNlY29uZENsYXNzTmFtZSlcclxuXHR7XHJcblx0XHRpZiAoZWxlbWVudCA9PSBudWxsIHx8IHR5cGVvZiBlbGVtZW50ID09ICd1bmRlZmluZWQnKSB7XHJcblx0XHRcdHRocm93IG5ldyBJbnZhbGlkQXJndW1lbnRFeGNlcHRpb24kMTtcclxuXHRcdH1cclxuXHJcblx0XHRzZWNvbmRDbGFzc05hbWUgPSBzZWNvbmRDbGFzc05hbWUgfHwgdW5kZWZpbmVkO1xyXG5cclxuXHRcdGlmKHNlY29uZENsYXNzTmFtZSkge1xyXG5cdFx0XHRlbGVtZW50LmNsYXNzTGlzdC50b2dnbGUoc2Vjb25kQ2xhc3NOYW1lKTtcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gZWxlbWVudC5jbGFzc0xpc3QudG9nZ2xlKGNsYXNzTmFtZSk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBGaW5kcyBhbiBlbGVtZW50IGluc2lkZSBvZiBwYXJlbnQuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gc3RyaW5nIHwgc2VsZWN0b3JcclxuXHQgKiBAcGFyYW0gb2JqZWN0IHwgY29udGV4dFxyXG5cdCAqIEByZXR1cm4gbWl4ZWRcclxuXHQgKi9cclxuXHRzdGF0aWMgZmluZChzZWxlY3RvciwgY29udGV4dCA9IHdpbmRvdy5kb2N1bWVudCkgXHJcblx0e1xyXG5cdFx0cmV0dXJuIHF1ZXJ5RWxlbWVudChzZWxlY3RvciwgY29udGV4dCk7XHJcblx0fVxyXG59XHJcblxyXG4vKipcclxuICogUXVlcmllcyBhbiBlbGVtZW50IGZyb20gdGhlIERPTS5cclxuICpcclxuICogQHBhcmFtIHN0cmluZyB8IHNlbGVjdG9yXHJcbiAqIEBwYXJhbSBvYmplY3QgfCBwYXJlbnRFbGVtZW50XHJcbiAqIEByZXR1cm4gbWl4ZWRcclxuICovXHJcbmZ1bmN0aW9uIHF1ZXJ5RWxlbWVudChzZWxlY3RvciwgcGFyZW50RWxlbWVudCkgXHJcbntcclxuXHRpZiAodHlwZW9mIHNlbGVjdG9yICE9ICdzdHJpbmcnKSB7XHJcblx0XHR0aHJvdyBuZXcgSW52YWxpZEFyZ3VtZW50RXhjZXB0aW9uJDEoJ3F1ZXJ5RWxlbWVudCgpIGV4cGVjdHMgZmlyc3QgcGFyYW1ldGVyIHRvIGJlIGEgc3RyaW5nLCBidXQgJyArIHR5cGVvZiBzZWxlY3RvciArICcgd2FzIHBhc3NlZCBpbnN0ZWFkLicpO1xyXG5cdH1cclxuXHJcblx0bGV0IGVsZW1lbnQgPSBwYXJlbnRFbGVtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3IpO1xyXG5cclxuXHRpZiAoZWxlbWVudC5sZW5ndGggPT0gMCkge1xyXG5cdFx0cmV0dXJuIG51bGw7XHJcblx0fVxyXG5cclxuXHRyZXR1cm4gKGVsZW1lbnQubGVuZ3RoID4gMSkgPyBlbGVtZW50IDogZWxlbWVudFswXTtcclxufVxyXG5cclxuLyoqXHJcbiAqIENoZWNrcyBpZiBwYXJlbnQgaGFzIGNoaWxkLlxyXG4gKlxyXG4gKiBAcGFyYW0gb2JqZWN0IHwgcGFyZW50RWxlbWVudFxyXG4gKiBAcGFyYW0gb2JqZWN0IHwgY2hpbGRFbGVtZW50XHJcbiAqIEByZXR1cm4gYm9vbFxyXG4gKi9cclxuZnVuY3Rpb24gaGFzQ2hpbGQocGFyZW50RWxlbWVudCwgY2hpbGRFbGVtZW50KSBcclxue1xyXG4gICAgIGxldCBub2RlID0gY2hpbGRFbGVtZW50LnBhcmVudE5vZGU7XHJcbiAgICAgXHJcbiAgICAgd2hpbGUgKG5vZGUgIT0gbnVsbCkge1xyXG4gICAgICAgICBpZiAobm9kZSA9PSBwYXJlbnRFbGVtZW50KSB7XHJcbiAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgfVxyXG4gICAgICAgICBub2RlID0gbm9kZS5wYXJlbnROb2RlO1xyXG4gICAgIH1cclxuICAgICBcclxuICAgICByZXR1cm4gZmFsc2U7XHJcbn1cblxuLyoqXHJcbiAqIEBmaWxlIFxyXG4gKiBDb21tb24gY2xhc3MuXHJcbiAqXHJcbiAqIEFkZHMgc29tZSB1c2VmdWwgZnVuY3Rpb25hbGl0eSBmb3JcclxuICogY29tbW9uIHRhc2tzIC0gZGF0YSBjaGVja3Mgb3IgZGF0YSBtYW5pcHVsYXRpb24uXHJcbiAqL1xyXG5cclxuY2xhc3MgQ29tbW9uXHJcbntcclxuXHQvKipcclxuXHQgKiBFeHRlbmQgYW4gb2JqZWN0LlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIG9iamVjdCB8IGN1cnJlbnRPYmplY3RcclxuXHQgKiBAcGFyYW0gb2JqZWN0IHwgbmV3T2JqZWN0XHJcblx0ICogQHJldHVybiBvYmplY3RcclxuXHQgKi9cclxuXHRzdGF0aWMgZXh0ZW5kKGN1cnJlbnRPYmplY3QsIG5ld09iamVjdCkge1xyXG5cdFx0dmFyIGV4dGVuZGVkID0ge307XHJcblx0ICAgIHZhciBwcm9wO1xyXG5cclxuXHQgICAgZm9yIChwcm9wIGluIGN1cnJlbnRPYmplY3QpIHtcclxuXHQgICAgICAgIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoY3VycmVudE9iamVjdCwgcHJvcCkpIHtcclxuXHQgICAgICAgICAgICBleHRlbmRlZFtwcm9wXSA9IGN1cnJlbnRPYmplY3RbcHJvcF07XHJcblx0ICAgICAgICB9XHJcblx0ICAgIH1cclxuXHJcblx0ICAgIGZvciAocHJvcCBpbiBuZXdPYmplY3QpIHtcclxuXHQgICAgICAgIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwobmV3T2JqZWN0LCBwcm9wKSkge1xyXG5cdCAgICAgICAgICAgIGV4dGVuZGVkW3Byb3BdID0gbmV3T2JqZWN0W3Byb3BdO1xyXG5cdCAgICAgICAgfVxyXG5cdCAgICB9XHJcblxyXG5cdCAgICByZXR1cm4gZXh0ZW5kZWQ7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBDaGVja3MgZm9yIGEgbmVlZGxlIGluIGh5c3RhY2sgYXJyYXkuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gbWl4ZWQgfCBuZWVkbGVcclxuXHQgKiBAcGFyYW0gb2JqZWN0IHwgb2JqZWN0XHJcblx0ICogQHJldHVybiBib29sXHJcblx0ICpcclxuXHQgKi9cclxuXHRzdGF0aWMgaW5fYXJyYXkobmVlZGxlLCBoeXN0YWNrKSB7XHJcblx0XHRpZiAodHlwZW9mIGh5c3RhY2sgPT0gJ3VuZGVmaW5lZCcgfHwgaHlzdGFjay5jb25zdHJ1Y3RvciAhPT0gQXJyYXkpIHtcclxuXHRcdFx0dGhyb3cgbmV3IEludmFsaWRBcmd1bWVudEV4Y2VwdGlvbiQxKCdDb21tb24uaW5fYXJyYXkoKSBleHBlY3RzIHRoZSBzZWNvbmQgcGFyYW1ldGVyIHRvIGJlIGFuIGFycmF5LCBidXQgJyArIHR5cGVvZiBoeXN0YWNrICsgJyB3YXMgcGFzc2QgaW5zdGVhZCcpO1xyXG5cdFx0fVxyXG5cclxuXHRcdGZvciAodmFyIGkgPSAwOyBpIDw9IGh5c3RhY2subGVuZ3RoOyBpKyspIHtcclxuXHRcdFx0aWYgKG5lZWRsZSA9PSBoeXN0YWNrW2ldKSB7XHJcblx0XHRcdFx0cmV0dXJuIHRydWU7XHRcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdFxyXG5cdFx0cmV0dXJuIGZhbHNlO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogVGFrZXMgYW4gYXJyYXkgYW5kIGNodW5rcyBpdC5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSBhcnJheSB8IHRvdGFsXHJcblx0ICogQHBhcmFtIG51bWJlciB8IGNodW5rc1xyXG5cdCAqIEByZXR1cm4gYXJyYXlcclxuXHQgKi9cclxuXHRzdGF0aWMgYXJyYXlfY2h1bmsodG90YWwsIHNpemUgPSA1KVxyXG5cdHsgICAgICAgIFxyXG4gICAgICBcdGlmIChpc05hTihzaXplKSkge1xyXG4gICAgICBcdFx0dGhyb3cgbmV3IEludmFsaWRBcmd1bWVudEV4Y2VwdGlvbiQxKCdDb21tb24uYXJyYXlfY2h1bmsoKSBleHBlY3RzIHRoZSBzZWNvbmQgcGFyYW1ldGVyIHRvIGJlIGEgbnVtYmVyLCBidXQgJyArIHR5cGVvZiBzaXplICsgJyBwYXNzZWQgaW5zdGVhZC4nKVxyXG4gICAgICBcdH1cclxuXHJcbiAgICAgIFx0c2l6ZSA9IHBhcnNlSW50KHNpemUpO1xyXG4gICAgICAgXHJcbiAgICAgICBcdGxldCBpO1xyXG4gICAgICAgXHRsZXQgY29sbGVjdGlvbiA9IFtdO1xyXG5cclxuICAgICAgICAvLyBhZGQgZWFjaCBjaHVuayB0byB0aGUgcmVzdWx0XHJcbiAgICAgICAgZm9yIChpID0gMDsgaSA8IE1hdGguY2VpbCh0b3RhbC5sZW5ndGggLyBzaXplKTsgaSsrKSB7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB2YXIgc3RhcnQgPSBpICogc2l6ZTtcclxuICAgICAgICAgICAgdmFyIGVuZCA9IHN0YXJ0ICsgc2l6ZTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGNvbGxlY3Rpb24ucHVzaCh0b3RhbC5zbGljZShzdGFydCwgZW5kKSk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICByZXR1cm4gY29sbGVjdGlvbjtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIENoZWNrcyBpZiBhbiBvYmplY3QgaXMgZW1wdHkuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gb2JqZWN0IHwgb2JqZWN0XHJcblx0ICogQHJldHVybiBib29sXHJcblx0ICovXHJcblx0c3RhdGljIGVtcHR5T2JqZWN0KG9iamVjdCkge1xyXG5cdFx0Zm9yIChsZXQgcHJvcCBpbiBvYmplY3QpIHtcclxuXHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiB0cnVlO1xyXG5cdH1cclxuXHJcblxyXG5cdC8qKlxyXG5cdCAqIENoZWNrcyBpZiBhIGdpdmVuIG9iamVjdCBjb250YWluZWQgaW4gYW4gYXJyYXkuXHJcblx0ICogXHJcblx0ICogQHBhcmFtIG9iamVjdCB8IG9iamVjdFxyXG5cdCAqIEBwYXJhbSBhcnJheSB8IGhheXN0YWNrXHJcblx0ICogQHJldHVybiBib29sXHJcblx0ICovXHJcblx0c3RhdGljIGNvbnRhaW5zT2JqZWN0KG9iamVjdCwgaHlzdGFjaykgXHJcblx0e1xyXG5cdCAgICBsZXQgaTtcclxuXHJcblx0ICAgIGZvciAoaSA9IDA7IGkgPCBoeXN0YWNrLmxlbmd0aDsgaSsrKSB7XHJcblx0ICAgICAgICBpZiAodHlwZW9mIG9iamVjdCA9PSAnc3RyaW5nJyAmJiBoeXN0YWNrW2ldLmNvbnN0cnVjdG9yLm5hbWUgPT09IG9iamVjdCkge1xyXG5cdCAgICAgICAgXHRyZXR1cm4gdHJ1ZTtcclxuXHQgICAgICAgIH1cclxuXHJcblx0ICAgICAgICBpZiAoaHlzdGFja1tpXSA9PT0gb2JqZWN0KSB7XHJcblx0ICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcblx0ICAgICAgICB9XHJcblx0ICAgIH1cclxuXHJcblx0ICAgIHJldHVybiBmYWxzZTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIENoZWNrcyBpZiBhIGdpdmVuIHBhcmFtZXRlciBpcyBhbiBvYmplY3QuXHJcblx0ICogXHJcblx0ICogQHBhcmFtIG9iamVjdCB8IG9iamVjdFxyXG5cdCAqIEByZXR1cm4gYm9vbFxyXG5cdCAqL1xyXG5cdHN0YXRpYyBpc09iamVjdChvYmplY3QpIFxyXG5cdHtcclxuXHRcdHJldHVybiB0eXBlb2Ygb2JqZWN0ID09ICdvYmplY3QnO1xyXG5cdH1cclxufVxuXG5sZXQgZGVmYXVsdE1lc3NhZ2UkMSA9ICdUaGUgZGF0YSBzdHJ1Y3R1cmUgaXMgaW52YWxpZCc7XHJcblxyXG5jbGFzcyBJbnZhbGlkRGF0YVN0cnVjdHVyZUV4Y2VwdGlvbiBleHRlbmRzIEV4Y2VwdGlvbkhhbmRsZXJcclxue1xyXG5cdGNvbnN0cnVjdG9yKG1lc3NhZ2UgPSBudWxsKSBcclxuXHR7XHJcblx0XHRtZXNzYWdlID0gbWVzc2FnZSB8fCBkZWZhdWx0TWVzc2FnZSQxO1xyXG5cdFx0c3VwZXIobWVzc2FnZSk7XHJcbiAgICBcdHN1cGVyLnN0YWNrVHJhY2UodGhpcywgbWVzc2FnZSk7XHJcbiAgICB9XHJcbn1cblxuLyoqXHJcbiAqIEBmaWxlIFxyXG4gKiBSZXF1ZXN0IGNsYXNzLlxyXG4gKlxyXG4gKiBIYW5kbGVzIGFqYXggcmVxdWVzdHMgUE9TVCwgR0VUIGV0Yy4uLlxyXG4gKi9cclxuXHJcbi8qKlxyXG4gKiBTdG9yZXMgdGhlIGRlZmF1bHQgc2V0dGluZ3MuXHJcbiAqXHJcbiAqIEB2YXIgb2JqZWN0XHJcbiAqL1xyXG5cclxubGV0IGRlZmF1bHRTZXR0aW5ncyA9IHtcclxuXHRoZWFkZXJzOiB7XHJcblx0XHQnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nXHJcblx0fSxcclxuXHRhc3luYzogdHJ1ZVxyXG59O1xyXG5cclxuY2xhc3MgUmVxdWVzdFxyXG57XHJcblx0LyoqXHJcblx0ICogLSBJbml0aWFsaXplIHRoZSBzZXR0aW5ncyBvYmplY3QuXHJcblx0ICogLSBJbml0aWFsaXplIHRoZSB4aHIgb2JqZWN0LlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIG9iamVjdCB8IHNldHRpbmdzXHJcblx0ICogQHJldHVybiB2b2lkXHJcblx0ICovXHJcblx0Y29uc3RydWN0b3Ioc2V0dGluZ3MpXHJcblx0e1xyXG5cdFx0dGhpcy5zZXR0aW5ncyA9IENvbW1vbi5leHRlbmQoZGVmYXVsdFNldHRpbmdzLCBzZXR0aW5ncyk7XHJcblx0XHR0aGlzLnNldERlZmF1bHRSZXF1ZXN0SGVhZGVyKCk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBTZXRzIHRoZSBkZWZhdWx0IHJlcXVlc3QgaGVhZGVycy5cclxuXHQgKlxyXG5cdCAqIEByZXR1cm4gdm9pZFxyXG5cdCAqL1xyXG5cdHNldERlZmF1bHRSZXF1ZXN0SGVhZGVyKClcclxuXHR7XHJcblx0XHRsZXQgaGVhZGVyO1xyXG5cdFx0bGV0IGhlYWRlcnMgPSB0aGlzLnNldHRpbmdzLmhlYWRlcnM7XHJcblx0XHRsZXQgYXN5bmMgPSB0aGlzLnNldHRpbmdzLmFzeW5jO1xyXG5cdFx0bGV0IG9wZW4gPSBYTUxIdHRwUmVxdWVzdC5wcm90b3R5cGUub3BlbjtcclxuXHRcdGxldCBzZXRSZXF1ZXN0SGVhZGVyID0gWE1MSHR0cFJlcXVlc3QucHJvdG90eXBlLnNldFJlcXVlc3RIZWFkZXI7XHJcblxyXG5cdFx0WE1MSHR0cFJlcXVlc3QucHJvdG90eXBlLm9wZW4gPSBmdW5jdGlvbigpIHtcclxuXHRcdFx0dmFyIHJlc3BvbnNlID0gb3Blbi5hcHBseSh0aGlzLCBhcmd1bWVudHMsIGFzeW5jKTtcclxuXHJcblx0XHRcdGZvciAoaGVhZGVyIGluIGhlYWRlcnMpIHtcclxuXHRcdFx0XHR0aGlzLnNldFJlcXVlc3RIZWFkZXIoaGVhZGVyLCBoZWFkZXJzW2hlYWRlcl0pO1xyXG5cdFx0XHR9XHJcblxyXG5cdCAgXHRcdHJldHVybiByZXNwb25zZTtcclxuXHRcdH07XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBNYWtlcyBhIFBPU1QgcmVxdWVzdC5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSBvYmplY3QgfCBvcHRpb25zXHJcblx0ICogQHJldHVybiBQcm9taXNlXHJcblx0ICovXHJcblx0cG9zdChvcHRpb25zKVxyXG5cdHtcclxuXHRcdGxldCB4aHIgPSB0aGlzLnhocjtcclxuXHJcblx0XHRpZihvcHRpb25zLmhhc093blByb3BlcnR5KCdiZWZvcmUnKSAmJiB0eXBlb2Ygb3B0aW9ucy5iZWZvcmUgPT0gJ2Z1bmN0aW9uJykge1xyXG5cdFx0XHRvcHRpb25zLmJlZm9yZS5jYWxsKHRoaXMpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcclxuXHRcdFx0aWYodHlwZW9mIG9wdGlvbnMgIT09ICdvYmplY3QnKSB7XHJcblx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKCdnZXQgZXhwZWN0aW5nIGEganNvbiBvYmplY3QgdG8gYmUgcGFzc2VkIGFzIGFuIGFyZ3VtZW50LCBidXQgJysgdHlwZW9mIG9wdGlvbnMgKyAnIHdhcyBwYXNzZWQuJyk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdG9wdGlvbnMuZGF0YSA9IG9wdGlvbnMuZGF0YSB8fCB7fTtcclxuXHJcblx0XHRcdGlmKHR5cGVvZiBvcHRpb25zLmRhdGEgIT09ICdvYmplY3QnKSB7XHJcblx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKCdkYXRhIHByb3BlcnR5IGV4cGVjdGluZyBhIGpzb24gb2JqZWN0IHRvIGJlIHBhc3NlZCBhcyBhbiBhcmd1bWVudCwgYnV0ICcgKyB0eXBlb2Ygb3B0aW9ucy5kYXRhICsgJyB3YXMgcGFzc2VkLicpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHR4aHIub3BlbignUE9TVCcsIG9wdGlvbnMudXJsLCB0cnVlKTtcclxuXHJcblx0XHRcdHhoci5yZXNwb25zZVR5cGUgPSBvcHRpb25zLmRhdGFUeXBlIHx8ICdqc29uJztcclxuXHRcdFx0eGhyLnRpbWVvdXQgPSBvcHRpb25zLnRpbWVvdXQgfHwgMzAwMDtcclxuXHJcblx0XHRcdHhoci5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBmdW5jdGlvbigpIHtcclxuXHRcdFx0XHRpZiAodGhpcy5yZWFkeVN0YXRlID09IDQgJiYgKHRoaXMuc3RhdHVzID49IDQwMCAmJiB0aGlzLnN0YXR1cyA8PSA1MDApKSB7XHJcblx0XHRcdCAgICBcdHJlamVjdCh0aGlzLnJlc3BvbnNlVGV4dCk7XHJcblx0XHRcdCAgICB9XHJcblx0XHRcdCAgICBcclxuXHRcdFx0ICAgIGlmICh0aGlzLnJlYWR5U3RhdGUgIT0gNCB8fCB0aGlzLnN0YXR1cyAhPSAyMDApIHtcclxuXHRcdFx0ICAgIFx0cmV0dXJuO1xyXG5cdFx0XHQgICAgfVxyXG5cdCAgICAgICBcdFxyXG4gICAgICAgXHRcdFx0cmVzb2x2ZSh0aGlzLnJlc3BvbnNlKTtcclxuICAgICAgIFx0XHRcdFxyXG4gICAgICAgXHRcdFx0aWYgKG9wdGlvbnMuaGFzT3duUHJvcGVydHkoJ2FmdGVyJykgJiYgdHlwZW9mIG9wdGlvbnMuYWZ0ZXIgPT0gJ2Z1bmN0aW9uJykge1xyXG5cdFx0XHRcdFx0b3B0aW9ucy5hZnRlci5jYWxsKHRoaXMpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fTtcclxuXHJcblx0XHRcdHhoci5vbmVycm9yID0gZnVuY3Rpb24obWVzc2FnZSkge1xyXG5cdFx0XHRcdGlmKG9wdGlvbnMuaGFzT3duUHJvcGVydHkoJ2Vycm9yJykgJiYgdHlwZW9mIG9wdGlvbnMuZXJyb3IgPT0gJ2Z1bmN0aW9uJykge1xyXG5cdFx0XHRcdFx0b3B0aW9ucy5lcnJvcihtZXNzYWdlKTtcclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdHJlamVjdChtZXNzYWdlKTtcclxuXHRcdFx0fTtcclxuXHJcblx0XHRcdGlmKCEgb3B0aW9ucy5kYXRhKSB7XHJcblx0XHRcdFx0eGhyLnNlbmQobnVsbCk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHZhciBxdWVyeVN0cmluZyA9IE9iamVjdC5rZXlzKG9wdGlvbnMuZGF0YSkubWFwKGZ1bmN0aW9uKGtleSkge1xyXG5cdFx0ICAgICAgICAgICAgcmV0dXJuIGVuY29kZVVSSUNvbXBvbmVudChrZXkpICsgJz0nICtcclxuXHRcdCAgICAgICAgICAgICAgICBcdGVuY29kZVVSSUNvbXBvbmVudChvcHRpb25zLmRhdGFba2V5XSk7XHJcblx0XHQgICAgICAgIFx0fSkuam9pbignJicpO1xyXG5cclxuXHRcdFx0eGhyLnNlbmQocXVlcnlTdHJpbmcpO1xyXG5cdFx0fSk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBNYWtlcyBhIEdFVCBhamF4IHJlcXVlc3QuXHJcblx0ICogXHJcblx0ICogQHBhcmFtIG9iamVjdCB8IG9wdGlvbnNcclxuXHQgKiBAcmV0dXJuIFByb21pc2VcclxuXHQgKi9cclxuXHRnZXQob3B0aW9ucylcclxuXHR7XHJcblx0XHRsZXQgeGhyID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCkgfHwgbmV3IEFjdGl2ZVhPYmplY3QoXCJNaWNyb3NvZnQuWE1MSFRUUFwiKTtcdFx0XHRcclxuXHJcblx0XHRpZiAob3B0aW9ucy5oYXNPd25Qcm9wZXJ0eSgnYmVmb3JlJykgJiYgdHlwZW9mIG9wdGlvbnMuYmVmb3JlID09ICdmdW5jdGlvbicpIHtcclxuXHRcdFx0b3B0aW9ucy5iZWZvcmUuY2FsbCh0aGlzKTtcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XHJcblx0XHRcdGlmICh0eXBlb2Ygb3B0aW9ucyAhPT0gJ29iamVjdCcpIHtcclxuXHRcdFx0XHR0aHJvdyBuZXcgRXJyb3IoJ2dldCBleHBlY3RpbmcgYSBqc29uIG9iamVjdCB0byBiZSBwYXNzZWQgYXMgYW4gYXJndW1lbnQsIGJ1dCAnKyB0eXBlb2Ygb3B0aW9ucyArICcgd2FzIHBhc3NlZC4nKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0b3B0aW9ucy5kYXRhID0gb3B0aW9ucy5kYXRhIHx8IHt9O1xyXG5cclxuXHRcdFx0aWYgKHR5cGVvZiBvcHRpb25zLmRhdGEgIT09ICdvYmplY3QnKSB7XHJcblx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKCdkYXRhIHByb3BlcnR5IGV4cGVjdGluZyBhIGpzb24gb2JqZWN0IHRvIGJlIHBhc3NlZCBhcyBhbiBhcmd1bWVudCwgYnV0ICcgKyB0eXBlb2Ygb3B0aW9ucy5kYXRhICsgJyB3YXMgcGFzc2VkLicpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHR4aHIub3BlbignR0VUJywgb3B0aW9ucy51cmwsIHRydWUpO1xyXG5cclxuXHRcdFx0eGhyLnJlc3BvbnNlVHlwZSA9IG9wdGlvbnMuZGF0YVR5cGUgfHwgJ2pzb24nO1xyXG5cdFx0XHR4aHIudGltZW91dCA9IG9wdGlvbnMudGltZW91dCB8fCAzMDAwO1xyXG5cclxuXHRcdFx0aWYgKHhoci5yZXNwb25zZVR5cGUgPT0gJ2pzb24nKSB7XHJcblx0XHRcdFx0eGhyLnNldFJlcXVlc3RIZWFkZXIoJ0NvbnRlbnQtVHlwZScsICdhcHBsaWNhdGlvbi9qc29uJyk7XHJcblx0XHRcdFx0eGhyLnNldFJlcXVlc3RIZWFkZXIoJ0FjY2VwdCcsICdhcHBsaWNhdGlvbi9qc29uJyk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGlmICh4aHIucmVzcG9uc2VUeXBlID09ICdkb2N1bWVudCcpIHtcclxuXHRcdFx0XHR4aHIub3ZlcnJpZGVNaW1lVHlwZSgndGV4dC94bWwnKTtcclxuXHRcdFx0XHR4aHIuc2V0UmVxdWVzdEhlYWRlcignQ29udGVudC1UeXBlJywgJ3RleHQvaHRtbCcpO1xyXG5cdFx0XHRcdHhoci5zZXRSZXF1ZXN0SGVhZGVyKCdBY2NlcHQnLCAndGV4dC9odG1sJyk7XHRcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0eGhyLm9ucmVhZHlzdGF0ZWNoYW5nZSA9IGZ1bmN0aW9uKCkge1xyXG5cdFx0XHQgICAgaWYgKHRoaXMucmVhZHlTdGF0ZSA9PSA0ICYmICh0aGlzLnN0YXR1cyA+PSA0MDAgJiYgdGhpcy5zdGF0dXMgPD0gNTAwKSkge1xyXG5cdFx0XHQgICAgXHRyZWplY3QodGhpcy5yZXNwb25zZVRleHQpO1xyXG5cdFx0XHQgICAgfVxyXG5cdFx0XHQgICBcclxuXHRcdFx0ICAgIGlmICh0aGlzLnJlYWR5U3RhdGUgPT0gNCAmJiB0aGlzLnN0YXR1cyA9PSAyMDApIHtcclxuXHRcdFx0XHQgICAgbGV0IHJlc3BvbnNlID0gdGhpcy5yZXNwb25zZSB8fCB0aGlzLnJlc3BvbnNlVGV4dDtcclxuXHRcdFx0XHQgICAgcmVzcG9uc2UgPSAoeGhyLnJlc3BvbnNlVHlwZSA9PSAnanNvbicgJiYgdHlwZW9mIHJlc3BvbnNlICE9ICdvYmplY3QnKSA/IEpTT04ucGFyc2UocmVzcG9uc2UpIDogcmVzcG9uc2U7XHJcblx0XHRcdFx0ICAgIHJlc29sdmUocmVzcG9uc2UpO1xyXG5cdCAgICAgICBcdFx0XHRcclxuXHQgICAgICAgXHRcdFx0aWYgKG9wdGlvbnMuaGFzT3duUHJvcGVydHkoJ2FmdGVyJykgJiYgdHlwZW9mIG9wdGlvbnMuYWZ0ZXIgPT0gJ2Z1bmN0aW9uJykge1xyXG5cdFx0XHRcdFx0XHRvcHRpb25zLmFmdGVyLmNhbGwodGhpcyk7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9O1xyXG5cclxuXHRcdFx0eGhyLm9uYWJvcnQgPSB4aHIub25lcnJvciA9IGZ1bmN0aW9uKG1lc3NhZ2UpIHtcclxuXHRcdFx0XHRpZiAob3B0aW9ucy5oYXNPd25Qcm9wZXJ0eSgnZXJyb3InKSAmJiB0eXBlb2Ygb3B0aW9ucy5lcnJvciA9PSAnZnVuY3Rpb24nKSB7XHJcblx0XHRcdFx0XHRvcHRpb25zLmVycm9yKG1lc3NhZ2UpO1xyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0cmVqZWN0KG1lc3NhZ2UpO1xyXG5cdFx0XHR9O1xyXG5cclxuXHRcdFx0aWYgKCEgb3B0aW9ucy5kYXRhKSB7XHJcblx0XHRcdFx0eGhyLnNlbmQobnVsbCk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHZhciBxdWVyeVN0cmluZyA9IE9iamVjdC5rZXlzKG9wdGlvbnMuZGF0YSkubWFwKGZ1bmN0aW9uKGtleSkge1xyXG5cdFx0ICAgICAgICAgICAgcmV0dXJuIGVuY29kZVVSSUNvbXBvbmVudChrZXkpICsgJz0nICtcclxuXHRcdCAgICAgICAgICAgICAgICBcdGVuY29kZVVSSUNvbXBvbmVudChvcHRpb25zLmRhdGFba2V5XSk7XHJcblx0XHQgICAgICAgIFx0fSkuam9pbignJicpO1xyXG5cclxuXHRcdFx0eGhyLnNlbmQocXVlcnlTdHJpbmcpO1xyXG5cdFx0fSk7XHJcblx0fVxyXG59XG5cbmxldCBkZWZhdWx0TWVzc2FnZSQyID0gJ1RoZSBldmVudCB5b3UgY2FsbGVkIGRvZXMgbm90IGV4aXN0cyBvciB5b3Ugc3VwcGxpZWQgd3JvbmcgYXJndW1lbnQnO1xyXG5cclxuY2xhc3MgQmFkRXZlbnRDYWxsRXhjZXB0aW9uIGV4dGVuZHMgRXhjZXB0aW9uSGFuZGxlclxyXG57XHJcblx0Y29uc3RydWN0b3IobWVzc2FnZSA9IG51bGwpIFxyXG5cdHtcclxuXHRcdG1lc3NhZ2UgPSBtZXNzYWdlIHx8IGRlZmF1bHRNZXNzYWdlJDI7XHJcblx0XHRzdXBlcihtZXNzYWdlKTtcclxuICAgIFx0c3VwZXIuc3RhY2tUcmFjZSh0aGlzLCBtZXNzYWdlKTtcclxuICAgIH1cclxufVxuXG4vKipcclxuICogQGZpbGUgXHJcbiAqIEV2ZW50TWFuYWdlciBjbGFzcy5cclxuICpcclxuICogSGFuZGxlcyBzdWJzY3JpcGlvbnMgYW5kIHB1Ymxpc2hpbmcgb2YgZXZlbnRzLlxyXG4gKi9cclxuXHJcbmNsYXNzIEV2ZW50TWFuYWdlclxyXG57XHJcblx0LyoqXHJcblx0ICogU3RvcmVzIHRoZSBldmVudHMgY2FsbGJhY2tzLlxyXG5cdCAqIFxyXG5cdCAqIEB2YXIgYXJyYXlcclxuXHQgKi9cclxuXHRjb25zdHJ1Y3RvcigpXHJcblx0e1xyXG5cdFx0dGhpcy5ldmVudHMgPSB7fTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFN1YnNjcmliaW5nIHRvIGFuIGV2ZW50LlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIHN0cmluZyB8IG5hbWVcclxuXHQgKiBAcGFyYW0gZnVuY3Rpb24gfCBjYWxsYmFja1xyXG5cdCAqIEByZXR1cm4gdm9pZFxyXG5cdCAqL1xyXG5cdHN1YnNjcmliZShuYW1lLCBjYWxsYmFjaykgXHJcblx0e1xyXG5cdFx0aWYgKHR5cGVvZiBjYWxsYmFjayAhPT0gJ2Z1bmN0aW9uJykge1xyXG5cdFx0XHR0aHJvdyBuZXcgSW52YWxpZEFyZ3VtZW50RXhjZXB0aW9uO1xyXG5cdFx0fVxyXG5cclxuXHRcdGlmICh0eXBlb2YgdGhpcy5ldmVudHNbbmFtZV0gPT0gJ3VuZGVmaW5lZCcpIHtcclxuXHRcdFx0dGhpcy5ldmVudHNbbmFtZV0gPSBbXTtcclxuXHRcdH1cclxuXHJcblx0XHR0aGlzLmV2ZW50c1tuYW1lXS5wdXNoKGNhbGxiYWNrKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFB1Ymxpc2ggYW4gZXZlbnQgdG8gYWxsIHN1YnNjcmliZXJzLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIHN0cmluZyB8IG5hbWVcclxuXHQgKiBAcGFyYW0gbGlzdCB8IGRhdGFcclxuXHQgKiBAcmV0dXJuIHZvaWRcclxuXHQgKi9cclxuXHRwdWJsaXNoKG5hbWUsIC4uLmRhdGEpIFxyXG5cdHtcclxuXHRcdGRhdGEgPSBkYXRhIHx8IG51bGw7XHJcblxyXG5cdFx0Ly8gSWYgdGhlcmUgYXJlIG5vIHN1YnNjcmliZXJzIHNpbXBseSBpZ25vcmUgdGhhdCBldmVudC5cclxuXHRcdGlmICh0eXBlb2YgdGhpcy5ldmVudHNbbmFtZV0gPT0gJ3VuZGVmaW5lZCcpIHtcclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0fVxyXG5cclxuXHRcdHRoaXMuZXZlbnRzW25hbWVdLmZvckVhY2goZnVuY3Rpb24oY2FsbGJhY2spIHtcclxuXHRcdFx0aWYodHlwZW9mIGNhbGxiYWNrICE9ICdmdW5jdGlvbicpIHtcclxuXHRcdFx0XHR0aHJvdyBuZXcgSW52YWxpZEFyZ3VtZW50RXhjZXB0aW9uKCdzdWJzY3JpYmUoKSBzaG91bGQgcmVjaWV2ZSBjYWxsYmFjayBhcyBzZWNvbmQgcGFyYW1ldGVyLCBidXQgJysgdHlwZW9mIGNhbGxiYWNrICsnIHdhcyBwYXNzZWQnKTtcclxuXHRcdFx0fVxyXG5cdFx0XHRcclxuXHRcdFx0cmV0dXJuIGNhbGxiYWNrKC4uLmRhdGEpO1xyXG5cdFx0fSk7XHJcblx0fVxyXG59XG5cbi8qKlxyXG4gKiBAZmlsZSBcclxuICogQ29va2llIGNsYXNzLlxyXG4gKlxyXG4gKiBBZGRzIHNvbWUgdXNlZnVsIGZ1bmN0aW9uYWxpdHkgZm9yXHJcbiAqIHNldHRpbmcgb3IgZ2V0dGluZyBjb29raWVzLlxyXG4gKi9cclxuXHRcclxuY2xhc3MgQ29va2llXHJcbntcclxuXHQvKipcclxuIFx0KiBTZXRzIGEgY29va2llLlxyXG4gXHQqIFxyXG4gXHQqIEBwYXJhbSBzdHJpbmcgfCBuYW1lXHJcbiBcdCogQHBhcmFtIEpTT04gfCB2YWx1ZVxyXG4gXHQqIEBwYXJhbSBpbnRlZ2VyIHwgZGF5c1xyXG4gXHQqIEByZXR1cm4gdm9pZFxyXG5cdCovXHJcblx0c3RhdGljIHNldChuYW1lLCB2YWx1ZSwgZGF5cykgXHJcblx0e1xyXG5cdFx0aWYgKHZhbHVlLmNvbnN0cnVjdG9yLm5hbWUgID09ICdPYmplY3QnIHx8IHZhbHVlLmNvbnN0cnVjdG9yLm5hbWUgPT0gJ0FycmF5Jykge1xyXG5cdFx0XHR2YWx1ZSA9IEpTT04uc3RyaW5naWZ5KHZhbHVlKTtcclxuXHRcdH1cclxuXHJcblx0XHRkYXlzID0gZGF5cyB8fCAxMDtcclxuXHJcblx0ICAgIGxldCBleHBpcmVzO1xyXG5cdCAgICBcclxuXHQgICAgaWYgKGRheXMpIHtcclxuXHQgICAgICAgIGxldCBkYXRlID0gbmV3IERhdGUoKTtcclxuXHQgICAgICAgIGRhdGUuc2V0VGltZShkYXRlLmdldFRpbWUoKSArIChkYXlzICogMjQgKiA2MCAqIDYwICogMTAwMCkpO1xyXG5cdCAgICAgICAgZXhwaXJlcyA9IFwiOyBleHBpcmVzPVwiICsgZGF0ZS50b0dNVFN0cmluZygpO1xyXG5cdCAgICB9IGVsc2Uge1xyXG5cdCAgICAgICAgZXhwaXJlcyA9IFwiXCI7XHJcblx0ICAgIH1cclxuXHJcblx0ICAgIGRvY3VtZW50LmNvb2tpZSA9IG5hbWUgKyBcIj1cIiArIHZhbHVlICsgZXhwaXJlcyArIFwiOyBwYXRoPS9cIjtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFJldHJpZXZlcyB0aGUgY29va2llIGJ5IG5hbWUuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gc3RyaW5nIHwgbmFtZVxyXG4gXHQgKiBAcmV0dXJuIEpTT05cclxuXHQgKi9cclxuXHRzdGF0aWMgZ2V0KG5hbWUpIFxyXG5cdHtcclxuXHQgICAgaWYgKGRvY3VtZW50LmNvb2tpZS5sZW5ndGggPiAwKSB7XHJcblx0ICAgICAgICBsZXQgY19zdGFydCA9IGRvY3VtZW50LmNvb2tpZS5pbmRleE9mKG5hbWUgKyBcIj1cIik7XHJcblx0ICAgICAgICBcclxuXHQgICAgICAgIGlmIChjX3N0YXJ0ICE9IC0xKSB7XHJcblx0ICAgICAgICAgICAgY19zdGFydCA9IGNfc3RhcnQgKyBuYW1lLmxlbmd0aCArIDE7XHJcblx0ICAgICAgICAgICAgbGV0IGNfZW5kID0gZG9jdW1lbnQuY29va2llLmluZGV4T2YoXCI7XCIsIGNfc3RhcnQpO1xyXG5cdCAgICAgICAgICAgIFxyXG5cdCAgICAgICAgICAgIGlmIChjX2VuZCA9PSAtMSkge1xyXG5cdCAgICAgICAgICAgICAgICBjX2VuZCA9IGRvY3VtZW50LmNvb2tpZS5sZW5ndGg7XHJcblx0ICAgICAgICAgICAgfVxyXG5cclxuXHQgICAgICAgICAgICByZXR1cm4gSlNPTi5wYXJzZSh1bmVzY2FwZShkb2N1bWVudC5jb29raWUuc3Vic3RyaW5nKGNfc3RhcnQsIGNfZW5kKSkpO1xyXG5cdCAgICAgICAgfVxyXG5cdCAgICB9XHJcblxyXG5cdCAgICByZXR1cm4ge307XHJcblx0fVxyXG59XG5cbmxldCBkZWZhdWx0TWVzc2FnZSQzID0gJ1RoZSBpdGVtIHlvdSBhcmUgdHJ5aW5nIHRvIGFkZCBtdXN0IGNvbnRhaW4gYSB1bmlxdWUgaWQnO1xyXG5cclxuY2xhc3MgSW52YWxpZENhcnRJdGVtRXhjZXB0aW9uIGV4dGVuZHMgRXhjZXB0aW9uSGFuZGxlclxyXG57XHJcblx0Y29uc3RydWN0b3IobWVzc2FnZSA9IG51bGwpIFxyXG5cdHtcclxuXHRcdG1lc3NhZ2UgPSBtZXNzYWdlIHx8IGRlZmF1bHRNZXNzYWdlJDM7XHJcblx0XHRzdXBlcihtZXNzYWdlKTtcclxuICAgIFx0c3VwZXIuc3RhY2tUcmFjZSh0aGlzLCBtZXNzYWdlKTtcclxuICAgIH1cclxufVxuXG4vLyBIZWxwZXJzXHJcbi8vIEV4Y2VwdGlvbnNcclxuLyoqXHJcbiAqIEBmaWxlIFxyXG4gKiBDYXJ0IGNsYXNzLlxyXG4gKlxyXG4gKiBIYW5kbGVzIGFkZGluZywgcmVtb3ZpbmcgZXRjLi4uIG9mIGl0ZW1zLlxyXG4gKi9cclxuXHJcbi8qKlxyXG4gKiBUaGUgZGVmYXVsdCBzZXR0aW5ncyBvZiB0aGUgY2FydC5cclxuICpcclxuICogQHZhciBvYmplY3RcclxuICovXHJcbmxldCBkZWZhdWx0U2V0dGluZ3MkMSA9IHtcclxuXHRlbGVtZW50OiAnLmNhcnQnLFxyXG5cdGNvb2tpZV9uYW1lOiAnY2FydCcsXHJcblx0cHJldmlld19jbGFzczogJycsXHJcblx0bG9hZGVyOiAnJyxcclxuXHRjbGFzczogJycsXHJcblx0d2lkdGg6ICc2MHB4JyxcclxuXHRoZWlnaHQ6ICc2MHB4JyxcclxuXHRwbGFjZW1lbnQ6ICdyaWdodC10b3AnLFxyXG5cdGZpeGVkOiB0cnVlLFxyXG5cdGhvdmVyX2NvbG9yOiAnb3JhbmdlJyxcclxuXHRub19jc3M6IGZhbHNlLFxyXG59O1xyXG5cclxuLyoqXHJcbiAqIFN0b3JlcyB0aGUgY29udGFpbmVyIG9iamVjdC5cclxuICpcclxuICogQHZhciBcXENvcmVcXENvbnRhaW5lclxyXG4gKi9cclxubGV0IENvbnRhaW5lcjtcclxuXHJcbi8qKlxyXG4gKiBTdG9yZXMgdGhlIGV2ZW50IG1hbmFnZXIgb2JqZWN0LlxyXG4gKlxyXG4gKiBAdmFyIFxcQ29yZVxcRXZlbnRNYW5hZ2VyXHJcbiAqL1xyXG5sZXQgRXZlbnRNYW5hZ2VyJDI7XHJcblxyXG4vKipcclxuICogU3RvcmVzIHRoZSByZXF1ZXN0IG9iamVjdC5cclxuICpcclxuICogQHZhciBcXEhlbHBlcnNcXFJlcXVlc3RcclxuICovXHJcbmxldCBIdHRwO1xyXG5cclxuLyoqXHJcbiAqIFN0b3JlcyB0aGUgY2FydCBsb2FkZXIuXHJcbiAqXHJcbiAqIEB2YXIgSFRNTERpdkVsZW1lbnRcclxuICovXHJcbmxldCBsb2FkaW5nT3ZlcmxheTtcclxuXHJcbi8qKlxyXG4gKiBTdG9yZXMgdGhlIGl0ZW1zIHdyYXBwZXIuXHJcbiAqXHJcbiAqIEB2YXIgSFRNTERpdkVsZW1lbnRcclxuICovXHJcbmxldCBpdGVtc0RpdjtcclxuXHJcbmNsYXNzIENhcnQgXHJcbntcclxuXHQvKipcclxuXHQgKiAtIEluaXRpYWxpemUgdGhlIElvQyBjb250YWluZXJcclxuXHQgKiAtIEluaXRpYWxpemUgdGhlIFJlcXVlc3RcclxuXHQgKiAtIEluaXRpYWxpemUgdGhlIEV2ZW50TWFuYWdlclxyXG5cdCAqIC0gQ3JlYXRlcyB0aGUgcHJldmlldyBhbmQgdGhlIGljb24gb2YgdGhlIGNhcnQuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gXFxDb3JlXFxDb250YWluZXIgfCBjb250YWluZXJcclxuXHQgKiBAcGFyYW0gXFxIZWxwZXJzXFxSZXF1ZXN0IHwgaHR0cFxyXG5cdCAqIEBwYXJhbSBcXENvcmVcXEV2ZW50TWFuYWdlciB8IGV2ZW50TWFuYWdlclxyXG5cdCAqIEByZXR1cm4gdm9pZFxyXG5cdCAqL1xyXG5cdGNvbnN0cnVjdG9yKGNvbnRhaW5lciwgaHR0cCwgZXZlbnRNYW5hZ2VyKSBcclxuXHR7XHJcblx0XHRDb250YWluZXIgPSBjb250YWluZXI7XHJcblx0XHRIdHRwID0gaHR0cDtcclxuXHRcdEV2ZW50TWFuYWdlciQyID0gZXZlbnRNYW5hZ2VyO1xyXG5cdFx0XHJcblx0XHR0aGlzLnByZXZpZXdFbGVtZW50ID0gdGhpcy5jcmVhdGVQcmV2aWV3RWxlbWVudCgpO1xyXG5cdFx0dGhpcy5pY29uID0gY3JlYXRlSWNvbi5jYWxsKHRoaXMpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogU2V0cyB0aGUgb2JqZWN0IGJ5IHRoZSB1c2VycyBzZXR0aW5nLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIG9iamVjdCB8IHNldHRpbmdzXHJcblx0ICogQHJldHVybiB2b2lkXHJcblx0ICovXHJcblx0c2V0dXAoc2V0dGluZ3MpXHJcblx0e1xyXG5cdFx0aWYgKHR5cGVvZiBzZXR0aW5ncyAhPSAnb2JqZWN0Jykge1xyXG5cdFx0XHR0aHJvdyBuZXcgSW52YWxpZEFyZ3VtZW50RXhjZXB0aW9uJDE7XHJcblx0XHR9XHJcblxyXG5cdFx0dGhpcy5zZXR0aW5ncyA9IENvbW1vbi5leHRlbmQoZGVmYXVsdFNldHRpbmdzJDEsIHNldHRpbmdzKTtcclxuXHJcblx0XHR0aGlzLnNldEVsZW1lbnQodGhpcy5zZXR0aW5ncy5lbGVtZW50KTtcclxuXHJcblx0XHRET00uYWRkQ2xhc3ModGhpcy5wcmV2aWV3RWxlbWVudCwgJ2Nsb3NlZCcpO1xyXG5cdFx0RE9NLmFkZENsYXNzKHRoaXMucHJldmlld0VsZW1lbnQsIHRoaXMuc2V0dGluZ3MucHJldmlld19jbGFzcyk7XHJcblx0XHRcclxuXHRcdHRoaXMuYWRkU3R5bGVUYWcoKTtcclxuXHRcdHRoaXMuYmluZEV2ZW50TGlzdGVuZXJzKCk7XHJcblx0XHRcclxuXHRcdGlmICh0aGlzLmlzRW1wdHkoQ29va2llLmdldCh0aGlzLnNldHRpbmdzLmNvb2tpZV9uYW1lKSkpIHtcclxuXHRcdFx0dGhpcy5zZXR1cENhcnQoKTtcclxuXHRcdFx0XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBDaGVja3MgaWYgdGhlIGNhcnQgaXMgZW1wdHlcclxuXHQgKlxyXG5cdCAqIEBwYXJhbSBvYmplY3QgfCBjYXJ0XHJcblx0ICogQHJldHVybiBib29sXHJcblx0ICovXHJcblx0aXNFbXB0eShjYXJ0KVxyXG5cdHtcclxuXHRcdHJldHVybiBDb21tb24uZW1wdHlPYmplY3QoY2FydCk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBJbml0aWFsaXplL1NldHMgdGhlIGNhcnQgYXMgYSBjb29raWUuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gb2JqZWN0IHwgY2FydFxyXG5cdCAqIEByZXR1cm4gdm9pZFxyXG5cdCAqL1xyXG5cdHNldHVwQ2FydCgpXHJcblx0e1xyXG5cdFx0dGhpcy5jYXJ0ID0ge307XHJcblx0XHR0aGlzLmNhcnQuaWQgPSBTdHIucmFuZG9tKDEwKTtcclxuXHRcdHRoaXMuY2FydC5pdGVtcyA9IFtdO1xyXG5cdFx0dGhpcy5jYXJ0LmZhdm9yaXRlcyA9IFtdO1xyXG5cdFx0Q29va2llLnNldCh0aGlzLnNldHRpbmdzLmNvb2tpZV9uYW1lLCB0aGlzLmNhcnQsIDIpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQWRkcyBhbiBpdGVtIHRvIHRoZSBjYXJ0LlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIG9iamVjdCB8IGl0ZW1cclxuXHQgKiBAcmV0dXJuIHZvaWRcclxuXHQgKi9cclxuXHRhZGRJdGVtKGl0ZW0pXHJcblx0e1xyXG5cdFx0aWYgKHR5cGVvZiBpdGVtICE9ICdvYmplY3QnKSB7XHJcblx0XHRcdHRocm93IG5ldyBJbnZhbGlkQXJndW1lbnRFeGNlcHRpb24kMSgnYWRkSXRlbSgpIGV4cGVjdCB0aGUgZmlyc3QgcGFyYW1ldGVyIHRvIGJlIGFuIG9iamVjdCwgYnV0ICcgKyB0eXBlb2YgaXRlbSArICcgd2FzIHBhc3NlZCBpbnN0ZWFkJyk7XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKCEgaXRlbS5oYXNPd25Qcm9wZXJ0eSgnaWQnKSkge1xyXG5cdFx0XHR0aHJvdyBuZXcgSW52YWxpZENhcnRJdGVtRXhjZXB0aW9uO1xyXG5cdFx0fVxyXG5cclxuXHRcdHRoaXMuY2FydCA9IENvb2tpZS5nZXQodGhpcy5zZXR0aW5ncy5jb29raWVfbmFtZSk7XHJcblxyXG5cdFx0aWYgKCFpdGVtLmhhc093blByb3BlcnR5KCdxdWFudGl0eScpKSB7XHJcblx0XHRcdGl0ZW0ucXVhbnRpdHkgPSAxO1xyXG5cdFx0fVxyXG5cclxuXHRcdGxldCBpO1xyXG5cdFx0bGV0IGluY3JlbWVudGVkID0gZmFsc2U7XHJcblxyXG5cdFx0Zm9yIChpID0gMDsgaSA8IHRoaXMuY2FydC5pdGVtcy5sZW5ndGg7IGkrKykge1xyXG5cdFx0XHRpZiAodGhpcy5jYXJ0Lml0ZW1zW2ldLmlkID09IGl0ZW0uaWQpIHtcclxuXHRcdFx0XHR0aGlzLmNhcnQuaXRlbXNbaV0ucXVhbnRpdHkrKztcclxuXHRcdFx0XHRpbmNyZW1lbnRlZCA9IHRydWU7XHJcblx0XHRcdFx0YnJlYWs7XHRcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdGlmICghIGluY3JlbWVudGVkKSB7XHJcblx0XHRcdHRoaXMuY2FydC5pdGVtcy5wdXNoKGl0ZW0pO1xyXG5cdFx0fVxyXG5cclxuXHRcdENvb2tpZS5zZXQodGhpcy5zZXR0aW5ncy5jb29raWVfbmFtZSwgdGhpcy5jYXJ0LCAyKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEFkZHMgYW4gaXRlbSB0byB0aGUgZmF2b3JpdGVzIGxpc3QuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gb2JqZWN0IHwgaXRlbVxyXG5cdCAqIEByZXR1cm4gdm9pZFxyXG5cdCAqL1xyXG5cdGZhdm9yaXRlSXRlbShpdGVtKVxyXG5cdHtcclxuXHRcdGlmICh0eXBlb2YgaXRlbSAhPSAnb2JqZWN0Jykge1xyXG5cdFx0XHR0aHJvdyBuZXcgSW52YWxpZEFyZ3VtZW50RXhjZXB0aW9uJDEoJ2Zhdm9yaXRlSXRlbSgpIGV4cGVjdCB0aGUgZmlyc3QgcGFyYW1ldGVyIHRvIGJlIGFuIG9iamVjdCwgYnV0ICcgKyB0eXBlb2YgaXRlbSArICcgd2FzIHBhc3NlZCBpbnN0ZWFkJyk7XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKCEgaXRlbS5oYXNPd25Qcm9wZXJ0eSgnaWQnKSkge1xyXG5cdFx0XHR0aHJvdyBuZXcgSW52YWxpZENhcnRJdGVtRXhjZXB0aW9uO1xyXG5cdFx0fVxyXG5cclxuXHRcdHRoaXMuY2FydCA9IENvb2tpZS5nZXQodGhpcy5zZXR0aW5ncy5jb29raWVfbmFtZSk7XHJcblxyXG5cdFx0bGV0IGk7XHJcblx0XHRsZXQgYWxyZWFkeUZhdm9yaXRlZCA9IGZhbHNlO1xyXG5cclxuXHRcdGZvciAoaSA9IDA7IGkgPCB0aGlzLmNhcnQuZmF2b3JpdGVzLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdGlmICh0aGlzLmNhcnQuZmF2b3JpdGVzW2ldLmlkID09IGl0ZW0uaWQpIHtcclxuXHRcdFx0XHRhbHJlYWR5RmF2b3JpdGVkID0gdHJ1ZTtcclxuXHRcdFx0XHRicmVhaztcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdGlmICghIGFscmVhZHlGYXZvcml0ZWQpIHtcclxuXHRcdFx0dGhpcy5jYXJ0LmZhdm9yaXRlcy5wdXNoKGl0ZW0pO1xyXG5cdFx0fVxyXG5cclxuXHRcdENvb2tpZS5zZXQodGhpcy5zZXR0aW5ncy5jb29raWVfbmFtZSwgdGhpcy5jYXJ0LCAyKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFJlbW92ZXMgYW4gaXRlbSBmcm9tIHRoZSBjYXJ0LlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIG9iamVjdCB8IGl0ZW1cclxuXHQgKiBAcmV0dXJuIHZvaWRcclxuXHQgKi9cclxuXHRyZW1vdmVJdGVtKGl0ZW0pXHJcblx0e1xyXG5cdFx0aWYgKHR5cGVvZiBpdGVtICE9ICdvYmplY3QnKSB7XHJcblx0XHRcdHRocm93IG5ldyBJbnZhbGlkQXJndW1lbnRFeGNlcHRpb24kMSgncmVtb3ZlSXRlbSgpIGV4cGVjdCB0aGUgZmlyc3QgcGFyYW1ldGVyIHRvIGJlIGFuIG9iamVjdCwgYnV0ICcgKyB0eXBlb2YgaXRlbSArICcgd2FzIHBhc3NlZCBpbnN0ZWFkJyk7XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKCEgaXRlbS5oYXNPd25Qcm9wZXJ0eSgnaWQnKSkge1xyXG5cdFx0XHR0aHJvdyBuZXcgSW52YWxpZENhcnRJdGVtRXhjZXB0aW9uO1xyXG5cdFx0fVxyXG5cclxuIFx0XHR0aGlzLmNhcnQgPSBDb29raWUuZ2V0KHRoaXMuc2V0dGluZ3MuY29va2llX25hbWUpO1xyXG5cclxuIFx0XHRsZXQgaTtcclxuXHJcbiBcdFx0Zm9yIChpID0gMDsgaSA8IHRoaXMuY2FydC5pdGVtcy5sZW5ndGg7IGkrKykge1xyXG4gXHRcdFx0aWYgKHRoaXMuY2FydC5pdGVtc1tpXS5pZCA9PSBpdGVtLmlkKSB7XHJcbiBcdFx0XHRcdHRoaXMuY2FydC5pdGVtcy5zcGxpY2UoaSwgMSk7XHJcbiBcdFx0XHRcdGJyZWFrO1xyXG4gXHRcdFx0fVxyXG4gXHRcdH1cclxuXHJcbiBcdFx0Q29va2llLnNldCh0aGlzLnNldHRpbmdzLmNvb2tpZV9uYW1lLCB0aGlzLmNhcnQsIDIpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQWRkcyB0aGUgaXRlbSB0byBwcmV2aWV3LlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIGFycmF5IHwgaXRlbXNcclxuXHQgKiBAcmV0dXJuIHZvaWRcclxuXHQgKi9cclxuXHRhZGRUb1ByZXZpZXcoaXRlbXMpXHJcblx0e1xyXG5cdFx0aXRlbXNEaXYuaW5uZXJIVE1MID0gJyc7XHJcblxyXG5cdFx0bGV0IHRhYmxlID0gRE9NLmNyZWF0ZUVsZW1lbnQoJ3RhYmxlJyk7XHJcblxyXG5cdFx0RE9NLmFkZENsYXNzKHRhYmxlLCAncHJldmlldy10YWJsZScpO1xyXG5cclxuXHRcdGZvciAobGV0IGkgPSAwOyBpIDwgaXRlbXMubGVuZ3RoOyBpKyspIHtcclxuXHJcblx0XHRcdGxldCBhdHRyaWJ1dGVzID0gaXRlbXNbaV07XHJcblxyXG5cdFx0XHRsZXQgdHIgPSBET00uY3JlYXRlRWxlbWVudCgndHInLCB7XHJcblx0XHRcdFx0Y2xhc3M6ICdpdGVtJ1xyXG5cdFx0XHR9KTtcclxuXHJcblx0XHRcdC8vIFF1YW50aXR5IGFsd2F5cyBhdCB0aGUgc3RhcnQgb2YgYW4gaXRlbS5cclxuXHRcdFx0bGV0IHRkID0gRE9NLmNyZWF0ZUVsZW1lbnQoJ3RkJyk7XHJcblxyXG5cdFx0XHR0ZC5pbm5lckhUTUwgPSBhdHRyaWJ1dGVzLnF1YW50aXR5ICsneCc7XHJcblx0XHRcdHRyLmFwcGVuZENoaWxkKHRkKTtcclxuXHRcdFx0XHJcblx0XHRcdGZvcihsZXQgYXR0cmlidXRlIGluIGF0dHJpYnV0ZXMpIHtcclxuXHRcdFx0XHRzd2l0Y2goYXR0cmlidXRlKVxyXG5cdFx0XHRcdHtcclxuXHRcdFx0XHRcdGNhc2UgJ2ltYWdlJzpcclxuXHRcdFx0XHRcdFx0dGQgPSBET00uY3JlYXRlRWxlbWVudCgndGQnKTtcclxuXHRcdFx0XHRcdFx0bGV0IGltYWdlID0gRE9NLmNyZWF0ZUVsZW1lbnQoJ2ltZycsIHtcclxuXHRcdFx0XHRcdFx0XHRzcmM6IGF0dHJpYnV0ZXNbYXR0cmlidXRlXSxcclxuXHRcdFx0XHRcdFx0XHR3aWR0aDogJzUwcHgnLFxyXG5cdFx0XHRcdFx0XHRcdGhlaWdodDogJzUwcHgnXHJcblx0XHRcdFx0XHRcdH0pO1xyXG5cclxuXHRcdFx0XHRcdFx0dGQuYXBwZW5kQ2hpbGQoaW1hZ2UpO1xyXG5cdFx0XHRcdFx0XHRicmVhaztcclxuXHRcdFx0XHRcdGNhc2UgJ3ByaWNlJzpcclxuXHRcdFx0XHRcdFx0dGQgPSBET00uY3JlYXRlRWxlbWVudCgndGQnKTtcclxuXHRcdFx0XHRcdFx0bGV0IHNwYW4gPSBET00uY3JlYXRlRWxlbWVudCgnc3BhbicsIHtcclxuXHRcdFx0XHRcdFx0XHRodG1sOiAnJm5ic3AnICsgYXR0cmlidXRlc1thdHRyaWJ1dGVdLmN1cnJlbmN5XHJcblx0XHRcdFx0XHRcdH0pO1xyXG5cdFx0XHRcdFx0XHR0ZC5pbm5lckhUTUwgPSBhdHRyaWJ1dGVzW2F0dHJpYnV0ZV0uYW1vdW50O1xyXG5cdFx0XHRcdFx0XHR0ZC5hcHBlbmRDaGlsZChzcGFuKTtcclxuXHRcdFx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdFx0XHRjYXNlICduYW1lJzpcclxuXHRcdFx0XHRcdFx0dGQgPSBET00uY3JlYXRlRWxlbWVudCgndGQnKTtcclxuXHRcdFx0XHRcdFx0dGQuaW5uZXJIVE1MID0gYXR0cmlidXRlc1thdHRyaWJ1dGVdO1xyXG5cdFx0XHRcdFx0XHRicmVhaztcclxuXHRcdFx0XHR9XHJcblx0XHRcdFxyXG5cdFx0XHRcdHRyLmFwcGVuZENoaWxkKHRkKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0dGFibGUuYXBwZW5kQ2hpbGQodHIpO1xyXG5cdFx0fVxyXG5cclxuXHRcdC8vIGNyZWF0ZSBjaGVja291dCBidXR0b24gYXQgdGhlIGJ1dHRvbVxyXG5cdFx0bGV0IHRyID0gRE9NLmNyZWF0ZUVsZW1lbnQoJ3RyJyk7XHJcblx0XHRsZXQgdGQgPSBET00uY3JlYXRlRWxlbWVudCgndGQnLCB7XHJcblx0XHRcdGNvbHNwYW46ICc0JyxcclxuXHRcdH0pO1xyXG5cclxuXHRcdGxldCBjaGVja291dCA9IERPTS5jcmVhdGVFbGVtZW50KCdhJywge1xyXG5cdFx0XHRjbGFzczogJ2J0biBidG4tcHJpbWFyeScsXHJcblx0XHRcdHRleHQ6ICdDaGVja291dCdcclxuXHRcdH0pO1xyXG5cclxuXHRcdGNoZWNrb3V0Lm9uY2xpY2sgPSBmdW5jdGlvbihlKSB7XHJcblx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcclxuXHRcdFx0RXZlbnRNYW5hZ2VyJDIucHVibGlzaCgnY2FydC5jaGVja291dCcpO1xyXG5cdFx0fS5iaW5kKHRoaXMpO1xyXG5cclxuXHRcdHRkLmFwcGVuZENoaWxkKCBjaGVja291dCk7XHJcblx0XHR0ci5hcHBlbmRDaGlsZCh0ZCk7XHJcblxyXG5cdFx0dGFibGUuYXBwZW5kQ2hpbGQodHIpO1xyXG5cclxuXHRcdGl0ZW1zRGl2LmFwcGVuZENoaWxkKHRhYmxlKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEJpbmRzIGV2ZXJ0aGluZyB0byB0aGUgZWxlbWVudC5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSBzdHJpbmcgfCBzZWxlY3RvclxyXG5cdCAqIEByZXR1cm4gdm9pZFxyXG5cdCAqL1xyXG5cdHNldEVsZW1lbnQoc2VsZWN0b3IpXHJcblx0e1xyXG5cdFx0dGhpcy5lbGVtZW50ID0gRE9NLmZpbmQoc2VsZWN0b3IpO1xyXG5cclxuXHRcdGlmICh0aGlzLmVsZW1lbnQpIHtcclxuXHRcdFx0RE9NLmFkZENsYXNzKHRoaXMuZWxlbWVudCwgdGhpcy5zZXR0aW5ncy5jbGFzcyk7XHJcblx0XHRcdERPTS5hZGRDbGFzcyh0aGlzLmVsZW1lbnQsIHRoaXMuc2V0dGluZ3MucGxhY2VtZW50KTtcclxuXHRcdFx0dGhpcy5lbGVtZW50LmFwcGVuZENoaWxkKHRoaXMuaWNvbik7XHJcblx0XHRcdHRoaXMuZWxlbWVudC5hcHBlbmRDaGlsZCh0aGlzLnByZXZpZXdFbGVtZW50KTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIENyZWF0ZXMgdGhlIGNhcnQgZGV0YWlscyBwcmV2aWV3IGVsZW1lbnQuXHJcblx0ICpcclxuXHQgKiBAcmV0dXJuIEhUTUxEaXZFbGVtZW50XHJcblx0ICovXHJcblx0Y3JlYXRlUHJldmlld0VsZW1lbnQoKVxyXG5cdHtcclxuXHRcdGxldCBwcmV2aWV3RWxlbWVudCA9IERPTS5jcmVhdGVFbGVtZW50KCdkaXYnLCB7XHJcblx0XHRcdGlkOiAncHJldmlldydcclxuXHRcdH0pO1xyXG5cclxuXHRcdGl0ZW1zRGl2ID0gRE9NLmNyZWF0ZUVsZW1lbnQoJ3VsJywge1xyXG5cdFx0XHRcdGNsYXNzOiAnaXRlbXMnXHJcblx0XHRcdH0pO1xyXG5cclxuXHRcdHByZXZpZXdFbGVtZW50LmFwcGVuZENoaWxkKGl0ZW1zRGl2KTtcclxuXHJcblx0XHRyZXR1cm4gcHJldmlld0VsZW1lbnQ7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBBZGQgdGhlIGVDb21tZXJjZSBzdHlsZSB0YWdzIHRvIHRoZSBET00uXHJcblx0ICpcclxuXHQgKiBAcmV0dXJuIHZvaWRcclxuXHQgKi9cclxuXHRhZGRTdHlsZVRhZygpIFxyXG5cdHtcclxuXHRcdGlmIChET00uZmluZCgnI1R1cmJvLWVDb21tZXJjZS1DYXJ0JykpIHtcclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0fVxyXG5cclxuXHRcdGlmICh0aGlzLnNldHRpbmdzLm5vX2Nzcykge1xyXG5cdFx0XHRyZXR1cm47XHJcblx0XHR9XHJcblxyXG5cdFx0bGV0IHBvc2l0aW9uID0gKHRoaXMuc2V0dGluZ3MuZml4ZWQpID8gJ2ZpeGVkJyA6ICdhYnNvbHV0ZSc7XHJcblxyXG5cdFx0bGV0IGNzcyA9IGBcclxuXHRcdFx0JHt0aGlzLnNldHRpbmdzLmVsZW1lbnR9IHtcclxuXHRcdFx0XHRwb3NpdGlvbjogJHtwb3NpdGlvbn07XHJcblx0XHRcdFx0Y3Vyc29yOiBwb2ludGVyO1xyXG5cdFx0XHRcdGNvbG9yOiAjZmZmZmZmO1xyXG5cdFx0XHRcdHotaW5kZXg6IDk5ODtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0JHt0aGlzLnNldHRpbmdzLmVsZW1lbnR9IHN2ZyB7XHJcblx0XHRcdFx0d2lkdGg6ICR7dGhpcy5zZXR0aW5ncy53aWR0aH07XHJcblx0XHRcdFx0aGVpZ2h0OiAke3RoaXMuc2V0dGluZ3MuaGVpZ2h0fTtcclxuXHRcdFx0XHR0cmFuc2l0aW9uOiBmaWxsIDAuM3M7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdCR7dGhpcy5zZXR0aW5ncy5lbGVtZW50fSBzdmc6aG92ZXIge1xyXG5cdFx0XHRcdGZpbGw6ICR7dGhpcy5zZXR0aW5ncy5ob3Zlcl9jb2xvcn07XHJcblx0XHRcdFx0dHJhbnNpdGlvbjogZmlsbCAwLjNzO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHQke3RoaXMuc2V0dGluZ3MuZWxlbWVudH0udG9wLXJpZ2h0LFxyXG5cdFx0XHQke3RoaXMuc2V0dGluZ3MuZWxlbWVudH0ucmlnaHQtdG9wIHtcclxuXHRcdFx0XHRyaWdodDogMTBweDtcclxuXHRcdFx0XHR0b3A6IDEwcHg7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdCR7dGhpcy5zZXR0aW5ncy5lbGVtZW50fS5sZWZ0LXRvcCxcclxuXHRcdFx0JHt0aGlzLnNldHRpbmdzLmVsZW1lbnR9LnRvcC1sZWZ0IHtcclxuXHRcdFx0XHRsZWZ0OiAxMHB4O1xyXG5cdFx0XHRcdHRvcDogMTBweDtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0JHt0aGlzLnNldHRpbmdzLmVsZW1lbnR9ID4gI3ByZXZpZXcge1xyXG5cdFx0XHRcdHBvc2l0aW9uOiAke3Bvc2l0aW9ufTtcclxuXHRcdFx0XHR6LWluZGV4OiA5OTk5O1xyXG5cdFx0XHRcdHRvcDogY2FsYygxMHB4ICsgJHt0aGlzLnNldHRpbmdzLmhlaWdodH0pO1xyXG5cdFx0XHRcdHRyYW5zZm9ybTogdHJhbnNsYXRlWCg2MHB4KTtcclxuXHRcdFx0XHRoZWlnaHQ6IDQwMHB4O1xyXG5cdFx0XHRcdHdpZHRoOiAzMDBweDtcclxuXHRcdFx0XHRib3JkZXI6IDFweCBzb2xpZCAjZTRlNGU0O1xyXG5cdFx0XHRcdGJhY2tncm91bmQ6ICNmZmZmZmY7XHJcblx0XHRcdFx0dHJhbnNpdGlvbjogdHJhbnNmb3JtIDFzLCB2aXNpYmlsaXR5IDFzO1xyXG5cdFx0XHRcdGN1cnNvcjogZGVmYXVsdDtcclxuXHRcdFx0XHRvdmVyZmxvdy1ZOiBzY3JvbGw7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdCR7dGhpcy5zZXR0aW5ncy5lbGVtZW50fSA+ICNwcmV2aWV3Lm9wZW5lZCB7XHJcblx0XHRcdFx0dmlzaWJpbGl0eTogdmlzaWJsZTtcclxuXHRcdFx0XHR0cmFuc2Zvcm06IHRyYW5zbGF0ZVgoLTI0MHB4KTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0JHt0aGlzLnNldHRpbmdzLmVsZW1lbnR9ID4gI3ByZXZpZXcuY2xvc2VkIHtcclxuXHRcdFx0XHR2aXNpYmlsaXR5OiBoaWRkZW47XHJcblx0XHRcdFx0dHJhbnNmb3JtOiB0cmFuc2xhdGVYKDYwcHgpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHQke3RoaXMuc2V0dGluZ3MuZWxlbWVudH0gI3ByZXZpZXcgPiB1bC5pdGVtcyB7XHJcblx0XHRcdFx0cGFkZGluZzogMDtcclxuXHRcdFx0XHRjb2xvcjogIzAwMDAwMDtcclxuXHRcdFx0XHRsaXN0LXN0eWxlLXR5cGU6IG5vbmU7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdCR7dGhpcy5zZXR0aW5ncy5lbGVtZW50fSAjcHJldmlldyA+IHVsLml0ZW1zID4gLnByZXZpZXctdGFibGUge1xyXG5cdFx0XHRcdHdpZHRoOiAxMDAlO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHQke3RoaXMuc2V0dGluZ3MuZWxlbWVudH0gI3ByZXZpZXcgPiB1bC5pdGVtcyA+IC5wcmV2aWV3LXRhYmxlIHRkIHtcclxuXHRcdFx0XHRwYWRkaW5nOiA0cHg7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdCR7dGhpcy5zZXR0aW5ncy5lbGVtZW50fSAuaXRlbXMubG9hZGluZyB7XHJcblx0XHRcdFx0ZGlzcGxheTogbm9uZTtcclxuXHRcdFx0XHRvdmVyZmxvdy1ZOiBub25lO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHQke3RoaXMuc2V0dGluZ3MuZWxlbWVudH0gLmNhcnQtbG9hZGVyLW92ZXJsYXkge1xyXG5cdFx0XHRcdHBvc2l0aW9uOiBmaXhlZDtcclxuXHRcdFx0XHR0b3A6IDA7IFxyXG5cdFx0XHQgICAgbGVmdDogMDtcclxuXHRcdFx0ICAgIHJpZ2h0OiAwO1xyXG5cdFx0XHQgICAgYm90dG9tOiAwO1xyXG5cdFx0XHRcdGJhY2tncm91bmQ6ICNmZmZmZmY7XHJcblx0XHRcdFx0d2lkdGg6IDEwMCU7XHJcblx0XHRcdFx0aGVpZ2h0OiAxMDAlO1xyXG5cdFx0XHRcdG1pbi1oZWlnaHQ6IDEwMCU7XHJcblx0XHRcdFx0b3ZlcmZsb3c6IGF1dG87XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdCR7dGhpcy5zZXR0aW5ncy5lbGVtZW50fSAuY2FydC1sb2FkZXItb3ZlcmxheSAuY2FydC1sb2FkZXIge1xyXG5cdFx0XHRcdHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuXHRcdFx0XHR3aWR0aDogNTBweDtcclxuXHRcdFx0XHRoZWlnaHQ6IDUwcHg7XHJcblx0XHRcdFx0bWFyZ2luLWxlZnQ6IC0yNXB4O1xyXG5cdFx0XHRcdG1hcmdpbi10b3A6IC0yNXB4O1xyXG5cdFx0XHRcdGxlZnQ6IDUwJTtcclxuXHRcdFx0XHRyaWdodDogNTAlO1xyXG5cdFx0XHRcdHRvcDogNTAlO1xyXG5cdFx0XHRcdGJvdHRvbTogNTAlO1xyXG5cdFx0XHR9XHJcblx0XHRgO1xyXG5cdCAgICBcclxuXHQgICAgRE9NLmFkZFN0eWxlKCdUdXJiby1lQ29tbWVyY2UtQ2FydCcsIGNzcyk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBDcmVhdGVzIGFuIGxvYWRpbmcgb3ZlcmxheS5cclxuXHQgKlxyXG5cdCAqIEByZXR1cm4gSFRNTERpdkVsZW1lbnRcclxuXHQgKi9cclxuXHRsb2FkaW5nT3ZlcmxheSgpXHJcblx0e1xyXG5cdFx0aWYgKGxvYWRpbmdPdmVybGF5KSB7XHJcblx0XHRcdHJldHVybiBsb2FkaW5nT3ZlcmxheTtcclxuXHRcdH1cclxuXHJcblx0XHRsZXQgbG9hZGVyO1xyXG5cclxuXHRcdGlmICh0aGlzLnNldHRpbmdzLmxvYWRlcikge1xyXG5cdFx0XHRsb2FkZXIgPSBET00uY3JlYXRlRWxlbWVudCgnaW1nJywge1xyXG5cdFx0XHRcdHNyYzogdGhpcy5zZXR0aW5ncy5sb2FkZXIsXHJcblx0XHRcdFx0Y2xhc3M6ICdjYXJ0LWxvYWRlcidcclxuXHRcdFx0fSk7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRsb2FkZXIgPSBjcmVhdGVMb2FkZXIoKTtcclxuXHRcdH1cclxuXHJcblx0XHRsb2FkaW5nT3ZlcmxheSA9IERPTS5jcmVhdGVFbGVtZW50KCdkaXYnLCB7XHJcblx0XHRcdGNsYXNzOiAnY2FydC1sb2FkZXItb3ZlcmxheSdcclxuXHRcdH0pO1xyXG5cclxuXHRcdGxvYWRpbmdPdmVybGF5LmFwcGVuZENoaWxkKGxvYWRlcik7XHJcblxyXG5cdFx0cmV0dXJuIGxvYWRpbmdPdmVybGF5O1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogTG9hZGluZyB0aGUgY2FydCBwcmV2aWV3LlxyXG5cdCAqXHJcblx0ICogQHJldHVybiB2b2lkXHJcblx0ICovXHJcblx0cHJldmlld1N0YXJ0TG9hZGluZygpXHJcblx0e1xyXG5cdFx0RE9NLmFkZENsYXNzKGl0ZW1zRGl2LCAnbG9hZGluZycpO1xyXG5cdFx0dGhpcy5wcmV2aWV3RWxlbWVudC5hcHBlbmRDaGlsZCh0aGlzLmxvYWRpbmdPdmVybGF5KCkpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogTG9hZGluZyB0aGUgY2FydCBwcmV2aWV3LlxyXG5cdCAqXHJcblx0ICogQHJldHVybiB2b2lkXHJcblx0ICovXHJcblx0cHJldmlld1N0b3BMb2FkaW5nKClcclxuXHR7XHJcblx0XHRpZiAoRE9NLmZpbmQoJy5jYXJ0LWxvYWRlci1vdmVybGF5JywgdGhpcy5wcmV2aWV3RWxlbWVudCkpIHtcclxuXHRcdFx0dGhpcy5wcmV2aWV3RWxlbWVudC5yZW1vdmVDaGlsZCh0aGlzLmxvYWRpbmdPdmVybGF5KCkpO1xyXG5cdFx0XHRET00ucmVtb3ZlQ2xhc3MoaXRlbXNEaXYsICdsb2FkaW5nJyk7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBSZWxvYWRzIHRoZSBpdGVtcyBpbiB0aGUgY2FydCBwcmV2aWV3LlxyXG5cdCAqXHJcblx0ICogQHJldHVybiB2b2lkXHJcblx0ICovXHJcblx0cmVsb2FkQ2FydFByZXZpZXcoKVxyXG5cdHtcclxuXHRcdHRoaXMucHJldmlld1N0YXJ0TG9hZGluZygpO1xyXG5cdFx0bGV0IGl0ZW1zID0gdGhpcy5nZXRDYXJ0SXRlbXMoKTtcclxuXHRcdHRoaXMuYWRkVG9QcmV2aWV3KGl0ZW1zKTtcclxuXHRcdFxyXG5cdFx0bGV0IGluc3RhbmNlID0gdGhpcztcclxuXHJcblx0XHRzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRpbnN0YW5jZS5wcmV2aWV3U3RvcExvYWRpbmcuY2FsbChpbnN0YW5jZSk7XHJcblx0XHR9LCAxMDAwKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEJpbmRzIGV2ZW50IGxpc3RlbmVycyB0byB0aGUgY2FydCBpY29uLlxyXG5cdCAqXHJcblx0ICogQHJldHVybiB2b2lkXHJcblx0ICovXHJcblx0YmluZEV2ZW50TGlzdGVuZXJzKClcclxuXHR7XHJcblx0XHR0aGlzLmljb24ub25jbGljayA9IGZ1bmN0aW9uKGUpIHtcclxuXHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdFx0XHR0aGlzLnRvZ2dsZUNhcnRQcmV2aWV3KCk7XHJcblx0XHR9LmJpbmQodGhpcyk7XHJcblxyXG5cdFx0RXZlbnRNYW5hZ2VyJDIuc3Vic2NyaWJlKCdjYXJ0LnByb2R1Y3QuYWRkZWQnLCBmdW5jdGlvbihhdHRyaWJ1dGVzKSB7XHJcblx0XHRcdHRoaXMub3BlbkNhcnRQcmV2aWV3KCk7XHJcblx0XHRcdHRoaXMuYWRkSXRlbShhdHRyaWJ1dGVzKTtcclxuXHRcdFx0dGhpcy5yZWxvYWRDYXJ0UHJldmlldygpO1xyXG5cdFx0fS5iaW5kKHRoaXMpKTtcclxuXHJcblx0XHRFdmVudE1hbmFnZXIkMi5zdWJzY3JpYmUoJ2NhcnQucHJvZHVjdC5mYXZvcml0ZWQnLCBmdW5jdGlvbihhdHRyaWJ1dGVzKSB7XHJcblx0XHRcdHRoaXMuZmF2b3JpdGVJdGVtKGF0dHJpYnV0ZXMpO1xyXG5cdFx0fS5iaW5kKHRoaXMpKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIE9wZW5zIHRoZSBjYXJ0IHByZXZpZXcuXHJcblx0ICpcclxuXHQgKiBAcmV0dXJuIHZvaWQgXHJcblx0ICovXHJcblx0b3BlbkNhcnRQcmV2aWV3KClcclxuXHR7XHJcblx0XHRpZiAoRE9NLmhhc0NsYXNzKHRoaXMucHJldmlld0VsZW1lbnQsICdvcGVuZWQnKSkge1xyXG5cdFx0XHR0aGlzLnJlbG9hZENhcnRQcmV2aWV3KCk7XHJcblx0XHR9XHJcblxyXG5cdFx0RE9NLnN3aXRjaENsYXNzZXModGhpcy5wcmV2aWV3RWxlbWVudCwgJ2Nsb3NlZCcsICdvcGVuZWQnKTtcclxuXHRcdHRoaXMucmVsb2FkQ2FydFByZXZpZXcoKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFRvZ2dsZXMgdGhlIG9wZW5pbmcgY2xvc2luZyBvZiB0aGUgY2FydCBwcmV2aWV3LlxyXG5cdCAqXHJcblx0ICogQHJldHVybiB2b2lkIFxyXG5cdCAqL1xyXG5cdHRvZ2dsZUNhcnRQcmV2aWV3KClcclxuXHR7XHJcblx0XHRsZXQgb3BlbmluZyA9IERPTS50b2dnbGVDbGFzcyh0aGlzLnByZXZpZXdFbGVtZW50LCAnb3BlbmVkJywgJ2Nsb3NlZCcpO1xyXG5cdFx0XHRcclxuXHRcdGlmIChvcGVuaW5nKSB7XHJcblx0XHRcdHRoaXMucmVsb2FkQ2FydFByZXZpZXcoKTtcdFxyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogUmV0cmlldmUgdGhlIGNhcnRzIGl0ZW1zIGZyb20gdGhlIGNvb2tpZS5cclxuXHQgKlxyXG5cdCAqIEByZXR1cm4gb2JqZWN0XHJcblx0ICovXHJcblx0Z2V0Q2FydEl0ZW1zKClcclxuXHR7XHJcblx0XHRsZXQgY2FydCA9IENvb2tpZS5nZXQodGhpcy5zZXR0aW5ncy5jb29raWVfbmFtZSk7XHJcblxyXG5cdFx0cmV0dXJuIChjYXJ0KSA/IGNhcnQuaXRlbXMgOiBbXTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEhpZGVzIHRoZSBjb21wb25lbnQgZnJvbSB0aGUgRE9NLlxyXG5cdCAqXHJcblx0ICogQHJldHVybiB2b2lkIFxyXG5cdCAqL1xyXG5cdGhpZGUoKVxyXG5cdHtcclxuXHRcdHRoaXMuZWxlbWVudC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xyXG5cdH1cclxufVxyXG5cclxuLyoqXHJcbiAqIENsb3NlcyB0aGUgY2FydCBwcmV2aWV3IGVsZW1lbnQuXHJcbiAqXHJcbiAqIEBwYXJhbSBldmVudC5jbGlja1xyXG4gKi9cclxuZnVuY3Rpb24gY2xvc2UoZXZlbnQpIHtcclxuXHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdERPTS5zd2l0Y2hDbGFzc2VzKHRoaXMucHJldmlld0VsZW1lbnQsICdvcGVuZWQnLCAnY2xvc2VkJyk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBDcmVhdGVzIHRoZSBjYXJ0IHN2ZyBpY29uLlxyXG4gKlxyXG4gKiBAcmV0dXJuIFNWR1NWR0VsZW1lbnRcclxuICovXHJcbmZ1bmN0aW9uIGNyZWF0ZUljb24oKSB7XHJcblx0bGV0IHN2ZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnROUyhcImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIsIFwic3ZnXCIpO1xyXG5cdGxldCBnID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKFwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiwgXCJnXCIpO1xyXG5cdGxldCBwYXRoID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKFwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiwgXCJwYXRoXCIpO1xyXG5cclxuXHRzdmcuc2V0QXR0cmlidXRlKCd2ZXJzaW9uJywgJzEuMScpO1xyXG5cdHN2Zy5zZXRBdHRyaWJ1dGUoJ3htbG5zJywgJ2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJyk7XHJcblx0c3ZnLnNldEF0dHJpYnV0ZSgneG1sbnM6eGxpbmsnLCAnaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluaycpO1xyXG5cdHN2Zy5zZXRBdHRyaWJ1dGUoJ3gnLCAnMHB4Jyk7XHJcblx0c3ZnLnNldEF0dHJpYnV0ZSgneScsICcwcHgnKTtcclxuXHRzdmcuc2V0QXR0cmlidXRlKCd3aWR0aCcsICc0MHB4Jyk7XHJcblx0c3ZnLnNldEF0dHJpYnV0ZSgnaGVpZ2h0JywgJzQwcHgnKTtcclxuXHRzdmcuc2V0QXR0cmlidXRlKCd2aWV3Qm94JywgJzAgMCA0NDYuODQzIDQ0Ni44NDMnKTtcclxuXHRzdmcuc2V0QXR0cmlidXRlKCdzdHlsZScsICdlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDQ0Ni44NDMgNDQ2Ljg0MzsnKTtcclxuXHRzdmcuc2V0QXR0cmlidXRlKCd4bWw6c3BhY2UnLCAncHJlc2VydmUnKTtcclxuXHJcblx0cGF0aC5zZXRBdHRyaWJ1dGUoJ2QnLCAnTTQ0NC4wOSw5My4xMDNjLTIuNjk4LTMuNjk5LTcuMDA2LTUuODg4LTExLjU4NC01Ljg4OEgxMDkuOTJjLTAuNjI1LDAtMS4yNDksMC4wMzgtMS44NSwwLjExOWwtMTMuMjc2LTM4LjI3Yy0xLjM3Ni0zLjk1OC00LjQwNi03LjExMy04LjMtOC42NDZMMTkuNTg2LDE0LjEzNGMtNy4zNzQtMi44ODctMTUuNjk1LDAuNzM1LTE4LjU5MSw4LjFjLTIuODkxLDcuMzY5LDAuNzMsMTUuNjk1LDguMSwxOC41OTFsNjAuNzY4LDIzLjg3Mmw3NC4zODEsMjE0LjM5OWMtMy4yODMsMS4xNDQtNi4wNjUsMy42NjMtNy4zMzIsNy4xODdsLTIxLjUwNiw1OS43MzljLTEuMzE4LDMuNjYzLTAuNzc1LDcuNzMzLDEuNDY4LDEwLjkxNmMyLjI0LDMuMTgzLDUuODgzLDUuMDc4LDkuNzczLDUuMDc4aDExLjA0NGMtNi44NDQsNy42MTYtMTEuMDQ0LDE3LjY0Ni0xMS4wNDQsMjguNjc1YzAsMjMuNzE4LDE5LjI5OCw0My4wMTIsNDMuMDEyLDQzLjAxMnM0My4wMTItMTkuMjk0LDQzLjAxMi00My4wMTJjMC0xMS4wMjktNC4yLTIxLjA1OS0xMS4wNDQtMjguNjc1aDkzLjc3NmMtNi44NDcsNy42MTYtMTEuMDQ4LDE3LjY0Ni0xMS4wNDgsMjguNjc1YzAsMjMuNzE4LDE5LjI5NCw0My4wMTIsNDMuMDEzLDQzLjAxMmMyMy43MTgsMCw0My4wMTItMTkuMjk0LDQzLjAxMi00My4wMTJjMC0xMS4wMjktNC4yLTIxLjA1OS0xMS4wNDMtMjguNjc1aDEzLjQzM2M2LjU5OSwwLDExLjk0Ny01LjM0OSwxMS45NDctMTEuOTQ4YzAtNi41OTktNS4zNDktMTEuOTQ3LTExLjk0Ny0xMS45NDdIMTQzLjY0N2wxMy4zMTktMzYuOTk2YzEuNzIsMC43MjQsMy41NzgsMS4xNTIsNS41MjMsMS4xNTJoMjEwLjI3OGM2LjIzNCwwLDExLjc1MS00LjAyNywxMy42NS05Ljk1OWw1OS43MzktMTg2LjM4N0M0NDcuNTU3LDEwMS41NjcsNDQ2Ljc4OCw5Ni44MDIsNDQ0LjA5LDkzLjEwM3ogTTE2OS42NTksNDA5LjgwN2MtMTAuNTQzLDAtMTkuMTE2LTguNTczLTE5LjExNi0xOS4xMTZzOC41NzMtMTkuMTE3LDE5LjExNi0xOS4xMTdzMTkuMTE2LDguNTc0LDE5LjExNiwxOS4xMTdTMTgwLjIwMiw0MDkuODA3LDE2OS42NTksNDA5LjgwN3ogTTMyNy4zNjcsNDA5LjgwN2MtMTAuNTQzLDAtMTkuMTE3LTguNTczLTE5LjExNy0xOS4xMTZzOC41NzQtMTkuMTE3LDE5LjExNy0xOS4xMTdjMTAuNTQyLDAsMTkuMTE2LDguNTc0LDE5LjExNiwxOS4xMTdTMzM3LjkwOSw0MDkuODA3LDMyNy4zNjcsNDA5LjgwN3ogTTQwMi41MiwxNDguMTQ5aC03My4xNjFWMTE1Ljg5aDgzLjQ5OUw0MDIuNTIsMTQ4LjE0OXogTTM4MS40NTMsMjEzLjg2MWgtNTIuMDk0di0zNy4wMzhoNjMuOTY3TDM4MS40NTMsMjEzLjg2MXogTTIzNC41NzEsMjEzLjg2MXYtMzcuMDM4aDY2LjExM3YzNy4wMzhIMjM0LjU3MXogTTMwMC42ODQsMjQyLjUzOHYzMS4wNjRoLTY2LjExM3YtMzEuMDY0SDMwMC42ODR6IE0xMzkuMTE1LDE3Ni44MjNoNjYuNzg0djM3LjAzOGgtNTMuOTMzTDEzOS4xMTUsMTc2LjgyM3ogTTIzNC41NzEsMTQ4LjE0OVYxMTUuODloNjYuMTEzdjMyLjI1OUgyMzQuNTcxeiBNMjA1Ljg5OCwxMTUuODl2MzIuMjU5aC03Ni43MzRsLTExLjE5MS0zMi4yNTlIMjA1Ljg5OHogTTE2MS45MTYsMjQyLjUzOGg0My45ODJ2MzEuMDY0aC0zMy4yMDZMMTYxLjkxNiwyNDIuNTM4eiBNMzI5LjM1OSwyNzMuNjAzdi0zMS4wNjRoNDIuOTA5bC05Ljk1NSwzMS4wNjRIMzI5LjM1OXonKTtcclxuXHJcblx0Zy5hcHBlbmRDaGlsZChwYXRoKTtcclxuXHRzdmcuYXBwZW5kQ2hpbGQoZyk7XHJcblxyXG5cdGxldCAgZGl2ID0gRE9NLmNyZWF0ZUVsZW1lbnQoJ2RpdicsIHtcclxuXHRcdGlkOiAnY2FydEljb24nLFxyXG5cdH0pO1xyXG5cclxuXHRkaXYuYXBwZW5kQ2hpbGQoc3ZnKTtcclxuXHJcblx0cmV0dXJuIGRpdjtcclxufVxyXG5cclxuLyoqXHJcbiAqIENyZWF0ZXMgdGhlIGNhcnQgbG9hZGVyIGljb24uXHJcbiAqXHJcbiAqIEByZXR1cm4gU1ZHU1ZHRWxlbWVudFxyXG4gKi9cclxuZnVuY3Rpb24gY3JlYXRlTG9hZGVyKCkge1xyXG5cdGxldCBzdmcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50TlMoXCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiLCBcInN2Z1wiKTtcclxuXHRsZXQgY291bnQgPSAxMjtcclxuXHRsZXQgZ3JvdXBzID0gW107XHJcblx0bGV0IHJlY3RhbmdlbHMgPSBbXTtcclxuXHRsZXQgYW5pbWF0aW9ucyA9IFtdO1xyXG5cclxuXHRzdmcuc2V0QXR0cmlidXRlKCdjbGFzcycsICdsZHMtc3Bpbm5lcicpO1xyXG5cdHN2Zy5zZXRBdHRyaWJ1dGUoJ3dpZHRoJywgJzIwMHB4Jyk7XHJcblx0c3ZnLnNldEF0dHJpYnV0ZSgnaGVpZ2h0JywgJzIwMHB4Jyk7XHJcblx0c3ZnLnNldEF0dHJpYnV0ZSgneG1sbnMnLCAnaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnKTtcclxuXHRzdmcuc2V0QXR0cmlidXRlKCd4bWxuczp4bGluaycsICdodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rJyk7XHJcblx0c3ZnLnNldEF0dHJpYnV0ZSgndmlld0JveCcsICcwIDAgMTAwIDEwMCcpO1xyXG5cdHN2Zy5zZXRBdHRyaWJ1dGUoJ3ByZXNlcnZlQXNwZWN0UmF0aW8nLCAneE1pZFlNaWQnKTtcclxuXHRzdmcuc2V0QXR0cmlidXRlKCdzdHlsZScsICdiYWNrZ3JvdW5kOiBub25lOycpO1xyXG5cdFxyXG5cdHZhciByb3RhdGlvbiA9IDA7XHJcblxyXG5cdGZvciAodmFyIGkgPSAwOyBpIDwgY291bnQ7IGkrKykge1xyXG5cdFx0bGV0IGdyb3VwID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKFwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiwgXCJnXCIpO1xyXG5cdFx0Z3JvdXAuc2V0QXR0cmlidXRlKCd0cmFuc2Zvcm0nLCAncm90YXRlKCcgKyByb3RhdGlvbiArICcgNTAgNTApJyk7XHJcblx0XHRyb3RhdGlvbiArPSAzMDtcclxuXHRcdGdyb3Vwcy5wdXNoKGdyb3VwKTtcclxuXHR9XHJcblxyXG5cdGZvciAodmFyIGkgPSAwOyBpIDwgY291bnQ7IGkrKykge1xyXG5cdFx0bGV0IHJlY3RhbmdlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnROUyhcImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIsIFwicmVjdFwiKTtcclxuXHRcdHJlY3RhbmdlbC5zZXRBdHRyaWJ1dGUoJ3gnLCAnNDcnKTtcclxuXHRcdHJlY3RhbmdlbC5zZXRBdHRyaWJ1dGUoJ3knLCAnMjQnKTtcclxuXHRcdHJlY3RhbmdlbC5zZXRBdHRyaWJ1dGUoJ3J4JywgJzkuNCcpO1xyXG5cdFx0cmVjdGFuZ2VsLnNldEF0dHJpYnV0ZSgncnknLCAnNC44Jyk7XHJcblx0XHRyZWN0YW5nZWwuc2V0QXR0cmlidXRlKCd3aWR0aCcsICc2Jyk7XHJcblx0XHRyZWN0YW5nZWwuc2V0QXR0cmlidXRlKCdoZWlnaHQnLCAnMTInKTtcclxuXHRcdHJlY3RhbmdlbC5zZXRBdHRyaWJ1dGUoJ2ZpbGwnLCAnIzQ2NThhYycpO1xyXG5cdFx0cmVjdGFuZ2Vscy5wdXNoKHJlY3RhbmdlbCk7XHJcblx0fVxyXG5cclxuXHR2YXIgYmVnaW4gPSAwLjA5ICogMTE7XHJcblxyXG5cdGZvciAodmFyIGkgPSAwOyBpIDwgY291bnQ7IGkrKykge1xyXG5cdFx0bGV0IGFuaW1hdGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50TlMoXCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiLCBcImFuaW1hdGVcIik7XHJcblx0XHRhbmltYXRlLnNldEF0dHJpYnV0ZSgnYXR0cmlidXRlTmFtZScsICdvcGFjaXR5Jyk7XHJcblx0XHRhbmltYXRlLnNldEF0dHJpYnV0ZSgndmFsdWVzJywgJzE7MCcpO1xyXG5cdFx0YW5pbWF0ZS5zZXRBdHRyaWJ1dGUoJ3RpbWVzJywgJzA7MScpO1xyXG5cdFx0YW5pbWF0ZS5zZXRBdHRyaWJ1dGUoJ2R1cicsICcxcycpO1xyXG5cdFx0YW5pbWF0ZS5zZXRBdHRyaWJ1dGUoJ2JlZ2luJywgYmVnaW4udG9GaXhlZCg4KSArICdzJyk7XHJcblx0XHRhbmltYXRlLnNldEF0dHJpYnV0ZSgncmVwZWF0Q291bnQnLCAnaW5kZWZpbml0ZScpO1xyXG5cdFx0YW5pbWF0aW9ucy5wdXNoKGFuaW1hdGUpO1xyXG5cdFx0YmVnaW4gLT0gMC4wOTtcclxuXHR9XHJcblxyXG5cdGZvciAodmFyIGkgPSAwOyBpIDwgZ3JvdXBzLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRsZXQgZ3JvdXAgPSBncm91cHNbaV07XHRcdFxyXG5cdFx0bGV0IHJlY3RhbmdlbCA9IHJlY3RhbmdlbHNbaV07XHJcblx0XHRsZXQgYW5pbWF0ZSA9IGFuaW1hdGlvbnNbaV07XHJcblx0XHRyZWN0YW5nZWwuYXBwZW5kQ2hpbGQoYW5pbWF0ZSk7XHJcblx0XHRncm91cC5hcHBlbmRDaGlsZChyZWN0YW5nZWwpO1xyXG5cdFx0c3ZnLmFwcGVuZENoaWxkKGdyb3VwKTtcclxuXHR9XHJcblxyXG5cdERPTS5hZGRDbGFzcyhzdmcsICdjYXJ0LWxvYWRlcicpO1xyXG5cclxuXHRyZXR1cm4gc3ZnO1x0XHJcbn1cblxuLyoqXHJcbiAqIEBmaWxlIFxyXG4gKiBGaWx0ZXIgY2xhc3MuXHJcbiAqXHJcbiAqIFRoZSBGaWx0ZXIgT2JqZWN0LCBoYW5kbGVzIHRoZSBmaWx0ZXIgb2YgdGhlIHByb2R1Y3RzL3NlcnZpY2VzLlxyXG4gKi9cclxuXHJcbi8qKlxyXG4gKiBUaGUgZGVmYXVsdCBzZXR0aW5ncyBvZiB0aGUgZmlsdGVyLlxyXG4gKi9cclxubGV0IGRlZmF1bHRTZXR0aW5ncyQyID0ge1xyXG5cdGVsZW1lbnQ6ICcuZmlsdGVyJyxcclxuXHRjbGFzczogJycsXHJcblx0d2lkdGg6ICcnLFxyXG5cdGhlaWdodDogJycsXHJcblx0bm9fY3NzOiBmYWxzZSxcclxufTtcclxuXHJcbi8qKlxyXG4gKiBTdG9yZXMgdGhlIGNvbnRhaW5lciBvYmplY3QuXHJcbiAqXHJcbiAqIEB2YXIgXFxDb3JlXFxDb250YWluZXJcclxuICovXHJcbmxldCBDb250YWluZXIkMTtcclxuXHJcbmNsYXNzIEZpbHRlciBcclxue1xyXG5cdC8qKlxyXG5cdCAqIC0gSW5pdGlhbGl6ZSB0aGUgSW9DIGNvbnRhaW5lci5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSBcXENvcmVcXENvbnRhaW5lciB8IGNvbnRhaW5lclxyXG5cdCAqIEByZXR1cm4gdm9pZFxyXG5cdCAqL1xyXG5cdGNvbnN0cnVjdG9yKGNvbnRhaW5lcikgXHJcblx0e1xyXG5cdFx0Q29udGFpbmVyJDEgPSBjb250YWluZXI7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBTZXR1cCB0aGUgZmlsdGVyIGNsYXNzLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIG9iamVjdCB8IHNldHRpbmdzXHJcblx0ICogQHJldHVybiB2b2lkXHJcblx0ICovXHJcblx0c2V0dXAoc2V0dGluZ3MpXHJcblx0e1xyXG5cdFx0aWYodHlwZW9mIHNldHRpbmdzICE9ICdvYmplY3QnKSB7XHJcblx0XHRcdHRocm93IG5ldyBJbnZhbGlkQXJndW1lbnRFeGNlcHRpb24kMTtcclxuXHRcdH1cclxuXHJcblx0XHR0aGlzLnNldHRpbmdzID0gQ29tbW9uLmV4dGVuZChkZWZhdWx0U2V0dGluZ3MkMiwgc2V0dGluZ3MpO1xyXG5cclxuXHRcdGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCBmdW5jdGlvbigpIHtcclxuXHJcblx0XHRcdHRoaXMuc2V0RWxlbWVudCh0aGlzLnNldHRpbmdzLmVsZW1lbnQpO1xyXG5cclxuXHRcdFx0dGhpcy5hZGRTdHlsZVRhZygpO1x0XHJcblx0XHR9LmJpbmQodGhpcykpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogU2V0cyB0aGUgZWxlbWVudCB0byBiZSBib3VuZCB0by5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSBzdHJpbmcgfCBzZWxlY3RvclxyXG5cdCAqIEByZXR1cm4gdm9pZFxyXG5cdCAqL1xyXG5cdHNldEVsZW1lbnQoc2VsZWN0b3IpXHJcblx0e1xyXG5cdFx0dGhpcy5lbGVtZW50ID0gRE9NLmZpbmQoc2VsZWN0b3IpO1xyXG5cdFx0XHJcblx0XHRET00uYWRkQ2xhc3ModGhpcy5lbGVtZW50LCB0aGlzLnNldHRpbmdzLmNsYXNzKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEFkZCB0aGUgZUNvbW1lcmNlIHN0eWxlIHRhZ3MgdG8gdGhlIERPTS5cclxuXHQgKi9cclxuXHRhZGRTdHlsZVRhZygpIFxyXG5cdHtcclxuXHRcdGlmIChET00uZmluZCgnI1R1cmJvLWVDb21tZXJjZS1GaWx0ZXInKSkge1xyXG5cdFx0XHRyZXR1cm47XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKHRoaXMuc2V0dGluZ3Mubm9fY3NzKSB7XHJcblx0XHRcdHJldHVybjtcclxuXHRcdH1cclxuXHJcblx0XHRsZXQgd2lkdGggPSAodGhpcy5zZXR0aW5ncy53aWR0aCkgPyAnd2lkdGg6JyArIHRoaXMuc2V0dGluZ3Mud2lkdGggKyAnOycgOiAnJztcclxuXHRcdGxldCBtaW5XaWR0aCA9IHRoaXMuc2V0dGluZ3MubWluX3dpZHRoIHx8ICcyMDBweCc7XHJcblx0XHRsZXQgaGVpZ2h0ID0gdGhpcy5zZXR0aW5ncy5oZWlnaHQgfHwgJ2F1dG8nO1xyXG5cclxuXHRcdGxldCBjc3MgPSBgXHJcblx0XHRcdCR7dGhpcy5zZXR0aW5ncy5lbGVtZW50fSB7XHJcblx0XHRcdFx0cG9zaXRpb246IHJlbGF0aXZlO1xyXG5cdFx0XHRcdG1hcmdpbjogNXB4IDVweDtcclxuXHRcdFx0XHRib3JkZXI6IDFweCBzb2xpZCAjZTRlNGU0O1xyXG5cdFx0XHRcdCR7d2lkdGh9XHJcblx0XHRcdFx0bWluLXdpZHRoOiAke21pbldpZHRofTtcclxuXHRcdFx0XHRoZWlnaHQ6ICR7aGVpZ2h0fTtcclxuXHRcdFx0XHRtaW4taGVpZ2h0OiAyMDBweDtcclxuXHRcdFx0XHRjb2xvcjogI2ZmZmZmZjtcclxuXHRcdFx0XHRvdmVyZmxvdzogaGlkZGVuO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0YDtcclxuXHQgICAgXHJcblx0ICAgIERPTS5hZGRTdHlsZSgnVHVyYm8tZUNvbW1lcmNlLUZpbHRlcicsIGNzcyk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBIaWRlcyB0aGUgY29tcG9uZW50IGZyb20gdGhlIERPTS5cclxuXHQgKlxyXG5cdCAqIEByZXR1cm4gdm9pZCBcclxuXHQgKi9cclxuXHRoaWRlKClcclxuXHR7XHJcblx0XHR0aGlzLmVsZW1lbnQuc3R5bGUuZGlzcGxheSA9ICdub25lJztcclxuXHR9XHJcbn1cblxuLy8gSGVscGVyc1xyXG4vLyBFeGNlcHRpb25zXHJcbi8qKlxyXG4gKiBAZmlsZSBcclxuICogQ2FydCBjbGFzcy5cclxuICpcclxuICogSGFuZGxlcyBhZGRpbmcsIHJlbW92aW5nIGV0Yy4uLiBvZiBpdGVtcy5cclxuICovXHJcblxyXG4vKipcclxuICogVGhlIGRlZmF1bHQgc2V0dGluZ3Mgb2YgdGhlIGNhcnQuXHJcbiAqXHJcbiAqIEB2YXIgb2JqZWN0XHJcbiAqL1xyXG5sZXQgZGVmYXVsdFNldHRpbmdzJDMgPSB7XHJcblx0ZWxlbWVudDogJy5jaGVja291dCcsXHJcblx0bm9fY3NzOiBmYWxzZSxcclxufTtcclxuXHJcbi8qKlxyXG4gKiBTdG9yZXMgdGhlIGNvbnRhaW5lciBvYmplY3QuXHJcbiAqXHJcbiAqIEB2YXIgXFxDb3JlXFxDb250YWluZXJcclxuICovXHJcbmxldCBDb250YWluZXIkMjtcclxuXHJcbi8qKlxyXG4gKiBTdG9yZXMgdGhlIGV2ZW50IG1hbmFnZXIgb2JqZWN0LlxyXG4gKlxyXG4gKiBAdmFyIFxcQ29yZVxcRXZlbnRNYW5hZ2VyXHJcbiAqL1xyXG5sZXQgRXZlbnRNYW5hZ2VyJDM7XHJcblxyXG4vKipcclxuICogU3RvcmVzIHRoZSByZXF1ZXN0IG9iamVjdC5cclxuICpcclxuICogQHZhciBcXEhlbHBlcnNcXFJlcXVlc3RcclxuICovXHJcbmxldCBIdHRwJDE7XHJcblxyXG5cclxuY2xhc3MgQ2hlY2tvdXQgXHJcbntcclxuXHQvKipcclxuXHQgKiAtIEluaXRpYWxpemUgdGhlIElvQyBjb250YWluZXJcclxuXHQgKiAtIEluaXRpYWxpemUgdGhlIFJlcXVlc3RcclxuXHQgKiAtIEluaXRpYWxpemUgdGhlIEV2ZW50TWFuYWdlclxyXG5cdCAqIC0gTGlzdGVuIHRvIGNoZWNrb3V0IGV2ZW50LlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIFxcQ29yZVxcQ29udGFpbmVyIHwgY29udGFpbmVyXHJcblx0ICogQHBhcmFtIFxcSGVscGVyc1xcUmVxdWVzdCB8IGh0dHBcclxuXHQgKiBAcGFyYW0gXFxDb3JlXFxFdmVudE1hbmFnZXIgfCBldmVudE1hbmFnZXJcclxuXHQgKiBAcmV0dXJuIHZvaWRcclxuXHQgKi9cclxuXHRjb25zdHJ1Y3Rvcihjb250YWluZXIsIGh0dHAsIGV2ZW50TWFuYWdlcikgXHJcblx0e1xyXG5cdFx0Q29udGFpbmVyJDIgPSBjb250YWluZXI7XHJcblx0XHRIdHRwJDEgPSBodHRwO1xyXG5cdFx0RXZlbnRNYW5hZ2VyJDMgPSBldmVudE1hbmFnZXI7XHJcblx0XHRcclxuXHRcdEV2ZW50TWFuYWdlciQzLnN1YnNjcmliZSgnY2FydC5jaGVja291dCcsIGZ1bmN0aW9uKCkge1x0XHJcblx0XHRcdHRoaXMuaGlkZUFsbCgpO1xyXG5cdFx0XHR0aGlzLnNob3coKTtcclxuXHRcdH0uYmluZCh0aGlzKSk7XHRcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFNldHMgdGhlIG9iamVjdCBieSB0aGUgdXNlcnMgc2V0dGluZy5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSBvYmplY3QgfCBzZXR0aW5nc1xyXG5cdCAqIEByZXR1cm4gdm9pZFxyXG5cdCAqL1xyXG5cdHNldHVwKHNldHRpbmdzKVxyXG5cdHtcclxuXHRcdGlmICh0eXBlb2Ygc2V0dGluZ3MgIT0gJ29iamVjdCcpIHtcclxuXHRcdFx0dGhyb3cgbmV3IEludmFsaWRBcmd1bWVudEV4Y2VwdGlvbiQxO1xyXG5cdFx0fVxyXG5cclxuXHRcdHRoaXMuc2V0dGluZ3MgPSBDb21tb24uZXh0ZW5kKGRlZmF1bHRTZXR0aW5ncyQzLCBzZXR0aW5ncyk7XHJcblxyXG5cdFx0ZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsIGZ1bmN0aW9uKCkge1xyXG5cclxuXHRcdFx0dGhpcy5zZXRFbGVtZW50KHRoaXMuc2V0dGluZ3MuZWxlbWVudCk7XHJcblx0XHRcdHRoaXMuaGlkZSgpO1xyXG5cdFx0XHR0aGlzLmFkZFN0eWxlVGFnKCk7XHJcblx0XHR9LmJpbmQodGhpcykpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQmluZHMgZXZlcnRoaW5nIHRvIHRoZSBlbGVtZW50LlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIHN0cmluZyB8IHNlbGVjdG9yXHJcblx0ICogQHJldHVybiB2b2lkXHJcblx0ICovXHJcblx0c2V0RWxlbWVudChzZWxlY3RvcilcclxuXHR7XHJcblx0XHR0aGlzLmVsZW1lbnQgPSBET00uZmluZChzZWxlY3Rvcik7XHJcblxyXG5cdFx0aWYgKHRoaXMuZWxlbWVudCkge1xyXG5cdFx0XHRET00uYWRkQ2xhc3ModGhpcy5lbGVtZW50LCB0aGlzLnNldHRpbmdzLmNsYXNzKTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEFkZCB0aGUgZUNvbW1lcmNlIHN0eWxlIHRhZ3MgdG8gdGhlIERPTS5cclxuXHQgKlxyXG5cdCAqIEByZXR1cm4gdm9pZFxyXG5cdCAqL1xyXG5cdGFkZFN0eWxlVGFnKCkgXHJcblx0e1xyXG5cdFx0aWYgKERPTS5maW5kKCcjVHVyYm8tZUNvbW1lcmNlLUNoZWNrb3V0JykpIHtcclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0fVxyXG5cclxuXHRcdGlmICh0aGlzLnNldHRpbmdzLm5vX2Nzcykge1xyXG5cdFx0XHRyZXR1cm47XHJcblx0XHR9XHJcblxyXG5cdFx0bGV0IHBvc2l0aW9uID0gKHRoaXMuc2V0dGluZ3MuZml4ZWQpID8gJ2ZpeGVkJyA6ICdhYnNvbHV0ZSc7XHJcblxyXG5cdFx0bGV0IGNzcyA9IGBcclxuXHRcdFx0JHt0aGlzLnNldHRpbmdzLmVsZW1lbnR9IHtcclxuXHRcdFx0XHR3aWR0aDogMTAwJTtcclxuXHRcdFx0XHRtaW4taGVpZ2h0OiA0MDBweDtcclxuXHRcdFx0XHRib3JkZXI6IDFweCBzb2xpZCAjZTRlNGU0O1xyXG5cdFx0XHR9XHJcblx0XHRgO1xyXG5cdCAgICBcclxuXHQgICAgRE9NLmFkZFN0eWxlKCdUdXJiby1lQ29tbWVyY2UtQ2hlY2tvdXQnLCBjc3MpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogSGlkZXMgYWxsIGlycmVsZXZhbnQgZWxlbWVudHMgZnJvbSB0aGUgRE9NLlxyXG5cdCAqXHJcblx0ICogQHJldHVybiB2b2lkIFxyXG5cdCAqL1xyXG5cdGhpZGVBbGwoKVxyXG5cdHtcdFxyXG5cdFx0Q29udGFpbmVyJDIuQ29tcG9uZW50cy5ib290ZWQuZm9yRWFjaChmdW5jdGlvbihjb21wb25lbnQpIHtcclxuXHRcdFx0aWYgKGNvbXBvbmVudC5jb25zdHJ1Y3Rvci5uYW1lICE9ICdDaGVja291dCcpIHtcclxuXHRcdFx0XHRjb21wb25lbnQuaGlkZSgpO1xyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEhpZGVzIHRoZSBjb21wb25lbnQgZnJvbSB0aGUgRE9NLlxyXG5cdCAqXHJcblx0ICogQHJldHVybiB2b2lkIFxyXG5cdCAqL1xyXG5cdGhpZGUoKVxyXG5cdHtcclxuXHRcdHRoaXMuZWxlbWVudC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogU2hvd3MgdGhlIGVsZW1lbnQgb24gdGhlIERPTS5cclxuXHQgKlxyXG5cdCAqIEByZXR1cm4gdm9pZCBcclxuXHQgKi9cclxuXHRzaG93KClcclxuXHR7XHJcblx0XHR0aGlzLmVsZW1lbnQuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XHJcblx0fVxyXG59XG5cbi8qKlxyXG4gKiBAZmlsZSBcclxuICogUHJvZHVjdHMgY2xhc3MuXHJcbiAqXHJcbiAqIFRoZSBQcm9kdWN0cyBjb21wb25lbnQsIGhhbmRsZXMgdGhlIHByb2R1Y3RzIHRhc2tzLlxyXG4gKi9cclxuXHJcblxyXG4vKipcclxuICogVGhlIGRlZmF1bHQgc2V0dGluZ3Mgb2YgZWFjaCBwcm9kdWN0LlxyXG4gKlxyXG4gKiBAdmFyIG9iamVjdFxyXG4gKi9cclxubGV0IGRlZmF1bHRTZXR0aW5ncyQ0ID0ge1xyXG5cdGVsZW1lbnQ6ICcucHJvZHVjdHMnLFxyXG5cdGNsYXNzOiAnJyxcclxuXHRpdGVtX2NsYXNzOiAnJyxcclxuXHRhZGRfYnV0dG9uX2NsYXNzOiAnYnRuIGJ0bi1wcmltYXJ5JyxcclxuXHRmYXZvcml0ZV9idXR0b25fY2xhc3M6ICdidG4gYnRuLWRhbmdlcicsXHJcblx0d2lkdGg6ICcyMDBweCcsXHJcblx0aGVpZ2h0OiAnMjUwcHgnLFxyXG5cdGF0dHJpYnV0ZXM6IFsnbmFtZScsICdwcmljZScsICdkZWxpdmVyeVRpbWUnLCAnaW1hZ2UnXSxcclxuXHR1cmw6ICdwcm9kdWN0cy5waHAnLFxyXG5cdG5vX2NzczogZmFsc2UsXHJcblx0Y3VycmVuY3k6ICckJyxcclxufTtcclxuXHJcbi8qKlxyXG4gKiBTdG9yZXMgdGhlIGNvbnRhaW5lciBvYmplY3QuXHJcbiAqIFxyXG4gKiBAdmFyIFxcQ29yZVxcQ29udGFpbmVyXHJcbiAqL1xyXG5sZXQgQ29udGFpbmVyJDM7XHJcblxyXG4vKipcclxuICogU3RvcmVzIHRoZSBjb250YWluZXIgb2JqZWN0LlxyXG4gKiBcclxuICogQHZhciBcXENvcmVcXEV2ZW50TWFuYWdlclxyXG4gKi9cclxubGV0IEV2ZW50TWFuYWdlciQ0O1xyXG5cclxuLyoqXHJcbiAqIFN0b3JlcyB0aGUgcmVxdWVzdCBvYmplY3QuXHJcbiAqIFxyXG4gKiBAdmFyIFxcSGVscGVyXFxSZXF1ZXN0IFxyXG4gKi9cclxubGV0IEh0dHAkMjtcclxuXHJcbi8qKlxyXG4gKiBTdG9yZXMgdGhlIGNodW5rZWQgcGVyIFxyXG4gKiBwYWdlIHByb2R1Y3RzLlxyXG4gKiBcclxuICogQHZhciBhcnJheVxyXG4gKi9cclxubGV0IGNodW5rZWRQcm9kdWN0cztcclxuXHJcbmNsYXNzIFByb2R1Y3RzIFxyXG57XHJcblx0LyoqXHJcblx0ICogSW5pdGFsaXplIHRoZSBDb250YWluZXIuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gXFxDb3JlXFxDb250YWluZXIgfCBjb250YWluZXJcclxuXHQgKiBAcGFyYW0gXFxIZWxwZXJzXFxSZXF1ZXN0IHwgaHR0cFxyXG5cdCAqIEByZXR1cm4gdm9pZFxyXG5cdCAqL1xyXG5cdGNvbnN0cnVjdG9yKGNvbnRhaW5lciwgaHR0cCwgZXZlbnRNYW5hZ2VyKSBcclxuXHR7XHJcblx0XHRDb250YWluZXIkMyA9IGNvbnRhaW5lcjtcclxuXHRcdEh0dHAkMiA9IGh0dHA7XHJcblx0XHRFdmVudE1hbmFnZXIkNCA9IGV2ZW50TWFuYWdlcjtcclxuXHRcdGNodW5rZWRQcm9kdWN0cyA9IFtdO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogU2V0cyB0aGUgZ2l2ZW4gc2V0dGluZ3MgZnJvbSB0aGUgdXNlci5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSBvYmplY3QgfCBzZXR0aW5nc1xyXG5cdCAqIEByZXR1cm4gdm9pZFxyXG5cdCAqL1xyXG5cdHNldHVwKHNldHRpbmdzKVxyXG5cdHtcclxuXHRcdGlmICh0eXBlb2Ygc2V0dGluZ3MgIT0gJ29iamVjdCcpIHtcclxuXHRcdFx0dGhyb3cgbmV3IEludmFsaWRBcmd1bWVudEV4Y2VwdGlvbiQxO1xyXG5cdFx0fVxyXG5cclxuXHRcdHRoaXMuc2V0dGluZ3MgPSBDb21tb24uZXh0ZW5kKGRlZmF1bHRTZXR0aW5ncyQ0LCBzZXR0aW5ncyk7XHJcblx0XHR0aGlzLnRvdGFsSXRlbXMgPSBudWxsO1xyXG5cclxuXHRcdGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCBmdW5jdGlvbigpIHtcclxuXHJcblx0XHRcdHRoaXMuc2V0RWxlbWVudCh0aGlzLnNldHRpbmdzLmVsZW1lbnQpO1xyXG5cclxuXHRcdFx0dGhpcy5hZGRTdHlsZVRhZygpO1x0XHJcblxyXG5cdFx0XHR0aGlzLmxvYWRQcm9kdWN0cygxKTtcclxuXHRcdH0uYmluZCh0aGlzKSk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBMb2FkcyB0aGUgcHJvZHVjdHMgZm9yIHRoZSBwYWdlLlxyXG5cdCAqIFxyXG5cdCAqIEBwYXJhbSBudW1iZXIgfCBwYWdlTnVtYmVyXHJcblx0ICogQHJldHVybiB2b2lkXHJcblx0ICovXHJcblx0bG9hZFByb2R1Y3RzKHBhZ2VOdW1iZXIgPSAxKVxyXG5cdHtcclxuXHRcdGlmIChDb250YWluZXIkMy5QYWdpbmF0aW9uICYmIENvbnRhaW5lciQzLlBhZ2luYXRpb24uYm9vdGVkKSB7XHJcblx0XHRcdFxyXG5cdFx0XHRsZXQgbGltaXQgPSBDb250YWluZXIkMy5QYWdpbmF0aW9uLnNldHRpbmdzLnBlcl9wYWdlO1xyXG5cclxuXHRcdFx0c3dpdGNoKENvbnRhaW5lciQzLlBhZ2luYXRpb24uc2V0dGluZ3MucHJvY2Vzc2luZykgXHJcblx0XHRcdHtcclxuXHRcdFx0XHRjYXNlICdjbGllbnQtc2lkZSc6XHJcblx0XHRcdFx0XHRyZXR1cm4gdGhpcy5sb2FkUGFnZVByb2R1Y3RzT25jZShwYWdlTnVtYmVyLCBsaW1pdCk7XHJcblx0XHRcdFx0XHRicmVhaztcclxuXHRcdFx0XHRjYXNlICdzZXJ2ZXItc2lkZSc6XHJcblx0XHRcdFx0XHRyZXR1cm4gdGhpcy5sb2FkUGFnZVByb2R1Y3RzKHBhZ2VOdW1iZXIsIGxpbWl0KTtcclxuXHRcdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRcdGRlZmF1bHQ6XHJcblx0XHRcdFx0XHR0aHJvdyBuZXcgSW52YWxpZEFyZ3VtZW50RXhjZXB0aW9uJDEoJ2ZvciBwcm9jZXNzaW5nIHlvdSBjYW4gY2hvb3NlIFxcJ3NlcnZlci1zaWRlXFwnIG9yIFxcJ2NsaWVudC1zaWRlXFwnIG9wdGlvbnMuJyk7XHJcblx0XHRcdH1cclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdHRoaXMubG9hZFBhZ2VQcm9kdWN0cygpO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogTG9hZHMgdGhlIHByb2R1Y3RzIGFuZCBcclxuXHQgKiByZXBsYWNlIHRoZW0gaW4gdGhlIGRpdiBjb250YWluZXIuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gbnVtYmVyIHwgcGFnZU51bWJlclxyXG5cdCAqIEBwYXJhbSBudW1iZXIgfCBsaW1pdFxyXG5cdCAqIEByZXR1cm4gdm9pZFxyXG5cdCAqL1xyXG5cdGxvYWRQYWdlUHJvZHVjdHMocGFnZU51bWJlciA9IG51bGwsIGxpbWl0ID0gbnVsbClcclxuXHR7XHJcblx0XHRsZXQgcmVxdWVzdCA9IHRoaXMuZ2V0UHJvZHVjdHMocGFnZU51bWJlcik7XHJcblxyXG5cdFx0cmVxdWVzdC50aGVuKGZ1bmN0aW9uKHByb2R1Y3RzKSB7XHJcblx0XHRcdGlmIChsaW1pdCkge1xyXG5cdFx0XHRcdHRoaXMuY3VycmVudEl0ZW1zID0gcHJvZHVjdHMuc2xpY2UoMCwgbGltaXQpO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdHRoaXMuY3VycmVudEl0ZW1zID0gcHJvZHVjdHM7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHRoaXMucmVwbGFjZVByb2R1Y3RzKHRoaXMuY3VycmVudEl0ZW1zKTtcclxuXHRcdFx0UHJvbWlzZS5yZXNvbHZlKHRoaXMuY3VycmVudEl0ZW1zKTtcclxuXHRcdH0uYmluZCh0aGlzKSkuY2F0Y2goZnVuY3Rpb24oZXJyb3IpIHtcclxuXHRcdFx0Ly8gdGhyb3cgbmV3IEVycm9yKCdDb3VsZCBub3QgbG9hZCBwcm9kdWN0cyEgUmVhc29uOiAnICsgZXJyb3IpO1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0cmV0dXJuIHJlcXVlc3Q7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBMb2FkcyB0aGUgcHJvZHVjdHMgYW5kIFxyXG5cdCAqIHJlcGxhY2UgdGhlbSBpbiB0aGUgZGl2IGNvbnRhaW5lci5cclxuXHQgKlxyXG5cdCAqIEByZXR1cm4gdm9pZFxyXG5cdCAqL1xyXG5cdGxvYWRQYWdlUHJvZHVjdHNPbmNlKHBhZ2VOdW1iZXIpXHJcblx0e1xyXG5cdFx0bGV0IHJlcXVlc3Q7XHJcblxyXG5cdFx0aWYgKHRoaXMudG90YWxJdGVtcyA9PSBudWxsKSB7IC8vIG5lZWQgdG8gZmV0Y2ggdGhlbSBmcm9tIHRoZSBzZXJ2ZXIuXHJcblx0XHRcdHJlcXVlc3QgPSB0aGlzLmdldFByb2R1Y3RzKCk7XHJcblx0XHR9IGVsc2UgeyAvLyBubyBuZWVkIHRvIHdhaXQgY2FuIHJlc29sdmUgaW1tZWRpYXRlbHkgd2l0aCB0aGUgcHJvZHVjdHMuIFxyXG5cdFx0XHRyZXF1ZXN0ID0gUHJvbWlzZS5yZXNvbHZlKHRoaXMudG90YWxJdGVtcyk7XHJcblx0XHR9XHJcblxyXG5cdFx0cmVxdWVzdC50aGVuKGZ1bmN0aW9uKHByb2R1Y3RzKSB7XHJcblx0XHRcdHRoaXMudG90YWxJdGVtcyA9IHByb2R1Y3RzO1xyXG5cdFx0XHRsZXQgcGFnZXMgPSB0aGlzLmNhbGN1bGF0ZUNsaWVudFBhZ2VzKHByb2R1Y3RzKTtcclxuXHRcdFx0dGhpcy5jdXJyZW50SXRlbXMgPSBwYWdlc1twYWdlTnVtYmVyLTFdO1xyXG5cdFx0XHR0aGlzLnJlcGxhY2VQcm9kdWN0cyh0aGlzLmN1cnJlbnRJdGVtcyk7XHJcblx0XHRcdFByb21pc2UucmVzb2x2ZSh0aGlzLmN1cnJlbnRJdGVtcyk7XHJcblx0XHR9LmJpbmQodGhpcykpLmNhdGNoKGZ1bmN0aW9uKGVycm9yKSB7XHJcblx0XHRcdC8vIHRocm93IG5ldyBFcnJvcignQ291bGQgbm90IGxvYWQgcHJvZHVjdHMhIFJlYXNvbjogJyArIGVycm9yKTtcclxuXHRcdH0pO1xyXG5cclxuXHRcdHJldHVybiByZXF1ZXN0O1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQ2FsY3VsYXRlcyB0aGUgYW1vdW50IG9mIHBhZ2VzIGZvciB0aGUgY2xpZW50LlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIGFycmF5IHwgcHJvZHVjdHNcclxuXHQgKiBAcmV0dXJuIGFycmF5XHJcblx0ICovXHJcblx0Y2FsY3VsYXRlQ2xpZW50UGFnZXMocHJvZHVjdHMpXHJcblx0e1x0XHJcblx0XHQvLyBXZSBhcmUgdXNpbmcgcGFnaW5hdGlvbiBzbyB3ZSBuZWVkIHRvIHVwZGF0ZSBpdCB0b28uXHJcblx0XHRDb250YWluZXIkMy5QYWdpbmF0aW9uLnNldHRpbmdzLnRvdGFsX2l0ZW1zID0gcHJvZHVjdHMubGVuZ3RoO1xyXG5cdFx0XHJcblx0XHRsZXQgcGVyUGFnZSA9IENvbnRhaW5lciQzLlBhZ2luYXRpb24uc2V0dGluZ3MucGVyX3BhZ2U7IFxyXG5cclxuXHRcdC8vIFdlIG5lZWQgdG8gY2FsY3VsYXRlIHRoZSBwYWdlcyBvbiBmdWxsIGh0dHAgcmVxdWVzdCBcclxuXHRcdC8vIG9ubHkgb25jZS4gc28gd2UgY2hlY2sgdG8gc2VlIGlmIHdlIGhhdmUgcmVzdWx0cyBpbiBvdXIgY2FjaGUuXHJcblx0XHRpZiAoY2h1bmtlZFByb2R1Y3RzLmxlbmd0aCAhPSAwKSB7XHJcblx0XHRcdHJldHVybiBjaHVua2VkUHJvZHVjdHM7XHJcblx0XHR9XHJcblxyXG5cdFx0Y2h1bmtlZFByb2R1Y3RzID0gQ29tbW9uLmFycmF5X2NodW5rKHByb2R1Y3RzLCBwZXJQYWdlKTtcclxuXHRcdHJldHVybiBjaHVua2VkUHJvZHVjdHM7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBTZXRzIHRoZSBET00gZWxlbWVudCBcclxuXHQgKiBmb3IgcG9wdWxhdGluZyB0aGUgcHJvZHVjdHMuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gc3RyaW5nIHwgc2VsZWN0b3JcclxuXHQgKiBAcmV0dXJuIHZvaWRcclxuXHQgKi9cclxuXHRzZXRFbGVtZW50KHNlbGVjdG9yKVxyXG5cdHtcclxuXHRcdHRoaXMuZWxlbWVudCA9IERPTS5maW5kKHNlbGVjdG9yKTtcclxuXHJcblx0XHRpZiAodGhpcy5lbGVtZW50KSB7XHJcblx0XHRcdERPTS5hZGRDbGFzcyh0aGlzLmVsZW1lbnQsIHRoaXMuc2V0dGluZ3MuY2xhc3MpO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogUmVwbGFjZSBwcm9kdWN0cyBpbiBcclxuXHQgKiB0aGUgcHJvZHVjdHMgY29udGFpbmVyLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIGFycmF5IHwgcmF3UHJvZHVjdHNcclxuXHQgKiBAcmV0dXJuIGFycmF5XHJcblx0ICovXHJcblx0cmVwbGFjZVByb2R1Y3RzKHJhd1Byb2R1Y3RzKSBcclxuXHR7XHJcblx0XHRpZiAoISBBcnJheS5pc0FycmF5KHJhd1Byb2R1Y3RzKSB8fCAocmF3UHJvZHVjdHMubGVuZ3RoIDw9IDAgJiYgdHlwZW9mIHJhd1Byb2R1Y3RzWzBdID09ICdzdHJpbmcnKSkge1xyXG5cdFx0XHR0aHJvdyBuZXcgSW52YWxpZEFyZ3VtZW50RXhjZXB0aW9uJDE7XHJcblx0XHR9XHJcblxyXG5cdFx0bGV0IHByb2R1Y3RzID0gdGhpcy5idWlsZFByb2R1Y3RzKHJhd1Byb2R1Y3RzLCB0aGlzLnNldHRpbmdzLml0ZW1fY2xhc3MsICdkaXYnKTtcclxuXHJcblx0XHR0aGlzLmVsZW1lbnQuaW5uZXJIVE1MID0gJyc7XHJcblx0XHRwcm9kdWN0cy5mb3JFYWNoKGZ1bmN0aW9uKHByb2R1Y3QpIHtcclxuXHRcdFx0RXZlbnRNYW5hZ2VyJDQucHVibGlzaCgncHJvZHVjdHMubG9hZGluZycsIHByb2R1Y3QpO1xyXG5cdFx0XHR0aGlzLmVsZW1lbnQuYXBwZW5kQ2hpbGQocHJvZHVjdCk7XHJcblx0XHR9LmJpbmQodGhpcykpO1xyXG5cclxuXHRcdEV2ZW50TWFuYWdlciQ0LnB1Ymxpc2goJ3Byb2R1Y3RzLmxvYWRlZCcsIHByb2R1Y3RzKTtcclxuXHJcblx0XHRyZXR1cm4gcHJvZHVjdHM7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBNYWtlcyBhbiBBamF4IGNhbGwgdG8gdGhlIFxyXG5cdCAqIHNlcnZlciB3aXRob3V0IHBhcmFtZXRlcnMuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gbnVtYmVyIHwgcGFnZU51bWJlclxyXG5cdCAqIEByZXR1cm4gUHJvbWlzZVxyXG5cdCAqL1xyXG5cdGdldFByb2R1Y3RzKHBhZ2VOdW1iZXIgPSBudWxsKVxyXG5cdHtcclxuXHRcdGxldCBhY3Rpb24gPSAocGFnZU51bWJlcikgPyB0aGlzLnNldHRpbmdzLnVybCArICc/cGFnZT0nICsgcGFnZU51bWJlciA6IHRoaXMuc2V0dGluZ3MudXJsO1xyXG5cclxuXHRcdHJldHVybiBIdHRwJDIuZ2V0KHtcclxuXHRcdFx0dXJsOiBhY3Rpb24sXHJcblx0XHR9KTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEJ1aWxkcyB0aGUgaHRtbCBmb3IgdGhlIHByb2R1Y3RzLlxyXG5cdCAqIFxyXG5cdCAqIEBwYXJhbSBhcnJheSB8IGF0dHJpYnV0ZXNDb2xsZWN0aW9uXHJcblx0ICogQHBhcmFtIHN0cmluZyB8IGNsYXNzTmFtZVxyXG5cdCAqIEBwYXJhbSBzdHJpbmcgfCB0YWdUeXBlXHJcblx0ICogQHJldHVybiBhcnJheVxyXG5cdCAqL1xyXG5cdGJ1aWxkUHJvZHVjdHMoYXR0cmlidXRlc0NvbGxlY3Rpb24sIGNsYXNzTmFtZSwgdGFnVHlwZSkgXHJcblx0e1xyXG5cdFx0aWYoYXR0cmlidXRlc0NvbGxlY3Rpb24uY29uc3RydWN0b3IubmFtZSAhPSAnQXJyYXknICkge1xyXG5cdFx0XHR0aHJvdyBuZXcgSW52YWxpZEFyZ3VtZW50RXhjZXB0aW9uJDE7XHJcblx0XHR9XHJcblxyXG5cdFx0bGV0IGJ1aWx0UHJvZHVjdHMgPSBbXTtcclxuXHJcblx0XHQvLyBFbnRlciBkZWZhdWx0IGF0dHJpYnV0ZS5cclxuXHRcdGlmICh0aGlzLnNldHRpbmdzLmF0dHJpYnV0ZXMuaW5kZXhPZignY3VycmVuY3knKSA9PSAtMSkge1xyXG5cdFx0XHR0aGlzLnNldHRpbmdzLmF0dHJpYnV0ZXMucHVzaCgnY3VycmVuY3knKTtcclxuXHRcdH1cclxuXHRcdFxyXG5cdFx0YXR0cmlidXRlc0NvbGxlY3Rpb24uZm9yRWFjaChmdW5jdGlvbihhdHRyaWJ1dGVzKSB7XHJcblx0XHRcdGxldCBidWlsdFByb2R1Y3QgPSB0aGlzLmJ1aWxkUHJvZHVjdChhdHRyaWJ1dGVzLCBjbGFzc05hbWUsIHRhZ1R5cGUpO1xyXG5cdFx0XHRidWlsdFByb2R1Y3RzLnB1c2goYnVpbHRQcm9kdWN0KTtcclxuXHRcdH0uYmluZCh0aGlzKSk7XHJcblxyXG5cdFx0cmV0dXJuIGJ1aWx0UHJvZHVjdHM7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBCdWlsZHMgdGhlIGh0bWwgZm9yIGEgc2luZ2xlIHByb2R1Y3QuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gb2JqZWN0IHwgYXR0cmlidXRlc1xyXG5cdCAqIEBwYXJhbSBzdHJpbmcgfCBjbGFzc05hbWVcclxuXHQgKiBAcGFyYW0gc3RyaW5nIHwgdGFnVHlwZVxyXG5cdCAqIEByZXR1cm4gb2JqZWN0XHJcblx0ICovXHJcblx0YnVpbGRQcm9kdWN0KGF0dHJpYnV0ZXMsIGNsYXNzTmFtZSwgdGFnVHlwZSkgXHJcblx0e1xyXG5cdFx0aWYgKHR5cGVvZiBhdHRyaWJ1dGVzICE9ICdvYmplY3QnIHx8IHR5cGVvZiB0YWdUeXBlICE9ICdzdHJpbmcnKSB7XHJcblx0XHRcdHRocm93IG5ldyBJbnZhbGlkQXJndW1lbnRFeGNlcHRpb24kMTtcclxuXHRcdH1cclxuXHJcblx0XHRjbGFzc05hbWUgPSBjbGFzc05hbWUgfHwgbnVsbDtcclxuXHJcblx0XHRsZXQgcHJvZHVjdCA9IERPTS5jcmVhdGVFbGVtZW50KCdkaXYnLCB7XHJcblx0XHRcdGNsYXNzOiAncHJvZHVjdCdcclxuXHRcdH0pO1xyXG5cclxuXHRcdERPTS5hZGRDbGFzcyhwcm9kdWN0LCBjbGFzc05hbWUpO1xyXG5cclxuXHRcdGxldCBvdmVybGF5ID0gRE9NLmNyZWF0ZUVsZW1lbnQoJ2RpdicsIHtcclxuXHRcdFx0Y2xhc3M6ICdwcm9kdWN0LW92ZXJsYXknLFxyXG5cdFx0fSk7XHJcblxyXG5cdFx0cHJvZHVjdC5hcHBlbmRDaGlsZChvdmVybGF5KTtcclxuXHJcblx0XHRhdHRyaWJ1dGVzID0gdGhpcy5hZGREZWZhdWx0QXR0cmlidXRlcyhhdHRyaWJ1dGVzKTtcclxuXHJcblx0XHRpZiAoYXR0cmlidXRlcy5oYXNPd25Qcm9wZXJ0eSgnaW1hZ2UnKSkge1xyXG5cdFx0XHRsZXQgaW1hZ2UgPSBET00uY3JlYXRlRWxlbWVudCgnaW1nJywge1xyXG5cdFx0XHRcdHNyYzogYXR0cmlidXRlc1snaW1hZ2UnXVxyXG5cdFx0XHR9KTtcclxuXHRcdFx0XHJcblx0XHRcdGxldCB0YWcgPSBET00uY3JlYXRlRWxlbWVudCh0YWdUeXBlLCB7XHJcblx0XHRcdFx0Y2xhc3M6ICdwcm9kdWN0LWltYWdlJyxcclxuXHRcdFx0XHRodG1sOiBpbWFnZS5vdXRlckhUTUxcclxuXHRcdFx0fSk7XHJcblx0XHRcdFxyXG5cdFx0XHRwcm9kdWN0LmFwcGVuZENoaWxkKHRhZyk7XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKGF0dHJpYnV0ZXMuaGFzT3duUHJvcGVydHkoJ3ByaWNlJykpIHtcclxuXHRcdFx0bGV0IHRhZyA9IERPTS5jcmVhdGVFbGVtZW50KHRhZ1R5cGUsIHtcclxuXHRcdFx0XHRjbGFzczogJ3Byb2R1Y3QtcHJpY2UnLFxyXG5cdFx0XHRcdHRleHQ6IGF0dHJpYnV0ZXMucHJpY2UuYW1vdW50XHJcblx0XHRcdH0pO1xyXG5cdFx0XHRsZXQgc3BhbiA9IERPTS5jcmVhdGVFbGVtZW50KCdzcGFuJywge1xyXG5cdFx0XHRcdGNsYXNzOiAncHJvZHVjdC1jdXJyZW5jeScsXHJcblx0XHRcdFx0aHRtbDogYXR0cmlidXRlcy5wcmljZS5jdXJyZW5jeVxyXG5cdFx0XHR9KTtcclxuXHJcblx0XHRcdHRhZy5hcHBlbmRDaGlsZChzcGFuKTtcclxuXHRcdFx0b3ZlcmxheS5hcHBlbmRDaGlsZCh0YWcpO1xyXG5cdFx0fVxyXG5cclxuXHRcdGZvciAodmFyIGF0dHJpYnV0ZSBpbiBhdHRyaWJ1dGVzKSB7XHJcblx0XHRcdGlmICghIENvbW1vbi5pbl9hcnJheShhdHRyaWJ1dGUsIHRoaXMuc2V0dGluZ3MuYXR0cmlidXRlcykpIHtcclxuXHRcdFx0XHRjb250aW51ZTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0aWYgKGF0dHJpYnV0ZSA9PSAncHJpY2UnIHx8IGF0dHJpYnV0ZSA9PSAnaW1hZ2UnKSB7XHJcblx0XHRcdFx0Y29udGludWU7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGxldCB0YWcgPSBET00uY3JlYXRlRWxlbWVudCh0YWdUeXBlKTtcclxuXHRcdFx0dGFnLmlubmVySFRNTCA9IGF0dHJpYnV0ZXNbYXR0cmlidXRlXSB8fCAnJztcclxuXHRcdFx0XHJcblx0XHRcdERPTS5hZGRDbGFzcyh0YWcsICdwcm9kdWN0LScgKyBTdHIua2ViYWJDYXNlKGF0dHJpYnV0ZSkpO1xyXG5cdFx0XHRvdmVybGF5LmFwcGVuZENoaWxkKHRhZyk7XHJcblx0XHR9XHJcblxyXG5cdFx0bGV0IHRhZyA9IERPTS5jcmVhdGVFbGVtZW50KCdkaXYnLCB7XHJcblx0XHRcdGNsYXNzOiAnYWN0aW9uLWJ1dHRvbnMnXHJcblx0XHR9KTtcclxuXHJcblx0XHRsZXQgYWRkVG9DYXJ0ID0gRE9NLmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicsIHtcclxuXHRcdFx0Y2xhc3M6ICdhZGQtdG8tY2FydCcsXHJcblx0XHRcdHR5cGU6ICdidXR0b24nLFxyXG5cdFx0XHR0ZXh0OiAnKycsXHJcblx0XHR9KTtcclxuXHJcblx0XHRsZXQgZmF2b3JpdGUgPSBET00uY3JlYXRlRWxlbWVudCgnYnV0dG9uJywge1xyXG5cdFx0XHRjbGFzczogJ2Zhdm9yaXRlJyxcclxuXHRcdFx0dHlwZTogJ2J1dHRvbicsXHJcblx0XHRcdHRleHQ6ICcmaGVhcnRzOydcclxuXHRcdH0pO1xyXG5cclxuXHRcdGlmICh0aGlzLnNldHRpbmdzLmFkZF9idXR0b25fY2xhc3MpIHtcclxuXHRcdFx0RE9NLmFkZENsYXNzKGFkZFRvQ2FydCwgdGhpcy5zZXR0aW5ncy5hZGRfYnV0dG9uX2NsYXNzKTtcclxuXHRcdH1cclxuXHJcblx0XHRpZiAodGhpcy5zZXR0aW5ncy5mYXZvcml0ZV9idXR0b25fY2xhc3MpIHtcclxuXHRcdFx0RE9NLmFkZENsYXNzKGZhdm9yaXRlLCB0aGlzLnNldHRpbmdzLmZhdm9yaXRlX2J1dHRvbl9jbGFzcyk7XHJcblx0XHR9XHJcblxyXG5cdFx0dGFnLmFwcGVuZENoaWxkKGFkZFRvQ2FydCk7XHJcblx0XHR0YWcuYXBwZW5kQ2hpbGQoZmF2b3JpdGUpO1xyXG5cclxuXHRcdGFkZFRvQ2FydC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcclxuXHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdFx0XHRFdmVudE1hbmFnZXIkNC5wdWJsaXNoKCdjYXJ0LnByb2R1Y3QuYWRkZWQnLCBhdHRyaWJ1dGVzKTtcclxuXHRcdH0pO1xyXG5cclxuXHRcdGZhdm9yaXRlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xyXG5cdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XHJcblx0XHRcdHRoaXMuaW5uZXJIVE1MID0gJyYjeDI3MTM7JztcclxuXHRcdFx0RXZlbnRNYW5hZ2VyJDQucHVibGlzaCgnY2FydC5wcm9kdWN0LmZhdm9yaXRlZCcsIGF0dHJpYnV0ZXMpO1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0b3ZlcmxheS5hcHBlbmRDaGlsZCh0YWcpO1xyXG5cclxuXHRcdHJldHVybiBwcm9kdWN0O1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQWRkcyBkZWZhdWx0IGF0dHJpYnV0ZXNcclxuXHQgKiB0byB0aGUgc3VwcGxpZWQgYXR0cmlidXRlcy5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSBvYmplY3QgfCBhdHRyaWJ1dGVzXHJcblx0ICogQHJldHVybiBvYmplY3RcclxuXHQgKi9cclxuXHRhZGREZWZhdWx0QXR0cmlidXRlcyhhdHRyaWJ1dGVzKVxyXG5cdHtcclxuXHRcdGlmIChhdHRyaWJ1dGVzLmhhc093blByb3BlcnR5KCdwcmljZScpICYmIHR5cGVvZiBhdHRyaWJ1dGVzLnByaWNlICE9ICdvYmplY3QnKSB7XHJcblx0XHRcdGF0dHJpYnV0ZXMucHJpY2UgPSB7XHJcblx0XHRcdFx0XCJhbW91bnRcIjogYXR0cmlidXRlcy5wcmljZSxcclxuXHRcdFx0XHRcImN1cnJlbmN5XCI6IHRoaXMuc2V0dGluZ3MuY3VycmVuY3lcclxuXHRcdFx0fTtcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gYXR0cmlidXRlcztcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEFkZCB0aGUgZUNvbW1lcmNlIHN0eWxlIHRhZ3MgdG8gdGhlIERPTS5cclxuXHQgKi9cclxuXHRhZGRTdHlsZVRhZygpIFxyXG5cdHtcclxuXHRcdGlmIChET00uZmluZCgnI1R1cmJvLWVDb21tZXJjZS1Qcm9kdWN0cycpKSB7XHJcblx0XHRcdHJldHVybjtcclxuXHRcdH1cclxuXHJcblx0XHRpZiAodGhpcy5zZXR0aW5ncy5ub19jc3MpIHtcclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0fVxyXG5cclxuXHRcdGxldCB3aWR0aCA9IHRoaXMuc2V0dGluZ3Mud2lkdGggfHwgJ2F1dG8nO1xyXG5cdFx0bGV0IGhlaWdodCA9IHRoaXMuc2V0dGluZ3MuaGVpZ2h0IHx8ICcyMDBweCc7XHJcblx0XHRsZXQgbWluV2lkdGggPSB0aGlzLnNldHRpbmdzLm1pbl93aWR0aCB8fCAnMjAwcHgnO1xyXG5cdFx0bGV0IG1heFdpZHRoID0gdGhpcy5zZXR0aW5ncy5tYXhfd2lkdGggfHwgJzI1MHB4JztcclxuXHJcblx0XHRsZXQgY3NzID0gYFxyXG5cdFx0XHQucHJvZHVjdCB7XHJcblx0XHRcdFx0cG9zaXRpb246IHJlbGF0aXZlO1xyXG5cdFx0XHRcdG1hcmdpbjogNXB4IDVweDtcclxuXHRcdFx0XHRib3JkZXI6IDFweCBzb2xpZCAjZTRlNGU0O1xyXG5cdFx0XHRcdHdpZHRoOiAke3dpZHRofTtcclxuXHRcdFx0XHRtaW4td2lkdGg6ICR7bWluV2lkdGh9O1xyXG5cdFx0XHRcdG1heC13aWR0aDogJHttYXhXaWR0aH07XHJcblx0XHRcdFx0aGVpZ2h0OiAke2hlaWdodH07XHJcblx0XHRcdFx0Y3Vyc29yOiBwb2ludGVyO1xyXG5cdFx0XHRcdGNvbG9yOiAjZmZmZmZmO1xyXG5cdFx0XHRcdG92ZXJmbG93OiBoaWRkZW47XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdC5wcm9kdWN0ID4gLnByb2R1Y3Qtb3ZlcmxheSB7XHJcblx0XHRcdFx0cG9zaXRpb246IGFic29sdXRlO1xyXG5cdFx0XHRcdHRvcDogMDtcclxuXHRcdFx0XHRsZWZ0OiAwO1xyXG5cdFx0XHRcdHdpZHRoOiAxMDAlO1xyXG5cdFx0XHRcdGhlaWdodDogMTAwJTtcclxuXHRcdFx0XHRvcGFjaXR5OiAwLjU7XHJcblx0XHRcdFx0ei1pbmRleDogNTtcclxuXHRcdFx0XHR0cmFuc2l0aW9uOiAxcyBhbGw7XHJcblx0XHRcdFx0dHJhbnNmb3JtOiB0cmFuc2xhdGVYKC0yNTBweCk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdC5wcm9kdWN0OmhvdmVyID4gLnByb2R1Y3Qtb3ZlcmxheSB7XHJcblx0XHRcdFx0YmFja2dyb3VuZDogcmdiYSgwLCAwLCAwLCAwLjQ1KTtcclxuXHRcdFx0XHR0cmFuc2Zvcm06IHRyYW5zbGF0ZVgoMHB4KTtcclxuXHRcdFx0XHRvcGFjaXR5OiAxO1xyXG5cdFx0XHRcdHRyYW5zaXRpb246IDAuNXMgYWxsO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHQucHJvZHVjdCA+IC5wcm9kdWN0LWltYWdlID4gaW1nIHtcclxuXHRcdFx0XHRwb3NpdGlvbjogYWJzb2x1dGU7XHJcblx0XHRcdFx0bGVmdDogMDtcclxuXHRcdFx0XHR0b3A6IDA7XHJcblx0XHRcdFx0d2lkdGg6IDEwMCU7XHJcblx0XHRcdFx0aGVpZ2h0OiAxMDAlO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHQucHJvZHVjdCA+IC5wcm9kdWN0LW92ZXJsYXkgPiAucHJvZHVjdC1uYW1lLCBcclxuXHRcdFx0LnByb2R1Y3QgPiAucHJvZHVjdC1vdmVybGF5ID4gLnByb2R1Y3QtcHJpY2UsXHJcblx0XHRcdC5wcm9kdWN0ID4gLnByb2R1Y3Qtb3ZlcmxheSA+IC5wcm9kdWN0LWRlbGl2ZXJ5LXRpbWUge1xyXG5cdFx0XHRcdHotaW5kZXg6IDE7XHJcblx0XHRcdFx0cG9zaXRpb246IHJlbGF0aXZlO1xyXG5cdFx0XHRcdHRleHQtYWxpZ246IGNlbnRlcjtcclxuXHRcdFx0XHRtYXJnaW4tdG9wOiAyNXB4O1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHQucHJvZHVjdCA+IC5wcm9kdWN0LW92ZXJsYXkgPiAuYWN0aW9uLWJ1dHRvbnMge1xyXG5cdFx0XHRcdHdpZHRoOiAxMDAlO1xyXG5cdFx0XHRcdG1hcmdpbi10b3A6IDEwcHg7XHJcblx0XHRcdFx0dGV4dC1hbGlnbjogY2VudGVyO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHQucHJvZHVjdCA+IC5wcm9kdWN0LW92ZXJsYXkgPiAuYWN0aW9uLWJ1dHRvbnMgPiAuZmF2b3JpdGUge1xyXG5cdFx0XHRcdG1hcmdpbi1sZWZ0OiAxMHB4O1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0YDtcclxuXHQgICAgXHJcblx0ICAgIERPTS5hZGRTdHlsZSgnVHVyYm8tZUNvbW1lcmNlLVByb2R1Y3RzJywgY3NzKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEhpZGVzIHRoZSBjb21wb25lbnQgZnJvbSB0aGUgRE9NLlxyXG5cdCAqXHJcblx0ICogQHJldHVybiB2b2lkIFxyXG5cdCAqL1xyXG5cdGhpZGUoKVxyXG5cdHtcclxuXHRcdHRoaXMuZWxlbWVudC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xyXG5cdH1cclxufVxuXG4vKipcclxuICogVGhlIFNlcnZpY2VzIE9iamVjdCwgaGFuZGxlcyB0aGUgc2VydmljZXMuXHJcbiAqL1xyXG5jbGFzcyBTZXJ2aWNlcyBcclxue1xyXG5cclxufVxuXG5jbGFzcyBVcmxcclxue1xyXG5cdCBzdGF0aWMgcHJvY2Vzc0FqYXhEYXRhKHNlbGVjdG9yLCBjb250ZW50LCB1cmxQYXRoKVxyXG5cdCB7XHJcblx0ICAgIGxldCBjb250ZXh0ID0gRE9NLmZpbmQoc2VsZWN0b3IpO1xyXG5cclxuXHQgICAgY29udGV4dC5pbm5lckhUTUwgPSBjb250ZW50O1xyXG5cdCAgICBsZXQgdGl0bGUgPSBET00uZmluZCgndGl0bGUnLCBjb250ZXh0KTtcclxuXHQgICAgZG9jdW1lbnQudGl0bGUgPSB0aXRsZS5pbm5lckhUTUw7XHJcblx0ICAgIHdpbmRvdy5oaXN0b3J5LnB1c2hTdGF0ZSh7XCJodG1sXCI6Y29udGVudCxcInBhZ2VUaXRsZVwiOiB0aXRsZS5pbm5lckhUTUx9LCBcIlwiLCB1cmxQYXRoKTtcclxuXHJcblx0IFx0d2luZG93Lm9ucG9wc3RhdGUgPSBmdW5jdGlvbihlKSB7XHJcblx0XHQgICAgaWYgKGUuc3RhdGUpIHtcclxuXHRcdCAgICAgICAgY29udGV4dC5pbm5lckhUTUwgPSBlLnN0YXRlLmh0bWw7XHJcblx0XHQgICAgICAgIGRvY3VtZW50LnRpdGxlID0gZS5zdGF0ZS5wYWdlVGl0bGU7XHJcblx0XHQgICAgfVxyXG5cdFx0fTtcclxuXHQgfVxyXG5cclxuXHQvKipcclxuXHQgKiBNb2RpZmllcyB0aGUgZ2V0IHBhcmFtZXRlciBpbiB0aGUgdXJsLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIHN0cmluZyB8IHVybFxyXG5cdCAqIEBwYXJhbSBzdHJpbmcgfCBrZXlcclxuXHQgKiBAcGFyYW0gbnVtYmVyIHwgdmFsdWVcclxuXHQgKiBAcGFyYW0gc3RyaW5nIHwgc2VwYXJhdG9yXHJcblx0ICogQHJldHVybiBzdHJpbmdcclxuXHQgKi9cclxuXHRzdGF0aWMgY2hhbmdlUXVlcnlQYXJhbWV0ZXJWYWx1ZSh1cmwsIGtleSwgdmFsdWUsIHNlcGFyYXRvciA9ICc9JykgXHJcblx0e1xyXG5cdFx0bGV0IHJlZ0V4cCA9IG5ldyBSZWdFeHAoXCIoWz8mXSlcIiArIGtleSArIHNlcGFyYXRvciArIFwiLio/KCZ8JClcIiwgXCJpXCIpO1xyXG5cdFx0bGV0IHBhaXJTZXBhcmF0b3IgPSB1cmwuaW5kZXhPZignPycpICE9PSAtMSA/IFwiJlwiIDogXCI/XCI7XHJcblx0XHQgIFxyXG5cdFx0aWYgKHVybC5tYXRjaChyZWdFeHApKSB7XHJcblx0XHRcdHJldHVybiB1cmwucmVwbGFjZShyZWdFeHAsICckMScgKyBrZXkgKyBzZXBhcmF0b3IgKyB2YWx1ZSArICckMicpO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdCAgICByZXR1cm4gdXJsICsgcGFpclNlcGFyYXRvciArIGtleSArIHNlcGFyYXRvciArIHZhbHVlO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQ2hhbmdlcyB0aGUgdXJsIHRvIGEgZ2l2ZW4gcGFnZSBudW1iZXIuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gc3RyaW5nIHwgcGFyYW1ldGVyS2V5XHJcblx0ICogQHBhcmFtIHN0cmluZyB8IHBhcmFtZXRlclZhbHVlXHJcblx0ICogQHBhcmFtIHN0cmluZyB8IHNlcGFyYXRvclxyXG5cdCAqIEByZXR1cm4gdm9pZFxyXG5cdCAqL1xyXG5cdHN0YXRpYyBjaGFuZ2UocGFyYW1ldGVyS2V5LCBwYXJhbWV0ZXJWYWx1ZSwgc2VwYXJhdG9yID0gJz0nKVxyXG5cdHtcclxuXHRcdHBhcmFtZXRlclZhbHVlID0gIHBhcmFtZXRlclZhbHVlIHx8IHRoaXMucXVlcnlTdHJpbmcoKVtwYXJhbWV0ZXJLZXldO1xyXG5cdFx0bGV0IHJlcXVlc3RlZFVybCA9IHRoaXMuY2hhbmdlUXVlcnlQYXJhbWV0ZXJWYWx1ZSh3aW5kb3cubG9jYXRpb24uaHJlZiwgcGFyYW1ldGVyS2V5LCBwYXJhbWV0ZXJWYWx1ZSwgc2VwYXJhdG9yKTtcclxuXHRcdHdpbmRvdy5oaXN0b3J5LnJlcGxhY2VTdGF0ZSgnJywgJycsIHJlcXVlc3RlZFVybCk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBHZXQgdGhlIGdldCB2YXJpYWJsZXMgZnJvbSB0aGUgdXJsLlxyXG5cdCAqXHJcblx0ICogQHJldHVybiBhcnJheVxyXG5cdCAqL1xyXG5cdHN0YXRpYyBxdWVyeVN0cmluZygpIFxyXG5cdHtcclxuXHRcdGxldCB2YXJzID0ge307XHJcblx0XHRsZXQgcGFydHMgPSB3aW5kb3cubG9jYXRpb24uaHJlZi5yZXBsYWNlKC9bPyZdKyhbXj0mXSspPShbXiZdKikvZ2ksIGZ1bmN0aW9uKG0sIGtleSwgdmFsdWUpIHtcclxuXHRcdFx0dmFyc1trZXldID0gdmFsdWU7XHJcblx0XHR9KTtcclxuXHJcblx0XHRyZXR1cm4gdmFycztcclxuXHR9XHJcblxyXG5cclxufVxuXG5sZXQgZGVmYXVsdE1lc3NhZ2UkNCA9ICdTb3JyeSwgbm8gbW9yZSBwYWdlcy4nO1xyXG5cclxuY2xhc3MgTm90SW5QYWdlUmFuZ2VFeGNlcHRpb24gZXh0ZW5kcyBFeGNlcHRpb25IYW5kbGVyXHJcbntcclxuXHRjb25zdHJ1Y3RvcihtZXNzYWdlID0gbnVsbCkgXHJcblx0e1xyXG5cdFx0bWVzc2FnZSA9IG1lc3NhZ2UgfHwgZGVmYXVsdE1lc3NhZ2UkNDtcclxuXHRcdHN1cGVyKCk7XHJcbiAgICBcdHN1cGVyLnN0YWNrVHJhY2UodGhpcywgbWVzc2FnZSk7XHJcbiAgICB9XHJcbn1cblxuLyoqXHJcbiAqIEBmaWxlIFxyXG4gKiBQYWdpbmF0aW9uIGNsYXNzLlxyXG4gKlxyXG4gKiBUaGUgUGFnaW5hdGlvbiBjb21wb25lbnQsIGhhbmRsZXMgdGhlIHBhZ2luYXRpb24uXHJcbiAqL1xyXG5cclxuLyoqXHJcbiAqIFRoZSBkZWZhdWx0IHNldHRpbmdzIG9mIHRoZSBwYWdpbmF0aW9uLlxyXG4gKlxyXG4gKiBAdmFyIG9iamVjdFxyXG4gKi9cclxubGV0IGRlZmF1bHRTZXR0aW5ncyQ1ID0ge1xyXG5cdGVsZW1lbnQ6ICcucGFnaW5hdGlvbi1saW5rcycsXHJcblx0cHJvY2Vzc2luZzogJ2NsaWVudC1zaWRlJyxcclxuXHRjbGFzczogJycsXHJcblx0cGVyX3BhZ2U6IDUsXHJcblx0dG90YWxfaXRlbXM6IDUsXHJcblx0dXJsX3BhcmFtZXRlcjogJ3BhZ2UnLFxyXG5cdHNlcGFyYXRvcjogJyMnIFxyXG59O1xyXG5cclxuLyoqXHJcbiAqIFN0b3JlcyB0aGUgY29udGFpbmVyIG9iamVjdC5cclxuICpcclxuICogQHZhciBcXENvcmVcXENvbnRhaW5lclxyXG4gKi9cclxubGV0IENvbnRhaW5lciQ0O1xyXG5cclxuLyoqXHJcbiAqIFN0b3JlcyB0aGUgcHJvZHVjdHMgY29tcG9uZW50LlxyXG4gKlxyXG4gKiBAdmFyIFxcQ29tcG9uZW50c1xcUHJvZHVjdHNcclxuICovXHJcbmxldCBQcm9kdWN0cyQyO1xyXG5cclxuLyoqXHJcbiAqIFN0b3JlcyB0aGUgY29udGFpbmVyIG9iamVjdC5cclxuICogXHJcbiAqIEB2YXIgXFxDb3JlXFxFdmVudE1hbmFnZXJcclxuICovXHJcbmxldCBFdmVudE1hbmFnZXIkNTtcclxuXHJcbmNsYXNzIFBhZ2luYXRpb24gXHJcbntcclxuXHQvKipcclxuXHQgKiAtIEluaXRpYWxpemUgdGhlIGNvbnRhaW5lciBvYmplY3QuXHJcblx0ICogLSBJbml0aWFsaXplIHRoZSBwcm9kdWN0cyBjb21wb25lbnQuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gXFxDb3JlXFxDb250YWluZXIgfCBjb250YWluZXJcclxuXHQgKiBAcGFyYW0gXFxDb21wb25lbnRzXFxQcm9kdWN0cyB8IHByb2R1Y3RzXHJcblx0ICogQHBhcmFtIFxcQ29tcG9uZW50c1xcU2VydmljZXMgfCBzZXJ2aWNlc1xyXG5cdCAqIEByZXR1cm4gdm9pZFxyXG5cdCAqL1xyXG5cdGNvbnN0cnVjdG9yKGNvbnRhaW5lciwgZXZlbnRzLCBwcm9kdWN0cyA9IG51bGwsIHNlcnZpY2VzID0gbnVsbCkgXHJcblx0e1xyXG5cdFx0Q29udGFpbmVyJDQgPSBjb250YWluZXI7XHJcblx0XHRQcm9kdWN0cyQyID0gcHJvZHVjdHM7XHJcblx0XHRFdmVudE1hbmFnZXIkNSA9IGV2ZW50cztcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFNldHVwIHRoZSBwYWdpbmF0aW9uLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIG9iamVjdCB8IHNldHRpbmdzXHJcblx0ICogQHJldHVybiB2b2lkXHJcblx0ICovXHJcblx0c2V0dXAoc2V0dGluZ3MpXHJcblx0e1x0XHJcblx0XHRpZih0eXBlb2Ygc2V0dGluZ3MgIT0gJ29iamVjdCcpIHtcclxuXHRcdFx0dGhyb3cgbmV3IEludmFsaWRBcmd1bWVudEV4Y2VwdGlvbiQxO1xyXG5cdFx0fVxyXG5cclxuXHRcdHRoaXMuc2V0dGluZ3MgPSBDb21tb24uZXh0ZW5kKGRlZmF1bHRTZXR0aW5ncyQ1LCBzZXR0aW5ncyk7XHJcblx0XHR0aGlzLnNldEN1cnJlbnQoMSk7XHJcblxyXG5cdFx0ZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsIGZ1bmN0aW9uKCkge1x0XHRcclxuXHRcdFx0dGhpcy5zZXRFbGVtZW50KHRoaXMuc2V0dGluZ3MuZWxlbWVudCk7XHJcblxyXG5cdFx0XHQvLyBBcyBhIGZhbGxiYWNrIGNob29zZSB0aGUgdXNlcidzIHNldHRpbmdzIGZvciB0aGUgdG90YWwgaXRlbXMgY291bnQuXHJcblx0XHRcdHRoaXMudG90YWxQYWdlcyA9IHRoaXMuY2FsY3VsYXRlVG90YWxQYWdlcyh0aGlzLnNldHRpbmdzLnBlcl9wYWdlLCB0aGlzLnNldHRpbmdzLnRvdGFsX2l0ZW1zKTtcclxuXHRcdFx0dGhpcy5idWlsZFBhZ2luYXRpb24oKTtcclxuXHRcdH0uYmluZCh0aGlzKSk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBCdWlsZHMgdGhlIHBhZ2luYXRpb24uXHJcblx0ICpcclxuXHQgKiBAcmV0dXJuIHZvaWRcclxuXHQgKi9cclxuXHRidWlsZFBhZ2luYXRpb24oKVxyXG5cdHtcclxuXHRcdHRoaXMubGlua3MgPSB0aGlzLmNyZWF0ZUxpbmtzKCk7XHJcblx0XHR0aGlzLnJlcGxhY2VMaW5rcyh0aGlzLmxpbmtzKTtcclxuXHRcdHRoaXMuYmluZEV2ZW50TGlzdGVuZXJzKHRoaXMubGlua3MpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogU2V0cyB0aGUgZWxlbWVudC5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSBzdHJpbmcgfCBzZWxlY3RvclxyXG5cdCAqIEByZXR1cm4gdm9pZFxyXG5cdCAqL1xyXG5cdHNldEVsZW1lbnQoc2VsZWN0b3IpXHJcblx0e1xyXG5cdFx0dGhpcy5lbGVtZW50ID0gRE9NLmZpbmQoc2VsZWN0b3IpO1xyXG5cdFx0XHJcblx0XHRET00uYWRkQ2xhc3ModGhpcy5lbGVtZW50LCB0aGlzLnNldHRpbmdzLmNsYXNzKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFJlcGxhY2VzIHRoZSBsaW5rcyBpbiB0aGUgZWxlbWVudC5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSBIVE1MVUxpc3RFbGVtZW50IHwgbGlua3NcclxuXHQgKiBAcmV0dXJuIHZvaWRcclxuXHQgKi9cclxuXHRyZXBsYWNlTGlua3MobGlua3MpXHJcblx0e1xyXG5cdFx0dGhpcy5lbGVtZW50LmlubmVySFRNTCA9ICcnO1xyXG5cdFx0dGhpcy5lbGVtZW50LmFwcGVuZENoaWxkKGxpbmtzKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIENhbGN1bGF0ZXMgdGhlIHRvdGFsIHBhZ2VzLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIG51bWJlciB8IHBlclBhZ2VcclxuXHQgKiBAcGFyYW0gbnVtYmVyIHwgdG90YWxJdGVtc1xyXG5cdCAqIEByZXR1cm4gbnVtYmVyXHJcblx0ICovXHJcblx0Y2FsY3VsYXRlVG90YWxQYWdlcyhwZXJQYWdlLCB0b3RhbEl0ZW1zKVxyXG5cdHtcclxuXHRcdHBlclBhZ2UgPSBwYXJzZUludChwZXJQYWdlKTtcclxuXHRcdHRvdGFsSXRlbXMgPSBwYXJzZUludCh0b3RhbEl0ZW1zKTtcclxuXHJcblx0XHRyZXR1cm4gTWF0aC5jZWlsKHRvdGFsSXRlbXMgLyBwZXJQYWdlKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEJpbmRzIHRoZSBidXR0b25zIGV2ZW50cyBsaXN0ZW5lcnMuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gSFRNTFVMaXN0RWxlbWVudCB8IGxpbmtzXHJcblx0ICogQHJldHVybiB2b2lkXHJcblx0ICovXHJcblx0YmluZEV2ZW50TGlzdGVuZXJzKGxpbmtzKSBcclxuXHR7XHJcblx0XHRsZXQgaW5zdGFuY2UgPSB0aGlzO1xyXG5cclxuXHRcdHRoaXMubmV4dC5jaGlsZE5vZGVzWzBdLm9uY2xpY2sgPSBmdW5jdGlvbihlKSB7XHJcblx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcclxuXHJcblx0XHRcdGxldCByZXF1ZXN0ZWRQYWdlID0gaW5zdGFuY2UuY3VycmVudCsxO1xyXG5cclxuXHRcdFx0aWYgKGluc3RhbmNlLm5vdEluUGFnZVJhbmdlKHJlcXVlc3RlZFBhZ2UpKSB7XHJcblx0XHRcdFx0dGhyb3cgbmV3IE5vdEluUGFnZVJhbmdlRXhjZXB0aW9uKCdUaGUgcGFnZSB5b3UgcmVxdWVzdGluZyBkb2VzIG5vdCBleGlzdHMnKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0aWYgKFByb2R1Y3RzJDIgJiYgUHJvZHVjdHMkMi5ib290ZWQpIHtcclxuXHRcdFx0XHRQcm9kdWN0cyQyLmxvYWRQcm9kdWN0cyhyZXF1ZXN0ZWRQYWdlKS50aGVuKGZ1bmN0aW9uKHByb2R1Y3RzKSB7XHJcblx0XHRcdFx0XHRpbnN0YW5jZS5zZXRDdXJyZW50KHJlcXVlc3RlZFBhZ2UpO1xyXG5cdFx0XHRcdH0pO1xyXG5cdFx0XHR9XHJcblx0XHR9O1xyXG5cclxuXHRcdHRoaXMucHJldmlvdXMuY2hpbGROb2Rlc1swXS5vbmNsaWNrID0gZnVuY3Rpb24oZSkge1xyXG5cdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG5cdFx0XHRsZXQgcmVxdWVzdGVkUGFnZSA9IGluc3RhbmNlLmN1cnJlbnQtMTtcclxuXHJcblx0XHRcdGlmKGluc3RhbmNlLm5vdEluUGFnZVJhbmdlKHJlcXVlc3RlZFBhZ2UpKSB7XHJcblx0XHRcdFx0dGhyb3cgbmV3IE5vdEluUGFnZVJhbmdlRXhjZXB0aW9uKCdUaGUgcGFnZSB5b3UgcmVxdWVzdGluZyBkb2VzIG5vdCBleGlzdHMnKTtcclxuXHRcdFx0fVxyXG5cdFx0XHRcclxuXHRcdFx0aWYgKFByb2R1Y3RzJDIgJiYgUHJvZHVjdHMkMi5ib290ZWQpIHtcclxuXHRcdFx0XHRQcm9kdWN0cyQyLmxvYWRQcm9kdWN0cyhyZXF1ZXN0ZWRQYWdlKS50aGVuKGZ1bmN0aW9uKHByb2R1Y3RzKSB7XHJcblx0XHRcdFx0XHRpbnN0YW5jZS5zZXRDdXJyZW50KHJlcXVlc3RlZFBhZ2UpO1xyXG5cdFx0XHRcdH0pO1xyXG5cdFx0XHR9XHJcblx0XHR9O1xyXG5cclxuXHRcdGZvcih2YXIgaSA9IDA7IGkgPCB0aGlzLnBhZ2VzLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdHRoaXMucGFnZXNbaV0uY2hpbGROb2Rlc1swXS5vbmNsaWNrID0gZnVuY3Rpb24oZSkge1xyXG5cdFx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcclxuXHRcdFx0XHRcclxuXHRcdFx0XHRsZXQgcmVxdWVzdGVkUGFnZSA9IHRoaXMuZ2V0QXR0cmlidXRlKCdkYXRhLXBhZ2UtbnInKTtcclxuXHRcdFx0XHRcclxuXHRcdFx0XHRpZiAoUHJvZHVjdHMkMiAmJiBQcm9kdWN0cyQyLmJvb3RlZCkge1xyXG5cdFx0XHRcdFx0UHJvZHVjdHMkMi5sb2FkUHJvZHVjdHMocmVxdWVzdGVkUGFnZSkudGhlbihmdW5jdGlvbihwcm9kdWN0cykge1xyXG5cdFx0XHRcdFx0XHRpbnN0YW5jZS5zZXRDdXJyZW50KHJlcXVlc3RlZFBhZ2UpO1xyXG5cdFx0XHRcdFx0fSk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9O1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogU2V0cyB0aGUgY3VycmVudCBwYWdlLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIG51bWJlciB8IHBhZ2VOdW1iZXJcclxuXHQgKiBAcmV0dXJuIHZvaWRcclxuXHQgKi9cclxuXHRzZXRDdXJyZW50KHBhZ2VOdW1iZXIpIFxyXG5cdHtcclxuXHRcdHRoaXMuY3VycmVudCA9IHBhcnNlSW50KHBhZ2VOdW1iZXIpO1xyXG5cdFx0dGhpcy5jaGFuZ2VVcmwocGFnZU51bWJlcik7XHJcblx0XHR0aGlzLnNldEFjdGl2ZUxpbmsocGFnZU51bWJlcik7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBHZXRzIHRoZSBjdXJyZW50IHBhZ2UuXHJcblx0ICpcclxuXHQgKiBAcmV0dXJuIG51bWJlclxyXG5cdCAqL1xyXG5cdGdldEN1cnJlbnQoKSBcclxuXHR7XHJcblx0XHRyZXR1cm4gdGhpcy5jdXJyZW50O1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQ3JlYXRlcyB0aGUgcGFnaW5hdGlvbiBsaW5rcy5cclxuXHQgKlxyXG5cdCAqIEByZXR1cm4gSFRNTFVMaXN0RWxlbWVudFxyXG5cdCAqL1xyXG5cdGNyZWF0ZUxpbmtzKCkgXHJcblx0e1xyXG5cdFx0bGV0IHVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndWwnKTtcclxuXHRcdFxyXG5cdFx0dGhpcy5wYWdlcyA9IHRoaXMuY3JlYXRlUGFnZUxpbmtzKCk7XHJcblx0XHR0aGlzLnByZXZpb3VzID0gdGhpcy5jcmVhdGVQcmV2aW91c0J1dHRvbigpO1xyXG5cdFx0dGhpcy5uZXh0ID0gdGhpcy5jcmVhdGVOZXh0QnV0dG9uKCk7XHJcblxyXG5cdFx0dWwuY2xhc3NOYW1lID0gJ3BhZ2luYXRpb24nO1xyXG5cdFx0dWwuYXBwZW5kQ2hpbGQodGhpcy5wcmV2aW91cyk7XHJcblxyXG5cdFx0dGhpcy5wYWdlcy5mb3JFYWNoKGZ1bmN0aW9uKHBhZ2UpIHtcclxuXHRcdFx0dWwuYXBwZW5kQ2hpbGQocGFnZSk7XHJcblx0XHR9KTtcclxuXHJcblx0XHR1bC5hcHBlbmRDaGlsZCh0aGlzLm5leHQpO1xyXG5cclxuXHRcdHJldHVybiB1bDtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIENyZWF0ZXMgdGhlIHBhZ2VzIGl0ZW0gbGlua3MuXHJcblx0ICpcclxuXHQgKiBAcmV0dXJuIGFycmF5PEhUTUxMSUVsZW1lbnQ+XHJcblx0ICovXHJcblx0Y3JlYXRlUGFnZUxpbmtzKCkgXHJcblx0e1xyXG5cdFx0dmFyIHBhZ2VzID0gW107XHJcblxyXG5cdFx0Zm9yKHZhciBpID0gMTsgaSA8PSB0aGlzLnRvdGFsUGFnZXM7IGkrKykge1xyXG5cdFx0XHR2YXIgcGFnZUl0ZW0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaScpO1xyXG5cdFx0XHR2YXIgbGluayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKTtcclxuXHRcdFx0cGFnZUl0ZW0uY2xhc3NOYW1lID0gKHRoaXMuY3VycmVudCA9PSBpKSA/ICdwYWdlLWl0ZW0gYWN0aXZlJyA6ICdwYWdlLWl0ZW0nO1xyXG5cdFx0XHRsaW5rLmNsYXNzTmFtZSA9ICdwYWdlLWxpbmsnO1xyXG5cdFx0XHRsaW5rLnNldEF0dHJpYnV0ZSgnaHJlZicsICc/cGFnZT0nKyBpKTtcclxuXHRcdFx0bGluay5zZXRBdHRyaWJ1dGUoJ2RhdGEtcGFnZS1ucicsIGkpO1xyXG5cdFx0XHRsaW5rLmlubmVySFRNTCA9IGk7XHJcblx0XHRcdHBhZ2VJdGVtLmFwcGVuZENoaWxkKGxpbmspO1xyXG5cdFx0XHRwYWdlcy5wdXNoKHBhZ2VJdGVtKTtcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gcGFnZXM7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBDcmVhdGVzIHRoZSBwcmV2aW91cyBidXR0b24gbGluay5cclxuXHQgKlxyXG5cdCAqIEByZXR1cm4gSFRNTExJRWxlbWVudFxyXG5cdCAqL1xyXG5cdGNyZWF0ZVByZXZpb3VzQnV0dG9uKCkgXHJcblx0e1xyXG5cdFx0dmFyIGxpID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKTtcclxuXHRcdHZhciBsaW5rID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpO1xyXG5cdFx0dmFyIHNwYW4xID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xyXG5cdFx0dmFyIHNwYW4yID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xyXG5cdFx0XHJcblx0XHRcclxuXHRcdGxpLmNsYXNzTmFtZSA9ICdwYWdlLWl0ZW0nO1xyXG5cdFx0bGluay5jbGFzc05hbWUgPSAncGFnZS1saW5rJztcclxuXHRcdHNwYW4yLmNsYXNzTmFtZSA9ICdzci1vbmx5JztcclxuXHJcblx0XHRsaW5rLnNldEF0dHJpYnV0ZSgnaHJlZicsICcnKTtcclxuXHRcdGxpbmsuc2V0QXR0cmlidXRlKCdhcmlhLWxhYmVsJywgJ1ByZXZpb3VzJyk7XHJcblx0XHRzcGFuMS5zZXRBdHRyaWJ1dGUoJ2FyaWEtaGlkZGVuJywgJ3RydWUnKTtcclxuXHJcblx0XHRzcGFuMS5pbm5lckhUTUwgPSAnJmxhcXVvOyc7XHJcblx0XHRzcGFuMi5pbm5lckhUTUwgPSAnUHJldmlvdXMnO1xyXG5cclxuXHRcdGxpbmsuYXBwZW5kQ2hpbGQoc3BhbjEpO1xyXG5cdFx0bGluay5hcHBlbmRDaGlsZChzcGFuMik7XHJcblx0XHRsaS5hcHBlbmRDaGlsZChsaW5rKTtcclxuXHJcblx0XHRyZXR1cm4gbGk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBDcmVhdGVzIHRoZSBuZXh0IGJ1dHRvbiBsaW5rLlxyXG5cdCAqXHJcblx0ICogQHJldHVybiBIVE1MTElFbGVtZW50XHJcblx0ICovXHJcblx0Y3JlYXRlTmV4dEJ1dHRvbigpIFxyXG5cdHtcclxuXHRcdHZhciBsaSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJyk7XHJcblx0XHR2YXIgbGluayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKTtcclxuXHRcdHZhciBzcGFuMSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcclxuXHRcdHZhciBzcGFuMiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcclxuXHRcdFxyXG5cdFx0bGkuY2xhc3NOYW1lID0gJ3BhZ2UtaXRlbSc7XHJcblx0XHRsaW5rLmNsYXNzTmFtZSA9ICdwYWdlLWxpbmsnO1xyXG5cdFx0c3BhbjIuY2xhc3NOYW1lID0gJ3NyLW9ubHknO1xyXG5cclxuXHRcdGxpbmsuc2V0QXR0cmlidXRlKCdocmVmJywgJycpO1xyXG5cdFx0bGluay5zZXRBdHRyaWJ1dGUoJ2FyaWEtbGFiZWwnLCAnTmV4dCcpO1xyXG5cdFx0c3BhbjEuc2V0QXR0cmlidXRlKCdhcmlhLWhpZGRlbicsICd0cnVlJyk7XHJcblxyXG5cdFx0c3BhbjEuaW5uZXJIVE1MID0gJyZyYXF1bzsnO1xyXG5cdFx0c3BhbjIuaW5uZXJIVE1MID0gJ05leHQnO1xyXG5cclxuXHRcdGxpbmsuYXBwZW5kQ2hpbGQoc3BhbjEpO1xyXG5cdFx0bGluay5hcHBlbmRDaGlsZChzcGFuMik7XHJcblx0XHRsaS5hcHBlbmRDaGlsZChsaW5rKTtcclxuXHJcblx0XHRyZXR1cm4gbGk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBDaGVja3MgaWYgdGhlIGdpdmVuIHBhZ2UgaXMgaW4gcmFuZ2UuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gbnVtYmVyIHwgcGFnZU51bWJlclxyXG5cdCAqIEByZXR1cm4gYm9vbFxyXG5cdCAqL1xyXG5cdG5vdEluUGFnZVJhbmdlKHBhZ2VOdW1iZXIpIFxyXG5cdHtcclxuXHRcdHJldHVybiAocGFnZU51bWJlciA+IHRoaXMudG90YWxQYWdlcyB8fCBwYWdlTnVtYmVyIDw9IDApIHx8IGlzTmFOKHBhZ2VOdW1iZXIpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQ2hhbmdlcyB0aGUgdXJsIHRvIGEgZ2l2ZW4gcGFnZSBudW1iZXIuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gbnVtYmVyIHwgcGFnZU51bWJlclxyXG5cdCAqIEByZXR1cm4gdm9pZFxyXG5cdCAqL1xyXG5cdGNoYW5nZVVybChwYWdlTnVtYmVyKSBcclxuXHR7XHJcblx0XHRVcmwuY2hhbmdlKHRoaXMuc2V0dGluZ3MudXJsX3BhcmFtZXRlciwgcGFnZU51bWJlciwgdGhpcy5zZXR0aW5ncy5zZXBhcmF0b3IpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogU2V0cyB0aGUgYWN0aXZlIGxpbmsuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gbnVtYmVyIHwgcGFnZU51bWJlclxyXG5cdCAqIEByZXR1cm4gdm9pZFxyXG5cdCAqL1xyXG5cdHNldEFjdGl2ZUxpbmsocGFnZU51bWJlcilcclxuXHR7XHJcblx0XHRmb3IodmFyIHBhZ2UgaW4gdGhpcy5wYWdlcykge1xyXG5cdFx0XHRpZiAodGhpcy5wYWdlc1twYWdlXS5jaGlsZE5vZGVzWzBdLmdldEF0dHJpYnV0ZSgnZGF0YS1wYWdlLW5yJykgPT0gcGFnZU51bWJlcikge1xyXG5cdFx0XHRcdERPTS5hZGRDbGFzcyh0aGlzLnBhZ2VzW3BhZ2VdLCAnYWN0aXZlJyk7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0RE9NLnJlbW92ZUNsYXNzKHRoaXMucGFnZXNbcGFnZV0sICdhY3RpdmUnKTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogUmVzZXRzIHRoZSBwYWdpbmF0aW9uLlxyXG5cdCAqXHJcblx0ICogQHJldHVybiB2b2lkXHJcblx0ICovXHJcblx0cmVzZXQoKSBcclxuXHR7XHJcblx0XHR0aGlzLnNldEN1cnJlbnQoMSk7XHJcblx0XHR0aGlzLmNoYW5nZVVybCgxKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEhpZGVzIHRoZSBjb21wb25lbnQgZnJvbSB0aGUgRE9NLlxyXG5cdCAqXHJcblx0ICogQHJldHVybiB2b2lkIFxyXG5cdCAqL1xyXG5cdGhpZGUoKVxyXG5cdHtcclxuXHRcdHRoaXMuZWxlbWVudC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xyXG5cdH1cclxufVxuXG5sZXQgZGVmYXVsdE1lc3NhZ2UkNSA9ICdJbiBvcmRlciB0byB1c2UgY29tcG9uZW50cyB5b3UgbXVzdCByZWdpc3RlciB0aGVtIHdpdGggdGhlIHNob3AhJzsgXHJcblxyXG5jbGFzcyBDb21wb25lbnROb3RSZWdpc3RlcmVkRXhjZXB0aW9uIGV4dGVuZHMgRXhjZXB0aW9uSGFuZGxlclxyXG57XHJcblx0Y29uc3RydWN0b3IobWVzc2FnZSA9IG51bGwpIFxyXG5cdHtcclxuXHRcdG1lc3NhZ2UgPSBtZXNzYWdlIHx8IGRlZmF1bHRNZXNzYWdlJDU7XHJcblx0XHRzdXBlcihtZXNzYWdlKTtcclxuICAgIFx0c3VwZXIuc3RhY2tUcmFjZSh0aGlzLCBtZXNzYWdlKTtcclxuICAgIH1cclxufVxuXG4vLyBDb21wb25lbnRzXHJcbi8vIEhlbHBlcnNcclxuLy8gRXhjZXB0aW9uc1xyXG5jbGFzcyBDb21wb25lbnRzUHJvdmlkZXJcclxue1xyXG5cdC8qKlxyXG5cdCAqIC0gU2V0IHRoZSBjb250YWluZXIgYXMgYSBtZW1iZXIuXHJcblx0ICogLSBkZWNsYXJlIHRoZSBjb21wb25lbnRzLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIFxcQ29yZVxcQ29udGFpbmVyIHwgY29udGFpbmVyXHJcblx0ICogQHJldHVybiB2b2lkXHJcblx0ICovXHJcblx0Y29uc3RydWN0b3IoY29udGFpbmVyKVxyXG5cdHtcclxuXHRcdHRoaXMuY29udGFpbmVyID0gY29udGFpbmVyO1xyXG5cclxuXHRcdHRoaXMuY29tcG9uZW50cyA9IHt9O1xyXG5cdFx0dGhpcy5jb21wb25lbnRzLkZpbHRlciA9IHt9O1xyXG5cdFx0dGhpcy5jb21wb25lbnRzLlNlcnZpY2VzID0ge307XHJcblx0XHR0aGlzLmNvbXBvbmVudHMuUHJvZHVjdHMgPSB7fTtcclxuXHRcdHRoaXMuY29tcG9uZW50cy5QYWdpbmF0aW9uID0ge307XHJcblx0XHR0aGlzLmNvbXBvbmVudHMuQ2FydCA9IHt9O1xyXG5cdFx0dGhpcy5jb21wb25lbnRzLkNoZWNrb3V0ID0ge307XHJcblx0fVxyXG5cclxuICAgLyoqXHJcblx0KiBSZWdpc3RlcnMgdGhlIGNvbXBvbmVudHMuXHJcblx0KlxyXG5cdCogQHBhcmFtIG9iamVjdCB8IGNvbXBvbmVudHNcclxuXHQqIEByZXR1cm4gdm9pZFxyXG5cdCovXHJcblx0cmVnaXN0ZXIoY29tcG9uZW50cylcclxuXHR7XHJcblx0XHR0aGlzLmF2YWlsYWJsZSA9IGNvbXBvbmVudHM7XHJcblx0XHR0aGlzLmJvb3RlZCA9IFtdO1xyXG5cdCBcdHRoaXMuY29tcG9uZW50cy5GaWx0ZXIuYm9vdGVkID0gZmFsc2U7XHJcblx0XHR0aGlzLmNvbXBvbmVudHMuU2VydmljZXMuYm9vdGVkID0gZmFsc2U7XHJcblx0XHR0aGlzLmNvbXBvbmVudHMuUHJvZHVjdHMuYm9vdGVkID0gZmFsc2U7XHJcblx0XHR0aGlzLmNvbXBvbmVudHMuUGFnaW5hdGlvbi5ib290ZWQgPSBmYWxzZTtcclxuXHRcdHRoaXMuY29tcG9uZW50cy5DYXJ0LmJvb3RlZCA9IGZhbHNlO1xyXG5cdFx0dGhpcy5jb21wb25lbnRzLkNoZWNrb3V0LmJvb3RlZCA9IGZhbHNlO1xyXG5cclxuXHRcdGxldCBpbnN0YW5jZSA9IHRoaXM7XHJcblxyXG5cdFx0dGhpcy5jb250YWluZXIuYmluZCgnRmlsdGVyJywgZnVuY3Rpb24oY29udGFpbmVyLCBjb21wb25lbnQpIHtcclxuXHRcdFx0aW5zdGFuY2UuY29tcG9uZW50c1tjb21wb25lbnRdID0gbmV3IEZpbHRlcihjb250YWluZXIpO1xyXG5cdFx0XHRpbnN0YW5jZS5jb21wb25lbnRzW2NvbXBvbmVudF0uYm9vdGVkID0gdHJ1ZTtcclxuXHRcdFx0aW5zdGFuY2UuYm9vdGVkLnB1c2goaW5zdGFuY2UuY29tcG9uZW50c1tjb21wb25lbnRdKTtcclxuXHRcdFx0cmV0dXJuIGluc3RhbmNlLmNvbXBvbmVudHNbY29tcG9uZW50XTtcclxuXHRcdH0sICdjb21wb25lbnRzJyk7XHJcblx0XHRcclxuXHRcdHRoaXMuY29udGFpbmVyLmJpbmQoJ1NlcnZpY2VzJywgZnVuY3Rpb24oY29udGFpbmVyLCBjb21wb25lbnQpIHsgXHJcblx0XHRcdGluc3RhbmNlLmNvbXBvbmVudHNbY29tcG9uZW50XSA9IG5ldyBTZXJ2aWNlcyhjb250YWluZXIpO1xyXG5cdFx0XHRpbnN0YW5jZS5jb21wb25lbnRzW2NvbXBvbmVudF0uYm9vdGVkID0gdHJ1ZTtcclxuXHRcdFx0aW5zdGFuY2UuYm9vdGVkLnB1c2goaW5zdGFuY2UuY29tcG9uZW50c1tjb21wb25lbnRdKTtcclxuXHRcdFx0cmV0dXJuIGluc3RhbmNlLmNvbXBvbmVudHNbY29tcG9uZW50XTtcclxuXHRcdH0sICdjb21wb25lbnRzJyk7XHJcblxyXG5cdFx0dGhpcy5jb250YWluZXIuYmluZCgnUHJvZHVjdHMnLCBmdW5jdGlvbihjb250YWluZXIsIGNvbXBvbmVudCkge1xyXG5cdFx0XHRpbnN0YW5jZS5jb21wb25lbnRzW2NvbXBvbmVudF0gPSBuZXcgUHJvZHVjdHMoY29udGFpbmVyLCBjb250YWluZXIuUmVxdWVzdCwgY29udGFpbmVyLkV2ZW50cyk7XHJcblx0XHRcdGluc3RhbmNlLmNvbXBvbmVudHNbY29tcG9uZW50XS5ib290ZWQgPSB0cnVlO1xyXG5cdFx0XHRpbnN0YW5jZS5ib290ZWQucHVzaChpbnN0YW5jZS5jb21wb25lbnRzW2NvbXBvbmVudF0pO1xyXG5cdFx0XHRyZXR1cm4gaW5zdGFuY2UuY29tcG9uZW50c1tjb21wb25lbnRdO1xyXG5cdFx0fSwgJ2NvbXBvbmVudHMnKTtcclxuXHJcblx0XHR0aGlzLmNvbnRhaW5lci5iaW5kKCdQYWdpbmF0aW9uJywgZnVuY3Rpb24oY29udGFpbmVyLCBjb21wb25lbnQpIHtcclxuXHRcdFx0bGV0IHByb2R1Y3RzID0gKGluc3RhbmNlLmV4aXN0cygnUHJvZHVjdHMnKSkgPyAoaW5zdGFuY2UuY29tcG9uZW50c1snUHJvZHVjdHMnXSkgOiBudWxsOyBcclxuXHRcdFx0bGV0IHNlcnZpY2VzID0gKGluc3RhbmNlLmV4aXN0cygnU2VydmljZXMnKSkgPyAoaW5zdGFuY2UuY29tcG9uZW50c1snU2VydmljZXMnXSkgOiBudWxsOyBcclxuXHRcdFx0aW5zdGFuY2UuY29tcG9uZW50c1tjb21wb25lbnRdID0gbmV3IFBhZ2luYXRpb24oY29udGFpbmVyLCBjb250YWluZXIuRXZlbnRzLCBwcm9kdWN0cywgc2VydmljZXMpO1xyXG5cdFx0XHRpbnN0YW5jZS5jb21wb25lbnRzW2NvbXBvbmVudF0uYm9vdGVkID0gdHJ1ZTtcclxuXHRcdFx0aW5zdGFuY2UuYm9vdGVkLnB1c2goaW5zdGFuY2UuY29tcG9uZW50c1tjb21wb25lbnRdKTtcclxuXHRcdFx0cmV0dXJuIGluc3RhbmNlLmNvbXBvbmVudHNbY29tcG9uZW50XTtcclxuXHRcdH0sICdjb21wb25lbnRzJyk7XHJcblxyXG5cdFx0dGhpcy5jb250YWluZXIuYmluZCgnQ2FydCcsIGZ1bmN0aW9uKGNvbnRhaW5lciwgY29tcG9uZW50KSB7XHJcblx0XHRcdGluc3RhbmNlLmNvbXBvbmVudHNbY29tcG9uZW50XSA9IG5ldyBDYXJ0KGNvbnRhaW5lciwgY29udGFpbmVyLlJlcXVlc3QsIGNvbnRhaW5lci5FdmVudHMpO1xyXG5cdFx0XHRpbnN0YW5jZS5jb21wb25lbnRzW2NvbXBvbmVudF0uYm9vdGVkID0gdHJ1ZTtcclxuXHRcdFx0aW5zdGFuY2UuYm9vdGVkLnB1c2goaW5zdGFuY2UuY29tcG9uZW50c1tjb21wb25lbnRdKTtcclxuXHRcdFx0cmV0dXJuIGluc3RhbmNlLmNvbXBvbmVudHNbY29tcG9uZW50XTtcclxuXHRcdH0sICdjb21wb25lbnRzJyk7XHJcblxyXG5cdFx0dGhpcy5jb250YWluZXIuYmluZCgnQ2hlY2tvdXQnLCBmdW5jdGlvbihjb250YWluZXIsIGNvbXBvbmVudCkge1xyXG5cdFx0XHRpbnN0YW5jZS5jb21wb25lbnRzW2NvbXBvbmVudF0gPSBuZXcgQ2hlY2tvdXQoY29udGFpbmVyLCBjb250YWluZXIuUmVxdWVzdCwgY29udGFpbmVyLkV2ZW50cyk7XHJcblx0XHRcdGluc3RhbmNlLmNvbXBvbmVudHNbY29tcG9uZW50XS5ib290ZWQgPSB0cnVlO1xyXG5cdFx0XHRpbnN0YW5jZS5ib290ZWQucHVzaChpbnN0YW5jZS5jb21wb25lbnRzW2NvbXBvbmVudF0pO1xyXG5cdFx0XHRyZXR1cm4gaW5zdGFuY2UuY29tcG9uZW50c1tjb21wb25lbnRdO1xyXG5cdFx0fSwgJ2NvbXBvbmVudHMnKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFByb3ZpZGUgYSByZWdpc3RlcmVkIGNvbXBvbmVudC5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSBzdHJpbmcgfCBjb21wb25lbnRcclxuXHQgKiBAcmV0dXJuIG9iamVjdFxyXG5cdCAqL1xyXG5cdHByb3ZpZGUoY29tcG9uZW50KVxyXG5cdHtcclxuXHRcdGlmIChDb21tb24uaW5fYXJyYXkoY29tcG9uZW50LCB0aGlzLmF2YWlsYWJsZSkpIHtcclxuXHRcdFx0cmV0dXJuIHRoaXMuY29udGFpbmVyLm1ha2UoY29tcG9uZW50KTtcclxuXHRcdH1cclxuXHJcblx0XHR0aHJvdyBuZXcgQ29tcG9uZW50Tm90UmVnaXN0ZXJlZEV4Y2VwdGlvbignY29tcG9uZW50cyBtdXN0IGJlIHJlZ2lzdGVyZWQgaW4gb3JkZXIgdG8gdXNlIHRoZW0uJyk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBDaGVja3MgaWYgY29tcG9uZW50IGV4aXN0cy5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSBzdHJpbmcgfCBuYW1lXHJcblx0ICogQHJldHVybiBib29sXHJcblx0ICovXHJcblx0ZXhpc3RzKG5hbWUpXHJcblx0e1xyXG5cdFx0cmV0dXJuIHRoaXMuY29tcG9uZW50cy5oYXNPd25Qcm9wZXJ0eShuYW1lKTtcclxuXHR9XHJcbn1cblxubGV0IGRlZmF1bHRNZXNzYWdlJDYgPSAnVHJ5aW5nIHRvIGJpbmQgYW4gYWxyZWFkeSBleGlzdGluZyBib3VuZC4nO1xyXG5cclxuY2xhc3MgSW52YWxpZEJpbmRpbmdFeGNlcHRpb24gZXh0ZW5kcyBFeGNlcHRpb25IYW5kbGVyXHJcbntcclxuXHRjb25zdHJ1Y3RvcihtZXNzYWdlID0gbnVsbCkgXHJcblx0e1xyXG5cdFx0bWVzc2FnZSA9IG1lc3NhZ2UgfHwgZGVmYXVsdE1lc3NhZ2UkNjtcclxuXHRcdHN1cGVyKG1lc3NhZ2UpO1xyXG4gICAgXHRzdXBlci5zdGFja1RyYWNlKHRoaXMsIG1lc3NhZ2UpO1xyXG4gICAgfVxyXG59XG5cbi8vIEhlbHBlcnNcclxuLy8gQ29yZVxyXG4vLyBFeGNlcHRpb25zXHJcbi8qKlxyXG4gKiBAZmlsZSBcclxuICogQ29udGFpbmVyIGNsYXNzLlxyXG4gKlxyXG4gKiBIYW5kbGVzL0NvbnRyb2xzIHRoZSBkZXBlbmRlbmNpZXMgb2YgZWNvbW1lcmNlLlxyXG4gKi9cclxuXHJcbmNsYXNzIENvbnRhaW5lciQ1IFxyXG57XHJcblx0LyoqXHJcblx0ICogLSBJbml0aWFsaXplIGluc3RhbmNlcyBtZW1iZXIuXHJcblx0ICogLSBSZWdpc3RlciBiaW5kaW5ncy5cclxuXHQgKlxyXG5cdCAqIEByZXR1cm4gdm9pZFxyXG5cdCAqL1xyXG5cdGNvbnN0cnVjdG9yKClcclxuXHR7XHJcblx0XHR0aGlzLmluc3RhbmNlcyA9IFtdO1xyXG5cdFx0dGhpcy5yZWdpc3RlcigpO1xyXG5cdFx0dGhpcy5yZWdpc3RlclByb3ZpZGVycygpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQmluZHMga2V5IHRvIGNvbmNyZXRlIGNsYXNzLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIHN0cmluZyB8IGtleVxyXG5cdCAqIEBwYXJhbSBjbGFzcyB8IGNvbmNyZXRlXHJcblx0ICogQHJldHVybiB2b2lkXHJcblx0ICovXHJcblx0YmluZChrZXksIGNvbmNyZXRlLCBuYW1lc3BhY2UgPSBudWxsKSBcclxuXHR7XHJcblx0XHRpZiAodHlwZW9mIGtleSAhPSAnc3RyaW5nJykge1xyXG5cdFx0XHR0aHJvdyBuZXcgSW52YWxpZEFyZ3VtZW50RXhjZXB0aW9uJDEoJ2JpbmQoKSBleHBlY3RzIHRoZSBmaXJzdCBwYXJhbWV0ZXIgdG8gYmUgc3RyaW5nLCBidXQgJyArIHR5cGVvZiBrZXkgKyAnIHdhcyBwYXNzZWQgaW5zdGVhZC4nKTtcclxuXHRcdH1cclxuXHJcblx0XHRpZiAodHlwZW9mIGNvbmNyZXRlICE9ICdmdW5jdGlvbicpIHsgXHJcblx0XHRcdHRocm93IG5ldyBJbnZhbGlkQXJndW1lbnRFeGNlcHRpb24kMSgnYmluZCgpIGV4cGVjdHMgdGhlIHNlY29uZCBwYXJhbWV0ZXIgdG8gYmUgYSBmdW5jdGlvbiwgYnV0ICcgKyB0eXBlb2YgY29uY3JldGUgKyAnIHdhcyBwYXNzZWQgaW5zdGVhZC4nKTtcclxuXHRcdH1cclxuXHJcblx0XHRpZiAobmFtZXNwYWNlKSB7XHJcblx0XHRcdGlmICh0eXBlb2YgdGhpc1tuYW1lc3BhY2VdID09ICd1bmRlZmluZWQnKSB7XHJcblx0XHRcdFx0dGhpc1tuYW1lc3BhY2VdID0ge307XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHRoaXNbbmFtZXNwYWNlXVtrZXldID0gY29uY3JldGUuYmluZChjb25jcmV0ZSwgdGhpcywga2V5KTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdHRoaXNba2V5XSA9IGNvbmNyZXRlLmJpbmQoY29uY3JldGUsIHRoaXMsIGtleSk7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBTZXRzIGFuIGluc3RhbmNlLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIHN0cmluZyB8IGtleVxyXG5cdCAqIEBwYXJhbSBvYmplY3QgfCBpbnN0YW5jZVxyXG5cdCAqIEBwYXJhbSBzdHJpbmcgfCBhbGlhc1xyXG5cdCAqIEByZXR1cm4gdm9pZFxyXG5cdCAqL1xyXG5cdHNldEluc3RhbmNlKGtleSwgaW5zdGFuY2UsIGFsaWFzID0gbnVsbCkgXHJcblx0e1xyXG5cdFx0aWYgKHR5cGVvZiBrZXkgIT0gJ3N0cmluZycpIHtcclxuXHRcdFx0dGhyb3cgbmV3IEludmFsaWRBcmd1bWVudEV4Y2VwdGlvbiQxKCdzZXRJbnN0YWNlKCkgZXhwZWN0cyB0aGUgZmlyc3QgcGFyYW1ldGVyIHRvIGJlIGEgc3RyaW5nLCBidXQgJyArIHR5cGVvZiBrZXkgKyAnIHdhcyBwYXNzZWQgaW5zdGVhZC4nKTtcclxuXHRcdH1cclxuXHJcblx0XHRpZiAodHlwZW9mIGluc3RhbmNlICE9ICdvYmplY3QnKSB7XHJcblx0XHRcdHRocm93IG5ldyBJbnZhbGlkQXJndW1lbnRFeGNlcHRpb24kMSgnc2V0SW5zdGFuY2UoKSBleHBlY3RzIHRoZSBzZWNvbmQgcGFyYW1ldGVyIHRvIGJlIGFuIG9iamVjdCwgYnV0ICcgKyB0eXBlb2YgaW5zdGFuY2UgKyAnIHdhcyBwYXNzZWQgaW5zdGVhZC4nKTtcclxuXHRcdH1cclxuXHJcblx0XHR0aGlzLmluc3RhbmNlc1trZXldID0gaW5zdGFuY2U7XHJcblx0XHR0aGlzW2tleV0gPSBpbnN0YW5jZTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFJlc29sdmVzIGFuIGluc3RhbmNlIG91dCBvZiBcclxuXHQgKiB0aGUgaW9jIGNvbnRhaW5lci5cclxuXHQgKiBcclxuXHQgKiBAcGFyYW0gc3RyaW5nIHwga2V5XHJcblx0ICogQHJldHVybiBvYmplY3RcclxuXHQgKi9cclxuXHRnZXRJbnN0YW5jZShrZXkpIFxyXG5cdHtcclxuXHRcdGlmICh0eXBlb2Yga2V5ICE9ICdzdHJpbmcnICYmIHR5cGVvZiBrZXkgIT0gJ29iamVjdCcpIHtcclxuXHRcdFx0dGhyb3cgbmV3IEludmFsaWRBcmd1bWVudEV4Y2VwdGlvbiQxKCdnZXRJbnN0YWNlKCkgZXhwZWN0cyB0aGUgZmlyc3QgcGFyYW1ldGVyIHRvIGJlIGEgc3RyaW5nLCBidXQgJyArIHR5cGVvZiBrZXkgKyAnIHdhcyBwYXNzZWQgaW5zdGVhZC4nKTtcclxuXHRcdH1cclxuXHJcblx0XHRpZiAodHlwZW9mIGtleSA9PSAnb2JqZWN0Jykge1xyXG5cdFx0XHRyZXR1cm4gdGhpcy5pbnN0YW5jZXNba2V5LmNvbnN0cnVjdG9yLm5hbWVdIHx8IG51bGw7XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIHRoaXMuaW5zdGFuY2VzW2tleV0gfHwgbnVsbDtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIENoZWNrcyBpZiBhbiBpbnN0YW5jZSBleGlzdC5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSBtaXhlZCB8IGluc3RhbmNlXHJcblx0ICogQHJldHVybiBib29sXHJcblx0ICovXHJcblx0aW5zdGFuY2VFeGlzdChpbnN0YW5jZSkgXHJcblx0e1xyXG5cdFx0aWYgKHR5cGVvZiBpbnN0YW5jZSA9PSAnb2JqZWN0JyB8fCB0eXBlb2YgaW5zdGFuY2UgPT0gJ3N5bWJvbCcpIHtcclxuXHRcdFx0cmV0dXJuICh0eXBlb2YgdGhpcy5pbnN0YW5jZXNbaW5zdGFuY2UuY29uc3RydWN0b3IubmFtZV0gIT09ICd1bmRlZmluZWQnKTtcclxuXHRcdH0gZWxzZSBpZiAodHlwZW9mIGluc3RhbmNlID09ICdzdHJpbmcnKSB7XHJcblx0XHRcdHJldHVybiAodHlwZW9mIHRoaXMuaW5zdGFuY2VzW2luc3RhbmNlXSAhPT0gJ3VuZGVmaW5lZCcpXHJcblx0XHR9XHJcblx0XHRcclxuXHRcdHRocm93IG5ldyBJbnZhbGlkQXJndW1lbnRFeGNlcHRpb24kMSgnaW5zdGFuY2VFeGlzdCgpIGV4cGVjdHMgdGhlIGZpcnN0IHBhcmFtZXRlciB0byBiZSBzdHJpbmcgb3IgYW4gb2JqZWN0LCBidXQgJyArIHR5cGVvZiBpbnN0YW5jZSArICcgd2FzIHBhc3NlZCBpbnN0ZWFkLicpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogUmV0cmlldmUgYW4gb2JqZWN0LCBpZiBub3QgZXhpc3RzXHJcblx0ICogd2lsbCBjcmVhdGUgaXQsIHNldCBpdCBpbiB0aGUgaW9jIGNvbnRhaW5lclxyXG5cdCAqIGZvciBsYXRlciB1c2UgYW5kIHJldHJpZXZlIGl0LlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIG1peGVkIHwgb2JqZWN0IFxyXG5cdCAqIEByZXR1cm4gb2JqZWN0XHJcblx0ICovXHJcblx0bWFrZShvYmplY3QpXHJcblx0e1xyXG5cdFx0bGV0IGluc3RhbmNlID0ge307XHJcblx0XHRsZXQga2V5O1xyXG5cdFx0XHJcblx0XHRpZiAodGhpcy5pbnN0YW5jZUV4aXN0KG9iamVjdCkpIHtcclxuXHRcdFx0cmV0dXJuIHRoaXMuZ2V0SW5zdGFuY2Uob2JqZWN0KTtcclxuXHRcdH1cclxuXHJcblx0XHRpZiAodHlwZW9mIG9iamVjdCA9PSAnb2JqZWN0Jykge1xyXG5cdFx0XHRpbnN0YW5jZSA9IG9iamVjdDtcclxuXHRcdFx0a2V5ID0gb2JqZWN0LmNvbnN0cnVjdG9yLm5hbWU7XHJcblx0XHRcdHRoaXMuc2V0SW5zdGFuY2Uoa2V5LCBpbnN0YW5jZSk7IFxyXG5cdFx0fSBlbHNlIGlmICh0eXBlb2Ygb2JqZWN0ID09ICdzdHJpbmcnICYmIHRoaXMuaGFzT3duUHJvcGVydHkob2JqZWN0KSkge1xyXG5cdFx0XHRpbnN0YW5jZSA9IG5ldyB0aGlzW29iamVjdF07XHJcblx0XHRcdGtleSA9IG9iamVjdDtcclxuXHRcdFx0dGhpcy5zZXRJbnN0YW5jZShrZXksIGluc3RhbmNlKTtcdFxyXG5cdFx0fSBlbHNlIGlmICh0eXBlb2Ygb2JqZWN0ID09ICdzdHJpbmcnICYmIHRoaXMuQ29tcG9uZW50cy5leGlzdHMob2JqZWN0KSkge1xyXG5cdFx0XHRpbnN0YW5jZSA9IG5ldyB0aGlzLmNvbXBvbmVudHNbb2JqZWN0XTtcclxuXHRcdFx0a2V5ID0gb2JqZWN0O1xyXG5cdFx0XHR0aGlzLnNldEluc3RhbmNlKGtleSwgaW5zdGFuY2UpO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0dGhyb3cgbmV3IEludmFsaWRCaW5kaW5nRXhjZXB0aW9uKCdDb250YWluZXIubWFrZSgpIGNvdWxkIG5vdCBjcmVhdGUgdGhlIG9iamVjdCEnKTtcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gaW5zdGFuY2U7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBSZW1vdmUgYWxsIGV4aXN0aW5nIGluc3RhbmNlcy5cclxuXHQgKlxyXG5cdCAqIEByZXR1cm4gdm9pZCBcclxuXHQgKi9cclxuXHRmbHVzaCgpXHJcblx0e1xyXG5cdFx0dGhpcy5pbnN0YW5jZXMgPSBbXTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFJlZ2lzdGVycyB0aGUgZGVwZW5kZWNpZXMuXHJcblx0ICpcclxuXHQgKiBAcmV0dXJuIHZvaWQgXHJcblx0ICovXHJcblx0cmVnaXN0ZXIoKVxyXG5cdHtcclxuXHRcdHRoaXMuc2V0SW5zdGFuY2UoJ1JlcXVlc3QnLCBuZXcgUmVxdWVzdCk7XHJcblx0XHR0aGlzLnNldEluc3RhbmNlKCdFdmVudHMnLCBuZXcgRXZlbnRNYW5hZ2VyKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFJlZ2lzdGVycyB0aGUgcHJvdmlkZXJzLlxyXG5cdCAqXHJcblx0ICogQHJldHVybiB2b2lkIFxyXG5cdCAqL1xyXG5cdHJlZ2lzdGVyUHJvdmlkZXJzKClcclxuXHR7XHJcblx0XHR0aGlzLnNldEluc3RhbmNlKCdDb21wb25lbnRzJywgbmV3IENvbXBvbmVudHNQcm92aWRlcih0aGlzKSk7XHJcblx0fVxyXG59XG5cbi8vIEhlbHBlcnNcclxuLy8gQ29yZVxyXG4vLyBFeGNlcHRpb25zXHJcbi8qKlxyXG4gKiBTdG9yZXMgdGhlIGRlZmF1bHQgc2V0dGluZ3MuXHJcbiAqXHJcbiAqIEB2YXIgb2JqZWN0XHJcbiAqL1xyXG5sZXQgZGVmYXVsdFNldHRpbmdzJDYgPSB7XHJcblx0ZGVidWdfbGV2ZWw6ICdlcnJvcicsXHJcblx0ZWxlbWVudDogJ2JvZHknLFxyXG5cdGluamVjdF9saWJyYXJpZXM6IFtdLFxyXG5cdGNvbXBvbmVudHM6IFsnUHJvZHVjdHMnLCAnU2VydmljZXMnLCAnRmlsdGVyJywgJ1BhZ2luYXRpb24nLCAnQ2FydCddLFxyXG5cdGxvYWRpbmdfYW5pbWF0aW9uOiB0cnVlXHJcbn07XHJcblxyXG4vKipcclxuICogU3RvcmVzIHRoZSBvcHRpb25hbCwgXHJcbiAqIGluamVjdGFibGUgZXh0ZXJuYWwgbGlicmFyaWVzIFxyXG4gKlxyXG4gKiBAdmFyIG9iamVjdFxyXG4gKi9cclxubGV0IGV4dGVybmFsTGlicmFyaWVzID0ge1xyXG5cdGJvb3RzdHJhcDogJ2h0dHBzOi8vbWF4Y2RuLmJvb3RzdHJhcGNkbi5jb20vYm9vdHN0cmFwLzMuMy43L2Nzcy9ib290c3RyYXAubWluLmNzcycsXHJcbn07XHJcblxyXG5jbGFzcyBUdXJib0Vjb21tZXJjZVxyXG57XHJcblx0LyoqXHJcblx0ICogVGhlIGVudGVyeSBmb3IgdGhlIHNob3AuXHJcblx0ICogLSBTZXR0aW5nIHRoZSBleGNlcHRpb24gaGFuZGxlci5cclxuXHQgKiAtIFNldHRpbmcgdGhlIGlvYyBjb250YWluZXIuXHJcblx0ICogLSBFeHRlbmRpbmcgdGhlIHVzZXIgc2V0dGluZ3MuXHJcblx0ICogLSBTZXR0aW5nIHRoZSBlbGVtZW50LlxyXG5cdCAqIC0gRGlzYWJsaW5nIGRlZmF1bHQgZXJyb3JzLlxyXG5cdCAqIC0gUGFzc2luZyBjYWxscyB2aWEgcHJveHkgdG8gdGhlIGNvbXBvbmVudHMuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gb2JqZWN0IHwgc2V0dGluZ3NcclxuXHQgKiBAcmV0dXJuIFByb3h5XHJcblx0ICovXHJcblx0Y29uc3RydWN0b3Ioc2V0dGluZ3MpXHJcblx0e1xyXG5cdFx0aWYgKHR5cGVvZiBzZXR0aW5ncyAhPSAnb2JqZWN0Jykge1xyXG5cdFx0XHR0aHJvdyBuZXcgSW52YWxpZEFyZ3VtZW50RXhjZXB0aW9uJDE7XHJcblx0XHR9XHJcblxyXG5cdFx0dGhpcy5zZXR0aW5ncyA9IENvbW1vbi5leHRlbmQoZGVmYXVsdFNldHRpbmdzJDYsIHNldHRpbmdzKTtcclxuXHJcblx0XHRFeGNlcHRpb25IYW5kbGVyLnNldERlYnVnTGV2ZWwgPSB0aGlzLnNldHRpbmdzLmRlYnVnX2xldmVsO1xyXG5cdFx0XHJcblx0XHR0aGlzLmxvYWRFeHRlcm5hbExpYnJhcmllcygpO1xyXG5cdFx0XHJcblx0XHR0aGlzLmNvbnRhaW5lciA9IG5ldyBDb250YWluZXIkNTtcclxuXHJcblx0XHR0aGlzLmNvbXBvbmVudHMgPSB0aGlzLmNvbnRhaW5lci5tYWtlKCdDb21wb25lbnRzJyk7XHJcblx0XHR0aGlzLmNvbXBvbmVudHMucmVnaXN0ZXIodGhpcy5zZXR0aW5ncy5jb21wb25lbnRzKTtcclxuXHJcblx0XHRkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgZnVuY3Rpb24oKSB7XHJcblx0XHRcdHRoaXMuc2V0RWxlbWVudCh0aGlzLnNldHRpbmdzLmVsZW1lbnQpO1xyXG5cclxuXHRcdFx0aWYgKHRoaXMuc2V0dGluZ3MubG9hZGluZ19hbmltYXRpb24pIHtcclxuXHRcdFx0XHRzdGFydExvYWRpbmcuY2FsbCh0aGlzKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0dGhpcy5hZGRTdHlsZVRhZygpO1xyXG5cdFx0fS5iaW5kKHRoaXMpKTtcclxuXHJcblx0XHRyZXR1cm4gbmV3IFByb3h5KHRoaXMsIHtcclxuXHRcdFx0Z2V0OiBmdW5jdGlvbihzaG9wLCBzb3VyY2UpIHtcclxuXHRcdFx0XHRpZiAoc2hvcC5jb21wb25lbnRzLmV4aXN0cyhzb3VyY2UpKSB7XHJcblx0XHRcdFx0XHRyZXR1cm4gc2hvcC5jb21wb25lbnRzLnByb3ZpZGUoc291cmNlKTtcclxuXHRcdFx0XHR9IFxyXG5cclxuXHRcdFx0XHRpZiAoc2hvcC5jb250YWluZXIuaW5zdGFuY2VFeGlzdChzb3VyY2UpKSB7XHJcblx0XHRcdFx0XHRyZXR1cm4gc2hvcC5jb250YWluZXIuZ2V0SW5zdGFuY2Uoc291cmNlKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogTG9hZHMgdGhlIGV4dGVybmFsIGxpYnJhcmllcyB3aGljaCB3YXMgc3BlY2lmaWVkLlxyXG5cdCAqIFxyXG5cdCAqIEByZXR1cm4gdm9pZFxyXG5cdCAqL1xyXG5cdGxvYWRFeHRlcm5hbExpYnJhcmllcygpXHJcblx0e1xyXG5cdFx0bGV0IGk7XHJcblx0XHRsZXQgbGlicmFyaWVzID0gdGhpcy5zZXR0aW5ncy5pbmplY3RfbGlicmFyaWVzO1xyXG5cclxuXHRcdGZvciAoaSA9IDA7IGkgPCBsaWJyYXJpZXMubGVuZ3RoOyBpKyspIHtcclxuXHRcdFx0aWYgKGV4dGVybmFsTGlicmFyaWVzLmhhc093blByb3BlcnR5KGxpYnJhcmllc1tpXSkpIHtcclxuXHRcdFx0XHRsZXQgaWQgPSAnVHVyYm8tZUNvbW1lcmNlLScgKyBTdHIudWNmaXJzdChsaWJyYXJpZXNbaV0pO1xyXG5cdFx0XHRcdFxyXG5cdFx0XHRcdGlmICghIERPTS5maW5kKGlkKSkge1xyXG5cdFx0XHRcdFx0RE9NLmFkZExpbmtlZFN0eWxlKGlkLCBleHRlcm5hbExpYnJhcmllc1tsaWJyYXJpZXNbaV1dKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFNldHMgdGhlIGVsZW1lbnQgdG8gYmUgYm91bmQgdG8uXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gc3RyaW5nIHwgc2VsZWN0b3JcclxuXHQgKiBAcmV0dXJuIHZvaWRcclxuXHQgKi9cclxuXHRzZXRFbGVtZW50KHNlbGVjdG9yKVxyXG5cdHtcclxuXHRcdHRoaXMuZWxlbWVudCA9IERPTS5maW5kKHNlbGVjdG9yKTtcclxuXHRcdFxyXG5cdFx0RE9NLmFkZENsYXNzKHRoaXMuZWxlbWVudCwgdGhpcy5zZXR0aW5ncy5jbGFzcyk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBBZGQgdGhlIGVDb21tZXJjZSBzdHlsZSB0YWdzIHRvIHRoZSBET00uXHJcblx0ICpcclxuXHQgKiBAcmV0dXJuIHZvaWRcclxuXHQgKi9cclxuXHRhZGRTdHlsZVRhZygpIFxyXG5cdHtcclxuXHRcdGlmIChET00uZmluZCgnI1R1cmJvZS1Db21tZXJjZScpKSB7XHJcblx0XHRcdHJldHVybjtcclxuXHRcdH1cclxuXHJcblx0XHRsZXQgY3NzID0gYFxyXG5cdFx0XHQke3RoaXMuc2V0dGluZ3MuZWxlbWVudH0ge1xyXG5cdFx0XHRcdHBvc2l0aW9uOiByZWxhdGl2ZTtcclxuXHRcdFx0XHRjbGVhcjogYm90aDtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0LmxvYWRpbmctcHJvZ3Jlc3MtYmFyIHtcclxuXHRcdFx0XHRwb3NpdGlvbjogZml4ZWQ7XHJcblx0XHRcdFx0dG9wOiAwO1xyXG5cdFx0XHRcdGxlZnQ6IDA7XHJcblx0XHRcdFx0aGVpZ2h0OiA1cHg7XHJcblx0XHRcdFx0d2lkdGg6IDEwMCU7XHJcblx0XHRcdFx0LXdlYmtpdC1ib3gtc2hhZG93OiAwcHggMHB4IDVweCAxcHggcmdiYSgxNjgsMTY4LDE2OCwxKTtcclxuXHRcdFx0XHQtbW96LWJveC1zaGFkb3c6IDBweCAwcHggNXB4IDFweCByZ2JhKDE2OCwxNjgsMTY4LDEpO1xyXG5cdFx0XHRcdGJveC1zaGFkb3c6IDBweCAwcHggNXB4IDFweCByZ2JhKDE2OCwxNjgsMTY4LDEpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHQubG9hZGluZy1wcm9ncmVzcy1iYXIgPiAubG9hZGluZy1wcm9ncmVzcy1maWxsIHtcclxuXHRcdFx0XHR3aWR0aDogMTAwJTtcclxuXHRcdFx0XHRoZWlnaHQ6IDEwMCU7XHJcblx0XHRcdFx0cG9zaXRpb246IGFic29sdXRlO1xyXG5cdFx0XHRcdGJhY2tncm91bmQtY29sb3I6ICM5ZGQyZmY7XHJcblx0XHRcdFx0dHJhbnNmb3JtOiB0cmFuc2xhdGVYKC0ke2RvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRXaWR0aH1weCk7XHJcblx0XHRcdH1cclxuXHRcdGA7XHJcblx0ICAgIFxyXG5cdCAgICBET00uYWRkU3R5bGUoJ1R1cmJvLWVDb21tZXJjZScsIGNzcyk7XHJcblx0fVxyXG59XHJcblxyXG5cclxuLyoqXHJcbiAqIEF0dGFjaGVzIGEgbG9hZGVyIHRvIHRoZSB0b3Agb2YgdGhlIHNjcmVlblxyXG4gKiBhbmQgaGlkZXMgdGhlIGNvbnRlbnQuXHJcbiAqIFN0b3BzIGF1dG9tYXRpY2FsbHkgYWZ0ZXIgMjAlIHJlYWNoZWQuXHJcbiAqXHJcbiAqIEByZXR1cm4gdm9pZCBcclxuICovXHJcbmZ1bmN0aW9uIHN0YXJ0TG9hZGluZygpIHtcclxuXHRsZXQgbG9hZGVyID0gRE9NLmNyZWF0ZUVsZW1lbnQoJ2RpdicsIHtcclxuXHRcdGNsYXNzOiAnbG9hZGluZy1wcm9ncmVzcy1iYXInXHJcblx0fSk7XHJcblxyXG5cdGxldCBmaWxsID0gRE9NLmNyZWF0ZUVsZW1lbnQoJ3NwYW4nLCB7XHJcblx0XHRjbGFzczogJ2xvYWRpbmctcHJvZ3Jlc3MtZmlsbCdcclxuXHR9KTtcclxuXHJcblx0bG9hZGVyLmFwcGVuZENoaWxkKGZpbGwpO1xyXG5cdGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQobG9hZGVyKTtcclxuXHJcblxyXG5cdGxldCBwcm9ncmVzcyA9IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRXaWR0aDtcclxuXHRsZXQgbWF4U2l6ZSA9IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRXaWR0aCAqIDAuODA7XHJcblxyXG5cdHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUocHJvZ3Jlc3NEcmF3KTtcclxuXHJcblx0bGV0IGNvbnRlbnQgPSB0aGlzLmVsZW1lbnQ7XHJcblxyXG5cdGNvbnRlbnQuc3R5bGUuZGlzcGxheSA9ICdub25lJztcclxuXHRcclxuXHRmdW5jdGlvbiBwcm9ncmVzc0RyYXcoKSB7XHJcblx0XHRmaWxsLnN0eWxlLnRyYW5zZm9ybSA9ICd0cmFuc2xhdGVYKC0nICsgcHJvZ3Jlc3MgKyAncHgpJztcclxuXHRcdHByb2dyZXNzIC09IDc7XHJcblxyXG5cdFx0aWYgKHByb2dyZXNzIDwgbWF4U2l6ZSkge1xyXG5cdFx0XHRkb25lKCk7XHJcblx0XHRcdHJldHVybjtcclxuXHRcdH1cclxuXHJcblx0XHR3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKHByb2dyZXNzRHJhdyk7XHJcblx0fVxyXG5cclxuXHRmdW5jdGlvbiBkb25lKCkge1xyXG5cdFx0ZmlsbC5zdHlsZS5vcGFjaXR5ID0gcHJvZ3Jlc3MgLyAxMDAwO1xyXG5cdFx0ZmlsbC5zdHlsZS50cmFuc2Zvcm0gPSAndHJhbnNsYXRlWCgtJyArIHByb2dyZXNzICsgJ3B4KSc7XHJcblx0XHJcblx0XHRwcm9ncmVzcyAtPSAxNTtcclxuXHJcblx0XHRpZiAocHJvZ3Jlc3MgPD0gMCkge1xyXG5cdFx0XHRjb250ZW50LnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xyXG5cdFx0XHRcclxuXHRcdFx0aWYgKHR5cGVvZiBsb2FkZXIgIT0gJ3VuZGVmaW5lZCcpIHtcclxuXHRcdFx0XHRET00ucmVtb3ZlKGxvYWRlcik7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHJldHVybjtcclxuXHRcdH1cclxuXHJcblx0XHR3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKGRvbmUpO1xyXG5cdH1cclxufVxuXG5yZXR1cm4gVHVyYm9FY29tbWVyY2U7XG5cbn0oKSk7XG4iXX0=
