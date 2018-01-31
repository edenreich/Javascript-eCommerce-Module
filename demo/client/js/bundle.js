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

	var defaultMessage$2 = 'Trying to bind an already existing bound.';

	var InvalidBindingException = function (_ExceptionHandler3) {
		_inherits(InvalidBindingException, _ExceptionHandler3);

		function InvalidBindingException() {
			var message = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

			_classCallCheck(this, InvalidBindingException);

			message = message || defaultMessage$2;

			var _this3 = _possibleConstructorReturn(this, (InvalidBindingException.__proto__ || Object.getPrototypeOf(InvalidBindingException)).call(this, message));

			_get(InvalidBindingException.prototype.__proto__ || Object.getPrototypeOf(InvalidBindingException.prototype), 'stackTrace', _this3).call(_this3, _this3, message);
			return _this3;
		}

		return InvalidBindingException;
	}(ExceptionHandler);

	// Helpers
	// Exceptions
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
    * Remove all existing instances.
    *
    * @return void 
    */

		}, {
			key: 'flush',
			value: function flush() {
				_instances = [];
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

	var BadEventCallException = function (_ExceptionHandler4) {
		_inherits(BadEventCallException, _ExceptionHandler4);

		function BadEventCallException() {
			var message = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

			_classCallCheck(this, BadEventCallException);

			message = message || defaultMessage$3;

			var _this4 = _possibleConstructorReturn(this, (BadEventCallException.__proto__ || Object.getPrototypeOf(BadEventCallException)).call(this, message));

			_get(BadEventCallException.prototype.__proto__ || Object.getPrototypeOf(BadEventCallException.prototype), 'stackTrace', _this4).call(_this4, _this4, message);
			return _this4;
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

	var defaultMessage$4 = 'The item you are trying to add must contain a unique id';

	var InvalidCartItemException = function (_ExceptionHandler5) {
		_inherits(InvalidCartItemException, _ExceptionHandler5);

		function InvalidCartItemException() {
			var message = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

			_classCallCheck(this, InvalidCartItemException);

			message = message || defaultMessage$4;

			var _this5 = _possibleConstructorReturn(this, (InvalidCartItemException.__proto__ || Object.getPrototypeOf(InvalidCartItemException)).call(this, message));

			_get(InvalidCartItemException.prototype.__proto__ || Object.getPrototypeOf(InvalidCartItemException.prototype), 'stackTrace', _this5).call(_this5, _this5, message);
			return _this5;
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
	var Container$4 = void 0;

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

			Container$4 = container;
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

				var css = '\n\t\t\t' + this.settings.element + ' {\n\t\t\t\t\n\t\t\t}\n\t\t';

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
				console.log(this);
				console.log(Container$4.instances());
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
	var Container$5 = void 0;

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

			Container$5 = container;
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

				if (Container$5.Pagination && Container$5.Pagination.booted) {
					switch (Container$5.Pagination.settings.proccessing) {
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
				Container$5.Pagination.settings.total_items = products.length;

				var perPage = Container$5.Pagination.settings.per_page;

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

	var defaultMessage$5 = 'Sorry, no more pages.';

	var NotInPageRangeException = function (_ExceptionHandler6) {
		_inherits(NotInPageRangeException, _ExceptionHandler6);

		function NotInPageRangeException() {
			var message = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

			_classCallCheck(this, NotInPageRangeException);

			message = message || defaultMessage$5;

			var _this6 = _possibleConstructorReturn(this, (NotInPageRangeException.__proto__ || Object.getPrototypeOf(NotInPageRangeException)).call(this));

			_get(NotInPageRangeException.prototype.__proto__ || Object.getPrototypeOf(NotInPageRangeException.prototype), 'stackTrace', _this6).call(_this6, _this6, message);
			return _this6;
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
	var Container$6 = void 0;

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
			Container$6 = container;
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
    * @param 
    * @return 
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

	var defaultMessage$6 = 'In order to use components you must register them with the shop!';

	var ComponentNotRegisteredException = function (_ExceptionHandler7) {
		_inherits(ComponentNotRegisteredException, _ExceptionHandler7);

		function ComponentNotRegisteredException() {
			var message = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

			_classCallCheck(this, ComponentNotRegisteredException);

			message = message || defaultMessage$6;

			var _this7 = _possibleConstructorReturn(this, (ComponentNotRegisteredException.__proto__ || Object.getPrototypeOf(ComponentNotRegisteredException)).call(this, message));

			_get(ComponentNotRegisteredException.prototype.__proto__ || Object.getPrototypeOf(ComponentNotRegisteredException.prototype), 'stackTrace', _this7).call(_this7, _this7, message);
			return _this7;
		}

		return ComponentNotRegisteredException;
	}(ExceptionHandler);

	// Helpers
	// Core
	// Components
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

			this.container = new Container();
			this.settings = Common.extend(defaultSettings$6, settings);

			ExceptionHandler.setDebugLevel = this.settings.debug_level;
			this.loadExternalLibraries();

			document.addEventListener('DOMContentLoaded', function () {
				this.setElement(this.settings.element);

				if (this.settings.loading_animation) {
					startLoading.call(this);
				}

				this.addStyleTag();
			}.bind(this));

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
				this.wrapper = DOM.find(selector);

				DOM.addClass(this.wrapper, this.settings.class);
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
  * Binds components dependencies.
  *
  * @param object | components
  * @return void
  */


	function bindComponentsDependencies(components) {

		this.container.setInstance('Request', new Request());
		this.container.setInstance('Events', new EventManager());

		this.container.bind('Filter', function (container) {
			var component = new Filter(container);
			component.booted = true;
			return component;
		});

		this.container.bind('Services', function (container) {
			var component = new Services(container);
			component.booted = true;
			return component;
		});

		this.container.bind('Products', function (container) {
			var component = new Products(container, container.Request, container.Events);
			component.booted = true;
			return component;
		});

		this.container.bind('Pagination', function (container) {
			var component = new Pagination(container, container.make('Products'), container.Events);
			component.booted = true;
			return component;
		});

		this.container.bind('Cart', function (container) {
			var component = new Cart(container, container.Request, container.Events);
			component.booted = true;
			return component;
		});

		this.container.bind('Checkout', function (container) {
			var component = new Checkout(container, container.Request, container.Events);
			component.booted = true;
			return component;
		});

		this.container.Filter.booted = false;
		this.container.Services.booted = false;
		this.container.Products.booted = false;
		this.container.Pagination.booted = false;
		this.container.Cart.booted = false;
		this.container.Checkout.booted = false;
	}

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

		var content = this.wrapper;

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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlR1cmJvRWNvbW1lcmNlLmpzIl0sIm5hbWVzIjpbIlR1cmJvRWNvbW1lcmNlIiwiU3RyIiwic3RyaW5nIiwicmVwbGFjZSIsInRvTG93ZXJDYXNlIiwibGVuZ3RoIiwicG9zc2libGUiLCJpIiwiY2hhckF0IiwiTWF0aCIsImZsb29yIiwicmFuZG9tIiwidG9VcHBlckNhc2UiLCJzbGljZSIsImRlYnVnTGV2ZWwiLCJFeGNlcHRpb25IYW5kbGVyIiwibGV2ZWwiLCJ3aW5kb3ciLCJvbmVycm9yIiwiRXJyb3IiLCJjYXB0dXJlU3RhY2tUcmFjZSIsImNvbnN0cnVjdG9yIiwibmFtZSIsImVycm9yIiwibWVzc2FnZSIsImN1c3RvbUFjdGlvbnMiLCJoYW5kbGVFcnJvcnMiLCJoYW5kbGVXYXJuaW5ncyIsImhhbmRsZUluZm9zIiwiY29uc29sZSIsIndhcm4iLCJpbmZvIiwiZGVmYXVsdE1lc3NhZ2UiLCJJbnZhbGlkQXJndW1lbnRFeGNlcHRpb24kMSIsIkRPTSIsImVsZW1lbnQiLCJjbGFzc05hbWUiLCJuZXdDbGFzc05hbWUiLCJyZW1vdmVDbGFzcyIsImFkZENsYXNzIiwidW5kZWZpbmVkIiwiY2xhc3NOYW1lcyIsInNwbGl0IiwiZm9yRWFjaCIsImNsYXNzTGlzdCIsImFkZCIsImluZGV4T2YiLCJyZW1vdmUiLCJwYXJlbnROb2RlIiwicmVtb3ZlQ2hpbGQiLCJpZCIsImNzcyIsImhlYWQiLCJkb2N1bWVudCIsImdldEVsZW1lbnRzQnlUYWdOYW1lIiwic3R5bGVUYWciLCJjcmVhdGVFbGVtZW50IiwiQ1NTIiwibWluaWZ5Q3NzIiwiaW5uZXJIVE1MIiwic2V0QXR0cmlidXRlIiwiYXBwZW5kQ2hpbGQiLCJzb3VyY2UiLCJsaW5rZWRTdHlsZVRhZyIsImVsZW1lbnRUeXBlIiwib3B0aW9ucyIsIm9wdGlvbiIsInNlY29uZENsYXNzTmFtZSIsInRvZ2dsZSIsInNlbGVjdG9yIiwiY29udGV4dCIsInF1ZXJ5RWxlbWVudCIsInBhcmVudEVsZW1lbnQiLCJxdWVyeVNlbGVjdG9yQWxsIiwiaGFzQ2hpbGQiLCJjaGlsZEVsZW1lbnQiLCJub2RlIiwiQ29tbW9uIiwiY3VycmVudE9iamVjdCIsIm5ld09iamVjdCIsImV4dGVuZGVkIiwicHJvcCIsIk9iamVjdCIsInByb3RvdHlwZSIsImhhc093blByb3BlcnR5IiwiY2FsbCIsIm5lZWRsZSIsImh5c3RhY2siLCJBcnJheSIsInRvdGFsIiwic2l6ZSIsImlzTmFOIiwicGFyc2VJbnQiLCJjb2xsZWN0aW9uIiwiY2VpbCIsInN0YXJ0IiwiZW5kIiwicHVzaCIsIm9iamVjdCIsImRlZmF1bHRNZXNzYWdlJDEiLCJJbnZhbGlkRGF0YVN0cnVjdHVyZUV4Y2VwdGlvbiIsImRlZmF1bHRTZXR0aW5ncyIsImhlYWRlcnMiLCJhc3luYyIsIlJlcXVlc3QiLCJzZXR0aW5ncyIsImV4dGVuZCIsInNldERlZmF1bHRSZXF1ZXN0SGVhZGVyIiwiaGVhZGVyIiwib3BlbiIsIlhNTEh0dHBSZXF1ZXN0Iiwic2V0UmVxdWVzdEhlYWRlciIsInJlc3BvbnNlIiwiYXBwbHkiLCJhcmd1bWVudHMiLCJ4aHIiLCJiZWZvcmUiLCJQcm9taXNlIiwicmVzb2x2ZSIsInJlamVjdCIsImRhdGEiLCJ1cmwiLCJyZXNwb25zZVR5cGUiLCJkYXRhVHlwZSIsInRpbWVvdXQiLCJvbnJlYWR5c3RhdGVjaGFuZ2UiLCJyZWFkeVN0YXRlIiwic3RhdHVzIiwiYWZ0ZXIiLCJzZW5kIiwicXVlcnlTdHJpbmciLCJrZXlzIiwibWFwIiwia2V5IiwiZW5jb2RlVVJJQ29tcG9uZW50Iiwiam9pbiIsIkFjdGl2ZVhPYmplY3QiLCJyZXNwb25zZVRleHQiLCJKU09OIiwicGFyc2UiLCJkZWZhdWx0TWVzc2FnZSQyIiwiSW52YWxpZEJpbmRpbmdFeGNlcHRpb24iLCJpbnN0YW5jZXMiLCJDb250YWluZXIiLCJjb25jcmV0ZSIsImJpbmQiLCJpbnN0YW5jZSIsImFsaWFzIiwiaW5zdGFuY2VFeGlzdCIsImdldEluc3RhbmNlIiwic2V0SW5zdGFuY2UiLCJkZWZhdWx0TWVzc2FnZSQzIiwiQmFkRXZlbnRDYWxsRXhjZXB0aW9uIiwiRXZlbnRNYW5hZ2VyIiwiZXZlbnRzIiwiY2FsbGJhY2siLCJJbnZhbGlkQXJndW1lbnRFeGNlcHRpb24iLCJDb29raWUiLCJ2YWx1ZSIsImRheXMiLCJzdHJpbmdpZnkiLCJleHBpcmVzIiwiZGF0ZSIsIkRhdGUiLCJzZXRUaW1lIiwiZ2V0VGltZSIsInRvR01UU3RyaW5nIiwiY29va2llIiwiY19zdGFydCIsImNfZW5kIiwidW5lc2NhcGUiLCJzdWJzdHJpbmciLCJkZWZhdWx0TWVzc2FnZSQ0IiwiSW52YWxpZENhcnRJdGVtRXhjZXB0aW9uIiwiZGVmYXVsdFNldHRpbmdzJDEiLCJjb29raWVfbmFtZSIsInByZXZpZXdfY2xhc3MiLCJsb2FkZXIiLCJjbGFzcyIsIndpZHRoIiwiaGVpZ2h0IiwicGxhY2VtZW50IiwiZml4ZWQiLCJob3Zlcl9jb2xvciIsIm5vX2NzcyIsIkNvbnRhaW5lciQyIiwiRXZlbnRNYW5hZ2VyJDIiLCJIdHRwIiwibG9hZGluZ092ZXJsYXkiLCJpdGVtc0RpdiIsIkNhcnQiLCJjb250YWluZXIiLCJodHRwIiwiZXZlbnRNYW5hZ2VyIiwicHJldmlld0VsZW1lbnQiLCJjcmVhdGVQcmV2aWV3RWxlbWVudCIsImljb24iLCJjcmVhdGVJY29uIiwic2V0RWxlbWVudCIsImFkZFN0eWxlVGFnIiwiYmluZEV2ZW50TGlzdGVuZXJzIiwiaXNFbXB0eSIsImdldCIsInNldHVwQ2FydCIsImNhcnQiLCJlbXB0eU9iamVjdCIsIml0ZW1zIiwiZmF2b3JpdGVzIiwic2V0IiwiaXRlbSIsInF1YW50aXR5IiwiaW5jcmVtZW50ZWQiLCJhbHJlYWR5RmF2b3JpdGVkIiwic3BsaWNlIiwidGFibGUiLCJhdHRyaWJ1dGVzIiwidHIiLCJ0ZCIsImF0dHJpYnV0ZSIsImltYWdlIiwic3JjIiwiY29sc3BhbiIsImNoZWNrb3V0IiwidGV4dCIsIm9uY2xpY2siLCJlIiwicHJldmVudERlZmF1bHQiLCJwdWJsaXNoIiwiZmluZCIsInBvc2l0aW9uIiwiYWRkU3R5bGUiLCJjcmVhdGVMb2FkZXIiLCJwcmV2aWV3U3RhcnRMb2FkaW5nIiwiZ2V0Q2FydEl0ZW1zIiwiYWRkVG9QcmV2aWV3Iiwic2V0VGltZW91dCIsInByZXZpZXdTdG9wTG9hZGluZyIsInRvZ2dsZUNhcnRQcmV2aWV3Iiwic3Vic2NyaWJlIiwib3BlbkNhcnRQcmV2aWV3IiwiYWRkSXRlbSIsInJlbG9hZENhcnRQcmV2aWV3IiwiZmF2b3JpdGVJdGVtIiwiaGFzQ2xhc3MiLCJzd2l0Y2hDbGFzc2VzIiwib3BlbmluZyIsInRvZ2dsZUNsYXNzIiwic3R5bGUiLCJkaXNwbGF5IiwiY2xvc2UiLCJldmVudCIsInN2ZyIsImNyZWF0ZUVsZW1lbnROUyIsImciLCJwYXRoIiwiZGl2IiwiY291bnQiLCJncm91cHMiLCJyZWN0YW5nZWxzIiwiYW5pbWF0aW9ucyIsInJvdGF0aW9uIiwiZ3JvdXAiLCJyZWN0YW5nZWwiLCJiZWdpbiIsImFuaW1hdGUiLCJ0b0ZpeGVkIiwiZGVmYXVsdFNldHRpbmdzJDIiLCJDb250YWluZXIkMyIsIkZpbHRlciIsImFkZEV2ZW50TGlzdGVuZXIiLCJtaW5XaWR0aCIsIm1pbl93aWR0aCIsImRlZmF1bHRTZXR0aW5ncyQzIiwiQ29udGFpbmVyJDQiLCJFdmVudE1hbmFnZXIkMyIsIkh0dHAkMSIsIkNoZWNrb3V0IiwiaGlkZUFsbCIsInNob3ciLCJsb2ciLCJkZWZhdWx0U2V0dGluZ3MkNCIsIml0ZW1fY2xhc3MiLCJhZGRfYnV0dG9uX2NsYXNzIiwiZmF2b3JpdGVfYnV0dG9uX2NsYXNzIiwiQ29udGFpbmVyJDUiLCJFdmVudE1hbmFnZXIkNCIsIkh0dHAkMiIsImNodW5rZWRQcm9kdWN0cyIsIlByb2R1Y3RzIiwidG90YWxJdGVtcyIsImxvYWRQcm9kdWN0cyIsInBhZ2VOdW1iZXIiLCJQYWdpbmF0aW9uIiwiYm9vdGVkIiwicHJvY2Nlc3NpbmciLCJsb2FkUGFnZVByb2R1Y3RzQnlDbGllbnQiLCJsb2FkUGFnZVByb2R1Y3RzQnlTZXJ2ZXIiLCJyZXF1ZXN0IiwiZ2V0UHJvZHVjdHMiLCJ0aGVuIiwicHJvZHVjdHMiLCJjdXJyZW50SXRlbXMiLCJwcm9kdWN0IiwicmVwbGFjZUl0ZW1zIiwiY2F0Y2giLCJwYWdlcyIsImNhbGN1bGF0ZUNsaWVudFBhZ2VzIiwidG90YWxfaXRlbXMiLCJwZXJQYWdlIiwicGVyX3BhZ2UiLCJhcnJheV9jaHVuayIsImlzQXJyYXkiLCJidWlsZFByb2R1Y3RzIiwiYWN0aW9uIiwiYXR0cmlidXRlc0NvbGxlY3Rpb24iLCJ0YWdUeXBlIiwiYnVpbHRQcm9kdWN0cyIsImJ1aWx0UHJvZHVjdCIsImJ1aWxkUHJvZHVjdCIsIm92ZXJsYXkiLCJpbl9hcnJheSIsInRhZyIsImtlYmFiQ2FzZSIsImFkZFRvQ2FydCIsInR5cGUiLCJmYXZvcml0ZSIsIm1heFdpZHRoIiwibWF4X3dpZHRoIiwiU2VydmljZXMiLCJkZWZhdWx0TWVzc2FnZSQ1IiwiTm90SW5QYWdlUmFuZ2VFeGNlcHRpb24iLCJkZWZhdWx0U2V0dGluZ3MkNSIsIkNvbnRhaW5lciQ2IiwiUHJvZHVjdHMkMiIsIkV2ZW50TWFuYWdlciQ1Iiwic2V0Q3VycmVudCIsInRvdGFsUGFnZXMiLCJjYWxjdWxhdGVUb3RhbFBhZ2VzIiwiYnVpbGRQYWdpbmF0aW9uIiwibGlua3MiLCJjcmVhdGVMaW5rcyIsInJlcGxhY2VMaW5rcyIsIm5leHQiLCJjaGlsZE5vZGVzIiwicmVxdWVzdGVkUGFnZSIsImN1cnJlbnQiLCJub3RJblBhZ2VSYW5nZSIsInByZXZpb3VzIiwiZ2V0QXR0cmlidXRlIiwiY2hhbmdlVXJsIiwic2V0QWN0aXZlTGluayIsInVsIiwiY3JlYXRlUGFnZUxpbmtzIiwiY3JlYXRlUHJldmlvdXNCdXR0b24iLCJjcmVhdGVOZXh0QnV0dG9uIiwicGFnZSIsInBhZ2VJdGVtIiwibGluayIsImxpIiwic3BhbjEiLCJzcGFuMiIsImhpc3RvcnkiLCJyZXBsYWNlU3RhdGUiLCJ1cGRhdGVVUkxQYXJhbWV0ZXIiLCJsb2NhdGlvbiIsImhyZWYiLCJ2YXJzIiwicGFydHMiLCJtIiwicGFyYW0iLCJwYXJhbVZhbCIsIm5ld0FkZGl0aW9uYWxVUkwiLCJ0ZW1wQXJyYXkiLCJiYXNlVVJMIiwiYWRkaXRpb25hbFVSTCIsInRlbXAiLCJyb3dzVGV4dCIsImRlZmF1bHRNZXNzYWdlJDYiLCJDb21wb25lbnROb3RSZWdpc3RlcmVkRXhjZXB0aW9uIiwiZGVmYXVsdFNldHRpbmdzJDYiLCJkZWJ1Z19sZXZlbCIsImluamVjdF9saWJyYXJpZXMiLCJjb21wb25lbnRzIiwibG9hZGluZ19hbmltYXRpb24iLCJleHRlcm5hbExpYnJhcmllcyIsImJvb3RzdHJhcCIsInNldERlYnVnTGV2ZWwiLCJsb2FkRXh0ZXJuYWxMaWJyYXJpZXMiLCJzdGFydExvYWRpbmciLCJiaW5kQ29tcG9uZW50c0RlcGVuZGVuY2llcyIsIlByb3h5IiwidGFyZ2V0IiwibWFrZSIsImxpYnJhcmllcyIsInVjZmlyc3QiLCJhZGRMaW5rZWRTdHlsZSIsIndyYXBwZXIiLCJkb2N1bWVudEVsZW1lbnQiLCJjbGllbnRXaWR0aCIsImNvbXBvbmVudCIsIkV2ZW50cyIsImZpbGwiLCJib2R5IiwicHJvZ3Jlc3MiLCJtYXhTaXplIiwicmVxdWVzdEFuaW1hdGlvbkZyYW1lIiwicHJvZ3Jlc3NEcmF3IiwiY29udGVudCIsInRyYW5zZm9ybSIsImRvbmUiLCJvcGFjaXR5Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsSUFBSUEsaUJBQWtCLFlBQVk7QUFDbEM7O0FBRUE7Ozs7Ozs7O0FBSGtDLEtBVzVCQyxHQVg0QjtBQUFBO0FBQUE7QUFBQTs7QUFBQTtBQUFBOztBQWFqQzs7Ozs7O0FBYmlDLDZCQW1CaEJDLE1BbkJnQixFQW9CakM7QUFDQyxXQUFPQSxPQUFPQyxPQUFQLENBQWUsaUJBQWYsRUFBa0MsT0FBbEMsRUFBMkNDLFdBQTNDLEVBQVA7QUFDQTs7QUFFRDs7Ozs7OztBQXhCaUM7QUFBQTtBQUFBLDBCQThCbkJDLE1BOUJtQixFQStCakM7QUFDQyxRQUFJSCxTQUFTLEVBQWI7QUFD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V0FBekIsR0FBdUMsSUFBckQ7O0FBRUE3WCxTQUFPb1kscUJBQVAsQ0FBNkJDLFlBQTdCOztBQUVBLE1BQUlDLFVBQVUsS0FBS1gsT0FBbkI7O0FBRUFXLFVBQVFoSyxLQUFSLENBQWNDLE9BQWQsR0FBd0IsTUFBeEI7O0FBRUEsV0FBUzhKLFlBQVQsR0FBd0I7QUFDdkJMLFFBQUsxSixLQUFMLENBQVdpSyxTQUFYLEdBQXVCLGlCQUFpQkwsUUFBakIsR0FBNEIsS0FBbkQ7QUFDQUEsZUFBWSxDQUFaOztBQUVBLE9BQUlBLFdBQVdDLE9BQWYsRUFBd0I7QUFDdkJLO0FBQ0E7QUFDQTs7QUFFRHhZLFVBQU9vWSxxQkFBUCxDQUE2QkMsWUFBN0I7QUFDQTs7QUFFRCxXQUFTRyxJQUFULEdBQWdCO0FBQ2ZSLFFBQUsxSixLQUFMLENBQVdtSyxPQUFYLEdBQXFCUCxXQUFXLElBQWhDO0FBQ0FGLFFBQUsxSixLQUFMLENBQVdpSyxTQUFYLEdBQXVCLGlCQUFpQkwsUUFBakIsR0FBNEIsS0FBbkQ7O0FBRUFBLGVBQVksRUFBWjs7QUFFQSxPQUFJQSxZQUFZLENBQWhCLEVBQW1CO0FBQ2xCSSxZQUFRaEssS0FBUixDQUFjQyxPQUFkLEdBQXdCLE9BQXhCOztBQUVBLFFBQUksT0FBT3ZFLE1BQVAsSUFBaUIsV0FBckIsRUFBa0M7QUFDakMvSSxTQUFJYSxNQUFKLENBQVdrSSxNQUFYO0FBQ0E7O0FBRUQ7QUFDQTs7QUFFRGhLLFVBQU9vWSxxQkFBUCxDQUE2QkksSUFBN0I7QUFDQTtBQUNEOztBQUVELFFBQU96WixjQUFQO0FBRUMsQ0FyeEdxQixFQUF0QiIsImZpbGUiOiJUdXJib0Vjb21tZXJjZS5qcyIsInNvdXJjZXNDb250ZW50IjpbInZhciBUdXJib0Vjb21tZXJjZSA9IChmdW5jdGlvbiAoKSB7XG4ndXNlIHN0cmljdCc7XG5cbi8qKlxyXG4gKiBAZmlsZSBcclxuICogU3RyIGNsYXNzLlxyXG4gKlxyXG4gKiBBZGRzIHNvbWUgdXNlZnVsIGZ1bmN0aW9uYWxpdHkgZm9yXHJcbiAqIG1hbmlwdWxhdGluZyBzdHJpbmdzIG9yIGNyZWF0aW5nIHN0cmluZy5cclxuICovXHJcblxyXG5jbGFzcyBTdHJcclxue1xyXG5cdC8qKlxyXG5cdCAqIENvbnZlcnQgY2FtZWxDYXNlIHRvIGtlYmFiLWNhc2UuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gc3RyaW5nIHwgc3RyaW5nXHJcblx0ICogQHJldHVybiBzdHJpbmdcclxuXHQgKi9cclxuXHRzdGF0aWMga2ViYWJDYXNlKHN0cmluZykgXHJcblx0e1xyXG5cdFx0cmV0dXJuIHN0cmluZy5yZXBsYWNlKC8oW2Etel0pKFtBLVpdKS9nLCAnJDEtJDInKS50b0xvd2VyQ2FzZSgpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogR2VuZXJhdGVzIGEgcmFuZG9tIHN0cmluZy5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSBpbnRlZ2VyIHwgbGVuZ3RoXHJcblx0ICogQHJldHVybiBzdHJpbmdcclxuXHQgKi9cclxuXHRzdGF0aWMgcmFuZG9tKGxlbmd0aCkgXHJcblx0e1xyXG5cdFx0bGV0IHN0cmluZyA9ICcnO1xyXG5cdFx0bGV0IHBvc3NpYmxlID0gXCJBQkNERUZHSElKS0xNTk9QUVJTVFVWV1hZWmFiY2RlZmdoaWprbG1ub3BxcnN0dXZ3eHl6MDEyMzQ1Njc4OVwiO1xyXG5cclxuXHRcdGZvciAobGV0IGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcclxuXHQgICAgXHRzdHJpbmcgKz0gcG9zc2libGUuY2hhckF0KE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIHBvc3NpYmxlLmxlbmd0aCkpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiBzdHJpbmc7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBDaGFuZ2VzIHRoZSBmaXJzdCBsZXR0ZXIgXHJcblx0ICogb2YgdGhlIHN0cmluZyB0byB1cHBlcmNhc2UuXHJcblx0ICogXHJcblx0ICogQHBhcmFtIHN0cmluZyB8IHN0cmluZ1xyXG5cdCAqIEByZXR1cm4gc3RyaW5nXHJcblx0ICovXHJcblx0c3RhdGljIHVjZmlyc3Qoc3RyaW5nKSBcclxuXHR7XHJcblx0ICAgIHJldHVybiBzdHJpbmcuY2hhckF0KDApLnRvVXBwZXJDYXNlKCkgKyBzdHJpbmcuc2xpY2UoMSk7XHJcblx0fVxyXG59XG5cbi8qKlxyXG4gKiBTdG9yZXMgdGhlIGRlYnVnIGxldmVsLlxyXG4gKlxyXG4gKiBAdmFyIHN0cmluZyBcclxuICovXHJcbmxldCBkZWJ1Z0xldmVsO1xyXG5cclxuY2xhc3MgRXhjZXB0aW9uSGFuZGxlclxyXG57XHJcblx0LyoqXHJcblx0ICogU2V0dGVyIGZvciB0aGUgZGVidWcgbGV2ZWwuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gc3RyaW5nIHwgbGV2ZWxcclxuXHQgKiBAcmV0dXJuIHZvaWRcclxuXHQgKi9cclxuXHRzdGF0aWMgc2V0IHNldERlYnVnTGV2ZWwobGV2ZWwpXHJcblx0e1xyXG5cdFx0Ly8gU3VwcHJlc3MgZXJyb3JzIGRlcGVuZHMgb24gdGhlIGRlYnVnIGxldmVsLlxyXG5cdFx0aWYgKGxldmVsID09ICd3YXJuaW5nJyB8fCBsZXZlbCA9PSAnaW5mbycpIHtcclxuXHRcdFx0d2luZG93Lm9uZXJyb3IgPSBmdW5jdGlvbigpIHsgcmV0dXJuIHRydWU7IH07XHJcblx0XHR9XHJcblxyXG5cdFx0ZGVidWdMZXZlbCA9IGxldmVsO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogRXh0ZW5kZWQgY29uc3RydWN0b3IsIGNhcHR1cmVzIHRoZVxyXG5cdCAqIHN0YWNrIHRyYWNlLlxyXG5cdCAqXHJcblx0ICogQHJldHVybiB2b2lkXHJcblx0ICovXHJcblx0Y29uc3RydWN0b3IoKVxyXG5cdHtcclxuXHRcdGlmIChFcnJvci5jYXB0dXJlU3RhY2tUcmFjZSkge1xyXG5cdFx0XHRFcnJvci5jYXB0dXJlU3RhY2tUcmFjZSh0aGlzLCB0aGlzLmNvbnN0cnVjdG9yLm5hbWUpO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogSGFuZGxlcyBhbGwgZXhjZXB0aW9ucy5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSBvYmplY3QgfCBlcnJvciB8IFRocm93ZW4gRXhjZXB0aW9uIE9iamVjdFxyXG5cdCAqIEBwYXJhbSBzdHJpbmcgfCBtZXNzYWdlXHJcblx0ICogQHJldHVybiB2b2lkXHJcblx0ICovXHJcblx0c3RhY2tUcmFjZShlcnJvciwgbWVzc2FnZSkgXHJcblx0e1xyXG5cdFx0dGhpcy5jdXN0b21BY3Rpb25zKGVycm9yLCBtZXNzYWdlKTtcclxuXHJcblx0XHRzd2l0Y2goZGVidWdMZXZlbClcclxuXHRcdHtcclxuXHRcdFx0Y2FzZSAnZXJyb3InOiB0aGlzLmhhbmRsZUVycm9ycyhlcnJvciwgbWVzc2FnZSk7IGJyZWFrO1xyXG5cdFx0XHRjYXNlICd3YXJuaW5nJzogdGhpcy5oYW5kbGVXYXJuaW5ncyhlcnJvciwgbWVzc2FnZSk7IGJyZWFrO1xyXG5cdFx0XHRjYXNlICdpbmZvJzogdGhpcy5oYW5kbGVJbmZvcyhlcnJvciwgbWVzc2FnZSk7IGJyZWFrO1xyXG5cdFx0XHRkZWZhdWx0OiB0aGlzLmhhbmRsZUluZm9zKGVycm9yLCBtZXNzYWdlKTsgYnJlYWs7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBUYWtlIGFjdGlvbiBmb3Igc3BlY2lmaWMgRXhjZXB0aW9ucy5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSBvYmplY3QgfCBlcnJvciB8IFRocm93ZW4gRXhjZXB0aW9uIE9iamVjdFxyXG5cdCAqIEBwYXJhbSBzdHJpbmcgfCBtZXNzYWdlXHJcblx0ICogQHJldHVybiBib29sXHJcblx0ICovXHJcblx0Y3VzdG9tQWN0aW9ucyhlcnJvciwgbWVzc2FnZSlcclxuXHR7XHJcblx0XHRpZiAoZXJyb3IuY29uc3RydWN0b3IubmFtZSA9PSAnSW52YWxpZEFyZ3VtZW50RXhjZXB0aW9uJykge1xyXG5cdFx0XHQvLyBoYW5kbGVcclxuXHRcdH0gZWxzZSBpZiAoZXJyb3IuY29uc3RydWN0b3IubmFtZSA9PSAnSW52YWxpZEJpbmRpbmdFeGNlcHRpb24nKSB7XHJcblx0XHRcdC8vIGhhbmRsZVxyXG5cdFx0fSBlbHNlIGlmIChlcnJvci5jb25zdHJ1Y3Rvci5uYW1lID09ICdCYWRFdmVudENhbGxFeGNlcHRpb24nKSB7XHJcblx0XHRcdC8vIGhhbmRsZVxyXG5cdFx0fSBlbHNlIGlmIChlcnJvci5jb25zdHJ1Y3Rvci5uYW1lID09ICdDb21wb25lbnRzRXhjZXB0aW9uJykge1xyXG5cdFx0XHQvLyBoYW5kbGVcclxuXHRcdH0gZWxzZSBpZiAoZXJyb3IuY29uc3RydWN0b3IubmFtZSA9PSAnQ29tcG9uZW50Tm90UmVnaXN0ZXJlZEV4Y2VwdGlvbicpIHtcclxuXHRcdFx0Ly8gaGFuZGxlXHJcblx0XHR9IGVsc2UgaWYgKGVycm9yLmNvbnN0cnVjdG9yLm5hbWUgPT0gJ05vdEluUGFnZVJhbmdlRXhjZXB0aW9uJykge1xyXG5cdFx0XHQvLyBoYW5kbGVcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gZmFsc2U7XHJcblx0fVxyXG5cclxuXHRoYW5kbGVFcnJvcnMoZXJyb3IsIG1lc3NhZ2UpXHJcblx0e1xyXG5cdFx0Y29uc29sZS5lcnJvcihlcnJvci5jb25zdHJ1Y3Rvci5uYW1lICsgJzogJyArIG1lc3NhZ2UpO1xyXG5cdH1cclxuXHJcblx0aGFuZGxlV2FybmluZ3MoZXJyb3IsIG1lc3NhZ2UpXHJcblx0e1xyXG5cdFx0Y29uc29sZS53YXJuKGVycm9yLmNvbnN0cnVjdG9yLm5hbWUgKyAnOiAnICsgbWVzc2FnZSk7XHJcblx0fVxyXG5cclxuXHRoYW5kbGVJbmZvcyhlcnJvciwgbWVzc2FnZSlcclxuXHR7XHJcblx0XHRjb25zb2xlLmluZm8oZXJyb3IuY29uc3RydWN0b3IubmFtZSArICc6ICcgKyBtZXNzYWdlKTtcclxuXHR9XHJcbn1cblxubGV0IGRlZmF1bHRNZXNzYWdlID0gJ0FuIGludmFsaWQgYXJndW1lbnQgd2FzIHBhc3NlZC4nO1xyXG5cclxuY2xhc3MgSW52YWxpZEFyZ3VtZW50RXhjZXB0aW9uJDEgZXh0ZW5kcyBFeGNlcHRpb25IYW5kbGVyXHJcbntcclxuXHRjb25zdHJ1Y3RvcihtZXNzYWdlID0gbnVsbCkgXHJcblx0e1xyXG5cdFx0bWVzc2FnZSA9IG1lc3NhZ2UgfHwgZGVmYXVsdE1lc3NhZ2U7XHJcblx0XHRzdXBlcihtZXNzYWdlKTtcclxuICAgIFx0c3VwZXIuc3RhY2tUcmFjZSh0aGlzLCBtZXNzYWdlKTtcclxuICAgIH1cclxufVxuXG4vKipcclxuICogQGZpbGUgXHJcbiAqIERPTSBjbGFzcy5cclxuICpcclxuICogQWRkcyBzb21lIHVzZWZ1bCBmdW5jdGlvbmFsaXR5IGZvclxyXG4gKiBmZXRjaGluZyBvciBtYW5pcHVsYXRpbmcgRE9NIGVsZW1lbnRzLlxyXG4gKi9cclxuXHJcbmNsYXNzIERPTVxyXG57XHJcblx0LyoqXHJcblx0ICogTWluaWZpZXMgdGhlIGNzcyB0ZXh0LlxyXG5cdCAqIFxyXG5cdCAqIEBwYXJhbSBzdHJpbmcgfCBzdHJpbmdcclxuXHQgKiBAcmV0dXJuIHN0cmluZ1xyXG5cdCAqL1xyXG5cdHN0YXRpYyBtaW5pZnlDc3Moc3RyaW5nKSBcclxuXHR7XHJcblx0ICAgIHN0cmluZyA9IHN0cmluZy5yZXBsYWNlKC9cXC9cXCooPzooPyFcXCpcXC8pW1xcc1xcU10pKlxcKlxcL3xbXFxyXFxuXFx0XSsvZywgJycpO1xyXG5cdCAgICBzdHJpbmcgPSBzdHJpbmcucmVwbGFjZSgvIHsyLH0vZywgJyAnKTtcclxuXHQgICAgc3RyaW5nID0gc3RyaW5nLnJlcGxhY2UoLyhbezp9XSkvZywgJyQxJyk7XHJcblx0ICAgIHN0cmluZyA9IHN0cmluZy5yZXBsYWNlKC8oWzssXSkgL2csICckMScpO1xyXG5cdCAgICBzdHJpbmcgPSBzdHJpbmcucmVwbGFjZSgvICEvZywgJyEnKTtcclxuXHQgICAgXHJcblx0ICAgIHJldHVybiBzdHJpbmc7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBTd2l0Y2hlcyBiZXR3ZWVuIHR3byBnaXZlbiBjbGFzc2VzLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIG9iamVjdCB8IGVsZW1lbnRcclxuXHQgKiBAcGFyYW0gc3RyaW5nIHwgY2xhc3NOYW1lXHJcblx0ICogQHBhcmFtIHN0cmluZyB8IG5ld0NsYXNzTmFtZVxyXG5cdCAqIEByZXR1cm4gb2JqZWN0XHJcblx0ICovXHJcblx0c3RhdGljIHN3aXRjaENsYXNzZXMoZWxlbWVudCwgY2xhc3NOYW1lLCBuZXdDbGFzc05hbWUpIFxyXG5cdHtcclxuXHRcdHRoaXMucmVtb3ZlQ2xhc3MoZWxlbWVudCwgY2xhc3NOYW1lKTtcclxuXHRcdHRoaXMuYWRkQ2xhc3MoZWxlbWVudCwgbmV3Q2xhc3NOYW1lKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEFkZHMgY2xhc3MgdG8gYSBnaXZlbiBlbGVtZW50LlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIG9iamVjdCB8IGVsZW1lbnRcclxuXHQgKiBAcGFyYW0gc3RyaW5nIHwgY2xhc3NOYW1lXHJcblx0ICogQHJldHVybiBvYmplY3RcclxuXHQgKi9cclxuXHRzdGF0aWMgYWRkQ2xhc3MoZWxlbWVudCwgY2xhc3NOYW1lKSBcclxuXHR7XHJcblx0XHRpZihlbGVtZW50ID09PSBudWxsKSB7XHJcblx0XHRcdHRocm93IG5ldyBJbnZhbGlkQXJndW1lbnRFeGNlcHRpb24kMTtcclxuXHRcdH1cclxuXHJcblx0XHRpZighIGNsYXNzTmFtZSB8fCBjbGFzc05hbWUgPT0gJycgfHwgdHlwZW9mIGNsYXNzTmFtZSA9PT0gdW5kZWZpbmVkKSB7XHJcblx0XHRcdHJldHVybiBlbGVtZW50O1xyXG5cdFx0fVxyXG5cclxuXHRcdGxldCBjbGFzc05hbWVzID0gY2xhc3NOYW1lLnNwbGl0KCcgJyk7XHJcblxyXG5cdFx0Y2xhc3NOYW1lcy5mb3JFYWNoKGZ1bmN0aW9uKG5hbWUpIHtcclxuXHRcdFx0ZWxlbWVudC5jbGFzc0xpc3QuYWRkKG5hbWUpO1xyXG5cdFx0fSk7XHJcblx0XHRcclxuXHRcdHJldHVybiBlbGVtZW50O1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQ2hlY2tzIGlmIGFuIGVsZW1lbnQgaGFzIGEgY2xhc3MuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gSFRNTEVsZW1lbnQgfCBlbGVtZW50XHJcblx0ICogQHBhcmFtIHN0cmluZyB8IGNsYXNzTmFtZVxyXG5cdCAqIEByZXR1cm4gYm9vbFxyXG5cdCAqL1xyXG5cdHN0YXRpYyBoYXNDbGFzcyhlbGVtZW50LCBjbGFzc05hbWUpXHJcblx0e1xyXG5cdFx0aWYgKGVsZW1lbnQgPT09IG51bGwpIHtcclxuXHRcdFx0dGhyb3cgbmV3IEludmFsaWRBcmd1bWVudEV4Y2VwdGlvbiQxKCdoYXNDbGFzcygpIGV4cGVjdHMgdGhlIGZpcnN0IGFyZ3VtZW50IHRvIGJlIGFuIEhUTUxFbGVtZW50IGJ1dCBudWxsIHdhcyBwYXNzZWQuJyk7XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKCEgY2xhc3NOYW1lIHx8IGNsYXNzTmFtZSA9PSAnJyB8fCB0eXBlb2YgY2xhc3NOYW1lID09ICd1bmRlZmluZWQnKSB7XHJcblx0XHRcdHJldHVybjtcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gZWxlbWVudC5jbGFzc05hbWUuaW5kZXhPZihjbGFzc05hbWUpICE9IC0xO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogUmVtb3ZlcyBjbGFzcyBmcm9tIGEgZ2l2ZW4gZWxlbWVudC5cclxuXHQgKiBcclxuXHQgKiBAcGFyYW0gb2JqZWN0IHwgZWxlbWVudFxyXG5cdCAqIEBwYXJhbSBzdHJpbmcgfCBjbGFzc05hbWVcclxuXHQgKiBAcmV0dXJuIG9iamVjdFxyXG5cdCAqL1xyXG5cdHN0YXRpYyByZW1vdmVDbGFzcyhlbGVtZW50LCBjbGFzc05hbWUpIFxyXG5cdHtcclxuXHRcdGlmKGVsZW1lbnQgPT0gbnVsbCkge1xyXG5cdFx0XHR0aHJvdyBuZXcgSW52YWxpZEFyZ3VtZW50RXhjZXB0aW9uJDE7XHJcblx0XHR9XHJcblxyXG5cdFx0aWYoY2xhc3NOYW1lID09ICcnKSB7XHJcblx0XHRcdGVsZW1lbnQuY2xhc3NOYW1lID0gJyc7XHJcblx0XHR9IGVsc2Uge1xyXG5cclxuXHRcdFx0bGV0IGNsYXNzTmFtZXMgPSBjbGFzc05hbWUuc3BsaXQoJyAnKTtcclxuXHJcblx0XHRcdGNsYXNzTmFtZXMuZm9yRWFjaChmdW5jdGlvbihuYW1lKSB7XHJcblx0XHRcdFx0ZWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKG5hbWUpO1xyXG5cdFx0XHR9KTtcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gZWxlbWVudDtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFJlbW92ZXMgYW4gZWxlbWVudCBmcm9tIHRoZSBET00uXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gSFRNTEVsZW1lbnRcclxuXHQgKiBAcmV0dXJuIHZvaWRcclxuXHQgKi9cclxuXHRzdGF0aWMgcmVtb3ZlKGVsZW1lbnQpXHJcblx0e1xyXG5cdFx0ZWxlbWVudC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKGVsZW1lbnQpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQWRkcyBzdHlsZSB0YWcgd2l0aCBnaXZlbiBpZCBhbmQgY3NzIHRvIHRoZSBET00uXHJcblx0ICogXHJcblx0ICogQHBhcmFtIHN0cmluZyB8IGlkXHJcblx0ICogQHBhcmFtIHN0cmluZyB8IGNzc1xyXG5cdCAqIEByZXR1cm4gdm9pZFxyXG5cdCAqL1xyXG5cdHN0YXRpYyBhZGRTdHlsZShpZCwgY3NzKVxyXG5cdHtcclxuXHRcdGlmICh0eXBlb2YgY3NzICE9ICdzdHJpbmcnKSB7XHJcblx0XHRcdHRocm93IG5ldyBJbnZhbGlkQXJndW1lbnRFeGNlcHRpb24kMTtcclxuXHRcdH1cclxuXHJcblx0XHRsZXQgaGVhZCA9IGRvY3VtZW50LmhlYWQgfHwgZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2hlYWQnKVswXTtcclxuXHRcdGxldCBzdHlsZVRhZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3N0eWxlJyk7XHJcblxyXG5cdFx0Ly8gcGlwZSBpdCB0aHJvdWdoIHRoZSBtaW5maWVyXHJcblx0ICAgIGxldCBDU1MgPSB0aGlzLm1pbmlmeUNzcyhjc3MpO1xyXG5cdCAgICAvLyBhZGRpbmcgaXQgdG8gdGhlIHN0eWxldGFnXHJcblx0ICAgIHN0eWxlVGFnLmlubmVySFRNTCA9IENTUztcclxuXHQgICAgLy8gZ2l2ZSBhbiBpZCB0byByZWNvZ25pemUgdGhlIHN0eWxlIHRhZ1xyXG5cdFx0c3R5bGVUYWcuc2V0QXR0cmlidXRlKCdpZCcsIGlkKTtcclxuXHRcdC8vIGFwcGVuZGluZyB0aGF0IHN0eWxlIHRhZyB0byB0aGUgRE9NIGhlYWQgdGFnXHJcblx0XHRoZWFkLmFwcGVuZENoaWxkKHN0eWxlVGFnKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEFkZHMgbGlua2VkIHN0eWxlIHRhZyB3aXRoIGdpdmVuIGlkIGFuZCBzcmMgdG8gdGhlIERPTS5cclxuXHQgKiBcclxuXHQgKiBAcGFyYW0gc3RyaW5nIHwgaWRcclxuXHQgKiBAcGFyYW0gc3RyaW5nIHwgc291cmNlXHJcblx0ICogQHJldHVybiB2b2lkXHJcblx0ICovXHJcblx0c3RhdGljIGFkZExpbmtlZFN0eWxlKGlkLCBzb3VyY2UpIFxyXG5cdHtcclxuXHRcdGlmICh0eXBlb2Ygc291cmNlICE9ICdzdHJpbmcnKSB7XHJcblx0XHRcdHRocm93IG5ldyBJbnZhbGlkQXJndW1lbnRFeGNlcHRpb24kMSgnRE9NLmFkZExpbmtlZFN0eWxlKCkgZXhjcGVjdHMgdGhlIHNlY29uZCBwYXJhbWV0ZXIgdG8gYmUgc3RyaW5nLCBidXQgJyArIHR5cGVvZiBzb3VyY2UgKyAnIHdhcyBwYXNzZWQgaW5zdGVhZC4nKTtcclxuXHRcdH1cclxuXHJcblx0XHRsZXQgaGVhZCA9IGRvY3VtZW50LmhlYWQgfHwgZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2hlYWQnKVswXTtcclxuXHRcdGxldCBsaW5rZWRTdHlsZVRhZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpbmsnKTtcclxuXHJcblx0ICAgIC8vIGdpdmUgYW4gaWQgdG8gcmVjb2duaXplIHRoZSBzdHlsZSB0YWdcclxuXHRcdGxpbmtlZFN0eWxlVGFnLnNldEF0dHJpYnV0ZSgnaWQnLCBpZCk7XHJcblx0XHRsaW5rZWRTdHlsZVRhZy5zZXRBdHRyaWJ1dGUoJ2hyZWYnLCBzb3VyY2UpO1xyXG5cdFx0bGlua2VkU3R5bGVUYWcuc2V0QXR0cmlidXRlKCdyZWwnLCAnc3R5bGVzaGVldCcpO1xyXG5cdFx0bGlua2VkU3R5bGVUYWcuc2V0QXR0cmlidXRlKCd0eXBlJywgJ3RleHQvY3NzJyk7XHJcblx0XHQvLyBhcHBlbmRpbmcgdGhhdCBzdHlsZSB0YWcgdG8gdGhlIERPTSBoZWFkIHRhZ1xyXG5cdFx0aGVhZC5hcHBlbmRDaGlsZChsaW5rZWRTdHlsZVRhZyk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBDcmVhdGVzIGFuIGVsZW1lbnQgd2l0aCB0aGUgZ2l2ZW4gb3B0aW9ucy5cclxuXHQgKiBcclxuXHQgKiBAcGFyYW0gc3RyaW5nIHwgZWxlbWVudFR5cGVcclxuXHQgKiBAcGFyYW0gb2JqZWN0IHwgb3B0aW9uc1xyXG5cdCAqIEByZXR1cm4gSFRNTEVsZW1lbnRcclxuXHQgKi9cclxuXHRzdGF0aWMgY3JlYXRlRWxlbWVudChlbGVtZW50VHlwZSwgb3B0aW9ucylcclxuXHR7XHJcblx0XHRsZXQgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoZWxlbWVudFR5cGUpO1xyXG5cdFxyXG5cdFx0aWYgKG9wdGlvbnMgPT09IHVuZGVmaW5lZCkge1xyXG5cdFx0XHRyZXR1cm4gZWxlbWVudDtcclxuXHRcdH1cclxuXHJcblx0XHRmb3IgKGxldCBvcHRpb24gaW4gb3B0aW9ucykge1xyXG5cdFx0XHRpZihvcHRpb24gPT0gJ3RleHQnKSB7XHJcblx0XHRcdFx0ZWxlbWVudC5pbm5lckhUTUwgPSBvcHRpb25zW29wdGlvbl07XHJcblx0XHRcdFx0Y29udGludWU7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGVsZW1lbnQuc2V0QXR0cmlidXRlKG9wdGlvbiwgb3B0aW9uc1tvcHRpb25dKTtcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gZWxlbWVudDtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFRvZ2dsZXMgdGhlIGdpdmVuIGNsYXNzZXMuXHJcblx0ICogXHJcblx0ICogQHBhcmFtIG9iamVjdCB8IGVsZW1lbnRcclxuXHQgKiBAcGFyYW0gc3RyaW5nIHwgY2xhc3NOYW1lXHJcblx0ICogQHJldHVybiBib29sXHJcblx0ICovXHJcblx0c3RhdGljIHRvZ2dsZUNsYXNzKGVsZW1lbnQsIGNsYXNzTmFtZSwgc2Vjb25kQ2xhc3NOYW1lKVxyXG5cdHtcclxuXHRcdGlmIChlbGVtZW50ID09IG51bGwgfHwgdHlwZW9mIGVsZW1lbnQgPT0gJ3VuZGVmaW5lZCcpIHtcclxuXHRcdFx0dGhyb3cgbmV3IEludmFsaWRBcmd1bWVudEV4Y2VwdGlvbiQxO1xyXG5cdFx0fVxyXG5cclxuXHRcdHNlY29uZENsYXNzTmFtZSA9IHNlY29uZENsYXNzTmFtZSB8fCB1bmRlZmluZWQ7XHJcblxyXG5cdFx0aWYoc2Vjb25kQ2xhc3NOYW1lKSB7XHJcblx0XHRcdGVsZW1lbnQuY2xhc3NMaXN0LnRvZ2dsZShzZWNvbmRDbGFzc05hbWUpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiBlbGVtZW50LmNsYXNzTGlzdC50b2dnbGUoY2xhc3NOYW1lKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEZpbmRzIGFuIGVsZW1lbnQgaW5zaWRlIG9mIHBhcmVudC5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSBzdHJpbmcgfCBzZWxlY3RvclxyXG5cdCAqIEBwYXJhbSBvYmplY3QgfCBjb250ZXh0XHJcblx0ICogQHJldHVybiBtaXhlZFxyXG5cdCAqL1xyXG5cdHN0YXRpYyBmaW5kKHNlbGVjdG9yLCBjb250ZXh0ID0gd2luZG93LmRvY3VtZW50KSBcclxuXHR7XHJcblx0XHRyZXR1cm4gcXVlcnlFbGVtZW50KHNlbGVjdG9yLCBjb250ZXh0KTtcclxuXHR9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBRdWVyaWVzIGFuIGVsZW1lbnQgZnJvbSB0aGUgRE9NLlxyXG4gKlxyXG4gKiBAcGFyYW0gc3RyaW5nIHwgc2VsZWN0b3JcclxuICogQHBhcmFtIG9iamVjdCB8IHBhcmVudEVsZW1lbnRcclxuICogQHJldHVybiBtaXhlZFxyXG4gKi9cclxuZnVuY3Rpb24gcXVlcnlFbGVtZW50KHNlbGVjdG9yLCBwYXJlbnRFbGVtZW50KSBcclxue1xyXG5cdGlmICh0eXBlb2Ygc2VsZWN0b3IgIT0gJ3N0cmluZycpIHtcclxuXHRcdHRocm93IG5ldyBJbnZhbGlkQXJndW1lbnRFeGNlcHRpb24kMSgncXVlcnlFbGVtZW50KCkgZXhwZWN0cyBmaXJzdCBwYXJhbWV0ZXIgdG8gYmUgYSBzdHJpbmcsIGJ1dCAnICsgdHlwZW9mIHNlbGVjdG9yICsgJyB3YXMgcGFzc2VkIGluc3RlYWQuJyk7XHJcblx0fVxyXG5cclxuXHRsZXQgZWxlbWVudCA9IHBhcmVudEVsZW1lbnQucXVlcnlTZWxlY3RvckFsbChzZWxlY3Rvcik7XHJcblxyXG5cdGlmIChlbGVtZW50Lmxlbmd0aCA9PSAwKSB7XHJcblx0XHRyZXR1cm4gbnVsbDtcclxuXHR9XHJcblxyXG5cdHJldHVybiAoZWxlbWVudC5sZW5ndGggPiAxKSA/IGVsZW1lbnQgOiBlbGVtZW50WzBdO1xyXG59XHJcblxyXG4vKipcclxuICogQ2hlY2tzIGlmIHBhcmVudCBoYXMgY2hpbGQuXHJcbiAqXHJcbiAqIEBwYXJhbSBvYmplY3QgfCBwYXJlbnRFbGVtZW50XHJcbiAqIEBwYXJhbSBvYmplY3QgfCBjaGlsZEVsZW1lbnRcclxuICogQHJldHVybiBib29sXHJcbiAqL1xyXG5mdW5jdGlvbiBoYXNDaGlsZChwYXJlbnRFbGVtZW50LCBjaGlsZEVsZW1lbnQpIFxyXG57XHJcbiAgICAgbGV0IG5vZGUgPSBjaGlsZEVsZW1lbnQucGFyZW50Tm9kZTtcclxuICAgICBcclxuICAgICB3aGlsZSAobm9kZSAhPSBudWxsKSB7XHJcbiAgICAgICAgIGlmIChub2RlID09IHBhcmVudEVsZW1lbnQpIHtcclxuICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICB9XHJcbiAgICAgICAgIG5vZGUgPSBub2RlLnBhcmVudE5vZGU7XHJcbiAgICAgfVxyXG4gICAgIFxyXG4gICAgIHJldHVybiBmYWxzZTtcclxufVxuXG4vKipcclxuICogQGZpbGUgXHJcbiAqIENvbW1vbiBjbGFzcy5cclxuICpcclxuICogQWRkcyBzb21lIHVzZWZ1bCBmdW5jdGlvbmFsaXR5IGZvclxyXG4gKiBjb21tb24gdGFza3MgLSBkYXRhIGNoZWNrcyBvciBkYXRhIG1hbmlwdWxhdGlvbi5cclxuICovXHJcblxyXG5jbGFzcyBDb21tb25cclxue1xyXG5cdC8qKlxyXG5cdCAqIEV4dGVuZCBhbiBvYmplY3QuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gb2JqZWN0IHwgY3VycmVudE9iamVjdFxyXG5cdCAqIEBwYXJhbSBvYmplY3QgfCBuZXdPYmplY3RcclxuXHQgKiBAcmV0dXJuIG9iamVjdFxyXG5cdCAqL1xyXG5cdHN0YXRpYyBleHRlbmQoY3VycmVudE9iamVjdCwgbmV3T2JqZWN0KSB7XHJcblx0XHR2YXIgZXh0ZW5kZWQgPSB7fTtcclxuXHQgICAgdmFyIHByb3A7XHJcblxyXG5cdCAgICBmb3IgKHByb3AgaW4gY3VycmVudE9iamVjdCkge1xyXG5cdCAgICAgICAgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChjdXJyZW50T2JqZWN0LCBwcm9wKSkge1xyXG5cdCAgICAgICAgICAgIGV4dGVuZGVkW3Byb3BdID0gY3VycmVudE9iamVjdFtwcm9wXTtcclxuXHQgICAgICAgIH1cclxuXHQgICAgfVxyXG5cclxuXHQgICAgZm9yIChwcm9wIGluIG5ld09iamVjdCkge1xyXG5cdCAgICAgICAgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChuZXdPYmplY3QsIHByb3ApKSB7XHJcblx0ICAgICAgICAgICAgZXh0ZW5kZWRbcHJvcF0gPSBuZXdPYmplY3RbcHJvcF07XHJcblx0ICAgICAgICB9XHJcblx0ICAgIH1cclxuXHJcblx0ICAgIHJldHVybiBleHRlbmRlZDtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIENoZWNrcyBmb3IgYSBuZWVkbGUgaW4gaHlzdGFjayBhcnJheS5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSBtaXhlZCB8IG5lZWRsZVxyXG5cdCAqIEBwYXJhbSBvYmplY3QgfCBvYmplY3RcclxuXHQgKiBAcmV0dXJuIGJvb2xcclxuXHQgKlxyXG5cdCAqL1xyXG5cdHN0YXRpYyBpbl9hcnJheShuZWVkbGUsIGh5c3RhY2spIHtcclxuXHRcdGlmKGh5c3RhY2suY29uc3RydWN0b3IgIT09IEFycmF5KSB7XHJcblx0XHRcdHRocm93IG5ldyBJbnZhbGlkQXJndW1lbnRFeGNlcHRpb24kMTtcclxuXHRcdH1cclxuXHJcblx0XHRmb3IodmFyIGkgPSAwOyBpIDw9IGh5c3RhY2subGVuZ3RoOyBpKyspIHtcclxuXHRcdFx0aWYobmVlZGxlID09IGh5c3RhY2tbaV0pIHtcclxuXHRcdFx0XHRyZXR1cm4gdHJ1ZTtcdFxyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0XHJcblx0XHRyZXR1cm4gZmFsc2U7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBUYWtlcyBhbiBhcnJheSBhbmQgY2h1bmtzIGl0LlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIGFycmF5IHwgdG90YWxcclxuXHQgKiBAcGFyYW0gbnVtYmVyIHwgY2h1bmtzXHJcblx0ICogQHJldHVybiBhcnJheVxyXG5cdCAqL1xyXG5cdHN0YXRpYyBhcnJheV9jaHVuayh0b3RhbCwgc2l6ZSA9IDUpXHJcblx0eyAgICAgICAgXHJcbiAgICAgIFx0aWYgKGlzTmFOKHNpemUpKSB7XHJcbiAgICAgIFx0XHR0aHJvdyBuZXcgSW52YWxpZEFyZ3VtZW50RXhjZXB0aW9uJDEoJ0NvbW1vbi5hcnJheV9jaHVuaygpIGV4cGVjdHMgdGhlIHNlY29uZCBwYXJhbWV0ZXIgdG8gYmUgYSBudW1iZXIsIGJ1dCAnICsgdHlwZW9mIHNpemUgKyAnIHBhc3NlZCBpbnN0ZWFkLicpXHJcbiAgICAgIFx0fVxyXG5cclxuICAgICAgXHRzaXplID0gcGFyc2VJbnQoc2l6ZSk7XHJcbiAgICAgICBcclxuICAgICAgIFx0bGV0IGk7XHJcbiAgICAgICBcdGxldCBjb2xsZWN0aW9uID0gW107XHJcblxyXG4gICAgICAgIC8vIGFkZCBlYWNoIGNodW5rIHRvIHRoZSByZXN1bHRcclxuICAgICAgICBmb3IgKGkgPSAwOyBpIDwgTWF0aC5jZWlsKHRvdGFsLmxlbmd0aCAvIHNpemUpOyBpKyspIHtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHZhciBzdGFydCA9IGkgKiBzaXplO1xyXG4gICAgICAgICAgICB2YXIgZW5kID0gc3RhcnQgKyBzaXplO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgY29sbGVjdGlvbi5wdXNoKHRvdGFsLnNsaWNlKHN0YXJ0LCBlbmQpKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIHJldHVybiBjb2xsZWN0aW9uO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQ2hlY2tzIGlmIGFuIG9iamVjdCBpcyBlbXB0eS5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSBvYmplY3QgfCBvYmplY3RcclxuXHQgKiBAcmV0dXJuIGJvb2xcclxuXHQgKi9cclxuXHRzdGF0aWMgZW1wdHlPYmplY3Qob2JqZWN0KSB7XHJcblx0XHRmb3IgKGxldCBwcm9wIGluIG9iamVjdCkge1xyXG5cdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIHRydWU7XHJcblx0fVxyXG5cclxuXHJcblx0LyoqXHJcblx0ICogQ2hlY2tzIGlmIGEgZ2l2ZW4gb2JqZWN0IGNvbnRhaW5lZCBpbiBhbiBhcnJheS5cclxuXHQgKiBcclxuXHQgKiBAcGFyYW0gb2JqZWN0IHwgb2JqZWN0XHJcblx0ICogQHBhcmFtIGFycmF5IHwgaGF5c3RhY2tcclxuXHQgKiBAcmV0dXJuIGJvb2xcclxuXHQgKi9cclxuXHRzdGF0aWMgY29udGFpbnNPYmplY3Qob2JqZWN0LCBoeXN0YWNrKSBcclxuXHR7XHJcblx0ICAgIGxldCBpO1xyXG5cclxuXHQgICAgZm9yIChpID0gMDsgaSA8IGh5c3RhY2subGVuZ3RoOyBpKyspIHtcclxuXHQgICAgICAgIGlmICh0eXBlb2Ygb2JqZWN0ID09ICdzdHJpbmcnICYmIGh5c3RhY2tbaV0uY29uc3RydWN0b3IubmFtZSA9PT0gb2JqZWN0KSB7XHJcblx0ICAgICAgICBcdHJldHVybiB0cnVlO1xyXG5cdCAgICAgICAgfVxyXG5cclxuXHQgICAgICAgIGlmIChoeXN0YWNrW2ldID09PSBvYmplY3QpIHtcclxuXHQgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuXHQgICAgICAgIH1cclxuXHQgICAgfVxyXG5cclxuXHQgICAgcmV0dXJuIGZhbHNlO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQ2hlY2tzIGlmIGEgZ2l2ZW4gcGFyYW1ldGVyIGlzIGFuIG9iamVjdC5cclxuXHQgKiBcclxuXHQgKiBAcGFyYW0gb2JqZWN0IHwgb2JqZWN0XHJcblx0ICogQHJldHVybiBib29sXHJcblx0ICovXHJcblx0c3RhdGljIGlzT2JqZWN0KG9iamVjdCkgXHJcblx0e1xyXG5cdFx0cmV0dXJuIHR5cGVvZiBvYmplY3QgPT0gJ29iamVjdCc7XHJcblx0fVxyXG59XG5cbmxldCBkZWZhdWx0TWVzc2FnZSQxID0gJ1RoZSBkYXRhIHN0cnVjdHVyZSBpcyBpbnZhbGlkJztcclxuXHJcbmNsYXNzIEludmFsaWREYXRhU3RydWN0dXJlRXhjZXB0aW9uIGV4dGVuZHMgRXhjZXB0aW9uSGFuZGxlclxyXG57XHJcblx0Y29uc3RydWN0b3IobWVzc2FnZSA9IG51bGwpIFxyXG5cdHtcclxuXHRcdG1lc3NhZ2UgPSBtZXNzYWdlIHx8IGRlZmF1bHRNZXNzYWdlJDE7XHJcblx0XHRzdXBlcihtZXNzYWdlKTtcclxuICAgIFx0c3VwZXIuc3RhY2tUcmFjZSh0aGlzLCBtZXNzYWdlKTtcclxuICAgIH1cclxufVxuXG4vKipcclxuICogQGZpbGUgXHJcbiAqIFJlcXVlc3QgY2xhc3MuXHJcbiAqXHJcbiAqIEhhbmRsZXMgYWpheCByZXF1ZXN0cyBQT1NULCBHRVQgZXRjLi4uXHJcbiAqL1xyXG5cclxuLyoqXHJcbiAqIFN0b3JlcyB0aGUgZGVmYXVsdCBzZXR0aW5ncy5cclxuICpcclxuICogQHZhciBvYmplY3RcclxuICovXHJcblxyXG5sZXQgZGVmYXVsdFNldHRpbmdzID0ge1xyXG5cdGhlYWRlcnM6IHtcclxuXHRcdCdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbidcclxuXHR9LFxyXG5cdGFzeW5jOiB0cnVlXHJcbn07XHJcblxyXG5jbGFzcyBSZXF1ZXN0XHJcbntcclxuXHQvKipcclxuXHQgKiAtIEluaXRpYWxpemUgdGhlIHNldHRpbmdzIG9iamVjdC5cclxuXHQgKiAtIEluaXRpYWxpemUgdGhlIHhociBvYmplY3QuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gb2JqZWN0IHwgc2V0dGluZ3NcclxuXHQgKiBAcmV0dXJuIHZvaWRcclxuXHQgKi9cclxuXHRjb25zdHJ1Y3RvcihzZXR0aW5ncylcclxuXHR7XHJcblx0XHR0aGlzLnNldHRpbmdzID0gQ29tbW9uLmV4dGVuZChkZWZhdWx0U2V0dGluZ3MsIHNldHRpbmdzKTtcclxuXHRcdHRoaXMuc2V0RGVmYXVsdFJlcXVlc3RIZWFkZXIoKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFNldHMgdGhlIGRlZmF1bHQgcmVxdWVzdCBoZWFkZXJzLlxyXG5cdCAqXHJcblx0ICogQHJldHVybiB2b2lkXHJcblx0ICovXHJcblx0c2V0RGVmYXVsdFJlcXVlc3RIZWFkZXIoKVxyXG5cdHtcclxuXHRcdGxldCBoZWFkZXI7XHJcblx0XHRsZXQgaGVhZGVycyA9IHRoaXMuc2V0dGluZ3MuaGVhZGVycztcclxuXHRcdGxldCBhc3luYyA9IHRoaXMuc2V0dGluZ3MuYXN5bmM7XHJcblx0XHRsZXQgb3BlbiA9IFhNTEh0dHBSZXF1ZXN0LnByb3RvdHlwZS5vcGVuO1xyXG5cdFx0bGV0IHNldFJlcXVlc3RIZWFkZXIgPSBYTUxIdHRwUmVxdWVzdC5wcm90b3R5cGUuc2V0UmVxdWVzdEhlYWRlcjtcclxuXHJcblx0XHRYTUxIdHRwUmVxdWVzdC5wcm90b3R5cGUub3BlbiA9IGZ1bmN0aW9uKCkge1xyXG5cdFx0XHR2YXIgcmVzcG9uc2UgPSBvcGVuLmFwcGx5KHRoaXMsIGFyZ3VtZW50cywgYXN5bmMpO1xyXG5cclxuXHRcdFx0Zm9yIChoZWFkZXIgaW4gaGVhZGVycykge1xyXG5cdFx0XHRcdHRoaXMuc2V0UmVxdWVzdEhlYWRlcihoZWFkZXIsIGhlYWRlcnNbaGVhZGVyXSk7XHJcblx0XHRcdH1cclxuXHJcblx0ICBcdFx0cmV0dXJuIHJlc3BvbnNlO1xyXG5cdFx0fTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIE1ha2VzIGEgUE9TVCByZXF1ZXN0LlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIG9iamVjdCB8IG9wdGlvbnNcclxuXHQgKiBAcmV0dXJuIFByb21pc2VcclxuXHQgKi9cclxuXHRwb3N0KG9wdGlvbnMpXHJcblx0e1xyXG5cdFx0bGV0IHhociA9IHRoaXMueGhyO1xyXG5cclxuXHRcdGlmKG9wdGlvbnMuaGFzT3duUHJvcGVydHkoJ2JlZm9yZScpICYmIHR5cGVvZiBvcHRpb25zLmJlZm9yZSA9PSAnZnVuY3Rpb24nKSB7XHJcblx0XHRcdG9wdGlvbnMuYmVmb3JlLmNhbGwodGhpcyk7XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xyXG5cdFx0XHRpZih0eXBlb2Ygb3B0aW9ucyAhPT0gJ29iamVjdCcpIHtcclxuXHRcdFx0XHR0aHJvdyBuZXcgRXJyb3IoJ2dldCBleHBlY3RpbmcgYSBqc29uIG9iamVjdCB0byBiZSBwYXNzZWQgYXMgYW4gYXJndW1lbnQsIGJ1dCAnKyB0eXBlb2Ygb3B0aW9ucyArICcgd2FzIHBhc3NlZC4nKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0b3B0aW9ucy5kYXRhID0gb3B0aW9ucy5kYXRhIHx8IHt9O1xyXG5cclxuXHRcdFx0aWYodHlwZW9mIG9wdGlvbnMuZGF0YSAhPT0gJ29iamVjdCcpIHtcclxuXHRcdFx0XHR0aHJvdyBuZXcgRXJyb3IoJ2RhdGEgcHJvcGVydHkgZXhwZWN0aW5nIGEganNvbiBvYmplY3QgdG8gYmUgcGFzc2VkIGFzIGFuIGFyZ3VtZW50LCBidXQgJyArIHR5cGVvZiBvcHRpb25zLmRhdGEgKyAnIHdhcyBwYXNzZWQuJyk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHhoci5vcGVuKCdQT1NUJywgb3B0aW9ucy51cmwsIHRydWUpO1xyXG5cclxuXHRcdFx0eGhyLnJlc3BvbnNlVHlwZSA9IG9wdGlvbnMuZGF0YVR5cGUgfHwgJ2pzb24nO1xyXG5cdFx0XHR4aHIudGltZW91dCA9IG9wdGlvbnMudGltZW91dCB8fCAzMDAwO1xyXG5cclxuXHRcdFx0eGhyLm9ucmVhZHlzdGF0ZWNoYW5nZSA9IGZ1bmN0aW9uKCkge1xyXG5cdFx0XHQgICAgaWYodGhpcy5yZWFkeVN0YXRlICE9IDQgfHwgdGhpcy5zdGF0dXMgIT0gMjAwKSB7XHJcblx0XHRcdCAgICBcdHJldHVybjtcclxuXHRcdFx0ICAgIH1cclxuXHQgICAgICAgXHRcclxuICAgICAgIFx0XHRcdHJlc29sdmUodGhpcy5yZXNwb25zZSk7XHJcbiAgICAgICBcdFx0XHRcclxuICAgICAgIFx0XHRcdGlmKG9wdGlvbnMuaGFzT3duUHJvcGVydHkoJ2FmdGVyJykgJiYgdHlwZW9mIG9wdGlvbnMuYWZ0ZXIgPT0gJ2Z1bmN0aW9uJykge1xyXG5cdFx0XHRcdFx0b3B0aW9ucy5hZnRlci5jYWxsKHRoaXMpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fTtcclxuXHJcblx0XHRcdHhoci5vbmVycm9yID0gZnVuY3Rpb24obWVzc2FnZSkge1xyXG5cdFx0XHRcdGlmKG9wdGlvbnMuaGFzT3duUHJvcGVydHkoJ2Vycm9yJykgJiYgdHlwZW9mIG9wdGlvbnMuZXJyb3IgPT0gJ2Z1bmN0aW9uJykge1xyXG5cdFx0XHRcdFx0b3B0aW9ucy5lcnJvcihtZXNzYWdlKTtcclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdHJlamVjdChtZXNzYWdlKTtcclxuXHRcdFx0fTtcclxuXHJcblx0XHRcdGlmKCEgb3B0aW9ucy5kYXRhKSB7XHJcblx0XHRcdFx0eGhyLnNlbmQobnVsbCk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHZhciBxdWVyeVN0cmluZyA9IE9iamVjdC5rZXlzKG9wdGlvbnMuZGF0YSkubWFwKGZ1bmN0aW9uKGtleSkge1xyXG5cdFx0ICAgICAgICAgICAgcmV0dXJuIGVuY29kZVVSSUNvbXBvbmVudChrZXkpICsgJz0nICtcclxuXHRcdCAgICAgICAgICAgICAgICBcdGVuY29kZVVSSUNvbXBvbmVudChvcHRpb25zLmRhdGFba2V5XSk7XHJcblx0XHQgICAgICAgIFx0fSkuam9pbignJicpO1xyXG5cclxuXHRcdFx0eGhyLnNlbmQocXVlcnlTdHJpbmcpO1xyXG5cdFx0fSk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBNYWtlcyBhIEdFVCBhamF4IHJlcXVlc3QuXHJcblx0ICogXHJcblx0ICogQHBhcmFtIG9iamVjdCB8IG9wdGlvbnNcclxuXHQgKiBAcmV0dXJuIFByb21pc2VcclxuXHQgKi9cclxuXHRnZXQob3B0aW9ucylcclxuXHR7XHJcblx0XHRsZXQgeGhyID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCkgfHwgbmV3IEFjdGl2ZVhPYmplY3QoXCJNaWNyb3NvZnQuWE1MSFRUUFwiKTtcdFx0XHRcclxuXHJcblx0XHRpZihvcHRpb25zLmhhc093blByb3BlcnR5KCdiZWZvcmUnKSAmJiB0eXBlb2Ygb3B0aW9ucy5iZWZvcmUgPT0gJ2Z1bmN0aW9uJykge1xyXG5cdFx0XHRvcHRpb25zLmJlZm9yZS5jYWxsKHRoaXMpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcclxuXHRcdFx0aWYodHlwZW9mIG9wdGlvbnMgIT09ICdvYmplY3QnKSB7XHJcblx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKCdnZXQgZXhwZWN0aW5nIGEganNvbiBvYmplY3QgdG8gYmUgcGFzc2VkIGFzIGFuIGFyZ3VtZW50LCBidXQgJysgdHlwZW9mIG9wdGlvbnMgKyAnIHdhcyBwYXNzZWQuJyk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdG9wdGlvbnMuZGF0YSA9IG9wdGlvbnMuZGF0YSB8fCB7fTtcclxuXHJcblx0XHRcdGlmKHR5cGVvZiBvcHRpb25zLmRhdGEgIT09ICdvYmplY3QnKSB7XHJcblx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKCdkYXRhIHByb3BlcnR5IGV4cGVjdGluZyBhIGpzb24gb2JqZWN0IHRvIGJlIHBhc3NlZCBhcyBhbiBhcmd1bWVudCwgYnV0ICcgKyB0eXBlb2Ygb3B0aW9ucy5kYXRhICsgJyB3YXMgcGFzc2VkLicpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHR4aHIub3BlbignR0VUJywgb3B0aW9ucy51cmwsIHRydWUpO1xyXG5cclxuXHRcdFx0eGhyLnJlc3BvbnNlVHlwZSA9IG9wdGlvbnMuZGF0YVR5cGUgfHwgJ2pzb24nO1xyXG5cdFx0XHR4aHIudGltZW91dCA9IG9wdGlvbnMudGltZW91dCB8fCAzMDAwO1xyXG5cclxuXHRcdFx0aWYgKHhoci5yZXNwb25zZVR5cGUgPT0gJ2pzb24nKSB7XHJcblx0XHRcdFx0eGhyLnNldFJlcXVlc3RIZWFkZXIoJ0NvbnRlbnQtVHlwZScsICdhcHBsaWNhdGlvbi9qc29uJyk7XHJcblx0XHRcdFx0eGhyLnNldFJlcXVlc3RIZWFkZXIoJ0FjY2VwdCcsICdhcHBsaWNhdGlvbi9qc29uJyk7XHJcblx0XHRcdH1cclxuXHRcdFx0XHJcblx0XHRcdHhoci5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBmdW5jdGlvbigpIHtcclxuXHRcdFx0ICAgIGlmKHRoaXMucmVhZHlTdGF0ZSAhPSA0IHx8IHRoaXMuc3RhdHVzICE9IDIwMCkge1xyXG5cdFx0XHQgICAgXHRyZXR1cm47XHJcblx0XHRcdCAgICB9XHJcblxyXG5cdFx0XHQgICAgbGV0IHJlc3BvbnNlID0gdGhpcy5yZXNwb25zZSB8fCB0aGlzLnJlc3BvbnNlVGV4dDsgXHJcblx0XHRcdCAgICByZXNwb25zZSA9ICh4aHIucmVzcG9uc2VUeXBlID09ICdqc29uJyAmJiB0eXBlb2YgcmVzcG9uc2UgIT0gJ29iamVjdCcpID8gSlNPTi5wYXJzZShyZXNwb25zZSkgOiByZXNwb25zZTtcclxuXHRcdFx0ICAgIHJlc29sdmUocmVzcG9uc2UpO1x0XHJcbiAgICAgICBcdFx0XHRcclxuICAgICAgIFx0XHRcdGlmKG9wdGlvbnMuaGFzT3duUHJvcGVydHkoJ2FmdGVyJykgJiYgdHlwZW9mIG9wdGlvbnMuYWZ0ZXIgPT0gJ2Z1bmN0aW9uJykge1xyXG5cdFx0XHRcdFx0b3B0aW9ucy5hZnRlci5jYWxsKHRoaXMpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fTtcclxuXHJcblx0XHRcdHhoci5vbmVycm9yID0gZnVuY3Rpb24obWVzc2FnZSkge1xyXG5cdFx0XHRcdGlmKG9wdGlvbnMuaGFzT3duUHJvcGVydHkoJ2Vycm9yJykgJiYgdHlwZW9mIG9wdGlvbnMuZXJyb3IgPT0gJ2Z1bmN0aW9uJykge1xyXG5cdFx0XHRcdFx0b3B0aW9ucy5lcnJvcihtZXNzYWdlKTtcclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdHJlamVjdChtZXNzYWdlKTtcclxuXHRcdFx0fTtcclxuXHJcblx0XHRcdGlmKCEgb3B0aW9ucy5kYXRhKSB7XHJcblx0XHRcdFx0eGhyLnNlbmQobnVsbCk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHZhciBxdWVyeVN0cmluZyA9IE9iamVjdC5rZXlzKG9wdGlvbnMuZGF0YSkubWFwKGZ1bmN0aW9uKGtleSkge1xyXG5cdFx0ICAgICAgICAgICAgcmV0dXJuIGVuY29kZVVSSUNvbXBvbmVudChrZXkpICsgJz0nICtcclxuXHRcdCAgICAgICAgICAgICAgICBcdGVuY29kZVVSSUNvbXBvbmVudChvcHRpb25zLmRhdGFba2V5XSk7XHJcblx0XHQgICAgICAgIFx0fSkuam9pbignJicpO1xyXG5cclxuXHRcdFx0eGhyLnNlbmQocXVlcnlTdHJpbmcpO1xyXG5cdFx0fSk7XHJcblx0fVxyXG59XG5cbmxldCBkZWZhdWx0TWVzc2FnZSQyID0gJ1RyeWluZyB0byBiaW5kIGFuIGFscmVhZHkgZXhpc3RpbmcgYm91bmQuJztcclxuXHJcbmNsYXNzIEludmFsaWRCaW5kaW5nRXhjZXB0aW9uIGV4dGVuZHMgRXhjZXB0aW9uSGFuZGxlclxyXG57XHJcblx0Y29uc3RydWN0b3IobWVzc2FnZSA9IG51bGwpIFxyXG5cdHtcclxuXHRcdG1lc3NhZ2UgPSBtZXNzYWdlIHx8IGRlZmF1bHRNZXNzYWdlJDI7XHJcblx0XHRzdXBlcihtZXNzYWdlKTtcclxuICAgIFx0c3VwZXIuc3RhY2tUcmFjZSh0aGlzLCBtZXNzYWdlKTtcclxuICAgIH1cclxufVxuXG4vLyBIZWxwZXJzXHJcbi8vIEV4Y2VwdGlvbnNcclxuLyoqXHJcbiAqIEBmaWxlIFxyXG4gKiBDb250YWluZXIgY2xhc3MuXHJcbiAqXHJcbiAqIEhhbmRsZXMvQ29udHJvbHMgdGhlIGRlcGVuZGVuY2llcyBvZiBlY29tbWVyY2UuXHJcbiAqL1xyXG5cclxuLyoqXHJcbiAqIFN0b3JlcyB0aGUgaW5zdGFuY2VzXHJcbiAqXHJcbiAqIEB2YXIgYXJyYXlcclxuICovXHJcbmxldCBpbnN0YW5jZXMgPSBbXTtcclxuXHJcbmNsYXNzIENvbnRhaW5lciBcclxue1xyXG5cdC8qKlxyXG5cdCAqIEJpbmRzIGtleSB0byBjb25jcmV0ZSBjbGFzcy5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSBzdHJpbmcgfCBrZXlcclxuXHQgKiBAcGFyYW0gY2xhc3MgfCBjb25jcmV0ZVxyXG5cdCAqIEByZXR1cm4gdm9pZFxyXG5cdCAqL1xyXG5cdGJpbmQoa2V5LCBjb25jcmV0ZSkgXHJcblx0e1xyXG5cdFx0aWYgKHR5cGVvZiBrZXkgIT0gJ3N0cmluZycpIHtcclxuXHRcdFx0dGhyb3cgbmV3IEludmFsaWRBcmd1bWVudEV4Y2VwdGlvbiQxKCdiaW5kKCkgZXhwZWN0cyB0aGUgZmlyc3QgcGFyYW1ldGVyIHRvIGJlIHN0cmluZywgYnV0ICcgKyB0eXBlb2Yga2V5ICsgJyB3YXMgcGFzc2VkIGluc3RlYWQuJyk7XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKHR5cGVvZiBjb25jcmV0ZSAhPSAnZnVuY3Rpb24nKSB7IFxyXG5cdFx0XHR0aHJvdyBuZXcgSW52YWxpZEFyZ3VtZW50RXhjZXB0aW9uJDEoJ2JpbmQoKSBleHBlY3RzIHRoZSBzZWNvbmQgcGFyYW1ldGVyIHRvIGJlIGEgZnVuY3Rpb24sIGJ1dCAnICsgdHlwZW9mIGNvbmNyZXRlICsgJyB3YXMgcGFzc2VkIGluc3RlYWQuJyk7XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKHR5cGVvZiB0aGlzW2tleV0gIT0gJ3VuZGVmaW5lZCcpIHtcclxuXHRcdFx0dGhyb3cgbmV3IEludmFsaWRCaW5kaW5nRXhjZXB0aW9uKCdiaW5kKCkgcmVjaWV2ZWQgYW4gYWxyZWFkeSBleGlzdGluZyBiaW5kLicpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHRoaXNba2V5XSA9IGNvbmNyZXRlLmJpbmQoY29uY3JldGUsIHRoaXMpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogU2V0cyBhbiBpbnN0YW5jZS5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSBzdHJpbmcgfCBrZXlcclxuXHQgKiBAcGFyYW0gb2JqZWN0IHwgaW5zdGFuY2VcclxuXHQgKiBAcGFyYW0gc3RyaW5nIHwgYWxpYXNcclxuXHQgKiBAcmV0dXJuIHZvaWRcclxuXHQgKi9cclxuXHRzZXRJbnN0YW5jZShrZXksIGluc3RhbmNlLCBhbGlhcyA9IG51bGwpIFxyXG5cdHtcclxuXHRcdGlmICh0eXBlb2Yga2V5ICE9ICdzdHJpbmcnKSB7XHJcblx0XHRcdHRocm93IG5ldyBJbnZhbGlkQXJndW1lbnRFeGNlcHRpb24kMSgnc2V0SW5zdGFjZSgpIGV4cGVjdHMgdGhlIGZpcnN0IHBhcmFtZXRlciB0byBiZSBhIHN0cmluZywgYnV0ICcgKyB0eXBlb2Yga2V5ICsgJyB3YXMgcGFzc2VkIGluc3RlYWQuJyk7XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKHR5cGVvZiBpbnN0YW5jZSAhPSAnb2JqZWN0Jykge1xyXG5cdFx0XHR0aHJvdyBuZXcgSW52YWxpZEFyZ3VtZW50RXhjZXB0aW9uJDEoJ3NldEluc3RhbmNlKCkgZXhwZWN0cyB0aGUgc2Vjb25kIHBhcmFtZXRlciB0byBiZSBhbiBvYmplY3QsIGJ1dCAnICsgdHlwZW9mIGluc3RhbmNlICsgJyB3YXMgcGFzc2VkIGluc3RlYWQuJyk7XHJcblx0XHR9XHJcblxyXG5cdFx0aW5zdGFuY2VzW2tleV0gPSBpbnN0YW5jZTtcclxuXHRcdHRoaXNba2V5XSA9IGluc3RhbmNlO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogUmVzb2x2ZXMgYW4gaW5zdGFuY2Ugb3V0IG9mIFxyXG5cdCAqIHRoZSBpb2MgY29udGFpbmVyLlxyXG5cdCAqIFxyXG5cdCAqIEBwYXJhbSBzdHJpbmcgfCBrZXlcclxuXHQgKiBAcmV0dXJuIG9iamVjdFxyXG5cdCAqL1xyXG5cdGdldEluc3RhbmNlKGtleSkgXHJcblx0e1xyXG5cdFx0aWYodHlwZW9mIGtleSAhPSAnc3RyaW5nJykge1xyXG5cdFx0XHR0aHJvdyBuZXcgSW52YWxpZEFyZ3VtZW50RXhjZXB0aW9uJDEoJ2dldEluc3RhY2UoKSBleHBlY3RzIHRoZSBmaXJzdCBwYXJhbWV0ZXIgdG8gYmUgYSBzdHJpbmcsIGJ1dCAnICsgdHlwZW9mIGtleSArICcgd2FzIHBhc3NlZCBpbnN0ZWFkLicpO1xyXG5cdFx0fVxyXG5cclxuXHRcdGlmKHR5cGVvZiBrZXkgPT0gJ29iamVjdCcpIHtcclxuXHRcdFx0cmV0dXJuIGluc3RhbmNlc1trZXkuY29uc3RydWN0b3IubmFtZV0gfHwgbnVsbDtcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gaW5zdGFuY2VzW2tleV0gfHwgbnVsbDtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIENoZWNrcyBpZiBhbiBpbnN0YW5jZSBleGlzdC5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSBtaXhlZCB8IGluc3RhbmNlXHJcblx0ICogQHJldHVybiBib29sXHJcblx0ICovXHJcblx0aW5zdGFuY2VFeGlzdChpbnN0YW5jZSkgXHJcblx0e1xyXG5cdFx0aWYgKHR5cGVvZiBpbnN0YW5jZSA9PSAnb2JqZWN0Jykge1xyXG5cdFx0XHRyZXR1cm4gKHR5cGVvZiBpbnN0YW5jZXNbaW5zdGFuY2UuY29uc3RydWN0b3IubmFtZV0gIT09ICd1bmRlZmluZWQnKTtcclxuXHRcdH0gZWxzZSBpZiAodHlwZW9mIGluc3RhbmNlID09ICdzdHJpbmcnKSB7XHJcblx0XHRcdHJldHVybiAodHlwZW9mIGluc3RhbmNlc1tpbnN0YW5jZV0gIT09ICd1bmRlZmluZWQnKVxyXG5cdFx0fVxyXG5cdFx0XHJcblx0XHR0aHJvdyBuZXcgSW52YWxpZEFyZ3VtZW50RXhjZXB0aW9uJDEoJ2luc3RhbmNlRXhpc3QoKSBleHBlY3RzIHRoZSBmaXJzdCBwYXJhbWV0ZXIgdG8gYmUgc3RyaW5nIG9yIGFuIG9iamVjdCwgYnV0ICcgKyB0eXBlb2YgaW5zdGFuY2UgKyAnIHdhcyBwYXNzZWQgaW5zdGVhZC4nKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFJldHJpZXZlIGFuIG9iamVjdCwgaWYgbm90IGV4aXN0c1xyXG5cdCAqIHdpbGwgY3JlYXRlIGl0LCBzZXQgaXQgaW4gdGhlIGlvYyBjb250YWluZXJcclxuXHQgKiBmb3IgbGF0ZXIgdXNlIGFuZCByZXRyaWV2ZSBpdC5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSBtaXhlZCB8IG9iamVjdCBcclxuXHQgKiBAcmV0dXJuIG9iamVjdFxyXG5cdCAqL1xyXG5cdG1ha2Uob2JqZWN0KVxyXG5cdHtcclxuXHRcdGxldCBpbnN0YW5jZSA9IHt9O1xyXG5cdFx0bGV0IGtleTtcclxuXHRcdFxyXG5cdFx0aWYgKHRoaXMuaW5zdGFuY2VFeGlzdChvYmplY3QpKSB7XHJcblx0XHRcdHJldHVybiB0aGlzLmdldEluc3RhbmNlKG9iamVjdCk7XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKHR5cGVvZiBvYmplY3QgPT0gJ29iamVjdCcpIHtcclxuXHRcdFx0aW5zdGFuY2UgPSBvYmplY3Q7XHJcblx0XHRcdGtleSA9IG9iamVjdC5jb25zdHJ1Y3Rvci5uYW1lO1xyXG5cdFx0XHR0aGlzLnNldEluc3RhbmNlKGtleSwgaW5zdGFuY2UpOyBcclxuXHRcdH0gZWxzZSBpZih0eXBlb2Ygb2JqZWN0ID09ICdzdHJpbmcnICYmIHRoaXMuaGFzT3duUHJvcGVydHkob2JqZWN0KSkge1xyXG5cdFx0XHRpbnN0YW5jZSA9IG5ldyB0aGlzW29iamVjdF07XHJcblx0XHRcdGtleSA9IG9iamVjdDtcclxuXHRcdFx0dGhpcy5zZXRJbnN0YW5jZShrZXksIGluc3RhbmNlKTtcdFxyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0dGhyb3cgbmV3IEludmFsaWRCaW5kaW5nRXhjZXB0aW9uKCdUaGUgcGFyYW1ldGVyIHlvdSBwYXNzZWQgY291bGQgbm90IGJlIGJvdW5kZWQgdG8gdGhlIGNvbnRhaW5lciwgcGFyYW1ldGVyOiAnICsgdHlwZW9mIG9iamVjdCk7XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIGluc3RhbmNlO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogUmVtb3ZlIGFsbCBleGlzdGluZyBpbnN0YW5jZXMuXHJcblx0ICpcclxuXHQgKiBAcmV0dXJuIHZvaWQgXHJcblx0ICovXHJcblx0Zmx1c2goKVxyXG5cdHtcclxuXHRcdGluc3RhbmNlcyA9IFtdO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogUmV0cmlldmUgYWxsIGluc3RhbmNlcy5cclxuXHQgKlxyXG5cdCAqIEByZXR1cm4gYXJyYXlcclxuXHQgKi9cclxuXHRpbnN0YW5jZXMoKSBcclxuXHR7XHJcblx0XHRyZXR1cm4gaW5zdGFuY2VzO1xyXG5cdH1cclxufVxuXG5sZXQgZGVmYXVsdE1lc3NhZ2UkMyA9ICdUaGUgZXZlbnQgeW91IGNhbGxlZCBkb2VzIG5vdCBleGlzdHMgb3IgeW91IHN1cHBsaWVkIHdyb25nIGFyZ3VtZW50JztcclxuXHJcbmNsYXNzIEJhZEV2ZW50Q2FsbEV4Y2VwdGlvbiBleHRlbmRzIEV4Y2VwdGlvbkhhbmRsZXJcclxue1xyXG5cdGNvbnN0cnVjdG9yKG1lc3NhZ2UgPSBudWxsKSBcclxuXHR7XHJcblx0XHRtZXNzYWdlID0gbWVzc2FnZSB8fCBkZWZhdWx0TWVzc2FnZSQzO1xyXG5cdFx0c3VwZXIobWVzc2FnZSk7XHJcbiAgICBcdHN1cGVyLnN0YWNrVHJhY2UodGhpcywgbWVzc2FnZSk7XHJcbiAgICB9XHJcbn1cblxuLyoqXHJcbiAqIEBmaWxlIFxyXG4gKiBFdmVudE1hbmFnZXIgY2xhc3MuXHJcbiAqXHJcbiAqIEhhbmRsZXMgc3Vic2NyaXBpb25zIGFuZCBwdWJsaXNoaW5nIG9mIGV2ZW50cy5cclxuICovXHJcblxyXG5jbGFzcyBFdmVudE1hbmFnZXJcclxue1xyXG5cdC8qKlxyXG5cdCAqIFN0b3JlcyB0aGUgZXZlbnRzIGNhbGxiYWNrcy5cclxuXHQgKiBcclxuXHQgKiBAdmFyIGFycmF5XHJcblx0ICovXHJcblx0Y29uc3RydWN0b3IoKVxyXG5cdHtcclxuXHRcdHRoaXMuZXZlbnRzID0ge307XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBTdWJzY3JpYmluZyB0byBhbiBldmVudC5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSBzdHJpbmcgfCBuYW1lXHJcblx0ICogQHBhcmFtIGZ1bmN0aW9uIHwgY2FsbGJhY2tcclxuXHQgKiBAcmV0dXJuIHZvaWRcclxuXHQgKi9cclxuXHRzdWJzY3JpYmUobmFtZSwgY2FsbGJhY2spIFxyXG5cdHtcclxuXHRcdGlmICh0eXBlb2YgY2FsbGJhY2sgIT09ICdmdW5jdGlvbicpIHtcclxuXHRcdFx0dGhyb3cgbmV3IEludmFsaWRBcmd1bWVudEV4Y2VwdGlvbjtcclxuXHRcdH1cclxuXHJcblx0XHRpZiAodHlwZW9mIHRoaXMuZXZlbnRzW25hbWVdID09ICd1bmRlZmluZWQnKSB7XHJcblx0XHRcdHRoaXMuZXZlbnRzW25hbWVdID0gW107XHJcblx0XHR9XHJcblxyXG5cdFx0dGhpcy5ldmVudHNbbmFtZV0ucHVzaChjYWxsYmFjayk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBQdWJsaXNoIGFuIGV2ZW50IHRvIGFsbCBzdWJzY3JpYmVycy5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSBzdHJpbmcgfCBuYW1lXHJcblx0ICogQHBhcmFtIGxpc3QgfCBkYXRhXHJcblx0ICogQHJldHVybiB2b2lkXHJcblx0ICovXHJcblx0cHVibGlzaChuYW1lLCAuLi5kYXRhKSBcclxuXHR7XHJcblx0XHRkYXRhID0gZGF0YSB8fCBudWxsO1xyXG5cclxuXHRcdC8vIElmIHRoZXJlIGFyZSBubyBzdWJzY3JpYmVycyBzaW1wbHkgaWdub3JlIHRoYXQgZXZlbnQuXHJcblx0XHRpZiAodHlwZW9mIHRoaXMuZXZlbnRzW25hbWVdID09ICd1bmRlZmluZWQnKSB7XHJcblx0XHRcdHJldHVybjtcclxuXHRcdH1cclxuXHJcblx0XHR0aGlzLmV2ZW50c1tuYW1lXS5mb3JFYWNoKGZ1bmN0aW9uKGNhbGxiYWNrKSB7XHJcblx0XHRcdGlmKHR5cGVvZiBjYWxsYmFjayAhPSAnZnVuY3Rpb24nKSB7XHJcblx0XHRcdFx0dGhyb3cgbmV3IEludmFsaWRBcmd1bWVudEV4Y2VwdGlvbignc3Vic2NyaWJlKCkgc2hvdWxkIHJlY2lldmUgY2FsbGJhY2sgYXMgc2Vjb25kIHBhcmFtZXRlciwgYnV0ICcrIHR5cGVvZiBjYWxsYmFjayArJyB3YXMgcGFzc2VkJyk7XHJcblx0XHRcdH1cclxuXHRcdFx0XHJcblx0XHRcdHJldHVybiBjYWxsYmFjayguLi5kYXRhKTtcclxuXHRcdH0pO1xyXG5cdH1cclxufVxuXG4vKipcclxuICogQGZpbGUgXHJcbiAqIENvb2tpZSBjbGFzcy5cclxuICpcclxuICogQWRkcyBzb21lIHVzZWZ1bCBmdW5jdGlvbmFsaXR5IGZvclxyXG4gKiBzZXR0aW5nIG9yIGdldHRpbmcgY29va2llcy5cclxuICovXHJcblx0XHJcbmNsYXNzIENvb2tpZVxyXG57XHJcblx0LyoqXHJcbiBcdCogU2V0cyBhIGNvb2tpZS5cclxuIFx0KiBcclxuIFx0KiBAcGFyYW0gc3RyaW5nIHwgbmFtZVxyXG4gXHQqIEBwYXJhbSBKU09OIHwgdmFsdWVcclxuIFx0KiBAcGFyYW0gaW50ZWdlciB8IGRheXNcclxuIFx0KiBAcmV0dXJuIHZvaWRcclxuXHQqL1xyXG5cdHN0YXRpYyBzZXQobmFtZSwgdmFsdWUsIGRheXMpIFxyXG5cdHtcclxuXHRcdGlmICh2YWx1ZS5jb25zdHJ1Y3Rvci5uYW1lICA9PSAnT2JqZWN0JyB8fCB2YWx1ZS5jb25zdHJ1Y3Rvci5uYW1lID09ICdBcnJheScpIHtcclxuXHRcdFx0dmFsdWUgPSBKU09OLnN0cmluZ2lmeSh2YWx1ZSk7XHJcblx0XHR9XHJcblxyXG5cdFx0ZGF5cyA9IGRheXMgfHwgMTA7XHJcblxyXG5cdCAgICBsZXQgZXhwaXJlcztcclxuXHQgICAgXHJcblx0ICAgIGlmIChkYXlzKSB7XHJcblx0ICAgICAgICBsZXQgZGF0ZSA9IG5ldyBEYXRlKCk7XHJcblx0ICAgICAgICBkYXRlLnNldFRpbWUoZGF0ZS5nZXRUaW1lKCkgKyAoZGF5cyAqIDI0ICogNjAgKiA2MCAqIDEwMDApKTtcclxuXHQgICAgICAgIGV4cGlyZXMgPSBcIjsgZXhwaXJlcz1cIiArIGRhdGUudG9HTVRTdHJpbmcoKTtcclxuXHQgICAgfSBlbHNlIHtcclxuXHQgICAgICAgIGV4cGlyZXMgPSBcIlwiO1xyXG5cdCAgICB9XHJcblxyXG5cdCAgICBkb2N1bWVudC5jb29raWUgPSBuYW1lICsgXCI9XCIgKyB2YWx1ZSArIGV4cGlyZXMgKyBcIjsgcGF0aD0vXCI7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBSZXRyaWV2ZXMgdGhlIGNvb2tpZSBieSBuYW1lLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIHN0cmluZyB8IG5hbWVcclxuIFx0ICogQHJldHVybiBKU09OXHJcblx0ICovXHJcblx0c3RhdGljIGdldChuYW1lKSBcclxuXHR7XHJcblx0ICAgIGlmIChkb2N1bWVudC5jb29raWUubGVuZ3RoID4gMCkge1xyXG5cdCAgICAgICAgbGV0IGNfc3RhcnQgPSBkb2N1bWVudC5jb29raWUuaW5kZXhPZihuYW1lICsgXCI9XCIpO1xyXG5cdCAgICAgICAgXHJcblx0ICAgICAgICBpZiAoY19zdGFydCAhPSAtMSkge1xyXG5cdCAgICAgICAgICAgIGNfc3RhcnQgPSBjX3N0YXJ0ICsgbmFtZS5sZW5ndGggKyAxO1xyXG5cdCAgICAgICAgICAgIGxldCBjX2VuZCA9IGRvY3VtZW50LmNvb2tpZS5pbmRleE9mKFwiO1wiLCBjX3N0YXJ0KTtcclxuXHQgICAgICAgICAgICBcclxuXHQgICAgICAgICAgICBpZiAoY19lbmQgPT0gLTEpIHtcclxuXHQgICAgICAgICAgICAgICAgY19lbmQgPSBkb2N1bWVudC5jb29raWUubGVuZ3RoO1xyXG5cdCAgICAgICAgICAgIH1cclxuXHJcblx0ICAgICAgICAgICAgcmV0dXJuIEpTT04ucGFyc2UodW5lc2NhcGUoZG9jdW1lbnQuY29va2llLnN1YnN0cmluZyhjX3N0YXJ0LCBjX2VuZCkpKTtcclxuXHQgICAgICAgIH1cclxuXHQgICAgfVxyXG5cclxuXHQgICAgcmV0dXJuIHt9O1xyXG5cdH1cclxufVxuXG5sZXQgZGVmYXVsdE1lc3NhZ2UkNCA9ICdUaGUgaXRlbSB5b3UgYXJlIHRyeWluZyB0byBhZGQgbXVzdCBjb250YWluIGEgdW5pcXVlIGlkJztcclxuXHJcbmNsYXNzIEludmFsaWRDYXJ0SXRlbUV4Y2VwdGlvbiBleHRlbmRzIEV4Y2VwdGlvbkhhbmRsZXJcclxue1xyXG5cdGNvbnN0cnVjdG9yKG1lc3NhZ2UgPSBudWxsKSBcclxuXHR7XHJcblx0XHRtZXNzYWdlID0gbWVzc2FnZSB8fCBkZWZhdWx0TWVzc2FnZSQ0O1xyXG5cdFx0c3VwZXIobWVzc2FnZSk7XHJcbiAgICBcdHN1cGVyLnN0YWNrVHJhY2UodGhpcywgbWVzc2FnZSk7XHJcbiAgICB9XHJcbn1cblxuLy8gSGVscGVyc1xyXG4vLyBFeGNlcHRpb25zXHJcbi8qKlxyXG4gKiBAZmlsZSBcclxuICogQ2FydCBjbGFzcy5cclxuICpcclxuICogSGFuZGxlcyBhZGRpbmcsIHJlbW92aW5nIGV0Yy4uLiBvZiBpdGVtcy5cclxuICovXHJcblxyXG4vKipcclxuICogVGhlIGRlZmF1bHQgc2V0dGluZ3Mgb2YgdGhlIGNhcnQuXHJcbiAqXHJcbiAqIEB2YXIgb2JqZWN0XHJcbiAqL1xyXG5sZXQgZGVmYXVsdFNldHRpbmdzJDEgPSB7XHJcblx0ZWxlbWVudDogJy5jYXJ0JyxcclxuXHRjb29raWVfbmFtZTogJ2NhcnQnLFxyXG5cdHByZXZpZXdfY2xhc3M6ICcnLFxyXG5cdGxvYWRlcjogJycsXHJcblx0Y2xhc3M6ICcnLFxyXG5cdHdpZHRoOiAnNjBweCcsXHJcblx0aGVpZ2h0OiAnNjBweCcsXHJcblx0cGxhY2VtZW50OiAncmlnaHQtdG9wJyxcclxuXHRmaXhlZDogdHJ1ZSxcclxuXHRob3Zlcl9jb2xvcjogJ29yYW5nZScsXHJcblx0bm9fY3NzOiBmYWxzZSxcclxufTtcclxuXHJcbi8qKlxyXG4gKiBTdG9yZXMgdGhlIGNvbnRhaW5lciBvYmplY3QuXHJcbiAqXHJcbiAqIEB2YXIgXFxDb3JlXFxDb250YWluZXJcclxuICovXHJcbmxldCBDb250YWluZXIkMjtcclxuXHJcbi8qKlxyXG4gKiBTdG9yZXMgdGhlIGV2ZW50IG1hbmFnZXIgb2JqZWN0LlxyXG4gKlxyXG4gKiBAdmFyIFxcQ29yZVxcRXZlbnRNYW5hZ2VyXHJcbiAqL1xyXG5sZXQgRXZlbnRNYW5hZ2VyJDI7XHJcblxyXG4vKipcclxuICogU3RvcmVzIHRoZSByZXF1ZXN0IG9iamVjdC5cclxuICpcclxuICogQHZhciBcXEhlbHBlcnNcXFJlcXVlc3RcclxuICovXHJcbmxldCBIdHRwO1xyXG5cclxuLyoqXHJcbiAqIFN0b3JlcyB0aGUgY2FydCBsb2FkZXIuXHJcbiAqXHJcbiAqIEB2YXIgSFRNTERpdkVsZW1lbnRcclxuICovXHJcbmxldCBsb2FkaW5nT3ZlcmxheTtcclxuXHJcbi8qKlxyXG4gKiBTdG9yZXMgdGhlIGl0ZW1zIHdyYXBwZXIuXHJcbiAqXHJcbiAqIEB2YXIgSFRNTERpdkVsZW1lbnRcclxuICovXHJcbmxldCBpdGVtc0RpdjtcclxuXHJcbmNsYXNzIENhcnQgXHJcbntcclxuXHQvKipcclxuXHQgKiAtIEluaXRpYWxpemUgdGhlIElvQyBjb250YWluZXJcclxuXHQgKiAtIEluaXRpYWxpemUgdGhlIFJlcXVlc3RcclxuXHQgKiAtIEluaXRpYWxpemUgdGhlIEV2ZW50TWFuYWdlclxyXG5cdCAqIC0gQ3JlYXRlcyB0aGUgcHJldmlldyBhbmQgdGhlIGljb24gb2YgdGhlIGNhcnQuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gXFxDb3JlXFxDb250YWluZXIgfCBjb250YWluZXJcclxuXHQgKiBAcGFyYW0gXFxIZWxwZXJzXFxSZXF1ZXN0IHwgaHR0cFxyXG5cdCAqIEBwYXJhbSBcXENvcmVcXEV2ZW50TWFuYWdlciB8IGV2ZW50TWFuYWdlclxyXG5cdCAqIEByZXR1cm4gdm9pZFxyXG5cdCAqL1xyXG5cdGNvbnN0cnVjdG9yKGNvbnRhaW5lciwgaHR0cCwgZXZlbnRNYW5hZ2VyKSBcclxuXHR7XHJcblx0XHRDb250YWluZXIkMiA9IGNvbnRhaW5lcjtcclxuXHRcdEh0dHAgPSBodHRwO1xyXG5cdFx0RXZlbnRNYW5hZ2VyJDIgPSBldmVudE1hbmFnZXI7XHJcblx0XHRcclxuXHRcdHRoaXMucHJldmlld0VsZW1lbnQgPSB0aGlzLmNyZWF0ZVByZXZpZXdFbGVtZW50KCk7XHJcblx0XHR0aGlzLmljb24gPSBjcmVhdGVJY29uLmNhbGwodGhpcyk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBTZXRzIHRoZSBvYmplY3QgYnkgdGhlIHVzZXJzIHNldHRpbmcuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gb2JqZWN0IHwgc2V0dGluZ3NcclxuXHQgKiBAcmV0dXJuIHZvaWRcclxuXHQgKi9cclxuXHRzZXR1cChzZXR0aW5ncylcclxuXHR7XHJcblx0XHRpZiAodHlwZW9mIHNldHRpbmdzICE9ICdvYmplY3QnKSB7XHJcblx0XHRcdHRocm93IG5ldyBJbnZhbGlkQXJndW1lbnRFeGNlcHRpb24kMTtcclxuXHRcdH1cclxuXHJcblx0XHR0aGlzLnNldHRpbmdzID0gQ29tbW9uLmV4dGVuZChkZWZhdWx0U2V0dGluZ3MkMSwgc2V0dGluZ3MpO1xyXG5cclxuXHRcdHRoaXMuc2V0RWxlbWVudCh0aGlzLnNldHRpbmdzLmVsZW1lbnQpO1xyXG5cclxuXHRcdERPTS5hZGRDbGFzcyh0aGlzLnByZXZpZXdFbGVtZW50LCAnY2xvc2VkJyk7XHJcblx0XHRET00uYWRkQ2xhc3ModGhpcy5wcmV2aWV3RWxlbWVudCwgdGhpcy5zZXR0aW5ncy5wcmV2aWV3X2NsYXNzKTtcclxuXHRcdFxyXG5cdFx0dGhpcy5hZGRTdHlsZVRhZygpO1xyXG5cdFx0dGhpcy5iaW5kRXZlbnRMaXN0ZW5lcnMoKTtcclxuXHRcdFxyXG5cdFx0aWYgKHRoaXMuaXNFbXB0eShDb29raWUuZ2V0KHRoaXMuc2V0dGluZ3MuY29va2llX25hbWUpKSkge1xyXG5cdFx0XHR0aGlzLnNldHVwQ2FydCgpO1xyXG5cdFx0XHRcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIENoZWNrcyBpZiB0aGUgY2FydCBpcyBlbXB0eVxyXG5cdCAqXHJcblx0ICogQHBhcmFtIG9iamVjdCB8IGNhcnRcclxuXHQgKiBAcmV0dXJuIGJvb2xcclxuXHQgKi9cclxuXHRpc0VtcHR5KGNhcnQpXHJcblx0e1xyXG5cdFx0cmV0dXJuIENvbW1vbi5lbXB0eU9iamVjdChjYXJ0KTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEluaXRpYWxpemUvU2V0cyB0aGUgY2FydCBhcyBhIGNvb2tpZS5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSBvYmplY3QgfCBjYXJ0XHJcblx0ICogQHJldHVybiB2b2lkXHJcblx0ICovXHJcblx0c2V0dXBDYXJ0KClcclxuXHR7XHJcblx0XHR0aGlzLmNhcnQgPSB7fTtcclxuXHRcdHRoaXMuY2FydC5pZCA9IFN0ci5yYW5kb20oMTApO1xyXG5cdFx0dGhpcy5jYXJ0Lml0ZW1zID0gW107XHJcblx0XHR0aGlzLmNhcnQuZmF2b3JpdGVzID0gW107XHJcblx0XHRDb29raWUuc2V0KHRoaXMuc2V0dGluZ3MuY29va2llX25hbWUsIHRoaXMuY2FydCwgMik7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBBZGRzIGFuIGl0ZW0gdG8gdGhlIGNhcnQuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gb2JqZWN0IHwgaXRlbVxyXG5cdCAqIEByZXR1cm4gdm9pZFxyXG5cdCAqL1xyXG5cdGFkZEl0ZW0oaXRlbSlcclxuXHR7XHJcblx0XHRpZiAodHlwZW9mIGl0ZW0gIT0gJ29iamVjdCcpIHtcclxuXHRcdFx0dGhyb3cgbmV3IEludmFsaWRBcmd1bWVudEV4Y2VwdGlvbiQxKCdhZGRJdGVtKCkgZXhwZWN0IHRoZSBmaXJzdCBwYXJhbWV0ZXIgdG8gYmUgYW4gb2JqZWN0LCBidXQgJyArIHR5cGVvZiBpdGVtICsgJyB3YXMgcGFzc2VkIGluc3RlYWQnKTtcclxuXHRcdH1cclxuXHJcblx0XHRpZiAoISBpdGVtLmhhc093blByb3BlcnR5KCdpZCcpKSB7XHJcblx0XHRcdHRocm93IG5ldyBJbnZhbGlkQ2FydEl0ZW1FeGNlcHRpb247XHJcblx0XHR9XHJcblxyXG5cdFx0dGhpcy5jYXJ0ID0gQ29va2llLmdldCh0aGlzLnNldHRpbmdzLmNvb2tpZV9uYW1lKTtcclxuXHJcblx0XHRpZiAoIWl0ZW0uaGFzT3duUHJvcGVydHkoJ3F1YW50aXR5JykpIHtcclxuXHRcdFx0aXRlbS5xdWFudGl0eSA9IDE7XHJcblx0XHR9XHJcblxyXG5cdFx0bGV0IGk7XHJcblx0XHRsZXQgaW5jcmVtZW50ZWQgPSBmYWxzZTtcclxuXHJcblx0XHRmb3IgKGkgPSAwOyBpIDwgdGhpcy5jYXJ0Lml0ZW1zLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdGlmICh0aGlzLmNhcnQuaXRlbXNbaV0uaWQgPT0gaXRlbS5pZCkge1xyXG5cdFx0XHRcdHRoaXMuY2FydC5pdGVtc1tpXS5xdWFudGl0eSsrO1xyXG5cdFx0XHRcdGluY3JlbWVudGVkID0gdHJ1ZTtcclxuXHRcdFx0XHRicmVhaztcdFxyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKCEgaW5jcmVtZW50ZWQpIHtcclxuXHRcdFx0dGhpcy5jYXJ0Lml0ZW1zLnB1c2goaXRlbSk7XHJcblx0XHR9XHJcblxyXG5cdFx0Q29va2llLnNldCh0aGlzLnNldHRpbmdzLmNvb2tpZV9uYW1lLCB0aGlzLmNhcnQsIDIpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQWRkcyBhbiBpdGVtIHRvIHRoZSBmYXZvcml0ZXMgbGlzdC5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSBvYmplY3QgfCBpdGVtXHJcblx0ICogQHJldHVybiB2b2lkXHJcblx0ICovXHJcblx0ZmF2b3JpdGVJdGVtKGl0ZW0pXHJcblx0e1xyXG5cdFx0aWYgKHR5cGVvZiBpdGVtICE9ICdvYmplY3QnKSB7XHJcblx0XHRcdHRocm93IG5ldyBJbnZhbGlkQXJndW1lbnRFeGNlcHRpb24kMSgnZmF2b3JpdGVJdGVtKCkgZXhwZWN0IHRoZSBmaXJzdCBwYXJhbWV0ZXIgdG8gYmUgYW4gb2JqZWN0LCBidXQgJyArIHR5cGVvZiBpdGVtICsgJyB3YXMgcGFzc2VkIGluc3RlYWQnKTtcclxuXHRcdH1cclxuXHJcblx0XHRpZiAoISBpdGVtLmhhc093blByb3BlcnR5KCdpZCcpKSB7XHJcblx0XHRcdHRocm93IG5ldyBJbnZhbGlkQ2FydEl0ZW1FeGNlcHRpb247XHJcblx0XHR9XHJcblxyXG5cdFx0dGhpcy5jYXJ0ID0gQ29va2llLmdldCh0aGlzLnNldHRpbmdzLmNvb2tpZV9uYW1lKTtcclxuXHJcblx0XHRsZXQgaTtcclxuXHRcdGxldCBhbHJlYWR5RmF2b3JpdGVkID0gZmFsc2U7XHJcblxyXG5cdFx0Zm9yIChpID0gMDsgaSA8IHRoaXMuY2FydC5mYXZvcml0ZXMubGVuZ3RoOyBpKyspIHtcclxuXHRcdFx0aWYgKHRoaXMuY2FydC5mYXZvcml0ZXNbaV0uaWQgPT0gaXRlbS5pZCkge1xyXG5cdFx0XHRcdGFscmVhZHlGYXZvcml0ZWQgPSB0cnVlO1xyXG5cdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKCEgYWxyZWFkeUZhdm9yaXRlZCkge1xyXG5cdFx0XHR0aGlzLmNhcnQuZmF2b3JpdGVzLnB1c2goaXRlbSk7XHJcblx0XHR9XHJcblxyXG5cdFx0Q29va2llLnNldCh0aGlzLnNldHRpbmdzLmNvb2tpZV9uYW1lLCB0aGlzLmNhcnQsIDIpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogUmVtb3ZlcyBhbiBpdGVtIGZyb20gdGhlIGNhcnQuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gb2JqZWN0IHwgaXRlbVxyXG5cdCAqIEByZXR1cm4gdm9pZFxyXG5cdCAqL1xyXG5cdHJlbW92ZUl0ZW0oaXRlbSlcclxuXHR7XHJcblx0XHRpZiAodHlwZW9mIGl0ZW0gIT0gJ29iamVjdCcpIHtcclxuXHRcdFx0dGhyb3cgbmV3IEludmFsaWRBcmd1bWVudEV4Y2VwdGlvbiQxKCdyZW1vdmVJdGVtKCkgZXhwZWN0IHRoZSBmaXJzdCBwYXJhbWV0ZXIgdG8gYmUgYW4gb2JqZWN0LCBidXQgJyArIHR5cGVvZiBpdGVtICsgJyB3YXMgcGFzc2VkIGluc3RlYWQnKTtcclxuXHRcdH1cclxuXHJcblx0XHRpZiAoISBpdGVtLmhhc093blByb3BlcnR5KCdpZCcpKSB7XHJcblx0XHRcdHRocm93IG5ldyBJbnZhbGlkQ2FydEl0ZW1FeGNlcHRpb247XHJcblx0XHR9XHJcblxyXG4gXHRcdHRoaXMuY2FydCA9IENvb2tpZS5nZXQodGhpcy5zZXR0aW5ncy5jb29raWVfbmFtZSk7XHJcblxyXG4gXHRcdGxldCBpO1xyXG5cclxuIFx0XHRmb3IgKGkgPSAwOyBpIDwgdGhpcy5jYXJ0Lml0ZW1zLmxlbmd0aDsgaSsrKSB7XHJcbiBcdFx0XHRpZiAodGhpcy5jYXJ0Lml0ZW1zW2ldLmlkID09IGl0ZW0uaWQpIHtcclxuIFx0XHRcdFx0dGhpcy5jYXJ0Lml0ZW1zLnNwbGljZShpLCAxKTtcclxuIFx0XHRcdFx0YnJlYWs7XHJcbiBcdFx0XHR9XHJcbiBcdFx0fVxyXG5cclxuIFx0XHRDb29raWUuc2V0KHRoaXMuc2V0dGluZ3MuY29va2llX25hbWUsIHRoaXMuY2FydCwgMik7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBBZGRzIHRoZSBpdGVtIHRvIHByZXZpZXcuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gYXJyYXkgfCBpdGVtc1xyXG5cdCAqIEByZXR1cm4gdm9pZFxyXG5cdCAqL1xyXG5cdGFkZFRvUHJldmlldyhpdGVtcylcclxuXHR7XHJcblx0XHRpdGVtc0Rpdi5pbm5lckhUTUwgPSAnJztcclxuXHJcblx0XHRsZXQgdGFibGUgPSBET00uY3JlYXRlRWxlbWVudCgndGFibGUnKTtcclxuXHJcblx0XHRET00uYWRkQ2xhc3ModGFibGUsICdwcmV2aWV3LXRhYmxlJyk7XHJcblxyXG5cdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCBpdGVtcy5sZW5ndGg7IGkrKykge1xyXG5cclxuXHRcdFx0bGV0IGF0dHJpYnV0ZXMgPSBpdGVtc1tpXTtcclxuXHJcblx0XHRcdGxldCB0ciA9IERPTS5jcmVhdGVFbGVtZW50KCd0cicsIHtcclxuXHRcdFx0XHRjbGFzczogJ2l0ZW0nXHJcblx0XHRcdH0pO1xyXG5cclxuXHRcdFx0Ly8gUXVhbnRpdHkgYWx3YXlzIGF0IHRoZSBzdGFydCBvZiBhbiBpdGVtLlxyXG5cdFx0XHRsZXQgdGQgPSBET00uY3JlYXRlRWxlbWVudCgndGQnKTtcclxuXHJcblx0XHRcdHRkLmlubmVySFRNTCA9IGF0dHJpYnV0ZXMucXVhbnRpdHkgKyd4JztcclxuXHRcdFx0dHIuYXBwZW5kQ2hpbGQodGQpO1xyXG5cdFx0XHRcclxuXHRcdFx0Zm9yKGxldCBhdHRyaWJ1dGUgaW4gYXR0cmlidXRlcykge1xyXG5cdFx0XHRcdHN3aXRjaChhdHRyaWJ1dGUpXHJcblx0XHRcdFx0e1xyXG5cdFx0XHRcdFx0Y2FzZSAnaW1hZ2UnOlxyXG5cdFx0XHRcdFx0XHR0ZCA9IERPTS5jcmVhdGVFbGVtZW50KCd0ZCcpO1xyXG5cdFx0XHRcdFx0XHRsZXQgaW1hZ2UgPSBET00uY3JlYXRlRWxlbWVudCgnaW1nJywge1xyXG5cdFx0XHRcdFx0XHRcdHNyYzogYXR0cmlidXRlc1thdHRyaWJ1dGVdLFxyXG5cdFx0XHRcdFx0XHRcdHdpZHRoOiAnNTBweCcsXHJcblx0XHRcdFx0XHRcdFx0aGVpZ2h0OiAnNTBweCdcclxuXHRcdFx0XHRcdFx0fSk7XHJcblxyXG5cdFx0XHRcdFx0XHR0ZC5hcHBlbmRDaGlsZChpbWFnZSk7XHJcblx0XHRcdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRcdFx0Y2FzZSAnbmFtZSc6XHJcblx0XHRcdFx0XHRjYXNlICdwcmljZSc6XHJcblx0XHRcdFx0XHRcdHRkID0gRE9NLmNyZWF0ZUVsZW1lbnQoJ3RkJyk7XHJcblx0XHRcdFx0XHRcdHRkLmlubmVySFRNTCA9IGF0dHJpYnV0ZXNbYXR0cmlidXRlXTtcclxuXHRcdFx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcclxuXHRcdFx0XHR0ci5hcHBlbmRDaGlsZCh0ZCk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHRhYmxlLmFwcGVuZENoaWxkKHRyKTtcclxuXHRcdH1cclxuXHJcblx0XHQvLyBjcmVhdGUgY2hlY2tvdXQgYnV0dG9uIGF0IHRoZSBidXR0b21cclxuXHRcdGxldCB0ciA9IERPTS5jcmVhdGVFbGVtZW50KCd0cicpO1xyXG5cdFx0bGV0IHRkID0gRE9NLmNyZWF0ZUVsZW1lbnQoJ3RkJywge1xyXG5cdFx0XHRjb2xzcGFuOiAnNCcsXHJcblx0XHR9KTtcclxuXHJcblx0XHRsZXQgY2hlY2tvdXQgPSBET00uY3JlYXRlRWxlbWVudCgnYScsIHtcclxuXHRcdFx0Y2xhc3M6ICdidG4gYnRuLXByaW1hcnknLFxyXG5cdFx0XHR0ZXh0OiAnQ2hlY2tvdXQnXHJcblx0XHR9KTtcclxuXHJcblx0XHRjaGVja291dC5vbmNsaWNrID0gZnVuY3Rpb24oZSkge1xyXG5cdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XHJcblx0XHRcdEV2ZW50TWFuYWdlciQyLnB1Ymxpc2goJ2NhcnQuY2hlY2tvdXQnKTtcclxuXHRcdH0uYmluZCh0aGlzKTtcclxuXHJcblx0XHR0ZC5hcHBlbmRDaGlsZCggY2hlY2tvdXQpO1xyXG5cdFx0dHIuYXBwZW5kQ2hpbGQodGQpO1xyXG5cclxuXHRcdHRhYmxlLmFwcGVuZENoaWxkKHRyKTtcclxuXHJcblx0XHRpdGVtc0Rpdi5hcHBlbmRDaGlsZCh0YWJsZSk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBCaW5kcyBldmVydGhpbmcgdG8gdGhlIGVsZW1lbnQuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gc3RyaW5nIHwgc2VsZWN0b3JcclxuXHQgKiBAcmV0dXJuIHZvaWRcclxuXHQgKi9cclxuXHRzZXRFbGVtZW50KHNlbGVjdG9yKVxyXG5cdHtcclxuXHRcdHRoaXMuZWxlbWVudCA9IERPTS5maW5kKHNlbGVjdG9yKTtcclxuXHJcblx0XHRpZiAodGhpcy5lbGVtZW50KSB7XHJcblx0XHRcdERPTS5hZGRDbGFzcyh0aGlzLmVsZW1lbnQsIHRoaXMuc2V0dGluZ3MuY2xhc3MpO1xyXG5cdFx0XHRET00uYWRkQ2xhc3ModGhpcy5lbGVtZW50LCB0aGlzLnNldHRpbmdzLnBsYWNlbWVudCk7XHJcblx0XHRcdHRoaXMuZWxlbWVudC5hcHBlbmRDaGlsZCh0aGlzLmljb24pO1xyXG5cdFx0XHR0aGlzLmVsZW1lbnQuYXBwZW5kQ2hpbGQodGhpcy5wcmV2aWV3RWxlbWVudCk7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBDcmVhdGVzIHRoZSBjYXJ0IGRldGFpbHMgcHJldmlldyBlbGVtZW50LlxyXG5cdCAqXHJcblx0ICogQHJldHVybiBIVE1MRGl2RWxlbWVudFxyXG5cdCAqL1xyXG5cdGNyZWF0ZVByZXZpZXdFbGVtZW50KClcclxuXHR7XHJcblx0XHRsZXQgcHJldmlld0VsZW1lbnQgPSBET00uY3JlYXRlRWxlbWVudCgnZGl2Jywge1xyXG5cdFx0XHRpZDogJ3ByZXZpZXcnXHJcblx0XHR9KTtcclxuXHJcblx0XHRpdGVtc0RpdiA9IERPTS5jcmVhdGVFbGVtZW50KCd1bCcsIHtcclxuXHRcdFx0XHRjbGFzczogJ2l0ZW1zJ1xyXG5cdFx0XHR9KTtcclxuXHJcblx0XHRwcmV2aWV3RWxlbWVudC5hcHBlbmRDaGlsZChpdGVtc0Rpdik7XHJcblxyXG5cdFx0cmV0dXJuIHByZXZpZXdFbGVtZW50O1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQWRkIHRoZSBlQ29tbWVyY2Ugc3R5bGUgdGFncyB0byB0aGUgRE9NLlxyXG5cdCAqXHJcblx0ICogQHJldHVybiB2b2lkXHJcblx0ICovXHJcblx0YWRkU3R5bGVUYWcoKSBcclxuXHR7XHJcblx0XHRpZiAoRE9NLmZpbmQoJyNUdXJiby1lQ29tbWVyY2UtQ2FydCcpKSB7XHJcblx0XHRcdHJldHVybjtcclxuXHRcdH1cclxuXHJcblx0XHRpZiAodGhpcy5zZXR0aW5ncy5ub19jc3MpIHtcclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0fVxyXG5cclxuXHRcdGxldCBwb3NpdGlvbiA9ICh0aGlzLnNldHRpbmdzLmZpeGVkKSA/ICdmaXhlZCcgOiAnYWJzb2x1dGUnO1xyXG5cclxuXHRcdGxldCBjc3MgPSBgXHJcblx0XHRcdCR7dGhpcy5zZXR0aW5ncy5lbGVtZW50fSB7XHJcblx0XHRcdFx0cG9zaXRpb246ICR7cG9zaXRpb259O1xyXG5cdFx0XHRcdGN1cnNvcjogcG9pbnRlcjtcclxuXHRcdFx0XHRjb2xvcjogI2ZmZmZmZjtcclxuXHRcdFx0XHR6LWluZGV4OiA5OTg7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdCR7dGhpcy5zZXR0aW5ncy5lbGVtZW50fSBzdmcge1xyXG5cdFx0XHRcdHdpZHRoOiAke3RoaXMuc2V0dGluZ3Mud2lkdGh9O1xyXG5cdFx0XHRcdGhlaWdodDogJHt0aGlzLnNldHRpbmdzLmhlaWdodH07XHJcblx0XHRcdFx0dHJhbnNpdGlvbjogZmlsbCAwLjNzO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHQke3RoaXMuc2V0dGluZ3MuZWxlbWVudH0gc3ZnOmhvdmVyIHtcclxuXHRcdFx0XHRmaWxsOiAke3RoaXMuc2V0dGluZ3MuaG92ZXJfY29sb3J9O1xyXG5cdFx0XHRcdHRyYW5zaXRpb246IGZpbGwgMC4zcztcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0JHt0aGlzLnNldHRpbmdzLmVsZW1lbnR9LnRvcC1yaWdodCxcclxuXHRcdFx0JHt0aGlzLnNldHRpbmdzLmVsZW1lbnR9LnJpZ2h0LXRvcCB7XHJcblx0XHRcdFx0cmlnaHQ6IDEwcHg7XHJcblx0XHRcdFx0dG9wOiAxMHB4O1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHQke3RoaXMuc2V0dGluZ3MuZWxlbWVudH0ubGVmdC10b3AsXHJcblx0XHRcdCR7dGhpcy5zZXR0aW5ncy5lbGVtZW50fS50b3AtbGVmdCB7XHJcblx0XHRcdFx0bGVmdDogMTBweDtcclxuXHRcdFx0XHR0b3A6IDEwcHg7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdCR7dGhpcy5zZXR0aW5ncy5lbGVtZW50fSA+ICNwcmV2aWV3IHtcclxuXHRcdFx0XHRwb3NpdGlvbjogJHtwb3NpdGlvbn07XHJcblx0XHRcdFx0ei1pbmRleDogOTk5OTtcclxuXHRcdFx0XHR0b3A6IGNhbGMoMTBweCArICR7dGhpcy5zZXR0aW5ncy5oZWlnaHR9KTtcclxuXHRcdFx0XHR0cmFuc2Zvcm06IHRyYW5zbGF0ZVgoNjBweCk7XHJcblx0XHRcdFx0aGVpZ2h0OiA0MDBweDtcclxuXHRcdFx0XHR3aWR0aDogMzAwcHg7XHJcblx0XHRcdFx0Ym9yZGVyOiAxcHggc29saWQgI2U0ZTRlNDtcclxuXHRcdFx0XHRiYWNrZ3JvdW5kOiAjZmZmZmZmO1xyXG5cdFx0XHRcdHRyYW5zaXRpb246IHRyYW5zZm9ybSAxcywgdmlzaWJpbGl0eSAxcztcclxuXHRcdFx0XHRjdXJzb3I6IGRlZmF1bHQ7XHJcblx0XHRcdFx0b3ZlcmZsb3ctWTogc2Nyb2xsO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHQke3RoaXMuc2V0dGluZ3MuZWxlbWVudH0gPiAjcHJldmlldy5vcGVuZWQge1xyXG5cdFx0XHRcdHZpc2liaWxpdHk6IHZpc2libGU7XHJcblx0XHRcdFx0dHJhbnNmb3JtOiB0cmFuc2xhdGVYKC0yNDBweCk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdCR7dGhpcy5zZXR0aW5ncy5lbGVtZW50fSA+ICNwcmV2aWV3LmNsb3NlZCB7XHJcblx0XHRcdFx0dmlzaWJpbGl0eTogaGlkZGVuO1xyXG5cdFx0XHRcdHRyYW5zZm9ybTogdHJhbnNsYXRlWCg2MHB4KTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0JHt0aGlzLnNldHRpbmdzLmVsZW1lbnR9ICNwcmV2aWV3ID4gdWwuaXRlbXMge1xyXG5cdFx0XHRcdHBhZGRpbmc6IDA7XHJcblx0XHRcdFx0Y29sb3I6ICMwMDAwMDA7XHJcblx0XHRcdFx0bGlzdC1zdHlsZS10eXBlOiBub25lO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHQke3RoaXMuc2V0dGluZ3MuZWxlbWVudH0gI3ByZXZpZXcgPiB1bC5pdGVtcyA+IC5wcmV2aWV3LXRhYmxlIHtcclxuXHRcdFx0XHR3aWR0aDogMTAwJTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0JHt0aGlzLnNldHRpbmdzLmVsZW1lbnR9ICNwcmV2aWV3ID4gdWwuaXRlbXMgPiAucHJldmlldy10YWJsZSB0ZCB7XHJcblx0XHRcdFx0cGFkZGluZzogNHB4O1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHQke3RoaXMuc2V0dGluZ3MuZWxlbWVudH0gLml0ZW1zLmxvYWRpbmcge1xyXG5cdFx0XHRcdGRpc3BsYXk6IG5vbmU7XHJcblx0XHRcdFx0b3ZlcmZsb3ctWTogbm9uZTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0JHt0aGlzLnNldHRpbmdzLmVsZW1lbnR9IC5jYXJ0LWxvYWRlci1vdmVybGF5IHtcclxuXHRcdFx0XHRwb3NpdGlvbjogZml4ZWQ7XHJcblx0XHRcdFx0dG9wOiAwOyBcclxuXHRcdFx0ICAgIGxlZnQ6IDA7XHJcblx0XHRcdCAgICByaWdodDogMDtcclxuXHRcdFx0ICAgIGJvdHRvbTogMDtcclxuXHRcdFx0XHRiYWNrZ3JvdW5kOiAjZmZmZmZmO1xyXG5cdFx0XHRcdHdpZHRoOiAxMDAlO1xyXG5cdFx0XHRcdGhlaWdodDogMTAwJTtcclxuXHRcdFx0XHRtaW4taGVpZ2h0OiAxMDAlO1xyXG5cdFx0XHRcdG92ZXJmbG93OiBhdXRvO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHQke3RoaXMuc2V0dGluZ3MuZWxlbWVudH0gLmNhcnQtbG9hZGVyLW92ZXJsYXkgLmNhcnQtbG9hZGVyIHtcclxuXHRcdFx0XHRwb3NpdGlvbjogYWJzb2x1dGU7XHJcblx0XHRcdFx0d2lkdGg6IDUwcHg7XHJcblx0XHRcdFx0aGVpZ2h0OiA1MHB4O1xyXG5cdFx0XHRcdG1hcmdpbi1sZWZ0OiAtMjVweDtcclxuXHRcdFx0XHRtYXJnaW4tdG9wOiAtMjVweDtcclxuXHRcdFx0XHRsZWZ0OiA1MCU7XHJcblx0XHRcdFx0cmlnaHQ6IDUwJTtcclxuXHRcdFx0XHR0b3A6IDUwJTtcclxuXHRcdFx0XHRib3R0b206IDUwJTtcclxuXHRcdFx0fVxyXG5cdFx0YDtcclxuXHQgICAgXHJcblx0ICAgIERPTS5hZGRTdHlsZSgnVHVyYm8tZUNvbW1lcmNlLUNhcnQnLCBjc3MpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQ3JlYXRlcyBhbiBsb2FkaW5nIG92ZXJsYXkuXHJcblx0ICpcclxuXHQgKiBAcmV0dXJuIEhUTUxEaXZFbGVtZW50XHJcblx0ICovXHJcblx0bG9hZGluZ092ZXJsYXkoKVxyXG5cdHtcclxuXHRcdGlmIChsb2FkaW5nT3ZlcmxheSkge1xyXG5cdFx0XHRyZXR1cm4gbG9hZGluZ092ZXJsYXk7XHJcblx0XHR9XHJcblxyXG5cdFx0bGV0IGxvYWRlcjtcclxuXHJcblx0XHRpZiAodGhpcy5zZXR0aW5ncy5sb2FkZXIpIHtcclxuXHRcdFx0bG9hZGVyID0gRE9NLmNyZWF0ZUVsZW1lbnQoJ2ltZycsIHtcclxuXHRcdFx0XHRzcmM6IHRoaXMuc2V0dGluZ3MubG9hZGVyLFxyXG5cdFx0XHRcdGNsYXNzOiAnY2FydC1sb2FkZXInXHJcblx0XHRcdH0pO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0bG9hZGVyID0gY3JlYXRlTG9hZGVyKCk7XHJcblx0XHR9XHJcblxyXG5cdFx0bG9hZGluZ092ZXJsYXkgPSBET00uY3JlYXRlRWxlbWVudCgnZGl2Jywge1xyXG5cdFx0XHRjbGFzczogJ2NhcnQtbG9hZGVyLW92ZXJsYXknXHJcblx0XHR9KTtcclxuXHJcblx0XHRsb2FkaW5nT3ZlcmxheS5hcHBlbmRDaGlsZChsb2FkZXIpO1xyXG5cclxuXHRcdHJldHVybiBsb2FkaW5nT3ZlcmxheTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIExvYWRpbmcgdGhlIGNhcnQgcHJldmlldy5cclxuXHQgKlxyXG5cdCAqIEByZXR1cm4gdm9pZFxyXG5cdCAqL1xyXG5cdHByZXZpZXdTdGFydExvYWRpbmcoKVxyXG5cdHtcclxuXHRcdERPTS5hZGRDbGFzcyhpdGVtc0RpdiwgJ2xvYWRpbmcnKTtcclxuXHRcdHRoaXMucHJldmlld0VsZW1lbnQuYXBwZW5kQ2hpbGQodGhpcy5sb2FkaW5nT3ZlcmxheSgpKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIExvYWRpbmcgdGhlIGNhcnQgcHJldmlldy5cclxuXHQgKlxyXG5cdCAqIEByZXR1cm4gdm9pZFxyXG5cdCAqL1xyXG5cdHByZXZpZXdTdG9wTG9hZGluZygpXHJcblx0e1xyXG5cdFx0aWYgKERPTS5maW5kKCcuY2FydC1sb2FkZXItb3ZlcmxheScsIHRoaXMucHJldmlld0VsZW1lbnQpKSB7XHJcblx0XHRcdHRoaXMucHJldmlld0VsZW1lbnQucmVtb3ZlQ2hpbGQodGhpcy5sb2FkaW5nT3ZlcmxheSgpKTtcclxuXHRcdFx0RE9NLnJlbW92ZUNsYXNzKGl0ZW1zRGl2LCAnbG9hZGluZycpO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogUmVsb2FkcyB0aGUgaXRlbXMgaW4gdGhlIGNhcnQgcHJldmlldy5cclxuXHQgKlxyXG5cdCAqIEByZXR1cm4gdm9pZFxyXG5cdCAqL1xyXG5cdHJlbG9hZENhcnRQcmV2aWV3KClcclxuXHR7XHJcblx0XHR0aGlzLnByZXZpZXdTdGFydExvYWRpbmcoKTtcclxuXHRcdGxldCBpdGVtcyA9IHRoaXMuZ2V0Q2FydEl0ZW1zKCk7XHJcblx0XHR0aGlzLmFkZFRvUHJldmlldyhpdGVtcyk7XHJcblx0XHRcclxuXHRcdGxldCBpbnN0YW5jZSA9IHRoaXM7XHJcblxyXG5cdFx0c2V0VGltZW91dChmdW5jdGlvbigpIHtcclxuXHRcdFx0aW5zdGFuY2UucHJldmlld1N0b3BMb2FkaW5nLmNhbGwoaW5zdGFuY2UpO1xyXG5cdFx0fSwgMTAwMCk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBCaW5kcyBldmVudCBsaXN0ZW5lcnMgdG8gdGhlIGNhcnQgaWNvbi5cclxuXHQgKlxyXG5cdCAqIEByZXR1cm4gdm9pZFxyXG5cdCAqL1xyXG5cdGJpbmRFdmVudExpc3RlbmVycygpXHJcblx0e1xyXG5cdFx0dGhpcy5pY29uLm9uY2xpY2sgPSBmdW5jdGlvbihlKSB7XHJcblx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcclxuXHRcdFx0dGhpcy50b2dnbGVDYXJ0UHJldmlldygpO1xyXG5cdFx0fS5iaW5kKHRoaXMpO1xyXG5cclxuXHRcdEV2ZW50TWFuYWdlciQyLnN1YnNjcmliZSgnY2FydC5wcm9kdWN0LmFkZGVkJywgZnVuY3Rpb24oYXR0cmlidXRlcykge1xyXG5cdFx0XHR0aGlzLm9wZW5DYXJ0UHJldmlldygpO1xyXG5cdFx0XHR0aGlzLmFkZEl0ZW0oYXR0cmlidXRlcyk7XHJcblx0XHRcdHRoaXMucmVsb2FkQ2FydFByZXZpZXcoKTtcclxuXHRcdH0uYmluZCh0aGlzKSk7XHJcblxyXG5cdFx0RXZlbnRNYW5hZ2VyJDIuc3Vic2NyaWJlKCdjYXJ0LnByb2R1Y3QuZmF2b3JpdGVkJywgZnVuY3Rpb24oYXR0cmlidXRlcykge1xyXG5cdFx0XHR0aGlzLmZhdm9yaXRlSXRlbShhdHRyaWJ1dGVzKTtcclxuXHRcdH0uYmluZCh0aGlzKSk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBPcGVucyB0aGUgY2FydCBwcmV2aWV3LlxyXG5cdCAqXHJcblx0ICogQHJldHVybiB2b2lkIFxyXG5cdCAqL1xyXG5cdG9wZW5DYXJ0UHJldmlldygpXHJcblx0e1xyXG5cdFx0aWYgKERPTS5oYXNDbGFzcyh0aGlzLnByZXZpZXdFbGVtZW50LCAnb3BlbmVkJykpIHtcclxuXHRcdFx0dGhpcy5yZWxvYWRDYXJ0UHJldmlldygpO1xyXG5cdFx0fVxyXG5cclxuXHRcdERPTS5zd2l0Y2hDbGFzc2VzKHRoaXMucHJldmlld0VsZW1lbnQsICdjbG9zZWQnLCAnb3BlbmVkJyk7XHJcblx0XHR0aGlzLnJlbG9hZENhcnRQcmV2aWV3KCk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBUb2dnbGVzIHRoZSBvcGVuaW5nIGNsb3Npbmcgb2YgdGhlIGNhcnQgcHJldmlldy5cclxuXHQgKlxyXG5cdCAqIEByZXR1cm4gdm9pZCBcclxuXHQgKi9cclxuXHR0b2dnbGVDYXJ0UHJldmlldygpXHJcblx0e1xyXG5cdFx0bGV0IG9wZW5pbmcgPSBET00udG9nZ2xlQ2xhc3ModGhpcy5wcmV2aWV3RWxlbWVudCwgJ29wZW5lZCcsICdjbG9zZWQnKTtcclxuXHRcdFx0XHJcblx0XHRpZiAob3BlbmluZykge1xyXG5cdFx0XHR0aGlzLnJlbG9hZENhcnRQcmV2aWV3KCk7XHRcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFJldHJpZXZlIHRoZSBjYXJ0cyBpdGVtcyBmcm9tIHRoZSBjb29raWUuXHJcblx0ICpcclxuXHQgKiBAcmV0dXJuIG9iamVjdFxyXG5cdCAqL1xyXG5cdGdldENhcnRJdGVtcygpXHJcblx0e1xyXG5cdFx0bGV0IGNhcnQgPSBDb29raWUuZ2V0KHRoaXMuc2V0dGluZ3MuY29va2llX25hbWUpO1xyXG5cclxuXHRcdHJldHVybiAoY2FydCkgPyBjYXJ0Lml0ZW1zIDogW107XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBIaWRlcyB0aGUgY29tcG9uZW50IGZyb20gdGhlIERPTS5cclxuXHQgKlxyXG5cdCAqIEByZXR1cm4gdm9pZCBcclxuXHQgKi9cclxuXHRoaWRlKClcclxuXHR7XHJcblx0XHR0aGlzLmVsZW1lbnQuc3R5bGUuZGlzcGxheSA9ICdub25lJztcclxuXHR9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBDbG9zZXMgdGhlIGNhcnQgcHJldmlldyBlbGVtZW50LlxyXG4gKlxyXG4gKiBAcGFyYW0gZXZlbnQuY2xpY2tcclxuICovXHJcbmZ1bmN0aW9uIGNsb3NlKGV2ZW50KSB7XHJcblx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuXHRET00uc3dpdGNoQ2xhc3Nlcyh0aGlzLnByZXZpZXdFbGVtZW50LCAnb3BlbmVkJywgJ2Nsb3NlZCcpO1xyXG59XHJcblxyXG4vKipcclxuICogQ3JlYXRlcyB0aGUgY2FydCBzdmcgaWNvbi5cclxuICpcclxuICogQHJldHVybiBTVkdTVkdFbGVtZW50XHJcbiAqL1xyXG5mdW5jdGlvbiBjcmVhdGVJY29uKCkge1xyXG5cdGxldCBzdmcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50TlMoXCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiLCBcInN2Z1wiKTtcclxuXHRsZXQgZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnROUyhcImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIsIFwiZ1wiKTtcclxuXHRsZXQgcGF0aCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnROUyhcImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIsIFwicGF0aFwiKTtcclxuXHJcblx0c3ZnLnNldEF0dHJpYnV0ZSgndmVyc2lvbicsICcxLjEnKTtcclxuXHRzdmcuc2V0QXR0cmlidXRlKCd4bWxucycsICdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZycpO1xyXG5cdHN2Zy5zZXRBdHRyaWJ1dGUoJ3htbG5zOnhsaW5rJywgJ2h0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsnKTtcclxuXHRzdmcuc2V0QXR0cmlidXRlKCd4JywgJzBweCcpO1xyXG5cdHN2Zy5zZXRBdHRyaWJ1dGUoJ3knLCAnMHB4Jyk7XHJcblx0c3ZnLnNldEF0dHJpYnV0ZSgnd2lkdGgnLCAnNDBweCcpO1xyXG5cdHN2Zy5zZXRBdHRyaWJ1dGUoJ2hlaWdodCcsICc0MHB4Jyk7XHJcblx0c3ZnLnNldEF0dHJpYnV0ZSgndmlld0JveCcsICcwIDAgNDQ2Ljg0MyA0NDYuODQzJyk7XHJcblx0c3ZnLnNldEF0dHJpYnV0ZSgnc3R5bGUnLCAnZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA0NDYuODQzIDQ0Ni44NDM7Jyk7XHJcblx0c3ZnLnNldEF0dHJpYnV0ZSgneG1sOnNwYWNlJywgJ3ByZXNlcnZlJyk7XHJcblxyXG5cdHBhdGguc2V0QXR0cmlidXRlKCdkJywgJ000NDQuMDksOTMuMTAzYy0yLjY5OC0zLjY5OS03LjAwNi01Ljg4OC0xMS41ODQtNS44ODhIMTA5LjkyYy0wLjYyNSwwLTEuMjQ5LDAuMDM4LTEuODUsMC4xMTlsLTEzLjI3Ni0zOC4yN2MtMS4zNzYtMy45NTgtNC40MDYtNy4xMTMtOC4zLTguNjQ2TDE5LjU4NiwxNC4xMzRjLTcuMzc0LTIuODg3LTE1LjY5NSwwLjczNS0xOC41OTEsOC4xYy0yLjg5MSw3LjM2OSwwLjczLDE1LjY5NSw4LjEsMTguNTkxbDYwLjc2OCwyMy44NzJsNzQuMzgxLDIxNC4zOTljLTMuMjgzLDEuMTQ0LTYuMDY1LDMuNjYzLTcuMzMyLDcuMTg3bC0yMS41MDYsNTkuNzM5Yy0xLjMxOCwzLjY2My0wLjc3NSw3LjczMywxLjQ2OCwxMC45MTZjMi4yNCwzLjE4Myw1Ljg4Myw1LjA3OCw5Ljc3Myw1LjA3OGgxMS4wNDRjLTYuODQ0LDcuNjE2LTExLjA0NCwxNy42NDYtMTEuMDQ0LDI4LjY3NWMwLDIzLjcxOCwxOS4yOTgsNDMuMDEyLDQzLjAxMiw0My4wMTJzNDMuMDEyLTE5LjI5NCw0My4wMTItNDMuMDEyYzAtMTEuMDI5LTQuMi0yMS4wNTktMTEuMDQ0LTI4LjY3NWg5My43NzZjLTYuODQ3LDcuNjE2LTExLjA0OCwxNy42NDYtMTEuMDQ4LDI4LjY3NWMwLDIzLjcxOCwxOS4yOTQsNDMuMDEyLDQzLjAxMyw0My4wMTJjMjMuNzE4LDAsNDMuMDEyLTE5LjI5NCw0My4wMTItNDMuMDEyYzAtMTEuMDI5LTQuMi0yMS4wNTktMTEuMDQzLTI4LjY3NWgxMy40MzNjNi41OTksMCwxMS45NDctNS4zNDksMTEuOTQ3LTExLjk0OGMwLTYuNTk5LTUuMzQ5LTExLjk0Ny0xMS45NDctMTEuOTQ3SDE0My42NDdsMTMuMzE5LTM2Ljk5NmMxLjcyLDAuNzI0LDMuNTc4LDEuMTUyLDUuNTIzLDEuMTUyaDIxMC4yNzhjNi4yMzQsMCwxMS43NTEtNC4wMjcsMTMuNjUtOS45NTlsNTkuNzM5LTE4Ni4zODdDNDQ3LjU1NywxMDEuNTY3LDQ0Ni43ODgsOTYuODAyLDQ0NC4wOSw5My4xMDN6IE0xNjkuNjU5LDQwOS44MDdjLTEwLjU0MywwLTE5LjExNi04LjU3My0xOS4xMTYtMTkuMTE2czguNTczLTE5LjExNywxOS4xMTYtMTkuMTE3czE5LjExNiw4LjU3NCwxOS4xMTYsMTkuMTE3UzE4MC4yMDIsNDA5LjgwNywxNjkuNjU5LDQwOS44MDd6IE0zMjcuMzY3LDQwOS44MDdjLTEwLjU0MywwLTE5LjExNy04LjU3My0xOS4xMTctMTkuMTE2czguNTc0LTE5LjExNywxOS4xMTctMTkuMTE3YzEwLjU0MiwwLDE5LjExNiw4LjU3NCwxOS4xMTYsMTkuMTE3UzMzNy45MDksNDA5LjgwNywzMjcuMzY3LDQwOS44MDd6IE00MDIuNTIsMTQ4LjE0OWgtNzMuMTYxVjExNS44OWg4My40OTlMNDAyLjUyLDE0OC4xNDl6IE0zODEuNDUzLDIxMy44NjFoLTUyLjA5NHYtMzcuMDM4aDYzLjk2N0wzODEuNDUzLDIxMy44NjF6IE0yMzQuNTcxLDIxMy44NjF2LTM3LjAzOGg2Ni4xMTN2MzcuMDM4SDIzNC41NzF6IE0zMDAuNjg0LDI0Mi41Mzh2MzEuMDY0aC02Ni4xMTN2LTMxLjA2NEgzMDAuNjg0eiBNMTM5LjExNSwxNzYuODIzaDY2Ljc4NHYzNy4wMzhoLTUzLjkzM0wxMzkuMTE1LDE3Ni44MjN6IE0yMzQuNTcxLDE0OC4xNDlWMTE1Ljg5aDY2LjExM3YzMi4yNTlIMjM0LjU3MXogTTIwNS44OTgsMTE1Ljg5djMyLjI1OWgtNzYuNzM0bC0xMS4xOTEtMzIuMjU5SDIwNS44OTh6IE0xNjEuOTE2LDI0Mi41MzhoNDMuOTgydjMxLjA2NGgtMzMuMjA2TDE2MS45MTYsMjQyLjUzOHogTTMyOS4zNTksMjczLjYwM3YtMzEuMDY0aDQyLjkwOWwtOS45NTUsMzEuMDY0SDMyOS4zNTl6Jyk7XHJcblxyXG5cdGcuYXBwZW5kQ2hpbGQocGF0aCk7XHJcblx0c3ZnLmFwcGVuZENoaWxkKGcpO1xyXG5cclxuXHRsZXQgIGRpdiA9IERPTS5jcmVhdGVFbGVtZW50KCdkaXYnLCB7XHJcblx0XHRpZDogJ2NhcnRJY29uJyxcclxuXHR9KTtcclxuXHJcblx0ZGl2LmFwcGVuZENoaWxkKHN2Zyk7XHJcblxyXG5cdHJldHVybiBkaXY7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBDcmVhdGVzIHRoZSBjYXJ0IGxvYWRlciBpY29uLlxyXG4gKlxyXG4gKiBAcmV0dXJuIFNWR1NWR0VsZW1lbnRcclxuICovXHJcbmZ1bmN0aW9uIGNyZWF0ZUxvYWRlcigpIHtcclxuXHRsZXQgc3ZnID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKFwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiwgXCJzdmdcIik7XHJcblx0bGV0IGNvdW50ID0gMTI7XHJcblx0bGV0IGdyb3VwcyA9IFtdO1xyXG5cdGxldCByZWN0YW5nZWxzID0gW107XHJcblx0bGV0IGFuaW1hdGlvbnMgPSBbXTtcclxuXHJcblx0c3ZnLnNldEF0dHJpYnV0ZSgnY2xhc3MnLCAnbGRzLXNwaW5uZXInKTtcclxuXHRzdmcuc2V0QXR0cmlidXRlKCd3aWR0aCcsICcyMDBweCcpO1xyXG5cdHN2Zy5zZXRBdHRyaWJ1dGUoJ2hlaWdodCcsICcyMDBweCcpO1xyXG5cdHN2Zy5zZXRBdHRyaWJ1dGUoJ3htbG5zJywgJ2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJyk7XHJcblx0c3ZnLnNldEF0dHJpYnV0ZSgneG1sbnM6eGxpbmsnLCAnaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluaycpO1xyXG5cdHN2Zy5zZXRBdHRyaWJ1dGUoJ3ZpZXdCb3gnLCAnMCAwIDEwMCAxMDAnKTtcclxuXHRzdmcuc2V0QXR0cmlidXRlKCdwcmVzZXJ2ZUFzcGVjdFJhdGlvJywgJ3hNaWRZTWlkJyk7XHJcblx0c3ZnLnNldEF0dHJpYnV0ZSgnc3R5bGUnLCAnYmFja2dyb3VuZDogbm9uZTsnKTtcclxuXHRcclxuXHR2YXIgcm90YXRpb24gPSAwO1xyXG5cclxuXHRmb3IgKHZhciBpID0gMDsgaSA8IGNvdW50OyBpKyspIHtcclxuXHRcdGxldCBncm91cCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnROUyhcImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIsIFwiZ1wiKTtcclxuXHRcdGdyb3VwLnNldEF0dHJpYnV0ZSgndHJhbnNmb3JtJywgJ3JvdGF0ZSgnICsgcm90YXRpb24gKyAnIDUwIDUwKScpO1xyXG5cdFx0cm90YXRpb24gKz0gMzA7XHJcblx0XHRncm91cHMucHVzaChncm91cCk7XHJcblx0fVxyXG5cclxuXHRmb3IgKHZhciBpID0gMDsgaSA8IGNvdW50OyBpKyspIHtcclxuXHRcdGxldCByZWN0YW5nZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50TlMoXCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiLCBcInJlY3RcIik7XHJcblx0XHRyZWN0YW5nZWwuc2V0QXR0cmlidXRlKCd4JywgJzQ3Jyk7XHJcblx0XHRyZWN0YW5nZWwuc2V0QXR0cmlidXRlKCd5JywgJzI0Jyk7XHJcblx0XHRyZWN0YW5nZWwuc2V0QXR0cmlidXRlKCdyeCcsICc5LjQnKTtcclxuXHRcdHJlY3RhbmdlbC5zZXRBdHRyaWJ1dGUoJ3J5JywgJzQuOCcpO1xyXG5cdFx0cmVjdGFuZ2VsLnNldEF0dHJpYnV0ZSgnd2lkdGgnLCAnNicpO1xyXG5cdFx0cmVjdGFuZ2VsLnNldEF0dHJpYnV0ZSgnaGVpZ2h0JywgJzEyJyk7XHJcblx0XHRyZWN0YW5nZWwuc2V0QXR0cmlidXRlKCdmaWxsJywgJyM0NjU4YWMnKTtcclxuXHRcdHJlY3RhbmdlbHMucHVzaChyZWN0YW5nZWwpO1xyXG5cdH1cclxuXHJcblx0dmFyIGJlZ2luID0gMC4wOSAqIDExO1xyXG5cclxuXHRmb3IgKHZhciBpID0gMDsgaSA8IGNvdW50OyBpKyspIHtcclxuXHRcdGxldCBhbmltYXRlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKFwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiwgXCJhbmltYXRlXCIpO1xyXG5cdFx0YW5pbWF0ZS5zZXRBdHRyaWJ1dGUoJ2F0dHJpYnV0ZU5hbWUnLCAnb3BhY2l0eScpO1xyXG5cdFx0YW5pbWF0ZS5zZXRBdHRyaWJ1dGUoJ3ZhbHVlcycsICcxOzAnKTtcclxuXHRcdGFuaW1hdGUuc2V0QXR0cmlidXRlKCd0aW1lcycsICcwOzEnKTtcclxuXHRcdGFuaW1hdGUuc2V0QXR0cmlidXRlKCdkdXInLCAnMXMnKTtcclxuXHRcdGFuaW1hdGUuc2V0QXR0cmlidXRlKCdiZWdpbicsIGJlZ2luLnRvRml4ZWQoOCkgKyAncycpO1xyXG5cdFx0YW5pbWF0ZS5zZXRBdHRyaWJ1dGUoJ3JlcGVhdENvdW50JywgJ2luZGVmaW5pdGUnKTtcclxuXHRcdGFuaW1hdGlvbnMucHVzaChhbmltYXRlKTtcclxuXHRcdGJlZ2luIC09IDAuMDk7XHJcblx0fVxyXG5cclxuXHRmb3IgKHZhciBpID0gMDsgaSA8IGdyb3Vwcy5sZW5ndGg7IGkrKykge1xyXG5cdFx0bGV0IGdyb3VwID0gZ3JvdXBzW2ldO1x0XHRcclxuXHRcdGxldCByZWN0YW5nZWwgPSByZWN0YW5nZWxzW2ldO1xyXG5cdFx0bGV0IGFuaW1hdGUgPSBhbmltYXRpb25zW2ldO1xyXG5cdFx0cmVjdGFuZ2VsLmFwcGVuZENoaWxkKGFuaW1hdGUpO1xyXG5cdFx0Z3JvdXAuYXBwZW5kQ2hpbGQocmVjdGFuZ2VsKTtcclxuXHRcdHN2Zy5hcHBlbmRDaGlsZChncm91cCk7XHJcblx0fVxyXG5cclxuXHRET00uYWRkQ2xhc3Moc3ZnLCAnY2FydC1sb2FkZXInKTtcclxuXHJcblx0cmV0dXJuIHN2ZztcdFxyXG59XG5cbi8qKlxyXG4gKiBAZmlsZSBcclxuICogRmlsdGVyIGNsYXNzLlxyXG4gKlxyXG4gKiBUaGUgRmlsdGVyIE9iamVjdCwgaGFuZGxlcyB0aGUgZmlsdGVyIG9mIHRoZSBwcm9kdWN0cy9zZXJ2aWNlcy5cclxuICovXHJcblxyXG4vKipcclxuICogVGhlIGRlZmF1bHQgc2V0dGluZ3Mgb2YgdGhlIGZpbHRlci5cclxuICovXHJcbmxldCBkZWZhdWx0U2V0dGluZ3MkMiA9IHtcclxuXHRlbGVtZW50OiAnLmZpbHRlcicsXHJcblx0Y2xhc3M6ICcnLFxyXG5cdHdpZHRoOiAnJyxcclxuXHRoZWlnaHQ6ICcnLFxyXG5cdG5vX2NzczogZmFsc2UsXHJcbn07XHJcblxyXG4vKipcclxuICogU3RvcmVzIHRoZSBjb250YWluZXIgb2JqZWN0LlxyXG4gKlxyXG4gKiBAdmFyIFxcQ29yZVxcQ29udGFpbmVyXHJcbiAqL1xyXG5sZXQgQ29udGFpbmVyJDM7XHJcblxyXG5jbGFzcyBGaWx0ZXIgXHJcbntcclxuXHQvKipcclxuXHQgKiAtIEluaXRpYWxpemUgdGhlIElvQyBjb250YWluZXIuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gXFxDb3JlXFxDb250YWluZXIgfCBjb250YWluZXJcclxuXHQgKiBAcmV0dXJuIHZvaWRcclxuXHQgKi9cclxuXHRjb25zdHJ1Y3Rvcihjb250YWluZXIpIFxyXG5cdHtcclxuXHRcdENvbnRhaW5lciQzID0gY29udGFpbmVyO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogU2V0dXAgdGhlIGZpbHRlciBjbGFzcy5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSBvYmplY3QgfCBzZXR0aW5nc1xyXG5cdCAqIEByZXR1cm4gdm9pZFxyXG5cdCAqL1xyXG5cdHNldHVwKHNldHRpbmdzKVxyXG5cdHtcclxuXHRcdGlmKHR5cGVvZiBzZXR0aW5ncyAhPSAnb2JqZWN0Jykge1xyXG5cdFx0XHR0aHJvdyBuZXcgSW52YWxpZEFyZ3VtZW50RXhjZXB0aW9uJDE7XHJcblx0XHR9XHJcblxyXG5cdFx0dGhpcy5zZXR0aW5ncyA9IENvbW1vbi5leHRlbmQoZGVmYXVsdFNldHRpbmdzJDIsIHNldHRpbmdzKTtcclxuXHJcblx0XHRkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgZnVuY3Rpb24oKSB7XHJcblxyXG5cdFx0XHR0aGlzLnNldEVsZW1lbnQodGhpcy5zZXR0aW5ncy5lbGVtZW50KTtcclxuXHJcblx0XHRcdHRoaXMuYWRkU3R5bGVUYWcoKTtcdFxyXG5cdFx0fS5iaW5kKHRoaXMpKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFNldHMgdGhlIGVsZW1lbnQgdG8gYmUgYm91bmQgdG8uXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gc3RyaW5nIHwgc2VsZWN0b3JcclxuXHQgKiBAcmV0dXJuIHZvaWRcclxuXHQgKi9cclxuXHRzZXRFbGVtZW50KHNlbGVjdG9yKVxyXG5cdHtcclxuXHRcdHRoaXMuZWxlbWVudCA9IERPTS5maW5kKHNlbGVjdG9yKTtcclxuXHRcdFxyXG5cdFx0RE9NLmFkZENsYXNzKHRoaXMuZWxlbWVudCwgdGhpcy5zZXR0aW5ncy5jbGFzcyk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBBZGQgdGhlIGVDb21tZXJjZSBzdHlsZSB0YWdzIHRvIHRoZSBET00uXHJcblx0ICovXHJcblx0YWRkU3R5bGVUYWcoKSBcclxuXHR7XHJcblx0XHRpZiAoRE9NLmZpbmQoJyNUdXJiby1lQ29tbWVyY2UtRmlsdGVyJykpIHtcclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0fVxyXG5cclxuXHRcdGlmICh0aGlzLnNldHRpbmdzLm5vX2Nzcykge1xyXG5cdFx0XHRyZXR1cm47XHJcblx0XHR9XHJcblxyXG5cdFx0bGV0IHdpZHRoID0gKHRoaXMuc2V0dGluZ3Mud2lkdGgpID8gJ3dpZHRoOicgKyB0aGlzLnNldHRpbmdzLndpZHRoICsgJzsnIDogJyc7XHJcblx0XHRsZXQgbWluV2lkdGggPSB0aGlzLnNldHRpbmdzLm1pbl93aWR0aCB8fCAnMjAwcHgnO1xyXG5cdFx0bGV0IGhlaWdodCA9IHRoaXMuc2V0dGluZ3MuaGVpZ2h0IHx8ICdhdXRvJztcclxuXHJcblx0XHRsZXQgY3NzID0gYFxyXG5cdFx0XHQke3RoaXMuc2V0dGluZ3MuZWxlbWVudH0ge1xyXG5cdFx0XHRcdHBvc2l0aW9uOiByZWxhdGl2ZTtcclxuXHRcdFx0XHRtYXJnaW46IDVweCA1cHg7XHJcblx0XHRcdFx0Ym9yZGVyOiAxcHggc29saWQgI2U0ZTRlNDtcclxuXHRcdFx0XHQke3dpZHRofVxyXG5cdFx0XHRcdG1pbi13aWR0aDogJHttaW5XaWR0aH07XHJcblx0XHRcdFx0aGVpZ2h0OiAke2hlaWdodH07XHJcblx0XHRcdFx0bWluLWhlaWdodDogMjAwcHg7XHJcblx0XHRcdFx0Y29sb3I6ICNmZmZmZmY7XHJcblx0XHRcdFx0b3ZlcmZsb3c6IGhpZGRlbjtcclxuXHRcdFx0fVxyXG5cclxuXHRcdGA7XHJcblx0ICAgIFxyXG5cdCAgICBET00uYWRkU3R5bGUoJ1R1cmJvLWVDb21tZXJjZS1GaWx0ZXInLCBjc3MpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogSGlkZXMgdGhlIGNvbXBvbmVudCBmcm9tIHRoZSBET00uXHJcblx0ICpcclxuXHQgKiBAcmV0dXJuIHZvaWQgXHJcblx0ICovXHJcblx0aGlkZSgpXHJcblx0e1xyXG5cdFx0dGhpcy5lbGVtZW50LnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcblx0fVxyXG59XG5cbi8vIEhlbHBlcnNcclxuLy8gRXhjZXB0aW9uc1xyXG4vKipcclxuICogQGZpbGUgXHJcbiAqIENhcnQgY2xhc3MuXHJcbiAqXHJcbiAqIEhhbmRsZXMgYWRkaW5nLCByZW1vdmluZyBldGMuLi4gb2YgaXRlbXMuXHJcbiAqL1xyXG5cclxuLyoqXHJcbiAqIFRoZSBkZWZhdWx0IHNldHRpbmdzIG9mIHRoZSBjYXJ0LlxyXG4gKlxyXG4gKiBAdmFyIG9iamVjdFxyXG4gKi9cclxubGV0IGRlZmF1bHRTZXR0aW5ncyQzID0ge1xyXG5cdGVsZW1lbnQ6ICcuY2hlY2tvdXQnLFxyXG5cdG5vX2NzczogZmFsc2UsXHJcbn07XHJcblxyXG4vKipcclxuICogU3RvcmVzIHRoZSBjb250YWluZXIgb2JqZWN0LlxyXG4gKlxyXG4gKiBAdmFyIFxcQ29yZVxcQ29udGFpbmVyXHJcbiAqL1xyXG5sZXQgQ29udGFpbmVyJDQ7XHJcblxyXG4vKipcclxuICogU3RvcmVzIHRoZSBldmVudCBtYW5hZ2VyIG9iamVjdC5cclxuICpcclxuICogQHZhciBcXENvcmVcXEV2ZW50TWFuYWdlclxyXG4gKi9cclxubGV0IEV2ZW50TWFuYWdlciQzO1xyXG5cclxuLyoqXHJcbiAqIFN0b3JlcyB0aGUgcmVxdWVzdCBvYmplY3QuXHJcbiAqXHJcbiAqIEB2YXIgXFxIZWxwZXJzXFxSZXF1ZXN0XHJcbiAqL1xyXG5sZXQgSHR0cCQxO1xyXG5cclxuXHJcbmNsYXNzIENoZWNrb3V0IFxyXG57XHJcblx0LyoqXHJcblx0ICogLSBJbml0aWFsaXplIHRoZSBJb0MgY29udGFpbmVyXHJcblx0ICogLSBJbml0aWFsaXplIHRoZSBSZXF1ZXN0XHJcblx0ICogLSBJbml0aWFsaXplIHRoZSBFdmVudE1hbmFnZXJcclxuXHQgKiAtIExpc3RlbiB0byBjaGVja291dCBldmVudC5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSBcXENvcmVcXENvbnRhaW5lciB8IGNvbnRhaW5lclxyXG5cdCAqIEBwYXJhbSBcXEhlbHBlcnNcXFJlcXVlc3QgfCBodHRwXHJcblx0ICogQHBhcmFtIFxcQ29yZVxcRXZlbnRNYW5hZ2VyIHwgZXZlbnRNYW5hZ2VyXHJcblx0ICogQHJldHVybiB2b2lkXHJcblx0ICovXHJcblx0Y29uc3RydWN0b3IoY29udGFpbmVyLCBodHRwLCBldmVudE1hbmFnZXIpIFxyXG5cdHtcclxuXHRcdENvbnRhaW5lciQ0ID0gY29udGFpbmVyO1xyXG5cdFx0SHR0cCQxID0gaHR0cDtcclxuXHRcdEV2ZW50TWFuYWdlciQzID0gZXZlbnRNYW5hZ2VyO1xyXG5cdFx0XHJcblx0XHRFdmVudE1hbmFnZXIkMy5zdWJzY3JpYmUoJ2NhcnQuY2hlY2tvdXQnLCBmdW5jdGlvbigpIHtcdFxyXG5cdFx0XHR0aGlzLmhpZGVBbGwoKTtcclxuXHRcdFx0dGhpcy5zaG93KCk7XHJcblx0XHR9LmJpbmQodGhpcykpO1x0XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBTZXRzIHRoZSBvYmplY3QgYnkgdGhlIHVzZXJzIHNldHRpbmcuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gb2JqZWN0IHwgc2V0dGluZ3NcclxuXHQgKiBAcmV0dXJuIHZvaWRcclxuXHQgKi9cclxuXHRzZXR1cChzZXR0aW5ncylcclxuXHR7XHJcblx0XHRpZiAodHlwZW9mIHNldHRpbmdzICE9ICdvYmplY3QnKSB7XHJcblx0XHRcdHRocm93IG5ldyBJbnZhbGlkQXJndW1lbnRFeGNlcHRpb24kMTtcclxuXHRcdH1cclxuXHJcblx0XHR0aGlzLnNldHRpbmdzID0gQ29tbW9uLmV4dGVuZChkZWZhdWx0U2V0dGluZ3MkMywgc2V0dGluZ3MpO1xyXG5cclxuXHRcdGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCBmdW5jdGlvbigpIHtcclxuXHJcblx0XHRcdHRoaXMuc2V0RWxlbWVudCh0aGlzLnNldHRpbmdzLmVsZW1lbnQpO1xyXG5cdFx0XHJcblx0XHRcdHRoaXMuYWRkU3R5bGVUYWcoKTtcclxuXHRcdH0uYmluZCh0aGlzKSk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBCaW5kcyBldmVydGhpbmcgdG8gdGhlIGVsZW1lbnQuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gc3RyaW5nIHwgc2VsZWN0b3JcclxuXHQgKiBAcmV0dXJuIHZvaWRcclxuXHQgKi9cclxuXHRzZXRFbGVtZW50KHNlbGVjdG9yKVxyXG5cdHtcclxuXHRcdHRoaXMuZWxlbWVudCA9IERPTS5maW5kKHNlbGVjdG9yKTtcclxuXHJcblx0XHRpZiAodGhpcy5lbGVtZW50KSB7XHJcblx0XHRcdERPTS5hZGRDbGFzcyh0aGlzLmVsZW1lbnQsIHRoaXMuc2V0dGluZ3MuY2xhc3MpO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQWRkIHRoZSBlQ29tbWVyY2Ugc3R5bGUgdGFncyB0byB0aGUgRE9NLlxyXG5cdCAqXHJcblx0ICogQHJldHVybiB2b2lkXHJcblx0ICovXHJcblx0YWRkU3R5bGVUYWcoKSBcclxuXHR7XHJcblx0XHRpZiAoRE9NLmZpbmQoJyNUdXJiby1lQ29tbWVyY2UtQ2hlY2tvdXQnKSkge1xyXG5cdFx0XHRyZXR1cm47XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKHRoaXMuc2V0dGluZ3Mubm9fY3NzKSB7XHJcblx0XHRcdHJldHVybjtcclxuXHRcdH1cclxuXHJcblx0XHRsZXQgcG9zaXRpb24gPSAodGhpcy5zZXR0aW5ncy5maXhlZCkgPyAnZml4ZWQnIDogJ2Fic29sdXRlJztcclxuXHJcblx0XHRsZXQgY3NzID0gYFxyXG5cdFx0XHQke3RoaXMuc2V0dGluZ3MuZWxlbWVudH0ge1xyXG5cdFx0XHRcdFxyXG5cdFx0XHR9XHJcblx0XHRgO1xyXG5cdCAgICBcclxuXHQgICAgRE9NLmFkZFN0eWxlKCdUdXJiby1lQ29tbWVyY2UtQ2hlY2tvdXQnLCBjc3MpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogSGlkZXMgYWxsIGlycmVsZXZhbnQgZWxlbWVudHMgZnJvbSB0aGUgRE9NLlxyXG5cdCAqXHJcblx0ICogQHJldHVybiB2b2lkIFxyXG5cdCAqL1xyXG5cdGhpZGVBbGwoKVxyXG5cdHtcclxuXHRcdGNvbnNvbGUubG9nKHRoaXMpO1xyXG5cdFx0Y29uc29sZS5sb2coQ29udGFpbmVyJDQuaW5zdGFuY2VzKCkpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogU2hvd3MgdGhlIGVsZW1lbnQgb24gdGhlIERPTS5cclxuXHQgKlxyXG5cdCAqIEByZXR1cm4gdm9pZCBcclxuXHQgKi9cclxuXHRzaG93KClcclxuXHR7XHJcblx0XHR0aGlzLmVsZW1lbnQuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XHJcblx0fVxyXG59XG5cbi8qKlxyXG4gKiBAZmlsZSBcclxuICogUHJvZHVjdHMgY2xhc3MuXHJcbiAqXHJcbiAqIFRoZSBQcm9kdWN0cyBjb21wb25lbnQsIGhhbmRsZXMgdGhlIHByb2R1Y3RzIHRhc2tzLlxyXG4gKi9cclxuXHJcblxyXG4vKipcclxuICogVGhlIGRlZmF1bHQgc2V0dGluZ3Mgb2YgZWFjaCBwcm9kdWN0LlxyXG4gKlxyXG4gKiBAdmFyIG9iamVjdFxyXG4gKi9cclxubGV0IGRlZmF1bHRTZXR0aW5ncyQ0ID0ge1xyXG5cdGVsZW1lbnQ6ICcucHJvZHVjdHMnLFxyXG5cdGNsYXNzOiAnJyxcclxuXHRpdGVtX2NsYXNzOiAnJyxcclxuXHRhZGRfYnV0dG9uX2NsYXNzOiAnYnRuIGJ0bi1wcmltYXJ5JyxcclxuXHRmYXZvcml0ZV9idXR0b25fY2xhc3M6ICdidG4gYnRuLWRhbmdlcicsXHJcblx0d2lkdGg6ICcyMDBweCcsXHJcblx0aGVpZ2h0OiAnMjUwcHgnLFxyXG5cdGF0dHJpYnV0ZXM6IFsnbmFtZScsICdwcmljZScsICdkZWxpdmVyeVRpbWUnLCAnaW1hZ2UnXSxcclxuXHR1cmw6ICdwcm9kdWN0cy5waHAnLFxyXG5cdG5vX2NzczogZmFsc2UsXHJcbn07XHJcblxyXG4vKipcclxuICogU3RvcmVzIHRoZSBjb250YWluZXIgb2JqZWN0LlxyXG4gKiBcclxuICogQHZhciBcXENvcmVcXENvbnRhaW5lclxyXG4gKi9cclxubGV0IENvbnRhaW5lciQ1O1xyXG5cclxuLyoqXHJcbiAqIFN0b3JlcyB0aGUgY29udGFpbmVyIG9iamVjdC5cclxuICogXHJcbiAqIEB2YXIgXFxDb3JlXFxFdmVudE1hbmFnZXJcclxuICovXHJcbmxldCBFdmVudE1hbmFnZXIkNDtcclxuXHJcbi8qKlxyXG4gKiBTdG9yZXMgdGhlIHJlcXVlc3Qgb2JqZWN0LlxyXG4gKiBcclxuICogQHZhciBcXEhlbHBlclxcUmVxdWVzdCBcclxuICovXHJcbmxldCBIdHRwJDI7XHJcblxyXG4vKipcclxuICogU3RvcmVzIHRoZSBjaHVua2VkIHBlciBcclxuICogcGFnZSBwcm9kdWN0cy5cclxuICogXHJcbiAqIEB2YXIgYXJyYXlcclxuICovXHJcbmxldCBjaHVua2VkUHJvZHVjdHM7XHJcblxyXG5jbGFzcyBQcm9kdWN0cyBcclxue1xyXG5cdC8qKlxyXG5cdCAqIEluaXRhbGl6ZSB0aGUgQ29udGFpbmVyLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIFxcQ29yZVxcQ29udGFpbmVyIHwgY29udGFpbmVyXHJcblx0ICogQHBhcmFtIFxcSGVscGVyc1xcUmVxdWVzdCB8IGh0dHBcclxuXHQgKiBAcmV0dXJuIHZvaWRcclxuXHQgKi9cclxuXHRjb25zdHJ1Y3Rvcihjb250YWluZXIsIGh0dHAsIGV2ZW50TWFuYWdlcikgXHJcblx0e1xyXG5cdFx0Q29udGFpbmVyJDUgPSBjb250YWluZXI7XHJcblx0XHRIdHRwJDIgPSBodHRwO1xyXG5cdFx0RXZlbnRNYW5hZ2VyJDQgPSBldmVudE1hbmFnZXI7XHJcblx0XHRjaHVua2VkUHJvZHVjdHMgPSBbXTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFNldHMgdGhlIGdpdmVuIHNldHRpbmdzIGZyb20gdGhlIHVzZXIuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gb2JqZWN0IHwgc2V0dGluZ3NcclxuXHQgKiBAcmV0dXJuIHZvaWRcclxuXHQgKi9cclxuXHRzZXR1cChzZXR0aW5ncylcclxuXHR7XHJcblx0XHRpZiAodHlwZW9mIHNldHRpbmdzICE9ICdvYmplY3QnKSB7XHJcblx0XHRcdHRocm93IG5ldyBJbnZhbGlkQXJndW1lbnRFeGNlcHRpb24kMTtcclxuXHRcdH1cclxuXHJcblx0XHR0aGlzLnNldHRpbmdzID0gQ29tbW9uLmV4dGVuZChkZWZhdWx0U2V0dGluZ3MkNCwgc2V0dGluZ3MpO1xyXG5cdFx0dGhpcy50b3RhbEl0ZW1zID0gbnVsbDtcclxuXHJcblx0XHRkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgZnVuY3Rpb24oKSB7XHJcblxyXG5cdFx0XHR0aGlzLnNldEVsZW1lbnQodGhpcy5zZXR0aW5ncy5lbGVtZW50KTtcclxuXHJcblx0XHRcdHRoaXMuYWRkU3R5bGVUYWcoKTtcdFxyXG5cclxuXHRcdFx0dGhpcy5sb2FkUHJvZHVjdHMoMSk7XHJcblx0XHR9LmJpbmQodGhpcykpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogTG9hZHMgdGhlIHByb2R1Y3RzIGZvciB0aGUgcGFnZS5cclxuXHQgKiBcclxuXHQgKiBAcGFyYW0gbnVtYmVyIHwgcGFnZU51bWJlclxyXG5cdCAqIEByZXR1cm4gdm9pZFxyXG5cdCAqL1xyXG5cdGxvYWRQcm9kdWN0cyhwYWdlTnVtYmVyID0gMSlcclxuXHR7XHJcblx0XHRpZiAoQ29udGFpbmVyJDUuUGFnaW5hdGlvbiAmJiBDb250YWluZXIkNS5QYWdpbmF0aW9uLmJvb3RlZCkge1xyXG5cdFx0XHRzd2l0Y2goQ29udGFpbmVyJDUuUGFnaW5hdGlvbi5zZXR0aW5ncy5wcm9jY2Vzc2luZykgXHJcblx0XHRcdHtcclxuXHRcdFx0XHRjYXNlICdjbGllbnQtc2lkZSc6XHJcblx0XHRcdFx0XHRyZXR1cm4gdGhpcy5sb2FkUGFnZVByb2R1Y3RzQnlDbGllbnQocGFnZU51bWJlcik7XHJcblx0XHRcdFx0XHRicmVhaztcclxuXHRcdFx0XHRjYXNlICdzZXJ2ZXItc2lkZSc6XHJcblx0XHRcdFx0XHRyZXR1cm4gdGhpcy5sb2FkUGFnZVByb2R1Y3RzQnlTZXJ2ZXIocGFnZU51bWJlcik7XHJcblx0XHRcdFx0XHRicmVhaztcclxuXHRcdFx0XHRkZWZhdWx0OlxyXG5cdFx0XHRcdFx0dGhyb3cgbmV3IEludmFsaWRBcmd1bWVudEV4Y2VwdGlvbiQxKCdmb3IgcHJvY2Nlc3NpbmcgeW91IGNhbiBjaG9vc2UgXFwnc2VydmVyLXNpZGVcXCcgb3IgXFwnY2xpZW50LXNpZGVcXCcgb3B0aW9ucy4nKTtcclxuXHRcdFx0fVxyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0dGhpcy5sb2FkUGFnZVByb2R1Y3RzQnlTZXJ2ZXIoKTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIExvYWRzIHRoZSBwcm9kdWN0cyBhbmQgXHJcblx0ICogcmVwbGFjZSB0aGVtIGluIHRoZSBkaXYgY29udGFpbmVyLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIG51bWJlciB8IHBhZ2VOdW1iZXJcclxuXHQgKiBAcmV0dXJuIHZvaWRcclxuXHQgKi9cclxuXHRsb2FkUGFnZVByb2R1Y3RzQnlTZXJ2ZXIocGFnZU51bWJlciA9IG51bGwpXHJcblx0e1xyXG5cdFx0bGV0IHJlcXVlc3QgPSB0aGlzLmdldFByb2R1Y3RzKHBhZ2VOdW1iZXIpO1xyXG5cclxuXHRcdHJlcXVlc3QudGhlbihmdW5jdGlvbihwcm9kdWN0cykge1xyXG5cclxuXHRcdFx0dGhpcy5jdXJyZW50SXRlbXMgPSBwcm9kdWN0cztcclxuXHJcblx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5jdXJyZW50SXRlbXMubGVuZ3RoOyBpKyspIHtcclxuXHRcdFx0XHR2YXIgcHJvZHVjdCA9IHRoaXMuY3VycmVudEl0ZW1zW2ldO1xyXG5cdFx0XHRcdEV2ZW50TWFuYWdlciQ0LnB1Ymxpc2goJ3Byb2R1Y3RzLmxvYWRpbmcnLCBwcm9kdWN0KTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0RXZlbnRNYW5hZ2VyJDQucHVibGlzaCgncHJvZHVjdHMubG9hZGVkJywgcHJvZHVjdHMpO1xyXG5cdFx0XHR0aGlzLnJlcGxhY2VJdGVtcyhwcm9kdWN0cyk7XHJcblx0XHRcdHJlc29sdmUoKTtcclxuXHRcdH0uYmluZCh0aGlzKSkuY2F0Y2goZnVuY3Rpb24oZXJyb3IpIHtcclxuXHJcblx0XHR9KTtcclxuXHJcblx0XHRyZXR1cm4gcmVxdWVzdDtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIExvYWRzIHRoZSBwcm9kdWN0cyBhbmQgXHJcblx0ICogcmVwbGFjZSB0aGVtIGluIHRoZSBkaXYgY29udGFpbmVyLlxyXG5cdCAqXHJcblx0ICogQHJldHVybiB2b2lkXHJcblx0ICovXHJcblx0bG9hZFBhZ2VQcm9kdWN0c0J5Q2xpZW50KHBhZ2VOdW1iZXIpXHJcblx0e1xyXG5cdFx0bGV0IHJlcXVlc3Q7XHJcblxyXG5cdFx0aWYgKHRoaXMudG90YWxJdGVtcyA9PSBudWxsKSB7IC8vIG5lZWQgdG8gZmV0Y2ggdGhlbSBmcm9tIHRoZSBzZXJ2ZXIuXHJcblx0XHRcdHJlcXVlc3QgPSB0aGlzLmdldFByb2R1Y3RzKCk7XHJcblx0XHR9IGVsc2UgeyAvLyBubyBuZWVkIHRvIHdhaXQgY2FuIHJlc29sdmUgaW1tZWRpYXRlbHkgd2l0aCB0aGUgcHJvZHVjdHMuIFxyXG5cdFx0XHRyZXF1ZXN0ID0gUHJvbWlzZS5yZXNvbHZlKHRoaXMudG90YWxJdGVtcyk7XHJcblx0XHR9XHJcblxyXG5cdFx0cmVxdWVzdC50aGVuKGZ1bmN0aW9uKHByb2R1Y3RzKSB7XHJcblx0XHRcdHRoaXMudG90YWxJdGVtcyA9IHByb2R1Y3RzO1xyXG5cclxuXHRcdFx0bGV0IHBhZ2VzID0gdGhpcy5jYWxjdWxhdGVDbGllbnRQYWdlcyhwcm9kdWN0cyk7XHJcblxyXG5cdFx0XHR0aGlzLmN1cnJlbnRJdGVtcyA9IHBhZ2VzW3BhZ2VOdW1iZXItMV07XHJcblxyXG5cdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuY3VycmVudEl0ZW1zLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdFx0dmFyIHByb2R1Y3QgPSB0aGlzLmN1cnJlbnRJdGVtc1tpXTtcclxuXHRcdFx0XHRFdmVudE1hbmFnZXIkNC5wdWJsaXNoKCdwcm9kdWN0cy5sb2FkaW5nJywgcHJvZHVjdCk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdEV2ZW50TWFuYWdlciQ0LnB1Ymxpc2goJ3Byb2R1Y3RzLmxvYWRlZCcsIHByb2R1Y3RzKTtcclxuXHRcdFx0dGhpcy5yZXBsYWNlSXRlbXModGhpcy5jdXJyZW50SXRlbXMpO1xyXG5cdFx0XHRQcm9taXNlLnJlc29sdmUodGhpcy5jdXJyZW50SXRlbXMpO1xyXG5cclxuXHRcdH0uYmluZCh0aGlzKSkuY2F0Y2goZnVuY3Rpb24oZXJyb3IpIHtcclxuXHJcblx0XHR9KTtcclxuXHJcblx0XHRyZXR1cm4gcmVxdWVzdDtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIENhbGN1bGF0ZXMgdGhlIGFtb3VudCBvZiBwYWdlcyBmb3IgdGhlIGNsaWVudC5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSBhcnJheSB8IHByb2R1Y3RzXHJcblx0ICogQHJldHVybiBhcnJheVxyXG5cdCAqL1xyXG5cdGNhbGN1bGF0ZUNsaWVudFBhZ2VzKHByb2R1Y3RzKVxyXG5cdHtcdFxyXG5cdFx0Ly8gV2UgYXJlIHVzaW5nIHBhZ2luYXRpb24gc28gd2UgbmVlZCB0byB1cGRhdGUgaXQgdG9vLlxyXG5cdFx0Q29udGFpbmVyJDUuUGFnaW5hdGlvbi5zZXR0aW5ncy50b3RhbF9pdGVtcyA9IHByb2R1Y3RzLmxlbmd0aDtcclxuXHRcdFxyXG5cdFx0bGV0IHBlclBhZ2UgPSBDb250YWluZXIkNS5QYWdpbmF0aW9uLnNldHRpbmdzLnBlcl9wYWdlOyBcclxuXHJcblx0XHQvLyBXZSBuZWVkIHRvIGNhbGN1bGF0ZSB0aGUgcGFnZXMgb24gZnVsbCBodHRwIHJlcXVlc3QgXHJcblx0XHQvLyBvbmx5IG9uY2UuIHNvIHdlIGNoZWNrIHRvIHNlZSBpZiB3ZSBoYXZlIHJlc3VsdHMgaW4gb3VyIGNhY2hlLlxyXG5cdFx0aWYgKGNodW5rZWRQcm9kdWN0cy5sZW5ndGggIT0gMCkge1xyXG5cdFx0XHRyZXR1cm4gY2h1bmtlZFByb2R1Y3RzO1xyXG5cdFx0fVxyXG5cclxuXHRcdGNodW5rZWRQcm9kdWN0cyA9IENvbW1vbi5hcnJheV9jaHVuayhwcm9kdWN0cywgcGVyUGFnZSk7XHJcblx0XHRyZXR1cm4gY2h1bmtlZFByb2R1Y3RzO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogU2V0cyB0aGUgRE9NIGVsZW1lbnQgXHJcblx0ICogZm9yIHBvcHVsYXRpbmcgdGhlIHByb2R1Y3RzLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIHN0cmluZyB8IHNlbGVjdG9yXHJcblx0ICogQHJldHVybiB2b2lkXHJcblx0ICovXHJcblx0c2V0RWxlbWVudChzZWxlY3RvcilcclxuXHR7XHJcblx0XHR0aGlzLmVsZW1lbnQgPSBET00uZmluZChzZWxlY3Rvcik7XHJcblxyXG5cdFx0aWYgKHRoaXMuZWxlbWVudCkge1xyXG5cdFx0XHRET00uYWRkQ2xhc3ModGhpcy5lbGVtZW50LCB0aGlzLnNldHRpbmdzLmNsYXNzKTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFJlcGxhY2UgaXRlbXMgaW4gXHJcblx0ICogdGhlIHByb2R1Y3RzIGNvbnRhaW5lci5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSBhcnJheSB8IGl0ZW1zXHJcblx0ICogQHJldHVybiBhcnJheVxyXG5cdCAqL1xyXG5cdHJlcGxhY2VJdGVtcyhpdGVtcykgXHJcblx0e1xyXG5cdFx0aWYgKCEgQXJyYXkuaXNBcnJheShpdGVtcykgfHwgKGl0ZW1zLmxlbmd0aCA8PSAwICYmIHR5cGVvZiBpdGVtc1swXSA9PSAnc3RyaW5nJykpIHtcclxuXHRcdFx0dGhyb3cgbmV3IEludmFsaWRBcmd1bWVudEV4Y2VwdGlvbiQxO1xyXG5cdFx0fVxyXG5cclxuXHRcdGxldCBwcm9kdWN0cyA9IHRoaXMuYnVpbGRQcm9kdWN0cyhpdGVtcywgdGhpcy5zZXR0aW5ncy5pdGVtX2NsYXNzLCAnZGl2Jyk7XHJcblxyXG5cdFx0dGhpcy5lbGVtZW50LmlubmVySFRNTCA9ICcnO1xyXG5cdFx0cHJvZHVjdHMuZm9yRWFjaChmdW5jdGlvbihwcm9kdWN0KSB7XHJcblx0XHRcdHRoaXMuZWxlbWVudC5hcHBlbmRDaGlsZChwcm9kdWN0KTtcclxuXHRcdH0uYmluZCh0aGlzKSk7XHJcblxyXG5cdFx0cmV0dXJuIGl0ZW1zO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogTWFrZXMgYW4gQWpheCBjYWxsIHRvIHRoZSBcclxuXHQgKiBzZXJ2ZXIgd2l0aG91dCBwYXJhbWV0ZXJzLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIG51bWJlciB8IHBhZ2VOdW1iZXJcclxuXHQgKiBAcmV0dXJuIFByb21pc2VcclxuXHQgKi9cclxuXHRnZXRQcm9kdWN0cyhwYWdlTnVtYmVyID0gbnVsbClcclxuXHR7XHJcblx0XHRsZXQgYWN0aW9uID0gKHBhZ2VOdW1iZXIpID8gdGhpcy5zZXR0aW5ncy51cmwgKyAnP3BhZ2U9JyArIHBhZ2VOdW1iZXIgOiB0aGlzLnNldHRpbmdzLnVybDtcclxuXHJcblx0XHRyZXR1cm4gSHR0cCQyLmdldCh7XHJcblx0XHRcdHVybDogYWN0aW9uLFxyXG5cdFx0fSk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBCdWlsZHMgdGhlIGh0bWwgZm9yIHRoZSBwcm9kdWN0cy5cclxuXHQgKiBcclxuXHQgKiBAcGFyYW0gYXJyYXkgfCBhdHRyaWJ1dGVzQ29sbGVjdGlvblxyXG5cdCAqIEBwYXJhbSBzdHJpbmcgfCBjbGFzc05hbWVcclxuXHQgKiBAcGFyYW0gc3RyaW5nIHwgdGFnVHlwZVxyXG5cdCAqIEByZXR1cm4gYXJyYXlcclxuXHQgKi9cclxuXHRidWlsZFByb2R1Y3RzKGF0dHJpYnV0ZXNDb2xsZWN0aW9uLCBjbGFzc05hbWUsIHRhZ1R5cGUpIFxyXG5cdHtcclxuXHRcdGlmKGF0dHJpYnV0ZXNDb2xsZWN0aW9uLmNvbnN0cnVjdG9yLm5hbWUgIT0gJ0FycmF5JyApIHtcclxuXHRcdFx0dGhyb3cgbmV3IEludmFsaWRBcmd1bWVudEV4Y2VwdGlvbiQxO1xyXG5cdFx0fVxyXG5cclxuXHRcdGxldCBidWlsdFByb2R1Y3RzID0gW107XHJcblxyXG5cdFx0YXR0cmlidXRlc0NvbGxlY3Rpb24uZm9yRWFjaChmdW5jdGlvbihhdHRyaWJ1dGVzKSB7XHJcblx0XHRcdGxldCBidWlsdFByb2R1Y3QgPSB0aGlzLmJ1aWxkUHJvZHVjdChhdHRyaWJ1dGVzLCBjbGFzc05hbWUsIHRhZ1R5cGUpO1xyXG5cdFx0XHRidWlsdFByb2R1Y3RzLnB1c2goYnVpbHRQcm9kdWN0KTtcclxuXHRcdH0uYmluZCh0aGlzKSk7XHJcblxyXG5cdFx0cmV0dXJuIGJ1aWx0UHJvZHVjdHM7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBCdWlsZHMgdGhlIGh0bWwgZm9yIGEgc2luZ2xlIHByb2R1Y3QuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gb2JqZWN0IHwgYXR0cmlidXRlc1xyXG5cdCAqIEBwYXJhbSBzdHJpbmcgfCBjbGFzc05hbWVcclxuXHQgKiBAcGFyYW0gc3RyaW5nIHwgdGFnVHlwZVxyXG5cdCAqIEByZXR1cm4gb2JqZWN0XHJcblx0ICovXHJcblx0YnVpbGRQcm9kdWN0KGF0dHJpYnV0ZXMsIGNsYXNzTmFtZSwgdGFnVHlwZSkgXHJcblx0e1xyXG5cdFx0aWYgKHR5cGVvZiBhdHRyaWJ1dGVzICE9ICdvYmplY3QnIHx8IHR5cGVvZiB0YWdUeXBlICE9ICdzdHJpbmcnKSB7XHJcblx0XHRcdHRocm93IG5ldyBJbnZhbGlkQXJndW1lbnRFeGNlcHRpb24kMTtcclxuXHRcdH1cclxuXHJcblx0XHRjbGFzc05hbWUgPSBjbGFzc05hbWUgfHwgbnVsbDtcclxuXHJcblx0XHRsZXQgcHJvZHVjdCA9IERPTS5jcmVhdGVFbGVtZW50KCdkaXYnLCB7XHJcblx0XHRcdGNsYXNzOiAncHJvZHVjdCdcclxuXHRcdH0pO1xyXG5cclxuXHRcdERPTS5hZGRDbGFzcyhwcm9kdWN0LCBjbGFzc05hbWUpO1xyXG5cclxuXHRcdGxldCBvdmVybGF5ID0gRE9NLmNyZWF0ZUVsZW1lbnQoJ2RpdicsIHtcclxuXHRcdFx0Y2xhc3M6ICdwcm9kdWN0LW92ZXJsYXknLFxyXG5cdFx0fSk7XHJcblxyXG5cdFx0cHJvZHVjdC5hcHBlbmRDaGlsZChvdmVybGF5KTtcclxuXHJcblx0XHRmb3IgKHZhciBhdHRyaWJ1dGUgaW4gYXR0cmlidXRlcykge1xyXG5cdFx0XHRpZiAoISBDb21tb24uaW5fYXJyYXkoYXR0cmlidXRlLCB0aGlzLnNldHRpbmdzLmF0dHJpYnV0ZXMpKSB7XHJcblx0XHRcdFx0Y29udGludWU7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGxldCB0YWcgPSBET00uY3JlYXRlRWxlbWVudCh0YWdUeXBlKTtcclxuXHJcblx0XHRcdGlmIChhdHRyaWJ1dGUgPT0gJ2ltYWdlJykge1xyXG5cdFx0XHRcdGxldCBpbWFnZSA9IERPTS5jcmVhdGVFbGVtZW50KCdpbWcnLCB7XHJcblx0XHRcdFx0XHRzcmM6IGF0dHJpYnV0ZXNbYXR0cmlidXRlXVxyXG5cdFx0XHRcdH0pO1xyXG5cdFx0XHRcdHByb2R1Y3QuYXBwZW5kQ2hpbGQoaW1hZ2UpO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdHRhZy5pbm5lckhUTUwgPSBhdHRyaWJ1dGVzW2F0dHJpYnV0ZV0gfHwgJyc7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdERPTS5hZGRDbGFzcyh0YWcsICdwcm9kdWN0LScgKyBTdHIua2ViYWJDYXNlKGF0dHJpYnV0ZSkpO1xyXG5cdFx0XHRvdmVybGF5LmFwcGVuZENoaWxkKHRhZyk7XHJcblx0XHR9XHJcblxyXG5cdFx0bGV0IHRhZyA9IERPTS5jcmVhdGVFbGVtZW50KCdkaXYnLCB7XHJcblx0XHRcdGNsYXNzOiAnYWN0aW9uLWJ1dHRvbnMnXHJcblx0XHR9KTtcclxuXHJcblx0XHRsZXQgYWRkVG9DYXJ0ID0gRE9NLmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicsIHtcclxuXHRcdFx0Y2xhc3M6ICdhZGQtdG8tY2FydCcsXHJcblx0XHRcdHR5cGU6ICdidXR0b24nLFxyXG5cdFx0XHR0ZXh0OiAnKycsXHJcblx0XHR9KTtcclxuXHJcblx0XHRsZXQgZmF2b3JpdGUgPSBET00uY3JlYXRlRWxlbWVudCgnYnV0dG9uJywge1xyXG5cdFx0XHRjbGFzczogJ2Zhdm9yaXRlJyxcclxuXHRcdFx0dHlwZTogJ2J1dHRvbicsXHJcblx0XHRcdHRleHQ6ICcmaGVhcnRzOydcclxuXHRcdH0pO1xyXG5cclxuXHRcdGlmICh0aGlzLnNldHRpbmdzLmFkZF9idXR0b25fY2xhc3MpIHtcclxuXHRcdFx0RE9NLmFkZENsYXNzKGFkZFRvQ2FydCwgdGhpcy5zZXR0aW5ncy5hZGRfYnV0dG9uX2NsYXNzKTtcclxuXHRcdH1cclxuXHJcblx0XHRpZiAodGhpcy5zZXR0aW5ncy5mYXZvcml0ZV9idXR0b25fY2xhc3MpIHtcclxuXHRcdFx0RE9NLmFkZENsYXNzKGZhdm9yaXRlLCB0aGlzLnNldHRpbmdzLmZhdm9yaXRlX2J1dHRvbl9jbGFzcyk7XHJcblx0XHR9XHJcblxyXG5cdFx0dGFnLmFwcGVuZENoaWxkKGFkZFRvQ2FydCk7XHJcblx0XHR0YWcuYXBwZW5kQ2hpbGQoZmF2b3JpdGUpO1xyXG5cclxuXHRcdGFkZFRvQ2FydC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcclxuXHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdFx0XHRFdmVudE1hbmFnZXIkNC5wdWJsaXNoKCdjYXJ0LnByb2R1Y3QuYWRkZWQnLCBhdHRyaWJ1dGVzKTtcclxuXHRcdH0pO1xyXG5cclxuXHRcdGZhdm9yaXRlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xyXG5cdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XHJcblx0XHRcdHRoaXMuaW5uZXJIVE1MID0gJyYjeDI3MTM7JztcclxuXHRcdFx0RXZlbnRNYW5hZ2VyJDQucHVibGlzaCgnY2FydC5wcm9kdWN0LmZhdm9yaXRlZCcsIGF0dHJpYnV0ZXMpO1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0b3ZlcmxheS5hcHBlbmRDaGlsZCh0YWcpO1xyXG5cclxuXHRcdHJldHVybiBwcm9kdWN0O1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQWRkIHRoZSBlQ29tbWVyY2Ugc3R5bGUgdGFncyB0byB0aGUgRE9NLlxyXG5cdCAqL1xyXG5cdGFkZFN0eWxlVGFnKCkgXHJcblx0e1xyXG5cdFx0aWYgKERPTS5maW5kKCcjVHVyYm8tZUNvbW1lcmNlLVByb2R1Y3RzJykpIHtcclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0fVxyXG5cclxuXHRcdGlmICh0aGlzLnNldHRpbmdzLm5vX2Nzcykge1xyXG5cdFx0XHRyZXR1cm47XHJcblx0XHR9XHJcblxyXG5cdFx0bGV0IHdpZHRoID0gdGhpcy5zZXR0aW5ncy53aWR0aCB8fCAnYXV0byc7XHJcblx0XHRsZXQgaGVpZ2h0ID0gdGhpcy5zZXR0aW5ncy5oZWlnaHQgfHwgJzIwMHB4JztcclxuXHRcdGxldCBtaW5XaWR0aCA9IHRoaXMuc2V0dGluZ3MubWluX3dpZHRoIHx8ICcyMDBweCc7XHJcblx0XHRsZXQgbWF4V2lkdGggPSB0aGlzLnNldHRpbmdzLm1heF93aWR0aCB8fCAnMjUwcHgnO1xyXG5cclxuXHRcdGxldCBjc3MgPSBgXHJcblx0XHRcdC5wcm9kdWN0IHtcclxuXHRcdFx0XHRwb3NpdGlvbjogcmVsYXRpdmU7XHJcblx0XHRcdFx0bWFyZ2luOiA1cHggNXB4O1xyXG5cdFx0XHRcdGJvcmRlcjogMXB4IHNvbGlkICNlNGU0ZTQ7XHJcblx0XHRcdFx0d2lkdGg6ICR7d2lkdGh9O1xyXG5cdFx0XHRcdG1pbi13aWR0aDogJHttaW5XaWR0aH07XHJcblx0XHRcdFx0bWF4LXdpZHRoOiAke21heFdpZHRofTtcclxuXHRcdFx0XHRoZWlnaHQ6ICR7aGVpZ2h0fTtcclxuXHRcdFx0XHRjdXJzb3I6IHBvaW50ZXI7XHJcblx0XHRcdFx0Y29sb3I6ICNmZmZmZmY7XHJcblx0XHRcdFx0b3ZlcmZsb3c6IGhpZGRlbjtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0LnByb2R1Y3QgPiAucHJvZHVjdC1vdmVybGF5IHtcclxuXHRcdFx0XHRwb3NpdGlvbjogYWJzb2x1dGU7XHJcblx0XHRcdFx0dG9wOiAwO1xyXG5cdFx0XHRcdGxlZnQ6IDA7XHJcblx0XHRcdFx0d2lkdGg6IDEwMCU7XHJcblx0XHRcdFx0aGVpZ2h0OiAxMDAlO1xyXG5cdFx0XHRcdG9wYWNpdHk6IDAuNTtcclxuXHRcdFx0XHR6LWluZGV4OiA1O1xyXG5cdFx0XHRcdHRyYW5zaXRpb246IDFzIGFsbDtcclxuXHRcdFx0XHR0cmFuc2Zvcm06IHRyYW5zbGF0ZVgoLTI1MHB4KTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0LnByb2R1Y3Q6aG92ZXIgPiAucHJvZHVjdC1vdmVybGF5IHtcclxuXHRcdFx0XHRiYWNrZ3JvdW5kOiByZ2JhKDAsIDAsIDAsIDAuNDUpO1xyXG5cdFx0XHRcdHRyYW5zZm9ybTogdHJhbnNsYXRlWCgwcHgpO1xyXG5cdFx0XHRcdG9wYWNpdHk6IDE7XHJcblx0XHRcdFx0dHJhbnNpdGlvbjogMC41cyBhbGw7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdC5wcm9kdWN0ID4gaW1nIHtcclxuXHRcdFx0XHRwb3NpdGlvbjogYWJzb2x1dGU7XHJcblx0XHRcdFx0bGVmdDogMDtcclxuXHRcdFx0XHR0b3A6IDA7XHJcblx0XHRcdFx0d2lkdGg6IDEwMCU7XHJcblx0XHRcdFx0aGVpZ2h0OiAxMDAlO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHQucHJvZHVjdCA+IC5wcm9kdWN0LWltYWdlIHtcclxuXHRcdFx0XHR6LWluZGV4OiAwO1xyXG5cdFx0XHRcdHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuXHRcdFx0XHR0b3A6IDA7XHJcblx0XHRcdFx0bGVmdDogMDtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0LnByb2R1Y3QgPiAucHJvZHVjdC1vdmVybGF5ID4gLnByb2R1Y3QtbmFtZSwgXHJcblx0XHRcdC5wcm9kdWN0ID4gLnByb2R1Y3Qtb3ZlcmxheSA+IC5wcm9kdWN0LXByaWNlLFxyXG5cdFx0XHQucHJvZHVjdCA+IC5wcm9kdWN0LW92ZXJsYXkgPiAucHJvZHVjdC1kZWxpdmVyeS10aW1lIHtcclxuXHRcdFx0XHR6LWluZGV4OiAxO1xyXG5cdFx0XHRcdHBvc2l0aW9uOiByZWxhdGl2ZTtcclxuXHRcdFx0XHR0ZXh0LWFsaWduOiBjZW50ZXI7XHJcblx0XHRcdFx0bWFyZ2luLXRvcDogMjVweDtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0LnByb2R1Y3QgPiAucHJvZHVjdC1vdmVybGF5ID4gLmFjdGlvbi1idXR0b25zIHtcclxuXHRcdFx0XHR3aWR0aDogMTAwJTtcclxuXHRcdFx0XHRtYXJnaW4tdG9wOiAxMHB4O1xyXG5cdFx0XHRcdHRleHQtYWxpZ246IGNlbnRlcjtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0LnByb2R1Y3QgPiAucHJvZHVjdC1vdmVybGF5ID4gLmFjdGlvbi1idXR0b25zID4gLmZhdm9yaXRlIHtcclxuXHRcdFx0XHRtYXJnaW4tbGVmdDogMTBweDtcclxuXHRcdFx0fVxyXG5cclxuXHRcdGA7XHJcblx0ICAgIFxyXG5cdCAgICBET00uYWRkU3R5bGUoJ1R1cmJvLWVDb21tZXJjZS1Qcm9kdWN0cycsIGNzcyk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBIaWRlcyB0aGUgY29tcG9uZW50IGZyb20gdGhlIERPTS5cclxuXHQgKlxyXG5cdCAqIEByZXR1cm4gdm9pZCBcclxuXHQgKi9cclxuXHRoaWRlKClcclxuXHR7XHJcblx0XHR0aGlzLmVsZW1lbnQuc3R5bGUuZGlzcGxheSA9ICdub25lJztcclxuXHR9XHJcbn1cblxuLyoqXHJcbiAqIFRoZSBTZXJ2aWNlcyBPYmplY3QsIGhhbmRsZXMgdGhlIHNlcnZpY2VzLlxyXG4gKi9cclxuY2xhc3MgU2VydmljZXMgXHJcbntcclxuXHJcbn1cblxubGV0IGRlZmF1bHRNZXNzYWdlJDUgPSAnU29ycnksIG5vIG1vcmUgcGFnZXMuJztcclxuXHJcbmNsYXNzIE5vdEluUGFnZVJhbmdlRXhjZXB0aW9uIGV4dGVuZHMgRXhjZXB0aW9uSGFuZGxlclxyXG57XHJcblx0Y29uc3RydWN0b3IobWVzc2FnZSA9IG51bGwpIFxyXG5cdHtcclxuXHRcdG1lc3NhZ2UgPSBtZXNzYWdlIHx8IGRlZmF1bHRNZXNzYWdlJDU7XHJcblx0XHRzdXBlcigpO1xyXG4gICAgXHRzdXBlci5zdGFja1RyYWNlKHRoaXMsIG1lc3NhZ2UpO1xyXG4gICAgfVxyXG59XG5cbi8qKlxyXG4gKiBAZmlsZSBcclxuICogUGFnaW5hdGlvbiBjbGFzcy5cclxuICpcclxuICogVGhlIFBhZ2luYXRpb24gY29tcG9uZW50LCBoYW5kbGVzIHRoZSBwYWdpbmF0aW9uLlxyXG4gKi9cclxuXHJcbi8qKlxyXG4gKiBUaGUgZGVmYXVsdCBzZXR0aW5ncyBvZiB0aGUgcGFnaW5hdGlvbi5cclxuICpcclxuICogQHZhciBvYmplY3RcclxuICovXHJcbmxldCBkZWZhdWx0U2V0dGluZ3MkNSA9IHtcclxuXHRlbGVtZW50OiAnLnBhZ2luYXRpb24nLFxyXG5cdHByb2NjZXNzaW5nOiAnY2xpZW50LXNpZGUnLFxyXG5cdGNsYXNzOiAnJyxcclxuXHRwZXJfcGFnZTogNSxcclxuXHR0b3RhbF9pdGVtczogNSxcclxufTtcclxuXHJcbi8qKlxyXG4gKiBTdG9yZXMgdGhlIGNvbnRhaW5lciBvYmplY3QuXHJcbiAqXHJcbiAqIEB2YXIgXFxDb3JlXFxDb250YWluZXJcclxuICovXHJcbmxldCBDb250YWluZXIkNjtcclxuXHJcbi8qKlxyXG4gKiBTdG9yZXMgdGhlIHByb2R1Y3RzIGNvbXBvbmVudC5cclxuICpcclxuICogQHZhciBcXENvbXBvbmVudHNcXFByb2R1Y3RzXHJcbiAqL1xyXG5sZXQgUHJvZHVjdHMkMjtcclxuXHJcbi8qKlxyXG4gKiBTdG9yZXMgdGhlIGNvbnRhaW5lciBvYmplY3QuXHJcbiAqIFxyXG4gKiBAdmFyIFxcQ29yZVxcRXZlbnRNYW5hZ2VyXHJcbiAqL1xyXG5sZXQgRXZlbnRNYW5hZ2VyJDU7XHJcblxyXG5jbGFzcyBQYWdpbmF0aW9uIFxyXG57XHJcblx0LyoqXHJcblx0ICogLSBJbml0aWFsaXplIHRoZSBjb250YWluZXIgb2JqZWN0LlxyXG5cdCAqIC0gSW5pdGlhbGl6ZSB0aGUgcHJvZHVjdHMgY29tcG9uZW50LlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIFxcQ29yZVxcQ29udGFpbmVyIHwgY29udGFpbmVyXHJcblx0ICogQHBhcmFtIFxcQ29tcG9uZW50c1xcUHJvZHVjdHMgfCBwcm9kdWN0c1xyXG5cdCAqIEByZXR1cm4gdm9pZFxyXG5cdCAqL1xyXG5cdGNvbnN0cnVjdG9yKGNvbnRhaW5lciwgcHJvZHVjdHMsIGV2ZW50cykgXHJcblx0e1xyXG5cdFx0dGhpcy5zZXRDdXJyZW50KDEpO1xyXG5cdFx0Q29udGFpbmVyJDYgPSBjb250YWluZXI7XHJcblx0XHRQcm9kdWN0cyQyID0gcHJvZHVjdHM7XHJcblx0XHRFdmVudE1hbmFnZXIkNSA9IGV2ZW50cztcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFNldHVwIHRoZSBwYWdpbmF0aW9uLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIG9iamVjdCB8IHNldHRpbmdzXHJcblx0ICogQHJldHVybiB2b2lkXHJcblx0ICovXHJcblx0c2V0dXAoc2V0dGluZ3MpXHJcblx0e1x0XHJcblx0XHRpZih0eXBlb2Ygc2V0dGluZ3MgIT0gJ29iamVjdCcpIHtcclxuXHRcdFx0dGhyb3cgbmV3IEludmFsaWRBcmd1bWVudEV4Y2VwdGlvbiQxO1xyXG5cdFx0fVxyXG5cclxuXHRcdHRoaXMuc2V0dGluZ3MgPSBDb21tb24uZXh0ZW5kKGRlZmF1bHRTZXR0aW5ncyQ1LCBzZXR0aW5ncyk7XHJcblxyXG5cdFx0dGhpcy5zZXRFbGVtZW50KHRoaXMuc2V0dGluZ3MuZWxlbWVudCk7XHJcblxyXG5cdFx0Ly8gTGlzdGVuIHRvIHdoZW4gcHJvZHVjdHMgYXJlIGJlaW5nIGxvYWRlZCBhbmQgdXBkYXRlIHRoZSBwYWdpbmF0aW9uXHJcblx0XHQvLyB3aXRoIHRoZSBhY3R1YWwgaXRlbXMgY291bnQuXHJcblx0XHRFdmVudE1hbmFnZXIkNS5zdWJzY3JpYmUoJ3Byb2R1Y3RzLmxvYWRlZCcsIGZ1bmN0aW9uKHByb2R1Y3RzKSB7XHJcblx0XHRcdHRoaXMudG90YWxQYWdlcyA9IHRoaXMuY2FsY3VsYXRlVG90YWxQYWdlcyh0aGlzLnNldHRpbmdzLnBlcl9wYWdlLCBwcm9kdWN0cy5sZW5ndGgpO1xyXG5cdFx0XHR0aGlzLmJ1aWxkUGFnaW5hdGlvbigpO1xyXG5cdFx0fS5iaW5kKHRoaXMpKTtcclxuXHJcblx0XHQvLyBBcyBhIGZhbGxiYWNrIGNob29zZSB0aGUgdXNlcidzIHNldHRpbmdzIGZvciB0aGUgdG90YWwgaXRlbXMgY291bnQuXHJcblx0XHR0aGlzLnRvdGFsUGFnZXMgPSB0aGlzLmNhbGN1bGF0ZVRvdGFsUGFnZXModGhpcy5zZXR0aW5ncy5wZXJfcGFnZSwgdGhpcy5zZXR0aW5ncy50b3RhbF9pdGVtcyk7XHJcblx0XHR0aGlzLmJ1aWxkUGFnaW5hdGlvbigpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQnVpbGRzIHRoZSBwYWdpbmF0aW9uLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIFxyXG5cdCAqIEByZXR1cm4gXHJcblx0ICovXHJcblx0YnVpbGRQYWdpbmF0aW9uKClcclxuXHR7XHJcblx0XHR0aGlzLmxpbmtzID0gdGhpcy5jcmVhdGVMaW5rcygpO1xyXG5cdFx0dGhpcy5yZXBsYWNlTGlua3ModGhpcy5saW5rcyk7XHJcblx0XHR0aGlzLmJpbmRFdmVudExpc3RlbmVycyh0aGlzLmxpbmtzKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFNldHMgdGhlIGVsZW1lbnQuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gc3RyaW5nIHwgc2VsZWN0b3JcclxuXHQgKiBAcmV0dXJuIHZvaWRcclxuXHQgKi9cclxuXHRzZXRFbGVtZW50KHNlbGVjdG9yKVxyXG5cdHtcclxuXHRcdHRoaXMuZWxlbWVudCA9IERPTS5maW5kKHNlbGVjdG9yKTtcclxuXHRcdFxyXG5cdFx0RE9NLmFkZENsYXNzKHRoaXMuZWxlbWVudCwgdGhpcy5zZXR0aW5ncy5jbGFzcyk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBSZXBsYWNlcyB0aGUgbGlua3MgaW4gdGhlIGVsZW1lbnQuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gSFRNTFVMaXN0RWxlbWVudCB8IGxpbmtzXHJcblx0ICogQHJldHVybiB2b2lkXHJcblx0ICovXHJcblx0cmVwbGFjZUxpbmtzKGxpbmtzKVxyXG5cdHtcclxuXHRcdHRoaXMuZWxlbWVudC5pbm5lckhUTUwgPSAnJztcclxuXHRcdHRoaXMuZWxlbWVudC5hcHBlbmRDaGlsZChsaW5rcyk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBDYWxjdWxhdGVzIHRoZSB0b3RhbCBwYWdlcy5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSBudW1iZXIgfCBwZXJQYWdlXHJcblx0ICogQHBhcmFtIG51bWJlciB8IHRvdGFsSXRlbXNcclxuXHQgKiBAcmV0dXJuIG51bWJlclxyXG5cdCAqL1xyXG5cdGNhbGN1bGF0ZVRvdGFsUGFnZXMocGVyUGFnZSwgdG90YWxJdGVtcylcclxuXHR7XHJcblx0XHRwZXJQYWdlID0gcGFyc2VJbnQocGVyUGFnZSk7XHJcblx0XHR0b3RhbEl0ZW1zID0gcGFyc2VJbnQodG90YWxJdGVtcyk7XHJcblxyXG5cdFx0cmV0dXJuIE1hdGguY2VpbCh0b3RhbEl0ZW1zIC8gcGVyUGFnZSk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBCaW5kcyB0aGUgYnV0dG9ucyBldmVudHMgbGlzdGVuZXJzLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIEhUTUxVTGlzdEVsZW1lbnQgfCBsaW5rc1xyXG5cdCAqIEByZXR1cm4gdm9pZFxyXG5cdCAqL1xyXG5cdGJpbmRFdmVudExpc3RlbmVycyhsaW5rcykgXHJcblx0e1xyXG5cdFx0bGV0IGluc3RhbmNlID0gdGhpcztcclxuXHJcblx0XHR0aGlzLm5leHQuY2hpbGROb2Rlc1swXS5vbmNsaWNrID0gZnVuY3Rpb24oZSkge1xyXG5cdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG5cdFx0XHRsZXQgcmVxdWVzdGVkUGFnZSA9IGluc3RhbmNlLmN1cnJlbnQrMTtcclxuXHJcblx0XHRcdGlmIChpbnN0YW5jZS5ub3RJblBhZ2VSYW5nZShyZXF1ZXN0ZWRQYWdlKSkge1xyXG5cdFx0XHRcdHRocm93IG5ldyBOb3RJblBhZ2VSYW5nZUV4Y2VwdGlvbignVGhlIHBhZ2UgeW91IHJlcXVlc3RpbmcgZG9lcyBub3QgZXhpc3RzJyk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdFByb2R1Y3RzJDIubG9hZFByb2R1Y3RzKHJlcXVlc3RlZFBhZ2UpLnRoZW4oZnVuY3Rpb24ocHJvZHVjdHMpIHtcclxuXHRcdFx0XHRpbnN0YW5jZS5zZXRDdXJyZW50KHJlcXVlc3RlZFBhZ2UpO1xyXG5cdFx0XHR9KTtcclxuXHRcdH07XHJcblxyXG5cdFx0dGhpcy5wcmV2aW91cy5jaGlsZE5vZGVzWzBdLm9uY2xpY2sgPSBmdW5jdGlvbihlKSB7XHJcblx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcclxuXHJcblx0XHRcdGxldCByZXF1ZXN0ZWRQYWdlID0gaW5zdGFuY2UuY3VycmVudC0xO1xyXG5cclxuXHRcdFx0aWYoaW5zdGFuY2Uubm90SW5QYWdlUmFuZ2UocmVxdWVzdGVkUGFnZSkpIHtcclxuXHRcdFx0XHR0aHJvdyBuZXcgTm90SW5QYWdlUmFuZ2VFeGNlcHRpb24oJ1RoZSBwYWdlIHlvdSByZXF1ZXN0aW5nIGRvZXMgbm90IGV4aXN0cycpO1xyXG5cdFx0XHR9XHJcblx0XHRcdFxyXG5cdFx0XHRQcm9kdWN0cyQyLmxvYWRQcm9kdWN0cyhyZXF1ZXN0ZWRQYWdlKS50aGVuKGZ1bmN0aW9uKHByb2R1Y3RzKSB7XHJcblx0XHRcdFx0aW5zdGFuY2Uuc2V0Q3VycmVudChyZXF1ZXN0ZWRQYWdlKTtcclxuXHRcdFx0fSk7XHJcblx0XHR9O1xyXG5cclxuXHRcdGZvcih2YXIgaSA9IDA7IGkgPCB0aGlzLnBhZ2VzLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdHRoaXMucGFnZXNbaV0uY2hpbGROb2Rlc1swXS5vbmNsaWNrID0gZnVuY3Rpb24oZSkge1xyXG5cdFx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcclxuXHRcdFx0XHRcclxuXHRcdFx0XHRsZXQgcmVxdWVzdGVkUGFnZSA9IHRoaXMuZ2V0QXR0cmlidXRlKCdkYXRhLXBhZ2UtbnInKTtcclxuXHRcdFx0XHRcclxuXHRcdFx0XHRQcm9kdWN0cyQyLmxvYWRQcm9kdWN0cyhyZXF1ZXN0ZWRQYWdlKS50aGVuKGZ1bmN0aW9uKHByb2R1Y3RzKSB7XHJcblx0XHRcdFx0XHRpbnN0YW5jZS5zZXRDdXJyZW50KHJlcXVlc3RlZFBhZ2UpO1xyXG5cdFx0XHRcdH0pO1xyXG5cdFx0XHR9O1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogU2V0cyB0aGUgY3VycmVudCBwYWdlLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIG51bWJlciB8IHBhZ2VOdW1iZXJcclxuXHQgKiBAcmV0dXJuIHZvaWRcclxuXHQgKi9cclxuXHRzZXRDdXJyZW50KHBhZ2VOdW1iZXIpIFxyXG5cdHtcclxuXHRcdHRoaXMuY3VycmVudCA9IHBhcnNlSW50KHBhZ2VOdW1iZXIpO1xyXG5cdFx0dGhpcy5jaGFuZ2VVcmwocGFnZU51bWJlcik7XHJcblx0XHR0aGlzLnNldEFjdGl2ZUxpbmsocGFnZU51bWJlcik7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBHZXRzIHRoZSBjdXJyZW50IHBhZ2UuXHJcblx0ICpcclxuXHQgKiBAcmV0dXJuIG51bWJlclxyXG5cdCAqL1xyXG5cdGdldEN1cnJlbnQoKSBcclxuXHR7XHJcblx0XHRyZXR1cm4gdGhpcy5jdXJyZW50O1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQ3JlYXRlcyB0aGUgcGFnaW5hdGlvbiBsaW5rcy5cclxuXHQgKlxyXG5cdCAqIEByZXR1cm4gSFRNTFVMaXN0RWxlbWVudFxyXG5cdCAqL1xyXG5cdGNyZWF0ZUxpbmtzKCkgXHJcblx0e1xyXG5cdFx0bGV0IHVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndWwnKTtcclxuXHRcdFxyXG5cdFx0dGhpcy5wYWdlcyA9IHRoaXMuY3JlYXRlUGFnZUxpbmtzKCk7XHJcblx0XHR0aGlzLnByZXZpb3VzID0gdGhpcy5jcmVhdGVQcmV2aW91c0J1dHRvbigpO1xyXG5cdFx0dGhpcy5uZXh0ID0gdGhpcy5jcmVhdGVOZXh0QnV0dG9uKCk7XHJcblxyXG5cdFx0dWwuY2xhc3NOYW1lID0gJ3BhZ2luYXRpb24nO1xyXG5cdFx0dWwuYXBwZW5kQ2hpbGQodGhpcy5wcmV2aW91cyk7XHJcblxyXG5cdFx0dGhpcy5wYWdlcy5mb3JFYWNoKGZ1bmN0aW9uKHBhZ2UpIHtcclxuXHRcdFx0dWwuYXBwZW5kQ2hpbGQocGFnZSk7XHJcblx0XHR9KTtcclxuXHJcblx0XHR1bC5hcHBlbmRDaGlsZCh0aGlzLm5leHQpO1xyXG5cclxuXHRcdHJldHVybiB1bDtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIENyZWF0ZXMgdGhlIHBhZ2VzIGl0ZW0gbGlua3MuXHJcblx0ICpcclxuXHQgKiBAcmV0dXJuIGFycmF5PEhUTUxMSUVsZW1lbnQ+XHJcblx0ICovXHJcblx0Y3JlYXRlUGFnZUxpbmtzKCkgXHJcblx0e1xyXG5cdFx0dmFyIHBhZ2VzID0gW107XHJcblxyXG5cdFx0Zm9yKHZhciBpID0gMTsgaSA8PSB0aGlzLnRvdGFsUGFnZXM7IGkrKykge1xyXG5cdFx0XHR2YXIgcGFnZUl0ZW0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaScpO1xyXG5cdFx0XHR2YXIgbGluayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKTtcclxuXHRcdFx0cGFnZUl0ZW0uY2xhc3NOYW1lID0gKHRoaXMuY3VycmVudCA9PSBpKSA/ICdwYWdlLWl0ZW0gYWN0aXZlJyA6ICdwYWdlLWl0ZW0nO1xyXG5cdFx0XHRsaW5rLmNsYXNzTmFtZSA9ICdwYWdlLWxpbmsnO1xyXG5cdFx0XHRsaW5rLnNldEF0dHJpYnV0ZSgnaHJlZicsICc/cGFnZT0nKyBpKTtcclxuXHRcdFx0bGluay5zZXRBdHRyaWJ1dGUoJ2RhdGEtcGFnZS1ucicsIGkpO1xyXG5cdFx0XHRsaW5rLmlubmVySFRNTCA9IGk7XHJcblx0XHRcdHBhZ2VJdGVtLmFwcGVuZENoaWxkKGxpbmspO1xyXG5cdFx0XHRwYWdlcy5wdXNoKHBhZ2VJdGVtKTtcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gcGFnZXM7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBDcmVhdGVzIHRoZSBwcmV2aW91cyBidXR0b24gbGluay5cclxuXHQgKlxyXG5cdCAqIEByZXR1cm4gSFRNTExJRWxlbWVudFxyXG5cdCAqL1xyXG5cdGNyZWF0ZVByZXZpb3VzQnV0dG9uKCkgXHJcblx0e1xyXG5cdFx0dmFyIGxpID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKTtcclxuXHRcdHZhciBsaW5rID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpO1xyXG5cdFx0dmFyIHNwYW4xID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xyXG5cdFx0dmFyIHNwYW4yID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xyXG5cdFx0XHJcblx0XHRcclxuXHRcdGxpLmNsYXNzTmFtZSA9ICdwYWdlLWl0ZW0nO1xyXG5cdFx0bGluay5jbGFzc05hbWUgPSAncGFnZS1saW5rJztcclxuXHRcdHNwYW4yLmNsYXNzTmFtZSA9ICdzci1vbmx5JztcclxuXHJcblx0XHRsaW5rLnNldEF0dHJpYnV0ZSgnaHJlZicsICcnKTtcclxuXHRcdGxpbmsuc2V0QXR0cmlidXRlKCdhcmlhLWxhYmVsJywgJ1ByZXZpb3VzJyk7XHJcblx0XHRzcGFuMS5zZXRBdHRyaWJ1dGUoJ2FyaWEtaGlkZGVuJywgJ3RydWUnKTtcclxuXHJcblx0XHRzcGFuMS5pbm5lckhUTUwgPSAnJmxhcXVvOyc7XHJcblx0XHRzcGFuMi5pbm5lckhUTUwgPSAnUHJldmlvdXMnO1xyXG5cclxuXHRcdGxpbmsuYXBwZW5kQ2hpbGQoc3BhbjEpO1xyXG5cdFx0bGluay5hcHBlbmRDaGlsZChzcGFuMik7XHJcblx0XHRsaS5hcHBlbmRDaGlsZChsaW5rKTtcclxuXHJcblx0XHRyZXR1cm4gbGk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBDcmVhdGVzIHRoZSBuZXh0IGJ1dHRvbiBsaW5rLlxyXG5cdCAqXHJcblx0ICogQHJldHVybiBIVE1MTElFbGVtZW50XHJcblx0ICovXHJcblx0Y3JlYXRlTmV4dEJ1dHRvbigpIFxyXG5cdHtcclxuXHRcdHZhciBsaSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJyk7XHJcblx0XHR2YXIgbGluayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKTtcclxuXHRcdHZhciBzcGFuMSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcclxuXHRcdHZhciBzcGFuMiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcclxuXHRcdFxyXG5cdFx0bGkuY2xhc3NOYW1lID0gJ3BhZ2UtaXRlbSc7XHJcblx0XHRsaW5rLmNsYXNzTmFtZSA9ICdwYWdlLWxpbmsnO1xyXG5cdFx0c3BhbjIuY2xhc3NOYW1lID0gJ3NyLW9ubHknO1xyXG5cclxuXHRcdGxpbmsuc2V0QXR0cmlidXRlKCdocmVmJywgJycpO1xyXG5cdFx0bGluay5zZXRBdHRyaWJ1dGUoJ2FyaWEtbGFiZWwnLCAnTmV4dCcpO1xyXG5cdFx0c3BhbjEuc2V0QXR0cmlidXRlKCdhcmlhLWhpZGRlbicsICd0cnVlJyk7XHJcblxyXG5cdFx0c3BhbjEuaW5uZXJIVE1MID0gJyZyYXF1bzsnO1xyXG5cdFx0c3BhbjIuaW5uZXJIVE1MID0gJ05leHQnO1xyXG5cclxuXHRcdGxpbmsuYXBwZW5kQ2hpbGQoc3BhbjEpO1xyXG5cdFx0bGluay5hcHBlbmRDaGlsZChzcGFuMik7XHJcblx0XHRsaS5hcHBlbmRDaGlsZChsaW5rKTtcclxuXHJcblx0XHRyZXR1cm4gbGk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBDaGVja3MgaWYgdGhlIGdpdmVuIHBhZ2UgaXMgaW4gcmFuZ2UuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gbnVtYmVyIHwgcGFnZU51bWJlclxyXG5cdCAqIEByZXR1cm4gYm9vbFxyXG5cdCAqL1xyXG5cdG5vdEluUGFnZVJhbmdlKHBhZ2VOdW1iZXIpIFxyXG5cdHtcclxuXHRcdHJldHVybiAocGFnZU51bWJlciA+IHRoaXMudG90YWxQYWdlcyB8fCBwYWdlTnVtYmVyIDw9IDApIHx8IGlzTmFOKHBhZ2VOdW1iZXIpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQ2hhbmdlcyB0aGUgdXJsIHRvIGEgZ2l2ZW4gcGFnZSBudW1iZXIuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gbnVtYmVyIHwgcGFnZU51bWJlclxyXG5cdCAqIEByZXR1cm4gdm9pZFxyXG5cdCAqL1xyXG5cdGNoYW5nZVVybChwYWdlTnVtYmVyKSBcclxuXHR7XHJcblx0XHRwYWdlTnVtYmVyID0gIHBhZ2VOdW1iZXIgfHwgcXVlcnlTdHJpbmcoKVsncGFnZSddO1xyXG5cdFx0d2luZG93Lmhpc3RvcnkucmVwbGFjZVN0YXRlKCcnLCAnJywgdGhpcy51cGRhdGVVUkxQYXJhbWV0ZXIod2luZG93LmxvY2F0aW9uLmhyZWYsICdwYWdlJywgcGFnZU51bWJlcikpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogU2V0cyB0aGUgYWN0aXZlIGxpbmsuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gbnVtYmVyIHwgcGFnZU51bWJlclxyXG5cdCAqIEByZXR1cm4gdm9pZFxyXG5cdCAqL1xyXG5cdHNldEFjdGl2ZUxpbmsocGFnZU51bWJlcilcclxuXHR7XHJcblx0XHRmb3IodmFyIHBhZ2UgaW4gdGhpcy5wYWdlcykge1xyXG5cdFx0XHRpZiAodGhpcy5wYWdlc1twYWdlXS5jaGlsZE5vZGVzWzBdLmdldEF0dHJpYnV0ZSgnZGF0YS1wYWdlLW5yJykgPT0gcGFnZU51bWJlcikge1xyXG5cdFx0XHRcdERPTS5hZGRDbGFzcyh0aGlzLnBhZ2VzW3BhZ2VdLCAnYWN0aXZlJyk7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0RE9NLnJlbW92ZUNsYXNzKHRoaXMucGFnZXNbcGFnZV0sICdhY3RpdmUnKTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogR2V0IHRoZSBnZXQgdmFyaWFibGVzIGZyb20gdGhlIHVybC5cclxuXHQgKlxyXG5cdCAqIEByZXR1cm4gYXJyYXlcclxuXHQgKi9cclxuXHRxdWVyeVN0cmluZygpIFxyXG5cdHtcclxuXHRcdHZhciB2YXJzID0ge307XHJcblx0XHR2YXIgcGFydHMgPSB3aW5kb3cubG9jYXRpb24uaHJlZi5yZXBsYWNlKC9bPyZdKyhbXj0mXSspPShbXiZdKikvZ2ksIGZ1bmN0aW9uKG0sIGtleSwgdmFsdWUpIHtcclxuXHRcdFx0dmFyc1trZXldID0gdmFsdWU7XHJcblx0XHR9KTtcclxuXHJcblx0XHRyZXR1cm4gdmFycztcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIE1vZGlmaWVzIHRoZSBnZXQgcGFyYW1ldGVyIGluIHRoZSB1cmwuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gc3RyaW5nIHwgdXJsXHJcblx0ICogQHBhcmFtIHN0cmluZyB8IHBhcmFtXHJcblx0ICogQHBhcmFtIG51bWJlciB8IHBhcmFtVmFsXHJcblx0ICogQHJldHVybiBzdHJpbmdcclxuXHQgKi9cclxuXHR1cGRhdGVVUkxQYXJhbWV0ZXIodXJsLCBwYXJhbSwgcGFyYW1WYWwpIFxyXG5cdHtcclxuXHQgICAgdmFyIG5ld0FkZGl0aW9uYWxVUkwgPSBcIlwiO1xyXG5cdCAgICB2YXIgdGVtcEFycmF5ID0gdXJsLnNwbGl0KFwiP1wiKTtcclxuXHQgICAgdmFyIGJhc2VVUkwgPSB0ZW1wQXJyYXlbMF07XHJcblx0ICAgIHZhciBhZGRpdGlvbmFsVVJMID0gdGVtcEFycmF5WzFdO1xyXG5cdCAgICB2YXIgdGVtcCA9IFwiXCI7XHJcblxyXG5cdCAgICBpZiAoYWRkaXRpb25hbFVSTCkge1xyXG5cdCAgICAgICAgdGVtcEFycmF5ID0gYWRkaXRpb25hbFVSTC5zcGxpdChcIiZcIik7XHJcblx0ICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRlbXBBcnJheS5sZW5ndGg7IGkrKyl7XHJcblx0ICAgICAgICAgICAgaWYgKHRlbXBBcnJheVtpXS5zcGxpdCgnPScpWzBdICE9IHBhcmFtKXtcclxuXHQgICAgICAgICAgICAgICAgbmV3QWRkaXRpb25hbFVSTCArPSB0ZW1wICsgdGVtcEFycmF5W2ldO1xyXG5cdCAgICAgICAgICAgICAgICB0ZW1wID0gXCImXCI7XHJcblx0ICAgICAgICAgICAgfVxyXG5cdCAgICAgICAgfVxyXG5cdCAgICB9XHJcblxyXG5cdCAgICB2YXIgcm93c1RleHQgPSB0ZW1wICsgXCJcIiArIHBhcmFtICsgXCI9XCIgKyBwYXJhbVZhbDtcclxuXHQgICAgcmV0dXJuIGJhc2VVUkwgKyBcIj9cIiArIG5ld0FkZGl0aW9uYWxVUkwgKyByb3dzVGV4dDtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFJlc2V0cyB0aGUgcGFnaW5hdGlvbi5cclxuXHQgKlxyXG5cdCAqIEByZXR1cm4gdm9pZFxyXG5cdCAqL1xyXG5cdHJlc2V0KCkgXHJcblx0e1xyXG5cdFx0dGhpcy5zZXRDdXJyZW50KDEpO1xyXG5cdFx0dGhpcy5jaGFuZ2VVcmwoMSk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBIaWRlcyB0aGUgY29tcG9uZW50IGZyb20gdGhlIERPTS5cclxuXHQgKlxyXG5cdCAqIEByZXR1cm4gdm9pZCBcclxuXHQgKi9cclxuXHRoaWRlKClcclxuXHR7XHJcblx0XHR0aGlzLmVsZW1lbnQuc3R5bGUuZGlzcGxheSA9ICdub25lJztcclxuXHR9XHJcbn1cblxubGV0IGRlZmF1bHRNZXNzYWdlJDYgPSAnSW4gb3JkZXIgdG8gdXNlIGNvbXBvbmVudHMgeW91IG11c3QgcmVnaXN0ZXIgdGhlbSB3aXRoIHRoZSBzaG9wISc7IFxyXG5cclxuY2xhc3MgQ29tcG9uZW50Tm90UmVnaXN0ZXJlZEV4Y2VwdGlvbiBleHRlbmRzIEV4Y2VwdGlvbkhhbmRsZXJcclxue1xyXG5cdGNvbnN0cnVjdG9yKG1lc3NhZ2UgPSBudWxsKSBcclxuXHR7XHJcblx0XHRtZXNzYWdlID0gbWVzc2FnZSB8fCBkZWZhdWx0TWVzc2FnZSQ2O1xyXG5cdFx0c3VwZXIobWVzc2FnZSk7XHJcbiAgICBcdHN1cGVyLnN0YWNrVHJhY2UodGhpcywgbWVzc2FnZSk7XHJcbiAgICB9XHJcbn1cblxuLy8gSGVscGVyc1xyXG4vLyBDb3JlXHJcbi8vIENvbXBvbmVudHNcclxuLy8gRXhjZXB0aW9uc1xyXG4vKipcclxuICogU3RvcmVzIHRoZSBkZWZhdWx0IHNldHRpbmdzLlxyXG4gKlxyXG4gKiBAdmFyIG9iamVjdFxyXG4gKi9cclxubGV0IGRlZmF1bHRTZXR0aW5ncyQ2ID0ge1xyXG5cdGRlYnVnX2xldmVsOiAnZXJyb3InLFxyXG5cdGVsZW1lbnQ6ICdib2R5JyxcclxuXHRpbmplY3RfbGlicmFyaWVzOiBbXSxcclxuXHRjb21wb25lbnRzOiBbJ1Byb2R1Y3RzJywgJ1NlcnZpY2VzJywgJ0ZpbHRlcicsICdQYWdpbmF0aW9uJywgJ0NhcnQnXSxcclxuXHRsb2FkaW5nX2FuaW1hdGlvbjogdHJ1ZVxyXG59O1xyXG5cclxuLyoqXHJcbiAqIFN0b3JlcyB0aGUgb3B0aW9uYWwsIFxyXG4gKiBpbmplY3RhYmxlIGV4dGVybmFsIGxpYnJhcmllcyBcclxuICpcclxuICogQHZhciBvYmplY3RcclxuICovXHJcbmxldCBleHRlcm5hbExpYnJhcmllcyA9IHtcclxuXHRib290c3RyYXA6ICdodHRwczovL21heGNkbi5ib290c3RyYXBjZG4uY29tL2Jvb3RzdHJhcC8zLjMuNy9jc3MvYm9vdHN0cmFwLm1pbi5jc3MnLFxyXG59O1xyXG5cclxuY2xhc3MgVHVyYm9FY29tbWVyY2Vcclxue1xyXG5cdC8qKlxyXG5cdCAqIFRoZSBlbnRlcnkgZm9yIHRoZSBzaG9wLlxyXG5cdCAqIC0gU2V0dGluZyB0aGUgZXhjZXB0aW9uIGhhbmRsZXIuXHJcblx0ICogLSBTZXR0aW5nIHRoZSBpb2MgY29udGFpbmVyLlxyXG5cdCAqIC0gRXh0ZW5kaW5nIHRoZSB1c2VyIHNldHRpbmdzLlxyXG5cdCAqIC0gU2V0dGluZyB0aGUgZWxlbWVudC5cclxuXHQgKiAtIERpc2FibGluZyBkZWZhdWx0IGVycm9ycy5cclxuXHQgKiAtIFBhc3NpbmcgY2FsbHMgdmlhIHByb3h5IHRvIHRoZSBjb21wb25lbnRzLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIG9iamVjdCB8IHNldHRpbmdzXHJcblx0ICogQHJldHVybiBQcm94eVxyXG5cdCAqL1xyXG5cdGNvbnN0cnVjdG9yKHNldHRpbmdzKVxyXG5cdHtcclxuXHRcdGlmICh0eXBlb2Ygc2V0dGluZ3MgIT0gJ29iamVjdCcpIHtcclxuXHRcdFx0dGhyb3cgbmV3IEludmFsaWRBcmd1bWVudEV4Y2VwdGlvbiQxO1xyXG5cdFx0fVxyXG5cclxuXHRcdHRoaXMuY29udGFpbmVyID0gbmV3IENvbnRhaW5lcjtcclxuXHRcdHRoaXMuc2V0dGluZ3MgPSBDb21tb24uZXh0ZW5kKGRlZmF1bHRTZXR0aW5ncyQ2LCBzZXR0aW5ncyk7XHJcblxyXG5cdFx0RXhjZXB0aW9uSGFuZGxlci5zZXREZWJ1Z0xldmVsID0gdGhpcy5zZXR0aW5ncy5kZWJ1Z19sZXZlbDtcclxuXHRcdHRoaXMubG9hZEV4dGVybmFsTGlicmFyaWVzKCk7XHJcblxyXG5cdFx0ZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsIGZ1bmN0aW9uKCkge1xyXG5cdFx0XHR0aGlzLnNldEVsZW1lbnQodGhpcy5zZXR0aW5ncy5lbGVtZW50KTtcclxuXHRcdFx0XHJcblx0XHRcdGlmICh0aGlzLnNldHRpbmdzLmxvYWRpbmdfYW5pbWF0aW9uKSB7XHJcblx0XHRcdFx0c3RhcnRMb2FkaW5nLmNhbGwodGhpcyk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHRoaXMuYWRkU3R5bGVUYWcoKTtcclxuXHRcdH0uYmluZCh0aGlzKSk7XHJcblxyXG5cdFx0YmluZENvbXBvbmVudHNEZXBlbmRlbmNpZXMuY2FsbCh0aGlzLCBzZXR0aW5ncy5jb21wb25lbnRzKTtcclxuXHJcblx0XHRyZXR1cm4gbmV3IFByb3h5KHRoaXMsIHtcclxuXHRcdFx0Z2V0OiBmdW5jdGlvbih0YXJnZXQsIHNvdXJjZSkge1xyXG5cdFx0XHRcdGlmIChDb21tb24uaW5fYXJyYXkoc291cmNlLCBzZXR0aW5ncy5jb21wb25lbnRzKSkge1xyXG5cdFx0XHRcdFx0cmV0dXJuIHRhcmdldC5jb250YWluZXIubWFrZShzb3VyY2UpO1xyXG5cdFx0XHRcdH0gZWxzZSBpZiAodGFyZ2V0LmNvbnRhaW5lci5pbnN0YW5jZUV4aXN0KHNvdXJjZSkpIHtcclxuXHRcdFx0XHRcdHJldHVybiB0YXJnZXQuY29udGFpbmVyLmdldEluc3RhbmNlKHNvdXJjZSk7XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHR0aHJvdyBuZXcgQ29tcG9uZW50Tm90UmVnaXN0ZXJlZEV4Y2VwdGlvbignY29tcG9uZW50cyBtdXN0IGJlIHJlZ2lzdGVyZWQgaW4gb3JkZXIgdG8gdXNlIHRoZW0uJyk7XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogTG9hZHMgdGhlIGV4dGVybmFsIGxpYnJhcmllcyB3aGljaCB3YXMgc3BlY2lmaWVkLlxyXG5cdCAqIFxyXG5cdCAqIEByZXR1cm4gdm9pZFxyXG5cdCAqL1xyXG5cdGxvYWRFeHRlcm5hbExpYnJhcmllcygpXHJcblx0e1xyXG5cdFx0bGV0IGk7XHJcblx0XHRsZXQgbGlicmFyaWVzID0gdGhpcy5zZXR0aW5ncy5pbmplY3RfbGlicmFyaWVzO1xyXG5cclxuXHRcdGZvciAoaSA9IDA7IGkgPCBsaWJyYXJpZXMubGVuZ3RoOyBpKyspIHtcclxuXHRcdFx0aWYgKGV4dGVybmFsTGlicmFyaWVzLmhhc093blByb3BlcnR5KGxpYnJhcmllc1tpXSkpIHtcclxuXHRcdFx0XHRsZXQgaWQgPSAnVHVyYm8tZUNvbW1lcmNlLScgKyBTdHIudWNmaXJzdChsaWJyYXJpZXNbaV0pO1xyXG5cdFx0XHRcdFxyXG5cdFx0XHRcdGlmICghIERPTS5maW5kKGlkKSkge1xyXG5cdFx0XHRcdFx0RE9NLmFkZExpbmtlZFN0eWxlKGlkLCBleHRlcm5hbExpYnJhcmllc1tsaWJyYXJpZXNbaV1dKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFNldHMgdGhlIGVsZW1lbnQgdG8gYmUgYm91bmQgdG8uXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gc3RyaW5nIHwgc2VsZWN0b3JcclxuXHQgKiBAcmV0dXJuIHZvaWRcclxuXHQgKi9cclxuXHRzZXRFbGVtZW50KHNlbGVjdG9yKVxyXG5cdHtcclxuXHRcdHRoaXMud3JhcHBlciA9IERPTS5maW5kKHNlbGVjdG9yKTtcclxuXHRcdFxyXG5cdFx0RE9NLmFkZENsYXNzKHRoaXMud3JhcHBlciwgdGhpcy5zZXR0aW5ncy5jbGFzcyk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBBZGQgdGhlIGVDb21tZXJjZSBzdHlsZSB0YWdzIHRvIHRoZSBET00uXHJcblx0ICpcclxuXHQgKiBAcmV0dXJuIHZvaWRcclxuXHQgKi9cclxuXHRhZGRTdHlsZVRhZygpIFxyXG5cdHtcclxuXHRcdGlmIChET00uZmluZCgnI1R1cmJvZS1Db21tZXJjZScpKSB7XHJcblx0XHRcdHJldHVybjtcclxuXHRcdH1cclxuXHJcblx0XHRsZXQgY3NzID0gYFxyXG5cdFx0XHQke3RoaXMuc2V0dGluZ3MuZWxlbWVudH0ge1xyXG5cdFx0XHRcdHBvc2l0aW9uOiByZWxhdGl2ZTtcclxuXHRcdFx0XHRjbGVhcjogYm90aDtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0LmxvYWRpbmctcHJvZ3Jlc3MtYmFyIHtcclxuXHRcdFx0XHRwb3NpdGlvbjogZml4ZWQ7XHJcblx0XHRcdFx0dG9wOiAwO1xyXG5cdFx0XHRcdGxlZnQ6IDA7XHJcblx0XHRcdFx0aGVpZ2h0OiA1cHg7XHJcblx0XHRcdFx0d2lkdGg6IDEwMCU7XHJcblx0XHRcdFx0LXdlYmtpdC1ib3gtc2hhZG93OiAwcHggMHB4IDVweCAxcHggcmdiYSgxNjgsMTY4LDE2OCwxKTtcclxuXHRcdFx0XHQtbW96LWJveC1zaGFkb3c6IDBweCAwcHggNXB4IDFweCByZ2JhKDE2OCwxNjgsMTY4LDEpO1xyXG5cdFx0XHRcdGJveC1zaGFkb3c6IDBweCAwcHggNXB4IDFweCByZ2JhKDE2OCwxNjgsMTY4LDEpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHQubG9hZGluZy1wcm9ncmVzcy1iYXIgPiAubG9hZGluZy1wcm9ncmVzcy1maWxsIHtcclxuXHRcdFx0XHR3aWR0aDogMTAwJTtcclxuXHRcdFx0XHRoZWlnaHQ6IDEwMCU7XHJcblx0XHRcdFx0cG9zaXRpb246IGFic29sdXRlO1xyXG5cdFx0XHRcdGJhY2tncm91bmQtY29sb3I6ICM5ZGQyZmY7XHJcblx0XHRcdFx0dHJhbnNmb3JtOiB0cmFuc2xhdGVYKC0ke2RvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRXaWR0aH1weCk7XHJcblx0XHRcdH1cclxuXHRcdGA7XHJcblx0ICAgIFxyXG5cdCAgICBET00uYWRkU3R5bGUoJ1R1cmJvLWVDb21tZXJjZScsIGNzcyk7XHJcblx0fVxyXG59XHJcblxyXG4vKipcclxuICogQmluZHMgY29tcG9uZW50cyBkZXBlbmRlbmNpZXMuXHJcbiAqXHJcbiAqIEBwYXJhbSBvYmplY3QgfCBjb21wb25lbnRzXHJcbiAqIEByZXR1cm4gdm9pZFxyXG4gKi9cclxuZnVuY3Rpb24gYmluZENvbXBvbmVudHNEZXBlbmRlbmNpZXMoY29tcG9uZW50cykge1xyXG5cclxuXHR0aGlzLmNvbnRhaW5lci5zZXRJbnN0YW5jZSgnUmVxdWVzdCcsIG5ldyBSZXF1ZXN0KTtcclxuXHR0aGlzLmNvbnRhaW5lci5zZXRJbnN0YW5jZSgnRXZlbnRzJywgbmV3IEV2ZW50TWFuYWdlcik7XHJcblxyXG5cdHRoaXMuY29udGFpbmVyLmJpbmQoJ0ZpbHRlcicsIGZ1bmN0aW9uKGNvbnRhaW5lcikge1xyXG5cdFx0bGV0IGNvbXBvbmVudCA9IG5ldyBGaWx0ZXIoY29udGFpbmVyKTtcclxuXHRcdGNvbXBvbmVudC5ib290ZWQgPSB0cnVlOyBcclxuXHRcdHJldHVybiBjb21wb25lbnQ7XHJcblx0fSk7XHJcblx0XHJcblx0dGhpcy5jb250YWluZXIuYmluZCgnU2VydmljZXMnLCBmdW5jdGlvbihjb250YWluZXIpIHsgXHJcblx0XHRsZXQgY29tcG9uZW50ID0gbmV3IFNlcnZpY2VzKGNvbnRhaW5lcik7IFxyXG5cdFx0Y29tcG9uZW50LmJvb3RlZCA9IHRydWU7XHJcblx0XHRyZXR1cm4gY29tcG9uZW50O1xyXG5cdH0pO1xyXG5cclxuXHR0aGlzLmNvbnRhaW5lci5iaW5kKCdQcm9kdWN0cycsIGZ1bmN0aW9uKGNvbnRhaW5lcikge1xyXG5cdFx0bGV0IGNvbXBvbmVudCA9IG5ldyBQcm9kdWN0cyhjb250YWluZXIsIGNvbnRhaW5lci5SZXF1ZXN0LCBjb250YWluZXIuRXZlbnRzKTtcclxuXHRcdGNvbXBvbmVudC5ib290ZWQgPSB0cnVlO1xyXG5cdFx0cmV0dXJuIGNvbXBvbmVudDtcclxuXHR9KTtcclxuXHJcblx0dGhpcy5jb250YWluZXIuYmluZCgnUGFnaW5hdGlvbicsIGZ1bmN0aW9uKGNvbnRhaW5lcikge1xyXG5cdFx0bGV0IGNvbXBvbmVudCA9IG5ldyBQYWdpbmF0aW9uKGNvbnRhaW5lciwgY29udGFpbmVyLm1ha2UoJ1Byb2R1Y3RzJyksIGNvbnRhaW5lci5FdmVudHMpO1xyXG5cdFx0Y29tcG9uZW50LmJvb3RlZCA9IHRydWU7XHJcblx0XHRyZXR1cm4gY29tcG9uZW50O1xyXG5cdH0pO1xyXG5cclxuXHR0aGlzLmNvbnRhaW5lci5iaW5kKCdDYXJ0JywgZnVuY3Rpb24oY29udGFpbmVyKSB7XHJcblx0XHRsZXQgY29tcG9uZW50ID0gbmV3IENhcnQoY29udGFpbmVyLCBjb250YWluZXIuUmVxdWVzdCwgY29udGFpbmVyLkV2ZW50cyk7XHJcblx0XHRjb21wb25lbnQuYm9vdGVkID0gdHJ1ZTtcclxuXHRcdHJldHVybiBjb21wb25lbnQ7XHJcblx0fSk7XHJcblxyXG5cdHRoaXMuY29udGFpbmVyLmJpbmQoJ0NoZWNrb3V0JywgZnVuY3Rpb24oY29udGFpbmVyKSB7XHJcblx0XHRsZXQgY29tcG9uZW50ID0gbmV3IENoZWNrb3V0KGNvbnRhaW5lciwgY29udGFpbmVyLlJlcXVlc3QsIGNvbnRhaW5lci5FdmVudHMpO1xyXG5cdFx0Y29tcG9uZW50LmJvb3RlZCA9IHRydWU7XHJcblx0XHRyZXR1cm4gY29tcG9uZW50O1xyXG5cdH0pO1xyXG5cclxuXHR0aGlzLmNvbnRhaW5lci5GaWx0ZXIuYm9vdGVkID0gZmFsc2U7XHJcblx0dGhpcy5jb250YWluZXIuU2VydmljZXMuYm9vdGVkID0gZmFsc2U7XHJcblx0dGhpcy5jb250YWluZXIuUHJvZHVjdHMuYm9vdGVkID0gZmFsc2U7XHJcblx0dGhpcy5jb250YWluZXIuUGFnaW5hdGlvbi5ib290ZWQgPSBmYWxzZTtcclxuXHR0aGlzLmNvbnRhaW5lci5DYXJ0LmJvb3RlZCA9IGZhbHNlO1xyXG5cdHRoaXMuY29udGFpbmVyLkNoZWNrb3V0LmJvb3RlZCA9IGZhbHNlO1xyXG59XHJcblxyXG4vKipcclxuICogQXR0YWNoZXMgYSBsb2FkZXIgdG8gdGhlIHRvcCBvZiB0aGUgc2NyZWVuXHJcbiAqIGFuZCBoaWRlcyB0aGUgY29udGVudC5cclxuICogU3RvcHMgYXV0b21hdGljYWxseSBhZnRlciAyMCUgcmVhY2hlZC5cclxuICpcclxuICogQHJldHVybiB2b2lkIFxyXG4gKi9cclxuZnVuY3Rpb24gc3RhcnRMb2FkaW5nKCkge1xyXG5cdGxldCBsb2FkZXIgPSBET00uY3JlYXRlRWxlbWVudCgnZGl2Jywge1xyXG5cdFx0Y2xhc3M6ICdsb2FkaW5nLXByb2dyZXNzLWJhcidcclxuXHR9KTtcclxuXHJcblx0bGV0IGZpbGwgPSBET00uY3JlYXRlRWxlbWVudCgnc3BhbicsIHtcclxuXHRcdGNsYXNzOiAnbG9hZGluZy1wcm9ncmVzcy1maWxsJ1xyXG5cdH0pO1xyXG5cclxuXHRsb2FkZXIuYXBwZW5kQ2hpbGQoZmlsbCk7XHJcblx0ZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChsb2FkZXIpO1xyXG5cclxuXHJcblx0bGV0IHByb2dyZXNzID0gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudFdpZHRoO1xyXG5cdGxldCBtYXhTaXplID0gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudFdpZHRoICogMC44MDtcclxuXHJcblx0d2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZShwcm9ncmVzc0RyYXcpO1xyXG5cclxuXHRsZXQgY29udGVudCA9IHRoaXMud3JhcHBlcjtcclxuXHJcblx0Y29udGVudC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xyXG5cdFxyXG5cdGZ1bmN0aW9uIHByb2dyZXNzRHJhdygpIHtcclxuXHRcdGZpbGwuc3R5bGUudHJhbnNmb3JtID0gJ3RyYW5zbGF0ZVgoLScgKyBwcm9ncmVzcyArICdweCknO1xyXG5cdFx0cHJvZ3Jlc3MgLT0gNztcclxuXHJcblx0XHRpZiAocHJvZ3Jlc3MgPCBtYXhTaXplKSB7XHJcblx0XHRcdGRvbmUoKTtcclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0fVxyXG5cclxuXHRcdHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUocHJvZ3Jlc3NEcmF3KTtcclxuXHR9XHJcblxyXG5cdGZ1bmN0aW9uIGRvbmUoKSB7XHJcblx0XHRmaWxsLnN0eWxlLm9wYWNpdHkgPSBwcm9ncmVzcyAvIDEwMDA7XHJcblx0XHRmaWxsLnN0eWxlLnRyYW5zZm9ybSA9ICd0cmFuc2xhdGVYKC0nICsgcHJvZ3Jlc3MgKyAncHgpJztcclxuXHRcclxuXHRcdHByb2dyZXNzIC09IDE1O1xyXG5cclxuXHRcdGlmIChwcm9ncmVzcyA8PSAwKSB7XHJcblx0XHRcdGNvbnRlbnQuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XHJcblx0XHRcdFxyXG5cdFx0XHRpZiAodHlwZW9mIGxvYWRlciAhPSAndW5kZWZpbmVkJykge1xyXG5cdFx0XHRcdERPTS5yZW1vdmUobG9hZGVyKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0fVxyXG5cclxuXHRcdHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoZG9uZSk7XHJcblx0fVxyXG59XG5cbnJldHVybiBUdXJib0Vjb21tZXJjZTtcblxufSgpKTtcbiJdfQ==
