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
				this.cart = Cookie.get(this.settings.cookie_name);

				if (!item.hasOwnProperty('quantity')) {
					item.quantity = 1;
				}

				var wasAdded = false;
				var i = void 0;

				for (i = 0; i < this.cart.items.length; i++) {
					if (this.cart.items[i].name == item.name) {
						this.cart.items[i].quantity++;
						wasAdded = true;
					}
				}

				if (!wasAdded) {
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
				var wasFavorited = false;

				for (i = 0; i < this.cart.favorites.length; i++) {
					if (this.cart.favorites[i].name == item.name) {
						wasFavorited = true;
					}
				}

				if (!wasFavorited) {
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

				var table = DOM.createElement('table');

				DOM.addClass(table, 'preview-table');

				for (var i = 0; i < items.length; i++) {

					var attributes = items[i];

					var tr = DOM.createElement('tr', {
						class: 'item'
					});

					// Quantity always at the start of an item.
					var td = DOM.createElement('td');
					td.innerHTML = attributes.quantity + 'x';
					tr.appendChild(td);

					for (var attribute in attributes) {
						switch (attribute) {
							case 'image':
								td = DOM.createElement('td');
								var image = DOM.createElement('img', {
									src: attributes[attribute],
									width: '50px',
									height: '50px'
								});

								td.appendChild(image);
								break;
							case 'name':
							case 'price':
								td = DOM.createElement('td');
								td.innerHTML = attributes[attribute];
								break;
						}

						tr.appendChild(td);
					}

					table.appendChild(tr);
				}

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

				if (this.settings.no_css) {
					return;
				}

				var position = this.settings.fixed ? 'fixed' : 'absolute';

				var css = '\n\t\t\t' + this.settings.element + ' {\n\t\t\t\tposition: ' + position + ';\n\t\t\t\tcursor: pointer;\n\t\t\t\tcolor: #ffffff;\n\t\t\t\tz-index: 998;\n\t\t\t}\n\n\t\t\t' + this.settings.element + ' > svg {\n\t\t\t\twidth: ' + this.settings.width + ';\n\t\t\t\theight: ' + this.settings.height + ';\n\t\t\t\ttransition: fill 0.3s;\n\t\t\t}\n\n\t\t\t' + this.settings.element + ' > svg:hover {\n\t\t\t\tfill: ' + this.settings.hover_color + ';\n\t\t\t\ttransition: fill 0.3s;\n\t\t\t}\n\n\t\t\t' + this.settings.element + '.top-right,\n\t\t\t' + this.settings.element + '.right-top {\n\t\t\t\tright: 10px;\n\t\t\t\ttop: 10px;\n\t\t\t}\n\n\t\t\t' + this.settings.element + '.left-top,\n\t\t\t' + this.settings.element + '.top-left {\n\t\t\t\tleft: 10px;\n\t\t\t\ttop: 10px;\n\t\t\t}\n\n\t\t\t' + this.settings.element + ' > #preview {\n\t\t\t\tposition: ' + position + ';\n\t\t\t\tz-index: 9999;\n\t\t\t\ttop: calc(10px + ' + this.settings.height + ');\n\t\t\t\ttransform: translateX(60px);\n\t\t\t\theight: 400px;\n\t\t\t\twidth: 300px;\n\t\t\t\tborder: 1px solid #e4e4e4;\n\t\t\t\tbackground: #ffffff;\n\t\t\t\ttransition: transform 1s, visibility 1s;\n\t\t\t\tcursor: default;\n\t\t\t\toverflow-Y: scroll;\n\t\t\t}\n\n\t\t\t' + this.settings.element + ' > #preview.opened {\n\t\t\t\tvisibility: visible;\n\t\t\t\ttransform: translateX(-240px);\n\t\t\t}\n\n\t\t\t' + this.settings.element + ' > #preview.closed {\n\t\t\t\tvisibility: hidden;\n\t\t\t\ttransform: translateX(60px);\n\t\t\t}\n\n\t\t\t' + this.settings.element + ' #preview > ul.items {\n\t\t\t\tpadding: 0;\n\t\t\t\tcolor: #000000;\n\t\t\t\tlist-style-type: none;\n\t\t\t}\n\n\t\t\t' + this.settings.element + ' #preview > ul.items > .preview-table {\n\t\t\t\twidth: 100%;\n\t\t\t}\n\n\t\t\t' + this.settings.element + ' #preview > ul.items > .preview-table td {\n\t\t\t\tpadding: 4px;\n\t\t\t}\n\n\t\t\t' + this.settings.element + ' .items.loading {\n\t\t\t\tdisplay: none;\n\t\t\t\toverflow-Y: none;\n\t\t\t}\n\n\t\t\t' + this.settings.element + ' .cart-loader-overlay {\n\t\t\t\tposition: fixed;\n\t\t\t\ttop: 0; \n\t\t\t    left: 0;\n\t\t\t    right: 0;\n\t\t\t    bottom: 0;\n\t\t\t\tbackground: #ffffff;\n\t\t\t\twidth: 100%;\n\t\t\t\theight: 100%;\n\t\t\t\tmin-height: 100%;\n\t\t\t\toverflow: auto;\n\t\t\t}\n\n\t\t\t' + this.settings.element + ' .cart-loader-overlay .cart-loader {\n\t\t\t\tposition: absolute;\n\t\t\t\twidth: 50px;\n\t\t\t\theight: 50px;\n\t\t\t\tmargin-left: -25px;\n\t\t\t\tmargin-top: -25px;\n\t\t\t\tleft: 50%;\n\t\t\t\tright: 50%;\n\t\t\t\ttop: 50%;\n\t\t\t\tbottom: 50%;\n\t\t\t}\n\t\t';

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
				if (this.svgIcon == null) {
					return;
				}

				this.svgIcon.onclick = function (e) {
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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlR1cmJvRWNvbW1lcmNlLmpzIl0sIm5hbWVzIjpbIlR1cmJvRWNvbW1lcmNlIiwiU3RyIiwic3RyaW5nIiwicmVwbGFjZSIsInRvTG93ZXJDYXNlIiwibGVuZ3RoIiwicG9zc2libGUiLCJpIiwiY2hhckF0IiwiTWF0aCIsImZsb29yIiwicmFuZG9tIiwidG9VcHBlckNhc2UiLCJzbGljZSIsImRlYnVnTGV2ZWwiLCJFeGNlcHRpb25IYW5kbGVyIiwibGV2ZWwiLCJFcnJvciIsImNhcHR1cmVTdGFja1RyYWNlIiwiY29uc3RydWN0b3IiLCJuYW1lIiwiZXJyb3IiLCJtZXNzYWdlIiwiY3VzdG9tQWN0aW9ucyIsImhhbmRsZUVycm9ycyIsImhhbmRsZVdhcm5pbmdzIiwiaGFuZGxlSW5mb3MiLCJjb25zb2xlIiwid2FybiIsImluZm8iLCJkZWZhdWx0TWVzc2FnZSIsIkludmFsaWRBcmd1bWVudEV4Y2VwdGlvbiQxIiwiRE9NIiwiZWxlbWVudCIsImNsYXNzTmFtZSIsIm5ld0NsYXNzTmFtZSIsInJlbW92ZUNsYXNzIiwiYWRkQ2xhc3MiLCJ1bmRlZmluZWQiLCJjbGFzc05hbWVzIiwic3BsaXQiLCJmb3JFYWNoIiwiY2xhc3NMaXN0IiwiYWRkIiwiaW5kZXhPZiIsInJlbW92ZSIsInBhcmVudE5vZGUiLCJyZW1vdmVDaGlsZCIsImlkIiwiY3NzIiwiaGVhZCIsImRvY3VtZW50IiwiZ2V0RWxlbWVudHNCeVRhZ05hbWUiLCJzdHlsZVRhZyIsImNyZWF0ZUVsZW1lbnQiLCJDU1MiLCJtaW5pZnlDc3MiLCJpbm5lckhUTUwiLCJzZXRBdHRyaWJ1dGUiLCJhcHBlbmRDaGlsZCIsInNvdXJjZSIsImxpbmtlZFN0eWxlVGFnIiwiZWxlbWVudFR5cGUiLCJvcHRpb25zIiwib3B0aW9uIiwic2Vjb25kQ2xhc3NOYW1lIiwidG9nZ2xlIiwic2VsZWN0b3IiLCJjb250ZXh0Iiwid2luZG93IiwicXVlcnlFbGVtZW50IiwicGFyZW50RWxlbWVudCIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJoYXNDaGlsZCIsImNoaWxkRWxlbWVudCIsIm5vZGUiLCJDb21tb24iLCJjdXJyZW50T2JqZWN0IiwibmV3T2JqZWN0IiwiZXh0ZW5kZWQiLCJwcm9wIiwiT2JqZWN0IiwicHJvdG90eXBlIiwiaGFzT3duUHJvcGVydHkiLCJjYWxsIiwibmVlZGxlIiwiaHlzdGFjayIsIkFycmF5IiwidG90YWwiLCJzaXplIiwiaXNOYU4iLCJwYXJzZUludCIsImNvbGxlY3Rpb24iLCJjZWlsIiwic3RhcnQiLCJlbmQiLCJwdXNoIiwib2JqZWN0IiwiZGVmYXVsdE1lc3NhZ2UkMSIsIkludmFsaWREYXRhU3RydWN0dXJlRXhjZXB0aW9uIiwiZGVmYXVsdFNldHRpbmdzIiwiaGVhZGVycyIsImFzeW5jIiwiUmVxdWVzdCIsInNldHRpbmdzIiwiZXh0ZW5kIiwic2V0RGVmYXVsdFJlcXVlc3RIZWFkZXIiLCJoZWFkZXIiLCJvcGVuIiwiWE1MSHR0cFJlcXVlc3QiLCJzZXRSZXF1ZXN0SGVhZGVyIiwicmVzcG9uc2UiLCJhcHBseSIsImFyZ3VtZW50cyIsInhociIsImJlZm9yZSIsIlByb21pc2UiLCJyZXNvbHZlIiwicmVqZWN0IiwiZGF0YSIsInVybCIsInJlc3BvbnNlVHlwZSIsImRhdGFUeXBlIiwidGltZW91dCIsIm9ucmVhZHlzdGF0ZWNoYW5nZSIsInJlYWR5U3RhdGUiLCJzdGF0dXMiLCJhZnRlciIsIm9uZXJyb3IiLCJzZW5kIiwicXVlcnlTdHJpbmciLCJrZXlzIiwibWFwIiwia2V5IiwiZW5jb2RlVVJJQ29tcG9uZW50Iiwiam9pbiIsIkFjdGl2ZVhPYmplY3QiLCJyZXNwb25zZVRleHQiLCJKU09OIiwicGFyc2UiLCJkZWZhdWx0TWVzc2FnZSQyIiwiSW52YWxpZEJpbmRpbmdFeGNlcHRpb24iLCJpbnN0YW5jZXMiLCJDb250YWluZXIiLCJjb25jcmV0ZSIsImJpbmQiLCJpbnN0YW5jZSIsImFsaWFzIiwiaW5zdGFuY2VFeGlzdCIsImdldEluc3RhbmNlIiwic2V0SW5zdGFuY2UiLCJkZWZhdWx0TWVzc2FnZSQzIiwiQmFkRXZlbnRDYWxsRXhjZXB0aW9uIiwiRXZlbnRNYW5hZ2VyIiwiZXZlbnRzIiwiY2FsbGJhY2siLCJJbnZhbGlkQXJndW1lbnRFeGNlcHRpb24iLCJDb29raWUiLCJ2YWx1ZSIsImRheXMiLCJzdHJpbmdpZnkiLCJleHBpcmVzIiwiZGF0ZSIsIkRhdGUiLCJzZXRUaW1lIiwiZ2V0VGltZSIsInRvR01UU3RyaW5nIiwiY29va2llIiwiY19zdGFydCIsImNfZW5kIiwidW5lc2NhcGUiLCJzdWJzdHJpbmciLCJkZWZhdWx0U2V0dGluZ3MkMSIsImNvb2tpZV9uYW1lIiwicHJldmlld19jbGFzcyIsImxvYWRlciIsImNsYXNzIiwid2lkdGgiLCJoZWlnaHQiLCJwbGFjZW1lbnQiLCJmaXhlZCIsImhvdmVyX2NvbG9yIiwibm9fY3NzIiwiQ29udGFpbmVyJDIiLCJFdmVudE1hbmFnZXIkMiIsIkh0dHAiLCJsb2FkaW5nT3ZlcmxheSIsIml0ZW1zRGl2IiwiQ2FydCIsImNvbnRhaW5lciIsImh0dHAiLCJldmVudE1hbmFnZXIiLCJwcmV2aWV3RWxlbWVudCIsImNyZWF0ZVByZXZpZXdFbGVtZW50Iiwic3ZnSWNvbiIsImNyZWF0ZUljb24iLCJzZXRFbGVtZW50IiwiYmluZEV2ZW50TGlzdGVuZXJzIiwiYWRkU3R5bGVUYWciLCJpc0VtcHR5IiwiZ2V0Iiwic2V0dXBDYXJ0IiwiY2FydCIsImVtcHR5T2JqZWN0IiwiaXRlbXMiLCJmYXZvcml0ZXMiLCJzZXQiLCJpdGVtIiwicXVhbnRpdHkiLCJ3YXNBZGRlZCIsIndhc0Zhdm9yaXRlZCIsInNwbGljZSIsInRhYmxlIiwiYXR0cmlidXRlcyIsInRyIiwidGQiLCJhdHRyaWJ1dGUiLCJpbWFnZSIsInNyYyIsImljb24iLCJmaW5kIiwicG9zaXRpb24iLCJhZGRTdHlsZSIsImNyZWF0ZUxvYWRlciIsInByZXZpZXdTdGFydExvYWRpbmciLCJnZXRDYXJ0SXRlbXMiLCJhZGRUb1ByZXZpZXciLCJzZXRUaW1lb3V0IiwicHJldmlld1N0b3BMb2FkaW5nIiwib25jbGljayIsImUiLCJwcmV2ZW50RGVmYXVsdCIsInRvZ2dsZUNhcnRQcmV2aWV3Iiwic3Vic2NyaWJlIiwib3BlbkNhcnRQcmV2aWV3IiwiYWRkSXRlbSIsInJlbG9hZENhcnRQcmV2aWV3IiwiZmF2b3JpdGVJdGVtIiwiaGFzQ2xhc3MiLCJzd2l0Y2hDbGFzc2VzIiwib3BlbmluZyIsInRvZ2dsZUNsYXNzIiwiY2xvc2UiLCJldmVudCIsInN2ZyIsImNyZWF0ZUVsZW1lbnROUyIsImciLCJwYXRoIiwiY291bnQiLCJncm91cHMiLCJyZWN0YW5nZWxzIiwiYW5pbWF0aW9ucyIsInJvdGF0aW9uIiwiZ3JvdXAiLCJyZWN0YW5nZWwiLCJiZWdpbiIsImFuaW1hdGUiLCJ0b0ZpeGVkIiwiZGVmYXVsdFNldHRpbmdzJDIiLCJDb250YWluZXIkMyIsIkZpbHRlciIsImFkZEV2ZW50TGlzdGVuZXIiLCJ3cmFwcGVyIiwibWluV2lkdGgiLCJtaW5fd2lkdGgiLCJkZWZhdWx0U2V0dGluZ3MkMyIsIml0ZW1fY2xhc3MiLCJhZGRfYnV0dG9uX2NsYXNzIiwiZmF2b3JpdGVfYnV0dG9uX2NsYXNzIiwiQ29udGFpbmVyJDQiLCJFdmVudE1hbmFnZXIkMyIsIkh0dHAkMSIsImNodW5rZWRQcm9kdWN0cyIsIlByb2R1Y3RzIiwidG90YWxJdGVtcyIsImxvYWRQcm9kdWN0cyIsInBhZ2VOdW1iZXIiLCJQYWdpbmF0aW9uIiwiYm9vdGVkIiwicHJvY2Nlc3NpbmciLCJsb2FkUGFnZVByb2R1Y3RzQnlDbGllbnQiLCJsb2FkUGFnZVByb2R1Y3RzQnlTZXJ2ZXIiLCJyZXF1ZXN0IiwiZ2V0UHJvZHVjdHMiLCJ0aGVuIiwicHJvZHVjdHMiLCJjdXJyZW50SXRlbXMiLCJwcm9kdWN0IiwicHVibGlzaCIsInJlcGxhY2VJdGVtcyIsImNhdGNoIiwicGFnZXMiLCJjYWxjdWxhdGVDbGllbnRQYWdlcyIsInRvdGFsX2l0ZW1zIiwicGVyUGFnZSIsInBlcl9wYWdlIiwiYXJyYXlfY2h1bmsiLCJpc0FycmF5IiwiYnVpbGRQcm9kdWN0cyIsImFjdGlvbiIsImF0dHJpYnV0ZXNDb2xsZWN0aW9uIiwidGFnVHlwZSIsImJ1aWx0UHJvZHVjdHMiLCJidWlsdFByb2R1Y3QiLCJidWlsZFByb2R1Y3QiLCJvdmVybGF5IiwiaW5fYXJyYXkiLCJ0YWciLCJrZWJhYkNhc2UiLCJhZGRUb0NhcnQiLCJ0eXBlIiwidGV4dCIsImZhdm9yaXRlIiwibWF4V2lkdGgiLCJtYXhfd2lkdGgiLCJTZXJ2aWNlcyIsImRlZmF1bHRNZXNzYWdlJDQiLCJOb3RJblBhZ2VSYW5nZUV4Y2VwdGlvbiIsImRlZmF1bHRTZXR0aW5ncyQ0IiwiQ29udGFpbmVyJDUiLCJQcm9kdWN0cyQyIiwiRXZlbnRNYW5hZ2VyJDQiLCJzZXRDdXJyZW50IiwidG90YWxQYWdlcyIsImNhbGN1bGF0ZVRvdGFsUGFnZXMiLCJidWlsZFBhZ2luYXRpb24iLCJsaW5rcyIsImNyZWF0ZUxpbmtzIiwicmVwbGFjZUxpbmtzIiwibmV4dCIsImNoaWxkTm9kZXMiLCJyZXF1ZXN0ZWRQYWdlIiwiY3VycmVudCIsIm5vdEluUGFnZVJhbmdlIiwicHJldmlvdXMiLCJnZXRBdHRyaWJ1dGUiLCJjaGFuZ2VVcmwiLCJzZXRBY3RpdmVMaW5rIiwidWwiLCJjcmVhdGVQYWdlTGlua3MiLCJjcmVhdGVQcmV2aW91c0J1dHRvbiIsImNyZWF0ZU5leHRCdXR0b24iLCJwYWdlIiwicGFnZUl0ZW0iLCJsaW5rIiwibGkiLCJzcGFuMSIsInNwYW4yIiwiaGlzdG9yeSIsInJlcGxhY2VTdGF0ZSIsInVwZGF0ZVVSTFBhcmFtZXRlciIsImxvY2F0aW9uIiwiaHJlZiIsInZhcnMiLCJwYXJ0cyIsIm0iLCJwYXJhbSIsInBhcmFtVmFsIiwibmV3QWRkaXRpb25hbFVSTCIsInRlbXBBcnJheSIsImJhc2VVUkwiLCJhZGRpdGlvbmFsVVJMIiwidGVtcCIsInJvd3NUZXh0IiwiZGVmYXVsdE1lc3NhZ2UkNSIsIkNvbXBvbmVudE5vdFJlZ2lzdGVyZWRFeGNlcHRpb24iLCJkZWZhdWx0U2V0dGluZ3MkNSIsImRlYnVnX2xldmVsIiwiaW5qZWN0X2xpYnJhcmllcyIsImNvbXBvbmVudHMiLCJsb2FkaW5nX2FuaW1hdGlvbiIsImV4dGVybmFsTGlicmFyaWVzIiwiYm9vdHN0cmFwIiwiZGVidWdMZXZlbCQxIiwibG9hZEV4dGVybmFsTGlicmFyaWVzIiwic3RhcnRMb2FkaW5nIiwic2V0RGVidWdMZXZlbCIsImJpbmRDb21wb25lbnRzRGVwZW5kZW5jaWVzIiwiUHJveHkiLCJ0YXJnZXQiLCJtYWtlIiwibGlicmFyaWVzIiwidWNmaXJzdCIsImFkZExpbmtlZFN0eWxlIiwiZG9jdW1lbnRFbGVtZW50IiwiY2xpZW50V2lkdGgiLCJjb21wb25lbnQiLCJFdmVudHMiLCJmaWxsIiwiYm9keSIsInByb2dyZXNzIiwibWF4U2l6ZSIsInJlcXVlc3RBbmltYXRpb25GcmFtZSIsInByb2dyZXNzRHJhdyIsImNvbnRlbnQiLCJzdHlsZSIsImRpc3BsYXkiLCJ0cmFuc2Zvcm0iLCJkb25lIiwib3BhY2l0eSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLElBQUlBLGlCQUFrQixZQUFZO0FBQ2xDOztBQUVBOzs7Ozs7OztBQUhrQyxLQVc1QkMsR0FYNEI7QUFBQTtBQUFBO0FBQUE7O0FBQUE7QUFBQTs7QUFhakM7Ozs7OztBQWJpQyw2QkFtQmhCQyxNQW5CZ0IsRUFvQmpDO0FBQ0MsV0FBT0EsT0FBT0MsT0FBUCxDQUFlLGlCQUFmLEVBQWtDLE9BQWxDLEVBQTJDQyxXQUEzQyxFQUFQO0FBQ0E7O0FBRUQ7Ozs7Ozs7QUF4QmlDO0FBQUE7QUFBQSwwQkE4Qm5CQyxNQTlCbUIsRUErQmpDO0FBQ0MsUUFBSUgsU0FBUyxFQUFiO0FBQ0EsUUFBSUksV0FBVyxnRUFBZjs7QUFFQSxTQUFLLElBQUlDLElBQUksQ0FBYixFQUFnQkEsSUFBSUYsTUFBcEIsRUFBNEJFLEdBQTVCLEVBQWlDO0FBQzdCTCxlQUFVSSxTQUFTRSxNQUFULENBQWdCQyxLQUFLQyxLQUFMLENBQVdELEtBQUtFLE1BQUwsS0FBZ0JM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QyxZQUE3QjtBQUNBOztBQUVELFdBQVNLLElBQVQsR0FBZ0I7QUFDZlYsUUFBS08sS0FBTCxDQUFXSSxPQUFYLEdBQXFCVCxXQUFXLElBQWhDO0FBQ0FGLFFBQUtPLEtBQUwsQ0FBV0UsU0FBWCxHQUF1QixpQkFBaUJQLFFBQWpCLEdBQTRCLEtBQW5EOztBQUVBQSxlQUFZLEVBQVo7O0FBRUEsT0FBSUEsWUFBWSxDQUFoQixFQUFtQjtBQUNsQkksWUFBUUMsS0FBUixDQUFjQyxPQUFkLEdBQXdCLE9BQXhCOztBQUVBLFFBQUksT0FBTzdOLE1BQVAsSUFBaUIsV0FBckIsRUFBa0M7QUFDakMvSSxTQUFJYSxNQUFKLENBQVdrSSxNQUFYO0FBQ0E7O0FBRUQ7QUFDQTs7QUFFRDFHLFVBQU9tVSxxQkFBUCxDQUE2Qk0sSUFBN0I7QUFDQTtBQUNEOztBQUVELFFBQU85WSxjQUFQO0FBRUMsQ0FyZ0dxQixFQUF0QiIsImZpbGUiOiJUdXJib0Vjb21tZXJjZS5qcyIsInNvdXJjZXNDb250ZW50IjpbInZhciBUdXJib0Vjb21tZXJjZSA9IChmdW5jdGlvbiAoKSB7XG4ndXNlIHN0cmljdCc7XG5cbi8qKlxyXG4gKiBAZmlsZSBcclxuICogU3RyIGNsYXNzLlxyXG4gKlxyXG4gKiBBZGRzIHNvbWUgdXNlZnVsIGZ1bmN0aW9uYWxpdHkgZm9yXHJcbiAqIG1hbmlwdWxhdGluZyBzdHJpbmdzIG9yIGNyZWF0aW5nIHN0cmluZy5cclxuICovXHJcblxyXG5jbGFzcyBTdHJcclxue1xyXG5cdC8qKlxyXG5cdCAqIENvbnZlcnQgY2FtZWxDYXNlIHRvIGtlYmFiLWNhc2UuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gc3RyaW5nIHwgc3RyaW5nXHJcblx0ICogQHJldHVybiBzdHJpbmdcclxuXHQgKi9cclxuXHRzdGF0aWMga2ViYWJDYXNlKHN0cmluZykgXHJcblx0e1xyXG5cdFx0cmV0dXJuIHN0cmluZy5yZXBsYWNlKC8oW2Etel0pKFtBLVpdKS9nLCAnJDEtJDInKS50b0xvd2VyQ2FzZSgpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogR2VuZXJhdGVzIGEgcmFuZG9tIHN0cmluZy5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSBpbnRlZ2VyIHwgbGVuZ3RoXHJcblx0ICogQHJldHVybiBzdHJpbmdcclxuXHQgKi9cclxuXHRzdGF0aWMgcmFuZG9tKGxlbmd0aCkgXHJcblx0e1xyXG5cdFx0bGV0IHN0cmluZyA9ICcnO1xyXG5cdFx0bGV0IHBvc3NpYmxlID0gXCJBQkNERUZHSElKS0xNTk9QUVJTVFVWV1hZWmFiY2RlZmdoaWprbG1ub3BxcnN0dXZ3eHl6MDEyMzQ1Njc4OVwiO1xyXG5cclxuXHRcdGZvciAobGV0IGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcclxuXHQgICAgXHRzdHJpbmcgKz0gcG9zc2libGUuY2hhckF0KE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIHBvc3NpYmxlLmxlbmd0aCkpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiBzdHJpbmc7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBDaGFuZ2VzIHRoZSBmaXJzdCBsZXR0ZXIgXHJcblx0ICogb2YgdGhlIHN0cmluZyB0byB1cHBlcmNhc2UuXHJcblx0ICogXHJcblx0ICogQHBhcmFtIHN0cmluZyB8IHN0cmluZ1xyXG5cdCAqIEByZXR1cm4gc3RyaW5nXHJcblx0ICovXHJcblx0c3RhdGljIHVjZmlyc3Qoc3RyaW5nKSBcclxuXHR7XHJcblx0ICAgIHJldHVybiBzdHJpbmcuY2hhckF0KDApLnRvVXBwZXJDYXNlKCkgKyBzdHJpbmcuc2xpY2UoMSk7XHJcblx0fVxyXG59XG5cbi8qKlxyXG4gKiBTdG9yZXMgdGhlIGRlYnVnIGxldmVsLlxyXG4gKlxyXG4gKiBAdmFyIHN0cmluZyBcclxuICovXHJcbmxldCBkZWJ1Z0xldmVsO1xyXG5cclxuY2xhc3MgRXhjZXB0aW9uSGFuZGxlclxyXG57XHJcblx0LyoqXHJcblx0ICogU2V0dGVyIGZvciB0aGUgZGVidWcgbGV2ZWwuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gc3RyaW5nIHwgbGV2ZWxcclxuXHQgKiBAcmV0dXJuIHZvaWRcclxuXHQgKi9cclxuXHRzdGF0aWMgc2V0IHNldERlYnVnTGV2ZWwobGV2ZWwpXHJcblx0e1xyXG5cdFx0ZGVidWdMZXZlbCA9IGxldmVsO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogRXh0ZW5kZWQgY29uc3RydWN0b3IsIGNhcHR1cmVzIHRoZVxyXG5cdCAqIHN0YWNrIHRyYWNlLlxyXG5cdCAqXHJcblx0ICogQHJldHVybiB2b2lkXHJcblx0ICovXHJcblx0Y29uc3RydWN0b3IoKVxyXG5cdHtcclxuXHRcdGlmIChFcnJvci5jYXB0dXJlU3RhY2tUcmFjZSkge1xyXG5cdFx0XHRFcnJvci5jYXB0dXJlU3RhY2tUcmFjZSh0aGlzLCB0aGlzLmNvbnN0cnVjdG9yLm5hbWUpO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogSGFuZGxlcyBhbGwgZXhjZXB0aW9ucy5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSBvYmplY3QgfCBlcnJvciB8IFRocm93ZW4gRXhjZXB0aW9uIE9iamVjdFxyXG5cdCAqIEBwYXJhbSBzdHJpbmcgfCBtZXNzYWdlXHJcblx0ICogQHJldHVybiB2b2lkXHJcblx0ICovXHJcblx0c3RhY2tUcmFjZShlcnJvciwgbWVzc2FnZSkgXHJcblx0e1xyXG5cdFx0dGhpcy5jdXN0b21BY3Rpb25zKGVycm9yLCBtZXNzYWdlKTtcclxuXHJcblx0XHRzd2l0Y2goZGVidWdMZXZlbClcclxuXHRcdHtcclxuXHRcdFx0Y2FzZSAnZXJyb3InOiB0aGlzLmhhbmRsZUVycm9ycyhlcnJvciwgbWVzc2FnZSk7IGJyZWFrO1xyXG5cdFx0XHRjYXNlICd3YXJuaW5nJzogdGhpcy5oYW5kbGVXYXJuaW5ncyhlcnJvciwgbWVzc2FnZSk7IGJyZWFrO1xyXG5cdFx0XHRjYXNlICdpbmZvJzogdGhpcy5oYW5kbGVJbmZvcyhlcnJvciwgbWVzc2FnZSk7IGJyZWFrO1xyXG5cdFx0XHRkZWZhdWx0OiB0aGlzLmhhbmRsZUluZm9zKGVycm9yLCBtZXNzYWdlKTsgYnJlYWs7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBUYWtlIGFjdGlvbiBmb3Igc3BlY2lmaWMgRXhjZXB0aW9ucy5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSBvYmplY3QgfCBlcnJvciB8IFRocm93ZW4gRXhjZXB0aW9uIE9iamVjdFxyXG5cdCAqIEBwYXJhbSBzdHJpbmcgfCBtZXNzYWdlXHJcblx0ICogQHJldHVybiBib29sXHJcblx0ICovXHJcblx0Y3VzdG9tQWN0aW9ucyhlcnJvciwgbWVzc2FnZSlcclxuXHR7XHJcblx0XHRpZiAoZXJyb3IuY29uc3RydWN0b3IubmFtZSA9PSAnSW52YWxpZEFyZ3VtZW50RXhjZXB0aW9uJykge1xyXG5cdFx0XHQvLyBoYW5kbGVcclxuXHRcdH0gZWxzZSBpZiAoZXJyb3IuY29uc3RydWN0b3IubmFtZSA9PSAnSW52YWxpZEJpbmRpbmdFeGNlcHRpb24nKSB7XHJcblx0XHRcdC8vIGhhbmRsZVxyXG5cdFx0fSBlbHNlIGlmIChlcnJvci5jb25zdHJ1Y3Rvci5uYW1lID09ICdCYWRFdmVudENhbGxFeGNlcHRpb24nKSB7XHJcblx0XHRcdC8vIGhhbmRsZVxyXG5cdFx0fSBlbHNlIGlmIChlcnJvci5jb25zdHJ1Y3Rvci5uYW1lID09ICdDb21wb25lbnRzRXhjZXB0aW9uJykge1xyXG5cdFx0XHQvLyBoYW5kbGVcclxuXHRcdH0gZWxzZSBpZiAoZXJyb3IuY29uc3RydWN0b3IubmFtZSA9PSAnQ29tcG9uZW50Tm90UmVnaXN0ZXJlZEV4Y2VwdGlvbicpIHtcclxuXHRcdFx0Ly8gaGFuZGxlXHJcblx0XHR9IGVsc2UgaWYgKGVycm9yLmNvbnN0cnVjdG9yLm5hbWUgPT0gJ05vdEluUGFnZVJhbmdlRXhjZXB0aW9uJykge1xyXG5cdFx0XHQvLyBoYW5kbGVcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gZmFsc2U7XHJcblx0fVxyXG5cclxuXHRoYW5kbGVFcnJvcnMoZXJyb3IsIG1lc3NhZ2UpXHJcblx0e1xyXG5cdFx0Y29uc29sZS5lcnJvcihlcnJvci5jb25zdHJ1Y3Rvci5uYW1lICsgJzogJyArIG1lc3NhZ2UpO1xyXG5cdH1cclxuXHJcblx0aGFuZGxlV2FybmluZ3MoZXJyb3IsIG1lc3NhZ2UpXHJcblx0e1xyXG5cdFx0Y29uc29sZS53YXJuKGVycm9yLmNvbnN0cnVjdG9yLm5hbWUgKyAnOiAnICsgbWVzc2FnZSk7XHJcblx0fVxyXG5cclxuXHRoYW5kbGVJbmZvcyhlcnJvciwgbWVzc2FnZSlcclxuXHR7XHJcblx0XHRjb25zb2xlLmluZm8oZXJyb3IuY29uc3RydWN0b3IubmFtZSArICc6ICcgKyBtZXNzYWdlKTtcclxuXHR9XHJcbn1cblxubGV0IGRlZmF1bHRNZXNzYWdlID0gJ2FuIGludmFsaWQgYXJndW1lbnQgd2FzIHBhc3NlZC4nO1xyXG5cclxuY2xhc3MgSW52YWxpZEFyZ3VtZW50RXhjZXB0aW9uJDEgZXh0ZW5kcyBFeGNlcHRpb25IYW5kbGVyXHJcbntcclxuXHRjb25zdHJ1Y3RvcihtZXNzYWdlID0gbnVsbCkgXHJcblx0e1xyXG5cdFx0bWVzc2FnZSA9IG1lc3NhZ2UgfHwgZGVmYXVsdE1lc3NhZ2U7XHJcblx0XHRzdXBlcihtZXNzYWdlKTtcclxuICAgIFx0c3VwZXIuc3RhY2tUcmFjZSh0aGlzLCBtZXNzYWdlKTtcclxuICAgIH1cclxufVxuXG4vKipcclxuICogQGZpbGUgXHJcbiAqIERPTSBjbGFzcy5cclxuICpcclxuICogQWRkcyBzb21lIHVzZWZ1bCBmdW5jdGlvbmFsaXR5IGZvclxyXG4gKiBmZXRjaGluZyBvciBtYW5pcHVsYXRpbmcgRE9NIGVsZW1lbnRzLlxyXG4gKi9cclxuXHJcbmNsYXNzIERPTVxyXG57XHJcblx0LyoqXHJcblx0ICogTWluaWZpZXMgdGhlIGNzcyB0ZXh0LlxyXG5cdCAqIFxyXG5cdCAqIEBwYXJhbSBzdHJpbmcgfCBzdHJpbmdcclxuXHQgKiBAcmV0dXJuIHN0cmluZ1xyXG5cdCAqL1xyXG5cdHN0YXRpYyBtaW5pZnlDc3Moc3RyaW5nKSBcclxuXHR7XHJcblx0ICAgIHN0cmluZyA9IHN0cmluZy5yZXBsYWNlKC9cXC9cXCooPzooPyFcXCpcXC8pW1xcc1xcU10pKlxcKlxcL3xbXFxyXFxuXFx0XSsvZywgJycpO1xyXG5cdCAgICBzdHJpbmcgPSBzdHJpbmcucmVwbGFjZSgvIHsyLH0vZywgJyAnKTtcclxuXHQgICAgc3RyaW5nID0gc3RyaW5nLnJlcGxhY2UoLyhbezp9XSkvZywgJyQxJyk7XHJcblx0ICAgIHN0cmluZyA9IHN0cmluZy5yZXBsYWNlKC8oWzssXSkgL2csICckMScpO1xyXG5cdCAgICBzdHJpbmcgPSBzdHJpbmcucmVwbGFjZSgvICEvZywgJyEnKTtcclxuXHQgICAgXHJcblx0ICAgIHJldHVybiBzdHJpbmc7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBTd2l0Y2hlcyBiZXR3ZWVuIHR3byBnaXZlbiBjbGFzc2VzLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIG9iamVjdCB8IGVsZW1lbnRcclxuXHQgKiBAcGFyYW0gc3RyaW5nIHwgY2xhc3NOYW1lXHJcblx0ICogQHBhcmFtIHN0cmluZyB8IG5ld0NsYXNzTmFtZVxyXG5cdCAqIEByZXR1cm4gb2JqZWN0XHJcblx0ICovXHJcblx0c3RhdGljIHN3aXRjaENsYXNzZXMoZWxlbWVudCwgY2xhc3NOYW1lLCBuZXdDbGFzc05hbWUpIFxyXG5cdHtcclxuXHRcdHRoaXMucmVtb3ZlQ2xhc3MoZWxlbWVudCwgY2xhc3NOYW1lKTtcclxuXHRcdHRoaXMuYWRkQ2xhc3MoZWxlbWVudCwgbmV3Q2xhc3NOYW1lKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEFkZHMgY2xhc3MgdG8gYSBnaXZlbiBlbGVtZW50LlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIG9iamVjdCB8IGVsZW1lbnRcclxuXHQgKiBAcGFyYW0gc3RyaW5nIHwgY2xhc3NOYW1lXHJcblx0ICogQHJldHVybiBvYmplY3RcclxuXHQgKi9cclxuXHRzdGF0aWMgYWRkQ2xhc3MoZWxlbWVudCwgY2xhc3NOYW1lKSBcclxuXHR7XHJcblx0XHRpZihlbGVtZW50ID09PSBudWxsKSB7XHJcblx0XHRcdHRocm93IG5ldyBJbnZhbGlkQXJndW1lbnRFeGNlcHRpb24kMTtcclxuXHRcdH1cclxuXHJcblx0XHRpZighIGNsYXNzTmFtZSB8fCBjbGFzc05hbWUgPT0gJycgfHwgdHlwZW9mIGNsYXNzTmFtZSA9PT0gdW5kZWZpbmVkKSB7XHJcblx0XHRcdHJldHVybiBlbGVtZW50O1xyXG5cdFx0fVxyXG5cclxuXHRcdGxldCBjbGFzc05hbWVzID0gY2xhc3NOYW1lLnNwbGl0KCcgJyk7XHJcblxyXG5cdFx0Y2xhc3NOYW1lcy5mb3JFYWNoKGZ1bmN0aW9uKG5hbWUpIHtcclxuXHRcdFx0ZWxlbWVudC5jbGFzc0xpc3QuYWRkKG5hbWUpO1xyXG5cdFx0fSk7XHJcblx0XHRcclxuXHRcdHJldHVybiBlbGVtZW50O1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQ2hlY2tzIGlmIGFuIGVsZW1lbnQgaGFzIGEgY2xhc3MuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gSFRNTEVsZW1lbnQgfCBlbGVtZW50XHJcblx0ICogQHBhcmFtIHN0cmluZyB8IGNsYXNzTmFtZVxyXG5cdCAqIEByZXR1cm4gYm9vbFxyXG5cdCAqL1xyXG5cdHN0YXRpYyBoYXNDbGFzcyhlbGVtZW50LCBjbGFzc05hbWUpXHJcblx0e1xyXG5cdFx0aWYgKGVsZW1lbnQgPT09IG51bGwpIHtcclxuXHRcdFx0dGhyb3cgbmV3IEludmFsaWRBcmd1bWVudEV4Y2VwdGlvbiQxKCdoYXNDbGFzcygpIGV4cGVjdHMgdGhlIGZpcnN0IGFyZ3VtZW50IHRvIGJlIGFuIEhUTUxFbGVtZW50IGJ1dCBudWxsIHdhcyBwYXNzZWQuJyk7XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKCEgY2xhc3NOYW1lIHx8IGNsYXNzTmFtZSA9PSAnJyB8fCB0eXBlb2YgY2xhc3NOYW1lID09ICd1bmRlZmluZWQnKSB7XHJcblx0XHRcdHJldHVybjtcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gZWxlbWVudC5jbGFzc05hbWUuaW5kZXhPZihjbGFzc05hbWUpICE9IC0xO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogUmVtb3ZlcyBjbGFzcyBmcm9tIGEgZ2l2ZW4gZWxlbWVudC5cclxuXHQgKiBcclxuXHQgKiBAcGFyYW0gb2JqZWN0IHwgZWxlbWVudFxyXG5cdCAqIEBwYXJhbSBzdHJpbmcgfCBjbGFzc05hbWVcclxuXHQgKiBAcmV0dXJuIG9iamVjdFxyXG5cdCAqL1xyXG5cdHN0YXRpYyByZW1vdmVDbGFzcyhlbGVtZW50LCBjbGFzc05hbWUpIFxyXG5cdHtcclxuXHRcdGlmKGVsZW1lbnQgPT0gbnVsbCkge1xyXG5cdFx0XHR0aHJvdyBuZXcgSW52YWxpZEFyZ3VtZW50RXhjZXB0aW9uJDE7XHJcblx0XHR9XHJcblxyXG5cdFx0aWYoY2xhc3NOYW1lID09ICcnKSB7XHJcblx0XHRcdGVsZW1lbnQuY2xhc3NOYW1lID0gJyc7XHJcblx0XHR9IGVsc2Uge1xyXG5cclxuXHRcdFx0bGV0IGNsYXNzTmFtZXMgPSBjbGFzc05hbWUuc3BsaXQoJyAnKTtcclxuXHJcblx0XHRcdGNsYXNzTmFtZXMuZm9yRWFjaChmdW5jdGlvbihuYW1lKSB7XHJcblx0XHRcdFx0ZWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKG5hbWUpO1xyXG5cdFx0XHR9KTtcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gZWxlbWVudDtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFJlbW92ZXMgYW4gZWxlbWVudCBmcm9tIHRoZSBET00uXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gSFRNTEVsZW1lbnRcclxuXHQgKiBAcmV0dXJuIHZvaWRcclxuXHQgKi9cclxuXHRzdGF0aWMgcmVtb3ZlKGVsZW1lbnQpXHJcblx0e1xyXG5cdFx0ZWxlbWVudC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKGVsZW1lbnQpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQWRkcyBzdHlsZSB0YWcgd2l0aCBnaXZlbiBpZCBhbmQgY3NzIHRvIHRoZSBET00uXHJcblx0ICogXHJcblx0ICogQHBhcmFtIHN0cmluZyB8IGlkXHJcblx0ICogQHBhcmFtIHN0cmluZyB8IGNzc1xyXG5cdCAqIEByZXR1cm4gdm9pZFxyXG5cdCAqL1xyXG5cdHN0YXRpYyBhZGRTdHlsZShpZCwgY3NzKVxyXG5cdHtcclxuXHRcdGlmICh0eXBlb2YgY3NzICE9ICdzdHJpbmcnKSB7XHJcblx0XHRcdHRocm93IG5ldyBJbnZhbGlkQXJndW1lbnRFeGNlcHRpb24kMTtcclxuXHRcdH1cclxuXHJcblx0XHRsZXQgaGVhZCA9IGRvY3VtZW50LmhlYWQgfHwgZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2hlYWQnKVswXTtcclxuXHRcdGxldCBzdHlsZVRhZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3N0eWxlJyk7XHJcblxyXG5cdFx0Ly8gcGlwZSBpdCB0aHJvdWdoIHRoZSBtaW5maWVyXHJcblx0ICAgIGxldCBDU1MgPSB0aGlzLm1pbmlmeUNzcyhjc3MpO1xyXG5cdCAgICAvLyBhZGRpbmcgaXQgdG8gdGhlIHN0eWxldGFnXHJcblx0ICAgIHN0eWxlVGFnLmlubmVySFRNTCA9IENTUztcclxuXHQgICAgLy8gZ2l2ZSBhbiBpZCB0byByZWNvZ25pemUgdGhlIHN0eWxlIHRhZ1xyXG5cdFx0c3R5bGVUYWcuc2V0QXR0cmlidXRlKCdpZCcsIGlkKTtcclxuXHRcdC8vIGFwcGVuZGluZyB0aGF0IHN0eWxlIHRhZyB0byB0aGUgRE9NIGhlYWQgdGFnXHJcblx0XHRoZWFkLmFwcGVuZENoaWxkKHN0eWxlVGFnKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEFkZHMgbGlua2VkIHN0eWxlIHRhZyB3aXRoIGdpdmVuIGlkIGFuZCBzcmMgdG8gdGhlIERPTS5cclxuXHQgKiBcclxuXHQgKiBAcGFyYW0gc3RyaW5nIHwgaWRcclxuXHQgKiBAcGFyYW0gc3RyaW5nIHwgc291cmNlXHJcblx0ICogQHJldHVybiB2b2lkXHJcblx0ICovXHJcblx0c3RhdGljIGFkZExpbmtlZFN0eWxlKGlkLCBzb3VyY2UpIFxyXG5cdHtcclxuXHRcdGlmICh0eXBlb2Ygc291cmNlICE9ICdzdHJpbmcnKSB7XHJcblx0XHRcdHRocm93IG5ldyBJbnZhbGlkQXJndW1lbnRFeGNlcHRpb24kMSgnRE9NLmFkZExpbmtlZFN0eWxlKCkgZXhjcGVjdHMgdGhlIHNlY29uZCBwYXJhbWV0ZXIgdG8gYmUgc3RyaW5nLCBidXQgJyArIHR5cGVvZiBzb3VyY2UgKyAnIHdhcyBwYXNzZWQgaW5zdGVhZC4nKTtcclxuXHRcdH1cclxuXHJcblx0XHRsZXQgaGVhZCA9IGRvY3VtZW50LmhlYWQgfHwgZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2hlYWQnKVswXTtcclxuXHRcdGxldCBsaW5rZWRTdHlsZVRhZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpbmsnKTtcclxuXHJcblx0ICAgIC8vIGdpdmUgYW4gaWQgdG8gcmVjb2duaXplIHRoZSBzdHlsZSB0YWdcclxuXHRcdGxpbmtlZFN0eWxlVGFnLnNldEF0dHJpYnV0ZSgnaWQnLCBpZCk7XHJcblx0XHRsaW5rZWRTdHlsZVRhZy5zZXRBdHRyaWJ1dGUoJ2hyZWYnLCBzb3VyY2UpO1xyXG5cdFx0bGlua2VkU3R5bGVUYWcuc2V0QXR0cmlidXRlKCdyZWwnLCAnc3R5bGVzaGVldCcpO1xyXG5cdFx0bGlua2VkU3R5bGVUYWcuc2V0QXR0cmlidXRlKCd0eXBlJywgJ3RleHQvY3NzJyk7XHJcblx0XHQvLyBhcHBlbmRpbmcgdGhhdCBzdHlsZSB0YWcgdG8gdGhlIERPTSBoZWFkIHRhZ1xyXG5cdFx0aGVhZC5hcHBlbmRDaGlsZChsaW5rZWRTdHlsZVRhZyk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBDcmVhdGVzIGFuIGVsZW1lbnQgd2l0aCB0aGUgZ2l2ZW4gb3B0aW9ucy5cclxuXHQgKiBcclxuXHQgKiBAcGFyYW0gc3RyaW5nIHwgZWxlbWVudFR5cGVcclxuXHQgKiBAcGFyYW0gb2JqZWN0IHwgb3B0aW9uc1xyXG5cdCAqIEByZXR1cm4gSFRNTEVsZW1lbnRcclxuXHQgKi9cclxuXHRzdGF0aWMgY3JlYXRlRWxlbWVudChlbGVtZW50VHlwZSwgb3B0aW9ucylcclxuXHR7XHJcblx0XHRsZXQgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoZWxlbWVudFR5cGUpO1xyXG5cdFxyXG5cdFx0aWYgKG9wdGlvbnMgPT09IHVuZGVmaW5lZCkge1xyXG5cdFx0XHRyZXR1cm4gZWxlbWVudDtcclxuXHRcdH1cclxuXHJcblx0XHRmb3IgKGxldCBvcHRpb24gaW4gb3B0aW9ucykge1xyXG5cdFx0XHRpZihvcHRpb24gPT0gJ3RleHQnKSB7XHJcblx0XHRcdFx0ZWxlbWVudC5pbm5lckhUTUwgPSBvcHRpb25zW29wdGlvbl07XHJcblx0XHRcdFx0Y29udGludWU7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGVsZW1lbnQuc2V0QXR0cmlidXRlKG9wdGlvbiwgb3B0aW9uc1tvcHRpb25dKTtcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gZWxlbWVudDtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFRvZ2dsZXMgdGhlIGdpdmVuIGNsYXNzZXMuXHJcblx0ICogXHJcblx0ICogQHBhcmFtIG9iamVjdCB8IGVsZW1lbnRcclxuXHQgKiBAcGFyYW0gc3RyaW5nIHwgY2xhc3NOYW1lXHJcblx0ICogQHJldHVybiBib29sXHJcblx0ICovXHJcblx0c3RhdGljIHRvZ2dsZUNsYXNzKGVsZW1lbnQsIGNsYXNzTmFtZSwgc2Vjb25kQ2xhc3NOYW1lKVxyXG5cdHtcclxuXHRcdGlmIChlbGVtZW50ID09IG51bGwgfHwgdHlwZW9mIGVsZW1lbnQgPT0gJ3VuZGVmaW5lZCcpIHtcclxuXHRcdFx0dGhyb3cgbmV3IEludmFsaWRBcmd1bWVudEV4Y2VwdGlvbiQxO1xyXG5cdFx0fVxyXG5cclxuXHRcdHNlY29uZENsYXNzTmFtZSA9IHNlY29uZENsYXNzTmFtZSB8fCB1bmRlZmluZWQ7XHJcblxyXG5cdFx0aWYoc2Vjb25kQ2xhc3NOYW1lKSB7XHJcblx0XHRcdGVsZW1lbnQuY2xhc3NMaXN0LnRvZ2dsZShzZWNvbmRDbGFzc05hbWUpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiBlbGVtZW50LmNsYXNzTGlzdC50b2dnbGUoY2xhc3NOYW1lKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEZpbmRzIGFuIGVsZW1lbnQgaW5zaWRlIG9mIHBhcmVudC5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSBzdHJpbmcgfCBzZWxlY3RvclxyXG5cdCAqIEBwYXJhbSBvYmplY3QgfCBjb250ZXh0XHJcblx0ICogQHJldHVybiBtaXhlZFxyXG5cdCAqL1xyXG5cdHN0YXRpYyBmaW5kKHNlbGVjdG9yLCBjb250ZXh0ID0gd2luZG93LmRvY3VtZW50KSBcclxuXHR7XHJcblx0XHRyZXR1cm4gcXVlcnlFbGVtZW50KHNlbGVjdG9yLCBjb250ZXh0KTtcclxuXHR9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBRdWVyaWVzIGFuIGVsZW1lbnQgZnJvbSB0aGUgRE9NLlxyXG4gKlxyXG4gKiBAcGFyYW0gc3RyaW5nIHwgc2VsZWN0b3JcclxuICogQHBhcmFtIG9iamVjdCB8IHBhcmVudEVsZW1lbnRcclxuICogQHJldHVybiBtaXhlZFxyXG4gKi9cclxuZnVuY3Rpb24gcXVlcnlFbGVtZW50KHNlbGVjdG9yLCBwYXJlbnRFbGVtZW50KSBcclxue1xyXG5cdGlmICh0eXBlb2Ygc2VsZWN0b3IgIT0gJ3N0cmluZycpIHtcclxuXHRcdHRocm93IG5ldyBJbnZhbGlkQXJndW1lbnRFeGNlcHRpb24kMSgncXVlcnlFbGVtZW50KCkgZXhwZWN0cyBmaXJzdCBwYXJhbWV0ZXIgdG8gYmUgYSBzdHJpbmcsIGJ1dCAnICsgdHlwZW9mIHNlbGVjdG9yICsgJyB3YXMgcGFzc2VkIGluc3RlYWQuJyk7XHJcblx0fVxyXG5cclxuXHRsZXQgZWxlbWVudCA9IHBhcmVudEVsZW1lbnQucXVlcnlTZWxlY3RvckFsbChzZWxlY3Rvcik7XHJcblxyXG5cdGlmIChlbGVtZW50Lmxlbmd0aCA9PSAwKSB7XHJcblx0XHRyZXR1cm4gbnVsbDtcclxuXHR9XHJcblxyXG5cdHJldHVybiAoZWxlbWVudC5sZW5ndGggPiAxKSA/IGVsZW1lbnQgOiBlbGVtZW50WzBdO1xyXG59XHJcblxyXG4vKipcclxuICogQ2hlY2tzIGlmIHBhcmVudCBoYXMgY2hpbGQuXHJcbiAqXHJcbiAqIEBwYXJhbSBvYmplY3QgfCBwYXJlbnRFbGVtZW50XHJcbiAqIEBwYXJhbSBvYmplY3QgfCBjaGlsZEVsZW1lbnRcclxuICogQHJldHVybiBib29sXHJcbiAqL1xyXG5mdW5jdGlvbiBoYXNDaGlsZChwYXJlbnRFbGVtZW50LCBjaGlsZEVsZW1lbnQpIFxyXG57XHJcbiAgICAgbGV0IG5vZGUgPSBjaGlsZEVsZW1lbnQucGFyZW50Tm9kZTtcclxuICAgICBcclxuICAgICB3aGlsZSAobm9kZSAhPSBudWxsKSB7XHJcbiAgICAgICAgIGlmIChub2RlID09IHBhcmVudEVsZW1lbnQpIHtcclxuICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICB9XHJcbiAgICAgICAgIG5vZGUgPSBub2RlLnBhcmVudE5vZGU7XHJcbiAgICAgfVxyXG4gICAgIFxyXG4gICAgIHJldHVybiBmYWxzZTtcclxufVxuXG4vKipcclxuICogQGZpbGUgXHJcbiAqIENvbW1vbiBjbGFzcy5cclxuICpcclxuICogQWRkcyBzb21lIHVzZWZ1bCBmdW5jdGlvbmFsaXR5IGZvclxyXG4gKiBjb21tb24gdGFza3MgLSBkYXRhIGNoZWNrcyBvciBkYXRhIG1hbmlwdWxhdGlvbi5cclxuICovXHJcblxyXG5jbGFzcyBDb21tb25cclxue1xyXG5cdC8qKlxyXG5cdCAqIEV4dGVuZCBhbiBvYmplY3QuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gb2JqZWN0IHwgY3VycmVudE9iamVjdFxyXG5cdCAqIEBwYXJhbSBvYmplY3QgfCBuZXdPYmplY3RcclxuXHQgKiBAcmV0dXJuIG9iamVjdFxyXG5cdCAqL1xyXG5cdHN0YXRpYyBleHRlbmQoY3VycmVudE9iamVjdCwgbmV3T2JqZWN0KSB7XHJcblx0XHR2YXIgZXh0ZW5kZWQgPSB7fTtcclxuXHQgICAgdmFyIHByb3A7XHJcblxyXG5cdCAgICBmb3IgKHByb3AgaW4gY3VycmVudE9iamVjdCkge1xyXG5cdCAgICAgICAgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChjdXJyZW50T2JqZWN0LCBwcm9wKSkge1xyXG5cdCAgICAgICAgICAgIGV4dGVuZGVkW3Byb3BdID0gY3VycmVudE9iamVjdFtwcm9wXTtcclxuXHQgICAgICAgIH1cclxuXHQgICAgfVxyXG5cclxuXHQgICAgZm9yIChwcm9wIGluIG5ld09iamVjdCkge1xyXG5cdCAgICAgICAgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChuZXdPYmplY3QsIHByb3ApKSB7XHJcblx0ICAgICAgICAgICAgZXh0ZW5kZWRbcHJvcF0gPSBuZXdPYmplY3RbcHJvcF07XHJcblx0ICAgICAgICB9XHJcblx0ICAgIH1cclxuXHJcblx0ICAgIHJldHVybiBleHRlbmRlZDtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIENoZWNrcyBmb3IgYSBuZWVkbGUgaW4gaHlzdGFjayBhcnJheS5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSBtaXhlZCB8IG5lZWRsZVxyXG5cdCAqIEBwYXJhbSBvYmplY3QgfCBvYmplY3RcclxuXHQgKiBAcmV0dXJuIGJvb2xcclxuXHQgKlxyXG5cdCAqL1xyXG5cdHN0YXRpYyBpbl9hcnJheShuZWVkbGUsIGh5c3RhY2spIHtcclxuXHRcdGlmKGh5c3RhY2suY29uc3RydWN0b3IgIT09IEFycmF5KSB7XHJcblx0XHRcdHRocm93IG5ldyBJbnZhbGlkQXJndW1lbnRFeGNlcHRpb24kMTtcclxuXHRcdH1cclxuXHJcblx0XHRmb3IodmFyIGkgPSAwOyBpIDw9IGh5c3RhY2subGVuZ3RoOyBpKyspIHtcclxuXHRcdFx0aWYobmVlZGxlID09IGh5c3RhY2tbaV0pIHtcclxuXHRcdFx0XHRyZXR1cm4gdHJ1ZTtcdFxyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0XHJcblx0XHRyZXR1cm4gZmFsc2U7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBUYWtlcyBhbiBhcnJheSBhbmQgY2h1bmtzIGl0LlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIGFycmF5IHwgdG90YWxcclxuXHQgKiBAcGFyYW0gbnVtYmVyIHwgY2h1bmtzXHJcblx0ICogQHJldHVybiBhcnJheVxyXG5cdCAqL1xyXG5cdHN0YXRpYyBhcnJheV9jaHVuayh0b3RhbCwgc2l6ZSA9IDUpXHJcblx0eyAgICAgICAgXHJcbiAgICAgIFx0aWYgKGlzTmFOKHNpemUpKSB7XHJcbiAgICAgIFx0XHR0aHJvdyBuZXcgSW52YWxpZEFyZ3VtZW50RXhjZXB0aW9uJDEoJ0NvbW1vbi5hcnJheV9jaHVuaygpIGV4cGVjdHMgdGhlIHNlY29uZCBwYXJhbWV0ZXIgdG8gYmUgYSBudW1iZXIsIGJ1dCAnICsgdHlwZW9mIHNpemUgKyAnIHBhc3NlZCBpbnN0ZWFkLicpXHJcbiAgICAgIFx0fVxyXG5cclxuICAgICAgXHRzaXplID0gcGFyc2VJbnQoc2l6ZSk7XHJcbiAgICAgICBcclxuICAgICAgIFx0bGV0IGk7XHJcbiAgICAgICBcdGxldCBjb2xsZWN0aW9uID0gW107XHJcblxyXG4gICAgICAgIC8vIGFkZCBlYWNoIGNodW5rIHRvIHRoZSByZXN1bHRcclxuICAgICAgICBmb3IgKGkgPSAwOyBpIDwgTWF0aC5jZWlsKHRvdGFsLmxlbmd0aCAvIHNpemUpOyBpKyspIHtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHZhciBzdGFydCA9IGkgKiBzaXplO1xyXG4gICAgICAgICAgICB2YXIgZW5kID0gc3RhcnQgKyBzaXplO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgY29sbGVjdGlvbi5wdXNoKHRvdGFsLnNsaWNlKHN0YXJ0LCBlbmQpKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIHJldHVybiBjb2xsZWN0aW9uO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQ2hlY2tzIGlmIGFuIG9iamVjdCBpcyBlbXB0eS5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSBvYmplY3QgfCBvYmplY3RcclxuXHQgKiBAcmV0dXJuIGJvb2xcclxuXHQgKi9cclxuXHRzdGF0aWMgZW1wdHlPYmplY3Qob2JqZWN0KSB7XHJcblx0XHRmb3IgKGxldCBwcm9wIGluIG9iamVjdCkge1xyXG5cdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIHRydWU7XHJcblx0fVxyXG5cclxuXHJcblx0LyoqXHJcblx0ICogQ2hlY2tzIGlmIGEgZ2l2ZW4gb2JqZWN0IGNvbnRhaW5lZCBpbiBhbiBhcnJheS5cclxuXHQgKiBcclxuXHQgKiBAcGFyYW0gb2JqZWN0IHwgb2JqZWN0XHJcblx0ICogQHBhcmFtIGFycmF5IHwgaGF5c3RhY2tcclxuXHQgKiBAcmV0dXJuIGJvb2xcclxuXHQgKi9cclxuXHRzdGF0aWMgY29udGFpbnNPYmplY3Qob2JqZWN0LCBoeXN0YWNrKSBcclxuXHR7XHJcblx0ICAgIGxldCBpO1xyXG5cclxuXHQgICAgZm9yIChpID0gMDsgaSA8IGh5c3RhY2subGVuZ3RoOyBpKyspIHtcclxuXHQgICAgICAgIGlmICh0eXBlb2Ygb2JqZWN0ID09ICdzdHJpbmcnICYmIGh5c3RhY2tbaV0uY29uc3RydWN0b3IubmFtZSA9PT0gb2JqZWN0KSB7XHJcblx0ICAgICAgICBcdHJldHVybiB0cnVlO1xyXG5cdCAgICAgICAgfVxyXG5cclxuXHQgICAgICAgIGlmIChoeXN0YWNrW2ldID09PSBvYmplY3QpIHtcclxuXHQgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuXHQgICAgICAgIH1cclxuXHQgICAgfVxyXG5cclxuXHQgICAgcmV0dXJuIGZhbHNlO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQ2hlY2tzIGlmIGEgZ2l2ZW4gcGFyYW1ldGVyIGlzIGFuIG9iamVjdC5cclxuXHQgKiBcclxuXHQgKiBAcGFyYW0gb2JqZWN0IHwgb2JqZWN0XHJcblx0ICogQHJldHVybiBib29sXHJcblx0ICovXHJcblx0c3RhdGljIGlzT2JqZWN0KG9iamVjdCkgXHJcblx0e1xyXG5cdFx0cmV0dXJuIHR5cGVvZiBvYmplY3QgPT0gJ29iamVjdCc7XHJcblx0fVxyXG59XG5cbmxldCBkZWZhdWx0TWVzc2FnZSQxID0gJ1RoZSBkYXRhIHN0cnVjdHVyZSBpcyBpbnZhbGlkJztcclxuXHJcbmNsYXNzIEludmFsaWREYXRhU3RydWN0dXJlRXhjZXB0aW9uIGV4dGVuZHMgRXhjZXB0aW9uSGFuZGxlclxyXG57XHJcblx0Y29uc3RydWN0b3IobWVzc2FnZSA9IG51bGwpIFxyXG5cdHtcclxuXHRcdG1lc3NhZ2UgPSBtZXNzYWdlIHx8IGRlZmF1bHRNZXNzYWdlJDE7XHJcblx0XHRzdXBlcihtZXNzYWdlKTtcclxuICAgIFx0c3VwZXIuc3RhY2tUcmFjZSh0aGlzLCBtZXNzYWdlKTtcclxuICAgIH1cclxufVxuXG4vKipcclxuICogQGZpbGUgXHJcbiAqIFJlcXVlc3QgY2xhc3MuXHJcbiAqXHJcbiAqIEhhbmRsZXMgYWpheCByZXF1ZXN0cyBQT1NULCBHRVQgZXRjLi4uXHJcbiAqL1xyXG5cclxuLyoqXHJcbiAqIFN0b3JlcyB0aGUgZGVmYXVsdCBzZXR0aW5ncy5cclxuICpcclxuICogQHZhciBvYmplY3RcclxuICovXHJcblxyXG5sZXQgZGVmYXVsdFNldHRpbmdzID0ge1xyXG5cdGhlYWRlcnM6IHtcclxuXHRcdCdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbidcclxuXHR9LFxyXG5cdGFzeW5jOiB0cnVlXHJcbn07XHJcblxyXG5jbGFzcyBSZXF1ZXN0XHJcbntcclxuXHQvKipcclxuXHQgKiAtIEluaXRpYWxpemUgdGhlIHNldHRpbmdzIG9iamVjdC5cclxuXHQgKiAtIEluaXRpYWxpemUgdGhlIHhociBvYmplY3QuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gb2JqZWN0IHwgc2V0dGluZ3NcclxuXHQgKiBAcmV0dXJuIHZvaWRcclxuXHQgKi9cclxuXHRjb25zdHJ1Y3RvcihzZXR0aW5ncylcclxuXHR7XHJcblx0XHR0aGlzLnNldHRpbmdzID0gQ29tbW9uLmV4dGVuZChkZWZhdWx0U2V0dGluZ3MsIHNldHRpbmdzKTtcclxuXHRcdHRoaXMuc2V0RGVmYXVsdFJlcXVlc3RIZWFkZXIoKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFNldHMgdGhlIGRlZmF1bHQgcmVxdWVzdCBoZWFkZXJzLlxyXG5cdCAqXHJcblx0ICogQHJldHVybiB2b2lkXHJcblx0ICovXHJcblx0c2V0RGVmYXVsdFJlcXVlc3RIZWFkZXIoKVxyXG5cdHtcclxuXHRcdGxldCBoZWFkZXI7XHJcblx0XHRsZXQgaGVhZGVycyA9IHRoaXMuc2V0dGluZ3MuaGVhZGVycztcclxuXHRcdGxldCBhc3luYyA9IHRoaXMuc2V0dGluZ3MuYXN5bmM7XHJcblx0XHRsZXQgb3BlbiA9IFhNTEh0dHBSZXF1ZXN0LnByb3RvdHlwZS5vcGVuO1xyXG5cdFx0bGV0IHNldFJlcXVlc3RIZWFkZXIgPSBYTUxIdHRwUmVxdWVzdC5wcm90b3R5cGUuc2V0UmVxdWVzdEhlYWRlcjtcclxuXHJcblx0XHRYTUxIdHRwUmVxdWVzdC5wcm90b3R5cGUub3BlbiA9IGZ1bmN0aW9uKCkge1xyXG5cdFx0XHR2YXIgcmVzcG9uc2UgPSBvcGVuLmFwcGx5KHRoaXMsIGFyZ3VtZW50cywgYXN5bmMpO1xyXG5cclxuXHRcdFx0Zm9yIChoZWFkZXIgaW4gaGVhZGVycykge1xyXG5cdFx0XHRcdHRoaXMuc2V0UmVxdWVzdEhlYWRlcihoZWFkZXIsIGhlYWRlcnNbaGVhZGVyXSk7XHJcblx0XHRcdH1cclxuXHJcblx0ICBcdFx0cmV0dXJuIHJlc3BvbnNlO1xyXG5cdFx0fTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIE1ha2VzIGEgUE9TVCByZXF1ZXN0LlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIG9iamVjdCB8IG9wdGlvbnNcclxuXHQgKiBAcmV0dXJuIFByb21pc2VcclxuXHQgKi9cclxuXHRwb3N0KG9wdGlvbnMpXHJcblx0e1xyXG5cdFx0bGV0IHhociA9IHRoaXMueGhyO1xyXG5cclxuXHRcdGlmKG9wdGlvbnMuaGFzT3duUHJvcGVydHkoJ2JlZm9yZScpICYmIHR5cGVvZiBvcHRpb25zLmJlZm9yZSA9PSAnZnVuY3Rpb24nKSB7XHJcblx0XHRcdG9wdGlvbnMuYmVmb3JlLmNhbGwodGhpcyk7XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xyXG5cdFx0XHRpZih0eXBlb2Ygb3B0aW9ucyAhPT0gJ29iamVjdCcpIHtcclxuXHRcdFx0XHR0aHJvdyBuZXcgRXJyb3IoJ2dldCBleHBlY3RpbmcgYSBqc29uIG9iamVjdCB0byBiZSBwYXNzZWQgYXMgYW4gYXJndW1lbnQsIGJ1dCAnKyB0eXBlb2Ygb3B0aW9ucyArICcgd2FzIHBhc3NlZC4nKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0b3B0aW9ucy5kYXRhID0gb3B0aW9ucy5kYXRhIHx8IHt9O1xyXG5cclxuXHRcdFx0aWYodHlwZW9mIG9wdGlvbnMuZGF0YSAhPT0gJ29iamVjdCcpIHtcclxuXHRcdFx0XHR0aHJvdyBuZXcgRXJyb3IoJ2RhdGEgcHJvcGVydHkgZXhwZWN0aW5nIGEganNvbiBvYmplY3QgdG8gYmUgcGFzc2VkIGFzIGFuIGFyZ3VtZW50LCBidXQgJyArIHR5cGVvZiBvcHRpb25zLmRhdGEgKyAnIHdhcyBwYXNzZWQuJyk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHhoci5vcGVuKCdQT1NUJywgb3B0aW9ucy51cmwsIHRydWUpO1xyXG5cclxuXHRcdFx0eGhyLnJlc3BvbnNlVHlwZSA9IG9wdGlvbnMuZGF0YVR5cGUgfHwgJ2pzb24nO1xyXG5cdFx0XHR4aHIudGltZW91dCA9IG9wdGlvbnMudGltZW91dCB8fCAzMDAwO1xyXG5cclxuXHRcdFx0eGhyLm9ucmVhZHlzdGF0ZWNoYW5nZSA9IGZ1bmN0aW9uKCkge1xyXG5cdFx0XHQgICAgaWYodGhpcy5yZWFkeVN0YXRlICE9IDQgfHwgdGhpcy5zdGF0dXMgIT0gMjAwKSB7XHJcblx0XHRcdCAgICBcdHJldHVybjtcclxuXHRcdFx0ICAgIH1cclxuXHQgICAgICAgXHRcclxuICAgICAgIFx0XHRcdHJlc29sdmUodGhpcy5yZXNwb25zZSk7XHJcbiAgICAgICBcdFx0XHRcclxuICAgICAgIFx0XHRcdGlmKG9wdGlvbnMuaGFzT3duUHJvcGVydHkoJ2FmdGVyJykgJiYgdHlwZW9mIG9wdGlvbnMuYWZ0ZXIgPT0gJ2Z1bmN0aW9uJykge1xyXG5cdFx0XHRcdFx0b3B0aW9ucy5hZnRlci5jYWxsKHRoaXMpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fTtcclxuXHJcblx0XHRcdHhoci5vbmVycm9yID0gZnVuY3Rpb24obWVzc2FnZSkge1xyXG5cdFx0XHRcdGlmKG9wdGlvbnMuaGFzT3duUHJvcGVydHkoJ2Vycm9yJykgJiYgdHlwZW9mIG9wdGlvbnMuZXJyb3IgPT0gJ2Z1bmN0aW9uJykge1xyXG5cdFx0XHRcdFx0b3B0aW9ucy5lcnJvcihtZXNzYWdlKTtcclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdHJlamVjdChtZXNzYWdlKTtcclxuXHRcdFx0fTtcclxuXHJcblx0XHRcdGlmKCEgb3B0aW9ucy5kYXRhKSB7XHJcblx0XHRcdFx0eGhyLnNlbmQobnVsbCk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHZhciBxdWVyeVN0cmluZyA9IE9iamVjdC5rZXlzKG9wdGlvbnMuZGF0YSkubWFwKGZ1bmN0aW9uKGtleSkge1xyXG5cdFx0ICAgICAgICAgICAgcmV0dXJuIGVuY29kZVVSSUNvbXBvbmVudChrZXkpICsgJz0nICtcclxuXHRcdCAgICAgICAgICAgICAgICBcdGVuY29kZVVSSUNvbXBvbmVudChvcHRpb25zLmRhdGFba2V5XSk7XHJcblx0XHQgICAgICAgIFx0fSkuam9pbignJicpO1xyXG5cclxuXHRcdFx0eGhyLnNlbmQocXVlcnlTdHJpbmcpO1xyXG5cdFx0fSk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBNYWtlcyBhIEdFVCBhamF4IHJlcXVlc3QuXHJcblx0ICogXHJcblx0ICogQHBhcmFtIG9iamVjdCB8IG9wdGlvbnNcclxuXHQgKiBAcmV0dXJuIFByb21pc2VcclxuXHQgKi9cclxuXHRnZXQob3B0aW9ucylcclxuXHR7XHJcblx0XHRsZXQgeGhyID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCkgfHwgbmV3IEFjdGl2ZVhPYmplY3QoXCJNaWNyb3NvZnQuWE1MSFRUUFwiKTtcdFx0XHRcclxuXHJcblx0XHRpZihvcHRpb25zLmhhc093blByb3BlcnR5KCdiZWZvcmUnKSAmJiB0eXBlb2Ygb3B0aW9ucy5iZWZvcmUgPT0gJ2Z1bmN0aW9uJykge1xyXG5cdFx0XHRvcHRpb25zLmJlZm9yZS5jYWxsKHRoaXMpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcclxuXHRcdFx0aWYodHlwZW9mIG9wdGlvbnMgIT09ICdvYmplY3QnKSB7XHJcblx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKCdnZXQgZXhwZWN0aW5nIGEganNvbiBvYmplY3QgdG8gYmUgcGFzc2VkIGFzIGFuIGFyZ3VtZW50LCBidXQgJysgdHlwZW9mIG9wdGlvbnMgKyAnIHdhcyBwYXNzZWQuJyk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdG9wdGlvbnMuZGF0YSA9IG9wdGlvbnMuZGF0YSB8fCB7fTtcclxuXHJcblx0XHRcdGlmKHR5cGVvZiBvcHRpb25zLmRhdGEgIT09ICdvYmplY3QnKSB7XHJcblx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKCdkYXRhIHByb3BlcnR5IGV4cGVjdGluZyBhIGpzb24gb2JqZWN0IHRvIGJlIHBhc3NlZCBhcyBhbiBhcmd1bWVudCwgYnV0ICcgKyB0eXBlb2Ygb3B0aW9ucy5kYXRhICsgJyB3YXMgcGFzc2VkLicpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHR4aHIub3BlbignR0VUJywgb3B0aW9ucy51cmwsIHRydWUpO1xyXG5cclxuXHRcdFx0eGhyLnJlc3BvbnNlVHlwZSA9IG9wdGlvbnMuZGF0YVR5cGUgfHwgJ2pzb24nO1xyXG5cdFx0XHR4aHIudGltZW91dCA9IG9wdGlvbnMudGltZW91dCB8fCAzMDAwO1xyXG5cclxuXHRcdFx0aWYgKHhoci5yZXNwb25zZVR5cGUgPT0gJ2pzb24nKSB7XHJcblx0XHRcdFx0eGhyLnNldFJlcXVlc3RIZWFkZXIoJ0NvbnRlbnQtVHlwZScsICdhcHBsaWNhdGlvbi9qc29uJyk7XHJcblx0XHRcdFx0eGhyLnNldFJlcXVlc3RIZWFkZXIoJ0FjY2VwdCcsICdhcHBsaWNhdGlvbi9qc29uJyk7XHJcblx0XHRcdH1cclxuXHRcdFx0XHJcblx0XHRcdHhoci5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBmdW5jdGlvbigpIHtcclxuXHRcdFx0ICAgIGlmKHRoaXMucmVhZHlTdGF0ZSAhPSA0IHx8IHRoaXMuc3RhdHVzICE9IDIwMCkge1xyXG5cdFx0XHQgICAgXHRyZXR1cm47XHJcblx0XHRcdCAgICB9XHJcblxyXG5cdFx0XHQgICAgbGV0IHJlc3BvbnNlID0gdGhpcy5yZXNwb25zZSB8fCB0aGlzLnJlc3BvbnNlVGV4dDsgXHJcblx0XHRcdCAgICByZXNwb25zZSA9ICh4aHIucmVzcG9uc2VUeXBlID09ICdqc29uJyAmJiB0eXBlb2YgcmVzcG9uc2UgIT0gJ29iamVjdCcpID8gSlNPTi5wYXJzZShyZXNwb25zZSkgOiByZXNwb25zZTtcclxuXHRcdFx0ICAgIHJlc29sdmUocmVzcG9uc2UpO1x0XHJcbiAgICAgICBcdFx0XHRcclxuICAgICAgIFx0XHRcdGlmKG9wdGlvbnMuaGFzT3duUHJvcGVydHkoJ2FmdGVyJykgJiYgdHlwZW9mIG9wdGlvbnMuYWZ0ZXIgPT0gJ2Z1bmN0aW9uJykge1xyXG5cdFx0XHRcdFx0b3B0aW9ucy5hZnRlci5jYWxsKHRoaXMpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fTtcclxuXHJcblx0XHRcdHhoci5vbmVycm9yID0gZnVuY3Rpb24obWVzc2FnZSkge1xyXG5cdFx0XHRcdGlmKG9wdGlvbnMuaGFzT3duUHJvcGVydHkoJ2Vycm9yJykgJiYgdHlwZW9mIG9wdGlvbnMuZXJyb3IgPT0gJ2Z1bmN0aW9uJykge1xyXG5cdFx0XHRcdFx0b3B0aW9ucy5lcnJvcihtZXNzYWdlKTtcclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdHJlamVjdChtZXNzYWdlKTtcclxuXHRcdFx0fTtcclxuXHJcblx0XHRcdGlmKCEgb3B0aW9ucy5kYXRhKSB7XHJcblx0XHRcdFx0eGhyLnNlbmQobnVsbCk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHZhciBxdWVyeVN0cmluZyA9IE9iamVjdC5rZXlzKG9wdGlvbnMuZGF0YSkubWFwKGZ1bmN0aW9uKGtleSkge1xyXG5cdFx0ICAgICAgICAgICAgcmV0dXJuIGVuY29kZVVSSUNvbXBvbmVudChrZXkpICsgJz0nICtcclxuXHRcdCAgICAgICAgICAgICAgICBcdGVuY29kZVVSSUNvbXBvbmVudChvcHRpb25zLmRhdGFba2V5XSk7XHJcblx0XHQgICAgICAgIFx0fSkuam9pbignJicpO1xyXG5cclxuXHRcdFx0eGhyLnNlbmQocXVlcnlTdHJpbmcpO1xyXG5cdFx0fSk7XHJcblx0fVxyXG59XG5cbmxldCBkZWZhdWx0TWVzc2FnZSQyID0gJ3RyeWluZyB0byBiaW5kIGFuIGFscmVhZHkgZXhpc3RpbmcgYm91bmQuJztcclxuXHJcbmNsYXNzIEludmFsaWRCaW5kaW5nRXhjZXB0aW9uIGV4dGVuZHMgRXhjZXB0aW9uSGFuZGxlclxyXG57XHJcblx0Y29uc3RydWN0b3IobWVzc2FnZSA9IG51bGwpIFxyXG5cdHtcclxuXHRcdG1lc3NhZ2UgPSBtZXNzYWdlIHx8IGRlZmF1bHRNZXNzYWdlJDI7XHJcblx0XHRzdXBlcihtZXNzYWdlKTtcclxuICAgIFx0c3VwZXIuc3RhY2tUcmFjZSh0aGlzLCBtZXNzYWdlKTtcclxuICAgIH1cclxufVxuXG4vKipcclxuICogQGZpbGUgXHJcbiAqIENvbnRhaW5lciBjbGFzcy5cclxuICpcclxuICogSGFuZGxlcy9Db250cm9scyB0aGUgZGVwZW5kZW5jaWVzIG9mIGVjb21tZXJjZS5cclxuICovXHJcblxyXG4vKipcclxuICogU3RvcmVzIHRoZSBpbnN0YW5jZXNcclxuICpcclxuICogQHZhciBhcnJheVxyXG4gKi9cclxubGV0IGluc3RhbmNlcyA9IFtdO1xyXG5cclxuY2xhc3MgQ29udGFpbmVyIFxyXG57XHJcblx0LyoqXHJcblx0ICogQmluZHMga2V5IHRvIGNvbmNyZXRlIGNsYXNzLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIHN0cmluZyB8IGtleVxyXG5cdCAqIEBwYXJhbSBjbGFzcyB8IGNvbmNyZXRlXHJcblx0ICogQHJldHVybiB2b2lkXHJcblx0ICovXHJcblx0YmluZChrZXksIGNvbmNyZXRlKSBcclxuXHR7XHJcblx0XHRpZiAodHlwZW9mIGtleSAhPSAnc3RyaW5nJykge1xyXG5cdFx0XHR0aHJvdyBuZXcgSW52YWxpZEFyZ3VtZW50RXhjZXB0aW9uJDEoJ2JpbmQoKSBleHBlY3RzIHRoZSBmaXJzdCBwYXJhbWV0ZXIgdG8gYmUgc3RyaW5nLCBidXQgJyArIHR5cGVvZiBrZXkgKyAnIHdhcyBwYXNzZWQgaW5zdGVhZC4nKTtcclxuXHRcdH1cclxuXHJcblx0XHRpZiAodHlwZW9mIGNvbmNyZXRlICE9ICdmdW5jdGlvbicpIHsgXHJcblx0XHRcdHRocm93IG5ldyBJbnZhbGlkQXJndW1lbnRFeGNlcHRpb24kMSgnYmluZCgpIGV4cGVjdHMgdGhlIHNlY29uZCBwYXJhbWV0ZXIgdG8gYmUgYSBmdW5jdGlvbiwgYnV0ICcgKyB0eXBlb2YgY29uY3JldGUgKyAnIHdhcyBwYXNzZWQgaW5zdGVhZC4nKTtcclxuXHRcdH1cclxuXHJcblx0XHRpZiAodHlwZW9mIHRoaXNba2V5XSAhPSAndW5kZWZpbmVkJykge1xyXG5cdFx0XHR0aHJvdyBuZXcgSW52YWxpZEJpbmRpbmdFeGNlcHRpb24oJ2JpbmQoKSByZWNpZXZlZCBhbiBhbHJlYWR5IGV4aXN0aW5nIGJpbmQuJyk7XHJcblx0XHR9XHJcblxyXG5cdFx0dGhpc1trZXldID0gY29uY3JldGUuYmluZChjb25jcmV0ZSwgdGhpcyk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBTZXRzIGFuIGluc3RhbmNlLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIHN0cmluZyB8IGtleVxyXG5cdCAqIEBwYXJhbSBvYmplY3QgfCBpbnN0YW5jZVxyXG5cdCAqIEBwYXJhbSBzdHJpbmcgfCBhbGlhc1xyXG5cdCAqIEByZXR1cm4gdm9pZFxyXG5cdCAqL1xyXG5cdHNldEluc3RhbmNlKGtleSwgaW5zdGFuY2UsIGFsaWFzID0gbnVsbCkgXHJcblx0e1xyXG5cdFx0aWYgKHR5cGVvZiBrZXkgIT0gJ3N0cmluZycpIHtcclxuXHRcdFx0dGhyb3cgbmV3IEludmFsaWRBcmd1bWVudEV4Y2VwdGlvbiQxKCdzZXRJbnN0YWNlKCkgZXhwZWN0cyB0aGUgZmlyc3QgcGFyYW1ldGVyIHRvIGJlIGEgc3RyaW5nLCBidXQgJyArIHR5cGVvZiBrZXkgKyAnIHdhcyBwYXNzZWQgaW5zdGVhZC4nKTtcclxuXHRcdH1cclxuXHJcblx0XHRpZiAodHlwZW9mIGluc3RhbmNlICE9ICdvYmplY3QnKSB7XHJcblx0XHRcdHRocm93IG5ldyBJbnZhbGlkQXJndW1lbnRFeGNlcHRpb24kMSgnc2V0SW5zdGFuY2UoKSBleHBlY3RzIHRoZSBzZWNvbmQgcGFyYW1ldGVyIHRvIGJlIGFuIG9iamVjdCwgYnV0ICcgKyB0eXBlb2YgaW5zdGFuY2UgKyAnIHdhcyBwYXNzZWQgaW5zdGVhZC4nKTtcclxuXHRcdH1cclxuXHJcblx0XHRpbnN0YW5jZXNba2V5XSA9IGluc3RhbmNlO1xyXG5cdFx0aW5zdGFuY2VzW2FsaWFzXSA9IGluc3RhbmNlO1xyXG5cdFx0dGhpc1trZXldID0gaW5zdGFuY2U7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBSZXNvbHZlcyBhbiBpbnN0YW5jZSBvdXQgb2YgXHJcblx0ICogdGhlIGlvYyBjb250YWluZXIuXHJcblx0ICogXHJcblx0ICogQHBhcmFtIHN0cmluZyB8IGtleVxyXG5cdCAqIEByZXR1cm4gb2JqZWN0XHJcblx0ICovXHJcblx0Z2V0SW5zdGFuY2Uoa2V5KSBcclxuXHR7XHJcblx0XHRpZih0eXBlb2Yga2V5ICE9ICdzdHJpbmcnKSB7XHJcblx0XHRcdHRocm93IG5ldyBJbnZhbGlkQXJndW1lbnRFeGNlcHRpb24kMSgnZ2V0SW5zdGFjZSgpIGV4cGVjdHMgdGhlIGZpcnN0IHBhcmFtZXRlciB0byBiZSBhIHN0cmluZywgYnV0ICcgKyB0eXBlb2Yga2V5ICsgJyB3YXMgcGFzc2VkIGluc3RlYWQuJyk7XHJcblx0XHR9XHJcblxyXG5cdFx0aWYodHlwZW9mIGtleSA9PSAnb2JqZWN0Jykge1xyXG5cdFx0XHRyZXR1cm4gaW5zdGFuY2VzW2tleS5jb25zdHJ1Y3Rvci5uYW1lXSB8fCBudWxsO1xyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiBpbnN0YW5jZXNba2V5XSB8fCBudWxsO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQ2hlY2tzIGlmIGFuIGluc3RhbmNlIGV4aXN0LlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIG1peGVkIHwgaW5zdGFuY2VcclxuXHQgKiBAcmV0dXJuIGJvb2xcclxuXHQgKi9cclxuXHRpbnN0YW5jZUV4aXN0KGluc3RhbmNlKSBcclxuXHR7XHJcblx0XHRpZiAodHlwZW9mIGluc3RhbmNlID09ICdvYmplY3QnKSB7XHJcblx0XHRcdHJldHVybiAodHlwZW9mIGluc3RhbmNlc1tpbnN0YW5jZS5jb25zdHJ1Y3Rvci5uYW1lXSAhPT0gJ3VuZGVmaW5lZCcpO1xyXG5cdFx0fSBlbHNlIGlmICh0eXBlb2YgaW5zdGFuY2UgPT0gJ3N0cmluZycpIHtcclxuXHRcdFx0cmV0dXJuICh0eXBlb2YgaW5zdGFuY2VzW2luc3RhbmNlXSAhPT0gJ3VuZGVmaW5lZCcpXHJcblx0XHR9XHJcblx0XHRcclxuXHRcdHRocm93IG5ldyBJbnZhbGlkQXJndW1lbnRFeGNlcHRpb24kMSgnaW5zdGFuY2VFeGlzdCgpIGV4cGVjdHMgdGhlIGZpcnN0IHBhcmFtZXRlciB0byBiZSBzdHJpbmcgb3IgYW4gb2JqZWN0LCBidXQgJyArIHR5cGVvZiBpbnN0YW5jZSArICcgd2FzIHBhc3NlZCBpbnN0ZWFkLicpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogUmV0cmlldmUgYW4gb2JqZWN0LCBpZiBub3QgZXhpc3RzXHJcblx0ICogd2lsbCBjcmVhdGUgaXQsIHNldCBpdCBpbiB0aGUgaW9jIGNvbnRhaW5lclxyXG5cdCAqIGZvciBsYXRlciB1c2UgYW5kIHJldHJpZXZlIGl0LlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIG1peGVkIHwgb2JqZWN0IFxyXG5cdCAqIEByZXR1cm4gb2JqZWN0XHJcblx0ICovXHJcblx0bWFrZShvYmplY3QpXHJcblx0e1xyXG5cdFx0bGV0IGluc3RhbmNlID0ge307XHJcblx0XHRsZXQga2V5O1xyXG5cdFx0XHJcblx0XHRpZiAodGhpcy5pbnN0YW5jZUV4aXN0KG9iamVjdCkpIHtcclxuXHRcdFx0cmV0dXJuIHRoaXMuZ2V0SW5zdGFuY2Uob2JqZWN0KTtcclxuXHRcdH1cclxuXHJcblx0XHRpZiAodHlwZW9mIG9iamVjdCA9PSAnb2JqZWN0Jykge1xyXG5cdFx0XHRpbnN0YW5jZSA9IG9iamVjdDtcclxuXHRcdFx0a2V5ID0gb2JqZWN0LmNvbnN0cnVjdG9yLm5hbWU7XHJcblx0XHRcdHRoaXMuc2V0SW5zdGFuY2Uoa2V5LCBpbnN0YW5jZSk7IFxyXG5cdFx0fSBlbHNlIGlmKHR5cGVvZiBvYmplY3QgPT0gJ3N0cmluZycgJiYgdGhpcy5oYXNPd25Qcm9wZXJ0eShvYmplY3QpKSB7XHJcblx0XHRcdGluc3RhbmNlID0gbmV3IHRoaXNbb2JqZWN0XTtcclxuXHRcdFx0a2V5ID0gb2JqZWN0O1xyXG5cdFx0XHR0aGlzLnNldEluc3RhbmNlKGtleSwgaW5zdGFuY2UpO1x0XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHR0aHJvdyBuZXcgSW52YWxpZEJpbmRpbmdFeGNlcHRpb24oJ1RoZSBwYXJhbWV0ZXIgeW91IHBhc3NlZCBjb3VsZCBub3QgYmUgYm91bmRlZCB0byB0aGUgY29udGFpbmVyLCBwYXJhbWV0ZXI6ICcgKyB0eXBlb2Ygb2JqZWN0KTtcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gaW5zdGFuY2U7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBSZW1vdmUgYWxsIGV4aXN0aW5nIGluc3RhbmNlcy5cclxuXHQgKlxyXG5cdCAqIEByZXR1cm4gdm9pZCBcclxuXHQgKi9cclxuXHRmbHVzaCgpXHJcblx0e1xyXG5cdFx0aW5zdGFuY2VzID0gW107XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBSZXRyaWV2ZSBhbGwgaW5zdGFuY2VzLlxyXG5cdCAqXHJcblx0ICogQHJldHVybiBhcnJheVxyXG5cdCAqL1xyXG5cdGluc3RhbmNlcygpIFxyXG5cdHtcclxuXHRcdHJldHVybiBpbnN0YW5jZXM7XHJcblx0fVxyXG59XG5cbmxldCBkZWZhdWx0TWVzc2FnZSQzID0gJ1RoZSBldmVudCB5b3UgY2FsbGVkIGRvZXMgbm90IGV4aXN0cyBvciB5b3Ugc3VwcGxpZWQgd3JvbmcgYXJndW1lbnQnO1xyXG5cclxuY2xhc3MgQmFkRXZlbnRDYWxsRXhjZXB0aW9uIGV4dGVuZHMgRXhjZXB0aW9uSGFuZGxlclxyXG57XHJcblx0Y29uc3RydWN0b3IobWVzc2FnZSA9IG51bGwpIFxyXG5cdHtcclxuXHRcdG1lc3NhZ2UgPSBtZXNzYWdlIHx8IGRlZmF1bHRNZXNzYWdlJDM7XHJcblx0XHRzdXBlcihtZXNzYWdlKTtcclxuICAgIFx0c3VwZXIuc3RhY2tUcmFjZSh0aGlzLCBtZXNzYWdlKTtcclxuICAgIH1cclxufVxuXG4vKipcclxuICogQGZpbGUgXHJcbiAqIEV2ZW50TWFuYWdlciBjbGFzcy5cclxuICpcclxuICogSGFuZGxlcyBzdWJzY3JpcGlvbnMgYW5kIHB1Ymxpc2hpbmcgb2YgZXZlbnRzLlxyXG4gKi9cclxuXHJcbmNsYXNzIEV2ZW50TWFuYWdlclxyXG57XHJcblx0LyoqXHJcblx0ICogU3RvcmVzIHRoZSBldmVudHMgY2FsbGJhY2tzLlxyXG5cdCAqIFxyXG5cdCAqIEB2YXIgYXJyYXlcclxuXHQgKi9cclxuXHRjb25zdHJ1Y3RvcigpXHJcblx0e1xyXG5cdFx0dGhpcy5ldmVudHMgPSB7fTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFN1YnNjcmliaW5nIHRvIGFuIGV2ZW50LlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIHN0cmluZyB8IG5hbWVcclxuXHQgKiBAcGFyYW0gZnVuY3Rpb24gfCBjYWxsYmFja1xyXG5cdCAqIEByZXR1cm4gdm9pZFxyXG5cdCAqL1xyXG5cdHN1YnNjcmliZShuYW1lLCBjYWxsYmFjaykgXHJcblx0e1xyXG5cdFx0aWYgKHR5cGVvZiBjYWxsYmFjayAhPT0gJ2Z1bmN0aW9uJykge1xyXG5cdFx0XHR0aHJvdyBuZXcgSW52YWxpZEFyZ3VtZW50RXhjZXB0aW9uO1xyXG5cdFx0fVxyXG5cclxuXHRcdGlmICh0eXBlb2YgdGhpcy5ldmVudHNbbmFtZV0gPT0gJ3VuZGVmaW5lZCcpIHtcclxuXHRcdFx0dGhpcy5ldmVudHNbbmFtZV0gPSBbXTtcclxuXHRcdH1cclxuXHJcblx0XHR0aGlzLmV2ZW50c1tuYW1lXS5wdXNoKGNhbGxiYWNrKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFB1Ymxpc2ggYW4gZXZlbnQgdG8gYWxsIHN1YnNjcmliZXJzLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIHN0cmluZyB8IG5hbWVcclxuXHQgKiBAcGFyYW0gbGlzdCB8IGRhdGFcclxuXHQgKiBAcmV0dXJuIHZvaWRcclxuXHQgKi9cclxuXHRwdWJsaXNoKG5hbWUsIC4uLmRhdGEpIFxyXG5cdHtcclxuXHRcdGRhdGEgPSBkYXRhIHx8IG51bGw7XHJcblxyXG5cdFx0Ly8gSWYgdGhlcmUgYXJlIG5vIHN1YnNjcmliZXJzIHNpbXBseSBpZ25vcmUgdGhhdCBldmVudC5cclxuXHRcdGlmICh0eXBlb2YgdGhpcy5ldmVudHNbbmFtZV0gPT0gJ3VuZGVmaW5lZCcpIHtcclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0fVxyXG5cclxuXHRcdHRoaXMuZXZlbnRzW25hbWVdLmZvckVhY2goZnVuY3Rpb24oY2FsbGJhY2spIHtcclxuXHRcdFx0aWYodHlwZW9mIGNhbGxiYWNrICE9ICdmdW5jdGlvbicpIHtcclxuXHRcdFx0XHR0aHJvdyBuZXcgSW52YWxpZEFyZ3VtZW50RXhjZXB0aW9uKCdzdWJzY3JpYmUoKSBzaG91bGQgcmVjaWV2ZSBjYWxsYmFjayBhcyBzZWNvbmQgcGFyYW1ldGVyLCBidXQgJysgdHlwZW9mIGNhbGxiYWNrICsnIHdhcyBwYXNzZWQnKTtcclxuXHRcdFx0fVxyXG5cdFx0XHRcclxuXHRcdFx0cmV0dXJuIGNhbGxiYWNrKC4uLmRhdGEpO1xyXG5cdFx0fSk7XHJcblx0fVxyXG59XG5cbi8qKlxyXG4gKiBAZmlsZSBcclxuICogQ29va2llIGNsYXNzLlxyXG4gKlxyXG4gKiBBZGRzIHNvbWUgdXNlZnVsIGZ1bmN0aW9uYWxpdHkgZm9yXHJcbiAqIHNldHRpbmcgb3IgZ2V0dGluZyBjb29raWVzLlxyXG4gKi9cclxuXHRcclxuY2xhc3MgQ29va2llXHJcbntcclxuXHQvKipcclxuIFx0KiBTZXRzIGEgY29va2llLlxyXG4gXHQqIFxyXG4gXHQqIEBwYXJhbSBzdHJpbmcgfCBuYW1lXHJcbiBcdCogQHBhcmFtIEpTT04gfCB2YWx1ZVxyXG4gXHQqIEBwYXJhbSBpbnRlZ2VyIHwgZGF5c1xyXG4gXHQqIEByZXR1cm4gdm9pZFxyXG5cdCovXHJcblx0c3RhdGljIHNldChuYW1lLCB2YWx1ZSwgZGF5cykgXHJcblx0e1xyXG5cdFx0aWYgKHZhbHVlLmNvbnN0cnVjdG9yLm5hbWUgID09ICdPYmplY3QnIHx8IHZhbHVlLmNvbnN0cnVjdG9yLm5hbWUgPT0gJ0FycmF5Jykge1xyXG5cdFx0XHR2YWx1ZSA9IEpTT04uc3RyaW5naWZ5KHZhbHVlKTtcclxuXHRcdH1cclxuXHJcblx0XHRkYXlzID0gZGF5cyB8fCAxMDtcclxuXHJcblx0ICAgIGxldCBleHBpcmVzO1xyXG5cdCAgICBcclxuXHQgICAgaWYgKGRheXMpIHtcclxuXHQgICAgICAgIGxldCBkYXRlID0gbmV3IERhdGUoKTtcclxuXHQgICAgICAgIGRhdGUuc2V0VGltZShkYXRlLmdldFRpbWUoKSArIChkYXlzICogMjQgKiA2MCAqIDYwICogMTAwMCkpO1xyXG5cdCAgICAgICAgZXhwaXJlcyA9IFwiOyBleHBpcmVzPVwiICsgZGF0ZS50b0dNVFN0cmluZygpO1xyXG5cdCAgICB9IGVsc2Uge1xyXG5cdCAgICAgICAgZXhwaXJlcyA9IFwiXCI7XHJcblx0ICAgIH1cclxuXHJcblx0ICAgIGRvY3VtZW50LmNvb2tpZSA9IG5hbWUgKyBcIj1cIiArIHZhbHVlICsgZXhwaXJlcyArIFwiOyBwYXRoPS9cIjtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFJldHJpZXZlcyB0aGUgY29va2llIGJ5IG5hbWUuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gc3RyaW5nIHwgbmFtZVxyXG4gXHQgKiBAcmV0dXJuIEpTT05cclxuXHQgKi9cclxuXHRzdGF0aWMgZ2V0KG5hbWUpIFxyXG5cdHtcclxuXHQgICAgaWYgKGRvY3VtZW50LmNvb2tpZS5sZW5ndGggPiAwKSB7XHJcblx0ICAgICAgICBsZXQgY19zdGFydCA9IGRvY3VtZW50LmNvb2tpZS5pbmRleE9mKG5hbWUgKyBcIj1cIik7XHJcblx0ICAgICAgICBcclxuXHQgICAgICAgIGlmIChjX3N0YXJ0ICE9IC0xKSB7XHJcblx0ICAgICAgICAgICAgY19zdGFydCA9IGNfc3RhcnQgKyBuYW1lLmxlbmd0aCArIDE7XHJcblx0ICAgICAgICAgICAgbGV0IGNfZW5kID0gZG9jdW1lbnQuY29va2llLmluZGV4T2YoXCI7XCIsIGNfc3RhcnQpO1xyXG5cdCAgICAgICAgICAgIFxyXG5cdCAgICAgICAgICAgIGlmIChjX2VuZCA9PSAtMSkge1xyXG5cdCAgICAgICAgICAgICAgICBjX2VuZCA9IGRvY3VtZW50LmNvb2tpZS5sZW5ndGg7XHJcblx0ICAgICAgICAgICAgfVxyXG5cclxuXHQgICAgICAgICAgICByZXR1cm4gSlNPTi5wYXJzZSh1bmVzY2FwZShkb2N1bWVudC5jb29raWUuc3Vic3RyaW5nKGNfc3RhcnQsIGNfZW5kKSkpO1xyXG5cdCAgICAgICAgfVxyXG5cdCAgICB9XHJcblxyXG5cdCAgICByZXR1cm4ge307XHJcblx0fVxyXG59XG5cbi8qKlxyXG4gKiBAZmlsZSBcclxuICogQ2FydCBjbGFzcy5cclxuICpcclxuICogSGFuZGxlcyBhZGRpbmcsIHJlbW92aW5nIGV0Yy4uLiBvZiBpdGVtcy5cclxuICovXHJcblxyXG4vKipcclxuICogVGhlIGRlZmF1bHQgc2V0dGluZ3Mgb2YgdGhlIGNhcnQuXHJcbiAqXHJcbiAqIEB2YXIgb2JqZWN0XHJcbiAqL1xyXG5sZXQgZGVmYXVsdFNldHRpbmdzJDEgPSB7XHJcblx0ZWxlbWVudDogJy5jYXJ0JyxcclxuXHRjb29raWVfbmFtZTogJ2NhcnQnLFxyXG5cdHByZXZpZXdfY2xhc3M6ICcnLFxyXG5cdGxvYWRlcjogJycsXHJcblx0Y2xhc3M6ICcnLFxyXG5cdHdpZHRoOiAnNjBweCcsXHJcblx0aGVpZ2h0OiAnNjBweCcsXHJcblx0cGxhY2VtZW50OiAncmlnaHQtdG9wJyxcclxuXHRmaXhlZDogdHJ1ZSxcclxuXHRob3Zlcl9jb2xvcjogJ29yYW5nZScsXHJcblx0bm9fY3NzOiBmYWxzZSxcclxufTtcclxuXHJcbi8qKlxyXG4gKiBTdG9yZXMgdGhlIGNvbnRhaW5lciBvYmplY3QuXHJcbiAqXHJcbiAqIEB2YXIgXFxDb3JlXFxDb250YWluZXJcclxuICovXHJcbmxldCBDb250YWluZXIkMjtcclxuXHJcbi8qKlxyXG4gKiBTdG9yZXMgdGhlIGV2ZW50IG1hbmFnZXIgb2JqZWN0LlxyXG4gKlxyXG4gKiBAdmFyIFxcQ29yZVxcRXZlbnRNYW5hZ2VyXHJcbiAqL1xyXG5sZXQgRXZlbnRNYW5hZ2VyJDI7XHJcblxyXG4vKipcclxuICogU3RvcmVzIHRoZSByZXF1ZXN0IG9iamVjdC5cclxuICpcclxuICogQHZhciBcXEhlbHBlcnNcXFJlcXVlc3RcclxuICovXHJcbmxldCBIdHRwO1xyXG5cclxuLyoqXHJcbiAqIFN0b3JlcyB0aGUgY2FydCBsb2FkZXIuXHJcbiAqXHJcbiAqIEB2YXIgSFRNTERpdkVsZW1lbnRcclxuICovXHJcbmxldCBsb2FkaW5nT3ZlcmxheTtcclxuXHJcbi8qKlxyXG4gKiBTdG9yZXMgdGhlIGl0ZW1zIHdyYXBwZXIuXHJcbiAqXHJcbiAqIEB2YXIgSFRNTERpdkVsZW1lbnRcclxuICovXHJcbmxldCBpdGVtc0RpdjtcclxuXHJcbmNsYXNzIENhcnQgXHJcbntcclxuXHQvKipcclxuXHQgKiAtIEluaXRpYWxpemUgdGhlIElvQyBjb250YWluZXJcclxuXHQgKiAtIEluaXRpYWxpemUgdGhlIFJlcXVlc3RcclxuXHQgKiAtIEluaXRpYWxpemUgdGhlIEV2ZW50TWFuYWdlclxyXG5cdCAqIC0gQ3JlYXRlcyB0aGUgcHJldmlldyBhbmQgdGhlIGljb24gb2YgdGhlIGNhcnQuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gXFxDb3JlXFxDb250YWluZXIgfCBjb250YWluZXJcclxuXHQgKiBAcGFyYW0gXFxIZWxwZXJzXFxSZXF1ZXN0IHwgaHR0cFxyXG5cdCAqIEBwYXJhbSBcXENvcmVcXEV2ZW50TWFuYWdlciB8IGV2ZW50TWFuYWdlclxyXG5cdCAqIEByZXR1cm4gdm9pZFxyXG5cdCAqL1xyXG5cdGNvbnN0cnVjdG9yKGNvbnRhaW5lciwgaHR0cCwgZXZlbnRNYW5hZ2VyKSBcclxuXHR7XHJcblx0XHRDb250YWluZXIkMiA9IGNvbnRhaW5lcjtcclxuXHRcdEh0dHAgPSBodHRwO1xyXG5cdFx0RXZlbnRNYW5hZ2VyJDIgPSBldmVudE1hbmFnZXI7XHJcblx0XHRcclxuXHRcdHRoaXMucHJldmlld0VsZW1lbnQgPSB0aGlzLmNyZWF0ZVByZXZpZXdFbGVtZW50KCk7XHJcblx0XHR0aGlzLnN2Z0ljb24gPSBjcmVhdGVJY29uLmNhbGwodGhpcyk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBTZXRzIHRoZSBvYmplY3QgYnkgdGhlIHVzZXJzIHNldHRpbmcuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gb2JqZWN0IHwgc2V0dGluZ3NcclxuXHQgKiBAcmV0dXJuIHZvaWRcclxuXHQgKi9cclxuXHRzZXR1cChzZXR0aW5ncylcclxuXHR7XHJcblx0XHRpZih0eXBlb2Ygc2V0dGluZ3MgIT0gJ29iamVjdCcpIHtcclxuXHRcdFx0dGhyb3cgbmV3IEludmFsaWRBcmd1bWVudEV4Y2VwdGlvbiQxO1xyXG5cdFx0fVxyXG5cclxuXHRcdHRoaXMuc2V0dGluZ3MgPSBDb21tb24uZXh0ZW5kKGRlZmF1bHRTZXR0aW5ncyQxLCBzZXR0aW5ncyk7XHJcblxyXG5cdFx0dGhpcy5zZXRFbGVtZW50KHRoaXMuc2V0dGluZ3MuZWxlbWVudCk7XHJcblxyXG5cdFx0RE9NLmFkZENsYXNzKHRoaXMucHJldmlld0VsZW1lbnQsICdjbG9zZWQnKTtcclxuXHRcdERPTS5hZGRDbGFzcyh0aGlzLnByZXZpZXdFbGVtZW50LCB0aGlzLnNldHRpbmdzLnByZXZpZXdfY2xhc3MpO1xyXG5cdFx0XHJcblx0XHR0aGlzLmJpbmRFdmVudExpc3RlbmVycygpO1xyXG5cdFx0dGhpcy5hZGRTdHlsZVRhZygpO1xyXG5cclxuXHRcdGlmKHRoaXMuaXNFbXB0eShDb29raWUuZ2V0KHRoaXMuc2V0dGluZ3MuY29va2llX25hbWUpKSkge1xyXG5cdFx0XHR0aGlzLnNldHVwQ2FydCgpO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQ2hlY2tzIGlmIHRoZSBjYXJ0IGlzIGVtcHR5XHJcblx0ICpcclxuXHQgKiBAcGFyYW0gb2JqZWN0IHwgY2FydFxyXG5cdCAqIEByZXR1cm4gYm9vbFxyXG5cdCAqL1xyXG5cdGlzRW1wdHkoY2FydClcclxuXHR7XHJcblx0XHRyZXR1cm4gQ29tbW9uLmVtcHR5T2JqZWN0KGNhcnQpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogSW5pdGlhbGl6ZS9TZXRzIHRoZSBjYXJ0IGFzIGEgY29va2llLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIG9iamVjdCB8IGNhcnRcclxuXHQgKiBAcmV0dXJuIHZvaWRcclxuXHQgKi9cclxuXHRzZXR1cENhcnQoKVxyXG5cdHtcclxuXHRcdHRoaXMuY2FydCA9IHt9O1xyXG5cdFx0dGhpcy5jYXJ0LmlkID0gU3RyLnJhbmRvbSgxMCk7XHJcblx0XHR0aGlzLmNhcnQuaXRlbXMgPSBbXTtcclxuXHRcdHRoaXMuY2FydC5mYXZvcml0ZXMgPSBbXTtcclxuXHRcdENvb2tpZS5zZXQodGhpcy5zZXR0aW5ncy5jb29raWVfbmFtZSwgdGhpcy5jYXJ0LCAyKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEFkZHMgYW4gaXRlbSB0byB0aGUgY2FydC5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSBvYmplY3QgfCBpdGVtXHJcblx0ICogQHJldHVybiB2b2lkXHJcblx0ICovXHJcblx0YWRkSXRlbShpdGVtKVxyXG5cdHtcclxuXHRcdHRoaXMuY2FydCA9IENvb2tpZS5nZXQodGhpcy5zZXR0aW5ncy5jb29raWVfbmFtZSk7XHJcblxyXG5cdFx0aWYgKCFpdGVtLmhhc093blByb3BlcnR5KCdxdWFudGl0eScpKSB7XHJcblx0XHRcdGl0ZW0ucXVhbnRpdHkgPSAxO1xyXG5cdFx0fVxyXG5cclxuXHRcdGxldCB3YXNBZGRlZCA9IGZhbHNlO1xyXG5cdFx0bGV0IGk7XHJcblxyXG5cdFx0Zm9yIChpID0gMDsgaSA8IHRoaXMuY2FydC5pdGVtcy5sZW5ndGg7IGkrKykge1xyXG5cdFx0XHRpZiAodGhpcy5jYXJ0Lml0ZW1zW2ldLm5hbWUgPT0gaXRlbS5uYW1lKSB7XHJcblx0XHRcdFx0dGhpcy5jYXJ0Lml0ZW1zW2ldLnF1YW50aXR5Kys7XHJcblx0XHRcdFx0d2FzQWRkZWQgPSB0cnVlO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKCEgd2FzQWRkZWQpIHtcclxuXHRcdFx0dGhpcy5jYXJ0Lml0ZW1zLnB1c2goaXRlbSk7XHJcblx0XHR9XHJcblxyXG5cdFx0Q29va2llLnNldCh0aGlzLnNldHRpbmdzLmNvb2tpZV9uYW1lLCB0aGlzLmNhcnQsIDIpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQWRkcyBhbiBpdGVtIHRvIHRoZSBmYXZvcml0ZXMgbGlzdC5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSBvYmplY3QgfCBpdGVtXHJcblx0ICogQHJldHVybiB2b2lkXHJcblx0ICovXHJcblx0ZmF2b3JpdGVJdGVtKGl0ZW0pXHJcblx0e1xyXG5cdFx0dGhpcy5jYXJ0ID0gQ29va2llLmdldCh0aGlzLnNldHRpbmdzLmNvb2tpZV9uYW1lKTtcclxuXHJcblx0XHRsZXQgaTtcclxuXHRcdGxldCB3YXNGYXZvcml0ZWQgPSBmYWxzZTtcclxuXHJcblx0XHRmb3IgKGkgPSAwOyBpIDwgdGhpcy5jYXJ0LmZhdm9yaXRlcy5sZW5ndGg7IGkrKykge1xyXG5cdFx0XHRpZiAodGhpcy5jYXJ0LmZhdm9yaXRlc1tpXS5uYW1lID09IGl0ZW0ubmFtZSkge1xyXG5cdFx0XHRcdHdhc0Zhdm9yaXRlZCA9IHRydWU7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0XHRpZiAoISB3YXNGYXZvcml0ZWQpIHtcclxuXHRcdFx0dGhpcy5jYXJ0LmZhdm9yaXRlcy5wdXNoKGl0ZW0pO1xyXG5cdFx0fVxyXG5cclxuXHRcdENvb2tpZS5zZXQodGhpcy5zZXR0aW5ncy5jb29raWVfbmFtZSwgdGhpcy5jYXJ0LCAyKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFJlbW92ZXMgYW4gaXRlbSBmcm9tIHRoZSBjYXJ0LlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIG9iamVjdCB8IGl0ZW1cclxuXHQgKiBAcmV0dXJuIHZvaWRcclxuXHQgKi9cclxuXHRyZW1vdmVJdGVtKGl0ZW0pXHJcblx0e1xyXG4gXHRcdHRoaXMuY2FydCA9IENvb2tpZS5nZXQodGhpcy5zZXR0aW5ncy5jb29raWVfbmFtZSk7XHJcblxyXG4gXHRcdHRoaXMuY2FydC5pdGVtcy5zcGxpY2UodGhpcy5jYXJ0Lml0ZW1zLmluZGV4T2YoaXRlbSksIDEpO1xyXG5cclxuIFx0XHRDb29raWUuc2V0KHRoaXMuc2V0dGluZ3MuY29va2llX25hbWUsIHRoaXMuY2FydCwgMik7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBBZGRzIHRoZSBpdGVtIHRvIHByZXZpZXcuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gYXJyYXkgfCBpdGVtc1xyXG5cdCAqIEByZXR1cm4gdm9pZFxyXG5cdCAqL1xyXG5cdGFkZFRvUHJldmlldyhpdGVtcylcclxuXHR7XHJcblx0XHRpdGVtc0Rpdi5pbm5lckhUTUwgPSAnJztcclxuXHJcblx0XHRsZXQgdGFibGUgPSBET00uY3JlYXRlRWxlbWVudCgndGFibGUnKTtcclxuXHJcblx0XHRET00uYWRkQ2xhc3ModGFibGUsICdwcmV2aWV3LXRhYmxlJyk7XHJcblxyXG5cdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCBpdGVtcy5sZW5ndGg7IGkrKykge1xyXG5cclxuXHRcdFx0bGV0IGF0dHJpYnV0ZXMgPSBpdGVtc1tpXTtcclxuXHJcblx0XHRcdGxldCB0ciA9IERPTS5jcmVhdGVFbGVtZW50KCd0cicsIHtcclxuXHRcdFx0XHRjbGFzczogJ2l0ZW0nXHJcblx0XHRcdH0pO1xyXG5cclxuXHRcdFx0Ly8gUXVhbnRpdHkgYWx3YXlzIGF0IHRoZSBzdGFydCBvZiBhbiBpdGVtLlxyXG5cdFx0XHRsZXQgdGQgPSBET00uY3JlYXRlRWxlbWVudCgndGQnKTtcclxuXHRcdFx0dGQuaW5uZXJIVE1MID0gYXR0cmlidXRlcy5xdWFudGl0eSArJ3gnO1xyXG5cdFx0XHR0ci5hcHBlbmRDaGlsZCh0ZCk7XHJcblx0XHRcdFxyXG5cdFx0XHRmb3IobGV0IGF0dHJpYnV0ZSBpbiBhdHRyaWJ1dGVzKSB7XHJcblx0XHRcdFx0c3dpdGNoKGF0dHJpYnV0ZSlcclxuXHRcdFx0XHR7XHJcblx0XHRcdFx0XHRjYXNlICdpbWFnZSc6XHJcblx0XHRcdFx0XHRcdHRkID0gRE9NLmNyZWF0ZUVsZW1lbnQoJ3RkJyk7XHJcblx0XHRcdFx0XHRcdGxldCBpbWFnZSA9IERPTS5jcmVhdGVFbGVtZW50KCdpbWcnLCB7XHJcblx0XHRcdFx0XHRcdFx0c3JjOiBhdHRyaWJ1dGVzW2F0dHJpYnV0ZV0sXHJcblx0XHRcdFx0XHRcdFx0d2lkdGg6ICc1MHB4JyxcclxuXHRcdFx0XHRcdFx0XHRoZWlnaHQ6ICc1MHB4J1xyXG5cdFx0XHRcdFx0XHR9KTtcclxuXHJcblx0XHRcdFx0XHRcdHRkLmFwcGVuZENoaWxkKGltYWdlKTtcclxuXHRcdFx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdFx0XHRjYXNlICduYW1lJzpcclxuXHRcdFx0XHRcdGNhc2UgJ3ByaWNlJzpcclxuXHRcdFx0XHRcdFx0dGQgPSBET00uY3JlYXRlRWxlbWVudCgndGQnKTtcclxuXHRcdFx0XHRcdFx0dGQuaW5uZXJIVE1MID0gYXR0cmlidXRlc1thdHRyaWJ1dGVdO1xyXG5cdFx0XHRcdFx0XHRicmVhaztcclxuXHRcdFx0XHR9XHJcblx0XHRcdFxyXG5cdFx0XHRcdHRyLmFwcGVuZENoaWxkKHRkKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0dGFibGUuYXBwZW5kQ2hpbGQodHIpO1xyXG5cdFx0fVxyXG5cclxuXHRcdGl0ZW1zRGl2LmFwcGVuZENoaWxkKHRhYmxlKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEJpbmRzIGV2ZXJ0aGluZyB0byB0aGUgZWxlbWVudC5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSBzdHJpbmcgfCBzZWxlY3RvclxyXG5cdCAqIEByZXR1cm4gdm9pZFxyXG5cdCAqL1xyXG5cdHNldEVsZW1lbnQoc2VsZWN0b3IpXHJcblx0e1xyXG5cdFx0dGhpcy5pY29uID0gRE9NLmZpbmQoc2VsZWN0b3IpO1xyXG5cclxuXHRcdGlmICh0aGlzLmljb24pIHtcclxuXHRcdFx0RE9NLmFkZENsYXNzKHRoaXMuaWNvbiwgdGhpcy5zZXR0aW5ncy5jbGFzcyk7XHJcblx0XHRcdERPTS5hZGRDbGFzcyh0aGlzLmljb24sIHRoaXMuc2V0dGluZ3MucGxhY2VtZW50KTtcclxuXHRcdFx0dGhpcy5pY29uLmFwcGVuZENoaWxkKHRoaXMuc3ZnSWNvbik7XHJcblx0XHRcdHRoaXMuaWNvbi5hcHBlbmRDaGlsZCh0aGlzLnByZXZpZXdFbGVtZW50KTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIENyZWF0ZXMgdGhlIGNhcnQgZGV0YWlscyBwcmV2aWV3IGVsZW1lbnQuXHJcblx0ICpcclxuXHQgKiBAcmV0dXJuIEhUTUxEaXZFbGVtZW50XHJcblx0ICovXHJcblx0Y3JlYXRlUHJldmlld0VsZW1lbnQoKVxyXG5cdHtcclxuXHRcdGxldCBwcmV2aWV3RWxlbWVudCA9IERPTS5jcmVhdGVFbGVtZW50KCdkaXYnLCB7XHJcblx0XHRcdGlkOiAncHJldmlldydcclxuXHRcdH0pO1xyXG5cclxuXHRcdGl0ZW1zRGl2ID0gRE9NLmNyZWF0ZUVsZW1lbnQoJ3VsJywge1xyXG5cdFx0XHRcdGNsYXNzOiAnaXRlbXMnXHJcblx0XHRcdH0pO1xyXG5cclxuXHRcdHByZXZpZXdFbGVtZW50LmFwcGVuZENoaWxkKGl0ZW1zRGl2KTtcclxuXHJcblx0XHRyZXR1cm4gcHJldmlld0VsZW1lbnQ7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBBZGQgdGhlIGVDb21tZXJjZSBzdHlsZSB0YWdzIHRvIHRoZSBET00uXHJcblx0ICpcclxuXHQgKiBAcmV0dXJuIHZvaWRcclxuXHQgKi9cclxuXHRhZGRTdHlsZVRhZygpIFxyXG5cdHtcclxuXHRcdGlmIChET00uZmluZCgnI2VDb21tZXJjZS1DYXJ0JykpIHtcclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0fVxyXG5cclxuXHRcdGlmICh0aGlzLnNldHRpbmdzLm5vX2Nzcykge1xyXG5cdFx0XHRyZXR1cm47XHJcblx0XHR9XHJcblxyXG5cdFx0bGV0IHBvc2l0aW9uID0gKHRoaXMuc2V0dGluZ3MuZml4ZWQpID8gJ2ZpeGVkJyA6ICdhYnNvbHV0ZSc7XHJcblxyXG5cdFx0bGV0IGNzcyA9IGBcclxuXHRcdFx0JHt0aGlzLnNldHRpbmdzLmVsZW1lbnR9IHtcclxuXHRcdFx0XHRwb3NpdGlvbjogJHtwb3NpdGlvbn07XHJcblx0XHRcdFx0Y3Vyc29yOiBwb2ludGVyO1xyXG5cdFx0XHRcdGNvbG9yOiAjZmZmZmZmO1xyXG5cdFx0XHRcdHotaW5kZXg6IDk5ODtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0JHt0aGlzLnNldHRpbmdzLmVsZW1lbnR9ID4gc3ZnIHtcclxuXHRcdFx0XHR3aWR0aDogJHt0aGlzLnNldHRpbmdzLndpZHRofTtcclxuXHRcdFx0XHRoZWlnaHQ6ICR7dGhpcy5zZXR0aW5ncy5oZWlnaHR9O1xyXG5cdFx0XHRcdHRyYW5zaXRpb246IGZpbGwgMC4zcztcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0JHt0aGlzLnNldHRpbmdzLmVsZW1lbnR9ID4gc3ZnOmhvdmVyIHtcclxuXHRcdFx0XHRmaWxsOiAke3RoaXMuc2V0dGluZ3MuaG92ZXJfY29sb3J9O1xyXG5cdFx0XHRcdHRyYW5zaXRpb246IGZpbGwgMC4zcztcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0JHt0aGlzLnNldHRpbmdzLmVsZW1lbnR9LnRvcC1yaWdodCxcclxuXHRcdFx0JHt0aGlzLnNldHRpbmdzLmVsZW1lbnR9LnJpZ2h0LXRvcCB7XHJcblx0XHRcdFx0cmlnaHQ6IDEwcHg7XHJcblx0XHRcdFx0dG9wOiAxMHB4O1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHQke3RoaXMuc2V0dGluZ3MuZWxlbWVudH0ubGVmdC10b3AsXHJcblx0XHRcdCR7dGhpcy5zZXR0aW5ncy5lbGVtZW50fS50b3AtbGVmdCB7XHJcblx0XHRcdFx0bGVmdDogMTBweDtcclxuXHRcdFx0XHR0b3A6IDEwcHg7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdCR7dGhpcy5zZXR0aW5ncy5lbGVtZW50fSA+ICNwcmV2aWV3IHtcclxuXHRcdFx0XHRwb3NpdGlvbjogJHtwb3NpdGlvbn07XHJcblx0XHRcdFx0ei1pbmRleDogOTk5OTtcclxuXHRcdFx0XHR0b3A6IGNhbGMoMTBweCArICR7dGhpcy5zZXR0aW5ncy5oZWlnaHR9KTtcclxuXHRcdFx0XHR0cmFuc2Zvcm06IHRyYW5zbGF0ZVgoNjBweCk7XHJcblx0XHRcdFx0aGVpZ2h0OiA0MDBweDtcclxuXHRcdFx0XHR3aWR0aDogMzAwcHg7XHJcblx0XHRcdFx0Ym9yZGVyOiAxcHggc29saWQgI2U0ZTRlNDtcclxuXHRcdFx0XHRiYWNrZ3JvdW5kOiAjZmZmZmZmO1xyXG5cdFx0XHRcdHRyYW5zaXRpb246IHRyYW5zZm9ybSAxcywgdmlzaWJpbGl0eSAxcztcclxuXHRcdFx0XHRjdXJzb3I6IGRlZmF1bHQ7XHJcblx0XHRcdFx0b3ZlcmZsb3ctWTogc2Nyb2xsO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHQke3RoaXMuc2V0dGluZ3MuZWxlbWVudH0gPiAjcHJldmlldy5vcGVuZWQge1xyXG5cdFx0XHRcdHZpc2liaWxpdHk6IHZpc2libGU7XHJcblx0XHRcdFx0dHJhbnNmb3JtOiB0cmFuc2xhdGVYKC0yNDBweCk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdCR7dGhpcy5zZXR0aW5ncy5lbGVtZW50fSA+ICNwcmV2aWV3LmNsb3NlZCB7XHJcblx0XHRcdFx0dmlzaWJpbGl0eTogaGlkZGVuO1xyXG5cdFx0XHRcdHRyYW5zZm9ybTogdHJhbnNsYXRlWCg2MHB4KTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0JHt0aGlzLnNldHRpbmdzLmVsZW1lbnR9ICNwcmV2aWV3ID4gdWwuaXRlbXMge1xyXG5cdFx0XHRcdHBhZGRpbmc6IDA7XHJcblx0XHRcdFx0Y29sb3I6ICMwMDAwMDA7XHJcblx0XHRcdFx0bGlzdC1zdHlsZS10eXBlOiBub25lO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHQke3RoaXMuc2V0dGluZ3MuZWxlbWVudH0gI3ByZXZpZXcgPiB1bC5pdGVtcyA+IC5wcmV2aWV3LXRhYmxlIHtcclxuXHRcdFx0XHR3aWR0aDogMTAwJTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0JHt0aGlzLnNldHRpbmdzLmVsZW1lbnR9ICNwcmV2aWV3ID4gdWwuaXRlbXMgPiAucHJldmlldy10YWJsZSB0ZCB7XHJcblx0XHRcdFx0cGFkZGluZzogNHB4O1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHQke3RoaXMuc2V0dGluZ3MuZWxlbWVudH0gLml0ZW1zLmxvYWRpbmcge1xyXG5cdFx0XHRcdGRpc3BsYXk6IG5vbmU7XHJcblx0XHRcdFx0b3ZlcmZsb3ctWTogbm9uZTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0JHt0aGlzLnNldHRpbmdzLmVsZW1lbnR9IC5jYXJ0LWxvYWRlci1vdmVybGF5IHtcclxuXHRcdFx0XHRwb3NpdGlvbjogZml4ZWQ7XHJcblx0XHRcdFx0dG9wOiAwOyBcclxuXHRcdFx0ICAgIGxlZnQ6IDA7XHJcblx0XHRcdCAgICByaWdodDogMDtcclxuXHRcdFx0ICAgIGJvdHRvbTogMDtcclxuXHRcdFx0XHRiYWNrZ3JvdW5kOiAjZmZmZmZmO1xyXG5cdFx0XHRcdHdpZHRoOiAxMDAlO1xyXG5cdFx0XHRcdGhlaWdodDogMTAwJTtcclxuXHRcdFx0XHRtaW4taGVpZ2h0OiAxMDAlO1xyXG5cdFx0XHRcdG92ZXJmbG93OiBhdXRvO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHQke3RoaXMuc2V0dGluZ3MuZWxlbWVudH0gLmNhcnQtbG9hZGVyLW92ZXJsYXkgLmNhcnQtbG9hZGVyIHtcclxuXHRcdFx0XHRwb3NpdGlvbjogYWJzb2x1dGU7XHJcblx0XHRcdFx0d2lkdGg6IDUwcHg7XHJcblx0XHRcdFx0aGVpZ2h0OiA1MHB4O1xyXG5cdFx0XHRcdG1hcmdpbi1sZWZ0OiAtMjVweDtcclxuXHRcdFx0XHRtYXJnaW4tdG9wOiAtMjVweDtcclxuXHRcdFx0XHRsZWZ0OiA1MCU7XHJcblx0XHRcdFx0cmlnaHQ6IDUwJTtcclxuXHRcdFx0XHR0b3A6IDUwJTtcclxuXHRcdFx0XHRib3R0b206IDUwJTtcclxuXHRcdFx0fVxyXG5cdFx0YDtcclxuXHQgICAgXHJcblx0ICAgIERPTS5hZGRTdHlsZSgnVHVyYm8tZUNvbW1lcmNlLUNhcnQnLCBjc3MpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQ3JlYXRlcyBhbiBsb2FkaW5nIG92ZXJsYXkuXHJcblx0ICpcclxuXHQgKiBAcmV0dXJuIEhUTUxEaXZFbGVtZW50XHJcblx0ICovXHJcblx0bG9hZGluZ092ZXJsYXkoKVxyXG5cdHtcclxuXHRcdGlmIChsb2FkaW5nT3ZlcmxheSkge1xyXG5cdFx0XHRyZXR1cm4gbG9hZGluZ092ZXJsYXk7XHJcblx0XHR9XHJcblxyXG5cdFx0bGV0IGxvYWRlcjtcclxuXHJcblx0XHRpZiAodGhpcy5zZXR0aW5ncy5sb2FkZXIpIHtcclxuXHRcdFx0bG9hZGVyID0gRE9NLmNyZWF0ZUVsZW1lbnQoJ2ltZycsIHtcclxuXHRcdFx0XHRzcmM6IHRoaXMuc2V0dGluZ3MubG9hZGVyLFxyXG5cdFx0XHRcdGNsYXNzOiAnY2FydC1sb2FkZXInXHJcblx0XHRcdH0pO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0bG9hZGVyID0gY3JlYXRlTG9hZGVyKCk7XHJcblx0XHR9XHJcblxyXG5cdFx0bG9hZGluZ092ZXJsYXkgPSBET00uY3JlYXRlRWxlbWVudCgnZGl2Jywge1xyXG5cdFx0XHRjbGFzczogJ2NhcnQtbG9hZGVyLW92ZXJsYXknXHJcblx0XHR9KTtcclxuXHJcblx0XHRsb2FkaW5nT3ZlcmxheS5hcHBlbmRDaGlsZChsb2FkZXIpO1xyXG5cclxuXHRcdHJldHVybiBsb2FkaW5nT3ZlcmxheTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIExvYWRpbmcgdGhlIGNhcnQgcHJldmlldy5cclxuXHQgKlxyXG5cdCAqIEByZXR1cm4gdm9pZFxyXG5cdCAqL1xyXG5cdHByZXZpZXdTdGFydExvYWRpbmcoKVxyXG5cdHtcclxuXHRcdERPTS5hZGRDbGFzcyhpdGVtc0RpdiwgJ2xvYWRpbmcnKTtcclxuXHRcdHRoaXMucHJldmlld0VsZW1lbnQuYXBwZW5kQ2hpbGQodGhpcy5sb2FkaW5nT3ZlcmxheSgpKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIExvYWRpbmcgdGhlIGNhcnQgcHJldmlldy5cclxuXHQgKlxyXG5cdCAqIEByZXR1cm4gdm9pZFxyXG5cdCAqL1xyXG5cdHByZXZpZXdTdG9wTG9hZGluZygpXHJcblx0e1xyXG5cdFx0aWYgKERPTS5maW5kKCcuY2FydC1sb2FkZXItb3ZlcmxheScsIHRoaXMucHJldmlld0VsZW1lbnQpKSB7XHJcblx0XHRcdHRoaXMucHJldmlld0VsZW1lbnQucmVtb3ZlQ2hpbGQodGhpcy5sb2FkaW5nT3ZlcmxheSgpKTtcclxuXHRcdFx0RE9NLnJlbW92ZUNsYXNzKGl0ZW1zRGl2LCAnbG9hZGluZycpO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogUmVsb2FkcyB0aGUgaXRlbXMgaW4gdGhlIGNhcnQgcHJldmlldy5cclxuXHQgKlxyXG5cdCAqIEByZXR1cm4gdm9pZFxyXG5cdCAqL1xyXG5cdHJlbG9hZENhcnRQcmV2aWV3KClcclxuXHR7XHJcblx0XHR0aGlzLnByZXZpZXdTdGFydExvYWRpbmcoKTtcclxuXHRcdGxldCBpdGVtcyA9IHRoaXMuZ2V0Q2FydEl0ZW1zKCk7XHJcblx0XHR0aGlzLmFkZFRvUHJldmlldyhpdGVtcyk7XHJcblx0XHRcclxuXHRcdGxldCBpbnN0YW5jZSA9IHRoaXM7XHJcblxyXG5cdFx0c2V0VGltZW91dChmdW5jdGlvbigpIHtcclxuXHRcdFx0aW5zdGFuY2UucHJldmlld1N0b3BMb2FkaW5nLmNhbGwoaW5zdGFuY2UpO1xyXG5cdFx0fSwgMTAwMCk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBCaW5kcyBldmVudCBsaXN0ZW5lcnMgdG8gdGhlIGNhcnQgaWNvbi5cclxuXHQgKlxyXG5cdCAqIEByZXR1cm4gdm9pZFxyXG5cdCAqL1xyXG5cdGJpbmRFdmVudExpc3RlbmVycygpXHJcblx0e1xyXG5cdFx0aWYodGhpcy5zdmdJY29uID09IG51bGwpIHtcclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0fVxyXG5cclxuXHRcdHRoaXMuc3ZnSWNvbi5vbmNsaWNrID0gZnVuY3Rpb24oZSkge1xyXG5cdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XHJcblx0XHRcdHRoaXMudG9nZ2xlQ2FydFByZXZpZXcoKTtcclxuXHRcdH0uYmluZCh0aGlzKTtcclxuXHRcdFxyXG5cdFx0RXZlbnRNYW5hZ2VyJDIuc3Vic2NyaWJlKCdjYXJ0LnByb2R1Y3QuYWRkZWQnLCBmdW5jdGlvbihhdHRyaWJ1dGVzKSB7XHJcblx0XHRcdHRoaXMub3BlbkNhcnRQcmV2aWV3KCk7XHJcblx0XHRcdHRoaXMuYWRkSXRlbShhdHRyaWJ1dGVzKTtcclxuXHRcdFx0dGhpcy5yZWxvYWRDYXJ0UHJldmlldygpO1xyXG5cdFx0fS5iaW5kKHRoaXMpKTtcclxuXHJcblx0XHRFdmVudE1hbmFnZXIkMi5zdWJzY3JpYmUoJ2NhcnQucHJvZHVjdC5mYXZvcml0ZWQnLCBmdW5jdGlvbihhdHRyaWJ1dGVzKSB7XHJcblx0XHRcdHRoaXMuZmF2b3JpdGVJdGVtKGF0dHJpYnV0ZXMpO1xyXG5cdFx0fS5iaW5kKHRoaXMpKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIE9wZW5zIHRoZSBjYXJ0IHByZXZpZXcuXHJcblx0ICpcclxuXHQgKiBAcmV0dXJuIHZvaWQgXHJcblx0ICovXHJcblx0b3BlbkNhcnRQcmV2aWV3KClcclxuXHR7XHJcblx0XHRpZiAoRE9NLmhhc0NsYXNzKHRoaXMucHJldmlld0VsZW1lbnQsICdvcGVuZWQnKSkge1xyXG5cdFx0XHR0aGlzLnJlbG9hZENhcnRQcmV2aWV3KCk7XHJcblx0XHR9XHJcblxyXG5cdFx0RE9NLnN3aXRjaENsYXNzZXModGhpcy5wcmV2aWV3RWxlbWVudCwgJ2Nsb3NlZCcsICdvcGVuZWQnKTtcclxuXHRcdHRoaXMucmVsb2FkQ2FydFByZXZpZXcoKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFRvZ2dsZXMgdGhlIG9wZW5pbmcgY2xvc2luZyBvZiB0aGUgY2FydCBwcmV2aWV3LlxyXG5cdCAqXHJcblx0ICogQHJldHVybiB2b2lkIFxyXG5cdCAqL1xyXG5cdHRvZ2dsZUNhcnRQcmV2aWV3KClcclxuXHR7XHJcblx0XHRsZXQgb3BlbmluZyA9IERPTS50b2dnbGVDbGFzcyh0aGlzLnByZXZpZXdFbGVtZW50LCAnb3BlbmVkJywgJ2Nsb3NlZCcpO1xyXG5cdFx0XHRcclxuXHRcdGlmIChvcGVuaW5nKSB7XHJcblx0XHRcdHRoaXMucmVsb2FkQ2FydFByZXZpZXcoKTtcdFxyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogUmV0cmlldmUgdGhlIGNhcnRzIGl0ZW1zIGZyb20gdGhlIGNvb2tpZS5cclxuXHQgKlxyXG5cdCAqIEByZXR1cm4gb2JqZWN0XHJcblx0ICovXHJcblx0Z2V0Q2FydEl0ZW1zKClcclxuXHR7XHJcblx0XHRsZXQgY2FydCA9IENvb2tpZS5nZXQodGhpcy5zZXR0aW5ncy5jb29raWVfbmFtZSk7XHJcblxyXG5cdFx0cmV0dXJuIChjYXJ0KSA/IGNhcnQuaXRlbXMgOiBbXTtcclxuXHR9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBDbG9zZXMgdGhlIGNhcnQgcHJldmlldyBlbGVtZW50LlxyXG4gKlxyXG4gKiBAcGFyYW0gZXZlbnQuY2xpY2tcclxuICovXHJcbmZ1bmN0aW9uIGNsb3NlKGV2ZW50KSB7XHJcblx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuXHRET00uc3dpdGNoQ2xhc3Nlcyh0aGlzLnByZXZpZXdFbGVtZW50LCAnb3BlbmVkJywgJ2Nsb3NlZCcpO1xyXG59XHJcblxyXG4vKipcclxuICogQ3JlYXRlcyB0aGUgY2FydCBzdmcgaWNvbi5cclxuICpcclxuICogQHJldHVybiBTVkdTVkdFbGVtZW50XHJcbiAqL1xyXG5mdW5jdGlvbiBjcmVhdGVJY29uKCkge1xyXG5cdGxldCBzdmcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50TlMoXCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiLCBcInN2Z1wiKTtcclxuXHRsZXQgZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnROUyhcImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIsIFwiZ1wiKTtcclxuXHRsZXQgcGF0aCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnROUyhcImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIsIFwicGF0aFwiKTtcclxuXHJcblx0c3ZnLnNldEF0dHJpYnV0ZSgndmVyc2lvbicsICcxLjEnKTtcclxuXHRzdmcuc2V0QXR0cmlidXRlKCd4bWxucycsICdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZycpO1xyXG5cdHN2Zy5zZXRBdHRyaWJ1dGUoJ3htbG5zOnhsaW5rJywgJ2h0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsnKTtcclxuXHRzdmcuc2V0QXR0cmlidXRlKCd4JywgJzBweCcpO1xyXG5cdHN2Zy5zZXRBdHRyaWJ1dGUoJ3knLCAnMHB4Jyk7XHJcblx0c3ZnLnNldEF0dHJpYnV0ZSgnd2lkdGgnLCAnNDQ2Ljg0M3B4Jyk7XHJcblx0c3ZnLnNldEF0dHJpYnV0ZSgnaGVpZ2h0JywgJzQ0Ni44NDNweCcpO1xyXG5cdHN2Zy5zZXRBdHRyaWJ1dGUoJ3ZpZXdCb3gnLCAnMCAwIDQ0Ni44NDMgNDQ2Ljg0MycpO1xyXG5cdHN2Zy5zZXRBdHRyaWJ1dGUoJ3N0eWxlJywgJ2VuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgNDQ2Ljg0MyA0NDYuODQzOycpO1xyXG5cdHN2Zy5zZXRBdHRyaWJ1dGUoJ3htbDpzcGFjZScsICdwcmVzZXJ2ZScpO1xyXG5cclxuXHRwYXRoLnNldEF0dHJpYnV0ZSgnZCcsICdNNDQ0LjA5LDkzLjEwM2MtMi42OTgtMy42OTktNy4wMDYtNS44ODgtMTEuNTg0LTUuODg4SDEwOS45MmMtMC42MjUsMC0xLjI0OSwwLjAzOC0xLjg1LDAuMTE5bC0xMy4yNzYtMzguMjdjLTEuMzc2LTMuOTU4LTQuNDA2LTcuMTEzLTguMy04LjY0NkwxOS41ODYsMTQuMTM0Yy03LjM3NC0yLjg4Ny0xNS42OTUsMC43MzUtMTguNTkxLDguMWMtMi44OTEsNy4zNjksMC43MywxNS42OTUsOC4xLDE4LjU5MWw2MC43NjgsMjMuODcybDc0LjM4MSwyMTQuMzk5Yy0zLjI4MywxLjE0NC02LjA2NSwzLjY2My03LjMzMiw3LjE4N2wtMjEuNTA2LDU5LjczOWMtMS4zMTgsMy42NjMtMC43NzUsNy43MzMsMS40NjgsMTAuOTE2YzIuMjQsMy4xODMsNS44ODMsNS4wNzgsOS43NzMsNS4wNzhoMTEuMDQ0Yy02Ljg0NCw3LjYxNi0xMS4wNDQsMTcuNjQ2LTExLjA0NCwyOC42NzVjMCwyMy43MTgsMTkuMjk4LDQzLjAxMiw0My4wMTIsNDMuMDEyczQzLjAxMi0xOS4yOTQsNDMuMDEyLTQzLjAxMmMwLTExLjAyOS00LjItMjEuMDU5LTExLjA0NC0yOC42NzVoOTMuNzc2Yy02Ljg0Nyw3LjYxNi0xMS4wNDgsMTcuNjQ2LTExLjA0OCwyOC42NzVjMCwyMy43MTgsMTkuMjk0LDQzLjAxMiw0My4wMTMsNDMuMDEyYzIzLjcxOCwwLDQzLjAxMi0xOS4yOTQsNDMuMDEyLTQzLjAxMmMwLTExLjAyOS00LjItMjEuMDU5LTExLjA0My0yOC42NzVoMTMuNDMzYzYuNTk5LDAsMTEuOTQ3LTUuMzQ5LDExLjk0Ny0xMS45NDhjMC02LjU5OS01LjM0OS0xMS45NDctMTEuOTQ3LTExLjk0N0gxNDMuNjQ3bDEzLjMxOS0zNi45OTZjMS43MiwwLjcyNCwzLjU3OCwxLjE1Miw1LjUyMywxLjE1MmgyMTAuMjc4YzYuMjM0LDAsMTEuNzUxLTQuMDI3LDEzLjY1LTkuOTU5bDU5LjczOS0xODYuMzg3QzQ0Ny41NTcsMTAxLjU2Nyw0NDYuNzg4LDk2LjgwMiw0NDQuMDksOTMuMTAzeiBNMTY5LjY1OSw0MDkuODA3Yy0xMC41NDMsMC0xOS4xMTYtOC41NzMtMTkuMTE2LTE5LjExNnM4LjU3My0xOS4xMTcsMTkuMTE2LTE5LjExN3MxOS4xMTYsOC41NzQsMTkuMTE2LDE5LjExN1MxODAuMjAyLDQwOS44MDcsMTY5LjY1OSw0MDkuODA3eiBNMzI3LjM2Nyw0MDkuODA3Yy0xMC41NDMsMC0xOS4xMTctOC41NzMtMTkuMTE3LTE5LjExNnM4LjU3NC0xOS4xMTcsMTkuMTE3LTE5LjExN2MxMC41NDIsMCwxOS4xMTYsOC41NzQsMTkuMTE2LDE5LjExN1MzMzcuOTA5LDQwOS44MDcsMzI3LjM2Nyw0MDkuODA3eiBNNDAyLjUyLDE0OC4xNDloLTczLjE2MVYxMTUuODloODMuNDk5TDQwMi41MiwxNDguMTQ5eiBNMzgxLjQ1MywyMTMuODYxaC01Mi4wOTR2LTM3LjAzOGg2My45NjdMMzgxLjQ1MywyMTMuODYxeiBNMjM0LjU3MSwyMTMuODYxdi0zNy4wMzhoNjYuMTEzdjM3LjAzOEgyMzQuNTcxeiBNMzAwLjY4NCwyNDIuNTM4djMxLjA2NGgtNjYuMTEzdi0zMS4wNjRIMzAwLjY4NHogTTEzOS4xMTUsMTc2LjgyM2g2Ni43ODR2MzcuMDM4aC01My45MzNMMTM5LjExNSwxNzYuODIzeiBNMjM0LjU3MSwxNDguMTQ5VjExNS44OWg2Ni4xMTN2MzIuMjU5SDIzNC41NzF6IE0yMDUuODk4LDExNS44OXYzMi4yNTloLTc2LjczNGwtMTEuMTkxLTMyLjI1OUgyMDUuODk4eiBNMTYxLjkxNiwyNDIuNTM4aDQzLjk4MnYzMS4wNjRoLTMzLjIwNkwxNjEuOTE2LDI0Mi41Mzh6IE0zMjkuMzU5LDI3My42MDN2LTMxLjA2NGg0Mi45MDlsLTkuOTU1LDMxLjA2NEgzMjkuMzU5eicpO1xyXG5cclxuXHRnLmFwcGVuZENoaWxkKHBhdGgpO1xyXG5cdHN2Zy5hcHBlbmRDaGlsZChnKTtcclxuXHJcblx0cmV0dXJuIHN2ZztcclxufVxyXG5cclxuLyoqXHJcbiAqIENyZWF0ZXMgdGhlIGNhcnQgbG9hZGVyIGljb24uXHJcbiAqXHJcbiAqIEByZXR1cm4gU1ZHU1ZHRWxlbWVudFxyXG4gKi9cclxuZnVuY3Rpb24gY3JlYXRlTG9hZGVyKCkge1xyXG5cdGxldCBzdmcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50TlMoXCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiLCBcInN2Z1wiKTtcclxuXHRsZXQgY291bnQgPSAxMjtcclxuXHRsZXQgZ3JvdXBzID0gW107XHJcblx0bGV0IHJlY3RhbmdlbHMgPSBbXTtcclxuXHRsZXQgYW5pbWF0aW9ucyA9IFtdO1xyXG5cclxuXHRzdmcuc2V0QXR0cmlidXRlKCdjbGFzcycsICdsZHMtc3Bpbm5lcicpO1xyXG5cdHN2Zy5zZXRBdHRyaWJ1dGUoJ3dpZHRoJywgJzIwMHB4Jyk7XHJcblx0c3ZnLnNldEF0dHJpYnV0ZSgnaGVpZ2h0JywgJzIwMHB4Jyk7XHJcblx0c3ZnLnNldEF0dHJpYnV0ZSgneG1sbnMnLCAnaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnKTtcclxuXHRzdmcuc2V0QXR0cmlidXRlKCd4bWxuczp4bGluaycsICdodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rJyk7XHJcblx0c3ZnLnNldEF0dHJpYnV0ZSgndmlld0JveCcsICcwIDAgMTAwIDEwMCcpO1xyXG5cdHN2Zy5zZXRBdHRyaWJ1dGUoJ3ByZXNlcnZlQXNwZWN0UmF0aW8nLCAneE1pZFlNaWQnKTtcclxuXHRzdmcuc2V0QXR0cmlidXRlKCdzdHlsZScsICdiYWNrZ3JvdW5kOiBub25lOycpO1xyXG5cdFxyXG5cdHZhciByb3RhdGlvbiA9IDA7XHJcblxyXG5cdGZvciAodmFyIGkgPSAwOyBpIDwgY291bnQ7IGkrKykge1xyXG5cdFx0bGV0IGdyb3VwID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKFwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiwgXCJnXCIpO1xyXG5cdFx0Z3JvdXAuc2V0QXR0cmlidXRlKCd0cmFuc2Zvcm0nLCAncm90YXRlKCcgKyByb3RhdGlvbiArICcgNTAgNTApJyk7XHJcblx0XHRyb3RhdGlvbiArPSAzMDtcclxuXHRcdGdyb3Vwcy5wdXNoKGdyb3VwKTtcclxuXHR9XHJcblxyXG5cdGZvciAodmFyIGkgPSAwOyBpIDwgY291bnQ7IGkrKykge1xyXG5cdFx0bGV0IHJlY3RhbmdlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnROUyhcImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIsIFwicmVjdFwiKTtcclxuXHRcdHJlY3RhbmdlbC5zZXRBdHRyaWJ1dGUoJ3gnLCAnNDcnKTtcclxuXHRcdHJlY3RhbmdlbC5zZXRBdHRyaWJ1dGUoJ3knLCAnMjQnKTtcclxuXHRcdHJlY3RhbmdlbC5zZXRBdHRyaWJ1dGUoJ3J4JywgJzkuNCcpO1xyXG5cdFx0cmVjdGFuZ2VsLnNldEF0dHJpYnV0ZSgncnknLCAnNC44Jyk7XHJcblx0XHRyZWN0YW5nZWwuc2V0QXR0cmlidXRlKCd3aWR0aCcsICc2Jyk7XHJcblx0XHRyZWN0YW5nZWwuc2V0QXR0cmlidXRlKCdoZWlnaHQnLCAnMTInKTtcclxuXHRcdHJlY3RhbmdlbC5zZXRBdHRyaWJ1dGUoJ2ZpbGwnLCAnIzQ2NThhYycpO1xyXG5cdFx0cmVjdGFuZ2Vscy5wdXNoKHJlY3RhbmdlbCk7XHJcblx0fVxyXG5cclxuXHR2YXIgYmVnaW4gPSAwLjA5ICogMTE7XHJcblxyXG5cdGZvciAodmFyIGkgPSAwOyBpIDwgY291bnQ7IGkrKykge1xyXG5cdFx0bGV0IGFuaW1hdGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50TlMoXCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiLCBcImFuaW1hdGVcIik7XHJcblx0XHRhbmltYXRlLnNldEF0dHJpYnV0ZSgnYXR0cmlidXRlTmFtZScsICdvcGFjaXR5Jyk7XHJcblx0XHRhbmltYXRlLnNldEF0dHJpYnV0ZSgndmFsdWVzJywgJzE7MCcpO1xyXG5cdFx0YW5pbWF0ZS5zZXRBdHRyaWJ1dGUoJ3RpbWVzJywgJzA7MScpO1xyXG5cdFx0YW5pbWF0ZS5zZXRBdHRyaWJ1dGUoJ2R1cicsICcxcycpO1xyXG5cdFx0YW5pbWF0ZS5zZXRBdHRyaWJ1dGUoJ2JlZ2luJywgYmVnaW4udG9GaXhlZCg4KSArICdzJyk7XHJcblx0XHRhbmltYXRlLnNldEF0dHJpYnV0ZSgncmVwZWF0Q291bnQnLCAnaW5kZWZpbml0ZScpO1xyXG5cdFx0YW5pbWF0aW9ucy5wdXNoKGFuaW1hdGUpO1xyXG5cdFx0YmVnaW4gLT0gMC4wOTtcclxuXHR9XHJcblxyXG5cdGZvciAodmFyIGkgPSAwOyBpIDwgZ3JvdXBzLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRsZXQgZ3JvdXAgPSBncm91cHNbaV07XHRcdFxyXG5cdFx0bGV0IHJlY3RhbmdlbCA9IHJlY3RhbmdlbHNbaV07XHJcblx0XHRsZXQgYW5pbWF0ZSA9IGFuaW1hdGlvbnNbaV07XHJcblx0XHRyZWN0YW5nZWwuYXBwZW5kQ2hpbGQoYW5pbWF0ZSk7XHJcblx0XHRncm91cC5hcHBlbmRDaGlsZChyZWN0YW5nZWwpO1xyXG5cdFx0c3ZnLmFwcGVuZENoaWxkKGdyb3VwKTtcclxuXHR9XHJcblxyXG5cdERPTS5hZGRDbGFzcyhzdmcsICdjYXJ0LWxvYWRlcicpO1xyXG5cclxuXHRyZXR1cm4gc3ZnO1x0XHJcbn1cblxuLyoqXHJcbiAqIEBmaWxlIFxyXG4gKiBGaWx0ZXIgY2xhc3MuXHJcbiAqXHJcbiAqIFRoZSBGaWx0ZXIgT2JqZWN0LCBoYW5kbGVzIHRoZSBmaWx0ZXIgb2YgdGhlIHByb2R1Y3RzL3NlcnZpY2VzLlxyXG4gKi9cclxuXHJcbi8qKlxyXG4gKiBUaGUgZGVmYXVsdCBzZXR0aW5ncyBvZiB0aGUgZmlsdGVyLlxyXG4gKi9cclxubGV0IGRlZmF1bHRTZXR0aW5ncyQyID0ge1xyXG5cdGVsZW1lbnQ6ICcuZmlsdGVyJyxcclxuXHRjbGFzczogJycsXHJcblx0d2lkdGg6ICcnLFxyXG5cdGhlaWdodDogJycsXHJcblx0bm9fY3NzOiBmYWxzZSxcclxufTtcclxuXHJcbi8qKlxyXG4gKiBTdG9yZXMgdGhlIGNvbnRhaW5lciBvYmplY3QuXHJcbiAqXHJcbiAqIEB2YXIgXFxDb3JlXFxDb250YWluZXJcclxuICovXHJcbmxldCBDb250YWluZXIkMztcclxuXHJcbmNsYXNzIEZpbHRlciBcclxue1xyXG5cdC8qKlxyXG5cdCAqIC0gSW5pdGlhbGl6ZSB0aGUgSW9DIGNvbnRhaW5lci5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSBcXENvcmVcXENvbnRhaW5lciB8IGNvbnRhaW5lclxyXG5cdCAqIEByZXR1cm4gdm9pZFxyXG5cdCAqL1xyXG5cdGNvbnN0cnVjdG9yKGNvbnRhaW5lcikgXHJcblx0e1xyXG5cdFx0Q29udGFpbmVyJDMgPSBjb250YWluZXI7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBTZXR1cCB0aGUgZmlsdGVyIGNsYXNzLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIG9iamVjdCB8IHNldHRpbmdzXHJcblx0ICogQHJldHVybiB2b2lkXHJcblx0ICovXHJcblx0c2V0dXAoc2V0dGluZ3MpXHJcblx0e1xyXG5cdFx0aWYodHlwZW9mIHNldHRpbmdzICE9ICdvYmplY3QnKSB7XHJcblx0XHRcdHRocm93IG5ldyBJbnZhbGlkQXJndW1lbnRFeGNlcHRpb24kMTtcclxuXHRcdH1cclxuXHJcblx0XHR0aGlzLnNldHRpbmdzID0gQ29tbW9uLmV4dGVuZChkZWZhdWx0U2V0dGluZ3MkMiwgc2V0dGluZ3MpO1xyXG5cclxuXHRcdGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCBmdW5jdGlvbigpIHtcclxuXHJcblx0XHRcdHRoaXMuc2V0RWxlbWVudCh0aGlzLnNldHRpbmdzLmVsZW1lbnQpO1xyXG5cclxuXHRcdFx0dGhpcy5hZGRTdHlsZVRhZygpO1x0XHJcblx0XHR9LmJpbmQodGhpcykpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogU2V0cyB0aGUgZWxlbWVudCB0byBiZSBib3VuZCB0by5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSBzdHJpbmcgfCBzZWxlY3RvclxyXG5cdCAqIEByZXR1cm4gdm9pZFxyXG5cdCAqL1xyXG5cdHNldEVsZW1lbnQoc2VsZWN0b3IpXHJcblx0e1xyXG5cdFx0dGhpcy53cmFwcGVyID0gRE9NLmZpbmQoc2VsZWN0b3IpO1xyXG5cdFx0XHJcblx0XHRET00uYWRkQ2xhc3ModGhpcy53cmFwcGVyLCB0aGlzLnNldHRpbmdzLmNsYXNzKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEFkZCB0aGUgZUNvbW1lcmNlIHN0eWxlIHRhZ3MgdG8gdGhlIERPTS5cclxuXHQgKi9cclxuXHRhZGRTdHlsZVRhZygpIFxyXG5cdHtcclxuXHRcdGlmIChET00uZmluZCgnI1R1cmJvLWVDb21tZXJjZS1GaWx0ZXInKSkge1xyXG5cdFx0XHRyZXR1cm47XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKHRoaXMuc2V0dGluZ3Mubm9fY3NzKSB7XHJcblx0XHRcdHJldHVybjtcclxuXHRcdH1cclxuXHJcblx0XHRsZXQgd2lkdGggPSAodGhpcy5zZXR0aW5ncy53aWR0aCkgPyAnd2lkdGg6JyArIHRoaXMuc2V0dGluZ3Mud2lkdGggKyAnOycgOiAnJztcclxuXHRcdGxldCBtaW5XaWR0aCA9IHRoaXMuc2V0dGluZ3MubWluX3dpZHRoIHx8ICcyMDBweCc7XHJcblx0XHRsZXQgaGVpZ2h0ID0gdGhpcy5zZXR0aW5ncy5oZWlnaHQgfHwgJ2F1dG8nO1xyXG5cclxuXHRcdGxldCBjc3MgPSBgXHJcblx0XHRcdCR7dGhpcy5zZXR0aW5ncy5lbGVtZW50fSB7XHJcblx0XHRcdFx0cG9zaXRpb246IHJlbGF0aXZlO1xyXG5cdFx0XHRcdG1hcmdpbjogNXB4IDVweDtcclxuXHRcdFx0XHRib3JkZXI6IDFweCBzb2xpZCAjZTRlNGU0O1xyXG5cdFx0XHRcdCR7d2lkdGh9XHJcblx0XHRcdFx0bWluLXdpZHRoOiAke21pbldpZHRofTtcclxuXHRcdFx0XHRoZWlnaHQ6ICR7aGVpZ2h0fTtcclxuXHRcdFx0XHRtaW4taGVpZ2h0OiAyMDBweDtcclxuXHRcdFx0XHRjb2xvcjogI2ZmZmZmZjtcclxuXHRcdFx0XHRvdmVyZmxvdzogaGlkZGVuO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0YDtcclxuXHQgICAgXHJcblx0ICAgIERPTS5hZGRTdHlsZSgnVHVyYm8tZUNvbW1lcmNlLUZpbHRlcicsIGNzcyk7XHJcblx0fVxyXG59XG5cbi8qKlxyXG4gKiBAZmlsZSBcclxuICogUHJvZHVjdHMgY2xhc3MuXHJcbiAqXHJcbiAqIFRoZSBQcm9kdWN0cyBjb21wb25lbnQsIGhhbmRsZXMgdGhlIHByb2R1Y3RzIHRhc2tzLlxyXG4gKi9cclxuXHJcblxyXG4vKipcclxuICogVGhlIGRlZmF1bHQgc2V0dGluZ3Mgb2YgZWFjaCBwcm9kdWN0LlxyXG4gKlxyXG4gKiBAdmFyIG9iamVjdFxyXG4gKi9cclxubGV0IGRlZmF1bHRTZXR0aW5ncyQzID0ge1xyXG5cdGVsZW1lbnQ6ICcucHJvZHVjdHMnLFxyXG5cdGNsYXNzOiAnJyxcclxuXHRpdGVtX2NsYXNzOiAnJyxcclxuXHRhZGRfYnV0dG9uX2NsYXNzOiAnYnRuIGJ0bi1wcmltYXJ5JyxcclxuXHRmYXZvcml0ZV9idXR0b25fY2xhc3M6ICdidG4gYnRuLWRhbmdlcicsXHJcblx0d2lkdGg6ICcyMDBweCcsXHJcblx0aGVpZ2h0OiAnMjUwcHgnLFxyXG5cdGF0dHJpYnV0ZXM6IFsnbmFtZScsICdwcmljZScsICdkZWxpdmVyeVRpbWUnLCAnaW1hZ2UnXSxcclxuXHR1cmw6ICdwcm9kdWN0cy5waHAnLFxyXG5cdG5vX2NzczogZmFsc2UsXHJcbn07XHJcblxyXG4vKipcclxuICogU3RvcmVzIHRoZSBjb250YWluZXIgb2JqZWN0LlxyXG4gKiBcclxuICogQHZhciBcXENvcmVcXENvbnRhaW5lclxyXG4gKi9cclxubGV0IENvbnRhaW5lciQ0O1xyXG5cclxuLyoqXHJcbiAqIFN0b3JlcyB0aGUgY29udGFpbmVyIG9iamVjdC5cclxuICogXHJcbiAqIEB2YXIgXFxDb3JlXFxFdmVudE1hbmFnZXJcclxuICovXHJcbmxldCBFdmVudE1hbmFnZXIkMztcclxuXHJcbi8qKlxyXG4gKiBTdG9yZXMgdGhlIHJlcXVlc3Qgb2JqZWN0LlxyXG4gKiBcclxuICogQHZhciBcXEhlbHBlclxcUmVxdWVzdCBcclxuICovXHJcbmxldCBIdHRwJDE7XHJcblxyXG4vKipcclxuICogU3RvcmVzIHRoZSBjaHVua2VkIHBlciBcclxuICogcGFnZSBwcm9kdWN0cy5cclxuICogXHJcbiAqIEB2YXIgYXJyYXlcclxuICovXHJcbmxldCBjaHVua2VkUHJvZHVjdHM7XHJcblxyXG5jbGFzcyBQcm9kdWN0cyBcclxue1xyXG5cdC8qKlxyXG5cdCAqIEluaXRhbGl6ZSB0aGUgQ29udGFpbmVyLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIFxcQ29yZVxcQ29udGFpbmVyIHwgY29udGFpbmVyXHJcblx0ICogQHBhcmFtIFxcSGVscGVyc1xcUmVxdWVzdCB8IGh0dHBcclxuXHQgKiBAcmV0dXJuIHZvaWRcclxuXHQgKi9cclxuXHRjb25zdHJ1Y3Rvcihjb250YWluZXIsIGh0dHAsIGV2ZW50TWFuYWdlcikgXHJcblx0e1xyXG5cdFx0Q29udGFpbmVyJDQgPSBjb250YWluZXI7XHJcblx0XHRIdHRwJDEgPSBodHRwO1xyXG5cdFx0RXZlbnRNYW5hZ2VyJDMgPSBldmVudE1hbmFnZXI7XHJcblx0XHRjaHVua2VkUHJvZHVjdHMgPSBbXTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFNldHMgdGhlIGdpdmVuIHNldHRpbmdzIGZyb20gdGhlIHVzZXIuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gb2JqZWN0IHwgc2V0dGluZ3NcclxuXHQgKiBAcmV0dXJuIHZvaWRcclxuXHQgKi9cclxuXHRzZXR1cChzZXR0aW5ncylcclxuXHR7XHJcblx0XHRpZiAodHlwZW9mIHNldHRpbmdzICE9ICdvYmplY3QnKSB7XHJcblx0XHRcdHRocm93IG5ldyBJbnZhbGlkQXJndW1lbnRFeGNlcHRpb24kMTtcclxuXHRcdH1cclxuXHJcblx0XHR0aGlzLnNldHRpbmdzID0gQ29tbW9uLmV4dGVuZChkZWZhdWx0U2V0dGluZ3MkMywgc2V0dGluZ3MpO1xyXG5cdFx0dGhpcy50b3RhbEl0ZW1zID0gbnVsbDtcclxuXHJcblx0XHRkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgZnVuY3Rpb24oKSB7XHJcblxyXG5cdFx0XHR0aGlzLnNldEVsZW1lbnQodGhpcy5zZXR0aW5ncy5lbGVtZW50KTtcclxuXHJcblx0XHRcdHRoaXMuYWRkU3R5bGVUYWcoKTtcdFxyXG5cclxuXHRcdFx0dGhpcy5sb2FkUHJvZHVjdHMoMSk7XHJcblx0XHR9LmJpbmQodGhpcykpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogTG9hZHMgdGhlIHByb2R1Y3RzIGZvciB0aGUgcGFnZS5cclxuXHQgKiBcclxuXHQgKiBAcGFyYW0gbnVtYmVyIHwgcGFnZU51bWJlclxyXG5cdCAqIEByZXR1cm4gdm9pZFxyXG5cdCAqL1xyXG5cdGxvYWRQcm9kdWN0cyhwYWdlTnVtYmVyID0gMSlcclxuXHR7XHJcblx0XHRpZiAoQ29udGFpbmVyJDQuUGFnaW5hdGlvbiAmJiBDb250YWluZXIkNC5QYWdpbmF0aW9uLmJvb3RlZCkge1xyXG5cdFx0XHRzd2l0Y2goQ29udGFpbmVyJDQuUGFnaW5hdGlvbi5zZXR0aW5ncy5wcm9jY2Vzc2luZykgXHJcblx0XHRcdHtcclxuXHRcdFx0XHRjYXNlICdjbGllbnQtc2lkZSc6XHJcblx0XHRcdFx0XHRyZXR1cm4gdGhpcy5sb2FkUGFnZVByb2R1Y3RzQnlDbGllbnQocGFnZU51bWJlcik7XHJcblx0XHRcdFx0XHRicmVhaztcclxuXHRcdFx0XHRjYXNlICdzZXJ2ZXItc2lkZSc6XHJcblx0XHRcdFx0XHRyZXR1cm4gdGhpcy5sb2FkUGFnZVByb2R1Y3RzQnlTZXJ2ZXIocGFnZU51bWJlcik7XHJcblx0XHRcdFx0XHRicmVhaztcclxuXHRcdFx0XHRkZWZhdWx0OlxyXG5cdFx0XHRcdFx0dGhyb3cgbmV3IEludmFsaWRBcmd1bWVudEV4Y2VwdGlvbiQxKCdmb3IgcHJvY2Nlc3NpbmcgeW91IGNhbiBjaG9vc2UgXFwnc2VydmVyLXNpZGVcXCcgb3IgXFwnY2xpZW50LXNpZGVcXCcgb3B0aW9ucy4nKTtcclxuXHRcdFx0fVxyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0dGhpcy5sb2FkUGFnZVByb2R1Y3RzQnlTZXJ2ZXIoKTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIExvYWRzIHRoZSBwcm9kdWN0cyBhbmQgXHJcblx0ICogcmVwbGFjZSB0aGVtIGluIHRoZSBkaXYgY29udGFpbmVyLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIG51bWJlciB8IHBhZ2VOdW1iZXJcclxuXHQgKiBAcmV0dXJuIHZvaWRcclxuXHQgKi9cclxuXHRsb2FkUGFnZVByb2R1Y3RzQnlTZXJ2ZXIocGFnZU51bWJlciA9IG51bGwpXHJcblx0e1xyXG5cdFx0bGV0IHJlcXVlc3QgPSB0aGlzLmdldFByb2R1Y3RzKHBhZ2VOdW1iZXIpO1xyXG5cclxuXHRcdHJlcXVlc3QudGhlbihmdW5jdGlvbihwcm9kdWN0cykge1xyXG5cclxuXHRcdFx0dGhpcy5jdXJyZW50SXRlbXMgPSBwcm9kdWN0cztcclxuXHJcblx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5jdXJyZW50SXRlbXMubGVuZ3RoOyBpKyspIHtcclxuXHRcdFx0XHR2YXIgcHJvZHVjdCA9IHRoaXMuY3VycmVudEl0ZW1zW2ldO1xyXG5cdFx0XHRcdEV2ZW50TWFuYWdlciQzLnB1Ymxpc2goJ3Byb2R1Y3RzLmxvYWRpbmcnLCBwcm9kdWN0KTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0RXZlbnRNYW5hZ2VyJDMucHVibGlzaCgncHJvZHVjdHMubG9hZGVkJywgcHJvZHVjdHMpO1xyXG5cdFx0XHR0aGlzLnJlcGxhY2VJdGVtcyhwcm9kdWN0cyk7XHJcblx0XHRcdHJlc29sdmUoKTtcclxuXHRcdH0uYmluZCh0aGlzKSkuY2F0Y2goZnVuY3Rpb24oZXJyb3IpIHtcclxuXHJcblx0XHR9KTtcclxuXHJcblx0XHRyZXR1cm4gcmVxdWVzdDtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIExvYWRzIHRoZSBwcm9kdWN0cyBhbmQgXHJcblx0ICogcmVwbGFjZSB0aGVtIGluIHRoZSBkaXYgY29udGFpbmVyLlxyXG5cdCAqXHJcblx0ICogQHJldHVybiB2b2lkXHJcblx0ICovXHJcblx0bG9hZFBhZ2VQcm9kdWN0c0J5Q2xpZW50KHBhZ2VOdW1iZXIpXHJcblx0e1xyXG5cdFx0bGV0IHJlcXVlc3Q7XHJcblxyXG5cdFx0aWYgKHRoaXMudG90YWxJdGVtcyA9PSBudWxsKSB7IC8vIG5lZWQgdG8gZmV0Y2ggdGhlbSBmcm9tIHRoZSBzZXJ2ZXIuXHJcblx0XHRcdHJlcXVlc3QgPSB0aGlzLmdldFByb2R1Y3RzKCk7XHJcblx0XHR9IGVsc2UgeyAvLyBubyBuZWVkIHRvIHdhaXQgY2FuIHJlc29sdmUgaW1tZWRpYXRlbHkgd2l0aCB0aGUgcHJvZHVjdHMuIFxyXG5cdFx0XHRyZXF1ZXN0ID0gUHJvbWlzZS5yZXNvbHZlKHRoaXMudG90YWxJdGVtcyk7XHJcblx0XHR9XHJcblxyXG5cdFx0cmVxdWVzdC50aGVuKGZ1bmN0aW9uKHByb2R1Y3RzKSB7XHJcblx0XHRcdHRoaXMudG90YWxJdGVtcyA9IHByb2R1Y3RzO1xyXG5cclxuXHRcdFx0bGV0IHBhZ2VzID0gdGhpcy5jYWxjdWxhdGVDbGllbnRQYWdlcyhwcm9kdWN0cyk7XHJcblxyXG5cdFx0XHR0aGlzLmN1cnJlbnRJdGVtcyA9IHBhZ2VzW3BhZ2VOdW1iZXItMV07XHJcblxyXG5cdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuY3VycmVudEl0ZW1zLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdFx0dmFyIHByb2R1Y3QgPSB0aGlzLmN1cnJlbnRJdGVtc1tpXTtcclxuXHRcdFx0XHRFdmVudE1hbmFnZXIkMy5wdWJsaXNoKCdwcm9kdWN0cy5sb2FkaW5nJywgcHJvZHVjdCk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdEV2ZW50TWFuYWdlciQzLnB1Ymxpc2goJ3Byb2R1Y3RzLmxvYWRlZCcsIHByb2R1Y3RzKTtcclxuXHRcdFx0dGhpcy5yZXBsYWNlSXRlbXModGhpcy5jdXJyZW50SXRlbXMpO1xyXG5cdFx0XHRQcm9taXNlLnJlc29sdmUodGhpcy5jdXJyZW50SXRlbXMpO1xyXG5cclxuXHRcdH0uYmluZCh0aGlzKSkuY2F0Y2goZnVuY3Rpb24oZXJyb3IpIHtcclxuXHJcblx0XHR9KTtcclxuXHJcblx0XHRyZXR1cm4gcmVxdWVzdDtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIENhbGN1bGF0ZXMgdGhlIGFtb3VudCBvZiBwYWdlcyBmb3IgdGhlIGNsaWVudC5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSBhcnJheSB8IHByb2R1Y3RzXHJcblx0ICogQHJldHVybiBhcnJheVxyXG5cdCAqL1xyXG5cdGNhbGN1bGF0ZUNsaWVudFBhZ2VzKHByb2R1Y3RzKVxyXG5cdHtcdFxyXG5cdFx0Ly8gV2UgYXJlIHVzaW5nIHBhZ2luYXRpb24gc28gd2UgbmVlZCB0byB1cGRhdGUgaXQgdG9vLlxyXG5cdFx0Q29udGFpbmVyJDQuUGFnaW5hdGlvbi5zZXR0aW5ncy50b3RhbF9pdGVtcyA9IHByb2R1Y3RzLmxlbmd0aDtcclxuXHRcdFxyXG5cdFx0bGV0IHBlclBhZ2UgPSBDb250YWluZXIkNC5QYWdpbmF0aW9uLnNldHRpbmdzLnBlcl9wYWdlOyBcclxuXHJcblx0XHQvLyBXZSBuZWVkIHRvIGNhbGN1bGF0ZSB0aGUgcGFnZXMgb24gZnVsbCBodHRwIHJlcXVlc3QgXHJcblx0XHQvLyBvbmx5IG9uY2UuIHNvIHdlIGNoZWNrIHRvIHNlZSBpZiB3ZSBoYXZlIHJlc3VsdHMgaW4gb3VyIGNhY2hlLlxyXG5cdFx0aWYgKGNodW5rZWRQcm9kdWN0cy5sZW5ndGggIT0gMCkge1xyXG5cdFx0XHRyZXR1cm4gY2h1bmtlZFByb2R1Y3RzO1xyXG5cdFx0fVxyXG5cclxuXHRcdGNodW5rZWRQcm9kdWN0cyA9IENvbW1vbi5hcnJheV9jaHVuayhwcm9kdWN0cywgcGVyUGFnZSk7XHJcblx0XHRyZXR1cm4gY2h1bmtlZFByb2R1Y3RzO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogU2V0cyB0aGUgRE9NIGVsZW1lbnQgXHJcblx0ICogZm9yIHBvcHVsYXRpbmcgdGhlIHByb2R1Y3RzLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIHN0cmluZyB8IHNlbGVjdG9yXHJcblx0ICogQHJldHVybiB2b2lkXHJcblx0ICovXHJcblx0c2V0RWxlbWVudChzZWxlY3RvcilcclxuXHR7XHJcblx0XHR0aGlzLndyYXBwZXIgPSBET00uZmluZChzZWxlY3Rvcik7XHJcblxyXG5cdFx0aWYgKHRoaXMud3JhcHBlcikge1xyXG5cdFx0XHRET00uYWRkQ2xhc3ModGhpcy53cmFwcGVyLCB0aGlzLnNldHRpbmdzLmNsYXNzKTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFJlcGxhY2UgaXRlbXMgaW4gXHJcblx0ICogdGhlIHByb2R1Y3RzIGNvbnRhaW5lci5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSBhcnJheSB8IGl0ZW1zXHJcblx0ICogQHJldHVybiBhcnJheVxyXG5cdCAqL1xyXG5cdHJlcGxhY2VJdGVtcyhpdGVtcykgXHJcblx0e1xyXG5cdFx0aWYgKCEgQXJyYXkuaXNBcnJheShpdGVtcykgfHwgKGl0ZW1zLmxlbmd0aCA8PSAwICYmIHR5cGVvZiBpdGVtc1swXSA9PSAnc3RyaW5nJykpIHtcclxuXHRcdFx0dGhyb3cgbmV3IEludmFsaWRBcmd1bWVudEV4Y2VwdGlvbiQxO1xyXG5cdFx0fVxyXG5cclxuXHRcdGxldCBwcm9kdWN0cyA9IHRoaXMuYnVpbGRQcm9kdWN0cyhpdGVtcywgdGhpcy5zZXR0aW5ncy5pdGVtX2NsYXNzLCAnZGl2Jyk7XHJcblxyXG5cdFx0dGhpcy53cmFwcGVyLmlubmVySFRNTCA9ICcnO1xyXG5cdFx0cHJvZHVjdHMuZm9yRWFjaChmdW5jdGlvbihwcm9kdWN0KSB7XHJcblx0XHRcdHRoaXMud3JhcHBlci5hcHBlbmRDaGlsZChwcm9kdWN0KTtcclxuXHRcdH0uYmluZCh0aGlzKSk7XHJcblxyXG5cdFx0cmV0dXJuIGl0ZW1zO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogTWFrZXMgYW4gQWpheCBjYWxsIHRvIHRoZSBcclxuXHQgKiBzZXJ2ZXIgd2l0aG91dCBwYXJhbWV0ZXJzLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIG51bWJlciB8IHBhZ2VOdW1iZXJcclxuXHQgKiBAcmV0dXJuIFByb21pc2VcclxuXHQgKi9cclxuXHRnZXRQcm9kdWN0cyhwYWdlTnVtYmVyID0gbnVsbClcclxuXHR7XHJcblx0XHRsZXQgYWN0aW9uID0gKHBhZ2VOdW1iZXIpID8gdGhpcy5zZXR0aW5ncy51cmwgKyAnP3BhZ2U9JyArIHBhZ2VOdW1iZXIgOiB0aGlzLnNldHRpbmdzLnVybDtcclxuXHJcblx0XHRyZXR1cm4gSHR0cCQxLmdldCh7XHJcblx0XHRcdHVybDogYWN0aW9uLFxyXG5cdFx0fSk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBCdWlsZHMgdGhlIGh0bWwgZm9yIHRoZSBwcm9kdWN0cy5cclxuXHQgKiBcclxuXHQgKiBAcGFyYW0gYXJyYXkgfCBhdHRyaWJ1dGVzQ29sbGVjdGlvblxyXG5cdCAqIEBwYXJhbSBzdHJpbmcgfCBjbGFzc05hbWVcclxuXHQgKiBAcGFyYW0gc3RyaW5nIHwgdGFnVHlwZVxyXG5cdCAqIEByZXR1cm4gYXJyYXlcclxuXHQgKi9cclxuXHRidWlsZFByb2R1Y3RzKGF0dHJpYnV0ZXNDb2xsZWN0aW9uLCBjbGFzc05hbWUsIHRhZ1R5cGUpIFxyXG5cdHtcclxuXHRcdGlmKGF0dHJpYnV0ZXNDb2xsZWN0aW9uLmNvbnN0cnVjdG9yLm5hbWUgIT0gJ0FycmF5JyApIHtcclxuXHRcdFx0dGhyb3cgbmV3IEludmFsaWRBcmd1bWVudEV4Y2VwdGlvbiQxO1xyXG5cdFx0fVxyXG5cclxuXHRcdGxldCBidWlsdFByb2R1Y3RzID0gW107XHJcblxyXG5cdFx0YXR0cmlidXRlc0NvbGxlY3Rpb24uZm9yRWFjaChmdW5jdGlvbihhdHRyaWJ1dGVzKSB7XHJcblx0XHRcdGxldCBidWlsdFByb2R1Y3QgPSB0aGlzLmJ1aWxkUHJvZHVjdChhdHRyaWJ1dGVzLCBjbGFzc05hbWUsIHRhZ1R5cGUpO1xyXG5cdFx0XHRidWlsdFByb2R1Y3RzLnB1c2goYnVpbHRQcm9kdWN0KTtcclxuXHRcdH0uYmluZCh0aGlzKSk7XHJcblxyXG5cdFx0cmV0dXJuIGJ1aWx0UHJvZHVjdHM7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBCdWlsZHMgdGhlIGh0bWwgZm9yIGEgc2luZ2xlIHByb2R1Y3QuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gb2JqZWN0IHwgYXR0cmlidXRlc1xyXG5cdCAqIEBwYXJhbSBzdHJpbmcgfCBjbGFzc05hbWVcclxuXHQgKiBAcGFyYW0gc3RyaW5nIHwgdGFnVHlwZVxyXG5cdCAqIEByZXR1cm4gb2JqZWN0XHJcblx0ICovXHJcblx0YnVpbGRQcm9kdWN0KGF0dHJpYnV0ZXMsIGNsYXNzTmFtZSwgdGFnVHlwZSkgXHJcblx0e1xyXG5cdFx0aWYgKHR5cGVvZiBhdHRyaWJ1dGVzICE9ICdvYmplY3QnIHx8IHR5cGVvZiB0YWdUeXBlICE9ICdzdHJpbmcnKSB7XHJcblx0XHRcdHRocm93IG5ldyBJbnZhbGlkQXJndW1lbnRFeGNlcHRpb24kMTtcclxuXHRcdH1cclxuXHJcblx0XHRjbGFzc05hbWUgPSBjbGFzc05hbWUgfHwgbnVsbDtcclxuXHJcblx0XHRsZXQgcHJvZHVjdCA9IERPTS5jcmVhdGVFbGVtZW50KCdkaXYnLCB7XHJcblx0XHRcdGNsYXNzOiAncHJvZHVjdCdcclxuXHRcdH0pO1xyXG5cclxuXHRcdERPTS5hZGRDbGFzcyhwcm9kdWN0LCBjbGFzc05hbWUpO1xyXG5cclxuXHRcdGxldCBvdmVybGF5ID0gRE9NLmNyZWF0ZUVsZW1lbnQoJ2RpdicsIHtcclxuXHRcdFx0Y2xhc3M6ICdwcm9kdWN0LW92ZXJsYXknLFxyXG5cdFx0fSk7XHJcblxyXG5cdFx0cHJvZHVjdC5hcHBlbmRDaGlsZChvdmVybGF5KTtcclxuXHJcblx0XHRmb3IgKHZhciBhdHRyaWJ1dGUgaW4gYXR0cmlidXRlcykge1xyXG5cdFx0XHRpZiAoISBDb21tb24uaW5fYXJyYXkoYXR0cmlidXRlLCB0aGlzLnNldHRpbmdzLmF0dHJpYnV0ZXMpKSB7XHJcblx0XHRcdFx0Y29udGludWU7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGxldCB0YWcgPSBET00uY3JlYXRlRWxlbWVudCh0YWdUeXBlKTtcclxuXHJcblx0XHRcdGlmIChhdHRyaWJ1dGUgPT0gJ2ltYWdlJykge1xyXG5cdFx0XHRcdGxldCBpbWFnZSA9IERPTS5jcmVhdGVFbGVtZW50KCdpbWcnLCB7XHJcblx0XHRcdFx0XHRzcmM6IGF0dHJpYnV0ZXNbYXR0cmlidXRlXVxyXG5cdFx0XHRcdH0pO1xyXG5cdFx0XHRcdHByb2R1Y3QuYXBwZW5kQ2hpbGQoaW1hZ2UpO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdHRhZy5pbm5lckhUTUwgPSBhdHRyaWJ1dGVzW2F0dHJpYnV0ZV0gfHwgJyc7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdERPTS5hZGRDbGFzcyh0YWcsICdwcm9kdWN0LScgKyBTdHIua2ViYWJDYXNlKGF0dHJpYnV0ZSkpO1xyXG5cdFx0XHRvdmVybGF5LmFwcGVuZENoaWxkKHRhZyk7XHJcblx0XHR9XHJcblxyXG5cdFx0bGV0IHRhZyA9IERPTS5jcmVhdGVFbGVtZW50KCdkaXYnLCB7XHJcblx0XHRcdGNsYXNzOiAnYWN0aW9uLWJ1dHRvbnMnXHJcblx0XHR9KTtcclxuXHJcblx0XHRsZXQgYWRkVG9DYXJ0ID0gRE9NLmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicsIHtcclxuXHRcdFx0Y2xhc3M6ICdhZGQtdG8tY2FydCcsXHJcblx0XHRcdHR5cGU6ICdidXR0b24nLFxyXG5cdFx0XHR0ZXh0OiAnKycsXHJcblx0XHR9KTtcclxuXHJcblx0XHRsZXQgZmF2b3JpdGUgPSBET00uY3JlYXRlRWxlbWVudCgnYnV0dG9uJywge1xyXG5cdFx0XHRjbGFzczogJ2Zhdm9yaXRlJyxcclxuXHRcdFx0dHlwZTogJ2J1dHRvbicsXHJcblx0XHRcdHRleHQ6ICcmaGVhcnRzOydcclxuXHRcdH0pO1xyXG5cclxuXHRcdGlmICh0aGlzLnNldHRpbmdzLmFkZF9idXR0b25fY2xhc3MpIHtcclxuXHRcdFx0RE9NLmFkZENsYXNzKGFkZFRvQ2FydCwgdGhpcy5zZXR0aW5ncy5hZGRfYnV0dG9uX2NsYXNzKTtcclxuXHRcdH1cclxuXHJcblx0XHRpZiAodGhpcy5zZXR0aW5ncy5mYXZvcml0ZV9idXR0b25fY2xhc3MpIHtcclxuXHRcdFx0RE9NLmFkZENsYXNzKGZhdm9yaXRlLCB0aGlzLnNldHRpbmdzLmZhdm9yaXRlX2J1dHRvbl9jbGFzcyk7XHJcblx0XHR9XHJcblxyXG5cdFx0dGFnLmFwcGVuZENoaWxkKGFkZFRvQ2FydCk7XHJcblx0XHR0YWcuYXBwZW5kQ2hpbGQoZmF2b3JpdGUpO1xyXG5cclxuXHRcdGFkZFRvQ2FydC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcclxuXHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdFx0XHRFdmVudE1hbmFnZXIkMy5wdWJsaXNoKCdjYXJ0LnByb2R1Y3QuYWRkZWQnLCBhdHRyaWJ1dGVzKTtcclxuXHRcdH0pO1xyXG5cclxuXHRcdGZhdm9yaXRlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xyXG5cdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XHJcblx0XHRcdHRoaXMuaW5uZXJIVE1MID0gJyYjeDI3MTM7JztcclxuXHRcdFx0RXZlbnRNYW5hZ2VyJDMucHVibGlzaCgnY2FydC5wcm9kdWN0LmZhdm9yaXRlZCcsIGF0dHJpYnV0ZXMpO1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0b3ZlcmxheS5hcHBlbmRDaGlsZCh0YWcpO1xyXG5cclxuXHRcdHJldHVybiBwcm9kdWN0O1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQWRkIHRoZSBlQ29tbWVyY2Ugc3R5bGUgdGFncyB0byB0aGUgRE9NLlxyXG5cdCAqL1xyXG5cdGFkZFN0eWxlVGFnKCkgXHJcblx0e1xyXG5cdFx0aWYgKERPTS5maW5kKCcjVHVyYm8tZUNvbW1lcmNlLVByb2R1Y3RzJykpIHtcclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0fVxyXG5cclxuXHRcdGlmICh0aGlzLnNldHRpbmdzLm5vX2Nzcykge1xyXG5cdFx0XHRyZXR1cm47XHJcblx0XHR9XHJcblxyXG5cdFx0bGV0IHdpZHRoID0gdGhpcy5zZXR0aW5ncy53aWR0aCB8fCAnYXV0byc7XHJcblx0XHRsZXQgaGVpZ2h0ID0gdGhpcy5zZXR0aW5ncy5oZWlnaHQgfHwgJzIwMHB4JztcclxuXHRcdGxldCBtaW5XaWR0aCA9IHRoaXMuc2V0dGluZ3MubWluX3dpZHRoIHx8ICcyMDBweCc7XHJcblx0XHRsZXQgbWF4V2lkdGggPSB0aGlzLnNldHRpbmdzLm1heF93aWR0aCB8fCAnMjUwcHgnO1xyXG5cclxuXHRcdGxldCBjc3MgPSBgXHJcblx0XHRcdC5wcm9kdWN0IHtcclxuXHRcdFx0XHRwb3NpdGlvbjogcmVsYXRpdmU7XHJcblx0XHRcdFx0bWFyZ2luOiA1cHggNXB4O1xyXG5cdFx0XHRcdGJvcmRlcjogMXB4IHNvbGlkICNlNGU0ZTQ7XHJcblx0XHRcdFx0d2lkdGg6ICR7d2lkdGh9O1xyXG5cdFx0XHRcdG1pbi13aWR0aDogJHttaW5XaWR0aH07XHJcblx0XHRcdFx0bWF4LXdpZHRoOiAke21heFdpZHRofTtcclxuXHRcdFx0XHRoZWlnaHQ6ICR7aGVpZ2h0fTtcclxuXHRcdFx0XHRjdXJzb3I6IHBvaW50ZXI7XHJcblx0XHRcdFx0Y29sb3I6ICNmZmZmZmY7XHJcblx0XHRcdFx0b3ZlcmZsb3c6IGhpZGRlbjtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0LnByb2R1Y3QgPiAucHJvZHVjdC1vdmVybGF5IHtcclxuXHRcdFx0XHRwb3NpdGlvbjogYWJzb2x1dGU7XHJcblx0XHRcdFx0dG9wOiAwO1xyXG5cdFx0XHRcdGxlZnQ6IDA7XHJcblx0XHRcdFx0d2lkdGg6IDEwMCU7XHJcblx0XHRcdFx0aGVpZ2h0OiAxMDAlO1xyXG5cdFx0XHRcdG9wYWNpdHk6IDAuNTtcclxuXHRcdFx0XHR6LWluZGV4OiA1O1xyXG5cdFx0XHRcdHRyYW5zaXRpb246IDFzIGFsbDtcclxuXHRcdFx0XHR0cmFuc2Zvcm06IHRyYW5zbGF0ZVgoLTI1MHB4KTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0LnByb2R1Y3Q6aG92ZXIgPiAucHJvZHVjdC1vdmVybGF5IHtcclxuXHRcdFx0XHRiYWNrZ3JvdW5kOiByZ2JhKDAsIDAsIDAsIDAuNDUpO1xyXG5cdFx0XHRcdHRyYW5zZm9ybTogdHJhbnNsYXRlWCgwcHgpO1xyXG5cdFx0XHRcdG9wYWNpdHk6IDE7XHJcblx0XHRcdFx0dHJhbnNpdGlvbjogMC41cyBhbGw7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdC5wcm9kdWN0ID4gaW1nIHtcclxuXHRcdFx0XHRwb3NpdGlvbjogYWJzb2x1dGU7XHJcblx0XHRcdFx0bGVmdDogMDtcclxuXHRcdFx0XHR0b3A6IDA7XHJcblx0XHRcdFx0d2lkdGg6IDEwMCU7XHJcblx0XHRcdFx0aGVpZ2h0OiAxMDAlO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHQucHJvZHVjdCA+IC5wcm9kdWN0LWltYWdlIHtcclxuXHRcdFx0XHR6LWluZGV4OiAwO1xyXG5cdFx0XHRcdHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuXHRcdFx0XHR0b3A6IDA7XHJcblx0XHRcdFx0bGVmdDogMDtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0LnByb2R1Y3QgPiAucHJvZHVjdC1vdmVybGF5ID4gLnByb2R1Y3QtbmFtZSwgXHJcblx0XHRcdC5wcm9kdWN0ID4gLnByb2R1Y3Qtb3ZlcmxheSA+IC5wcm9kdWN0LXByaWNlLFxyXG5cdFx0XHQucHJvZHVjdCA+IC5wcm9kdWN0LW92ZXJsYXkgPiAucHJvZHVjdC1kZWxpdmVyeS10aW1lIHtcclxuXHRcdFx0XHR6LWluZGV4OiAxO1xyXG5cdFx0XHRcdHBvc2l0aW9uOiByZWxhdGl2ZTtcclxuXHRcdFx0XHR0ZXh0LWFsaWduOiBjZW50ZXI7XHJcblx0XHRcdFx0bWFyZ2luLXRvcDogMjVweDtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0LnByb2R1Y3QgPiAucHJvZHVjdC1vdmVybGF5ID4gLmFjdGlvbi1idXR0b25zIHtcclxuXHRcdFx0XHR3aWR0aDogMTAwJTtcclxuXHRcdFx0XHRtYXJnaW4tdG9wOiAxMHB4O1xyXG5cdFx0XHRcdHRleHQtYWxpZ246IGNlbnRlcjtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0LnByb2R1Y3QgPiAucHJvZHVjdC1vdmVybGF5ID4gLmFjdGlvbi1idXR0b25zID4gLmZhdm9yaXRlIHtcclxuXHRcdFx0XHRtYXJnaW4tbGVmdDogMTBweDtcclxuXHRcdFx0fVxyXG5cclxuXHRcdGA7XHJcblx0ICAgIFxyXG5cdCAgICBET00uYWRkU3R5bGUoJ1R1cmJvLWVDb21tZXJjZS1Qcm9kdWN0cycsIGNzcyk7XHJcblx0fVxyXG59XG5cbi8qKlxyXG4gKiBUaGUgU2VydmljZXMgT2JqZWN0LCBoYW5kbGVzIHRoZSBzZXJ2aWNlcy5cclxuICovXHJcbmNsYXNzIFNlcnZpY2VzIFxyXG57XHJcblxyXG59XG5cbmxldCBkZWZhdWx0TWVzc2FnZSQ0ID0gJ3NvcnJ5LCBubyBtb3JlIHBhZ2VzLic7XHJcblxyXG5jbGFzcyBOb3RJblBhZ2VSYW5nZUV4Y2VwdGlvbiBleHRlbmRzIEV4Y2VwdGlvbkhhbmRsZXJcclxue1xyXG5cdGNvbnN0cnVjdG9yKG1lc3NhZ2UgPSBudWxsKSBcclxuXHR7XHJcblx0XHRtZXNzYWdlID0gbWVzc2FnZSB8fCBkZWZhdWx0TWVzc2FnZSQ0O1xyXG5cdFx0c3VwZXIoKTtcclxuICAgIFx0c3VwZXIuc3RhY2tUcmFjZSh0aGlzLCBtZXNzYWdlKTtcclxuICAgIH1cclxufVxuXG4vKipcclxuICogQGZpbGUgXHJcbiAqIFBhZ2luYXRpb24gY2xhc3MuXHJcbiAqXHJcbiAqIFRoZSBQYWdpbmF0aW9uIGNvbXBvbmVudCwgaGFuZGxlcyB0aGUgcGFnaW5hdGlvbi5cclxuICovXHJcblxyXG4vKipcclxuICogVGhlIGRlZmF1bHQgc2V0dGluZ3Mgb2YgdGhlIHBhZ2luYXRpb24uXHJcbiAqXHJcbiAqIEB2YXIgb2JqZWN0XHJcbiAqL1xyXG5sZXQgZGVmYXVsdFNldHRpbmdzJDQgPSB7XHJcblx0ZWxlbWVudDogJy5wYWdpbmF0aW9uLWxpbmtzJyxcclxuXHRwcm9jY2Vzc2luZzogJ2NsaWVudC1zaWRlJyxcclxuXHRjbGFzczogJycsXHJcblx0cGVyX3BhZ2U6IDUsXHJcblx0dG90YWxfaXRlbXM6IDUsXHJcbn07XHJcblxyXG4vKipcclxuICogU3RvcmVzIHRoZSBjb250YWluZXIgb2JqZWN0LlxyXG4gKlxyXG4gKiBAdmFyIFxcQ29yZVxcQ29udGFpbmVyXHJcbiAqL1xyXG5sZXQgQ29udGFpbmVyJDU7XHJcblxyXG4vKipcclxuICogU3RvcmVzIHRoZSBwcm9kdWN0cyBjb21wb25lbnQuXHJcbiAqXHJcbiAqIEB2YXIgXFxDb21wb25lbnRzXFxQcm9kdWN0c1xyXG4gKi9cclxubGV0IFByb2R1Y3RzJDI7XHJcblxyXG4vKipcclxuICogU3RvcmVzIHRoZSBjb250YWluZXIgb2JqZWN0LlxyXG4gKiBcclxuICogQHZhciBcXENvcmVcXEV2ZW50TWFuYWdlclxyXG4gKi9cclxubGV0IEV2ZW50TWFuYWdlciQ0O1xyXG5cclxuY2xhc3MgUGFnaW5hdGlvbiBcclxue1xyXG5cdC8qKlxyXG5cdCAqIC0gSW5pdGlhbGl6ZSB0aGUgY29udGFpbmVyIG9iamVjdC5cclxuXHQgKiAtIEluaXRpYWxpemUgdGhlIHByb2R1Y3RzIGNvbXBvbmVudC5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSBcXENvcmVcXENvbnRhaW5lciB8IGNvbnRhaW5lclxyXG5cdCAqIEBwYXJhbSBcXENvbXBvbmVudHNcXFByb2R1Y3RzIHwgcHJvZHVjdHNcclxuXHQgKiBAcmV0dXJuIHZvaWRcclxuXHQgKi9cclxuXHRjb25zdHJ1Y3Rvcihjb250YWluZXIsIHByb2R1Y3RzLCBldmVudHMpIFxyXG5cdHtcclxuXHRcdHRoaXMuc2V0Q3VycmVudCgxKTtcclxuXHRcdENvbnRhaW5lciQ1ID0gY29udGFpbmVyO1xyXG5cdFx0UHJvZHVjdHMkMiA9IHByb2R1Y3RzO1xyXG5cdFx0RXZlbnRNYW5hZ2VyJDQgPSBldmVudHM7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBTZXR1cCB0aGUgcGFnaW5hdGlvbi5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSBvYmplY3QgfCBzZXR0aW5nc1xyXG5cdCAqIEByZXR1cm4gdm9pZFxyXG5cdCAqL1xyXG5cdHNldHVwKHNldHRpbmdzKVxyXG5cdHtcdFxyXG5cdFx0aWYodHlwZW9mIHNldHRpbmdzICE9ICdvYmplY3QnKSB7XHJcblx0XHRcdHRocm93IG5ldyBJbnZhbGlkQXJndW1lbnRFeGNlcHRpb24kMTtcclxuXHRcdH1cclxuXHJcblx0XHR0aGlzLnNldHRpbmdzID0gQ29tbW9uLmV4dGVuZChkZWZhdWx0U2V0dGluZ3MkNCwgc2V0dGluZ3MpO1xyXG5cclxuXHRcdHRoaXMuc2V0RWxlbWVudCh0aGlzLnNldHRpbmdzLmVsZW1lbnQpO1xyXG5cclxuXHRcdC8vIExpc3RlbiB0byB3aGVuIHByb2R1Y3RzIGFyZSBiZWluZyBsb2FkZWQgYW5kIHVwZGF0ZSB0aGUgcGFnaW5hdGlvblxyXG5cdFx0Ly8gd2l0aCB0aGUgYWN0dWFsIGl0ZW1zIGNvdW50LlxyXG5cdFx0RXZlbnRNYW5hZ2VyJDQuc3Vic2NyaWJlKCdwcm9kdWN0cy5sb2FkZWQnLCBmdW5jdGlvbihwcm9kdWN0cykge1xyXG5cdFx0XHR0aGlzLnRvdGFsUGFnZXMgPSB0aGlzLmNhbGN1bGF0ZVRvdGFsUGFnZXModGhpcy5zZXR0aW5ncy5wZXJfcGFnZSwgcHJvZHVjdHMubGVuZ3RoKTtcclxuXHRcdFx0dGhpcy5idWlsZFBhZ2luYXRpb24oKTtcclxuXHRcdH0uYmluZCh0aGlzKSk7XHJcblxyXG5cdFx0Ly8gQXMgYSBmYWxsYmFjayBjaG9vc2UgdGhlIHVzZXIncyBzZXR0aW5ncyBmb3IgdGhlIHRvdGFsIGl0ZW1zIGNvdW50LlxyXG5cdFx0dGhpcy50b3RhbFBhZ2VzID0gdGhpcy5jYWxjdWxhdGVUb3RhbFBhZ2VzKHRoaXMuc2V0dGluZ3MucGVyX3BhZ2UsIHRoaXMuc2V0dGluZ3MudG90YWxfaXRlbXMpO1xyXG5cdFx0dGhpcy5idWlsZFBhZ2luYXRpb24oKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEJ1aWxkcyB0aGUgcGFnaW5hdGlvbi5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSBcclxuXHQgKiBAcmV0dXJuIFxyXG5cdCAqL1xyXG5cdGJ1aWxkUGFnaW5hdGlvbigpXHJcblx0e1xyXG5cdFx0dGhpcy5saW5rcyA9IHRoaXMuY3JlYXRlTGlua3MoKTtcclxuXHRcdHRoaXMucmVwbGFjZUxpbmtzKHRoaXMubGlua3MpO1xyXG5cdFx0dGhpcy5iaW5kRXZlbnRMaXN0ZW5lcnModGhpcy5saW5rcyk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBTZXRzIHRoZSB3cmFwcGVyIGVsZW1lbnQuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gc3RyaW5nIHwgc2VsZWN0b3JcclxuXHQgKiBAcmV0dXJuIHZvaWRcclxuXHQgKi9cclxuXHRzZXRFbGVtZW50KHNlbGVjdG9yKVxyXG5cdHtcclxuXHRcdHRoaXMud3JhcHBlciA9IERPTS5maW5kKHNlbGVjdG9yKTtcclxuXHRcdFxyXG5cdFx0RE9NLmFkZENsYXNzKHRoaXMud3JhcHBlciwgdGhpcy5zZXR0aW5ncy5jbGFzcyk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBSZXBsYWNlcyB0aGUgbGlua3MgaW4gdGhlIHdyYXBwZXIuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gSFRNTFVMaXN0RWxlbWVudCB8IGxpbmtzXHJcblx0ICogQHJldHVybiB2b2lkXHJcblx0ICovXHJcblx0cmVwbGFjZUxpbmtzKGxpbmtzKVxyXG5cdHtcclxuXHRcdHRoaXMud3JhcHBlci5pbm5lckhUTUwgPSAnJztcclxuXHRcdHRoaXMud3JhcHBlci5hcHBlbmRDaGlsZChsaW5rcyk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBDYWxjdWxhdGVzIHRoZSB0b3RhbCBwYWdlcy5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSBudW1iZXIgfCBwZXJQYWdlXHJcblx0ICogQHBhcmFtIG51bWJlciB8IHRvdGFsSXRlbXNcclxuXHQgKiBAcmV0dXJuIG51bWJlclxyXG5cdCAqL1xyXG5cdGNhbGN1bGF0ZVRvdGFsUGFnZXMocGVyUGFnZSwgdG90YWxJdGVtcylcclxuXHR7XHJcblx0XHRwZXJQYWdlID0gcGFyc2VJbnQocGVyUGFnZSk7XHJcblx0XHR0b3RhbEl0ZW1zID0gcGFyc2VJbnQodG90YWxJdGVtcyk7XHJcblxyXG5cdFx0cmV0dXJuIE1hdGguY2VpbCh0b3RhbEl0ZW1zIC8gcGVyUGFnZSk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBCaW5kcyB0aGUgYnV0dG9ucyBldmVudHMgbGlzdGVuZXJzLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIEhUTUxVTGlzdEVsZW1lbnQgfCBsaW5rc1xyXG5cdCAqIEByZXR1cm4gdm9pZFxyXG5cdCAqL1xyXG5cdGJpbmRFdmVudExpc3RlbmVycyhsaW5rcykgXHJcblx0e1xyXG5cdFx0bGV0IGluc3RhbmNlID0gdGhpcztcclxuXHJcblx0XHR0aGlzLm5leHQuY2hpbGROb2Rlc1swXS5vbmNsaWNrID0gZnVuY3Rpb24oZSkge1xyXG5cdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG5cdFx0XHRsZXQgcmVxdWVzdGVkUGFnZSA9IGluc3RhbmNlLmN1cnJlbnQrMTtcclxuXHJcblx0XHRcdGlmIChpbnN0YW5jZS5ub3RJblBhZ2VSYW5nZShyZXF1ZXN0ZWRQYWdlKSkge1xyXG5cdFx0XHRcdHRocm93IG5ldyBOb3RJblBhZ2VSYW5nZUV4Y2VwdGlvbignVGhlIHBhZ2UgeW91IHJlcXVlc3RpbmcgZG9lcyBub3QgZXhpc3RzJyk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdFByb2R1Y3RzJDIubG9hZFByb2R1Y3RzKHJlcXVlc3RlZFBhZ2UpLnRoZW4oZnVuY3Rpb24ocHJvZHVjdHMpIHtcclxuXHRcdFx0XHRpbnN0YW5jZS5zZXRDdXJyZW50KHJlcXVlc3RlZFBhZ2UpO1xyXG5cdFx0XHR9KTtcclxuXHRcdH07XHJcblxyXG5cdFx0dGhpcy5wcmV2aW91cy5jaGlsZE5vZGVzWzBdLm9uY2xpY2sgPSBmdW5jdGlvbihlKSB7XHJcblx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcclxuXHJcblx0XHRcdGxldCByZXF1ZXN0ZWRQYWdlID0gaW5zdGFuY2UuY3VycmVudC0xO1xyXG5cclxuXHRcdFx0aWYoaW5zdGFuY2Uubm90SW5QYWdlUmFuZ2UocmVxdWVzdGVkUGFnZSkpIHtcclxuXHRcdFx0XHR0aHJvdyBuZXcgTm90SW5QYWdlUmFuZ2VFeGNlcHRpb24oJ1RoZSBwYWdlIHlvdSByZXF1ZXN0aW5nIGRvZXMgbm90IGV4aXN0cycpO1xyXG5cdFx0XHR9XHJcblx0XHRcdFxyXG5cdFx0XHRQcm9kdWN0cyQyLmxvYWRQcm9kdWN0cyhyZXF1ZXN0ZWRQYWdlKS50aGVuKGZ1bmN0aW9uKHByb2R1Y3RzKSB7XHJcblx0XHRcdFx0aW5zdGFuY2Uuc2V0Q3VycmVudChyZXF1ZXN0ZWRQYWdlKTtcclxuXHRcdFx0fSk7XHJcblx0XHR9O1xyXG5cclxuXHRcdGZvcih2YXIgaSA9IDA7IGkgPCB0aGlzLnBhZ2VzLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdHRoaXMucGFnZXNbaV0uY2hpbGROb2Rlc1swXS5vbmNsaWNrID0gZnVuY3Rpb24oZSkge1xyXG5cdFx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcclxuXHRcdFx0XHRcclxuXHRcdFx0XHRsZXQgcmVxdWVzdGVkUGFnZSA9IHRoaXMuZ2V0QXR0cmlidXRlKCdkYXRhLXBhZ2UtbnInKTtcclxuXHRcdFx0XHRcclxuXHRcdFx0XHRQcm9kdWN0cyQyLmxvYWRQcm9kdWN0cyhyZXF1ZXN0ZWRQYWdlKS50aGVuKGZ1bmN0aW9uKHByb2R1Y3RzKSB7XHJcblx0XHRcdFx0XHRpbnN0YW5jZS5zZXRDdXJyZW50KHJlcXVlc3RlZFBhZ2UpO1xyXG5cdFx0XHRcdH0pO1xyXG5cdFx0XHR9O1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogU2V0cyB0aGUgY3VycmVudCBwYWdlLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIG51bWJlciB8IHBhZ2VOdW1iZXJcclxuXHQgKiBAcmV0dXJuIHZvaWRcclxuXHQgKi9cclxuXHRzZXRDdXJyZW50KHBhZ2VOdW1iZXIpIFxyXG5cdHtcclxuXHRcdHRoaXMuY3VycmVudCA9IHBhcnNlSW50KHBhZ2VOdW1iZXIpO1xyXG5cdFx0dGhpcy5jaGFuZ2VVcmwocGFnZU51bWJlcik7XHJcblx0XHR0aGlzLnNldEFjdGl2ZUxpbmsocGFnZU51bWJlcik7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBHZXRzIHRoZSBjdXJyZW50IHBhZ2UuXHJcblx0ICpcclxuXHQgKiBAcmV0dXJuIG51bWJlclxyXG5cdCAqL1xyXG5cdGdldEN1cnJlbnQoKSBcclxuXHR7XHJcblx0XHRyZXR1cm4gdGhpcy5jdXJyZW50O1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQ3JlYXRlcyB0aGUgcGFnaW5hdGlvbiBsaW5rcy5cclxuXHQgKlxyXG5cdCAqIEByZXR1cm4gSFRNTFVMaXN0RWxlbWVudFxyXG5cdCAqL1xyXG5cdGNyZWF0ZUxpbmtzKCkgXHJcblx0e1xyXG5cdFx0bGV0IHVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndWwnKTtcclxuXHRcdFxyXG5cdFx0dGhpcy5wYWdlcyA9IHRoaXMuY3JlYXRlUGFnZUxpbmtzKCk7XHJcblx0XHR0aGlzLnByZXZpb3VzID0gdGhpcy5jcmVhdGVQcmV2aW91c0J1dHRvbigpO1xyXG5cdFx0dGhpcy5uZXh0ID0gdGhpcy5jcmVhdGVOZXh0QnV0dG9uKCk7XHJcblxyXG5cdFx0dWwuY2xhc3NOYW1lID0gJ3BhZ2luYXRpb24nO1xyXG5cdFx0dWwuYXBwZW5kQ2hpbGQodGhpcy5wcmV2aW91cyk7XHJcblxyXG5cdFx0dGhpcy5wYWdlcy5mb3JFYWNoKGZ1bmN0aW9uKHBhZ2UpIHtcclxuXHRcdFx0dWwuYXBwZW5kQ2hpbGQocGFnZSk7XHJcblx0XHR9KTtcclxuXHJcblx0XHR1bC5hcHBlbmRDaGlsZCh0aGlzLm5leHQpO1xyXG5cclxuXHRcdHJldHVybiB1bDtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIENyZWF0ZXMgdGhlIHBhZ2VzIGl0ZW0gbGlua3MuXHJcblx0ICpcclxuXHQgKiBAcmV0dXJuIGFycmF5PEhUTUxMSUVsZW1lbnQ+XHJcblx0ICovXHJcblx0Y3JlYXRlUGFnZUxpbmtzKCkgXHJcblx0e1xyXG5cdFx0dmFyIHBhZ2VzID0gW107XHJcblxyXG5cdFx0Zm9yKHZhciBpID0gMTsgaSA8PSB0aGlzLnRvdGFsUGFnZXM7IGkrKykge1xyXG5cdFx0XHR2YXIgcGFnZUl0ZW0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaScpO1xyXG5cdFx0XHR2YXIgbGluayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKTtcclxuXHRcdFx0cGFnZUl0ZW0uY2xhc3NOYW1lID0gKHRoaXMuY3VycmVudCA9PSBpKSA/ICdwYWdlLWl0ZW0gYWN0aXZlJyA6ICdwYWdlLWl0ZW0nO1xyXG5cdFx0XHRsaW5rLmNsYXNzTmFtZSA9ICdwYWdlLWxpbmsnO1xyXG5cdFx0XHRsaW5rLnNldEF0dHJpYnV0ZSgnaHJlZicsICc/cGFnZT0nKyBpKTtcclxuXHRcdFx0bGluay5zZXRBdHRyaWJ1dGUoJ2RhdGEtcGFnZS1ucicsIGkpO1xyXG5cdFx0XHRsaW5rLmlubmVySFRNTCA9IGk7XHJcblx0XHRcdHBhZ2VJdGVtLmFwcGVuZENoaWxkKGxpbmspO1xyXG5cdFx0XHRwYWdlcy5wdXNoKHBhZ2VJdGVtKTtcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gcGFnZXM7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBDcmVhdGVzIHRoZSBwcmV2aW91cyBidXR0b24gbGluay5cclxuXHQgKlxyXG5cdCAqIEByZXR1cm4gSFRNTExJRWxlbWVudFxyXG5cdCAqL1xyXG5cdGNyZWF0ZVByZXZpb3VzQnV0dG9uKCkgXHJcblx0e1xyXG5cdFx0dmFyIGxpID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKTtcclxuXHRcdHZhciBsaW5rID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpO1xyXG5cdFx0dmFyIHNwYW4xID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xyXG5cdFx0dmFyIHNwYW4yID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xyXG5cdFx0XHJcblx0XHRcclxuXHRcdGxpLmNsYXNzTmFtZSA9ICdwYWdlLWl0ZW0nO1xyXG5cdFx0bGluay5jbGFzc05hbWUgPSAncGFnZS1saW5rJztcclxuXHRcdHNwYW4yLmNsYXNzTmFtZSA9ICdzci1vbmx5JztcclxuXHJcblx0XHRsaW5rLnNldEF0dHJpYnV0ZSgnaHJlZicsICcnKTtcclxuXHRcdGxpbmsuc2V0QXR0cmlidXRlKCdhcmlhLWxhYmVsJywgJ1ByZXZpb3VzJyk7XHJcblx0XHRzcGFuMS5zZXRBdHRyaWJ1dGUoJ2FyaWEtaGlkZGVuJywgJ3RydWUnKTtcclxuXHJcblx0XHRzcGFuMS5pbm5lckhUTUwgPSAnJmxhcXVvOyc7XHJcblx0XHRzcGFuMi5pbm5lckhUTUwgPSAnUHJldmlvdXMnO1xyXG5cclxuXHRcdGxpbmsuYXBwZW5kQ2hpbGQoc3BhbjEpO1xyXG5cdFx0bGluay5hcHBlbmRDaGlsZChzcGFuMik7XHJcblx0XHRsaS5hcHBlbmRDaGlsZChsaW5rKTtcclxuXHJcblx0XHRyZXR1cm4gbGk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBDcmVhdGVzIHRoZSBuZXh0IGJ1dHRvbiBsaW5rLlxyXG5cdCAqXHJcblx0ICogQHJldHVybiBIVE1MTElFbGVtZW50XHJcblx0ICovXHJcblx0Y3JlYXRlTmV4dEJ1dHRvbigpIFxyXG5cdHtcclxuXHRcdHZhciBsaSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJyk7XHJcblx0XHR2YXIgbGluayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKTtcclxuXHRcdHZhciBzcGFuMSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcclxuXHRcdHZhciBzcGFuMiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcclxuXHRcdFxyXG5cdFx0bGkuY2xhc3NOYW1lID0gJ3BhZ2UtaXRlbSc7XHJcblx0XHRsaW5rLmNsYXNzTmFtZSA9ICdwYWdlLWxpbmsnO1xyXG5cdFx0c3BhbjIuY2xhc3NOYW1lID0gJ3NyLW9ubHknO1xyXG5cclxuXHRcdGxpbmsuc2V0QXR0cmlidXRlKCdocmVmJywgJycpO1xyXG5cdFx0bGluay5zZXRBdHRyaWJ1dGUoJ2FyaWEtbGFiZWwnLCAnTmV4dCcpO1xyXG5cdFx0c3BhbjEuc2V0QXR0cmlidXRlKCdhcmlhLWhpZGRlbicsICd0cnVlJyk7XHJcblxyXG5cdFx0c3BhbjEuaW5uZXJIVE1MID0gJyZyYXF1bzsnO1xyXG5cdFx0c3BhbjIuaW5uZXJIVE1MID0gJ05leHQnO1xyXG5cclxuXHRcdGxpbmsuYXBwZW5kQ2hpbGQoc3BhbjEpO1xyXG5cdFx0bGluay5hcHBlbmRDaGlsZChzcGFuMik7XHJcblx0XHRsaS5hcHBlbmRDaGlsZChsaW5rKTtcclxuXHJcblx0XHRyZXR1cm4gbGk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBDaGVja3MgaWYgdGhlIGdpdmVuIHBhZ2UgaXMgaW4gcmFuZ2UuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gbnVtYmVyIHwgcGFnZU51bWJlclxyXG5cdCAqIEByZXR1cm4gYm9vbFxyXG5cdCAqL1xyXG5cdG5vdEluUGFnZVJhbmdlKHBhZ2VOdW1iZXIpIFxyXG5cdHtcclxuXHRcdHJldHVybiAocGFnZU51bWJlciA+IHRoaXMudG90YWxQYWdlcyB8fCBwYWdlTnVtYmVyIDw9IDApIHx8IGlzTmFOKHBhZ2VOdW1iZXIpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQ2hhbmdlcyB0aGUgdXJsIHRvIGEgZ2l2ZW4gcGFnZSBudW1iZXIuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gbnVtYmVyIHwgcGFnZU51bWJlclxyXG5cdCAqIEByZXR1cm4gdm9pZFxyXG5cdCAqL1xyXG5cdGNoYW5nZVVybChwYWdlTnVtYmVyKSBcclxuXHR7XHJcblx0XHRwYWdlTnVtYmVyID0gIHBhZ2VOdW1iZXIgfHwgcXVlcnlTdHJpbmcoKVsncGFnZSddO1xyXG5cdFx0d2luZG93Lmhpc3RvcnkucmVwbGFjZVN0YXRlKCcnLCAnJywgdGhpcy51cGRhdGVVUkxQYXJhbWV0ZXIod2luZG93LmxvY2F0aW9uLmhyZWYsICdwYWdlJywgcGFnZU51bWJlcikpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogU2V0cyB0aGUgYWN0aXZlIGxpbmsuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gbnVtYmVyIHwgcGFnZU51bWJlclxyXG5cdCAqIEByZXR1cm4gdm9pZFxyXG5cdCAqL1xyXG5cdHNldEFjdGl2ZUxpbmsocGFnZU51bWJlcilcclxuXHR7XHJcblx0XHRmb3IodmFyIHBhZ2UgaW4gdGhpcy5wYWdlcykge1xyXG5cdFx0XHRpZiAodGhpcy5wYWdlc1twYWdlXS5jaGlsZE5vZGVzWzBdLmdldEF0dHJpYnV0ZSgnZGF0YS1wYWdlLW5yJykgPT0gcGFnZU51bWJlcikge1xyXG5cdFx0XHRcdERPTS5hZGRDbGFzcyh0aGlzLnBhZ2VzW3BhZ2VdLCAnYWN0aXZlJyk7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0RE9NLnJlbW92ZUNsYXNzKHRoaXMucGFnZXNbcGFnZV0sICdhY3RpdmUnKTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogR2V0IHRoZSBnZXQgdmFyaWFibGVzIGZyb20gdGhlIHVybC5cclxuXHQgKlxyXG5cdCAqIEByZXR1cm4gYXJyYXlcclxuXHQgKi9cclxuXHRxdWVyeVN0cmluZygpIFxyXG5cdHtcclxuXHRcdHZhciB2YXJzID0ge307XHJcblx0XHR2YXIgcGFydHMgPSB3aW5kb3cubG9jYXRpb24uaHJlZi5yZXBsYWNlKC9bPyZdKyhbXj0mXSspPShbXiZdKikvZ2ksIGZ1bmN0aW9uKG0sIGtleSwgdmFsdWUpIHtcclxuXHRcdFx0dmFyc1trZXldID0gdmFsdWU7XHJcblx0XHR9KTtcclxuXHJcblx0XHRyZXR1cm4gdmFycztcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIE1vZGlmaWVzIHRoZSBnZXQgcGFyYW1ldGVyIGluIHRoZSB1cmwuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gc3RyaW5nIHwgdXJsXHJcblx0ICogQHBhcmFtIHN0cmluZyB8IHBhcmFtXHJcblx0ICogQHBhcmFtIG51bWJlciB8IHBhcmFtVmFsXHJcblx0ICogQHJldHVybiBzdHJpbmdcclxuXHQgKi9cclxuXHR1cGRhdGVVUkxQYXJhbWV0ZXIodXJsLCBwYXJhbSwgcGFyYW1WYWwpIFxyXG5cdHtcclxuXHQgICAgdmFyIG5ld0FkZGl0aW9uYWxVUkwgPSBcIlwiO1xyXG5cdCAgICB2YXIgdGVtcEFycmF5ID0gdXJsLnNwbGl0KFwiP1wiKTtcclxuXHQgICAgdmFyIGJhc2VVUkwgPSB0ZW1wQXJyYXlbMF07XHJcblx0ICAgIHZhciBhZGRpdGlvbmFsVVJMID0gdGVtcEFycmF5WzFdO1xyXG5cdCAgICB2YXIgdGVtcCA9IFwiXCI7XHJcblxyXG5cdCAgICBpZiAoYWRkaXRpb25hbFVSTCkge1xyXG5cdCAgICAgICAgdGVtcEFycmF5ID0gYWRkaXRpb25hbFVSTC5zcGxpdChcIiZcIik7XHJcblx0ICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRlbXBBcnJheS5sZW5ndGg7IGkrKyl7XHJcblx0ICAgICAgICAgICAgaWYgKHRlbXBBcnJheVtpXS5zcGxpdCgnPScpWzBdICE9IHBhcmFtKXtcclxuXHQgICAgICAgICAgICAgICAgbmV3QWRkaXRpb25hbFVSTCArPSB0ZW1wICsgdGVtcEFycmF5W2ldO1xyXG5cdCAgICAgICAgICAgICAgICB0ZW1wID0gXCImXCI7XHJcblx0ICAgICAgICAgICAgfVxyXG5cdCAgICAgICAgfVxyXG5cdCAgICB9XHJcblxyXG5cdCAgICB2YXIgcm93c1RleHQgPSB0ZW1wICsgXCJcIiArIHBhcmFtICsgXCI9XCIgKyBwYXJhbVZhbDtcclxuXHQgICAgcmV0dXJuIGJhc2VVUkwgKyBcIj9cIiArIG5ld0FkZGl0aW9uYWxVUkwgKyByb3dzVGV4dDtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFJlc2V0cyB0aGUgcGFnaW5hdGlvbi5cclxuXHQgKlxyXG5cdCAqIEByZXR1cm4gdm9pZFxyXG5cdCAqL1xyXG5cdHJlc2V0KCkgXHJcblx0e1xyXG5cdFx0dGhpcy5zZXRDdXJyZW50KDEpO1xyXG5cdFx0dGhpcy5jaGFuZ2VVcmwoMSk7XHJcblx0fVxyXG59XG5cbmxldCBkZWZhdWx0TWVzc2FnZSQ1ID0gJ0luIG9yZGVyIHRvIHVzZSBjb21wb25lbnRzIHlvdSBtdXN0IHJlZ2lzdGVyIHRoZW0gd2l0aCB0aGUgc2hvcCEnOyBcclxuXHJcbmNsYXNzIENvbXBvbmVudE5vdFJlZ2lzdGVyZWRFeGNlcHRpb24gZXh0ZW5kcyBFeGNlcHRpb25IYW5kbGVyXHJcbntcclxuXHRjb25zdHJ1Y3RvcihtZXNzYWdlID0gbnVsbCkgXHJcblx0e1xyXG5cdFx0bWVzc2FnZSA9IG1lc3NhZ2UgfHwgZGVmYXVsdE1lc3NhZ2UkNTtcclxuXHRcdHN1cGVyKG1lc3NhZ2UpO1xyXG4gICAgXHRzdXBlci5zdGFja1RyYWNlKHRoaXMsIG1lc3NhZ2UpO1xyXG4gICAgfVxyXG59XG5cbmxldCBkZWZhdWx0U2V0dGluZ3MkNSA9IHtcclxuXHRkZWJ1Z19sZXZlbDogJ2Vycm9yJyxcclxuXHRlbGVtZW50OiAnYm9keScsXHJcblx0aW5qZWN0X2xpYnJhcmllczogW10sXHJcblx0Y29tcG9uZW50czogWydQcm9kdWN0cycsICdTZXJ2aWNlcycsICdGaWx0ZXInLCAnUGFnaW5hdGlvbicsICdDYXJ0J10sXHJcblx0bG9hZGluZ19hbmltYXRpb246IHRydWVcclxufTtcclxuXHJcbmxldCBleHRlcm5hbExpYnJhcmllcyA9IHtcclxuXHRib290c3RyYXA6ICdodHRwczovL21heGNkbi5ib290c3RyYXBjZG4uY29tL2Jvb3RzdHJhcC8zLjMuNy9jc3MvYm9vdHN0cmFwLm1pbi5jc3MnLFxyXG59O1xyXG5cclxubGV0IGRlYnVnTGV2ZWwkMTtcclxuXHJcbmNsYXNzIFR1cmJvRWNvbW1lcmNlXHJcbntcclxuXHQvKipcclxuXHQgKiBSZXRyaWV2ZSB0aGUgZGVidWcgbGV2ZWwuXHJcblx0ICpcclxuXHQgKiBAcmV0dXJuIHN0cmluZ1xyXG5cdCAqL1xyXG5cdGdldCBkZWJ1Z0xldmVsKClcclxuXHR7XHJcblx0XHRyZXR1cm4gZGVidWdMZXZlbCQxO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogVGhlIGVudGVyeSBmb3IgdGhlIHNob3AuXHJcblx0ICogLSBTZXR0aW5nIHRoZSBleGNlcHRpb24gaGFuZGxlci5cclxuXHQgKiAtIFNldHRpbmcgdGhlIGlvYyBjb250YWluZXIuXHJcblx0ICogLSBFeHRlbmRpbmcgdGhlIHVzZXIgc2V0dGluZ3MuXHJcblx0ICogLSBTZXR0aW5nIHRoZSBlbGVtZW50LlxyXG5cdCAqIC0gRGlzYWJsaW5nIGRlZmF1bHQgZXJyb3JzLlxyXG5cdCAqIC0gUGFzc2luZyBjYWxscyB2aWEgcHJveHkgdG8gdGhlIGNvbXBvbmVudHMuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gb2JqZWN0IHwgc2V0dGluZ3NcclxuXHQgKiBAcmV0dXJuIFByb3h5XHJcblx0ICovXHJcblx0Y29uc3RydWN0b3Ioc2V0dGluZ3MpXHJcblx0e1xyXG5cdFx0aWYgKHR5cGVvZiBzZXR0aW5ncyAhPSAnb2JqZWN0Jykge1xyXG5cdFx0XHR0aHJvdyBuZXcgSW52YWxpZEFyZ3VtZW50RXhjZXB0aW9uJDE7XHJcblx0XHR9XHJcblxyXG5cdFx0dGhpcy5jb250YWluZXIgPSBuZXcgQ29udGFpbmVyO1xyXG5cdFx0dGhpcy5zZXR0aW5ncyA9IENvbW1vbi5leHRlbmQoZGVmYXVsdFNldHRpbmdzJDUsIHNldHRpbmdzKTtcclxuXHJcblx0XHR0aGlzLmxvYWRFeHRlcm5hbExpYnJhcmllcygpO1xyXG5cclxuXHRcdGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCBmdW5jdGlvbigpIHtcclxuXHRcdFx0dGhpcy5zZXRFbGVtZW50KHRoaXMuc2V0dGluZ3MuZWxlbWVudCk7XHJcblx0XHRcdFxyXG5cdFx0XHRpZiAodGhpcy5zZXR0aW5ncy5sb2FkaW5nX2FuaW1hdGlvbikge1xyXG5cdFx0XHRcdHN0YXJ0TG9hZGluZy5jYWxsKHRoaXMpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHR0aGlzLmFkZFN0eWxlVGFnKCk7XHJcblx0XHR9LmJpbmQodGhpcykpO1xyXG5cclxuXHRcdGRlYnVnTGV2ZWwkMSA9IHRoaXMuc2V0dGluZ3MuZGVidWdfbGV2ZWw7XHJcblxyXG5cdFx0RXhjZXB0aW9uSGFuZGxlci5zZXREZWJ1Z0xldmVsID0gZGVidWdMZXZlbCQxO1xyXG5cdFx0XHJcblx0XHRpZiAoZGVidWdMZXZlbCQxID09ICd3YXJuaW5nJyB8fCBkZWJ1Z0xldmVsJDEgPT0gJ2luZm8nKSB7XHJcblx0XHRcdHdpbmRvdy5vbmVycm9yID0gZnVuY3Rpb24oKSB7IHJldHVybiB0cnVlOyB9O1xyXG5cdFx0fVxyXG5cclxuXHRcdGJpbmRDb21wb25lbnRzRGVwZW5kZW5jaWVzLmNhbGwodGhpcywgc2V0dGluZ3MuY29tcG9uZW50cyk7XHJcblxyXG5cdFx0cmV0dXJuIG5ldyBQcm94eSh0aGlzLCB7XHJcblx0XHRcdGdldDogZnVuY3Rpb24odGFyZ2V0LCBzb3VyY2UpIHtcclxuXHRcdFx0XHRpZiAoQ29tbW9uLmluX2FycmF5KHNvdXJjZSwgc2V0dGluZ3MuY29tcG9uZW50cykpIHtcclxuXHRcdFx0XHRcdHJldHVybiB0YXJnZXQuY29udGFpbmVyLm1ha2Uoc291cmNlKTtcclxuXHRcdFx0XHR9IGVsc2UgaWYgKHRhcmdldC5jb250YWluZXIuaW5zdGFuY2VFeGlzdChzb3VyY2UpKSB7XHJcblx0XHRcdFx0XHRyZXR1cm4gdGFyZ2V0LmNvbnRhaW5lci5nZXRJbnN0YW5jZShzb3VyY2UpO1xyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0dGhyb3cgbmV3IENvbXBvbmVudE5vdFJlZ2lzdGVyZWRFeGNlcHRpb24oJ2NvbXBvbmVudHMgbXVzdCBiZSByZWdpc3RlcmVkIGluIG9yZGVyIHRvIHVzZSB0aGVtLicpO1xyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIExvYWRzIHRoZSBleHRlcm5hbCBsaWJyYXJpZXMgd2hpY2ggd2FzIHNwZWNpZmllZC5cclxuXHQgKiBcclxuXHQgKiBAcmV0dXJuIHZvaWRcclxuXHQgKi9cclxuXHRsb2FkRXh0ZXJuYWxMaWJyYXJpZXMoKVxyXG5cdHtcclxuXHRcdGxldCBpO1xyXG5cdFx0bGV0IGxpYnJhcmllcyA9IHRoaXMuc2V0dGluZ3MuaW5qZWN0X2xpYnJhcmllcztcclxuXHJcblx0XHRmb3IgKGkgPSAwOyBpIDwgbGlicmFyaWVzLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdGlmIChleHRlcm5hbExpYnJhcmllcy5oYXNPd25Qcm9wZXJ0eShsaWJyYXJpZXNbaV0pKSB7XHJcblx0XHRcdFx0bGV0IGlkID0gJ1R1cmJvLWVDb21tZXJjZS0nICsgU3RyLnVjZmlyc3QobGlicmFyaWVzW2ldKTtcclxuXHRcdFx0XHRcclxuXHRcdFx0XHRpZiAoISBET00uZmluZChpZCkpIHtcclxuXHRcdFx0XHRcdERPTS5hZGRMaW5rZWRTdHlsZShpZCwgZXh0ZXJuYWxMaWJyYXJpZXNbbGlicmFyaWVzW2ldXSk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBTZXRzIHRoZSBlbGVtZW50IHRvIGJlIGJvdW5kIHRvLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIHN0cmluZyB8IHNlbGVjdG9yXHJcblx0ICogQHJldHVybiB2b2lkXHJcblx0ICovXHJcblx0c2V0RWxlbWVudChzZWxlY3RvcilcclxuXHR7XHJcblx0XHR0aGlzLndyYXBwZXIgPSBET00uZmluZChzZWxlY3Rvcik7XHJcblx0XHRcclxuXHRcdERPTS5hZGRDbGFzcyh0aGlzLndyYXBwZXIsIHRoaXMuc2V0dGluZ3MuY2xhc3MpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQWRkIHRoZSBlQ29tbWVyY2Ugc3R5bGUgdGFncyB0byB0aGUgRE9NLlxyXG5cdCAqXHJcblx0ICogQHJldHVybiB2b2lkXHJcblx0ICovXHJcblx0YWRkU3R5bGVUYWcoKSBcclxuXHR7XHJcblx0XHRpZiAoRE9NLmZpbmQoJyNUdXJib2UtQ29tbWVyY2UnKSkge1xyXG5cdFx0XHRyZXR1cm47XHJcblx0XHR9XHJcblxyXG5cdFx0bGV0IGNzcyA9IGBcclxuXHRcdFx0JHt0aGlzLnNldHRpbmdzLmVsZW1lbnR9IHtcclxuXHRcdFx0XHRwb3NpdGlvbjogcmVsYXRpdmU7XHJcblx0XHRcdFx0Y2xlYXI6IGJvdGg7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdC5sb2FkaW5nLXByb2dyZXNzLWJhciB7XHJcblx0XHRcdFx0cG9zaXRpb246IGZpeGVkO1xyXG5cdFx0XHRcdHRvcDogMDtcclxuXHRcdFx0XHRsZWZ0OiAwO1xyXG5cdFx0XHRcdGhlaWdodDogNXB4O1xyXG5cdFx0XHRcdHdpZHRoOiAxMDAlO1xyXG5cdFx0XHRcdC13ZWJraXQtYm94LXNoYWRvdzogMHB4IDBweCA1cHggMXB4IHJnYmEoMTY4LDE2OCwxNjgsMSk7XHJcblx0XHRcdFx0LW1vei1ib3gtc2hhZG93OiAwcHggMHB4IDVweCAxcHggcmdiYSgxNjgsMTY4LDE2OCwxKTtcclxuXHRcdFx0XHRib3gtc2hhZG93OiAwcHggMHB4IDVweCAxcHggcmdiYSgxNjgsMTY4LDE2OCwxKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0LmxvYWRpbmctcHJvZ3Jlc3MtYmFyID4gLmxvYWRpbmctcHJvZ3Jlc3MtZmlsbCB7XHJcblx0XHRcdFx0d2lkdGg6IDEwMCU7XHJcblx0XHRcdFx0aGVpZ2h0OiAxMDAlO1xyXG5cdFx0XHRcdHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuXHRcdFx0XHRiYWNrZ3JvdW5kLWNvbG9yOiAjOWRkMmZmO1xyXG5cdFx0XHRcdHRyYW5zZm9ybTogdHJhbnNsYXRlWCgtJHtkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50V2lkdGh9cHgpO1xyXG5cdFx0XHR9XHJcblx0XHRgO1xyXG5cdCAgICBcclxuXHQgICAgRE9NLmFkZFN0eWxlKCdUdXJiby1lQ29tbWVyY2UnLCBjc3MpO1xyXG5cdH1cclxufVxyXG5cclxuLyoqXHJcbiAqIEJpbmRzIGNvbXBvbmVudHMgZGVwZW5kZW5jaWVzLlxyXG4gKlxyXG4gKiBAcGFyYW0gb2JqZWN0IHwgY29tcG9uZW50c1xyXG4gKiBAcmV0dXJuIHZvaWRcclxuICovXHJcbmZ1bmN0aW9uIGJpbmRDb21wb25lbnRzRGVwZW5kZW5jaWVzKGNvbXBvbmVudHMpIHtcclxuXHJcblx0dGhpcy5jb250YWluZXIuc2V0SW5zdGFuY2UoJ1JlcXVlc3QnLCBuZXcgUmVxdWVzdCk7XHJcblx0dGhpcy5jb250YWluZXIuc2V0SW5zdGFuY2UoJ0V2ZW50cycsIG5ldyBFdmVudE1hbmFnZXIpO1xyXG5cclxuXHR0aGlzLmNvbnRhaW5lci5iaW5kKCdGaWx0ZXInLCBmdW5jdGlvbihjb250YWluZXIpIHtcclxuXHRcdGxldCBjb21wb25lbnQgPSBuZXcgRmlsdGVyKGNvbnRhaW5lcik7XHJcblx0XHRjb21wb25lbnQuYm9vdGVkID0gdHJ1ZTsgXHJcblx0XHRyZXR1cm4gY29tcG9uZW50O1xyXG5cdH0pO1xyXG5cdFxyXG5cdHRoaXMuY29udGFpbmVyLmJpbmQoJ1NlcnZpY2VzJywgZnVuY3Rpb24oY29udGFpbmVyKSB7IFxyXG5cdFx0bGV0IGNvbXBvbmVudCA9IG5ldyBTZXJ2aWNlcyhjb250YWluZXIpOyBcclxuXHRcdGNvbXBvbmVudC5ib290ZWQgPSB0cnVlO1xyXG5cdFx0cmV0dXJuIGNvbXBvbmVudDtcclxuXHR9KTtcclxuXHJcblx0dGhpcy5jb250YWluZXIuYmluZCgnUHJvZHVjdHMnLCBmdW5jdGlvbihjb250YWluZXIpIHtcclxuXHRcdGxldCBjb21wb25lbnQgPSBuZXcgUHJvZHVjdHMoY29udGFpbmVyLCBjb250YWluZXIuUmVxdWVzdCwgY29udGFpbmVyLkV2ZW50cyk7XHJcblx0XHRjb21wb25lbnQuYm9vdGVkID0gdHJ1ZTtcclxuXHRcdHJldHVybiBjb21wb25lbnQ7XHJcblx0fSk7XHJcblxyXG5cdHRoaXMuY29udGFpbmVyLmJpbmQoJ1BhZ2luYXRpb24nLCBmdW5jdGlvbihjb250YWluZXIpIHtcclxuXHRcdGxldCBjb21wb25lbnQgPSBuZXcgUGFnaW5hdGlvbihjb250YWluZXIsIGNvbnRhaW5lci5tYWtlKCdQcm9kdWN0cycpLCBjb250YWluZXIuRXZlbnRzKTtcclxuXHRcdGNvbXBvbmVudC5ib290ZWQgPSB0cnVlO1xyXG5cdFx0cmV0dXJuIGNvbXBvbmVudDtcclxuXHR9KTtcclxuXHJcblx0dGhpcy5jb250YWluZXIuYmluZCgnQ2FydCcsIGZ1bmN0aW9uKGNvbnRhaW5lcikge1xyXG5cdFx0bGV0IGNvbXBvbmVudCA9IG5ldyBDYXJ0KGNvbnRhaW5lciwgY29udGFpbmVyLlJlcXVlc3QsIGNvbnRhaW5lci5FdmVudHMpO1xyXG5cdFx0Y29tcG9uZW50LmJvb3RlZCA9IHRydWU7XHJcblx0XHRyZXR1cm4gY29tcG9uZW50O1xyXG5cdH0pO1xyXG5cclxuXHR0aGlzLmNvbnRhaW5lci5GaWx0ZXIuYm9vdGVkID0gZmFsc2U7XHJcblx0dGhpcy5jb250YWluZXIuU2VydmljZXMuYm9vdGVkID0gZmFsc2U7XHJcblx0dGhpcy5jb250YWluZXIuUHJvZHVjdHMuYm9vdGVkID0gZmFsc2U7XHJcblx0dGhpcy5jb250YWluZXIuUGFnaW5hdGlvbi5ib290ZWQgPSBmYWxzZTtcclxuXHR0aGlzLmNvbnRhaW5lci5DYXJ0LmJvb3RlZCA9IGZhbHNlO1xyXG59XHJcblxyXG4vKipcclxuICogQXR0YWNoZXMgYSBsb2FkZXIgdG8gdGhlIHRvcCBvZiB0aGUgc2NyZWVuXHJcbiAqIGFuZCBoaWRlcyB0aGUgY29udGVudC5cclxuICogU3RvcHMgYXV0b21hdGljYWxseSBhZnRlciAyMCUgcmVhY2hlZC5cclxuICpcclxuICogQHJldHVybiB2b2lkIFxyXG4gKi9cclxuZnVuY3Rpb24gc3RhcnRMb2FkaW5nKCkge1xyXG5cdGxldCBsb2FkZXIgPSBET00uY3JlYXRlRWxlbWVudCgnZGl2Jywge1xyXG5cdFx0Y2xhc3M6ICdsb2FkaW5nLXByb2dyZXNzLWJhcidcclxuXHR9KTtcclxuXHJcblx0bGV0IGZpbGwgPSBET00uY3JlYXRlRWxlbWVudCgnc3BhbicsIHtcclxuXHRcdGNsYXNzOiAnbG9hZGluZy1wcm9ncmVzcy1maWxsJ1xyXG5cdH0pO1xyXG5cclxuXHRsb2FkZXIuYXBwZW5kQ2hpbGQoZmlsbCk7XHJcblx0ZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChsb2FkZXIpO1xyXG5cclxuXHJcblx0bGV0IHByb2dyZXNzID0gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudFdpZHRoO1xyXG5cdGxldCBtYXhTaXplID0gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudFdpZHRoICogMC44MDtcclxuXHJcblx0d2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZShwcm9ncmVzc0RyYXcpO1xyXG5cclxuXHRsZXQgY29udGVudCA9IHRoaXMud3JhcHBlcjtcclxuXHJcblx0Y29udGVudC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xyXG5cdFxyXG5cdGZ1bmN0aW9uIHByb2dyZXNzRHJhdygpIHtcclxuXHRcdGZpbGwuc3R5bGUudHJhbnNmb3JtID0gJ3RyYW5zbGF0ZVgoLScgKyBwcm9ncmVzcyArICdweCknO1xyXG5cdFx0cHJvZ3Jlc3MgLT0gNztcclxuXHJcblx0XHRpZiAocHJvZ3Jlc3MgPCBtYXhTaXplKSB7XHJcblx0XHRcdGRvbmUoKTtcclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0fVxyXG5cclxuXHRcdHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUocHJvZ3Jlc3NEcmF3KTtcclxuXHR9XHJcblxyXG5cdGZ1bmN0aW9uIGRvbmUoKSB7XHJcblx0XHRmaWxsLnN0eWxlLm9wYWNpdHkgPSBwcm9ncmVzcyAvIDEwMDA7XHJcblx0XHRmaWxsLnN0eWxlLnRyYW5zZm9ybSA9ICd0cmFuc2xhdGVYKC0nICsgcHJvZ3Jlc3MgKyAncHgpJztcclxuXHRcclxuXHRcdHByb2dyZXNzIC09IDE1O1xyXG5cclxuXHRcdGlmIChwcm9ncmVzcyA8PSAwKSB7XHJcblx0XHRcdGNvbnRlbnQuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XHJcblx0XHRcdFxyXG5cdFx0XHRpZiAodHlwZW9mIGxvYWRlciAhPSAndW5kZWZpbmVkJykge1xyXG5cdFx0XHRcdERPTS5yZW1vdmUobG9hZGVyKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0fVxyXG5cclxuXHRcdHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoZG9uZSk7XHJcblx0fVxyXG59XG5cbnJldHVybiBUdXJib0Vjb21tZXJjZTtcblxufSgpKTtcbiJdfQ==
