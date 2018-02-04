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
			key: 'changeParameter',
			value: function changeParameter(parameterKey, parameterValue) {
				var separator = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '=';

				parameterValue = parameterValue || this.queryString()[parameterKey];
				var requestedUrl = this.changeQueryParameterValue(window.location.href, parameterKey, parameterValue, separator);
				window.history.replaceState('', '', requestedUrl);
			}

			/**
    * Changes the url.
    *
    * @param string | url
    * @return void
    */

		}, {
			key: 'change',
			value: function change(url) {
				window.history.replaceState('', '', url);
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
				this.changeUrl();
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
    * Changes the url to be checkout
    *
    * @return void 
    */

		}, {
			key: 'changeUrl',
			value: function changeUrl() {
				Url.change('checkout');
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
				Url.changeParameter(this.settings.url_parameter, pageNumber, this.settings.separator);
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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlR1cmJvRWNvbW1lcmNlLmpzIl0sIm5hbWVzIjpbIlR1cmJvRWNvbW1lcmNlIiwiU3RyIiwic3RyaW5nIiwicmVwbGFjZSIsInRvTG93ZXJDYXNlIiwibGVuZ3RoIiwicG9zc2libGUiLCJpIiwiY2hhckF0IiwiTWF0aCIsImZsb29yIiwicmFuZG9tIiwidG9VcHBlckNhc2UiLCJzbGljZSIsImRlYnVnTGV2ZWwiLCJFeGNlcHRpb25IYW5kbGVyIiwibGV2ZWwiLCJ3aW5kb3ciLCJvbmVycm9yIiwiRXJyb3IiLCJjYXB0dXJlU3RhY2tUcmFjZSIsImNvbnN0cnVjdG9yIiwibmFtZSIsImVycm9yIiwibWVzc2FnZSIsImN1c3RvbUFjdGlvbnMiLCJoYW5kbGVFcnJvcnMiLCJoYW5kbGVXYXJuaW5ncyIsImhhbmRsZUluZm9zIiwiY29uc29sZSIsIndhcm4iLCJpbmZvIiwiZGVmYXVsdE1lc3NhZ2UiLCJJbnZhbGlkQXJndW1lbnRFeGNlcHRpb24kMSIsIkRPTSIsImVsZW1lbnQiLCJjbGFzc05hbWUiLCJuZXdDbGFzc05hbWUiLCJyZW1vdmVDbGFzcyIsImFkZENsYXNzIiwidW5kZWZpbmVkIiwiY2xhc3NOYW1lcyIsInNwbGl0IiwiZm9yRWFjaCIsImNsYXNzTGlzdCIsImFkZCIsImluZGV4T2YiLCJyZW1vdmUiLCJwYXJlbnROb2RlIiwicmVtb3ZlQ2hpbGQiLCJpZCIsImNzcyIsImhlYWQiLCJkb2N1bWVudCIsImdldEVsZW1lbnRzQnlUYWdOYW1lIiwic3R5bGVUYWciLCJjcmVhdGVFbGVtZW50IiwiQ1NTIiwibWluaWZ5Q3NzIiwiaW5uZXJIVE1MIiwic2V0QXR0cmlidXRlIiwiYXBwZW5kQ2hpbGQiLCJzb3VyY2UiLCJsaW5rZWRTdHlsZVRhZyIsImVsZW1lbnRUeXBlIiwib3B0aW9ucyIsIm9wdGlvbiIsInNlY29uZENsYXNzTmFtZSIsInRvZ2dsZSIsInNlbGVjdG9yIiwiY29udGV4dCIsInF1ZXJ5RWxlbWVudCIsInBhcmVudEVsZW1lbnQiLCJxdWVyeVNlbGVjdG9yQWxsIiwiaGFzQ2hpbGQiLCJjaGlsZEVsZW1lbnQiLCJub2RlIiwiQ29tbW9uIiwiY3VycmVudE9iamVjdCIsIm5ld09iamVjdCIsImV4dGVuZGVkIiwicHJvcCIsIk9iamVjdCIsInByb3RvdHlwZSIsImhhc093blByb3BlcnR5IiwiY2FsbCIsIm5lZWRsZSIsImh5c3RhY2siLCJBcnJheSIsInRvdGFsIiwic2l6ZSIsImlzTmFOIiwicGFyc2VJbnQiLCJjb2xsZWN0aW9uIiwiY2VpbCIsInN0YXJ0IiwiZW5kIiwicHVzaCIsIm9iamVjdCIsImRlZmF1bHRNZXNzYWdlJDEiLCJJbnZhbGlkRGF0YVN0cnVjdHVyZUV4Y2VwdGlvbiIsImRlZmF1bHRTZXR0aW5ncyIsImhlYWRlcnMiLCJhc3luYyIsIlJlcXVlc3QiLCJzZXR0aW5ncyIsImV4dGVuZCIsInNldERlZmF1bHRSZXF1ZXN0SGVhZGVyIiwiaGVhZGVyIiwib3BlbiIsIlhNTEh0dHBSZXF1ZXN0Iiwic2V0UmVxdWVzdEhlYWRlciIsInJlc3BvbnNlIiwiYXBwbHkiLCJhcmd1bWVudHMiLCJ4aHIiLCJiZWZvcmUiLCJQcm9taXNlIiwicmVzb2x2ZSIsInJlamVjdCIsImRhdGEiLCJ1cmwiLCJyZXNwb25zZVR5cGUiLCJkYXRhVHlwZSIsInRpbWVvdXQiLCJvbnJlYWR5c3RhdGVjaGFuZ2UiLCJyZWFkeVN0YXRlIiwic3RhdHVzIiwicmVzcG9uc2VUZXh0IiwiYWZ0ZXIiLCJzZW5kIiwicXVlcnlTdHJpbmciLCJrZXlzIiwibWFwIiwia2V5IiwiZW5jb2RlVVJJQ29tcG9uZW50Iiwiam9pbiIsIkFjdGl2ZVhPYmplY3QiLCJvdmVycmlkZU1pbWVUeXBlIiwiSlNPTiIsInBhcnNlIiwib25hYm9ydCIsImRlZmF1bHRNZXNzYWdlJDIiLCJCYWRFdmVudENhbGxFeGNlcHRpb24iLCJFdmVudE1hbmFnZXIiLCJldmVudHMiLCJjYWxsYmFjayIsIkludmFsaWRBcmd1bWVudEV4Y2VwdGlvbiIsIkNvb2tpZSIsInZhbHVlIiwiZGF5cyIsInN0cmluZ2lmeSIsImV4cGlyZXMiLCJkYXRlIiwiRGF0ZSIsInNldFRpbWUiLCJnZXRUaW1lIiwidG9HTVRTdHJpbmciLCJjb29raWUiLCJjX3N0YXJ0IiwiY19lbmQiLCJ1bmVzY2FwZSIsInN1YnN0cmluZyIsImRlZmF1bHRNZXNzYWdlJDMiLCJJbnZhbGlkQ2FydEl0ZW1FeGNlcHRpb24iLCJkZWZhdWx0U2V0dGluZ3MkMSIsImNvb2tpZV9uYW1lIiwicHJldmlld19jbGFzcyIsImxvYWRlciIsImNsYXNzIiwid2lkdGgiLCJoZWlnaHQiLCJwbGFjZW1lbnQiLCJmaXhlZCIsImhvdmVyX2NvbG9yIiwibm9fY3NzIiwiQ29udGFpbmVyIiwiRXZlbnRNYW5hZ2VyJDIiLCJIdHRwIiwibG9hZGluZ092ZXJsYXkiLCJpdGVtc0RpdiIsIkNhcnQiLCJjb250YWluZXIiLCJodHRwIiwiZXZlbnRNYW5hZ2VyIiwicHJldmlld0VsZW1lbnQiLCJjcmVhdGVQcmV2aWV3RWxlbWVudCIsImljb24iLCJjcmVhdGVJY29uIiwic2V0RWxlbWVudCIsImFkZFN0eWxlVGFnIiwiYmluZEV2ZW50TGlzdGVuZXJzIiwiaXNFbXB0eSIsImdldCIsInNldHVwQ2FydCIsImNhcnQiLCJlbXB0eU9iamVjdCIsIml0ZW1zIiwiZmF2b3JpdGVzIiwic2V0IiwiaXRlbSIsInF1YW50aXR5IiwiaW5jcmVtZW50ZWQiLCJhbHJlYWR5RmF2b3JpdGVkIiwic3BsaWNlIiwidGFibGUiLCJhdHRyaWJ1dGVzIiwidHIiLCJ0ZCIsImF0dHJpYnV0ZSIsImltYWdlIiwic3JjIiwic3BhbiIsImh0bWwiLCJjdXJyZW5jeSIsImFtb3VudCIsImNvbHNwYW4iLCJjaGVja291dCIsInRleHQiLCJvbmNsaWNrIiwiZSIsInByZXZlbnREZWZhdWx0IiwicHVibGlzaCIsImJpbmQiLCJwYXJzZUZsb2F0IiwicHJpY2UiLCJ0b0ZpeGVkIiwiZmluZCIsInBvc2l0aW9uIiwiYWRkU3R5bGUiLCJjcmVhdGVMb2FkZXIiLCJwcmV2aWV3U3RhcnRMb2FkaW5nIiwiZ2V0Q2FydEl0ZW1zIiwiYWRkVG9QcmV2aWV3IiwiaW5zdGFuY2UiLCJzZXRUaW1lb3V0IiwicHJldmlld1N0b3BMb2FkaW5nIiwidG9nZ2xlQ2FydFByZXZpZXciLCJzdWJzY3JpYmUiLCJvcGVuQ2FydFByZXZpZXciLCJhZGRJdGVtIiwicmVsb2FkQ2FydFByZXZpZXciLCJmYXZvcml0ZUl0ZW0iLCJoYXNDbGFzcyIsInN3aXRjaENsYXNzZXMiLCJvcGVuaW5nIiwidG9nZ2xlQ2xhc3MiLCJzdHlsZSIsImRpc3BsYXkiLCJjbG9zZSIsImV2ZW50Iiwic3ZnIiwiY3JlYXRlRWxlbWVudE5TIiwiZyIsInBhdGgiLCJkaXYiLCJjb3VudCIsImdyb3VwcyIsInJlY3RhbmdlbHMiLCJhbmltYXRpb25zIiwicm90YXRpb24iLCJncm91cCIsInJlY3RhbmdlbCIsImJlZ2luIiwiYW5pbWF0ZSIsImRlZmF1bHRTZXR0aW5ncyQyIiwiQ29udGFpbmVyJDEiLCJGaWx0ZXIiLCJhZGRFdmVudExpc3RlbmVyIiwibWluV2lkdGgiLCJtaW5fd2lkdGgiLCJVcmwiLCJjb250ZW50IiwidXJsUGF0aCIsInRpdGxlIiwiaGlzdG9yeSIsInB1c2hTdGF0ZSIsIm9ucG9wc3RhdGUiLCJzdGF0ZSIsInBhZ2VUaXRsZSIsInNlcGFyYXRvciIsInJlZ0V4cCIsIlJlZ0V4cCIsInBhaXJTZXBhcmF0b3IiLCJtYXRjaCIsInBhcmFtZXRlcktleSIsInBhcmFtZXRlclZhbHVlIiwicmVxdWVzdGVkVXJsIiwiY2hhbmdlUXVlcnlQYXJhbWV0ZXJWYWx1ZSIsImxvY2F0aW9uIiwiaHJlZiIsInJlcGxhY2VTdGF0ZSIsInZhcnMiLCJwYXJ0cyIsIm0iLCJkZWZhdWx0U2V0dGluZ3MkMyIsIkNvbnRhaW5lciQyIiwiRXZlbnRNYW5hZ2VyJDMiLCJIdHRwJDEiLCJDaGVja291dCIsImNoYW5nZVVybCIsImhpZGVBbGwiLCJzaG93IiwiaGlkZSIsImNoYW5nZSIsIkNvbXBvbmVudHMiLCJib290ZWQiLCJjb21wb25lbnQiLCJkZWZhdWx0U2V0dGluZ3MkNCIsIml0ZW1fY2xhc3MiLCJhZGRfYnV0dG9uX2NsYXNzIiwiZmF2b3JpdGVfYnV0dG9uX2NsYXNzIiwiQ29udGFpbmVyJDMiLCJFdmVudE1hbmFnZXIkNCIsIkh0dHAkMiIsImNodW5rZWRQcm9kdWN0cyIsIlByb2R1Y3RzIiwidG90YWxJdGVtcyIsImxvYWRQcm9kdWN0cyIsInBhZ2VOdW1iZXIiLCJQYWdpbmF0aW9uIiwibGltaXQiLCJwZXJfcGFnZSIsInByb2Nlc3NpbmciLCJsb2FkUGFnZVByb2R1Y3RzT25jZSIsImxvYWRQYWdlUHJvZHVjdHMiLCJyZXF1ZXN0IiwiZ2V0UHJvZHVjdHMiLCJ0aGVuIiwicHJvZHVjdHMiLCJjdXJyZW50SXRlbXMiLCJyZXBsYWNlUHJvZHVjdHMiLCJjYXRjaCIsInBhZ2VzIiwiY2FsY3VsYXRlQ2xpZW50UGFnZXMiLCJ0b3RhbF9pdGVtcyIsInBlclBhZ2UiLCJhcnJheV9jaHVuayIsInJhd1Byb2R1Y3RzIiwiaXNBcnJheSIsImJ1aWxkUHJvZHVjdHMiLCJwcm9kdWN0IiwiYWN0aW9uIiwiYXR0cmlidXRlc0NvbGxlY3Rpb24iLCJ0YWdUeXBlIiwiYnVpbHRQcm9kdWN0cyIsImJ1aWx0UHJvZHVjdCIsImJ1aWxkUHJvZHVjdCIsIm92ZXJsYXkiLCJhZGREZWZhdWx0QXR0cmlidXRlcyIsInRhZyIsIm91dGVySFRNTCIsInNwYW4yIiwiaW5fYXJyYXkiLCJrZWJhYkNhc2UiLCJhZGRUb0NhcnQiLCJ0eXBlIiwiZmF2b3JpdGUiLCJtYXhXaWR0aCIsIm1heF93aWR0aCIsIlNlcnZpY2VzIiwiZGVmYXVsdE1lc3NhZ2UkNCIsIk5vdEluUGFnZVJhbmdlRXhjZXB0aW9uIiwiZGVmYXVsdFNldHRpbmdzJDUiLCJ1cmxfcGFyYW1ldGVyIiwiQ29udGFpbmVyJDQiLCJQcm9kdWN0cyQyIiwiRXZlbnRNYW5hZ2VyJDUiLCJzZXJ2aWNlcyIsInNldEN1cnJlbnQiLCJ0b3RhbFBhZ2VzIiwiY2FsY3VsYXRlVG90YWxQYWdlcyIsImJ1aWxkUGFnaW5hdGlvbiIsImxpbmtzIiwiY3JlYXRlTGlua3MiLCJyZXBsYWNlTGlua3MiLCJuZXh0IiwiY2hpbGROb2RlcyIsInJlcXVlc3RlZFBhZ2UiLCJjdXJyZW50Iiwibm90SW5QYWdlUmFuZ2UiLCJwcmV2aW91cyIsImdldEF0dHJpYnV0ZSIsInNldEFjdGl2ZUxpbmsiLCJ1bCIsImNyZWF0ZVBhZ2VMaW5rcyIsImNyZWF0ZVByZXZpb3VzQnV0dG9uIiwiY3JlYXRlTmV4dEJ1dHRvbiIsInBhZ2UiLCJwYWdlSXRlbSIsImxpbmsiLCJsaSIsInNwYW4xIiwiY2hhbmdlUGFyYW1ldGVyIiwiZGVmYXVsdE1lc3NhZ2UkNSIsIkNvbXBvbmVudE5vdFJlZ2lzdGVyZWRFeGNlcHRpb24iLCJDb21wb25lbnRzUHJvdmlkZXIiLCJjb21wb25lbnRzIiwiYXZhaWxhYmxlIiwiRXZlbnRzIiwiZXhpc3RzIiwibWFrZSIsImRlZmF1bHRNZXNzYWdlJDYiLCJJbnZhbGlkQmluZGluZ0V4Y2VwdGlvbiIsIkNvbnRhaW5lciQ1IiwiaW5zdGFuY2VzIiwicmVnaXN0ZXIiLCJyZWdpc3RlclByb3ZpZGVycyIsImNvbmNyZXRlIiwibmFtZXNwYWNlIiwiYWxpYXMiLCJpbnN0YW5jZUV4aXN0IiwiZ2V0SW5zdGFuY2UiLCJzZXRJbnN0YW5jZSIsImRlZmF1bHRTZXR0aW5ncyQ2IiwiZGVidWdfbGV2ZWwiLCJpbmplY3RfbGlicmFyaWVzIiwibG9hZGluZ19hbmltYXRpb24iLCJleHRlcm5hbExpYnJhcmllcyIsImJvb3RzdHJhcCIsInNldERlYnVnTGV2ZWwiLCJsb2FkRXh0ZXJuYWxMaWJyYXJpZXMiLCJzdGFydExvYWRpbmciLCJQcm94eSIsInNob3AiLCJwcm92aWRlIiwibGlicmFyaWVzIiwidWNmaXJzdCIsImFkZExpbmtlZFN0eWxlIiwiZG9jdW1lbnRFbGVtZW50IiwiY2xpZW50V2lkdGgiLCJmaWxsIiwiYm9keSIsInByb2dyZXNzIiwibWF4U2l6ZSIsInJlcXVlc3RBbmltYXRpb25GcmFtZSIsInByb2dyZXNzRHJhdyIsInRyYW5zZm9ybSIsImRvbmUiLCJvcGFjaXR5Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsSUFBSUEsaUJBQWtCLFlBQVk7QUFDbEM7O0FBRUE7Ozs7Ozs7O0FBSGtDLEtBVzVCQyxHQVg0QjtBQUFBO0FBQUE7QUFBQTs7QUFBQTtBQUFBOztBQWFqQzs7Ozs7O0FBYmlDLDZCQW1CaEJDLE1BbkJnQixFQW9CakM7QUFDQyxXQUFPQSxPQUFPQyxPQUFQLENBQWUsaUJBQWYsRUFBa0MsT0FBbEMsRUFBMkNDLFdBQTNDLEVBQVA7QUFDQTs7QUFFRDs7Ozs7OztBQXhCaUM7QUFBQTtBQUFBLDBCQThCbkJDLE1BOUJtQixFQStCakM7QUFDQyxRQUFJSCxTQUFTLEVBQWI7QUFDQSxRQUFJSSxXQUFXLGdFQUFmOztBQUVBLFNBQUssSUFBSUMsSUFBSSxDQUFiLEVBQWdCQSxJQUFJRixNQUFwQixFQUE0QkUsR0FBNUIsRUFBaUM7QUFDN0JMLGVBQVVJLFNBQVNFLE1BQVQsQ0FBZ0JDLEtBQUtDLEtBQUwsQ0FBV0QsS0FBS0UsTUFBTCxLQUFnQkwsU0FBU0QsTUFBcEMsQ0FBaEIsQ0FBVjtBQUNIOztBQUVELFdBQU9ILE1BQVA7QUFDQTs7QUFFRDs7Ozs7Ozs7QUExQ2lDO0FBQUE7QUFBQSwyQkFpRGxCQSxNQWpEa0IsRUFrRGpDO0FBQ0ksV0FBT0EsT0FBT00sTUFBUCxDQUFjLENBQWQsRUFBaUJJLFdBQWpCLEtBQWlDVixPQUFPVyxLQUFQLENBQWEsQ0FBYixDQUF4QztBQUNIO0FBcERnQzs7QUFBQTtBQUFBOztBQXVEbEM7Ozs7Ozs7QUFLQSxLQUFJQyxtQkFBSjs7QUE1RGtDLEtBOEQ1QkMsZ0JBOUQ0QjtBQUFBO0FBQUE7O0FBZ0VqQzs7Ozs7O0FBaEVpQyxxQkFzRVJDLEtBdEVRLEVBdUVqQztBQUNDO0FBQ0EsUUFBSUEsU0FBUyxTQUFULElBQXNCQSxTQUFTLE1BQW5DLEVBQTJDO0FBQzFDQyxZQUFPQyxPQUFQLEdBQWlCLFlBQVc7QUFBRSxhQUFPLElBQVA7QUFBYyxNQUE1QztBQUNBOztBQUVESixpQkFBYUUsS0FBYjtBQUNBOztBQUVEOzs7Ozs7O0FBaEZpQzs7QUFzRmpDLDhCQUNBO0FBQUE7O0FBQ0MsT0FBSUcsTUFBTUMsaUJBQVYsRUFBNkI7QUFDNUJELFVBQU1DLGlCQUFOLENBQXdCLElBQXhCLEVBQThCLEtBQUtDLFdBQUwsQ0FBaUJDLElBQS9DO0FBQ0E7QUFDRDs7QUFFRDs7Ozs7Ozs7O0FBN0ZpQztBQUFBO0FBQUEsOEJBb0d0QkMsS0FwR3NCLEVBb0dmQyxPQXBHZSxFQXFHakM7QUFDQyxTQUFLQyxhQUFMLENBQW1CRixLQUFuQixFQUEwQkMsT0FBMUI7O0FBRUEsWUFBT1YsVUFBUDtBQUVDLFVBQUssT0FBTDtBQUFjLFdBQUtZLFlBQUwsQ0FBa0JILEtBQWxCLEVBQXlCQyxPQUF6QixFQUFtQztBQUNqRCxVQUFLLFNBQUw7QUFBZ0IsV0FBS0csY0FBTCxDQUFvQkosS0FBcEIsRUFBMkJDLE9BQTNCLEVBQXFDO0FBQ3JELFVBQUssTUFBTDtBQUFhLFdBQUtJLFdBQUwsQ0FBaUJMLEtBQWpCLEVBQXdCQyxPQUF4QixFQUFrQztBQUMvQztBQUFTLFdBQUtJLFdBQUwsQ0FBaUJMLEtBQWpCLEVBQXdCQyxPQUF4QixFQUFrQztBQUw1QztBQU9BOztBQUVEOzs7Ozs7OztBQWpIaUM7QUFBQTtBQUFBLGlDQXdIbkJELEtBeEhtQixFQXdIWkMsT0F4SFksRUF5SGpDO0FBQ0MsUUFBSUQsTUFBTUYsV0FBTixDQUFrQkMsSUFBbEIsSUFBMEIsMEJBQTlCLEVBQTBEO0FBQ3pEO0FBQ0EsS0FGRCxNQUVPLElBQUlDLE1BQU1GLFdBQU4sQ0FBa0JDLElBQWxCLElBQTBCLHlCQUE5QixFQUF5RDtBQUMvRDtBQUNBLEtBRk0sTUFFQSxJQUFJQyxNQUFNRixXQUFOLENBQWtCQyxJQUFsQixJQUEwQix1QkFBOUIsRUFBdUQ7QUFDN0Q7QUFDQSxLQUZNLE1BRUEsSUFBSUMsTUFBTUYsV0FBTixDQUFrQkMsSUFBbEIsSUFBMEIscUJBQTlCLEVBQXFEO0FBQzNEO0FBQ0EsS0FGTSxNQUVBLElBQUlDLE1BQU1GLFdBQU4sQ0FBa0JDLElBQWxCLElBQTBCLGlDQUE5QixFQUFpRTtBQUN2RTtBQUNBLEtBRk0sTUFFQSxJQUFJQyxNQUFNRixXQUFOLENBQWtCQyxJQUFsQixJQUEwQix5QkFBOUIsRUFBeUQ7QUFDL0Q7QUFDQSxLQUZNLE1BRUE7QUFDTixZQUFPLEtBQVA7QUFDQTs7QUFFRCxXQUFPLEtBQVA7QUFDQTtBQTNJZ0M7QUFBQTtBQUFBLGdDQTZJcEJDLEtBN0lvQixFQTZJYkMsT0E3SWEsRUE4SWpDO0FBQ0NLLFlBQVFOLEtBQVIsQ0FBY0EsTUFBTUYsV0FBTixDQUFrQkMsSUFBbEIsR0FBeUIsSUFBekIsR0FBZ0NFLE9BQTlDO0FBQ0E7QUFoSmdDO0FBQUE7QUFBQSxrQ0FrSmxCRCxLQWxKa0IsRUFrSlhDLE9BbEpXLEVBbUpqQztBQUNDSyxZQUFRQyxJQUFSLENBQWFQLE1BQU1GLFdBQU4sQ0FBa0JDLElBQWxCLEdBQXlCLElBQXpCLEdBQWdDRSxPQUE3QztBQUNBO0FBckpnQztBQUFBO0FBQUEsK0JBdUpyQkQsS0F2SnFCLEVBdUpkQyxPQXZKYyxFQXdKakM7QUFDQ0ssWUFBUUUsSUFBUixDQUFhUixNQUFNRixXQUFOLENBQWtCQyxJQUFsQixHQUF5QixJQUF6QixHQUFnQ0UsT0FBN0M7QUFDQTtBQTFKZ0M7O0FBQUE7QUFBQTs7QUE2SmxDLEtBQUlRLGlCQUFpQixpQ0FBckI7O0FBN0prQyxLQStKNUJDLDBCQS9KNEI7QUFBQTs7QUFpS2pDLHdDQUNBO0FBQUEsT0FEWVQsT0FDWix1RUFEc0IsSUFDdEI7O0FBQUE7O0FBQ0NBLGFBQVVBLFdBQVdRLGNBQXJCOztBQURELHVKQUVPUixPQUZQOztBQUdJLCtKQUF1QkEsT0FBdkI7QUFISjtBQUlJOztBQXRLNkI7QUFBQSxHQStKT1QsZ0JBL0pQOztBQXlLbEM7Ozs7Ozs7O0FBektrQyxLQWlMNUJtQixHQWpMNEI7QUFBQTtBQUFBO0FBQUE7O0FBQUE7QUFBQTs7QUFtTGpDOzs7Ozs7QUFuTGlDLDZCQXlMaEJoQyxNQXpMZ0IsRUEwTGpDO0FBQ0lBLGFBQVNBLE9BQU9DLE9BQVAsQ0FBZSx3Q0FBZixFQUF5RCxFQUF6RCxDQUFUO0FBQ0FELGFBQVNBLE9BQU9DLE9BQVAsQ0FBZSxRQUFmLEVBQXlCLEdBQXpCLENBQVQ7QUFDQUQsYUFBU0EsT0FBT0MsT0FBUCxDQUFlLFVBQWYsRUFBMkIsSUFBM0IsQ0FBVDtBQUNBRCxhQUFTQSxPQUFPQyxPQUFQLENBQWUsVUFBZixFQUEyQixJQUEzQixDQUFUO0FBQ0FELGFBQVNBLE9BQU9DLE9BQVAsQ0FBZSxLQUFmLEVBQXNCLEdBQXRCLENBQVQ7O0FBRUEsV0FBT0QsTUFBUDtBQUNIOztBQUVEOzs7Ozs7Ozs7QUFwTWlDO0FBQUE7QUFBQSxpQ0E0TVppQyxPQTVNWSxFQTRNSEMsU0E1TUcsRUE0TVFDLFlBNU1SLEVBNk1qQztBQUNDLFNBQUtDLFdBQUwsQ0FBaUJILE9BQWpCLEVBQTBCQyxTQUExQjtBQUNBLFNBQUtHLFFBQUwsQ0FBY0osT0FBZCxFQUF1QkUsWUFBdkI7QUFDQTs7QUFFRDs7Ozs7Ozs7QUFsTmlDO0FBQUE7QUFBQSw0QkF5TmpCRixPQXpOaUIsRUF5TlJDLFNBek5RLEVBME5qQztBQUNDLFFBQUdELFlBQVksSUFBZixFQUFxQjtBQUNwQixXQUFNLElBQUlGLDBCQUFKLEVBQU47QUFDQTs7QUFFRCxRQUFHLENBQUVHLFNBQUYsSUFBZUEsYUFBYSxFQUE1QixJQUFrQyxRQUFPQSxTQUFQLHlDQUFPQSxTQUFQLE9BQXFCSSxTQUExRCxFQUFxRTtBQUNwRSxZQUFPTCxPQUFQO0FBQ0E7O0FBRUQsUUFBSU0sYUFBYUwsVUFBVU0sS0FBVixDQUFnQixHQUFoQixDQUFqQjs7QUFFQUQsZUFBV0UsT0FBWCxDQUFtQixVQUFTckIsSUFBVCxFQUFlO0FBQ2pDYSxhQUFRUyxTQUFSLENBQWtCQyxHQUFsQixDQUFzQnZCLElBQXRCO0FBQ0EsS0FGRDs7QUFJQSxXQUFPYSxPQUFQO0FBQ0E7O0FBRUQ7Ozs7Ozs7O0FBNU9pQztBQUFBO0FBQUEsNEJBbVBqQkEsT0FuUGlCLEVBbVBSQyxTQW5QUSxFQW9QakM7QUFDQyxRQUFJRCxZQUFZLElBQWhCLEVBQXNCO0FBQ3JCLFdBQU0sSUFBSUYsMEJBQUosQ0FBK0IsaUZBQS9CLENBQU47QUFDQTs7QUFFRCxRQUFJLENBQUVHLFNBQUYsSUFBZUEsYUFBYSxFQUE1QixJQUFrQyxPQUFPQSxTQUFQLElBQW9CLFdBQTFELEVBQXVFO0FBQ3RFO0FBQ0E7O0FBRUQsV0FBT0QsUUFBUUMsU0FBUixDQUFrQlUsT0FBbEIsQ0FBMEJWLFNBQTFCLEtBQXdDLENBQUMsQ0FBaEQ7QUFDQTs7QUFFRDs7Ozs7Ozs7QUFoUWlDO0FBQUE7QUFBQSwrQkF1UWRELE9BdlFjLEVBdVFMQyxTQXZRSyxFQXdRakM7QUFDQyxRQUFHRCxXQUFXLElBQWQsRUFBb0I7QUFDbkIsV0FBTSxJQUFJRiwwQkFBSixFQUFOO0FBQ0E7O0FBRUQsUUFBR0csYUFBYSxFQUFoQixFQUFvQjtBQUNuQkQsYUFBUUMsU0FBUixHQUFvQixFQUFwQjtBQUNBLEtBRkQsTUFFTzs7QUFFTixTQUFJSyxhQUFhTCxVQUFVTSxLQUFWLENBQWdCLEdBQWhCLENBQWpCOztBQUVBRCxnQkFBV0UsT0FBWCxDQUFtQixVQUFTckIsSUFBVCxFQUFlO0FBQ2pDYSxjQUFRUyxTQUFSLENBQWtCRyxNQUFsQixDQUF5QnpCLElBQXpCO0FBQ0EsTUFGRDtBQUdBOztBQUVELFdBQU9hLE9BQVA7QUFDQTs7QUFFRDs7Ozs7OztBQTNSaUM7QUFBQTtBQUFBLDBCQWlTbkJBLE9BalNtQixFQWtTakM7QUFDQ0EsWUFBUWEsVUFBUixDQUFtQkMsV0FBbkIsQ0FBK0JkLE9BQS9CO0FBQ0E7O0FBRUQ7Ozs7Ozs7O0FBdFNpQztBQUFBO0FBQUEsNEJBNlNqQmUsRUE3U2lCLEVBNlNiQyxHQTdTYSxFQThTakM7QUFDQyxRQUFJLE9BQU9BLEdBQVAsSUFBYyxRQUFsQixFQUE0QjtBQUMzQixXQUFNLElBQUlsQiwwQkFBSixFQUFOO0FBQ0E7O0FBRUQsUUFBSW1CLE9BQU9DLFNBQVNELElBQVQsSUFBaUJDLFNBQVNDLG9CQUFULENBQThCLE1BQTlCLEVBQXNDLENBQXRDLENBQTVCO0FBQ0EsUUFBSUMsV0FBV0YsU0FBU0csYUFBVCxDQUF1QixPQUF2QixDQUFmOztBQUVBO0FBQ0csUUFBSUMsTUFBTSxLQUFLQyxTQUFMLENBQWVQLEdBQWYsQ0FBVjtBQUNBO0FBQ0FJLGFBQVNJLFNBQVQsR0FBcUJGLEdBQXJCO0FBQ0E7QUFDSEYsYUFBU0ssWUFBVCxDQUFzQixJQUF0QixFQUE0QlYsRUFBNUI7QUFDQTtBQUNBRSxTQUFLUyxXQUFMLENBQWlCTixRQUFqQjtBQUNBOztBQUVEOzs7Ozs7OztBQWhVaUM7QUFBQTtBQUFBLGtDQXVVWEwsRUF2VVcsRUF1VVBZLE1BdlVPLEVBd1VqQztBQUNDLFFBQUksT0FBT0EsTUFBUCxJQUFpQixRQUFyQixFQUErQjtBQUM5QixXQUFNLElBQUk3QiwwQkFBSixDQUErQixrRkFBaUY2QixNQUFqRix5Q0FBaUZBLE1BQWpGLEtBQTBGLHNCQUF6SCxDQUFOO0FBQ0E7O0FBRUQsUUFBSVYsT0FBT0MsU0FBU0QsSUFBVCxJQUFpQkMsU0FBU0Msb0JBQVQsQ0FBOEIsTUFBOUIsRUFBc0MsQ0FBdEMsQ0FBNUI7QUFDQSxRQUFJUyxpQkFBaUJWLFNBQVNHLGFBQVQsQ0FBdUIsTUFBdkIsQ0FBckI7O0FBRUc7QUFDSE8sbUJBQWVILFlBQWYsQ0FBNEIsSUFBNUIsRUFBa0NWLEVBQWxDO0FBQ0FhLG1CQUFlSCxZQUFmLENBQTRCLE1BQTVCLEVBQW9DRSxNQUFwQztBQUNBQyxtQkFBZUgsWUFBZixDQUE0QixLQUE1QixFQUFtQyxZQUFuQztBQUNBRyxtQkFBZUgsWUFBZixDQUE0QixNQUE1QixFQUFvQyxVQUFwQztBQUNBO0FBQ0FSLFNBQUtTLFdBQUwsQ0FBaUJFLGNBQWpCO0FBQ0E7O0FBRUQ7Ozs7Ozs7O0FBelZpQztBQUFBO0FBQUEsaUNBZ1daQyxXQWhXWSxFQWdXQ0MsT0FoV0QsRUFpV2pDO0FBQ0MsUUFBSTlCLFVBQVVrQixTQUFTRyxhQUFULENBQXVCUSxXQUF2QixDQUFkOztBQUVBLFFBQUlDLFlBQVl6QixTQUFoQixFQUEyQjtBQUMxQixZQUFPTCxPQUFQO0FBQ0E7O0FBRUQsU0FBSyxJQUFJK0IsTUFBVCxJQUFtQkQsT0FBbkIsRUFBNEI7QUFDM0IsYUFBT0MsTUFBUDtBQUVDLFdBQUssTUFBTDtBQUNBLFdBQUssTUFBTDtBQUNDL0IsZUFBUXdCLFNBQVIsR0FBb0JNLFFBQVFDLE1BQVIsQ0FBcEI7QUFDQTtBQUNEO0FBQ0MvQixlQUFReUIsWUFBUixDQUFxQk0sTUFBckIsRUFBNkJELFFBQVFDLE1BQVIsQ0FBN0I7QUFDQTtBQVJGO0FBVUE7O0FBRUQsV0FBTy9CLE9BQVA7QUFDQTs7QUFFRDs7Ozs7Ozs7QUF4WGlDO0FBQUE7QUFBQSwrQkErWGRBLE9BL1hjLEVBK1hMQyxTQS9YSyxFQStYTStCLGVBL1hOLEVBZ1lqQztBQUNDLFFBQUloQyxXQUFXLElBQVgsSUFBbUIsT0FBT0EsT0FBUCxJQUFrQixXQUF6QyxFQUFzRDtBQUNyRCxXQUFNLElBQUlGLDBCQUFKLEVBQU47QUFDQTs7QUFFRGtDLHNCQUFrQkEsbUJBQW1CM0IsU0FBckM7O0FBRUEsUUFBRzJCLGVBQUgsRUFBb0I7QUFDbkJoQyxhQUFRUyxTQUFSLENBQWtCd0IsTUFBbEIsQ0FBeUJELGVBQXpCO0FBQ0E7O0FBRUQsV0FBT2hDLFFBQVFTLFNBQVIsQ0FBa0J3QixNQUFsQixDQUF5QmhDLFNBQXpCLENBQVA7QUFDQTs7QUFFRDs7Ozs7Ozs7QUE5WWlDO0FBQUE7QUFBQSx3QkFxWnJCaUMsUUFyWnFCLEVBc1pqQztBQUFBLFFBRHNCQyxPQUN0Qix1RUFEZ0NyRCxPQUFPb0MsUUFDdkM7O0FBQ0MsV0FBT2tCLGFBQWFGLFFBQWIsRUFBdUJDLE9BQXZCLENBQVA7QUFDQTtBQXhaZ0M7O0FBQUE7QUFBQTs7QUEyWmxDOzs7Ozs7Ozs7QUFPQSxVQUFTQyxZQUFULENBQXNCRixRQUF0QixFQUFnQ0csYUFBaEMsRUFDQTtBQUNDLE1BQUksT0FBT0gsUUFBUCxJQUFtQixRQUF2QixFQUFpQztBQUNoQyxTQUFNLElBQUlwQywwQkFBSixDQUErQix3RUFBdUVvQyxRQUF2RSx5Q0FBdUVBLFFBQXZFLEtBQWtGLHNCQUFqSCxDQUFOO0FBQ0E7O0FBRUQsTUFBSWxDLFVBQVVxQyxjQUFjQyxnQkFBZCxDQUErQkosUUFBL0IsQ0FBZDs7QUFFQSxNQUFJbEMsUUFBUTlCLE1BQVIsSUFBa0IsQ0FBdEIsRUFBeUI7QUFDeEIsVUFBTyxJQUFQO0FBQ0E7O0FBRUQsU0FBUThCLFFBQVE5QixNQUFSLEdBQWlCLENBQWxCLEdBQXVCOEIsT0FBdkIsR0FBaUNBLFFBQVEsQ0FBUixDQUF4QztBQUNBOztBQUVEOzs7Ozs7O0FBT0EsVUFBU3VDLFFBQVQsQ0FBa0JGLGFBQWxCLEVBQWlDRyxZQUFqQyxFQUNBO0FBQ0ssTUFBSUMsT0FBT0QsYUFBYTNCLFVBQXhCOztBQUVBLFNBQU80QixRQUFRLElBQWYsRUFBcUI7QUFDakIsT0FBSUEsUUFBUUosYUFBWixFQUEyQjtBQUN2QixXQUFPLElBQVA7QUFDSDtBQUNESSxVQUFPQSxLQUFLNUIsVUFBWjtBQUNIOztBQUVELFNBQU8sS0FBUDtBQUNKOztBQUVEOzs7Ozs7OztBQXRja0MsS0E4YzVCNkIsTUE5YzRCO0FBQUE7QUFBQTtBQUFBOztBQUFBO0FBQUE7O0FBZ2RqQzs7Ozs7OztBQWhkaUMsMEJBdWRuQkMsYUF2ZG1CLEVBdWRKQyxTQXZkSSxFQXVkTztBQUN2QyxRQUFJQyxXQUFXLEVBQWY7QUFDRyxRQUFJQyxJQUFKOztBQUVBLFNBQUtBLElBQUwsSUFBYUgsYUFBYixFQUE0QjtBQUN4QixTQUFJSSxPQUFPQyxTQUFQLENBQWlCQyxjQUFqQixDQUFnQ0MsSUFBaEMsQ0FBcUNQLGFBQXJDLEVBQW9ERyxJQUFwRCxDQUFKLEVBQStEO0FBQzNERCxlQUFTQyxJQUFULElBQWlCSCxjQUFjRyxJQUFkLENBQWpCO0FBQ0g7QUFDSjs7QUFFRCxTQUFLQSxJQUFMLElBQWFGLFNBQWIsRUFBd0I7QUFDcEIsU0FBSUcsT0FBT0MsU0FBUCxDQUFpQkMsY0FBakIsQ0FBZ0NDLElBQWhDLENBQXFDTixTQUFyQyxFQUFnREUsSUFBaEQsQ0FBSixFQUEyRDtBQUN2REQsZUFBU0MsSUFBVCxJQUFpQkYsVUFBVUUsSUFBVixDQUFqQjtBQUNIO0FBQ0o7O0FBRUQsV0FBT0QsUUFBUDtBQUNIOztBQUVEOzs7Ozs7Ozs7QUExZWlDO0FBQUE7QUFBQSw0QkFrZmpCTSxNQWxmaUIsRUFrZlRDLE9BbGZTLEVBa2ZBO0FBQ2hDLFFBQUksT0FBT0EsT0FBUCxJQUFrQixXQUFsQixJQUFpQ0EsUUFBUWxFLFdBQVIsS0FBd0JtRSxLQUE3RCxFQUFvRTtBQUNuRSxXQUFNLElBQUl2RCwwQkFBSixDQUErQixnRkFBK0VzRCxPQUEvRSx5Q0FBK0VBLE9BQS9FLEtBQXlGLG9CQUF4SCxDQUFOO0FBQ0E7O0FBRUQsU0FBSyxJQUFJaEYsSUFBSSxDQUFiLEVBQWdCQSxLQUFLZ0YsUUFBUWxGLE1BQTdCLEVBQXFDRSxHQUFyQyxFQUEwQztBQUN6QyxTQUFJK0UsVUFBVUMsUUFBUWhGLENBQVIsQ0FBZCxFQUEwQjtBQUN6QixhQUFPLElBQVA7QUFDQTtBQUNEOztBQUVELFdBQU8sS0FBUDtBQUNBOztBQUVEOzs7Ozs7OztBQWhnQmlDO0FBQUE7QUFBQSwrQkF1Z0Jka0YsS0F2Z0JjLEVBd2dCakM7QUFBQSxRQUQwQkMsSUFDMUIsdUVBRGlDLENBQ2pDOztBQUNNLFFBQUlDLE1BQU1ELElBQU4sQ0FBSixFQUFpQjtBQUNoQixXQUFNLElBQUl6RCwwQkFBSixDQUErQixtRkFBa0Z5RCxJQUFsRix5Q0FBa0ZBLElBQWxGLEtBQXlGLGtCQUF4SCxDQUFOO0FBQ0E7O0FBRURBLFdBQU9FLFNBQVNGLElBQVQsQ0FBUDs7QUFFQyxRQUFJbkYsVUFBSjtBQUNBLFFBQUlzRixhQUFhLEVBQWpCOztBQUVBO0FBQ0EsU0FBS3RGLElBQUksQ0FBVCxFQUFZQSxJQUFJRSxLQUFLcUYsSUFBTCxDQUFVTCxNQUFNcEYsTUFBTixHQUFlcUYsSUFBekIsQ0FBaEIsRUFBZ0RuRixHQUFoRCxFQUFxRDs7QUFFakQsU0FBSXdGLFFBQVF4RixJQUFJbUYsSUFBaEI7QUFDQSxTQUFJTSxNQUFNRCxRQUFRTCxJQUFsQjs7QUFFQUcsZ0JBQVdJLElBQVgsQ0FBZ0JSLE1BQU01RSxLQUFOLENBQVlrRixLQUFaLEVBQW1CQyxHQUFuQixDQUFoQjtBQUVIOztBQUVELFdBQU9ILFVBQVA7QUFDTjs7QUFFRDs7Ozs7OztBQS9oQmlDO0FBQUE7QUFBQSwrQkFxaUJkSyxNQXJpQmMsRUFxaUJOO0FBQzFCLFNBQUssSUFBSWpCLElBQVQsSUFBaUJpQixNQUFqQixFQUF5QjtBQUN4QixZQUFPLEtBQVA7QUFDQTs7QUFFRCxXQUFPLElBQVA7QUFDQTs7QUFHRDs7Ozs7Ozs7QUE5aUJpQztBQUFBO0FBQUEsa0NBcWpCWEEsTUFyakJXLEVBcWpCSFgsT0FyakJHLEVBc2pCakM7QUFDSSxRQUFJaEYsVUFBSjs7QUFFQSxTQUFLQSxJQUFJLENBQVQsRUFBWUEsSUFBSWdGLFFBQVFsRixNQUF4QixFQUFnQ0UsR0FBaEMsRUFBcUM7QUFDakMsU0FBSSxPQUFPMkYsTUFBUCxJQUFpQixRQUFqQixJQUE2QlgsUUFBUWhGLENBQVIsRUFBV2MsV0FBWCxDQUF1QkMsSUFBdkIsS0FBZ0M0RSxNQUFqRSxFQUF5RTtBQUN4RSxhQUFPLElBQVA7QUFDQTs7QUFFRCxTQUFJWCxRQUFRaEYsQ0FBUixNQUFlMkYsTUFBbkIsRUFBMkI7QUFDdkIsYUFBTyxJQUFQO0FBQ0g7QUFDSjs7QUFFRCxXQUFPLEtBQVA7QUFDSDs7QUFFRDs7Ozs7OztBQXRrQmlDO0FBQUE7QUFBQSw0QkE0a0JqQkEsTUE1a0JpQixFQTZrQmpDO0FBQ0MsV0FBTyxRQUFPQSxNQUFQLHlDQUFPQSxNQUFQLE1BQWlCLFFBQXhCO0FBQ0E7QUEva0JnQzs7QUFBQTtBQUFBOztBQWtsQmxDLEtBQUlDLG1CQUFtQiwrQkFBdkI7O0FBbGxCa0MsS0FvbEI1QkMsNkJBcGxCNEI7QUFBQTs7QUFzbEJqQywyQ0FDQTtBQUFBLE9BRFk1RSxPQUNaLHVFQURzQixJQUN0Qjs7QUFBQTs7QUFDQ0EsYUFBVUEsV0FBVzJFLGdCQUFyQjs7QUFERCw4SkFFTzNFLE9BRlA7O0FBR0ksd0tBQXVCQSxPQUF2QjtBQUhKO0FBSUk7O0FBM2xCNkI7QUFBQSxHQW9sQlVULGdCQXBsQlY7O0FBOGxCbEM7Ozs7Ozs7QUFPQTs7Ozs7O0FBTUEsS0FBSXNGLGtCQUFrQjtBQUNyQkMsV0FBUztBQUNSLG1CQUFnQjtBQURSLEdBRFk7QUFJckJDLFNBQU87QUFKYyxFQUF0Qjs7QUEzbUJrQyxLQWtuQjVCQyxPQWxuQjRCO0FBb25CakM7Ozs7Ozs7QUFPQSxtQkFBWUMsUUFBWixFQUNBO0FBQUE7O0FBQ0MsUUFBS0EsUUFBTCxHQUFnQjVCLE9BQU82QixNQUFQLENBQWNMLGVBQWQsRUFBK0JJLFFBQS9CLENBQWhCO0FBQ0EsUUFBS0UsdUJBQUw7QUFDQTs7QUFFRDs7Ozs7OztBQWpvQmlDO0FBQUE7QUFBQSw2Q0F1b0JqQztBQUNDLFFBQUlDLGVBQUo7QUFDQSxRQUFJTixVQUFVLEtBQUtHLFFBQUwsQ0FBY0gsT0FBNUI7QUFDQSxRQUFJQyxRQUFRLEtBQUtFLFFBQUwsQ0FBY0YsS0FBMUI7QUFDQSxRQUFJTSxPQUFPQyxlQUFlM0IsU0FBZixDQUF5QjBCLElBQXBDO0FBQ0EsUUFBSUUsbUJBQW1CRCxlQUFlM0IsU0FBZixDQUF5QjRCLGdCQUFoRDs7QUFFQUQsbUJBQWUzQixTQUFmLENBQXlCMEIsSUFBekIsR0FBZ0MsWUFBVztBQUMxQyxTQUFJRyxXQUFXSCxLQUFLSSxLQUFMLENBQVcsSUFBWCxFQUFpQkMsU0FBakIsRUFBNEJYLEtBQTVCLENBQWY7O0FBRUEsVUFBS0ssTUFBTCxJQUFlTixPQUFmLEVBQXdCO0FBQ3ZCLFdBQUtTLGdCQUFMLENBQXNCSCxNQUF0QixFQUE4Qk4sUUFBUU0sTUFBUixDQUE5QjtBQUNBOztBQUVDLFlBQU9JLFFBQVA7QUFDRixLQVJEO0FBU0E7O0FBRUQ7Ozs7Ozs7QUF6cEJpQztBQUFBO0FBQUEsd0JBK3BCNUIvQyxPQS9wQjRCLEVBZ3FCakM7QUFDQyxRQUFJa0QsTUFBTSxLQUFLQSxHQUFmOztBQUVBLFFBQUdsRCxRQUFRbUIsY0FBUixDQUF1QixRQUF2QixLQUFvQyxPQUFPbkIsUUFBUW1ELE1BQWYsSUFBeUIsVUFBaEUsRUFBNEU7QUFDM0VuRCxhQUFRbUQsTUFBUixDQUFlL0IsSUFBZixDQUFvQixJQUFwQjtBQUNBOztBQUVELFdBQU8sSUFBSWdDLE9BQUosQ0FBWSxVQUFTQyxPQUFULEVBQWtCQyxNQUFsQixFQUEwQjtBQUM1QyxTQUFHLFFBQU90RCxPQUFQLHlDQUFPQSxPQUFQLE9BQW1CLFFBQXRCLEVBQWdDO0FBQy9CLFlBQU0sSUFBSTlDLEtBQUosQ0FBVSwwRUFBd0U4QyxPQUF4RSx5Q0FBd0VBLE9BQXhFLEtBQWtGLGNBQTVGLENBQU47QUFDQTs7QUFFREEsYUFBUXVELElBQVIsR0FBZXZELFFBQVF1RCxJQUFSLElBQWdCLEVBQS9COztBQUVBLFNBQUcsUUFBT3ZELFFBQVF1RCxJQUFmLE1BQXdCLFFBQTNCLEVBQXFDO0FBQ3BDLFlBQU0sSUFBSXJHLEtBQUosQ0FBVSxvRkFBbUY4QyxRQUFRdUQsSUFBM0YsSUFBa0csY0FBNUcsQ0FBTjtBQUNBOztBQUVETCxTQUFJTixJQUFKLENBQVMsTUFBVCxFQUFpQjVDLFFBQVF3RCxHQUF6QixFQUE4QixJQUE5Qjs7QUFFQU4sU0FBSU8sWUFBSixHQUFtQnpELFFBQVEwRCxRQUFSLElBQW9CLE1BQXZDO0FBQ0FSLFNBQUlTLE9BQUosR0FBYzNELFFBQVEyRCxPQUFSLElBQW1CLElBQWpDOztBQUVBVCxTQUFJVSxrQkFBSixHQUF5QixZQUFXO0FBQ25DLFVBQUksS0FBS0MsVUFBTCxJQUFtQixDQUFuQixJQUF5QixLQUFLQyxNQUFMLElBQWUsR0FBZixJQUFzQixLQUFLQSxNQUFMLElBQWUsR0FBbEUsRUFBd0U7QUFDcEVSLGNBQU8sS0FBS1MsWUFBWjtBQUNBOztBQUVELFVBQUksS0FBS0YsVUFBTCxJQUFtQixDQUFuQixJQUF3QixLQUFLQyxNQUFMLElBQWUsR0FBM0MsRUFBZ0Q7QUFDL0M7QUFDQTs7QUFFRVQsY0FBUSxLQUFLTixRQUFiOztBQUVBLFVBQUkvQyxRQUFRbUIsY0FBUixDQUF1QixPQUF2QixLQUFtQyxPQUFPbkIsUUFBUWdFLEtBQWYsSUFBd0IsVUFBL0QsRUFBMkU7QUFDaEZoRSxlQUFRZ0UsS0FBUixDQUFjNUMsSUFBZCxDQUFtQixJQUFuQjtBQUNBO0FBQ0QsTUFkRDs7QUFnQkE4QixTQUFJakcsT0FBSixHQUFjLFVBQVNNLE9BQVQsRUFBa0I7QUFDL0IsVUFBR3lDLFFBQVFtQixjQUFSLENBQXVCLE9BQXZCLEtBQW1DLE9BQU9uQixRQUFRMUMsS0FBZixJQUF3QixVQUE5RCxFQUEwRTtBQUN6RTBDLGVBQVExQyxLQUFSLENBQWNDLE9BQWQ7QUFDQTs7QUFFRCtGLGFBQU8vRixPQUFQO0FBQ0EsTUFORDs7QUFRQSxTQUFHLENBQUV5QyxRQUFRdUQsSUFBYixFQUFtQjtBQUNsQkwsVUFBSWUsSUFBSixDQUFTLElBQVQ7QUFDQTs7QUFFRCxTQUFJQyxjQUFjakQsT0FBT2tELElBQVAsQ0FBWW5FLFFBQVF1RCxJQUFwQixFQUEwQmEsR0FBMUIsQ0FBOEIsVUFBU0MsR0FBVCxFQUFjO0FBQ25ELGFBQU9DLG1CQUFtQkQsR0FBbkIsSUFBMEIsR0FBMUIsR0FDRkMsbUJBQW1CdEUsUUFBUXVELElBQVIsQ0FBYWMsR0FBYixDQUFuQixDQURMO0FBRUYsTUFIUyxFQUdQRSxJQUhPLENBR0YsR0FIRSxDQUFsQjs7QUFLQXJCLFNBQUllLElBQUosQ0FBU0MsV0FBVDtBQUNBLEtBbERNLENBQVA7QUFtREE7O0FBRUQ7Ozs7Ozs7QUE1dEJpQztBQUFBO0FBQUEsdUJBa3VCN0JsRSxPQWx1QjZCLEVBbXVCakM7QUFDQyxRQUFJa0QsTUFBTSxJQUFJTCxjQUFKLE1BQXdCLElBQUkyQixhQUFKLENBQWtCLG1CQUFsQixDQUFsQzs7QUFFQSxRQUFJeEUsUUFBUW1CLGNBQVIsQ0FBdUIsUUFBdkIsS0FBb0MsT0FBT25CLFFBQVFtRCxNQUFmLElBQXlCLFVBQWpFLEVBQTZFO0FBQzVFbkQsYUFBUW1ELE1BQVIsQ0FBZS9CLElBQWYsQ0FBb0IsSUFBcEI7QUFDQTs7QUFFRCxXQUFPLElBQUlnQyxPQUFKLENBQVksVUFBU0MsT0FBVCxFQUFrQkMsTUFBbEIsRUFBMEI7QUFDNUMsU0FBSSxRQUFPdEQsT0FBUCx5Q0FBT0EsT0FBUCxPQUFtQixRQUF2QixFQUFpQztBQUNoQyxZQUFNLElBQUk5QyxLQUFKLENBQVUsMEVBQXdFOEMsT0FBeEUseUNBQXdFQSxPQUF4RSxLQUFrRixjQUE1RixDQUFOO0FBQ0E7O0FBRURBLGFBQVF1RCxJQUFSLEdBQWV2RCxRQUFRdUQsSUFBUixJQUFnQixFQUEvQjs7QUFFQSxTQUFJLFFBQU92RCxRQUFRdUQsSUFBZixNQUF3QixRQUE1QixFQUFzQztBQUNyQyxZQUFNLElBQUlyRyxLQUFKLENBQVUsb0ZBQW1GOEMsUUFBUXVELElBQTNGLElBQWtHLGNBQTVHLENBQU47QUFDQTs7QUFFREwsU0FBSU4sSUFBSixDQUFTLEtBQVQsRUFBZ0I1QyxRQUFRd0QsR0FBeEIsRUFBNkIsSUFBN0I7O0FBRUFOLFNBQUlPLFlBQUosR0FBbUJ6RCxRQUFRMEQsUUFBUixJQUFvQixNQUF2QztBQUNBUixTQUFJUyxPQUFKLEdBQWMzRCxRQUFRMkQsT0FBUixJQUFtQixJQUFqQzs7QUFFQSxTQUFJVCxJQUFJTyxZQUFKLElBQW9CLE1BQXhCLEVBQWdDO0FBQy9CUCxVQUFJSixnQkFBSixDQUFxQixjQUFyQixFQUFxQyxrQkFBckM7QUFDQUksVUFBSUosZ0JBQUosQ0FBcUIsUUFBckIsRUFBK0Isa0JBQS9CO0FBQ0E7O0FBRUQsU0FBSUksSUFBSU8sWUFBSixJQUFvQixVQUF4QixFQUFvQztBQUNuQ1AsVUFBSXVCLGdCQUFKLENBQXFCLFVBQXJCO0FBQ0F2QixVQUFJSixnQkFBSixDQUFxQixjQUFyQixFQUFxQyxXQUFyQztBQUNBSSxVQUFJSixnQkFBSixDQUFxQixRQUFyQixFQUErQixXQUEvQjtBQUNBOztBQUVESSxTQUFJVSxrQkFBSixHQUF5QixZQUFXO0FBQ2hDLFVBQUksS0FBS0MsVUFBTCxJQUFtQixDQUFuQixJQUF5QixLQUFLQyxNQUFMLElBQWUsR0FBZixJQUFzQixLQUFLQSxNQUFMLElBQWUsR0FBbEUsRUFBd0U7QUFDdkVSLGNBQU8sS0FBS1MsWUFBWjtBQUNBOztBQUVELFVBQUksS0FBS0YsVUFBTCxJQUFtQixDQUFuQixJQUF3QixLQUFLQyxNQUFMLElBQWUsR0FBM0MsRUFBZ0Q7QUFDL0MsV0FBSWYsV0FBVyxLQUFLQSxRQUFMLElBQWlCLEtBQUtnQixZQUFyQztBQUNBaEIsa0JBQVlHLElBQUlPLFlBQUosSUFBb0IsTUFBcEIsSUFBOEIsUUFBT1YsUUFBUCx5Q0FBT0EsUUFBUCxNQUFtQixRQUFsRCxHQUE4RDJCLEtBQUtDLEtBQUwsQ0FBVzVCLFFBQVgsQ0FBOUQsR0FBcUZBLFFBQWhHO0FBQ0FNLGVBQVFOLFFBQVI7O0FBRUcsV0FBSS9DLFFBQVFtQixjQUFSLENBQXVCLE9BQXZCLEtBQW1DLE9BQU9uQixRQUFRZ0UsS0FBZixJQUF3QixVQUEvRCxFQUEyRTtBQUNoRmhFLGdCQUFRZ0UsS0FBUixDQUFjNUMsSUFBZCxDQUFtQixJQUFuQjtBQUNBO0FBQ0Q7QUFDRCxNQWREOztBQWdCQThCLFNBQUkwQixPQUFKLEdBQWMxQixJQUFJakcsT0FBSixHQUFjLFVBQVNNLE9BQVQsRUFBa0I7QUFDN0MsVUFBSXlDLFFBQVFtQixjQUFSLENBQXVCLE9BQXZCLEtBQW1DLE9BQU9uQixRQUFRMUMsS0FBZixJQUF3QixVQUEvRCxFQUEyRTtBQUMxRTBDLGVBQVExQyxLQUFSLENBQWNDLE9BQWQ7QUFDQTs7QUFFRCtGLGFBQU8vRixPQUFQO0FBQ0EsTUFORDs7QUFRQSxTQUFJLENBQUV5QyxRQUFRdUQsSUFBZCxFQUFvQjtBQUNuQkwsVUFBSWUsSUFBSixDQUFTLElBQVQ7QUFDQTs7QUFFRCxTQUFJQyxjQUFjakQsT0FBT2tELElBQVAsQ0FBWW5FLFFBQVF1RCxJQUFwQixFQUEwQmEsR0FBMUIsQ0FBOEIsVUFBU0MsR0FBVCxFQUFjO0FBQ25ELGFBQU9DLG1CQUFtQkQsR0FBbkIsSUFBMEIsR0FBMUIsR0FDRkMsbUJBQW1CdEUsUUFBUXVELElBQVIsQ0FBYWMsR0FBYixDQUFuQixDQURMO0FBRUYsTUFIUyxFQUdQRSxJQUhPLENBR0YsR0FIRSxDQUFsQjs7QUFLQXJCLFNBQUllLElBQUosQ0FBU0MsV0FBVDtBQUNBLEtBN0RNLENBQVA7QUE4REE7QUF4eUJnQzs7QUFBQTtBQUFBOztBQTJ5QmxDLEtBQUlXLG1CQUFtQixxRUFBdkI7O0FBM3lCa0MsS0E2eUI1QkMscUJBN3lCNEI7QUFBQTs7QUEreUJqQyxtQ0FDQTtBQUFBLE9BRFl2SCxPQUNaLHVFQURzQixJQUN0Qjs7QUFBQTs7QUFDQ0EsYUFBVUEsV0FBV3NILGdCQUFyQjs7QUFERCw4SUFFT3RILE9BRlA7O0FBR0ksd0pBQXVCQSxPQUF2QjtBQUhKO0FBSUk7O0FBcHpCNkI7QUFBQSxHQTZ5QkVULGdCQTd5QkY7O0FBdXpCbEM7Ozs7Ozs7QUF2ekJrQyxLQTh6QjVCaUksWUE5ekI0QjtBQWcwQmpDOzs7OztBQUtBLDBCQUNBO0FBQUE7O0FBQ0MsUUFBS0MsTUFBTCxHQUFjLEVBQWQ7QUFDQTs7QUFFRDs7Ozs7Ozs7O0FBMTBCaUM7QUFBQTtBQUFBLDZCQWkxQnZCM0gsSUFqMUJ1QixFQWkxQmpCNEgsUUFqMUJpQixFQWsxQmpDO0FBQ0MsUUFBSSxPQUFPQSxRQUFQLEtBQW9CLFVBQXhCLEVBQW9DO0FBQ25DLFdBQU0sSUFBSUMsd0JBQUosRUFBTjtBQUNBOztBQUVELFFBQUksT0FBTyxLQUFLRixNQUFMLENBQVkzSCxJQUFaLENBQVAsSUFBNEIsV0FBaEMsRUFBNkM7QUFDNUMsVUFBSzJILE1BQUwsQ0FBWTNILElBQVosSUFBb0IsRUFBcEI7QUFDQTs7QUFFRCxTQUFLMkgsTUFBTCxDQUFZM0gsSUFBWixFQUFrQjJFLElBQWxCLENBQXVCaUQsUUFBdkI7QUFDQTs7QUFFRDs7Ozs7Ozs7QUE5MUJpQztBQUFBO0FBQUEsMkJBcTJCekI1SCxJQXIyQnlCLEVBczJCakM7QUFBQSxzQ0FEaUJrRyxJQUNqQjtBQURpQkEsU0FDakI7QUFBQTs7QUFDQ0EsV0FBT0EsUUFBUSxJQUFmOztBQUVBO0FBQ0EsUUFBSSxPQUFPLEtBQUt5QixNQUFMLENBQVkzSCxJQUFaLENBQVAsSUFBNEIsV0FBaEMsRUFBNkM7QUFDNUM7QUFDQTs7QUFFRCxTQUFLMkgsTUFBTCxDQUFZM0gsSUFBWixFQUFrQnFCLE9BQWxCLENBQTBCLFVBQVN1RyxRQUFULEVBQW1CO0FBQzVDLFNBQUcsT0FBT0EsUUFBUCxJQUFtQixVQUF0QixFQUFrQztBQUNqQyxZQUFNLElBQUlDLHdCQUFKLENBQTZCLDBFQUF3RUQsUUFBeEUseUNBQXdFQSxRQUF4RSxLQUFrRixhQUEvRyxDQUFOO0FBQ0E7O0FBRUQsWUFBT0EsNkNBQVkxQixJQUFaLEVBQVA7QUFDQSxLQU5EO0FBT0E7QUFyM0JnQzs7QUFBQTtBQUFBOztBQXczQmxDOzs7Ozs7OztBQXgzQmtDLEtBZzRCNUI0QixNQWg0QjRCO0FBQUE7QUFBQTtBQUFBOztBQUFBO0FBQUE7O0FBazRCakM7Ozs7Ozs7O0FBbDRCaUMsdUJBMDRCdEI5SCxJQTE0QnNCLEVBMDRCaEIrSCxLQTE0QmdCLEVBMDRCVEMsSUExNEJTLEVBMjRCakM7QUFDQyxRQUFJRCxNQUFNaEksV0FBTixDQUFrQkMsSUFBbEIsSUFBMkIsUUFBM0IsSUFBdUMrSCxNQUFNaEksV0FBTixDQUFrQkMsSUFBbEIsSUFBMEIsT0FBckUsRUFBOEU7QUFDN0UrSCxhQUFRVixLQUFLWSxTQUFMLENBQWVGLEtBQWYsQ0FBUjtBQUNBOztBQUVEQyxXQUFPQSxRQUFRLEVBQWY7O0FBRUcsUUFBSUUsZ0JBQUo7O0FBRUEsUUFBSUYsSUFBSixFQUFVO0FBQ04sU0FBSUcsT0FBTyxJQUFJQyxJQUFKLEVBQVg7QUFDQUQsVUFBS0UsT0FBTCxDQUFhRixLQUFLRyxPQUFMLEtBQWtCTixPQUFPLEVBQVAsR0FBWSxFQUFaLEdBQWlCLEVBQWpCLEdBQXNCLElBQXJEO0FBQ0FFLGVBQVUsZUFBZUMsS0FBS0ksV0FBTCxFQUF6QjtBQUNILEtBSkQsTUFJTztBQUNITCxlQUFVLEVBQVY7QUFDSDs7QUFFRG5HLGFBQVN5RyxNQUFULEdBQWtCeEksT0FBTyxHQUFQLEdBQWErSCxLQUFiLEdBQXFCRyxPQUFyQixHQUErQixVQUFqRDtBQUNIOztBQUVEOzs7Ozs7O0FBLzVCaUM7QUFBQTtBQUFBLHVCQXE2QnRCbEksSUFyNkJzQixFQXM2QmpDO0FBQ0ksUUFBSStCLFNBQVN5RyxNQUFULENBQWdCekosTUFBaEIsR0FBeUIsQ0FBN0IsRUFBZ0M7QUFDNUIsU0FBSTBKLFVBQVUxRyxTQUFTeUcsTUFBVCxDQUFnQmhILE9BQWhCLENBQXdCeEIsT0FBTyxHQUEvQixDQUFkOztBQUVBLFNBQUl5SSxXQUFXLENBQUMsQ0FBaEIsRUFBbUI7QUFDZkEsZ0JBQVVBLFVBQVV6SSxLQUFLakIsTUFBZixHQUF3QixDQUFsQztBQUNBLFVBQUkySixRQUFRM0csU0FBU3lHLE1BQVQsQ0FBZ0JoSCxPQUFoQixDQUF3QixHQUF4QixFQUE2QmlILE9BQTdCLENBQVo7O0FBRUEsVUFBSUMsU0FBUyxDQUFDLENBQWQsRUFBaUI7QUFDYkEsZUFBUTNHLFNBQVN5RyxNQUFULENBQWdCekosTUFBeEI7QUFDSDs7QUFFRCxhQUFPc0ksS0FBS0MsS0FBTCxDQUFXcUIsU0FBUzVHLFNBQVN5RyxNQUFULENBQWdCSSxTQUFoQixDQUEwQkgsT0FBMUIsRUFBbUNDLEtBQW5DLENBQVQsQ0FBWCxDQUFQO0FBQ0g7QUFDSjs7QUFFRCxXQUFPLEVBQVA7QUFDSDtBQXY3QmdDOztBQUFBO0FBQUE7O0FBMDdCbEMsS0FBSUcsbUJBQW1CLHlEQUF2Qjs7QUExN0JrQyxLQTQ3QjVCQyx3QkE1N0I0QjtBQUFBOztBQTg3QmpDLHNDQUNBO0FBQUEsT0FEWTVJLE9BQ1osdUVBRHNCLElBQ3RCOztBQUFBOztBQUNDQSxhQUFVQSxXQUFXMkksZ0JBQXJCOztBQURELG9KQUVPM0ksT0FGUDs7QUFHSSw4SkFBdUJBLE9BQXZCO0FBSEo7QUFJSTs7QUFuOEI2QjtBQUFBLEdBNDdCS1QsZ0JBNTdCTDs7QUFzOEJsQztBQUNBO0FBQ0E7Ozs7Ozs7QUFPQTs7Ozs7OztBQUtBLEtBQUlzSixvQkFBb0I7QUFDdkJsSSxXQUFTLE9BRGM7QUFFdkJtSSxlQUFhLE1BRlU7QUFHdkJDLGlCQUFlLEVBSFE7QUFJdkJDLFVBQVEsRUFKZTtBQUt2QkMsU0FBTyxFQUxnQjtBQU12QkMsU0FBTyxNQU5nQjtBQU92QkMsVUFBUSxNQVBlO0FBUXZCQyxhQUFXLFdBUlk7QUFTdkJDLFNBQU8sSUFUZ0I7QUFVdkJDLGVBQWEsUUFWVTtBQVd2QkMsVUFBUTtBQVhlLEVBQXhCOztBQWNBOzs7OztBQUtBLEtBQUlDLGtCQUFKOztBQUVBOzs7OztBQUtBLEtBQUlDLHVCQUFKOztBQUVBOzs7OztBQUtBLEtBQUlDLGFBQUo7O0FBRUE7Ozs7O0FBS0EsS0FBSUMsd0JBQUo7O0FBRUE7Ozs7O0FBS0EsS0FBSUMsaUJBQUo7O0FBbmdDa0MsS0FxZ0M1QkMsSUFyZ0M0QjtBQXVnQ2pDOzs7Ozs7Ozs7OztBQVdBLGdCQUFZQyxTQUFaLEVBQXVCQyxJQUF2QixFQUE2QkMsWUFBN0IsRUFDQTtBQUFBOztBQUNDUixlQUFZTSxTQUFaO0FBQ0FKLFVBQU9LLElBQVA7QUFDQU4sb0JBQWlCTyxZQUFqQjs7QUFFQSxRQUFLQyxjQUFMLEdBQXNCLEtBQUtDLG9CQUFMLEVBQXRCO0FBQ0EsUUFBS0MsSUFBTCxHQUFZQyxXQUFXdkcsSUFBWCxDQUFnQixJQUFoQixDQUFaO0FBQ0E7O0FBRUQ7Ozs7Ozs7O0FBNWhDaUM7QUFBQTtBQUFBLHlCQWtpQzNCb0IsUUFsaUMyQixFQW1pQ2pDO0FBQ0MsUUFBSSxRQUFPQSxRQUFQLHlDQUFPQSxRQUFQLE1BQW1CLFFBQXZCLEVBQWlDO0FBQ2hDLFdBQU0sSUFBSXhFLDBCQUFKLEVBQU47QUFDQTs7QUFFRCxTQUFLd0UsUUFBTCxHQUFnQjVCLE9BQU82QixNQUFQLENBQWMyRCxpQkFBZCxFQUFpQzVELFFBQWpDLENBQWhCOztBQUVBLFNBQUtvRixVQUFMLENBQWdCLEtBQUtwRixRQUFMLENBQWN0RSxPQUE5Qjs7QUFFQUQsUUFBSUssUUFBSixDQUFhLEtBQUtrSixjQUFsQixFQUFrQyxRQUFsQztBQUNBdkosUUFBSUssUUFBSixDQUFhLEtBQUtrSixjQUFsQixFQUFrQyxLQUFLaEYsUUFBTCxDQUFjOEQsYUFBaEQ7O0FBRUEsU0FBS3VCLFdBQUw7QUFDQSxTQUFLQyxrQkFBTDs7QUFFQSxRQUFJLEtBQUtDLE9BQUwsQ0FBYTVDLE9BQU82QyxHQUFQLENBQVcsS0FBS3hGLFFBQUwsQ0FBYzZELFdBQXpCLENBQWIsQ0FBSixFQUF5RDtBQUN4RCxVQUFLNEIsU0FBTDtBQUVBO0FBQ0Q7O0FBRUQ7Ozs7Ozs7QUF4akNpQztBQUFBO0FBQUEsMkJBOGpDekJDLElBOWpDeUIsRUErakNqQztBQUNDLFdBQU90SCxPQUFPdUgsV0FBUCxDQUFtQkQsSUFBbkIsQ0FBUDtBQUNBOztBQUVEOzs7Ozs7O0FBbmtDaUM7QUFBQTtBQUFBLCtCQTBrQ2pDO0FBQ0MsU0FBS0EsSUFBTCxHQUFZLEVBQVo7QUFDQSxTQUFLQSxJQUFMLENBQVVqSixFQUFWLEdBQWVqRCxJQUFJVSxNQUFKLENBQVcsRUFBWCxDQUFmO0FBQ0EsU0FBS3dMLElBQUwsQ0FBVUUsS0FBVixHQUFrQixFQUFsQjtBQUNBLFNBQUtGLElBQUwsQ0FBVUcsU0FBVixHQUFzQixFQUF0QjtBQUNBbEQsV0FBT21ELEdBQVAsQ0FBVyxLQUFLOUYsUUFBTCxDQUFjNkQsV0FBekIsRUFBc0MsS0FBSzZCLElBQTNDLEVBQWlELENBQWpEO0FBQ0E7O0FBRUQ7Ozs7Ozs7QUFsbENpQztBQUFBO0FBQUEsMkJBd2xDekJLLElBeGxDeUIsRUF5bENqQztBQUNDLFFBQUksUUFBT0EsSUFBUCx5Q0FBT0EsSUFBUCxNQUFlLFFBQW5CLEVBQTZCO0FBQzVCLFdBQU0sSUFBSXZLLDBCQUFKLENBQStCLHVFQUFzRXVLLElBQXRFLHlDQUFzRUEsSUFBdEUsS0FBNkUscUJBQTVHLENBQU47QUFDQTs7QUFFRCxRQUFJLENBQUVBLEtBQUtwSCxjQUFMLENBQW9CLElBQXBCLENBQU4sRUFBaUM7QUFDaEMsV0FBTSxJQUFJZ0Ysd0JBQUosRUFBTjtBQUNBOztBQUVELFNBQUsrQixJQUFMLEdBQVkvQyxPQUFPNkMsR0FBUCxDQUFXLEtBQUt4RixRQUFMLENBQWM2RCxXQUF6QixDQUFaOztBQUVBLFFBQUksQ0FBQ2tDLEtBQUtwSCxjQUFMLENBQW9CLFVBQXBCLENBQUwsRUFBc0M7QUFDckNvSCxVQUFLQyxRQUFMLEdBQWdCLENBQWhCO0FBQ0E7O0FBRUQsUUFBSWxNLFVBQUo7QUFDQSxRQUFJbU0sY0FBYyxLQUFsQjs7QUFFQSxTQUFLbk0sSUFBSSxDQUFULEVBQVlBLElBQUksS0FBSzRMLElBQUwsQ0FBVUUsS0FBVixDQUFnQmhNLE1BQWhDLEVBQXdDRSxHQUF4QyxFQUE2QztBQUM1QyxTQUFJLEtBQUs0TCxJQUFMLENBQVVFLEtBQVYsQ0FBZ0I5TCxDQUFoQixFQUFtQjJDLEVBQW5CLElBQXlCc0osS0FBS3RKLEVBQWxDLEVBQXNDO0FBQ3JDLFdBQUtpSixJQUFMLENBQVVFLEtBQVYsQ0FBZ0I5TCxDQUFoQixFQUFtQmtNLFFBQW5CO0FBQ0FDLG9CQUFjLElBQWQ7QUFDQTtBQUNBO0FBQ0Q7O0FBRUQsUUFBSSxDQUFFQSxXQUFOLEVBQW1CO0FBQ2xCLFVBQUtQLElBQUwsQ0FBVUUsS0FBVixDQUFnQnBHLElBQWhCLENBQXFCdUcsSUFBckI7QUFDQTs7QUFFRHBELFdBQU9tRCxHQUFQLENBQVcsS0FBSzlGLFFBQUwsQ0FBYzZELFdBQXpCLEVBQXNDLEtBQUs2QixJQUEzQyxFQUFpRCxDQUFqRDtBQUNBOztBQUVEOzs7Ozs7O0FBMW5DaUM7QUFBQTtBQUFBLGdDQWdvQ3BCSyxJQWhvQ29CLEVBaW9DakM7QUFDQyxRQUFJLFFBQU9BLElBQVAseUNBQU9BLElBQVAsTUFBZSxRQUFuQixFQUE2QjtBQUM1QixXQUFNLElBQUl2SywwQkFBSixDQUErQiw0RUFBMkV1SyxJQUEzRSx5Q0FBMkVBLElBQTNFLEtBQWtGLHFCQUFqSCxDQUFOO0FBQ0E7O0FBRUQsUUFBSSxDQUFFQSxLQUFLcEgsY0FBTCxDQUFvQixJQUFwQixDQUFOLEVBQWlDO0FBQ2hDLFdBQU0sSUFBSWdGLHdCQUFKLEVBQU47QUFDQTs7QUFFRCxTQUFLK0IsSUFBTCxHQUFZL0MsT0FBTzZDLEdBQVAsQ0FBVyxLQUFLeEYsUUFBTCxDQUFjNkQsV0FBekIsQ0FBWjs7QUFFQSxRQUFJL0osVUFBSjtBQUNBLFFBQUlvTSxtQkFBbUIsS0FBdkI7O0FBRUEsU0FBS3BNLElBQUksQ0FBVCxFQUFZQSxJQUFJLEtBQUs0TCxJQUFMLENBQVVHLFNBQVYsQ0FBb0JqTSxNQUFwQyxFQUE0Q0UsR0FBNUMsRUFBaUQ7QUFDaEQsU0FBSSxLQUFLNEwsSUFBTCxDQUFVRyxTQUFWLENBQW9CL0wsQ0FBcEIsRUFBdUIyQyxFQUF2QixJQUE2QnNKLEtBQUt0SixFQUF0QyxFQUEwQztBQUN6Q3lKLHlCQUFtQixJQUFuQjtBQUNBO0FBQ0E7QUFDRDs7QUFFRCxRQUFJLENBQUVBLGdCQUFOLEVBQXdCO0FBQ3ZCLFVBQUtSLElBQUwsQ0FBVUcsU0FBVixDQUFvQnJHLElBQXBCLENBQXlCdUcsSUFBekI7QUFDQTs7QUFFRHBELFdBQU9tRCxHQUFQLENBQVcsS0FBSzlGLFFBQUwsQ0FBYzZELFdBQXpCLEVBQXNDLEtBQUs2QixJQUEzQyxFQUFpRCxDQUFqRDtBQUNBOztBQUVEOzs7Ozs7O0FBN3BDaUM7QUFBQTtBQUFBLDhCQW1xQ3RCSyxJQW5xQ3NCLEVBb3FDakM7QUFDQyxRQUFJLFFBQU9BLElBQVAseUNBQU9BLElBQVAsTUFBZSxRQUFuQixFQUE2QjtBQUM1QixXQUFNLElBQUl2SywwQkFBSixDQUErQiwwRUFBeUV1SyxJQUF6RSx5Q0FBeUVBLElBQXpFLEtBQWdGLHFCQUEvRyxDQUFOO0FBQ0E7O0FBRUQsUUFBSSxDQUFFQSxLQUFLcEgsY0FBTCxDQUFvQixJQUFwQixDQUFOLEVBQWlDO0FBQ2hDLFdBQU0sSUFBSWdGLHdCQUFKLEVBQU47QUFDQTs7QUFFQSxTQUFLK0IsSUFBTCxHQUFZL0MsT0FBTzZDLEdBQVAsQ0FBVyxLQUFLeEYsUUFBTCxDQUFjNkQsV0FBekIsQ0FBWjs7QUFFQSxRQUFJL0osVUFBSjs7QUFFQSxTQUFLQSxJQUFJLENBQVQsRUFBWUEsSUFBSSxLQUFLNEwsSUFBTCxDQUFVRSxLQUFWLENBQWdCaE0sTUFBaEMsRUFBd0NFLEdBQXhDLEVBQTZDO0FBQzVDLFNBQUksS0FBSzRMLElBQUwsQ0FBVUUsS0FBVixDQUFnQjlMLENBQWhCLEVBQW1CMkMsRUFBbkIsSUFBeUJzSixLQUFLdEosRUFBbEMsRUFBc0M7QUFDckMsV0FBS2lKLElBQUwsQ0FBVUUsS0FBVixDQUFnQk8sTUFBaEIsQ0FBdUJyTSxDQUF2QixFQUEwQixDQUExQjtBQUNBO0FBQ0E7QUFDRDs7QUFFRDZJLFdBQU9tRCxHQUFQLENBQVcsS0FBSzlGLFFBQUwsQ0FBYzZELFdBQXpCLEVBQXNDLEtBQUs2QixJQUEzQyxFQUFpRCxDQUFqRDtBQUNEOztBQUVEOzs7Ozs7O0FBM3JDaUM7QUFBQTtBQUFBLGdDQWlzQ3BCRSxLQWpzQ29CLEVBa3NDakM7QUFDQ2pCLGFBQVN6SCxTQUFULEdBQXFCLEVBQXJCOztBQUVBLFFBQUlrSixRQUFRM0ssSUFBSXNCLGFBQUosQ0FBa0IsT0FBbEIsQ0FBWjs7QUFFQXRCLFFBQUlLLFFBQUosQ0FBYXNLLEtBQWIsRUFBb0IsZUFBcEI7O0FBRUEsU0FBSyxJQUFJdE0sSUFBSSxDQUFiLEVBQWdCQSxJQUFJOEwsTUFBTWhNLE1BQTFCLEVBQWtDRSxHQUFsQyxFQUF1Qzs7QUFFdEMsU0FBSXVNLGFBQWFULE1BQU05TCxDQUFOLENBQWpCOztBQUVBLFNBQUl3TSxNQUFLN0ssSUFBSXNCLGFBQUosQ0FBa0IsSUFBbEIsRUFBd0I7QUFDaENpSCxhQUFPO0FBRHlCLE1BQXhCLENBQVQ7O0FBSUE7QUFDQSxTQUFJdUMsTUFBSzlLLElBQUlzQixhQUFKLENBQWtCLElBQWxCLENBQVQ7O0FBRUF3SixTQUFHckosU0FBSCxHQUFlbUosV0FBV0wsUUFBWCxHQUFxQixHQUFwQztBQUNBTSxTQUFHbEosV0FBSCxDQUFlbUosR0FBZjs7QUFFQSxVQUFJLElBQUlDLFNBQVIsSUFBcUJILFVBQXJCLEVBQWlDO0FBQ2hDLGNBQU9HLFNBQVA7QUFFQyxZQUFLLE9BQUw7QUFDQ0QsY0FBSzlLLElBQUlzQixhQUFKLENBQWtCLElBQWxCLENBQUw7QUFDQSxZQUFJMEosUUFBUWhMLElBQUlzQixhQUFKLENBQWtCLEtBQWxCLEVBQXlCO0FBQ3BDMkosY0FBS0wsV0FBV0csU0FBWCxDQUQrQjtBQUVwQ3ZDLGdCQUFPLE1BRjZCO0FBR3BDQyxpQkFBUTtBQUg0QixTQUF6QixDQUFaOztBQU1BcUMsWUFBR25KLFdBQUgsQ0FBZXFKLEtBQWY7QUFDQTtBQUNELFlBQUssT0FBTDtBQUNDRixjQUFLOUssSUFBSXNCLGFBQUosQ0FBa0IsSUFBbEIsQ0FBTDtBQUNBLFlBQUk0SixPQUFPbEwsSUFBSXNCLGFBQUosQ0FBa0IsTUFBbEIsRUFBMEI7QUFDcEM2SixlQUFNLFVBQVVQLFdBQVdHLFNBQVgsRUFBc0JLO0FBREYsU0FBMUIsQ0FBWDtBQUdBTixZQUFHckosU0FBSCxHQUFlbUosV0FBV0csU0FBWCxFQUFzQk0sTUFBckM7QUFDQVAsWUFBR25KLFdBQUgsQ0FBZXVKLElBQWY7QUFDQTtBQUNELFlBQUssTUFBTDtBQUNDSixjQUFLOUssSUFBSXNCLGFBQUosQ0FBa0IsSUFBbEIsQ0FBTDtBQUNBd0osWUFBR3JKLFNBQUgsR0FBZW1KLFdBQVdHLFNBQVgsQ0FBZjtBQUNBO0FBdkJGOztBQTBCQUYsVUFBR2xKLFdBQUgsQ0FBZW1KLEdBQWY7QUFDQTs7QUFFREgsV0FBTWhKLFdBQU4sQ0FBa0JrSixHQUFsQjtBQUNBOztBQUVEO0FBQ0EsUUFBSUEsS0FBSzdLLElBQUlzQixhQUFKLENBQWtCLElBQWxCLENBQVQ7QUFDQSxRQUFJd0osS0FBSzlLLElBQUlzQixhQUFKLENBQWtCLElBQWxCLEVBQXdCO0FBQ2hDZ0ssY0FBUztBQUR1QixLQUF4QixDQUFUOztBQUlBLFFBQUlDLFdBQVd2TCxJQUFJc0IsYUFBSixDQUFrQixHQUFsQixFQUF1QjtBQUNyQ2lILFlBQU8saUJBRDhCO0FBRXJDaUQsV0FBTTtBQUYrQixLQUF2QixDQUFmOztBQUtBRCxhQUFTRSxPQUFULEdBQW1CLFVBQVNDLENBQVQsRUFBWTtBQUM5QkEsT0FBRUMsY0FBRjtBQUNBNUMsb0JBQWU2QyxPQUFmLENBQXVCLGVBQXZCO0FBQ0EsS0FIa0IsQ0FHakJDLElBSGlCLENBR1osSUFIWSxDQUFuQjs7QUFLQWYsT0FBR25KLFdBQUgsQ0FBZTRKLFFBQWY7QUFDQVYsT0FBR2xKLFdBQUgsQ0FBZW1KLEVBQWY7O0FBRUE7QUFDQUEsU0FBSzlLLElBQUlzQixhQUFKLENBQWtCLElBQWxCLEVBQXdCO0FBQzVCZ0ssY0FBUztBQURtQixLQUF4QixDQUFMOztBQUlBLFFBQUkvSCxRQUFRdkQsSUFBSXNCLGFBQUosQ0FBa0IsS0FBbEIsRUFBeUI7QUFDcENpSCxZQUFPLFlBRDZCO0FBRXBDaUQsV0FBTSxLQUFLakksS0FBTDtBQUY4QixLQUF6QixDQUFaOztBQUtBdUgsT0FBR25KLFdBQUgsQ0FBZTRCLEtBQWY7QUFDQXNILE9BQUdsSixXQUFILENBQWVtSixFQUFmOztBQUVBSCxVQUFNaEosV0FBTixDQUFrQmtKLEVBQWxCOztBQUVBM0IsYUFBU3ZILFdBQVQsQ0FBcUJnSixLQUFyQjtBQUNBOztBQUVEOzs7Ozs7O0FBN3hDaUM7QUFBQTtBQUFBLDJCQW95Q2pDO0FBQ0UsU0FBS1YsSUFBTCxHQUFZL0MsT0FBTzZDLEdBQVAsQ0FBVyxLQUFLeEYsUUFBTCxDQUFjNkQsV0FBekIsQ0FBWjs7QUFFQSxRQUFJN0UsUUFBUSxJQUFaO0FBQ0EsUUFBSWxGLFVBQUo7O0FBRUEsU0FBS0EsSUFBSSxDQUFULEVBQVlBLElBQUksS0FBSzRMLElBQUwsQ0FBVUUsS0FBVixDQUFnQmhNLE1BQWhDLEVBQXdDRSxHQUF4QyxFQUE2QztBQUM1Q2tGLGNBQVN1SSxXQUFXLEtBQUs3QixJQUFMLENBQVVFLEtBQVYsQ0FBZ0I5TCxDQUFoQixFQUFtQjBOLEtBQW5CLENBQXlCVixNQUFwQyxJQUE4QyxLQUFLcEIsSUFBTCxDQUFVRSxLQUFWLENBQWdCOUwsQ0FBaEIsRUFBbUJrTSxRQUExRTtBQUNBOztBQUVELFdBQU9oSCxNQUFNeUksT0FBTixDQUFjLENBQWQsQ0FBUDtBQUNEOztBQUVEOzs7Ozs7O0FBanpDaUM7QUFBQTtBQUFBLDhCQXV6Q3RCN0osUUF2ekNzQixFQXd6Q2pDO0FBQ0MsU0FBS2xDLE9BQUwsR0FBZUQsSUFBSWlNLElBQUosQ0FBUzlKLFFBQVQsQ0FBZjs7QUFFQSxRQUFJLEtBQUtsQyxPQUFULEVBQWtCO0FBQ2pCRCxTQUFJSyxRQUFKLENBQWEsS0FBS0osT0FBbEIsRUFBMkIsS0FBS3NFLFFBQUwsQ0FBY2dFLEtBQXpDO0FBQ0F2SSxTQUFJSyxRQUFKLENBQWEsS0FBS0osT0FBbEIsRUFBMkIsS0FBS3NFLFFBQUwsQ0FBY21FLFNBQXpDO0FBQ0EsVUFBS3pJLE9BQUwsQ0FBYTBCLFdBQWIsQ0FBeUIsS0FBSzhILElBQTlCO0FBQ0EsVUFBS3hKLE9BQUwsQ0FBYTBCLFdBQWIsQ0FBeUIsS0FBSzRILGNBQTlCO0FBQ0E7QUFDRDs7QUFFRDs7Ozs7O0FBbjBDaUM7QUFBQTtBQUFBLDBDQXkwQ2pDO0FBQ0MsUUFBSUEsaUJBQWlCdkosSUFBSXNCLGFBQUosQ0FBa0IsS0FBbEIsRUFBeUI7QUFDN0NOLFNBQUk7QUFEeUMsS0FBekIsQ0FBckI7O0FBSUFrSSxlQUFXbEosSUFBSXNCLGFBQUosQ0FBa0IsSUFBbEIsRUFBd0I7QUFDakNpSCxZQUFPO0FBRDBCLEtBQXhCLENBQVg7O0FBSUFnQixtQkFBZTVILFdBQWYsQ0FBMkJ1SCxRQUEzQjs7QUFFQSxXQUFPSyxjQUFQO0FBQ0E7O0FBRUQ7Ozs7OztBQXYxQ2lDO0FBQUE7QUFBQSxpQ0E2MUNqQztBQUNDLFFBQUl2SixJQUFJaU0sSUFBSixDQUFTLHVCQUFULENBQUosRUFBdUM7QUFDdEM7QUFDQTs7QUFFRCxRQUFJLEtBQUsxSCxRQUFMLENBQWNzRSxNQUFsQixFQUEwQjtBQUN6QjtBQUNBOztBQUVELFFBQUlxRCxXQUFZLEtBQUszSCxRQUFMLENBQWNvRSxLQUFmLEdBQXdCLE9BQXhCLEdBQWtDLFVBQWpEOztBQUVBLFFBQUkxSCxtQkFDRCxLQUFLc0QsUUFBTCxDQUFjdEUsT0FEYiw4QkFFVWlNLFFBRlYsc0dBUUQsS0FBSzNILFFBQUwsQ0FBY3RFLE9BUmIsK0JBU08sS0FBS3NFLFFBQUwsQ0FBY2lFLEtBVHJCLDJCQVVRLEtBQUtqRSxRQUFMLENBQWNrRSxNQVZ0Qiw0REFjRCxLQUFLbEUsUUFBTCxDQUFjdEUsT0FkYixvQ0FlTSxLQUFLc0UsUUFBTCxDQUFjcUUsV0FmcEIsNERBbUJELEtBQUtyRSxRQUFMLENBQWN0RSxPQW5CYiwyQkFvQkQsS0FBS3NFLFFBQUwsQ0FBY3RFLE9BcEJiLGlGQXlCRCxLQUFLc0UsUUFBTCxDQUFjdEUsT0F6QmIsMEJBMEJELEtBQUtzRSxRQUFMLENBQWN0RSxPQTFCYiwrRUErQkQsS0FBS3NFLFFBQUwsQ0FBY3RFLE9BL0JiLHlDQWdDVWlNLFFBaENWLDREQWtDaUIsS0FBSzNILFFBQUwsQ0FBY2tFLE1BbEMvQiw2UkE2Q0QsS0FBS2xFLFFBQUwsQ0FBY3RFLE9BN0NiLHFIQWtERCxLQUFLc0UsUUFBTCxDQUFjdEUsT0FsRGIsa0hBdURELEtBQUtzRSxRQUFMLENBQWN0RSxPQXZEYiwrSEE2REQsS0FBS3NFLFFBQUwsQ0FBY3RFLE9BN0RiLHdGQWlFRCxLQUFLc0UsUUFBTCxDQUFjdEUsT0FqRWIsNEZBcUVELEtBQUtzRSxRQUFMLENBQWN0RSxPQXJFYiwrRkEwRUQsS0FBS3NFLFFBQUwsQ0FBY3RFLE9BMUViLDRSQXVGRCxLQUFLc0UsUUFBTCxDQUFjdEUsT0F2RmIsNlFBQUo7O0FBb0dHRCxRQUFJbU0sUUFBSixDQUFhLHNCQUFiLEVBQXFDbEwsR0FBckM7QUFDSDs7QUFFRDs7Ozs7O0FBLzhDaUM7QUFBQTtBQUFBLG9DQXE5Q2pDO0FBQ0MsUUFBSWdJLGVBQUosRUFBb0I7QUFDbkIsWUFBT0EsZUFBUDtBQUNBOztBQUVELFFBQUlYLGVBQUo7O0FBRUEsUUFBSSxLQUFLL0QsUUFBTCxDQUFjK0QsTUFBbEIsRUFBMEI7QUFDekJBLGNBQVN0SSxJQUFJc0IsYUFBSixDQUFrQixLQUFsQixFQUF5QjtBQUNqQzJKLFdBQUssS0FBSzFHLFFBQUwsQ0FBYytELE1BRGM7QUFFakNDLGFBQU87QUFGMEIsTUFBekIsQ0FBVDtBQUlBLEtBTEQsTUFLTztBQUNORCxjQUFTOEQsY0FBVDtBQUNBOztBQUVEbkQsc0JBQWlCakosSUFBSXNCLGFBQUosQ0FBa0IsS0FBbEIsRUFBeUI7QUFDekNpSCxZQUFPO0FBRGtDLEtBQXpCLENBQWpCOztBQUlBVSxvQkFBZXRILFdBQWYsQ0FBMkIyRyxNQUEzQjs7QUFFQSxXQUFPVyxlQUFQO0FBQ0E7O0FBRUQ7Ozs7OztBQTkrQ2lDO0FBQUE7QUFBQSx5Q0FvL0NqQztBQUNDakosUUFBSUssUUFBSixDQUFhNkksUUFBYixFQUF1QixTQUF2QjtBQUNBLFNBQUtLLGNBQUwsQ0FBb0I1SCxXQUFwQixDQUFnQyxLQUFLc0gsY0FBTCxFQUFoQztBQUNBOztBQUVEOzs7Ozs7QUF6L0NpQztBQUFBO0FBQUEsd0NBKy9DakM7QUFDQyxRQUFJakosSUFBSWlNLElBQUosQ0FBUyxzQkFBVCxFQUFpQyxLQUFLMUMsY0FBdEMsQ0FBSixFQUEyRDtBQUMxRCxVQUFLQSxjQUFMLENBQW9CeEksV0FBcEIsQ0FBZ0MsS0FBS2tJLGNBQUwsRUFBaEM7QUFDQWpKLFNBQUlJLFdBQUosQ0FBZ0I4SSxRQUFoQixFQUEwQixTQUExQjtBQUNBO0FBQ0Q7O0FBRUQ7Ozs7OztBQXRnRGlDO0FBQUE7QUFBQSx1Q0E0Z0RqQztBQUNDLFNBQUttRCxtQkFBTDtBQUNBLFFBQUlsQyxRQUFRLEtBQUttQyxZQUFMLEVBQVo7QUFDQSxTQUFLQyxZQUFMLENBQWtCcEMsS0FBbEI7O0FBRUEsUUFBSXFDLFdBQVcsSUFBZjs7QUFFQUMsZUFBVyxZQUFXO0FBQ3JCRCxjQUFTRSxrQkFBVCxDQUE0QnZKLElBQTVCLENBQWlDcUosUUFBakM7QUFDQSxLQUZELEVBRUcsSUFGSDtBQUdBOztBQUVEOzs7Ozs7QUF4aERpQztBQUFBO0FBQUEsd0NBOGhEakM7QUFDQyxTQUFLL0MsSUFBTCxDQUFVZ0MsT0FBVixHQUFvQixVQUFTQyxDQUFULEVBQVk7QUFDL0JBLE9BQUVDLGNBQUY7QUFDQSxVQUFLZ0IsaUJBQUw7QUFDQSxLQUhtQixDQUdsQmQsSUFIa0IsQ0FHYixJQUhhLENBQXBCOztBQUtBOUMsbUJBQWU2RCxTQUFmLENBQXlCLG9CQUF6QixFQUErQyxVQUFTaEMsVUFBVCxFQUFxQjtBQUNuRSxVQUFLaUMsZUFBTDtBQUNBLFVBQUtDLE9BQUwsQ0FBYWxDLFVBQWI7QUFDQSxVQUFLbUMsaUJBQUw7QUFDQSxLQUo4QyxDQUk3Q2xCLElBSjZDLENBSXhDLElBSndDLENBQS9DOztBQU1BOUMsbUJBQWU2RCxTQUFmLENBQXlCLHdCQUF6QixFQUFtRCxVQUFTaEMsVUFBVCxFQUFxQjtBQUN2RSxVQUFLb0MsWUFBTCxDQUFrQnBDLFVBQWxCO0FBQ0EsS0FGa0QsQ0FFakRpQixJQUZpRCxDQUU1QyxJQUY0QyxDQUFuRDtBQUdBOztBQUVEOzs7Ozs7QUEvaURpQztBQUFBO0FBQUEscUNBcWpEakM7QUFDQyxRQUFJN0wsSUFBSWlOLFFBQUosQ0FBYSxLQUFLMUQsY0FBbEIsRUFBa0MsUUFBbEMsQ0FBSixFQUFpRDtBQUNoRCxVQUFLd0QsaUJBQUw7QUFDQTs7QUFFRC9NLFFBQUlrTixhQUFKLENBQWtCLEtBQUszRCxjQUF2QixFQUF1QyxRQUF2QyxFQUFpRCxRQUFqRDtBQUNBLFNBQUt3RCxpQkFBTDtBQUNBOztBQUVEOzs7Ozs7QUE5akRpQztBQUFBO0FBQUEsdUNBb2tEakM7QUFDQyxRQUFJSSxVQUFVbk4sSUFBSW9OLFdBQUosQ0FBZ0IsS0FBSzdELGNBQXJCLEVBQXFDLFFBQXJDLEVBQStDLFFBQS9DLENBQWQ7O0FBRUEsUUFBSTRELE9BQUosRUFBYTtBQUNaLFVBQUtKLGlCQUFMO0FBQ0E7QUFDRDs7QUFFRDs7Ozs7O0FBNWtEaUM7QUFBQTtBQUFBLGtDQWtsRGpDO0FBQ0MsUUFBSTlDLE9BQU8vQyxPQUFPNkMsR0FBUCxDQUFXLEtBQUt4RixRQUFMLENBQWM2RCxXQUF6QixDQUFYOztBQUVBLFdBQVE2QixJQUFELEdBQVNBLEtBQUtFLEtBQWQsR0FBc0IsRUFBN0I7QUFDQTs7QUFFRDs7Ozs7O0FBeGxEaUM7QUFBQTtBQUFBLDBCQThsRGpDO0FBQ0MsU0FBS2xLLE9BQUwsQ0FBYW9OLEtBQWIsQ0FBbUJDLE9BQW5CLEdBQTZCLE1BQTdCO0FBQ0E7QUFobURnQzs7QUFBQTtBQUFBOztBQW1tRGxDOzs7Ozs7O0FBS0EsVUFBU0MsS0FBVCxDQUFlQyxLQUFmLEVBQXNCO0FBQ3JCQSxRQUFNN0IsY0FBTjtBQUNBM0wsTUFBSWtOLGFBQUosQ0FBa0IsS0FBSzNELGNBQXZCLEVBQXVDLFFBQXZDLEVBQWlELFFBQWpEO0FBQ0E7O0FBRUQ7Ozs7O0FBS0EsVUFBU0csVUFBVCxHQUFzQjtBQUNyQixNQUFJK0QsTUFBTXRNLFNBQVN1TSxlQUFULENBQXlCLDRCQUF6QixFQUF1RCxLQUF2RCxDQUFWO0FBQ0EsTUFBSUMsSUFBSXhNLFNBQVN1TSxlQUFULENBQXlCLDRCQUF6QixFQUF1RCxHQUF2RCxDQUFSO0FBQ0EsTUFBSUUsT0FBT3pNLFNBQVN1TSxlQUFULENBQXlCLDRCQUF6QixFQUF1RCxNQUF2RCxDQUFYOztBQUVBRCxNQUFJL0wsWUFBSixDQUFpQixTQUFqQixFQUE0QixLQUE1QjtBQUNBK0wsTUFBSS9MLFlBQUosQ0FBaUIsT0FBakIsRUFBMEIsNEJBQTFCO0FBQ0ErTCxNQUFJL0wsWUFBSixDQUFpQixhQUFqQixFQUFnQyw4QkFBaEM7QUFDQStMLE1BQUkvTCxZQUFKLENBQWlCLEdBQWpCLEVBQXNCLEtBQXRCO0FBQ0ErTCxNQUFJL0wsWUFBSixDQUFpQixHQUFqQixFQUFzQixLQUF0QjtBQUNBK0wsTUFBSS9MLFlBQUosQ0FBaUIsT0FBakIsRUFBMEIsTUFBMUI7QUFDQStMLE1BQUkvTCxZQUFKLENBQWlCLFFBQWpCLEVBQTJCLE1BQTNCO0FBQ0ErTCxNQUFJL0wsWUFBSixDQUFpQixTQUFqQixFQUE0QixxQkFBNUI7QUFDQStMLE1BQUkvTCxZQUFKLENBQWlCLE9BQWpCLEVBQTBCLDRDQUExQjtBQUNBK0wsTUFBSS9MLFlBQUosQ0FBaUIsV0FBakIsRUFBOEIsVUFBOUI7O0FBRUFrTSxPQUFLbE0sWUFBTCxDQUFrQixHQUFsQixFQUF1QiwwcERBQXZCOztBQUVBaU0sSUFBRWhNLFdBQUYsQ0FBY2lNLElBQWQ7QUFDQUgsTUFBSTlMLFdBQUosQ0FBZ0JnTSxDQUFoQjs7QUFFQSxNQUFLRSxNQUFNN04sSUFBSXNCLGFBQUosQ0FBa0IsS0FBbEIsRUFBeUI7QUFDbkNOLE9BQUk7QUFEK0IsR0FBekIsQ0FBWDs7QUFJQTZNLE1BQUlsTSxXQUFKLENBQWdCOEwsR0FBaEI7O0FBRUEsU0FBT0ksR0FBUDtBQUNBOztBQUVEOzs7OztBQUtBLFVBQVN6QixZQUFULEdBQXdCO0FBQ3ZCLE1BQUlxQixNQUFNdE0sU0FBU3VNLGVBQVQsQ0FBeUIsNEJBQXpCLEVBQXVELEtBQXZELENBQVY7QUFDQSxNQUFJSSxRQUFRLEVBQVo7QUFDQSxNQUFJQyxTQUFTLEVBQWI7QUFDQSxNQUFJQyxhQUFhLEVBQWpCO0FBQ0EsTUFBSUMsYUFBYSxFQUFqQjs7QUFFQVIsTUFBSS9MLFlBQUosQ0FBaUIsT0FBakIsRUFBMEIsYUFBMUI7QUFDQStMLE1BQUkvTCxZQUFKLENBQWlCLE9BQWpCLEVBQTBCLE9BQTFCO0FBQ0ErTCxNQUFJL0wsWUFBSixDQUFpQixRQUFqQixFQUEyQixPQUEzQjtBQUNBK0wsTUFBSS9MLFlBQUosQ0FBaUIsT0FBakIsRUFBMEIsNEJBQTFCO0FBQ0ErTCxNQUFJL0wsWUFBSixDQUFpQixhQUFqQixFQUFnQyw4QkFBaEM7QUFDQStMLE1BQUkvTCxZQUFKLENBQWlCLFNBQWpCLEVBQTRCLGFBQTVCO0FBQ0ErTCxNQUFJL0wsWUFBSixDQUFpQixxQkFBakIsRUFBd0MsVUFBeEM7QUFDQStMLE1BQUkvTCxZQUFKLENBQWlCLE9BQWpCLEVBQTBCLG1CQUExQjs7QUFFQSxNQUFJd00sV0FBVyxDQUFmOztBQUVBLE9BQUssSUFBSTdQLElBQUksQ0FBYixFQUFnQkEsSUFBSXlQLEtBQXBCLEVBQTJCelAsR0FBM0IsRUFBZ0M7QUFDL0IsT0FBSThQLFFBQVFoTixTQUFTdU0sZUFBVCxDQUF5Qiw0QkFBekIsRUFBdUQsR0FBdkQsQ0FBWjtBQUNBUyxTQUFNek0sWUFBTixDQUFtQixXQUFuQixFQUFnQyxZQUFZd00sUUFBWixHQUF1QixTQUF2RDtBQUNBQSxlQUFZLEVBQVo7QUFDQUgsVUFBT2hLLElBQVAsQ0FBWW9LLEtBQVo7QUFDQTs7QUFFRCxPQUFLLElBQUk5UCxJQUFJLENBQWIsRUFBZ0JBLElBQUl5UCxLQUFwQixFQUEyQnpQLEdBQTNCLEVBQWdDO0FBQy9CLE9BQUkrUCxZQUFZak4sU0FBU3VNLGVBQVQsQ0FBeUIsNEJBQXpCLEVBQXVELE1BQXZELENBQWhCO0FBQ0FVLGFBQVUxTSxZQUFWLENBQXVCLEdBQXZCLEVBQTRCLElBQTVCO0FBQ0EwTSxhQUFVMU0sWUFBVixDQUF1QixHQUF2QixFQUE0QixJQUE1QjtBQUNBME0sYUFBVTFNLFlBQVYsQ0FBdUIsSUFBdkIsRUFBNkIsS0FBN0I7QUFDQTBNLGFBQVUxTSxZQUFWLENBQXVCLElBQXZCLEVBQTZCLEtBQTdCO0FBQ0EwTSxhQUFVMU0sWUFBVixDQUF1QixPQUF2QixFQUFnQyxHQUFoQztBQUNBME0sYUFBVTFNLFlBQVYsQ0FBdUIsUUFBdkIsRUFBaUMsSUFBakM7QUFDQTBNLGFBQVUxTSxZQUFWLENBQXVCLE1BQXZCLEVBQStCLFNBQS9CO0FBQ0FzTSxjQUFXakssSUFBWCxDQUFnQnFLLFNBQWhCO0FBQ0E7O0FBRUQsTUFBSUMsUUFBUSxPQUFPLEVBQW5COztBQUVBLE9BQUssSUFBSWhRLElBQUksQ0FBYixFQUFnQkEsSUFBSXlQLEtBQXBCLEVBQTJCelAsR0FBM0IsRUFBZ0M7QUFDL0IsT0FBSWlRLFVBQVVuTixTQUFTdU0sZUFBVCxDQUF5Qiw0QkFBekIsRUFBdUQsU0FBdkQsQ0FBZDtBQUNBWSxXQUFRNU0sWUFBUixDQUFxQixlQUFyQixFQUFzQyxTQUF0QztBQUNBNE0sV0FBUTVNLFlBQVIsQ0FBcUIsUUFBckIsRUFBK0IsS0FBL0I7QUFDQTRNLFdBQVE1TSxZQUFSLENBQXFCLE9BQXJCLEVBQThCLEtBQTlCO0FBQ0E0TSxXQUFRNU0sWUFBUixDQUFxQixLQUFyQixFQUE0QixJQUE1QjtBQUNBNE0sV0FBUTVNLFlBQVIsQ0FBcUIsT0FBckIsRUFBOEIyTSxNQUFNckMsT0FBTixDQUFjLENBQWQsSUFBbUIsR0FBakQ7QUFDQXNDLFdBQVE1TSxZQUFSLENBQXFCLGFBQXJCLEVBQW9DLFlBQXBDO0FBQ0F1TSxjQUFXbEssSUFBWCxDQUFnQnVLLE9BQWhCO0FBQ0FELFlBQVMsSUFBVDtBQUNBOztBQUVELE9BQUssSUFBSWhRLElBQUksQ0FBYixFQUFnQkEsSUFBSTBQLE9BQU81UCxNQUEzQixFQUFtQ0UsR0FBbkMsRUFBd0M7QUFDdkMsT0FBSThQLFNBQVFKLE9BQU8xUCxDQUFQLENBQVo7QUFDQSxPQUFJK1AsYUFBWUosV0FBVzNQLENBQVgsQ0FBaEI7QUFDQSxPQUFJaVEsV0FBVUwsV0FBVzVQLENBQVgsQ0FBZDtBQUNBK1AsY0FBVXpNLFdBQVYsQ0FBc0IyTSxRQUF0QjtBQUNBSCxVQUFNeE0sV0FBTixDQUFrQnlNLFVBQWxCO0FBQ0FYLE9BQUk5TCxXQUFKLENBQWdCd00sTUFBaEI7QUFDQTs7QUFFRG5PLE1BQUlLLFFBQUosQ0FBYW9OLEdBQWIsRUFBa0IsYUFBbEI7O0FBRUEsU0FBT0EsR0FBUDtBQUNBOztBQUVEOzs7Ozs7O0FBT0E7OztBQUdBLEtBQUljLG9CQUFvQjtBQUN2QnRPLFdBQVMsU0FEYztBQUV2QnNJLFNBQU8sRUFGZ0I7QUFHdkJDLFNBQU8sRUFIZ0I7QUFJdkJDLFVBQVEsRUFKZTtBQUt2QkksVUFBUTtBQUxlLEVBQXhCOztBQVFBOzs7OztBQUtBLEtBQUkyRixvQkFBSjs7QUE3dURrQyxLQSt1RDVCQyxNQS91RDRCO0FBaXZEakM7Ozs7OztBQU1BLGtCQUFZckYsU0FBWixFQUNBO0FBQUE7O0FBQ0NvRixpQkFBY3BGLFNBQWQ7QUFDQTs7QUFFRDs7Ozs7Ozs7QUE1dkRpQztBQUFBO0FBQUEseUJBa3dEM0I3RSxRQWx3RDJCLEVBbXdEakM7QUFDQyxRQUFHLFFBQU9BLFFBQVAseUNBQU9BLFFBQVAsTUFBbUIsUUFBdEIsRUFBZ0M7QUFDL0IsV0FBTSxJQUFJeEUsMEJBQUosRUFBTjtBQUNBOztBQUVELFNBQUt3RSxRQUFMLEdBQWdCNUIsT0FBTzZCLE1BQVAsQ0FBYytKLGlCQUFkLEVBQWlDaEssUUFBakMsQ0FBaEI7O0FBRUFwRCxhQUFTdU4sZ0JBQVQsQ0FBMEIsa0JBQTFCLEVBQThDLFlBQVc7O0FBRXhELFVBQUsvRSxVQUFMLENBQWdCLEtBQUtwRixRQUFMLENBQWN0RSxPQUE5Qjs7QUFFQSxVQUFLMkosV0FBTDtBQUNBLEtBTDZDLENBSzVDaUMsSUFMNEMsQ0FLdkMsSUFMdUMsQ0FBOUM7QUFNQTs7QUFFRDs7Ozs7OztBQWx4RGlDO0FBQUE7QUFBQSw4QkF3eER0QjFKLFFBeHhEc0IsRUF5eERqQztBQUNDLFNBQUtsQyxPQUFMLEdBQWVELElBQUlpTSxJQUFKLENBQVM5SixRQUFULENBQWY7O0FBRUFuQyxRQUFJSyxRQUFKLENBQWEsS0FBS0osT0FBbEIsRUFBMkIsS0FBS3NFLFFBQUwsQ0FBY2dFLEtBQXpDO0FBQ0E7O0FBRUQ7Ozs7QUEveERpQztBQUFBO0FBQUEsaUNBbXlEakM7QUFDQyxRQUFJdkksSUFBSWlNLElBQUosQ0FBUyx5QkFBVCxDQUFKLEVBQXlDO0FBQ3hDO0FBQ0E7O0FBRUQsUUFBSSxLQUFLMUgsUUFBTCxDQUFjc0UsTUFBbEIsRUFBMEI7QUFDekI7QUFDQTs7QUFFRCxRQUFJTCxRQUFTLEtBQUtqRSxRQUFMLENBQWNpRSxLQUFmLEdBQXdCLFdBQVcsS0FBS2pFLFFBQUwsQ0FBY2lFLEtBQXpCLEdBQWlDLEdBQXpELEdBQStELEVBQTNFO0FBQ0EsUUFBSW1HLFdBQVcsS0FBS3BLLFFBQUwsQ0FBY3FLLFNBQWQsSUFBMkIsT0FBMUM7QUFDQSxRQUFJbkcsU0FBUyxLQUFLbEUsUUFBTCxDQUFja0UsTUFBZCxJQUF3QixNQUFyQzs7QUFFQSxRQUFJeEgsbUJBQ0QsS0FBS3NELFFBQUwsQ0FBY3RFLE9BRGIsK0dBS0F1SSxLQUxBLDZCQU1XbUcsUUFOWCwyQkFPUWxHLE1BUFIsdUdBQUo7O0FBZUd6SSxRQUFJbU0sUUFBSixDQUFhLHdCQUFiLEVBQXVDbEwsR0FBdkM7QUFDSDs7QUFFRDs7Ozs7O0FBbDBEaUM7QUFBQTtBQUFBLDBCQXcwRGpDO0FBQ0MsU0FBS2hCLE9BQUwsQ0FBYW9OLEtBQWIsQ0FBbUJDLE9BQW5CLEdBQTZCLE1BQTdCO0FBQ0E7QUExMERnQzs7QUFBQTtBQUFBOztBQUFBLEtBNjBENUJ1QixHQTcwRDRCO0FBQUE7QUFBQTtBQUFBOztBQUFBO0FBQUE7QUFBQSxtQ0ErMERUMU0sUUEvMERTLEVBKzBEQzJNLE9BLzBERCxFQSswRFVDLE9BLzBEVixFQWcxRGhDO0FBQ0csUUFBSTNNLFVBQVVwQyxJQUFJaU0sSUFBSixDQUFTOUosUUFBVCxDQUFkOztBQUVBQyxZQUFRWCxTQUFSLEdBQW9CcU4sT0FBcEI7QUFDQSxRQUFJRSxRQUFRaFAsSUFBSWlNLElBQUosQ0FBUyxPQUFULEVBQWtCN0osT0FBbEIsQ0FBWjtBQUNBakIsYUFBUzZOLEtBQVQsR0FBaUJBLE1BQU12TixTQUF2QjtBQUNBMUMsV0FBT2tRLE9BQVAsQ0FBZUMsU0FBZixDQUF5QixFQUFDLFFBQU9KLE9BQVIsRUFBZ0IsYUFBYUUsTUFBTXZOLFNBQW5DLEVBQXpCLEVBQXdFLEVBQXhFLEVBQTRFc04sT0FBNUU7O0FBRUZoUSxXQUFPb1EsVUFBUCxHQUFvQixVQUFTekQsQ0FBVCxFQUFZO0FBQzdCLFNBQUlBLEVBQUUwRCxLQUFOLEVBQWE7QUFDVGhOLGNBQVFYLFNBQVIsR0FBb0JpSyxFQUFFMEQsS0FBRixDQUFRakUsSUFBNUI7QUFDQWhLLGVBQVM2TixLQUFULEdBQWlCdEQsRUFBRTBELEtBQUYsQ0FBUUMsU0FBekI7QUFDSDtBQUNKLEtBTEE7QUFNQTs7QUFFRjs7Ozs7Ozs7OztBQWgyRGlDO0FBQUE7QUFBQSw2Q0F5MkRBOUosR0F6MkRBLEVBeTJES2EsR0F6MkRMLEVBeTJEVWUsS0F6MkRWLEVBMDJEakM7QUFBQSxRQURrRG1JLFNBQ2xELHVFQUQ4RCxHQUM5RDs7QUFDQyxRQUFJQyxTQUFTLElBQUlDLE1BQUosQ0FBVyxXQUFXcEosR0FBWCxHQUFpQmtKLFNBQWpCLEdBQTZCLFVBQXhDLEVBQW9ELEdBQXBELENBQWI7QUFDQSxRQUFJRyxnQkFBZ0JsSyxJQUFJM0UsT0FBSixDQUFZLEdBQVosTUFBcUIsQ0FBQyxDQUF0QixHQUEwQixHQUExQixHQUFnQyxHQUFwRDs7QUFFQSxRQUFJMkUsSUFBSW1LLEtBQUosQ0FBVUgsTUFBVixDQUFKLEVBQXVCO0FBQ3RCLFlBQU9oSyxJQUFJdEgsT0FBSixDQUFZc1IsTUFBWixFQUFvQixPQUFPbkosR0FBUCxHQUFha0osU0FBYixHQUF5Qm5JLEtBQXpCLEdBQWlDLElBQXJELENBQVA7QUFDQSxLQUZELE1BRU87QUFDSCxZQUFPNUIsTUFBTWtLLGFBQU4sR0FBc0JySixHQUF0QixHQUE0QmtKLFNBQTVCLEdBQXdDbkksS0FBL0M7QUFDSDtBQUNEOztBQUVEOzs7Ozs7Ozs7QUFyM0RpQztBQUFBO0FBQUEsbUNBNjNEVndJLFlBNzNEVSxFQTYzRElDLGNBNzNESixFQTgzRGpDO0FBQUEsUUFEcUROLFNBQ3JELHVFQURpRSxHQUNqRTs7QUFDQ00scUJBQWtCQSxrQkFBa0IsS0FBSzNKLFdBQUwsR0FBbUIwSixZQUFuQixDQUFwQztBQUNBLFFBQUlFLGVBQWUsS0FBS0MseUJBQUwsQ0FBK0IvUSxPQUFPZ1IsUUFBUCxDQUFnQkMsSUFBL0MsRUFBcURMLFlBQXJELEVBQW1FQyxjQUFuRSxFQUFtRk4sU0FBbkYsQ0FBbkI7QUFDQXZRLFdBQU9rUSxPQUFQLENBQWVnQixZQUFmLENBQTRCLEVBQTVCLEVBQWdDLEVBQWhDLEVBQW9DSixZQUFwQztBQUNBOztBQUVEOzs7Ozs7O0FBcDREaUM7QUFBQTtBQUFBLDBCQTA0RG5CdEssR0ExNERtQixFQTI0RGpDO0FBQ0N4RyxXQUFPa1EsT0FBUCxDQUFlZ0IsWUFBZixDQUE0QixFQUE1QixFQUFnQyxFQUFoQyxFQUFvQzFLLEdBQXBDO0FBQ0E7O0FBRUQ7Ozs7OztBQS80RGlDO0FBQUE7QUFBQSxpQ0FxNURqQztBQUNDLFFBQUkySyxPQUFPLEVBQVg7QUFDQSxRQUFJQyxRQUFRcFIsT0FBT2dSLFFBQVAsQ0FBZ0JDLElBQWhCLENBQXFCL1IsT0FBckIsQ0FBNkIseUJBQTdCLEVBQXdELFVBQVNtUyxDQUFULEVBQVloSyxHQUFaLEVBQWlCZSxLQUFqQixFQUF3QjtBQUMzRitJLFVBQUs5SixHQUFMLElBQVllLEtBQVo7QUFDQSxLQUZXLENBQVo7O0FBSUEsV0FBTytJLElBQVA7QUFDQTtBQTU1RGdDOztBQUFBO0FBQUE7O0FBaTZEbEM7QUFDQTtBQUNBOzs7Ozs7O0FBT0E7Ozs7Ozs7QUFLQSxLQUFJRyxvQkFBb0I7QUFDdkJwUSxXQUFTLFdBRGM7QUFFdkI0SSxVQUFRO0FBRmUsRUFBeEI7O0FBS0E7Ozs7O0FBS0EsS0FBSXlILG9CQUFKOztBQUVBOzs7OztBQUtBLEtBQUlDLHVCQUFKOztBQUVBOzs7OztBQUtBLEtBQUlDLGVBQUo7O0FBdjhEa0MsS0EwOEQ1QkMsUUExOEQ0QjtBQTQ4RGpDOzs7Ozs7Ozs7OztBQVdBLG9CQUFZckgsU0FBWixFQUF1QkMsSUFBdkIsRUFBNkJDLFlBQTdCLEVBQ0E7QUFBQTs7QUFDQ2dILGlCQUFjbEgsU0FBZDtBQUNBb0gsWUFBU25ILElBQVQ7QUFDQWtILG9CQUFpQmpILFlBQWpCOztBQUVBaUgsa0JBQWUzRCxTQUFmLENBQXlCLGVBQXpCLEVBQTBDLFlBQVc7QUFDcEQsU0FBSzhELFNBQUw7QUFDQSxTQUFLQyxPQUFMO0FBQ0EsU0FBS0MsSUFBTDtBQUNBLElBSnlDLENBSXhDL0UsSUFKd0MsQ0FJbkMsSUFKbUMsQ0FBMUM7QUFLQTs7QUFFRDs7Ozs7Ozs7QUFwK0RpQztBQUFBO0FBQUEseUJBMCtEM0J0SCxRQTErRDJCLEVBMitEakM7QUFDQyxRQUFJLFFBQU9BLFFBQVAseUNBQU9BLFFBQVAsTUFBbUIsUUFBdkIsRUFBaUM7QUFDaEMsV0FBTSxJQUFJeEUsMEJBQUosRUFBTjtBQUNBOztBQUVELFNBQUt3RSxRQUFMLEdBQWdCNUIsT0FBTzZCLE1BQVAsQ0FBYzZMLGlCQUFkLEVBQWlDOUwsUUFBakMsQ0FBaEI7O0FBRUFwRCxhQUFTdU4sZ0JBQVQsQ0FBMEIsa0JBQTFCLEVBQThDLFlBQVc7O0FBRXhELFVBQUsvRSxVQUFMLENBQWdCLEtBQUtwRixRQUFMLENBQWN0RSxPQUE5QjtBQUNBLFVBQUs0USxJQUFMO0FBQ0EsVUFBS2pILFdBQUw7QUFDQSxLQUw2QyxDQUs1Q2lDLElBTDRDLENBS3ZDLElBTHVDLENBQTlDO0FBTUE7O0FBRUQ7Ozs7Ozs7QUExL0RpQztBQUFBO0FBQUEsOEJBZ2dFdEIxSixRQWhnRXNCLEVBaWdFakM7QUFDQyxTQUFLbEMsT0FBTCxHQUFlRCxJQUFJaU0sSUFBSixDQUFTOUosUUFBVCxDQUFmOztBQUVBLFFBQUksS0FBS2xDLE9BQVQsRUFBa0I7QUFDakJELFNBQUlLLFFBQUosQ0FBYSxLQUFLSixPQUFsQixFQUEyQixLQUFLc0UsUUFBTCxDQUFjZ0UsS0FBekM7QUFDQTtBQUNEOztBQUVEOzs7Ozs7QUF6Z0VpQztBQUFBO0FBQUEsK0JBK2dFakM7QUFDQ3NHLFFBQUlpQyxNQUFKLENBQVcsVUFBWDtBQUNBOztBQUVEOzs7Ozs7QUFuaEVpQztBQUFBO0FBQUEsaUNBeWhFakM7QUFDQyxRQUFJOVEsSUFBSWlNLElBQUosQ0FBUywyQkFBVCxDQUFKLEVBQTJDO0FBQzFDO0FBQ0E7O0FBRUQsUUFBSSxLQUFLMUgsUUFBTCxDQUFjc0UsTUFBbEIsRUFBMEI7QUFDekI7QUFDQTs7QUFFRCxRQUFJcUQsV0FBWSxLQUFLM0gsUUFBTCxDQUFjb0UsS0FBZixHQUF3QixPQUF4QixHQUFrQyxVQUFqRDs7QUFFQSxRQUFJMUgsbUJBQ0QsS0FBS3NELFFBQUwsQ0FBY3RFLE9BRGIsNEdBQUo7O0FBUUdELFFBQUltTSxRQUFKLENBQWEsMEJBQWIsRUFBeUNsTCxHQUF6QztBQUNIOztBQUVEOzs7Ozs7QUEvaUVpQztBQUFBO0FBQUEsNkJBcWpFakM7QUFDQ3FQLGdCQUFZUyxVQUFaLENBQXVCQyxNQUF2QixDQUE4QnZRLE9BQTlCLENBQXNDLFVBQVN3USxTQUFULEVBQW9CO0FBQ3pELFNBQUlBLFVBQVU5UixXQUFWLENBQXNCQyxJQUF0QixJQUE4QixVQUFsQyxFQUE4QztBQUM3QzZSLGdCQUFVSixJQUFWO0FBQ0E7QUFDRCxLQUpEO0FBS0E7O0FBRUQ7Ozs7OztBQTdqRWlDO0FBQUE7QUFBQSwwQkFta0VqQztBQUNDLFNBQUs1USxPQUFMLENBQWFvTixLQUFiLENBQW1CQyxPQUFuQixHQUE2QixNQUE3QjtBQUNBOztBQUVEOzs7Ozs7QUF2a0VpQztBQUFBO0FBQUEsMEJBNmtFakM7QUFDQyxTQUFLck4sT0FBTCxDQUFhb04sS0FBYixDQUFtQkMsT0FBbkIsR0FBNkIsT0FBN0I7QUFDQTtBQS9rRWdDOztBQUFBO0FBQUE7O0FBa2xFbEM7Ozs7Ozs7QUFRQTs7Ozs7OztBQUtBLEtBQUk0RCxvQkFBb0I7QUFDdkJqUixXQUFTLFdBRGM7QUFFdkJzSSxTQUFPLEVBRmdCO0FBR3ZCNEksY0FBWSxFQUhXO0FBSXZCQyxvQkFBa0IsaUJBSks7QUFLdkJDLHlCQUF1QixnQkFMQTtBQU12QjdJLFNBQU8sT0FOZ0I7QUFPdkJDLFVBQVEsT0FQZTtBQVF2Qm1DLGNBQVksQ0FBQyxNQUFELEVBQVMsT0FBVCxFQUFrQixjQUFsQixFQUFrQyxPQUFsQyxDQVJXO0FBU3ZCckYsT0FBSyxjQVRrQjtBQVV2QnNELFVBQVEsS0FWZTtBQVd2QnVDLFlBQVU7QUFYYSxFQUF4Qjs7QUFjQTs7Ozs7QUFLQSxLQUFJa0csb0JBQUo7O0FBRUE7Ozs7O0FBS0EsS0FBSUMsdUJBQUo7O0FBRUE7Ozs7O0FBS0EsS0FBSUMsZUFBSjs7QUFFQTs7Ozs7O0FBTUEsS0FBSUMsd0JBQUo7O0FBeG9Fa0MsS0Ewb0U1QkMsUUExb0U0QjtBQTRvRWpDOzs7Ozs7O0FBT0Esb0JBQVl0SSxTQUFaLEVBQXVCQyxJQUF2QixFQUE2QkMsWUFBN0IsRUFDQTtBQUFBOztBQUNDZ0ksaUJBQWNsSSxTQUFkO0FBQ0FvSSxZQUFTbkksSUFBVDtBQUNBa0ksb0JBQWlCakksWUFBakI7QUFDQW1JLHFCQUFrQixFQUFsQjtBQUNBOztBQUVEOzs7Ozs7OztBQTNwRWlDO0FBQUE7QUFBQSx5QkFpcUUzQmxOLFFBanFFMkIsRUFrcUVqQztBQUNDLFFBQUksUUFBT0EsUUFBUCx5Q0FBT0EsUUFBUCxNQUFtQixRQUF2QixFQUFpQztBQUNoQyxXQUFNLElBQUl4RSwwQkFBSixFQUFOO0FBQ0E7O0FBRUQsU0FBS3dFLFFBQUwsR0FBZ0I1QixPQUFPNkIsTUFBUCxDQUFjME0saUJBQWQsRUFBaUMzTSxRQUFqQyxDQUFoQjtBQUNBLFNBQUtvTixVQUFMLEdBQWtCLElBQWxCOztBQUVBeFEsYUFBU3VOLGdCQUFULENBQTBCLGtCQUExQixFQUE4QyxZQUFXOztBQUV4RCxVQUFLL0UsVUFBTCxDQUFnQixLQUFLcEYsUUFBTCxDQUFjdEUsT0FBOUI7O0FBRUEsVUFBSzJKLFdBQUw7O0FBRUEsVUFBS2dJLFlBQUwsQ0FBa0IsQ0FBbEI7QUFDQSxLQVA2QyxDQU81Qy9GLElBUDRDLENBT3ZDLElBUHVDLENBQTlDO0FBUUE7O0FBRUQ7Ozs7Ozs7QUFwckVpQztBQUFBO0FBQUEsa0NBMnJFakM7QUFBQSxRQURhZ0csVUFDYix1RUFEMEIsQ0FDMUI7O0FBQ0MsUUFBSVAsWUFBWVEsVUFBWixJQUEwQlIsWUFBWVEsVUFBWixDQUF1QmQsTUFBckQsRUFBNkQ7O0FBRTVELFNBQUllLFFBQVFULFlBQVlRLFVBQVosQ0FBdUJ2TixRQUF2QixDQUFnQ3lOLFFBQTVDOztBQUVBLGFBQU9WLFlBQVlRLFVBQVosQ0FBdUJ2TixRQUF2QixDQUFnQzBOLFVBQXZDO0FBRUMsV0FBSyxhQUFMO0FBQ0MsY0FBTyxLQUFLQyxvQkFBTCxDQUEwQkwsVUFBMUIsRUFBc0NFLEtBQXRDLENBQVA7QUFDQTtBQUNELFdBQUssYUFBTDtBQUNDLGNBQU8sS0FBS0ksZ0JBQUwsQ0FBc0JOLFVBQXRCLEVBQWtDRSxLQUFsQyxDQUFQO0FBQ0E7QUFDRDtBQUNDLGFBQU0sSUFBSWhTLDBCQUFKLENBQStCLDJFQUEvQixDQUFOO0FBVEY7QUFXQSxLQWZELE1BZU87QUFDTixVQUFLb1MsZ0JBQUw7QUFDQTtBQUNEOztBQUVEOzs7Ozs7Ozs7QUFodEVpQztBQUFBO0FBQUEsc0NBeXRFakM7QUFBQSxRQURpQk4sVUFDakIsdUVBRDhCLElBQzlCO0FBQUEsUUFEb0NFLEtBQ3BDLHVFQUQ0QyxJQUM1Qzs7QUFDQyxRQUFJSyxVQUFVLEtBQUtDLFdBQUwsQ0FBaUJSLFVBQWpCLENBQWQ7O0FBRUFPLFlBQVFFLElBQVIsQ0FBYSxVQUFTQyxRQUFULEVBQW1CO0FBQy9CLFNBQUlSLEtBQUosRUFBVztBQUNWLFdBQUtTLFlBQUwsR0FBb0JELFNBQVM1VCxLQUFULENBQWUsQ0FBZixFQUFrQm9ULEtBQWxCLENBQXBCO0FBQ0EsTUFGRCxNQUVPO0FBQ04sV0FBS1MsWUFBTCxHQUFvQkQsUUFBcEI7QUFDQTs7QUFFRCxVQUFLRSxlQUFMLENBQXFCLEtBQUtELFlBQTFCO0FBQ0FyTixhQUFRQyxPQUFSLENBQWdCLEtBQUtvTixZQUFyQjtBQUNBLEtBVFksQ0FTWDNHLElBVFcsQ0FTTixJQVRNLENBQWIsRUFTYzZHLEtBVGQsQ0FTb0IsVUFBU3JULEtBQVQsRUFBZ0I7QUFDbkM7QUFDQSxLQVhEOztBQWFBLFdBQU8rUyxPQUFQO0FBQ0E7O0FBRUQ7Ozs7Ozs7QUE1dUVpQztBQUFBO0FBQUEsd0NBa3ZFWlAsVUFsdkVZLEVBbXZFakM7QUFDQyxRQUFJTyxnQkFBSjs7QUFFQSxRQUFJLEtBQUtULFVBQUwsSUFBbUIsSUFBdkIsRUFBNkI7QUFBRTtBQUM5QlMsZUFBVSxLQUFLQyxXQUFMLEVBQVY7QUFDQSxLQUZELE1BRU87QUFBRTtBQUNSRCxlQUFVak4sUUFBUUMsT0FBUixDQUFnQixLQUFLdU0sVUFBckIsQ0FBVjtBQUNBOztBQUVEUyxZQUFRRSxJQUFSLENBQWEsVUFBU0MsUUFBVCxFQUFtQjtBQUMvQixVQUFLWixVQUFMLEdBQWtCWSxRQUFsQjtBQUNBLFNBQUlJLFFBQVEsS0FBS0Msb0JBQUwsQ0FBMEJMLFFBQTFCLENBQVo7QUFDQSxVQUFLQyxZQUFMLEdBQW9CRyxNQUFNZCxhQUFXLENBQWpCLENBQXBCO0FBQ0EsVUFBS1ksZUFBTCxDQUFxQixLQUFLRCxZQUExQjtBQUNBck4sYUFBUUMsT0FBUixDQUFnQixLQUFLb04sWUFBckI7QUFDQSxLQU5ZLENBTVgzRyxJQU5XLENBTU4sSUFOTSxDQUFiLEVBTWM2RyxLQU5kLENBTW9CLFVBQVNyVCxLQUFULEVBQWdCO0FBQ25DO0FBQ0EsS0FSRDs7QUFVQSxXQUFPK1MsT0FBUDtBQUNBOztBQUVEOzs7Ozs7O0FBendFaUM7QUFBQTtBQUFBLHdDQSt3RVpHLFFBL3dFWSxFQWd4RWpDO0FBQ0M7QUFDQWpCLGdCQUFZUSxVQUFaLENBQXVCdk4sUUFBdkIsQ0FBZ0NzTyxXQUFoQyxHQUE4Q04sU0FBU3BVLE1BQXZEOztBQUVBLFFBQUkyVSxVQUFVeEIsWUFBWVEsVUFBWixDQUF1QnZOLFFBQXZCLENBQWdDeU4sUUFBOUM7O0FBRUE7QUFDQTtBQUNBLFFBQUlQLGdCQUFnQnRULE1BQWhCLElBQTBCLENBQTlCLEVBQWlDO0FBQ2hDLFlBQU9zVCxlQUFQO0FBQ0E7O0FBRURBLHNCQUFrQjlPLE9BQU9vUSxXQUFQLENBQW1CUixRQUFuQixFQUE2Qk8sT0FBN0IsQ0FBbEI7QUFDQSxXQUFPckIsZUFBUDtBQUNBOztBQUVEOzs7Ozs7OztBQWh5RWlDO0FBQUE7QUFBQSw4QkF1eUV0QnRQLFFBdnlFc0IsRUF3eUVqQztBQUNDLFNBQUtsQyxPQUFMLEdBQWVELElBQUlpTSxJQUFKLENBQVM5SixRQUFULENBQWY7O0FBRUEsUUFBSSxLQUFLbEMsT0FBVCxFQUFrQjtBQUNqQkQsU0FBSUssUUFBSixDQUFhLEtBQUtKLE9BQWxCLEVBQTJCLEtBQUtzRSxRQUFMLENBQWNnRSxLQUF6QztBQUNBO0FBQ0Q7O0FBRUQ7Ozs7Ozs7O0FBaHpFaUM7QUFBQTtBQUFBLG1DQXV6RWpCeUssV0F2ekVpQixFQXd6RWpDO0FBQ0MsUUFBSSxDQUFFMVAsTUFBTTJQLE9BQU4sQ0FBY0QsV0FBZCxDQUFGLElBQWlDQSxZQUFZN1UsTUFBWixJQUFzQixDQUF0QixJQUEyQixPQUFPNlUsWUFBWSxDQUFaLENBQVAsSUFBeUIsUUFBekYsRUFBb0c7QUFDbkcsV0FBTSxJQUFJalQsMEJBQUosRUFBTjtBQUNBOztBQUVELFFBQUl3UyxXQUFXLEtBQUtXLGFBQUwsQ0FBbUJGLFdBQW5CLEVBQWdDLEtBQUt6TyxRQUFMLENBQWM0TSxVQUE5QyxFQUEwRCxLQUExRCxDQUFmOztBQUVBLFNBQUtsUixPQUFMLENBQWF3QixTQUFiLEdBQXlCLEVBQXpCO0FBQ0E4USxhQUFTOVIsT0FBVCxDQUFpQixVQUFTMFMsT0FBVCxFQUFrQjtBQUNsQzVCLG9CQUFlM0YsT0FBZixDQUF1QixrQkFBdkIsRUFBMkN1SCxPQUEzQztBQUNBLFVBQUtsVCxPQUFMLENBQWEwQixXQUFiLENBQXlCd1IsT0FBekI7QUFDQSxLQUhnQixDQUdmdEgsSUFIZSxDQUdWLElBSFUsQ0FBakI7O0FBS0EwRixtQkFBZTNGLE9BQWYsQ0FBdUIsaUJBQXZCLEVBQTBDMkcsUUFBMUM7O0FBRUEsV0FBT0EsUUFBUDtBQUNBOztBQUVEOzs7Ozs7OztBQTEwRWlDO0FBQUE7QUFBQSxpQ0FrMUVqQztBQUFBLFFBRFlWLFVBQ1osdUVBRHlCLElBQ3pCOztBQUNDLFFBQUl1QixTQUFVdkIsVUFBRCxHQUFlLEtBQUt0TixRQUFMLENBQWNnQixHQUFkLEdBQW9CLFFBQXBCLEdBQStCc00sVUFBOUMsR0FBMkQsS0FBS3ROLFFBQUwsQ0FBY2dCLEdBQXRGOztBQUVBLFdBQU9pTSxPQUFPekgsR0FBUCxDQUFXO0FBQ2pCeEUsVUFBSzZOO0FBRFksS0FBWCxDQUFQO0FBR0E7O0FBRUQ7Ozs7Ozs7OztBQTExRWlDO0FBQUE7QUFBQSxpQ0FrMkVuQkMsb0JBbDJFbUIsRUFrMkVHblQsU0FsMkVILEVBazJFY29ULE9BbDJFZCxFQW0yRWpDO0FBQ0MsUUFBR0QscUJBQXFCbFUsV0FBckIsQ0FBaUNDLElBQWpDLElBQXlDLE9BQTVDLEVBQXNEO0FBQ3JELFdBQU0sSUFBSVcsMEJBQUosRUFBTjtBQUNBOztBQUVELFFBQUl3VCxnQkFBZ0IsRUFBcEI7O0FBRUE7QUFDQSxRQUFJLEtBQUtoUCxRQUFMLENBQWNxRyxVQUFkLENBQXlCaEssT0FBekIsQ0FBaUMsVUFBakMsS0FBZ0QsQ0FBQyxDQUFyRCxFQUF3RDtBQUN2RCxVQUFLMkQsUUFBTCxDQUFjcUcsVUFBZCxDQUF5QjdHLElBQXpCLENBQThCLFVBQTlCO0FBQ0E7O0FBRURzUCx5QkFBcUI1UyxPQUFyQixDQUE2QixVQUFTbUssVUFBVCxFQUFxQjtBQUNqRCxTQUFJNEksZUFBZSxLQUFLQyxZQUFMLENBQWtCN0ksVUFBbEIsRUFBOEIxSyxTQUE5QixFQUF5Q29ULE9BQXpDLENBQW5CO0FBQ0FDLG1CQUFjeFAsSUFBZCxDQUFtQnlQLFlBQW5CO0FBQ0EsS0FINEIsQ0FHM0IzSCxJQUgyQixDQUd0QixJQUhzQixDQUE3Qjs7QUFLQSxXQUFPMEgsYUFBUDtBQUNBOztBQUVEOzs7Ozs7Ozs7QUF2M0VpQztBQUFBO0FBQUEsZ0NBKzNFcEIzSSxVQS8zRW9CLEVBKzNFUjFLLFNBLzNFUSxFQSszRUdvVCxPQS8zRUgsRUFnNEVqQztBQUNDLFFBQUksUUFBTzFJLFVBQVAseUNBQU9BLFVBQVAsTUFBcUIsUUFBckIsSUFBaUMsT0FBTzBJLE9BQVAsSUFBa0IsUUFBdkQsRUFBaUU7QUFDaEUsV0FBTSxJQUFJdlQsMEJBQUosRUFBTjtBQUNBOztBQUVERyxnQkFBWUEsYUFBYSxJQUF6Qjs7QUFFQSxRQUFJaVQsVUFBVW5ULElBQUlzQixhQUFKLENBQWtCLEtBQWxCLEVBQXlCO0FBQ3RDaUgsWUFBTztBQUQrQixLQUF6QixDQUFkOztBQUlBdkksUUFBSUssUUFBSixDQUFhOFMsT0FBYixFQUFzQmpULFNBQXRCOztBQUVBLFFBQUl3VCxVQUFVMVQsSUFBSXNCLGFBQUosQ0FBa0IsS0FBbEIsRUFBeUI7QUFDdENpSCxZQUFPO0FBRCtCLEtBQXpCLENBQWQ7O0FBSUE0SyxZQUFReFIsV0FBUixDQUFvQitSLE9BQXBCOztBQUVBOUksaUJBQWEsS0FBSytJLG9CQUFMLENBQTBCL0ksVUFBMUIsQ0FBYjs7QUFFQSxRQUFJQSxXQUFXMUgsY0FBWCxDQUEwQixPQUExQixDQUFKLEVBQXdDO0FBQ3ZDLFNBQUk4SCxRQUFRaEwsSUFBSXNCLGFBQUosQ0FBa0IsS0FBbEIsRUFBeUI7QUFDcEMySixXQUFLTCxXQUFXLE9BQVg7QUFEK0IsTUFBekIsQ0FBWjs7QUFJQSxTQUFJZ0osT0FBTTVULElBQUlzQixhQUFKLENBQWtCZ1MsT0FBbEIsRUFBMkI7QUFDcEMvSyxhQUFPLGVBRDZCO0FBRXBDNEMsWUFBTUgsTUFBTTZJO0FBRndCLE1BQTNCLENBQVY7O0FBS0FWLGFBQVF4UixXQUFSLENBQW9CaVMsSUFBcEI7QUFDQTs7QUFFRCxRQUFJaEosV0FBVzFILGNBQVgsQ0FBMEIsT0FBMUIsQ0FBSixFQUF3QztBQUN2QyxTQUFJMFEsUUFBTTVULElBQUlzQixhQUFKLENBQWtCZ1MsT0FBbEIsRUFBMkI7QUFDcEMvSyxhQUFPO0FBRDZCLE1BQTNCLENBQVY7O0FBSUEsU0FBSTJDLE9BQU9sTCxJQUFJc0IsYUFBSixDQUFrQixNQUFsQixFQUEwQjtBQUNwQ2lILGFBQU8sZ0JBRDZCO0FBRXBDNEMsWUFBTVAsV0FBV21CLEtBQVgsQ0FBaUJWO0FBRmEsTUFBMUIsQ0FBWDs7QUFLQSxTQUFJeUksUUFBUTlULElBQUlzQixhQUFKLENBQWtCLE1BQWxCLEVBQTBCO0FBQ3JDaUgsYUFBTyxrQkFEOEI7QUFFckM0QyxZQUFNUCxXQUFXbUIsS0FBWCxDQUFpQlg7QUFGYyxNQUExQixDQUFaOztBQUtBd0ksV0FBSWpTLFdBQUosQ0FBZ0J1SixJQUFoQjtBQUNBMEksV0FBSWpTLFdBQUosQ0FBZ0JtUyxLQUFoQjtBQUNBSixhQUFRL1IsV0FBUixDQUFvQmlTLEtBQXBCO0FBQ0E7O0FBRUQsU0FBSyxJQUFJN0ksU0FBVCxJQUFzQkgsVUFBdEIsRUFBa0M7QUFDakMsU0FBSSxDQUFFakksT0FBT29SLFFBQVAsQ0FBZ0JoSixTQUFoQixFQUEyQixLQUFLeEcsUUFBTCxDQUFjcUcsVUFBekMsQ0FBTixFQUE0RDtBQUMzRDtBQUNBOztBQUVELFNBQUlHLGFBQWEsT0FBYixJQUF3QkEsYUFBYSxPQUF6QyxFQUFrRDtBQUNqRDtBQUNBOztBQUVELFNBQUk2SSxRQUFNNVQsSUFBSXNCLGFBQUosQ0FBa0JnUyxPQUFsQixDQUFWO0FBQ0FNLFdBQUluUyxTQUFKLEdBQWdCbUosV0FBV0csU0FBWCxLQUF5QixFQUF6Qzs7QUFFQS9LLFNBQUlLLFFBQUosQ0FBYXVULEtBQWIsRUFBa0IsYUFBYTdWLElBQUlpVyxTQUFKLENBQWNqSixTQUFkLENBQS9CO0FBQ0EySSxhQUFRL1IsV0FBUixDQUFvQmlTLEtBQXBCO0FBQ0E7O0FBRUQsUUFBSUEsTUFBTTVULElBQUlzQixhQUFKLENBQWtCLEtBQWxCLEVBQXlCO0FBQ2xDaUgsWUFBTztBQUQyQixLQUF6QixDQUFWOztBQUlBLFFBQUkwTCxZQUFZalUsSUFBSXNCLGFBQUosQ0FBa0IsUUFBbEIsRUFBNEI7QUFDM0NpSCxZQUFPLGFBRG9DO0FBRTNDMkwsV0FBTSxRQUZxQztBQUczQzFJLFdBQU07QUFIcUMsS0FBNUIsQ0FBaEI7O0FBTUEsUUFBSTJJLFdBQVduVSxJQUFJc0IsYUFBSixDQUFrQixRQUFsQixFQUE0QjtBQUMxQ2lILFlBQU8sVUFEbUM7QUFFMUMyTCxXQUFNLFFBRm9DO0FBRzFDMUksV0FBTTtBQUhvQyxLQUE1QixDQUFmOztBQU1BLFFBQUksS0FBS2pILFFBQUwsQ0FBYzZNLGdCQUFsQixFQUFvQztBQUNuQ3BSLFNBQUlLLFFBQUosQ0FBYTRULFNBQWIsRUFBd0IsS0FBSzFQLFFBQUwsQ0FBYzZNLGdCQUF0QztBQUNBOztBQUVELFFBQUksS0FBSzdNLFFBQUwsQ0FBYzhNLHFCQUFsQixFQUF5QztBQUN4Q3JSLFNBQUlLLFFBQUosQ0FBYThULFFBQWIsRUFBdUIsS0FBSzVQLFFBQUwsQ0FBYzhNLHFCQUFyQztBQUNBOztBQUVEdUMsUUFBSWpTLFdBQUosQ0FBZ0JzUyxTQUFoQjtBQUNBTCxRQUFJalMsV0FBSixDQUFnQndTLFFBQWhCOztBQUVBRixjQUFVdkYsZ0JBQVYsQ0FBMkIsT0FBM0IsRUFBb0MsVUFBU2hELENBQVQsRUFBWTtBQUMvQ0EsT0FBRUMsY0FBRjtBQUNBNEYsb0JBQWUzRixPQUFmLENBQXVCLG9CQUF2QixFQUE2Q2hCLFVBQTdDO0FBQ0EsS0FIRDs7QUFLQXVKLGFBQVN6RixnQkFBVCxDQUEwQixPQUExQixFQUFtQyxVQUFTaEQsQ0FBVCxFQUFZO0FBQzlDQSxPQUFFQyxjQUFGO0FBQ0EsVUFBS2xLLFNBQUwsR0FBaUIsVUFBakI7QUFDQThQLG9CQUFlM0YsT0FBZixDQUF1Qix3QkFBdkIsRUFBaURoQixVQUFqRDtBQUNBLEtBSkQ7O0FBTUE4SSxZQUFRL1IsV0FBUixDQUFvQmlTLEdBQXBCOztBQUVBLFdBQU9ULE9BQVA7QUFDQTs7QUFFRDs7Ozs7Ozs7QUFqL0VpQztBQUFBO0FBQUEsd0NBdy9FWnZJLFVBeC9FWSxFQXkvRWpDO0FBQ0MsUUFBSUEsV0FBVzFILGNBQVgsQ0FBMEIsT0FBMUIsS0FBc0MsUUFBTzBILFdBQVdtQixLQUFsQixLQUEyQixRQUFyRSxFQUErRTtBQUM5RW5CLGdCQUFXbUIsS0FBWCxHQUFtQjtBQUNsQixnQkFBVW5CLFdBQVdtQixLQURIO0FBRWxCLGtCQUFZLEtBQUt4SCxRQUFMLENBQWM2RztBQUZSLE1BQW5CO0FBSUE7O0FBRUQsV0FBT1IsVUFBUDtBQUNBOztBQUVEOzs7O0FBcGdGaUM7QUFBQTtBQUFBLGlDQXdnRmpDO0FBQ0MsUUFBSTVLLElBQUlpTSxJQUFKLENBQVMsMkJBQVQsQ0FBSixFQUEyQztBQUMxQztBQUNBOztBQUVELFFBQUksS0FBSzFILFFBQUwsQ0FBY3NFLE1BQWxCLEVBQTBCO0FBQ3pCO0FBQ0E7O0FBRUQsUUFBSUwsUUFBUSxLQUFLakUsUUFBTCxDQUFjaUUsS0FBZCxJQUF1QixNQUFuQztBQUNBLFFBQUlDLFNBQVMsS0FBS2xFLFFBQUwsQ0FBY2tFLE1BQWQsSUFBd0IsT0FBckM7QUFDQSxRQUFJa0csV0FBVyxLQUFLcEssUUFBTCxDQUFjcUssU0FBZCxJQUEyQixPQUExQztBQUNBLFFBQUl3RixXQUFXLEtBQUs3UCxRQUFMLENBQWM4UCxTQUFkLElBQTJCLE9BQTFDOztBQUVBLFFBQUlwVCx5SUFLT3VILEtBTFAsOEJBTVdtRyxRQU5YLDhCQU9XeUYsUUFQWCwyQkFRUTNMLE1BUlIsb3VDQUFKOztBQThER3pJLFFBQUltTSxRQUFKLENBQWEsMEJBQWIsRUFBeUNsTCxHQUF6QztBQUNIOztBQUVEOzs7Ozs7QUF2bEZpQztBQUFBO0FBQUEsMEJBNmxGakM7QUFDQyxTQUFLaEIsT0FBTCxDQUFhb04sS0FBYixDQUFtQkMsT0FBbkIsR0FBNkIsTUFBN0I7QUFDQTtBQS9sRmdDOztBQUFBO0FBQUE7O0FBa21GbEM7Ozs7O0FBbG1Ga0MsS0FxbUY1QmdILFFBcm1GNEI7QUFBQTtBQUFBOztBQTBtRmxDLEtBQUlDLG1CQUFtQix1QkFBdkI7O0FBMW1Ga0MsS0E0bUY1QkMsdUJBNW1GNEI7QUFBQTs7QUE4bUZqQyxxQ0FDQTtBQUFBLE9BRFlsVixPQUNaLHVFQURzQixJQUN0Qjs7QUFBQTs7QUFDQ0EsYUFBVUEsV0FBV2lWLGdCQUFyQjs7QUFERDs7QUFHSSw0SkFBdUJqVixPQUF2QjtBQUhKO0FBSUk7O0FBbm5GNkI7QUFBQSxHQTRtRklULGdCQTVtRko7O0FBc25GbEM7Ozs7Ozs7QUFPQTs7Ozs7OztBQUtBLEtBQUk0VixvQkFBb0I7QUFDdkJ4VSxXQUFTLG1CQURjO0FBRXZCZ1MsY0FBWSxhQUZXO0FBR3ZCMUosU0FBTyxFQUhnQjtBQUl2QnlKLFlBQVUsQ0FKYTtBQUt2QmEsZUFBYSxDQUxVO0FBTXZCNkIsaUJBQWUsTUFOUTtBQU92QnBGLGFBQVc7QUFQWSxFQUF4Qjs7QUFVQTs7Ozs7QUFLQSxLQUFJcUYsb0JBQUo7O0FBRUE7Ozs7O0FBS0EsS0FBSUMsbUJBQUo7O0FBRUE7Ozs7O0FBS0EsS0FBSUMsdUJBQUo7O0FBL3BGa0MsS0FpcUY1Qi9DLFVBanFGNEI7QUFtcUZqQzs7Ozs7Ozs7O0FBU0Esc0JBQVkxSSxTQUFaLEVBQXVCckMsTUFBdkIsRUFDQTtBQUFBLE9BRCtCd0wsUUFDL0IsdUVBRDBDLElBQzFDO0FBQUEsT0FEZ0R1QyxRQUNoRCx1RUFEMkQsSUFDM0Q7O0FBQUE7O0FBQ0NILGlCQUFjdkwsU0FBZDtBQUNBd0wsZ0JBQWFyQyxRQUFiO0FBQ0FzQyxvQkFBaUI5TixNQUFqQjtBQUNBOztBQUVEOzs7Ozs7OztBQW5yRmlDO0FBQUE7QUFBQSx5QkF5ckYzQnhDLFFBenJGMkIsRUEwckZqQztBQUNDLFFBQUcsUUFBT0EsUUFBUCx5Q0FBT0EsUUFBUCxNQUFtQixRQUF0QixFQUFnQztBQUMvQixXQUFNLElBQUl4RSwwQkFBSixFQUFOO0FBQ0E7O0FBRUQsU0FBS3dFLFFBQUwsR0FBZ0I1QixPQUFPNkIsTUFBUCxDQUFjaVEsaUJBQWQsRUFBaUNsUSxRQUFqQyxDQUFoQjtBQUNBLFNBQUt3USxVQUFMLENBQWdCLENBQWhCOztBQUVBNVQsYUFBU3VOLGdCQUFULENBQTBCLGtCQUExQixFQUE4QyxZQUFXO0FBQ3hELFVBQUsvRSxVQUFMLENBQWdCLEtBQUtwRixRQUFMLENBQWN0RSxPQUE5Qjs7QUFFQTtBQUNBLFVBQUsrVSxVQUFMLEdBQWtCLEtBQUtDLG1CQUFMLENBQXlCLEtBQUsxUSxRQUFMLENBQWN5TixRQUF2QyxFQUFpRCxLQUFLek4sUUFBTCxDQUFjc08sV0FBL0QsQ0FBbEI7QUFDQSxVQUFLcUMsZUFBTDtBQUNBLEtBTjZDLENBTTVDckosSUFONEMsQ0FNdkMsSUFOdUMsQ0FBOUM7QUFPQTs7QUFFRDs7Ozs7O0FBM3NGaUM7QUFBQTtBQUFBLHFDQWl0RmpDO0FBQ0MsU0FBS3NKLEtBQUwsR0FBYSxLQUFLQyxXQUFMLEVBQWI7QUFDQSxTQUFLQyxZQUFMLENBQWtCLEtBQUtGLEtBQXZCO0FBQ0EsU0FBS3RMLGtCQUFMLENBQXdCLEtBQUtzTCxLQUE3QjtBQUNBOztBQUVEOzs7Ozs7O0FBdnRGaUM7QUFBQTtBQUFBLDhCQTZ0RnRCaFQsUUE3dEZzQixFQTh0RmpDO0FBQ0MsU0FBS2xDLE9BQUwsR0FBZUQsSUFBSWlNLElBQUosQ0FBUzlKLFFBQVQsQ0FBZjs7QUFFQW5DLFFBQUlLLFFBQUosQ0FBYSxLQUFLSixPQUFsQixFQUEyQixLQUFLc0UsUUFBTCxDQUFjZ0UsS0FBekM7QUFDQTs7QUFFRDs7Ozs7OztBQXB1RmlDO0FBQUE7QUFBQSxnQ0EwdUZwQjRNLEtBMXVGb0IsRUEydUZqQztBQUNDLFNBQUtsVixPQUFMLENBQWF3QixTQUFiLEdBQXlCLEVBQXpCO0FBQ0EsU0FBS3hCLE9BQUwsQ0FBYTBCLFdBQWIsQ0FBeUJ3VCxLQUF6QjtBQUNBOztBQUVEOzs7Ozs7OztBQWh2RmlDO0FBQUE7QUFBQSx1Q0F1dkZickMsT0F2dkZhLEVBdXZGSm5CLFVBdnZGSSxFQXd2RmpDO0FBQ0NtQixjQUFVcFAsU0FBU29QLE9BQVQsQ0FBVjtBQUNBbkIsaUJBQWFqTyxTQUFTaU8sVUFBVCxDQUFiOztBQUVBLFdBQU9wVCxLQUFLcUYsSUFBTCxDQUFVK04sYUFBYW1CLE9BQXZCLENBQVA7QUFDQTs7QUFFRDs7Ozs7OztBQS92RmlDO0FBQUE7QUFBQSxzQ0Fxd0ZkcUMsS0Fyd0ZjLEVBc3dGakM7QUFDQyxRQUFJM0ksV0FBVyxJQUFmOztBQUVBLFNBQUs4SSxJQUFMLENBQVVDLFVBQVYsQ0FBcUIsQ0FBckIsRUFBd0I5SixPQUF4QixHQUFrQyxVQUFTQyxDQUFULEVBQVk7QUFDN0NBLE9BQUVDLGNBQUY7O0FBRUEsU0FBSTZKLGdCQUFnQmhKLFNBQVNpSixPQUFULEdBQWlCLENBQXJDOztBQUVBLFNBQUlqSixTQUFTa0osY0FBVCxDQUF3QkYsYUFBeEIsQ0FBSixFQUE0QztBQUMzQyxZQUFNLElBQUloQix1QkFBSixDQUE0Qix5Q0FBNUIsQ0FBTjtBQUNBOztBQUVELFNBQUlJLGNBQWNBLFdBQVc1RCxNQUE3QixFQUFxQztBQUNwQzRELGlCQUFXaEQsWUFBWCxDQUF3QjRELGFBQXhCLEVBQXVDbEQsSUFBdkMsQ0FBNEMsVUFBU0MsUUFBVCxFQUFtQjtBQUM5RC9GLGdCQUFTdUksVUFBVCxDQUFvQlMsYUFBcEI7QUFDQSxPQUZEO0FBR0E7QUFDRCxLQWREOztBQWdCQSxTQUFLRyxRQUFMLENBQWNKLFVBQWQsQ0FBeUIsQ0FBekIsRUFBNEI5SixPQUE1QixHQUFzQyxVQUFTQyxDQUFULEVBQVk7QUFDakRBLE9BQUVDLGNBQUY7O0FBRUEsU0FBSTZKLGdCQUFnQmhKLFNBQVNpSixPQUFULEdBQWlCLENBQXJDOztBQUVBLFNBQUdqSixTQUFTa0osY0FBVCxDQUF3QkYsYUFBeEIsQ0FBSCxFQUEyQztBQUMxQyxZQUFNLElBQUloQix1QkFBSixDQUE0Qix5Q0FBNUIsQ0FBTjtBQUNBOztBQUVELFNBQUlJLGNBQWNBLFdBQVc1RCxNQUE3QixFQUFxQztBQUNwQzRELGlCQUFXaEQsWUFBWCxDQUF3QjRELGFBQXhCLEVBQXVDbEQsSUFBdkMsQ0FBNEMsVUFBU0MsUUFBVCxFQUFtQjtBQUM5RC9GLGdCQUFTdUksVUFBVCxDQUFvQlMsYUFBcEI7QUFDQSxPQUZEO0FBR0E7QUFDRCxLQWREOztBQWdCQSxTQUFJLElBQUluWCxJQUFJLENBQVosRUFBZUEsSUFBSSxLQUFLc1UsS0FBTCxDQUFXeFUsTUFBOUIsRUFBc0NFLEdBQXRDLEVBQTJDO0FBQzFDLFVBQUtzVSxLQUFMLENBQVd0VSxDQUFYLEVBQWNrWCxVQUFkLENBQXlCLENBQXpCLEVBQTRCOUosT0FBNUIsR0FBc0MsVUFBU0MsQ0FBVCxFQUFZO0FBQ2pEQSxRQUFFQyxjQUFGOztBQUVBLFVBQUk2SixnQkFBZ0IsS0FBS0ksWUFBTCxDQUFrQixjQUFsQixDQUFwQjs7QUFFQSxVQUFJaEIsY0FBY0EsV0FBVzVELE1BQTdCLEVBQXFDO0FBQ3BDNEQsa0JBQVdoRCxZQUFYLENBQXdCNEQsYUFBeEIsRUFBdUNsRCxJQUF2QyxDQUE0QyxVQUFTQyxRQUFULEVBQW1CO0FBQzlEL0YsaUJBQVN1SSxVQUFULENBQW9CUyxhQUFwQjtBQUNBLFFBRkQ7QUFHQTtBQUNELE1BVkQ7QUFXQTtBQUNEOztBQUVEOzs7Ozs7O0FBeHpGaUM7QUFBQTtBQUFBLDhCQTh6RnRCM0QsVUE5ekZzQixFQSt6RmpDO0FBQ0MsU0FBSzRELE9BQUwsR0FBZS9SLFNBQVNtTyxVQUFULENBQWY7QUFDQSxTQUFLbkIsU0FBTCxDQUFlbUIsVUFBZjtBQUNBLFNBQUtnRSxhQUFMLENBQW1CaEUsVUFBbkI7QUFDQTs7QUFFRDs7Ozs7O0FBcjBGaUM7QUFBQTtBQUFBLGdDQTIwRmpDO0FBQ0MsV0FBTyxLQUFLNEQsT0FBWjtBQUNBOztBQUVEOzs7Ozs7QUEvMEZpQztBQUFBO0FBQUEsaUNBcTFGakM7QUFDQyxRQUFJSyxLQUFLM1UsU0FBU0csYUFBVCxDQUF1QixJQUF2QixDQUFUOztBQUVBLFNBQUtxUixLQUFMLEdBQWEsS0FBS29ELGVBQUwsRUFBYjtBQUNBLFNBQUtKLFFBQUwsR0FBZ0IsS0FBS0ssb0JBQUwsRUFBaEI7QUFDQSxTQUFLVixJQUFMLEdBQVksS0FBS1csZ0JBQUwsRUFBWjs7QUFFQUgsT0FBRzVWLFNBQUgsR0FBZSxZQUFmO0FBQ0E0VixPQUFHblUsV0FBSCxDQUFlLEtBQUtnVSxRQUFwQjs7QUFFQSxTQUFLaEQsS0FBTCxDQUFXbFMsT0FBWCxDQUFtQixVQUFTeVYsSUFBVCxFQUFlO0FBQ2pDSixRQUFHblUsV0FBSCxDQUFldVUsSUFBZjtBQUNBLEtBRkQ7O0FBSUFKLE9BQUduVSxXQUFILENBQWUsS0FBSzJULElBQXBCOztBQUVBLFdBQU9RLEVBQVA7QUFDQTs7QUFFRDs7Ozs7O0FBeDJGaUM7QUFBQTtBQUFBLHFDQTgyRmpDO0FBQ0MsUUFBSW5ELFFBQVEsRUFBWjs7QUFFQSxTQUFJLElBQUl0VSxJQUFJLENBQVosRUFBZUEsS0FBSyxLQUFLMlcsVUFBekIsRUFBcUMzVyxHQUFyQyxFQUEwQztBQUN6QyxTQUFJOFgsV0FBV2hWLFNBQVNHLGFBQVQsQ0FBdUIsSUFBdkIsQ0FBZjtBQUNBLFNBQUk4VSxPQUFPalYsU0FBU0csYUFBVCxDQUF1QixHQUF2QixDQUFYO0FBQ0E2VSxjQUFTalcsU0FBVCxHQUFzQixLQUFLdVYsT0FBTCxJQUFnQnBYLENBQWpCLEdBQXNCLGtCQUF0QixHQUEyQyxXQUFoRTtBQUNBK1gsVUFBS2xXLFNBQUwsR0FBaUIsV0FBakI7QUFDQWtXLFVBQUsxVSxZQUFMLENBQWtCLE1BQWxCLEVBQTBCLFdBQVVyRCxDQUFwQztBQUNBK1gsVUFBSzFVLFlBQUwsQ0FBa0IsY0FBbEIsRUFBa0NyRCxDQUFsQztBQUNBK1gsVUFBSzNVLFNBQUwsR0FBaUJwRCxDQUFqQjtBQUNBOFgsY0FBU3hVLFdBQVQsQ0FBcUJ5VSxJQUFyQjtBQUNBekQsV0FBTTVPLElBQU4sQ0FBV29TLFFBQVg7QUFDQTs7QUFFRCxXQUFPeEQsS0FBUDtBQUNBOztBQUVEOzs7Ozs7QUFoNEZpQztBQUFBO0FBQUEsMENBczRGakM7QUFDQyxRQUFJMEQsS0FBS2xWLFNBQVNHLGFBQVQsQ0FBdUIsSUFBdkIsQ0FBVDtBQUNBLFFBQUk4VSxPQUFPalYsU0FBU0csYUFBVCxDQUF1QixHQUF2QixDQUFYO0FBQ0EsUUFBSWdWLFFBQVFuVixTQUFTRyxhQUFULENBQXVCLE1BQXZCLENBQVo7QUFDQSxRQUFJd1MsUUFBUTNTLFNBQVNHLGFBQVQsQ0FBdUIsTUFBdkIsQ0FBWjs7QUFHQStVLE9BQUduVyxTQUFILEdBQWUsV0FBZjtBQUNBa1csU0FBS2xXLFNBQUwsR0FBaUIsV0FBakI7QUFDQTRULFVBQU01VCxTQUFOLEdBQWtCLFNBQWxCOztBQUVBa1csU0FBSzFVLFlBQUwsQ0FBa0IsTUFBbEIsRUFBMEIsRUFBMUI7QUFDQTBVLFNBQUsxVSxZQUFMLENBQWtCLFlBQWxCLEVBQWdDLFVBQWhDO0FBQ0E0VSxVQUFNNVUsWUFBTixDQUFtQixhQUFuQixFQUFrQyxNQUFsQzs7QUFFQTRVLFVBQU03VSxTQUFOLEdBQWtCLFNBQWxCO0FBQ0FxUyxVQUFNclMsU0FBTixHQUFrQixVQUFsQjs7QUFFQTJVLFNBQUt6VSxXQUFMLENBQWlCMlUsS0FBakI7QUFDQUYsU0FBS3pVLFdBQUwsQ0FBaUJtUyxLQUFqQjtBQUNBdUMsT0FBRzFVLFdBQUgsQ0FBZXlVLElBQWY7O0FBRUEsV0FBT0MsRUFBUDtBQUNBOztBQUVEOzs7Ozs7QUEvNUZpQztBQUFBO0FBQUEsc0NBcTZGakM7QUFDQyxRQUFJQSxLQUFLbFYsU0FBU0csYUFBVCxDQUF1QixJQUF2QixDQUFUO0FBQ0EsUUFBSThVLE9BQU9qVixTQUFTRyxhQUFULENBQXVCLEdBQXZCLENBQVg7QUFDQSxRQUFJZ1YsUUFBUW5WLFNBQVNHLGFBQVQsQ0FBdUIsTUFBdkIsQ0FBWjtBQUNBLFFBQUl3UyxRQUFRM1MsU0FBU0csYUFBVCxDQUF1QixNQUF2QixDQUFaOztBQUVBK1UsT0FBR25XLFNBQUgsR0FBZSxXQUFmO0FBQ0FrVyxTQUFLbFcsU0FBTCxHQUFpQixXQUFqQjtBQUNBNFQsVUFBTTVULFNBQU4sR0FBa0IsU0FBbEI7O0FBRUFrVyxTQUFLMVUsWUFBTCxDQUFrQixNQUFsQixFQUEwQixFQUExQjtBQUNBMFUsU0FBSzFVLFlBQUwsQ0FBa0IsWUFBbEIsRUFBZ0MsTUFBaEM7QUFDQTRVLFVBQU01VSxZQUFOLENBQW1CLGFBQW5CLEVBQWtDLE1BQWxDOztBQUVBNFUsVUFBTTdVLFNBQU4sR0FBa0IsU0FBbEI7QUFDQXFTLFVBQU1yUyxTQUFOLEdBQWtCLE1BQWxCOztBQUVBMlUsU0FBS3pVLFdBQUwsQ0FBaUIyVSxLQUFqQjtBQUNBRixTQUFLelUsV0FBTCxDQUFpQm1TLEtBQWpCO0FBQ0F1QyxPQUFHMVUsV0FBSCxDQUFleVUsSUFBZjs7QUFFQSxXQUFPQyxFQUFQO0FBQ0E7O0FBRUQ7Ozs7Ozs7QUE3N0ZpQztBQUFBO0FBQUEsa0NBbThGbEJ4RSxVQW44RmtCLEVBbzhGakM7QUFDQyxXQUFRQSxhQUFhLEtBQUttRCxVQUFsQixJQUFnQ25ELGNBQWMsQ0FBL0MsSUFBcURwTyxNQUFNb08sVUFBTixDQUE1RDtBQUNBOztBQUVEOzs7Ozs7O0FBeDhGaUM7QUFBQTtBQUFBLDZCQTg4RnZCQSxVQTk4RnVCLEVBKzhGakM7QUFDQ2hELFFBQUkwSCxlQUFKLENBQW9CLEtBQUtoUyxRQUFMLENBQWNtUSxhQUFsQyxFQUFpRDdDLFVBQWpELEVBQTZELEtBQUt0TixRQUFMLENBQWMrSyxTQUEzRTtBQUNBOztBQUVEOzs7Ozs7O0FBbjlGaUM7QUFBQTtBQUFBLGlDQXk5Rm5CdUMsVUF6OUZtQixFQTA5RmpDO0FBQ0MsU0FBSSxJQUFJcUUsSUFBUixJQUFnQixLQUFLdkQsS0FBckIsRUFBNEI7QUFDM0IsU0FBSSxLQUFLQSxLQUFMLENBQVd1RCxJQUFYLEVBQWlCWCxVQUFqQixDQUE0QixDQUE1QixFQUErQkssWUFBL0IsQ0FBNEMsY0FBNUMsS0FBK0QvRCxVQUFuRSxFQUErRTtBQUM5RTdSLFVBQUlLLFFBQUosQ0FBYSxLQUFLc1MsS0FBTCxDQUFXdUQsSUFBWCxDQUFiLEVBQStCLFFBQS9CO0FBQ0EsTUFGRCxNQUVPO0FBQ05sVyxVQUFJSSxXQUFKLENBQWdCLEtBQUt1UyxLQUFMLENBQVd1RCxJQUFYLENBQWhCLEVBQWtDLFFBQWxDO0FBQ0E7QUFDRDtBQUNEOztBQUVEOzs7Ozs7QUFwK0ZpQztBQUFBO0FBQUEsMkJBMCtGakM7QUFDQyxTQUFLbkIsVUFBTCxDQUFnQixDQUFoQjtBQUNBLFNBQUtyRSxTQUFMLENBQWUsQ0FBZjtBQUNBOztBQUVEOzs7Ozs7QUEvK0ZpQztBQUFBO0FBQUEsMEJBcS9GakM7QUFDQyxTQUFLelEsT0FBTCxDQUFhb04sS0FBYixDQUFtQkMsT0FBbkIsR0FBNkIsTUFBN0I7QUFDQTtBQXYvRmdDOztBQUFBO0FBQUE7O0FBMC9GbEMsS0FBSWtKLG1CQUFtQixrRUFBdkI7O0FBMS9Ga0MsS0E0L0Y1QkMsK0JBNS9GNEI7QUFBQTs7QUE4L0ZqQyw2Q0FDQTtBQUFBLE9BRFluWCxPQUNaLHVFQURzQixJQUN0Qjs7QUFBQTs7QUFDQ0EsYUFBVUEsV0FBV2tYLGdCQUFyQjs7QUFERCxrS0FFT2xYLE9BRlA7O0FBR0ksNEtBQXVCQSxPQUF2QjtBQUhKO0FBSUk7O0FBbmdHNkI7QUFBQSxHQTQvRllULGdCQTUvRlo7O0FBc2dHbEM7QUFDQTtBQUNBOzs7QUF4Z0drQyxLQXlnRzVCNlgsa0JBemdHNEI7QUEyZ0dqQzs7Ozs7OztBQU9BLDhCQUFZdE4sU0FBWixFQUNBO0FBQUE7O0FBQ0MsUUFBS0EsU0FBTCxHQUFpQkEsU0FBakI7O0FBRUEsUUFBS3VOLFVBQUwsR0FBa0IsRUFBbEI7QUFDQSxRQUFLQSxVQUFMLENBQWdCbEksTUFBaEIsR0FBeUIsRUFBekI7QUFDQSxRQUFLa0ksVUFBTCxDQUFnQnJDLFFBQWhCLEdBQTJCLEVBQTNCO0FBQ0EsUUFBS3FDLFVBQUwsQ0FBZ0JqRixRQUFoQixHQUEyQixFQUEzQjtBQUNBLFFBQUtpRixVQUFMLENBQWdCN0UsVUFBaEIsR0FBNkIsRUFBN0I7QUFDQSxRQUFLNkUsVUFBTCxDQUFnQnhOLElBQWhCLEdBQXVCLEVBQXZCO0FBQ0EsUUFBS3dOLFVBQUwsQ0FBZ0JsRyxRQUFoQixHQUEyQixFQUEzQjtBQUNBOztBQUVDOzs7Ozs7OztBQS9oRytCO0FBQUE7QUFBQSw0QkFxaUd4QmtHLFVBcmlHd0IsRUFzaUdqQztBQUNDLFNBQUtDLFNBQUwsR0FBaUJELFVBQWpCO0FBQ0EsU0FBSzNGLE1BQUwsR0FBYyxFQUFkO0FBQ0MsU0FBSzJGLFVBQUwsQ0FBZ0JsSSxNQUFoQixDQUF1QnVDLE1BQXZCLEdBQWdDLEtBQWhDO0FBQ0QsU0FBSzJGLFVBQUwsQ0FBZ0JyQyxRQUFoQixDQUF5QnRELE1BQXpCLEdBQWtDLEtBQWxDO0FBQ0EsU0FBSzJGLFVBQUwsQ0FBZ0JqRixRQUFoQixDQUF5QlYsTUFBekIsR0FBa0MsS0FBbEM7QUFDQSxTQUFLMkYsVUFBTCxDQUFnQjdFLFVBQWhCLENBQTJCZCxNQUEzQixHQUFvQyxLQUFwQztBQUNBLFNBQUsyRixVQUFMLENBQWdCeE4sSUFBaEIsQ0FBcUI2SCxNQUFyQixHQUE4QixLQUE5QjtBQUNBLFNBQUsyRixVQUFMLENBQWdCbEcsUUFBaEIsQ0FBeUJPLE1BQXpCLEdBQWtDLEtBQWxDOztBQUVBLFFBQUl4RSxXQUFXLElBQWY7O0FBRUEsU0FBS3BELFNBQUwsQ0FBZXlDLElBQWYsQ0FBb0IsUUFBcEIsRUFBOEIsVUFBU3pDLFNBQVQsRUFBb0I2SCxTQUFwQixFQUErQjtBQUM1RHpFLGNBQVNtSyxVQUFULENBQW9CMUYsU0FBcEIsSUFBaUMsSUFBSXhDLE1BQUosQ0FBV3JGLFNBQVgsQ0FBakM7QUFDQW9ELGNBQVNtSyxVQUFULENBQW9CMUYsU0FBcEIsRUFBK0JELE1BQS9CLEdBQXdDLElBQXhDO0FBQ0F4RSxjQUFTd0UsTUFBVCxDQUFnQmpOLElBQWhCLENBQXFCeUksU0FBU21LLFVBQVQsQ0FBb0IxRixTQUFwQixDQUFyQjtBQUNBLFlBQU96RSxTQUFTbUssVUFBVCxDQUFvQjFGLFNBQXBCLENBQVA7QUFDQSxLQUxELEVBS0csWUFMSDs7QUFPQSxTQUFLN0gsU0FBTCxDQUFleUMsSUFBZixDQUFvQixVQUFwQixFQUFnQyxVQUFTekMsU0FBVCxFQUFvQjZILFNBQXBCLEVBQStCO0FBQzlEekUsY0FBU21LLFVBQVQsQ0FBb0IxRixTQUFwQixJQUFpQyxJQUFJcUQsUUFBSixDQUFhbEwsU0FBYixDQUFqQztBQUNBb0QsY0FBU21LLFVBQVQsQ0FBb0IxRixTQUFwQixFQUErQkQsTUFBL0IsR0FBd0MsSUFBeEM7QUFDQXhFLGNBQVN3RSxNQUFULENBQWdCak4sSUFBaEIsQ0FBcUJ5SSxTQUFTbUssVUFBVCxDQUFvQjFGLFNBQXBCLENBQXJCO0FBQ0EsWUFBT3pFLFNBQVNtSyxVQUFULENBQW9CMUYsU0FBcEIsQ0FBUDtBQUNBLEtBTEQsRUFLRyxZQUxIOztBQU9BLFNBQUs3SCxTQUFMLENBQWV5QyxJQUFmLENBQW9CLFVBQXBCLEVBQWdDLFVBQVN6QyxTQUFULEVBQW9CNkgsU0FBcEIsRUFBK0I7QUFDOUR6RSxjQUFTbUssVUFBVCxDQUFvQjFGLFNBQXBCLElBQWlDLElBQUlTLFFBQUosQ0FBYXRJLFNBQWIsRUFBd0JBLFVBQVU5RSxPQUFsQyxFQUEyQzhFLFVBQVV5TixNQUFyRCxDQUFqQztBQUNBckssY0FBU21LLFVBQVQsQ0FBb0IxRixTQUFwQixFQUErQkQsTUFBL0IsR0FBd0MsSUFBeEM7QUFDQXhFLGNBQVN3RSxNQUFULENBQWdCak4sSUFBaEIsQ0FBcUJ5SSxTQUFTbUssVUFBVCxDQUFvQjFGLFNBQXBCLENBQXJCO0FBQ0EsWUFBT3pFLFNBQVNtSyxVQUFULENBQW9CMUYsU0FBcEIsQ0FBUDtBQUNBLEtBTEQsRUFLRyxZQUxIOztBQU9BLFNBQUs3SCxTQUFMLENBQWV5QyxJQUFmLENBQW9CLFlBQXBCLEVBQWtDLFVBQVN6QyxTQUFULEVBQW9CNkgsU0FBcEIsRUFBK0I7QUFDaEUsU0FBSXNCLFdBQVkvRixTQUFTc0ssTUFBVCxDQUFnQixVQUFoQixDQUFELEdBQWlDdEssU0FBU21LLFVBQVQsQ0FBb0IsVUFBcEIsQ0FBakMsR0FBb0UsSUFBbkY7QUFDQSxTQUFJN0IsV0FBWXRJLFNBQVNzSyxNQUFULENBQWdCLFVBQWhCLENBQUQsR0FBaUN0SyxTQUFTbUssVUFBVCxDQUFvQixVQUFwQixDQUFqQyxHQUFvRSxJQUFuRjtBQUNBbkssY0FBU21LLFVBQVQsQ0FBb0IxRixTQUFwQixJQUFpQyxJQUFJYSxVQUFKLENBQWUxSSxTQUFmLEVBQTBCQSxVQUFVeU4sTUFBcEMsRUFBNEN0RSxRQUE1QyxFQUFzRHVDLFFBQXRELENBQWpDO0FBQ0F0SSxjQUFTbUssVUFBVCxDQUFvQjFGLFNBQXBCLEVBQStCRCxNQUEvQixHQUF3QyxJQUF4QztBQUNBeEUsY0FBU3dFLE1BQVQsQ0FBZ0JqTixJQUFoQixDQUFxQnlJLFNBQVNtSyxVQUFULENBQW9CMUYsU0FBcEIsQ0FBckI7QUFDQSxZQUFPekUsU0FBU21LLFVBQVQsQ0FBb0IxRixTQUFwQixDQUFQO0FBQ0EsS0FQRCxFQU9HLFlBUEg7O0FBU0EsU0FBSzdILFNBQUwsQ0FBZXlDLElBQWYsQ0FBb0IsTUFBcEIsRUFBNEIsVUFBU3pDLFNBQVQsRUFBb0I2SCxTQUFwQixFQUErQjtBQUMxRHpFLGNBQVNtSyxVQUFULENBQW9CMUYsU0FBcEIsSUFBaUMsSUFBSTlILElBQUosQ0FBU0MsU0FBVCxFQUFvQkEsVUFBVTlFLE9BQTlCLEVBQXVDOEUsVUFBVXlOLE1BQWpELENBQWpDO0FBQ0FySyxjQUFTbUssVUFBVCxDQUFvQjFGLFNBQXBCLEVBQStCRCxNQUEvQixHQUF3QyxJQUF4QztBQUNBeEUsY0FBU3dFLE1BQVQsQ0FBZ0JqTixJQUFoQixDQUFxQnlJLFNBQVNtSyxVQUFULENBQW9CMUYsU0FBcEIsQ0FBckI7QUFDQSxZQUFPekUsU0FBU21LLFVBQVQsQ0FBb0IxRixTQUFwQixDQUFQO0FBQ0EsS0FMRCxFQUtHLFlBTEg7O0FBT0EsU0FBSzdILFNBQUwsQ0FBZXlDLElBQWYsQ0FBb0IsVUFBcEIsRUFBZ0MsVUFBU3pDLFNBQVQsRUFBb0I2SCxTQUFwQixFQUErQjtBQUM5RHpFLGNBQVNtSyxVQUFULENBQW9CMUYsU0FBcEIsSUFBaUMsSUFBSVIsUUFBSixDQUFhckgsU0FBYixFQUF3QkEsVUFBVTlFLE9BQWxDLEVBQTJDOEUsVUFBVXlOLE1BQXJELENBQWpDO0FBQ0FySyxjQUFTbUssVUFBVCxDQUFvQjFGLFNBQXBCLEVBQStCRCxNQUEvQixHQUF3QyxJQUF4QztBQUNBeEUsY0FBU3dFLE1BQVQsQ0FBZ0JqTixJQUFoQixDQUFxQnlJLFNBQVNtSyxVQUFULENBQW9CMUYsU0FBcEIsQ0FBckI7QUFDQSxZQUFPekUsU0FBU21LLFVBQVQsQ0FBb0IxRixTQUFwQixDQUFQO0FBQ0EsS0FMRCxFQUtHLFlBTEg7QUFNQTs7QUFFRDs7Ozs7OztBQS9sR2lDO0FBQUE7QUFBQSwyQkFxbUd6QkEsU0FybUd5QixFQXNtR2pDO0FBQ0MsUUFBSXRPLE9BQU9vUixRQUFQLENBQWdCOUMsU0FBaEIsRUFBMkIsS0FBSzJGLFNBQWhDLENBQUosRUFBZ0Q7QUFDL0MsWUFBTyxLQUFLeE4sU0FBTCxDQUFlMk4sSUFBZixDQUFvQjlGLFNBQXBCLENBQVA7QUFDQTs7QUFFRCxVQUFNLElBQUl3RiwrQkFBSixDQUFvQyxxREFBcEMsQ0FBTjtBQUNBOztBQUVEOzs7Ozs7O0FBOW1HaUM7QUFBQTtBQUFBLDBCQW9uRzFCclgsSUFwbkcwQixFQXFuR2pDO0FBQ0MsV0FBTyxLQUFLdVgsVUFBTCxDQUFnQnpULGNBQWhCLENBQStCOUQsSUFBL0IsQ0FBUDtBQUNBO0FBdm5HZ0M7O0FBQUE7QUFBQTs7QUEwbkdsQyxLQUFJNFgsbUJBQW1CLDJDQUF2Qjs7QUExbkdrQyxLQTRuRzVCQyx1QkE1bkc0QjtBQUFBOztBQThuR2pDLHFDQUNBO0FBQUEsT0FEWTNYLE9BQ1osdUVBRHNCLElBQ3RCOztBQUFBOztBQUNDQSxhQUFVQSxXQUFXMFgsZ0JBQXJCOztBQURELGtKQUVPMVgsT0FGUDs7QUFHSSw0SkFBdUJBLE9BQXZCO0FBSEo7QUFJSTs7QUFub0c2QjtBQUFBLEdBNG5HSVQsZ0JBNW5HSjs7QUFzb0dsQztBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQXpvR2tDLEtBZ3BHNUJxWSxXQWhwRzRCO0FBa3BHakM7Ozs7OztBQU1BLHlCQUNBO0FBQUE7O0FBQ0MsUUFBS0MsU0FBTCxHQUFpQixFQUFqQjtBQUNBLFFBQUtDLFFBQUw7QUFDQSxRQUFLQyxpQkFBTDtBQUNBOztBQUVEOzs7Ozs7Ozs7QUEvcEdpQztBQUFBO0FBQUEsd0JBc3FHNUJqUixHQXRxRzRCLEVBc3FHdkJrUixRQXRxR3VCLEVBdXFHakM7QUFBQSxRQURvQkMsU0FDcEIsdUVBRGdDLElBQ2hDOztBQUNDLFFBQUksT0FBT25SLEdBQVAsSUFBYyxRQUFsQixFQUE0QjtBQUMzQixXQUFNLElBQUlyRywwQkFBSixDQUErQixrRUFBaUVxRyxHQUFqRSx5Q0FBaUVBLEdBQWpFLEtBQXVFLHNCQUF0RyxDQUFOO0FBQ0E7O0FBRUQsUUFBSSxPQUFPa1IsUUFBUCxJQUFtQixVQUF2QixFQUFtQztBQUNsQyxXQUFNLElBQUl2WCwwQkFBSixDQUErQix1RUFBc0V1WCxRQUF0RSx5Q0FBc0VBLFFBQXRFLEtBQWlGLHNCQUFoSCxDQUFOO0FBQ0E7O0FBRUQsUUFBSUMsU0FBSixFQUFlO0FBQ2QsU0FBSSxPQUFPLEtBQUtBLFNBQUwsQ0FBUCxJQUEwQixXQUE5QixFQUEyQztBQUMxQyxXQUFLQSxTQUFMLElBQWtCLEVBQWxCO0FBQ0E7O0FBRUQsVUFBS0EsU0FBTCxFQUFnQm5SLEdBQWhCLElBQXVCa1IsU0FBU3pMLElBQVQsQ0FBY3lMLFFBQWQsRUFBd0IsSUFBeEIsRUFBOEJsUixHQUE5QixDQUF2QjtBQUNBLEtBTkQsTUFNTztBQUNOLFVBQUtBLEdBQUwsSUFBWWtSLFNBQVN6TCxJQUFULENBQWN5TCxRQUFkLEVBQXdCLElBQXhCLEVBQThCbFIsR0FBOUIsQ0FBWjtBQUNBO0FBQ0Q7O0FBRUQ7Ozs7Ozs7OztBQTNyR2lDO0FBQUE7QUFBQSwrQkFtc0dyQkEsR0Fuc0dxQixFQW1zR2hCb0csUUFuc0dnQixFQW9zR2pDO0FBQUEsUUFEMkJnTCxLQUMzQix1RUFEbUMsSUFDbkM7O0FBQ0MsUUFBSSxPQUFPcFIsR0FBUCxJQUFjLFFBQWxCLEVBQTRCO0FBQzNCLFdBQU0sSUFBSXJHLDBCQUFKLENBQStCLDBFQUF5RXFHLEdBQXpFLHlDQUF5RUEsR0FBekUsS0FBK0Usc0JBQTlHLENBQU47QUFDQTs7QUFFRCxRQUFJLFFBQU9vRyxRQUFQLHlDQUFPQSxRQUFQLE1BQW1CLFFBQXZCLEVBQWlDO0FBQ2hDLFdBQU0sSUFBSXpNLDBCQUFKLENBQStCLDZFQUE0RXlNLFFBQTVFLHlDQUE0RUEsUUFBNUUsS0FBdUYsc0JBQXRILENBQU47QUFDQTs7QUFFRCxTQUFLMkssU0FBTCxDQUFlL1EsR0FBZixJQUFzQm9HLFFBQXRCO0FBQ0EsU0FBS3BHLEdBQUwsSUFBWW9HLFFBQVo7QUFDQTs7QUFFRDs7Ozs7Ozs7QUFqdEdpQztBQUFBO0FBQUEsK0JBd3RHckJwRyxHQXh0R3FCLEVBeXRHakM7QUFDQyxRQUFJLE9BQU9BLEdBQVAsSUFBYyxRQUFkLElBQTBCLFFBQU9BLEdBQVAseUNBQU9BLEdBQVAsTUFBYyxRQUE1QyxFQUFzRDtBQUNyRCxXQUFNLElBQUlyRywwQkFBSixDQUErQiwwRUFBeUVxRyxHQUF6RSx5Q0FBeUVBLEdBQXpFLEtBQStFLHNCQUE5RyxDQUFOO0FBQ0E7O0FBRUQsUUFBSSxRQUFPQSxHQUFQLHlDQUFPQSxHQUFQLE1BQWMsUUFBbEIsRUFBNEI7QUFDM0IsWUFBTyxLQUFLK1EsU0FBTCxDQUFlL1EsSUFBSWpILFdBQUosQ0FBZ0JDLElBQS9CLEtBQXdDLElBQS9DO0FBQ0E7O0FBRUQsV0FBTyxLQUFLK1gsU0FBTCxDQUFlL1EsR0FBZixLQUF1QixJQUE5QjtBQUNBOztBQUVEOzs7Ozs7O0FBcnVHaUM7QUFBQTtBQUFBLGlDQTJ1R25Cb0csUUEzdUdtQixFQTR1R2pDO0FBQ0MsUUFBSSxRQUFPQSxRQUFQLHlDQUFPQSxRQUFQLE1BQW1CLFFBQW5CLElBQStCLFFBQU9BLFFBQVAseUNBQU9BLFFBQVAsTUFBbUIsUUFBdEQsRUFBZ0U7QUFDL0QsWUFBUSxPQUFPLEtBQUsySyxTQUFMLENBQWUzSyxTQUFTck4sV0FBVCxDQUFxQkMsSUFBcEMsQ0FBUCxLQUFxRCxXQUE3RDtBQUNBLEtBRkQsTUFFTyxJQUFJLE9BQU9vTixRQUFQLElBQW1CLFFBQXZCLEVBQWlDO0FBQ3ZDLFlBQVEsT0FBTyxLQUFLMkssU0FBTCxDQUFlM0ssUUFBZixDQUFQLEtBQW9DLFdBQTVDO0FBQ0E7O0FBRUQsVUFBTSxJQUFJek0sMEJBQUosQ0FBK0Isd0ZBQXVGeU0sUUFBdkYseUNBQXVGQSxRQUF2RixLQUFrRyxzQkFBakksQ0FBTjtBQUNBOztBQUVEOzs7Ozs7Ozs7QUF0dkdpQztBQUFBO0FBQUEsd0JBOHZHNUJ4SSxNQTl2RzRCLEVBK3ZHakM7QUFDQyxRQUFJd0ksV0FBVyxFQUFmO0FBQ0EsUUFBSXBHLFlBQUo7O0FBRUEsUUFBSSxLQUFLcVIsYUFBTCxDQUFtQnpULE1BQW5CLENBQUosRUFBZ0M7QUFDL0IsWUFBTyxLQUFLMFQsV0FBTCxDQUFpQjFULE1BQWpCLENBQVA7QUFDQTs7QUFFRCxRQUFJLFFBQU9BLE1BQVAseUNBQU9BLE1BQVAsTUFBaUIsUUFBckIsRUFBK0I7QUFDOUJ3SSxnQkFBV3hJLE1BQVg7QUFDQW9DLFdBQU1wQyxPQUFPN0UsV0FBUCxDQUFtQkMsSUFBekI7QUFDQSxVQUFLdVksV0FBTCxDQUFpQnZSLEdBQWpCLEVBQXNCb0csUUFBdEI7QUFDQSxLQUpELE1BSU8sSUFBSSxPQUFPeEksTUFBUCxJQUFpQixRQUFqQixJQUE2QixLQUFLZCxjQUFMLENBQW9CYyxNQUFwQixDQUFqQyxFQUE4RDtBQUNwRXdJLGdCQUFXLElBQUksS0FBS3hJLE1BQUwsQ0FBSixFQUFYO0FBQ0FvQyxXQUFNcEMsTUFBTjtBQUNBLFVBQUsyVCxXQUFMLENBQWlCdlIsR0FBakIsRUFBc0JvRyxRQUF0QjtBQUNBLEtBSk0sTUFJQSxJQUFJLE9BQU94SSxNQUFQLElBQWlCLFFBQWpCLElBQTZCLEtBQUsrTSxVQUFMLENBQWdCK0YsTUFBaEIsQ0FBdUI5UyxNQUF2QixDQUFqQyxFQUFpRTtBQUN2RXdJLGdCQUFXLElBQUksS0FBS21LLFVBQUwsQ0FBZ0IzUyxNQUFoQixDQUFKLEVBQVg7QUFDQW9DLFdBQU1wQyxNQUFOO0FBQ0EsVUFBSzJULFdBQUwsQ0FBaUJ2UixHQUFqQixFQUFzQm9HLFFBQXRCO0FBQ0EsS0FKTSxNQUlBO0FBQ04sV0FBTSxJQUFJeUssdUJBQUosQ0FBNEIsK0NBQTVCLENBQU47QUFDQTs7QUFFRCxXQUFPekssUUFBUDtBQUNBOztBQUVEOzs7Ozs7QUExeEdpQztBQUFBO0FBQUEsMkJBZ3lHakM7QUFDQyxTQUFLMkssU0FBTCxHQUFpQixFQUFqQjtBQUNBOztBQUVEOzs7Ozs7QUFweUdpQztBQUFBO0FBQUEsOEJBMHlHakM7QUFDQyxTQUFLUSxXQUFMLENBQWlCLFNBQWpCLEVBQTRCLElBQUlyVCxPQUFKLEVBQTVCO0FBQ0EsU0FBS3FULFdBQUwsQ0FBaUIsUUFBakIsRUFBMkIsSUFBSTdRLFlBQUosRUFBM0I7QUFDQTs7QUFFRDs7Ozs7O0FBL3lHaUM7QUFBQTtBQUFBLHVDQXF6R2pDO0FBQ0MsU0FBSzZRLFdBQUwsQ0FBaUIsWUFBakIsRUFBK0IsSUFBSWpCLGtCQUFKLENBQXVCLElBQXZCLENBQS9CO0FBQ0E7QUF2ekdnQzs7QUFBQTtBQUFBOztBQTB6R2xDO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FBS0EsS0FBSWtCLG9CQUFvQjtBQUN2QkMsZUFBYSxPQURVO0FBRXZCNVgsV0FBUyxNQUZjO0FBR3ZCNlgsb0JBQWtCLEVBSEs7QUFJdkJuQixjQUFZLENBQUMsVUFBRCxFQUFhLFVBQWIsRUFBeUIsUUFBekIsRUFBbUMsWUFBbkMsRUFBaUQsTUFBakQsQ0FKVztBQUt2Qm9CLHFCQUFtQjtBQUxJLEVBQXhCOztBQVFBOzs7Ozs7QUFNQSxLQUFJQyxvQkFBb0I7QUFDdkJDLGFBQVc7QUFEWSxFQUF4Qjs7QUFoMUdrQyxLQW8xRzVCbmEsY0FwMUc0QjtBQXMxR2pDOzs7Ozs7Ozs7Ozs7QUFZQSwwQkFBWXlHLFFBQVosRUFDQTtBQUFBOztBQUNDLE9BQUksUUFBT0EsUUFBUCx5Q0FBT0EsUUFBUCxNQUFtQixRQUF2QixFQUFpQztBQUNoQyxVQUFNLElBQUl4RSwwQkFBSixFQUFOO0FBQ0E7O0FBRUQsUUFBS3dFLFFBQUwsR0FBZ0I1QixPQUFPNkIsTUFBUCxDQUFjb1QsaUJBQWQsRUFBaUNyVCxRQUFqQyxDQUFoQjs7QUFFQTFGLG9CQUFpQnFaLGFBQWpCLEdBQWlDLEtBQUszVCxRQUFMLENBQWNzVCxXQUEvQzs7QUFFQSxRQUFLTSxxQkFBTDs7QUFFQSxRQUFLL08sU0FBTCxHQUFpQixJQUFJOE4sV0FBSixFQUFqQjs7QUFFQSxRQUFLUCxVQUFMLEdBQWtCLEtBQUt2TixTQUFMLENBQWUyTixJQUFmLENBQW9CLFlBQXBCLENBQWxCO0FBQ0EsUUFBS0osVUFBTCxDQUFnQlMsUUFBaEIsQ0FBeUIsS0FBSzdTLFFBQUwsQ0FBY29TLFVBQXZDOztBQUVBeFYsWUFBU3VOLGdCQUFULENBQTBCLGtCQUExQixFQUE4QyxZQUFXO0FBQ3hELFNBQUsvRSxVQUFMLENBQWdCLEtBQUtwRixRQUFMLENBQWN0RSxPQUE5Qjs7QUFFQSxRQUFJLEtBQUtzRSxRQUFMLENBQWN3VCxpQkFBbEIsRUFBcUM7QUFDcENLLGtCQUFhalYsSUFBYixDQUFrQixJQUFsQjtBQUNBOztBQUVELFNBQUt5RyxXQUFMO0FBQ0EsSUFSNkMsQ0FRNUNpQyxJQVI0QyxDQVF2QyxJQVJ1QyxDQUE5Qzs7QUFVQSxVQUFPLElBQUl3TSxLQUFKLENBQVUsSUFBVixFQUFnQjtBQUN0QnRPLFNBQUssYUFBU3VPLElBQVQsRUFBZTFXLE1BQWYsRUFBdUI7QUFDM0IsU0FBSTBXLEtBQUszQixVQUFMLENBQWdCRyxNQUFoQixDQUF1QmxWLE1BQXZCLENBQUosRUFBb0M7QUFDbkMsYUFBTzBXLEtBQUszQixVQUFMLENBQWdCNEIsT0FBaEIsQ0FBd0IzVyxNQUF4QixDQUFQO0FBQ0E7O0FBRUQsU0FBSTBXLEtBQUtsUCxTQUFMLENBQWVxTyxhQUFmLENBQTZCN1YsTUFBN0IsQ0FBSixFQUEwQztBQUN6QyxhQUFPMFcsS0FBS2xQLFNBQUwsQ0FBZXNPLFdBQWYsQ0FBMkI5VixNQUEzQixDQUFQO0FBQ0E7QUFDRDtBQVRxQixJQUFoQixDQUFQO0FBV0E7O0FBRUQ7Ozs7Ozs7QUExNEdpQztBQUFBO0FBQUEsMkNBZzVHakM7QUFDQyxRQUFJdkQsVUFBSjtBQUNBLFFBQUltYSxZQUFZLEtBQUtqVSxRQUFMLENBQWN1VCxnQkFBOUI7O0FBRUEsU0FBS3paLElBQUksQ0FBVCxFQUFZQSxJQUFJbWEsVUFBVXJhLE1BQTFCLEVBQWtDRSxHQUFsQyxFQUF1QztBQUN0QyxTQUFJMlosa0JBQWtCOVUsY0FBbEIsQ0FBaUNzVixVQUFVbmEsQ0FBVixDQUFqQyxDQUFKLEVBQW9EO0FBQ25ELFVBQUkyQyxLQUFLLHFCQUFxQmpELElBQUkwYSxPQUFKLENBQVlELFVBQVVuYSxDQUFWLENBQVosQ0FBOUI7O0FBRUEsVUFBSSxDQUFFMkIsSUFBSWlNLElBQUosQ0FBU2pMLEVBQVQsQ0FBTixFQUFvQjtBQUNuQmhCLFdBQUkwWSxjQUFKLENBQW1CMVgsRUFBbkIsRUFBdUJnWCxrQkFBa0JRLFVBQVVuYSxDQUFWLENBQWxCLENBQXZCO0FBQ0E7QUFDRDtBQUNEO0FBQ0Q7O0FBRUQ7Ozs7Ozs7QUEvNUdpQztBQUFBO0FBQUEsOEJBcTZHdEI4RCxRQXI2R3NCLEVBczZHakM7QUFDQyxTQUFLbEMsT0FBTCxHQUFlRCxJQUFJaU0sSUFBSixDQUFTOUosUUFBVCxDQUFmOztBQUVBbkMsUUFBSUssUUFBSixDQUFhLEtBQUtKLE9BQWxCLEVBQTJCLEtBQUtzRSxRQUFMLENBQWNnRSxLQUF6QztBQUNBOztBQUVEOzs7Ozs7QUE1NkdpQztBQUFBO0FBQUEsaUNBazdHakM7QUFDQyxRQUFJdkksSUFBSWlNLElBQUosQ0FBUyxrQkFBVCxDQUFKLEVBQWtDO0FBQ2pDO0FBQ0E7O0FBRUQsUUFBSWhMLG1CQUNELEtBQUtzRCxRQUFMLENBQWN0RSxPQURiLDZsQkFzQnVCa0IsU0FBU3dYLGVBQVQsQ0FBeUJDLFdBdEJoRCx3QkFBSjs7QUEwQkc1WSxRQUFJbU0sUUFBSixDQUFhLGlCQUFiLEVBQWdDbEwsR0FBaEM7QUFDSDtBQWw5R2dDOztBQUFBO0FBQUE7O0FBczlHbEM7Ozs7Ozs7OztBQU9BLFVBQVNtWCxZQUFULEdBQXdCO0FBQ3ZCLE1BQUk5UCxTQUFTdEksSUFBSXNCLGFBQUosQ0FBa0IsS0FBbEIsRUFBeUI7QUFDckNpSCxVQUFPO0FBRDhCLEdBQXpCLENBQWI7O0FBSUEsTUFBSXNRLE9BQU83WSxJQUFJc0IsYUFBSixDQUFrQixNQUFsQixFQUEwQjtBQUNwQ2lILFVBQU87QUFENkIsR0FBMUIsQ0FBWDs7QUFJQUQsU0FBTzNHLFdBQVAsQ0FBbUJrWCxJQUFuQjtBQUNBMVgsV0FBUzJYLElBQVQsQ0FBY25YLFdBQWQsQ0FBMEIyRyxNQUExQjs7QUFHQSxNQUFJeVEsV0FBVzVYLFNBQVN3WCxlQUFULENBQXlCQyxXQUF4QztBQUNBLE1BQUlJLFVBQVU3WCxTQUFTd1gsZUFBVCxDQUF5QkMsV0FBekIsR0FBdUMsSUFBckQ7O0FBRUE3WixTQUFPa2EscUJBQVAsQ0FBNkJDLFlBQTdCOztBQUVBLE1BQUlwSyxVQUFVLEtBQUs3TyxPQUFuQjs7QUFFQTZPLFVBQVF6QixLQUFSLENBQWNDLE9BQWQsR0FBd0IsTUFBeEI7O0FBRUEsV0FBUzRMLFlBQVQsR0FBd0I7QUFDdkJMLFFBQUt4TCxLQUFMLENBQVc4TCxTQUFYLEdBQXVCLGlCQUFpQkosUUFBakIsR0FBNEIsS0FBbkQ7QUFDQUEsZUFBWSxDQUFaOztBQUVBLE9BQUlBLFdBQVdDLE9BQWYsRUFBd0I7QUFDdkJJO0FBQ0E7QUFDQTs7QUFFRHJhLFVBQU9rYSxxQkFBUCxDQUE2QkMsWUFBN0I7QUFDQTs7QUFFRCxXQUFTRSxJQUFULEdBQWdCO0FBQ2ZQLFFBQUt4TCxLQUFMLENBQVdnTSxPQUFYLEdBQXFCTixXQUFXLElBQWhDO0FBQ0FGLFFBQUt4TCxLQUFMLENBQVc4TCxTQUFYLEdBQXVCLGlCQUFpQkosUUFBakIsR0FBNEIsS0FBbkQ7O0FBRUFBLGVBQVksRUFBWjs7QUFFQSxPQUFJQSxZQUFZLENBQWhCLEVBQW1CO0FBQ2xCakssWUFBUXpCLEtBQVIsQ0FBY0MsT0FBZCxHQUF3QixPQUF4Qjs7QUFFQSxRQUFJLE9BQU9oRixNQUFQLElBQWlCLFdBQXJCLEVBQWtDO0FBQ2pDdEksU0FBSWEsTUFBSixDQUFXeUgsTUFBWDtBQUNBOztBQUVEO0FBQ0E7O0FBRUR2SixVQUFPa2EscUJBQVAsQ0FBNkJHLElBQTdCO0FBQ0E7QUFDRDs7QUFFRCxRQUFPdGIsY0FBUDtBQUVDLENBcmhIcUIsRUFBdEIiLCJmaWxlIjoiVHVyYm9FY29tbWVyY2UuanMiLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgVHVyYm9FY29tbWVyY2UgPSAoZnVuY3Rpb24gKCkge1xuJ3VzZSBzdHJpY3QnO1xuXG4vKipcclxuICogQGZpbGUgXHJcbiAqIFN0ciBjbGFzcy5cclxuICpcclxuICogQWRkcyBzb21lIHVzZWZ1bCBmdW5jdGlvbmFsaXR5IGZvclxyXG4gKiBtYW5pcHVsYXRpbmcgc3RyaW5ncyBvciBjcmVhdGluZyBzdHJpbmcuXHJcbiAqL1xyXG5cclxuY2xhc3MgU3RyXHJcbntcclxuXHQvKipcclxuXHQgKiBDb252ZXJ0IGNhbWVsQ2FzZSB0byBrZWJhYi1jYXNlLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIHN0cmluZyB8IHN0cmluZ1xyXG5cdCAqIEByZXR1cm4gc3RyaW5nXHJcblx0ICovXHJcblx0c3RhdGljIGtlYmFiQ2FzZShzdHJpbmcpIFxyXG5cdHtcclxuXHRcdHJldHVybiBzdHJpbmcucmVwbGFjZSgvKFthLXpdKShbQS1aXSkvZywgJyQxLSQyJykudG9Mb3dlckNhc2UoKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEdlbmVyYXRlcyBhIHJhbmRvbSBzdHJpbmcuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gaW50ZWdlciB8IGxlbmd0aFxyXG5cdCAqIEByZXR1cm4gc3RyaW5nXHJcblx0ICovXHJcblx0c3RhdGljIHJhbmRvbShsZW5ndGgpIFxyXG5cdHtcclxuXHRcdGxldCBzdHJpbmcgPSAnJztcclxuXHRcdGxldCBwb3NzaWJsZSA9IFwiQUJDREVGR0hJSktMTU5PUFFSU1RVVldYWVphYmNkZWZnaGlqa2xtbm9wcXJzdHV2d3h5ejAxMjM0NTY3ODlcIjtcclxuXHJcblx0XHRmb3IgKGxldCBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XHJcblx0ICAgIFx0c3RyaW5nICs9IHBvc3NpYmxlLmNoYXJBdChNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBwb3NzaWJsZS5sZW5ndGgpKTtcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gc3RyaW5nO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQ2hhbmdlcyB0aGUgZmlyc3QgbGV0dGVyIFxyXG5cdCAqIG9mIHRoZSBzdHJpbmcgdG8gdXBwZXJjYXNlLlxyXG5cdCAqIFxyXG5cdCAqIEBwYXJhbSBzdHJpbmcgfCBzdHJpbmdcclxuXHQgKiBAcmV0dXJuIHN0cmluZ1xyXG5cdCAqL1xyXG5cdHN0YXRpYyB1Y2ZpcnN0KHN0cmluZykgXHJcblx0e1xyXG5cdCAgICByZXR1cm4gc3RyaW5nLmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpICsgc3RyaW5nLnNsaWNlKDEpO1xyXG5cdH1cclxufVxuXG4vKipcclxuICogU3RvcmVzIHRoZSBkZWJ1ZyBsZXZlbC5cclxuICpcclxuICogQHZhciBzdHJpbmcgXHJcbiAqL1xyXG5sZXQgZGVidWdMZXZlbDtcclxuXHJcbmNsYXNzIEV4Y2VwdGlvbkhhbmRsZXJcclxue1xyXG5cdC8qKlxyXG5cdCAqIFNldHRlciBmb3IgdGhlIGRlYnVnIGxldmVsLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIHN0cmluZyB8IGxldmVsXHJcblx0ICogQHJldHVybiB2b2lkXHJcblx0ICovXHJcblx0c3RhdGljIHNldCBzZXREZWJ1Z0xldmVsKGxldmVsKVxyXG5cdHtcclxuXHRcdC8vIFN1cHByZXNzIGVycm9ycyBkZXBlbmRzIG9uIHRoZSBkZWJ1ZyBsZXZlbC5cclxuXHRcdGlmIChsZXZlbCA9PSAnd2FybmluZycgfHwgbGV2ZWwgPT0gJ2luZm8nKSB7XHJcblx0XHRcdHdpbmRvdy5vbmVycm9yID0gZnVuY3Rpb24oKSB7IHJldHVybiB0cnVlOyB9O1xyXG5cdFx0fVxyXG5cclxuXHRcdGRlYnVnTGV2ZWwgPSBsZXZlbDtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEV4dGVuZGVkIGNvbnN0cnVjdG9yLCBjYXB0dXJlcyB0aGVcclxuXHQgKiBzdGFjayB0cmFjZS5cclxuXHQgKlxyXG5cdCAqIEByZXR1cm4gdm9pZFxyXG5cdCAqL1xyXG5cdGNvbnN0cnVjdG9yKClcclxuXHR7XHJcblx0XHRpZiAoRXJyb3IuY2FwdHVyZVN0YWNrVHJhY2UpIHtcclxuXHRcdFx0RXJyb3IuY2FwdHVyZVN0YWNrVHJhY2UodGhpcywgdGhpcy5jb25zdHJ1Y3Rvci5uYW1lKTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEhhbmRsZXMgYWxsIGV4Y2VwdGlvbnMuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gb2JqZWN0IHwgZXJyb3IgfCBUaHJvd2VuIEV4Y2VwdGlvbiBPYmplY3RcclxuXHQgKiBAcGFyYW0gc3RyaW5nIHwgbWVzc2FnZVxyXG5cdCAqIEByZXR1cm4gdm9pZFxyXG5cdCAqL1xyXG5cdHN0YWNrVHJhY2UoZXJyb3IsIG1lc3NhZ2UpIFxyXG5cdHtcclxuXHRcdHRoaXMuY3VzdG9tQWN0aW9ucyhlcnJvciwgbWVzc2FnZSk7XHJcblxyXG5cdFx0c3dpdGNoKGRlYnVnTGV2ZWwpXHJcblx0XHR7XHJcblx0XHRcdGNhc2UgJ2Vycm9yJzogdGhpcy5oYW5kbGVFcnJvcnMoZXJyb3IsIG1lc3NhZ2UpOyBicmVhaztcclxuXHRcdFx0Y2FzZSAnd2FybmluZyc6IHRoaXMuaGFuZGxlV2FybmluZ3MoZXJyb3IsIG1lc3NhZ2UpOyBicmVhaztcclxuXHRcdFx0Y2FzZSAnaW5mbyc6IHRoaXMuaGFuZGxlSW5mb3MoZXJyb3IsIG1lc3NhZ2UpOyBicmVhaztcclxuXHRcdFx0ZGVmYXVsdDogdGhpcy5oYW5kbGVJbmZvcyhlcnJvciwgbWVzc2FnZSk7IGJyZWFrO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogVGFrZSBhY3Rpb24gZm9yIHNwZWNpZmljIEV4Y2VwdGlvbnMuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gb2JqZWN0IHwgZXJyb3IgfCBUaHJvd2VuIEV4Y2VwdGlvbiBPYmplY3RcclxuXHQgKiBAcGFyYW0gc3RyaW5nIHwgbWVzc2FnZVxyXG5cdCAqIEByZXR1cm4gYm9vbFxyXG5cdCAqL1xyXG5cdGN1c3RvbUFjdGlvbnMoZXJyb3IsIG1lc3NhZ2UpXHJcblx0e1xyXG5cdFx0aWYgKGVycm9yLmNvbnN0cnVjdG9yLm5hbWUgPT0gJ0ludmFsaWRBcmd1bWVudEV4Y2VwdGlvbicpIHtcclxuXHRcdFx0Ly8gaGFuZGxlXHJcblx0XHR9IGVsc2UgaWYgKGVycm9yLmNvbnN0cnVjdG9yLm5hbWUgPT0gJ0ludmFsaWRCaW5kaW5nRXhjZXB0aW9uJykge1xyXG5cdFx0XHQvLyBoYW5kbGVcclxuXHRcdH0gZWxzZSBpZiAoZXJyb3IuY29uc3RydWN0b3IubmFtZSA9PSAnQmFkRXZlbnRDYWxsRXhjZXB0aW9uJykge1xyXG5cdFx0XHQvLyBoYW5kbGVcclxuXHRcdH0gZWxzZSBpZiAoZXJyb3IuY29uc3RydWN0b3IubmFtZSA9PSAnQ29tcG9uZW50c0V4Y2VwdGlvbicpIHtcclxuXHRcdFx0Ly8gaGFuZGxlXHJcblx0XHR9IGVsc2UgaWYgKGVycm9yLmNvbnN0cnVjdG9yLm5hbWUgPT0gJ0NvbXBvbmVudE5vdFJlZ2lzdGVyZWRFeGNlcHRpb24nKSB7XHJcblx0XHRcdC8vIGhhbmRsZVxyXG5cdFx0fSBlbHNlIGlmIChlcnJvci5jb25zdHJ1Y3Rvci5uYW1lID09ICdOb3RJblBhZ2VSYW5nZUV4Y2VwdGlvbicpIHtcclxuXHRcdFx0Ly8gaGFuZGxlXHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIGZhbHNlO1xyXG5cdH1cclxuXHJcblx0aGFuZGxlRXJyb3JzKGVycm9yLCBtZXNzYWdlKVxyXG5cdHtcclxuXHRcdGNvbnNvbGUuZXJyb3IoZXJyb3IuY29uc3RydWN0b3IubmFtZSArICc6ICcgKyBtZXNzYWdlKTtcclxuXHR9XHJcblxyXG5cdGhhbmRsZVdhcm5pbmdzKGVycm9yLCBtZXNzYWdlKVxyXG5cdHtcclxuXHRcdGNvbnNvbGUud2FybihlcnJvci5jb25zdHJ1Y3Rvci5uYW1lICsgJzogJyArIG1lc3NhZ2UpO1xyXG5cdH1cclxuXHJcblx0aGFuZGxlSW5mb3MoZXJyb3IsIG1lc3NhZ2UpXHJcblx0e1xyXG5cdFx0Y29uc29sZS5pbmZvKGVycm9yLmNvbnN0cnVjdG9yLm5hbWUgKyAnOiAnICsgbWVzc2FnZSk7XHJcblx0fVxyXG59XG5cbmxldCBkZWZhdWx0TWVzc2FnZSA9ICdBbiBpbnZhbGlkIGFyZ3VtZW50IHdhcyBwYXNzZWQuJztcclxuXHJcbmNsYXNzIEludmFsaWRBcmd1bWVudEV4Y2VwdGlvbiQxIGV4dGVuZHMgRXhjZXB0aW9uSGFuZGxlclxyXG57XHJcblx0Y29uc3RydWN0b3IobWVzc2FnZSA9IG51bGwpIFxyXG5cdHtcclxuXHRcdG1lc3NhZ2UgPSBtZXNzYWdlIHx8IGRlZmF1bHRNZXNzYWdlO1xyXG5cdFx0c3VwZXIobWVzc2FnZSk7XHJcbiAgICBcdHN1cGVyLnN0YWNrVHJhY2UodGhpcywgbWVzc2FnZSk7XHJcbiAgICB9XHJcbn1cblxuLyoqXHJcbiAqIEBmaWxlIFxyXG4gKiBET00gY2xhc3MuXHJcbiAqXHJcbiAqIEFkZHMgc29tZSB1c2VmdWwgZnVuY3Rpb25hbGl0eSBmb3JcclxuICogZmV0Y2hpbmcgb3IgbWFuaXB1bGF0aW5nIERPTSBlbGVtZW50cy5cclxuICovXHJcblxyXG5jbGFzcyBET01cclxue1xyXG5cdC8qKlxyXG5cdCAqIE1pbmlmaWVzIHRoZSBjc3MgdGV4dC5cclxuXHQgKiBcclxuXHQgKiBAcGFyYW0gc3RyaW5nIHwgc3RyaW5nXHJcblx0ICogQHJldHVybiBzdHJpbmdcclxuXHQgKi9cclxuXHRzdGF0aWMgbWluaWZ5Q3NzKHN0cmluZykgXHJcblx0e1xyXG5cdCAgICBzdHJpbmcgPSBzdHJpbmcucmVwbGFjZSgvXFwvXFwqKD86KD8hXFwqXFwvKVtcXHNcXFNdKSpcXCpcXC98W1xcclxcblxcdF0rL2csICcnKTtcclxuXHQgICAgc3RyaW5nID0gc3RyaW5nLnJlcGxhY2UoLyB7Mix9L2csICcgJyk7XHJcblx0ICAgIHN0cmluZyA9IHN0cmluZy5yZXBsYWNlKC8oW3s6fV0pL2csICckMScpO1xyXG5cdCAgICBzdHJpbmcgPSBzdHJpbmcucmVwbGFjZSgvKFs7LF0pIC9nLCAnJDEnKTtcclxuXHQgICAgc3RyaW5nID0gc3RyaW5nLnJlcGxhY2UoLyAhL2csICchJyk7XHJcblx0ICAgIFxyXG5cdCAgICByZXR1cm4gc3RyaW5nO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogU3dpdGNoZXMgYmV0d2VlbiB0d28gZ2l2ZW4gY2xhc3Nlcy5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSBvYmplY3QgfCBlbGVtZW50XHJcblx0ICogQHBhcmFtIHN0cmluZyB8IGNsYXNzTmFtZVxyXG5cdCAqIEBwYXJhbSBzdHJpbmcgfCBuZXdDbGFzc05hbWVcclxuXHQgKiBAcmV0dXJuIG9iamVjdFxyXG5cdCAqL1xyXG5cdHN0YXRpYyBzd2l0Y2hDbGFzc2VzKGVsZW1lbnQsIGNsYXNzTmFtZSwgbmV3Q2xhc3NOYW1lKSBcclxuXHR7XHJcblx0XHR0aGlzLnJlbW92ZUNsYXNzKGVsZW1lbnQsIGNsYXNzTmFtZSk7XHJcblx0XHR0aGlzLmFkZENsYXNzKGVsZW1lbnQsIG5ld0NsYXNzTmFtZSk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBBZGRzIGNsYXNzIHRvIGEgZ2l2ZW4gZWxlbWVudC5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSBvYmplY3QgfCBlbGVtZW50XHJcblx0ICogQHBhcmFtIHN0cmluZyB8IGNsYXNzTmFtZVxyXG5cdCAqIEByZXR1cm4gb2JqZWN0XHJcblx0ICovXHJcblx0c3RhdGljIGFkZENsYXNzKGVsZW1lbnQsIGNsYXNzTmFtZSkgXHJcblx0e1xyXG5cdFx0aWYoZWxlbWVudCA9PT0gbnVsbCkge1xyXG5cdFx0XHR0aHJvdyBuZXcgSW52YWxpZEFyZ3VtZW50RXhjZXB0aW9uJDE7XHJcblx0XHR9XHJcblxyXG5cdFx0aWYoISBjbGFzc05hbWUgfHwgY2xhc3NOYW1lID09ICcnIHx8IHR5cGVvZiBjbGFzc05hbWUgPT09IHVuZGVmaW5lZCkge1xyXG5cdFx0XHRyZXR1cm4gZWxlbWVudDtcclxuXHRcdH1cclxuXHJcblx0XHRsZXQgY2xhc3NOYW1lcyA9IGNsYXNzTmFtZS5zcGxpdCgnICcpO1xyXG5cclxuXHRcdGNsYXNzTmFtZXMuZm9yRWFjaChmdW5jdGlvbihuYW1lKSB7XHJcblx0XHRcdGVsZW1lbnQuY2xhc3NMaXN0LmFkZChuYW1lKTtcclxuXHRcdH0pO1xyXG5cdFx0XHJcblx0XHRyZXR1cm4gZWxlbWVudDtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIENoZWNrcyBpZiBhbiBlbGVtZW50IGhhcyBhIGNsYXNzLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIEhUTUxFbGVtZW50IHwgZWxlbWVudFxyXG5cdCAqIEBwYXJhbSBzdHJpbmcgfCBjbGFzc05hbWVcclxuXHQgKiBAcmV0dXJuIGJvb2xcclxuXHQgKi9cclxuXHRzdGF0aWMgaGFzQ2xhc3MoZWxlbWVudCwgY2xhc3NOYW1lKVxyXG5cdHtcclxuXHRcdGlmIChlbGVtZW50ID09PSBudWxsKSB7XHJcblx0XHRcdHRocm93IG5ldyBJbnZhbGlkQXJndW1lbnRFeGNlcHRpb24kMSgnaGFzQ2xhc3MoKSBleHBlY3RzIHRoZSBmaXJzdCBhcmd1bWVudCB0byBiZSBhbiBIVE1MRWxlbWVudCBidXQgbnVsbCB3YXMgcGFzc2VkLicpO1xyXG5cdFx0fVxyXG5cclxuXHRcdGlmICghIGNsYXNzTmFtZSB8fCBjbGFzc05hbWUgPT0gJycgfHwgdHlwZW9mIGNsYXNzTmFtZSA9PSAndW5kZWZpbmVkJykge1xyXG5cdFx0XHRyZXR1cm47XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIGVsZW1lbnQuY2xhc3NOYW1lLmluZGV4T2YoY2xhc3NOYW1lKSAhPSAtMTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFJlbW92ZXMgY2xhc3MgZnJvbSBhIGdpdmVuIGVsZW1lbnQuXHJcblx0ICogXHJcblx0ICogQHBhcmFtIG9iamVjdCB8IGVsZW1lbnRcclxuXHQgKiBAcGFyYW0gc3RyaW5nIHwgY2xhc3NOYW1lXHJcblx0ICogQHJldHVybiBvYmplY3RcclxuXHQgKi9cclxuXHRzdGF0aWMgcmVtb3ZlQ2xhc3MoZWxlbWVudCwgY2xhc3NOYW1lKSBcclxuXHR7XHJcblx0XHRpZihlbGVtZW50ID09IG51bGwpIHtcclxuXHRcdFx0dGhyb3cgbmV3IEludmFsaWRBcmd1bWVudEV4Y2VwdGlvbiQxO1xyXG5cdFx0fVxyXG5cclxuXHRcdGlmKGNsYXNzTmFtZSA9PSAnJykge1xyXG5cdFx0XHRlbGVtZW50LmNsYXNzTmFtZSA9ICcnO1xyXG5cdFx0fSBlbHNlIHtcclxuXHJcblx0XHRcdGxldCBjbGFzc05hbWVzID0gY2xhc3NOYW1lLnNwbGl0KCcgJyk7XHJcblxyXG5cdFx0XHRjbGFzc05hbWVzLmZvckVhY2goZnVuY3Rpb24obmFtZSkge1xyXG5cdFx0XHRcdGVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShuYW1lKTtcclxuXHRcdFx0fSk7XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIGVsZW1lbnQ7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBSZW1vdmVzIGFuIGVsZW1lbnQgZnJvbSB0aGUgRE9NLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIEhUTUxFbGVtZW50XHJcblx0ICogQHJldHVybiB2b2lkXHJcblx0ICovXHJcblx0c3RhdGljIHJlbW92ZShlbGVtZW50KVxyXG5cdHtcclxuXHRcdGVsZW1lbnQucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChlbGVtZW50KTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEFkZHMgc3R5bGUgdGFnIHdpdGggZ2l2ZW4gaWQgYW5kIGNzcyB0byB0aGUgRE9NLlxyXG5cdCAqIFxyXG5cdCAqIEBwYXJhbSBzdHJpbmcgfCBpZFxyXG5cdCAqIEBwYXJhbSBzdHJpbmcgfCBjc3NcclxuXHQgKiBAcmV0dXJuIHZvaWRcclxuXHQgKi9cclxuXHRzdGF0aWMgYWRkU3R5bGUoaWQsIGNzcylcclxuXHR7XHJcblx0XHRpZiAodHlwZW9mIGNzcyAhPSAnc3RyaW5nJykge1xyXG5cdFx0XHR0aHJvdyBuZXcgSW52YWxpZEFyZ3VtZW50RXhjZXB0aW9uJDE7XHJcblx0XHR9XHJcblxyXG5cdFx0bGV0IGhlYWQgPSBkb2N1bWVudC5oZWFkIHx8IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdoZWFkJylbMF07XHJcblx0XHRsZXQgc3R5bGVUYWcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzdHlsZScpO1xyXG5cclxuXHRcdC8vIHBpcGUgaXQgdGhyb3VnaCB0aGUgbWluZmllclxyXG5cdCAgICBsZXQgQ1NTID0gdGhpcy5taW5pZnlDc3MoY3NzKTtcclxuXHQgICAgLy8gYWRkaW5nIGl0IHRvIHRoZSBzdHlsZXRhZ1xyXG5cdCAgICBzdHlsZVRhZy5pbm5lckhUTUwgPSBDU1M7XHJcblx0ICAgIC8vIGdpdmUgYW4gaWQgdG8gcmVjb2duaXplIHRoZSBzdHlsZSB0YWdcclxuXHRcdHN0eWxlVGFnLnNldEF0dHJpYnV0ZSgnaWQnLCBpZCk7XHJcblx0XHQvLyBhcHBlbmRpbmcgdGhhdCBzdHlsZSB0YWcgdG8gdGhlIERPTSBoZWFkIHRhZ1xyXG5cdFx0aGVhZC5hcHBlbmRDaGlsZChzdHlsZVRhZyk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBBZGRzIGxpbmtlZCBzdHlsZSB0YWcgd2l0aCBnaXZlbiBpZCBhbmQgc3JjIHRvIHRoZSBET00uXHJcblx0ICogXHJcblx0ICogQHBhcmFtIHN0cmluZyB8IGlkXHJcblx0ICogQHBhcmFtIHN0cmluZyB8IHNvdXJjZVxyXG5cdCAqIEByZXR1cm4gdm9pZFxyXG5cdCAqL1xyXG5cdHN0YXRpYyBhZGRMaW5rZWRTdHlsZShpZCwgc291cmNlKSBcclxuXHR7XHJcblx0XHRpZiAodHlwZW9mIHNvdXJjZSAhPSAnc3RyaW5nJykge1xyXG5cdFx0XHR0aHJvdyBuZXcgSW52YWxpZEFyZ3VtZW50RXhjZXB0aW9uJDEoJ0RPTS5hZGRMaW5rZWRTdHlsZSgpIGV4Y3BlY3RzIHRoZSBzZWNvbmQgcGFyYW1ldGVyIHRvIGJlIHN0cmluZywgYnV0ICcgKyB0eXBlb2Ygc291cmNlICsgJyB3YXMgcGFzc2VkIGluc3RlYWQuJyk7XHJcblx0XHR9XHJcblxyXG5cdFx0bGV0IGhlYWQgPSBkb2N1bWVudC5oZWFkIHx8IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdoZWFkJylbMF07XHJcblx0XHRsZXQgbGlua2VkU3R5bGVUYWcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaW5rJyk7XHJcblxyXG5cdCAgICAvLyBnaXZlIGFuIGlkIHRvIHJlY29nbml6ZSB0aGUgc3R5bGUgdGFnXHJcblx0XHRsaW5rZWRTdHlsZVRhZy5zZXRBdHRyaWJ1dGUoJ2lkJywgaWQpO1xyXG5cdFx0bGlua2VkU3R5bGVUYWcuc2V0QXR0cmlidXRlKCdocmVmJywgc291cmNlKTtcclxuXHRcdGxpbmtlZFN0eWxlVGFnLnNldEF0dHJpYnV0ZSgncmVsJywgJ3N0eWxlc2hlZXQnKTtcclxuXHRcdGxpbmtlZFN0eWxlVGFnLnNldEF0dHJpYnV0ZSgndHlwZScsICd0ZXh0L2NzcycpO1xyXG5cdFx0Ly8gYXBwZW5kaW5nIHRoYXQgc3R5bGUgdGFnIHRvIHRoZSBET00gaGVhZCB0YWdcclxuXHRcdGhlYWQuYXBwZW5kQ2hpbGQobGlua2VkU3R5bGVUYWcpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQ3JlYXRlcyBhbiBlbGVtZW50IHdpdGggdGhlIGdpdmVuIG9wdGlvbnMuXHJcblx0ICogXHJcblx0ICogQHBhcmFtIHN0cmluZyB8IGVsZW1lbnRUeXBlXHJcblx0ICogQHBhcmFtIG9iamVjdCB8IG9wdGlvbnNcclxuXHQgKiBAcmV0dXJuIEhUTUxFbGVtZW50XHJcblx0ICovXHJcblx0c3RhdGljIGNyZWF0ZUVsZW1lbnQoZWxlbWVudFR5cGUsIG9wdGlvbnMpXHJcblx0e1xyXG5cdFx0bGV0IGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KGVsZW1lbnRUeXBlKTtcclxuXHRcclxuXHRcdGlmIChvcHRpb25zID09PSB1bmRlZmluZWQpIHtcclxuXHRcdFx0cmV0dXJuIGVsZW1lbnQ7XHJcblx0XHR9XHJcblxyXG5cdFx0Zm9yIChsZXQgb3B0aW9uIGluIG9wdGlvbnMpIHtcclxuXHRcdFx0c3dpdGNoKG9wdGlvbilcclxuXHRcdFx0e1xyXG5cdFx0XHRcdGNhc2UgJ3RleHQnOlxyXG5cdFx0XHRcdGNhc2UgJ2h0bWwnOlxyXG5cdFx0XHRcdFx0ZWxlbWVudC5pbm5lckhUTUwgPSBvcHRpb25zW29wdGlvbl07XHJcblx0XHRcdFx0XHRicmVhaztcclxuXHRcdFx0XHRkZWZhdWx0OlxyXG5cdFx0XHRcdFx0ZWxlbWVudC5zZXRBdHRyaWJ1dGUob3B0aW9uLCBvcHRpb25zW29wdGlvbl0pO1xyXG5cdFx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gZWxlbWVudDtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFRvZ2dsZXMgdGhlIGdpdmVuIGNsYXNzZXMuXHJcblx0ICogXHJcblx0ICogQHBhcmFtIG9iamVjdCB8IGVsZW1lbnRcclxuXHQgKiBAcGFyYW0gc3RyaW5nIHwgY2xhc3NOYW1lXHJcblx0ICogQHJldHVybiBib29sXHJcblx0ICovXHJcblx0c3RhdGljIHRvZ2dsZUNsYXNzKGVsZW1lbnQsIGNsYXNzTmFtZSwgc2Vjb25kQ2xhc3NOYW1lKVxyXG5cdHtcclxuXHRcdGlmIChlbGVtZW50ID09IG51bGwgfHwgdHlwZW9mIGVsZW1lbnQgPT0gJ3VuZGVmaW5lZCcpIHtcclxuXHRcdFx0dGhyb3cgbmV3IEludmFsaWRBcmd1bWVudEV4Y2VwdGlvbiQxO1xyXG5cdFx0fVxyXG5cclxuXHRcdHNlY29uZENsYXNzTmFtZSA9IHNlY29uZENsYXNzTmFtZSB8fCB1bmRlZmluZWQ7XHJcblxyXG5cdFx0aWYoc2Vjb25kQ2xhc3NOYW1lKSB7XHJcblx0XHRcdGVsZW1lbnQuY2xhc3NMaXN0LnRvZ2dsZShzZWNvbmRDbGFzc05hbWUpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiBlbGVtZW50LmNsYXNzTGlzdC50b2dnbGUoY2xhc3NOYW1lKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEZpbmRzIGFuIGVsZW1lbnQgaW5zaWRlIG9mIHBhcmVudC5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSBzdHJpbmcgfCBzZWxlY3RvclxyXG5cdCAqIEBwYXJhbSBvYmplY3QgfCBjb250ZXh0XHJcblx0ICogQHJldHVybiBtaXhlZFxyXG5cdCAqL1xyXG5cdHN0YXRpYyBmaW5kKHNlbGVjdG9yLCBjb250ZXh0ID0gd2luZG93LmRvY3VtZW50KSBcclxuXHR7XHJcblx0XHRyZXR1cm4gcXVlcnlFbGVtZW50KHNlbGVjdG9yLCBjb250ZXh0KTtcclxuXHR9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBRdWVyaWVzIGFuIGVsZW1lbnQgZnJvbSB0aGUgRE9NLlxyXG4gKlxyXG4gKiBAcGFyYW0gc3RyaW5nIHwgc2VsZWN0b3JcclxuICogQHBhcmFtIG9iamVjdCB8IHBhcmVudEVsZW1lbnRcclxuICogQHJldHVybiBtaXhlZFxyXG4gKi9cclxuZnVuY3Rpb24gcXVlcnlFbGVtZW50KHNlbGVjdG9yLCBwYXJlbnRFbGVtZW50KSBcclxue1xyXG5cdGlmICh0eXBlb2Ygc2VsZWN0b3IgIT0gJ3N0cmluZycpIHtcclxuXHRcdHRocm93IG5ldyBJbnZhbGlkQXJndW1lbnRFeGNlcHRpb24kMSgncXVlcnlFbGVtZW50KCkgZXhwZWN0cyBmaXJzdCBwYXJhbWV0ZXIgdG8gYmUgYSBzdHJpbmcsIGJ1dCAnICsgdHlwZW9mIHNlbGVjdG9yICsgJyB3YXMgcGFzc2VkIGluc3RlYWQuJyk7XHJcblx0fVxyXG5cclxuXHRsZXQgZWxlbWVudCA9IHBhcmVudEVsZW1lbnQucXVlcnlTZWxlY3RvckFsbChzZWxlY3Rvcik7XHJcblxyXG5cdGlmIChlbGVtZW50Lmxlbmd0aCA9PSAwKSB7XHJcblx0XHRyZXR1cm4gbnVsbDtcclxuXHR9XHJcblxyXG5cdHJldHVybiAoZWxlbWVudC5sZW5ndGggPiAxKSA/IGVsZW1lbnQgOiBlbGVtZW50WzBdO1xyXG59XHJcblxyXG4vKipcclxuICogQ2hlY2tzIGlmIHBhcmVudCBoYXMgY2hpbGQuXHJcbiAqXHJcbiAqIEBwYXJhbSBvYmplY3QgfCBwYXJlbnRFbGVtZW50XHJcbiAqIEBwYXJhbSBvYmplY3QgfCBjaGlsZEVsZW1lbnRcclxuICogQHJldHVybiBib29sXHJcbiAqL1xyXG5mdW5jdGlvbiBoYXNDaGlsZChwYXJlbnRFbGVtZW50LCBjaGlsZEVsZW1lbnQpIFxyXG57XHJcbiAgICAgbGV0IG5vZGUgPSBjaGlsZEVsZW1lbnQucGFyZW50Tm9kZTtcclxuICAgICBcclxuICAgICB3aGlsZSAobm9kZSAhPSBudWxsKSB7XHJcbiAgICAgICAgIGlmIChub2RlID09IHBhcmVudEVsZW1lbnQpIHtcclxuICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICB9XHJcbiAgICAgICAgIG5vZGUgPSBub2RlLnBhcmVudE5vZGU7XHJcbiAgICAgfVxyXG4gICAgIFxyXG4gICAgIHJldHVybiBmYWxzZTtcclxufVxuXG4vKipcclxuICogQGZpbGUgXHJcbiAqIENvbW1vbiBjbGFzcy5cclxuICpcclxuICogQWRkcyBzb21lIHVzZWZ1bCBmdW5jdGlvbmFsaXR5IGZvclxyXG4gKiBjb21tb24gdGFza3MgLSBkYXRhIGNoZWNrcyBvciBkYXRhIG1hbmlwdWxhdGlvbi5cclxuICovXHJcblxyXG5jbGFzcyBDb21tb25cclxue1xyXG5cdC8qKlxyXG5cdCAqIEV4dGVuZCBhbiBvYmplY3QuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gb2JqZWN0IHwgY3VycmVudE9iamVjdFxyXG5cdCAqIEBwYXJhbSBvYmplY3QgfCBuZXdPYmplY3RcclxuXHQgKiBAcmV0dXJuIG9iamVjdFxyXG5cdCAqL1xyXG5cdHN0YXRpYyBleHRlbmQoY3VycmVudE9iamVjdCwgbmV3T2JqZWN0KSB7XHJcblx0XHR2YXIgZXh0ZW5kZWQgPSB7fTtcclxuXHQgICAgdmFyIHByb3A7XHJcblxyXG5cdCAgICBmb3IgKHByb3AgaW4gY3VycmVudE9iamVjdCkge1xyXG5cdCAgICAgICAgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChjdXJyZW50T2JqZWN0LCBwcm9wKSkge1xyXG5cdCAgICAgICAgICAgIGV4dGVuZGVkW3Byb3BdID0gY3VycmVudE9iamVjdFtwcm9wXTtcclxuXHQgICAgICAgIH1cclxuXHQgICAgfVxyXG5cclxuXHQgICAgZm9yIChwcm9wIGluIG5ld09iamVjdCkge1xyXG5cdCAgICAgICAgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChuZXdPYmplY3QsIHByb3ApKSB7XHJcblx0ICAgICAgICAgICAgZXh0ZW5kZWRbcHJvcF0gPSBuZXdPYmplY3RbcHJvcF07XHJcblx0ICAgICAgICB9XHJcblx0ICAgIH1cclxuXHJcblx0ICAgIHJldHVybiBleHRlbmRlZDtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIENoZWNrcyBmb3IgYSBuZWVkbGUgaW4gaHlzdGFjayBhcnJheS5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSBtaXhlZCB8IG5lZWRsZVxyXG5cdCAqIEBwYXJhbSBvYmplY3QgfCBvYmplY3RcclxuXHQgKiBAcmV0dXJuIGJvb2xcclxuXHQgKlxyXG5cdCAqL1xyXG5cdHN0YXRpYyBpbl9hcnJheShuZWVkbGUsIGh5c3RhY2spIHtcclxuXHRcdGlmICh0eXBlb2YgaHlzdGFjayA9PSAndW5kZWZpbmVkJyB8fCBoeXN0YWNrLmNvbnN0cnVjdG9yICE9PSBBcnJheSkge1xyXG5cdFx0XHR0aHJvdyBuZXcgSW52YWxpZEFyZ3VtZW50RXhjZXB0aW9uJDEoJ0NvbW1vbi5pbl9hcnJheSgpIGV4cGVjdHMgdGhlIHNlY29uZCBwYXJhbWV0ZXIgdG8gYmUgYW4gYXJyYXksIGJ1dCAnICsgdHlwZW9mIGh5c3RhY2sgKyAnIHdhcyBwYXNzZCBpbnN0ZWFkJyk7XHJcblx0XHR9XHJcblxyXG5cdFx0Zm9yICh2YXIgaSA9IDA7IGkgPD0gaHlzdGFjay5sZW5ndGg7IGkrKykge1xyXG5cdFx0XHRpZiAobmVlZGxlID09IGh5c3RhY2tbaV0pIHtcclxuXHRcdFx0XHRyZXR1cm4gdHJ1ZTtcdFxyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0XHJcblx0XHRyZXR1cm4gZmFsc2U7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBUYWtlcyBhbiBhcnJheSBhbmQgY2h1bmtzIGl0LlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIGFycmF5IHwgdG90YWxcclxuXHQgKiBAcGFyYW0gbnVtYmVyIHwgY2h1bmtzXHJcblx0ICogQHJldHVybiBhcnJheVxyXG5cdCAqL1xyXG5cdHN0YXRpYyBhcnJheV9jaHVuayh0b3RhbCwgc2l6ZSA9IDUpXHJcblx0eyAgICAgICAgXHJcbiAgICAgIFx0aWYgKGlzTmFOKHNpemUpKSB7XHJcbiAgICAgIFx0XHR0aHJvdyBuZXcgSW52YWxpZEFyZ3VtZW50RXhjZXB0aW9uJDEoJ0NvbW1vbi5hcnJheV9jaHVuaygpIGV4cGVjdHMgdGhlIHNlY29uZCBwYXJhbWV0ZXIgdG8gYmUgYSBudW1iZXIsIGJ1dCAnICsgdHlwZW9mIHNpemUgKyAnIHBhc3NlZCBpbnN0ZWFkLicpXHJcbiAgICAgIFx0fVxyXG5cclxuICAgICAgXHRzaXplID0gcGFyc2VJbnQoc2l6ZSk7XHJcbiAgICAgICBcclxuICAgICAgIFx0bGV0IGk7XHJcbiAgICAgICBcdGxldCBjb2xsZWN0aW9uID0gW107XHJcblxyXG4gICAgICAgIC8vIGFkZCBlYWNoIGNodW5rIHRvIHRoZSByZXN1bHRcclxuICAgICAgICBmb3IgKGkgPSAwOyBpIDwgTWF0aC5jZWlsKHRvdGFsLmxlbmd0aCAvIHNpemUpOyBpKyspIHtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHZhciBzdGFydCA9IGkgKiBzaXplO1xyXG4gICAgICAgICAgICB2YXIgZW5kID0gc3RhcnQgKyBzaXplO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgY29sbGVjdGlvbi5wdXNoKHRvdGFsLnNsaWNlKHN0YXJ0LCBlbmQpKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIHJldHVybiBjb2xsZWN0aW9uO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQ2hlY2tzIGlmIGFuIG9iamVjdCBpcyBlbXB0eS5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSBvYmplY3QgfCBvYmplY3RcclxuXHQgKiBAcmV0dXJuIGJvb2xcclxuXHQgKi9cclxuXHRzdGF0aWMgZW1wdHlPYmplY3Qob2JqZWN0KSB7XHJcblx0XHRmb3IgKGxldCBwcm9wIGluIG9iamVjdCkge1xyXG5cdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIHRydWU7XHJcblx0fVxyXG5cclxuXHJcblx0LyoqXHJcblx0ICogQ2hlY2tzIGlmIGEgZ2l2ZW4gb2JqZWN0IGNvbnRhaW5lZCBpbiBhbiBhcnJheS5cclxuXHQgKiBcclxuXHQgKiBAcGFyYW0gb2JqZWN0IHwgb2JqZWN0XHJcblx0ICogQHBhcmFtIGFycmF5IHwgaGF5c3RhY2tcclxuXHQgKiBAcmV0dXJuIGJvb2xcclxuXHQgKi9cclxuXHRzdGF0aWMgY29udGFpbnNPYmplY3Qob2JqZWN0LCBoeXN0YWNrKSBcclxuXHR7XHJcblx0ICAgIGxldCBpO1xyXG5cclxuXHQgICAgZm9yIChpID0gMDsgaSA8IGh5c3RhY2subGVuZ3RoOyBpKyspIHtcclxuXHQgICAgICAgIGlmICh0eXBlb2Ygb2JqZWN0ID09ICdzdHJpbmcnICYmIGh5c3RhY2tbaV0uY29uc3RydWN0b3IubmFtZSA9PT0gb2JqZWN0KSB7XHJcblx0ICAgICAgICBcdHJldHVybiB0cnVlO1xyXG5cdCAgICAgICAgfVxyXG5cclxuXHQgICAgICAgIGlmIChoeXN0YWNrW2ldID09PSBvYmplY3QpIHtcclxuXHQgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuXHQgICAgICAgIH1cclxuXHQgICAgfVxyXG5cclxuXHQgICAgcmV0dXJuIGZhbHNlO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQ2hlY2tzIGlmIGEgZ2l2ZW4gcGFyYW1ldGVyIGlzIGFuIG9iamVjdC5cclxuXHQgKiBcclxuXHQgKiBAcGFyYW0gb2JqZWN0IHwgb2JqZWN0XHJcblx0ICogQHJldHVybiBib29sXHJcblx0ICovXHJcblx0c3RhdGljIGlzT2JqZWN0KG9iamVjdCkgXHJcblx0e1xyXG5cdFx0cmV0dXJuIHR5cGVvZiBvYmplY3QgPT0gJ29iamVjdCc7XHJcblx0fVxyXG59XG5cbmxldCBkZWZhdWx0TWVzc2FnZSQxID0gJ1RoZSBkYXRhIHN0cnVjdHVyZSBpcyBpbnZhbGlkJztcclxuXHJcbmNsYXNzIEludmFsaWREYXRhU3RydWN0dXJlRXhjZXB0aW9uIGV4dGVuZHMgRXhjZXB0aW9uSGFuZGxlclxyXG57XHJcblx0Y29uc3RydWN0b3IobWVzc2FnZSA9IG51bGwpIFxyXG5cdHtcclxuXHRcdG1lc3NhZ2UgPSBtZXNzYWdlIHx8IGRlZmF1bHRNZXNzYWdlJDE7XHJcblx0XHRzdXBlcihtZXNzYWdlKTtcclxuICAgIFx0c3VwZXIuc3RhY2tUcmFjZSh0aGlzLCBtZXNzYWdlKTtcclxuICAgIH1cclxufVxuXG4vKipcclxuICogQGZpbGUgXHJcbiAqIFJlcXVlc3QgY2xhc3MuXHJcbiAqXHJcbiAqIEhhbmRsZXMgYWpheCByZXF1ZXN0cyBQT1NULCBHRVQgZXRjLi4uXHJcbiAqL1xyXG5cclxuLyoqXHJcbiAqIFN0b3JlcyB0aGUgZGVmYXVsdCBzZXR0aW5ncy5cclxuICpcclxuICogQHZhciBvYmplY3RcclxuICovXHJcblxyXG5sZXQgZGVmYXVsdFNldHRpbmdzID0ge1xyXG5cdGhlYWRlcnM6IHtcclxuXHRcdCdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbidcclxuXHR9LFxyXG5cdGFzeW5jOiB0cnVlXHJcbn07XHJcblxyXG5jbGFzcyBSZXF1ZXN0XHJcbntcclxuXHQvKipcclxuXHQgKiAtIEluaXRpYWxpemUgdGhlIHNldHRpbmdzIG9iamVjdC5cclxuXHQgKiAtIEluaXRpYWxpemUgdGhlIHhociBvYmplY3QuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gb2JqZWN0IHwgc2V0dGluZ3NcclxuXHQgKiBAcmV0dXJuIHZvaWRcclxuXHQgKi9cclxuXHRjb25zdHJ1Y3RvcihzZXR0aW5ncylcclxuXHR7XHJcblx0XHR0aGlzLnNldHRpbmdzID0gQ29tbW9uLmV4dGVuZChkZWZhdWx0U2V0dGluZ3MsIHNldHRpbmdzKTtcclxuXHRcdHRoaXMuc2V0RGVmYXVsdFJlcXVlc3RIZWFkZXIoKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFNldHMgdGhlIGRlZmF1bHQgcmVxdWVzdCBoZWFkZXJzLlxyXG5cdCAqXHJcblx0ICogQHJldHVybiB2b2lkXHJcblx0ICovXHJcblx0c2V0RGVmYXVsdFJlcXVlc3RIZWFkZXIoKVxyXG5cdHtcclxuXHRcdGxldCBoZWFkZXI7XHJcblx0XHRsZXQgaGVhZGVycyA9IHRoaXMuc2V0dGluZ3MuaGVhZGVycztcclxuXHRcdGxldCBhc3luYyA9IHRoaXMuc2V0dGluZ3MuYXN5bmM7XHJcblx0XHRsZXQgb3BlbiA9IFhNTEh0dHBSZXF1ZXN0LnByb3RvdHlwZS5vcGVuO1xyXG5cdFx0bGV0IHNldFJlcXVlc3RIZWFkZXIgPSBYTUxIdHRwUmVxdWVzdC5wcm90b3R5cGUuc2V0UmVxdWVzdEhlYWRlcjtcclxuXHJcblx0XHRYTUxIdHRwUmVxdWVzdC5wcm90b3R5cGUub3BlbiA9IGZ1bmN0aW9uKCkge1xyXG5cdFx0XHR2YXIgcmVzcG9uc2UgPSBvcGVuLmFwcGx5KHRoaXMsIGFyZ3VtZW50cywgYXN5bmMpO1xyXG5cclxuXHRcdFx0Zm9yIChoZWFkZXIgaW4gaGVhZGVycykge1xyXG5cdFx0XHRcdHRoaXMuc2V0UmVxdWVzdEhlYWRlcihoZWFkZXIsIGhlYWRlcnNbaGVhZGVyXSk7XHJcblx0XHRcdH1cclxuXHJcblx0ICBcdFx0cmV0dXJuIHJlc3BvbnNlO1xyXG5cdFx0fTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIE1ha2VzIGEgUE9TVCByZXF1ZXN0LlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIG9iamVjdCB8IG9wdGlvbnNcclxuXHQgKiBAcmV0dXJuIFByb21pc2VcclxuXHQgKi9cclxuXHRwb3N0KG9wdGlvbnMpXHJcblx0e1xyXG5cdFx0bGV0IHhociA9IHRoaXMueGhyO1xyXG5cclxuXHRcdGlmKG9wdGlvbnMuaGFzT3duUHJvcGVydHkoJ2JlZm9yZScpICYmIHR5cGVvZiBvcHRpb25zLmJlZm9yZSA9PSAnZnVuY3Rpb24nKSB7XHJcblx0XHRcdG9wdGlvbnMuYmVmb3JlLmNhbGwodGhpcyk7XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xyXG5cdFx0XHRpZih0eXBlb2Ygb3B0aW9ucyAhPT0gJ29iamVjdCcpIHtcclxuXHRcdFx0XHR0aHJvdyBuZXcgRXJyb3IoJ2dldCBleHBlY3RpbmcgYSBqc29uIG9iamVjdCB0byBiZSBwYXNzZWQgYXMgYW4gYXJndW1lbnQsIGJ1dCAnKyB0eXBlb2Ygb3B0aW9ucyArICcgd2FzIHBhc3NlZC4nKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0b3B0aW9ucy5kYXRhID0gb3B0aW9ucy5kYXRhIHx8IHt9O1xyXG5cclxuXHRcdFx0aWYodHlwZW9mIG9wdGlvbnMuZGF0YSAhPT0gJ29iamVjdCcpIHtcclxuXHRcdFx0XHR0aHJvdyBuZXcgRXJyb3IoJ2RhdGEgcHJvcGVydHkgZXhwZWN0aW5nIGEganNvbiBvYmplY3QgdG8gYmUgcGFzc2VkIGFzIGFuIGFyZ3VtZW50LCBidXQgJyArIHR5cGVvZiBvcHRpb25zLmRhdGEgKyAnIHdhcyBwYXNzZWQuJyk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHhoci5vcGVuKCdQT1NUJywgb3B0aW9ucy51cmwsIHRydWUpO1xyXG5cclxuXHRcdFx0eGhyLnJlc3BvbnNlVHlwZSA9IG9wdGlvbnMuZGF0YVR5cGUgfHwgJ2pzb24nO1xyXG5cdFx0XHR4aHIudGltZW91dCA9IG9wdGlvbnMudGltZW91dCB8fCAzMDAwO1xyXG5cclxuXHRcdFx0eGhyLm9ucmVhZHlzdGF0ZWNoYW5nZSA9IGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRcdGlmICh0aGlzLnJlYWR5U3RhdGUgPT0gNCAmJiAodGhpcy5zdGF0dXMgPj0gNDAwICYmIHRoaXMuc3RhdHVzIDw9IDUwMCkpIHtcclxuXHRcdFx0ICAgIFx0cmVqZWN0KHRoaXMucmVzcG9uc2VUZXh0KTtcclxuXHRcdFx0ICAgIH1cclxuXHRcdFx0ICAgIFxyXG5cdFx0XHQgICAgaWYgKHRoaXMucmVhZHlTdGF0ZSAhPSA0IHx8IHRoaXMuc3RhdHVzICE9IDIwMCkge1xyXG5cdFx0XHQgICAgXHRyZXR1cm47XHJcblx0XHRcdCAgICB9XHJcblx0ICAgICAgIFx0XHJcbiAgICAgICBcdFx0XHRyZXNvbHZlKHRoaXMucmVzcG9uc2UpO1xyXG4gICAgICAgXHRcdFx0XHJcbiAgICAgICBcdFx0XHRpZiAob3B0aW9ucy5oYXNPd25Qcm9wZXJ0eSgnYWZ0ZXInKSAmJiB0eXBlb2Ygb3B0aW9ucy5hZnRlciA9PSAnZnVuY3Rpb24nKSB7XHJcblx0XHRcdFx0XHRvcHRpb25zLmFmdGVyLmNhbGwodGhpcyk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9O1xyXG5cclxuXHRcdFx0eGhyLm9uZXJyb3IgPSBmdW5jdGlvbihtZXNzYWdlKSB7XHJcblx0XHRcdFx0aWYob3B0aW9ucy5oYXNPd25Qcm9wZXJ0eSgnZXJyb3InKSAmJiB0eXBlb2Ygb3B0aW9ucy5lcnJvciA9PSAnZnVuY3Rpb24nKSB7XHJcblx0XHRcdFx0XHRvcHRpb25zLmVycm9yKG1lc3NhZ2UpO1xyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0cmVqZWN0KG1lc3NhZ2UpO1xyXG5cdFx0XHR9O1xyXG5cclxuXHRcdFx0aWYoISBvcHRpb25zLmRhdGEpIHtcclxuXHRcdFx0XHR4aHIuc2VuZChudWxsKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0dmFyIHF1ZXJ5U3RyaW5nID0gT2JqZWN0LmtleXMob3B0aW9ucy5kYXRhKS5tYXAoZnVuY3Rpb24oa2V5KSB7XHJcblx0XHQgICAgICAgICAgICByZXR1cm4gZW5jb2RlVVJJQ29tcG9uZW50KGtleSkgKyAnPScgK1xyXG5cdFx0ICAgICAgICAgICAgICAgIFx0ZW5jb2RlVVJJQ29tcG9uZW50KG9wdGlvbnMuZGF0YVtrZXldKTtcclxuXHRcdCAgICAgICAgXHR9KS5qb2luKCcmJyk7XHJcblxyXG5cdFx0XHR4aHIuc2VuZChxdWVyeVN0cmluZyk7XHJcblx0XHR9KTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIE1ha2VzIGEgR0VUIGFqYXggcmVxdWVzdC5cclxuXHQgKiBcclxuXHQgKiBAcGFyYW0gb2JqZWN0IHwgb3B0aW9uc1xyXG5cdCAqIEByZXR1cm4gUHJvbWlzZVxyXG5cdCAqL1xyXG5cdGdldChvcHRpb25zKVxyXG5cdHtcclxuXHRcdGxldCB4aHIgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKSB8fCBuZXcgQWN0aXZlWE9iamVjdChcIk1pY3Jvc29mdC5YTUxIVFRQXCIpO1x0XHRcdFxyXG5cclxuXHRcdGlmIChvcHRpb25zLmhhc093blByb3BlcnR5KCdiZWZvcmUnKSAmJiB0eXBlb2Ygb3B0aW9ucy5iZWZvcmUgPT0gJ2Z1bmN0aW9uJykge1xyXG5cdFx0XHRvcHRpb25zLmJlZm9yZS5jYWxsKHRoaXMpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcclxuXHRcdFx0aWYgKHR5cGVvZiBvcHRpb25zICE9PSAnb2JqZWN0Jykge1xyXG5cdFx0XHRcdHRocm93IG5ldyBFcnJvcignZ2V0IGV4cGVjdGluZyBhIGpzb24gb2JqZWN0IHRvIGJlIHBhc3NlZCBhcyBhbiBhcmd1bWVudCwgYnV0ICcrIHR5cGVvZiBvcHRpb25zICsgJyB3YXMgcGFzc2VkLicpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRvcHRpb25zLmRhdGEgPSBvcHRpb25zLmRhdGEgfHwge307XHJcblxyXG5cdFx0XHRpZiAodHlwZW9mIG9wdGlvbnMuZGF0YSAhPT0gJ29iamVjdCcpIHtcclxuXHRcdFx0XHR0aHJvdyBuZXcgRXJyb3IoJ2RhdGEgcHJvcGVydHkgZXhwZWN0aW5nIGEganNvbiBvYmplY3QgdG8gYmUgcGFzc2VkIGFzIGFuIGFyZ3VtZW50LCBidXQgJyArIHR5cGVvZiBvcHRpb25zLmRhdGEgKyAnIHdhcyBwYXNzZWQuJyk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHhoci5vcGVuKCdHRVQnLCBvcHRpb25zLnVybCwgdHJ1ZSk7XHJcblxyXG5cdFx0XHR4aHIucmVzcG9uc2VUeXBlID0gb3B0aW9ucy5kYXRhVHlwZSB8fCAnanNvbic7XHJcblx0XHRcdHhoci50aW1lb3V0ID0gb3B0aW9ucy50aW1lb3V0IHx8IDMwMDA7XHJcblxyXG5cdFx0XHRpZiAoeGhyLnJlc3BvbnNlVHlwZSA9PSAnanNvbicpIHtcclxuXHRcdFx0XHR4aHIuc2V0UmVxdWVzdEhlYWRlcignQ29udGVudC1UeXBlJywgJ2FwcGxpY2F0aW9uL2pzb24nKTtcclxuXHRcdFx0XHR4aHIuc2V0UmVxdWVzdEhlYWRlcignQWNjZXB0JywgJ2FwcGxpY2F0aW9uL2pzb24nKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0aWYgKHhoci5yZXNwb25zZVR5cGUgPT0gJ2RvY3VtZW50Jykge1xyXG5cdFx0XHRcdHhoci5vdmVycmlkZU1pbWVUeXBlKCd0ZXh0L3htbCcpO1xyXG5cdFx0XHRcdHhoci5zZXRSZXF1ZXN0SGVhZGVyKCdDb250ZW50LVR5cGUnLCAndGV4dC9odG1sJyk7XHJcblx0XHRcdFx0eGhyLnNldFJlcXVlc3RIZWFkZXIoJ0FjY2VwdCcsICd0ZXh0L2h0bWwnKTtcdFxyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHR4aHIub25yZWFkeXN0YXRlY2hhbmdlID0gZnVuY3Rpb24oKSB7XHJcblx0XHRcdCAgICBpZiAodGhpcy5yZWFkeVN0YXRlID09IDQgJiYgKHRoaXMuc3RhdHVzID49IDQwMCAmJiB0aGlzLnN0YXR1cyA8PSA1MDApKSB7XHJcblx0XHRcdCAgICBcdHJlamVjdCh0aGlzLnJlc3BvbnNlVGV4dCk7XHJcblx0XHRcdCAgICB9XHJcblx0XHRcdCAgIFxyXG5cdFx0XHQgICAgaWYgKHRoaXMucmVhZHlTdGF0ZSA9PSA0ICYmIHRoaXMuc3RhdHVzID09IDIwMCkge1xyXG5cdFx0XHRcdCAgICBsZXQgcmVzcG9uc2UgPSB0aGlzLnJlc3BvbnNlIHx8IHRoaXMucmVzcG9uc2VUZXh0O1xyXG5cdFx0XHRcdCAgICByZXNwb25zZSA9ICh4aHIucmVzcG9uc2VUeXBlID09ICdqc29uJyAmJiB0eXBlb2YgcmVzcG9uc2UgIT0gJ29iamVjdCcpID8gSlNPTi5wYXJzZShyZXNwb25zZSkgOiByZXNwb25zZTtcclxuXHRcdFx0XHQgICAgcmVzb2x2ZShyZXNwb25zZSk7XHJcblx0ICAgICAgIFx0XHRcdFxyXG5cdCAgICAgICBcdFx0XHRpZiAob3B0aW9ucy5oYXNPd25Qcm9wZXJ0eSgnYWZ0ZXInKSAmJiB0eXBlb2Ygb3B0aW9ucy5hZnRlciA9PSAnZnVuY3Rpb24nKSB7XHJcblx0XHRcdFx0XHRcdG9wdGlvbnMuYWZ0ZXIuY2FsbCh0aGlzKTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9XHJcblx0XHRcdH07XHJcblxyXG5cdFx0XHR4aHIub25hYm9ydCA9IHhoci5vbmVycm9yID0gZnVuY3Rpb24obWVzc2FnZSkge1xyXG5cdFx0XHRcdGlmIChvcHRpb25zLmhhc093blByb3BlcnR5KCdlcnJvcicpICYmIHR5cGVvZiBvcHRpb25zLmVycm9yID09ICdmdW5jdGlvbicpIHtcclxuXHRcdFx0XHRcdG9wdGlvbnMuZXJyb3IobWVzc2FnZSk7XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRyZWplY3QobWVzc2FnZSk7XHJcblx0XHRcdH07XHJcblxyXG5cdFx0XHRpZiAoISBvcHRpb25zLmRhdGEpIHtcclxuXHRcdFx0XHR4aHIuc2VuZChudWxsKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0dmFyIHF1ZXJ5U3RyaW5nID0gT2JqZWN0LmtleXMob3B0aW9ucy5kYXRhKS5tYXAoZnVuY3Rpb24oa2V5KSB7XHJcblx0XHQgICAgICAgICAgICByZXR1cm4gZW5jb2RlVVJJQ29tcG9uZW50KGtleSkgKyAnPScgK1xyXG5cdFx0ICAgICAgICAgICAgICAgIFx0ZW5jb2RlVVJJQ29tcG9uZW50KG9wdGlvbnMuZGF0YVtrZXldKTtcclxuXHRcdCAgICAgICAgXHR9KS5qb2luKCcmJyk7XHJcblxyXG5cdFx0XHR4aHIuc2VuZChxdWVyeVN0cmluZyk7XHJcblx0XHR9KTtcclxuXHR9XHJcbn1cblxubGV0IGRlZmF1bHRNZXNzYWdlJDIgPSAnVGhlIGV2ZW50IHlvdSBjYWxsZWQgZG9lcyBub3QgZXhpc3RzIG9yIHlvdSBzdXBwbGllZCB3cm9uZyBhcmd1bWVudCc7XHJcblxyXG5jbGFzcyBCYWRFdmVudENhbGxFeGNlcHRpb24gZXh0ZW5kcyBFeGNlcHRpb25IYW5kbGVyXHJcbntcclxuXHRjb25zdHJ1Y3RvcihtZXNzYWdlID0gbnVsbCkgXHJcblx0e1xyXG5cdFx0bWVzc2FnZSA9IG1lc3NhZ2UgfHwgZGVmYXVsdE1lc3NhZ2UkMjtcclxuXHRcdHN1cGVyKG1lc3NhZ2UpO1xyXG4gICAgXHRzdXBlci5zdGFja1RyYWNlKHRoaXMsIG1lc3NhZ2UpO1xyXG4gICAgfVxyXG59XG5cbi8qKlxyXG4gKiBAZmlsZSBcclxuICogRXZlbnRNYW5hZ2VyIGNsYXNzLlxyXG4gKlxyXG4gKiBIYW5kbGVzIHN1YnNjcmlwaW9ucyBhbmQgcHVibGlzaGluZyBvZiBldmVudHMuXHJcbiAqL1xyXG5cclxuY2xhc3MgRXZlbnRNYW5hZ2VyXHJcbntcclxuXHQvKipcclxuXHQgKiBTdG9yZXMgdGhlIGV2ZW50cyBjYWxsYmFja3MuXHJcblx0ICogXHJcblx0ICogQHZhciBhcnJheVxyXG5cdCAqL1xyXG5cdGNvbnN0cnVjdG9yKClcclxuXHR7XHJcblx0XHR0aGlzLmV2ZW50cyA9IHt9O1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogU3Vic2NyaWJpbmcgdG8gYW4gZXZlbnQuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gc3RyaW5nIHwgbmFtZVxyXG5cdCAqIEBwYXJhbSBmdW5jdGlvbiB8IGNhbGxiYWNrXHJcblx0ICogQHJldHVybiB2b2lkXHJcblx0ICovXHJcblx0c3Vic2NyaWJlKG5hbWUsIGNhbGxiYWNrKSBcclxuXHR7XHJcblx0XHRpZiAodHlwZW9mIGNhbGxiYWNrICE9PSAnZnVuY3Rpb24nKSB7XHJcblx0XHRcdHRocm93IG5ldyBJbnZhbGlkQXJndW1lbnRFeGNlcHRpb247XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKHR5cGVvZiB0aGlzLmV2ZW50c1tuYW1lXSA9PSAndW5kZWZpbmVkJykge1xyXG5cdFx0XHR0aGlzLmV2ZW50c1tuYW1lXSA9IFtdO1xyXG5cdFx0fVxyXG5cclxuXHRcdHRoaXMuZXZlbnRzW25hbWVdLnB1c2goY2FsbGJhY2spO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogUHVibGlzaCBhbiBldmVudCB0byBhbGwgc3Vic2NyaWJlcnMuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gc3RyaW5nIHwgbmFtZVxyXG5cdCAqIEBwYXJhbSBsaXN0IHwgZGF0YVxyXG5cdCAqIEByZXR1cm4gdm9pZFxyXG5cdCAqL1xyXG5cdHB1Ymxpc2gobmFtZSwgLi4uZGF0YSkgXHJcblx0e1xyXG5cdFx0ZGF0YSA9IGRhdGEgfHwgbnVsbDtcclxuXHJcblx0XHQvLyBJZiB0aGVyZSBhcmUgbm8gc3Vic2NyaWJlcnMgc2ltcGx5IGlnbm9yZSB0aGF0IGV2ZW50LlxyXG5cdFx0aWYgKHR5cGVvZiB0aGlzLmV2ZW50c1tuYW1lXSA9PSAndW5kZWZpbmVkJykge1xyXG5cdFx0XHRyZXR1cm47XHJcblx0XHR9XHJcblxyXG5cdFx0dGhpcy5ldmVudHNbbmFtZV0uZm9yRWFjaChmdW5jdGlvbihjYWxsYmFjaykge1xyXG5cdFx0XHRpZih0eXBlb2YgY2FsbGJhY2sgIT0gJ2Z1bmN0aW9uJykge1xyXG5cdFx0XHRcdHRocm93IG5ldyBJbnZhbGlkQXJndW1lbnRFeGNlcHRpb24oJ3N1YnNjcmliZSgpIHNob3VsZCByZWNpZXZlIGNhbGxiYWNrIGFzIHNlY29uZCBwYXJhbWV0ZXIsIGJ1dCAnKyB0eXBlb2YgY2FsbGJhY2sgKycgd2FzIHBhc3NlZCcpO1xyXG5cdFx0XHR9XHJcblx0XHRcdFxyXG5cdFx0XHRyZXR1cm4gY2FsbGJhY2soLi4uZGF0YSk7XHJcblx0XHR9KTtcclxuXHR9XHJcbn1cblxuLyoqXHJcbiAqIEBmaWxlIFxyXG4gKiBDb29raWUgY2xhc3MuXHJcbiAqXHJcbiAqIEFkZHMgc29tZSB1c2VmdWwgZnVuY3Rpb25hbGl0eSBmb3JcclxuICogc2V0dGluZyBvciBnZXR0aW5nIGNvb2tpZXMuXHJcbiAqL1xyXG5cdFxyXG5jbGFzcyBDb29raWVcclxue1xyXG5cdC8qKlxyXG4gXHQqIFNldHMgYSBjb29raWUuXHJcbiBcdCogXHJcbiBcdCogQHBhcmFtIHN0cmluZyB8IG5hbWVcclxuIFx0KiBAcGFyYW0gSlNPTiB8IHZhbHVlXHJcbiBcdCogQHBhcmFtIGludGVnZXIgfCBkYXlzXHJcbiBcdCogQHJldHVybiB2b2lkXHJcblx0Ki9cclxuXHRzdGF0aWMgc2V0KG5hbWUsIHZhbHVlLCBkYXlzKSBcclxuXHR7XHJcblx0XHRpZiAodmFsdWUuY29uc3RydWN0b3IubmFtZSAgPT0gJ09iamVjdCcgfHwgdmFsdWUuY29uc3RydWN0b3IubmFtZSA9PSAnQXJyYXknKSB7XHJcblx0XHRcdHZhbHVlID0gSlNPTi5zdHJpbmdpZnkodmFsdWUpO1xyXG5cdFx0fVxyXG5cclxuXHRcdGRheXMgPSBkYXlzIHx8IDEwO1xyXG5cclxuXHQgICAgbGV0IGV4cGlyZXM7XHJcblx0ICAgIFxyXG5cdCAgICBpZiAoZGF5cykge1xyXG5cdCAgICAgICAgbGV0IGRhdGUgPSBuZXcgRGF0ZSgpO1xyXG5cdCAgICAgICAgZGF0ZS5zZXRUaW1lKGRhdGUuZ2V0VGltZSgpICsgKGRheXMgKiAyNCAqIDYwICogNjAgKiAxMDAwKSk7XHJcblx0ICAgICAgICBleHBpcmVzID0gXCI7IGV4cGlyZXM9XCIgKyBkYXRlLnRvR01UU3RyaW5nKCk7XHJcblx0ICAgIH0gZWxzZSB7XHJcblx0ICAgICAgICBleHBpcmVzID0gXCJcIjtcclxuXHQgICAgfVxyXG5cclxuXHQgICAgZG9jdW1lbnQuY29va2llID0gbmFtZSArIFwiPVwiICsgdmFsdWUgKyBleHBpcmVzICsgXCI7IHBhdGg9L1wiO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogUmV0cmlldmVzIHRoZSBjb29raWUgYnkgbmFtZS5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSBzdHJpbmcgfCBuYW1lXHJcbiBcdCAqIEByZXR1cm4gSlNPTlxyXG5cdCAqL1xyXG5cdHN0YXRpYyBnZXQobmFtZSkgXHJcblx0e1xyXG5cdCAgICBpZiAoZG9jdW1lbnQuY29va2llLmxlbmd0aCA+IDApIHtcclxuXHQgICAgICAgIGxldCBjX3N0YXJ0ID0gZG9jdW1lbnQuY29va2llLmluZGV4T2YobmFtZSArIFwiPVwiKTtcclxuXHQgICAgICAgIFxyXG5cdCAgICAgICAgaWYgKGNfc3RhcnQgIT0gLTEpIHtcclxuXHQgICAgICAgICAgICBjX3N0YXJ0ID0gY19zdGFydCArIG5hbWUubGVuZ3RoICsgMTtcclxuXHQgICAgICAgICAgICBsZXQgY19lbmQgPSBkb2N1bWVudC5jb29raWUuaW5kZXhPZihcIjtcIiwgY19zdGFydCk7XHJcblx0ICAgICAgICAgICAgXHJcblx0ICAgICAgICAgICAgaWYgKGNfZW5kID09IC0xKSB7XHJcblx0ICAgICAgICAgICAgICAgIGNfZW5kID0gZG9jdW1lbnQuY29va2llLmxlbmd0aDtcclxuXHQgICAgICAgICAgICB9XHJcblxyXG5cdCAgICAgICAgICAgIHJldHVybiBKU09OLnBhcnNlKHVuZXNjYXBlKGRvY3VtZW50LmNvb2tpZS5zdWJzdHJpbmcoY19zdGFydCwgY19lbmQpKSk7XHJcblx0ICAgICAgICB9XHJcblx0ICAgIH1cclxuXHJcblx0ICAgIHJldHVybiB7fTtcclxuXHR9XHJcbn1cblxubGV0IGRlZmF1bHRNZXNzYWdlJDMgPSAnVGhlIGl0ZW0geW91IGFyZSB0cnlpbmcgdG8gYWRkIG11c3QgY29udGFpbiBhIHVuaXF1ZSBpZCc7XHJcblxyXG5jbGFzcyBJbnZhbGlkQ2FydEl0ZW1FeGNlcHRpb24gZXh0ZW5kcyBFeGNlcHRpb25IYW5kbGVyXHJcbntcclxuXHRjb25zdHJ1Y3RvcihtZXNzYWdlID0gbnVsbCkgXHJcblx0e1xyXG5cdFx0bWVzc2FnZSA9IG1lc3NhZ2UgfHwgZGVmYXVsdE1lc3NhZ2UkMztcclxuXHRcdHN1cGVyKG1lc3NhZ2UpO1xyXG4gICAgXHRzdXBlci5zdGFja1RyYWNlKHRoaXMsIG1lc3NhZ2UpO1xyXG4gICAgfVxyXG59XG5cbi8vIEhlbHBlcnNcclxuLy8gRXhjZXB0aW9uc1xyXG4vKipcclxuICogQGZpbGUgXHJcbiAqIENhcnQgY2xhc3MuXHJcbiAqXHJcbiAqIEhhbmRsZXMgYWRkaW5nLCByZW1vdmluZyBldGMuLi4gb2YgaXRlbXMuXHJcbiAqL1xyXG5cclxuLyoqXHJcbiAqIFRoZSBkZWZhdWx0IHNldHRpbmdzIG9mIHRoZSBjYXJ0LlxyXG4gKlxyXG4gKiBAdmFyIG9iamVjdFxyXG4gKi9cclxubGV0IGRlZmF1bHRTZXR0aW5ncyQxID0ge1xyXG5cdGVsZW1lbnQ6ICcuY2FydCcsXHJcblx0Y29va2llX25hbWU6ICdjYXJ0JyxcclxuXHRwcmV2aWV3X2NsYXNzOiAnJyxcclxuXHRsb2FkZXI6ICcnLFxyXG5cdGNsYXNzOiAnJyxcclxuXHR3aWR0aDogJzYwcHgnLFxyXG5cdGhlaWdodDogJzYwcHgnLFxyXG5cdHBsYWNlbWVudDogJ3JpZ2h0LXRvcCcsXHJcblx0Zml4ZWQ6IHRydWUsXHJcblx0aG92ZXJfY29sb3I6ICdvcmFuZ2UnLFxyXG5cdG5vX2NzczogZmFsc2UsXHJcbn07XHJcblxyXG4vKipcclxuICogU3RvcmVzIHRoZSBjb250YWluZXIgb2JqZWN0LlxyXG4gKlxyXG4gKiBAdmFyIFxcQ29yZVxcQ29udGFpbmVyXHJcbiAqL1xyXG5sZXQgQ29udGFpbmVyO1xyXG5cclxuLyoqXHJcbiAqIFN0b3JlcyB0aGUgZXZlbnQgbWFuYWdlciBvYmplY3QuXHJcbiAqXHJcbiAqIEB2YXIgXFxDb3JlXFxFdmVudE1hbmFnZXJcclxuICovXHJcbmxldCBFdmVudE1hbmFnZXIkMjtcclxuXHJcbi8qKlxyXG4gKiBTdG9yZXMgdGhlIHJlcXVlc3Qgb2JqZWN0LlxyXG4gKlxyXG4gKiBAdmFyIFxcSGVscGVyc1xcUmVxdWVzdFxyXG4gKi9cclxubGV0IEh0dHA7XHJcblxyXG4vKipcclxuICogU3RvcmVzIHRoZSBjYXJ0IGxvYWRlci5cclxuICpcclxuICogQHZhciBIVE1MRGl2RWxlbWVudFxyXG4gKi9cclxubGV0IGxvYWRpbmdPdmVybGF5O1xyXG5cclxuLyoqXHJcbiAqIFN0b3JlcyB0aGUgaXRlbXMgd3JhcHBlci5cclxuICpcclxuICogQHZhciBIVE1MRGl2RWxlbWVudFxyXG4gKi9cclxubGV0IGl0ZW1zRGl2O1xyXG5cclxuY2xhc3MgQ2FydCBcclxue1xyXG5cdC8qKlxyXG5cdCAqIC0gSW5pdGlhbGl6ZSB0aGUgSW9DIGNvbnRhaW5lclxyXG5cdCAqIC0gSW5pdGlhbGl6ZSB0aGUgUmVxdWVzdFxyXG5cdCAqIC0gSW5pdGlhbGl6ZSB0aGUgRXZlbnRNYW5hZ2VyXHJcblx0ICogLSBDcmVhdGVzIHRoZSBwcmV2aWV3IGFuZCB0aGUgaWNvbiBvZiB0aGUgY2FydC5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSBcXENvcmVcXENvbnRhaW5lciB8IGNvbnRhaW5lclxyXG5cdCAqIEBwYXJhbSBcXEhlbHBlcnNcXFJlcXVlc3QgfCBodHRwXHJcblx0ICogQHBhcmFtIFxcQ29yZVxcRXZlbnRNYW5hZ2VyIHwgZXZlbnRNYW5hZ2VyXHJcblx0ICogQHJldHVybiB2b2lkXHJcblx0ICovXHJcblx0Y29uc3RydWN0b3IoY29udGFpbmVyLCBodHRwLCBldmVudE1hbmFnZXIpIFxyXG5cdHtcclxuXHRcdENvbnRhaW5lciA9IGNvbnRhaW5lcjtcclxuXHRcdEh0dHAgPSBodHRwO1xyXG5cdFx0RXZlbnRNYW5hZ2VyJDIgPSBldmVudE1hbmFnZXI7XHJcblx0XHRcclxuXHRcdHRoaXMucHJldmlld0VsZW1lbnQgPSB0aGlzLmNyZWF0ZVByZXZpZXdFbGVtZW50KCk7XHJcblx0XHR0aGlzLmljb24gPSBjcmVhdGVJY29uLmNhbGwodGhpcyk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBTZXRzIHRoZSBvYmplY3QgYnkgdGhlIHVzZXJzIHNldHRpbmcuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gb2JqZWN0IHwgc2V0dGluZ3NcclxuXHQgKiBAcmV0dXJuIHZvaWRcclxuXHQgKi9cclxuXHRzZXR1cChzZXR0aW5ncylcclxuXHR7XHJcblx0XHRpZiAodHlwZW9mIHNldHRpbmdzICE9ICdvYmplY3QnKSB7XHJcblx0XHRcdHRocm93IG5ldyBJbnZhbGlkQXJndW1lbnRFeGNlcHRpb24kMTtcclxuXHRcdH1cclxuXHJcblx0XHR0aGlzLnNldHRpbmdzID0gQ29tbW9uLmV4dGVuZChkZWZhdWx0U2V0dGluZ3MkMSwgc2V0dGluZ3MpO1xyXG5cclxuXHRcdHRoaXMuc2V0RWxlbWVudCh0aGlzLnNldHRpbmdzLmVsZW1lbnQpO1xyXG5cclxuXHRcdERPTS5hZGRDbGFzcyh0aGlzLnByZXZpZXdFbGVtZW50LCAnY2xvc2VkJyk7XHJcblx0XHRET00uYWRkQ2xhc3ModGhpcy5wcmV2aWV3RWxlbWVudCwgdGhpcy5zZXR0aW5ncy5wcmV2aWV3X2NsYXNzKTtcclxuXHRcdFxyXG5cdFx0dGhpcy5hZGRTdHlsZVRhZygpO1xyXG5cdFx0dGhpcy5iaW5kRXZlbnRMaXN0ZW5lcnMoKTtcclxuXHRcdFxyXG5cdFx0aWYgKHRoaXMuaXNFbXB0eShDb29raWUuZ2V0KHRoaXMuc2V0dGluZ3MuY29va2llX25hbWUpKSkge1xyXG5cdFx0XHR0aGlzLnNldHVwQ2FydCgpO1xyXG5cdFx0XHRcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIENoZWNrcyBpZiB0aGUgY2FydCBpcyBlbXB0eVxyXG5cdCAqXHJcblx0ICogQHBhcmFtIG9iamVjdCB8IGNhcnRcclxuXHQgKiBAcmV0dXJuIGJvb2xcclxuXHQgKi9cclxuXHRpc0VtcHR5KGNhcnQpXHJcblx0e1xyXG5cdFx0cmV0dXJuIENvbW1vbi5lbXB0eU9iamVjdChjYXJ0KTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEluaXRpYWxpemUvU2V0cyB0aGUgY2FydCBhcyBhIGNvb2tpZS5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSBvYmplY3QgfCBjYXJ0XHJcblx0ICogQHJldHVybiB2b2lkXHJcblx0ICovXHJcblx0c2V0dXBDYXJ0KClcclxuXHR7XHJcblx0XHR0aGlzLmNhcnQgPSB7fTtcclxuXHRcdHRoaXMuY2FydC5pZCA9IFN0ci5yYW5kb20oMTApO1xyXG5cdFx0dGhpcy5jYXJ0Lml0ZW1zID0gW107XHJcblx0XHR0aGlzLmNhcnQuZmF2b3JpdGVzID0gW107XHJcblx0XHRDb29raWUuc2V0KHRoaXMuc2V0dGluZ3MuY29va2llX25hbWUsIHRoaXMuY2FydCwgMik7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBBZGRzIGFuIGl0ZW0gdG8gdGhlIGNhcnQuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gb2JqZWN0IHwgaXRlbVxyXG5cdCAqIEByZXR1cm4gdm9pZFxyXG5cdCAqL1xyXG5cdGFkZEl0ZW0oaXRlbSlcclxuXHR7XHJcblx0XHRpZiAodHlwZW9mIGl0ZW0gIT0gJ29iamVjdCcpIHtcclxuXHRcdFx0dGhyb3cgbmV3IEludmFsaWRBcmd1bWVudEV4Y2VwdGlvbiQxKCdhZGRJdGVtKCkgZXhwZWN0IHRoZSBmaXJzdCBwYXJhbWV0ZXIgdG8gYmUgYW4gb2JqZWN0LCBidXQgJyArIHR5cGVvZiBpdGVtICsgJyB3YXMgcGFzc2VkIGluc3RlYWQnKTtcclxuXHRcdH1cclxuXHJcblx0XHRpZiAoISBpdGVtLmhhc093blByb3BlcnR5KCdpZCcpKSB7XHJcblx0XHRcdHRocm93IG5ldyBJbnZhbGlkQ2FydEl0ZW1FeGNlcHRpb247XHJcblx0XHR9XHJcblxyXG5cdFx0dGhpcy5jYXJ0ID0gQ29va2llLmdldCh0aGlzLnNldHRpbmdzLmNvb2tpZV9uYW1lKTtcclxuXHJcblx0XHRpZiAoIWl0ZW0uaGFzT3duUHJvcGVydHkoJ3F1YW50aXR5JykpIHtcclxuXHRcdFx0aXRlbS5xdWFudGl0eSA9IDE7XHJcblx0XHR9XHJcblxyXG5cdFx0bGV0IGk7XHJcblx0XHRsZXQgaW5jcmVtZW50ZWQgPSBmYWxzZTtcclxuXHJcblx0XHRmb3IgKGkgPSAwOyBpIDwgdGhpcy5jYXJ0Lml0ZW1zLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdGlmICh0aGlzLmNhcnQuaXRlbXNbaV0uaWQgPT0gaXRlbS5pZCkge1xyXG5cdFx0XHRcdHRoaXMuY2FydC5pdGVtc1tpXS5xdWFudGl0eSsrO1xyXG5cdFx0XHRcdGluY3JlbWVudGVkID0gdHJ1ZTtcclxuXHRcdFx0XHRicmVhaztcdFxyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKCEgaW5jcmVtZW50ZWQpIHtcclxuXHRcdFx0dGhpcy5jYXJ0Lml0ZW1zLnB1c2goaXRlbSk7XHJcblx0XHR9XHJcblxyXG5cdFx0Q29va2llLnNldCh0aGlzLnNldHRpbmdzLmNvb2tpZV9uYW1lLCB0aGlzLmNhcnQsIDIpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQWRkcyBhbiBpdGVtIHRvIHRoZSBmYXZvcml0ZXMgbGlzdC5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSBvYmplY3QgfCBpdGVtXHJcblx0ICogQHJldHVybiB2b2lkXHJcblx0ICovXHJcblx0ZmF2b3JpdGVJdGVtKGl0ZW0pXHJcblx0e1xyXG5cdFx0aWYgKHR5cGVvZiBpdGVtICE9ICdvYmplY3QnKSB7XHJcblx0XHRcdHRocm93IG5ldyBJbnZhbGlkQXJndW1lbnRFeGNlcHRpb24kMSgnZmF2b3JpdGVJdGVtKCkgZXhwZWN0IHRoZSBmaXJzdCBwYXJhbWV0ZXIgdG8gYmUgYW4gb2JqZWN0LCBidXQgJyArIHR5cGVvZiBpdGVtICsgJyB3YXMgcGFzc2VkIGluc3RlYWQnKTtcclxuXHRcdH1cclxuXHJcblx0XHRpZiAoISBpdGVtLmhhc093blByb3BlcnR5KCdpZCcpKSB7XHJcblx0XHRcdHRocm93IG5ldyBJbnZhbGlkQ2FydEl0ZW1FeGNlcHRpb247XHJcblx0XHR9XHJcblxyXG5cdFx0dGhpcy5jYXJ0ID0gQ29va2llLmdldCh0aGlzLnNldHRpbmdzLmNvb2tpZV9uYW1lKTtcclxuXHJcblx0XHRsZXQgaTtcclxuXHRcdGxldCBhbHJlYWR5RmF2b3JpdGVkID0gZmFsc2U7XHJcblxyXG5cdFx0Zm9yIChpID0gMDsgaSA8IHRoaXMuY2FydC5mYXZvcml0ZXMubGVuZ3RoOyBpKyspIHtcclxuXHRcdFx0aWYgKHRoaXMuY2FydC5mYXZvcml0ZXNbaV0uaWQgPT0gaXRlbS5pZCkge1xyXG5cdFx0XHRcdGFscmVhZHlGYXZvcml0ZWQgPSB0cnVlO1xyXG5cdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKCEgYWxyZWFkeUZhdm9yaXRlZCkge1xyXG5cdFx0XHR0aGlzLmNhcnQuZmF2b3JpdGVzLnB1c2goaXRlbSk7XHJcblx0XHR9XHJcblxyXG5cdFx0Q29va2llLnNldCh0aGlzLnNldHRpbmdzLmNvb2tpZV9uYW1lLCB0aGlzLmNhcnQsIDIpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogUmVtb3ZlcyBhbiBpdGVtIGZyb20gdGhlIGNhcnQuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gb2JqZWN0IHwgaXRlbVxyXG5cdCAqIEByZXR1cm4gdm9pZFxyXG5cdCAqL1xyXG5cdHJlbW92ZUl0ZW0oaXRlbSlcclxuXHR7XHJcblx0XHRpZiAodHlwZW9mIGl0ZW0gIT0gJ29iamVjdCcpIHtcclxuXHRcdFx0dGhyb3cgbmV3IEludmFsaWRBcmd1bWVudEV4Y2VwdGlvbiQxKCdyZW1vdmVJdGVtKCkgZXhwZWN0IHRoZSBmaXJzdCBwYXJhbWV0ZXIgdG8gYmUgYW4gb2JqZWN0LCBidXQgJyArIHR5cGVvZiBpdGVtICsgJyB3YXMgcGFzc2VkIGluc3RlYWQnKTtcclxuXHRcdH1cclxuXHJcblx0XHRpZiAoISBpdGVtLmhhc093blByb3BlcnR5KCdpZCcpKSB7XHJcblx0XHRcdHRocm93IG5ldyBJbnZhbGlkQ2FydEl0ZW1FeGNlcHRpb247XHJcblx0XHR9XHJcblxyXG4gXHRcdHRoaXMuY2FydCA9IENvb2tpZS5nZXQodGhpcy5zZXR0aW5ncy5jb29raWVfbmFtZSk7XHJcblxyXG4gXHRcdGxldCBpO1xyXG5cclxuIFx0XHRmb3IgKGkgPSAwOyBpIDwgdGhpcy5jYXJ0Lml0ZW1zLmxlbmd0aDsgaSsrKSB7XHJcbiBcdFx0XHRpZiAodGhpcy5jYXJ0Lml0ZW1zW2ldLmlkID09IGl0ZW0uaWQpIHtcclxuIFx0XHRcdFx0dGhpcy5jYXJ0Lml0ZW1zLnNwbGljZShpLCAxKTtcclxuIFx0XHRcdFx0YnJlYWs7XHJcbiBcdFx0XHR9XHJcbiBcdFx0fVxyXG5cclxuIFx0XHRDb29raWUuc2V0KHRoaXMuc2V0dGluZ3MuY29va2llX25hbWUsIHRoaXMuY2FydCwgMik7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBBZGRzIHRoZSBpdGVtIHRvIHByZXZpZXcuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gYXJyYXkgfCBpdGVtc1xyXG5cdCAqIEByZXR1cm4gdm9pZFxyXG5cdCAqL1xyXG5cdGFkZFRvUHJldmlldyhpdGVtcylcclxuXHR7XHJcblx0XHRpdGVtc0Rpdi5pbm5lckhUTUwgPSAnJztcclxuXHJcblx0XHRsZXQgdGFibGUgPSBET00uY3JlYXRlRWxlbWVudCgndGFibGUnKTtcclxuXHJcblx0XHRET00uYWRkQ2xhc3ModGFibGUsICdwcmV2aWV3LXRhYmxlJyk7XHJcblxyXG5cdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCBpdGVtcy5sZW5ndGg7IGkrKykge1xyXG5cclxuXHRcdFx0bGV0IGF0dHJpYnV0ZXMgPSBpdGVtc1tpXTtcclxuXHJcblx0XHRcdGxldCB0ciA9IERPTS5jcmVhdGVFbGVtZW50KCd0cicsIHtcclxuXHRcdFx0XHRjbGFzczogJ2l0ZW0nXHJcblx0XHRcdH0pO1xyXG5cclxuXHRcdFx0Ly8gUXVhbnRpdHkgYWx3YXlzIGF0IHRoZSBzdGFydCBvZiBhbiBpdGVtLlxyXG5cdFx0XHRsZXQgdGQgPSBET00uY3JlYXRlRWxlbWVudCgndGQnKTtcclxuXHJcblx0XHRcdHRkLmlubmVySFRNTCA9IGF0dHJpYnV0ZXMucXVhbnRpdHkgKyd4JztcclxuXHRcdFx0dHIuYXBwZW5kQ2hpbGQodGQpO1xyXG5cdFx0XHRcclxuXHRcdFx0Zm9yKGxldCBhdHRyaWJ1dGUgaW4gYXR0cmlidXRlcykge1xyXG5cdFx0XHRcdHN3aXRjaChhdHRyaWJ1dGUpXHJcblx0XHRcdFx0e1xyXG5cdFx0XHRcdFx0Y2FzZSAnaW1hZ2UnOlxyXG5cdFx0XHRcdFx0XHR0ZCA9IERPTS5jcmVhdGVFbGVtZW50KCd0ZCcpO1xyXG5cdFx0XHRcdFx0XHRsZXQgaW1hZ2UgPSBET00uY3JlYXRlRWxlbWVudCgnaW1nJywge1xyXG5cdFx0XHRcdFx0XHRcdHNyYzogYXR0cmlidXRlc1thdHRyaWJ1dGVdLFxyXG5cdFx0XHRcdFx0XHRcdHdpZHRoOiAnNTBweCcsXHJcblx0XHRcdFx0XHRcdFx0aGVpZ2h0OiAnNTBweCdcclxuXHRcdFx0XHRcdFx0fSk7XHJcblxyXG5cdFx0XHRcdFx0XHR0ZC5hcHBlbmRDaGlsZChpbWFnZSk7XHJcblx0XHRcdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRcdFx0Y2FzZSAncHJpY2UnOlxyXG5cdFx0XHRcdFx0XHR0ZCA9IERPTS5jcmVhdGVFbGVtZW50KCd0ZCcpO1xyXG5cdFx0XHRcdFx0XHRsZXQgc3BhbiA9IERPTS5jcmVhdGVFbGVtZW50KCdzcGFuJywge1xyXG5cdFx0XHRcdFx0XHRcdGh0bWw6ICcmbmJzcCcgKyBhdHRyaWJ1dGVzW2F0dHJpYnV0ZV0uY3VycmVuY3lcclxuXHRcdFx0XHRcdFx0fSk7XHJcblx0XHRcdFx0XHRcdHRkLmlubmVySFRNTCA9IGF0dHJpYnV0ZXNbYXR0cmlidXRlXS5hbW91bnQ7XHJcblx0XHRcdFx0XHRcdHRkLmFwcGVuZENoaWxkKHNwYW4pO1xyXG5cdFx0XHRcdFx0XHRicmVhaztcclxuXHRcdFx0XHRcdGNhc2UgJ25hbWUnOlxyXG5cdFx0XHRcdFx0XHR0ZCA9IERPTS5jcmVhdGVFbGVtZW50KCd0ZCcpO1xyXG5cdFx0XHRcdFx0XHR0ZC5pbm5lckhUTUwgPSBhdHRyaWJ1dGVzW2F0dHJpYnV0ZV07XHJcblx0XHRcdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHJcblx0XHRcdFx0dHIuYXBwZW5kQ2hpbGQodGQpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHR0YWJsZS5hcHBlbmRDaGlsZCh0cik7XHJcblx0XHR9XHJcblxyXG5cdFx0Ly8gY3JlYXRlIGNoZWNrb3V0IGJ1dHRvbiBhdCB0aGUgYm90dG9tIG9mIHRoZSBwcmV2aWV3XHJcblx0XHRsZXQgdHIgPSBET00uY3JlYXRlRWxlbWVudCgndHInKTtcclxuXHRcdGxldCB0ZCA9IERPTS5jcmVhdGVFbGVtZW50KCd0ZCcsIHtcclxuXHRcdFx0Y29sc3BhbjogJzMnLFxyXG5cdFx0fSk7XHJcblxyXG5cdFx0bGV0IGNoZWNrb3V0ID0gRE9NLmNyZWF0ZUVsZW1lbnQoJ2EnLCB7XHJcblx0XHRcdGNsYXNzOiAnYnRuIGJ0bi1wcmltYXJ5JyxcclxuXHRcdFx0dGV4dDogJ0NoZWNrb3V0J1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0Y2hlY2tvdXQub25jbGljayA9IGZ1bmN0aW9uKGUpIHtcclxuXHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdFx0XHRFdmVudE1hbmFnZXIkMi5wdWJsaXNoKCdjYXJ0LmNoZWNrb3V0Jyk7XHJcblx0XHR9LmJpbmQodGhpcyk7XHJcblxyXG5cdFx0dGQuYXBwZW5kQ2hpbGQoY2hlY2tvdXQpO1xyXG5cdFx0dHIuYXBwZW5kQ2hpbGQodGQpO1xyXG5cclxuXHRcdC8vIGNyZWF0ZSB0b3RhbCBzdW0gYXQgdGhlIGJvdHRvbSBvZiB0aGUgcHJldmlld1xyXG5cdFx0dGQgPSBET00uY3JlYXRlRWxlbWVudCgndGQnLCB7XHJcblx0XHRcdGNvbHNwYW46ICcxJyxcclxuXHRcdH0pO1xyXG5cclxuXHRcdGxldCB0b3RhbCA9IERPTS5jcmVhdGVFbGVtZW50KCdkaXYnLCB7XHJcblx0XHRcdGNsYXNzOiAnY2FydC10b3RhbCcsXHJcblx0XHRcdHRleHQ6IHRoaXMudG90YWwoKVxyXG5cdFx0fSk7XHJcblxyXG5cdFx0dGQuYXBwZW5kQ2hpbGQodG90YWwpO1xyXG5cdFx0dHIuYXBwZW5kQ2hpbGQodGQpO1xyXG5cclxuXHRcdHRhYmxlLmFwcGVuZENoaWxkKHRyKTtcclxuXHJcblx0XHRpdGVtc0Rpdi5hcHBlbmRDaGlsZCh0YWJsZSk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBDYWxjdWxhdGVzIHRoZSB0b3RhbCBvZiB0aGUgY2FydFxyXG5cdCAqIGFuZCByZXRyaWV2ZSBpdC5cclxuXHQgKlxyXG5cdCAqIEByZXR1cm4gbnVtYmVyIFxyXG5cdCAqL1xyXG5cdHRvdGFsKClcclxuXHR7XHJcbiBcdFx0dGhpcy5jYXJ0ID0gQ29va2llLmdldCh0aGlzLnNldHRpbmdzLmNvb2tpZV9uYW1lKTtcclxuXHJcbiBcdFx0dmFyIHRvdGFsID0gMC4wMDtcclxuIFx0XHRsZXQgaTtcclxuXHJcbiBcdFx0Zm9yIChpID0gMDsgaSA8IHRoaXMuY2FydC5pdGVtcy5sZW5ndGg7IGkrKykge1xyXG4gXHRcdFx0dG90YWwgKz0gcGFyc2VGbG9hdCh0aGlzLmNhcnQuaXRlbXNbaV0ucHJpY2UuYW1vdW50KSAqIHRoaXMuY2FydC5pdGVtc1tpXS5xdWFudGl0eTtcclxuIFx0XHR9XHJcblxyXG4gXHRcdHJldHVybiB0b3RhbC50b0ZpeGVkKDIpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQmluZHMgZXZlcnRoaW5nIHRvIHRoZSBlbGVtZW50LlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIHN0cmluZyB8IHNlbGVjdG9yXHJcblx0ICogQHJldHVybiB2b2lkXHJcblx0ICovXHJcblx0c2V0RWxlbWVudChzZWxlY3RvcilcclxuXHR7XHJcblx0XHR0aGlzLmVsZW1lbnQgPSBET00uZmluZChzZWxlY3Rvcik7XHJcblxyXG5cdFx0aWYgKHRoaXMuZWxlbWVudCkge1xyXG5cdFx0XHRET00uYWRkQ2xhc3ModGhpcy5lbGVtZW50LCB0aGlzLnNldHRpbmdzLmNsYXNzKTtcclxuXHRcdFx0RE9NLmFkZENsYXNzKHRoaXMuZWxlbWVudCwgdGhpcy5zZXR0aW5ncy5wbGFjZW1lbnQpO1xyXG5cdFx0XHR0aGlzLmVsZW1lbnQuYXBwZW5kQ2hpbGQodGhpcy5pY29uKTtcclxuXHRcdFx0dGhpcy5lbGVtZW50LmFwcGVuZENoaWxkKHRoaXMucHJldmlld0VsZW1lbnQpO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQ3JlYXRlcyB0aGUgY2FydCBkZXRhaWxzIHByZXZpZXcgZWxlbWVudC5cclxuXHQgKlxyXG5cdCAqIEByZXR1cm4gSFRNTERpdkVsZW1lbnRcclxuXHQgKi9cclxuXHRjcmVhdGVQcmV2aWV3RWxlbWVudCgpXHJcblx0e1xyXG5cdFx0bGV0IHByZXZpZXdFbGVtZW50ID0gRE9NLmNyZWF0ZUVsZW1lbnQoJ2RpdicsIHtcclxuXHRcdFx0aWQ6ICdwcmV2aWV3J1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0aXRlbXNEaXYgPSBET00uY3JlYXRlRWxlbWVudCgndWwnLCB7XHJcblx0XHRcdFx0Y2xhc3M6ICdpdGVtcydcclxuXHRcdFx0fSk7XHJcblxyXG5cdFx0cHJldmlld0VsZW1lbnQuYXBwZW5kQ2hpbGQoaXRlbXNEaXYpO1xyXG5cclxuXHRcdHJldHVybiBwcmV2aWV3RWxlbWVudDtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEFkZCB0aGUgZUNvbW1lcmNlIHN0eWxlIHRhZ3MgdG8gdGhlIERPTS5cclxuXHQgKlxyXG5cdCAqIEByZXR1cm4gdm9pZFxyXG5cdCAqL1xyXG5cdGFkZFN0eWxlVGFnKCkgXHJcblx0e1xyXG5cdFx0aWYgKERPTS5maW5kKCcjVHVyYm8tZUNvbW1lcmNlLUNhcnQnKSkge1xyXG5cdFx0XHRyZXR1cm47XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKHRoaXMuc2V0dGluZ3Mubm9fY3NzKSB7XHJcblx0XHRcdHJldHVybjtcclxuXHRcdH1cclxuXHJcblx0XHRsZXQgcG9zaXRpb24gPSAodGhpcy5zZXR0aW5ncy5maXhlZCkgPyAnZml4ZWQnIDogJ2Fic29sdXRlJztcclxuXHJcblx0XHRsZXQgY3NzID0gYFxyXG5cdFx0XHQke3RoaXMuc2V0dGluZ3MuZWxlbWVudH0ge1xyXG5cdFx0XHRcdHBvc2l0aW9uOiAke3Bvc2l0aW9ufTtcclxuXHRcdFx0XHRjdXJzb3I6IHBvaW50ZXI7XHJcblx0XHRcdFx0Y29sb3I6ICNmZmZmZmY7XHJcblx0XHRcdFx0ei1pbmRleDogOTk4O1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHQke3RoaXMuc2V0dGluZ3MuZWxlbWVudH0gc3ZnIHtcclxuXHRcdFx0XHR3aWR0aDogJHt0aGlzLnNldHRpbmdzLndpZHRofTtcclxuXHRcdFx0XHRoZWlnaHQ6ICR7dGhpcy5zZXR0aW5ncy5oZWlnaHR9O1xyXG5cdFx0XHRcdHRyYW5zaXRpb246IGZpbGwgMC4zcztcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0JHt0aGlzLnNldHRpbmdzLmVsZW1lbnR9IHN2Zzpob3ZlciB7XHJcblx0XHRcdFx0ZmlsbDogJHt0aGlzLnNldHRpbmdzLmhvdmVyX2NvbG9yfTtcclxuXHRcdFx0XHR0cmFuc2l0aW9uOiBmaWxsIDAuM3M7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdCR7dGhpcy5zZXR0aW5ncy5lbGVtZW50fS50b3AtcmlnaHQsXHJcblx0XHRcdCR7dGhpcy5zZXR0aW5ncy5lbGVtZW50fS5yaWdodC10b3Age1xyXG5cdFx0XHRcdHJpZ2h0OiAxMHB4O1xyXG5cdFx0XHRcdHRvcDogMTBweDtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0JHt0aGlzLnNldHRpbmdzLmVsZW1lbnR9LmxlZnQtdG9wLFxyXG5cdFx0XHQke3RoaXMuc2V0dGluZ3MuZWxlbWVudH0udG9wLWxlZnQge1xyXG5cdFx0XHRcdGxlZnQ6IDEwcHg7XHJcblx0XHRcdFx0dG9wOiAxMHB4O1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHQke3RoaXMuc2V0dGluZ3MuZWxlbWVudH0gPiAjcHJldmlldyB7XHJcblx0XHRcdFx0cG9zaXRpb246ICR7cG9zaXRpb259O1xyXG5cdFx0XHRcdHotaW5kZXg6IDk5OTk7XHJcblx0XHRcdFx0dG9wOiBjYWxjKDEwcHggKyAke3RoaXMuc2V0dGluZ3MuaGVpZ2h0fSk7XHJcblx0XHRcdFx0dHJhbnNmb3JtOiB0cmFuc2xhdGVYKDYwcHgpO1xyXG5cdFx0XHRcdGhlaWdodDogNDAwcHg7XHJcblx0XHRcdFx0d2lkdGg6IDMwMHB4O1xyXG5cdFx0XHRcdGJvcmRlcjogMXB4IHNvbGlkICNlNGU0ZTQ7XHJcblx0XHRcdFx0YmFja2dyb3VuZDogI2ZmZmZmZjtcclxuXHRcdFx0XHR0cmFuc2l0aW9uOiB0cmFuc2Zvcm0gMXMsIHZpc2liaWxpdHkgMXM7XHJcblx0XHRcdFx0Y3Vyc29yOiBkZWZhdWx0O1xyXG5cdFx0XHRcdG92ZXJmbG93LVk6IHNjcm9sbDtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0JHt0aGlzLnNldHRpbmdzLmVsZW1lbnR9ID4gI3ByZXZpZXcub3BlbmVkIHtcclxuXHRcdFx0XHR2aXNpYmlsaXR5OiB2aXNpYmxlO1xyXG5cdFx0XHRcdHRyYW5zZm9ybTogdHJhbnNsYXRlWCgtMjQwcHgpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHQke3RoaXMuc2V0dGluZ3MuZWxlbWVudH0gPiAjcHJldmlldy5jbG9zZWQge1xyXG5cdFx0XHRcdHZpc2liaWxpdHk6IGhpZGRlbjtcclxuXHRcdFx0XHR0cmFuc2Zvcm06IHRyYW5zbGF0ZVgoNjBweCk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdCR7dGhpcy5zZXR0aW5ncy5lbGVtZW50fSAjcHJldmlldyA+IHVsLml0ZW1zIHtcclxuXHRcdFx0XHRwYWRkaW5nOiAwO1xyXG5cdFx0XHRcdGNvbG9yOiAjMDAwMDAwO1xyXG5cdFx0XHRcdGxpc3Qtc3R5bGUtdHlwZTogbm9uZTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0JHt0aGlzLnNldHRpbmdzLmVsZW1lbnR9ICNwcmV2aWV3ID4gdWwuaXRlbXMgPiAucHJldmlldy10YWJsZSB7XHJcblx0XHRcdFx0d2lkdGg6IDEwMCU7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdCR7dGhpcy5zZXR0aW5ncy5lbGVtZW50fSAjcHJldmlldyA+IHVsLml0ZW1zID4gLnByZXZpZXctdGFibGUgdGQge1xyXG5cdFx0XHRcdHBhZGRpbmc6IDRweDtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0JHt0aGlzLnNldHRpbmdzLmVsZW1lbnR9IC5pdGVtcy5sb2FkaW5nIHtcclxuXHRcdFx0XHRkaXNwbGF5OiBub25lO1xyXG5cdFx0XHRcdG92ZXJmbG93LVk6IG5vbmU7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdCR7dGhpcy5zZXR0aW5ncy5lbGVtZW50fSAuY2FydC1sb2FkZXItb3ZlcmxheSB7XHJcblx0XHRcdFx0cG9zaXRpb246IGZpeGVkO1xyXG5cdFx0XHRcdHRvcDogMDsgXHJcblx0XHRcdCAgICBsZWZ0OiAwO1xyXG5cdFx0XHQgICAgcmlnaHQ6IDA7XHJcblx0XHRcdCAgICBib3R0b206IDA7XHJcblx0XHRcdFx0YmFja2dyb3VuZDogI2ZmZmZmZjtcclxuXHRcdFx0XHR3aWR0aDogMTAwJTtcclxuXHRcdFx0XHRoZWlnaHQ6IDEwMCU7XHJcblx0XHRcdFx0bWluLWhlaWdodDogMTAwJTtcclxuXHRcdFx0XHRvdmVyZmxvdzogYXV0bztcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0JHt0aGlzLnNldHRpbmdzLmVsZW1lbnR9IC5jYXJ0LWxvYWRlci1vdmVybGF5IC5jYXJ0LWxvYWRlciB7XHJcblx0XHRcdFx0cG9zaXRpb246IGFic29sdXRlO1xyXG5cdFx0XHRcdHdpZHRoOiA1MHB4O1xyXG5cdFx0XHRcdGhlaWdodDogNTBweDtcclxuXHRcdFx0XHRtYXJnaW4tbGVmdDogLTI1cHg7XHJcblx0XHRcdFx0bWFyZ2luLXRvcDogLTI1cHg7XHJcblx0XHRcdFx0bGVmdDogNTAlO1xyXG5cdFx0XHRcdHJpZ2h0OiA1MCU7XHJcblx0XHRcdFx0dG9wOiA1MCU7XHJcblx0XHRcdFx0Ym90dG9tOiA1MCU7XHJcblx0XHRcdH1cclxuXHRcdGA7XHJcblx0ICAgIFxyXG5cdCAgICBET00uYWRkU3R5bGUoJ1R1cmJvLWVDb21tZXJjZS1DYXJ0JywgY3NzKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIENyZWF0ZXMgYW4gbG9hZGluZyBvdmVybGF5LlxyXG5cdCAqXHJcblx0ICogQHJldHVybiBIVE1MRGl2RWxlbWVudFxyXG5cdCAqL1xyXG5cdGxvYWRpbmdPdmVybGF5KClcclxuXHR7XHJcblx0XHRpZiAobG9hZGluZ092ZXJsYXkpIHtcclxuXHRcdFx0cmV0dXJuIGxvYWRpbmdPdmVybGF5O1xyXG5cdFx0fVxyXG5cclxuXHRcdGxldCBsb2FkZXI7XHJcblxyXG5cdFx0aWYgKHRoaXMuc2V0dGluZ3MubG9hZGVyKSB7XHJcblx0XHRcdGxvYWRlciA9IERPTS5jcmVhdGVFbGVtZW50KCdpbWcnLCB7XHJcblx0XHRcdFx0c3JjOiB0aGlzLnNldHRpbmdzLmxvYWRlcixcclxuXHRcdFx0XHRjbGFzczogJ2NhcnQtbG9hZGVyJ1xyXG5cdFx0XHR9KTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdGxvYWRlciA9IGNyZWF0ZUxvYWRlcigpO1xyXG5cdFx0fVxyXG5cclxuXHRcdGxvYWRpbmdPdmVybGF5ID0gRE9NLmNyZWF0ZUVsZW1lbnQoJ2RpdicsIHtcclxuXHRcdFx0Y2xhc3M6ICdjYXJ0LWxvYWRlci1vdmVybGF5J1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0bG9hZGluZ092ZXJsYXkuYXBwZW5kQ2hpbGQobG9hZGVyKTtcclxuXHJcblx0XHRyZXR1cm4gbG9hZGluZ092ZXJsYXk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBMb2FkaW5nIHRoZSBjYXJ0IHByZXZpZXcuXHJcblx0ICpcclxuXHQgKiBAcmV0dXJuIHZvaWRcclxuXHQgKi9cclxuXHRwcmV2aWV3U3RhcnRMb2FkaW5nKClcclxuXHR7XHJcblx0XHRET00uYWRkQ2xhc3MoaXRlbXNEaXYsICdsb2FkaW5nJyk7XHJcblx0XHR0aGlzLnByZXZpZXdFbGVtZW50LmFwcGVuZENoaWxkKHRoaXMubG9hZGluZ092ZXJsYXkoKSk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBMb2FkaW5nIHRoZSBjYXJ0IHByZXZpZXcuXHJcblx0ICpcclxuXHQgKiBAcmV0dXJuIHZvaWRcclxuXHQgKi9cclxuXHRwcmV2aWV3U3RvcExvYWRpbmcoKVxyXG5cdHtcclxuXHRcdGlmIChET00uZmluZCgnLmNhcnQtbG9hZGVyLW92ZXJsYXknLCB0aGlzLnByZXZpZXdFbGVtZW50KSkge1xyXG5cdFx0XHR0aGlzLnByZXZpZXdFbGVtZW50LnJlbW92ZUNoaWxkKHRoaXMubG9hZGluZ092ZXJsYXkoKSk7XHJcblx0XHRcdERPTS5yZW1vdmVDbGFzcyhpdGVtc0RpdiwgJ2xvYWRpbmcnKTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFJlbG9hZHMgdGhlIGl0ZW1zIGluIHRoZSBjYXJ0IHByZXZpZXcuXHJcblx0ICpcclxuXHQgKiBAcmV0dXJuIHZvaWRcclxuXHQgKi9cclxuXHRyZWxvYWRDYXJ0UHJldmlldygpXHJcblx0e1xyXG5cdFx0dGhpcy5wcmV2aWV3U3RhcnRMb2FkaW5nKCk7XHJcblx0XHRsZXQgaXRlbXMgPSB0aGlzLmdldENhcnRJdGVtcygpO1xyXG5cdFx0dGhpcy5hZGRUb1ByZXZpZXcoaXRlbXMpO1xyXG5cdFx0XHJcblx0XHRsZXQgaW5zdGFuY2UgPSB0aGlzO1xyXG5cclxuXHRcdHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XHJcblx0XHRcdGluc3RhbmNlLnByZXZpZXdTdG9wTG9hZGluZy5jYWxsKGluc3RhbmNlKTtcclxuXHRcdH0sIDEwMDApO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQmluZHMgZXZlbnQgbGlzdGVuZXJzIHRvIHRoZSBjYXJ0IGljb24uXHJcblx0ICpcclxuXHQgKiBAcmV0dXJuIHZvaWRcclxuXHQgKi9cclxuXHRiaW5kRXZlbnRMaXN0ZW5lcnMoKVxyXG5cdHtcclxuXHRcdHRoaXMuaWNvbi5vbmNsaWNrID0gZnVuY3Rpb24oZSkge1xyXG5cdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XHJcblx0XHRcdHRoaXMudG9nZ2xlQ2FydFByZXZpZXcoKTtcclxuXHRcdH0uYmluZCh0aGlzKTtcclxuXHJcblx0XHRFdmVudE1hbmFnZXIkMi5zdWJzY3JpYmUoJ2NhcnQucHJvZHVjdC5hZGRlZCcsIGZ1bmN0aW9uKGF0dHJpYnV0ZXMpIHtcclxuXHRcdFx0dGhpcy5vcGVuQ2FydFByZXZpZXcoKTtcclxuXHRcdFx0dGhpcy5hZGRJdGVtKGF0dHJpYnV0ZXMpO1xyXG5cdFx0XHR0aGlzLnJlbG9hZENhcnRQcmV2aWV3KCk7XHJcblx0XHR9LmJpbmQodGhpcykpO1xyXG5cclxuXHRcdEV2ZW50TWFuYWdlciQyLnN1YnNjcmliZSgnY2FydC5wcm9kdWN0LmZhdm9yaXRlZCcsIGZ1bmN0aW9uKGF0dHJpYnV0ZXMpIHtcclxuXHRcdFx0dGhpcy5mYXZvcml0ZUl0ZW0oYXR0cmlidXRlcyk7XHJcblx0XHR9LmJpbmQodGhpcykpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogT3BlbnMgdGhlIGNhcnQgcHJldmlldy5cclxuXHQgKlxyXG5cdCAqIEByZXR1cm4gdm9pZCBcclxuXHQgKi9cclxuXHRvcGVuQ2FydFByZXZpZXcoKVxyXG5cdHtcclxuXHRcdGlmIChET00uaGFzQ2xhc3ModGhpcy5wcmV2aWV3RWxlbWVudCwgJ29wZW5lZCcpKSB7XHJcblx0XHRcdHRoaXMucmVsb2FkQ2FydFByZXZpZXcoKTtcclxuXHRcdH1cclxuXHJcblx0XHRET00uc3dpdGNoQ2xhc3Nlcyh0aGlzLnByZXZpZXdFbGVtZW50LCAnY2xvc2VkJywgJ29wZW5lZCcpO1xyXG5cdFx0dGhpcy5yZWxvYWRDYXJ0UHJldmlldygpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogVG9nZ2xlcyB0aGUgb3BlbmluZyBjbG9zaW5nIG9mIHRoZSBjYXJ0IHByZXZpZXcuXHJcblx0ICpcclxuXHQgKiBAcmV0dXJuIHZvaWQgXHJcblx0ICovXHJcblx0dG9nZ2xlQ2FydFByZXZpZXcoKVxyXG5cdHtcclxuXHRcdGxldCBvcGVuaW5nID0gRE9NLnRvZ2dsZUNsYXNzKHRoaXMucHJldmlld0VsZW1lbnQsICdvcGVuZWQnLCAnY2xvc2VkJyk7XHJcblx0XHRcdFxyXG5cdFx0aWYgKG9wZW5pbmcpIHtcclxuXHRcdFx0dGhpcy5yZWxvYWRDYXJ0UHJldmlldygpO1x0XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBSZXRyaWV2ZSB0aGUgY2FydHMgaXRlbXMgZnJvbSB0aGUgY29va2llLlxyXG5cdCAqXHJcblx0ICogQHJldHVybiBvYmplY3RcclxuXHQgKi9cclxuXHRnZXRDYXJ0SXRlbXMoKVxyXG5cdHtcclxuXHRcdGxldCBjYXJ0ID0gQ29va2llLmdldCh0aGlzLnNldHRpbmdzLmNvb2tpZV9uYW1lKTtcclxuXHJcblx0XHRyZXR1cm4gKGNhcnQpID8gY2FydC5pdGVtcyA6IFtdO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogSGlkZXMgdGhlIGNvbXBvbmVudCBmcm9tIHRoZSBET00uXHJcblx0ICpcclxuXHQgKiBAcmV0dXJuIHZvaWQgXHJcblx0ICovXHJcblx0aGlkZSgpXHJcblx0e1xyXG5cdFx0dGhpcy5lbGVtZW50LnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcblx0fVxyXG59XHJcblxyXG4vKipcclxuICogQ2xvc2VzIHRoZSBjYXJ0IHByZXZpZXcgZWxlbWVudC5cclxuICpcclxuICogQHBhcmFtIGV2ZW50LmNsaWNrXHJcbiAqL1xyXG5mdW5jdGlvbiBjbG9zZShldmVudCkge1xyXG5cdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcblx0RE9NLnN3aXRjaENsYXNzZXModGhpcy5wcmV2aWV3RWxlbWVudCwgJ29wZW5lZCcsICdjbG9zZWQnKTtcclxufVxyXG5cclxuLyoqXHJcbiAqIENyZWF0ZXMgdGhlIGNhcnQgc3ZnIGljb24uXHJcbiAqXHJcbiAqIEByZXR1cm4gU1ZHU1ZHRWxlbWVudFxyXG4gKi9cclxuZnVuY3Rpb24gY3JlYXRlSWNvbigpIHtcclxuXHRsZXQgc3ZnID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKFwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiwgXCJzdmdcIik7XHJcblx0bGV0IGcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50TlMoXCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiLCBcImdcIik7XHJcblx0bGV0IHBhdGggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50TlMoXCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiLCBcInBhdGhcIik7XHJcblxyXG5cdHN2Zy5zZXRBdHRyaWJ1dGUoJ3ZlcnNpb24nLCAnMS4xJyk7XHJcblx0c3ZnLnNldEF0dHJpYnV0ZSgneG1sbnMnLCAnaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnKTtcclxuXHRzdmcuc2V0QXR0cmlidXRlKCd4bWxuczp4bGluaycsICdodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rJyk7XHJcblx0c3ZnLnNldEF0dHJpYnV0ZSgneCcsICcwcHgnKTtcclxuXHRzdmcuc2V0QXR0cmlidXRlKCd5JywgJzBweCcpO1xyXG5cdHN2Zy5zZXRBdHRyaWJ1dGUoJ3dpZHRoJywgJzQwcHgnKTtcclxuXHRzdmcuc2V0QXR0cmlidXRlKCdoZWlnaHQnLCAnNDBweCcpO1xyXG5cdHN2Zy5zZXRBdHRyaWJ1dGUoJ3ZpZXdCb3gnLCAnMCAwIDQ0Ni44NDMgNDQ2Ljg0MycpO1xyXG5cdHN2Zy5zZXRBdHRyaWJ1dGUoJ3N0eWxlJywgJ2VuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgNDQ2Ljg0MyA0NDYuODQzOycpO1xyXG5cdHN2Zy5zZXRBdHRyaWJ1dGUoJ3htbDpzcGFjZScsICdwcmVzZXJ2ZScpO1xyXG5cclxuXHRwYXRoLnNldEF0dHJpYnV0ZSgnZCcsICdNNDQ0LjA5LDkzLjEwM2MtMi42OTgtMy42OTktNy4wMDYtNS44ODgtMTEuNTg0LTUuODg4SDEwOS45MmMtMC42MjUsMC0xLjI0OSwwLjAzOC0xLjg1LDAuMTE5bC0xMy4yNzYtMzguMjdjLTEuMzc2LTMuOTU4LTQuNDA2LTcuMTEzLTguMy04LjY0NkwxOS41ODYsMTQuMTM0Yy03LjM3NC0yLjg4Ny0xNS42OTUsMC43MzUtMTguNTkxLDguMWMtMi44OTEsNy4zNjksMC43MywxNS42OTUsOC4xLDE4LjU5MWw2MC43NjgsMjMuODcybDc0LjM4MSwyMTQuMzk5Yy0zLjI4MywxLjE0NC02LjA2NSwzLjY2My03LjMzMiw3LjE4N2wtMjEuNTA2LDU5LjczOWMtMS4zMTgsMy42NjMtMC43NzUsNy43MzMsMS40NjgsMTAuOTE2YzIuMjQsMy4xODMsNS44ODMsNS4wNzgsOS43NzMsNS4wNzhoMTEuMDQ0Yy02Ljg0NCw3LjYxNi0xMS4wNDQsMTcuNjQ2LTExLjA0NCwyOC42NzVjMCwyMy43MTgsMTkuMjk4LDQzLjAxMiw0My4wMTIsNDMuMDEyczQzLjAxMi0xOS4yOTQsNDMuMDEyLTQzLjAxMmMwLTExLjAyOS00LjItMjEuMDU5LTExLjA0NC0yOC42NzVoOTMuNzc2Yy02Ljg0Nyw3LjYxNi0xMS4wNDgsMTcuNjQ2LTExLjA0OCwyOC42NzVjMCwyMy43MTgsMTkuMjk0LDQzLjAxMiw0My4wMTMsNDMuMDEyYzIzLjcxOCwwLDQzLjAxMi0xOS4yOTQsNDMuMDEyLTQzLjAxMmMwLTExLjAyOS00LjItMjEuMDU5LTExLjA0My0yOC42NzVoMTMuNDMzYzYuNTk5LDAsMTEuOTQ3LTUuMzQ5LDExLjk0Ny0xMS45NDhjMC02LjU5OS01LjM0OS0xMS45NDctMTEuOTQ3LTExLjk0N0gxNDMuNjQ3bDEzLjMxOS0zNi45OTZjMS43MiwwLjcyNCwzLjU3OCwxLjE1Miw1LjUyMywxLjE1MmgyMTAuMjc4YzYuMjM0LDAsMTEuNzUxLTQuMDI3LDEzLjY1LTkuOTU5bDU5LjczOS0xODYuMzg3QzQ0Ny41NTcsMTAxLjU2Nyw0NDYuNzg4LDk2LjgwMiw0NDQuMDksOTMuMTAzeiBNMTY5LjY1OSw0MDkuODA3Yy0xMC41NDMsMC0xOS4xMTYtOC41NzMtMTkuMTE2LTE5LjExNnM4LjU3My0xOS4xMTcsMTkuMTE2LTE5LjExN3MxOS4xMTYsOC41NzQsMTkuMTE2LDE5LjExN1MxODAuMjAyLDQwOS44MDcsMTY5LjY1OSw0MDkuODA3eiBNMzI3LjM2Nyw0MDkuODA3Yy0xMC41NDMsMC0xOS4xMTctOC41NzMtMTkuMTE3LTE5LjExNnM4LjU3NC0xOS4xMTcsMTkuMTE3LTE5LjExN2MxMC41NDIsMCwxOS4xMTYsOC41NzQsMTkuMTE2LDE5LjExN1MzMzcuOTA5LDQwOS44MDcsMzI3LjM2Nyw0MDkuODA3eiBNNDAyLjUyLDE0OC4xNDloLTczLjE2MVYxMTUuODloODMuNDk5TDQwMi41MiwxNDguMTQ5eiBNMzgxLjQ1MywyMTMuODYxaC01Mi4wOTR2LTM3LjAzOGg2My45NjdMMzgxLjQ1MywyMTMuODYxeiBNMjM0LjU3MSwyMTMuODYxdi0zNy4wMzhoNjYuMTEzdjM3LjAzOEgyMzQuNTcxeiBNMzAwLjY4NCwyNDIuNTM4djMxLjA2NGgtNjYuMTEzdi0zMS4wNjRIMzAwLjY4NHogTTEzOS4xMTUsMTc2LjgyM2g2Ni43ODR2MzcuMDM4aC01My45MzNMMTM5LjExNSwxNzYuODIzeiBNMjM0LjU3MSwxNDguMTQ5VjExNS44OWg2Ni4xMTN2MzIuMjU5SDIzNC41NzF6IE0yMDUuODk4LDExNS44OXYzMi4yNTloLTc2LjczNGwtMTEuMTkxLTMyLjI1OUgyMDUuODk4eiBNMTYxLjkxNiwyNDIuNTM4aDQzLjk4MnYzMS4wNjRoLTMzLjIwNkwxNjEuOTE2LDI0Mi41Mzh6IE0zMjkuMzU5LDI3My42MDN2LTMxLjA2NGg0Mi45MDlsLTkuOTU1LDMxLjA2NEgzMjkuMzU5eicpO1xyXG5cclxuXHRnLmFwcGVuZENoaWxkKHBhdGgpO1xyXG5cdHN2Zy5hcHBlbmRDaGlsZChnKTtcclxuXHJcblx0bGV0ICBkaXYgPSBET00uY3JlYXRlRWxlbWVudCgnZGl2Jywge1xyXG5cdFx0aWQ6ICdjYXJ0SWNvbicsXHJcblx0fSk7XHJcblxyXG5cdGRpdi5hcHBlbmRDaGlsZChzdmcpO1xyXG5cclxuXHRyZXR1cm4gZGl2O1xyXG59XHJcblxyXG4vKipcclxuICogQ3JlYXRlcyB0aGUgY2FydCBsb2FkZXIgaWNvbi5cclxuICpcclxuICogQHJldHVybiBTVkdTVkdFbGVtZW50XHJcbiAqL1xyXG5mdW5jdGlvbiBjcmVhdGVMb2FkZXIoKSB7XHJcblx0bGV0IHN2ZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnROUyhcImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIsIFwic3ZnXCIpO1xyXG5cdGxldCBjb3VudCA9IDEyO1xyXG5cdGxldCBncm91cHMgPSBbXTtcclxuXHRsZXQgcmVjdGFuZ2VscyA9IFtdO1xyXG5cdGxldCBhbmltYXRpb25zID0gW107XHJcblxyXG5cdHN2Zy5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgJ2xkcy1zcGlubmVyJyk7XHJcblx0c3ZnLnNldEF0dHJpYnV0ZSgnd2lkdGgnLCAnMjAwcHgnKTtcclxuXHRzdmcuc2V0QXR0cmlidXRlKCdoZWlnaHQnLCAnMjAwcHgnKTtcclxuXHRzdmcuc2V0QXR0cmlidXRlKCd4bWxucycsICdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZycpO1xyXG5cdHN2Zy5zZXRBdHRyaWJ1dGUoJ3htbG5zOnhsaW5rJywgJ2h0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsnKTtcclxuXHRzdmcuc2V0QXR0cmlidXRlKCd2aWV3Qm94JywgJzAgMCAxMDAgMTAwJyk7XHJcblx0c3ZnLnNldEF0dHJpYnV0ZSgncHJlc2VydmVBc3BlY3RSYXRpbycsICd4TWlkWU1pZCcpO1xyXG5cdHN2Zy5zZXRBdHRyaWJ1dGUoJ3N0eWxlJywgJ2JhY2tncm91bmQ6IG5vbmU7Jyk7XHJcblx0XHJcblx0dmFyIHJvdGF0aW9uID0gMDtcclxuXHJcblx0Zm9yICh2YXIgaSA9IDA7IGkgPCBjb3VudDsgaSsrKSB7XHJcblx0XHRsZXQgZ3JvdXAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50TlMoXCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiLCBcImdcIik7XHJcblx0XHRncm91cC5zZXRBdHRyaWJ1dGUoJ3RyYW5zZm9ybScsICdyb3RhdGUoJyArIHJvdGF0aW9uICsgJyA1MCA1MCknKTtcclxuXHRcdHJvdGF0aW9uICs9IDMwO1xyXG5cdFx0Z3JvdXBzLnB1c2goZ3JvdXApO1xyXG5cdH1cclxuXHJcblx0Zm9yICh2YXIgaSA9IDA7IGkgPCBjb3VudDsgaSsrKSB7XHJcblx0XHRsZXQgcmVjdGFuZ2VsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKFwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiwgXCJyZWN0XCIpO1xyXG5cdFx0cmVjdGFuZ2VsLnNldEF0dHJpYnV0ZSgneCcsICc0NycpO1xyXG5cdFx0cmVjdGFuZ2VsLnNldEF0dHJpYnV0ZSgneScsICcyNCcpO1xyXG5cdFx0cmVjdGFuZ2VsLnNldEF0dHJpYnV0ZSgncngnLCAnOS40Jyk7XHJcblx0XHRyZWN0YW5nZWwuc2V0QXR0cmlidXRlKCdyeScsICc0LjgnKTtcclxuXHRcdHJlY3RhbmdlbC5zZXRBdHRyaWJ1dGUoJ3dpZHRoJywgJzYnKTtcclxuXHRcdHJlY3RhbmdlbC5zZXRBdHRyaWJ1dGUoJ2hlaWdodCcsICcxMicpO1xyXG5cdFx0cmVjdGFuZ2VsLnNldEF0dHJpYnV0ZSgnZmlsbCcsICcjNDY1OGFjJyk7XHJcblx0XHRyZWN0YW5nZWxzLnB1c2gocmVjdGFuZ2VsKTtcclxuXHR9XHJcblxyXG5cdHZhciBiZWdpbiA9IDAuMDkgKiAxMTtcclxuXHJcblx0Zm9yICh2YXIgaSA9IDA7IGkgPCBjb3VudDsgaSsrKSB7XHJcblx0XHRsZXQgYW5pbWF0ZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnROUyhcImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIsIFwiYW5pbWF0ZVwiKTtcclxuXHRcdGFuaW1hdGUuc2V0QXR0cmlidXRlKCdhdHRyaWJ1dGVOYW1lJywgJ29wYWNpdHknKTtcclxuXHRcdGFuaW1hdGUuc2V0QXR0cmlidXRlKCd2YWx1ZXMnLCAnMTswJyk7XHJcblx0XHRhbmltYXRlLnNldEF0dHJpYnV0ZSgndGltZXMnLCAnMDsxJyk7XHJcblx0XHRhbmltYXRlLnNldEF0dHJpYnV0ZSgnZHVyJywgJzFzJyk7XHJcblx0XHRhbmltYXRlLnNldEF0dHJpYnV0ZSgnYmVnaW4nLCBiZWdpbi50b0ZpeGVkKDgpICsgJ3MnKTtcclxuXHRcdGFuaW1hdGUuc2V0QXR0cmlidXRlKCdyZXBlYXRDb3VudCcsICdpbmRlZmluaXRlJyk7XHJcblx0XHRhbmltYXRpb25zLnB1c2goYW5pbWF0ZSk7XHJcblx0XHRiZWdpbiAtPSAwLjA5O1xyXG5cdH1cclxuXHJcblx0Zm9yICh2YXIgaSA9IDA7IGkgPCBncm91cHMubGVuZ3RoOyBpKyspIHtcclxuXHRcdGxldCBncm91cCA9IGdyb3Vwc1tpXTtcdFx0XHJcblx0XHRsZXQgcmVjdGFuZ2VsID0gcmVjdGFuZ2Vsc1tpXTtcclxuXHRcdGxldCBhbmltYXRlID0gYW5pbWF0aW9uc1tpXTtcclxuXHRcdHJlY3RhbmdlbC5hcHBlbmRDaGlsZChhbmltYXRlKTtcclxuXHRcdGdyb3VwLmFwcGVuZENoaWxkKHJlY3RhbmdlbCk7XHJcblx0XHRzdmcuYXBwZW5kQ2hpbGQoZ3JvdXApO1xyXG5cdH1cclxuXHJcblx0RE9NLmFkZENsYXNzKHN2ZywgJ2NhcnQtbG9hZGVyJyk7XHJcblxyXG5cdHJldHVybiBzdmc7XHRcclxufVxuXG4vKipcclxuICogQGZpbGUgXHJcbiAqIEZpbHRlciBjbGFzcy5cclxuICpcclxuICogVGhlIEZpbHRlciBPYmplY3QsIGhhbmRsZXMgdGhlIGZpbHRlciBvZiB0aGUgcHJvZHVjdHMvc2VydmljZXMuXHJcbiAqL1xyXG5cclxuLyoqXHJcbiAqIFRoZSBkZWZhdWx0IHNldHRpbmdzIG9mIHRoZSBmaWx0ZXIuXHJcbiAqL1xyXG5sZXQgZGVmYXVsdFNldHRpbmdzJDIgPSB7XHJcblx0ZWxlbWVudDogJy5maWx0ZXInLFxyXG5cdGNsYXNzOiAnJyxcclxuXHR3aWR0aDogJycsXHJcblx0aGVpZ2h0OiAnJyxcclxuXHRub19jc3M6IGZhbHNlLFxyXG59O1xyXG5cclxuLyoqXHJcbiAqIFN0b3JlcyB0aGUgY29udGFpbmVyIG9iamVjdC5cclxuICpcclxuICogQHZhciBcXENvcmVcXENvbnRhaW5lclxyXG4gKi9cclxubGV0IENvbnRhaW5lciQxO1xyXG5cclxuY2xhc3MgRmlsdGVyIFxyXG57XHJcblx0LyoqXHJcblx0ICogLSBJbml0aWFsaXplIHRoZSBJb0MgY29udGFpbmVyLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIFxcQ29yZVxcQ29udGFpbmVyIHwgY29udGFpbmVyXHJcblx0ICogQHJldHVybiB2b2lkXHJcblx0ICovXHJcblx0Y29uc3RydWN0b3IoY29udGFpbmVyKSBcclxuXHR7XHJcblx0XHRDb250YWluZXIkMSA9IGNvbnRhaW5lcjtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFNldHVwIHRoZSBmaWx0ZXIgY2xhc3MuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gb2JqZWN0IHwgc2V0dGluZ3NcclxuXHQgKiBAcmV0dXJuIHZvaWRcclxuXHQgKi9cclxuXHRzZXR1cChzZXR0aW5ncylcclxuXHR7XHJcblx0XHRpZih0eXBlb2Ygc2V0dGluZ3MgIT0gJ29iamVjdCcpIHtcclxuXHRcdFx0dGhyb3cgbmV3IEludmFsaWRBcmd1bWVudEV4Y2VwdGlvbiQxO1xyXG5cdFx0fVxyXG5cclxuXHRcdHRoaXMuc2V0dGluZ3MgPSBDb21tb24uZXh0ZW5kKGRlZmF1bHRTZXR0aW5ncyQyLCBzZXR0aW5ncyk7XHJcblxyXG5cdFx0ZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsIGZ1bmN0aW9uKCkge1xyXG5cclxuXHRcdFx0dGhpcy5zZXRFbGVtZW50KHRoaXMuc2V0dGluZ3MuZWxlbWVudCk7XHJcblxyXG5cdFx0XHR0aGlzLmFkZFN0eWxlVGFnKCk7XHRcclxuXHRcdH0uYmluZCh0aGlzKSk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBTZXRzIHRoZSBlbGVtZW50IHRvIGJlIGJvdW5kIHRvLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIHN0cmluZyB8IHNlbGVjdG9yXHJcblx0ICogQHJldHVybiB2b2lkXHJcblx0ICovXHJcblx0c2V0RWxlbWVudChzZWxlY3RvcilcclxuXHR7XHJcblx0XHR0aGlzLmVsZW1lbnQgPSBET00uZmluZChzZWxlY3Rvcik7XHJcblx0XHRcclxuXHRcdERPTS5hZGRDbGFzcyh0aGlzLmVsZW1lbnQsIHRoaXMuc2V0dGluZ3MuY2xhc3MpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQWRkIHRoZSBlQ29tbWVyY2Ugc3R5bGUgdGFncyB0byB0aGUgRE9NLlxyXG5cdCAqL1xyXG5cdGFkZFN0eWxlVGFnKCkgXHJcblx0e1xyXG5cdFx0aWYgKERPTS5maW5kKCcjVHVyYm8tZUNvbW1lcmNlLUZpbHRlcicpKSB7XHJcblx0XHRcdHJldHVybjtcclxuXHRcdH1cclxuXHJcblx0XHRpZiAodGhpcy5zZXR0aW5ncy5ub19jc3MpIHtcclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0fVxyXG5cclxuXHRcdGxldCB3aWR0aCA9ICh0aGlzLnNldHRpbmdzLndpZHRoKSA/ICd3aWR0aDonICsgdGhpcy5zZXR0aW5ncy53aWR0aCArICc7JyA6ICcnO1xyXG5cdFx0bGV0IG1pbldpZHRoID0gdGhpcy5zZXR0aW5ncy5taW5fd2lkdGggfHwgJzIwMHB4JztcclxuXHRcdGxldCBoZWlnaHQgPSB0aGlzLnNldHRpbmdzLmhlaWdodCB8fCAnYXV0byc7XHJcblxyXG5cdFx0bGV0IGNzcyA9IGBcclxuXHRcdFx0JHt0aGlzLnNldHRpbmdzLmVsZW1lbnR9IHtcclxuXHRcdFx0XHRwb3NpdGlvbjogcmVsYXRpdmU7XHJcblx0XHRcdFx0bWFyZ2luOiA1cHggNXB4O1xyXG5cdFx0XHRcdGJvcmRlcjogMXB4IHNvbGlkICNlNGU0ZTQ7XHJcblx0XHRcdFx0JHt3aWR0aH1cclxuXHRcdFx0XHRtaW4td2lkdGg6ICR7bWluV2lkdGh9O1xyXG5cdFx0XHRcdGhlaWdodDogJHtoZWlnaHR9O1xyXG5cdFx0XHRcdG1pbi1oZWlnaHQ6IDIwMHB4O1xyXG5cdFx0XHRcdGNvbG9yOiAjZmZmZmZmO1xyXG5cdFx0XHRcdG92ZXJmbG93OiBoaWRkZW47XHJcblx0XHRcdH1cclxuXHJcblx0XHRgO1xyXG5cdCAgICBcclxuXHQgICAgRE9NLmFkZFN0eWxlKCdUdXJiby1lQ29tbWVyY2UtRmlsdGVyJywgY3NzKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEhpZGVzIHRoZSBjb21wb25lbnQgZnJvbSB0aGUgRE9NLlxyXG5cdCAqXHJcblx0ICogQHJldHVybiB2b2lkIFxyXG5cdCAqL1xyXG5cdGhpZGUoKVxyXG5cdHtcclxuXHRcdHRoaXMuZWxlbWVudC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xyXG5cdH1cclxufVxuXG5jbGFzcyBVcmxcclxue1xyXG5cdCBzdGF0aWMgcHJvY2Vzc0FqYXhEYXRhKHNlbGVjdG9yLCBjb250ZW50LCB1cmxQYXRoKVxyXG5cdCB7XHJcblx0ICAgIGxldCBjb250ZXh0ID0gRE9NLmZpbmQoc2VsZWN0b3IpO1xyXG5cclxuXHQgICAgY29udGV4dC5pbm5lckhUTUwgPSBjb250ZW50O1xyXG5cdCAgICBsZXQgdGl0bGUgPSBET00uZmluZCgndGl0bGUnLCBjb250ZXh0KTtcclxuXHQgICAgZG9jdW1lbnQudGl0bGUgPSB0aXRsZS5pbm5lckhUTUw7XHJcblx0ICAgIHdpbmRvdy5oaXN0b3J5LnB1c2hTdGF0ZSh7XCJodG1sXCI6Y29udGVudCxcInBhZ2VUaXRsZVwiOiB0aXRsZS5pbm5lckhUTUx9LCBcIlwiLCB1cmxQYXRoKTtcclxuXHJcblx0IFx0d2luZG93Lm9ucG9wc3RhdGUgPSBmdW5jdGlvbihlKSB7XHJcblx0XHQgICAgaWYgKGUuc3RhdGUpIHtcclxuXHRcdCAgICAgICAgY29udGV4dC5pbm5lckhUTUwgPSBlLnN0YXRlLmh0bWw7XHJcblx0XHQgICAgICAgIGRvY3VtZW50LnRpdGxlID0gZS5zdGF0ZS5wYWdlVGl0bGU7XHJcblx0XHQgICAgfVxyXG5cdFx0fTtcclxuXHQgfVxyXG5cclxuXHQvKipcclxuXHQgKiBNb2RpZmllcyB0aGUgZ2V0IHBhcmFtZXRlciBpbiB0aGUgdXJsLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIHN0cmluZyB8IHVybFxyXG5cdCAqIEBwYXJhbSBzdHJpbmcgfCBrZXlcclxuXHQgKiBAcGFyYW0gbnVtYmVyIHwgdmFsdWVcclxuXHQgKiBAcGFyYW0gc3RyaW5nIHwgc2VwYXJhdG9yXHJcblx0ICogQHJldHVybiBzdHJpbmdcclxuXHQgKi9cclxuXHRzdGF0aWMgY2hhbmdlUXVlcnlQYXJhbWV0ZXJWYWx1ZSh1cmwsIGtleSwgdmFsdWUsIHNlcGFyYXRvciA9ICc9JykgXHJcblx0e1xyXG5cdFx0bGV0IHJlZ0V4cCA9IG5ldyBSZWdFeHAoXCIoWz8mXSlcIiArIGtleSArIHNlcGFyYXRvciArIFwiLio/KCZ8JClcIiwgXCJpXCIpO1xyXG5cdFx0bGV0IHBhaXJTZXBhcmF0b3IgPSB1cmwuaW5kZXhPZignPycpICE9PSAtMSA/IFwiJlwiIDogXCI/XCI7XHJcblx0XHQgIFxyXG5cdFx0aWYgKHVybC5tYXRjaChyZWdFeHApKSB7XHJcblx0XHRcdHJldHVybiB1cmwucmVwbGFjZShyZWdFeHAsICckMScgKyBrZXkgKyBzZXBhcmF0b3IgKyB2YWx1ZSArICckMicpO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdCAgICByZXR1cm4gdXJsICsgcGFpclNlcGFyYXRvciArIGtleSArIHNlcGFyYXRvciArIHZhbHVlO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQ2hhbmdlcyB0aGUgdXJsIHRvIGEgZ2l2ZW4gcGFnZSBudW1iZXIuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gc3RyaW5nIHwgcGFyYW1ldGVyS2V5XHJcblx0ICogQHBhcmFtIHN0cmluZyB8IHBhcmFtZXRlclZhbHVlXHJcblx0ICogQHBhcmFtIHN0cmluZyB8IHNlcGFyYXRvclxyXG5cdCAqIEByZXR1cm4gdm9pZFxyXG5cdCAqL1xyXG5cdHN0YXRpYyBjaGFuZ2VQYXJhbWV0ZXIocGFyYW1ldGVyS2V5LCBwYXJhbWV0ZXJWYWx1ZSwgc2VwYXJhdG9yID0gJz0nKVxyXG5cdHtcclxuXHRcdHBhcmFtZXRlclZhbHVlID0gIHBhcmFtZXRlclZhbHVlIHx8IHRoaXMucXVlcnlTdHJpbmcoKVtwYXJhbWV0ZXJLZXldO1xyXG5cdFx0bGV0IHJlcXVlc3RlZFVybCA9IHRoaXMuY2hhbmdlUXVlcnlQYXJhbWV0ZXJWYWx1ZSh3aW5kb3cubG9jYXRpb24uaHJlZiwgcGFyYW1ldGVyS2V5LCBwYXJhbWV0ZXJWYWx1ZSwgc2VwYXJhdG9yKTtcclxuXHRcdHdpbmRvdy5oaXN0b3J5LnJlcGxhY2VTdGF0ZSgnJywgJycsIHJlcXVlc3RlZFVybCk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBDaGFuZ2VzIHRoZSB1cmwuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gc3RyaW5nIHwgdXJsXHJcblx0ICogQHJldHVybiB2b2lkXHJcblx0ICovXHJcblx0c3RhdGljIGNoYW5nZSh1cmwpXHJcblx0e1xyXG5cdFx0d2luZG93Lmhpc3RvcnkucmVwbGFjZVN0YXRlKCcnLCAnJywgdXJsKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEdldCB0aGUgZ2V0IHZhcmlhYmxlcyBmcm9tIHRoZSB1cmwuXHJcblx0ICpcclxuXHQgKiBAcmV0dXJuIGFycmF5XHJcblx0ICovXHJcblx0c3RhdGljIHF1ZXJ5U3RyaW5nKCkgXHJcblx0e1xyXG5cdFx0bGV0IHZhcnMgPSB7fTtcclxuXHRcdGxldCBwYXJ0cyA9IHdpbmRvdy5sb2NhdGlvbi5ocmVmLnJlcGxhY2UoL1s/Jl0rKFtePSZdKyk9KFteJl0qKS9naSwgZnVuY3Rpb24obSwga2V5LCB2YWx1ZSkge1xyXG5cdFx0XHR2YXJzW2tleV0gPSB2YWx1ZTtcclxuXHRcdH0pO1xyXG5cclxuXHRcdHJldHVybiB2YXJzO1xyXG5cdH1cclxuXHJcblxyXG59XG5cbi8vIEhlbHBlcnNcclxuLy8gRXhjZXB0aW9uc1xyXG4vKipcclxuICogQGZpbGUgXHJcbiAqIENhcnQgY2xhc3MuXHJcbiAqXHJcbiAqIEhhbmRsZXMgYWRkaW5nLCByZW1vdmluZyBldGMuLi4gb2YgaXRlbXMuXHJcbiAqL1xyXG5cclxuLyoqXHJcbiAqIFRoZSBkZWZhdWx0IHNldHRpbmdzIG9mIHRoZSBjYXJ0LlxyXG4gKlxyXG4gKiBAdmFyIG9iamVjdFxyXG4gKi9cclxubGV0IGRlZmF1bHRTZXR0aW5ncyQzID0ge1xyXG5cdGVsZW1lbnQ6ICcuY2hlY2tvdXQnLFxyXG5cdG5vX2NzczogZmFsc2UsXHJcbn07XHJcblxyXG4vKipcclxuICogU3RvcmVzIHRoZSBjb250YWluZXIgb2JqZWN0LlxyXG4gKlxyXG4gKiBAdmFyIFxcQ29yZVxcQ29udGFpbmVyXHJcbiAqL1xyXG5sZXQgQ29udGFpbmVyJDI7XHJcblxyXG4vKipcclxuICogU3RvcmVzIHRoZSBldmVudCBtYW5hZ2VyIG9iamVjdC5cclxuICpcclxuICogQHZhciBcXENvcmVcXEV2ZW50TWFuYWdlclxyXG4gKi9cclxubGV0IEV2ZW50TWFuYWdlciQzO1xyXG5cclxuLyoqXHJcbiAqIFN0b3JlcyB0aGUgcmVxdWVzdCBvYmplY3QuXHJcbiAqXHJcbiAqIEB2YXIgXFxIZWxwZXJzXFxSZXF1ZXN0XHJcbiAqL1xyXG5sZXQgSHR0cCQxO1xyXG5cclxuXHJcbmNsYXNzIENoZWNrb3V0IFxyXG57XHJcblx0LyoqXHJcblx0ICogLSBJbml0aWFsaXplIHRoZSBJb0MgY29udGFpbmVyXHJcblx0ICogLSBJbml0aWFsaXplIHRoZSBSZXF1ZXN0XHJcblx0ICogLSBJbml0aWFsaXplIHRoZSBFdmVudE1hbmFnZXJcclxuXHQgKiAtIExpc3RlbiB0byBjaGVja291dCBldmVudC5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSBcXENvcmVcXENvbnRhaW5lciB8IGNvbnRhaW5lclxyXG5cdCAqIEBwYXJhbSBcXEhlbHBlcnNcXFJlcXVlc3QgfCBodHRwXHJcblx0ICogQHBhcmFtIFxcQ29yZVxcRXZlbnRNYW5hZ2VyIHwgZXZlbnRNYW5hZ2VyXHJcblx0ICogQHJldHVybiB2b2lkXHJcblx0ICovXHJcblx0Y29uc3RydWN0b3IoY29udGFpbmVyLCBodHRwLCBldmVudE1hbmFnZXIpIFxyXG5cdHtcclxuXHRcdENvbnRhaW5lciQyID0gY29udGFpbmVyO1xyXG5cdFx0SHR0cCQxID0gaHR0cDtcclxuXHRcdEV2ZW50TWFuYWdlciQzID0gZXZlbnRNYW5hZ2VyO1xyXG5cdFx0XHJcblx0XHRFdmVudE1hbmFnZXIkMy5zdWJzY3JpYmUoJ2NhcnQuY2hlY2tvdXQnLCBmdW5jdGlvbigpIHtcdFxyXG5cdFx0XHR0aGlzLmNoYW5nZVVybCgpO1xyXG5cdFx0XHR0aGlzLmhpZGVBbGwoKTtcclxuXHRcdFx0dGhpcy5zaG93KCk7XHJcblx0XHR9LmJpbmQodGhpcykpO1x0XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBTZXRzIHRoZSBvYmplY3QgYnkgdGhlIHVzZXJzIHNldHRpbmcuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gb2JqZWN0IHwgc2V0dGluZ3NcclxuXHQgKiBAcmV0dXJuIHZvaWRcclxuXHQgKi9cclxuXHRzZXR1cChzZXR0aW5ncylcclxuXHR7XHJcblx0XHRpZiAodHlwZW9mIHNldHRpbmdzICE9ICdvYmplY3QnKSB7XHJcblx0XHRcdHRocm93IG5ldyBJbnZhbGlkQXJndW1lbnRFeGNlcHRpb24kMTtcclxuXHRcdH1cclxuXHJcblx0XHR0aGlzLnNldHRpbmdzID0gQ29tbW9uLmV4dGVuZChkZWZhdWx0U2V0dGluZ3MkMywgc2V0dGluZ3MpO1xyXG5cclxuXHRcdGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCBmdW5jdGlvbigpIHtcclxuXHJcblx0XHRcdHRoaXMuc2V0RWxlbWVudCh0aGlzLnNldHRpbmdzLmVsZW1lbnQpO1xyXG5cdFx0XHR0aGlzLmhpZGUoKTtcclxuXHRcdFx0dGhpcy5hZGRTdHlsZVRhZygpO1xyXG5cdFx0fS5iaW5kKHRoaXMpKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEJpbmRzIGV2ZXJ0aGluZyB0byB0aGUgZWxlbWVudC5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSBzdHJpbmcgfCBzZWxlY3RvclxyXG5cdCAqIEByZXR1cm4gdm9pZFxyXG5cdCAqL1xyXG5cdHNldEVsZW1lbnQoc2VsZWN0b3IpXHJcblx0e1xyXG5cdFx0dGhpcy5lbGVtZW50ID0gRE9NLmZpbmQoc2VsZWN0b3IpO1xyXG5cclxuXHRcdGlmICh0aGlzLmVsZW1lbnQpIHtcclxuXHRcdFx0RE9NLmFkZENsYXNzKHRoaXMuZWxlbWVudCwgdGhpcy5zZXR0aW5ncy5jbGFzcyk7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBDaGFuZ2VzIHRoZSB1cmwgdG8gYmUgY2hlY2tvdXRcclxuXHQgKlxyXG5cdCAqIEByZXR1cm4gdm9pZCBcclxuXHQgKi9cclxuXHRjaGFuZ2VVcmwoKVxyXG5cdHtcclxuXHRcdFVybC5jaGFuZ2UoJ2NoZWNrb3V0Jyk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBBZGQgdGhlIGVDb21tZXJjZSBzdHlsZSB0YWdzIHRvIHRoZSBET00uXHJcblx0ICpcclxuXHQgKiBAcmV0dXJuIHZvaWRcclxuXHQgKi9cclxuXHRhZGRTdHlsZVRhZygpIFxyXG5cdHtcclxuXHRcdGlmIChET00uZmluZCgnI1R1cmJvLWVDb21tZXJjZS1DaGVja291dCcpKSB7XHJcblx0XHRcdHJldHVybjtcclxuXHRcdH1cclxuXHJcblx0XHRpZiAodGhpcy5zZXR0aW5ncy5ub19jc3MpIHtcclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0fVxyXG5cclxuXHRcdGxldCBwb3NpdGlvbiA9ICh0aGlzLnNldHRpbmdzLmZpeGVkKSA/ICdmaXhlZCcgOiAnYWJzb2x1dGUnO1xyXG5cclxuXHRcdGxldCBjc3MgPSBgXHJcblx0XHRcdCR7dGhpcy5zZXR0aW5ncy5lbGVtZW50fSB7XHJcblx0XHRcdFx0d2lkdGg6IDEwMCU7XHJcblx0XHRcdFx0bWluLWhlaWdodDogNDAwcHg7XHJcblx0XHRcdFx0Ym9yZGVyOiAxcHggc29saWQgI2U0ZTRlNDtcclxuXHRcdFx0fVxyXG5cdFx0YDtcclxuXHQgICAgXHJcblx0ICAgIERPTS5hZGRTdHlsZSgnVHVyYm8tZUNvbW1lcmNlLUNoZWNrb3V0JywgY3NzKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEhpZGVzIGFsbCBpcnJlbGV2YW50IGVsZW1lbnRzIGZyb20gdGhlIERPTS5cclxuXHQgKlxyXG5cdCAqIEByZXR1cm4gdm9pZCBcclxuXHQgKi9cclxuXHRoaWRlQWxsKClcclxuXHR7XHRcclxuXHRcdENvbnRhaW5lciQyLkNvbXBvbmVudHMuYm9vdGVkLmZvckVhY2goZnVuY3Rpb24oY29tcG9uZW50KSB7XHJcblx0XHRcdGlmIChjb21wb25lbnQuY29uc3RydWN0b3IubmFtZSAhPSAnQ2hlY2tvdXQnKSB7XHJcblx0XHRcdFx0Y29tcG9uZW50LmhpZGUoKTtcclxuXHRcdFx0fVxyXG5cdFx0fSk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBIaWRlcyB0aGUgY29tcG9uZW50IGZyb20gdGhlIERPTS5cclxuXHQgKlxyXG5cdCAqIEByZXR1cm4gdm9pZCBcclxuXHQgKi9cclxuXHRoaWRlKClcclxuXHR7XHJcblx0XHR0aGlzLmVsZW1lbnQuc3R5bGUuZGlzcGxheSA9ICdub25lJztcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFNob3dzIHRoZSBlbGVtZW50IG9uIHRoZSBET00uXHJcblx0ICpcclxuXHQgKiBAcmV0dXJuIHZvaWQgXHJcblx0ICovXHJcblx0c2hvdygpXHJcblx0e1xyXG5cdFx0dGhpcy5lbGVtZW50LnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xyXG5cdH1cclxufVxuXG4vKipcclxuICogQGZpbGUgXHJcbiAqIFByb2R1Y3RzIGNsYXNzLlxyXG4gKlxyXG4gKiBUaGUgUHJvZHVjdHMgY29tcG9uZW50LCBoYW5kbGVzIHRoZSBwcm9kdWN0cyB0YXNrcy5cclxuICovXHJcblxyXG5cclxuLyoqXHJcbiAqIFRoZSBkZWZhdWx0IHNldHRpbmdzIG9mIGVhY2ggcHJvZHVjdC5cclxuICpcclxuICogQHZhciBvYmplY3RcclxuICovXHJcbmxldCBkZWZhdWx0U2V0dGluZ3MkNCA9IHtcclxuXHRlbGVtZW50OiAnLnByb2R1Y3RzJyxcclxuXHRjbGFzczogJycsXHJcblx0aXRlbV9jbGFzczogJycsXHJcblx0YWRkX2J1dHRvbl9jbGFzczogJ2J0biBidG4tcHJpbWFyeScsXHJcblx0ZmF2b3JpdGVfYnV0dG9uX2NsYXNzOiAnYnRuIGJ0bi1kYW5nZXInLFxyXG5cdHdpZHRoOiAnMjAwcHgnLFxyXG5cdGhlaWdodDogJzI1MHB4JyxcclxuXHRhdHRyaWJ1dGVzOiBbJ25hbWUnLCAncHJpY2UnLCAnZGVsaXZlcnlUaW1lJywgJ2ltYWdlJ10sXHJcblx0dXJsOiAncHJvZHVjdHMucGhwJyxcclxuXHRub19jc3M6IGZhbHNlLFxyXG5cdGN1cnJlbmN5OiAnJCcsXHJcbn07XHJcblxyXG4vKipcclxuICogU3RvcmVzIHRoZSBjb250YWluZXIgb2JqZWN0LlxyXG4gKiBcclxuICogQHZhciBcXENvcmVcXENvbnRhaW5lclxyXG4gKi9cclxubGV0IENvbnRhaW5lciQzO1xyXG5cclxuLyoqXHJcbiAqIFN0b3JlcyB0aGUgY29udGFpbmVyIG9iamVjdC5cclxuICogXHJcbiAqIEB2YXIgXFxDb3JlXFxFdmVudE1hbmFnZXJcclxuICovXHJcbmxldCBFdmVudE1hbmFnZXIkNDtcclxuXHJcbi8qKlxyXG4gKiBTdG9yZXMgdGhlIHJlcXVlc3Qgb2JqZWN0LlxyXG4gKiBcclxuICogQHZhciBcXEhlbHBlclxcUmVxdWVzdCBcclxuICovXHJcbmxldCBIdHRwJDI7XHJcblxyXG4vKipcclxuICogU3RvcmVzIHRoZSBjaHVua2VkIHBlciBcclxuICogcGFnZSBwcm9kdWN0cy5cclxuICogXHJcbiAqIEB2YXIgYXJyYXlcclxuICovXHJcbmxldCBjaHVua2VkUHJvZHVjdHM7XHJcblxyXG5jbGFzcyBQcm9kdWN0cyBcclxue1xyXG5cdC8qKlxyXG5cdCAqIEluaXRhbGl6ZSB0aGUgQ29udGFpbmVyLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIFxcQ29yZVxcQ29udGFpbmVyIHwgY29udGFpbmVyXHJcblx0ICogQHBhcmFtIFxcSGVscGVyc1xcUmVxdWVzdCB8IGh0dHBcclxuXHQgKiBAcmV0dXJuIHZvaWRcclxuXHQgKi9cclxuXHRjb25zdHJ1Y3Rvcihjb250YWluZXIsIGh0dHAsIGV2ZW50TWFuYWdlcikgXHJcblx0e1xyXG5cdFx0Q29udGFpbmVyJDMgPSBjb250YWluZXI7XHJcblx0XHRIdHRwJDIgPSBodHRwO1xyXG5cdFx0RXZlbnRNYW5hZ2VyJDQgPSBldmVudE1hbmFnZXI7XHJcblx0XHRjaHVua2VkUHJvZHVjdHMgPSBbXTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFNldHMgdGhlIGdpdmVuIHNldHRpbmdzIGZyb20gdGhlIHVzZXIuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gb2JqZWN0IHwgc2V0dGluZ3NcclxuXHQgKiBAcmV0dXJuIHZvaWRcclxuXHQgKi9cclxuXHRzZXR1cChzZXR0aW5ncylcclxuXHR7XHJcblx0XHRpZiAodHlwZW9mIHNldHRpbmdzICE9ICdvYmplY3QnKSB7XHJcblx0XHRcdHRocm93IG5ldyBJbnZhbGlkQXJndW1lbnRFeGNlcHRpb24kMTtcclxuXHRcdH1cclxuXHJcblx0XHR0aGlzLnNldHRpbmdzID0gQ29tbW9uLmV4dGVuZChkZWZhdWx0U2V0dGluZ3MkNCwgc2V0dGluZ3MpO1xyXG5cdFx0dGhpcy50b3RhbEl0ZW1zID0gbnVsbDtcclxuXHJcblx0XHRkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgZnVuY3Rpb24oKSB7XHJcblxyXG5cdFx0XHR0aGlzLnNldEVsZW1lbnQodGhpcy5zZXR0aW5ncy5lbGVtZW50KTtcclxuXHJcblx0XHRcdHRoaXMuYWRkU3R5bGVUYWcoKTtcdFxyXG5cclxuXHRcdFx0dGhpcy5sb2FkUHJvZHVjdHMoMSk7XHJcblx0XHR9LmJpbmQodGhpcykpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogTG9hZHMgdGhlIHByb2R1Y3RzIGZvciB0aGUgcGFnZS5cclxuXHQgKiBcclxuXHQgKiBAcGFyYW0gbnVtYmVyIHwgcGFnZU51bWJlclxyXG5cdCAqIEByZXR1cm4gdm9pZFxyXG5cdCAqL1xyXG5cdGxvYWRQcm9kdWN0cyhwYWdlTnVtYmVyID0gMSlcclxuXHR7XHJcblx0XHRpZiAoQ29udGFpbmVyJDMuUGFnaW5hdGlvbiAmJiBDb250YWluZXIkMy5QYWdpbmF0aW9uLmJvb3RlZCkge1xyXG5cdFx0XHRcclxuXHRcdFx0bGV0IGxpbWl0ID0gQ29udGFpbmVyJDMuUGFnaW5hdGlvbi5zZXR0aW5ncy5wZXJfcGFnZTtcclxuXHJcblx0XHRcdHN3aXRjaChDb250YWluZXIkMy5QYWdpbmF0aW9uLnNldHRpbmdzLnByb2Nlc3NpbmcpIFxyXG5cdFx0XHR7XHJcblx0XHRcdFx0Y2FzZSAnY2xpZW50LXNpZGUnOlxyXG5cdFx0XHRcdFx0cmV0dXJuIHRoaXMubG9hZFBhZ2VQcm9kdWN0c09uY2UocGFnZU51bWJlciwgbGltaXQpO1xyXG5cdFx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdFx0Y2FzZSAnc2VydmVyLXNpZGUnOlxyXG5cdFx0XHRcdFx0cmV0dXJuIHRoaXMubG9hZFBhZ2VQcm9kdWN0cyhwYWdlTnVtYmVyLCBsaW1pdCk7XHJcblx0XHRcdFx0XHRicmVhaztcclxuXHRcdFx0XHRkZWZhdWx0OlxyXG5cdFx0XHRcdFx0dGhyb3cgbmV3IEludmFsaWRBcmd1bWVudEV4Y2VwdGlvbiQxKCdmb3IgcHJvY2Vzc2luZyB5b3UgY2FuIGNob29zZSBcXCdzZXJ2ZXItc2lkZVxcJyBvciBcXCdjbGllbnQtc2lkZVxcJyBvcHRpb25zLicpO1xyXG5cdFx0XHR9XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHR0aGlzLmxvYWRQYWdlUHJvZHVjdHMoKTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIExvYWRzIHRoZSBwcm9kdWN0cyBhbmQgXHJcblx0ICogcmVwbGFjZSB0aGVtIGluIHRoZSBkaXYgY29udGFpbmVyLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIG51bWJlciB8IHBhZ2VOdW1iZXJcclxuXHQgKiBAcGFyYW0gbnVtYmVyIHwgbGltaXRcclxuXHQgKiBAcmV0dXJuIHZvaWRcclxuXHQgKi9cclxuXHRsb2FkUGFnZVByb2R1Y3RzKHBhZ2VOdW1iZXIgPSBudWxsLCBsaW1pdCA9IG51bGwpXHJcblx0e1xyXG5cdFx0bGV0IHJlcXVlc3QgPSB0aGlzLmdldFByb2R1Y3RzKHBhZ2VOdW1iZXIpO1xyXG5cclxuXHRcdHJlcXVlc3QudGhlbihmdW5jdGlvbihwcm9kdWN0cykge1xyXG5cdFx0XHRpZiAobGltaXQpIHtcclxuXHRcdFx0XHR0aGlzLmN1cnJlbnRJdGVtcyA9IHByb2R1Y3RzLnNsaWNlKDAsIGxpbWl0KTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHR0aGlzLmN1cnJlbnRJdGVtcyA9IHByb2R1Y3RzO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHR0aGlzLnJlcGxhY2VQcm9kdWN0cyh0aGlzLmN1cnJlbnRJdGVtcyk7XHJcblx0XHRcdFByb21pc2UucmVzb2x2ZSh0aGlzLmN1cnJlbnRJdGVtcyk7XHJcblx0XHR9LmJpbmQodGhpcykpLmNhdGNoKGZ1bmN0aW9uKGVycm9yKSB7XHJcblx0XHRcdC8vIHRocm93IG5ldyBFcnJvcignQ291bGQgbm90IGxvYWQgcHJvZHVjdHMhIFJlYXNvbjogJyArIGVycm9yKTtcclxuXHRcdH0pO1xyXG5cclxuXHRcdHJldHVybiByZXF1ZXN0O1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogTG9hZHMgdGhlIHByb2R1Y3RzIGFuZCBcclxuXHQgKiByZXBsYWNlIHRoZW0gaW4gdGhlIGRpdiBjb250YWluZXIuXHJcblx0ICpcclxuXHQgKiBAcmV0dXJuIHZvaWRcclxuXHQgKi9cclxuXHRsb2FkUGFnZVByb2R1Y3RzT25jZShwYWdlTnVtYmVyKVxyXG5cdHtcclxuXHRcdGxldCByZXF1ZXN0O1xyXG5cclxuXHRcdGlmICh0aGlzLnRvdGFsSXRlbXMgPT0gbnVsbCkgeyAvLyBuZWVkIHRvIGZldGNoIHRoZW0gZnJvbSB0aGUgc2VydmVyLlxyXG5cdFx0XHRyZXF1ZXN0ID0gdGhpcy5nZXRQcm9kdWN0cygpO1xyXG5cdFx0fSBlbHNlIHsgLy8gbm8gbmVlZCB0byB3YWl0IGNhbiByZXNvbHZlIGltbWVkaWF0ZWx5IHdpdGggdGhlIHByb2R1Y3RzLiBcclxuXHRcdFx0cmVxdWVzdCA9IFByb21pc2UucmVzb2x2ZSh0aGlzLnRvdGFsSXRlbXMpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHJlcXVlc3QudGhlbihmdW5jdGlvbihwcm9kdWN0cykge1xyXG5cdFx0XHR0aGlzLnRvdGFsSXRlbXMgPSBwcm9kdWN0cztcclxuXHRcdFx0bGV0IHBhZ2VzID0gdGhpcy5jYWxjdWxhdGVDbGllbnRQYWdlcyhwcm9kdWN0cyk7XHJcblx0XHRcdHRoaXMuY3VycmVudEl0ZW1zID0gcGFnZXNbcGFnZU51bWJlci0xXTtcclxuXHRcdFx0dGhpcy5yZXBsYWNlUHJvZHVjdHModGhpcy5jdXJyZW50SXRlbXMpO1xyXG5cdFx0XHRQcm9taXNlLnJlc29sdmUodGhpcy5jdXJyZW50SXRlbXMpO1xyXG5cdFx0fS5iaW5kKHRoaXMpKS5jYXRjaChmdW5jdGlvbihlcnJvcikge1xyXG5cdFx0XHQvLyB0aHJvdyBuZXcgRXJyb3IoJ0NvdWxkIG5vdCBsb2FkIHByb2R1Y3RzISBSZWFzb246ICcgKyBlcnJvcik7XHJcblx0XHR9KTtcclxuXHJcblx0XHRyZXR1cm4gcmVxdWVzdDtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIENhbGN1bGF0ZXMgdGhlIGFtb3VudCBvZiBwYWdlcyBmb3IgdGhlIGNsaWVudC5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSBhcnJheSB8IHByb2R1Y3RzXHJcblx0ICogQHJldHVybiBhcnJheVxyXG5cdCAqL1xyXG5cdGNhbGN1bGF0ZUNsaWVudFBhZ2VzKHByb2R1Y3RzKVxyXG5cdHtcdFxyXG5cdFx0Ly8gV2UgYXJlIHVzaW5nIHBhZ2luYXRpb24gc28gd2UgbmVlZCB0byB1cGRhdGUgaXQgdG9vLlxyXG5cdFx0Q29udGFpbmVyJDMuUGFnaW5hdGlvbi5zZXR0aW5ncy50b3RhbF9pdGVtcyA9IHByb2R1Y3RzLmxlbmd0aDtcclxuXHRcdFxyXG5cdFx0bGV0IHBlclBhZ2UgPSBDb250YWluZXIkMy5QYWdpbmF0aW9uLnNldHRpbmdzLnBlcl9wYWdlOyBcclxuXHJcblx0XHQvLyBXZSBuZWVkIHRvIGNhbGN1bGF0ZSB0aGUgcGFnZXMgb24gZnVsbCBodHRwIHJlcXVlc3QgXHJcblx0XHQvLyBvbmx5IG9uY2UuIHNvIHdlIGNoZWNrIHRvIHNlZSBpZiB3ZSBoYXZlIHJlc3VsdHMgaW4gb3VyIGNhY2hlLlxyXG5cdFx0aWYgKGNodW5rZWRQcm9kdWN0cy5sZW5ndGggIT0gMCkge1xyXG5cdFx0XHRyZXR1cm4gY2h1bmtlZFByb2R1Y3RzO1xyXG5cdFx0fVxyXG5cclxuXHRcdGNodW5rZWRQcm9kdWN0cyA9IENvbW1vbi5hcnJheV9jaHVuayhwcm9kdWN0cywgcGVyUGFnZSk7XHJcblx0XHRyZXR1cm4gY2h1bmtlZFByb2R1Y3RzO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogU2V0cyB0aGUgRE9NIGVsZW1lbnQgXHJcblx0ICogZm9yIHBvcHVsYXRpbmcgdGhlIHByb2R1Y3RzLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIHN0cmluZyB8IHNlbGVjdG9yXHJcblx0ICogQHJldHVybiB2b2lkXHJcblx0ICovXHJcblx0c2V0RWxlbWVudChzZWxlY3RvcilcclxuXHR7XHJcblx0XHR0aGlzLmVsZW1lbnQgPSBET00uZmluZChzZWxlY3Rvcik7XHJcblxyXG5cdFx0aWYgKHRoaXMuZWxlbWVudCkge1xyXG5cdFx0XHRET00uYWRkQ2xhc3ModGhpcy5lbGVtZW50LCB0aGlzLnNldHRpbmdzLmNsYXNzKTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFJlcGxhY2UgcHJvZHVjdHMgaW4gXHJcblx0ICogdGhlIHByb2R1Y3RzIGNvbnRhaW5lci5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSBhcnJheSB8IHJhd1Byb2R1Y3RzXHJcblx0ICogQHJldHVybiBhcnJheVxyXG5cdCAqL1xyXG5cdHJlcGxhY2VQcm9kdWN0cyhyYXdQcm9kdWN0cykgXHJcblx0e1xyXG5cdFx0aWYgKCEgQXJyYXkuaXNBcnJheShyYXdQcm9kdWN0cykgfHwgKHJhd1Byb2R1Y3RzLmxlbmd0aCA8PSAwICYmIHR5cGVvZiByYXdQcm9kdWN0c1swXSA9PSAnc3RyaW5nJykpIHtcclxuXHRcdFx0dGhyb3cgbmV3IEludmFsaWRBcmd1bWVudEV4Y2VwdGlvbiQxO1xyXG5cdFx0fVxyXG5cclxuXHRcdGxldCBwcm9kdWN0cyA9IHRoaXMuYnVpbGRQcm9kdWN0cyhyYXdQcm9kdWN0cywgdGhpcy5zZXR0aW5ncy5pdGVtX2NsYXNzLCAnZGl2Jyk7XHJcblxyXG5cdFx0dGhpcy5lbGVtZW50LmlubmVySFRNTCA9ICcnO1xyXG5cdFx0cHJvZHVjdHMuZm9yRWFjaChmdW5jdGlvbihwcm9kdWN0KSB7XHJcblx0XHRcdEV2ZW50TWFuYWdlciQ0LnB1Ymxpc2goJ3Byb2R1Y3RzLmxvYWRpbmcnLCBwcm9kdWN0KTtcclxuXHRcdFx0dGhpcy5lbGVtZW50LmFwcGVuZENoaWxkKHByb2R1Y3QpO1xyXG5cdFx0fS5iaW5kKHRoaXMpKTtcclxuXHJcblx0XHRFdmVudE1hbmFnZXIkNC5wdWJsaXNoKCdwcm9kdWN0cy5sb2FkZWQnLCBwcm9kdWN0cyk7XHJcblxyXG5cdFx0cmV0dXJuIHByb2R1Y3RzO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogTWFrZXMgYW4gQWpheCBjYWxsIHRvIHRoZSBcclxuXHQgKiBzZXJ2ZXIgd2l0aG91dCBwYXJhbWV0ZXJzLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIG51bWJlciB8IHBhZ2VOdW1iZXJcclxuXHQgKiBAcmV0dXJuIFByb21pc2VcclxuXHQgKi9cclxuXHRnZXRQcm9kdWN0cyhwYWdlTnVtYmVyID0gbnVsbClcclxuXHR7XHJcblx0XHRsZXQgYWN0aW9uID0gKHBhZ2VOdW1iZXIpID8gdGhpcy5zZXR0aW5ncy51cmwgKyAnP3BhZ2U9JyArIHBhZ2VOdW1iZXIgOiB0aGlzLnNldHRpbmdzLnVybDtcclxuXHJcblx0XHRyZXR1cm4gSHR0cCQyLmdldCh7XHJcblx0XHRcdHVybDogYWN0aW9uLFxyXG5cdFx0fSk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBCdWlsZHMgdGhlIGh0bWwgZm9yIHRoZSBwcm9kdWN0cy5cclxuXHQgKiBcclxuXHQgKiBAcGFyYW0gYXJyYXkgfCBhdHRyaWJ1dGVzQ29sbGVjdGlvblxyXG5cdCAqIEBwYXJhbSBzdHJpbmcgfCBjbGFzc05hbWVcclxuXHQgKiBAcGFyYW0gc3RyaW5nIHwgdGFnVHlwZVxyXG5cdCAqIEByZXR1cm4gYXJyYXlcclxuXHQgKi9cclxuXHRidWlsZFByb2R1Y3RzKGF0dHJpYnV0ZXNDb2xsZWN0aW9uLCBjbGFzc05hbWUsIHRhZ1R5cGUpIFxyXG5cdHtcclxuXHRcdGlmKGF0dHJpYnV0ZXNDb2xsZWN0aW9uLmNvbnN0cnVjdG9yLm5hbWUgIT0gJ0FycmF5JyApIHtcclxuXHRcdFx0dGhyb3cgbmV3IEludmFsaWRBcmd1bWVudEV4Y2VwdGlvbiQxO1xyXG5cdFx0fVxyXG5cclxuXHRcdGxldCBidWlsdFByb2R1Y3RzID0gW107XHJcblxyXG5cdFx0Ly8gRW50ZXIgZGVmYXVsdCBhdHRyaWJ1dGUuXHJcblx0XHRpZiAodGhpcy5zZXR0aW5ncy5hdHRyaWJ1dGVzLmluZGV4T2YoJ2N1cnJlbmN5JykgPT0gLTEpIHtcclxuXHRcdFx0dGhpcy5zZXR0aW5ncy5hdHRyaWJ1dGVzLnB1c2goJ2N1cnJlbmN5Jyk7XHJcblx0XHR9XHJcblx0XHRcclxuXHRcdGF0dHJpYnV0ZXNDb2xsZWN0aW9uLmZvckVhY2goZnVuY3Rpb24oYXR0cmlidXRlcykge1xyXG5cdFx0XHRsZXQgYnVpbHRQcm9kdWN0ID0gdGhpcy5idWlsZFByb2R1Y3QoYXR0cmlidXRlcywgY2xhc3NOYW1lLCB0YWdUeXBlKTtcclxuXHRcdFx0YnVpbHRQcm9kdWN0cy5wdXNoKGJ1aWx0UHJvZHVjdCk7XHJcblx0XHR9LmJpbmQodGhpcykpO1xyXG5cclxuXHRcdHJldHVybiBidWlsdFByb2R1Y3RzO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQnVpbGRzIHRoZSBodG1sIGZvciBhIHNpbmdsZSBwcm9kdWN0LlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIG9iamVjdCB8IGF0dHJpYnV0ZXNcclxuXHQgKiBAcGFyYW0gc3RyaW5nIHwgY2xhc3NOYW1lXHJcblx0ICogQHBhcmFtIHN0cmluZyB8IHRhZ1R5cGVcclxuXHQgKiBAcmV0dXJuIG9iamVjdFxyXG5cdCAqL1xyXG5cdGJ1aWxkUHJvZHVjdChhdHRyaWJ1dGVzLCBjbGFzc05hbWUsIHRhZ1R5cGUpIFxyXG5cdHtcclxuXHRcdGlmICh0eXBlb2YgYXR0cmlidXRlcyAhPSAnb2JqZWN0JyB8fCB0eXBlb2YgdGFnVHlwZSAhPSAnc3RyaW5nJykge1xyXG5cdFx0XHR0aHJvdyBuZXcgSW52YWxpZEFyZ3VtZW50RXhjZXB0aW9uJDE7XHJcblx0XHR9XHJcblxyXG5cdFx0Y2xhc3NOYW1lID0gY2xhc3NOYW1lIHx8IG51bGw7XHJcblxyXG5cdFx0bGV0IHByb2R1Y3QgPSBET00uY3JlYXRlRWxlbWVudCgnZGl2Jywge1xyXG5cdFx0XHRjbGFzczogJ3Byb2R1Y3QnXHJcblx0XHR9KTtcclxuXHJcblx0XHRET00uYWRkQ2xhc3MocHJvZHVjdCwgY2xhc3NOYW1lKTtcclxuXHJcblx0XHRsZXQgb3ZlcmxheSA9IERPTS5jcmVhdGVFbGVtZW50KCdkaXYnLCB7XHJcblx0XHRcdGNsYXNzOiAncHJvZHVjdC1vdmVybGF5JyxcclxuXHRcdH0pO1xyXG5cclxuXHRcdHByb2R1Y3QuYXBwZW5kQ2hpbGQob3ZlcmxheSk7XHJcblxyXG5cdFx0YXR0cmlidXRlcyA9IHRoaXMuYWRkRGVmYXVsdEF0dHJpYnV0ZXMoYXR0cmlidXRlcyk7XHJcblxyXG5cdFx0aWYgKGF0dHJpYnV0ZXMuaGFzT3duUHJvcGVydHkoJ2ltYWdlJykpIHtcclxuXHRcdFx0bGV0IGltYWdlID0gRE9NLmNyZWF0ZUVsZW1lbnQoJ2ltZycsIHtcclxuXHRcdFx0XHRzcmM6IGF0dHJpYnV0ZXNbJ2ltYWdlJ11cclxuXHRcdFx0fSk7XHJcblx0XHRcdFxyXG5cdFx0XHRsZXQgdGFnID0gRE9NLmNyZWF0ZUVsZW1lbnQodGFnVHlwZSwge1xyXG5cdFx0XHRcdGNsYXNzOiAncHJvZHVjdC1pbWFnZScsXHJcblx0XHRcdFx0aHRtbDogaW1hZ2Uub3V0ZXJIVE1MXHJcblx0XHRcdH0pO1xyXG5cdFx0XHRcclxuXHRcdFx0cHJvZHVjdC5hcHBlbmRDaGlsZCh0YWcpO1xyXG5cdFx0fVxyXG5cclxuXHRcdGlmIChhdHRyaWJ1dGVzLmhhc093blByb3BlcnR5KCdwcmljZScpKSB7XHJcblx0XHRcdGxldCB0YWcgPSBET00uY3JlYXRlRWxlbWVudCh0YWdUeXBlLCB7XHJcblx0XHRcdFx0Y2xhc3M6ICdwcm9kdWN0LXByaWNlJyxcclxuXHRcdFx0fSk7XHJcblxyXG5cdFx0XHRsZXQgc3BhbiA9IERPTS5jcmVhdGVFbGVtZW50KCdzcGFuJywge1xyXG5cdFx0XHRcdGNsYXNzOiAncHJvZHVjdC1hbW91bnQnLFxyXG5cdFx0XHRcdGh0bWw6IGF0dHJpYnV0ZXMucHJpY2UuYW1vdW50XHJcblx0XHRcdH0pO1xyXG5cclxuXHRcdFx0bGV0IHNwYW4yID0gRE9NLmNyZWF0ZUVsZW1lbnQoJ3NwYW4nLCB7XHJcblx0XHRcdFx0Y2xhc3M6ICdwcm9kdWN0LWN1cnJlbmN5JyxcclxuXHRcdFx0XHRodG1sOiBhdHRyaWJ1dGVzLnByaWNlLmN1cnJlbmN5XHJcblx0XHRcdH0pO1xyXG5cclxuXHRcdFx0dGFnLmFwcGVuZENoaWxkKHNwYW4pO1xyXG5cdFx0XHR0YWcuYXBwZW5kQ2hpbGQoc3BhbjIpO1xyXG5cdFx0XHRvdmVybGF5LmFwcGVuZENoaWxkKHRhZyk7XHJcblx0XHR9XHJcblxyXG5cdFx0Zm9yICh2YXIgYXR0cmlidXRlIGluIGF0dHJpYnV0ZXMpIHtcclxuXHRcdFx0aWYgKCEgQ29tbW9uLmluX2FycmF5KGF0dHJpYnV0ZSwgdGhpcy5zZXR0aW5ncy5hdHRyaWJ1dGVzKSkge1xyXG5cdFx0XHRcdGNvbnRpbnVlO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRpZiAoYXR0cmlidXRlID09ICdwcmljZScgfHwgYXR0cmlidXRlID09ICdpbWFnZScpIHtcclxuXHRcdFx0XHRjb250aW51ZTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0bGV0IHRhZyA9IERPTS5jcmVhdGVFbGVtZW50KHRhZ1R5cGUpO1xyXG5cdFx0XHR0YWcuaW5uZXJIVE1MID0gYXR0cmlidXRlc1thdHRyaWJ1dGVdIHx8ICcnO1xyXG5cdFx0XHRcclxuXHRcdFx0RE9NLmFkZENsYXNzKHRhZywgJ3Byb2R1Y3QtJyArIFN0ci5rZWJhYkNhc2UoYXR0cmlidXRlKSk7XHJcblx0XHRcdG92ZXJsYXkuYXBwZW5kQ2hpbGQodGFnKTtcclxuXHRcdH1cclxuXHJcblx0XHRsZXQgdGFnID0gRE9NLmNyZWF0ZUVsZW1lbnQoJ2RpdicsIHtcclxuXHRcdFx0Y2xhc3M6ICdhY3Rpb24tYnV0dG9ucydcclxuXHRcdH0pO1xyXG5cclxuXHRcdGxldCBhZGRUb0NhcnQgPSBET00uY3JlYXRlRWxlbWVudCgnYnV0dG9uJywge1xyXG5cdFx0XHRjbGFzczogJ2FkZC10by1jYXJ0JyxcclxuXHRcdFx0dHlwZTogJ2J1dHRvbicsXHJcblx0XHRcdHRleHQ6ICcrJyxcclxuXHRcdH0pO1xyXG5cclxuXHRcdGxldCBmYXZvcml0ZSA9IERPTS5jcmVhdGVFbGVtZW50KCdidXR0b24nLCB7XHJcblx0XHRcdGNsYXNzOiAnZmF2b3JpdGUnLFxyXG5cdFx0XHR0eXBlOiAnYnV0dG9uJyxcclxuXHRcdFx0dGV4dDogJyZoZWFydHM7J1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0aWYgKHRoaXMuc2V0dGluZ3MuYWRkX2J1dHRvbl9jbGFzcykge1xyXG5cdFx0XHRET00uYWRkQ2xhc3MoYWRkVG9DYXJ0LCB0aGlzLnNldHRpbmdzLmFkZF9idXR0b25fY2xhc3MpO1xyXG5cdFx0fVxyXG5cclxuXHRcdGlmICh0aGlzLnNldHRpbmdzLmZhdm9yaXRlX2J1dHRvbl9jbGFzcykge1xyXG5cdFx0XHRET00uYWRkQ2xhc3MoZmF2b3JpdGUsIHRoaXMuc2V0dGluZ3MuZmF2b3JpdGVfYnV0dG9uX2NsYXNzKTtcclxuXHRcdH1cclxuXHJcblx0XHR0YWcuYXBwZW5kQ2hpbGQoYWRkVG9DYXJ0KTtcclxuXHRcdHRhZy5hcHBlbmRDaGlsZChmYXZvcml0ZSk7XHJcblxyXG5cdFx0YWRkVG9DYXJ0LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xyXG5cdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XHJcblx0XHRcdEV2ZW50TWFuYWdlciQ0LnB1Ymxpc2goJ2NhcnQucHJvZHVjdC5hZGRlZCcsIGF0dHJpYnV0ZXMpO1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0ZmF2b3JpdGUuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbihlKSB7XHJcblx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcclxuXHRcdFx0dGhpcy5pbm5lckhUTUwgPSAnJiN4MjcxMzsnO1xyXG5cdFx0XHRFdmVudE1hbmFnZXIkNC5wdWJsaXNoKCdjYXJ0LnByb2R1Y3QuZmF2b3JpdGVkJywgYXR0cmlidXRlcyk7XHJcblx0XHR9KTtcclxuXHJcblx0XHRvdmVybGF5LmFwcGVuZENoaWxkKHRhZyk7XHJcblxyXG5cdFx0cmV0dXJuIHByb2R1Y3Q7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBBZGRzIGRlZmF1bHQgYXR0cmlidXRlc1xyXG5cdCAqIHRvIHRoZSBzdXBwbGllZCBhdHRyaWJ1dGVzLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIG9iamVjdCB8IGF0dHJpYnV0ZXNcclxuXHQgKiBAcmV0dXJuIG9iamVjdFxyXG5cdCAqL1xyXG5cdGFkZERlZmF1bHRBdHRyaWJ1dGVzKGF0dHJpYnV0ZXMpXHJcblx0e1xyXG5cdFx0aWYgKGF0dHJpYnV0ZXMuaGFzT3duUHJvcGVydHkoJ3ByaWNlJykgJiYgdHlwZW9mIGF0dHJpYnV0ZXMucHJpY2UgIT0gJ29iamVjdCcpIHtcclxuXHRcdFx0YXR0cmlidXRlcy5wcmljZSA9IHtcclxuXHRcdFx0XHRcImFtb3VudFwiOiBhdHRyaWJ1dGVzLnByaWNlLFxyXG5cdFx0XHRcdFwiY3VycmVuY3lcIjogdGhpcy5zZXR0aW5ncy5jdXJyZW5jeVxyXG5cdFx0XHR9O1xyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiBhdHRyaWJ1dGVzO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQWRkIHRoZSBlQ29tbWVyY2Ugc3R5bGUgdGFncyB0byB0aGUgRE9NLlxyXG5cdCAqL1xyXG5cdGFkZFN0eWxlVGFnKCkgXHJcblx0e1xyXG5cdFx0aWYgKERPTS5maW5kKCcjVHVyYm8tZUNvbW1lcmNlLVByb2R1Y3RzJykpIHtcclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0fVxyXG5cclxuXHRcdGlmICh0aGlzLnNldHRpbmdzLm5vX2Nzcykge1xyXG5cdFx0XHRyZXR1cm47XHJcblx0XHR9XHJcblxyXG5cdFx0bGV0IHdpZHRoID0gdGhpcy5zZXR0aW5ncy53aWR0aCB8fCAnYXV0byc7XHJcblx0XHRsZXQgaGVpZ2h0ID0gdGhpcy5zZXR0aW5ncy5oZWlnaHQgfHwgJzIwMHB4JztcclxuXHRcdGxldCBtaW5XaWR0aCA9IHRoaXMuc2V0dGluZ3MubWluX3dpZHRoIHx8ICcyMDBweCc7XHJcblx0XHRsZXQgbWF4V2lkdGggPSB0aGlzLnNldHRpbmdzLm1heF93aWR0aCB8fCAnMjUwcHgnO1xyXG5cclxuXHRcdGxldCBjc3MgPSBgXHJcblx0XHRcdC5wcm9kdWN0IHtcclxuXHRcdFx0XHRwb3NpdGlvbjogcmVsYXRpdmU7XHJcblx0XHRcdFx0bWFyZ2luOiA1cHggNXB4O1xyXG5cdFx0XHRcdGJvcmRlcjogMXB4IHNvbGlkICNlNGU0ZTQ7XHJcblx0XHRcdFx0d2lkdGg6ICR7d2lkdGh9O1xyXG5cdFx0XHRcdG1pbi13aWR0aDogJHttaW5XaWR0aH07XHJcblx0XHRcdFx0bWF4LXdpZHRoOiAke21heFdpZHRofTtcclxuXHRcdFx0XHRoZWlnaHQ6ICR7aGVpZ2h0fTtcclxuXHRcdFx0XHRjdXJzb3I6IHBvaW50ZXI7XHJcblx0XHRcdFx0Y29sb3I6ICNmZmZmZmY7XHJcblx0XHRcdFx0b3ZlcmZsb3c6IGhpZGRlbjtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0LnByb2R1Y3QgPiAucHJvZHVjdC1vdmVybGF5IHtcclxuXHRcdFx0XHRwb3NpdGlvbjogYWJzb2x1dGU7XHJcblx0XHRcdFx0dG9wOiAwO1xyXG5cdFx0XHRcdGxlZnQ6IDA7XHJcblx0XHRcdFx0d2lkdGg6IDEwMCU7XHJcblx0XHRcdFx0aGVpZ2h0OiAxMDAlO1xyXG5cdFx0XHRcdG9wYWNpdHk6IDAuNTtcclxuXHRcdFx0XHR6LWluZGV4OiA1O1xyXG5cdFx0XHRcdHRyYW5zaXRpb246IDFzIGFsbDtcclxuXHRcdFx0XHR0cmFuc2Zvcm06IHRyYW5zbGF0ZVgoLTI1MHB4KTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0LnByb2R1Y3Q6aG92ZXIgPiAucHJvZHVjdC1vdmVybGF5IHtcclxuXHRcdFx0XHRiYWNrZ3JvdW5kOiByZ2JhKDAsIDAsIDAsIDAuNDUpO1xyXG5cdFx0XHRcdHRyYW5zZm9ybTogdHJhbnNsYXRlWCgwcHgpO1xyXG5cdFx0XHRcdG9wYWNpdHk6IDE7XHJcblx0XHRcdFx0dHJhbnNpdGlvbjogMC41cyBhbGw7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdC5wcm9kdWN0ID4gLnByb2R1Y3QtaW1hZ2UgPiBpbWcge1xyXG5cdFx0XHRcdHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuXHRcdFx0XHRsZWZ0OiAwO1xyXG5cdFx0XHRcdHRvcDogMDtcclxuXHRcdFx0XHR3aWR0aDogMTAwJTtcclxuXHRcdFx0XHRoZWlnaHQ6IDEwMCU7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdC5wcm9kdWN0ID4gLnByb2R1Y3Qtb3ZlcmxheSA+IC5wcm9kdWN0LW5hbWUsIFxyXG5cdFx0XHQucHJvZHVjdCA+IC5wcm9kdWN0LW92ZXJsYXkgPiAucHJvZHVjdC1wcmljZSxcclxuXHRcdFx0LnByb2R1Y3QgPiAucHJvZHVjdC1vdmVybGF5ID4gLnByb2R1Y3QtZGVsaXZlcnktdGltZSB7XHJcblx0XHRcdFx0ei1pbmRleDogMTtcclxuXHRcdFx0XHRwb3NpdGlvbjogcmVsYXRpdmU7XHJcblx0XHRcdFx0dGV4dC1hbGlnbjogY2VudGVyO1xyXG5cdFx0XHRcdG1hcmdpbi10b3A6IDI1cHg7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdC5wcm9kdWN0ID4gLnByb2R1Y3Qtb3ZlcmxheSA+IC5hY3Rpb24tYnV0dG9ucyB7XHJcblx0XHRcdFx0d2lkdGg6IDEwMCU7XHJcblx0XHRcdFx0bWFyZ2luLXRvcDogMTBweDtcclxuXHRcdFx0XHR0ZXh0LWFsaWduOiBjZW50ZXI7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdC5wcm9kdWN0ID4gLnByb2R1Y3Qtb3ZlcmxheSA+IC5hY3Rpb24tYnV0dG9ucyA+IC5mYXZvcml0ZSB7XHJcblx0XHRcdFx0bWFyZ2luLWxlZnQ6IDEwcHg7XHJcblx0XHRcdH1cclxuXHJcblx0XHRgO1xyXG5cdCAgICBcclxuXHQgICAgRE9NLmFkZFN0eWxlKCdUdXJiby1lQ29tbWVyY2UtUHJvZHVjdHMnLCBjc3MpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogSGlkZXMgdGhlIGNvbXBvbmVudCBmcm9tIHRoZSBET00uXHJcblx0ICpcclxuXHQgKiBAcmV0dXJuIHZvaWQgXHJcblx0ICovXHJcblx0aGlkZSgpXHJcblx0e1xyXG5cdFx0dGhpcy5lbGVtZW50LnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcblx0fVxyXG59XG5cbi8qKlxyXG4gKiBUaGUgU2VydmljZXMgT2JqZWN0LCBoYW5kbGVzIHRoZSBzZXJ2aWNlcy5cclxuICovXHJcbmNsYXNzIFNlcnZpY2VzIFxyXG57XHJcblxyXG59XG5cbmxldCBkZWZhdWx0TWVzc2FnZSQ0ID0gJ1NvcnJ5LCBubyBtb3JlIHBhZ2VzLic7XHJcblxyXG5jbGFzcyBOb3RJblBhZ2VSYW5nZUV4Y2VwdGlvbiBleHRlbmRzIEV4Y2VwdGlvbkhhbmRsZXJcclxue1xyXG5cdGNvbnN0cnVjdG9yKG1lc3NhZ2UgPSBudWxsKSBcclxuXHR7XHJcblx0XHRtZXNzYWdlID0gbWVzc2FnZSB8fCBkZWZhdWx0TWVzc2FnZSQ0O1xyXG5cdFx0c3VwZXIoKTtcclxuICAgIFx0c3VwZXIuc3RhY2tUcmFjZSh0aGlzLCBtZXNzYWdlKTtcclxuICAgIH1cclxufVxuXG4vKipcclxuICogQGZpbGUgXHJcbiAqIFBhZ2luYXRpb24gY2xhc3MuXHJcbiAqXHJcbiAqIFRoZSBQYWdpbmF0aW9uIGNvbXBvbmVudCwgaGFuZGxlcyB0aGUgcGFnaW5hdGlvbi5cclxuICovXHJcblxyXG4vKipcclxuICogVGhlIGRlZmF1bHQgc2V0dGluZ3Mgb2YgdGhlIHBhZ2luYXRpb24uXHJcbiAqXHJcbiAqIEB2YXIgb2JqZWN0XHJcbiAqL1xyXG5sZXQgZGVmYXVsdFNldHRpbmdzJDUgPSB7XHJcblx0ZWxlbWVudDogJy5wYWdpbmF0aW9uLWxpbmtzJyxcclxuXHRwcm9jZXNzaW5nOiAnY2xpZW50LXNpZGUnLFxyXG5cdGNsYXNzOiAnJyxcclxuXHRwZXJfcGFnZTogNSxcclxuXHR0b3RhbF9pdGVtczogNSxcclxuXHR1cmxfcGFyYW1ldGVyOiAncGFnZScsXHJcblx0c2VwYXJhdG9yOiAnIycgXHJcbn07XHJcblxyXG4vKipcclxuICogU3RvcmVzIHRoZSBjb250YWluZXIgb2JqZWN0LlxyXG4gKlxyXG4gKiBAdmFyIFxcQ29yZVxcQ29udGFpbmVyXHJcbiAqL1xyXG5sZXQgQ29udGFpbmVyJDQ7XHJcblxyXG4vKipcclxuICogU3RvcmVzIHRoZSBwcm9kdWN0cyBjb21wb25lbnQuXHJcbiAqXHJcbiAqIEB2YXIgXFxDb21wb25lbnRzXFxQcm9kdWN0c1xyXG4gKi9cclxubGV0IFByb2R1Y3RzJDI7XHJcblxyXG4vKipcclxuICogU3RvcmVzIHRoZSBjb250YWluZXIgb2JqZWN0LlxyXG4gKiBcclxuICogQHZhciBcXENvcmVcXEV2ZW50TWFuYWdlclxyXG4gKi9cclxubGV0IEV2ZW50TWFuYWdlciQ1O1xyXG5cclxuY2xhc3MgUGFnaW5hdGlvbiBcclxue1xyXG5cdC8qKlxyXG5cdCAqIC0gSW5pdGlhbGl6ZSB0aGUgY29udGFpbmVyIG9iamVjdC5cclxuXHQgKiAtIEluaXRpYWxpemUgdGhlIHByb2R1Y3RzIGNvbXBvbmVudC5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSBcXENvcmVcXENvbnRhaW5lciB8IGNvbnRhaW5lclxyXG5cdCAqIEBwYXJhbSBcXENvbXBvbmVudHNcXFByb2R1Y3RzIHwgcHJvZHVjdHNcclxuXHQgKiBAcGFyYW0gXFxDb21wb25lbnRzXFxTZXJ2aWNlcyB8IHNlcnZpY2VzXHJcblx0ICogQHJldHVybiB2b2lkXHJcblx0ICovXHJcblx0Y29uc3RydWN0b3IoY29udGFpbmVyLCBldmVudHMsIHByb2R1Y3RzID0gbnVsbCwgc2VydmljZXMgPSBudWxsKSBcclxuXHR7XHJcblx0XHRDb250YWluZXIkNCA9IGNvbnRhaW5lcjtcclxuXHRcdFByb2R1Y3RzJDIgPSBwcm9kdWN0cztcclxuXHRcdEV2ZW50TWFuYWdlciQ1ID0gZXZlbnRzO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogU2V0dXAgdGhlIHBhZ2luYXRpb24uXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gb2JqZWN0IHwgc2V0dGluZ3NcclxuXHQgKiBAcmV0dXJuIHZvaWRcclxuXHQgKi9cclxuXHRzZXR1cChzZXR0aW5ncylcclxuXHR7XHRcclxuXHRcdGlmKHR5cGVvZiBzZXR0aW5ncyAhPSAnb2JqZWN0Jykge1xyXG5cdFx0XHR0aHJvdyBuZXcgSW52YWxpZEFyZ3VtZW50RXhjZXB0aW9uJDE7XHJcblx0XHR9XHJcblxyXG5cdFx0dGhpcy5zZXR0aW5ncyA9IENvbW1vbi5leHRlbmQoZGVmYXVsdFNldHRpbmdzJDUsIHNldHRpbmdzKTtcclxuXHRcdHRoaXMuc2V0Q3VycmVudCgxKTtcclxuXHJcblx0XHRkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgZnVuY3Rpb24oKSB7XHRcdFxyXG5cdFx0XHR0aGlzLnNldEVsZW1lbnQodGhpcy5zZXR0aW5ncy5lbGVtZW50KTtcclxuXHJcblx0XHRcdC8vIEFzIGEgZmFsbGJhY2sgY2hvb3NlIHRoZSB1c2VyJ3Mgc2V0dGluZ3MgZm9yIHRoZSB0b3RhbCBpdGVtcyBjb3VudC5cclxuXHRcdFx0dGhpcy50b3RhbFBhZ2VzID0gdGhpcy5jYWxjdWxhdGVUb3RhbFBhZ2VzKHRoaXMuc2V0dGluZ3MucGVyX3BhZ2UsIHRoaXMuc2V0dGluZ3MudG90YWxfaXRlbXMpO1xyXG5cdFx0XHR0aGlzLmJ1aWxkUGFnaW5hdGlvbigpO1xyXG5cdFx0fS5iaW5kKHRoaXMpKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEJ1aWxkcyB0aGUgcGFnaW5hdGlvbi5cclxuXHQgKlxyXG5cdCAqIEByZXR1cm4gdm9pZFxyXG5cdCAqL1xyXG5cdGJ1aWxkUGFnaW5hdGlvbigpXHJcblx0e1xyXG5cdFx0dGhpcy5saW5rcyA9IHRoaXMuY3JlYXRlTGlua3MoKTtcclxuXHRcdHRoaXMucmVwbGFjZUxpbmtzKHRoaXMubGlua3MpO1xyXG5cdFx0dGhpcy5iaW5kRXZlbnRMaXN0ZW5lcnModGhpcy5saW5rcyk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBTZXRzIHRoZSBlbGVtZW50LlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIHN0cmluZyB8IHNlbGVjdG9yXHJcblx0ICogQHJldHVybiB2b2lkXHJcblx0ICovXHJcblx0c2V0RWxlbWVudChzZWxlY3RvcilcclxuXHR7XHJcblx0XHR0aGlzLmVsZW1lbnQgPSBET00uZmluZChzZWxlY3Rvcik7XHJcblx0XHRcclxuXHRcdERPTS5hZGRDbGFzcyh0aGlzLmVsZW1lbnQsIHRoaXMuc2V0dGluZ3MuY2xhc3MpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogUmVwbGFjZXMgdGhlIGxpbmtzIGluIHRoZSBlbGVtZW50LlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIEhUTUxVTGlzdEVsZW1lbnQgfCBsaW5rc1xyXG5cdCAqIEByZXR1cm4gdm9pZFxyXG5cdCAqL1xyXG5cdHJlcGxhY2VMaW5rcyhsaW5rcylcclxuXHR7XHJcblx0XHR0aGlzLmVsZW1lbnQuaW5uZXJIVE1MID0gJyc7XHJcblx0XHR0aGlzLmVsZW1lbnQuYXBwZW5kQ2hpbGQobGlua3MpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQ2FsY3VsYXRlcyB0aGUgdG90YWwgcGFnZXMuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gbnVtYmVyIHwgcGVyUGFnZVxyXG5cdCAqIEBwYXJhbSBudW1iZXIgfCB0b3RhbEl0ZW1zXHJcblx0ICogQHJldHVybiBudW1iZXJcclxuXHQgKi9cclxuXHRjYWxjdWxhdGVUb3RhbFBhZ2VzKHBlclBhZ2UsIHRvdGFsSXRlbXMpXHJcblx0e1xyXG5cdFx0cGVyUGFnZSA9IHBhcnNlSW50KHBlclBhZ2UpO1xyXG5cdFx0dG90YWxJdGVtcyA9IHBhcnNlSW50KHRvdGFsSXRlbXMpO1xyXG5cclxuXHRcdHJldHVybiBNYXRoLmNlaWwodG90YWxJdGVtcyAvIHBlclBhZ2UpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQmluZHMgdGhlIGJ1dHRvbnMgZXZlbnRzIGxpc3RlbmVycy5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSBIVE1MVUxpc3RFbGVtZW50IHwgbGlua3NcclxuXHQgKiBAcmV0dXJuIHZvaWRcclxuXHQgKi9cclxuXHRiaW5kRXZlbnRMaXN0ZW5lcnMobGlua3MpIFxyXG5cdHtcclxuXHRcdGxldCBpbnN0YW5jZSA9IHRoaXM7XHJcblxyXG5cdFx0dGhpcy5uZXh0LmNoaWxkTm9kZXNbMF0ub25jbGljayA9IGZ1bmN0aW9uKGUpIHtcclxuXHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuXHRcdFx0bGV0IHJlcXVlc3RlZFBhZ2UgPSBpbnN0YW5jZS5jdXJyZW50KzE7XHJcblxyXG5cdFx0XHRpZiAoaW5zdGFuY2Uubm90SW5QYWdlUmFuZ2UocmVxdWVzdGVkUGFnZSkpIHtcclxuXHRcdFx0XHR0aHJvdyBuZXcgTm90SW5QYWdlUmFuZ2VFeGNlcHRpb24oJ1RoZSBwYWdlIHlvdSByZXF1ZXN0aW5nIGRvZXMgbm90IGV4aXN0cycpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRpZiAoUHJvZHVjdHMkMiAmJiBQcm9kdWN0cyQyLmJvb3RlZCkge1xyXG5cdFx0XHRcdFByb2R1Y3RzJDIubG9hZFByb2R1Y3RzKHJlcXVlc3RlZFBhZ2UpLnRoZW4oZnVuY3Rpb24ocHJvZHVjdHMpIHtcclxuXHRcdFx0XHRcdGluc3RhbmNlLnNldEN1cnJlbnQocmVxdWVzdGVkUGFnZSk7XHJcblx0XHRcdFx0fSk7XHJcblx0XHRcdH1cclxuXHRcdH07XHJcblxyXG5cdFx0dGhpcy5wcmV2aW91cy5jaGlsZE5vZGVzWzBdLm9uY2xpY2sgPSBmdW5jdGlvbihlKSB7XHJcblx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcclxuXHJcblx0XHRcdGxldCByZXF1ZXN0ZWRQYWdlID0gaW5zdGFuY2UuY3VycmVudC0xO1xyXG5cclxuXHRcdFx0aWYoaW5zdGFuY2Uubm90SW5QYWdlUmFuZ2UocmVxdWVzdGVkUGFnZSkpIHtcclxuXHRcdFx0XHR0aHJvdyBuZXcgTm90SW5QYWdlUmFuZ2VFeGNlcHRpb24oJ1RoZSBwYWdlIHlvdSByZXF1ZXN0aW5nIGRvZXMgbm90IGV4aXN0cycpO1xyXG5cdFx0XHR9XHJcblx0XHRcdFxyXG5cdFx0XHRpZiAoUHJvZHVjdHMkMiAmJiBQcm9kdWN0cyQyLmJvb3RlZCkge1xyXG5cdFx0XHRcdFByb2R1Y3RzJDIubG9hZFByb2R1Y3RzKHJlcXVlc3RlZFBhZ2UpLnRoZW4oZnVuY3Rpb24ocHJvZHVjdHMpIHtcclxuXHRcdFx0XHRcdGluc3RhbmNlLnNldEN1cnJlbnQocmVxdWVzdGVkUGFnZSk7XHJcblx0XHRcdFx0fSk7XHJcblx0XHRcdH1cclxuXHRcdH07XHJcblxyXG5cdFx0Zm9yKHZhciBpID0gMDsgaSA8IHRoaXMucGFnZXMubGVuZ3RoOyBpKyspIHtcclxuXHRcdFx0dGhpcy5wYWdlc1tpXS5jaGlsZE5vZGVzWzBdLm9uY2xpY2sgPSBmdW5jdGlvbihlKSB7XHJcblx0XHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdFx0XHRcdFxyXG5cdFx0XHRcdGxldCByZXF1ZXN0ZWRQYWdlID0gdGhpcy5nZXRBdHRyaWJ1dGUoJ2RhdGEtcGFnZS1ucicpO1xyXG5cdFx0XHRcdFxyXG5cdFx0XHRcdGlmIChQcm9kdWN0cyQyICYmIFByb2R1Y3RzJDIuYm9vdGVkKSB7XHJcblx0XHRcdFx0XHRQcm9kdWN0cyQyLmxvYWRQcm9kdWN0cyhyZXF1ZXN0ZWRQYWdlKS50aGVuKGZ1bmN0aW9uKHByb2R1Y3RzKSB7XHJcblx0XHRcdFx0XHRcdGluc3RhbmNlLnNldEN1cnJlbnQocmVxdWVzdGVkUGFnZSk7XHJcblx0XHRcdFx0XHR9KTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH07XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBTZXRzIHRoZSBjdXJyZW50IHBhZ2UuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gbnVtYmVyIHwgcGFnZU51bWJlclxyXG5cdCAqIEByZXR1cm4gdm9pZFxyXG5cdCAqL1xyXG5cdHNldEN1cnJlbnQocGFnZU51bWJlcikgXHJcblx0e1xyXG5cdFx0dGhpcy5jdXJyZW50ID0gcGFyc2VJbnQocGFnZU51bWJlcik7XHJcblx0XHR0aGlzLmNoYW5nZVVybChwYWdlTnVtYmVyKTtcclxuXHRcdHRoaXMuc2V0QWN0aXZlTGluayhwYWdlTnVtYmVyKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEdldHMgdGhlIGN1cnJlbnQgcGFnZS5cclxuXHQgKlxyXG5cdCAqIEByZXR1cm4gbnVtYmVyXHJcblx0ICovXHJcblx0Z2V0Q3VycmVudCgpIFxyXG5cdHtcclxuXHRcdHJldHVybiB0aGlzLmN1cnJlbnQ7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBDcmVhdGVzIHRoZSBwYWdpbmF0aW9uIGxpbmtzLlxyXG5cdCAqXHJcblx0ICogQHJldHVybiBIVE1MVUxpc3RFbGVtZW50XHJcblx0ICovXHJcblx0Y3JlYXRlTGlua3MoKSBcclxuXHR7XHJcblx0XHRsZXQgdWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd1bCcpO1xyXG5cdFx0XHJcblx0XHR0aGlzLnBhZ2VzID0gdGhpcy5jcmVhdGVQYWdlTGlua3MoKTtcclxuXHRcdHRoaXMucHJldmlvdXMgPSB0aGlzLmNyZWF0ZVByZXZpb3VzQnV0dG9uKCk7XHJcblx0XHR0aGlzLm5leHQgPSB0aGlzLmNyZWF0ZU5leHRCdXR0b24oKTtcclxuXHJcblx0XHR1bC5jbGFzc05hbWUgPSAncGFnaW5hdGlvbic7XHJcblx0XHR1bC5hcHBlbmRDaGlsZCh0aGlzLnByZXZpb3VzKTtcclxuXHJcblx0XHR0aGlzLnBhZ2VzLmZvckVhY2goZnVuY3Rpb24ocGFnZSkge1xyXG5cdFx0XHR1bC5hcHBlbmRDaGlsZChwYWdlKTtcclxuXHRcdH0pO1xyXG5cclxuXHRcdHVsLmFwcGVuZENoaWxkKHRoaXMubmV4dCk7XHJcblxyXG5cdFx0cmV0dXJuIHVsO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQ3JlYXRlcyB0aGUgcGFnZXMgaXRlbSBsaW5rcy5cclxuXHQgKlxyXG5cdCAqIEByZXR1cm4gYXJyYXk8SFRNTExJRWxlbWVudD5cclxuXHQgKi9cclxuXHRjcmVhdGVQYWdlTGlua3MoKSBcclxuXHR7XHJcblx0XHR2YXIgcGFnZXMgPSBbXTtcclxuXHJcblx0XHRmb3IodmFyIGkgPSAxOyBpIDw9IHRoaXMudG90YWxQYWdlczsgaSsrKSB7XHJcblx0XHRcdHZhciBwYWdlSXRlbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJyk7XHJcblx0XHRcdHZhciBsaW5rID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpO1xyXG5cdFx0XHRwYWdlSXRlbS5jbGFzc05hbWUgPSAodGhpcy5jdXJyZW50ID09IGkpID8gJ3BhZ2UtaXRlbSBhY3RpdmUnIDogJ3BhZ2UtaXRlbSc7XHJcblx0XHRcdGxpbmsuY2xhc3NOYW1lID0gJ3BhZ2UtbGluayc7XHJcblx0XHRcdGxpbmsuc2V0QXR0cmlidXRlKCdocmVmJywgJz9wYWdlPScrIGkpO1xyXG5cdFx0XHRsaW5rLnNldEF0dHJpYnV0ZSgnZGF0YS1wYWdlLW5yJywgaSk7XHJcblx0XHRcdGxpbmsuaW5uZXJIVE1MID0gaTtcclxuXHRcdFx0cGFnZUl0ZW0uYXBwZW5kQ2hpbGQobGluayk7XHJcblx0XHRcdHBhZ2VzLnB1c2gocGFnZUl0ZW0pO1xyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiBwYWdlcztcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIENyZWF0ZXMgdGhlIHByZXZpb3VzIGJ1dHRvbiBsaW5rLlxyXG5cdCAqXHJcblx0ICogQHJldHVybiBIVE1MTElFbGVtZW50XHJcblx0ICovXHJcblx0Y3JlYXRlUHJldmlvdXNCdXR0b24oKSBcclxuXHR7XHJcblx0XHR2YXIgbGkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaScpO1xyXG5cdFx0dmFyIGxpbmsgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJyk7XHJcblx0XHR2YXIgc3BhbjEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XHJcblx0XHR2YXIgc3BhbjIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XHJcblx0XHRcclxuXHRcdFxyXG5cdFx0bGkuY2xhc3NOYW1lID0gJ3BhZ2UtaXRlbSc7XHJcblx0XHRsaW5rLmNsYXNzTmFtZSA9ICdwYWdlLWxpbmsnO1xyXG5cdFx0c3BhbjIuY2xhc3NOYW1lID0gJ3NyLW9ubHknO1xyXG5cclxuXHRcdGxpbmsuc2V0QXR0cmlidXRlKCdocmVmJywgJycpO1xyXG5cdFx0bGluay5zZXRBdHRyaWJ1dGUoJ2FyaWEtbGFiZWwnLCAnUHJldmlvdXMnKTtcclxuXHRcdHNwYW4xLnNldEF0dHJpYnV0ZSgnYXJpYS1oaWRkZW4nLCAndHJ1ZScpO1xyXG5cclxuXHRcdHNwYW4xLmlubmVySFRNTCA9ICcmbGFxdW87JztcclxuXHRcdHNwYW4yLmlubmVySFRNTCA9ICdQcmV2aW91cyc7XHJcblxyXG5cdFx0bGluay5hcHBlbmRDaGlsZChzcGFuMSk7XHJcblx0XHRsaW5rLmFwcGVuZENoaWxkKHNwYW4yKTtcclxuXHRcdGxpLmFwcGVuZENoaWxkKGxpbmspO1xyXG5cclxuXHRcdHJldHVybiBsaTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIENyZWF0ZXMgdGhlIG5leHQgYnV0dG9uIGxpbmsuXHJcblx0ICpcclxuXHQgKiBAcmV0dXJuIEhUTUxMSUVsZW1lbnRcclxuXHQgKi9cclxuXHRjcmVhdGVOZXh0QnV0dG9uKCkgXHJcblx0e1xyXG5cdFx0dmFyIGxpID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKTtcclxuXHRcdHZhciBsaW5rID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpO1xyXG5cdFx0dmFyIHNwYW4xID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xyXG5cdFx0dmFyIHNwYW4yID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xyXG5cdFx0XHJcblx0XHRsaS5jbGFzc05hbWUgPSAncGFnZS1pdGVtJztcclxuXHRcdGxpbmsuY2xhc3NOYW1lID0gJ3BhZ2UtbGluayc7XHJcblx0XHRzcGFuMi5jbGFzc05hbWUgPSAnc3Itb25seSc7XHJcblxyXG5cdFx0bGluay5zZXRBdHRyaWJ1dGUoJ2hyZWYnLCAnJyk7XHJcblx0XHRsaW5rLnNldEF0dHJpYnV0ZSgnYXJpYS1sYWJlbCcsICdOZXh0Jyk7XHJcblx0XHRzcGFuMS5zZXRBdHRyaWJ1dGUoJ2FyaWEtaGlkZGVuJywgJ3RydWUnKTtcclxuXHJcblx0XHRzcGFuMS5pbm5lckhUTUwgPSAnJnJhcXVvOyc7XHJcblx0XHRzcGFuMi5pbm5lckhUTUwgPSAnTmV4dCc7XHJcblxyXG5cdFx0bGluay5hcHBlbmRDaGlsZChzcGFuMSk7XHJcblx0XHRsaW5rLmFwcGVuZENoaWxkKHNwYW4yKTtcclxuXHRcdGxpLmFwcGVuZENoaWxkKGxpbmspO1xyXG5cclxuXHRcdHJldHVybiBsaTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIENoZWNrcyBpZiB0aGUgZ2l2ZW4gcGFnZSBpcyBpbiByYW5nZS5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSBudW1iZXIgfCBwYWdlTnVtYmVyXHJcblx0ICogQHJldHVybiBib29sXHJcblx0ICovXHJcblx0bm90SW5QYWdlUmFuZ2UocGFnZU51bWJlcikgXHJcblx0e1xyXG5cdFx0cmV0dXJuIChwYWdlTnVtYmVyID4gdGhpcy50b3RhbFBhZ2VzIHx8IHBhZ2VOdW1iZXIgPD0gMCkgfHwgaXNOYU4ocGFnZU51bWJlcik7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBDaGFuZ2VzIHRoZSB1cmwgdG8gYSBnaXZlbiBwYWdlIG51bWJlci5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSBudW1iZXIgfCBwYWdlTnVtYmVyXHJcblx0ICogQHJldHVybiB2b2lkXHJcblx0ICovXHJcblx0Y2hhbmdlVXJsKHBhZ2VOdW1iZXIpIFxyXG5cdHtcclxuXHRcdFVybC5jaGFuZ2VQYXJhbWV0ZXIodGhpcy5zZXR0aW5ncy51cmxfcGFyYW1ldGVyLCBwYWdlTnVtYmVyLCB0aGlzLnNldHRpbmdzLnNlcGFyYXRvcik7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBTZXRzIHRoZSBhY3RpdmUgbGluay5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSBudW1iZXIgfCBwYWdlTnVtYmVyXHJcblx0ICogQHJldHVybiB2b2lkXHJcblx0ICovXHJcblx0c2V0QWN0aXZlTGluayhwYWdlTnVtYmVyKVxyXG5cdHtcclxuXHRcdGZvcih2YXIgcGFnZSBpbiB0aGlzLnBhZ2VzKSB7XHJcblx0XHRcdGlmICh0aGlzLnBhZ2VzW3BhZ2VdLmNoaWxkTm9kZXNbMF0uZ2V0QXR0cmlidXRlKCdkYXRhLXBhZ2UtbnInKSA9PSBwYWdlTnVtYmVyKSB7XHJcblx0XHRcdFx0RE9NLmFkZENsYXNzKHRoaXMucGFnZXNbcGFnZV0sICdhY3RpdmUnKTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRET00ucmVtb3ZlQ2xhc3ModGhpcy5wYWdlc1twYWdlXSwgJ2FjdGl2ZScpO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBSZXNldHMgdGhlIHBhZ2luYXRpb24uXHJcblx0ICpcclxuXHQgKiBAcmV0dXJuIHZvaWRcclxuXHQgKi9cclxuXHRyZXNldCgpIFxyXG5cdHtcclxuXHRcdHRoaXMuc2V0Q3VycmVudCgxKTtcclxuXHRcdHRoaXMuY2hhbmdlVXJsKDEpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogSGlkZXMgdGhlIGNvbXBvbmVudCBmcm9tIHRoZSBET00uXHJcblx0ICpcclxuXHQgKiBAcmV0dXJuIHZvaWQgXHJcblx0ICovXHJcblx0aGlkZSgpXHJcblx0e1xyXG5cdFx0dGhpcy5lbGVtZW50LnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcblx0fVxyXG59XG5cbmxldCBkZWZhdWx0TWVzc2FnZSQ1ID0gJ0luIG9yZGVyIHRvIHVzZSBjb21wb25lbnRzIHlvdSBtdXN0IHJlZ2lzdGVyIHRoZW0gd2l0aCB0aGUgc2hvcCEnOyBcclxuXHJcbmNsYXNzIENvbXBvbmVudE5vdFJlZ2lzdGVyZWRFeGNlcHRpb24gZXh0ZW5kcyBFeGNlcHRpb25IYW5kbGVyXHJcbntcclxuXHRjb25zdHJ1Y3RvcihtZXNzYWdlID0gbnVsbCkgXHJcblx0e1xyXG5cdFx0bWVzc2FnZSA9IG1lc3NhZ2UgfHwgZGVmYXVsdE1lc3NhZ2UkNTtcclxuXHRcdHN1cGVyKG1lc3NhZ2UpO1xyXG4gICAgXHRzdXBlci5zdGFja1RyYWNlKHRoaXMsIG1lc3NhZ2UpO1xyXG4gICAgfVxyXG59XG5cbi8vIENvbXBvbmVudHNcclxuLy8gSGVscGVyc1xyXG4vLyBFeGNlcHRpb25zXHJcbmNsYXNzIENvbXBvbmVudHNQcm92aWRlclxyXG57XHJcblx0LyoqXHJcblx0ICogLSBTZXQgdGhlIGNvbnRhaW5lciBhcyBhIG1lbWJlci5cclxuXHQgKiAtIGRlY2xhcmUgdGhlIGNvbXBvbmVudHMuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gXFxDb3JlXFxDb250YWluZXIgfCBjb250YWluZXJcclxuXHQgKiBAcmV0dXJuIHZvaWRcclxuXHQgKi9cclxuXHRjb25zdHJ1Y3Rvcihjb250YWluZXIpXHJcblx0e1xyXG5cdFx0dGhpcy5jb250YWluZXIgPSBjb250YWluZXI7XHJcblxyXG5cdFx0dGhpcy5jb21wb25lbnRzID0ge307XHJcblx0XHR0aGlzLmNvbXBvbmVudHMuRmlsdGVyID0ge307XHJcblx0XHR0aGlzLmNvbXBvbmVudHMuU2VydmljZXMgPSB7fTtcclxuXHRcdHRoaXMuY29tcG9uZW50cy5Qcm9kdWN0cyA9IHt9O1xyXG5cdFx0dGhpcy5jb21wb25lbnRzLlBhZ2luYXRpb24gPSB7fTtcclxuXHRcdHRoaXMuY29tcG9uZW50cy5DYXJ0ID0ge307XHJcblx0XHR0aGlzLmNvbXBvbmVudHMuQ2hlY2tvdXQgPSB7fTtcclxuXHR9XHJcblxyXG4gICAvKipcclxuXHQqIFJlZ2lzdGVycyB0aGUgY29tcG9uZW50cy5cclxuXHQqXHJcblx0KiBAcGFyYW0gb2JqZWN0IHwgY29tcG9uZW50c1xyXG5cdCogQHJldHVybiB2b2lkXHJcblx0Ki9cclxuXHRyZWdpc3Rlcihjb21wb25lbnRzKVxyXG5cdHtcclxuXHRcdHRoaXMuYXZhaWxhYmxlID0gY29tcG9uZW50cztcclxuXHRcdHRoaXMuYm9vdGVkID0gW107XHJcblx0IFx0dGhpcy5jb21wb25lbnRzLkZpbHRlci5ib290ZWQgPSBmYWxzZTtcclxuXHRcdHRoaXMuY29tcG9uZW50cy5TZXJ2aWNlcy5ib290ZWQgPSBmYWxzZTtcclxuXHRcdHRoaXMuY29tcG9uZW50cy5Qcm9kdWN0cy5ib290ZWQgPSBmYWxzZTtcclxuXHRcdHRoaXMuY29tcG9uZW50cy5QYWdpbmF0aW9uLmJvb3RlZCA9IGZhbHNlO1xyXG5cdFx0dGhpcy5jb21wb25lbnRzLkNhcnQuYm9vdGVkID0gZmFsc2U7XHJcblx0XHR0aGlzLmNvbXBvbmVudHMuQ2hlY2tvdXQuYm9vdGVkID0gZmFsc2U7XHJcblxyXG5cdFx0bGV0IGluc3RhbmNlID0gdGhpcztcclxuXHJcblx0XHR0aGlzLmNvbnRhaW5lci5iaW5kKCdGaWx0ZXInLCBmdW5jdGlvbihjb250YWluZXIsIGNvbXBvbmVudCkge1xyXG5cdFx0XHRpbnN0YW5jZS5jb21wb25lbnRzW2NvbXBvbmVudF0gPSBuZXcgRmlsdGVyKGNvbnRhaW5lcik7XHJcblx0XHRcdGluc3RhbmNlLmNvbXBvbmVudHNbY29tcG9uZW50XS5ib290ZWQgPSB0cnVlO1xyXG5cdFx0XHRpbnN0YW5jZS5ib290ZWQucHVzaChpbnN0YW5jZS5jb21wb25lbnRzW2NvbXBvbmVudF0pO1xyXG5cdFx0XHRyZXR1cm4gaW5zdGFuY2UuY29tcG9uZW50c1tjb21wb25lbnRdO1xyXG5cdFx0fSwgJ2NvbXBvbmVudHMnKTtcclxuXHRcdFxyXG5cdFx0dGhpcy5jb250YWluZXIuYmluZCgnU2VydmljZXMnLCBmdW5jdGlvbihjb250YWluZXIsIGNvbXBvbmVudCkgeyBcclxuXHRcdFx0aW5zdGFuY2UuY29tcG9uZW50c1tjb21wb25lbnRdID0gbmV3IFNlcnZpY2VzKGNvbnRhaW5lcik7XHJcblx0XHRcdGluc3RhbmNlLmNvbXBvbmVudHNbY29tcG9uZW50XS5ib290ZWQgPSB0cnVlO1xyXG5cdFx0XHRpbnN0YW5jZS5ib290ZWQucHVzaChpbnN0YW5jZS5jb21wb25lbnRzW2NvbXBvbmVudF0pO1xyXG5cdFx0XHRyZXR1cm4gaW5zdGFuY2UuY29tcG9uZW50c1tjb21wb25lbnRdO1xyXG5cdFx0fSwgJ2NvbXBvbmVudHMnKTtcclxuXHJcblx0XHR0aGlzLmNvbnRhaW5lci5iaW5kKCdQcm9kdWN0cycsIGZ1bmN0aW9uKGNvbnRhaW5lciwgY29tcG9uZW50KSB7XHJcblx0XHRcdGluc3RhbmNlLmNvbXBvbmVudHNbY29tcG9uZW50XSA9IG5ldyBQcm9kdWN0cyhjb250YWluZXIsIGNvbnRhaW5lci5SZXF1ZXN0LCBjb250YWluZXIuRXZlbnRzKTtcclxuXHRcdFx0aW5zdGFuY2UuY29tcG9uZW50c1tjb21wb25lbnRdLmJvb3RlZCA9IHRydWU7XHJcblx0XHRcdGluc3RhbmNlLmJvb3RlZC5wdXNoKGluc3RhbmNlLmNvbXBvbmVudHNbY29tcG9uZW50XSk7XHJcblx0XHRcdHJldHVybiBpbnN0YW5jZS5jb21wb25lbnRzW2NvbXBvbmVudF07XHJcblx0XHR9LCAnY29tcG9uZW50cycpO1xyXG5cclxuXHRcdHRoaXMuY29udGFpbmVyLmJpbmQoJ1BhZ2luYXRpb24nLCBmdW5jdGlvbihjb250YWluZXIsIGNvbXBvbmVudCkge1xyXG5cdFx0XHRsZXQgcHJvZHVjdHMgPSAoaW5zdGFuY2UuZXhpc3RzKCdQcm9kdWN0cycpKSA/IChpbnN0YW5jZS5jb21wb25lbnRzWydQcm9kdWN0cyddKSA6IG51bGw7IFxyXG5cdFx0XHRsZXQgc2VydmljZXMgPSAoaW5zdGFuY2UuZXhpc3RzKCdTZXJ2aWNlcycpKSA/IChpbnN0YW5jZS5jb21wb25lbnRzWydTZXJ2aWNlcyddKSA6IG51bGw7IFxyXG5cdFx0XHRpbnN0YW5jZS5jb21wb25lbnRzW2NvbXBvbmVudF0gPSBuZXcgUGFnaW5hdGlvbihjb250YWluZXIsIGNvbnRhaW5lci5FdmVudHMsIHByb2R1Y3RzLCBzZXJ2aWNlcyk7XHJcblx0XHRcdGluc3RhbmNlLmNvbXBvbmVudHNbY29tcG9uZW50XS5ib290ZWQgPSB0cnVlO1xyXG5cdFx0XHRpbnN0YW5jZS5ib290ZWQucHVzaChpbnN0YW5jZS5jb21wb25lbnRzW2NvbXBvbmVudF0pO1xyXG5cdFx0XHRyZXR1cm4gaW5zdGFuY2UuY29tcG9uZW50c1tjb21wb25lbnRdO1xyXG5cdFx0fSwgJ2NvbXBvbmVudHMnKTtcclxuXHJcblx0XHR0aGlzLmNvbnRhaW5lci5iaW5kKCdDYXJ0JywgZnVuY3Rpb24oY29udGFpbmVyLCBjb21wb25lbnQpIHtcclxuXHRcdFx0aW5zdGFuY2UuY29tcG9uZW50c1tjb21wb25lbnRdID0gbmV3IENhcnQoY29udGFpbmVyLCBjb250YWluZXIuUmVxdWVzdCwgY29udGFpbmVyLkV2ZW50cyk7XHJcblx0XHRcdGluc3RhbmNlLmNvbXBvbmVudHNbY29tcG9uZW50XS5ib290ZWQgPSB0cnVlO1xyXG5cdFx0XHRpbnN0YW5jZS5ib290ZWQucHVzaChpbnN0YW5jZS5jb21wb25lbnRzW2NvbXBvbmVudF0pO1xyXG5cdFx0XHRyZXR1cm4gaW5zdGFuY2UuY29tcG9uZW50c1tjb21wb25lbnRdO1xyXG5cdFx0fSwgJ2NvbXBvbmVudHMnKTtcclxuXHJcblx0XHR0aGlzLmNvbnRhaW5lci5iaW5kKCdDaGVja291dCcsIGZ1bmN0aW9uKGNvbnRhaW5lciwgY29tcG9uZW50KSB7XHJcblx0XHRcdGluc3RhbmNlLmNvbXBvbmVudHNbY29tcG9uZW50XSA9IG5ldyBDaGVja291dChjb250YWluZXIsIGNvbnRhaW5lci5SZXF1ZXN0LCBjb250YWluZXIuRXZlbnRzKTtcclxuXHRcdFx0aW5zdGFuY2UuY29tcG9uZW50c1tjb21wb25lbnRdLmJvb3RlZCA9IHRydWU7XHJcblx0XHRcdGluc3RhbmNlLmJvb3RlZC5wdXNoKGluc3RhbmNlLmNvbXBvbmVudHNbY29tcG9uZW50XSk7XHJcblx0XHRcdHJldHVybiBpbnN0YW5jZS5jb21wb25lbnRzW2NvbXBvbmVudF07XHJcblx0XHR9LCAnY29tcG9uZW50cycpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogUHJvdmlkZSBhIHJlZ2lzdGVyZWQgY29tcG9uZW50LlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIHN0cmluZyB8IGNvbXBvbmVudFxyXG5cdCAqIEByZXR1cm4gb2JqZWN0XHJcblx0ICovXHJcblx0cHJvdmlkZShjb21wb25lbnQpXHJcblx0e1xyXG5cdFx0aWYgKENvbW1vbi5pbl9hcnJheShjb21wb25lbnQsIHRoaXMuYXZhaWxhYmxlKSkge1xyXG5cdFx0XHRyZXR1cm4gdGhpcy5jb250YWluZXIubWFrZShjb21wb25lbnQpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHRocm93IG5ldyBDb21wb25lbnROb3RSZWdpc3RlcmVkRXhjZXB0aW9uKCdjb21wb25lbnRzIG11c3QgYmUgcmVnaXN0ZXJlZCBpbiBvcmRlciB0byB1c2UgdGhlbS4nKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIENoZWNrcyBpZiBjb21wb25lbnQgZXhpc3RzLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIHN0cmluZyB8IG5hbWVcclxuXHQgKiBAcmV0dXJuIGJvb2xcclxuXHQgKi9cclxuXHRleGlzdHMobmFtZSlcclxuXHR7XHJcblx0XHRyZXR1cm4gdGhpcy5jb21wb25lbnRzLmhhc093blByb3BlcnR5KG5hbWUpO1xyXG5cdH1cclxufVxuXG5sZXQgZGVmYXVsdE1lc3NhZ2UkNiA9ICdUcnlpbmcgdG8gYmluZCBhbiBhbHJlYWR5IGV4aXN0aW5nIGJvdW5kLic7XHJcblxyXG5jbGFzcyBJbnZhbGlkQmluZGluZ0V4Y2VwdGlvbiBleHRlbmRzIEV4Y2VwdGlvbkhhbmRsZXJcclxue1xyXG5cdGNvbnN0cnVjdG9yKG1lc3NhZ2UgPSBudWxsKSBcclxuXHR7XHJcblx0XHRtZXNzYWdlID0gbWVzc2FnZSB8fCBkZWZhdWx0TWVzc2FnZSQ2O1xyXG5cdFx0c3VwZXIobWVzc2FnZSk7XHJcbiAgICBcdHN1cGVyLnN0YWNrVHJhY2UodGhpcywgbWVzc2FnZSk7XHJcbiAgICB9XHJcbn1cblxuLy8gSGVscGVyc1xyXG4vLyBDb3JlXHJcbi8vIEV4Y2VwdGlvbnNcclxuLyoqXHJcbiAqIEBmaWxlIFxyXG4gKiBDb250YWluZXIgY2xhc3MuXHJcbiAqXHJcbiAqIEhhbmRsZXMvQ29udHJvbHMgdGhlIGRlcGVuZGVuY2llcyBvZiBlY29tbWVyY2UuXHJcbiAqL1xyXG5cclxuY2xhc3MgQ29udGFpbmVyJDUgXHJcbntcclxuXHQvKipcclxuXHQgKiAtIEluaXRpYWxpemUgaW5zdGFuY2VzIG1lbWJlci5cclxuXHQgKiAtIFJlZ2lzdGVyIGJpbmRpbmdzLlxyXG5cdCAqXHJcblx0ICogQHJldHVybiB2b2lkXHJcblx0ICovXHJcblx0Y29uc3RydWN0b3IoKVxyXG5cdHtcclxuXHRcdHRoaXMuaW5zdGFuY2VzID0gW107XHJcblx0XHR0aGlzLnJlZ2lzdGVyKCk7XHJcblx0XHR0aGlzLnJlZ2lzdGVyUHJvdmlkZXJzKCk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBCaW5kcyBrZXkgdG8gY29uY3JldGUgY2xhc3MuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gc3RyaW5nIHwga2V5XHJcblx0ICogQHBhcmFtIGNsYXNzIHwgY29uY3JldGVcclxuXHQgKiBAcmV0dXJuIHZvaWRcclxuXHQgKi9cclxuXHRiaW5kKGtleSwgY29uY3JldGUsIG5hbWVzcGFjZSA9IG51bGwpIFxyXG5cdHtcclxuXHRcdGlmICh0eXBlb2Yga2V5ICE9ICdzdHJpbmcnKSB7XHJcblx0XHRcdHRocm93IG5ldyBJbnZhbGlkQXJndW1lbnRFeGNlcHRpb24kMSgnYmluZCgpIGV4cGVjdHMgdGhlIGZpcnN0IHBhcmFtZXRlciB0byBiZSBzdHJpbmcsIGJ1dCAnICsgdHlwZW9mIGtleSArICcgd2FzIHBhc3NlZCBpbnN0ZWFkLicpO1xyXG5cdFx0fVxyXG5cclxuXHRcdGlmICh0eXBlb2YgY29uY3JldGUgIT0gJ2Z1bmN0aW9uJykgeyBcclxuXHRcdFx0dGhyb3cgbmV3IEludmFsaWRBcmd1bWVudEV4Y2VwdGlvbiQxKCdiaW5kKCkgZXhwZWN0cyB0aGUgc2Vjb25kIHBhcmFtZXRlciB0byBiZSBhIGZ1bmN0aW9uLCBidXQgJyArIHR5cGVvZiBjb25jcmV0ZSArICcgd2FzIHBhc3NlZCBpbnN0ZWFkLicpO1xyXG5cdFx0fVxyXG5cclxuXHRcdGlmIChuYW1lc3BhY2UpIHtcclxuXHRcdFx0aWYgKHR5cGVvZiB0aGlzW25hbWVzcGFjZV0gPT0gJ3VuZGVmaW5lZCcpIHtcclxuXHRcdFx0XHR0aGlzW25hbWVzcGFjZV0gPSB7fTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0dGhpc1tuYW1lc3BhY2VdW2tleV0gPSBjb25jcmV0ZS5iaW5kKGNvbmNyZXRlLCB0aGlzLCBrZXkpO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0dGhpc1trZXldID0gY29uY3JldGUuYmluZChjb25jcmV0ZSwgdGhpcywga2V5KTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFNldHMgYW4gaW5zdGFuY2UuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gc3RyaW5nIHwga2V5XHJcblx0ICogQHBhcmFtIG9iamVjdCB8IGluc3RhbmNlXHJcblx0ICogQHBhcmFtIHN0cmluZyB8IGFsaWFzXHJcblx0ICogQHJldHVybiB2b2lkXHJcblx0ICovXHJcblx0c2V0SW5zdGFuY2Uoa2V5LCBpbnN0YW5jZSwgYWxpYXMgPSBudWxsKSBcclxuXHR7XHJcblx0XHRpZiAodHlwZW9mIGtleSAhPSAnc3RyaW5nJykge1xyXG5cdFx0XHR0aHJvdyBuZXcgSW52YWxpZEFyZ3VtZW50RXhjZXB0aW9uJDEoJ3NldEluc3RhY2UoKSBleHBlY3RzIHRoZSBmaXJzdCBwYXJhbWV0ZXIgdG8gYmUgYSBzdHJpbmcsIGJ1dCAnICsgdHlwZW9mIGtleSArICcgd2FzIHBhc3NlZCBpbnN0ZWFkLicpO1xyXG5cdFx0fVxyXG5cclxuXHRcdGlmICh0eXBlb2YgaW5zdGFuY2UgIT0gJ29iamVjdCcpIHtcclxuXHRcdFx0dGhyb3cgbmV3IEludmFsaWRBcmd1bWVudEV4Y2VwdGlvbiQxKCdzZXRJbnN0YW5jZSgpIGV4cGVjdHMgdGhlIHNlY29uZCBwYXJhbWV0ZXIgdG8gYmUgYW4gb2JqZWN0LCBidXQgJyArIHR5cGVvZiBpbnN0YW5jZSArICcgd2FzIHBhc3NlZCBpbnN0ZWFkLicpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHRoaXMuaW5zdGFuY2VzW2tleV0gPSBpbnN0YW5jZTtcclxuXHRcdHRoaXNba2V5XSA9IGluc3RhbmNlO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogUmVzb2x2ZXMgYW4gaW5zdGFuY2Ugb3V0IG9mIFxyXG5cdCAqIHRoZSBpb2MgY29udGFpbmVyLlxyXG5cdCAqIFxyXG5cdCAqIEBwYXJhbSBzdHJpbmcgfCBrZXlcclxuXHQgKiBAcmV0dXJuIG9iamVjdFxyXG5cdCAqL1xyXG5cdGdldEluc3RhbmNlKGtleSkgXHJcblx0e1xyXG5cdFx0aWYgKHR5cGVvZiBrZXkgIT0gJ3N0cmluZycgJiYgdHlwZW9mIGtleSAhPSAnb2JqZWN0Jykge1xyXG5cdFx0XHR0aHJvdyBuZXcgSW52YWxpZEFyZ3VtZW50RXhjZXB0aW9uJDEoJ2dldEluc3RhY2UoKSBleHBlY3RzIHRoZSBmaXJzdCBwYXJhbWV0ZXIgdG8gYmUgYSBzdHJpbmcsIGJ1dCAnICsgdHlwZW9mIGtleSArICcgd2FzIHBhc3NlZCBpbnN0ZWFkLicpO1xyXG5cdFx0fVxyXG5cclxuXHRcdGlmICh0eXBlb2Yga2V5ID09ICdvYmplY3QnKSB7XHJcblx0XHRcdHJldHVybiB0aGlzLmluc3RhbmNlc1trZXkuY29uc3RydWN0b3IubmFtZV0gfHwgbnVsbDtcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gdGhpcy5pbnN0YW5jZXNba2V5XSB8fCBudWxsO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQ2hlY2tzIGlmIGFuIGluc3RhbmNlIGV4aXN0LlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIG1peGVkIHwgaW5zdGFuY2VcclxuXHQgKiBAcmV0dXJuIGJvb2xcclxuXHQgKi9cclxuXHRpbnN0YW5jZUV4aXN0KGluc3RhbmNlKSBcclxuXHR7XHJcblx0XHRpZiAodHlwZW9mIGluc3RhbmNlID09ICdvYmplY3QnIHx8IHR5cGVvZiBpbnN0YW5jZSA9PSAnc3ltYm9sJykge1xyXG5cdFx0XHRyZXR1cm4gKHR5cGVvZiB0aGlzLmluc3RhbmNlc1tpbnN0YW5jZS5jb25zdHJ1Y3Rvci5uYW1lXSAhPT0gJ3VuZGVmaW5lZCcpO1xyXG5cdFx0fSBlbHNlIGlmICh0eXBlb2YgaW5zdGFuY2UgPT0gJ3N0cmluZycpIHtcclxuXHRcdFx0cmV0dXJuICh0eXBlb2YgdGhpcy5pbnN0YW5jZXNbaW5zdGFuY2VdICE9PSAndW5kZWZpbmVkJylcclxuXHRcdH1cclxuXHRcdFxyXG5cdFx0dGhyb3cgbmV3IEludmFsaWRBcmd1bWVudEV4Y2VwdGlvbiQxKCdpbnN0YW5jZUV4aXN0KCkgZXhwZWN0cyB0aGUgZmlyc3QgcGFyYW1ldGVyIHRvIGJlIHN0cmluZyBvciBhbiBvYmplY3QsIGJ1dCAnICsgdHlwZW9mIGluc3RhbmNlICsgJyB3YXMgcGFzc2VkIGluc3RlYWQuJyk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBSZXRyaWV2ZSBhbiBvYmplY3QsIGlmIG5vdCBleGlzdHNcclxuXHQgKiB3aWxsIGNyZWF0ZSBpdCwgc2V0IGl0IGluIHRoZSBpb2MgY29udGFpbmVyXHJcblx0ICogZm9yIGxhdGVyIHVzZSBhbmQgcmV0cmlldmUgaXQuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gbWl4ZWQgfCBvYmplY3QgXHJcblx0ICogQHJldHVybiBvYmplY3RcclxuXHQgKi9cclxuXHRtYWtlKG9iamVjdClcclxuXHR7XHJcblx0XHRsZXQgaW5zdGFuY2UgPSB7fTtcclxuXHRcdGxldCBrZXk7XHJcblx0XHRcclxuXHRcdGlmICh0aGlzLmluc3RhbmNlRXhpc3Qob2JqZWN0KSkge1xyXG5cdFx0XHRyZXR1cm4gdGhpcy5nZXRJbnN0YW5jZShvYmplY3QpO1xyXG5cdFx0fVxyXG5cclxuXHRcdGlmICh0eXBlb2Ygb2JqZWN0ID09ICdvYmplY3QnKSB7XHJcblx0XHRcdGluc3RhbmNlID0gb2JqZWN0O1xyXG5cdFx0XHRrZXkgPSBvYmplY3QuY29uc3RydWN0b3IubmFtZTtcclxuXHRcdFx0dGhpcy5zZXRJbnN0YW5jZShrZXksIGluc3RhbmNlKTsgXHJcblx0XHR9IGVsc2UgaWYgKHR5cGVvZiBvYmplY3QgPT0gJ3N0cmluZycgJiYgdGhpcy5oYXNPd25Qcm9wZXJ0eShvYmplY3QpKSB7XHJcblx0XHRcdGluc3RhbmNlID0gbmV3IHRoaXNbb2JqZWN0XTtcclxuXHRcdFx0a2V5ID0gb2JqZWN0O1xyXG5cdFx0XHR0aGlzLnNldEluc3RhbmNlKGtleSwgaW5zdGFuY2UpO1x0XHJcblx0XHR9IGVsc2UgaWYgKHR5cGVvZiBvYmplY3QgPT0gJ3N0cmluZycgJiYgdGhpcy5Db21wb25lbnRzLmV4aXN0cyhvYmplY3QpKSB7XHJcblx0XHRcdGluc3RhbmNlID0gbmV3IHRoaXMuY29tcG9uZW50c1tvYmplY3RdO1xyXG5cdFx0XHRrZXkgPSBvYmplY3Q7XHJcblx0XHRcdHRoaXMuc2V0SW5zdGFuY2Uoa2V5LCBpbnN0YW5jZSk7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHR0aHJvdyBuZXcgSW52YWxpZEJpbmRpbmdFeGNlcHRpb24oJ0NvbnRhaW5lci5tYWtlKCkgY291bGQgbm90IGNyZWF0ZSB0aGUgb2JqZWN0IScpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiBpbnN0YW5jZTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFJlbW92ZSBhbGwgZXhpc3RpbmcgaW5zdGFuY2VzLlxyXG5cdCAqXHJcblx0ICogQHJldHVybiB2b2lkIFxyXG5cdCAqL1xyXG5cdGZsdXNoKClcclxuXHR7XHJcblx0XHR0aGlzLmluc3RhbmNlcyA9IFtdO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogUmVnaXN0ZXJzIHRoZSBkZXBlbmRlY2llcy5cclxuXHQgKlxyXG5cdCAqIEByZXR1cm4gdm9pZCBcclxuXHQgKi9cclxuXHRyZWdpc3RlcigpXHJcblx0e1xyXG5cdFx0dGhpcy5zZXRJbnN0YW5jZSgnUmVxdWVzdCcsIG5ldyBSZXF1ZXN0KTtcclxuXHRcdHRoaXMuc2V0SW5zdGFuY2UoJ0V2ZW50cycsIG5ldyBFdmVudE1hbmFnZXIpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogUmVnaXN0ZXJzIHRoZSBwcm92aWRlcnMuXHJcblx0ICpcclxuXHQgKiBAcmV0dXJuIHZvaWQgXHJcblx0ICovXHJcblx0cmVnaXN0ZXJQcm92aWRlcnMoKVxyXG5cdHtcclxuXHRcdHRoaXMuc2V0SW5zdGFuY2UoJ0NvbXBvbmVudHMnLCBuZXcgQ29tcG9uZW50c1Byb3ZpZGVyKHRoaXMpKTtcclxuXHR9XHJcbn1cblxuLy8gSGVscGVyc1xyXG4vLyBDb3JlXHJcbi8vIEV4Y2VwdGlvbnNcclxuLyoqXHJcbiAqIFN0b3JlcyB0aGUgZGVmYXVsdCBzZXR0aW5ncy5cclxuICpcclxuICogQHZhciBvYmplY3RcclxuICovXHJcbmxldCBkZWZhdWx0U2V0dGluZ3MkNiA9IHtcclxuXHRkZWJ1Z19sZXZlbDogJ2Vycm9yJyxcclxuXHRlbGVtZW50OiAnYm9keScsXHJcblx0aW5qZWN0X2xpYnJhcmllczogW10sXHJcblx0Y29tcG9uZW50czogWydQcm9kdWN0cycsICdTZXJ2aWNlcycsICdGaWx0ZXInLCAnUGFnaW5hdGlvbicsICdDYXJ0J10sXHJcblx0bG9hZGluZ19hbmltYXRpb246IHRydWVcclxufTtcclxuXHJcbi8qKlxyXG4gKiBTdG9yZXMgdGhlIG9wdGlvbmFsLCBcclxuICogaW5qZWN0YWJsZSBleHRlcm5hbCBsaWJyYXJpZXMgXHJcbiAqXHJcbiAqIEB2YXIgb2JqZWN0XHJcbiAqL1xyXG5sZXQgZXh0ZXJuYWxMaWJyYXJpZXMgPSB7XHJcblx0Ym9vdHN0cmFwOiAnaHR0cHM6Ly9tYXhjZG4uYm9vdHN0cmFwY2RuLmNvbS9ib290c3RyYXAvMy4zLjcvY3NzL2Jvb3RzdHJhcC5taW4uY3NzJyxcclxufTtcclxuXHJcbmNsYXNzIFR1cmJvRWNvbW1lcmNlXHJcbntcclxuXHQvKipcclxuXHQgKiBUaGUgZW50ZXJ5IGZvciB0aGUgc2hvcC5cclxuXHQgKiAtIFNldHRpbmcgdGhlIGV4Y2VwdGlvbiBoYW5kbGVyLlxyXG5cdCAqIC0gU2V0dGluZyB0aGUgaW9jIGNvbnRhaW5lci5cclxuXHQgKiAtIEV4dGVuZGluZyB0aGUgdXNlciBzZXR0aW5ncy5cclxuXHQgKiAtIFNldHRpbmcgdGhlIGVsZW1lbnQuXHJcblx0ICogLSBEaXNhYmxpbmcgZGVmYXVsdCBlcnJvcnMuXHJcblx0ICogLSBQYXNzaW5nIGNhbGxzIHZpYSBwcm94eSB0byB0aGUgY29tcG9uZW50cy5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSBvYmplY3QgfCBzZXR0aW5nc1xyXG5cdCAqIEByZXR1cm4gUHJveHlcclxuXHQgKi9cclxuXHRjb25zdHJ1Y3RvcihzZXR0aW5ncylcclxuXHR7XHJcblx0XHRpZiAodHlwZW9mIHNldHRpbmdzICE9ICdvYmplY3QnKSB7XHJcblx0XHRcdHRocm93IG5ldyBJbnZhbGlkQXJndW1lbnRFeGNlcHRpb24kMTtcclxuXHRcdH1cclxuXHJcblx0XHR0aGlzLnNldHRpbmdzID0gQ29tbW9uLmV4dGVuZChkZWZhdWx0U2V0dGluZ3MkNiwgc2V0dGluZ3MpO1xyXG5cclxuXHRcdEV4Y2VwdGlvbkhhbmRsZXIuc2V0RGVidWdMZXZlbCA9IHRoaXMuc2V0dGluZ3MuZGVidWdfbGV2ZWw7XHJcblx0XHRcclxuXHRcdHRoaXMubG9hZEV4dGVybmFsTGlicmFyaWVzKCk7XHJcblx0XHRcclxuXHRcdHRoaXMuY29udGFpbmVyID0gbmV3IENvbnRhaW5lciQ1O1xyXG5cclxuXHRcdHRoaXMuY29tcG9uZW50cyA9IHRoaXMuY29udGFpbmVyLm1ha2UoJ0NvbXBvbmVudHMnKTtcclxuXHRcdHRoaXMuY29tcG9uZW50cy5yZWdpc3Rlcih0aGlzLnNldHRpbmdzLmNvbXBvbmVudHMpO1xyXG5cclxuXHRcdGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCBmdW5jdGlvbigpIHtcclxuXHRcdFx0dGhpcy5zZXRFbGVtZW50KHRoaXMuc2V0dGluZ3MuZWxlbWVudCk7XHJcblxyXG5cdFx0XHRpZiAodGhpcy5zZXR0aW5ncy5sb2FkaW5nX2FuaW1hdGlvbikge1xyXG5cdFx0XHRcdHN0YXJ0TG9hZGluZy5jYWxsKHRoaXMpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHR0aGlzLmFkZFN0eWxlVGFnKCk7XHJcblx0XHR9LmJpbmQodGhpcykpO1xyXG5cclxuXHRcdHJldHVybiBuZXcgUHJveHkodGhpcywge1xyXG5cdFx0XHRnZXQ6IGZ1bmN0aW9uKHNob3AsIHNvdXJjZSkge1xyXG5cdFx0XHRcdGlmIChzaG9wLmNvbXBvbmVudHMuZXhpc3RzKHNvdXJjZSkpIHtcclxuXHRcdFx0XHRcdHJldHVybiBzaG9wLmNvbXBvbmVudHMucHJvdmlkZShzb3VyY2UpO1xyXG5cdFx0XHRcdH0gXHJcblxyXG5cdFx0XHRcdGlmIChzaG9wLmNvbnRhaW5lci5pbnN0YW5jZUV4aXN0KHNvdXJjZSkpIHtcclxuXHRcdFx0XHRcdHJldHVybiBzaG9wLmNvbnRhaW5lci5nZXRJbnN0YW5jZShzb3VyY2UpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0fSk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBMb2FkcyB0aGUgZXh0ZXJuYWwgbGlicmFyaWVzIHdoaWNoIHdhcyBzcGVjaWZpZWQuXHJcblx0ICogXHJcblx0ICogQHJldHVybiB2b2lkXHJcblx0ICovXHJcblx0bG9hZEV4dGVybmFsTGlicmFyaWVzKClcclxuXHR7XHJcblx0XHRsZXQgaTtcclxuXHRcdGxldCBsaWJyYXJpZXMgPSB0aGlzLnNldHRpbmdzLmluamVjdF9saWJyYXJpZXM7XHJcblxyXG5cdFx0Zm9yIChpID0gMDsgaSA8IGxpYnJhcmllcy5sZW5ndGg7IGkrKykge1xyXG5cdFx0XHRpZiAoZXh0ZXJuYWxMaWJyYXJpZXMuaGFzT3duUHJvcGVydHkobGlicmFyaWVzW2ldKSkge1xyXG5cdFx0XHRcdGxldCBpZCA9ICdUdXJiby1lQ29tbWVyY2UtJyArIFN0ci51Y2ZpcnN0KGxpYnJhcmllc1tpXSk7XHJcblx0XHRcdFx0XHJcblx0XHRcdFx0aWYgKCEgRE9NLmZpbmQoaWQpKSB7XHJcblx0XHRcdFx0XHRET00uYWRkTGlua2VkU3R5bGUoaWQsIGV4dGVybmFsTGlicmFyaWVzW2xpYnJhcmllc1tpXV0pO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogU2V0cyB0aGUgZWxlbWVudCB0byBiZSBib3VuZCB0by5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSBzdHJpbmcgfCBzZWxlY3RvclxyXG5cdCAqIEByZXR1cm4gdm9pZFxyXG5cdCAqL1xyXG5cdHNldEVsZW1lbnQoc2VsZWN0b3IpXHJcblx0e1xyXG5cdFx0dGhpcy5lbGVtZW50ID0gRE9NLmZpbmQoc2VsZWN0b3IpO1xyXG5cdFx0XHJcblx0XHRET00uYWRkQ2xhc3ModGhpcy5lbGVtZW50LCB0aGlzLnNldHRpbmdzLmNsYXNzKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEFkZCB0aGUgZUNvbW1lcmNlIHN0eWxlIHRhZ3MgdG8gdGhlIERPTS5cclxuXHQgKlxyXG5cdCAqIEByZXR1cm4gdm9pZFxyXG5cdCAqL1xyXG5cdGFkZFN0eWxlVGFnKCkgXHJcblx0e1xyXG5cdFx0aWYgKERPTS5maW5kKCcjVHVyYm9lLUNvbW1lcmNlJykpIHtcclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0fVxyXG5cclxuXHRcdGxldCBjc3MgPSBgXHJcblx0XHRcdCR7dGhpcy5zZXR0aW5ncy5lbGVtZW50fSB7XHJcblx0XHRcdFx0cG9zaXRpb246IHJlbGF0aXZlO1xyXG5cdFx0XHRcdGNsZWFyOiBib3RoO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHQubG9hZGluZy1wcm9ncmVzcy1iYXIge1xyXG5cdFx0XHRcdHBvc2l0aW9uOiBmaXhlZDtcclxuXHRcdFx0XHR0b3A6IDA7XHJcblx0XHRcdFx0bGVmdDogMDtcclxuXHRcdFx0XHRoZWlnaHQ6IDVweDtcclxuXHRcdFx0XHR3aWR0aDogMTAwJTtcclxuXHRcdFx0XHQtd2Via2l0LWJveC1zaGFkb3c6IDBweCAwcHggNXB4IDFweCByZ2JhKDE2OCwxNjgsMTY4LDEpO1xyXG5cdFx0XHRcdC1tb3otYm94LXNoYWRvdzogMHB4IDBweCA1cHggMXB4IHJnYmEoMTY4LDE2OCwxNjgsMSk7XHJcblx0XHRcdFx0Ym94LXNoYWRvdzogMHB4IDBweCA1cHggMXB4IHJnYmEoMTY4LDE2OCwxNjgsMSk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdC5sb2FkaW5nLXByb2dyZXNzLWJhciA+IC5sb2FkaW5nLXByb2dyZXNzLWZpbGwge1xyXG5cdFx0XHRcdHdpZHRoOiAxMDAlO1xyXG5cdFx0XHRcdGhlaWdodDogMTAwJTtcclxuXHRcdFx0XHRwb3NpdGlvbjogYWJzb2x1dGU7XHJcblx0XHRcdFx0YmFja2dyb3VuZC1jb2xvcjogIzlkZDJmZjtcclxuXHRcdFx0XHR0cmFuc2Zvcm06IHRyYW5zbGF0ZVgoLSR7ZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudFdpZHRofXB4KTtcclxuXHRcdFx0fVxyXG5cdFx0YDtcclxuXHQgICAgXHJcblx0ICAgIERPTS5hZGRTdHlsZSgnVHVyYm8tZUNvbW1lcmNlJywgY3NzKTtcclxuXHR9XHJcbn1cclxuXHJcblxyXG4vKipcclxuICogQXR0YWNoZXMgYSBsb2FkZXIgdG8gdGhlIHRvcCBvZiB0aGUgc2NyZWVuXHJcbiAqIGFuZCBoaWRlcyB0aGUgY29udGVudC5cclxuICogU3RvcHMgYXV0b21hdGljYWxseSBhZnRlciAyMCUgcmVhY2hlZC5cclxuICpcclxuICogQHJldHVybiB2b2lkIFxyXG4gKi9cclxuZnVuY3Rpb24gc3RhcnRMb2FkaW5nKCkge1xyXG5cdGxldCBsb2FkZXIgPSBET00uY3JlYXRlRWxlbWVudCgnZGl2Jywge1xyXG5cdFx0Y2xhc3M6ICdsb2FkaW5nLXByb2dyZXNzLWJhcidcclxuXHR9KTtcclxuXHJcblx0bGV0IGZpbGwgPSBET00uY3JlYXRlRWxlbWVudCgnc3BhbicsIHtcclxuXHRcdGNsYXNzOiAnbG9hZGluZy1wcm9ncmVzcy1maWxsJ1xyXG5cdH0pO1xyXG5cclxuXHRsb2FkZXIuYXBwZW5kQ2hpbGQoZmlsbCk7XHJcblx0ZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChsb2FkZXIpO1xyXG5cclxuXHJcblx0bGV0IHByb2dyZXNzID0gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudFdpZHRoO1xyXG5cdGxldCBtYXhTaXplID0gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudFdpZHRoICogMC44MDtcclxuXHJcblx0d2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZShwcm9ncmVzc0RyYXcpO1xyXG5cclxuXHRsZXQgY29udGVudCA9IHRoaXMuZWxlbWVudDtcclxuXHJcblx0Y29udGVudC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xyXG5cdFxyXG5cdGZ1bmN0aW9uIHByb2dyZXNzRHJhdygpIHtcclxuXHRcdGZpbGwuc3R5bGUudHJhbnNmb3JtID0gJ3RyYW5zbGF0ZVgoLScgKyBwcm9ncmVzcyArICdweCknO1xyXG5cdFx0cHJvZ3Jlc3MgLT0gNztcclxuXHJcblx0XHRpZiAocHJvZ3Jlc3MgPCBtYXhTaXplKSB7XHJcblx0XHRcdGRvbmUoKTtcclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0fVxyXG5cclxuXHRcdHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUocHJvZ3Jlc3NEcmF3KTtcclxuXHR9XHJcblxyXG5cdGZ1bmN0aW9uIGRvbmUoKSB7XHJcblx0XHRmaWxsLnN0eWxlLm9wYWNpdHkgPSBwcm9ncmVzcyAvIDEwMDA7XHJcblx0XHRmaWxsLnN0eWxlLnRyYW5zZm9ybSA9ICd0cmFuc2xhdGVYKC0nICsgcHJvZ3Jlc3MgKyAncHgpJztcclxuXHRcclxuXHRcdHByb2dyZXNzIC09IDE1O1xyXG5cclxuXHRcdGlmIChwcm9ncmVzcyA8PSAwKSB7XHJcblx0XHRcdGNvbnRlbnQuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XHJcblx0XHRcdFxyXG5cdFx0XHRpZiAodHlwZW9mIGxvYWRlciAhPSAndW5kZWZpbmVkJykge1xyXG5cdFx0XHRcdERPTS5yZW1vdmUobG9hZGVyKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0fVxyXG5cclxuXHRcdHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoZG9uZSk7XHJcblx0fVxyXG59XG5cbnJldHVybiBUdXJib0Vjb21tZXJjZTtcblxufSgpKTtcbiJdfQ==
