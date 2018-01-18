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

	/**
  * Stores the events callbacks.
  * 
  * @var array
  */


	var events = {};

	var EventManager = function () {
		function EventManager() {
			_classCallCheck(this, EventManager);
		}

		_createClass(EventManager, [{
			key: 'subscribe',

			/**
    * Subscribing to an event.
    *
    * @param string | name
    * @param function | callback
    * @return void
    */
			value: function subscribe(name, callback) {
				if (typeof callback !== 'function') {
					throw new InvalidArgumentException();
				}

				if (typeof events[name] == 'undefined') {
					events[name] = [];
				}

				events[name].push(callback);
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
				if (typeof events[name] == 'undefined') {
					return;
				}

				events[name].forEach(function (callback) {
					if (typeof callback != 'function') {
						throw new InvalidArgumentException('listen() should recieve callback as second parameter, but ' + (typeof callback === 'undefined' ? 'undefined' : _typeof(callback)) + ' was passed');
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
		data: {},
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

				this.setElement(this.settings.element);
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

				var css = '\n\t\t\t.product {\n\t\t\t\tposition: relative;\n\t\t\t\tmargin: 5px 5px;\n\t\t\t\tborder: 1px solid #e4e4e4;\n\t\t\t\twidth: ' + this.settings.width + ';\n\t\t\t\theight: ' + this.settings.height + ';\n\t\t\t\tcursor: pointer;\n\t\t\t\tcolor: #ffffff;\n\t\t\t\toverflow: hidden;\n\t\t\t}\n\n\t\t\t.product > .product-overlay {\n\t\t\t\tposition: absolute;\n\t\t\t\ttop: 0;\n\t\t\t\tleft: 0;\n\t\t\t\twidth: 100%;\n\t\t\t\theight: 100%;\n\t\t\t\topacity: 0.5;\n\t\t\t\tz-index: 5;\n\t\t\t\ttransition: 1s all;\n\t\t\t\ttransform: translateX(-250px);\n\t\t\t}\n\n\t\t\t.product:hover > .product-overlay {\n\t\t\t\tbackground: rgba(0, 0, 0, 0.45);\n\t\t\t\ttransform: translateX(0px);\n\t\t\t\topacity: 1;\n\t\t\t\ttransition: 1s all;\n\t\t\t}\n\n\t\t\t.product > img {\n\t\t\t\tposition: absolute;\n\t\t\t\tleft: 0;\n\t\t\t\ttop: 0;\n\t\t\t\twidth: 100%;\n\t\t\t\theight: 100%;\n\t\t\t}\n\n\t\t\t.product > .product-image {\n\t\t\t\tz-index: 0;\n\t\t\t\tposition: absolute;\n\t\t\t\ttop: 0;\n\t\t\t\tleft: 0;\n\t\t\t}\n\n\t\t\t.product > .product-overlay > .product-name, \n\t\t\t.product > .product-overlay > .product-price,\n\t\t\t.product > .product-overlay > .product-delivery-time {\n\t\t\t\tz-index: 1;\n\t\t\t\tposition: relative;\n\t\t\t\ttext-align: center;\n\t\t\t\tmargin-top: 25px;\n\t\t\t}\n\n\t\t\t.product > .product-overlay > .action-buttons {\n\t\t\t\twidth: 100%;\n\t\t\t\tmargin-top: 10px;\n\t\t\t\ttext-align: center;\n\t\t\t}\n\n\t\t\t.product > .product-overlay > .action-buttons > #favorite {\n\t\t\t\tmargin-left: 10px;\n\t\t\t}\n\n\t\t';

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
			this.addStyleTag();

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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlR1cmJvZUNvbW1lcmNlLmpzIl0sIm5hbWVzIjpbIlR1cmJvZUNvbW1lcmNlIiwiU3RyIiwic3RyaW5nIiwicmVwbGFjZSIsInRvTG93ZXJDYXNlIiwibGVuZ3RoIiwicG9zc2libGUiLCJpIiwiY2hhckF0IiwiTWF0aCIsImZsb29yIiwicmFuZG9tIiwidG9VcHBlckNhc2UiLCJzbGljZSIsIkV4Y2VwdGlvbkhhbmRsZXIiLCJtZXNzYWdlIiwiRXJyb3IiLCJjYXB0dXJlU3RhY2tUcmFjZSIsImNvbnN0cnVjdG9yIiwibmFtZSIsImVycm9yIiwiY3VzdG9tQWN0aW9ucyIsImRlYnVnTGV2ZWwiLCJoYW5kbGVFcnJvcnMiLCJoYW5kbGVXYXJuaW5ncyIsImhhbmRsZUluZm9zIiwiY29uc29sZSIsIndhcm4iLCJpbmZvIiwiZGVmYXVsdE1lc3NhZ2UiLCJJbnZhbGlkQXJndW1lbnRFeGNlcHRpb24kMSIsIkRPTSIsImVsZW1lbnQiLCJjbGFzc05hbWUiLCJuZXdDbGFzc05hbWUiLCJyZW1vdmVDbGFzcyIsImFkZENsYXNzIiwidW5kZWZpbmVkIiwiY2xhc3NOYW1lcyIsInNwbGl0IiwiZm9yRWFjaCIsImNsYXNzTGlzdCIsImFkZCIsInJlbW92ZSIsImlkIiwiY3NzIiwiaGVhZCIsImRvY3VtZW50IiwiZ2V0RWxlbWVudHNCeVRhZ05hbWUiLCJzdHlsZVRhZyIsImNyZWF0ZUVsZW1lbnQiLCJDU1MiLCJtaW5pZnlDc3MiLCJpbm5lckhUTUwiLCJzZXRBdHRyaWJ1dGUiLCJhcHBlbmRDaGlsZCIsInNvdXJjZSIsImxpbmtlZFN0eWxlVGFnIiwiZWxlbWVudFR5cGUiLCJvcHRpb25zIiwib3B0aW9uIiwic2Vjb25kQ2xhc3NOYW1lIiwidG9nZ2xlIiwic2VsZWN0b3IiLCJjb250ZXh0Iiwid2luZG93IiwicXVlcnlFbGVtZW50IiwicGFyZW50RWxlbWVudCIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJoYXNDaGlsZCIsImNoaWxkRWxlbWVudCIsIm5vZGUiLCJwYXJlbnROb2RlIiwiQ29tbW9uIiwiY3VycmVudE9iamVjdCIsIm5ld09iamVjdCIsImV4dGVuZGVkIiwicHJvcCIsIk9iamVjdCIsInByb3RvdHlwZSIsImhhc093blByb3BlcnR5IiwiY2FsbCIsIm5lZWRsZSIsImh5c3RhY2siLCJBcnJheSIsInRvdGFsIiwic2l6ZSIsImlzTmFOIiwicGFyc2VJbnQiLCJjb2xsZWN0aW9uIiwiY2VpbCIsInN0YXJ0IiwiZW5kIiwicHVzaCIsIm9iamVjdCIsImRlZmF1bHRNZXNzYWdlJDEiLCJJbnZhbGlkRGF0YVN0cnVjdHVyZUV4Y2VwdGlvbiIsImRlZmF1bHRTZXR0aW5ncyQxIiwiaGVhZGVycyIsImFzeW5jIiwiUmVxdWVzdCIsInNldHRpbmdzIiwieGhyIiwiWE1MSHR0cFJlcXVlc3QiLCJBY3RpdmVYT2JqZWN0IiwiZXh0ZW5kIiwic2V0RGVmYXVsdFJlcXVlc3RIZWFkZXIiLCJoZWFkZXIiLCJvcGVuIiwic2V0UmVxdWVzdEhlYWRlciIsInJlc3BvbnNlIiwiYXBwbHkiLCJhcmd1bWVudHMiLCJiZWZvcmUiLCJQcm9taXNlIiwicmVzb2x2ZSIsInJlamVjdCIsImRhdGEiLCJ1cmwiLCJyZXNwb25zZVR5cGUiLCJkYXRhVHlwZSIsInRpbWVvdXQiLCJvbnJlYWR5c3RhdGVjaGFuZ2UiLCJyZWFkeVN0YXRlIiwic3RhdHVzIiwiYWZ0ZXIiLCJvbmVycm9yIiwic2VuZCIsInF1ZXJ5U3RyaW5nIiwia2V5cyIsIm1hcCIsImtleSIsImVuY29kZVVSSUNvbXBvbmVudCIsImpvaW4iLCJkZWZhdWx0TWVzc2FnZSQyIiwiSW52YWxpZEJpbmRpbmdFeGNlcHRpb24iLCJpbnN0YW5jZXMiLCJDb250YWluZXIiLCJjb25jcmV0ZSIsImJpbmQiLCJpbnN0YW5jZSIsImFsaWFzIiwiaW5zdGFuY2VFeGlzdCIsImdldEluc3RhbmNlIiwic2V0SW5zdGFuY2UiLCJkZWZhdWx0TWVzc2FnZSQzIiwiQmFkRXZlbnRDYWxsRXhjZXB0aW9uIiwiZXZlbnRzIiwiRXZlbnRNYW5hZ2VyIiwiY2FsbGJhY2siLCJJbnZhbGlkQXJndW1lbnRFeGNlcHRpb24iLCJDb29raWUiLCJ2YWx1ZSIsImRheXMiLCJKU09OIiwic3RyaW5naWZ5IiwiZXhwaXJlcyIsImRhdGUiLCJEYXRlIiwic2V0VGltZSIsImdldFRpbWUiLCJ0b0dNVFN0cmluZyIsImNvb2tpZSIsImNfc3RhcnQiLCJpbmRleE9mIiwiY19lbmQiLCJwYXJzZSIsInVuZXNjYXBlIiwic3Vic3RyaW5nIiwiZGVmYXVsdFNldHRpbmdzJDIiLCJjb29raWVfbmFtZSIsInByZXZpZXdfY2xhc3MiLCJsb2FkZXIiLCJjbGFzcyIsIndpZHRoIiwiaGVpZ2h0IiwicGxhY2VtZW50IiwiZml4ZWQiLCJob3Zlcl9jb2xvciIsIkNvbnRhaW5lciQyIiwiRXZlbnRNYW5hZ2VyJDIiLCJIdHRwIiwibG9hZGluZ092ZXJsYXkiLCJpdGVtc0RpdiIsIkNhcnQiLCJjb250YWluZXIiLCJodHRwIiwiZXZlbnRNYW5hZ2VyIiwicHJldmlld0VsZW1lbnQiLCJjcmVhdGVQcmV2aWV3RWxlbWVudCIsInN2Z0ljb24iLCJjcmVhdGVJY29uIiwic2V0RWxlbWVudCIsImJpbmRFdmVudExpc3RlbmVycyIsImFkZFN0eWxlVGFnIiwiaXNFbXB0eSIsImdldCIsImNhcnQiLCJzZXRDYXJ0IiwiZW1wdHlPYmplY3QiLCJpdGVtcyIsImZhdm9yaXRlcyIsInNldCIsIml0ZW0iLCJzcGxpY2UiLCJsaSIsImF0dHJpYnV0ZXMiLCJhdHRyaWJ1dGUiLCJzcGFuIiwidGV4dCIsImljb24iLCJmaW5kIiwicG9zaXRpb24iLCJhZGRTdHlsZSIsInNyYyIsInJlbW92ZUNoaWxkIiwicHJldmlld1N0YXJ0TG9hZGluZyIsImdldENhcnRJdGVtcyIsImFkZFRvUHJldmlldyIsInNldFRpbWVvdXQiLCJwcmV2aWV3U3RvcExvYWRpbmciLCJvbmNsaWNrIiwiZSIsInByZXZlbnREZWZhdWx0Iiwib3BlbmluZyIsInRvZ2dsZUNsYXNzIiwicmVsb2FkQ2FydFByZXZpZXciLCJzdWJzY3JpYmUiLCJjbG9zZSIsImV2ZW50Iiwic3dpdGNoQ2xhc3NlcyIsInN2ZyIsImNyZWF0ZUVsZW1lbnROUyIsImciLCJwYXRoIiwiZGVmYXVsdFNldHRpbmdzJDMiLCJDb250YWluZXIkMyIsIkZpbHRlciIsIndyYXBwZXIiLCJkZWZhdWx0U2V0dGluZ3MkNCIsIml0ZW1fY2xhc3MiLCJhZGRfYnV0dG9uX2NsYXNzIiwiZmF2b3JpdGVfYnV0dG9uX2NsYXNzIiwiQ29udGFpbmVyJDQiLCJFdmVudE1hbmFnZXIkMyIsIkh0dHAkMSIsImNodW5rZWRQcm9kdWN0cyIsIlByb2R1Y3RzIiwidG90YWxJdGVtcyIsImFkZEV2ZW50TGlzdGVuZXIiLCJsb2FkUHJvZHVjdHMiLCJwYWdlTnVtYmVyIiwiYWxsIiwiUGFnaW5hdGlvbiIsImJvb3RlZCIsInByb2NjZXNzaW5nIiwibG9hZFBhZ2VQcm9kdWN0c0J5Q2xpZW50IiwibG9hZFBhZ2VQcm9kdWN0c0J5U2VydmVyIiwicmVxdWVzdCIsImdldFByb2R1Y3RzIiwidGhlbiIsInByb2R1Y3RzIiwiY3VycmVudEl0ZW1zIiwicHJvZHVjdCIsInB1Ymxpc2giLCJyZXBsYWNlSXRlbXMiLCJjYXRjaCIsInBhZ2VzIiwiY2FsY3VsYXRlQ2xpZW50UGFnZXMiLCJ0b3RhbF9pdGVtcyIsInBlclBhZ2UiLCJwZXJfcGFnZSIsImFycmF5X2NodW5rIiwiaXNBcnJheSIsImJ1aWxkUHJvZHVjdHMiLCJhY3Rpb24iLCJhdHRyaWJ1dGVzQ29sbGVjdGlvbiIsInRhZ1R5cGUiLCJidWlsdFByb2R1Y3RzIiwiYnVpbHRQcm9kdWN0IiwiYnVpbGRQcm9kdWN0Iiwib3ZlcmxheSIsImluX2FycmF5IiwidGFnIiwiaW1hZ2UiLCJrZWJhYkNhc2UiLCJhZGRUb0NhcnQiLCJ0eXBlIiwiZmF2b3JpdGUiLCJTZXJ2aWNlcyIsImRlZmF1bHRNZXNzYWdlJDQiLCJOb3RJblBhZ2VSYW5nZUV4Y2VwdGlvbiIsImRlZmF1bHRTZXR0aW5ncyQ1IiwiQ29udGFpbmVyJDUiLCJQcm9kdWN0cyQyIiwic2V0Q3VycmVudCIsInRvdGFsUGFnZXMiLCJjYWxjdWxhdGVUb3RhbFBhZ2VzIiwibGlua3MiLCJjcmVhdGVMaW5rcyIsInJlcGxhY2VMaW5rcyIsIm5leHQiLCJjaGlsZE5vZGVzIiwicmVxdWVzdGVkUGFnZSIsImN1cnJlbnQiLCJub3RJblBhZ2VSYW5nZSIsInByZXZpb3VzIiwiZ2V0QXR0cmlidXRlIiwiY2hhbmdlVXJsIiwic2V0QWN0aXZlTGluayIsInVsIiwiY3JlYXRlUGFnZUxpbmtzIiwiY3JlYXRlUHJldmlvdXNCdXR0b24iLCJjcmVhdGVOZXh0QnV0dG9uIiwicGFnZSIsInBhZ2VJdGVtIiwibGluayIsInNwYW4xIiwic3BhbjIiLCJoaXN0b3J5IiwicmVwbGFjZVN0YXRlIiwidXBkYXRlVVJMUGFyYW1ldGVyIiwibG9jYXRpb24iLCJocmVmIiwidmFycyIsInBhcnRzIiwibSIsInBhcmFtIiwicGFyYW1WYWwiLCJuZXdBZGRpdGlvbmFsVVJMIiwidGVtcEFycmF5IiwiYmFzZVVSTCIsImFkZGl0aW9uYWxVUkwiLCJ0ZW1wIiwicm93c1RleHQiLCJkZWZhdWx0TWVzc2FnZSQ1IiwiQ29tcG9uZW50Tm90UmVnaXN0ZXJlZEV4Y2VwdGlvbiIsImRlZmF1bHRTZXR0aW5ncyIsImRlYnVnX2xldmVsIiwiaW5qZWN0X2xpYnJhcmllcyIsImNvbXBvbmVudHMiLCJleHRlcm5hbExpYnJhcmllcyIsImJvb3RzdHJhcCIsIlR1cmJvZUNvbW1lcmNlJDEiLCJsb2FkRXh0ZXJuYWxMaWJyYXJpZXMiLCJiaW5kQ29tcG9uZW50c0RlcGVuZGVuY2llcyIsIlByb3h5IiwidGFyZ2V0IiwibWFrZSIsImxpYnJhcmllcyIsInVjZmlyc3QiLCJhZGRMaW5rZWRTdHlsZSIsImNvbXBvbmVudCIsIkV2ZW50cyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLElBQUlBLGlCQUFrQixZQUFZO0FBQ2xDOztBQUVBOzs7Ozs7OztBQUhrQyxLQVc1QkMsR0FYNEI7QUFBQTtBQUFBO0FBQUE7O0FB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QjtBQUNBRCxhQUFVbEcsTUFBVixHQUFtQixJQUFuQjtBQUNBLFVBQU9rRyxTQUFQO0FBQ0EsR0FKRDs7QUFNQSxPQUFLdkssU0FBTCxDQUFlOUMsSUFBZixDQUFvQixNQUFwQixFQUE0QixVQUFTOEMsU0FBVCxFQUFvQjtBQUMvQyxPQUFJdUssWUFBWSxJQUFJeEssSUFBSixDQUFTQyxTQUFULEVBQW9CeUUsT0FBcEIsRUFBNkJ6RSxVQUFVd0ssTUFBdkMsQ0FBaEI7QUFDQUQsYUFBVWxHLE1BQVYsR0FBbUIsSUFBbkI7QUFDQSxVQUFPa0csU0FBUDtBQUNBLEdBSkQ7O0FBTUEsT0FBS3ZLLFNBQUwsQ0FBZW9ELE1BQWYsQ0FBc0JpQixNQUF0QixHQUErQixLQUEvQjtBQUNBLE9BQUtyRSxTQUFMLENBQWV3RyxRQUFmLENBQXdCbkMsTUFBeEIsR0FBaUMsS0FBakM7QUFDQSxPQUFLckUsU0FBTCxDQUFlOEQsUUFBZixDQUF3Qk8sTUFBeEIsR0FBaUMsS0FBakM7QUFDQSxPQUFLckUsU0FBTCxDQUFlb0UsVUFBZixDQUEwQkMsTUFBMUIsR0FBbUMsS0FBbkM7QUFDQSxPQUFLckUsU0FBTCxDQUFlRCxJQUFmLENBQW9Cc0UsTUFBcEIsR0FBNkIsS0FBN0I7QUFDQTs7QUFFRCxRQUFPeUYsZ0JBQVA7QUFFQyxDQWxoRnFCLEVBQXRCIiwiZmlsZSI6IlR1cmJvZUNvbW1lcmNlLmpzIiwic291cmNlc0NvbnRlbnQiOlsidmFyIFR1cmJvZUNvbW1lcmNlID0gKGZ1bmN0aW9uICgpIHtcbid1c2Ugc3RyaWN0JztcblxuLyoqXHJcbiAqIEBmaWxlIFxyXG4gKiBTdHIgY2xhc3MuXHJcbiAqXHJcbiAqIEFkZHMgc29tZSB1c2VmdWwgZnVuY3Rpb25hbGl0eSBmb3JcclxuICogbWFuaXB1bGF0aW5nIHN0cmluZ3Mgb3IgY3JlYXRpbmcgc3RyaW5nLlxyXG4gKi9cclxuXHJcbmNsYXNzIFN0clxyXG57XHJcblx0LyoqXHJcblx0ICogQ29udmVydCBjYW1lbENhc2UgdG8ga2ViYWItY2FzZS5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSBzdHJpbmcgfCBzdHJpbmdcclxuXHQgKiBAcmV0dXJuIHN0cmluZ1xyXG5cdCAqL1xyXG5cdHN0YXRpYyBrZWJhYkNhc2Uoc3RyaW5nKSBcclxuXHR7XHJcblx0XHRyZXR1cm4gc3RyaW5nLnJlcGxhY2UoLyhbYS16XSkoW0EtWl0pL2csICckMS0kMicpLnRvTG93ZXJDYXNlKCk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBHZW5lcmF0ZXMgYSByYW5kb20gc3RyaW5nLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIGludGVnZXIgfCBsZW5ndGhcclxuXHQgKiBAcmV0dXJuIHN0cmluZ1xyXG5cdCAqL1xyXG5cdHN0YXRpYyByYW5kb20obGVuZ3RoKSBcclxuXHR7XHJcblx0XHRsZXQgc3RyaW5nID0gJyc7XHJcblx0XHRsZXQgcG9zc2libGUgPSBcIkFCQ0RFRkdISUpLTE1OT1BRUlNUVVZXWFlaYWJjZGVmZ2hpamtsbW5vcHFyc3R1dnd4eXowMTIzNDU2Nzg5XCI7XHJcblxyXG5cdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xyXG5cdCAgICBcdHN0cmluZyArPSBwb3NzaWJsZS5jaGFyQXQoTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogcG9zc2libGUubGVuZ3RoKSk7XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIHN0cmluZztcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIENoYW5nZXMgdGhlIGZpcnN0IGxldHRlciBcclxuXHQgKiBvZiB0aGUgc3RyaW5nIHRvIHVwcGVyY2FzZS5cclxuXHQgKiBcclxuXHQgKiBAcGFyYW0gc3RyaW5nIHwgc3RyaW5nXHJcblx0ICogQHJldHVybiBzdHJpbmdcclxuXHQgKi9cclxuXHRzdGF0aWMgdWNmaXJzdChzdHJpbmcpIFxyXG5cdHtcclxuXHQgICAgcmV0dXJuIHN0cmluZy5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSArIHN0cmluZy5zbGljZSgxKTtcclxuXHR9XHJcbn1cblxuY2xhc3MgRXhjZXB0aW9uSGFuZGxlclxyXG57XHJcblx0Y29uc3RydWN0b3IobWVzc2FnZSA9IG51bGwpXHJcblx0e1xyXG5cdFx0aWYgKEVycm9yLmNhcHR1cmVTdGFja1RyYWNlKSB7XHJcblx0XHRcdEVycm9yLmNhcHR1cmVTdGFja1RyYWNlKHRoaXMsIHRoaXMuY29uc3RydWN0b3IubmFtZSk7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBIYW5kbGUgYWxsIHRoZSBlcnJvcnNcclxuXHQgKi9cclxuXHRzdGFja1RyYWNlKGVycm9yLCBtZXNzYWdlKSBcclxuXHR7XHJcblx0XHR0aGlzLmN1c3RvbUFjdGlvbnMoZXJyb3IsIG1lc3NhZ2UpO1xyXG5cclxuXHRcdGxldCBkZWJ1Z0xldmVsID0gVHVyYm9lQ29tbWVyY2UuZGVidWdMZXZlbCgpO1xyXG5cclxuXHRcdGlmIChkZWJ1Z0xldmVsID09ICdlcnJvcicpIHtcclxuICAgIFx0XHR0aGlzLmhhbmRsZUVycm9ycyhlcnJvciwgbWVzc2FnZSk7XHJcbiAgICBcdH0gZWxzZSBpZiAoZGVidWdMZXZlbCA9PSAnd2FybmluZycpIHtcclxuICAgIFx0XHR0aGlzLmhhbmRsZVdhcm5pbmdzKGVycm9yLCBtZXNzYWdlKTtcdFxyXG4gICAgXHR9IGVsc2UgaWYgKGRlYnVnTGV2ZWwgPT0gJ2luZm8nKSB7XHJcbiAgICBcdFx0dGhpcy5oYW5kbGVJbmZvcyhlcnJvciwgbWVzc2FnZSk7XHJcbiAgICBcdH1cclxuXHR9XHJcblxyXG5cdGhhbmRsZUVycm9ycyhlcnJvciwgbWVzc2FnZSlcclxuXHR7XHJcblx0XHRjb25zb2xlLmVycm9yKGVycm9yLmNvbnN0cnVjdG9yLm5hbWUgKyAnOiAnICsgbWVzc2FnZSk7XHJcblx0fVxyXG5cclxuXHRoYW5kbGVXYXJuaW5ncyhlcnJvciwgbWVzc2FnZSlcclxuXHR7XHJcblx0XHRjb25zb2xlLndhcm4oZXJyb3IuY29uc3RydWN0b3IubmFtZSArICc6ICcgKyBtZXNzYWdlKTtcclxuXHR9XHJcblxyXG5cdGhhbmRsZUluZm9zKGVycm9yLCBtZXNzYWdlKVxyXG5cdHtcclxuXHRcdGNvbnNvbGUuaW5mbyhlcnJvci5jb25zdHJ1Y3Rvci5uYW1lICsgJzogJyArIG1lc3NhZ2UpO1xyXG5cdH1cclxuXHJcblx0Y3VzdG9tQWN0aW9ucyhlcnJvciwgbWVzc2FnZSlcclxuXHR7XHJcblx0XHRpZiAoZXJyb3IuY29uc3RydWN0b3IubmFtZSA9PSAnSW52YWxpZEFyZ3VtZW50RXhjZXB0aW9uJykge1xyXG5cdFx0XHQvLyBoYW5kbGVcclxuXHRcdH0gZWxzZSBpZiAoZXJyb3IuY29uc3RydWN0b3IubmFtZSA9PSAnSW52YWxpZEJpbmRpbmdFeGNlcHRpb24nKSB7XHJcblx0XHRcdC8vIGhhbmRsZVxyXG5cdFx0fSBlbHNlIGlmIChlcnJvci5jb25zdHJ1Y3Rvci5uYW1lID09ICdCYWRFdmVudENhbGxFeGNlcHRpb24nKSB7XHJcblx0XHRcdC8vIGhhbmRsZVxyXG5cdFx0fSBlbHNlIGlmIChlcnJvci5jb25zdHJ1Y3Rvci5uYW1lID09ICdDb21wb25lbnRzRXhjZXB0aW9uJykge1xyXG5cdFx0XHQvLyBoYW5kbGVcclxuXHRcdH0gZWxzZSBpZiAoZXJyb3IuY29uc3RydWN0b3IubmFtZSA9PSAnQ29tcG9uZW50Tm90UmVnaXN0ZXJlZEV4Y2VwdGlvbicpIHtcclxuXHRcdFx0Ly8gaGFuZGxlXHJcblx0XHR9IGVsc2UgaWYgKGVycm9yLmNvbnN0cnVjdG9yLm5hbWUgPT0gJ05vdEluUGFnZVJhbmdlRXhjZXB0aW9uJykge1xyXG5cdFx0XHQvLyBoYW5kbGVcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gZmFsc2U7XHJcblx0fVxyXG59XG5cbmxldCBkZWZhdWx0TWVzc2FnZSA9ICdhbiBpbnZhbGlkIGFyZ3VtZW50IHdhcyBwYXNzZWQuJztcclxuXHJcbmNsYXNzIEludmFsaWRBcmd1bWVudEV4Y2VwdGlvbiQxIGV4dGVuZHMgRXhjZXB0aW9uSGFuZGxlclxyXG57XHJcblx0Y29uc3RydWN0b3IobWVzc2FnZSA9IG51bGwpIFxyXG5cdHtcclxuXHRcdG1lc3NhZ2UgPSBtZXNzYWdlIHx8IGRlZmF1bHRNZXNzYWdlO1xyXG5cdFx0c3VwZXIobWVzc2FnZSk7XHJcbiAgICBcdHN1cGVyLnN0YWNrVHJhY2UodGhpcywgbWVzc2FnZSk7XHJcbiAgICB9XHJcbn1cblxuLyoqXHJcbiAqIEBmaWxlIFxyXG4gKiBET00gY2xhc3MuXHJcbiAqXHJcbiAqIEFkZHMgc29tZSB1c2VmdWwgZnVuY3Rpb25hbGl0eSBmb3JcclxuICogZmV0Y2hpbmcgb3IgbWFuaXB1bGF0aW5nIERPTSBlbGVtZW50cy5cclxuICovXHJcblxyXG5jbGFzcyBET01cclxue1xyXG5cdC8qKlxyXG5cdCAqIE1pbmlmaWVzIHRoZSBjc3MgdGV4dC5cclxuXHQgKiBcclxuXHQgKiBAcGFyYW0gc3RyaW5nIHwgc3RyaW5nXHJcblx0ICogQHJldHVybiBzdHJpbmdcclxuXHQgKi9cclxuXHRzdGF0aWMgbWluaWZ5Q3NzKHN0cmluZykgXHJcblx0e1xyXG5cdCAgICBzdHJpbmcgPSBzdHJpbmcucmVwbGFjZSgvXFwvXFwqKD86KD8hXFwqXFwvKVtcXHNcXFNdKSpcXCpcXC98W1xcclxcblxcdF0rL2csICcnKTtcclxuXHQgICAgc3RyaW5nID0gc3RyaW5nLnJlcGxhY2UoLyB7Mix9L2csICcgJyk7XHJcblx0ICAgIHN0cmluZyA9IHN0cmluZy5yZXBsYWNlKC8oW3s6fV0pL2csICckMScpO1xyXG5cdCAgICBzdHJpbmcgPSBzdHJpbmcucmVwbGFjZSgvKFs7LF0pIC9nLCAnJDEnKTtcclxuXHQgICAgc3RyaW5nID0gc3RyaW5nLnJlcGxhY2UoLyAhL2csICchJyk7XHJcblx0ICAgIFxyXG5cdCAgICByZXR1cm4gc3RyaW5nO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogU3dpdGNoZXMgYmV0d2VlbiB0d28gZ2l2ZW4gY2xhc3Nlcy5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSBvYmplY3QgfCBlbGVtZW50XHJcblx0ICogQHBhcmFtIHN0cmluZyB8IGNsYXNzTmFtZVxyXG5cdCAqIEBwYXJhbSBzdHJpbmcgfCBuZXdDbGFzc05hbWVcclxuXHQgKiBAcmV0dXJuIG9iamVjdFxyXG5cdCAqL1xyXG5cdHN0YXRpYyBzd2l0Y2hDbGFzc2VzKGVsZW1lbnQsIGNsYXNzTmFtZSwgbmV3Q2xhc3NOYW1lKSBcclxuXHR7XHJcblx0XHR0aGlzLnJlbW92ZUNsYXNzKGVsZW1lbnQsIGNsYXNzTmFtZSk7XHJcblx0XHR0aGlzLmFkZENsYXNzKGVsZW1lbnQsIG5ld0NsYXNzTmFtZSk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBBZGRzIGNsYXNzIHRvIGEgZ2l2ZW4gZWxlbWVudC5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSBvYmplY3QgfCBlbGVtZW50XHJcblx0ICogQHBhcmFtIHN0cmluZyB8IGNsYXNzTmFtZVxyXG5cdCAqIEByZXR1cm4gb2JqZWN0XHJcblx0ICovXHJcblx0c3RhdGljIGFkZENsYXNzKGVsZW1lbnQsIGNsYXNzTmFtZSkgXHJcblx0e1xyXG5cdFx0aWYoZWxlbWVudCA9PT0gbnVsbCkge1xyXG5cdFx0XHR0aHJvdyBuZXcgSW52YWxpZEFyZ3VtZW50RXhjZXB0aW9uJDE7XHJcblx0XHR9XHJcblxyXG5cdFx0aWYoISBjbGFzc05hbWUgfHwgY2xhc3NOYW1lID09ICcnIHx8IHR5cGVvZiBjbGFzc05hbWUgPT09IHVuZGVmaW5lZCkge1xyXG5cdFx0XHRyZXR1cm4gZWxlbWVudDtcclxuXHRcdH1cclxuXHJcblx0XHRsZXQgY2xhc3NOYW1lcyA9IGNsYXNzTmFtZS5zcGxpdCgnICcpO1xyXG5cclxuXHRcdGNsYXNzTmFtZXMuZm9yRWFjaChmdW5jdGlvbihuYW1lKSB7XHJcblx0XHRcdGVsZW1lbnQuY2xhc3NMaXN0LmFkZChuYW1lKTtcclxuXHRcdH0pO1xyXG5cdFx0XHJcblx0XHRyZXR1cm4gZWxlbWVudDtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFJlbW92ZXMgY2xhc3MgZnJvbSBhIGdpdmVuIGVsZW1lbnQuXHJcblx0ICogXHJcblx0ICogQHBhcmFtIG9iamVjdCB8IGVsZW1lbnRcclxuXHQgKiBAcGFyYW0gc3RyaW5nIHwgY2xhc3NOYW1lXHJcblx0ICogQHJldHVybiBvYmplY3RcclxuXHQgKi9cclxuXHRzdGF0aWMgcmVtb3ZlQ2xhc3MoZWxlbWVudCwgY2xhc3NOYW1lKSBcclxuXHR7XHJcblx0XHRpZihlbGVtZW50ID09IG51bGwpIHtcclxuXHRcdFx0dGhyb3cgbmV3IEludmFsaWRBcmd1bWVudEV4Y2VwdGlvbiQxO1xyXG5cdFx0fVxyXG5cclxuXHRcdGlmKGNsYXNzTmFtZSA9PSAnJykge1xyXG5cdFx0XHRlbGVtZW50LmNsYXNzTmFtZSA9ICcnO1xyXG5cdFx0fSBlbHNlIHtcclxuXHJcblx0XHRcdGxldCBjbGFzc05hbWVzID0gY2xhc3NOYW1lLnNwbGl0KCcgJyk7XHJcblxyXG5cdFx0XHRjbGFzc05hbWVzLmZvckVhY2goZnVuY3Rpb24obmFtZSkge1xyXG5cdFx0XHRcdGVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShuYW1lKTtcclxuXHRcdFx0fSk7XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIGVsZW1lbnQ7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBBZGRzIHN0eWxlIHRhZyB3aXRoIGdpdmVuIGlkIGFuZCBjc3MgdG8gdGhlIERPTS5cclxuXHQgKiBcclxuXHQgKiBAcGFyYW0gc3RyaW5nIHwgaWRcclxuXHQgKiBAcGFyYW0gc3RyaW5nIHwgY3NzXHJcblx0ICogQHJldHVybiB2b2lkXHJcblx0ICovXHJcblx0c3RhdGljIGFkZFN0eWxlKGlkLCBjc3MpXHJcblx0e1xyXG5cdFx0aWYgKHR5cGVvZiBjc3MgIT0gJ3N0cmluZycpIHtcclxuXHRcdFx0dGhyb3cgbmV3IEludmFsaWRBcmd1bWVudEV4Y2VwdGlvbiQxO1xyXG5cdFx0fVxyXG5cclxuXHRcdGxldCBoZWFkID0gZG9jdW1lbnQuaGVhZCB8fCBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnaGVhZCcpWzBdO1xyXG5cdFx0bGV0IHN0eWxlVGFnID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3R5bGUnKTtcclxuXHJcblx0XHQvLyBwaXBlIGl0IHRocm91Z2ggdGhlIG1pbmZpZXJcclxuXHQgICAgbGV0IENTUyA9IHRoaXMubWluaWZ5Q3NzKGNzcyk7XHJcblx0ICAgIC8vIGFkZGluZyBpdCB0byB0aGUgc3R5bGV0YWdcclxuXHQgICAgc3R5bGVUYWcuaW5uZXJIVE1MID0gQ1NTO1xyXG5cdCAgICAvLyBnaXZlIGFuIGlkIHRvIHJlY29nbml6ZSB0aGUgc3R5bGUgdGFnXHJcblx0XHRzdHlsZVRhZy5zZXRBdHRyaWJ1dGUoJ2lkJywgaWQpO1xyXG5cdFx0Ly8gYXBwZW5kaW5nIHRoYXQgc3R5bGUgdGFnIHRvIHRoZSBET00gaGVhZCB0YWdcclxuXHRcdGhlYWQuYXBwZW5kQ2hpbGQoc3R5bGVUYWcpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQWRkcyBsaW5rZWQgc3R5bGUgdGFnIHdpdGggZ2l2ZW4gaWQgYW5kIHNyYyB0byB0aGUgRE9NLlxyXG5cdCAqIFxyXG5cdCAqIEBwYXJhbSBzdHJpbmcgfCBpZFxyXG5cdCAqIEBwYXJhbSBzdHJpbmcgfCBzb3VyY2VcclxuXHQgKiBAcmV0dXJuIHZvaWRcclxuXHQgKi9cclxuXHRzdGF0aWMgYWRkTGlua2VkU3R5bGUoaWQsIHNvdXJjZSkgXHJcblx0e1xyXG5cdFx0aWYgKHR5cGVvZiBzb3VyY2UgIT0gJ3N0cmluZycpIHtcclxuXHRcdFx0dGhyb3cgbmV3IEludmFsaWRBcmd1bWVudEV4Y2VwdGlvbiQxKCdET00uYWRkTGlua2VkU3R5bGUoKSBleGNwZWN0cyB0aGUgc2Vjb25kIHBhcmFtZXRlciB0byBiZSBzdHJpbmcsIGJ1dCAnICsgdHlwZW9mIHNvdXJjZSArICcgd2FzIHBhc3NlZCBpbnN0ZWFkLicpO1xyXG5cdFx0fVxyXG5cclxuXHRcdGxldCBoZWFkID0gZG9jdW1lbnQuaGVhZCB8fCBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnaGVhZCcpWzBdO1xyXG5cdFx0bGV0IGxpbmtlZFN0eWxlVGFnID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGluaycpO1xyXG5cclxuXHQgICAgLy8gZ2l2ZSBhbiBpZCB0byByZWNvZ25pemUgdGhlIHN0eWxlIHRhZ1xyXG5cdFx0bGlua2VkU3R5bGVUYWcuc2V0QXR0cmlidXRlKCdpZCcsIGlkKTtcclxuXHRcdGxpbmtlZFN0eWxlVGFnLnNldEF0dHJpYnV0ZSgnaHJlZicsIHNvdXJjZSk7XHJcblx0XHRsaW5rZWRTdHlsZVRhZy5zZXRBdHRyaWJ1dGUoJ3JlbCcsICdzdHlsZXNoZWV0Jyk7XHJcblx0XHRsaW5rZWRTdHlsZVRhZy5zZXRBdHRyaWJ1dGUoJ3R5cGUnLCAndGV4dC9jc3MnKTtcclxuXHRcdC8vIGFwcGVuZGluZyB0aGF0IHN0eWxlIHRhZyB0byB0aGUgRE9NIGhlYWQgdGFnXHJcblx0XHRoZWFkLmFwcGVuZENoaWxkKGxpbmtlZFN0eWxlVGFnKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIENyZWF0ZXMgYW4gZWxlbWVudCB3aXRoIHRoZSBnaXZlbiBvcHRpb25zLlxyXG5cdCAqIFxyXG5cdCAqIEBwYXJhbSBzdHJpbmcgfCBlbGVtZW50VHlwZVxyXG5cdCAqIEBwYXJhbSBvYmplY3QgfCBvcHRpb25zXHJcblx0ICogQHJldHVybiBIVE1MRWxlbWVudFxyXG5cdCAqL1xyXG5cdHN0YXRpYyBjcmVhdGVFbGVtZW50KGVsZW1lbnRUeXBlLCBvcHRpb25zKVxyXG5cdHtcclxuXHRcdGxldCBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChlbGVtZW50VHlwZSk7XHJcblx0XHJcblx0XHRpZiAob3B0aW9ucyA9PT0gdW5kZWZpbmVkKSB7XHJcblx0XHRcdHJldHVybiBlbGVtZW50O1xyXG5cdFx0fVxyXG5cclxuXHRcdGZvciAobGV0IG9wdGlvbiBpbiBvcHRpb25zKSB7XHJcblx0XHRcdGlmKG9wdGlvbiA9PSAndGV4dCcpIHtcclxuXHRcdFx0XHRlbGVtZW50LmlubmVySFRNTCA9IG9wdGlvbnNbb3B0aW9uXTtcclxuXHRcdFx0XHRjb250aW51ZTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0ZWxlbWVudC5zZXRBdHRyaWJ1dGUob3B0aW9uLCBvcHRpb25zW29wdGlvbl0pO1xyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiBlbGVtZW50O1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogVG9nZ2xlcyB0aGUgZ2l2ZW4gY2xhc3Nlcy5cclxuXHQgKiBcclxuXHQgKiBAcGFyYW0gb2JqZWN0IHwgZWxlbWVudFxyXG5cdCAqIEBwYXJhbSBzdHJpbmcgfCBjbGFzc05hbWVcclxuXHQgKiBAcmV0dXJuIGJvb2xcclxuXHQgKi9cclxuXHRzdGF0aWMgdG9nZ2xlQ2xhc3MoZWxlbWVudCwgY2xhc3NOYW1lLCBzZWNvbmRDbGFzc05hbWUpXHJcblx0e1xyXG5cdFx0aWYgKGVsZW1lbnQgPT0gbnVsbCB8fCB0eXBlb2YgZWxlbWVudCA9PSAndW5kZWZpbmVkJykge1xyXG5cdFx0XHR0aHJvdyBuZXcgSW52YWxpZEFyZ3VtZW50RXhjZXB0aW9uJDE7XHJcblx0XHR9XHJcblxyXG5cdFx0c2Vjb25kQ2xhc3NOYW1lID0gc2Vjb25kQ2xhc3NOYW1lIHx8IHVuZGVmaW5lZDtcclxuXHJcblx0XHRpZihzZWNvbmRDbGFzc05hbWUpIHtcclxuXHRcdFx0ZWxlbWVudC5jbGFzc0xpc3QudG9nZ2xlKHNlY29uZENsYXNzTmFtZSk7XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIGVsZW1lbnQuY2xhc3NMaXN0LnRvZ2dsZShjbGFzc05hbWUpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogRmluZHMgYW4gZWxlbWVudCBpbnNpZGUgb2YgcGFyZW50LlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIHN0cmluZyB8IHNlbGVjdG9yXHJcblx0ICogQHBhcmFtIG9iamVjdCB8IGNvbnRleHRcclxuXHQgKiBAcmV0dXJuIG1peGVkXHJcblx0ICovXHJcblx0c3RhdGljIGZpbmQoc2VsZWN0b3IsIGNvbnRleHQgPSB3aW5kb3cuZG9jdW1lbnQpIFxyXG5cdHtcclxuXHRcdHJldHVybiBxdWVyeUVsZW1lbnQoc2VsZWN0b3IsIGNvbnRleHQpO1xyXG5cdH1cclxufVxyXG5cclxuLyoqXHJcbiAqIFF1ZXJpZXMgYW4gZWxlbWVudCBmcm9tIHRoZSBET00uXHJcbiAqXHJcbiAqIEBwYXJhbSBzdHJpbmcgfCBzZWxlY3RvclxyXG4gKiBAcGFyYW0gb2JqZWN0IHwgcGFyZW50RWxlbWVudFxyXG4gKiBAcmV0dXJuIG1peGVkXHJcbiAqL1xyXG5mdW5jdGlvbiBxdWVyeUVsZW1lbnQoc2VsZWN0b3IsIHBhcmVudEVsZW1lbnQpIFxyXG57XHJcblx0bGV0IGVsZW1lbnQgPSBwYXJlbnRFbGVtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3IpO1xyXG5cclxuXHRpZiAoZWxlbWVudC5sZW5ndGggPT0gMCkge1xyXG5cdFx0cmV0dXJuIG51bGw7XHJcblx0fVxyXG5cclxuXHRyZXR1cm4gKGVsZW1lbnQubGVuZ3RoID4gMSkgPyBlbGVtZW50IDogZWxlbWVudFswXTtcclxufVxyXG5cclxuLyoqXHJcbiAqIENoZWNrcyBpZiBwYXJlbnQgaGFzIGNoaWxkLlxyXG4gKlxyXG4gKiBAcGFyYW0gb2JqZWN0IHwgcGFyZW50RWxlbWVudFxyXG4gKiBAcGFyYW0gb2JqZWN0IHwgY2hpbGRFbGVtZW50XHJcbiAqIEByZXR1cm4gYm9vbFxyXG4gKi9cclxuZnVuY3Rpb24gaGFzQ2hpbGQocGFyZW50RWxlbWVudCwgY2hpbGRFbGVtZW50KSBcclxue1xyXG4gICAgIGxldCBub2RlID0gY2hpbGRFbGVtZW50LnBhcmVudE5vZGU7XHJcbiAgICAgXHJcbiAgICAgd2hpbGUgKG5vZGUgIT0gbnVsbCkge1xyXG4gICAgICAgICBpZiAobm9kZSA9PSBwYXJlbnRFbGVtZW50KSB7XHJcbiAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgfVxyXG4gICAgICAgICBub2RlID0gbm9kZS5wYXJlbnROb2RlO1xyXG4gICAgIH1cclxuICAgICBcclxuICAgICByZXR1cm4gZmFsc2U7XHJcbn1cblxuLyoqXHJcbiAqIEBmaWxlIFxyXG4gKiBDb21tb24gY2xhc3MuXHJcbiAqXHJcbiAqIEFkZHMgc29tZSB1c2VmdWwgZnVuY3Rpb25hbGl0eSBmb3JcclxuICogY29tbW9uIHRhc2tzIC0gZGF0YSBjaGVja3Mgb3IgZGF0YSBtYW5pcHVsYXRpb24uXHJcbiAqL1xyXG5cclxuY2xhc3MgQ29tbW9uXHJcbntcclxuXHQvKipcclxuXHQgKiBFeHRlbmQgYW4gb2JqZWN0LlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIG9iamVjdCB8IGN1cnJlbnRPYmplY3RcclxuXHQgKiBAcGFyYW0gb2JqZWN0IHwgbmV3T2JqZWN0XHJcblx0ICogQHJldHVybiBvYmplY3RcclxuXHQgKi9cclxuXHRzdGF0aWMgZXh0ZW5kKGN1cnJlbnRPYmplY3QsIG5ld09iamVjdCkge1xyXG5cdFx0dmFyIGV4dGVuZGVkID0ge307XHJcblx0ICAgIHZhciBwcm9wO1xyXG5cclxuXHQgICAgZm9yIChwcm9wIGluIGN1cnJlbnRPYmplY3QpIHtcclxuXHQgICAgICAgIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoY3VycmVudE9iamVjdCwgcHJvcCkpIHtcclxuXHQgICAgICAgICAgICBleHRlbmRlZFtwcm9wXSA9IGN1cnJlbnRPYmplY3RbcHJvcF07XHJcblx0ICAgICAgICB9XHJcblx0ICAgIH1cclxuXHJcblx0ICAgIGZvciAocHJvcCBpbiBuZXdPYmplY3QpIHtcclxuXHQgICAgICAgIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwobmV3T2JqZWN0LCBwcm9wKSkge1xyXG5cdCAgICAgICAgICAgIGV4dGVuZGVkW3Byb3BdID0gbmV3T2JqZWN0W3Byb3BdO1xyXG5cdCAgICAgICAgfVxyXG5cdCAgICB9XHJcblxyXG5cdCAgICByZXR1cm4gZXh0ZW5kZWQ7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBDaGVja3MgZm9yIGEgbmVlZGxlIGluIGh5c3RhY2sgYXJyYXkuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gbWl4ZWQgfCBuZWVkbGVcclxuXHQgKiBAcGFyYW0gb2JqZWN0IHwgb2JqZWN0XHJcblx0ICogQHJldHVybiBib29sXHJcblx0ICpcclxuXHQgKi9cclxuXHRzdGF0aWMgaW5fYXJyYXkobmVlZGxlLCBoeXN0YWNrKSB7XHJcblx0XHRpZihoeXN0YWNrLmNvbnN0cnVjdG9yICE9PSBBcnJheSkge1xyXG5cdFx0XHR0aHJvdyBuZXcgSW52YWxpZEFyZ3VtZW50RXhjZXB0aW9uJDE7XHJcblx0XHR9XHJcblxyXG5cdFx0Zm9yKHZhciBpID0gMDsgaSA8PSBoeXN0YWNrLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdGlmKG5lZWRsZSA9PSBoeXN0YWNrW2ldKSB7XHJcblx0XHRcdFx0cmV0dXJuIHRydWU7XHRcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdFxyXG5cdFx0cmV0dXJuIGZhbHNlO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogVGFrZXMgYW4gYXJyYXkgYW5kIGNodW5rcyBpdC5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSBhcnJheSB8IHRvdGFsXHJcblx0ICogQHBhcmFtIG51bWJlciB8IGNodW5rc1xyXG5cdCAqIEByZXR1cm4gYXJyYXlcclxuXHQgKi9cclxuXHRzdGF0aWMgYXJyYXlfY2h1bmsodG90YWwsIHNpemUgPSA1KVxyXG5cdHsgICAgICAgIFxyXG4gICAgICBcdGlmIChpc05hTihzaXplKSkge1xyXG4gICAgICBcdFx0dGhyb3cgbmV3IEludmFsaWRBcmd1bWVudEV4Y2VwdGlvbiQxKCdDb21tb24uYXJyYXlfY2h1bmsoKSBleHBlY3RzIHRoZSBzZWNvbmQgcGFyYW1ldGVyIHRvIGJlIGEgbnVtYmVyLCBidXQgJyArIHR5cGVvZiBzaXplICsgJyBwYXNzZWQgaW5zdGVhZC4nKVxyXG4gICAgICBcdH1cclxuXHJcbiAgICAgIFx0c2l6ZSA9IHBhcnNlSW50KHNpemUpO1xyXG4gICAgICAgXHJcbiAgICAgICBcdGxldCBpO1xyXG4gICAgICAgXHRsZXQgY29sbGVjdGlvbiA9IFtdO1xyXG5cclxuICAgICAgICAvLyBhZGQgZWFjaCBjaHVuayB0byB0aGUgcmVzdWx0XHJcbiAgICAgICAgZm9yIChpID0gMDsgaSA8IE1hdGguY2VpbCh0b3RhbC5sZW5ndGggLyBzaXplKTsgaSsrKSB7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB2YXIgc3RhcnQgPSBpICogc2l6ZTtcclxuICAgICAgICAgICAgdmFyIGVuZCA9IHN0YXJ0ICsgc2l6ZTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGNvbGxlY3Rpb24ucHVzaCh0b3RhbC5zbGljZShzdGFydCwgZW5kKSk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICByZXR1cm4gY29sbGVjdGlvbjtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIENoZWNrcyBpZiBhbiBvYmplY3QgaXMgZW1wdHkuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gb2JqZWN0IHwgb2JqZWN0XHJcblx0ICogQHJldHVybiBib29sXHJcblx0ICovXHJcblx0c3RhdGljIGVtcHR5T2JqZWN0KG9iamVjdCkge1xyXG5cdFx0Zm9yIChsZXQgcHJvcCBpbiBvYmplY3QpIHtcclxuXHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiB0cnVlO1xyXG5cdH1cclxuXHJcblxyXG5cdC8qKlxyXG5cdCAqIENoZWNrcyBpZiBhIGdpdmVuIG9iamVjdCBjb250YWluZWQgaW4gYW4gYXJyYXkuXHJcblx0ICogXHJcblx0ICogQHBhcmFtIG9iamVjdCB8IG9iamVjdFxyXG5cdCAqIEBwYXJhbSBhcnJheSB8IGhheXN0YWNrXHJcblx0ICogQHJldHVybiBib29sXHJcblx0ICovXHJcblx0c3RhdGljIGNvbnRhaW5zT2JqZWN0KG9iamVjdCwgaHlzdGFjaykgXHJcblx0e1xyXG5cdCAgICBsZXQgaTtcclxuXHJcblx0ICAgIGZvciAoaSA9IDA7IGkgPCBoeXN0YWNrLmxlbmd0aDsgaSsrKSB7XHJcblx0ICAgICAgICBpZiAodHlwZW9mIG9iamVjdCA9PSAnc3RyaW5nJyAmJiBoeXN0YWNrW2ldLmNvbnN0cnVjdG9yLm5hbWUgPT09IG9iamVjdCkge1xyXG5cdCAgICAgICAgXHRyZXR1cm4gdHJ1ZTtcclxuXHQgICAgICAgIH1cclxuXHJcblx0ICAgICAgICBpZiAoaHlzdGFja1tpXSA9PT0gb2JqZWN0KSB7XHJcblx0ICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcblx0ICAgICAgICB9XHJcblx0ICAgIH1cclxuXHJcblx0ICAgIHJldHVybiBmYWxzZTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIENoZWNrcyBpZiBhIGdpdmVuIHBhcmFtZXRlciBpcyBhbiBvYmplY3QuXHJcblx0ICogXHJcblx0ICogQHBhcmFtIG9iamVjdCB8IG9iamVjdFxyXG5cdCAqIEByZXR1cm4gYm9vbFxyXG5cdCAqL1xyXG5cdHN0YXRpYyBpc09iamVjdChvYmplY3QpIFxyXG5cdHtcclxuXHRcdHJldHVybiB0eXBlb2Ygb2JqZWN0ID09ICdvYmplY3QnO1xyXG5cdH1cclxufVxuXG5sZXQgZGVmYXVsdE1lc3NhZ2UkMSA9ICdUaGUgZGF0YSBzdHJ1Y3R1cmUgaXMgaW52YWxpZCc7XHJcblxyXG5jbGFzcyBJbnZhbGlkRGF0YVN0cnVjdHVyZUV4Y2VwdGlvbiBleHRlbmRzIEV4Y2VwdGlvbkhhbmRsZXJcclxue1xyXG5cdGNvbnN0cnVjdG9yKG1lc3NhZ2UgPSBudWxsKSBcclxuXHR7XHJcblx0XHRtZXNzYWdlID0gbWVzc2FnZSB8fCBkZWZhdWx0TWVzc2FnZSQxO1xyXG5cdFx0c3VwZXIobWVzc2FnZSk7XHJcbiAgICBcdHN1cGVyLnN0YWNrVHJhY2UodGhpcywgbWVzc2FnZSk7XHJcbiAgICB9XHJcbn1cblxuLyoqXHJcbiAqIEBmaWxlIFxyXG4gKiBSZXF1ZXN0IGNsYXNzLlxyXG4gKlxyXG4gKiBIYW5kbGVzIGFqYXggcmVxdWVzdHMgUE9TVCwgR0VUIGV0Yy4uLlxyXG4gKi9cclxuXHJcbi8qKlxyXG4gKiBTdG9yZXMgdGhlIGRlZmF1bHQgc2V0dGluZ3MuXHJcbiAqXHJcbiAqIEB2YXIgb2JqZWN0XHJcbiAqL1xyXG5cclxubGV0IGRlZmF1bHRTZXR0aW5ncyQxID0ge1xyXG5cdGhlYWRlcnM6IHtcclxuXHRcdCdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbidcclxuXHR9LFxyXG5cdGFzeW5jOiB0cnVlXHJcbn07XHJcblxyXG5jbGFzcyBSZXF1ZXN0XHJcbntcclxuXHQvKipcclxuXHQgKiAtIEluaXRpYWxpemUgdGhlIHNldHRpbmdzIG9iamVjdC5cclxuXHQgKiAtIEluaXRpYWxpemUgdGhlIHhociBvYmplY3QuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gb2JqZWN0IHwgc2V0dGluZ3NcclxuXHQgKiBAcmV0dXJuIHZvaWRcclxuXHQgKi9cclxuXHRjb25zdHJ1Y3RvcihzZXR0aW5ncylcclxuXHR7XHJcblx0XHR0aGlzLnhociA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpIHx8IG5ldyBBY3RpdmVYT2JqZWN0KFwiTWljcm9zb2Z0LlhNTEhUVFBcIik7XHJcblx0XHR0aGlzLnNldHRpbmdzID0gQ29tbW9uLmV4dGVuZChkZWZhdWx0U2V0dGluZ3MkMSwgc2V0dGluZ3MpO1xyXG5cdFx0dGhpcy5zZXREZWZhdWx0UmVxdWVzdEhlYWRlcigpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogU2V0cyB0aGUgZGVmYXVsdCByZXF1ZXN0IGhlYWRlcnMuXHJcblx0ICpcclxuXHQgKiBAcmV0dXJuIHZvaWRcclxuXHQgKi9cclxuXHRzZXREZWZhdWx0UmVxdWVzdEhlYWRlcigpXHJcblx0e1xyXG5cdFx0bGV0IGhlYWRlcjtcclxuXHRcdGxldCBoZWFkZXJzID0gdGhpcy5zZXR0aW5ncy5oZWFkZXJzO1xyXG5cdFx0bGV0IGFzeW5jID0gdGhpcy5zZXR0aW5ncy5hc3luYztcclxuXHRcdGxldCBvcGVuID0gWE1MSHR0cFJlcXVlc3QucHJvdG90eXBlLm9wZW47XHJcblx0XHRsZXQgc2V0UmVxdWVzdEhlYWRlciA9IFhNTEh0dHBSZXF1ZXN0LnByb3RvdHlwZS5zZXRSZXF1ZXN0SGVhZGVyO1xyXG5cclxuXHRcdFhNTEh0dHBSZXF1ZXN0LnByb3RvdHlwZS5vcGVuID0gZnVuY3Rpb24oKSB7XHJcblx0XHRcdHZhciByZXNwb25zZSA9IG9wZW4uYXBwbHkodGhpcywgYXJndW1lbnRzLCBhc3luYyk7XHJcblxyXG5cdFx0XHRmb3IgKGhlYWRlciBpbiBoZWFkZXJzKSB7XHJcblx0XHRcdFx0dGhpcy5zZXRSZXF1ZXN0SGVhZGVyKGhlYWRlciwgaGVhZGVyc1toZWFkZXJdKTtcclxuXHRcdFx0fVxyXG5cclxuXHQgIFx0XHRyZXR1cm4gcmVzcG9uc2U7XHJcblx0XHR9O1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogTWFrZXMgYSBQT1NUIHJlcXVlc3QuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gb2JqZWN0IHwgb3B0aW9uc1xyXG5cdCAqIEByZXR1cm4gUHJvbWlzZVxyXG5cdCAqL1xyXG5cdHBvc3Qob3B0aW9ucylcclxuXHR7XHJcblx0XHRsZXQgeGhyID0gdGhpcy54aHI7XHJcblxyXG5cdFx0aWYob3B0aW9ucy5oYXNPd25Qcm9wZXJ0eSgnYmVmb3JlJykgJiYgdHlwZW9mIG9wdGlvbnMuYmVmb3JlID09ICdmdW5jdGlvbicpIHtcclxuXHRcdFx0b3B0aW9ucy5iZWZvcmUuY2FsbCh0aGlzKTtcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XHJcblx0XHRcdGlmKHR5cGVvZiBvcHRpb25zICE9PSAnb2JqZWN0Jykge1xyXG5cdFx0XHRcdHRocm93IG5ldyBFcnJvcignZ2V0IGV4cGVjdGluZyBhIGpzb24gb2JqZWN0IHRvIGJlIHBhc3NlZCBhcyBhbiBhcmd1bWVudCwgYnV0ICcrIHR5cGVvZiBvcHRpb25zICsgJyB3YXMgcGFzc2VkLicpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRvcHRpb25zLmRhdGEgPSBvcHRpb25zLmRhdGEgfHwge307XHJcblxyXG5cdFx0XHRpZih0eXBlb2Ygb3B0aW9ucy5kYXRhICE9PSAnb2JqZWN0Jykge1xyXG5cdFx0XHRcdHRocm93IG5ldyBFcnJvcignZGF0YSBwcm9wZXJ0eSBleHBlY3RpbmcgYSBqc29uIG9iamVjdCB0byBiZSBwYXNzZWQgYXMgYW4gYXJndW1lbnQsIGJ1dCAnICsgdHlwZW9mIG9wdGlvbnMuZGF0YSArICcgd2FzIHBhc3NlZC4nKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0eGhyLm9wZW4oJ1BPU1QnLCBvcHRpb25zLnVybCwgdHJ1ZSk7XHJcblxyXG5cdFx0XHR4aHIucmVzcG9uc2VUeXBlID0gb3B0aW9ucy5kYXRhVHlwZSB8fCAnanNvbic7XHJcblx0XHRcdHhoci50aW1lb3V0ID0gb3B0aW9ucy50aW1lb3V0IHx8IDMwMDA7XHJcblxyXG5cdFx0XHR4aHIub25yZWFkeXN0YXRlY2hhbmdlID0gZnVuY3Rpb24oKSB7XHJcblx0XHRcdCAgICBpZih0aGlzLnJlYWR5U3RhdGUgIT0gNCB8fCB0aGlzLnN0YXR1cyAhPSAyMDApIHtcclxuXHRcdFx0ICAgIFx0cmV0dXJuO1xyXG5cdFx0XHQgICAgfVxyXG5cdCAgICAgICBcdFxyXG4gICAgICAgXHRcdFx0cmVzb2x2ZSh0aGlzLnJlc3BvbnNlKTtcclxuICAgICAgIFx0XHRcdFxyXG4gICAgICAgXHRcdFx0aWYob3B0aW9ucy5oYXNPd25Qcm9wZXJ0eSgnYWZ0ZXInKSAmJiB0eXBlb2Ygb3B0aW9ucy5hZnRlciA9PSAnZnVuY3Rpb24nKSB7XHJcblx0XHRcdFx0XHRvcHRpb25zLmFmdGVyLmNhbGwodGhpcyk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9O1xyXG5cclxuXHRcdFx0eGhyLm9uZXJyb3IgPSBmdW5jdGlvbihtZXNzYWdlKSB7XHJcblx0XHRcdFx0b3B0aW9ucy5lcnJvcihtZXNzYWdlKTtcclxuXHRcdFx0XHRyZWplY3QobWVzc2FnZSk7XHJcblx0XHRcdH07XHJcblxyXG5cdFx0XHRpZighIG9wdGlvbnMuZGF0YSkge1xyXG5cdFx0XHRcdHhoci5zZW5kKG51bGwpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHR2YXIgcXVlcnlTdHJpbmcgPSBPYmplY3Qua2V5cyhvcHRpb25zLmRhdGEpLm1hcChmdW5jdGlvbihrZXkpIHtcclxuXHRcdCAgICAgICAgICAgIHJldHVybiBlbmNvZGVVUklDb21wb25lbnQoa2V5KSArICc9JyArXHJcblx0XHQgICAgICAgICAgICAgICAgXHRlbmNvZGVVUklDb21wb25lbnQob3B0aW9ucy5kYXRhW2tleV0pO1xyXG5cdFx0ICAgICAgICBcdH0pLmpvaW4oJyYnKTtcclxuXHJcblx0XHRcdHhoci5zZW5kKHF1ZXJ5U3RyaW5nKTtcclxuXHRcdH0pO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogTWFrZXMgYSBHRVQgYWpheCByZXF1ZXN0LlxyXG5cdCAqIFxyXG5cdCAqIEBwYXJhbSBvYmplY3QgfCBvcHRpb25zXHJcblx0ICogQHJldHVybiBQcm9taXNlXHJcblx0ICovXHJcblx0Z2V0KG9wdGlvbnMpXHJcblx0e1xyXG5cdFx0bGV0IHhociA9IHRoaXMueGhyO1xyXG5cclxuXHRcdGlmKG9wdGlvbnMuaGFzT3duUHJvcGVydHkoJ2JlZm9yZScpICYmIHR5cGVvZiBvcHRpb25zLmJlZm9yZSA9PSAnZnVuY3Rpb24nKSB7XHJcblx0XHRcdG9wdGlvbnMuYmVmb3JlLmNhbGwodGhpcyk7XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xyXG5cdFx0XHRpZih0eXBlb2Ygb3B0aW9ucyAhPT0gJ29iamVjdCcpIHtcclxuXHRcdFx0XHR0aHJvdyBuZXcgRXJyb3IoJ2dldCBleHBlY3RpbmcgYSBqc29uIG9iamVjdCB0byBiZSBwYXNzZWQgYXMgYW4gYXJndW1lbnQsIGJ1dCAnKyB0eXBlb2Ygb3B0aW9ucyArICcgd2FzIHBhc3NlZC4nKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0b3B0aW9ucy5kYXRhID0gb3B0aW9ucy5kYXRhIHx8IHt9O1xyXG5cclxuXHRcdFx0aWYodHlwZW9mIG9wdGlvbnMuZGF0YSAhPT0gJ29iamVjdCcpIHtcclxuXHRcdFx0XHR0aHJvdyBuZXcgRXJyb3IoJ2RhdGEgcHJvcGVydHkgZXhwZWN0aW5nIGEganNvbiBvYmplY3QgdG8gYmUgcGFzc2VkIGFzIGFuIGFyZ3VtZW50LCBidXQgJyArIHR5cGVvZiBvcHRpb25zLmRhdGEgKyAnIHdhcyBwYXNzZWQuJyk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHhoci5vcGVuKCdHRVQnLCBvcHRpb25zLnVybCwgdHJ1ZSk7XHJcblxyXG5cdFx0XHR4aHIucmVzcG9uc2VUeXBlID0gb3B0aW9ucy5kYXRhVHlwZSB8fCAnanNvbic7XHJcblx0XHRcdHhoci50aW1lb3V0ID0gb3B0aW9ucy50aW1lb3V0IHx8IDMwMDA7XHJcblxyXG5cdFx0XHR4aHIub25yZWFkeXN0YXRlY2hhbmdlID0gZnVuY3Rpb24oKSB7XHJcblx0XHRcdCAgICBpZih0aGlzLnJlYWR5U3RhdGUgIT0gNCB8fCB0aGlzLnN0YXR1cyAhPSAyMDApIHtcclxuXHRcdFx0ICAgIFx0cmV0dXJuO1xyXG5cdFx0XHQgICAgfVxyXG5cdCAgICAgICBcdFxyXG4gICAgICAgXHRcdFx0cmVzb2x2ZSh0aGlzLnJlc3BvbnNlKTtcclxuICAgICAgIFx0XHRcdFxyXG4gICAgICAgXHRcdFx0aWYob3B0aW9ucy5oYXNPd25Qcm9wZXJ0eSgnYWZ0ZXInKSAmJiB0eXBlb2Ygb3B0aW9ucy5hZnRlciA9PSAnZnVuY3Rpb24nKSB7XHJcblx0XHRcdFx0XHRvcHRpb25zLmFmdGVyLmNhbGwodGhpcyk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9O1xyXG5cclxuXHRcdFx0eGhyLm9uZXJyb3IgPSBmdW5jdGlvbihtZXNzYWdlKSB7XHJcblx0XHRcdFx0b3B0aW9ucy5lcnJvcihtZXNzYWdlKTtcclxuXHRcdFx0XHRyZWplY3QobWVzc2FnZSk7XHJcblx0XHRcdH07XHJcblxyXG5cdFx0XHRpZighIG9wdGlvbnMuZGF0YSkge1xyXG5cdFx0XHRcdHhoci5zZW5kKG51bGwpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHR2YXIgcXVlcnlTdHJpbmcgPSBPYmplY3Qua2V5cyhvcHRpb25zLmRhdGEpLm1hcChmdW5jdGlvbihrZXkpIHtcclxuXHRcdCAgICAgICAgICAgIHJldHVybiBlbmNvZGVVUklDb21wb25lbnQoa2V5KSArICc9JyArXHJcblx0XHQgICAgICAgICAgICAgICAgXHRlbmNvZGVVUklDb21wb25lbnQob3B0aW9ucy5kYXRhW2tleV0pO1xyXG5cdFx0ICAgICAgICBcdH0pLmpvaW4oJyYnKTtcclxuXHJcblx0XHRcdHhoci5zZW5kKHF1ZXJ5U3RyaW5nKTtcclxuXHRcdH0pO1xyXG5cdH1cclxufVxuXG5sZXQgZGVmYXVsdE1lc3NhZ2UkMiA9ICd0cnlpbmcgdG8gYmluZCBhbiBhbHJlYWR5IGV4aXN0aW5nIGJvdW5kLic7XHJcblxyXG5jbGFzcyBJbnZhbGlkQmluZGluZ0V4Y2VwdGlvbiBleHRlbmRzIEV4Y2VwdGlvbkhhbmRsZXJcclxue1xyXG5cdGNvbnN0cnVjdG9yKG1lc3NhZ2UgPSBudWxsKSBcclxuXHR7XHJcblx0XHRtZXNzYWdlID0gbWVzc2FnZSB8fCBkZWZhdWx0TWVzc2FnZSQyO1xyXG5cdFx0c3VwZXIobWVzc2FnZSk7XHJcbiAgICBcdHN1cGVyLnN0YWNrVHJhY2UodGhpcywgbWVzc2FnZSk7XHJcbiAgICB9XHJcbn1cblxuLyoqXHJcbiAqIEBmaWxlIFxyXG4gKiBDb250YWluZXIgY2xhc3MuXHJcbiAqXHJcbiAqIEhhbmRsZXMvQ29udHJvbHMgdGhlIGRlcGVuZGVuY2llcyBvZiBlY29tbWVyY2UuXHJcbiAqL1xyXG5cclxuLyoqXHJcbiAqIFN0b3JlcyB0aGUgaW5zdGFuY2VzXHJcbiAqXHJcbiAqIEB2YXIgYXJyYXlcclxuICovXHJcbmxldCBpbnN0YW5jZXMgPSBbXTtcclxuXHJcbmNsYXNzIENvbnRhaW5lciBcclxue1xyXG5cdC8qKlxyXG5cdCAqIEJpbmRzIGtleSB0byBjb25jcmV0ZSBjbGFzcy5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSBzdHJpbmcgfCBrZXlcclxuXHQgKiBAcGFyYW0gY2xhc3MgfCBjb25jcmV0ZVxyXG5cdCAqIEByZXR1cm4gdm9pZFxyXG5cdCAqL1xyXG5cdGJpbmQoa2V5LCBjb25jcmV0ZSkgXHJcblx0e1xyXG5cdFx0aWYgKHR5cGVvZiBrZXkgIT0gJ3N0cmluZycpIHtcclxuXHRcdFx0dGhyb3cgbmV3IEludmFsaWRBcmd1bWVudEV4Y2VwdGlvbiQxKCdiaW5kKCkgZXhwZWN0cyB0aGUgZmlyc3QgcGFyYW1ldGVyIHRvIGJlIHN0cmluZywgYnV0ICcgKyB0eXBlb2Yga2V5ICsgJyB3YXMgcGFzc2VkIGluc3RlYWQuJyk7XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKHR5cGVvZiBjb25jcmV0ZSAhPSAnZnVuY3Rpb24nKSB7IFxyXG5cdFx0XHR0aHJvdyBuZXcgSW52YWxpZEFyZ3VtZW50RXhjZXB0aW9uJDEoJ2JpbmQoKSBleHBlY3RzIHRoZSBzZWNvbmQgcGFyYW1ldGVyIHRvIGJlIGEgZnVuY3Rpb24sIGJ1dCAnICsgdHlwZW9mIGNvbmNyZXRlICsgJyB3YXMgcGFzc2VkIGluc3RlYWQuJyk7XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKHR5cGVvZiB0aGlzW2tleV0gIT0gJ3VuZGVmaW5lZCcpIHtcclxuXHRcdFx0dGhyb3cgbmV3IEludmFsaWRCaW5kaW5nRXhjZXB0aW9uKCdiaW5kKCkgcmVjaWV2ZWQgYW4gYWxyZWFkeSBleGlzdGluZyBiaW5kLicpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHRoaXNba2V5XSA9IGNvbmNyZXRlLmJpbmQoY29uY3JldGUsIHRoaXMpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogU2V0cyBhbiBpbnN0YW5jZS5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSBzdHJpbmcgfCBrZXlcclxuXHQgKiBAcGFyYW0gb2JqZWN0IHwgaW5zdGFuY2VcclxuXHQgKiBAcGFyYW0gc3RyaW5nIHwgYWxpYXNcclxuXHQgKiBAcmV0dXJuIHZvaWRcclxuXHQgKi9cclxuXHRzZXRJbnN0YW5jZShrZXksIGluc3RhbmNlLCBhbGlhcyA9IG51bGwpIFxyXG5cdHtcclxuXHRcdGlmICh0eXBlb2Yga2V5ICE9ICdzdHJpbmcnKSB7XHJcblx0XHRcdHRocm93IG5ldyBJbnZhbGlkQXJndW1lbnRFeGNlcHRpb24kMSgnc2V0SW5zdGFjZSgpIGV4cGVjdHMgdGhlIGZpcnN0IHBhcmFtZXRlciB0byBiZSBhIHN0cmluZywgYnV0ICcgKyB0eXBlb2Yga2V5ICsgJyB3YXMgcGFzc2VkIGluc3RlYWQuJyk7XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKHR5cGVvZiBpbnN0YW5jZSAhPSAnb2JqZWN0Jykge1xyXG5cdFx0XHR0aHJvdyBuZXcgSW52YWxpZEFyZ3VtZW50RXhjZXB0aW9uJDEoJ3NldEluc3RhbmNlKCkgZXhwZWN0cyB0aGUgc2Vjb25kIHBhcmFtZXRlciB0byBiZSBhbiBvYmplY3QsIGJ1dCAnICsgdHlwZW9mIGluc3RhbmNlICsgJyB3YXMgcGFzc2VkIGluc3RlYWQuJyk7XHJcblx0XHR9XHJcblxyXG5cdFx0aW5zdGFuY2VzW2tleV0gPSBpbnN0YW5jZTtcclxuXHRcdGluc3RhbmNlc1thbGlhc10gPSBpbnN0YW5jZTtcclxuXHRcdHRoaXNba2V5XSA9IGluc3RhbmNlO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogUmVzb2x2ZXMgYW4gaW5zdGFuY2Ugb3V0IG9mIFxyXG5cdCAqIHRoZSBpb2MgY29udGFpbmVyLlxyXG5cdCAqIFxyXG5cdCAqIEBwYXJhbSBzdHJpbmcgfCBrZXlcclxuXHQgKiBAcmV0dXJuIG9iamVjdFxyXG5cdCAqL1xyXG5cdGdldEluc3RhbmNlKGtleSkgXHJcblx0e1xyXG5cdFx0aWYodHlwZW9mIGtleSAhPSAnc3RyaW5nJykge1xyXG5cdFx0XHR0aHJvdyBuZXcgSW52YWxpZEFyZ3VtZW50RXhjZXB0aW9uJDEoJ2dldEluc3RhY2UoKSBleHBlY3RzIHRoZSBmaXJzdCBwYXJhbWV0ZXIgdG8gYmUgYSBzdHJpbmcsIGJ1dCAnICsgdHlwZW9mIGtleSArICcgd2FzIHBhc3NlZCBpbnN0ZWFkLicpO1xyXG5cdFx0fVxyXG5cclxuXHRcdGlmKHR5cGVvZiBrZXkgPT0gJ29iamVjdCcpIHtcclxuXHRcdFx0cmV0dXJuIGluc3RhbmNlc1trZXkuY29uc3RydWN0b3IubmFtZV0gfHwgbnVsbDtcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gaW5zdGFuY2VzW2tleV0gfHwgbnVsbDtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIENoZWNrcyBpZiBhbiBpbnN0YW5jZSBleGlzdC5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSBtaXhlZCB8IGluc3RhbmNlXHJcblx0ICogQHJldHVybiBib29sXHJcblx0ICovXHJcblx0aW5zdGFuY2VFeGlzdChpbnN0YW5jZSkgXHJcblx0e1xyXG5cdFx0aWYgKHR5cGVvZiBpbnN0YW5jZSA9PSAnb2JqZWN0Jykge1xyXG5cdFx0XHRyZXR1cm4gKHR5cGVvZiBpbnN0YW5jZXNbaW5zdGFuY2UuY29uc3RydWN0b3IubmFtZV0gIT09ICd1bmRlZmluZWQnKTtcclxuXHRcdH0gZWxzZSBpZiAodHlwZW9mIGluc3RhbmNlID09ICdzdHJpbmcnKSB7XHJcblx0XHRcdHJldHVybiAodHlwZW9mIGluc3RhbmNlc1tpbnN0YW5jZV0gIT09ICd1bmRlZmluZWQnKVxyXG5cdFx0fVxyXG5cdFx0XHJcblx0XHR0aHJvdyBuZXcgSW52YWxpZEFyZ3VtZW50RXhjZXB0aW9uJDEoJ2luc3RhbmNlRXhpc3QoKSBleHBlY3RzIHRoZSBmaXJzdCBwYXJhbWV0ZXIgdG8gYmUgc3RyaW5nIG9yIGFuIG9iamVjdCwgYnV0ICcgKyB0eXBlb2YgaW5zdGFuY2UgKyAnIHdhcyBwYXNzZWQgaW5zdGVhZC4nKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFJldHJpZXZlIGFuIG9iamVjdCwgaWYgbm90IGV4aXN0c1xyXG5cdCAqIHdpbGwgY3JlYXRlIGl0LCBzZXQgaXQgaW4gdGhlIGlvYyBjb250YWluZXJcclxuXHQgKiBmb3IgbGF0ZXIgdXNlIGFuZCByZXRyaWV2ZSBpdC5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSBtaXhlZCB8IG9iamVjdCBcclxuXHQgKiBAcmV0dXJuIG9iamVjdFxyXG5cdCAqL1xyXG5cdG1ha2Uob2JqZWN0KVxyXG5cdHtcclxuXHRcdGxldCBpbnN0YW5jZSA9IHt9O1xyXG5cdFx0bGV0IGtleTtcclxuXHJcblx0XHRpZiAodGhpcy5pbnN0YW5jZUV4aXN0KG9iamVjdCkpIHtcclxuXHRcdFx0cmV0dXJuIHRoaXMuZ2V0SW5zdGFuY2Uob2JqZWN0KTtcclxuXHRcdH1cclxuXHJcblx0XHRpZiAodHlwZW9mIG9iamVjdCA9PSAnb2JqZWN0Jykge1xyXG5cdFx0XHRpbnN0YW5jZSA9IG9iamVjdDtcclxuXHRcdFx0a2V5ID0gb2JqZWN0LmNvbnN0cnVjdG9yLm5hbWU7XHJcblx0XHRcdHRoaXMuc2V0SW5zdGFuY2Uoa2V5LCBpbnN0YW5jZSk7IFxyXG5cdFx0fSBlbHNlIGlmKHR5cGVvZiBvYmplY3QgPT0gJ3N0cmluZycgJiYgdGhpcy5oYXNPd25Qcm9wZXJ0eShvYmplY3QpKSB7XHJcblx0XHRcdGluc3RhbmNlID0gbmV3IHRoaXNbb2JqZWN0XTtcclxuXHRcdFx0a2V5ID0gb2JqZWN0O1xyXG5cdFx0XHR0aGlzLnNldEluc3RhbmNlKGtleSwgaW5zdGFuY2UpO1x0XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHR0aHJvdyBuZXcgSW52YWxpZEJpbmRpbmdFeGNlcHRpb24oJ1RoZSBwYXJhbWV0ZXIgeW91IHBhc3NlZCBjb3VsZCBub3QgYmUgYm91bmRlZCB0byB0aGUgY29udGFpbmVyLCBwYXJhbWV0ZXI6ICcgKyB0eXBlb2Ygb2JqZWN0KTtcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gaW5zdGFuY2U7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBSZXRyaWV2ZSBhbGwgaW5zdGFuY2VzLlxyXG5cdCAqXHJcblx0ICogQHJldHVybiBhcnJheVxyXG5cdCAqL1xyXG5cdGluc3RhbmNlcygpIFxyXG5cdHtcclxuXHRcdHJldHVybiBpbnN0YW5jZXM7XHJcblx0fVxyXG59XG5cbmxldCBkZWZhdWx0TWVzc2FnZSQzID0gJ1RoZSBldmVudCB5b3UgY2FsbGVkIGRvZXMgbm90IGV4aXN0cyBvciB5b3Ugc3VwcGxpZWQgd3JvbmcgYXJndW1lbnQnO1xyXG5cclxuY2xhc3MgQmFkRXZlbnRDYWxsRXhjZXB0aW9uIGV4dGVuZHMgRXhjZXB0aW9uSGFuZGxlclxyXG57XHJcblx0Y29uc3RydWN0b3IobWVzc2FnZSA9IG51bGwpIFxyXG5cdHtcclxuXHRcdG1lc3NhZ2UgPSBtZXNzYWdlIHx8IGRlZmF1bHRNZXNzYWdlJDM7XHJcblx0XHRzdXBlcihtZXNzYWdlKTtcclxuICAgIFx0c3VwZXIuc3RhY2tUcmFjZSh0aGlzLCBtZXNzYWdlKTtcclxuICAgIH1cclxufVxuXG4vKipcclxuICogQGZpbGUgXHJcbiAqIEV2ZW50TWFuYWdlciBjbGFzcy5cclxuICpcclxuICogSGFuZGxlcyBzdWJzY3JpcGlvbnMgYW5kIHB1Ymxpc2hpbmcgb2YgZXZlbnRzLlxyXG4gKi9cclxuXHJcbi8qKlxyXG4gKiBTdG9yZXMgdGhlIGV2ZW50cyBjYWxsYmFja3MuXHJcbiAqIFxyXG4gKiBAdmFyIGFycmF5XHJcbiAqL1xyXG5sZXQgZXZlbnRzID0ge307XHJcblxyXG5jbGFzcyBFdmVudE1hbmFnZXJcclxue1xyXG5cdC8qKlxyXG5cdCAqIFN1YnNjcmliaW5nIHRvIGFuIGV2ZW50LlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIHN0cmluZyB8IG5hbWVcclxuXHQgKiBAcGFyYW0gZnVuY3Rpb24gfCBjYWxsYmFja1xyXG5cdCAqIEByZXR1cm4gdm9pZFxyXG5cdCAqL1xyXG5cdHN1YnNjcmliZShuYW1lLCBjYWxsYmFjaykgXHJcblx0e1xyXG5cdFx0aWYgKHR5cGVvZiBjYWxsYmFjayAhPT0gJ2Z1bmN0aW9uJykge1xyXG5cdFx0XHR0aHJvdyBuZXcgSW52YWxpZEFyZ3VtZW50RXhjZXB0aW9uO1xyXG5cdFx0fVxyXG5cclxuXHRcdGlmICh0eXBlb2YgZXZlbnRzW25hbWVdID09ICd1bmRlZmluZWQnKSB7XHJcblx0XHRcdGV2ZW50c1tuYW1lXSA9IFtdO1xyXG5cdFx0fVxyXG5cclxuXHRcdGV2ZW50c1tuYW1lXS5wdXNoKGNhbGxiYWNrKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFB1Ymxpc2ggYW4gZXZlbnQgdG8gYWxsIHN1YnNjcmliZXJzLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIHN0cmluZyB8IG5hbWVcclxuXHQgKiBAcGFyYW0gbGlzdCB8IGRhdGFcclxuXHQgKiBAcmV0dXJuIHZvaWRcclxuXHQgKi9cclxuXHRwdWJsaXNoKG5hbWUsIC4uLmRhdGEpIFxyXG5cdHtcclxuXHRcdGRhdGEgPSBkYXRhIHx8IG51bGw7XHJcblxyXG5cdFx0Ly8gSWYgdGhlcmUgYXJlIG5vIHN1YnNjcmliZXJzIHNpbXBseSBpZ25vcmUgdGhhdCBldmVudC5cclxuXHRcdGlmICh0eXBlb2YgZXZlbnRzW25hbWVdID09ICd1bmRlZmluZWQnKSB7XHJcblx0XHRcdHJldHVybjtcclxuXHRcdH1cclxuXHJcblx0XHRldmVudHNbbmFtZV0uZm9yRWFjaChmdW5jdGlvbihjYWxsYmFjaykge1xyXG5cdFx0XHRpZih0eXBlb2YgY2FsbGJhY2sgIT0gJ2Z1bmN0aW9uJykge1xyXG5cdFx0XHRcdHRocm93IG5ldyBJbnZhbGlkQXJndW1lbnRFeGNlcHRpb24oJ2xpc3RlbigpIHNob3VsZCByZWNpZXZlIGNhbGxiYWNrIGFzIHNlY29uZCBwYXJhbWV0ZXIsIGJ1dCAnKyB0eXBlb2YgY2FsbGJhY2sgKycgd2FzIHBhc3NlZCcpO1xyXG5cdFx0XHR9XHJcblx0XHRcdFxyXG5cdFx0XHRyZXR1cm4gY2FsbGJhY2soLi4uZGF0YSk7XHJcblx0XHR9KTtcclxuXHR9XHJcbn1cblxuLyoqXHJcbiAqIEBmaWxlIFxyXG4gKiBDb29raWUgY2xhc3MuXHJcbiAqXHJcbiAqIEFkZHMgc29tZSB1c2VmdWwgZnVuY3Rpb25hbGl0eSBmb3JcclxuICogc2V0dGluZyBvciBnZXR0aW5nIGNvb2tpZXMuXHJcbiAqL1xyXG5cdFxyXG5jbGFzcyBDb29raWVcclxue1xyXG5cdC8qKlxyXG4gXHQqIFNldHMgYSBjb29raWUuXHJcbiBcdCogXHJcbiBcdCogQHBhcmFtIHN0cmluZyB8IG5hbWVcclxuIFx0KiBAcGFyYW0gSlNPTiB8IHZhbHVlXHJcbiBcdCogQHBhcmFtIGludGVnZXIgfCBkYXlzXHJcbiBcdCogQHJldHVybiB2b2lkXHJcblx0Ki9cclxuXHRzdGF0aWMgc2V0KG5hbWUsIHZhbHVlLCBkYXlzKSBcclxuXHR7XHJcblx0XHRpZiAodmFsdWUuY29uc3RydWN0b3IubmFtZSAgPT0gJ09iamVjdCcgfHwgdmFsdWUuY29uc3RydWN0b3IubmFtZSA9PSAnQXJyYXknKSB7XHJcblx0XHRcdHZhbHVlID0gSlNPTi5zdHJpbmdpZnkodmFsdWUpO1xyXG5cdFx0fVxyXG5cclxuXHRcdGRheXMgPSBkYXlzIHx8IDEwO1xyXG5cclxuXHQgICAgbGV0IGV4cGlyZXM7XHJcblx0ICAgIFxyXG5cdCAgICBpZiAoZGF5cykge1xyXG5cdCAgICAgICAgbGV0IGRhdGUgPSBuZXcgRGF0ZSgpO1xyXG5cdCAgICAgICAgZGF0ZS5zZXRUaW1lKGRhdGUuZ2V0VGltZSgpICsgKGRheXMgKiAyNCAqIDYwICogNjAgKiAxMDAwKSk7XHJcblx0ICAgICAgICBleHBpcmVzID0gXCI7IGV4cGlyZXM9XCIgKyBkYXRlLnRvR01UU3RyaW5nKCk7XHJcblx0ICAgIH0gZWxzZSB7XHJcblx0ICAgICAgICBleHBpcmVzID0gXCJcIjtcclxuXHQgICAgfVxyXG5cclxuXHQgICAgZG9jdW1lbnQuY29va2llID0gbmFtZSArIFwiPVwiICsgdmFsdWUgKyBleHBpcmVzICsgXCI7IHBhdGg9L1wiO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogUmV0cmlldmVzIHRoZSBjb29raWUgYnkgbmFtZS5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSBzdHJpbmcgfCBuYW1lXHJcbiBcdCAqIEByZXR1cm4gSlNPTlxyXG5cdCAqL1xyXG5cdHN0YXRpYyBnZXQobmFtZSkgXHJcblx0e1xyXG5cdCAgICBpZiAoZG9jdW1lbnQuY29va2llLmxlbmd0aCA+IDApIHtcclxuXHQgICAgICAgIGxldCBjX3N0YXJ0ID0gZG9jdW1lbnQuY29va2llLmluZGV4T2YobmFtZSArIFwiPVwiKTtcclxuXHQgICAgICAgIFxyXG5cdCAgICAgICAgaWYgKGNfc3RhcnQgIT0gLTEpIHtcclxuXHQgICAgICAgICAgICBjX3N0YXJ0ID0gY19zdGFydCArIG5hbWUubGVuZ3RoICsgMTtcclxuXHQgICAgICAgICAgICBsZXQgY19lbmQgPSBkb2N1bWVudC5jb29raWUuaW5kZXhPZihcIjtcIiwgY19zdGFydCk7XHJcblx0ICAgICAgICAgICAgXHJcblx0ICAgICAgICAgICAgaWYgKGNfZW5kID09IC0xKSB7XHJcblx0ICAgICAgICAgICAgICAgIGNfZW5kID0gZG9jdW1lbnQuY29va2llLmxlbmd0aDtcclxuXHQgICAgICAgICAgICB9XHJcblxyXG5cdCAgICAgICAgICAgIHJldHVybiBKU09OLnBhcnNlKHVuZXNjYXBlKGRvY3VtZW50LmNvb2tpZS5zdWJzdHJpbmcoY19zdGFydCwgY19lbmQpKSk7XHJcblx0ICAgICAgICB9XHJcblx0ICAgIH1cclxuXHJcblx0ICAgIHJldHVybiB7fTtcclxuXHR9XHJcbn1cblxuLyoqXHJcbiAqIEBmaWxlIFxyXG4gKiBDYXJ0IGNsYXNzLlxyXG4gKlxyXG4gKiBIYW5kbGVzIGFkZGluZywgcmVtb3ZpbmcgZXRjLi4uIG9mIGl0ZW1zLlxyXG4gKi9cclxuXHJcbi8qKlxyXG4gKiBUaGUgZGVmYXVsdCBzZXR0aW5ncyBvZiB0aGUgY2FydC5cclxuICpcclxuICogQHZhciBvYmplY3RcclxuICovXHJcbmxldCBkZWZhdWx0U2V0dGluZ3MkMiA9IHtcclxuXHRlbGVtZW50OiAnLmNhcnQnLFxyXG5cdGNvb2tpZV9uYW1lOiAnY2FydCcsXHJcblx0cHJldmlld19jbGFzczogJycsXHJcblx0bG9hZGVyOiAnL2ltYWdlcy9pY29ucy9zcGlubmVyLnN2ZycsXHJcblx0Y2xhc3M6ICcnLFxyXG5cdHdpZHRoOiAnNjBweCcsXHJcblx0aGVpZ2h0OiAnNjBweCcsXHJcblx0cGxhY2VtZW50OiAncmlnaHQtdG9wJyxcclxuXHRmaXhlZDogdHJ1ZSxcclxuXHRob3Zlcl9jb2xvcjogJ29yYW5nZSdcclxufTtcclxuXHJcbi8qKlxyXG4gKiBTdG9yZXMgdGhlIGNvbnRhaW5lciBvYmplY3QuXHJcbiAqXHJcbiAqIEB2YXIgXFxDb3JlXFxDb250YWluZXJcclxuICovXHJcbmxldCBDb250YWluZXIkMjtcclxuXHJcbi8qKlxyXG4gKiBTdG9yZXMgdGhlIGV2ZW50IG1hbmFnZXIgb2JqZWN0LlxyXG4gKlxyXG4gKiBAdmFyIFxcQ29yZVxcRXZlbnRNYW5hZ2VyXHJcbiAqL1xyXG5sZXQgRXZlbnRNYW5hZ2VyJDI7XHJcblxyXG4vKipcclxuICogU3RvcmVzIHRoZSByZXF1ZXN0IG9iamVjdC5cclxuICpcclxuICogQHZhciBcXEhlbHBlcnNcXFJlcXVlc3RcclxuICovXHJcbmxldCBIdHRwO1xyXG5cclxuLyoqXHJcbiAqIFN0b3JlcyB0aGUgY2FydCBsb2FkZXIuXHJcbiAqXHJcbiAqIEB2YXIgSFRNTERpdkVsZW1lbnRcclxuICovXHJcbmxldCBsb2FkaW5nT3ZlcmxheTtcclxuXHJcbi8qKlxyXG4gKiBTdG9yZXMgdGhlIGl0ZW1zIHdyYXBwZXIuXHJcbiAqXHJcbiAqIEB2YXIgSFRNTERpdkVsZW1lbnRcclxuICovXHJcbmxldCBpdGVtc0RpdjtcclxuXHJcbmNsYXNzIENhcnQgXHJcbntcclxuXHQvKipcclxuXHQgKiAtIEluaXRpYWxpemUgdGhlIElvQyBjb250YWluZXJcclxuXHQgKiAtIEluaXRpYWxpemUgdGhlIFJlcXVlc3RcclxuXHQgKiAtIEluaXRpYWxpemUgdGhlIEV2ZW50TWFuYWdlclxyXG5cdCAqIC0gQ3JlYXRlcyB0aGUgcHJldmlldyBhbmQgdGhlIGljb24gb2YgdGhlIGNhcnQuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gXFxDb3JlXFxDb250YWluZXIgfCBjb250YWluZXJcclxuXHQgKiBAcGFyYW0gXFxIZWxwZXJzXFxSZXF1ZXN0IHwgaHR0cFxyXG5cdCAqIEBwYXJhbSBcXENvcmVcXEV2ZW50TWFuYWdlciB8IGV2ZW50TWFuYWdlclxyXG5cdCAqIEByZXR1cm4gdm9pZFxyXG5cdCAqL1xyXG5cdGNvbnN0cnVjdG9yKGNvbnRhaW5lciwgaHR0cCwgZXZlbnRNYW5hZ2VyKSBcclxuXHR7XHJcblx0XHRDb250YWluZXIkMiA9IGNvbnRhaW5lcjtcclxuXHRcdEh0dHAgPSBodHRwO1xyXG5cdFx0RXZlbnRNYW5hZ2VyJDIgPSBldmVudE1hbmFnZXI7XHJcblx0XHRcclxuXHRcdHRoaXMucHJldmlld0VsZW1lbnQgPSB0aGlzLmNyZWF0ZVByZXZpZXdFbGVtZW50KCk7XHJcblx0XHR0aGlzLnN2Z0ljb24gPSBjcmVhdGVJY29uLmNhbGwodGhpcyk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBTZXRzIHRoZSBvYmplY3QgYnkgdGhlIHVzZXJzIHNldHRpbmcuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gb2JqZWN0IHwgc2V0dGluZ3NcclxuXHQgKiBAcmV0dXJuIHZvaWRcclxuXHQgKi9cclxuXHRzZXR1cChzZXR0aW5ncylcclxuXHR7XHJcblx0XHRpZih0eXBlb2Ygc2V0dGluZ3MgIT0gJ29iamVjdCcpIHtcclxuXHRcdFx0dGhyb3cgbmV3IEludmFsaWRBcmd1bWVudEV4Y2VwdGlvbiQxO1xyXG5cdFx0fVxyXG5cclxuXHRcdHRoaXMuc2V0dGluZ3MgPSBDb21tb24uZXh0ZW5kKGRlZmF1bHRTZXR0aW5ncyQyLCBzZXR0aW5ncyk7XHJcblxyXG5cdFx0dGhpcy5zZXRFbGVtZW50KHRoaXMuc2V0dGluZ3MuZWxlbWVudCk7XHJcblxyXG5cdFx0RE9NLmFkZENsYXNzKHRoaXMucHJldmlld0VsZW1lbnQsICdjbG9zZWQnKTtcclxuXHRcdERPTS5hZGRDbGFzcyh0aGlzLnByZXZpZXdFbGVtZW50LCB0aGlzLnNldHRpbmdzLnByZXZpZXdfY2xhc3MpO1xyXG5cdFx0XHJcblx0XHR0aGlzLmJpbmRFdmVudExpc3RlbmVycygpO1xyXG5cdFx0dGhpcy5hZGRTdHlsZVRhZygpO1xyXG5cclxuXHRcdGlmKHRoaXMuaXNFbXB0eShDb29raWUuZ2V0KHRoaXMuc2V0dGluZ3MuY29va2llX25hbWUpKSkge1xyXG5cdFx0XHR0aGlzLmNhcnQgPSB7fTtcclxuXHRcdFx0dGhpcy5zZXRDYXJ0KHRoaXMuY2FydCk7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBDaGVja3MgaWYgdGhlIGNhcnQgaXMgZW1wdHlcclxuXHQgKlxyXG5cdCAqIEBwYXJhbSBvYmplY3QgfCBjYXJ0XHJcblx0ICogQHJldHVybiBib29sXHJcblx0ICovXHJcblx0aXNFbXB0eShjYXJ0KVxyXG5cdHtcclxuXHRcdHJldHVybiBDb21tb24uZW1wdHlPYmplY3QoY2FydCk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBJbml0aWFsaXplL1NldHMgdGhlIGNhcnQgYXMgYSBjb29raWUuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gb2JqZWN0IHwgY2FydFxyXG5cdCAqIEByZXR1cm4gdm9pZFxyXG5cdCAqL1xyXG5cdHNldENhcnQoY2FydClcclxuXHR7XHJcblx0XHR0aGlzLmNhcnQuaWQgPSBTdHIucmFuZG9tKDEwKTtcclxuXHRcdHRoaXMuY2FydC5pdGVtcyA9IFtdO1xyXG5cdFx0dGhpcy5jYXJ0LmZhdm9yaXRlcyA9IFtdO1xyXG5cdFx0Q29va2llLnNldCh0aGlzLnNldHRpbmdzLmNvb2tpZV9uYW1lLCBjYXJ0LCAyKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEFkZHMgYW4gaXRlbSB0byB0aGUgY2FydC5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSBvYmplY3QgfCBpdGVtXHJcblx0ICogQHJldHVybiB2b2lkXHJcblx0ICovXHJcblx0YWRkSXRlbShpdGVtKVxyXG5cdHtcclxuXHRcdHRoaXMuY2FydCA9IENvb2tpZS5nZXQodGhpcy5zZXR0aW5ncy5jb29raWVfbmFtZSk7XHJcblxyXG5cdFx0dGhpcy5jYXJ0Lml0ZW1zLnB1c2goaXRlbSk7XHJcblxyXG5cdFx0Q29va2llLnNldCh0aGlzLnNldHRpbmdzLmNvb2tpZV9uYW1lLCB0aGlzLmNhcnQsIDIpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogUmVtb3ZlcyBhbiBpdGVtIGZyb20gdGhlIGNhcnQuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gb2JqZWN0IHwgaXRlbVxyXG5cdCAqIEByZXR1cm4gdm9pZFxyXG5cdCAqL1xyXG5cdHJlbW92ZUl0ZW0oaXRlbSlcclxuXHR7XHJcbiBcdFx0dGhpcy5jYXJ0ID0gQ29va2llLmdldCh0aGlzLnNldHRpbmdzLmNvb2tpZV9uYW1lKTtcclxuXHJcbiBcdFx0dGhpcy5jYXJ0Lml0ZW1zLnNwbGljZSh0aGlzLmNhcnQuaXRlbXMuaW5kZXhPZihpdGVtKSwgMSk7XHJcblxyXG4gXHRcdENvb2tpZS5zZXQodGhpcy5zZXR0aW5ncy5jb29raWVfbmFtZSwgdGhpcy5jYXJ0LCAyKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEFkZHMgdGhlIGl0ZW0gdG8gcHJldmlldy5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSBhcnJheSB8IGl0ZW1zXHJcblx0ICogQHJldHVybiB2b2lkXHJcblx0ICovXHJcblx0YWRkVG9QcmV2aWV3KGl0ZW1zKVxyXG5cdHtcclxuXHRcdGl0ZW1zRGl2LmlubmVySFRNTCA9ICcnO1xyXG5cclxuXHRcdGZvciAobGV0IGkgPSAwOyBpIDwgaXRlbXMubGVuZ3RoOyBpKyspIHtcclxuXHJcblx0XHRcdGxldCBsaSA9IERPTS5jcmVhdGVFbGVtZW50KCdsaScsIHtcclxuXHRcdFx0XHRcdGNsYXNzOiAnaXRlbSdcclxuXHRcdFx0XHR9KTtcclxuXHJcblx0XHRcdGxldCBhdHRyaWJ1dGVzID0gaXRlbXNbaV07XHJcblxyXG5cdFx0XHRmb3IobGV0IGF0dHJpYnV0ZSBpbiBhdHRyaWJ1dGVzKSB7XHJcblx0XHRcdFx0bGV0IHNwYW4gPSBET00uY3JlYXRlRWxlbWVudCgnc3BhbicsIHtcclxuXHRcdFx0XHRcdHRleHQ6IGF0dHJpYnV0ZXNbYXR0cmlidXRlXVxyXG5cdFx0XHRcdH0pO1xyXG5cclxuXHRcdFx0XHRsaS5hcHBlbmRDaGlsZChzcGFuKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0aXRlbXNEaXYuYXBwZW5kQ2hpbGQobGkpO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQmluZHMgZXZlcnRoaW5nIHRvIHRoZSBlbGVtZW50LlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIHN0cmluZyB8IHNlbGVjdG9yXHJcblx0ICogQHJldHVybiB2b2lkXHJcblx0ICovXHJcblx0c2V0RWxlbWVudChzZWxlY3RvcilcclxuXHR7XHJcblx0XHR0aGlzLmljb24gPSBET00uZmluZChzZWxlY3Rvcik7XHJcblxyXG5cdFx0aWYgKHRoaXMuaWNvbikge1xyXG5cdFx0XHRET00uYWRkQ2xhc3ModGhpcy5pY29uLCB0aGlzLnNldHRpbmdzLmNsYXNzKTtcclxuXHRcdFx0RE9NLmFkZENsYXNzKHRoaXMuaWNvbiwgdGhpcy5zZXR0aW5ncy5wbGFjZW1lbnQpO1xyXG5cdFx0XHR0aGlzLmljb24uYXBwZW5kQ2hpbGQodGhpcy5zdmdJY29uKTtcclxuXHRcdFx0dGhpcy5pY29uLmFwcGVuZENoaWxkKHRoaXMucHJldmlld0VsZW1lbnQpO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQ3JlYXRlcyB0aGUgY2FydCBkZXRhaWxzIHByZXZpZXcgZWxlbWVudC5cclxuXHQgKlxyXG5cdCAqIEByZXR1cm4gSFRNTERpdkVsZW1lbnRcclxuXHQgKi9cclxuXHRjcmVhdGVQcmV2aWV3RWxlbWVudCgpXHJcblx0e1xyXG5cdFx0bGV0IHByZXZpZXdFbGVtZW50ID0gRE9NLmNyZWF0ZUVsZW1lbnQoJ2RpdicsIHtcclxuXHRcdFx0aWQ6ICdwcmV2aWV3J1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0aXRlbXNEaXYgPSBET00uY3JlYXRlRWxlbWVudCgndWwnLCB7XHJcblx0XHRcdFx0Y2xhc3M6ICdpdGVtcydcclxuXHRcdFx0fSk7XHJcblxyXG5cdFx0cHJldmlld0VsZW1lbnQuYXBwZW5kQ2hpbGQoaXRlbXNEaXYpO1xyXG5cclxuXHRcdHJldHVybiBwcmV2aWV3RWxlbWVudDtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEFkZCB0aGUgZUNvbW1lcmNlIHN0eWxlIHRhZ3MgdG8gdGhlIERPTS5cclxuXHQgKlxyXG5cdCAqIEByZXR1cm4gdm9pZFxyXG5cdCAqL1xyXG5cdGFkZFN0eWxlVGFnKCkgXHJcblx0e1xyXG5cdFx0aWYoRE9NLmZpbmQoJyNlQ29tbWVyY2UtQ2FydCcpKSB7XHJcblx0XHRcdHJldHVybjtcclxuXHRcdH1cclxuXHJcblx0XHRsZXQgcG9zaXRpb24gPSAodGhpcy5zZXR0aW5ncy5maXhlZCkgPyAnZml4ZWQnIDogJ2Fic29sdXRlJztcclxuXHJcblx0XHRsZXQgY3NzID0gYFxyXG5cdFx0XHQke3RoaXMuc2V0dGluZ3MuZWxlbWVudH0ge1xyXG5cdFx0XHRcdHBvc2l0aW9uOiAke3Bvc2l0aW9ufTtcclxuXHRcdFx0XHRjdXJzb3I6IHBvaW50ZXI7XHJcblx0XHRcdFx0Y29sb3I6ICNmZmZmZmY7XHJcblx0XHRcdFx0ei1pbmRleDogOTk4O1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHQke3RoaXMuc2V0dGluZ3MuZWxlbWVudH0gPiBzdmcge1xyXG5cdFx0XHRcdHdpZHRoOiAke3RoaXMuc2V0dGluZ3Mud2lkdGh9O1xyXG5cdFx0XHRcdGhlaWdodDogJHt0aGlzLnNldHRpbmdzLmhlaWdodH07XHJcblx0XHRcdFx0dHJhbnNpdGlvbjogZmlsbCAwLjNzO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHQke3RoaXMuc2V0dGluZ3MuZWxlbWVudH0gPiBzdmc6aG92ZXIge1xyXG5cdFx0XHRcdGZpbGw6ICR7dGhpcy5zZXR0aW5ncy5ob3Zlcl9jb2xvcn07XHJcblx0XHRcdFx0dHJhbnNpdGlvbjogZmlsbCAwLjNzO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHQke3RoaXMuc2V0dGluZ3MuZWxlbWVudH0udG9wLXJpZ2h0LFxyXG5cdFx0XHQke3RoaXMuc2V0dGluZ3MuZWxlbWVudH0ucmlnaHQtdG9wIHtcclxuXHRcdFx0XHRyaWdodDogMTBweDtcclxuXHRcdFx0XHR0b3A6IDEwcHg7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdCR7dGhpcy5zZXR0aW5ncy5lbGVtZW50fS5sZWZ0LXRvcCxcclxuXHRcdFx0JHt0aGlzLnNldHRpbmdzLmVsZW1lbnR9LnRvcC1sZWZ0IHtcclxuXHRcdFx0XHRsZWZ0OiAxMHB4O1xyXG5cdFx0XHRcdHRvcDogMTBweDtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0JHt0aGlzLnNldHRpbmdzLmVsZW1lbnR9ID4gI3ByZXZpZXcge1xyXG5cdFx0XHRcdHBvc2l0aW9uOiAke3Bvc2l0aW9ufTtcclxuXHRcdFx0XHR6LWluZGV4OiA5OTk5O1xyXG5cdFx0XHRcdHRvcDogY2FsYygxMHB4ICsgJHt0aGlzLnNldHRpbmdzLmhlaWdodH0pO1xyXG5cdFx0XHRcdHRyYW5zZm9ybTogdHJhbnNsYXRlWCg2MHB4KTtcclxuXHRcdFx0XHRoZWlnaHQ6IDQwMHB4O1xyXG5cdFx0XHRcdHdpZHRoOiAzMDBweDtcclxuXHRcdFx0XHRib3JkZXI6IDFweCBzb2xpZCAjZTRlNGU0O1xyXG5cdFx0XHRcdGJhY2tncm91bmQ6ICNmZmZmZmY7XHJcblx0XHRcdFx0dHJhbnNpdGlvbjogdHJhbnNmb3JtIDFzLCB2aXNpYmlsaXR5IDFzO1xyXG5cdFx0XHRcdGN1cnNvcjogZGVmYXVsdDtcclxuXHRcdFx0XHRvdmVyZmxvdy1ZOiBzY3JvbGw7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdCR7dGhpcy5zZXR0aW5ncy5lbGVtZW50fSA+ICNwcmV2aWV3Lm9wZW5lZCB7XHJcblx0XHRcdFx0dmlzaWJpbGl0eTogdmlzaWJsZTtcclxuXHRcdFx0XHR0cmFuc2Zvcm06IHRyYW5zbGF0ZVgoLTI0MHB4KTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0JHt0aGlzLnNldHRpbmdzLmVsZW1lbnR9ID4gI3ByZXZpZXcuY2xvc2VkIHtcclxuXHRcdFx0XHR2aXNpYmlsaXR5OiBoaWRkZW47XHJcblx0XHRcdFx0dHJhbnNmb3JtOiB0cmFuc2xhdGVYKDYwcHgpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHQke3RoaXMuc2V0dGluZ3MuZWxlbWVudH0gPiAjcHJldmlldyA+IHVsLml0ZW1zLFxyXG5cdFx0XHQke3RoaXMuc2V0dGluZ3MuZWxlbWVudH0gPiAjcHJldmlldyA+IHVsLml0ZW1zID4gbGkuaXRlbSB7XHJcblx0XHRcdFx0Y29sb3I6ICMwMDAwMDA7XHJcblx0XHRcdFx0bGlzdC1zdHlsZS10eXBlOiBub25lO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHQke3RoaXMuc2V0dGluZ3MuZWxlbWVudH0gLml0ZW1zLmxvYWRpbmcge1xyXG5cdFx0XHRcdGRpc3BsYXk6IG5vbmU7XHJcblx0XHRcdFx0b3ZlcmZsb3ctWTogbm9uZTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0JHt0aGlzLnNldHRpbmdzLmVsZW1lbnR9IC5jYXJ0LWxvYWRlci1vdmVybGF5IHtcclxuXHRcdFx0XHRwb3NpdGlvbjogZml4ZWQ7XHJcblx0XHRcdFx0dG9wOiAwOyBcclxuXHRcdFx0ICAgIGxlZnQ6IDA7XHJcblx0XHRcdCAgICByaWdodDogMDtcclxuXHRcdFx0ICAgIGJvdHRvbTogMDtcclxuXHRcdFx0XHRiYWNrZ3JvdW5kOiAjZmZmZmZmO1xyXG5cdFx0XHRcdHdpZHRoOiAxMDAlO1xyXG5cdFx0XHRcdGhlaWdodDogMTAwJTtcclxuXHRcdFx0XHRtaW4taGVpZ2h0OiAxMDAlO1xyXG5cdFx0XHRcdG92ZXJmbG93OiBhdXRvO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHQke3RoaXMuc2V0dGluZ3MuZWxlbWVudH0gLmNhcnQtbG9hZGVyLW92ZXJsYXkgLmNhcnQtbG9hZGVyIHtcclxuXHRcdFx0XHRwb3NpdGlvbjogYWJzb2x1dGU7XHJcblx0XHRcdFx0d2lkdGg6IDUwcHg7XHJcblx0XHRcdFx0aGVpZ2h0OiA1MHB4O1xyXG5cdFx0XHRcdG1hcmdpbi1sZWZ0OiAtMjVweDtcclxuXHRcdFx0XHRtYXJnaW4tdG9wOiAtMjVweDtcclxuXHRcdFx0XHRsZWZ0OiA1MCU7XHJcblx0XHRcdFx0cmlnaHQ6IDUwJTtcclxuXHRcdFx0XHR0b3A6IDUwJTtcclxuXHRcdFx0XHRib3R0b206IDUwJTtcclxuXHRcdFx0fVxyXG5cdFx0YDtcclxuXHQgICAgXHJcblx0ICAgIERPTS5hZGRTdHlsZSgnVHVyYm8tZUNvbW1lcmNlLUNhcnQnLCBjc3MpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQ3JlYXRlcyBhbiBsb2FkaW5nIG92ZXJsYXkuXHJcblx0ICpcclxuXHQgKiBAcmV0dXJuIEhUTUxEaXZFbGVtZW50XHJcblx0ICovXHJcblx0bG9hZGluZ092ZXJsYXkoKVxyXG5cdHtcclxuXHRcdGlmIChsb2FkaW5nT3ZlcmxheSkge1xyXG5cdFx0XHRyZXR1cm4gbG9hZGluZ092ZXJsYXk7XHJcblx0XHR9XHJcblxyXG5cdFx0bGV0IGxvYWRlciA9IERPTS5jcmVhdGVFbGVtZW50KCdpbWcnLCB7XHJcblx0XHRcdHNyYzogdGhpcy5zZXR0aW5ncy5sb2FkZXIsXHJcblx0XHRcdGNsYXNzOiAnY2FydC1sb2FkZXInXHJcblx0XHR9KTtcclxuXHJcblx0XHRsb2FkaW5nT3ZlcmxheSA9IERPTS5jcmVhdGVFbGVtZW50KCdkaXYnLCB7XHJcblx0XHRcdGNsYXNzOiAnY2FydC1sb2FkZXItb3ZlcmxheSdcclxuXHRcdH0pO1xyXG5cclxuXHRcdGxvYWRpbmdPdmVybGF5LmFwcGVuZENoaWxkKGxvYWRlcik7XHJcblxyXG5cdFx0cmV0dXJuIGxvYWRpbmdPdmVybGF5O1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogTG9hZGluZyB0aGUgY2FydCBwcmV2aWV3LlxyXG5cdCAqXHJcblx0ICogQHJldHVybiB2b2lkXHJcblx0ICovXHJcblx0cHJldmlld1N0YXJ0TG9hZGluZygpXHJcblx0e1xyXG5cdFx0RE9NLmFkZENsYXNzKGl0ZW1zRGl2LCAnbG9hZGluZycpO1xyXG5cdFx0dGhpcy5wcmV2aWV3RWxlbWVudC5hcHBlbmRDaGlsZCh0aGlzLmxvYWRpbmdPdmVybGF5KCkpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogTG9hZGluZyB0aGUgY2FydCBwcmV2aWV3LlxyXG5cdCAqXHJcblx0ICogQHJldHVybiB2b2lkXHJcblx0ICovXHJcblx0cHJldmlld1N0b3BMb2FkaW5nKClcclxuXHR7XHJcblx0XHRpZiAoRE9NLmZpbmQoJy5jYXJ0LWxvYWRlci1vdmVybGF5JywgdGhpcy5wcmV2aWV3RWxlbWVudCkpIHtcclxuXHRcdFx0dGhpcy5wcmV2aWV3RWxlbWVudC5yZW1vdmVDaGlsZCh0aGlzLmxvYWRpbmdPdmVybGF5KCkpO1xyXG5cdFx0XHRET00ucmVtb3ZlQ2xhc3MoaXRlbXNEaXYsICdsb2FkaW5nJyk7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBSZWxvYWRzIHRoZSBpdGVtcyBpbiB0aGUgY2FydCBwcmV2aWV3LlxyXG5cdCAqXHJcblx0ICogQHJldHVybiB2b2lkXHJcblx0ICovXHJcblx0cmVsb2FkQ2FydFByZXZpZXcoKVxyXG5cdHtcclxuXHRcdHRoaXMucHJldmlld1N0YXJ0TG9hZGluZygpO1xyXG5cdFx0bGV0IGl0ZW1zID0gdGhpcy5nZXRDYXJ0SXRlbXMoKTtcclxuXHRcdHRoaXMuYWRkVG9QcmV2aWV3KGl0ZW1zKTtcclxuXHRcdFxyXG5cdFx0bGV0IGluc3RhbmNlID0gdGhpcztcclxuXHJcblx0XHRzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRpbnN0YW5jZS5wcmV2aWV3U3RvcExvYWRpbmcuY2FsbChpbnN0YW5jZSk7XHJcblx0XHR9LCAxMDAwKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEJpbmRzIGV2ZW50IGxpc3RlbmVycyB0byB0aGUgY2FydCBpY29uLlxyXG5cdCAqXHJcblx0ICogQHJldHVybiB2b2lkXHJcblx0ICovXHJcblx0YmluZEV2ZW50TGlzdGVuZXJzKClcclxuXHR7XHJcblx0XHRpZih0aGlzLnN2Z0ljb24gPT0gbnVsbCkge1xyXG5cdFx0XHRyZXR1cm47XHJcblx0XHR9XHJcblxyXG5cdFx0dGhpcy5zdmdJY29uLm9uY2xpY2sgPSBmdW5jdGlvbihlKSB7XHJcblx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcclxuXHRcdFx0bGV0IG9wZW5pbmcgPSBET00udG9nZ2xlQ2xhc3ModGhpcy5wcmV2aWV3RWxlbWVudCwgJ29wZW5lZCcsICdjbG9zZWQnKTtcclxuXHRcdFx0XHJcblx0XHRcdGlmIChvcGVuaW5nKSB7XHJcblx0XHRcdFx0dGhpcy5yZWxvYWRDYXJ0UHJldmlldygpO1x0XHJcblx0XHRcdH1cclxuXHRcdH0uYmluZCh0aGlzKTtcclxuXHRcdFxyXG5cdFx0RXZlbnRNYW5hZ2VyJDIuc3Vic2NyaWJlKCdjYXJ0LnByb2R1Y3RzLmFkZGVkJywgZnVuY3Rpb24oYXR0cmlidXRlcykge1xyXG5cdFx0XHRsZXQgY2FydCA9IENvb2tpZS5nZXQodGhpcy5zZXR0aW5ncy5jb29raWVfbmFtZSk7XHJcblx0XHRcdGNhcnQuaXRlbXMucHVzaChhdHRyaWJ1dGVzKTtcclxuXHRcdFx0Q29va2llLnNldCh0aGlzLnNldHRpbmdzLmNvb2tpZV9uYW1lLCBjYXJ0KTtcclxuXHRcdFx0dGhpcy5yZWxvYWRDYXJ0UHJldmlldygpO1xyXG5cdFx0fS5iaW5kKHRoaXMpKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFJldHJpZXZlIHRoZSBjYXJ0cyBpdGVtcyBmcm9tIHRoZSBjb29raWUuXHJcblx0ICpcclxuXHQgKiBAcmV0dXJuIG9iamVjdFxyXG5cdCAqL1xyXG5cdGdldENhcnRJdGVtcygpXHJcblx0e1xyXG5cdFx0bGV0IGNhcnQgPSBDb29raWUuZ2V0KHRoaXMuc2V0dGluZ3MuY29va2llX25hbWUpO1xyXG5cclxuXHRcdHJldHVybiAoY2FydCkgPyBjYXJ0Lml0ZW1zIDogW107XHJcblx0fVxyXG59XHJcblxyXG4vKipcclxuICogQ2xvc2VzIHRoZSBjYXJ0IHByZXZpZXcgZWxlbWVudC5cclxuICpcclxuICogQHBhcmFtIGV2ZW50LmNsaWNrXHJcbiAqL1xyXG5mdW5jdGlvbiBjbG9zZShldmVudCkge1xyXG5cdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcblx0RE9NLnN3aXRjaENsYXNzZXModGhpcy5wcmV2aWV3RWxlbWVudCwgJ29wZW5lZCcsICdjbG9zZWQnKTtcclxufVxyXG5cclxuLyoqXHJcbiAqIENyZWF0ZXMgdGhlIGNhcnQgc3ZnIGljb24uXHJcbiAqXHJcbiAqIEByZXR1cm4gU1ZHU1ZHRWxlbWVudFxyXG4gKi9cclxuZnVuY3Rpb24gY3JlYXRlSWNvbigpIHtcclxuXHRsZXQgc3ZnID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKFwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiwgXCJzdmdcIik7XHJcblx0bGV0IGcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50TlMoXCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiLCBcImdcIik7XHJcblx0bGV0IHBhdGggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50TlMoXCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiLCBcInBhdGhcIik7XHJcblxyXG5cdHN2Zy5zZXRBdHRyaWJ1dGUoJ3ZlcnNpb24nLCAnMS4xJyk7XHJcblx0c3ZnLnNldEF0dHJpYnV0ZSgneG1sbnMnLCAnaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnKTtcclxuXHRzdmcuc2V0QXR0cmlidXRlKCd4bWxuczp4bGluaycsICdodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rJyk7XHJcblx0c3ZnLnNldEF0dHJpYnV0ZSgneCcsICcwcHgnKTtcclxuXHRzdmcuc2V0QXR0cmlidXRlKCd5JywgJzBweCcpO1xyXG5cdHN2Zy5zZXRBdHRyaWJ1dGUoJ3dpZHRoJywgJzQ0Ni44NDNweCcpO1xyXG5cdHN2Zy5zZXRBdHRyaWJ1dGUoJ2hlaWdodCcsICc0NDYuODQzcHgnKTtcclxuXHRzdmcuc2V0QXR0cmlidXRlKCd2aWV3Qm94JywgJzAgMCA0NDYuODQzIDQ0Ni44NDMnKTtcclxuXHRzdmcuc2V0QXR0cmlidXRlKCdzdHlsZScsICdlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDQ0Ni44NDMgNDQ2Ljg0MzsnKTtcclxuXHRzdmcuc2V0QXR0cmlidXRlKCd4bWw6c3BhY2UnLCAncHJlc2VydmUnKTtcclxuXHJcblx0cGF0aC5zZXRBdHRyaWJ1dGUoJ2QnLCAnTTQ0NC4wOSw5My4xMDNjLTIuNjk4LTMuNjk5LTcuMDA2LTUuODg4LTExLjU4NC01Ljg4OEgxMDkuOTJjLTAuNjI1LDAtMS4yNDksMC4wMzgtMS44NSwwLjExOWwtMTMuMjc2LTM4LjI3Yy0xLjM3Ni0zLjk1OC00LjQwNi03LjExMy04LjMtOC42NDZMMTkuNTg2LDE0LjEzNGMtNy4zNzQtMi44ODctMTUuNjk1LDAuNzM1LTE4LjU5MSw4LjFjLTIuODkxLDcuMzY5LDAuNzMsMTUuNjk1LDguMSwxOC41OTFsNjAuNzY4LDIzLjg3Mmw3NC4zODEsMjE0LjM5OWMtMy4yODMsMS4xNDQtNi4wNjUsMy42NjMtNy4zMzIsNy4xODdsLTIxLjUwNiw1OS43MzljLTEuMzE4LDMuNjYzLTAuNzc1LDcuNzMzLDEuNDY4LDEwLjkxNmMyLjI0LDMuMTgzLDUuODgzLDUuMDc4LDkuNzczLDUuMDc4aDExLjA0NGMtNi44NDQsNy42MTYtMTEuMDQ0LDE3LjY0Ni0xMS4wNDQsMjguNjc1YzAsMjMuNzE4LDE5LjI5OCw0My4wMTIsNDMuMDEyLDQzLjAxMnM0My4wMTItMTkuMjk0LDQzLjAxMi00My4wMTJjMC0xMS4wMjktNC4yLTIxLjA1OS0xMS4wNDQtMjguNjc1aDkzLjc3NmMtNi44NDcsNy42MTYtMTEuMDQ4LDE3LjY0Ni0xMS4wNDgsMjguNjc1YzAsMjMuNzE4LDE5LjI5NCw0My4wMTIsNDMuMDEzLDQzLjAxMmMyMy43MTgsMCw0My4wMTItMTkuMjk0LDQzLjAxMi00My4wMTJjMC0xMS4wMjktNC4yLTIxLjA1OS0xMS4wNDMtMjguNjc1aDEzLjQzM2M2LjU5OSwwLDExLjk0Ny01LjM0OSwxMS45NDctMTEuOTQ4YzAtNi41OTktNS4zNDktMTEuOTQ3LTExLjk0Ny0xMS45NDdIMTQzLjY0N2wxMy4zMTktMzYuOTk2YzEuNzIsMC43MjQsMy41NzgsMS4xNTIsNS41MjMsMS4xNTJoMjEwLjI3OGM2LjIzNCwwLDExLjc1MS00LjAyNywxMy42NS05Ljk1OWw1OS43MzktMTg2LjM4N0M0NDcuNTU3LDEwMS41NjcsNDQ2Ljc4OCw5Ni44MDIsNDQ0LjA5LDkzLjEwM3ogTTE2OS42NTksNDA5LjgwN2MtMTAuNTQzLDAtMTkuMTE2LTguNTczLTE5LjExNi0xOS4xMTZzOC41NzMtMTkuMTE3LDE5LjExNi0xOS4xMTdzMTkuMTE2LDguNTc0LDE5LjExNiwxOS4xMTdTMTgwLjIwMiw0MDkuODA3LDE2OS42NTksNDA5LjgwN3ogTTMyNy4zNjcsNDA5LjgwN2MtMTAuNTQzLDAtMTkuMTE3LTguNTczLTE5LjExNy0xOS4xMTZzOC41NzQtMTkuMTE3LDE5LjExNy0xOS4xMTdjMTAuNTQyLDAsMTkuMTE2LDguNTc0LDE5LjExNiwxOS4xMTdTMzM3LjkwOSw0MDkuODA3LDMyNy4zNjcsNDA5LjgwN3ogTTQwMi41MiwxNDguMTQ5aC03My4xNjFWMTE1Ljg5aDgzLjQ5OUw0MDIuNTIsMTQ4LjE0OXogTTM4MS40NTMsMjEzLjg2MWgtNTIuMDk0di0zNy4wMzhoNjMuOTY3TDM4MS40NTMsMjEzLjg2MXogTTIzNC41NzEsMjEzLjg2MXYtMzcuMDM4aDY2LjExM3YzNy4wMzhIMjM0LjU3MXogTTMwMC42ODQsMjQyLjUzOHYzMS4wNjRoLTY2LjExM3YtMzEuMDY0SDMwMC42ODR6IE0xMzkuMTE1LDE3Ni44MjNoNjYuNzg0djM3LjAzOGgtNTMuOTMzTDEzOS4xMTUsMTc2LjgyM3ogTTIzNC41NzEsMTQ4LjE0OVYxMTUuODloNjYuMTEzdjMyLjI1OUgyMzQuNTcxeiBNMjA1Ljg5OCwxMTUuODl2MzIuMjU5aC03Ni43MzRsLTExLjE5MS0zMi4yNTlIMjA1Ljg5OHogTTE2MS45MTYsMjQyLjUzOGg0My45ODJ2MzEuMDY0aC0zMy4yMDZMMTYxLjkxNiwyNDIuNTM4eiBNMzI5LjM1OSwyNzMuNjAzdi0zMS4wNjRoNDIuOTA5bC05Ljk1NSwzMS4wNjRIMzI5LjM1OXonKTtcclxuXHJcblx0Zy5hcHBlbmRDaGlsZChwYXRoKTtcclxuXHRzdmcuYXBwZW5kQ2hpbGQoZyk7XHJcblxyXG5cdHJldHVybiBzdmc7XHJcbn1cblxuLyoqXHJcbiAqIEBmaWxlIFxyXG4gKiBGaWx0ZXIgY2xhc3MuXHJcbiAqXHJcbiAqIFRoZSBGaWx0ZXIgT2JqZWN0LCBoYW5kbGVzIHRoZSBmaWx0ZXIgb2YgdGhlIHByb2R1Y3RzL3NlcnZpY2VzLlxyXG4gKi9cclxuXHJcbi8qKlxyXG4gKiBUaGUgZGVmYXVsdCBzZXR0aW5ncyBvZiB0aGUgZmlsdGVyLlxyXG4gKi9cclxubGV0IGRlZmF1bHRTZXR0aW5ncyQzID0ge1xyXG5cdGVsZW1lbnQ6ICcuZmlsdGVyJyxcclxuXHRkYXRhOiB7fSxcclxuXHRjbGFzczogJycsXHJcblx0d2lkdGg6ICcnLFxyXG5cdGhlaWdodDogJycsXHJcbn07XHJcblxyXG4vKipcclxuICogU3RvcmVzIHRoZSBjb250YWluZXIgb2JqZWN0LlxyXG4gKlxyXG4gKiBAdmFyIFxcQ29yZVxcQ29udGFpbmVyXHJcbiAqL1xyXG5sZXQgQ29udGFpbmVyJDM7XHJcblxyXG5jbGFzcyBGaWx0ZXIgXHJcbntcclxuXHQvKipcclxuXHQgKiAtIEluaXRpYWxpemUgdGhlIElvQyBjb250YWluZXIuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gXFxDb3JlXFxDb250YWluZXIgfCBjb250YWluZXJcclxuXHQgKiBAcmV0dXJuIHZvaWRcclxuXHQgKi9cclxuXHRjb25zdHJ1Y3Rvcihjb250YWluZXIpIFxyXG5cdHtcclxuXHRcdENvbnRhaW5lciQzID0gY29udGFpbmVyO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogU2V0dXAgdGhlIGZpbHRlciBjbGFzcy5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSBvYmplY3QgfCBzZXR0aW5nc1xyXG5cdCAqIEByZXR1cm4gdm9pZFxyXG5cdCAqL1xyXG5cdHNldHVwKHNldHRpbmdzKVxyXG5cdHtcclxuXHRcdGlmKHR5cGVvZiBzZXR0aW5ncyAhPSAnb2JqZWN0Jykge1xyXG5cdFx0XHR0aHJvdyBuZXcgSW52YWxpZEFyZ3VtZW50RXhjZXB0aW9uJDE7XHJcblx0XHR9XHJcblxyXG5cdFx0dGhpcy5zZXR0aW5ncyA9IENvbW1vbi5leHRlbmQoZGVmYXVsdFNldHRpbmdzJDMsIHNldHRpbmdzKTtcclxuXHJcblx0XHR0aGlzLnNldEVsZW1lbnQodGhpcy5zZXR0aW5ncy5lbGVtZW50KTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFNldHMgdGhlIGVsZW1lbnQgdG8gYmUgYm91bmQgdG8uXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gc3RyaW5nIHwgc2VsZWN0b3JcclxuXHQgKiBAcmV0dXJuIHZvaWRcclxuXHQgKi9cclxuXHRzZXRFbGVtZW50KHNlbGVjdG9yKVxyXG5cdHtcclxuXHRcdHRoaXMud3JhcHBlciA9IERPTS5maW5kKHNlbGVjdG9yKTtcclxuXHRcdFxyXG5cdFx0RE9NLmFkZENsYXNzKHRoaXMud3JhcHBlciwgdGhpcy5zZXR0aW5ncy5jbGFzcyk7XHJcblx0fVxyXG59XG5cbi8qKlxyXG4gKiBAZmlsZSBcclxuICogUHJvZHVjdHMgY2xhc3MuXHJcbiAqXHJcbiAqIFRoZSBQcm9kdWN0cyBjb21wb25lbnQsIGhhbmRsZXMgdGhlIHByb2R1Y3RzIHRhc2tzLlxyXG4gKi9cclxuXHJcblxyXG4vKipcclxuICogVGhlIGRlZmF1bHQgc2V0dGluZ3Mgb2YgZWFjaCBwcm9kdWN0LlxyXG4gKlxyXG4gKiBAdmFyIG9iamVjdFxyXG4gKi9cclxubGV0IGRlZmF1bHRTZXR0aW5ncyQ0ID0ge1xyXG5cdGVsZW1lbnQ6ICcucHJvZHVjdHMnLFxyXG5cdGNsYXNzOiAnJyxcclxuXHRpdGVtX2NsYXNzOiAnJyxcclxuXHRhZGRfYnV0dG9uX2NsYXNzOiAnYnRuIGJ0bi1wcmltYXJ5JyxcclxuXHRmYXZvcml0ZV9idXR0b25fY2xhc3M6ICdidG4gYnRuLWRhbmdlcicsXHJcblx0d2lkdGg6ICcyMDBweCcsXHJcblx0aGVpZ2h0OiAnMjUwcHgnLFxyXG5cdGF0dHJpYnV0ZXM6IFsnbmFtZScsICdwcmljZScsICdkZWxpdmVyeVRpbWUnLCAnaW1hZ2UnXSxcclxuXHR1cmw6ICdwcm9kdWN0cy5waHAnLFxyXG59O1xyXG5cclxuLyoqXHJcbiAqIFN0b3JlcyB0aGUgY29udGFpbmVyIG9iamVjdC5cclxuICogXHJcbiAqIEB2YXIgXFxDb3JlXFxDb250YWluZXJcclxuICovXHJcbmxldCBDb250YWluZXIkNDtcclxuXHJcbi8qKlxyXG4gKiBTdG9yZXMgdGhlIGNvbnRhaW5lciBvYmplY3QuXHJcbiAqIFxyXG4gKiBAdmFyIFxcQ29yZVxcRXZlbnRNYW5hZ2VyXHJcbiAqL1xyXG5sZXQgRXZlbnRNYW5hZ2VyJDM7XHJcblxyXG4vKipcclxuICogU3RvcmVzIHRoZSByZXF1ZXN0IG9iamVjdC5cclxuICogXHJcbiAqIEB2YXIgXFxIZWxwZXJcXFJlcXVlc3QgXHJcbiAqL1xyXG5sZXQgSHR0cCQxO1xyXG5cclxuLyoqXHJcbiAqIFN0b3JlcyB0aGUgY2h1bmtlZCBwZXIgXHJcbiAqIHBhZ2UgcHJvZHVjdHMuXHJcbiAqIFxyXG4gKiBAdmFyIGFycmF5XHJcbiAqL1xyXG5sZXQgY2h1bmtlZFByb2R1Y3RzO1xyXG5cclxuY2xhc3MgUHJvZHVjdHMgXHJcbntcclxuXHQvKipcclxuXHQgKiBJbml0YWxpemUgdGhlIENvbnRhaW5lci5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSBcXENvcmVcXENvbnRhaW5lciB8IGNvbnRhaW5lclxyXG5cdCAqIEBwYXJhbSBcXEhlbHBlcnNcXFJlcXVlc3QgfCBodHRwXHJcblx0ICogQHJldHVybiB2b2lkXHJcblx0ICovXHJcblx0Y29uc3RydWN0b3IoY29udGFpbmVyLCBodHRwLCBldmVudE1hbmFnZXIpIFxyXG5cdHtcclxuXHRcdENvbnRhaW5lciQ0ID0gY29udGFpbmVyO1xyXG5cdFx0SHR0cCQxID0gaHR0cDtcclxuXHRcdEV2ZW50TWFuYWdlciQzID0gZXZlbnRNYW5hZ2VyO1xyXG5cdFx0Y2h1bmtlZFByb2R1Y3RzID0gW107XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBTZXRzIHRoZSBnaXZlbiBzZXR0aW5ncyBmcm9tIHRoZSB1c2VyLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIG9iamVjdCB8IHNldHRpbmdzXHJcblx0ICogQHJldHVybiB2b2lkXHJcblx0ICovXHJcblx0c2V0dXAoc2V0dGluZ3MpXHJcblx0e1xyXG5cdFx0aWYgKHR5cGVvZiBzZXR0aW5ncyAhPSAnb2JqZWN0Jykge1xyXG5cdFx0XHR0aHJvdyBuZXcgSW52YWxpZEFyZ3VtZW50RXhjZXB0aW9uJDE7XHJcblx0XHR9XHJcblxyXG5cdFx0dGhpcy5zZXR0aW5ncyA9IENvbW1vbi5leHRlbmQoZGVmYXVsdFNldHRpbmdzJDQsIHNldHRpbmdzKTtcclxuXHRcdHRoaXMudG90YWxJdGVtcyA9IG51bGw7XHJcblxyXG5cdFx0ZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsIGZ1bmN0aW9uKCkge1xyXG5cclxuXHRcdFx0dGhpcy5zZXRFbGVtZW50KHRoaXMuc2V0dGluZ3MuZWxlbWVudCk7XHJcblxyXG5cdFx0XHR0aGlzLmFkZFN0eWxlVGFnKCk7XHRcclxuXHJcblx0XHRcdHRoaXMubG9hZFByb2R1Y3RzKDEpO1xyXG5cdFx0fS5iaW5kKHRoaXMpKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIExvYWRzIHRoZSBwcm9kdWN0cyBmb3IgdGhlIHBhZ2UuXHJcblx0ICogXHJcblx0ICogQHBhcmFtIG51bWJlciB8IHBhZ2VOdW1iZXJcclxuXHQgKiBAcGFyYW0gYm9vbCB8IGFsbFxyXG5cdCAqL1xyXG5cdGxvYWRQcm9kdWN0cyhwYWdlTnVtYmVyID0gMSwgYWxsKVxyXG5cdHtcclxuXHRcdGlmIChDb250YWluZXIkNC5QYWdpbmF0aW9uICYmIENvbnRhaW5lciQ0LlBhZ2luYXRpb24uYm9vdGVkKSB7XHJcblxyXG5cdFx0XHRpZiAoQ29udGFpbmVyJDQuUGFnaW5hdGlvbi5zZXR0aW5ncy5wcm9jY2Vzc2luZyA9PSAnY2xpZW50LXNpZGUnKSB7XHJcblx0XHRcdFx0cmV0dXJuIHRoaXMubG9hZFBhZ2VQcm9kdWN0c0J5Q2xpZW50KHBhZ2VOdW1iZXIpO1xyXG5cdFx0XHR9IGVsc2UgaWYgKENvbnRhaW5lciQ0LlBhZ2luYXRpb24uc2V0dGluZ3MucHJvY2Nlc3NpbmcgPT0gJ3NlcnZlci1zaWRlJykge1xyXG5cdFx0XHRcdHJldHVybiB0aGlzLmxvYWRQYWdlUHJvZHVjdHNCeVNlcnZlcihwYWdlTnVtYmVyKTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHR0aHJvdyBuZXcgSW52YWxpZEFyZ3VtZW50RXhjZXB0aW9uJDEoJ2ZvciBwcm9jY2Vzc2luZyB5b3UgY2FuIGNob29zZSBcXCdzZXJ2ZXItc2lkZVxcJyBvciBcXCdjbGllbnQtc2lkZVxcJyBvcHRpb25zLicpO1xyXG5cdFx0XHR9XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHR0aGlzLmxvYWRQYWdlUHJvZHVjdHNCeVNlcnZlcigpO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogTG9hZHMgdGhlIHByb2R1Y3RzIGFuZCBcclxuXHQgKiByZXBsYWNlIHRoZW0gaW4gdGhlIGRpdiBjb250YWluZXIuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gbnVtYmVyIHwgcGFnZU51bWJlclxyXG5cdCAqIEByZXR1cm4gdm9pZFxyXG5cdCAqL1xyXG5cdGxvYWRQYWdlUHJvZHVjdHNCeVNlcnZlcihwYWdlTnVtYmVyID0gbnVsbClcclxuXHR7XHJcblx0XHRsZXQgcmVxdWVzdCA9IHRoaXMuZ2V0UHJvZHVjdHMocGFnZU51bWJlcik7XHJcblxyXG5cdFx0cmVxdWVzdC50aGVuKGZ1bmN0aW9uKHByb2R1Y3RzKSB7XHJcblxyXG5cdFx0XHR0aGlzLmN1cnJlbnRJdGVtcyA9IHByb2R1Y3RzO1xyXG5cclxuXHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLmN1cnJlbnRJdGVtcy5sZW5ndGg7IGkrKykge1xyXG5cdFx0XHRcdHZhciBwcm9kdWN0ID0gdGhpcy5jdXJyZW50SXRlbXNbaV07XHJcblx0XHRcdFx0RXZlbnRNYW5hZ2VyJDMucHVibGlzaCgncHJvZHVjdHMubG9hZGluZycsIHByb2R1Y3QpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRFdmVudE1hbmFnZXIkMy5wdWJsaXNoKCdwcm9kdWN0cy5sb2FkZWQnLCBwcm9kdWN0cyk7XHJcblx0XHRcdHRoaXMucmVwbGFjZUl0ZW1zKHByb2R1Y3RzKTtcclxuXHRcdFx0cmVzb2x2ZSgpO1xyXG5cdFx0fS5iaW5kKHRoaXMpKS5jYXRjaChmdW5jdGlvbihlcnJvcikge1xyXG5cclxuXHRcdH0pO1xyXG5cclxuXHRcdHJldHVybiByZXF1ZXN0O1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogTG9hZHMgdGhlIHByb2R1Y3RzIGFuZCBcclxuXHQgKiByZXBsYWNlIHRoZW0gaW4gdGhlIGRpdiBjb250YWluZXIuXHJcblx0ICpcclxuXHQgKiBAcmV0dXJuIHZvaWRcclxuXHQgKi9cclxuXHRsb2FkUGFnZVByb2R1Y3RzQnlDbGllbnQocGFnZU51bWJlcilcclxuXHR7XHJcblx0XHRsZXQgcmVxdWVzdDtcclxuXHJcblx0XHRpZiAodGhpcy50b3RhbEl0ZW1zID09IG51bGwpIHsgLy8gbmVlZCB0byBmZXRjaCB0aGVtIGZyb20gdGhlIHNlcnZlci5cclxuXHRcdFx0cmVxdWVzdCA9IHRoaXMuZ2V0UHJvZHVjdHMoKTtcclxuXHRcdH0gZWxzZSB7IC8vIG5vIG5lZWQgdG8gd2FpdCBjYW4gcmVzb2x2ZSBpbW1lZGlhdGVseSB3aXRoIHRoZSBwcm9kdWN0cy4gXHJcblx0XHRcdHJlcXVlc3QgPSBQcm9taXNlLnJlc29sdmUodGhpcy50b3RhbEl0ZW1zKTtcclxuXHRcdH1cclxuXHJcblx0XHRyZXF1ZXN0LnRoZW4oZnVuY3Rpb24ocHJvZHVjdHMpIHtcclxuXHRcdFx0dGhpcy50b3RhbEl0ZW1zID0gcHJvZHVjdHM7XHJcblxyXG5cdFx0XHRsZXQgcGFnZXMgPSB0aGlzLmNhbGN1bGF0ZUNsaWVudFBhZ2VzKHByb2R1Y3RzKTtcclxuXHJcblx0XHRcdHRoaXMuY3VycmVudEl0ZW1zID0gcGFnZXNbcGFnZU51bWJlci0xXTtcclxuXHJcblx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5jdXJyZW50SXRlbXMubGVuZ3RoOyBpKyspIHtcclxuXHRcdFx0XHR2YXIgcHJvZHVjdCA9IHRoaXMuY3VycmVudEl0ZW1zW2ldO1xyXG5cdFx0XHRcdEV2ZW50TWFuYWdlciQzLnB1Ymxpc2goJ3Byb2R1Y3RzLmxvYWRpbmcnLCBwcm9kdWN0KTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0RXZlbnRNYW5hZ2VyJDMucHVibGlzaCgncHJvZHVjdHMubG9hZGVkJywgcHJvZHVjdHMpO1xyXG5cdFx0XHR0aGlzLnJlcGxhY2VJdGVtcyh0aGlzLmN1cnJlbnRJdGVtcyk7XHJcblx0XHRcdFByb21pc2UucmVzb2x2ZSh0aGlzLmN1cnJlbnRJdGVtcyk7XHJcblxyXG5cdFx0fS5iaW5kKHRoaXMpKS5jYXRjaChmdW5jdGlvbihlcnJvcikge1xyXG5cclxuXHRcdH0pO1xyXG5cclxuXHRcdHJldHVybiByZXF1ZXN0O1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQ2FsY3VsYXRlcyB0aGUgYW1vdW50IG9mIHBhZ2VzIGZvciB0aGUgY2xpZW50LlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIGFycmF5IHwgcHJvZHVjdHNcclxuXHQgKiBAcmV0dXJuIGFycmF5XHJcblx0ICovXHJcblx0Y2FsY3VsYXRlQ2xpZW50UGFnZXMocHJvZHVjdHMpXHJcblx0e1x0XHJcblx0XHQvLyBXZSBhcmUgdXNpbmcgcGFnaW5hdGlvbiBzbyB3ZSBuZWVkIHRvIHVwZGF0ZSBpdCB0b28uXHJcblx0XHRDb250YWluZXIkNC5QYWdpbmF0aW9uLnNldHRpbmdzLnRvdGFsX2l0ZW1zID0gcHJvZHVjdHMubGVuZ3RoO1xyXG5cdFx0XHJcblx0XHRsZXQgcGVyUGFnZSA9IENvbnRhaW5lciQ0LlBhZ2luYXRpb24uc2V0dGluZ3MucGVyX3BhZ2U7IFxyXG5cclxuXHRcdC8vIFdlIG5lZWQgdG8gY2FsY3VsYXRlIHRoZSBwYWdlcyBvbiBmdWxsIGh0dHAgcmVxdWVzdCBcclxuXHRcdC8vIG9ubHkgb25jZS4gc28gd2UgY2hlY2sgdG8gc2VlIGlmIHdlIGhhdmUgcmVzdWx0cyBpbiBvdXIgY2FjaGUuXHJcblx0XHRpZiAoY2h1bmtlZFByb2R1Y3RzLmxlbmd0aCAhPSAwKSB7XHJcblx0XHRcdHJldHVybiBjaHVua2VkUHJvZHVjdHM7XHJcblx0XHR9XHJcblxyXG5cdFx0Y2h1bmtlZFByb2R1Y3RzID0gQ29tbW9uLmFycmF5X2NodW5rKHByb2R1Y3RzLCBwZXJQYWdlKTtcclxuXHRcdHJldHVybiBjaHVua2VkUHJvZHVjdHM7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBTZXRzIHRoZSBET00gZWxlbWVudCBcclxuXHQgKiBmb3IgcG9wdWxhdGluZyB0aGUgcHJvZHVjdHMuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gc3RyaW5nIHwgc2VsZWN0b3JcclxuXHQgKiBAcmV0dXJuIHZvaWRcclxuXHQgKi9cclxuXHRzZXRFbGVtZW50KHNlbGVjdG9yKVxyXG5cdHtcclxuXHRcdHRoaXMud3JhcHBlciA9IERPTS5maW5kKHNlbGVjdG9yKTtcclxuXHJcblx0XHRpZiAodGhpcy53cmFwcGVyKSB7XHJcblx0XHRcdERPTS5hZGRDbGFzcyh0aGlzLndyYXBwZXIsIHRoaXMuc2V0dGluZ3MuY2xhc3MpO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogUmVwbGFjZSBpdGVtcyBpbiBcclxuXHQgKiB0aGUgcHJvZHVjdHMgY29udGFpbmVyLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIGFycmF5IHwgaXRlbXNcclxuXHQgKiBAcmV0dXJuIGFycmF5XHJcblx0ICovXHJcblx0cmVwbGFjZUl0ZW1zKGl0ZW1zKSBcclxuXHR7XHJcblx0XHRpZiAoISBBcnJheS5pc0FycmF5KGl0ZW1zKSB8fCAoaXRlbXMubGVuZ3RoIDw9IDAgJiYgdHlwZW9mIGl0ZW1zWzBdID09ICdzdHJpbmcnKSkge1xyXG5cdFx0XHR0aHJvdyBuZXcgSW52YWxpZEFyZ3VtZW50RXhjZXB0aW9uJDE7XHJcblx0XHR9XHJcblxyXG5cdFx0bGV0IHByb2R1Y3RzID0gdGhpcy5idWlsZFByb2R1Y3RzKGl0ZW1zLCB0aGlzLnNldHRpbmdzLml0ZW1fY2xhc3MsICdkaXYnKTtcclxuXHJcblx0XHR0aGlzLndyYXBwZXIuaW5uZXJIVE1MID0gJyc7XHJcblx0XHRwcm9kdWN0cy5mb3JFYWNoKGZ1bmN0aW9uKHByb2R1Y3QpIHtcclxuXHRcdFx0dGhpcy53cmFwcGVyLmFwcGVuZENoaWxkKHByb2R1Y3QpO1xyXG5cdFx0fS5iaW5kKHRoaXMpKTtcclxuXHJcblx0XHRyZXR1cm4gaXRlbXM7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBNYWtlcyBhbiBBamF4IGNhbGwgdG8gdGhlIFxyXG5cdCAqIHNlcnZlciB3aXRob3V0IHBhcmFtZXRlcnMuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gbnVtYmVyIHwgcGFnZU51bWJlclxyXG5cdCAqIEByZXR1cm4gUHJvbWlzZVxyXG5cdCAqL1xyXG5cdGdldFByb2R1Y3RzKHBhZ2VOdW1iZXIgPSBudWxsKVxyXG5cdHtcclxuXHRcdGxldCBhY3Rpb24gPSAocGFnZU51bWJlcikgPyB0aGlzLnNldHRpbmdzLnVybCArICc/cGFnZT0nICsgcGFnZU51bWJlciA6IHRoaXMuc2V0dGluZ3MudXJsO1xyXG5cclxuXHRcdHJldHVybiBIdHRwJDEuZ2V0KHtcclxuXHRcdFx0dXJsOiBhY3Rpb24sXHJcblx0XHR9KTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEJ1aWxkcyB0aGUgaHRtbCBmb3IgdGhlIHByb2R1Y3RzLlxyXG5cdCAqIFxyXG5cdCAqIEBwYXJhbSBhcnJheSB8IGF0dHJpYnV0ZXNDb2xsZWN0aW9uXHJcblx0ICogQHBhcmFtIHN0cmluZyB8IGNsYXNzTmFtZVxyXG5cdCAqIEBwYXJhbSBzdHJpbmcgfCB0YWdUeXBlXHJcblx0ICogQHJldHVybiBhcnJheVxyXG5cdCAqL1xyXG5cdGJ1aWxkUHJvZHVjdHMoYXR0cmlidXRlc0NvbGxlY3Rpb24sIGNsYXNzTmFtZSwgdGFnVHlwZSkgXHJcblx0e1xyXG5cdFx0aWYoYXR0cmlidXRlc0NvbGxlY3Rpb24uY29uc3RydWN0b3IubmFtZSAhPSAnQXJyYXknICkge1xyXG5cdFx0XHR0aHJvdyBuZXcgSW52YWxpZEFyZ3VtZW50RXhjZXB0aW9uJDE7XHJcblx0XHR9XHJcblxyXG5cdFx0bGV0IGJ1aWx0UHJvZHVjdHMgPSBbXTtcclxuXHJcblx0XHRhdHRyaWJ1dGVzQ29sbGVjdGlvbi5mb3JFYWNoKGZ1bmN0aW9uKGF0dHJpYnV0ZXMpIHtcclxuXHRcdFx0bGV0IGJ1aWx0UHJvZHVjdCA9IHRoaXMuYnVpbGRQcm9kdWN0KGF0dHJpYnV0ZXMsIGNsYXNzTmFtZSwgdGFnVHlwZSk7XHJcblx0XHRcdGJ1aWx0UHJvZHVjdHMucHVzaChidWlsdFByb2R1Y3QpO1xyXG5cdFx0fS5iaW5kKHRoaXMpKTtcclxuXHJcblx0XHRyZXR1cm4gYnVpbHRQcm9kdWN0cztcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEJ1aWxkcyB0aGUgaHRtbCBmb3IgYSBzaW5nbGUgcHJvZHVjdC5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSBvYmplY3QgfCBhdHRyaWJ1dGVzXHJcblx0ICogQHBhcmFtIHN0cmluZyB8IGNsYXNzTmFtZVxyXG5cdCAqIEBwYXJhbSBzdHJpbmcgfCB0YWdUeXBlXHJcblx0ICogQHJldHVybiBvYmplY3RcclxuXHQgKi9cclxuXHRidWlsZFByb2R1Y3QoYXR0cmlidXRlcywgY2xhc3NOYW1lLCB0YWdUeXBlKSBcclxuXHR7XHJcblx0XHRpZiAodHlwZW9mIGF0dHJpYnV0ZXMgIT0gJ29iamVjdCcgfHwgdHlwZW9mIHRhZ1R5cGUgIT0gJ3N0cmluZycpIHtcclxuXHRcdFx0dGhyb3cgbmV3IEludmFsaWRBcmd1bWVudEV4Y2VwdGlvbiQxO1xyXG5cdFx0fVxyXG5cclxuXHRcdGNsYXNzTmFtZSA9IGNsYXNzTmFtZSB8fCBudWxsO1xyXG5cclxuXHRcdGxldCBwcm9kdWN0ID0gRE9NLmNyZWF0ZUVsZW1lbnQoJ2RpdicsIHtcclxuXHRcdFx0Y2xhc3M6ICdwcm9kdWN0J1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0RE9NLmFkZENsYXNzKHByb2R1Y3QsIGNsYXNzTmFtZSk7XHJcblxyXG5cdFx0bGV0IG92ZXJsYXkgPSBET00uY3JlYXRlRWxlbWVudCgnZGl2Jywge1xyXG5cdFx0XHRjbGFzczogJ3Byb2R1Y3Qtb3ZlcmxheScsXHJcblx0XHR9KTtcclxuXHJcblx0XHRwcm9kdWN0LmFwcGVuZENoaWxkKG92ZXJsYXkpO1xyXG5cclxuXHRcdGZvciAodmFyIGF0dHJpYnV0ZSBpbiBhdHRyaWJ1dGVzKSB7XHJcblx0XHRcdGlmICghIENvbW1vbi5pbl9hcnJheShhdHRyaWJ1dGUsIHRoaXMuc2V0dGluZ3MuYXR0cmlidXRlcykpIHtcclxuXHRcdFx0XHRjb250aW51ZTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0bGV0IHRhZyA9IERPTS5jcmVhdGVFbGVtZW50KHRhZ1R5cGUpO1xyXG5cclxuXHRcdFx0aWYgKGF0dHJpYnV0ZSA9PSAnaW1hZ2UnKSB7XHJcblx0XHRcdFx0bGV0IGltYWdlID0gRE9NLmNyZWF0ZUVsZW1lbnQoJ2ltZycsIHtcclxuXHRcdFx0XHRcdHNyYzogYXR0cmlidXRlc1thdHRyaWJ1dGVdXHJcblx0XHRcdFx0fSk7XHJcblx0XHRcdFx0cHJvZHVjdC5hcHBlbmRDaGlsZChpbWFnZSk7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0dGFnLmlubmVySFRNTCA9IGF0dHJpYnV0ZXNbYXR0cmlidXRlXSB8fCAnJztcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0RE9NLmFkZENsYXNzKHRhZywgJ3Byb2R1Y3QtJyArIFN0ci5rZWJhYkNhc2UoYXR0cmlidXRlKSk7XHJcblx0XHRcdG92ZXJsYXkuYXBwZW5kQ2hpbGQodGFnKTtcclxuXHRcdH1cclxuXHJcblx0XHRsZXQgdGFnID0gRE9NLmNyZWF0ZUVsZW1lbnQoJ2RpdicsIHtcclxuXHRcdFx0aWQ6ICdhY3Rpb25CdXR0b25zJyxcclxuXHRcdFx0Y2xhc3M6ICdhY3Rpb24tYnV0dG9ucydcclxuXHRcdH0pO1xyXG5cclxuXHRcdGxldCBhZGRUb0NhcnQgPSBET00uY3JlYXRlRWxlbWVudCgnYnV0dG9uJywge1xyXG5cdFx0XHRpZDogJ2FkZFRvQ2FydCcsXHJcblx0XHRcdGNsYXNzOiB0aGlzLnNldHRpbmdzLmFkZF9idXR0b25fY2xhc3MsXHJcblx0XHRcdHR5cGU6ICdidXR0b24nLFxyXG5cdFx0XHR0ZXh0OiAnKycsXHJcblx0XHR9KTtcclxuXHJcblx0XHRsZXQgZmF2b3JpdGUgPSBET00uY3JlYXRlRWxlbWVudCgnYnV0dG9uJywge1xyXG5cdFx0XHRpZDogJ2Zhdm9yaXRlJyxcclxuXHRcdFx0Y2xhc3M6IHRoaXMuc2V0dGluZ3MuZmF2b3JpdGVfYnV0dG9uX2NsYXNzLFxyXG5cdFx0XHR0eXBlOiAnYnV0dG9uJyxcclxuXHRcdFx0dGV4dDogJyZoZWFydHM7J1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0dGFnLmFwcGVuZENoaWxkKGFkZFRvQ2FydCk7XHJcblx0XHR0YWcuYXBwZW5kQ2hpbGQoZmF2b3JpdGUpO1xyXG5cclxuXHRcdGFkZFRvQ2FydC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcclxuXHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdFx0XHRFdmVudE1hbmFnZXIkMy5wdWJsaXNoKCdjYXJ0LnByb2R1Y3RzLmFkZGVkJywgYXR0cmlidXRlcyk7XHJcblx0XHR9KTtcclxuXHJcblx0XHRvdmVybGF5LmFwcGVuZENoaWxkKHRhZyk7XHJcblxyXG5cdFx0cmV0dXJuIHByb2R1Y3Q7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBBZGQgdGhlIGVDb21tZXJjZSBzdHlsZSB0YWdzIHRvIHRoZSBET00uXHJcblx0ICovXHJcblx0YWRkU3R5bGVUYWcoKSBcclxuXHR7XHJcblx0XHRpZihET00uZmluZCgnI1R1cmJvLWVDb21tZXJjZS1Qcm9kdWN0cycpKSB7XHJcblx0XHRcdHJldHVybjtcclxuXHRcdH1cclxuXHJcblx0XHRsZXQgY3NzID0gYFxyXG5cdFx0XHQucHJvZHVjdCB7XHJcblx0XHRcdFx0cG9zaXRpb246IHJlbGF0aXZlO1xyXG5cdFx0XHRcdG1hcmdpbjogNXB4IDVweDtcclxuXHRcdFx0XHRib3JkZXI6IDFweCBzb2xpZCAjZTRlNGU0O1xyXG5cdFx0XHRcdHdpZHRoOiAke3RoaXMuc2V0dGluZ3Mud2lkdGh9O1xyXG5cdFx0XHRcdGhlaWdodDogJHt0aGlzLnNldHRpbmdzLmhlaWdodH07XHJcblx0XHRcdFx0Y3Vyc29yOiBwb2ludGVyO1xyXG5cdFx0XHRcdGNvbG9yOiAjZmZmZmZmO1xyXG5cdFx0XHRcdG92ZXJmbG93OiBoaWRkZW47XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdC5wcm9kdWN0ID4gLnByb2R1Y3Qtb3ZlcmxheSB7XHJcblx0XHRcdFx0cG9zaXRpb246IGFic29sdXRlO1xyXG5cdFx0XHRcdHRvcDogMDtcclxuXHRcdFx0XHRsZWZ0OiAwO1xyXG5cdFx0XHRcdHdpZHRoOiAxMDAlO1xyXG5cdFx0XHRcdGhlaWdodDogMTAwJTtcclxuXHRcdFx0XHRvcGFjaXR5OiAwLjU7XHJcblx0XHRcdFx0ei1pbmRleDogNTtcclxuXHRcdFx0XHR0cmFuc2l0aW9uOiAxcyBhbGw7XHJcblx0XHRcdFx0dHJhbnNmb3JtOiB0cmFuc2xhdGVYKC0yNTBweCk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdC5wcm9kdWN0OmhvdmVyID4gLnByb2R1Y3Qtb3ZlcmxheSB7XHJcblx0XHRcdFx0YmFja2dyb3VuZDogcmdiYSgwLCAwLCAwLCAwLjQ1KTtcclxuXHRcdFx0XHR0cmFuc2Zvcm06IHRyYW5zbGF0ZVgoMHB4KTtcclxuXHRcdFx0XHRvcGFjaXR5OiAxO1xyXG5cdFx0XHRcdHRyYW5zaXRpb246IDFzIGFsbDtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0LnByb2R1Y3QgPiBpbWcge1xyXG5cdFx0XHRcdHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuXHRcdFx0XHRsZWZ0OiAwO1xyXG5cdFx0XHRcdHRvcDogMDtcclxuXHRcdFx0XHR3aWR0aDogMTAwJTtcclxuXHRcdFx0XHRoZWlnaHQ6IDEwMCU7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdC5wcm9kdWN0ID4gLnByb2R1Y3QtaW1hZ2Uge1xyXG5cdFx0XHRcdHotaW5kZXg6IDA7XHJcblx0XHRcdFx0cG9zaXRpb246IGFic29sdXRlO1xyXG5cdFx0XHRcdHRvcDogMDtcclxuXHRcdFx0XHRsZWZ0OiAwO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHQucHJvZHVjdCA+IC5wcm9kdWN0LW92ZXJsYXkgPiAucHJvZHVjdC1uYW1lLCBcclxuXHRcdFx0LnByb2R1Y3QgPiAucHJvZHVjdC1vdmVybGF5ID4gLnByb2R1Y3QtcHJpY2UsXHJcblx0XHRcdC5wcm9kdWN0ID4gLnByb2R1Y3Qtb3ZlcmxheSA+IC5wcm9kdWN0LWRlbGl2ZXJ5LXRpbWUge1xyXG5cdFx0XHRcdHotaW5kZXg6IDE7XHJcblx0XHRcdFx0cG9zaXRpb246IHJlbGF0aXZlO1xyXG5cdFx0XHRcdHRleHQtYWxpZ246IGNlbnRlcjtcclxuXHRcdFx0XHRtYXJnaW4tdG9wOiAyNXB4O1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHQucHJvZHVjdCA+IC5wcm9kdWN0LW92ZXJsYXkgPiAuYWN0aW9uLWJ1dHRvbnMge1xyXG5cdFx0XHRcdHdpZHRoOiAxMDAlO1xyXG5cdFx0XHRcdG1hcmdpbi10b3A6IDEwcHg7XHJcblx0XHRcdFx0dGV4dC1hbGlnbjogY2VudGVyO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHQucHJvZHVjdCA+IC5wcm9kdWN0LW92ZXJsYXkgPiAuYWN0aW9uLWJ1dHRvbnMgPiAjZmF2b3JpdGUge1xyXG5cdFx0XHRcdG1hcmdpbi1sZWZ0OiAxMHB4O1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0YDtcclxuXHQgICAgXHJcblx0ICAgIERPTS5hZGRTdHlsZSgnVHVyYm8tZUNvbW1lcmNlLVByb2R1Y3RzJywgY3NzKTtcclxuXHR9XHJcbn1cblxuLyoqXHJcbiAqIFRoZSBTZXJ2aWNlcyBPYmplY3QsIGhhbmRsZXMgdGhlIHNlcnZpY2VzLlxyXG4gKi9cclxuY2xhc3MgU2VydmljZXMgXHJcbntcclxuXHJcbn1cblxubGV0IGRlZmF1bHRNZXNzYWdlJDQgPSAnc29ycnksIG5vIG1vcmUgcGFnZXMuJztcclxuXHJcbmNsYXNzIE5vdEluUGFnZVJhbmdlRXhjZXB0aW9uIGV4dGVuZHMgRXhjZXB0aW9uSGFuZGxlclxyXG57XHJcblx0Y29uc3RydWN0b3IobWVzc2FnZSA9IG51bGwpIFxyXG5cdHtcclxuXHRcdG1lc3NhZ2UgPSBtZXNzYWdlIHx8IGRlZmF1bHRNZXNzYWdlJDQ7XHJcblx0XHRzdXBlcigpO1xyXG4gICAgXHRzdXBlci5zdGFja1RyYWNlKHRoaXMsIG1lc3NhZ2UpO1xyXG4gICAgfVxyXG59XG5cbi8qKlxyXG4gKiBAZmlsZSBcclxuICogUGFnaW5hdGlvbiBjbGFzcy5cclxuICpcclxuICogVGhlIFBhZ2luYXRpb24gY29tcG9uZW50LCBoYW5kbGVzIHRoZSBwYWdpbmF0aW9uLlxyXG4gKi9cclxuXHJcbi8qKlxyXG4gKiBUaGUgZGVmYXVsdCBzZXR0aW5ncyBvZiB0aGUgcGFnaW5hdGlvbi5cclxuICpcclxuICogQHZhciBvYmplY3RcclxuICovXHJcbmxldCBkZWZhdWx0U2V0dGluZ3MkNSA9IHtcclxuXHRlbGVtZW50OiAnLnBhZ2luYXRpb24tbGlua3MnLFxyXG5cdHByb2NjZXNzaW5nOiAnY2xpZW50LXNpZGUnLFxyXG5cdGNsYXNzOiAnJyxcclxuXHRwZXJfcGFnZTogNSxcclxuXHR0b3RhbF9pdGVtczogMTAsXHJcbn07XHJcblxyXG4vKipcclxuICogU3RvcmVzIHRoZSBjb250YWluZXIgb2JqZWN0LlxyXG4gKlxyXG4gKiBAdmFyIFxcQ29yZVxcQ29udGFpbmVyXHJcbiAqL1xyXG5sZXQgQ29udGFpbmVyJDU7XHJcblxyXG4vKipcclxuICogU3RvcmVzIHRoZSBwcm9kdWN0cyBjb21wb25lbnQuXHJcbiAqXHJcbiAqIEB2YXIgXFxDb21wb25lbnRzXFxQcm9kdWN0c1xyXG4gKi9cclxubGV0IFByb2R1Y3RzJDI7XHJcblxyXG5jbGFzcyBQYWdpbmF0aW9uIFxyXG57XHJcblx0LyoqXHJcblx0ICogLSBJbml0aWFsaXplIHRoZSBjb250YWluZXIgb2JqZWN0LlxyXG5cdCAqIC0gSW5pdGlhbGl6ZSB0aGUgcHJvZHVjdHMgY29tcG9uZW50LlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIFxcQ29yZVxcQ29udGFpbmVyIHwgY29udGFpbmVyXHJcblx0ICogQHBhcmFtIFxcQ29tcG9uZW50c1xcUHJvZHVjdHMgfCBwcm9kdWN0c1xyXG5cdCAqIEByZXR1cm4gdm9pZFxyXG5cdCAqL1xyXG5cdGNvbnN0cnVjdG9yKGNvbnRhaW5lciwgcHJvZHVjdHMpIFxyXG5cdHtcclxuXHRcdHRoaXMuc2V0Q3VycmVudCgxKTtcclxuXHRcdENvbnRhaW5lciQ1ID0gY29udGFpbmVyO1xyXG5cdFx0UHJvZHVjdHMkMiA9IHByb2R1Y3RzO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogU2V0dXAgdGhlIHBhZ2luYXRpb24uXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gb2JqZWN0IHwgc2V0dGluZ3NcclxuXHQgKiBAcmV0dXJuIHZvaWRcclxuXHQgKi9cclxuXHRzZXR1cChzZXR0aW5ncylcclxuXHR7XHRcclxuXHRcdGlmKHR5cGVvZiBzZXR0aW5ncyAhPSAnb2JqZWN0Jykge1xyXG5cdFx0XHR0aHJvdyBuZXcgSW52YWxpZEFyZ3VtZW50RXhjZXB0aW9uJDE7XHJcblx0XHR9XHJcblxyXG5cdFx0dGhpcy5zZXR0aW5ncyA9IENvbW1vbi5leHRlbmQoZGVmYXVsdFNldHRpbmdzJDUsIHNldHRpbmdzKTtcclxuXHJcblx0XHR0aGlzLnRvdGFsUGFnZXMgPSB0aGlzLmNhbGN1bGF0ZVRvdGFsUGFnZXModGhpcy5zZXR0aW5ncy5wZXJfcGFnZSwgdGhpcy5zZXR0aW5ncy50b3RhbF9pdGVtcyk7XHJcblx0XHRcclxuXHRcdHRoaXMuc2V0RWxlbWVudCh0aGlzLnNldHRpbmdzLmVsZW1lbnQpO1xyXG5cdFx0dGhpcy5saW5rcyA9IHRoaXMuY3JlYXRlTGlua3MoKTtcclxuXHRcdHRoaXMuYmluZEV2ZW50TGlzdGVuZXJzKHRoaXMubGlua3MpO1xyXG5cdFx0dGhpcy5yZXBsYWNlTGlua3ModGhpcy5saW5rcyk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBTZXRzIHRoZSB3cmFwcGVyIGVsZW1lbnQuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gc3RyaW5nIHwgc2VsZWN0b3JcclxuXHQgKiBAcmV0dXJuIHZvaWRcclxuXHQgKi9cclxuXHRzZXRFbGVtZW50KHNlbGVjdG9yKVxyXG5cdHtcclxuXHRcdHRoaXMud3JhcHBlciA9IERPTS5maW5kKHNlbGVjdG9yKTtcclxuXHRcdFxyXG5cdFx0RE9NLmFkZENsYXNzKHRoaXMud3JhcHBlciwgdGhpcy5zZXR0aW5ncy5jbGFzcyk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBSZXBsYWNlcyB0aGUgbGlua3MgaW4gdGhlIHdyYXBwZXIuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gSFRNTFVMaXN0RWxlbWVudCB8IGxpbmtzXHJcblx0ICogQHJldHVybiB2b2lkXHJcblx0ICovXHJcblx0cmVwbGFjZUxpbmtzKGxpbmtzKVxyXG5cdHtcclxuXHRcdHRoaXMud3JhcHBlci5pbm5lckhUTUwgPSAnJztcclxuXHRcdHRoaXMud3JhcHBlci5hcHBlbmRDaGlsZChsaW5rcyk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBDYWxjdWxhdGVzIHRoZSB0b3RhbCBwYWdlcy5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSBudW1iZXIgfCBwZXJQYWdlXHJcblx0ICogQHBhcmFtIG51bWJlciB8IHRvdGFsSXRlbXNcclxuXHQgKiBAcmV0dXJuIG51bWJlclxyXG5cdCAqL1xyXG5cdGNhbGN1bGF0ZVRvdGFsUGFnZXMocGVyUGFnZSwgdG90YWxJdGVtcylcclxuXHR7XHJcblx0XHRwZXJQYWdlID0gcGFyc2VJbnQocGVyUGFnZSk7XHJcblx0XHR0b3RhbEl0ZW1zID0gcGFyc2VJbnQodG90YWxJdGVtcyk7XHJcblxyXG5cdFx0cmV0dXJuIE1hdGguY2VpbCh0b3RhbEl0ZW1zIC8gcGVyUGFnZSk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBCaW5kcyB0aGUgYnV0dG9ucyBldmVudHMgbGlzdGVuZXJzLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIEhUTUxVTGlzdEVsZW1lbnQgfCBsaW5rc1xyXG5cdCAqIEByZXR1cm4gdm9pZFxyXG5cdCAqL1xyXG5cdGJpbmRFdmVudExpc3RlbmVycyhsaW5rcykgXHJcblx0e1xyXG5cdFx0bGV0IGluc3RhbmNlID0gdGhpcztcclxuXHJcblx0XHR0aGlzLm5leHQuY2hpbGROb2Rlc1swXS5vbmNsaWNrID0gZnVuY3Rpb24oZSkge1xyXG5cdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG5cdFx0XHRsZXQgcmVxdWVzdGVkUGFnZSA9IGluc3RhbmNlLmN1cnJlbnQrMTtcclxuXHJcblx0XHRcdGlmIChpbnN0YW5jZS5ub3RJblBhZ2VSYW5nZShyZXF1ZXN0ZWRQYWdlKSkge1xyXG5cdFx0XHRcdHRocm93IG5ldyBOb3RJblBhZ2VSYW5nZUV4Y2VwdGlvbjtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0UHJvZHVjdHMkMi5sb2FkUHJvZHVjdHMocmVxdWVzdGVkUGFnZSkudGhlbihmdW5jdGlvbihwcm9kdWN0cykge1xyXG5cdFx0XHRcdGluc3RhbmNlLnNldEN1cnJlbnQocmVxdWVzdGVkUGFnZSk7XHJcblx0XHRcdH0pO1xyXG5cdFx0fTtcclxuXHJcblx0XHR0aGlzLnByZXZpb3VzLmNoaWxkTm9kZXNbMF0ub25jbGljayA9IGZ1bmN0aW9uKGUpIHtcclxuXHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuXHRcdFx0bGV0IHJlcXVlc3RlZFBhZ2UgPSBpbnN0YW5jZS5jdXJyZW50LTE7XHJcblxyXG5cdFx0XHRpZihpbnN0YW5jZS5ub3RJblBhZ2VSYW5nZShyZXF1ZXN0ZWRQYWdlKSkge1xyXG5cdFx0XHRcdHRocm93IG5ldyBOb3RJblBhZ2VSYW5nZUV4Y2VwdGlvbjtcclxuXHRcdFx0fVxyXG5cdFx0XHRcclxuXHRcdFx0UHJvZHVjdHMkMi5sb2FkUHJvZHVjdHMocmVxdWVzdGVkUGFnZSkudGhlbihmdW5jdGlvbihwcm9kdWN0cykge1xyXG5cdFx0XHRcdGluc3RhbmNlLnNldEN1cnJlbnQocmVxdWVzdGVkUGFnZSk7XHJcblx0XHRcdH0pO1xyXG5cdFx0fTtcclxuXHJcblx0XHRmb3IodmFyIGkgPSAwOyBpIDwgdGhpcy5wYWdlcy5sZW5ndGg7IGkrKykge1xyXG5cdFx0XHR0aGlzLnBhZ2VzW2ldLmNoaWxkTm9kZXNbMF0ub25jbGljayA9IGZ1bmN0aW9uKGUpIHtcclxuXHRcdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XHJcblx0XHRcdFx0XHJcblx0XHRcdFx0bGV0IHJlcXVlc3RlZFBhZ2UgPSB0aGlzLmdldEF0dHJpYnV0ZSgnZGF0YS1wYWdlLW5yJyk7XHJcblx0XHRcdFx0XHJcblx0XHRcdFx0UHJvZHVjdHMkMi5sb2FkUHJvZHVjdHMocmVxdWVzdGVkUGFnZSkudGhlbihmdW5jdGlvbihwcm9kdWN0cykge1xyXG5cdFx0XHRcdFx0aW5zdGFuY2Uuc2V0Q3VycmVudChyZXF1ZXN0ZWRQYWdlKTtcclxuXHRcdFx0XHR9KTtcclxuXHRcdFx0fTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFNldHMgdGhlIGN1cnJlbnQgcGFnZS5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSBudW1iZXIgfCBwYWdlTnVtYmVyXHJcblx0ICogQHJldHVybiB2b2lkXHJcblx0ICovXHJcblx0c2V0Q3VycmVudChwYWdlTnVtYmVyKSBcclxuXHR7XHJcblx0XHR0aGlzLmN1cnJlbnQgPSBwYXJzZUludChwYWdlTnVtYmVyKTtcclxuXHRcdHRoaXMuY2hhbmdlVXJsKHBhZ2VOdW1iZXIpO1xyXG5cdFx0dGhpcy5zZXRBY3RpdmVMaW5rKHBhZ2VOdW1iZXIpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogR2V0cyB0aGUgY3VycmVudCBwYWdlLlxyXG5cdCAqXHJcblx0ICogQHJldHVybiBudW1iZXJcclxuXHQgKi9cclxuXHRnZXRDdXJyZW50KCkgXHJcblx0e1xyXG5cdFx0cmV0dXJuIHRoaXMuY3VycmVudDtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIENyZWF0ZXMgdGhlIHBhZ2luYXRpb24gbGlua3MuXHJcblx0ICpcclxuXHQgKiBAcmV0dXJuIEhUTUxVTGlzdEVsZW1lbnRcclxuXHQgKi9cclxuXHRjcmVhdGVMaW5rcygpIFxyXG5cdHtcclxuXHRcdGxldCB1bCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3VsJyk7XHJcblx0XHRcclxuXHRcdHRoaXMucGFnZXMgPSB0aGlzLmNyZWF0ZVBhZ2VMaW5rcygpO1xyXG5cdFx0dGhpcy5wcmV2aW91cyA9IHRoaXMuY3JlYXRlUHJldmlvdXNCdXR0b24oKTtcclxuXHRcdHRoaXMubmV4dCA9IHRoaXMuY3JlYXRlTmV4dEJ1dHRvbigpO1xyXG5cclxuXHRcdHVsLmNsYXNzTmFtZSA9ICdwYWdpbmF0aW9uJztcclxuXHRcdHVsLmFwcGVuZENoaWxkKHRoaXMucHJldmlvdXMpO1xyXG5cclxuXHRcdHRoaXMucGFnZXMuZm9yRWFjaChmdW5jdGlvbihwYWdlKSB7XHJcblx0XHRcdHVsLmFwcGVuZENoaWxkKHBhZ2UpO1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0dWwuYXBwZW5kQ2hpbGQodGhpcy5uZXh0KTtcclxuXHJcblx0XHRyZXR1cm4gdWw7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBDcmVhdGVzIHRoZSBwYWdlcyBpdGVtIGxpbmtzLlxyXG5cdCAqXHJcblx0ICogQHJldHVybiBhcnJheTxIVE1MTElFbGVtZW50PlxyXG5cdCAqL1xyXG5cdGNyZWF0ZVBhZ2VMaW5rcygpIFxyXG5cdHtcclxuXHRcdHZhciBwYWdlcyA9IFtdO1xyXG5cclxuXHRcdGZvcih2YXIgaSA9IDE7IGkgPD0gdGhpcy50b3RhbFBhZ2VzOyBpKyspIHtcclxuXHRcdFx0dmFyIHBhZ2VJdGVtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKTtcclxuXHRcdFx0dmFyIGxpbmsgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJyk7XHJcblx0XHRcdHBhZ2VJdGVtLmNsYXNzTmFtZSA9ICh0aGlzLmN1cnJlbnQgPT0gaSkgPyAncGFnZS1pdGVtIGFjdGl2ZScgOiAncGFnZS1pdGVtJztcclxuXHRcdFx0bGluay5jbGFzc05hbWUgPSAncGFnZS1saW5rJztcclxuXHRcdFx0bGluay5zZXRBdHRyaWJ1dGUoJ2hyZWYnLCAnP3BhZ2U9JysgaSk7XHJcblx0XHRcdGxpbmsuc2V0QXR0cmlidXRlKCdkYXRhLXBhZ2UtbnInLCBpKTtcclxuXHRcdFx0bGluay5pbm5lckhUTUwgPSBpO1xyXG5cdFx0XHRwYWdlSXRlbS5hcHBlbmRDaGlsZChsaW5rKTtcclxuXHRcdFx0cGFnZXMucHVzaChwYWdlSXRlbSk7XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIHBhZ2VzO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQ3JlYXRlcyB0aGUgcHJldmlvdXMgYnV0dG9uIGxpbmsuXHJcblx0ICpcclxuXHQgKiBAcmV0dXJuIEhUTUxMSUVsZW1lbnRcclxuXHQgKi9cclxuXHRjcmVhdGVQcmV2aW91c0J1dHRvbigpIFxyXG5cdHtcclxuXHRcdHZhciBsaSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJyk7XHJcblx0XHR2YXIgbGluayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKTtcclxuXHRcdHZhciBzcGFuMSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcclxuXHRcdHZhciBzcGFuMiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcclxuXHRcdFxyXG5cdFx0XHJcblx0XHRsaS5jbGFzc05hbWUgPSAncGFnZS1pdGVtJztcclxuXHRcdGxpbmsuY2xhc3NOYW1lID0gJ3BhZ2UtbGluayc7XHJcblx0XHRzcGFuMi5jbGFzc05hbWUgPSAnc3Itb25seSc7XHJcblxyXG5cdFx0bGluay5zZXRBdHRyaWJ1dGUoJ2hyZWYnLCAnJyk7XHJcblx0XHRsaW5rLnNldEF0dHJpYnV0ZSgnYXJpYS1sYWJlbCcsICdQcmV2aW91cycpO1xyXG5cdFx0c3BhbjEuc2V0QXR0cmlidXRlKCdhcmlhLWhpZGRlbicsICd0cnVlJyk7XHJcblxyXG5cdFx0c3BhbjEuaW5uZXJIVE1MID0gJyZsYXF1bzsnO1xyXG5cdFx0c3BhbjIuaW5uZXJIVE1MID0gJ1ByZXZpb3VzJztcclxuXHJcblx0XHRsaW5rLmFwcGVuZENoaWxkKHNwYW4xKTtcclxuXHRcdGxpbmsuYXBwZW5kQ2hpbGQoc3BhbjIpO1xyXG5cdFx0bGkuYXBwZW5kQ2hpbGQobGluayk7XHJcblxyXG5cdFx0cmV0dXJuIGxpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQ3JlYXRlcyB0aGUgbmV4dCBidXR0b24gbGluay5cclxuXHQgKlxyXG5cdCAqIEByZXR1cm4gSFRNTExJRWxlbWVudFxyXG5cdCAqL1xyXG5cdGNyZWF0ZU5leHRCdXR0b24oKSBcclxuXHR7XHJcblx0XHR2YXIgbGkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaScpO1xyXG5cdFx0dmFyIGxpbmsgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJyk7XHJcblx0XHR2YXIgc3BhbjEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XHJcblx0XHR2YXIgc3BhbjIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XHJcblx0XHRcclxuXHRcdGxpLmNsYXNzTmFtZSA9ICdwYWdlLWl0ZW0nO1xyXG5cdFx0bGluay5jbGFzc05hbWUgPSAncGFnZS1saW5rJztcclxuXHRcdHNwYW4yLmNsYXNzTmFtZSA9ICdzci1vbmx5JztcclxuXHJcblx0XHRsaW5rLnNldEF0dHJpYnV0ZSgnaHJlZicsICcnKTtcclxuXHRcdGxpbmsuc2V0QXR0cmlidXRlKCdhcmlhLWxhYmVsJywgJ05leHQnKTtcclxuXHRcdHNwYW4xLnNldEF0dHJpYnV0ZSgnYXJpYS1oaWRkZW4nLCAndHJ1ZScpO1xyXG5cclxuXHRcdHNwYW4xLmlubmVySFRNTCA9ICcmcmFxdW87JztcclxuXHRcdHNwYW4yLmlubmVySFRNTCA9ICdOZXh0JztcclxuXHJcblx0XHRsaW5rLmFwcGVuZENoaWxkKHNwYW4xKTtcclxuXHRcdGxpbmsuYXBwZW5kQ2hpbGQoc3BhbjIpO1xyXG5cdFx0bGkuYXBwZW5kQ2hpbGQobGluayk7XHJcblxyXG5cdFx0cmV0dXJuIGxpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQ2hlY2tzIGlmIHRoZSBnaXZlbiBwYWdlIGlzIGluIHJhbmdlLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIG51bWJlciB8IHBhZ2VOdW1iZXJcclxuXHQgKiBAcmV0dXJuIGJvb2xcclxuXHQgKi9cclxuXHRub3RJblBhZ2VSYW5nZShwYWdlTnVtYmVyKSBcclxuXHR7XHJcblx0XHRyZXR1cm4gKHBhZ2VOdW1iZXIgPiB0aGlzLnRvdGFsUGFnZXMgfHwgcGFnZU51bWJlciA8PSAwKSB8fCBpc05hTihwYWdlTnVtYmVyKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIENoYW5nZXMgdGhlIHVybCB0byBhIGdpdmVuIHBhZ2UgbnVtYmVyLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIG51bWJlciB8IHBhZ2VOdW1iZXJcclxuXHQgKiBAcmV0dXJuIHZvaWRcclxuXHQgKi9cclxuXHRjaGFuZ2VVcmwocGFnZU51bWJlcikgXHJcblx0e1xyXG5cdFx0cGFnZU51bWJlciA9ICBwYWdlTnVtYmVyIHx8IHF1ZXJ5U3RyaW5nKClbJ3BhZ2UnXTtcclxuXHRcdHdpbmRvdy5oaXN0b3J5LnJlcGxhY2VTdGF0ZSgnJywgJycsIHRoaXMudXBkYXRlVVJMUGFyYW1ldGVyKHdpbmRvdy5sb2NhdGlvbi5ocmVmLCAncGFnZScsIHBhZ2VOdW1iZXIpKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFNldHMgdGhlIGFjdGl2ZSBsaW5rLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIG51bWJlciB8IHBhZ2VOdW1iZXJcclxuXHQgKiBAcmV0dXJuIHZvaWRcclxuXHQgKi9cclxuXHRzZXRBY3RpdmVMaW5rKHBhZ2VOdW1iZXIpXHJcblx0e1xyXG5cdFx0Zm9yKHZhciBwYWdlIGluIHRoaXMucGFnZXMpIHtcclxuXHRcdFx0aWYgKHRoaXMucGFnZXNbcGFnZV0uY2hpbGROb2Rlc1swXS5nZXRBdHRyaWJ1dGUoJ2RhdGEtcGFnZS1ucicpID09IHBhZ2VOdW1iZXIpIHtcclxuXHRcdFx0XHRET00uYWRkQ2xhc3ModGhpcy5wYWdlc1twYWdlXSwgJ2FjdGl2ZScpO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdERPTS5yZW1vdmVDbGFzcyh0aGlzLnBhZ2VzW3BhZ2VdLCAnYWN0aXZlJyk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEdldCB0aGUgZ2V0IHZhcmlhYmxlcyBmcm9tIHRoZSB1cmwuXHJcblx0ICpcclxuXHQgKiBAcmV0dXJuIGFycmF5XHJcblx0ICovXHJcblx0cXVlcnlTdHJpbmcoKSBcclxuXHR7XHJcblx0XHR2YXIgdmFycyA9IHt9O1xyXG5cdFx0dmFyIHBhcnRzID0gd2luZG93LmxvY2F0aW9uLmhyZWYucmVwbGFjZSgvWz8mXSsoW149Jl0rKT0oW14mXSopL2dpLCBmdW5jdGlvbihtLCBrZXksIHZhbHVlKSB7XHJcblx0XHRcdHZhcnNba2V5XSA9IHZhbHVlO1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0cmV0dXJuIHZhcnM7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBNb2RpZmllcyB0aGUgZ2V0IHBhcmFtZXRlciBpbiB0aGUgdXJsLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIHN0cmluZyB8IHVybFxyXG5cdCAqIEBwYXJhbSBzdHJpbmcgfCBwYXJhbVxyXG5cdCAqIEBwYXJhbSBudW1iZXIgfCBwYXJhbVZhbFxyXG5cdCAqIEByZXR1cm4gc3RyaW5nXHJcblx0ICovXHJcblx0dXBkYXRlVVJMUGFyYW1ldGVyKHVybCwgcGFyYW0sIHBhcmFtVmFsKSBcclxuXHR7XHJcblx0ICAgIHZhciBuZXdBZGRpdGlvbmFsVVJMID0gXCJcIjtcclxuXHQgICAgdmFyIHRlbXBBcnJheSA9IHVybC5zcGxpdChcIj9cIik7XHJcblx0ICAgIHZhciBiYXNlVVJMID0gdGVtcEFycmF5WzBdO1xyXG5cdCAgICB2YXIgYWRkaXRpb25hbFVSTCA9IHRlbXBBcnJheVsxXTtcclxuXHQgICAgdmFyIHRlbXAgPSBcIlwiO1xyXG5cclxuXHQgICAgaWYgKGFkZGl0aW9uYWxVUkwpIHtcclxuXHQgICAgICAgIHRlbXBBcnJheSA9IGFkZGl0aW9uYWxVUkwuc3BsaXQoXCImXCIpO1xyXG5cdCAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0ZW1wQXJyYXkubGVuZ3RoOyBpKyspe1xyXG5cdCAgICAgICAgICAgIGlmICh0ZW1wQXJyYXlbaV0uc3BsaXQoJz0nKVswXSAhPSBwYXJhbSl7XHJcblx0ICAgICAgICAgICAgICAgIG5ld0FkZGl0aW9uYWxVUkwgKz0gdGVtcCArIHRlbXBBcnJheVtpXTtcclxuXHQgICAgICAgICAgICAgICAgdGVtcCA9IFwiJlwiO1xyXG5cdCAgICAgICAgICAgIH1cclxuXHQgICAgICAgIH1cclxuXHQgICAgfVxyXG5cclxuXHQgICAgdmFyIHJvd3NUZXh0ID0gdGVtcCArIFwiXCIgKyBwYXJhbSArIFwiPVwiICsgcGFyYW1WYWw7XHJcblx0ICAgIHJldHVybiBiYXNlVVJMICsgXCI/XCIgKyBuZXdBZGRpdGlvbmFsVVJMICsgcm93c1RleHQ7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBSZXNldHMgdGhlIHBhZ2luYXRpb24uXHJcblx0ICpcclxuXHQgKiBAcmV0dXJuIHZvaWRcclxuXHQgKi9cclxuXHRyZXNldCgpIFxyXG5cdHtcclxuXHRcdHRoaXMuc2V0Q3VycmVudCgxKTtcclxuXHRcdHRoaXMuY2hhbmdlVXJsKDEpO1xyXG5cdH1cclxufVxuXG5sZXQgZGVmYXVsdE1lc3NhZ2UkNSA9ICdJbiBvcmRlciB0byB1c2UgY29tcG9uZW50cyB5b3UgbXVzdCByZWdpc3RlciB0aGVtIHdpdGggdGhlIHNob3AhJzsgXHJcblxyXG5jbGFzcyBDb21wb25lbnROb3RSZWdpc3RlcmVkRXhjZXB0aW9uIGV4dGVuZHMgRXhjZXB0aW9uSGFuZGxlclxyXG57XHJcblx0Y29uc3RydWN0b3IobWVzc2FnZSA9IG51bGwpIFxyXG5cdHtcclxuXHRcdG1lc3NhZ2UgPSBtZXNzYWdlIHx8IGRlZmF1bHRNZXNzYWdlJDU7XHJcblx0XHRzdXBlcihtZXNzYWdlKTtcclxuICAgIFx0c3VwZXIuc3RhY2tUcmFjZSh0aGlzLCBtZXNzYWdlKTtcclxuICAgIH1cclxufVxuXG5sZXQgZGVmYXVsdFNldHRpbmdzID0ge1xuXHRkZWJ1Z19sZXZlbDogJ2Vycm9yJyxcblx0ZWxlbWVudDogJ2JvZHknLFxuXHRpbmplY3RfbGlicmFyaWVzOiBbXSxcblx0Y29tcG9uZW50czogWydQcm9kdWN0cycsICdTZXJ2aWNlcycsICdGaWx0ZXInLCAnUGFnaW5hdGlvbicsICdDYXJ0J11cbn07XG5cbmxldCBleHRlcm5hbExpYnJhcmllcyA9IHtcblx0Ym9vdHN0cmFwOiAnaHR0cHM6Ly9tYXhjZG4uYm9vdHN0cmFwY2RuLmNvbS9ib290c3RyYXAvMy4zLjcvY3NzL2Jvb3RzdHJhcC5taW4uY3NzJyxcbn07XG5cbmxldCBkZWJ1Z0xldmVsO1xuXG5jbGFzcyBUdXJib2VDb21tZXJjZSQxXG57XG5cdGNvbnN0cnVjdG9yKHNldHRpbmdzKVxuXHR7XG5cdFx0aWYodHlwZW9mIHNldHRpbmdzICE9ICdvYmplY3QnKSB7XG5cdFx0XHR0aHJvdyBuZXcgSW52YWxpZEFyZ3VtZW50RXhjZXB0aW9uJDE7XG5cdFx0fVxuXG5cdFx0dGhpcy5jb250YWluZXIgPSBuZXcgQ29udGFpbmVyO1xuXHRcdHRoaXMuc2V0dGluZ3MgPSBDb21tb24uZXh0ZW5kKGRlZmF1bHRTZXR0aW5ncywgc2V0dGluZ3MpO1xuXG5cdFx0dGhpcy5sb2FkRXh0ZXJuYWxMaWJyYXJpZXMoKTtcblx0XHR0aGlzLmFkZFN0eWxlVGFnKCk7XG5cblx0XHRkZWJ1Z0xldmVsID0gdGhpcy5zZXR0aW5ncy5kZWJ1Z19sZXZlbDtcblx0XHRcblx0XHRpZiAoZGVidWdMZXZlbCA9PSAnd2FybmluZycgfHwgZGVidWdMZXZlbCA9PSAnaW5mbycpIHtcblx0XHRcdHdpbmRvdy5vbmVycm9yID0gZnVuY3Rpb24oKSB7IHJldHVybiB0cnVlOyB9O1xuXHRcdH1cblxuXHRcdGJpbmRDb21wb25lbnRzRGVwZW5kZW5jaWVzLmNhbGwodGhpcywgc2V0dGluZ3MuY29tcG9uZW50cyk7XG5cblx0XHRyZXR1cm4gbmV3IFByb3h5KHRoaXMsIHtcblx0XHRcdGdldDogZnVuY3Rpb24odGFyZ2V0LCBzb3VyY2UpIHtcblx0XHRcdFx0aWYgKENvbW1vbi5pbl9hcnJheShzb3VyY2UsIHNldHRpbmdzLmNvbXBvbmVudHMpKSB7XG5cdFx0XHRcdFx0cmV0dXJuIHRhcmdldC5jb250YWluZXIubWFrZShzb3VyY2UpO1xuXHRcdFx0XHR9IGVsc2UgaWYgKHRhcmdldC5jb250YWluZXIuaW5zdGFuY2VFeGlzdChzb3VyY2UpKSB7XG5cdFx0XHRcdFx0cmV0dXJuIHRhcmdldC5jb250YWluZXIuZ2V0SW5zdGFuY2Uoc291cmNlKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdHRocm93IG5ldyBDb21wb25lbnROb3RSZWdpc3RlcmVkRXhjZXB0aW9uKCdjb21wb25lbnRzIG11c3QgYmUgcmVnaXN0ZXJlZCBpbiBvcmRlciB0byB1c2UgdGhlbS4nKTtcblx0XHRcdH1cblx0XHR9KTtcblx0fVxuXG5cdGxvYWRFeHRlcm5hbExpYnJhcmllcygpXG5cdHtcblx0XHRsZXQgaTtcblx0XHRsZXQgbGlicmFyaWVzID0gdGhpcy5zZXR0aW5ncy5pbmplY3RfbGlicmFyaWVzO1xuXG5cdFx0Zm9yIChpID0gMDsgaSA8IGxpYnJhcmllcy5sZW5ndGg7IGkrKykge1xuXHRcdFx0aWYgKGV4dGVybmFsTGlicmFyaWVzLmhhc093blByb3BlcnR5KGxpYnJhcmllc1tpXSkpIHtcblx0XHRcdFx0bGV0IGlkID0gJ1R1cmJvLWVDb21tZXJjZS0nICsgU3RyLnVjZmlyc3QobGlicmFyaWVzW2ldKTtcblx0XHRcdFx0XG5cdFx0XHRcdGlmICghIERPTS5maW5kKGlkKSkge1xuXHRcdFx0XHRcdERPTS5hZGRMaW5rZWRTdHlsZShpZCwgZXh0ZXJuYWxMaWJyYXJpZXNbbGlicmFyaWVzW2ldXSk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHQvKipcblx0ICogQWRkIHRoZSBlQ29tbWVyY2Ugc3R5bGUgdGFncyB0byB0aGUgRE9NLlxuXHQgKi9cblx0YWRkU3R5bGVUYWcoKSBcblx0e1xuXHRcdGlmKERPTS5maW5kKCcjVHVyYm9lLUNvbW1lcmNlJykpIHtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cblx0XHRsZXQgY3NzID0gYFxuXHRcdFx0JHt0aGlzLnNldHRpbmdzLmVsZW1lbnR9IHtcblx0XHRcdFx0cG9zaXRpb246IHJlbGF0aXZlO1xuXHRcdFx0XHRjbGVhcjogYm90aDtcblx0XHRcdH1cblx0XHRgO1xuXHQgICAgXG5cdCAgICBET00uYWRkU3R5bGUoJ1R1cmJvLWVDb21tZXJjZScsIGNzcyk7XG5cdH1cblxuXHRzdGF0aWMgZGVidWdMZXZlbCgpXG5cdHtcblx0XHRyZXR1cm4gZGVidWdMZXZlbDtcblx0fVxufVxuXG4vKipcbiAqIEJpbmRzIGNvbXBvbmVudHMgZGVwZW5kZW5jaWVzLlxuICpcbiAqIEBwYXJhbSBvYmplY3QgfCBjb21wb25lbnRzXG4gKiBAcmV0dXJuIHZvaWRcbiAqL1xuZnVuY3Rpb24gYmluZENvbXBvbmVudHNEZXBlbmRlbmNpZXMoY29tcG9uZW50cykge1xuXG5cdHRoaXMuY29udGFpbmVyLnNldEluc3RhbmNlKCdFdmVudHMnLCBuZXcgRXZlbnRNYW5hZ2VyKTtcblxuXHRsZXQgcmVxdWVzdCA9IHRoaXMuY29udGFpbmVyLm1ha2UobmV3IFJlcXVlc3QpO1xuXG5cdHRoaXMuY29udGFpbmVyLmJpbmQoJ0ZpbHRlcicsIGZ1bmN0aW9uKGNvbnRhaW5lcikge1xuXHRcdGxldCBjb21wb25lbnQgPSBuZXcgRmlsdGVyKGNvbnRhaW5lcik7XG5cdFx0Y29tcG9uZW50LmJvb3RlZCA9IHRydWU7IFxuXHRcdHJldHVybiBjb21wb25lbnQ7XG5cdH0pO1xuXHRcblx0dGhpcy5jb250YWluZXIuYmluZCgnU2VydmljZXMnLCBmdW5jdGlvbihjb250YWluZXIpIHsgXG5cdFx0bGV0IGNvbXBvbmVudCA9IG5ldyBTZXJ2aWNlcyhjb250YWluZXIpOyBcblx0XHRjb21wb25lbnQuYm9vdGVkID0gdHJ1ZTtcblx0XHRyZXR1cm4gY29tcG9uZW50O1xuXHR9KTtcblxuXHR0aGlzLmNvbnRhaW5lci5iaW5kKCdQcm9kdWN0cycsIGZ1bmN0aW9uKGNvbnRhaW5lcikge1xuXHRcdGxldCBjb21wb25lbnQgPSBuZXcgUHJvZHVjdHMoY29udGFpbmVyLCByZXF1ZXN0LCBjb250YWluZXIuRXZlbnRzKTtcblx0XHRjb21wb25lbnQuYm9vdGVkID0gdHJ1ZTtcblx0XHRyZXR1cm4gY29tcG9uZW50O1xuXHR9KTtcblxuXHR0aGlzLmNvbnRhaW5lci5iaW5kKCdQYWdpbmF0aW9uJywgZnVuY3Rpb24oY29udGFpbmVyKSB7XG5cdFx0bGV0IGNvbXBvbmVudCA9IG5ldyBQYWdpbmF0aW9uKGNvbnRhaW5lciwgY29udGFpbmVyLm1ha2UoJ1Byb2R1Y3RzJyksIGNvbnRhaW5lci5FdmVudHMpO1xuXHRcdGNvbXBvbmVudC5ib290ZWQgPSB0cnVlO1xuXHRcdHJldHVybiBjb21wb25lbnQ7XG5cdH0pO1xuXG5cdHRoaXMuY29udGFpbmVyLmJpbmQoJ0NhcnQnLCBmdW5jdGlvbihjb250YWluZXIpIHtcblx0XHRsZXQgY29tcG9uZW50ID0gbmV3IENhcnQoY29udGFpbmVyLCByZXF1ZXN0LCBjb250YWluZXIuRXZlbnRzKTtcblx0XHRjb21wb25lbnQuYm9vdGVkID0gdHJ1ZTtcblx0XHRyZXR1cm4gY29tcG9uZW50O1xuXHR9KTtcblxuXHR0aGlzLmNvbnRhaW5lci5GaWx0ZXIuYm9vdGVkID0gZmFsc2U7XG5cdHRoaXMuY29udGFpbmVyLlNlcnZpY2VzLmJvb3RlZCA9IGZhbHNlO1xuXHR0aGlzLmNvbnRhaW5lci5Qcm9kdWN0cy5ib290ZWQgPSBmYWxzZTtcblx0dGhpcy5jb250YWluZXIuUGFnaW5hdGlvbi5ib290ZWQgPSBmYWxzZTtcblx0dGhpcy5jb250YWluZXIuQ2FydC5ib290ZWQgPSBmYWxzZTtcbn1cblxucmV0dXJuIFR1cmJvZUNvbW1lcmNlJDE7XG5cbn0oKSk7XG4iXX0=
