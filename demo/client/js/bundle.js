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

				// create checkout button at the bottom of the preview
				var tr = DOM.createElement('tr');
				var td = DOM.createElement('td', {
					colspan: '3'
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

				// create total sum at the bottom of the preview
				td = DOM.createElement('td', {
					colspan: '1'
				});

				var total = DOM.createElement('div', {
					class: 'cart-total',
					text: this.total()
				});

				td.appendChild(total);
				tr.appendChild(td);

				table.appendChild(tr);

				itemsDiv.appendChild(table);
			}

			/**
    * Calculates the total of the cart
    * and retrieve it.
    *
    * @return number 
    */

		}, {
			key: 'total',
			value: function total() {
				this.cart = Cookie.get(this.settings.cookie_name);

				var total = 0.00;
				var i = void 0;

				for (i = 0; i < this.cart.items.length; i++) {
					total += parseFloat(this.cart.items[i].price.amount) * this.cart.items[i].quantity;
				}

				return total.toFixed(2);
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
						class: 'product-price'
					});

					var span = DOM.createElement('span', {
						class: 'product-amount',
						html: attributes.price.amount
					});

					var span2 = DOM.createElement('span', {
						class: 'product-currency',
						html: attributes.price.currency
					});

					_tag2.appendChild(span);
					_tag2.appendChild(span2);
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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlR1cmJvRWNvbW1lcmNlLmpzIl0sIm5hbWVzIjpbIlR1cmJvRWNvbW1lcmNlIiwiU3RyIiwic3RyaW5nIiwicmVwbGFjZSIsInRvTG93ZXJDYXNlIiwibGVuZ3RoIiwicG9zc2libGUiLCJpIiwiY2hhckF0IiwiTWF0aCIsImZsb29yIiwicmFuZG9tIiwidG9VcHBlckNhc2UiLCJzbGljZSIsImRlYnVnTGV2ZWwiLCJFeGNlcHRpb25IYW5kbGVyIiwibGV2ZWwiLCJ3aW5kb3ciLCJvbmVycm9yIiwiRXJyb3IiLCJjYXB0dXJlU3RhY2tUcmFjZSIsImNvbnN0cnVjdG9yIiwibmFtZSIsImVycm9yIiwibWVzc2FnZSIsImN1c3RvbUFjdGlvbnMiLCJoYW5kbGVFcnJvcnMiLCJoYW5kbGVXYXJuaW5ncyIsImhhbmRsZUluZm9zIiwiY29uc29sZSIsIndhcm4iLCJpbmZvIiwiZGVmYXVsdE1lc3NhZ2UiLCJJbnZhbGlkQXJndW1lbnRFeGNlcHRpb24kMSIsIkRPTSIsImVsZW1lbnQiLCJjbGFzc05hbWUiLCJuZXdDbGFzc05hbWUiLCJyZW1vdmVDbGFzcyIsImFkZENsYXNzIiwidW5kZWZpbmVkIiwiY2xhc3NOYW1lcyIsInNwbGl0IiwiZm9yRWFjaCIsImNsYXNzTGlzdCIsImFkZCIsImluZGV4T2YiLCJyZW1vdmUiLCJwYXJlbnROb2RlIiwicmVtb3ZlQ2hpbGQiLCJpZCIsImNzcyIsImhlYWQiLCJkb2N1bWVudCIsImdldEVsZW1lbnRzQnlUYWdOYW1lIiwic3R5bGVUYWciLCJjcmVhdGVFbGVtZW50IiwiQ1NTIiwibWluaWZ5Q3NzIiwiaW5uZXJIVE1MIiwic2V0QXR0cmlidXRlIiwiYXBwZW5kQ2hpbGQiLCJzb3VyY2UiLCJsaW5rZWRTdHlsZVRhZyIsImVsZW1lbnRUeXBlIiwib3B0aW9ucyIsIm9wdGlvbiIsInNlY29uZENsYXNzTmFtZSIsInRvZ2dsZSIsInNlbGVjdG9yIiwiY29udGV4dCIsInF1ZXJ5RWxlbWVudCIsInBhcmVudEVsZW1lbnQiLCJxdWVyeVNlbGVjdG9yQWxsIiwiaGFzQ2hpbGQiLCJjaGlsZEVsZW1lbnQiLCJub2RlIiwiQ29tbW9uIiwiY3VycmVudE9iamVjdCIsIm5ld09iamVjdCIsImV4dGVuZGVkIiwicHJvcCIsIk9iamVjdCIsInByb3RvdHlwZSIsImhhc093blByb3BlcnR5IiwiY2FsbCIsIm5lZWRsZSIsImh5c3RhY2siLCJBcnJheSIsInRvdGFsIiwic2l6ZSIsImlzTmFOIiwicGFyc2VJbnQiLCJjb2xsZWN0aW9uIiwiY2VpbCIsInN0YXJ0IiwiZW5kIiwicHVzaCIsIm9iamVjdCIsImRlZmF1bHRNZXNzYWdlJDEiLCJJbnZhbGlkRGF0YVN0cnVjdHVyZUV4Y2VwdGlvbiIsImRlZmF1bHRTZXR0aW5ncyIsImhlYWRlcnMiLCJhc3luYyIsIlJlcXVlc3QiLCJzZXR0aW5ncyIsImV4dGVuZCIsInNldERlZmF1bHRSZXF1ZXN0SGVhZGVyIiwiaGVhZGVyIiwib3BlbiIsIlhNTEh0dHBSZXF1ZXN0Iiwic2V0UmVxdWVzdEhlYWRlciIsInJlc3BvbnNlIiwiYXBwbHkiLCJhcmd1bWVudHMiLCJ4aHIiLCJiZWZvcmUiLCJQcm9taXNlIiwicmVzb2x2ZSIsInJlamVjdCIsImRhdGEiLCJ1cmwiLCJyZXNwb25zZVR5cGUiLCJkYXRhVHlwZSIsInRpbWVvdXQiLCJvbnJlYWR5c3RhdGVjaGFuZ2UiLCJyZWFkeVN0YXRlIiwic3RhdHVzIiwicmVzcG9uc2VUZXh0IiwiYWZ0ZXIiLCJzZW5kIiwicXVlcnlTdHJpbmciLCJrZXlzIiwibWFwIiwia2V5IiwiZW5jb2RlVVJJQ29tcG9uZW50Iiwiam9pbiIsIkFjdGl2ZVhPYmplY3QiLCJvdmVycmlkZU1pbWVUeXBlIiwiSlNPTiIsInBhcnNlIiwib25hYm9ydCIsImRlZmF1bHRNZXNzYWdlJDIiLCJCYWRFdmVudENhbGxFeGNlcHRpb24iLCJFdmVudE1hbmFnZXIiLCJldmVudHMiLCJjYWxsYmFjayIsIkludmFsaWRBcmd1bWVudEV4Y2VwdGlvbiIsIkNvb2tpZSIsInZhbHVlIiwiZGF5cyIsInN0cmluZ2lmeSIsImV4cGlyZXMiLCJkYXRlIiwiRGF0ZSIsInNldFRpbWUiLCJnZXRUaW1lIiwidG9HTVRTdHJpbmciLCJjb29raWUiLCJjX3N0YXJ0IiwiY19lbmQiLCJ1bmVzY2FwZSIsInN1YnN0cmluZyIsImRlZmF1bHRNZXNzYWdlJDMiLCJJbnZhbGlkQ2FydEl0ZW1FeGNlcHRpb24iLCJkZWZhdWx0U2V0dGluZ3MkMSIsImNvb2tpZV9uYW1lIiwicHJldmlld19jbGFzcyIsImxvYWRlciIsImNsYXNzIiwid2lkdGgiLCJoZWlnaHQiLCJwbGFjZW1lbnQiLCJmaXhlZCIsImhvdmVyX2NvbG9yIiwibm9fY3NzIiwiQ29udGFpbmVyIiwiRXZlbnRNYW5hZ2VyJDIiLCJIdHRwIiwibG9hZGluZ092ZXJsYXkiLCJpdGVtc0RpdiIsIkNhcnQiLCJjb250YWluZXIiLCJodHRwIiwiZXZlbnRNYW5hZ2VyIiwicHJldmlld0VsZW1lbnQiLCJjcmVhdGVQcmV2aWV3RWxlbWVudCIsImljb24iLCJjcmVhdGVJY29uIiwic2V0RWxlbWVudCIsImFkZFN0eWxlVGFnIiwiYmluZEV2ZW50TGlzdGVuZXJzIiwiaXNFbXB0eSIsImdldCIsInNldHVwQ2FydCIsImNhcnQiLCJlbXB0eU9iamVjdCIsIml0ZW1zIiwiZmF2b3JpdGVzIiwic2V0IiwiaXRlbSIsInF1YW50aXR5IiwiaW5jcmVtZW50ZWQiLCJhbHJlYWR5RmF2b3JpdGVkIiwic3BsaWNlIiwidGFibGUiLCJhdHRyaWJ1dGVzIiwidHIiLCJ0ZCIsImF0dHJpYnV0ZSIsImltYWdlIiwic3JjIiwic3BhbiIsImh0bWwiLCJjdXJyZW5jeSIsImFtb3VudCIsImNvbHNwYW4iLCJjaGVja291dCIsInRleHQiLCJvbmNsaWNrIiwiZSIsInByZXZlbnREZWZhdWx0IiwicHVibGlzaCIsImJpbmQiLCJwYXJzZUZsb2F0IiwicHJpY2UiLCJ0b0ZpeGVkIiwiZmluZCIsInBvc2l0aW9uIiwiYWRkU3R5bGUiLCJjcmVhdGVMb2FkZXIiLCJwcmV2aWV3U3RhcnRMb2FkaW5nIiwiZ2V0Q2FydEl0ZW1zIiwiYWRkVG9QcmV2aWV3IiwiaW5zdGFuY2UiLCJzZXRUaW1lb3V0IiwicHJldmlld1N0b3BMb2FkaW5nIiwidG9nZ2xlQ2FydFByZXZpZXciLCJzdWJzY3JpYmUiLCJvcGVuQ2FydFByZXZpZXciLCJhZGRJdGVtIiwicmVsb2FkQ2FydFByZXZpZXciLCJmYXZvcml0ZUl0ZW0iLCJoYXNDbGFzcyIsInN3aXRjaENsYXNzZXMiLCJvcGVuaW5nIiwidG9nZ2xlQ2xhc3MiLCJzdHlsZSIsImRpc3BsYXkiLCJjbG9zZSIsImV2ZW50Iiwic3ZnIiwiY3JlYXRlRWxlbWVudE5TIiwiZyIsInBhdGgiLCJkaXYiLCJjb3VudCIsImdyb3VwcyIsInJlY3RhbmdlbHMiLCJhbmltYXRpb25zIiwicm90YXRpb24iLCJncm91cCIsInJlY3RhbmdlbCIsImJlZ2luIiwiYW5pbWF0ZSIsImRlZmF1bHRTZXR0aW5ncyQyIiwiQ29udGFpbmVyJDEiLCJGaWx0ZXIiLCJhZGRFdmVudExpc3RlbmVyIiwibWluV2lkdGgiLCJtaW5fd2lkdGgiLCJkZWZhdWx0U2V0dGluZ3MkMyIsIkNvbnRhaW5lciQyIiwiRXZlbnRNYW5hZ2VyJDMiLCJIdHRwJDEiLCJDaGVja291dCIsImhpZGVBbGwiLCJzaG93IiwiaGlkZSIsIkNvbXBvbmVudHMiLCJib290ZWQiLCJjb21wb25lbnQiLCJkZWZhdWx0U2V0dGluZ3MkNCIsIml0ZW1fY2xhc3MiLCJhZGRfYnV0dG9uX2NsYXNzIiwiZmF2b3JpdGVfYnV0dG9uX2NsYXNzIiwiQ29udGFpbmVyJDMiLCJFdmVudE1hbmFnZXIkNCIsIkh0dHAkMiIsImNodW5rZWRQcm9kdWN0cyIsIlByb2R1Y3RzIiwidG90YWxJdGVtcyIsImxvYWRQcm9kdWN0cyIsInBhZ2VOdW1iZXIiLCJQYWdpbmF0aW9uIiwibGltaXQiLCJwZXJfcGFnZSIsInByb2Nlc3NpbmciLCJsb2FkUGFnZVByb2R1Y3RzT25jZSIsImxvYWRQYWdlUHJvZHVjdHMiLCJyZXF1ZXN0IiwiZ2V0UHJvZHVjdHMiLCJ0aGVuIiwicHJvZHVjdHMiLCJjdXJyZW50SXRlbXMiLCJyZXBsYWNlUHJvZHVjdHMiLCJjYXRjaCIsInBhZ2VzIiwiY2FsY3VsYXRlQ2xpZW50UGFnZXMiLCJ0b3RhbF9pdGVtcyIsInBlclBhZ2UiLCJhcnJheV9jaHVuayIsInJhd1Byb2R1Y3RzIiwiaXNBcnJheSIsImJ1aWxkUHJvZHVjdHMiLCJwcm9kdWN0IiwiYWN0aW9uIiwiYXR0cmlidXRlc0NvbGxlY3Rpb24iLCJ0YWdUeXBlIiwiYnVpbHRQcm9kdWN0cyIsImJ1aWx0UHJvZHVjdCIsImJ1aWxkUHJvZHVjdCIsIm92ZXJsYXkiLCJhZGREZWZhdWx0QXR0cmlidXRlcyIsInRhZyIsIm91dGVySFRNTCIsInNwYW4yIiwiaW5fYXJyYXkiLCJrZWJhYkNhc2UiLCJhZGRUb0NhcnQiLCJ0eXBlIiwiZmF2b3JpdGUiLCJtYXhXaWR0aCIsIm1heF93aWR0aCIsIlNlcnZpY2VzIiwiVXJsIiwiY29udGVudCIsInVybFBhdGgiLCJ0aXRsZSIsImhpc3RvcnkiLCJwdXNoU3RhdGUiLCJvbnBvcHN0YXRlIiwic3RhdGUiLCJwYWdlVGl0bGUiLCJzZXBhcmF0b3IiLCJyZWdFeHAiLCJSZWdFeHAiLCJwYWlyU2VwYXJhdG9yIiwibWF0Y2giLCJwYXJhbWV0ZXJLZXkiLCJwYXJhbWV0ZXJWYWx1ZSIsInJlcXVlc3RlZFVybCIsImNoYW5nZVF1ZXJ5UGFyYW1ldGVyVmFsdWUiLCJsb2NhdGlvbiIsImhyZWYiLCJyZXBsYWNlU3RhdGUiLCJ2YXJzIiwicGFydHMiLCJtIiwiZGVmYXVsdE1lc3NhZ2UkNCIsIk5vdEluUGFnZVJhbmdlRXhjZXB0aW9uIiwiZGVmYXVsdFNldHRpbmdzJDUiLCJ1cmxfcGFyYW1ldGVyIiwiQ29udGFpbmVyJDQiLCJQcm9kdWN0cyQyIiwiRXZlbnRNYW5hZ2VyJDUiLCJzZXJ2aWNlcyIsInNldEN1cnJlbnQiLCJ0b3RhbFBhZ2VzIiwiY2FsY3VsYXRlVG90YWxQYWdlcyIsImJ1aWxkUGFnaW5hdGlvbiIsImxpbmtzIiwiY3JlYXRlTGlua3MiLCJyZXBsYWNlTGlua3MiLCJuZXh0IiwiY2hpbGROb2RlcyIsInJlcXVlc3RlZFBhZ2UiLCJjdXJyZW50Iiwibm90SW5QYWdlUmFuZ2UiLCJwcmV2aW91cyIsImdldEF0dHJpYnV0ZSIsImNoYW5nZVVybCIsInNldEFjdGl2ZUxpbmsiLCJ1bCIsImNyZWF0ZVBhZ2VMaW5rcyIsImNyZWF0ZVByZXZpb3VzQnV0dG9uIiwiY3JlYXRlTmV4dEJ1dHRvbiIsInBhZ2UiLCJwYWdlSXRlbSIsImxpbmsiLCJsaSIsInNwYW4xIiwiY2hhbmdlIiwiZGVmYXVsdE1lc3NhZ2UkNSIsIkNvbXBvbmVudE5vdFJlZ2lzdGVyZWRFeGNlcHRpb24iLCJDb21wb25lbnRzUHJvdmlkZXIiLCJjb21wb25lbnRzIiwiYXZhaWxhYmxlIiwiRXZlbnRzIiwiZXhpc3RzIiwibWFrZSIsImRlZmF1bHRNZXNzYWdlJDYiLCJJbnZhbGlkQmluZGluZ0V4Y2VwdGlvbiIsIkNvbnRhaW5lciQ1IiwiaW5zdGFuY2VzIiwicmVnaXN0ZXIiLCJyZWdpc3RlclByb3ZpZGVycyIsImNvbmNyZXRlIiwibmFtZXNwYWNlIiwiYWxpYXMiLCJpbnN0YW5jZUV4aXN0IiwiZ2V0SW5zdGFuY2UiLCJzZXRJbnN0YW5jZSIsImRlZmF1bHRTZXR0aW5ncyQ2IiwiZGVidWdfbGV2ZWwiLCJpbmplY3RfbGlicmFyaWVzIiwibG9hZGluZ19hbmltYXRpb24iLCJleHRlcm5hbExpYnJhcmllcyIsImJvb3RzdHJhcCIsInNldERlYnVnTGV2ZWwiLCJsb2FkRXh0ZXJuYWxMaWJyYXJpZXMiLCJzdGFydExvYWRpbmciLCJQcm94eSIsInNob3AiLCJwcm92aWRlIiwibGlicmFyaWVzIiwidWNmaXJzdCIsImFkZExpbmtlZFN0eWxlIiwiZG9jdW1lbnRFbGVtZW50IiwiY2xpZW50V2lkdGgiLCJmaWxsIiwiYm9keSIsInByb2dyZXNzIiwibWF4U2l6ZSIsInJlcXVlc3RBbmltYXRpb25GcmFtZSIsInByb2dyZXNzRHJhdyIsInRyYW5zZm9ybSIs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QUFDRDs7QUFFRCxRQUFPcmIsY0FBUDtBQUVDLENBLy9HcUIsRUFBdEIiLCJmaWxlIjoiVHVyYm9FY29tbWVyY2UuanMiLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgVHVyYm9FY29tbWVyY2UgPSAoZnVuY3Rpb24gKCkge1xuJ3VzZSBzdHJpY3QnO1xuXG4vKipcclxuICogQGZpbGUgXHJcbiAqIFN0ciBjbGFzcy5cclxuICpcclxuICogQWRkcyBzb21lIHVzZWZ1bCBmdW5jdGlvbmFsaXR5IGZvclxyXG4gKiBtYW5pcHVsYXRpbmcgc3RyaW5ncyBvciBjcmVhdGluZyBzdHJpbmcuXHJcbiAqL1xyXG5cclxuY2xhc3MgU3RyXHJcbntcclxuXHQvKipcclxuXHQgKiBDb252ZXJ0IGNhbWVsQ2FzZSB0byBrZWJhYi1jYXNlLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIHN0cmluZyB8IHN0cmluZ1xyXG5cdCAqIEByZXR1cm4gc3RyaW5nXHJcblx0ICovXHJcblx0c3RhdGljIGtlYmFiQ2FzZShzdHJpbmcpIFxyXG5cdHtcclxuXHRcdHJldHVybiBzdHJpbmcucmVwbGFjZSgvKFthLXpdKShbQS1aXSkvZywgJyQxLSQyJykudG9Mb3dlckNhc2UoKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEdlbmVyYXRlcyBhIHJhbmRvbSBzdHJpbmcuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gaW50ZWdlciB8IGxlbmd0aFxyXG5cdCAqIEByZXR1cm4gc3RyaW5nXHJcblx0ICovXHJcblx0c3RhdGljIHJhbmRvbShsZW5ndGgpIFxyXG5cdHtcclxuXHRcdGxldCBzdHJpbmcgPSAnJztcclxuXHRcdGxldCBwb3NzaWJsZSA9IFwiQUJDREVGR0hJSktMTU5PUFFSU1RVVldYWVphYmNkZWZnaGlqa2xtbm9wcXJzdHV2d3h5ejAxMjM0NTY3ODlcIjtcclxuXHJcblx0XHRmb3IgKGxldCBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XHJcblx0ICAgIFx0c3RyaW5nICs9IHBvc3NpYmxlLmNoYXJBdChNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBwb3NzaWJsZS5sZW5ndGgpKTtcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gc3RyaW5nO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQ2hhbmdlcyB0aGUgZmlyc3QgbGV0dGVyIFxyXG5cdCAqIG9mIHRoZSBzdHJpbmcgdG8gdXBwZXJjYXNlLlxyXG5cdCAqIFxyXG5cdCAqIEBwYXJhbSBzdHJpbmcgfCBzdHJpbmdcclxuXHQgKiBAcmV0dXJuIHN0cmluZ1xyXG5cdCAqL1xyXG5cdHN0YXRpYyB1Y2ZpcnN0KHN0cmluZykgXHJcblx0e1xyXG5cdCAgICByZXR1cm4gc3RyaW5nLmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpICsgc3RyaW5nLnNsaWNlKDEpO1xyXG5cdH1cclxufVxuXG4vKipcclxuICogU3RvcmVzIHRoZSBkZWJ1ZyBsZXZlbC5cclxuICpcclxuICogQHZhciBzdHJpbmcgXHJcbiAqL1xyXG5sZXQgZGVidWdMZXZlbDtcclxuXHJcbmNsYXNzIEV4Y2VwdGlvbkhhbmRsZXJcclxue1xyXG5cdC8qKlxyXG5cdCAqIFNldHRlciBmb3IgdGhlIGRlYnVnIGxldmVsLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIHN0cmluZyB8IGxldmVsXHJcblx0ICogQHJldHVybiB2b2lkXHJcblx0ICovXHJcblx0c3RhdGljIHNldCBzZXREZWJ1Z0xldmVsKGxldmVsKVxyXG5cdHtcclxuXHRcdC8vIFN1cHByZXNzIGVycm9ycyBkZXBlbmRzIG9uIHRoZSBkZWJ1ZyBsZXZlbC5cclxuXHRcdGlmIChsZXZlbCA9PSAnd2FybmluZycgfHwgbGV2ZWwgPT0gJ2luZm8nKSB7XHJcblx0XHRcdHdpbmRvdy5vbmVycm9yID0gZnVuY3Rpb24oKSB7IHJldHVybiB0cnVlOyB9O1xyXG5cdFx0fVxyXG5cclxuXHRcdGRlYnVnTGV2ZWwgPSBsZXZlbDtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEV4dGVuZGVkIGNvbnN0cnVjdG9yLCBjYXB0dXJlcyB0aGVcclxuXHQgKiBzdGFjayB0cmFjZS5cclxuXHQgKlxyXG5cdCAqIEByZXR1cm4gdm9pZFxyXG5cdCAqL1xyXG5cdGNvbnN0cnVjdG9yKClcclxuXHR7XHJcblx0XHRpZiAoRXJyb3IuY2FwdHVyZVN0YWNrVHJhY2UpIHtcclxuXHRcdFx0RXJyb3IuY2FwdHVyZVN0YWNrVHJhY2UodGhpcywgdGhpcy5jb25zdHJ1Y3Rvci5uYW1lKTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEhhbmRsZXMgYWxsIGV4Y2VwdGlvbnMuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gb2JqZWN0IHwgZXJyb3IgfCBUaHJvd2VuIEV4Y2VwdGlvbiBPYmplY3RcclxuXHQgKiBAcGFyYW0gc3RyaW5nIHwgbWVzc2FnZVxyXG5cdCAqIEByZXR1cm4gdm9pZFxyXG5cdCAqL1xyXG5cdHN0YWNrVHJhY2UoZXJyb3IsIG1lc3NhZ2UpIFxyXG5cdHtcclxuXHRcdHRoaXMuY3VzdG9tQWN0aW9ucyhlcnJvciwgbWVzc2FnZSk7XHJcblxyXG5cdFx0c3dpdGNoKGRlYnVnTGV2ZWwpXHJcblx0XHR7XHJcblx0XHRcdGNhc2UgJ2Vycm9yJzogdGhpcy5oYW5kbGVFcnJvcnMoZXJyb3IsIG1lc3NhZ2UpOyBicmVhaztcclxuXHRcdFx0Y2FzZSAnd2FybmluZyc6IHRoaXMuaGFuZGxlV2FybmluZ3MoZXJyb3IsIG1lc3NhZ2UpOyBicmVhaztcclxuXHRcdFx0Y2FzZSAnaW5mbyc6IHRoaXMuaGFuZGxlSW5mb3MoZXJyb3IsIG1lc3NhZ2UpOyBicmVhaztcclxuXHRcdFx0ZGVmYXVsdDogdGhpcy5oYW5kbGVJbmZvcyhlcnJvciwgbWVzc2FnZSk7IGJyZWFrO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogVGFrZSBhY3Rpb24gZm9yIHNwZWNpZmljIEV4Y2VwdGlvbnMuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gb2JqZWN0IHwgZXJyb3IgfCBUaHJvd2VuIEV4Y2VwdGlvbiBPYmplY3RcclxuXHQgKiBAcGFyYW0gc3RyaW5nIHwgbWVzc2FnZVxyXG5cdCAqIEByZXR1cm4gYm9vbFxyXG5cdCAqL1xyXG5cdGN1c3RvbUFjdGlvbnMoZXJyb3IsIG1lc3NhZ2UpXHJcblx0e1xyXG5cdFx0aWYgKGVycm9yLmNvbnN0cnVjdG9yLm5hbWUgPT0gJ0ludmFsaWRBcmd1bWVudEV4Y2VwdGlvbicpIHtcclxuXHRcdFx0Ly8gaGFuZGxlXHJcblx0XHR9IGVsc2UgaWYgKGVycm9yLmNvbnN0cnVjdG9yLm5hbWUgPT0gJ0ludmFsaWRCaW5kaW5nRXhjZXB0aW9uJykge1xyXG5cdFx0XHQvLyBoYW5kbGVcclxuXHRcdH0gZWxzZSBpZiAoZXJyb3IuY29uc3RydWN0b3IubmFtZSA9PSAnQmFkRXZlbnRDYWxsRXhjZXB0aW9uJykge1xyXG5cdFx0XHQvLyBoYW5kbGVcclxuXHRcdH0gZWxzZSBpZiAoZXJyb3IuY29uc3RydWN0b3IubmFtZSA9PSAnQ29tcG9uZW50c0V4Y2VwdGlvbicpIHtcclxuXHRcdFx0Ly8gaGFuZGxlXHJcblx0XHR9IGVsc2UgaWYgKGVycm9yLmNvbnN0cnVjdG9yLm5hbWUgPT0gJ0NvbXBvbmVudE5vdFJlZ2lzdGVyZWRFeGNlcHRpb24nKSB7XHJcblx0XHRcdC8vIGhhbmRsZVxyXG5cdFx0fSBlbHNlIGlmIChlcnJvci5jb25zdHJ1Y3Rvci5uYW1lID09ICdOb3RJblBhZ2VSYW5nZUV4Y2VwdGlvbicpIHtcclxuXHRcdFx0Ly8gaGFuZGxlXHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIGZhbHNlO1xyXG5cdH1cclxuXHJcblx0aGFuZGxlRXJyb3JzKGVycm9yLCBtZXNzYWdlKVxyXG5cdHtcclxuXHRcdGNvbnNvbGUuZXJyb3IoZXJyb3IuY29uc3RydWN0b3IubmFtZSArICc6ICcgKyBtZXNzYWdlKTtcclxuXHR9XHJcblxyXG5cdGhhbmRsZVdhcm5pbmdzKGVycm9yLCBtZXNzYWdlKVxyXG5cdHtcclxuXHRcdGNvbnNvbGUud2FybihlcnJvci5jb25zdHJ1Y3Rvci5uYW1lICsgJzogJyArIG1lc3NhZ2UpO1xyXG5cdH1cclxuXHJcblx0aGFuZGxlSW5mb3MoZXJyb3IsIG1lc3NhZ2UpXHJcblx0e1xyXG5cdFx0Y29uc29sZS5pbmZvKGVycm9yLmNvbnN0cnVjdG9yLm5hbWUgKyAnOiAnICsgbWVzc2FnZSk7XHJcblx0fVxyXG59XG5cbmxldCBkZWZhdWx0TWVzc2FnZSA9ICdBbiBpbnZhbGlkIGFyZ3VtZW50IHdhcyBwYXNzZWQuJztcclxuXHJcbmNsYXNzIEludmFsaWRBcmd1bWVudEV4Y2VwdGlvbiQxIGV4dGVuZHMgRXhjZXB0aW9uSGFuZGxlclxyXG57XHJcblx0Y29uc3RydWN0b3IobWVzc2FnZSA9IG51bGwpIFxyXG5cdHtcclxuXHRcdG1lc3NhZ2UgPSBtZXNzYWdlIHx8IGRlZmF1bHRNZXNzYWdlO1xyXG5cdFx0c3VwZXIobWVzc2FnZSk7XHJcbiAgICBcdHN1cGVyLnN0YWNrVHJhY2UodGhpcywgbWVzc2FnZSk7XHJcbiAgICB9XHJcbn1cblxuLyoqXHJcbiAqIEBmaWxlIFxyXG4gKiBET00gY2xhc3MuXHJcbiAqXHJcbiAqIEFkZHMgc29tZSB1c2VmdWwgZnVuY3Rpb25hbGl0eSBmb3JcclxuICogZmV0Y2hpbmcgb3IgbWFuaXB1bGF0aW5nIERPTSBlbGVtZW50cy5cclxuICovXHJcblxyXG5jbGFzcyBET01cclxue1xyXG5cdC8qKlxyXG5cdCAqIE1pbmlmaWVzIHRoZSBjc3MgdGV4dC5cclxuXHQgKiBcclxuXHQgKiBAcGFyYW0gc3RyaW5nIHwgc3RyaW5nXHJcblx0ICogQHJldHVybiBzdHJpbmdcclxuXHQgKi9cclxuXHRzdGF0aWMgbWluaWZ5Q3NzKHN0cmluZykgXHJcblx0e1xyXG5cdCAgICBzdHJpbmcgPSBzdHJpbmcucmVwbGFjZSgvXFwvXFwqKD86KD8hXFwqXFwvKVtcXHNcXFNdKSpcXCpcXC98W1xcclxcblxcdF0rL2csICcnKTtcclxuXHQgICAgc3RyaW5nID0gc3RyaW5nLnJlcGxhY2UoLyB7Mix9L2csICcgJyk7XHJcblx0ICAgIHN0cmluZyA9IHN0cmluZy5yZXBsYWNlKC8oW3s6fV0pL2csICckMScpO1xyXG5cdCAgICBzdHJpbmcgPSBzdHJpbmcucmVwbGFjZSgvKFs7LF0pIC9nLCAnJDEnKTtcclxuXHQgICAgc3RyaW5nID0gc3RyaW5nLnJlcGxhY2UoLyAhL2csICchJyk7XHJcblx0ICAgIFxyXG5cdCAgICByZXR1cm4gc3RyaW5nO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogU3dpdGNoZXMgYmV0d2VlbiB0d28gZ2l2ZW4gY2xhc3Nlcy5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSBvYmplY3QgfCBlbGVtZW50XHJcblx0ICogQHBhcmFtIHN0cmluZyB8IGNsYXNzTmFtZVxyXG5cdCAqIEBwYXJhbSBzdHJpbmcgfCBuZXdDbGFzc05hbWVcclxuXHQgKiBAcmV0dXJuIG9iamVjdFxyXG5cdCAqL1xyXG5cdHN0YXRpYyBzd2l0Y2hDbGFzc2VzKGVsZW1lbnQsIGNsYXNzTmFtZSwgbmV3Q2xhc3NOYW1lKSBcclxuXHR7XHJcblx0XHR0aGlzLnJlbW92ZUNsYXNzKGVsZW1lbnQsIGNsYXNzTmFtZSk7XHJcblx0XHR0aGlzLmFkZENsYXNzKGVsZW1lbnQsIG5ld0NsYXNzTmFtZSk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBBZGRzIGNsYXNzIHRvIGEgZ2l2ZW4gZWxlbWVudC5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSBvYmplY3QgfCBlbGVtZW50XHJcblx0ICogQHBhcmFtIHN0cmluZyB8IGNsYXNzTmFtZVxyXG5cdCAqIEByZXR1cm4gb2JqZWN0XHJcblx0ICovXHJcblx0c3RhdGljIGFkZENsYXNzKGVsZW1lbnQsIGNsYXNzTmFtZSkgXHJcblx0e1xyXG5cdFx0aWYoZWxlbWVudCA9PT0gbnVsbCkge1xyXG5cdFx0XHR0aHJvdyBuZXcgSW52YWxpZEFyZ3VtZW50RXhjZXB0aW9uJDE7XHJcblx0XHR9XHJcblxyXG5cdFx0aWYoISBjbGFzc05hbWUgfHwgY2xhc3NOYW1lID09ICcnIHx8IHR5cGVvZiBjbGFzc05hbWUgPT09IHVuZGVmaW5lZCkge1xyXG5cdFx0XHRyZXR1cm4gZWxlbWVudDtcclxuXHRcdH1cclxuXHJcblx0XHRsZXQgY2xhc3NOYW1lcyA9IGNsYXNzTmFtZS5zcGxpdCgnICcpO1xyXG5cclxuXHRcdGNsYXNzTmFtZXMuZm9yRWFjaChmdW5jdGlvbihuYW1lKSB7XHJcblx0XHRcdGVsZW1lbnQuY2xhc3NMaXN0LmFkZChuYW1lKTtcclxuXHRcdH0pO1xyXG5cdFx0XHJcblx0XHRyZXR1cm4gZWxlbWVudDtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIENoZWNrcyBpZiBhbiBlbGVtZW50IGhhcyBhIGNsYXNzLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIEhUTUxFbGVtZW50IHwgZWxlbWVudFxyXG5cdCAqIEBwYXJhbSBzdHJpbmcgfCBjbGFzc05hbWVcclxuXHQgKiBAcmV0dXJuIGJvb2xcclxuXHQgKi9cclxuXHRzdGF0aWMgaGFzQ2xhc3MoZWxlbWVudCwgY2xhc3NOYW1lKVxyXG5cdHtcclxuXHRcdGlmIChlbGVtZW50ID09PSBudWxsKSB7XHJcblx0XHRcdHRocm93IG5ldyBJbnZhbGlkQXJndW1lbnRFeGNlcHRpb24kMSgnaGFzQ2xhc3MoKSBleHBlY3RzIHRoZSBmaXJzdCBhcmd1bWVudCB0byBiZSBhbiBIVE1MRWxlbWVudCBidXQgbnVsbCB3YXMgcGFzc2VkLicpO1xyXG5cdFx0fVxyXG5cclxuXHRcdGlmICghIGNsYXNzTmFtZSB8fCBjbGFzc05hbWUgPT0gJycgfHwgdHlwZW9mIGNsYXNzTmFtZSA9PSAndW5kZWZpbmVkJykge1xyXG5cdFx0XHRyZXR1cm47XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIGVsZW1lbnQuY2xhc3NOYW1lLmluZGV4T2YoY2xhc3NOYW1lKSAhPSAtMTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFJlbW92ZXMgY2xhc3MgZnJvbSBhIGdpdmVuIGVsZW1lbnQuXHJcblx0ICogXHJcblx0ICogQHBhcmFtIG9iamVjdCB8IGVsZW1lbnRcclxuXHQgKiBAcGFyYW0gc3RyaW5nIHwgY2xhc3NOYW1lXHJcblx0ICogQHJldHVybiBvYmplY3RcclxuXHQgKi9cclxuXHRzdGF0aWMgcmVtb3ZlQ2xhc3MoZWxlbWVudCwgY2xhc3NOYW1lKSBcclxuXHR7XHJcblx0XHRpZihlbGVtZW50ID09IG51bGwpIHtcclxuXHRcdFx0dGhyb3cgbmV3IEludmFsaWRBcmd1bWVudEV4Y2VwdGlvbiQxO1xyXG5cdFx0fVxyXG5cclxuXHRcdGlmKGNsYXNzTmFtZSA9PSAnJykge1xyXG5cdFx0XHRlbGVtZW50LmNsYXNzTmFtZSA9ICcnO1xyXG5cdFx0fSBlbHNlIHtcclxuXHJcblx0XHRcdGxldCBjbGFzc05hbWVzID0gY2xhc3NOYW1lLnNwbGl0KCcgJyk7XHJcblxyXG5cdFx0XHRjbGFzc05hbWVzLmZvckVhY2goZnVuY3Rpb24obmFtZSkge1xyXG5cdFx0XHRcdGVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShuYW1lKTtcclxuXHRcdFx0fSk7XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIGVsZW1lbnQ7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBSZW1vdmVzIGFuIGVsZW1lbnQgZnJvbSB0aGUgRE9NLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIEhUTUxFbGVtZW50XHJcblx0ICogQHJldHVybiB2b2lkXHJcblx0ICovXHJcblx0c3RhdGljIHJlbW92ZShlbGVtZW50KVxyXG5cdHtcclxuXHRcdGVsZW1lbnQucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChlbGVtZW50KTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEFkZHMgc3R5bGUgdGFnIHdpdGggZ2l2ZW4gaWQgYW5kIGNzcyB0byB0aGUgRE9NLlxyXG5cdCAqIFxyXG5cdCAqIEBwYXJhbSBzdHJpbmcgfCBpZFxyXG5cdCAqIEBwYXJhbSBzdHJpbmcgfCBjc3NcclxuXHQgKiBAcmV0dXJuIHZvaWRcclxuXHQgKi9cclxuXHRzdGF0aWMgYWRkU3R5bGUoaWQsIGNzcylcclxuXHR7XHJcblx0XHRpZiAodHlwZW9mIGNzcyAhPSAnc3RyaW5nJykge1xyXG5cdFx0XHR0aHJvdyBuZXcgSW52YWxpZEFyZ3VtZW50RXhjZXB0aW9uJDE7XHJcblx0XHR9XHJcblxyXG5cdFx0bGV0IGhlYWQgPSBkb2N1bWVudC5oZWFkIHx8IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdoZWFkJylbMF07XHJcblx0XHRsZXQgc3R5bGVUYWcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzdHlsZScpO1xyXG5cclxuXHRcdC8vIHBpcGUgaXQgdGhyb3VnaCB0aGUgbWluZmllclxyXG5cdCAgICBsZXQgQ1NTID0gdGhpcy5taW5pZnlDc3MoY3NzKTtcclxuXHQgICAgLy8gYWRkaW5nIGl0IHRvIHRoZSBzdHlsZXRhZ1xyXG5cdCAgICBzdHlsZVRhZy5pbm5lckhUTUwgPSBDU1M7XHJcblx0ICAgIC8vIGdpdmUgYW4gaWQgdG8gcmVjb2duaXplIHRoZSBzdHlsZSB0YWdcclxuXHRcdHN0eWxlVGFnLnNldEF0dHJpYnV0ZSgnaWQnLCBpZCk7XHJcblx0XHQvLyBhcHBlbmRpbmcgdGhhdCBzdHlsZSB0YWcgdG8gdGhlIERPTSBoZWFkIHRhZ1xyXG5cdFx0aGVhZC5hcHBlbmRDaGlsZChzdHlsZVRhZyk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBBZGRzIGxpbmtlZCBzdHlsZSB0YWcgd2l0aCBnaXZlbiBpZCBhbmQgc3JjIHRvIHRoZSBET00uXHJcblx0ICogXHJcblx0ICogQHBhcmFtIHN0cmluZyB8IGlkXHJcblx0ICogQHBhcmFtIHN0cmluZyB8IHNvdXJjZVxyXG5cdCAqIEByZXR1cm4gdm9pZFxyXG5cdCAqL1xyXG5cdHN0YXRpYyBhZGRMaW5rZWRTdHlsZShpZCwgc291cmNlKSBcclxuXHR7XHJcblx0XHRpZiAodHlwZW9mIHNvdXJjZSAhPSAnc3RyaW5nJykge1xyXG5cdFx0XHR0aHJvdyBuZXcgSW52YWxpZEFyZ3VtZW50RXhjZXB0aW9uJDEoJ0RPTS5hZGRMaW5rZWRTdHlsZSgpIGV4Y3BlY3RzIHRoZSBzZWNvbmQgcGFyYW1ldGVyIHRvIGJlIHN0cmluZywgYnV0ICcgKyB0eXBlb2Ygc291cmNlICsgJyB3YXMgcGFzc2VkIGluc3RlYWQuJyk7XHJcblx0XHR9XHJcblxyXG5cdFx0bGV0IGhlYWQgPSBkb2N1bWVudC5oZWFkIHx8IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdoZWFkJylbMF07XHJcblx0XHRsZXQgbGlua2VkU3R5bGVUYWcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaW5rJyk7XHJcblxyXG5cdCAgICAvLyBnaXZlIGFuIGlkIHRvIHJlY29nbml6ZSB0aGUgc3R5bGUgdGFnXHJcblx0XHRsaW5rZWRTdHlsZVRhZy5zZXRBdHRyaWJ1dGUoJ2lkJywgaWQpO1xyXG5cdFx0bGlua2VkU3R5bGVUYWcuc2V0QXR0cmlidXRlKCdocmVmJywgc291cmNlKTtcclxuXHRcdGxpbmtlZFN0eWxlVGFnLnNldEF0dHJpYnV0ZSgncmVsJywgJ3N0eWxlc2hlZXQnKTtcclxuXHRcdGxpbmtlZFN0eWxlVGFnLnNldEF0dHJpYnV0ZSgndHlwZScsICd0ZXh0L2NzcycpO1xyXG5cdFx0Ly8gYXBwZW5kaW5nIHRoYXQgc3R5bGUgdGFnIHRvIHRoZSBET00gaGVhZCB0YWdcclxuXHRcdGhlYWQuYXBwZW5kQ2hpbGQobGlua2VkU3R5bGVUYWcpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQ3JlYXRlcyBhbiBlbGVtZW50IHdpdGggdGhlIGdpdmVuIG9wdGlvbnMuXHJcblx0ICogXHJcblx0ICogQHBhcmFtIHN0cmluZyB8IGVsZW1lbnRUeXBlXHJcblx0ICogQHBhcmFtIG9iamVjdCB8IG9wdGlvbnNcclxuXHQgKiBAcmV0dXJuIEhUTUxFbGVtZW50XHJcblx0ICovXHJcblx0c3RhdGljIGNyZWF0ZUVsZW1lbnQoZWxlbWVudFR5cGUsIG9wdGlvbnMpXHJcblx0e1xyXG5cdFx0bGV0IGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KGVsZW1lbnRUeXBlKTtcclxuXHRcclxuXHRcdGlmIChvcHRpb25zID09PSB1bmRlZmluZWQpIHtcclxuXHRcdFx0cmV0dXJuIGVsZW1lbnQ7XHJcblx0XHR9XHJcblxyXG5cdFx0Zm9yIChsZXQgb3B0aW9uIGluIG9wdGlvbnMpIHtcclxuXHRcdFx0c3dpdGNoKG9wdGlvbilcclxuXHRcdFx0e1xyXG5cdFx0XHRcdGNhc2UgJ3RleHQnOlxyXG5cdFx0XHRcdGNhc2UgJ2h0bWwnOlxyXG5cdFx0XHRcdFx0ZWxlbWVudC5pbm5lckhUTUwgPSBvcHRpb25zW29wdGlvbl07XHJcblx0XHRcdFx0XHRicmVhaztcclxuXHRcdFx0XHRkZWZhdWx0OlxyXG5cdFx0XHRcdFx0ZWxlbWVudC5zZXRBdHRyaWJ1dGUob3B0aW9uLCBvcHRpb25zW29wdGlvbl0pO1xyXG5cdFx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gZWxlbWVudDtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFRvZ2dsZXMgdGhlIGdpdmVuIGNsYXNzZXMuXHJcblx0ICogXHJcblx0ICogQHBhcmFtIG9iamVjdCB8IGVsZW1lbnRcclxuXHQgKiBAcGFyYW0gc3RyaW5nIHwgY2xhc3NOYW1lXHJcblx0ICogQHJldHVybiBib29sXHJcblx0ICovXHJcblx0c3RhdGljIHRvZ2dsZUNsYXNzKGVsZW1lbnQsIGNsYXNzTmFtZSwgc2Vjb25kQ2xhc3NOYW1lKVxyXG5cdHtcclxuXHRcdGlmIChlbGVtZW50ID09IG51bGwgfHwgdHlwZW9mIGVsZW1lbnQgPT0gJ3VuZGVmaW5lZCcpIHtcclxuXHRcdFx0dGhyb3cgbmV3IEludmFsaWRBcmd1bWVudEV4Y2VwdGlvbiQxO1xyXG5cdFx0fVxyXG5cclxuXHRcdHNlY29uZENsYXNzTmFtZSA9IHNlY29uZENsYXNzTmFtZSB8fCB1bmRlZmluZWQ7XHJcblxyXG5cdFx0aWYoc2Vjb25kQ2xhc3NOYW1lKSB7XHJcblx0XHRcdGVsZW1lbnQuY2xhc3NMaXN0LnRvZ2dsZShzZWNvbmRDbGFzc05hbWUpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiBlbGVtZW50LmNsYXNzTGlzdC50b2dnbGUoY2xhc3NOYW1lKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEZpbmRzIGFuIGVsZW1lbnQgaW5zaWRlIG9mIHBhcmVudC5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSBzdHJpbmcgfCBzZWxlY3RvclxyXG5cdCAqIEBwYXJhbSBvYmplY3QgfCBjb250ZXh0XHJcblx0ICogQHJldHVybiBtaXhlZFxyXG5cdCAqL1xyXG5cdHN0YXRpYyBmaW5kKHNlbGVjdG9yLCBjb250ZXh0ID0gd2luZG93LmRvY3VtZW50KSBcclxuXHR7XHJcblx0XHRyZXR1cm4gcXVlcnlFbGVtZW50KHNlbGVjdG9yLCBjb250ZXh0KTtcclxuXHR9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBRdWVyaWVzIGFuIGVsZW1lbnQgZnJvbSB0aGUgRE9NLlxyXG4gKlxyXG4gKiBAcGFyYW0gc3RyaW5nIHwgc2VsZWN0b3JcclxuICogQHBhcmFtIG9iamVjdCB8IHBhcmVudEVsZW1lbnRcclxuICogQHJldHVybiBtaXhlZFxyXG4gKi9cclxuZnVuY3Rpb24gcXVlcnlFbGVtZW50KHNlbGVjdG9yLCBwYXJlbnRFbGVtZW50KSBcclxue1xyXG5cdGlmICh0eXBlb2Ygc2VsZWN0b3IgIT0gJ3N0cmluZycpIHtcclxuXHRcdHRocm93IG5ldyBJbnZhbGlkQXJndW1lbnRFeGNlcHRpb24kMSgncXVlcnlFbGVtZW50KCkgZXhwZWN0cyBmaXJzdCBwYXJhbWV0ZXIgdG8gYmUgYSBzdHJpbmcsIGJ1dCAnICsgdHlwZW9mIHNlbGVjdG9yICsgJyB3YXMgcGFzc2VkIGluc3RlYWQuJyk7XHJcblx0fVxyXG5cclxuXHRsZXQgZWxlbWVudCA9IHBhcmVudEVsZW1lbnQucXVlcnlTZWxlY3RvckFsbChzZWxlY3Rvcik7XHJcblxyXG5cdGlmIChlbGVtZW50Lmxlbmd0aCA9PSAwKSB7XHJcblx0XHRyZXR1cm4gbnVsbDtcclxuXHR9XHJcblxyXG5cdHJldHVybiAoZWxlbWVudC5sZW5ndGggPiAxKSA/IGVsZW1lbnQgOiBlbGVtZW50WzBdO1xyXG59XHJcblxyXG4vKipcclxuICogQ2hlY2tzIGlmIHBhcmVudCBoYXMgY2hpbGQuXHJcbiAqXHJcbiAqIEBwYXJhbSBvYmplY3QgfCBwYXJlbnRFbGVtZW50XHJcbiAqIEBwYXJhbSBvYmplY3QgfCBjaGlsZEVsZW1lbnRcclxuICogQHJldHVybiBib29sXHJcbiAqL1xyXG5mdW5jdGlvbiBoYXNDaGlsZChwYXJlbnRFbGVtZW50LCBjaGlsZEVsZW1lbnQpIFxyXG57XHJcbiAgICAgbGV0IG5vZGUgPSBjaGlsZEVsZW1lbnQucGFyZW50Tm9kZTtcclxuICAgICBcclxuICAgICB3aGlsZSAobm9kZSAhPSBudWxsKSB7XHJcbiAgICAgICAgIGlmIChub2RlID09IHBhcmVudEVsZW1lbnQpIHtcclxuICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICB9XHJcbiAgICAgICAgIG5vZGUgPSBub2RlLnBhcmVudE5vZGU7XHJcbiAgICAgfVxyXG4gICAgIFxyXG4gICAgIHJldHVybiBmYWxzZTtcclxufVxuXG4vKipcclxuICogQGZpbGUgXHJcbiAqIENvbW1vbiBjbGFzcy5cclxuICpcclxuICogQWRkcyBzb21lIHVzZWZ1bCBmdW5jdGlvbmFsaXR5IGZvclxyXG4gKiBjb21tb24gdGFza3MgLSBkYXRhIGNoZWNrcyBvciBkYXRhIG1hbmlwdWxhdGlvbi5cclxuICovXHJcblxyXG5jbGFzcyBDb21tb25cclxue1xyXG5cdC8qKlxyXG5cdCAqIEV4dGVuZCBhbiBvYmplY3QuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gb2JqZWN0IHwgY3VycmVudE9iamVjdFxyXG5cdCAqIEBwYXJhbSBvYmplY3QgfCBuZXdPYmplY3RcclxuXHQgKiBAcmV0dXJuIG9iamVjdFxyXG5cdCAqL1xyXG5cdHN0YXRpYyBleHRlbmQoY3VycmVudE9iamVjdCwgbmV3T2JqZWN0KSB7XHJcblx0XHR2YXIgZXh0ZW5kZWQgPSB7fTtcclxuXHQgICAgdmFyIHByb3A7XHJcblxyXG5cdCAgICBmb3IgKHByb3AgaW4gY3VycmVudE9iamVjdCkge1xyXG5cdCAgICAgICAgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChjdXJyZW50T2JqZWN0LCBwcm9wKSkge1xyXG5cdCAgICAgICAgICAgIGV4dGVuZGVkW3Byb3BdID0gY3VycmVudE9iamVjdFtwcm9wXTtcclxuXHQgICAgICAgIH1cclxuXHQgICAgfVxyXG5cclxuXHQgICAgZm9yIChwcm9wIGluIG5ld09iamVjdCkge1xyXG5cdCAgICAgICAgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChuZXdPYmplY3QsIHByb3ApKSB7XHJcblx0ICAgICAgICAgICAgZXh0ZW5kZWRbcHJvcF0gPSBuZXdPYmplY3RbcHJvcF07XHJcblx0ICAgICAgICB9XHJcblx0ICAgIH1cclxuXHJcblx0ICAgIHJldHVybiBleHRlbmRlZDtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIENoZWNrcyBmb3IgYSBuZWVkbGUgaW4gaHlzdGFjayBhcnJheS5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSBtaXhlZCB8IG5lZWRsZVxyXG5cdCAqIEBwYXJhbSBvYmplY3QgfCBvYmplY3RcclxuXHQgKiBAcmV0dXJuIGJvb2xcclxuXHQgKlxyXG5cdCAqL1xyXG5cdHN0YXRpYyBpbl9hcnJheShuZWVkbGUsIGh5c3RhY2spIHtcclxuXHRcdGlmICh0eXBlb2YgaHlzdGFjayA9PSAndW5kZWZpbmVkJyB8fCBoeXN0YWNrLmNvbnN0cnVjdG9yICE9PSBBcnJheSkge1xyXG5cdFx0XHR0aHJvdyBuZXcgSW52YWxpZEFyZ3VtZW50RXhjZXB0aW9uJDEoJ0NvbW1vbi5pbl9hcnJheSgpIGV4cGVjdHMgdGhlIHNlY29uZCBwYXJhbWV0ZXIgdG8gYmUgYW4gYXJyYXksIGJ1dCAnICsgdHlwZW9mIGh5c3RhY2sgKyAnIHdhcyBwYXNzZCBpbnN0ZWFkJyk7XHJcblx0XHR9XHJcblxyXG5cdFx0Zm9yICh2YXIgaSA9IDA7IGkgPD0gaHlzdGFjay5sZW5ndGg7IGkrKykge1xyXG5cdFx0XHRpZiAobmVlZGxlID09IGh5c3RhY2tbaV0pIHtcclxuXHRcdFx0XHRyZXR1cm4gdHJ1ZTtcdFxyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0XHJcblx0XHRyZXR1cm4gZmFsc2U7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBUYWtlcyBhbiBhcnJheSBhbmQgY2h1bmtzIGl0LlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIGFycmF5IHwgdG90YWxcclxuXHQgKiBAcGFyYW0gbnVtYmVyIHwgY2h1bmtzXHJcblx0ICogQHJldHVybiBhcnJheVxyXG5cdCAqL1xyXG5cdHN0YXRpYyBhcnJheV9jaHVuayh0b3RhbCwgc2l6ZSA9IDUpXHJcblx0eyAgICAgICAgXHJcbiAgICAgIFx0aWYgKGlzTmFOKHNpemUpKSB7XHJcbiAgICAgIFx0XHR0aHJvdyBuZXcgSW52YWxpZEFyZ3VtZW50RXhjZXB0aW9uJDEoJ0NvbW1vbi5hcnJheV9jaHVuaygpIGV4cGVjdHMgdGhlIHNlY29uZCBwYXJhbWV0ZXIgdG8gYmUgYSBudW1iZXIsIGJ1dCAnICsgdHlwZW9mIHNpemUgKyAnIHBhc3NlZCBpbnN0ZWFkLicpXHJcbiAgICAgIFx0fVxyXG5cclxuICAgICAgXHRzaXplID0gcGFyc2VJbnQoc2l6ZSk7XHJcbiAgICAgICBcclxuICAgICAgIFx0bGV0IGk7XHJcbiAgICAgICBcdGxldCBjb2xsZWN0aW9uID0gW107XHJcblxyXG4gICAgICAgIC8vIGFkZCBlYWNoIGNodW5rIHRvIHRoZSByZXN1bHRcclxuICAgICAgICBmb3IgKGkgPSAwOyBpIDwgTWF0aC5jZWlsKHRvdGFsLmxlbmd0aCAvIHNpemUpOyBpKyspIHtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHZhciBzdGFydCA9IGkgKiBzaXplO1xyXG4gICAgICAgICAgICB2YXIgZW5kID0gc3RhcnQgKyBzaXplO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgY29sbGVjdGlvbi5wdXNoKHRvdGFsLnNsaWNlKHN0YXJ0LCBlbmQpKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIHJldHVybiBjb2xsZWN0aW9uO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQ2hlY2tzIGlmIGFuIG9iamVjdCBpcyBlbXB0eS5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSBvYmplY3QgfCBvYmplY3RcclxuXHQgKiBAcmV0dXJuIGJvb2xcclxuXHQgKi9cclxuXHRzdGF0aWMgZW1wdHlPYmplY3Qob2JqZWN0KSB7XHJcblx0XHRmb3IgKGxldCBwcm9wIGluIG9iamVjdCkge1xyXG5cdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIHRydWU7XHJcblx0fVxyXG5cclxuXHJcblx0LyoqXHJcblx0ICogQ2hlY2tzIGlmIGEgZ2l2ZW4gb2JqZWN0IGNvbnRhaW5lZCBpbiBhbiBhcnJheS5cclxuXHQgKiBcclxuXHQgKiBAcGFyYW0gb2JqZWN0IHwgb2JqZWN0XHJcblx0ICogQHBhcmFtIGFycmF5IHwgaGF5c3RhY2tcclxuXHQgKiBAcmV0dXJuIGJvb2xcclxuXHQgKi9cclxuXHRzdGF0aWMgY29udGFpbnNPYmplY3Qob2JqZWN0LCBoeXN0YWNrKSBcclxuXHR7XHJcblx0ICAgIGxldCBpO1xyXG5cclxuXHQgICAgZm9yIChpID0gMDsgaSA8IGh5c3RhY2subGVuZ3RoOyBpKyspIHtcclxuXHQgICAgICAgIGlmICh0eXBlb2Ygb2JqZWN0ID09ICdzdHJpbmcnICYmIGh5c3RhY2tbaV0uY29uc3RydWN0b3IubmFtZSA9PT0gb2JqZWN0KSB7XHJcblx0ICAgICAgICBcdHJldHVybiB0cnVlO1xyXG5cdCAgICAgICAgfVxyXG5cclxuXHQgICAgICAgIGlmIChoeXN0YWNrW2ldID09PSBvYmplY3QpIHtcclxuXHQgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuXHQgICAgICAgIH1cclxuXHQgICAgfVxyXG5cclxuXHQgICAgcmV0dXJuIGZhbHNlO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQ2hlY2tzIGlmIGEgZ2l2ZW4gcGFyYW1ldGVyIGlzIGFuIG9iamVjdC5cclxuXHQgKiBcclxuXHQgKiBAcGFyYW0gb2JqZWN0IHwgb2JqZWN0XHJcblx0ICogQHJldHVybiBib29sXHJcblx0ICovXHJcblx0c3RhdGljIGlzT2JqZWN0KG9iamVjdCkgXHJcblx0e1xyXG5cdFx0cmV0dXJuIHR5cGVvZiBvYmplY3QgPT0gJ29iamVjdCc7XHJcblx0fVxyXG59XG5cbmxldCBkZWZhdWx0TWVzc2FnZSQxID0gJ1RoZSBkYXRhIHN0cnVjdHVyZSBpcyBpbnZhbGlkJztcclxuXHJcbmNsYXNzIEludmFsaWREYXRhU3RydWN0dXJlRXhjZXB0aW9uIGV4dGVuZHMgRXhjZXB0aW9uSGFuZGxlclxyXG57XHJcblx0Y29uc3RydWN0b3IobWVzc2FnZSA9IG51bGwpIFxyXG5cdHtcclxuXHRcdG1lc3NhZ2UgPSBtZXNzYWdlIHx8IGRlZmF1bHRNZXNzYWdlJDE7XHJcblx0XHRzdXBlcihtZXNzYWdlKTtcclxuICAgIFx0c3VwZXIuc3RhY2tUcmFjZSh0aGlzLCBtZXNzYWdlKTtcclxuICAgIH1cclxufVxuXG4vKipcclxuICogQGZpbGUgXHJcbiAqIFJlcXVlc3QgY2xhc3MuXHJcbiAqXHJcbiAqIEhhbmRsZXMgYWpheCByZXF1ZXN0cyBQT1NULCBHRVQgZXRjLi4uXHJcbiAqL1xyXG5cclxuLyoqXHJcbiAqIFN0b3JlcyB0aGUgZGVmYXVsdCBzZXR0aW5ncy5cclxuICpcclxuICogQHZhciBvYmplY3RcclxuICovXHJcblxyXG5sZXQgZGVmYXVsdFNldHRpbmdzID0ge1xyXG5cdGhlYWRlcnM6IHtcclxuXHRcdCdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbidcclxuXHR9LFxyXG5cdGFzeW5jOiB0cnVlXHJcbn07XHJcblxyXG5jbGFzcyBSZXF1ZXN0XHJcbntcclxuXHQvKipcclxuXHQgKiAtIEluaXRpYWxpemUgdGhlIHNldHRpbmdzIG9iamVjdC5cclxuXHQgKiAtIEluaXRpYWxpemUgdGhlIHhociBvYmplY3QuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gb2JqZWN0IHwgc2V0dGluZ3NcclxuXHQgKiBAcmV0dXJuIHZvaWRcclxuXHQgKi9cclxuXHRjb25zdHJ1Y3RvcihzZXR0aW5ncylcclxuXHR7XHJcblx0XHR0aGlzLnNldHRpbmdzID0gQ29tbW9uLmV4dGVuZChkZWZhdWx0U2V0dGluZ3MsIHNldHRpbmdzKTtcclxuXHRcdHRoaXMuc2V0RGVmYXVsdFJlcXVlc3RIZWFkZXIoKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFNldHMgdGhlIGRlZmF1bHQgcmVxdWVzdCBoZWFkZXJzLlxyXG5cdCAqXHJcblx0ICogQHJldHVybiB2b2lkXHJcblx0ICovXHJcblx0c2V0RGVmYXVsdFJlcXVlc3RIZWFkZXIoKVxyXG5cdHtcclxuXHRcdGxldCBoZWFkZXI7XHJcblx0XHRsZXQgaGVhZGVycyA9IHRoaXMuc2V0dGluZ3MuaGVhZGVycztcclxuXHRcdGxldCBhc3luYyA9IHRoaXMuc2V0dGluZ3MuYXN5bmM7XHJcblx0XHRsZXQgb3BlbiA9IFhNTEh0dHBSZXF1ZXN0LnByb3RvdHlwZS5vcGVuO1xyXG5cdFx0bGV0IHNldFJlcXVlc3RIZWFkZXIgPSBYTUxIdHRwUmVxdWVzdC5wcm90b3R5cGUuc2V0UmVxdWVzdEhlYWRlcjtcclxuXHJcblx0XHRYTUxIdHRwUmVxdWVzdC5wcm90b3R5cGUub3BlbiA9IGZ1bmN0aW9uKCkge1xyXG5cdFx0XHR2YXIgcmVzcG9uc2UgPSBvcGVuLmFwcGx5KHRoaXMsIGFyZ3VtZW50cywgYXN5bmMpO1xyXG5cclxuXHRcdFx0Zm9yIChoZWFkZXIgaW4gaGVhZGVycykge1xyXG5cdFx0XHRcdHRoaXMuc2V0UmVxdWVzdEhlYWRlcihoZWFkZXIsIGhlYWRlcnNbaGVhZGVyXSk7XHJcblx0XHRcdH1cclxuXHJcblx0ICBcdFx0cmV0dXJuIHJlc3BvbnNlO1xyXG5cdFx0fTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIE1ha2VzIGEgUE9TVCByZXF1ZXN0LlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIG9iamVjdCB8IG9wdGlvbnNcclxuXHQgKiBAcmV0dXJuIFByb21pc2VcclxuXHQgKi9cclxuXHRwb3N0KG9wdGlvbnMpXHJcblx0e1xyXG5cdFx0bGV0IHhociA9IHRoaXMueGhyO1xyXG5cclxuXHRcdGlmKG9wdGlvbnMuaGFzT3duUHJvcGVydHkoJ2JlZm9yZScpICYmIHR5cGVvZiBvcHRpb25zLmJlZm9yZSA9PSAnZnVuY3Rpb24nKSB7XHJcblx0XHRcdG9wdGlvbnMuYmVmb3JlLmNhbGwodGhpcyk7XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xyXG5cdFx0XHRpZih0eXBlb2Ygb3B0aW9ucyAhPT0gJ29iamVjdCcpIHtcclxuXHRcdFx0XHR0aHJvdyBuZXcgRXJyb3IoJ2dldCBleHBlY3RpbmcgYSBqc29uIG9iamVjdCB0byBiZSBwYXNzZWQgYXMgYW4gYXJndW1lbnQsIGJ1dCAnKyB0eXBlb2Ygb3B0aW9ucyArICcgd2FzIHBhc3NlZC4nKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0b3B0aW9ucy5kYXRhID0gb3B0aW9ucy5kYXRhIHx8IHt9O1xyXG5cclxuXHRcdFx0aWYodHlwZW9mIG9wdGlvbnMuZGF0YSAhPT0gJ29iamVjdCcpIHtcclxuXHRcdFx0XHR0aHJvdyBuZXcgRXJyb3IoJ2RhdGEgcHJvcGVydHkgZXhwZWN0aW5nIGEganNvbiBvYmplY3QgdG8gYmUgcGFzc2VkIGFzIGFuIGFyZ3VtZW50LCBidXQgJyArIHR5cGVvZiBvcHRpb25zLmRhdGEgKyAnIHdhcyBwYXNzZWQuJyk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHhoci5vcGVuKCdQT1NUJywgb3B0aW9ucy51cmwsIHRydWUpO1xyXG5cclxuXHRcdFx0eGhyLnJlc3BvbnNlVHlwZSA9IG9wdGlvbnMuZGF0YVR5cGUgfHwgJ2pzb24nO1xyXG5cdFx0XHR4aHIudGltZW91dCA9IG9wdGlvbnMudGltZW91dCB8fCAzMDAwO1xyXG5cclxuXHRcdFx0eGhyLm9ucmVhZHlzdGF0ZWNoYW5nZSA9IGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRcdGlmICh0aGlzLnJlYWR5U3RhdGUgPT0gNCAmJiAodGhpcy5zdGF0dXMgPj0gNDAwICYmIHRoaXMuc3RhdHVzIDw9IDUwMCkpIHtcclxuXHRcdFx0ICAgIFx0cmVqZWN0KHRoaXMucmVzcG9uc2VUZXh0KTtcclxuXHRcdFx0ICAgIH1cclxuXHRcdFx0ICAgIFxyXG5cdFx0XHQgICAgaWYgKHRoaXMucmVhZHlTdGF0ZSAhPSA0IHx8IHRoaXMuc3RhdHVzICE9IDIwMCkge1xyXG5cdFx0XHQgICAgXHRyZXR1cm47XHJcblx0XHRcdCAgICB9XHJcblx0ICAgICAgIFx0XHJcbiAgICAgICBcdFx0XHRyZXNvbHZlKHRoaXMucmVzcG9uc2UpO1xyXG4gICAgICAgXHRcdFx0XHJcbiAgICAgICBcdFx0XHRpZiAob3B0aW9ucy5oYXNPd25Qcm9wZXJ0eSgnYWZ0ZXInKSAmJiB0eXBlb2Ygb3B0aW9ucy5hZnRlciA9PSAnZnVuY3Rpb24nKSB7XHJcblx0XHRcdFx0XHRvcHRpb25zLmFmdGVyLmNhbGwodGhpcyk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9O1xyXG5cclxuXHRcdFx0eGhyLm9uZXJyb3IgPSBmdW5jdGlvbihtZXNzYWdlKSB7XHJcblx0XHRcdFx0aWYob3B0aW9ucy5oYXNPd25Qcm9wZXJ0eSgnZXJyb3InKSAmJiB0eXBlb2Ygb3B0aW9ucy5lcnJvciA9PSAnZnVuY3Rpb24nKSB7XHJcblx0XHRcdFx0XHRvcHRpb25zLmVycm9yKG1lc3NhZ2UpO1xyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0cmVqZWN0KG1lc3NhZ2UpO1xyXG5cdFx0XHR9O1xyXG5cclxuXHRcdFx0aWYoISBvcHRpb25zLmRhdGEpIHtcclxuXHRcdFx0XHR4aHIuc2VuZChudWxsKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0dmFyIHF1ZXJ5U3RyaW5nID0gT2JqZWN0LmtleXMob3B0aW9ucy5kYXRhKS5tYXAoZnVuY3Rpb24oa2V5KSB7XHJcblx0XHQgICAgICAgICAgICByZXR1cm4gZW5jb2RlVVJJQ29tcG9uZW50KGtleSkgKyAnPScgK1xyXG5cdFx0ICAgICAgICAgICAgICAgIFx0ZW5jb2RlVVJJQ29tcG9uZW50KG9wdGlvbnMuZGF0YVtrZXldKTtcclxuXHRcdCAgICAgICAgXHR9KS5qb2luKCcmJyk7XHJcblxyXG5cdFx0XHR4aHIuc2VuZChxdWVyeVN0cmluZyk7XHJcblx0XHR9KTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIE1ha2VzIGEgR0VUIGFqYXggcmVxdWVzdC5cclxuXHQgKiBcclxuXHQgKiBAcGFyYW0gb2JqZWN0IHwgb3B0aW9uc1xyXG5cdCAqIEByZXR1cm4gUHJvbWlzZVxyXG5cdCAqL1xyXG5cdGdldChvcHRpb25zKVxyXG5cdHtcclxuXHRcdGxldCB4aHIgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKSB8fCBuZXcgQWN0aXZlWE9iamVjdChcIk1pY3Jvc29mdC5YTUxIVFRQXCIpO1x0XHRcdFxyXG5cclxuXHRcdGlmIChvcHRpb25zLmhhc093blByb3BlcnR5KCdiZWZvcmUnKSAmJiB0eXBlb2Ygb3B0aW9ucy5iZWZvcmUgPT0gJ2Z1bmN0aW9uJykge1xyXG5cdFx0XHRvcHRpb25zLmJlZm9yZS5jYWxsKHRoaXMpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcclxuXHRcdFx0aWYgKHR5cGVvZiBvcHRpb25zICE9PSAnb2JqZWN0Jykge1xyXG5cdFx0XHRcdHRocm93IG5ldyBFcnJvcignZ2V0IGV4cGVjdGluZyBhIGpzb24gb2JqZWN0IHRvIGJlIHBhc3NlZCBhcyBhbiBhcmd1bWVudCwgYnV0ICcrIHR5cGVvZiBvcHRpb25zICsgJyB3YXMgcGFzc2VkLicpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRvcHRpb25zLmRhdGEgPSBvcHRpb25zLmRhdGEgfHwge307XHJcblxyXG5cdFx0XHRpZiAodHlwZW9mIG9wdGlvbnMuZGF0YSAhPT0gJ29iamVjdCcpIHtcclxuXHRcdFx0XHR0aHJvdyBuZXcgRXJyb3IoJ2RhdGEgcHJvcGVydHkgZXhwZWN0aW5nIGEganNvbiBvYmplY3QgdG8gYmUgcGFzc2VkIGFzIGFuIGFyZ3VtZW50LCBidXQgJyArIHR5cGVvZiBvcHRpb25zLmRhdGEgKyAnIHdhcyBwYXNzZWQuJyk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHhoci5vcGVuKCdHRVQnLCBvcHRpb25zLnVybCwgdHJ1ZSk7XHJcblxyXG5cdFx0XHR4aHIucmVzcG9uc2VUeXBlID0gb3B0aW9ucy5kYXRhVHlwZSB8fCAnanNvbic7XHJcblx0XHRcdHhoci50aW1lb3V0ID0gb3B0aW9ucy50aW1lb3V0IHx8IDMwMDA7XHJcblxyXG5cdFx0XHRpZiAoeGhyLnJlc3BvbnNlVHlwZSA9PSAnanNvbicpIHtcclxuXHRcdFx0XHR4aHIuc2V0UmVxdWVzdEhlYWRlcignQ29udGVudC1UeXBlJywgJ2FwcGxpY2F0aW9uL2pzb24nKTtcclxuXHRcdFx0XHR4aHIuc2V0UmVxdWVzdEhlYWRlcignQWNjZXB0JywgJ2FwcGxpY2F0aW9uL2pzb24nKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0aWYgKHhoci5yZXNwb25zZVR5cGUgPT0gJ2RvY3VtZW50Jykge1xyXG5cdFx0XHRcdHhoci5vdmVycmlkZU1pbWVUeXBlKCd0ZXh0L3htbCcpO1xyXG5cdFx0XHRcdHhoci5zZXRSZXF1ZXN0SGVhZGVyKCdDb250ZW50LVR5cGUnLCAndGV4dC9odG1sJyk7XHJcblx0XHRcdFx0eGhyLnNldFJlcXVlc3RIZWFkZXIoJ0FjY2VwdCcsICd0ZXh0L2h0bWwnKTtcdFxyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHR4aHIub25yZWFkeXN0YXRlY2hhbmdlID0gZnVuY3Rpb24oKSB7XHJcblx0XHRcdCAgICBpZiAodGhpcy5yZWFkeVN0YXRlID09IDQgJiYgKHRoaXMuc3RhdHVzID49IDQwMCAmJiB0aGlzLnN0YXR1cyA8PSA1MDApKSB7XHJcblx0XHRcdCAgICBcdHJlamVjdCh0aGlzLnJlc3BvbnNlVGV4dCk7XHJcblx0XHRcdCAgICB9XHJcblx0XHRcdCAgIFxyXG5cdFx0XHQgICAgaWYgKHRoaXMucmVhZHlTdGF0ZSA9PSA0ICYmIHRoaXMuc3RhdHVzID09IDIwMCkge1xyXG5cdFx0XHRcdCAgICBsZXQgcmVzcG9uc2UgPSB0aGlzLnJlc3BvbnNlIHx8IHRoaXMucmVzcG9uc2VUZXh0O1xyXG5cdFx0XHRcdCAgICByZXNwb25zZSA9ICh4aHIucmVzcG9uc2VUeXBlID09ICdqc29uJyAmJiB0eXBlb2YgcmVzcG9uc2UgIT0gJ29iamVjdCcpID8gSlNPTi5wYXJzZShyZXNwb25zZSkgOiByZXNwb25zZTtcclxuXHRcdFx0XHQgICAgcmVzb2x2ZShyZXNwb25zZSk7XHJcblx0ICAgICAgIFx0XHRcdFxyXG5cdCAgICAgICBcdFx0XHRpZiAob3B0aW9ucy5oYXNPd25Qcm9wZXJ0eSgnYWZ0ZXInKSAmJiB0eXBlb2Ygb3B0aW9ucy5hZnRlciA9PSAnZnVuY3Rpb24nKSB7XHJcblx0XHRcdFx0XHRcdG9wdGlvbnMuYWZ0ZXIuY2FsbCh0aGlzKTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9XHJcblx0XHRcdH07XHJcblxyXG5cdFx0XHR4aHIub25hYm9ydCA9IHhoci5vbmVycm9yID0gZnVuY3Rpb24obWVzc2FnZSkge1xyXG5cdFx0XHRcdGlmIChvcHRpb25zLmhhc093blByb3BlcnR5KCdlcnJvcicpICYmIHR5cGVvZiBvcHRpb25zLmVycm9yID09ICdmdW5jdGlvbicpIHtcclxuXHRcdFx0XHRcdG9wdGlvbnMuZXJyb3IobWVzc2FnZSk7XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRyZWplY3QobWVzc2FnZSk7XHJcblx0XHRcdH07XHJcblxyXG5cdFx0XHRpZiAoISBvcHRpb25zLmRhdGEpIHtcclxuXHRcdFx0XHR4aHIuc2VuZChudWxsKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0dmFyIHF1ZXJ5U3RyaW5nID0gT2JqZWN0LmtleXMob3B0aW9ucy5kYXRhKS5tYXAoZnVuY3Rpb24oa2V5KSB7XHJcblx0XHQgICAgICAgICAgICByZXR1cm4gZW5jb2RlVVJJQ29tcG9uZW50KGtleSkgKyAnPScgK1xyXG5cdFx0ICAgICAgICAgICAgICAgIFx0ZW5jb2RlVVJJQ29tcG9uZW50KG9wdGlvbnMuZGF0YVtrZXldKTtcclxuXHRcdCAgICAgICAgXHR9KS5qb2luKCcmJyk7XHJcblxyXG5cdFx0XHR4aHIuc2VuZChxdWVyeVN0cmluZyk7XHJcblx0XHR9KTtcclxuXHR9XHJcbn1cblxubGV0IGRlZmF1bHRNZXNzYWdlJDIgPSAnVGhlIGV2ZW50IHlvdSBjYWxsZWQgZG9lcyBub3QgZXhpc3RzIG9yIHlvdSBzdXBwbGllZCB3cm9uZyBhcmd1bWVudCc7XHJcblxyXG5jbGFzcyBCYWRFdmVudENhbGxFeGNlcHRpb24gZXh0ZW5kcyBFeGNlcHRpb25IYW5kbGVyXHJcbntcclxuXHRjb25zdHJ1Y3RvcihtZXNzYWdlID0gbnVsbCkgXHJcblx0e1xyXG5cdFx0bWVzc2FnZSA9IG1lc3NhZ2UgfHwgZGVmYXVsdE1lc3NhZ2UkMjtcclxuXHRcdHN1cGVyKG1lc3NhZ2UpO1xyXG4gICAgXHRzdXBlci5zdGFja1RyYWNlKHRoaXMsIG1lc3NhZ2UpO1xyXG4gICAgfVxyXG59XG5cbi8qKlxyXG4gKiBAZmlsZSBcclxuICogRXZlbnRNYW5hZ2VyIGNsYXNzLlxyXG4gKlxyXG4gKiBIYW5kbGVzIHN1YnNjcmlwaW9ucyBhbmQgcHVibGlzaGluZyBvZiBldmVudHMuXHJcbiAqL1xyXG5cclxuY2xhc3MgRXZlbnRNYW5hZ2VyXHJcbntcclxuXHQvKipcclxuXHQgKiBTdG9yZXMgdGhlIGV2ZW50cyBjYWxsYmFja3MuXHJcblx0ICogXHJcblx0ICogQHZhciBhcnJheVxyXG5cdCAqL1xyXG5cdGNvbnN0cnVjdG9yKClcclxuXHR7XHJcblx0XHR0aGlzLmV2ZW50cyA9IHt9O1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogU3Vic2NyaWJpbmcgdG8gYW4gZXZlbnQuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gc3RyaW5nIHwgbmFtZVxyXG5cdCAqIEBwYXJhbSBmdW5jdGlvbiB8IGNhbGxiYWNrXHJcblx0ICogQHJldHVybiB2b2lkXHJcblx0ICovXHJcblx0c3Vic2NyaWJlKG5hbWUsIGNhbGxiYWNrKSBcclxuXHR7XHJcblx0XHRpZiAodHlwZW9mIGNhbGxiYWNrICE9PSAnZnVuY3Rpb24nKSB7XHJcblx0XHRcdHRocm93IG5ldyBJbnZhbGlkQXJndW1lbnRFeGNlcHRpb247XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKHR5cGVvZiB0aGlzLmV2ZW50c1tuYW1lXSA9PSAndW5kZWZpbmVkJykge1xyXG5cdFx0XHR0aGlzLmV2ZW50c1tuYW1lXSA9IFtdO1xyXG5cdFx0fVxyXG5cclxuXHRcdHRoaXMuZXZlbnRzW25hbWVdLnB1c2goY2FsbGJhY2spO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogUHVibGlzaCBhbiBldmVudCB0byBhbGwgc3Vic2NyaWJlcnMuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gc3RyaW5nIHwgbmFtZVxyXG5cdCAqIEBwYXJhbSBsaXN0IHwgZGF0YVxyXG5cdCAqIEByZXR1cm4gdm9pZFxyXG5cdCAqL1xyXG5cdHB1Ymxpc2gobmFtZSwgLi4uZGF0YSkgXHJcblx0e1xyXG5cdFx0ZGF0YSA9IGRhdGEgfHwgbnVsbDtcclxuXHJcblx0XHQvLyBJZiB0aGVyZSBhcmUgbm8gc3Vic2NyaWJlcnMgc2ltcGx5IGlnbm9yZSB0aGF0IGV2ZW50LlxyXG5cdFx0aWYgKHR5cGVvZiB0aGlzLmV2ZW50c1tuYW1lXSA9PSAndW5kZWZpbmVkJykge1xyXG5cdFx0XHRyZXR1cm47XHJcblx0XHR9XHJcblxyXG5cdFx0dGhpcy5ldmVudHNbbmFtZV0uZm9yRWFjaChmdW5jdGlvbihjYWxsYmFjaykge1xyXG5cdFx0XHRpZih0eXBlb2YgY2FsbGJhY2sgIT0gJ2Z1bmN0aW9uJykge1xyXG5cdFx0XHRcdHRocm93IG5ldyBJbnZhbGlkQXJndW1lbnRFeGNlcHRpb24oJ3N1YnNjcmliZSgpIHNob3VsZCByZWNpZXZlIGNhbGxiYWNrIGFzIHNlY29uZCBwYXJhbWV0ZXIsIGJ1dCAnKyB0eXBlb2YgY2FsbGJhY2sgKycgd2FzIHBhc3NlZCcpO1xyXG5cdFx0XHR9XHJcblx0XHRcdFxyXG5cdFx0XHRyZXR1cm4gY2FsbGJhY2soLi4uZGF0YSk7XHJcblx0XHR9KTtcclxuXHR9XHJcbn1cblxuLyoqXHJcbiAqIEBmaWxlIFxyXG4gKiBDb29raWUgY2xhc3MuXHJcbiAqXHJcbiAqIEFkZHMgc29tZSB1c2VmdWwgZnVuY3Rpb25hbGl0eSBmb3JcclxuICogc2V0dGluZyBvciBnZXR0aW5nIGNvb2tpZXMuXHJcbiAqL1xyXG5cdFxyXG5jbGFzcyBDb29raWVcclxue1xyXG5cdC8qKlxyXG4gXHQqIFNldHMgYSBjb29raWUuXHJcbiBcdCogXHJcbiBcdCogQHBhcmFtIHN0cmluZyB8IG5hbWVcclxuIFx0KiBAcGFyYW0gSlNPTiB8IHZhbHVlXHJcbiBcdCogQHBhcmFtIGludGVnZXIgfCBkYXlzXHJcbiBcdCogQHJldHVybiB2b2lkXHJcblx0Ki9cclxuXHRzdGF0aWMgc2V0KG5hbWUsIHZhbHVlLCBkYXlzKSBcclxuXHR7XHJcblx0XHRpZiAodmFsdWUuY29uc3RydWN0b3IubmFtZSAgPT0gJ09iamVjdCcgfHwgdmFsdWUuY29uc3RydWN0b3IubmFtZSA9PSAnQXJyYXknKSB7XHJcblx0XHRcdHZhbHVlID0gSlNPTi5zdHJpbmdpZnkodmFsdWUpO1xyXG5cdFx0fVxyXG5cclxuXHRcdGRheXMgPSBkYXlzIHx8IDEwO1xyXG5cclxuXHQgICAgbGV0IGV4cGlyZXM7XHJcblx0ICAgIFxyXG5cdCAgICBpZiAoZGF5cykge1xyXG5cdCAgICAgICAgbGV0IGRhdGUgPSBuZXcgRGF0ZSgpO1xyXG5cdCAgICAgICAgZGF0ZS5zZXRUaW1lKGRhdGUuZ2V0VGltZSgpICsgKGRheXMgKiAyNCAqIDYwICogNjAgKiAxMDAwKSk7XHJcblx0ICAgICAgICBleHBpcmVzID0gXCI7IGV4cGlyZXM9XCIgKyBkYXRlLnRvR01UU3RyaW5nKCk7XHJcblx0ICAgIH0gZWxzZSB7XHJcblx0ICAgICAgICBleHBpcmVzID0gXCJcIjtcclxuXHQgICAgfVxyXG5cclxuXHQgICAgZG9jdW1lbnQuY29va2llID0gbmFtZSArIFwiPVwiICsgdmFsdWUgKyBleHBpcmVzICsgXCI7IHBhdGg9L1wiO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogUmV0cmlldmVzIHRoZSBjb29raWUgYnkgbmFtZS5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSBzdHJpbmcgfCBuYW1lXHJcbiBcdCAqIEByZXR1cm4gSlNPTlxyXG5cdCAqL1xyXG5cdHN0YXRpYyBnZXQobmFtZSkgXHJcblx0e1xyXG5cdCAgICBpZiAoZG9jdW1lbnQuY29va2llLmxlbmd0aCA+IDApIHtcclxuXHQgICAgICAgIGxldCBjX3N0YXJ0ID0gZG9jdW1lbnQuY29va2llLmluZGV4T2YobmFtZSArIFwiPVwiKTtcclxuXHQgICAgICAgIFxyXG5cdCAgICAgICAgaWYgKGNfc3RhcnQgIT0gLTEpIHtcclxuXHQgICAgICAgICAgICBjX3N0YXJ0ID0gY19zdGFydCArIG5hbWUubGVuZ3RoICsgMTtcclxuXHQgICAgICAgICAgICBsZXQgY19lbmQgPSBkb2N1bWVudC5jb29raWUuaW5kZXhPZihcIjtcIiwgY19zdGFydCk7XHJcblx0ICAgICAgICAgICAgXHJcblx0ICAgICAgICAgICAgaWYgKGNfZW5kID09IC0xKSB7XHJcblx0ICAgICAgICAgICAgICAgIGNfZW5kID0gZG9jdW1lbnQuY29va2llLmxlbmd0aDtcclxuXHQgICAgICAgICAgICB9XHJcblxyXG5cdCAgICAgICAgICAgIHJldHVybiBKU09OLnBhcnNlKHVuZXNjYXBlKGRvY3VtZW50LmNvb2tpZS5zdWJzdHJpbmcoY19zdGFydCwgY19lbmQpKSk7XHJcblx0ICAgICAgICB9XHJcblx0ICAgIH1cclxuXHJcblx0ICAgIHJldHVybiB7fTtcclxuXHR9XHJcbn1cblxubGV0IGRlZmF1bHRNZXNzYWdlJDMgPSAnVGhlIGl0ZW0geW91IGFyZSB0cnlpbmcgdG8gYWRkIG11c3QgY29udGFpbiBhIHVuaXF1ZSBpZCc7XHJcblxyXG5jbGFzcyBJbnZhbGlkQ2FydEl0ZW1FeGNlcHRpb24gZXh0ZW5kcyBFeGNlcHRpb25IYW5kbGVyXHJcbntcclxuXHRjb25zdHJ1Y3RvcihtZXNzYWdlID0gbnVsbCkgXHJcblx0e1xyXG5cdFx0bWVzc2FnZSA9IG1lc3NhZ2UgfHwgZGVmYXVsdE1lc3NhZ2UkMztcclxuXHRcdHN1cGVyKG1lc3NhZ2UpO1xyXG4gICAgXHRzdXBlci5zdGFja1RyYWNlKHRoaXMsIG1lc3NhZ2UpO1xyXG4gICAgfVxyXG59XG5cbi8vIEhlbHBlcnNcclxuLy8gRXhjZXB0aW9uc1xyXG4vKipcclxuICogQGZpbGUgXHJcbiAqIENhcnQgY2xhc3MuXHJcbiAqXHJcbiAqIEhhbmRsZXMgYWRkaW5nLCByZW1vdmluZyBldGMuLi4gb2YgaXRlbXMuXHJcbiAqL1xyXG5cclxuLyoqXHJcbiAqIFRoZSBkZWZhdWx0IHNldHRpbmdzIG9mIHRoZSBjYXJ0LlxyXG4gKlxyXG4gKiBAdmFyIG9iamVjdFxyXG4gKi9cclxubGV0IGRlZmF1bHRTZXR0aW5ncyQxID0ge1xyXG5cdGVsZW1lbnQ6ICcuY2FydCcsXHJcblx0Y29va2llX25hbWU6ICdjYXJ0JyxcclxuXHRwcmV2aWV3X2NsYXNzOiAnJyxcclxuXHRsb2FkZXI6ICcnLFxyXG5cdGNsYXNzOiAnJyxcclxuXHR3aWR0aDogJzYwcHgnLFxyXG5cdGhlaWdodDogJzYwcHgnLFxyXG5cdHBsYWNlbWVudDogJ3JpZ2h0LXRvcCcsXHJcblx0Zml4ZWQ6IHRydWUsXHJcblx0aG92ZXJfY29sb3I6ICdvcmFuZ2UnLFxyXG5cdG5vX2NzczogZmFsc2UsXHJcbn07XHJcblxyXG4vKipcclxuICogU3RvcmVzIHRoZSBjb250YWluZXIgb2JqZWN0LlxyXG4gKlxyXG4gKiBAdmFyIFxcQ29yZVxcQ29udGFpbmVyXHJcbiAqL1xyXG5sZXQgQ29udGFpbmVyO1xyXG5cclxuLyoqXHJcbiAqIFN0b3JlcyB0aGUgZXZlbnQgbWFuYWdlciBvYmplY3QuXHJcbiAqXHJcbiAqIEB2YXIgXFxDb3JlXFxFdmVudE1hbmFnZXJcclxuICovXHJcbmxldCBFdmVudE1hbmFnZXIkMjtcclxuXHJcbi8qKlxyXG4gKiBTdG9yZXMgdGhlIHJlcXVlc3Qgb2JqZWN0LlxyXG4gKlxyXG4gKiBAdmFyIFxcSGVscGVyc1xcUmVxdWVzdFxyXG4gKi9cclxubGV0IEh0dHA7XHJcblxyXG4vKipcclxuICogU3RvcmVzIHRoZSBjYXJ0IGxvYWRlci5cclxuICpcclxuICogQHZhciBIVE1MRGl2RWxlbWVudFxyXG4gKi9cclxubGV0IGxvYWRpbmdPdmVybGF5O1xyXG5cclxuLyoqXHJcbiAqIFN0b3JlcyB0aGUgaXRlbXMgd3JhcHBlci5cclxuICpcclxuICogQHZhciBIVE1MRGl2RWxlbWVudFxyXG4gKi9cclxubGV0IGl0ZW1zRGl2O1xyXG5cclxuY2xhc3MgQ2FydCBcclxue1xyXG5cdC8qKlxyXG5cdCAqIC0gSW5pdGlhbGl6ZSB0aGUgSW9DIGNvbnRhaW5lclxyXG5cdCAqIC0gSW5pdGlhbGl6ZSB0aGUgUmVxdWVzdFxyXG5cdCAqIC0gSW5pdGlhbGl6ZSB0aGUgRXZlbnRNYW5hZ2VyXHJcblx0ICogLSBDcmVhdGVzIHRoZSBwcmV2aWV3IGFuZCB0aGUgaWNvbiBvZiB0aGUgY2FydC5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSBcXENvcmVcXENvbnRhaW5lciB8IGNvbnRhaW5lclxyXG5cdCAqIEBwYXJhbSBcXEhlbHBlcnNcXFJlcXVlc3QgfCBodHRwXHJcblx0ICogQHBhcmFtIFxcQ29yZVxcRXZlbnRNYW5hZ2VyIHwgZXZlbnRNYW5hZ2VyXHJcblx0ICogQHJldHVybiB2b2lkXHJcblx0ICovXHJcblx0Y29uc3RydWN0b3IoY29udGFpbmVyLCBodHRwLCBldmVudE1hbmFnZXIpIFxyXG5cdHtcclxuXHRcdENvbnRhaW5lciA9IGNvbnRhaW5lcjtcclxuXHRcdEh0dHAgPSBodHRwO1xyXG5cdFx0RXZlbnRNYW5hZ2VyJDIgPSBldmVudE1hbmFnZXI7XHJcblx0XHRcclxuXHRcdHRoaXMucHJldmlld0VsZW1lbnQgPSB0aGlzLmNyZWF0ZVByZXZpZXdFbGVtZW50KCk7XHJcblx0XHR0aGlzLmljb24gPSBjcmVhdGVJY29uLmNhbGwodGhpcyk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBTZXRzIHRoZSBvYmplY3QgYnkgdGhlIHVzZXJzIHNldHRpbmcuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gb2JqZWN0IHwgc2V0dGluZ3NcclxuXHQgKiBAcmV0dXJuIHZvaWRcclxuXHQgKi9cclxuXHRzZXR1cChzZXR0aW5ncylcclxuXHR7XHJcblx0XHRpZiAodHlwZW9mIHNldHRpbmdzICE9ICdvYmplY3QnKSB7XHJcblx0XHRcdHRocm93IG5ldyBJbnZhbGlkQXJndW1lbnRFeGNlcHRpb24kMTtcclxuXHRcdH1cclxuXHJcblx0XHR0aGlzLnNldHRpbmdzID0gQ29tbW9uLmV4dGVuZChkZWZhdWx0U2V0dGluZ3MkMSwgc2V0dGluZ3MpO1xyXG5cclxuXHRcdHRoaXMuc2V0RWxlbWVudCh0aGlzLnNldHRpbmdzLmVsZW1lbnQpO1xyXG5cclxuXHRcdERPTS5hZGRDbGFzcyh0aGlzLnByZXZpZXdFbGVtZW50LCAnY2xvc2VkJyk7XHJcblx0XHRET00uYWRkQ2xhc3ModGhpcy5wcmV2aWV3RWxlbWVudCwgdGhpcy5zZXR0aW5ncy5wcmV2aWV3X2NsYXNzKTtcclxuXHRcdFxyXG5cdFx0dGhpcy5hZGRTdHlsZVRhZygpO1xyXG5cdFx0dGhpcy5iaW5kRXZlbnRMaXN0ZW5lcnMoKTtcclxuXHRcdFxyXG5cdFx0aWYgKHRoaXMuaXNFbXB0eShDb29raWUuZ2V0KHRoaXMuc2V0dGluZ3MuY29va2llX25hbWUpKSkge1xyXG5cdFx0XHR0aGlzLnNldHVwQ2FydCgpO1xyXG5cdFx0XHRcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIENoZWNrcyBpZiB0aGUgY2FydCBpcyBlbXB0eVxyXG5cdCAqXHJcblx0ICogQHBhcmFtIG9iamVjdCB8IGNhcnRcclxuXHQgKiBAcmV0dXJuIGJvb2xcclxuXHQgKi9cclxuXHRpc0VtcHR5KGNhcnQpXHJcblx0e1xyXG5cdFx0cmV0dXJuIENvbW1vbi5lbXB0eU9iamVjdChjYXJ0KTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEluaXRpYWxpemUvU2V0cyB0aGUgY2FydCBhcyBhIGNvb2tpZS5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSBvYmplY3QgfCBjYXJ0XHJcblx0ICogQHJldHVybiB2b2lkXHJcblx0ICovXHJcblx0c2V0dXBDYXJ0KClcclxuXHR7XHJcblx0XHR0aGlzLmNhcnQgPSB7fTtcclxuXHRcdHRoaXMuY2FydC5pZCA9IFN0ci5yYW5kb20oMTApO1xyXG5cdFx0dGhpcy5jYXJ0Lml0ZW1zID0gW107XHJcblx0XHR0aGlzLmNhcnQuZmF2b3JpdGVzID0gW107XHJcblx0XHRDb29raWUuc2V0KHRoaXMuc2V0dGluZ3MuY29va2llX25hbWUsIHRoaXMuY2FydCwgMik7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBBZGRzIGFuIGl0ZW0gdG8gdGhlIGNhcnQuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gb2JqZWN0IHwgaXRlbVxyXG5cdCAqIEByZXR1cm4gdm9pZFxyXG5cdCAqL1xyXG5cdGFkZEl0ZW0oaXRlbSlcclxuXHR7XHJcblx0XHRpZiAodHlwZW9mIGl0ZW0gIT0gJ29iamVjdCcpIHtcclxuXHRcdFx0dGhyb3cgbmV3IEludmFsaWRBcmd1bWVudEV4Y2VwdGlvbiQxKCdhZGRJdGVtKCkgZXhwZWN0IHRoZSBmaXJzdCBwYXJhbWV0ZXIgdG8gYmUgYW4gb2JqZWN0LCBidXQgJyArIHR5cGVvZiBpdGVtICsgJyB3YXMgcGFzc2VkIGluc3RlYWQnKTtcclxuXHRcdH1cclxuXHJcblx0XHRpZiAoISBpdGVtLmhhc093blByb3BlcnR5KCdpZCcpKSB7XHJcblx0XHRcdHRocm93IG5ldyBJbnZhbGlkQ2FydEl0ZW1FeGNlcHRpb247XHJcblx0XHR9XHJcblxyXG5cdFx0dGhpcy5jYXJ0ID0gQ29va2llLmdldCh0aGlzLnNldHRpbmdzLmNvb2tpZV9uYW1lKTtcclxuXHJcblx0XHRpZiAoIWl0ZW0uaGFzT3duUHJvcGVydHkoJ3F1YW50aXR5JykpIHtcclxuXHRcdFx0aXRlbS5xdWFudGl0eSA9IDE7XHJcblx0XHR9XHJcblxyXG5cdFx0bGV0IGk7XHJcblx0XHRsZXQgaW5jcmVtZW50ZWQgPSBmYWxzZTtcclxuXHJcblx0XHRmb3IgKGkgPSAwOyBpIDwgdGhpcy5jYXJ0Lml0ZW1zLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdGlmICh0aGlzLmNhcnQuaXRlbXNbaV0uaWQgPT0gaXRlbS5pZCkge1xyXG5cdFx0XHRcdHRoaXMuY2FydC5pdGVtc1tpXS5xdWFudGl0eSsrO1xyXG5cdFx0XHRcdGluY3JlbWVudGVkID0gdHJ1ZTtcclxuXHRcdFx0XHRicmVhaztcdFxyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKCEgaW5jcmVtZW50ZWQpIHtcclxuXHRcdFx0dGhpcy5jYXJ0Lml0ZW1zLnB1c2goaXRlbSk7XHJcblx0XHR9XHJcblxyXG5cdFx0Q29va2llLnNldCh0aGlzLnNldHRpbmdzLmNvb2tpZV9uYW1lLCB0aGlzLmNhcnQsIDIpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQWRkcyBhbiBpdGVtIHRvIHRoZSBmYXZvcml0ZXMgbGlzdC5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSBvYmplY3QgfCBpdGVtXHJcblx0ICogQHJldHVybiB2b2lkXHJcblx0ICovXHJcblx0ZmF2b3JpdGVJdGVtKGl0ZW0pXHJcblx0e1xyXG5cdFx0aWYgKHR5cGVvZiBpdGVtICE9ICdvYmplY3QnKSB7XHJcblx0XHRcdHRocm93IG5ldyBJbnZhbGlkQXJndW1lbnRFeGNlcHRpb24kMSgnZmF2b3JpdGVJdGVtKCkgZXhwZWN0IHRoZSBmaXJzdCBwYXJhbWV0ZXIgdG8gYmUgYW4gb2JqZWN0LCBidXQgJyArIHR5cGVvZiBpdGVtICsgJyB3YXMgcGFzc2VkIGluc3RlYWQnKTtcclxuXHRcdH1cclxuXHJcblx0XHRpZiAoISBpdGVtLmhhc093blByb3BlcnR5KCdpZCcpKSB7XHJcblx0XHRcdHRocm93IG5ldyBJbnZhbGlkQ2FydEl0ZW1FeGNlcHRpb247XHJcblx0XHR9XHJcblxyXG5cdFx0dGhpcy5jYXJ0ID0gQ29va2llLmdldCh0aGlzLnNldHRpbmdzLmNvb2tpZV9uYW1lKTtcclxuXHJcblx0XHRsZXQgaTtcclxuXHRcdGxldCBhbHJlYWR5RmF2b3JpdGVkID0gZmFsc2U7XHJcblxyXG5cdFx0Zm9yIChpID0gMDsgaSA8IHRoaXMuY2FydC5mYXZvcml0ZXMubGVuZ3RoOyBpKyspIHtcclxuXHRcdFx0aWYgKHRoaXMuY2FydC5mYXZvcml0ZXNbaV0uaWQgPT0gaXRlbS5pZCkge1xyXG5cdFx0XHRcdGFscmVhZHlGYXZvcml0ZWQgPSB0cnVlO1xyXG5cdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKCEgYWxyZWFkeUZhdm9yaXRlZCkge1xyXG5cdFx0XHR0aGlzLmNhcnQuZmF2b3JpdGVzLnB1c2goaXRlbSk7XHJcblx0XHR9XHJcblxyXG5cdFx0Q29va2llLnNldCh0aGlzLnNldHRpbmdzLmNvb2tpZV9uYW1lLCB0aGlzLmNhcnQsIDIpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogUmVtb3ZlcyBhbiBpdGVtIGZyb20gdGhlIGNhcnQuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gb2JqZWN0IHwgaXRlbVxyXG5cdCAqIEByZXR1cm4gdm9pZFxyXG5cdCAqL1xyXG5cdHJlbW92ZUl0ZW0oaXRlbSlcclxuXHR7XHJcblx0XHRpZiAodHlwZW9mIGl0ZW0gIT0gJ29iamVjdCcpIHtcclxuXHRcdFx0dGhyb3cgbmV3IEludmFsaWRBcmd1bWVudEV4Y2VwdGlvbiQxKCdyZW1vdmVJdGVtKCkgZXhwZWN0IHRoZSBmaXJzdCBwYXJhbWV0ZXIgdG8gYmUgYW4gb2JqZWN0LCBidXQgJyArIHR5cGVvZiBpdGVtICsgJyB3YXMgcGFzc2VkIGluc3RlYWQnKTtcclxuXHRcdH1cclxuXHJcblx0XHRpZiAoISBpdGVtLmhhc093blByb3BlcnR5KCdpZCcpKSB7XHJcblx0XHRcdHRocm93IG5ldyBJbnZhbGlkQ2FydEl0ZW1FeGNlcHRpb247XHJcblx0XHR9XHJcblxyXG4gXHRcdHRoaXMuY2FydCA9IENvb2tpZS5nZXQodGhpcy5zZXR0aW5ncy5jb29raWVfbmFtZSk7XHJcblxyXG4gXHRcdGxldCBpO1xyXG5cclxuIFx0XHRmb3IgKGkgPSAwOyBpIDwgdGhpcy5jYXJ0Lml0ZW1zLmxlbmd0aDsgaSsrKSB7XHJcbiBcdFx0XHRpZiAodGhpcy5jYXJ0Lml0ZW1zW2ldLmlkID09IGl0ZW0uaWQpIHtcclxuIFx0XHRcdFx0dGhpcy5jYXJ0Lml0ZW1zLnNwbGljZShpLCAxKTtcclxuIFx0XHRcdFx0YnJlYWs7XHJcbiBcdFx0XHR9XHJcbiBcdFx0fVxyXG5cclxuIFx0XHRDb29raWUuc2V0KHRoaXMuc2V0dGluZ3MuY29va2llX25hbWUsIHRoaXMuY2FydCwgMik7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBBZGRzIHRoZSBpdGVtIHRvIHByZXZpZXcuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gYXJyYXkgfCBpdGVtc1xyXG5cdCAqIEByZXR1cm4gdm9pZFxyXG5cdCAqL1xyXG5cdGFkZFRvUHJldmlldyhpdGVtcylcclxuXHR7XHJcblx0XHRpdGVtc0Rpdi5pbm5lckhUTUwgPSAnJztcclxuXHJcblx0XHRsZXQgdGFibGUgPSBET00uY3JlYXRlRWxlbWVudCgndGFibGUnKTtcclxuXHJcblx0XHRET00uYWRkQ2xhc3ModGFibGUsICdwcmV2aWV3LXRhYmxlJyk7XHJcblxyXG5cdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCBpdGVtcy5sZW5ndGg7IGkrKykge1xyXG5cclxuXHRcdFx0bGV0IGF0dHJpYnV0ZXMgPSBpdGVtc1tpXTtcclxuXHJcblx0XHRcdGxldCB0ciA9IERPTS5jcmVhdGVFbGVtZW50KCd0cicsIHtcclxuXHRcdFx0XHRjbGFzczogJ2l0ZW0nXHJcblx0XHRcdH0pO1xyXG5cclxuXHRcdFx0Ly8gUXVhbnRpdHkgYWx3YXlzIGF0IHRoZSBzdGFydCBvZiBhbiBpdGVtLlxyXG5cdFx0XHRsZXQgdGQgPSBET00uY3JlYXRlRWxlbWVudCgndGQnKTtcclxuXHJcblx0XHRcdHRkLmlubmVySFRNTCA9IGF0dHJpYnV0ZXMucXVhbnRpdHkgKyd4JztcclxuXHRcdFx0dHIuYXBwZW5kQ2hpbGQodGQpO1xyXG5cdFx0XHRcclxuXHRcdFx0Zm9yKGxldCBhdHRyaWJ1dGUgaW4gYXR0cmlidXRlcykge1xyXG5cdFx0XHRcdHN3aXRjaChhdHRyaWJ1dGUpXHJcblx0XHRcdFx0e1xyXG5cdFx0XHRcdFx0Y2FzZSAnaW1hZ2UnOlxyXG5cdFx0XHRcdFx0XHR0ZCA9IERPTS5jcmVhdGVFbGVtZW50KCd0ZCcpO1xyXG5cdFx0XHRcdFx0XHRsZXQgaW1hZ2UgPSBET00uY3JlYXRlRWxlbWVudCgnaW1nJywge1xyXG5cdFx0XHRcdFx0XHRcdHNyYzogYXR0cmlidXRlc1thdHRyaWJ1dGVdLFxyXG5cdFx0XHRcdFx0XHRcdHdpZHRoOiAnNTBweCcsXHJcblx0XHRcdFx0XHRcdFx0aGVpZ2h0OiAnNTBweCdcclxuXHRcdFx0XHRcdFx0fSk7XHJcblxyXG5cdFx0XHRcdFx0XHR0ZC5hcHBlbmRDaGlsZChpbWFnZSk7XHJcblx0XHRcdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRcdFx0Y2FzZSAncHJpY2UnOlxyXG5cdFx0XHRcdFx0XHR0ZCA9IERPTS5jcmVhdGVFbGVtZW50KCd0ZCcpO1xyXG5cdFx0XHRcdFx0XHRsZXQgc3BhbiA9IERPTS5jcmVhdGVFbGVtZW50KCdzcGFuJywge1xyXG5cdFx0XHRcdFx0XHRcdGh0bWw6ICcmbmJzcCcgKyBhdHRyaWJ1dGVzW2F0dHJpYnV0ZV0uY3VycmVuY3lcclxuXHRcdFx0XHRcdFx0fSk7XHJcblx0XHRcdFx0XHRcdHRkLmlubmVySFRNTCA9IGF0dHJpYnV0ZXNbYXR0cmlidXRlXS5hbW91bnQ7XHJcblx0XHRcdFx0XHRcdHRkLmFwcGVuZENoaWxkKHNwYW4pO1xyXG5cdFx0XHRcdFx0XHRicmVhaztcclxuXHRcdFx0XHRcdGNhc2UgJ25hbWUnOlxyXG5cdFx0XHRcdFx0XHR0ZCA9IERPTS5jcmVhdGVFbGVtZW50KCd0ZCcpO1xyXG5cdFx0XHRcdFx0XHR0ZC5pbm5lckhUTUwgPSBhdHRyaWJ1dGVzW2F0dHJpYnV0ZV07XHJcblx0XHRcdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHJcblx0XHRcdFx0dHIuYXBwZW5kQ2hpbGQodGQpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHR0YWJsZS5hcHBlbmRDaGlsZCh0cik7XHJcblx0XHR9XHJcblxyXG5cdFx0Ly8gY3JlYXRlIGNoZWNrb3V0IGJ1dHRvbiBhdCB0aGUgYm90dG9tIG9mIHRoZSBwcmV2aWV3XHJcblx0XHRsZXQgdHIgPSBET00uY3JlYXRlRWxlbWVudCgndHInKTtcclxuXHRcdGxldCB0ZCA9IERPTS5jcmVhdGVFbGVtZW50KCd0ZCcsIHtcclxuXHRcdFx0Y29sc3BhbjogJzMnLFxyXG5cdFx0fSk7XHJcblxyXG5cdFx0bGV0IGNoZWNrb3V0ID0gRE9NLmNyZWF0ZUVsZW1lbnQoJ2EnLCB7XHJcblx0XHRcdGNsYXNzOiAnYnRuIGJ0bi1wcmltYXJ5JyxcclxuXHRcdFx0dGV4dDogJ0NoZWNrb3V0J1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0Y2hlY2tvdXQub25jbGljayA9IGZ1bmN0aW9uKGUpIHtcclxuXHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdFx0XHRFdmVudE1hbmFnZXIkMi5wdWJsaXNoKCdjYXJ0LmNoZWNrb3V0Jyk7XHJcblx0XHR9LmJpbmQodGhpcyk7XHJcblxyXG5cdFx0dGQuYXBwZW5kQ2hpbGQoY2hlY2tvdXQpO1xyXG5cdFx0dHIuYXBwZW5kQ2hpbGQodGQpO1xyXG5cclxuXHRcdC8vIGNyZWF0ZSB0b3RhbCBzdW0gYXQgdGhlIGJvdHRvbSBvZiB0aGUgcHJldmlld1xyXG5cdFx0dGQgPSBET00uY3JlYXRlRWxlbWVudCgndGQnLCB7XHJcblx0XHRcdGNvbHNwYW46ICcxJyxcclxuXHRcdH0pO1xyXG5cclxuXHRcdGxldCB0b3RhbCA9IERPTS5jcmVhdGVFbGVtZW50KCdkaXYnLCB7XHJcblx0XHRcdGNsYXNzOiAnY2FydC10b3RhbCcsXHJcblx0XHRcdHRleHQ6IHRoaXMudG90YWwoKVxyXG5cdFx0fSk7XHJcblxyXG5cdFx0dGQuYXBwZW5kQ2hpbGQodG90YWwpO1xyXG5cdFx0dHIuYXBwZW5kQ2hpbGQodGQpO1xyXG5cclxuXHRcdHRhYmxlLmFwcGVuZENoaWxkKHRyKTtcclxuXHJcblx0XHRpdGVtc0Rpdi5hcHBlbmRDaGlsZCh0YWJsZSk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBDYWxjdWxhdGVzIHRoZSB0b3RhbCBvZiB0aGUgY2FydFxyXG5cdCAqIGFuZCByZXRyaWV2ZSBpdC5cclxuXHQgKlxyXG5cdCAqIEByZXR1cm4gbnVtYmVyIFxyXG5cdCAqL1xyXG5cdHRvdGFsKClcclxuXHR7XHJcbiBcdFx0dGhpcy5jYXJ0ID0gQ29va2llLmdldCh0aGlzLnNldHRpbmdzLmNvb2tpZV9uYW1lKTtcclxuXHJcbiBcdFx0dmFyIHRvdGFsID0gMC4wMDtcclxuIFx0XHRsZXQgaTtcclxuXHJcbiBcdFx0Zm9yIChpID0gMDsgaSA8IHRoaXMuY2FydC5pdGVtcy5sZW5ndGg7IGkrKykge1xyXG4gXHRcdFx0dG90YWwgKz0gcGFyc2VGbG9hdCh0aGlzLmNhcnQuaXRlbXNbaV0ucHJpY2UuYW1vdW50KSAqIHRoaXMuY2FydC5pdGVtc1tpXS5xdWFudGl0eTtcclxuIFx0XHR9XHJcblxyXG4gXHRcdHJldHVybiB0b3RhbC50b0ZpeGVkKDIpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQmluZHMgZXZlcnRoaW5nIHRvIHRoZSBlbGVtZW50LlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIHN0cmluZyB8IHNlbGVjdG9yXHJcblx0ICogQHJldHVybiB2b2lkXHJcblx0ICovXHJcblx0c2V0RWxlbWVudChzZWxlY3RvcilcclxuXHR7XHJcblx0XHR0aGlzLmVsZW1lbnQgPSBET00uZmluZChzZWxlY3Rvcik7XHJcblxyXG5cdFx0aWYgKHRoaXMuZWxlbWVudCkge1xyXG5cdFx0XHRET00uYWRkQ2xhc3ModGhpcy5lbGVtZW50LCB0aGlzLnNldHRpbmdzLmNsYXNzKTtcclxuXHRcdFx0RE9NLmFkZENsYXNzKHRoaXMuZWxlbWVudCwgdGhpcy5zZXR0aW5ncy5wbGFjZW1lbnQpO1xyXG5cdFx0XHR0aGlzLmVsZW1lbnQuYXBwZW5kQ2hpbGQodGhpcy5pY29uKTtcclxuXHRcdFx0dGhpcy5lbGVtZW50LmFwcGVuZENoaWxkKHRoaXMucHJldmlld0VsZW1lbnQpO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQ3JlYXRlcyB0aGUgY2FydCBkZXRhaWxzIHByZXZpZXcgZWxlbWVudC5cclxuXHQgKlxyXG5cdCAqIEByZXR1cm4gSFRNTERpdkVsZW1lbnRcclxuXHQgKi9cclxuXHRjcmVhdGVQcmV2aWV3RWxlbWVudCgpXHJcblx0e1xyXG5cdFx0bGV0IHByZXZpZXdFbGVtZW50ID0gRE9NLmNyZWF0ZUVsZW1lbnQoJ2RpdicsIHtcclxuXHRcdFx0aWQ6ICdwcmV2aWV3J1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0aXRlbXNEaXYgPSBET00uY3JlYXRlRWxlbWVudCgndWwnLCB7XHJcblx0XHRcdFx0Y2xhc3M6ICdpdGVtcydcclxuXHRcdFx0fSk7XHJcblxyXG5cdFx0cHJldmlld0VsZW1lbnQuYXBwZW5kQ2hpbGQoaXRlbXNEaXYpO1xyXG5cclxuXHRcdHJldHVybiBwcmV2aWV3RWxlbWVudDtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEFkZCB0aGUgZUNvbW1lcmNlIHN0eWxlIHRhZ3MgdG8gdGhlIERPTS5cclxuXHQgKlxyXG5cdCAqIEByZXR1cm4gdm9pZFxyXG5cdCAqL1xyXG5cdGFkZFN0eWxlVGFnKCkgXHJcblx0e1xyXG5cdFx0aWYgKERPTS5maW5kKCcjVHVyYm8tZUNvbW1lcmNlLUNhcnQnKSkge1xyXG5cdFx0XHRyZXR1cm47XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKHRoaXMuc2V0dGluZ3Mubm9fY3NzKSB7XHJcblx0XHRcdHJldHVybjtcclxuXHRcdH1cclxuXHJcblx0XHRsZXQgcG9zaXRpb24gPSAodGhpcy5zZXR0aW5ncy5maXhlZCkgPyAnZml4ZWQnIDogJ2Fic29sdXRlJztcclxuXHJcblx0XHRsZXQgY3NzID0gYFxyXG5cdFx0XHQke3RoaXMuc2V0dGluZ3MuZWxlbWVudH0ge1xyXG5cdFx0XHRcdHBvc2l0aW9uOiAke3Bvc2l0aW9ufTtcclxuXHRcdFx0XHRjdXJzb3I6IHBvaW50ZXI7XHJcblx0XHRcdFx0Y29sb3I6ICNmZmZmZmY7XHJcblx0XHRcdFx0ei1pbmRleDogOTk4O1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHQke3RoaXMuc2V0dGluZ3MuZWxlbWVudH0gc3ZnIHtcclxuXHRcdFx0XHR3aWR0aDogJHt0aGlzLnNldHRpbmdzLndpZHRofTtcclxuXHRcdFx0XHRoZWlnaHQ6ICR7dGhpcy5zZXR0aW5ncy5oZWlnaHR9O1xyXG5cdFx0XHRcdHRyYW5zaXRpb246IGZpbGwgMC4zcztcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0JHt0aGlzLnNldHRpbmdzLmVsZW1lbnR9IHN2Zzpob3ZlciB7XHJcblx0XHRcdFx0ZmlsbDogJHt0aGlzLnNldHRpbmdzLmhvdmVyX2NvbG9yfTtcclxuXHRcdFx0XHR0cmFuc2l0aW9uOiBmaWxsIDAuM3M7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdCR7dGhpcy5zZXR0aW5ncy5lbGVtZW50fS50b3AtcmlnaHQsXHJcblx0XHRcdCR7dGhpcy5zZXR0aW5ncy5lbGVtZW50fS5yaWdodC10b3Age1xyXG5cdFx0XHRcdHJpZ2h0OiAxMHB4O1xyXG5cdFx0XHRcdHRvcDogMTBweDtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0JHt0aGlzLnNldHRpbmdzLmVsZW1lbnR9LmxlZnQtdG9wLFxyXG5cdFx0XHQke3RoaXMuc2V0dGluZ3MuZWxlbWVudH0udG9wLWxlZnQge1xyXG5cdFx0XHRcdGxlZnQ6IDEwcHg7XHJcblx0XHRcdFx0dG9wOiAxMHB4O1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHQke3RoaXMuc2V0dGluZ3MuZWxlbWVudH0gPiAjcHJldmlldyB7XHJcblx0XHRcdFx0cG9zaXRpb246ICR7cG9zaXRpb259O1xyXG5cdFx0XHRcdHotaW5kZXg6IDk5OTk7XHJcblx0XHRcdFx0dG9wOiBjYWxjKDEwcHggKyAke3RoaXMuc2V0dGluZ3MuaGVpZ2h0fSk7XHJcblx0XHRcdFx0dHJhbnNmb3JtOiB0cmFuc2xhdGVYKDYwcHgpO1xyXG5cdFx0XHRcdGhlaWdodDogNDAwcHg7XHJcblx0XHRcdFx0d2lkdGg6IDMwMHB4O1xyXG5cdFx0XHRcdGJvcmRlcjogMXB4IHNvbGlkICNlNGU0ZTQ7XHJcblx0XHRcdFx0YmFja2dyb3VuZDogI2ZmZmZmZjtcclxuXHRcdFx0XHR0cmFuc2l0aW9uOiB0cmFuc2Zvcm0gMXMsIHZpc2liaWxpdHkgMXM7XHJcblx0XHRcdFx0Y3Vyc29yOiBkZWZhdWx0O1xyXG5cdFx0XHRcdG92ZXJmbG93LVk6IHNjcm9sbDtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0JHt0aGlzLnNldHRpbmdzLmVsZW1lbnR9ID4gI3ByZXZpZXcub3BlbmVkIHtcclxuXHRcdFx0XHR2aXNpYmlsaXR5OiB2aXNpYmxlO1xyXG5cdFx0XHRcdHRyYW5zZm9ybTogdHJhbnNsYXRlWCgtMjQwcHgpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHQke3RoaXMuc2V0dGluZ3MuZWxlbWVudH0gPiAjcHJldmlldy5jbG9zZWQge1xyXG5cdFx0XHRcdHZpc2liaWxpdHk6IGhpZGRlbjtcclxuXHRcdFx0XHR0cmFuc2Zvcm06IHRyYW5zbGF0ZVgoNjBweCk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdCR7dGhpcy5zZXR0aW5ncy5lbGVtZW50fSAjcHJldmlldyA+IHVsLml0ZW1zIHtcclxuXHRcdFx0XHRwYWRkaW5nOiAwO1xyXG5cdFx0XHRcdGNvbG9yOiAjMDAwMDAwO1xyXG5cdFx0XHRcdGxpc3Qtc3R5bGUtdHlwZTogbm9uZTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0JHt0aGlzLnNldHRpbmdzLmVsZW1lbnR9ICNwcmV2aWV3ID4gdWwuaXRlbXMgPiAucHJldmlldy10YWJsZSB7XHJcblx0XHRcdFx0d2lkdGg6IDEwMCU7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdCR7dGhpcy5zZXR0aW5ncy5lbGVtZW50fSAjcHJldmlldyA+IHVsLml0ZW1zID4gLnByZXZpZXctdGFibGUgdGQge1xyXG5cdFx0XHRcdHBhZGRpbmc6IDRweDtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0JHt0aGlzLnNldHRpbmdzLmVsZW1lbnR9IC5pdGVtcy5sb2FkaW5nIHtcclxuXHRcdFx0XHRkaXNwbGF5OiBub25lO1xyXG5cdFx0XHRcdG92ZXJmbG93LVk6IG5vbmU7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdCR7dGhpcy5zZXR0aW5ncy5lbGVtZW50fSAuY2FydC1sb2FkZXItb3ZlcmxheSB7XHJcblx0XHRcdFx0cG9zaXRpb246IGZpeGVkO1xyXG5cdFx0XHRcdHRvcDogMDsgXHJcblx0XHRcdCAgICBsZWZ0OiAwO1xyXG5cdFx0XHQgICAgcmlnaHQ6IDA7XHJcblx0XHRcdCAgICBib3R0b206IDA7XHJcblx0XHRcdFx0YmFja2dyb3VuZDogI2ZmZmZmZjtcclxuXHRcdFx0XHR3aWR0aDogMTAwJTtcclxuXHRcdFx0XHRoZWlnaHQ6IDEwMCU7XHJcblx0XHRcdFx0bWluLWhlaWdodDogMTAwJTtcclxuXHRcdFx0XHRvdmVyZmxvdzogYXV0bztcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0JHt0aGlzLnNldHRpbmdzLmVsZW1lbnR9IC5jYXJ0LWxvYWRlci1vdmVybGF5IC5jYXJ0LWxvYWRlciB7XHJcblx0XHRcdFx0cG9zaXRpb246IGFic29sdXRlO1xyXG5cdFx0XHRcdHdpZHRoOiA1MHB4O1xyXG5cdFx0XHRcdGhlaWdodDogNTBweDtcclxuXHRcdFx0XHRtYXJnaW4tbGVmdDogLTI1cHg7XHJcblx0XHRcdFx0bWFyZ2luLXRvcDogLTI1cHg7XHJcblx0XHRcdFx0bGVmdDogNTAlO1xyXG5cdFx0XHRcdHJpZ2h0OiA1MCU7XHJcblx0XHRcdFx0dG9wOiA1MCU7XHJcblx0XHRcdFx0Ym90dG9tOiA1MCU7XHJcblx0XHRcdH1cclxuXHRcdGA7XHJcblx0ICAgIFxyXG5cdCAgICBET00uYWRkU3R5bGUoJ1R1cmJvLWVDb21tZXJjZS1DYXJ0JywgY3NzKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIENyZWF0ZXMgYW4gbG9hZGluZyBvdmVybGF5LlxyXG5cdCAqXHJcblx0ICogQHJldHVybiBIVE1MRGl2RWxlbWVudFxyXG5cdCAqL1xyXG5cdGxvYWRpbmdPdmVybGF5KClcclxuXHR7XHJcblx0XHRpZiAobG9hZGluZ092ZXJsYXkpIHtcclxuXHRcdFx0cmV0dXJuIGxvYWRpbmdPdmVybGF5O1xyXG5cdFx0fVxyXG5cclxuXHRcdGxldCBsb2FkZXI7XHJcblxyXG5cdFx0aWYgKHRoaXMuc2V0dGluZ3MubG9hZGVyKSB7XHJcblx0XHRcdGxvYWRlciA9IERPTS5jcmVhdGVFbGVtZW50KCdpbWcnLCB7XHJcblx0XHRcdFx0c3JjOiB0aGlzLnNldHRpbmdzLmxvYWRlcixcclxuXHRcdFx0XHRjbGFzczogJ2NhcnQtbG9hZGVyJ1xyXG5cdFx0XHR9KTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdGxvYWRlciA9IGNyZWF0ZUxvYWRlcigpO1xyXG5cdFx0fVxyXG5cclxuXHRcdGxvYWRpbmdPdmVybGF5ID0gRE9NLmNyZWF0ZUVsZW1lbnQoJ2RpdicsIHtcclxuXHRcdFx0Y2xhc3M6ICdjYXJ0LWxvYWRlci1vdmVybGF5J1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0bG9hZGluZ092ZXJsYXkuYXBwZW5kQ2hpbGQobG9hZGVyKTtcclxuXHJcblx0XHRyZXR1cm4gbG9hZGluZ092ZXJsYXk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBMb2FkaW5nIHRoZSBjYXJ0IHByZXZpZXcuXHJcblx0ICpcclxuXHQgKiBAcmV0dXJuIHZvaWRcclxuXHQgKi9cclxuXHRwcmV2aWV3U3RhcnRMb2FkaW5nKClcclxuXHR7XHJcblx0XHRET00uYWRkQ2xhc3MoaXRlbXNEaXYsICdsb2FkaW5nJyk7XHJcblx0XHR0aGlzLnByZXZpZXdFbGVtZW50LmFwcGVuZENoaWxkKHRoaXMubG9hZGluZ092ZXJsYXkoKSk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBMb2FkaW5nIHRoZSBjYXJ0IHByZXZpZXcuXHJcblx0ICpcclxuXHQgKiBAcmV0dXJuIHZvaWRcclxuXHQgKi9cclxuXHRwcmV2aWV3U3RvcExvYWRpbmcoKVxyXG5cdHtcclxuXHRcdGlmIChET00uZmluZCgnLmNhcnQtbG9hZGVyLW92ZXJsYXknLCB0aGlzLnByZXZpZXdFbGVtZW50KSkge1xyXG5cdFx0XHR0aGlzLnByZXZpZXdFbGVtZW50LnJlbW92ZUNoaWxkKHRoaXMubG9hZGluZ092ZXJsYXkoKSk7XHJcblx0XHRcdERPTS5yZW1vdmVDbGFzcyhpdGVtc0RpdiwgJ2xvYWRpbmcnKTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFJlbG9hZHMgdGhlIGl0ZW1zIGluIHRoZSBjYXJ0IHByZXZpZXcuXHJcblx0ICpcclxuXHQgKiBAcmV0dXJuIHZvaWRcclxuXHQgKi9cclxuXHRyZWxvYWRDYXJ0UHJldmlldygpXHJcblx0e1xyXG5cdFx0dGhpcy5wcmV2aWV3U3RhcnRMb2FkaW5nKCk7XHJcblx0XHRsZXQgaXRlbXMgPSB0aGlzLmdldENhcnRJdGVtcygpO1xyXG5cdFx0dGhpcy5hZGRUb1ByZXZpZXcoaXRlbXMpO1xyXG5cdFx0XHJcblx0XHRsZXQgaW5zdGFuY2UgPSB0aGlzO1xyXG5cclxuXHRcdHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XHJcblx0XHRcdGluc3RhbmNlLnByZXZpZXdTdG9wTG9hZGluZy5jYWxsKGluc3RhbmNlKTtcclxuXHRcdH0sIDEwMDApO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQmluZHMgZXZlbnQgbGlzdGVuZXJzIHRvIHRoZSBjYXJ0IGljb24uXHJcblx0ICpcclxuXHQgKiBAcmV0dXJuIHZvaWRcclxuXHQgKi9cclxuXHRiaW5kRXZlbnRMaXN0ZW5lcnMoKVxyXG5cdHtcclxuXHRcdHRoaXMuaWNvbi5vbmNsaWNrID0gZnVuY3Rpb24oZSkge1xyXG5cdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XHJcblx0XHRcdHRoaXMudG9nZ2xlQ2FydFByZXZpZXcoKTtcclxuXHRcdH0uYmluZCh0aGlzKTtcclxuXHJcblx0XHRFdmVudE1hbmFnZXIkMi5zdWJzY3JpYmUoJ2NhcnQucHJvZHVjdC5hZGRlZCcsIGZ1bmN0aW9uKGF0dHJpYnV0ZXMpIHtcclxuXHRcdFx0dGhpcy5vcGVuQ2FydFByZXZpZXcoKTtcclxuXHRcdFx0dGhpcy5hZGRJdGVtKGF0dHJpYnV0ZXMpO1xyXG5cdFx0XHR0aGlzLnJlbG9hZENhcnRQcmV2aWV3KCk7XHJcblx0XHR9LmJpbmQodGhpcykpO1xyXG5cclxuXHRcdEV2ZW50TWFuYWdlciQyLnN1YnNjcmliZSgnY2FydC5wcm9kdWN0LmZhdm9yaXRlZCcsIGZ1bmN0aW9uKGF0dHJpYnV0ZXMpIHtcclxuXHRcdFx0dGhpcy5mYXZvcml0ZUl0ZW0oYXR0cmlidXRlcyk7XHJcblx0XHR9LmJpbmQodGhpcykpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogT3BlbnMgdGhlIGNhcnQgcHJldmlldy5cclxuXHQgKlxyXG5cdCAqIEByZXR1cm4gdm9pZCBcclxuXHQgKi9cclxuXHRvcGVuQ2FydFByZXZpZXcoKVxyXG5cdHtcclxuXHRcdGlmIChET00uaGFzQ2xhc3ModGhpcy5wcmV2aWV3RWxlbWVudCwgJ29wZW5lZCcpKSB7XHJcblx0XHRcdHRoaXMucmVsb2FkQ2FydFByZXZpZXcoKTtcclxuXHRcdH1cclxuXHJcblx0XHRET00uc3dpdGNoQ2xhc3Nlcyh0aGlzLnByZXZpZXdFbGVtZW50LCAnY2xvc2VkJywgJ29wZW5lZCcpO1xyXG5cdFx0dGhpcy5yZWxvYWRDYXJ0UHJldmlldygpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogVG9nZ2xlcyB0aGUgb3BlbmluZyBjbG9zaW5nIG9mIHRoZSBjYXJ0IHByZXZpZXcuXHJcblx0ICpcclxuXHQgKiBAcmV0dXJuIHZvaWQgXHJcblx0ICovXHJcblx0dG9nZ2xlQ2FydFByZXZpZXcoKVxyXG5cdHtcclxuXHRcdGxldCBvcGVuaW5nID0gRE9NLnRvZ2dsZUNsYXNzKHRoaXMucHJldmlld0VsZW1lbnQsICdvcGVuZWQnLCAnY2xvc2VkJyk7XHJcblx0XHRcdFxyXG5cdFx0aWYgKG9wZW5pbmcpIHtcclxuXHRcdFx0dGhpcy5yZWxvYWRDYXJ0UHJldmlldygpO1x0XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBSZXRyaWV2ZSB0aGUgY2FydHMgaXRlbXMgZnJvbSB0aGUgY29va2llLlxyXG5cdCAqXHJcblx0ICogQHJldHVybiBvYmplY3RcclxuXHQgKi9cclxuXHRnZXRDYXJ0SXRlbXMoKVxyXG5cdHtcclxuXHRcdGxldCBjYXJ0ID0gQ29va2llLmdldCh0aGlzLnNldHRpbmdzLmNvb2tpZV9uYW1lKTtcclxuXHJcblx0XHRyZXR1cm4gKGNhcnQpID8gY2FydC5pdGVtcyA6IFtdO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogSGlkZXMgdGhlIGNvbXBvbmVudCBmcm9tIHRoZSBET00uXHJcblx0ICpcclxuXHQgKiBAcmV0dXJuIHZvaWQgXHJcblx0ICovXHJcblx0aGlkZSgpXHJcblx0e1xyXG5cdFx0dGhpcy5lbGVtZW50LnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcblx0fVxyXG59XHJcblxyXG4vKipcclxuICogQ2xvc2VzIHRoZSBjYXJ0IHByZXZpZXcgZWxlbWVudC5cclxuICpcclxuICogQHBhcmFtIGV2ZW50LmNsaWNrXHJcbiAqL1xyXG5mdW5jdGlvbiBjbG9zZShldmVudCkge1xyXG5cdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcblx0RE9NLnN3aXRjaENsYXNzZXModGhpcy5wcmV2aWV3RWxlbWVudCwgJ29wZW5lZCcsICdjbG9zZWQnKTtcclxufVxyXG5cclxuLyoqXHJcbiAqIENyZWF0ZXMgdGhlIGNhcnQgc3ZnIGljb24uXHJcbiAqXHJcbiAqIEByZXR1cm4gU1ZHU1ZHRWxlbWVudFxyXG4gKi9cclxuZnVuY3Rpb24gY3JlYXRlSWNvbigpIHtcclxuXHRsZXQgc3ZnID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKFwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiwgXCJzdmdcIik7XHJcblx0bGV0IGcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50TlMoXCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiLCBcImdcIik7XHJcblx0bGV0IHBhdGggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50TlMoXCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiLCBcInBhdGhcIik7XHJcblxyXG5cdHN2Zy5zZXRBdHRyaWJ1dGUoJ3ZlcnNpb24nLCAnMS4xJyk7XHJcblx0c3ZnLnNldEF0dHJpYnV0ZSgneG1sbnMnLCAnaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnKTtcclxuXHRzdmcuc2V0QXR0cmlidXRlKCd4bWxuczp4bGluaycsICdodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rJyk7XHJcblx0c3ZnLnNldEF0dHJpYnV0ZSgneCcsICcwcHgnKTtcclxuXHRzdmcuc2V0QXR0cmlidXRlKCd5JywgJzBweCcpO1xyXG5cdHN2Zy5zZXRBdHRyaWJ1dGUoJ3dpZHRoJywgJzQwcHgnKTtcclxuXHRzdmcuc2V0QXR0cmlidXRlKCdoZWlnaHQnLCAnNDBweCcpO1xyXG5cdHN2Zy5zZXRBdHRyaWJ1dGUoJ3ZpZXdCb3gnLCAnMCAwIDQ0Ni44NDMgNDQ2Ljg0MycpO1xyXG5cdHN2Zy5zZXRBdHRyaWJ1dGUoJ3N0eWxlJywgJ2VuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgNDQ2Ljg0MyA0NDYuODQzOycpO1xyXG5cdHN2Zy5zZXRBdHRyaWJ1dGUoJ3htbDpzcGFjZScsICdwcmVzZXJ2ZScpO1xyXG5cclxuXHRwYXRoLnNldEF0dHJpYnV0ZSgnZCcsICdNNDQ0LjA5LDkzLjEwM2MtMi42OTgtMy42OTktNy4wMDYtNS44ODgtMTEuNTg0LTUuODg4SDEwOS45MmMtMC42MjUsMC0xLjI0OSwwLjAzOC0xLjg1LDAuMTE5bC0xMy4yNzYtMzguMjdjLTEuMzc2LTMuOTU4LTQuNDA2LTcuMTEzLTguMy04LjY0NkwxOS41ODYsMTQuMTM0Yy03LjM3NC0yLjg4Ny0xNS42OTUsMC43MzUtMTguNTkxLDguMWMtMi44OTEsNy4zNjksMC43MywxNS42OTUsOC4xLDE4LjU5MWw2MC43NjgsMjMuODcybDc0LjM4MSwyMTQuMzk5Yy0zLjI4MywxLjE0NC02LjA2NSwzLjY2My03LjMzMiw3LjE4N2wtMjEuNTA2LDU5LjczOWMtMS4zMTgsMy42NjMtMC43NzUsNy43MzMsMS40NjgsMTAuOTE2YzIuMjQsMy4xODMsNS44ODMsNS4wNzgsOS43NzMsNS4wNzhoMTEuMDQ0Yy02Ljg0NCw3LjYxNi0xMS4wNDQsMTcuNjQ2LTExLjA0NCwyOC42NzVjMCwyMy43MTgsMTkuMjk4LDQzLjAxMiw0My4wMTIsNDMuMDEyczQzLjAxMi0xOS4yOTQsNDMuMDEyLTQzLjAxMmMwLTExLjAyOS00LjItMjEuMDU5LTExLjA0NC0yOC42NzVoOTMuNzc2Yy02Ljg0Nyw3LjYxNi0xMS4wNDgsMTcuNjQ2LTExLjA0OCwyOC42NzVjMCwyMy43MTgsMTkuMjk0LDQzLjAxMiw0My4wMTMsNDMuMDEyYzIzLjcxOCwwLDQzLjAxMi0xOS4yOTQsNDMuMDEyLTQzLjAxMmMwLTExLjAyOS00LjItMjEuMDU5LTExLjA0My0yOC42NzVoMTMuNDMzYzYuNTk5LDAsMTEuOTQ3LTUuMzQ5LDExLjk0Ny0xMS45NDhjMC02LjU5OS01LjM0OS0xMS45NDctMTEuOTQ3LTExLjk0N0gxNDMuNjQ3bDEzLjMxOS0zNi45OTZjMS43MiwwLjcyNCwzLjU3OCwxLjE1Miw1LjUyMywxLjE1MmgyMTAuMjc4YzYuMjM0LDAsMTEuNzUxLTQuMDI3LDEzLjY1LTkuOTU5bDU5LjczOS0xODYuMzg3QzQ0Ny41NTcsMTAxLjU2Nyw0NDYuNzg4LDk2LjgwMiw0NDQuMDksOTMuMTAzeiBNMTY5LjY1OSw0MDkuODA3Yy0xMC41NDMsMC0xOS4xMTYtOC41NzMtMTkuMTE2LTE5LjExNnM4LjU3My0xOS4xMTcsMTkuMTE2LTE5LjExN3MxOS4xMTYsOC41NzQsMTkuMTE2LDE5LjExN1MxODAuMjAyLDQwOS44MDcsMTY5LjY1OSw0MDkuODA3eiBNMzI3LjM2Nyw0MDkuODA3Yy0xMC41NDMsMC0xOS4xMTctOC41NzMtMTkuMTE3LTE5LjExNnM4LjU3NC0xOS4xMTcsMTkuMTE3LTE5LjExN2MxMC41NDIsMCwxOS4xMTYsOC41NzQsMTkuMTE2LDE5LjExN1MzMzcuOTA5LDQwOS44MDcsMzI3LjM2Nyw0MDkuODA3eiBNNDAyLjUyLDE0OC4xNDloLTczLjE2MVYxMTUuODloODMuNDk5TDQwMi41MiwxNDguMTQ5eiBNMzgxLjQ1MywyMTMuODYxaC01Mi4wOTR2LTM3LjAzOGg2My45NjdMMzgxLjQ1MywyMTMuODYxeiBNMjM0LjU3MSwyMTMuODYxdi0zNy4wMzhoNjYuMTEzdjM3LjAzOEgyMzQuNTcxeiBNMzAwLjY4NCwyNDIuNTM4djMxLjA2NGgtNjYuMTEzdi0zMS4wNjRIMzAwLjY4NHogTTEzOS4xMTUsMTc2LjgyM2g2Ni43ODR2MzcuMDM4aC01My45MzNMMTM5LjExNSwxNzYuODIzeiBNMjM0LjU3MSwxNDguMTQ5VjExNS44OWg2Ni4xMTN2MzIuMjU5SDIzNC41NzF6IE0yMDUuODk4LDExNS44OXYzMi4yNTloLTc2LjczNGwtMTEuMTkxLTMyLjI1OUgyMDUuODk4eiBNMTYxLjkxNiwyNDIuNTM4aDQzLjk4MnYzMS4wNjRoLTMzLjIwNkwxNjEuOTE2LDI0Mi41Mzh6IE0zMjkuMzU5LDI3My42MDN2LTMxLjA2NGg0Mi45MDlsLTkuOTU1LDMxLjA2NEgzMjkuMzU5eicpO1xyXG5cclxuXHRnLmFwcGVuZENoaWxkKHBhdGgpO1xyXG5cdHN2Zy5hcHBlbmRDaGlsZChnKTtcclxuXHJcblx0bGV0ICBkaXYgPSBET00uY3JlYXRlRWxlbWVudCgnZGl2Jywge1xyXG5cdFx0aWQ6ICdjYXJ0SWNvbicsXHJcblx0fSk7XHJcblxyXG5cdGRpdi5hcHBlbmRDaGlsZChzdmcpO1xyXG5cclxuXHRyZXR1cm4gZGl2O1xyXG59XHJcblxyXG4vKipcclxuICogQ3JlYXRlcyB0aGUgY2FydCBsb2FkZXIgaWNvbi5cclxuICpcclxuICogQHJldHVybiBTVkdTVkdFbGVtZW50XHJcbiAqL1xyXG5mdW5jdGlvbiBjcmVhdGVMb2FkZXIoKSB7XHJcblx0bGV0IHN2ZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnROUyhcImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIsIFwic3ZnXCIpO1xyXG5cdGxldCBjb3VudCA9IDEyO1xyXG5cdGxldCBncm91cHMgPSBbXTtcclxuXHRsZXQgcmVjdGFuZ2VscyA9IFtdO1xyXG5cdGxldCBhbmltYXRpb25zID0gW107XHJcblxyXG5cdHN2Zy5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgJ2xkcy1zcGlubmVyJyk7XHJcblx0c3ZnLnNldEF0dHJpYnV0ZSgnd2lkdGgnLCAnMjAwcHgnKTtcclxuXHRzdmcuc2V0QXR0cmlidXRlKCdoZWlnaHQnLCAnMjAwcHgnKTtcclxuXHRzdmcuc2V0QXR0cmlidXRlKCd4bWxucycsICdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZycpO1xyXG5cdHN2Zy5zZXRBdHRyaWJ1dGUoJ3htbG5zOnhsaW5rJywgJ2h0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsnKTtcclxuXHRzdmcuc2V0QXR0cmlidXRlKCd2aWV3Qm94JywgJzAgMCAxMDAgMTAwJyk7XHJcblx0c3ZnLnNldEF0dHJpYnV0ZSgncHJlc2VydmVBc3BlY3RSYXRpbycsICd4TWlkWU1pZCcpO1xyXG5cdHN2Zy5zZXRBdHRyaWJ1dGUoJ3N0eWxlJywgJ2JhY2tncm91bmQ6IG5vbmU7Jyk7XHJcblx0XHJcblx0dmFyIHJvdGF0aW9uID0gMDtcclxuXHJcblx0Zm9yICh2YXIgaSA9IDA7IGkgPCBjb3VudDsgaSsrKSB7XHJcblx0XHRsZXQgZ3JvdXAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50TlMoXCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiLCBcImdcIik7XHJcblx0XHRncm91cC5zZXRBdHRyaWJ1dGUoJ3RyYW5zZm9ybScsICdyb3RhdGUoJyArIHJvdGF0aW9uICsgJyA1MCA1MCknKTtcclxuXHRcdHJvdGF0aW9uICs9IDMwO1xyXG5cdFx0Z3JvdXBzLnB1c2goZ3JvdXApO1xyXG5cdH1cclxuXHJcblx0Zm9yICh2YXIgaSA9IDA7IGkgPCBjb3VudDsgaSsrKSB7XHJcblx0XHRsZXQgcmVjdGFuZ2VsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKFwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiwgXCJyZWN0XCIpO1xyXG5cdFx0cmVjdGFuZ2VsLnNldEF0dHJpYnV0ZSgneCcsICc0NycpO1xyXG5cdFx0cmVjdGFuZ2VsLnNldEF0dHJpYnV0ZSgneScsICcyNCcpO1xyXG5cdFx0cmVjdGFuZ2VsLnNldEF0dHJpYnV0ZSgncngnLCAnOS40Jyk7XHJcblx0XHRyZWN0YW5nZWwuc2V0QXR0cmlidXRlKCdyeScsICc0LjgnKTtcclxuXHRcdHJlY3RhbmdlbC5zZXRBdHRyaWJ1dGUoJ3dpZHRoJywgJzYnKTtcclxuXHRcdHJlY3RhbmdlbC5zZXRBdHRyaWJ1dGUoJ2hlaWdodCcsICcxMicpO1xyXG5cdFx0cmVjdGFuZ2VsLnNldEF0dHJpYnV0ZSgnZmlsbCcsICcjNDY1OGFjJyk7XHJcblx0XHRyZWN0YW5nZWxzLnB1c2gocmVjdGFuZ2VsKTtcclxuXHR9XHJcblxyXG5cdHZhciBiZWdpbiA9IDAuMDkgKiAxMTtcclxuXHJcblx0Zm9yICh2YXIgaSA9IDA7IGkgPCBjb3VudDsgaSsrKSB7XHJcblx0XHRsZXQgYW5pbWF0ZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnROUyhcImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIsIFwiYW5pbWF0ZVwiKTtcclxuXHRcdGFuaW1hdGUuc2V0QXR0cmlidXRlKCdhdHRyaWJ1dGVOYW1lJywgJ29wYWNpdHknKTtcclxuXHRcdGFuaW1hdGUuc2V0QXR0cmlidXRlKCd2YWx1ZXMnLCAnMTswJyk7XHJcblx0XHRhbmltYXRlLnNldEF0dHJpYnV0ZSgndGltZXMnLCAnMDsxJyk7XHJcblx0XHRhbmltYXRlLnNldEF0dHJpYnV0ZSgnZHVyJywgJzFzJyk7XHJcblx0XHRhbmltYXRlLnNldEF0dHJpYnV0ZSgnYmVnaW4nLCBiZWdpbi50b0ZpeGVkKDgpICsgJ3MnKTtcclxuXHRcdGFuaW1hdGUuc2V0QXR0cmlidXRlKCdyZXBlYXRDb3VudCcsICdpbmRlZmluaXRlJyk7XHJcblx0XHRhbmltYXRpb25zLnB1c2goYW5pbWF0ZSk7XHJcblx0XHRiZWdpbiAtPSAwLjA5O1xyXG5cdH1cclxuXHJcblx0Zm9yICh2YXIgaSA9IDA7IGkgPCBncm91cHMubGVuZ3RoOyBpKyspIHtcclxuXHRcdGxldCBncm91cCA9IGdyb3Vwc1tpXTtcdFx0XHJcblx0XHRsZXQgcmVjdGFuZ2VsID0gcmVjdGFuZ2Vsc1tpXTtcclxuXHRcdGxldCBhbmltYXRlID0gYW5pbWF0aW9uc1tpXTtcclxuXHRcdHJlY3RhbmdlbC5hcHBlbmRDaGlsZChhbmltYXRlKTtcclxuXHRcdGdyb3VwLmFwcGVuZENoaWxkKHJlY3RhbmdlbCk7XHJcblx0XHRzdmcuYXBwZW5kQ2hpbGQoZ3JvdXApO1xyXG5cdH1cclxuXHJcblx0RE9NLmFkZENsYXNzKHN2ZywgJ2NhcnQtbG9hZGVyJyk7XHJcblxyXG5cdHJldHVybiBzdmc7XHRcclxufVxuXG4vKipcclxuICogQGZpbGUgXHJcbiAqIEZpbHRlciBjbGFzcy5cclxuICpcclxuICogVGhlIEZpbHRlciBPYmplY3QsIGhhbmRsZXMgdGhlIGZpbHRlciBvZiB0aGUgcHJvZHVjdHMvc2VydmljZXMuXHJcbiAqL1xyXG5cclxuLyoqXHJcbiAqIFRoZSBkZWZhdWx0IHNldHRpbmdzIG9mIHRoZSBmaWx0ZXIuXHJcbiAqL1xyXG5sZXQgZGVmYXVsdFNldHRpbmdzJDIgPSB7XHJcblx0ZWxlbWVudDogJy5maWx0ZXInLFxyXG5cdGNsYXNzOiAnJyxcclxuXHR3aWR0aDogJycsXHJcblx0aGVpZ2h0OiAnJyxcclxuXHRub19jc3M6IGZhbHNlLFxyXG59O1xyXG5cclxuLyoqXHJcbiAqIFN0b3JlcyB0aGUgY29udGFpbmVyIG9iamVjdC5cclxuICpcclxuICogQHZhciBcXENvcmVcXENvbnRhaW5lclxyXG4gKi9cclxubGV0IENvbnRhaW5lciQxO1xyXG5cclxuY2xhc3MgRmlsdGVyIFxyXG57XHJcblx0LyoqXHJcblx0ICogLSBJbml0aWFsaXplIHRoZSBJb0MgY29udGFpbmVyLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIFxcQ29yZVxcQ29udGFpbmVyIHwgY29udGFpbmVyXHJcblx0ICogQHJldHVybiB2b2lkXHJcblx0ICovXHJcblx0Y29uc3RydWN0b3IoY29udGFpbmVyKSBcclxuXHR7XHJcblx0XHRDb250YWluZXIkMSA9IGNvbnRhaW5lcjtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFNldHVwIHRoZSBmaWx0ZXIgY2xhc3MuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gb2JqZWN0IHwgc2V0dGluZ3NcclxuXHQgKiBAcmV0dXJuIHZvaWRcclxuXHQgKi9cclxuXHRzZXR1cChzZXR0aW5ncylcclxuXHR7XHJcblx0XHRpZih0eXBlb2Ygc2V0dGluZ3MgIT0gJ29iamVjdCcpIHtcclxuXHRcdFx0dGhyb3cgbmV3IEludmFsaWRBcmd1bWVudEV4Y2VwdGlvbiQxO1xyXG5cdFx0fVxyXG5cclxuXHRcdHRoaXMuc2V0dGluZ3MgPSBDb21tb24uZXh0ZW5kKGRlZmF1bHRTZXR0aW5ncyQyLCBzZXR0aW5ncyk7XHJcblxyXG5cdFx0ZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsIGZ1bmN0aW9uKCkge1xyXG5cclxuXHRcdFx0dGhpcy5zZXRFbGVtZW50KHRoaXMuc2V0dGluZ3MuZWxlbWVudCk7XHJcblxyXG5cdFx0XHR0aGlzLmFkZFN0eWxlVGFnKCk7XHRcclxuXHRcdH0uYmluZCh0aGlzKSk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBTZXRzIHRoZSBlbGVtZW50IHRvIGJlIGJvdW5kIHRvLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIHN0cmluZyB8IHNlbGVjdG9yXHJcblx0ICogQHJldHVybiB2b2lkXHJcblx0ICovXHJcblx0c2V0RWxlbWVudChzZWxlY3RvcilcclxuXHR7XHJcblx0XHR0aGlzLmVsZW1lbnQgPSBET00uZmluZChzZWxlY3Rvcik7XHJcblx0XHRcclxuXHRcdERPTS5hZGRDbGFzcyh0aGlzLmVsZW1lbnQsIHRoaXMuc2V0dGluZ3MuY2xhc3MpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQWRkIHRoZSBlQ29tbWVyY2Ugc3R5bGUgdGFncyB0byB0aGUgRE9NLlxyXG5cdCAqL1xyXG5cdGFkZFN0eWxlVGFnKCkgXHJcblx0e1xyXG5cdFx0aWYgKERPTS5maW5kKCcjVHVyYm8tZUNvbW1lcmNlLUZpbHRlcicpKSB7XHJcblx0XHRcdHJldHVybjtcclxuXHRcdH1cclxuXHJcblx0XHRpZiAodGhpcy5zZXR0aW5ncy5ub19jc3MpIHtcclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0fVxyXG5cclxuXHRcdGxldCB3aWR0aCA9ICh0aGlzLnNldHRpbmdzLndpZHRoKSA/ICd3aWR0aDonICsgdGhpcy5zZXR0aW5ncy53aWR0aCArICc7JyA6ICcnO1xyXG5cdFx0bGV0IG1pbldpZHRoID0gdGhpcy5zZXR0aW5ncy5taW5fd2lkdGggfHwgJzIwMHB4JztcclxuXHRcdGxldCBoZWlnaHQgPSB0aGlzLnNldHRpbmdzLmhlaWdodCB8fCAnYXV0byc7XHJcblxyXG5cdFx0bGV0IGNzcyA9IGBcclxuXHRcdFx0JHt0aGlzLnNldHRpbmdzLmVsZW1lbnR9IHtcclxuXHRcdFx0XHRwb3NpdGlvbjogcmVsYXRpdmU7XHJcblx0XHRcdFx0bWFyZ2luOiA1cHggNXB4O1xyXG5cdFx0XHRcdGJvcmRlcjogMXB4IHNvbGlkICNlNGU0ZTQ7XHJcblx0XHRcdFx0JHt3aWR0aH1cclxuXHRcdFx0XHRtaW4td2lkdGg6ICR7bWluV2lkdGh9O1xyXG5cdFx0XHRcdGhlaWdodDogJHtoZWlnaHR9O1xyXG5cdFx0XHRcdG1pbi1oZWlnaHQ6IDIwMHB4O1xyXG5cdFx0XHRcdGNvbG9yOiAjZmZmZmZmO1xyXG5cdFx0XHRcdG92ZXJmbG93OiBoaWRkZW47XHJcblx0XHRcdH1cclxuXHJcblx0XHRgO1xyXG5cdCAgICBcclxuXHQgICAgRE9NLmFkZFN0eWxlKCdUdXJiby1lQ29tbWVyY2UtRmlsdGVyJywgY3NzKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEhpZGVzIHRoZSBjb21wb25lbnQgZnJvbSB0aGUgRE9NLlxyXG5cdCAqXHJcblx0ICogQHJldHVybiB2b2lkIFxyXG5cdCAqL1xyXG5cdGhpZGUoKVxyXG5cdHtcclxuXHRcdHRoaXMuZWxlbWVudC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xyXG5cdH1cclxufVxuXG4vLyBIZWxwZXJzXHJcbi8vIEV4Y2VwdGlvbnNcclxuLyoqXHJcbiAqIEBmaWxlIFxyXG4gKiBDYXJ0IGNsYXNzLlxyXG4gKlxyXG4gKiBIYW5kbGVzIGFkZGluZywgcmVtb3ZpbmcgZXRjLi4uIG9mIGl0ZW1zLlxyXG4gKi9cclxuXHJcbi8qKlxyXG4gKiBUaGUgZGVmYXVsdCBzZXR0aW5ncyBvZiB0aGUgY2FydC5cclxuICpcclxuICogQHZhciBvYmplY3RcclxuICovXHJcbmxldCBkZWZhdWx0U2V0dGluZ3MkMyA9IHtcclxuXHRlbGVtZW50OiAnLmNoZWNrb3V0JyxcclxuXHRub19jc3M6IGZhbHNlLFxyXG59O1xyXG5cclxuLyoqXHJcbiAqIFN0b3JlcyB0aGUgY29udGFpbmVyIG9iamVjdC5cclxuICpcclxuICogQHZhciBcXENvcmVcXENvbnRhaW5lclxyXG4gKi9cclxubGV0IENvbnRhaW5lciQyO1xyXG5cclxuLyoqXHJcbiAqIFN0b3JlcyB0aGUgZXZlbnQgbWFuYWdlciBvYmplY3QuXHJcbiAqXHJcbiAqIEB2YXIgXFxDb3JlXFxFdmVudE1hbmFnZXJcclxuICovXHJcbmxldCBFdmVudE1hbmFnZXIkMztcclxuXHJcbi8qKlxyXG4gKiBTdG9yZXMgdGhlIHJlcXVlc3Qgb2JqZWN0LlxyXG4gKlxyXG4gKiBAdmFyIFxcSGVscGVyc1xcUmVxdWVzdFxyXG4gKi9cclxubGV0IEh0dHAkMTtcclxuXHJcblxyXG5jbGFzcyBDaGVja291dCBcclxue1xyXG5cdC8qKlxyXG5cdCAqIC0gSW5pdGlhbGl6ZSB0aGUgSW9DIGNvbnRhaW5lclxyXG5cdCAqIC0gSW5pdGlhbGl6ZSB0aGUgUmVxdWVzdFxyXG5cdCAqIC0gSW5pdGlhbGl6ZSB0aGUgRXZlbnRNYW5hZ2VyXHJcblx0ICogLSBMaXN0ZW4gdG8gY2hlY2tvdXQgZXZlbnQuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gXFxDb3JlXFxDb250YWluZXIgfCBjb250YWluZXJcclxuXHQgKiBAcGFyYW0gXFxIZWxwZXJzXFxSZXF1ZXN0IHwgaHR0cFxyXG5cdCAqIEBwYXJhbSBcXENvcmVcXEV2ZW50TWFuYWdlciB8IGV2ZW50TWFuYWdlclxyXG5cdCAqIEByZXR1cm4gdm9pZFxyXG5cdCAqL1xyXG5cdGNvbnN0cnVjdG9yKGNvbnRhaW5lciwgaHR0cCwgZXZlbnRNYW5hZ2VyKSBcclxuXHR7XHJcblx0XHRDb250YWluZXIkMiA9IGNvbnRhaW5lcjtcclxuXHRcdEh0dHAkMSA9IGh0dHA7XHJcblx0XHRFdmVudE1hbmFnZXIkMyA9IGV2ZW50TWFuYWdlcjtcclxuXHRcdFxyXG5cdFx0RXZlbnRNYW5hZ2VyJDMuc3Vic2NyaWJlKCdjYXJ0LmNoZWNrb3V0JywgZnVuY3Rpb24oKSB7XHRcclxuXHRcdFx0dGhpcy5oaWRlQWxsKCk7XHJcblx0XHRcdHRoaXMuc2hvdygpO1xyXG5cdFx0fS5iaW5kKHRoaXMpKTtcdFxyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogU2V0cyB0aGUgb2JqZWN0IGJ5IHRoZSB1c2VycyBzZXR0aW5nLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIG9iamVjdCB8IHNldHRpbmdzXHJcblx0ICogQHJldHVybiB2b2lkXHJcblx0ICovXHJcblx0c2V0dXAoc2V0dGluZ3MpXHJcblx0e1xyXG5cdFx0aWYgKHR5cGVvZiBzZXR0aW5ncyAhPSAnb2JqZWN0Jykge1xyXG5cdFx0XHR0aHJvdyBuZXcgSW52YWxpZEFyZ3VtZW50RXhjZXB0aW9uJDE7XHJcblx0XHR9XHJcblxyXG5cdFx0dGhpcy5zZXR0aW5ncyA9IENvbW1vbi5leHRlbmQoZGVmYXVsdFNldHRpbmdzJDMsIHNldHRpbmdzKTtcclxuXHJcblx0XHRkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgZnVuY3Rpb24oKSB7XHJcblxyXG5cdFx0XHR0aGlzLnNldEVsZW1lbnQodGhpcy5zZXR0aW5ncy5lbGVtZW50KTtcclxuXHRcdFx0dGhpcy5oaWRlKCk7XHJcblx0XHRcdHRoaXMuYWRkU3R5bGVUYWcoKTtcclxuXHRcdH0uYmluZCh0aGlzKSk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBCaW5kcyBldmVydGhpbmcgdG8gdGhlIGVsZW1lbnQuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gc3RyaW5nIHwgc2VsZWN0b3JcclxuXHQgKiBAcmV0dXJuIHZvaWRcclxuXHQgKi9cclxuXHRzZXRFbGVtZW50KHNlbGVjdG9yKVxyXG5cdHtcclxuXHRcdHRoaXMuZWxlbWVudCA9IERPTS5maW5kKHNlbGVjdG9yKTtcclxuXHJcblx0XHRpZiAodGhpcy5lbGVtZW50KSB7XHJcblx0XHRcdERPTS5hZGRDbGFzcyh0aGlzLmVsZW1lbnQsIHRoaXMuc2V0dGluZ3MuY2xhc3MpO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQWRkIHRoZSBlQ29tbWVyY2Ugc3R5bGUgdGFncyB0byB0aGUgRE9NLlxyXG5cdCAqXHJcblx0ICogQHJldHVybiB2b2lkXHJcblx0ICovXHJcblx0YWRkU3R5bGVUYWcoKSBcclxuXHR7XHJcblx0XHRpZiAoRE9NLmZpbmQoJyNUdXJiby1lQ29tbWVyY2UtQ2hlY2tvdXQnKSkge1xyXG5cdFx0XHRyZXR1cm47XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKHRoaXMuc2V0dGluZ3Mubm9fY3NzKSB7XHJcblx0XHRcdHJldHVybjtcclxuXHRcdH1cclxuXHJcblx0XHRsZXQgcG9zaXRpb24gPSAodGhpcy5zZXR0aW5ncy5maXhlZCkgPyAnZml4ZWQnIDogJ2Fic29sdXRlJztcclxuXHJcblx0XHRsZXQgY3NzID0gYFxyXG5cdFx0XHQke3RoaXMuc2V0dGluZ3MuZWxlbWVudH0ge1xyXG5cdFx0XHRcdHdpZHRoOiAxMDAlO1xyXG5cdFx0XHRcdG1pbi1oZWlnaHQ6IDQwMHB4O1xyXG5cdFx0XHRcdGJvcmRlcjogMXB4IHNvbGlkICNlNGU0ZTQ7XHJcblx0XHRcdH1cclxuXHRcdGA7XHJcblx0ICAgIFxyXG5cdCAgICBET00uYWRkU3R5bGUoJ1R1cmJvLWVDb21tZXJjZS1DaGVja291dCcsIGNzcyk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBIaWRlcyBhbGwgaXJyZWxldmFudCBlbGVtZW50cyBmcm9tIHRoZSBET00uXHJcblx0ICpcclxuXHQgKiBAcmV0dXJuIHZvaWQgXHJcblx0ICovXHJcblx0aGlkZUFsbCgpXHJcblx0e1x0XHJcblx0XHRDb250YWluZXIkMi5Db21wb25lbnRzLmJvb3RlZC5mb3JFYWNoKGZ1bmN0aW9uKGNvbXBvbmVudCkge1xyXG5cdFx0XHRpZiAoY29tcG9uZW50LmNvbnN0cnVjdG9yLm5hbWUgIT0gJ0NoZWNrb3V0Jykge1xyXG5cdFx0XHRcdGNvbXBvbmVudC5oaWRlKCk7XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogSGlkZXMgdGhlIGNvbXBvbmVudCBmcm9tIHRoZSBET00uXHJcblx0ICpcclxuXHQgKiBAcmV0dXJuIHZvaWQgXHJcblx0ICovXHJcblx0aGlkZSgpXHJcblx0e1xyXG5cdFx0dGhpcy5lbGVtZW50LnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBTaG93cyB0aGUgZWxlbWVudCBvbiB0aGUgRE9NLlxyXG5cdCAqXHJcblx0ICogQHJldHVybiB2b2lkIFxyXG5cdCAqL1xyXG5cdHNob3coKVxyXG5cdHtcclxuXHRcdHRoaXMuZWxlbWVudC5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcclxuXHR9XHJcbn1cblxuLyoqXHJcbiAqIEBmaWxlIFxyXG4gKiBQcm9kdWN0cyBjbGFzcy5cclxuICpcclxuICogVGhlIFByb2R1Y3RzIGNvbXBvbmVudCwgaGFuZGxlcyB0aGUgcHJvZHVjdHMgdGFza3MuXHJcbiAqL1xyXG5cclxuXHJcbi8qKlxyXG4gKiBUaGUgZGVmYXVsdCBzZXR0aW5ncyBvZiBlYWNoIHByb2R1Y3QuXHJcbiAqXHJcbiAqIEB2YXIgb2JqZWN0XHJcbiAqL1xyXG5sZXQgZGVmYXVsdFNldHRpbmdzJDQgPSB7XHJcblx0ZWxlbWVudDogJy5wcm9kdWN0cycsXHJcblx0Y2xhc3M6ICcnLFxyXG5cdGl0ZW1fY2xhc3M6ICcnLFxyXG5cdGFkZF9idXR0b25fY2xhc3M6ICdidG4gYnRuLXByaW1hcnknLFxyXG5cdGZhdm9yaXRlX2J1dHRvbl9jbGFzczogJ2J0biBidG4tZGFuZ2VyJyxcclxuXHR3aWR0aDogJzIwMHB4JyxcclxuXHRoZWlnaHQ6ICcyNTBweCcsXHJcblx0YXR0cmlidXRlczogWyduYW1lJywgJ3ByaWNlJywgJ2RlbGl2ZXJ5VGltZScsICdpbWFnZSddLFxyXG5cdHVybDogJ3Byb2R1Y3RzLnBocCcsXHJcblx0bm9fY3NzOiBmYWxzZSxcclxuXHRjdXJyZW5jeTogJyQnLFxyXG59O1xyXG5cclxuLyoqXHJcbiAqIFN0b3JlcyB0aGUgY29udGFpbmVyIG9iamVjdC5cclxuICogXHJcbiAqIEB2YXIgXFxDb3JlXFxDb250YWluZXJcclxuICovXHJcbmxldCBDb250YWluZXIkMztcclxuXHJcbi8qKlxyXG4gKiBTdG9yZXMgdGhlIGNvbnRhaW5lciBvYmplY3QuXHJcbiAqIFxyXG4gKiBAdmFyIFxcQ29yZVxcRXZlbnRNYW5hZ2VyXHJcbiAqL1xyXG5sZXQgRXZlbnRNYW5hZ2VyJDQ7XHJcblxyXG4vKipcclxuICogU3RvcmVzIHRoZSByZXF1ZXN0IG9iamVjdC5cclxuICogXHJcbiAqIEB2YXIgXFxIZWxwZXJcXFJlcXVlc3QgXHJcbiAqL1xyXG5sZXQgSHR0cCQyO1xyXG5cclxuLyoqXHJcbiAqIFN0b3JlcyB0aGUgY2h1bmtlZCBwZXIgXHJcbiAqIHBhZ2UgcHJvZHVjdHMuXHJcbiAqIFxyXG4gKiBAdmFyIGFycmF5XHJcbiAqL1xyXG5sZXQgY2h1bmtlZFByb2R1Y3RzO1xyXG5cclxuY2xhc3MgUHJvZHVjdHMgXHJcbntcclxuXHQvKipcclxuXHQgKiBJbml0YWxpemUgdGhlIENvbnRhaW5lci5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSBcXENvcmVcXENvbnRhaW5lciB8IGNvbnRhaW5lclxyXG5cdCAqIEBwYXJhbSBcXEhlbHBlcnNcXFJlcXVlc3QgfCBodHRwXHJcblx0ICogQHJldHVybiB2b2lkXHJcblx0ICovXHJcblx0Y29uc3RydWN0b3IoY29udGFpbmVyLCBodHRwLCBldmVudE1hbmFnZXIpIFxyXG5cdHtcclxuXHRcdENvbnRhaW5lciQzID0gY29udGFpbmVyO1xyXG5cdFx0SHR0cCQyID0gaHR0cDtcclxuXHRcdEV2ZW50TWFuYWdlciQ0ID0gZXZlbnRNYW5hZ2VyO1xyXG5cdFx0Y2h1bmtlZFByb2R1Y3RzID0gW107XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBTZXRzIHRoZSBnaXZlbiBzZXR0aW5ncyBmcm9tIHRoZSB1c2VyLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIG9iamVjdCB8IHNldHRpbmdzXHJcblx0ICogQHJldHVybiB2b2lkXHJcblx0ICovXHJcblx0c2V0dXAoc2V0dGluZ3MpXHJcblx0e1xyXG5cdFx0aWYgKHR5cGVvZiBzZXR0aW5ncyAhPSAnb2JqZWN0Jykge1xyXG5cdFx0XHR0aHJvdyBuZXcgSW52YWxpZEFyZ3VtZW50RXhjZXB0aW9uJDE7XHJcblx0XHR9XHJcblxyXG5cdFx0dGhpcy5zZXR0aW5ncyA9IENvbW1vbi5leHRlbmQoZGVmYXVsdFNldHRpbmdzJDQsIHNldHRpbmdzKTtcclxuXHRcdHRoaXMudG90YWxJdGVtcyA9IG51bGw7XHJcblxyXG5cdFx0ZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsIGZ1bmN0aW9uKCkge1xyXG5cclxuXHRcdFx0dGhpcy5zZXRFbGVtZW50KHRoaXMuc2V0dGluZ3MuZWxlbWVudCk7XHJcblxyXG5cdFx0XHR0aGlzLmFkZFN0eWxlVGFnKCk7XHRcclxuXHJcblx0XHRcdHRoaXMubG9hZFByb2R1Y3RzKDEpO1xyXG5cdFx0fS5iaW5kKHRoaXMpKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIExvYWRzIHRoZSBwcm9kdWN0cyBmb3IgdGhlIHBhZ2UuXHJcblx0ICogXHJcblx0ICogQHBhcmFtIG51bWJlciB8IHBhZ2VOdW1iZXJcclxuXHQgKiBAcmV0dXJuIHZvaWRcclxuXHQgKi9cclxuXHRsb2FkUHJvZHVjdHMocGFnZU51bWJlciA9IDEpXHJcblx0e1xyXG5cdFx0aWYgKENvbnRhaW5lciQzLlBhZ2luYXRpb24gJiYgQ29udGFpbmVyJDMuUGFnaW5hdGlvbi5ib290ZWQpIHtcclxuXHRcdFx0XHJcblx0XHRcdGxldCBsaW1pdCA9IENvbnRhaW5lciQzLlBhZ2luYXRpb24uc2V0dGluZ3MucGVyX3BhZ2U7XHJcblxyXG5cdFx0XHRzd2l0Y2goQ29udGFpbmVyJDMuUGFnaW5hdGlvbi5zZXR0aW5ncy5wcm9jZXNzaW5nKSBcclxuXHRcdFx0e1xyXG5cdFx0XHRcdGNhc2UgJ2NsaWVudC1zaWRlJzpcclxuXHRcdFx0XHRcdHJldHVybiB0aGlzLmxvYWRQYWdlUHJvZHVjdHNPbmNlKHBhZ2VOdW1iZXIsIGxpbWl0KTtcclxuXHRcdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRcdGNhc2UgJ3NlcnZlci1zaWRlJzpcclxuXHRcdFx0XHRcdHJldHVybiB0aGlzLmxvYWRQYWdlUHJvZHVjdHMocGFnZU51bWJlciwgbGltaXQpO1xyXG5cdFx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdFx0ZGVmYXVsdDpcclxuXHRcdFx0XHRcdHRocm93IG5ldyBJbnZhbGlkQXJndW1lbnRFeGNlcHRpb24kMSgnZm9yIHByb2Nlc3NpbmcgeW91IGNhbiBjaG9vc2UgXFwnc2VydmVyLXNpZGVcXCcgb3IgXFwnY2xpZW50LXNpZGVcXCcgb3B0aW9ucy4nKTtcclxuXHRcdFx0fVxyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0dGhpcy5sb2FkUGFnZVByb2R1Y3RzKCk7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBMb2FkcyB0aGUgcHJvZHVjdHMgYW5kIFxyXG5cdCAqIHJlcGxhY2UgdGhlbSBpbiB0aGUgZGl2IGNvbnRhaW5lci5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSBudW1iZXIgfCBwYWdlTnVtYmVyXHJcblx0ICogQHBhcmFtIG51bWJlciB8IGxpbWl0XHJcblx0ICogQHJldHVybiB2b2lkXHJcblx0ICovXHJcblx0bG9hZFBhZ2VQcm9kdWN0cyhwYWdlTnVtYmVyID0gbnVsbCwgbGltaXQgPSBudWxsKVxyXG5cdHtcclxuXHRcdGxldCByZXF1ZXN0ID0gdGhpcy5nZXRQcm9kdWN0cyhwYWdlTnVtYmVyKTtcclxuXHJcblx0XHRyZXF1ZXN0LnRoZW4oZnVuY3Rpb24ocHJvZHVjdHMpIHtcclxuXHRcdFx0aWYgKGxpbWl0KSB7XHJcblx0XHRcdFx0dGhpcy5jdXJyZW50SXRlbXMgPSBwcm9kdWN0cy5zbGljZSgwLCBsaW1pdCk7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0dGhpcy5jdXJyZW50SXRlbXMgPSBwcm9kdWN0cztcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0dGhpcy5yZXBsYWNlUHJvZHVjdHModGhpcy5jdXJyZW50SXRlbXMpO1xyXG5cdFx0XHRQcm9taXNlLnJlc29sdmUodGhpcy5jdXJyZW50SXRlbXMpO1xyXG5cdFx0fS5iaW5kKHRoaXMpKS5jYXRjaChmdW5jdGlvbihlcnJvcikge1xyXG5cdFx0XHQvLyB0aHJvdyBuZXcgRXJyb3IoJ0NvdWxkIG5vdCBsb2FkIHByb2R1Y3RzISBSZWFzb246ICcgKyBlcnJvcik7XHJcblx0XHR9KTtcclxuXHJcblx0XHRyZXR1cm4gcmVxdWVzdDtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIExvYWRzIHRoZSBwcm9kdWN0cyBhbmQgXHJcblx0ICogcmVwbGFjZSB0aGVtIGluIHRoZSBkaXYgY29udGFpbmVyLlxyXG5cdCAqXHJcblx0ICogQHJldHVybiB2b2lkXHJcblx0ICovXHJcblx0bG9hZFBhZ2VQcm9kdWN0c09uY2UocGFnZU51bWJlcilcclxuXHR7XHJcblx0XHRsZXQgcmVxdWVzdDtcclxuXHJcblx0XHRpZiAodGhpcy50b3RhbEl0ZW1zID09IG51bGwpIHsgLy8gbmVlZCB0byBmZXRjaCB0aGVtIGZyb20gdGhlIHNlcnZlci5cclxuXHRcdFx0cmVxdWVzdCA9IHRoaXMuZ2V0UHJvZHVjdHMoKTtcclxuXHRcdH0gZWxzZSB7IC8vIG5vIG5lZWQgdG8gd2FpdCBjYW4gcmVzb2x2ZSBpbW1lZGlhdGVseSB3aXRoIHRoZSBwcm9kdWN0cy4gXHJcblx0XHRcdHJlcXVlc3QgPSBQcm9taXNlLnJlc29sdmUodGhpcy50b3RhbEl0ZW1zKTtcclxuXHRcdH1cclxuXHJcblx0XHRyZXF1ZXN0LnRoZW4oZnVuY3Rpb24ocHJvZHVjdHMpIHtcclxuXHRcdFx0dGhpcy50b3RhbEl0ZW1zID0gcHJvZHVjdHM7XHJcblx0XHRcdGxldCBwYWdlcyA9IHRoaXMuY2FsY3VsYXRlQ2xpZW50UGFnZXMocHJvZHVjdHMpO1xyXG5cdFx0XHR0aGlzLmN1cnJlbnRJdGVtcyA9IHBhZ2VzW3BhZ2VOdW1iZXItMV07XHJcblx0XHRcdHRoaXMucmVwbGFjZVByb2R1Y3RzKHRoaXMuY3VycmVudEl0ZW1zKTtcclxuXHRcdFx0UHJvbWlzZS5yZXNvbHZlKHRoaXMuY3VycmVudEl0ZW1zKTtcclxuXHRcdH0uYmluZCh0aGlzKSkuY2F0Y2goZnVuY3Rpb24oZXJyb3IpIHtcclxuXHRcdFx0Ly8gdGhyb3cgbmV3IEVycm9yKCdDb3VsZCBub3QgbG9hZCBwcm9kdWN0cyEgUmVhc29uOiAnICsgZXJyb3IpO1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0cmV0dXJuIHJlcXVlc3Q7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBDYWxjdWxhdGVzIHRoZSBhbW91bnQgb2YgcGFnZXMgZm9yIHRoZSBjbGllbnQuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gYXJyYXkgfCBwcm9kdWN0c1xyXG5cdCAqIEByZXR1cm4gYXJyYXlcclxuXHQgKi9cclxuXHRjYWxjdWxhdGVDbGllbnRQYWdlcyhwcm9kdWN0cylcclxuXHR7XHRcclxuXHRcdC8vIFdlIGFyZSB1c2luZyBwYWdpbmF0aW9uIHNvIHdlIG5lZWQgdG8gdXBkYXRlIGl0IHRvby5cclxuXHRcdENvbnRhaW5lciQzLlBhZ2luYXRpb24uc2V0dGluZ3MudG90YWxfaXRlbXMgPSBwcm9kdWN0cy5sZW5ndGg7XHJcblx0XHRcclxuXHRcdGxldCBwZXJQYWdlID0gQ29udGFpbmVyJDMuUGFnaW5hdGlvbi5zZXR0aW5ncy5wZXJfcGFnZTsgXHJcblxyXG5cdFx0Ly8gV2UgbmVlZCB0byBjYWxjdWxhdGUgdGhlIHBhZ2VzIG9uIGZ1bGwgaHR0cCByZXF1ZXN0IFxyXG5cdFx0Ly8gb25seSBvbmNlLiBzbyB3ZSBjaGVjayB0byBzZWUgaWYgd2UgaGF2ZSByZXN1bHRzIGluIG91ciBjYWNoZS5cclxuXHRcdGlmIChjaHVua2VkUHJvZHVjdHMubGVuZ3RoICE9IDApIHtcclxuXHRcdFx0cmV0dXJuIGNodW5rZWRQcm9kdWN0cztcclxuXHRcdH1cclxuXHJcblx0XHRjaHVua2VkUHJvZHVjdHMgPSBDb21tb24uYXJyYXlfY2h1bmsocHJvZHVjdHMsIHBlclBhZ2UpO1xyXG5cdFx0cmV0dXJuIGNodW5rZWRQcm9kdWN0cztcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFNldHMgdGhlIERPTSBlbGVtZW50IFxyXG5cdCAqIGZvciBwb3B1bGF0aW5nIHRoZSBwcm9kdWN0cy5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSBzdHJpbmcgfCBzZWxlY3RvclxyXG5cdCAqIEByZXR1cm4gdm9pZFxyXG5cdCAqL1xyXG5cdHNldEVsZW1lbnQoc2VsZWN0b3IpXHJcblx0e1xyXG5cdFx0dGhpcy5lbGVtZW50ID0gRE9NLmZpbmQoc2VsZWN0b3IpO1xyXG5cclxuXHRcdGlmICh0aGlzLmVsZW1lbnQpIHtcclxuXHRcdFx0RE9NLmFkZENsYXNzKHRoaXMuZWxlbWVudCwgdGhpcy5zZXR0aW5ncy5jbGFzcyk7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBSZXBsYWNlIHByb2R1Y3RzIGluIFxyXG5cdCAqIHRoZSBwcm9kdWN0cyBjb250YWluZXIuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gYXJyYXkgfCByYXdQcm9kdWN0c1xyXG5cdCAqIEByZXR1cm4gYXJyYXlcclxuXHQgKi9cclxuXHRyZXBsYWNlUHJvZHVjdHMocmF3UHJvZHVjdHMpIFxyXG5cdHtcclxuXHRcdGlmICghIEFycmF5LmlzQXJyYXkocmF3UHJvZHVjdHMpIHx8IChyYXdQcm9kdWN0cy5sZW5ndGggPD0gMCAmJiB0eXBlb2YgcmF3UHJvZHVjdHNbMF0gPT0gJ3N0cmluZycpKSB7XHJcblx0XHRcdHRocm93IG5ldyBJbnZhbGlkQXJndW1lbnRFeGNlcHRpb24kMTtcclxuXHRcdH1cclxuXHJcblx0XHRsZXQgcHJvZHVjdHMgPSB0aGlzLmJ1aWxkUHJvZHVjdHMocmF3UHJvZHVjdHMsIHRoaXMuc2V0dGluZ3MuaXRlbV9jbGFzcywgJ2RpdicpO1xyXG5cclxuXHRcdHRoaXMuZWxlbWVudC5pbm5lckhUTUwgPSAnJztcclxuXHRcdHByb2R1Y3RzLmZvckVhY2goZnVuY3Rpb24ocHJvZHVjdCkge1xyXG5cdFx0XHRFdmVudE1hbmFnZXIkNC5wdWJsaXNoKCdwcm9kdWN0cy5sb2FkaW5nJywgcHJvZHVjdCk7XHJcblx0XHRcdHRoaXMuZWxlbWVudC5hcHBlbmRDaGlsZChwcm9kdWN0KTtcclxuXHRcdH0uYmluZCh0aGlzKSk7XHJcblxyXG5cdFx0RXZlbnRNYW5hZ2VyJDQucHVibGlzaCgncHJvZHVjdHMubG9hZGVkJywgcHJvZHVjdHMpO1xyXG5cclxuXHRcdHJldHVybiBwcm9kdWN0cztcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIE1ha2VzIGFuIEFqYXggY2FsbCB0byB0aGUgXHJcblx0ICogc2VydmVyIHdpdGhvdXQgcGFyYW1ldGVycy5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSBudW1iZXIgfCBwYWdlTnVtYmVyXHJcblx0ICogQHJldHVybiBQcm9taXNlXHJcblx0ICovXHJcblx0Z2V0UHJvZHVjdHMocGFnZU51bWJlciA9IG51bGwpXHJcblx0e1xyXG5cdFx0bGV0IGFjdGlvbiA9IChwYWdlTnVtYmVyKSA/IHRoaXMuc2V0dGluZ3MudXJsICsgJz9wYWdlPScgKyBwYWdlTnVtYmVyIDogdGhpcy5zZXR0aW5ncy51cmw7XHJcblxyXG5cdFx0cmV0dXJuIEh0dHAkMi5nZXQoe1xyXG5cdFx0XHR1cmw6IGFjdGlvbixcclxuXHRcdH0pO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQnVpbGRzIHRoZSBodG1sIGZvciB0aGUgcHJvZHVjdHMuXHJcblx0ICogXHJcblx0ICogQHBhcmFtIGFycmF5IHwgYXR0cmlidXRlc0NvbGxlY3Rpb25cclxuXHQgKiBAcGFyYW0gc3RyaW5nIHwgY2xhc3NOYW1lXHJcblx0ICogQHBhcmFtIHN0cmluZyB8IHRhZ1R5cGVcclxuXHQgKiBAcmV0dXJuIGFycmF5XHJcblx0ICovXHJcblx0YnVpbGRQcm9kdWN0cyhhdHRyaWJ1dGVzQ29sbGVjdGlvbiwgY2xhc3NOYW1lLCB0YWdUeXBlKSBcclxuXHR7XHJcblx0XHRpZihhdHRyaWJ1dGVzQ29sbGVjdGlvbi5jb25zdHJ1Y3Rvci5uYW1lICE9ICdBcnJheScgKSB7XHJcblx0XHRcdHRocm93IG5ldyBJbnZhbGlkQXJndW1lbnRFeGNlcHRpb24kMTtcclxuXHRcdH1cclxuXHJcblx0XHRsZXQgYnVpbHRQcm9kdWN0cyA9IFtdO1xyXG5cclxuXHRcdC8vIEVudGVyIGRlZmF1bHQgYXR0cmlidXRlLlxyXG5cdFx0aWYgKHRoaXMuc2V0dGluZ3MuYXR0cmlidXRlcy5pbmRleE9mKCdjdXJyZW5jeScpID09IC0xKSB7XHJcblx0XHRcdHRoaXMuc2V0dGluZ3MuYXR0cmlidXRlcy5wdXNoKCdjdXJyZW5jeScpO1xyXG5cdFx0fVxyXG5cdFx0XHJcblx0XHRhdHRyaWJ1dGVzQ29sbGVjdGlvbi5mb3JFYWNoKGZ1bmN0aW9uKGF0dHJpYnV0ZXMpIHtcclxuXHRcdFx0bGV0IGJ1aWx0UHJvZHVjdCA9IHRoaXMuYnVpbGRQcm9kdWN0KGF0dHJpYnV0ZXMsIGNsYXNzTmFtZSwgdGFnVHlwZSk7XHJcblx0XHRcdGJ1aWx0UHJvZHVjdHMucHVzaChidWlsdFByb2R1Y3QpO1xyXG5cdFx0fS5iaW5kKHRoaXMpKTtcclxuXHJcblx0XHRyZXR1cm4gYnVpbHRQcm9kdWN0cztcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEJ1aWxkcyB0aGUgaHRtbCBmb3IgYSBzaW5nbGUgcHJvZHVjdC5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSBvYmplY3QgfCBhdHRyaWJ1dGVzXHJcblx0ICogQHBhcmFtIHN0cmluZyB8IGNsYXNzTmFtZVxyXG5cdCAqIEBwYXJhbSBzdHJpbmcgfCB0YWdUeXBlXHJcblx0ICogQHJldHVybiBvYmplY3RcclxuXHQgKi9cclxuXHRidWlsZFByb2R1Y3QoYXR0cmlidXRlcywgY2xhc3NOYW1lLCB0YWdUeXBlKSBcclxuXHR7XHJcblx0XHRpZiAodHlwZW9mIGF0dHJpYnV0ZXMgIT0gJ29iamVjdCcgfHwgdHlwZW9mIHRhZ1R5cGUgIT0gJ3N0cmluZycpIHtcclxuXHRcdFx0dGhyb3cgbmV3IEludmFsaWRBcmd1bWVudEV4Y2VwdGlvbiQxO1xyXG5cdFx0fVxyXG5cclxuXHRcdGNsYXNzTmFtZSA9IGNsYXNzTmFtZSB8fCBudWxsO1xyXG5cclxuXHRcdGxldCBwcm9kdWN0ID0gRE9NLmNyZWF0ZUVsZW1lbnQoJ2RpdicsIHtcclxuXHRcdFx0Y2xhc3M6ICdwcm9kdWN0J1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0RE9NLmFkZENsYXNzKHByb2R1Y3QsIGNsYXNzTmFtZSk7XHJcblxyXG5cdFx0bGV0IG92ZXJsYXkgPSBET00uY3JlYXRlRWxlbWVudCgnZGl2Jywge1xyXG5cdFx0XHRjbGFzczogJ3Byb2R1Y3Qtb3ZlcmxheScsXHJcblx0XHR9KTtcclxuXHJcblx0XHRwcm9kdWN0LmFwcGVuZENoaWxkKG92ZXJsYXkpO1xyXG5cclxuXHRcdGF0dHJpYnV0ZXMgPSB0aGlzLmFkZERlZmF1bHRBdHRyaWJ1dGVzKGF0dHJpYnV0ZXMpO1xyXG5cclxuXHRcdGlmIChhdHRyaWJ1dGVzLmhhc093blByb3BlcnR5KCdpbWFnZScpKSB7XHJcblx0XHRcdGxldCBpbWFnZSA9IERPTS5jcmVhdGVFbGVtZW50KCdpbWcnLCB7XHJcblx0XHRcdFx0c3JjOiBhdHRyaWJ1dGVzWydpbWFnZSddXHJcblx0XHRcdH0pO1xyXG5cdFx0XHRcclxuXHRcdFx0bGV0IHRhZyA9IERPTS5jcmVhdGVFbGVtZW50KHRhZ1R5cGUsIHtcclxuXHRcdFx0XHRjbGFzczogJ3Byb2R1Y3QtaW1hZ2UnLFxyXG5cdFx0XHRcdGh0bWw6IGltYWdlLm91dGVySFRNTFxyXG5cdFx0XHR9KTtcclxuXHRcdFx0XHJcblx0XHRcdHByb2R1Y3QuYXBwZW5kQ2hpbGQodGFnKTtcclxuXHRcdH1cclxuXHJcblx0XHRpZiAoYXR0cmlidXRlcy5oYXNPd25Qcm9wZXJ0eSgncHJpY2UnKSkge1xyXG5cdFx0XHRsZXQgdGFnID0gRE9NLmNyZWF0ZUVsZW1lbnQodGFnVHlwZSwge1xyXG5cdFx0XHRcdGNsYXNzOiAncHJvZHVjdC1wcmljZScsXHJcblx0XHRcdH0pO1xyXG5cclxuXHRcdFx0bGV0IHNwYW4gPSBET00uY3JlYXRlRWxlbWVudCgnc3BhbicsIHtcclxuXHRcdFx0XHRjbGFzczogJ3Byb2R1Y3QtYW1vdW50JyxcclxuXHRcdFx0XHRodG1sOiBhdHRyaWJ1dGVzLnByaWNlLmFtb3VudFxyXG5cdFx0XHR9KTtcclxuXHJcblx0XHRcdGxldCBzcGFuMiA9IERPTS5jcmVhdGVFbGVtZW50KCdzcGFuJywge1xyXG5cdFx0XHRcdGNsYXNzOiAncHJvZHVjdC1jdXJyZW5jeScsXHJcblx0XHRcdFx0aHRtbDogYXR0cmlidXRlcy5wcmljZS5jdXJyZW5jeVxyXG5cdFx0XHR9KTtcclxuXHJcblx0XHRcdHRhZy5hcHBlbmRDaGlsZChzcGFuKTtcclxuXHRcdFx0dGFnLmFwcGVuZENoaWxkKHNwYW4yKTtcclxuXHRcdFx0b3ZlcmxheS5hcHBlbmRDaGlsZCh0YWcpO1xyXG5cdFx0fVxyXG5cclxuXHRcdGZvciAodmFyIGF0dHJpYnV0ZSBpbiBhdHRyaWJ1dGVzKSB7XHJcblx0XHRcdGlmICghIENvbW1vbi5pbl9hcnJheShhdHRyaWJ1dGUsIHRoaXMuc2V0dGluZ3MuYXR0cmlidXRlcykpIHtcclxuXHRcdFx0XHRjb250aW51ZTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0aWYgKGF0dHJpYnV0ZSA9PSAncHJpY2UnIHx8IGF0dHJpYnV0ZSA9PSAnaW1hZ2UnKSB7XHJcblx0XHRcdFx0Y29udGludWU7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGxldCB0YWcgPSBET00uY3JlYXRlRWxlbWVudCh0YWdUeXBlKTtcclxuXHRcdFx0dGFnLmlubmVySFRNTCA9IGF0dHJpYnV0ZXNbYXR0cmlidXRlXSB8fCAnJztcclxuXHRcdFx0XHJcblx0XHRcdERPTS5hZGRDbGFzcyh0YWcsICdwcm9kdWN0LScgKyBTdHIua2ViYWJDYXNlKGF0dHJpYnV0ZSkpO1xyXG5cdFx0XHRvdmVybGF5LmFwcGVuZENoaWxkKHRhZyk7XHJcblx0XHR9XHJcblxyXG5cdFx0bGV0IHRhZyA9IERPTS5jcmVhdGVFbGVtZW50KCdkaXYnLCB7XHJcblx0XHRcdGNsYXNzOiAnYWN0aW9uLWJ1dHRvbnMnXHJcblx0XHR9KTtcclxuXHJcblx0XHRsZXQgYWRkVG9DYXJ0ID0gRE9NLmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicsIHtcclxuXHRcdFx0Y2xhc3M6ICdhZGQtdG8tY2FydCcsXHJcblx0XHRcdHR5cGU6ICdidXR0b24nLFxyXG5cdFx0XHR0ZXh0OiAnKycsXHJcblx0XHR9KTtcclxuXHJcblx0XHRsZXQgZmF2b3JpdGUgPSBET00uY3JlYXRlRWxlbWVudCgnYnV0dG9uJywge1xyXG5cdFx0XHRjbGFzczogJ2Zhdm9yaXRlJyxcclxuXHRcdFx0dHlwZTogJ2J1dHRvbicsXHJcblx0XHRcdHRleHQ6ICcmaGVhcnRzOydcclxuXHRcdH0pO1xyXG5cclxuXHRcdGlmICh0aGlzLnNldHRpbmdzLmFkZF9idXR0b25fY2xhc3MpIHtcclxuXHRcdFx0RE9NLmFkZENsYXNzKGFkZFRvQ2FydCwgdGhpcy5zZXR0aW5ncy5hZGRfYnV0dG9uX2NsYXNzKTtcclxuXHRcdH1cclxuXHJcblx0XHRpZiAodGhpcy5zZXR0aW5ncy5mYXZvcml0ZV9idXR0b25fY2xhc3MpIHtcclxuXHRcdFx0RE9NLmFkZENsYXNzKGZhdm9yaXRlLCB0aGlzLnNldHRpbmdzLmZhdm9yaXRlX2J1dHRvbl9jbGFzcyk7XHJcblx0XHR9XHJcblxyXG5cdFx0dGFnLmFwcGVuZENoaWxkKGFkZFRvQ2FydCk7XHJcblx0XHR0YWcuYXBwZW5kQ2hpbGQoZmF2b3JpdGUpO1xyXG5cclxuXHRcdGFkZFRvQ2FydC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcclxuXHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdFx0XHRFdmVudE1hbmFnZXIkNC5wdWJsaXNoKCdjYXJ0LnByb2R1Y3QuYWRkZWQnLCBhdHRyaWJ1dGVzKTtcclxuXHRcdH0pO1xyXG5cclxuXHRcdGZhdm9yaXRlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xyXG5cdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XHJcblx0XHRcdHRoaXMuaW5uZXJIVE1MID0gJyYjeDI3MTM7JztcclxuXHRcdFx0RXZlbnRNYW5hZ2VyJDQucHVibGlzaCgnY2FydC5wcm9kdWN0LmZhdm9yaXRlZCcsIGF0dHJpYnV0ZXMpO1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0b3ZlcmxheS5hcHBlbmRDaGlsZCh0YWcpO1xyXG5cclxuXHRcdHJldHVybiBwcm9kdWN0O1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQWRkcyBkZWZhdWx0IGF0dHJpYnV0ZXNcclxuXHQgKiB0byB0aGUgc3VwcGxpZWQgYXR0cmlidXRlcy5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSBvYmplY3QgfCBhdHRyaWJ1dGVzXHJcblx0ICogQHJldHVybiBvYmplY3RcclxuXHQgKi9cclxuXHRhZGREZWZhdWx0QXR0cmlidXRlcyhhdHRyaWJ1dGVzKVxyXG5cdHtcclxuXHRcdGlmIChhdHRyaWJ1dGVzLmhhc093blByb3BlcnR5KCdwcmljZScpICYmIHR5cGVvZiBhdHRyaWJ1dGVzLnByaWNlICE9ICdvYmplY3QnKSB7XHJcblx0XHRcdGF0dHJpYnV0ZXMucHJpY2UgPSB7XHJcblx0XHRcdFx0XCJhbW91bnRcIjogYXR0cmlidXRlcy5wcmljZSxcclxuXHRcdFx0XHRcImN1cnJlbmN5XCI6IHRoaXMuc2V0dGluZ3MuY3VycmVuY3lcclxuXHRcdFx0fTtcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gYXR0cmlidXRlcztcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEFkZCB0aGUgZUNvbW1lcmNlIHN0eWxlIHRhZ3MgdG8gdGhlIERPTS5cclxuXHQgKi9cclxuXHRhZGRTdHlsZVRhZygpIFxyXG5cdHtcclxuXHRcdGlmIChET00uZmluZCgnI1R1cmJvLWVDb21tZXJjZS1Qcm9kdWN0cycpKSB7XHJcblx0XHRcdHJldHVybjtcclxuXHRcdH1cclxuXHJcblx0XHRpZiAodGhpcy5zZXR0aW5ncy5ub19jc3MpIHtcclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0fVxyXG5cclxuXHRcdGxldCB3aWR0aCA9IHRoaXMuc2V0dGluZ3Mud2lkdGggfHwgJ2F1dG8nO1xyXG5cdFx0bGV0IGhlaWdodCA9IHRoaXMuc2V0dGluZ3MuaGVpZ2h0IHx8ICcyMDBweCc7XHJcblx0XHRsZXQgbWluV2lkdGggPSB0aGlzLnNldHRpbmdzLm1pbl93aWR0aCB8fCAnMjAwcHgnO1xyXG5cdFx0bGV0IG1heFdpZHRoID0gdGhpcy5zZXR0aW5ncy5tYXhfd2lkdGggfHwgJzI1MHB4JztcclxuXHJcblx0XHRsZXQgY3NzID0gYFxyXG5cdFx0XHQucHJvZHVjdCB7XHJcblx0XHRcdFx0cG9zaXRpb246IHJlbGF0aXZlO1xyXG5cdFx0XHRcdG1hcmdpbjogNXB4IDVweDtcclxuXHRcdFx0XHRib3JkZXI6IDFweCBzb2xpZCAjZTRlNGU0O1xyXG5cdFx0XHRcdHdpZHRoOiAke3dpZHRofTtcclxuXHRcdFx0XHRtaW4td2lkdGg6ICR7bWluV2lkdGh9O1xyXG5cdFx0XHRcdG1heC13aWR0aDogJHttYXhXaWR0aH07XHJcblx0XHRcdFx0aGVpZ2h0OiAke2hlaWdodH07XHJcblx0XHRcdFx0Y3Vyc29yOiBwb2ludGVyO1xyXG5cdFx0XHRcdGNvbG9yOiAjZmZmZmZmO1xyXG5cdFx0XHRcdG92ZXJmbG93OiBoaWRkZW47XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdC5wcm9kdWN0ID4gLnByb2R1Y3Qtb3ZlcmxheSB7XHJcblx0XHRcdFx0cG9zaXRpb246IGFic29sdXRlO1xyXG5cdFx0XHRcdHRvcDogMDtcclxuXHRcdFx0XHRsZWZ0OiAwO1xyXG5cdFx0XHRcdHdpZHRoOiAxMDAlO1xyXG5cdFx0XHRcdGhlaWdodDogMTAwJTtcclxuXHRcdFx0XHRvcGFjaXR5OiAwLjU7XHJcblx0XHRcdFx0ei1pbmRleDogNTtcclxuXHRcdFx0XHR0cmFuc2l0aW9uOiAxcyBhbGw7XHJcblx0XHRcdFx0dHJhbnNmb3JtOiB0cmFuc2xhdGVYKC0yNTBweCk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdC5wcm9kdWN0OmhvdmVyID4gLnByb2R1Y3Qtb3ZlcmxheSB7XHJcblx0XHRcdFx0YmFja2dyb3VuZDogcmdiYSgwLCAwLCAwLCAwLjQ1KTtcclxuXHRcdFx0XHR0cmFuc2Zvcm06IHRyYW5zbGF0ZVgoMHB4KTtcclxuXHRcdFx0XHRvcGFjaXR5OiAxO1xyXG5cdFx0XHRcdHRyYW5zaXRpb246IDAuNXMgYWxsO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHQucHJvZHVjdCA+IC5wcm9kdWN0LWltYWdlID4gaW1nIHtcclxuXHRcdFx0XHRwb3NpdGlvbjogYWJzb2x1dGU7XHJcblx0XHRcdFx0bGVmdDogMDtcclxuXHRcdFx0XHR0b3A6IDA7XHJcblx0XHRcdFx0d2lkdGg6IDEwMCU7XHJcblx0XHRcdFx0aGVpZ2h0OiAxMDAlO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHQucHJvZHVjdCA+IC5wcm9kdWN0LW92ZXJsYXkgPiAucHJvZHVjdC1uYW1lLCBcclxuXHRcdFx0LnByb2R1Y3QgPiAucHJvZHVjdC1vdmVybGF5ID4gLnByb2R1Y3QtcHJpY2UsXHJcblx0XHRcdC5wcm9kdWN0ID4gLnByb2R1Y3Qtb3ZlcmxheSA+IC5wcm9kdWN0LWRlbGl2ZXJ5LXRpbWUge1xyXG5cdFx0XHRcdHotaW5kZXg6IDE7XHJcblx0XHRcdFx0cG9zaXRpb246IHJlbGF0aXZlO1xyXG5cdFx0XHRcdHRleHQtYWxpZ246IGNlbnRlcjtcclxuXHRcdFx0XHRtYXJnaW4tdG9wOiAyNXB4O1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHQucHJvZHVjdCA+IC5wcm9kdWN0LW92ZXJsYXkgPiAuYWN0aW9uLWJ1dHRvbnMge1xyXG5cdFx0XHRcdHdpZHRoOiAxMDAlO1xyXG5cdFx0XHRcdG1hcmdpbi10b3A6IDEwcHg7XHJcblx0XHRcdFx0dGV4dC1hbGlnbjogY2VudGVyO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHQucHJvZHVjdCA+IC5wcm9kdWN0LW92ZXJsYXkgPiAuYWN0aW9uLWJ1dHRvbnMgPiAuZmF2b3JpdGUge1xyXG5cdFx0XHRcdG1hcmdpbi1sZWZ0OiAxMHB4O1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0YDtcclxuXHQgICAgXHJcblx0ICAgIERPTS5hZGRTdHlsZSgnVHVyYm8tZUNvbW1lcmNlLVByb2R1Y3RzJywgY3NzKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEhpZGVzIHRoZSBjb21wb25lbnQgZnJvbSB0aGUgRE9NLlxyXG5cdCAqXHJcblx0ICogQHJldHVybiB2b2lkIFxyXG5cdCAqL1xyXG5cdGhpZGUoKVxyXG5cdHtcclxuXHRcdHRoaXMuZWxlbWVudC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xyXG5cdH1cclxufVxuXG4vKipcclxuICogVGhlIFNlcnZpY2VzIE9iamVjdCwgaGFuZGxlcyB0aGUgc2VydmljZXMuXHJcbiAqL1xyXG5jbGFzcyBTZXJ2aWNlcyBcclxue1xyXG5cclxufVxuXG5jbGFzcyBVcmxcclxue1xyXG5cdCBzdGF0aWMgcHJvY2Vzc0FqYXhEYXRhKHNlbGVjdG9yLCBjb250ZW50LCB1cmxQYXRoKVxyXG5cdCB7XHJcblx0ICAgIGxldCBjb250ZXh0ID0gRE9NLmZpbmQoc2VsZWN0b3IpO1xyXG5cclxuXHQgICAgY29udGV4dC5pbm5lckhUTUwgPSBjb250ZW50O1xyXG5cdCAgICBsZXQgdGl0bGUgPSBET00uZmluZCgndGl0bGUnLCBjb250ZXh0KTtcclxuXHQgICAgZG9jdW1lbnQudGl0bGUgPSB0aXRsZS5pbm5lckhUTUw7XHJcblx0ICAgIHdpbmRvdy5oaXN0b3J5LnB1c2hTdGF0ZSh7XCJodG1sXCI6Y29udGVudCxcInBhZ2VUaXRsZVwiOiB0aXRsZS5pbm5lckhUTUx9LCBcIlwiLCB1cmxQYXRoKTtcclxuXHJcblx0IFx0d2luZG93Lm9ucG9wc3RhdGUgPSBmdW5jdGlvbihlKSB7XHJcblx0XHQgICAgaWYgKGUuc3RhdGUpIHtcclxuXHRcdCAgICAgICAgY29udGV4dC5pbm5lckhUTUwgPSBlLnN0YXRlLmh0bWw7XHJcblx0XHQgICAgICAgIGRvY3VtZW50LnRpdGxlID0gZS5zdGF0ZS5wYWdlVGl0bGU7XHJcblx0XHQgICAgfVxyXG5cdFx0fTtcclxuXHQgfVxyXG5cclxuXHQvKipcclxuXHQgKiBNb2RpZmllcyB0aGUgZ2V0IHBhcmFtZXRlciBpbiB0aGUgdXJsLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIHN0cmluZyB8IHVybFxyXG5cdCAqIEBwYXJhbSBzdHJpbmcgfCBrZXlcclxuXHQgKiBAcGFyYW0gbnVtYmVyIHwgdmFsdWVcclxuXHQgKiBAcGFyYW0gc3RyaW5nIHwgc2VwYXJhdG9yXHJcblx0ICogQHJldHVybiBzdHJpbmdcclxuXHQgKi9cclxuXHRzdGF0aWMgY2hhbmdlUXVlcnlQYXJhbWV0ZXJWYWx1ZSh1cmwsIGtleSwgdmFsdWUsIHNlcGFyYXRvciA9ICc9JykgXHJcblx0e1xyXG5cdFx0bGV0IHJlZ0V4cCA9IG5ldyBSZWdFeHAoXCIoWz8mXSlcIiArIGtleSArIHNlcGFyYXRvciArIFwiLio/KCZ8JClcIiwgXCJpXCIpO1xyXG5cdFx0bGV0IHBhaXJTZXBhcmF0b3IgPSB1cmwuaW5kZXhPZignPycpICE9PSAtMSA/IFwiJlwiIDogXCI/XCI7XHJcblx0XHQgIFxyXG5cdFx0aWYgKHVybC5tYXRjaChyZWdFeHApKSB7XHJcblx0XHRcdHJldHVybiB1cmwucmVwbGFjZShyZWdFeHAsICckMScgKyBrZXkgKyBzZXBhcmF0b3IgKyB2YWx1ZSArICckMicpO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdCAgICByZXR1cm4gdXJsICsgcGFpclNlcGFyYXRvciArIGtleSArIHNlcGFyYXRvciArIHZhbHVlO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQ2hhbmdlcyB0aGUgdXJsIHRvIGEgZ2l2ZW4gcGFnZSBudW1iZXIuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gc3RyaW5nIHwgcGFyYW1ldGVyS2V5XHJcblx0ICogQHBhcmFtIHN0cmluZyB8IHBhcmFtZXRlclZhbHVlXHJcblx0ICogQHBhcmFtIHN0cmluZyB8IHNlcGFyYXRvclxyXG5cdCAqIEByZXR1cm4gdm9pZFxyXG5cdCAqL1xyXG5cdHN0YXRpYyBjaGFuZ2UocGFyYW1ldGVyS2V5LCBwYXJhbWV0ZXJWYWx1ZSwgc2VwYXJhdG9yID0gJz0nKVxyXG5cdHtcclxuXHRcdHBhcmFtZXRlclZhbHVlID0gIHBhcmFtZXRlclZhbHVlIHx8IHRoaXMucXVlcnlTdHJpbmcoKVtwYXJhbWV0ZXJLZXldO1xyXG5cdFx0bGV0IHJlcXVlc3RlZFVybCA9IHRoaXMuY2hhbmdlUXVlcnlQYXJhbWV0ZXJWYWx1ZSh3aW5kb3cubG9jYXRpb24uaHJlZiwgcGFyYW1ldGVyS2V5LCBwYXJhbWV0ZXJWYWx1ZSwgc2VwYXJhdG9yKTtcclxuXHRcdHdpbmRvdy5oaXN0b3J5LnJlcGxhY2VTdGF0ZSgnJywgJycsIHJlcXVlc3RlZFVybCk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBHZXQgdGhlIGdldCB2YXJpYWJsZXMgZnJvbSB0aGUgdXJsLlxyXG5cdCAqXHJcblx0ICogQHJldHVybiBhcnJheVxyXG5cdCAqL1xyXG5cdHN0YXRpYyBxdWVyeVN0cmluZygpIFxyXG5cdHtcclxuXHRcdGxldCB2YXJzID0ge307XHJcblx0XHRsZXQgcGFydHMgPSB3aW5kb3cubG9jYXRpb24uaHJlZi5yZXBsYWNlKC9bPyZdKyhbXj0mXSspPShbXiZdKikvZ2ksIGZ1bmN0aW9uKG0sIGtleSwgdmFsdWUpIHtcclxuXHRcdFx0dmFyc1trZXldID0gdmFsdWU7XHJcblx0XHR9KTtcclxuXHJcblx0XHRyZXR1cm4gdmFycztcclxuXHR9XHJcblxyXG5cclxufVxuXG5sZXQgZGVmYXVsdE1lc3NhZ2UkNCA9ICdTb3JyeSwgbm8gbW9yZSBwYWdlcy4nO1xyXG5cclxuY2xhc3MgTm90SW5QYWdlUmFuZ2VFeGNlcHRpb24gZXh0ZW5kcyBFeGNlcHRpb25IYW5kbGVyXHJcbntcclxuXHRjb25zdHJ1Y3RvcihtZXNzYWdlID0gbnVsbCkgXHJcblx0e1xyXG5cdFx0bWVzc2FnZSA9IG1lc3NhZ2UgfHwgZGVmYXVsdE1lc3NhZ2UkNDtcclxuXHRcdHN1cGVyKCk7XHJcbiAgICBcdHN1cGVyLnN0YWNrVHJhY2UodGhpcywgbWVzc2FnZSk7XHJcbiAgICB9XHJcbn1cblxuLyoqXHJcbiAqIEBmaWxlIFxyXG4gKiBQYWdpbmF0aW9uIGNsYXNzLlxyXG4gKlxyXG4gKiBUaGUgUGFnaW5hdGlvbiBjb21wb25lbnQsIGhhbmRsZXMgdGhlIHBhZ2luYXRpb24uXHJcbiAqL1xyXG5cclxuLyoqXHJcbiAqIFRoZSBkZWZhdWx0IHNldHRpbmdzIG9mIHRoZSBwYWdpbmF0aW9uLlxyXG4gKlxyXG4gKiBAdmFyIG9iamVjdFxyXG4gKi9cclxubGV0IGRlZmF1bHRTZXR0aW5ncyQ1ID0ge1xyXG5cdGVsZW1lbnQ6ICcucGFnaW5hdGlvbi1saW5rcycsXHJcblx0cHJvY2Vzc2luZzogJ2NsaWVudC1zaWRlJyxcclxuXHRjbGFzczogJycsXHJcblx0cGVyX3BhZ2U6IDUsXHJcblx0dG90YWxfaXRlbXM6IDUsXHJcblx0dXJsX3BhcmFtZXRlcjogJ3BhZ2UnLFxyXG5cdHNlcGFyYXRvcjogJyMnIFxyXG59O1xyXG5cclxuLyoqXHJcbiAqIFN0b3JlcyB0aGUgY29udGFpbmVyIG9iamVjdC5cclxuICpcclxuICogQHZhciBcXENvcmVcXENvbnRhaW5lclxyXG4gKi9cclxubGV0IENvbnRhaW5lciQ0O1xyXG5cclxuLyoqXHJcbiAqIFN0b3JlcyB0aGUgcHJvZHVjdHMgY29tcG9uZW50LlxyXG4gKlxyXG4gKiBAdmFyIFxcQ29tcG9uZW50c1xcUHJvZHVjdHNcclxuICovXHJcbmxldCBQcm9kdWN0cyQyO1xyXG5cclxuLyoqXHJcbiAqIFN0b3JlcyB0aGUgY29udGFpbmVyIG9iamVjdC5cclxuICogXHJcbiAqIEB2YXIgXFxDb3JlXFxFdmVudE1hbmFnZXJcclxuICovXHJcbmxldCBFdmVudE1hbmFnZXIkNTtcclxuXHJcbmNsYXNzIFBhZ2luYXRpb24gXHJcbntcclxuXHQvKipcclxuXHQgKiAtIEluaXRpYWxpemUgdGhlIGNvbnRhaW5lciBvYmplY3QuXHJcblx0ICogLSBJbml0aWFsaXplIHRoZSBwcm9kdWN0cyBjb21wb25lbnQuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gXFxDb3JlXFxDb250YWluZXIgfCBjb250YWluZXJcclxuXHQgKiBAcGFyYW0gXFxDb21wb25lbnRzXFxQcm9kdWN0cyB8IHByb2R1Y3RzXHJcblx0ICogQHBhcmFtIFxcQ29tcG9uZW50c1xcU2VydmljZXMgfCBzZXJ2aWNlc1xyXG5cdCAqIEByZXR1cm4gdm9pZFxyXG5cdCAqL1xyXG5cdGNvbnN0cnVjdG9yKGNvbnRhaW5lciwgZXZlbnRzLCBwcm9kdWN0cyA9IG51bGwsIHNlcnZpY2VzID0gbnVsbCkgXHJcblx0e1xyXG5cdFx0Q29udGFpbmVyJDQgPSBjb250YWluZXI7XHJcblx0XHRQcm9kdWN0cyQyID0gcHJvZHVjdHM7XHJcblx0XHRFdmVudE1hbmFnZXIkNSA9IGV2ZW50cztcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFNldHVwIHRoZSBwYWdpbmF0aW9uLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIG9iamVjdCB8IHNldHRpbmdzXHJcblx0ICogQHJldHVybiB2b2lkXHJcblx0ICovXHJcblx0c2V0dXAoc2V0dGluZ3MpXHJcblx0e1x0XHJcblx0XHRpZih0eXBlb2Ygc2V0dGluZ3MgIT0gJ29iamVjdCcpIHtcclxuXHRcdFx0dGhyb3cgbmV3IEludmFsaWRBcmd1bWVudEV4Y2VwdGlvbiQxO1xyXG5cdFx0fVxyXG5cclxuXHRcdHRoaXMuc2V0dGluZ3MgPSBDb21tb24uZXh0ZW5kKGRlZmF1bHRTZXR0aW5ncyQ1LCBzZXR0aW5ncyk7XHJcblx0XHR0aGlzLnNldEN1cnJlbnQoMSk7XHJcblxyXG5cdFx0ZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsIGZ1bmN0aW9uKCkge1x0XHRcclxuXHRcdFx0dGhpcy5zZXRFbGVtZW50KHRoaXMuc2V0dGluZ3MuZWxlbWVudCk7XHJcblxyXG5cdFx0XHQvLyBBcyBhIGZhbGxiYWNrIGNob29zZSB0aGUgdXNlcidzIHNldHRpbmdzIGZvciB0aGUgdG90YWwgaXRlbXMgY291bnQuXHJcblx0XHRcdHRoaXMudG90YWxQYWdlcyA9IHRoaXMuY2FsY3VsYXRlVG90YWxQYWdlcyh0aGlzLnNldHRpbmdzLnBlcl9wYWdlLCB0aGlzLnNldHRpbmdzLnRvdGFsX2l0ZW1zKTtcclxuXHRcdFx0dGhpcy5idWlsZFBhZ2luYXRpb24oKTtcclxuXHRcdH0uYmluZCh0aGlzKSk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBCdWlsZHMgdGhlIHBhZ2luYXRpb24uXHJcblx0ICpcclxuXHQgKiBAcmV0dXJuIHZvaWRcclxuXHQgKi9cclxuXHRidWlsZFBhZ2luYXRpb24oKVxyXG5cdHtcclxuXHRcdHRoaXMubGlua3MgPSB0aGlzLmNyZWF0ZUxpbmtzKCk7XHJcblx0XHR0aGlzLnJlcGxhY2VMaW5rcyh0aGlzLmxpbmtzKTtcclxuXHRcdHRoaXMuYmluZEV2ZW50TGlzdGVuZXJzKHRoaXMubGlua3MpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogU2V0cyB0aGUgZWxlbWVudC5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSBzdHJpbmcgfCBzZWxlY3RvclxyXG5cdCAqIEByZXR1cm4gdm9pZFxyXG5cdCAqL1xyXG5cdHNldEVsZW1lbnQoc2VsZWN0b3IpXHJcblx0e1xyXG5cdFx0dGhpcy5lbGVtZW50ID0gRE9NLmZpbmQoc2VsZWN0b3IpO1xyXG5cdFx0XHJcblx0XHRET00uYWRkQ2xhc3ModGhpcy5lbGVtZW50LCB0aGlzLnNldHRpbmdzLmNsYXNzKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFJlcGxhY2VzIHRoZSBsaW5rcyBpbiB0aGUgZWxlbWVudC5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSBIVE1MVUxpc3RFbGVtZW50IHwgbGlua3NcclxuXHQgKiBAcmV0dXJuIHZvaWRcclxuXHQgKi9cclxuXHRyZXBsYWNlTGlua3MobGlua3MpXHJcblx0e1xyXG5cdFx0dGhpcy5lbGVtZW50LmlubmVySFRNTCA9ICcnO1xyXG5cdFx0dGhpcy5lbGVtZW50LmFwcGVuZENoaWxkKGxpbmtzKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIENhbGN1bGF0ZXMgdGhlIHRvdGFsIHBhZ2VzLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIG51bWJlciB8IHBlclBhZ2VcclxuXHQgKiBAcGFyYW0gbnVtYmVyIHwgdG90YWxJdGVtc1xyXG5cdCAqIEByZXR1cm4gbnVtYmVyXHJcblx0ICovXHJcblx0Y2FsY3VsYXRlVG90YWxQYWdlcyhwZXJQYWdlLCB0b3RhbEl0ZW1zKVxyXG5cdHtcclxuXHRcdHBlclBhZ2UgPSBwYXJzZUludChwZXJQYWdlKTtcclxuXHRcdHRvdGFsSXRlbXMgPSBwYXJzZUludCh0b3RhbEl0ZW1zKTtcclxuXHJcblx0XHRyZXR1cm4gTWF0aC5jZWlsKHRvdGFsSXRlbXMgLyBwZXJQYWdlKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEJpbmRzIHRoZSBidXR0b25zIGV2ZW50cyBsaXN0ZW5lcnMuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gSFRNTFVMaXN0RWxlbWVudCB8IGxpbmtzXHJcblx0ICogQHJldHVybiB2b2lkXHJcblx0ICovXHJcblx0YmluZEV2ZW50TGlzdGVuZXJzKGxpbmtzKSBcclxuXHR7XHJcblx0XHRsZXQgaW5zdGFuY2UgPSB0aGlzO1xyXG5cclxuXHRcdHRoaXMubmV4dC5jaGlsZE5vZGVzWzBdLm9uY2xpY2sgPSBmdW5jdGlvbihlKSB7XHJcblx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcclxuXHJcblx0XHRcdGxldCByZXF1ZXN0ZWRQYWdlID0gaW5zdGFuY2UuY3VycmVudCsxO1xyXG5cclxuXHRcdFx0aWYgKGluc3RhbmNlLm5vdEluUGFnZVJhbmdlKHJlcXVlc3RlZFBhZ2UpKSB7XHJcblx0XHRcdFx0dGhyb3cgbmV3IE5vdEluUGFnZVJhbmdlRXhjZXB0aW9uKCdUaGUgcGFnZSB5b3UgcmVxdWVzdGluZyBkb2VzIG5vdCBleGlzdHMnKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0aWYgKFByb2R1Y3RzJDIgJiYgUHJvZHVjdHMkMi5ib290ZWQpIHtcclxuXHRcdFx0XHRQcm9kdWN0cyQyLmxvYWRQcm9kdWN0cyhyZXF1ZXN0ZWRQYWdlKS50aGVuKGZ1bmN0aW9uKHByb2R1Y3RzKSB7XHJcblx0XHRcdFx0XHRpbnN0YW5jZS5zZXRDdXJyZW50KHJlcXVlc3RlZFBhZ2UpO1xyXG5cdFx0XHRcdH0pO1xyXG5cdFx0XHR9XHJcblx0XHR9O1xyXG5cclxuXHRcdHRoaXMucHJldmlvdXMuY2hpbGROb2Rlc1swXS5vbmNsaWNrID0gZnVuY3Rpb24oZSkge1xyXG5cdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG5cdFx0XHRsZXQgcmVxdWVzdGVkUGFnZSA9IGluc3RhbmNlLmN1cnJlbnQtMTtcclxuXHJcblx0XHRcdGlmKGluc3RhbmNlLm5vdEluUGFnZVJhbmdlKHJlcXVlc3RlZFBhZ2UpKSB7XHJcblx0XHRcdFx0dGhyb3cgbmV3IE5vdEluUGFnZVJhbmdlRXhjZXB0aW9uKCdUaGUgcGFnZSB5b3UgcmVxdWVzdGluZyBkb2VzIG5vdCBleGlzdHMnKTtcclxuXHRcdFx0fVxyXG5cdFx0XHRcclxuXHRcdFx0aWYgKFByb2R1Y3RzJDIgJiYgUHJvZHVjdHMkMi5ib290ZWQpIHtcclxuXHRcdFx0XHRQcm9kdWN0cyQyLmxvYWRQcm9kdWN0cyhyZXF1ZXN0ZWRQYWdlKS50aGVuKGZ1bmN0aW9uKHByb2R1Y3RzKSB7XHJcblx0XHRcdFx0XHRpbnN0YW5jZS5zZXRDdXJyZW50KHJlcXVlc3RlZFBhZ2UpO1xyXG5cdFx0XHRcdH0pO1xyXG5cdFx0XHR9XHJcblx0XHR9O1xyXG5cclxuXHRcdGZvcih2YXIgaSA9IDA7IGkgPCB0aGlzLnBhZ2VzLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdHRoaXMucGFnZXNbaV0uY2hpbGROb2Rlc1swXS5vbmNsaWNrID0gZnVuY3Rpb24oZSkge1xyXG5cdFx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcclxuXHRcdFx0XHRcclxuXHRcdFx0XHRsZXQgcmVxdWVzdGVkUGFnZSA9IHRoaXMuZ2V0QXR0cmlidXRlKCdkYXRhLXBhZ2UtbnInKTtcclxuXHRcdFx0XHRcclxuXHRcdFx0XHRpZiAoUHJvZHVjdHMkMiAmJiBQcm9kdWN0cyQyLmJvb3RlZCkge1xyXG5cdFx0XHRcdFx0UHJvZHVjdHMkMi5sb2FkUHJvZHVjdHMocmVxdWVzdGVkUGFnZSkudGhlbihmdW5jdGlvbihwcm9kdWN0cykge1xyXG5cdFx0XHRcdFx0XHRpbnN0YW5jZS5zZXRDdXJyZW50KHJlcXVlc3RlZFBhZ2UpO1xyXG5cdFx0XHRcdFx0fSk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9O1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogU2V0cyB0aGUgY3VycmVudCBwYWdlLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIG51bWJlciB8IHBhZ2VOdW1iZXJcclxuXHQgKiBAcmV0dXJuIHZvaWRcclxuXHQgKi9cclxuXHRzZXRDdXJyZW50KHBhZ2VOdW1iZXIpIFxyXG5cdHtcclxuXHRcdHRoaXMuY3VycmVudCA9IHBhcnNlSW50KHBhZ2VOdW1iZXIpO1xyXG5cdFx0dGhpcy5jaGFuZ2VVcmwocGFnZU51bWJlcik7XHJcblx0XHR0aGlzLnNldEFjdGl2ZUxpbmsocGFnZU51bWJlcik7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBHZXRzIHRoZSBjdXJyZW50IHBhZ2UuXHJcblx0ICpcclxuXHQgKiBAcmV0dXJuIG51bWJlclxyXG5cdCAqL1xyXG5cdGdldEN1cnJlbnQoKSBcclxuXHR7XHJcblx0XHRyZXR1cm4gdGhpcy5jdXJyZW50O1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQ3JlYXRlcyB0aGUgcGFnaW5hdGlvbiBsaW5rcy5cclxuXHQgKlxyXG5cdCAqIEByZXR1cm4gSFRNTFVMaXN0RWxlbWVudFxyXG5cdCAqL1xyXG5cdGNyZWF0ZUxpbmtzKCkgXHJcblx0e1xyXG5cdFx0bGV0IHVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndWwnKTtcclxuXHRcdFxyXG5cdFx0dGhpcy5wYWdlcyA9IHRoaXMuY3JlYXRlUGFnZUxpbmtzKCk7XHJcblx0XHR0aGlzLnByZXZpb3VzID0gdGhpcy5jcmVhdGVQcmV2aW91c0J1dHRvbigpO1xyXG5cdFx0dGhpcy5uZXh0ID0gdGhpcy5jcmVhdGVOZXh0QnV0dG9uKCk7XHJcblxyXG5cdFx0dWwuY2xhc3NOYW1lID0gJ3BhZ2luYXRpb24nO1xyXG5cdFx0dWwuYXBwZW5kQ2hpbGQodGhpcy5wcmV2aW91cyk7XHJcblxyXG5cdFx0dGhpcy5wYWdlcy5mb3JFYWNoKGZ1bmN0aW9uKHBhZ2UpIHtcclxuXHRcdFx0dWwuYXBwZW5kQ2hpbGQocGFnZSk7XHJcblx0XHR9KTtcclxuXHJcblx0XHR1bC5hcHBlbmRDaGlsZCh0aGlzLm5leHQpO1xyXG5cclxuXHRcdHJldHVybiB1bDtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIENyZWF0ZXMgdGhlIHBhZ2VzIGl0ZW0gbGlua3MuXHJcblx0ICpcclxuXHQgKiBAcmV0dXJuIGFycmF5PEhUTUxMSUVsZW1lbnQ+XHJcblx0ICovXHJcblx0Y3JlYXRlUGFnZUxpbmtzKCkgXHJcblx0e1xyXG5cdFx0dmFyIHBhZ2VzID0gW107XHJcblxyXG5cdFx0Zm9yKHZhciBpID0gMTsgaSA8PSB0aGlzLnRvdGFsUGFnZXM7IGkrKykge1xyXG5cdFx0XHR2YXIgcGFnZUl0ZW0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaScpO1xyXG5cdFx0XHR2YXIgbGluayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKTtcclxuXHRcdFx0cGFnZUl0ZW0uY2xhc3NOYW1lID0gKHRoaXMuY3VycmVudCA9PSBpKSA/ICdwYWdlLWl0ZW0gYWN0aXZlJyA6ICdwYWdlLWl0ZW0nO1xyXG5cdFx0XHRsaW5rLmNsYXNzTmFtZSA9ICdwYWdlLWxpbmsnO1xyXG5cdFx0XHRsaW5rLnNldEF0dHJpYnV0ZSgnaHJlZicsICc/cGFnZT0nKyBpKTtcclxuXHRcdFx0bGluay5zZXRBdHRyaWJ1dGUoJ2RhdGEtcGFnZS1ucicsIGkpO1xyXG5cdFx0XHRsaW5rLmlubmVySFRNTCA9IGk7XHJcblx0XHRcdHBhZ2VJdGVtLmFwcGVuZENoaWxkKGxpbmspO1xyXG5cdFx0XHRwYWdlcy5wdXNoKHBhZ2VJdGVtKTtcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gcGFnZXM7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBDcmVhdGVzIHRoZSBwcmV2aW91cyBidXR0b24gbGluay5cclxuXHQgKlxyXG5cdCAqIEByZXR1cm4gSFRNTExJRWxlbWVudFxyXG5cdCAqL1xyXG5cdGNyZWF0ZVByZXZpb3VzQnV0dG9uKCkgXHJcblx0e1xyXG5cdFx0dmFyIGxpID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKTtcclxuXHRcdHZhciBsaW5rID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpO1xyXG5cdFx0dmFyIHNwYW4xID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xyXG5cdFx0dmFyIHNwYW4yID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xyXG5cdFx0XHJcblx0XHRcclxuXHRcdGxpLmNsYXNzTmFtZSA9ICdwYWdlLWl0ZW0nO1xyXG5cdFx0bGluay5jbGFzc05hbWUgPSAncGFnZS1saW5rJztcclxuXHRcdHNwYW4yLmNsYXNzTmFtZSA9ICdzci1vbmx5JztcclxuXHJcblx0XHRsaW5rLnNldEF0dHJpYnV0ZSgnaHJlZicsICcnKTtcclxuXHRcdGxpbmsuc2V0QXR0cmlidXRlKCdhcmlhLWxhYmVsJywgJ1ByZXZpb3VzJyk7XHJcblx0XHRzcGFuMS5zZXRBdHRyaWJ1dGUoJ2FyaWEtaGlkZGVuJywgJ3RydWUnKTtcclxuXHJcblx0XHRzcGFuMS5pbm5lckhUTUwgPSAnJmxhcXVvOyc7XHJcblx0XHRzcGFuMi5pbm5lckhUTUwgPSAnUHJldmlvdXMnO1xyXG5cclxuXHRcdGxpbmsuYXBwZW5kQ2hpbGQoc3BhbjEpO1xyXG5cdFx0bGluay5hcHBlbmRDaGlsZChzcGFuMik7XHJcblx0XHRsaS5hcHBlbmRDaGlsZChsaW5rKTtcclxuXHJcblx0XHRyZXR1cm4gbGk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBDcmVhdGVzIHRoZSBuZXh0IGJ1dHRvbiBsaW5rLlxyXG5cdCAqXHJcblx0ICogQHJldHVybiBIVE1MTElFbGVtZW50XHJcblx0ICovXHJcblx0Y3JlYXRlTmV4dEJ1dHRvbigpIFxyXG5cdHtcclxuXHRcdHZhciBsaSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJyk7XHJcblx0XHR2YXIgbGluayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKTtcclxuXHRcdHZhciBzcGFuMSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcclxuXHRcdHZhciBzcGFuMiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcclxuXHRcdFxyXG5cdFx0bGkuY2xhc3NOYW1lID0gJ3BhZ2UtaXRlbSc7XHJcblx0XHRsaW5rLmNsYXNzTmFtZSA9ICdwYWdlLWxpbmsnO1xyXG5cdFx0c3BhbjIuY2xhc3NOYW1lID0gJ3NyLW9ubHknO1xyXG5cclxuXHRcdGxpbmsuc2V0QXR0cmlidXRlKCdocmVmJywgJycpO1xyXG5cdFx0bGluay5zZXRBdHRyaWJ1dGUoJ2FyaWEtbGFiZWwnLCAnTmV4dCcpO1xyXG5cdFx0c3BhbjEuc2V0QXR0cmlidXRlKCdhcmlhLWhpZGRlbicsICd0cnVlJyk7XHJcblxyXG5cdFx0c3BhbjEuaW5uZXJIVE1MID0gJyZyYXF1bzsnO1xyXG5cdFx0c3BhbjIuaW5uZXJIVE1MID0gJ05leHQnO1xyXG5cclxuXHRcdGxpbmsuYXBwZW5kQ2hpbGQoc3BhbjEpO1xyXG5cdFx0bGluay5hcHBlbmRDaGlsZChzcGFuMik7XHJcblx0XHRsaS5hcHBlbmRDaGlsZChsaW5rKTtcclxuXHJcblx0XHRyZXR1cm4gbGk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBDaGVja3MgaWYgdGhlIGdpdmVuIHBhZ2UgaXMgaW4gcmFuZ2UuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gbnVtYmVyIHwgcGFnZU51bWJlclxyXG5cdCAqIEByZXR1cm4gYm9vbFxyXG5cdCAqL1xyXG5cdG5vdEluUGFnZVJhbmdlKHBhZ2VOdW1iZXIpIFxyXG5cdHtcclxuXHRcdHJldHVybiAocGFnZU51bWJlciA+IHRoaXMudG90YWxQYWdlcyB8fCBwYWdlTnVtYmVyIDw9IDApIHx8IGlzTmFOKHBhZ2VOdW1iZXIpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQ2hhbmdlcyB0aGUgdXJsIHRvIGEgZ2l2ZW4gcGFnZSBudW1iZXIuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gbnVtYmVyIHwgcGFnZU51bWJlclxyXG5cdCAqIEByZXR1cm4gdm9pZFxyXG5cdCAqL1xyXG5cdGNoYW5nZVVybChwYWdlTnVtYmVyKSBcclxuXHR7XHJcblx0XHRVcmwuY2hhbmdlKHRoaXMuc2V0dGluZ3MudXJsX3BhcmFtZXRlciwgcGFnZU51bWJlciwgdGhpcy5zZXR0aW5ncy5zZXBhcmF0b3IpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogU2V0cyB0aGUgYWN0aXZlIGxpbmsuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gbnVtYmVyIHwgcGFnZU51bWJlclxyXG5cdCAqIEByZXR1cm4gdm9pZFxyXG5cdCAqL1xyXG5cdHNldEFjdGl2ZUxpbmsocGFnZU51bWJlcilcclxuXHR7XHJcblx0XHRmb3IodmFyIHBhZ2UgaW4gdGhpcy5wYWdlcykge1xyXG5cdFx0XHRpZiAodGhpcy5wYWdlc1twYWdlXS5jaGlsZE5vZGVzWzBdLmdldEF0dHJpYnV0ZSgnZGF0YS1wYWdlLW5yJykgPT0gcGFnZU51bWJlcikge1xyXG5cdFx0XHRcdERPTS5hZGRDbGFzcyh0aGlzLnBhZ2VzW3BhZ2VdLCAnYWN0aXZlJyk7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0RE9NLnJlbW92ZUNsYXNzKHRoaXMucGFnZXNbcGFnZV0sICdhY3RpdmUnKTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogUmVzZXRzIHRoZSBwYWdpbmF0aW9uLlxyXG5cdCAqXHJcblx0ICogQHJldHVybiB2b2lkXHJcblx0ICovXHJcblx0cmVzZXQoKSBcclxuXHR7XHJcblx0XHR0aGlzLnNldEN1cnJlbnQoMSk7XHJcblx0XHR0aGlzLmNoYW5nZVVybCgxKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEhpZGVzIHRoZSBjb21wb25lbnQgZnJvbSB0aGUgRE9NLlxyXG5cdCAqXHJcblx0ICogQHJldHVybiB2b2lkIFxyXG5cdCAqL1xyXG5cdGhpZGUoKVxyXG5cdHtcclxuXHRcdHRoaXMuZWxlbWVudC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xyXG5cdH1cclxufVxuXG5sZXQgZGVmYXVsdE1lc3NhZ2UkNSA9ICdJbiBvcmRlciB0byB1c2UgY29tcG9uZW50cyB5b3UgbXVzdCByZWdpc3RlciB0aGVtIHdpdGggdGhlIHNob3AhJzsgXHJcblxyXG5jbGFzcyBDb21wb25lbnROb3RSZWdpc3RlcmVkRXhjZXB0aW9uIGV4dGVuZHMgRXhjZXB0aW9uSGFuZGxlclxyXG57XHJcblx0Y29uc3RydWN0b3IobWVzc2FnZSA9IG51bGwpIFxyXG5cdHtcclxuXHRcdG1lc3NhZ2UgPSBtZXNzYWdlIHx8IGRlZmF1bHRNZXNzYWdlJDU7XHJcblx0XHRzdXBlcihtZXNzYWdlKTtcclxuICAgIFx0c3VwZXIuc3RhY2tUcmFjZSh0aGlzLCBtZXNzYWdlKTtcclxuICAgIH1cclxufVxuXG4vLyBDb21wb25lbnRzXHJcbi8vIEhlbHBlcnNcclxuLy8gRXhjZXB0aW9uc1xyXG5jbGFzcyBDb21wb25lbnRzUHJvdmlkZXJcclxue1xyXG5cdC8qKlxyXG5cdCAqIC0gU2V0IHRoZSBjb250YWluZXIgYXMgYSBtZW1iZXIuXHJcblx0ICogLSBkZWNsYXJlIHRoZSBjb21wb25lbnRzLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIFxcQ29yZVxcQ29udGFpbmVyIHwgY29udGFpbmVyXHJcblx0ICogQHJldHVybiB2b2lkXHJcblx0ICovXHJcblx0Y29uc3RydWN0b3IoY29udGFpbmVyKVxyXG5cdHtcclxuXHRcdHRoaXMuY29udGFpbmVyID0gY29udGFpbmVyO1xyXG5cclxuXHRcdHRoaXMuY29tcG9uZW50cyA9IHt9O1xyXG5cdFx0dGhpcy5jb21wb25lbnRzLkZpbHRlciA9IHt9O1xyXG5cdFx0dGhpcy5jb21wb25lbnRzLlNlcnZpY2VzID0ge307XHJcblx0XHR0aGlzLmNvbXBvbmVudHMuUHJvZHVjdHMgPSB7fTtcclxuXHRcdHRoaXMuY29tcG9uZW50cy5QYWdpbmF0aW9uID0ge307XHJcblx0XHR0aGlzLmNvbXBvbmVudHMuQ2FydCA9IHt9O1xyXG5cdFx0dGhpcy5jb21wb25lbnRzLkNoZWNrb3V0ID0ge307XHJcblx0fVxyXG5cclxuICAgLyoqXHJcblx0KiBSZWdpc3RlcnMgdGhlIGNvbXBvbmVudHMuXHJcblx0KlxyXG5cdCogQHBhcmFtIG9iamVjdCB8IGNvbXBvbmVudHNcclxuXHQqIEByZXR1cm4gdm9pZFxyXG5cdCovXHJcblx0cmVnaXN0ZXIoY29tcG9uZW50cylcclxuXHR7XHJcblx0XHR0aGlzLmF2YWlsYWJsZSA9IGNvbXBvbmVudHM7XHJcblx0XHR0aGlzLmJvb3RlZCA9IFtdO1xyXG5cdCBcdHRoaXMuY29tcG9uZW50cy5GaWx0ZXIuYm9vdGVkID0gZmFsc2U7XHJcblx0XHR0aGlzLmNvbXBvbmVudHMuU2VydmljZXMuYm9vdGVkID0gZmFsc2U7XHJcblx0XHR0aGlzLmNvbXBvbmVudHMuUHJvZHVjdHMuYm9vdGVkID0gZmFsc2U7XHJcblx0XHR0aGlzLmNvbXBvbmVudHMuUGFnaW5hdGlvbi5ib290ZWQgPSBmYWxzZTtcclxuXHRcdHRoaXMuY29tcG9uZW50cy5DYXJ0LmJvb3RlZCA9IGZhbHNlO1xyXG5cdFx0dGhpcy5jb21wb25lbnRzLkNoZWNrb3V0LmJvb3RlZCA9IGZhbHNlO1xyXG5cclxuXHRcdGxldCBpbnN0YW5jZSA9IHRoaXM7XHJcblxyXG5cdFx0dGhpcy5jb250YWluZXIuYmluZCgnRmlsdGVyJywgZnVuY3Rpb24oY29udGFpbmVyLCBjb21wb25lbnQpIHtcclxuXHRcdFx0aW5zdGFuY2UuY29tcG9uZW50c1tjb21wb25lbnRdID0gbmV3IEZpbHRlcihjb250YWluZXIpO1xyXG5cdFx0XHRpbnN0YW5jZS5jb21wb25lbnRzW2NvbXBvbmVudF0uYm9vdGVkID0gdHJ1ZTtcclxuXHRcdFx0aW5zdGFuY2UuYm9vdGVkLnB1c2goaW5zdGFuY2UuY29tcG9uZW50c1tjb21wb25lbnRdKTtcclxuXHRcdFx0cmV0dXJuIGluc3RhbmNlLmNvbXBvbmVudHNbY29tcG9uZW50XTtcclxuXHRcdH0sICdjb21wb25lbnRzJyk7XHJcblx0XHRcclxuXHRcdHRoaXMuY29udGFpbmVyLmJpbmQoJ1NlcnZpY2VzJywgZnVuY3Rpb24oY29udGFpbmVyLCBjb21wb25lbnQpIHsgXHJcblx0XHRcdGluc3RhbmNlLmNvbXBvbmVudHNbY29tcG9uZW50XSA9IG5ldyBTZXJ2aWNlcyhjb250YWluZXIpO1xyXG5cdFx0XHRpbnN0YW5jZS5jb21wb25lbnRzW2NvbXBvbmVudF0uYm9vdGVkID0gdHJ1ZTtcclxuXHRcdFx0aW5zdGFuY2UuYm9vdGVkLnB1c2goaW5zdGFuY2UuY29tcG9uZW50c1tjb21wb25lbnRdKTtcclxuXHRcdFx0cmV0dXJuIGluc3RhbmNlLmNvbXBvbmVudHNbY29tcG9uZW50XTtcclxuXHRcdH0sICdjb21wb25lbnRzJyk7XHJcblxyXG5cdFx0dGhpcy5jb250YWluZXIuYmluZCgnUHJvZHVjdHMnLCBmdW5jdGlvbihjb250YWluZXIsIGNvbXBvbmVudCkge1xyXG5cdFx0XHRpbnN0YW5jZS5jb21wb25lbnRzW2NvbXBvbmVudF0gPSBuZXcgUHJvZHVjdHMoY29udGFpbmVyLCBjb250YWluZXIuUmVxdWVzdCwgY29udGFpbmVyLkV2ZW50cyk7XHJcblx0XHRcdGluc3RhbmNlLmNvbXBvbmVudHNbY29tcG9uZW50XS5ib290ZWQgPSB0cnVlO1xyXG5cdFx0XHRpbnN0YW5jZS5ib290ZWQucHVzaChpbnN0YW5jZS5jb21wb25lbnRzW2NvbXBvbmVudF0pO1xyXG5cdFx0XHRyZXR1cm4gaW5zdGFuY2UuY29tcG9uZW50c1tjb21wb25lbnRdO1xyXG5cdFx0fSwgJ2NvbXBvbmVudHMnKTtcclxuXHJcblx0XHR0aGlzLmNvbnRhaW5lci5iaW5kKCdQYWdpbmF0aW9uJywgZnVuY3Rpb24oY29udGFpbmVyLCBjb21wb25lbnQpIHtcclxuXHRcdFx0bGV0IHByb2R1Y3RzID0gKGluc3RhbmNlLmV4aXN0cygnUHJvZHVjdHMnKSkgPyAoaW5zdGFuY2UuY29tcG9uZW50c1snUHJvZHVjdHMnXSkgOiBudWxsOyBcclxuXHRcdFx0bGV0IHNlcnZpY2VzID0gKGluc3RhbmNlLmV4aXN0cygnU2VydmljZXMnKSkgPyAoaW5zdGFuY2UuY29tcG9uZW50c1snU2VydmljZXMnXSkgOiBudWxsOyBcclxuXHRcdFx0aW5zdGFuY2UuY29tcG9uZW50c1tjb21wb25lbnRdID0gbmV3IFBhZ2luYXRpb24oY29udGFpbmVyLCBjb250YWluZXIuRXZlbnRzLCBwcm9kdWN0cywgc2VydmljZXMpO1xyXG5cdFx0XHRpbnN0YW5jZS5jb21wb25lbnRzW2NvbXBvbmVudF0uYm9vdGVkID0gdHJ1ZTtcclxuXHRcdFx0aW5zdGFuY2UuYm9vdGVkLnB1c2goaW5zdGFuY2UuY29tcG9uZW50c1tjb21wb25lbnRdKTtcclxuXHRcdFx0cmV0dXJuIGluc3RhbmNlLmNvbXBvbmVudHNbY29tcG9uZW50XTtcclxuXHRcdH0sICdjb21wb25lbnRzJyk7XHJcblxyXG5cdFx0dGhpcy5jb250YWluZXIuYmluZCgnQ2FydCcsIGZ1bmN0aW9uKGNvbnRhaW5lciwgY29tcG9uZW50KSB7XHJcblx0XHRcdGluc3RhbmNlLmNvbXBvbmVudHNbY29tcG9uZW50XSA9IG5ldyBDYXJ0KGNvbnRhaW5lciwgY29udGFpbmVyLlJlcXVlc3QsIGNvbnRhaW5lci5FdmVudHMpO1xyXG5cdFx0XHRpbnN0YW5jZS5jb21wb25lbnRzW2NvbXBvbmVudF0uYm9vdGVkID0gdHJ1ZTtcclxuXHRcdFx0aW5zdGFuY2UuYm9vdGVkLnB1c2goaW5zdGFuY2UuY29tcG9uZW50c1tjb21wb25lbnRdKTtcclxuXHRcdFx0cmV0dXJuIGluc3RhbmNlLmNvbXBvbmVudHNbY29tcG9uZW50XTtcclxuXHRcdH0sICdjb21wb25lbnRzJyk7XHJcblxyXG5cdFx0dGhpcy5jb250YWluZXIuYmluZCgnQ2hlY2tvdXQnLCBmdW5jdGlvbihjb250YWluZXIsIGNvbXBvbmVudCkge1xyXG5cdFx0XHRpbnN0YW5jZS5jb21wb25lbnRzW2NvbXBvbmVudF0gPSBuZXcgQ2hlY2tvdXQoY29udGFpbmVyLCBjb250YWluZXIuUmVxdWVzdCwgY29udGFpbmVyLkV2ZW50cyk7XHJcblx0XHRcdGluc3RhbmNlLmNvbXBvbmVudHNbY29tcG9uZW50XS5ib290ZWQgPSB0cnVlO1xyXG5cdFx0XHRpbnN0YW5jZS5ib290ZWQucHVzaChpbnN0YW5jZS5jb21wb25lbnRzW2NvbXBvbmVudF0pO1xyXG5cdFx0XHRyZXR1cm4gaW5zdGFuY2UuY29tcG9uZW50c1tjb21wb25lbnRdO1xyXG5cdFx0fSwgJ2NvbXBvbmVudHMnKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFByb3ZpZGUgYSByZWdpc3RlcmVkIGNvbXBvbmVudC5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSBzdHJpbmcgfCBjb21wb25lbnRcclxuXHQgKiBAcmV0dXJuIG9iamVjdFxyXG5cdCAqL1xyXG5cdHByb3ZpZGUoY29tcG9uZW50KVxyXG5cdHtcclxuXHRcdGlmIChDb21tb24uaW5fYXJyYXkoY29tcG9uZW50LCB0aGlzLmF2YWlsYWJsZSkpIHtcclxuXHRcdFx0cmV0dXJuIHRoaXMuY29udGFpbmVyLm1ha2UoY29tcG9uZW50KTtcclxuXHRcdH1cclxuXHJcblx0XHR0aHJvdyBuZXcgQ29tcG9uZW50Tm90UmVnaXN0ZXJlZEV4Y2VwdGlvbignY29tcG9uZW50cyBtdXN0IGJlIHJlZ2lzdGVyZWQgaW4gb3JkZXIgdG8gdXNlIHRoZW0uJyk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBDaGVja3MgaWYgY29tcG9uZW50IGV4aXN0cy5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSBzdHJpbmcgfCBuYW1lXHJcblx0ICogQHJldHVybiBib29sXHJcblx0ICovXHJcblx0ZXhpc3RzKG5hbWUpXHJcblx0e1xyXG5cdFx0cmV0dXJuIHRoaXMuY29tcG9uZW50cy5oYXNPd25Qcm9wZXJ0eShuYW1lKTtcclxuXHR9XHJcbn1cblxubGV0IGRlZmF1bHRNZXNzYWdlJDYgPSAnVHJ5aW5nIHRvIGJpbmQgYW4gYWxyZWFkeSBleGlzdGluZyBib3VuZC4nO1xyXG5cclxuY2xhc3MgSW52YWxpZEJpbmRpbmdFeGNlcHRpb24gZXh0ZW5kcyBFeGNlcHRpb25IYW5kbGVyXHJcbntcclxuXHRjb25zdHJ1Y3RvcihtZXNzYWdlID0gbnVsbCkgXHJcblx0e1xyXG5cdFx0bWVzc2FnZSA9IG1lc3NhZ2UgfHwgZGVmYXVsdE1lc3NhZ2UkNjtcclxuXHRcdHN1cGVyKG1lc3NhZ2UpO1xyXG4gICAgXHRzdXBlci5zdGFja1RyYWNlKHRoaXMsIG1lc3NhZ2UpO1xyXG4gICAgfVxyXG59XG5cbi8vIEhlbHBlcnNcclxuLy8gQ29yZVxyXG4vLyBFeGNlcHRpb25zXHJcbi8qKlxyXG4gKiBAZmlsZSBcclxuICogQ29udGFpbmVyIGNsYXNzLlxyXG4gKlxyXG4gKiBIYW5kbGVzL0NvbnRyb2xzIHRoZSBkZXBlbmRlbmNpZXMgb2YgZWNvbW1lcmNlLlxyXG4gKi9cclxuXHJcbmNsYXNzIENvbnRhaW5lciQ1IFxyXG57XHJcblx0LyoqXHJcblx0ICogLSBJbml0aWFsaXplIGluc3RhbmNlcyBtZW1iZXIuXHJcblx0ICogLSBSZWdpc3RlciBiaW5kaW5ncy5cclxuXHQgKlxyXG5cdCAqIEByZXR1cm4gdm9pZFxyXG5cdCAqL1xyXG5cdGNvbnN0cnVjdG9yKClcclxuXHR7XHJcblx0XHR0aGlzLmluc3RhbmNlcyA9IFtdO1xyXG5cdFx0dGhpcy5yZWdpc3RlcigpO1xyXG5cdFx0dGhpcy5yZWdpc3RlclByb3ZpZGVycygpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQmluZHMga2V5IHRvIGNvbmNyZXRlIGNsYXNzLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIHN0cmluZyB8IGtleVxyXG5cdCAqIEBwYXJhbSBjbGFzcyB8IGNvbmNyZXRlXHJcblx0ICogQHJldHVybiB2b2lkXHJcblx0ICovXHJcblx0YmluZChrZXksIGNvbmNyZXRlLCBuYW1lc3BhY2UgPSBudWxsKSBcclxuXHR7XHJcblx0XHRpZiAodHlwZW9mIGtleSAhPSAnc3RyaW5nJykge1xyXG5cdFx0XHR0aHJvdyBuZXcgSW52YWxpZEFyZ3VtZW50RXhjZXB0aW9uJDEoJ2JpbmQoKSBleHBlY3RzIHRoZSBmaXJzdCBwYXJhbWV0ZXIgdG8gYmUgc3RyaW5nLCBidXQgJyArIHR5cGVvZiBrZXkgKyAnIHdhcyBwYXNzZWQgaW5zdGVhZC4nKTtcclxuXHRcdH1cclxuXHJcblx0XHRpZiAodHlwZW9mIGNvbmNyZXRlICE9ICdmdW5jdGlvbicpIHsgXHJcblx0XHRcdHRocm93IG5ldyBJbnZhbGlkQXJndW1lbnRFeGNlcHRpb24kMSgnYmluZCgpIGV4cGVjdHMgdGhlIHNlY29uZCBwYXJhbWV0ZXIgdG8gYmUgYSBmdW5jdGlvbiwgYnV0ICcgKyB0eXBlb2YgY29uY3JldGUgKyAnIHdhcyBwYXNzZWQgaW5zdGVhZC4nKTtcclxuXHRcdH1cclxuXHJcblx0XHRpZiAobmFtZXNwYWNlKSB7XHJcblx0XHRcdGlmICh0eXBlb2YgdGhpc1tuYW1lc3BhY2VdID09ICd1bmRlZmluZWQnKSB7XHJcblx0XHRcdFx0dGhpc1tuYW1lc3BhY2VdID0ge307XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHRoaXNbbmFtZXNwYWNlXVtrZXldID0gY29uY3JldGUuYmluZChjb25jcmV0ZSwgdGhpcywga2V5KTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdHRoaXNba2V5XSA9IGNvbmNyZXRlLmJpbmQoY29uY3JldGUsIHRoaXMsIGtleSk7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBTZXRzIGFuIGluc3RhbmNlLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIHN0cmluZyB8IGtleVxyXG5cdCAqIEBwYXJhbSBvYmplY3QgfCBpbnN0YW5jZVxyXG5cdCAqIEBwYXJhbSBzdHJpbmcgfCBhbGlhc1xyXG5cdCAqIEByZXR1cm4gdm9pZFxyXG5cdCAqL1xyXG5cdHNldEluc3RhbmNlKGtleSwgaW5zdGFuY2UsIGFsaWFzID0gbnVsbCkgXHJcblx0e1xyXG5cdFx0aWYgKHR5cGVvZiBrZXkgIT0gJ3N0cmluZycpIHtcclxuXHRcdFx0dGhyb3cgbmV3IEludmFsaWRBcmd1bWVudEV4Y2VwdGlvbiQxKCdzZXRJbnN0YWNlKCkgZXhwZWN0cyB0aGUgZmlyc3QgcGFyYW1ldGVyIHRvIGJlIGEgc3RyaW5nLCBidXQgJyArIHR5cGVvZiBrZXkgKyAnIHdhcyBwYXNzZWQgaW5zdGVhZC4nKTtcclxuXHRcdH1cclxuXHJcblx0XHRpZiAodHlwZW9mIGluc3RhbmNlICE9ICdvYmplY3QnKSB7XHJcblx0XHRcdHRocm93IG5ldyBJbnZhbGlkQXJndW1lbnRFeGNlcHRpb24kMSgnc2V0SW5zdGFuY2UoKSBleHBlY3RzIHRoZSBzZWNvbmQgcGFyYW1ldGVyIHRvIGJlIGFuIG9iamVjdCwgYnV0ICcgKyB0eXBlb2YgaW5zdGFuY2UgKyAnIHdhcyBwYXNzZWQgaW5zdGVhZC4nKTtcclxuXHRcdH1cclxuXHJcblx0XHR0aGlzLmluc3RhbmNlc1trZXldID0gaW5zdGFuY2U7XHJcblx0XHR0aGlzW2tleV0gPSBpbnN0YW5jZTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFJlc29sdmVzIGFuIGluc3RhbmNlIG91dCBvZiBcclxuXHQgKiB0aGUgaW9jIGNvbnRhaW5lci5cclxuXHQgKiBcclxuXHQgKiBAcGFyYW0gc3RyaW5nIHwga2V5XHJcblx0ICogQHJldHVybiBvYmplY3RcclxuXHQgKi9cclxuXHRnZXRJbnN0YW5jZShrZXkpIFxyXG5cdHtcclxuXHRcdGlmICh0eXBlb2Yga2V5ICE9ICdzdHJpbmcnICYmIHR5cGVvZiBrZXkgIT0gJ29iamVjdCcpIHtcclxuXHRcdFx0dGhyb3cgbmV3IEludmFsaWRBcmd1bWVudEV4Y2VwdGlvbiQxKCdnZXRJbnN0YWNlKCkgZXhwZWN0cyB0aGUgZmlyc3QgcGFyYW1ldGVyIHRvIGJlIGEgc3RyaW5nLCBidXQgJyArIHR5cGVvZiBrZXkgKyAnIHdhcyBwYXNzZWQgaW5zdGVhZC4nKTtcclxuXHRcdH1cclxuXHJcblx0XHRpZiAodHlwZW9mIGtleSA9PSAnb2JqZWN0Jykge1xyXG5cdFx0XHRyZXR1cm4gdGhpcy5pbnN0YW5jZXNba2V5LmNvbnN0cnVjdG9yLm5hbWVdIHx8IG51bGw7XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIHRoaXMuaW5zdGFuY2VzW2tleV0gfHwgbnVsbDtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIENoZWNrcyBpZiBhbiBpbnN0YW5jZSBleGlzdC5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSBtaXhlZCB8IGluc3RhbmNlXHJcblx0ICogQHJldHVybiBib29sXHJcblx0ICovXHJcblx0aW5zdGFuY2VFeGlzdChpbnN0YW5jZSkgXHJcblx0e1xyXG5cdFx0aWYgKHR5cGVvZiBpbnN0YW5jZSA9PSAnb2JqZWN0JyB8fCB0eXBlb2YgaW5zdGFuY2UgPT0gJ3N5bWJvbCcpIHtcclxuXHRcdFx0cmV0dXJuICh0eXBlb2YgdGhpcy5pbnN0YW5jZXNbaW5zdGFuY2UuY29uc3RydWN0b3IubmFtZV0gIT09ICd1bmRlZmluZWQnKTtcclxuXHRcdH0gZWxzZSBpZiAodHlwZW9mIGluc3RhbmNlID09ICdzdHJpbmcnKSB7XHJcblx0XHRcdHJldHVybiAodHlwZW9mIHRoaXMuaW5zdGFuY2VzW2luc3RhbmNlXSAhPT0gJ3VuZGVmaW5lZCcpXHJcblx0XHR9XHJcblx0XHRcclxuXHRcdHRocm93IG5ldyBJbnZhbGlkQXJndW1lbnRFeGNlcHRpb24kMSgnaW5zdGFuY2VFeGlzdCgpIGV4cGVjdHMgdGhlIGZpcnN0IHBhcmFtZXRlciB0byBiZSBzdHJpbmcgb3IgYW4gb2JqZWN0LCBidXQgJyArIHR5cGVvZiBpbnN0YW5jZSArICcgd2FzIHBhc3NlZCBpbnN0ZWFkLicpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogUmV0cmlldmUgYW4gb2JqZWN0LCBpZiBub3QgZXhpc3RzXHJcblx0ICogd2lsbCBjcmVhdGUgaXQsIHNldCBpdCBpbiB0aGUgaW9jIGNvbnRhaW5lclxyXG5cdCAqIGZvciBsYXRlciB1c2UgYW5kIHJldHJpZXZlIGl0LlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIG1peGVkIHwgb2JqZWN0IFxyXG5cdCAqIEByZXR1cm4gb2JqZWN0XHJcblx0ICovXHJcblx0bWFrZShvYmplY3QpXHJcblx0e1xyXG5cdFx0bGV0IGluc3RhbmNlID0ge307XHJcblx0XHRsZXQga2V5O1xyXG5cdFx0XHJcblx0XHRpZiAodGhpcy5pbnN0YW5jZUV4aXN0KG9iamVjdCkpIHtcclxuXHRcdFx0cmV0dXJuIHRoaXMuZ2V0SW5zdGFuY2Uob2JqZWN0KTtcclxuXHRcdH1cclxuXHJcblx0XHRpZiAodHlwZW9mIG9iamVjdCA9PSAnb2JqZWN0Jykge1xyXG5cdFx0XHRpbnN0YW5jZSA9IG9iamVjdDtcclxuXHRcdFx0a2V5ID0gb2JqZWN0LmNvbnN0cnVjdG9yLm5hbWU7XHJcblx0XHRcdHRoaXMuc2V0SW5zdGFuY2Uoa2V5LCBpbnN0YW5jZSk7IFxyXG5cdFx0fSBlbHNlIGlmICh0eXBlb2Ygb2JqZWN0ID09ICdzdHJpbmcnICYmIHRoaXMuaGFzT3duUHJvcGVydHkob2JqZWN0KSkge1xyXG5cdFx0XHRpbnN0YW5jZSA9IG5ldyB0aGlzW29iamVjdF07XHJcblx0XHRcdGtleSA9IG9iamVjdDtcclxuXHRcdFx0dGhpcy5zZXRJbnN0YW5jZShrZXksIGluc3RhbmNlKTtcdFxyXG5cdFx0fSBlbHNlIGlmICh0eXBlb2Ygb2JqZWN0ID09ICdzdHJpbmcnICYmIHRoaXMuQ29tcG9uZW50cy5leGlzdHMob2JqZWN0KSkge1xyXG5cdFx0XHRpbnN0YW5jZSA9IG5ldyB0aGlzLmNvbXBvbmVudHNbb2JqZWN0XTtcclxuXHRcdFx0a2V5ID0gb2JqZWN0O1xyXG5cdFx0XHR0aGlzLnNldEluc3RhbmNlKGtleSwgaW5zdGFuY2UpO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0dGhyb3cgbmV3IEludmFsaWRCaW5kaW5nRXhjZXB0aW9uKCdDb250YWluZXIubWFrZSgpIGNvdWxkIG5vdCBjcmVhdGUgdGhlIG9iamVjdCEnKTtcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gaW5zdGFuY2U7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBSZW1vdmUgYWxsIGV4aXN0aW5nIGluc3RhbmNlcy5cclxuXHQgKlxyXG5cdCAqIEByZXR1cm4gdm9pZCBcclxuXHQgKi9cclxuXHRmbHVzaCgpXHJcblx0e1xyXG5cdFx0dGhpcy5pbnN0YW5jZXMgPSBbXTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFJlZ2lzdGVycyB0aGUgZGVwZW5kZWNpZXMuXHJcblx0ICpcclxuXHQgKiBAcmV0dXJuIHZvaWQgXHJcblx0ICovXHJcblx0cmVnaXN0ZXIoKVxyXG5cdHtcclxuXHRcdHRoaXMuc2V0SW5zdGFuY2UoJ1JlcXVlc3QnLCBuZXcgUmVxdWVzdCk7XHJcblx0XHR0aGlzLnNldEluc3RhbmNlKCdFdmVudHMnLCBuZXcgRXZlbnRNYW5hZ2VyKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFJlZ2lzdGVycyB0aGUgcHJvdmlkZXJzLlxyXG5cdCAqXHJcblx0ICogQHJldHVybiB2b2lkIFxyXG5cdCAqL1xyXG5cdHJlZ2lzdGVyUHJvdmlkZXJzKClcclxuXHR7XHJcblx0XHR0aGlzLnNldEluc3RhbmNlKCdDb21wb25lbnRzJywgbmV3IENvbXBvbmVudHNQcm92aWRlcih0aGlzKSk7XHJcblx0fVxyXG59XG5cbi8vIEhlbHBlcnNcclxuLy8gQ29yZVxyXG4vLyBFeGNlcHRpb25zXHJcbi8qKlxyXG4gKiBTdG9yZXMgdGhlIGRlZmF1bHQgc2V0dGluZ3MuXHJcbiAqXHJcbiAqIEB2YXIgb2JqZWN0XHJcbiAqL1xyXG5sZXQgZGVmYXVsdFNldHRpbmdzJDYgPSB7XHJcblx0ZGVidWdfbGV2ZWw6ICdlcnJvcicsXHJcblx0ZWxlbWVudDogJ2JvZHknLFxyXG5cdGluamVjdF9saWJyYXJpZXM6IFtdLFxyXG5cdGNvbXBvbmVudHM6IFsnUHJvZHVjdHMnLCAnU2VydmljZXMnLCAnRmlsdGVyJywgJ1BhZ2luYXRpb24nLCAnQ2FydCddLFxyXG5cdGxvYWRpbmdfYW5pbWF0aW9uOiB0cnVlXHJcbn07XHJcblxyXG4vKipcclxuICogU3RvcmVzIHRoZSBvcHRpb25hbCwgXHJcbiAqIGluamVjdGFibGUgZXh0ZXJuYWwgbGlicmFyaWVzIFxyXG4gKlxyXG4gKiBAdmFyIG9iamVjdFxyXG4gKi9cclxubGV0IGV4dGVybmFsTGlicmFyaWVzID0ge1xyXG5cdGJvb3RzdHJhcDogJ2h0dHBzOi8vbWF4Y2RuLmJvb3RzdHJhcGNkbi5jb20vYm9vdHN0cmFwLzMuMy43L2Nzcy9ib290c3RyYXAubWluLmNzcycsXHJcbn07XHJcblxyXG5jbGFzcyBUdXJib0Vjb21tZXJjZVxyXG57XHJcblx0LyoqXHJcblx0ICogVGhlIGVudGVyeSBmb3IgdGhlIHNob3AuXHJcblx0ICogLSBTZXR0aW5nIHRoZSBleGNlcHRpb24gaGFuZGxlci5cclxuXHQgKiAtIFNldHRpbmcgdGhlIGlvYyBjb250YWluZXIuXHJcblx0ICogLSBFeHRlbmRpbmcgdGhlIHVzZXIgc2V0dGluZ3MuXHJcblx0ICogLSBTZXR0aW5nIHRoZSBlbGVtZW50LlxyXG5cdCAqIC0gRGlzYWJsaW5nIGRlZmF1bHQgZXJyb3JzLlxyXG5cdCAqIC0gUGFzc2luZyBjYWxscyB2aWEgcHJveHkgdG8gdGhlIGNvbXBvbmVudHMuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gb2JqZWN0IHwgc2V0dGluZ3NcclxuXHQgKiBAcmV0dXJuIFByb3h5XHJcblx0ICovXHJcblx0Y29uc3RydWN0b3Ioc2V0dGluZ3MpXHJcblx0e1xyXG5cdFx0aWYgKHR5cGVvZiBzZXR0aW5ncyAhPSAnb2JqZWN0Jykge1xyXG5cdFx0XHR0aHJvdyBuZXcgSW52YWxpZEFyZ3VtZW50RXhjZXB0aW9uJDE7XHJcblx0XHR9XHJcblxyXG5cdFx0dGhpcy5zZXR0aW5ncyA9IENvbW1vbi5leHRlbmQoZGVmYXVsdFNldHRpbmdzJDYsIHNldHRpbmdzKTtcclxuXHJcblx0XHRFeGNlcHRpb25IYW5kbGVyLnNldERlYnVnTGV2ZWwgPSB0aGlzLnNldHRpbmdzLmRlYnVnX2xldmVsO1xyXG5cdFx0XHJcblx0XHR0aGlzLmxvYWRFeHRlcm5hbExpYnJhcmllcygpO1xyXG5cdFx0XHJcblx0XHR0aGlzLmNvbnRhaW5lciA9IG5ldyBDb250YWluZXIkNTtcclxuXHJcblx0XHR0aGlzLmNvbXBvbmVudHMgPSB0aGlzLmNvbnRhaW5lci5tYWtlKCdDb21wb25lbnRzJyk7XHJcblx0XHR0aGlzLmNvbXBvbmVudHMucmVnaXN0ZXIodGhpcy5zZXR0aW5ncy5jb21wb25lbnRzKTtcclxuXHJcblx0XHRkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgZnVuY3Rpb24oKSB7XHJcblx0XHRcdHRoaXMuc2V0RWxlbWVudCh0aGlzLnNldHRpbmdzLmVsZW1lbnQpO1xyXG5cclxuXHRcdFx0aWYgKHRoaXMuc2V0dGluZ3MubG9hZGluZ19hbmltYXRpb24pIHtcclxuXHRcdFx0XHRzdGFydExvYWRpbmcuY2FsbCh0aGlzKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0dGhpcy5hZGRTdHlsZVRhZygpO1xyXG5cdFx0fS5iaW5kKHRoaXMpKTtcclxuXHJcblx0XHRyZXR1cm4gbmV3IFByb3h5KHRoaXMsIHtcclxuXHRcdFx0Z2V0OiBmdW5jdGlvbihzaG9wLCBzb3VyY2UpIHtcclxuXHRcdFx0XHRpZiAoc2hvcC5jb21wb25lbnRzLmV4aXN0cyhzb3VyY2UpKSB7XHJcblx0XHRcdFx0XHRyZXR1cm4gc2hvcC5jb21wb25lbnRzLnByb3ZpZGUoc291cmNlKTtcclxuXHRcdFx0XHR9IFxyXG5cclxuXHRcdFx0XHRpZiAoc2hvcC5jb250YWluZXIuaW5zdGFuY2VFeGlzdChzb3VyY2UpKSB7XHJcblx0XHRcdFx0XHRyZXR1cm4gc2hvcC5jb250YWluZXIuZ2V0SW5zdGFuY2Uoc291cmNlKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogTG9hZHMgdGhlIGV4dGVybmFsIGxpYnJhcmllcyB3aGljaCB3YXMgc3BlY2lmaWVkLlxyXG5cdCAqIFxyXG5cdCAqIEByZXR1cm4gdm9pZFxyXG5cdCAqL1xyXG5cdGxvYWRFeHRlcm5hbExpYnJhcmllcygpXHJcblx0e1xyXG5cdFx0bGV0IGk7XHJcblx0XHRsZXQgbGlicmFyaWVzID0gdGhpcy5zZXR0aW5ncy5pbmplY3RfbGlicmFyaWVzO1xyXG5cclxuXHRcdGZvciAoaSA9IDA7IGkgPCBsaWJyYXJpZXMubGVuZ3RoOyBpKyspIHtcclxuXHRcdFx0aWYgKGV4dGVybmFsTGlicmFyaWVzLmhhc093blByb3BlcnR5KGxpYnJhcmllc1tpXSkpIHtcclxuXHRcdFx0XHRsZXQgaWQgPSAnVHVyYm8tZUNvbW1lcmNlLScgKyBTdHIudWNmaXJzdChsaWJyYXJpZXNbaV0pO1xyXG5cdFx0XHRcdFxyXG5cdFx0XHRcdGlmICghIERPTS5maW5kKGlkKSkge1xyXG5cdFx0XHRcdFx0RE9NLmFkZExpbmtlZFN0eWxlKGlkLCBleHRlcm5hbExpYnJhcmllc1tsaWJyYXJpZXNbaV1dKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFNldHMgdGhlIGVsZW1lbnQgdG8gYmUgYm91bmQgdG8uXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gc3RyaW5nIHwgc2VsZWN0b3JcclxuXHQgKiBAcmV0dXJuIHZvaWRcclxuXHQgKi9cclxuXHRzZXRFbGVtZW50KHNlbGVjdG9yKVxyXG5cdHtcclxuXHRcdHRoaXMuZWxlbWVudCA9IERPTS5maW5kKHNlbGVjdG9yKTtcclxuXHRcdFxyXG5cdFx0RE9NLmFkZENsYXNzKHRoaXMuZWxlbWVudCwgdGhpcy5zZXR0aW5ncy5jbGFzcyk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBBZGQgdGhlIGVDb21tZXJjZSBzdHlsZSB0YWdzIHRvIHRoZSBET00uXHJcblx0ICpcclxuXHQgKiBAcmV0dXJuIHZvaWRcclxuXHQgKi9cclxuXHRhZGRTdHlsZVRhZygpIFxyXG5cdHtcclxuXHRcdGlmIChET00uZmluZCgnI1R1cmJvZS1Db21tZXJjZScpKSB7XHJcblx0XHRcdHJldHVybjtcclxuXHRcdH1cclxuXHJcblx0XHRsZXQgY3NzID0gYFxyXG5cdFx0XHQke3RoaXMuc2V0dGluZ3MuZWxlbWVudH0ge1xyXG5cdFx0XHRcdHBvc2l0aW9uOiByZWxhdGl2ZTtcclxuXHRcdFx0XHRjbGVhcjogYm90aDtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0LmxvYWRpbmctcHJvZ3Jlc3MtYmFyIHtcclxuXHRcdFx0XHRwb3NpdGlvbjogZml4ZWQ7XHJcblx0XHRcdFx0dG9wOiAwO1xyXG5cdFx0XHRcdGxlZnQ6IDA7XHJcblx0XHRcdFx0aGVpZ2h0OiA1cHg7XHJcblx0XHRcdFx0d2lkdGg6IDEwMCU7XHJcblx0XHRcdFx0LXdlYmtpdC1ib3gtc2hhZG93OiAwcHggMHB4IDVweCAxcHggcmdiYSgxNjgsMTY4LDE2OCwxKTtcclxuXHRcdFx0XHQtbW96LWJveC1zaGFkb3c6IDBweCAwcHggNXB4IDFweCByZ2JhKDE2OCwxNjgsMTY4LDEpO1xyXG5cdFx0XHRcdGJveC1zaGFkb3c6IDBweCAwcHggNXB4IDFweCByZ2JhKDE2OCwxNjgsMTY4LDEpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHQubG9hZGluZy1wcm9ncmVzcy1iYXIgPiAubG9hZGluZy1wcm9ncmVzcy1maWxsIHtcclxuXHRcdFx0XHR3aWR0aDogMTAwJTtcclxuXHRcdFx0XHRoZWlnaHQ6IDEwMCU7XHJcblx0XHRcdFx0cG9zaXRpb246IGFic29sdXRlO1xyXG5cdFx0XHRcdGJhY2tncm91bmQtY29sb3I6ICM5ZGQyZmY7XHJcblx0XHRcdFx0dHJhbnNmb3JtOiB0cmFuc2xhdGVYKC0ke2RvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRXaWR0aH1weCk7XHJcblx0XHRcdH1cclxuXHRcdGA7XHJcblx0ICAgIFxyXG5cdCAgICBET00uYWRkU3R5bGUoJ1R1cmJvLWVDb21tZXJjZScsIGNzcyk7XHJcblx0fVxyXG59XHJcblxyXG5cclxuLyoqXHJcbiAqIEF0dGFjaGVzIGEgbG9hZGVyIHRvIHRoZSB0b3Agb2YgdGhlIHNjcmVlblxyXG4gKiBhbmQgaGlkZXMgdGhlIGNvbnRlbnQuXHJcbiAqIFN0b3BzIGF1dG9tYXRpY2FsbHkgYWZ0ZXIgMjAlIHJlYWNoZWQuXHJcbiAqXHJcbiAqIEByZXR1cm4gdm9pZCBcclxuICovXHJcbmZ1bmN0aW9uIHN0YXJ0TG9hZGluZygpIHtcclxuXHRsZXQgbG9hZGVyID0gRE9NLmNyZWF0ZUVsZW1lbnQoJ2RpdicsIHtcclxuXHRcdGNsYXNzOiAnbG9hZGluZy1wcm9ncmVzcy1iYXInXHJcblx0fSk7XHJcblxyXG5cdGxldCBmaWxsID0gRE9NLmNyZWF0ZUVsZW1lbnQoJ3NwYW4nLCB7XHJcblx0XHRjbGFzczogJ2xvYWRpbmctcHJvZ3Jlc3MtZmlsbCdcclxuXHR9KTtcclxuXHJcblx0bG9hZGVyLmFwcGVuZENoaWxkKGZpbGwpO1xyXG5cdGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQobG9hZGVyKTtcclxuXHJcblxyXG5cdGxldCBwcm9ncmVzcyA9IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRXaWR0aDtcclxuXHRsZXQgbWF4U2l6ZSA9IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRXaWR0aCAqIDAuODA7XHJcblxyXG5cdHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUocHJvZ3Jlc3NEcmF3KTtcclxuXHJcblx0bGV0IGNvbnRlbnQgPSB0aGlzLmVsZW1lbnQ7XHJcblxyXG5cdGNvbnRlbnQuc3R5bGUuZGlzcGxheSA9ICdub25lJztcclxuXHRcclxuXHRmdW5jdGlvbiBwcm9ncmVzc0RyYXcoKSB7XHJcblx0XHRmaWxsLnN0eWxlLnRyYW5zZm9ybSA9ICd0cmFuc2xhdGVYKC0nICsgcHJvZ3Jlc3MgKyAncHgpJztcclxuXHRcdHByb2dyZXNzIC09IDc7XHJcblxyXG5cdFx0aWYgKHByb2dyZXNzIDwgbWF4U2l6ZSkge1xyXG5cdFx0XHRkb25lKCk7XHJcblx0XHRcdHJldHVybjtcclxuXHRcdH1cclxuXHJcblx0XHR3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKHByb2dyZXNzRHJhdyk7XHJcblx0fVxyXG5cclxuXHRmdW5jdGlvbiBkb25lKCkge1xyXG5cdFx0ZmlsbC5zdHlsZS5vcGFjaXR5ID0gcHJvZ3Jlc3MgLyAxMDAwO1xyXG5cdFx0ZmlsbC5zdHlsZS50cmFuc2Zvcm0gPSAndHJhbnNsYXRlWCgtJyArIHByb2dyZXNzICsgJ3B4KSc7XHJcblx0XHJcblx0XHRwcm9ncmVzcyAtPSAxNTtcclxuXHJcblx0XHRpZiAocHJvZ3Jlc3MgPD0gMCkge1xyXG5cdFx0XHRjb250ZW50LnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xyXG5cdFx0XHRcclxuXHRcdFx0aWYgKHR5cGVvZiBsb2FkZXIgIT0gJ3VuZGVmaW5lZCcpIHtcclxuXHRcdFx0XHRET00ucmVtb3ZlKGxvYWRlcik7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHJldHVybjtcclxuXHRcdH1cclxuXHJcblx0XHR3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKGRvbmUpO1xyXG5cdH1cclxufVxuXG5yZXR1cm4gVHVyYm9FY29tbWVyY2U7XG5cbn0oKSk7XG4iXX0=
