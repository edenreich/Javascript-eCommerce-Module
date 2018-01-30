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

				EventManager$2.subscribe('cart.products.added', function (attributes) {
					this.openCartPreview();
					this.addItem(attributes);
					this.reloadCartPreview();
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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlR1cmJvRWNvbW1lcmNlLmpzIl0sIm5hbWVzIjpbIlR1cmJvRWNvbW1lcmNlIiwiU3RyIiwic3RyaW5nIiwicmVwbGFjZSIsInRvTG93ZXJDYXNlIiwibGVuZ3RoIiwicG9zc2libGUiLCJpIiwiY2hhckF0IiwiTWF0aCIsImZsb29yIiwicmFuZG9tIiwidG9VcHBlckNhc2UiLCJzbGljZSIsImRlYnVnTGV2ZWwiLCJFeGNlcHRpb25IYW5kbGVyIiwibGV2ZWwiLCJFcnJvciIsImNhcHR1cmVTdGFja1RyYWNlIiwiY29uc3RydWN0b3IiLCJuYW1lIiwiZXJyb3IiLCJtZXNzYWdlIiwiY3VzdG9tQWN0aW9ucyIsImhhbmRsZUVycm9ycyIsImhhbmRsZVdhcm5pbmdzIiwiaGFuZGxlSW5mb3MiLCJjb25zb2xlIiwid2FybiIsImluZm8iLCJkZWZhdWx0TWVzc2FnZSIsIkludmFsaWRBcmd1bWVudEV4Y2VwdGlvbiQxIiwiRE9NIiwiZWxlbWVudCIsImNsYXNzTmFtZSIsIm5ld0NsYXNzTmFtZSIsInJlbW92ZUNsYXNzIiwiYWRkQ2xhc3MiLCJ1bmRlZmluZWQiLCJjbGFzc05hbWVzIiwic3BsaXQiLCJmb3JFYWNoIiwiY2xhc3NMaXN0IiwiYWRkIiwiaW5kZXhPZiIsInJlbW92ZSIsInBhcmVudE5vZGUiLCJyZW1vdmVDaGlsZCIsImlkIiwiY3NzIiwiaGVhZCIsImRvY3VtZW50IiwiZ2V0RWxlbWVudHNCeVRhZ05hbWUiLCJzdHlsZVRhZyIsImNyZWF0ZUVsZW1lbnQiLCJDU1MiLCJtaW5pZnlDc3MiLCJpbm5lckhUTUwiLCJzZXRBdHRyaWJ1dGUiLCJhcHBlbmRDaGlsZCIsInNvdXJjZSIsImxpbmtlZFN0eWxlVGFnIiwiZWxlbWVudFR5cGUiLCJvcHRpb25zIiwib3B0aW9uIiwic2Vjb25kQ2xhc3NOYW1lIiwidG9nZ2xlIiwic2VsZWN0b3IiLCJjb250ZXh0Iiwid2luZG93IiwicXVlcnlFbGVtZW50IiwicGFyZW50RWxlbWVudCIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJoYXNDaGlsZCIsImNoaWxkRWxlbWVudCIsIm5vZGUiLCJDb21tb24iLCJjdXJyZW50T2JqZWN0IiwibmV3T2JqZWN0IiwiZXh0ZW5kZWQiLCJwcm9wIiwiT2JqZWN0IiwicHJvdG90eXBlIiwiaGFzT3duUHJvcGVydHkiLCJjYWxsIiwibmVlZGxlIiwiaHlzdGFjayIsIkFycmF5IiwidG90YWwiLCJzaXplIiwiaXNOYU4iLCJwYXJzZUludCIsImNvbGxlY3Rpb24iLCJjZWlsIiwic3RhcnQiLCJlbmQiLCJwdXNoIiwib2JqZWN0IiwiZGVmYXVsdE1lc3NhZ2UkMSIsIkludmFsaWREYXRhU3RydWN0dXJlRXhjZXB0aW9uIiwiZGVmYXVsdFNldHRpbmdzIiwiaGVhZGVycyIsImFzeW5jIiwiUmVxdWVzdCIsInNldHRpbmdzIiwiZXh0ZW5kIiwic2V0RGVmYXVsdFJlcXVlc3RIZWFkZXIiLCJoZWFkZXIiLCJvcGVuIiwiWE1MSHR0cFJlcXVlc3QiLCJzZXRSZXF1ZXN0SGVhZGVyIiwicmVzcG9uc2UiLCJhcHBseSIsImFyZ3VtZW50cyIsInhociIsImJlZm9yZSIsIlByb21pc2UiLCJyZXNvbHZlIiwicmVqZWN0IiwiZGF0YSIsInVybCIsInJlc3BvbnNlVHlwZSIsImRhdGFUeXBlIiwidGltZW91dCIsIm9ucmVhZHlzdGF0ZWNoYW5nZSIsInJlYWR5U3RhdGUiLCJzdGF0dXMiLCJhZnRlciIsIm9uZXJyb3IiLCJzZW5kIiwicXVlcnlTdHJpbmciLCJrZXlzIiwibWFwIiwia2V5IiwiZW5jb2RlVVJJQ29tcG9uZW50Iiwiam9pbiIsIkFjdGl2ZVhPYmplY3QiLCJyZXNwb25zZVRleHQiLCJKU09OIiwicGFyc2UiLCJkZWZhdWx0TWVzc2FnZSQyIiwiSW52YWxpZEJpbmRpbmdFeGNlcHRpb24iLCJpbnN0YW5jZXMiLCJDb250YWluZXIiLCJjb25jcmV0ZSIsImJpbmQiLCJpbnN0YW5jZSIsImFsaWFzIiwiaW5zdGFuY2VFeGlzdCIsImdldEluc3RhbmNlIiwic2V0SW5zdGFuY2UiLCJkZWZhdWx0TWVzc2FnZSQzIiwiQmFkRXZlbnRDYWxsRXhjZXB0aW9uIiwiRXZlbnRNYW5hZ2VyIiwiZXZlbnRzIiwiY2FsbGJhY2siLCJJbnZhbGlkQXJndW1lbnRFeGNlcHRpb24iLCJDb29raWUiLCJ2YWx1ZSIsImRheXMiLCJzdHJpbmdpZnkiLCJleHBpcmVzIiwiZGF0ZSIsIkRhdGUiLCJzZXRUaW1lIiwiZ2V0VGltZSIsInRvR01UU3RyaW5nIiwiY29va2llIiwiY19zdGFydCIsImNfZW5kIiwidW5lc2NhcGUiLCJzdWJzdHJpbmciLCJkZWZhdWx0U2V0dGluZ3MkMSIsImNvb2tpZV9uYW1lIiwicHJldmlld19jbGFzcyIsImxvYWRlciIsImNsYXNzIiwid2lkdGgiLCJoZWlnaHQiLCJwbGFjZW1lbnQiLCJmaXhlZCIsImhvdmVyX2NvbG9yIiwibm9fY3NzIiwiQ29udGFpbmVyJDIiLCJFdmVudE1hbmFnZXIkMiIsIkh0dHAiLCJsb2FkaW5nT3ZlcmxheSIsIml0ZW1zRGl2IiwiQ2FydCIsImNvbnRhaW5lciIsImh0dHAiLCJldmVudE1hbmFnZXIiLCJwcmV2aWV3RWxlbWVudCIsImNyZWF0ZVByZXZpZXdFbGVtZW50Iiwic3ZnSWNvbiIsImNyZWF0ZUljb24iLCJzZXRFbGVtZW50IiwiYmluZEV2ZW50TGlzdGVuZXJzIiwiYWRkU3R5bGVUYWciLCJpc0VtcHR5IiwiZ2V0Iiwic2V0dXBDYXJ0IiwiY2FydCIsImVtcHR5T2JqZWN0IiwiaXRlbXMiLCJmYXZvcml0ZXMiLCJzZXQiLCJpdGVtIiwicXVhbnRpdHkiLCJ3YXNBZGRlZCIsInNwbGljZSIsInRhYmxlIiwiYXR0cmlidXRlcyIsInRyIiwidGQiLCJhdHRyaWJ1dGUiLCJpbWFnZSIsInNyYyIsImljb24iLCJmaW5kIiwicG9zaXRpb24iLCJhZGRTdHlsZSIsImNyZWF0ZUxvYWRlciIsInByZXZpZXdTdGFydExvYWRpbmciLCJnZXRDYXJ0SXRlbXMiLCJhZGRUb1ByZXZpZXciLCJzZXRUaW1lb3V0IiwicHJldmlld1N0b3BMb2FkaW5nIiwib25jbGljayIsImUiLCJwcmV2ZW50RGVmYXVsdCIsInRvZ2dsZUNhcnRQcmV2aWV3Iiwic3Vic2NyaWJlIiwib3BlbkNhcnRQcmV2aWV3IiwiYWRkSXRlbSIsInJlbG9hZENhcnRQcmV2aWV3IiwiaGFzQ2xhc3MiLCJzd2l0Y2hDbGFzc2VzIiwib3BlbmluZyIsInRvZ2dsZUNsYXNzIiwiY2xvc2UiLCJldmVudCIsInN2ZyIsImNyZWF0ZUVsZW1lbnROUyIsImciLCJwYXRoIiwiY291bnQiLCJncm91cHMiLCJyZWN0YW5nZWxzIiwiYW5pbWF0aW9ucyIsInJvdGF0aW9uIiwiZ3JvdXAiLCJyZWN0YW5nZWwiLCJiZWdpbiIsImFuaW1hdGUiLCJ0b0ZpeGVkIiwiZGVmYXVsdFNldHRpbmdzJDIiLCJDb250YWluZXIkMyIsIkZpbHRlciIsImFkZEV2ZW50TGlzdGVuZXIiLCJ3cmFwcGVyIiwibWluV2lkdGgiLCJtaW5fd2lkdGgiLCJkZWZhdWx0U2V0dGluZ3MkMyIsIml0ZW1fY2xhc3MiLCJhZGRfYnV0dG9uX2NsYXNzIiwiZmF2b3JpdGVfYnV0dG9uX2NsYXNzIiwiQ29udGFpbmVyJDQiLCJFdmVudE1hbmFnZXIkMyIsIkh0dHAkMSIsImNodW5rZWRQcm9kdWN0cyIsIlByb2R1Y3RzIiwidG90YWxJdGVtcyIsImxvYWRQcm9kdWN0cyIsInBhZ2VOdW1iZXIiLCJQYWdpbmF0aW9uIiwiYm9vdGVkIiwicHJvY2Nlc3NpbmciLCJsb2FkUGFnZVByb2R1Y3RzQnlDbGllbnQiLCJsb2FkUGFnZVByb2R1Y3RzQnlTZXJ2ZXIiLCJyZXF1ZXN0IiwiZ2V0UHJvZHVjdHMiLCJ0aGVuIiwicHJvZHVjdHMiLCJjdXJyZW50SXRlbXMiLCJwcm9kdWN0IiwicHVibGlzaCIsInJlcGxhY2VJdGVtcyIsImNhdGNoIiwicGFnZXMiLCJjYWxjdWxhdGVDbGllbnRQYWdlcyIsInRvdGFsX2l0ZW1zIiwicGVyUGFnZSIsInBlcl9wYWdlIiwiYXJyYXlfY2h1bmsiLCJpc0FycmF5IiwiYnVpbGRQcm9kdWN0cyIsImFjdGlvbiIsImF0dHJpYnV0ZXNDb2xsZWN0aW9uIiwidGFnVHlwZSIsImJ1aWx0UHJvZHVjdHMiLCJidWlsdFByb2R1Y3QiLCJidWlsZFByb2R1Y3QiLCJvdmVybGF5IiwiaW5fYXJyYXkiLCJ0YWciLCJrZWJhYkNhc2UiLCJhZGRUb0NhcnQiLCJ0eXBlIiwidGV4dCIsImZhdm9yaXRlIiwibWF4V2lkdGgiLCJtYXhfd2lkdGgiLCJTZXJ2aWNlcyIsImRlZmF1bHRNZXNzYWdlJDQiLCJOb3RJblBhZ2VSYW5nZUV4Y2VwdGlvbiIsImRlZmF1bHRTZXR0aW5ncyQ0IiwiQ29udGFpbmVyJDUiLCJQcm9kdWN0cyQyIiwiRXZlbnRNYW5hZ2VyJDQiLCJzZXRDdXJyZW50IiwidG90YWxQYWdlcyIsImNhbGN1bGF0ZVRvdGFsUGFnZXMiLCJidWlsZFBhZ2luYXRpb24iLCJsaW5rcyIsImNyZWF0ZUxpbmtzIiwicmVwbGFjZUxpbmtzIiwibmV4dCIsImNoaWxkTm9kZXMiLCJyZXF1ZXN0ZWRQYWdlIiwiY3VycmVudCIsIm5vdEluUGFnZVJhbmdlIiwicHJldmlvdXMiLCJnZXRBdHRyaWJ1dGUiLCJjaGFuZ2VVcmwiLCJzZXRBY3RpdmVMaW5rIiwidWwiLCJjcmVhdGVQYWdlTGlua3MiLCJjcmVhdGVQcmV2aW91c0J1dHRvbiIsImNyZWF0ZU5leHRCdXR0b24iLCJwYWdlIiwicGFnZUl0ZW0iLCJsaW5rIiwibGkiLCJzcGFuMSIsInNwYW4yIiwiaGlzdG9yeSIsInJlcGxhY2VTdGF0ZSIsInVwZGF0ZVVSTFBhcmFtZXRlciIsImxvY2F0aW9uIiwiaHJlZiIsInZhcnMiLCJwYXJ0cyIsIm0iLCJwYXJhbSIsInBhcmFtVmFsIiwibmV3QWRkaXRpb25hbFVSTCIsInRlbXBBcnJheSIsImJhc2VVUkwiLCJhZGRpdGlvbmFsVVJMIiwidGVtcCIsInJvd3NUZXh0IiwiZGVmYXVsdE1lc3NhZ2UkNSIsIkNvbXBvbmVudE5vdFJlZ2lzdGVyZWRFeGNlcHRpb24iLCJkZWZhdWx0U2V0dGluZ3MkNSIsImRlYnVnX2xldmVsIiwiaW5qZWN0X2xpYnJhcmllcyIsImNvbXBvbmVudHMiLCJsb2FkaW5nX2FuaW1hdGlvbiIsImV4dGVybmFsTGlicmFyaWVzIiwiYm9vdHN0cmFwIiwiZGVidWdMZXZlbCQxIiwibG9hZEV4dGVybmFsTGlicmFyaWVzIiwic3RhcnRMb2FkaW5nIiwic2V0RGVidWdMZXZlbCIsImJpbmRDb21wb25lbnRzRGVwZW5kZW5jaWVzIiwiUHJveHkiLCJ0YXJnZXQiLCJtYWtlIiwibGlicmFyaWVzIiwidWNmaXJzdCIsImFkZExpbmtlZFN0eWxlIiwiZG9jdW1lbnRFbGVtZW50IiwiY2xpZW50V2lkdGgiLCJjb21wb25lbnQiLCJFdmVudHMiLCJmaWxsIiwiYm9keSIsInByb2dyZXNzIiwibWF4U2l6ZSIsInJlcXVlc3RBbmltYXRpb25GcmFtZSIsInByb2dyZXNzRHJhdyIsImNvbnRlbnQiLCJzdHlsZSIsImRpc3BsYXkiLCJ0cmFuc2Zvcm0iLCJkb25lIiwib3BhY2l0eSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLElBQUlBLGlCQUFrQixZQUFZO0FBQ2xDOztBQUVBOzs7Ozs7OztBQUhrQyxLQVc1QkMsR0FYNEI7QUFBQTtBQUFBO0FBQUE7O0FBQUE7QUFBQTs7QUFhakM7Ozs7OztBQWJpQyw2QkFtQmhCQyxNQW5CZ0IsRUFvQmpDO0FBQ0MsV0FBT0EsT0FBT0MsT0FBUCxDQUFlLGlCQUFmLEVBQWtDLE9BQWxDLEVBQTJDQyxXQUEzQyxFQUFQO0FBQ0E7O0FBRUQ7Ozs7Ozs7QUF4QmlDO0FBQUE7QUFBQSwwQkE4Qm5CQyxNQTlCbUIsRUErQmpDO0FBQ0MsUUFBSUgsU0FBUyxFQUFiO0FBQ0EsUUFBSUksV0FBVyxnRUFBZjs7QUFFQSxTQUFLLElBQUlDLElBQUksQ0FBYixFQUFnQkEsSUFBSUYsTUFBcEIsRUFBNEJFLEdBQTVCLEVBQWlDO0FBQzdCTCxlQUFVSSxTQUFTRSxNQUFULENBQWdCQyxLQUFLQyxLQUFMLENBQVdELEtBQUtFLE1BQUwsS0FBZ0JMLFNBQVNELE1BQXBDLENBQWhCLENBQVY7QUFDSDs7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OztBQUVEdlUsVUFBT2lVLHFCQUFQLENBQTZCQyxZQUE3QjtBQUNBOztBQUVELFdBQVNLLElBQVQsR0FBZ0I7QUFDZlYsUUFBS08sS0FBTCxDQUFXSSxPQUFYLEdBQXFCVCxXQUFXLElBQWhDO0FBQ0FGLFFBQUtPLEtBQUwsQ0FBV0UsU0FBWCxHQUF1QixpQkFBaUJQLFFBQWpCLEdBQTRCLEtBQW5EOztBQUVBQSxlQUFZLEVBQVo7O0FBRUEsT0FBSUEsWUFBWSxDQUFoQixFQUFtQjtBQUNsQkksWUFBUUMsS0FBUixDQUFjQyxPQUFkLEdBQXdCLE9BQXhCOztBQUVBLFFBQUksT0FBTzNOLE1BQVAsSUFBaUIsV0FBckIsRUFBa0M7QUFDakMvSSxTQUFJYSxNQUFKLENBQVdrSSxNQUFYO0FBQ0E7O0FBRUQ7QUFDQTs7QUFFRDFHLFVBQU9pVSxxQkFBUCxDQUE2Qk0sSUFBN0I7QUFDQTtBQUNEOztBQUVELFFBQU81WSxjQUFQO0FBRUMsQ0FqK0ZxQixFQUF0QiIsImZpbGUiOiJUdXJib0Vjb21tZXJjZS5qcyIsInNvdXJjZXNDb250ZW50IjpbInZhciBUdXJib0Vjb21tZXJjZSA9IChmdW5jdGlvbiAoKSB7XG4ndXNlIHN0cmljdCc7XG5cbi8qKlxyXG4gKiBAZmlsZSBcclxuICogU3RyIGNsYXNzLlxyXG4gKlxyXG4gKiBBZGRzIHNvbWUgdXNlZnVsIGZ1bmN0aW9uYWxpdHkgZm9yXHJcbiAqIG1hbmlwdWxhdGluZyBzdHJpbmdzIG9yIGNyZWF0aW5nIHN0cmluZy5cclxuICovXHJcblxyXG5jbGFzcyBTdHJcclxue1xyXG5cdC8qKlxyXG5cdCAqIENvbnZlcnQgY2FtZWxDYXNlIHRvIGtlYmFiLWNhc2UuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gc3RyaW5nIHwgc3RyaW5nXHJcblx0ICogQHJldHVybiBzdHJpbmdcclxuXHQgKi9cclxuXHRzdGF0aWMga2ViYWJDYXNlKHN0cmluZykgXHJcblx0e1xyXG5cdFx0cmV0dXJuIHN0cmluZy5yZXBsYWNlKC8oW2Etel0pKFtBLVpdKS9nLCAnJDEtJDInKS50b0xvd2VyQ2FzZSgpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogR2VuZXJhdGVzIGEgcmFuZG9tIHN0cmluZy5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSBpbnRlZ2VyIHwgbGVuZ3RoXHJcblx0ICogQHJldHVybiBzdHJpbmdcclxuXHQgKi9cclxuXHRzdGF0aWMgcmFuZG9tKGxlbmd0aCkgXHJcblx0e1xyXG5cdFx0bGV0IHN0cmluZyA9ICcnO1xyXG5cdFx0bGV0IHBvc3NpYmxlID0gXCJBQkNERUZHSElKS0xNTk9QUVJTVFVWV1hZWmFiY2RlZmdoaWprbG1ub3BxcnN0dXZ3eHl6MDEyMzQ1Njc4OVwiO1xyXG5cclxuXHRcdGZvciAobGV0IGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcclxuXHQgICAgXHRzdHJpbmcgKz0gcG9zc2libGUuY2hhckF0KE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIHBvc3NpYmxlLmxlbmd0aCkpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiBzdHJpbmc7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBDaGFuZ2VzIHRoZSBmaXJzdCBsZXR0ZXIgXHJcblx0ICogb2YgdGhlIHN0cmluZyB0byB1cHBlcmNhc2UuXHJcblx0ICogXHJcblx0ICogQHBhcmFtIHN0cmluZyB8IHN0cmluZ1xyXG5cdCAqIEByZXR1cm4gc3RyaW5nXHJcblx0ICovXHJcblx0c3RhdGljIHVjZmlyc3Qoc3RyaW5nKSBcclxuXHR7XHJcblx0ICAgIHJldHVybiBzdHJpbmcuY2hhckF0KDApLnRvVXBwZXJDYXNlKCkgKyBzdHJpbmcuc2xpY2UoMSk7XHJcblx0fVxyXG59XG5cbi8qKlxyXG4gKiBTdG9yZXMgdGhlIGRlYnVnIGxldmVsLlxyXG4gKlxyXG4gKiBAdmFyIHN0cmluZyBcclxuICovXHJcbmxldCBkZWJ1Z0xldmVsO1xyXG5cclxuY2xhc3MgRXhjZXB0aW9uSGFuZGxlclxyXG57XHJcblx0LyoqXHJcblx0ICogU2V0dGVyIGZvciB0aGUgZGVidWcgbGV2ZWwuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gc3RyaW5nIHwgbGV2ZWxcclxuXHQgKiBAcmV0dXJuIHZvaWRcclxuXHQgKi9cclxuXHRzdGF0aWMgc2V0IHNldERlYnVnTGV2ZWwobGV2ZWwpXHJcblx0e1xyXG5cdFx0ZGVidWdMZXZlbCA9IGxldmVsO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogRXh0ZW5kZWQgY29uc3RydWN0b3IsIGNhcHR1cmVzIHRoZVxyXG5cdCAqIHN0YWNrIHRyYWNlLlxyXG5cdCAqXHJcblx0ICogQHJldHVybiB2b2lkXHJcblx0ICovXHJcblx0Y29uc3RydWN0b3IoKVxyXG5cdHtcclxuXHRcdGlmIChFcnJvci5jYXB0dXJlU3RhY2tUcmFjZSkge1xyXG5cdFx0XHRFcnJvci5jYXB0dXJlU3RhY2tUcmFjZSh0aGlzLCB0aGlzLmNvbnN0cnVjdG9yLm5hbWUpO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogSGFuZGxlcyBhbGwgZXhjZXB0aW9ucy5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSBvYmplY3QgfCBlcnJvciB8IFRocm93ZW4gRXhjZXB0aW9uIE9iamVjdFxyXG5cdCAqIEBwYXJhbSBzdHJpbmcgfCBtZXNzYWdlXHJcblx0ICogQHJldHVybiB2b2lkXHJcblx0ICovXHJcblx0c3RhY2tUcmFjZShlcnJvciwgbWVzc2FnZSkgXHJcblx0e1xyXG5cdFx0dGhpcy5jdXN0b21BY3Rpb25zKGVycm9yLCBtZXNzYWdlKTtcclxuXHJcblx0XHRzd2l0Y2goZGVidWdMZXZlbClcclxuXHRcdHtcclxuXHRcdFx0Y2FzZSAnZXJyb3InOiB0aGlzLmhhbmRsZUVycm9ycyhlcnJvciwgbWVzc2FnZSk7IGJyZWFrO1xyXG5cdFx0XHRjYXNlICd3YXJuaW5nJzogdGhpcy5oYW5kbGVXYXJuaW5ncyhlcnJvciwgbWVzc2FnZSk7IGJyZWFrO1xyXG5cdFx0XHRjYXNlICdpbmZvJzogdGhpcy5oYW5kbGVJbmZvcyhlcnJvciwgbWVzc2FnZSk7IGJyZWFrO1xyXG5cdFx0XHRkZWZhdWx0OiB0aGlzLmhhbmRsZUluZm9zKGVycm9yLCBtZXNzYWdlKTsgYnJlYWs7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBUYWtlIGFjdGlvbiBmb3Igc3BlY2lmaWMgRXhjZXB0aW9ucy5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSBvYmplY3QgfCBlcnJvciB8IFRocm93ZW4gRXhjZXB0aW9uIE9iamVjdFxyXG5cdCAqIEBwYXJhbSBzdHJpbmcgfCBtZXNzYWdlXHJcblx0ICogQHJldHVybiBib29sXHJcblx0ICovXHJcblx0Y3VzdG9tQWN0aW9ucyhlcnJvciwgbWVzc2FnZSlcclxuXHR7XHJcblx0XHRpZiAoZXJyb3IuY29uc3RydWN0b3IubmFtZSA9PSAnSW52YWxpZEFyZ3VtZW50RXhjZXB0aW9uJykge1xyXG5cdFx0XHQvLyBoYW5kbGVcclxuXHRcdH0gZWxzZSBpZiAoZXJyb3IuY29uc3RydWN0b3IubmFtZSA9PSAnSW52YWxpZEJpbmRpbmdFeGNlcHRpb24nKSB7XHJcblx0XHRcdC8vIGhhbmRsZVxyXG5cdFx0fSBlbHNlIGlmIChlcnJvci5jb25zdHJ1Y3Rvci5uYW1lID09ICdCYWRFdmVudENhbGxFeGNlcHRpb24nKSB7XHJcblx0XHRcdC8vIGhhbmRsZVxyXG5cdFx0fSBlbHNlIGlmIChlcnJvci5jb25zdHJ1Y3Rvci5uYW1lID09ICdDb21wb25lbnRzRXhjZXB0aW9uJykge1xyXG5cdFx0XHQvLyBoYW5kbGVcclxuXHRcdH0gZWxzZSBpZiAoZXJyb3IuY29uc3RydWN0b3IubmFtZSA9PSAnQ29tcG9uZW50Tm90UmVnaXN0ZXJlZEV4Y2VwdGlvbicpIHtcclxuXHRcdFx0Ly8gaGFuZGxlXHJcblx0XHR9IGVsc2UgaWYgKGVycm9yLmNvbnN0cnVjdG9yLm5hbWUgPT0gJ05vdEluUGFnZVJhbmdlRXhjZXB0aW9uJykge1xyXG5cdFx0XHQvLyBoYW5kbGVcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gZmFsc2U7XHJcblx0fVxyXG5cclxuXHRoYW5kbGVFcnJvcnMoZXJyb3IsIG1lc3NhZ2UpXHJcblx0e1xyXG5cdFx0Y29uc29sZS5lcnJvcihlcnJvci5jb25zdHJ1Y3Rvci5uYW1lICsgJzogJyArIG1lc3NhZ2UpO1xyXG5cdH1cclxuXHJcblx0aGFuZGxlV2FybmluZ3MoZXJyb3IsIG1lc3NhZ2UpXHJcblx0e1xyXG5cdFx0Y29uc29sZS53YXJuKGVycm9yLmNvbnN0cnVjdG9yLm5hbWUgKyAnOiAnICsgbWVzc2FnZSk7XHJcblx0fVxyXG5cclxuXHRoYW5kbGVJbmZvcyhlcnJvciwgbWVzc2FnZSlcclxuXHR7XHJcblx0XHRjb25zb2xlLmluZm8oZXJyb3IuY29uc3RydWN0b3IubmFtZSArICc6ICcgKyBtZXNzYWdlKTtcclxuXHR9XHJcbn1cblxubGV0IGRlZmF1bHRNZXNzYWdlID0gJ2FuIGludmFsaWQgYXJndW1lbnQgd2FzIHBhc3NlZC4nO1xyXG5cclxuY2xhc3MgSW52YWxpZEFyZ3VtZW50RXhjZXB0aW9uJDEgZXh0ZW5kcyBFeGNlcHRpb25IYW5kbGVyXHJcbntcclxuXHRjb25zdHJ1Y3RvcihtZXNzYWdlID0gbnVsbCkgXHJcblx0e1xyXG5cdFx0bWVzc2FnZSA9IG1lc3NhZ2UgfHwgZGVmYXVsdE1lc3NhZ2U7XHJcblx0XHRzdXBlcihtZXNzYWdlKTtcclxuICAgIFx0c3VwZXIuc3RhY2tUcmFjZSh0aGlzLCBtZXNzYWdlKTtcclxuICAgIH1cclxufVxuXG4vKipcclxuICogQGZpbGUgXHJcbiAqIERPTSBjbGFzcy5cclxuICpcclxuICogQWRkcyBzb21lIHVzZWZ1bCBmdW5jdGlvbmFsaXR5IGZvclxyXG4gKiBmZXRjaGluZyBvciBtYW5pcHVsYXRpbmcgRE9NIGVsZW1lbnRzLlxyXG4gKi9cclxuXHJcbmNsYXNzIERPTVxyXG57XHJcblx0LyoqXHJcblx0ICogTWluaWZpZXMgdGhlIGNzcyB0ZXh0LlxyXG5cdCAqIFxyXG5cdCAqIEBwYXJhbSBzdHJpbmcgfCBzdHJpbmdcclxuXHQgKiBAcmV0dXJuIHN0cmluZ1xyXG5cdCAqL1xyXG5cdHN0YXRpYyBtaW5pZnlDc3Moc3RyaW5nKSBcclxuXHR7XHJcblx0ICAgIHN0cmluZyA9IHN0cmluZy5yZXBsYWNlKC9cXC9cXCooPzooPyFcXCpcXC8pW1xcc1xcU10pKlxcKlxcL3xbXFxyXFxuXFx0XSsvZywgJycpO1xyXG5cdCAgICBzdHJpbmcgPSBzdHJpbmcucmVwbGFjZSgvIHsyLH0vZywgJyAnKTtcclxuXHQgICAgc3RyaW5nID0gc3RyaW5nLnJlcGxhY2UoLyhbezp9XSkvZywgJyQxJyk7XHJcblx0ICAgIHN0cmluZyA9IHN0cmluZy5yZXBsYWNlKC8oWzssXSkgL2csICckMScpO1xyXG5cdCAgICBzdHJpbmcgPSBzdHJpbmcucmVwbGFjZSgvICEvZywgJyEnKTtcclxuXHQgICAgXHJcblx0ICAgIHJldHVybiBzdHJpbmc7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBTd2l0Y2hlcyBiZXR3ZWVuIHR3byBnaXZlbiBjbGFzc2VzLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIG9iamVjdCB8IGVsZW1lbnRcclxuXHQgKiBAcGFyYW0gc3RyaW5nIHwgY2xhc3NOYW1lXHJcblx0ICogQHBhcmFtIHN0cmluZyB8IG5ld0NsYXNzTmFtZVxyXG5cdCAqIEByZXR1cm4gb2JqZWN0XHJcblx0ICovXHJcblx0c3RhdGljIHN3aXRjaENsYXNzZXMoZWxlbWVudCwgY2xhc3NOYW1lLCBuZXdDbGFzc05hbWUpIFxyXG5cdHtcclxuXHRcdHRoaXMucmVtb3ZlQ2xhc3MoZWxlbWVudCwgY2xhc3NOYW1lKTtcclxuXHRcdHRoaXMuYWRkQ2xhc3MoZWxlbWVudCwgbmV3Q2xhc3NOYW1lKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEFkZHMgY2xhc3MgdG8gYSBnaXZlbiBlbGVtZW50LlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIG9iamVjdCB8IGVsZW1lbnRcclxuXHQgKiBAcGFyYW0gc3RyaW5nIHwgY2xhc3NOYW1lXHJcblx0ICogQHJldHVybiBvYmplY3RcclxuXHQgKi9cclxuXHRzdGF0aWMgYWRkQ2xhc3MoZWxlbWVudCwgY2xhc3NOYW1lKSBcclxuXHR7XHJcblx0XHRpZihlbGVtZW50ID09PSBudWxsKSB7XHJcblx0XHRcdHRocm93IG5ldyBJbnZhbGlkQXJndW1lbnRFeGNlcHRpb24kMTtcclxuXHRcdH1cclxuXHJcblx0XHRpZighIGNsYXNzTmFtZSB8fCBjbGFzc05hbWUgPT0gJycgfHwgdHlwZW9mIGNsYXNzTmFtZSA9PT0gdW5kZWZpbmVkKSB7XHJcblx0XHRcdHJldHVybiBlbGVtZW50O1xyXG5cdFx0fVxyXG5cclxuXHRcdGxldCBjbGFzc05hbWVzID0gY2xhc3NOYW1lLnNwbGl0KCcgJyk7XHJcblxyXG5cdFx0Y2xhc3NOYW1lcy5mb3JFYWNoKGZ1bmN0aW9uKG5hbWUpIHtcclxuXHRcdFx0ZWxlbWVudC5jbGFzc0xpc3QuYWRkKG5hbWUpO1xyXG5cdFx0fSk7XHJcblx0XHRcclxuXHRcdHJldHVybiBlbGVtZW50O1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQ2hlY2tzIGlmIGFuIGVsZW1lbnQgaGFzIGEgY2xhc3MuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gSFRNTEVsZW1lbnQgfCBlbGVtZW50XHJcblx0ICogQHBhcmFtIHN0cmluZyB8IGNsYXNzTmFtZVxyXG5cdCAqIEByZXR1cm4gYm9vbFxyXG5cdCAqL1xyXG5cdHN0YXRpYyBoYXNDbGFzcyhlbGVtZW50LCBjbGFzc05hbWUpXHJcblx0e1xyXG5cdFx0aWYgKGVsZW1lbnQgPT09IG51bGwpIHtcclxuXHRcdFx0dGhyb3cgbmV3IEludmFsaWRBcmd1bWVudEV4Y2VwdGlvbiQxKCdoYXNDbGFzcygpIGV4cGVjdHMgdGhlIGZpcnN0IGFyZ3VtZW50IHRvIGJlIGFuIEhUTUxFbGVtZW50IGJ1dCBudWxsIHdhcyBwYXNzZWQuJyk7XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKCEgY2xhc3NOYW1lIHx8IGNsYXNzTmFtZSA9PSAnJyB8fCB0eXBlb2YgY2xhc3NOYW1lID09ICd1bmRlZmluZWQnKSB7XHJcblx0XHRcdHJldHVybjtcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gZWxlbWVudC5jbGFzc05hbWUuaW5kZXhPZihjbGFzc05hbWUpICE9IC0xO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogUmVtb3ZlcyBjbGFzcyBmcm9tIGEgZ2l2ZW4gZWxlbWVudC5cclxuXHQgKiBcclxuXHQgKiBAcGFyYW0gb2JqZWN0IHwgZWxlbWVudFxyXG5cdCAqIEBwYXJhbSBzdHJpbmcgfCBjbGFzc05hbWVcclxuXHQgKiBAcmV0dXJuIG9iamVjdFxyXG5cdCAqL1xyXG5cdHN0YXRpYyByZW1vdmVDbGFzcyhlbGVtZW50LCBjbGFzc05hbWUpIFxyXG5cdHtcclxuXHRcdGlmKGVsZW1lbnQgPT0gbnVsbCkge1xyXG5cdFx0XHR0aHJvdyBuZXcgSW52YWxpZEFyZ3VtZW50RXhjZXB0aW9uJDE7XHJcblx0XHR9XHJcblxyXG5cdFx0aWYoY2xhc3NOYW1lID09ICcnKSB7XHJcblx0XHRcdGVsZW1lbnQuY2xhc3NOYW1lID0gJyc7XHJcblx0XHR9IGVsc2Uge1xyXG5cclxuXHRcdFx0bGV0IGNsYXNzTmFtZXMgPSBjbGFzc05hbWUuc3BsaXQoJyAnKTtcclxuXHJcblx0XHRcdGNsYXNzTmFtZXMuZm9yRWFjaChmdW5jdGlvbihuYW1lKSB7XHJcblx0XHRcdFx0ZWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKG5hbWUpO1xyXG5cdFx0XHR9KTtcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gZWxlbWVudDtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFJlbW92ZXMgYW4gZWxlbWVudCBmcm9tIHRoZSBET00uXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gSFRNTEVsZW1lbnRcclxuXHQgKiBAcmV0dXJuIHZvaWRcclxuXHQgKi9cclxuXHRzdGF0aWMgcmVtb3ZlKGVsZW1lbnQpXHJcblx0e1xyXG5cdFx0ZWxlbWVudC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKGVsZW1lbnQpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQWRkcyBzdHlsZSB0YWcgd2l0aCBnaXZlbiBpZCBhbmQgY3NzIHRvIHRoZSBET00uXHJcblx0ICogXHJcblx0ICogQHBhcmFtIHN0cmluZyB8IGlkXHJcblx0ICogQHBhcmFtIHN0cmluZyB8IGNzc1xyXG5cdCAqIEByZXR1cm4gdm9pZFxyXG5cdCAqL1xyXG5cdHN0YXRpYyBhZGRTdHlsZShpZCwgY3NzKVxyXG5cdHtcclxuXHRcdGlmICh0eXBlb2YgY3NzICE9ICdzdHJpbmcnKSB7XHJcblx0XHRcdHRocm93IG5ldyBJbnZhbGlkQXJndW1lbnRFeGNlcHRpb24kMTtcclxuXHRcdH1cclxuXHJcblx0XHRsZXQgaGVhZCA9IGRvY3VtZW50LmhlYWQgfHwgZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2hlYWQnKVswXTtcclxuXHRcdGxldCBzdHlsZVRhZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3N0eWxlJyk7XHJcblxyXG5cdFx0Ly8gcGlwZSBpdCB0aHJvdWdoIHRoZSBtaW5maWVyXHJcblx0ICAgIGxldCBDU1MgPSB0aGlzLm1pbmlmeUNzcyhjc3MpO1xyXG5cdCAgICAvLyBhZGRpbmcgaXQgdG8gdGhlIHN0eWxldGFnXHJcblx0ICAgIHN0eWxlVGFnLmlubmVySFRNTCA9IENTUztcclxuXHQgICAgLy8gZ2l2ZSBhbiBpZCB0byByZWNvZ25pemUgdGhlIHN0eWxlIHRhZ1xyXG5cdFx0c3R5bGVUYWcuc2V0QXR0cmlidXRlKCdpZCcsIGlkKTtcclxuXHRcdC8vIGFwcGVuZGluZyB0aGF0IHN0eWxlIHRhZyB0byB0aGUgRE9NIGhlYWQgdGFnXHJcblx0XHRoZWFkLmFwcGVuZENoaWxkKHN0eWxlVGFnKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEFkZHMgbGlua2VkIHN0eWxlIHRhZyB3aXRoIGdpdmVuIGlkIGFuZCBzcmMgdG8gdGhlIERPTS5cclxuXHQgKiBcclxuXHQgKiBAcGFyYW0gc3RyaW5nIHwgaWRcclxuXHQgKiBAcGFyYW0gc3RyaW5nIHwgc291cmNlXHJcblx0ICogQHJldHVybiB2b2lkXHJcblx0ICovXHJcblx0c3RhdGljIGFkZExpbmtlZFN0eWxlKGlkLCBzb3VyY2UpIFxyXG5cdHtcclxuXHRcdGlmICh0eXBlb2Ygc291cmNlICE9ICdzdHJpbmcnKSB7XHJcblx0XHRcdHRocm93IG5ldyBJbnZhbGlkQXJndW1lbnRFeGNlcHRpb24kMSgnRE9NLmFkZExpbmtlZFN0eWxlKCkgZXhjcGVjdHMgdGhlIHNlY29uZCBwYXJhbWV0ZXIgdG8gYmUgc3RyaW5nLCBidXQgJyArIHR5cGVvZiBzb3VyY2UgKyAnIHdhcyBwYXNzZWQgaW5zdGVhZC4nKTtcclxuXHRcdH1cclxuXHJcblx0XHRsZXQgaGVhZCA9IGRvY3VtZW50LmhlYWQgfHwgZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2hlYWQnKVswXTtcclxuXHRcdGxldCBsaW5rZWRTdHlsZVRhZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpbmsnKTtcclxuXHJcblx0ICAgIC8vIGdpdmUgYW4gaWQgdG8gcmVjb2duaXplIHRoZSBzdHlsZSB0YWdcclxuXHRcdGxpbmtlZFN0eWxlVGFnLnNldEF0dHJpYnV0ZSgnaWQnLCBpZCk7XHJcblx0XHRsaW5rZWRTdHlsZVRhZy5zZXRBdHRyaWJ1dGUoJ2hyZWYnLCBzb3VyY2UpO1xyXG5cdFx0bGlua2VkU3R5bGVUYWcuc2V0QXR0cmlidXRlKCdyZWwnLCAnc3R5bGVzaGVldCcpO1xyXG5cdFx0bGlua2VkU3R5bGVUYWcuc2V0QXR0cmlidXRlKCd0eXBlJywgJ3RleHQvY3NzJyk7XHJcblx0XHQvLyBhcHBlbmRpbmcgdGhhdCBzdHlsZSB0YWcgdG8gdGhlIERPTSBoZWFkIHRhZ1xyXG5cdFx0aGVhZC5hcHBlbmRDaGlsZChsaW5rZWRTdHlsZVRhZyk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBDcmVhdGVzIGFuIGVsZW1lbnQgd2l0aCB0aGUgZ2l2ZW4gb3B0aW9ucy5cclxuXHQgKiBcclxuXHQgKiBAcGFyYW0gc3RyaW5nIHwgZWxlbWVudFR5cGVcclxuXHQgKiBAcGFyYW0gb2JqZWN0IHwgb3B0aW9uc1xyXG5cdCAqIEByZXR1cm4gSFRNTEVsZW1lbnRcclxuXHQgKi9cclxuXHRzdGF0aWMgY3JlYXRlRWxlbWVudChlbGVtZW50VHlwZSwgb3B0aW9ucylcclxuXHR7XHJcblx0XHRsZXQgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoZWxlbWVudFR5cGUpO1xyXG5cdFxyXG5cdFx0aWYgKG9wdGlvbnMgPT09IHVuZGVmaW5lZCkge1xyXG5cdFx0XHRyZXR1cm4gZWxlbWVudDtcclxuXHRcdH1cclxuXHJcblx0XHRmb3IgKGxldCBvcHRpb24gaW4gb3B0aW9ucykge1xyXG5cdFx0XHRpZihvcHRpb24gPT0gJ3RleHQnKSB7XHJcblx0XHRcdFx0ZWxlbWVudC5pbm5lckhUTUwgPSBvcHRpb25zW29wdGlvbl07XHJcblx0XHRcdFx0Y29udGludWU7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGVsZW1lbnQuc2V0QXR0cmlidXRlKG9wdGlvbiwgb3B0aW9uc1tvcHRpb25dKTtcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gZWxlbWVudDtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFRvZ2dsZXMgdGhlIGdpdmVuIGNsYXNzZXMuXHJcblx0ICogXHJcblx0ICogQHBhcmFtIG9iamVjdCB8IGVsZW1lbnRcclxuXHQgKiBAcGFyYW0gc3RyaW5nIHwgY2xhc3NOYW1lXHJcblx0ICogQHJldHVybiBib29sXHJcblx0ICovXHJcblx0c3RhdGljIHRvZ2dsZUNsYXNzKGVsZW1lbnQsIGNsYXNzTmFtZSwgc2Vjb25kQ2xhc3NOYW1lKVxyXG5cdHtcclxuXHRcdGlmIChlbGVtZW50ID09IG51bGwgfHwgdHlwZW9mIGVsZW1lbnQgPT0gJ3VuZGVmaW5lZCcpIHtcclxuXHRcdFx0dGhyb3cgbmV3IEludmFsaWRBcmd1bWVudEV4Y2VwdGlvbiQxO1xyXG5cdFx0fVxyXG5cclxuXHRcdHNlY29uZENsYXNzTmFtZSA9IHNlY29uZENsYXNzTmFtZSB8fCB1bmRlZmluZWQ7XHJcblxyXG5cdFx0aWYoc2Vjb25kQ2xhc3NOYW1lKSB7XHJcblx0XHRcdGVsZW1lbnQuY2xhc3NMaXN0LnRvZ2dsZShzZWNvbmRDbGFzc05hbWUpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiBlbGVtZW50LmNsYXNzTGlzdC50b2dnbGUoY2xhc3NOYW1lKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEZpbmRzIGFuIGVsZW1lbnQgaW5zaWRlIG9mIHBhcmVudC5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSBzdHJpbmcgfCBzZWxlY3RvclxyXG5cdCAqIEBwYXJhbSBvYmplY3QgfCBjb250ZXh0XHJcblx0ICogQHJldHVybiBtaXhlZFxyXG5cdCAqL1xyXG5cdHN0YXRpYyBmaW5kKHNlbGVjdG9yLCBjb250ZXh0ID0gd2luZG93LmRvY3VtZW50KSBcclxuXHR7XHJcblx0XHRyZXR1cm4gcXVlcnlFbGVtZW50KHNlbGVjdG9yLCBjb250ZXh0KTtcclxuXHR9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBRdWVyaWVzIGFuIGVsZW1lbnQgZnJvbSB0aGUgRE9NLlxyXG4gKlxyXG4gKiBAcGFyYW0gc3RyaW5nIHwgc2VsZWN0b3JcclxuICogQHBhcmFtIG9iamVjdCB8IHBhcmVudEVsZW1lbnRcclxuICogQHJldHVybiBtaXhlZFxyXG4gKi9cclxuZnVuY3Rpb24gcXVlcnlFbGVtZW50KHNlbGVjdG9yLCBwYXJlbnRFbGVtZW50KSBcclxue1xyXG5cdGlmICh0eXBlb2Ygc2VsZWN0b3IgIT0gJ3N0cmluZycpIHtcclxuXHRcdHRocm93IG5ldyBJbnZhbGlkQXJndW1lbnRFeGNlcHRpb24kMSgncXVlcnlFbGVtZW50KCkgZXhwZWN0cyBmaXJzdCBwYXJhbWV0ZXIgdG8gYmUgYSBzdHJpbmcsIGJ1dCAnICsgdHlwZW9mIHNlbGVjdG9yICsgJyB3YXMgcGFzc2VkIGluc3RlYWQuJyk7XHJcblx0fVxyXG5cclxuXHRsZXQgZWxlbWVudCA9IHBhcmVudEVsZW1lbnQucXVlcnlTZWxlY3RvckFsbChzZWxlY3Rvcik7XHJcblxyXG5cdGlmIChlbGVtZW50Lmxlbmd0aCA9PSAwKSB7XHJcblx0XHRyZXR1cm4gbnVsbDtcclxuXHR9XHJcblxyXG5cdHJldHVybiAoZWxlbWVudC5sZW5ndGggPiAxKSA/IGVsZW1lbnQgOiBlbGVtZW50WzBdO1xyXG59XHJcblxyXG4vKipcclxuICogQ2hlY2tzIGlmIHBhcmVudCBoYXMgY2hpbGQuXHJcbiAqXHJcbiAqIEBwYXJhbSBvYmplY3QgfCBwYXJlbnRFbGVtZW50XHJcbiAqIEBwYXJhbSBvYmplY3QgfCBjaGlsZEVsZW1lbnRcclxuICogQHJldHVybiBib29sXHJcbiAqL1xyXG5mdW5jdGlvbiBoYXNDaGlsZChwYXJlbnRFbGVtZW50LCBjaGlsZEVsZW1lbnQpIFxyXG57XHJcbiAgICAgbGV0IG5vZGUgPSBjaGlsZEVsZW1lbnQucGFyZW50Tm9kZTtcclxuICAgICBcclxuICAgICB3aGlsZSAobm9kZSAhPSBudWxsKSB7XHJcbiAgICAgICAgIGlmIChub2RlID09IHBhcmVudEVsZW1lbnQpIHtcclxuICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICB9XHJcbiAgICAgICAgIG5vZGUgPSBub2RlLnBhcmVudE5vZGU7XHJcbiAgICAgfVxyXG4gICAgIFxyXG4gICAgIHJldHVybiBmYWxzZTtcclxufVxuXG4vKipcclxuICogQGZpbGUgXHJcbiAqIENvbW1vbiBjbGFzcy5cclxuICpcclxuICogQWRkcyBzb21lIHVzZWZ1bCBmdW5jdGlvbmFsaXR5IGZvclxyXG4gKiBjb21tb24gdGFza3MgLSBkYXRhIGNoZWNrcyBvciBkYXRhIG1hbmlwdWxhdGlvbi5cclxuICovXHJcblxyXG5jbGFzcyBDb21tb25cclxue1xyXG5cdC8qKlxyXG5cdCAqIEV4dGVuZCBhbiBvYmplY3QuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gb2JqZWN0IHwgY3VycmVudE9iamVjdFxyXG5cdCAqIEBwYXJhbSBvYmplY3QgfCBuZXdPYmplY3RcclxuXHQgKiBAcmV0dXJuIG9iamVjdFxyXG5cdCAqL1xyXG5cdHN0YXRpYyBleHRlbmQoY3VycmVudE9iamVjdCwgbmV3T2JqZWN0KSB7XHJcblx0XHR2YXIgZXh0ZW5kZWQgPSB7fTtcclxuXHQgICAgdmFyIHByb3A7XHJcblxyXG5cdCAgICBmb3IgKHByb3AgaW4gY3VycmVudE9iamVjdCkge1xyXG5cdCAgICAgICAgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChjdXJyZW50T2JqZWN0LCBwcm9wKSkge1xyXG5cdCAgICAgICAgICAgIGV4dGVuZGVkW3Byb3BdID0gY3VycmVudE9iamVjdFtwcm9wXTtcclxuXHQgICAgICAgIH1cclxuXHQgICAgfVxyXG5cclxuXHQgICAgZm9yIChwcm9wIGluIG5ld09iamVjdCkge1xyXG5cdCAgICAgICAgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChuZXdPYmplY3QsIHByb3ApKSB7XHJcblx0ICAgICAgICAgICAgZXh0ZW5kZWRbcHJvcF0gPSBuZXdPYmplY3RbcHJvcF07XHJcblx0ICAgICAgICB9XHJcblx0ICAgIH1cclxuXHJcblx0ICAgIHJldHVybiBleHRlbmRlZDtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIENoZWNrcyBmb3IgYSBuZWVkbGUgaW4gaHlzdGFjayBhcnJheS5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSBtaXhlZCB8IG5lZWRsZVxyXG5cdCAqIEBwYXJhbSBvYmplY3QgfCBvYmplY3RcclxuXHQgKiBAcmV0dXJuIGJvb2xcclxuXHQgKlxyXG5cdCAqL1xyXG5cdHN0YXRpYyBpbl9hcnJheShuZWVkbGUsIGh5c3RhY2spIHtcclxuXHRcdGlmKGh5c3RhY2suY29uc3RydWN0b3IgIT09IEFycmF5KSB7XHJcblx0XHRcdHRocm93IG5ldyBJbnZhbGlkQXJndW1lbnRFeGNlcHRpb24kMTtcclxuXHRcdH1cclxuXHJcblx0XHRmb3IodmFyIGkgPSAwOyBpIDw9IGh5c3RhY2subGVuZ3RoOyBpKyspIHtcclxuXHRcdFx0aWYobmVlZGxlID09IGh5c3RhY2tbaV0pIHtcclxuXHRcdFx0XHRyZXR1cm4gdHJ1ZTtcdFxyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0XHJcblx0XHRyZXR1cm4gZmFsc2U7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBUYWtlcyBhbiBhcnJheSBhbmQgY2h1bmtzIGl0LlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIGFycmF5IHwgdG90YWxcclxuXHQgKiBAcGFyYW0gbnVtYmVyIHwgY2h1bmtzXHJcblx0ICogQHJldHVybiBhcnJheVxyXG5cdCAqL1xyXG5cdHN0YXRpYyBhcnJheV9jaHVuayh0b3RhbCwgc2l6ZSA9IDUpXHJcblx0eyAgICAgICAgXHJcbiAgICAgIFx0aWYgKGlzTmFOKHNpemUpKSB7XHJcbiAgICAgIFx0XHR0aHJvdyBuZXcgSW52YWxpZEFyZ3VtZW50RXhjZXB0aW9uJDEoJ0NvbW1vbi5hcnJheV9jaHVuaygpIGV4cGVjdHMgdGhlIHNlY29uZCBwYXJhbWV0ZXIgdG8gYmUgYSBudW1iZXIsIGJ1dCAnICsgdHlwZW9mIHNpemUgKyAnIHBhc3NlZCBpbnN0ZWFkLicpXHJcbiAgICAgIFx0fVxyXG5cclxuICAgICAgXHRzaXplID0gcGFyc2VJbnQoc2l6ZSk7XHJcbiAgICAgICBcclxuICAgICAgIFx0bGV0IGk7XHJcbiAgICAgICBcdGxldCBjb2xsZWN0aW9uID0gW107XHJcblxyXG4gICAgICAgIC8vIGFkZCBlYWNoIGNodW5rIHRvIHRoZSByZXN1bHRcclxuICAgICAgICBmb3IgKGkgPSAwOyBpIDwgTWF0aC5jZWlsKHRvdGFsLmxlbmd0aCAvIHNpemUpOyBpKyspIHtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHZhciBzdGFydCA9IGkgKiBzaXplO1xyXG4gICAgICAgICAgICB2YXIgZW5kID0gc3RhcnQgKyBzaXplO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgY29sbGVjdGlvbi5wdXNoKHRvdGFsLnNsaWNlKHN0YXJ0LCBlbmQpKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIHJldHVybiBjb2xsZWN0aW9uO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQ2hlY2tzIGlmIGFuIG9iamVjdCBpcyBlbXB0eS5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSBvYmplY3QgfCBvYmplY3RcclxuXHQgKiBAcmV0dXJuIGJvb2xcclxuXHQgKi9cclxuXHRzdGF0aWMgZW1wdHlPYmplY3Qob2JqZWN0KSB7XHJcblx0XHRmb3IgKGxldCBwcm9wIGluIG9iamVjdCkge1xyXG5cdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIHRydWU7XHJcblx0fVxyXG5cclxuXHJcblx0LyoqXHJcblx0ICogQ2hlY2tzIGlmIGEgZ2l2ZW4gb2JqZWN0IGNvbnRhaW5lZCBpbiBhbiBhcnJheS5cclxuXHQgKiBcclxuXHQgKiBAcGFyYW0gb2JqZWN0IHwgb2JqZWN0XHJcblx0ICogQHBhcmFtIGFycmF5IHwgaGF5c3RhY2tcclxuXHQgKiBAcmV0dXJuIGJvb2xcclxuXHQgKi9cclxuXHRzdGF0aWMgY29udGFpbnNPYmplY3Qob2JqZWN0LCBoeXN0YWNrKSBcclxuXHR7XHJcblx0ICAgIGxldCBpO1xyXG5cclxuXHQgICAgZm9yIChpID0gMDsgaSA8IGh5c3RhY2subGVuZ3RoOyBpKyspIHtcclxuXHQgICAgICAgIGlmICh0eXBlb2Ygb2JqZWN0ID09ICdzdHJpbmcnICYmIGh5c3RhY2tbaV0uY29uc3RydWN0b3IubmFtZSA9PT0gb2JqZWN0KSB7XHJcblx0ICAgICAgICBcdHJldHVybiB0cnVlO1xyXG5cdCAgICAgICAgfVxyXG5cclxuXHQgICAgICAgIGlmIChoeXN0YWNrW2ldID09PSBvYmplY3QpIHtcclxuXHQgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuXHQgICAgICAgIH1cclxuXHQgICAgfVxyXG5cclxuXHQgICAgcmV0dXJuIGZhbHNlO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQ2hlY2tzIGlmIGEgZ2l2ZW4gcGFyYW1ldGVyIGlzIGFuIG9iamVjdC5cclxuXHQgKiBcclxuXHQgKiBAcGFyYW0gb2JqZWN0IHwgb2JqZWN0XHJcblx0ICogQHJldHVybiBib29sXHJcblx0ICovXHJcblx0c3RhdGljIGlzT2JqZWN0KG9iamVjdCkgXHJcblx0e1xyXG5cdFx0cmV0dXJuIHR5cGVvZiBvYmplY3QgPT0gJ29iamVjdCc7XHJcblx0fVxyXG59XG5cbmxldCBkZWZhdWx0TWVzc2FnZSQxID0gJ1RoZSBkYXRhIHN0cnVjdHVyZSBpcyBpbnZhbGlkJztcclxuXHJcbmNsYXNzIEludmFsaWREYXRhU3RydWN0dXJlRXhjZXB0aW9uIGV4dGVuZHMgRXhjZXB0aW9uSGFuZGxlclxyXG57XHJcblx0Y29uc3RydWN0b3IobWVzc2FnZSA9IG51bGwpIFxyXG5cdHtcclxuXHRcdG1lc3NhZ2UgPSBtZXNzYWdlIHx8IGRlZmF1bHRNZXNzYWdlJDE7XHJcblx0XHRzdXBlcihtZXNzYWdlKTtcclxuICAgIFx0c3VwZXIuc3RhY2tUcmFjZSh0aGlzLCBtZXNzYWdlKTtcclxuICAgIH1cclxufVxuXG4vKipcclxuICogQGZpbGUgXHJcbiAqIFJlcXVlc3QgY2xhc3MuXHJcbiAqXHJcbiAqIEhhbmRsZXMgYWpheCByZXF1ZXN0cyBQT1NULCBHRVQgZXRjLi4uXHJcbiAqL1xyXG5cclxuLyoqXHJcbiAqIFN0b3JlcyB0aGUgZGVmYXVsdCBzZXR0aW5ncy5cclxuICpcclxuICogQHZhciBvYmplY3RcclxuICovXHJcblxyXG5sZXQgZGVmYXVsdFNldHRpbmdzID0ge1xyXG5cdGhlYWRlcnM6IHtcclxuXHRcdCdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbidcclxuXHR9LFxyXG5cdGFzeW5jOiB0cnVlXHJcbn07XHJcblxyXG5jbGFzcyBSZXF1ZXN0XHJcbntcclxuXHQvKipcclxuXHQgKiAtIEluaXRpYWxpemUgdGhlIHNldHRpbmdzIG9iamVjdC5cclxuXHQgKiAtIEluaXRpYWxpemUgdGhlIHhociBvYmplY3QuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gb2JqZWN0IHwgc2V0dGluZ3NcclxuXHQgKiBAcmV0dXJuIHZvaWRcclxuXHQgKi9cclxuXHRjb25zdHJ1Y3RvcihzZXR0aW5ncylcclxuXHR7XHJcblx0XHR0aGlzLnNldHRpbmdzID0gQ29tbW9uLmV4dGVuZChkZWZhdWx0U2V0dGluZ3MsIHNldHRpbmdzKTtcclxuXHRcdHRoaXMuc2V0RGVmYXVsdFJlcXVlc3RIZWFkZXIoKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFNldHMgdGhlIGRlZmF1bHQgcmVxdWVzdCBoZWFkZXJzLlxyXG5cdCAqXHJcblx0ICogQHJldHVybiB2b2lkXHJcblx0ICovXHJcblx0c2V0RGVmYXVsdFJlcXVlc3RIZWFkZXIoKVxyXG5cdHtcclxuXHRcdGxldCBoZWFkZXI7XHJcblx0XHRsZXQgaGVhZGVycyA9IHRoaXMuc2V0dGluZ3MuaGVhZGVycztcclxuXHRcdGxldCBhc3luYyA9IHRoaXMuc2V0dGluZ3MuYXN5bmM7XHJcblx0XHRsZXQgb3BlbiA9IFhNTEh0dHBSZXF1ZXN0LnByb3RvdHlwZS5vcGVuO1xyXG5cdFx0bGV0IHNldFJlcXVlc3RIZWFkZXIgPSBYTUxIdHRwUmVxdWVzdC5wcm90b3R5cGUuc2V0UmVxdWVzdEhlYWRlcjtcclxuXHJcblx0XHRYTUxIdHRwUmVxdWVzdC5wcm90b3R5cGUub3BlbiA9IGZ1bmN0aW9uKCkge1xyXG5cdFx0XHR2YXIgcmVzcG9uc2UgPSBvcGVuLmFwcGx5KHRoaXMsIGFyZ3VtZW50cywgYXN5bmMpO1xyXG5cclxuXHRcdFx0Zm9yIChoZWFkZXIgaW4gaGVhZGVycykge1xyXG5cdFx0XHRcdHRoaXMuc2V0UmVxdWVzdEhlYWRlcihoZWFkZXIsIGhlYWRlcnNbaGVhZGVyXSk7XHJcblx0XHRcdH1cclxuXHJcblx0ICBcdFx0cmV0dXJuIHJlc3BvbnNlO1xyXG5cdFx0fTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIE1ha2VzIGEgUE9TVCByZXF1ZXN0LlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIG9iamVjdCB8IG9wdGlvbnNcclxuXHQgKiBAcmV0dXJuIFByb21pc2VcclxuXHQgKi9cclxuXHRwb3N0KG9wdGlvbnMpXHJcblx0e1xyXG5cdFx0bGV0IHhociA9IHRoaXMueGhyO1xyXG5cclxuXHRcdGlmKG9wdGlvbnMuaGFzT3duUHJvcGVydHkoJ2JlZm9yZScpICYmIHR5cGVvZiBvcHRpb25zLmJlZm9yZSA9PSAnZnVuY3Rpb24nKSB7XHJcblx0XHRcdG9wdGlvbnMuYmVmb3JlLmNhbGwodGhpcyk7XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xyXG5cdFx0XHRpZih0eXBlb2Ygb3B0aW9ucyAhPT0gJ29iamVjdCcpIHtcclxuXHRcdFx0XHR0aHJvdyBuZXcgRXJyb3IoJ2dldCBleHBlY3RpbmcgYSBqc29uIG9iamVjdCB0byBiZSBwYXNzZWQgYXMgYW4gYXJndW1lbnQsIGJ1dCAnKyB0eXBlb2Ygb3B0aW9ucyArICcgd2FzIHBhc3NlZC4nKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0b3B0aW9ucy5kYXRhID0gb3B0aW9ucy5kYXRhIHx8IHt9O1xyXG5cclxuXHRcdFx0aWYodHlwZW9mIG9wdGlvbnMuZGF0YSAhPT0gJ29iamVjdCcpIHtcclxuXHRcdFx0XHR0aHJvdyBuZXcgRXJyb3IoJ2RhdGEgcHJvcGVydHkgZXhwZWN0aW5nIGEganNvbiBvYmplY3QgdG8gYmUgcGFzc2VkIGFzIGFuIGFyZ3VtZW50LCBidXQgJyArIHR5cGVvZiBvcHRpb25zLmRhdGEgKyAnIHdhcyBwYXNzZWQuJyk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHhoci5vcGVuKCdQT1NUJywgb3B0aW9ucy51cmwsIHRydWUpO1xyXG5cclxuXHRcdFx0eGhyLnJlc3BvbnNlVHlwZSA9IG9wdGlvbnMuZGF0YVR5cGUgfHwgJ2pzb24nO1xyXG5cdFx0XHR4aHIudGltZW91dCA9IG9wdGlvbnMudGltZW91dCB8fCAzMDAwO1xyXG5cclxuXHRcdFx0eGhyLm9ucmVhZHlzdGF0ZWNoYW5nZSA9IGZ1bmN0aW9uKCkge1xyXG5cdFx0XHQgICAgaWYodGhpcy5yZWFkeVN0YXRlICE9IDQgfHwgdGhpcy5zdGF0dXMgIT0gMjAwKSB7XHJcblx0XHRcdCAgICBcdHJldHVybjtcclxuXHRcdFx0ICAgIH1cclxuXHQgICAgICAgXHRcclxuICAgICAgIFx0XHRcdHJlc29sdmUodGhpcy5yZXNwb25zZSk7XHJcbiAgICAgICBcdFx0XHRcclxuICAgICAgIFx0XHRcdGlmKG9wdGlvbnMuaGFzT3duUHJvcGVydHkoJ2FmdGVyJykgJiYgdHlwZW9mIG9wdGlvbnMuYWZ0ZXIgPT0gJ2Z1bmN0aW9uJykge1xyXG5cdFx0XHRcdFx0b3B0aW9ucy5hZnRlci5jYWxsKHRoaXMpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fTtcclxuXHJcblx0XHRcdHhoci5vbmVycm9yID0gZnVuY3Rpb24obWVzc2FnZSkge1xyXG5cdFx0XHRcdGlmKG9wdGlvbnMuaGFzT3duUHJvcGVydHkoJ2Vycm9yJykgJiYgdHlwZW9mIG9wdGlvbnMuZXJyb3IgPT0gJ2Z1bmN0aW9uJykge1xyXG5cdFx0XHRcdFx0b3B0aW9ucy5lcnJvcihtZXNzYWdlKTtcclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdHJlamVjdChtZXNzYWdlKTtcclxuXHRcdFx0fTtcclxuXHJcblx0XHRcdGlmKCEgb3B0aW9ucy5kYXRhKSB7XHJcblx0XHRcdFx0eGhyLnNlbmQobnVsbCk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHZhciBxdWVyeVN0cmluZyA9IE9iamVjdC5rZXlzKG9wdGlvbnMuZGF0YSkubWFwKGZ1bmN0aW9uKGtleSkge1xyXG5cdFx0ICAgICAgICAgICAgcmV0dXJuIGVuY29kZVVSSUNvbXBvbmVudChrZXkpICsgJz0nICtcclxuXHRcdCAgICAgICAgICAgICAgICBcdGVuY29kZVVSSUNvbXBvbmVudChvcHRpb25zLmRhdGFba2V5XSk7XHJcblx0XHQgICAgICAgIFx0fSkuam9pbignJicpO1xyXG5cclxuXHRcdFx0eGhyLnNlbmQocXVlcnlTdHJpbmcpO1xyXG5cdFx0fSk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBNYWtlcyBhIEdFVCBhamF4IHJlcXVlc3QuXHJcblx0ICogXHJcblx0ICogQHBhcmFtIG9iamVjdCB8IG9wdGlvbnNcclxuXHQgKiBAcmV0dXJuIFByb21pc2VcclxuXHQgKi9cclxuXHRnZXQob3B0aW9ucylcclxuXHR7XHJcblx0XHRsZXQgeGhyID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCkgfHwgbmV3IEFjdGl2ZVhPYmplY3QoXCJNaWNyb3NvZnQuWE1MSFRUUFwiKTtcdFx0XHRcclxuXHJcblx0XHRpZihvcHRpb25zLmhhc093blByb3BlcnR5KCdiZWZvcmUnKSAmJiB0eXBlb2Ygb3B0aW9ucy5iZWZvcmUgPT0gJ2Z1bmN0aW9uJykge1xyXG5cdFx0XHRvcHRpb25zLmJlZm9yZS5jYWxsKHRoaXMpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcclxuXHRcdFx0aWYodHlwZW9mIG9wdGlvbnMgIT09ICdvYmplY3QnKSB7XHJcblx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKCdnZXQgZXhwZWN0aW5nIGEganNvbiBvYmplY3QgdG8gYmUgcGFzc2VkIGFzIGFuIGFyZ3VtZW50LCBidXQgJysgdHlwZW9mIG9wdGlvbnMgKyAnIHdhcyBwYXNzZWQuJyk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdG9wdGlvbnMuZGF0YSA9IG9wdGlvbnMuZGF0YSB8fCB7fTtcclxuXHJcblx0XHRcdGlmKHR5cGVvZiBvcHRpb25zLmRhdGEgIT09ICdvYmplY3QnKSB7XHJcblx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKCdkYXRhIHByb3BlcnR5IGV4cGVjdGluZyBhIGpzb24gb2JqZWN0IHRvIGJlIHBhc3NlZCBhcyBhbiBhcmd1bWVudCwgYnV0ICcgKyB0eXBlb2Ygb3B0aW9ucy5kYXRhICsgJyB3YXMgcGFzc2VkLicpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHR4aHIub3BlbignR0VUJywgb3B0aW9ucy51cmwsIHRydWUpO1xyXG5cclxuXHRcdFx0eGhyLnJlc3BvbnNlVHlwZSA9IG9wdGlvbnMuZGF0YVR5cGUgfHwgJ2pzb24nO1xyXG5cdFx0XHR4aHIudGltZW91dCA9IG9wdGlvbnMudGltZW91dCB8fCAzMDAwO1xyXG5cclxuXHRcdFx0aWYgKHhoci5yZXNwb25zZVR5cGUgPT0gJ2pzb24nKSB7XHJcblx0XHRcdFx0eGhyLnNldFJlcXVlc3RIZWFkZXIoJ0NvbnRlbnQtVHlwZScsICdhcHBsaWNhdGlvbi9qc29uJyk7XHJcblx0XHRcdFx0eGhyLnNldFJlcXVlc3RIZWFkZXIoJ0FjY2VwdCcsICdhcHBsaWNhdGlvbi9qc29uJyk7XHJcblx0XHRcdH1cclxuXHRcdFx0XHJcblx0XHRcdHhoci5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBmdW5jdGlvbigpIHtcclxuXHRcdFx0ICAgIGlmKHRoaXMucmVhZHlTdGF0ZSAhPSA0IHx8IHRoaXMuc3RhdHVzICE9IDIwMCkge1xyXG5cdFx0XHQgICAgXHRyZXR1cm47XHJcblx0XHRcdCAgICB9XHJcblxyXG5cdFx0XHQgICAgbGV0IHJlc3BvbnNlID0gdGhpcy5yZXNwb25zZSB8fCB0aGlzLnJlc3BvbnNlVGV4dDsgXHJcblx0XHRcdCAgICByZXNwb25zZSA9ICh4aHIucmVzcG9uc2VUeXBlID09ICdqc29uJyAmJiB0eXBlb2YgcmVzcG9uc2UgIT0gJ29iamVjdCcpID8gSlNPTi5wYXJzZShyZXNwb25zZSkgOiByZXNwb25zZTtcclxuXHRcdFx0ICAgIHJlc29sdmUocmVzcG9uc2UpO1x0XHJcbiAgICAgICBcdFx0XHRcclxuICAgICAgIFx0XHRcdGlmKG9wdGlvbnMuaGFzT3duUHJvcGVydHkoJ2FmdGVyJykgJiYgdHlwZW9mIG9wdGlvbnMuYWZ0ZXIgPT0gJ2Z1bmN0aW9uJykge1xyXG5cdFx0XHRcdFx0b3B0aW9ucy5hZnRlci5jYWxsKHRoaXMpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fTtcclxuXHJcblx0XHRcdHhoci5vbmVycm9yID0gZnVuY3Rpb24obWVzc2FnZSkge1xyXG5cdFx0XHRcdGlmKG9wdGlvbnMuaGFzT3duUHJvcGVydHkoJ2Vycm9yJykgJiYgdHlwZW9mIG9wdGlvbnMuZXJyb3IgPT0gJ2Z1bmN0aW9uJykge1xyXG5cdFx0XHRcdFx0b3B0aW9ucy5lcnJvcihtZXNzYWdlKTtcclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdHJlamVjdChtZXNzYWdlKTtcclxuXHRcdFx0fTtcclxuXHJcblx0XHRcdGlmKCEgb3B0aW9ucy5kYXRhKSB7XHJcblx0XHRcdFx0eGhyLnNlbmQobnVsbCk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHZhciBxdWVyeVN0cmluZyA9IE9iamVjdC5rZXlzKG9wdGlvbnMuZGF0YSkubWFwKGZ1bmN0aW9uKGtleSkge1xyXG5cdFx0ICAgICAgICAgICAgcmV0dXJuIGVuY29kZVVSSUNvbXBvbmVudChrZXkpICsgJz0nICtcclxuXHRcdCAgICAgICAgICAgICAgICBcdGVuY29kZVVSSUNvbXBvbmVudChvcHRpb25zLmRhdGFba2V5XSk7XHJcblx0XHQgICAgICAgIFx0fSkuam9pbignJicpO1xyXG5cclxuXHRcdFx0eGhyLnNlbmQocXVlcnlTdHJpbmcpO1xyXG5cdFx0fSk7XHJcblx0fVxyXG59XG5cbmxldCBkZWZhdWx0TWVzc2FnZSQyID0gJ3RyeWluZyB0byBiaW5kIGFuIGFscmVhZHkgZXhpc3RpbmcgYm91bmQuJztcclxuXHJcbmNsYXNzIEludmFsaWRCaW5kaW5nRXhjZXB0aW9uIGV4dGVuZHMgRXhjZXB0aW9uSGFuZGxlclxyXG57XHJcblx0Y29uc3RydWN0b3IobWVzc2FnZSA9IG51bGwpIFxyXG5cdHtcclxuXHRcdG1lc3NhZ2UgPSBtZXNzYWdlIHx8IGRlZmF1bHRNZXNzYWdlJDI7XHJcblx0XHRzdXBlcihtZXNzYWdlKTtcclxuICAgIFx0c3VwZXIuc3RhY2tUcmFjZSh0aGlzLCBtZXNzYWdlKTtcclxuICAgIH1cclxufVxuXG4vKipcclxuICogQGZpbGUgXHJcbiAqIENvbnRhaW5lciBjbGFzcy5cclxuICpcclxuICogSGFuZGxlcy9Db250cm9scyB0aGUgZGVwZW5kZW5jaWVzIG9mIGVjb21tZXJjZS5cclxuICovXHJcblxyXG4vKipcclxuICogU3RvcmVzIHRoZSBpbnN0YW5jZXNcclxuICpcclxuICogQHZhciBhcnJheVxyXG4gKi9cclxubGV0IGluc3RhbmNlcyA9IFtdO1xyXG5cclxuY2xhc3MgQ29udGFpbmVyIFxyXG57XHJcblx0LyoqXHJcblx0ICogQmluZHMga2V5IHRvIGNvbmNyZXRlIGNsYXNzLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIHN0cmluZyB8IGtleVxyXG5cdCAqIEBwYXJhbSBjbGFzcyB8IGNvbmNyZXRlXHJcblx0ICogQHJldHVybiB2b2lkXHJcblx0ICovXHJcblx0YmluZChrZXksIGNvbmNyZXRlKSBcclxuXHR7XHJcblx0XHRpZiAodHlwZW9mIGtleSAhPSAnc3RyaW5nJykge1xyXG5cdFx0XHR0aHJvdyBuZXcgSW52YWxpZEFyZ3VtZW50RXhjZXB0aW9uJDEoJ2JpbmQoKSBleHBlY3RzIHRoZSBmaXJzdCBwYXJhbWV0ZXIgdG8gYmUgc3RyaW5nLCBidXQgJyArIHR5cGVvZiBrZXkgKyAnIHdhcyBwYXNzZWQgaW5zdGVhZC4nKTtcclxuXHRcdH1cclxuXHJcblx0XHRpZiAodHlwZW9mIGNvbmNyZXRlICE9ICdmdW5jdGlvbicpIHsgXHJcblx0XHRcdHRocm93IG5ldyBJbnZhbGlkQXJndW1lbnRFeGNlcHRpb24kMSgnYmluZCgpIGV4cGVjdHMgdGhlIHNlY29uZCBwYXJhbWV0ZXIgdG8gYmUgYSBmdW5jdGlvbiwgYnV0ICcgKyB0eXBlb2YgY29uY3JldGUgKyAnIHdhcyBwYXNzZWQgaW5zdGVhZC4nKTtcclxuXHRcdH1cclxuXHJcblx0XHRpZiAodHlwZW9mIHRoaXNba2V5XSAhPSAndW5kZWZpbmVkJykge1xyXG5cdFx0XHR0aHJvdyBuZXcgSW52YWxpZEJpbmRpbmdFeGNlcHRpb24oJ2JpbmQoKSByZWNpZXZlZCBhbiBhbHJlYWR5IGV4aXN0aW5nIGJpbmQuJyk7XHJcblx0XHR9XHJcblxyXG5cdFx0dGhpc1trZXldID0gY29uY3JldGUuYmluZChjb25jcmV0ZSwgdGhpcyk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBTZXRzIGFuIGluc3RhbmNlLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIHN0cmluZyB8IGtleVxyXG5cdCAqIEBwYXJhbSBvYmplY3QgfCBpbnN0YW5jZVxyXG5cdCAqIEBwYXJhbSBzdHJpbmcgfCBhbGlhc1xyXG5cdCAqIEByZXR1cm4gdm9pZFxyXG5cdCAqL1xyXG5cdHNldEluc3RhbmNlKGtleSwgaW5zdGFuY2UsIGFsaWFzID0gbnVsbCkgXHJcblx0e1xyXG5cdFx0aWYgKHR5cGVvZiBrZXkgIT0gJ3N0cmluZycpIHtcclxuXHRcdFx0dGhyb3cgbmV3IEludmFsaWRBcmd1bWVudEV4Y2VwdGlvbiQxKCdzZXRJbnN0YWNlKCkgZXhwZWN0cyB0aGUgZmlyc3QgcGFyYW1ldGVyIHRvIGJlIGEgc3RyaW5nLCBidXQgJyArIHR5cGVvZiBrZXkgKyAnIHdhcyBwYXNzZWQgaW5zdGVhZC4nKTtcclxuXHRcdH1cclxuXHJcblx0XHRpZiAodHlwZW9mIGluc3RhbmNlICE9ICdvYmplY3QnKSB7XHJcblx0XHRcdHRocm93IG5ldyBJbnZhbGlkQXJndW1lbnRFeGNlcHRpb24kMSgnc2V0SW5zdGFuY2UoKSBleHBlY3RzIHRoZSBzZWNvbmQgcGFyYW1ldGVyIHRvIGJlIGFuIG9iamVjdCwgYnV0ICcgKyB0eXBlb2YgaW5zdGFuY2UgKyAnIHdhcyBwYXNzZWQgaW5zdGVhZC4nKTtcclxuXHRcdH1cclxuXHJcblx0XHRpbnN0YW5jZXNba2V5XSA9IGluc3RhbmNlO1xyXG5cdFx0aW5zdGFuY2VzW2FsaWFzXSA9IGluc3RhbmNlO1xyXG5cdFx0dGhpc1trZXldID0gaW5zdGFuY2U7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBSZXNvbHZlcyBhbiBpbnN0YW5jZSBvdXQgb2YgXHJcblx0ICogdGhlIGlvYyBjb250YWluZXIuXHJcblx0ICogXHJcblx0ICogQHBhcmFtIHN0cmluZyB8IGtleVxyXG5cdCAqIEByZXR1cm4gb2JqZWN0XHJcblx0ICovXHJcblx0Z2V0SW5zdGFuY2Uoa2V5KSBcclxuXHR7XHJcblx0XHRpZih0eXBlb2Yga2V5ICE9ICdzdHJpbmcnKSB7XHJcblx0XHRcdHRocm93IG5ldyBJbnZhbGlkQXJndW1lbnRFeGNlcHRpb24kMSgnZ2V0SW5zdGFjZSgpIGV4cGVjdHMgdGhlIGZpcnN0IHBhcmFtZXRlciB0byBiZSBhIHN0cmluZywgYnV0ICcgKyB0eXBlb2Yga2V5ICsgJyB3YXMgcGFzc2VkIGluc3RlYWQuJyk7XHJcblx0XHR9XHJcblxyXG5cdFx0aWYodHlwZW9mIGtleSA9PSAnb2JqZWN0Jykge1xyXG5cdFx0XHRyZXR1cm4gaW5zdGFuY2VzW2tleS5jb25zdHJ1Y3Rvci5uYW1lXSB8fCBudWxsO1xyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiBpbnN0YW5jZXNba2V5XSB8fCBudWxsO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQ2hlY2tzIGlmIGFuIGluc3RhbmNlIGV4aXN0LlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIG1peGVkIHwgaW5zdGFuY2VcclxuXHQgKiBAcmV0dXJuIGJvb2xcclxuXHQgKi9cclxuXHRpbnN0YW5jZUV4aXN0KGluc3RhbmNlKSBcclxuXHR7XHJcblx0XHRpZiAodHlwZW9mIGluc3RhbmNlID09ICdvYmplY3QnKSB7XHJcblx0XHRcdHJldHVybiAodHlwZW9mIGluc3RhbmNlc1tpbnN0YW5jZS5jb25zdHJ1Y3Rvci5uYW1lXSAhPT0gJ3VuZGVmaW5lZCcpO1xyXG5cdFx0fSBlbHNlIGlmICh0eXBlb2YgaW5zdGFuY2UgPT0gJ3N0cmluZycpIHtcclxuXHRcdFx0cmV0dXJuICh0eXBlb2YgaW5zdGFuY2VzW2luc3RhbmNlXSAhPT0gJ3VuZGVmaW5lZCcpXHJcblx0XHR9XHJcblx0XHRcclxuXHRcdHRocm93IG5ldyBJbnZhbGlkQXJndW1lbnRFeGNlcHRpb24kMSgnaW5zdGFuY2VFeGlzdCgpIGV4cGVjdHMgdGhlIGZpcnN0IHBhcmFtZXRlciB0byBiZSBzdHJpbmcgb3IgYW4gb2JqZWN0LCBidXQgJyArIHR5cGVvZiBpbnN0YW5jZSArICcgd2FzIHBhc3NlZCBpbnN0ZWFkLicpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogUmV0cmlldmUgYW4gb2JqZWN0LCBpZiBub3QgZXhpc3RzXHJcblx0ICogd2lsbCBjcmVhdGUgaXQsIHNldCBpdCBpbiB0aGUgaW9jIGNvbnRhaW5lclxyXG5cdCAqIGZvciBsYXRlciB1c2UgYW5kIHJldHJpZXZlIGl0LlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIG1peGVkIHwgb2JqZWN0IFxyXG5cdCAqIEByZXR1cm4gb2JqZWN0XHJcblx0ICovXHJcblx0bWFrZShvYmplY3QpXHJcblx0e1xyXG5cdFx0bGV0IGluc3RhbmNlID0ge307XHJcblx0XHRsZXQga2V5O1xyXG5cdFx0XHJcblx0XHRpZiAodGhpcy5pbnN0YW5jZUV4aXN0KG9iamVjdCkpIHtcclxuXHRcdFx0cmV0dXJuIHRoaXMuZ2V0SW5zdGFuY2Uob2JqZWN0KTtcclxuXHRcdH1cclxuXHJcblx0XHRpZiAodHlwZW9mIG9iamVjdCA9PSAnb2JqZWN0Jykge1xyXG5cdFx0XHRpbnN0YW5jZSA9IG9iamVjdDtcclxuXHRcdFx0a2V5ID0gb2JqZWN0LmNvbnN0cnVjdG9yLm5hbWU7XHJcblx0XHRcdHRoaXMuc2V0SW5zdGFuY2Uoa2V5LCBpbnN0YW5jZSk7IFxyXG5cdFx0fSBlbHNlIGlmKHR5cGVvZiBvYmplY3QgPT0gJ3N0cmluZycgJiYgdGhpcy5oYXNPd25Qcm9wZXJ0eShvYmplY3QpKSB7XHJcblx0XHRcdGluc3RhbmNlID0gbmV3IHRoaXNbb2JqZWN0XTtcclxuXHRcdFx0a2V5ID0gb2JqZWN0O1xyXG5cdFx0XHR0aGlzLnNldEluc3RhbmNlKGtleSwgaW5zdGFuY2UpO1x0XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHR0aHJvdyBuZXcgSW52YWxpZEJpbmRpbmdFeGNlcHRpb24oJ1RoZSBwYXJhbWV0ZXIgeW91IHBhc3NlZCBjb3VsZCBub3QgYmUgYm91bmRlZCB0byB0aGUgY29udGFpbmVyLCBwYXJhbWV0ZXI6ICcgKyB0eXBlb2Ygb2JqZWN0KTtcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gaW5zdGFuY2U7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBSZW1vdmUgYWxsIGV4aXN0aW5nIGluc3RhbmNlcy5cclxuXHQgKlxyXG5cdCAqIEByZXR1cm4gdm9pZCBcclxuXHQgKi9cclxuXHRmbHVzaCgpXHJcblx0e1xyXG5cdFx0aW5zdGFuY2VzID0gW107XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBSZXRyaWV2ZSBhbGwgaW5zdGFuY2VzLlxyXG5cdCAqXHJcblx0ICogQHJldHVybiBhcnJheVxyXG5cdCAqL1xyXG5cdGluc3RhbmNlcygpIFxyXG5cdHtcclxuXHRcdHJldHVybiBpbnN0YW5jZXM7XHJcblx0fVxyXG59XG5cbmxldCBkZWZhdWx0TWVzc2FnZSQzID0gJ1RoZSBldmVudCB5b3UgY2FsbGVkIGRvZXMgbm90IGV4aXN0cyBvciB5b3Ugc3VwcGxpZWQgd3JvbmcgYXJndW1lbnQnO1xyXG5cclxuY2xhc3MgQmFkRXZlbnRDYWxsRXhjZXB0aW9uIGV4dGVuZHMgRXhjZXB0aW9uSGFuZGxlclxyXG57XHJcblx0Y29uc3RydWN0b3IobWVzc2FnZSA9IG51bGwpIFxyXG5cdHtcclxuXHRcdG1lc3NhZ2UgPSBtZXNzYWdlIHx8IGRlZmF1bHRNZXNzYWdlJDM7XHJcblx0XHRzdXBlcihtZXNzYWdlKTtcclxuICAgIFx0c3VwZXIuc3RhY2tUcmFjZSh0aGlzLCBtZXNzYWdlKTtcclxuICAgIH1cclxufVxuXG4vKipcclxuICogQGZpbGUgXHJcbiAqIEV2ZW50TWFuYWdlciBjbGFzcy5cclxuICpcclxuICogSGFuZGxlcyBzdWJzY3JpcGlvbnMgYW5kIHB1Ymxpc2hpbmcgb2YgZXZlbnRzLlxyXG4gKi9cclxuXHJcbmNsYXNzIEV2ZW50TWFuYWdlclxyXG57XHJcblx0LyoqXHJcblx0ICogU3RvcmVzIHRoZSBldmVudHMgY2FsbGJhY2tzLlxyXG5cdCAqIFxyXG5cdCAqIEB2YXIgYXJyYXlcclxuXHQgKi9cclxuXHRjb25zdHJ1Y3RvcigpXHJcblx0e1xyXG5cdFx0dGhpcy5ldmVudHMgPSB7fTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFN1YnNjcmliaW5nIHRvIGFuIGV2ZW50LlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIHN0cmluZyB8IG5hbWVcclxuXHQgKiBAcGFyYW0gZnVuY3Rpb24gfCBjYWxsYmFja1xyXG5cdCAqIEByZXR1cm4gdm9pZFxyXG5cdCAqL1xyXG5cdHN1YnNjcmliZShuYW1lLCBjYWxsYmFjaykgXHJcblx0e1xyXG5cdFx0aWYgKHR5cGVvZiBjYWxsYmFjayAhPT0gJ2Z1bmN0aW9uJykge1xyXG5cdFx0XHR0aHJvdyBuZXcgSW52YWxpZEFyZ3VtZW50RXhjZXB0aW9uO1xyXG5cdFx0fVxyXG5cclxuXHRcdGlmICh0eXBlb2YgdGhpcy5ldmVudHNbbmFtZV0gPT0gJ3VuZGVmaW5lZCcpIHtcclxuXHRcdFx0dGhpcy5ldmVudHNbbmFtZV0gPSBbXTtcclxuXHRcdH1cclxuXHJcblx0XHR0aGlzLmV2ZW50c1tuYW1lXS5wdXNoKGNhbGxiYWNrKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFB1Ymxpc2ggYW4gZXZlbnQgdG8gYWxsIHN1YnNjcmliZXJzLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIHN0cmluZyB8IG5hbWVcclxuXHQgKiBAcGFyYW0gbGlzdCB8IGRhdGFcclxuXHQgKiBAcmV0dXJuIHZvaWRcclxuXHQgKi9cclxuXHRwdWJsaXNoKG5hbWUsIC4uLmRhdGEpIFxyXG5cdHtcclxuXHRcdGRhdGEgPSBkYXRhIHx8IG51bGw7XHJcblxyXG5cdFx0Ly8gSWYgdGhlcmUgYXJlIG5vIHN1YnNjcmliZXJzIHNpbXBseSBpZ25vcmUgdGhhdCBldmVudC5cclxuXHRcdGlmICh0eXBlb2YgdGhpcy5ldmVudHNbbmFtZV0gPT0gJ3VuZGVmaW5lZCcpIHtcclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0fVxyXG5cclxuXHRcdHRoaXMuZXZlbnRzW25hbWVdLmZvckVhY2goZnVuY3Rpb24oY2FsbGJhY2spIHtcclxuXHRcdFx0aWYodHlwZW9mIGNhbGxiYWNrICE9ICdmdW5jdGlvbicpIHtcclxuXHRcdFx0XHR0aHJvdyBuZXcgSW52YWxpZEFyZ3VtZW50RXhjZXB0aW9uKCdzdWJzY3JpYmUoKSBzaG91bGQgcmVjaWV2ZSBjYWxsYmFjayBhcyBzZWNvbmQgcGFyYW1ldGVyLCBidXQgJysgdHlwZW9mIGNhbGxiYWNrICsnIHdhcyBwYXNzZWQnKTtcclxuXHRcdFx0fVxyXG5cdFx0XHRcclxuXHRcdFx0cmV0dXJuIGNhbGxiYWNrKC4uLmRhdGEpO1xyXG5cdFx0fSk7XHJcblx0fVxyXG59XG5cbi8qKlxyXG4gKiBAZmlsZSBcclxuICogQ29va2llIGNsYXNzLlxyXG4gKlxyXG4gKiBBZGRzIHNvbWUgdXNlZnVsIGZ1bmN0aW9uYWxpdHkgZm9yXHJcbiAqIHNldHRpbmcgb3IgZ2V0dGluZyBjb29raWVzLlxyXG4gKi9cclxuXHRcclxuY2xhc3MgQ29va2llXHJcbntcclxuXHQvKipcclxuIFx0KiBTZXRzIGEgY29va2llLlxyXG4gXHQqIFxyXG4gXHQqIEBwYXJhbSBzdHJpbmcgfCBuYW1lXHJcbiBcdCogQHBhcmFtIEpTT04gfCB2YWx1ZVxyXG4gXHQqIEBwYXJhbSBpbnRlZ2VyIHwgZGF5c1xyXG4gXHQqIEByZXR1cm4gdm9pZFxyXG5cdCovXHJcblx0c3RhdGljIHNldChuYW1lLCB2YWx1ZSwgZGF5cykgXHJcblx0e1xyXG5cdFx0aWYgKHZhbHVlLmNvbnN0cnVjdG9yLm5hbWUgID09ICdPYmplY3QnIHx8IHZhbHVlLmNvbnN0cnVjdG9yLm5hbWUgPT0gJ0FycmF5Jykge1xyXG5cdFx0XHR2YWx1ZSA9IEpTT04uc3RyaW5naWZ5KHZhbHVlKTtcclxuXHRcdH1cclxuXHJcblx0XHRkYXlzID0gZGF5cyB8fCAxMDtcclxuXHJcblx0ICAgIGxldCBleHBpcmVzO1xyXG5cdCAgICBcclxuXHQgICAgaWYgKGRheXMpIHtcclxuXHQgICAgICAgIGxldCBkYXRlID0gbmV3IERhdGUoKTtcclxuXHQgICAgICAgIGRhdGUuc2V0VGltZShkYXRlLmdldFRpbWUoKSArIChkYXlzICogMjQgKiA2MCAqIDYwICogMTAwMCkpO1xyXG5cdCAgICAgICAgZXhwaXJlcyA9IFwiOyBleHBpcmVzPVwiICsgZGF0ZS50b0dNVFN0cmluZygpO1xyXG5cdCAgICB9IGVsc2Uge1xyXG5cdCAgICAgICAgZXhwaXJlcyA9IFwiXCI7XHJcblx0ICAgIH1cclxuXHJcblx0ICAgIGRvY3VtZW50LmNvb2tpZSA9IG5hbWUgKyBcIj1cIiArIHZhbHVlICsgZXhwaXJlcyArIFwiOyBwYXRoPS9cIjtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFJldHJpZXZlcyB0aGUgY29va2llIGJ5IG5hbWUuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gc3RyaW5nIHwgbmFtZVxyXG4gXHQgKiBAcmV0dXJuIEpTT05cclxuXHQgKi9cclxuXHRzdGF0aWMgZ2V0KG5hbWUpIFxyXG5cdHtcclxuXHQgICAgaWYgKGRvY3VtZW50LmNvb2tpZS5sZW5ndGggPiAwKSB7XHJcblx0ICAgICAgICBsZXQgY19zdGFydCA9IGRvY3VtZW50LmNvb2tpZS5pbmRleE9mKG5hbWUgKyBcIj1cIik7XHJcblx0ICAgICAgICBcclxuXHQgICAgICAgIGlmIChjX3N0YXJ0ICE9IC0xKSB7XHJcblx0ICAgICAgICAgICAgY19zdGFydCA9IGNfc3RhcnQgKyBuYW1lLmxlbmd0aCArIDE7XHJcblx0ICAgICAgICAgICAgbGV0IGNfZW5kID0gZG9jdW1lbnQuY29va2llLmluZGV4T2YoXCI7XCIsIGNfc3RhcnQpO1xyXG5cdCAgICAgICAgICAgIFxyXG5cdCAgICAgICAgICAgIGlmIChjX2VuZCA9PSAtMSkge1xyXG5cdCAgICAgICAgICAgICAgICBjX2VuZCA9IGRvY3VtZW50LmNvb2tpZS5sZW5ndGg7XHJcblx0ICAgICAgICAgICAgfVxyXG5cclxuXHQgICAgICAgICAgICByZXR1cm4gSlNPTi5wYXJzZSh1bmVzY2FwZShkb2N1bWVudC5jb29raWUuc3Vic3RyaW5nKGNfc3RhcnQsIGNfZW5kKSkpO1xyXG5cdCAgICAgICAgfVxyXG5cdCAgICB9XHJcblxyXG5cdCAgICByZXR1cm4ge307XHJcblx0fVxyXG59XG5cbi8qKlxyXG4gKiBAZmlsZSBcclxuICogQ2FydCBjbGFzcy5cclxuICpcclxuICogSGFuZGxlcyBhZGRpbmcsIHJlbW92aW5nIGV0Yy4uLiBvZiBpdGVtcy5cclxuICovXHJcblxyXG4vKipcclxuICogVGhlIGRlZmF1bHQgc2V0dGluZ3Mgb2YgdGhlIGNhcnQuXHJcbiAqXHJcbiAqIEB2YXIgb2JqZWN0XHJcbiAqL1xyXG5sZXQgZGVmYXVsdFNldHRpbmdzJDEgPSB7XHJcblx0ZWxlbWVudDogJy5jYXJ0JyxcclxuXHRjb29raWVfbmFtZTogJ2NhcnQnLFxyXG5cdHByZXZpZXdfY2xhc3M6ICcnLFxyXG5cdGxvYWRlcjogJycsXHJcblx0Y2xhc3M6ICcnLFxyXG5cdHdpZHRoOiAnNjBweCcsXHJcblx0aGVpZ2h0OiAnNjBweCcsXHJcblx0cGxhY2VtZW50OiAncmlnaHQtdG9wJyxcclxuXHRmaXhlZDogdHJ1ZSxcclxuXHRob3Zlcl9jb2xvcjogJ29yYW5nZScsXHJcblx0bm9fY3NzOiBmYWxzZSxcclxufTtcclxuXHJcbi8qKlxyXG4gKiBTdG9yZXMgdGhlIGNvbnRhaW5lciBvYmplY3QuXHJcbiAqXHJcbiAqIEB2YXIgXFxDb3JlXFxDb250YWluZXJcclxuICovXHJcbmxldCBDb250YWluZXIkMjtcclxuXHJcbi8qKlxyXG4gKiBTdG9yZXMgdGhlIGV2ZW50IG1hbmFnZXIgb2JqZWN0LlxyXG4gKlxyXG4gKiBAdmFyIFxcQ29yZVxcRXZlbnRNYW5hZ2VyXHJcbiAqL1xyXG5sZXQgRXZlbnRNYW5hZ2VyJDI7XHJcblxyXG4vKipcclxuICogU3RvcmVzIHRoZSByZXF1ZXN0IG9iamVjdC5cclxuICpcclxuICogQHZhciBcXEhlbHBlcnNcXFJlcXVlc3RcclxuICovXHJcbmxldCBIdHRwO1xyXG5cclxuLyoqXHJcbiAqIFN0b3JlcyB0aGUgY2FydCBsb2FkZXIuXHJcbiAqXHJcbiAqIEB2YXIgSFRNTERpdkVsZW1lbnRcclxuICovXHJcbmxldCBsb2FkaW5nT3ZlcmxheTtcclxuXHJcbi8qKlxyXG4gKiBTdG9yZXMgdGhlIGl0ZW1zIHdyYXBwZXIuXHJcbiAqXHJcbiAqIEB2YXIgSFRNTERpdkVsZW1lbnRcclxuICovXHJcbmxldCBpdGVtc0RpdjtcclxuXHJcbmNsYXNzIENhcnQgXHJcbntcclxuXHQvKipcclxuXHQgKiAtIEluaXRpYWxpemUgdGhlIElvQyBjb250YWluZXJcclxuXHQgKiAtIEluaXRpYWxpemUgdGhlIFJlcXVlc3RcclxuXHQgKiAtIEluaXRpYWxpemUgdGhlIEV2ZW50TWFuYWdlclxyXG5cdCAqIC0gQ3JlYXRlcyB0aGUgcHJldmlldyBhbmQgdGhlIGljb24gb2YgdGhlIGNhcnQuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gXFxDb3JlXFxDb250YWluZXIgfCBjb250YWluZXJcclxuXHQgKiBAcGFyYW0gXFxIZWxwZXJzXFxSZXF1ZXN0IHwgaHR0cFxyXG5cdCAqIEBwYXJhbSBcXENvcmVcXEV2ZW50TWFuYWdlciB8IGV2ZW50TWFuYWdlclxyXG5cdCAqIEByZXR1cm4gdm9pZFxyXG5cdCAqL1xyXG5cdGNvbnN0cnVjdG9yKGNvbnRhaW5lciwgaHR0cCwgZXZlbnRNYW5hZ2VyKSBcclxuXHR7XHJcblx0XHRDb250YWluZXIkMiA9IGNvbnRhaW5lcjtcclxuXHRcdEh0dHAgPSBodHRwO1xyXG5cdFx0RXZlbnRNYW5hZ2VyJDIgPSBldmVudE1hbmFnZXI7XHJcblx0XHRcclxuXHRcdHRoaXMucHJldmlld0VsZW1lbnQgPSB0aGlzLmNyZWF0ZVByZXZpZXdFbGVtZW50KCk7XHJcblx0XHR0aGlzLnN2Z0ljb24gPSBjcmVhdGVJY29uLmNhbGwodGhpcyk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBTZXRzIHRoZSBvYmplY3QgYnkgdGhlIHVzZXJzIHNldHRpbmcuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gb2JqZWN0IHwgc2V0dGluZ3NcclxuXHQgKiBAcmV0dXJuIHZvaWRcclxuXHQgKi9cclxuXHRzZXR1cChzZXR0aW5ncylcclxuXHR7XHJcblx0XHRpZih0eXBlb2Ygc2V0dGluZ3MgIT0gJ29iamVjdCcpIHtcclxuXHRcdFx0dGhyb3cgbmV3IEludmFsaWRBcmd1bWVudEV4Y2VwdGlvbiQxO1xyXG5cdFx0fVxyXG5cclxuXHRcdHRoaXMuc2V0dGluZ3MgPSBDb21tb24uZXh0ZW5kKGRlZmF1bHRTZXR0aW5ncyQxLCBzZXR0aW5ncyk7XHJcblxyXG5cdFx0dGhpcy5zZXRFbGVtZW50KHRoaXMuc2V0dGluZ3MuZWxlbWVudCk7XHJcblxyXG5cdFx0RE9NLmFkZENsYXNzKHRoaXMucHJldmlld0VsZW1lbnQsICdjbG9zZWQnKTtcclxuXHRcdERPTS5hZGRDbGFzcyh0aGlzLnByZXZpZXdFbGVtZW50LCB0aGlzLnNldHRpbmdzLnByZXZpZXdfY2xhc3MpO1xyXG5cdFx0XHJcblx0XHR0aGlzLmJpbmRFdmVudExpc3RlbmVycygpO1xyXG5cdFx0dGhpcy5hZGRTdHlsZVRhZygpO1xyXG5cclxuXHRcdGlmKHRoaXMuaXNFbXB0eShDb29raWUuZ2V0KHRoaXMuc2V0dGluZ3MuY29va2llX25hbWUpKSkge1xyXG5cdFx0XHR0aGlzLnNldHVwQ2FydCgpO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQ2hlY2tzIGlmIHRoZSBjYXJ0IGlzIGVtcHR5XHJcblx0ICpcclxuXHQgKiBAcGFyYW0gb2JqZWN0IHwgY2FydFxyXG5cdCAqIEByZXR1cm4gYm9vbFxyXG5cdCAqL1xyXG5cdGlzRW1wdHkoY2FydClcclxuXHR7XHJcblx0XHRyZXR1cm4gQ29tbW9uLmVtcHR5T2JqZWN0KGNhcnQpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogSW5pdGlhbGl6ZS9TZXRzIHRoZSBjYXJ0IGFzIGEgY29va2llLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIG9iamVjdCB8IGNhcnRcclxuXHQgKiBAcmV0dXJuIHZvaWRcclxuXHQgKi9cclxuXHRzZXR1cENhcnQoKVxyXG5cdHtcclxuXHRcdHRoaXMuY2FydCA9IHt9O1xyXG5cdFx0dGhpcy5jYXJ0LmlkID0gU3RyLnJhbmRvbSgxMCk7XHJcblx0XHR0aGlzLmNhcnQuaXRlbXMgPSBbXTtcclxuXHRcdHRoaXMuY2FydC5mYXZvcml0ZXMgPSBbXTtcclxuXHRcdENvb2tpZS5zZXQodGhpcy5zZXR0aW5ncy5jb29raWVfbmFtZSwgdGhpcy5jYXJ0LCAyKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEFkZHMgYW4gaXRlbSB0byB0aGUgY2FydC5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSBvYmplY3QgfCBpdGVtXHJcblx0ICogQHJldHVybiB2b2lkXHJcblx0ICovXHJcblx0YWRkSXRlbShpdGVtKVxyXG5cdHtcclxuXHRcdHRoaXMuY2FydCA9IENvb2tpZS5nZXQodGhpcy5zZXR0aW5ncy5jb29raWVfbmFtZSk7XHJcblxyXG5cdFx0aWYgKCFpdGVtLmhhc093blByb3BlcnR5KCdxdWFudGl0eScpKSB7XHJcblx0XHRcdGl0ZW0ucXVhbnRpdHkgPSAxO1xyXG5cdFx0fVxyXG5cclxuXHRcdGxldCB3YXNBZGRlZCA9IGZhbHNlO1xyXG5cdFx0bGV0IGk7XHJcblxyXG5cdFx0Zm9yIChpID0gMDsgaSA8IHRoaXMuY2FydC5pdGVtcy5sZW5ndGg7IGkrKykge1xyXG5cdFx0XHRpZiAodGhpcy5jYXJ0Lml0ZW1zW2ldLm5hbWUgPT0gaXRlbS5uYW1lKSB7XHJcblx0XHRcdFx0dGhpcy5jYXJ0Lml0ZW1zW2ldLnF1YW50aXR5Kys7XHJcblx0XHRcdFx0d2FzQWRkZWQgPSB0cnVlO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKCF3YXNBZGRlZCkge1xyXG5cdFx0XHR0aGlzLmNhcnQuaXRlbXMucHVzaChpdGVtKTtcclxuXHRcdH1cclxuXHJcblx0XHRDb29raWUuc2V0KHRoaXMuc2V0dGluZ3MuY29va2llX25hbWUsIHRoaXMuY2FydCwgMik7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBSZW1vdmVzIGFuIGl0ZW0gZnJvbSB0aGUgY2FydC5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSBvYmplY3QgfCBpdGVtXHJcblx0ICogQHJldHVybiB2b2lkXHJcblx0ICovXHJcblx0cmVtb3ZlSXRlbShpdGVtKVxyXG5cdHtcclxuIFx0XHR0aGlzLmNhcnQgPSBDb29raWUuZ2V0KHRoaXMuc2V0dGluZ3MuY29va2llX25hbWUpO1xyXG5cclxuIFx0XHR0aGlzLmNhcnQuaXRlbXMuc3BsaWNlKHRoaXMuY2FydC5pdGVtcy5pbmRleE9mKGl0ZW0pLCAxKTtcclxuXHJcbiBcdFx0Q29va2llLnNldCh0aGlzLnNldHRpbmdzLmNvb2tpZV9uYW1lLCB0aGlzLmNhcnQsIDIpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQWRkcyB0aGUgaXRlbSB0byBwcmV2aWV3LlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIGFycmF5IHwgaXRlbXNcclxuXHQgKiBAcmV0dXJuIHZvaWRcclxuXHQgKi9cclxuXHRhZGRUb1ByZXZpZXcoaXRlbXMpXHJcblx0e1xyXG5cdFx0aXRlbXNEaXYuaW5uZXJIVE1MID0gJyc7XHJcblxyXG5cdFx0bGV0IHRhYmxlID0gRE9NLmNyZWF0ZUVsZW1lbnQoJ3RhYmxlJyk7XHJcblxyXG5cdFx0RE9NLmFkZENsYXNzKHRhYmxlLCAncHJldmlldy10YWJsZScpO1xyXG5cclxuXHRcdGZvciAobGV0IGkgPSAwOyBpIDwgaXRlbXMubGVuZ3RoOyBpKyspIHtcclxuXHJcblx0XHRcdGxldCBhdHRyaWJ1dGVzID0gaXRlbXNbaV07XHJcblxyXG5cdFx0XHRsZXQgdHIgPSBET00uY3JlYXRlRWxlbWVudCgndHInLCB7XHJcblx0XHRcdFx0Y2xhc3M6ICdpdGVtJ1xyXG5cdFx0XHR9KTtcclxuXHJcblx0XHRcdC8vIFF1YW50aXR5IGFsd2F5cyBhdCB0aGUgc3RhcnQgb2YgYW4gaXRlbS5cclxuXHRcdFx0bGV0IHRkID0gRE9NLmNyZWF0ZUVsZW1lbnQoJ3RkJyk7XHJcblx0XHRcdHRkLmlubmVySFRNTCA9IGF0dHJpYnV0ZXMucXVhbnRpdHkgKyd4JztcclxuXHRcdFx0dHIuYXBwZW5kQ2hpbGQodGQpO1xyXG5cdFx0XHRcclxuXHRcdFx0Zm9yKGxldCBhdHRyaWJ1dGUgaW4gYXR0cmlidXRlcykge1xyXG5cdFx0XHRcdHN3aXRjaChhdHRyaWJ1dGUpXHJcblx0XHRcdFx0e1xyXG5cdFx0XHRcdFx0Y2FzZSAnaW1hZ2UnOlxyXG5cdFx0XHRcdFx0XHR0ZCA9IERPTS5jcmVhdGVFbGVtZW50KCd0ZCcpO1xyXG5cdFx0XHRcdFx0XHRsZXQgaW1hZ2UgPSBET00uY3JlYXRlRWxlbWVudCgnaW1nJywge1xyXG5cdFx0XHRcdFx0XHRcdHNyYzogYXR0cmlidXRlc1thdHRyaWJ1dGVdLFxyXG5cdFx0XHRcdFx0XHRcdHdpZHRoOiAnNTBweCcsXHJcblx0XHRcdFx0XHRcdFx0aGVpZ2h0OiAnNTBweCdcclxuXHRcdFx0XHRcdFx0fSk7XHJcblxyXG5cdFx0XHRcdFx0XHR0ZC5hcHBlbmRDaGlsZChpbWFnZSk7XHJcblx0XHRcdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRcdFx0Y2FzZSAnbmFtZSc6XHJcblx0XHRcdFx0XHRjYXNlICdwcmljZSc6XHJcblx0XHRcdFx0XHRcdHRkID0gRE9NLmNyZWF0ZUVsZW1lbnQoJ3RkJyk7XHJcblx0XHRcdFx0XHRcdHRkLmlubmVySFRNTCA9IGF0dHJpYnV0ZXNbYXR0cmlidXRlXTtcclxuXHRcdFx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcclxuXHRcdFx0XHR0ci5hcHBlbmRDaGlsZCh0ZCk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHRhYmxlLmFwcGVuZENoaWxkKHRyKTtcclxuXHRcdH1cclxuXHJcblx0XHRpdGVtc0Rpdi5hcHBlbmRDaGlsZCh0YWJsZSk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBCaW5kcyBldmVydGhpbmcgdG8gdGhlIGVsZW1lbnQuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gc3RyaW5nIHwgc2VsZWN0b3JcclxuXHQgKiBAcmV0dXJuIHZvaWRcclxuXHQgKi9cclxuXHRzZXRFbGVtZW50KHNlbGVjdG9yKVxyXG5cdHtcclxuXHRcdHRoaXMuaWNvbiA9IERPTS5maW5kKHNlbGVjdG9yKTtcclxuXHJcblx0XHRpZiAodGhpcy5pY29uKSB7XHJcblx0XHRcdERPTS5hZGRDbGFzcyh0aGlzLmljb24sIHRoaXMuc2V0dGluZ3MuY2xhc3MpO1xyXG5cdFx0XHRET00uYWRkQ2xhc3ModGhpcy5pY29uLCB0aGlzLnNldHRpbmdzLnBsYWNlbWVudCk7XHJcblx0XHRcdHRoaXMuaWNvbi5hcHBlbmRDaGlsZCh0aGlzLnN2Z0ljb24pO1xyXG5cdFx0XHR0aGlzLmljb24uYXBwZW5kQ2hpbGQodGhpcy5wcmV2aWV3RWxlbWVudCk7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBDcmVhdGVzIHRoZSBjYXJ0IGRldGFpbHMgcHJldmlldyBlbGVtZW50LlxyXG5cdCAqXHJcblx0ICogQHJldHVybiBIVE1MRGl2RWxlbWVudFxyXG5cdCAqL1xyXG5cdGNyZWF0ZVByZXZpZXdFbGVtZW50KClcclxuXHR7XHJcblx0XHRsZXQgcHJldmlld0VsZW1lbnQgPSBET00uY3JlYXRlRWxlbWVudCgnZGl2Jywge1xyXG5cdFx0XHRpZDogJ3ByZXZpZXcnXHJcblx0XHR9KTtcclxuXHJcblx0XHRpdGVtc0RpdiA9IERPTS5jcmVhdGVFbGVtZW50KCd1bCcsIHtcclxuXHRcdFx0XHRjbGFzczogJ2l0ZW1zJ1xyXG5cdFx0XHR9KTtcclxuXHJcblx0XHRwcmV2aWV3RWxlbWVudC5hcHBlbmRDaGlsZChpdGVtc0Rpdik7XHJcblxyXG5cdFx0cmV0dXJuIHByZXZpZXdFbGVtZW50O1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQWRkIHRoZSBlQ29tbWVyY2Ugc3R5bGUgdGFncyB0byB0aGUgRE9NLlxyXG5cdCAqXHJcblx0ICogQHJldHVybiB2b2lkXHJcblx0ICovXHJcblx0YWRkU3R5bGVUYWcoKSBcclxuXHR7XHJcblx0XHRpZiAoRE9NLmZpbmQoJyNlQ29tbWVyY2UtQ2FydCcpKSB7XHJcblx0XHRcdHJldHVybjtcclxuXHRcdH1cclxuXHJcblx0XHRpZiAodGhpcy5zZXR0aW5ncy5ub19jc3MpIHtcclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0fVxyXG5cclxuXHRcdGxldCBwb3NpdGlvbiA9ICh0aGlzLnNldHRpbmdzLmZpeGVkKSA/ICdmaXhlZCcgOiAnYWJzb2x1dGUnO1xyXG5cclxuXHRcdGxldCBjc3MgPSBgXHJcblx0XHRcdCR7dGhpcy5zZXR0aW5ncy5lbGVtZW50fSB7XHJcblx0XHRcdFx0cG9zaXRpb246ICR7cG9zaXRpb259O1xyXG5cdFx0XHRcdGN1cnNvcjogcG9pbnRlcjtcclxuXHRcdFx0XHRjb2xvcjogI2ZmZmZmZjtcclxuXHRcdFx0XHR6LWluZGV4OiA5OTg7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdCR7dGhpcy5zZXR0aW5ncy5lbGVtZW50fSA+IHN2ZyB7XHJcblx0XHRcdFx0d2lkdGg6ICR7dGhpcy5zZXR0aW5ncy53aWR0aH07XHJcblx0XHRcdFx0aGVpZ2h0OiAke3RoaXMuc2V0dGluZ3MuaGVpZ2h0fTtcclxuXHRcdFx0XHR0cmFuc2l0aW9uOiBmaWxsIDAuM3M7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdCR7dGhpcy5zZXR0aW5ncy5lbGVtZW50fSA+IHN2Zzpob3ZlciB7XHJcblx0XHRcdFx0ZmlsbDogJHt0aGlzLnNldHRpbmdzLmhvdmVyX2NvbG9yfTtcclxuXHRcdFx0XHR0cmFuc2l0aW9uOiBmaWxsIDAuM3M7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdCR7dGhpcy5zZXR0aW5ncy5lbGVtZW50fS50b3AtcmlnaHQsXHJcblx0XHRcdCR7dGhpcy5zZXR0aW5ncy5lbGVtZW50fS5yaWdodC10b3Age1xyXG5cdFx0XHRcdHJpZ2h0OiAxMHB4O1xyXG5cdFx0XHRcdHRvcDogMTBweDtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0JHt0aGlzLnNldHRpbmdzLmVsZW1lbnR9LmxlZnQtdG9wLFxyXG5cdFx0XHQke3RoaXMuc2V0dGluZ3MuZWxlbWVudH0udG9wLWxlZnQge1xyXG5cdFx0XHRcdGxlZnQ6IDEwcHg7XHJcblx0XHRcdFx0dG9wOiAxMHB4O1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHQke3RoaXMuc2V0dGluZ3MuZWxlbWVudH0gPiAjcHJldmlldyB7XHJcblx0XHRcdFx0cG9zaXRpb246ICR7cG9zaXRpb259O1xyXG5cdFx0XHRcdHotaW5kZXg6IDk5OTk7XHJcblx0XHRcdFx0dG9wOiBjYWxjKDEwcHggKyAke3RoaXMuc2V0dGluZ3MuaGVpZ2h0fSk7XHJcblx0XHRcdFx0dHJhbnNmb3JtOiB0cmFuc2xhdGVYKDYwcHgpO1xyXG5cdFx0XHRcdGhlaWdodDogNDAwcHg7XHJcblx0XHRcdFx0d2lkdGg6IDMwMHB4O1xyXG5cdFx0XHRcdGJvcmRlcjogMXB4IHNvbGlkICNlNGU0ZTQ7XHJcblx0XHRcdFx0YmFja2dyb3VuZDogI2ZmZmZmZjtcclxuXHRcdFx0XHR0cmFuc2l0aW9uOiB0cmFuc2Zvcm0gMXMsIHZpc2liaWxpdHkgMXM7XHJcblx0XHRcdFx0Y3Vyc29yOiBkZWZhdWx0O1xyXG5cdFx0XHRcdG92ZXJmbG93LVk6IHNjcm9sbDtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0JHt0aGlzLnNldHRpbmdzLmVsZW1lbnR9ID4gI3ByZXZpZXcub3BlbmVkIHtcclxuXHRcdFx0XHR2aXNpYmlsaXR5OiB2aXNpYmxlO1xyXG5cdFx0XHRcdHRyYW5zZm9ybTogdHJhbnNsYXRlWCgtMjQwcHgpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHQke3RoaXMuc2V0dGluZ3MuZWxlbWVudH0gPiAjcHJldmlldy5jbG9zZWQge1xyXG5cdFx0XHRcdHZpc2liaWxpdHk6IGhpZGRlbjtcclxuXHRcdFx0XHR0cmFuc2Zvcm06IHRyYW5zbGF0ZVgoNjBweCk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdCR7dGhpcy5zZXR0aW5ncy5lbGVtZW50fSAjcHJldmlldyA+IHVsLml0ZW1zIHtcclxuXHRcdFx0XHRwYWRkaW5nOiAwO1xyXG5cdFx0XHRcdGNvbG9yOiAjMDAwMDAwO1xyXG5cdFx0XHRcdGxpc3Qtc3R5bGUtdHlwZTogbm9uZTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0JHt0aGlzLnNldHRpbmdzLmVsZW1lbnR9ICNwcmV2aWV3ID4gdWwuaXRlbXMgPiAucHJldmlldy10YWJsZSB7XHJcblx0XHRcdFx0d2lkdGg6IDEwMCU7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdCR7dGhpcy5zZXR0aW5ncy5lbGVtZW50fSAjcHJldmlldyA+IHVsLml0ZW1zID4gLnByZXZpZXctdGFibGUgdGQge1xyXG5cdFx0XHRcdHBhZGRpbmc6IDRweDtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0JHt0aGlzLnNldHRpbmdzLmVsZW1lbnR9IC5pdGVtcy5sb2FkaW5nIHtcclxuXHRcdFx0XHRkaXNwbGF5OiBub25lO1xyXG5cdFx0XHRcdG92ZXJmbG93LVk6IG5vbmU7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdCR7dGhpcy5zZXR0aW5ncy5lbGVtZW50fSAuY2FydC1sb2FkZXItb3ZlcmxheSB7XHJcblx0XHRcdFx0cG9zaXRpb246IGZpeGVkO1xyXG5cdFx0XHRcdHRvcDogMDsgXHJcblx0XHRcdCAgICBsZWZ0OiAwO1xyXG5cdFx0XHQgICAgcmlnaHQ6IDA7XHJcblx0XHRcdCAgICBib3R0b206IDA7XHJcblx0XHRcdFx0YmFja2dyb3VuZDogI2ZmZmZmZjtcclxuXHRcdFx0XHR3aWR0aDogMTAwJTtcclxuXHRcdFx0XHRoZWlnaHQ6IDEwMCU7XHJcblx0XHRcdFx0bWluLWhlaWdodDogMTAwJTtcclxuXHRcdFx0XHRvdmVyZmxvdzogYXV0bztcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0JHt0aGlzLnNldHRpbmdzLmVsZW1lbnR9IC5jYXJ0LWxvYWRlci1vdmVybGF5IC5jYXJ0LWxvYWRlciB7XHJcblx0XHRcdFx0cG9zaXRpb246IGFic29sdXRlO1xyXG5cdFx0XHRcdHdpZHRoOiA1MHB4O1xyXG5cdFx0XHRcdGhlaWdodDogNTBweDtcclxuXHRcdFx0XHRtYXJnaW4tbGVmdDogLTI1cHg7XHJcblx0XHRcdFx0bWFyZ2luLXRvcDogLTI1cHg7XHJcblx0XHRcdFx0bGVmdDogNTAlO1xyXG5cdFx0XHRcdHJpZ2h0OiA1MCU7XHJcblx0XHRcdFx0dG9wOiA1MCU7XHJcblx0XHRcdFx0Ym90dG9tOiA1MCU7XHJcblx0XHRcdH1cclxuXHRcdGA7XHJcblx0ICAgIFxyXG5cdCAgICBET00uYWRkU3R5bGUoJ1R1cmJvLWVDb21tZXJjZS1DYXJ0JywgY3NzKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIENyZWF0ZXMgYW4gbG9hZGluZyBvdmVybGF5LlxyXG5cdCAqXHJcblx0ICogQHJldHVybiBIVE1MRGl2RWxlbWVudFxyXG5cdCAqL1xyXG5cdGxvYWRpbmdPdmVybGF5KClcclxuXHR7XHJcblx0XHRpZiAobG9hZGluZ092ZXJsYXkpIHtcclxuXHRcdFx0cmV0dXJuIGxvYWRpbmdPdmVybGF5O1xyXG5cdFx0fVxyXG5cclxuXHRcdGxldCBsb2FkZXI7XHJcblxyXG5cdFx0aWYgKHRoaXMuc2V0dGluZ3MubG9hZGVyKSB7XHJcblx0XHRcdGxvYWRlciA9IERPTS5jcmVhdGVFbGVtZW50KCdpbWcnLCB7XHJcblx0XHRcdFx0c3JjOiB0aGlzLnNldHRpbmdzLmxvYWRlcixcclxuXHRcdFx0XHRjbGFzczogJ2NhcnQtbG9hZGVyJ1xyXG5cdFx0XHR9KTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdGxvYWRlciA9IGNyZWF0ZUxvYWRlcigpO1xyXG5cdFx0fVxyXG5cclxuXHRcdGxvYWRpbmdPdmVybGF5ID0gRE9NLmNyZWF0ZUVsZW1lbnQoJ2RpdicsIHtcclxuXHRcdFx0Y2xhc3M6ICdjYXJ0LWxvYWRlci1vdmVybGF5J1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0bG9hZGluZ092ZXJsYXkuYXBwZW5kQ2hpbGQobG9hZGVyKTtcclxuXHJcblx0XHRyZXR1cm4gbG9hZGluZ092ZXJsYXk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBMb2FkaW5nIHRoZSBjYXJ0IHByZXZpZXcuXHJcblx0ICpcclxuXHQgKiBAcmV0dXJuIHZvaWRcclxuXHQgKi9cclxuXHRwcmV2aWV3U3RhcnRMb2FkaW5nKClcclxuXHR7XHJcblx0XHRET00uYWRkQ2xhc3MoaXRlbXNEaXYsICdsb2FkaW5nJyk7XHJcblx0XHR0aGlzLnByZXZpZXdFbGVtZW50LmFwcGVuZENoaWxkKHRoaXMubG9hZGluZ092ZXJsYXkoKSk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBMb2FkaW5nIHRoZSBjYXJ0IHByZXZpZXcuXHJcblx0ICpcclxuXHQgKiBAcmV0dXJuIHZvaWRcclxuXHQgKi9cclxuXHRwcmV2aWV3U3RvcExvYWRpbmcoKVxyXG5cdHtcclxuXHRcdGlmIChET00uZmluZCgnLmNhcnQtbG9hZGVyLW92ZXJsYXknLCB0aGlzLnByZXZpZXdFbGVtZW50KSkge1xyXG5cdFx0XHR0aGlzLnByZXZpZXdFbGVtZW50LnJlbW92ZUNoaWxkKHRoaXMubG9hZGluZ092ZXJsYXkoKSk7XHJcblx0XHRcdERPTS5yZW1vdmVDbGFzcyhpdGVtc0RpdiwgJ2xvYWRpbmcnKTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFJlbG9hZHMgdGhlIGl0ZW1zIGluIHRoZSBjYXJ0IHByZXZpZXcuXHJcblx0ICpcclxuXHQgKiBAcmV0dXJuIHZvaWRcclxuXHQgKi9cclxuXHRyZWxvYWRDYXJ0UHJldmlldygpXHJcblx0e1xyXG5cdFx0dGhpcy5wcmV2aWV3U3RhcnRMb2FkaW5nKCk7XHJcblx0XHRsZXQgaXRlbXMgPSB0aGlzLmdldENhcnRJdGVtcygpO1xyXG5cdFx0dGhpcy5hZGRUb1ByZXZpZXcoaXRlbXMpO1xyXG5cdFx0XHJcblx0XHRsZXQgaW5zdGFuY2UgPSB0aGlzO1xyXG5cclxuXHRcdHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XHJcblx0XHRcdGluc3RhbmNlLnByZXZpZXdTdG9wTG9hZGluZy5jYWxsKGluc3RhbmNlKTtcclxuXHRcdH0sIDEwMDApO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQmluZHMgZXZlbnQgbGlzdGVuZXJzIHRvIHRoZSBjYXJ0IGljb24uXHJcblx0ICpcclxuXHQgKiBAcmV0dXJuIHZvaWRcclxuXHQgKi9cclxuXHRiaW5kRXZlbnRMaXN0ZW5lcnMoKVxyXG5cdHtcclxuXHRcdGlmKHRoaXMuc3ZnSWNvbiA9PSBudWxsKSB7XHJcblx0XHRcdHJldHVybjtcclxuXHRcdH1cclxuXHJcblx0XHR0aGlzLnN2Z0ljb24ub25jbGljayA9IGZ1bmN0aW9uKGUpIHtcclxuXHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdFx0XHR0aGlzLnRvZ2dsZUNhcnRQcmV2aWV3KCk7XHJcblx0XHR9LmJpbmQodGhpcyk7XHJcblx0XHRcclxuXHRcdEV2ZW50TWFuYWdlciQyLnN1YnNjcmliZSgnY2FydC5wcm9kdWN0cy5hZGRlZCcsIGZ1bmN0aW9uKGF0dHJpYnV0ZXMpIHtcclxuXHRcdFx0dGhpcy5vcGVuQ2FydFByZXZpZXcoKTtcclxuXHRcdFx0dGhpcy5hZGRJdGVtKGF0dHJpYnV0ZXMpO1xyXG5cdFx0XHR0aGlzLnJlbG9hZENhcnRQcmV2aWV3KCk7XHJcblx0XHR9LmJpbmQodGhpcykpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogT3BlbnMgdGhlIGNhcnQgcHJldmlldy5cclxuXHQgKlxyXG5cdCAqIEByZXR1cm4gdm9pZCBcclxuXHQgKi9cclxuXHRvcGVuQ2FydFByZXZpZXcoKVxyXG5cdHtcclxuXHRcdGlmIChET00uaGFzQ2xhc3ModGhpcy5wcmV2aWV3RWxlbWVudCwgJ29wZW5lZCcpKSB7XHJcblx0XHRcdHRoaXMucmVsb2FkQ2FydFByZXZpZXcoKTtcclxuXHRcdH1cclxuXHJcblx0XHRET00uc3dpdGNoQ2xhc3Nlcyh0aGlzLnByZXZpZXdFbGVtZW50LCAnY2xvc2VkJywgJ29wZW5lZCcpO1xyXG5cdFx0dGhpcy5yZWxvYWRDYXJ0UHJldmlldygpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogVG9nZ2xlcyB0aGUgb3BlbmluZyBjbG9zaW5nIG9mIHRoZSBjYXJ0IHByZXZpZXcuXHJcblx0ICpcclxuXHQgKiBAcmV0dXJuIHZvaWQgXHJcblx0ICovXHJcblx0dG9nZ2xlQ2FydFByZXZpZXcoKVxyXG5cdHtcclxuXHRcdGxldCBvcGVuaW5nID0gRE9NLnRvZ2dsZUNsYXNzKHRoaXMucHJldmlld0VsZW1lbnQsICdvcGVuZWQnLCAnY2xvc2VkJyk7XHJcblx0XHRcdFxyXG5cdFx0aWYgKG9wZW5pbmcpIHtcclxuXHRcdFx0dGhpcy5yZWxvYWRDYXJ0UHJldmlldygpO1x0XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBSZXRyaWV2ZSB0aGUgY2FydHMgaXRlbXMgZnJvbSB0aGUgY29va2llLlxyXG5cdCAqXHJcblx0ICogQHJldHVybiBvYmplY3RcclxuXHQgKi9cclxuXHRnZXRDYXJ0SXRlbXMoKVxyXG5cdHtcclxuXHRcdGxldCBjYXJ0ID0gQ29va2llLmdldCh0aGlzLnNldHRpbmdzLmNvb2tpZV9uYW1lKTtcclxuXHJcblx0XHRyZXR1cm4gKGNhcnQpID8gY2FydC5pdGVtcyA6IFtdO1xyXG5cdH1cclxufVxyXG5cclxuLyoqXHJcbiAqIENsb3NlcyB0aGUgY2FydCBwcmV2aWV3IGVsZW1lbnQuXHJcbiAqXHJcbiAqIEBwYXJhbSBldmVudC5jbGlja1xyXG4gKi9cclxuZnVuY3Rpb24gY2xvc2UoZXZlbnQpIHtcclxuXHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdERPTS5zd2l0Y2hDbGFzc2VzKHRoaXMucHJldmlld0VsZW1lbnQsICdvcGVuZWQnLCAnY2xvc2VkJyk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBDcmVhdGVzIHRoZSBjYXJ0IHN2ZyBpY29uLlxyXG4gKlxyXG4gKiBAcmV0dXJuIFNWR1NWR0VsZW1lbnRcclxuICovXHJcbmZ1bmN0aW9uIGNyZWF0ZUljb24oKSB7XHJcblx0bGV0IHN2ZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnROUyhcImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIsIFwic3ZnXCIpO1xyXG5cdGxldCBnID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKFwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiwgXCJnXCIpO1xyXG5cdGxldCBwYXRoID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKFwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiwgXCJwYXRoXCIpO1xyXG5cclxuXHRzdmcuc2V0QXR0cmlidXRlKCd2ZXJzaW9uJywgJzEuMScpO1xyXG5cdHN2Zy5zZXRBdHRyaWJ1dGUoJ3htbG5zJywgJ2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJyk7XHJcblx0c3ZnLnNldEF0dHJpYnV0ZSgneG1sbnM6eGxpbmsnLCAnaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluaycpO1xyXG5cdHN2Zy5zZXRBdHRyaWJ1dGUoJ3gnLCAnMHB4Jyk7XHJcblx0c3ZnLnNldEF0dHJpYnV0ZSgneScsICcwcHgnKTtcclxuXHRzdmcuc2V0QXR0cmlidXRlKCd3aWR0aCcsICc0NDYuODQzcHgnKTtcclxuXHRzdmcuc2V0QXR0cmlidXRlKCdoZWlnaHQnLCAnNDQ2Ljg0M3B4Jyk7XHJcblx0c3ZnLnNldEF0dHJpYnV0ZSgndmlld0JveCcsICcwIDAgNDQ2Ljg0MyA0NDYuODQzJyk7XHJcblx0c3ZnLnNldEF0dHJpYnV0ZSgnc3R5bGUnLCAnZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA0NDYuODQzIDQ0Ni44NDM7Jyk7XHJcblx0c3ZnLnNldEF0dHJpYnV0ZSgneG1sOnNwYWNlJywgJ3ByZXNlcnZlJyk7XHJcblxyXG5cdHBhdGguc2V0QXR0cmlidXRlKCdkJywgJ000NDQuMDksOTMuMTAzYy0yLjY5OC0zLjY5OS03LjAwNi01Ljg4OC0xMS41ODQtNS44ODhIMTA5LjkyYy0wLjYyNSwwLTEuMjQ5LDAuMDM4LTEuODUsMC4xMTlsLTEzLjI3Ni0zOC4yN2MtMS4zNzYtMy45NTgtNC40MDYtNy4xMTMtOC4zLTguNjQ2TDE5LjU4NiwxNC4xMzRjLTcuMzc0LTIuODg3LTE1LjY5NSwwLjczNS0xOC41OTEsOC4xYy0yLjg5MSw3LjM2OSwwLjczLDE1LjY5NSw4LjEsMTguNTkxbDYwLjc2OCwyMy44NzJsNzQuMzgxLDIxNC4zOTljLTMuMjgzLDEuMTQ0LTYuMDY1LDMuNjYzLTcuMzMyLDcuMTg3bC0yMS41MDYsNTkuNzM5Yy0xLjMxOCwzLjY2My0wLjc3NSw3LjczMywxLjQ2OCwxMC45MTZjMi4yNCwzLjE4Myw1Ljg4Myw1LjA3OCw5Ljc3Myw1LjA3OGgxMS4wNDRjLTYuODQ0LDcuNjE2LTExLjA0NCwxNy42NDYtMTEuMDQ0LDI4LjY3NWMwLDIzLjcxOCwxOS4yOTgsNDMuMDEyLDQzLjAxMiw0My4wMTJzNDMuMDEyLTE5LjI5NCw0My4wMTItNDMuMDEyYzAtMTEuMDI5LTQuMi0yMS4wNTktMTEuMDQ0LTI4LjY3NWg5My43NzZjLTYuODQ3LDcuNjE2LTExLjA0OCwxNy42NDYtMTEuMDQ4LDI4LjY3NWMwLDIzLjcxOCwxOS4yOTQsNDMuMDEyLDQzLjAxMyw0My4wMTJjMjMuNzE4LDAsNDMuMDEyLTE5LjI5NCw0My4wMTItNDMuMDEyYzAtMTEuMDI5LTQuMi0yMS4wNTktMTEuMDQzLTI4LjY3NWgxMy40MzNjNi41OTksMCwxMS45NDctNS4zNDksMTEuOTQ3LTExLjk0OGMwLTYuNTk5LTUuMzQ5LTExLjk0Ny0xMS45NDctMTEuOTQ3SDE0My42NDdsMTMuMzE5LTM2Ljk5NmMxLjcyLDAuNzI0LDMuNTc4LDEuMTUyLDUuNTIzLDEuMTUyaDIxMC4yNzhjNi4yMzQsMCwxMS43NTEtNC4wMjcsMTMuNjUtOS45NTlsNTkuNzM5LTE4Ni4zODdDNDQ3LjU1NywxMDEuNTY3LDQ0Ni43ODgsOTYuODAyLDQ0NC4wOSw5My4xMDN6IE0xNjkuNjU5LDQwOS44MDdjLTEwLjU0MywwLTE5LjExNi04LjU3My0xOS4xMTYtMTkuMTE2czguNTczLTE5LjExNywxOS4xMTYtMTkuMTE3czE5LjExNiw4LjU3NCwxOS4xMTYsMTkuMTE3UzE4MC4yMDIsNDA5LjgwNywxNjkuNjU5LDQwOS44MDd6IE0zMjcuMzY3LDQwOS44MDdjLTEwLjU0MywwLTE5LjExNy04LjU3My0xOS4xMTctMTkuMTE2czguNTc0LTE5LjExNywxOS4xMTctMTkuMTE3YzEwLjU0MiwwLDE5LjExNiw4LjU3NCwxOS4xMTYsMTkuMTE3UzMzNy45MDksNDA5LjgwNywzMjcuMzY3LDQwOS44MDd6IE00MDIuNTIsMTQ4LjE0OWgtNzMuMTYxVjExNS44OWg4My40OTlMNDAyLjUyLDE0OC4xNDl6IE0zODEuNDUzLDIxMy44NjFoLTUyLjA5NHYtMzcuMDM4aDYzLjk2N0wzODEuNDUzLDIxMy44NjF6IE0yMzQuNTcxLDIxMy44NjF2LTM3LjAzOGg2Ni4xMTN2MzcuMDM4SDIzNC41NzF6IE0zMDAuNjg0LDI0Mi41Mzh2MzEuMDY0aC02Ni4xMTN2LTMxLjA2NEgzMDAuNjg0eiBNMTM5LjExNSwxNzYuODIzaDY2Ljc4NHYzNy4wMzhoLTUzLjkzM0wxMzkuMTE1LDE3Ni44MjN6IE0yMzQuNTcxLDE0OC4xNDlWMTE1Ljg5aDY2LjExM3YzMi4yNTlIMjM0LjU3MXogTTIwNS44OTgsMTE1Ljg5djMyLjI1OWgtNzYuNzM0bC0xMS4xOTEtMzIuMjU5SDIwNS44OTh6IE0xNjEuOTE2LDI0Mi41MzhoNDMuOTgydjMxLjA2NGgtMzMuMjA2TDE2MS45MTYsMjQyLjUzOHogTTMyOS4zNTksMjczLjYwM3YtMzEuMDY0aDQyLjkwOWwtOS45NTUsMzEuMDY0SDMyOS4zNTl6Jyk7XHJcblxyXG5cdGcuYXBwZW5kQ2hpbGQocGF0aCk7XHJcblx0c3ZnLmFwcGVuZENoaWxkKGcpO1xyXG5cclxuXHRyZXR1cm4gc3ZnO1xyXG59XHJcblxyXG4vKipcclxuICogQ3JlYXRlcyB0aGUgY2FydCBsb2FkZXIgaWNvbi5cclxuICpcclxuICogQHJldHVybiBTVkdTVkdFbGVtZW50XHJcbiAqL1xyXG5mdW5jdGlvbiBjcmVhdGVMb2FkZXIoKSB7XHJcblx0bGV0IHN2ZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnROUyhcImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIsIFwic3ZnXCIpO1xyXG5cdGxldCBjb3VudCA9IDEyO1xyXG5cdGxldCBncm91cHMgPSBbXTtcclxuXHRsZXQgcmVjdGFuZ2VscyA9IFtdO1xyXG5cdGxldCBhbmltYXRpb25zID0gW107XHJcblxyXG5cdHN2Zy5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgJ2xkcy1zcGlubmVyJyk7XHJcblx0c3ZnLnNldEF0dHJpYnV0ZSgnd2lkdGgnLCAnMjAwcHgnKTtcclxuXHRzdmcuc2V0QXR0cmlidXRlKCdoZWlnaHQnLCAnMjAwcHgnKTtcclxuXHRzdmcuc2V0QXR0cmlidXRlKCd4bWxucycsICdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZycpO1xyXG5cdHN2Zy5zZXRBdHRyaWJ1dGUoJ3htbG5zOnhsaW5rJywgJ2h0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsnKTtcclxuXHRzdmcuc2V0QXR0cmlidXRlKCd2aWV3Qm94JywgJzAgMCAxMDAgMTAwJyk7XHJcblx0c3ZnLnNldEF0dHJpYnV0ZSgncHJlc2VydmVBc3BlY3RSYXRpbycsICd4TWlkWU1pZCcpO1xyXG5cdHN2Zy5zZXRBdHRyaWJ1dGUoJ3N0eWxlJywgJ2JhY2tncm91bmQ6IG5vbmU7Jyk7XHJcblx0XHJcblx0dmFyIHJvdGF0aW9uID0gMDtcclxuXHJcblx0Zm9yICh2YXIgaSA9IDA7IGkgPCBjb3VudDsgaSsrKSB7XHJcblx0XHRsZXQgZ3JvdXAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50TlMoXCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiLCBcImdcIik7XHJcblx0XHRncm91cC5zZXRBdHRyaWJ1dGUoJ3RyYW5zZm9ybScsICdyb3RhdGUoJyArIHJvdGF0aW9uICsgJyA1MCA1MCknKTtcclxuXHRcdHJvdGF0aW9uICs9IDMwO1xyXG5cdFx0Z3JvdXBzLnB1c2goZ3JvdXApO1xyXG5cdH1cclxuXHJcblx0Zm9yICh2YXIgaSA9IDA7IGkgPCBjb3VudDsgaSsrKSB7XHJcblx0XHRsZXQgcmVjdGFuZ2VsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKFwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiwgXCJyZWN0XCIpO1xyXG5cdFx0cmVjdGFuZ2VsLnNldEF0dHJpYnV0ZSgneCcsICc0NycpO1xyXG5cdFx0cmVjdGFuZ2VsLnNldEF0dHJpYnV0ZSgneScsICcyNCcpO1xyXG5cdFx0cmVjdGFuZ2VsLnNldEF0dHJpYnV0ZSgncngnLCAnOS40Jyk7XHJcblx0XHRyZWN0YW5nZWwuc2V0QXR0cmlidXRlKCdyeScsICc0LjgnKTtcclxuXHRcdHJlY3RhbmdlbC5zZXRBdHRyaWJ1dGUoJ3dpZHRoJywgJzYnKTtcclxuXHRcdHJlY3RhbmdlbC5zZXRBdHRyaWJ1dGUoJ2hlaWdodCcsICcxMicpO1xyXG5cdFx0cmVjdGFuZ2VsLnNldEF0dHJpYnV0ZSgnZmlsbCcsICcjNDY1OGFjJyk7XHJcblx0XHRyZWN0YW5nZWxzLnB1c2gocmVjdGFuZ2VsKTtcclxuXHR9XHJcblxyXG5cdHZhciBiZWdpbiA9IDAuMDkgKiAxMTtcclxuXHJcblx0Zm9yICh2YXIgaSA9IDA7IGkgPCBjb3VudDsgaSsrKSB7XHJcblx0XHRsZXQgYW5pbWF0ZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnROUyhcImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIsIFwiYW5pbWF0ZVwiKTtcclxuXHRcdGFuaW1hdGUuc2V0QXR0cmlidXRlKCdhdHRyaWJ1dGVOYW1lJywgJ29wYWNpdHknKTtcclxuXHRcdGFuaW1hdGUuc2V0QXR0cmlidXRlKCd2YWx1ZXMnLCAnMTswJyk7XHJcblx0XHRhbmltYXRlLnNldEF0dHJpYnV0ZSgndGltZXMnLCAnMDsxJyk7XHJcblx0XHRhbmltYXRlLnNldEF0dHJpYnV0ZSgnZHVyJywgJzFzJyk7XHJcblx0XHRhbmltYXRlLnNldEF0dHJpYnV0ZSgnYmVnaW4nLCBiZWdpbi50b0ZpeGVkKDgpICsgJ3MnKTtcclxuXHRcdGFuaW1hdGUuc2V0QXR0cmlidXRlKCdyZXBlYXRDb3VudCcsICdpbmRlZmluaXRlJyk7XHJcblx0XHRhbmltYXRpb25zLnB1c2goYW5pbWF0ZSk7XHJcblx0XHRiZWdpbiAtPSAwLjA5O1xyXG5cdH1cclxuXHJcblx0Zm9yICh2YXIgaSA9IDA7IGkgPCBncm91cHMubGVuZ3RoOyBpKyspIHtcclxuXHRcdGxldCBncm91cCA9IGdyb3Vwc1tpXTtcdFx0XHJcblx0XHRsZXQgcmVjdGFuZ2VsID0gcmVjdGFuZ2Vsc1tpXTtcclxuXHRcdGxldCBhbmltYXRlID0gYW5pbWF0aW9uc1tpXTtcclxuXHRcdHJlY3RhbmdlbC5hcHBlbmRDaGlsZChhbmltYXRlKTtcclxuXHRcdGdyb3VwLmFwcGVuZENoaWxkKHJlY3RhbmdlbCk7XHJcblx0XHRzdmcuYXBwZW5kQ2hpbGQoZ3JvdXApO1xyXG5cdH1cclxuXHJcblx0RE9NLmFkZENsYXNzKHN2ZywgJ2NhcnQtbG9hZGVyJyk7XHJcblxyXG5cdHJldHVybiBzdmc7XHRcclxufVxuXG4vKipcclxuICogQGZpbGUgXHJcbiAqIEZpbHRlciBjbGFzcy5cclxuICpcclxuICogVGhlIEZpbHRlciBPYmplY3QsIGhhbmRsZXMgdGhlIGZpbHRlciBvZiB0aGUgcHJvZHVjdHMvc2VydmljZXMuXHJcbiAqL1xyXG5cclxuLyoqXHJcbiAqIFRoZSBkZWZhdWx0IHNldHRpbmdzIG9mIHRoZSBmaWx0ZXIuXHJcbiAqL1xyXG5sZXQgZGVmYXVsdFNldHRpbmdzJDIgPSB7XHJcblx0ZWxlbWVudDogJy5maWx0ZXInLFxyXG5cdGNsYXNzOiAnJyxcclxuXHR3aWR0aDogJycsXHJcblx0aGVpZ2h0OiAnJyxcclxuXHRub19jc3M6IGZhbHNlLFxyXG59O1xyXG5cclxuLyoqXHJcbiAqIFN0b3JlcyB0aGUgY29udGFpbmVyIG9iamVjdC5cclxuICpcclxuICogQHZhciBcXENvcmVcXENvbnRhaW5lclxyXG4gKi9cclxubGV0IENvbnRhaW5lciQzO1xyXG5cclxuY2xhc3MgRmlsdGVyIFxyXG57XHJcblx0LyoqXHJcblx0ICogLSBJbml0aWFsaXplIHRoZSBJb0MgY29udGFpbmVyLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIFxcQ29yZVxcQ29udGFpbmVyIHwgY29udGFpbmVyXHJcblx0ICogQHJldHVybiB2b2lkXHJcblx0ICovXHJcblx0Y29uc3RydWN0b3IoY29udGFpbmVyKSBcclxuXHR7XHJcblx0XHRDb250YWluZXIkMyA9IGNvbnRhaW5lcjtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFNldHVwIHRoZSBmaWx0ZXIgY2xhc3MuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gb2JqZWN0IHwgc2V0dGluZ3NcclxuXHQgKiBAcmV0dXJuIHZvaWRcclxuXHQgKi9cclxuXHRzZXR1cChzZXR0aW5ncylcclxuXHR7XHJcblx0XHRpZih0eXBlb2Ygc2V0dGluZ3MgIT0gJ29iamVjdCcpIHtcclxuXHRcdFx0dGhyb3cgbmV3IEludmFsaWRBcmd1bWVudEV4Y2VwdGlvbiQxO1xyXG5cdFx0fVxyXG5cclxuXHRcdHRoaXMuc2V0dGluZ3MgPSBDb21tb24uZXh0ZW5kKGRlZmF1bHRTZXR0aW5ncyQyLCBzZXR0aW5ncyk7XHJcblxyXG5cdFx0ZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsIGZ1bmN0aW9uKCkge1xyXG5cclxuXHRcdFx0dGhpcy5zZXRFbGVtZW50KHRoaXMuc2V0dGluZ3MuZWxlbWVudCk7XHJcblxyXG5cdFx0XHR0aGlzLmFkZFN0eWxlVGFnKCk7XHRcclxuXHRcdH0uYmluZCh0aGlzKSk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBTZXRzIHRoZSBlbGVtZW50IHRvIGJlIGJvdW5kIHRvLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIHN0cmluZyB8IHNlbGVjdG9yXHJcblx0ICogQHJldHVybiB2b2lkXHJcblx0ICovXHJcblx0c2V0RWxlbWVudChzZWxlY3RvcilcclxuXHR7XHJcblx0XHR0aGlzLndyYXBwZXIgPSBET00uZmluZChzZWxlY3Rvcik7XHJcblx0XHRcclxuXHRcdERPTS5hZGRDbGFzcyh0aGlzLndyYXBwZXIsIHRoaXMuc2V0dGluZ3MuY2xhc3MpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQWRkIHRoZSBlQ29tbWVyY2Ugc3R5bGUgdGFncyB0byB0aGUgRE9NLlxyXG5cdCAqL1xyXG5cdGFkZFN0eWxlVGFnKCkgXHJcblx0e1xyXG5cdFx0aWYgKERPTS5maW5kKCcjVHVyYm8tZUNvbW1lcmNlLUZpbHRlcicpKSB7XHJcblx0XHRcdHJldHVybjtcclxuXHRcdH1cclxuXHJcblx0XHRpZiAodGhpcy5zZXR0aW5ncy5ub19jc3MpIHtcclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0fVxyXG5cclxuXHRcdGxldCB3aWR0aCA9ICh0aGlzLnNldHRpbmdzLndpZHRoKSA/ICd3aWR0aDonICsgdGhpcy5zZXR0aW5ncy53aWR0aCArICc7JyA6ICcnO1xyXG5cdFx0bGV0IG1pbldpZHRoID0gdGhpcy5zZXR0aW5ncy5taW5fd2lkdGggfHwgJzIwMHB4JztcclxuXHRcdGxldCBoZWlnaHQgPSB0aGlzLnNldHRpbmdzLmhlaWdodCB8fCAnYXV0byc7XHJcblxyXG5cdFx0bGV0IGNzcyA9IGBcclxuXHRcdFx0JHt0aGlzLnNldHRpbmdzLmVsZW1lbnR9IHtcclxuXHRcdFx0XHRwb3NpdGlvbjogcmVsYXRpdmU7XHJcblx0XHRcdFx0bWFyZ2luOiA1cHggNXB4O1xyXG5cdFx0XHRcdGJvcmRlcjogMXB4IHNvbGlkICNlNGU0ZTQ7XHJcblx0XHRcdFx0JHt3aWR0aH1cclxuXHRcdFx0XHRtaW4td2lkdGg6ICR7bWluV2lkdGh9O1xyXG5cdFx0XHRcdGhlaWdodDogJHtoZWlnaHR9O1xyXG5cdFx0XHRcdG1pbi1oZWlnaHQ6IDIwMHB4O1xyXG5cdFx0XHRcdGNvbG9yOiAjZmZmZmZmO1xyXG5cdFx0XHRcdG92ZXJmbG93OiBoaWRkZW47XHJcblx0XHRcdH1cclxuXHJcblx0XHRgO1xyXG5cdCAgICBcclxuXHQgICAgRE9NLmFkZFN0eWxlKCdUdXJiby1lQ29tbWVyY2UtRmlsdGVyJywgY3NzKTtcclxuXHR9XHJcbn1cblxuLyoqXHJcbiAqIEBmaWxlIFxyXG4gKiBQcm9kdWN0cyBjbGFzcy5cclxuICpcclxuICogVGhlIFByb2R1Y3RzIGNvbXBvbmVudCwgaGFuZGxlcyB0aGUgcHJvZHVjdHMgdGFza3MuXHJcbiAqL1xyXG5cclxuXHJcbi8qKlxyXG4gKiBUaGUgZGVmYXVsdCBzZXR0aW5ncyBvZiBlYWNoIHByb2R1Y3QuXHJcbiAqXHJcbiAqIEB2YXIgb2JqZWN0XHJcbiAqL1xyXG5sZXQgZGVmYXVsdFNldHRpbmdzJDMgPSB7XHJcblx0ZWxlbWVudDogJy5wcm9kdWN0cycsXHJcblx0Y2xhc3M6ICcnLFxyXG5cdGl0ZW1fY2xhc3M6ICcnLFxyXG5cdGFkZF9idXR0b25fY2xhc3M6ICdidG4gYnRuLXByaW1hcnknLFxyXG5cdGZhdm9yaXRlX2J1dHRvbl9jbGFzczogJ2J0biBidG4tZGFuZ2VyJyxcclxuXHR3aWR0aDogJzIwMHB4JyxcclxuXHRoZWlnaHQ6ICcyNTBweCcsXHJcblx0YXR0cmlidXRlczogWyduYW1lJywgJ3ByaWNlJywgJ2RlbGl2ZXJ5VGltZScsICdpbWFnZSddLFxyXG5cdHVybDogJ3Byb2R1Y3RzLnBocCcsXHJcblx0bm9fY3NzOiBmYWxzZSxcclxufTtcclxuXHJcbi8qKlxyXG4gKiBTdG9yZXMgdGhlIGNvbnRhaW5lciBvYmplY3QuXHJcbiAqIFxyXG4gKiBAdmFyIFxcQ29yZVxcQ29udGFpbmVyXHJcbiAqL1xyXG5sZXQgQ29udGFpbmVyJDQ7XHJcblxyXG4vKipcclxuICogU3RvcmVzIHRoZSBjb250YWluZXIgb2JqZWN0LlxyXG4gKiBcclxuICogQHZhciBcXENvcmVcXEV2ZW50TWFuYWdlclxyXG4gKi9cclxubGV0IEV2ZW50TWFuYWdlciQzO1xyXG5cclxuLyoqXHJcbiAqIFN0b3JlcyB0aGUgcmVxdWVzdCBvYmplY3QuXHJcbiAqIFxyXG4gKiBAdmFyIFxcSGVscGVyXFxSZXF1ZXN0IFxyXG4gKi9cclxubGV0IEh0dHAkMTtcclxuXHJcbi8qKlxyXG4gKiBTdG9yZXMgdGhlIGNodW5rZWQgcGVyIFxyXG4gKiBwYWdlIHByb2R1Y3RzLlxyXG4gKiBcclxuICogQHZhciBhcnJheVxyXG4gKi9cclxubGV0IGNodW5rZWRQcm9kdWN0cztcclxuXHJcbmNsYXNzIFByb2R1Y3RzIFxyXG57XHJcblx0LyoqXHJcblx0ICogSW5pdGFsaXplIHRoZSBDb250YWluZXIuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gXFxDb3JlXFxDb250YWluZXIgfCBjb250YWluZXJcclxuXHQgKiBAcGFyYW0gXFxIZWxwZXJzXFxSZXF1ZXN0IHwgaHR0cFxyXG5cdCAqIEByZXR1cm4gdm9pZFxyXG5cdCAqL1xyXG5cdGNvbnN0cnVjdG9yKGNvbnRhaW5lciwgaHR0cCwgZXZlbnRNYW5hZ2VyKSBcclxuXHR7XHJcblx0XHRDb250YWluZXIkNCA9IGNvbnRhaW5lcjtcclxuXHRcdEh0dHAkMSA9IGh0dHA7XHJcblx0XHRFdmVudE1hbmFnZXIkMyA9IGV2ZW50TWFuYWdlcjtcclxuXHRcdGNodW5rZWRQcm9kdWN0cyA9IFtdO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogU2V0cyB0aGUgZ2l2ZW4gc2V0dGluZ3MgZnJvbSB0aGUgdXNlci5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSBvYmplY3QgfCBzZXR0aW5nc1xyXG5cdCAqIEByZXR1cm4gdm9pZFxyXG5cdCAqL1xyXG5cdHNldHVwKHNldHRpbmdzKVxyXG5cdHtcclxuXHRcdGlmICh0eXBlb2Ygc2V0dGluZ3MgIT0gJ29iamVjdCcpIHtcclxuXHRcdFx0dGhyb3cgbmV3IEludmFsaWRBcmd1bWVudEV4Y2VwdGlvbiQxO1xyXG5cdFx0fVxyXG5cclxuXHRcdHRoaXMuc2V0dGluZ3MgPSBDb21tb24uZXh0ZW5kKGRlZmF1bHRTZXR0aW5ncyQzLCBzZXR0aW5ncyk7XHJcblx0XHR0aGlzLnRvdGFsSXRlbXMgPSBudWxsO1xyXG5cclxuXHRcdGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCBmdW5jdGlvbigpIHtcclxuXHJcblx0XHRcdHRoaXMuc2V0RWxlbWVudCh0aGlzLnNldHRpbmdzLmVsZW1lbnQpO1xyXG5cclxuXHRcdFx0dGhpcy5hZGRTdHlsZVRhZygpO1x0XHJcblxyXG5cdFx0XHR0aGlzLmxvYWRQcm9kdWN0cygxKTtcclxuXHRcdH0uYmluZCh0aGlzKSk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBMb2FkcyB0aGUgcHJvZHVjdHMgZm9yIHRoZSBwYWdlLlxyXG5cdCAqIFxyXG5cdCAqIEBwYXJhbSBudW1iZXIgfCBwYWdlTnVtYmVyXHJcblx0ICogQHJldHVybiB2b2lkXHJcblx0ICovXHJcblx0bG9hZFByb2R1Y3RzKHBhZ2VOdW1iZXIgPSAxKVxyXG5cdHtcclxuXHRcdGlmIChDb250YWluZXIkNC5QYWdpbmF0aW9uICYmIENvbnRhaW5lciQ0LlBhZ2luYXRpb24uYm9vdGVkKSB7XHJcblx0XHRcdHN3aXRjaChDb250YWluZXIkNC5QYWdpbmF0aW9uLnNldHRpbmdzLnByb2NjZXNzaW5nKSBcclxuXHRcdFx0e1xyXG5cdFx0XHRcdGNhc2UgJ2NsaWVudC1zaWRlJzpcclxuXHRcdFx0XHRcdHJldHVybiB0aGlzLmxvYWRQYWdlUHJvZHVjdHNCeUNsaWVudChwYWdlTnVtYmVyKTtcclxuXHRcdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRcdGNhc2UgJ3NlcnZlci1zaWRlJzpcclxuXHRcdFx0XHRcdHJldHVybiB0aGlzLmxvYWRQYWdlUHJvZHVjdHNCeVNlcnZlcihwYWdlTnVtYmVyKTtcclxuXHRcdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRcdGRlZmF1bHQ6XHJcblx0XHRcdFx0XHR0aHJvdyBuZXcgSW52YWxpZEFyZ3VtZW50RXhjZXB0aW9uJDEoJ2ZvciBwcm9jY2Vzc2luZyB5b3UgY2FuIGNob29zZSBcXCdzZXJ2ZXItc2lkZVxcJyBvciBcXCdjbGllbnQtc2lkZVxcJyBvcHRpb25zLicpO1xyXG5cdFx0XHR9XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHR0aGlzLmxvYWRQYWdlUHJvZHVjdHNCeVNlcnZlcigpO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogTG9hZHMgdGhlIHByb2R1Y3RzIGFuZCBcclxuXHQgKiByZXBsYWNlIHRoZW0gaW4gdGhlIGRpdiBjb250YWluZXIuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gbnVtYmVyIHwgcGFnZU51bWJlclxyXG5cdCAqIEByZXR1cm4gdm9pZFxyXG5cdCAqL1xyXG5cdGxvYWRQYWdlUHJvZHVjdHNCeVNlcnZlcihwYWdlTnVtYmVyID0gbnVsbClcclxuXHR7XHJcblx0XHRsZXQgcmVxdWVzdCA9IHRoaXMuZ2V0UHJvZHVjdHMocGFnZU51bWJlcik7XHJcblxyXG5cdFx0cmVxdWVzdC50aGVuKGZ1bmN0aW9uKHByb2R1Y3RzKSB7XHJcblxyXG5cdFx0XHR0aGlzLmN1cnJlbnRJdGVtcyA9IHByb2R1Y3RzO1xyXG5cclxuXHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLmN1cnJlbnRJdGVtcy5sZW5ndGg7IGkrKykge1xyXG5cdFx0XHRcdHZhciBwcm9kdWN0ID0gdGhpcy5jdXJyZW50SXRlbXNbaV07XHJcblx0XHRcdFx0RXZlbnRNYW5hZ2VyJDMucHVibGlzaCgncHJvZHVjdHMubG9hZGluZycsIHByb2R1Y3QpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRFdmVudE1hbmFnZXIkMy5wdWJsaXNoKCdwcm9kdWN0cy5sb2FkZWQnLCBwcm9kdWN0cyk7XHJcblx0XHRcdHRoaXMucmVwbGFjZUl0ZW1zKHByb2R1Y3RzKTtcclxuXHRcdFx0cmVzb2x2ZSgpO1xyXG5cdFx0fS5iaW5kKHRoaXMpKS5jYXRjaChmdW5jdGlvbihlcnJvcikge1xyXG5cclxuXHRcdH0pO1xyXG5cclxuXHRcdHJldHVybiByZXF1ZXN0O1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogTG9hZHMgdGhlIHByb2R1Y3RzIGFuZCBcclxuXHQgKiByZXBsYWNlIHRoZW0gaW4gdGhlIGRpdiBjb250YWluZXIuXHJcblx0ICpcclxuXHQgKiBAcmV0dXJuIHZvaWRcclxuXHQgKi9cclxuXHRsb2FkUGFnZVByb2R1Y3RzQnlDbGllbnQocGFnZU51bWJlcilcclxuXHR7XHJcblx0XHRsZXQgcmVxdWVzdDtcclxuXHJcblx0XHRpZiAodGhpcy50b3RhbEl0ZW1zID09IG51bGwpIHsgLy8gbmVlZCB0byBmZXRjaCB0aGVtIGZyb20gdGhlIHNlcnZlci5cclxuXHRcdFx0cmVxdWVzdCA9IHRoaXMuZ2V0UHJvZHVjdHMoKTtcclxuXHRcdH0gZWxzZSB7IC8vIG5vIG5lZWQgdG8gd2FpdCBjYW4gcmVzb2x2ZSBpbW1lZGlhdGVseSB3aXRoIHRoZSBwcm9kdWN0cy4gXHJcblx0XHRcdHJlcXVlc3QgPSBQcm9taXNlLnJlc29sdmUodGhpcy50b3RhbEl0ZW1zKTtcclxuXHRcdH1cclxuXHJcblx0XHRyZXF1ZXN0LnRoZW4oZnVuY3Rpb24ocHJvZHVjdHMpIHtcclxuXHRcdFx0dGhpcy50b3RhbEl0ZW1zID0gcHJvZHVjdHM7XHJcblxyXG5cdFx0XHRsZXQgcGFnZXMgPSB0aGlzLmNhbGN1bGF0ZUNsaWVudFBhZ2VzKHByb2R1Y3RzKTtcclxuXHJcblx0XHRcdHRoaXMuY3VycmVudEl0ZW1zID0gcGFnZXNbcGFnZU51bWJlci0xXTtcclxuXHJcblx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5jdXJyZW50SXRlbXMubGVuZ3RoOyBpKyspIHtcclxuXHRcdFx0XHR2YXIgcHJvZHVjdCA9IHRoaXMuY3VycmVudEl0ZW1zW2ldO1xyXG5cdFx0XHRcdEV2ZW50TWFuYWdlciQzLnB1Ymxpc2goJ3Byb2R1Y3RzLmxvYWRpbmcnLCBwcm9kdWN0KTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0RXZlbnRNYW5hZ2VyJDMucHVibGlzaCgncHJvZHVjdHMubG9hZGVkJywgcHJvZHVjdHMpO1xyXG5cdFx0XHR0aGlzLnJlcGxhY2VJdGVtcyh0aGlzLmN1cnJlbnRJdGVtcyk7XHJcblx0XHRcdFByb21pc2UucmVzb2x2ZSh0aGlzLmN1cnJlbnRJdGVtcyk7XHJcblxyXG5cdFx0fS5iaW5kKHRoaXMpKS5jYXRjaChmdW5jdGlvbihlcnJvcikge1xyXG5cclxuXHRcdH0pO1xyXG5cclxuXHRcdHJldHVybiByZXF1ZXN0O1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQ2FsY3VsYXRlcyB0aGUgYW1vdW50IG9mIHBhZ2VzIGZvciB0aGUgY2xpZW50LlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIGFycmF5IHwgcHJvZHVjdHNcclxuXHQgKiBAcmV0dXJuIGFycmF5XHJcblx0ICovXHJcblx0Y2FsY3VsYXRlQ2xpZW50UGFnZXMocHJvZHVjdHMpXHJcblx0e1x0XHJcblx0XHQvLyBXZSBhcmUgdXNpbmcgcGFnaW5hdGlvbiBzbyB3ZSBuZWVkIHRvIHVwZGF0ZSBpdCB0b28uXHJcblx0XHRDb250YWluZXIkNC5QYWdpbmF0aW9uLnNldHRpbmdzLnRvdGFsX2l0ZW1zID0gcHJvZHVjdHMubGVuZ3RoO1xyXG5cdFx0XHJcblx0XHRsZXQgcGVyUGFnZSA9IENvbnRhaW5lciQ0LlBhZ2luYXRpb24uc2V0dGluZ3MucGVyX3BhZ2U7IFxyXG5cclxuXHRcdC8vIFdlIG5lZWQgdG8gY2FsY3VsYXRlIHRoZSBwYWdlcyBvbiBmdWxsIGh0dHAgcmVxdWVzdCBcclxuXHRcdC8vIG9ubHkgb25jZS4gc28gd2UgY2hlY2sgdG8gc2VlIGlmIHdlIGhhdmUgcmVzdWx0cyBpbiBvdXIgY2FjaGUuXHJcblx0XHRpZiAoY2h1bmtlZFByb2R1Y3RzLmxlbmd0aCAhPSAwKSB7XHJcblx0XHRcdHJldHVybiBjaHVua2VkUHJvZHVjdHM7XHJcblx0XHR9XHJcblxyXG5cdFx0Y2h1bmtlZFByb2R1Y3RzID0gQ29tbW9uLmFycmF5X2NodW5rKHByb2R1Y3RzLCBwZXJQYWdlKTtcclxuXHRcdHJldHVybiBjaHVua2VkUHJvZHVjdHM7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBTZXRzIHRoZSBET00gZWxlbWVudCBcclxuXHQgKiBmb3IgcG9wdWxhdGluZyB0aGUgcHJvZHVjdHMuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gc3RyaW5nIHwgc2VsZWN0b3JcclxuXHQgKiBAcmV0dXJuIHZvaWRcclxuXHQgKi9cclxuXHRzZXRFbGVtZW50KHNlbGVjdG9yKVxyXG5cdHtcclxuXHRcdHRoaXMud3JhcHBlciA9IERPTS5maW5kKHNlbGVjdG9yKTtcclxuXHJcblx0XHRpZiAodGhpcy53cmFwcGVyKSB7XHJcblx0XHRcdERPTS5hZGRDbGFzcyh0aGlzLndyYXBwZXIsIHRoaXMuc2V0dGluZ3MuY2xhc3MpO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogUmVwbGFjZSBpdGVtcyBpbiBcclxuXHQgKiB0aGUgcHJvZHVjdHMgY29udGFpbmVyLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIGFycmF5IHwgaXRlbXNcclxuXHQgKiBAcmV0dXJuIGFycmF5XHJcblx0ICovXHJcblx0cmVwbGFjZUl0ZW1zKGl0ZW1zKSBcclxuXHR7XHJcblx0XHRpZiAoISBBcnJheS5pc0FycmF5KGl0ZW1zKSB8fCAoaXRlbXMubGVuZ3RoIDw9IDAgJiYgdHlwZW9mIGl0ZW1zWzBdID09ICdzdHJpbmcnKSkge1xyXG5cdFx0XHR0aHJvdyBuZXcgSW52YWxpZEFyZ3VtZW50RXhjZXB0aW9uJDE7XHJcblx0XHR9XHJcblxyXG5cdFx0bGV0IHByb2R1Y3RzID0gdGhpcy5idWlsZFByb2R1Y3RzKGl0ZW1zLCB0aGlzLnNldHRpbmdzLml0ZW1fY2xhc3MsICdkaXYnKTtcclxuXHJcblx0XHR0aGlzLndyYXBwZXIuaW5uZXJIVE1MID0gJyc7XHJcblx0XHRwcm9kdWN0cy5mb3JFYWNoKGZ1bmN0aW9uKHByb2R1Y3QpIHtcclxuXHRcdFx0dGhpcy53cmFwcGVyLmFwcGVuZENoaWxkKHByb2R1Y3QpO1xyXG5cdFx0fS5iaW5kKHRoaXMpKTtcclxuXHJcblx0XHRyZXR1cm4gaXRlbXM7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBNYWtlcyBhbiBBamF4IGNhbGwgdG8gdGhlIFxyXG5cdCAqIHNlcnZlciB3aXRob3V0IHBhcmFtZXRlcnMuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gbnVtYmVyIHwgcGFnZU51bWJlclxyXG5cdCAqIEByZXR1cm4gUHJvbWlzZVxyXG5cdCAqL1xyXG5cdGdldFByb2R1Y3RzKHBhZ2VOdW1iZXIgPSBudWxsKVxyXG5cdHtcclxuXHRcdGxldCBhY3Rpb24gPSAocGFnZU51bWJlcikgPyB0aGlzLnNldHRpbmdzLnVybCArICc/cGFnZT0nICsgcGFnZU51bWJlciA6IHRoaXMuc2V0dGluZ3MudXJsO1xyXG5cclxuXHRcdHJldHVybiBIdHRwJDEuZ2V0KHtcclxuXHRcdFx0dXJsOiBhY3Rpb24sXHJcblx0XHR9KTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEJ1aWxkcyB0aGUgaHRtbCBmb3IgdGhlIHByb2R1Y3RzLlxyXG5cdCAqIFxyXG5cdCAqIEBwYXJhbSBhcnJheSB8IGF0dHJpYnV0ZXNDb2xsZWN0aW9uXHJcblx0ICogQHBhcmFtIHN0cmluZyB8IGNsYXNzTmFtZVxyXG5cdCAqIEBwYXJhbSBzdHJpbmcgfCB0YWdUeXBlXHJcblx0ICogQHJldHVybiBhcnJheVxyXG5cdCAqL1xyXG5cdGJ1aWxkUHJvZHVjdHMoYXR0cmlidXRlc0NvbGxlY3Rpb24sIGNsYXNzTmFtZSwgdGFnVHlwZSkgXHJcblx0e1xyXG5cdFx0aWYoYXR0cmlidXRlc0NvbGxlY3Rpb24uY29uc3RydWN0b3IubmFtZSAhPSAnQXJyYXknICkge1xyXG5cdFx0XHR0aHJvdyBuZXcgSW52YWxpZEFyZ3VtZW50RXhjZXB0aW9uJDE7XHJcblx0XHR9XHJcblxyXG5cdFx0bGV0IGJ1aWx0UHJvZHVjdHMgPSBbXTtcclxuXHJcblx0XHRhdHRyaWJ1dGVzQ29sbGVjdGlvbi5mb3JFYWNoKGZ1bmN0aW9uKGF0dHJpYnV0ZXMpIHtcclxuXHRcdFx0bGV0IGJ1aWx0UHJvZHVjdCA9IHRoaXMuYnVpbGRQcm9kdWN0KGF0dHJpYnV0ZXMsIGNsYXNzTmFtZSwgdGFnVHlwZSk7XHJcblx0XHRcdGJ1aWx0UHJvZHVjdHMucHVzaChidWlsdFByb2R1Y3QpO1xyXG5cdFx0fS5iaW5kKHRoaXMpKTtcclxuXHJcblx0XHRyZXR1cm4gYnVpbHRQcm9kdWN0cztcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEJ1aWxkcyB0aGUgaHRtbCBmb3IgYSBzaW5nbGUgcHJvZHVjdC5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSBvYmplY3QgfCBhdHRyaWJ1dGVzXHJcblx0ICogQHBhcmFtIHN0cmluZyB8IGNsYXNzTmFtZVxyXG5cdCAqIEBwYXJhbSBzdHJpbmcgfCB0YWdUeXBlXHJcblx0ICogQHJldHVybiBvYmplY3RcclxuXHQgKi9cclxuXHRidWlsZFByb2R1Y3QoYXR0cmlidXRlcywgY2xhc3NOYW1lLCB0YWdUeXBlKSBcclxuXHR7XHJcblx0XHRpZiAodHlwZW9mIGF0dHJpYnV0ZXMgIT0gJ29iamVjdCcgfHwgdHlwZW9mIHRhZ1R5cGUgIT0gJ3N0cmluZycpIHtcclxuXHRcdFx0dGhyb3cgbmV3IEludmFsaWRBcmd1bWVudEV4Y2VwdGlvbiQxO1xyXG5cdFx0fVxyXG5cclxuXHRcdGNsYXNzTmFtZSA9IGNsYXNzTmFtZSB8fCBudWxsO1xyXG5cclxuXHRcdGxldCBwcm9kdWN0ID0gRE9NLmNyZWF0ZUVsZW1lbnQoJ2RpdicsIHtcclxuXHRcdFx0Y2xhc3M6ICdwcm9kdWN0J1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0RE9NLmFkZENsYXNzKHByb2R1Y3QsIGNsYXNzTmFtZSk7XHJcblxyXG5cdFx0bGV0IG92ZXJsYXkgPSBET00uY3JlYXRlRWxlbWVudCgnZGl2Jywge1xyXG5cdFx0XHRjbGFzczogJ3Byb2R1Y3Qtb3ZlcmxheScsXHJcblx0XHR9KTtcclxuXHJcblx0XHRwcm9kdWN0LmFwcGVuZENoaWxkKG92ZXJsYXkpO1xyXG5cclxuXHRcdGZvciAodmFyIGF0dHJpYnV0ZSBpbiBhdHRyaWJ1dGVzKSB7XHJcblx0XHRcdGlmICghIENvbW1vbi5pbl9hcnJheShhdHRyaWJ1dGUsIHRoaXMuc2V0dGluZ3MuYXR0cmlidXRlcykpIHtcclxuXHRcdFx0XHRjb250aW51ZTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0bGV0IHRhZyA9IERPTS5jcmVhdGVFbGVtZW50KHRhZ1R5cGUpO1xyXG5cclxuXHRcdFx0aWYgKGF0dHJpYnV0ZSA9PSAnaW1hZ2UnKSB7XHJcblx0XHRcdFx0bGV0IGltYWdlID0gRE9NLmNyZWF0ZUVsZW1lbnQoJ2ltZycsIHtcclxuXHRcdFx0XHRcdHNyYzogYXR0cmlidXRlc1thdHRyaWJ1dGVdXHJcblx0XHRcdFx0fSk7XHJcblx0XHRcdFx0cHJvZHVjdC5hcHBlbmRDaGlsZChpbWFnZSk7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0dGFnLmlubmVySFRNTCA9IGF0dHJpYnV0ZXNbYXR0cmlidXRlXSB8fCAnJztcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0RE9NLmFkZENsYXNzKHRhZywgJ3Byb2R1Y3QtJyArIFN0ci5rZWJhYkNhc2UoYXR0cmlidXRlKSk7XHJcblx0XHRcdG92ZXJsYXkuYXBwZW5kQ2hpbGQodGFnKTtcclxuXHRcdH1cclxuXHJcblx0XHRsZXQgdGFnID0gRE9NLmNyZWF0ZUVsZW1lbnQoJ2RpdicsIHtcclxuXHRcdFx0Y2xhc3M6ICdhY3Rpb24tYnV0dG9ucydcclxuXHRcdH0pO1xyXG5cclxuXHRcdGxldCBhZGRUb0NhcnQgPSBET00uY3JlYXRlRWxlbWVudCgnYnV0dG9uJywge1xyXG5cdFx0XHRjbGFzczogJ2FkZC10by1jYXJ0JyxcclxuXHRcdFx0dHlwZTogJ2J1dHRvbicsXHJcblx0XHRcdHRleHQ6ICcrJyxcclxuXHRcdH0pO1xyXG5cclxuXHRcdGxldCBmYXZvcml0ZSA9IERPTS5jcmVhdGVFbGVtZW50KCdidXR0b24nLCB7XHJcblx0XHRcdGNsYXNzOiAnZmF2b3JpdGUnLFxyXG5cdFx0XHR0eXBlOiAnYnV0dG9uJyxcclxuXHRcdFx0dGV4dDogJyZoZWFydHM7J1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0aWYgKHRoaXMuc2V0dGluZ3MuYWRkX2J1dHRvbl9jbGFzcykge1xyXG5cdFx0XHRET00uYWRkQ2xhc3MoYWRkVG9DYXJ0LCB0aGlzLnNldHRpbmdzLmFkZF9idXR0b25fY2xhc3MpO1xyXG5cdFx0fVxyXG5cclxuXHRcdGlmICh0aGlzLnNldHRpbmdzLmZhdm9yaXRlX2J1dHRvbl9jbGFzcykge1xyXG5cdFx0XHRET00uYWRkQ2xhc3MoZmF2b3JpdGUsIHRoaXMuc2V0dGluZ3MuZmF2b3JpdGVfYnV0dG9uX2NsYXNzKTtcclxuXHRcdH1cclxuXHJcblx0XHR0YWcuYXBwZW5kQ2hpbGQoYWRkVG9DYXJ0KTtcclxuXHRcdHRhZy5hcHBlbmRDaGlsZChmYXZvcml0ZSk7XHJcblxyXG5cdFx0YWRkVG9DYXJ0LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xyXG5cdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XHJcblx0XHRcdEV2ZW50TWFuYWdlciQzLnB1Ymxpc2goJ2NhcnQucHJvZHVjdHMuYWRkZWQnLCBhdHRyaWJ1dGVzKTtcclxuXHRcdH0pO1xyXG5cclxuXHRcdG92ZXJsYXkuYXBwZW5kQ2hpbGQodGFnKTtcclxuXHJcblx0XHRyZXR1cm4gcHJvZHVjdDtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEFkZCB0aGUgZUNvbW1lcmNlIHN0eWxlIHRhZ3MgdG8gdGhlIERPTS5cclxuXHQgKi9cclxuXHRhZGRTdHlsZVRhZygpIFxyXG5cdHtcclxuXHRcdGlmIChET00uZmluZCgnI1R1cmJvLWVDb21tZXJjZS1Qcm9kdWN0cycpKSB7XHJcblx0XHRcdHJldHVybjtcclxuXHRcdH1cclxuXHJcblx0XHRpZiAodGhpcy5zZXR0aW5ncy5ub19jc3MpIHtcclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0fVxyXG5cclxuXHRcdGxldCB3aWR0aCA9IHRoaXMuc2V0dGluZ3Mud2lkdGggfHwgJ2F1dG8nO1xyXG5cdFx0bGV0IGhlaWdodCA9IHRoaXMuc2V0dGluZ3MuaGVpZ2h0IHx8ICcyMDBweCc7XHJcblx0XHRsZXQgbWluV2lkdGggPSB0aGlzLnNldHRpbmdzLm1pbl93aWR0aCB8fCAnMjAwcHgnO1xyXG5cdFx0bGV0IG1heFdpZHRoID0gdGhpcy5zZXR0aW5ncy5tYXhfd2lkdGggfHwgJzI1MHB4JztcclxuXHJcblx0XHRsZXQgY3NzID0gYFxyXG5cdFx0XHQucHJvZHVjdCB7XHJcblx0XHRcdFx0cG9zaXRpb246IHJlbGF0aXZlO1xyXG5cdFx0XHRcdG1hcmdpbjogNXB4IDVweDtcclxuXHRcdFx0XHRib3JkZXI6IDFweCBzb2xpZCAjZTRlNGU0O1xyXG5cdFx0XHRcdHdpZHRoOiAke3dpZHRofTtcclxuXHRcdFx0XHRtaW4td2lkdGg6ICR7bWluV2lkdGh9O1xyXG5cdFx0XHRcdG1heC13aWR0aDogJHttYXhXaWR0aH07XHJcblx0XHRcdFx0aGVpZ2h0OiAke2hlaWdodH07XHJcblx0XHRcdFx0Y3Vyc29yOiBwb2ludGVyO1xyXG5cdFx0XHRcdGNvbG9yOiAjZmZmZmZmO1xyXG5cdFx0XHRcdG92ZXJmbG93OiBoaWRkZW47XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdC5wcm9kdWN0ID4gLnByb2R1Y3Qtb3ZlcmxheSB7XHJcblx0XHRcdFx0cG9zaXRpb246IGFic29sdXRlO1xyXG5cdFx0XHRcdHRvcDogMDtcclxuXHRcdFx0XHRsZWZ0OiAwO1xyXG5cdFx0XHRcdHdpZHRoOiAxMDAlO1xyXG5cdFx0XHRcdGhlaWdodDogMTAwJTtcclxuXHRcdFx0XHRvcGFjaXR5OiAwLjU7XHJcblx0XHRcdFx0ei1pbmRleDogNTtcclxuXHRcdFx0XHR0cmFuc2l0aW9uOiAxcyBhbGw7XHJcblx0XHRcdFx0dHJhbnNmb3JtOiB0cmFuc2xhdGVYKC0yNTBweCk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdC5wcm9kdWN0OmhvdmVyID4gLnByb2R1Y3Qtb3ZlcmxheSB7XHJcblx0XHRcdFx0YmFja2dyb3VuZDogcmdiYSgwLCAwLCAwLCAwLjQ1KTtcclxuXHRcdFx0XHR0cmFuc2Zvcm06IHRyYW5zbGF0ZVgoMHB4KTtcclxuXHRcdFx0XHRvcGFjaXR5OiAxO1xyXG5cdFx0XHRcdHRyYW5zaXRpb246IDAuNXMgYWxsO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHQucHJvZHVjdCA+IGltZyB7XHJcblx0XHRcdFx0cG9zaXRpb246IGFic29sdXRlO1xyXG5cdFx0XHRcdGxlZnQ6IDA7XHJcblx0XHRcdFx0dG9wOiAwO1xyXG5cdFx0XHRcdHdpZHRoOiAxMDAlO1xyXG5cdFx0XHRcdGhlaWdodDogMTAwJTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0LnByb2R1Y3QgPiAucHJvZHVjdC1pbWFnZSB7XHJcblx0XHRcdFx0ei1pbmRleDogMDtcclxuXHRcdFx0XHRwb3NpdGlvbjogYWJzb2x1dGU7XHJcblx0XHRcdFx0dG9wOiAwO1xyXG5cdFx0XHRcdGxlZnQ6IDA7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdC5wcm9kdWN0ID4gLnByb2R1Y3Qtb3ZlcmxheSA+IC5wcm9kdWN0LW5hbWUsIFxyXG5cdFx0XHQucHJvZHVjdCA+IC5wcm9kdWN0LW92ZXJsYXkgPiAucHJvZHVjdC1wcmljZSxcclxuXHRcdFx0LnByb2R1Y3QgPiAucHJvZHVjdC1vdmVybGF5ID4gLnByb2R1Y3QtZGVsaXZlcnktdGltZSB7XHJcblx0XHRcdFx0ei1pbmRleDogMTtcclxuXHRcdFx0XHRwb3NpdGlvbjogcmVsYXRpdmU7XHJcblx0XHRcdFx0dGV4dC1hbGlnbjogY2VudGVyO1xyXG5cdFx0XHRcdG1hcmdpbi10b3A6IDI1cHg7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdC5wcm9kdWN0ID4gLnByb2R1Y3Qtb3ZlcmxheSA+IC5hY3Rpb24tYnV0dG9ucyB7XHJcblx0XHRcdFx0d2lkdGg6IDEwMCU7XHJcblx0XHRcdFx0bWFyZ2luLXRvcDogMTBweDtcclxuXHRcdFx0XHR0ZXh0LWFsaWduOiBjZW50ZXI7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdC5wcm9kdWN0ID4gLnByb2R1Y3Qtb3ZlcmxheSA+IC5hY3Rpb24tYnV0dG9ucyA+IC5mYXZvcml0ZSB7XHJcblx0XHRcdFx0bWFyZ2luLWxlZnQ6IDEwcHg7XHJcblx0XHRcdH1cclxuXHJcblx0XHRgO1xyXG5cdCAgICBcclxuXHQgICAgRE9NLmFkZFN0eWxlKCdUdXJiby1lQ29tbWVyY2UtUHJvZHVjdHMnLCBjc3MpO1xyXG5cdH1cclxufVxuXG4vKipcclxuICogVGhlIFNlcnZpY2VzIE9iamVjdCwgaGFuZGxlcyB0aGUgc2VydmljZXMuXHJcbiAqL1xyXG5jbGFzcyBTZXJ2aWNlcyBcclxue1xyXG5cclxufVxuXG5sZXQgZGVmYXVsdE1lc3NhZ2UkNCA9ICdzb3JyeSwgbm8gbW9yZSBwYWdlcy4nO1xyXG5cclxuY2xhc3MgTm90SW5QYWdlUmFuZ2VFeGNlcHRpb24gZXh0ZW5kcyBFeGNlcHRpb25IYW5kbGVyXHJcbntcclxuXHRjb25zdHJ1Y3RvcihtZXNzYWdlID0gbnVsbCkgXHJcblx0e1xyXG5cdFx0bWVzc2FnZSA9IG1lc3NhZ2UgfHwgZGVmYXVsdE1lc3NhZ2UkNDtcclxuXHRcdHN1cGVyKCk7XHJcbiAgICBcdHN1cGVyLnN0YWNrVHJhY2UodGhpcywgbWVzc2FnZSk7XHJcbiAgICB9XHJcbn1cblxuLyoqXHJcbiAqIEBmaWxlIFxyXG4gKiBQYWdpbmF0aW9uIGNsYXNzLlxyXG4gKlxyXG4gKiBUaGUgUGFnaW5hdGlvbiBjb21wb25lbnQsIGhhbmRsZXMgdGhlIHBhZ2luYXRpb24uXHJcbiAqL1xyXG5cclxuLyoqXHJcbiAqIFRoZSBkZWZhdWx0IHNldHRpbmdzIG9mIHRoZSBwYWdpbmF0aW9uLlxyXG4gKlxyXG4gKiBAdmFyIG9iamVjdFxyXG4gKi9cclxubGV0IGRlZmF1bHRTZXR0aW5ncyQ0ID0ge1xyXG5cdGVsZW1lbnQ6ICcucGFnaW5hdGlvbi1saW5rcycsXHJcblx0cHJvY2Nlc3Npbmc6ICdjbGllbnQtc2lkZScsXHJcblx0Y2xhc3M6ICcnLFxyXG5cdHBlcl9wYWdlOiA1LFxyXG5cdHRvdGFsX2l0ZW1zOiA1LFxyXG59O1xyXG5cclxuLyoqXHJcbiAqIFN0b3JlcyB0aGUgY29udGFpbmVyIG9iamVjdC5cclxuICpcclxuICogQHZhciBcXENvcmVcXENvbnRhaW5lclxyXG4gKi9cclxubGV0IENvbnRhaW5lciQ1O1xyXG5cclxuLyoqXHJcbiAqIFN0b3JlcyB0aGUgcHJvZHVjdHMgY29tcG9uZW50LlxyXG4gKlxyXG4gKiBAdmFyIFxcQ29tcG9uZW50c1xcUHJvZHVjdHNcclxuICovXHJcbmxldCBQcm9kdWN0cyQyO1xyXG5cclxuLyoqXHJcbiAqIFN0b3JlcyB0aGUgY29udGFpbmVyIG9iamVjdC5cclxuICogXHJcbiAqIEB2YXIgXFxDb3JlXFxFdmVudE1hbmFnZXJcclxuICovXHJcbmxldCBFdmVudE1hbmFnZXIkNDtcclxuXHJcbmNsYXNzIFBhZ2luYXRpb24gXHJcbntcclxuXHQvKipcclxuXHQgKiAtIEluaXRpYWxpemUgdGhlIGNvbnRhaW5lciBvYmplY3QuXHJcblx0ICogLSBJbml0aWFsaXplIHRoZSBwcm9kdWN0cyBjb21wb25lbnQuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gXFxDb3JlXFxDb250YWluZXIgfCBjb250YWluZXJcclxuXHQgKiBAcGFyYW0gXFxDb21wb25lbnRzXFxQcm9kdWN0cyB8IHByb2R1Y3RzXHJcblx0ICogQHJldHVybiB2b2lkXHJcblx0ICovXHJcblx0Y29uc3RydWN0b3IoY29udGFpbmVyLCBwcm9kdWN0cywgZXZlbnRzKSBcclxuXHR7XHJcblx0XHR0aGlzLnNldEN1cnJlbnQoMSk7XHJcblx0XHRDb250YWluZXIkNSA9IGNvbnRhaW5lcjtcclxuXHRcdFByb2R1Y3RzJDIgPSBwcm9kdWN0cztcclxuXHRcdEV2ZW50TWFuYWdlciQ0ID0gZXZlbnRzO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogU2V0dXAgdGhlIHBhZ2luYXRpb24uXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gb2JqZWN0IHwgc2V0dGluZ3NcclxuXHQgKiBAcmV0dXJuIHZvaWRcclxuXHQgKi9cclxuXHRzZXR1cChzZXR0aW5ncylcclxuXHR7XHRcclxuXHRcdGlmKHR5cGVvZiBzZXR0aW5ncyAhPSAnb2JqZWN0Jykge1xyXG5cdFx0XHR0aHJvdyBuZXcgSW52YWxpZEFyZ3VtZW50RXhjZXB0aW9uJDE7XHJcblx0XHR9XHJcblxyXG5cdFx0dGhpcy5zZXR0aW5ncyA9IENvbW1vbi5leHRlbmQoZGVmYXVsdFNldHRpbmdzJDQsIHNldHRpbmdzKTtcclxuXHJcblx0XHR0aGlzLnNldEVsZW1lbnQodGhpcy5zZXR0aW5ncy5lbGVtZW50KTtcclxuXHJcblx0XHQvLyBMaXN0ZW4gdG8gd2hlbiBwcm9kdWN0cyBhcmUgYmVpbmcgbG9hZGVkIGFuZCB1cGRhdGUgdGhlIHBhZ2luYXRpb25cclxuXHRcdC8vIHdpdGggdGhlIGFjdHVhbCBpdGVtcyBjb3VudC5cclxuXHRcdEV2ZW50TWFuYWdlciQ0LnN1YnNjcmliZSgncHJvZHVjdHMubG9hZGVkJywgZnVuY3Rpb24ocHJvZHVjdHMpIHtcclxuXHRcdFx0dGhpcy50b3RhbFBhZ2VzID0gdGhpcy5jYWxjdWxhdGVUb3RhbFBhZ2VzKHRoaXMuc2V0dGluZ3MucGVyX3BhZ2UsIHByb2R1Y3RzLmxlbmd0aCk7XHJcblx0XHRcdHRoaXMuYnVpbGRQYWdpbmF0aW9uKCk7XHJcblx0XHR9LmJpbmQodGhpcykpO1xyXG5cclxuXHRcdC8vIEFzIGEgZmFsbGJhY2sgY2hvb3NlIHRoZSB1c2VyJ3Mgc2V0dGluZ3MgZm9yIHRoZSB0b3RhbCBpdGVtcyBjb3VudC5cclxuXHRcdHRoaXMudG90YWxQYWdlcyA9IHRoaXMuY2FsY3VsYXRlVG90YWxQYWdlcyh0aGlzLnNldHRpbmdzLnBlcl9wYWdlLCB0aGlzLnNldHRpbmdzLnRvdGFsX2l0ZW1zKTtcclxuXHRcdHRoaXMuYnVpbGRQYWdpbmF0aW9uKCk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBCdWlsZHMgdGhlIHBhZ2luYXRpb24uXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gXHJcblx0ICogQHJldHVybiBcclxuXHQgKi9cclxuXHRidWlsZFBhZ2luYXRpb24oKVxyXG5cdHtcclxuXHRcdHRoaXMubGlua3MgPSB0aGlzLmNyZWF0ZUxpbmtzKCk7XHJcblx0XHR0aGlzLnJlcGxhY2VMaW5rcyh0aGlzLmxpbmtzKTtcclxuXHRcdHRoaXMuYmluZEV2ZW50TGlzdGVuZXJzKHRoaXMubGlua3MpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogU2V0cyB0aGUgd3JhcHBlciBlbGVtZW50LlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIHN0cmluZyB8IHNlbGVjdG9yXHJcblx0ICogQHJldHVybiB2b2lkXHJcblx0ICovXHJcblx0c2V0RWxlbWVudChzZWxlY3RvcilcclxuXHR7XHJcblx0XHR0aGlzLndyYXBwZXIgPSBET00uZmluZChzZWxlY3Rvcik7XHJcblx0XHRcclxuXHRcdERPTS5hZGRDbGFzcyh0aGlzLndyYXBwZXIsIHRoaXMuc2V0dGluZ3MuY2xhc3MpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogUmVwbGFjZXMgdGhlIGxpbmtzIGluIHRoZSB3cmFwcGVyLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIEhUTUxVTGlzdEVsZW1lbnQgfCBsaW5rc1xyXG5cdCAqIEByZXR1cm4gdm9pZFxyXG5cdCAqL1xyXG5cdHJlcGxhY2VMaW5rcyhsaW5rcylcclxuXHR7XHJcblx0XHR0aGlzLndyYXBwZXIuaW5uZXJIVE1MID0gJyc7XHJcblx0XHR0aGlzLndyYXBwZXIuYXBwZW5kQ2hpbGQobGlua3MpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQ2FsY3VsYXRlcyB0aGUgdG90YWwgcGFnZXMuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gbnVtYmVyIHwgcGVyUGFnZVxyXG5cdCAqIEBwYXJhbSBudW1iZXIgfCB0b3RhbEl0ZW1zXHJcblx0ICogQHJldHVybiBudW1iZXJcclxuXHQgKi9cclxuXHRjYWxjdWxhdGVUb3RhbFBhZ2VzKHBlclBhZ2UsIHRvdGFsSXRlbXMpXHJcblx0e1xyXG5cdFx0cGVyUGFnZSA9IHBhcnNlSW50KHBlclBhZ2UpO1xyXG5cdFx0dG90YWxJdGVtcyA9IHBhcnNlSW50KHRvdGFsSXRlbXMpO1xyXG5cclxuXHRcdHJldHVybiBNYXRoLmNlaWwodG90YWxJdGVtcyAvIHBlclBhZ2UpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQmluZHMgdGhlIGJ1dHRvbnMgZXZlbnRzIGxpc3RlbmVycy5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSBIVE1MVUxpc3RFbGVtZW50IHwgbGlua3NcclxuXHQgKiBAcmV0dXJuIHZvaWRcclxuXHQgKi9cclxuXHRiaW5kRXZlbnRMaXN0ZW5lcnMobGlua3MpIFxyXG5cdHtcclxuXHRcdGxldCBpbnN0YW5jZSA9IHRoaXM7XHJcblxyXG5cdFx0dGhpcy5uZXh0LmNoaWxkTm9kZXNbMF0ub25jbGljayA9IGZ1bmN0aW9uKGUpIHtcclxuXHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuXHRcdFx0bGV0IHJlcXVlc3RlZFBhZ2UgPSBpbnN0YW5jZS5jdXJyZW50KzE7XHJcblxyXG5cdFx0XHRpZiAoaW5zdGFuY2Uubm90SW5QYWdlUmFuZ2UocmVxdWVzdGVkUGFnZSkpIHtcclxuXHRcdFx0XHR0aHJvdyBuZXcgTm90SW5QYWdlUmFuZ2VFeGNlcHRpb24oJ1RoZSBwYWdlIHlvdSByZXF1ZXN0aW5nIGRvZXMgbm90IGV4aXN0cycpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRQcm9kdWN0cyQyLmxvYWRQcm9kdWN0cyhyZXF1ZXN0ZWRQYWdlKS50aGVuKGZ1bmN0aW9uKHByb2R1Y3RzKSB7XHJcblx0XHRcdFx0aW5zdGFuY2Uuc2V0Q3VycmVudChyZXF1ZXN0ZWRQYWdlKTtcclxuXHRcdFx0fSk7XHJcblx0XHR9O1xyXG5cclxuXHRcdHRoaXMucHJldmlvdXMuY2hpbGROb2Rlc1swXS5vbmNsaWNrID0gZnVuY3Rpb24oZSkge1xyXG5cdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG5cdFx0XHRsZXQgcmVxdWVzdGVkUGFnZSA9IGluc3RhbmNlLmN1cnJlbnQtMTtcclxuXHJcblx0XHRcdGlmKGluc3RhbmNlLm5vdEluUGFnZVJhbmdlKHJlcXVlc3RlZFBhZ2UpKSB7XHJcblx0XHRcdFx0dGhyb3cgbmV3IE5vdEluUGFnZVJhbmdlRXhjZXB0aW9uKCdUaGUgcGFnZSB5b3UgcmVxdWVzdGluZyBkb2VzIG5vdCBleGlzdHMnKTtcclxuXHRcdFx0fVxyXG5cdFx0XHRcclxuXHRcdFx0UHJvZHVjdHMkMi5sb2FkUHJvZHVjdHMocmVxdWVzdGVkUGFnZSkudGhlbihmdW5jdGlvbihwcm9kdWN0cykge1xyXG5cdFx0XHRcdGluc3RhbmNlLnNldEN1cnJlbnQocmVxdWVzdGVkUGFnZSk7XHJcblx0XHRcdH0pO1xyXG5cdFx0fTtcclxuXHJcblx0XHRmb3IodmFyIGkgPSAwOyBpIDwgdGhpcy5wYWdlcy5sZW5ndGg7IGkrKykge1xyXG5cdFx0XHR0aGlzLnBhZ2VzW2ldLmNoaWxkTm9kZXNbMF0ub25jbGljayA9IGZ1bmN0aW9uKGUpIHtcclxuXHRcdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XHJcblx0XHRcdFx0XHJcblx0XHRcdFx0bGV0IHJlcXVlc3RlZFBhZ2UgPSB0aGlzLmdldEF0dHJpYnV0ZSgnZGF0YS1wYWdlLW5yJyk7XHJcblx0XHRcdFx0XHJcblx0XHRcdFx0UHJvZHVjdHMkMi5sb2FkUHJvZHVjdHMocmVxdWVzdGVkUGFnZSkudGhlbihmdW5jdGlvbihwcm9kdWN0cykge1xyXG5cdFx0XHRcdFx0aW5zdGFuY2Uuc2V0Q3VycmVudChyZXF1ZXN0ZWRQYWdlKTtcclxuXHRcdFx0XHR9KTtcclxuXHRcdFx0fTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFNldHMgdGhlIGN1cnJlbnQgcGFnZS5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSBudW1iZXIgfCBwYWdlTnVtYmVyXHJcblx0ICogQHJldHVybiB2b2lkXHJcblx0ICovXHJcblx0c2V0Q3VycmVudChwYWdlTnVtYmVyKSBcclxuXHR7XHJcblx0XHR0aGlzLmN1cnJlbnQgPSBwYXJzZUludChwYWdlTnVtYmVyKTtcclxuXHRcdHRoaXMuY2hhbmdlVXJsKHBhZ2VOdW1iZXIpO1xyXG5cdFx0dGhpcy5zZXRBY3RpdmVMaW5rKHBhZ2VOdW1iZXIpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogR2V0cyB0aGUgY3VycmVudCBwYWdlLlxyXG5cdCAqXHJcblx0ICogQHJldHVybiBudW1iZXJcclxuXHQgKi9cclxuXHRnZXRDdXJyZW50KCkgXHJcblx0e1xyXG5cdFx0cmV0dXJuIHRoaXMuY3VycmVudDtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIENyZWF0ZXMgdGhlIHBhZ2luYXRpb24gbGlua3MuXHJcblx0ICpcclxuXHQgKiBAcmV0dXJuIEhUTUxVTGlzdEVsZW1lbnRcclxuXHQgKi9cclxuXHRjcmVhdGVMaW5rcygpIFxyXG5cdHtcclxuXHRcdGxldCB1bCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3VsJyk7XHJcblx0XHRcclxuXHRcdHRoaXMucGFnZXMgPSB0aGlzLmNyZWF0ZVBhZ2VMaW5rcygpO1xyXG5cdFx0dGhpcy5wcmV2aW91cyA9IHRoaXMuY3JlYXRlUHJldmlvdXNCdXR0b24oKTtcclxuXHRcdHRoaXMubmV4dCA9IHRoaXMuY3JlYXRlTmV4dEJ1dHRvbigpO1xyXG5cclxuXHRcdHVsLmNsYXNzTmFtZSA9ICdwYWdpbmF0aW9uJztcclxuXHRcdHVsLmFwcGVuZENoaWxkKHRoaXMucHJldmlvdXMpO1xyXG5cclxuXHRcdHRoaXMucGFnZXMuZm9yRWFjaChmdW5jdGlvbihwYWdlKSB7XHJcblx0XHRcdHVsLmFwcGVuZENoaWxkKHBhZ2UpO1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0dWwuYXBwZW5kQ2hpbGQodGhpcy5uZXh0KTtcclxuXHJcblx0XHRyZXR1cm4gdWw7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBDcmVhdGVzIHRoZSBwYWdlcyBpdGVtIGxpbmtzLlxyXG5cdCAqXHJcblx0ICogQHJldHVybiBhcnJheTxIVE1MTElFbGVtZW50PlxyXG5cdCAqL1xyXG5cdGNyZWF0ZVBhZ2VMaW5rcygpIFxyXG5cdHtcclxuXHRcdHZhciBwYWdlcyA9IFtdO1xyXG5cclxuXHRcdGZvcih2YXIgaSA9IDE7IGkgPD0gdGhpcy50b3RhbFBhZ2VzOyBpKyspIHtcclxuXHRcdFx0dmFyIHBhZ2VJdGVtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKTtcclxuXHRcdFx0dmFyIGxpbmsgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJyk7XHJcblx0XHRcdHBhZ2VJdGVtLmNsYXNzTmFtZSA9ICh0aGlzLmN1cnJlbnQgPT0gaSkgPyAncGFnZS1pdGVtIGFjdGl2ZScgOiAncGFnZS1pdGVtJztcclxuXHRcdFx0bGluay5jbGFzc05hbWUgPSAncGFnZS1saW5rJztcclxuXHRcdFx0bGluay5zZXRBdHRyaWJ1dGUoJ2hyZWYnLCAnP3BhZ2U9JysgaSk7XHJcblx0XHRcdGxpbmsuc2V0QXR0cmlidXRlKCdkYXRhLXBhZ2UtbnInLCBpKTtcclxuXHRcdFx0bGluay5pbm5lckhUTUwgPSBpO1xyXG5cdFx0XHRwYWdlSXRlbS5hcHBlbmRDaGlsZChsaW5rKTtcclxuXHRcdFx0cGFnZXMucHVzaChwYWdlSXRlbSk7XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIHBhZ2VzO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQ3JlYXRlcyB0aGUgcHJldmlvdXMgYnV0dG9uIGxpbmsuXHJcblx0ICpcclxuXHQgKiBAcmV0dXJuIEhUTUxMSUVsZW1lbnRcclxuXHQgKi9cclxuXHRjcmVhdGVQcmV2aW91c0J1dHRvbigpIFxyXG5cdHtcclxuXHRcdHZhciBsaSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJyk7XHJcblx0XHR2YXIgbGluayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKTtcclxuXHRcdHZhciBzcGFuMSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcclxuXHRcdHZhciBzcGFuMiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcclxuXHRcdFxyXG5cdFx0XHJcblx0XHRsaS5jbGFzc05hbWUgPSAncGFnZS1pdGVtJztcclxuXHRcdGxpbmsuY2xhc3NOYW1lID0gJ3BhZ2UtbGluayc7XHJcblx0XHRzcGFuMi5jbGFzc05hbWUgPSAnc3Itb25seSc7XHJcblxyXG5cdFx0bGluay5zZXRBdHRyaWJ1dGUoJ2hyZWYnLCAnJyk7XHJcblx0XHRsaW5rLnNldEF0dHJpYnV0ZSgnYXJpYS1sYWJlbCcsICdQcmV2aW91cycpO1xyXG5cdFx0c3BhbjEuc2V0QXR0cmlidXRlKCdhcmlhLWhpZGRlbicsICd0cnVlJyk7XHJcblxyXG5cdFx0c3BhbjEuaW5uZXJIVE1MID0gJyZsYXF1bzsnO1xyXG5cdFx0c3BhbjIuaW5uZXJIVE1MID0gJ1ByZXZpb3VzJztcclxuXHJcblx0XHRsaW5rLmFwcGVuZENoaWxkKHNwYW4xKTtcclxuXHRcdGxpbmsuYXBwZW5kQ2hpbGQoc3BhbjIpO1xyXG5cdFx0bGkuYXBwZW5kQ2hpbGQobGluayk7XHJcblxyXG5cdFx0cmV0dXJuIGxpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQ3JlYXRlcyB0aGUgbmV4dCBidXR0b24gbGluay5cclxuXHQgKlxyXG5cdCAqIEByZXR1cm4gSFRNTExJRWxlbWVudFxyXG5cdCAqL1xyXG5cdGNyZWF0ZU5leHRCdXR0b24oKSBcclxuXHR7XHJcblx0XHR2YXIgbGkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaScpO1xyXG5cdFx0dmFyIGxpbmsgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJyk7XHJcblx0XHR2YXIgc3BhbjEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XHJcblx0XHR2YXIgc3BhbjIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XHJcblx0XHRcclxuXHRcdGxpLmNsYXNzTmFtZSA9ICdwYWdlLWl0ZW0nO1xyXG5cdFx0bGluay5jbGFzc05hbWUgPSAncGFnZS1saW5rJztcclxuXHRcdHNwYW4yLmNsYXNzTmFtZSA9ICdzci1vbmx5JztcclxuXHJcblx0XHRsaW5rLnNldEF0dHJpYnV0ZSgnaHJlZicsICcnKTtcclxuXHRcdGxpbmsuc2V0QXR0cmlidXRlKCdhcmlhLWxhYmVsJywgJ05leHQnKTtcclxuXHRcdHNwYW4xLnNldEF0dHJpYnV0ZSgnYXJpYS1oaWRkZW4nLCAndHJ1ZScpO1xyXG5cclxuXHRcdHNwYW4xLmlubmVySFRNTCA9ICcmcmFxdW87JztcclxuXHRcdHNwYW4yLmlubmVySFRNTCA9ICdOZXh0JztcclxuXHJcblx0XHRsaW5rLmFwcGVuZENoaWxkKHNwYW4xKTtcclxuXHRcdGxpbmsuYXBwZW5kQ2hpbGQoc3BhbjIpO1xyXG5cdFx0bGkuYXBwZW5kQ2hpbGQobGluayk7XHJcblxyXG5cdFx0cmV0dXJuIGxpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQ2hlY2tzIGlmIHRoZSBnaXZlbiBwYWdlIGlzIGluIHJhbmdlLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIG51bWJlciB8IHBhZ2VOdW1iZXJcclxuXHQgKiBAcmV0dXJuIGJvb2xcclxuXHQgKi9cclxuXHRub3RJblBhZ2VSYW5nZShwYWdlTnVtYmVyKSBcclxuXHR7XHJcblx0XHRyZXR1cm4gKHBhZ2VOdW1iZXIgPiB0aGlzLnRvdGFsUGFnZXMgfHwgcGFnZU51bWJlciA8PSAwKSB8fCBpc05hTihwYWdlTnVtYmVyKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIENoYW5nZXMgdGhlIHVybCB0byBhIGdpdmVuIHBhZ2UgbnVtYmVyLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIG51bWJlciB8IHBhZ2VOdW1iZXJcclxuXHQgKiBAcmV0dXJuIHZvaWRcclxuXHQgKi9cclxuXHRjaGFuZ2VVcmwocGFnZU51bWJlcikgXHJcblx0e1xyXG5cdFx0cGFnZU51bWJlciA9ICBwYWdlTnVtYmVyIHx8IHF1ZXJ5U3RyaW5nKClbJ3BhZ2UnXTtcclxuXHRcdHdpbmRvdy5oaXN0b3J5LnJlcGxhY2VTdGF0ZSgnJywgJycsIHRoaXMudXBkYXRlVVJMUGFyYW1ldGVyKHdpbmRvdy5sb2NhdGlvbi5ocmVmLCAncGFnZScsIHBhZ2VOdW1iZXIpKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFNldHMgdGhlIGFjdGl2ZSBsaW5rLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIG51bWJlciB8IHBhZ2VOdW1iZXJcclxuXHQgKiBAcmV0dXJuIHZvaWRcclxuXHQgKi9cclxuXHRzZXRBY3RpdmVMaW5rKHBhZ2VOdW1iZXIpXHJcblx0e1xyXG5cdFx0Zm9yKHZhciBwYWdlIGluIHRoaXMucGFnZXMpIHtcclxuXHRcdFx0aWYgKHRoaXMucGFnZXNbcGFnZV0uY2hpbGROb2Rlc1swXS5nZXRBdHRyaWJ1dGUoJ2RhdGEtcGFnZS1ucicpID09IHBhZ2VOdW1iZXIpIHtcclxuXHRcdFx0XHRET00uYWRkQ2xhc3ModGhpcy5wYWdlc1twYWdlXSwgJ2FjdGl2ZScpO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdERPTS5yZW1vdmVDbGFzcyh0aGlzLnBhZ2VzW3BhZ2VdLCAnYWN0aXZlJyk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEdldCB0aGUgZ2V0IHZhcmlhYmxlcyBmcm9tIHRoZSB1cmwuXHJcblx0ICpcclxuXHQgKiBAcmV0dXJuIGFycmF5XHJcblx0ICovXHJcblx0cXVlcnlTdHJpbmcoKSBcclxuXHR7XHJcblx0XHR2YXIgdmFycyA9IHt9O1xyXG5cdFx0dmFyIHBhcnRzID0gd2luZG93LmxvY2F0aW9uLmhyZWYucmVwbGFjZSgvWz8mXSsoW149Jl0rKT0oW14mXSopL2dpLCBmdW5jdGlvbihtLCBrZXksIHZhbHVlKSB7XHJcblx0XHRcdHZhcnNba2V5XSA9IHZhbHVlO1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0cmV0dXJuIHZhcnM7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBNb2RpZmllcyB0aGUgZ2V0IHBhcmFtZXRlciBpbiB0aGUgdXJsLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIHN0cmluZyB8IHVybFxyXG5cdCAqIEBwYXJhbSBzdHJpbmcgfCBwYXJhbVxyXG5cdCAqIEBwYXJhbSBudW1iZXIgfCBwYXJhbVZhbFxyXG5cdCAqIEByZXR1cm4gc3RyaW5nXHJcblx0ICovXHJcblx0dXBkYXRlVVJMUGFyYW1ldGVyKHVybCwgcGFyYW0sIHBhcmFtVmFsKSBcclxuXHR7XHJcblx0ICAgIHZhciBuZXdBZGRpdGlvbmFsVVJMID0gXCJcIjtcclxuXHQgICAgdmFyIHRlbXBBcnJheSA9IHVybC5zcGxpdChcIj9cIik7XHJcblx0ICAgIHZhciBiYXNlVVJMID0gdGVtcEFycmF5WzBdO1xyXG5cdCAgICB2YXIgYWRkaXRpb25hbFVSTCA9IHRlbXBBcnJheVsxXTtcclxuXHQgICAgdmFyIHRlbXAgPSBcIlwiO1xyXG5cclxuXHQgICAgaWYgKGFkZGl0aW9uYWxVUkwpIHtcclxuXHQgICAgICAgIHRlbXBBcnJheSA9IGFkZGl0aW9uYWxVUkwuc3BsaXQoXCImXCIpO1xyXG5cdCAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0ZW1wQXJyYXkubGVuZ3RoOyBpKyspe1xyXG5cdCAgICAgICAgICAgIGlmICh0ZW1wQXJyYXlbaV0uc3BsaXQoJz0nKVswXSAhPSBwYXJhbSl7XHJcblx0ICAgICAgICAgICAgICAgIG5ld0FkZGl0aW9uYWxVUkwgKz0gdGVtcCArIHRlbXBBcnJheVtpXTtcclxuXHQgICAgICAgICAgICAgICAgdGVtcCA9IFwiJlwiO1xyXG5cdCAgICAgICAgICAgIH1cclxuXHQgICAgICAgIH1cclxuXHQgICAgfVxyXG5cclxuXHQgICAgdmFyIHJvd3NUZXh0ID0gdGVtcCArIFwiXCIgKyBwYXJhbSArIFwiPVwiICsgcGFyYW1WYWw7XHJcblx0ICAgIHJldHVybiBiYXNlVVJMICsgXCI/XCIgKyBuZXdBZGRpdGlvbmFsVVJMICsgcm93c1RleHQ7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBSZXNldHMgdGhlIHBhZ2luYXRpb24uXHJcblx0ICpcclxuXHQgKiBAcmV0dXJuIHZvaWRcclxuXHQgKi9cclxuXHRyZXNldCgpIFxyXG5cdHtcclxuXHRcdHRoaXMuc2V0Q3VycmVudCgxKTtcclxuXHRcdHRoaXMuY2hhbmdlVXJsKDEpO1xyXG5cdH1cclxufVxuXG5sZXQgZGVmYXVsdE1lc3NhZ2UkNSA9ICdJbiBvcmRlciB0byB1c2UgY29tcG9uZW50cyB5b3UgbXVzdCByZWdpc3RlciB0aGVtIHdpdGggdGhlIHNob3AhJzsgXHJcblxyXG5jbGFzcyBDb21wb25lbnROb3RSZWdpc3RlcmVkRXhjZXB0aW9uIGV4dGVuZHMgRXhjZXB0aW9uSGFuZGxlclxyXG57XHJcblx0Y29uc3RydWN0b3IobWVzc2FnZSA9IG51bGwpIFxyXG5cdHtcclxuXHRcdG1lc3NhZ2UgPSBtZXNzYWdlIHx8IGRlZmF1bHRNZXNzYWdlJDU7XHJcblx0XHRzdXBlcihtZXNzYWdlKTtcclxuICAgIFx0c3VwZXIuc3RhY2tUcmFjZSh0aGlzLCBtZXNzYWdlKTtcclxuICAgIH1cclxufVxuXG5sZXQgZGVmYXVsdFNldHRpbmdzJDUgPSB7XHJcblx0ZGVidWdfbGV2ZWw6ICdlcnJvcicsXHJcblx0ZWxlbWVudDogJ2JvZHknLFxyXG5cdGluamVjdF9saWJyYXJpZXM6IFtdLFxyXG5cdGNvbXBvbmVudHM6IFsnUHJvZHVjdHMnLCAnU2VydmljZXMnLCAnRmlsdGVyJywgJ1BhZ2luYXRpb24nLCAnQ2FydCddLFxyXG5cdGxvYWRpbmdfYW5pbWF0aW9uOiB0cnVlXHJcbn07XHJcblxyXG5sZXQgZXh0ZXJuYWxMaWJyYXJpZXMgPSB7XHJcblx0Ym9vdHN0cmFwOiAnaHR0cHM6Ly9tYXhjZG4uYm9vdHN0cmFwY2RuLmNvbS9ib290c3RyYXAvMy4zLjcvY3NzL2Jvb3RzdHJhcC5taW4uY3NzJyxcclxufTtcclxuXHJcbmxldCBkZWJ1Z0xldmVsJDE7XHJcblxyXG5jbGFzcyBUdXJib0Vjb21tZXJjZVxyXG57XHJcblx0LyoqXHJcblx0ICogUmV0cmlldmUgdGhlIGRlYnVnIGxldmVsLlxyXG5cdCAqXHJcblx0ICogQHJldHVybiBzdHJpbmdcclxuXHQgKi9cclxuXHRnZXQgZGVidWdMZXZlbCgpXHJcblx0e1xyXG5cdFx0cmV0dXJuIGRlYnVnTGV2ZWwkMTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFRoZSBlbnRlcnkgZm9yIHRoZSBzaG9wLlxyXG5cdCAqIC0gU2V0dGluZyB0aGUgZXhjZXB0aW9uIGhhbmRsZXIuXHJcblx0ICogLSBTZXR0aW5nIHRoZSBpb2MgY29udGFpbmVyLlxyXG5cdCAqIC0gRXh0ZW5kaW5nIHRoZSB1c2VyIHNldHRpbmdzLlxyXG5cdCAqIC0gU2V0dGluZyB0aGUgZWxlbWVudC5cclxuXHQgKiAtIERpc2FibGluZyBkZWZhdWx0IGVycm9ycy5cclxuXHQgKiAtIFBhc3NpbmcgY2FsbHMgdmlhIHByb3h5IHRvIHRoZSBjb21wb25lbnRzLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIG9iamVjdCB8IHNldHRpbmdzXHJcblx0ICogQHJldHVybiBQcm94eVxyXG5cdCAqL1xyXG5cdGNvbnN0cnVjdG9yKHNldHRpbmdzKVxyXG5cdHtcclxuXHRcdGlmICh0eXBlb2Ygc2V0dGluZ3MgIT0gJ29iamVjdCcpIHtcclxuXHRcdFx0dGhyb3cgbmV3IEludmFsaWRBcmd1bWVudEV4Y2VwdGlvbiQxO1xyXG5cdFx0fVxyXG5cclxuXHRcdHRoaXMuY29udGFpbmVyID0gbmV3IENvbnRhaW5lcjtcclxuXHRcdHRoaXMuc2V0dGluZ3MgPSBDb21tb24uZXh0ZW5kKGRlZmF1bHRTZXR0aW5ncyQ1LCBzZXR0aW5ncyk7XHJcblxyXG5cdFx0dGhpcy5sb2FkRXh0ZXJuYWxMaWJyYXJpZXMoKTtcclxuXHJcblx0XHRkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgZnVuY3Rpb24oKSB7XHJcblx0XHRcdHRoaXMuc2V0RWxlbWVudCh0aGlzLnNldHRpbmdzLmVsZW1lbnQpO1xyXG5cdFx0XHRcclxuXHRcdFx0aWYgKHRoaXMuc2V0dGluZ3MubG9hZGluZ19hbmltYXRpb24pIHtcclxuXHRcdFx0XHRzdGFydExvYWRpbmcuY2FsbCh0aGlzKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0dGhpcy5hZGRTdHlsZVRhZygpO1xyXG5cdFx0fS5iaW5kKHRoaXMpKTtcclxuXHJcblx0XHRkZWJ1Z0xldmVsJDEgPSB0aGlzLnNldHRpbmdzLmRlYnVnX2xldmVsO1xyXG5cclxuXHRcdEV4Y2VwdGlvbkhhbmRsZXIuc2V0RGVidWdMZXZlbCA9IGRlYnVnTGV2ZWwkMTtcclxuXHRcdFxyXG5cdFx0aWYgKGRlYnVnTGV2ZWwkMSA9PSAnd2FybmluZycgfHwgZGVidWdMZXZlbCQxID09ICdpbmZvJykge1xyXG5cdFx0XHR3aW5kb3cub25lcnJvciA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gdHJ1ZTsgfTtcclxuXHRcdH1cclxuXHJcblx0XHRiaW5kQ29tcG9uZW50c0RlcGVuZGVuY2llcy5jYWxsKHRoaXMsIHNldHRpbmdzLmNvbXBvbmVudHMpO1xyXG5cclxuXHRcdHJldHVybiBuZXcgUHJveHkodGhpcywge1xyXG5cdFx0XHRnZXQ6IGZ1bmN0aW9uKHRhcmdldCwgc291cmNlKSB7XHJcblx0XHRcdFx0aWYgKENvbW1vbi5pbl9hcnJheShzb3VyY2UsIHNldHRpbmdzLmNvbXBvbmVudHMpKSB7XHJcblx0XHRcdFx0XHRyZXR1cm4gdGFyZ2V0LmNvbnRhaW5lci5tYWtlKHNvdXJjZSk7XHJcblx0XHRcdFx0fSBlbHNlIGlmICh0YXJnZXQuY29udGFpbmVyLmluc3RhbmNlRXhpc3Qoc291cmNlKSkge1xyXG5cdFx0XHRcdFx0cmV0dXJuIHRhcmdldC5jb250YWluZXIuZ2V0SW5zdGFuY2Uoc291cmNlKTtcclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdHRocm93IG5ldyBDb21wb25lbnROb3RSZWdpc3RlcmVkRXhjZXB0aW9uKCdjb21wb25lbnRzIG11c3QgYmUgcmVnaXN0ZXJlZCBpbiBvcmRlciB0byB1c2UgdGhlbS4nKTtcclxuXHRcdFx0fVxyXG5cdFx0fSk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBMb2FkcyB0aGUgZXh0ZXJuYWwgbGlicmFyaWVzIHdoaWNoIHdhcyBzcGVjaWZpZWQuXHJcblx0ICogXHJcblx0ICogQHJldHVybiB2b2lkXHJcblx0ICovXHJcblx0bG9hZEV4dGVybmFsTGlicmFyaWVzKClcclxuXHR7XHJcblx0XHRsZXQgaTtcclxuXHRcdGxldCBsaWJyYXJpZXMgPSB0aGlzLnNldHRpbmdzLmluamVjdF9saWJyYXJpZXM7XHJcblxyXG5cdFx0Zm9yIChpID0gMDsgaSA8IGxpYnJhcmllcy5sZW5ndGg7IGkrKykge1xyXG5cdFx0XHRpZiAoZXh0ZXJuYWxMaWJyYXJpZXMuaGFzT3duUHJvcGVydHkobGlicmFyaWVzW2ldKSkge1xyXG5cdFx0XHRcdGxldCBpZCA9ICdUdXJiby1lQ29tbWVyY2UtJyArIFN0ci51Y2ZpcnN0KGxpYnJhcmllc1tpXSk7XHJcblx0XHRcdFx0XHJcblx0XHRcdFx0aWYgKCEgRE9NLmZpbmQoaWQpKSB7XHJcblx0XHRcdFx0XHRET00uYWRkTGlua2VkU3R5bGUoaWQsIGV4dGVybmFsTGlicmFyaWVzW2xpYnJhcmllc1tpXV0pO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogU2V0cyB0aGUgZWxlbWVudCB0byBiZSBib3VuZCB0by5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSBzdHJpbmcgfCBzZWxlY3RvclxyXG5cdCAqIEByZXR1cm4gdm9pZFxyXG5cdCAqL1xyXG5cdHNldEVsZW1lbnQoc2VsZWN0b3IpXHJcblx0e1xyXG5cdFx0dGhpcy53cmFwcGVyID0gRE9NLmZpbmQoc2VsZWN0b3IpO1xyXG5cdFx0XHJcblx0XHRET00uYWRkQ2xhc3ModGhpcy53cmFwcGVyLCB0aGlzLnNldHRpbmdzLmNsYXNzKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEFkZCB0aGUgZUNvbW1lcmNlIHN0eWxlIHRhZ3MgdG8gdGhlIERPTS5cclxuXHQgKlxyXG5cdCAqIEByZXR1cm4gdm9pZFxyXG5cdCAqL1xyXG5cdGFkZFN0eWxlVGFnKCkgXHJcblx0e1xyXG5cdFx0aWYgKERPTS5maW5kKCcjVHVyYm9lLUNvbW1lcmNlJykpIHtcclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0fVxyXG5cclxuXHRcdGxldCBjc3MgPSBgXHJcblx0XHRcdCR7dGhpcy5zZXR0aW5ncy5lbGVtZW50fSB7XHJcblx0XHRcdFx0cG9zaXRpb246IHJlbGF0aXZlO1xyXG5cdFx0XHRcdGNsZWFyOiBib3RoO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHQubG9hZGluZy1wcm9ncmVzcy1iYXIge1xyXG5cdFx0XHRcdHBvc2l0aW9uOiBmaXhlZDtcclxuXHRcdFx0XHR0b3A6IDA7XHJcblx0XHRcdFx0bGVmdDogMDtcclxuXHRcdFx0XHRoZWlnaHQ6IDVweDtcclxuXHRcdFx0XHR3aWR0aDogMTAwJTtcclxuXHRcdFx0XHQtd2Via2l0LWJveC1zaGFkb3c6IDBweCAwcHggNXB4IDFweCByZ2JhKDE2OCwxNjgsMTY4LDEpO1xyXG5cdFx0XHRcdC1tb3otYm94LXNoYWRvdzogMHB4IDBweCA1cHggMXB4IHJnYmEoMTY4LDE2OCwxNjgsMSk7XHJcblx0XHRcdFx0Ym94LXNoYWRvdzogMHB4IDBweCA1cHggMXB4IHJnYmEoMTY4LDE2OCwxNjgsMSk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdC5sb2FkaW5nLXByb2dyZXNzLWJhciA+IC5sb2FkaW5nLXByb2dyZXNzLWZpbGwge1xyXG5cdFx0XHRcdHdpZHRoOiAxMDAlO1xyXG5cdFx0XHRcdGhlaWdodDogMTAwJTtcclxuXHRcdFx0XHRwb3NpdGlvbjogYWJzb2x1dGU7XHJcblx0XHRcdFx0YmFja2dyb3VuZC1jb2xvcjogIzlkZDJmZjtcclxuXHRcdFx0XHR0cmFuc2Zvcm06IHRyYW5zbGF0ZVgoLSR7ZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudFdpZHRofXB4KTtcclxuXHRcdFx0fVxyXG5cdFx0YDtcclxuXHQgICAgXHJcblx0ICAgIERPTS5hZGRTdHlsZSgnVHVyYm8tZUNvbW1lcmNlJywgY3NzKTtcclxuXHR9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBCaW5kcyBjb21wb25lbnRzIGRlcGVuZGVuY2llcy5cclxuICpcclxuICogQHBhcmFtIG9iamVjdCB8IGNvbXBvbmVudHNcclxuICogQHJldHVybiB2b2lkXHJcbiAqL1xyXG5mdW5jdGlvbiBiaW5kQ29tcG9uZW50c0RlcGVuZGVuY2llcyhjb21wb25lbnRzKSB7XHJcblxyXG5cdHRoaXMuY29udGFpbmVyLnNldEluc3RhbmNlKCdSZXF1ZXN0JywgbmV3IFJlcXVlc3QpO1xyXG5cdHRoaXMuY29udGFpbmVyLnNldEluc3RhbmNlKCdFdmVudHMnLCBuZXcgRXZlbnRNYW5hZ2VyKTtcclxuXHJcblx0dGhpcy5jb250YWluZXIuYmluZCgnRmlsdGVyJywgZnVuY3Rpb24oY29udGFpbmVyKSB7XHJcblx0XHRsZXQgY29tcG9uZW50ID0gbmV3IEZpbHRlcihjb250YWluZXIpO1xyXG5cdFx0Y29tcG9uZW50LmJvb3RlZCA9IHRydWU7IFxyXG5cdFx0cmV0dXJuIGNvbXBvbmVudDtcclxuXHR9KTtcclxuXHRcclxuXHR0aGlzLmNvbnRhaW5lci5iaW5kKCdTZXJ2aWNlcycsIGZ1bmN0aW9uKGNvbnRhaW5lcikgeyBcclxuXHRcdGxldCBjb21wb25lbnQgPSBuZXcgU2VydmljZXMoY29udGFpbmVyKTsgXHJcblx0XHRjb21wb25lbnQuYm9vdGVkID0gdHJ1ZTtcclxuXHRcdHJldHVybiBjb21wb25lbnQ7XHJcblx0fSk7XHJcblxyXG5cdHRoaXMuY29udGFpbmVyLmJpbmQoJ1Byb2R1Y3RzJywgZnVuY3Rpb24oY29udGFpbmVyKSB7XHJcblx0XHRsZXQgY29tcG9uZW50ID0gbmV3IFByb2R1Y3RzKGNvbnRhaW5lciwgY29udGFpbmVyLlJlcXVlc3QsIGNvbnRhaW5lci5FdmVudHMpO1xyXG5cdFx0Y29tcG9uZW50LmJvb3RlZCA9IHRydWU7XHJcblx0XHRyZXR1cm4gY29tcG9uZW50O1xyXG5cdH0pO1xyXG5cclxuXHR0aGlzLmNvbnRhaW5lci5iaW5kKCdQYWdpbmF0aW9uJywgZnVuY3Rpb24oY29udGFpbmVyKSB7XHJcblx0XHRsZXQgY29tcG9uZW50ID0gbmV3IFBhZ2luYXRpb24oY29udGFpbmVyLCBjb250YWluZXIubWFrZSgnUHJvZHVjdHMnKSwgY29udGFpbmVyLkV2ZW50cyk7XHJcblx0XHRjb21wb25lbnQuYm9vdGVkID0gdHJ1ZTtcclxuXHRcdHJldHVybiBjb21wb25lbnQ7XHJcblx0fSk7XHJcblxyXG5cdHRoaXMuY29udGFpbmVyLmJpbmQoJ0NhcnQnLCBmdW5jdGlvbihjb250YWluZXIpIHtcclxuXHRcdGxldCBjb21wb25lbnQgPSBuZXcgQ2FydChjb250YWluZXIsIGNvbnRhaW5lci5SZXF1ZXN0LCBjb250YWluZXIuRXZlbnRzKTtcclxuXHRcdGNvbXBvbmVudC5ib290ZWQgPSB0cnVlO1xyXG5cdFx0cmV0dXJuIGNvbXBvbmVudDtcclxuXHR9KTtcclxuXHJcblx0dGhpcy5jb250YWluZXIuRmlsdGVyLmJvb3RlZCA9IGZhbHNlO1xyXG5cdHRoaXMuY29udGFpbmVyLlNlcnZpY2VzLmJvb3RlZCA9IGZhbHNlO1xyXG5cdHRoaXMuY29udGFpbmVyLlByb2R1Y3RzLmJvb3RlZCA9IGZhbHNlO1xyXG5cdHRoaXMuY29udGFpbmVyLlBhZ2luYXRpb24uYm9vdGVkID0gZmFsc2U7XHJcblx0dGhpcy5jb250YWluZXIuQ2FydC5ib290ZWQgPSBmYWxzZTtcclxufVxyXG5cclxuLyoqXHJcbiAqIEF0dGFjaGVzIGEgbG9hZGVyIHRvIHRoZSB0b3Agb2YgdGhlIHNjcmVlblxyXG4gKiBhbmQgaGlkZXMgdGhlIGNvbnRlbnQuXHJcbiAqIFN0b3BzIGF1dG9tYXRpY2FsbHkgYWZ0ZXIgMjAlIHJlYWNoZWQuXHJcbiAqXHJcbiAqIEByZXR1cm4gdm9pZCBcclxuICovXHJcbmZ1bmN0aW9uIHN0YXJ0TG9hZGluZygpIHtcclxuXHRsZXQgbG9hZGVyID0gRE9NLmNyZWF0ZUVsZW1lbnQoJ2RpdicsIHtcclxuXHRcdGNsYXNzOiAnbG9hZGluZy1wcm9ncmVzcy1iYXInXHJcblx0fSk7XHJcblxyXG5cdGxldCBmaWxsID0gRE9NLmNyZWF0ZUVsZW1lbnQoJ3NwYW4nLCB7XHJcblx0XHRjbGFzczogJ2xvYWRpbmctcHJvZ3Jlc3MtZmlsbCdcclxuXHR9KTtcclxuXHJcblx0bG9hZGVyLmFwcGVuZENoaWxkKGZpbGwpO1xyXG5cdGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQobG9hZGVyKTtcclxuXHJcblxyXG5cdGxldCBwcm9ncmVzcyA9IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRXaWR0aDtcclxuXHRsZXQgbWF4U2l6ZSA9IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRXaWR0aCAqIDAuODA7XHJcblxyXG5cdHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUocHJvZ3Jlc3NEcmF3KTtcclxuXHJcblx0bGV0IGNvbnRlbnQgPSB0aGlzLndyYXBwZXI7XHJcblxyXG5cdGNvbnRlbnQuc3R5bGUuZGlzcGxheSA9ICdub25lJztcclxuXHRcclxuXHRmdW5jdGlvbiBwcm9ncmVzc0RyYXcoKSB7XHJcblx0XHRmaWxsLnN0eWxlLnRyYW5zZm9ybSA9ICd0cmFuc2xhdGVYKC0nICsgcHJvZ3Jlc3MgKyAncHgpJztcclxuXHRcdHByb2dyZXNzIC09IDc7XHJcblxyXG5cdFx0aWYgKHByb2dyZXNzIDwgbWF4U2l6ZSkge1xyXG5cdFx0XHRkb25lKCk7XHJcblx0XHRcdHJldHVybjtcclxuXHRcdH1cclxuXHJcblx0XHR3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKHByb2dyZXNzRHJhdyk7XHJcblx0fVxyXG5cclxuXHRmdW5jdGlvbiBkb25lKCkge1xyXG5cdFx0ZmlsbC5zdHlsZS5vcGFjaXR5ID0gcHJvZ3Jlc3MgLyAxMDAwO1xyXG5cdFx0ZmlsbC5zdHlsZS50cmFuc2Zvcm0gPSAndHJhbnNsYXRlWCgtJyArIHByb2dyZXNzICsgJ3B4KSc7XHJcblx0XHJcblx0XHRwcm9ncmVzcyAtPSAxNTtcclxuXHJcblx0XHRpZiAocHJvZ3Jlc3MgPD0gMCkge1xyXG5cdFx0XHRjb250ZW50LnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xyXG5cdFx0XHRcclxuXHRcdFx0aWYgKHR5cGVvZiBsb2FkZXIgIT0gJ3VuZGVmaW5lZCcpIHtcclxuXHRcdFx0XHRET00ucmVtb3ZlKGxvYWRlcik7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHJldHVybjtcclxuXHRcdH1cclxuXHJcblx0XHR3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKGRvbmUpO1xyXG5cdH1cclxufVxuXG5yZXR1cm4gVHVyYm9FY29tbWVyY2U7XG5cbn0oKSk7XG4iXX0=
