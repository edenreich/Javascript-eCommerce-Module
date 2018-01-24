'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var TurboeCommerce = function () {
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

	var ExceptionHandler = function () {
		function ExceptionHandler() {
			var message = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

			_classCallCheck(this, ExceptionHandler);

			if (Error.captureStackTrace) {
				Error.captureStackTrace(this, this.constructor.name);
			}
		}

		/**
   * Handle all the errors
   */


		_createClass(ExceptionHandler, [{
			key: 'stackTrace',
			value: function stackTrace(error, message) {
				this.customActions(error, message);

				var debugLevel = TurboeCommerce.debugLevel();

				if (debugLevel == 'error') {
					this.handleErrors(error, message);
				} else if (debugLevel == 'warning') {
					this.handleWarnings(error, message);
				} else if (debugLevel == 'info') {
					this.handleInfos(error, message);
				}
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
    * @param bool | all
    */

		}, {
			key: 'loadProducts',
			value: function loadProducts() {
				var pageNumber = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
				var all = arguments[1];

				if (Container$4.Pagination && Container$4.Pagination.booted) {

					if (Container$4.Pagination.settings.proccessing == 'client-side') {
						return this.loadPageProductsByClient(pageNumber);
					} else if (Container$4.Pagination.settings.proccessing == 'server-side') {
						return this.loadPageProductsByServer(pageNumber);
					} else {
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
				if (DOM.find('#Turbo-eCommerce-Products')) {
					return;
				}

				var width = this.settings.width || 'auto';
				var height = this.settings.height || '200px';
				var minWidth = this.settings.min_width || '200px';
				var maxWidth = this.settings.max_width || '250px';

				var css = '\n\t\t\t.product {\n\t\t\t\tposition: relative;\n\t\t\t\tmargin: 5px 5px;\n\t\t\t\tborder: 1px solid #e4e4e4;\n\t\t\t\twidth: ' + width + ';\n\t\t\t\tmin-width: ' + minWidth + ';\n\t\t\t\tmax-width: ' + maxWidth + ';\n\t\t\t\theight: ' + height + ';\n\t\t\t\tcursor: pointer;\n\t\t\t\tcolor: #ffffff;\n\t\t\t\toverflow: hidden;\n\t\t\t}\n\n\t\t\t.product > .product-overlay {\n\t\t\t\tposition: absolute;\n\t\t\t\ttop: 0;\n\t\t\t\tleft: 0;\n\t\t\t\twidth: 100%;\n\t\t\t\theight: 100%;\n\t\t\t\topacity: 0.5;\n\t\t\t\tz-index: 5;\n\t\t\t\ttransition: 1s all;\n\t\t\t\ttransform: translateX(-250px);\n\t\t\t}\n\n\t\t\t.product:hover > .product-overlay {\n\t\t\t\tbackground: rgba(0, 0, 0, 0.45);\n\t\t\t\ttransform: translateX(0px);\n\t\t\t\topacity: 1;\n\t\t\t\ttransition: 1s all;\n\t\t\t}\n\n\t\t\t.product > img {\n\t\t\t\tposition: absolute;\n\t\t\t\tleft: 0;\n\t\t\t\ttop: 0;\n\t\t\t\twidth: 100%;\n\t\t\t\theight: 100%;\n\t\t\t}\n\n\t\t\t.product > .product-image {\n\t\t\t\tz-index: 0;\n\t\t\t\tposition: absolute;\n\t\t\t\ttop: 0;\n\t\t\t\tleft: 0;\n\t\t\t}\n\n\t\t\t.product > .product-overlay > .product-name, \n\t\t\t.product > .product-overlay > .product-price,\n\t\t\t.product > .product-overlay > .product-delivery-time {\n\t\t\t\tz-index: 1;\n\t\t\t\tposition: relative;\n\t\t\t\ttext-align: center;\n\t\t\t\tmargin-top: 25px;\n\t\t\t}\n\n\t\t\t.product > .product-overlay > .action-buttons {\n\t\t\t\twidth: 100%;\n\t\t\t\tmargin-top: 10px;\n\t\t\t\ttext-align: center;\n\t\t\t}\n\n\t\t\t.product > .product-overlay > .action-buttons > #favorite {\n\t\t\t\tmargin-left: 10px;\n\t\t\t}\n\n\t\t';

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


	var defaultSettings$5 = {
		element: '.pagination-links',
		proccessing: 'client-side',
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
				if ((typeof settings === 'undefined' ? 'undefined' : _typeof(settings)) != 'object') {
					throw new InvalidArgumentException$1();
				}

				this.settings = Common.extend(defaultSettings$5, settings);

				this.totalPages = this.calculateTotalPages(this.settings.per_page, this.settings.total_items);

				this.setElement(this.settings.element);
				this.links = this.createLinks();
				this.bindEventListeners(this.links);
				this.replaceLinks(this.links);
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
						throw new NotInPageRangeException();
					}

					Products$2.loadProducts(requestedPage).then(function (products) {
						instance.setCurrent(requestedPage);
					});
				};

				this.previous.childNodes[0].onclick = function (e) {
					e.preventDefault();

					var requestedPage = instance.current - 1;

					if (instance.notInPageRange(requestedPage)) {
						throw new NotInPageRangeException();
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

	var defaultSettings = {
		debug_level: 'error',
		element: 'body',
		inject_libraries: [],
		components: ['Products', 'Services', 'Filter', 'Pagination', 'Cart']
	};

	var externalLibraries = {
		bootstrap: 'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css'
	};

	var _debugLevel = void 0;

	var TurboeCommerce$1 = function () {
		function TurboeCommerce$1(settings) {
			_classCallCheck(this, TurboeCommerce$1);

			if ((typeof settings === 'undefined' ? 'undefined' : _typeof(settings)) != 'object') {
				throw new InvalidArgumentException$1();
			}

			this.container = new Container();
			this.settings = Common.extend(defaultSettings, settings);

			this.loadExternalLibraries();

			document.addEventListener('DOMContentLoaded', function () {
				this.setElement(this.settings.element);
				this.addStyleTag();
			}.bind(this));

			_debugLevel = this.settings.debug_level;

			if (_debugLevel == 'warning' || _debugLevel == 'info') {
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

		_createClass(TurboeCommerce$1, [{
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
    */

		}, {
			key: 'addStyleTag',
			value: function addStyleTag() {
				if (DOM.find('#Turboe-Commerce')) {
					return;
				}

				var css = '\n\t\t\t' + this.settings.element + ' {\n\t\t\t\tposition: relative;\n\t\t\t\tclear: both;\n\t\t\t}\n\t\t';

				DOM.addStyle('Turbo-eCommerce', css);
			}
		}], [{
			key: 'debugLevel',
			value: function debugLevel() {
				return _debugLevel;
			}
		}]);

		return TurboeCommerce$1;
	}();

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
			var component = new Products(container, request, container.Events);
			component.booted = true;
			return component;
		});

		this.container.bind('Pagination', function (container) {
			var component = new Pagination(container, container.make('Products'), container.Events);
			component.booted = true;
			return component;
		});

		this.container.bind('Cart', function (container) {
			var component = new Cart(container, request, container.Events);
			component.booted = true;
			return component;
		});

		this.container.Filter.booted = false;
		this.container.Services.booted = false;
		this.container.Products.booted = false;
		this.container.Pagination.booted = false;
		this.container.Cart.booted = false;
	}

	return TurboeCommerce$1;
}();
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlR1cmJvZUNvbW1lcmNlLmpzIl0sIm5hbWVzIjpbIlR1cmJvZUNvbW1lcmNlIiwiU3RyIiwic3RyaW5nIiwicmVwbGFjZSIsInRvTG93ZXJDYXNlIiwibGVuZ3RoIiwicG9zc2libGUiLCJpIiwiY2hhckF0IiwiTWF0aCIsImZsb29yIiwicmFuZG9tIiwidG9VcHBlckNhc2UiLCJzbGljZSIsIkV4Y2VwdGlvbkhhbmRsZXIiLCJtZXNzYWdlIiwiRXJyb3IiLCJjYXB0dXJlU3RhY2tUcmFjZSIsImNvbnN0cnVjdG9yIiwibmFtZSIsImVycm9yIiwiY3VzdG9tQWN0aW9ucyIsImRlYnVnTGV2ZWwiLCJoYW5kbGVFcnJvcnMiLCJoYW5kbGVXYXJuaW5ncyIsImhhbmRsZUluZm9zIiwiY29uc29sZSIsIndhcm4iLCJpbmZvIiwiZGVmYXVsdE1lc3NhZ2UiLCJJbnZhbGlkQXJndW1lbnRFeGNlcHRpb24kMSIsIkRPTSIsImVsZW1lbnQiLCJjbGFzc05hbWUiLCJuZXdDbGFzc05hbWUiLCJyZW1vdmVDbGFzcyIsImFkZENsYXNzIiwidW5kZWZpbmVkIiwiY2xhc3NOYW1lcyIsInNwbGl0IiwiZm9yRWFjaCIsImNsYXNzTGlzdCIsImFkZCIsInJlbW92ZSIsImlkIiwiY3NzIiwiaGVhZCIsImRvY3VtZW50IiwiZ2V0RWxlbWVudHNCeVRhZ05hbWUiLCJzdHlsZVRhZyIsImNyZWF0ZUVsZW1lbnQiLCJDU1MiLCJtaW5pZnlDc3MiLCJpbm5lckhUTUwiLCJzZXRBdHRyaWJ1dGUiLCJhcHBlbmRDaGlsZCIsInNvdXJjZSIsImxpbmtlZFN0eWxlVGFnIiwiZWxlbWVudFR5cGUiLCJvcHRpb25zIiwib3B0aW9uIiwic2Vjb25kQ2xhc3NOYW1lIiwidG9nZ2xlIiwic2VsZWN0b3IiLCJjb250ZXh0Iiwid2luZG93IiwicXVlcnlFbGVtZW50IiwicGFyZW50RWxlbWVudCIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJoYXNDaGlsZCIsImNoaWxkRWxlbWVudCIsIm5vZGUiLCJwYXJlbnROb2RlIiwiQ29tbW9uIiwiY3VycmVudE9iamVjdCIsIm5ld09iamVjdCIsImV4dGVuZGVkIiwicHJvcCIsIk9iamVjdCIsInByb3RvdHlwZSIsImhhc093blByb3BlcnR5IiwiY2FsbCIsIm5lZWRsZSIsImh5c3RhY2siLCJBcnJheSIsInRvdGFsIiwic2l6ZSIsImlzTmFOIiwicGFyc2VJbnQiLCJjb2xsZWN0aW9uIiwiY2VpbCIsInN0YXJ0IiwiZW5kIiwicHVzaCIsIm9iamVjdCIsImRlZmF1bHRNZXNzYWdlJDEiLCJJbnZhbGlkRGF0YVN0cnVjdHVyZUV4Y2VwdGlvbiIsImRlZmF1bHRTZXR0aW5ncyQxIiwiaGVhZGVycyIsImFzeW5jIiwiUmVxdWVzdCIsInNldHRpbmdzIiwieGhyIiwiWE1MSHR0cFJlcXVlc3QiLCJBY3RpdmVYT2JqZWN0IiwiZXh0ZW5kIiwic2V0RGVmYXVsdFJlcXVlc3RIZWFkZXIiLCJoZWFkZXIiLCJvcGVuIiwic2V0UmVxdWVzdEhlYWRlciIsInJlc3BvbnNlIiwiYXBwbHkiLCJhcmd1bWVudHMiLCJiZWZvcmUiLCJQcm9taXNlIiwicmVzb2x2ZSIsInJlamVjdCIsImRhdGEiLCJ1cmwiLCJyZXNwb25zZVR5cGUiLCJkYXRhVHlwZSIsInRpbWVvdXQiLCJvbnJlYWR5c3RhdGVjaGFuZ2UiLCJyZWFkeVN0YXRlIiwic3RhdHVzIiwiYWZ0ZXIiLCJvbmVycm9yIiwic2VuZCIsInF1ZXJ5U3RyaW5nIiwia2V5cyIsIm1hcCIsImtleSIsImVuY29kZVVSSUNvbXBvbmVudCIsImpvaW4iLCJkZWZhdWx0TWVzc2FnZSQyIiwiSW52YWxpZEJpbmRpbmdFeGNlcHRpb24iLCJpbnN0YW5jZXMiLCJDb250YWluZXIiLCJjb25jcmV0ZSIsImJpbmQiLCJpbnN0YW5jZSIsImFsaWFzIiwiaW5zdGFuY2VFeGlzdCIsImdldEluc3RhbmNlIiwic2V0SW5zdGFuY2UiLCJkZWZhdWx0TWVzc2FnZSQzIiwiQmFkRXZlbnRDYWxsRXhjZXB0aW9uIiwiRXZlbnRNYW5hZ2VyIiwiZXZlbnRzIiwiY2FsbGJhY2siLCJJbnZhbGlkQXJndW1lbnRFeGNlcHRpb24iLCJDb29raWUiLCJ2YWx1ZSIsImRheXMiLCJKU09OIiwic3RyaW5naWZ5IiwiZXhwaXJlcyIsImRhdGUiLCJEYXRlIiwic2V0VGltZSIsImdldFRpbWUiLCJ0b0dNVFN0cmluZyIsImNvb2tpZSIsImNfc3RhcnQiLCJpbmRleE9mIiwiY19lbmQiLCJwYXJzZSIsInVuZXNjYXBlIiwic3Vic3RyaW5nIiwiZGVmYXVsdFNldHRpbmdzJDIiLCJjb29raWVfbmFtZSIsInByZXZpZXdfY2xhc3MiLCJsb2FkZXIiLCJjbGFzcyIsIndpZHRoIiwiaGVpZ2h0IiwicGxhY2VtZW50IiwiZml4ZWQiLCJob3Zlcl9jb2xvciIsIkNvbnRhaW5lciQyIiwiRXZlbnRNYW5hZ2VyJDIiLCJIdHRwIiwibG9hZGluZ092ZXJsYXkiLCJpdGVtc0RpdiIsIkNhcnQiLCJjb250YWluZXIiLCJodHRwIiwiZXZlbnRNYW5hZ2VyIiwicHJldmlld0VsZW1lbnQiLCJjcmVhdGVQcmV2aWV3RWxlbWVudCIsInN2Z0ljb24iLCJjcmVhdGVJY29uIiwic2V0RWxlbWVudCIsImJpbmRFdmVudExpc3RlbmVycyIsImFkZFN0eWxlVGFnIiwiaXNFbXB0eSIsImdldCIsImNhcnQiLCJzZXRDYXJ0IiwiZW1wdHlPYmplY3QiLCJpdGVtcyIsImZhdm9yaXRlcyIsInNldCIsIml0ZW0iLCJzcGxpY2UiLCJsaSIsImF0dHJpYnV0ZXMiLCJhdHRyaWJ1dGUiLCJzcGFuIiwidGV4dCIsImljb24iLCJmaW5kIiwicG9zaXRpb24iLCJhZGRTdHlsZSIsInNyYyIsInJlbW92ZUNoaWxkIiwicHJldmlld1N0YXJ0TG9hZGluZyIsImdldENhcnRJdGVtcyIsImFkZFRvUHJldmlldyIsInNldFRpbWVvdXQiLCJwcmV2aWV3U3RvcExvYWRpbmciLCJvbmNsaWNrIiwiZSIsInByZXZlbnREZWZhdWx0Iiwib3BlbmluZyIsInRvZ2dsZUNsYXNzIiwicmVsb2FkQ2FydFByZXZpZXciLCJzdWJzY3JpYmUiLCJjbG9zZSIsImV2ZW50Iiwic3dpdGNoQ2xhc3NlcyIsInN2ZyIsImNyZWF0ZUVsZW1lbnROUyIsImciLCJwYXRoIiwiZGVmYXVsdFNldHRpbmdzJDMiLCJDb250YWluZXIkMyIsIkZpbHRlciIsImFkZEV2ZW50TGlzdGVuZXIiLCJ3cmFwcGVyIiwibWluV2lkdGgiLCJtaW5fd2lkdGgiLCJkZWZhdWx0U2V0dGluZ3MkNCIsIml0ZW1fY2xhc3MiLCJhZGRfYnV0dG9uX2NsYXNzIiwiZmF2b3JpdGVfYnV0dG9uX2NsYXNzIiwiQ29udGFpbmVyJDQiLCJFdmVudE1hbmFnZXIkMyIsIkh0dHAkMSIsImNodW5rZWRQcm9kdWN0cyIsIlByb2R1Y3RzIiwidG90YWxJdGVtcyIsImxvYWRQcm9kdWN0cyIsInBhZ2VOdW1iZXIiLCJhbGwiLCJQYWdpbmF0aW9uIiwiYm9vdGVkIiwicHJvY2Nlc3NpbmciLCJsb2FkUGFnZVByb2R1Y3RzQnlDbGllbnQiLCJsb2FkUGFnZVByb2R1Y3RzQnlTZXJ2ZXIiLCJyZXF1ZXN0IiwiZ2V0UHJvZHVjdHMiLCJ0aGVuIiwicHJvZHVjdHMiLCJjdXJyZW50SXRlbXMiLCJwcm9kdWN0IiwicHVibGlzaCIsInJlcGxhY2VJdGVtcyIsImNhdGNoIiwicGFnZXMiLCJjYWxjdWxhdGVDbGllbnRQYWdlcyIsInRvdGFsX2l0ZW1zIiwicGVyUGFnZSIsInBlcl9wYWdlIiwiYXJyYXlfY2h1bmsiLCJpc0FycmF5IiwiYnVpbGRQcm9kdWN0cyIsImFjdGlvbiIsImF0dHJpYnV0ZXNDb2xsZWN0aW9uIiwidGFnVHlwZSIsImJ1aWx0UHJvZHVjdHMiLCJidWlsdFByb2R1Y3QiLCJidWlsZFByb2R1Y3QiLCJvdmVybGF5IiwiaW5fYXJyYXkiLCJ0YWciLCJpbWFnZSIsImtlYmFiQ2FzZSIsImFkZFRvQ2FydCIsInR5cGUiLCJmYXZvcml0ZSIsIm1heFdpZHRoIiwibWF4X3dpZHRoIiwiU2VydmljZXMiLCJkZWZhdWx0TWVzc2FnZSQ0IiwiTm90SW5QYWdlUmFuZ2VFeGNlcHRpb24iLCJkZWZhdWx0U2V0dGluZ3MkNSIsIkNvbnRhaW5lciQ1IiwiUHJvZHVjdHMkMiIsInNldEN1cnJlbnQiLCJ0b3RhbFBhZ2VzIiwiY2FsY3VsYXRlVG90YWxQYWdlcyIsImxpbmtzIiwiY3JlYXRlTGlua3MiLCJyZXBsYWNlTGlua3MiLCJuZXh0IiwiY2hpbGROb2RlcyIsInJlcXVlc3RlZFBhZ2UiLCJjdXJyZW50Iiwibm90SW5QYWdlUmFuZ2UiLCJwcmV2aW91cyIsImdldEF0dHJpYnV0ZSIsImNoYW5nZVVybCIsInNldEFjdGl2ZUxpbmsiLCJ1bCIsImNyZWF0ZVBhZ2VMaW5rcyIsImNyZWF0ZVByZXZpb3VzQnV0dG9uIiwiY3JlYXRlTmV4dEJ1dHRvbiIsInBhZ2UiLCJwYWdlSXRlbSIsImxpbmsiLCJzcGFuMSIsInNwYW4yIiwiaGlzdG9yeSIsInJlcGxhY2VTdGF0ZSIsInVwZGF0ZVVSTFBhcmFtZXRlciIsImxvY2F0aW9uIiwiaHJlZiIsInZhcnMiLCJwYXJ0cyIsIm0iLCJwYXJhbSIsInBhcmFtVmFsIiwibmV3QWRkaXRpb25hbFVSTCIsInRlbXBBcnJheSIsImJhc2VVUkwiLCJhZGRpdGlvbmFsVVJMIiwidGVtcCIsInJvd3NUZXh0IiwiZGVmYXVsdE1lc3NhZ2UkNSIsIkNvbXBvbmVudE5vdFJlZ2lzdGVyZWRFeGNlcHRpb24iLCJkZWZhdWx0U2V0dGluZ3MiLCJkZWJ1Z19sZXZlbCIsImluamVjdF9saWJyYXJpZXMiLCJjb21wb25lbnRzIiwiZXh0ZXJuYWxMaWJyYXJpZXMiLCJib290c3RyYXAiLCJUdXJib2VDb21tZXJjZSQxIiwibG9hZEV4dGVybmFsTGlicmFyaWVzIiwiYmluZENvbXBvbmVudHNEZXBlbmRlbmNpZXMiLCJQcm94eSIsInRhcmdldCIsIm1ha2UiLCJsaWJyYXJpZXMiLCJ1Y2ZpcnN0IiwiYWRkTGlua2VkU3R5bGUiLCJjb21wb25lbnQiLCJFdmVudHMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxJQUFJQSxpQkFBa0IsWUFBWTtBQUNsQzs7QUFFQTs7Ozs7Ozs7QUFIa0MsS0FXNUJDLEdBWDRCO0FBQUE7QUFBQTtBQUFBOztBQUFBO0FBQUE7O0FBYWpDOzs7Ozs7QUFiaUMsNkJBbUJoQkMsTUFuQmdCLEVBb0JqQztBQUNDLFdBQU9BLE9BQU9DLE9BQVAsQ0FBZSxpQkFBZixFQUFrQyxPQUFsQyxFQUEyQ0MsV0FBM0MsRUFBUDtBQUNBOztBQUVEOzs7Ozs7O0FBeEJpQztBQUFBO0FBQUEsMEJBOEJuQkMsTUE5Qm1CLEVBK0JqQztBQUNDLFFBQUlILFNBQVMsRUFBYjtBQUNBLFFBQUlJLFdBQVcsZ0VBQWY7O0FBRUEsU0FBSyxJQUFJQyxJQUFJLENBQWIsRUFBZ0JBLElBQUlGLE1BQXBCLEVBQTRCRSxHQUE1QixFQUFpQztBQUM3QkwsZUFBVUksU0FBU0UsTUFBVCxDQUFnQkMsS0FBS0MsS0FBTCxDQUFXRCxLQUFLRSxNQUFMLEtBQWdCTCxTQUFTRCxNQUFwQyxDQUFoQixDQUFWO0FBQ0g7O0FBRUQsV0FBT0gsTUFBUDtBQUNBOztBQUVEOzs7Ozs7OztBQTFDaUM7QUFBQTtBQUFBLDJCQWlEbEJBLE1BakRrQixFQWtEakM7QUFDSSxXQUFPQSxPQUFPTSxNQUFQLENBQWMsQ0FBZCxFQUFpQkksV0FBakIsS0FBaUNWLE9BQU9XLEtBQVAsQ0FBYSxDQUFiLENBQXhDO0FBQ0g7QUFwRGdDOztBQUFBO0FBQUE7O0FBQUEsS0F1RDVCQyxnQkF2RDRCO0FBeURqQyw4QkFDQTtBQUFBLE9BRFlDLE9BQ1osdUVBRHNCLElBQ3RCOztBQUFBOztBQUNDLE9BQUlDLE1BQU1DLGlCQUFWLEVBQTZCO0FBQzVCRCxVQUFNQyxpQkFBTixDQUF3QixJQUF4QixFQUE4QixLQUFLQyxXQUFMLENBQWlCQyxJQUEvQztBQUNBO0FBQ0Q7O0FBRUQ7Ozs7O0FBaEVpQztBQUFBO0FBQUEsOEJBbUV0QkMsS0FuRXNCLEVBbUVmTCxPQW5FZSxFQW9FakM7QUFDQyxTQUFLTSxhQUFMLENBQW1CRCxLQUFuQixFQUEwQkwsT0FBMUI7O0FBRUEsUUFBSU8sYUFBYXRCLGVBQWVzQixVQUFmLEVBQWpCOztBQUVBLFFBQUlBLGNBQWMsT0FBbEIsRUFBMkI7QUFDdkIsVUFBS0MsWUFBTCxDQUFrQkgsS0FBbEIsRUFBeUJMLE9BQXpCO0FBQ0EsS0FGSixNQUVVLElBQUlPLGNBQWMsU0FBbEIsRUFBNkI7QUFDbkMsVUFBS0UsY0FBTCxDQUFvQkosS0FBcEIsRUFBMkJMLE9BQTNCO0FBQ0EsS0FGTSxNQUVBLElBQUlPLGNBQWMsTUFBbEIsRUFBMEI7QUFDaEMsVUFBS0csV0FBTCxDQUFpQkwsS0FBakIsRUFBd0JMLE9BQXhCO0FBQ0E7QUFDSjtBQWhGZ0M7QUFBQTtBQUFBLGdDQWtGcEJLLEtBbEZvQixFQWtGYkwsT0FsRmEsRUFtRmpDO0FBQ0NXLFlBQVFOLEtBQVIsQ0FBY0EsTUFBTUYsV0FBTixDQUFrQkMsSUFBbEIsR0FBeUIsSUFBekIsR0FBZ0NKLE9BQTlDO0FBQ0E7QUFyRmdDO0FBQUE7QUFBQSxrQ0F1RmxCSyxLQXZGa0IsRUF1RlhMLE9BdkZXLEVBd0ZqQztBQUNDVyxZQUFRQyxJQUFSLENBQWFQLE1BQU1GLFdBQU4sQ0FBa0JDLElBQWxCLEdBQXlCLElBQXpCLEdBQWdDSixPQUE3QztBQUNBO0FBMUZnQztBQUFBO0FBQUEsK0JBNEZyQkssS0E1RnFCLEVBNEZkTCxPQTVGYyxFQTZGakM7QUFDQ1csWUFBUUUsSUFBUixDQUFhUixNQUFNRixXQUFOLENBQWtCQyxJQUFsQixHQUF5QixJQUF6QixHQUFnQ0osT0FBN0M7QUFDQTtBQS9GZ0M7QUFBQTtBQUFBLGlDQWlHbkJLLEtBakdtQixFQWlHWkwsT0FqR1ksRUFrR2pDO0FBQ0MsUUFBSUssTUFBTUYsV0FBTixDQUFrQkMsSUFBbEIsSUFBMEIsMEJBQTlCLEVBQTBEO0FBQ3pEO0FBQ0EsS0FGRCxNQUVPLElBQUlDLE1BQU1GLFdBQU4sQ0FBa0JDLElBQWxCLElBQTBCLHlCQUE5QixFQUF5RDtBQUMvRDtBQUNBLEtBRk0sTUFFQSxJQUFJQyxNQUFNRixXQUFOLENBQWtCQyxJQUFsQixJQUEwQix1QkFBOUIsRUFBdUQ7QUFDN0Q7QUFDQSxLQUZNLE1BRUEsSUFBSUMsTUFBTUYsV0FBTixDQUFrQkMsSUFBbEIsSUFBMEIscUJBQTlCLEVBQXFEO0FBQzNEO0FBQ0EsS0FGTSxNQUVBLElBQUlDLE1BQU1GLFdBQU4sQ0FBa0JDLElBQWxCLElBQTBCLGlDQUE5QixFQUFpRTtBQUN2RTtBQUNBLEtBRk0sTUFFQSxJQUFJQyxNQUFNRixXQUFOLENBQWtCQyxJQUFsQixJQUEwQix5QkFBOUIsRUFBeUQ7QUFDL0Q7QUFDQSxLQUZNLE1BRUE7QUFDTixZQUFPLEtBQVA7QUFDQTs7QUFFRCxXQUFPLEtBQVA7QUFDQTtBQXBIZ0M7O0FBQUE7QUFBQTs7QUF1SGxDLEtBQUlVLGlCQUFpQixpQ0FBckI7O0FBdkhrQyxLQXlINUJDLDBCQXpINEI7QUFBQTs7QUEySGpDLHdDQUNBO0FBQUEsT0FEWWYsT0FDWix1RUFEc0IsSUFDdEI7O0FBQUE7O0FBQ0NBLGFBQVVBLFdBQVdjLGNBQXJCOztBQURELHVKQUVPZCxPQUZQOztBQUdJLCtKQUF1QkEsT0FBdkI7QUFISjtBQUlJOztBQWhJNkI7QUFBQSxHQXlIT0QsZ0JBekhQOztBQW1JbEM7Ozs7Ozs7O0FBbklrQyxLQTJJNUJpQixHQTNJNEI7QUFBQTtBQUFBO0FBQUE7O0FBQUE7QUFBQTs7QUE2SWpDOzs7Ozs7QUE3SWlDLDZCQW1KaEI3QixNQW5KZ0IsRUFvSmpDO0FBQ0lBLGFBQVNBLE9BQU9DLE9BQVAsQ0FBZSx3Q0FBZixFQUF5RCxFQUF6RCxDQUFUO0FBQ0FELGFBQVNBLE9BQU9DLE9BQVAsQ0FBZSxRQUFmLEVBQXlCLEdBQXpCLENBQVQ7QUFDQUQsYUFBU0EsT0FBT0MsT0FBUCxDQUFlLFVBQWYsRUFBMkIsSUFBM0IsQ0FBVDtBQUNBRCxhQUFTQSxPQUFPQyxPQUFQLENBQWUsVUFBZixFQUEyQixJQUEzQixDQUFUO0FBQ0FELGFBQVNBLE9BQU9DLE9BQVAsQ0FBZSxLQUFmLEVBQXNCLEdBQXRCLENBQVQ7O0FBRUEsV0FBT0QsTUFBUDtBQUNIOztBQUVEOzs7Ozs7Ozs7QUE5SmlDO0FBQUE7QUFBQSxpQ0FzS1o4QixPQXRLWSxFQXNLSEMsU0F0S0csRUFzS1FDLFlBdEtSLEVBdUtqQztBQUNDLFNBQUtDLFdBQUwsQ0FBaUJILE9BQWpCLEVBQTBCQyxTQUExQjtBQUNBLFNBQUtHLFFBQUwsQ0FBY0osT0FBZCxFQUF1QkUsWUFBdkI7QUFDQTs7QUFFRDs7Ozs7Ozs7QUE1S2lDO0FBQUE7QUFBQSw0QkFtTGpCRixPQW5MaUIsRUFtTFJDLFNBbkxRLEVBb0xqQztBQUNDLFFBQUdELFlBQVksSUFBZixFQUFxQjtBQUNwQixXQUFNLElBQUlGLDBCQUFKLEVBQU47QUFDQTs7QUFFRCxRQUFHLENBQUVHLFNBQUYsSUFBZUEsYUFBYSxFQUE1QixJQUFrQyxRQUFPQSxTQUFQLHlDQUFPQSxTQUFQLE9BQXFCSSxTQUExRCxFQUFxRTtBQUNwRSxZQUFPTCxPQUFQO0FBQ0E7O0FBRUQsUUFBSU0sYUFBYUwsVUFBVU0sS0FBVixDQUFnQixHQUFoQixDQUFqQjs7QUFFQUQsZUFBV0UsT0FBWCxDQUFtQixVQUFTckIsSUFBVCxFQUFlO0FBQ2pDYSxhQUFRUyxTQUFSLENBQWtCQyxHQUFsQixDQUFzQnZCLElBQXRCO0FBQ0EsS0FGRDs7QUFJQSxXQUFPYSxPQUFQO0FBQ0E7O0FBRUQ7Ozs7Ozs7O0FBdE1pQztBQUFBO0FBQUEsK0JBNk1kQSxPQTdNYyxFQTZNTEMsU0E3TUssRUE4TWpDO0FBQ0MsUUFBR0QsV0FBVyxJQUFkLEVBQW9CO0FBQ25CLFdBQU0sSUFBSUYsMEJBQUosRUFBTjtBQUNBOztBQUVELFFBQUdHLGFBQWEsRUFBaEIsRUFBb0I7QUFDbkJELGFBQVFDLFNBQVIsR0FBb0IsRUFBcEI7QUFDQSxLQUZELE1BRU87O0FBRU4sU0FBSUssYUFBYUwsVUFBVU0sS0FBVixDQUFnQixHQUFoQixDQUFqQjs7QUFFQUQsZ0JBQVdFLE9BQVgsQ0FBbUIsVUFBU3JCLElBQVQsRUFBZTtBQUNqQ2EsY0FBUVMsU0FBUixDQUFrQkUsTUFBbEIsQ0FBeUJ4QixJQUF6QjtBQUNBLE1BRkQ7QUFHQTs7QUFFRCxXQUFPYSxPQUFQO0FBQ0E7O0FBRUQ7Ozs7Ozs7O0FBak9pQztBQUFBO0FBQUEsNEJBd09qQlksRUF4T2lCLEVBd09iQyxHQXhPYSxFQXlPakM7QUFDQyxRQUFJLE9BQU9BLEdBQVAsSUFBYyxRQUFsQixFQUE0QjtBQUMzQixXQUFNLElBQUlmLDBCQUFKLEVBQU47QUFDQTs7QUFFRCxRQUFJZ0IsT0FBT0MsU0FBU0QsSUFBVCxJQUFpQkMsU0FBU0Msb0JBQVQsQ0FBOEIsTUFBOUIsRUFBc0MsQ0FBdEMsQ0FBNUI7QUFDQSxRQUFJQyxXQUFXRixTQUFTRyxhQUFULENBQXVCLE9BQXZCLENBQWY7O0FBRUE7QUFDRyxRQUFJQyxNQUFNLEtBQUtDLFNBQUwsQ0FBZVAsR0FBZixDQUFWO0FBQ0E7QUFDQUksYUFBU0ksU0FBVCxHQUFxQkYsR0FBckI7QUFDQTtBQUNIRixhQUFTSyxZQUFULENBQXNCLElBQXRCLEVBQTRCVixFQUE1QjtBQUNBO0FBQ0FFLFNBQUtTLFdBQUwsQ0FBaUJOLFFBQWpCO0FBQ0E7O0FBRUQ7Ozs7Ozs7O0FBM1BpQztBQUFBO0FBQUEsa0NBa1FYTCxFQWxRVyxFQWtRUFksTUFsUU8sRUFtUWpDO0FBQ0MsUUFBSSxPQUFPQSxNQUFQLElBQWlCLFFBQXJCLEVBQStCO0FBQzlCLFdBQU0sSUFBSTFCLDBCQUFKLENBQStCLGtGQUFpRjBCLE1BQWpGLHlDQUFpRkEsTUFBakYsS0FBMEYsc0JBQXpILENBQU47QUFDQTs7QUFFRCxRQUFJVixPQUFPQyxTQUFTRCxJQUFULElBQWlCQyxTQUFTQyxvQkFBVCxDQUE4QixNQUE5QixFQUFzQyxDQUF0QyxDQUE1QjtBQUNBLFFBQUlTLGlCQUFpQlYsU0FBU0csYUFBVCxDQUF1QixNQUF2QixDQUFyQjs7QUFFRztBQUNITyxtQkFBZUgsWUFBZixDQUE0QixJQUE1QixFQUFrQ1YsRUFBbEM7QUFDQWEsbUJBQWVILFlBQWYsQ0FBNEIsTUFBNUIsRUFBb0NFLE1BQXBDO0FBQ0FDLG1CQUFlSCxZQUFmLENBQTRCLEtBQTVCLEVBQW1DLFlBQW5DO0FBQ0FHLG1CQUFlSCxZQUFmLENBQTRCLE1BQTVCLEVBQW9DLFVBQXBDO0FBQ0E7QUFDQVIsU0FBS1MsV0FBTCxDQUFpQkUsY0FBakI7QUFDQTs7QUFFRDs7Ozs7Ozs7QUFwUmlDO0FBQUE7QUFBQSxpQ0EyUlpDLFdBM1JZLEVBMlJDQyxPQTNSRCxFQTRSakM7QUFDQyxRQUFJM0IsVUFBVWUsU0FBU0csYUFBVCxDQUF1QlEsV0FBdkIsQ0FBZDs7QUFFQSxRQUFJQyxZQUFZdEIsU0FBaEIsRUFBMkI7QUFDMUIsWUFBT0wsT0FBUDtBQUNBOztBQUVELFNBQUssSUFBSTRCLE1BQVQsSUFBbUJELE9BQW5CLEVBQTRCO0FBQzNCLFNBQUdDLFVBQVUsTUFBYixFQUFxQjtBQUNwQjVCLGNBQVFxQixTQUFSLEdBQW9CTSxRQUFRQyxNQUFSLENBQXBCO0FBQ0E7QUFDQTs7QUFFRDVCLGFBQVFzQixZQUFSLENBQXFCTSxNQUFyQixFQUE2QkQsUUFBUUMsTUFBUixDQUE3QjtBQUNBOztBQUVELFdBQU81QixPQUFQO0FBQ0E7O0FBRUQ7Ozs7Ozs7O0FBL1NpQztBQUFBO0FBQUEsK0JBc1RkQSxPQXRUYyxFQXNUTEMsU0F0VEssRUFzVE00QixlQXRUTixFQXVUakM7QUFDQyxRQUFJN0IsV0FBVyxJQUFYLElBQW1CLE9BQU9BLE9BQVAsSUFBa0IsV0FBekMsRUFBc0Q7QUFDckQsV0FBTSxJQUFJRiwwQkFBSixFQUFOO0FBQ0E7O0FBRUQrQixzQkFBa0JBLG1CQUFtQnhCLFNBQXJDOztBQUVBLFFBQUd3QixlQUFILEVBQW9CO0FBQ25CN0IsYUFBUVMsU0FBUixDQUFrQnFCLE1BQWxCLENBQXlCRCxlQUF6QjtBQUNBOztBQUVELFdBQU83QixRQUFRUyxTQUFSLENBQWtCcUIsTUFBbEIsQ0FBeUI3QixTQUF6QixDQUFQO0FBQ0E7O0FBRUQ7Ozs7Ozs7O0FBclVpQztBQUFBO0FBQUEsd0JBNFVyQjhCLFFBNVVxQixFQTZVakM7QUFBQSxRQURzQkMsT0FDdEIsdUVBRGdDQyxPQUFPbEIsUUFDdkM7O0FBQ0MsV0FBT21CLGFBQWFILFFBQWIsRUFBdUJDLE9BQXZCLENBQVA7QUFDQTtBQS9VZ0M7O0FBQUE7QUFBQTs7QUFrVmxDOzs7Ozs7Ozs7QUFPQSxVQUFTRSxZQUFULENBQXNCSCxRQUF0QixFQUFnQ0ksYUFBaEMsRUFDQTtBQUNDLE1BQUluQyxVQUFVbUMsY0FBY0MsZ0JBQWQsQ0FBK0JMLFFBQS9CLENBQWQ7O0FBRUEsTUFBSS9CLFFBQVEzQixNQUFSLElBQWtCLENBQXRCLEVBQXlCO0FBQ3hCLFVBQU8sSUFBUDtBQUNBOztBQUVELFNBQVEyQixRQUFRM0IsTUFBUixHQUFpQixDQUFsQixHQUF1QjJCLE9BQXZCLEdBQWlDQSxRQUFRLENBQVIsQ0FBeEM7QUFDQTs7QUFFRDs7Ozs7OztBQU9BLFVBQVNxQyxRQUFULENBQWtCRixhQUFsQixFQUFpQ0csWUFBakMsRUFDQTtBQUNLLE1BQUlDLE9BQU9ELGFBQWFFLFVBQXhCOztBQUVBLFNBQU9ELFFBQVEsSUFBZixFQUFxQjtBQUNqQixPQUFJQSxRQUFRSixhQUFaLEVBQTJCO0FBQ3ZCLFdBQU8sSUFBUDtBQUNIO0FBQ0RJLFVBQU9BLEtBQUtDLFVBQVo7QUFDSDs7QUFFRCxTQUFPLEtBQVA7QUFDSjs7QUFFRDs7Ozs7Ozs7QUF6WGtDLEtBaVk1QkMsTUFqWTRCO0FBQUE7QUFBQTtBQUFBOztBQUFBO0FBQUE7O0FBbVlqQzs7Ozs7OztBQW5ZaUMsMEJBMFluQkMsYUExWW1CLEVBMFlKQyxTQTFZSSxFQTBZTztBQUN2QyxRQUFJQyxXQUFXLEVBQWY7QUFDRyxRQUFJQyxJQUFKOztBQUVBLFNBQUtBLElBQUwsSUFBYUgsYUFBYixFQUE0QjtBQUN4QixTQUFJSSxPQUFPQyxTQUFQLENBQWlCQyxjQUFqQixDQUFnQ0MsSUFBaEMsQ0FBcUNQLGFBQXJDLEVBQW9ERyxJQUFwRCxDQUFKLEVBQStEO0FBQzNERCxlQUFTQyxJQUFULElBQWlCSCxjQUFjRyxJQUFkLENBQWpCO0FBQ0g7QUFDSjs7QUFFRCxTQUFLQSxJQUFMLElBQWFGLFNBQWIsRUFBd0I7QUFDcEIsU0FBSUcsT0FBT0MsU0FBUCxDQUFpQkMsY0FBakIsQ0FBZ0NDLElBQWhDLENBQXFDTixTQUFyQyxFQUFnREUsSUFBaEQsQ0FBSixFQUEyRDtBQUN2REQsZUFBU0MsSUFBVCxJQUFpQkYsVUFBVUUsSUFBVixDQUFqQjtBQUNIO0FBQ0o7O0FBRUQsV0FBT0QsUUFBUDtBQUNIOztBQUVEOzs7Ozs7Ozs7QUE3WmlDO0FBQUE7QUFBQSw0QkFxYWpCTSxNQXJhaUIsRUFxYVRDLE9BcmFTLEVBcWFBO0FBQ2hDLFFBQUdBLFFBQVFqRSxXQUFSLEtBQXdCa0UsS0FBM0IsRUFBa0M7QUFDakMsV0FBTSxJQUFJdEQsMEJBQUosRUFBTjtBQUNBOztBQUVELFNBQUksSUFBSXZCLElBQUksQ0FBWixFQUFlQSxLQUFLNEUsUUFBUTlFLE1BQTVCLEVBQW9DRSxHQUFwQyxFQUF5QztBQUN4QyxTQUFHMkUsVUFBVUMsUUFBUTVFLENBQVIsQ0FBYixFQUF5QjtBQUN4QixhQUFPLElBQVA7QUFDQTtBQUNEOztBQUVELFdBQU8sS0FBUDtBQUNBOztBQUVEOzs7Ozs7OztBQW5iaUM7QUFBQTtBQUFBLCtCQTBiZDhFLEtBMWJjLEVBMmJqQztBQUFBLFFBRDBCQyxJQUMxQix1RUFEaUMsQ0FDakM7O0FBQ00sUUFBSUMsTUFBTUQsSUFBTixDQUFKLEVBQWlCO0FBQ2hCLFdBQU0sSUFBSXhELDBCQUFKLENBQStCLG1GQUFrRndELElBQWxGLHlDQUFrRkEsSUFBbEYsS0FBeUYsa0JBQXhILENBQU47QUFDQTs7QUFFREEsV0FBT0UsU0FBU0YsSUFBVCxDQUFQOztBQUVDLFFBQUkvRSxVQUFKO0FBQ0EsUUFBSWtGLGFBQWEsRUFBakI7O0FBRUE7QUFDQSxTQUFLbEYsSUFBSSxDQUFULEVBQVlBLElBQUlFLEtBQUtpRixJQUFMLENBQVVMLE1BQU1oRixNQUFOLEdBQWVpRixJQUF6QixDQUFoQixFQUFnRC9FLEdBQWhELEVBQXFEOztBQUVqRCxTQUFJb0YsUUFBUXBGLElBQUkrRSxJQUFoQjtBQUNBLFNBQUlNLE1BQU1ELFFBQVFMLElBQWxCOztBQUVBRyxnQkFBV0ksSUFBWCxDQUFnQlIsTUFBTXhFLEtBQU4sQ0FBWThFLEtBQVosRUFBbUJDLEdBQW5CLENBQWhCO0FBRUg7O0FBRUQsV0FBT0gsVUFBUDtBQUNOOztBQUVEOzs7Ozs7O0FBbGRpQztBQUFBO0FBQUEsK0JBd2RkSyxNQXhkYyxFQXdkTjtBQUMxQixTQUFLLElBQUlqQixJQUFULElBQWlCaUIsTUFBakIsRUFBeUI7QUFDeEIsWUFBTyxLQUFQO0FBQ0E7O0FBRUQsV0FBTyxJQUFQO0FBQ0E7O0FBR0Q7Ozs7Ozs7O0FBamVpQztBQUFBO0FBQUEsa0NBd2VYQSxNQXhlVyxFQXdlSFgsT0F4ZUcsRUF5ZWpDO0FBQ0ksUUFBSTVFLFVBQUo7O0FBRUEsU0FBS0EsSUFBSSxDQUFULEVBQVlBLElBQUk0RSxRQUFROUUsTUFBeEIsRUFBZ0NFLEdBQWhDLEVBQXFDO0FBQ2pDLFNBQUksT0FBT3VGLE1BQVAsSUFBaUIsUUFBakIsSUFBNkJYLFFBQVE1RSxDQUFSLEVBQVdXLFdBQVgsQ0FBdUJDLElBQXZCLEtBQWdDMkUsTUFBakUsRUFBeUU7QUFDeEUsYUFBTyxJQUFQO0FBQ0E7O0FBRUQsU0FBSVgsUUFBUTVFLENBQVIsTUFBZXVGLE1BQW5CLEVBQTJCO0FBQ3ZCLGFBQU8sSUFBUDtBQUNIO0FBQ0o7O0FBRUQsV0FBTyxLQUFQO0FBQ0g7O0FBRUQ7Ozs7Ozs7QUF6ZmlDO0FBQUE7QUFBQSw0QkErZmpCQSxNQS9maUIsRUFnZ0JqQztBQUNDLFdBQU8sUUFBT0EsTUFBUCx5Q0FBT0EsTUFBUCxNQUFpQixRQUF4QjtBQUNBO0FBbGdCZ0M7O0FBQUE7QUFBQTs7QUFxZ0JsQyxLQUFJQyxtQkFBbUIsK0JBQXZCOztBQXJnQmtDLEtBdWdCNUJDLDZCQXZnQjRCO0FBQUE7O0FBeWdCakMsMkNBQ0E7QUFBQSxPQURZakYsT0FDWix1RUFEc0IsSUFDdEI7O0FBQUE7O0FBQ0NBLGFBQVVBLFdBQVdnRixnQkFBckI7O0FBREQsOEpBRU9oRixPQUZQOztBQUdJLHdLQUF1QkEsT0FBdkI7QUFISjtBQUlJOztBQTlnQjZCO0FBQUEsR0F1Z0JVRCxnQkF2Z0JWOztBQWloQmxDOzs7Ozs7O0FBT0E7Ozs7OztBQU1BLEtBQUltRixvQkFBb0I7QUFDdkJDLFdBQVM7QUFDUixtQkFBZ0I7QUFEUixHQURjO0FBSXZCQyxTQUFPO0FBSmdCLEVBQXhCOztBQTloQmtDLEtBcWlCNUJDLE9BcmlCNEI7QUF1aUJqQzs7Ozs7OztBQU9BLG1CQUFZQyxRQUFaLEVBQ0E7QUFBQTs7QUFDQyxRQUFLQyxHQUFMLEdBQVcsSUFBSUMsY0FBSixNQUF3QixJQUFJQyxhQUFKLENBQWtCLG1CQUFsQixDQUFuQztBQUNBLFFBQUtILFFBQUwsR0FBZ0I1QixPQUFPZ0MsTUFBUCxDQUFjUixpQkFBZCxFQUFpQ0ksUUFBakMsQ0FBaEI7QUFDQSxRQUFLSyx1QkFBTDtBQUNBOztBQUVEOzs7Ozs7O0FBcmpCaUM7QUFBQTtBQUFBLDZDQTJqQmpDO0FBQ0MsUUFBSUMsZUFBSjtBQUNBLFFBQUlULFVBQVUsS0FBS0csUUFBTCxDQUFjSCxPQUE1QjtBQUNBLFFBQUlDLFFBQVEsS0FBS0UsUUFBTCxDQUFjRixLQUExQjtBQUNBLFFBQUlTLE9BQU9MLGVBQWV4QixTQUFmLENBQXlCNkIsSUFBcEM7QUFDQSxRQUFJQyxtQkFBbUJOLGVBQWV4QixTQUFmLENBQXlCOEIsZ0JBQWhEOztBQUVBTixtQkFBZXhCLFNBQWYsQ0FBeUI2QixJQUF6QixHQUFnQyxZQUFXO0FBQzFDLFNBQUlFLFdBQVdGLEtBQUtHLEtBQUwsQ0FBVyxJQUFYLEVBQWlCQyxTQUFqQixFQUE0QmIsS0FBNUIsQ0FBZjs7QUFFQSxVQUFLUSxNQUFMLElBQWVULE9BQWYsRUFBd0I7QUFDdkIsV0FBS1csZ0JBQUwsQ0FBc0JGLE1BQXRCLEVBQThCVCxRQUFRUyxNQUFSLENBQTlCO0FBQ0E7O0FBRUMsWUFBT0csUUFBUDtBQUNGLEtBUkQ7QUFTQTs7QUFFRDs7Ozs7OztBQTdrQmlDO0FBQUE7QUFBQSx3QkFtbEI1Qm5ELE9BbmxCNEIsRUFvbEJqQztBQUNDLFFBQUkyQyxNQUFNLEtBQUtBLEdBQWY7O0FBRUEsUUFBRzNDLFFBQVFxQixjQUFSLENBQXVCLFFBQXZCLEtBQW9DLE9BQU9yQixRQUFRc0QsTUFBZixJQUF5QixVQUFoRSxFQUE0RTtBQUMzRXRELGFBQVFzRCxNQUFSLENBQWVoQyxJQUFmLENBQW9CLElBQXBCO0FBQ0E7O0FBRUQsV0FBTyxJQUFJaUMsT0FBSixDQUFZLFVBQVNDLE9BQVQsRUFBa0JDLE1BQWxCLEVBQTBCO0FBQzVDLFNBQUcsUUFBT3pELE9BQVAseUNBQU9BLE9BQVAsT0FBbUIsUUFBdEIsRUFBZ0M7QUFDL0IsWUFBTSxJQUFJM0MsS0FBSixDQUFVLDBFQUF3RTJDLE9BQXhFLHlDQUF3RUEsT0FBeEUsS0FBa0YsY0FBNUYsQ0FBTjtBQUNBOztBQUVEQSxhQUFRMEQsSUFBUixHQUFlMUQsUUFBUTBELElBQVIsSUFBZ0IsRUFBL0I7O0FBRUEsU0FBRyxRQUFPMUQsUUFBUTBELElBQWYsTUFBd0IsUUFBM0IsRUFBcUM7QUFDcEMsWUFBTSxJQUFJckcsS0FBSixDQUFVLG9GQUFtRjJDLFFBQVEwRCxJQUEzRixJQUFrRyxjQUE1RyxDQUFOO0FBQ0E7O0FBRURmLFNBQUlNLElBQUosQ0FBUyxNQUFULEVBQWlCakQsUUFBUTJELEdBQXpCLEVBQThCLElBQTlCOztBQUVBaEIsU0FBSWlCLFlBQUosR0FBbUI1RCxRQUFRNkQsUUFBUixJQUFvQixNQUF2QztBQUNBbEIsU0FBSW1CLE9BQUosR0FBYzlELFFBQVE4RCxPQUFSLElBQW1CLElBQWpDOztBQUVBbkIsU0FBSW9CLGtCQUFKLEdBQXlCLFlBQVc7QUFDaEMsVUFBRyxLQUFLQyxVQUFMLElBQW1CLENBQW5CLElBQXdCLEtBQUtDLE1BQUwsSUFBZSxHQUExQyxFQUErQztBQUM5QztBQUNBOztBQUVFVCxjQUFRLEtBQUtMLFFBQWI7O0FBRUEsVUFBR25ELFFBQVFxQixjQUFSLENBQXVCLE9BQXZCLEtBQW1DLE9BQU9yQixRQUFRa0UsS0FBZixJQUF3QixVQUE5RCxFQUEwRTtBQUMvRWxFLGVBQVFrRSxLQUFSLENBQWM1QyxJQUFkLENBQW1CLElBQW5CO0FBQ0E7QUFDRCxNQVZEOztBQVlBcUIsU0FBSXdCLE9BQUosR0FBYyxVQUFTL0csT0FBVCxFQUFrQjtBQUMvQjRDLGNBQVF2QyxLQUFSLENBQWNMLE9BQWQ7QUFDQXFHLGFBQU9yRyxPQUFQO0FBQ0EsTUFIRDs7QUFLQSxTQUFHLENBQUU0QyxRQUFRMEQsSUFBYixFQUFtQjtBQUNsQmYsVUFBSXlCLElBQUosQ0FBUyxJQUFUO0FBQ0E7O0FBRUQsU0FBSUMsY0FBY2xELE9BQU9tRCxJQUFQLENBQVl0RSxRQUFRMEQsSUFBcEIsRUFBMEJhLEdBQTFCLENBQThCLFVBQVNDLEdBQVQsRUFBYztBQUNuRCxhQUFPQyxtQkFBbUJELEdBQW5CLElBQTBCLEdBQTFCLEdBQ0ZDLG1CQUFtQnpFLFFBQVEwRCxJQUFSLENBQWFjLEdBQWIsQ0FBbkIsQ0FETDtBQUVGLE1BSFMsRUFHUEUsSUFITyxDQUdGLEdBSEUsQ0FBbEI7O0FBS0EvQixTQUFJeUIsSUFBSixDQUFTQyxXQUFUO0FBQ0EsS0EzQ00sQ0FBUDtBQTRDQTs7QUFFRDs7Ozs7OztBQXpvQmlDO0FBQUE7QUFBQSx1QkErb0I3QnJFLE9BL29CNkIsRUFncEJqQztBQUNDLFFBQUkyQyxNQUFNLEtBQUtBLEdBQWY7O0FBRUEsUUFBRzNDLFFBQVFxQixjQUFSLENBQXVCLFFBQXZCLEtBQW9DLE9BQU9yQixRQUFRc0QsTUFBZixJQUF5QixVQUFoRSxFQUE0RTtBQUMzRXRELGFBQVFzRCxNQUFSLENBQWVoQyxJQUFmLENBQW9CLElBQXBCO0FBQ0E7O0FBRUQsV0FBTyxJQUFJaUMsT0FBSixDQUFZLFVBQVNDLE9BQVQsRUFBa0JDLE1BQWxCLEVBQTBCO0FBQzVDLFNBQUcsUUFBT3pELE9BQVAseUNBQU9BLE9BQVAsT0FBbUIsUUFBdEIsRUFBZ0M7QUFDL0IsWUFBTSxJQUFJM0MsS0FBSixDQUFVLDBFQUF3RTJDLE9BQXhFLHlDQUF3RUEsT0FBeEUsS0FBa0YsY0FBNUYsQ0FBTjtBQUNBOztBQUVEQSxhQUFRMEQsSUFBUixHQUFlMUQsUUFBUTBELElBQVIsSUFBZ0IsRUFBL0I7O0FBRUEsU0FBRyxRQUFPMUQsUUFBUTBELElBQWYsTUFBd0IsUUFBM0IsRUFBcUM7QUFDcEMsWUFBTSxJQUFJckcsS0FBSixDQUFVLG9GQUFtRjJDLFFBQVEwRCxJQUEzRixJQUFrRyxjQUE1RyxDQUFOO0FBQ0E7O0FBRURmLFNBQUlNLElBQUosQ0FBUyxLQUFULEVBQWdCakQsUUFBUTJELEdBQXhCLEVBQTZCLElBQTdCOztBQUVBaEIsU0FBSWlCLFlBQUosR0FBbUI1RCxRQUFRNkQsUUFBUixJQUFvQixNQUF2QztBQUNBbEIsU0FBSW1CLE9BQUosR0FBYzlELFFBQVE4RCxPQUFSLElBQW1CLElBQWpDOztBQUVBbkIsU0FBSW9CLGtCQUFKLEdBQXlCLFlBQVc7QUFDaEMsVUFBRyxLQUFLQyxVQUFMLElBQW1CLENBQW5CLElBQXdCLEtBQUtDLE1BQUwsSUFBZSxHQUExQyxFQUErQztBQUM5QztBQUNBOztBQUVFVCxjQUFRLEtBQUtMLFFBQWI7O0FBRUEsVUFBR25ELFFBQVFxQixjQUFSLENBQXVCLE9BQXZCLEtBQW1DLE9BQU9yQixRQUFRa0UsS0FBZixJQUF3QixVQUE5RCxFQUEwRTtBQUMvRWxFLGVBQVFrRSxLQUFSLENBQWM1QyxJQUFkLENBQW1CLElBQW5CO0FBQ0E7QUFDRCxNQVZEOztBQVlBcUIsU0FBSXdCLE9BQUosR0FBYyxVQUFTL0csT0FBVCxFQUFrQjtBQUMvQjRDLGNBQVF2QyxLQUFSLENBQWNMLE9BQWQ7QUFDQXFHLGFBQU9yRyxPQUFQO0FBQ0EsTUFIRDs7QUFLQSxTQUFHLENBQUU0QyxRQUFRMEQsSUFBYixFQUFtQjtBQUNsQmYsVUFBSXlCLElBQUosQ0FBUyxJQUFUO0FBQ0E7O0FBRUQsU0FBSUMsY0FBY2xELE9BQU9tRCxJQUFQLENBQVl0RSxRQUFRMEQsSUFBcEIsRUFBMEJhLEdBQTFCLENBQThCLFVBQVNDLEdBQVQsRUFBYztBQUNuRCxhQUFPQyxtQkFBbUJELEdBQW5CLElBQTBCLEdBQTFCLEdBQ0ZDLG1CQUFtQnpFLFFBQVEwRCxJQUFSLENBQWFjLEdBQWIsQ0FBbkIsQ0FETDtBQUVGLE1BSFMsRUFHUEUsSUFITyxDQUdGLEdBSEUsQ0FBbEI7O0FBS0EvQixTQUFJeUIsSUFBSixDQUFTQyxXQUFUO0FBQ0EsS0EzQ00sQ0FBUDtBQTRDQTtBQW5zQmdDOztBQUFBO0FBQUE7O0FBc3NCbEMsS0FBSU0sbUJBQW1CLDJDQUF2Qjs7QUF0c0JrQyxLQXdzQjVCQyx1QkF4c0I0QjtBQUFBOztBQTBzQmpDLHFDQUNBO0FBQUEsT0FEWXhILE9BQ1osdUVBRHNCLElBQ3RCOztBQUFBOztBQUNDQSxhQUFVQSxXQUFXdUgsZ0JBQXJCOztBQURELGtKQUVPdkgsT0FGUDs7QUFHSSw0SkFBdUJBLE9BQXZCO0FBSEo7QUFJSTs7QUEvc0I2QjtBQUFBLEdBd3NCSUQsZ0JBeHNCSjs7QUFrdEJsQzs7Ozs7OztBQU9BOzs7Ozs7O0FBS0EsS0FBSTBILGFBQVksRUFBaEI7O0FBOXRCa0MsS0FndUI1QkMsU0FodUI0QjtBQUFBO0FBQUE7QUFBQTs7QUFBQTtBQUFBOztBQWt1QmpDOzs7Ozs7O0FBbHVCaUMsd0JBeXVCNUJOLEdBenVCNEIsRUF5dUJ2Qk8sUUF6dUJ1QixFQTB1QmpDO0FBQ0MsUUFBSSxPQUFPUCxHQUFQLElBQWMsUUFBbEIsRUFBNEI7QUFDM0IsV0FBTSxJQUFJckcsMEJBQUosQ0FBK0Isa0VBQWlFcUcsR0FBakUseUNBQWlFQSxHQUFqRSxLQUF1RSxzQkFBdEcsQ0FBTjtBQUNBOztBQUVELFFBQUksT0FBT08sUUFBUCxJQUFtQixVQUF2QixFQUFtQztBQUNsQyxXQUFNLElBQUk1RywwQkFBSixDQUErQix1RUFBc0U0RyxRQUF0RSx5Q0FBc0VBLFFBQXRFLEtBQWlGLHNCQUFoSCxDQUFOO0FBQ0E7O0FBRUQsUUFBSSxPQUFPLEtBQUtQLEdBQUwsQ0FBUCxJQUFvQixXQUF4QixFQUFxQztBQUNwQyxXQUFNLElBQUlJLHVCQUFKLENBQTRCLDJDQUE1QixDQUFOO0FBQ0E7O0FBRUQsU0FBS0osR0FBTCxJQUFZTyxTQUFTQyxJQUFULENBQWNELFFBQWQsRUFBd0IsSUFBeEIsQ0FBWjtBQUNBOztBQUVEOzs7Ozs7Ozs7QUExdkJpQztBQUFBO0FBQUEsK0JBa3dCckJQLEdBbHdCcUIsRUFrd0JoQlMsUUFsd0JnQixFQW13QmpDO0FBQUEsUUFEMkJDLEtBQzNCLHVFQURtQyxJQUNuQzs7QUFDQyxRQUFJLE9BQU9WLEdBQVAsSUFBYyxRQUFsQixFQUE0QjtBQUMzQixXQUFNLElBQUlyRywwQkFBSixDQUErQiwwRUFBeUVxRyxHQUF6RSx5Q0FBeUVBLEdBQXpFLEtBQStFLHNCQUE5RyxDQUFOO0FBQ0E7O0FBRUQsUUFBSSxRQUFPUyxRQUFQLHlDQUFPQSxRQUFQLE1BQW1CLFFBQXZCLEVBQWlDO0FBQ2hDLFdBQU0sSUFBSTlHLDBCQUFKLENBQStCLDZFQUE0RThHLFFBQTVFLHlDQUE0RUEsUUFBNUUsS0FBdUYsc0JBQXRILENBQU47QUFDQTs7QUFFREosZUFBVUwsR0FBVixJQUFpQlMsUUFBakI7QUFDQUosZUFBVUssS0FBVixJQUFtQkQsUUFBbkI7QUFDQSxTQUFLVCxHQUFMLElBQVlTLFFBQVo7QUFDQTs7QUFFRDs7Ozs7Ozs7QUFqeEJpQztBQUFBO0FBQUEsK0JBd3hCckJULEdBeHhCcUIsRUF5eEJqQztBQUNDLFFBQUcsT0FBT0EsR0FBUCxJQUFjLFFBQWpCLEVBQTJCO0FBQzFCLFdBQU0sSUFBSXJHLDBCQUFKLENBQStCLDBFQUF5RXFHLEdBQXpFLHlDQUF5RUEsR0FBekUsS0FBK0Usc0JBQTlHLENBQU47QUFDQTs7QUFFRCxRQUFHLFFBQU9BLEdBQVAseUNBQU9BLEdBQVAsTUFBYyxRQUFqQixFQUEyQjtBQUMxQixZQUFPSyxXQUFVTCxJQUFJakgsV0FBSixDQUFnQkMsSUFBMUIsS0FBbUMsSUFBMUM7QUFDQTs7QUFFRCxXQUFPcUgsV0FBVUwsR0FBVixLQUFrQixJQUF6QjtBQUNBOztBQUVEOzs7Ozs7O0FBcnlCaUM7QUFBQTtBQUFBLGlDQTJ5Qm5CUyxRQTN5Qm1CLEVBNHlCakM7QUFDQyxRQUFJLFFBQU9BLFFBQVAseUNBQU9BLFFBQVAsTUFBbUIsUUFBdkIsRUFBaUM7QUFDaEMsWUFBUSxPQUFPSixXQUFVSSxTQUFTMUgsV0FBVCxDQUFxQkMsSUFBL0IsQ0FBUCxLQUFnRCxXQUF4RDtBQUNBLEtBRkQsTUFFTyxJQUFJLE9BQU95SCxRQUFQLElBQW1CLFFBQXZCLEVBQWlDO0FBQ3ZDLFlBQVEsT0FBT0osV0FBVUksUUFBVixDQUFQLEtBQStCLFdBQXZDO0FBQ0E7O0FBRUQsVUFBTSxJQUFJOUcsMEJBQUosQ0FBK0Isd0ZBQXVGOEcsUUFBdkYseUNBQXVGQSxRQUF2RixLQUFrRyxzQkFBakksQ0FBTjtBQUNBOztBQUVEOzs7Ozs7Ozs7QUF0ekJpQztBQUFBO0FBQUEsd0JBOHpCNUI5QyxNQTl6QjRCLEVBK3pCakM7QUFDQyxRQUFJOEMsV0FBVyxFQUFmO0FBQ0EsUUFBSVQsWUFBSjs7QUFFQSxRQUFJLEtBQUtXLGFBQUwsQ0FBbUJoRCxNQUFuQixDQUFKLEVBQWdDO0FBQy9CLFlBQU8sS0FBS2lELFdBQUwsQ0FBaUJqRCxNQUFqQixDQUFQO0FBQ0E7O0FBRUQsUUFBSSxRQUFPQSxNQUFQLHlDQUFPQSxNQUFQLE1BQWlCLFFBQXJCLEVBQStCO0FBQzlCOEMsZ0JBQVc5QyxNQUFYO0FBQ0FxQyxXQUFNckMsT0FBTzVFLFdBQVAsQ0FBbUJDLElBQXpCO0FBQ0EsVUFBSzZILFdBQUwsQ0FBaUJiLEdBQWpCLEVBQXNCUyxRQUF0QjtBQUNBLEtBSkQsTUFJTyxJQUFHLE9BQU85QyxNQUFQLElBQWlCLFFBQWpCLElBQTZCLEtBQUtkLGNBQUwsQ0FBb0JjLE1BQXBCLENBQWhDLEVBQTZEO0FBQ25FOEMsZ0JBQVcsSUFBSSxLQUFLOUMsTUFBTCxDQUFKLEVBQVg7QUFDQXFDLFdBQU1yQyxNQUFOO0FBQ0EsVUFBS2tELFdBQUwsQ0FBaUJiLEdBQWpCLEVBQXNCUyxRQUF0QjtBQUNBLEtBSk0sTUFJQTtBQUNOLFdBQU0sSUFBSUwsdUJBQUosQ0FBNEIsd0ZBQXVGekMsTUFBdkYseUNBQXVGQSxNQUF2RixFQUE1QixDQUFOO0FBQ0E7O0FBRUQsV0FBTzhDLFFBQVA7QUFDQTtBQXAxQmdDO0FBQUE7QUFBQSwyQkF1MUJqQztBQUNDSixpQkFBWSxFQUFaO0FBQ0E7O0FBRUQ7Ozs7OztBQTMxQmlDO0FBQUE7QUFBQSwrQkFpMkJqQztBQUNDLFdBQU9BLFVBQVA7QUFDQTtBQW4yQmdDOztBQUFBO0FBQUE7O0FBczJCbEMsS0FBSVMsbUJBQW1CLHFFQUF2Qjs7QUF0MkJrQyxLQXcyQjVCQyxxQkF4MkI0QjtBQUFBOztBQTAyQmpDLG1DQUNBO0FBQUEsT0FEWW5JLE9BQ1osdUVBRHNCLElBQ3RCOztBQUFBOztBQUNDQSxhQUFVQSxXQUFXa0ksZ0JBQXJCOztBQURELDhJQUVPbEksT0FGUDs7QUFHSSx3SkFBdUJBLE9BQXZCO0FBSEo7QUFJSTs7QUEvMkI2QjtBQUFBLEdBdzJCRUQsZ0JBeDJCRjs7QUFrM0JsQzs7Ozs7OztBQWwzQmtDLEtBeTNCNUJxSSxZQXozQjRCO0FBMjNCakM7Ozs7O0FBS0EsMEJBQ0E7QUFBQTs7QUFDQyxRQUFLQyxNQUFMLEdBQWMsRUFBZDtBQUNBOztBQUVEOzs7Ozs7Ozs7QUFyNEJpQztBQUFBO0FBQUEsNkJBNDRCdkJqSSxJQTU0QnVCLEVBNDRCakJrSSxRQTU0QmlCLEVBNjRCakM7QUFDQyxRQUFJLE9BQU9BLFFBQVAsS0FBb0IsVUFBeEIsRUFBb0M7QUFDbkMsV0FBTSxJQUFJQyx3QkFBSixFQUFOO0FBQ0E7O0FBRUQsUUFBSSxPQUFPLEtBQUtGLE1BQUwsQ0FBWWpJLElBQVosQ0FBUCxJQUE0QixXQUFoQyxFQUE2QztBQUM1QyxVQUFLaUksTUFBTCxDQUFZakksSUFBWixJQUFvQixFQUFwQjtBQUNBOztBQUVELFNBQUtpSSxNQUFMLENBQVlqSSxJQUFaLEVBQWtCMEUsSUFBbEIsQ0FBdUJ3RCxRQUF2QjtBQUNBOztBQUVEOzs7Ozs7OztBQXo1QmlDO0FBQUE7QUFBQSwyQkFnNkJ6QmxJLElBaDZCeUIsRUFpNkJqQztBQUFBLHNDQURpQmtHLElBQ2pCO0FBRGlCQSxTQUNqQjtBQUFBOztBQUNDQSxXQUFPQSxRQUFRLElBQWY7O0FBRUE7QUFDQSxRQUFJLE9BQU8sS0FBSytCLE1BQUwsQ0FBWWpJLElBQVosQ0FBUCxJQUE0QixXQUFoQyxFQUE2QztBQUM1QztBQUNBOztBQUVELFNBQUtpSSxNQUFMLENBQVlqSSxJQUFaLEVBQWtCcUIsT0FBbEIsQ0FBMEIsVUFBUzZHLFFBQVQsRUFBbUI7QUFDNUMsU0FBRyxPQUFPQSxRQUFQLElBQW1CLFVBQXRCLEVBQWtDO0FBQ2pDLFlBQU0sSUFBSUMsd0JBQUosQ0FBNkIsMEVBQXdFRCxRQUF4RSx5Q0FBd0VBLFFBQXhFLEtBQWtGLGFBQS9HLENBQU47QUFDQTs7QUFFRCxZQUFPQSw2Q0FBWWhDLElBQVosRUFBUDtBQUNBLEtBTkQ7QUFPQTtBQWg3QmdDOztBQUFBO0FBQUE7O0FBbTdCbEM7Ozs7Ozs7O0FBbjdCa0MsS0EyN0I1QmtDLE1BMzdCNEI7QUFBQTtBQUFBO0FBQUE7O0FBQUE7QUFBQTs7QUE2N0JqQzs7Ozs7Ozs7QUE3N0JpQyx1QkFxOEJ0QnBJLElBcjhCc0IsRUFxOEJoQnFJLEtBcjhCZ0IsRUFxOEJUQyxJQXI4QlMsRUFzOEJqQztBQUNDLFFBQUlELE1BQU10SSxXQUFOLENBQWtCQyxJQUFsQixJQUEyQixRQUEzQixJQUF1Q3FJLE1BQU10SSxXQUFOLENBQWtCQyxJQUFsQixJQUEwQixPQUFyRSxFQUE4RTtBQUM3RXFJLGFBQVFFLEtBQUtDLFNBQUwsQ0FBZUgsS0FBZixDQUFSO0FBQ0E7O0FBRURDLFdBQU9BLFFBQVEsRUFBZjs7QUFFRyxRQUFJRyxnQkFBSjs7QUFFQSxRQUFJSCxJQUFKLEVBQVU7QUFDTixTQUFJSSxPQUFPLElBQUlDLElBQUosRUFBWDtBQUNBRCxVQUFLRSxPQUFMLENBQWFGLEtBQUtHLE9BQUwsS0FBa0JQLE9BQU8sRUFBUCxHQUFZLEVBQVosR0FBaUIsRUFBakIsR0FBc0IsSUFBckQ7QUFDQUcsZUFBVSxlQUFlQyxLQUFLSSxXQUFMLEVBQXpCO0FBQ0gsS0FKRCxNQUlPO0FBQ0hMLGVBQVUsRUFBVjtBQUNIOztBQUVEN0csYUFBU21ILE1BQVQsR0FBa0IvSSxPQUFPLEdBQVAsR0FBYXFJLEtBQWIsR0FBcUJJLE9BQXJCLEdBQStCLFVBQWpEO0FBQ0g7O0FBRUQ7Ozs7Ozs7QUExOUJpQztBQUFBO0FBQUEsdUJBZytCdEJ6SSxJQWgrQnNCLEVBaStCakM7QUFDSSxRQUFJNEIsU0FBU21ILE1BQVQsQ0FBZ0I3SixNQUFoQixHQUF5QixDQUE3QixFQUFnQztBQUM1QixTQUFJOEosVUFBVXBILFNBQVNtSCxNQUFULENBQWdCRSxPQUFoQixDQUF3QmpKLE9BQU8sR0FBL0IsQ0FBZDs7QUFFQSxTQUFJZ0osV0FBVyxDQUFDLENBQWhCLEVBQW1CO0FBQ2ZBLGdCQUFVQSxVQUFVaEosS0FBS2QsTUFBZixHQUF3QixDQUFsQztBQUNBLFVBQUlnSyxRQUFRdEgsU0FBU21ILE1BQVQsQ0FBZ0JFLE9BQWhCLENBQXdCLEdBQXhCLEVBQTZCRCxPQUE3QixDQUFaOztBQUVBLFVBQUlFLFNBQVMsQ0FBQyxDQUFkLEVBQWlCO0FBQ2JBLGVBQVF0SCxTQUFTbUgsTUFBVCxDQUFnQjdKLE1BQXhCO0FBQ0g7O0FBRUQsYUFBT3FKLEtBQUtZLEtBQUwsQ0FBV0MsU0FBU3hILFNBQVNtSCxNQUFULENBQWdCTSxTQUFoQixDQUEwQkwsT0FBMUIsRUFBbUNFLEtBQW5DLENBQVQsQ0FBWCxDQUFQO0FBQ0g7QUFDSjs7QUFFRCxXQUFPLEVBQVA7QUFDSDtBQWwvQmdDOztBQUFBO0FBQUE7O0FBcS9CbEM7Ozs7Ozs7QUFPQTs7Ozs7OztBQUtBLEtBQUlJLG9CQUFvQjtBQUN2QnpJLFdBQVMsT0FEYztBQUV2QjBJLGVBQWEsTUFGVTtBQUd2QkMsaUJBQWUsRUFIUTtBQUl2QkMsVUFBUSwyQkFKZTtBQUt2QkMsU0FBTyxFQUxnQjtBQU12QkMsU0FBTyxNQU5nQjtBQU92QkMsVUFBUSxNQVBlO0FBUXZCQyxhQUFXLFdBUlk7QUFTdkJDLFNBQU8sSUFUZ0I7QUFVdkJDLGVBQWE7QUFWVSxFQUF4Qjs7QUFhQTs7Ozs7QUFLQSxLQUFJQyxvQkFBSjs7QUFFQTs7Ozs7QUFLQSxLQUFJQyx1QkFBSjs7QUFFQTs7Ozs7QUFLQSxLQUFJQyxhQUFKOztBQUVBOzs7OztBQUtBLEtBQUlDLHdCQUFKOztBQUVBOzs7OztBQUtBLEtBQUlDLGlCQUFKOztBQS9pQ2tDLEtBaWpDNUJDLElBampDNEI7QUFtakNqQzs7Ozs7Ozs7Ozs7QUFXQSxnQkFBWUMsU0FBWixFQUF1QkMsSUFBdkIsRUFBNkJDLFlBQTdCLEVBQ0E7QUFBQTs7QUFDQ1IsaUJBQWNNLFNBQWQ7QUFDQUosVUFBT0ssSUFBUDtBQUNBTixvQkFBaUJPLFlBQWpCOztBQUVBLFFBQUtDLGNBQUwsR0FBc0IsS0FBS0Msb0JBQUwsRUFBdEI7QUFDQSxRQUFLQyxPQUFMLEdBQWVDLFdBQVc5RyxJQUFYLENBQWdCLElBQWhCLENBQWY7QUFDQTs7QUFFRDs7Ozs7Ozs7QUF4a0NpQztBQUFBO0FBQUEseUJBOGtDM0JvQixRQTlrQzJCLEVBK2tDakM7QUFDQyxRQUFHLFFBQU9BLFFBQVAseUNBQU9BLFFBQVAsTUFBbUIsUUFBdEIsRUFBZ0M7QUFDL0IsV0FBTSxJQUFJdkUsMEJBQUosRUFBTjtBQUNBOztBQUVELFNBQUt1RSxRQUFMLEdBQWdCNUIsT0FBT2dDLE1BQVAsQ0FBY2dFLGlCQUFkLEVBQWlDcEUsUUFBakMsQ0FBaEI7O0FBRUEsU0FBSzJGLFVBQUwsQ0FBZ0IsS0FBSzNGLFFBQUwsQ0FBY3JFLE9BQTlCOztBQUVBRCxRQUFJSyxRQUFKLENBQWEsS0FBS3dKLGNBQWxCLEVBQWtDLFFBQWxDO0FBQ0E3SixRQUFJSyxRQUFKLENBQWEsS0FBS3dKLGNBQWxCLEVBQWtDLEtBQUt2RixRQUFMLENBQWNzRSxhQUFoRDs7QUFFQSxTQUFLc0Isa0JBQUw7QUFDQSxTQUFLQyxXQUFMOztBQUVBLFFBQUcsS0FBS0MsT0FBTCxDQUFhNUMsT0FBTzZDLEdBQVAsQ0FBVyxLQUFLL0YsUUFBTCxDQUFjcUUsV0FBekIsQ0FBYixDQUFILEVBQXdEO0FBQ3ZELFVBQUsyQixJQUFMLEdBQVksRUFBWjtBQUNBLFVBQUtDLE9BQUwsQ0FBYSxLQUFLRCxJQUFsQjtBQUNBO0FBQ0Q7O0FBRUQ7Ozs7Ozs7QUFwbUNpQztBQUFBO0FBQUEsMkJBMG1DekJBLElBMW1DeUIsRUEybUNqQztBQUNDLFdBQU81SCxPQUFPOEgsV0FBUCxDQUFtQkYsSUFBbkIsQ0FBUDtBQUNBOztBQUVEOzs7Ozs7O0FBL21DaUM7QUFBQTtBQUFBLDJCQXFuQ3pCQSxJQXJuQ3lCLEVBc25DakM7QUFDQyxTQUFLQSxJQUFMLENBQVV6SixFQUFWLEdBQWUzQyxJQUFJVSxNQUFKLENBQVcsRUFBWCxDQUFmO0FBQ0EsU0FBSzBMLElBQUwsQ0FBVUcsS0FBVixHQUFrQixFQUFsQjtBQUNBLFNBQUtILElBQUwsQ0FBVUksU0FBVixHQUFzQixFQUF0QjtBQUNBbEQsV0FBT21ELEdBQVAsQ0FBVyxLQUFLckcsUUFBTCxDQUFjcUUsV0FBekIsRUFBc0MyQixJQUF0QyxFQUE0QyxDQUE1QztBQUNBOztBQUVEOzs7Ozs7O0FBN25DaUM7QUFBQTtBQUFBLDJCQW1vQ3pCTSxJQW5vQ3lCLEVBb29DakM7QUFDQyxTQUFLTixJQUFMLEdBQVk5QyxPQUFPNkMsR0FBUCxDQUFXLEtBQUsvRixRQUFMLENBQWNxRSxXQUF6QixDQUFaOztBQUVBLFNBQUsyQixJQUFMLENBQVVHLEtBQVYsQ0FBZ0IzRyxJQUFoQixDQUFxQjhHLElBQXJCOztBQUVBcEQsV0FBT21ELEdBQVAsQ0FBVyxLQUFLckcsUUFBTCxDQUFjcUUsV0FBekIsRUFBc0MsS0FBSzJCLElBQTNDLEVBQWlELENBQWpEO0FBQ0E7O0FBRUQ7Ozs7Ozs7QUE1b0NpQztBQUFBO0FBQUEsOEJBa3BDdEJNLElBbHBDc0IsRUFtcENqQztBQUNFLFNBQUtOLElBQUwsR0FBWTlDLE9BQU82QyxHQUFQLENBQVcsS0FBSy9GLFFBQUwsQ0FBY3FFLFdBQXpCLENBQVo7O0FBRUEsU0FBSzJCLElBQUwsQ0FBVUcsS0FBVixDQUFnQkksTUFBaEIsQ0FBdUIsS0FBS1AsSUFBTCxDQUFVRyxLQUFWLENBQWdCcEMsT0FBaEIsQ0FBd0J1QyxJQUF4QixDQUF2QixFQUFzRCxDQUF0RDs7QUFFQXBELFdBQU9tRCxHQUFQLENBQVcsS0FBS3JHLFFBQUwsQ0FBY3FFLFdBQXpCLEVBQXNDLEtBQUsyQixJQUEzQyxFQUFpRCxDQUFqRDtBQUNEOztBQUVEOzs7Ozs7O0FBM3BDaUM7QUFBQTtBQUFBLGdDQWlxQ3BCRyxLQWpxQ29CLEVBa3FDakM7QUFDQ2pCLGFBQVNsSSxTQUFULEdBQXFCLEVBQXJCOztBQUVBLFNBQUssSUFBSTlDLElBQUksQ0FBYixFQUFnQkEsSUFBSWlNLE1BQU1uTSxNQUExQixFQUFrQ0UsR0FBbEMsRUFBdUM7O0FBRXRDLFNBQUlzTSxLQUFLOUssSUFBSW1CLGFBQUosQ0FBa0IsSUFBbEIsRUFBd0I7QUFDL0IySCxhQUFPO0FBRHdCLE1BQXhCLENBQVQ7O0FBSUEsU0FBSWlDLGFBQWFOLE1BQU1qTSxDQUFOLENBQWpCOztBQUVBLFVBQUksSUFBSXdNLFNBQVIsSUFBcUJELFVBQXJCLEVBQWlDO0FBQ2hDLFVBQUlFLE9BQU9qTCxJQUFJbUIsYUFBSixDQUFrQixNQUFsQixFQUEwQjtBQUNwQytKLGFBQU1ILFdBQVdDLFNBQVg7QUFEOEIsT0FBMUIsQ0FBWDs7QUFJQUYsU0FBR3RKLFdBQUgsQ0FBZXlKLElBQWY7QUFDQTs7QUFFRHpCLGNBQVNoSSxXQUFULENBQXFCc0osRUFBckI7QUFDQTtBQUNEOztBQUVEOzs7Ozs7O0FBenJDaUM7QUFBQTtBQUFBLDhCQStyQ3RCOUksUUEvckNzQixFQWdzQ2pDO0FBQ0MsU0FBS21KLElBQUwsR0FBWW5MLElBQUlvTCxJQUFKLENBQVNwSixRQUFULENBQVo7O0FBRUEsUUFBSSxLQUFLbUosSUFBVCxFQUFlO0FBQ2RuTCxTQUFJSyxRQUFKLENBQWEsS0FBSzhLLElBQWxCLEVBQXdCLEtBQUs3RyxRQUFMLENBQWN3RSxLQUF0QztBQUNBOUksU0FBSUssUUFBSixDQUFhLEtBQUs4SyxJQUFsQixFQUF3QixLQUFLN0csUUFBTCxDQUFjMkUsU0FBdEM7QUFDQSxVQUFLa0MsSUFBTCxDQUFVM0osV0FBVixDQUFzQixLQUFLdUksT0FBM0I7QUFDQSxVQUFLb0IsSUFBTCxDQUFVM0osV0FBVixDQUFzQixLQUFLcUksY0FBM0I7QUFDQTtBQUNEOztBQUVEOzs7Ozs7QUEzc0NpQztBQUFBO0FBQUEsMENBaXRDakM7QUFDQyxRQUFJQSxpQkFBaUI3SixJQUFJbUIsYUFBSixDQUFrQixLQUFsQixFQUF5QjtBQUM3Q04sU0FBSTtBQUR5QyxLQUF6QixDQUFyQjs7QUFJQTJJLGVBQVd4SixJQUFJbUIsYUFBSixDQUFrQixJQUFsQixFQUF3QjtBQUNqQzJILFlBQU87QUFEMEIsS0FBeEIsQ0FBWDs7QUFJQWUsbUJBQWVySSxXQUFmLENBQTJCZ0ksUUFBM0I7O0FBRUEsV0FBT0ssY0FBUDtBQUNBOztBQUVEOzs7Ozs7QUEvdENpQztBQUFBO0FBQUEsaUNBcXVDakM7QUFDQyxRQUFHN0osSUFBSW9MLElBQUosQ0FBUyxpQkFBVCxDQUFILEVBQWdDO0FBQy9CO0FBQ0E7O0FBRUQsUUFBSUMsV0FBWSxLQUFLL0csUUFBTCxDQUFjNEUsS0FBZixHQUF3QixPQUF4QixHQUFrQyxVQUFqRDs7QUFFQSxRQUFJcEksbUJBQ0QsS0FBS3dELFFBQUwsQ0FBY3JFLE9BRGIsOEJBRVVvTCxRQUZWLHNHQVFELEtBQUsvRyxRQUFMLENBQWNyRSxPQVJiLGlDQVNPLEtBQUtxRSxRQUFMLENBQWN5RSxLQVRyQiwyQkFVUSxLQUFLekUsUUFBTCxDQUFjMEUsTUFWdEIsNERBY0QsS0FBSzFFLFFBQUwsQ0FBY3JFLE9BZGIsc0NBZU0sS0FBS3FFLFFBQUwsQ0FBYzZFLFdBZnBCLDREQW1CRCxLQUFLN0UsUUFBTCxDQUFjckUsT0FuQmIsMkJBb0JELEtBQUtxRSxRQUFMLENBQWNyRSxPQXBCYixpRkF5QkQsS0FBS3FFLFFBQUwsQ0FBY3JFLE9BekJiLDBCQTBCRCxLQUFLcUUsUUFBTCxDQUFjckUsT0ExQmIsK0VBK0JELEtBQUtxRSxRQUFMLENBQWNyRSxPQS9CYix5Q0FnQ1VvTCxRQWhDViw0REFrQ2lCLEtBQUsvRyxRQUFMLENBQWMwRSxNQWxDL0IsNlJBNkNELEtBQUsxRSxRQUFMLENBQWNyRSxPQTdDYixxSEFrREQsS0FBS3FFLFFBQUwsQ0FBY3JFLE9BbERiLGtIQXVERCxLQUFLcUUsUUFBTCxDQUFjckUsT0F2RGIsdUNBd0RELEtBQUtxRSxRQUFMLENBQWNyRSxPQXhEYixzSEE2REQsS0FBS3FFLFFBQUwsQ0FBY3JFLE9BN0RiLCtGQWtFRCxLQUFLcUUsUUFBTCxDQUFjckUsT0FsRWIsNFJBK0VELEtBQUtxRSxRQUFMLENBQWNyRSxPQS9FYiw2UUFBSjs7QUE0RkdELFFBQUlzTCxRQUFKLENBQWEsc0JBQWIsRUFBcUN4SyxHQUFyQztBQUNIOztBQUVEOzs7Ozs7QUEzMENpQztBQUFBO0FBQUEsb0NBaTFDakM7QUFDQyxRQUFJeUksZUFBSixFQUFvQjtBQUNuQixZQUFPQSxlQUFQO0FBQ0E7O0FBRUQsUUFBSVYsU0FBUzdJLElBQUltQixhQUFKLENBQWtCLEtBQWxCLEVBQXlCO0FBQ3JDb0ssVUFBSyxLQUFLakgsUUFBTCxDQUFjdUUsTUFEa0I7QUFFckNDLFlBQU87QUFGOEIsS0FBekIsQ0FBYjs7QUFLQVMsc0JBQWlCdkosSUFBSW1CLGFBQUosQ0FBa0IsS0FBbEIsRUFBeUI7QUFDekMySCxZQUFPO0FBRGtDLEtBQXpCLENBQWpCOztBQUlBUyxvQkFBZS9ILFdBQWYsQ0FBMkJxSCxNQUEzQjs7QUFFQSxXQUFPVSxlQUFQO0FBQ0E7O0FBRUQ7Ozs7OztBQXAyQ2lDO0FBQUE7QUFBQSx5Q0EwMkNqQztBQUNDdkosUUFBSUssUUFBSixDQUFhbUosUUFBYixFQUF1QixTQUF2QjtBQUNBLFNBQUtLLGNBQUwsQ0FBb0JySSxXQUFwQixDQUFnQyxLQUFLK0gsY0FBTCxFQUFoQztBQUNBOztBQUVEOzs7Ozs7QUEvMkNpQztBQUFBO0FBQUEsd0NBcTNDakM7QUFDQyxRQUFJdkosSUFBSW9MLElBQUosQ0FBUyxzQkFBVCxFQUFpQyxLQUFLdkIsY0FBdEMsQ0FBSixFQUEyRDtBQUMxRCxVQUFLQSxjQUFMLENBQW9CMkIsV0FBcEIsQ0FBZ0MsS0FBS2pDLGNBQUwsRUFBaEM7QUFDQXZKLFNBQUlJLFdBQUosQ0FBZ0JvSixRQUFoQixFQUEwQixTQUExQjtBQUNBO0FBQ0Q7O0FBRUQ7Ozs7OztBQTUzQ2lDO0FBQUE7QUFBQSx1Q0FrNENqQztBQUNDLFNBQUtpQyxtQkFBTDtBQUNBLFFBQUloQixRQUFRLEtBQUtpQixZQUFMLEVBQVo7QUFDQSxTQUFLQyxZQUFMLENBQWtCbEIsS0FBbEI7O0FBRUEsUUFBSTVELFdBQVcsSUFBZjs7QUFFQStFLGVBQVcsWUFBVztBQUNyQi9FLGNBQVNnRixrQkFBVCxDQUE0QjNJLElBQTVCLENBQWlDMkQsUUFBakM7QUFDQSxLQUZELEVBRUcsSUFGSDtBQUdBOztBQUVEOzs7Ozs7QUE5NENpQztBQUFBO0FBQUEsd0NBbzVDakM7QUFDQyxRQUFHLEtBQUtrRCxPQUFMLElBQWdCLElBQW5CLEVBQXlCO0FBQ3hCO0FBQ0E7O0FBRUQsU0FBS0EsT0FBTCxDQUFhK0IsT0FBYixHQUF1QixVQUFTQyxDQUFULEVBQVk7QUFDbENBLE9BQUVDLGNBQUY7QUFDQSxTQUFJQyxVQUFVak0sSUFBSWtNLFdBQUosQ0FBZ0IsS0FBS3JDLGNBQXJCLEVBQXFDLFFBQXJDLEVBQStDLFFBQS9DLENBQWQ7O0FBRUEsU0FBSW9DLE9BQUosRUFBYTtBQUNaLFdBQUtFLGlCQUFMO0FBQ0E7QUFDRCxLQVBzQixDQU9yQnZGLElBUHFCLENBT2hCLElBUGdCLENBQXZCOztBQVNBeUMsbUJBQWUrQyxTQUFmLENBQXlCLHFCQUF6QixFQUFnRCxVQUFTckIsVUFBVCxFQUFxQjtBQUNwRSxTQUFJVCxPQUFPOUMsT0FBTzZDLEdBQVAsQ0FBVyxLQUFLL0YsUUFBTCxDQUFjcUUsV0FBekIsQ0FBWDtBQUNBMkIsVUFBS0csS0FBTCxDQUFXM0csSUFBWCxDQUFnQmlILFVBQWhCO0FBQ0F2RCxZQUFPbUQsR0FBUCxDQUFXLEtBQUtyRyxRQUFMLENBQWNxRSxXQUF6QixFQUFzQzJCLElBQXRDO0FBQ0EsVUFBSzZCLGlCQUFMO0FBQ0EsS0FMK0MsQ0FLOUN2RixJQUw4QyxDQUt6QyxJQUx5QyxDQUFoRDtBQU1BOztBQUVEOzs7Ozs7QUExNkNpQztBQUFBO0FBQUEsa0NBZzdDakM7QUFDQyxRQUFJMEQsT0FBTzlDLE9BQU82QyxHQUFQLENBQVcsS0FBSy9GLFFBQUwsQ0FBY3FFLFdBQXpCLENBQVg7O0FBRUEsV0FBUTJCLElBQUQsR0FBU0EsS0FBS0csS0FBZCxHQUFzQixFQUE3QjtBQUNBO0FBcDdDZ0M7O0FBQUE7QUFBQTs7QUF1N0NsQzs7Ozs7OztBQUtBLFVBQVM0QixLQUFULENBQWVDLEtBQWYsRUFBc0I7QUFDckJBLFFBQU1OLGNBQU47QUFDQWhNLE1BQUl1TSxhQUFKLENBQWtCLEtBQUsxQyxjQUF2QixFQUF1QyxRQUF2QyxFQUFpRCxRQUFqRDtBQUNBOztBQUVEOzs7OztBQUtBLFVBQVNHLFVBQVQsR0FBc0I7QUFDckIsTUFBSXdDLE1BQU14TCxTQUFTeUwsZUFBVCxDQUF5Qiw0QkFBekIsRUFBdUQsS0FBdkQsQ0FBVjtBQUNBLE1BQUlDLElBQUkxTCxTQUFTeUwsZUFBVCxDQUF5Qiw0QkFBekIsRUFBdUQsR0FBdkQsQ0FBUjtBQUNBLE1BQUlFLE9BQU8zTCxTQUFTeUwsZUFBVCxDQUF5Qiw0QkFBekIsRUFBdUQsTUFBdkQsQ0FBWDs7QUFFQUQsTUFBSWpMLFlBQUosQ0FBaUIsU0FBakIsRUFBNEIsS0FBNUI7QUFDQWlMLE1BQUlqTCxZQUFKLENBQWlCLE9BQWpCLEVBQTBCLDRCQUExQjtBQUNBaUwsTUFBSWpMLFlBQUosQ0FBaUIsYUFBakIsRUFBZ0MsOEJBQWhDO0FBQ0FpTCxNQUFJakwsWUFBSixDQUFpQixHQUFqQixFQUFzQixLQUF0QjtBQUNBaUwsTUFBSWpMLFlBQUosQ0FBaUIsR0FBakIsRUFBc0IsS0FBdEI7QUFDQWlMLE1BQUlqTCxZQUFKLENBQWlCLE9BQWpCLEVBQTBCLFdBQTFCO0FBQ0FpTCxNQUFJakwsWUFBSixDQUFpQixRQUFqQixFQUEyQixXQUEzQjtBQUNBaUwsTUFBSWpMLFlBQUosQ0FBaUIsU0FBakIsRUFBNEIscUJBQTVCO0FBQ0FpTCxNQUFJakwsWUFBSixDQUFpQixPQUFqQixFQUEwQiw0Q0FBMUI7QUFDQWlMLE1BQUlqTCxZQUFKLENBQWlCLFdBQWpCLEVBQThCLFVBQTlCOztBQUVBb0wsT0FBS3BMLFlBQUwsQ0FBa0IsR0FBbEIsRUFBdUIsMHBEQUF2Qjs7QUFFQW1MLElBQUVsTCxXQUFGLENBQWNtTCxJQUFkO0FBQ0FILE1BQUloTCxXQUFKLENBQWdCa0wsQ0FBaEI7O0FBRUEsU0FBT0YsR0FBUDtBQUNBOztBQUVEOzs7Ozs7O0FBT0E7OztBQUdBLEtBQUlJLG9CQUFvQjtBQUN2QjNNLFdBQVMsU0FEYztBQUV2QjZJLFNBQU8sRUFGZ0I7QUFHdkJDLFNBQU8sRUFIZ0I7QUFJdkJDLFVBQVE7QUFKZSxFQUF4Qjs7QUFPQTs7Ozs7QUFLQSxLQUFJNkQsb0JBQUo7O0FBcC9Da0MsS0FzL0M1QkMsTUF0L0M0QjtBQXcvQ2pDOzs7Ozs7QUFNQSxrQkFBWXBELFNBQVosRUFDQTtBQUFBOztBQUNDbUQsaUJBQWNuRCxTQUFkO0FBQ0E7O0FBRUQ7Ozs7Ozs7O0FBbmdEaUM7QUFBQTtBQUFBLHlCQXlnRDNCcEYsUUF6Z0QyQixFQTBnRGpDO0FBQ0MsUUFBRyxRQUFPQSxRQUFQLHlDQUFPQSxRQUFQLE1BQW1CLFFBQXRCLEVBQWdDO0FBQy9CLFdBQU0sSUFBSXZFLDBCQUFKLEVBQU47QUFDQTs7QUFFRCxTQUFLdUUsUUFBTCxHQUFnQjVCLE9BQU9nQyxNQUFQLENBQWNrSSxpQkFBZCxFQUFpQ3RJLFFBQWpDLENBQWhCOztBQUVBdEQsYUFBUytMLGdCQUFULENBQTBCLGtCQUExQixFQUE4QyxZQUFXOztBQUV4RCxVQUFLOUMsVUFBTCxDQUFnQixLQUFLM0YsUUFBTCxDQUFjckUsT0FBOUI7O0FBRUEsVUFBS2tLLFdBQUw7QUFDQSxLQUw2QyxDQUs1Q3ZELElBTDRDLENBS3ZDLElBTHVDLENBQTlDO0FBTUE7O0FBRUQ7Ozs7Ozs7QUF6aERpQztBQUFBO0FBQUEsOEJBK2hEdEI1RSxRQS9oRHNCLEVBZ2lEakM7QUFDQyxTQUFLZ0wsT0FBTCxHQUFlaE4sSUFBSW9MLElBQUosQ0FBU3BKLFFBQVQsQ0FBZjs7QUFFQWhDLFFBQUlLLFFBQUosQ0FBYSxLQUFLMk0sT0FBbEIsRUFBMkIsS0FBSzFJLFFBQUwsQ0FBY3dFLEtBQXpDO0FBQ0E7O0FBRUQ7Ozs7QUF0aURpQztBQUFBO0FBQUEsaUNBMGlEakM7QUFDQyxRQUFJOUksSUFBSW9MLElBQUosQ0FBUyx5QkFBVCxDQUFKLEVBQXlDO0FBQ3hDO0FBQ0E7O0FBRUQsUUFBSXJDLFFBQVMsS0FBS3pFLFFBQUwsQ0FBY3lFLEtBQWYsR0FBd0IsV0FBVyxLQUFLekUsUUFBTCxDQUFjeUUsS0FBekIsR0FBaUMsR0FBekQsR0FBK0QsRUFBM0U7QUFDQSxRQUFJa0UsV0FBVyxLQUFLM0ksUUFBTCxDQUFjNEksU0FBZCxJQUEyQixPQUExQztBQUNBLFFBQUlsRSxTQUFTLEtBQUsxRSxRQUFMLENBQWMwRSxNQUFkLElBQXdCLE1BQXJDOztBQUVBLFFBQUlsSSxtQkFDRCxLQUFLd0QsUUFBTCxDQUFjckUsT0FEYiwrR0FLQThJLEtBTEEsNkJBTVdrRSxRQU5YLDJCQU9RakUsTUFQUix1R0FBSjs7QUFlR2hKLFFBQUlzTCxRQUFKLENBQWEsd0JBQWIsRUFBdUN4SyxHQUF2QztBQUNIO0FBbmtEZ0M7O0FBQUE7QUFBQTs7QUFza0RsQzs7Ozs7OztBQVFBOzs7Ozs7O0FBS0EsS0FBSXFNLG9CQUFvQjtBQUN2QmxOLFdBQVMsV0FEYztBQUV2QjZJLFNBQU8sRUFGZ0I7QUFHdkJzRSxjQUFZLEVBSFc7QUFJdkJDLG9CQUFrQixpQkFKSztBQUt2QkMseUJBQXVCLGdCQUxBO0FBTXZCdkUsU0FBTyxPQU5nQjtBQU92QkMsVUFBUSxPQVBlO0FBUXZCK0IsY0FBWSxDQUFDLE1BQUQsRUFBUyxPQUFULEVBQWtCLGNBQWxCLEVBQWtDLE9BQWxDLENBUlc7QUFTdkJ4RixPQUFLO0FBVGtCLEVBQXhCOztBQVlBOzs7OztBQUtBLEtBQUlnSSxvQkFBSjs7QUFFQTs7Ozs7QUFLQSxLQUFJQyx1QkFBSjs7QUFFQTs7Ozs7QUFLQSxLQUFJQyxlQUFKOztBQUVBOzs7Ozs7QUFNQSxLQUFJQyx3QkFBSjs7QUExbkRrQyxLQTRuRDVCQyxRQTVuRDRCO0FBOG5EakM7Ozs7Ozs7QUFPQSxvQkFBWWpFLFNBQVosRUFBdUJDLElBQXZCLEVBQTZCQyxZQUE3QixFQUNBO0FBQUE7O0FBQ0MyRCxpQkFBYzdELFNBQWQ7QUFDQStELFlBQVM5RCxJQUFUO0FBQ0E2RCxvQkFBaUI1RCxZQUFqQjtBQUNBOEQscUJBQWtCLEVBQWxCO0FBQ0E7O0FBRUQ7Ozs7Ozs7O0FBN29EaUM7QUFBQTtBQUFBLHlCQW1wRDNCcEosUUFucEQyQixFQW9wRGpDO0FBQ0MsUUFBSSxRQUFPQSxRQUFQLHlDQUFPQSxRQUFQLE1BQW1CLFFBQXZCLEVBQWlDO0FBQ2hDLFdBQU0sSUFBSXZFLDBCQUFKLEVBQU47QUFDQTs7QUFFRCxTQUFLdUUsUUFBTCxHQUFnQjVCLE9BQU9nQyxNQUFQLENBQWN5SSxpQkFBZCxFQUFpQzdJLFFBQWpDLENBQWhCO0FBQ0EsU0FBS3NKLFVBQUwsR0FBa0IsSUFBbEI7O0FBRUE1TSxhQUFTK0wsZ0JBQVQsQ0FBMEIsa0JBQTFCLEVBQThDLFlBQVc7O0FBRXhELFVBQUs5QyxVQUFMLENBQWdCLEtBQUszRixRQUFMLENBQWNyRSxPQUE5Qjs7QUFFQSxVQUFLa0ssV0FBTDs7QUFFQSxVQUFLMEQsWUFBTCxDQUFrQixDQUFsQjtBQUNBLEtBUDZDLENBTzVDakgsSUFQNEMsQ0FPdkMsSUFQdUMsQ0FBOUM7QUFRQTs7QUFFRDs7Ozs7OztBQXRxRGlDO0FBQUE7QUFBQSxrQ0E2cURqQztBQUFBLFFBRGFrSCxVQUNiLHVFQUQwQixDQUMxQjtBQUFBLFFBRDZCQyxHQUM3Qjs7QUFDQyxRQUFJUixZQUFZUyxVQUFaLElBQTBCVCxZQUFZUyxVQUFaLENBQXVCQyxNQUFyRCxFQUE2RDs7QUFFNUQsU0FBSVYsWUFBWVMsVUFBWixDQUF1QjFKLFFBQXZCLENBQWdDNEosV0FBaEMsSUFBK0MsYUFBbkQsRUFBa0U7QUFDakUsYUFBTyxLQUFLQyx3QkFBTCxDQUE4QkwsVUFBOUIsQ0FBUDtBQUNBLE1BRkQsTUFFTyxJQUFJUCxZQUFZUyxVQUFaLENBQXVCMUosUUFBdkIsQ0FBZ0M0SixXQUFoQyxJQUErQyxhQUFuRCxFQUFrRTtBQUN4RSxhQUFPLEtBQUtFLHdCQUFMLENBQThCTixVQUE5QixDQUFQO0FBQ0EsTUFGTSxNQUVBO0FBQ04sWUFBTSxJQUFJL04sMEJBQUosQ0FBK0IsNEVBQS9CLENBQU47QUFDQTtBQUNELEtBVEQsTUFTTztBQUNOLFVBQUtxTyx3QkFBTDtBQUNBO0FBQ0Q7O0FBRUQ7Ozs7Ozs7O0FBNXJEaUM7QUFBQTtBQUFBLDhDQW9zRGpDO0FBQUEsUUFEeUJOLFVBQ3pCLHVFQURzQyxJQUN0Qzs7QUFDQyxRQUFJTyxVQUFVLEtBQUtDLFdBQUwsQ0FBaUJSLFVBQWpCLENBQWQ7O0FBRUFPLFlBQVFFLElBQVIsQ0FBYSxVQUFTQyxRQUFULEVBQW1COztBQUUvQixVQUFLQyxZQUFMLEdBQW9CRCxRQUFwQjs7QUFFQSxVQUFLLElBQUloUSxJQUFJLENBQWIsRUFBZ0JBLElBQUksS0FBS2lRLFlBQUwsQ0FBa0JuUSxNQUF0QyxFQUE4Q0UsR0FBOUMsRUFBbUQ7QUFDbEQsVUFBSWtRLFVBQVUsS0FBS0QsWUFBTCxDQUFrQmpRLENBQWxCLENBQWQ7QUFDQWdQLHFCQUFlbUIsT0FBZixDQUF1QixrQkFBdkIsRUFBMkNELE9BQTNDO0FBQ0E7O0FBRURsQixvQkFBZW1CLE9BQWYsQ0FBdUIsaUJBQXZCLEVBQTBDSCxRQUExQztBQUNBLFVBQUtJLFlBQUwsQ0FBa0JKLFFBQWxCO0FBQ0FwSjtBQUNBLEtBWlksQ0FZWHdCLElBWlcsQ0FZTixJQVpNLENBQWIsRUFZY2lJLEtBWmQsQ0FZb0IsVUFBU3hQLEtBQVQsRUFBZ0IsQ0FFbkMsQ0FkRDs7QUFnQkEsV0FBT2dQLE9BQVA7QUFDQTs7QUFFRDs7Ozs7OztBQTF0RGlDO0FBQUE7QUFBQSw0Q0FndURSUCxVQWh1RFEsRUFpdURqQztBQUNDLFFBQUlPLGdCQUFKOztBQUVBLFFBQUksS0FBS1QsVUFBTCxJQUFtQixJQUF2QixFQUE2QjtBQUFFO0FBQzlCUyxlQUFVLEtBQUtDLFdBQUwsRUFBVjtBQUNBLEtBRkQsTUFFTztBQUFFO0FBQ1JELGVBQVVsSixRQUFRQyxPQUFSLENBQWdCLEtBQUt3SSxVQUFyQixDQUFWO0FBQ0E7O0FBRURTLFlBQVFFLElBQVIsQ0FBYSxVQUFTQyxRQUFULEVBQW1CO0FBQy9CLFVBQUtaLFVBQUwsR0FBa0JZLFFBQWxCOztBQUVBLFNBQUlNLFFBQVEsS0FBS0Msb0JBQUwsQ0FBMEJQLFFBQTFCLENBQVo7O0FBRUEsVUFBS0MsWUFBTCxHQUFvQkssTUFBTWhCLGFBQVcsQ0FBakIsQ0FBcEI7O0FBRUEsVUFBSyxJQUFJdFAsSUFBSSxDQUFiLEVBQWdCQSxJQUFJLEtBQUtpUSxZQUFMLENBQWtCblEsTUFBdEMsRUFBOENFLEdBQTlDLEVBQW1EO0FBQ2xELFVBQUlrUSxVQUFVLEtBQUtELFlBQUwsQ0FBa0JqUSxDQUFsQixDQUFkO0FBQ0FnUCxxQkFBZW1CLE9BQWYsQ0FBdUIsa0JBQXZCLEVBQTJDRCxPQUEzQztBQUNBOztBQUVEbEIsb0JBQWVtQixPQUFmLENBQXVCLGlCQUF2QixFQUEwQ0gsUUFBMUM7QUFDQSxVQUFLSSxZQUFMLENBQWtCLEtBQUtILFlBQXZCO0FBQ0F0SixhQUFRQyxPQUFSLENBQWdCLEtBQUtxSixZQUFyQjtBQUVBLEtBaEJZLENBZ0JYN0gsSUFoQlcsQ0FnQk4sSUFoQk0sQ0FBYixFQWdCY2lJLEtBaEJkLENBZ0JvQixVQUFTeFAsS0FBVCxFQUFnQixDQUVuQyxDQWxCRDs7QUFvQkEsV0FBT2dQLE9BQVA7QUFDQTs7QUFFRDs7Ozs7OztBQWp3RGlDO0FBQUE7QUFBQSx3Q0F1d0RaRyxRQXZ3RFksRUF3d0RqQztBQUNDO0FBQ0FqQixnQkFBWVMsVUFBWixDQUF1QjFKLFFBQXZCLENBQWdDMEssV0FBaEMsR0FBOENSLFNBQVNsUSxNQUF2RDs7QUFFQSxRQUFJMlEsVUFBVTFCLFlBQVlTLFVBQVosQ0FBdUIxSixRQUF2QixDQUFnQzRLLFFBQTlDOztBQUVBO0FBQ0E7QUFDQSxRQUFJeEIsZ0JBQWdCcFAsTUFBaEIsSUFBMEIsQ0FBOUIsRUFBaUM7QUFDaEMsWUFBT29QLGVBQVA7QUFDQTs7QUFFREEsc0JBQWtCaEwsT0FBT3lNLFdBQVAsQ0FBbUJYLFFBQW5CLEVBQTZCUyxPQUE3QixDQUFsQjtBQUNBLFdBQU92QixlQUFQO0FBQ0E7O0FBRUQ7Ozs7Ozs7O0FBeHhEaUM7QUFBQTtBQUFBLDhCQSt4RHRCMUwsUUEveERzQixFQWd5RGpDO0FBQ0MsU0FBS2dMLE9BQUwsR0FBZWhOLElBQUlvTCxJQUFKLENBQVNwSixRQUFULENBQWY7O0FBRUEsUUFBSSxLQUFLZ0wsT0FBVCxFQUFrQjtBQUNqQmhOLFNBQUlLLFFBQUosQ0FBYSxLQUFLMk0sT0FBbEIsRUFBMkIsS0FBSzFJLFFBQUwsQ0FBY3dFLEtBQXpDO0FBQ0E7QUFDRDs7QUFFRDs7Ozs7Ozs7QUF4eURpQztBQUFBO0FBQUEsZ0NBK3lEcEIyQixLQS95RG9CLEVBZ3pEakM7QUFDQyxRQUFJLENBQUVwSCxNQUFNK0wsT0FBTixDQUFjM0UsS0FBZCxDQUFGLElBQTJCQSxNQUFNbk0sTUFBTixJQUFnQixDQUFoQixJQUFxQixPQUFPbU0sTUFBTSxDQUFOLENBQVAsSUFBbUIsUUFBdkUsRUFBa0Y7QUFDakYsV0FBTSxJQUFJMUssMEJBQUosRUFBTjtBQUNBOztBQUVELFFBQUl5TyxXQUFXLEtBQUthLGFBQUwsQ0FBbUI1RSxLQUFuQixFQUEwQixLQUFLbkcsUUFBTCxDQUFjOEksVUFBeEMsRUFBb0QsS0FBcEQsQ0FBZjs7QUFFQSxTQUFLSixPQUFMLENBQWExTCxTQUFiLEdBQXlCLEVBQXpCO0FBQ0FrTixhQUFTL04sT0FBVCxDQUFpQixVQUFTaU8sT0FBVCxFQUFrQjtBQUNsQyxVQUFLMUIsT0FBTCxDQUFheEwsV0FBYixDQUF5QmtOLE9BQXpCO0FBQ0EsS0FGZ0IsQ0FFZjlILElBRmUsQ0FFVixJQUZVLENBQWpCOztBQUlBLFdBQU82RCxLQUFQO0FBQ0E7O0FBRUQ7Ozs7Ozs7O0FBL3pEaUM7QUFBQTtBQUFBLGlDQXUwRGpDO0FBQUEsUUFEWXFELFVBQ1osdUVBRHlCLElBQ3pCOztBQUNDLFFBQUl3QixTQUFVeEIsVUFBRCxHQUFlLEtBQUt4SixRQUFMLENBQWNpQixHQUFkLEdBQW9CLFFBQXBCLEdBQStCdUksVUFBOUMsR0FBMkQsS0FBS3hKLFFBQUwsQ0FBY2lCLEdBQXRGOztBQUVBLFdBQU9rSSxPQUFPcEQsR0FBUCxDQUFXO0FBQ2pCOUUsVUFBSytKO0FBRFksS0FBWCxDQUFQO0FBR0E7O0FBRUQ7Ozs7Ozs7OztBQS8wRGlDO0FBQUE7QUFBQSxpQ0F1MURuQkMsb0JBdjFEbUIsRUF1MURHclAsU0F2MURILEVBdTFEY3NQLE9BdjFEZCxFQXcxRGpDO0FBQ0MsUUFBR0QscUJBQXFCcFEsV0FBckIsQ0FBaUNDLElBQWpDLElBQXlDLE9BQTVDLEVBQXNEO0FBQ3JELFdBQU0sSUFBSVcsMEJBQUosRUFBTjtBQUNBOztBQUVELFFBQUkwUCxnQkFBZ0IsRUFBcEI7O0FBRUFGLHlCQUFxQjlPLE9BQXJCLENBQTZCLFVBQVNzSyxVQUFULEVBQXFCO0FBQ2pELFNBQUkyRSxlQUFlLEtBQUtDLFlBQUwsQ0FBa0I1RSxVQUFsQixFQUE4QjdLLFNBQTlCLEVBQXlDc1AsT0FBekMsQ0FBbkI7QUFDQUMsbUJBQWMzTCxJQUFkLENBQW1CNEwsWUFBbkI7QUFDQSxLQUg0QixDQUczQjlJLElBSDJCLENBR3RCLElBSHNCLENBQTdCOztBQUtBLFdBQU82SSxhQUFQO0FBQ0E7O0FBRUQ7Ozs7Ozs7OztBQXYyRGlDO0FBQUE7QUFBQSxnQ0ErMkRwQjFFLFVBLzJEb0IsRUErMkRSN0ssU0EvMkRRLEVBKzJER3NQLE9BLzJESCxFQWczRGpDO0FBQ0MsUUFBSSxRQUFPekUsVUFBUCx5Q0FBT0EsVUFBUCxNQUFxQixRQUFyQixJQUFpQyxPQUFPeUUsT0FBUCxJQUFrQixRQUF2RCxFQUFpRTtBQUNoRSxXQUFNLElBQUl6UCwwQkFBSixFQUFOO0FBQ0E7O0FBRURHLGdCQUFZQSxhQUFhLElBQXpCOztBQUVBLFFBQUl3TyxVQUFVMU8sSUFBSW1CLGFBQUosQ0FBa0IsS0FBbEIsRUFBeUI7QUFDdEMySCxZQUFPO0FBRCtCLEtBQXpCLENBQWQ7O0FBSUE5SSxRQUFJSyxRQUFKLENBQWFxTyxPQUFiLEVBQXNCeE8sU0FBdEI7O0FBRUEsUUFBSTBQLFVBQVU1UCxJQUFJbUIsYUFBSixDQUFrQixLQUFsQixFQUF5QjtBQUN0QzJILFlBQU87QUFEK0IsS0FBekIsQ0FBZDs7QUFJQTRGLFlBQVFsTixXQUFSLENBQW9Cb08sT0FBcEI7O0FBRUEsU0FBSyxJQUFJNUUsU0FBVCxJQUFzQkQsVUFBdEIsRUFBa0M7QUFDakMsU0FBSSxDQUFFckksT0FBT21OLFFBQVAsQ0FBZ0I3RSxTQUFoQixFQUEyQixLQUFLMUcsUUFBTCxDQUFjeUcsVUFBekMsQ0FBTixFQUE0RDtBQUMzRDtBQUNBOztBQUVELFNBQUkrRSxPQUFNOVAsSUFBSW1CLGFBQUosQ0FBa0JxTyxPQUFsQixDQUFWOztBQUVBLFNBQUl4RSxhQUFhLE9BQWpCLEVBQTBCO0FBQ3pCLFVBQUkrRSxRQUFRL1AsSUFBSW1CLGFBQUosQ0FBa0IsS0FBbEIsRUFBeUI7QUFDcENvSyxZQUFLUixXQUFXQyxTQUFYO0FBRCtCLE9BQXpCLENBQVo7QUFHQTBELGNBQVFsTixXQUFSLENBQW9CdU8sS0FBcEI7QUFDQSxNQUxELE1BS087QUFDTkQsV0FBSXhPLFNBQUosR0FBZ0J5SixXQUFXQyxTQUFYLEtBQXlCLEVBQXpDO0FBQ0E7O0FBRURoTCxTQUFJSyxRQUFKLENBQWF5UCxJQUFiLEVBQWtCLGFBQWE1UixJQUFJOFIsU0FBSixDQUFjaEYsU0FBZCxDQUEvQjtBQUNBNEUsYUFBUXBPLFdBQVIsQ0FBb0JzTyxJQUFwQjtBQUNBOztBQUVELFFBQUlBLE1BQU05UCxJQUFJbUIsYUFBSixDQUFrQixLQUFsQixFQUF5QjtBQUNsQ04sU0FBSSxlQUQ4QjtBQUVsQ2lJLFlBQU87QUFGMkIsS0FBekIsQ0FBVjs7QUFLQSxRQUFJbUgsWUFBWWpRLElBQUltQixhQUFKLENBQWtCLFFBQWxCLEVBQTRCO0FBQzNDTixTQUFJLFdBRHVDO0FBRTNDaUksWUFBTyxLQUFLeEUsUUFBTCxDQUFjK0ksZ0JBRnNCO0FBRzNDNkMsV0FBTSxRQUhxQztBQUkzQ2hGLFdBQU07QUFKcUMsS0FBNUIsQ0FBaEI7O0FBT0EsUUFBSWlGLFdBQVduUSxJQUFJbUIsYUFBSixDQUFrQixRQUFsQixFQUE0QjtBQUMxQ04sU0FBSSxVQURzQztBQUUxQ2lJLFlBQU8sS0FBS3hFLFFBQUwsQ0FBY2dKLHFCQUZxQjtBQUcxQzRDLFdBQU0sUUFIb0M7QUFJMUNoRixXQUFNO0FBSm9DLEtBQTVCLENBQWY7O0FBT0E0RSxRQUFJdE8sV0FBSixDQUFnQnlPLFNBQWhCO0FBQ0FILFFBQUl0TyxXQUFKLENBQWdCMk8sUUFBaEI7O0FBRUFGLGNBQVVsRCxnQkFBVixDQUEyQixPQUEzQixFQUFvQyxVQUFTaEIsQ0FBVCxFQUFZO0FBQy9DQSxPQUFFQyxjQUFGO0FBQ0F3QixvQkFBZW1CLE9BQWYsQ0FBdUIscUJBQXZCLEVBQThDNUQsVUFBOUM7QUFDQSxLQUhEOztBQUtBNkUsWUFBUXBPLFdBQVIsQ0FBb0JzTyxHQUFwQjs7QUFFQSxXQUFPcEIsT0FBUDtBQUNBOztBQUVEOzs7O0FBdjdEaUM7QUFBQTtBQUFBLGlDQTI3RGpDO0FBQ0MsUUFBRzFPLElBQUlvTCxJQUFKLENBQVMsMkJBQVQsQ0FBSCxFQUEwQztBQUN6QztBQUNBOztBQUVELFFBQUlyQyxRQUFRLEtBQUt6RSxRQUFMLENBQWN5RSxLQUFkLElBQXVCLE1BQW5DO0FBQ0EsUUFBSUMsU0FBUyxLQUFLMUUsUUFBTCxDQUFjMEUsTUFBZCxJQUF3QixPQUFyQztBQUNBLFFBQUlpRSxXQUFXLEtBQUszSSxRQUFMLENBQWM0SSxTQUFkLElBQTJCLE9BQTFDO0FBQ0EsUUFBSWtELFdBQVcsS0FBSzlMLFFBQUwsQ0FBYytMLFNBQWQsSUFBMkIsT0FBMUM7O0FBR0EsUUFBSXZQLHlJQUtPaUksS0FMUCw4QkFNV2tFLFFBTlgsOEJBT1dtRCxRQVBYLDJCQVFRcEgsTUFSUixvMUNBQUo7O0FBcUVHaEosUUFBSXNMLFFBQUosQ0FBYSwwQkFBYixFQUF5Q3hLLEdBQXpDO0FBQ0g7QUE1Z0VnQzs7QUFBQTtBQUFBOztBQStnRWxDOzs7OztBQS9nRWtDLEtBa2hFNUJ3UCxRQWxoRTRCO0FBQUE7QUFBQTs7QUF1aEVsQyxLQUFJQyxtQkFBbUIsdUJBQXZCOztBQXZoRWtDLEtBeWhFNUJDLHVCQXpoRTRCO0FBQUE7O0FBMmhFakMscUNBQ0E7QUFBQSxPQURZeFIsT0FDWix1RUFEc0IsSUFDdEI7O0FBQUE7O0FBQ0NBLGFBQVVBLFdBQVd1UixnQkFBckI7O0FBREQ7O0FBR0ksNEpBQXVCdlIsT0FBdkI7QUFISjtBQUlJOztBQWhpRTZCO0FBQUEsR0F5aEVJRCxnQkF6aEVKOztBQW1pRWxDOzs7Ozs7O0FBT0E7Ozs7Ozs7QUFLQSxLQUFJMFIsb0JBQW9CO0FBQ3ZCeFEsV0FBUyxtQkFEYztBQUV2QmlPLGVBQWEsYUFGVTtBQUd2QnBGLFNBQU8sRUFIZ0I7QUFJdkJvRyxZQUFVLENBSmE7QUFLdkJGLGVBQWE7QUFMVSxFQUF4Qjs7QUFRQTs7Ozs7QUFLQSxLQUFJMEIsb0JBQUo7O0FBRUE7Ozs7O0FBS0EsS0FBSUMsbUJBQUo7O0FBbmtFa0MsS0Fxa0U1QjNDLFVBcmtFNEI7QUF1a0VqQzs7Ozs7Ozs7QUFRQSxzQkFBWXRFLFNBQVosRUFBdUI4RSxRQUF2QixFQUNBO0FBQUE7O0FBQ0MsUUFBS29DLFVBQUwsQ0FBZ0IsQ0FBaEI7QUFDQUYsaUJBQWNoSCxTQUFkO0FBQ0FpSCxnQkFBYW5DLFFBQWI7QUFDQTs7QUFFRDs7Ozs7Ozs7QUF0bEVpQztBQUFBO0FBQUEseUJBNGxFM0JsSyxRQTVsRTJCLEVBNmxFakM7QUFDQyxRQUFHLFFBQU9BLFFBQVAseUNBQU9BLFFBQVAsTUFBbUIsUUFBdEIsRUFBZ0M7QUFDL0IsV0FBTSxJQUFJdkUsMEJBQUosRUFBTjtBQUNBOztBQUVELFNBQUt1RSxRQUFMLEdBQWdCNUIsT0FBT2dDLE1BQVAsQ0FBYytMLGlCQUFkLEVBQWlDbk0sUUFBakMsQ0FBaEI7O0FBRUEsU0FBS3VNLFVBQUwsR0FBa0IsS0FBS0MsbUJBQUwsQ0FBeUIsS0FBS3hNLFFBQUwsQ0FBYzRLLFFBQXZDLEVBQWlELEtBQUs1SyxRQUFMLENBQWMwSyxXQUEvRCxDQUFsQjs7QUFFQSxTQUFLL0UsVUFBTCxDQUFnQixLQUFLM0YsUUFBTCxDQUFjckUsT0FBOUI7QUFDQSxTQUFLOFEsS0FBTCxHQUFhLEtBQUtDLFdBQUwsRUFBYjtBQUNBLFNBQUs5RyxrQkFBTCxDQUF3QixLQUFLNkcsS0FBN0I7QUFDQSxTQUFLRSxZQUFMLENBQWtCLEtBQUtGLEtBQXZCO0FBQ0E7O0FBRUQ7Ozs7Ozs7QUE1bUVpQztBQUFBO0FBQUEsOEJBa25FdEIvTyxRQWxuRXNCLEVBbW5FakM7QUFDQyxTQUFLZ0wsT0FBTCxHQUFlaE4sSUFBSW9MLElBQUosQ0FBU3BKLFFBQVQsQ0FBZjs7QUFFQWhDLFFBQUlLLFFBQUosQ0FBYSxLQUFLMk0sT0FBbEIsRUFBMkIsS0FBSzFJLFFBQUwsQ0FBY3dFLEtBQXpDO0FBQ0E7O0FBRUQ7Ozs7Ozs7QUF6bkVpQztBQUFBO0FBQUEsZ0NBK25FcEJpSSxLQS9uRW9CLEVBZ29FakM7QUFDQyxTQUFLL0QsT0FBTCxDQUFhMUwsU0FBYixHQUF5QixFQUF6QjtBQUNBLFNBQUswTCxPQUFMLENBQWF4TCxXQUFiLENBQXlCdVAsS0FBekI7QUFDQTs7QUFFRDs7Ozs7Ozs7QUFyb0VpQztBQUFBO0FBQUEsdUNBNG9FYjlCLE9BNW9FYSxFQTRvRUpyQixVQTVvRUksRUE2b0VqQztBQUNDcUIsY0FBVXhMLFNBQVN3TCxPQUFULENBQVY7QUFDQXJCLGlCQUFhbkssU0FBU21LLFVBQVQsQ0FBYjs7QUFFQSxXQUFPbFAsS0FBS2lGLElBQUwsQ0FBVWlLLGFBQWFxQixPQUF2QixDQUFQO0FBQ0E7O0FBRUQ7Ozs7Ozs7QUFwcEVpQztBQUFBO0FBQUEsc0NBMHBFZDhCLEtBMXBFYyxFQTJwRWpDO0FBQ0MsUUFBSWxLLFdBQVcsSUFBZjs7QUFFQSxTQUFLcUssSUFBTCxDQUFVQyxVQUFWLENBQXFCLENBQXJCLEVBQXdCckYsT0FBeEIsR0FBa0MsVUFBU0MsQ0FBVCxFQUFZO0FBQzdDQSxPQUFFQyxjQUFGOztBQUVBLFNBQUlvRixnQkFBZ0J2SyxTQUFTd0ssT0FBVCxHQUFpQixDQUFyQzs7QUFFQSxTQUFJeEssU0FBU3lLLGNBQVQsQ0FBd0JGLGFBQXhCLENBQUosRUFBNEM7QUFDM0MsWUFBTSxJQUFJWix1QkFBSixFQUFOO0FBQ0E7O0FBRURHLGdCQUFXOUMsWUFBWCxDQUF3QnVELGFBQXhCLEVBQXVDN0MsSUFBdkMsQ0FBNEMsVUFBU0MsUUFBVCxFQUFtQjtBQUM5RDNILGVBQVMrSixVQUFULENBQW9CUSxhQUFwQjtBQUNBLE1BRkQ7QUFHQSxLQVpEOztBQWNBLFNBQUtHLFFBQUwsQ0FBY0osVUFBZCxDQUF5QixDQUF6QixFQUE0QnJGLE9BQTVCLEdBQXNDLFVBQVNDLENBQVQsRUFBWTtBQUNqREEsT0FBRUMsY0FBRjs7QUFFQSxTQUFJb0YsZ0JBQWdCdkssU0FBU3dLLE9BQVQsR0FBaUIsQ0FBckM7O0FBRUEsU0FBR3hLLFNBQVN5SyxjQUFULENBQXdCRixhQUF4QixDQUFILEVBQTJDO0FBQzFDLFlBQU0sSUFBSVosdUJBQUosRUFBTjtBQUNBOztBQUVERyxnQkFBVzlDLFlBQVgsQ0FBd0J1RCxhQUF4QixFQUF1QzdDLElBQXZDLENBQTRDLFVBQVNDLFFBQVQsRUFBbUI7QUFDOUQzSCxlQUFTK0osVUFBVCxDQUFvQlEsYUFBcEI7QUFDQSxNQUZEO0FBR0EsS0FaRDs7QUFjQSxTQUFJLElBQUk1UyxJQUFJLENBQVosRUFBZUEsSUFBSSxLQUFLc1EsS0FBTCxDQUFXeFEsTUFBOUIsRUFBc0NFLEdBQXRDLEVBQTJDO0FBQzFDLFVBQUtzUSxLQUFMLENBQVd0USxDQUFYLEVBQWMyUyxVQUFkLENBQXlCLENBQXpCLEVBQTRCckYsT0FBNUIsR0FBc0MsVUFBU0MsQ0FBVCxFQUFZO0FBQ2pEQSxRQUFFQyxjQUFGOztBQUVBLFVBQUlvRixnQkFBZ0IsS0FBS0ksWUFBTCxDQUFrQixjQUFsQixDQUFwQjs7QUFFQWIsaUJBQVc5QyxZQUFYLENBQXdCdUQsYUFBeEIsRUFBdUM3QyxJQUF2QyxDQUE0QyxVQUFTQyxRQUFULEVBQW1CO0FBQzlEM0gsZ0JBQVMrSixVQUFULENBQW9CUSxhQUFwQjtBQUNBLE9BRkQ7QUFHQSxNQVJEO0FBU0E7QUFDRDs7QUFFRDs7Ozs7OztBQXZzRWlDO0FBQUE7QUFBQSw4QkE2c0V0QnRELFVBN3NFc0IsRUE4c0VqQztBQUNDLFNBQUt1RCxPQUFMLEdBQWU1TixTQUFTcUssVUFBVCxDQUFmO0FBQ0EsU0FBSzJELFNBQUwsQ0FBZTNELFVBQWY7QUFDQSxTQUFLNEQsYUFBTCxDQUFtQjVELFVBQW5CO0FBQ0E7O0FBRUQ7Ozs7OztBQXB0RWlDO0FBQUE7QUFBQSxnQ0EwdEVqQztBQUNDLFdBQU8sS0FBS3VELE9BQVo7QUFDQTs7QUFFRDs7Ozs7O0FBOXRFaUM7QUFBQTtBQUFBLGlDQW91RWpDO0FBQ0MsUUFBSU0sS0FBSzNRLFNBQVNHLGFBQVQsQ0FBdUIsSUFBdkIsQ0FBVDs7QUFFQSxTQUFLMk4sS0FBTCxHQUFhLEtBQUs4QyxlQUFMLEVBQWI7QUFDQSxTQUFLTCxRQUFMLEdBQWdCLEtBQUtNLG9CQUFMLEVBQWhCO0FBQ0EsU0FBS1gsSUFBTCxHQUFZLEtBQUtZLGdCQUFMLEVBQVo7O0FBRUFILE9BQUd6UixTQUFILEdBQWUsWUFBZjtBQUNBeVIsT0FBR25RLFdBQUgsQ0FBZSxLQUFLK1AsUUFBcEI7O0FBRUEsU0FBS3pDLEtBQUwsQ0FBV3JPLE9BQVgsQ0FBbUIsVUFBU3NSLElBQVQsRUFBZTtBQUNqQ0osUUFBR25RLFdBQUgsQ0FBZXVRLElBQWY7QUFDQSxLQUZEOztBQUlBSixPQUFHblEsV0FBSCxDQUFlLEtBQUswUCxJQUFwQjs7QUFFQSxXQUFPUyxFQUFQO0FBQ0E7O0FBRUQ7Ozs7OztBQXZ2RWlDO0FBQUE7QUFBQSxxQ0E2dkVqQztBQUNDLFFBQUk3QyxRQUFRLEVBQVo7O0FBRUEsU0FBSSxJQUFJdFEsSUFBSSxDQUFaLEVBQWVBLEtBQUssS0FBS3FTLFVBQXpCLEVBQXFDclMsR0FBckMsRUFBMEM7QUFDekMsU0FBSXdULFdBQVdoUixTQUFTRyxhQUFULENBQXVCLElBQXZCLENBQWY7QUFDQSxTQUFJOFEsT0FBT2pSLFNBQVNHLGFBQVQsQ0FBdUIsR0FBdkIsQ0FBWDtBQUNBNlEsY0FBUzlSLFNBQVQsR0FBc0IsS0FBS21SLE9BQUwsSUFBZ0I3UyxDQUFqQixHQUFzQixrQkFBdEIsR0FBMkMsV0FBaEU7QUFDQXlULFVBQUsvUixTQUFMLEdBQWlCLFdBQWpCO0FBQ0ErUixVQUFLMVEsWUFBTCxDQUFrQixNQUFsQixFQUEwQixXQUFVL0MsQ0FBcEM7QUFDQXlULFVBQUsxUSxZQUFMLENBQWtCLGNBQWxCLEVBQWtDL0MsQ0FBbEM7QUFDQXlULFVBQUszUSxTQUFMLEdBQWlCOUMsQ0FBakI7QUFDQXdULGNBQVN4USxXQUFULENBQXFCeVEsSUFBckI7QUFDQW5ELFdBQU1oTCxJQUFOLENBQVdrTyxRQUFYO0FBQ0E7O0FBRUQsV0FBT2xELEtBQVA7QUFDQTs7QUFFRDs7Ozs7O0FBL3dFaUM7QUFBQTtBQUFBLDBDQXF4RWpDO0FBQ0MsUUFBSWhFLEtBQUs5SixTQUFTRyxhQUFULENBQXVCLElBQXZCLENBQVQ7QUFDQSxRQUFJOFEsT0FBT2pSLFNBQVNHLGFBQVQsQ0FBdUIsR0FBdkIsQ0FBWDtBQUNBLFFBQUkrUSxRQUFRbFIsU0FBU0csYUFBVCxDQUF1QixNQUF2QixDQUFaO0FBQ0EsUUFBSWdSLFFBQVFuUixTQUFTRyxhQUFULENBQXVCLE1BQXZCLENBQVo7O0FBR0EySixPQUFHNUssU0FBSCxHQUFlLFdBQWY7QUFDQStSLFNBQUsvUixTQUFMLEdBQWlCLFdBQWpCO0FBQ0FpUyxVQUFNalMsU0FBTixHQUFrQixTQUFsQjs7QUFFQStSLFNBQUsxUSxZQUFMLENBQWtCLE1BQWxCLEVBQTBCLEVBQTFCO0FBQ0EwUSxTQUFLMVEsWUFBTCxDQUFrQixZQUFsQixFQUFnQyxVQUFoQztBQUNBMlEsVUFBTTNRLFlBQU4sQ0FBbUIsYUFBbkIsRUFBa0MsTUFBbEM7O0FBRUEyUSxVQUFNNVEsU0FBTixHQUFrQixTQUFsQjtBQUNBNlEsVUFBTTdRLFNBQU4sR0FBa0IsVUFBbEI7O0FBRUEyUSxTQUFLelEsV0FBTCxDQUFpQjBRLEtBQWpCO0FBQ0FELFNBQUt6USxXQUFMLENBQWlCMlEsS0FBakI7QUFDQXJILE9BQUd0SixXQUFILENBQWV5USxJQUFmOztBQUVBLFdBQU9uSCxFQUFQO0FBQ0E7O0FBRUQ7Ozs7OztBQTl5RWlDO0FBQUE7QUFBQSxzQ0FvekVqQztBQUNDLFFBQUlBLEtBQUs5SixTQUFTRyxhQUFULENBQXVCLElBQXZCLENBQVQ7QUFDQSxRQUFJOFEsT0FBT2pSLFNBQVNHLGFBQVQsQ0FBdUIsR0FBdkIsQ0FBWDtBQUNBLFFBQUkrUSxRQUFRbFIsU0FBU0csYUFBVCxDQUF1QixNQUF2QixDQUFaO0FBQ0EsUUFBSWdSLFFBQVFuUixTQUFTRyxhQUFULENBQXVCLE1BQXZCLENBQVo7O0FBRUEySixPQUFHNUssU0FBSCxHQUFlLFdBQWY7QUFDQStSLFNBQUsvUixTQUFMLEdBQWlCLFdBQWpCO0FBQ0FpUyxVQUFNalMsU0FBTixHQUFrQixTQUFsQjs7QUFFQStSLFNBQUsxUSxZQUFMLENBQWtCLE1BQWxCLEVBQTBCLEVBQTFCO0FBQ0EwUSxTQUFLMVEsWUFBTCxDQUFrQixZQUFsQixFQUFnQyxNQUFoQztBQUNBMlEsVUFBTTNRLFlBQU4sQ0FBbUIsYUFBbkIsRUFBa0MsTUFBbEM7O0FBRUEyUSxVQUFNNVEsU0FBTixHQUFrQixTQUFsQjtBQUNBNlEsVUFBTTdRLFNBQU4sR0FBa0IsTUFBbEI7O0FBRUEyUSxTQUFLelEsV0FBTCxDQUFpQjBRLEtBQWpCO0FBQ0FELFNBQUt6USxXQUFMLENBQWlCMlEsS0FBakI7QUFDQXJILE9BQUd0SixXQUFILENBQWV5USxJQUFmOztBQUVBLFdBQU9uSCxFQUFQO0FBQ0E7O0FBRUQ7Ozs7Ozs7QUE1MEVpQztBQUFBO0FBQUEsa0NBazFFbEJnRCxVQWwxRWtCLEVBbTFFakM7QUFDQyxXQUFRQSxhQUFhLEtBQUsrQyxVQUFsQixJQUFnQy9DLGNBQWMsQ0FBL0MsSUFBcUR0SyxNQUFNc0ssVUFBTixDQUE1RDtBQUNBOztBQUVEOzs7Ozs7O0FBdjFFaUM7QUFBQTtBQUFBLDZCQTYxRXZCQSxVQTcxRXVCLEVBODFFakM7QUFDQ0EsaUJBQWNBLGNBQWM3SCxjQUFjLE1BQWQsQ0FBNUI7QUFDQS9ELFdBQU9rUSxPQUFQLENBQWVDLFlBQWYsQ0FBNEIsRUFBNUIsRUFBZ0MsRUFBaEMsRUFBb0MsS0FBS0Msa0JBQUwsQ0FBd0JwUSxPQUFPcVEsUUFBUCxDQUFnQkMsSUFBeEMsRUFBOEMsTUFBOUMsRUFBc0QxRSxVQUF0RCxDQUFwQztBQUNBOztBQUVEOzs7Ozs7O0FBbjJFaUM7QUFBQTtBQUFBLGlDQXkyRW5CQSxVQXoyRW1CLEVBMDJFakM7QUFDQyxTQUFJLElBQUlpRSxJQUFSLElBQWdCLEtBQUtqRCxLQUFyQixFQUE0QjtBQUMzQixTQUFJLEtBQUtBLEtBQUwsQ0FBV2lELElBQVgsRUFBaUJaLFVBQWpCLENBQTRCLENBQTVCLEVBQStCSyxZQUEvQixDQUE0QyxjQUE1QyxLQUErRDFELFVBQW5FLEVBQStFO0FBQzlFOU4sVUFBSUssUUFBSixDQUFhLEtBQUt5TyxLQUFMLENBQVdpRCxJQUFYLENBQWIsRUFBK0IsUUFBL0I7QUFDQSxNQUZELE1BRU87QUFDTi9SLFVBQUlJLFdBQUosQ0FBZ0IsS0FBSzBPLEtBQUwsQ0FBV2lELElBQVgsQ0FBaEIsRUFBa0MsUUFBbEM7QUFDQTtBQUNEO0FBQ0Q7O0FBRUQ7Ozs7OztBQXAzRWlDO0FBQUE7QUFBQSxpQ0EwM0VqQztBQUNDLFFBQUlVLE9BQU8sRUFBWDtBQUNBLFFBQUlDLFFBQVF4USxPQUFPcVEsUUFBUCxDQUFnQkMsSUFBaEIsQ0FBcUJwVSxPQUFyQixDQUE2Qix5QkFBN0IsRUFBd0QsVUFBU3VVLENBQVQsRUFBWXZNLEdBQVosRUFBaUJxQixLQUFqQixFQUF3QjtBQUMzRmdMLFVBQUtyTSxHQUFMLElBQVlxQixLQUFaO0FBQ0EsS0FGVyxDQUFaOztBQUlBLFdBQU9nTCxJQUFQO0FBQ0E7O0FBRUQ7Ozs7Ozs7OztBQW40RWlDO0FBQUE7QUFBQSxzQ0EyNEVkbE4sR0EzNEVjLEVBMjRFVHFOLEtBMzRFUyxFQTI0RUZDLFFBMzRFRSxFQTQ0RWpDO0FBQ0ksUUFBSUMsbUJBQW1CLEVBQXZCO0FBQ0EsUUFBSUMsWUFBWXhOLElBQUkvRSxLQUFKLENBQVUsR0FBVixDQUFoQjtBQUNBLFFBQUl3UyxVQUFVRCxVQUFVLENBQVYsQ0FBZDtBQUNBLFFBQUlFLGdCQUFnQkYsVUFBVSxDQUFWLENBQXBCO0FBQ0EsUUFBSUcsT0FBTyxFQUFYOztBQUVBLFFBQUlELGFBQUosRUFBbUI7QUFDZkYsaUJBQVlFLGNBQWN6UyxLQUFkLENBQW9CLEdBQXBCLENBQVo7QUFDQSxVQUFLLElBQUloQyxJQUFJLENBQWIsRUFBZ0JBLElBQUl1VSxVQUFVelUsTUFBOUIsRUFBc0NFLEdBQXRDLEVBQTBDO0FBQ3RDLFVBQUl1VSxVQUFVdlUsQ0FBVixFQUFhZ0MsS0FBYixDQUFtQixHQUFuQixFQUF3QixDQUF4QixLQUE4Qm9TLEtBQWxDLEVBQXdDO0FBQ3BDRSwyQkFBb0JJLE9BQU9ILFVBQVV2VSxDQUFWLENBQTNCO0FBQ0EwVSxjQUFPLEdBQVA7QUFDSDtBQUNKO0FBQ0o7O0FBRUQsUUFBSUMsV0FBV0QsT0FBTyxFQUFQLEdBQVlOLEtBQVosR0FBb0IsR0FBcEIsR0FBMEJDLFFBQXpDO0FBQ0EsV0FBT0csVUFBVSxHQUFWLEdBQWdCRixnQkFBaEIsR0FBbUNLLFFBQTFDO0FBQ0g7O0FBRUQ7Ozs7OztBQWo2RWlDO0FBQUE7QUFBQSwyQkF1NkVqQztBQUNDLFNBQUt2QyxVQUFMLENBQWdCLENBQWhCO0FBQ0EsU0FBS2EsU0FBTCxDQUFlLENBQWY7QUFDQTtBQTE2RWdDOztBQUFBO0FBQUE7O0FBNjZFbEMsS0FBSTJCLG1CQUFtQixrRUFBdkI7O0FBNzZFa0MsS0ErNkU1QkMsK0JBLzZFNEI7QUFBQTs7QUFpN0VqQyw2Q0FDQTtBQUFBLE9BRFlyVSxPQUNaLHVFQURzQixJQUN0Qjs7QUFBQTs7QUFDQ0EsYUFBVUEsV0FBV29VLGdCQUFyQjs7QUFERCxrS0FFT3BVLE9BRlA7O0FBR0ksNEtBQXVCQSxPQUF2QjtBQUhKO0FBSUk7O0FBdDdFNkI7QUFBQSxHQSs2RVlELGdCQS82RVo7O0FBeTdFbEMsS0FBSXVVLGtCQUFrQjtBQUNyQkMsZUFBYSxPQURRO0FBRXJCdFQsV0FBUyxNQUZZO0FBR3JCdVQsb0JBQWtCLEVBSEc7QUFJckJDLGNBQVksQ0FBQyxVQUFELEVBQWEsVUFBYixFQUF5QixRQUF6QixFQUFtQyxZQUFuQyxFQUFpRCxNQUFqRDtBQUpTLEVBQXRCOztBQU9BLEtBQUlDLG9CQUFvQjtBQUN2QkMsYUFBVztBQURZLEVBQXhCOztBQUlBLEtBQUlwVSxvQkFBSjs7QUFwOEVrQyxLQXM4RTVCcVUsZ0JBdDhFNEI7QUF3OEVqQyw0QkFBWXRQLFFBQVosRUFDQTtBQUFBOztBQUNDLE9BQUcsUUFBT0EsUUFBUCx5Q0FBT0EsUUFBUCxNQUFtQixRQUF0QixFQUFnQztBQUMvQixVQUFNLElBQUl2RSwwQkFBSixFQUFOO0FBQ0E7O0FBRUQsUUFBSzJKLFNBQUwsR0FBaUIsSUFBSWhELFNBQUosRUFBakI7QUFDQSxRQUFLcEMsUUFBTCxHQUFnQjVCLE9BQU9nQyxNQUFQLENBQWM0TyxlQUFkLEVBQStCaFAsUUFBL0IsQ0FBaEI7O0FBRUEsUUFBS3VQLHFCQUFMOztBQUVBN1MsWUFBUytMLGdCQUFULENBQTBCLGtCQUExQixFQUE4QyxZQUFXO0FBQ3hELFNBQUs5QyxVQUFMLENBQWdCLEtBQUszRixRQUFMLENBQWNyRSxPQUE5QjtBQUNBLFNBQUtrSyxXQUFMO0FBQ0EsSUFINkMsQ0FHNUN2RCxJQUg0QyxDQUd2QyxJQUh1QyxDQUE5Qzs7QUFLQXJILGlCQUFhLEtBQUsrRSxRQUFMLENBQWNpUCxXQUEzQjs7QUFFQSxPQUFJaFUsZUFBYyxTQUFkLElBQTJCQSxlQUFjLE1BQTdDLEVBQXFEO0FBQ3BEMkMsV0FBTzZELE9BQVAsR0FBaUIsWUFBVztBQUFFLFlBQU8sSUFBUDtBQUFjLEtBQTVDO0FBQ0E7O0FBRUQrTiw4QkFBMkI1USxJQUEzQixDQUFnQyxJQUFoQyxFQUFzQ29CLFNBQVNtUCxVQUEvQzs7QUFFQSxVQUFPLElBQUlNLEtBQUosQ0FBVSxJQUFWLEVBQWdCO0FBQ3RCMUosU0FBSyxhQUFTMkosTUFBVCxFQUFpQnZTLE1BQWpCLEVBQXlCO0FBQzdCLFNBQUlpQixPQUFPbU4sUUFBUCxDQUFnQnBPLE1BQWhCLEVBQXdCNkMsU0FBU21QLFVBQWpDLENBQUosRUFBa0Q7QUFDakQsYUFBT08sT0FBT3RLLFNBQVAsQ0FBaUJ1SyxJQUFqQixDQUFzQnhTLE1BQXRCLENBQVA7QUFDQSxNQUZELE1BRU8sSUFBSXVTLE9BQU90SyxTQUFQLENBQWlCM0MsYUFBakIsQ0FBK0J0RixNQUEvQixDQUFKLEVBQTRDO0FBQ2xELGFBQU91UyxPQUFPdEssU0FBUCxDQUFpQjFDLFdBQWpCLENBQTZCdkYsTUFBN0IsQ0FBUDtBQUNBOztBQUVELFdBQU0sSUFBSTRSLCtCQUFKLENBQW9DLHFEQUFwQyxDQUFOO0FBQ0E7QUFUcUIsSUFBaEIsQ0FBUDtBQVdBOztBQTMrRWdDO0FBQUE7QUFBQSwyQ0E4K0VqQztBQUNDLFFBQUk3VSxVQUFKO0FBQ0EsUUFBSTBWLFlBQVksS0FBSzVQLFFBQUwsQ0FBY2tQLGdCQUE5Qjs7QUFFQSxTQUFLaFYsSUFBSSxDQUFULEVBQVlBLElBQUkwVixVQUFVNVYsTUFBMUIsRUFBa0NFLEdBQWxDLEVBQXVDO0FBQ3RDLFNBQUlrVixrQkFBa0J6USxjQUFsQixDQUFpQ2lSLFVBQVUxVixDQUFWLENBQWpDLENBQUosRUFBb0Q7QUFDbkQsVUFBSXFDLEtBQUsscUJBQXFCM0MsSUFBSWlXLE9BQUosQ0FBWUQsVUFBVTFWLENBQVYsQ0FBWixDQUE5Qjs7QUFFQSxVQUFJLENBQUV3QixJQUFJb0wsSUFBSixDQUFTdkssRUFBVCxDQUFOLEVBQW9CO0FBQ25CYixXQUFJb1UsY0FBSixDQUFtQnZULEVBQW5CLEVBQXVCNlMsa0JBQWtCUSxVQUFVMVYsQ0FBVixDQUFsQixDQUF2QjtBQUNBO0FBQ0Q7QUFDRDtBQUNEOztBQUVEOzs7Ozs7O0FBNy9FaUM7QUFBQTtBQUFBLDhCQW1nRnRCd0QsUUFuZ0ZzQixFQW9nRmpDO0FBQ0MsU0FBS2dMLE9BQUwsR0FBZWhOLElBQUlvTCxJQUFKLENBQVNwSixRQUFULENBQWY7O0FBRUFoQyxRQUFJSyxRQUFKLENBQWEsS0FBSzJNLE9BQWxCLEVBQTJCLEtBQUsxSSxRQUFMLENBQWN3RSxLQUF6QztBQUNBOztBQUVEOzs7O0FBMWdGaUM7QUFBQTtBQUFBLGlDQThnRmpDO0FBQ0MsUUFBRzlJLElBQUlvTCxJQUFKLENBQVMsa0JBQVQsQ0FBSCxFQUFpQztBQUNoQztBQUNBOztBQUVELFFBQUl0SyxtQkFDRCxLQUFLd0QsUUFBTCxDQUFjckUsT0FEYix5RUFBSjs7QUFPR0QsUUFBSXNMLFFBQUosQ0FBYSxpQkFBYixFQUFnQ3hLLEdBQWhDO0FBQ0g7QUEzaEZnQztBQUFBO0FBQUEsZ0NBOGhGakM7QUFDQyxXQUFPdkIsV0FBUDtBQUNBO0FBaGlGZ0M7O0FBQUE7QUFBQTs7QUFtaUZsQzs7Ozs7Ozs7QUFNQSxVQUFTdVUsMEJBQVQsQ0FBb0NMLFVBQXBDLEVBQWdEOztBQUUvQyxPQUFLL0osU0FBTCxDQUFlekMsV0FBZixDQUEyQixRQUEzQixFQUFxQyxJQUFJRyxZQUFKLEVBQXJDOztBQUVBLE1BQUlpSCxVQUFVLEtBQUszRSxTQUFMLENBQWV1SyxJQUFmLENBQW9CLElBQUk1UCxPQUFKLEVBQXBCLENBQWQ7O0FBRUEsT0FBS3FGLFNBQUwsQ0FBZTlDLElBQWYsQ0FBb0IsUUFBcEIsRUFBOEIsVUFBUzhDLFNBQVQsRUFBb0I7QUFDakQsT0FBSTJLLFlBQVksSUFBSXZILE1BQUosQ0FBV3BELFNBQVgsQ0FBaEI7QUFDQTJLLGFBQVVwRyxNQUFWLEdBQW1CLElBQW5CO0FBQ0EsVUFBT29HLFNBQVA7QUFDQSxHQUpEOztBQU1BLE9BQUszSyxTQUFMLENBQWU5QyxJQUFmLENBQW9CLFVBQXBCLEVBQWdDLFVBQVM4QyxTQUFULEVBQW9CO0FBQ25ELE9BQUkySyxZQUFZLElBQUkvRCxRQUFKLENBQWE1RyxTQUFiLENBQWhCO0FBQ0EySyxhQUFVcEcsTUFBVixHQUFtQixJQUFuQjtBQUNBLFVBQU9vRyxTQUFQO0FBQ0EsR0FKRDs7QUFNQSxPQUFLM0ssU0FBTCxDQUFlOUMsSUFBZixDQUFvQixVQUFwQixFQUFnQyxVQUFTOEMsU0FBVCxFQUFvQjtBQUNuRCxPQUFJMkssWUFBWSxJQUFJMUcsUUFBSixDQUFhakUsU0FBYixFQUF3QjJFLE9BQXhCLEVBQWlDM0UsVUFBVTRLLE1BQTNDLENBQWhCO0FBQ0FELGFBQVVwRyxNQUFWLEdBQW1CLElBQW5CO0FBQ0EsVUFBT29HLFNBQVA7QUFDQSxHQUpEOztBQU1BLE9BQUszSyxTQUFMLENBQWU5QyxJQUFmLENBQW9CLFlBQXBCLEVBQWtDLFVBQVM4QyxTQUFULEVBQW9CO0FBQ3JELE9BQUkySyxZQUFZLElBQUlyRyxVQUFKLENBQWV0RSxTQUFmLEVBQTBCQSxVQUFVdUssSUFBVixDQUFlLFVBQWYsQ0FBMUIsRUFBc0R2SyxVQUFVNEssTUFBaEUsQ0FBaEI7QUFDQUQsYUFBVXBHLE1BQVYsR0FBbUIsSUFBbkI7QUFDQSxVQUFPb0csU0FBUDtBQUNBLEdBSkQ7O0FBTUEsT0FBSzNLLFNBQUwsQ0FBZTlDLElBQWYsQ0FBb0IsTUFBcEIsRUFBNEIsVUFBUzhDLFNBQVQsRUFBb0I7QUFDL0MsT0FBSTJLLFlBQVksSUFBSTVLLElBQUosQ0FBU0MsU0FBVCxFQUFvQjJFLE9BQXBCLEVBQTZCM0UsVUFBVTRLLE1BQXZDLENBQWhCO0FBQ0FELGFBQVVwRyxNQUFWLEdBQW1CLElBQW5CO0FBQ0EsVUFBT29HLFNBQVA7QUFDQSxHQUpEOztBQU1BLE9BQUszSyxTQUFMLENBQWVvRCxNQUFmLENBQXNCbUIsTUFBdEIsR0FBK0IsS0FBL0I7QUFDQSxPQUFLdkUsU0FBTCxDQUFlNEcsUUFBZixDQUF3QnJDLE1BQXhCLEdBQWlDLEtBQWpDO0FBQ0EsT0FBS3ZFLFNBQUwsQ0FBZWlFLFFBQWYsQ0FBd0JNLE1BQXhCLEdBQWlDLEtBQWpDO0FBQ0EsT0FBS3ZFLFNBQUwsQ0FBZXNFLFVBQWYsQ0FBMEJDLE1BQTFCLEdBQW1DLEtBQW5DO0FBQ0EsT0FBS3ZFLFNBQUwsQ0FBZUQsSUFBZixDQUFvQndFLE1BQXBCLEdBQTZCLEtBQTdCO0FBQ0E7O0FBRUQsUUFBTzJGLGdCQUFQO0FBRUMsQ0F0bEZxQixFQUF0QiIsImZpbGUiOiJUdXJib2VDb21tZXJjZS5qcyIsInNvdXJjZXNDb250ZW50IjpbInZhciBUdXJib2VDb21tZXJjZSA9IChmdW5jdGlvbiAoKSB7XG4ndXNlIHN0cmljdCc7XG5cbi8qKlxyXG4gKiBAZmlsZSBcclxuICogU3RyIGNsYXNzLlxyXG4gKlxyXG4gKiBBZGRzIHNvbWUgdXNlZnVsIGZ1bmN0aW9uYWxpdHkgZm9yXHJcbiAqIG1hbmlwdWxhdGluZyBzdHJpbmdzIG9yIGNyZWF0aW5nIHN0cmluZy5cclxuICovXHJcblxyXG5jbGFzcyBTdHJcclxue1xyXG5cdC8qKlxyXG5cdCAqIENvbnZlcnQgY2FtZWxDYXNlIHRvIGtlYmFiLWNhc2UuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gc3RyaW5nIHwgc3RyaW5nXHJcblx0ICogQHJldHVybiBzdHJpbmdcclxuXHQgKi9cclxuXHRzdGF0aWMga2ViYWJDYXNlKHN0cmluZykgXHJcblx0e1xyXG5cdFx0cmV0dXJuIHN0cmluZy5yZXBsYWNlKC8oW2Etel0pKFtBLVpdKS9nLCAnJDEtJDInKS50b0xvd2VyQ2FzZSgpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogR2VuZXJhdGVzIGEgcmFuZG9tIHN0cmluZy5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSBpbnRlZ2VyIHwgbGVuZ3RoXHJcblx0ICogQHJldHVybiBzdHJpbmdcclxuXHQgKi9cclxuXHRzdGF0aWMgcmFuZG9tKGxlbmd0aCkgXHJcblx0e1xyXG5cdFx0bGV0IHN0cmluZyA9ICcnO1xyXG5cdFx0bGV0IHBvc3NpYmxlID0gXCJBQkNERUZHSElKS0xNTk9QUVJTVFVWV1hZWmFiY2RlZmdoaWprbG1ub3BxcnN0dXZ3eHl6MDEyMzQ1Njc4OVwiO1xyXG5cclxuXHRcdGZvciAobGV0IGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcclxuXHQgICAgXHRzdHJpbmcgKz0gcG9zc2libGUuY2hhckF0KE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIHBvc3NpYmxlLmxlbmd0aCkpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiBzdHJpbmc7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBDaGFuZ2VzIHRoZSBmaXJzdCBsZXR0ZXIgXHJcblx0ICogb2YgdGhlIHN0cmluZyB0byB1cHBlcmNhc2UuXHJcblx0ICogXHJcblx0ICogQHBhcmFtIHN0cmluZyB8IHN0cmluZ1xyXG5cdCAqIEByZXR1cm4gc3RyaW5nXHJcblx0ICovXHJcblx0c3RhdGljIHVjZmlyc3Qoc3RyaW5nKSBcclxuXHR7XHJcblx0ICAgIHJldHVybiBzdHJpbmcuY2hhckF0KDApLnRvVXBwZXJDYXNlKCkgKyBzdHJpbmcuc2xpY2UoMSk7XHJcblx0fVxyXG59XG5cbmNsYXNzIEV4Y2VwdGlvbkhhbmRsZXJcclxue1xyXG5cdGNvbnN0cnVjdG9yKG1lc3NhZ2UgPSBudWxsKVxyXG5cdHtcclxuXHRcdGlmIChFcnJvci5jYXB0dXJlU3RhY2tUcmFjZSkge1xyXG5cdFx0XHRFcnJvci5jYXB0dXJlU3RhY2tUcmFjZSh0aGlzLCB0aGlzLmNvbnN0cnVjdG9yLm5hbWUpO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogSGFuZGxlIGFsbCB0aGUgZXJyb3JzXHJcblx0ICovXHJcblx0c3RhY2tUcmFjZShlcnJvciwgbWVzc2FnZSkgXHJcblx0e1xyXG5cdFx0dGhpcy5jdXN0b21BY3Rpb25zKGVycm9yLCBtZXNzYWdlKTtcclxuXHJcblx0XHRsZXQgZGVidWdMZXZlbCA9IFR1cmJvZUNvbW1lcmNlLmRlYnVnTGV2ZWwoKTtcclxuXHJcblx0XHRpZiAoZGVidWdMZXZlbCA9PSAnZXJyb3InKSB7XHJcbiAgICBcdFx0dGhpcy5oYW5kbGVFcnJvcnMoZXJyb3IsIG1lc3NhZ2UpO1xyXG4gICAgXHR9IGVsc2UgaWYgKGRlYnVnTGV2ZWwgPT0gJ3dhcm5pbmcnKSB7XHJcbiAgICBcdFx0dGhpcy5oYW5kbGVXYXJuaW5ncyhlcnJvciwgbWVzc2FnZSk7XHRcclxuICAgIFx0fSBlbHNlIGlmIChkZWJ1Z0xldmVsID09ICdpbmZvJykge1xyXG4gICAgXHRcdHRoaXMuaGFuZGxlSW5mb3MoZXJyb3IsIG1lc3NhZ2UpO1xyXG4gICAgXHR9XHJcblx0fVxyXG5cclxuXHRoYW5kbGVFcnJvcnMoZXJyb3IsIG1lc3NhZ2UpXHJcblx0e1xyXG5cdFx0Y29uc29sZS5lcnJvcihlcnJvci5jb25zdHJ1Y3Rvci5uYW1lICsgJzogJyArIG1lc3NhZ2UpO1xyXG5cdH1cclxuXHJcblx0aGFuZGxlV2FybmluZ3MoZXJyb3IsIG1lc3NhZ2UpXHJcblx0e1xyXG5cdFx0Y29uc29sZS53YXJuKGVycm9yLmNvbnN0cnVjdG9yLm5hbWUgKyAnOiAnICsgbWVzc2FnZSk7XHJcblx0fVxyXG5cclxuXHRoYW5kbGVJbmZvcyhlcnJvciwgbWVzc2FnZSlcclxuXHR7XHJcblx0XHRjb25zb2xlLmluZm8oZXJyb3IuY29uc3RydWN0b3IubmFtZSArICc6ICcgKyBtZXNzYWdlKTtcclxuXHR9XHJcblxyXG5cdGN1c3RvbUFjdGlvbnMoZXJyb3IsIG1lc3NhZ2UpXHJcblx0e1xyXG5cdFx0aWYgKGVycm9yLmNvbnN0cnVjdG9yLm5hbWUgPT0gJ0ludmFsaWRBcmd1bWVudEV4Y2VwdGlvbicpIHtcclxuXHRcdFx0Ly8gaGFuZGxlXHJcblx0XHR9IGVsc2UgaWYgKGVycm9yLmNvbnN0cnVjdG9yLm5hbWUgPT0gJ0ludmFsaWRCaW5kaW5nRXhjZXB0aW9uJykge1xyXG5cdFx0XHQvLyBoYW5kbGVcclxuXHRcdH0gZWxzZSBpZiAoZXJyb3IuY29uc3RydWN0b3IubmFtZSA9PSAnQmFkRXZlbnRDYWxsRXhjZXB0aW9uJykge1xyXG5cdFx0XHQvLyBoYW5kbGVcclxuXHRcdH0gZWxzZSBpZiAoZXJyb3IuY29uc3RydWN0b3IubmFtZSA9PSAnQ29tcG9uZW50c0V4Y2VwdGlvbicpIHtcclxuXHRcdFx0Ly8gaGFuZGxlXHJcblx0XHR9IGVsc2UgaWYgKGVycm9yLmNvbnN0cnVjdG9yLm5hbWUgPT0gJ0NvbXBvbmVudE5vdFJlZ2lzdGVyZWRFeGNlcHRpb24nKSB7XHJcblx0XHRcdC8vIGhhbmRsZVxyXG5cdFx0fSBlbHNlIGlmIChlcnJvci5jb25zdHJ1Y3Rvci5uYW1lID09ICdOb3RJblBhZ2VSYW5nZUV4Y2VwdGlvbicpIHtcclxuXHRcdFx0Ly8gaGFuZGxlXHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIGZhbHNlO1xyXG5cdH1cclxufVxuXG5sZXQgZGVmYXVsdE1lc3NhZ2UgPSAnYW4gaW52YWxpZCBhcmd1bWVudCB3YXMgcGFzc2VkLic7XHJcblxyXG5jbGFzcyBJbnZhbGlkQXJndW1lbnRFeGNlcHRpb24kMSBleHRlbmRzIEV4Y2VwdGlvbkhhbmRsZXJcclxue1xyXG5cdGNvbnN0cnVjdG9yKG1lc3NhZ2UgPSBudWxsKSBcclxuXHR7XHJcblx0XHRtZXNzYWdlID0gbWVzc2FnZSB8fCBkZWZhdWx0TWVzc2FnZTtcclxuXHRcdHN1cGVyKG1lc3NhZ2UpO1xyXG4gICAgXHRzdXBlci5zdGFja1RyYWNlKHRoaXMsIG1lc3NhZ2UpO1xyXG4gICAgfVxyXG59XG5cbi8qKlxyXG4gKiBAZmlsZSBcclxuICogRE9NIGNsYXNzLlxyXG4gKlxyXG4gKiBBZGRzIHNvbWUgdXNlZnVsIGZ1bmN0aW9uYWxpdHkgZm9yXHJcbiAqIGZldGNoaW5nIG9yIG1hbmlwdWxhdGluZyBET00gZWxlbWVudHMuXHJcbiAqL1xyXG5cclxuY2xhc3MgRE9NXHJcbntcclxuXHQvKipcclxuXHQgKiBNaW5pZmllcyB0aGUgY3NzIHRleHQuXHJcblx0ICogXHJcblx0ICogQHBhcmFtIHN0cmluZyB8IHN0cmluZ1xyXG5cdCAqIEByZXR1cm4gc3RyaW5nXHJcblx0ICovXHJcblx0c3RhdGljIG1pbmlmeUNzcyhzdHJpbmcpIFxyXG5cdHtcclxuXHQgICAgc3RyaW5nID0gc3RyaW5nLnJlcGxhY2UoL1xcL1xcKig/Oig/IVxcKlxcLylbXFxzXFxTXSkqXFwqXFwvfFtcXHJcXG5cXHRdKy9nLCAnJyk7XHJcblx0ICAgIHN0cmluZyA9IHN0cmluZy5yZXBsYWNlKC8gezIsfS9nLCAnICcpO1xyXG5cdCAgICBzdHJpbmcgPSBzdHJpbmcucmVwbGFjZSgvKFt7On1dKS9nLCAnJDEnKTtcclxuXHQgICAgc3RyaW5nID0gc3RyaW5nLnJlcGxhY2UoLyhbOyxdKSAvZywgJyQxJyk7XHJcblx0ICAgIHN0cmluZyA9IHN0cmluZy5yZXBsYWNlKC8gIS9nLCAnIScpO1xyXG5cdCAgICBcclxuXHQgICAgcmV0dXJuIHN0cmluZztcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFN3aXRjaGVzIGJldHdlZW4gdHdvIGdpdmVuIGNsYXNzZXMuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gb2JqZWN0IHwgZWxlbWVudFxyXG5cdCAqIEBwYXJhbSBzdHJpbmcgfCBjbGFzc05hbWVcclxuXHQgKiBAcGFyYW0gc3RyaW5nIHwgbmV3Q2xhc3NOYW1lXHJcblx0ICogQHJldHVybiBvYmplY3RcclxuXHQgKi9cclxuXHRzdGF0aWMgc3dpdGNoQ2xhc3NlcyhlbGVtZW50LCBjbGFzc05hbWUsIG5ld0NsYXNzTmFtZSkgXHJcblx0e1xyXG5cdFx0dGhpcy5yZW1vdmVDbGFzcyhlbGVtZW50LCBjbGFzc05hbWUpO1xyXG5cdFx0dGhpcy5hZGRDbGFzcyhlbGVtZW50LCBuZXdDbGFzc05hbWUpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQWRkcyBjbGFzcyB0byBhIGdpdmVuIGVsZW1lbnQuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gb2JqZWN0IHwgZWxlbWVudFxyXG5cdCAqIEBwYXJhbSBzdHJpbmcgfCBjbGFzc05hbWVcclxuXHQgKiBAcmV0dXJuIG9iamVjdFxyXG5cdCAqL1xyXG5cdHN0YXRpYyBhZGRDbGFzcyhlbGVtZW50LCBjbGFzc05hbWUpIFxyXG5cdHtcclxuXHRcdGlmKGVsZW1lbnQgPT09IG51bGwpIHtcclxuXHRcdFx0dGhyb3cgbmV3IEludmFsaWRBcmd1bWVudEV4Y2VwdGlvbiQxO1xyXG5cdFx0fVxyXG5cclxuXHRcdGlmKCEgY2xhc3NOYW1lIHx8IGNsYXNzTmFtZSA9PSAnJyB8fCB0eXBlb2YgY2xhc3NOYW1lID09PSB1bmRlZmluZWQpIHtcclxuXHRcdFx0cmV0dXJuIGVsZW1lbnQ7XHJcblx0XHR9XHJcblxyXG5cdFx0bGV0IGNsYXNzTmFtZXMgPSBjbGFzc05hbWUuc3BsaXQoJyAnKTtcclxuXHJcblx0XHRjbGFzc05hbWVzLmZvckVhY2goZnVuY3Rpb24obmFtZSkge1xyXG5cdFx0XHRlbGVtZW50LmNsYXNzTGlzdC5hZGQobmFtZSk7XHJcblx0XHR9KTtcclxuXHRcdFxyXG5cdFx0cmV0dXJuIGVsZW1lbnQ7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBSZW1vdmVzIGNsYXNzIGZyb20gYSBnaXZlbiBlbGVtZW50LlxyXG5cdCAqIFxyXG5cdCAqIEBwYXJhbSBvYmplY3QgfCBlbGVtZW50XHJcblx0ICogQHBhcmFtIHN0cmluZyB8IGNsYXNzTmFtZVxyXG5cdCAqIEByZXR1cm4gb2JqZWN0XHJcblx0ICovXHJcblx0c3RhdGljIHJlbW92ZUNsYXNzKGVsZW1lbnQsIGNsYXNzTmFtZSkgXHJcblx0e1xyXG5cdFx0aWYoZWxlbWVudCA9PSBudWxsKSB7XHJcblx0XHRcdHRocm93IG5ldyBJbnZhbGlkQXJndW1lbnRFeGNlcHRpb24kMTtcclxuXHRcdH1cclxuXHJcblx0XHRpZihjbGFzc05hbWUgPT0gJycpIHtcclxuXHRcdFx0ZWxlbWVudC5jbGFzc05hbWUgPSAnJztcclxuXHRcdH0gZWxzZSB7XHJcblxyXG5cdFx0XHRsZXQgY2xhc3NOYW1lcyA9IGNsYXNzTmFtZS5zcGxpdCgnICcpO1xyXG5cclxuXHRcdFx0Y2xhc3NOYW1lcy5mb3JFYWNoKGZ1bmN0aW9uKG5hbWUpIHtcclxuXHRcdFx0XHRlbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUobmFtZSk7XHJcblx0XHRcdH0pO1xyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiBlbGVtZW50O1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQWRkcyBzdHlsZSB0YWcgd2l0aCBnaXZlbiBpZCBhbmQgY3NzIHRvIHRoZSBET00uXHJcblx0ICogXHJcblx0ICogQHBhcmFtIHN0cmluZyB8IGlkXHJcblx0ICogQHBhcmFtIHN0cmluZyB8IGNzc1xyXG5cdCAqIEByZXR1cm4gdm9pZFxyXG5cdCAqL1xyXG5cdHN0YXRpYyBhZGRTdHlsZShpZCwgY3NzKVxyXG5cdHtcclxuXHRcdGlmICh0eXBlb2YgY3NzICE9ICdzdHJpbmcnKSB7XHJcblx0XHRcdHRocm93IG5ldyBJbnZhbGlkQXJndW1lbnRFeGNlcHRpb24kMTtcclxuXHRcdH1cclxuXHJcblx0XHRsZXQgaGVhZCA9IGRvY3VtZW50LmhlYWQgfHwgZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2hlYWQnKVswXTtcclxuXHRcdGxldCBzdHlsZVRhZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3N0eWxlJyk7XHJcblxyXG5cdFx0Ly8gcGlwZSBpdCB0aHJvdWdoIHRoZSBtaW5maWVyXHJcblx0ICAgIGxldCBDU1MgPSB0aGlzLm1pbmlmeUNzcyhjc3MpO1xyXG5cdCAgICAvLyBhZGRpbmcgaXQgdG8gdGhlIHN0eWxldGFnXHJcblx0ICAgIHN0eWxlVGFnLmlubmVySFRNTCA9IENTUztcclxuXHQgICAgLy8gZ2l2ZSBhbiBpZCB0byByZWNvZ25pemUgdGhlIHN0eWxlIHRhZ1xyXG5cdFx0c3R5bGVUYWcuc2V0QXR0cmlidXRlKCdpZCcsIGlkKTtcclxuXHRcdC8vIGFwcGVuZGluZyB0aGF0IHN0eWxlIHRhZyB0byB0aGUgRE9NIGhlYWQgdGFnXHJcblx0XHRoZWFkLmFwcGVuZENoaWxkKHN0eWxlVGFnKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEFkZHMgbGlua2VkIHN0eWxlIHRhZyB3aXRoIGdpdmVuIGlkIGFuZCBzcmMgdG8gdGhlIERPTS5cclxuXHQgKiBcclxuXHQgKiBAcGFyYW0gc3RyaW5nIHwgaWRcclxuXHQgKiBAcGFyYW0gc3RyaW5nIHwgc291cmNlXHJcblx0ICogQHJldHVybiB2b2lkXHJcblx0ICovXHJcblx0c3RhdGljIGFkZExpbmtlZFN0eWxlKGlkLCBzb3VyY2UpIFxyXG5cdHtcclxuXHRcdGlmICh0eXBlb2Ygc291cmNlICE9ICdzdHJpbmcnKSB7XHJcblx0XHRcdHRocm93IG5ldyBJbnZhbGlkQXJndW1lbnRFeGNlcHRpb24kMSgnRE9NLmFkZExpbmtlZFN0eWxlKCkgZXhjcGVjdHMgdGhlIHNlY29uZCBwYXJhbWV0ZXIgdG8gYmUgc3RyaW5nLCBidXQgJyArIHR5cGVvZiBzb3VyY2UgKyAnIHdhcyBwYXNzZWQgaW5zdGVhZC4nKTtcclxuXHRcdH1cclxuXHJcblx0XHRsZXQgaGVhZCA9IGRvY3VtZW50LmhlYWQgfHwgZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2hlYWQnKVswXTtcclxuXHRcdGxldCBsaW5rZWRTdHlsZVRhZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpbmsnKTtcclxuXHJcblx0ICAgIC8vIGdpdmUgYW4gaWQgdG8gcmVjb2duaXplIHRoZSBzdHlsZSB0YWdcclxuXHRcdGxpbmtlZFN0eWxlVGFnLnNldEF0dHJpYnV0ZSgnaWQnLCBpZCk7XHJcblx0XHRsaW5rZWRTdHlsZVRhZy5zZXRBdHRyaWJ1dGUoJ2hyZWYnLCBzb3VyY2UpO1xyXG5cdFx0bGlua2VkU3R5bGVUYWcuc2V0QXR0cmlidXRlKCdyZWwnLCAnc3R5bGVzaGVldCcpO1xyXG5cdFx0bGlua2VkU3R5bGVUYWcuc2V0QXR0cmlidXRlKCd0eXBlJywgJ3RleHQvY3NzJyk7XHJcblx0XHQvLyBhcHBlbmRpbmcgdGhhdCBzdHlsZSB0YWcgdG8gdGhlIERPTSBoZWFkIHRhZ1xyXG5cdFx0aGVhZC5hcHBlbmRDaGlsZChsaW5rZWRTdHlsZVRhZyk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBDcmVhdGVzIGFuIGVsZW1lbnQgd2l0aCB0aGUgZ2l2ZW4gb3B0aW9ucy5cclxuXHQgKiBcclxuXHQgKiBAcGFyYW0gc3RyaW5nIHwgZWxlbWVudFR5cGVcclxuXHQgKiBAcGFyYW0gb2JqZWN0IHwgb3B0aW9uc1xyXG5cdCAqIEByZXR1cm4gSFRNTEVsZW1lbnRcclxuXHQgKi9cclxuXHRzdGF0aWMgY3JlYXRlRWxlbWVudChlbGVtZW50VHlwZSwgb3B0aW9ucylcclxuXHR7XHJcblx0XHRsZXQgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoZWxlbWVudFR5cGUpO1xyXG5cdFxyXG5cdFx0aWYgKG9wdGlvbnMgPT09IHVuZGVmaW5lZCkge1xyXG5cdFx0XHRyZXR1cm4gZWxlbWVudDtcclxuXHRcdH1cclxuXHJcblx0XHRmb3IgKGxldCBvcHRpb24gaW4gb3B0aW9ucykge1xyXG5cdFx0XHRpZihvcHRpb24gPT0gJ3RleHQnKSB7XHJcblx0XHRcdFx0ZWxlbWVudC5pbm5lckhUTUwgPSBvcHRpb25zW29wdGlvbl07XHJcblx0XHRcdFx0Y29udGludWU7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGVsZW1lbnQuc2V0QXR0cmlidXRlKG9wdGlvbiwgb3B0aW9uc1tvcHRpb25dKTtcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gZWxlbWVudDtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFRvZ2dsZXMgdGhlIGdpdmVuIGNsYXNzZXMuXHJcblx0ICogXHJcblx0ICogQHBhcmFtIG9iamVjdCB8IGVsZW1lbnRcclxuXHQgKiBAcGFyYW0gc3RyaW5nIHwgY2xhc3NOYW1lXHJcblx0ICogQHJldHVybiBib29sXHJcblx0ICovXHJcblx0c3RhdGljIHRvZ2dsZUNsYXNzKGVsZW1lbnQsIGNsYXNzTmFtZSwgc2Vjb25kQ2xhc3NOYW1lKVxyXG5cdHtcclxuXHRcdGlmIChlbGVtZW50ID09IG51bGwgfHwgdHlwZW9mIGVsZW1lbnQgPT0gJ3VuZGVmaW5lZCcpIHtcclxuXHRcdFx0dGhyb3cgbmV3IEludmFsaWRBcmd1bWVudEV4Y2VwdGlvbiQxO1xyXG5cdFx0fVxyXG5cclxuXHRcdHNlY29uZENsYXNzTmFtZSA9IHNlY29uZENsYXNzTmFtZSB8fCB1bmRlZmluZWQ7XHJcblxyXG5cdFx0aWYoc2Vjb25kQ2xhc3NOYW1lKSB7XHJcblx0XHRcdGVsZW1lbnQuY2xhc3NMaXN0LnRvZ2dsZShzZWNvbmRDbGFzc05hbWUpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiBlbGVtZW50LmNsYXNzTGlzdC50b2dnbGUoY2xhc3NOYW1lKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEZpbmRzIGFuIGVsZW1lbnQgaW5zaWRlIG9mIHBhcmVudC5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSBzdHJpbmcgfCBzZWxlY3RvclxyXG5cdCAqIEBwYXJhbSBvYmplY3QgfCBjb250ZXh0XHJcblx0ICogQHJldHVybiBtaXhlZFxyXG5cdCAqL1xyXG5cdHN0YXRpYyBmaW5kKHNlbGVjdG9yLCBjb250ZXh0ID0gd2luZG93LmRvY3VtZW50KSBcclxuXHR7XHJcblx0XHRyZXR1cm4gcXVlcnlFbGVtZW50KHNlbGVjdG9yLCBjb250ZXh0KTtcclxuXHR9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBRdWVyaWVzIGFuIGVsZW1lbnQgZnJvbSB0aGUgRE9NLlxyXG4gKlxyXG4gKiBAcGFyYW0gc3RyaW5nIHwgc2VsZWN0b3JcclxuICogQHBhcmFtIG9iamVjdCB8IHBhcmVudEVsZW1lbnRcclxuICogQHJldHVybiBtaXhlZFxyXG4gKi9cclxuZnVuY3Rpb24gcXVlcnlFbGVtZW50KHNlbGVjdG9yLCBwYXJlbnRFbGVtZW50KSBcclxue1xyXG5cdGxldCBlbGVtZW50ID0gcGFyZW50RWxlbWVudC5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9yKTtcclxuXHJcblx0aWYgKGVsZW1lbnQubGVuZ3RoID09IDApIHtcclxuXHRcdHJldHVybiBudWxsO1xyXG5cdH1cclxuXHJcblx0cmV0dXJuIChlbGVtZW50Lmxlbmd0aCA+IDEpID8gZWxlbWVudCA6IGVsZW1lbnRbMF07XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBDaGVja3MgaWYgcGFyZW50IGhhcyBjaGlsZC5cclxuICpcclxuICogQHBhcmFtIG9iamVjdCB8IHBhcmVudEVsZW1lbnRcclxuICogQHBhcmFtIG9iamVjdCB8IGNoaWxkRWxlbWVudFxyXG4gKiBAcmV0dXJuIGJvb2xcclxuICovXHJcbmZ1bmN0aW9uIGhhc0NoaWxkKHBhcmVudEVsZW1lbnQsIGNoaWxkRWxlbWVudCkgXHJcbntcclxuICAgICBsZXQgbm9kZSA9IGNoaWxkRWxlbWVudC5wYXJlbnROb2RlO1xyXG4gICAgIFxyXG4gICAgIHdoaWxlIChub2RlICE9IG51bGwpIHtcclxuICAgICAgICAgaWYgKG5vZGUgPT0gcGFyZW50RWxlbWVudCkge1xyXG4gICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgIH1cclxuICAgICAgICAgbm9kZSA9IG5vZGUucGFyZW50Tm9kZTtcclxuICAgICB9XHJcbiAgICAgXHJcbiAgICAgcmV0dXJuIGZhbHNlO1xyXG59XG5cbi8qKlxyXG4gKiBAZmlsZSBcclxuICogQ29tbW9uIGNsYXNzLlxyXG4gKlxyXG4gKiBBZGRzIHNvbWUgdXNlZnVsIGZ1bmN0aW9uYWxpdHkgZm9yXHJcbiAqIGNvbW1vbiB0YXNrcyAtIGRhdGEgY2hlY2tzIG9yIGRhdGEgbWFuaXB1bGF0aW9uLlxyXG4gKi9cclxuXHJcbmNsYXNzIENvbW1vblxyXG57XHJcblx0LyoqXHJcblx0ICogRXh0ZW5kIGFuIG9iamVjdC5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSBvYmplY3QgfCBjdXJyZW50T2JqZWN0XHJcblx0ICogQHBhcmFtIG9iamVjdCB8IG5ld09iamVjdFxyXG5cdCAqIEByZXR1cm4gb2JqZWN0XHJcblx0ICovXHJcblx0c3RhdGljIGV4dGVuZChjdXJyZW50T2JqZWN0LCBuZXdPYmplY3QpIHtcclxuXHRcdHZhciBleHRlbmRlZCA9IHt9O1xyXG5cdCAgICB2YXIgcHJvcDtcclxuXHJcblx0ICAgIGZvciAocHJvcCBpbiBjdXJyZW50T2JqZWN0KSB7XHJcblx0ICAgICAgICBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGN1cnJlbnRPYmplY3QsIHByb3ApKSB7XHJcblx0ICAgICAgICAgICAgZXh0ZW5kZWRbcHJvcF0gPSBjdXJyZW50T2JqZWN0W3Byb3BdO1xyXG5cdCAgICAgICAgfVxyXG5cdCAgICB9XHJcblxyXG5cdCAgICBmb3IgKHByb3AgaW4gbmV3T2JqZWN0KSB7XHJcblx0ICAgICAgICBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG5ld09iamVjdCwgcHJvcCkpIHtcclxuXHQgICAgICAgICAgICBleHRlbmRlZFtwcm9wXSA9IG5ld09iamVjdFtwcm9wXTtcclxuXHQgICAgICAgIH1cclxuXHQgICAgfVxyXG5cclxuXHQgICAgcmV0dXJuIGV4dGVuZGVkO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQ2hlY2tzIGZvciBhIG5lZWRsZSBpbiBoeXN0YWNrIGFycmF5LlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIG1peGVkIHwgbmVlZGxlXHJcblx0ICogQHBhcmFtIG9iamVjdCB8IG9iamVjdFxyXG5cdCAqIEByZXR1cm4gYm9vbFxyXG5cdCAqXHJcblx0ICovXHJcblx0c3RhdGljIGluX2FycmF5KG5lZWRsZSwgaHlzdGFjaykge1xyXG5cdFx0aWYoaHlzdGFjay5jb25zdHJ1Y3RvciAhPT0gQXJyYXkpIHtcclxuXHRcdFx0dGhyb3cgbmV3IEludmFsaWRBcmd1bWVudEV4Y2VwdGlvbiQxO1xyXG5cdFx0fVxyXG5cclxuXHRcdGZvcih2YXIgaSA9IDA7IGkgPD0gaHlzdGFjay5sZW5ndGg7IGkrKykge1xyXG5cdFx0XHRpZihuZWVkbGUgPT0gaHlzdGFja1tpXSkge1xyXG5cdFx0XHRcdHJldHVybiB0cnVlO1x0XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHRcclxuXHRcdHJldHVybiBmYWxzZTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFRha2VzIGFuIGFycmF5IGFuZCBjaHVua3MgaXQuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gYXJyYXkgfCB0b3RhbFxyXG5cdCAqIEBwYXJhbSBudW1iZXIgfCBjaHVua3NcclxuXHQgKiBAcmV0dXJuIGFycmF5XHJcblx0ICovXHJcblx0c3RhdGljIGFycmF5X2NodW5rKHRvdGFsLCBzaXplID0gNSlcclxuXHR7ICAgICAgICBcclxuICAgICAgXHRpZiAoaXNOYU4oc2l6ZSkpIHtcclxuICAgICAgXHRcdHRocm93IG5ldyBJbnZhbGlkQXJndW1lbnRFeGNlcHRpb24kMSgnQ29tbW9uLmFycmF5X2NodW5rKCkgZXhwZWN0cyB0aGUgc2Vjb25kIHBhcmFtZXRlciB0byBiZSBhIG51bWJlciwgYnV0ICcgKyB0eXBlb2Ygc2l6ZSArICcgcGFzc2VkIGluc3RlYWQuJylcclxuICAgICAgXHR9XHJcblxyXG4gICAgICBcdHNpemUgPSBwYXJzZUludChzaXplKTtcclxuICAgICAgIFxyXG4gICAgICAgXHRsZXQgaTtcclxuICAgICAgIFx0bGV0IGNvbGxlY3Rpb24gPSBbXTtcclxuXHJcbiAgICAgICAgLy8gYWRkIGVhY2ggY2h1bmsgdG8gdGhlIHJlc3VsdFxyXG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCBNYXRoLmNlaWwodG90YWwubGVuZ3RoIC8gc2l6ZSk7IGkrKykge1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgdmFyIHN0YXJ0ID0gaSAqIHNpemU7XHJcbiAgICAgICAgICAgIHZhciBlbmQgPSBzdGFydCArIHNpemU7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBjb2xsZWN0aW9uLnB1c2godG90YWwuc2xpY2Uoc3RhcnQsIGVuZCkpO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgcmV0dXJuIGNvbGxlY3Rpb247XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBDaGVja3MgaWYgYW4gb2JqZWN0IGlzIGVtcHR5LlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIG9iamVjdCB8IG9iamVjdFxyXG5cdCAqIEByZXR1cm4gYm9vbFxyXG5cdCAqL1xyXG5cdHN0YXRpYyBlbXB0eU9iamVjdChvYmplY3QpIHtcclxuXHRcdGZvciAobGV0IHByb3AgaW4gb2JqZWN0KSB7XHJcblx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gdHJ1ZTtcclxuXHR9XHJcblxyXG5cclxuXHQvKipcclxuXHQgKiBDaGVja3MgaWYgYSBnaXZlbiBvYmplY3QgY29udGFpbmVkIGluIGFuIGFycmF5LlxyXG5cdCAqIFxyXG5cdCAqIEBwYXJhbSBvYmplY3QgfCBvYmplY3RcclxuXHQgKiBAcGFyYW0gYXJyYXkgfCBoYXlzdGFja1xyXG5cdCAqIEByZXR1cm4gYm9vbFxyXG5cdCAqL1xyXG5cdHN0YXRpYyBjb250YWluc09iamVjdChvYmplY3QsIGh5c3RhY2spIFxyXG5cdHtcclxuXHQgICAgbGV0IGk7XHJcblxyXG5cdCAgICBmb3IgKGkgPSAwOyBpIDwgaHlzdGFjay5sZW5ndGg7IGkrKykge1xyXG5cdCAgICAgICAgaWYgKHR5cGVvZiBvYmplY3QgPT0gJ3N0cmluZycgJiYgaHlzdGFja1tpXS5jb25zdHJ1Y3Rvci5uYW1lID09PSBvYmplY3QpIHtcclxuXHQgICAgICAgIFx0cmV0dXJuIHRydWU7XHJcblx0ICAgICAgICB9XHJcblxyXG5cdCAgICAgICAgaWYgKGh5c3RhY2tbaV0gPT09IG9iamVjdCkge1xyXG5cdCAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG5cdCAgICAgICAgfVxyXG5cdCAgICB9XHJcblxyXG5cdCAgICByZXR1cm4gZmFsc2U7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBDaGVja3MgaWYgYSBnaXZlbiBwYXJhbWV0ZXIgaXMgYW4gb2JqZWN0LlxyXG5cdCAqIFxyXG5cdCAqIEBwYXJhbSBvYmplY3QgfCBvYmplY3RcclxuXHQgKiBAcmV0dXJuIGJvb2xcclxuXHQgKi9cclxuXHRzdGF0aWMgaXNPYmplY3Qob2JqZWN0KSBcclxuXHR7XHJcblx0XHRyZXR1cm4gdHlwZW9mIG9iamVjdCA9PSAnb2JqZWN0JztcclxuXHR9XHJcbn1cblxubGV0IGRlZmF1bHRNZXNzYWdlJDEgPSAnVGhlIGRhdGEgc3RydWN0dXJlIGlzIGludmFsaWQnO1xyXG5cclxuY2xhc3MgSW52YWxpZERhdGFTdHJ1Y3R1cmVFeGNlcHRpb24gZXh0ZW5kcyBFeGNlcHRpb25IYW5kbGVyXHJcbntcclxuXHRjb25zdHJ1Y3RvcihtZXNzYWdlID0gbnVsbCkgXHJcblx0e1xyXG5cdFx0bWVzc2FnZSA9IG1lc3NhZ2UgfHwgZGVmYXVsdE1lc3NhZ2UkMTtcclxuXHRcdHN1cGVyKG1lc3NhZ2UpO1xyXG4gICAgXHRzdXBlci5zdGFja1RyYWNlKHRoaXMsIG1lc3NhZ2UpO1xyXG4gICAgfVxyXG59XG5cbi8qKlxyXG4gKiBAZmlsZSBcclxuICogUmVxdWVzdCBjbGFzcy5cclxuICpcclxuICogSGFuZGxlcyBhamF4IHJlcXVlc3RzIFBPU1QsIEdFVCBldGMuLi5cclxuICovXHJcblxyXG4vKipcclxuICogU3RvcmVzIHRoZSBkZWZhdWx0IHNldHRpbmdzLlxyXG4gKlxyXG4gKiBAdmFyIG9iamVjdFxyXG4gKi9cclxuXHJcbmxldCBkZWZhdWx0U2V0dGluZ3MkMSA9IHtcclxuXHRoZWFkZXJzOiB7XHJcblx0XHQnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nXHJcblx0fSxcclxuXHRhc3luYzogdHJ1ZVxyXG59O1xyXG5cclxuY2xhc3MgUmVxdWVzdFxyXG57XHJcblx0LyoqXHJcblx0ICogLSBJbml0aWFsaXplIHRoZSBzZXR0aW5ncyBvYmplY3QuXHJcblx0ICogLSBJbml0aWFsaXplIHRoZSB4aHIgb2JqZWN0LlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIG9iamVjdCB8IHNldHRpbmdzXHJcblx0ICogQHJldHVybiB2b2lkXHJcblx0ICovXHJcblx0Y29uc3RydWN0b3Ioc2V0dGluZ3MpXHJcblx0e1xyXG5cdFx0dGhpcy54aHIgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKSB8fCBuZXcgQWN0aXZlWE9iamVjdChcIk1pY3Jvc29mdC5YTUxIVFRQXCIpO1xyXG5cdFx0dGhpcy5zZXR0aW5ncyA9IENvbW1vbi5leHRlbmQoZGVmYXVsdFNldHRpbmdzJDEsIHNldHRpbmdzKTtcclxuXHRcdHRoaXMuc2V0RGVmYXVsdFJlcXVlc3RIZWFkZXIoKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFNldHMgdGhlIGRlZmF1bHQgcmVxdWVzdCBoZWFkZXJzLlxyXG5cdCAqXHJcblx0ICogQHJldHVybiB2b2lkXHJcblx0ICovXHJcblx0c2V0RGVmYXVsdFJlcXVlc3RIZWFkZXIoKVxyXG5cdHtcclxuXHRcdGxldCBoZWFkZXI7XHJcblx0XHRsZXQgaGVhZGVycyA9IHRoaXMuc2V0dGluZ3MuaGVhZGVycztcclxuXHRcdGxldCBhc3luYyA9IHRoaXMuc2V0dGluZ3MuYXN5bmM7XHJcblx0XHRsZXQgb3BlbiA9IFhNTEh0dHBSZXF1ZXN0LnByb3RvdHlwZS5vcGVuO1xyXG5cdFx0bGV0IHNldFJlcXVlc3RIZWFkZXIgPSBYTUxIdHRwUmVxdWVzdC5wcm90b3R5cGUuc2V0UmVxdWVzdEhlYWRlcjtcclxuXHJcblx0XHRYTUxIdHRwUmVxdWVzdC5wcm90b3R5cGUub3BlbiA9IGZ1bmN0aW9uKCkge1xyXG5cdFx0XHR2YXIgcmVzcG9uc2UgPSBvcGVuLmFwcGx5KHRoaXMsIGFyZ3VtZW50cywgYXN5bmMpO1xyXG5cclxuXHRcdFx0Zm9yIChoZWFkZXIgaW4gaGVhZGVycykge1xyXG5cdFx0XHRcdHRoaXMuc2V0UmVxdWVzdEhlYWRlcihoZWFkZXIsIGhlYWRlcnNbaGVhZGVyXSk7XHJcblx0XHRcdH1cclxuXHJcblx0ICBcdFx0cmV0dXJuIHJlc3BvbnNlO1xyXG5cdFx0fTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIE1ha2VzIGEgUE9TVCByZXF1ZXN0LlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIG9iamVjdCB8IG9wdGlvbnNcclxuXHQgKiBAcmV0dXJuIFByb21pc2VcclxuXHQgKi9cclxuXHRwb3N0KG9wdGlvbnMpXHJcblx0e1xyXG5cdFx0bGV0IHhociA9IHRoaXMueGhyO1xyXG5cclxuXHRcdGlmKG9wdGlvbnMuaGFzT3duUHJvcGVydHkoJ2JlZm9yZScpICYmIHR5cGVvZiBvcHRpb25zLmJlZm9yZSA9PSAnZnVuY3Rpb24nKSB7XHJcblx0XHRcdG9wdGlvbnMuYmVmb3JlLmNhbGwodGhpcyk7XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xyXG5cdFx0XHRpZih0eXBlb2Ygb3B0aW9ucyAhPT0gJ29iamVjdCcpIHtcclxuXHRcdFx0XHR0aHJvdyBuZXcgRXJyb3IoJ2dldCBleHBlY3RpbmcgYSBqc29uIG9iamVjdCB0byBiZSBwYXNzZWQgYXMgYW4gYXJndW1lbnQsIGJ1dCAnKyB0eXBlb2Ygb3B0aW9ucyArICcgd2FzIHBhc3NlZC4nKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0b3B0aW9ucy5kYXRhID0gb3B0aW9ucy5kYXRhIHx8IHt9O1xyXG5cclxuXHRcdFx0aWYodHlwZW9mIG9wdGlvbnMuZGF0YSAhPT0gJ29iamVjdCcpIHtcclxuXHRcdFx0XHR0aHJvdyBuZXcgRXJyb3IoJ2RhdGEgcHJvcGVydHkgZXhwZWN0aW5nIGEganNvbiBvYmplY3QgdG8gYmUgcGFzc2VkIGFzIGFuIGFyZ3VtZW50LCBidXQgJyArIHR5cGVvZiBvcHRpb25zLmRhdGEgKyAnIHdhcyBwYXNzZWQuJyk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHhoci5vcGVuKCdQT1NUJywgb3B0aW9ucy51cmwsIHRydWUpO1xyXG5cclxuXHRcdFx0eGhyLnJlc3BvbnNlVHlwZSA9IG9wdGlvbnMuZGF0YVR5cGUgfHwgJ2pzb24nO1xyXG5cdFx0XHR4aHIudGltZW91dCA9IG9wdGlvbnMudGltZW91dCB8fCAzMDAwO1xyXG5cclxuXHRcdFx0eGhyLm9ucmVhZHlzdGF0ZWNoYW5nZSA9IGZ1bmN0aW9uKCkge1xyXG5cdFx0XHQgICAgaWYodGhpcy5yZWFkeVN0YXRlICE9IDQgfHwgdGhpcy5zdGF0dXMgIT0gMjAwKSB7XHJcblx0XHRcdCAgICBcdHJldHVybjtcclxuXHRcdFx0ICAgIH1cclxuXHQgICAgICAgXHRcclxuICAgICAgIFx0XHRcdHJlc29sdmUodGhpcy5yZXNwb25zZSk7XHJcbiAgICAgICBcdFx0XHRcclxuICAgICAgIFx0XHRcdGlmKG9wdGlvbnMuaGFzT3duUHJvcGVydHkoJ2FmdGVyJykgJiYgdHlwZW9mIG9wdGlvbnMuYWZ0ZXIgPT0gJ2Z1bmN0aW9uJykge1xyXG5cdFx0XHRcdFx0b3B0aW9ucy5hZnRlci5jYWxsKHRoaXMpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fTtcclxuXHJcblx0XHRcdHhoci5vbmVycm9yID0gZnVuY3Rpb24obWVzc2FnZSkge1xyXG5cdFx0XHRcdG9wdGlvbnMuZXJyb3IobWVzc2FnZSk7XHJcblx0XHRcdFx0cmVqZWN0KG1lc3NhZ2UpO1xyXG5cdFx0XHR9O1xyXG5cclxuXHRcdFx0aWYoISBvcHRpb25zLmRhdGEpIHtcclxuXHRcdFx0XHR4aHIuc2VuZChudWxsKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0dmFyIHF1ZXJ5U3RyaW5nID0gT2JqZWN0LmtleXMob3B0aW9ucy5kYXRhKS5tYXAoZnVuY3Rpb24oa2V5KSB7XHJcblx0XHQgICAgICAgICAgICByZXR1cm4gZW5jb2RlVVJJQ29tcG9uZW50KGtleSkgKyAnPScgK1xyXG5cdFx0ICAgICAgICAgICAgICAgIFx0ZW5jb2RlVVJJQ29tcG9uZW50KG9wdGlvbnMuZGF0YVtrZXldKTtcclxuXHRcdCAgICAgICAgXHR9KS5qb2luKCcmJyk7XHJcblxyXG5cdFx0XHR4aHIuc2VuZChxdWVyeVN0cmluZyk7XHJcblx0XHR9KTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIE1ha2VzIGEgR0VUIGFqYXggcmVxdWVzdC5cclxuXHQgKiBcclxuXHQgKiBAcGFyYW0gb2JqZWN0IHwgb3B0aW9uc1xyXG5cdCAqIEByZXR1cm4gUHJvbWlzZVxyXG5cdCAqL1xyXG5cdGdldChvcHRpb25zKVxyXG5cdHtcclxuXHRcdGxldCB4aHIgPSB0aGlzLnhocjtcclxuXHJcblx0XHRpZihvcHRpb25zLmhhc093blByb3BlcnR5KCdiZWZvcmUnKSAmJiB0eXBlb2Ygb3B0aW9ucy5iZWZvcmUgPT0gJ2Z1bmN0aW9uJykge1xyXG5cdFx0XHRvcHRpb25zLmJlZm9yZS5jYWxsKHRoaXMpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcclxuXHRcdFx0aWYodHlwZW9mIG9wdGlvbnMgIT09ICdvYmplY3QnKSB7XHJcblx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKCdnZXQgZXhwZWN0aW5nIGEganNvbiBvYmplY3QgdG8gYmUgcGFzc2VkIGFzIGFuIGFyZ3VtZW50LCBidXQgJysgdHlwZW9mIG9wdGlvbnMgKyAnIHdhcyBwYXNzZWQuJyk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdG9wdGlvbnMuZGF0YSA9IG9wdGlvbnMuZGF0YSB8fCB7fTtcclxuXHJcblx0XHRcdGlmKHR5cGVvZiBvcHRpb25zLmRhdGEgIT09ICdvYmplY3QnKSB7XHJcblx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKCdkYXRhIHByb3BlcnR5IGV4cGVjdGluZyBhIGpzb24gb2JqZWN0IHRvIGJlIHBhc3NlZCBhcyBhbiBhcmd1bWVudCwgYnV0ICcgKyB0eXBlb2Ygb3B0aW9ucy5kYXRhICsgJyB3YXMgcGFzc2VkLicpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHR4aHIub3BlbignR0VUJywgb3B0aW9ucy51cmwsIHRydWUpO1xyXG5cclxuXHRcdFx0eGhyLnJlc3BvbnNlVHlwZSA9IG9wdGlvbnMuZGF0YVR5cGUgfHwgJ2pzb24nO1xyXG5cdFx0XHR4aHIudGltZW91dCA9IG9wdGlvbnMudGltZW91dCB8fCAzMDAwO1xyXG5cclxuXHRcdFx0eGhyLm9ucmVhZHlzdGF0ZWNoYW5nZSA9IGZ1bmN0aW9uKCkge1xyXG5cdFx0XHQgICAgaWYodGhpcy5yZWFkeVN0YXRlICE9IDQgfHwgdGhpcy5zdGF0dXMgIT0gMjAwKSB7XHJcblx0XHRcdCAgICBcdHJldHVybjtcclxuXHRcdFx0ICAgIH1cclxuXHQgICAgICAgXHRcclxuICAgICAgIFx0XHRcdHJlc29sdmUodGhpcy5yZXNwb25zZSk7XHJcbiAgICAgICBcdFx0XHRcclxuICAgICAgIFx0XHRcdGlmKG9wdGlvbnMuaGFzT3duUHJvcGVydHkoJ2FmdGVyJykgJiYgdHlwZW9mIG9wdGlvbnMuYWZ0ZXIgPT0gJ2Z1bmN0aW9uJykge1xyXG5cdFx0XHRcdFx0b3B0aW9ucy5hZnRlci5jYWxsKHRoaXMpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fTtcclxuXHJcblx0XHRcdHhoci5vbmVycm9yID0gZnVuY3Rpb24obWVzc2FnZSkge1xyXG5cdFx0XHRcdG9wdGlvbnMuZXJyb3IobWVzc2FnZSk7XHJcblx0XHRcdFx0cmVqZWN0KG1lc3NhZ2UpO1xyXG5cdFx0XHR9O1xyXG5cclxuXHRcdFx0aWYoISBvcHRpb25zLmRhdGEpIHtcclxuXHRcdFx0XHR4aHIuc2VuZChudWxsKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0dmFyIHF1ZXJ5U3RyaW5nID0gT2JqZWN0LmtleXMob3B0aW9ucy5kYXRhKS5tYXAoZnVuY3Rpb24oa2V5KSB7XHJcblx0XHQgICAgICAgICAgICByZXR1cm4gZW5jb2RlVVJJQ29tcG9uZW50KGtleSkgKyAnPScgK1xyXG5cdFx0ICAgICAgICAgICAgICAgIFx0ZW5jb2RlVVJJQ29tcG9uZW50KG9wdGlvbnMuZGF0YVtrZXldKTtcclxuXHRcdCAgICAgICAgXHR9KS5qb2luKCcmJyk7XHJcblxyXG5cdFx0XHR4aHIuc2VuZChxdWVyeVN0cmluZyk7XHJcblx0XHR9KTtcclxuXHR9XHJcbn1cblxubGV0IGRlZmF1bHRNZXNzYWdlJDIgPSAndHJ5aW5nIHRvIGJpbmQgYW4gYWxyZWFkeSBleGlzdGluZyBib3VuZC4nO1xyXG5cclxuY2xhc3MgSW52YWxpZEJpbmRpbmdFeGNlcHRpb24gZXh0ZW5kcyBFeGNlcHRpb25IYW5kbGVyXHJcbntcclxuXHRjb25zdHJ1Y3RvcihtZXNzYWdlID0gbnVsbCkgXHJcblx0e1xyXG5cdFx0bWVzc2FnZSA9IG1lc3NhZ2UgfHwgZGVmYXVsdE1lc3NhZ2UkMjtcclxuXHRcdHN1cGVyKG1lc3NhZ2UpO1xyXG4gICAgXHRzdXBlci5zdGFja1RyYWNlKHRoaXMsIG1lc3NhZ2UpO1xyXG4gICAgfVxyXG59XG5cbi8qKlxyXG4gKiBAZmlsZSBcclxuICogQ29udGFpbmVyIGNsYXNzLlxyXG4gKlxyXG4gKiBIYW5kbGVzL0NvbnRyb2xzIHRoZSBkZXBlbmRlbmNpZXMgb2YgZWNvbW1lcmNlLlxyXG4gKi9cclxuXHJcbi8qKlxyXG4gKiBTdG9yZXMgdGhlIGluc3RhbmNlc1xyXG4gKlxyXG4gKiBAdmFyIGFycmF5XHJcbiAqL1xyXG5sZXQgaW5zdGFuY2VzID0gW107XHJcblxyXG5jbGFzcyBDb250YWluZXIgXHJcbntcclxuXHQvKipcclxuXHQgKiBCaW5kcyBrZXkgdG8gY29uY3JldGUgY2xhc3MuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gc3RyaW5nIHwga2V5XHJcblx0ICogQHBhcmFtIGNsYXNzIHwgY29uY3JldGVcclxuXHQgKiBAcmV0dXJuIHZvaWRcclxuXHQgKi9cclxuXHRiaW5kKGtleSwgY29uY3JldGUpIFxyXG5cdHtcclxuXHRcdGlmICh0eXBlb2Yga2V5ICE9ICdzdHJpbmcnKSB7XHJcblx0XHRcdHRocm93IG5ldyBJbnZhbGlkQXJndW1lbnRFeGNlcHRpb24kMSgnYmluZCgpIGV4cGVjdHMgdGhlIGZpcnN0IHBhcmFtZXRlciB0byBiZSBzdHJpbmcsIGJ1dCAnICsgdHlwZW9mIGtleSArICcgd2FzIHBhc3NlZCBpbnN0ZWFkLicpO1xyXG5cdFx0fVxyXG5cclxuXHRcdGlmICh0eXBlb2YgY29uY3JldGUgIT0gJ2Z1bmN0aW9uJykgeyBcclxuXHRcdFx0dGhyb3cgbmV3IEludmFsaWRBcmd1bWVudEV4Y2VwdGlvbiQxKCdiaW5kKCkgZXhwZWN0cyB0aGUgc2Vjb25kIHBhcmFtZXRlciB0byBiZSBhIGZ1bmN0aW9uLCBidXQgJyArIHR5cGVvZiBjb25jcmV0ZSArICcgd2FzIHBhc3NlZCBpbnN0ZWFkLicpO1xyXG5cdFx0fVxyXG5cclxuXHRcdGlmICh0eXBlb2YgdGhpc1trZXldICE9ICd1bmRlZmluZWQnKSB7XHJcblx0XHRcdHRocm93IG5ldyBJbnZhbGlkQmluZGluZ0V4Y2VwdGlvbignYmluZCgpIHJlY2lldmVkIGFuIGFscmVhZHkgZXhpc3RpbmcgYmluZC4nKTtcclxuXHRcdH1cclxuXHJcblx0XHR0aGlzW2tleV0gPSBjb25jcmV0ZS5iaW5kKGNvbmNyZXRlLCB0aGlzKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFNldHMgYW4gaW5zdGFuY2UuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gc3RyaW5nIHwga2V5XHJcblx0ICogQHBhcmFtIG9iamVjdCB8IGluc3RhbmNlXHJcblx0ICogQHBhcmFtIHN0cmluZyB8IGFsaWFzXHJcblx0ICogQHJldHVybiB2b2lkXHJcblx0ICovXHJcblx0c2V0SW5zdGFuY2Uoa2V5LCBpbnN0YW5jZSwgYWxpYXMgPSBudWxsKSBcclxuXHR7XHJcblx0XHRpZiAodHlwZW9mIGtleSAhPSAnc3RyaW5nJykge1xyXG5cdFx0XHR0aHJvdyBuZXcgSW52YWxpZEFyZ3VtZW50RXhjZXB0aW9uJDEoJ3NldEluc3RhY2UoKSBleHBlY3RzIHRoZSBmaXJzdCBwYXJhbWV0ZXIgdG8gYmUgYSBzdHJpbmcsIGJ1dCAnICsgdHlwZW9mIGtleSArICcgd2FzIHBhc3NlZCBpbnN0ZWFkLicpO1xyXG5cdFx0fVxyXG5cclxuXHRcdGlmICh0eXBlb2YgaW5zdGFuY2UgIT0gJ29iamVjdCcpIHtcclxuXHRcdFx0dGhyb3cgbmV3IEludmFsaWRBcmd1bWVudEV4Y2VwdGlvbiQxKCdzZXRJbnN0YW5jZSgpIGV4cGVjdHMgdGhlIHNlY29uZCBwYXJhbWV0ZXIgdG8gYmUgYW4gb2JqZWN0LCBidXQgJyArIHR5cGVvZiBpbnN0YW5jZSArICcgd2FzIHBhc3NlZCBpbnN0ZWFkLicpO1xyXG5cdFx0fVxyXG5cclxuXHRcdGluc3RhbmNlc1trZXldID0gaW5zdGFuY2U7XHJcblx0XHRpbnN0YW5jZXNbYWxpYXNdID0gaW5zdGFuY2U7XHJcblx0XHR0aGlzW2tleV0gPSBpbnN0YW5jZTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFJlc29sdmVzIGFuIGluc3RhbmNlIG91dCBvZiBcclxuXHQgKiB0aGUgaW9jIGNvbnRhaW5lci5cclxuXHQgKiBcclxuXHQgKiBAcGFyYW0gc3RyaW5nIHwga2V5XHJcblx0ICogQHJldHVybiBvYmplY3RcclxuXHQgKi9cclxuXHRnZXRJbnN0YW5jZShrZXkpIFxyXG5cdHtcclxuXHRcdGlmKHR5cGVvZiBrZXkgIT0gJ3N0cmluZycpIHtcclxuXHRcdFx0dGhyb3cgbmV3IEludmFsaWRBcmd1bWVudEV4Y2VwdGlvbiQxKCdnZXRJbnN0YWNlKCkgZXhwZWN0cyB0aGUgZmlyc3QgcGFyYW1ldGVyIHRvIGJlIGEgc3RyaW5nLCBidXQgJyArIHR5cGVvZiBrZXkgKyAnIHdhcyBwYXNzZWQgaW5zdGVhZC4nKTtcclxuXHRcdH1cclxuXHJcblx0XHRpZih0eXBlb2Yga2V5ID09ICdvYmplY3QnKSB7XHJcblx0XHRcdHJldHVybiBpbnN0YW5jZXNba2V5LmNvbnN0cnVjdG9yLm5hbWVdIHx8IG51bGw7XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIGluc3RhbmNlc1trZXldIHx8IG51bGw7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBDaGVja3MgaWYgYW4gaW5zdGFuY2UgZXhpc3QuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gbWl4ZWQgfCBpbnN0YW5jZVxyXG5cdCAqIEByZXR1cm4gYm9vbFxyXG5cdCAqL1xyXG5cdGluc3RhbmNlRXhpc3QoaW5zdGFuY2UpIFxyXG5cdHtcclxuXHRcdGlmICh0eXBlb2YgaW5zdGFuY2UgPT0gJ29iamVjdCcpIHtcclxuXHRcdFx0cmV0dXJuICh0eXBlb2YgaW5zdGFuY2VzW2luc3RhbmNlLmNvbnN0cnVjdG9yLm5hbWVdICE9PSAndW5kZWZpbmVkJyk7XHJcblx0XHR9IGVsc2UgaWYgKHR5cGVvZiBpbnN0YW5jZSA9PSAnc3RyaW5nJykge1xyXG5cdFx0XHRyZXR1cm4gKHR5cGVvZiBpbnN0YW5jZXNbaW5zdGFuY2VdICE9PSAndW5kZWZpbmVkJylcclxuXHRcdH1cclxuXHRcdFxyXG5cdFx0dGhyb3cgbmV3IEludmFsaWRBcmd1bWVudEV4Y2VwdGlvbiQxKCdpbnN0YW5jZUV4aXN0KCkgZXhwZWN0cyB0aGUgZmlyc3QgcGFyYW1ldGVyIHRvIGJlIHN0cmluZyBvciBhbiBvYmplY3QsIGJ1dCAnICsgdHlwZW9mIGluc3RhbmNlICsgJyB3YXMgcGFzc2VkIGluc3RlYWQuJyk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBSZXRyaWV2ZSBhbiBvYmplY3QsIGlmIG5vdCBleGlzdHNcclxuXHQgKiB3aWxsIGNyZWF0ZSBpdCwgc2V0IGl0IGluIHRoZSBpb2MgY29udGFpbmVyXHJcblx0ICogZm9yIGxhdGVyIHVzZSBhbmQgcmV0cmlldmUgaXQuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gbWl4ZWQgfCBvYmplY3QgXHJcblx0ICogQHJldHVybiBvYmplY3RcclxuXHQgKi9cclxuXHRtYWtlKG9iamVjdClcclxuXHR7XHJcblx0XHRsZXQgaW5zdGFuY2UgPSB7fTtcclxuXHRcdGxldCBrZXk7XHJcblxyXG5cdFx0aWYgKHRoaXMuaW5zdGFuY2VFeGlzdChvYmplY3QpKSB7XHJcblx0XHRcdHJldHVybiB0aGlzLmdldEluc3RhbmNlKG9iamVjdCk7XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKHR5cGVvZiBvYmplY3QgPT0gJ29iamVjdCcpIHtcclxuXHRcdFx0aW5zdGFuY2UgPSBvYmplY3Q7XHJcblx0XHRcdGtleSA9IG9iamVjdC5jb25zdHJ1Y3Rvci5uYW1lO1xyXG5cdFx0XHR0aGlzLnNldEluc3RhbmNlKGtleSwgaW5zdGFuY2UpOyBcclxuXHRcdH0gZWxzZSBpZih0eXBlb2Ygb2JqZWN0ID09ICdzdHJpbmcnICYmIHRoaXMuaGFzT3duUHJvcGVydHkob2JqZWN0KSkge1xyXG5cdFx0XHRpbnN0YW5jZSA9IG5ldyB0aGlzW29iamVjdF07XHJcblx0XHRcdGtleSA9IG9iamVjdDtcclxuXHRcdFx0dGhpcy5zZXRJbnN0YW5jZShrZXksIGluc3RhbmNlKTtcdFxyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0dGhyb3cgbmV3IEludmFsaWRCaW5kaW5nRXhjZXB0aW9uKCdUaGUgcGFyYW1ldGVyIHlvdSBwYXNzZWQgY291bGQgbm90IGJlIGJvdW5kZWQgdG8gdGhlIGNvbnRhaW5lciwgcGFyYW1ldGVyOiAnICsgdHlwZW9mIG9iamVjdCk7XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIGluc3RhbmNlO1xyXG5cdH1cclxuXHJcblx0Zmx1c2goKVxyXG5cdHtcclxuXHRcdGluc3RhbmNlcyA9IFtdO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogUmV0cmlldmUgYWxsIGluc3RhbmNlcy5cclxuXHQgKlxyXG5cdCAqIEByZXR1cm4gYXJyYXlcclxuXHQgKi9cclxuXHRpbnN0YW5jZXMoKSBcclxuXHR7XHJcblx0XHRyZXR1cm4gaW5zdGFuY2VzO1xyXG5cdH1cclxufVxuXG5sZXQgZGVmYXVsdE1lc3NhZ2UkMyA9ICdUaGUgZXZlbnQgeW91IGNhbGxlZCBkb2VzIG5vdCBleGlzdHMgb3IgeW91IHN1cHBsaWVkIHdyb25nIGFyZ3VtZW50JztcclxuXHJcbmNsYXNzIEJhZEV2ZW50Q2FsbEV4Y2VwdGlvbiBleHRlbmRzIEV4Y2VwdGlvbkhhbmRsZXJcclxue1xyXG5cdGNvbnN0cnVjdG9yKG1lc3NhZ2UgPSBudWxsKSBcclxuXHR7XHJcblx0XHRtZXNzYWdlID0gbWVzc2FnZSB8fCBkZWZhdWx0TWVzc2FnZSQzO1xyXG5cdFx0c3VwZXIobWVzc2FnZSk7XHJcbiAgICBcdHN1cGVyLnN0YWNrVHJhY2UodGhpcywgbWVzc2FnZSk7XHJcbiAgICB9XHJcbn1cblxuLyoqXHJcbiAqIEBmaWxlIFxyXG4gKiBFdmVudE1hbmFnZXIgY2xhc3MuXHJcbiAqXHJcbiAqIEhhbmRsZXMgc3Vic2NyaXBpb25zIGFuZCBwdWJsaXNoaW5nIG9mIGV2ZW50cy5cclxuICovXHJcblxyXG5jbGFzcyBFdmVudE1hbmFnZXJcclxue1xyXG5cdC8qKlxyXG5cdCAqIFN0b3JlcyB0aGUgZXZlbnRzIGNhbGxiYWNrcy5cclxuXHQgKiBcclxuXHQgKiBAdmFyIGFycmF5XHJcblx0ICovXHJcblx0Y29uc3RydWN0b3IoKVxyXG5cdHtcclxuXHRcdHRoaXMuZXZlbnRzID0ge307XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBTdWJzY3JpYmluZyB0byBhbiBldmVudC5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSBzdHJpbmcgfCBuYW1lXHJcblx0ICogQHBhcmFtIGZ1bmN0aW9uIHwgY2FsbGJhY2tcclxuXHQgKiBAcmV0dXJuIHZvaWRcclxuXHQgKi9cclxuXHRzdWJzY3JpYmUobmFtZSwgY2FsbGJhY2spIFxyXG5cdHtcclxuXHRcdGlmICh0eXBlb2YgY2FsbGJhY2sgIT09ICdmdW5jdGlvbicpIHtcclxuXHRcdFx0dGhyb3cgbmV3IEludmFsaWRBcmd1bWVudEV4Y2VwdGlvbjtcclxuXHRcdH1cclxuXHJcblx0XHRpZiAodHlwZW9mIHRoaXMuZXZlbnRzW25hbWVdID09ICd1bmRlZmluZWQnKSB7XHJcblx0XHRcdHRoaXMuZXZlbnRzW25hbWVdID0gW107XHJcblx0XHR9XHJcblxyXG5cdFx0dGhpcy5ldmVudHNbbmFtZV0ucHVzaChjYWxsYmFjayk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBQdWJsaXNoIGFuIGV2ZW50IHRvIGFsbCBzdWJzY3JpYmVycy5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSBzdHJpbmcgfCBuYW1lXHJcblx0ICogQHBhcmFtIGxpc3QgfCBkYXRhXHJcblx0ICogQHJldHVybiB2b2lkXHJcblx0ICovXHJcblx0cHVibGlzaChuYW1lLCAuLi5kYXRhKSBcclxuXHR7XHJcblx0XHRkYXRhID0gZGF0YSB8fCBudWxsO1xyXG5cclxuXHRcdC8vIElmIHRoZXJlIGFyZSBubyBzdWJzY3JpYmVycyBzaW1wbHkgaWdub3JlIHRoYXQgZXZlbnQuXHJcblx0XHRpZiAodHlwZW9mIHRoaXMuZXZlbnRzW25hbWVdID09ICd1bmRlZmluZWQnKSB7XHJcblx0XHRcdHJldHVybjtcclxuXHRcdH1cclxuXHJcblx0XHR0aGlzLmV2ZW50c1tuYW1lXS5mb3JFYWNoKGZ1bmN0aW9uKGNhbGxiYWNrKSB7XHJcblx0XHRcdGlmKHR5cGVvZiBjYWxsYmFjayAhPSAnZnVuY3Rpb24nKSB7XHJcblx0XHRcdFx0dGhyb3cgbmV3IEludmFsaWRBcmd1bWVudEV4Y2VwdGlvbignc3Vic2NyaWJlKCkgc2hvdWxkIHJlY2lldmUgY2FsbGJhY2sgYXMgc2Vjb25kIHBhcmFtZXRlciwgYnV0ICcrIHR5cGVvZiBjYWxsYmFjayArJyB3YXMgcGFzc2VkJyk7XHJcblx0XHRcdH1cclxuXHRcdFx0XHJcblx0XHRcdHJldHVybiBjYWxsYmFjayguLi5kYXRhKTtcclxuXHRcdH0pO1xyXG5cdH1cclxufVxuXG4vKipcclxuICogQGZpbGUgXHJcbiAqIENvb2tpZSBjbGFzcy5cclxuICpcclxuICogQWRkcyBzb21lIHVzZWZ1bCBmdW5jdGlvbmFsaXR5IGZvclxyXG4gKiBzZXR0aW5nIG9yIGdldHRpbmcgY29va2llcy5cclxuICovXHJcblx0XHJcbmNsYXNzIENvb2tpZVxyXG57XHJcblx0LyoqXHJcbiBcdCogU2V0cyBhIGNvb2tpZS5cclxuIFx0KiBcclxuIFx0KiBAcGFyYW0gc3RyaW5nIHwgbmFtZVxyXG4gXHQqIEBwYXJhbSBKU09OIHwgdmFsdWVcclxuIFx0KiBAcGFyYW0gaW50ZWdlciB8IGRheXNcclxuIFx0KiBAcmV0dXJuIHZvaWRcclxuXHQqL1xyXG5cdHN0YXRpYyBzZXQobmFtZSwgdmFsdWUsIGRheXMpIFxyXG5cdHtcclxuXHRcdGlmICh2YWx1ZS5jb25zdHJ1Y3Rvci5uYW1lICA9PSAnT2JqZWN0JyB8fCB2YWx1ZS5jb25zdHJ1Y3Rvci5uYW1lID09ICdBcnJheScpIHtcclxuXHRcdFx0dmFsdWUgPSBKU09OLnN0cmluZ2lmeSh2YWx1ZSk7XHJcblx0XHR9XHJcblxyXG5cdFx0ZGF5cyA9IGRheXMgfHwgMTA7XHJcblxyXG5cdCAgICBsZXQgZXhwaXJlcztcclxuXHQgICAgXHJcblx0ICAgIGlmIChkYXlzKSB7XHJcblx0ICAgICAgICBsZXQgZGF0ZSA9IG5ldyBEYXRlKCk7XHJcblx0ICAgICAgICBkYXRlLnNldFRpbWUoZGF0ZS5nZXRUaW1lKCkgKyAoZGF5cyAqIDI0ICogNjAgKiA2MCAqIDEwMDApKTtcclxuXHQgICAgICAgIGV4cGlyZXMgPSBcIjsgZXhwaXJlcz1cIiArIGRhdGUudG9HTVRTdHJpbmcoKTtcclxuXHQgICAgfSBlbHNlIHtcclxuXHQgICAgICAgIGV4cGlyZXMgPSBcIlwiO1xyXG5cdCAgICB9XHJcblxyXG5cdCAgICBkb2N1bWVudC5jb29raWUgPSBuYW1lICsgXCI9XCIgKyB2YWx1ZSArIGV4cGlyZXMgKyBcIjsgcGF0aD0vXCI7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBSZXRyaWV2ZXMgdGhlIGNvb2tpZSBieSBuYW1lLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIHN0cmluZyB8IG5hbWVcclxuIFx0ICogQHJldHVybiBKU09OXHJcblx0ICovXHJcblx0c3RhdGljIGdldChuYW1lKSBcclxuXHR7XHJcblx0ICAgIGlmIChkb2N1bWVudC5jb29raWUubGVuZ3RoID4gMCkge1xyXG5cdCAgICAgICAgbGV0IGNfc3RhcnQgPSBkb2N1bWVudC5jb29raWUuaW5kZXhPZihuYW1lICsgXCI9XCIpO1xyXG5cdCAgICAgICAgXHJcblx0ICAgICAgICBpZiAoY19zdGFydCAhPSAtMSkge1xyXG5cdCAgICAgICAgICAgIGNfc3RhcnQgPSBjX3N0YXJ0ICsgbmFtZS5sZW5ndGggKyAxO1xyXG5cdCAgICAgICAgICAgIGxldCBjX2VuZCA9IGRvY3VtZW50LmNvb2tpZS5pbmRleE9mKFwiO1wiLCBjX3N0YXJ0KTtcclxuXHQgICAgICAgICAgICBcclxuXHQgICAgICAgICAgICBpZiAoY19lbmQgPT0gLTEpIHtcclxuXHQgICAgICAgICAgICAgICAgY19lbmQgPSBkb2N1bWVudC5jb29raWUubGVuZ3RoO1xyXG5cdCAgICAgICAgICAgIH1cclxuXHJcblx0ICAgICAgICAgICAgcmV0dXJuIEpTT04ucGFyc2UodW5lc2NhcGUoZG9jdW1lbnQuY29va2llLnN1YnN0cmluZyhjX3N0YXJ0LCBjX2VuZCkpKTtcclxuXHQgICAgICAgIH1cclxuXHQgICAgfVxyXG5cclxuXHQgICAgcmV0dXJuIHt9O1xyXG5cdH1cclxufVxuXG4vKipcclxuICogQGZpbGUgXHJcbiAqIENhcnQgY2xhc3MuXHJcbiAqXHJcbiAqIEhhbmRsZXMgYWRkaW5nLCByZW1vdmluZyBldGMuLi4gb2YgaXRlbXMuXHJcbiAqL1xyXG5cclxuLyoqXHJcbiAqIFRoZSBkZWZhdWx0IHNldHRpbmdzIG9mIHRoZSBjYXJ0LlxyXG4gKlxyXG4gKiBAdmFyIG9iamVjdFxyXG4gKi9cclxubGV0IGRlZmF1bHRTZXR0aW5ncyQyID0ge1xyXG5cdGVsZW1lbnQ6ICcuY2FydCcsXHJcblx0Y29va2llX25hbWU6ICdjYXJ0JyxcclxuXHRwcmV2aWV3X2NsYXNzOiAnJyxcclxuXHRsb2FkZXI6ICcvaW1hZ2VzL2ljb25zL3NwaW5uZXIuc3ZnJyxcclxuXHRjbGFzczogJycsXHJcblx0d2lkdGg6ICc2MHB4JyxcclxuXHRoZWlnaHQ6ICc2MHB4JyxcclxuXHRwbGFjZW1lbnQ6ICdyaWdodC10b3AnLFxyXG5cdGZpeGVkOiB0cnVlLFxyXG5cdGhvdmVyX2NvbG9yOiAnb3JhbmdlJ1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIFN0b3JlcyB0aGUgY29udGFpbmVyIG9iamVjdC5cclxuICpcclxuICogQHZhciBcXENvcmVcXENvbnRhaW5lclxyXG4gKi9cclxubGV0IENvbnRhaW5lciQyO1xyXG5cclxuLyoqXHJcbiAqIFN0b3JlcyB0aGUgZXZlbnQgbWFuYWdlciBvYmplY3QuXHJcbiAqXHJcbiAqIEB2YXIgXFxDb3JlXFxFdmVudE1hbmFnZXJcclxuICovXHJcbmxldCBFdmVudE1hbmFnZXIkMjtcclxuXHJcbi8qKlxyXG4gKiBTdG9yZXMgdGhlIHJlcXVlc3Qgb2JqZWN0LlxyXG4gKlxyXG4gKiBAdmFyIFxcSGVscGVyc1xcUmVxdWVzdFxyXG4gKi9cclxubGV0IEh0dHA7XHJcblxyXG4vKipcclxuICogU3RvcmVzIHRoZSBjYXJ0IGxvYWRlci5cclxuICpcclxuICogQHZhciBIVE1MRGl2RWxlbWVudFxyXG4gKi9cclxubGV0IGxvYWRpbmdPdmVybGF5O1xyXG5cclxuLyoqXHJcbiAqIFN0b3JlcyB0aGUgaXRlbXMgd3JhcHBlci5cclxuICpcclxuICogQHZhciBIVE1MRGl2RWxlbWVudFxyXG4gKi9cclxubGV0IGl0ZW1zRGl2O1xyXG5cclxuY2xhc3MgQ2FydCBcclxue1xyXG5cdC8qKlxyXG5cdCAqIC0gSW5pdGlhbGl6ZSB0aGUgSW9DIGNvbnRhaW5lclxyXG5cdCAqIC0gSW5pdGlhbGl6ZSB0aGUgUmVxdWVzdFxyXG5cdCAqIC0gSW5pdGlhbGl6ZSB0aGUgRXZlbnRNYW5hZ2VyXHJcblx0ICogLSBDcmVhdGVzIHRoZSBwcmV2aWV3IGFuZCB0aGUgaWNvbiBvZiB0aGUgY2FydC5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSBcXENvcmVcXENvbnRhaW5lciB8IGNvbnRhaW5lclxyXG5cdCAqIEBwYXJhbSBcXEhlbHBlcnNcXFJlcXVlc3QgfCBodHRwXHJcblx0ICogQHBhcmFtIFxcQ29yZVxcRXZlbnRNYW5hZ2VyIHwgZXZlbnRNYW5hZ2VyXHJcblx0ICogQHJldHVybiB2b2lkXHJcblx0ICovXHJcblx0Y29uc3RydWN0b3IoY29udGFpbmVyLCBodHRwLCBldmVudE1hbmFnZXIpIFxyXG5cdHtcclxuXHRcdENvbnRhaW5lciQyID0gY29udGFpbmVyO1xyXG5cdFx0SHR0cCA9IGh0dHA7XHJcblx0XHRFdmVudE1hbmFnZXIkMiA9IGV2ZW50TWFuYWdlcjtcclxuXHRcdFxyXG5cdFx0dGhpcy5wcmV2aWV3RWxlbWVudCA9IHRoaXMuY3JlYXRlUHJldmlld0VsZW1lbnQoKTtcclxuXHRcdHRoaXMuc3ZnSWNvbiA9IGNyZWF0ZUljb24uY2FsbCh0aGlzKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFNldHMgdGhlIG9iamVjdCBieSB0aGUgdXNlcnMgc2V0dGluZy5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSBvYmplY3QgfCBzZXR0aW5nc1xyXG5cdCAqIEByZXR1cm4gdm9pZFxyXG5cdCAqL1xyXG5cdHNldHVwKHNldHRpbmdzKVxyXG5cdHtcclxuXHRcdGlmKHR5cGVvZiBzZXR0aW5ncyAhPSAnb2JqZWN0Jykge1xyXG5cdFx0XHR0aHJvdyBuZXcgSW52YWxpZEFyZ3VtZW50RXhjZXB0aW9uJDE7XHJcblx0XHR9XHJcblxyXG5cdFx0dGhpcy5zZXR0aW5ncyA9IENvbW1vbi5leHRlbmQoZGVmYXVsdFNldHRpbmdzJDIsIHNldHRpbmdzKTtcclxuXHJcblx0XHR0aGlzLnNldEVsZW1lbnQodGhpcy5zZXR0aW5ncy5lbGVtZW50KTtcclxuXHJcblx0XHRET00uYWRkQ2xhc3ModGhpcy5wcmV2aWV3RWxlbWVudCwgJ2Nsb3NlZCcpO1xyXG5cdFx0RE9NLmFkZENsYXNzKHRoaXMucHJldmlld0VsZW1lbnQsIHRoaXMuc2V0dGluZ3MucHJldmlld19jbGFzcyk7XHJcblx0XHRcclxuXHRcdHRoaXMuYmluZEV2ZW50TGlzdGVuZXJzKCk7XHJcblx0XHR0aGlzLmFkZFN0eWxlVGFnKCk7XHJcblxyXG5cdFx0aWYodGhpcy5pc0VtcHR5KENvb2tpZS5nZXQodGhpcy5zZXR0aW5ncy5jb29raWVfbmFtZSkpKSB7XHJcblx0XHRcdHRoaXMuY2FydCA9IHt9O1xyXG5cdFx0XHR0aGlzLnNldENhcnQodGhpcy5jYXJ0KTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIENoZWNrcyBpZiB0aGUgY2FydCBpcyBlbXB0eVxyXG5cdCAqXHJcblx0ICogQHBhcmFtIG9iamVjdCB8IGNhcnRcclxuXHQgKiBAcmV0dXJuIGJvb2xcclxuXHQgKi9cclxuXHRpc0VtcHR5KGNhcnQpXHJcblx0e1xyXG5cdFx0cmV0dXJuIENvbW1vbi5lbXB0eU9iamVjdChjYXJ0KTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEluaXRpYWxpemUvU2V0cyB0aGUgY2FydCBhcyBhIGNvb2tpZS5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSBvYmplY3QgfCBjYXJ0XHJcblx0ICogQHJldHVybiB2b2lkXHJcblx0ICovXHJcblx0c2V0Q2FydChjYXJ0KVxyXG5cdHtcclxuXHRcdHRoaXMuY2FydC5pZCA9IFN0ci5yYW5kb20oMTApO1xyXG5cdFx0dGhpcy5jYXJ0Lml0ZW1zID0gW107XHJcblx0XHR0aGlzLmNhcnQuZmF2b3JpdGVzID0gW107XHJcblx0XHRDb29raWUuc2V0KHRoaXMuc2V0dGluZ3MuY29va2llX25hbWUsIGNhcnQsIDIpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQWRkcyBhbiBpdGVtIHRvIHRoZSBjYXJ0LlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIG9iamVjdCB8IGl0ZW1cclxuXHQgKiBAcmV0dXJuIHZvaWRcclxuXHQgKi9cclxuXHRhZGRJdGVtKGl0ZW0pXHJcblx0e1xyXG5cdFx0dGhpcy5jYXJ0ID0gQ29va2llLmdldCh0aGlzLnNldHRpbmdzLmNvb2tpZV9uYW1lKTtcclxuXHJcblx0XHR0aGlzLmNhcnQuaXRlbXMucHVzaChpdGVtKTtcclxuXHJcblx0XHRDb29raWUuc2V0KHRoaXMuc2V0dGluZ3MuY29va2llX25hbWUsIHRoaXMuY2FydCwgMik7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBSZW1vdmVzIGFuIGl0ZW0gZnJvbSB0aGUgY2FydC5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSBvYmplY3QgfCBpdGVtXHJcblx0ICogQHJldHVybiB2b2lkXHJcblx0ICovXHJcblx0cmVtb3ZlSXRlbShpdGVtKVxyXG5cdHtcclxuIFx0XHR0aGlzLmNhcnQgPSBDb29raWUuZ2V0KHRoaXMuc2V0dGluZ3MuY29va2llX25hbWUpO1xyXG5cclxuIFx0XHR0aGlzLmNhcnQuaXRlbXMuc3BsaWNlKHRoaXMuY2FydC5pdGVtcy5pbmRleE9mKGl0ZW0pLCAxKTtcclxuXHJcbiBcdFx0Q29va2llLnNldCh0aGlzLnNldHRpbmdzLmNvb2tpZV9uYW1lLCB0aGlzLmNhcnQsIDIpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQWRkcyB0aGUgaXRlbSB0byBwcmV2aWV3LlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIGFycmF5IHwgaXRlbXNcclxuXHQgKiBAcmV0dXJuIHZvaWRcclxuXHQgKi9cclxuXHRhZGRUb1ByZXZpZXcoaXRlbXMpXHJcblx0e1xyXG5cdFx0aXRlbXNEaXYuaW5uZXJIVE1MID0gJyc7XHJcblxyXG5cdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCBpdGVtcy5sZW5ndGg7IGkrKykge1xyXG5cclxuXHRcdFx0bGV0IGxpID0gRE9NLmNyZWF0ZUVsZW1lbnQoJ2xpJywge1xyXG5cdFx0XHRcdFx0Y2xhc3M6ICdpdGVtJ1xyXG5cdFx0XHRcdH0pO1xyXG5cclxuXHRcdFx0bGV0IGF0dHJpYnV0ZXMgPSBpdGVtc1tpXTtcclxuXHJcblx0XHRcdGZvcihsZXQgYXR0cmlidXRlIGluIGF0dHJpYnV0ZXMpIHtcclxuXHRcdFx0XHRsZXQgc3BhbiA9IERPTS5jcmVhdGVFbGVtZW50KCdzcGFuJywge1xyXG5cdFx0XHRcdFx0dGV4dDogYXR0cmlidXRlc1thdHRyaWJ1dGVdXHJcblx0XHRcdFx0fSk7XHJcblxyXG5cdFx0XHRcdGxpLmFwcGVuZENoaWxkKHNwYW4pO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRpdGVtc0Rpdi5hcHBlbmRDaGlsZChsaSk7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBCaW5kcyBldmVydGhpbmcgdG8gdGhlIGVsZW1lbnQuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gc3RyaW5nIHwgc2VsZWN0b3JcclxuXHQgKiBAcmV0dXJuIHZvaWRcclxuXHQgKi9cclxuXHRzZXRFbGVtZW50KHNlbGVjdG9yKVxyXG5cdHtcclxuXHRcdHRoaXMuaWNvbiA9IERPTS5maW5kKHNlbGVjdG9yKTtcclxuXHJcblx0XHRpZiAodGhpcy5pY29uKSB7XHJcblx0XHRcdERPTS5hZGRDbGFzcyh0aGlzLmljb24sIHRoaXMuc2V0dGluZ3MuY2xhc3MpO1xyXG5cdFx0XHRET00uYWRkQ2xhc3ModGhpcy5pY29uLCB0aGlzLnNldHRpbmdzLnBsYWNlbWVudCk7XHJcblx0XHRcdHRoaXMuaWNvbi5hcHBlbmRDaGlsZCh0aGlzLnN2Z0ljb24pO1xyXG5cdFx0XHR0aGlzLmljb24uYXBwZW5kQ2hpbGQodGhpcy5wcmV2aWV3RWxlbWVudCk7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBDcmVhdGVzIHRoZSBjYXJ0IGRldGFpbHMgcHJldmlldyBlbGVtZW50LlxyXG5cdCAqXHJcblx0ICogQHJldHVybiBIVE1MRGl2RWxlbWVudFxyXG5cdCAqL1xyXG5cdGNyZWF0ZVByZXZpZXdFbGVtZW50KClcclxuXHR7XHJcblx0XHRsZXQgcHJldmlld0VsZW1lbnQgPSBET00uY3JlYXRlRWxlbWVudCgnZGl2Jywge1xyXG5cdFx0XHRpZDogJ3ByZXZpZXcnXHJcblx0XHR9KTtcclxuXHJcblx0XHRpdGVtc0RpdiA9IERPTS5jcmVhdGVFbGVtZW50KCd1bCcsIHtcclxuXHRcdFx0XHRjbGFzczogJ2l0ZW1zJ1xyXG5cdFx0XHR9KTtcclxuXHJcblx0XHRwcmV2aWV3RWxlbWVudC5hcHBlbmRDaGlsZChpdGVtc0Rpdik7XHJcblxyXG5cdFx0cmV0dXJuIHByZXZpZXdFbGVtZW50O1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQWRkIHRoZSBlQ29tbWVyY2Ugc3R5bGUgdGFncyB0byB0aGUgRE9NLlxyXG5cdCAqXHJcblx0ICogQHJldHVybiB2b2lkXHJcblx0ICovXHJcblx0YWRkU3R5bGVUYWcoKSBcclxuXHR7XHJcblx0XHRpZihET00uZmluZCgnI2VDb21tZXJjZS1DYXJ0JykpIHtcclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0fVxyXG5cclxuXHRcdGxldCBwb3NpdGlvbiA9ICh0aGlzLnNldHRpbmdzLmZpeGVkKSA/ICdmaXhlZCcgOiAnYWJzb2x1dGUnO1xyXG5cclxuXHRcdGxldCBjc3MgPSBgXHJcblx0XHRcdCR7dGhpcy5zZXR0aW5ncy5lbGVtZW50fSB7XHJcblx0XHRcdFx0cG9zaXRpb246ICR7cG9zaXRpb259O1xyXG5cdFx0XHRcdGN1cnNvcjogcG9pbnRlcjtcclxuXHRcdFx0XHRjb2xvcjogI2ZmZmZmZjtcclxuXHRcdFx0XHR6LWluZGV4OiA5OTg7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdCR7dGhpcy5zZXR0aW5ncy5lbGVtZW50fSA+IHN2ZyB7XHJcblx0XHRcdFx0d2lkdGg6ICR7dGhpcy5zZXR0aW5ncy53aWR0aH07XHJcblx0XHRcdFx0aGVpZ2h0OiAke3RoaXMuc2V0dGluZ3MuaGVpZ2h0fTtcclxuXHRcdFx0XHR0cmFuc2l0aW9uOiBmaWxsIDAuM3M7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdCR7dGhpcy5zZXR0aW5ncy5lbGVtZW50fSA+IHN2Zzpob3ZlciB7XHJcblx0XHRcdFx0ZmlsbDogJHt0aGlzLnNldHRpbmdzLmhvdmVyX2NvbG9yfTtcclxuXHRcdFx0XHR0cmFuc2l0aW9uOiBmaWxsIDAuM3M7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdCR7dGhpcy5zZXR0aW5ncy5lbGVtZW50fS50b3AtcmlnaHQsXHJcblx0XHRcdCR7dGhpcy5zZXR0aW5ncy5lbGVtZW50fS5yaWdodC10b3Age1xyXG5cdFx0XHRcdHJpZ2h0OiAxMHB4O1xyXG5cdFx0XHRcdHRvcDogMTBweDtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0JHt0aGlzLnNldHRpbmdzLmVsZW1lbnR9LmxlZnQtdG9wLFxyXG5cdFx0XHQke3RoaXMuc2V0dGluZ3MuZWxlbWVudH0udG9wLWxlZnQge1xyXG5cdFx0XHRcdGxlZnQ6IDEwcHg7XHJcblx0XHRcdFx0dG9wOiAxMHB4O1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHQke3RoaXMuc2V0dGluZ3MuZWxlbWVudH0gPiAjcHJldmlldyB7XHJcblx0XHRcdFx0cG9zaXRpb246ICR7cG9zaXRpb259O1xyXG5cdFx0XHRcdHotaW5kZXg6IDk5OTk7XHJcblx0XHRcdFx0dG9wOiBjYWxjKDEwcHggKyAke3RoaXMuc2V0dGluZ3MuaGVpZ2h0fSk7XHJcblx0XHRcdFx0dHJhbnNmb3JtOiB0cmFuc2xhdGVYKDYwcHgpO1xyXG5cdFx0XHRcdGhlaWdodDogNDAwcHg7XHJcblx0XHRcdFx0d2lkdGg6IDMwMHB4O1xyXG5cdFx0XHRcdGJvcmRlcjogMXB4IHNvbGlkICNlNGU0ZTQ7XHJcblx0XHRcdFx0YmFja2dyb3VuZDogI2ZmZmZmZjtcclxuXHRcdFx0XHR0cmFuc2l0aW9uOiB0cmFuc2Zvcm0gMXMsIHZpc2liaWxpdHkgMXM7XHJcblx0XHRcdFx0Y3Vyc29yOiBkZWZhdWx0O1xyXG5cdFx0XHRcdG92ZXJmbG93LVk6IHNjcm9sbDtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0JHt0aGlzLnNldHRpbmdzLmVsZW1lbnR9ID4gI3ByZXZpZXcub3BlbmVkIHtcclxuXHRcdFx0XHR2aXNpYmlsaXR5OiB2aXNpYmxlO1xyXG5cdFx0XHRcdHRyYW5zZm9ybTogdHJhbnNsYXRlWCgtMjQwcHgpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHQke3RoaXMuc2V0dGluZ3MuZWxlbWVudH0gPiAjcHJldmlldy5jbG9zZWQge1xyXG5cdFx0XHRcdHZpc2liaWxpdHk6IGhpZGRlbjtcclxuXHRcdFx0XHR0cmFuc2Zvcm06IHRyYW5zbGF0ZVgoNjBweCk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdCR7dGhpcy5zZXR0aW5ncy5lbGVtZW50fSA+ICNwcmV2aWV3ID4gdWwuaXRlbXMsXHJcblx0XHRcdCR7dGhpcy5zZXR0aW5ncy5lbGVtZW50fSA+ICNwcmV2aWV3ID4gdWwuaXRlbXMgPiBsaS5pdGVtIHtcclxuXHRcdFx0XHRjb2xvcjogIzAwMDAwMDtcclxuXHRcdFx0XHRsaXN0LXN0eWxlLXR5cGU6IG5vbmU7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdCR7dGhpcy5zZXR0aW5ncy5lbGVtZW50fSAuaXRlbXMubG9hZGluZyB7XHJcblx0XHRcdFx0ZGlzcGxheTogbm9uZTtcclxuXHRcdFx0XHRvdmVyZmxvdy1ZOiBub25lO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHQke3RoaXMuc2V0dGluZ3MuZWxlbWVudH0gLmNhcnQtbG9hZGVyLW92ZXJsYXkge1xyXG5cdFx0XHRcdHBvc2l0aW9uOiBmaXhlZDtcclxuXHRcdFx0XHR0b3A6IDA7IFxyXG5cdFx0XHQgICAgbGVmdDogMDtcclxuXHRcdFx0ICAgIHJpZ2h0OiAwO1xyXG5cdFx0XHQgICAgYm90dG9tOiAwO1xyXG5cdFx0XHRcdGJhY2tncm91bmQ6ICNmZmZmZmY7XHJcblx0XHRcdFx0d2lkdGg6IDEwMCU7XHJcblx0XHRcdFx0aGVpZ2h0OiAxMDAlO1xyXG5cdFx0XHRcdG1pbi1oZWlnaHQ6IDEwMCU7XHJcblx0XHRcdFx0b3ZlcmZsb3c6IGF1dG87XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdCR7dGhpcy5zZXR0aW5ncy5lbGVtZW50fSAuY2FydC1sb2FkZXItb3ZlcmxheSAuY2FydC1sb2FkZXIge1xyXG5cdFx0XHRcdHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuXHRcdFx0XHR3aWR0aDogNTBweDtcclxuXHRcdFx0XHRoZWlnaHQ6IDUwcHg7XHJcblx0XHRcdFx0bWFyZ2luLWxlZnQ6IC0yNXB4O1xyXG5cdFx0XHRcdG1hcmdpbi10b3A6IC0yNXB4O1xyXG5cdFx0XHRcdGxlZnQ6IDUwJTtcclxuXHRcdFx0XHRyaWdodDogNTAlO1xyXG5cdFx0XHRcdHRvcDogNTAlO1xyXG5cdFx0XHRcdGJvdHRvbTogNTAlO1xyXG5cdFx0XHR9XHJcblx0XHRgO1xyXG5cdCAgICBcclxuXHQgICAgRE9NLmFkZFN0eWxlKCdUdXJiby1lQ29tbWVyY2UtQ2FydCcsIGNzcyk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBDcmVhdGVzIGFuIGxvYWRpbmcgb3ZlcmxheS5cclxuXHQgKlxyXG5cdCAqIEByZXR1cm4gSFRNTERpdkVsZW1lbnRcclxuXHQgKi9cclxuXHRsb2FkaW5nT3ZlcmxheSgpXHJcblx0e1xyXG5cdFx0aWYgKGxvYWRpbmdPdmVybGF5KSB7XHJcblx0XHRcdHJldHVybiBsb2FkaW5nT3ZlcmxheTtcclxuXHRcdH1cclxuXHJcblx0XHRsZXQgbG9hZGVyID0gRE9NLmNyZWF0ZUVsZW1lbnQoJ2ltZycsIHtcclxuXHRcdFx0c3JjOiB0aGlzLnNldHRpbmdzLmxvYWRlcixcclxuXHRcdFx0Y2xhc3M6ICdjYXJ0LWxvYWRlcidcclxuXHRcdH0pO1xyXG5cclxuXHRcdGxvYWRpbmdPdmVybGF5ID0gRE9NLmNyZWF0ZUVsZW1lbnQoJ2RpdicsIHtcclxuXHRcdFx0Y2xhc3M6ICdjYXJ0LWxvYWRlci1vdmVybGF5J1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0bG9hZGluZ092ZXJsYXkuYXBwZW5kQ2hpbGQobG9hZGVyKTtcclxuXHJcblx0XHRyZXR1cm4gbG9hZGluZ092ZXJsYXk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBMb2FkaW5nIHRoZSBjYXJ0IHByZXZpZXcuXHJcblx0ICpcclxuXHQgKiBAcmV0dXJuIHZvaWRcclxuXHQgKi9cclxuXHRwcmV2aWV3U3RhcnRMb2FkaW5nKClcclxuXHR7XHJcblx0XHRET00uYWRkQ2xhc3MoaXRlbXNEaXYsICdsb2FkaW5nJyk7XHJcblx0XHR0aGlzLnByZXZpZXdFbGVtZW50LmFwcGVuZENoaWxkKHRoaXMubG9hZGluZ092ZXJsYXkoKSk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBMb2FkaW5nIHRoZSBjYXJ0IHByZXZpZXcuXHJcblx0ICpcclxuXHQgKiBAcmV0dXJuIHZvaWRcclxuXHQgKi9cclxuXHRwcmV2aWV3U3RvcExvYWRpbmcoKVxyXG5cdHtcclxuXHRcdGlmIChET00uZmluZCgnLmNhcnQtbG9hZGVyLW92ZXJsYXknLCB0aGlzLnByZXZpZXdFbGVtZW50KSkge1xyXG5cdFx0XHR0aGlzLnByZXZpZXdFbGVtZW50LnJlbW92ZUNoaWxkKHRoaXMubG9hZGluZ092ZXJsYXkoKSk7XHJcblx0XHRcdERPTS5yZW1vdmVDbGFzcyhpdGVtc0RpdiwgJ2xvYWRpbmcnKTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFJlbG9hZHMgdGhlIGl0ZW1zIGluIHRoZSBjYXJ0IHByZXZpZXcuXHJcblx0ICpcclxuXHQgKiBAcmV0dXJuIHZvaWRcclxuXHQgKi9cclxuXHRyZWxvYWRDYXJ0UHJldmlldygpXHJcblx0e1xyXG5cdFx0dGhpcy5wcmV2aWV3U3RhcnRMb2FkaW5nKCk7XHJcblx0XHRsZXQgaXRlbXMgPSB0aGlzLmdldENhcnRJdGVtcygpO1xyXG5cdFx0dGhpcy5hZGRUb1ByZXZpZXcoaXRlbXMpO1xyXG5cdFx0XHJcblx0XHRsZXQgaW5zdGFuY2UgPSB0aGlzO1xyXG5cclxuXHRcdHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XHJcblx0XHRcdGluc3RhbmNlLnByZXZpZXdTdG9wTG9hZGluZy5jYWxsKGluc3RhbmNlKTtcclxuXHRcdH0sIDEwMDApO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQmluZHMgZXZlbnQgbGlzdGVuZXJzIHRvIHRoZSBjYXJ0IGljb24uXHJcblx0ICpcclxuXHQgKiBAcmV0dXJuIHZvaWRcclxuXHQgKi9cclxuXHRiaW5kRXZlbnRMaXN0ZW5lcnMoKVxyXG5cdHtcclxuXHRcdGlmKHRoaXMuc3ZnSWNvbiA9PSBudWxsKSB7XHJcblx0XHRcdHJldHVybjtcclxuXHRcdH1cclxuXHJcblx0XHR0aGlzLnN2Z0ljb24ub25jbGljayA9IGZ1bmN0aW9uKGUpIHtcclxuXHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdFx0XHRsZXQgb3BlbmluZyA9IERPTS50b2dnbGVDbGFzcyh0aGlzLnByZXZpZXdFbGVtZW50LCAnb3BlbmVkJywgJ2Nsb3NlZCcpO1xyXG5cdFx0XHRcclxuXHRcdFx0aWYgKG9wZW5pbmcpIHtcclxuXHRcdFx0XHR0aGlzLnJlbG9hZENhcnRQcmV2aWV3KCk7XHRcclxuXHRcdFx0fVxyXG5cdFx0fS5iaW5kKHRoaXMpO1xyXG5cdFx0XHJcblx0XHRFdmVudE1hbmFnZXIkMi5zdWJzY3JpYmUoJ2NhcnQucHJvZHVjdHMuYWRkZWQnLCBmdW5jdGlvbihhdHRyaWJ1dGVzKSB7XHJcblx0XHRcdGxldCBjYXJ0ID0gQ29va2llLmdldCh0aGlzLnNldHRpbmdzLmNvb2tpZV9uYW1lKTtcclxuXHRcdFx0Y2FydC5pdGVtcy5wdXNoKGF0dHJpYnV0ZXMpO1xyXG5cdFx0XHRDb29raWUuc2V0KHRoaXMuc2V0dGluZ3MuY29va2llX25hbWUsIGNhcnQpO1xyXG5cdFx0XHR0aGlzLnJlbG9hZENhcnRQcmV2aWV3KCk7XHJcblx0XHR9LmJpbmQodGhpcykpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogUmV0cmlldmUgdGhlIGNhcnRzIGl0ZW1zIGZyb20gdGhlIGNvb2tpZS5cclxuXHQgKlxyXG5cdCAqIEByZXR1cm4gb2JqZWN0XHJcblx0ICovXHJcblx0Z2V0Q2FydEl0ZW1zKClcclxuXHR7XHJcblx0XHRsZXQgY2FydCA9IENvb2tpZS5nZXQodGhpcy5zZXR0aW5ncy5jb29raWVfbmFtZSk7XHJcblxyXG5cdFx0cmV0dXJuIChjYXJ0KSA/IGNhcnQuaXRlbXMgOiBbXTtcclxuXHR9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBDbG9zZXMgdGhlIGNhcnQgcHJldmlldyBlbGVtZW50LlxyXG4gKlxyXG4gKiBAcGFyYW0gZXZlbnQuY2xpY2tcclxuICovXHJcbmZ1bmN0aW9uIGNsb3NlKGV2ZW50KSB7XHJcblx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuXHRET00uc3dpdGNoQ2xhc3Nlcyh0aGlzLnByZXZpZXdFbGVtZW50LCAnb3BlbmVkJywgJ2Nsb3NlZCcpO1xyXG59XHJcblxyXG4vKipcclxuICogQ3JlYXRlcyB0aGUgY2FydCBzdmcgaWNvbi5cclxuICpcclxuICogQHJldHVybiBTVkdTVkdFbGVtZW50XHJcbiAqL1xyXG5mdW5jdGlvbiBjcmVhdGVJY29uKCkge1xyXG5cdGxldCBzdmcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50TlMoXCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiLCBcInN2Z1wiKTtcclxuXHRsZXQgZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnROUyhcImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIsIFwiZ1wiKTtcclxuXHRsZXQgcGF0aCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnROUyhcImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIsIFwicGF0aFwiKTtcclxuXHJcblx0c3ZnLnNldEF0dHJpYnV0ZSgndmVyc2lvbicsICcxLjEnKTtcclxuXHRzdmcuc2V0QXR0cmlidXRlKCd4bWxucycsICdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZycpO1xyXG5cdHN2Zy5zZXRBdHRyaWJ1dGUoJ3htbG5zOnhsaW5rJywgJ2h0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsnKTtcclxuXHRzdmcuc2V0QXR0cmlidXRlKCd4JywgJzBweCcpO1xyXG5cdHN2Zy5zZXRBdHRyaWJ1dGUoJ3knLCAnMHB4Jyk7XHJcblx0c3ZnLnNldEF0dHJpYnV0ZSgnd2lkdGgnLCAnNDQ2Ljg0M3B4Jyk7XHJcblx0c3ZnLnNldEF0dHJpYnV0ZSgnaGVpZ2h0JywgJzQ0Ni44NDNweCcpO1xyXG5cdHN2Zy5zZXRBdHRyaWJ1dGUoJ3ZpZXdCb3gnLCAnMCAwIDQ0Ni44NDMgNDQ2Ljg0MycpO1xyXG5cdHN2Zy5zZXRBdHRyaWJ1dGUoJ3N0eWxlJywgJ2VuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgNDQ2Ljg0MyA0NDYuODQzOycpO1xyXG5cdHN2Zy5zZXRBdHRyaWJ1dGUoJ3htbDpzcGFjZScsICdwcmVzZXJ2ZScpO1xyXG5cclxuXHRwYXRoLnNldEF0dHJpYnV0ZSgnZCcsICdNNDQ0LjA5LDkzLjEwM2MtMi42OTgtMy42OTktNy4wMDYtNS44ODgtMTEuNTg0LTUuODg4SDEwOS45MmMtMC42MjUsMC0xLjI0OSwwLjAzOC0xLjg1LDAuMTE5bC0xMy4yNzYtMzguMjdjLTEuMzc2LTMuOTU4LTQuNDA2LTcuMTEzLTguMy04LjY0NkwxOS41ODYsMTQuMTM0Yy03LjM3NC0yLjg4Ny0xNS42OTUsMC43MzUtMTguNTkxLDguMWMtMi44OTEsNy4zNjksMC43MywxNS42OTUsOC4xLDE4LjU5MWw2MC43NjgsMjMuODcybDc0LjM4MSwyMTQuMzk5Yy0zLjI4MywxLjE0NC02LjA2NSwzLjY2My03LjMzMiw3LjE4N2wtMjEuNTA2LDU5LjczOWMtMS4zMTgsMy42NjMtMC43NzUsNy43MzMsMS40NjgsMTAuOTE2YzIuMjQsMy4xODMsNS44ODMsNS4wNzgsOS43NzMsNS4wNzhoMTEuMDQ0Yy02Ljg0NCw3LjYxNi0xMS4wNDQsMTcuNjQ2LTExLjA0NCwyOC42NzVjMCwyMy43MTgsMTkuMjk4LDQzLjAxMiw0My4wMTIsNDMuMDEyczQzLjAxMi0xOS4yOTQsNDMuMDEyLTQzLjAxMmMwLTExLjAyOS00LjItMjEuMDU5LTExLjA0NC0yOC42NzVoOTMuNzc2Yy02Ljg0Nyw3LjYxNi0xMS4wNDgsMTcuNjQ2LTExLjA0OCwyOC42NzVjMCwyMy43MTgsMTkuMjk0LDQzLjAxMiw0My4wMTMsNDMuMDEyYzIzLjcxOCwwLDQzLjAxMi0xOS4yOTQsNDMuMDEyLTQzLjAxMmMwLTExLjAyOS00LjItMjEuMDU5LTExLjA0My0yOC42NzVoMTMuNDMzYzYuNTk5LDAsMTEuOTQ3LTUuMzQ5LDExLjk0Ny0xMS45NDhjMC02LjU5OS01LjM0OS0xMS45NDctMTEuOTQ3LTExLjk0N0gxNDMuNjQ3bDEzLjMxOS0zNi45OTZjMS43MiwwLjcyNCwzLjU3OCwxLjE1Miw1LjUyMywxLjE1MmgyMTAuMjc4YzYuMjM0LDAsMTEuNzUxLTQuMDI3LDEzLjY1LTkuOTU5bDU5LjczOS0xODYuMzg3QzQ0Ny41NTcsMTAxLjU2Nyw0NDYuNzg4LDk2LjgwMiw0NDQuMDksOTMuMTAzeiBNMTY5LjY1OSw0MDkuODA3Yy0xMC41NDMsMC0xOS4xMTYtOC41NzMtMTkuMTE2LTE5LjExNnM4LjU3My0xOS4xMTcsMTkuMTE2LTE5LjExN3MxOS4xMTYsOC41NzQsMTkuMTE2LDE5LjExN1MxODAuMjAyLDQwOS44MDcsMTY5LjY1OSw0MDkuODA3eiBNMzI3LjM2Nyw0MDkuODA3Yy0xMC41NDMsMC0xOS4xMTctOC41NzMtMTkuMTE3LTE5LjExNnM4LjU3NC0xOS4xMTcsMTkuMTE3LTE5LjExN2MxMC41NDIsMCwxOS4xMTYsOC41NzQsMTkuMTE2LDE5LjExN1MzMzcuOTA5LDQwOS44MDcsMzI3LjM2Nyw0MDkuODA3eiBNNDAyLjUyLDE0OC4xNDloLTczLjE2MVYxMTUuODloODMuNDk5TDQwMi41MiwxNDguMTQ5eiBNMzgxLjQ1MywyMTMuODYxaC01Mi4wOTR2LTM3LjAzOGg2My45NjdMMzgxLjQ1MywyMTMuODYxeiBNMjM0LjU3MSwyMTMuODYxdi0zNy4wMzhoNjYuMTEzdjM3LjAzOEgyMzQuNTcxeiBNMzAwLjY4NCwyNDIuNTM4djMxLjA2NGgtNjYuMTEzdi0zMS4wNjRIMzAwLjY4NHogTTEzOS4xMTUsMTc2LjgyM2g2Ni43ODR2MzcuMDM4aC01My45MzNMMTM5LjExNSwxNzYuODIzeiBNMjM0LjU3MSwxNDguMTQ5VjExNS44OWg2Ni4xMTN2MzIuMjU5SDIzNC41NzF6IE0yMDUuODk4LDExNS44OXYzMi4yNTloLTc2LjczNGwtMTEuMTkxLTMyLjI1OUgyMDUuODk4eiBNMTYxLjkxNiwyNDIuNTM4aDQzLjk4MnYzMS4wNjRoLTMzLjIwNkwxNjEuOTE2LDI0Mi41Mzh6IE0zMjkuMzU5LDI3My42MDN2LTMxLjA2NGg0Mi45MDlsLTkuOTU1LDMxLjA2NEgzMjkuMzU5eicpO1xyXG5cclxuXHRnLmFwcGVuZENoaWxkKHBhdGgpO1xyXG5cdHN2Zy5hcHBlbmRDaGlsZChnKTtcclxuXHJcblx0cmV0dXJuIHN2ZztcclxufVxuXG4vKipcclxuICogQGZpbGUgXHJcbiAqIEZpbHRlciBjbGFzcy5cclxuICpcclxuICogVGhlIEZpbHRlciBPYmplY3QsIGhhbmRsZXMgdGhlIGZpbHRlciBvZiB0aGUgcHJvZHVjdHMvc2VydmljZXMuXHJcbiAqL1xyXG5cclxuLyoqXHJcbiAqIFRoZSBkZWZhdWx0IHNldHRpbmdzIG9mIHRoZSBmaWx0ZXIuXHJcbiAqL1xyXG5sZXQgZGVmYXVsdFNldHRpbmdzJDMgPSB7XHJcblx0ZWxlbWVudDogJy5maWx0ZXInLFxyXG5cdGNsYXNzOiAnJyxcclxuXHR3aWR0aDogJycsXHJcblx0aGVpZ2h0OiAnJyxcclxufTtcclxuXHJcbi8qKlxyXG4gKiBTdG9yZXMgdGhlIGNvbnRhaW5lciBvYmplY3QuXHJcbiAqXHJcbiAqIEB2YXIgXFxDb3JlXFxDb250YWluZXJcclxuICovXHJcbmxldCBDb250YWluZXIkMztcclxuXHJcbmNsYXNzIEZpbHRlciBcclxue1xyXG5cdC8qKlxyXG5cdCAqIC0gSW5pdGlhbGl6ZSB0aGUgSW9DIGNvbnRhaW5lci5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSBcXENvcmVcXENvbnRhaW5lciB8IGNvbnRhaW5lclxyXG5cdCAqIEByZXR1cm4gdm9pZFxyXG5cdCAqL1xyXG5cdGNvbnN0cnVjdG9yKGNvbnRhaW5lcikgXHJcblx0e1xyXG5cdFx0Q29udGFpbmVyJDMgPSBjb250YWluZXI7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBTZXR1cCB0aGUgZmlsdGVyIGNsYXNzLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIG9iamVjdCB8IHNldHRpbmdzXHJcblx0ICogQHJldHVybiB2b2lkXHJcblx0ICovXHJcblx0c2V0dXAoc2V0dGluZ3MpXHJcblx0e1xyXG5cdFx0aWYodHlwZW9mIHNldHRpbmdzICE9ICdvYmplY3QnKSB7XHJcblx0XHRcdHRocm93IG5ldyBJbnZhbGlkQXJndW1lbnRFeGNlcHRpb24kMTtcclxuXHRcdH1cclxuXHJcblx0XHR0aGlzLnNldHRpbmdzID0gQ29tbW9uLmV4dGVuZChkZWZhdWx0U2V0dGluZ3MkMywgc2V0dGluZ3MpO1xyXG5cclxuXHRcdGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCBmdW5jdGlvbigpIHtcclxuXHJcblx0XHRcdHRoaXMuc2V0RWxlbWVudCh0aGlzLnNldHRpbmdzLmVsZW1lbnQpO1xyXG5cclxuXHRcdFx0dGhpcy5hZGRTdHlsZVRhZygpO1x0XHJcblx0XHR9LmJpbmQodGhpcykpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogU2V0cyB0aGUgZWxlbWVudCB0byBiZSBib3VuZCB0by5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSBzdHJpbmcgfCBzZWxlY3RvclxyXG5cdCAqIEByZXR1cm4gdm9pZFxyXG5cdCAqL1xyXG5cdHNldEVsZW1lbnQoc2VsZWN0b3IpXHJcblx0e1xyXG5cdFx0dGhpcy53cmFwcGVyID0gRE9NLmZpbmQoc2VsZWN0b3IpO1xyXG5cdFx0XHJcblx0XHRET00uYWRkQ2xhc3ModGhpcy53cmFwcGVyLCB0aGlzLnNldHRpbmdzLmNsYXNzKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEFkZCB0aGUgZUNvbW1lcmNlIHN0eWxlIHRhZ3MgdG8gdGhlIERPTS5cclxuXHQgKi9cclxuXHRhZGRTdHlsZVRhZygpIFxyXG5cdHtcclxuXHRcdGlmIChET00uZmluZCgnI1R1cmJvLWVDb21tZXJjZS1GaWx0ZXInKSkge1xyXG5cdFx0XHRyZXR1cm47XHJcblx0XHR9XHJcblxyXG5cdFx0bGV0IHdpZHRoID0gKHRoaXMuc2V0dGluZ3Mud2lkdGgpID8gJ3dpZHRoOicgKyB0aGlzLnNldHRpbmdzLndpZHRoICsgJzsnIDogJyc7XHJcblx0XHRsZXQgbWluV2lkdGggPSB0aGlzLnNldHRpbmdzLm1pbl93aWR0aCB8fCAnMjAwcHgnO1xyXG5cdFx0bGV0IGhlaWdodCA9IHRoaXMuc2V0dGluZ3MuaGVpZ2h0IHx8ICdhdXRvJztcclxuXHJcblx0XHRsZXQgY3NzID0gYFxyXG5cdFx0XHQke3RoaXMuc2V0dGluZ3MuZWxlbWVudH0ge1xyXG5cdFx0XHRcdHBvc2l0aW9uOiByZWxhdGl2ZTtcclxuXHRcdFx0XHRtYXJnaW46IDVweCA1cHg7XHJcblx0XHRcdFx0Ym9yZGVyOiAxcHggc29saWQgI2U0ZTRlNDtcclxuXHRcdFx0XHQke3dpZHRofVxyXG5cdFx0XHRcdG1pbi13aWR0aDogJHttaW5XaWR0aH07XHJcblx0XHRcdFx0aGVpZ2h0OiAke2hlaWdodH07XHJcblx0XHRcdFx0bWluLWhlaWdodDogMjAwcHg7XHJcblx0XHRcdFx0Y29sb3I6ICNmZmZmZmY7XHJcblx0XHRcdFx0b3ZlcmZsb3c6IGhpZGRlbjtcclxuXHRcdFx0fVxyXG5cclxuXHRcdGA7XHJcblx0ICAgIFxyXG5cdCAgICBET00uYWRkU3R5bGUoJ1R1cmJvLWVDb21tZXJjZS1GaWx0ZXInLCBjc3MpO1xyXG5cdH1cclxufVxuXG4vKipcclxuICogQGZpbGUgXHJcbiAqIFByb2R1Y3RzIGNsYXNzLlxyXG4gKlxyXG4gKiBUaGUgUHJvZHVjdHMgY29tcG9uZW50LCBoYW5kbGVzIHRoZSBwcm9kdWN0cyB0YXNrcy5cclxuICovXHJcblxyXG5cclxuLyoqXHJcbiAqIFRoZSBkZWZhdWx0IHNldHRpbmdzIG9mIGVhY2ggcHJvZHVjdC5cclxuICpcclxuICogQHZhciBvYmplY3RcclxuICovXHJcbmxldCBkZWZhdWx0U2V0dGluZ3MkNCA9IHtcclxuXHRlbGVtZW50OiAnLnByb2R1Y3RzJyxcclxuXHRjbGFzczogJycsXHJcblx0aXRlbV9jbGFzczogJycsXHJcblx0YWRkX2J1dHRvbl9jbGFzczogJ2J0biBidG4tcHJpbWFyeScsXHJcblx0ZmF2b3JpdGVfYnV0dG9uX2NsYXNzOiAnYnRuIGJ0bi1kYW5nZXInLFxyXG5cdHdpZHRoOiAnMjAwcHgnLFxyXG5cdGhlaWdodDogJzI1MHB4JyxcclxuXHRhdHRyaWJ1dGVzOiBbJ25hbWUnLCAncHJpY2UnLCAnZGVsaXZlcnlUaW1lJywgJ2ltYWdlJ10sXHJcblx0dXJsOiAncHJvZHVjdHMucGhwJyxcclxufTtcclxuXHJcbi8qKlxyXG4gKiBTdG9yZXMgdGhlIGNvbnRhaW5lciBvYmplY3QuXHJcbiAqIFxyXG4gKiBAdmFyIFxcQ29yZVxcQ29udGFpbmVyXHJcbiAqL1xyXG5sZXQgQ29udGFpbmVyJDQ7XHJcblxyXG4vKipcclxuICogU3RvcmVzIHRoZSBjb250YWluZXIgb2JqZWN0LlxyXG4gKiBcclxuICogQHZhciBcXENvcmVcXEV2ZW50TWFuYWdlclxyXG4gKi9cclxubGV0IEV2ZW50TWFuYWdlciQzO1xyXG5cclxuLyoqXHJcbiAqIFN0b3JlcyB0aGUgcmVxdWVzdCBvYmplY3QuXHJcbiAqIFxyXG4gKiBAdmFyIFxcSGVscGVyXFxSZXF1ZXN0IFxyXG4gKi9cclxubGV0IEh0dHAkMTtcclxuXHJcbi8qKlxyXG4gKiBTdG9yZXMgdGhlIGNodW5rZWQgcGVyIFxyXG4gKiBwYWdlIHByb2R1Y3RzLlxyXG4gKiBcclxuICogQHZhciBhcnJheVxyXG4gKi9cclxubGV0IGNodW5rZWRQcm9kdWN0cztcclxuXHJcbmNsYXNzIFByb2R1Y3RzIFxyXG57XHJcblx0LyoqXHJcblx0ICogSW5pdGFsaXplIHRoZSBDb250YWluZXIuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gXFxDb3JlXFxDb250YWluZXIgfCBjb250YWluZXJcclxuXHQgKiBAcGFyYW0gXFxIZWxwZXJzXFxSZXF1ZXN0IHwgaHR0cFxyXG5cdCAqIEByZXR1cm4gdm9pZFxyXG5cdCAqL1xyXG5cdGNvbnN0cnVjdG9yKGNvbnRhaW5lciwgaHR0cCwgZXZlbnRNYW5hZ2VyKSBcclxuXHR7XHJcblx0XHRDb250YWluZXIkNCA9IGNvbnRhaW5lcjtcclxuXHRcdEh0dHAkMSA9IGh0dHA7XHJcblx0XHRFdmVudE1hbmFnZXIkMyA9IGV2ZW50TWFuYWdlcjtcclxuXHRcdGNodW5rZWRQcm9kdWN0cyA9IFtdO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogU2V0cyB0aGUgZ2l2ZW4gc2V0dGluZ3MgZnJvbSB0aGUgdXNlci5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSBvYmplY3QgfCBzZXR0aW5nc1xyXG5cdCAqIEByZXR1cm4gdm9pZFxyXG5cdCAqL1xyXG5cdHNldHVwKHNldHRpbmdzKVxyXG5cdHtcclxuXHRcdGlmICh0eXBlb2Ygc2V0dGluZ3MgIT0gJ29iamVjdCcpIHtcclxuXHRcdFx0dGhyb3cgbmV3IEludmFsaWRBcmd1bWVudEV4Y2VwdGlvbiQxO1xyXG5cdFx0fVxyXG5cclxuXHRcdHRoaXMuc2V0dGluZ3MgPSBDb21tb24uZXh0ZW5kKGRlZmF1bHRTZXR0aW5ncyQ0LCBzZXR0aW5ncyk7XHJcblx0XHR0aGlzLnRvdGFsSXRlbXMgPSBudWxsO1xyXG5cclxuXHRcdGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCBmdW5jdGlvbigpIHtcclxuXHJcblx0XHRcdHRoaXMuc2V0RWxlbWVudCh0aGlzLnNldHRpbmdzLmVsZW1lbnQpO1xyXG5cclxuXHRcdFx0dGhpcy5hZGRTdHlsZVRhZygpO1x0XHJcblxyXG5cdFx0XHR0aGlzLmxvYWRQcm9kdWN0cygxKTtcclxuXHRcdH0uYmluZCh0aGlzKSk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBMb2FkcyB0aGUgcHJvZHVjdHMgZm9yIHRoZSBwYWdlLlxyXG5cdCAqIFxyXG5cdCAqIEBwYXJhbSBudW1iZXIgfCBwYWdlTnVtYmVyXHJcblx0ICogQHBhcmFtIGJvb2wgfCBhbGxcclxuXHQgKi9cclxuXHRsb2FkUHJvZHVjdHMocGFnZU51bWJlciA9IDEsIGFsbClcclxuXHR7XHJcblx0XHRpZiAoQ29udGFpbmVyJDQuUGFnaW5hdGlvbiAmJiBDb250YWluZXIkNC5QYWdpbmF0aW9uLmJvb3RlZCkge1xyXG5cclxuXHRcdFx0aWYgKENvbnRhaW5lciQ0LlBhZ2luYXRpb24uc2V0dGluZ3MucHJvY2Nlc3NpbmcgPT0gJ2NsaWVudC1zaWRlJykge1xyXG5cdFx0XHRcdHJldHVybiB0aGlzLmxvYWRQYWdlUHJvZHVjdHNCeUNsaWVudChwYWdlTnVtYmVyKTtcclxuXHRcdFx0fSBlbHNlIGlmIChDb250YWluZXIkNC5QYWdpbmF0aW9uLnNldHRpbmdzLnByb2NjZXNzaW5nID09ICdzZXJ2ZXItc2lkZScpIHtcclxuXHRcdFx0XHRyZXR1cm4gdGhpcy5sb2FkUGFnZVByb2R1Y3RzQnlTZXJ2ZXIocGFnZU51bWJlcik7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0dGhyb3cgbmV3IEludmFsaWRBcmd1bWVudEV4Y2VwdGlvbiQxKCdmb3IgcHJvY2Nlc3NpbmcgeW91IGNhbiBjaG9vc2UgXFwnc2VydmVyLXNpZGVcXCcgb3IgXFwnY2xpZW50LXNpZGVcXCcgb3B0aW9ucy4nKTtcclxuXHRcdFx0fVxyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0dGhpcy5sb2FkUGFnZVByb2R1Y3RzQnlTZXJ2ZXIoKTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIExvYWRzIHRoZSBwcm9kdWN0cyBhbmQgXHJcblx0ICogcmVwbGFjZSB0aGVtIGluIHRoZSBkaXYgY29udGFpbmVyLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIG51bWJlciB8IHBhZ2VOdW1iZXJcclxuXHQgKiBAcmV0dXJuIHZvaWRcclxuXHQgKi9cclxuXHRsb2FkUGFnZVByb2R1Y3RzQnlTZXJ2ZXIocGFnZU51bWJlciA9IG51bGwpXHJcblx0e1xyXG5cdFx0bGV0IHJlcXVlc3QgPSB0aGlzLmdldFByb2R1Y3RzKHBhZ2VOdW1iZXIpO1xyXG5cclxuXHRcdHJlcXVlc3QudGhlbihmdW5jdGlvbihwcm9kdWN0cykge1xyXG5cclxuXHRcdFx0dGhpcy5jdXJyZW50SXRlbXMgPSBwcm9kdWN0cztcclxuXHJcblx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5jdXJyZW50SXRlbXMubGVuZ3RoOyBpKyspIHtcclxuXHRcdFx0XHR2YXIgcHJvZHVjdCA9IHRoaXMuY3VycmVudEl0ZW1zW2ldO1xyXG5cdFx0XHRcdEV2ZW50TWFuYWdlciQzLnB1Ymxpc2goJ3Byb2R1Y3RzLmxvYWRpbmcnLCBwcm9kdWN0KTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0RXZlbnRNYW5hZ2VyJDMucHVibGlzaCgncHJvZHVjdHMubG9hZGVkJywgcHJvZHVjdHMpO1xyXG5cdFx0XHR0aGlzLnJlcGxhY2VJdGVtcyhwcm9kdWN0cyk7XHJcblx0XHRcdHJlc29sdmUoKTtcclxuXHRcdH0uYmluZCh0aGlzKSkuY2F0Y2goZnVuY3Rpb24oZXJyb3IpIHtcclxuXHJcblx0XHR9KTtcclxuXHJcblx0XHRyZXR1cm4gcmVxdWVzdDtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIExvYWRzIHRoZSBwcm9kdWN0cyBhbmQgXHJcblx0ICogcmVwbGFjZSB0aGVtIGluIHRoZSBkaXYgY29udGFpbmVyLlxyXG5cdCAqXHJcblx0ICogQHJldHVybiB2b2lkXHJcblx0ICovXHJcblx0bG9hZFBhZ2VQcm9kdWN0c0J5Q2xpZW50KHBhZ2VOdW1iZXIpXHJcblx0e1xyXG5cdFx0bGV0IHJlcXVlc3Q7XHJcblxyXG5cdFx0aWYgKHRoaXMudG90YWxJdGVtcyA9PSBudWxsKSB7IC8vIG5lZWQgdG8gZmV0Y2ggdGhlbSBmcm9tIHRoZSBzZXJ2ZXIuXHJcblx0XHRcdHJlcXVlc3QgPSB0aGlzLmdldFByb2R1Y3RzKCk7XHJcblx0XHR9IGVsc2UgeyAvLyBubyBuZWVkIHRvIHdhaXQgY2FuIHJlc29sdmUgaW1tZWRpYXRlbHkgd2l0aCB0aGUgcHJvZHVjdHMuIFxyXG5cdFx0XHRyZXF1ZXN0ID0gUHJvbWlzZS5yZXNvbHZlKHRoaXMudG90YWxJdGVtcyk7XHJcblx0XHR9XHJcblxyXG5cdFx0cmVxdWVzdC50aGVuKGZ1bmN0aW9uKHByb2R1Y3RzKSB7XHJcblx0XHRcdHRoaXMudG90YWxJdGVtcyA9IHByb2R1Y3RzO1xyXG5cclxuXHRcdFx0bGV0IHBhZ2VzID0gdGhpcy5jYWxjdWxhdGVDbGllbnRQYWdlcyhwcm9kdWN0cyk7XHJcblxyXG5cdFx0XHR0aGlzLmN1cnJlbnRJdGVtcyA9IHBhZ2VzW3BhZ2VOdW1iZXItMV07XHJcblxyXG5cdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuY3VycmVudEl0ZW1zLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdFx0dmFyIHByb2R1Y3QgPSB0aGlzLmN1cnJlbnRJdGVtc1tpXTtcclxuXHRcdFx0XHRFdmVudE1hbmFnZXIkMy5wdWJsaXNoKCdwcm9kdWN0cy5sb2FkaW5nJywgcHJvZHVjdCk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdEV2ZW50TWFuYWdlciQzLnB1Ymxpc2goJ3Byb2R1Y3RzLmxvYWRlZCcsIHByb2R1Y3RzKTtcclxuXHRcdFx0dGhpcy5yZXBsYWNlSXRlbXModGhpcy5jdXJyZW50SXRlbXMpO1xyXG5cdFx0XHRQcm9taXNlLnJlc29sdmUodGhpcy5jdXJyZW50SXRlbXMpO1xyXG5cclxuXHRcdH0uYmluZCh0aGlzKSkuY2F0Y2goZnVuY3Rpb24oZXJyb3IpIHtcclxuXHJcblx0XHR9KTtcclxuXHJcblx0XHRyZXR1cm4gcmVxdWVzdDtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIENhbGN1bGF0ZXMgdGhlIGFtb3VudCBvZiBwYWdlcyBmb3IgdGhlIGNsaWVudC5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSBhcnJheSB8IHByb2R1Y3RzXHJcblx0ICogQHJldHVybiBhcnJheVxyXG5cdCAqL1xyXG5cdGNhbGN1bGF0ZUNsaWVudFBhZ2VzKHByb2R1Y3RzKVxyXG5cdHtcdFxyXG5cdFx0Ly8gV2UgYXJlIHVzaW5nIHBhZ2luYXRpb24gc28gd2UgbmVlZCB0byB1cGRhdGUgaXQgdG9vLlxyXG5cdFx0Q29udGFpbmVyJDQuUGFnaW5hdGlvbi5zZXR0aW5ncy50b3RhbF9pdGVtcyA9IHByb2R1Y3RzLmxlbmd0aDtcclxuXHRcdFxyXG5cdFx0bGV0IHBlclBhZ2UgPSBDb250YWluZXIkNC5QYWdpbmF0aW9uLnNldHRpbmdzLnBlcl9wYWdlOyBcclxuXHJcblx0XHQvLyBXZSBuZWVkIHRvIGNhbGN1bGF0ZSB0aGUgcGFnZXMgb24gZnVsbCBodHRwIHJlcXVlc3QgXHJcblx0XHQvLyBvbmx5IG9uY2UuIHNvIHdlIGNoZWNrIHRvIHNlZSBpZiB3ZSBoYXZlIHJlc3VsdHMgaW4gb3VyIGNhY2hlLlxyXG5cdFx0aWYgKGNodW5rZWRQcm9kdWN0cy5sZW5ndGggIT0gMCkge1xyXG5cdFx0XHRyZXR1cm4gY2h1bmtlZFByb2R1Y3RzO1xyXG5cdFx0fVxyXG5cclxuXHRcdGNodW5rZWRQcm9kdWN0cyA9IENvbW1vbi5hcnJheV9jaHVuayhwcm9kdWN0cywgcGVyUGFnZSk7XHJcblx0XHRyZXR1cm4gY2h1bmtlZFByb2R1Y3RzO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogU2V0cyB0aGUgRE9NIGVsZW1lbnQgXHJcblx0ICogZm9yIHBvcHVsYXRpbmcgdGhlIHByb2R1Y3RzLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIHN0cmluZyB8IHNlbGVjdG9yXHJcblx0ICogQHJldHVybiB2b2lkXHJcblx0ICovXHJcblx0c2V0RWxlbWVudChzZWxlY3RvcilcclxuXHR7XHJcblx0XHR0aGlzLndyYXBwZXIgPSBET00uZmluZChzZWxlY3Rvcik7XHJcblxyXG5cdFx0aWYgKHRoaXMud3JhcHBlcikge1xyXG5cdFx0XHRET00uYWRkQ2xhc3ModGhpcy53cmFwcGVyLCB0aGlzLnNldHRpbmdzLmNsYXNzKTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFJlcGxhY2UgaXRlbXMgaW4gXHJcblx0ICogdGhlIHByb2R1Y3RzIGNvbnRhaW5lci5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSBhcnJheSB8IGl0ZW1zXHJcblx0ICogQHJldHVybiBhcnJheVxyXG5cdCAqL1xyXG5cdHJlcGxhY2VJdGVtcyhpdGVtcykgXHJcblx0e1xyXG5cdFx0aWYgKCEgQXJyYXkuaXNBcnJheShpdGVtcykgfHwgKGl0ZW1zLmxlbmd0aCA8PSAwICYmIHR5cGVvZiBpdGVtc1swXSA9PSAnc3RyaW5nJykpIHtcclxuXHRcdFx0dGhyb3cgbmV3IEludmFsaWRBcmd1bWVudEV4Y2VwdGlvbiQxO1xyXG5cdFx0fVxyXG5cclxuXHRcdGxldCBwcm9kdWN0cyA9IHRoaXMuYnVpbGRQcm9kdWN0cyhpdGVtcywgdGhpcy5zZXR0aW5ncy5pdGVtX2NsYXNzLCAnZGl2Jyk7XHJcblxyXG5cdFx0dGhpcy53cmFwcGVyLmlubmVySFRNTCA9ICcnO1xyXG5cdFx0cHJvZHVjdHMuZm9yRWFjaChmdW5jdGlvbihwcm9kdWN0KSB7XHJcblx0XHRcdHRoaXMud3JhcHBlci5hcHBlbmRDaGlsZChwcm9kdWN0KTtcclxuXHRcdH0uYmluZCh0aGlzKSk7XHJcblxyXG5cdFx0cmV0dXJuIGl0ZW1zO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogTWFrZXMgYW4gQWpheCBjYWxsIHRvIHRoZSBcclxuXHQgKiBzZXJ2ZXIgd2l0aG91dCBwYXJhbWV0ZXJzLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIG51bWJlciB8IHBhZ2VOdW1iZXJcclxuXHQgKiBAcmV0dXJuIFByb21pc2VcclxuXHQgKi9cclxuXHRnZXRQcm9kdWN0cyhwYWdlTnVtYmVyID0gbnVsbClcclxuXHR7XHJcblx0XHRsZXQgYWN0aW9uID0gKHBhZ2VOdW1iZXIpID8gdGhpcy5zZXR0aW5ncy51cmwgKyAnP3BhZ2U9JyArIHBhZ2VOdW1iZXIgOiB0aGlzLnNldHRpbmdzLnVybDtcclxuXHJcblx0XHRyZXR1cm4gSHR0cCQxLmdldCh7XHJcblx0XHRcdHVybDogYWN0aW9uLFxyXG5cdFx0fSk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBCdWlsZHMgdGhlIGh0bWwgZm9yIHRoZSBwcm9kdWN0cy5cclxuXHQgKiBcclxuXHQgKiBAcGFyYW0gYXJyYXkgfCBhdHRyaWJ1dGVzQ29sbGVjdGlvblxyXG5cdCAqIEBwYXJhbSBzdHJpbmcgfCBjbGFzc05hbWVcclxuXHQgKiBAcGFyYW0gc3RyaW5nIHwgdGFnVHlwZVxyXG5cdCAqIEByZXR1cm4gYXJyYXlcclxuXHQgKi9cclxuXHRidWlsZFByb2R1Y3RzKGF0dHJpYnV0ZXNDb2xsZWN0aW9uLCBjbGFzc05hbWUsIHRhZ1R5cGUpIFxyXG5cdHtcclxuXHRcdGlmKGF0dHJpYnV0ZXNDb2xsZWN0aW9uLmNvbnN0cnVjdG9yLm5hbWUgIT0gJ0FycmF5JyApIHtcclxuXHRcdFx0dGhyb3cgbmV3IEludmFsaWRBcmd1bWVudEV4Y2VwdGlvbiQxO1xyXG5cdFx0fVxyXG5cclxuXHRcdGxldCBidWlsdFByb2R1Y3RzID0gW107XHJcblxyXG5cdFx0YXR0cmlidXRlc0NvbGxlY3Rpb24uZm9yRWFjaChmdW5jdGlvbihhdHRyaWJ1dGVzKSB7XHJcblx0XHRcdGxldCBidWlsdFByb2R1Y3QgPSB0aGlzLmJ1aWxkUHJvZHVjdChhdHRyaWJ1dGVzLCBjbGFzc05hbWUsIHRhZ1R5cGUpO1xyXG5cdFx0XHRidWlsdFByb2R1Y3RzLnB1c2goYnVpbHRQcm9kdWN0KTtcclxuXHRcdH0uYmluZCh0aGlzKSk7XHJcblxyXG5cdFx0cmV0dXJuIGJ1aWx0UHJvZHVjdHM7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBCdWlsZHMgdGhlIGh0bWwgZm9yIGEgc2luZ2xlIHByb2R1Y3QuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gb2JqZWN0IHwgYXR0cmlidXRlc1xyXG5cdCAqIEBwYXJhbSBzdHJpbmcgfCBjbGFzc05hbWVcclxuXHQgKiBAcGFyYW0gc3RyaW5nIHwgdGFnVHlwZVxyXG5cdCAqIEByZXR1cm4gb2JqZWN0XHJcblx0ICovXHJcblx0YnVpbGRQcm9kdWN0KGF0dHJpYnV0ZXMsIGNsYXNzTmFtZSwgdGFnVHlwZSkgXHJcblx0e1xyXG5cdFx0aWYgKHR5cGVvZiBhdHRyaWJ1dGVzICE9ICdvYmplY3QnIHx8IHR5cGVvZiB0YWdUeXBlICE9ICdzdHJpbmcnKSB7XHJcblx0XHRcdHRocm93IG5ldyBJbnZhbGlkQXJndW1lbnRFeGNlcHRpb24kMTtcclxuXHRcdH1cclxuXHJcblx0XHRjbGFzc05hbWUgPSBjbGFzc05hbWUgfHwgbnVsbDtcclxuXHJcblx0XHRsZXQgcHJvZHVjdCA9IERPTS5jcmVhdGVFbGVtZW50KCdkaXYnLCB7XHJcblx0XHRcdGNsYXNzOiAncHJvZHVjdCdcclxuXHRcdH0pO1xyXG5cclxuXHRcdERPTS5hZGRDbGFzcyhwcm9kdWN0LCBjbGFzc05hbWUpO1xyXG5cclxuXHRcdGxldCBvdmVybGF5ID0gRE9NLmNyZWF0ZUVsZW1lbnQoJ2RpdicsIHtcclxuXHRcdFx0Y2xhc3M6ICdwcm9kdWN0LW92ZXJsYXknLFxyXG5cdFx0fSk7XHJcblxyXG5cdFx0cHJvZHVjdC5hcHBlbmRDaGlsZChvdmVybGF5KTtcclxuXHJcblx0XHRmb3IgKHZhciBhdHRyaWJ1dGUgaW4gYXR0cmlidXRlcykge1xyXG5cdFx0XHRpZiAoISBDb21tb24uaW5fYXJyYXkoYXR0cmlidXRlLCB0aGlzLnNldHRpbmdzLmF0dHJpYnV0ZXMpKSB7XHJcblx0XHRcdFx0Y29udGludWU7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGxldCB0YWcgPSBET00uY3JlYXRlRWxlbWVudCh0YWdUeXBlKTtcclxuXHJcblx0XHRcdGlmIChhdHRyaWJ1dGUgPT0gJ2ltYWdlJykge1xyXG5cdFx0XHRcdGxldCBpbWFnZSA9IERPTS5jcmVhdGVFbGVtZW50KCdpbWcnLCB7XHJcblx0XHRcdFx0XHRzcmM6IGF0dHJpYnV0ZXNbYXR0cmlidXRlXVxyXG5cdFx0XHRcdH0pO1xyXG5cdFx0XHRcdHByb2R1Y3QuYXBwZW5kQ2hpbGQoaW1hZ2UpO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdHRhZy5pbm5lckhUTUwgPSBhdHRyaWJ1dGVzW2F0dHJpYnV0ZV0gfHwgJyc7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdERPTS5hZGRDbGFzcyh0YWcsICdwcm9kdWN0LScgKyBTdHIua2ViYWJDYXNlKGF0dHJpYnV0ZSkpO1xyXG5cdFx0XHRvdmVybGF5LmFwcGVuZENoaWxkKHRhZyk7XHJcblx0XHR9XHJcblxyXG5cdFx0bGV0IHRhZyA9IERPTS5jcmVhdGVFbGVtZW50KCdkaXYnLCB7XHJcblx0XHRcdGlkOiAnYWN0aW9uQnV0dG9ucycsXHJcblx0XHRcdGNsYXNzOiAnYWN0aW9uLWJ1dHRvbnMnXHJcblx0XHR9KTtcclxuXHJcblx0XHRsZXQgYWRkVG9DYXJ0ID0gRE9NLmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicsIHtcclxuXHRcdFx0aWQ6ICdhZGRUb0NhcnQnLFxyXG5cdFx0XHRjbGFzczogdGhpcy5zZXR0aW5ncy5hZGRfYnV0dG9uX2NsYXNzLFxyXG5cdFx0XHR0eXBlOiAnYnV0dG9uJyxcclxuXHRcdFx0dGV4dDogJysnLFxyXG5cdFx0fSk7XHJcblxyXG5cdFx0bGV0IGZhdm9yaXRlID0gRE9NLmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicsIHtcclxuXHRcdFx0aWQ6ICdmYXZvcml0ZScsXHJcblx0XHRcdGNsYXNzOiB0aGlzLnNldHRpbmdzLmZhdm9yaXRlX2J1dHRvbl9jbGFzcyxcclxuXHRcdFx0dHlwZTogJ2J1dHRvbicsXHJcblx0XHRcdHRleHQ6ICcmaGVhcnRzOydcclxuXHRcdH0pO1xyXG5cclxuXHRcdHRhZy5hcHBlbmRDaGlsZChhZGRUb0NhcnQpO1xyXG5cdFx0dGFnLmFwcGVuZENoaWxkKGZhdm9yaXRlKTtcclxuXHJcblx0XHRhZGRUb0NhcnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbihlKSB7XHJcblx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcclxuXHRcdFx0RXZlbnRNYW5hZ2VyJDMucHVibGlzaCgnY2FydC5wcm9kdWN0cy5hZGRlZCcsIGF0dHJpYnV0ZXMpO1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0b3ZlcmxheS5hcHBlbmRDaGlsZCh0YWcpO1xyXG5cclxuXHRcdHJldHVybiBwcm9kdWN0O1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQWRkIHRoZSBlQ29tbWVyY2Ugc3R5bGUgdGFncyB0byB0aGUgRE9NLlxyXG5cdCAqL1xyXG5cdGFkZFN0eWxlVGFnKCkgXHJcblx0e1xyXG5cdFx0aWYoRE9NLmZpbmQoJyNUdXJiby1lQ29tbWVyY2UtUHJvZHVjdHMnKSkge1xyXG5cdFx0XHRyZXR1cm47XHJcblx0XHR9XHJcblxyXG5cdFx0bGV0IHdpZHRoID0gdGhpcy5zZXR0aW5ncy53aWR0aCB8fCAnYXV0byc7XHJcblx0XHRsZXQgaGVpZ2h0ID0gdGhpcy5zZXR0aW5ncy5oZWlnaHQgfHwgJzIwMHB4JztcclxuXHRcdGxldCBtaW5XaWR0aCA9IHRoaXMuc2V0dGluZ3MubWluX3dpZHRoIHx8ICcyMDBweCc7XHJcblx0XHRsZXQgbWF4V2lkdGggPSB0aGlzLnNldHRpbmdzLm1heF93aWR0aCB8fCAnMjUwcHgnO1xyXG5cdFxyXG5cclxuXHRcdGxldCBjc3MgPSBgXHJcblx0XHRcdC5wcm9kdWN0IHtcclxuXHRcdFx0XHRwb3NpdGlvbjogcmVsYXRpdmU7XHJcblx0XHRcdFx0bWFyZ2luOiA1cHggNXB4O1xyXG5cdFx0XHRcdGJvcmRlcjogMXB4IHNvbGlkICNlNGU0ZTQ7XHJcblx0XHRcdFx0d2lkdGg6ICR7d2lkdGh9O1xyXG5cdFx0XHRcdG1pbi13aWR0aDogJHttaW5XaWR0aH07XHJcblx0XHRcdFx0bWF4LXdpZHRoOiAke21heFdpZHRofTtcclxuXHRcdFx0XHRoZWlnaHQ6ICR7aGVpZ2h0fTtcclxuXHRcdFx0XHRjdXJzb3I6IHBvaW50ZXI7XHJcblx0XHRcdFx0Y29sb3I6ICNmZmZmZmY7XHJcblx0XHRcdFx0b3ZlcmZsb3c6IGhpZGRlbjtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0LnByb2R1Y3QgPiAucHJvZHVjdC1vdmVybGF5IHtcclxuXHRcdFx0XHRwb3NpdGlvbjogYWJzb2x1dGU7XHJcblx0XHRcdFx0dG9wOiAwO1xyXG5cdFx0XHRcdGxlZnQ6IDA7XHJcblx0XHRcdFx0d2lkdGg6IDEwMCU7XHJcblx0XHRcdFx0aGVpZ2h0OiAxMDAlO1xyXG5cdFx0XHRcdG9wYWNpdHk6IDAuNTtcclxuXHRcdFx0XHR6LWluZGV4OiA1O1xyXG5cdFx0XHRcdHRyYW5zaXRpb246IDFzIGFsbDtcclxuXHRcdFx0XHR0cmFuc2Zvcm06IHRyYW5zbGF0ZVgoLTI1MHB4KTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0LnByb2R1Y3Q6aG92ZXIgPiAucHJvZHVjdC1vdmVybGF5IHtcclxuXHRcdFx0XHRiYWNrZ3JvdW5kOiByZ2JhKDAsIDAsIDAsIDAuNDUpO1xyXG5cdFx0XHRcdHRyYW5zZm9ybTogdHJhbnNsYXRlWCgwcHgpO1xyXG5cdFx0XHRcdG9wYWNpdHk6IDE7XHJcblx0XHRcdFx0dHJhbnNpdGlvbjogMXMgYWxsO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHQucHJvZHVjdCA+IGltZyB7XHJcblx0XHRcdFx0cG9zaXRpb246IGFic29sdXRlO1xyXG5cdFx0XHRcdGxlZnQ6IDA7XHJcblx0XHRcdFx0dG9wOiAwO1xyXG5cdFx0XHRcdHdpZHRoOiAxMDAlO1xyXG5cdFx0XHRcdGhlaWdodDogMTAwJTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0LnByb2R1Y3QgPiAucHJvZHVjdC1pbWFnZSB7XHJcblx0XHRcdFx0ei1pbmRleDogMDtcclxuXHRcdFx0XHRwb3NpdGlvbjogYWJzb2x1dGU7XHJcblx0XHRcdFx0dG9wOiAwO1xyXG5cdFx0XHRcdGxlZnQ6IDA7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdC5wcm9kdWN0ID4gLnByb2R1Y3Qtb3ZlcmxheSA+IC5wcm9kdWN0LW5hbWUsIFxyXG5cdFx0XHQucHJvZHVjdCA+IC5wcm9kdWN0LW92ZXJsYXkgPiAucHJvZHVjdC1wcmljZSxcclxuXHRcdFx0LnByb2R1Y3QgPiAucHJvZHVjdC1vdmVybGF5ID4gLnByb2R1Y3QtZGVsaXZlcnktdGltZSB7XHJcblx0XHRcdFx0ei1pbmRleDogMTtcclxuXHRcdFx0XHRwb3NpdGlvbjogcmVsYXRpdmU7XHJcblx0XHRcdFx0dGV4dC1hbGlnbjogY2VudGVyO1xyXG5cdFx0XHRcdG1hcmdpbi10b3A6IDI1cHg7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdC5wcm9kdWN0ID4gLnByb2R1Y3Qtb3ZlcmxheSA+IC5hY3Rpb24tYnV0dG9ucyB7XHJcblx0XHRcdFx0d2lkdGg6IDEwMCU7XHJcblx0XHRcdFx0bWFyZ2luLXRvcDogMTBweDtcclxuXHRcdFx0XHR0ZXh0LWFsaWduOiBjZW50ZXI7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdC5wcm9kdWN0ID4gLnByb2R1Y3Qtb3ZlcmxheSA+IC5hY3Rpb24tYnV0dG9ucyA+ICNmYXZvcml0ZSB7XHJcblx0XHRcdFx0bWFyZ2luLWxlZnQ6IDEwcHg7XHJcblx0XHRcdH1cclxuXHJcblx0XHRgO1xyXG5cdCAgICBcclxuXHQgICAgRE9NLmFkZFN0eWxlKCdUdXJiby1lQ29tbWVyY2UtUHJvZHVjdHMnLCBjc3MpO1xyXG5cdH1cclxufVxuXG4vKipcclxuICogVGhlIFNlcnZpY2VzIE9iamVjdCwgaGFuZGxlcyB0aGUgc2VydmljZXMuXHJcbiAqL1xyXG5jbGFzcyBTZXJ2aWNlcyBcclxue1xyXG5cclxufVxuXG5sZXQgZGVmYXVsdE1lc3NhZ2UkNCA9ICdzb3JyeSwgbm8gbW9yZSBwYWdlcy4nO1xyXG5cclxuY2xhc3MgTm90SW5QYWdlUmFuZ2VFeGNlcHRpb24gZXh0ZW5kcyBFeGNlcHRpb25IYW5kbGVyXHJcbntcclxuXHRjb25zdHJ1Y3RvcihtZXNzYWdlID0gbnVsbCkgXHJcblx0e1xyXG5cdFx0bWVzc2FnZSA9IG1lc3NhZ2UgfHwgZGVmYXVsdE1lc3NhZ2UkNDtcclxuXHRcdHN1cGVyKCk7XHJcbiAgICBcdHN1cGVyLnN0YWNrVHJhY2UodGhpcywgbWVzc2FnZSk7XHJcbiAgICB9XHJcbn1cblxuLyoqXHJcbiAqIEBmaWxlIFxyXG4gKiBQYWdpbmF0aW9uIGNsYXNzLlxyXG4gKlxyXG4gKiBUaGUgUGFnaW5hdGlvbiBjb21wb25lbnQsIGhhbmRsZXMgdGhlIHBhZ2luYXRpb24uXHJcbiAqL1xyXG5cclxuLyoqXHJcbiAqIFRoZSBkZWZhdWx0IHNldHRpbmdzIG9mIHRoZSBwYWdpbmF0aW9uLlxyXG4gKlxyXG4gKiBAdmFyIG9iamVjdFxyXG4gKi9cclxubGV0IGRlZmF1bHRTZXR0aW5ncyQ1ID0ge1xyXG5cdGVsZW1lbnQ6ICcucGFnaW5hdGlvbi1saW5rcycsXHJcblx0cHJvY2Nlc3Npbmc6ICdjbGllbnQtc2lkZScsXHJcblx0Y2xhc3M6ICcnLFxyXG5cdHBlcl9wYWdlOiA1LFxyXG5cdHRvdGFsX2l0ZW1zOiAxMCxcclxufTtcclxuXHJcbi8qKlxyXG4gKiBTdG9yZXMgdGhlIGNvbnRhaW5lciBvYmplY3QuXHJcbiAqXHJcbiAqIEB2YXIgXFxDb3JlXFxDb250YWluZXJcclxuICovXHJcbmxldCBDb250YWluZXIkNTtcclxuXHJcbi8qKlxyXG4gKiBTdG9yZXMgdGhlIHByb2R1Y3RzIGNvbXBvbmVudC5cclxuICpcclxuICogQHZhciBcXENvbXBvbmVudHNcXFByb2R1Y3RzXHJcbiAqL1xyXG5sZXQgUHJvZHVjdHMkMjtcclxuXHJcbmNsYXNzIFBhZ2luYXRpb24gXHJcbntcclxuXHQvKipcclxuXHQgKiAtIEluaXRpYWxpemUgdGhlIGNvbnRhaW5lciBvYmplY3QuXHJcblx0ICogLSBJbml0aWFsaXplIHRoZSBwcm9kdWN0cyBjb21wb25lbnQuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gXFxDb3JlXFxDb250YWluZXIgfCBjb250YWluZXJcclxuXHQgKiBAcGFyYW0gXFxDb21wb25lbnRzXFxQcm9kdWN0cyB8IHByb2R1Y3RzXHJcblx0ICogQHJldHVybiB2b2lkXHJcblx0ICovXHJcblx0Y29uc3RydWN0b3IoY29udGFpbmVyLCBwcm9kdWN0cykgXHJcblx0e1xyXG5cdFx0dGhpcy5zZXRDdXJyZW50KDEpO1xyXG5cdFx0Q29udGFpbmVyJDUgPSBjb250YWluZXI7XHJcblx0XHRQcm9kdWN0cyQyID0gcHJvZHVjdHM7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBTZXR1cCB0aGUgcGFnaW5hdGlvbi5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSBvYmplY3QgfCBzZXR0aW5nc1xyXG5cdCAqIEByZXR1cm4gdm9pZFxyXG5cdCAqL1xyXG5cdHNldHVwKHNldHRpbmdzKVxyXG5cdHtcdFxyXG5cdFx0aWYodHlwZW9mIHNldHRpbmdzICE9ICdvYmplY3QnKSB7XHJcblx0XHRcdHRocm93IG5ldyBJbnZhbGlkQXJndW1lbnRFeGNlcHRpb24kMTtcclxuXHRcdH1cclxuXHJcblx0XHR0aGlzLnNldHRpbmdzID0gQ29tbW9uLmV4dGVuZChkZWZhdWx0U2V0dGluZ3MkNSwgc2V0dGluZ3MpO1xyXG5cclxuXHRcdHRoaXMudG90YWxQYWdlcyA9IHRoaXMuY2FsY3VsYXRlVG90YWxQYWdlcyh0aGlzLnNldHRpbmdzLnBlcl9wYWdlLCB0aGlzLnNldHRpbmdzLnRvdGFsX2l0ZW1zKTtcclxuXHRcdFxyXG5cdFx0dGhpcy5zZXRFbGVtZW50KHRoaXMuc2V0dGluZ3MuZWxlbWVudCk7XHJcblx0XHR0aGlzLmxpbmtzID0gdGhpcy5jcmVhdGVMaW5rcygpO1xyXG5cdFx0dGhpcy5iaW5kRXZlbnRMaXN0ZW5lcnModGhpcy5saW5rcyk7XHJcblx0XHR0aGlzLnJlcGxhY2VMaW5rcyh0aGlzLmxpbmtzKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFNldHMgdGhlIHdyYXBwZXIgZWxlbWVudC5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSBzdHJpbmcgfCBzZWxlY3RvclxyXG5cdCAqIEByZXR1cm4gdm9pZFxyXG5cdCAqL1xyXG5cdHNldEVsZW1lbnQoc2VsZWN0b3IpXHJcblx0e1xyXG5cdFx0dGhpcy53cmFwcGVyID0gRE9NLmZpbmQoc2VsZWN0b3IpO1xyXG5cdFx0XHJcblx0XHRET00uYWRkQ2xhc3ModGhpcy53cmFwcGVyLCB0aGlzLnNldHRpbmdzLmNsYXNzKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFJlcGxhY2VzIHRoZSBsaW5rcyBpbiB0aGUgd3JhcHBlci5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSBIVE1MVUxpc3RFbGVtZW50IHwgbGlua3NcclxuXHQgKiBAcmV0dXJuIHZvaWRcclxuXHQgKi9cclxuXHRyZXBsYWNlTGlua3MobGlua3MpXHJcblx0e1xyXG5cdFx0dGhpcy53cmFwcGVyLmlubmVySFRNTCA9ICcnO1xyXG5cdFx0dGhpcy53cmFwcGVyLmFwcGVuZENoaWxkKGxpbmtzKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIENhbGN1bGF0ZXMgdGhlIHRvdGFsIHBhZ2VzLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIG51bWJlciB8IHBlclBhZ2VcclxuXHQgKiBAcGFyYW0gbnVtYmVyIHwgdG90YWxJdGVtc1xyXG5cdCAqIEByZXR1cm4gbnVtYmVyXHJcblx0ICovXHJcblx0Y2FsY3VsYXRlVG90YWxQYWdlcyhwZXJQYWdlLCB0b3RhbEl0ZW1zKVxyXG5cdHtcclxuXHRcdHBlclBhZ2UgPSBwYXJzZUludChwZXJQYWdlKTtcclxuXHRcdHRvdGFsSXRlbXMgPSBwYXJzZUludCh0b3RhbEl0ZW1zKTtcclxuXHJcblx0XHRyZXR1cm4gTWF0aC5jZWlsKHRvdGFsSXRlbXMgLyBwZXJQYWdlKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEJpbmRzIHRoZSBidXR0b25zIGV2ZW50cyBsaXN0ZW5lcnMuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gSFRNTFVMaXN0RWxlbWVudCB8IGxpbmtzXHJcblx0ICogQHJldHVybiB2b2lkXHJcblx0ICovXHJcblx0YmluZEV2ZW50TGlzdGVuZXJzKGxpbmtzKSBcclxuXHR7XHJcblx0XHRsZXQgaW5zdGFuY2UgPSB0aGlzO1xyXG5cclxuXHRcdHRoaXMubmV4dC5jaGlsZE5vZGVzWzBdLm9uY2xpY2sgPSBmdW5jdGlvbihlKSB7XHJcblx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcclxuXHJcblx0XHRcdGxldCByZXF1ZXN0ZWRQYWdlID0gaW5zdGFuY2UuY3VycmVudCsxO1xyXG5cclxuXHRcdFx0aWYgKGluc3RhbmNlLm5vdEluUGFnZVJhbmdlKHJlcXVlc3RlZFBhZ2UpKSB7XHJcblx0XHRcdFx0dGhyb3cgbmV3IE5vdEluUGFnZVJhbmdlRXhjZXB0aW9uO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRQcm9kdWN0cyQyLmxvYWRQcm9kdWN0cyhyZXF1ZXN0ZWRQYWdlKS50aGVuKGZ1bmN0aW9uKHByb2R1Y3RzKSB7XHJcblx0XHRcdFx0aW5zdGFuY2Uuc2V0Q3VycmVudChyZXF1ZXN0ZWRQYWdlKTtcclxuXHRcdFx0fSk7XHJcblx0XHR9O1xyXG5cclxuXHRcdHRoaXMucHJldmlvdXMuY2hpbGROb2Rlc1swXS5vbmNsaWNrID0gZnVuY3Rpb24oZSkge1xyXG5cdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG5cdFx0XHRsZXQgcmVxdWVzdGVkUGFnZSA9IGluc3RhbmNlLmN1cnJlbnQtMTtcclxuXHJcblx0XHRcdGlmKGluc3RhbmNlLm5vdEluUGFnZVJhbmdlKHJlcXVlc3RlZFBhZ2UpKSB7XHJcblx0XHRcdFx0dGhyb3cgbmV3IE5vdEluUGFnZVJhbmdlRXhjZXB0aW9uO1xyXG5cdFx0XHR9XHJcblx0XHRcdFxyXG5cdFx0XHRQcm9kdWN0cyQyLmxvYWRQcm9kdWN0cyhyZXF1ZXN0ZWRQYWdlKS50aGVuKGZ1bmN0aW9uKHByb2R1Y3RzKSB7XHJcblx0XHRcdFx0aW5zdGFuY2Uuc2V0Q3VycmVudChyZXF1ZXN0ZWRQYWdlKTtcclxuXHRcdFx0fSk7XHJcblx0XHR9O1xyXG5cclxuXHRcdGZvcih2YXIgaSA9IDA7IGkgPCB0aGlzLnBhZ2VzLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdHRoaXMucGFnZXNbaV0uY2hpbGROb2Rlc1swXS5vbmNsaWNrID0gZnVuY3Rpb24oZSkge1xyXG5cdFx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcclxuXHRcdFx0XHRcclxuXHRcdFx0XHRsZXQgcmVxdWVzdGVkUGFnZSA9IHRoaXMuZ2V0QXR0cmlidXRlKCdkYXRhLXBhZ2UtbnInKTtcclxuXHRcdFx0XHRcclxuXHRcdFx0XHRQcm9kdWN0cyQyLmxvYWRQcm9kdWN0cyhyZXF1ZXN0ZWRQYWdlKS50aGVuKGZ1bmN0aW9uKHByb2R1Y3RzKSB7XHJcblx0XHRcdFx0XHRpbnN0YW5jZS5zZXRDdXJyZW50KHJlcXVlc3RlZFBhZ2UpO1xyXG5cdFx0XHRcdH0pO1xyXG5cdFx0XHR9O1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogU2V0cyB0aGUgY3VycmVudCBwYWdlLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIG51bWJlciB8IHBhZ2VOdW1iZXJcclxuXHQgKiBAcmV0dXJuIHZvaWRcclxuXHQgKi9cclxuXHRzZXRDdXJyZW50KHBhZ2VOdW1iZXIpIFxyXG5cdHtcclxuXHRcdHRoaXMuY3VycmVudCA9IHBhcnNlSW50KHBhZ2VOdW1iZXIpO1xyXG5cdFx0dGhpcy5jaGFuZ2VVcmwocGFnZU51bWJlcik7XHJcblx0XHR0aGlzLnNldEFjdGl2ZUxpbmsocGFnZU51bWJlcik7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBHZXRzIHRoZSBjdXJyZW50IHBhZ2UuXHJcblx0ICpcclxuXHQgKiBAcmV0dXJuIG51bWJlclxyXG5cdCAqL1xyXG5cdGdldEN1cnJlbnQoKSBcclxuXHR7XHJcblx0XHRyZXR1cm4gdGhpcy5jdXJyZW50O1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQ3JlYXRlcyB0aGUgcGFnaW5hdGlvbiBsaW5rcy5cclxuXHQgKlxyXG5cdCAqIEByZXR1cm4gSFRNTFVMaXN0RWxlbWVudFxyXG5cdCAqL1xyXG5cdGNyZWF0ZUxpbmtzKCkgXHJcblx0e1xyXG5cdFx0bGV0IHVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndWwnKTtcclxuXHRcdFxyXG5cdFx0dGhpcy5wYWdlcyA9IHRoaXMuY3JlYXRlUGFnZUxpbmtzKCk7XHJcblx0XHR0aGlzLnByZXZpb3VzID0gdGhpcy5jcmVhdGVQcmV2aW91c0J1dHRvbigpO1xyXG5cdFx0dGhpcy5uZXh0ID0gdGhpcy5jcmVhdGVOZXh0QnV0dG9uKCk7XHJcblxyXG5cdFx0dWwuY2xhc3NOYW1lID0gJ3BhZ2luYXRpb24nO1xyXG5cdFx0dWwuYXBwZW5kQ2hpbGQodGhpcy5wcmV2aW91cyk7XHJcblxyXG5cdFx0dGhpcy5wYWdlcy5mb3JFYWNoKGZ1bmN0aW9uKHBhZ2UpIHtcclxuXHRcdFx0dWwuYXBwZW5kQ2hpbGQocGFnZSk7XHJcblx0XHR9KTtcclxuXHJcblx0XHR1bC5hcHBlbmRDaGlsZCh0aGlzLm5leHQpO1xyXG5cclxuXHRcdHJldHVybiB1bDtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIENyZWF0ZXMgdGhlIHBhZ2VzIGl0ZW0gbGlua3MuXHJcblx0ICpcclxuXHQgKiBAcmV0dXJuIGFycmF5PEhUTUxMSUVsZW1lbnQ+XHJcblx0ICovXHJcblx0Y3JlYXRlUGFnZUxpbmtzKCkgXHJcblx0e1xyXG5cdFx0dmFyIHBhZ2VzID0gW107XHJcblxyXG5cdFx0Zm9yKHZhciBpID0gMTsgaSA8PSB0aGlzLnRvdGFsUGFnZXM7IGkrKykge1xyXG5cdFx0XHR2YXIgcGFnZUl0ZW0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaScpO1xyXG5cdFx0XHR2YXIgbGluayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKTtcclxuXHRcdFx0cGFnZUl0ZW0uY2xhc3NOYW1lID0gKHRoaXMuY3VycmVudCA9PSBpKSA/ICdwYWdlLWl0ZW0gYWN0aXZlJyA6ICdwYWdlLWl0ZW0nO1xyXG5cdFx0XHRsaW5rLmNsYXNzTmFtZSA9ICdwYWdlLWxpbmsnO1xyXG5cdFx0XHRsaW5rLnNldEF0dHJpYnV0ZSgnaHJlZicsICc/cGFnZT0nKyBpKTtcclxuXHRcdFx0bGluay5zZXRBdHRyaWJ1dGUoJ2RhdGEtcGFnZS1ucicsIGkpO1xyXG5cdFx0XHRsaW5rLmlubmVySFRNTCA9IGk7XHJcblx0XHRcdHBhZ2VJdGVtLmFwcGVuZENoaWxkKGxpbmspO1xyXG5cdFx0XHRwYWdlcy5wdXNoKHBhZ2VJdGVtKTtcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gcGFnZXM7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBDcmVhdGVzIHRoZSBwcmV2aW91cyBidXR0b24gbGluay5cclxuXHQgKlxyXG5cdCAqIEByZXR1cm4gSFRNTExJRWxlbWVudFxyXG5cdCAqL1xyXG5cdGNyZWF0ZVByZXZpb3VzQnV0dG9uKCkgXHJcblx0e1xyXG5cdFx0dmFyIGxpID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKTtcclxuXHRcdHZhciBsaW5rID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpO1xyXG5cdFx0dmFyIHNwYW4xID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xyXG5cdFx0dmFyIHNwYW4yID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xyXG5cdFx0XHJcblx0XHRcclxuXHRcdGxpLmNsYXNzTmFtZSA9ICdwYWdlLWl0ZW0nO1xyXG5cdFx0bGluay5jbGFzc05hbWUgPSAncGFnZS1saW5rJztcclxuXHRcdHNwYW4yLmNsYXNzTmFtZSA9ICdzci1vbmx5JztcclxuXHJcblx0XHRsaW5rLnNldEF0dHJpYnV0ZSgnaHJlZicsICcnKTtcclxuXHRcdGxpbmsuc2V0QXR0cmlidXRlKCdhcmlhLWxhYmVsJywgJ1ByZXZpb3VzJyk7XHJcblx0XHRzcGFuMS5zZXRBdHRyaWJ1dGUoJ2FyaWEtaGlkZGVuJywgJ3RydWUnKTtcclxuXHJcblx0XHRzcGFuMS5pbm5lckhUTUwgPSAnJmxhcXVvOyc7XHJcblx0XHRzcGFuMi5pbm5lckhUTUwgPSAnUHJldmlvdXMnO1xyXG5cclxuXHRcdGxpbmsuYXBwZW5kQ2hpbGQoc3BhbjEpO1xyXG5cdFx0bGluay5hcHBlbmRDaGlsZChzcGFuMik7XHJcblx0XHRsaS5hcHBlbmRDaGlsZChsaW5rKTtcclxuXHJcblx0XHRyZXR1cm4gbGk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBDcmVhdGVzIHRoZSBuZXh0IGJ1dHRvbiBsaW5rLlxyXG5cdCAqXHJcblx0ICogQHJldHVybiBIVE1MTElFbGVtZW50XHJcblx0ICovXHJcblx0Y3JlYXRlTmV4dEJ1dHRvbigpIFxyXG5cdHtcclxuXHRcdHZhciBsaSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJyk7XHJcblx0XHR2YXIgbGluayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKTtcclxuXHRcdHZhciBzcGFuMSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcclxuXHRcdHZhciBzcGFuMiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcclxuXHRcdFxyXG5cdFx0bGkuY2xhc3NOYW1lID0gJ3BhZ2UtaXRlbSc7XHJcblx0XHRsaW5rLmNsYXNzTmFtZSA9ICdwYWdlLWxpbmsnO1xyXG5cdFx0c3BhbjIuY2xhc3NOYW1lID0gJ3NyLW9ubHknO1xyXG5cclxuXHRcdGxpbmsuc2V0QXR0cmlidXRlKCdocmVmJywgJycpO1xyXG5cdFx0bGluay5zZXRBdHRyaWJ1dGUoJ2FyaWEtbGFiZWwnLCAnTmV4dCcpO1xyXG5cdFx0c3BhbjEuc2V0QXR0cmlidXRlKCdhcmlhLWhpZGRlbicsICd0cnVlJyk7XHJcblxyXG5cdFx0c3BhbjEuaW5uZXJIVE1MID0gJyZyYXF1bzsnO1xyXG5cdFx0c3BhbjIuaW5uZXJIVE1MID0gJ05leHQnO1xyXG5cclxuXHRcdGxpbmsuYXBwZW5kQ2hpbGQoc3BhbjEpO1xyXG5cdFx0bGluay5hcHBlbmRDaGlsZChzcGFuMik7XHJcblx0XHRsaS5hcHBlbmRDaGlsZChsaW5rKTtcclxuXHJcblx0XHRyZXR1cm4gbGk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBDaGVja3MgaWYgdGhlIGdpdmVuIHBhZ2UgaXMgaW4gcmFuZ2UuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gbnVtYmVyIHwgcGFnZU51bWJlclxyXG5cdCAqIEByZXR1cm4gYm9vbFxyXG5cdCAqL1xyXG5cdG5vdEluUGFnZVJhbmdlKHBhZ2VOdW1iZXIpIFxyXG5cdHtcclxuXHRcdHJldHVybiAocGFnZU51bWJlciA+IHRoaXMudG90YWxQYWdlcyB8fCBwYWdlTnVtYmVyIDw9IDApIHx8IGlzTmFOKHBhZ2VOdW1iZXIpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQ2hhbmdlcyB0aGUgdXJsIHRvIGEgZ2l2ZW4gcGFnZSBudW1iZXIuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gbnVtYmVyIHwgcGFnZU51bWJlclxyXG5cdCAqIEByZXR1cm4gdm9pZFxyXG5cdCAqL1xyXG5cdGNoYW5nZVVybChwYWdlTnVtYmVyKSBcclxuXHR7XHJcblx0XHRwYWdlTnVtYmVyID0gIHBhZ2VOdW1iZXIgfHwgcXVlcnlTdHJpbmcoKVsncGFnZSddO1xyXG5cdFx0d2luZG93Lmhpc3RvcnkucmVwbGFjZVN0YXRlKCcnLCAnJywgdGhpcy51cGRhdGVVUkxQYXJhbWV0ZXIod2luZG93LmxvY2F0aW9uLmhyZWYsICdwYWdlJywgcGFnZU51bWJlcikpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogU2V0cyB0aGUgYWN0aXZlIGxpbmsuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gbnVtYmVyIHwgcGFnZU51bWJlclxyXG5cdCAqIEByZXR1cm4gdm9pZFxyXG5cdCAqL1xyXG5cdHNldEFjdGl2ZUxpbmsocGFnZU51bWJlcilcclxuXHR7XHJcblx0XHRmb3IodmFyIHBhZ2UgaW4gdGhpcy5wYWdlcykge1xyXG5cdFx0XHRpZiAodGhpcy5wYWdlc1twYWdlXS5jaGlsZE5vZGVzWzBdLmdldEF0dHJpYnV0ZSgnZGF0YS1wYWdlLW5yJykgPT0gcGFnZU51bWJlcikge1xyXG5cdFx0XHRcdERPTS5hZGRDbGFzcyh0aGlzLnBhZ2VzW3BhZ2VdLCAnYWN0aXZlJyk7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0RE9NLnJlbW92ZUNsYXNzKHRoaXMucGFnZXNbcGFnZV0sICdhY3RpdmUnKTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogR2V0IHRoZSBnZXQgdmFyaWFibGVzIGZyb20gdGhlIHVybC5cclxuXHQgKlxyXG5cdCAqIEByZXR1cm4gYXJyYXlcclxuXHQgKi9cclxuXHRxdWVyeVN0cmluZygpIFxyXG5cdHtcclxuXHRcdHZhciB2YXJzID0ge307XHJcblx0XHR2YXIgcGFydHMgPSB3aW5kb3cubG9jYXRpb24uaHJlZi5yZXBsYWNlKC9bPyZdKyhbXj0mXSspPShbXiZdKikvZ2ksIGZ1bmN0aW9uKG0sIGtleSwgdmFsdWUpIHtcclxuXHRcdFx0dmFyc1trZXldID0gdmFsdWU7XHJcblx0XHR9KTtcclxuXHJcblx0XHRyZXR1cm4gdmFycztcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIE1vZGlmaWVzIHRoZSBnZXQgcGFyYW1ldGVyIGluIHRoZSB1cmwuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gc3RyaW5nIHwgdXJsXHJcblx0ICogQHBhcmFtIHN0cmluZyB8IHBhcmFtXHJcblx0ICogQHBhcmFtIG51bWJlciB8IHBhcmFtVmFsXHJcblx0ICogQHJldHVybiBzdHJpbmdcclxuXHQgKi9cclxuXHR1cGRhdGVVUkxQYXJhbWV0ZXIodXJsLCBwYXJhbSwgcGFyYW1WYWwpIFxyXG5cdHtcclxuXHQgICAgdmFyIG5ld0FkZGl0aW9uYWxVUkwgPSBcIlwiO1xyXG5cdCAgICB2YXIgdGVtcEFycmF5ID0gdXJsLnNwbGl0KFwiP1wiKTtcclxuXHQgICAgdmFyIGJhc2VVUkwgPSB0ZW1wQXJyYXlbMF07XHJcblx0ICAgIHZhciBhZGRpdGlvbmFsVVJMID0gdGVtcEFycmF5WzFdO1xyXG5cdCAgICB2YXIgdGVtcCA9IFwiXCI7XHJcblxyXG5cdCAgICBpZiAoYWRkaXRpb25hbFVSTCkge1xyXG5cdCAgICAgICAgdGVtcEFycmF5ID0gYWRkaXRpb25hbFVSTC5zcGxpdChcIiZcIik7XHJcblx0ICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRlbXBBcnJheS5sZW5ndGg7IGkrKyl7XHJcblx0ICAgICAgICAgICAgaWYgKHRlbXBBcnJheVtpXS5zcGxpdCgnPScpWzBdICE9IHBhcmFtKXtcclxuXHQgICAgICAgICAgICAgICAgbmV3QWRkaXRpb25hbFVSTCArPSB0ZW1wICsgdGVtcEFycmF5W2ldO1xyXG5cdCAgICAgICAgICAgICAgICB0ZW1wID0gXCImXCI7XHJcblx0ICAgICAgICAgICAgfVxyXG5cdCAgICAgICAgfVxyXG5cdCAgICB9XHJcblxyXG5cdCAgICB2YXIgcm93c1RleHQgPSB0ZW1wICsgXCJcIiArIHBhcmFtICsgXCI9XCIgKyBwYXJhbVZhbDtcclxuXHQgICAgcmV0dXJuIGJhc2VVUkwgKyBcIj9cIiArIG5ld0FkZGl0aW9uYWxVUkwgKyByb3dzVGV4dDtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFJlc2V0cyB0aGUgcGFnaW5hdGlvbi5cclxuXHQgKlxyXG5cdCAqIEByZXR1cm4gdm9pZFxyXG5cdCAqL1xyXG5cdHJlc2V0KCkgXHJcblx0e1xyXG5cdFx0dGhpcy5zZXRDdXJyZW50KDEpO1xyXG5cdFx0dGhpcy5jaGFuZ2VVcmwoMSk7XHJcblx0fVxyXG59XG5cbmxldCBkZWZhdWx0TWVzc2FnZSQ1ID0gJ0luIG9yZGVyIHRvIHVzZSBjb21wb25lbnRzIHlvdSBtdXN0IHJlZ2lzdGVyIHRoZW0gd2l0aCB0aGUgc2hvcCEnOyBcclxuXHJcbmNsYXNzIENvbXBvbmVudE5vdFJlZ2lzdGVyZWRFeGNlcHRpb24gZXh0ZW5kcyBFeGNlcHRpb25IYW5kbGVyXHJcbntcclxuXHRjb25zdHJ1Y3RvcihtZXNzYWdlID0gbnVsbCkgXHJcblx0e1xyXG5cdFx0bWVzc2FnZSA9IG1lc3NhZ2UgfHwgZGVmYXVsdE1lc3NhZ2UkNTtcclxuXHRcdHN1cGVyKG1lc3NhZ2UpO1xyXG4gICAgXHRzdXBlci5zdGFja1RyYWNlKHRoaXMsIG1lc3NhZ2UpO1xyXG4gICAgfVxyXG59XG5cbmxldCBkZWZhdWx0U2V0dGluZ3MgPSB7XHJcblx0ZGVidWdfbGV2ZWw6ICdlcnJvcicsXHJcblx0ZWxlbWVudDogJ2JvZHknLFxyXG5cdGluamVjdF9saWJyYXJpZXM6IFtdLFxyXG5cdGNvbXBvbmVudHM6IFsnUHJvZHVjdHMnLCAnU2VydmljZXMnLCAnRmlsdGVyJywgJ1BhZ2luYXRpb24nLCAnQ2FydCddXHJcbn07XHJcblxyXG5sZXQgZXh0ZXJuYWxMaWJyYXJpZXMgPSB7XHJcblx0Ym9vdHN0cmFwOiAnaHR0cHM6Ly9tYXhjZG4uYm9vdHN0cmFwY2RuLmNvbS9ib290c3RyYXAvMy4zLjcvY3NzL2Jvb3RzdHJhcC5taW4uY3NzJyxcclxufTtcclxuXHJcbmxldCBkZWJ1Z0xldmVsO1xyXG5cclxuY2xhc3MgVHVyYm9lQ29tbWVyY2UkMVxyXG57XHJcblx0Y29uc3RydWN0b3Ioc2V0dGluZ3MpXHJcblx0e1xyXG5cdFx0aWYodHlwZW9mIHNldHRpbmdzICE9ICdvYmplY3QnKSB7XHJcblx0XHRcdHRocm93IG5ldyBJbnZhbGlkQXJndW1lbnRFeGNlcHRpb24kMTtcclxuXHRcdH1cclxuXHJcblx0XHR0aGlzLmNvbnRhaW5lciA9IG5ldyBDb250YWluZXI7XHJcblx0XHR0aGlzLnNldHRpbmdzID0gQ29tbW9uLmV4dGVuZChkZWZhdWx0U2V0dGluZ3MsIHNldHRpbmdzKTtcclxuXHJcblx0XHR0aGlzLmxvYWRFeHRlcm5hbExpYnJhcmllcygpO1xyXG5cclxuXHRcdGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCBmdW5jdGlvbigpIHtcclxuXHRcdFx0dGhpcy5zZXRFbGVtZW50KHRoaXMuc2V0dGluZ3MuZWxlbWVudCk7XHJcblx0XHRcdHRoaXMuYWRkU3R5bGVUYWcoKTtcdFxyXG5cdFx0fS5iaW5kKHRoaXMpKTtcclxuXHJcblx0XHRkZWJ1Z0xldmVsID0gdGhpcy5zZXR0aW5ncy5kZWJ1Z19sZXZlbDtcclxuXHRcdFxyXG5cdFx0aWYgKGRlYnVnTGV2ZWwgPT0gJ3dhcm5pbmcnIHx8IGRlYnVnTGV2ZWwgPT0gJ2luZm8nKSB7XHJcblx0XHRcdHdpbmRvdy5vbmVycm9yID0gZnVuY3Rpb24oKSB7IHJldHVybiB0cnVlOyB9O1xyXG5cdFx0fVxyXG5cclxuXHRcdGJpbmRDb21wb25lbnRzRGVwZW5kZW5jaWVzLmNhbGwodGhpcywgc2V0dGluZ3MuY29tcG9uZW50cyk7XHJcblxyXG5cdFx0cmV0dXJuIG5ldyBQcm94eSh0aGlzLCB7XHJcblx0XHRcdGdldDogZnVuY3Rpb24odGFyZ2V0LCBzb3VyY2UpIHtcclxuXHRcdFx0XHRpZiAoQ29tbW9uLmluX2FycmF5KHNvdXJjZSwgc2V0dGluZ3MuY29tcG9uZW50cykpIHtcclxuXHRcdFx0XHRcdHJldHVybiB0YXJnZXQuY29udGFpbmVyLm1ha2Uoc291cmNlKTtcclxuXHRcdFx0XHR9IGVsc2UgaWYgKHRhcmdldC5jb250YWluZXIuaW5zdGFuY2VFeGlzdChzb3VyY2UpKSB7XHJcblx0XHRcdFx0XHRyZXR1cm4gdGFyZ2V0LmNvbnRhaW5lci5nZXRJbnN0YW5jZShzb3VyY2UpO1xyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0dGhyb3cgbmV3IENvbXBvbmVudE5vdFJlZ2lzdGVyZWRFeGNlcHRpb24oJ2NvbXBvbmVudHMgbXVzdCBiZSByZWdpc3RlcmVkIGluIG9yZGVyIHRvIHVzZSB0aGVtLicpO1xyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHR9XHJcblxyXG5cdGxvYWRFeHRlcm5hbExpYnJhcmllcygpXHJcblx0e1xyXG5cdFx0bGV0IGk7XHJcblx0XHRsZXQgbGlicmFyaWVzID0gdGhpcy5zZXR0aW5ncy5pbmplY3RfbGlicmFyaWVzO1xyXG5cclxuXHRcdGZvciAoaSA9IDA7IGkgPCBsaWJyYXJpZXMubGVuZ3RoOyBpKyspIHtcclxuXHRcdFx0aWYgKGV4dGVybmFsTGlicmFyaWVzLmhhc093blByb3BlcnR5KGxpYnJhcmllc1tpXSkpIHtcclxuXHRcdFx0XHRsZXQgaWQgPSAnVHVyYm8tZUNvbW1lcmNlLScgKyBTdHIudWNmaXJzdChsaWJyYXJpZXNbaV0pO1xyXG5cdFx0XHRcdFxyXG5cdFx0XHRcdGlmICghIERPTS5maW5kKGlkKSkge1xyXG5cdFx0XHRcdFx0RE9NLmFkZExpbmtlZFN0eWxlKGlkLCBleHRlcm5hbExpYnJhcmllc1tsaWJyYXJpZXNbaV1dKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFNldHMgdGhlIGVsZW1lbnQgdG8gYmUgYm91bmQgdG8uXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gc3RyaW5nIHwgc2VsZWN0b3JcclxuXHQgKiBAcmV0dXJuIHZvaWRcclxuXHQgKi9cclxuXHRzZXRFbGVtZW50KHNlbGVjdG9yKVxyXG5cdHtcclxuXHRcdHRoaXMud3JhcHBlciA9IERPTS5maW5kKHNlbGVjdG9yKTtcclxuXHRcdFxyXG5cdFx0RE9NLmFkZENsYXNzKHRoaXMud3JhcHBlciwgdGhpcy5zZXR0aW5ncy5jbGFzcyk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBBZGQgdGhlIGVDb21tZXJjZSBzdHlsZSB0YWdzIHRvIHRoZSBET00uXHJcblx0ICovXHJcblx0YWRkU3R5bGVUYWcoKSBcclxuXHR7XHJcblx0XHRpZihET00uZmluZCgnI1R1cmJvZS1Db21tZXJjZScpKSB7XHJcblx0XHRcdHJldHVybjtcclxuXHRcdH1cclxuXHJcblx0XHRsZXQgY3NzID0gYFxyXG5cdFx0XHQke3RoaXMuc2V0dGluZ3MuZWxlbWVudH0ge1xyXG5cdFx0XHRcdHBvc2l0aW9uOiByZWxhdGl2ZTtcclxuXHRcdFx0XHRjbGVhcjogYm90aDtcclxuXHRcdFx0fVxyXG5cdFx0YDtcclxuXHQgICAgXHJcblx0ICAgIERPTS5hZGRTdHlsZSgnVHVyYm8tZUNvbW1lcmNlJywgY3NzKTtcclxuXHR9XHJcblxyXG5cdHN0YXRpYyBkZWJ1Z0xldmVsKClcclxuXHR7XHJcblx0XHRyZXR1cm4gZGVidWdMZXZlbDtcclxuXHR9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBCaW5kcyBjb21wb25lbnRzIGRlcGVuZGVuY2llcy5cclxuICpcclxuICogQHBhcmFtIG9iamVjdCB8IGNvbXBvbmVudHNcclxuICogQHJldHVybiB2b2lkXHJcbiAqL1xyXG5mdW5jdGlvbiBiaW5kQ29tcG9uZW50c0RlcGVuZGVuY2llcyhjb21wb25lbnRzKSB7XHJcblxyXG5cdHRoaXMuY29udGFpbmVyLnNldEluc3RhbmNlKCdFdmVudHMnLCBuZXcgRXZlbnRNYW5hZ2VyKTtcclxuXHJcblx0bGV0IHJlcXVlc3QgPSB0aGlzLmNvbnRhaW5lci5tYWtlKG5ldyBSZXF1ZXN0KTtcclxuXHJcblx0dGhpcy5jb250YWluZXIuYmluZCgnRmlsdGVyJywgZnVuY3Rpb24oY29udGFpbmVyKSB7XHJcblx0XHRsZXQgY29tcG9uZW50ID0gbmV3IEZpbHRlcihjb250YWluZXIpO1xyXG5cdFx0Y29tcG9uZW50LmJvb3RlZCA9IHRydWU7IFxyXG5cdFx0cmV0dXJuIGNvbXBvbmVudDtcclxuXHR9KTtcclxuXHRcclxuXHR0aGlzLmNvbnRhaW5lci5iaW5kKCdTZXJ2aWNlcycsIGZ1bmN0aW9uKGNvbnRhaW5lcikgeyBcclxuXHRcdGxldCBjb21wb25lbnQgPSBuZXcgU2VydmljZXMoY29udGFpbmVyKTsgXHJcblx0XHRjb21wb25lbnQuYm9vdGVkID0gdHJ1ZTtcclxuXHRcdHJldHVybiBjb21wb25lbnQ7XHJcblx0fSk7XHJcblxyXG5cdHRoaXMuY29udGFpbmVyLmJpbmQoJ1Byb2R1Y3RzJywgZnVuY3Rpb24oY29udGFpbmVyKSB7XHJcblx0XHRsZXQgY29tcG9uZW50ID0gbmV3IFByb2R1Y3RzKGNvbnRhaW5lciwgcmVxdWVzdCwgY29udGFpbmVyLkV2ZW50cyk7XHJcblx0XHRjb21wb25lbnQuYm9vdGVkID0gdHJ1ZTtcclxuXHRcdHJldHVybiBjb21wb25lbnQ7XHJcblx0fSk7XHJcblxyXG5cdHRoaXMuY29udGFpbmVyLmJpbmQoJ1BhZ2luYXRpb24nLCBmdW5jdGlvbihjb250YWluZXIpIHtcclxuXHRcdGxldCBjb21wb25lbnQgPSBuZXcgUGFnaW5hdGlvbihjb250YWluZXIsIGNvbnRhaW5lci5tYWtlKCdQcm9kdWN0cycpLCBjb250YWluZXIuRXZlbnRzKTtcclxuXHRcdGNvbXBvbmVudC5ib290ZWQgPSB0cnVlO1xyXG5cdFx0cmV0dXJuIGNvbXBvbmVudDtcclxuXHR9KTtcclxuXHJcblx0dGhpcy5jb250YWluZXIuYmluZCgnQ2FydCcsIGZ1bmN0aW9uKGNvbnRhaW5lcikge1xyXG5cdFx0bGV0IGNvbXBvbmVudCA9IG5ldyBDYXJ0KGNvbnRhaW5lciwgcmVxdWVzdCwgY29udGFpbmVyLkV2ZW50cyk7XHJcblx0XHRjb21wb25lbnQuYm9vdGVkID0gdHJ1ZTtcclxuXHRcdHJldHVybiBjb21wb25lbnQ7XHJcblx0fSk7XHJcblxyXG5cdHRoaXMuY29udGFpbmVyLkZpbHRlci5ib290ZWQgPSBmYWxzZTtcclxuXHR0aGlzLmNvbnRhaW5lci5TZXJ2aWNlcy5ib290ZWQgPSBmYWxzZTtcclxuXHR0aGlzLmNvbnRhaW5lci5Qcm9kdWN0cy5ib290ZWQgPSBmYWxzZTtcclxuXHR0aGlzLmNvbnRhaW5lci5QYWdpbmF0aW9uLmJvb3RlZCA9IGZhbHNlO1xyXG5cdHRoaXMuY29udGFpbmVyLkNhcnQuYm9vdGVkID0gZmFsc2U7XHJcbn1cblxucmV0dXJuIFR1cmJvZUNvbW1lcmNlJDE7XG5cbn0oKSk7XG4iXX0=
