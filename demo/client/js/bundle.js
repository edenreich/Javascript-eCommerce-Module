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

	var defaultMessage = 'an invalid argument was passed.';

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

			/**
    * Inserts an element after an element.
    *
    * @param HTMLElement | element
    * @param HTMLElement | context
    * @return void
    */

		}, {
			key: 'insertAfter',
			value: function insertAfter(context, element) {
				context.parentNode.insertBefore(element, context.nextSibling);
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

		if (parentElement === null) {
			throw new InvalidArgumentException$1('queryElement() expects second parameter to be of type HTMLElement, but null was passed instead.');
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

	var defaultMessage$2 = 'trying to bind an already existing bound.';

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

				this.bindEventListeners();
				this.addStyleTag();

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
					throw InvalidArgumentException$1('addItem() expect the first parameter to be an object, but ' + (typeof item === 'undefined' ? 'undefined' : _typeof(item)) + ' was passed instead');
				}

				this.cart = Cookie.get(this.settings.cookie_name);

				if (!item.hasOwnProperty('quantity')) {
					item.quantity = 1;
				}

				var i = void 0;
				var incremented = false;

				for (i = 0; i < this.cart.items.length; i++) {
					if (item.hasOwnProperty('id') && this.cart.items[i].id == item.id) {
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
				this.cart = Cookie.get(this.settings.cookie_name);

				var i = void 0;
				var alreadyFavorited = false;

				for (i = 0; i < this.cart.favorites.length; i++) {
					if (item.hasOwnProperty('id') && this.cart.favorites[i].id == item.id) {
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
				this.cart = Cookie.get(this.settings.cookie_name);

				var i = void 0;

				for (i = 0; i < this.cart.items.length; i++) {
					if (item.hasOwnProperty('id') && this.cart.items[i].name == item.name) {
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
				if (DOM.find('#eCommerce-Cart')) {
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
				if (this.icon == null) {
					return;
				}

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
				this.wrapper = DOM.find(selector);

				DOM.addClass(this.wrapper, this.settings.class);
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


	var defaultSettings$3 = {
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

			Container$4 = container;
			Http$1 = http;
			EventManager$3 = eventManager;
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

				this.settings = Common.extend(defaultSettings$3, settings);
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

				if (Container$4.Pagination && Container$4.Pagination.booted) {
					switch (Container$4.Pagination.settings.proccessing) {
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
						EventManager$3.publish('products.loading', product);
					}

					EventManager$3.publish('products.loaded', products);
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
						EventManager$3.publish('products.loading', product);
					}

					EventManager$3.publish('products.loaded', products);
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
				Container$4.Pagination.settings.total_items = products.length;

				var perPage = Container$4.Pagination.settings.per_page;

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
				var pageNumber = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

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
					EventManager$3.publish('cart.product.added', attributes);
				});

				favorite.addEventListener('click', function (e) {
					e.preventDefault();
					this.innerHTML = '&#x2713;';
					EventManager$3.publish('cart.product.favorited', attributes);
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
		}]);

		return Products;
	}();

	/**
  * The Services Object, handles the services.
  */


	var Services = function Services() {
		_classCallCheck(this, Services);
	};

	var defaultMessage$4 = 'sorry, no more pages.';

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


	var defaultSettings$4 = {
		element: '.pagination-links',
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
	var Container$5 = void 0;

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
	var EventManager$4 = void 0;

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
			Container$5 = container;
			Products$2 = products;
			EventManager$4 = events;
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

				this.settings = Common.extend(defaultSettings$4, settings);

				this.setElement(this.settings.element);

				// Listen to when products are being loaded and update the pagination
				// with the actual items count.
				EventManager$4.subscribe('products.loaded', function (products) {
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

	var defaultSettings$5 = {
		debug_level: 'error',
		element: 'body',
		inject_libraries: [],
		components: ['Products', 'Services', 'Filter', 'Pagination', 'Cart'],
		loading_animation: true
	};

	var externalLibraries = {
		bootstrap: 'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css'
	};

	var debugLevel$1 = void 0;

	var TurboEcommerce = function () {
		_createClass(TurboEcommerce, [{
			key: 'debugLevel',

			/**
    * Retrieve the debug level.
    *
    * @return string
    */
			get: function get() {
				return debugLevel$1;
			}

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

		}]);

		function TurboEcommerce(settings) {
			_classCallCheck(this, TurboEcommerce);

			if ((typeof settings === 'undefined' ? 'undefined' : _typeof(settings)) != 'object') {
				throw new InvalidArgumentException$1();
			}

			this.container = new Container();
			this.settings = Common.extend(defaultSettings$5, settings);

			this.loadExternalLibraries();

			document.addEventListener('DOMContentLoaded', function () {
				this.setElement(this.settings.element);

				if (this.settings.loading_animation) {
					startLoading.call(this);
				}

				this.addStyleTag();
			}.bind(this));

			debugLevel$1 = this.settings.debug_level;

			ExceptionHandler.setDebugLevel = debugLevel$1;

			if (debugLevel$1 == 'warning' || debugLevel$1 == 'info') {
				window.onerror = function () {
					return true;
				};
			}

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

		this.container.Filter.booted = false;
		this.container.Services.booted = false;
		this.container.Products.booted = false;
		this.container.Pagination.booted = false;
		this.container.Cart.booted = false;
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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlR1cmJvRWNvbW1lcmNlLmpzIl0sIm5hbWVzIjpbIlR1cmJvRWNvbW1lcmNlIiwiU3RyIiwic3RyaW5nIiwicmVwbGFjZSIsInRvTG93ZXJDYXNlIiwibGVuZ3RoIiwicG9zc2libGUiLCJpIiwiY2hhckF0IiwiTWF0aCIsImZsb29yIiwicmFuZG9tIiwidG9VcHBlckNhc2UiLCJzbGljZSIsImRlYnVnTGV2ZWwiLCJFeGNlcHRpb25IYW5kbGVyIiwibGV2ZWwiLCJFcnJvciIsImNhcHR1cmVTdGFja1RyYWNlIiwiY29uc3RydWN0b3IiLCJuYW1lIiwiZXJyb3IiLCJtZXNzYWdlIiwiY3VzdG9tQWN0aW9ucyIsImhhbmRsZUVycm9ycyIsImhhbmRsZVdhcm5pbmdzIiwiaGFuZGxlSW5mb3MiLCJjb25zb2xlIiwid2FybiIsImluZm8iLCJkZWZhdWx0TWVzc2FnZSIsIkludmFsaWRBcmd1bWVudEV4Y2VwdGlvbiQxIiwiRE9NIiwiZWxlbWVudCIsImNsYXNzTmFtZSIsIm5ld0NsYXNzTmFtZSIsInJlbW92ZUNsYXNzIiwiYWRkQ2xhc3MiLCJ1bmRlZmluZWQiLCJjbGFzc05hbWVzIiwic3BsaXQiLCJmb3JFYWNoIiwiY2xhc3NMaXN0IiwiYWRkIiwiaW5kZXhPZiIsInJlbW92ZSIsInBhcmVudE5vZGUiLCJyZW1vdmVDaGlsZCIsImlkIiwiY3NzIiwiaGVhZCIsImRvY3VtZW50IiwiZ2V0RWxlbWVudHNCeVRhZ05hbWUiLCJzdHlsZVRhZyIsImNyZWF0ZUVsZW1lbnQiLCJDU1MiLCJtaW5pZnlDc3MiLCJpbm5lckhUTUwiLCJzZXRBdHRyaWJ1dGUiLCJhcHBlbmRDaGlsZCIsInNvdXJjZSIsImxpbmtlZFN0eWxlVGFnIiwiZWxlbWVudFR5cGUiLCJvcHRpb25zIiwib3B0aW9uIiwic2Vjb25kQ2xhc3NOYW1lIiwidG9nZ2xlIiwic2VsZWN0b3IiLCJjb250ZXh0Iiwid2luZG93IiwicXVlcnlFbGVtZW50IiwiaW5zZXJ0QmVmb3JlIiwibmV4dFNpYmxpbmciLCJwYXJlbnRFbGVtZW50IiwicXVlcnlTZWxlY3RvckFsbCIsImhhc0NoaWxkIiwiY2hpbGRFbGVtZW50Iiwibm9kZSIsIkNvbW1vbiIsImN1cnJlbnRPYmplY3QiLCJuZXdPYmplY3QiLCJleHRlbmRlZCIsInByb3AiLCJPYmplY3QiLCJwcm90b3R5cGUiLCJoYXNPd25Qcm9wZXJ0eSIsImNhbGwiLCJuZWVkbGUiLCJoeXN0YWNrIiwiQXJyYXkiLCJ0b3RhbCIsInNpemUiLCJpc05hTiIsInBhcnNlSW50IiwiY29sbGVjdGlvbiIsImNlaWwiLCJzdGFydCIsImVuZCIsInB1c2giLCJvYmplY3QiLCJkZWZhdWx0TWVzc2FnZSQxIiwiSW52YWxpZERhdGFTdHJ1Y3R1cmVFeGNlcHRpb24iLCJkZWZhdWx0U2V0dGluZ3MiLCJoZWFkZXJzIiwiYXN5bmMiLCJSZXF1ZXN0Iiwic2V0dGluZ3MiLCJleHRlbmQiLCJzZXREZWZhdWx0UmVxdWVzdEhlYWRlciIsImhlYWRlciIsIm9wZW4iLCJYTUxIdHRwUmVxdWVzdCIsInNldFJlcXVlc3RIZWFkZXIiLCJyZXNwb25zZSIsImFwcGx5IiwiYXJndW1lbnRzIiwieGhyIiwiYmVmb3JlIiwiUHJvbWlzZSIsInJlc29sdmUiLCJyZWplY3QiLCJkYXRhIiwidXJsIiwicmVzcG9uc2VUeXBlIiwiZGF0YVR5cGUiLCJ0aW1lb3V0Iiwib25yZWFkeXN0YXRlY2hhbmdlIiwicmVhZHlTdGF0ZSIsInN0YXR1cyIsImFmdGVyIiwib25lcnJvciIsInNlbmQiLCJxdWVyeVN0cmluZyIsImtleXMiLCJtYXAiLCJrZXkiLCJlbmNvZGVVUklDb21wb25lbnQiLCJqb2luIiwiQWN0aXZlWE9iamVjdCIsInJlc3BvbnNlVGV4dCIsIkpTT04iLCJwYXJzZSIsImRlZmF1bHRNZXNzYWdlJDIiLCJJbnZhbGlkQmluZGluZ0V4Y2VwdGlvbiIsImluc3RhbmNlcyIsIkNvbnRhaW5lciIsImNvbmNyZXRlIiwiYmluZCIsImluc3RhbmNlIiwiYWxpYXMiLCJpbnN0YW5jZUV4aXN0IiwiZ2V0SW5zdGFuY2UiLCJzZXRJbnN0YW5jZSIsImRlZmF1bHRNZXNzYWdlJDMiLCJCYWRFdmVudENhbGxFeGNlcHRpb24iLCJFdmVudE1hbmFnZXIiLCJldmVudHMiLCJjYWxsYmFjayIsIkludmFsaWRBcmd1bWVudEV4Y2VwdGlvbiIsIkNvb2tpZSIsInZhbHVlIiwiZGF5cyIsInN0cmluZ2lmeSIsImV4cGlyZXMiLCJkYXRlIiwiRGF0ZSIsInNldFRpbWUiLCJnZXRUaW1lIiwidG9HTVRTdHJpbmciLCJjb29raWUiLCJjX3N0YXJ0IiwiY19lbmQiLCJ1bmVzY2FwZSIsInN1YnN0cmluZyIsImRlZmF1bHRTZXR0aW5ncyQxIiwiY29va2llX25hbWUiLCJwcmV2aWV3X2NsYXNzIiwibG9hZGVyIiwiY2xhc3MiLCJ3aWR0aCIsImhlaWdodCIsInBsYWNlbWVudCIsImZpeGVkIiwiaG92ZXJfY29sb3IiLCJub19jc3MiLCJDb250YWluZXIkMiIsIkV2ZW50TWFuYWdlciQyIiwiSHR0cCIsImxvYWRpbmdPdmVybGF5IiwiaXRlbXNEaXYiLCJDYXJ0IiwiY29udGFpbmVyIiwiaHR0cCIsImV2ZW50TWFuYWdlciIsInByZXZpZXdFbGVtZW50IiwiY3JlYXRlUHJldmlld0VsZW1lbnQiLCJpY29uIiwiY3JlYXRlSWNvbiIsInNldEVsZW1lbnQiLCJiaW5kRXZlbnRMaXN0ZW5lcnMiLCJhZGRTdHlsZVRhZyIsImlzRW1wdHkiLCJnZXQiLCJzZXR1cENhcnQiLCJjYXJ0IiwiZW1wdHlPYmplY3QiLCJpdGVtcyIsImZhdm9yaXRlcyIsInNldCIsIml0ZW0iLCJxdWFudGl0eSIsImluY3JlbWVudGVkIiwiYWxyZWFkeUZhdm9yaXRlZCIsInNwbGljZSIsInRhYmxlIiwiYXR0cmlidXRlcyIsInRyIiwidGQiLCJhdHRyaWJ1dGUiLCJpbWFnZSIsInNyYyIsImNvbHNwYW4iLCJjaGVja291dCIsInRleHQiLCJmaW5kIiwicG9zaXRpb24iLCJhZGRTdHlsZSIsImNyZWF0ZUxvYWRlciIsInByZXZpZXdTdGFydExvYWRpbmciLCJnZXRDYXJ0SXRlbXMiLCJhZGRUb1ByZXZpZXciLCJzZXRUaW1lb3V0IiwicHJldmlld1N0b3BMb2FkaW5nIiwib25jbGljayIsImUiLCJwcmV2ZW50RGVmYXVsdCIsInRvZ2dsZUNhcnRQcmV2aWV3Iiwic3Vic2NyaWJlIiwib3BlbkNhcnRQcmV2aWV3IiwiYWRkSXRlbSIsInJlbG9hZENhcnRQcmV2aWV3IiwiZmF2b3JpdGVJdGVtIiwiaGFzQ2xhc3MiLCJzd2l0Y2hDbGFzc2VzIiwib3BlbmluZyIsInRvZ2dsZUNsYXNzIiwiY2xvc2UiLCJldmVudCIsInN2ZyIsImNyZWF0ZUVsZW1lbnROUyIsImciLCJwYXRoIiwiZGl2IiwiY291bnQiLCJncm91cHMiLCJyZWN0YW5nZWxzIiwiYW5pbWF0aW9ucyIsInJvdGF0aW9uIiwiZ3JvdXAiLCJyZWN0YW5nZWwiLCJiZWdpbiIsImFuaW1hdGUiLCJ0b0ZpeGVkIiwiZGVmYXVsdFNldHRpbmdzJDIiLCJDb250YWluZXIkMyIsIkZpbHRlciIsImFkZEV2ZW50TGlzdGVuZXIiLCJ3cmFwcGVyIiwibWluV2lkdGgiLCJtaW5fd2lkdGgiLCJkZWZhdWx0U2V0dGluZ3MkMyIsIml0ZW1fY2xhc3MiLCJhZGRfYnV0dG9uX2NsYXNzIiwiZmF2b3JpdGVfYnV0dG9uX2NsYXNzIiwiQ29udGFpbmVyJDQiLCJFdmVudE1hbmFnZXIkMyIsIkh0dHAkMSIsImNodW5rZWRQcm9kdWN0cyIsIlByb2R1Y3RzIiwidG90YWxJdGVtcyIsImxvYWRQcm9kdWN0cyIsInBhZ2VOdW1iZXIiLCJQYWdpbmF0aW9uIiwiYm9vdGVkIiwicHJvY2Nlc3NpbmciLCJsb2FkUGFnZVByb2R1Y3RzQnlDbGllbnQiLCJsb2FkUGFnZVByb2R1Y3RzQnlTZXJ2ZXIiLCJyZXF1ZXN0IiwiZ2V0UHJvZHVjdHMiLCJ0aGVuIiwicHJvZHVjdHMiLCJjdXJyZW50SXRlbXMiLCJwcm9kdWN0IiwicHVibGlzaCIsInJlcGxhY2VJdGVtcyIsImNhdGNoIiwicGFnZXMiLCJjYWxjdWxhdGVDbGllbnRQYWdlcyIsInRvdGFsX2l0ZW1zIiwicGVyUGFnZSIsInBlcl9wYWdlIiwiYXJyYXlfY2h1bmsiLCJpc0FycmF5IiwiYnVpbGRQcm9kdWN0cyIsImFjdGlvbiIsImF0dHJpYnV0ZXNDb2xsZWN0aW9uIiwidGFnVHlwZSIsImJ1aWx0UHJvZHVjdHMiLCJidWlsdFByb2R1Y3QiLCJidWlsZFByb2R1Y3QiLCJvdmVybGF5IiwiaW5fYXJyYXkiLCJ0YWciLCJrZWJhYkNhc2UiLCJhZGRUb0NhcnQiLCJ0eXBlIiwiZmF2b3JpdGUiLCJtYXhXaWR0aCIsIm1heF93aWR0aCIsIlNlcnZpY2VzIiwiZGVmYXVsdE1lc3NhZ2UkNCIsIk5vdEluUGFnZVJhbmdlRXhjZXB0aW9uIiwiZGVmYXVsdFNldHRpbmdzJDQiLCJDb250YWluZXIkNSIsIlByb2R1Y3RzJDIiLCJFdmVudE1hbmFnZXIkNCIsInNldEN1cnJlbnQiLCJ0b3RhbFBhZ2VzIiwiY2FsY3VsYXRlVG90YWxQYWdlcyIsImJ1aWxkUGFnaW5hdGlvbiIsImxpbmtzIiwiY3JlYXRlTGlua3MiLCJyZXBsYWNlTGlua3MiLCJuZXh0IiwiY2hpbGROb2RlcyIsInJlcXVlc3RlZFBhZ2UiLCJjdXJyZW50Iiwibm90SW5QYWdlUmFuZ2UiLCJwcmV2aW91cyIsImdldEF0dHJpYnV0ZSIsImNoYW5nZVVybCIsInNldEFjdGl2ZUxpbmsiLCJ1bCIsImNyZWF0ZVBhZ2VMaW5rcyIsImNyZWF0ZVByZXZpb3VzQnV0dG9uIiwiY3JlYXRlTmV4dEJ1dHRvbiIsInBhZ2UiLCJwYWdlSXRlbSIsImxpbmsiLCJsaSIsInNwYW4xIiwic3BhbjIiLCJoaXN0b3J5IiwicmVwbGFjZVN0YXRlIiwidXBkYXRlVVJMUGFyYW1ldGVyIiwibG9jYXRpb24iLCJocmVmIiwidmFycyIsInBhcnRzIiwibSIsInBhcmFtIiwicGFyYW1WYWwiLCJuZXdBZGRpdGlvbmFsVVJMIiwidGVtcEFycmF5IiwiYmFzZVVSTCIsImFkZGl0aW9uYWxVUkwiLCJ0ZW1wIiwicm93c1RleHQiLCJkZWZhdWx0TWVzc2FnZSQ1IiwiQ29tcG9uZW50Tm90UmVnaXN0ZXJlZEV4Y2VwdGlvbiIsImRlZmF1bHRTZXR0aW5ncyQ1IiwiZGVidWdfbGV2ZWwiLCJpbmplY3RfbGlicmFyaWVzIiwiY29tcG9uZW50cyIsImxvYWRpbmdfYW5pbWF0aW9uIiwiZXh0ZXJuYWxMaWJyYXJpZXMiLCJib290c3RyYXAiLCJkZWJ1Z0xldmVsJDEiLCJsb2FkRXh0ZXJuYWxMaWJyYXJpZXMiLCJzdGFydExvYWRpbmciLCJzZXREZWJ1Z0xldmVsIiwiYmluZENvbXBvbmVudHNEZXBlbmRlbmNpZXMiLCJQcm94eSIsInRhcmdldCIsIm1ha2UiLCJsaWJyYXJpZXMiLCJ1Y2ZpcnN0IiwiYWRkTGlua2VkU3R5bGUiLCJkb2N1bWVudEVsZW1lbnQiLCJjbGllbnRXaWR0aCIsImNvbXBvbmVudCIsIkV2ZW50cyIsImZpbGwiLCJib2R5IiwicHJvZ3Jlc3MiLCJtYXhTaXplIiwicmVxdWVzdEFuaW1hdGlvbkZyYW1lIiwicHJvZ3Jlc3NEcmF3IiwiY29udGVudCIsInN0eWxlIiwiZGlzcGxheSIsInRyYW5zZm9ybSIsImRvbmUiLCJvcGFjaXR5Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsSUFBSUEsaUJBQWtCLFlBQVk7QUFDbEM7O0FBRUE7Ozs7Ozs7O0FBSGtDLEtBVzVCQyxHQVg0QjtBQUFBO0FBQUE7QUFBQTs7QUFBQTtBQUFBOztBQWFqQzs7Ozs7O0FBYmlDLDZCQW1CaEJDLE1BbkJnQixFQW9CakM7QUFDQyxXQUFPQSxPQUFPQyxPQUFQLENBQWUsaUJBQWYsRUFBa0MsT0FBbEMsRUFBMkNDLFdBQTNDLEVBQVA7QUFDQTs7QUFFRDs7Ozs7OztBQXhCaUM7QUFBQTtBQUFBLDBCQThCbkJDLE1BOUJtQixFQStCakM7QUFDQyxRQUFJSCxTQUFTLEVBQWI7QUFDQSxRQUFJSSxXQUFXLGdFQUFmOztBQUVBLFNBQUssSUFBSUMsSUFBSSxDQUFiLEVBQWdCQSxJQUFJRixNQUFwQixFQUE0QkUsR0FBNUIsRUFBaUM7QUFDN0JMLGVBQVVJLFNBQVNFLE1BQVQsQ0FBZ0JDLEtBQUtDLEtBQUwsQ0FBV0QsS0FBS0UsTUFBTCxLQUFnQkwsU0FBU0QsTUFBcEMsQ0FBaEIsQ0FBVjtBQUNIOztBQUVELFdBQU9ILE1BQVA7QUFDQTs7QUFFRDs7Ozs7Ozs7QUExQ2lDO0FBQUE7QUFBQSwyQkFpRGxCQSxNQWpEa0IsRUFrRGpDO0FBQ0ksV0FBT0EsT0FBT00sTUFBUCxDQUFjLENBQWQsRUFBaUJJLFdBQWpCLEtBQWlDVixPQUFPVyxLQUFQLENBQWEsQ0FBYixDQUF4QztBQUNIO0FBcERnQzs7QUFBQTtBQUFBOztBQXVEbEM7Ozs7Ozs7QUFLQSxLQUFJQyxtQkFBSjs7QUE1RGtDLEtBOEQ1QkMsZ0JBOUQ0QjtBQUFBO0FBQUE7O0FBZ0VqQzs7Ozs7O0FBaEVpQyxxQkFzRVJDLEtBdEVRLEVBdUVqQztBQUNDRixpQkFBYUUsS0FBYjtBQUNBOztBQUVEOzs7Ozs7O0FBM0VpQzs7QUFpRmpDLDhCQUNBO0FBQUE7O0FBQ0MsT0FBSUMsTUFBTUMsaUJBQVYsRUFBNkI7QUFDNUJELFVBQU1DLGlCQUFOLENBQXdCLElBQXhCLEVBQThCLEtBQUtDLFdBQUwsQ0FBaUJDLElBQS9DO0FBQ0E7QUFDRDs7QUFFRDs7Ozs7Ozs7O0FBeEZpQztBQUFBO0FBQUEsOEJBK0Z0QkMsS0EvRnNCLEVBK0ZmQyxPQS9GZSxFQWdHakM7QUFDQyxTQUFLQyxhQUFMLENBQW1CRixLQUFuQixFQUEwQkMsT0FBMUI7O0FBRUEsWUFBT1IsVUFBUDtBQUVDLFVBQUssT0FBTDtBQUFjLFdBQUtVLFlBQUwsQ0FBa0JILEtBQWxCLEVBQXlCQyxPQUF6QixFQUFtQztBQUNqRCxVQUFLLFNBQUw7QUFBZ0IsV0FBS0csY0FBTCxDQUFvQkosS0FBcEIsRUFBMkJDLE9BQTNCLEVBQXFDO0FBQ3JELFVBQUssTUFBTDtBQUFhLFdBQUtJLFdBQUwsQ0FBaUJMLEtBQWpCLEVBQXdCQyxPQUF4QixFQUFrQztBQUMvQztBQUFTLFdBQUtJLFdBQUwsQ0FBaUJMLEtBQWpCLEVBQXdCQyxPQUF4QixFQUFrQztBQUw1QztBQU9BOztBQUVEOzs7Ozs7OztBQTVHaUM7QUFBQTtBQUFBLGlDQW1IbkJELEtBbkhtQixFQW1IWkMsT0FuSFksRUFvSGpDO0FBQ0MsUUFBSUQsTUFBTUYsV0FBTixDQUFrQkMsSUFBbEIsSUFBMEIsMEJBQTlCLEVBQTBEO0FBQ3pEO0FBQ0EsS0FGRCxNQUVPLElBQUlDLE1BQU1GLFdBQU4sQ0FBa0JDLElBQWxCLElBQTBCLHlCQUE5QixFQUF5RDtBQUMvRDtBQUNBLEtBRk0sTUFFQSxJQUFJQyxNQUFNRixXQUFOLENBQWtCQyxJQUFsQixJQUEwQix1QkFBOUIsRUFBdUQ7QUFDN0Q7QUFDQSxLQUZNLE1BRUEsSUFBSUMsTUFBTUYsV0FBTixDQUFrQkMsSUFBbEIsSUFBMEIscUJBQTlCLEVBQXFEO0FBQzNEO0FBQ0EsS0FGTSxNQUVBLElBQUlDLE1BQU1GLFdBQU4sQ0FBa0JDLElBQWxCLElBQTBCLGlDQUE5QixFQUFpRTtBQUN2RTtBQUNBLEtBRk0sTUFFQSxJQUFJQyxNQUFNRixXQUFOLENBQWtCQyxJQUFsQixJQUEwQix5QkFBOUIsRUFBeUQ7QUFDL0Q7QUFDQSxLQUZNLE1BRUE7QUFDTixZQUFPLEtBQVA7QUFDQTs7QUFFRCxXQUFPLEtBQVA7QUFDQTtBQXRJZ0M7QUFBQTtBQUFBLGdDQXdJcEJDLEtBeElvQixFQXdJYkMsT0F4SWEsRUF5SWpDO0FBQ0NLLFlBQVFOLEtBQVIsQ0FBY0EsTUFBTUYsV0FBTixDQUFrQkMsSUFBbEIsR0FBeUIsSUFBekIsR0FBZ0NFLE9BQTlDO0FBQ0E7QUEzSWdDO0FBQUE7QUFBQSxrQ0E2SWxCRCxLQTdJa0IsRUE2SVhDLE9BN0lXLEVBOElqQztBQUNDSyxZQUFRQyxJQUFSLENBQWFQLE1BQU1GLFdBQU4sQ0FBa0JDLElBQWxCLEdBQXlCLElBQXpCLEdBQWdDRSxPQUE3QztBQUNBO0FBaEpnQztBQUFBO0FBQUEsK0JBa0pyQkQsS0FsSnFCLEVBa0pkQyxPQWxKYyxFQW1KakM7QUFDQ0ssWUFBUUUsSUFBUixDQUFhUixNQUFNRixXQUFOLENBQWtCQyxJQUFsQixHQUF5QixJQUF6QixHQUFnQ0UsT0FBN0M7QUFDQTtBQXJKZ0M7O0FBQUE7QUFBQTs7QUF3SmxDLEtBQUlRLGlCQUFpQixpQ0FBckI7O0FBeEprQyxLQTBKNUJDLDBCQTFKNEI7QUFBQTs7QUE0SmpDLHdDQUNBO0FBQUEsT0FEWVQsT0FDWix1RUFEc0IsSUFDdEI7O0FBQUE7O0FBQ0NBLGFBQVVBLFdBQVdRLGNBQXJCOztBQURELHVKQUVPUixPQUZQOztBQUdJLCtKQUF1QkEsT0FBdkI7QUFISjtBQUlJOztBQWpLNkI7QUFBQSxHQTBKT1AsZ0JBMUpQOztBQW9LbEM7Ozs7Ozs7O0FBcEtrQyxLQTRLNUJpQixHQTVLNEI7QUFBQTtBQUFBO0FBQUE7O0FBQUE7QUFBQTs7QUE4S2pDOzs7Ozs7QUE5S2lDLDZCQW9MaEI5QixNQXBMZ0IsRUFxTGpDO0FBQ0lBLGFBQVNBLE9BQU9DLE9BQVAsQ0FBZSx3Q0FBZixFQUF5RCxFQUF6RCxDQUFUO0FBQ0FELGFBQVNBLE9BQU9DLE9BQVAsQ0FBZSxRQUFmLEVBQXlCLEdBQXpCLENBQVQ7QUFDQUQsYUFBU0EsT0FBT0MsT0FBUCxDQUFlLFVBQWYsRUFBMkIsSUFBM0IsQ0FBVDtBQUNBRCxhQUFTQSxPQUFPQyxPQUFQLENBQWUsVUFBZixFQUEyQixJQUEzQixDQUFUO0FBQ0FELGFBQVNBLE9BQU9DLE9BQVAsQ0FBZSxLQUFmLEVBQXNCLEdBQXRCLENBQVQ7O0FBRUEsV0FBT0QsTUFBUDtBQUNIOztBQUVEOzs7Ozs7Ozs7QUEvTGlDO0FBQUE7QUFBQSxpQ0F1TVorQixPQXZNWSxFQXVNSEMsU0F2TUcsRUF1TVFDLFlBdk1SLEVBd01qQztBQUNDLFNBQUtDLFdBQUwsQ0FBaUJILE9BQWpCLEVBQTBCQyxTQUExQjtBQUNBLFNBQUtHLFFBQUwsQ0FBY0osT0FBZCxFQUF1QkUsWUFBdkI7QUFDQTs7QUFFRDs7Ozs7Ozs7QUE3TWlDO0FBQUE7QUFBQSw0QkFvTmpCRixPQXBOaUIsRUFvTlJDLFNBcE5RLEVBcU5qQztBQUNDLFFBQUdELFlBQVksSUFBZixFQUFxQjtBQUNwQixXQUFNLElBQUlGLDBCQUFKLEVBQU47QUFDQTs7QUFFRCxRQUFHLENBQUVHLFNBQUYsSUFBZUEsYUFBYSxFQUE1QixJQUFrQyxRQUFPQSxTQUFQLHlDQUFPQSxTQUFQLE9BQXFCSSxTQUExRCxFQUFxRTtBQUNwRSxZQUFPTCxPQUFQO0FBQ0E7O0FBRUQsUUFBSU0sYUFBYUwsVUFBVU0sS0FBVixDQUFnQixHQUFoQixDQUFqQjs7QUFFQUQsZUFBV0UsT0FBWCxDQUFtQixVQUFTckIsSUFBVCxFQUFlO0FBQ2pDYSxhQUFRUyxTQUFSLENBQWtCQyxHQUFsQixDQUFzQnZCLElBQXRCO0FBQ0EsS0FGRDs7QUFJQSxXQUFPYSxPQUFQO0FBQ0E7O0FBRUQ7Ozs7Ozs7O0FBdk9pQztBQUFBO0FBQUEsNEJBOE9qQkEsT0E5T2lCLEVBOE9SQyxTQTlPUSxFQStPakM7QUFDQyxRQUFJRCxZQUFZLElBQWhCLEVBQXNCO0FBQ3JCLFdBQU0sSUFBSUYsMEJBQUosQ0FBK0IsaUZBQS9CLENBQU47QUFDQTs7QUFFRCxRQUFJLENBQUVHLFNBQUYsSUFBZUEsYUFBYSxFQUE1QixJQUFrQyxPQUFPQSxTQUFQLElBQW9CLFdBQTFELEVBQXVFO0FBQ3RFO0FBQ0E7O0FBRUQsV0FBT0QsUUFBUUMsU0FBUixDQUFrQlUsT0FBbEIsQ0FBMEJWLFNBQTFCLEtBQXdDLENBQUMsQ0FBaEQ7QUFDQTs7QUFFRDs7Ozs7Ozs7QUEzUGlDO0FBQUE7QUFBQSwrQkFrUWRELE9BbFFjLEVBa1FMQyxTQWxRSyxFQW1RakM7QUFDQyxRQUFHRCxXQUFXLElBQWQsRUFBb0I7QUFDbkIsV0FBTSxJQUFJRiwwQkFBSixFQUFOO0FBQ0E7O0FBRUQsUUFBR0csYUFBYSxFQUFoQixFQUFvQjtBQUNuQkQsYUFBUUMsU0FBUixHQUFvQixFQUFwQjtBQUNBLEtBRkQsTUFFTzs7QUFFTixTQUFJSyxhQUFhTCxVQUFVTSxLQUFWLENBQWdCLEdBQWhCLENBQWpCOztBQUVBRCxnQkFBV0UsT0FBWCxDQUFtQixVQUFTckIsSUFBVCxFQUFlO0FBQ2pDYSxjQUFRUyxTQUFSLENBQWtCRyxNQUFsQixDQUF5QnpCLElBQXpCO0FBQ0EsTUFGRDtBQUdBOztBQUVELFdBQU9hLE9BQVA7QUFDQTs7QUFFRDs7Ozs7OztBQXRSaUM7QUFBQTtBQUFBLDBCQTRSbkJBLE9BNVJtQixFQTZSakM7QUFDQ0EsWUFBUWEsVUFBUixDQUFtQkMsV0FBbkIsQ0FBK0JkLE9BQS9CO0FBQ0E7O0FBRUQ7Ozs7Ozs7O0FBalNpQztBQUFBO0FBQUEsNEJBd1NqQmUsRUF4U2lCLEVBd1NiQyxHQXhTYSxFQXlTakM7QUFDQyxRQUFJLE9BQU9BLEdBQVAsSUFBYyxRQUFsQixFQUE0QjtBQUMzQixXQUFNLElBQUlsQiwwQkFBSixFQUFOO0FBQ0E7O0FBRUQsUUFBSW1CLE9BQU9DLFNBQVNELElBQVQsSUFBaUJDLFNBQVNDLG9CQUFULENBQThCLE1BQTlCLEVBQXNDLENBQXRDLENBQTVCO0FBQ0EsUUFBSUMsV0FBV0YsU0FBU0csYUFBVCxDQUF1QixPQUF2QixDQUFmOztBQUVBO0FBQ0csUUFBSUMsTUFBTSxLQUFLQyxTQUFMLENBQWVQLEdBQWYsQ0FBVjtBQUNBO0FBQ0FJLGFBQVNJLFNBQVQsR0FBcUJGLEdBQXJCO0FBQ0E7QUFDSEYsYUFBU0ssWUFBVCxDQUFzQixJQUF0QixFQUE0QlYsRUFBNUI7QUFDQTtBQUNBRSxTQUFLUyxXQUFMLENBQWlCTixRQUFqQjtBQUNBOztBQUVEOzs7Ozs7OztBQTNUaUM7QUFBQTtBQUFBLGtDQWtVWEwsRUFsVVcsRUFrVVBZLE1BbFVPLEVBbVVqQztBQUNDLFFBQUksT0FBT0EsTUFBUCxJQUFpQixRQUFyQixFQUErQjtBQUM5QixXQUFNLElBQUk3QiwwQkFBSixDQUErQixrRkFBaUY2QixNQUFqRix5Q0FBaUZBLE1BQWpGLEtBQTBGLHNCQUF6SCxDQUFOO0FBQ0E7O0FBRUQsUUFBSVYsT0FBT0MsU0FBU0QsSUFBVCxJQUFpQkMsU0FBU0Msb0JBQVQsQ0FBOEIsTUFBOUIsRUFBc0MsQ0FBdEMsQ0FBNUI7QUFDQSxRQUFJUyxpQkFBaUJWLFNBQVNHLGFBQVQsQ0FBdUIsTUFBdkIsQ0FBckI7O0FBRUc7QUFDSE8sbUJBQWVILFlBQWYsQ0FBNEIsSUFBNUIsRUFBa0NWLEVBQWxDO0FBQ0FhLG1CQUFlSCxZQUFmLENBQTRCLE1BQTVCLEVBQW9DRSxNQUFwQztBQUNBQyxtQkFBZUgsWUFBZixDQUE0QixLQUE1QixFQUFtQyxZQUFuQztBQUNBRyxtQkFBZUgsWUFBZixDQUE0QixNQUE1QixFQUFvQyxVQUFwQztBQUNBO0FBQ0FSLFNBQUtTLFdBQUwsQ0FBaUJFLGNBQWpCO0FBQ0E7O0FBRUQ7Ozs7Ozs7O0FBcFZpQztBQUFBO0FBQUEsaUNBMlZaQyxXQTNWWSxFQTJWQ0MsT0EzVkQsRUE0VmpDO0FBQ0MsUUFBSTlCLFVBQVVrQixTQUFTRyxhQUFULENBQXVCUSxXQUF2QixDQUFkOztBQUVBLFFBQUlDLFlBQVl6QixTQUFoQixFQUEyQjtBQUMxQixZQUFPTCxPQUFQO0FBQ0E7O0FBRUQsU0FBSyxJQUFJK0IsTUFBVCxJQUFtQkQsT0FBbkIsRUFBNEI7QUFDM0IsU0FBR0MsVUFBVSxNQUFiLEVBQXFCO0FBQ3BCL0IsY0FBUXdCLFNBQVIsR0FBb0JNLFFBQVFDLE1BQVIsQ0FBcEI7QUFDQTtBQUNBOztBQUVEL0IsYUFBUXlCLFlBQVIsQ0FBcUJNLE1BQXJCLEVBQTZCRCxRQUFRQyxNQUFSLENBQTdCO0FBQ0E7O0FBRUQsV0FBTy9CLE9BQVA7QUFDQTs7QUFFRDs7Ozs7Ozs7QUEvV2lDO0FBQUE7QUFBQSwrQkFzWGRBLE9BdFhjLEVBc1hMQyxTQXRYSyxFQXNYTStCLGVBdFhOLEVBdVhqQztBQUNDLFFBQUloQyxXQUFXLElBQVgsSUFBbUIsT0FBT0EsT0FBUCxJQUFrQixXQUF6QyxFQUFzRDtBQUNyRCxXQUFNLElBQUlGLDBCQUFKLEVBQU47QUFDQTs7QUFFRGtDLHNCQUFrQkEsbUJBQW1CM0IsU0FBckM7O0FBRUEsUUFBRzJCLGVBQUgsRUFBb0I7QUFDbkJoQyxhQUFRUyxTQUFSLENBQWtCd0IsTUFBbEIsQ0FBeUJELGVBQXpCO0FBQ0E7O0FBRUQsV0FBT2hDLFFBQVFTLFNBQVIsQ0FBa0J3QixNQUFsQixDQUF5QmhDLFNBQXpCLENBQVA7QUFDQTs7QUFFRDs7Ozs7Ozs7QUFyWWlDO0FBQUE7QUFBQSx3QkE0WXJCaUMsUUE1WXFCLEVBNllqQztBQUFBLFFBRHNCQyxPQUN0Qix1RUFEZ0NDLE9BQU9sQixRQUN2Qzs7QUFDQyxXQUFPbUIsYUFBYUgsUUFBYixFQUF1QkMsT0FBdkIsQ0FBUDtBQUNBOztBQUVEOzs7Ozs7OztBQWpaaUM7QUFBQTtBQUFBLCtCQXdaZEEsT0F4WmMsRUF3WkxuQyxPQXhaSyxFQXlaakM7QUFDQ21DLFlBQVF0QixVQUFSLENBQW1CeUIsWUFBbkIsQ0FBZ0N0QyxPQUFoQyxFQUF5Q21DLFFBQVFJLFdBQWpEO0FBQ0E7QUEzWmdDOztBQUFBO0FBQUE7O0FBOFpsQzs7Ozs7Ozs7O0FBT0EsVUFBU0YsWUFBVCxDQUFzQkgsUUFBdEIsRUFBZ0NNLGFBQWhDLEVBQ0E7QUFDQyxNQUFJLE9BQU9OLFFBQVAsSUFBbUIsUUFBdkIsRUFBaUM7QUFDaEMsU0FBTSxJQUFJcEMsMEJBQUosQ0FBK0Isd0VBQXVFb0MsUUFBdkUseUNBQXVFQSxRQUF2RSxLQUFrRixzQkFBakgsQ0FBTjtBQUNBOztBQUVELE1BQUlNLGtCQUFrQixJQUF0QixFQUE0QjtBQUMzQixTQUFNLElBQUkxQywwQkFBSixDQUErQixpR0FBL0IsQ0FBTjtBQUNBOztBQUVELE1BQUlFLFVBQVV3QyxjQUFjQyxnQkFBZCxDQUErQlAsUUFBL0IsQ0FBZDs7QUFFQSxNQUFJbEMsUUFBUTVCLE1BQVIsSUFBa0IsQ0FBdEIsRUFBeUI7QUFDeEIsVUFBTyxJQUFQO0FBQ0E7O0FBRUQsU0FBUTRCLFFBQVE1QixNQUFSLEdBQWlCLENBQWxCLEdBQXVCNEIsT0FBdkIsR0FBaUNBLFFBQVEsQ0FBUixDQUF4QztBQUNBOztBQUVEOzs7Ozs7O0FBT0EsVUFBUzBDLFFBQVQsQ0FBa0JGLGFBQWxCLEVBQWlDRyxZQUFqQyxFQUNBO0FBQ0ssTUFBSUMsT0FBT0QsYUFBYTlCLFVBQXhCOztBQUVBLFNBQU8rQixRQUFRLElBQWYsRUFBcUI7QUFDakIsT0FBSUEsUUFBUUosYUFBWixFQUEyQjtBQUN2QixXQUFPLElBQVA7QUFDSDtBQUNESSxVQUFPQSxLQUFLL0IsVUFBWjtBQUNIOztBQUVELFNBQU8sS0FBUDtBQUNKOztBQUVEOzs7Ozs7OztBQTdja0MsS0FxZDVCZ0MsTUFyZDRCO0FBQUE7QUFBQTtBQUFBOztBQUFBO0FBQUE7O0FBdWRqQzs7Ozs7OztBQXZkaUMsMEJBOGRuQkMsYUE5ZG1CLEVBOGRKQyxTQTlkSSxFQThkTztBQUN2QyxRQUFJQyxXQUFXLEVBQWY7QUFDRyxRQUFJQyxJQUFKOztBQUVBLFNBQUtBLElBQUwsSUFBYUgsYUFBYixFQUE0QjtBQUN4QixTQUFJSSxPQUFPQyxTQUFQLENBQWlCQyxjQUFqQixDQUFnQ0MsSUFBaEMsQ0FBcUNQLGFBQXJDLEVBQW9ERyxJQUFwRCxDQUFKLEVBQStEO0FBQzNERCxlQUFTQyxJQUFULElBQWlCSCxjQUFjRyxJQUFkLENBQWpCO0FBQ0g7QUFDSjs7QUFFRCxTQUFLQSxJQUFMLElBQWFGLFNBQWIsRUFBd0I7QUFDcEIsU0FBSUcsT0FBT0MsU0FBUCxDQUFpQkMsY0FBakIsQ0FBZ0NDLElBQWhDLENBQXFDTixTQUFyQyxFQUFnREUsSUFBaEQsQ0FBSixFQUEyRDtBQUN2REQsZUFBU0MsSUFBVCxJQUFpQkYsVUFBVUUsSUFBVixDQUFqQjtBQUNIO0FBQ0o7O0FBRUQsV0FBT0QsUUFBUDtBQUNIOztBQUVEOzs7Ozs7Ozs7QUFqZmlDO0FBQUE7QUFBQSw0QkF5ZmpCTSxNQXpmaUIsRUF5ZlRDLE9BemZTLEVBeWZBO0FBQ2hDLFFBQUdBLFFBQVFyRSxXQUFSLEtBQXdCc0UsS0FBM0IsRUFBa0M7QUFDakMsV0FBTSxJQUFJMUQsMEJBQUosRUFBTjtBQUNBOztBQUVELFNBQUksSUFBSXhCLElBQUksQ0FBWixFQUFlQSxLQUFLaUYsUUFBUW5GLE1BQTVCLEVBQW9DRSxHQUFwQyxFQUF5QztBQUN4QyxTQUFHZ0YsVUFBVUMsUUFBUWpGLENBQVIsQ0FBYixFQUF5QjtBQUN4QixhQUFPLElBQVA7QUFDQTtBQUNEOztBQUVELFdBQU8sS0FBUDtBQUNBOztBQUVEOzs7Ozs7OztBQXZnQmlDO0FBQUE7QUFBQSwrQkE4Z0JkbUYsS0E5Z0JjLEVBK2dCakM7QUFBQSxRQUQwQkMsSUFDMUIsdUVBRGlDLENBQ2pDOztBQUNNLFFBQUlDLE1BQU1ELElBQU4sQ0FBSixFQUFpQjtBQUNoQixXQUFNLElBQUk1RCwwQkFBSixDQUErQixtRkFBa0Y0RCxJQUFsRix5Q0FBa0ZBLElBQWxGLEtBQXlGLGtCQUF4SCxDQUFOO0FBQ0E7O0FBRURBLFdBQU9FLFNBQVNGLElBQVQsQ0FBUDs7QUFFQyxRQUFJcEYsVUFBSjtBQUNBLFFBQUl1RixhQUFhLEVBQWpCOztBQUVBO0FBQ0EsU0FBS3ZGLElBQUksQ0FBVCxFQUFZQSxJQUFJRSxLQUFLc0YsSUFBTCxDQUFVTCxNQUFNckYsTUFBTixHQUFlc0YsSUFBekIsQ0FBaEIsRUFBZ0RwRixHQUFoRCxFQUFxRDs7QUFFakQsU0FBSXlGLFFBQVF6RixJQUFJb0YsSUFBaEI7QUFDQSxTQUFJTSxNQUFNRCxRQUFRTCxJQUFsQjs7QUFFQUcsZ0JBQVdJLElBQVgsQ0FBZ0JSLE1BQU03RSxLQUFOLENBQVltRixLQUFaLEVBQW1CQyxHQUFuQixDQUFoQjtBQUVIOztBQUVELFdBQU9ILFVBQVA7QUFDTjs7QUFFRDs7Ozs7OztBQXRpQmlDO0FBQUE7QUFBQSwrQkE0aUJkSyxNQTVpQmMsRUE0aUJOO0FBQzFCLFNBQUssSUFBSWpCLElBQVQsSUFBaUJpQixNQUFqQixFQUF5QjtBQUN4QixZQUFPLEtBQVA7QUFDQTs7QUFFRCxXQUFPLElBQVA7QUFDQTs7QUFHRDs7Ozs7Ozs7QUFyakJpQztBQUFBO0FBQUEsa0NBNGpCWEEsTUE1akJXLEVBNGpCSFgsT0E1akJHLEVBNmpCakM7QUFDSSxRQUFJakYsVUFBSjs7QUFFQSxTQUFLQSxJQUFJLENBQVQsRUFBWUEsSUFBSWlGLFFBQVFuRixNQUF4QixFQUFnQ0UsR0FBaEMsRUFBcUM7QUFDakMsU0FBSSxPQUFPNEYsTUFBUCxJQUFpQixRQUFqQixJQUE2QlgsUUFBUWpGLENBQVIsRUFBV1ksV0FBWCxDQUF1QkMsSUFBdkIsS0FBZ0MrRSxNQUFqRSxFQUF5RTtBQUN4RSxhQUFPLElBQVA7QUFDQTs7QUFFRCxTQUFJWCxRQUFRakYsQ0FBUixNQUFlNEYsTUFBbkIsRUFBMkI7QUFDdkIsYUFBTyxJQUFQO0FBQ0g7QUFDSjs7QUFFRCxXQUFPLEtBQVA7QUFDSDs7QUFFRDs7Ozs7OztBQTdrQmlDO0FBQUE7QUFBQSw0QkFtbEJqQkEsTUFubEJpQixFQW9sQmpDO0FBQ0MsV0FBTyxRQUFPQSxNQUFQLHlDQUFPQSxNQUFQLE1BQWlCLFFBQXhCO0FBQ0E7QUF0bEJnQzs7QUFBQTtBQUFBOztBQXlsQmxDLEtBQUlDLG1CQUFtQiwrQkFBdkI7O0FBemxCa0MsS0EybEI1QkMsNkJBM2xCNEI7QUFBQTs7QUE2bEJqQywyQ0FDQTtBQUFBLE9BRFkvRSxPQUNaLHVFQURzQixJQUN0Qjs7QUFBQTs7QUFDQ0EsYUFBVUEsV0FBVzhFLGdCQUFyQjs7QUFERCw4SkFFTzlFLE9BRlA7O0FBR0ksd0tBQXVCQSxPQUF2QjtBQUhKO0FBSUk7O0FBbG1CNkI7QUFBQSxHQTJsQlVQLGdCQTNsQlY7O0FBcW1CbEM7Ozs7Ozs7QUFPQTs7Ozs7O0FBTUEsS0FBSXVGLGtCQUFrQjtBQUNyQkMsV0FBUztBQUNSLG1CQUFnQjtBQURSLEdBRFk7QUFJckJDLFNBQU87QUFKYyxFQUF0Qjs7QUFsbkJrQyxLQXluQjVCQyxPQXpuQjRCO0FBMm5CakM7Ozs7Ozs7QUFPQSxtQkFBWUMsUUFBWixFQUNBO0FBQUE7O0FBQ0MsUUFBS0EsUUFBTCxHQUFnQjVCLE9BQU82QixNQUFQLENBQWNMLGVBQWQsRUFBK0JJLFFBQS9CLENBQWhCO0FBQ0EsUUFBS0UsdUJBQUw7QUFDQTs7QUFFRDs7Ozs7OztBQXhvQmlDO0FBQUE7QUFBQSw2Q0E4b0JqQztBQUNDLFFBQUlDLGVBQUo7QUFDQSxRQUFJTixVQUFVLEtBQUtHLFFBQUwsQ0FBY0gsT0FBNUI7QUFDQSxRQUFJQyxRQUFRLEtBQUtFLFFBQUwsQ0FBY0YsS0FBMUI7QUFDQSxRQUFJTSxPQUFPQyxlQUFlM0IsU0FBZixDQUF5QjBCLElBQXBDO0FBQ0EsUUFBSUUsbUJBQW1CRCxlQUFlM0IsU0FBZixDQUF5QjRCLGdCQUFoRDs7QUFFQUQsbUJBQWUzQixTQUFmLENBQXlCMEIsSUFBekIsR0FBZ0MsWUFBVztBQUMxQyxTQUFJRyxXQUFXSCxLQUFLSSxLQUFMLENBQVcsSUFBWCxFQUFpQkMsU0FBakIsRUFBNEJYLEtBQTVCLENBQWY7O0FBRUEsVUFBS0ssTUFBTCxJQUFlTixPQUFmLEVBQXdCO0FBQ3ZCLFdBQUtTLGdCQUFMLENBQXNCSCxNQUF0QixFQUE4Qk4sUUFBUU0sTUFBUixDQUE5QjtBQUNBOztBQUVDLFlBQU9JLFFBQVA7QUFDRixLQVJEO0FBU0E7O0FBRUQ7Ozs7Ozs7QUFocUJpQztBQUFBO0FBQUEsd0JBc3FCNUJsRCxPQXRxQjRCLEVBdXFCakM7QUFDQyxRQUFJcUQsTUFBTSxLQUFLQSxHQUFmOztBQUVBLFFBQUdyRCxRQUFRc0IsY0FBUixDQUF1QixRQUF2QixLQUFvQyxPQUFPdEIsUUFBUXNELE1BQWYsSUFBeUIsVUFBaEUsRUFBNEU7QUFDM0V0RCxhQUFRc0QsTUFBUixDQUFlL0IsSUFBZixDQUFvQixJQUFwQjtBQUNBOztBQUVELFdBQU8sSUFBSWdDLE9BQUosQ0FBWSxVQUFTQyxPQUFULEVBQWtCQyxNQUFsQixFQUEwQjtBQUM1QyxTQUFHLFFBQU96RCxPQUFQLHlDQUFPQSxPQUFQLE9BQW1CLFFBQXRCLEVBQWdDO0FBQy9CLFlBQU0sSUFBSTlDLEtBQUosQ0FBVSwwRUFBd0U4QyxPQUF4RSx5Q0FBd0VBLE9BQXhFLEtBQWtGLGNBQTVGLENBQU47QUFDQTs7QUFFREEsYUFBUTBELElBQVIsR0FBZTFELFFBQVEwRCxJQUFSLElBQWdCLEVBQS9COztBQUVBLFNBQUcsUUFBTzFELFFBQVEwRCxJQUFmLE1BQXdCLFFBQTNCLEVBQXFDO0FBQ3BDLFlBQU0sSUFBSXhHLEtBQUosQ0FBVSxvRkFBbUY4QyxRQUFRMEQsSUFBM0YsSUFBa0csY0FBNUcsQ0FBTjtBQUNBOztBQUVETCxTQUFJTixJQUFKLENBQVMsTUFBVCxFQUFpQi9DLFFBQVEyRCxHQUF6QixFQUE4QixJQUE5Qjs7QUFFQU4sU0FBSU8sWUFBSixHQUFtQjVELFFBQVE2RCxRQUFSLElBQW9CLE1BQXZDO0FBQ0FSLFNBQUlTLE9BQUosR0FBYzlELFFBQVE4RCxPQUFSLElBQW1CLElBQWpDOztBQUVBVCxTQUFJVSxrQkFBSixHQUF5QixZQUFXO0FBQ2hDLFVBQUcsS0FBS0MsVUFBTCxJQUFtQixDQUFuQixJQUF3QixLQUFLQyxNQUFMLElBQWUsR0FBMUMsRUFBK0M7QUFDOUM7QUFDQTs7QUFFRVQsY0FBUSxLQUFLTixRQUFiOztBQUVBLFVBQUdsRCxRQUFRc0IsY0FBUixDQUF1QixPQUF2QixLQUFtQyxPQUFPdEIsUUFBUWtFLEtBQWYsSUFBd0IsVUFBOUQsRUFBMEU7QUFDL0VsRSxlQUFRa0UsS0FBUixDQUFjM0MsSUFBZCxDQUFtQixJQUFuQjtBQUNBO0FBQ0QsTUFWRDs7QUFZQThCLFNBQUljLE9BQUosR0FBYyxVQUFTNUcsT0FBVCxFQUFrQjtBQUMvQixVQUFHeUMsUUFBUXNCLGNBQVIsQ0FBdUIsT0FBdkIsS0FBbUMsT0FBT3RCLFFBQVExQyxLQUFmLElBQXdCLFVBQTlELEVBQTBFO0FBQ3pFMEMsZUFBUTFDLEtBQVIsQ0FBY0MsT0FBZDtBQUNBOztBQUVEa0csYUFBT2xHLE9BQVA7QUFDQSxNQU5EOztBQVFBLFNBQUcsQ0FBRXlDLFFBQVEwRCxJQUFiLEVBQW1CO0FBQ2xCTCxVQUFJZSxJQUFKLENBQVMsSUFBVDtBQUNBOztBQUVELFNBQUlDLGNBQWNqRCxPQUFPa0QsSUFBUCxDQUFZdEUsUUFBUTBELElBQXBCLEVBQTBCYSxHQUExQixDQUE4QixVQUFTQyxHQUFULEVBQWM7QUFDbkQsYUFBT0MsbUJBQW1CRCxHQUFuQixJQUEwQixHQUExQixHQUNGQyxtQkFBbUJ6RSxRQUFRMEQsSUFBUixDQUFhYyxHQUFiLENBQW5CLENBREw7QUFFRixNQUhTLEVBR1BFLElBSE8sQ0FHRixHQUhFLENBQWxCOztBQUtBckIsU0FBSWUsSUFBSixDQUFTQyxXQUFUO0FBQ0EsS0E5Q00sQ0FBUDtBQStDQTs7QUFFRDs7Ozs7OztBQS90QmlDO0FBQUE7QUFBQSx1QkFxdUI3QnJFLE9BcnVCNkIsRUFzdUJqQztBQUNDLFFBQUlxRCxNQUFNLElBQUlMLGNBQUosTUFBd0IsSUFBSTJCLGFBQUosQ0FBa0IsbUJBQWxCLENBQWxDOztBQUVBLFFBQUczRSxRQUFRc0IsY0FBUixDQUF1QixRQUF2QixLQUFvQyxPQUFPdEIsUUFBUXNELE1BQWYsSUFBeUIsVUFBaEUsRUFBNEU7QUFDM0V0RCxhQUFRc0QsTUFBUixDQUFlL0IsSUFBZixDQUFvQixJQUFwQjtBQUNBOztBQUVELFdBQU8sSUFBSWdDLE9BQUosQ0FBWSxVQUFTQyxPQUFULEVBQWtCQyxNQUFsQixFQUEwQjtBQUM1QyxTQUFHLFFBQU96RCxPQUFQLHlDQUFPQSxPQUFQLE9BQW1CLFFBQXRCLEVBQWdDO0FBQy9CLFlBQU0sSUFBSTlDLEtBQUosQ0FBVSwwRUFBd0U4QyxPQUF4RSx5Q0FBd0VBLE9BQXhFLEtBQWtGLGNBQTVGLENBQU47QUFDQTs7QUFFREEsYUFBUTBELElBQVIsR0FBZTFELFFBQVEwRCxJQUFSLElBQWdCLEVBQS9COztBQUVBLFNBQUcsUUFBTzFELFFBQVEwRCxJQUFmLE1BQXdCLFFBQTNCLEVBQXFDO0FBQ3BDLFlBQU0sSUFBSXhHLEtBQUosQ0FBVSxvRkFBbUY4QyxRQUFRMEQsSUFBM0YsSUFBa0csY0FBNUcsQ0FBTjtBQUNBOztBQUVETCxTQUFJTixJQUFKLENBQVMsS0FBVCxFQUFnQi9DLFFBQVEyRCxHQUF4QixFQUE2QixJQUE3Qjs7QUFFQU4sU0FBSU8sWUFBSixHQUFtQjVELFFBQVE2RCxRQUFSLElBQW9CLE1BQXZDO0FBQ0FSLFNBQUlTLE9BQUosR0FBYzlELFFBQVE4RCxPQUFSLElBQW1CLElBQWpDOztBQUVBLFNBQUlULElBQUlPLFlBQUosSUFBb0IsTUFBeEIsRUFBZ0M7QUFDL0JQLFVBQUlKLGdCQUFKLENBQXFCLGNBQXJCLEVBQXFDLGtCQUFyQztBQUNBSSxVQUFJSixnQkFBSixDQUFxQixRQUFyQixFQUErQixrQkFBL0I7QUFDQTs7QUFFREksU0FBSVUsa0JBQUosR0FBeUIsWUFBVztBQUNoQyxVQUFHLEtBQUtDLFVBQUwsSUFBbUIsQ0FBbkIsSUFBd0IsS0FBS0MsTUFBTCxJQUFlLEdBQTFDLEVBQStDO0FBQzlDO0FBQ0E7O0FBRUQsVUFBSWYsV0FBVyxLQUFLQSxRQUFMLElBQWlCLEtBQUswQixZQUFyQztBQUNBMUIsaUJBQVlHLElBQUlPLFlBQUosSUFBb0IsTUFBcEIsSUFBOEIsUUFBT1YsUUFBUCx5Q0FBT0EsUUFBUCxNQUFtQixRQUFsRCxHQUE4RDJCLEtBQUtDLEtBQUwsQ0FBVzVCLFFBQVgsQ0FBOUQsR0FBcUZBLFFBQWhHO0FBQ0FNLGNBQVFOLFFBQVI7O0FBRUcsVUFBR2xELFFBQVFzQixjQUFSLENBQXVCLE9BQXZCLEtBQW1DLE9BQU90QixRQUFRa0UsS0FBZixJQUF3QixVQUE5RCxFQUEwRTtBQUMvRWxFLGVBQVFrRSxLQUFSLENBQWMzQyxJQUFkLENBQW1CLElBQW5CO0FBQ0E7QUFDRCxNQVpEOztBQWNBOEIsU0FBSWMsT0FBSixHQUFjLFVBQVM1RyxPQUFULEVBQWtCO0FBQy9CLFVBQUd5QyxRQUFRc0IsY0FBUixDQUF1QixPQUF2QixLQUFtQyxPQUFPdEIsUUFBUTFDLEtBQWYsSUFBd0IsVUFBOUQsRUFBMEU7QUFDekUwQyxlQUFRMUMsS0FBUixDQUFjQyxPQUFkO0FBQ0E7O0FBRURrRyxhQUFPbEcsT0FBUDtBQUNBLE1BTkQ7O0FBUUEsU0FBRyxDQUFFeUMsUUFBUTBELElBQWIsRUFBbUI7QUFDbEJMLFVBQUllLElBQUosQ0FBUyxJQUFUO0FBQ0E7O0FBRUQsU0FBSUMsY0FBY2pELE9BQU9rRCxJQUFQLENBQVl0RSxRQUFRMEQsSUFBcEIsRUFBMEJhLEdBQTFCLENBQThCLFVBQVNDLEdBQVQsRUFBYztBQUNuRCxhQUFPQyxtQkFBbUJELEdBQW5CLElBQTBCLEdBQTFCLEdBQ0ZDLG1CQUFtQnpFLFFBQVEwRCxJQUFSLENBQWFjLEdBQWIsQ0FBbkIsQ0FETDtBQUVGLE1BSFMsRUFHUEUsSUFITyxDQUdGLEdBSEUsQ0FBbEI7O0FBS0FyQixTQUFJZSxJQUFKLENBQVNDLFdBQVQ7QUFDQSxLQXJETSxDQUFQO0FBc0RBO0FBbnlCZ0M7O0FBQUE7QUFBQTs7QUFzeUJsQyxLQUFJVSxtQkFBbUIsMkNBQXZCOztBQXR5QmtDLEtBd3lCNUJDLHVCQXh5QjRCO0FBQUE7O0FBMHlCakMscUNBQ0E7QUFBQSxPQURZekgsT0FDWix1RUFEc0IsSUFDdEI7O0FBQUE7O0FBQ0NBLGFBQVVBLFdBQVd3SCxnQkFBckI7O0FBREQsa0pBRU94SCxPQUZQOztBQUdJLDRKQUF1QkEsT0FBdkI7QUFISjtBQUlJOztBQS95QjZCO0FBQUEsR0F3eUJJUCxnQkF4eUJKOztBQWt6QmxDOzs7Ozs7O0FBT0E7Ozs7Ozs7QUFLQSxLQUFJaUksYUFBWSxFQUFoQjs7QUE5ekJrQyxLQWcwQjVCQyxTQWgwQjRCO0FBQUE7QUFBQTtBQUFBOztBQUFBO0FBQUE7O0FBazBCakM7Ozs7Ozs7QUFsMEJpQyx3QkF5MEI1QlYsR0F6MEI0QixFQXkwQnZCVyxRQXowQnVCLEVBMDBCakM7QUFDQyxRQUFJLE9BQU9YLEdBQVAsSUFBYyxRQUFsQixFQUE0QjtBQUMzQixXQUFNLElBQUl4RywwQkFBSixDQUErQixrRUFBaUV3RyxHQUFqRSx5Q0FBaUVBLEdBQWpFLEtBQXVFLHNCQUF0RyxDQUFOO0FBQ0E7O0FBRUQsUUFBSSxPQUFPVyxRQUFQLElBQW1CLFVBQXZCLEVBQW1DO0FBQ2xDLFdBQU0sSUFBSW5ILDBCQUFKLENBQStCLHVFQUFzRW1ILFFBQXRFLHlDQUFzRUEsUUFBdEUsS0FBaUYsc0JBQWhILENBQU47QUFDQTs7QUFFRCxRQUFJLE9BQU8sS0FBS1gsR0FBTCxDQUFQLElBQW9CLFdBQXhCLEVBQXFDO0FBQ3BDLFdBQU0sSUFBSVEsdUJBQUosQ0FBNEIsMkNBQTVCLENBQU47QUFDQTs7QUFFRCxTQUFLUixHQUFMLElBQVlXLFNBQVNDLElBQVQsQ0FBY0QsUUFBZCxFQUF3QixJQUF4QixDQUFaO0FBQ0E7O0FBRUQ7Ozs7Ozs7OztBQTExQmlDO0FBQUE7QUFBQSwrQkFrMkJyQlgsR0FsMkJxQixFQWsyQmhCYSxRQWwyQmdCLEVBbTJCakM7QUFBQSxRQUQyQkMsS0FDM0IsdUVBRG1DLElBQ25DOztBQUNDLFFBQUksT0FBT2QsR0FBUCxJQUFjLFFBQWxCLEVBQTRCO0FBQzNCLFdBQU0sSUFBSXhHLDBCQUFKLENBQStCLDBFQUF5RXdHLEdBQXpFLHlDQUF5RUEsR0FBekUsS0FBK0Usc0JBQTlHLENBQU47QUFDQTs7QUFFRCxRQUFJLFFBQU9hLFFBQVAseUNBQU9BLFFBQVAsTUFBbUIsUUFBdkIsRUFBaUM7QUFDaEMsV0FBTSxJQUFJckgsMEJBQUosQ0FBK0IsNkVBQTRFcUgsUUFBNUUseUNBQTRFQSxRQUE1RSxLQUF1RixzQkFBdEgsQ0FBTjtBQUNBOztBQUVESixlQUFVVCxHQUFWLElBQWlCYSxRQUFqQjtBQUNBSixlQUFVSyxLQUFWLElBQW1CRCxRQUFuQjtBQUNBLFNBQUtiLEdBQUwsSUFBWWEsUUFBWjtBQUNBOztBQUVEOzs7Ozs7OztBQWozQmlDO0FBQUE7QUFBQSwrQkF3M0JyQmIsR0F4M0JxQixFQXkzQmpDO0FBQ0MsUUFBRyxPQUFPQSxHQUFQLElBQWMsUUFBakIsRUFBMkI7QUFDMUIsV0FBTSxJQUFJeEcsMEJBQUosQ0FBK0IsMEVBQXlFd0csR0FBekUseUNBQXlFQSxHQUF6RSxLQUErRSxzQkFBOUcsQ0FBTjtBQUNBOztBQUVELFFBQUcsUUFBT0EsR0FBUCx5Q0FBT0EsR0FBUCxNQUFjLFFBQWpCLEVBQTJCO0FBQzFCLFlBQU9TLFdBQVVULElBQUlwSCxXQUFKLENBQWdCQyxJQUExQixLQUFtQyxJQUExQztBQUNBOztBQUVELFdBQU80SCxXQUFVVCxHQUFWLEtBQWtCLElBQXpCO0FBQ0E7O0FBRUQ7Ozs7Ozs7QUFyNEJpQztBQUFBO0FBQUEsaUNBMjRCbkJhLFFBMzRCbUIsRUE0NEJqQztBQUNDLFFBQUksUUFBT0EsUUFBUCx5Q0FBT0EsUUFBUCxNQUFtQixRQUF2QixFQUFpQztBQUNoQyxZQUFRLE9BQU9KLFdBQVVJLFNBQVNqSSxXQUFULENBQXFCQyxJQUEvQixDQUFQLEtBQWdELFdBQXhEO0FBQ0EsS0FGRCxNQUVPLElBQUksT0FBT2dJLFFBQVAsSUFBbUIsUUFBdkIsRUFBaUM7QUFDdkMsWUFBUSxPQUFPSixXQUFVSSxRQUFWLENBQVAsS0FBK0IsV0FBdkM7QUFDQTs7QUFFRCxVQUFNLElBQUlySCwwQkFBSixDQUErQix3RkFBdUZxSCxRQUF2Rix5Q0FBdUZBLFFBQXZGLEtBQWtHLHNCQUFqSSxDQUFOO0FBQ0E7O0FBRUQ7Ozs7Ozs7OztBQXQ1QmlDO0FBQUE7QUFBQSx3QkE4NUI1QmpELE1BOTVCNEIsRUErNUJqQztBQUNDLFFBQUlpRCxXQUFXLEVBQWY7QUFDQSxRQUFJYixZQUFKOztBQUVBLFFBQUksS0FBS2UsYUFBTCxDQUFtQm5ELE1BQW5CLENBQUosRUFBZ0M7QUFDL0IsWUFBTyxLQUFLb0QsV0FBTCxDQUFpQnBELE1BQWpCLENBQVA7QUFDQTs7QUFFRCxRQUFJLFFBQU9BLE1BQVAseUNBQU9BLE1BQVAsTUFBaUIsUUFBckIsRUFBK0I7QUFDOUJpRCxnQkFBV2pELE1BQVg7QUFDQW9DLFdBQU1wQyxPQUFPaEYsV0FBUCxDQUFtQkMsSUFBekI7QUFDQSxVQUFLb0ksV0FBTCxDQUFpQmpCLEdBQWpCLEVBQXNCYSxRQUF0QjtBQUNBLEtBSkQsTUFJTyxJQUFHLE9BQU9qRCxNQUFQLElBQWlCLFFBQWpCLElBQTZCLEtBQUtkLGNBQUwsQ0FBb0JjLE1BQXBCLENBQWhDLEVBQTZEO0FBQ25FaUQsZ0JBQVcsSUFBSSxLQUFLakQsTUFBTCxDQUFKLEVBQVg7QUFDQW9DLFdBQU1wQyxNQUFOO0FBQ0EsVUFBS3FELFdBQUwsQ0FBaUJqQixHQUFqQixFQUFzQmEsUUFBdEI7QUFDQSxLQUpNLE1BSUE7QUFDTixXQUFNLElBQUlMLHVCQUFKLENBQTRCLHdGQUF1RjVDLE1BQXZGLHlDQUF1RkEsTUFBdkYsRUFBNUIsQ0FBTjtBQUNBOztBQUVELFdBQU9pRCxRQUFQO0FBQ0E7O0FBRUQ7Ozs7OztBQXQ3QmlDO0FBQUE7QUFBQSwyQkE0N0JqQztBQUNDSixpQkFBWSxFQUFaO0FBQ0E7O0FBRUQ7Ozs7OztBQWg4QmlDO0FBQUE7QUFBQSwrQkFzOEJqQztBQUNDLFdBQU9BLFVBQVA7QUFDQTtBQXg4QmdDOztBQUFBO0FBQUE7O0FBMjhCbEMsS0FBSVMsbUJBQW1CLHFFQUF2Qjs7QUEzOEJrQyxLQTY4QjVCQyxxQkE3OEI0QjtBQUFBOztBQSs4QmpDLG1DQUNBO0FBQUEsT0FEWXBJLE9BQ1osdUVBRHNCLElBQ3RCOztBQUFBOztBQUNDQSxhQUFVQSxXQUFXbUksZ0JBQXJCOztBQURELDhJQUVPbkksT0FGUDs7QUFHSSx3SkFBdUJBLE9BQXZCO0FBSEo7QUFJSTs7QUFwOUI2QjtBQUFBLEdBNjhCRVAsZ0JBNzhCRjs7QUF1OUJsQzs7Ozs7OztBQXY5QmtDLEtBODlCNUI0SSxZQTk5QjRCO0FBZytCakM7Ozs7O0FBS0EsMEJBQ0E7QUFBQTs7QUFDQyxRQUFLQyxNQUFMLEdBQWMsRUFBZDtBQUNBOztBQUVEOzs7Ozs7Ozs7QUExK0JpQztBQUFBO0FBQUEsNkJBaS9CdkJ4SSxJQWovQnVCLEVBaS9CakJ5SSxRQWovQmlCLEVBay9CakM7QUFDQyxRQUFJLE9BQU9BLFFBQVAsS0FBb0IsVUFBeEIsRUFBb0M7QUFDbkMsV0FBTSxJQUFJQyx3QkFBSixFQUFOO0FBQ0E7O0FBRUQsUUFBSSxPQUFPLEtBQUtGLE1BQUwsQ0FBWXhJLElBQVosQ0FBUCxJQUE0QixXQUFoQyxFQUE2QztBQUM1QyxVQUFLd0ksTUFBTCxDQUFZeEksSUFBWixJQUFvQixFQUFwQjtBQUNBOztBQUVELFNBQUt3SSxNQUFMLENBQVl4SSxJQUFaLEVBQWtCOEUsSUFBbEIsQ0FBdUIyRCxRQUF2QjtBQUNBOztBQUVEOzs7Ozs7OztBQTkvQmlDO0FBQUE7QUFBQSwyQkFxZ0N6QnpJLElBcmdDeUIsRUFzZ0NqQztBQUFBLHNDQURpQnFHLElBQ2pCO0FBRGlCQSxTQUNqQjtBQUFBOztBQUNDQSxXQUFPQSxRQUFRLElBQWY7O0FBRUE7QUFDQSxRQUFJLE9BQU8sS0FBS21DLE1BQUwsQ0FBWXhJLElBQVosQ0FBUCxJQUE0QixXQUFoQyxFQUE2QztBQUM1QztBQUNBOztBQUVELFNBQUt3SSxNQUFMLENBQVl4SSxJQUFaLEVBQWtCcUIsT0FBbEIsQ0FBMEIsVUFBU29ILFFBQVQsRUFBbUI7QUFDNUMsU0FBRyxPQUFPQSxRQUFQLElBQW1CLFVBQXRCLEVBQWtDO0FBQ2pDLFlBQU0sSUFBSUMsd0JBQUosQ0FBNkIsMEVBQXdFRCxRQUF4RSx5Q0FBd0VBLFFBQXhFLEtBQWtGLGFBQS9HLENBQU47QUFDQTs7QUFFRCxZQUFPQSw2Q0FBWXBDLElBQVosRUFBUDtBQUNBLEtBTkQ7QUFPQTtBQXJoQ2dDOztBQUFBO0FBQUE7O0FBd2hDbEM7Ozs7Ozs7O0FBeGhDa0MsS0FnaUM1QnNDLE1BaGlDNEI7QUFBQTtBQUFBO0FBQUE7O0FBQUE7QUFBQTs7QUFraUNqQzs7Ozs7Ozs7QUFsaUNpQyx1QkEwaUN0QjNJLElBMWlDc0IsRUEwaUNoQjRJLEtBMWlDZ0IsRUEwaUNUQyxJQTFpQ1MsRUEyaUNqQztBQUNDLFFBQUlELE1BQU03SSxXQUFOLENBQWtCQyxJQUFsQixJQUEyQixRQUEzQixJQUF1QzRJLE1BQU03SSxXQUFOLENBQWtCQyxJQUFsQixJQUEwQixPQUFyRSxFQUE4RTtBQUM3RTRJLGFBQVFwQixLQUFLc0IsU0FBTCxDQUFlRixLQUFmLENBQVI7QUFDQTs7QUFFREMsV0FBT0EsUUFBUSxFQUFmOztBQUVHLFFBQUlFLGdCQUFKOztBQUVBLFFBQUlGLElBQUosRUFBVTtBQUNOLFNBQUlHLE9BQU8sSUFBSUMsSUFBSixFQUFYO0FBQ0FELFVBQUtFLE9BQUwsQ0FBYUYsS0FBS0csT0FBTCxLQUFrQk4sT0FBTyxFQUFQLEdBQVksRUFBWixHQUFpQixFQUFqQixHQUFzQixJQUFyRDtBQUNBRSxlQUFVLGVBQWVDLEtBQUtJLFdBQUwsRUFBekI7QUFDSCxLQUpELE1BSU87QUFDSEwsZUFBVSxFQUFWO0FBQ0g7O0FBRURoSCxhQUFTc0gsTUFBVCxHQUFrQnJKLE9BQU8sR0FBUCxHQUFhNEksS0FBYixHQUFxQkcsT0FBckIsR0FBK0IsVUFBakQ7QUFDSDs7QUFFRDs7Ozs7OztBQS9qQ2lDO0FBQUE7QUFBQSx1QkFxa0N0Qi9JLElBcmtDc0IsRUFza0NqQztBQUNJLFFBQUkrQixTQUFTc0gsTUFBVCxDQUFnQnBLLE1BQWhCLEdBQXlCLENBQTdCLEVBQWdDO0FBQzVCLFNBQUlxSyxVQUFVdkgsU0FBU3NILE1BQVQsQ0FBZ0I3SCxPQUFoQixDQUF3QnhCLE9BQU8sR0FBL0IsQ0FBZDs7QUFFQSxTQUFJc0osV0FBVyxDQUFDLENBQWhCLEVBQW1CO0FBQ2ZBLGdCQUFVQSxVQUFVdEosS0FBS2YsTUFBZixHQUF3QixDQUFsQztBQUNBLFVBQUlzSyxRQUFReEgsU0FBU3NILE1BQVQsQ0FBZ0I3SCxPQUFoQixDQUF3QixHQUF4QixFQUE2QjhILE9BQTdCLENBQVo7O0FBRUEsVUFBSUMsU0FBUyxDQUFDLENBQWQsRUFBaUI7QUFDYkEsZUFBUXhILFNBQVNzSCxNQUFULENBQWdCcEssTUFBeEI7QUFDSDs7QUFFRCxhQUFPdUksS0FBS0MsS0FBTCxDQUFXK0IsU0FBU3pILFNBQVNzSCxNQUFULENBQWdCSSxTQUFoQixDQUEwQkgsT0FBMUIsRUFBbUNDLEtBQW5DLENBQVQsQ0FBWCxDQUFQO0FBQ0g7QUFDSjs7QUFFRCxXQUFPLEVBQVA7QUFDSDtBQXZsQ2dDOztBQUFBO0FBQUE7O0FBMGxDbEM7Ozs7Ozs7QUFPQTs7Ozs7OztBQUtBLEtBQUlHLG9CQUFvQjtBQUN2QjdJLFdBQVMsT0FEYztBQUV2QjhJLGVBQWEsTUFGVTtBQUd2QkMsaUJBQWUsRUFIUTtBQUl2QkMsVUFBUSxFQUplO0FBS3ZCQyxTQUFPLEVBTGdCO0FBTXZCQyxTQUFPLE1BTmdCO0FBT3ZCQyxVQUFRLE1BUGU7QUFRdkJDLGFBQVcsV0FSWTtBQVN2QkMsU0FBTyxJQVRnQjtBQVV2QkMsZUFBYSxRQVZVO0FBV3ZCQyxVQUFRO0FBWGUsRUFBeEI7O0FBY0E7Ozs7O0FBS0EsS0FBSUMsb0JBQUo7O0FBRUE7Ozs7O0FBS0EsS0FBSUMsdUJBQUo7O0FBRUE7Ozs7O0FBS0EsS0FBSUMsYUFBSjs7QUFFQTs7Ozs7QUFLQSxLQUFJQyx3QkFBSjs7QUFFQTs7Ozs7QUFLQSxLQUFJQyxpQkFBSjs7QUFycENrQyxLQXVwQzVCQyxJQXZwQzRCO0FBeXBDakM7Ozs7Ozs7Ozs7O0FBV0EsZ0JBQVlDLFNBQVosRUFBdUJDLElBQXZCLEVBQTZCQyxZQUE3QixFQUNBO0FBQUE7O0FBQ0NSLGlCQUFjTSxTQUFkO0FBQ0FKLFVBQU9LLElBQVA7QUFDQU4sb0JBQWlCTyxZQUFqQjs7QUFFQSxRQUFLQyxjQUFMLEdBQXNCLEtBQUtDLG9CQUFMLEVBQXRCO0FBQ0EsUUFBS0MsSUFBTCxHQUFZQyxXQUFXL0csSUFBWCxDQUFnQixJQUFoQixDQUFaO0FBQ0E7O0FBRUQ7Ozs7Ozs7O0FBOXFDaUM7QUFBQTtBQUFBLHlCQW9yQzNCb0IsUUFwckMyQixFQXFyQ2pDO0FBQ0MsUUFBRyxRQUFPQSxRQUFQLHlDQUFPQSxRQUFQLE1BQW1CLFFBQXRCLEVBQWdDO0FBQy9CLFdBQU0sSUFBSTNFLDBCQUFKLEVBQU47QUFDQTs7QUFFRCxTQUFLMkUsUUFBTCxHQUFnQjVCLE9BQU82QixNQUFQLENBQWNtRSxpQkFBZCxFQUFpQ3BFLFFBQWpDLENBQWhCOztBQUVBLFNBQUs0RixVQUFMLENBQWdCLEtBQUs1RixRQUFMLENBQWN6RSxPQUE5Qjs7QUFFQUQsUUFBSUssUUFBSixDQUFhLEtBQUs2SixjQUFsQixFQUFrQyxRQUFsQztBQUNBbEssUUFBSUssUUFBSixDQUFhLEtBQUs2SixjQUFsQixFQUFrQyxLQUFLeEYsUUFBTCxDQUFjc0UsYUFBaEQ7O0FBRUEsU0FBS3VCLGtCQUFMO0FBQ0EsU0FBS0MsV0FBTDs7QUFFQSxRQUFHLEtBQUtDLE9BQUwsQ0FBYTFDLE9BQU8yQyxHQUFQLENBQVcsS0FBS2hHLFFBQUwsQ0FBY3FFLFdBQXpCLENBQWIsQ0FBSCxFQUF3RDtBQUN2RCxVQUFLNEIsU0FBTDtBQUNBO0FBQ0Q7O0FBRUQ7Ozs7Ozs7QUF6c0NpQztBQUFBO0FBQUEsMkJBK3NDekJDLElBL3NDeUIsRUFndENqQztBQUNDLFdBQU85SCxPQUFPK0gsV0FBUCxDQUFtQkQsSUFBbkIsQ0FBUDtBQUNBOztBQUVEOzs7Ozs7O0FBcHRDaUM7QUFBQTtBQUFBLCtCQTJ0Q2pDO0FBQ0MsU0FBS0EsSUFBTCxHQUFZLEVBQVo7QUFDQSxTQUFLQSxJQUFMLENBQVU1SixFQUFWLEdBQWUvQyxJQUFJVSxNQUFKLENBQVcsRUFBWCxDQUFmO0FBQ0EsU0FBS2lNLElBQUwsQ0FBVUUsS0FBVixHQUFrQixFQUFsQjtBQUNBLFNBQUtGLElBQUwsQ0FBVUcsU0FBVixHQUFzQixFQUF0QjtBQUNBaEQsV0FBT2lELEdBQVAsQ0FBVyxLQUFLdEcsUUFBTCxDQUFjcUUsV0FBekIsRUFBc0MsS0FBSzZCLElBQTNDLEVBQWlELENBQWpEO0FBQ0E7O0FBRUQ7Ozs7Ozs7QUFudUNpQztBQUFBO0FBQUEsMkJBeXVDekJLLElBenVDeUIsRUEwdUNqQztBQUNDLFFBQUksUUFBT0EsSUFBUCx5Q0FBT0EsSUFBUCxNQUFlLFFBQW5CLEVBQTZCO0FBQzVCLFdBQU1sTCwyQkFBMkIsdUVBQXNFa0wsSUFBdEUseUNBQXNFQSxJQUF0RSxLQUE2RSxxQkFBeEcsQ0FBTjtBQUNBOztBQUVELFNBQUtMLElBQUwsR0FBWTdDLE9BQU8yQyxHQUFQLENBQVcsS0FBS2hHLFFBQUwsQ0FBY3FFLFdBQXpCLENBQVo7O0FBRUEsUUFBSSxDQUFDa0MsS0FBSzVILGNBQUwsQ0FBb0IsVUFBcEIsQ0FBTCxFQUFzQztBQUNyQzRILFVBQUtDLFFBQUwsR0FBZ0IsQ0FBaEI7QUFDQTs7QUFFRCxRQUFJM00sVUFBSjtBQUNBLFFBQUk0TSxjQUFjLEtBQWxCOztBQUVBLFNBQUs1TSxJQUFJLENBQVQsRUFBWUEsSUFBSSxLQUFLcU0sSUFBTCxDQUFVRSxLQUFWLENBQWdCek0sTUFBaEMsRUFBd0NFLEdBQXhDLEVBQTZDO0FBQzVDLFNBQUkwTSxLQUFLNUgsY0FBTCxDQUFvQixJQUFwQixLQUE2QixLQUFLdUgsSUFBTCxDQUFVRSxLQUFWLENBQWdCdk0sQ0FBaEIsRUFBbUJ5QyxFQUFuQixJQUF5QmlLLEtBQUtqSyxFQUEvRCxFQUFtRTtBQUNsRSxXQUFLNEosSUFBTCxDQUFVRSxLQUFWLENBQWdCdk0sQ0FBaEIsRUFBbUIyTSxRQUFuQjtBQUNBQyxvQkFBYyxJQUFkO0FBQ0E7QUFDQTtBQUNEOztBQUVELFFBQUksQ0FBRUEsV0FBTixFQUFtQjtBQUNsQixVQUFLUCxJQUFMLENBQVVFLEtBQVYsQ0FBZ0I1RyxJQUFoQixDQUFxQitHLElBQXJCO0FBQ0E7O0FBRURsRCxXQUFPaUQsR0FBUCxDQUFXLEtBQUt0RyxRQUFMLENBQWNxRSxXQUF6QixFQUFzQyxLQUFLNkIsSUFBM0MsRUFBaUQsQ0FBakQ7QUFDQTs7QUFFRDs7Ozs7OztBQXZ3Q2lDO0FBQUE7QUFBQSxnQ0E2d0NwQkssSUE3d0NvQixFQTh3Q2pDO0FBQ0MsU0FBS0wsSUFBTCxHQUFZN0MsT0FBTzJDLEdBQVAsQ0FBVyxLQUFLaEcsUUFBTCxDQUFjcUUsV0FBekIsQ0FBWjs7QUFFQSxRQUFJeEssVUFBSjtBQUNBLFFBQUk2TSxtQkFBbUIsS0FBdkI7O0FBRUEsU0FBSzdNLElBQUksQ0FBVCxFQUFZQSxJQUFJLEtBQUtxTSxJQUFMLENBQVVHLFNBQVYsQ0FBb0IxTSxNQUFwQyxFQUE0Q0UsR0FBNUMsRUFBaUQ7QUFDaEQsU0FBSTBNLEtBQUs1SCxjQUFMLENBQW9CLElBQXBCLEtBQTZCLEtBQUt1SCxJQUFMLENBQVVHLFNBQVYsQ0FBb0J4TSxDQUFwQixFQUF1QnlDLEVBQXZCLElBQTZCaUssS0FBS2pLLEVBQW5FLEVBQXVFO0FBQ3RFb0sseUJBQW1CLElBQW5CO0FBQ0E7QUFDQTtBQUNEOztBQUVELFFBQUksQ0FBRUEsZ0JBQU4sRUFBd0I7QUFDdkIsVUFBS1IsSUFBTCxDQUFVRyxTQUFWLENBQW9CN0csSUFBcEIsQ0FBeUIrRyxJQUF6QjtBQUNBOztBQUVEbEQsV0FBT2lELEdBQVAsQ0FBVyxLQUFLdEcsUUFBTCxDQUFjcUUsV0FBekIsRUFBc0MsS0FBSzZCLElBQTNDLEVBQWlELENBQWpEO0FBQ0E7O0FBRUQ7Ozs7Ozs7QUFseUNpQztBQUFBO0FBQUEsOEJBd3lDdEJLLElBeHlDc0IsRUF5eUNqQztBQUNFLFNBQUtMLElBQUwsR0FBWTdDLE9BQU8yQyxHQUFQLENBQVcsS0FBS2hHLFFBQUwsQ0FBY3FFLFdBQXpCLENBQVo7O0FBRUEsUUFBSXhLLFVBQUo7O0FBRUEsU0FBS0EsSUFBSSxDQUFULEVBQVlBLElBQUksS0FBS3FNLElBQUwsQ0FBVUUsS0FBVixDQUFnQnpNLE1BQWhDLEVBQXdDRSxHQUF4QyxFQUE2QztBQUM1QyxTQUFJME0sS0FBSzVILGNBQUwsQ0FBb0IsSUFBcEIsS0FBNkIsS0FBS3VILElBQUwsQ0FBVUUsS0FBVixDQUFnQnZNLENBQWhCLEVBQW1CYSxJQUFuQixJQUEyQjZMLEtBQUs3TCxJQUFqRSxFQUF1RTtBQUN0RSxXQUFLd0wsSUFBTCxDQUFVRSxLQUFWLENBQWdCTyxNQUFoQixDQUF1QjlNLENBQXZCLEVBQTBCLENBQTFCO0FBQ0E7QUFDQTtBQUNEOztBQUVEd0osV0FBT2lELEdBQVAsQ0FBVyxLQUFLdEcsUUFBTCxDQUFjcUUsV0FBekIsRUFBc0MsS0FBSzZCLElBQTNDLEVBQWlELENBQWpEO0FBQ0Q7O0FBRUQ7Ozs7Ozs7QUF4ekNpQztBQUFBO0FBQUEsZ0NBOHpDcEJFLEtBOXpDb0IsRUErekNqQztBQUNDakIsYUFBU3BJLFNBQVQsR0FBcUIsRUFBckI7O0FBRUEsUUFBSTZKLFFBQVF0TCxJQUFJc0IsYUFBSixDQUFrQixPQUFsQixDQUFaOztBQUVBdEIsUUFBSUssUUFBSixDQUFhaUwsS0FBYixFQUFvQixlQUFwQjs7QUFFQSxTQUFLLElBQUkvTSxJQUFJLENBQWIsRUFBZ0JBLElBQUl1TSxNQUFNek0sTUFBMUIsRUFBa0NFLEdBQWxDLEVBQXVDOztBQUV0QyxTQUFJZ04sYUFBYVQsTUFBTXZNLENBQU4sQ0FBakI7O0FBRUEsU0FBSWlOLE1BQUt4TCxJQUFJc0IsYUFBSixDQUFrQixJQUFsQixFQUF3QjtBQUNoQzRILGFBQU87QUFEeUIsTUFBeEIsQ0FBVDs7QUFJQTtBQUNBLFNBQUl1QyxNQUFLekwsSUFBSXNCLGFBQUosQ0FBa0IsSUFBbEIsQ0FBVDs7QUFFQW1LLFNBQUdoSyxTQUFILEdBQWU4SixXQUFXTCxRQUFYLEdBQXFCLEdBQXBDO0FBQ0FNLFNBQUc3SixXQUFILENBQWU4SixHQUFmOztBQUVBLFVBQUksSUFBSUMsU0FBUixJQUFxQkgsVUFBckIsRUFBaUM7QUFDaEMsY0FBT0csU0FBUDtBQUVDLFlBQUssT0FBTDtBQUNDRCxjQUFLekwsSUFBSXNCLGFBQUosQ0FBa0IsSUFBbEIsQ0FBTDtBQUNBLFlBQUlxSyxRQUFRM0wsSUFBSXNCLGFBQUosQ0FBa0IsS0FBbEIsRUFBeUI7QUFDcENzSyxjQUFLTCxXQUFXRyxTQUFYLENBRCtCO0FBRXBDdkMsZ0JBQU8sTUFGNkI7QUFHcENDLGlCQUFRO0FBSDRCLFNBQXpCLENBQVo7O0FBTUFxQyxZQUFHOUosV0FBSCxDQUFlZ0ssS0FBZjtBQUNBO0FBQ0QsWUFBSyxNQUFMO0FBQ0EsWUFBSyxPQUFMO0FBQ0NGLGNBQUt6TCxJQUFJc0IsYUFBSixDQUFrQixJQUFsQixDQUFMO0FBQ0FtSyxZQUFHaEssU0FBSCxHQUFlOEosV0FBV0csU0FBWCxDQUFmO0FBQ0E7QUFoQkY7O0FBbUJBRixVQUFHN0osV0FBSCxDQUFlOEosR0FBZjtBQUNBOztBQUVESCxXQUFNM0osV0FBTixDQUFrQjZKLEdBQWxCO0FBQ0E7O0FBRUQ7QUFDQSxRQUFJQSxLQUFLeEwsSUFBSXNCLGFBQUosQ0FBa0IsSUFBbEIsQ0FBVDtBQUNBLFFBQUltSyxLQUFLekwsSUFBSXNCLGFBQUosQ0FBa0IsSUFBbEIsRUFBd0I7QUFDaEN1SyxjQUFTO0FBRHVCLEtBQXhCLENBQVQ7O0FBSUEsUUFBSUMsV0FBVzlMLElBQUlzQixhQUFKLENBQWtCLEdBQWxCLEVBQXVCO0FBQ3JDNEgsWUFBTyxpQkFEOEI7QUFFckM2QyxXQUFNO0FBRitCLEtBQXZCLENBQWY7O0FBS0FOLE9BQUc5SixXQUFILENBQWVtSyxRQUFmO0FBQ0FOLE9BQUc3SixXQUFILENBQWU4SixFQUFmOztBQUVBSCxVQUFNM0osV0FBTixDQUFrQjZKLEVBQWxCOztBQUVBM0IsYUFBU2xJLFdBQVQsQ0FBcUIySixLQUFyQjtBQUNBOztBQUVEOzs7Ozs7O0FBajRDaUM7QUFBQTtBQUFBLDhCQXU0Q3RCbkosUUF2NENzQixFQXc0Q2pDO0FBQ0MsU0FBS2xDLE9BQUwsR0FBZUQsSUFBSWdNLElBQUosQ0FBUzdKLFFBQVQsQ0FBZjs7QUFFQSxRQUFJLEtBQUtsQyxPQUFULEVBQWtCO0FBQ2pCRCxTQUFJSyxRQUFKLENBQWEsS0FBS0osT0FBbEIsRUFBMkIsS0FBS3lFLFFBQUwsQ0FBY3dFLEtBQXpDO0FBQ0FsSixTQUFJSyxRQUFKLENBQWEsS0FBS0osT0FBbEIsRUFBMkIsS0FBS3lFLFFBQUwsQ0FBYzJFLFNBQXpDO0FBQ0EsVUFBS3BKLE9BQUwsQ0FBYTBCLFdBQWIsQ0FBeUIsS0FBS3lJLElBQTlCO0FBQ0EsVUFBS25LLE9BQUwsQ0FBYTBCLFdBQWIsQ0FBeUIsS0FBS3VJLGNBQTlCO0FBQ0E7QUFDRDs7QUFFRDs7Ozs7O0FBbjVDaUM7QUFBQTtBQUFBLDBDQXk1Q2pDO0FBQ0MsUUFBSUEsaUJBQWlCbEssSUFBSXNCLGFBQUosQ0FBa0IsS0FBbEIsRUFBeUI7QUFDN0NOLFNBQUk7QUFEeUMsS0FBekIsQ0FBckI7O0FBSUE2SSxlQUFXN0osSUFBSXNCLGFBQUosQ0FBa0IsSUFBbEIsRUFBd0I7QUFDakM0SCxZQUFPO0FBRDBCLEtBQXhCLENBQVg7O0FBSUFnQixtQkFBZXZJLFdBQWYsQ0FBMkJrSSxRQUEzQjs7QUFFQSxXQUFPSyxjQUFQO0FBQ0E7O0FBRUQ7Ozs7OztBQXY2Q2lDO0FBQUE7QUFBQSxpQ0E2NkNqQztBQUNDLFFBQUlsSyxJQUFJZ00sSUFBSixDQUFTLGlCQUFULENBQUosRUFBaUM7QUFDaEM7QUFDQTs7QUFFRCxRQUFJLEtBQUt0SCxRQUFMLENBQWM4RSxNQUFsQixFQUEwQjtBQUN6QjtBQUNBOztBQUVELFFBQUl5QyxXQUFZLEtBQUt2SCxRQUFMLENBQWM0RSxLQUFmLEdBQXdCLE9BQXhCLEdBQWtDLFVBQWpEOztBQUVBLFFBQUlySSxtQkFDRCxLQUFLeUQsUUFBTCxDQUFjekUsT0FEYiw4QkFFVWdNLFFBRlYsc0dBUUQsS0FBS3ZILFFBQUwsQ0FBY3pFLE9BUmIsK0JBU08sS0FBS3lFLFFBQUwsQ0FBY3lFLEtBVHJCLDJCQVVRLEtBQUt6RSxRQUFMLENBQWMwRSxNQVZ0Qiw0REFjRCxLQUFLMUUsUUFBTCxDQUFjekUsT0FkYixvQ0FlTSxLQUFLeUUsUUFBTCxDQUFjNkUsV0FmcEIsNERBbUJELEtBQUs3RSxRQUFMLENBQWN6RSxPQW5CYiwyQkFvQkQsS0FBS3lFLFFBQUwsQ0FBY3pFLE9BcEJiLGlGQXlCRCxLQUFLeUUsUUFBTCxDQUFjekUsT0F6QmIsMEJBMEJELEtBQUt5RSxRQUFMLENBQWN6RSxPQTFCYiwrRUErQkQsS0FBS3lFLFFBQUwsQ0FBY3pFLE9BL0JiLHlDQWdDVWdNLFFBaENWLDREQWtDaUIsS0FBS3ZILFFBQUwsQ0FBYzBFLE1BbEMvQiw2UkE2Q0QsS0FBSzFFLFFBQUwsQ0FBY3pFLE9BN0NiLHFIQWtERCxLQUFLeUUsUUFBTCxDQUFjekUsT0FsRGIsa0hBdURELEtBQUt5RSxRQUFMLENBQWN6RSxPQXZEYiwrSEE2REQsS0FBS3lFLFFBQUwsQ0FBY3pFLE9BN0RiLHdGQWlFRCxLQUFLeUUsUUFBTCxDQUFjekUsT0FqRWIsNEZBcUVELEtBQUt5RSxRQUFMLENBQWN6RSxPQXJFYiwrRkEwRUQsS0FBS3lFLFFBQUwsQ0FBY3pFLE9BMUViLDRSQXVGRCxLQUFLeUUsUUFBTCxDQUFjekUsT0F2RmIsNlFBQUo7O0FBb0dHRCxRQUFJa00sUUFBSixDQUFhLHNCQUFiLEVBQXFDakwsR0FBckM7QUFDSDs7QUFFRDs7Ozs7O0FBL2hEaUM7QUFBQTtBQUFBLG9DQXFpRGpDO0FBQ0MsUUFBSTJJLGVBQUosRUFBb0I7QUFDbkIsWUFBT0EsZUFBUDtBQUNBOztBQUVELFFBQUlYLGVBQUo7O0FBRUEsUUFBSSxLQUFLdkUsUUFBTCxDQUFjdUUsTUFBbEIsRUFBMEI7QUFDekJBLGNBQVNqSixJQUFJc0IsYUFBSixDQUFrQixLQUFsQixFQUF5QjtBQUNqQ3NLLFdBQUssS0FBS2xILFFBQUwsQ0FBY3VFLE1BRGM7QUFFakNDLGFBQU87QUFGMEIsTUFBekIsQ0FBVDtBQUlBLEtBTEQsTUFLTztBQUNORCxjQUFTa0QsY0FBVDtBQUNBOztBQUVEdkMsc0JBQWlCNUosSUFBSXNCLGFBQUosQ0FBa0IsS0FBbEIsRUFBeUI7QUFDekM0SCxZQUFPO0FBRGtDLEtBQXpCLENBQWpCOztBQUlBVSxvQkFBZWpJLFdBQWYsQ0FBMkJzSCxNQUEzQjs7QUFFQSxXQUFPVyxlQUFQO0FBQ0E7O0FBRUQ7Ozs7OztBQTlqRGlDO0FBQUE7QUFBQSx5Q0Fva0RqQztBQUNDNUosUUFBSUssUUFBSixDQUFhd0osUUFBYixFQUF1QixTQUF2QjtBQUNBLFNBQUtLLGNBQUwsQ0FBb0J2SSxXQUFwQixDQUFnQyxLQUFLaUksY0FBTCxFQUFoQztBQUNBOztBQUVEOzs7Ozs7QUF6a0RpQztBQUFBO0FBQUEsd0NBK2tEakM7QUFDQyxRQUFJNUosSUFBSWdNLElBQUosQ0FBUyxzQkFBVCxFQUFpQyxLQUFLOUIsY0FBdEMsQ0FBSixFQUEyRDtBQUMxRCxVQUFLQSxjQUFMLENBQW9CbkosV0FBcEIsQ0FBZ0MsS0FBSzZJLGNBQUwsRUFBaEM7QUFDQTVKLFNBQUlJLFdBQUosQ0FBZ0J5SixRQUFoQixFQUEwQixTQUExQjtBQUNBO0FBQ0Q7O0FBRUQ7Ozs7OztBQXRsRGlDO0FBQUE7QUFBQSx1Q0E0bERqQztBQUNDLFNBQUt1QyxtQkFBTDtBQUNBLFFBQUl0QixRQUFRLEtBQUt1QixZQUFMLEVBQVo7QUFDQSxTQUFLQyxZQUFMLENBQWtCeEIsS0FBbEI7O0FBRUEsUUFBSTFELFdBQVcsSUFBZjs7QUFFQW1GLGVBQVcsWUFBVztBQUNyQm5GLGNBQVNvRixrQkFBVCxDQUE0QmxKLElBQTVCLENBQWlDOEQsUUFBakM7QUFDQSxLQUZELEVBRUcsSUFGSDtBQUdBOztBQUVEOzs7Ozs7QUF4bURpQztBQUFBO0FBQUEsd0NBOG1EakM7QUFDQyxRQUFHLEtBQUtnRCxJQUFMLElBQWEsSUFBaEIsRUFBc0I7QUFDckI7QUFDQTs7QUFFRCxTQUFLQSxJQUFMLENBQVVxQyxPQUFWLEdBQW9CLFVBQVNDLENBQVQsRUFBWTtBQUMvQkEsT0FBRUMsY0FBRjtBQUNBLFVBQUtDLGlCQUFMO0FBQ0EsS0FIbUIsQ0FHbEJ6RixJQUhrQixDQUdiLElBSGEsQ0FBcEI7O0FBS0F1QyxtQkFBZW1ELFNBQWYsQ0FBeUIsb0JBQXpCLEVBQStDLFVBQVN0QixVQUFULEVBQXFCO0FBQ25FLFVBQUt1QixlQUFMO0FBQ0EsVUFBS0MsT0FBTCxDQUFheEIsVUFBYjtBQUNBLFVBQUt5QixpQkFBTDtBQUNBLEtBSjhDLENBSTdDN0YsSUFKNkMsQ0FJeEMsSUFKd0MsQ0FBL0M7O0FBTUF1QyxtQkFBZW1ELFNBQWYsQ0FBeUIsd0JBQXpCLEVBQW1ELFVBQVN0QixVQUFULEVBQXFCO0FBQ3ZFLFVBQUswQixZQUFMLENBQWtCMUIsVUFBbEI7QUFDQSxLQUZrRCxDQUVqRHBFLElBRmlELENBRTVDLElBRjRDLENBQW5EO0FBR0E7O0FBRUQ7Ozs7OztBQW5vRGlDO0FBQUE7QUFBQSxxQ0F5b0RqQztBQUNDLFFBQUluSCxJQUFJa04sUUFBSixDQUFhLEtBQUtoRCxjQUFsQixFQUFrQyxRQUFsQyxDQUFKLEVBQWlEO0FBQ2hELFVBQUs4QyxpQkFBTDtBQUNBOztBQUVEaE4sUUFBSW1OLGFBQUosQ0FBa0IsS0FBS2pELGNBQXZCLEVBQXVDLFFBQXZDLEVBQWlELFFBQWpEO0FBQ0EsU0FBSzhDLGlCQUFMO0FBQ0E7O0FBRUQ7Ozs7OztBQWxwRGlDO0FBQUE7QUFBQSx1Q0F3cERqQztBQUNDLFFBQUlJLFVBQVVwTixJQUFJcU4sV0FBSixDQUFnQixLQUFLbkQsY0FBckIsRUFBcUMsUUFBckMsRUFBK0MsUUFBL0MsQ0FBZDs7QUFFQSxRQUFJa0QsT0FBSixFQUFhO0FBQ1osVUFBS0osaUJBQUw7QUFDQTtBQUNEOztBQUVEOzs7Ozs7QUFocURpQztBQUFBO0FBQUEsa0NBc3FEakM7QUFDQyxRQUFJcEMsT0FBTzdDLE9BQU8yQyxHQUFQLENBQVcsS0FBS2hHLFFBQUwsQ0FBY3FFLFdBQXpCLENBQVg7O0FBRUEsV0FBUTZCLElBQUQsR0FBU0EsS0FBS0UsS0FBZCxHQUFzQixFQUE3QjtBQUNBO0FBMXFEZ0M7O0FBQUE7QUFBQTs7QUE2cURsQzs7Ozs7OztBQUtBLFVBQVN3QyxLQUFULENBQWVDLEtBQWYsRUFBc0I7QUFDckJBLFFBQU1aLGNBQU47QUFDQTNNLE1BQUltTixhQUFKLENBQWtCLEtBQUtqRCxjQUF2QixFQUF1QyxRQUF2QyxFQUFpRCxRQUFqRDtBQUNBOztBQUVEOzs7OztBQUtBLFVBQVNHLFVBQVQsR0FBc0I7QUFDckIsTUFBSW1ELE1BQU1yTSxTQUFTc00sZUFBVCxDQUF5Qiw0QkFBekIsRUFBdUQsS0FBdkQsQ0FBVjtBQUNBLE1BQUlDLElBQUl2TSxTQUFTc00sZUFBVCxDQUF5Qiw0QkFBekIsRUFBdUQsR0FBdkQsQ0FBUjtBQUNBLE1BQUlFLE9BQU94TSxTQUFTc00sZUFBVCxDQUF5Qiw0QkFBekIsRUFBdUQsTUFBdkQsQ0FBWDs7QUFFQUQsTUFBSTlMLFlBQUosQ0FBaUIsU0FBakIsRUFBNEIsS0FBNUI7QUFDQThMLE1BQUk5TCxZQUFKLENBQWlCLE9BQWpCLEVBQTBCLDRCQUExQjtBQUNBOEwsTUFBSTlMLFlBQUosQ0FBaUIsYUFBakIsRUFBZ0MsOEJBQWhDO0FBQ0E4TCxNQUFJOUwsWUFBSixDQUFpQixHQUFqQixFQUFzQixLQUF0QjtBQUNBOEwsTUFBSTlMLFlBQUosQ0FBaUIsR0FBakIsRUFBc0IsS0FBdEI7QUFDQThMLE1BQUk5TCxZQUFKLENBQWlCLE9BQWpCLEVBQTBCLE1BQTFCO0FBQ0E4TCxNQUFJOUwsWUFBSixDQUFpQixRQUFqQixFQUEyQixNQUEzQjtBQUNBOEwsTUFBSTlMLFlBQUosQ0FBaUIsU0FBakIsRUFBNEIscUJBQTVCO0FBQ0E4TCxNQUFJOUwsWUFBSixDQUFpQixPQUFqQixFQUEwQiw0Q0FBMUI7QUFDQThMLE1BQUk5TCxZQUFKLENBQWlCLFdBQWpCLEVBQThCLFVBQTlCOztBQUVBaU0sT0FBS2pNLFlBQUwsQ0FBa0IsR0FBbEIsRUFBdUIsMHBEQUF2Qjs7QUFFQWdNLElBQUUvTCxXQUFGLENBQWNnTSxJQUFkO0FBQ0FILE1BQUk3TCxXQUFKLENBQWdCK0wsQ0FBaEI7O0FBRUEsTUFBS0UsTUFBTTVOLElBQUlzQixhQUFKLENBQWtCLEtBQWxCLEVBQXlCO0FBQ25DTixPQUFJO0FBRCtCLEdBQXpCLENBQVg7O0FBSUE0TSxNQUFJak0sV0FBSixDQUFnQjZMLEdBQWhCOztBQUVBLFNBQU9JLEdBQVA7QUFDQTs7QUFFRDs7Ozs7QUFLQSxVQUFTekIsWUFBVCxHQUF3QjtBQUN2QixNQUFJcUIsTUFBTXJNLFNBQVNzTSxlQUFULENBQXlCLDRCQUF6QixFQUF1RCxLQUF2RCxDQUFWO0FBQ0EsTUFBSUksUUFBUSxFQUFaO0FBQ0EsTUFBSUMsU0FBUyxFQUFiO0FBQ0EsTUFBSUMsYUFBYSxFQUFqQjtBQUNBLE1BQUlDLGFBQWEsRUFBakI7O0FBRUFSLE1BQUk5TCxZQUFKLENBQWlCLE9BQWpCLEVBQTBCLGFBQTFCO0FBQ0E4TCxNQUFJOUwsWUFBSixDQUFpQixPQUFqQixFQUEwQixPQUExQjtBQUNBOEwsTUFBSTlMLFlBQUosQ0FBaUIsUUFBakIsRUFBMkIsT0FBM0I7QUFDQThMLE1BQUk5TCxZQUFKLENBQWlCLE9BQWpCLEVBQTBCLDRCQUExQjtBQUNBOEwsTUFBSTlMLFlBQUosQ0FBaUIsYUFBakIsRUFBZ0MsOEJBQWhDO0FBQ0E4TCxNQUFJOUwsWUFBSixDQUFpQixTQUFqQixFQUE0QixhQUE1QjtBQUNBOEwsTUFBSTlMLFlBQUosQ0FBaUIscUJBQWpCLEVBQXdDLFVBQXhDO0FBQ0E4TCxNQUFJOUwsWUFBSixDQUFpQixPQUFqQixFQUEwQixtQkFBMUI7O0FBRUEsTUFBSXVNLFdBQVcsQ0FBZjs7QUFFQSxPQUFLLElBQUkxUCxJQUFJLENBQWIsRUFBZ0JBLElBQUlzUCxLQUFwQixFQUEyQnRQLEdBQTNCLEVBQWdDO0FBQy9CLE9BQUkyUCxRQUFRL00sU0FBU3NNLGVBQVQsQ0FBeUIsNEJBQXpCLEVBQXVELEdBQXZELENBQVo7QUFDQVMsU0FBTXhNLFlBQU4sQ0FBbUIsV0FBbkIsRUFBZ0MsWUFBWXVNLFFBQVosR0FBdUIsU0FBdkQ7QUFDQUEsZUFBWSxFQUFaO0FBQ0FILFVBQU81SixJQUFQLENBQVlnSyxLQUFaO0FBQ0E7O0FBRUQsT0FBSyxJQUFJM1AsSUFBSSxDQUFiLEVBQWdCQSxJQUFJc1AsS0FBcEIsRUFBMkJ0UCxHQUEzQixFQUFnQztBQUMvQixPQUFJNFAsWUFBWWhOLFNBQVNzTSxlQUFULENBQXlCLDRCQUF6QixFQUF1RCxNQUF2RCxDQUFoQjtBQUNBVSxhQUFVek0sWUFBVixDQUF1QixHQUF2QixFQUE0QixJQUE1QjtBQUNBeU0sYUFBVXpNLFlBQVYsQ0FBdUIsR0FBdkIsRUFBNEIsSUFBNUI7QUFDQXlNLGFBQVV6TSxZQUFWLENBQXVCLElBQXZCLEVBQTZCLEtBQTdCO0FBQ0F5TSxhQUFVek0sWUFBVixDQUF1QixJQUF2QixFQUE2QixLQUE3QjtBQUNBeU0sYUFBVXpNLFlBQVYsQ0FBdUIsT0FBdkIsRUFBZ0MsR0FBaEM7QUFDQXlNLGFBQVV6TSxZQUFWLENBQXVCLFFBQXZCLEVBQWlDLElBQWpDO0FBQ0F5TSxhQUFVek0sWUFBVixDQUF1QixNQUF2QixFQUErQixTQUEvQjtBQUNBcU0sY0FBVzdKLElBQVgsQ0FBZ0JpSyxTQUFoQjtBQUNBOztBQUVELE1BQUlDLFFBQVEsT0FBTyxFQUFuQjs7QUFFQSxPQUFLLElBQUk3UCxJQUFJLENBQWIsRUFBZ0JBLElBQUlzUCxLQUFwQixFQUEyQnRQLEdBQTNCLEVBQWdDO0FBQy9CLE9BQUk4UCxVQUFVbE4sU0FBU3NNLGVBQVQsQ0FBeUIsNEJBQXpCLEVBQXVELFNBQXZELENBQWQ7QUFDQVksV0FBUTNNLFlBQVIsQ0FBcUIsZUFBckIsRUFBc0MsU0FBdEM7QUFDQTJNLFdBQVEzTSxZQUFSLENBQXFCLFFBQXJCLEVBQStCLEtBQS9CO0FBQ0EyTSxXQUFRM00sWUFBUixDQUFxQixPQUFyQixFQUE4QixLQUE5QjtBQUNBMk0sV0FBUTNNLFlBQVIsQ0FBcUIsS0FBckIsRUFBNEIsSUFBNUI7QUFDQTJNLFdBQVEzTSxZQUFSLENBQXFCLE9BQXJCLEVBQThCME0sTUFBTUUsT0FBTixDQUFjLENBQWQsSUFBbUIsR0FBakQ7QUFDQUQsV0FBUTNNLFlBQVIsQ0FBcUIsYUFBckIsRUFBb0MsWUFBcEM7QUFDQXNNLGNBQVc5SixJQUFYLENBQWdCbUssT0FBaEI7QUFDQUQsWUFBUyxJQUFUO0FBQ0E7O0FBRUQsT0FBSyxJQUFJN1AsSUFBSSxDQUFiLEVBQWdCQSxJQUFJdVAsT0FBT3pQLE1BQTNCLEVBQW1DRSxHQUFuQyxFQUF3QztBQUN2QyxPQUFJMlAsU0FBUUosT0FBT3ZQLENBQVAsQ0FBWjtBQUNBLE9BQUk0UCxhQUFZSixXQUFXeFAsQ0FBWCxDQUFoQjtBQUNBLE9BQUk4UCxXQUFVTCxXQUFXelAsQ0FBWCxDQUFkO0FBQ0E0UCxjQUFVeE0sV0FBVixDQUFzQjBNLFFBQXRCO0FBQ0FILFVBQU12TSxXQUFOLENBQWtCd00sVUFBbEI7QUFDQVgsT0FBSTdMLFdBQUosQ0FBZ0J1TSxNQUFoQjtBQUNBOztBQUVEbE8sTUFBSUssUUFBSixDQUFhbU4sR0FBYixFQUFrQixhQUFsQjs7QUFFQSxTQUFPQSxHQUFQO0FBQ0E7O0FBRUQ7Ozs7Ozs7QUFPQTs7O0FBR0EsS0FBSWUsb0JBQW9CO0FBQ3ZCdE8sV0FBUyxTQURjO0FBRXZCaUosU0FBTyxFQUZnQjtBQUd2QkMsU0FBTyxFQUhnQjtBQUl2QkMsVUFBUSxFQUplO0FBS3ZCSSxVQUFRO0FBTGUsRUFBeEI7O0FBUUE7Ozs7O0FBS0EsS0FBSWdGLG9CQUFKOztBQXZ6RGtDLEtBeXpENUJDLE1BenpENEI7QUEyekRqQzs7Ozs7O0FBTUEsa0JBQVkxRSxTQUFaLEVBQ0E7QUFBQTs7QUFDQ3lFLGlCQUFjekUsU0FBZDtBQUNBOztBQUVEOzs7Ozs7OztBQXQwRGlDO0FBQUE7QUFBQSx5QkE0MEQzQnJGLFFBNTBEMkIsRUE2MERqQztBQUNDLFFBQUcsUUFBT0EsUUFBUCx5Q0FBT0EsUUFBUCxNQUFtQixRQUF0QixFQUFnQztBQUMvQixXQUFNLElBQUkzRSwwQkFBSixFQUFOO0FBQ0E7O0FBRUQsU0FBSzJFLFFBQUwsR0FBZ0I1QixPQUFPNkIsTUFBUCxDQUFjNEosaUJBQWQsRUFBaUM3SixRQUFqQyxDQUFoQjs7QUFFQXZELGFBQVN1TixnQkFBVCxDQUEwQixrQkFBMUIsRUFBOEMsWUFBVzs7QUFFeEQsVUFBS3BFLFVBQUwsQ0FBZ0IsS0FBSzVGLFFBQUwsQ0FBY3pFLE9BQTlCOztBQUVBLFVBQUt1SyxXQUFMO0FBQ0EsS0FMNkMsQ0FLNUNyRCxJQUw0QyxDQUt2QyxJQUx1QyxDQUE5QztBQU1BOztBQUVEOzs7Ozs7O0FBNTFEaUM7QUFBQTtBQUFBLDhCQWsyRHRCaEYsUUFsMkRzQixFQW0yRGpDO0FBQ0MsU0FBS3dNLE9BQUwsR0FBZTNPLElBQUlnTSxJQUFKLENBQVM3SixRQUFULENBQWY7O0FBRUFuQyxRQUFJSyxRQUFKLENBQWEsS0FBS3NPLE9BQWxCLEVBQTJCLEtBQUtqSyxRQUFMLENBQWN3RSxLQUF6QztBQUNBOztBQUVEOzs7O0FBejJEaUM7QUFBQTtBQUFBLGlDQTYyRGpDO0FBQ0MsUUFBSWxKLElBQUlnTSxJQUFKLENBQVMseUJBQVQsQ0FBSixFQUF5QztBQUN4QztBQUNBOztBQUVELFFBQUksS0FBS3RILFFBQUwsQ0FBYzhFLE1BQWxCLEVBQTBCO0FBQ3pCO0FBQ0E7O0FBRUQsUUFBSUwsUUFBUyxLQUFLekUsUUFBTCxDQUFjeUUsS0FBZixHQUF3QixXQUFXLEtBQUt6RSxRQUFMLENBQWN5RSxLQUF6QixHQUFpQyxHQUF6RCxHQUErRCxFQUEzRTtBQUNBLFFBQUl5RixXQUFXLEtBQUtsSyxRQUFMLENBQWNtSyxTQUFkLElBQTJCLE9BQTFDO0FBQ0EsUUFBSXpGLFNBQVMsS0FBSzFFLFFBQUwsQ0FBYzBFLE1BQWQsSUFBd0IsTUFBckM7O0FBRUEsUUFBSW5JLG1CQUNELEtBQUt5RCxRQUFMLENBQWN6RSxPQURiLCtHQUtBa0osS0FMQSw2QkFNV3lGLFFBTlgsMkJBT1F4RixNQVBSLHVHQUFKOztBQWVHcEosUUFBSWtNLFFBQUosQ0FBYSx3QkFBYixFQUF1Q2pMLEdBQXZDO0FBQ0g7QUExNERnQzs7QUFBQTtBQUFBOztBQTY0RGxDOzs7Ozs7O0FBUUE7Ozs7Ozs7QUFLQSxLQUFJNk4sb0JBQW9CO0FBQ3ZCN08sV0FBUyxXQURjO0FBRXZCaUosU0FBTyxFQUZnQjtBQUd2QjZGLGNBQVksRUFIVztBQUl2QkMsb0JBQWtCLGlCQUpLO0FBS3ZCQyx5QkFBdUIsZ0JBTEE7QUFNdkI5RixTQUFPLE9BTmdCO0FBT3ZCQyxVQUFRLE9BUGU7QUFRdkJtQyxjQUFZLENBQUMsTUFBRCxFQUFTLE9BQVQsRUFBa0IsY0FBbEIsRUFBa0MsT0FBbEMsQ0FSVztBQVN2QjdGLE9BQUssY0FUa0I7QUFVdkI4RCxVQUFRO0FBVmUsRUFBeEI7O0FBYUE7Ozs7O0FBS0EsS0FBSTBGLG9CQUFKOztBQUVBOzs7OztBQUtBLEtBQUlDLHVCQUFKOztBQUVBOzs7OztBQUtBLEtBQUlDLGVBQUo7O0FBRUE7Ozs7OztBQU1BLEtBQUlDLHdCQUFKOztBQWw4RGtDLEtBbzhENUJDLFFBcDhENEI7QUFzOERqQzs7Ozs7OztBQU9BLG9CQUFZdkYsU0FBWixFQUF1QkMsSUFBdkIsRUFBNkJDLFlBQTdCLEVBQ0E7QUFBQTs7QUFDQ2lGLGlCQUFjbkYsU0FBZDtBQUNBcUYsWUFBU3BGLElBQVQ7QUFDQW1GLG9CQUFpQmxGLFlBQWpCO0FBQ0FvRixxQkFBa0IsRUFBbEI7QUFDQTs7QUFFRDs7Ozs7Ozs7QUFyOURpQztBQUFBO0FBQUEseUJBMjlEM0IzSyxRQTM5RDJCLEVBNDlEakM7QUFDQyxRQUFJLFFBQU9BLFFBQVAseUNBQU9BLFFBQVAsTUFBbUIsUUFBdkIsRUFBaUM7QUFDaEMsV0FBTSxJQUFJM0UsMEJBQUosRUFBTjtBQUNBOztBQUVELFNBQUsyRSxRQUFMLEdBQWdCNUIsT0FBTzZCLE1BQVAsQ0FBY21LLGlCQUFkLEVBQWlDcEssUUFBakMsQ0FBaEI7QUFDQSxTQUFLNkssVUFBTCxHQUFrQixJQUFsQjs7QUFFQXBPLGFBQVN1TixnQkFBVCxDQUEwQixrQkFBMUIsRUFBOEMsWUFBVzs7QUFFeEQsVUFBS3BFLFVBQUwsQ0FBZ0IsS0FBSzVGLFFBQUwsQ0FBY3pFLE9BQTlCOztBQUVBLFVBQUt1SyxXQUFMOztBQUVBLFVBQUtnRixZQUFMLENBQWtCLENBQWxCO0FBQ0EsS0FQNkMsQ0FPNUNySSxJQVA0QyxDQU92QyxJQVB1QyxDQUE5QztBQVFBOztBQUVEOzs7Ozs7O0FBOStEaUM7QUFBQTtBQUFBLGtDQXEvRGpDO0FBQUEsUUFEYXNJLFVBQ2IsdUVBRDBCLENBQzFCOztBQUNDLFFBQUlQLFlBQVlRLFVBQVosSUFBMEJSLFlBQVlRLFVBQVosQ0FBdUJDLE1BQXJELEVBQTZEO0FBQzVELGFBQU9ULFlBQVlRLFVBQVosQ0FBdUJoTCxRQUF2QixDQUFnQ2tMLFdBQXZDO0FBRUMsV0FBSyxhQUFMO0FBQ0MsY0FBTyxLQUFLQyx3QkFBTCxDQUE4QkosVUFBOUIsQ0FBUDtBQUNBO0FBQ0QsV0FBSyxhQUFMO0FBQ0MsY0FBTyxLQUFLSyx3QkFBTCxDQUE4QkwsVUFBOUIsQ0FBUDtBQUNBO0FBQ0Q7QUFDQyxhQUFNLElBQUkxUCwwQkFBSixDQUErQiw0RUFBL0IsQ0FBTjtBQVRGO0FBV0EsS0FaRCxNQVlPO0FBQ04sVUFBSytQLHdCQUFMO0FBQ0E7QUFDRDs7QUFFRDs7Ozs7Ozs7QUF2Z0VpQztBQUFBO0FBQUEsOENBK2dFakM7QUFBQSxRQUR5QkwsVUFDekIsdUVBRHNDLElBQ3RDOztBQUNDLFFBQUlNLFVBQVUsS0FBS0MsV0FBTCxDQUFpQlAsVUFBakIsQ0FBZDs7QUFFQU0sWUFBUUUsSUFBUixDQUFhLFVBQVNDLFFBQVQsRUFBbUI7O0FBRS9CLFVBQUtDLFlBQUwsR0FBb0JELFFBQXBCOztBQUVBLFVBQUssSUFBSTNSLElBQUksQ0FBYixFQUFnQkEsSUFBSSxLQUFLNFIsWUFBTCxDQUFrQjlSLE1BQXRDLEVBQThDRSxHQUE5QyxFQUFtRDtBQUNsRCxVQUFJNlIsVUFBVSxLQUFLRCxZQUFMLENBQWtCNVIsQ0FBbEIsQ0FBZDtBQUNBNFEscUJBQWVrQixPQUFmLENBQXVCLGtCQUF2QixFQUEyQ0QsT0FBM0M7QUFDQTs7QUFFRGpCLG9CQUFla0IsT0FBZixDQUF1QixpQkFBdkIsRUFBMENILFFBQTFDO0FBQ0EsVUFBS0ksWUFBTCxDQUFrQkosUUFBbEI7QUFDQTNLO0FBQ0EsS0FaWSxDQVlYNEIsSUFaVyxDQVlOLElBWk0sQ0FBYixFQVljb0osS0FaZCxDQVlvQixVQUFTbFIsS0FBVCxFQUFnQixDQUVuQyxDQWREOztBQWdCQSxXQUFPMFEsT0FBUDtBQUNBOztBQUVEOzs7Ozs7O0FBcmlFaUM7QUFBQTtBQUFBLDRDQTJpRVJOLFVBM2lFUSxFQTRpRWpDO0FBQ0MsUUFBSU0sZ0JBQUo7O0FBRUEsUUFBSSxLQUFLUixVQUFMLElBQW1CLElBQXZCLEVBQTZCO0FBQUU7QUFDOUJRLGVBQVUsS0FBS0MsV0FBTCxFQUFWO0FBQ0EsS0FGRCxNQUVPO0FBQUU7QUFDUkQsZUFBVXpLLFFBQVFDLE9BQVIsQ0FBZ0IsS0FBS2dLLFVBQXJCLENBQVY7QUFDQTs7QUFFRFEsWUFBUUUsSUFBUixDQUFhLFVBQVNDLFFBQVQsRUFBbUI7QUFDL0IsVUFBS1gsVUFBTCxHQUFrQlcsUUFBbEI7O0FBRUEsU0FBSU0sUUFBUSxLQUFLQyxvQkFBTCxDQUEwQlAsUUFBMUIsQ0FBWjs7QUFFQSxVQUFLQyxZQUFMLEdBQW9CSyxNQUFNZixhQUFXLENBQWpCLENBQXBCOztBQUVBLFVBQUssSUFBSWxSLElBQUksQ0FBYixFQUFnQkEsSUFBSSxLQUFLNFIsWUFBTCxDQUFrQjlSLE1BQXRDLEVBQThDRSxHQUE5QyxFQUFtRDtBQUNsRCxVQUFJNlIsVUFBVSxLQUFLRCxZQUFMLENBQWtCNVIsQ0FBbEIsQ0FBZDtBQUNBNFEscUJBQWVrQixPQUFmLENBQXVCLGtCQUF2QixFQUEyQ0QsT0FBM0M7QUFDQTs7QUFFRGpCLG9CQUFla0IsT0FBZixDQUF1QixpQkFBdkIsRUFBMENILFFBQTFDO0FBQ0EsVUFBS0ksWUFBTCxDQUFrQixLQUFLSCxZQUF2QjtBQUNBN0ssYUFBUUMsT0FBUixDQUFnQixLQUFLNEssWUFBckI7QUFFQSxLQWhCWSxDQWdCWGhKLElBaEJXLENBZ0JOLElBaEJNLENBQWIsRUFnQmNvSixLQWhCZCxDQWdCb0IsVUFBU2xSLEtBQVQsRUFBZ0IsQ0FFbkMsQ0FsQkQ7O0FBb0JBLFdBQU8wUSxPQUFQO0FBQ0E7O0FBRUQ7Ozs7Ozs7QUE1a0VpQztBQUFBO0FBQUEsd0NBa2xFWkcsUUFsbEVZLEVBbWxFakM7QUFDQztBQUNBaEIsZ0JBQVlRLFVBQVosQ0FBdUJoTCxRQUF2QixDQUFnQ2dNLFdBQWhDLEdBQThDUixTQUFTN1IsTUFBdkQ7O0FBRUEsUUFBSXNTLFVBQVV6QixZQUFZUSxVQUFaLENBQXVCaEwsUUFBdkIsQ0FBZ0NrTSxRQUE5Qzs7QUFFQTtBQUNBO0FBQ0EsUUFBSXZCLGdCQUFnQmhSLE1BQWhCLElBQTBCLENBQTlCLEVBQWlDO0FBQ2hDLFlBQU9nUixlQUFQO0FBQ0E7O0FBRURBLHNCQUFrQnZNLE9BQU8rTixXQUFQLENBQW1CWCxRQUFuQixFQUE2QlMsT0FBN0IsQ0FBbEI7QUFDQSxXQUFPdEIsZUFBUDtBQUNBOztBQUVEOzs7Ozs7OztBQW5tRWlDO0FBQUE7QUFBQSw4QkEwbUV0QmxOLFFBMW1Fc0IsRUEybUVqQztBQUNDLFNBQUt3TSxPQUFMLEdBQWUzTyxJQUFJZ00sSUFBSixDQUFTN0osUUFBVCxDQUFmOztBQUVBLFFBQUksS0FBS3dNLE9BQVQsRUFBa0I7QUFDakIzTyxTQUFJSyxRQUFKLENBQWEsS0FBS3NPLE9BQWxCLEVBQTJCLEtBQUtqSyxRQUFMLENBQWN3RSxLQUF6QztBQUNBO0FBQ0Q7O0FBRUQ7Ozs7Ozs7O0FBbm5FaUM7QUFBQTtBQUFBLGdDQTBuRXBCNEIsS0ExbkVvQixFQTJuRWpDO0FBQ0MsUUFBSSxDQUFFckgsTUFBTXFOLE9BQU4sQ0FBY2hHLEtBQWQsQ0FBRixJQUEyQkEsTUFBTXpNLE1BQU4sSUFBZ0IsQ0FBaEIsSUFBcUIsT0FBT3lNLE1BQU0sQ0FBTixDQUFQLElBQW1CLFFBQXZFLEVBQWtGO0FBQ2pGLFdBQU0sSUFBSS9LLDBCQUFKLEVBQU47QUFDQTs7QUFFRCxRQUFJbVEsV0FBVyxLQUFLYSxhQUFMLENBQW1CakcsS0FBbkIsRUFBMEIsS0FBS3BHLFFBQUwsQ0FBY3FLLFVBQXhDLEVBQW9ELEtBQXBELENBQWY7O0FBRUEsU0FBS0osT0FBTCxDQUFhbE4sU0FBYixHQUF5QixFQUF6QjtBQUNBeU8sYUFBU3pQLE9BQVQsQ0FBaUIsVUFBUzJQLE9BQVQsRUFBa0I7QUFDbEMsVUFBS3pCLE9BQUwsQ0FBYWhOLFdBQWIsQ0FBeUJ5TyxPQUF6QjtBQUNBLEtBRmdCLENBRWZqSixJQUZlLENBRVYsSUFGVSxDQUFqQjs7QUFJQSxXQUFPMkQsS0FBUDtBQUNBOztBQUVEOzs7Ozs7OztBQTFvRWlDO0FBQUE7QUFBQSxpQ0FrcEVqQztBQUFBLFFBRFkyRSxVQUNaLHVFQUR5QixJQUN6Qjs7QUFDQyxRQUFJdUIsU0FBVXZCLFVBQUQsR0FBZSxLQUFLL0ssUUFBTCxDQUFjZ0IsR0FBZCxHQUFvQixRQUFwQixHQUErQitKLFVBQTlDLEdBQTJELEtBQUsvSyxRQUFMLENBQWNnQixHQUF0Rjs7QUFFQSxXQUFPMEosT0FBTzFFLEdBQVAsQ0FBVztBQUNqQmhGLFVBQUtzTDtBQURZLEtBQVgsQ0FBUDtBQUdBOztBQUVEOzs7Ozs7Ozs7QUExcEVpQztBQUFBO0FBQUEsaUNBa3FFbkJDLG9CQWxxRW1CLEVBa3FFRy9RLFNBbHFFSCxFQWtxRWNnUixPQWxxRWQsRUFtcUVqQztBQUNDLFFBQUdELHFCQUFxQjlSLFdBQXJCLENBQWlDQyxJQUFqQyxJQUF5QyxPQUE1QyxFQUFzRDtBQUNyRCxXQUFNLElBQUlXLDBCQUFKLEVBQU47QUFDQTs7QUFFRCxRQUFJb1IsZ0JBQWdCLEVBQXBCOztBQUVBRix5QkFBcUJ4USxPQUFyQixDQUE2QixVQUFTOEssVUFBVCxFQUFxQjtBQUNqRCxTQUFJNkYsZUFBZSxLQUFLQyxZQUFMLENBQWtCOUYsVUFBbEIsRUFBOEJyTCxTQUE5QixFQUF5Q2dSLE9BQXpDLENBQW5CO0FBQ0FDLG1CQUFjak4sSUFBZCxDQUFtQmtOLFlBQW5CO0FBQ0EsS0FINEIsQ0FHM0JqSyxJQUgyQixDQUd0QixJQUhzQixDQUE3Qjs7QUFLQSxXQUFPZ0ssYUFBUDtBQUNBOztBQUVEOzs7Ozs7Ozs7QUFsckVpQztBQUFBO0FBQUEsZ0NBMHJFcEI1RixVQTFyRW9CLEVBMHJFUnJMLFNBMXJFUSxFQTByRUdnUixPQTFyRUgsRUEyckVqQztBQUNDLFFBQUksUUFBTzNGLFVBQVAseUNBQU9BLFVBQVAsTUFBcUIsUUFBckIsSUFBaUMsT0FBTzJGLE9BQVAsSUFBa0IsUUFBdkQsRUFBaUU7QUFDaEUsV0FBTSxJQUFJblIsMEJBQUosRUFBTjtBQUNBOztBQUVERyxnQkFBWUEsYUFBYSxJQUF6Qjs7QUFFQSxRQUFJa1EsVUFBVXBRLElBQUlzQixhQUFKLENBQWtCLEtBQWxCLEVBQXlCO0FBQ3RDNEgsWUFBTztBQUQrQixLQUF6QixDQUFkOztBQUlBbEosUUFBSUssUUFBSixDQUFhK1AsT0FBYixFQUFzQmxRLFNBQXRCOztBQUVBLFFBQUlvUixVQUFVdFIsSUFBSXNCLGFBQUosQ0FBa0IsS0FBbEIsRUFBeUI7QUFDdEM0SCxZQUFPO0FBRCtCLEtBQXpCLENBQWQ7O0FBSUFrSCxZQUFRek8sV0FBUixDQUFvQjJQLE9BQXBCOztBQUVBLFNBQUssSUFBSTVGLFNBQVQsSUFBc0JILFVBQXRCLEVBQWtDO0FBQ2pDLFNBQUksQ0FBRXpJLE9BQU95TyxRQUFQLENBQWdCN0YsU0FBaEIsRUFBMkIsS0FBS2hILFFBQUwsQ0FBYzZHLFVBQXpDLENBQU4sRUFBNEQ7QUFDM0Q7QUFDQTs7QUFFRCxTQUFJaUcsT0FBTXhSLElBQUlzQixhQUFKLENBQWtCNFAsT0FBbEIsQ0FBVjs7QUFFQSxTQUFJeEYsYUFBYSxPQUFqQixFQUEwQjtBQUN6QixVQUFJQyxRQUFRM0wsSUFBSXNCLGFBQUosQ0FBa0IsS0FBbEIsRUFBeUI7QUFDcENzSyxZQUFLTCxXQUFXRyxTQUFYO0FBRCtCLE9BQXpCLENBQVo7QUFHQTBFLGNBQVF6TyxXQUFSLENBQW9CZ0ssS0FBcEI7QUFDQSxNQUxELE1BS087QUFDTjZGLFdBQUkvUCxTQUFKLEdBQWdCOEosV0FBV0csU0FBWCxLQUF5QixFQUF6QztBQUNBOztBQUVEMUwsU0FBSUssUUFBSixDQUFhbVIsSUFBYixFQUFrQixhQUFhdlQsSUFBSXdULFNBQUosQ0FBYy9GLFNBQWQsQ0FBL0I7QUFDQTRGLGFBQVEzUCxXQUFSLENBQW9CNlAsSUFBcEI7QUFDQTs7QUFFRCxRQUFJQSxNQUFNeFIsSUFBSXNCLGFBQUosQ0FBa0IsS0FBbEIsRUFBeUI7QUFDbEM0SCxZQUFPO0FBRDJCLEtBQXpCLENBQVY7O0FBSUEsUUFBSXdJLFlBQVkxUixJQUFJc0IsYUFBSixDQUFrQixRQUFsQixFQUE0QjtBQUMzQzRILFlBQU8sYUFEb0M7QUFFM0N5SSxXQUFNLFFBRnFDO0FBRzNDNUYsV0FBTTtBQUhxQyxLQUE1QixDQUFoQjs7QUFNQSxRQUFJNkYsV0FBVzVSLElBQUlzQixhQUFKLENBQWtCLFFBQWxCLEVBQTRCO0FBQzFDNEgsWUFBTyxVQURtQztBQUUxQ3lJLFdBQU0sUUFGb0M7QUFHMUM1RixXQUFNO0FBSG9DLEtBQTVCLENBQWY7O0FBTUEsUUFBSSxLQUFLckgsUUFBTCxDQUFjc0ssZ0JBQWxCLEVBQW9DO0FBQ25DaFAsU0FBSUssUUFBSixDQUFhcVIsU0FBYixFQUF3QixLQUFLaE4sUUFBTCxDQUFjc0ssZ0JBQXRDO0FBQ0E7O0FBRUQsUUFBSSxLQUFLdEssUUFBTCxDQUFjdUsscUJBQWxCLEVBQXlDO0FBQ3hDalAsU0FBSUssUUFBSixDQUFhdVIsUUFBYixFQUF1QixLQUFLbE4sUUFBTCxDQUFjdUsscUJBQXJDO0FBQ0E7O0FBRUR1QyxRQUFJN1AsV0FBSixDQUFnQitQLFNBQWhCO0FBQ0FGLFFBQUk3UCxXQUFKLENBQWdCaVEsUUFBaEI7O0FBRUFGLGNBQVVoRCxnQkFBVixDQUEyQixPQUEzQixFQUFvQyxVQUFTaEMsQ0FBVCxFQUFZO0FBQy9DQSxPQUFFQyxjQUFGO0FBQ0F3QyxvQkFBZWtCLE9BQWYsQ0FBdUIsb0JBQXZCLEVBQTZDOUUsVUFBN0M7QUFDQSxLQUhEOztBQUtBcUcsYUFBU2xELGdCQUFULENBQTBCLE9BQTFCLEVBQW1DLFVBQVNoQyxDQUFULEVBQVk7QUFDOUNBLE9BQUVDLGNBQUY7QUFDQSxVQUFLbEwsU0FBTCxHQUFpQixVQUFqQjtBQUNBME4sb0JBQWVrQixPQUFmLENBQXVCLHdCQUF2QixFQUFpRDlFLFVBQWpEO0FBQ0EsS0FKRDs7QUFNQStGLFlBQVEzUCxXQUFSLENBQW9CNlAsR0FBcEI7O0FBRUEsV0FBT3BCLE9BQVA7QUFDQTs7QUFFRDs7OztBQTd3RWlDO0FBQUE7QUFBQSxpQ0FpeEVqQztBQUNDLFFBQUlwUSxJQUFJZ00sSUFBSixDQUFTLDJCQUFULENBQUosRUFBMkM7QUFDMUM7QUFDQTs7QUFFRCxRQUFJLEtBQUt0SCxRQUFMLENBQWM4RSxNQUFsQixFQUEwQjtBQUN6QjtBQUNBOztBQUVELFFBQUlMLFFBQVEsS0FBS3pFLFFBQUwsQ0FBY3lFLEtBQWQsSUFBdUIsTUFBbkM7QUFDQSxRQUFJQyxTQUFTLEtBQUsxRSxRQUFMLENBQWMwRSxNQUFkLElBQXdCLE9BQXJDO0FBQ0EsUUFBSXdGLFdBQVcsS0FBS2xLLFFBQUwsQ0FBY21LLFNBQWQsSUFBMkIsT0FBMUM7QUFDQSxRQUFJZ0QsV0FBVyxLQUFLbk4sUUFBTCxDQUFjb04sU0FBZCxJQUEyQixPQUExQzs7QUFFQSxRQUFJN1EseUlBS09rSSxLQUxQLDhCQU1XeUYsUUFOWCw4QkFPV2lELFFBUFgsMkJBUVF6SSxNQVJSLHMxQ0FBSjs7QUFxRUdwSixRQUFJa00sUUFBSixDQUFhLDBCQUFiLEVBQXlDakwsR0FBekM7QUFDSDtBQXIyRWdDOztBQUFBO0FBQUE7O0FBdzJFbEM7Ozs7O0FBeDJFa0MsS0EyMkU1QjhRLFFBMzJFNEI7QUFBQTtBQUFBOztBQWczRWxDLEtBQUlDLG1CQUFtQix1QkFBdkI7O0FBaDNFa0MsS0FrM0U1QkMsdUJBbDNFNEI7QUFBQTs7QUFvM0VqQyxxQ0FDQTtBQUFBLE9BRFkzUyxPQUNaLHVFQURzQixJQUN0Qjs7QUFBQTs7QUFDQ0EsYUFBVUEsV0FBVzBTLGdCQUFyQjs7QUFERDs7QUFHSSw0SkFBdUIxUyxPQUF2QjtBQUhKO0FBSUk7O0FBejNFNkI7QUFBQSxHQWszRUlQLGdCQWwzRUo7O0FBNDNFbEM7Ozs7Ozs7QUFPQTs7Ozs7OztBQUtBLEtBQUltVCxvQkFBb0I7QUFDdkJqUyxXQUFTLG1CQURjO0FBRXZCMlAsZUFBYSxhQUZVO0FBR3ZCMUcsU0FBTyxFQUhnQjtBQUl2QjBILFlBQVUsQ0FKYTtBQUt2QkYsZUFBYTtBQUxVLEVBQXhCOztBQVFBOzs7OztBQUtBLEtBQUl5QixvQkFBSjs7QUFFQTs7Ozs7QUFLQSxLQUFJQyxtQkFBSjs7QUFFQTs7Ozs7QUFLQSxLQUFJQyx1QkFBSjs7QUFuNkVrQyxLQXE2RTVCM0MsVUFyNkU0QjtBQXU2RWpDOzs7Ozs7OztBQVFBLHNCQUFZM0YsU0FBWixFQUF1Qm1HLFFBQXZCLEVBQWlDdEksTUFBakMsRUFDQTtBQUFBOztBQUNDLFFBQUswSyxVQUFMLENBQWdCLENBQWhCO0FBQ0FILGlCQUFjcEksU0FBZDtBQUNBcUksZ0JBQWFsQyxRQUFiO0FBQ0FtQyxvQkFBaUJ6SyxNQUFqQjtBQUNBOztBQUVEOzs7Ozs7OztBQXY3RWlDO0FBQUE7QUFBQSx5QkE2N0UzQmxELFFBNzdFMkIsRUE4N0VqQztBQUNDLFFBQUcsUUFBT0EsUUFBUCx5Q0FBT0EsUUFBUCxNQUFtQixRQUF0QixFQUFnQztBQUMvQixXQUFNLElBQUkzRSwwQkFBSixFQUFOO0FBQ0E7O0FBRUQsU0FBSzJFLFFBQUwsR0FBZ0I1QixPQUFPNkIsTUFBUCxDQUFjdU4saUJBQWQsRUFBaUN4TixRQUFqQyxDQUFoQjs7QUFFQSxTQUFLNEYsVUFBTCxDQUFnQixLQUFLNUYsUUFBTCxDQUFjekUsT0FBOUI7O0FBRUE7QUFDQTtBQUNBb1MsbUJBQWV4RixTQUFmLENBQXlCLGlCQUF6QixFQUE0QyxVQUFTcUQsUUFBVCxFQUFtQjtBQUM5RCxVQUFLcUMsVUFBTCxHQUFrQixLQUFLQyxtQkFBTCxDQUF5QixLQUFLOU4sUUFBTCxDQUFja00sUUFBdkMsRUFBaURWLFNBQVM3UixNQUExRCxDQUFsQjtBQUNBLFVBQUtvVSxlQUFMO0FBQ0EsS0FIMkMsQ0FHMUN0TCxJQUgwQyxDQUdyQyxJQUhxQyxDQUE1Qzs7QUFLQTtBQUNBLFNBQUtvTCxVQUFMLEdBQWtCLEtBQUtDLG1CQUFMLENBQXlCLEtBQUs5TixRQUFMLENBQWNrTSxRQUF2QyxFQUFpRCxLQUFLbE0sUUFBTCxDQUFjZ00sV0FBL0QsQ0FBbEI7QUFDQSxTQUFLK0IsZUFBTDtBQUNBOztBQUVEOzs7Ozs7O0FBbjlFaUM7QUFBQTtBQUFBLHFDQTA5RWpDO0FBQ0MsU0FBS0MsS0FBTCxHQUFhLEtBQUtDLFdBQUwsRUFBYjtBQUNBLFNBQUtDLFlBQUwsQ0FBa0IsS0FBS0YsS0FBdkI7QUFDQSxTQUFLbkksa0JBQUwsQ0FBd0IsS0FBS21JLEtBQTdCO0FBQ0E7O0FBRUQ7Ozs7Ozs7QUFoK0VpQztBQUFBO0FBQUEsOEJBcytFdEJ2USxRQXQrRXNCLEVBdStFakM7QUFDQyxTQUFLd00sT0FBTCxHQUFlM08sSUFBSWdNLElBQUosQ0FBUzdKLFFBQVQsQ0FBZjs7QUFFQW5DLFFBQUlLLFFBQUosQ0FBYSxLQUFLc08sT0FBbEIsRUFBMkIsS0FBS2pLLFFBQUwsQ0FBY3dFLEtBQXpDO0FBQ0E7O0FBRUQ7Ozs7Ozs7QUE3K0VpQztBQUFBO0FBQUEsZ0NBbS9FcEJ3SixLQW4vRW9CLEVBby9FakM7QUFDQyxTQUFLL0QsT0FBTCxDQUFhbE4sU0FBYixHQUF5QixFQUF6QjtBQUNBLFNBQUtrTixPQUFMLENBQWFoTixXQUFiLENBQXlCK1EsS0FBekI7QUFDQTs7QUFFRDs7Ozs7Ozs7QUF6L0VpQztBQUFBO0FBQUEsdUNBZ2dGYi9CLE9BaGdGYSxFQWdnRkpwQixVQWhnRkksRUFpZ0ZqQztBQUNDb0IsY0FBVTlNLFNBQVM4TSxPQUFULENBQVY7QUFDQXBCLGlCQUFhMUwsU0FBUzBMLFVBQVQsQ0FBYjs7QUFFQSxXQUFPOVEsS0FBS3NGLElBQUwsQ0FBVXdMLGFBQWFvQixPQUF2QixDQUFQO0FBQ0E7O0FBRUQ7Ozs7Ozs7QUF4Z0ZpQztBQUFBO0FBQUEsc0NBOGdGZCtCLEtBOWdGYyxFQStnRmpDO0FBQ0MsUUFBSXRMLFdBQVcsSUFBZjs7QUFFQSxTQUFLeUwsSUFBTCxDQUFVQyxVQUFWLENBQXFCLENBQXJCLEVBQXdCckcsT0FBeEIsR0FBa0MsVUFBU0MsQ0FBVCxFQUFZO0FBQzdDQSxPQUFFQyxjQUFGOztBQUVBLFNBQUlvRyxnQkFBZ0IzTCxTQUFTNEwsT0FBVCxHQUFpQixDQUFyQzs7QUFFQSxTQUFJNUwsU0FBUzZMLGNBQVQsQ0FBd0JGLGFBQXhCLENBQUosRUFBNEM7QUFDM0MsWUFBTSxJQUFJZCx1QkFBSixDQUE0Qix5Q0FBNUIsQ0FBTjtBQUNBOztBQUVERyxnQkFBVzVDLFlBQVgsQ0FBd0J1RCxhQUF4QixFQUF1QzlDLElBQXZDLENBQTRDLFVBQVNDLFFBQVQsRUFBbUI7QUFDOUQ5SSxlQUFTa0wsVUFBVCxDQUFvQlMsYUFBcEI7QUFDQSxNQUZEO0FBR0EsS0FaRDs7QUFjQSxTQUFLRyxRQUFMLENBQWNKLFVBQWQsQ0FBeUIsQ0FBekIsRUFBNEJyRyxPQUE1QixHQUFzQyxVQUFTQyxDQUFULEVBQVk7QUFDakRBLE9BQUVDLGNBQUY7O0FBRUEsU0FBSW9HLGdCQUFnQjNMLFNBQVM0TCxPQUFULEdBQWlCLENBQXJDOztBQUVBLFNBQUc1TCxTQUFTNkwsY0FBVCxDQUF3QkYsYUFBeEIsQ0FBSCxFQUEyQztBQUMxQyxZQUFNLElBQUlkLHVCQUFKLENBQTRCLHlDQUE1QixDQUFOO0FBQ0E7O0FBRURHLGdCQUFXNUMsWUFBWCxDQUF3QnVELGFBQXhCLEVBQXVDOUMsSUFBdkMsQ0FBNEMsVUFBU0MsUUFBVCxFQUFtQjtBQUM5RDlJLGVBQVNrTCxVQUFULENBQW9CUyxhQUFwQjtBQUNBLE1BRkQ7QUFHQSxLQVpEOztBQWNBLFNBQUksSUFBSXhVLElBQUksQ0FBWixFQUFlQSxJQUFJLEtBQUtpUyxLQUFMLENBQVduUyxNQUE5QixFQUFzQ0UsR0FBdEMsRUFBMkM7QUFDMUMsVUFBS2lTLEtBQUwsQ0FBV2pTLENBQVgsRUFBY3VVLFVBQWQsQ0FBeUIsQ0FBekIsRUFBNEJyRyxPQUE1QixHQUFzQyxVQUFTQyxDQUFULEVBQVk7QUFDakRBLFFBQUVDLGNBQUY7O0FBRUEsVUFBSW9HLGdCQUFnQixLQUFLSSxZQUFMLENBQWtCLGNBQWxCLENBQXBCOztBQUVBZixpQkFBVzVDLFlBQVgsQ0FBd0J1RCxhQUF4QixFQUF1QzlDLElBQXZDLENBQTRDLFVBQVNDLFFBQVQsRUFBbUI7QUFDOUQ5SSxnQkFBU2tMLFVBQVQsQ0FBb0JTLGFBQXBCO0FBQ0EsT0FGRDtBQUdBLE1BUkQ7QUFTQTtBQUNEOztBQUVEOzs7Ozs7O0FBM2pGaUM7QUFBQTtBQUFBLDhCQWlrRnRCdEQsVUFqa0ZzQixFQWtrRmpDO0FBQ0MsU0FBS3VELE9BQUwsR0FBZW5QLFNBQVM0TCxVQUFULENBQWY7QUFDQSxTQUFLMkQsU0FBTCxDQUFlM0QsVUFBZjtBQUNBLFNBQUs0RCxhQUFMLENBQW1CNUQsVUFBbkI7QUFDQTs7QUFFRDs7Ozs7O0FBeGtGaUM7QUFBQTtBQUFBLGdDQThrRmpDO0FBQ0MsV0FBTyxLQUFLdUQsT0FBWjtBQUNBOztBQUVEOzs7Ozs7QUFsbEZpQztBQUFBO0FBQUEsaUNBd2xGakM7QUFDQyxRQUFJTSxLQUFLblMsU0FBU0csYUFBVCxDQUF1QixJQUF2QixDQUFUOztBQUVBLFNBQUtrUCxLQUFMLEdBQWEsS0FBSytDLGVBQUwsRUFBYjtBQUNBLFNBQUtMLFFBQUwsR0FBZ0IsS0FBS00sb0JBQUwsRUFBaEI7QUFDQSxTQUFLWCxJQUFMLEdBQVksS0FBS1ksZ0JBQUwsRUFBWjs7QUFFQUgsT0FBR3BULFNBQUgsR0FBZSxZQUFmO0FBQ0FvVCxPQUFHM1IsV0FBSCxDQUFlLEtBQUt1UixRQUFwQjs7QUFFQSxTQUFLMUMsS0FBTCxDQUFXL1AsT0FBWCxDQUFtQixVQUFTaVQsSUFBVCxFQUFlO0FBQ2pDSixRQUFHM1IsV0FBSCxDQUFlK1IsSUFBZjtBQUNBLEtBRkQ7O0FBSUFKLE9BQUczUixXQUFILENBQWUsS0FBS2tSLElBQXBCOztBQUVBLFdBQU9TLEVBQVA7QUFDQTs7QUFFRDs7Ozs7O0FBM21GaUM7QUFBQTtBQUFBLHFDQWluRmpDO0FBQ0MsUUFBSTlDLFFBQVEsRUFBWjs7QUFFQSxTQUFJLElBQUlqUyxJQUFJLENBQVosRUFBZUEsS0FBSyxLQUFLZ1UsVUFBekIsRUFBcUNoVSxHQUFyQyxFQUEwQztBQUN6QyxTQUFJb1YsV0FBV3hTLFNBQVNHLGFBQVQsQ0FBdUIsSUFBdkIsQ0FBZjtBQUNBLFNBQUlzUyxPQUFPelMsU0FBU0csYUFBVCxDQUF1QixHQUF2QixDQUFYO0FBQ0FxUyxjQUFTelQsU0FBVCxHQUFzQixLQUFLOFMsT0FBTCxJQUFnQnpVLENBQWpCLEdBQXNCLGtCQUF0QixHQUEyQyxXQUFoRTtBQUNBcVYsVUFBSzFULFNBQUwsR0FBaUIsV0FBakI7QUFDQTBULFVBQUtsUyxZQUFMLENBQWtCLE1BQWxCLEVBQTBCLFdBQVVuRCxDQUFwQztBQUNBcVYsVUFBS2xTLFlBQUwsQ0FBa0IsY0FBbEIsRUFBa0NuRCxDQUFsQztBQUNBcVYsVUFBS25TLFNBQUwsR0FBaUJsRCxDQUFqQjtBQUNBb1YsY0FBU2hTLFdBQVQsQ0FBcUJpUyxJQUFyQjtBQUNBcEQsV0FBTXRNLElBQU4sQ0FBV3lQLFFBQVg7QUFDQTs7QUFFRCxXQUFPbkQsS0FBUDtBQUNBOztBQUVEOzs7Ozs7QUFub0ZpQztBQUFBO0FBQUEsMENBeW9GakM7QUFDQyxRQUFJcUQsS0FBSzFTLFNBQVNHLGFBQVQsQ0FBdUIsSUFBdkIsQ0FBVDtBQUNBLFFBQUlzUyxPQUFPelMsU0FBU0csYUFBVCxDQUF1QixHQUF2QixDQUFYO0FBQ0EsUUFBSXdTLFFBQVEzUyxTQUFTRyxhQUFULENBQXVCLE1BQXZCLENBQVo7QUFDQSxRQUFJeVMsUUFBUTVTLFNBQVNHLGFBQVQsQ0FBdUIsTUFBdkIsQ0FBWjs7QUFHQXVTLE9BQUczVCxTQUFILEdBQWUsV0FBZjtBQUNBMFQsU0FBSzFULFNBQUwsR0FBaUIsV0FBakI7QUFDQTZULFVBQU03VCxTQUFOLEdBQWtCLFNBQWxCOztBQUVBMFQsU0FBS2xTLFlBQUwsQ0FBa0IsTUFBbEIsRUFBMEIsRUFBMUI7QUFDQWtTLFNBQUtsUyxZQUFMLENBQWtCLFlBQWxCLEVBQWdDLFVBQWhDO0FBQ0FvUyxVQUFNcFMsWUFBTixDQUFtQixhQUFuQixFQUFrQyxNQUFsQzs7QUFFQW9TLFVBQU1yUyxTQUFOLEdBQWtCLFNBQWxCO0FBQ0FzUyxVQUFNdFMsU0FBTixHQUFrQixVQUFsQjs7QUFFQW1TLFNBQUtqUyxXQUFMLENBQWlCbVMsS0FBakI7QUFDQUYsU0FBS2pTLFdBQUwsQ0FBaUJvUyxLQUFqQjtBQUNBRixPQUFHbFMsV0FBSCxDQUFlaVMsSUFBZjs7QUFFQSxXQUFPQyxFQUFQO0FBQ0E7O0FBRUQ7Ozs7OztBQWxxRmlDO0FBQUE7QUFBQSxzQ0F3cUZqQztBQUNDLFFBQUlBLEtBQUsxUyxTQUFTRyxhQUFULENBQXVCLElBQXZCLENBQVQ7QUFDQSxRQUFJc1MsT0FBT3pTLFNBQVNHLGFBQVQsQ0FBdUIsR0FBdkIsQ0FBWDtBQUNBLFFBQUl3UyxRQUFRM1MsU0FBU0csYUFBVCxDQUF1QixNQUF2QixDQUFaO0FBQ0EsUUFBSXlTLFFBQVE1UyxTQUFTRyxhQUFULENBQXVCLE1BQXZCLENBQVo7O0FBRUF1UyxPQUFHM1QsU0FBSCxHQUFlLFdBQWY7QUFDQTBULFNBQUsxVCxTQUFMLEdBQWlCLFdBQWpCO0FBQ0E2VCxVQUFNN1QsU0FBTixHQUFrQixTQUFsQjs7QUFFQTBULFNBQUtsUyxZQUFMLENBQWtCLE1BQWxCLEVBQTBCLEVBQTFCO0FBQ0FrUyxTQUFLbFMsWUFBTCxDQUFrQixZQUFsQixFQUFnQyxNQUFoQztBQUNBb1MsVUFBTXBTLFlBQU4sQ0FBbUIsYUFBbkIsRUFBa0MsTUFBbEM7O0FBRUFvUyxVQUFNclMsU0FBTixHQUFrQixTQUFsQjtBQUNBc1MsVUFBTXRTLFNBQU4sR0FBa0IsTUFBbEI7O0FBRUFtUyxTQUFLalMsV0FBTCxDQUFpQm1TLEtBQWpCO0FBQ0FGLFNBQUtqUyxXQUFMLENBQWlCb1MsS0FBakI7QUFDQUYsT0FBR2xTLFdBQUgsQ0FBZWlTLElBQWY7O0FBRUEsV0FBT0MsRUFBUDtBQUNBOztBQUVEOzs7Ozs7O0FBaHNGaUM7QUFBQTtBQUFBLGtDQXNzRmxCcEUsVUF0c0ZrQixFQXVzRmpDO0FBQ0MsV0FBUUEsYUFBYSxLQUFLOEMsVUFBbEIsSUFBZ0M5QyxjQUFjLENBQS9DLElBQXFEN0wsTUFBTTZMLFVBQU4sQ0FBNUQ7QUFDQTs7QUFFRDs7Ozs7OztBQTNzRmlDO0FBQUE7QUFBQSw2QkFpdEZ2QkEsVUFqdEZ1QixFQWt0RmpDO0FBQ0NBLGlCQUFjQSxjQUFjckosY0FBYyxNQUFkLENBQTVCO0FBQ0EvRCxXQUFPMlIsT0FBUCxDQUFlQyxZQUFmLENBQTRCLEVBQTVCLEVBQWdDLEVBQWhDLEVBQW9DLEtBQUtDLGtCQUFMLENBQXdCN1IsT0FBTzhSLFFBQVAsQ0FBZ0JDLElBQXhDLEVBQThDLE1BQTlDLEVBQXNEM0UsVUFBdEQsQ0FBcEM7QUFDQTs7QUFFRDs7Ozs7OztBQXZ0RmlDO0FBQUE7QUFBQSxpQ0E2dEZuQkEsVUE3dEZtQixFQTh0RmpDO0FBQ0MsU0FBSSxJQUFJaUUsSUFBUixJQUFnQixLQUFLbEQsS0FBckIsRUFBNEI7QUFDM0IsU0FBSSxLQUFLQSxLQUFMLENBQVdrRCxJQUFYLEVBQWlCWixVQUFqQixDQUE0QixDQUE1QixFQUErQkssWUFBL0IsQ0FBNEMsY0FBNUMsS0FBK0QxRCxVQUFuRSxFQUErRTtBQUM5RXpQLFVBQUlLLFFBQUosQ0FBYSxLQUFLbVEsS0FBTCxDQUFXa0QsSUFBWCxDQUFiLEVBQStCLFFBQS9CO0FBQ0EsTUFGRCxNQUVPO0FBQ04xVCxVQUFJSSxXQUFKLENBQWdCLEtBQUtvUSxLQUFMLENBQVdrRCxJQUFYLENBQWhCLEVBQWtDLFFBQWxDO0FBQ0E7QUFDRDtBQUNEOztBQUVEOzs7Ozs7QUF4dUZpQztBQUFBO0FBQUEsaUNBOHVGakM7QUFDQyxRQUFJVyxPQUFPLEVBQVg7QUFDQSxRQUFJQyxRQUFRalMsT0FBTzhSLFFBQVAsQ0FBZ0JDLElBQWhCLENBQXFCalcsT0FBckIsQ0FBNkIseUJBQTdCLEVBQXdELFVBQVNvVyxDQUFULEVBQVloTyxHQUFaLEVBQWlCeUIsS0FBakIsRUFBd0I7QUFDM0ZxTSxVQUFLOU4sR0FBTCxJQUFZeUIsS0FBWjtBQUNBLEtBRlcsQ0FBWjs7QUFJQSxXQUFPcU0sSUFBUDtBQUNBOztBQUVEOzs7Ozs7Ozs7QUF2dkZpQztBQUFBO0FBQUEsc0NBK3ZGZDNPLEdBL3ZGYyxFQSt2RlQ4TyxLQS92RlMsRUErdkZGQyxRQS92RkUsRUFnd0ZqQztBQUNJLFFBQUlDLG1CQUFtQixFQUF2QjtBQUNBLFFBQUlDLFlBQVlqUCxJQUFJbEYsS0FBSixDQUFVLEdBQVYsQ0FBaEI7QUFDQSxRQUFJb1UsVUFBVUQsVUFBVSxDQUFWLENBQWQ7QUFDQSxRQUFJRSxnQkFBZ0JGLFVBQVUsQ0FBVixDQUFwQjtBQUNBLFFBQUlHLE9BQU8sRUFBWDs7QUFFQSxRQUFJRCxhQUFKLEVBQW1CO0FBQ2ZGLGlCQUFZRSxjQUFjclUsS0FBZCxDQUFvQixHQUFwQixDQUFaO0FBQ0EsVUFBSyxJQUFJakMsSUFBSSxDQUFiLEVBQWdCQSxJQUFJb1csVUFBVXRXLE1BQTlCLEVBQXNDRSxHQUF0QyxFQUEwQztBQUN0QyxVQUFJb1csVUFBVXBXLENBQVYsRUFBYWlDLEtBQWIsQ0FBbUIsR0FBbkIsRUFBd0IsQ0FBeEIsS0FBOEJnVSxLQUFsQyxFQUF3QztBQUNwQ0UsMkJBQW9CSSxPQUFPSCxVQUFVcFcsQ0FBVixDQUEzQjtBQUNBdVcsY0FBTyxHQUFQO0FBQ0g7QUFDSjtBQUNKOztBQUVELFFBQUlDLFdBQVdELE9BQU8sRUFBUCxHQUFZTixLQUFaLEdBQW9CLEdBQXBCLEdBQTBCQyxRQUF6QztBQUNBLFdBQU9HLFVBQVUsR0FBVixHQUFnQkYsZ0JBQWhCLEdBQW1DSyxRQUExQztBQUNIOztBQUVEOzs7Ozs7QUFyeEZpQztBQUFBO0FBQUEsMkJBMnhGakM7QUFDQyxTQUFLekMsVUFBTCxDQUFnQixDQUFoQjtBQUNBLFNBQUtjLFNBQUwsQ0FBZSxDQUFmO0FBQ0E7QUE5eEZnQzs7QUFBQTtBQUFBOztBQWl5RmxDLEtBQUk0QixtQkFBbUIsa0VBQXZCOztBQWp5RmtDLEtBbXlGNUJDLCtCQW55RjRCO0FBQUE7O0FBcXlGakMsNkNBQ0E7QUFBQSxPQURZM1YsT0FDWix1RUFEc0IsSUFDdEI7O0FBQUE7O0FBQ0NBLGFBQVVBLFdBQVcwVixnQkFBckI7O0FBREQsa0tBRU8xVixPQUZQOztBQUdJLDRLQUF1QkEsT0FBdkI7QUFISjtBQUlJOztBQTF5RjZCO0FBQUEsR0FteUZZUCxnQkFueUZaOztBQTZ5RmxDLEtBQUltVyxvQkFBb0I7QUFDdkJDLGVBQWEsT0FEVTtBQUV2QmxWLFdBQVMsTUFGYztBQUd2Qm1WLG9CQUFrQixFQUhLO0FBSXZCQyxjQUFZLENBQUMsVUFBRCxFQUFhLFVBQWIsRUFBeUIsUUFBekIsRUFBbUMsWUFBbkMsRUFBaUQsTUFBakQsQ0FKVztBQUt2QkMscUJBQW1CO0FBTEksRUFBeEI7O0FBUUEsS0FBSUMsb0JBQW9CO0FBQ3ZCQyxhQUFXO0FBRFksRUFBeEI7O0FBSUEsS0FBSUMscUJBQUo7O0FBenpGa0MsS0EyekY1QnpYLGNBM3pGNEI7QUFBQTtBQUFBOztBQTZ6RmpDOzs7OztBQTd6RmlDLHVCQW0wRmpDO0FBQ0MsV0FBT3lYLFlBQVA7QUFDQTs7QUFFRDs7Ozs7Ozs7Ozs7OztBQXYwRmlDOztBQW0xRmpDLDBCQUFZL1EsUUFBWixFQUNBO0FBQUE7O0FBQ0MsT0FBSSxRQUFPQSxRQUFQLHlDQUFPQSxRQUFQLE1BQW1CLFFBQXZCLEVBQWlDO0FBQ2hDLFVBQU0sSUFBSTNFLDBCQUFKLEVBQU47QUFDQTs7QUFFRCxRQUFLZ0ssU0FBTCxHQUFpQixJQUFJOUMsU0FBSixFQUFqQjtBQUNBLFFBQUt2QyxRQUFMLEdBQWdCNUIsT0FBTzZCLE1BQVAsQ0FBY3VRLGlCQUFkLEVBQWlDeFEsUUFBakMsQ0FBaEI7O0FBRUEsUUFBS2dSLHFCQUFMOztBQUVBdlUsWUFBU3VOLGdCQUFULENBQTBCLGtCQUExQixFQUE4QyxZQUFXO0FBQ3hELFNBQUtwRSxVQUFMLENBQWdCLEtBQUs1RixRQUFMLENBQWN6RSxPQUE5Qjs7QUFFQSxRQUFJLEtBQUt5RSxRQUFMLENBQWM0USxpQkFBbEIsRUFBcUM7QUFDcENLLGtCQUFhclMsSUFBYixDQUFrQixJQUFsQjtBQUNBOztBQUVELFNBQUtrSCxXQUFMO0FBQ0EsSUFSNkMsQ0FRNUNyRCxJQVI0QyxDQVF2QyxJQVJ1QyxDQUE5Qzs7QUFVQXNPLGtCQUFlLEtBQUsvUSxRQUFMLENBQWN5USxXQUE3Qjs7QUFFQXBXLG9CQUFpQjZXLGFBQWpCLEdBQWlDSCxZQUFqQzs7QUFFQSxPQUFJQSxnQkFBZ0IsU0FBaEIsSUFBNkJBLGdCQUFnQixNQUFqRCxFQUF5RDtBQUN4RHBULFdBQU82RCxPQUFQLEdBQWlCLFlBQVc7QUFBRSxZQUFPLElBQVA7QUFBYyxLQUE1QztBQUNBOztBQUVEMlAsOEJBQTJCdlMsSUFBM0IsQ0FBZ0MsSUFBaEMsRUFBc0NvQixTQUFTMlEsVUFBL0M7O0FBRUEsVUFBTyxJQUFJUyxLQUFKLENBQVUsSUFBVixFQUFnQjtBQUN0QnBMLFNBQUssYUFBU3FMLE1BQVQsRUFBaUJuVSxNQUFqQixFQUF5QjtBQUM3QixTQUFJa0IsT0FBT3lPLFFBQVAsQ0FBZ0IzUCxNQUFoQixFQUF3QjhDLFNBQVMyUSxVQUFqQyxDQUFKLEVBQWtEO0FBQ2pELGFBQU9VLE9BQU9oTSxTQUFQLENBQWlCaU0sSUFBakIsQ0FBc0JwVSxNQUF0QixDQUFQO0FBQ0EsTUFGRCxNQUVPLElBQUltVSxPQUFPaE0sU0FBUCxDQUFpQnpDLGFBQWpCLENBQStCMUYsTUFBL0IsQ0FBSixFQUE0QztBQUNsRCxhQUFPbVUsT0FBT2hNLFNBQVAsQ0FBaUJ4QyxXQUFqQixDQUE2QjNGLE1BQTdCLENBQVA7QUFDQTs7QUFFRCxXQUFNLElBQUlxVCwrQkFBSixDQUFvQyxxREFBcEMsQ0FBTjtBQUNBO0FBVHFCLElBQWhCLENBQVA7QUFXQTs7QUFFRDs7Ozs7OztBQS8zRmlDO0FBQUE7QUFBQSwyQ0FxNEZqQztBQUNDLFFBQUkxVyxVQUFKO0FBQ0EsUUFBSTBYLFlBQVksS0FBS3ZSLFFBQUwsQ0FBYzBRLGdCQUE5Qjs7QUFFQSxTQUFLN1csSUFBSSxDQUFULEVBQVlBLElBQUkwWCxVQUFVNVgsTUFBMUIsRUFBa0NFLEdBQWxDLEVBQXVDO0FBQ3RDLFNBQUlnWCxrQkFBa0JsUyxjQUFsQixDQUFpQzRTLFVBQVUxWCxDQUFWLENBQWpDLENBQUosRUFBb0Q7QUFDbkQsVUFBSXlDLEtBQUsscUJBQXFCL0MsSUFBSWlZLE9BQUosQ0FBWUQsVUFBVTFYLENBQVYsQ0FBWixDQUE5Qjs7QUFFQSxVQUFJLENBQUV5QixJQUFJZ00sSUFBSixDQUFTaEwsRUFBVCxDQUFOLEVBQW9CO0FBQ25CaEIsV0FBSW1XLGNBQUosQ0FBbUJuVixFQUFuQixFQUF1QnVVLGtCQUFrQlUsVUFBVTFYLENBQVYsQ0FBbEIsQ0FBdkI7QUFDQTtBQUNEO0FBQ0Q7QUFDRDs7QUFFRDs7Ozs7OztBQXA1RmlDO0FBQUE7QUFBQSw4QkEwNUZ0QjRELFFBMTVGc0IsRUEyNUZqQztBQUNDLFNBQUt3TSxPQUFMLEdBQWUzTyxJQUFJZ00sSUFBSixDQUFTN0osUUFBVCxDQUFmOztBQUVBbkMsUUFBSUssUUFBSixDQUFhLEtBQUtzTyxPQUFsQixFQUEyQixLQUFLakssUUFBTCxDQUFjd0UsS0FBekM7QUFDQTs7QUFFRDs7Ozs7O0FBajZGaUM7QUFBQTtBQUFBLGlDQXU2RmpDO0FBQ0MsUUFBSWxKLElBQUlnTSxJQUFKLENBQVMsa0JBQVQsQ0FBSixFQUFrQztBQUNqQztBQUNBOztBQUVELFFBQUkvSyxtQkFDRCxLQUFLeUQsUUFBTCxDQUFjekUsT0FEYiw2bEJBc0J1QmtCLFNBQVNpVixlQUFULENBQXlCQyxXQXRCaEQsd0JBQUo7O0FBMEJHclcsUUFBSWtNLFFBQUosQ0FBYSxpQkFBYixFQUFnQ2pMLEdBQWhDO0FBQ0g7QUF2OEZnQzs7QUFBQTtBQUFBOztBQTA4RmxDOzs7Ozs7OztBQU1BLFVBQVM0VSwwQkFBVCxDQUFvQ1IsVUFBcEMsRUFBZ0Q7O0FBRS9DLE9BQUt0TCxTQUFMLENBQWV2QyxXQUFmLENBQTJCLFNBQTNCLEVBQXNDLElBQUkvQyxPQUFKLEVBQXRDO0FBQ0EsT0FBS3NGLFNBQUwsQ0FBZXZDLFdBQWYsQ0FBMkIsUUFBM0IsRUFBcUMsSUFBSUcsWUFBSixFQUFyQzs7QUFFQSxPQUFLb0MsU0FBTCxDQUFlNUMsSUFBZixDQUFvQixRQUFwQixFQUE4QixVQUFTNEMsU0FBVCxFQUFvQjtBQUNqRCxPQUFJdU0sWUFBWSxJQUFJN0gsTUFBSixDQUFXMUUsU0FBWCxDQUFoQjtBQUNBdU0sYUFBVTNHLE1BQVYsR0FBbUIsSUFBbkI7QUFDQSxVQUFPMkcsU0FBUDtBQUNBLEdBSkQ7O0FBTUEsT0FBS3ZNLFNBQUwsQ0FBZTVDLElBQWYsQ0FBb0IsVUFBcEIsRUFBZ0MsVUFBUzRDLFNBQVQsRUFBb0I7QUFDbkQsT0FBSXVNLFlBQVksSUFBSXZFLFFBQUosQ0FBYWhJLFNBQWIsQ0FBaEI7QUFDQXVNLGFBQVUzRyxNQUFWLEdBQW1CLElBQW5CO0FBQ0EsVUFBTzJHLFNBQVA7QUFDQSxHQUpEOztBQU1BLE9BQUt2TSxTQUFMLENBQWU1QyxJQUFmLENBQW9CLFVBQXBCLEVBQWdDLFVBQVM0QyxTQUFULEVBQW9CO0FBQ25ELE9BQUl1TSxZQUFZLElBQUloSCxRQUFKLENBQWF2RixTQUFiLEVBQXdCQSxVQUFVdEYsT0FBbEMsRUFBMkNzRixVQUFVd00sTUFBckQsQ0FBaEI7QUFDQUQsYUFBVTNHLE1BQVYsR0FBbUIsSUFBbkI7QUFDQSxVQUFPMkcsU0FBUDtBQUNBLEdBSkQ7O0FBTUEsT0FBS3ZNLFNBQUwsQ0FBZTVDLElBQWYsQ0FBb0IsWUFBcEIsRUFBa0MsVUFBUzRDLFNBQVQsRUFBb0I7QUFDckQsT0FBSXVNLFlBQVksSUFBSTVHLFVBQUosQ0FBZTNGLFNBQWYsRUFBMEJBLFVBQVVpTSxJQUFWLENBQWUsVUFBZixDQUExQixFQUFzRGpNLFVBQVV3TSxNQUFoRSxDQUFoQjtBQUNBRCxhQUFVM0csTUFBVixHQUFtQixJQUFuQjtBQUNBLFVBQU8yRyxTQUFQO0FBQ0EsR0FKRDs7QUFNQSxPQUFLdk0sU0FBTCxDQUFlNUMsSUFBZixDQUFvQixNQUFwQixFQUE0QixVQUFTNEMsU0FBVCxFQUFvQjtBQUMvQyxPQUFJdU0sWUFBWSxJQUFJeE0sSUFBSixDQUFTQyxTQUFULEVBQW9CQSxVQUFVdEYsT0FBOUIsRUFBdUNzRixVQUFVd00sTUFBakQsQ0FBaEI7QUFDQUQsYUFBVTNHLE1BQVYsR0FBbUIsSUFBbkI7QUFDQSxVQUFPMkcsU0FBUDtBQUNBLEdBSkQ7O0FBTUEsT0FBS3ZNLFNBQUwsQ0FBZTBFLE1BQWYsQ0FBc0JrQixNQUF0QixHQUErQixLQUEvQjtBQUNBLE9BQUs1RixTQUFMLENBQWVnSSxRQUFmLENBQXdCcEMsTUFBeEIsR0FBaUMsS0FBakM7QUFDQSxPQUFLNUYsU0FBTCxDQUFldUYsUUFBZixDQUF3QkssTUFBeEIsR0FBaUMsS0FBakM7QUFDQSxPQUFLNUYsU0FBTCxDQUFlMkYsVUFBZixDQUEwQkMsTUFBMUIsR0FBbUMsS0FBbkM7QUFDQSxPQUFLNUYsU0FBTCxDQUFlRCxJQUFmLENBQW9CNkYsTUFBcEIsR0FBNkIsS0FBN0I7QUFDQTs7QUFFRDs7Ozs7OztBQU9BLFVBQVNnRyxZQUFULEdBQXdCO0FBQ3ZCLE1BQUkxTSxTQUFTakosSUFBSXNCLGFBQUosQ0FBa0IsS0FBbEIsRUFBeUI7QUFDckM0SCxVQUFPO0FBRDhCLEdBQXpCLENBQWI7O0FBSUEsTUFBSXNOLE9BQU94VyxJQUFJc0IsYUFBSixDQUFrQixNQUFsQixFQUEwQjtBQUNwQzRILFVBQU87QUFENkIsR0FBMUIsQ0FBWDs7QUFJQUQsU0FBT3RILFdBQVAsQ0FBbUI2VSxJQUFuQjtBQUNBclYsV0FBU3NWLElBQVQsQ0FBYzlVLFdBQWQsQ0FBMEJzSCxNQUExQjs7QUFHQSxNQUFJeU4sV0FBV3ZWLFNBQVNpVixlQUFULENBQXlCQyxXQUF4QztBQUNBLE1BQUlNLFVBQVV4VixTQUFTaVYsZUFBVCxDQUF5QkMsV0FBekIsR0FBdUMsSUFBckQ7O0FBRUFoVSxTQUFPdVUscUJBQVAsQ0FBNkJDLFlBQTdCOztBQUVBLE1BQUlDLFVBQVUsS0FBS25JLE9BQW5COztBQUVBbUksVUFBUUMsS0FBUixDQUFjQyxPQUFkLEdBQXdCLE1BQXhCOztBQUVBLFdBQVNILFlBQVQsR0FBd0I7QUFDdkJMLFFBQUtPLEtBQUwsQ0FBV0UsU0FBWCxHQUF1QixpQkFBaUJQLFFBQWpCLEdBQTRCLEtBQW5EO0FBQ0FBLGVBQVksQ0FBWjs7QUFFQSxPQUFJQSxXQUFXQyxPQUFmLEVBQXdCO0FBQ3ZCTztBQUNBO0FBQ0E7O0FBRUQ3VSxVQUFPdVUscUJBQVAsQ0FBNkJDLFlBQTdCO0FBQ0E7O0FBRUQsV0FBU0ssSUFBVCxHQUFnQjtBQUNmVixRQUFLTyxLQUFMLENBQVdJLE9BQVgsR0FBcUJULFdBQVcsSUFBaEM7QUFDQUYsUUFBS08sS0FBTCxDQUFXRSxTQUFYLEdBQXVCLGlCQUFpQlAsUUFBakIsR0FBNEIsS0FBbkQ7O0FBRUFBLGVBQVksRUFBWjs7QUFFQSxPQUFJQSxZQUFZLENBQWhCLEVBQW1CO0FBQ2xCSSxZQUFRQyxLQUFSLENBQWNDLE9BQWQsR0FBd0IsT0FBeEI7O0FBRUEsUUFBSSxPQUFPL04sTUFBUCxJQUFpQixXQUFyQixFQUFrQztBQUNqQ2pKLFNBQUlhLE1BQUosQ0FBV29JLE1BQVg7QUFDQTs7QUFFRDtBQUNBOztBQUVENUcsVUFBT3VVLHFCQUFQLENBQTZCTSxJQUE3QjtBQUNBO0FBQ0Q7O0FBRUQsUUFBT2xaLGNBQVA7QUFFQyxDQXpqR3FCLEVBQXRCIiwiZmlsZSI6IlR1cmJvRWNvbW1lcmNlLmpzIiwic291cmNlc0NvbnRlbnQiOlsidmFyIFR1cmJvRWNvbW1lcmNlID0gKGZ1bmN0aW9uICgpIHtcbid1c2Ugc3RyaWN0JztcblxuLyoqXHJcbiAqIEBmaWxlIFxyXG4gKiBTdHIgY2xhc3MuXHJcbiAqXHJcbiAqIEFkZHMgc29tZSB1c2VmdWwgZnVuY3Rpb25hbGl0eSBmb3JcclxuICogbWFuaXB1bGF0aW5nIHN0cmluZ3Mgb3IgY3JlYXRpbmcgc3RyaW5nLlxyXG4gKi9cclxuXHJcbmNsYXNzIFN0clxyXG57XHJcblx0LyoqXHJcblx0ICogQ29udmVydCBjYW1lbENhc2UgdG8ga2ViYWItY2FzZS5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSBzdHJpbmcgfCBzdHJpbmdcclxuXHQgKiBAcmV0dXJuIHN0cmluZ1xyXG5cdCAqL1xyXG5cdHN0YXRpYyBrZWJhYkNhc2Uoc3RyaW5nKSBcclxuXHR7XHJcblx0XHRyZXR1cm4gc3RyaW5nLnJlcGxhY2UoLyhbYS16XSkoW0EtWl0pL2csICckMS0kMicpLnRvTG93ZXJDYXNlKCk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBHZW5lcmF0ZXMgYSByYW5kb20gc3RyaW5nLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIGludGVnZXIgfCBsZW5ndGhcclxuXHQgKiBAcmV0dXJuIHN0cmluZ1xyXG5cdCAqL1xyXG5cdHN0YXRpYyByYW5kb20obGVuZ3RoKSBcclxuXHR7XHJcblx0XHRsZXQgc3RyaW5nID0gJyc7XHJcblx0XHRsZXQgcG9zc2libGUgPSBcIkFCQ0RFRkdISUpLTE1OT1BRUlNUVVZXWFlaYWJjZGVmZ2hpamtsbW5vcHFyc3R1dnd4eXowMTIzNDU2Nzg5XCI7XHJcblxyXG5cdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xyXG5cdCAgICBcdHN0cmluZyArPSBwb3NzaWJsZS5jaGFyQXQoTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogcG9zc2libGUubGVuZ3RoKSk7XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIHN0cmluZztcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIENoYW5nZXMgdGhlIGZpcnN0IGxldHRlciBcclxuXHQgKiBvZiB0aGUgc3RyaW5nIHRvIHVwcGVyY2FzZS5cclxuXHQgKiBcclxuXHQgKiBAcGFyYW0gc3RyaW5nIHwgc3RyaW5nXHJcblx0ICogQHJldHVybiBzdHJpbmdcclxuXHQgKi9cclxuXHRzdGF0aWMgdWNmaXJzdChzdHJpbmcpIFxyXG5cdHtcclxuXHQgICAgcmV0dXJuIHN0cmluZy5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSArIHN0cmluZy5zbGljZSgxKTtcclxuXHR9XHJcbn1cblxuLyoqXHJcbiAqIFN0b3JlcyB0aGUgZGVidWcgbGV2ZWwuXHJcbiAqXHJcbiAqIEB2YXIgc3RyaW5nIFxyXG4gKi9cclxubGV0IGRlYnVnTGV2ZWw7XHJcblxyXG5jbGFzcyBFeGNlcHRpb25IYW5kbGVyXHJcbntcclxuXHQvKipcclxuXHQgKiBTZXR0ZXIgZm9yIHRoZSBkZWJ1ZyBsZXZlbC5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSBzdHJpbmcgfCBsZXZlbFxyXG5cdCAqIEByZXR1cm4gdm9pZFxyXG5cdCAqL1xyXG5cdHN0YXRpYyBzZXQgc2V0RGVidWdMZXZlbChsZXZlbClcclxuXHR7XHJcblx0XHRkZWJ1Z0xldmVsID0gbGV2ZWw7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBFeHRlbmRlZCBjb25zdHJ1Y3RvciwgY2FwdHVyZXMgdGhlXHJcblx0ICogc3RhY2sgdHJhY2UuXHJcblx0ICpcclxuXHQgKiBAcmV0dXJuIHZvaWRcclxuXHQgKi9cclxuXHRjb25zdHJ1Y3RvcigpXHJcblx0e1xyXG5cdFx0aWYgKEVycm9yLmNhcHR1cmVTdGFja1RyYWNlKSB7XHJcblx0XHRcdEVycm9yLmNhcHR1cmVTdGFja1RyYWNlKHRoaXMsIHRoaXMuY29uc3RydWN0b3IubmFtZSk7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBIYW5kbGVzIGFsbCBleGNlcHRpb25zLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIG9iamVjdCB8IGVycm9yIHwgVGhyb3dlbiBFeGNlcHRpb24gT2JqZWN0XHJcblx0ICogQHBhcmFtIHN0cmluZyB8IG1lc3NhZ2VcclxuXHQgKiBAcmV0dXJuIHZvaWRcclxuXHQgKi9cclxuXHRzdGFja1RyYWNlKGVycm9yLCBtZXNzYWdlKSBcclxuXHR7XHJcblx0XHR0aGlzLmN1c3RvbUFjdGlvbnMoZXJyb3IsIG1lc3NhZ2UpO1xyXG5cclxuXHRcdHN3aXRjaChkZWJ1Z0xldmVsKVxyXG5cdFx0e1xyXG5cdFx0XHRjYXNlICdlcnJvcic6IHRoaXMuaGFuZGxlRXJyb3JzKGVycm9yLCBtZXNzYWdlKTsgYnJlYWs7XHJcblx0XHRcdGNhc2UgJ3dhcm5pbmcnOiB0aGlzLmhhbmRsZVdhcm5pbmdzKGVycm9yLCBtZXNzYWdlKTsgYnJlYWs7XHJcblx0XHRcdGNhc2UgJ2luZm8nOiB0aGlzLmhhbmRsZUluZm9zKGVycm9yLCBtZXNzYWdlKTsgYnJlYWs7XHJcblx0XHRcdGRlZmF1bHQ6IHRoaXMuaGFuZGxlSW5mb3MoZXJyb3IsIG1lc3NhZ2UpOyBicmVhaztcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFRha2UgYWN0aW9uIGZvciBzcGVjaWZpYyBFeGNlcHRpb25zLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIG9iamVjdCB8IGVycm9yIHwgVGhyb3dlbiBFeGNlcHRpb24gT2JqZWN0XHJcblx0ICogQHBhcmFtIHN0cmluZyB8IG1lc3NhZ2VcclxuXHQgKiBAcmV0dXJuIGJvb2xcclxuXHQgKi9cclxuXHRjdXN0b21BY3Rpb25zKGVycm9yLCBtZXNzYWdlKVxyXG5cdHtcclxuXHRcdGlmIChlcnJvci5jb25zdHJ1Y3Rvci5uYW1lID09ICdJbnZhbGlkQXJndW1lbnRFeGNlcHRpb24nKSB7XHJcblx0XHRcdC8vIGhhbmRsZVxyXG5cdFx0fSBlbHNlIGlmIChlcnJvci5jb25zdHJ1Y3Rvci5uYW1lID09ICdJbnZhbGlkQmluZGluZ0V4Y2VwdGlvbicpIHtcclxuXHRcdFx0Ly8gaGFuZGxlXHJcblx0XHR9IGVsc2UgaWYgKGVycm9yLmNvbnN0cnVjdG9yLm5hbWUgPT0gJ0JhZEV2ZW50Q2FsbEV4Y2VwdGlvbicpIHtcclxuXHRcdFx0Ly8gaGFuZGxlXHJcblx0XHR9IGVsc2UgaWYgKGVycm9yLmNvbnN0cnVjdG9yLm5hbWUgPT0gJ0NvbXBvbmVudHNFeGNlcHRpb24nKSB7XHJcblx0XHRcdC8vIGhhbmRsZVxyXG5cdFx0fSBlbHNlIGlmIChlcnJvci5jb25zdHJ1Y3Rvci5uYW1lID09ICdDb21wb25lbnROb3RSZWdpc3RlcmVkRXhjZXB0aW9uJykge1xyXG5cdFx0XHQvLyBoYW5kbGVcclxuXHRcdH0gZWxzZSBpZiAoZXJyb3IuY29uc3RydWN0b3IubmFtZSA9PSAnTm90SW5QYWdlUmFuZ2VFeGNlcHRpb24nKSB7XHJcblx0XHRcdC8vIGhhbmRsZVxyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiBmYWxzZTtcclxuXHR9XHJcblxyXG5cdGhhbmRsZUVycm9ycyhlcnJvciwgbWVzc2FnZSlcclxuXHR7XHJcblx0XHRjb25zb2xlLmVycm9yKGVycm9yLmNvbnN0cnVjdG9yLm5hbWUgKyAnOiAnICsgbWVzc2FnZSk7XHJcblx0fVxyXG5cclxuXHRoYW5kbGVXYXJuaW5ncyhlcnJvciwgbWVzc2FnZSlcclxuXHR7XHJcblx0XHRjb25zb2xlLndhcm4oZXJyb3IuY29uc3RydWN0b3IubmFtZSArICc6ICcgKyBtZXNzYWdlKTtcclxuXHR9XHJcblxyXG5cdGhhbmRsZUluZm9zKGVycm9yLCBtZXNzYWdlKVxyXG5cdHtcclxuXHRcdGNvbnNvbGUuaW5mbyhlcnJvci5jb25zdHJ1Y3Rvci5uYW1lICsgJzogJyArIG1lc3NhZ2UpO1xyXG5cdH1cclxufVxuXG5sZXQgZGVmYXVsdE1lc3NhZ2UgPSAnYW4gaW52YWxpZCBhcmd1bWVudCB3YXMgcGFzc2VkLic7XHJcblxyXG5jbGFzcyBJbnZhbGlkQXJndW1lbnRFeGNlcHRpb24kMSBleHRlbmRzIEV4Y2VwdGlvbkhhbmRsZXJcclxue1xyXG5cdGNvbnN0cnVjdG9yKG1lc3NhZ2UgPSBudWxsKSBcclxuXHR7XHJcblx0XHRtZXNzYWdlID0gbWVzc2FnZSB8fCBkZWZhdWx0TWVzc2FnZTtcclxuXHRcdHN1cGVyKG1lc3NhZ2UpO1xyXG4gICAgXHRzdXBlci5zdGFja1RyYWNlKHRoaXMsIG1lc3NhZ2UpO1xyXG4gICAgfVxyXG59XG5cbi8qKlxyXG4gKiBAZmlsZSBcclxuICogRE9NIGNsYXNzLlxyXG4gKlxyXG4gKiBBZGRzIHNvbWUgdXNlZnVsIGZ1bmN0aW9uYWxpdHkgZm9yXHJcbiAqIGZldGNoaW5nIG9yIG1hbmlwdWxhdGluZyBET00gZWxlbWVudHMuXHJcbiAqL1xyXG5cclxuY2xhc3MgRE9NXHJcbntcclxuXHQvKipcclxuXHQgKiBNaW5pZmllcyB0aGUgY3NzIHRleHQuXHJcblx0ICogXHJcblx0ICogQHBhcmFtIHN0cmluZyB8IHN0cmluZ1xyXG5cdCAqIEByZXR1cm4gc3RyaW5nXHJcblx0ICovXHJcblx0c3RhdGljIG1pbmlmeUNzcyhzdHJpbmcpIFxyXG5cdHtcclxuXHQgICAgc3RyaW5nID0gc3RyaW5nLnJlcGxhY2UoL1xcL1xcKig/Oig/IVxcKlxcLylbXFxzXFxTXSkqXFwqXFwvfFtcXHJcXG5cXHRdKy9nLCAnJyk7XHJcblx0ICAgIHN0cmluZyA9IHN0cmluZy5yZXBsYWNlKC8gezIsfS9nLCAnICcpO1xyXG5cdCAgICBzdHJpbmcgPSBzdHJpbmcucmVwbGFjZSgvKFt7On1dKS9nLCAnJDEnKTtcclxuXHQgICAgc3RyaW5nID0gc3RyaW5nLnJlcGxhY2UoLyhbOyxdKSAvZywgJyQxJyk7XHJcblx0ICAgIHN0cmluZyA9IHN0cmluZy5yZXBsYWNlKC8gIS9nLCAnIScpO1xyXG5cdCAgICBcclxuXHQgICAgcmV0dXJuIHN0cmluZztcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFN3aXRjaGVzIGJldHdlZW4gdHdvIGdpdmVuIGNsYXNzZXMuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gb2JqZWN0IHwgZWxlbWVudFxyXG5cdCAqIEBwYXJhbSBzdHJpbmcgfCBjbGFzc05hbWVcclxuXHQgKiBAcGFyYW0gc3RyaW5nIHwgbmV3Q2xhc3NOYW1lXHJcblx0ICogQHJldHVybiBvYmplY3RcclxuXHQgKi9cclxuXHRzdGF0aWMgc3dpdGNoQ2xhc3NlcyhlbGVtZW50LCBjbGFzc05hbWUsIG5ld0NsYXNzTmFtZSkgXHJcblx0e1xyXG5cdFx0dGhpcy5yZW1vdmVDbGFzcyhlbGVtZW50LCBjbGFzc05hbWUpO1xyXG5cdFx0dGhpcy5hZGRDbGFzcyhlbGVtZW50LCBuZXdDbGFzc05hbWUpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQWRkcyBjbGFzcyB0byBhIGdpdmVuIGVsZW1lbnQuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gb2JqZWN0IHwgZWxlbWVudFxyXG5cdCAqIEBwYXJhbSBzdHJpbmcgfCBjbGFzc05hbWVcclxuXHQgKiBAcmV0dXJuIG9iamVjdFxyXG5cdCAqL1xyXG5cdHN0YXRpYyBhZGRDbGFzcyhlbGVtZW50LCBjbGFzc05hbWUpIFxyXG5cdHtcclxuXHRcdGlmKGVsZW1lbnQgPT09IG51bGwpIHtcclxuXHRcdFx0dGhyb3cgbmV3IEludmFsaWRBcmd1bWVudEV4Y2VwdGlvbiQxO1xyXG5cdFx0fVxyXG5cclxuXHRcdGlmKCEgY2xhc3NOYW1lIHx8IGNsYXNzTmFtZSA9PSAnJyB8fCB0eXBlb2YgY2xhc3NOYW1lID09PSB1bmRlZmluZWQpIHtcclxuXHRcdFx0cmV0dXJuIGVsZW1lbnQ7XHJcblx0XHR9XHJcblxyXG5cdFx0bGV0IGNsYXNzTmFtZXMgPSBjbGFzc05hbWUuc3BsaXQoJyAnKTtcclxuXHJcblx0XHRjbGFzc05hbWVzLmZvckVhY2goZnVuY3Rpb24obmFtZSkge1xyXG5cdFx0XHRlbGVtZW50LmNsYXNzTGlzdC5hZGQobmFtZSk7XHJcblx0XHR9KTtcclxuXHRcdFxyXG5cdFx0cmV0dXJuIGVsZW1lbnQ7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBDaGVja3MgaWYgYW4gZWxlbWVudCBoYXMgYSBjbGFzcy5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSBIVE1MRWxlbWVudCB8IGVsZW1lbnRcclxuXHQgKiBAcGFyYW0gc3RyaW5nIHwgY2xhc3NOYW1lXHJcblx0ICogQHJldHVybiBib29sXHJcblx0ICovXHJcblx0c3RhdGljIGhhc0NsYXNzKGVsZW1lbnQsIGNsYXNzTmFtZSlcclxuXHR7XHJcblx0XHRpZiAoZWxlbWVudCA9PT0gbnVsbCkge1xyXG5cdFx0XHR0aHJvdyBuZXcgSW52YWxpZEFyZ3VtZW50RXhjZXB0aW9uJDEoJ2hhc0NsYXNzKCkgZXhwZWN0cyB0aGUgZmlyc3QgYXJndW1lbnQgdG8gYmUgYW4gSFRNTEVsZW1lbnQgYnV0IG51bGwgd2FzIHBhc3NlZC4nKTtcclxuXHRcdH1cclxuXHJcblx0XHRpZiAoISBjbGFzc05hbWUgfHwgY2xhc3NOYW1lID09ICcnIHx8IHR5cGVvZiBjbGFzc05hbWUgPT0gJ3VuZGVmaW5lZCcpIHtcclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiBlbGVtZW50LmNsYXNzTmFtZS5pbmRleE9mKGNsYXNzTmFtZSkgIT0gLTE7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBSZW1vdmVzIGNsYXNzIGZyb20gYSBnaXZlbiBlbGVtZW50LlxyXG5cdCAqIFxyXG5cdCAqIEBwYXJhbSBvYmplY3QgfCBlbGVtZW50XHJcblx0ICogQHBhcmFtIHN0cmluZyB8IGNsYXNzTmFtZVxyXG5cdCAqIEByZXR1cm4gb2JqZWN0XHJcblx0ICovXHJcblx0c3RhdGljIHJlbW92ZUNsYXNzKGVsZW1lbnQsIGNsYXNzTmFtZSkgXHJcblx0e1xyXG5cdFx0aWYoZWxlbWVudCA9PSBudWxsKSB7XHJcblx0XHRcdHRocm93IG5ldyBJbnZhbGlkQXJndW1lbnRFeGNlcHRpb24kMTtcclxuXHRcdH1cclxuXHJcblx0XHRpZihjbGFzc05hbWUgPT0gJycpIHtcclxuXHRcdFx0ZWxlbWVudC5jbGFzc05hbWUgPSAnJztcclxuXHRcdH0gZWxzZSB7XHJcblxyXG5cdFx0XHRsZXQgY2xhc3NOYW1lcyA9IGNsYXNzTmFtZS5zcGxpdCgnICcpO1xyXG5cclxuXHRcdFx0Y2xhc3NOYW1lcy5mb3JFYWNoKGZ1bmN0aW9uKG5hbWUpIHtcclxuXHRcdFx0XHRlbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUobmFtZSk7XHJcblx0XHRcdH0pO1xyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiBlbGVtZW50O1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogUmVtb3ZlcyBhbiBlbGVtZW50IGZyb20gdGhlIERPTS5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSBIVE1MRWxlbWVudFxyXG5cdCAqIEByZXR1cm4gdm9pZFxyXG5cdCAqL1xyXG5cdHN0YXRpYyByZW1vdmUoZWxlbWVudClcclxuXHR7XHJcblx0XHRlbGVtZW50LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoZWxlbWVudCk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBBZGRzIHN0eWxlIHRhZyB3aXRoIGdpdmVuIGlkIGFuZCBjc3MgdG8gdGhlIERPTS5cclxuXHQgKiBcclxuXHQgKiBAcGFyYW0gc3RyaW5nIHwgaWRcclxuXHQgKiBAcGFyYW0gc3RyaW5nIHwgY3NzXHJcblx0ICogQHJldHVybiB2b2lkXHJcblx0ICovXHJcblx0c3RhdGljIGFkZFN0eWxlKGlkLCBjc3MpXHJcblx0e1xyXG5cdFx0aWYgKHR5cGVvZiBjc3MgIT0gJ3N0cmluZycpIHtcclxuXHRcdFx0dGhyb3cgbmV3IEludmFsaWRBcmd1bWVudEV4Y2VwdGlvbiQxO1xyXG5cdFx0fVxyXG5cclxuXHRcdGxldCBoZWFkID0gZG9jdW1lbnQuaGVhZCB8fCBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnaGVhZCcpWzBdO1xyXG5cdFx0bGV0IHN0eWxlVGFnID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3R5bGUnKTtcclxuXHJcblx0XHQvLyBwaXBlIGl0IHRocm91Z2ggdGhlIG1pbmZpZXJcclxuXHQgICAgbGV0IENTUyA9IHRoaXMubWluaWZ5Q3NzKGNzcyk7XHJcblx0ICAgIC8vIGFkZGluZyBpdCB0byB0aGUgc3R5bGV0YWdcclxuXHQgICAgc3R5bGVUYWcuaW5uZXJIVE1MID0gQ1NTO1xyXG5cdCAgICAvLyBnaXZlIGFuIGlkIHRvIHJlY29nbml6ZSB0aGUgc3R5bGUgdGFnXHJcblx0XHRzdHlsZVRhZy5zZXRBdHRyaWJ1dGUoJ2lkJywgaWQpO1xyXG5cdFx0Ly8gYXBwZW5kaW5nIHRoYXQgc3R5bGUgdGFnIHRvIHRoZSBET00gaGVhZCB0YWdcclxuXHRcdGhlYWQuYXBwZW5kQ2hpbGQoc3R5bGVUYWcpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQWRkcyBsaW5rZWQgc3R5bGUgdGFnIHdpdGggZ2l2ZW4gaWQgYW5kIHNyYyB0byB0aGUgRE9NLlxyXG5cdCAqIFxyXG5cdCAqIEBwYXJhbSBzdHJpbmcgfCBpZFxyXG5cdCAqIEBwYXJhbSBzdHJpbmcgfCBzb3VyY2VcclxuXHQgKiBAcmV0dXJuIHZvaWRcclxuXHQgKi9cclxuXHRzdGF0aWMgYWRkTGlua2VkU3R5bGUoaWQsIHNvdXJjZSkgXHJcblx0e1xyXG5cdFx0aWYgKHR5cGVvZiBzb3VyY2UgIT0gJ3N0cmluZycpIHtcclxuXHRcdFx0dGhyb3cgbmV3IEludmFsaWRBcmd1bWVudEV4Y2VwdGlvbiQxKCdET00uYWRkTGlua2VkU3R5bGUoKSBleGNwZWN0cyB0aGUgc2Vjb25kIHBhcmFtZXRlciB0byBiZSBzdHJpbmcsIGJ1dCAnICsgdHlwZW9mIHNvdXJjZSArICcgd2FzIHBhc3NlZCBpbnN0ZWFkLicpO1xyXG5cdFx0fVxyXG5cclxuXHRcdGxldCBoZWFkID0gZG9jdW1lbnQuaGVhZCB8fCBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnaGVhZCcpWzBdO1xyXG5cdFx0bGV0IGxpbmtlZFN0eWxlVGFnID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGluaycpO1xyXG5cclxuXHQgICAgLy8gZ2l2ZSBhbiBpZCB0byByZWNvZ25pemUgdGhlIHN0eWxlIHRhZ1xyXG5cdFx0bGlua2VkU3R5bGVUYWcuc2V0QXR0cmlidXRlKCdpZCcsIGlkKTtcclxuXHRcdGxpbmtlZFN0eWxlVGFnLnNldEF0dHJpYnV0ZSgnaHJlZicsIHNvdXJjZSk7XHJcblx0XHRsaW5rZWRTdHlsZVRhZy5zZXRBdHRyaWJ1dGUoJ3JlbCcsICdzdHlsZXNoZWV0Jyk7XHJcblx0XHRsaW5rZWRTdHlsZVRhZy5zZXRBdHRyaWJ1dGUoJ3R5cGUnLCAndGV4dC9jc3MnKTtcclxuXHRcdC8vIGFwcGVuZGluZyB0aGF0IHN0eWxlIHRhZyB0byB0aGUgRE9NIGhlYWQgdGFnXHJcblx0XHRoZWFkLmFwcGVuZENoaWxkKGxpbmtlZFN0eWxlVGFnKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIENyZWF0ZXMgYW4gZWxlbWVudCB3aXRoIHRoZSBnaXZlbiBvcHRpb25zLlxyXG5cdCAqIFxyXG5cdCAqIEBwYXJhbSBzdHJpbmcgfCBlbGVtZW50VHlwZVxyXG5cdCAqIEBwYXJhbSBvYmplY3QgfCBvcHRpb25zXHJcblx0ICogQHJldHVybiBIVE1MRWxlbWVudFxyXG5cdCAqL1xyXG5cdHN0YXRpYyBjcmVhdGVFbGVtZW50KGVsZW1lbnRUeXBlLCBvcHRpb25zKVxyXG5cdHtcclxuXHRcdGxldCBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChlbGVtZW50VHlwZSk7XHJcblx0XHJcblx0XHRpZiAob3B0aW9ucyA9PT0gdW5kZWZpbmVkKSB7XHJcblx0XHRcdHJldHVybiBlbGVtZW50O1xyXG5cdFx0fVxyXG5cclxuXHRcdGZvciAobGV0IG9wdGlvbiBpbiBvcHRpb25zKSB7XHJcblx0XHRcdGlmKG9wdGlvbiA9PSAndGV4dCcpIHtcclxuXHRcdFx0XHRlbGVtZW50LmlubmVySFRNTCA9IG9wdGlvbnNbb3B0aW9uXTtcclxuXHRcdFx0XHRjb250aW51ZTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0ZWxlbWVudC5zZXRBdHRyaWJ1dGUob3B0aW9uLCBvcHRpb25zW29wdGlvbl0pO1xyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiBlbGVtZW50O1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogVG9nZ2xlcyB0aGUgZ2l2ZW4gY2xhc3Nlcy5cclxuXHQgKiBcclxuXHQgKiBAcGFyYW0gb2JqZWN0IHwgZWxlbWVudFxyXG5cdCAqIEBwYXJhbSBzdHJpbmcgfCBjbGFzc05hbWVcclxuXHQgKiBAcmV0dXJuIGJvb2xcclxuXHQgKi9cclxuXHRzdGF0aWMgdG9nZ2xlQ2xhc3MoZWxlbWVudCwgY2xhc3NOYW1lLCBzZWNvbmRDbGFzc05hbWUpXHJcblx0e1xyXG5cdFx0aWYgKGVsZW1lbnQgPT0gbnVsbCB8fCB0eXBlb2YgZWxlbWVudCA9PSAndW5kZWZpbmVkJykge1xyXG5cdFx0XHR0aHJvdyBuZXcgSW52YWxpZEFyZ3VtZW50RXhjZXB0aW9uJDE7XHJcblx0XHR9XHJcblxyXG5cdFx0c2Vjb25kQ2xhc3NOYW1lID0gc2Vjb25kQ2xhc3NOYW1lIHx8IHVuZGVmaW5lZDtcclxuXHJcblx0XHRpZihzZWNvbmRDbGFzc05hbWUpIHtcclxuXHRcdFx0ZWxlbWVudC5jbGFzc0xpc3QudG9nZ2xlKHNlY29uZENsYXNzTmFtZSk7XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIGVsZW1lbnQuY2xhc3NMaXN0LnRvZ2dsZShjbGFzc05hbWUpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogRmluZHMgYW4gZWxlbWVudCBpbnNpZGUgb2YgcGFyZW50LlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIHN0cmluZyB8IHNlbGVjdG9yXHJcblx0ICogQHBhcmFtIG9iamVjdCB8IGNvbnRleHRcclxuXHQgKiBAcmV0dXJuIG1peGVkXHJcblx0ICovXHJcblx0c3RhdGljIGZpbmQoc2VsZWN0b3IsIGNvbnRleHQgPSB3aW5kb3cuZG9jdW1lbnQpIFxyXG5cdHtcclxuXHRcdHJldHVybiBxdWVyeUVsZW1lbnQoc2VsZWN0b3IsIGNvbnRleHQpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogSW5zZXJ0cyBhbiBlbGVtZW50IGFmdGVyIGFuIGVsZW1lbnQuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gSFRNTEVsZW1lbnQgfCBlbGVtZW50XHJcblx0ICogQHBhcmFtIEhUTUxFbGVtZW50IHwgY29udGV4dFxyXG5cdCAqIEByZXR1cm4gdm9pZFxyXG5cdCAqL1xyXG5cdHN0YXRpYyBpbnNlcnRBZnRlcihjb250ZXh0LCBlbGVtZW50KVxyXG5cdHtcclxuXHRcdGNvbnRleHQucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUoZWxlbWVudCwgY29udGV4dC5uZXh0U2libGluZyk7XHJcblx0fVxyXG59XHJcblxyXG4vKipcclxuICogUXVlcmllcyBhbiBlbGVtZW50IGZyb20gdGhlIERPTS5cclxuICpcclxuICogQHBhcmFtIHN0cmluZyB8IHNlbGVjdG9yXHJcbiAqIEBwYXJhbSBvYmplY3QgfCBwYXJlbnRFbGVtZW50XHJcbiAqIEByZXR1cm4gbWl4ZWRcclxuICovXHJcbmZ1bmN0aW9uIHF1ZXJ5RWxlbWVudChzZWxlY3RvciwgcGFyZW50RWxlbWVudCkgXHJcbntcclxuXHRpZiAodHlwZW9mIHNlbGVjdG9yICE9ICdzdHJpbmcnKSB7XHJcblx0XHR0aHJvdyBuZXcgSW52YWxpZEFyZ3VtZW50RXhjZXB0aW9uJDEoJ3F1ZXJ5RWxlbWVudCgpIGV4cGVjdHMgZmlyc3QgcGFyYW1ldGVyIHRvIGJlIGEgc3RyaW5nLCBidXQgJyArIHR5cGVvZiBzZWxlY3RvciArICcgd2FzIHBhc3NlZCBpbnN0ZWFkLicpO1xyXG5cdH1cclxuXHJcblx0aWYgKHBhcmVudEVsZW1lbnQgPT09IG51bGwpIHtcclxuXHRcdHRocm93IG5ldyBJbnZhbGlkQXJndW1lbnRFeGNlcHRpb24kMSgncXVlcnlFbGVtZW50KCkgZXhwZWN0cyBzZWNvbmQgcGFyYW1ldGVyIHRvIGJlIG9mIHR5cGUgSFRNTEVsZW1lbnQsIGJ1dCBudWxsIHdhcyBwYXNzZWQgaW5zdGVhZC4nKTtcclxuXHR9XHJcblxyXG5cdGxldCBlbGVtZW50ID0gcGFyZW50RWxlbWVudC5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9yKTtcclxuXHJcblx0aWYgKGVsZW1lbnQubGVuZ3RoID09IDApIHtcclxuXHRcdHJldHVybiBudWxsO1xyXG5cdH1cclxuXHJcblx0cmV0dXJuIChlbGVtZW50Lmxlbmd0aCA+IDEpID8gZWxlbWVudCA6IGVsZW1lbnRbMF07XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBDaGVja3MgaWYgcGFyZW50IGhhcyBjaGlsZC5cclxuICpcclxuICogQHBhcmFtIG9iamVjdCB8IHBhcmVudEVsZW1lbnRcclxuICogQHBhcmFtIG9iamVjdCB8IGNoaWxkRWxlbWVudFxyXG4gKiBAcmV0dXJuIGJvb2xcclxuICovXHJcbmZ1bmN0aW9uIGhhc0NoaWxkKHBhcmVudEVsZW1lbnQsIGNoaWxkRWxlbWVudCkgXHJcbntcclxuICAgICBsZXQgbm9kZSA9IGNoaWxkRWxlbWVudC5wYXJlbnROb2RlO1xyXG4gICAgIFxyXG4gICAgIHdoaWxlIChub2RlICE9IG51bGwpIHtcclxuICAgICAgICAgaWYgKG5vZGUgPT0gcGFyZW50RWxlbWVudCkge1xyXG4gICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgIH1cclxuICAgICAgICAgbm9kZSA9IG5vZGUucGFyZW50Tm9kZTtcclxuICAgICB9XHJcbiAgICAgXHJcbiAgICAgcmV0dXJuIGZhbHNlO1xyXG59XG5cbi8qKlxyXG4gKiBAZmlsZSBcclxuICogQ29tbW9uIGNsYXNzLlxyXG4gKlxyXG4gKiBBZGRzIHNvbWUgdXNlZnVsIGZ1bmN0aW9uYWxpdHkgZm9yXHJcbiAqIGNvbW1vbiB0YXNrcyAtIGRhdGEgY2hlY2tzIG9yIGRhdGEgbWFuaXB1bGF0aW9uLlxyXG4gKi9cclxuXHJcbmNsYXNzIENvbW1vblxyXG57XHJcblx0LyoqXHJcblx0ICogRXh0ZW5kIGFuIG9iamVjdC5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSBvYmplY3QgfCBjdXJyZW50T2JqZWN0XHJcblx0ICogQHBhcmFtIG9iamVjdCB8IG5ld09iamVjdFxyXG5cdCAqIEByZXR1cm4gb2JqZWN0XHJcblx0ICovXHJcblx0c3RhdGljIGV4dGVuZChjdXJyZW50T2JqZWN0LCBuZXdPYmplY3QpIHtcclxuXHRcdHZhciBleHRlbmRlZCA9IHt9O1xyXG5cdCAgICB2YXIgcHJvcDtcclxuXHJcblx0ICAgIGZvciAocHJvcCBpbiBjdXJyZW50T2JqZWN0KSB7XHJcblx0ICAgICAgICBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGN1cnJlbnRPYmplY3QsIHByb3ApKSB7XHJcblx0ICAgICAgICAgICAgZXh0ZW5kZWRbcHJvcF0gPSBjdXJyZW50T2JqZWN0W3Byb3BdO1xyXG5cdCAgICAgICAgfVxyXG5cdCAgICB9XHJcblxyXG5cdCAgICBmb3IgKHByb3AgaW4gbmV3T2JqZWN0KSB7XHJcblx0ICAgICAgICBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG5ld09iamVjdCwgcHJvcCkpIHtcclxuXHQgICAgICAgICAgICBleHRlbmRlZFtwcm9wXSA9IG5ld09iamVjdFtwcm9wXTtcclxuXHQgICAgICAgIH1cclxuXHQgICAgfVxyXG5cclxuXHQgICAgcmV0dXJuIGV4dGVuZGVkO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQ2hlY2tzIGZvciBhIG5lZWRsZSBpbiBoeXN0YWNrIGFycmF5LlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIG1peGVkIHwgbmVlZGxlXHJcblx0ICogQHBhcmFtIG9iamVjdCB8IG9iamVjdFxyXG5cdCAqIEByZXR1cm4gYm9vbFxyXG5cdCAqXHJcblx0ICovXHJcblx0c3RhdGljIGluX2FycmF5KG5lZWRsZSwgaHlzdGFjaykge1xyXG5cdFx0aWYoaHlzdGFjay5jb25zdHJ1Y3RvciAhPT0gQXJyYXkpIHtcclxuXHRcdFx0dGhyb3cgbmV3IEludmFsaWRBcmd1bWVudEV4Y2VwdGlvbiQxO1xyXG5cdFx0fVxyXG5cclxuXHRcdGZvcih2YXIgaSA9IDA7IGkgPD0gaHlzdGFjay5sZW5ndGg7IGkrKykge1xyXG5cdFx0XHRpZihuZWVkbGUgPT0gaHlzdGFja1tpXSkge1xyXG5cdFx0XHRcdHJldHVybiB0cnVlO1x0XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHRcclxuXHRcdHJldHVybiBmYWxzZTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFRha2VzIGFuIGFycmF5IGFuZCBjaHVua3MgaXQuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gYXJyYXkgfCB0b3RhbFxyXG5cdCAqIEBwYXJhbSBudW1iZXIgfCBjaHVua3NcclxuXHQgKiBAcmV0dXJuIGFycmF5XHJcblx0ICovXHJcblx0c3RhdGljIGFycmF5X2NodW5rKHRvdGFsLCBzaXplID0gNSlcclxuXHR7ICAgICAgICBcclxuICAgICAgXHRpZiAoaXNOYU4oc2l6ZSkpIHtcclxuICAgICAgXHRcdHRocm93IG5ldyBJbnZhbGlkQXJndW1lbnRFeGNlcHRpb24kMSgnQ29tbW9uLmFycmF5X2NodW5rKCkgZXhwZWN0cyB0aGUgc2Vjb25kIHBhcmFtZXRlciB0byBiZSBhIG51bWJlciwgYnV0ICcgKyB0eXBlb2Ygc2l6ZSArICcgcGFzc2VkIGluc3RlYWQuJylcclxuICAgICAgXHR9XHJcblxyXG4gICAgICBcdHNpemUgPSBwYXJzZUludChzaXplKTtcclxuICAgICAgIFxyXG4gICAgICAgXHRsZXQgaTtcclxuICAgICAgIFx0bGV0IGNvbGxlY3Rpb24gPSBbXTtcclxuXHJcbiAgICAgICAgLy8gYWRkIGVhY2ggY2h1bmsgdG8gdGhlIHJlc3VsdFxyXG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCBNYXRoLmNlaWwodG90YWwubGVuZ3RoIC8gc2l6ZSk7IGkrKykge1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgdmFyIHN0YXJ0ID0gaSAqIHNpemU7XHJcbiAgICAgICAgICAgIHZhciBlbmQgPSBzdGFydCArIHNpemU7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBjb2xsZWN0aW9uLnB1c2godG90YWwuc2xpY2Uoc3RhcnQsIGVuZCkpO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgcmV0dXJuIGNvbGxlY3Rpb247XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBDaGVja3MgaWYgYW4gb2JqZWN0IGlzIGVtcHR5LlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIG9iamVjdCB8IG9iamVjdFxyXG5cdCAqIEByZXR1cm4gYm9vbFxyXG5cdCAqL1xyXG5cdHN0YXRpYyBlbXB0eU9iamVjdChvYmplY3QpIHtcclxuXHRcdGZvciAobGV0IHByb3AgaW4gb2JqZWN0KSB7XHJcblx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gdHJ1ZTtcclxuXHR9XHJcblxyXG5cclxuXHQvKipcclxuXHQgKiBDaGVja3MgaWYgYSBnaXZlbiBvYmplY3QgY29udGFpbmVkIGluIGFuIGFycmF5LlxyXG5cdCAqIFxyXG5cdCAqIEBwYXJhbSBvYmplY3QgfCBvYmplY3RcclxuXHQgKiBAcGFyYW0gYXJyYXkgfCBoYXlzdGFja1xyXG5cdCAqIEByZXR1cm4gYm9vbFxyXG5cdCAqL1xyXG5cdHN0YXRpYyBjb250YWluc09iamVjdChvYmplY3QsIGh5c3RhY2spIFxyXG5cdHtcclxuXHQgICAgbGV0IGk7XHJcblxyXG5cdCAgICBmb3IgKGkgPSAwOyBpIDwgaHlzdGFjay5sZW5ndGg7IGkrKykge1xyXG5cdCAgICAgICAgaWYgKHR5cGVvZiBvYmplY3QgPT0gJ3N0cmluZycgJiYgaHlzdGFja1tpXS5jb25zdHJ1Y3Rvci5uYW1lID09PSBvYmplY3QpIHtcclxuXHQgICAgICAgIFx0cmV0dXJuIHRydWU7XHJcblx0ICAgICAgICB9XHJcblxyXG5cdCAgICAgICAgaWYgKGh5c3RhY2tbaV0gPT09IG9iamVjdCkge1xyXG5cdCAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG5cdCAgICAgICAgfVxyXG5cdCAgICB9XHJcblxyXG5cdCAgICByZXR1cm4gZmFsc2U7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBDaGVja3MgaWYgYSBnaXZlbiBwYXJhbWV0ZXIgaXMgYW4gb2JqZWN0LlxyXG5cdCAqIFxyXG5cdCAqIEBwYXJhbSBvYmplY3QgfCBvYmplY3RcclxuXHQgKiBAcmV0dXJuIGJvb2xcclxuXHQgKi9cclxuXHRzdGF0aWMgaXNPYmplY3Qob2JqZWN0KSBcclxuXHR7XHJcblx0XHRyZXR1cm4gdHlwZW9mIG9iamVjdCA9PSAnb2JqZWN0JztcclxuXHR9XHJcbn1cblxubGV0IGRlZmF1bHRNZXNzYWdlJDEgPSAnVGhlIGRhdGEgc3RydWN0dXJlIGlzIGludmFsaWQnO1xyXG5cclxuY2xhc3MgSW52YWxpZERhdGFTdHJ1Y3R1cmVFeGNlcHRpb24gZXh0ZW5kcyBFeGNlcHRpb25IYW5kbGVyXHJcbntcclxuXHRjb25zdHJ1Y3RvcihtZXNzYWdlID0gbnVsbCkgXHJcblx0e1xyXG5cdFx0bWVzc2FnZSA9IG1lc3NhZ2UgfHwgZGVmYXVsdE1lc3NhZ2UkMTtcclxuXHRcdHN1cGVyKG1lc3NhZ2UpO1xyXG4gICAgXHRzdXBlci5zdGFja1RyYWNlKHRoaXMsIG1lc3NhZ2UpO1xyXG4gICAgfVxyXG59XG5cbi8qKlxyXG4gKiBAZmlsZSBcclxuICogUmVxdWVzdCBjbGFzcy5cclxuICpcclxuICogSGFuZGxlcyBhamF4IHJlcXVlc3RzIFBPU1QsIEdFVCBldGMuLi5cclxuICovXHJcblxyXG4vKipcclxuICogU3RvcmVzIHRoZSBkZWZhdWx0IHNldHRpbmdzLlxyXG4gKlxyXG4gKiBAdmFyIG9iamVjdFxyXG4gKi9cclxuXHJcbmxldCBkZWZhdWx0U2V0dGluZ3MgPSB7XHJcblx0aGVhZGVyczoge1xyXG5cdFx0J0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJ1xyXG5cdH0sXHJcblx0YXN5bmM6IHRydWVcclxufTtcclxuXHJcbmNsYXNzIFJlcXVlc3Rcclxue1xyXG5cdC8qKlxyXG5cdCAqIC0gSW5pdGlhbGl6ZSB0aGUgc2V0dGluZ3Mgb2JqZWN0LlxyXG5cdCAqIC0gSW5pdGlhbGl6ZSB0aGUgeGhyIG9iamVjdC5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSBvYmplY3QgfCBzZXR0aW5nc1xyXG5cdCAqIEByZXR1cm4gdm9pZFxyXG5cdCAqL1xyXG5cdGNvbnN0cnVjdG9yKHNldHRpbmdzKVxyXG5cdHtcclxuXHRcdHRoaXMuc2V0dGluZ3MgPSBDb21tb24uZXh0ZW5kKGRlZmF1bHRTZXR0aW5ncywgc2V0dGluZ3MpO1xyXG5cdFx0dGhpcy5zZXREZWZhdWx0UmVxdWVzdEhlYWRlcigpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogU2V0cyB0aGUgZGVmYXVsdCByZXF1ZXN0IGhlYWRlcnMuXHJcblx0ICpcclxuXHQgKiBAcmV0dXJuIHZvaWRcclxuXHQgKi9cclxuXHRzZXREZWZhdWx0UmVxdWVzdEhlYWRlcigpXHJcblx0e1xyXG5cdFx0bGV0IGhlYWRlcjtcclxuXHRcdGxldCBoZWFkZXJzID0gdGhpcy5zZXR0aW5ncy5oZWFkZXJzO1xyXG5cdFx0bGV0IGFzeW5jID0gdGhpcy5zZXR0aW5ncy5hc3luYztcclxuXHRcdGxldCBvcGVuID0gWE1MSHR0cFJlcXVlc3QucHJvdG90eXBlLm9wZW47XHJcblx0XHRsZXQgc2V0UmVxdWVzdEhlYWRlciA9IFhNTEh0dHBSZXF1ZXN0LnByb3RvdHlwZS5zZXRSZXF1ZXN0SGVhZGVyO1xyXG5cclxuXHRcdFhNTEh0dHBSZXF1ZXN0LnByb3RvdHlwZS5vcGVuID0gZnVuY3Rpb24oKSB7XHJcblx0XHRcdHZhciByZXNwb25zZSA9IG9wZW4uYXBwbHkodGhpcywgYXJndW1lbnRzLCBhc3luYyk7XHJcblxyXG5cdFx0XHRmb3IgKGhlYWRlciBpbiBoZWFkZXJzKSB7XHJcblx0XHRcdFx0dGhpcy5zZXRSZXF1ZXN0SGVhZGVyKGhlYWRlciwgaGVhZGVyc1toZWFkZXJdKTtcclxuXHRcdFx0fVxyXG5cclxuXHQgIFx0XHRyZXR1cm4gcmVzcG9uc2U7XHJcblx0XHR9O1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogTWFrZXMgYSBQT1NUIHJlcXVlc3QuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gb2JqZWN0IHwgb3B0aW9uc1xyXG5cdCAqIEByZXR1cm4gUHJvbWlzZVxyXG5cdCAqL1xyXG5cdHBvc3Qob3B0aW9ucylcclxuXHR7XHJcblx0XHRsZXQgeGhyID0gdGhpcy54aHI7XHJcblxyXG5cdFx0aWYob3B0aW9ucy5oYXNPd25Qcm9wZXJ0eSgnYmVmb3JlJykgJiYgdHlwZW9mIG9wdGlvbnMuYmVmb3JlID09ICdmdW5jdGlvbicpIHtcclxuXHRcdFx0b3B0aW9ucy5iZWZvcmUuY2FsbCh0aGlzKTtcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XHJcblx0XHRcdGlmKHR5cGVvZiBvcHRpb25zICE9PSAnb2JqZWN0Jykge1xyXG5cdFx0XHRcdHRocm93IG5ldyBFcnJvcignZ2V0IGV4cGVjdGluZyBhIGpzb24gb2JqZWN0IHRvIGJlIHBhc3NlZCBhcyBhbiBhcmd1bWVudCwgYnV0ICcrIHR5cGVvZiBvcHRpb25zICsgJyB3YXMgcGFzc2VkLicpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRvcHRpb25zLmRhdGEgPSBvcHRpb25zLmRhdGEgfHwge307XHJcblxyXG5cdFx0XHRpZih0eXBlb2Ygb3B0aW9ucy5kYXRhICE9PSAnb2JqZWN0Jykge1xyXG5cdFx0XHRcdHRocm93IG5ldyBFcnJvcignZGF0YSBwcm9wZXJ0eSBleHBlY3RpbmcgYSBqc29uIG9iamVjdCB0byBiZSBwYXNzZWQgYXMgYW4gYXJndW1lbnQsIGJ1dCAnICsgdHlwZW9mIG9wdGlvbnMuZGF0YSArICcgd2FzIHBhc3NlZC4nKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0eGhyLm9wZW4oJ1BPU1QnLCBvcHRpb25zLnVybCwgdHJ1ZSk7XHJcblxyXG5cdFx0XHR4aHIucmVzcG9uc2VUeXBlID0gb3B0aW9ucy5kYXRhVHlwZSB8fCAnanNvbic7XHJcblx0XHRcdHhoci50aW1lb3V0ID0gb3B0aW9ucy50aW1lb3V0IHx8IDMwMDA7XHJcblxyXG5cdFx0XHR4aHIub25yZWFkeXN0YXRlY2hhbmdlID0gZnVuY3Rpb24oKSB7XHJcblx0XHRcdCAgICBpZih0aGlzLnJlYWR5U3RhdGUgIT0gNCB8fCB0aGlzLnN0YXR1cyAhPSAyMDApIHtcclxuXHRcdFx0ICAgIFx0cmV0dXJuO1xyXG5cdFx0XHQgICAgfVxyXG5cdCAgICAgICBcdFxyXG4gICAgICAgXHRcdFx0cmVzb2x2ZSh0aGlzLnJlc3BvbnNlKTtcclxuICAgICAgIFx0XHRcdFxyXG4gICAgICAgXHRcdFx0aWYob3B0aW9ucy5oYXNPd25Qcm9wZXJ0eSgnYWZ0ZXInKSAmJiB0eXBlb2Ygb3B0aW9ucy5hZnRlciA9PSAnZnVuY3Rpb24nKSB7XHJcblx0XHRcdFx0XHRvcHRpb25zLmFmdGVyLmNhbGwodGhpcyk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9O1xyXG5cclxuXHRcdFx0eGhyLm9uZXJyb3IgPSBmdW5jdGlvbihtZXNzYWdlKSB7XHJcblx0XHRcdFx0aWYob3B0aW9ucy5oYXNPd25Qcm9wZXJ0eSgnZXJyb3InKSAmJiB0eXBlb2Ygb3B0aW9ucy5lcnJvciA9PSAnZnVuY3Rpb24nKSB7XHJcblx0XHRcdFx0XHRvcHRpb25zLmVycm9yKG1lc3NhZ2UpO1xyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0cmVqZWN0KG1lc3NhZ2UpO1xyXG5cdFx0XHR9O1xyXG5cclxuXHRcdFx0aWYoISBvcHRpb25zLmRhdGEpIHtcclxuXHRcdFx0XHR4aHIuc2VuZChudWxsKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0dmFyIHF1ZXJ5U3RyaW5nID0gT2JqZWN0LmtleXMob3B0aW9ucy5kYXRhKS5tYXAoZnVuY3Rpb24oa2V5KSB7XHJcblx0XHQgICAgICAgICAgICByZXR1cm4gZW5jb2RlVVJJQ29tcG9uZW50KGtleSkgKyAnPScgK1xyXG5cdFx0ICAgICAgICAgICAgICAgIFx0ZW5jb2RlVVJJQ29tcG9uZW50KG9wdGlvbnMuZGF0YVtrZXldKTtcclxuXHRcdCAgICAgICAgXHR9KS5qb2luKCcmJyk7XHJcblxyXG5cdFx0XHR4aHIuc2VuZChxdWVyeVN0cmluZyk7XHJcblx0XHR9KTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIE1ha2VzIGEgR0VUIGFqYXggcmVxdWVzdC5cclxuXHQgKiBcclxuXHQgKiBAcGFyYW0gb2JqZWN0IHwgb3B0aW9uc1xyXG5cdCAqIEByZXR1cm4gUHJvbWlzZVxyXG5cdCAqL1xyXG5cdGdldChvcHRpb25zKVxyXG5cdHtcclxuXHRcdGxldCB4aHIgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKSB8fCBuZXcgQWN0aXZlWE9iamVjdChcIk1pY3Jvc29mdC5YTUxIVFRQXCIpO1x0XHRcdFxyXG5cclxuXHRcdGlmKG9wdGlvbnMuaGFzT3duUHJvcGVydHkoJ2JlZm9yZScpICYmIHR5cGVvZiBvcHRpb25zLmJlZm9yZSA9PSAnZnVuY3Rpb24nKSB7XHJcblx0XHRcdG9wdGlvbnMuYmVmb3JlLmNhbGwodGhpcyk7XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xyXG5cdFx0XHRpZih0eXBlb2Ygb3B0aW9ucyAhPT0gJ29iamVjdCcpIHtcclxuXHRcdFx0XHR0aHJvdyBuZXcgRXJyb3IoJ2dldCBleHBlY3RpbmcgYSBqc29uIG9iamVjdCB0byBiZSBwYXNzZWQgYXMgYW4gYXJndW1lbnQsIGJ1dCAnKyB0eXBlb2Ygb3B0aW9ucyArICcgd2FzIHBhc3NlZC4nKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0b3B0aW9ucy5kYXRhID0gb3B0aW9ucy5kYXRhIHx8IHt9O1xyXG5cclxuXHRcdFx0aWYodHlwZW9mIG9wdGlvbnMuZGF0YSAhPT0gJ29iamVjdCcpIHtcclxuXHRcdFx0XHR0aHJvdyBuZXcgRXJyb3IoJ2RhdGEgcHJvcGVydHkgZXhwZWN0aW5nIGEganNvbiBvYmplY3QgdG8gYmUgcGFzc2VkIGFzIGFuIGFyZ3VtZW50LCBidXQgJyArIHR5cGVvZiBvcHRpb25zLmRhdGEgKyAnIHdhcyBwYXNzZWQuJyk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHhoci5vcGVuKCdHRVQnLCBvcHRpb25zLnVybCwgdHJ1ZSk7XHJcblxyXG5cdFx0XHR4aHIucmVzcG9uc2VUeXBlID0gb3B0aW9ucy5kYXRhVHlwZSB8fCAnanNvbic7XHJcblx0XHRcdHhoci50aW1lb3V0ID0gb3B0aW9ucy50aW1lb3V0IHx8IDMwMDA7XHJcblxyXG5cdFx0XHRpZiAoeGhyLnJlc3BvbnNlVHlwZSA9PSAnanNvbicpIHtcclxuXHRcdFx0XHR4aHIuc2V0UmVxdWVzdEhlYWRlcignQ29udGVudC1UeXBlJywgJ2FwcGxpY2F0aW9uL2pzb24nKTtcclxuXHRcdFx0XHR4aHIuc2V0UmVxdWVzdEhlYWRlcignQWNjZXB0JywgJ2FwcGxpY2F0aW9uL2pzb24nKTtcclxuXHRcdFx0fVxyXG5cdFx0XHRcclxuXHRcdFx0eGhyLm9ucmVhZHlzdGF0ZWNoYW5nZSA9IGZ1bmN0aW9uKCkge1xyXG5cdFx0XHQgICAgaWYodGhpcy5yZWFkeVN0YXRlICE9IDQgfHwgdGhpcy5zdGF0dXMgIT0gMjAwKSB7XHJcblx0XHRcdCAgICBcdHJldHVybjtcclxuXHRcdFx0ICAgIH1cclxuXHJcblx0XHRcdCAgICBsZXQgcmVzcG9uc2UgPSB0aGlzLnJlc3BvbnNlIHx8IHRoaXMucmVzcG9uc2VUZXh0OyBcclxuXHRcdFx0ICAgIHJlc3BvbnNlID0gKHhoci5yZXNwb25zZVR5cGUgPT0gJ2pzb24nICYmIHR5cGVvZiByZXNwb25zZSAhPSAnb2JqZWN0JykgPyBKU09OLnBhcnNlKHJlc3BvbnNlKSA6IHJlc3BvbnNlO1xyXG5cdFx0XHQgICAgcmVzb2x2ZShyZXNwb25zZSk7XHRcclxuICAgICAgIFx0XHRcdFxyXG4gICAgICAgXHRcdFx0aWYob3B0aW9ucy5oYXNPd25Qcm9wZXJ0eSgnYWZ0ZXInKSAmJiB0eXBlb2Ygb3B0aW9ucy5hZnRlciA9PSAnZnVuY3Rpb24nKSB7XHJcblx0XHRcdFx0XHRvcHRpb25zLmFmdGVyLmNhbGwodGhpcyk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9O1xyXG5cclxuXHRcdFx0eGhyLm9uZXJyb3IgPSBmdW5jdGlvbihtZXNzYWdlKSB7XHJcblx0XHRcdFx0aWYob3B0aW9ucy5oYXNPd25Qcm9wZXJ0eSgnZXJyb3InKSAmJiB0eXBlb2Ygb3B0aW9ucy5lcnJvciA9PSAnZnVuY3Rpb24nKSB7XHJcblx0XHRcdFx0XHRvcHRpb25zLmVycm9yKG1lc3NhZ2UpO1xyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0cmVqZWN0KG1lc3NhZ2UpO1xyXG5cdFx0XHR9O1xyXG5cclxuXHRcdFx0aWYoISBvcHRpb25zLmRhdGEpIHtcclxuXHRcdFx0XHR4aHIuc2VuZChudWxsKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0dmFyIHF1ZXJ5U3RyaW5nID0gT2JqZWN0LmtleXMob3B0aW9ucy5kYXRhKS5tYXAoZnVuY3Rpb24oa2V5KSB7XHJcblx0XHQgICAgICAgICAgICByZXR1cm4gZW5jb2RlVVJJQ29tcG9uZW50KGtleSkgKyAnPScgK1xyXG5cdFx0ICAgICAgICAgICAgICAgIFx0ZW5jb2RlVVJJQ29tcG9uZW50KG9wdGlvbnMuZGF0YVtrZXldKTtcclxuXHRcdCAgICAgICAgXHR9KS5qb2luKCcmJyk7XHJcblxyXG5cdFx0XHR4aHIuc2VuZChxdWVyeVN0cmluZyk7XHJcblx0XHR9KTtcclxuXHR9XHJcbn1cblxubGV0IGRlZmF1bHRNZXNzYWdlJDIgPSAndHJ5aW5nIHRvIGJpbmQgYW4gYWxyZWFkeSBleGlzdGluZyBib3VuZC4nO1xyXG5cclxuY2xhc3MgSW52YWxpZEJpbmRpbmdFeGNlcHRpb24gZXh0ZW5kcyBFeGNlcHRpb25IYW5kbGVyXHJcbntcclxuXHRjb25zdHJ1Y3RvcihtZXNzYWdlID0gbnVsbCkgXHJcblx0e1xyXG5cdFx0bWVzc2FnZSA9IG1lc3NhZ2UgfHwgZGVmYXVsdE1lc3NhZ2UkMjtcclxuXHRcdHN1cGVyKG1lc3NhZ2UpO1xyXG4gICAgXHRzdXBlci5zdGFja1RyYWNlKHRoaXMsIG1lc3NhZ2UpO1xyXG4gICAgfVxyXG59XG5cbi8qKlxyXG4gKiBAZmlsZSBcclxuICogQ29udGFpbmVyIGNsYXNzLlxyXG4gKlxyXG4gKiBIYW5kbGVzL0NvbnRyb2xzIHRoZSBkZXBlbmRlbmNpZXMgb2YgZWNvbW1lcmNlLlxyXG4gKi9cclxuXHJcbi8qKlxyXG4gKiBTdG9yZXMgdGhlIGluc3RhbmNlc1xyXG4gKlxyXG4gKiBAdmFyIGFycmF5XHJcbiAqL1xyXG5sZXQgaW5zdGFuY2VzID0gW107XHJcblxyXG5jbGFzcyBDb250YWluZXIgXHJcbntcclxuXHQvKipcclxuXHQgKiBCaW5kcyBrZXkgdG8gY29uY3JldGUgY2xhc3MuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gc3RyaW5nIHwga2V5XHJcblx0ICogQHBhcmFtIGNsYXNzIHwgY29uY3JldGVcclxuXHQgKiBAcmV0dXJuIHZvaWRcclxuXHQgKi9cclxuXHRiaW5kKGtleSwgY29uY3JldGUpIFxyXG5cdHtcclxuXHRcdGlmICh0eXBlb2Yga2V5ICE9ICdzdHJpbmcnKSB7XHJcblx0XHRcdHRocm93IG5ldyBJbnZhbGlkQXJndW1lbnRFeGNlcHRpb24kMSgnYmluZCgpIGV4cGVjdHMgdGhlIGZpcnN0IHBhcmFtZXRlciB0byBiZSBzdHJpbmcsIGJ1dCAnICsgdHlwZW9mIGtleSArICcgd2FzIHBhc3NlZCBpbnN0ZWFkLicpO1xyXG5cdFx0fVxyXG5cclxuXHRcdGlmICh0eXBlb2YgY29uY3JldGUgIT0gJ2Z1bmN0aW9uJykgeyBcclxuXHRcdFx0dGhyb3cgbmV3IEludmFsaWRBcmd1bWVudEV4Y2VwdGlvbiQxKCdiaW5kKCkgZXhwZWN0cyB0aGUgc2Vjb25kIHBhcmFtZXRlciB0byBiZSBhIGZ1bmN0aW9uLCBidXQgJyArIHR5cGVvZiBjb25jcmV0ZSArICcgd2FzIHBhc3NlZCBpbnN0ZWFkLicpO1xyXG5cdFx0fVxyXG5cclxuXHRcdGlmICh0eXBlb2YgdGhpc1trZXldICE9ICd1bmRlZmluZWQnKSB7XHJcblx0XHRcdHRocm93IG5ldyBJbnZhbGlkQmluZGluZ0V4Y2VwdGlvbignYmluZCgpIHJlY2lldmVkIGFuIGFscmVhZHkgZXhpc3RpbmcgYmluZC4nKTtcclxuXHRcdH1cclxuXHJcblx0XHR0aGlzW2tleV0gPSBjb25jcmV0ZS5iaW5kKGNvbmNyZXRlLCB0aGlzKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFNldHMgYW4gaW5zdGFuY2UuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gc3RyaW5nIHwga2V5XHJcblx0ICogQHBhcmFtIG9iamVjdCB8IGluc3RhbmNlXHJcblx0ICogQHBhcmFtIHN0cmluZyB8IGFsaWFzXHJcblx0ICogQHJldHVybiB2b2lkXHJcblx0ICovXHJcblx0c2V0SW5zdGFuY2Uoa2V5LCBpbnN0YW5jZSwgYWxpYXMgPSBudWxsKSBcclxuXHR7XHJcblx0XHRpZiAodHlwZW9mIGtleSAhPSAnc3RyaW5nJykge1xyXG5cdFx0XHR0aHJvdyBuZXcgSW52YWxpZEFyZ3VtZW50RXhjZXB0aW9uJDEoJ3NldEluc3RhY2UoKSBleHBlY3RzIHRoZSBmaXJzdCBwYXJhbWV0ZXIgdG8gYmUgYSBzdHJpbmcsIGJ1dCAnICsgdHlwZW9mIGtleSArICcgd2FzIHBhc3NlZCBpbnN0ZWFkLicpO1xyXG5cdFx0fVxyXG5cclxuXHRcdGlmICh0eXBlb2YgaW5zdGFuY2UgIT0gJ29iamVjdCcpIHtcclxuXHRcdFx0dGhyb3cgbmV3IEludmFsaWRBcmd1bWVudEV4Y2VwdGlvbiQxKCdzZXRJbnN0YW5jZSgpIGV4cGVjdHMgdGhlIHNlY29uZCBwYXJhbWV0ZXIgdG8gYmUgYW4gb2JqZWN0LCBidXQgJyArIHR5cGVvZiBpbnN0YW5jZSArICcgd2FzIHBhc3NlZCBpbnN0ZWFkLicpO1xyXG5cdFx0fVxyXG5cclxuXHRcdGluc3RhbmNlc1trZXldID0gaW5zdGFuY2U7XHJcblx0XHRpbnN0YW5jZXNbYWxpYXNdID0gaW5zdGFuY2U7XHJcblx0XHR0aGlzW2tleV0gPSBpbnN0YW5jZTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFJlc29sdmVzIGFuIGluc3RhbmNlIG91dCBvZiBcclxuXHQgKiB0aGUgaW9jIGNvbnRhaW5lci5cclxuXHQgKiBcclxuXHQgKiBAcGFyYW0gc3RyaW5nIHwga2V5XHJcblx0ICogQHJldHVybiBvYmplY3RcclxuXHQgKi9cclxuXHRnZXRJbnN0YW5jZShrZXkpIFxyXG5cdHtcclxuXHRcdGlmKHR5cGVvZiBrZXkgIT0gJ3N0cmluZycpIHtcclxuXHRcdFx0dGhyb3cgbmV3IEludmFsaWRBcmd1bWVudEV4Y2VwdGlvbiQxKCdnZXRJbnN0YWNlKCkgZXhwZWN0cyB0aGUgZmlyc3QgcGFyYW1ldGVyIHRvIGJlIGEgc3RyaW5nLCBidXQgJyArIHR5cGVvZiBrZXkgKyAnIHdhcyBwYXNzZWQgaW5zdGVhZC4nKTtcclxuXHRcdH1cclxuXHJcblx0XHRpZih0eXBlb2Yga2V5ID09ICdvYmplY3QnKSB7XHJcblx0XHRcdHJldHVybiBpbnN0YW5jZXNba2V5LmNvbnN0cnVjdG9yLm5hbWVdIHx8IG51bGw7XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIGluc3RhbmNlc1trZXldIHx8IG51bGw7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBDaGVja3MgaWYgYW4gaW5zdGFuY2UgZXhpc3QuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gbWl4ZWQgfCBpbnN0YW5jZVxyXG5cdCAqIEByZXR1cm4gYm9vbFxyXG5cdCAqL1xyXG5cdGluc3RhbmNlRXhpc3QoaW5zdGFuY2UpIFxyXG5cdHtcclxuXHRcdGlmICh0eXBlb2YgaW5zdGFuY2UgPT0gJ29iamVjdCcpIHtcclxuXHRcdFx0cmV0dXJuICh0eXBlb2YgaW5zdGFuY2VzW2luc3RhbmNlLmNvbnN0cnVjdG9yLm5hbWVdICE9PSAndW5kZWZpbmVkJyk7XHJcblx0XHR9IGVsc2UgaWYgKHR5cGVvZiBpbnN0YW5jZSA9PSAnc3RyaW5nJykge1xyXG5cdFx0XHRyZXR1cm4gKHR5cGVvZiBpbnN0YW5jZXNbaW5zdGFuY2VdICE9PSAndW5kZWZpbmVkJylcclxuXHRcdH1cclxuXHRcdFxyXG5cdFx0dGhyb3cgbmV3IEludmFsaWRBcmd1bWVudEV4Y2VwdGlvbiQxKCdpbnN0YW5jZUV4aXN0KCkgZXhwZWN0cyB0aGUgZmlyc3QgcGFyYW1ldGVyIHRvIGJlIHN0cmluZyBvciBhbiBvYmplY3QsIGJ1dCAnICsgdHlwZW9mIGluc3RhbmNlICsgJyB3YXMgcGFzc2VkIGluc3RlYWQuJyk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBSZXRyaWV2ZSBhbiBvYmplY3QsIGlmIG5vdCBleGlzdHNcclxuXHQgKiB3aWxsIGNyZWF0ZSBpdCwgc2V0IGl0IGluIHRoZSBpb2MgY29udGFpbmVyXHJcblx0ICogZm9yIGxhdGVyIHVzZSBhbmQgcmV0cmlldmUgaXQuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gbWl4ZWQgfCBvYmplY3QgXHJcblx0ICogQHJldHVybiBvYmplY3RcclxuXHQgKi9cclxuXHRtYWtlKG9iamVjdClcclxuXHR7XHJcblx0XHRsZXQgaW5zdGFuY2UgPSB7fTtcclxuXHRcdGxldCBrZXk7XHJcblx0XHRcclxuXHRcdGlmICh0aGlzLmluc3RhbmNlRXhpc3Qob2JqZWN0KSkge1xyXG5cdFx0XHRyZXR1cm4gdGhpcy5nZXRJbnN0YW5jZShvYmplY3QpO1xyXG5cdFx0fVxyXG5cclxuXHRcdGlmICh0eXBlb2Ygb2JqZWN0ID09ICdvYmplY3QnKSB7XHJcblx0XHRcdGluc3RhbmNlID0gb2JqZWN0O1xyXG5cdFx0XHRrZXkgPSBvYmplY3QuY29uc3RydWN0b3IubmFtZTtcclxuXHRcdFx0dGhpcy5zZXRJbnN0YW5jZShrZXksIGluc3RhbmNlKTsgXHJcblx0XHR9IGVsc2UgaWYodHlwZW9mIG9iamVjdCA9PSAnc3RyaW5nJyAmJiB0aGlzLmhhc093blByb3BlcnR5KG9iamVjdCkpIHtcclxuXHRcdFx0aW5zdGFuY2UgPSBuZXcgdGhpc1tvYmplY3RdO1xyXG5cdFx0XHRrZXkgPSBvYmplY3Q7XHJcblx0XHRcdHRoaXMuc2V0SW5zdGFuY2Uoa2V5LCBpbnN0YW5jZSk7XHRcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdHRocm93IG5ldyBJbnZhbGlkQmluZGluZ0V4Y2VwdGlvbignVGhlIHBhcmFtZXRlciB5b3UgcGFzc2VkIGNvdWxkIG5vdCBiZSBib3VuZGVkIHRvIHRoZSBjb250YWluZXIsIHBhcmFtZXRlcjogJyArIHR5cGVvZiBvYmplY3QpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiBpbnN0YW5jZTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFJlbW92ZSBhbGwgZXhpc3RpbmcgaW5zdGFuY2VzLlxyXG5cdCAqXHJcblx0ICogQHJldHVybiB2b2lkIFxyXG5cdCAqL1xyXG5cdGZsdXNoKClcclxuXHR7XHJcblx0XHRpbnN0YW5jZXMgPSBbXTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFJldHJpZXZlIGFsbCBpbnN0YW5jZXMuXHJcblx0ICpcclxuXHQgKiBAcmV0dXJuIGFycmF5XHJcblx0ICovXHJcblx0aW5zdGFuY2VzKCkgXHJcblx0e1xyXG5cdFx0cmV0dXJuIGluc3RhbmNlcztcclxuXHR9XHJcbn1cblxubGV0IGRlZmF1bHRNZXNzYWdlJDMgPSAnVGhlIGV2ZW50IHlvdSBjYWxsZWQgZG9lcyBub3QgZXhpc3RzIG9yIHlvdSBzdXBwbGllZCB3cm9uZyBhcmd1bWVudCc7XHJcblxyXG5jbGFzcyBCYWRFdmVudENhbGxFeGNlcHRpb24gZXh0ZW5kcyBFeGNlcHRpb25IYW5kbGVyXHJcbntcclxuXHRjb25zdHJ1Y3RvcihtZXNzYWdlID0gbnVsbCkgXHJcblx0e1xyXG5cdFx0bWVzc2FnZSA9IG1lc3NhZ2UgfHwgZGVmYXVsdE1lc3NhZ2UkMztcclxuXHRcdHN1cGVyKG1lc3NhZ2UpO1xyXG4gICAgXHRzdXBlci5zdGFja1RyYWNlKHRoaXMsIG1lc3NhZ2UpO1xyXG4gICAgfVxyXG59XG5cbi8qKlxyXG4gKiBAZmlsZSBcclxuICogRXZlbnRNYW5hZ2VyIGNsYXNzLlxyXG4gKlxyXG4gKiBIYW5kbGVzIHN1YnNjcmlwaW9ucyBhbmQgcHVibGlzaGluZyBvZiBldmVudHMuXHJcbiAqL1xyXG5cclxuY2xhc3MgRXZlbnRNYW5hZ2VyXHJcbntcclxuXHQvKipcclxuXHQgKiBTdG9yZXMgdGhlIGV2ZW50cyBjYWxsYmFja3MuXHJcblx0ICogXHJcblx0ICogQHZhciBhcnJheVxyXG5cdCAqL1xyXG5cdGNvbnN0cnVjdG9yKClcclxuXHR7XHJcblx0XHR0aGlzLmV2ZW50cyA9IHt9O1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogU3Vic2NyaWJpbmcgdG8gYW4gZXZlbnQuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gc3RyaW5nIHwgbmFtZVxyXG5cdCAqIEBwYXJhbSBmdW5jdGlvbiB8IGNhbGxiYWNrXHJcblx0ICogQHJldHVybiB2b2lkXHJcblx0ICovXHJcblx0c3Vic2NyaWJlKG5hbWUsIGNhbGxiYWNrKSBcclxuXHR7XHJcblx0XHRpZiAodHlwZW9mIGNhbGxiYWNrICE9PSAnZnVuY3Rpb24nKSB7XHJcblx0XHRcdHRocm93IG5ldyBJbnZhbGlkQXJndW1lbnRFeGNlcHRpb247XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKHR5cGVvZiB0aGlzLmV2ZW50c1tuYW1lXSA9PSAndW5kZWZpbmVkJykge1xyXG5cdFx0XHR0aGlzLmV2ZW50c1tuYW1lXSA9IFtdO1xyXG5cdFx0fVxyXG5cclxuXHRcdHRoaXMuZXZlbnRzW25hbWVdLnB1c2goY2FsbGJhY2spO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogUHVibGlzaCBhbiBldmVudCB0byBhbGwgc3Vic2NyaWJlcnMuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gc3RyaW5nIHwgbmFtZVxyXG5cdCAqIEBwYXJhbSBsaXN0IHwgZGF0YVxyXG5cdCAqIEByZXR1cm4gdm9pZFxyXG5cdCAqL1xyXG5cdHB1Ymxpc2gobmFtZSwgLi4uZGF0YSkgXHJcblx0e1xyXG5cdFx0ZGF0YSA9IGRhdGEgfHwgbnVsbDtcclxuXHJcblx0XHQvLyBJZiB0aGVyZSBhcmUgbm8gc3Vic2NyaWJlcnMgc2ltcGx5IGlnbm9yZSB0aGF0IGV2ZW50LlxyXG5cdFx0aWYgKHR5cGVvZiB0aGlzLmV2ZW50c1tuYW1lXSA9PSAndW5kZWZpbmVkJykge1xyXG5cdFx0XHRyZXR1cm47XHJcblx0XHR9XHJcblxyXG5cdFx0dGhpcy5ldmVudHNbbmFtZV0uZm9yRWFjaChmdW5jdGlvbihjYWxsYmFjaykge1xyXG5cdFx0XHRpZih0eXBlb2YgY2FsbGJhY2sgIT0gJ2Z1bmN0aW9uJykge1xyXG5cdFx0XHRcdHRocm93IG5ldyBJbnZhbGlkQXJndW1lbnRFeGNlcHRpb24oJ3N1YnNjcmliZSgpIHNob3VsZCByZWNpZXZlIGNhbGxiYWNrIGFzIHNlY29uZCBwYXJhbWV0ZXIsIGJ1dCAnKyB0eXBlb2YgY2FsbGJhY2sgKycgd2FzIHBhc3NlZCcpO1xyXG5cdFx0XHR9XHJcblx0XHRcdFxyXG5cdFx0XHRyZXR1cm4gY2FsbGJhY2soLi4uZGF0YSk7XHJcblx0XHR9KTtcclxuXHR9XHJcbn1cblxuLyoqXHJcbiAqIEBmaWxlIFxyXG4gKiBDb29raWUgY2xhc3MuXHJcbiAqXHJcbiAqIEFkZHMgc29tZSB1c2VmdWwgZnVuY3Rpb25hbGl0eSBmb3JcclxuICogc2V0dGluZyBvciBnZXR0aW5nIGNvb2tpZXMuXHJcbiAqL1xyXG5cdFxyXG5jbGFzcyBDb29raWVcclxue1xyXG5cdC8qKlxyXG4gXHQqIFNldHMgYSBjb29raWUuXHJcbiBcdCogXHJcbiBcdCogQHBhcmFtIHN0cmluZyB8IG5hbWVcclxuIFx0KiBAcGFyYW0gSlNPTiB8IHZhbHVlXHJcbiBcdCogQHBhcmFtIGludGVnZXIgfCBkYXlzXHJcbiBcdCogQHJldHVybiB2b2lkXHJcblx0Ki9cclxuXHRzdGF0aWMgc2V0KG5hbWUsIHZhbHVlLCBkYXlzKSBcclxuXHR7XHJcblx0XHRpZiAodmFsdWUuY29uc3RydWN0b3IubmFtZSAgPT0gJ09iamVjdCcgfHwgdmFsdWUuY29uc3RydWN0b3IubmFtZSA9PSAnQXJyYXknKSB7XHJcblx0XHRcdHZhbHVlID0gSlNPTi5zdHJpbmdpZnkodmFsdWUpO1xyXG5cdFx0fVxyXG5cclxuXHRcdGRheXMgPSBkYXlzIHx8IDEwO1xyXG5cclxuXHQgICAgbGV0IGV4cGlyZXM7XHJcblx0ICAgIFxyXG5cdCAgICBpZiAoZGF5cykge1xyXG5cdCAgICAgICAgbGV0IGRhdGUgPSBuZXcgRGF0ZSgpO1xyXG5cdCAgICAgICAgZGF0ZS5zZXRUaW1lKGRhdGUuZ2V0VGltZSgpICsgKGRheXMgKiAyNCAqIDYwICogNjAgKiAxMDAwKSk7XHJcblx0ICAgICAgICBleHBpcmVzID0gXCI7IGV4cGlyZXM9XCIgKyBkYXRlLnRvR01UU3RyaW5nKCk7XHJcblx0ICAgIH0gZWxzZSB7XHJcblx0ICAgICAgICBleHBpcmVzID0gXCJcIjtcclxuXHQgICAgfVxyXG5cclxuXHQgICAgZG9jdW1lbnQuY29va2llID0gbmFtZSArIFwiPVwiICsgdmFsdWUgKyBleHBpcmVzICsgXCI7IHBhdGg9L1wiO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogUmV0cmlldmVzIHRoZSBjb29raWUgYnkgbmFtZS5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSBzdHJpbmcgfCBuYW1lXHJcbiBcdCAqIEByZXR1cm4gSlNPTlxyXG5cdCAqL1xyXG5cdHN0YXRpYyBnZXQobmFtZSkgXHJcblx0e1xyXG5cdCAgICBpZiAoZG9jdW1lbnQuY29va2llLmxlbmd0aCA+IDApIHtcclxuXHQgICAgICAgIGxldCBjX3N0YXJ0ID0gZG9jdW1lbnQuY29va2llLmluZGV4T2YobmFtZSArIFwiPVwiKTtcclxuXHQgICAgICAgIFxyXG5cdCAgICAgICAgaWYgKGNfc3RhcnQgIT0gLTEpIHtcclxuXHQgICAgICAgICAgICBjX3N0YXJ0ID0gY19zdGFydCArIG5hbWUubGVuZ3RoICsgMTtcclxuXHQgICAgICAgICAgICBsZXQgY19lbmQgPSBkb2N1bWVudC5jb29raWUuaW5kZXhPZihcIjtcIiwgY19zdGFydCk7XHJcblx0ICAgICAgICAgICAgXHJcblx0ICAgICAgICAgICAgaWYgKGNfZW5kID09IC0xKSB7XHJcblx0ICAgICAgICAgICAgICAgIGNfZW5kID0gZG9jdW1lbnQuY29va2llLmxlbmd0aDtcclxuXHQgICAgICAgICAgICB9XHJcblxyXG5cdCAgICAgICAgICAgIHJldHVybiBKU09OLnBhcnNlKHVuZXNjYXBlKGRvY3VtZW50LmNvb2tpZS5zdWJzdHJpbmcoY19zdGFydCwgY19lbmQpKSk7XHJcblx0ICAgICAgICB9XHJcblx0ICAgIH1cclxuXHJcblx0ICAgIHJldHVybiB7fTtcclxuXHR9XHJcbn1cblxuLyoqXHJcbiAqIEBmaWxlIFxyXG4gKiBDYXJ0IGNsYXNzLlxyXG4gKlxyXG4gKiBIYW5kbGVzIGFkZGluZywgcmVtb3ZpbmcgZXRjLi4uIG9mIGl0ZW1zLlxyXG4gKi9cclxuXHJcbi8qKlxyXG4gKiBUaGUgZGVmYXVsdCBzZXR0aW5ncyBvZiB0aGUgY2FydC5cclxuICpcclxuICogQHZhciBvYmplY3RcclxuICovXHJcbmxldCBkZWZhdWx0U2V0dGluZ3MkMSA9IHtcclxuXHRlbGVtZW50OiAnLmNhcnQnLFxyXG5cdGNvb2tpZV9uYW1lOiAnY2FydCcsXHJcblx0cHJldmlld19jbGFzczogJycsXHJcblx0bG9hZGVyOiAnJyxcclxuXHRjbGFzczogJycsXHJcblx0d2lkdGg6ICc2MHB4JyxcclxuXHRoZWlnaHQ6ICc2MHB4JyxcclxuXHRwbGFjZW1lbnQ6ICdyaWdodC10b3AnLFxyXG5cdGZpeGVkOiB0cnVlLFxyXG5cdGhvdmVyX2NvbG9yOiAnb3JhbmdlJyxcclxuXHRub19jc3M6IGZhbHNlLFxyXG59O1xyXG5cclxuLyoqXHJcbiAqIFN0b3JlcyB0aGUgY29udGFpbmVyIG9iamVjdC5cclxuICpcclxuICogQHZhciBcXENvcmVcXENvbnRhaW5lclxyXG4gKi9cclxubGV0IENvbnRhaW5lciQyO1xyXG5cclxuLyoqXHJcbiAqIFN0b3JlcyB0aGUgZXZlbnQgbWFuYWdlciBvYmplY3QuXHJcbiAqXHJcbiAqIEB2YXIgXFxDb3JlXFxFdmVudE1hbmFnZXJcclxuICovXHJcbmxldCBFdmVudE1hbmFnZXIkMjtcclxuXHJcbi8qKlxyXG4gKiBTdG9yZXMgdGhlIHJlcXVlc3Qgb2JqZWN0LlxyXG4gKlxyXG4gKiBAdmFyIFxcSGVscGVyc1xcUmVxdWVzdFxyXG4gKi9cclxubGV0IEh0dHA7XHJcblxyXG4vKipcclxuICogU3RvcmVzIHRoZSBjYXJ0IGxvYWRlci5cclxuICpcclxuICogQHZhciBIVE1MRGl2RWxlbWVudFxyXG4gKi9cclxubGV0IGxvYWRpbmdPdmVybGF5O1xyXG5cclxuLyoqXHJcbiAqIFN0b3JlcyB0aGUgaXRlbXMgd3JhcHBlci5cclxuICpcclxuICogQHZhciBIVE1MRGl2RWxlbWVudFxyXG4gKi9cclxubGV0IGl0ZW1zRGl2O1xyXG5cclxuY2xhc3MgQ2FydCBcclxue1xyXG5cdC8qKlxyXG5cdCAqIC0gSW5pdGlhbGl6ZSB0aGUgSW9DIGNvbnRhaW5lclxyXG5cdCAqIC0gSW5pdGlhbGl6ZSB0aGUgUmVxdWVzdFxyXG5cdCAqIC0gSW5pdGlhbGl6ZSB0aGUgRXZlbnRNYW5hZ2VyXHJcblx0ICogLSBDcmVhdGVzIHRoZSBwcmV2aWV3IGFuZCB0aGUgaWNvbiBvZiB0aGUgY2FydC5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSBcXENvcmVcXENvbnRhaW5lciB8IGNvbnRhaW5lclxyXG5cdCAqIEBwYXJhbSBcXEhlbHBlcnNcXFJlcXVlc3QgfCBodHRwXHJcblx0ICogQHBhcmFtIFxcQ29yZVxcRXZlbnRNYW5hZ2VyIHwgZXZlbnRNYW5hZ2VyXHJcblx0ICogQHJldHVybiB2b2lkXHJcblx0ICovXHJcblx0Y29uc3RydWN0b3IoY29udGFpbmVyLCBodHRwLCBldmVudE1hbmFnZXIpIFxyXG5cdHtcclxuXHRcdENvbnRhaW5lciQyID0gY29udGFpbmVyO1xyXG5cdFx0SHR0cCA9IGh0dHA7XHJcblx0XHRFdmVudE1hbmFnZXIkMiA9IGV2ZW50TWFuYWdlcjtcclxuXHRcdFxyXG5cdFx0dGhpcy5wcmV2aWV3RWxlbWVudCA9IHRoaXMuY3JlYXRlUHJldmlld0VsZW1lbnQoKTtcclxuXHRcdHRoaXMuaWNvbiA9IGNyZWF0ZUljb24uY2FsbCh0aGlzKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFNldHMgdGhlIG9iamVjdCBieSB0aGUgdXNlcnMgc2V0dGluZy5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSBvYmplY3QgfCBzZXR0aW5nc1xyXG5cdCAqIEByZXR1cm4gdm9pZFxyXG5cdCAqL1xyXG5cdHNldHVwKHNldHRpbmdzKVxyXG5cdHtcclxuXHRcdGlmKHR5cGVvZiBzZXR0aW5ncyAhPSAnb2JqZWN0Jykge1xyXG5cdFx0XHR0aHJvdyBuZXcgSW52YWxpZEFyZ3VtZW50RXhjZXB0aW9uJDE7XHJcblx0XHR9XHJcblxyXG5cdFx0dGhpcy5zZXR0aW5ncyA9IENvbW1vbi5leHRlbmQoZGVmYXVsdFNldHRpbmdzJDEsIHNldHRpbmdzKTtcclxuXHJcblx0XHR0aGlzLnNldEVsZW1lbnQodGhpcy5zZXR0aW5ncy5lbGVtZW50KTtcclxuXHJcblx0XHRET00uYWRkQ2xhc3ModGhpcy5wcmV2aWV3RWxlbWVudCwgJ2Nsb3NlZCcpO1xyXG5cdFx0RE9NLmFkZENsYXNzKHRoaXMucHJldmlld0VsZW1lbnQsIHRoaXMuc2V0dGluZ3MucHJldmlld19jbGFzcyk7XHJcblx0XHRcclxuXHRcdHRoaXMuYmluZEV2ZW50TGlzdGVuZXJzKCk7XHJcblx0XHR0aGlzLmFkZFN0eWxlVGFnKCk7XHJcblxyXG5cdFx0aWYodGhpcy5pc0VtcHR5KENvb2tpZS5nZXQodGhpcy5zZXR0aW5ncy5jb29raWVfbmFtZSkpKSB7XHJcblx0XHRcdHRoaXMuc2V0dXBDYXJ0KCk7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBDaGVja3MgaWYgdGhlIGNhcnQgaXMgZW1wdHlcclxuXHQgKlxyXG5cdCAqIEBwYXJhbSBvYmplY3QgfCBjYXJ0XHJcblx0ICogQHJldHVybiBib29sXHJcblx0ICovXHJcblx0aXNFbXB0eShjYXJ0KVxyXG5cdHtcclxuXHRcdHJldHVybiBDb21tb24uZW1wdHlPYmplY3QoY2FydCk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBJbml0aWFsaXplL1NldHMgdGhlIGNhcnQgYXMgYSBjb29raWUuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gb2JqZWN0IHwgY2FydFxyXG5cdCAqIEByZXR1cm4gdm9pZFxyXG5cdCAqL1xyXG5cdHNldHVwQ2FydCgpXHJcblx0e1xyXG5cdFx0dGhpcy5jYXJ0ID0ge307XHJcblx0XHR0aGlzLmNhcnQuaWQgPSBTdHIucmFuZG9tKDEwKTtcclxuXHRcdHRoaXMuY2FydC5pdGVtcyA9IFtdO1xyXG5cdFx0dGhpcy5jYXJ0LmZhdm9yaXRlcyA9IFtdO1xyXG5cdFx0Q29va2llLnNldCh0aGlzLnNldHRpbmdzLmNvb2tpZV9uYW1lLCB0aGlzLmNhcnQsIDIpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQWRkcyBhbiBpdGVtIHRvIHRoZSBjYXJ0LlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIG9iamVjdCB8IGl0ZW1cclxuXHQgKiBAcmV0dXJuIHZvaWRcclxuXHQgKi9cclxuXHRhZGRJdGVtKGl0ZW0pXHJcblx0e1xyXG5cdFx0aWYgKHR5cGVvZiBpdGVtICE9ICdvYmplY3QnKSB7XHJcblx0XHRcdHRocm93IEludmFsaWRBcmd1bWVudEV4Y2VwdGlvbiQxKCdhZGRJdGVtKCkgZXhwZWN0IHRoZSBmaXJzdCBwYXJhbWV0ZXIgdG8gYmUgYW4gb2JqZWN0LCBidXQgJyArIHR5cGVvZiBpdGVtICsgJyB3YXMgcGFzc2VkIGluc3RlYWQnKTtcclxuXHRcdH1cclxuXHJcblx0XHR0aGlzLmNhcnQgPSBDb29raWUuZ2V0KHRoaXMuc2V0dGluZ3MuY29va2llX25hbWUpO1xyXG5cclxuXHRcdGlmICghaXRlbS5oYXNPd25Qcm9wZXJ0eSgncXVhbnRpdHknKSkge1xyXG5cdFx0XHRpdGVtLnF1YW50aXR5ID0gMTtcclxuXHRcdH1cclxuXHJcblx0XHRsZXQgaTtcclxuXHRcdGxldCBpbmNyZW1lbnRlZCA9IGZhbHNlO1xyXG5cclxuXHRcdGZvciAoaSA9IDA7IGkgPCB0aGlzLmNhcnQuaXRlbXMubGVuZ3RoOyBpKyspIHtcclxuXHRcdFx0aWYgKGl0ZW0uaGFzT3duUHJvcGVydHkoJ2lkJykgJiYgdGhpcy5jYXJ0Lml0ZW1zW2ldLmlkID09IGl0ZW0uaWQpIHtcclxuXHRcdFx0XHR0aGlzLmNhcnQuaXRlbXNbaV0ucXVhbnRpdHkrKztcclxuXHRcdFx0XHRpbmNyZW1lbnRlZCA9IHRydWU7XHJcblx0XHRcdFx0YnJlYWs7XHRcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdGlmICghIGluY3JlbWVudGVkKSB7XHJcblx0XHRcdHRoaXMuY2FydC5pdGVtcy5wdXNoKGl0ZW0pO1xyXG5cdFx0fVxyXG5cclxuXHRcdENvb2tpZS5zZXQodGhpcy5zZXR0aW5ncy5jb29raWVfbmFtZSwgdGhpcy5jYXJ0LCAyKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEFkZHMgYW4gaXRlbSB0byB0aGUgZmF2b3JpdGVzIGxpc3QuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gb2JqZWN0IHwgaXRlbVxyXG5cdCAqIEByZXR1cm4gdm9pZFxyXG5cdCAqL1xyXG5cdGZhdm9yaXRlSXRlbShpdGVtKVxyXG5cdHtcclxuXHRcdHRoaXMuY2FydCA9IENvb2tpZS5nZXQodGhpcy5zZXR0aW5ncy5jb29raWVfbmFtZSk7XHJcblxyXG5cdFx0bGV0IGk7XHJcblx0XHRsZXQgYWxyZWFkeUZhdm9yaXRlZCA9IGZhbHNlO1xyXG5cclxuXHRcdGZvciAoaSA9IDA7IGkgPCB0aGlzLmNhcnQuZmF2b3JpdGVzLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdGlmIChpdGVtLmhhc093blByb3BlcnR5KCdpZCcpICYmIHRoaXMuY2FydC5mYXZvcml0ZXNbaV0uaWQgPT0gaXRlbS5pZCkge1xyXG5cdFx0XHRcdGFscmVhZHlGYXZvcml0ZWQgPSB0cnVlO1xyXG5cdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKCEgYWxyZWFkeUZhdm9yaXRlZCkge1xyXG5cdFx0XHR0aGlzLmNhcnQuZmF2b3JpdGVzLnB1c2goaXRlbSk7XHJcblx0XHR9XHJcblxyXG5cdFx0Q29va2llLnNldCh0aGlzLnNldHRpbmdzLmNvb2tpZV9uYW1lLCB0aGlzLmNhcnQsIDIpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogUmVtb3ZlcyBhbiBpdGVtIGZyb20gdGhlIGNhcnQuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gb2JqZWN0IHwgaXRlbVxyXG5cdCAqIEByZXR1cm4gdm9pZFxyXG5cdCAqL1xyXG5cdHJlbW92ZUl0ZW0oaXRlbSlcclxuXHR7XHJcbiBcdFx0dGhpcy5jYXJ0ID0gQ29va2llLmdldCh0aGlzLnNldHRpbmdzLmNvb2tpZV9uYW1lKTtcclxuXHJcbiBcdFx0bGV0IGk7XHJcblxyXG4gXHRcdGZvciAoaSA9IDA7IGkgPCB0aGlzLmNhcnQuaXRlbXMubGVuZ3RoOyBpKyspIHtcclxuIFx0XHRcdGlmIChpdGVtLmhhc093blByb3BlcnR5KCdpZCcpICYmIHRoaXMuY2FydC5pdGVtc1tpXS5uYW1lID09IGl0ZW0ubmFtZSkge1xyXG4gXHRcdFx0XHR0aGlzLmNhcnQuaXRlbXMuc3BsaWNlKGksIDEpO1xyXG4gXHRcdFx0XHRicmVhaztcclxuIFx0XHRcdH1cclxuIFx0XHR9XHJcblxyXG4gXHRcdENvb2tpZS5zZXQodGhpcy5zZXR0aW5ncy5jb29raWVfbmFtZSwgdGhpcy5jYXJ0LCAyKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEFkZHMgdGhlIGl0ZW0gdG8gcHJldmlldy5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSBhcnJheSB8IGl0ZW1zXHJcblx0ICogQHJldHVybiB2b2lkXHJcblx0ICovXHJcblx0YWRkVG9QcmV2aWV3KGl0ZW1zKVxyXG5cdHtcclxuXHRcdGl0ZW1zRGl2LmlubmVySFRNTCA9ICcnO1xyXG5cclxuXHRcdGxldCB0YWJsZSA9IERPTS5jcmVhdGVFbGVtZW50KCd0YWJsZScpO1xyXG5cclxuXHRcdERPTS5hZGRDbGFzcyh0YWJsZSwgJ3ByZXZpZXctdGFibGUnKTtcclxuXHJcblx0XHRmb3IgKGxldCBpID0gMDsgaSA8IGl0ZW1zLmxlbmd0aDsgaSsrKSB7XHJcblxyXG5cdFx0XHRsZXQgYXR0cmlidXRlcyA9IGl0ZW1zW2ldO1xyXG5cclxuXHRcdFx0bGV0IHRyID0gRE9NLmNyZWF0ZUVsZW1lbnQoJ3RyJywge1xyXG5cdFx0XHRcdGNsYXNzOiAnaXRlbSdcclxuXHRcdFx0fSk7XHJcblxyXG5cdFx0XHQvLyBRdWFudGl0eSBhbHdheXMgYXQgdGhlIHN0YXJ0IG9mIGFuIGl0ZW0uXHJcblx0XHRcdGxldCB0ZCA9IERPTS5jcmVhdGVFbGVtZW50KCd0ZCcpO1xyXG5cclxuXHRcdFx0dGQuaW5uZXJIVE1MID0gYXR0cmlidXRlcy5xdWFudGl0eSArJ3gnO1xyXG5cdFx0XHR0ci5hcHBlbmRDaGlsZCh0ZCk7XHJcblx0XHRcdFxyXG5cdFx0XHRmb3IobGV0IGF0dHJpYnV0ZSBpbiBhdHRyaWJ1dGVzKSB7XHJcblx0XHRcdFx0c3dpdGNoKGF0dHJpYnV0ZSlcclxuXHRcdFx0XHR7XHJcblx0XHRcdFx0XHRjYXNlICdpbWFnZSc6XHJcblx0XHRcdFx0XHRcdHRkID0gRE9NLmNyZWF0ZUVsZW1lbnQoJ3RkJyk7XHJcblx0XHRcdFx0XHRcdGxldCBpbWFnZSA9IERPTS5jcmVhdGVFbGVtZW50KCdpbWcnLCB7XHJcblx0XHRcdFx0XHRcdFx0c3JjOiBhdHRyaWJ1dGVzW2F0dHJpYnV0ZV0sXHJcblx0XHRcdFx0XHRcdFx0d2lkdGg6ICc1MHB4JyxcclxuXHRcdFx0XHRcdFx0XHRoZWlnaHQ6ICc1MHB4J1xyXG5cdFx0XHRcdFx0XHR9KTtcclxuXHJcblx0XHRcdFx0XHRcdHRkLmFwcGVuZENoaWxkKGltYWdlKTtcclxuXHRcdFx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdFx0XHRjYXNlICduYW1lJzpcclxuXHRcdFx0XHRcdGNhc2UgJ3ByaWNlJzpcclxuXHRcdFx0XHRcdFx0dGQgPSBET00uY3JlYXRlRWxlbWVudCgndGQnKTtcclxuXHRcdFx0XHRcdFx0dGQuaW5uZXJIVE1MID0gYXR0cmlidXRlc1thdHRyaWJ1dGVdO1xyXG5cdFx0XHRcdFx0XHRicmVhaztcclxuXHRcdFx0XHR9XHJcblx0XHRcdFxyXG5cdFx0XHRcdHRyLmFwcGVuZENoaWxkKHRkKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0dGFibGUuYXBwZW5kQ2hpbGQodHIpO1xyXG5cdFx0fVxyXG5cclxuXHRcdC8vIGNyZWF0ZSBjaGVja291dCBidXR0b24gYXQgdGhlIGJ1dHRvbVxyXG5cdFx0bGV0IHRyID0gRE9NLmNyZWF0ZUVsZW1lbnQoJ3RyJyk7XHJcblx0XHRsZXQgdGQgPSBET00uY3JlYXRlRWxlbWVudCgndGQnLCB7XHJcblx0XHRcdGNvbHNwYW46ICc0JyxcclxuXHRcdH0pO1xyXG5cclxuXHRcdGxldCBjaGVja291dCA9IERPTS5jcmVhdGVFbGVtZW50KCdhJywge1xyXG5cdFx0XHRjbGFzczogJ2J0biBidG4tcHJpbWFyeScsXHJcblx0XHRcdHRleHQ6ICdDaGVja291dCdcclxuXHRcdH0pO1xyXG5cclxuXHRcdHRkLmFwcGVuZENoaWxkKGNoZWNrb3V0KTtcclxuXHRcdHRyLmFwcGVuZENoaWxkKHRkKTtcclxuXHJcblx0XHR0YWJsZS5hcHBlbmRDaGlsZCh0cik7XHJcblxyXG5cdFx0aXRlbXNEaXYuYXBwZW5kQ2hpbGQodGFibGUpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQmluZHMgZXZlcnRoaW5nIHRvIHRoZSBlbGVtZW50LlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIHN0cmluZyB8IHNlbGVjdG9yXHJcblx0ICogQHJldHVybiB2b2lkXHJcblx0ICovXHJcblx0c2V0RWxlbWVudChzZWxlY3RvcilcclxuXHR7XHJcblx0XHR0aGlzLmVsZW1lbnQgPSBET00uZmluZChzZWxlY3Rvcik7XHJcblxyXG5cdFx0aWYgKHRoaXMuZWxlbWVudCkge1xyXG5cdFx0XHRET00uYWRkQ2xhc3ModGhpcy5lbGVtZW50LCB0aGlzLnNldHRpbmdzLmNsYXNzKTtcclxuXHRcdFx0RE9NLmFkZENsYXNzKHRoaXMuZWxlbWVudCwgdGhpcy5zZXR0aW5ncy5wbGFjZW1lbnQpO1xyXG5cdFx0XHR0aGlzLmVsZW1lbnQuYXBwZW5kQ2hpbGQodGhpcy5pY29uKTtcclxuXHRcdFx0dGhpcy5lbGVtZW50LmFwcGVuZENoaWxkKHRoaXMucHJldmlld0VsZW1lbnQpO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQ3JlYXRlcyB0aGUgY2FydCBkZXRhaWxzIHByZXZpZXcgZWxlbWVudC5cclxuXHQgKlxyXG5cdCAqIEByZXR1cm4gSFRNTERpdkVsZW1lbnRcclxuXHQgKi9cclxuXHRjcmVhdGVQcmV2aWV3RWxlbWVudCgpXHJcblx0e1xyXG5cdFx0bGV0IHByZXZpZXdFbGVtZW50ID0gRE9NLmNyZWF0ZUVsZW1lbnQoJ2RpdicsIHtcclxuXHRcdFx0aWQ6ICdwcmV2aWV3J1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0aXRlbXNEaXYgPSBET00uY3JlYXRlRWxlbWVudCgndWwnLCB7XHJcblx0XHRcdFx0Y2xhc3M6ICdpdGVtcydcclxuXHRcdFx0fSk7XHJcblxyXG5cdFx0cHJldmlld0VsZW1lbnQuYXBwZW5kQ2hpbGQoaXRlbXNEaXYpO1xyXG5cclxuXHRcdHJldHVybiBwcmV2aWV3RWxlbWVudDtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEFkZCB0aGUgZUNvbW1lcmNlIHN0eWxlIHRhZ3MgdG8gdGhlIERPTS5cclxuXHQgKlxyXG5cdCAqIEByZXR1cm4gdm9pZFxyXG5cdCAqL1xyXG5cdGFkZFN0eWxlVGFnKCkgXHJcblx0e1xyXG5cdFx0aWYgKERPTS5maW5kKCcjZUNvbW1lcmNlLUNhcnQnKSkge1xyXG5cdFx0XHRyZXR1cm47XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKHRoaXMuc2V0dGluZ3Mubm9fY3NzKSB7XHJcblx0XHRcdHJldHVybjtcclxuXHRcdH1cclxuXHJcblx0XHRsZXQgcG9zaXRpb24gPSAodGhpcy5zZXR0aW5ncy5maXhlZCkgPyAnZml4ZWQnIDogJ2Fic29sdXRlJztcclxuXHJcblx0XHRsZXQgY3NzID0gYFxyXG5cdFx0XHQke3RoaXMuc2V0dGluZ3MuZWxlbWVudH0ge1xyXG5cdFx0XHRcdHBvc2l0aW9uOiAke3Bvc2l0aW9ufTtcclxuXHRcdFx0XHRjdXJzb3I6IHBvaW50ZXI7XHJcblx0XHRcdFx0Y29sb3I6ICNmZmZmZmY7XHJcblx0XHRcdFx0ei1pbmRleDogOTk4O1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHQke3RoaXMuc2V0dGluZ3MuZWxlbWVudH0gc3ZnIHtcclxuXHRcdFx0XHR3aWR0aDogJHt0aGlzLnNldHRpbmdzLndpZHRofTtcclxuXHRcdFx0XHRoZWlnaHQ6ICR7dGhpcy5zZXR0aW5ncy5oZWlnaHR9O1xyXG5cdFx0XHRcdHRyYW5zaXRpb246IGZpbGwgMC4zcztcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0JHt0aGlzLnNldHRpbmdzLmVsZW1lbnR9IHN2Zzpob3ZlciB7XHJcblx0XHRcdFx0ZmlsbDogJHt0aGlzLnNldHRpbmdzLmhvdmVyX2NvbG9yfTtcclxuXHRcdFx0XHR0cmFuc2l0aW9uOiBmaWxsIDAuM3M7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdCR7dGhpcy5zZXR0aW5ncy5lbGVtZW50fS50b3AtcmlnaHQsXHJcblx0XHRcdCR7dGhpcy5zZXR0aW5ncy5lbGVtZW50fS5yaWdodC10b3Age1xyXG5cdFx0XHRcdHJpZ2h0OiAxMHB4O1xyXG5cdFx0XHRcdHRvcDogMTBweDtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0JHt0aGlzLnNldHRpbmdzLmVsZW1lbnR9LmxlZnQtdG9wLFxyXG5cdFx0XHQke3RoaXMuc2V0dGluZ3MuZWxlbWVudH0udG9wLWxlZnQge1xyXG5cdFx0XHRcdGxlZnQ6IDEwcHg7XHJcblx0XHRcdFx0dG9wOiAxMHB4O1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHQke3RoaXMuc2V0dGluZ3MuZWxlbWVudH0gPiAjcHJldmlldyB7XHJcblx0XHRcdFx0cG9zaXRpb246ICR7cG9zaXRpb259O1xyXG5cdFx0XHRcdHotaW5kZXg6IDk5OTk7XHJcblx0XHRcdFx0dG9wOiBjYWxjKDEwcHggKyAke3RoaXMuc2V0dGluZ3MuaGVpZ2h0fSk7XHJcblx0XHRcdFx0dHJhbnNmb3JtOiB0cmFuc2xhdGVYKDYwcHgpO1xyXG5cdFx0XHRcdGhlaWdodDogNDAwcHg7XHJcblx0XHRcdFx0d2lkdGg6IDMwMHB4O1xyXG5cdFx0XHRcdGJvcmRlcjogMXB4IHNvbGlkICNlNGU0ZTQ7XHJcblx0XHRcdFx0YmFja2dyb3VuZDogI2ZmZmZmZjtcclxuXHRcdFx0XHR0cmFuc2l0aW9uOiB0cmFuc2Zvcm0gMXMsIHZpc2liaWxpdHkgMXM7XHJcblx0XHRcdFx0Y3Vyc29yOiBkZWZhdWx0O1xyXG5cdFx0XHRcdG92ZXJmbG93LVk6IHNjcm9sbDtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0JHt0aGlzLnNldHRpbmdzLmVsZW1lbnR9ID4gI3ByZXZpZXcub3BlbmVkIHtcclxuXHRcdFx0XHR2aXNpYmlsaXR5OiB2aXNpYmxlO1xyXG5cdFx0XHRcdHRyYW5zZm9ybTogdHJhbnNsYXRlWCgtMjQwcHgpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHQke3RoaXMuc2V0dGluZ3MuZWxlbWVudH0gPiAjcHJldmlldy5jbG9zZWQge1xyXG5cdFx0XHRcdHZpc2liaWxpdHk6IGhpZGRlbjtcclxuXHRcdFx0XHR0cmFuc2Zvcm06IHRyYW5zbGF0ZVgoNjBweCk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdCR7dGhpcy5zZXR0aW5ncy5lbGVtZW50fSAjcHJldmlldyA+IHVsLml0ZW1zIHtcclxuXHRcdFx0XHRwYWRkaW5nOiAwO1xyXG5cdFx0XHRcdGNvbG9yOiAjMDAwMDAwO1xyXG5cdFx0XHRcdGxpc3Qtc3R5bGUtdHlwZTogbm9uZTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0JHt0aGlzLnNldHRpbmdzLmVsZW1lbnR9ICNwcmV2aWV3ID4gdWwuaXRlbXMgPiAucHJldmlldy10YWJsZSB7XHJcblx0XHRcdFx0d2lkdGg6IDEwMCU7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdCR7dGhpcy5zZXR0aW5ncy5lbGVtZW50fSAjcHJldmlldyA+IHVsLml0ZW1zID4gLnByZXZpZXctdGFibGUgdGQge1xyXG5cdFx0XHRcdHBhZGRpbmc6IDRweDtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0JHt0aGlzLnNldHRpbmdzLmVsZW1lbnR9IC5pdGVtcy5sb2FkaW5nIHtcclxuXHRcdFx0XHRkaXNwbGF5OiBub25lO1xyXG5cdFx0XHRcdG92ZXJmbG93LVk6IG5vbmU7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdCR7dGhpcy5zZXR0aW5ncy5lbGVtZW50fSAuY2FydC1sb2FkZXItb3ZlcmxheSB7XHJcblx0XHRcdFx0cG9zaXRpb246IGZpeGVkO1xyXG5cdFx0XHRcdHRvcDogMDsgXHJcblx0XHRcdCAgICBsZWZ0OiAwO1xyXG5cdFx0XHQgICAgcmlnaHQ6IDA7XHJcblx0XHRcdCAgICBib3R0b206IDA7XHJcblx0XHRcdFx0YmFja2dyb3VuZDogI2ZmZmZmZjtcclxuXHRcdFx0XHR3aWR0aDogMTAwJTtcclxuXHRcdFx0XHRoZWlnaHQ6IDEwMCU7XHJcblx0XHRcdFx0bWluLWhlaWdodDogMTAwJTtcclxuXHRcdFx0XHRvdmVyZmxvdzogYXV0bztcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0JHt0aGlzLnNldHRpbmdzLmVsZW1lbnR9IC5jYXJ0LWxvYWRlci1vdmVybGF5IC5jYXJ0LWxvYWRlciB7XHJcblx0XHRcdFx0cG9zaXRpb246IGFic29sdXRlO1xyXG5cdFx0XHRcdHdpZHRoOiA1MHB4O1xyXG5cdFx0XHRcdGhlaWdodDogNTBweDtcclxuXHRcdFx0XHRtYXJnaW4tbGVmdDogLTI1cHg7XHJcblx0XHRcdFx0bWFyZ2luLXRvcDogLTI1cHg7XHJcblx0XHRcdFx0bGVmdDogNTAlO1xyXG5cdFx0XHRcdHJpZ2h0OiA1MCU7XHJcblx0XHRcdFx0dG9wOiA1MCU7XHJcblx0XHRcdFx0Ym90dG9tOiA1MCU7XHJcblx0XHRcdH1cclxuXHRcdGA7XHJcblx0ICAgIFxyXG5cdCAgICBET00uYWRkU3R5bGUoJ1R1cmJvLWVDb21tZXJjZS1DYXJ0JywgY3NzKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIENyZWF0ZXMgYW4gbG9hZGluZyBvdmVybGF5LlxyXG5cdCAqXHJcblx0ICogQHJldHVybiBIVE1MRGl2RWxlbWVudFxyXG5cdCAqL1xyXG5cdGxvYWRpbmdPdmVybGF5KClcclxuXHR7XHJcblx0XHRpZiAobG9hZGluZ092ZXJsYXkpIHtcclxuXHRcdFx0cmV0dXJuIGxvYWRpbmdPdmVybGF5O1xyXG5cdFx0fVxyXG5cclxuXHRcdGxldCBsb2FkZXI7XHJcblxyXG5cdFx0aWYgKHRoaXMuc2V0dGluZ3MubG9hZGVyKSB7XHJcblx0XHRcdGxvYWRlciA9IERPTS5jcmVhdGVFbGVtZW50KCdpbWcnLCB7XHJcblx0XHRcdFx0c3JjOiB0aGlzLnNldHRpbmdzLmxvYWRlcixcclxuXHRcdFx0XHRjbGFzczogJ2NhcnQtbG9hZGVyJ1xyXG5cdFx0XHR9KTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdGxvYWRlciA9IGNyZWF0ZUxvYWRlcigpO1xyXG5cdFx0fVxyXG5cclxuXHRcdGxvYWRpbmdPdmVybGF5ID0gRE9NLmNyZWF0ZUVsZW1lbnQoJ2RpdicsIHtcclxuXHRcdFx0Y2xhc3M6ICdjYXJ0LWxvYWRlci1vdmVybGF5J1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0bG9hZGluZ092ZXJsYXkuYXBwZW5kQ2hpbGQobG9hZGVyKTtcclxuXHJcblx0XHRyZXR1cm4gbG9hZGluZ092ZXJsYXk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBMb2FkaW5nIHRoZSBjYXJ0IHByZXZpZXcuXHJcblx0ICpcclxuXHQgKiBAcmV0dXJuIHZvaWRcclxuXHQgKi9cclxuXHRwcmV2aWV3U3RhcnRMb2FkaW5nKClcclxuXHR7XHJcblx0XHRET00uYWRkQ2xhc3MoaXRlbXNEaXYsICdsb2FkaW5nJyk7XHJcblx0XHR0aGlzLnByZXZpZXdFbGVtZW50LmFwcGVuZENoaWxkKHRoaXMubG9hZGluZ092ZXJsYXkoKSk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBMb2FkaW5nIHRoZSBjYXJ0IHByZXZpZXcuXHJcblx0ICpcclxuXHQgKiBAcmV0dXJuIHZvaWRcclxuXHQgKi9cclxuXHRwcmV2aWV3U3RvcExvYWRpbmcoKVxyXG5cdHtcclxuXHRcdGlmIChET00uZmluZCgnLmNhcnQtbG9hZGVyLW92ZXJsYXknLCB0aGlzLnByZXZpZXdFbGVtZW50KSkge1xyXG5cdFx0XHR0aGlzLnByZXZpZXdFbGVtZW50LnJlbW92ZUNoaWxkKHRoaXMubG9hZGluZ092ZXJsYXkoKSk7XHJcblx0XHRcdERPTS5yZW1vdmVDbGFzcyhpdGVtc0RpdiwgJ2xvYWRpbmcnKTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFJlbG9hZHMgdGhlIGl0ZW1zIGluIHRoZSBjYXJ0IHByZXZpZXcuXHJcblx0ICpcclxuXHQgKiBAcmV0dXJuIHZvaWRcclxuXHQgKi9cclxuXHRyZWxvYWRDYXJ0UHJldmlldygpXHJcblx0e1xyXG5cdFx0dGhpcy5wcmV2aWV3U3RhcnRMb2FkaW5nKCk7XHJcblx0XHRsZXQgaXRlbXMgPSB0aGlzLmdldENhcnRJdGVtcygpO1xyXG5cdFx0dGhpcy5hZGRUb1ByZXZpZXcoaXRlbXMpO1xyXG5cdFx0XHJcblx0XHRsZXQgaW5zdGFuY2UgPSB0aGlzO1xyXG5cclxuXHRcdHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XHJcblx0XHRcdGluc3RhbmNlLnByZXZpZXdTdG9wTG9hZGluZy5jYWxsKGluc3RhbmNlKTtcclxuXHRcdH0sIDEwMDApO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQmluZHMgZXZlbnQgbGlzdGVuZXJzIHRvIHRoZSBjYXJ0IGljb24uXHJcblx0ICpcclxuXHQgKiBAcmV0dXJuIHZvaWRcclxuXHQgKi9cclxuXHRiaW5kRXZlbnRMaXN0ZW5lcnMoKVxyXG5cdHtcclxuXHRcdGlmKHRoaXMuaWNvbiA9PSBudWxsKSB7XHJcblx0XHRcdHJldHVybjtcclxuXHRcdH1cclxuXHJcblx0XHR0aGlzLmljb24ub25jbGljayA9IGZ1bmN0aW9uKGUpIHtcclxuXHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdFx0XHR0aGlzLnRvZ2dsZUNhcnRQcmV2aWV3KCk7XHJcblx0XHR9LmJpbmQodGhpcyk7XHJcblx0XHRcclxuXHRcdEV2ZW50TWFuYWdlciQyLnN1YnNjcmliZSgnY2FydC5wcm9kdWN0LmFkZGVkJywgZnVuY3Rpb24oYXR0cmlidXRlcykge1xyXG5cdFx0XHR0aGlzLm9wZW5DYXJ0UHJldmlldygpO1xyXG5cdFx0XHR0aGlzLmFkZEl0ZW0oYXR0cmlidXRlcyk7XHJcblx0XHRcdHRoaXMucmVsb2FkQ2FydFByZXZpZXcoKTtcclxuXHRcdH0uYmluZCh0aGlzKSk7XHJcblxyXG5cdFx0RXZlbnRNYW5hZ2VyJDIuc3Vic2NyaWJlKCdjYXJ0LnByb2R1Y3QuZmF2b3JpdGVkJywgZnVuY3Rpb24oYXR0cmlidXRlcykge1xyXG5cdFx0XHR0aGlzLmZhdm9yaXRlSXRlbShhdHRyaWJ1dGVzKTtcclxuXHRcdH0uYmluZCh0aGlzKSk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBPcGVucyB0aGUgY2FydCBwcmV2aWV3LlxyXG5cdCAqXHJcblx0ICogQHJldHVybiB2b2lkIFxyXG5cdCAqL1xyXG5cdG9wZW5DYXJ0UHJldmlldygpXHJcblx0e1xyXG5cdFx0aWYgKERPTS5oYXNDbGFzcyh0aGlzLnByZXZpZXdFbGVtZW50LCAnb3BlbmVkJykpIHtcclxuXHRcdFx0dGhpcy5yZWxvYWRDYXJ0UHJldmlldygpO1xyXG5cdFx0fVxyXG5cclxuXHRcdERPTS5zd2l0Y2hDbGFzc2VzKHRoaXMucHJldmlld0VsZW1lbnQsICdjbG9zZWQnLCAnb3BlbmVkJyk7XHJcblx0XHR0aGlzLnJlbG9hZENhcnRQcmV2aWV3KCk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBUb2dnbGVzIHRoZSBvcGVuaW5nIGNsb3Npbmcgb2YgdGhlIGNhcnQgcHJldmlldy5cclxuXHQgKlxyXG5cdCAqIEByZXR1cm4gdm9pZCBcclxuXHQgKi9cclxuXHR0b2dnbGVDYXJ0UHJldmlldygpXHJcblx0e1xyXG5cdFx0bGV0IG9wZW5pbmcgPSBET00udG9nZ2xlQ2xhc3ModGhpcy5wcmV2aWV3RWxlbWVudCwgJ29wZW5lZCcsICdjbG9zZWQnKTtcclxuXHRcdFx0XHJcblx0XHRpZiAob3BlbmluZykge1xyXG5cdFx0XHR0aGlzLnJlbG9hZENhcnRQcmV2aWV3KCk7XHRcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFJldHJpZXZlIHRoZSBjYXJ0cyBpdGVtcyBmcm9tIHRoZSBjb29raWUuXHJcblx0ICpcclxuXHQgKiBAcmV0dXJuIG9iamVjdFxyXG5cdCAqL1xyXG5cdGdldENhcnRJdGVtcygpXHJcblx0e1xyXG5cdFx0bGV0IGNhcnQgPSBDb29raWUuZ2V0KHRoaXMuc2V0dGluZ3MuY29va2llX25hbWUpO1xyXG5cclxuXHRcdHJldHVybiAoY2FydCkgPyBjYXJ0Lml0ZW1zIDogW107XHJcblx0fVxyXG59XHJcblxyXG4vKipcclxuICogQ2xvc2VzIHRoZSBjYXJ0IHByZXZpZXcgZWxlbWVudC5cclxuICpcclxuICogQHBhcmFtIGV2ZW50LmNsaWNrXHJcbiAqL1xyXG5mdW5jdGlvbiBjbG9zZShldmVudCkge1xyXG5cdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcblx0RE9NLnN3aXRjaENsYXNzZXModGhpcy5wcmV2aWV3RWxlbWVudCwgJ29wZW5lZCcsICdjbG9zZWQnKTtcclxufVxyXG5cclxuLyoqXHJcbiAqIENyZWF0ZXMgdGhlIGNhcnQgc3ZnIGljb24uXHJcbiAqXHJcbiAqIEByZXR1cm4gU1ZHU1ZHRWxlbWVudFxyXG4gKi9cclxuZnVuY3Rpb24gY3JlYXRlSWNvbigpIHtcclxuXHRsZXQgc3ZnID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKFwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiwgXCJzdmdcIik7XHJcblx0bGV0IGcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50TlMoXCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiLCBcImdcIik7XHJcblx0bGV0IHBhdGggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50TlMoXCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiLCBcInBhdGhcIik7XHJcblxyXG5cdHN2Zy5zZXRBdHRyaWJ1dGUoJ3ZlcnNpb24nLCAnMS4xJyk7XHJcblx0c3ZnLnNldEF0dHJpYnV0ZSgneG1sbnMnLCAnaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnKTtcclxuXHRzdmcuc2V0QXR0cmlidXRlKCd4bWxuczp4bGluaycsICdodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rJyk7XHJcblx0c3ZnLnNldEF0dHJpYnV0ZSgneCcsICcwcHgnKTtcclxuXHRzdmcuc2V0QXR0cmlidXRlKCd5JywgJzBweCcpO1xyXG5cdHN2Zy5zZXRBdHRyaWJ1dGUoJ3dpZHRoJywgJzQwcHgnKTtcclxuXHRzdmcuc2V0QXR0cmlidXRlKCdoZWlnaHQnLCAnNDBweCcpO1xyXG5cdHN2Zy5zZXRBdHRyaWJ1dGUoJ3ZpZXdCb3gnLCAnMCAwIDQ0Ni44NDMgNDQ2Ljg0MycpO1xyXG5cdHN2Zy5zZXRBdHRyaWJ1dGUoJ3N0eWxlJywgJ2VuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgNDQ2Ljg0MyA0NDYuODQzOycpO1xyXG5cdHN2Zy5zZXRBdHRyaWJ1dGUoJ3htbDpzcGFjZScsICdwcmVzZXJ2ZScpO1xyXG5cclxuXHRwYXRoLnNldEF0dHJpYnV0ZSgnZCcsICdNNDQ0LjA5LDkzLjEwM2MtMi42OTgtMy42OTktNy4wMDYtNS44ODgtMTEuNTg0LTUuODg4SDEwOS45MmMtMC42MjUsMC0xLjI0OSwwLjAzOC0xLjg1LDAuMTE5bC0xMy4yNzYtMzguMjdjLTEuMzc2LTMuOTU4LTQuNDA2LTcuMTEzLTguMy04LjY0NkwxOS41ODYsMTQuMTM0Yy03LjM3NC0yLjg4Ny0xNS42OTUsMC43MzUtMTguNTkxLDguMWMtMi44OTEsNy4zNjksMC43MywxNS42OTUsOC4xLDE4LjU5MWw2MC43NjgsMjMuODcybDc0LjM4MSwyMTQuMzk5Yy0zLjI4MywxLjE0NC02LjA2NSwzLjY2My03LjMzMiw3LjE4N2wtMjEuNTA2LDU5LjczOWMtMS4zMTgsMy42NjMtMC43NzUsNy43MzMsMS40NjgsMTAuOTE2YzIuMjQsMy4xODMsNS44ODMsNS4wNzgsOS43NzMsNS4wNzhoMTEuMDQ0Yy02Ljg0NCw3LjYxNi0xMS4wNDQsMTcuNjQ2LTExLjA0NCwyOC42NzVjMCwyMy43MTgsMTkuMjk4LDQzLjAxMiw0My4wMTIsNDMuMDEyczQzLjAxMi0xOS4yOTQsNDMuMDEyLTQzLjAxMmMwLTExLjAyOS00LjItMjEuMDU5LTExLjA0NC0yOC42NzVoOTMuNzc2Yy02Ljg0Nyw3LjYxNi0xMS4wNDgsMTcuNjQ2LTExLjA0OCwyOC42NzVjMCwyMy43MTgsMTkuMjk0LDQzLjAxMiw0My4wMTMsNDMuMDEyYzIzLjcxOCwwLDQzLjAxMi0xOS4yOTQsNDMuMDEyLTQzLjAxMmMwLTExLjAyOS00LjItMjEuMDU5LTExLjA0My0yOC42NzVoMTMuNDMzYzYuNTk5LDAsMTEuOTQ3LTUuMzQ5LDExLjk0Ny0xMS45NDhjMC02LjU5OS01LjM0OS0xMS45NDctMTEuOTQ3LTExLjk0N0gxNDMuNjQ3bDEzLjMxOS0zNi45OTZjMS43MiwwLjcyNCwzLjU3OCwxLjE1Miw1LjUyMywxLjE1MmgyMTAuMjc4YzYuMjM0LDAsMTEuNzUxLTQuMDI3LDEzLjY1LTkuOTU5bDU5LjczOS0xODYuMzg3QzQ0Ny41NTcsMTAxLjU2Nyw0NDYuNzg4LDk2LjgwMiw0NDQuMDksOTMuMTAzeiBNMTY5LjY1OSw0MDkuODA3Yy0xMC41NDMsMC0xOS4xMTYtOC41NzMtMTkuMTE2LTE5LjExNnM4LjU3My0xOS4xMTcsMTkuMTE2LTE5LjExN3MxOS4xMTYsOC41NzQsMTkuMTE2LDE5LjExN1MxODAuMjAyLDQwOS44MDcsMTY5LjY1OSw0MDkuODA3eiBNMzI3LjM2Nyw0MDkuODA3Yy0xMC41NDMsMC0xOS4xMTctOC41NzMtMTkuMTE3LTE5LjExNnM4LjU3NC0xOS4xMTcsMTkuMTE3LTE5LjExN2MxMC41NDIsMCwxOS4xMTYsOC41NzQsMTkuMTE2LDE5LjExN1MzMzcuOTA5LDQwOS44MDcsMzI3LjM2Nyw0MDkuODA3eiBNNDAyLjUyLDE0OC4xNDloLTczLjE2MVYxMTUuODloODMuNDk5TDQwMi41MiwxNDguMTQ5eiBNMzgxLjQ1MywyMTMuODYxaC01Mi4wOTR2LTM3LjAzOGg2My45NjdMMzgxLjQ1MywyMTMuODYxeiBNMjM0LjU3MSwyMTMuODYxdi0zNy4wMzhoNjYuMTEzdjM3LjAzOEgyMzQuNTcxeiBNMzAwLjY4NCwyNDIuNTM4djMxLjA2NGgtNjYuMTEzdi0zMS4wNjRIMzAwLjY4NHogTTEzOS4xMTUsMTc2LjgyM2g2Ni43ODR2MzcuMDM4aC01My45MzNMMTM5LjExNSwxNzYuODIzeiBNMjM0LjU3MSwxNDguMTQ5VjExNS44OWg2Ni4xMTN2MzIuMjU5SDIzNC41NzF6IE0yMDUuODk4LDExNS44OXYzMi4yNTloLTc2LjczNGwtMTEuMTkxLTMyLjI1OUgyMDUuODk4eiBNMTYxLjkxNiwyNDIuNTM4aDQzLjk4MnYzMS4wNjRoLTMzLjIwNkwxNjEuOTE2LDI0Mi41Mzh6IE0zMjkuMzU5LDI3My42MDN2LTMxLjA2NGg0Mi45MDlsLTkuOTU1LDMxLjA2NEgzMjkuMzU5eicpO1xyXG5cclxuXHRnLmFwcGVuZENoaWxkKHBhdGgpO1xyXG5cdHN2Zy5hcHBlbmRDaGlsZChnKTtcclxuXHJcblx0bGV0ICBkaXYgPSBET00uY3JlYXRlRWxlbWVudCgnZGl2Jywge1xyXG5cdFx0aWQ6ICdjYXJ0SWNvbicsXHJcblx0fSk7XHJcblxyXG5cdGRpdi5hcHBlbmRDaGlsZChzdmcpO1xyXG5cclxuXHRyZXR1cm4gZGl2O1xyXG59XHJcblxyXG4vKipcclxuICogQ3JlYXRlcyB0aGUgY2FydCBsb2FkZXIgaWNvbi5cclxuICpcclxuICogQHJldHVybiBTVkdTVkdFbGVtZW50XHJcbiAqL1xyXG5mdW5jdGlvbiBjcmVhdGVMb2FkZXIoKSB7XHJcblx0bGV0IHN2ZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnROUyhcImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIsIFwic3ZnXCIpO1xyXG5cdGxldCBjb3VudCA9IDEyO1xyXG5cdGxldCBncm91cHMgPSBbXTtcclxuXHRsZXQgcmVjdGFuZ2VscyA9IFtdO1xyXG5cdGxldCBhbmltYXRpb25zID0gW107XHJcblxyXG5cdHN2Zy5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgJ2xkcy1zcGlubmVyJyk7XHJcblx0c3ZnLnNldEF0dHJpYnV0ZSgnd2lkdGgnLCAnMjAwcHgnKTtcclxuXHRzdmcuc2V0QXR0cmlidXRlKCdoZWlnaHQnLCAnMjAwcHgnKTtcclxuXHRzdmcuc2V0QXR0cmlidXRlKCd4bWxucycsICdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZycpO1xyXG5cdHN2Zy5zZXRBdHRyaWJ1dGUoJ3htbG5zOnhsaW5rJywgJ2h0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsnKTtcclxuXHRzdmcuc2V0QXR0cmlidXRlKCd2aWV3Qm94JywgJzAgMCAxMDAgMTAwJyk7XHJcblx0c3ZnLnNldEF0dHJpYnV0ZSgncHJlc2VydmVBc3BlY3RSYXRpbycsICd4TWlkWU1pZCcpO1xyXG5cdHN2Zy5zZXRBdHRyaWJ1dGUoJ3N0eWxlJywgJ2JhY2tncm91bmQ6IG5vbmU7Jyk7XHJcblx0XHJcblx0dmFyIHJvdGF0aW9uID0gMDtcclxuXHJcblx0Zm9yICh2YXIgaSA9IDA7IGkgPCBjb3VudDsgaSsrKSB7XHJcblx0XHRsZXQgZ3JvdXAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50TlMoXCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiLCBcImdcIik7XHJcblx0XHRncm91cC5zZXRBdHRyaWJ1dGUoJ3RyYW5zZm9ybScsICdyb3RhdGUoJyArIHJvdGF0aW9uICsgJyA1MCA1MCknKTtcclxuXHRcdHJvdGF0aW9uICs9IDMwO1xyXG5cdFx0Z3JvdXBzLnB1c2goZ3JvdXApO1xyXG5cdH1cclxuXHJcblx0Zm9yICh2YXIgaSA9IDA7IGkgPCBjb3VudDsgaSsrKSB7XHJcblx0XHRsZXQgcmVjdGFuZ2VsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKFwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiwgXCJyZWN0XCIpO1xyXG5cdFx0cmVjdGFuZ2VsLnNldEF0dHJpYnV0ZSgneCcsICc0NycpO1xyXG5cdFx0cmVjdGFuZ2VsLnNldEF0dHJpYnV0ZSgneScsICcyNCcpO1xyXG5cdFx0cmVjdGFuZ2VsLnNldEF0dHJpYnV0ZSgncngnLCAnOS40Jyk7XHJcblx0XHRyZWN0YW5nZWwuc2V0QXR0cmlidXRlKCdyeScsICc0LjgnKTtcclxuXHRcdHJlY3RhbmdlbC5zZXRBdHRyaWJ1dGUoJ3dpZHRoJywgJzYnKTtcclxuXHRcdHJlY3RhbmdlbC5zZXRBdHRyaWJ1dGUoJ2hlaWdodCcsICcxMicpO1xyXG5cdFx0cmVjdGFuZ2VsLnNldEF0dHJpYnV0ZSgnZmlsbCcsICcjNDY1OGFjJyk7XHJcblx0XHRyZWN0YW5nZWxzLnB1c2gocmVjdGFuZ2VsKTtcclxuXHR9XHJcblxyXG5cdHZhciBiZWdpbiA9IDAuMDkgKiAxMTtcclxuXHJcblx0Zm9yICh2YXIgaSA9IDA7IGkgPCBjb3VudDsgaSsrKSB7XHJcblx0XHRsZXQgYW5pbWF0ZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnROUyhcImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIsIFwiYW5pbWF0ZVwiKTtcclxuXHRcdGFuaW1hdGUuc2V0QXR0cmlidXRlKCdhdHRyaWJ1dGVOYW1lJywgJ29wYWNpdHknKTtcclxuXHRcdGFuaW1hdGUuc2V0QXR0cmlidXRlKCd2YWx1ZXMnLCAnMTswJyk7XHJcblx0XHRhbmltYXRlLnNldEF0dHJpYnV0ZSgndGltZXMnLCAnMDsxJyk7XHJcblx0XHRhbmltYXRlLnNldEF0dHJpYnV0ZSgnZHVyJywgJzFzJyk7XHJcblx0XHRhbmltYXRlLnNldEF0dHJpYnV0ZSgnYmVnaW4nLCBiZWdpbi50b0ZpeGVkKDgpICsgJ3MnKTtcclxuXHRcdGFuaW1hdGUuc2V0QXR0cmlidXRlKCdyZXBlYXRDb3VudCcsICdpbmRlZmluaXRlJyk7XHJcblx0XHRhbmltYXRpb25zLnB1c2goYW5pbWF0ZSk7XHJcblx0XHRiZWdpbiAtPSAwLjA5O1xyXG5cdH1cclxuXHJcblx0Zm9yICh2YXIgaSA9IDA7IGkgPCBncm91cHMubGVuZ3RoOyBpKyspIHtcclxuXHRcdGxldCBncm91cCA9IGdyb3Vwc1tpXTtcdFx0XHJcblx0XHRsZXQgcmVjdGFuZ2VsID0gcmVjdGFuZ2Vsc1tpXTtcclxuXHRcdGxldCBhbmltYXRlID0gYW5pbWF0aW9uc1tpXTtcclxuXHRcdHJlY3RhbmdlbC5hcHBlbmRDaGlsZChhbmltYXRlKTtcclxuXHRcdGdyb3VwLmFwcGVuZENoaWxkKHJlY3RhbmdlbCk7XHJcblx0XHRzdmcuYXBwZW5kQ2hpbGQoZ3JvdXApO1xyXG5cdH1cclxuXHJcblx0RE9NLmFkZENsYXNzKHN2ZywgJ2NhcnQtbG9hZGVyJyk7XHJcblxyXG5cdHJldHVybiBzdmc7XHRcclxufVxuXG4vKipcclxuICogQGZpbGUgXHJcbiAqIEZpbHRlciBjbGFzcy5cclxuICpcclxuICogVGhlIEZpbHRlciBPYmplY3QsIGhhbmRsZXMgdGhlIGZpbHRlciBvZiB0aGUgcHJvZHVjdHMvc2VydmljZXMuXHJcbiAqL1xyXG5cclxuLyoqXHJcbiAqIFRoZSBkZWZhdWx0IHNldHRpbmdzIG9mIHRoZSBmaWx0ZXIuXHJcbiAqL1xyXG5sZXQgZGVmYXVsdFNldHRpbmdzJDIgPSB7XHJcblx0ZWxlbWVudDogJy5maWx0ZXInLFxyXG5cdGNsYXNzOiAnJyxcclxuXHR3aWR0aDogJycsXHJcblx0aGVpZ2h0OiAnJyxcclxuXHRub19jc3M6IGZhbHNlLFxyXG59O1xyXG5cclxuLyoqXHJcbiAqIFN0b3JlcyB0aGUgY29udGFpbmVyIG9iamVjdC5cclxuICpcclxuICogQHZhciBcXENvcmVcXENvbnRhaW5lclxyXG4gKi9cclxubGV0IENvbnRhaW5lciQzO1xyXG5cclxuY2xhc3MgRmlsdGVyIFxyXG57XHJcblx0LyoqXHJcblx0ICogLSBJbml0aWFsaXplIHRoZSBJb0MgY29udGFpbmVyLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIFxcQ29yZVxcQ29udGFpbmVyIHwgY29udGFpbmVyXHJcblx0ICogQHJldHVybiB2b2lkXHJcblx0ICovXHJcblx0Y29uc3RydWN0b3IoY29udGFpbmVyKSBcclxuXHR7XHJcblx0XHRDb250YWluZXIkMyA9IGNvbnRhaW5lcjtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFNldHVwIHRoZSBmaWx0ZXIgY2xhc3MuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gb2JqZWN0IHwgc2V0dGluZ3NcclxuXHQgKiBAcmV0dXJuIHZvaWRcclxuXHQgKi9cclxuXHRzZXR1cChzZXR0aW5ncylcclxuXHR7XHJcblx0XHRpZih0eXBlb2Ygc2V0dGluZ3MgIT0gJ29iamVjdCcpIHtcclxuXHRcdFx0dGhyb3cgbmV3IEludmFsaWRBcmd1bWVudEV4Y2VwdGlvbiQxO1xyXG5cdFx0fVxyXG5cclxuXHRcdHRoaXMuc2V0dGluZ3MgPSBDb21tb24uZXh0ZW5kKGRlZmF1bHRTZXR0aW5ncyQyLCBzZXR0aW5ncyk7XHJcblxyXG5cdFx0ZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsIGZ1bmN0aW9uKCkge1xyXG5cclxuXHRcdFx0dGhpcy5zZXRFbGVtZW50KHRoaXMuc2V0dGluZ3MuZWxlbWVudCk7XHJcblxyXG5cdFx0XHR0aGlzLmFkZFN0eWxlVGFnKCk7XHRcclxuXHRcdH0uYmluZCh0aGlzKSk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBTZXRzIHRoZSBlbGVtZW50IHRvIGJlIGJvdW5kIHRvLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIHN0cmluZyB8IHNlbGVjdG9yXHJcblx0ICogQHJldHVybiB2b2lkXHJcblx0ICovXHJcblx0c2V0RWxlbWVudChzZWxlY3RvcilcclxuXHR7XHJcblx0XHR0aGlzLndyYXBwZXIgPSBET00uZmluZChzZWxlY3Rvcik7XHJcblx0XHRcclxuXHRcdERPTS5hZGRDbGFzcyh0aGlzLndyYXBwZXIsIHRoaXMuc2V0dGluZ3MuY2xhc3MpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQWRkIHRoZSBlQ29tbWVyY2Ugc3R5bGUgdGFncyB0byB0aGUgRE9NLlxyXG5cdCAqL1xyXG5cdGFkZFN0eWxlVGFnKCkgXHJcblx0e1xyXG5cdFx0aWYgKERPTS5maW5kKCcjVHVyYm8tZUNvbW1lcmNlLUZpbHRlcicpKSB7XHJcblx0XHRcdHJldHVybjtcclxuXHRcdH1cclxuXHJcblx0XHRpZiAodGhpcy5zZXR0aW5ncy5ub19jc3MpIHtcclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0fVxyXG5cclxuXHRcdGxldCB3aWR0aCA9ICh0aGlzLnNldHRpbmdzLndpZHRoKSA/ICd3aWR0aDonICsgdGhpcy5zZXR0aW5ncy53aWR0aCArICc7JyA6ICcnO1xyXG5cdFx0bGV0IG1pbldpZHRoID0gdGhpcy5zZXR0aW5ncy5taW5fd2lkdGggfHwgJzIwMHB4JztcclxuXHRcdGxldCBoZWlnaHQgPSB0aGlzLnNldHRpbmdzLmhlaWdodCB8fCAnYXV0byc7XHJcblxyXG5cdFx0bGV0IGNzcyA9IGBcclxuXHRcdFx0JHt0aGlzLnNldHRpbmdzLmVsZW1lbnR9IHtcclxuXHRcdFx0XHRwb3NpdGlvbjogcmVsYXRpdmU7XHJcblx0XHRcdFx0bWFyZ2luOiA1cHggNXB4O1xyXG5cdFx0XHRcdGJvcmRlcjogMXB4IHNvbGlkICNlNGU0ZTQ7XHJcblx0XHRcdFx0JHt3aWR0aH1cclxuXHRcdFx0XHRtaW4td2lkdGg6ICR7bWluV2lkdGh9O1xyXG5cdFx0XHRcdGhlaWdodDogJHtoZWlnaHR9O1xyXG5cdFx0XHRcdG1pbi1oZWlnaHQ6IDIwMHB4O1xyXG5cdFx0XHRcdGNvbG9yOiAjZmZmZmZmO1xyXG5cdFx0XHRcdG92ZXJmbG93OiBoaWRkZW47XHJcblx0XHRcdH1cclxuXHJcblx0XHRgO1xyXG5cdCAgICBcclxuXHQgICAgRE9NLmFkZFN0eWxlKCdUdXJiby1lQ29tbWVyY2UtRmlsdGVyJywgY3NzKTtcclxuXHR9XHJcbn1cblxuLyoqXHJcbiAqIEBmaWxlIFxyXG4gKiBQcm9kdWN0cyBjbGFzcy5cclxuICpcclxuICogVGhlIFByb2R1Y3RzIGNvbXBvbmVudCwgaGFuZGxlcyB0aGUgcHJvZHVjdHMgdGFza3MuXHJcbiAqL1xyXG5cclxuXHJcbi8qKlxyXG4gKiBUaGUgZGVmYXVsdCBzZXR0aW5ncyBvZiBlYWNoIHByb2R1Y3QuXHJcbiAqXHJcbiAqIEB2YXIgb2JqZWN0XHJcbiAqL1xyXG5sZXQgZGVmYXVsdFNldHRpbmdzJDMgPSB7XHJcblx0ZWxlbWVudDogJy5wcm9kdWN0cycsXHJcblx0Y2xhc3M6ICcnLFxyXG5cdGl0ZW1fY2xhc3M6ICcnLFxyXG5cdGFkZF9idXR0b25fY2xhc3M6ICdidG4gYnRuLXByaW1hcnknLFxyXG5cdGZhdm9yaXRlX2J1dHRvbl9jbGFzczogJ2J0biBidG4tZGFuZ2VyJyxcclxuXHR3aWR0aDogJzIwMHB4JyxcclxuXHRoZWlnaHQ6ICcyNTBweCcsXHJcblx0YXR0cmlidXRlczogWyduYW1lJywgJ3ByaWNlJywgJ2RlbGl2ZXJ5VGltZScsICdpbWFnZSddLFxyXG5cdHVybDogJ3Byb2R1Y3RzLnBocCcsXHJcblx0bm9fY3NzOiBmYWxzZSxcclxufTtcclxuXHJcbi8qKlxyXG4gKiBTdG9yZXMgdGhlIGNvbnRhaW5lciBvYmplY3QuXHJcbiAqIFxyXG4gKiBAdmFyIFxcQ29yZVxcQ29udGFpbmVyXHJcbiAqL1xyXG5sZXQgQ29udGFpbmVyJDQ7XHJcblxyXG4vKipcclxuICogU3RvcmVzIHRoZSBjb250YWluZXIgb2JqZWN0LlxyXG4gKiBcclxuICogQHZhciBcXENvcmVcXEV2ZW50TWFuYWdlclxyXG4gKi9cclxubGV0IEV2ZW50TWFuYWdlciQzO1xyXG5cclxuLyoqXHJcbiAqIFN0b3JlcyB0aGUgcmVxdWVzdCBvYmplY3QuXHJcbiAqIFxyXG4gKiBAdmFyIFxcSGVscGVyXFxSZXF1ZXN0IFxyXG4gKi9cclxubGV0IEh0dHAkMTtcclxuXHJcbi8qKlxyXG4gKiBTdG9yZXMgdGhlIGNodW5rZWQgcGVyIFxyXG4gKiBwYWdlIHByb2R1Y3RzLlxyXG4gKiBcclxuICogQHZhciBhcnJheVxyXG4gKi9cclxubGV0IGNodW5rZWRQcm9kdWN0cztcclxuXHJcbmNsYXNzIFByb2R1Y3RzIFxyXG57XHJcblx0LyoqXHJcblx0ICogSW5pdGFsaXplIHRoZSBDb250YWluZXIuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gXFxDb3JlXFxDb250YWluZXIgfCBjb250YWluZXJcclxuXHQgKiBAcGFyYW0gXFxIZWxwZXJzXFxSZXF1ZXN0IHwgaHR0cFxyXG5cdCAqIEByZXR1cm4gdm9pZFxyXG5cdCAqL1xyXG5cdGNvbnN0cnVjdG9yKGNvbnRhaW5lciwgaHR0cCwgZXZlbnRNYW5hZ2VyKSBcclxuXHR7XHJcblx0XHRDb250YWluZXIkNCA9IGNvbnRhaW5lcjtcclxuXHRcdEh0dHAkMSA9IGh0dHA7XHJcblx0XHRFdmVudE1hbmFnZXIkMyA9IGV2ZW50TWFuYWdlcjtcclxuXHRcdGNodW5rZWRQcm9kdWN0cyA9IFtdO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogU2V0cyB0aGUgZ2l2ZW4gc2V0dGluZ3MgZnJvbSB0aGUgdXNlci5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSBvYmplY3QgfCBzZXR0aW5nc1xyXG5cdCAqIEByZXR1cm4gdm9pZFxyXG5cdCAqL1xyXG5cdHNldHVwKHNldHRpbmdzKVxyXG5cdHtcclxuXHRcdGlmICh0eXBlb2Ygc2V0dGluZ3MgIT0gJ29iamVjdCcpIHtcclxuXHRcdFx0dGhyb3cgbmV3IEludmFsaWRBcmd1bWVudEV4Y2VwdGlvbiQxO1xyXG5cdFx0fVxyXG5cclxuXHRcdHRoaXMuc2V0dGluZ3MgPSBDb21tb24uZXh0ZW5kKGRlZmF1bHRTZXR0aW5ncyQzLCBzZXR0aW5ncyk7XHJcblx0XHR0aGlzLnRvdGFsSXRlbXMgPSBudWxsO1xyXG5cclxuXHRcdGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCBmdW5jdGlvbigpIHtcclxuXHJcblx0XHRcdHRoaXMuc2V0RWxlbWVudCh0aGlzLnNldHRpbmdzLmVsZW1lbnQpO1xyXG5cclxuXHRcdFx0dGhpcy5hZGRTdHlsZVRhZygpO1x0XHJcblxyXG5cdFx0XHR0aGlzLmxvYWRQcm9kdWN0cygxKTtcclxuXHRcdH0uYmluZCh0aGlzKSk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBMb2FkcyB0aGUgcHJvZHVjdHMgZm9yIHRoZSBwYWdlLlxyXG5cdCAqIFxyXG5cdCAqIEBwYXJhbSBudW1iZXIgfCBwYWdlTnVtYmVyXHJcblx0ICogQHJldHVybiB2b2lkXHJcblx0ICovXHJcblx0bG9hZFByb2R1Y3RzKHBhZ2VOdW1iZXIgPSAxKVxyXG5cdHtcclxuXHRcdGlmIChDb250YWluZXIkNC5QYWdpbmF0aW9uICYmIENvbnRhaW5lciQ0LlBhZ2luYXRpb24uYm9vdGVkKSB7XHJcblx0XHRcdHN3aXRjaChDb250YWluZXIkNC5QYWdpbmF0aW9uLnNldHRpbmdzLnByb2NjZXNzaW5nKSBcclxuXHRcdFx0e1xyXG5cdFx0XHRcdGNhc2UgJ2NsaWVudC1zaWRlJzpcclxuXHRcdFx0XHRcdHJldHVybiB0aGlzLmxvYWRQYWdlUHJvZHVjdHNCeUNsaWVudChwYWdlTnVtYmVyKTtcclxuXHRcdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRcdGNhc2UgJ3NlcnZlci1zaWRlJzpcclxuXHRcdFx0XHRcdHJldHVybiB0aGlzLmxvYWRQYWdlUHJvZHVjdHNCeVNlcnZlcihwYWdlTnVtYmVyKTtcclxuXHRcdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRcdGRlZmF1bHQ6XHJcblx0XHRcdFx0XHR0aHJvdyBuZXcgSW52YWxpZEFyZ3VtZW50RXhjZXB0aW9uJDEoJ2ZvciBwcm9jY2Vzc2luZyB5b3UgY2FuIGNob29zZSBcXCdzZXJ2ZXItc2lkZVxcJyBvciBcXCdjbGllbnQtc2lkZVxcJyBvcHRpb25zLicpO1xyXG5cdFx0XHR9XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHR0aGlzLmxvYWRQYWdlUHJvZHVjdHNCeVNlcnZlcigpO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogTG9hZHMgdGhlIHByb2R1Y3RzIGFuZCBcclxuXHQgKiByZXBsYWNlIHRoZW0gaW4gdGhlIGRpdiBjb250YWluZXIuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gbnVtYmVyIHwgcGFnZU51bWJlclxyXG5cdCAqIEByZXR1cm4gdm9pZFxyXG5cdCAqL1xyXG5cdGxvYWRQYWdlUHJvZHVjdHNCeVNlcnZlcihwYWdlTnVtYmVyID0gbnVsbClcclxuXHR7XHJcblx0XHRsZXQgcmVxdWVzdCA9IHRoaXMuZ2V0UHJvZHVjdHMocGFnZU51bWJlcik7XHJcblxyXG5cdFx0cmVxdWVzdC50aGVuKGZ1bmN0aW9uKHByb2R1Y3RzKSB7XHJcblxyXG5cdFx0XHR0aGlzLmN1cnJlbnRJdGVtcyA9IHByb2R1Y3RzO1xyXG5cclxuXHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLmN1cnJlbnRJdGVtcy5sZW5ndGg7IGkrKykge1xyXG5cdFx0XHRcdHZhciBwcm9kdWN0ID0gdGhpcy5jdXJyZW50SXRlbXNbaV07XHJcblx0XHRcdFx0RXZlbnRNYW5hZ2VyJDMucHVibGlzaCgncHJvZHVjdHMubG9hZGluZycsIHByb2R1Y3QpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRFdmVudE1hbmFnZXIkMy5wdWJsaXNoKCdwcm9kdWN0cy5sb2FkZWQnLCBwcm9kdWN0cyk7XHJcblx0XHRcdHRoaXMucmVwbGFjZUl0ZW1zKHByb2R1Y3RzKTtcclxuXHRcdFx0cmVzb2x2ZSgpO1xyXG5cdFx0fS5iaW5kKHRoaXMpKS5jYXRjaChmdW5jdGlvbihlcnJvcikge1xyXG5cclxuXHRcdH0pO1xyXG5cclxuXHRcdHJldHVybiByZXF1ZXN0O1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogTG9hZHMgdGhlIHByb2R1Y3RzIGFuZCBcclxuXHQgKiByZXBsYWNlIHRoZW0gaW4gdGhlIGRpdiBjb250YWluZXIuXHJcblx0ICpcclxuXHQgKiBAcmV0dXJuIHZvaWRcclxuXHQgKi9cclxuXHRsb2FkUGFnZVByb2R1Y3RzQnlDbGllbnQocGFnZU51bWJlcilcclxuXHR7XHJcblx0XHRsZXQgcmVxdWVzdDtcclxuXHJcblx0XHRpZiAodGhpcy50b3RhbEl0ZW1zID09IG51bGwpIHsgLy8gbmVlZCB0byBmZXRjaCB0aGVtIGZyb20gdGhlIHNlcnZlci5cclxuXHRcdFx0cmVxdWVzdCA9IHRoaXMuZ2V0UHJvZHVjdHMoKTtcclxuXHRcdH0gZWxzZSB7IC8vIG5vIG5lZWQgdG8gd2FpdCBjYW4gcmVzb2x2ZSBpbW1lZGlhdGVseSB3aXRoIHRoZSBwcm9kdWN0cy4gXHJcblx0XHRcdHJlcXVlc3QgPSBQcm9taXNlLnJlc29sdmUodGhpcy50b3RhbEl0ZW1zKTtcclxuXHRcdH1cclxuXHJcblx0XHRyZXF1ZXN0LnRoZW4oZnVuY3Rpb24ocHJvZHVjdHMpIHtcclxuXHRcdFx0dGhpcy50b3RhbEl0ZW1zID0gcHJvZHVjdHM7XHJcblxyXG5cdFx0XHRsZXQgcGFnZXMgPSB0aGlzLmNhbGN1bGF0ZUNsaWVudFBhZ2VzKHByb2R1Y3RzKTtcclxuXHJcblx0XHRcdHRoaXMuY3VycmVudEl0ZW1zID0gcGFnZXNbcGFnZU51bWJlci0xXTtcclxuXHJcblx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5jdXJyZW50SXRlbXMubGVuZ3RoOyBpKyspIHtcclxuXHRcdFx0XHR2YXIgcHJvZHVjdCA9IHRoaXMuY3VycmVudEl0ZW1zW2ldO1xyXG5cdFx0XHRcdEV2ZW50TWFuYWdlciQzLnB1Ymxpc2goJ3Byb2R1Y3RzLmxvYWRpbmcnLCBwcm9kdWN0KTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0RXZlbnRNYW5hZ2VyJDMucHVibGlzaCgncHJvZHVjdHMubG9hZGVkJywgcHJvZHVjdHMpO1xyXG5cdFx0XHR0aGlzLnJlcGxhY2VJdGVtcyh0aGlzLmN1cnJlbnRJdGVtcyk7XHJcblx0XHRcdFByb21pc2UucmVzb2x2ZSh0aGlzLmN1cnJlbnRJdGVtcyk7XHJcblxyXG5cdFx0fS5iaW5kKHRoaXMpKS5jYXRjaChmdW5jdGlvbihlcnJvcikge1xyXG5cclxuXHRcdH0pO1xyXG5cclxuXHRcdHJldHVybiByZXF1ZXN0O1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQ2FsY3VsYXRlcyB0aGUgYW1vdW50IG9mIHBhZ2VzIGZvciB0aGUgY2xpZW50LlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIGFycmF5IHwgcHJvZHVjdHNcclxuXHQgKiBAcmV0dXJuIGFycmF5XHJcblx0ICovXHJcblx0Y2FsY3VsYXRlQ2xpZW50UGFnZXMocHJvZHVjdHMpXHJcblx0e1x0XHJcblx0XHQvLyBXZSBhcmUgdXNpbmcgcGFnaW5hdGlvbiBzbyB3ZSBuZWVkIHRvIHVwZGF0ZSBpdCB0b28uXHJcblx0XHRDb250YWluZXIkNC5QYWdpbmF0aW9uLnNldHRpbmdzLnRvdGFsX2l0ZW1zID0gcHJvZHVjdHMubGVuZ3RoO1xyXG5cdFx0XHJcblx0XHRsZXQgcGVyUGFnZSA9IENvbnRhaW5lciQ0LlBhZ2luYXRpb24uc2V0dGluZ3MucGVyX3BhZ2U7IFxyXG5cclxuXHRcdC8vIFdlIG5lZWQgdG8gY2FsY3VsYXRlIHRoZSBwYWdlcyBvbiBmdWxsIGh0dHAgcmVxdWVzdCBcclxuXHRcdC8vIG9ubHkgb25jZS4gc28gd2UgY2hlY2sgdG8gc2VlIGlmIHdlIGhhdmUgcmVzdWx0cyBpbiBvdXIgY2FjaGUuXHJcblx0XHRpZiAoY2h1bmtlZFByb2R1Y3RzLmxlbmd0aCAhPSAwKSB7XHJcblx0XHRcdHJldHVybiBjaHVua2VkUHJvZHVjdHM7XHJcblx0XHR9XHJcblxyXG5cdFx0Y2h1bmtlZFByb2R1Y3RzID0gQ29tbW9uLmFycmF5X2NodW5rKHByb2R1Y3RzLCBwZXJQYWdlKTtcclxuXHRcdHJldHVybiBjaHVua2VkUHJvZHVjdHM7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBTZXRzIHRoZSBET00gZWxlbWVudCBcclxuXHQgKiBmb3IgcG9wdWxhdGluZyB0aGUgcHJvZHVjdHMuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gc3RyaW5nIHwgc2VsZWN0b3JcclxuXHQgKiBAcmV0dXJuIHZvaWRcclxuXHQgKi9cclxuXHRzZXRFbGVtZW50KHNlbGVjdG9yKVxyXG5cdHtcclxuXHRcdHRoaXMud3JhcHBlciA9IERPTS5maW5kKHNlbGVjdG9yKTtcclxuXHJcblx0XHRpZiAodGhpcy53cmFwcGVyKSB7XHJcblx0XHRcdERPTS5hZGRDbGFzcyh0aGlzLndyYXBwZXIsIHRoaXMuc2V0dGluZ3MuY2xhc3MpO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogUmVwbGFjZSBpdGVtcyBpbiBcclxuXHQgKiB0aGUgcHJvZHVjdHMgY29udGFpbmVyLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIGFycmF5IHwgaXRlbXNcclxuXHQgKiBAcmV0dXJuIGFycmF5XHJcblx0ICovXHJcblx0cmVwbGFjZUl0ZW1zKGl0ZW1zKSBcclxuXHR7XHJcblx0XHRpZiAoISBBcnJheS5pc0FycmF5KGl0ZW1zKSB8fCAoaXRlbXMubGVuZ3RoIDw9IDAgJiYgdHlwZW9mIGl0ZW1zWzBdID09ICdzdHJpbmcnKSkge1xyXG5cdFx0XHR0aHJvdyBuZXcgSW52YWxpZEFyZ3VtZW50RXhjZXB0aW9uJDE7XHJcblx0XHR9XHJcblxyXG5cdFx0bGV0IHByb2R1Y3RzID0gdGhpcy5idWlsZFByb2R1Y3RzKGl0ZW1zLCB0aGlzLnNldHRpbmdzLml0ZW1fY2xhc3MsICdkaXYnKTtcclxuXHJcblx0XHR0aGlzLndyYXBwZXIuaW5uZXJIVE1MID0gJyc7XHJcblx0XHRwcm9kdWN0cy5mb3JFYWNoKGZ1bmN0aW9uKHByb2R1Y3QpIHtcclxuXHRcdFx0dGhpcy53cmFwcGVyLmFwcGVuZENoaWxkKHByb2R1Y3QpO1xyXG5cdFx0fS5iaW5kKHRoaXMpKTtcclxuXHJcblx0XHRyZXR1cm4gaXRlbXM7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBNYWtlcyBhbiBBamF4IGNhbGwgdG8gdGhlIFxyXG5cdCAqIHNlcnZlciB3aXRob3V0IHBhcmFtZXRlcnMuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gbnVtYmVyIHwgcGFnZU51bWJlclxyXG5cdCAqIEByZXR1cm4gUHJvbWlzZVxyXG5cdCAqL1xyXG5cdGdldFByb2R1Y3RzKHBhZ2VOdW1iZXIgPSBudWxsKVxyXG5cdHtcclxuXHRcdGxldCBhY3Rpb24gPSAocGFnZU51bWJlcikgPyB0aGlzLnNldHRpbmdzLnVybCArICc/cGFnZT0nICsgcGFnZU51bWJlciA6IHRoaXMuc2V0dGluZ3MudXJsO1xyXG5cclxuXHRcdHJldHVybiBIdHRwJDEuZ2V0KHtcclxuXHRcdFx0dXJsOiBhY3Rpb24sXHJcblx0XHR9KTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEJ1aWxkcyB0aGUgaHRtbCBmb3IgdGhlIHByb2R1Y3RzLlxyXG5cdCAqIFxyXG5cdCAqIEBwYXJhbSBhcnJheSB8IGF0dHJpYnV0ZXNDb2xsZWN0aW9uXHJcblx0ICogQHBhcmFtIHN0cmluZyB8IGNsYXNzTmFtZVxyXG5cdCAqIEBwYXJhbSBzdHJpbmcgfCB0YWdUeXBlXHJcblx0ICogQHJldHVybiBhcnJheVxyXG5cdCAqL1xyXG5cdGJ1aWxkUHJvZHVjdHMoYXR0cmlidXRlc0NvbGxlY3Rpb24sIGNsYXNzTmFtZSwgdGFnVHlwZSkgXHJcblx0e1xyXG5cdFx0aWYoYXR0cmlidXRlc0NvbGxlY3Rpb24uY29uc3RydWN0b3IubmFtZSAhPSAnQXJyYXknICkge1xyXG5cdFx0XHR0aHJvdyBuZXcgSW52YWxpZEFyZ3VtZW50RXhjZXB0aW9uJDE7XHJcblx0XHR9XHJcblxyXG5cdFx0bGV0IGJ1aWx0UHJvZHVjdHMgPSBbXTtcclxuXHJcblx0XHRhdHRyaWJ1dGVzQ29sbGVjdGlvbi5mb3JFYWNoKGZ1bmN0aW9uKGF0dHJpYnV0ZXMpIHtcclxuXHRcdFx0bGV0IGJ1aWx0UHJvZHVjdCA9IHRoaXMuYnVpbGRQcm9kdWN0KGF0dHJpYnV0ZXMsIGNsYXNzTmFtZSwgdGFnVHlwZSk7XHJcblx0XHRcdGJ1aWx0UHJvZHVjdHMucHVzaChidWlsdFByb2R1Y3QpO1xyXG5cdFx0fS5iaW5kKHRoaXMpKTtcclxuXHJcblx0XHRyZXR1cm4gYnVpbHRQcm9kdWN0cztcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEJ1aWxkcyB0aGUgaHRtbCBmb3IgYSBzaW5nbGUgcHJvZHVjdC5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSBvYmplY3QgfCBhdHRyaWJ1dGVzXHJcblx0ICogQHBhcmFtIHN0cmluZyB8IGNsYXNzTmFtZVxyXG5cdCAqIEBwYXJhbSBzdHJpbmcgfCB0YWdUeXBlXHJcblx0ICogQHJldHVybiBvYmplY3RcclxuXHQgKi9cclxuXHRidWlsZFByb2R1Y3QoYXR0cmlidXRlcywgY2xhc3NOYW1lLCB0YWdUeXBlKSBcclxuXHR7XHJcblx0XHRpZiAodHlwZW9mIGF0dHJpYnV0ZXMgIT0gJ29iamVjdCcgfHwgdHlwZW9mIHRhZ1R5cGUgIT0gJ3N0cmluZycpIHtcclxuXHRcdFx0dGhyb3cgbmV3IEludmFsaWRBcmd1bWVudEV4Y2VwdGlvbiQxO1xyXG5cdFx0fVxyXG5cclxuXHRcdGNsYXNzTmFtZSA9IGNsYXNzTmFtZSB8fCBudWxsO1xyXG5cclxuXHRcdGxldCBwcm9kdWN0ID0gRE9NLmNyZWF0ZUVsZW1lbnQoJ2RpdicsIHtcclxuXHRcdFx0Y2xhc3M6ICdwcm9kdWN0J1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0RE9NLmFkZENsYXNzKHByb2R1Y3QsIGNsYXNzTmFtZSk7XHJcblxyXG5cdFx0bGV0IG92ZXJsYXkgPSBET00uY3JlYXRlRWxlbWVudCgnZGl2Jywge1xyXG5cdFx0XHRjbGFzczogJ3Byb2R1Y3Qtb3ZlcmxheScsXHJcblx0XHR9KTtcclxuXHJcblx0XHRwcm9kdWN0LmFwcGVuZENoaWxkKG92ZXJsYXkpO1xyXG5cclxuXHRcdGZvciAodmFyIGF0dHJpYnV0ZSBpbiBhdHRyaWJ1dGVzKSB7XHJcblx0XHRcdGlmICghIENvbW1vbi5pbl9hcnJheShhdHRyaWJ1dGUsIHRoaXMuc2V0dGluZ3MuYXR0cmlidXRlcykpIHtcclxuXHRcdFx0XHRjb250aW51ZTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0bGV0IHRhZyA9IERPTS5jcmVhdGVFbGVtZW50KHRhZ1R5cGUpO1xyXG5cclxuXHRcdFx0aWYgKGF0dHJpYnV0ZSA9PSAnaW1hZ2UnKSB7XHJcblx0XHRcdFx0bGV0IGltYWdlID0gRE9NLmNyZWF0ZUVsZW1lbnQoJ2ltZycsIHtcclxuXHRcdFx0XHRcdHNyYzogYXR0cmlidXRlc1thdHRyaWJ1dGVdXHJcblx0XHRcdFx0fSk7XHJcblx0XHRcdFx0cHJvZHVjdC5hcHBlbmRDaGlsZChpbWFnZSk7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0dGFnLmlubmVySFRNTCA9IGF0dHJpYnV0ZXNbYXR0cmlidXRlXSB8fCAnJztcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0RE9NLmFkZENsYXNzKHRhZywgJ3Byb2R1Y3QtJyArIFN0ci5rZWJhYkNhc2UoYXR0cmlidXRlKSk7XHJcblx0XHRcdG92ZXJsYXkuYXBwZW5kQ2hpbGQodGFnKTtcclxuXHRcdH1cclxuXHJcblx0XHRsZXQgdGFnID0gRE9NLmNyZWF0ZUVsZW1lbnQoJ2RpdicsIHtcclxuXHRcdFx0Y2xhc3M6ICdhY3Rpb24tYnV0dG9ucydcclxuXHRcdH0pO1xyXG5cclxuXHRcdGxldCBhZGRUb0NhcnQgPSBET00uY3JlYXRlRWxlbWVudCgnYnV0dG9uJywge1xyXG5cdFx0XHRjbGFzczogJ2FkZC10by1jYXJ0JyxcclxuXHRcdFx0dHlwZTogJ2J1dHRvbicsXHJcblx0XHRcdHRleHQ6ICcrJyxcclxuXHRcdH0pO1xyXG5cclxuXHRcdGxldCBmYXZvcml0ZSA9IERPTS5jcmVhdGVFbGVtZW50KCdidXR0b24nLCB7XHJcblx0XHRcdGNsYXNzOiAnZmF2b3JpdGUnLFxyXG5cdFx0XHR0eXBlOiAnYnV0dG9uJyxcclxuXHRcdFx0dGV4dDogJyZoZWFydHM7J1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0aWYgKHRoaXMuc2V0dGluZ3MuYWRkX2J1dHRvbl9jbGFzcykge1xyXG5cdFx0XHRET00uYWRkQ2xhc3MoYWRkVG9DYXJ0LCB0aGlzLnNldHRpbmdzLmFkZF9idXR0b25fY2xhc3MpO1xyXG5cdFx0fVxyXG5cclxuXHRcdGlmICh0aGlzLnNldHRpbmdzLmZhdm9yaXRlX2J1dHRvbl9jbGFzcykge1xyXG5cdFx0XHRET00uYWRkQ2xhc3MoZmF2b3JpdGUsIHRoaXMuc2V0dGluZ3MuZmF2b3JpdGVfYnV0dG9uX2NsYXNzKTtcclxuXHRcdH1cclxuXHJcblx0XHR0YWcuYXBwZW5kQ2hpbGQoYWRkVG9DYXJ0KTtcclxuXHRcdHRhZy5hcHBlbmRDaGlsZChmYXZvcml0ZSk7XHJcblxyXG5cdFx0YWRkVG9DYXJ0LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xyXG5cdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XHJcblx0XHRcdEV2ZW50TWFuYWdlciQzLnB1Ymxpc2goJ2NhcnQucHJvZHVjdC5hZGRlZCcsIGF0dHJpYnV0ZXMpO1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0ZmF2b3JpdGUuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbihlKSB7XHJcblx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcclxuXHRcdFx0dGhpcy5pbm5lckhUTUwgPSAnJiN4MjcxMzsnO1xyXG5cdFx0XHRFdmVudE1hbmFnZXIkMy5wdWJsaXNoKCdjYXJ0LnByb2R1Y3QuZmF2b3JpdGVkJywgYXR0cmlidXRlcyk7XHJcblx0XHR9KTtcclxuXHJcblx0XHRvdmVybGF5LmFwcGVuZENoaWxkKHRhZyk7XHJcblxyXG5cdFx0cmV0dXJuIHByb2R1Y3Q7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBBZGQgdGhlIGVDb21tZXJjZSBzdHlsZSB0YWdzIHRvIHRoZSBET00uXHJcblx0ICovXHJcblx0YWRkU3R5bGVUYWcoKSBcclxuXHR7XHJcblx0XHRpZiAoRE9NLmZpbmQoJyNUdXJiby1lQ29tbWVyY2UtUHJvZHVjdHMnKSkge1xyXG5cdFx0XHRyZXR1cm47XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKHRoaXMuc2V0dGluZ3Mubm9fY3NzKSB7XHJcblx0XHRcdHJldHVybjtcclxuXHRcdH1cclxuXHJcblx0XHRsZXQgd2lkdGggPSB0aGlzLnNldHRpbmdzLndpZHRoIHx8ICdhdXRvJztcclxuXHRcdGxldCBoZWlnaHQgPSB0aGlzLnNldHRpbmdzLmhlaWdodCB8fCAnMjAwcHgnO1xyXG5cdFx0bGV0IG1pbldpZHRoID0gdGhpcy5zZXR0aW5ncy5taW5fd2lkdGggfHwgJzIwMHB4JztcclxuXHRcdGxldCBtYXhXaWR0aCA9IHRoaXMuc2V0dGluZ3MubWF4X3dpZHRoIHx8ICcyNTBweCc7XHJcblxyXG5cdFx0bGV0IGNzcyA9IGBcclxuXHRcdFx0LnByb2R1Y3Qge1xyXG5cdFx0XHRcdHBvc2l0aW9uOiByZWxhdGl2ZTtcclxuXHRcdFx0XHRtYXJnaW46IDVweCA1cHg7XHJcblx0XHRcdFx0Ym9yZGVyOiAxcHggc29saWQgI2U0ZTRlNDtcclxuXHRcdFx0XHR3aWR0aDogJHt3aWR0aH07XHJcblx0XHRcdFx0bWluLXdpZHRoOiAke21pbldpZHRofTtcclxuXHRcdFx0XHRtYXgtd2lkdGg6ICR7bWF4V2lkdGh9O1xyXG5cdFx0XHRcdGhlaWdodDogJHtoZWlnaHR9O1xyXG5cdFx0XHRcdGN1cnNvcjogcG9pbnRlcjtcclxuXHRcdFx0XHRjb2xvcjogI2ZmZmZmZjtcclxuXHRcdFx0XHRvdmVyZmxvdzogaGlkZGVuO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHQucHJvZHVjdCA+IC5wcm9kdWN0LW92ZXJsYXkge1xyXG5cdFx0XHRcdHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuXHRcdFx0XHR0b3A6IDA7XHJcblx0XHRcdFx0bGVmdDogMDtcclxuXHRcdFx0XHR3aWR0aDogMTAwJTtcclxuXHRcdFx0XHRoZWlnaHQ6IDEwMCU7XHJcblx0XHRcdFx0b3BhY2l0eTogMC41O1xyXG5cdFx0XHRcdHotaW5kZXg6IDU7XHJcblx0XHRcdFx0dHJhbnNpdGlvbjogMXMgYWxsO1xyXG5cdFx0XHRcdHRyYW5zZm9ybTogdHJhbnNsYXRlWCgtMjUwcHgpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHQucHJvZHVjdDpob3ZlciA+IC5wcm9kdWN0LW92ZXJsYXkge1xyXG5cdFx0XHRcdGJhY2tncm91bmQ6IHJnYmEoMCwgMCwgMCwgMC40NSk7XHJcblx0XHRcdFx0dHJhbnNmb3JtOiB0cmFuc2xhdGVYKDBweCk7XHJcblx0XHRcdFx0b3BhY2l0eTogMTtcclxuXHRcdFx0XHR0cmFuc2l0aW9uOiAwLjVzIGFsbDtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0LnByb2R1Y3QgPiBpbWcge1xyXG5cdFx0XHRcdHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuXHRcdFx0XHRsZWZ0OiAwO1xyXG5cdFx0XHRcdHRvcDogMDtcclxuXHRcdFx0XHR3aWR0aDogMTAwJTtcclxuXHRcdFx0XHRoZWlnaHQ6IDEwMCU7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdC5wcm9kdWN0ID4gLnByb2R1Y3QtaW1hZ2Uge1xyXG5cdFx0XHRcdHotaW5kZXg6IDA7XHJcblx0XHRcdFx0cG9zaXRpb246IGFic29sdXRlO1xyXG5cdFx0XHRcdHRvcDogMDtcclxuXHRcdFx0XHRsZWZ0OiAwO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHQucHJvZHVjdCA+IC5wcm9kdWN0LW92ZXJsYXkgPiAucHJvZHVjdC1uYW1lLCBcclxuXHRcdFx0LnByb2R1Y3QgPiAucHJvZHVjdC1vdmVybGF5ID4gLnByb2R1Y3QtcHJpY2UsXHJcblx0XHRcdC5wcm9kdWN0ID4gLnByb2R1Y3Qtb3ZlcmxheSA+IC5wcm9kdWN0LWRlbGl2ZXJ5LXRpbWUge1xyXG5cdFx0XHRcdHotaW5kZXg6IDE7XHJcblx0XHRcdFx0cG9zaXRpb246IHJlbGF0aXZlO1xyXG5cdFx0XHRcdHRleHQtYWxpZ246IGNlbnRlcjtcclxuXHRcdFx0XHRtYXJnaW4tdG9wOiAyNXB4O1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHQucHJvZHVjdCA+IC5wcm9kdWN0LW92ZXJsYXkgPiAuYWN0aW9uLWJ1dHRvbnMge1xyXG5cdFx0XHRcdHdpZHRoOiAxMDAlO1xyXG5cdFx0XHRcdG1hcmdpbi10b3A6IDEwcHg7XHJcblx0XHRcdFx0dGV4dC1hbGlnbjogY2VudGVyO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHQucHJvZHVjdCA+IC5wcm9kdWN0LW92ZXJsYXkgPiAuYWN0aW9uLWJ1dHRvbnMgPiAuZmF2b3JpdGUge1xyXG5cdFx0XHRcdG1hcmdpbi1sZWZ0OiAxMHB4O1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0YDtcclxuXHQgICAgXHJcblx0ICAgIERPTS5hZGRTdHlsZSgnVHVyYm8tZUNvbW1lcmNlLVByb2R1Y3RzJywgY3NzKTtcclxuXHR9XHJcbn1cblxuLyoqXHJcbiAqIFRoZSBTZXJ2aWNlcyBPYmplY3QsIGhhbmRsZXMgdGhlIHNlcnZpY2VzLlxyXG4gKi9cclxuY2xhc3MgU2VydmljZXMgXHJcbntcclxuXHJcbn1cblxubGV0IGRlZmF1bHRNZXNzYWdlJDQgPSAnc29ycnksIG5vIG1vcmUgcGFnZXMuJztcclxuXHJcbmNsYXNzIE5vdEluUGFnZVJhbmdlRXhjZXB0aW9uIGV4dGVuZHMgRXhjZXB0aW9uSGFuZGxlclxyXG57XHJcblx0Y29uc3RydWN0b3IobWVzc2FnZSA9IG51bGwpIFxyXG5cdHtcclxuXHRcdG1lc3NhZ2UgPSBtZXNzYWdlIHx8IGRlZmF1bHRNZXNzYWdlJDQ7XHJcblx0XHRzdXBlcigpO1xyXG4gICAgXHRzdXBlci5zdGFja1RyYWNlKHRoaXMsIG1lc3NhZ2UpO1xyXG4gICAgfVxyXG59XG5cbi8qKlxyXG4gKiBAZmlsZSBcclxuICogUGFnaW5hdGlvbiBjbGFzcy5cclxuICpcclxuICogVGhlIFBhZ2luYXRpb24gY29tcG9uZW50LCBoYW5kbGVzIHRoZSBwYWdpbmF0aW9uLlxyXG4gKi9cclxuXHJcbi8qKlxyXG4gKiBUaGUgZGVmYXVsdCBzZXR0aW5ncyBvZiB0aGUgcGFnaW5hdGlvbi5cclxuICpcclxuICogQHZhciBvYmplY3RcclxuICovXHJcbmxldCBkZWZhdWx0U2V0dGluZ3MkNCA9IHtcclxuXHRlbGVtZW50OiAnLnBhZ2luYXRpb24tbGlua3MnLFxyXG5cdHByb2NjZXNzaW5nOiAnY2xpZW50LXNpZGUnLFxyXG5cdGNsYXNzOiAnJyxcclxuXHRwZXJfcGFnZTogNSxcclxuXHR0b3RhbF9pdGVtczogNSxcclxufTtcclxuXHJcbi8qKlxyXG4gKiBTdG9yZXMgdGhlIGNvbnRhaW5lciBvYmplY3QuXHJcbiAqXHJcbiAqIEB2YXIgXFxDb3JlXFxDb250YWluZXJcclxuICovXHJcbmxldCBDb250YWluZXIkNTtcclxuXHJcbi8qKlxyXG4gKiBTdG9yZXMgdGhlIHByb2R1Y3RzIGNvbXBvbmVudC5cclxuICpcclxuICogQHZhciBcXENvbXBvbmVudHNcXFByb2R1Y3RzXHJcbiAqL1xyXG5sZXQgUHJvZHVjdHMkMjtcclxuXHJcbi8qKlxyXG4gKiBTdG9yZXMgdGhlIGNvbnRhaW5lciBvYmplY3QuXHJcbiAqIFxyXG4gKiBAdmFyIFxcQ29yZVxcRXZlbnRNYW5hZ2VyXHJcbiAqL1xyXG5sZXQgRXZlbnRNYW5hZ2VyJDQ7XHJcblxyXG5jbGFzcyBQYWdpbmF0aW9uIFxyXG57XHJcblx0LyoqXHJcblx0ICogLSBJbml0aWFsaXplIHRoZSBjb250YWluZXIgb2JqZWN0LlxyXG5cdCAqIC0gSW5pdGlhbGl6ZSB0aGUgcHJvZHVjdHMgY29tcG9uZW50LlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIFxcQ29yZVxcQ29udGFpbmVyIHwgY29udGFpbmVyXHJcblx0ICogQHBhcmFtIFxcQ29tcG9uZW50c1xcUHJvZHVjdHMgfCBwcm9kdWN0c1xyXG5cdCAqIEByZXR1cm4gdm9pZFxyXG5cdCAqL1xyXG5cdGNvbnN0cnVjdG9yKGNvbnRhaW5lciwgcHJvZHVjdHMsIGV2ZW50cykgXHJcblx0e1xyXG5cdFx0dGhpcy5zZXRDdXJyZW50KDEpO1xyXG5cdFx0Q29udGFpbmVyJDUgPSBjb250YWluZXI7XHJcblx0XHRQcm9kdWN0cyQyID0gcHJvZHVjdHM7XHJcblx0XHRFdmVudE1hbmFnZXIkNCA9IGV2ZW50cztcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFNldHVwIHRoZSBwYWdpbmF0aW9uLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIG9iamVjdCB8IHNldHRpbmdzXHJcblx0ICogQHJldHVybiB2b2lkXHJcblx0ICovXHJcblx0c2V0dXAoc2V0dGluZ3MpXHJcblx0e1x0XHJcblx0XHRpZih0eXBlb2Ygc2V0dGluZ3MgIT0gJ29iamVjdCcpIHtcclxuXHRcdFx0dGhyb3cgbmV3IEludmFsaWRBcmd1bWVudEV4Y2VwdGlvbiQxO1xyXG5cdFx0fVxyXG5cclxuXHRcdHRoaXMuc2V0dGluZ3MgPSBDb21tb24uZXh0ZW5kKGRlZmF1bHRTZXR0aW5ncyQ0LCBzZXR0aW5ncyk7XHJcblxyXG5cdFx0dGhpcy5zZXRFbGVtZW50KHRoaXMuc2V0dGluZ3MuZWxlbWVudCk7XHJcblxyXG5cdFx0Ly8gTGlzdGVuIHRvIHdoZW4gcHJvZHVjdHMgYXJlIGJlaW5nIGxvYWRlZCBhbmQgdXBkYXRlIHRoZSBwYWdpbmF0aW9uXHJcblx0XHQvLyB3aXRoIHRoZSBhY3R1YWwgaXRlbXMgY291bnQuXHJcblx0XHRFdmVudE1hbmFnZXIkNC5zdWJzY3JpYmUoJ3Byb2R1Y3RzLmxvYWRlZCcsIGZ1bmN0aW9uKHByb2R1Y3RzKSB7XHJcblx0XHRcdHRoaXMudG90YWxQYWdlcyA9IHRoaXMuY2FsY3VsYXRlVG90YWxQYWdlcyh0aGlzLnNldHRpbmdzLnBlcl9wYWdlLCBwcm9kdWN0cy5sZW5ndGgpO1xyXG5cdFx0XHR0aGlzLmJ1aWxkUGFnaW5hdGlvbigpO1xyXG5cdFx0fS5iaW5kKHRoaXMpKTtcclxuXHJcblx0XHQvLyBBcyBhIGZhbGxiYWNrIGNob29zZSB0aGUgdXNlcidzIHNldHRpbmdzIGZvciB0aGUgdG90YWwgaXRlbXMgY291bnQuXHJcblx0XHR0aGlzLnRvdGFsUGFnZXMgPSB0aGlzLmNhbGN1bGF0ZVRvdGFsUGFnZXModGhpcy5zZXR0aW5ncy5wZXJfcGFnZSwgdGhpcy5zZXR0aW5ncy50b3RhbF9pdGVtcyk7XHJcblx0XHR0aGlzLmJ1aWxkUGFnaW5hdGlvbigpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQnVpbGRzIHRoZSBwYWdpbmF0aW9uLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIFxyXG5cdCAqIEByZXR1cm4gXHJcblx0ICovXHJcblx0YnVpbGRQYWdpbmF0aW9uKClcclxuXHR7XHJcblx0XHR0aGlzLmxpbmtzID0gdGhpcy5jcmVhdGVMaW5rcygpO1xyXG5cdFx0dGhpcy5yZXBsYWNlTGlua3ModGhpcy5saW5rcyk7XHJcblx0XHR0aGlzLmJpbmRFdmVudExpc3RlbmVycyh0aGlzLmxpbmtzKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFNldHMgdGhlIHdyYXBwZXIgZWxlbWVudC5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSBzdHJpbmcgfCBzZWxlY3RvclxyXG5cdCAqIEByZXR1cm4gdm9pZFxyXG5cdCAqL1xyXG5cdHNldEVsZW1lbnQoc2VsZWN0b3IpXHJcblx0e1xyXG5cdFx0dGhpcy53cmFwcGVyID0gRE9NLmZpbmQoc2VsZWN0b3IpO1xyXG5cdFx0XHJcblx0XHRET00uYWRkQ2xhc3ModGhpcy53cmFwcGVyLCB0aGlzLnNldHRpbmdzLmNsYXNzKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFJlcGxhY2VzIHRoZSBsaW5rcyBpbiB0aGUgd3JhcHBlci5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSBIVE1MVUxpc3RFbGVtZW50IHwgbGlua3NcclxuXHQgKiBAcmV0dXJuIHZvaWRcclxuXHQgKi9cclxuXHRyZXBsYWNlTGlua3MobGlua3MpXHJcblx0e1xyXG5cdFx0dGhpcy53cmFwcGVyLmlubmVySFRNTCA9ICcnO1xyXG5cdFx0dGhpcy53cmFwcGVyLmFwcGVuZENoaWxkKGxpbmtzKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIENhbGN1bGF0ZXMgdGhlIHRvdGFsIHBhZ2VzLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIG51bWJlciB8IHBlclBhZ2VcclxuXHQgKiBAcGFyYW0gbnVtYmVyIHwgdG90YWxJdGVtc1xyXG5cdCAqIEByZXR1cm4gbnVtYmVyXHJcblx0ICovXHJcblx0Y2FsY3VsYXRlVG90YWxQYWdlcyhwZXJQYWdlLCB0b3RhbEl0ZW1zKVxyXG5cdHtcclxuXHRcdHBlclBhZ2UgPSBwYXJzZUludChwZXJQYWdlKTtcclxuXHRcdHRvdGFsSXRlbXMgPSBwYXJzZUludCh0b3RhbEl0ZW1zKTtcclxuXHJcblx0XHRyZXR1cm4gTWF0aC5jZWlsKHRvdGFsSXRlbXMgLyBwZXJQYWdlKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEJpbmRzIHRoZSBidXR0b25zIGV2ZW50cyBsaXN0ZW5lcnMuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gSFRNTFVMaXN0RWxlbWVudCB8IGxpbmtzXHJcblx0ICogQHJldHVybiB2b2lkXHJcblx0ICovXHJcblx0YmluZEV2ZW50TGlzdGVuZXJzKGxpbmtzKSBcclxuXHR7XHJcblx0XHRsZXQgaW5zdGFuY2UgPSB0aGlzO1xyXG5cclxuXHRcdHRoaXMubmV4dC5jaGlsZE5vZGVzWzBdLm9uY2xpY2sgPSBmdW5jdGlvbihlKSB7XHJcblx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcclxuXHJcblx0XHRcdGxldCByZXF1ZXN0ZWRQYWdlID0gaW5zdGFuY2UuY3VycmVudCsxO1xyXG5cclxuXHRcdFx0aWYgKGluc3RhbmNlLm5vdEluUGFnZVJhbmdlKHJlcXVlc3RlZFBhZ2UpKSB7XHJcblx0XHRcdFx0dGhyb3cgbmV3IE5vdEluUGFnZVJhbmdlRXhjZXB0aW9uKCdUaGUgcGFnZSB5b3UgcmVxdWVzdGluZyBkb2VzIG5vdCBleGlzdHMnKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0UHJvZHVjdHMkMi5sb2FkUHJvZHVjdHMocmVxdWVzdGVkUGFnZSkudGhlbihmdW5jdGlvbihwcm9kdWN0cykge1xyXG5cdFx0XHRcdGluc3RhbmNlLnNldEN1cnJlbnQocmVxdWVzdGVkUGFnZSk7XHJcblx0XHRcdH0pO1xyXG5cdFx0fTtcclxuXHJcblx0XHR0aGlzLnByZXZpb3VzLmNoaWxkTm9kZXNbMF0ub25jbGljayA9IGZ1bmN0aW9uKGUpIHtcclxuXHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuXHRcdFx0bGV0IHJlcXVlc3RlZFBhZ2UgPSBpbnN0YW5jZS5jdXJyZW50LTE7XHJcblxyXG5cdFx0XHRpZihpbnN0YW5jZS5ub3RJblBhZ2VSYW5nZShyZXF1ZXN0ZWRQYWdlKSkge1xyXG5cdFx0XHRcdHRocm93IG5ldyBOb3RJblBhZ2VSYW5nZUV4Y2VwdGlvbignVGhlIHBhZ2UgeW91IHJlcXVlc3RpbmcgZG9lcyBub3QgZXhpc3RzJyk7XHJcblx0XHRcdH1cclxuXHRcdFx0XHJcblx0XHRcdFByb2R1Y3RzJDIubG9hZFByb2R1Y3RzKHJlcXVlc3RlZFBhZ2UpLnRoZW4oZnVuY3Rpb24ocHJvZHVjdHMpIHtcclxuXHRcdFx0XHRpbnN0YW5jZS5zZXRDdXJyZW50KHJlcXVlc3RlZFBhZ2UpO1xyXG5cdFx0XHR9KTtcclxuXHRcdH07XHJcblxyXG5cdFx0Zm9yKHZhciBpID0gMDsgaSA8IHRoaXMucGFnZXMubGVuZ3RoOyBpKyspIHtcclxuXHRcdFx0dGhpcy5wYWdlc1tpXS5jaGlsZE5vZGVzWzBdLm9uY2xpY2sgPSBmdW5jdGlvbihlKSB7XHJcblx0XHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdFx0XHRcdFxyXG5cdFx0XHRcdGxldCByZXF1ZXN0ZWRQYWdlID0gdGhpcy5nZXRBdHRyaWJ1dGUoJ2RhdGEtcGFnZS1ucicpO1xyXG5cdFx0XHRcdFxyXG5cdFx0XHRcdFByb2R1Y3RzJDIubG9hZFByb2R1Y3RzKHJlcXVlc3RlZFBhZ2UpLnRoZW4oZnVuY3Rpb24ocHJvZHVjdHMpIHtcclxuXHRcdFx0XHRcdGluc3RhbmNlLnNldEN1cnJlbnQocmVxdWVzdGVkUGFnZSk7XHJcblx0XHRcdFx0fSk7XHJcblx0XHRcdH07XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBTZXRzIHRoZSBjdXJyZW50IHBhZ2UuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gbnVtYmVyIHwgcGFnZU51bWJlclxyXG5cdCAqIEByZXR1cm4gdm9pZFxyXG5cdCAqL1xyXG5cdHNldEN1cnJlbnQocGFnZU51bWJlcikgXHJcblx0e1xyXG5cdFx0dGhpcy5jdXJyZW50ID0gcGFyc2VJbnQocGFnZU51bWJlcik7XHJcblx0XHR0aGlzLmNoYW5nZVVybChwYWdlTnVtYmVyKTtcclxuXHRcdHRoaXMuc2V0QWN0aXZlTGluayhwYWdlTnVtYmVyKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEdldHMgdGhlIGN1cnJlbnQgcGFnZS5cclxuXHQgKlxyXG5cdCAqIEByZXR1cm4gbnVtYmVyXHJcblx0ICovXHJcblx0Z2V0Q3VycmVudCgpIFxyXG5cdHtcclxuXHRcdHJldHVybiB0aGlzLmN1cnJlbnQ7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBDcmVhdGVzIHRoZSBwYWdpbmF0aW9uIGxpbmtzLlxyXG5cdCAqXHJcblx0ICogQHJldHVybiBIVE1MVUxpc3RFbGVtZW50XHJcblx0ICovXHJcblx0Y3JlYXRlTGlua3MoKSBcclxuXHR7XHJcblx0XHRsZXQgdWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd1bCcpO1xyXG5cdFx0XHJcblx0XHR0aGlzLnBhZ2VzID0gdGhpcy5jcmVhdGVQYWdlTGlua3MoKTtcclxuXHRcdHRoaXMucHJldmlvdXMgPSB0aGlzLmNyZWF0ZVByZXZpb3VzQnV0dG9uKCk7XHJcblx0XHR0aGlzLm5leHQgPSB0aGlzLmNyZWF0ZU5leHRCdXR0b24oKTtcclxuXHJcblx0XHR1bC5jbGFzc05hbWUgPSAncGFnaW5hdGlvbic7XHJcblx0XHR1bC5hcHBlbmRDaGlsZCh0aGlzLnByZXZpb3VzKTtcclxuXHJcblx0XHR0aGlzLnBhZ2VzLmZvckVhY2goZnVuY3Rpb24ocGFnZSkge1xyXG5cdFx0XHR1bC5hcHBlbmRDaGlsZChwYWdlKTtcclxuXHRcdH0pO1xyXG5cclxuXHRcdHVsLmFwcGVuZENoaWxkKHRoaXMubmV4dCk7XHJcblxyXG5cdFx0cmV0dXJuIHVsO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQ3JlYXRlcyB0aGUgcGFnZXMgaXRlbSBsaW5rcy5cclxuXHQgKlxyXG5cdCAqIEByZXR1cm4gYXJyYXk8SFRNTExJRWxlbWVudD5cclxuXHQgKi9cclxuXHRjcmVhdGVQYWdlTGlua3MoKSBcclxuXHR7XHJcblx0XHR2YXIgcGFnZXMgPSBbXTtcclxuXHJcblx0XHRmb3IodmFyIGkgPSAxOyBpIDw9IHRoaXMudG90YWxQYWdlczsgaSsrKSB7XHJcblx0XHRcdHZhciBwYWdlSXRlbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJyk7XHJcblx0XHRcdHZhciBsaW5rID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpO1xyXG5cdFx0XHRwYWdlSXRlbS5jbGFzc05hbWUgPSAodGhpcy5jdXJyZW50ID09IGkpID8gJ3BhZ2UtaXRlbSBhY3RpdmUnIDogJ3BhZ2UtaXRlbSc7XHJcblx0XHRcdGxpbmsuY2xhc3NOYW1lID0gJ3BhZ2UtbGluayc7XHJcblx0XHRcdGxpbmsuc2V0QXR0cmlidXRlKCdocmVmJywgJz9wYWdlPScrIGkpO1xyXG5cdFx0XHRsaW5rLnNldEF0dHJpYnV0ZSgnZGF0YS1wYWdlLW5yJywgaSk7XHJcblx0XHRcdGxpbmsuaW5uZXJIVE1MID0gaTtcclxuXHRcdFx0cGFnZUl0ZW0uYXBwZW5kQ2hpbGQobGluayk7XHJcblx0XHRcdHBhZ2VzLnB1c2gocGFnZUl0ZW0pO1xyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiBwYWdlcztcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIENyZWF0ZXMgdGhlIHByZXZpb3VzIGJ1dHRvbiBsaW5rLlxyXG5cdCAqXHJcblx0ICogQHJldHVybiBIVE1MTElFbGVtZW50XHJcblx0ICovXHJcblx0Y3JlYXRlUHJldmlvdXNCdXR0b24oKSBcclxuXHR7XHJcblx0XHR2YXIgbGkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaScpO1xyXG5cdFx0dmFyIGxpbmsgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJyk7XHJcblx0XHR2YXIgc3BhbjEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XHJcblx0XHR2YXIgc3BhbjIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XHJcblx0XHRcclxuXHRcdFxyXG5cdFx0bGkuY2xhc3NOYW1lID0gJ3BhZ2UtaXRlbSc7XHJcblx0XHRsaW5rLmNsYXNzTmFtZSA9ICdwYWdlLWxpbmsnO1xyXG5cdFx0c3BhbjIuY2xhc3NOYW1lID0gJ3NyLW9ubHknO1xyXG5cclxuXHRcdGxpbmsuc2V0QXR0cmlidXRlKCdocmVmJywgJycpO1xyXG5cdFx0bGluay5zZXRBdHRyaWJ1dGUoJ2FyaWEtbGFiZWwnLCAnUHJldmlvdXMnKTtcclxuXHRcdHNwYW4xLnNldEF0dHJpYnV0ZSgnYXJpYS1oaWRkZW4nLCAndHJ1ZScpO1xyXG5cclxuXHRcdHNwYW4xLmlubmVySFRNTCA9ICcmbGFxdW87JztcclxuXHRcdHNwYW4yLmlubmVySFRNTCA9ICdQcmV2aW91cyc7XHJcblxyXG5cdFx0bGluay5hcHBlbmRDaGlsZChzcGFuMSk7XHJcblx0XHRsaW5rLmFwcGVuZENoaWxkKHNwYW4yKTtcclxuXHRcdGxpLmFwcGVuZENoaWxkKGxpbmspO1xyXG5cclxuXHRcdHJldHVybiBsaTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIENyZWF0ZXMgdGhlIG5leHQgYnV0dG9uIGxpbmsuXHJcblx0ICpcclxuXHQgKiBAcmV0dXJuIEhUTUxMSUVsZW1lbnRcclxuXHQgKi9cclxuXHRjcmVhdGVOZXh0QnV0dG9uKCkgXHJcblx0e1xyXG5cdFx0dmFyIGxpID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKTtcclxuXHRcdHZhciBsaW5rID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpO1xyXG5cdFx0dmFyIHNwYW4xID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xyXG5cdFx0dmFyIHNwYW4yID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xyXG5cdFx0XHJcblx0XHRsaS5jbGFzc05hbWUgPSAncGFnZS1pdGVtJztcclxuXHRcdGxpbmsuY2xhc3NOYW1lID0gJ3BhZ2UtbGluayc7XHJcblx0XHRzcGFuMi5jbGFzc05hbWUgPSAnc3Itb25seSc7XHJcblxyXG5cdFx0bGluay5zZXRBdHRyaWJ1dGUoJ2hyZWYnLCAnJyk7XHJcblx0XHRsaW5rLnNldEF0dHJpYnV0ZSgnYXJpYS1sYWJlbCcsICdOZXh0Jyk7XHJcblx0XHRzcGFuMS5zZXRBdHRyaWJ1dGUoJ2FyaWEtaGlkZGVuJywgJ3RydWUnKTtcclxuXHJcblx0XHRzcGFuMS5pbm5lckhUTUwgPSAnJnJhcXVvOyc7XHJcblx0XHRzcGFuMi5pbm5lckhUTUwgPSAnTmV4dCc7XHJcblxyXG5cdFx0bGluay5hcHBlbmRDaGlsZChzcGFuMSk7XHJcblx0XHRsaW5rLmFwcGVuZENoaWxkKHNwYW4yKTtcclxuXHRcdGxpLmFwcGVuZENoaWxkKGxpbmspO1xyXG5cclxuXHRcdHJldHVybiBsaTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIENoZWNrcyBpZiB0aGUgZ2l2ZW4gcGFnZSBpcyBpbiByYW5nZS5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSBudW1iZXIgfCBwYWdlTnVtYmVyXHJcblx0ICogQHJldHVybiBib29sXHJcblx0ICovXHJcblx0bm90SW5QYWdlUmFuZ2UocGFnZU51bWJlcikgXHJcblx0e1xyXG5cdFx0cmV0dXJuIChwYWdlTnVtYmVyID4gdGhpcy50b3RhbFBhZ2VzIHx8IHBhZ2VOdW1iZXIgPD0gMCkgfHwgaXNOYU4ocGFnZU51bWJlcik7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBDaGFuZ2VzIHRoZSB1cmwgdG8gYSBnaXZlbiBwYWdlIG51bWJlci5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSBudW1iZXIgfCBwYWdlTnVtYmVyXHJcblx0ICogQHJldHVybiB2b2lkXHJcblx0ICovXHJcblx0Y2hhbmdlVXJsKHBhZ2VOdW1iZXIpIFxyXG5cdHtcclxuXHRcdHBhZ2VOdW1iZXIgPSAgcGFnZU51bWJlciB8fCBxdWVyeVN0cmluZygpWydwYWdlJ107XHJcblx0XHR3aW5kb3cuaGlzdG9yeS5yZXBsYWNlU3RhdGUoJycsICcnLCB0aGlzLnVwZGF0ZVVSTFBhcmFtZXRlcih3aW5kb3cubG9jYXRpb24uaHJlZiwgJ3BhZ2UnLCBwYWdlTnVtYmVyKSk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBTZXRzIHRoZSBhY3RpdmUgbGluay5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSBudW1iZXIgfCBwYWdlTnVtYmVyXHJcblx0ICogQHJldHVybiB2b2lkXHJcblx0ICovXHJcblx0c2V0QWN0aXZlTGluayhwYWdlTnVtYmVyKVxyXG5cdHtcclxuXHRcdGZvcih2YXIgcGFnZSBpbiB0aGlzLnBhZ2VzKSB7XHJcblx0XHRcdGlmICh0aGlzLnBhZ2VzW3BhZ2VdLmNoaWxkTm9kZXNbMF0uZ2V0QXR0cmlidXRlKCdkYXRhLXBhZ2UtbnInKSA9PSBwYWdlTnVtYmVyKSB7XHJcblx0XHRcdFx0RE9NLmFkZENsYXNzKHRoaXMucGFnZXNbcGFnZV0sICdhY3RpdmUnKTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRET00ucmVtb3ZlQ2xhc3ModGhpcy5wYWdlc1twYWdlXSwgJ2FjdGl2ZScpO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBHZXQgdGhlIGdldCB2YXJpYWJsZXMgZnJvbSB0aGUgdXJsLlxyXG5cdCAqXHJcblx0ICogQHJldHVybiBhcnJheVxyXG5cdCAqL1xyXG5cdHF1ZXJ5U3RyaW5nKCkgXHJcblx0e1xyXG5cdFx0dmFyIHZhcnMgPSB7fTtcclxuXHRcdHZhciBwYXJ0cyA9IHdpbmRvdy5sb2NhdGlvbi5ocmVmLnJlcGxhY2UoL1s/Jl0rKFtePSZdKyk9KFteJl0qKS9naSwgZnVuY3Rpb24obSwga2V5LCB2YWx1ZSkge1xyXG5cdFx0XHR2YXJzW2tleV0gPSB2YWx1ZTtcclxuXHRcdH0pO1xyXG5cclxuXHRcdHJldHVybiB2YXJzO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogTW9kaWZpZXMgdGhlIGdldCBwYXJhbWV0ZXIgaW4gdGhlIHVybC5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSBzdHJpbmcgfCB1cmxcclxuXHQgKiBAcGFyYW0gc3RyaW5nIHwgcGFyYW1cclxuXHQgKiBAcGFyYW0gbnVtYmVyIHwgcGFyYW1WYWxcclxuXHQgKiBAcmV0dXJuIHN0cmluZ1xyXG5cdCAqL1xyXG5cdHVwZGF0ZVVSTFBhcmFtZXRlcih1cmwsIHBhcmFtLCBwYXJhbVZhbCkgXHJcblx0e1xyXG5cdCAgICB2YXIgbmV3QWRkaXRpb25hbFVSTCA9IFwiXCI7XHJcblx0ICAgIHZhciB0ZW1wQXJyYXkgPSB1cmwuc3BsaXQoXCI/XCIpO1xyXG5cdCAgICB2YXIgYmFzZVVSTCA9IHRlbXBBcnJheVswXTtcclxuXHQgICAgdmFyIGFkZGl0aW9uYWxVUkwgPSB0ZW1wQXJyYXlbMV07XHJcblx0ICAgIHZhciB0ZW1wID0gXCJcIjtcclxuXHJcblx0ICAgIGlmIChhZGRpdGlvbmFsVVJMKSB7XHJcblx0ICAgICAgICB0ZW1wQXJyYXkgPSBhZGRpdGlvbmFsVVJMLnNwbGl0KFwiJlwiKTtcclxuXHQgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGVtcEFycmF5Lmxlbmd0aDsgaSsrKXtcclxuXHQgICAgICAgICAgICBpZiAodGVtcEFycmF5W2ldLnNwbGl0KCc9JylbMF0gIT0gcGFyYW0pe1xyXG5cdCAgICAgICAgICAgICAgICBuZXdBZGRpdGlvbmFsVVJMICs9IHRlbXAgKyB0ZW1wQXJyYXlbaV07XHJcblx0ICAgICAgICAgICAgICAgIHRlbXAgPSBcIiZcIjtcclxuXHQgICAgICAgICAgICB9XHJcblx0ICAgICAgICB9XHJcblx0ICAgIH1cclxuXHJcblx0ICAgIHZhciByb3dzVGV4dCA9IHRlbXAgKyBcIlwiICsgcGFyYW0gKyBcIj1cIiArIHBhcmFtVmFsO1xyXG5cdCAgICByZXR1cm4gYmFzZVVSTCArIFwiP1wiICsgbmV3QWRkaXRpb25hbFVSTCArIHJvd3NUZXh0O1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogUmVzZXRzIHRoZSBwYWdpbmF0aW9uLlxyXG5cdCAqXHJcblx0ICogQHJldHVybiB2b2lkXHJcblx0ICovXHJcblx0cmVzZXQoKSBcclxuXHR7XHJcblx0XHR0aGlzLnNldEN1cnJlbnQoMSk7XHJcblx0XHR0aGlzLmNoYW5nZVVybCgxKTtcclxuXHR9XHJcbn1cblxubGV0IGRlZmF1bHRNZXNzYWdlJDUgPSAnSW4gb3JkZXIgdG8gdXNlIGNvbXBvbmVudHMgeW91IG11c3QgcmVnaXN0ZXIgdGhlbSB3aXRoIHRoZSBzaG9wISc7IFxyXG5cclxuY2xhc3MgQ29tcG9uZW50Tm90UmVnaXN0ZXJlZEV4Y2VwdGlvbiBleHRlbmRzIEV4Y2VwdGlvbkhhbmRsZXJcclxue1xyXG5cdGNvbnN0cnVjdG9yKG1lc3NhZ2UgPSBudWxsKSBcclxuXHR7XHJcblx0XHRtZXNzYWdlID0gbWVzc2FnZSB8fCBkZWZhdWx0TWVzc2FnZSQ1O1xyXG5cdFx0c3VwZXIobWVzc2FnZSk7XHJcbiAgICBcdHN1cGVyLnN0YWNrVHJhY2UodGhpcywgbWVzc2FnZSk7XHJcbiAgICB9XHJcbn1cblxubGV0IGRlZmF1bHRTZXR0aW5ncyQ1ID0ge1xyXG5cdGRlYnVnX2xldmVsOiAnZXJyb3InLFxyXG5cdGVsZW1lbnQ6ICdib2R5JyxcclxuXHRpbmplY3RfbGlicmFyaWVzOiBbXSxcclxuXHRjb21wb25lbnRzOiBbJ1Byb2R1Y3RzJywgJ1NlcnZpY2VzJywgJ0ZpbHRlcicsICdQYWdpbmF0aW9uJywgJ0NhcnQnXSxcclxuXHRsb2FkaW5nX2FuaW1hdGlvbjogdHJ1ZVxyXG59O1xyXG5cclxubGV0IGV4dGVybmFsTGlicmFyaWVzID0ge1xyXG5cdGJvb3RzdHJhcDogJ2h0dHBzOi8vbWF4Y2RuLmJvb3RzdHJhcGNkbi5jb20vYm9vdHN0cmFwLzMuMy43L2Nzcy9ib290c3RyYXAubWluLmNzcycsXHJcbn07XHJcblxyXG5sZXQgZGVidWdMZXZlbCQxO1xyXG5cclxuY2xhc3MgVHVyYm9FY29tbWVyY2Vcclxue1xyXG5cdC8qKlxyXG5cdCAqIFJldHJpZXZlIHRoZSBkZWJ1ZyBsZXZlbC5cclxuXHQgKlxyXG5cdCAqIEByZXR1cm4gc3RyaW5nXHJcblx0ICovXHJcblx0Z2V0IGRlYnVnTGV2ZWwoKVxyXG5cdHtcclxuXHRcdHJldHVybiBkZWJ1Z0xldmVsJDE7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBUaGUgZW50ZXJ5IGZvciB0aGUgc2hvcC5cclxuXHQgKiAtIFNldHRpbmcgdGhlIGV4Y2VwdGlvbiBoYW5kbGVyLlxyXG5cdCAqIC0gU2V0dGluZyB0aGUgaW9jIGNvbnRhaW5lci5cclxuXHQgKiAtIEV4dGVuZGluZyB0aGUgdXNlciBzZXR0aW5ncy5cclxuXHQgKiAtIFNldHRpbmcgdGhlIGVsZW1lbnQuXHJcblx0ICogLSBEaXNhYmxpbmcgZGVmYXVsdCBlcnJvcnMuXHJcblx0ICogLSBQYXNzaW5nIGNhbGxzIHZpYSBwcm94eSB0byB0aGUgY29tcG9uZW50cy5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSBvYmplY3QgfCBzZXR0aW5nc1xyXG5cdCAqIEByZXR1cm4gUHJveHlcclxuXHQgKi9cclxuXHRjb25zdHJ1Y3RvcihzZXR0aW5ncylcclxuXHR7XHJcblx0XHRpZiAodHlwZW9mIHNldHRpbmdzICE9ICdvYmplY3QnKSB7XHJcblx0XHRcdHRocm93IG5ldyBJbnZhbGlkQXJndW1lbnRFeGNlcHRpb24kMTtcclxuXHRcdH1cclxuXHJcblx0XHR0aGlzLmNvbnRhaW5lciA9IG5ldyBDb250YWluZXI7XHJcblx0XHR0aGlzLnNldHRpbmdzID0gQ29tbW9uLmV4dGVuZChkZWZhdWx0U2V0dGluZ3MkNSwgc2V0dGluZ3MpO1xyXG5cclxuXHRcdHRoaXMubG9hZEV4dGVybmFsTGlicmFyaWVzKCk7XHJcblxyXG5cdFx0ZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsIGZ1bmN0aW9uKCkge1xyXG5cdFx0XHR0aGlzLnNldEVsZW1lbnQodGhpcy5zZXR0aW5ncy5lbGVtZW50KTtcclxuXHRcdFx0XHJcblx0XHRcdGlmICh0aGlzLnNldHRpbmdzLmxvYWRpbmdfYW5pbWF0aW9uKSB7XHJcblx0XHRcdFx0c3RhcnRMb2FkaW5nLmNhbGwodGhpcyk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHRoaXMuYWRkU3R5bGVUYWcoKTtcclxuXHRcdH0uYmluZCh0aGlzKSk7XHJcblxyXG5cdFx0ZGVidWdMZXZlbCQxID0gdGhpcy5zZXR0aW5ncy5kZWJ1Z19sZXZlbDtcclxuXHJcblx0XHRFeGNlcHRpb25IYW5kbGVyLnNldERlYnVnTGV2ZWwgPSBkZWJ1Z0xldmVsJDE7XHJcblx0XHRcclxuXHRcdGlmIChkZWJ1Z0xldmVsJDEgPT0gJ3dhcm5pbmcnIHx8IGRlYnVnTGV2ZWwkMSA9PSAnaW5mbycpIHtcclxuXHRcdFx0d2luZG93Lm9uZXJyb3IgPSBmdW5jdGlvbigpIHsgcmV0dXJuIHRydWU7IH07XHJcblx0XHR9XHJcblxyXG5cdFx0YmluZENvbXBvbmVudHNEZXBlbmRlbmNpZXMuY2FsbCh0aGlzLCBzZXR0aW5ncy5jb21wb25lbnRzKTtcclxuXHJcblx0XHRyZXR1cm4gbmV3IFByb3h5KHRoaXMsIHtcclxuXHRcdFx0Z2V0OiBmdW5jdGlvbih0YXJnZXQsIHNvdXJjZSkge1xyXG5cdFx0XHRcdGlmIChDb21tb24uaW5fYXJyYXkoc291cmNlLCBzZXR0aW5ncy5jb21wb25lbnRzKSkge1xyXG5cdFx0XHRcdFx0cmV0dXJuIHRhcmdldC5jb250YWluZXIubWFrZShzb3VyY2UpO1xyXG5cdFx0XHRcdH0gZWxzZSBpZiAodGFyZ2V0LmNvbnRhaW5lci5pbnN0YW5jZUV4aXN0KHNvdXJjZSkpIHtcclxuXHRcdFx0XHRcdHJldHVybiB0YXJnZXQuY29udGFpbmVyLmdldEluc3RhbmNlKHNvdXJjZSk7XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHR0aHJvdyBuZXcgQ29tcG9uZW50Tm90UmVnaXN0ZXJlZEV4Y2VwdGlvbignY29tcG9uZW50cyBtdXN0IGJlIHJlZ2lzdGVyZWQgaW4gb3JkZXIgdG8gdXNlIHRoZW0uJyk7XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogTG9hZHMgdGhlIGV4dGVybmFsIGxpYnJhcmllcyB3aGljaCB3YXMgc3BlY2lmaWVkLlxyXG5cdCAqIFxyXG5cdCAqIEByZXR1cm4gdm9pZFxyXG5cdCAqL1xyXG5cdGxvYWRFeHRlcm5hbExpYnJhcmllcygpXHJcblx0e1xyXG5cdFx0bGV0IGk7XHJcblx0XHRsZXQgbGlicmFyaWVzID0gdGhpcy5zZXR0aW5ncy5pbmplY3RfbGlicmFyaWVzO1xyXG5cclxuXHRcdGZvciAoaSA9IDA7IGkgPCBsaWJyYXJpZXMubGVuZ3RoOyBpKyspIHtcclxuXHRcdFx0aWYgKGV4dGVybmFsTGlicmFyaWVzLmhhc093blByb3BlcnR5KGxpYnJhcmllc1tpXSkpIHtcclxuXHRcdFx0XHRsZXQgaWQgPSAnVHVyYm8tZUNvbW1lcmNlLScgKyBTdHIudWNmaXJzdChsaWJyYXJpZXNbaV0pO1xyXG5cdFx0XHRcdFxyXG5cdFx0XHRcdGlmICghIERPTS5maW5kKGlkKSkge1xyXG5cdFx0XHRcdFx0RE9NLmFkZExpbmtlZFN0eWxlKGlkLCBleHRlcm5hbExpYnJhcmllc1tsaWJyYXJpZXNbaV1dKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFNldHMgdGhlIGVsZW1lbnQgdG8gYmUgYm91bmQgdG8uXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gc3RyaW5nIHwgc2VsZWN0b3JcclxuXHQgKiBAcmV0dXJuIHZvaWRcclxuXHQgKi9cclxuXHRzZXRFbGVtZW50KHNlbGVjdG9yKVxyXG5cdHtcclxuXHRcdHRoaXMud3JhcHBlciA9IERPTS5maW5kKHNlbGVjdG9yKTtcclxuXHRcdFxyXG5cdFx0RE9NLmFkZENsYXNzKHRoaXMud3JhcHBlciwgdGhpcy5zZXR0aW5ncy5jbGFzcyk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBBZGQgdGhlIGVDb21tZXJjZSBzdHlsZSB0YWdzIHRvIHRoZSBET00uXHJcblx0ICpcclxuXHQgKiBAcmV0dXJuIHZvaWRcclxuXHQgKi9cclxuXHRhZGRTdHlsZVRhZygpIFxyXG5cdHtcclxuXHRcdGlmIChET00uZmluZCgnI1R1cmJvZS1Db21tZXJjZScpKSB7XHJcblx0XHRcdHJldHVybjtcclxuXHRcdH1cclxuXHJcblx0XHRsZXQgY3NzID0gYFxyXG5cdFx0XHQke3RoaXMuc2V0dGluZ3MuZWxlbWVudH0ge1xyXG5cdFx0XHRcdHBvc2l0aW9uOiByZWxhdGl2ZTtcclxuXHRcdFx0XHRjbGVhcjogYm90aDtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0LmxvYWRpbmctcHJvZ3Jlc3MtYmFyIHtcclxuXHRcdFx0XHRwb3NpdGlvbjogZml4ZWQ7XHJcblx0XHRcdFx0dG9wOiAwO1xyXG5cdFx0XHRcdGxlZnQ6IDA7XHJcblx0XHRcdFx0aGVpZ2h0OiA1cHg7XHJcblx0XHRcdFx0d2lkdGg6IDEwMCU7XHJcblx0XHRcdFx0LXdlYmtpdC1ib3gtc2hhZG93OiAwcHggMHB4IDVweCAxcHggcmdiYSgxNjgsMTY4LDE2OCwxKTtcclxuXHRcdFx0XHQtbW96LWJveC1zaGFkb3c6IDBweCAwcHggNXB4IDFweCByZ2JhKDE2OCwxNjgsMTY4LDEpO1xyXG5cdFx0XHRcdGJveC1zaGFkb3c6IDBweCAwcHggNXB4IDFweCByZ2JhKDE2OCwxNjgsMTY4LDEpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHQubG9hZGluZy1wcm9ncmVzcy1iYXIgPiAubG9hZGluZy1wcm9ncmVzcy1maWxsIHtcclxuXHRcdFx0XHR3aWR0aDogMTAwJTtcclxuXHRcdFx0XHRoZWlnaHQ6IDEwMCU7XHJcblx0XHRcdFx0cG9zaXRpb246IGFic29sdXRlO1xyXG5cdFx0XHRcdGJhY2tncm91bmQtY29sb3I6ICM5ZGQyZmY7XHJcblx0XHRcdFx0dHJhbnNmb3JtOiB0cmFuc2xhdGVYKC0ke2RvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRXaWR0aH1weCk7XHJcblx0XHRcdH1cclxuXHRcdGA7XHJcblx0ICAgIFxyXG5cdCAgICBET00uYWRkU3R5bGUoJ1R1cmJvLWVDb21tZXJjZScsIGNzcyk7XHJcblx0fVxyXG59XHJcblxyXG4vKipcclxuICogQmluZHMgY29tcG9uZW50cyBkZXBlbmRlbmNpZXMuXHJcbiAqXHJcbiAqIEBwYXJhbSBvYmplY3QgfCBjb21wb25lbnRzXHJcbiAqIEByZXR1cm4gdm9pZFxyXG4gKi9cclxuZnVuY3Rpb24gYmluZENvbXBvbmVudHNEZXBlbmRlbmNpZXMoY29tcG9uZW50cykge1xyXG5cclxuXHR0aGlzLmNvbnRhaW5lci5zZXRJbnN0YW5jZSgnUmVxdWVzdCcsIG5ldyBSZXF1ZXN0KTtcclxuXHR0aGlzLmNvbnRhaW5lci5zZXRJbnN0YW5jZSgnRXZlbnRzJywgbmV3IEV2ZW50TWFuYWdlcik7XHJcblxyXG5cdHRoaXMuY29udGFpbmVyLmJpbmQoJ0ZpbHRlcicsIGZ1bmN0aW9uKGNvbnRhaW5lcikge1xyXG5cdFx0bGV0IGNvbXBvbmVudCA9IG5ldyBGaWx0ZXIoY29udGFpbmVyKTtcclxuXHRcdGNvbXBvbmVudC5ib290ZWQgPSB0cnVlOyBcclxuXHRcdHJldHVybiBjb21wb25lbnQ7XHJcblx0fSk7XHJcblx0XHJcblx0dGhpcy5jb250YWluZXIuYmluZCgnU2VydmljZXMnLCBmdW5jdGlvbihjb250YWluZXIpIHsgXHJcblx0XHRsZXQgY29tcG9uZW50ID0gbmV3IFNlcnZpY2VzKGNvbnRhaW5lcik7IFxyXG5cdFx0Y29tcG9uZW50LmJvb3RlZCA9IHRydWU7XHJcblx0XHRyZXR1cm4gY29tcG9uZW50O1xyXG5cdH0pO1xyXG5cclxuXHR0aGlzLmNvbnRhaW5lci5iaW5kKCdQcm9kdWN0cycsIGZ1bmN0aW9uKGNvbnRhaW5lcikge1xyXG5cdFx0bGV0IGNvbXBvbmVudCA9IG5ldyBQcm9kdWN0cyhjb250YWluZXIsIGNvbnRhaW5lci5SZXF1ZXN0LCBjb250YWluZXIuRXZlbnRzKTtcclxuXHRcdGNvbXBvbmVudC5ib290ZWQgPSB0cnVlO1xyXG5cdFx0cmV0dXJuIGNvbXBvbmVudDtcclxuXHR9KTtcclxuXHJcblx0dGhpcy5jb250YWluZXIuYmluZCgnUGFnaW5hdGlvbicsIGZ1bmN0aW9uKGNvbnRhaW5lcikge1xyXG5cdFx0bGV0IGNvbXBvbmVudCA9IG5ldyBQYWdpbmF0aW9uKGNvbnRhaW5lciwgY29udGFpbmVyLm1ha2UoJ1Byb2R1Y3RzJyksIGNvbnRhaW5lci5FdmVudHMpO1xyXG5cdFx0Y29tcG9uZW50LmJvb3RlZCA9IHRydWU7XHJcblx0XHRyZXR1cm4gY29tcG9uZW50O1xyXG5cdH0pO1xyXG5cclxuXHR0aGlzLmNvbnRhaW5lci5iaW5kKCdDYXJ0JywgZnVuY3Rpb24oY29udGFpbmVyKSB7XHJcblx0XHRsZXQgY29tcG9uZW50ID0gbmV3IENhcnQoY29udGFpbmVyLCBjb250YWluZXIuUmVxdWVzdCwgY29udGFpbmVyLkV2ZW50cyk7XHJcblx0XHRjb21wb25lbnQuYm9vdGVkID0gdHJ1ZTtcclxuXHRcdHJldHVybiBjb21wb25lbnQ7XHJcblx0fSk7XHJcblxyXG5cdHRoaXMuY29udGFpbmVyLkZpbHRlci5ib290ZWQgPSBmYWxzZTtcclxuXHR0aGlzLmNvbnRhaW5lci5TZXJ2aWNlcy5ib290ZWQgPSBmYWxzZTtcclxuXHR0aGlzLmNvbnRhaW5lci5Qcm9kdWN0cy5ib290ZWQgPSBmYWxzZTtcclxuXHR0aGlzLmNvbnRhaW5lci5QYWdpbmF0aW9uLmJvb3RlZCA9IGZhbHNlO1xyXG5cdHRoaXMuY29udGFpbmVyLkNhcnQuYm9vdGVkID0gZmFsc2U7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBBdHRhY2hlcyBhIGxvYWRlciB0byB0aGUgdG9wIG9mIHRoZSBzY3JlZW5cclxuICogYW5kIGhpZGVzIHRoZSBjb250ZW50LlxyXG4gKiBTdG9wcyBhdXRvbWF0aWNhbGx5IGFmdGVyIDIwJSByZWFjaGVkLlxyXG4gKlxyXG4gKiBAcmV0dXJuIHZvaWQgXHJcbiAqL1xyXG5mdW5jdGlvbiBzdGFydExvYWRpbmcoKSB7XHJcblx0bGV0IGxvYWRlciA9IERPTS5jcmVhdGVFbGVtZW50KCdkaXYnLCB7XHJcblx0XHRjbGFzczogJ2xvYWRpbmctcHJvZ3Jlc3MtYmFyJ1xyXG5cdH0pO1xyXG5cclxuXHRsZXQgZmlsbCA9IERPTS5jcmVhdGVFbGVtZW50KCdzcGFuJywge1xyXG5cdFx0Y2xhc3M6ICdsb2FkaW5nLXByb2dyZXNzLWZpbGwnXHJcblx0fSk7XHJcblxyXG5cdGxvYWRlci5hcHBlbmRDaGlsZChmaWxsKTtcclxuXHRkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGxvYWRlcik7XHJcblxyXG5cclxuXHRsZXQgcHJvZ3Jlc3MgPSBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50V2lkdGg7XHJcblx0bGV0IG1heFNpemUgPSBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50V2lkdGggKiAwLjgwO1xyXG5cclxuXHR3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKHByb2dyZXNzRHJhdyk7XHJcblxyXG5cdGxldCBjb250ZW50ID0gdGhpcy53cmFwcGVyO1xyXG5cclxuXHRjb250ZW50LnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcblx0XHJcblx0ZnVuY3Rpb24gcHJvZ3Jlc3NEcmF3KCkge1xyXG5cdFx0ZmlsbC5zdHlsZS50cmFuc2Zvcm0gPSAndHJhbnNsYXRlWCgtJyArIHByb2dyZXNzICsgJ3B4KSc7XHJcblx0XHRwcm9ncmVzcyAtPSA3O1xyXG5cclxuXHRcdGlmIChwcm9ncmVzcyA8IG1heFNpemUpIHtcclxuXHRcdFx0ZG9uZSgpO1xyXG5cdFx0XHRyZXR1cm47XHJcblx0XHR9XHJcblxyXG5cdFx0d2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZShwcm9ncmVzc0RyYXcpO1xyXG5cdH1cclxuXHJcblx0ZnVuY3Rpb24gZG9uZSgpIHtcclxuXHRcdGZpbGwuc3R5bGUub3BhY2l0eSA9IHByb2dyZXNzIC8gMTAwMDtcclxuXHRcdGZpbGwuc3R5bGUudHJhbnNmb3JtID0gJ3RyYW5zbGF0ZVgoLScgKyBwcm9ncmVzcyArICdweCknO1xyXG5cdFxyXG5cdFx0cHJvZ3Jlc3MgLT0gMTU7XHJcblxyXG5cdFx0aWYgKHByb2dyZXNzIDw9IDApIHtcclxuXHRcdFx0Y29udGVudC5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcclxuXHRcdFx0XHJcblx0XHRcdGlmICh0eXBlb2YgbG9hZGVyICE9ICd1bmRlZmluZWQnKSB7XHJcblx0XHRcdFx0RE9NLnJlbW92ZShsb2FkZXIpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRyZXR1cm47XHJcblx0XHR9XHJcblxyXG5cdFx0d2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZShkb25lKTtcclxuXHR9XHJcbn1cblxucmV0dXJuIFR1cmJvRWNvbW1lcmNlO1xuXG59KCkpO1xuIl19
