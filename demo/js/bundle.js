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

			/**
    * Get the document height.
    *
    * @return number 
    */

		}, {
			key: 'documentHeight',
			value: function documentHeight() {
				return Math.max(document.body.scrollHeight, document.documentElement.scrollHeight, document.body.offsetHeight, document.documentElement.offsetHeight, document.body.clientHeight, document.documentElement.clientHeight);
			}

			/**
    * Get the window height.
    *
    * @return number 
    */

		}, {
			key: 'windowHeight',
			value: function windowHeight() {
				return window.innerHeight || (document.documentElement || document.body).clientHeight;
			}

			/**
    * Get the scroll offset position.
    *
    * @return number
    */

		}, {
			key: 'scrollYOffset',
			value: function scrollYOffset() {
				return window.pageYOffset || (document.documentElement || document.body.parentNode || document.body).scrollTop;
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
				if (url.charAt(0) != '/') {
					url = '/' + url;
				}

				var previousUrl = window.location.pathname;

				window.history.pushState({ "previous": previousUrl }, '', url);
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
    * Checks if a given url have parameters.
    *
    * @param string | url
    * @return bool
    */

		}, {
			key: 'hasParameters',
			value: function hasParameters(url) {
				return url.indexOf('?') >= 0;
			}
		}]);

		return Url;
	}();

	/**
  * @class Router
  *
  * Handles the client-side routing.
  */

	var Router = function () {
		/**
   * - Initialize the container
   * - Initialize the routes
   * - Attach event listeners for:
   * click, popstate, touchstart, hashchange.
   *
   * @param App\Core\Container 
   * @return void
   */
		function Router(container) {
			_classCallCheck(this, Router);

			this.container = container;
			this.routes = this.buildRoutes();
			this.hash = '##';

			if (typeof history != 'undefined') {
				history.replaceState({ "previous": '/' }, '', window.location.pathname);
			}

			window.addEventListener('hashchange', this.register.bind(this));
			window.addEventListener('popstate', this.register.bind(this));
			window.addEventListener('touchstart', this.register.bind(this));
			window.addEventListener('click', this.register.bind(this));
		}

		/**
   * Entry point for the application.
   * from here will be decided which
   * component should be displayed.
   *
   * @param object | event
   * @return void
   */


		_createClass(Router, [{
			key: 'register',
			value: function register(event) {
				var url = this.parseUrl();

				if (this.hashNavigation) {
					var modifiedUrl = this.hash + url + '?' + this.queryString;

					if (typeof event != 'undefined' && event.type == 'popstate') {
						Url.change(modifiedUrl);
					}
				}

				if (typeof event == 'undefined') {
					this.parseHttpRequest(url);
				} else {
					this.parseEvent(event, url);
				}
			}

			/**
    * Parse the url.
    * separate query string from url.
    *
    * @return url 
    */

		}, {
			key: 'parseUrl',
			value: function parseUrl() {
				var url = window.location.href;

				if (Url.hasParameters(url)) {
					var parts = url.split('?');
					this.queryString = parts[1];
					url = parts[0].replace(window.location.protocol + '//' + window.location.host, '');
					this.current = url;
				}

				if (url.indexOf(this.hash) >= 0) {
					url = window.location.pathname.replace(this.hash, '');
				}

				if (this.hashNavigation) {
					Url.change(this.hash + url + '?' + this.queryString);
				}

				return url;
			}

			/**
    * Parse a full http comming request.
    *
    * @param string | url
    * @return void
    */

		}, {
			key: 'parseHttpRequest',
			value: function parseHttpRequest(url) {
				this.current = url;
				this.dispatch(url);
			}

			/**
    * Parse a request happens by triggered event.
    *
    * @param string | url
    * @return void
    */

		}, {
			key: 'parseEvent',
			value: function parseEvent(event, url) {
				switch (event.type) {
					case 'touchstart':
					case 'click':
						event.preventDefault();

						// basically exit, stop parsing, the user did not click a link
						if (event.target.tagName.toLowerCase() != 'a' || DOM.hasClass(event.target, 'page-item') || DOM.hasClass(event.target, 'page-link')) {
							return;
						}

						// get the link href attribute, only the path segment.
						if (typeof event.target.pathname != 'undefined') {
							url = event.target.pathname;
						}

						break;
					case 'popstate':
						if (typeof event.state != 'undefined') {
							url = event.state.previous;
						}
						break;
					case 'hashchange':
						url = window.location.pathname.replace(this.hash, '');
						break;
				}

				this.container.Events.subscribe('route.dispatched', function (url) {
					if (this.hashNavigation) {
						url = this.hash + url;
					}

					Url.change(url);
				}.bind(this));

				this.current = url;
				this.dispatch(url);
			}

			/**
    * Dispaches the route for a given url.
    *
    * @param string | url
    * @return void
    */

		}, {
			key: 'dispatch',
			value: function dispatch(url) {
				// @todo check for parameters routes and replace fetch the value from the url.
				console.log(url);

				if (this.routes.indexOf(url) != -1) {
					switch (url) {
						case '/':
						case '/home':
							console.log('home');
							this.container.Products.hideAll();
							this.container.Filter.show();
							this.container.Products.show();
							this.container.Cart.show();
							this.container.Pagination.show();
							break;
						case '/checkout':
							console.log('checkout');
							this.container.Checkout.hideAll();
							this.container.Checkout.show();
							break;
						case '/info/:product':
							console.log('single product info page');
							this.container.Details.hideAll();
							this.container.Details.show();
							break;
						default:
							console.log('default route');
							break;
					}
				} else {
					throw new Error('No matching route found!');
				}

				this.container.Events.publish('route.dispatched', url);
			}

			/**
    * Based on developer's configuration.
    * attaches an hash for the navigation
    * to prevent webserver from not finding files
    * on page refresh.
    * 
    * @param bool | active
    * @return this
    */

		}, {
			key: 'hashNavigation',
			value: function hashNavigation() {
				var active = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

				this.hashNavigation = active;

				return this;
			}

			/**
    * Builds the routes.
    *
    * @return array
    */

		}, {
			key: 'buildRoutes',
			value: function buildRoutes() {
				return ['/', '/home', '/checkout', '/info/:product'];
			}
		}]);

		return Router;
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

	/**
  * @class BaseComponent
  * 
  * Common functionallity of components. 
  */

	var BaseComponent = function () {
		function BaseComponent() {
			_classCallCheck(this, BaseComponent);
		}

		_createClass(BaseComponent, [{
			key: 'hide',

			/**
    * Hides the component from the DOM.
    *
    * @return void 
    */
			value: function hide() {
				if (typeof this.element != 'undefined') {
					this.element.style.display = 'none';
				}
			}

			/**
    * Shows the element on the DOM.
    *
    * @return void 
    */

		}, {
			key: 'show',
			value: function show() {
				if (typeof this.element != 'undefined') {
					this.element.style.display = 'block';
				}
			}

			/**
    * Empty the component.
    *
    * @return void 
    */

		}, {
			key: 'empty',
			value: function empty() {
				if (typeof this.element != 'undefined') {
					this.element.innerHTML = '';
				}
			}
		}]);

		return BaseComponent;
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
	// Components
	// Exceptions
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

	/**
  * @class Cart
  *
  * Handles adding, removing, calculations of items.
  */

	var Cart = function (_BaseComponent) {
		_inherits(Cart, _BaseComponent);

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

			var _this5 = _possibleConstructorReturn(this, (Cart.__proto__ || Object.getPrototypeOf(Cart)).call(this));

			Container = container;
			Http = http;
			EventManager$2 = eventManager;

			_this5.previewElement = _this5.createPreviewElement();
			_this5.icon = createIcon.call(_this5);
			return _this5;
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

				this.draw();
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
					text: 'Checkout',
					href: '/checkout'
				});

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
			key: 'draw',
			value: function draw() {
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
		}]);

		return Cart;
	}(BaseComponent);

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

	// Helpers
	// Components
	// Exceptions
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

	/**
  * @class Filter
  *
  * The Filter Object, handles the filter of the products/services.
  */

	var Filter = function (_BaseComponent2) {
		_inherits(Filter, _BaseComponent2);

		/**
   * - Initialize the IoC container.
   *
   * @param \Core\Container | container
   * @return void
   */
		function Filter(container) {
			_classCallCheck(this, Filter);

			var _this6 = _possibleConstructorReturn(this, (Filter.__proto__ || Object.getPrototypeOf(Filter)).call(this));

			Container$1 = container;
			return _this6;
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

					this.draw();
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
			key: 'draw',
			value: function draw() {
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
	}(BaseComponent);

	// Helpers
	// Components
	// Exceptions
	/**
  * The default settings of the cart.
  *
  * @var object
  */


	var defaultSettings$3 = {
		element: '.details',
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

	/**
  * @class Checkout
  *
  * Handles the checkout process.
  * payments validation, cart validation etc..
  */

	var Details = function (_BaseComponent3) {
		_inherits(Details, _BaseComponent3);

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
		function Details(container, http, eventManager) {
			_classCallCheck(this, Details);

			var _this7 = _possibleConstructorReturn(this, (Details.__proto__ || Object.getPrototypeOf(Details)).call(this));

			Container$2 = container;
			Http$1 = http;
			EventManager$3 = eventManager;
			return _this7;
		}

		/**
   * Sets the object by the users setting.
   *
   * @param object | settings
   * @return void
   */


		_createClass(Details, [{
			key: 'setup',
			value: function setup(settings) {
				if ((typeof settings === 'undefined' ? 'undefined' : _typeof(settings)) != 'object') {
					throw new InvalidArgumentException$1();
				}

				this.settings = Common.extend(defaultSettings$3, settings);

				document.addEventListener('DOMContentLoaded', function () {

					this.setElement(this.settings.element);
					this.hide();
					this.draw();
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
			key: 'draw',
			value: function draw() {
				if (DOM.find('#Turbo-eCommerce-Details')) {
					return;
				}

				if (this.settings.no_css) {
					return;
				}

				var position = this.settings.fixed ? 'fixed' : 'absolute';

				var css = '\n\t\t\t' + this.settings.element + ' {\n\t\t\t\twidth: 100%;\n\t\t\t\tmin-height: 400px;\n\t\t\t\tborder: 1px solid #e4e4e4;\n\t\t\t}\n\t\t';

				DOM.addStyle('Turbo-eCommerce-Details', css);
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
					if (component.constructor.name != 'Details') {
						component.hide();
					}
				});
			}
		}]);

		return Details;
	}(BaseComponent);

	// Helpers
	// Components
	// Exceptions
	/**
  * The default settings of the cart.
  *
  * @var object
  */


	var defaultSettings$4 = {
		element: '.checkout',
		no_css: false
	};

	/**
  * Stores the container object.
  *
  * @var \Core\Container
  */
	var Container$3 = void 0;

	/**
  * Stores the event manager object.
  *
  * @var \Core\EventManager
  */
	var EventManager$4 = void 0;

	/**
  * Stores the request object.
  *
  * @var \Helpers\Request
  */
	var Http$2 = void 0;

	/**
  * @class Checkout
  *
  * Handles the checkout process.
  * payments validation, cart validation etc..
  */

	var Checkout = function (_BaseComponent4) {
		_inherits(Checkout, _BaseComponent4);

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

			var _this8 = _possibleConstructorReturn(this, (Checkout.__proto__ || Object.getPrototypeOf(Checkout)).call(this));

			Container$3 = container;
			Http$2 = http;
			EventManager$4 = eventManager;
			return _this8;
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

				this.settings = Common.extend(defaultSettings$4, settings);

				document.addEventListener('DOMContentLoaded', function () {

					this.setElement(this.settings.element);
					this.hide();
					this.draw();
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
			key: 'draw',
			value: function draw() {
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
				Container$3.Components.booted.forEach(function (component) {
					if (component.constructor.name != 'Checkout') {
						component.hide();
					}
				});
			}
		}]);

		return Checkout;
	}(BaseComponent);

	// Helpers
	// Components
	// Exceptions
	/**
  * The default settings of each product.
  *
  * @var object
  */


	var defaultSettings$5 = {
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
	var Container$4 = void 0;

	/**
  * Stores the container object.
  * 
  * @var \Core\EventManager
  */
	var EventManager$5 = void 0;

	/**
  * Stores the request object.
  * 
  * @var \Helper\Request 
  */
	var Http$3 = void 0;

	/**
  * Stores the chunked per 
  * page products.
  * 
  * @var array
  */
	var chunkedProducts = void 0;

	/**
  * @class Products
  *
  * The Products component, handles the products tasks.
  */

	var Products = function (_BaseComponent5) {
		_inherits(Products, _BaseComponent5);

		/**
   * Initalize the Container.
   *
   * @param \Core\Container | container
   * @param \Helpers\Request | http
   * @return void
   */
		function Products(container, http, eventManager) {
			_classCallCheck(this, Products);

			var _this9 = _possibleConstructorReturn(this, (Products.__proto__ || Object.getPrototypeOf(Products)).call(this));

			Container$4 = container;
			Http$3 = http;
			EventManager$5 = eventManager;
			chunkedProducts = [];
			return _this9;
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

				this.settings = Common.extend(defaultSettings$5, settings);
				this.totalItems = null;

				document.addEventListener('DOMContentLoaded', function () {

					this.setElement(this.settings.element);

					this.draw();

					this.loadProducts(1);
				}.bind(this));
			}

			/**
    * Loads the products for the page.
    * 
    * @param number | pageNumber
    * @param bool | append
    * @return void
    */

		}, {
			key: 'loadProducts',
			value: function loadProducts() {
				var pageNumber = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
				var append = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

				if (Container$4.Pagination && Container$4.Pagination.booted) {

					var limit = Container$4.Pagination.settings.per_page;

					switch (Container$4.Pagination.settings.processing) {
						case 'client-side':
							return this.loadPageProductsOnce(pageNumber, limit, append);
							break;
						case 'server-side':
							return this.loadPageProducts(pageNumber, limit, append);
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
    * @param number | pageNumber
    * @param bool | append
    * @return void
    */

		}, {
			key: 'loadPageProductsOnce',
			value: function loadPageProductsOnce(pageNumber, undefined) {
				var append = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

				var request = void 0;

				if (this.totalItems == null) {
					// need to fetch them from the server.
					request = this.getProducts();
				} else {
					// no need to wait can resolve immediately with the products. 
					request = Promise.resolve(this.totalItems);
				}

				return request.then(function (products) {
					this.totalItems = products;
					var pages = this.calculateClientPages(products);
					this.currentItems = pages[pageNumber - 1];

					if (typeof this.currentItems == 'undefined') {
						return null;
					}

					if (append) {
						this.appendProducts(this.currentItems);
					} else {
						this.replaceProducts(this.currentItems);
					}

					return this.currentItems;
				}.bind(this)).catch(function (error) {
					// throw new Error('Could not load products! Reason: ' + error);
				});
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
					EventManager$5.publish('products.loading', product);
					this.element.appendChild(product);
				}.bind(this));

				EventManager$5.publish('products.loaded', products);

				return products;
			}

			/**
    * Appends more products to the
    * div container.
    *
    * @param array | rawProducts
    * @return array
    */

		}, {
			key: 'appendProducts',
			value: function appendProducts(rawProducts) {
				if (!Array.isArray(rawProducts) || rawProducts.length <= 0 && typeof rawProducts[0] == 'string') {
					throw new InvalidArgumentException$1();
				}

				var products = this.buildProducts(rawProducts, this.settings.item_class, 'div');

				products.forEach(function (product) {
					EventManager$5.publish('products.loading', product);
					this.element.appendChild(product);
				}.bind(this));

				EventManager$5.publish('products.loaded', products);

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

				return Http$3.get({
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
					EventManager$5.publish('cart.product.added', attributes);
				});

				favorite.addEventListener('click', function (e) {
					e.preventDefault();
					this.innerHTML = '&#x2713;';
					EventManager$5.publish('cart.product.favorited', attributes);
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
			key: 'draw',
			value: function draw() {
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
    * Hides all irrelevant elements from the DOM.
    *
    * @return void 
    */

		}, {
			key: 'hideAll',
			value: function hideAll() {
				Container$4.Components.booted.forEach(function (component) {
					if (component.constructor.name != 'Products') {
						component.hide();
					}
				});
			}
		}]);

		return Products;
	}(BaseComponent);

	// Components
	/**
  * The Services Object, handles the services.
  */


	var Services = function (_BaseComponent6) {
		_inherits(Services, _BaseComponent6);

		function Services() {
			_classCallCheck(this, Services);

			return _possibleConstructorReturn(this, (Services.__proto__ || Object.getPrototypeOf(Services)).apply(this, arguments));
		}

		return Services;
	}(BaseComponent);

	var defaultMessage$4 = 'Sorry, no more pages.';

	var NotInPageRangeException = function (_ExceptionHandler5) {
		_inherits(NotInPageRangeException, _ExceptionHandler5);

		function NotInPageRangeException() {
			var message = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

			_classCallCheck(this, NotInPageRangeException);

			message = message || defaultMessage$4;

			var _this11 = _possibleConstructorReturn(this, (NotInPageRangeException.__proto__ || Object.getPrototypeOf(NotInPageRangeException)).call(this));

			_get(NotInPageRangeException.prototype.__proto__ || Object.getPrototypeOf(NotInPageRangeException.prototype), 'stackTrace', _this11).call(_this11, _this11, message);
			return _this11;
		}

		return NotInPageRangeException;
	}(ExceptionHandler);

	// Helpers
	// Components
	// Exceptions
	/**
  * The default settings of the pagination.
  *
  * @var object
  */


	var defaultSettings$6 = {
		element: '.pagination-links',
		processing: 'client-side',
		class: '',
		per_page: 5,
		total_items: 5,
		url_parameter: 'page',
		separator: '#',
		scroll: false
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
	var EventManager$6 = void 0;

	/**
  * @class Pagination
  *
  * The Pagination component, handles the pagination.
  */

	var Pagination = function (_BaseComponent7) {
		_inherits(Pagination, _BaseComponent7);

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

			var _this12 = _possibleConstructorReturn(this, (Pagination.__proto__ || Object.getPrototypeOf(Pagination)).call(this));

			Container$5 = container;
			Products$2 = products;
			EventManager$6 = events;
			return _this12;
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

				this.settings = Common.extend(defaultSettings$6, settings);
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
				if (this.settings.scroll == true) {

					window.onscroll = this.monitorScrolling.bind(this);
					return;
				}

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
    * Listen to scroll event.
    *
    * @param 
    * @return void
    */

		}, {
			key: 'monitorScrolling',
			value: function monitorScrolling(event) {
				var currentYOffset = DOM.scrollYOffset();
				var documentHeight = DOM.documentHeight();
				var windowHeight = DOM.windowHeight();

				if (documentHeight - windowHeight - currentYOffset <= 50) {
					var requestedPage = this.current + 1;

					if (Products$2 && Products$2.booted) {
						Products$2.loadProducts(requestedPage, true).then(function (products) {
							if (products) {
								this.setCurrent(requestedPage);
							}
						}.bind(this));
					}
				}
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
		}]);

		return Pagination;
	}(BaseComponent);

	var defaultMessage$5 = 'In order to use components you must register them with the shop!';

	var ComponentNotRegisteredException = function (_ExceptionHandler6) {
		_inherits(ComponentNotRegisteredException, _ExceptionHandler6);

		function ComponentNotRegisteredException() {
			var message = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

			_classCallCheck(this, ComponentNotRegisteredException);

			message = message || defaultMessage$5;

			var _this13 = _possibleConstructorReturn(this, (ComponentNotRegisteredException.__proto__ || Object.getPrototypeOf(ComponentNotRegisteredException)).call(this, message));

			_get(ComponentNotRegisteredException.prototype.__proto__ || Object.getPrototypeOf(ComponentNotRegisteredException.prototype), 'stackTrace', _this13).call(_this13, _this13, message);
			return _this13;
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
			this.components.Details = {};
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
				this.components.Details.booted = false;

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

				this.container.bind('Details', function (container, component) {
					instance.components[component] = new Details(container, container.Request, container.Events);
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

			var _this14 = _possibleConstructorReturn(this, (InvalidBindingException.__proto__ || Object.getPrototypeOf(InvalidBindingException)).call(this, message));

			_get(InvalidBindingException.prototype.__proto__ || Object.getPrototypeOf(InvalidBindingException.prototype), 'stackTrace', _this14).call(_this14, _this14, message);
			return _this14;
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

	var Container$6 = function () {
		/**
   * - Initialize instances member.
   * - Register bindings.
   *
   * @return void
   */
		function Container$6() {
			_classCallCheck(this, Container$6);

			this.instances = [];
			this.register();
			this.registerProviders();
			this.registerRouter();
		}

		/**
   * Binds key to concrete class.
   *
   * @param string | key
   * @param class | concrete
   * @return void
   */


		_createClass(Container$6, [{
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
		}, {
			key: 'registerRouter',
			value: function registerRouter() {
				this.setInstance('Router', new Router(this));
			}
		}]);

		return Container$6;
	}();

	// Helpers
	// Core
	// Exceptions
	/**
  * Stores the default settings.
  *
  * @var object
  */


	var defaultSettings$7 = {
		debug_level: 'error',
		element: 'body',
		inject_libraries: [],
		components: ['Products', 'Services', 'Filter', 'Pagination', 'Cart'],
		loading_animation: true,
		hash_navigation: false
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

			this.settings = Common.extend(defaultSettings$7, settings);

			ExceptionHandler.setDebugLevel = this.settings.debug_level;

			this.loadExternalLibraries();

			this.container = new Container$6();

			this.components = this.container.make('Components');
			this.components.register(this.settings.components);

			document.addEventListener('DOMContentLoaded', function () {
				this.setElement(this.settings.element);

				this.container.Router.hashNavigation(this.settings.hash_navigation).register();

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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlR1cmJvRWNvbW1lcmNlLmpzIl0sIm5hbWVzIjpbIlR1cmJvRWNvbW1lcmNlIiwiU3RyIiwic3RyaW5nIiwicmVwbGFjZSIsInRvTG93ZXJDYXNlIiwibGVuZ3RoIiwicG9zc2libGUiLCJpIiwiY2hhckF0IiwiTWF0aCIsImZsb29yIiwicmFuZG9tIiwidG9VcHBlckNhc2UiLCJzbGljZSIsImRlYnVnTGV2ZWwiLCJFeGNlcHRpb25IYW5kbGVyIiwibGV2ZWwiLCJ3aW5kb3ciLCJvbmVycm9yIiwiRXJyb3IiLCJjYXB0dXJlU3RhY2tUcmFjZSIsImNvbnN0cnVjdG9yIiwibmFtZSIsImVycm9yIiwibWVzc2FnZSIsImN1c3RvbUFjdGlvbnMiLCJoYW5kbGVFcnJvcnMiLCJoYW5kbGVXYXJuaW5ncyIsImhhbmRsZUluZm9zIiwiY29uc29sZSIsIndhcm4iLCJpbmZvIiwiZGVmYXVsdE1lc3NhZ2UiLCJJbnZhbGlkQXJndW1lbnRFeGNlcHRpb24kMSIsIkRPTSIsImVsZW1lbnQiLCJjbGFzc05hbWUiLCJuZXdDbGFzc05hbWUiLCJyZW1vdmVDbGFzcyIsImFkZENsYXNzIiwidW5kZWZpbmVkIiwiY2xhc3NOYW1lcyIsInNwbGl0IiwiZm9yRWFjaCIsImNsYXNzTGlzdCIsImFkZCIsImluZGV4T2YiLCJyZW1vdmUiLCJwYXJlbnROb2RlIiwicmVtb3ZlQ2hpbGQiLCJpZCIsImNzcyIsImhlYWQiLCJkb2N1bWVudCIsImdldEVsZW1lbnRzQnlUYWdOYW1lIiwic3R5bGVUYWciLCJjcmVhdGVFbGVtZW50IiwiQ1NTIiwibWluaWZ5Q3NzIiwiaW5uZXJIVE1MIiwic2V0QXR0cmlidXRlIiwiYXBwZW5kQ2hpbGQiLCJzb3VyY2UiLCJsaW5rZWRTdHlsZVRhZyIsImVsZW1lbnRUeXBlIiwib3B0aW9ucyIsIm9wdGlvbiIsInNlY29uZENsYXNzTmFtZSIsInRvZ2dsZSIsInNlbGVjdG9yIiwiY29udGV4dCIsInF1ZXJ5RWxlbWVudCIsIm1heCIsImJvZHkiLCJzY3JvbGxIZWlnaHQiLCJkb2N1bWVudEVsZW1lbnQiLCJvZmZzZXRIZWlnaHQiLCJjbGllbnRIZWlnaHQiLCJpbm5lckhlaWdodCIsInBhZ2VZT2Zmc2V0Iiwic2Nyb2xsVG9wIiwicGFyZW50RWxlbWVudCIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJoYXNDaGlsZCIsImNoaWxkRWxlbWVudCIsIm5vZGUiLCJDb21tb24iLCJjdXJyZW50T2JqZWN0IiwibmV3T2JqZWN0IiwiZXh0ZW5kZWQiLCJwcm9wIiwiT2JqZWN0IiwicHJvdG90eXBlIiwiaGFzT3duUHJvcGVydHkiLCJjYWxsIiwibmVlZGxlIiwiaHlzdGFjayIsIkFycmF5IiwidG90YWwiLCJzaXplIiwiaXNOYU4iLCJwYXJzZUludCIsImNvbGxlY3Rpb24iLCJjZWlsIiwic3RhcnQiLCJlbmQiLCJwdXNoIiwib2JqZWN0IiwiZGVmYXVsdE1lc3NhZ2UkMSIsIkludmFsaWREYXRhU3RydWN0dXJlRXhjZXB0aW9uIiwiZGVmYXVsdFNldHRpbmdzIiwiaGVhZGVycyIsImFzeW5jIiwiUmVxdWVzdCIsInNldHRpbmdzIiwiZXh0ZW5kIiwic2V0RGVmYXVsdFJlcXVlc3RIZWFkZXIiLCJoZWFkZXIiLCJvcGVuIiwiWE1MSHR0cFJlcXVlc3QiLCJzZXRSZXF1ZXN0SGVhZGVyIiwicmVzcG9uc2UiLCJhcHBseSIsImFyZ3VtZW50cyIsInhociIsImJlZm9yZSIsIlByb21pc2UiLCJyZXNvbHZlIiwicmVqZWN0IiwiZGF0YSIsInVybCIsInJlc3BvbnNlVHlwZSIsImRhdGFUeXBlIiwidGltZW91dCIsIm9ucmVhZHlzdGF0ZWNoYW5nZSIsInJlYWR5U3RhdGUiLCJzdGF0dXMiLCJyZXNwb25zZVRleHQiLCJhZnRlciIsInNlbmQiLCJxdWVyeVN0cmluZyIsImtleXMiLCJtYXAiLCJrZXkiLCJlbmNvZGVVUklDb21wb25lbnQiLCJqb2luIiwiQWN0aXZlWE9iamVjdCIsIm92ZXJyaWRlTWltZVR5cGUiLCJKU09OIiwicGFyc2UiLCJvbmFib3J0IiwiVXJsIiwiY29udGVudCIsInVybFBhdGgiLCJmaW5kIiwidGl0bGUiLCJoaXN0b3J5IiwicHVzaFN0YXRlIiwidmFsdWUiLCJzZXBhcmF0b3IiLCJyZWdFeHAiLCJSZWdFeHAiLCJwYWlyU2VwYXJhdG9yIiwibWF0Y2giLCJwYXJhbWV0ZXJLZXkiLCJwYXJhbWV0ZXJWYWx1ZSIsInJlcXVlc3RlZFVybCIsImNoYW5nZVF1ZXJ5UGFyYW1ldGVyVmFsdWUiLCJsb2NhdGlvbiIsImhyZWYiLCJyZXBsYWNlU3RhdGUiLCJwcmV2aW91c1VybCIsInBhdGhuYW1lIiwidmFycyIsInBhcnRzIiwibSIsIlJvdXRlciIsImNvbnRhaW5lciIsInJvdXRlcyIsImJ1aWxkUm91dGVzIiwiaGFzaCIsImFkZEV2ZW50TGlzdGVuZXIiLCJyZWdpc3RlciIsImJpbmQiLCJldmVudCIsInBhcnNlVXJsIiwiaGFzaE5hdmlnYXRpb24iLCJtb2RpZmllZFVybCIsInR5cGUiLCJjaGFuZ2UiLCJwYXJzZUh0dHBSZXF1ZXN0IiwicGFyc2VFdmVudCIsImhhc1BhcmFtZXRlcnMiLCJwcm90b2NvbCIsImhvc3QiLCJjdXJyZW50IiwiZGlzcGF0Y2giLCJwcmV2ZW50RGVmYXVsdCIsInRhcmdldCIsInRhZ05hbWUiLCJoYXNDbGFzcyIsInN0YXRlIiwicHJldmlvdXMiLCJFdmVudHMiLCJzdWJzY3JpYmUiLCJsb2ciLCJQcm9kdWN0cyIsImhpZGVBbGwiLCJGaWx0ZXIiLCJzaG93IiwiQ2FydCIsIlBhZ2luYXRpb24iLCJDaGVja291dCIsIkRldGFpbHMiLCJwdWJsaXNoIiwiYWN0aXZlIiwiZGVmYXVsdE1lc3NhZ2UkMiIsIkJhZEV2ZW50Q2FsbEV4Y2VwdGlvbiIsIkV2ZW50TWFuYWdlciIsImV2ZW50cyIsImNhbGxiYWNrIiwiSW52YWxpZEFyZ3VtZW50RXhjZXB0aW9uIiwiQ29va2llIiwiZGF5cyIsInN0cmluZ2lmeSIsImV4cGlyZXMiLCJkYXRlIiwiRGF0ZSIsInNldFRpbWUiLCJnZXRUaW1lIiwidG9HTVRTdHJpbmciLCJjb29raWUiLCJjX3N0YXJ0IiwiY19lbmQiLCJ1bmVzY2FwZSIsInN1YnN0cmluZyIsIkJhc2VDb21wb25lbnQiLCJzdHlsZSIsImRpc3BsYXkiLCJkZWZhdWx0TWVzc2FnZSQzIiwiSW52YWxpZENhcnRJdGVtRXhjZXB0aW9uIiwiZGVmYXVsdFNldHRpbmdzJDEiLCJjb29raWVfbmFtZSIsInByZXZpZXdfY2xhc3MiLCJsb2FkZXIiLCJjbGFzcyIsIndpZHRoIiwiaGVpZ2h0IiwicGxhY2VtZW50IiwiZml4ZWQiLCJob3Zlcl9jb2xvciIsIm5vX2NzcyIsIkNvbnRhaW5lciIsIkV2ZW50TWFuYWdlciQyIiwiSHR0cCIsImxvYWRpbmdPdmVybGF5IiwiaXRlbXNEaXYiLCJodHRwIiwiZXZlbnRNYW5hZ2VyIiwicHJldmlld0VsZW1lbnQiLCJjcmVhdGVQcmV2aWV3RWxlbWVudCIsImljb24iLCJjcmVhdGVJY29uIiwic2V0RWxlbWVudCIsImRyYXciLCJiaW5kRXZlbnRMaXN0ZW5lcnMiLCJpc0VtcHR5IiwiZ2V0Iiwic2V0dXBDYXJ0IiwiY2FydCIsImVtcHR5T2JqZWN0IiwiaXRlbXMiLCJmYXZvcml0ZXMiLCJzZXQiLCJpdGVtIiwicXVhbnRpdHkiLCJpbmNyZW1lbnRlZCIsImFscmVhZHlGYXZvcml0ZWQiLCJzcGxpY2UiLCJ0YWJsZSIsImF0dHJpYnV0ZXMiLCJ0ciIsInRkIiwiYXR0cmlidXRlIiwiaW1hZ2UiLCJzcmMiLCJzcGFuIiwiaHRtbCIsImN1cnJlbmN5IiwiYW1vdW50IiwiY29sc3BhbiIsImNoZWNrb3V0IiwidGV4dCIsInBhcnNlRmxvYXQiLCJwcmljZSIsInRvRml4ZWQiLCJwb3NpdGlvbiIsImFkZFN0eWxlIiwiY3JlYXRlTG9hZGVyIiwicHJldmlld1N0YXJ0TG9hZGluZyIsImdldENhcnRJdGVtcyIsImFkZFRvUHJldmlldyIsImluc3RhbmNlIiwic2V0VGltZW91dCIsInByZXZpZXdTdG9wTG9hZGluZyIsIm9uY2xpY2siLCJlIiwidG9nZ2xlQ2FydFByZXZpZXciLCJvcGVuQ2FydFByZXZpZXciLCJhZGRJdGVtIiwicmVsb2FkQ2FydFByZXZpZXciLCJmYXZvcml0ZUl0ZW0iLCJzd2l0Y2hDbGFzc2VzIiwib3BlbmluZyIsInRvZ2dsZUNsYXNzIiwiY2xvc2UiLCJzdmciLCJjcmVhdGVFbGVtZW50TlMiLCJnIiwicGF0aCIsImRpdiIsImNvdW50IiwiZ3JvdXBzIiwicmVjdGFuZ2VscyIsImFuaW1hdGlvbnMiLCJyb3RhdGlvbiIsImdyb3VwIiwicmVjdGFuZ2VsIiwiYmVnaW4iLCJhbmltYXRlIiwiZGVmYXVsdFNldHRpbmdzJDIiLCJDb250YWluZXIkMSIsIm1pbldpZHRoIiwibWluX3dpZHRoIiwiZGVmYXVsdFNldHRpbmdzJDMiLCJDb250YWluZXIkMiIsIkV2ZW50TWFuYWdlciQzIiwiSHR0cCQxIiwiaGlkZSIsIkNvbXBvbmVudHMiLCJib290ZWQiLCJjb21wb25lbnQiLCJkZWZhdWx0U2V0dGluZ3MkNCIsIkNvbnRhaW5lciQzIiwiRXZlbnRNYW5hZ2VyJDQiLCJIdHRwJDIiLCJkZWZhdWx0U2V0dGluZ3MkNSIsIml0ZW1fY2xhc3MiLCJhZGRfYnV0dG9uX2NsYXNzIiwiZmF2b3JpdGVfYnV0dG9uX2NsYXNzIiwiQ29udGFpbmVyJDQiLCJFdmVudE1hbmFnZXIkNSIsIkh0dHAkMyIsImNodW5rZWRQcm9kdWN0cyIsInRvdGFsSXRlbXMiLCJsb2FkUHJvZHVjdHMiLCJwYWdlTnVtYmVyIiwiYXBwZW5kIiwibGltaXQiLCJwZXJfcGFnZSIsInByb2Nlc3NpbmciLCJsb2FkUGFnZVByb2R1Y3RzT25jZSIsImxvYWRQYWdlUHJvZHVjdHMiLCJyZXF1ZXN0IiwiZ2V0UHJvZHVjdHMiLCJ0aGVuIiwicHJvZHVjdHMiLCJjdXJyZW50SXRlbXMiLCJyZXBsYWNlUHJvZHVjdHMiLCJjYXRjaCIsInBhZ2VzIiwiY2FsY3VsYXRlQ2xpZW50UGFnZXMiLCJhcHBlbmRQcm9kdWN0cyIsInRvdGFsX2l0ZW1zIiwicGVyUGFnZSIsImFycmF5X2NodW5rIiwicmF3UHJvZHVjdHMiLCJpc0FycmF5IiwiYnVpbGRQcm9kdWN0cyIsInByb2R1Y3QiLCJhY3Rpb24iLCJhdHRyaWJ1dGVzQ29sbGVjdGlvbiIsInRhZ1R5cGUiLCJidWlsdFByb2R1Y3RzIiwiYnVpbHRQcm9kdWN0IiwiYnVpbGRQcm9kdWN0Iiwib3ZlcmxheSIsImFkZERlZmF1bHRBdHRyaWJ1dGVzIiwidGFnIiwib3V0ZXJIVE1MIiwic3BhbjIiLCJpbl9hcnJheSIsImtlYmFiQ2FzZSIsImFkZFRvQ2FydCIsImZhdm9yaXRlIiwibWF4V2lkdGgiLCJtYXhfd2lkdGgiLCJTZXJ2aWNlcyIsImRlZmF1bHRNZXNzYWdlJDQiLCJOb3RJblBhZ2VSYW5nZUV4Y2VwdGlvbiIsImRlZmF1bHRTZXR0aW5ncyQ2IiwidXJsX3BhcmFtZXRlciIsInNjcm9sbCIsIkNvbnRhaW5lciQ1IiwiUHJvZHVjdHMkMiIsIkV2ZW50TWFuYWdlciQ2Iiwic2VydmljZXMiLCJzZXRDdXJyZW50IiwidG90YWxQYWdlcyIsImNhbGN1bGF0ZVRvdGFsUGFnZXMiLCJidWlsZFBhZ2luYXRpb24iLCJvbnNjcm9sbCIsIm1vbml0b3JTY3JvbGxpbmciLCJsaW5rcyIsImNyZWF0ZUxpbmtzIiwicmVwbGFjZUxpbmtzIiwiY3VycmVudFlPZmZzZXQiLCJzY3JvbGxZT2Zmc2V0IiwiZG9jdW1lbnRIZWlnaHQiLCJ3aW5kb3dIZWlnaHQiLCJyZXF1ZXN0ZWRQYWdlIiwibmV4dCIsImNoaWxkTm9kZXMiLCJub3RJblBhZ2VSYW5nZSIsImdldEF0dHJpYnV0ZSIsImNoYW5nZVVybCIsInNldEFjdGl2ZUxpbmsiLCJ1bCIsImNyZWF0ZVBhZ2VMaW5rcyIsImNyZWF0ZVByZXZpb3VzQnV0dG9uIiwiY3JlYXRlTmV4dEJ1dHRvbiIsInBhZ2UiLCJwYWdlSXRlbSIsImxpbmsiLCJsaSIsInNwYW4xIiwiY2hhbmdlUGFyYW1ldGVyIiwiZGVmYXVsdE1lc3NhZ2UkNSIsIkNvbXBvbmVudE5vdFJlZ2lzdGVyZWRFeGNlcHRpb24iLCJDb21wb25lbnRzUHJvdmlkZXIiLCJjb21wb25lbnRzIiwiYXZhaWxhYmxlIiwiZXhpc3RzIiwibWFrZSIsImRlZmF1bHRNZXNzYWdlJDYiLCJJbnZhbGlkQmluZGluZ0V4Y2VwdGlvbiIsIkNvbnRhaW5lciQ2IiwiaW5zdGFuY2VzIiwicmVnaXN0ZXJQcm92aWRlcnMiLCJyZWdpc3RlclJvdXRlciIsImNvbmNyZXRlIiwibmFtZXNwYWNlIiwiYWxpYXMiLCJpbnN0YW5jZUV4aXN0IiwiZ2V0SW5zdGFuY2UiLCJzZXRJbnN0YW5jZSIsImRlZmF1bHRTZXR0aW5ncyQ3IiwiZGVidWdfbGV2ZWwiLCJpbmplY3RfbGlicmFyaWVzIiwibG9hZGluZ19hbmltYXRpb24iLCJoYXNoX25hdmlnYXRpb24iLCJleHRlcm5hbExpYnJhcmllcyIsImJvb3RzdHJhcCIsInNldERlYnVnTGV2ZWwiLCJsb2FkRXh0ZXJuYWxMaWJyYXJpZXMiLCJzdGFydExvYWRpbmciLCJhZGRTdHlsZVRhZyIsIlByb3h5Iiwic2hvcCIsInByb3ZpZGUiLCJsaWJyYXJpZXMiLCJ1Y2ZpcnN0IiwiYWRkTGlua2VkU3R5bGUiLCJjbGllbnRXaWR0aCIsImZpbGwiLCJwcm9ncmVzcyIsIm1heFNpemUiLCJyZXF1ZXN0QW5pbWF0aW9uRnJhbWUiLCJwcm9ncmVzc0RyYXciLCJ0cmFuc2Zvcm0iLCJkb25lIiwib3BhY2l0eSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLElBQUlBLGlCQUFrQixZQUFZO0FBQ2xDOztBQUVBOzs7Ozs7OztBQUhrQyxLQVc1QkMsR0FYNEI7QUFBQTtBQUFBO0FBQUE7O0FBQUE7QUFBQTs7QUFhakM7Ozs7OztBQWJpQyw2QkFtQmhCQyxNQW5CZ0IsRUFvQmpDO0FBQ0MsV0FBT0EsT0FBT0MsT0FBUCxDQUFlLGlCQUFmLEVBQWtDLE9BQWxDLEVBQTJDQyxXQUEzQyxFQUFQO0FBQ0E7O0FBRUQ7Ozs7Ozs7QUF4QmlDO0FBQUE7QUFBQSwwQkE4Qm5CQyxNQTlCbUIsRUErQmpDO0FBQ0MsUUFBSUgsU0FBUyxFQUFiO0FBQ0EsUUFBSUksV0FBVyxnRUFBZjs7QUFF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U0FBWCxHQUF1QixpQkFBaUJKLFFBQWpCLEdBQTRCLEtBQW5EOztBQUVBQSxlQUFZLEVBQVo7O0FBRUEsT0FBSUEsWUFBWSxDQUFoQixFQUFtQjtBQUNsQm5VLFlBQVFxRixLQUFSLENBQWNDLE9BQWQsR0FBd0IsT0FBeEI7O0FBRUEsUUFBSSxPQUFPTSxNQUFQLElBQWlCLFdBQXJCLEVBQWtDO0FBQ2pDbE4sU0FBSWEsTUFBSixDQUFXcU0sTUFBWDtBQUNBOztBQUVEO0FBQ0E7O0FBRURuTyxVQUFPNGMscUJBQVAsQ0FBNkJHLElBQTdCO0FBQ0E7QUFDRDs7QUFFRCxRQUFPaGUsY0FBUDtBQUVDLENBbmhJcUIsRUFBdEIiLCJmaWxlIjoiVHVyYm9FY29tbWVyY2UuanMiLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgVHVyYm9FY29tbWVyY2UgPSAoZnVuY3Rpb24gKCkge1xuJ3VzZSBzdHJpY3QnO1xuXG4vKipcclxuICogQGZpbGUgXHJcbiAqIFN0ciBjbGFzcy5cclxuICpcclxuICogQWRkcyBzb21lIHVzZWZ1bCBmdW5jdGlvbmFsaXR5IGZvclxyXG4gKiBtYW5pcHVsYXRpbmcgc3RyaW5ncyBvciBjcmVhdGluZyBzdHJpbmcuXHJcbiAqL1xyXG5cclxuY2xhc3MgU3RyXHJcbntcclxuXHQvKipcclxuXHQgKiBDb252ZXJ0IGNhbWVsQ2FzZSB0byBrZWJhYi1jYXNlLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIHN0cmluZyB8IHN0cmluZ1xyXG5cdCAqIEByZXR1cm4gc3RyaW5nXHJcblx0ICovXHJcblx0c3RhdGljIGtlYmFiQ2FzZShzdHJpbmcpIFxyXG5cdHtcclxuXHRcdHJldHVybiBzdHJpbmcucmVwbGFjZSgvKFthLXpdKShbQS1aXSkvZywgJyQxLSQyJykudG9Mb3dlckNhc2UoKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEdlbmVyYXRlcyBhIHJhbmRvbSBzdHJpbmcuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gaW50ZWdlciB8IGxlbmd0aFxyXG5cdCAqIEByZXR1cm4gc3RyaW5nXHJcblx0ICovXHJcblx0c3RhdGljIHJhbmRvbShsZW5ndGgpIFxyXG5cdHtcclxuXHRcdGxldCBzdHJpbmcgPSAnJztcclxuXHRcdGxldCBwb3NzaWJsZSA9IFwiQUJDREVGR0hJSktMTU5PUFFSU1RVVldYWVphYmNkZWZnaGlqa2xtbm9wcXJzdHV2d3h5ejAxMjM0NTY3ODlcIjtcclxuXHJcblx0XHRmb3IgKGxldCBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XHJcblx0ICAgIFx0c3RyaW5nICs9IHBvc3NpYmxlLmNoYXJBdChNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBwb3NzaWJsZS5sZW5ndGgpKTtcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gc3RyaW5nO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQ2hhbmdlcyB0aGUgZmlyc3QgbGV0dGVyIFxyXG5cdCAqIG9mIHRoZSBzdHJpbmcgdG8gdXBwZXJjYXNlLlxyXG5cdCAqIFxyXG5cdCAqIEBwYXJhbSBzdHJpbmcgfCBzdHJpbmdcclxuXHQgKiBAcmV0dXJuIHN0cmluZ1xyXG5cdCAqL1xyXG5cdHN0YXRpYyB1Y2ZpcnN0KHN0cmluZykgXHJcblx0e1xyXG5cdCAgICByZXR1cm4gc3RyaW5nLmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpICsgc3RyaW5nLnNsaWNlKDEpO1xyXG5cdH1cclxufVxuXG4vKipcclxuICogU3RvcmVzIHRoZSBkZWJ1ZyBsZXZlbC5cclxuICpcclxuICogQHZhciBzdHJpbmcgXHJcbiAqL1xyXG5sZXQgZGVidWdMZXZlbDtcclxuXHJcbmNsYXNzIEV4Y2VwdGlvbkhhbmRsZXJcclxue1xyXG5cdC8qKlxyXG5cdCAqIFNldHRlciBmb3IgdGhlIGRlYnVnIGxldmVsLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIHN0cmluZyB8IGxldmVsXHJcblx0ICogQHJldHVybiB2b2lkXHJcblx0ICovXHJcblx0c3RhdGljIHNldCBzZXREZWJ1Z0xldmVsKGxldmVsKVxyXG5cdHtcclxuXHRcdC8vIFN1cHByZXNzIGVycm9ycyBkZXBlbmRzIG9uIHRoZSBkZWJ1ZyBsZXZlbC5cclxuXHRcdGlmIChsZXZlbCA9PSAnd2FybmluZycgfHwgbGV2ZWwgPT0gJ2luZm8nKSB7XHJcblx0XHRcdHdpbmRvdy5vbmVycm9yID0gZnVuY3Rpb24oKSB7IHJldHVybiB0cnVlOyB9O1xyXG5cdFx0fVxyXG5cclxuXHRcdGRlYnVnTGV2ZWwgPSBsZXZlbDtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEV4dGVuZGVkIGNvbnN0cnVjdG9yLCBjYXB0dXJlcyB0aGVcclxuXHQgKiBzdGFjayB0cmFjZS5cclxuXHQgKlxyXG5cdCAqIEByZXR1cm4gdm9pZFxyXG5cdCAqL1xyXG5cdGNvbnN0cnVjdG9yKClcclxuXHR7XHJcblx0XHRpZiAoRXJyb3IuY2FwdHVyZVN0YWNrVHJhY2UpIHtcclxuXHRcdFx0RXJyb3IuY2FwdHVyZVN0YWNrVHJhY2UodGhpcywgdGhpcy5jb25zdHJ1Y3Rvci5uYW1lKTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEhhbmRsZXMgYWxsIGV4Y2VwdGlvbnMuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gb2JqZWN0IHwgZXJyb3IgfCBUaHJvd2VuIEV4Y2VwdGlvbiBPYmplY3RcclxuXHQgKiBAcGFyYW0gc3RyaW5nIHwgbWVzc2FnZVxyXG5cdCAqIEByZXR1cm4gdm9pZFxyXG5cdCAqL1xyXG5cdHN0YWNrVHJhY2UoZXJyb3IsIG1lc3NhZ2UpIFxyXG5cdHtcclxuXHRcdHRoaXMuY3VzdG9tQWN0aW9ucyhlcnJvciwgbWVzc2FnZSk7XHJcblxyXG5cdFx0c3dpdGNoKGRlYnVnTGV2ZWwpXHJcblx0XHR7XHJcblx0XHRcdGNhc2UgJ2Vycm9yJzogdGhpcy5oYW5kbGVFcnJvcnMoZXJyb3IsIG1lc3NhZ2UpOyBicmVhaztcclxuXHRcdFx0Y2FzZSAnd2FybmluZyc6IHRoaXMuaGFuZGxlV2FybmluZ3MoZXJyb3IsIG1lc3NhZ2UpOyBicmVhaztcclxuXHRcdFx0Y2FzZSAnaW5mbyc6IHRoaXMuaGFuZGxlSW5mb3MoZXJyb3IsIG1lc3NhZ2UpOyBicmVhaztcclxuXHRcdFx0ZGVmYXVsdDogdGhpcy5oYW5kbGVJbmZvcyhlcnJvciwgbWVzc2FnZSk7IGJyZWFrO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogVGFrZSBhY3Rpb24gZm9yIHNwZWNpZmljIEV4Y2VwdGlvbnMuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gb2JqZWN0IHwgZXJyb3IgfCBUaHJvd2VuIEV4Y2VwdGlvbiBPYmplY3RcclxuXHQgKiBAcGFyYW0gc3RyaW5nIHwgbWVzc2FnZVxyXG5cdCAqIEByZXR1cm4gYm9vbFxyXG5cdCAqL1xyXG5cdGN1c3RvbUFjdGlvbnMoZXJyb3IsIG1lc3NhZ2UpXHJcblx0e1xyXG5cdFx0aWYgKGVycm9yLmNvbnN0cnVjdG9yLm5hbWUgPT0gJ0ludmFsaWRBcmd1bWVudEV4Y2VwdGlvbicpIHtcclxuXHRcdFx0Ly8gaGFuZGxlXHJcblx0XHR9IGVsc2UgaWYgKGVycm9yLmNvbnN0cnVjdG9yLm5hbWUgPT0gJ0ludmFsaWRCaW5kaW5nRXhjZXB0aW9uJykge1xyXG5cdFx0XHQvLyBoYW5kbGVcclxuXHRcdH0gZWxzZSBpZiAoZXJyb3IuY29uc3RydWN0b3IubmFtZSA9PSAnQmFkRXZlbnRDYWxsRXhjZXB0aW9uJykge1xyXG5cdFx0XHQvLyBoYW5kbGVcclxuXHRcdH0gZWxzZSBpZiAoZXJyb3IuY29uc3RydWN0b3IubmFtZSA9PSAnQ29tcG9uZW50c0V4Y2VwdGlvbicpIHtcclxuXHRcdFx0Ly8gaGFuZGxlXHJcblx0XHR9IGVsc2UgaWYgKGVycm9yLmNvbnN0cnVjdG9yLm5hbWUgPT0gJ0NvbXBvbmVudE5vdFJlZ2lzdGVyZWRFeGNlcHRpb24nKSB7XHJcblx0XHRcdC8vIGhhbmRsZVxyXG5cdFx0fSBlbHNlIGlmIChlcnJvci5jb25zdHJ1Y3Rvci5uYW1lID09ICdOb3RJblBhZ2VSYW5nZUV4Y2VwdGlvbicpIHtcclxuXHRcdFx0Ly8gaGFuZGxlXHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIGZhbHNlO1xyXG5cdH1cclxuXHJcblx0aGFuZGxlRXJyb3JzKGVycm9yLCBtZXNzYWdlKVxyXG5cdHtcclxuXHRcdGNvbnNvbGUuZXJyb3IoZXJyb3IuY29uc3RydWN0b3IubmFtZSArICc6ICcgKyBtZXNzYWdlKTtcclxuXHR9XHJcblxyXG5cdGhhbmRsZVdhcm5pbmdzKGVycm9yLCBtZXNzYWdlKVxyXG5cdHtcclxuXHRcdGNvbnNvbGUud2FybihlcnJvci5jb25zdHJ1Y3Rvci5uYW1lICsgJzogJyArIG1lc3NhZ2UpO1xyXG5cdH1cclxuXHJcblx0aGFuZGxlSW5mb3MoZXJyb3IsIG1lc3NhZ2UpXHJcblx0e1xyXG5cdFx0Y29uc29sZS5pbmZvKGVycm9yLmNvbnN0cnVjdG9yLm5hbWUgKyAnOiAnICsgbWVzc2FnZSk7XHJcblx0fVxyXG59XG5cbmxldCBkZWZhdWx0TWVzc2FnZSA9ICdBbiBpbnZhbGlkIGFyZ3VtZW50IHdhcyBwYXNzZWQuJztcclxuXHJcbmNsYXNzIEludmFsaWRBcmd1bWVudEV4Y2VwdGlvbiQxIGV4dGVuZHMgRXhjZXB0aW9uSGFuZGxlclxyXG57XHJcblx0Y29uc3RydWN0b3IobWVzc2FnZSA9IG51bGwpIFxyXG5cdHtcclxuXHRcdG1lc3NhZ2UgPSBtZXNzYWdlIHx8IGRlZmF1bHRNZXNzYWdlO1xyXG5cdFx0c3VwZXIobWVzc2FnZSk7XHJcbiAgICBcdHN1cGVyLnN0YWNrVHJhY2UodGhpcywgbWVzc2FnZSk7XHJcbiAgICB9XHJcbn1cblxuLyoqXHJcbiAqIEBmaWxlIFxyXG4gKiBET00gY2xhc3MuXHJcbiAqXHJcbiAqIEFkZHMgc29tZSB1c2VmdWwgZnVuY3Rpb25hbGl0eSBmb3JcclxuICogZmV0Y2hpbmcgb3IgbWFuaXB1bGF0aW5nIERPTSBlbGVtZW50cy5cclxuICovXHJcblxyXG5jbGFzcyBET01cclxue1xyXG5cdC8qKlxyXG5cdCAqIE1pbmlmaWVzIHRoZSBjc3MgdGV4dC5cclxuXHQgKiBcclxuXHQgKiBAcGFyYW0gc3RyaW5nIHwgc3RyaW5nXHJcblx0ICogQHJldHVybiBzdHJpbmdcclxuXHQgKi9cclxuXHRzdGF0aWMgbWluaWZ5Q3NzKHN0cmluZykgXHJcblx0e1xyXG5cdCAgICBzdHJpbmcgPSBzdHJpbmcucmVwbGFjZSgvXFwvXFwqKD86KD8hXFwqXFwvKVtcXHNcXFNdKSpcXCpcXC98W1xcclxcblxcdF0rL2csICcnKTtcclxuXHQgICAgc3RyaW5nID0gc3RyaW5nLnJlcGxhY2UoLyB7Mix9L2csICcgJyk7XHJcblx0ICAgIHN0cmluZyA9IHN0cmluZy5yZXBsYWNlKC8oW3s6fV0pL2csICckMScpO1xyXG5cdCAgICBzdHJpbmcgPSBzdHJpbmcucmVwbGFjZSgvKFs7LF0pIC9nLCAnJDEnKTtcclxuXHQgICAgc3RyaW5nID0gc3RyaW5nLnJlcGxhY2UoLyAhL2csICchJyk7XHJcblx0ICAgIFxyXG5cdCAgICByZXR1cm4gc3RyaW5nO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogU3dpdGNoZXMgYmV0d2VlbiB0d28gZ2l2ZW4gY2xhc3Nlcy5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSBvYmplY3QgfCBlbGVtZW50XHJcblx0ICogQHBhcmFtIHN0cmluZyB8IGNsYXNzTmFtZVxyXG5cdCAqIEBwYXJhbSBzdHJpbmcgfCBuZXdDbGFzc05hbWVcclxuXHQgKiBAcmV0dXJuIG9iamVjdFxyXG5cdCAqL1xyXG5cdHN0YXRpYyBzd2l0Y2hDbGFzc2VzKGVsZW1lbnQsIGNsYXNzTmFtZSwgbmV3Q2xhc3NOYW1lKSBcclxuXHR7XHJcblx0XHR0aGlzLnJlbW92ZUNsYXNzKGVsZW1lbnQsIGNsYXNzTmFtZSk7XHJcblx0XHR0aGlzLmFkZENsYXNzKGVsZW1lbnQsIG5ld0NsYXNzTmFtZSk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBBZGRzIGNsYXNzIHRvIGEgZ2l2ZW4gZWxlbWVudC5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSBvYmplY3QgfCBlbGVtZW50XHJcblx0ICogQHBhcmFtIHN0cmluZyB8IGNsYXNzTmFtZVxyXG5cdCAqIEByZXR1cm4gb2JqZWN0XHJcblx0ICovXHJcblx0c3RhdGljIGFkZENsYXNzKGVsZW1lbnQsIGNsYXNzTmFtZSkgXHJcblx0e1xyXG5cdFx0aWYoZWxlbWVudCA9PT0gbnVsbCkge1xyXG5cdFx0XHR0aHJvdyBuZXcgSW52YWxpZEFyZ3VtZW50RXhjZXB0aW9uJDE7XHJcblx0XHR9XHJcblxyXG5cdFx0aWYoISBjbGFzc05hbWUgfHwgY2xhc3NOYW1lID09ICcnIHx8IHR5cGVvZiBjbGFzc05hbWUgPT09IHVuZGVmaW5lZCkge1xyXG5cdFx0XHRyZXR1cm4gZWxlbWVudDtcclxuXHRcdH1cclxuXHJcblx0XHRsZXQgY2xhc3NOYW1lcyA9IGNsYXNzTmFtZS5zcGxpdCgnICcpO1xyXG5cclxuXHRcdGNsYXNzTmFtZXMuZm9yRWFjaChmdW5jdGlvbihuYW1lKSB7XHJcblx0XHRcdGVsZW1lbnQuY2xhc3NMaXN0LmFkZChuYW1lKTtcclxuXHRcdH0pO1xyXG5cdFx0XHJcblx0XHRyZXR1cm4gZWxlbWVudDtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIENoZWNrcyBpZiBhbiBlbGVtZW50IGhhcyBhIGNsYXNzLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIEhUTUxFbGVtZW50IHwgZWxlbWVudFxyXG5cdCAqIEBwYXJhbSBzdHJpbmcgfCBjbGFzc05hbWVcclxuXHQgKiBAcmV0dXJuIGJvb2xcclxuXHQgKi9cclxuXHRzdGF0aWMgaGFzQ2xhc3MoZWxlbWVudCwgY2xhc3NOYW1lKVxyXG5cdHtcclxuXHRcdGlmIChlbGVtZW50ID09PSBudWxsKSB7XHJcblx0XHRcdHRocm93IG5ldyBJbnZhbGlkQXJndW1lbnRFeGNlcHRpb24kMSgnaGFzQ2xhc3MoKSBleHBlY3RzIHRoZSBmaXJzdCBhcmd1bWVudCB0byBiZSBhbiBIVE1MRWxlbWVudCBidXQgbnVsbCB3YXMgcGFzc2VkLicpO1xyXG5cdFx0fVxyXG5cclxuXHRcdGlmICghIGNsYXNzTmFtZSB8fCBjbGFzc05hbWUgPT0gJycgfHwgdHlwZW9mIGNsYXNzTmFtZSA9PSAndW5kZWZpbmVkJykge1xyXG5cdFx0XHRyZXR1cm47XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIGVsZW1lbnQuY2xhc3NOYW1lLmluZGV4T2YoY2xhc3NOYW1lKSAhPSAtMTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFJlbW92ZXMgY2xhc3MgZnJvbSBhIGdpdmVuIGVsZW1lbnQuXHJcblx0ICogXHJcblx0ICogQHBhcmFtIG9iamVjdCB8IGVsZW1lbnRcclxuXHQgKiBAcGFyYW0gc3RyaW5nIHwgY2xhc3NOYW1lXHJcblx0ICogQHJldHVybiBvYmplY3RcclxuXHQgKi9cclxuXHRzdGF0aWMgcmVtb3ZlQ2xhc3MoZWxlbWVudCwgY2xhc3NOYW1lKSBcclxuXHR7XHJcblx0XHRpZihlbGVtZW50ID09IG51bGwpIHtcclxuXHRcdFx0dGhyb3cgbmV3IEludmFsaWRBcmd1bWVudEV4Y2VwdGlvbiQxO1xyXG5cdFx0fVxyXG5cclxuXHRcdGlmKGNsYXNzTmFtZSA9PSAnJykge1xyXG5cdFx0XHRlbGVtZW50LmNsYXNzTmFtZSA9ICcnO1xyXG5cdFx0fSBlbHNlIHtcclxuXHJcblx0XHRcdGxldCBjbGFzc05hbWVzID0gY2xhc3NOYW1lLnNwbGl0KCcgJyk7XHJcblxyXG5cdFx0XHRjbGFzc05hbWVzLmZvckVhY2goZnVuY3Rpb24obmFtZSkge1xyXG5cdFx0XHRcdGVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShuYW1lKTtcclxuXHRcdFx0fSk7XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIGVsZW1lbnQ7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBSZW1vdmVzIGFuIGVsZW1lbnQgZnJvbSB0aGUgRE9NLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIEhUTUxFbGVtZW50XHJcblx0ICogQHJldHVybiB2b2lkXHJcblx0ICovXHJcblx0c3RhdGljIHJlbW92ZShlbGVtZW50KVxyXG5cdHtcclxuXHRcdGVsZW1lbnQucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChlbGVtZW50KTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEFkZHMgc3R5bGUgdGFnIHdpdGggZ2l2ZW4gaWQgYW5kIGNzcyB0byB0aGUgRE9NLlxyXG5cdCAqIFxyXG5cdCAqIEBwYXJhbSBzdHJpbmcgfCBpZFxyXG5cdCAqIEBwYXJhbSBzdHJpbmcgfCBjc3NcclxuXHQgKiBAcmV0dXJuIHZvaWRcclxuXHQgKi9cclxuXHRzdGF0aWMgYWRkU3R5bGUoaWQsIGNzcylcclxuXHR7XHJcblx0XHRpZiAodHlwZW9mIGNzcyAhPSAnc3RyaW5nJykge1xyXG5cdFx0XHR0aHJvdyBuZXcgSW52YWxpZEFyZ3VtZW50RXhjZXB0aW9uJDE7XHJcblx0XHR9XHJcblxyXG5cdFx0bGV0IGhlYWQgPSBkb2N1bWVudC5oZWFkIHx8IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdoZWFkJylbMF07XHJcblx0XHRsZXQgc3R5bGVUYWcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzdHlsZScpO1xyXG5cclxuXHRcdC8vIHBpcGUgaXQgdGhyb3VnaCB0aGUgbWluZmllclxyXG5cdCAgICBsZXQgQ1NTID0gdGhpcy5taW5pZnlDc3MoY3NzKTtcclxuXHQgICAgLy8gYWRkaW5nIGl0IHRvIHRoZSBzdHlsZXRhZ1xyXG5cdCAgICBzdHlsZVRhZy5pbm5lckhUTUwgPSBDU1M7XHJcblx0ICAgIC8vIGdpdmUgYW4gaWQgdG8gcmVjb2duaXplIHRoZSBzdHlsZSB0YWdcclxuXHRcdHN0eWxlVGFnLnNldEF0dHJpYnV0ZSgnaWQnLCBpZCk7XHJcblx0XHQvLyBhcHBlbmRpbmcgdGhhdCBzdHlsZSB0YWcgdG8gdGhlIERPTSBoZWFkIHRhZ1xyXG5cdFx0aGVhZC5hcHBlbmRDaGlsZChzdHlsZVRhZyk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBBZGRzIGxpbmtlZCBzdHlsZSB0YWcgd2l0aCBnaXZlbiBpZCBhbmQgc3JjIHRvIHRoZSBET00uXHJcblx0ICogXHJcblx0ICogQHBhcmFtIHN0cmluZyB8IGlkXHJcblx0ICogQHBhcmFtIHN0cmluZyB8IHNvdXJjZVxyXG5cdCAqIEByZXR1cm4gdm9pZFxyXG5cdCAqL1xyXG5cdHN0YXRpYyBhZGRMaW5rZWRTdHlsZShpZCwgc291cmNlKSBcclxuXHR7XHJcblx0XHRpZiAodHlwZW9mIHNvdXJjZSAhPSAnc3RyaW5nJykge1xyXG5cdFx0XHR0aHJvdyBuZXcgSW52YWxpZEFyZ3VtZW50RXhjZXB0aW9uJDEoJ0RPTS5hZGRMaW5rZWRTdHlsZSgpIGV4Y3BlY3RzIHRoZSBzZWNvbmQgcGFyYW1ldGVyIHRvIGJlIHN0cmluZywgYnV0ICcgKyB0eXBlb2Ygc291cmNlICsgJyB3YXMgcGFzc2VkIGluc3RlYWQuJyk7XHJcblx0XHR9XHJcblxyXG5cdFx0bGV0IGhlYWQgPSBkb2N1bWVudC5oZWFkIHx8IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdoZWFkJylbMF07XHJcblx0XHRsZXQgbGlua2VkU3R5bGVUYWcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaW5rJyk7XHJcblxyXG5cdCAgICAvLyBnaXZlIGFuIGlkIHRvIHJlY29nbml6ZSB0aGUgc3R5bGUgdGFnXHJcblx0XHRsaW5rZWRTdHlsZVRhZy5zZXRBdHRyaWJ1dGUoJ2lkJywgaWQpO1xyXG5cdFx0bGlua2VkU3R5bGVUYWcuc2V0QXR0cmlidXRlKCdocmVmJywgc291cmNlKTtcclxuXHRcdGxpbmtlZFN0eWxlVGFnLnNldEF0dHJpYnV0ZSgncmVsJywgJ3N0eWxlc2hlZXQnKTtcclxuXHRcdGxpbmtlZFN0eWxlVGFnLnNldEF0dHJpYnV0ZSgndHlwZScsICd0ZXh0L2NzcycpO1xyXG5cdFx0Ly8gYXBwZW5kaW5nIHRoYXQgc3R5bGUgdGFnIHRvIHRoZSBET00gaGVhZCB0YWdcclxuXHRcdGhlYWQuYXBwZW5kQ2hpbGQobGlua2VkU3R5bGVUYWcpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQ3JlYXRlcyBhbiBlbGVtZW50IHdpdGggdGhlIGdpdmVuIG9wdGlvbnMuXHJcblx0ICogXHJcblx0ICogQHBhcmFtIHN0cmluZyB8IGVsZW1lbnRUeXBlXHJcblx0ICogQHBhcmFtIG9iamVjdCB8IG9wdGlvbnNcclxuXHQgKiBAcmV0dXJuIEhUTUxFbGVtZW50XHJcblx0ICovXHJcblx0c3RhdGljIGNyZWF0ZUVsZW1lbnQoZWxlbWVudFR5cGUsIG9wdGlvbnMpXHJcblx0e1xyXG5cdFx0bGV0IGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KGVsZW1lbnRUeXBlKTtcclxuXHRcclxuXHRcdGlmIChvcHRpb25zID09PSB1bmRlZmluZWQpIHtcclxuXHRcdFx0cmV0dXJuIGVsZW1lbnQ7XHJcblx0XHR9XHJcblxyXG5cdFx0Zm9yIChsZXQgb3B0aW9uIGluIG9wdGlvbnMpIHtcclxuXHRcdFx0c3dpdGNoKG9wdGlvbilcclxuXHRcdFx0e1xyXG5cdFx0XHRcdGNhc2UgJ3RleHQnOlxyXG5cdFx0XHRcdGNhc2UgJ2h0bWwnOlxyXG5cdFx0XHRcdFx0ZWxlbWVudC5pbm5lckhUTUwgPSBvcHRpb25zW29wdGlvbl07XHJcblx0XHRcdFx0XHRicmVhaztcclxuXHRcdFx0XHRkZWZhdWx0OlxyXG5cdFx0XHRcdFx0ZWxlbWVudC5zZXRBdHRyaWJ1dGUob3B0aW9uLCBvcHRpb25zW29wdGlvbl0pO1xyXG5cdFx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gZWxlbWVudDtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFRvZ2dsZXMgdGhlIGdpdmVuIGNsYXNzZXMuXHJcblx0ICogXHJcblx0ICogQHBhcmFtIG9iamVjdCB8IGVsZW1lbnRcclxuXHQgKiBAcGFyYW0gc3RyaW5nIHwgY2xhc3NOYW1lXHJcblx0ICogQHJldHVybiBib29sXHJcblx0ICovXHJcblx0c3RhdGljIHRvZ2dsZUNsYXNzKGVsZW1lbnQsIGNsYXNzTmFtZSwgc2Vjb25kQ2xhc3NOYW1lKVxyXG5cdHtcclxuXHRcdGlmIChlbGVtZW50ID09IG51bGwgfHwgdHlwZW9mIGVsZW1lbnQgPT0gJ3VuZGVmaW5lZCcpIHtcclxuXHRcdFx0dGhyb3cgbmV3IEludmFsaWRBcmd1bWVudEV4Y2VwdGlvbiQxO1xyXG5cdFx0fVxyXG5cclxuXHRcdHNlY29uZENsYXNzTmFtZSA9IHNlY29uZENsYXNzTmFtZSB8fCB1bmRlZmluZWQ7XHJcblxyXG5cdFx0aWYoc2Vjb25kQ2xhc3NOYW1lKSB7XHJcblx0XHRcdGVsZW1lbnQuY2xhc3NMaXN0LnRvZ2dsZShzZWNvbmRDbGFzc05hbWUpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiBlbGVtZW50LmNsYXNzTGlzdC50b2dnbGUoY2xhc3NOYW1lKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEZpbmRzIGFuIGVsZW1lbnQgaW5zaWRlIG9mIHBhcmVudC5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSBzdHJpbmcgfCBzZWxlY3RvclxyXG5cdCAqIEBwYXJhbSBvYmplY3QgfCBjb250ZXh0XHJcblx0ICogQHJldHVybiBtaXhlZFxyXG5cdCAqL1xyXG5cdHN0YXRpYyBmaW5kKHNlbGVjdG9yLCBjb250ZXh0ID0gd2luZG93LmRvY3VtZW50KSBcclxuXHR7XHJcblx0XHRyZXR1cm4gcXVlcnlFbGVtZW50KHNlbGVjdG9yLCBjb250ZXh0KTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEdldCB0aGUgZG9jdW1lbnQgaGVpZ2h0LlxyXG5cdCAqXHJcblx0ICogQHJldHVybiBudW1iZXIgXHJcblx0ICovXHJcblx0c3RhdGljIGRvY3VtZW50SGVpZ2h0KClcclxuXHR7XHJcblx0XHRyZXR1cm4gTWF0aC5tYXgoXHJcblx0ICAgICAgICBkb2N1bWVudC5ib2R5LnNjcm9sbEhlaWdodCwgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnNjcm9sbEhlaWdodCxcclxuXHQgICAgICAgXHRkb2N1bWVudC5ib2R5Lm9mZnNldEhlaWdodCwgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50Lm9mZnNldEhlaWdodCxcclxuXHQgICAgICAgIGRvY3VtZW50LmJvZHkuY2xpZW50SGVpZ2h0LCBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50SGVpZ2h0XHJcblx0ICAgIClcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEdldCB0aGUgd2luZG93IGhlaWdodC5cclxuXHQgKlxyXG5cdCAqIEByZXR1cm4gbnVtYmVyIFxyXG5cdCAqL1xyXG5cdHN0YXRpYyB3aW5kb3dIZWlnaHQoKVxyXG5cdHtcclxuXHRcdHJldHVybiB3aW5kb3cuaW5uZXJIZWlnaHQgfHwgKGRvY3VtZW50LmRvY3VtZW50RWxlbWVudCB8fCBkb2N1bWVudC5ib2R5KS5jbGllbnRIZWlnaHQ7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBHZXQgdGhlIHNjcm9sbCBvZmZzZXQgcG9zaXRpb24uXHJcblx0ICpcclxuXHQgKiBAcmV0dXJuIG51bWJlclxyXG5cdCAqL1xyXG5cdHN0YXRpYyBzY3JvbGxZT2Zmc2V0KClcclxuXHR7XHJcblx0XHRyZXR1cm4gd2luZG93LnBhZ2VZT2Zmc2V0IHx8IChkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQgfHwgZG9jdW1lbnQuYm9keS5wYXJlbnROb2RlIHx8IGRvY3VtZW50LmJvZHkpLnNjcm9sbFRvcDtcclxuXHR9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBRdWVyaWVzIGFuIGVsZW1lbnQgZnJvbSB0aGUgRE9NLlxyXG4gKlxyXG4gKiBAcGFyYW0gc3RyaW5nIHwgc2VsZWN0b3JcclxuICogQHBhcmFtIG9iamVjdCB8IHBhcmVudEVsZW1lbnRcclxuICogQHJldHVybiBtaXhlZFxyXG4gKi9cclxuZnVuY3Rpb24gcXVlcnlFbGVtZW50KHNlbGVjdG9yLCBwYXJlbnRFbGVtZW50KSBcclxue1xyXG5cdGlmICh0eXBlb2Ygc2VsZWN0b3IgIT0gJ3N0cmluZycpIHtcclxuXHRcdHRocm93IG5ldyBJbnZhbGlkQXJndW1lbnRFeGNlcHRpb24kMSgncXVlcnlFbGVtZW50KCkgZXhwZWN0cyBmaXJzdCBwYXJhbWV0ZXIgdG8gYmUgYSBzdHJpbmcsIGJ1dCAnICsgdHlwZW9mIHNlbGVjdG9yICsgJyB3YXMgcGFzc2VkIGluc3RlYWQuJyk7XHJcblx0fVxyXG5cclxuXHRsZXQgZWxlbWVudCA9IHBhcmVudEVsZW1lbnQucXVlcnlTZWxlY3RvckFsbChzZWxlY3Rvcik7XHJcblxyXG5cdGlmIChlbGVtZW50Lmxlbmd0aCA9PSAwKSB7XHJcblx0XHRyZXR1cm4gbnVsbDtcclxuXHR9XHJcblxyXG5cdHJldHVybiAoZWxlbWVudC5sZW5ndGggPiAxKSA/IGVsZW1lbnQgOiBlbGVtZW50WzBdO1xyXG59XHJcblxyXG4vKipcclxuICogQ2hlY2tzIGlmIHBhcmVudCBoYXMgY2hpbGQuXHJcbiAqXHJcbiAqIEBwYXJhbSBvYmplY3QgfCBwYXJlbnRFbGVtZW50XHJcbiAqIEBwYXJhbSBvYmplY3QgfCBjaGlsZEVsZW1lbnRcclxuICogQHJldHVybiBib29sXHJcbiAqL1xyXG5mdW5jdGlvbiBoYXNDaGlsZChwYXJlbnRFbGVtZW50LCBjaGlsZEVsZW1lbnQpIFxyXG57XHJcbiAgICAgbGV0IG5vZGUgPSBjaGlsZEVsZW1lbnQucGFyZW50Tm9kZTtcclxuICAgICBcclxuICAgICB3aGlsZSAobm9kZSAhPSBudWxsKSB7XHJcbiAgICAgICAgIGlmIChub2RlID09IHBhcmVudEVsZW1lbnQpIHtcclxuICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICB9XHJcbiAgICAgICAgIG5vZGUgPSBub2RlLnBhcmVudE5vZGU7XHJcbiAgICAgfVxyXG4gICAgIFxyXG4gICAgIHJldHVybiBmYWxzZTtcclxufVxuXG4vKipcclxuICogQGZpbGUgXHJcbiAqIENvbW1vbiBjbGFzcy5cclxuICpcclxuICogQWRkcyBzb21lIHVzZWZ1bCBmdW5jdGlvbmFsaXR5IGZvclxyXG4gKiBjb21tb24gdGFza3MgLSBkYXRhIGNoZWNrcyBvciBkYXRhIG1hbmlwdWxhdGlvbi5cclxuICovXHJcblxyXG5jbGFzcyBDb21tb25cclxue1xyXG5cdC8qKlxyXG5cdCAqIEV4dGVuZCBhbiBvYmplY3QuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gb2JqZWN0IHwgY3VycmVudE9iamVjdFxyXG5cdCAqIEBwYXJhbSBvYmplY3QgfCBuZXdPYmplY3RcclxuXHQgKiBAcmV0dXJuIG9iamVjdFxyXG5cdCAqL1xyXG5cdHN0YXRpYyBleHRlbmQoY3VycmVudE9iamVjdCwgbmV3T2JqZWN0KSB7XHJcblx0XHR2YXIgZXh0ZW5kZWQgPSB7fTtcclxuXHQgICAgdmFyIHByb3A7XHJcblxyXG5cdCAgICBmb3IgKHByb3AgaW4gY3VycmVudE9iamVjdCkge1xyXG5cdCAgICAgICAgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChjdXJyZW50T2JqZWN0LCBwcm9wKSkge1xyXG5cdCAgICAgICAgICAgIGV4dGVuZGVkW3Byb3BdID0gY3VycmVudE9iamVjdFtwcm9wXTtcclxuXHQgICAgICAgIH1cclxuXHQgICAgfVxyXG5cclxuXHQgICAgZm9yIChwcm9wIGluIG5ld09iamVjdCkge1xyXG5cdCAgICAgICAgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChuZXdPYmplY3QsIHByb3ApKSB7XHJcblx0ICAgICAgICAgICAgZXh0ZW5kZWRbcHJvcF0gPSBuZXdPYmplY3RbcHJvcF07XHJcblx0ICAgICAgICB9XHJcblx0ICAgIH1cclxuXHJcblx0ICAgIHJldHVybiBleHRlbmRlZDtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIENoZWNrcyBmb3IgYSBuZWVkbGUgaW4gaHlzdGFjayBhcnJheS5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSBtaXhlZCB8IG5lZWRsZVxyXG5cdCAqIEBwYXJhbSBvYmplY3QgfCBvYmplY3RcclxuXHQgKiBAcmV0dXJuIGJvb2xcclxuXHQgKlxyXG5cdCAqL1xyXG5cdHN0YXRpYyBpbl9hcnJheShuZWVkbGUsIGh5c3RhY2spIHtcclxuXHRcdGlmICh0eXBlb2YgaHlzdGFjayA9PSAndW5kZWZpbmVkJyB8fCBoeXN0YWNrLmNvbnN0cnVjdG9yICE9PSBBcnJheSkge1xyXG5cdFx0XHR0aHJvdyBuZXcgSW52YWxpZEFyZ3VtZW50RXhjZXB0aW9uJDEoJ0NvbW1vbi5pbl9hcnJheSgpIGV4cGVjdHMgdGhlIHNlY29uZCBwYXJhbWV0ZXIgdG8gYmUgYW4gYXJyYXksIGJ1dCAnICsgdHlwZW9mIGh5c3RhY2sgKyAnIHdhcyBwYXNzZCBpbnN0ZWFkJyk7XHJcblx0XHR9XHJcblxyXG5cdFx0Zm9yICh2YXIgaSA9IDA7IGkgPD0gaHlzdGFjay5sZW5ndGg7IGkrKykge1xyXG5cdFx0XHRpZiAobmVlZGxlID09IGh5c3RhY2tbaV0pIHtcclxuXHRcdFx0XHRyZXR1cm4gdHJ1ZTtcdFxyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0XHJcblx0XHRyZXR1cm4gZmFsc2U7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBUYWtlcyBhbiBhcnJheSBhbmQgY2h1bmtzIGl0LlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIGFycmF5IHwgdG90YWxcclxuXHQgKiBAcGFyYW0gbnVtYmVyIHwgY2h1bmtzXHJcblx0ICogQHJldHVybiBhcnJheVxyXG5cdCAqL1xyXG5cdHN0YXRpYyBhcnJheV9jaHVuayh0b3RhbCwgc2l6ZSA9IDUpXHJcblx0eyAgICAgICAgXHJcbiAgICAgIFx0aWYgKGlzTmFOKHNpemUpKSB7XHJcbiAgICAgIFx0XHR0aHJvdyBuZXcgSW52YWxpZEFyZ3VtZW50RXhjZXB0aW9uJDEoJ0NvbW1vbi5hcnJheV9jaHVuaygpIGV4cGVjdHMgdGhlIHNlY29uZCBwYXJhbWV0ZXIgdG8gYmUgYSBudW1iZXIsIGJ1dCAnICsgdHlwZW9mIHNpemUgKyAnIHBhc3NlZCBpbnN0ZWFkLicpXHJcbiAgICAgIFx0fVxyXG5cclxuICAgICAgXHRzaXplID0gcGFyc2VJbnQoc2l6ZSk7XHJcbiAgICAgICBcclxuICAgICAgIFx0bGV0IGk7XHJcbiAgICAgICBcdGxldCBjb2xsZWN0aW9uID0gW107XHJcblxyXG4gICAgICAgIC8vIGFkZCBlYWNoIGNodW5rIHRvIHRoZSByZXN1bHRcclxuICAgICAgICBmb3IgKGkgPSAwOyBpIDwgTWF0aC5jZWlsKHRvdGFsLmxlbmd0aCAvIHNpemUpOyBpKyspIHtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHZhciBzdGFydCA9IGkgKiBzaXplO1xyXG4gICAgICAgICAgICB2YXIgZW5kID0gc3RhcnQgKyBzaXplO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgY29sbGVjdGlvbi5wdXNoKHRvdGFsLnNsaWNlKHN0YXJ0LCBlbmQpKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIHJldHVybiBjb2xsZWN0aW9uO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQ2hlY2tzIGlmIGFuIG9iamVjdCBpcyBlbXB0eS5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSBvYmplY3QgfCBvYmplY3RcclxuXHQgKiBAcmV0dXJuIGJvb2xcclxuXHQgKi9cclxuXHRzdGF0aWMgZW1wdHlPYmplY3Qob2JqZWN0KSB7XHJcblx0XHRmb3IgKGxldCBwcm9wIGluIG9iamVjdCkge1xyXG5cdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIHRydWU7XHJcblx0fVxyXG5cclxuXHJcblx0LyoqXHJcblx0ICogQ2hlY2tzIGlmIGEgZ2l2ZW4gb2JqZWN0IGNvbnRhaW5lZCBpbiBhbiBhcnJheS5cclxuXHQgKiBcclxuXHQgKiBAcGFyYW0gb2JqZWN0IHwgb2JqZWN0XHJcblx0ICogQHBhcmFtIGFycmF5IHwgaGF5c3RhY2tcclxuXHQgKiBAcmV0dXJuIGJvb2xcclxuXHQgKi9cclxuXHRzdGF0aWMgY29udGFpbnNPYmplY3Qob2JqZWN0LCBoeXN0YWNrKSBcclxuXHR7XHJcblx0ICAgIGxldCBpO1xyXG5cclxuXHQgICAgZm9yIChpID0gMDsgaSA8IGh5c3RhY2subGVuZ3RoOyBpKyspIHtcclxuXHQgICAgICAgIGlmICh0eXBlb2Ygb2JqZWN0ID09ICdzdHJpbmcnICYmIGh5c3RhY2tbaV0uY29uc3RydWN0b3IubmFtZSA9PT0gb2JqZWN0KSB7XHJcblx0ICAgICAgICBcdHJldHVybiB0cnVlO1xyXG5cdCAgICAgICAgfVxyXG5cclxuXHQgICAgICAgIGlmIChoeXN0YWNrW2ldID09PSBvYmplY3QpIHtcclxuXHQgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuXHQgICAgICAgIH1cclxuXHQgICAgfVxyXG5cclxuXHQgICAgcmV0dXJuIGZhbHNlO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQ2hlY2tzIGlmIGEgZ2l2ZW4gcGFyYW1ldGVyIGlzIGFuIG9iamVjdC5cclxuXHQgKiBcclxuXHQgKiBAcGFyYW0gb2JqZWN0IHwgb2JqZWN0XHJcblx0ICogQHJldHVybiBib29sXHJcblx0ICovXHJcblx0c3RhdGljIGlzT2JqZWN0KG9iamVjdCkgXHJcblx0e1xyXG5cdFx0cmV0dXJuIHR5cGVvZiBvYmplY3QgPT0gJ29iamVjdCc7XHJcblx0fVxyXG59XG5cbmxldCBkZWZhdWx0TWVzc2FnZSQxID0gJ1RoZSBkYXRhIHN0cnVjdHVyZSBpcyBpbnZhbGlkJztcclxuXHJcbmNsYXNzIEludmFsaWREYXRhU3RydWN0dXJlRXhjZXB0aW9uIGV4dGVuZHMgRXhjZXB0aW9uSGFuZGxlclxyXG57XHJcblx0Y29uc3RydWN0b3IobWVzc2FnZSA9IG51bGwpIFxyXG5cdHtcclxuXHRcdG1lc3NhZ2UgPSBtZXNzYWdlIHx8IGRlZmF1bHRNZXNzYWdlJDE7XHJcblx0XHRzdXBlcihtZXNzYWdlKTtcclxuICAgIFx0c3VwZXIuc3RhY2tUcmFjZSh0aGlzLCBtZXNzYWdlKTtcclxuICAgIH1cclxufVxuXG4vKipcclxuICogQGZpbGUgXHJcbiAqIFJlcXVlc3QgY2xhc3MuXHJcbiAqXHJcbiAqIEhhbmRsZXMgYWpheCByZXF1ZXN0cyBQT1NULCBHRVQgZXRjLi4uXHJcbiAqL1xyXG5cclxuLyoqXHJcbiAqIFN0b3JlcyB0aGUgZGVmYXVsdCBzZXR0aW5ncy5cclxuICpcclxuICogQHZhciBvYmplY3RcclxuICovXHJcblxyXG5sZXQgZGVmYXVsdFNldHRpbmdzID0ge1xyXG5cdGhlYWRlcnM6IHtcclxuXHRcdCdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbidcclxuXHR9LFxyXG5cdGFzeW5jOiB0cnVlXHJcbn07XHJcblxyXG5jbGFzcyBSZXF1ZXN0XHJcbntcclxuXHQvKipcclxuXHQgKiAtIEluaXRpYWxpemUgdGhlIHNldHRpbmdzIG9iamVjdC5cclxuXHQgKiAtIEluaXRpYWxpemUgdGhlIHhociBvYmplY3QuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gb2JqZWN0IHwgc2V0dGluZ3NcclxuXHQgKiBAcmV0dXJuIHZvaWRcclxuXHQgKi9cclxuXHRjb25zdHJ1Y3RvcihzZXR0aW5ncylcclxuXHR7XHJcblx0XHR0aGlzLnNldHRpbmdzID0gQ29tbW9uLmV4dGVuZChkZWZhdWx0U2V0dGluZ3MsIHNldHRpbmdzKTtcclxuXHRcdHRoaXMuc2V0RGVmYXVsdFJlcXVlc3RIZWFkZXIoKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFNldHMgdGhlIGRlZmF1bHQgcmVxdWVzdCBoZWFkZXJzLlxyXG5cdCAqXHJcblx0ICogQHJldHVybiB2b2lkXHJcblx0ICovXHJcblx0c2V0RGVmYXVsdFJlcXVlc3RIZWFkZXIoKVxyXG5cdHtcclxuXHRcdGxldCBoZWFkZXI7XHJcblx0XHRsZXQgaGVhZGVycyA9IHRoaXMuc2V0dGluZ3MuaGVhZGVycztcclxuXHRcdGxldCBhc3luYyA9IHRoaXMuc2V0dGluZ3MuYXN5bmM7XHJcblx0XHRsZXQgb3BlbiA9IFhNTEh0dHBSZXF1ZXN0LnByb3RvdHlwZS5vcGVuO1xyXG5cdFx0bGV0IHNldFJlcXVlc3RIZWFkZXIgPSBYTUxIdHRwUmVxdWVzdC5wcm90b3R5cGUuc2V0UmVxdWVzdEhlYWRlcjtcclxuXHJcblx0XHRYTUxIdHRwUmVxdWVzdC5wcm90b3R5cGUub3BlbiA9IGZ1bmN0aW9uKCkge1xyXG5cdFx0XHR2YXIgcmVzcG9uc2UgPSBvcGVuLmFwcGx5KHRoaXMsIGFyZ3VtZW50cywgYXN5bmMpO1xyXG5cclxuXHRcdFx0Zm9yIChoZWFkZXIgaW4gaGVhZGVycykge1xyXG5cdFx0XHRcdHRoaXMuc2V0UmVxdWVzdEhlYWRlcihoZWFkZXIsIGhlYWRlcnNbaGVhZGVyXSk7XHJcblx0XHRcdH1cclxuXHJcblx0ICBcdFx0cmV0dXJuIHJlc3BvbnNlO1xyXG5cdFx0fTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIE1ha2VzIGEgUE9TVCByZXF1ZXN0LlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIG9iamVjdCB8IG9wdGlvbnNcclxuXHQgKiBAcmV0dXJuIFByb21pc2VcclxuXHQgKi9cclxuXHRwb3N0KG9wdGlvbnMpXHJcblx0e1xyXG5cdFx0bGV0IHhociA9IHRoaXMueGhyO1xyXG5cclxuXHRcdGlmKG9wdGlvbnMuaGFzT3duUHJvcGVydHkoJ2JlZm9yZScpICYmIHR5cGVvZiBvcHRpb25zLmJlZm9yZSA9PSAnZnVuY3Rpb24nKSB7XHJcblx0XHRcdG9wdGlvbnMuYmVmb3JlLmNhbGwodGhpcyk7XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xyXG5cdFx0XHRpZih0eXBlb2Ygb3B0aW9ucyAhPT0gJ29iamVjdCcpIHtcclxuXHRcdFx0XHR0aHJvdyBuZXcgRXJyb3IoJ2dldCBleHBlY3RpbmcgYSBqc29uIG9iamVjdCB0byBiZSBwYXNzZWQgYXMgYW4gYXJndW1lbnQsIGJ1dCAnKyB0eXBlb2Ygb3B0aW9ucyArICcgd2FzIHBhc3NlZC4nKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0b3B0aW9ucy5kYXRhID0gb3B0aW9ucy5kYXRhIHx8IHt9O1xyXG5cclxuXHRcdFx0aWYodHlwZW9mIG9wdGlvbnMuZGF0YSAhPT0gJ29iamVjdCcpIHtcclxuXHRcdFx0XHR0aHJvdyBuZXcgRXJyb3IoJ2RhdGEgcHJvcGVydHkgZXhwZWN0aW5nIGEganNvbiBvYmplY3QgdG8gYmUgcGFzc2VkIGFzIGFuIGFyZ3VtZW50LCBidXQgJyArIHR5cGVvZiBvcHRpb25zLmRhdGEgKyAnIHdhcyBwYXNzZWQuJyk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHhoci5vcGVuKCdQT1NUJywgb3B0aW9ucy51cmwsIHRydWUpO1xyXG5cclxuXHRcdFx0eGhyLnJlc3BvbnNlVHlwZSA9IG9wdGlvbnMuZGF0YVR5cGUgfHwgJ2pzb24nO1xyXG5cdFx0XHR4aHIudGltZW91dCA9IG9wdGlvbnMudGltZW91dCB8fCAzMDAwO1xyXG5cclxuXHRcdFx0eGhyLm9ucmVhZHlzdGF0ZWNoYW5nZSA9IGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRcdGlmICh0aGlzLnJlYWR5U3RhdGUgPT0gNCAmJiAodGhpcy5zdGF0dXMgPj0gNDAwICYmIHRoaXMuc3RhdHVzIDw9IDUwMCkpIHtcclxuXHRcdFx0ICAgIFx0cmVqZWN0KHRoaXMucmVzcG9uc2VUZXh0KTtcclxuXHRcdFx0ICAgIH1cclxuXHRcdFx0ICAgIFxyXG5cdFx0XHQgICAgaWYgKHRoaXMucmVhZHlTdGF0ZSAhPSA0IHx8IHRoaXMuc3RhdHVzICE9IDIwMCkge1xyXG5cdFx0XHQgICAgXHRyZXR1cm47XHJcblx0XHRcdCAgICB9XHJcblx0ICAgICAgIFx0XHJcbiAgICAgICBcdFx0XHRyZXNvbHZlKHRoaXMucmVzcG9uc2UpO1xyXG4gICAgICAgXHRcdFx0XHJcbiAgICAgICBcdFx0XHRpZiAob3B0aW9ucy5oYXNPd25Qcm9wZXJ0eSgnYWZ0ZXInKSAmJiB0eXBlb2Ygb3B0aW9ucy5hZnRlciA9PSAnZnVuY3Rpb24nKSB7XHJcblx0XHRcdFx0XHRvcHRpb25zLmFmdGVyLmNhbGwodGhpcyk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9O1xyXG5cclxuXHRcdFx0eGhyLm9uZXJyb3IgPSBmdW5jdGlvbihtZXNzYWdlKSB7XHJcblx0XHRcdFx0aWYob3B0aW9ucy5oYXNPd25Qcm9wZXJ0eSgnZXJyb3InKSAmJiB0eXBlb2Ygb3B0aW9ucy5lcnJvciA9PSAnZnVuY3Rpb24nKSB7XHJcblx0XHRcdFx0XHRvcHRpb25zLmVycm9yKG1lc3NhZ2UpO1xyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0cmVqZWN0KG1lc3NhZ2UpO1xyXG5cdFx0XHR9O1xyXG5cclxuXHRcdFx0aWYoISBvcHRpb25zLmRhdGEpIHtcclxuXHRcdFx0XHR4aHIuc2VuZChudWxsKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0dmFyIHF1ZXJ5U3RyaW5nID0gT2JqZWN0LmtleXMob3B0aW9ucy5kYXRhKS5tYXAoZnVuY3Rpb24oa2V5KSB7XHJcblx0XHQgICAgICAgICAgICByZXR1cm4gZW5jb2RlVVJJQ29tcG9uZW50KGtleSkgKyAnPScgK1xyXG5cdFx0ICAgICAgICAgICAgICAgIFx0ZW5jb2RlVVJJQ29tcG9uZW50KG9wdGlvbnMuZGF0YVtrZXldKTtcclxuXHRcdCAgICAgICAgXHR9KS5qb2luKCcmJyk7XHJcblxyXG5cdFx0XHR4aHIuc2VuZChxdWVyeVN0cmluZyk7XHJcblx0XHR9KTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIE1ha2VzIGEgR0VUIGFqYXggcmVxdWVzdC5cclxuXHQgKiBcclxuXHQgKiBAcGFyYW0gb2JqZWN0IHwgb3B0aW9uc1xyXG5cdCAqIEByZXR1cm4gUHJvbWlzZVxyXG5cdCAqL1xyXG5cdGdldChvcHRpb25zKVxyXG5cdHtcclxuXHRcdGxldCB4aHIgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKSB8fCBuZXcgQWN0aXZlWE9iamVjdChcIk1pY3Jvc29mdC5YTUxIVFRQXCIpO1x0XHRcdFxyXG5cclxuXHRcdGlmIChvcHRpb25zLmhhc093blByb3BlcnR5KCdiZWZvcmUnKSAmJiB0eXBlb2Ygb3B0aW9ucy5iZWZvcmUgPT0gJ2Z1bmN0aW9uJykge1xyXG5cdFx0XHRvcHRpb25zLmJlZm9yZS5jYWxsKHRoaXMpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcclxuXHRcdFx0aWYgKHR5cGVvZiBvcHRpb25zICE9PSAnb2JqZWN0Jykge1xyXG5cdFx0XHRcdHRocm93IG5ldyBFcnJvcignZ2V0IGV4cGVjdGluZyBhIGpzb24gb2JqZWN0IHRvIGJlIHBhc3NlZCBhcyBhbiBhcmd1bWVudCwgYnV0ICcrIHR5cGVvZiBvcHRpb25zICsgJyB3YXMgcGFzc2VkLicpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRvcHRpb25zLmRhdGEgPSBvcHRpb25zLmRhdGEgfHwge307XHJcblxyXG5cdFx0XHRpZiAodHlwZW9mIG9wdGlvbnMuZGF0YSAhPT0gJ29iamVjdCcpIHtcclxuXHRcdFx0XHR0aHJvdyBuZXcgRXJyb3IoJ2RhdGEgcHJvcGVydHkgZXhwZWN0aW5nIGEganNvbiBvYmplY3QgdG8gYmUgcGFzc2VkIGFzIGFuIGFyZ3VtZW50LCBidXQgJyArIHR5cGVvZiBvcHRpb25zLmRhdGEgKyAnIHdhcyBwYXNzZWQuJyk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHhoci5vcGVuKCdHRVQnLCBvcHRpb25zLnVybCwgdHJ1ZSk7XHJcblxyXG5cdFx0XHR4aHIucmVzcG9uc2VUeXBlID0gb3B0aW9ucy5kYXRhVHlwZSB8fCAnanNvbic7XHJcblx0XHRcdHhoci50aW1lb3V0ID0gb3B0aW9ucy50aW1lb3V0IHx8IDMwMDA7XHJcblxyXG5cdFx0XHRpZiAoeGhyLnJlc3BvbnNlVHlwZSA9PSAnanNvbicpIHtcclxuXHRcdFx0XHR4aHIuc2V0UmVxdWVzdEhlYWRlcignQ29udGVudC1UeXBlJywgJ2FwcGxpY2F0aW9uL2pzb24nKTtcclxuXHRcdFx0XHR4aHIuc2V0UmVxdWVzdEhlYWRlcignQWNjZXB0JywgJ2FwcGxpY2F0aW9uL2pzb24nKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0aWYgKHhoci5yZXNwb25zZVR5cGUgPT0gJ2RvY3VtZW50Jykge1xyXG5cdFx0XHRcdHhoci5vdmVycmlkZU1pbWVUeXBlKCd0ZXh0L3htbCcpO1xyXG5cdFx0XHRcdHhoci5zZXRSZXF1ZXN0SGVhZGVyKCdDb250ZW50LVR5cGUnLCAndGV4dC9odG1sJyk7XHJcblx0XHRcdFx0eGhyLnNldFJlcXVlc3RIZWFkZXIoJ0FjY2VwdCcsICd0ZXh0L2h0bWwnKTtcdFxyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHR4aHIub25yZWFkeXN0YXRlY2hhbmdlID0gZnVuY3Rpb24oKSB7XHJcblx0XHRcdCAgICBpZiAodGhpcy5yZWFkeVN0YXRlID09IDQgJiYgKHRoaXMuc3RhdHVzID49IDQwMCAmJiB0aGlzLnN0YXR1cyA8PSA1MDApKSB7XHJcblx0XHRcdCAgICBcdHJlamVjdCh0aGlzLnJlc3BvbnNlVGV4dCk7XHJcblx0XHRcdCAgICB9XHJcblx0XHRcdCAgIFxyXG5cdFx0XHQgICAgaWYgKHRoaXMucmVhZHlTdGF0ZSA9PSA0ICYmIHRoaXMuc3RhdHVzID09IDIwMCkge1xyXG5cdFx0XHRcdCAgICBsZXQgcmVzcG9uc2UgPSB0aGlzLnJlc3BvbnNlIHx8IHRoaXMucmVzcG9uc2VUZXh0O1xyXG5cdFx0XHRcdCAgICByZXNwb25zZSA9ICh4aHIucmVzcG9uc2VUeXBlID09ICdqc29uJyAmJiB0eXBlb2YgcmVzcG9uc2UgIT0gJ29iamVjdCcpID8gSlNPTi5wYXJzZShyZXNwb25zZSkgOiByZXNwb25zZTtcclxuXHRcdFx0XHQgICAgcmVzb2x2ZShyZXNwb25zZSk7XHJcblx0ICAgICAgIFx0XHRcdFxyXG5cdCAgICAgICBcdFx0XHRpZiAob3B0aW9ucy5oYXNPd25Qcm9wZXJ0eSgnYWZ0ZXInKSAmJiB0eXBlb2Ygb3B0aW9ucy5hZnRlciA9PSAnZnVuY3Rpb24nKSB7XHJcblx0XHRcdFx0XHRcdG9wdGlvbnMuYWZ0ZXIuY2FsbCh0aGlzKTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9XHJcblx0XHRcdH07XHJcblxyXG5cdFx0XHR4aHIub25hYm9ydCA9IHhoci5vbmVycm9yID0gZnVuY3Rpb24obWVzc2FnZSkge1xyXG5cdFx0XHRcdGlmIChvcHRpb25zLmhhc093blByb3BlcnR5KCdlcnJvcicpICYmIHR5cGVvZiBvcHRpb25zLmVycm9yID09ICdmdW5jdGlvbicpIHtcclxuXHRcdFx0XHRcdG9wdGlvbnMuZXJyb3IobWVzc2FnZSk7XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRyZWplY3QobWVzc2FnZSk7XHJcblx0XHRcdH07XHJcblxyXG5cdFx0XHRpZiAoISBvcHRpb25zLmRhdGEpIHtcclxuXHRcdFx0XHR4aHIuc2VuZChudWxsKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0dmFyIHF1ZXJ5U3RyaW5nID0gT2JqZWN0LmtleXMob3B0aW9ucy5kYXRhKS5tYXAoZnVuY3Rpb24oa2V5KSB7XHJcblx0XHQgICAgICAgICAgICByZXR1cm4gZW5jb2RlVVJJQ29tcG9uZW50KGtleSkgKyAnPScgK1xyXG5cdFx0ICAgICAgICAgICAgICAgIFx0ZW5jb2RlVVJJQ29tcG9uZW50KG9wdGlvbnMuZGF0YVtrZXldKTtcclxuXHRcdCAgICAgICAgXHR9KS5qb2luKCcmJyk7XHJcblxyXG5cdFx0XHR4aHIuc2VuZChxdWVyeVN0cmluZyk7XHJcblx0XHR9KTtcclxuXHR9XHJcbn1cblxuY2xhc3MgVXJsXHJcbntcclxuXHQgc3RhdGljIHByb2Nlc3NBamF4RGF0YShzZWxlY3RvciwgY29udGVudCwgdXJsUGF0aClcclxuXHQge1xyXG5cdCAgICBsZXQgY29udGV4dCA9IERPTS5maW5kKHNlbGVjdG9yKTtcclxuXHJcblx0ICAgIGNvbnRleHQuaW5uZXJIVE1MID0gY29udGVudDtcclxuXHQgICAgbGV0IHRpdGxlID0gRE9NLmZpbmQoJ3RpdGxlJywgY29udGV4dCk7XHJcblx0ICAgIGRvY3VtZW50LnRpdGxlID0gdGl0bGUuaW5uZXJIVE1MO1xyXG5cdCAgICB3aW5kb3cuaGlzdG9yeS5wdXNoU3RhdGUoe1wiaHRtbFwiOmNvbnRlbnQsXCJwYWdlVGl0bGVcIjogdGl0bGUuaW5uZXJIVE1MfSwgXCJcIiwgdXJsUGF0aCk7XHJcblx0IH1cclxuXHJcblx0LyoqXHJcblx0ICogTW9kaWZpZXMgdGhlIGdldCBwYXJhbWV0ZXIgaW4gdGhlIHVybC5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSBzdHJpbmcgfCB1cmxcclxuXHQgKiBAcGFyYW0gc3RyaW5nIHwga2V5XHJcblx0ICogQHBhcmFtIG51bWJlciB8IHZhbHVlXHJcblx0ICogQHBhcmFtIHN0cmluZyB8IHNlcGFyYXRvclxyXG5cdCAqIEByZXR1cm4gc3RyaW5nXHJcblx0ICovXHJcblx0c3RhdGljIGNoYW5nZVF1ZXJ5UGFyYW1ldGVyVmFsdWUodXJsLCBrZXksIHZhbHVlLCBzZXBhcmF0b3IgPSAnPScpIFxyXG5cdHtcclxuXHRcdGxldCByZWdFeHAgPSBuZXcgUmVnRXhwKFwiKFs/Jl0pXCIgKyBrZXkgKyBzZXBhcmF0b3IgKyBcIi4qPygmfCQpXCIsIFwiaVwiKTtcclxuXHRcdGxldCBwYWlyU2VwYXJhdG9yID0gdXJsLmluZGV4T2YoJz8nKSAhPT0gLTEgPyBcIiZcIiA6IFwiP1wiO1xyXG5cdFx0ICBcclxuXHRcdGlmICh1cmwubWF0Y2gocmVnRXhwKSkge1xyXG5cdFx0XHRyZXR1cm4gdXJsLnJlcGxhY2UocmVnRXhwLCAnJDEnICsga2V5ICsgc2VwYXJhdG9yICsgdmFsdWUgKyAnJDInKTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHQgICAgcmV0dXJuIHVybCArIHBhaXJTZXBhcmF0b3IgKyBrZXkgKyBzZXBhcmF0b3IgKyB2YWx1ZTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIENoYW5nZXMgdGhlIHVybCB0byBhIGdpdmVuIHBhZ2UgbnVtYmVyLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIHN0cmluZyB8IHBhcmFtZXRlcktleVxyXG5cdCAqIEBwYXJhbSBzdHJpbmcgfCBwYXJhbWV0ZXJWYWx1ZVxyXG5cdCAqIEBwYXJhbSBzdHJpbmcgfCBzZXBhcmF0b3JcclxuXHQgKiBAcmV0dXJuIHZvaWRcclxuXHQgKi9cclxuXHRzdGF0aWMgY2hhbmdlUGFyYW1ldGVyKHBhcmFtZXRlcktleSwgcGFyYW1ldGVyVmFsdWUsIHNlcGFyYXRvciA9ICc9JylcclxuXHR7XHJcblx0XHRwYXJhbWV0ZXJWYWx1ZSA9ICBwYXJhbWV0ZXJWYWx1ZSB8fCB0aGlzLnF1ZXJ5U3RyaW5nKClbcGFyYW1ldGVyS2V5XTtcclxuXHRcdGxldCByZXF1ZXN0ZWRVcmwgPSB0aGlzLmNoYW5nZVF1ZXJ5UGFyYW1ldGVyVmFsdWUod2luZG93LmxvY2F0aW9uLmhyZWYsIHBhcmFtZXRlcktleSwgcGFyYW1ldGVyVmFsdWUsIHNlcGFyYXRvcik7XHJcblx0XHR3aW5kb3cuaGlzdG9yeS5yZXBsYWNlU3RhdGUoJycsICcnLCByZXF1ZXN0ZWRVcmwpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQ2hhbmdlcyB0aGUgdXJsLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIHN0cmluZyB8IHVybFxyXG5cdCAqIEByZXR1cm4gdm9pZFxyXG5cdCAqL1xyXG5cdHN0YXRpYyBjaGFuZ2UodXJsKVxyXG5cdHtcclxuXHRcdGlmICh1cmwuY2hhckF0KDApICE9ICcvJykge1xyXG5cdFx0XHR1cmwgPSAnLycgKyB1cmw7XHJcblx0XHR9XHJcblxyXG5cdFx0bGV0IHByZXZpb3VzVXJsID0gd2luZG93LmxvY2F0aW9uLnBhdGhuYW1lO1xyXG5cdFx0XHJcblx0XHR3aW5kb3cuaGlzdG9yeS5wdXNoU3RhdGUoe1wicHJldmlvdXNcIjogcHJldmlvdXNVcmx9LCAnJywgdXJsKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEdldCB0aGUgZ2V0IHZhcmlhYmxlcyBmcm9tIHRoZSB1cmwuXHJcblx0ICpcclxuXHQgKiBAcmV0dXJuIGFycmF5XHJcblx0ICovXHJcblx0c3RhdGljIHF1ZXJ5U3RyaW5nKCkgXHJcblx0e1xyXG5cdFx0bGV0IHZhcnMgPSB7fTtcclxuXHRcdGxldCBwYXJ0cyA9IHdpbmRvdy5sb2NhdGlvbi5ocmVmLnJlcGxhY2UoL1s/Jl0rKFtePSZdKyk9KFteJl0qKS9naSwgZnVuY3Rpb24obSwga2V5LCB2YWx1ZSkge1xyXG5cdFx0XHR2YXJzW2tleV0gPSB2YWx1ZTtcclxuXHRcdH0pO1xyXG5cclxuXHRcdHJldHVybiB2YXJzO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQ2hlY2tzIGlmIGEgZ2l2ZW4gdXJsIGhhdmUgcGFyYW1ldGVycy5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSBzdHJpbmcgfCB1cmxcclxuXHQgKiBAcmV0dXJuIGJvb2xcclxuXHQgKi9cclxuXHRzdGF0aWMgaGFzUGFyYW1ldGVycyh1cmwpXHJcblx0e1xyXG5cdFx0cmV0dXJuIHVybC5pbmRleE9mKCc/JykgPj0gMDtcclxuXHR9XHJcblxyXG5cclxufVxuXG4vKipcclxuICogQGNsYXNzIFJvdXRlclxyXG4gKlxyXG4gKiBIYW5kbGVzIHRoZSBjbGllbnQtc2lkZSByb3V0aW5nLlxyXG4gKi9cclxuXHJcbmNsYXNzIFJvdXRlclxyXG57XHJcblx0LyoqXHJcblx0ICogLSBJbml0aWFsaXplIHRoZSBjb250YWluZXJcclxuXHQgKiAtIEluaXRpYWxpemUgdGhlIHJvdXRlc1xyXG5cdCAqIC0gQXR0YWNoIGV2ZW50IGxpc3RlbmVycyBmb3I6XHJcblx0ICogY2xpY2ssIHBvcHN0YXRlLCB0b3VjaHN0YXJ0LCBoYXNoY2hhbmdlLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIEFwcFxcQ29yZVxcQ29udGFpbmVyIFxyXG5cdCAqIEByZXR1cm4gdm9pZFxyXG5cdCAqL1xyXG5cdGNvbnN0cnVjdG9yKGNvbnRhaW5lcilcclxuXHR7XHJcblx0XHR0aGlzLmNvbnRhaW5lciA9IGNvbnRhaW5lcjtcclxuXHRcdHRoaXMucm91dGVzID0gdGhpcy5idWlsZFJvdXRlcygpO1xyXG5cdFx0dGhpcy5oYXNoID0gJyMjJztcclxuXHJcblx0XHRpZiAodHlwZW9mIGhpc3RvcnkgIT0gJ3VuZGVmaW5lZCcpIHtcclxuXHRcdFx0aGlzdG9yeS5yZXBsYWNlU3RhdGUoe1wicHJldmlvdXNcIjogJy8nfSwgJycsIHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZSk7XHJcblx0XHR9XHJcblxyXG5cdFx0d2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2hhc2hjaGFuZ2UnLCB0aGlzLnJlZ2lzdGVyLmJpbmQodGhpcykpO1xyXG5cdFx0d2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3BvcHN0YXRlJywgdGhpcy5yZWdpc3Rlci5iaW5kKHRoaXMpKTtcclxuXHRcdHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCd0b3VjaHN0YXJ0JywgdGhpcy5yZWdpc3Rlci5iaW5kKHRoaXMpKTtcclxuXHRcdHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMucmVnaXN0ZXIuYmluZCh0aGlzKSk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBFbnRyeSBwb2ludCBmb3IgdGhlIGFwcGxpY2F0aW9uLlxyXG5cdCAqIGZyb20gaGVyZSB3aWxsIGJlIGRlY2lkZWQgd2hpY2hcclxuXHQgKiBjb21wb25lbnQgc2hvdWxkIGJlIGRpc3BsYXllZC5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSBvYmplY3QgfCBldmVudFxyXG5cdCAqIEByZXR1cm4gdm9pZFxyXG5cdCAqL1xyXG5cdHJlZ2lzdGVyKGV2ZW50KVxyXG5cdHtcclxuXHRcdGxldCB1cmwgPSB0aGlzLnBhcnNlVXJsKCk7XHJcblxyXG5cdFx0aWYgKHRoaXMuaGFzaE5hdmlnYXRpb24pIHtcclxuXHRcdFx0bGV0IG1vZGlmaWVkVXJsID0gdGhpcy5oYXNoICsgdXJsICsgJz8nICsgdGhpcy5xdWVyeVN0cmluZztcclxuXHRcdFx0XHJcblx0XHRcdGlmICh0eXBlb2YgZXZlbnQgIT0gJ3VuZGVmaW5lZCcgJiYgZXZlbnQudHlwZSA9PSAncG9wc3RhdGUnKSB7XHJcblx0XHRcdFx0VXJsLmNoYW5nZShtb2RpZmllZFVybCk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0XHRpZiAodHlwZW9mIGV2ZW50ID09ICd1bmRlZmluZWQnKSB7XHJcblx0XHRcdHRoaXMucGFyc2VIdHRwUmVxdWVzdCh1cmwpO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0dGhpcy5wYXJzZUV2ZW50KGV2ZW50LCB1cmwpO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogUGFyc2UgdGhlIHVybC5cclxuXHQgKiBzZXBhcmF0ZSBxdWVyeSBzdHJpbmcgZnJvbSB1cmwuXHJcblx0ICpcclxuXHQgKiBAcmV0dXJuIHVybCBcclxuXHQgKi9cclxuXHRwYXJzZVVybCgpXHJcblx0e1xyXG5cdFx0bGV0IHVybCA9IHdpbmRvdy5sb2NhdGlvbi5ocmVmO1xyXG5cclxuXHRcdGlmIChVcmwuaGFzUGFyYW1ldGVycyh1cmwpKSB7XHJcblx0XHRcdGxldCBwYXJ0cyA9IHVybC5zcGxpdCgnPycpO1xyXG5cdFx0XHR0aGlzLnF1ZXJ5U3RyaW5nID0gcGFydHNbMV07XHJcblx0XHRcdHVybCA9IHBhcnRzWzBdLnJlcGxhY2Uod2luZG93LmxvY2F0aW9uLnByb3RvY29sICsgJy8vJyArIHdpbmRvdy5sb2NhdGlvbi5ob3N0LCAnJyk7XHJcblx0XHRcdHRoaXMuY3VycmVudCA9IHVybDtcclxuXHRcdFx0XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKHVybC5pbmRleE9mKHRoaXMuaGFzaCkgPj0gMCkge1xyXG5cdFx0XHR1cmwgPSB3aW5kb3cubG9jYXRpb24ucGF0aG5hbWUucmVwbGFjZSh0aGlzLmhhc2gsICcnKTtcclxuXHRcdH1cclxuXHJcblx0XHRpZiAodGhpcy5oYXNoTmF2aWdhdGlvbikge1xyXG5cdFx0XHRVcmwuY2hhbmdlKHRoaXMuaGFzaCArIHVybCArICc/JyArIHRoaXMucXVlcnlTdHJpbmcpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiB1cmw7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBQYXJzZSBhIGZ1bGwgaHR0cCBjb21taW5nIHJlcXVlc3QuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gc3RyaW5nIHwgdXJsXHJcblx0ICogQHJldHVybiB2b2lkXHJcblx0ICovXHJcblx0cGFyc2VIdHRwUmVxdWVzdCh1cmwpXHJcblx0e1xyXG5cdFx0dGhpcy5jdXJyZW50ID0gdXJsO1xyXG5cdFx0dGhpcy5kaXNwYXRjaCh1cmwpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogUGFyc2UgYSByZXF1ZXN0IGhhcHBlbnMgYnkgdHJpZ2dlcmVkIGV2ZW50LlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIHN0cmluZyB8IHVybFxyXG5cdCAqIEByZXR1cm4gdm9pZFxyXG5cdCAqL1xyXG5cdHBhcnNlRXZlbnQoZXZlbnQsIHVybClcclxuXHR7XHJcblx0XHRzd2l0Y2goZXZlbnQudHlwZSlcclxuXHRcdHtcclxuXHRcdFx0Y2FzZSAndG91Y2hzdGFydCc6XHJcblx0XHRcdGNhc2UgJ2NsaWNrJzpcclxuXHRcdFx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdFx0XHRcdFxyXG5cdFx0XHRcdC8vIGJhc2ljYWxseSBleGl0LCBzdG9wIHBhcnNpbmcsIHRoZSB1c2VyIGRpZCBub3QgY2xpY2sgYSBsaW5rXHJcblx0XHRcdFx0aWYgKGV2ZW50LnRhcmdldC50YWdOYW1lLnRvTG93ZXJDYXNlKCkgIT0gJ2EnIHx8XHJcblx0XHRcdFx0XHRET00uaGFzQ2xhc3MoZXZlbnQudGFyZ2V0LCAncGFnZS1pdGVtJykgfHxcclxuXHRcdFx0XHRcdERPTS5oYXNDbGFzcyhldmVudC50YXJnZXQsICdwYWdlLWxpbmsnKSkge1xyXG5cdFx0XHRcdFx0cmV0dXJuOyBcclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdC8vIGdldCB0aGUgbGluayBocmVmIGF0dHJpYnV0ZSwgb25seSB0aGUgcGF0aCBzZWdtZW50LlxyXG5cdFx0XHRcdGlmICh0eXBlb2YgZXZlbnQudGFyZ2V0LnBhdGhuYW1lICE9ICd1bmRlZmluZWQnKSB7XHJcblx0XHRcdFx0XHR1cmwgPSBldmVudC50YXJnZXQucGF0aG5hbWU7XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRicmVhaztcclxuXHRcdFx0Y2FzZSAncG9wc3RhdGUnOlxyXG5cdFx0XHRcdGlmICh0eXBlb2YgZXZlbnQuc3RhdGUgIT0gJ3VuZGVmaW5lZCcpIHtcclxuXHRcdFx0XHRcdHVybCA9IGV2ZW50LnN0YXRlLnByZXZpb3VzO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRicmVhaztcclxuXHRcdFx0Y2FzZSAnaGFzaGNoYW5nZSc6XHJcblx0XHRcdFx0dXJsID0gd2luZG93LmxvY2F0aW9uLnBhdGhuYW1lLnJlcGxhY2UodGhpcy5oYXNoLCAnJyk7XHJcblx0XHRcdFx0YnJlYWs7XHJcblx0XHR9XHJcblxyXG5cdFx0dGhpcy5jb250YWluZXIuRXZlbnRzLnN1YnNjcmliZSgncm91dGUuZGlzcGF0Y2hlZCcsIGZ1bmN0aW9uKHVybCkge1xyXG5cdFx0XHRpZiAodGhpcy5oYXNoTmF2aWdhdGlvbikge1xyXG5cdFx0XHRcdHVybCA9IHRoaXMuaGFzaCArIHVybDsgXHJcblx0XHRcdH1cclxuXHJcblx0XHRcdFVybC5jaGFuZ2UodXJsKTtcclxuXHRcdH0uYmluZCh0aGlzKSk7XHJcblxyXG5cdFx0dGhpcy5jdXJyZW50ID0gdXJsO1xyXG5cdFx0dGhpcy5kaXNwYXRjaCh1cmwpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogRGlzcGFjaGVzIHRoZSByb3V0ZSBmb3IgYSBnaXZlbiB1cmwuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gc3RyaW5nIHwgdXJsXHJcblx0ICogQHJldHVybiB2b2lkXHJcblx0ICovXHJcblx0ZGlzcGF0Y2godXJsKVxyXG5cdHtcclxuXHRcdC8vIEB0b2RvIGNoZWNrIGZvciBwYXJhbWV0ZXJzIHJvdXRlcyBhbmQgcmVwbGFjZSBmZXRjaCB0aGUgdmFsdWUgZnJvbSB0aGUgdXJsLlxyXG5cdFx0Y29uc29sZS5sb2codXJsKTtcclxuXHJcblx0XHRpZiAodGhpcy5yb3V0ZXMuaW5kZXhPZih1cmwpICE9IC0xKSB7XHJcblx0XHRcdHN3aXRjaCh1cmwpXHJcblx0XHRcdHtcclxuXHRcdFx0XHRjYXNlICcvJzpcclxuXHRcdFx0XHRjYXNlICcvaG9tZSc6XHJcblx0XHRcdFx0XHRjb25zb2xlLmxvZygnaG9tZScpO1xyXG5cdFx0XHRcdFx0dGhpcy5jb250YWluZXIuUHJvZHVjdHMuaGlkZUFsbCgpO1xyXG5cdFx0XHRcdFx0dGhpcy5jb250YWluZXIuRmlsdGVyLnNob3coKTtcclxuXHRcdFx0XHRcdHRoaXMuY29udGFpbmVyLlByb2R1Y3RzLnNob3coKTtcclxuXHRcdFx0XHRcdHRoaXMuY29udGFpbmVyLkNhcnQuc2hvdygpO1xyXG5cdFx0XHRcdFx0dGhpcy5jb250YWluZXIuUGFnaW5hdGlvbi5zaG93KCk7XHJcblx0XHRcdFx0XHRicmVhaztcclxuXHRcdFx0XHRjYXNlICcvY2hlY2tvdXQnOlxyXG5cdFx0XHRcdFx0Y29uc29sZS5sb2coJ2NoZWNrb3V0Jyk7XHJcblx0XHRcdFx0XHR0aGlzLmNvbnRhaW5lci5DaGVja291dC5oaWRlQWxsKCk7XHJcblx0XHRcdFx0XHR0aGlzLmNvbnRhaW5lci5DaGVja291dC5zaG93KCk7XHJcblx0XHRcdFx0XHRicmVhaztcclxuXHRcdFx0XHRjYXNlICcvaW5mby86cHJvZHVjdCc6XHJcblx0XHRcdFx0XHRjb25zb2xlLmxvZygnc2luZ2xlIHByb2R1Y3QgaW5mbyBwYWdlJyk7XHJcblx0XHRcdFx0XHR0aGlzLmNvbnRhaW5lci5EZXRhaWxzLmhpZGVBbGwoKTtcclxuXHRcdFx0XHRcdHRoaXMuY29udGFpbmVyLkRldGFpbHMuc2hvdygpO1xyXG5cdFx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdFx0ZGVmYXVsdDpcclxuXHRcdFx0XHRcdGNvbnNvbGUubG9nKCdkZWZhdWx0IHJvdXRlJyk7XHJcblx0XHRcdFx0XHRicmVhaztcclxuXHRcdFx0fVxyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0dGhyb3cgbmV3IEVycm9yKCdObyBtYXRjaGluZyByb3V0ZSBmb3VuZCEnKTtcclxuXHRcdH1cclxuXHJcblx0XHR0aGlzLmNvbnRhaW5lci5FdmVudHMucHVibGlzaCgncm91dGUuZGlzcGF0Y2hlZCcsIHVybCk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBCYXNlZCBvbiBkZXZlbG9wZXIncyBjb25maWd1cmF0aW9uLlxyXG5cdCAqIGF0dGFjaGVzIGFuIGhhc2ggZm9yIHRoZSBuYXZpZ2F0aW9uXHJcblx0ICogdG8gcHJldmVudCB3ZWJzZXJ2ZXIgZnJvbSBub3QgZmluZGluZyBmaWxlc1xyXG5cdCAqIG9uIHBhZ2UgcmVmcmVzaC5cclxuXHQgKiBcclxuXHQgKiBAcGFyYW0gYm9vbCB8IGFjdGl2ZVxyXG5cdCAqIEByZXR1cm4gdGhpc1xyXG5cdCAqL1xyXG5cdGhhc2hOYXZpZ2F0aW9uKGFjdGl2ZSA9IGZhbHNlKVxyXG5cdHtcclxuXHRcdHRoaXMuaGFzaE5hdmlnYXRpb24gPSBhY3RpdmU7XHJcblxyXG5cdFx0cmV0dXJuIHRoaXM7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBCdWlsZHMgdGhlIHJvdXRlcy5cclxuXHQgKlxyXG5cdCAqIEByZXR1cm4gYXJyYXlcclxuXHQgKi9cclxuXHRidWlsZFJvdXRlcygpXHJcblx0e1xyXG5cdFx0cmV0dXJuIFsnLycsICcvaG9tZScsICcvY2hlY2tvdXQnLCAnL2luZm8vOnByb2R1Y3QnXTtcclxuXHR9XHJcbn1cblxubGV0IGRlZmF1bHRNZXNzYWdlJDIgPSAnVGhlIGV2ZW50IHlvdSBjYWxsZWQgZG9lcyBub3QgZXhpc3RzIG9yIHlvdSBzdXBwbGllZCB3cm9uZyBhcmd1bWVudCc7XHJcblxyXG5jbGFzcyBCYWRFdmVudENhbGxFeGNlcHRpb24gZXh0ZW5kcyBFeGNlcHRpb25IYW5kbGVyXHJcbntcclxuXHRjb25zdHJ1Y3RvcihtZXNzYWdlID0gbnVsbCkgXHJcblx0e1xyXG5cdFx0bWVzc2FnZSA9IG1lc3NhZ2UgfHwgZGVmYXVsdE1lc3NhZ2UkMjtcclxuXHRcdHN1cGVyKG1lc3NhZ2UpO1xyXG4gICAgXHRzdXBlci5zdGFja1RyYWNlKHRoaXMsIG1lc3NhZ2UpO1xyXG4gICAgfVxyXG59XG5cbi8qKlxyXG4gKiBAZmlsZSBcclxuICogRXZlbnRNYW5hZ2VyIGNsYXNzLlxyXG4gKlxyXG4gKiBIYW5kbGVzIHN1YnNjcmlwaW9ucyBhbmQgcHVibGlzaGluZyBvZiBldmVudHMuXHJcbiAqL1xyXG5cclxuY2xhc3MgRXZlbnRNYW5hZ2VyXHJcbntcclxuXHQvKipcclxuXHQgKiBTdG9yZXMgdGhlIGV2ZW50cyBjYWxsYmFja3MuXHJcblx0ICogXHJcblx0ICogQHZhciBhcnJheVxyXG5cdCAqL1xyXG5cdGNvbnN0cnVjdG9yKClcclxuXHR7XHJcblx0XHR0aGlzLmV2ZW50cyA9IHt9O1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogU3Vic2NyaWJpbmcgdG8gYW4gZXZlbnQuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gc3RyaW5nIHwgbmFtZVxyXG5cdCAqIEBwYXJhbSBmdW5jdGlvbiB8IGNhbGxiYWNrXHJcblx0ICogQHJldHVybiB2b2lkXHJcblx0ICovXHJcblx0c3Vic2NyaWJlKG5hbWUsIGNhbGxiYWNrKSBcclxuXHR7XHJcblx0XHRpZiAodHlwZW9mIGNhbGxiYWNrICE9PSAnZnVuY3Rpb24nKSB7XHJcblx0XHRcdHRocm93IG5ldyBJbnZhbGlkQXJndW1lbnRFeGNlcHRpb247XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKHR5cGVvZiB0aGlzLmV2ZW50c1tuYW1lXSA9PSAndW5kZWZpbmVkJykge1xyXG5cdFx0XHR0aGlzLmV2ZW50c1tuYW1lXSA9IFtdO1xyXG5cdFx0fVxyXG5cclxuXHRcdHRoaXMuZXZlbnRzW25hbWVdLnB1c2goY2FsbGJhY2spO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogUHVibGlzaCBhbiBldmVudCB0byBhbGwgc3Vic2NyaWJlcnMuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gc3RyaW5nIHwgbmFtZVxyXG5cdCAqIEBwYXJhbSBsaXN0IHwgZGF0YVxyXG5cdCAqIEByZXR1cm4gdm9pZFxyXG5cdCAqL1xyXG5cdHB1Ymxpc2gobmFtZSwgLi4uZGF0YSkgXHJcblx0e1xyXG5cdFx0ZGF0YSA9IGRhdGEgfHwgbnVsbDtcclxuXHJcblx0XHQvLyBJZiB0aGVyZSBhcmUgbm8gc3Vic2NyaWJlcnMgc2ltcGx5IGlnbm9yZSB0aGF0IGV2ZW50LlxyXG5cdFx0aWYgKHR5cGVvZiB0aGlzLmV2ZW50c1tuYW1lXSA9PSAndW5kZWZpbmVkJykge1xyXG5cdFx0XHRyZXR1cm47XHJcblx0XHR9XHJcblxyXG5cdFx0dGhpcy5ldmVudHNbbmFtZV0uZm9yRWFjaChmdW5jdGlvbihjYWxsYmFjaykge1xyXG5cdFx0XHRpZih0eXBlb2YgY2FsbGJhY2sgIT0gJ2Z1bmN0aW9uJykge1xyXG5cdFx0XHRcdHRocm93IG5ldyBJbnZhbGlkQXJndW1lbnRFeGNlcHRpb24oJ3N1YnNjcmliZSgpIHNob3VsZCByZWNpZXZlIGNhbGxiYWNrIGFzIHNlY29uZCBwYXJhbWV0ZXIsIGJ1dCAnKyB0eXBlb2YgY2FsbGJhY2sgKycgd2FzIHBhc3NlZCcpO1xyXG5cdFx0XHR9XHJcblx0XHRcdFxyXG5cdFx0XHRyZXR1cm4gY2FsbGJhY2soLi4uZGF0YSk7XHJcblx0XHR9KTtcclxuXHR9XHJcbn1cblxuLyoqXHJcbiAqIEBmaWxlIFxyXG4gKiBDb29raWUgY2xhc3MuXHJcbiAqXHJcbiAqIEFkZHMgc29tZSB1c2VmdWwgZnVuY3Rpb25hbGl0eSBmb3JcclxuICogc2V0dGluZyBvciBnZXR0aW5nIGNvb2tpZXMuXHJcbiAqL1xyXG5cdFxyXG5jbGFzcyBDb29raWVcclxue1xyXG5cdC8qKlxyXG4gXHQqIFNldHMgYSBjb29raWUuXHJcbiBcdCogXHJcbiBcdCogQHBhcmFtIHN0cmluZyB8IG5hbWVcclxuIFx0KiBAcGFyYW0gSlNPTiB8IHZhbHVlXHJcbiBcdCogQHBhcmFtIGludGVnZXIgfCBkYXlzXHJcbiBcdCogQHJldHVybiB2b2lkXHJcblx0Ki9cclxuXHRzdGF0aWMgc2V0KG5hbWUsIHZhbHVlLCBkYXlzKSBcclxuXHR7XHJcblx0XHRpZiAodmFsdWUuY29uc3RydWN0b3IubmFtZSAgPT0gJ09iamVjdCcgfHwgdmFsdWUuY29uc3RydWN0b3IubmFtZSA9PSAnQXJyYXknKSB7XHJcblx0XHRcdHZhbHVlID0gSlNPTi5zdHJpbmdpZnkodmFsdWUpO1xyXG5cdFx0fVxyXG5cclxuXHRcdGRheXMgPSBkYXlzIHx8IDEwO1xyXG5cclxuXHQgICAgbGV0IGV4cGlyZXM7XHJcblx0ICAgIFxyXG5cdCAgICBpZiAoZGF5cykge1xyXG5cdCAgICAgICAgbGV0IGRhdGUgPSBuZXcgRGF0ZSgpO1xyXG5cdCAgICAgICAgZGF0ZS5zZXRUaW1lKGRhdGUuZ2V0VGltZSgpICsgKGRheXMgKiAyNCAqIDYwICogNjAgKiAxMDAwKSk7XHJcblx0ICAgICAgICBleHBpcmVzID0gXCI7IGV4cGlyZXM9XCIgKyBkYXRlLnRvR01UU3RyaW5nKCk7XHJcblx0ICAgIH0gZWxzZSB7XHJcblx0ICAgICAgICBleHBpcmVzID0gXCJcIjtcclxuXHQgICAgfVxyXG5cclxuXHQgICAgZG9jdW1lbnQuY29va2llID0gbmFtZSArIFwiPVwiICsgdmFsdWUgKyBleHBpcmVzICsgXCI7IHBhdGg9L1wiO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogUmV0cmlldmVzIHRoZSBjb29raWUgYnkgbmFtZS5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSBzdHJpbmcgfCBuYW1lXHJcbiBcdCAqIEByZXR1cm4gSlNPTlxyXG5cdCAqL1xyXG5cdHN0YXRpYyBnZXQobmFtZSkgXHJcblx0e1xyXG5cdCAgICBpZiAoZG9jdW1lbnQuY29va2llLmxlbmd0aCA+IDApIHtcclxuXHQgICAgICAgIGxldCBjX3N0YXJ0ID0gZG9jdW1lbnQuY29va2llLmluZGV4T2YobmFtZSArIFwiPVwiKTtcclxuXHQgICAgICAgIFxyXG5cdCAgICAgICAgaWYgKGNfc3RhcnQgIT0gLTEpIHtcclxuXHQgICAgICAgICAgICBjX3N0YXJ0ID0gY19zdGFydCArIG5hbWUubGVuZ3RoICsgMTtcclxuXHQgICAgICAgICAgICBsZXQgY19lbmQgPSBkb2N1bWVudC5jb29raWUuaW5kZXhPZihcIjtcIiwgY19zdGFydCk7XHJcblx0ICAgICAgICAgICAgXHJcblx0ICAgICAgICAgICAgaWYgKGNfZW5kID09IC0xKSB7XHJcblx0ICAgICAgICAgICAgICAgIGNfZW5kID0gZG9jdW1lbnQuY29va2llLmxlbmd0aDtcclxuXHQgICAgICAgICAgICB9XHJcblxyXG5cdCAgICAgICAgICAgIHJldHVybiBKU09OLnBhcnNlKHVuZXNjYXBlKGRvY3VtZW50LmNvb2tpZS5zdWJzdHJpbmcoY19zdGFydCwgY19lbmQpKSk7XHJcblx0ICAgICAgICB9XHJcblx0ICAgIH1cclxuXHJcblx0ICAgIHJldHVybiB7fTtcclxuXHR9XHJcbn1cblxuLyoqXHJcbiAqIEBjbGFzcyBCYXNlQ29tcG9uZW50XHJcbiAqIFxyXG4gKiBDb21tb24gZnVuY3Rpb25hbGxpdHkgb2YgY29tcG9uZW50cy4gXHJcbiAqL1xyXG5cclxuY2xhc3MgQmFzZUNvbXBvbmVudFxyXG57XHJcblx0LyoqXHJcblx0ICogSGlkZXMgdGhlIGNvbXBvbmVudCBmcm9tIHRoZSBET00uXHJcblx0ICpcclxuXHQgKiBAcmV0dXJuIHZvaWQgXHJcblx0ICovXHJcblx0aGlkZSgpXHJcblx0e1xyXG5cdFx0aWYgKHR5cGVvZiB0aGlzLmVsZW1lbnQgIT0gJ3VuZGVmaW5lZCcpIHtcclxuXHRcdFx0dGhpcy5lbGVtZW50LnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBTaG93cyB0aGUgZWxlbWVudCBvbiB0aGUgRE9NLlxyXG5cdCAqXHJcblx0ICogQHJldHVybiB2b2lkIFxyXG5cdCAqL1xyXG5cdHNob3coKVxyXG5cdHtcclxuXHRcdGlmICh0eXBlb2YgdGhpcy5lbGVtZW50ICE9ICd1bmRlZmluZWQnKSB7XHJcblx0XHRcdHRoaXMuZWxlbWVudC5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEVtcHR5IHRoZSBjb21wb25lbnQuXHJcblx0ICpcclxuXHQgKiBAcmV0dXJuIHZvaWQgXHJcblx0ICovXHJcblx0ZW1wdHkoKVxyXG5cdHtcclxuXHRcdGlmICh0eXBlb2YgdGhpcy5lbGVtZW50ICE9ICd1bmRlZmluZWQnKSB7XHJcblx0XHRcdHRoaXMuZWxlbWVudC5pbm5lckhUTUwgPSAnJztcclxuXHRcdH1cclxuXHR9XHJcbn1cblxubGV0IGRlZmF1bHRNZXNzYWdlJDMgPSAnVGhlIGl0ZW0geW91IGFyZSB0cnlpbmcgdG8gYWRkIG11c3QgY29udGFpbiBhIHVuaXF1ZSBpZCc7XHJcblxyXG5jbGFzcyBJbnZhbGlkQ2FydEl0ZW1FeGNlcHRpb24gZXh0ZW5kcyBFeGNlcHRpb25IYW5kbGVyXHJcbntcclxuXHRjb25zdHJ1Y3RvcihtZXNzYWdlID0gbnVsbCkgXHJcblx0e1xyXG5cdFx0bWVzc2FnZSA9IG1lc3NhZ2UgfHwgZGVmYXVsdE1lc3NhZ2UkMztcclxuXHRcdHN1cGVyKG1lc3NhZ2UpO1xyXG4gICAgXHRzdXBlci5zdGFja1RyYWNlKHRoaXMsIG1lc3NhZ2UpO1xyXG4gICAgfVxyXG59XG5cbi8vIEhlbHBlcnNcclxuLy8gQ29tcG9uZW50c1xyXG4vLyBFeGNlcHRpb25zXHJcbi8qKlxyXG4gKiBUaGUgZGVmYXVsdCBzZXR0aW5ncyBvZiB0aGUgY2FydC5cclxuICpcclxuICogQHZhciBvYmplY3RcclxuICovXHJcbmxldCBkZWZhdWx0U2V0dGluZ3MkMSA9IHtcclxuXHRlbGVtZW50OiAnLmNhcnQnLFxyXG5cdGNvb2tpZV9uYW1lOiAnY2FydCcsXHJcblx0cHJldmlld19jbGFzczogJycsXHJcblx0bG9hZGVyOiAnJyxcclxuXHRjbGFzczogJycsXHJcblx0d2lkdGg6ICc2MHB4JyxcclxuXHRoZWlnaHQ6ICc2MHB4JyxcclxuXHRwbGFjZW1lbnQ6ICdyaWdodC10b3AnLFxyXG5cdGZpeGVkOiB0cnVlLFxyXG5cdGhvdmVyX2NvbG9yOiAnb3JhbmdlJyxcclxuXHRub19jc3M6IGZhbHNlLFxyXG59O1xyXG5cclxuLyoqXHJcbiAqIFN0b3JlcyB0aGUgY29udGFpbmVyIG9iamVjdC5cclxuICpcclxuICogQHZhciBcXENvcmVcXENvbnRhaW5lclxyXG4gKi9cclxubGV0IENvbnRhaW5lcjtcclxuXHJcbi8qKlxyXG4gKiBTdG9yZXMgdGhlIGV2ZW50IG1hbmFnZXIgb2JqZWN0LlxyXG4gKlxyXG4gKiBAdmFyIFxcQ29yZVxcRXZlbnRNYW5hZ2VyXHJcbiAqL1xyXG5sZXQgRXZlbnRNYW5hZ2VyJDI7XHJcblxyXG4vKipcclxuICogU3RvcmVzIHRoZSByZXF1ZXN0IG9iamVjdC5cclxuICpcclxuICogQHZhciBcXEhlbHBlcnNcXFJlcXVlc3RcclxuICovXHJcbmxldCBIdHRwO1xyXG5cclxuLyoqXHJcbiAqIFN0b3JlcyB0aGUgY2FydCBsb2FkZXIuXHJcbiAqXHJcbiAqIEB2YXIgSFRNTERpdkVsZW1lbnRcclxuICovXHJcbmxldCBsb2FkaW5nT3ZlcmxheTtcclxuXHJcbi8qKlxyXG4gKiBTdG9yZXMgdGhlIGl0ZW1zIHdyYXBwZXIuXHJcbiAqXHJcbiAqIEB2YXIgSFRNTERpdkVsZW1lbnRcclxuICovXHJcbmxldCBpdGVtc0RpdjtcclxuXHJcbi8qKlxyXG4gKiBAY2xhc3MgQ2FydFxyXG4gKlxyXG4gKiBIYW5kbGVzIGFkZGluZywgcmVtb3ZpbmcsIGNhbGN1bGF0aW9ucyBvZiBpdGVtcy5cclxuICovXHJcblxyXG5jbGFzcyBDYXJ0IGV4dGVuZHMgQmFzZUNvbXBvbmVudFxyXG57XHJcblx0LyoqXHJcblx0ICogLSBJbml0aWFsaXplIHRoZSBJb0MgY29udGFpbmVyXHJcblx0ICogLSBJbml0aWFsaXplIHRoZSBSZXF1ZXN0XHJcblx0ICogLSBJbml0aWFsaXplIHRoZSBFdmVudE1hbmFnZXJcclxuXHQgKiAtIENyZWF0ZXMgdGhlIHByZXZpZXcgYW5kIHRoZSBpY29uIG9mIHRoZSBjYXJ0LlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIFxcQ29yZVxcQ29udGFpbmVyIHwgY29udGFpbmVyXHJcblx0ICogQHBhcmFtIFxcSGVscGVyc1xcUmVxdWVzdCB8IGh0dHBcclxuXHQgKiBAcGFyYW0gXFxDb3JlXFxFdmVudE1hbmFnZXIgfCBldmVudE1hbmFnZXJcclxuXHQgKiBAcmV0dXJuIHZvaWRcclxuXHQgKi9cclxuXHRjb25zdHJ1Y3Rvcihjb250YWluZXIsIGh0dHAsIGV2ZW50TWFuYWdlcikgXHJcblx0e1xyXG5cdFx0c3VwZXIoKTtcclxuXHJcblx0XHRDb250YWluZXIgPSBjb250YWluZXI7XHJcblx0XHRIdHRwID0gaHR0cDtcclxuXHRcdEV2ZW50TWFuYWdlciQyID0gZXZlbnRNYW5hZ2VyO1xyXG5cdFx0XHJcblx0XHR0aGlzLnByZXZpZXdFbGVtZW50ID0gdGhpcy5jcmVhdGVQcmV2aWV3RWxlbWVudCgpO1xyXG5cdFx0dGhpcy5pY29uID0gY3JlYXRlSWNvbi5jYWxsKHRoaXMpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogU2V0cyB0aGUgb2JqZWN0IGJ5IHRoZSB1c2VycyBzZXR0aW5nLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIG9iamVjdCB8IHNldHRpbmdzXHJcblx0ICogQHJldHVybiB2b2lkXHJcblx0ICovXHJcblx0c2V0dXAoc2V0dGluZ3MpXHJcblx0e1xyXG5cdFx0aWYgKHR5cGVvZiBzZXR0aW5ncyAhPSAnb2JqZWN0Jykge1xyXG5cdFx0XHR0aHJvdyBuZXcgSW52YWxpZEFyZ3VtZW50RXhjZXB0aW9uJDE7XHJcblx0XHR9XHJcblxyXG5cdFx0dGhpcy5zZXR0aW5ncyA9IENvbW1vbi5leHRlbmQoZGVmYXVsdFNldHRpbmdzJDEsIHNldHRpbmdzKTtcclxuXHJcblx0XHR0aGlzLnNldEVsZW1lbnQodGhpcy5zZXR0aW5ncy5lbGVtZW50KTtcclxuXHJcblx0XHRET00uYWRkQ2xhc3ModGhpcy5wcmV2aWV3RWxlbWVudCwgJ2Nsb3NlZCcpO1xyXG5cdFx0RE9NLmFkZENsYXNzKHRoaXMucHJldmlld0VsZW1lbnQsIHRoaXMuc2V0dGluZ3MucHJldmlld19jbGFzcyk7XHJcblx0XHRcclxuXHRcdHRoaXMuZHJhdygpO1xyXG5cdFx0dGhpcy5iaW5kRXZlbnRMaXN0ZW5lcnMoKTtcclxuXHRcdFxyXG5cdFx0aWYgKHRoaXMuaXNFbXB0eShDb29raWUuZ2V0KHRoaXMuc2V0dGluZ3MuY29va2llX25hbWUpKSkge1xyXG5cdFx0XHR0aGlzLnNldHVwQ2FydCgpO1xyXG5cdFx0XHRcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIENoZWNrcyBpZiB0aGUgY2FydCBpcyBlbXB0eVxyXG5cdCAqXHJcblx0ICogQHBhcmFtIG9iamVjdCB8IGNhcnRcclxuXHQgKiBAcmV0dXJuIGJvb2xcclxuXHQgKi9cclxuXHRpc0VtcHR5KGNhcnQpXHJcblx0e1xyXG5cdFx0cmV0dXJuIENvbW1vbi5lbXB0eU9iamVjdChjYXJ0KTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEluaXRpYWxpemUvU2V0cyB0aGUgY2FydCBhcyBhIGNvb2tpZS5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSBvYmplY3QgfCBjYXJ0XHJcblx0ICogQHJldHVybiB2b2lkXHJcblx0ICovXHJcblx0c2V0dXBDYXJ0KClcclxuXHR7XHJcblx0XHR0aGlzLmNhcnQgPSB7fTtcclxuXHRcdHRoaXMuY2FydC5pZCA9IFN0ci5yYW5kb20oMTApO1xyXG5cdFx0dGhpcy5jYXJ0Lml0ZW1zID0gW107XHJcblx0XHR0aGlzLmNhcnQuZmF2b3JpdGVzID0gW107XHJcblx0XHRDb29raWUuc2V0KHRoaXMuc2V0dGluZ3MuY29va2llX25hbWUsIHRoaXMuY2FydCwgMik7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBBZGRzIGFuIGl0ZW0gdG8gdGhlIGNhcnQuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gb2JqZWN0IHwgaXRlbVxyXG5cdCAqIEByZXR1cm4gdm9pZFxyXG5cdCAqL1xyXG5cdGFkZEl0ZW0oaXRlbSlcclxuXHR7XHJcblx0XHRpZiAodHlwZW9mIGl0ZW0gIT0gJ29iamVjdCcpIHtcclxuXHRcdFx0dGhyb3cgbmV3IEludmFsaWRBcmd1bWVudEV4Y2VwdGlvbiQxKCdhZGRJdGVtKCkgZXhwZWN0IHRoZSBmaXJzdCBwYXJhbWV0ZXIgdG8gYmUgYW4gb2JqZWN0LCBidXQgJyArIHR5cGVvZiBpdGVtICsgJyB3YXMgcGFzc2VkIGluc3RlYWQnKTtcclxuXHRcdH1cclxuXHJcblx0XHRpZiAoISBpdGVtLmhhc093blByb3BlcnR5KCdpZCcpKSB7XHJcblx0XHRcdHRocm93IG5ldyBJbnZhbGlkQ2FydEl0ZW1FeGNlcHRpb247XHJcblx0XHR9XHJcblxyXG5cdFx0dGhpcy5jYXJ0ID0gQ29va2llLmdldCh0aGlzLnNldHRpbmdzLmNvb2tpZV9uYW1lKTtcclxuXHJcblx0XHRpZiAoIWl0ZW0uaGFzT3duUHJvcGVydHkoJ3F1YW50aXR5JykpIHtcclxuXHRcdFx0aXRlbS5xdWFudGl0eSA9IDE7XHJcblx0XHR9XHJcblxyXG5cdFx0bGV0IGk7XHJcblx0XHRsZXQgaW5jcmVtZW50ZWQgPSBmYWxzZTtcclxuXHJcblx0XHRmb3IgKGkgPSAwOyBpIDwgdGhpcy5jYXJ0Lml0ZW1zLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdGlmICh0aGlzLmNhcnQuaXRlbXNbaV0uaWQgPT0gaXRlbS5pZCkge1xyXG5cdFx0XHRcdHRoaXMuY2FydC5pdGVtc1tpXS5xdWFudGl0eSsrO1xyXG5cdFx0XHRcdGluY3JlbWVudGVkID0gdHJ1ZTtcclxuXHRcdFx0XHRicmVhaztcdFxyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKCEgaW5jcmVtZW50ZWQpIHtcclxuXHRcdFx0dGhpcy5jYXJ0Lml0ZW1zLnB1c2goaXRlbSk7XHJcblx0XHR9XHJcblxyXG5cdFx0Q29va2llLnNldCh0aGlzLnNldHRpbmdzLmNvb2tpZV9uYW1lLCB0aGlzLmNhcnQsIDIpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQWRkcyBhbiBpdGVtIHRvIHRoZSBmYXZvcml0ZXMgbGlzdC5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSBvYmplY3QgfCBpdGVtXHJcblx0ICogQHJldHVybiB2b2lkXHJcblx0ICovXHJcblx0ZmF2b3JpdGVJdGVtKGl0ZW0pXHJcblx0e1xyXG5cdFx0aWYgKHR5cGVvZiBpdGVtICE9ICdvYmplY3QnKSB7XHJcblx0XHRcdHRocm93IG5ldyBJbnZhbGlkQXJndW1lbnRFeGNlcHRpb24kMSgnZmF2b3JpdGVJdGVtKCkgZXhwZWN0IHRoZSBmaXJzdCBwYXJhbWV0ZXIgdG8gYmUgYW4gb2JqZWN0LCBidXQgJyArIHR5cGVvZiBpdGVtICsgJyB3YXMgcGFzc2VkIGluc3RlYWQnKTtcclxuXHRcdH1cclxuXHJcblx0XHRpZiAoISBpdGVtLmhhc093blByb3BlcnR5KCdpZCcpKSB7XHJcblx0XHRcdHRocm93IG5ldyBJbnZhbGlkQ2FydEl0ZW1FeGNlcHRpb247XHJcblx0XHR9XHJcblxyXG5cdFx0dGhpcy5jYXJ0ID0gQ29va2llLmdldCh0aGlzLnNldHRpbmdzLmNvb2tpZV9uYW1lKTtcclxuXHJcblx0XHRsZXQgaTtcclxuXHRcdGxldCBhbHJlYWR5RmF2b3JpdGVkID0gZmFsc2U7XHJcblxyXG5cdFx0Zm9yIChpID0gMDsgaSA8IHRoaXMuY2FydC5mYXZvcml0ZXMubGVuZ3RoOyBpKyspIHtcclxuXHRcdFx0aWYgKHRoaXMuY2FydC5mYXZvcml0ZXNbaV0uaWQgPT0gaXRlbS5pZCkge1xyXG5cdFx0XHRcdGFscmVhZHlGYXZvcml0ZWQgPSB0cnVlO1xyXG5cdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKCEgYWxyZWFkeUZhdm9yaXRlZCkge1xyXG5cdFx0XHR0aGlzLmNhcnQuZmF2b3JpdGVzLnB1c2goaXRlbSk7XHJcblx0XHR9XHJcblxyXG5cdFx0Q29va2llLnNldCh0aGlzLnNldHRpbmdzLmNvb2tpZV9uYW1lLCB0aGlzLmNhcnQsIDIpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogUmVtb3ZlcyBhbiBpdGVtIGZyb20gdGhlIGNhcnQuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gb2JqZWN0IHwgaXRlbVxyXG5cdCAqIEByZXR1cm4gdm9pZFxyXG5cdCAqL1xyXG5cdHJlbW92ZUl0ZW0oaXRlbSlcclxuXHR7XHJcblx0XHRpZiAodHlwZW9mIGl0ZW0gIT0gJ29iamVjdCcpIHtcclxuXHRcdFx0dGhyb3cgbmV3IEludmFsaWRBcmd1bWVudEV4Y2VwdGlvbiQxKCdyZW1vdmVJdGVtKCkgZXhwZWN0IHRoZSBmaXJzdCBwYXJhbWV0ZXIgdG8gYmUgYW4gb2JqZWN0LCBidXQgJyArIHR5cGVvZiBpdGVtICsgJyB3YXMgcGFzc2VkIGluc3RlYWQnKTtcclxuXHRcdH1cclxuXHJcblx0XHRpZiAoISBpdGVtLmhhc093blByb3BlcnR5KCdpZCcpKSB7XHJcblx0XHRcdHRocm93IG5ldyBJbnZhbGlkQ2FydEl0ZW1FeGNlcHRpb247XHJcblx0XHR9XHJcblxyXG4gXHRcdHRoaXMuY2FydCA9IENvb2tpZS5nZXQodGhpcy5zZXR0aW5ncy5jb29raWVfbmFtZSk7XHJcblxyXG4gXHRcdGxldCBpO1xyXG5cclxuIFx0XHRmb3IgKGkgPSAwOyBpIDwgdGhpcy5jYXJ0Lml0ZW1zLmxlbmd0aDsgaSsrKSB7XHJcbiBcdFx0XHRpZiAodGhpcy5jYXJ0Lml0ZW1zW2ldLmlkID09IGl0ZW0uaWQpIHtcclxuIFx0XHRcdFx0dGhpcy5jYXJ0Lml0ZW1zLnNwbGljZShpLCAxKTtcclxuIFx0XHRcdFx0YnJlYWs7XHJcbiBcdFx0XHR9XHJcbiBcdFx0fVxyXG5cclxuIFx0XHRDb29raWUuc2V0KHRoaXMuc2V0dGluZ3MuY29va2llX25hbWUsIHRoaXMuY2FydCwgMik7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBBZGRzIHRoZSBpdGVtIHRvIHByZXZpZXcuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gYXJyYXkgfCBpdGVtc1xyXG5cdCAqIEByZXR1cm4gdm9pZFxyXG5cdCAqL1xyXG5cdGFkZFRvUHJldmlldyhpdGVtcylcclxuXHR7XHJcblx0XHRpdGVtc0Rpdi5pbm5lckhUTUwgPSAnJztcclxuXHJcblx0XHRsZXQgdGFibGUgPSBET00uY3JlYXRlRWxlbWVudCgndGFibGUnKTtcclxuXHJcblx0XHRET00uYWRkQ2xhc3ModGFibGUsICdwcmV2aWV3LXRhYmxlJyk7XHJcblxyXG5cdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCBpdGVtcy5sZW5ndGg7IGkrKykge1xyXG5cclxuXHRcdFx0bGV0IGF0dHJpYnV0ZXMgPSBpdGVtc1tpXTtcclxuXHJcblx0XHRcdGxldCB0ciA9IERPTS5jcmVhdGVFbGVtZW50KCd0cicsIHtcclxuXHRcdFx0XHRjbGFzczogJ2l0ZW0nXHJcblx0XHRcdH0pO1xyXG5cclxuXHRcdFx0Ly8gUXVhbnRpdHkgYWx3YXlzIGF0IHRoZSBzdGFydCBvZiBhbiBpdGVtLlxyXG5cdFx0XHRsZXQgdGQgPSBET00uY3JlYXRlRWxlbWVudCgndGQnKTtcclxuXHJcblx0XHRcdHRkLmlubmVySFRNTCA9IGF0dHJpYnV0ZXMucXVhbnRpdHkgKyd4JztcclxuXHRcdFx0dHIuYXBwZW5kQ2hpbGQodGQpO1xyXG5cdFx0XHRcclxuXHRcdFx0Zm9yKGxldCBhdHRyaWJ1dGUgaW4gYXR0cmlidXRlcykge1xyXG5cdFx0XHRcdHN3aXRjaChhdHRyaWJ1dGUpXHJcblx0XHRcdFx0e1xyXG5cdFx0XHRcdFx0Y2FzZSAnaW1hZ2UnOlxyXG5cdFx0XHRcdFx0XHR0ZCA9IERPTS5jcmVhdGVFbGVtZW50KCd0ZCcpO1xyXG5cdFx0XHRcdFx0XHRsZXQgaW1hZ2UgPSBET00uY3JlYXRlRWxlbWVudCgnaW1nJywge1xyXG5cdFx0XHRcdFx0XHRcdHNyYzogYXR0cmlidXRlc1thdHRyaWJ1dGVdLFxyXG5cdFx0XHRcdFx0XHRcdHdpZHRoOiAnNTBweCcsXHJcblx0XHRcdFx0XHRcdFx0aGVpZ2h0OiAnNTBweCdcclxuXHRcdFx0XHRcdFx0fSk7XHJcblxyXG5cdFx0XHRcdFx0XHR0ZC5hcHBlbmRDaGlsZChpbWFnZSk7XHJcblx0XHRcdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRcdFx0Y2FzZSAncHJpY2UnOlxyXG5cdFx0XHRcdFx0XHR0ZCA9IERPTS5jcmVhdGVFbGVtZW50KCd0ZCcpO1xyXG5cdFx0XHRcdFx0XHRsZXQgc3BhbiA9IERPTS5jcmVhdGVFbGVtZW50KCdzcGFuJywge1xyXG5cdFx0XHRcdFx0XHRcdGh0bWw6ICcmbmJzcCcgKyBhdHRyaWJ1dGVzW2F0dHJpYnV0ZV0uY3VycmVuY3lcclxuXHRcdFx0XHRcdFx0fSk7XHJcblx0XHRcdFx0XHRcdHRkLmlubmVySFRNTCA9IGF0dHJpYnV0ZXNbYXR0cmlidXRlXS5hbW91bnQ7XHJcblx0XHRcdFx0XHRcdHRkLmFwcGVuZENoaWxkKHNwYW4pO1xyXG5cdFx0XHRcdFx0XHRicmVhaztcclxuXHRcdFx0XHRcdGNhc2UgJ25hbWUnOlxyXG5cdFx0XHRcdFx0XHR0ZCA9IERPTS5jcmVhdGVFbGVtZW50KCd0ZCcpO1xyXG5cdFx0XHRcdFx0XHR0ZC5pbm5lckhUTUwgPSBhdHRyaWJ1dGVzW2F0dHJpYnV0ZV07XHJcblx0XHRcdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHJcblx0XHRcdFx0dHIuYXBwZW5kQ2hpbGQodGQpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHR0YWJsZS5hcHBlbmRDaGlsZCh0cik7XHJcblx0XHR9XHJcblxyXG5cdFx0Ly8gY3JlYXRlIGNoZWNrb3V0IGJ1dHRvbiBhdCB0aGUgYm90dG9tIG9mIHRoZSBwcmV2aWV3XHJcblx0XHRsZXQgdHIgPSBET00uY3JlYXRlRWxlbWVudCgndHInKTtcclxuXHRcdGxldCB0ZCA9IERPTS5jcmVhdGVFbGVtZW50KCd0ZCcsIHtcclxuXHRcdFx0Y29sc3BhbjogJzMnLFxyXG5cdFx0fSk7XHJcblxyXG5cdFx0bGV0IGNoZWNrb3V0ID0gRE9NLmNyZWF0ZUVsZW1lbnQoJ2EnLCB7XHJcblx0XHRcdGNsYXNzOiAnYnRuIGJ0bi1wcmltYXJ5JyxcclxuXHRcdFx0dGV4dDogJ0NoZWNrb3V0JyxcclxuXHRcdFx0aHJlZjogJy9jaGVja291dCdcclxuXHRcdH0pO1xyXG5cclxuXHJcblx0XHR0ZC5hcHBlbmRDaGlsZChjaGVja291dCk7XHJcblx0XHR0ci5hcHBlbmRDaGlsZCh0ZCk7XHJcblxyXG5cdFx0Ly8gY3JlYXRlIHRvdGFsIHN1bSBhdCB0aGUgYm90dG9tIG9mIHRoZSBwcmV2aWV3XHJcblx0XHR0ZCA9IERPTS5jcmVhdGVFbGVtZW50KCd0ZCcsIHtcclxuXHRcdFx0Y29sc3BhbjogJzEnLFxyXG5cdFx0fSk7XHJcblxyXG5cdFx0bGV0IHRvdGFsID0gRE9NLmNyZWF0ZUVsZW1lbnQoJ2RpdicsIHtcclxuXHRcdFx0Y2xhc3M6ICdjYXJ0LXRvdGFsJyxcclxuXHRcdFx0dGV4dDogdGhpcy50b3RhbCgpXHJcblx0XHR9KTtcclxuXHJcblx0XHR0ZC5hcHBlbmRDaGlsZCh0b3RhbCk7XHJcblx0XHR0ci5hcHBlbmRDaGlsZCh0ZCk7XHJcblxyXG5cdFx0dGFibGUuYXBwZW5kQ2hpbGQodHIpO1xyXG5cclxuXHRcdGl0ZW1zRGl2LmFwcGVuZENoaWxkKHRhYmxlKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIENhbGN1bGF0ZXMgdGhlIHRvdGFsIG9mIHRoZSBjYXJ0XHJcblx0ICogYW5kIHJldHJpZXZlIGl0LlxyXG5cdCAqXHJcblx0ICogQHJldHVybiBudW1iZXIgXHJcblx0ICovXHJcblx0dG90YWwoKVxyXG5cdHtcclxuIFx0XHR0aGlzLmNhcnQgPSBDb29raWUuZ2V0KHRoaXMuc2V0dGluZ3MuY29va2llX25hbWUpO1xyXG5cclxuIFx0XHR2YXIgdG90YWwgPSAwLjAwO1xyXG4gXHRcdGxldCBpO1xyXG5cclxuIFx0XHRmb3IgKGkgPSAwOyBpIDwgdGhpcy5jYXJ0Lml0ZW1zLmxlbmd0aDsgaSsrKSB7XHJcbiBcdFx0XHR0b3RhbCArPSBwYXJzZUZsb2F0KHRoaXMuY2FydC5pdGVtc1tpXS5wcmljZS5hbW91bnQpICogdGhpcy5jYXJ0Lml0ZW1zW2ldLnF1YW50aXR5O1xyXG4gXHRcdH1cclxuXHJcbiBcdFx0cmV0dXJuIHRvdGFsLnRvRml4ZWQoMik7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBCaW5kcyBldmVydGhpbmcgdG8gdGhlIGVsZW1lbnQuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gc3RyaW5nIHwgc2VsZWN0b3JcclxuXHQgKiBAcmV0dXJuIHZvaWRcclxuXHQgKi9cclxuXHRzZXRFbGVtZW50KHNlbGVjdG9yKVxyXG5cdHtcclxuXHRcdHRoaXMuZWxlbWVudCA9IERPTS5maW5kKHNlbGVjdG9yKTtcclxuXHJcblx0XHRpZiAodGhpcy5lbGVtZW50KSB7XHJcblx0XHRcdERPTS5hZGRDbGFzcyh0aGlzLmVsZW1lbnQsIHRoaXMuc2V0dGluZ3MuY2xhc3MpO1xyXG5cdFx0XHRET00uYWRkQ2xhc3ModGhpcy5lbGVtZW50LCB0aGlzLnNldHRpbmdzLnBsYWNlbWVudCk7XHJcblx0XHRcdHRoaXMuZWxlbWVudC5hcHBlbmRDaGlsZCh0aGlzLmljb24pO1xyXG5cdFx0XHR0aGlzLmVsZW1lbnQuYXBwZW5kQ2hpbGQodGhpcy5wcmV2aWV3RWxlbWVudCk7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBDcmVhdGVzIHRoZSBjYXJ0IGRldGFpbHMgcHJldmlldyBlbGVtZW50LlxyXG5cdCAqXHJcblx0ICogQHJldHVybiBIVE1MRGl2RWxlbWVudFxyXG5cdCAqL1xyXG5cdGNyZWF0ZVByZXZpZXdFbGVtZW50KClcclxuXHR7XHJcblx0XHRsZXQgcHJldmlld0VsZW1lbnQgPSBET00uY3JlYXRlRWxlbWVudCgnZGl2Jywge1xyXG5cdFx0XHRpZDogJ3ByZXZpZXcnXHJcblx0XHR9KTtcclxuXHJcblx0XHRpdGVtc0RpdiA9IERPTS5jcmVhdGVFbGVtZW50KCd1bCcsIHtcclxuXHRcdFx0XHRjbGFzczogJ2l0ZW1zJ1xyXG5cdFx0XHR9KTtcclxuXHJcblx0XHRwcmV2aWV3RWxlbWVudC5hcHBlbmRDaGlsZChpdGVtc0Rpdik7XHJcblxyXG5cdFx0cmV0dXJuIHByZXZpZXdFbGVtZW50O1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQWRkIHRoZSBlQ29tbWVyY2Ugc3R5bGUgdGFncyB0byB0aGUgRE9NLlxyXG5cdCAqXHJcblx0ICogQHJldHVybiB2b2lkXHJcblx0ICovXHJcblx0ZHJhdygpIFxyXG5cdHtcclxuXHRcdGlmIChET00uZmluZCgnI1R1cmJvLWVDb21tZXJjZS1DYXJ0JykpIHtcclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0fVxyXG5cclxuXHRcdGlmICh0aGlzLnNldHRpbmdzLm5vX2Nzcykge1xyXG5cdFx0XHRyZXR1cm47XHJcblx0XHR9XHJcblxyXG5cdFx0bGV0IHBvc2l0aW9uID0gKHRoaXMuc2V0dGluZ3MuZml4ZWQpID8gJ2ZpeGVkJyA6ICdhYnNvbHV0ZSc7XHJcblxyXG5cdFx0bGV0IGNzcyA9IGBcclxuXHRcdFx0JHt0aGlzLnNldHRpbmdzLmVsZW1lbnR9IHtcclxuXHRcdFx0XHRwb3NpdGlvbjogJHtwb3NpdGlvbn07XHJcblx0XHRcdFx0Y3Vyc29yOiBwb2ludGVyO1xyXG5cdFx0XHRcdGNvbG9yOiAjZmZmZmZmO1xyXG5cdFx0XHRcdHotaW5kZXg6IDk5ODtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0JHt0aGlzLnNldHRpbmdzLmVsZW1lbnR9IHN2ZyB7XHJcblx0XHRcdFx0d2lkdGg6ICR7dGhpcy5zZXR0aW5ncy53aWR0aH07XHJcblx0XHRcdFx0aGVpZ2h0OiAke3RoaXMuc2V0dGluZ3MuaGVpZ2h0fTtcclxuXHRcdFx0XHR0cmFuc2l0aW9uOiBmaWxsIDAuM3M7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdCR7dGhpcy5zZXR0aW5ncy5lbGVtZW50fSBzdmc6aG92ZXIge1xyXG5cdFx0XHRcdGZpbGw6ICR7dGhpcy5zZXR0aW5ncy5ob3Zlcl9jb2xvcn07XHJcblx0XHRcdFx0dHJhbnNpdGlvbjogZmlsbCAwLjNzO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHQke3RoaXMuc2V0dGluZ3MuZWxlbWVudH0udG9wLXJpZ2h0LFxyXG5cdFx0XHQke3RoaXMuc2V0dGluZ3MuZWxlbWVudH0ucmlnaHQtdG9wIHtcclxuXHRcdFx0XHRyaWdodDogMTBweDtcclxuXHRcdFx0XHR0b3A6IDEwcHg7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdCR7dGhpcy5zZXR0aW5ncy5lbGVtZW50fS5sZWZ0LXRvcCxcclxuXHRcdFx0JHt0aGlzLnNldHRpbmdzLmVsZW1lbnR9LnRvcC1sZWZ0IHtcclxuXHRcdFx0XHRsZWZ0OiAxMHB4O1xyXG5cdFx0XHRcdHRvcDogMTBweDtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0JHt0aGlzLnNldHRpbmdzLmVsZW1lbnR9ID4gI3ByZXZpZXcge1xyXG5cdFx0XHRcdHBvc2l0aW9uOiAke3Bvc2l0aW9ufTtcclxuXHRcdFx0XHR6LWluZGV4OiA5OTk5O1xyXG5cdFx0XHRcdHRvcDogY2FsYygxMHB4ICsgJHt0aGlzLnNldHRpbmdzLmhlaWdodH0pO1xyXG5cdFx0XHRcdHRyYW5zZm9ybTogdHJhbnNsYXRlWCg2MHB4KTtcclxuXHRcdFx0XHRoZWlnaHQ6IDQwMHB4O1xyXG5cdFx0XHRcdHdpZHRoOiAzMDBweDtcclxuXHRcdFx0XHRib3JkZXI6IDFweCBzb2xpZCAjZTRlNGU0O1xyXG5cdFx0XHRcdGJhY2tncm91bmQ6ICNmZmZmZmY7XHJcblx0XHRcdFx0dHJhbnNpdGlvbjogdHJhbnNmb3JtIDFzLCB2aXNpYmlsaXR5IDFzO1xyXG5cdFx0XHRcdGN1cnNvcjogZGVmYXVsdDtcclxuXHRcdFx0XHRvdmVyZmxvdy1ZOiBzY3JvbGw7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdCR7dGhpcy5zZXR0aW5ncy5lbGVtZW50fSA+ICNwcmV2aWV3Lm9wZW5lZCB7XHJcblx0XHRcdFx0dmlzaWJpbGl0eTogdmlzaWJsZTtcclxuXHRcdFx0XHR0cmFuc2Zvcm06IHRyYW5zbGF0ZVgoLTI0MHB4KTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0JHt0aGlzLnNldHRpbmdzLmVsZW1lbnR9ID4gI3ByZXZpZXcuY2xvc2VkIHtcclxuXHRcdFx0XHR2aXNpYmlsaXR5OiBoaWRkZW47XHJcblx0XHRcdFx0dHJhbnNmb3JtOiB0cmFuc2xhdGVYKDYwcHgpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHQke3RoaXMuc2V0dGluZ3MuZWxlbWVudH0gI3ByZXZpZXcgPiB1bC5pdGVtcyB7XHJcblx0XHRcdFx0cGFkZGluZzogMDtcclxuXHRcdFx0XHRjb2xvcjogIzAwMDAwMDtcclxuXHRcdFx0XHRsaXN0LXN0eWxlLXR5cGU6IG5vbmU7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdCR7dGhpcy5zZXR0aW5ncy5lbGVtZW50fSAjcHJldmlldyA+IHVsLml0ZW1zID4gLnByZXZpZXctdGFibGUge1xyXG5cdFx0XHRcdHdpZHRoOiAxMDAlO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHQke3RoaXMuc2V0dGluZ3MuZWxlbWVudH0gI3ByZXZpZXcgPiB1bC5pdGVtcyA+IC5wcmV2aWV3LXRhYmxlIHRkIHtcclxuXHRcdFx0XHRwYWRkaW5nOiA0cHg7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdCR7dGhpcy5zZXR0aW5ncy5lbGVtZW50fSAuaXRlbXMubG9hZGluZyB7XHJcblx0XHRcdFx0ZGlzcGxheTogbm9uZTtcclxuXHRcdFx0XHRvdmVyZmxvdy1ZOiBub25lO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHQke3RoaXMuc2V0dGluZ3MuZWxlbWVudH0gLmNhcnQtbG9hZGVyLW92ZXJsYXkge1xyXG5cdFx0XHRcdHBvc2l0aW9uOiBmaXhlZDtcclxuXHRcdFx0XHR0b3A6IDA7IFxyXG5cdFx0XHQgICAgbGVmdDogMDtcclxuXHRcdFx0ICAgIHJpZ2h0OiAwO1xyXG5cdFx0XHQgICAgYm90dG9tOiAwO1xyXG5cdFx0XHRcdGJhY2tncm91bmQ6ICNmZmZmZmY7XHJcblx0XHRcdFx0d2lkdGg6IDEwMCU7XHJcblx0XHRcdFx0aGVpZ2h0OiAxMDAlO1xyXG5cdFx0XHRcdG1pbi1oZWlnaHQ6IDEwMCU7XHJcblx0XHRcdFx0b3ZlcmZsb3c6IGF1dG87XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdCR7dGhpcy5zZXR0aW5ncy5lbGVtZW50fSAuY2FydC1sb2FkZXItb3ZlcmxheSAuY2FydC1sb2FkZXIge1xyXG5cdFx0XHRcdHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuXHRcdFx0XHR3aWR0aDogNTBweDtcclxuXHRcdFx0XHRoZWlnaHQ6IDUwcHg7XHJcblx0XHRcdFx0bWFyZ2luLWxlZnQ6IC0yNXB4O1xyXG5cdFx0XHRcdG1hcmdpbi10b3A6IC0yNXB4O1xyXG5cdFx0XHRcdGxlZnQ6IDUwJTtcclxuXHRcdFx0XHRyaWdodDogNTAlO1xyXG5cdFx0XHRcdHRvcDogNTAlO1xyXG5cdFx0XHRcdGJvdHRvbTogNTAlO1xyXG5cdFx0XHR9XHJcblx0XHRgO1xyXG5cdCAgICBcclxuXHQgICAgRE9NLmFkZFN0eWxlKCdUdXJiby1lQ29tbWVyY2UtQ2FydCcsIGNzcyk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBDcmVhdGVzIGFuIGxvYWRpbmcgb3ZlcmxheS5cclxuXHQgKlxyXG5cdCAqIEByZXR1cm4gSFRNTERpdkVsZW1lbnRcclxuXHQgKi9cclxuXHRsb2FkaW5nT3ZlcmxheSgpXHJcblx0e1xyXG5cdFx0aWYgKGxvYWRpbmdPdmVybGF5KSB7XHJcblx0XHRcdHJldHVybiBsb2FkaW5nT3ZlcmxheTtcclxuXHRcdH1cclxuXHJcblx0XHRsZXQgbG9hZGVyO1xyXG5cclxuXHRcdGlmICh0aGlzLnNldHRpbmdzLmxvYWRlcikge1xyXG5cdFx0XHRsb2FkZXIgPSBET00uY3JlYXRlRWxlbWVudCgnaW1nJywge1xyXG5cdFx0XHRcdHNyYzogdGhpcy5zZXR0aW5ncy5sb2FkZXIsXHJcblx0XHRcdFx0Y2xhc3M6ICdjYXJ0LWxvYWRlcidcclxuXHRcdFx0fSk7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRsb2FkZXIgPSBjcmVhdGVMb2FkZXIoKTtcclxuXHRcdH1cclxuXHJcblx0XHRsb2FkaW5nT3ZlcmxheSA9IERPTS5jcmVhdGVFbGVtZW50KCdkaXYnLCB7XHJcblx0XHRcdGNsYXNzOiAnY2FydC1sb2FkZXItb3ZlcmxheSdcclxuXHRcdH0pO1xyXG5cclxuXHRcdGxvYWRpbmdPdmVybGF5LmFwcGVuZENoaWxkKGxvYWRlcik7XHJcblxyXG5cdFx0cmV0dXJuIGxvYWRpbmdPdmVybGF5O1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogTG9hZGluZyB0aGUgY2FydCBwcmV2aWV3LlxyXG5cdCAqXHJcblx0ICogQHJldHVybiB2b2lkXHJcblx0ICovXHJcblx0cHJldmlld1N0YXJ0TG9hZGluZygpXHJcblx0e1xyXG5cdFx0RE9NLmFkZENsYXNzKGl0ZW1zRGl2LCAnbG9hZGluZycpO1xyXG5cdFx0dGhpcy5wcmV2aWV3RWxlbWVudC5hcHBlbmRDaGlsZCh0aGlzLmxvYWRpbmdPdmVybGF5KCkpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogTG9hZGluZyB0aGUgY2FydCBwcmV2aWV3LlxyXG5cdCAqXHJcblx0ICogQHJldHVybiB2b2lkXHJcblx0ICovXHJcblx0cHJldmlld1N0b3BMb2FkaW5nKClcclxuXHR7XHJcblx0XHRpZiAoRE9NLmZpbmQoJy5jYXJ0LWxvYWRlci1vdmVybGF5JywgdGhpcy5wcmV2aWV3RWxlbWVudCkpIHtcclxuXHRcdFx0dGhpcy5wcmV2aWV3RWxlbWVudC5yZW1vdmVDaGlsZCh0aGlzLmxvYWRpbmdPdmVybGF5KCkpO1xyXG5cdFx0XHRET00ucmVtb3ZlQ2xhc3MoaXRlbXNEaXYsICdsb2FkaW5nJyk7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBSZWxvYWRzIHRoZSBpdGVtcyBpbiB0aGUgY2FydCBwcmV2aWV3LlxyXG5cdCAqXHJcblx0ICogQHJldHVybiB2b2lkXHJcblx0ICovXHJcblx0cmVsb2FkQ2FydFByZXZpZXcoKVxyXG5cdHtcclxuXHRcdHRoaXMucHJldmlld1N0YXJ0TG9hZGluZygpO1xyXG5cdFx0bGV0IGl0ZW1zID0gdGhpcy5nZXRDYXJ0SXRlbXMoKTtcclxuXHRcdHRoaXMuYWRkVG9QcmV2aWV3KGl0ZW1zKTtcclxuXHRcdFxyXG5cdFx0bGV0IGluc3RhbmNlID0gdGhpcztcclxuXHJcblx0XHRzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRpbnN0YW5jZS5wcmV2aWV3U3RvcExvYWRpbmcuY2FsbChpbnN0YW5jZSk7XHJcblx0XHR9LCAxMDAwKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEJpbmRzIGV2ZW50IGxpc3RlbmVycyB0byB0aGUgY2FydCBpY29uLlxyXG5cdCAqXHJcblx0ICogQHJldHVybiB2b2lkXHJcblx0ICovXHJcblx0YmluZEV2ZW50TGlzdGVuZXJzKClcclxuXHR7XHJcblx0XHR0aGlzLmljb24ub25jbGljayA9IGZ1bmN0aW9uKGUpIHtcclxuXHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdFx0XHR0aGlzLnRvZ2dsZUNhcnRQcmV2aWV3KCk7XHJcblx0XHR9LmJpbmQodGhpcyk7XHJcblxyXG5cdFx0RXZlbnRNYW5hZ2VyJDIuc3Vic2NyaWJlKCdjYXJ0LnByb2R1Y3QuYWRkZWQnLCBmdW5jdGlvbihhdHRyaWJ1dGVzKSB7XHJcblx0XHRcdHRoaXMub3BlbkNhcnRQcmV2aWV3KCk7XHJcblx0XHRcdHRoaXMuYWRkSXRlbShhdHRyaWJ1dGVzKTtcclxuXHRcdFx0dGhpcy5yZWxvYWRDYXJ0UHJldmlldygpO1xyXG5cdFx0fS5iaW5kKHRoaXMpKTtcclxuXHJcblx0XHRFdmVudE1hbmFnZXIkMi5zdWJzY3JpYmUoJ2NhcnQucHJvZHVjdC5mYXZvcml0ZWQnLCBmdW5jdGlvbihhdHRyaWJ1dGVzKSB7XHJcblx0XHRcdHRoaXMuZmF2b3JpdGVJdGVtKGF0dHJpYnV0ZXMpO1xyXG5cdFx0fS5iaW5kKHRoaXMpKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIE9wZW5zIHRoZSBjYXJ0IHByZXZpZXcuXHJcblx0ICpcclxuXHQgKiBAcmV0dXJuIHZvaWQgXHJcblx0ICovXHJcblx0b3BlbkNhcnRQcmV2aWV3KClcclxuXHR7XHJcblx0XHRpZiAoRE9NLmhhc0NsYXNzKHRoaXMucHJldmlld0VsZW1lbnQsICdvcGVuZWQnKSkge1xyXG5cdFx0XHR0aGlzLnJlbG9hZENhcnRQcmV2aWV3KCk7XHJcblx0XHR9XHJcblxyXG5cdFx0RE9NLnN3aXRjaENsYXNzZXModGhpcy5wcmV2aWV3RWxlbWVudCwgJ2Nsb3NlZCcsICdvcGVuZWQnKTtcclxuXHRcdHRoaXMucmVsb2FkQ2FydFByZXZpZXcoKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFRvZ2dsZXMgdGhlIG9wZW5pbmcgY2xvc2luZyBvZiB0aGUgY2FydCBwcmV2aWV3LlxyXG5cdCAqXHJcblx0ICogQHJldHVybiB2b2lkIFxyXG5cdCAqL1xyXG5cdHRvZ2dsZUNhcnRQcmV2aWV3KClcclxuXHR7XHJcblx0XHRsZXQgb3BlbmluZyA9IERPTS50b2dnbGVDbGFzcyh0aGlzLnByZXZpZXdFbGVtZW50LCAnb3BlbmVkJywgJ2Nsb3NlZCcpO1xyXG5cdFx0XHRcclxuXHRcdGlmIChvcGVuaW5nKSB7XHJcblx0XHRcdHRoaXMucmVsb2FkQ2FydFByZXZpZXcoKTtcdFxyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogUmV0cmlldmUgdGhlIGNhcnRzIGl0ZW1zIGZyb20gdGhlIGNvb2tpZS5cclxuXHQgKlxyXG5cdCAqIEByZXR1cm4gb2JqZWN0XHJcblx0ICovXHJcblx0Z2V0Q2FydEl0ZW1zKClcclxuXHR7XHJcblx0XHRsZXQgY2FydCA9IENvb2tpZS5nZXQodGhpcy5zZXR0aW5ncy5jb29raWVfbmFtZSk7XHJcblxyXG5cdFx0cmV0dXJuIChjYXJ0KSA/IGNhcnQuaXRlbXMgOiBbXTtcclxuXHR9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBDbG9zZXMgdGhlIGNhcnQgcHJldmlldyBlbGVtZW50LlxyXG4gKlxyXG4gKiBAcGFyYW0gZXZlbnQuY2xpY2tcclxuICovXHJcbmZ1bmN0aW9uIGNsb3NlKGV2ZW50KSB7XHJcblx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuXHRET00uc3dpdGNoQ2xhc3Nlcyh0aGlzLnByZXZpZXdFbGVtZW50LCAnb3BlbmVkJywgJ2Nsb3NlZCcpO1xyXG59XHJcblxyXG4vKipcclxuICogQ3JlYXRlcyB0aGUgY2FydCBzdmcgaWNvbi5cclxuICpcclxuICogQHJldHVybiBTVkdTVkdFbGVtZW50XHJcbiAqL1xyXG5mdW5jdGlvbiBjcmVhdGVJY29uKCkge1xyXG5cdGxldCBzdmcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50TlMoXCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiLCBcInN2Z1wiKTtcclxuXHRsZXQgZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnROUyhcImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIsIFwiZ1wiKTtcclxuXHRsZXQgcGF0aCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnROUyhcImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIsIFwicGF0aFwiKTtcclxuXHJcblx0c3ZnLnNldEF0dHJpYnV0ZSgndmVyc2lvbicsICcxLjEnKTtcclxuXHRzdmcuc2V0QXR0cmlidXRlKCd4bWxucycsICdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZycpO1xyXG5cdHN2Zy5zZXRBdHRyaWJ1dGUoJ3htbG5zOnhsaW5rJywgJ2h0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsnKTtcclxuXHRzdmcuc2V0QXR0cmlidXRlKCd4JywgJzBweCcpO1xyXG5cdHN2Zy5zZXRBdHRyaWJ1dGUoJ3knLCAnMHB4Jyk7XHJcblx0c3ZnLnNldEF0dHJpYnV0ZSgnd2lkdGgnLCAnNDBweCcpO1xyXG5cdHN2Zy5zZXRBdHRyaWJ1dGUoJ2hlaWdodCcsICc0MHB4Jyk7XHJcblx0c3ZnLnNldEF0dHJpYnV0ZSgndmlld0JveCcsICcwIDAgNDQ2Ljg0MyA0NDYuODQzJyk7XHJcblx0c3ZnLnNldEF0dHJpYnV0ZSgnc3R5bGUnLCAnZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA0NDYuODQzIDQ0Ni44NDM7Jyk7XHJcblx0c3ZnLnNldEF0dHJpYnV0ZSgneG1sOnNwYWNlJywgJ3ByZXNlcnZlJyk7XHJcblxyXG5cdHBhdGguc2V0QXR0cmlidXRlKCdkJywgJ000NDQuMDksOTMuMTAzYy0yLjY5OC0zLjY5OS03LjAwNi01Ljg4OC0xMS41ODQtNS44ODhIMTA5LjkyYy0wLjYyNSwwLTEuMjQ5LDAuMDM4LTEuODUsMC4xMTlsLTEzLjI3Ni0zOC4yN2MtMS4zNzYtMy45NTgtNC40MDYtNy4xMTMtOC4zLTguNjQ2TDE5LjU4NiwxNC4xMzRjLTcuMzc0LTIuODg3LTE1LjY5NSwwLjczNS0xOC41OTEsOC4xYy0yLjg5MSw3LjM2OSwwLjczLDE1LjY5NSw4LjEsMTguNTkxbDYwLjc2OCwyMy44NzJsNzQuMzgxLDIxNC4zOTljLTMuMjgzLDEuMTQ0LTYuMDY1LDMuNjYzLTcuMzMyLDcuMTg3bC0yMS41MDYsNTkuNzM5Yy0xLjMxOCwzLjY2My0wLjc3NSw3LjczMywxLjQ2OCwxMC45MTZjMi4yNCwzLjE4Myw1Ljg4Myw1LjA3OCw5Ljc3Myw1LjA3OGgxMS4wNDRjLTYuODQ0LDcuNjE2LTExLjA0NCwxNy42NDYtMTEuMDQ0LDI4LjY3NWMwLDIzLjcxOCwxOS4yOTgsNDMuMDEyLDQzLjAxMiw0My4wMTJzNDMuMDEyLTE5LjI5NCw0My4wMTItNDMuMDEyYzAtMTEuMDI5LTQuMi0yMS4wNTktMTEuMDQ0LTI4LjY3NWg5My43NzZjLTYuODQ3LDcuNjE2LTExLjA0OCwxNy42NDYtMTEuMDQ4LDI4LjY3NWMwLDIzLjcxOCwxOS4yOTQsNDMuMDEyLDQzLjAxMyw0My4wMTJjMjMuNzE4LDAsNDMuMDEyLTE5LjI5NCw0My4wMTItNDMuMDEyYzAtMTEuMDI5LTQuMi0yMS4wNTktMTEuMDQzLTI4LjY3NWgxMy40MzNjNi41OTksMCwxMS45NDctNS4zNDksMTEuOTQ3LTExLjk0OGMwLTYuNTk5LTUuMzQ5LTExLjk0Ny0xMS45NDctMTEuOTQ3SDE0My42NDdsMTMuMzE5LTM2Ljk5NmMxLjcyLDAuNzI0LDMuNTc4LDEuMTUyLDUuNTIzLDEuMTUyaDIxMC4yNzhjNi4yMzQsMCwxMS43NTEtNC4wMjcsMTMuNjUtOS45NTlsNTkuNzM5LTE4Ni4zODdDNDQ3LjU1NywxMDEuNTY3LDQ0Ni43ODgsOTYuODAyLDQ0NC4wOSw5My4xMDN6IE0xNjkuNjU5LDQwOS44MDdjLTEwLjU0MywwLTE5LjExNi04LjU3My0xOS4xMTYtMTkuMTE2czguNTczLTE5LjExNywxOS4xMTYtMTkuMTE3czE5LjExNiw4LjU3NCwxOS4xMTYsMTkuMTE3UzE4MC4yMDIsNDA5LjgwNywxNjkuNjU5LDQwOS44MDd6IE0zMjcuMzY3LDQwOS44MDdjLTEwLjU0MywwLTE5LjExNy04LjU3My0xOS4xMTctMTkuMTE2czguNTc0LTE5LjExNywxOS4xMTctMTkuMTE3YzEwLjU0MiwwLDE5LjExNiw4LjU3NCwxOS4xMTYsMTkuMTE3UzMzNy45MDksNDA5LjgwNywzMjcuMzY3LDQwOS44MDd6IE00MDIuNTIsMTQ4LjE0OWgtNzMuMTYxVjExNS44OWg4My40OTlMNDAyLjUyLDE0OC4xNDl6IE0zODEuNDUzLDIxMy44NjFoLTUyLjA5NHYtMzcuMDM4aDYzLjk2N0wzODEuNDUzLDIxMy44NjF6IE0yMzQuNTcxLDIxMy44NjF2LTM3LjAzOGg2Ni4xMTN2MzcuMDM4SDIzNC41NzF6IE0zMDAuNjg0LDI0Mi41Mzh2MzEuMDY0aC02Ni4xMTN2LTMxLjA2NEgzMDAuNjg0eiBNMTM5LjExNSwxNzYuODIzaDY2Ljc4NHYzNy4wMzhoLTUzLjkzM0wxMzkuMTE1LDE3Ni44MjN6IE0yMzQuNTcxLDE0OC4xNDlWMTE1Ljg5aDY2LjExM3YzMi4yNTlIMjM0LjU3MXogTTIwNS44OTgsMTE1Ljg5djMyLjI1OWgtNzYuNzM0bC0xMS4xOTEtMzIuMjU5SDIwNS44OTh6IE0xNjEuOTE2LDI0Mi41MzhoNDMuOTgydjMxLjA2NGgtMzMuMjA2TDE2MS45MTYsMjQyLjUzOHogTTMyOS4zNTksMjczLjYwM3YtMzEuMDY0aDQyLjkwOWwtOS45NTUsMzEuMDY0SDMyOS4zNTl6Jyk7XHJcblxyXG5cdGcuYXBwZW5kQ2hpbGQocGF0aCk7XHJcblx0c3ZnLmFwcGVuZENoaWxkKGcpO1xyXG5cclxuXHRsZXQgIGRpdiA9IERPTS5jcmVhdGVFbGVtZW50KCdkaXYnLCB7XHJcblx0XHRpZDogJ2NhcnRJY29uJyxcclxuXHR9KTtcclxuXHJcblx0ZGl2LmFwcGVuZENoaWxkKHN2Zyk7XHJcblxyXG5cdHJldHVybiBkaXY7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBDcmVhdGVzIHRoZSBjYXJ0IGxvYWRlciBpY29uLlxyXG4gKlxyXG4gKiBAcmV0dXJuIFNWR1NWR0VsZW1lbnRcclxuICovXHJcbmZ1bmN0aW9uIGNyZWF0ZUxvYWRlcigpIHtcclxuXHRsZXQgc3ZnID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKFwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiwgXCJzdmdcIik7XHJcblx0bGV0IGNvdW50ID0gMTI7XHJcblx0bGV0IGdyb3VwcyA9IFtdO1xyXG5cdGxldCByZWN0YW5nZWxzID0gW107XHJcblx0bGV0IGFuaW1hdGlvbnMgPSBbXTtcclxuXHJcblx0c3ZnLnNldEF0dHJpYnV0ZSgnY2xhc3MnLCAnbGRzLXNwaW5uZXInKTtcclxuXHRzdmcuc2V0QXR0cmlidXRlKCd3aWR0aCcsICcyMDBweCcpO1xyXG5cdHN2Zy5zZXRBdHRyaWJ1dGUoJ2hlaWdodCcsICcyMDBweCcpO1xyXG5cdHN2Zy5zZXRBdHRyaWJ1dGUoJ3htbG5zJywgJ2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJyk7XHJcblx0c3ZnLnNldEF0dHJpYnV0ZSgneG1sbnM6eGxpbmsnLCAnaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluaycpO1xyXG5cdHN2Zy5zZXRBdHRyaWJ1dGUoJ3ZpZXdCb3gnLCAnMCAwIDEwMCAxMDAnKTtcclxuXHRzdmcuc2V0QXR0cmlidXRlKCdwcmVzZXJ2ZUFzcGVjdFJhdGlvJywgJ3hNaWRZTWlkJyk7XHJcblx0c3ZnLnNldEF0dHJpYnV0ZSgnc3R5bGUnLCAnYmFja2dyb3VuZDogbm9uZTsnKTtcclxuXHRcclxuXHR2YXIgcm90YXRpb24gPSAwO1xyXG5cclxuXHRmb3IgKHZhciBpID0gMDsgaSA8IGNvdW50OyBpKyspIHtcclxuXHRcdGxldCBncm91cCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnROUyhcImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIsIFwiZ1wiKTtcclxuXHRcdGdyb3VwLnNldEF0dHJpYnV0ZSgndHJhbnNmb3JtJywgJ3JvdGF0ZSgnICsgcm90YXRpb24gKyAnIDUwIDUwKScpO1xyXG5cdFx0cm90YXRpb24gKz0gMzA7XHJcblx0XHRncm91cHMucHVzaChncm91cCk7XHJcblx0fVxyXG5cclxuXHRmb3IgKHZhciBpID0gMDsgaSA8IGNvdW50OyBpKyspIHtcclxuXHRcdGxldCByZWN0YW5nZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50TlMoXCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiLCBcInJlY3RcIik7XHJcblx0XHRyZWN0YW5nZWwuc2V0QXR0cmlidXRlKCd4JywgJzQ3Jyk7XHJcblx0XHRyZWN0YW5nZWwuc2V0QXR0cmlidXRlKCd5JywgJzI0Jyk7XHJcblx0XHRyZWN0YW5nZWwuc2V0QXR0cmlidXRlKCdyeCcsICc5LjQnKTtcclxuXHRcdHJlY3RhbmdlbC5zZXRBdHRyaWJ1dGUoJ3J5JywgJzQuOCcpO1xyXG5cdFx0cmVjdGFuZ2VsLnNldEF0dHJpYnV0ZSgnd2lkdGgnLCAnNicpO1xyXG5cdFx0cmVjdGFuZ2VsLnNldEF0dHJpYnV0ZSgnaGVpZ2h0JywgJzEyJyk7XHJcblx0XHRyZWN0YW5nZWwuc2V0QXR0cmlidXRlKCdmaWxsJywgJyM0NjU4YWMnKTtcclxuXHRcdHJlY3RhbmdlbHMucHVzaChyZWN0YW5nZWwpO1xyXG5cdH1cclxuXHJcblx0dmFyIGJlZ2luID0gMC4wOSAqIDExO1xyXG5cclxuXHRmb3IgKHZhciBpID0gMDsgaSA8IGNvdW50OyBpKyspIHtcclxuXHRcdGxldCBhbmltYXRlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKFwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiwgXCJhbmltYXRlXCIpO1xyXG5cdFx0YW5pbWF0ZS5zZXRBdHRyaWJ1dGUoJ2F0dHJpYnV0ZU5hbWUnLCAnb3BhY2l0eScpO1xyXG5cdFx0YW5pbWF0ZS5zZXRBdHRyaWJ1dGUoJ3ZhbHVlcycsICcxOzAnKTtcclxuXHRcdGFuaW1hdGUuc2V0QXR0cmlidXRlKCd0aW1lcycsICcwOzEnKTtcclxuXHRcdGFuaW1hdGUuc2V0QXR0cmlidXRlKCdkdXInLCAnMXMnKTtcclxuXHRcdGFuaW1hdGUuc2V0QXR0cmlidXRlKCdiZWdpbicsIGJlZ2luLnRvRml4ZWQoOCkgKyAncycpO1xyXG5cdFx0YW5pbWF0ZS5zZXRBdHRyaWJ1dGUoJ3JlcGVhdENvdW50JywgJ2luZGVmaW5pdGUnKTtcclxuXHRcdGFuaW1hdGlvbnMucHVzaChhbmltYXRlKTtcclxuXHRcdGJlZ2luIC09IDAuMDk7XHJcblx0fVxyXG5cclxuXHRmb3IgKHZhciBpID0gMDsgaSA8IGdyb3Vwcy5sZW5ndGg7IGkrKykge1xyXG5cdFx0bGV0IGdyb3VwID0gZ3JvdXBzW2ldO1x0XHRcclxuXHRcdGxldCByZWN0YW5nZWwgPSByZWN0YW5nZWxzW2ldO1xyXG5cdFx0bGV0IGFuaW1hdGUgPSBhbmltYXRpb25zW2ldO1xyXG5cdFx0cmVjdGFuZ2VsLmFwcGVuZENoaWxkKGFuaW1hdGUpO1xyXG5cdFx0Z3JvdXAuYXBwZW5kQ2hpbGQocmVjdGFuZ2VsKTtcclxuXHRcdHN2Zy5hcHBlbmRDaGlsZChncm91cCk7XHJcblx0fVxyXG5cclxuXHRET00uYWRkQ2xhc3Moc3ZnLCAnY2FydC1sb2FkZXInKTtcclxuXHJcblx0cmV0dXJuIHN2ZztcdFxyXG59XG5cbi8vIEhlbHBlcnNcclxuLy8gQ29tcG9uZW50c1xyXG4vLyBFeGNlcHRpb25zXHJcbi8qKlxyXG4gKiBUaGUgZGVmYXVsdCBzZXR0aW5ncyBvZiB0aGUgZmlsdGVyLlxyXG4gKi9cclxubGV0IGRlZmF1bHRTZXR0aW5ncyQyID0ge1xyXG5cdGVsZW1lbnQ6ICcuZmlsdGVyJyxcclxuXHRjbGFzczogJycsXHJcblx0d2lkdGg6ICcnLFxyXG5cdGhlaWdodDogJycsXHJcblx0bm9fY3NzOiBmYWxzZSxcclxufTtcclxuXHJcbi8qKlxyXG4gKiBTdG9yZXMgdGhlIGNvbnRhaW5lciBvYmplY3QuXHJcbiAqXHJcbiAqIEB2YXIgXFxDb3JlXFxDb250YWluZXJcclxuICovXHJcbmxldCBDb250YWluZXIkMTtcclxuXHJcbi8qKlxyXG4gKiBAY2xhc3MgRmlsdGVyXHJcbiAqXHJcbiAqIFRoZSBGaWx0ZXIgT2JqZWN0LCBoYW5kbGVzIHRoZSBmaWx0ZXIgb2YgdGhlIHByb2R1Y3RzL3NlcnZpY2VzLlxyXG4gKi9cclxuXHJcbmNsYXNzIEZpbHRlciBleHRlbmRzIEJhc2VDb21wb25lbnRcclxue1xyXG5cdC8qKlxyXG5cdCAqIC0gSW5pdGlhbGl6ZSB0aGUgSW9DIGNvbnRhaW5lci5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSBcXENvcmVcXENvbnRhaW5lciB8IGNvbnRhaW5lclxyXG5cdCAqIEByZXR1cm4gdm9pZFxyXG5cdCAqL1xyXG5cdGNvbnN0cnVjdG9yKGNvbnRhaW5lcikgXHJcblx0e1xyXG5cdFx0c3VwZXIoKTtcclxuXHJcblx0XHRDb250YWluZXIkMSA9IGNvbnRhaW5lcjtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFNldHVwIHRoZSBmaWx0ZXIgY2xhc3MuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gb2JqZWN0IHwgc2V0dGluZ3NcclxuXHQgKiBAcmV0dXJuIHZvaWRcclxuXHQgKi9cclxuXHRzZXR1cChzZXR0aW5ncylcclxuXHR7XHJcblx0XHRpZih0eXBlb2Ygc2V0dGluZ3MgIT0gJ29iamVjdCcpIHtcclxuXHRcdFx0dGhyb3cgbmV3IEludmFsaWRBcmd1bWVudEV4Y2VwdGlvbiQxO1xyXG5cdFx0fVxyXG5cclxuXHRcdHRoaXMuc2V0dGluZ3MgPSBDb21tb24uZXh0ZW5kKGRlZmF1bHRTZXR0aW5ncyQyLCBzZXR0aW5ncyk7XHJcblxyXG5cdFx0ZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsIGZ1bmN0aW9uKCkge1xyXG5cclxuXHRcdFx0dGhpcy5zZXRFbGVtZW50KHRoaXMuc2V0dGluZ3MuZWxlbWVudCk7XHJcblxyXG5cdFx0XHR0aGlzLmRyYXcoKTtcdFxyXG5cdFx0fS5iaW5kKHRoaXMpKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFNldHMgdGhlIGVsZW1lbnQgdG8gYmUgYm91bmQgdG8uXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gc3RyaW5nIHwgc2VsZWN0b3JcclxuXHQgKiBAcmV0dXJuIHZvaWRcclxuXHQgKi9cclxuXHRzZXRFbGVtZW50KHNlbGVjdG9yKVxyXG5cdHtcclxuXHRcdHRoaXMuZWxlbWVudCA9IERPTS5maW5kKHNlbGVjdG9yKTtcclxuXHRcdFxyXG5cdFx0RE9NLmFkZENsYXNzKHRoaXMuZWxlbWVudCwgdGhpcy5zZXR0aW5ncy5jbGFzcyk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBBZGQgdGhlIGVDb21tZXJjZSBzdHlsZSB0YWdzIHRvIHRoZSBET00uXHJcblx0ICovXHJcblx0ZHJhdygpIFxyXG5cdHtcclxuXHRcdGlmIChET00uZmluZCgnI1R1cmJvLWVDb21tZXJjZS1GaWx0ZXInKSkge1xyXG5cdFx0XHRyZXR1cm47XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKHRoaXMuc2V0dGluZ3Mubm9fY3NzKSB7XHJcblx0XHRcdHJldHVybjtcclxuXHRcdH1cclxuXHJcblx0XHRsZXQgd2lkdGggPSAodGhpcy5zZXR0aW5ncy53aWR0aCkgPyAnd2lkdGg6JyArIHRoaXMuc2V0dGluZ3Mud2lkdGggKyAnOycgOiAnJztcclxuXHRcdGxldCBtaW5XaWR0aCA9IHRoaXMuc2V0dGluZ3MubWluX3dpZHRoIHx8ICcyMDBweCc7XHJcblx0XHRsZXQgaGVpZ2h0ID0gdGhpcy5zZXR0aW5ncy5oZWlnaHQgfHwgJ2F1dG8nO1xyXG5cclxuXHRcdGxldCBjc3MgPSBgXHJcblx0XHRcdCR7dGhpcy5zZXR0aW5ncy5lbGVtZW50fSB7XHJcblx0XHRcdFx0cG9zaXRpb246IHJlbGF0aXZlO1xyXG5cdFx0XHRcdG1hcmdpbjogNXB4IDVweDtcclxuXHRcdFx0XHRib3JkZXI6IDFweCBzb2xpZCAjZTRlNGU0O1xyXG5cdFx0XHRcdCR7d2lkdGh9XHJcblx0XHRcdFx0bWluLXdpZHRoOiAke21pbldpZHRofTtcclxuXHRcdFx0XHRoZWlnaHQ6ICR7aGVpZ2h0fTtcclxuXHRcdFx0XHRtaW4taGVpZ2h0OiAyMDBweDtcclxuXHRcdFx0XHRjb2xvcjogI2ZmZmZmZjtcclxuXHRcdFx0XHRvdmVyZmxvdzogaGlkZGVuO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0YDtcclxuXHQgICAgXHJcblx0ICAgIERPTS5hZGRTdHlsZSgnVHVyYm8tZUNvbW1lcmNlLUZpbHRlcicsIGNzcyk7XHJcblx0fVxyXG59XG5cbi8vIEhlbHBlcnNcclxuLy8gQ29tcG9uZW50c1xyXG4vLyBFeGNlcHRpb25zXHJcbi8qKlxyXG4gKiBUaGUgZGVmYXVsdCBzZXR0aW5ncyBvZiB0aGUgY2FydC5cclxuICpcclxuICogQHZhciBvYmplY3RcclxuICovXHJcbmxldCBkZWZhdWx0U2V0dGluZ3MkMyA9IHtcclxuXHRlbGVtZW50OiAnLmRldGFpbHMnLFxyXG5cdG5vX2NzczogZmFsc2UsXHJcbn07XHJcblxyXG4vKipcclxuICogU3RvcmVzIHRoZSBjb250YWluZXIgb2JqZWN0LlxyXG4gKlxyXG4gKiBAdmFyIFxcQ29yZVxcQ29udGFpbmVyXHJcbiAqL1xyXG5sZXQgQ29udGFpbmVyJDI7XHJcblxyXG4vKipcclxuICogU3RvcmVzIHRoZSBldmVudCBtYW5hZ2VyIG9iamVjdC5cclxuICpcclxuICogQHZhciBcXENvcmVcXEV2ZW50TWFuYWdlclxyXG4gKi9cclxubGV0IEV2ZW50TWFuYWdlciQzO1xyXG5cclxuLyoqXHJcbiAqIFN0b3JlcyB0aGUgcmVxdWVzdCBvYmplY3QuXHJcbiAqXHJcbiAqIEB2YXIgXFxIZWxwZXJzXFxSZXF1ZXN0XHJcbiAqL1xyXG5sZXQgSHR0cCQxO1xyXG5cclxuLyoqXHJcbiAqIEBjbGFzcyBDaGVja291dFxyXG4gKlxyXG4gKiBIYW5kbGVzIHRoZSBjaGVja291dCBwcm9jZXNzLlxyXG4gKiBwYXltZW50cyB2YWxpZGF0aW9uLCBjYXJ0IHZhbGlkYXRpb24gZXRjLi5cclxuICovXHJcblxyXG5jbGFzcyBEZXRhaWxzIGV4dGVuZHMgQmFzZUNvbXBvbmVudFxyXG57XHJcblx0LyoqXHJcblx0ICogLSBJbml0aWFsaXplIHRoZSBJb0MgY29udGFpbmVyXHJcblx0ICogLSBJbml0aWFsaXplIHRoZSBSZXF1ZXN0XHJcblx0ICogLSBJbml0aWFsaXplIHRoZSBFdmVudE1hbmFnZXJcclxuXHQgKiAtIExpc3RlbiB0byBjaGVja291dCBldmVudC5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSBcXENvcmVcXENvbnRhaW5lciB8IGNvbnRhaW5lclxyXG5cdCAqIEBwYXJhbSBcXEhlbHBlcnNcXFJlcXVlc3QgfCBodHRwXHJcblx0ICogQHBhcmFtIFxcQ29yZVxcRXZlbnRNYW5hZ2VyIHwgZXZlbnRNYW5hZ2VyXHJcblx0ICogQHJldHVybiB2b2lkXHJcblx0ICovXHJcblx0Y29uc3RydWN0b3IoY29udGFpbmVyLCBodHRwLCBldmVudE1hbmFnZXIpIFxyXG5cdHtcclxuXHRcdHN1cGVyKCk7XHJcblxyXG5cdFx0Q29udGFpbmVyJDIgPSBjb250YWluZXI7XHJcblx0XHRIdHRwJDEgPSBodHRwO1xyXG5cdFx0RXZlbnRNYW5hZ2VyJDMgPSBldmVudE1hbmFnZXI7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBTZXRzIHRoZSBvYmplY3QgYnkgdGhlIHVzZXJzIHNldHRpbmcuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gb2JqZWN0IHwgc2V0dGluZ3NcclxuXHQgKiBAcmV0dXJuIHZvaWRcclxuXHQgKi9cclxuXHRzZXR1cChzZXR0aW5ncylcclxuXHR7XHJcblx0XHRpZiAodHlwZW9mIHNldHRpbmdzICE9ICdvYmplY3QnKSB7XHJcblx0XHRcdHRocm93IG5ldyBJbnZhbGlkQXJndW1lbnRFeGNlcHRpb24kMTtcclxuXHRcdH1cclxuXHJcblx0XHR0aGlzLnNldHRpbmdzID0gQ29tbW9uLmV4dGVuZChkZWZhdWx0U2V0dGluZ3MkMywgc2V0dGluZ3MpO1xyXG5cclxuXHRcdGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCBmdW5jdGlvbigpIHtcclxuXHJcblx0XHRcdHRoaXMuc2V0RWxlbWVudCh0aGlzLnNldHRpbmdzLmVsZW1lbnQpO1xyXG5cdFx0XHR0aGlzLmhpZGUoKTtcclxuXHRcdFx0dGhpcy5kcmF3KCk7XHJcblx0XHR9LmJpbmQodGhpcykpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQmluZHMgZXZlcnRoaW5nIHRvIHRoZSBlbGVtZW50LlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIHN0cmluZyB8IHNlbGVjdG9yXHJcblx0ICogQHJldHVybiB2b2lkXHJcblx0ICovXHJcblx0c2V0RWxlbWVudChzZWxlY3RvcilcclxuXHR7XHJcblx0XHR0aGlzLmVsZW1lbnQgPSBET00uZmluZChzZWxlY3Rvcik7XHJcblxyXG5cdFx0aWYgKHRoaXMuZWxlbWVudCkge1xyXG5cdFx0XHRET00uYWRkQ2xhc3ModGhpcy5lbGVtZW50LCB0aGlzLnNldHRpbmdzLmNsYXNzKTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIENoYW5nZXMgdGhlIHVybCB0byBiZSBjaGVja291dFxyXG5cdCAqXHJcblx0ICogQHJldHVybiB2b2lkIFxyXG5cdCAqL1xyXG5cdGNoYW5nZVVybCgpXHJcblx0e1xyXG5cdFx0VXJsLmNoYW5nZSgnY2hlY2tvdXQnKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEFkZCB0aGUgZUNvbW1lcmNlIHN0eWxlIHRhZ3MgdG8gdGhlIERPTS5cclxuXHQgKlxyXG5cdCAqIEByZXR1cm4gdm9pZFxyXG5cdCAqL1xyXG5cdGRyYXcoKSBcclxuXHR7XHJcblx0XHRpZiAoRE9NLmZpbmQoJyNUdXJiby1lQ29tbWVyY2UtRGV0YWlscycpKSB7XHJcblx0XHRcdHJldHVybjtcclxuXHRcdH1cclxuXHJcblx0XHRpZiAodGhpcy5zZXR0aW5ncy5ub19jc3MpIHtcclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0fVxyXG5cclxuXHRcdGxldCBwb3NpdGlvbiA9ICh0aGlzLnNldHRpbmdzLmZpeGVkKSA/ICdmaXhlZCcgOiAnYWJzb2x1dGUnO1xyXG5cclxuXHRcdGxldCBjc3MgPSBgXHJcblx0XHRcdCR7dGhpcy5zZXR0aW5ncy5lbGVtZW50fSB7XHJcblx0XHRcdFx0d2lkdGg6IDEwMCU7XHJcblx0XHRcdFx0bWluLWhlaWdodDogNDAwcHg7XHJcblx0XHRcdFx0Ym9yZGVyOiAxcHggc29saWQgI2U0ZTRlNDtcclxuXHRcdFx0fVxyXG5cdFx0YDtcclxuXHQgICAgXHJcblx0ICAgIERPTS5hZGRTdHlsZSgnVHVyYm8tZUNvbW1lcmNlLURldGFpbHMnLCBjc3MpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogSGlkZXMgYWxsIGlycmVsZXZhbnQgZWxlbWVudHMgZnJvbSB0aGUgRE9NLlxyXG5cdCAqXHJcblx0ICogQHJldHVybiB2b2lkIFxyXG5cdCAqL1xyXG5cdGhpZGVBbGwoKVxyXG5cdHtcdFxyXG5cdFx0Q29udGFpbmVyJDIuQ29tcG9uZW50cy5ib290ZWQuZm9yRWFjaChmdW5jdGlvbihjb21wb25lbnQpIHtcclxuXHRcdFx0aWYgKGNvbXBvbmVudC5jb25zdHJ1Y3Rvci5uYW1lICE9ICdEZXRhaWxzJykge1xyXG5cdFx0XHRcdGNvbXBvbmVudC5oaWRlKCk7XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cdH1cclxufVxuXG4vLyBIZWxwZXJzXHJcbi8vIENvbXBvbmVudHNcclxuLy8gRXhjZXB0aW9uc1xyXG4vKipcclxuICogVGhlIGRlZmF1bHQgc2V0dGluZ3Mgb2YgdGhlIGNhcnQuXHJcbiAqXHJcbiAqIEB2YXIgb2JqZWN0XHJcbiAqL1xyXG5sZXQgZGVmYXVsdFNldHRpbmdzJDQgPSB7XHJcblx0ZWxlbWVudDogJy5jaGVja291dCcsXHJcblx0bm9fY3NzOiBmYWxzZSxcclxufTtcclxuXHJcbi8qKlxyXG4gKiBTdG9yZXMgdGhlIGNvbnRhaW5lciBvYmplY3QuXHJcbiAqXHJcbiAqIEB2YXIgXFxDb3JlXFxDb250YWluZXJcclxuICovXHJcbmxldCBDb250YWluZXIkMztcclxuXHJcbi8qKlxyXG4gKiBTdG9yZXMgdGhlIGV2ZW50IG1hbmFnZXIgb2JqZWN0LlxyXG4gKlxyXG4gKiBAdmFyIFxcQ29yZVxcRXZlbnRNYW5hZ2VyXHJcbiAqL1xyXG5sZXQgRXZlbnRNYW5hZ2VyJDQ7XHJcblxyXG4vKipcclxuICogU3RvcmVzIHRoZSByZXF1ZXN0IG9iamVjdC5cclxuICpcclxuICogQHZhciBcXEhlbHBlcnNcXFJlcXVlc3RcclxuICovXHJcbmxldCBIdHRwJDI7XHJcblxyXG4vKipcclxuICogQGNsYXNzIENoZWNrb3V0XHJcbiAqXHJcbiAqIEhhbmRsZXMgdGhlIGNoZWNrb3V0IHByb2Nlc3MuXHJcbiAqIHBheW1lbnRzIHZhbGlkYXRpb24sIGNhcnQgdmFsaWRhdGlvbiBldGMuLlxyXG4gKi9cclxuXHJcbmNsYXNzIENoZWNrb3V0IGV4dGVuZHMgQmFzZUNvbXBvbmVudFxyXG57XHJcblx0LyoqXHJcblx0ICogLSBJbml0aWFsaXplIHRoZSBJb0MgY29udGFpbmVyXHJcblx0ICogLSBJbml0aWFsaXplIHRoZSBSZXF1ZXN0XHJcblx0ICogLSBJbml0aWFsaXplIHRoZSBFdmVudE1hbmFnZXJcclxuXHQgKiAtIExpc3RlbiB0byBjaGVja291dCBldmVudC5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSBcXENvcmVcXENvbnRhaW5lciB8IGNvbnRhaW5lclxyXG5cdCAqIEBwYXJhbSBcXEhlbHBlcnNcXFJlcXVlc3QgfCBodHRwXHJcblx0ICogQHBhcmFtIFxcQ29yZVxcRXZlbnRNYW5hZ2VyIHwgZXZlbnRNYW5hZ2VyXHJcblx0ICogQHJldHVybiB2b2lkXHJcblx0ICovXHJcblx0Y29uc3RydWN0b3IoY29udGFpbmVyLCBodHRwLCBldmVudE1hbmFnZXIpIFxyXG5cdHtcclxuXHRcdHN1cGVyKCk7XHJcblxyXG5cdFx0Q29udGFpbmVyJDMgPSBjb250YWluZXI7XHJcblx0XHRIdHRwJDIgPSBodHRwO1xyXG5cdFx0RXZlbnRNYW5hZ2VyJDQgPSBldmVudE1hbmFnZXI7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBTZXRzIHRoZSBvYmplY3QgYnkgdGhlIHVzZXJzIHNldHRpbmcuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gb2JqZWN0IHwgc2V0dGluZ3NcclxuXHQgKiBAcmV0dXJuIHZvaWRcclxuXHQgKi9cclxuXHRzZXR1cChzZXR0aW5ncylcclxuXHR7XHJcblx0XHRpZiAodHlwZW9mIHNldHRpbmdzICE9ICdvYmplY3QnKSB7XHJcblx0XHRcdHRocm93IG5ldyBJbnZhbGlkQXJndW1lbnRFeGNlcHRpb24kMTtcclxuXHRcdH1cclxuXHJcblx0XHR0aGlzLnNldHRpbmdzID0gQ29tbW9uLmV4dGVuZChkZWZhdWx0U2V0dGluZ3MkNCwgc2V0dGluZ3MpO1xyXG5cclxuXHRcdGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCBmdW5jdGlvbigpIHtcclxuXHJcblx0XHRcdHRoaXMuc2V0RWxlbWVudCh0aGlzLnNldHRpbmdzLmVsZW1lbnQpO1xyXG5cdFx0XHR0aGlzLmhpZGUoKTtcclxuXHRcdFx0dGhpcy5kcmF3KCk7XHJcblx0XHR9LmJpbmQodGhpcykpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQmluZHMgZXZlcnRoaW5nIHRvIHRoZSBlbGVtZW50LlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIHN0cmluZyB8IHNlbGVjdG9yXHJcblx0ICogQHJldHVybiB2b2lkXHJcblx0ICovXHJcblx0c2V0RWxlbWVudChzZWxlY3RvcilcclxuXHR7XHJcblx0XHR0aGlzLmVsZW1lbnQgPSBET00uZmluZChzZWxlY3Rvcik7XHJcblxyXG5cdFx0aWYgKHRoaXMuZWxlbWVudCkge1xyXG5cdFx0XHRET00uYWRkQ2xhc3ModGhpcy5lbGVtZW50LCB0aGlzLnNldHRpbmdzLmNsYXNzKTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIENoYW5nZXMgdGhlIHVybCB0byBiZSBjaGVja291dFxyXG5cdCAqXHJcblx0ICogQHJldHVybiB2b2lkIFxyXG5cdCAqL1xyXG5cdGNoYW5nZVVybCgpXHJcblx0e1xyXG5cdFx0VXJsLmNoYW5nZSgnY2hlY2tvdXQnKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEFkZCB0aGUgZUNvbW1lcmNlIHN0eWxlIHRhZ3MgdG8gdGhlIERPTS5cclxuXHQgKlxyXG5cdCAqIEByZXR1cm4gdm9pZFxyXG5cdCAqL1xyXG5cdGRyYXcoKSBcclxuXHR7XHJcblx0XHRpZiAoRE9NLmZpbmQoJyNUdXJiby1lQ29tbWVyY2UtQ2hlY2tvdXQnKSkge1xyXG5cdFx0XHRyZXR1cm47XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKHRoaXMuc2V0dGluZ3Mubm9fY3NzKSB7XHJcblx0XHRcdHJldHVybjtcclxuXHRcdH1cclxuXHJcblx0XHRsZXQgcG9zaXRpb24gPSAodGhpcy5zZXR0aW5ncy5maXhlZCkgPyAnZml4ZWQnIDogJ2Fic29sdXRlJztcclxuXHJcblx0XHRsZXQgY3NzID0gYFxyXG5cdFx0XHQke3RoaXMuc2V0dGluZ3MuZWxlbWVudH0ge1xyXG5cdFx0XHRcdHdpZHRoOiAxMDAlO1xyXG5cdFx0XHRcdG1pbi1oZWlnaHQ6IDQwMHB4O1xyXG5cdFx0XHRcdGJvcmRlcjogMXB4IHNvbGlkICNlNGU0ZTQ7XHJcblx0XHRcdH1cclxuXHRcdGA7XHJcblx0ICAgIFxyXG5cdCAgICBET00uYWRkU3R5bGUoJ1R1cmJvLWVDb21tZXJjZS1DaGVja291dCcsIGNzcyk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBIaWRlcyBhbGwgaXJyZWxldmFudCBlbGVtZW50cyBmcm9tIHRoZSBET00uXHJcblx0ICpcclxuXHQgKiBAcmV0dXJuIHZvaWQgXHJcblx0ICovXHJcblx0aGlkZUFsbCgpXHJcblx0e1x0XHJcblx0XHRDb250YWluZXIkMy5Db21wb25lbnRzLmJvb3RlZC5mb3JFYWNoKGZ1bmN0aW9uKGNvbXBvbmVudCkge1xyXG5cdFx0XHRpZiAoY29tcG9uZW50LmNvbnN0cnVjdG9yLm5hbWUgIT0gJ0NoZWNrb3V0Jykge1xyXG5cdFx0XHRcdGNvbXBvbmVudC5oaWRlKCk7XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cdH1cclxufVxuXG4vLyBIZWxwZXJzXHJcbi8vIENvbXBvbmVudHNcclxuLy8gRXhjZXB0aW9uc1xyXG4vKipcclxuICogVGhlIGRlZmF1bHQgc2V0dGluZ3Mgb2YgZWFjaCBwcm9kdWN0LlxyXG4gKlxyXG4gKiBAdmFyIG9iamVjdFxyXG4gKi9cclxubGV0IGRlZmF1bHRTZXR0aW5ncyQ1ID0ge1xyXG5cdGVsZW1lbnQ6ICcucHJvZHVjdHMnLFxyXG5cdGNsYXNzOiAnJyxcclxuXHRpdGVtX2NsYXNzOiAnJyxcclxuXHRhZGRfYnV0dG9uX2NsYXNzOiAnYnRuIGJ0bi1wcmltYXJ5JyxcclxuXHRmYXZvcml0ZV9idXR0b25fY2xhc3M6ICdidG4gYnRuLWRhbmdlcicsXHJcblx0d2lkdGg6ICcyMDBweCcsXHJcblx0aGVpZ2h0OiAnMjUwcHgnLFxyXG5cdGF0dHJpYnV0ZXM6IFsnbmFtZScsICdwcmljZScsICdkZWxpdmVyeVRpbWUnLCAnaW1hZ2UnXSxcclxuXHR1cmw6ICdwcm9kdWN0cy5waHAnLFxyXG5cdG5vX2NzczogZmFsc2UsXHJcblx0Y3VycmVuY3k6ICckJyxcclxufTtcclxuXHJcbi8qKlxyXG4gKiBTdG9yZXMgdGhlIGNvbnRhaW5lciBvYmplY3QuXHJcbiAqIFxyXG4gKiBAdmFyIFxcQ29yZVxcQ29udGFpbmVyXHJcbiAqL1xyXG5sZXQgQ29udGFpbmVyJDQ7XHJcblxyXG4vKipcclxuICogU3RvcmVzIHRoZSBjb250YWluZXIgb2JqZWN0LlxyXG4gKiBcclxuICogQHZhciBcXENvcmVcXEV2ZW50TWFuYWdlclxyXG4gKi9cclxubGV0IEV2ZW50TWFuYWdlciQ1O1xyXG5cclxuLyoqXHJcbiAqIFN0b3JlcyB0aGUgcmVxdWVzdCBvYmplY3QuXHJcbiAqIFxyXG4gKiBAdmFyIFxcSGVscGVyXFxSZXF1ZXN0IFxyXG4gKi9cclxubGV0IEh0dHAkMztcclxuXHJcbi8qKlxyXG4gKiBTdG9yZXMgdGhlIGNodW5rZWQgcGVyIFxyXG4gKiBwYWdlIHByb2R1Y3RzLlxyXG4gKiBcclxuICogQHZhciBhcnJheVxyXG4gKi9cclxubGV0IGNodW5rZWRQcm9kdWN0cztcclxuXHJcbi8qKlxyXG4gKiBAY2xhc3MgUHJvZHVjdHNcclxuICpcclxuICogVGhlIFByb2R1Y3RzIGNvbXBvbmVudCwgaGFuZGxlcyB0aGUgcHJvZHVjdHMgdGFza3MuXHJcbiAqL1xyXG5cclxuY2xhc3MgUHJvZHVjdHMgZXh0ZW5kcyBCYXNlQ29tcG9uZW50XHJcbntcclxuXHQvKipcclxuXHQgKiBJbml0YWxpemUgdGhlIENvbnRhaW5lci5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSBcXENvcmVcXENvbnRhaW5lciB8IGNvbnRhaW5lclxyXG5cdCAqIEBwYXJhbSBcXEhlbHBlcnNcXFJlcXVlc3QgfCBodHRwXHJcblx0ICogQHJldHVybiB2b2lkXHJcblx0ICovXHJcblx0Y29uc3RydWN0b3IoY29udGFpbmVyLCBodHRwLCBldmVudE1hbmFnZXIpIFxyXG5cdHtcclxuXHRcdHN1cGVyKCk7XHJcblxyXG5cdFx0Q29udGFpbmVyJDQgPSBjb250YWluZXI7XHJcblx0XHRIdHRwJDMgPSBodHRwO1xyXG5cdFx0RXZlbnRNYW5hZ2VyJDUgPSBldmVudE1hbmFnZXI7XHJcblx0XHRjaHVua2VkUHJvZHVjdHMgPSBbXTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFNldHMgdGhlIGdpdmVuIHNldHRpbmdzIGZyb20gdGhlIHVzZXIuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gb2JqZWN0IHwgc2V0dGluZ3NcclxuXHQgKiBAcmV0dXJuIHZvaWRcclxuXHQgKi9cclxuXHRzZXR1cChzZXR0aW5ncylcclxuXHR7XHJcblx0XHRpZiAodHlwZW9mIHNldHRpbmdzICE9ICdvYmplY3QnKSB7XHJcblx0XHRcdHRocm93IG5ldyBJbnZhbGlkQXJndW1lbnRFeGNlcHRpb24kMTtcclxuXHRcdH1cclxuXHJcblx0XHR0aGlzLnNldHRpbmdzID0gQ29tbW9uLmV4dGVuZChkZWZhdWx0U2V0dGluZ3MkNSwgc2V0dGluZ3MpO1xyXG5cdFx0dGhpcy50b3RhbEl0ZW1zID0gbnVsbDtcclxuXHJcblx0XHRkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgZnVuY3Rpb24oKSB7XHJcblxyXG5cdFx0XHR0aGlzLnNldEVsZW1lbnQodGhpcy5zZXR0aW5ncy5lbGVtZW50KTtcclxuXHJcblx0XHRcdHRoaXMuZHJhdygpO1x0XHJcblxyXG5cdFx0XHR0aGlzLmxvYWRQcm9kdWN0cygxKTtcclxuXHRcdH0uYmluZCh0aGlzKSk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBMb2FkcyB0aGUgcHJvZHVjdHMgZm9yIHRoZSBwYWdlLlxyXG5cdCAqIFxyXG5cdCAqIEBwYXJhbSBudW1iZXIgfCBwYWdlTnVtYmVyXHJcblx0ICogQHBhcmFtIGJvb2wgfCBhcHBlbmRcclxuXHQgKiBAcmV0dXJuIHZvaWRcclxuXHQgKi9cclxuXHRsb2FkUHJvZHVjdHMocGFnZU51bWJlciA9IDEsIGFwcGVuZCA9IGZhbHNlKVxyXG5cdHtcclxuXHRcdGlmIChDb250YWluZXIkNC5QYWdpbmF0aW9uICYmIENvbnRhaW5lciQ0LlBhZ2luYXRpb24uYm9vdGVkKSB7XHJcblx0XHRcdFxyXG5cdFx0XHRsZXQgbGltaXQgPSBDb250YWluZXIkNC5QYWdpbmF0aW9uLnNldHRpbmdzLnBlcl9wYWdlO1xyXG5cclxuXHRcdFx0c3dpdGNoKENvbnRhaW5lciQ0LlBhZ2luYXRpb24uc2V0dGluZ3MucHJvY2Vzc2luZykgXHJcblx0XHRcdHtcclxuXHRcdFx0XHRjYXNlICdjbGllbnQtc2lkZSc6XHJcblx0XHRcdFx0XHRyZXR1cm4gdGhpcy5sb2FkUGFnZVByb2R1Y3RzT25jZShwYWdlTnVtYmVyLCBsaW1pdCwgYXBwZW5kKTtcclxuXHRcdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRcdGNhc2UgJ3NlcnZlci1zaWRlJzpcclxuXHRcdFx0XHRcdHJldHVybiB0aGlzLmxvYWRQYWdlUHJvZHVjdHMocGFnZU51bWJlciwgbGltaXQsIGFwcGVuZCk7XHJcblx0XHRcdFx0XHRicmVhaztcclxuXHRcdFx0XHRkZWZhdWx0OlxyXG5cdFx0XHRcdFx0dGhyb3cgbmV3IEludmFsaWRBcmd1bWVudEV4Y2VwdGlvbiQxKCdmb3IgcHJvY2Vzc2luZyB5b3UgY2FuIGNob29zZSBcXCdzZXJ2ZXItc2lkZVxcJyBvciBcXCdjbGllbnQtc2lkZVxcJyBvcHRpb25zLicpO1xyXG5cdFx0XHR9XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHR0aGlzLmxvYWRQYWdlUHJvZHVjdHMoKTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIExvYWRzIHRoZSBwcm9kdWN0cyBhbmQgXHJcblx0ICogcmVwbGFjZSB0aGVtIGluIHRoZSBkaXYgY29udGFpbmVyLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIG51bWJlciB8IHBhZ2VOdW1iZXJcclxuXHQgKiBAcGFyYW0gbnVtYmVyIHwgbGltaXRcclxuXHQgKiBAcmV0dXJuIHZvaWRcclxuXHQgKi9cclxuXHRsb2FkUGFnZVByb2R1Y3RzKHBhZ2VOdW1iZXIgPSBudWxsLCBsaW1pdCA9IG51bGwpXHJcblx0e1xyXG5cdFx0bGV0IHJlcXVlc3QgPSB0aGlzLmdldFByb2R1Y3RzKHBhZ2VOdW1iZXIpO1xyXG5cclxuXHRcdHJlcXVlc3QudGhlbihmdW5jdGlvbihwcm9kdWN0cykge1xyXG5cdFx0XHRpZiAobGltaXQpIHtcclxuXHRcdFx0XHR0aGlzLmN1cnJlbnRJdGVtcyA9IHByb2R1Y3RzLnNsaWNlKDAsIGxpbWl0KTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHR0aGlzLmN1cnJlbnRJdGVtcyA9IHByb2R1Y3RzO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHR0aGlzLnJlcGxhY2VQcm9kdWN0cyh0aGlzLmN1cnJlbnRJdGVtcyk7XHJcblx0XHRcdFByb21pc2UucmVzb2x2ZSh0aGlzLmN1cnJlbnRJdGVtcyk7XHJcblx0XHR9LmJpbmQodGhpcykpLmNhdGNoKGZ1bmN0aW9uKGVycm9yKSB7XHJcblx0XHRcdC8vIHRocm93IG5ldyBFcnJvcignQ291bGQgbm90IGxvYWQgcHJvZHVjdHMhIFJlYXNvbjogJyArIGVycm9yKTtcclxuXHRcdH0pO1xyXG5cclxuXHRcdHJldHVybiByZXF1ZXN0O1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogTG9hZHMgdGhlIHByb2R1Y3RzIGFuZCBcclxuXHQgKiByZXBsYWNlIHRoZW0gaW4gdGhlIGRpdiBjb250YWluZXIuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gbnVtYmVyIHwgcGFnZU51bWJlclxyXG5cdCAqIEBwYXJhbSBib29sIHwgYXBwZW5kXHJcblx0ICogQHJldHVybiB2b2lkXHJcblx0ICovXHJcblx0bG9hZFBhZ2VQcm9kdWN0c09uY2UocGFnZU51bWJlciwgdW5kZWZpbmVkLCBhcHBlbmQgPSBmYWxzZSlcclxuXHR7XHJcblx0XHRsZXQgcmVxdWVzdDtcclxuXHJcblx0XHRpZiAodGhpcy50b3RhbEl0ZW1zID09IG51bGwpIHsgLy8gbmVlZCB0byBmZXRjaCB0aGVtIGZyb20gdGhlIHNlcnZlci5cclxuXHRcdFx0cmVxdWVzdCA9IHRoaXMuZ2V0UHJvZHVjdHMoKTtcclxuXHRcdH0gZWxzZSB7IC8vIG5vIG5lZWQgdG8gd2FpdCBjYW4gcmVzb2x2ZSBpbW1lZGlhdGVseSB3aXRoIHRoZSBwcm9kdWN0cy4gXHJcblx0XHRcdHJlcXVlc3QgPSBQcm9taXNlLnJlc29sdmUodGhpcy50b3RhbEl0ZW1zKTtcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gcmVxdWVzdC50aGVuKGZ1bmN0aW9uKHByb2R1Y3RzKSB7XHJcblx0XHRcdHRoaXMudG90YWxJdGVtcyA9IHByb2R1Y3RzO1xyXG5cdFx0XHRsZXQgcGFnZXMgPSB0aGlzLmNhbGN1bGF0ZUNsaWVudFBhZ2VzKHByb2R1Y3RzKTtcclxuXHRcdFx0dGhpcy5jdXJyZW50SXRlbXMgPSBwYWdlc1twYWdlTnVtYmVyLTFdO1xyXG5cclxuXHRcdFx0aWYgKHR5cGVvZiB0aGlzLmN1cnJlbnRJdGVtcyA9PSAndW5kZWZpbmVkJykge1xyXG5cdFx0XHRcdHJldHVybiBudWxsO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRpZiAoYXBwZW5kKSB7XHJcblx0XHRcdFx0dGhpcy5hcHBlbmRQcm9kdWN0cyh0aGlzLmN1cnJlbnRJdGVtcyk7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0dGhpcy5yZXBsYWNlUHJvZHVjdHModGhpcy5jdXJyZW50SXRlbXMpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRyZXR1cm4gdGhpcy5jdXJyZW50SXRlbXM7XHJcblx0XHR9LmJpbmQodGhpcykpLmNhdGNoKGZ1bmN0aW9uKGVycm9yKSB7XHJcblx0XHRcdC8vIHRocm93IG5ldyBFcnJvcignQ291bGQgbm90IGxvYWQgcHJvZHVjdHMhIFJlYXNvbjogJyArIGVycm9yKTtcclxuXHRcdH0pO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQ2FsY3VsYXRlcyB0aGUgYW1vdW50IG9mIHBhZ2VzIGZvciB0aGUgY2xpZW50LlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIGFycmF5IHwgcHJvZHVjdHNcclxuXHQgKiBAcmV0dXJuIGFycmF5XHJcblx0ICovXHJcblx0Y2FsY3VsYXRlQ2xpZW50UGFnZXMocHJvZHVjdHMpXHJcblx0e1x0XHJcblx0XHQvLyBXZSBhcmUgdXNpbmcgcGFnaW5hdGlvbiBzbyB3ZSBuZWVkIHRvIHVwZGF0ZSBpdCB0b28uXHJcblx0XHRDb250YWluZXIkNC5QYWdpbmF0aW9uLnNldHRpbmdzLnRvdGFsX2l0ZW1zID0gcHJvZHVjdHMubGVuZ3RoO1xyXG5cdFx0XHJcblx0XHRsZXQgcGVyUGFnZSA9IENvbnRhaW5lciQ0LlBhZ2luYXRpb24uc2V0dGluZ3MucGVyX3BhZ2U7IFxyXG5cclxuXHRcdC8vIFdlIG5lZWQgdG8gY2FsY3VsYXRlIHRoZSBwYWdlcyBvbiBmdWxsIGh0dHAgcmVxdWVzdCBcclxuXHRcdC8vIG9ubHkgb25jZS4gc28gd2UgY2hlY2sgdG8gc2VlIGlmIHdlIGhhdmUgcmVzdWx0cyBpbiBvdXIgY2FjaGUuXHJcblx0XHRpZiAoY2h1bmtlZFByb2R1Y3RzLmxlbmd0aCAhPSAwKSB7XHJcblx0XHRcdHJldHVybiBjaHVua2VkUHJvZHVjdHM7XHJcblx0XHR9XHJcblxyXG5cdFx0Y2h1bmtlZFByb2R1Y3RzID0gQ29tbW9uLmFycmF5X2NodW5rKHByb2R1Y3RzLCBwZXJQYWdlKTtcclxuXHRcdHJldHVybiBjaHVua2VkUHJvZHVjdHM7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBTZXRzIHRoZSBET00gZWxlbWVudCBcclxuXHQgKiBmb3IgcG9wdWxhdGluZyB0aGUgcHJvZHVjdHMuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gc3RyaW5nIHwgc2VsZWN0b3JcclxuXHQgKiBAcmV0dXJuIHZvaWRcclxuXHQgKi9cclxuXHRzZXRFbGVtZW50KHNlbGVjdG9yKVxyXG5cdHtcclxuXHRcdHRoaXMuZWxlbWVudCA9IERPTS5maW5kKHNlbGVjdG9yKTtcclxuXHJcblx0XHRpZiAodGhpcy5lbGVtZW50KSB7XHJcblx0XHRcdERPTS5hZGRDbGFzcyh0aGlzLmVsZW1lbnQsIHRoaXMuc2V0dGluZ3MuY2xhc3MpO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogUmVwbGFjZSBwcm9kdWN0cyBpbiBcclxuXHQgKiB0aGUgcHJvZHVjdHMgY29udGFpbmVyLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIGFycmF5IHwgcmF3UHJvZHVjdHNcclxuXHQgKiBAcmV0dXJuIGFycmF5XHJcblx0ICovXHJcblx0cmVwbGFjZVByb2R1Y3RzKHJhd1Byb2R1Y3RzKSBcclxuXHR7XHJcblx0XHRpZiAoISBBcnJheS5pc0FycmF5KHJhd1Byb2R1Y3RzKSB8fCAocmF3UHJvZHVjdHMubGVuZ3RoIDw9IDAgJiYgdHlwZW9mIHJhd1Byb2R1Y3RzWzBdID09ICdzdHJpbmcnKSkge1xyXG5cdFx0XHR0aHJvdyBuZXcgSW52YWxpZEFyZ3VtZW50RXhjZXB0aW9uJDE7XHJcblx0XHR9XHJcblxyXG5cdFx0bGV0IHByb2R1Y3RzID0gdGhpcy5idWlsZFByb2R1Y3RzKHJhd1Byb2R1Y3RzLCB0aGlzLnNldHRpbmdzLml0ZW1fY2xhc3MsICdkaXYnKTtcclxuXHJcblx0XHR0aGlzLmVsZW1lbnQuaW5uZXJIVE1MID0gJyc7XHJcblx0XHRwcm9kdWN0cy5mb3JFYWNoKGZ1bmN0aW9uKHByb2R1Y3QpIHtcclxuXHRcdFx0RXZlbnRNYW5hZ2VyJDUucHVibGlzaCgncHJvZHVjdHMubG9hZGluZycsIHByb2R1Y3QpO1xyXG5cdFx0XHR0aGlzLmVsZW1lbnQuYXBwZW5kQ2hpbGQocHJvZHVjdCk7XHJcblx0XHR9LmJpbmQodGhpcykpO1xyXG5cclxuXHRcdEV2ZW50TWFuYWdlciQ1LnB1Ymxpc2goJ3Byb2R1Y3RzLmxvYWRlZCcsIHByb2R1Y3RzKTtcclxuXHJcblx0XHRyZXR1cm4gcHJvZHVjdHM7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBBcHBlbmRzIG1vcmUgcHJvZHVjdHMgdG8gdGhlXHJcblx0ICogZGl2IGNvbnRhaW5lci5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSBhcnJheSB8IHJhd1Byb2R1Y3RzXHJcblx0ICogQHJldHVybiBhcnJheVxyXG5cdCAqL1xyXG5cdGFwcGVuZFByb2R1Y3RzKHJhd1Byb2R1Y3RzKVxyXG5cdHtcclxuXHRcdGlmICghIEFycmF5LmlzQXJyYXkocmF3UHJvZHVjdHMpIHx8IChyYXdQcm9kdWN0cy5sZW5ndGggPD0gMCAmJiB0eXBlb2YgcmF3UHJvZHVjdHNbMF0gPT0gJ3N0cmluZycpKSB7XHJcblx0XHRcdHRocm93IG5ldyBJbnZhbGlkQXJndW1lbnRFeGNlcHRpb24kMTtcclxuXHRcdH1cclxuXHJcblx0XHRsZXQgcHJvZHVjdHMgPSB0aGlzLmJ1aWxkUHJvZHVjdHMocmF3UHJvZHVjdHMsIHRoaXMuc2V0dGluZ3MuaXRlbV9jbGFzcywgJ2RpdicpO1xyXG5cclxuXHRcdHByb2R1Y3RzLmZvckVhY2goZnVuY3Rpb24ocHJvZHVjdCkge1xyXG5cdFx0XHRFdmVudE1hbmFnZXIkNS5wdWJsaXNoKCdwcm9kdWN0cy5sb2FkaW5nJywgcHJvZHVjdCk7XHJcblx0XHRcdHRoaXMuZWxlbWVudC5hcHBlbmRDaGlsZChwcm9kdWN0KTtcclxuXHRcdH0uYmluZCh0aGlzKSk7XHJcblxyXG5cdFx0RXZlbnRNYW5hZ2VyJDUucHVibGlzaCgncHJvZHVjdHMubG9hZGVkJywgcHJvZHVjdHMpO1xyXG5cclxuXHRcdHJldHVybiBwcm9kdWN0cztcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIE1ha2VzIGFuIEFqYXggY2FsbCB0byB0aGUgXHJcblx0ICogc2VydmVyIHdpdGhvdXQgcGFyYW1ldGVycy5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSBudW1iZXIgfCBwYWdlTnVtYmVyXHJcblx0ICogQHJldHVybiBQcm9taXNlXHJcblx0ICovXHJcblx0Z2V0UHJvZHVjdHMocGFnZU51bWJlciA9IG51bGwpXHJcblx0e1xyXG5cdFx0bGV0IGFjdGlvbiA9IChwYWdlTnVtYmVyKSA/IHRoaXMuc2V0dGluZ3MudXJsICsgJz9wYWdlPScgKyBwYWdlTnVtYmVyIDogdGhpcy5zZXR0aW5ncy51cmw7XHJcblxyXG5cdFx0cmV0dXJuIEh0dHAkMy5nZXQoe1xyXG5cdFx0XHR1cmw6IGFjdGlvbixcclxuXHRcdH0pO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQnVpbGRzIHRoZSBodG1sIGZvciB0aGUgcHJvZHVjdHMuXHJcblx0ICogXHJcblx0ICogQHBhcmFtIGFycmF5IHwgYXR0cmlidXRlc0NvbGxlY3Rpb25cclxuXHQgKiBAcGFyYW0gc3RyaW5nIHwgY2xhc3NOYW1lXHJcblx0ICogQHBhcmFtIHN0cmluZyB8IHRhZ1R5cGVcclxuXHQgKiBAcmV0dXJuIGFycmF5XHJcblx0ICovXHJcblx0YnVpbGRQcm9kdWN0cyhhdHRyaWJ1dGVzQ29sbGVjdGlvbiwgY2xhc3NOYW1lLCB0YWdUeXBlKSBcclxuXHR7XHJcblx0XHRpZihhdHRyaWJ1dGVzQ29sbGVjdGlvbi5jb25zdHJ1Y3Rvci5uYW1lICE9ICdBcnJheScgKSB7XHJcblx0XHRcdHRocm93IG5ldyBJbnZhbGlkQXJndW1lbnRFeGNlcHRpb24kMTtcclxuXHRcdH1cclxuXHJcblx0XHRsZXQgYnVpbHRQcm9kdWN0cyA9IFtdO1xyXG5cclxuXHRcdC8vIEVudGVyIGRlZmF1bHQgYXR0cmlidXRlLlxyXG5cdFx0aWYgKHRoaXMuc2V0dGluZ3MuYXR0cmlidXRlcy5pbmRleE9mKCdjdXJyZW5jeScpID09IC0xKSB7XHJcblx0XHRcdHRoaXMuc2V0dGluZ3MuYXR0cmlidXRlcy5wdXNoKCdjdXJyZW5jeScpO1xyXG5cdFx0fVxyXG5cdFx0XHJcblx0XHRhdHRyaWJ1dGVzQ29sbGVjdGlvbi5mb3JFYWNoKGZ1bmN0aW9uKGF0dHJpYnV0ZXMpIHtcclxuXHRcdFx0bGV0IGJ1aWx0UHJvZHVjdCA9IHRoaXMuYnVpbGRQcm9kdWN0KGF0dHJpYnV0ZXMsIGNsYXNzTmFtZSwgdGFnVHlwZSk7XHJcblx0XHRcdGJ1aWx0UHJvZHVjdHMucHVzaChidWlsdFByb2R1Y3QpO1xyXG5cdFx0fS5iaW5kKHRoaXMpKTtcclxuXHJcblx0XHRyZXR1cm4gYnVpbHRQcm9kdWN0cztcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEJ1aWxkcyB0aGUgaHRtbCBmb3IgYSBzaW5nbGUgcHJvZHVjdC5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSBvYmplY3QgfCBhdHRyaWJ1dGVzXHJcblx0ICogQHBhcmFtIHN0cmluZyB8IGNsYXNzTmFtZVxyXG5cdCAqIEBwYXJhbSBzdHJpbmcgfCB0YWdUeXBlXHJcblx0ICogQHJldHVybiBvYmplY3RcclxuXHQgKi9cclxuXHRidWlsZFByb2R1Y3QoYXR0cmlidXRlcywgY2xhc3NOYW1lLCB0YWdUeXBlKSBcclxuXHR7XHJcblx0XHRpZiAodHlwZW9mIGF0dHJpYnV0ZXMgIT0gJ29iamVjdCcgfHwgdHlwZW9mIHRhZ1R5cGUgIT0gJ3N0cmluZycpIHtcclxuXHRcdFx0dGhyb3cgbmV3IEludmFsaWRBcmd1bWVudEV4Y2VwdGlvbiQxO1xyXG5cdFx0fVxyXG5cclxuXHRcdGNsYXNzTmFtZSA9IGNsYXNzTmFtZSB8fCBudWxsO1xyXG5cclxuXHRcdGxldCBwcm9kdWN0ID0gRE9NLmNyZWF0ZUVsZW1lbnQoJ2RpdicsIHtcclxuXHRcdFx0Y2xhc3M6ICdwcm9kdWN0J1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0RE9NLmFkZENsYXNzKHByb2R1Y3QsIGNsYXNzTmFtZSk7XHJcblxyXG5cdFx0bGV0IG92ZXJsYXkgPSBET00uY3JlYXRlRWxlbWVudCgnZGl2Jywge1xyXG5cdFx0XHRjbGFzczogJ3Byb2R1Y3Qtb3ZlcmxheScsXHJcblx0XHR9KTtcclxuXHJcblx0XHRwcm9kdWN0LmFwcGVuZENoaWxkKG92ZXJsYXkpO1xyXG5cclxuXHRcdGF0dHJpYnV0ZXMgPSB0aGlzLmFkZERlZmF1bHRBdHRyaWJ1dGVzKGF0dHJpYnV0ZXMpO1xyXG5cclxuXHRcdGlmIChhdHRyaWJ1dGVzLmhhc093blByb3BlcnR5KCdpbWFnZScpKSB7XHJcblx0XHRcdGxldCBpbWFnZSA9IERPTS5jcmVhdGVFbGVtZW50KCdpbWcnLCB7XHJcblx0XHRcdFx0c3JjOiBhdHRyaWJ1dGVzWydpbWFnZSddXHJcblx0XHRcdH0pO1xyXG5cdFx0XHRcclxuXHRcdFx0bGV0IHRhZyA9IERPTS5jcmVhdGVFbGVtZW50KHRhZ1R5cGUsIHtcclxuXHRcdFx0XHRjbGFzczogJ3Byb2R1Y3QtaW1hZ2UnLFxyXG5cdFx0XHRcdGh0bWw6IGltYWdlLm91dGVySFRNTFxyXG5cdFx0XHR9KTtcclxuXHRcdFx0XHJcblx0XHRcdHByb2R1Y3QuYXBwZW5kQ2hpbGQodGFnKTtcclxuXHRcdH1cclxuXHJcblx0XHRpZiAoYXR0cmlidXRlcy5oYXNPd25Qcm9wZXJ0eSgncHJpY2UnKSkge1xyXG5cdFx0XHRsZXQgdGFnID0gRE9NLmNyZWF0ZUVsZW1lbnQodGFnVHlwZSwge1xyXG5cdFx0XHRcdGNsYXNzOiAncHJvZHVjdC1wcmljZScsXHJcblx0XHRcdH0pO1xyXG5cclxuXHRcdFx0bGV0IHNwYW4gPSBET00uY3JlYXRlRWxlbWVudCgnc3BhbicsIHtcclxuXHRcdFx0XHRjbGFzczogJ3Byb2R1Y3QtYW1vdW50JyxcclxuXHRcdFx0XHRodG1sOiBhdHRyaWJ1dGVzLnByaWNlLmFtb3VudFxyXG5cdFx0XHR9KTtcclxuXHJcblx0XHRcdGxldCBzcGFuMiA9IERPTS5jcmVhdGVFbGVtZW50KCdzcGFuJywge1xyXG5cdFx0XHRcdGNsYXNzOiAncHJvZHVjdC1jdXJyZW5jeScsXHJcblx0XHRcdFx0aHRtbDogYXR0cmlidXRlcy5wcmljZS5jdXJyZW5jeVxyXG5cdFx0XHR9KTtcclxuXHJcblx0XHRcdHRhZy5hcHBlbmRDaGlsZChzcGFuKTtcclxuXHRcdFx0dGFnLmFwcGVuZENoaWxkKHNwYW4yKTtcclxuXHRcdFx0b3ZlcmxheS5hcHBlbmRDaGlsZCh0YWcpO1xyXG5cdFx0fVxyXG5cclxuXHRcdGZvciAodmFyIGF0dHJpYnV0ZSBpbiBhdHRyaWJ1dGVzKSB7XHJcblx0XHRcdGlmICghIENvbW1vbi5pbl9hcnJheShhdHRyaWJ1dGUsIHRoaXMuc2V0dGluZ3MuYXR0cmlidXRlcykpIHtcclxuXHRcdFx0XHRjb250aW51ZTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0aWYgKGF0dHJpYnV0ZSA9PSAncHJpY2UnIHx8IGF0dHJpYnV0ZSA9PSAnaW1hZ2UnKSB7XHJcblx0XHRcdFx0Y29udGludWU7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGxldCB0YWcgPSBET00uY3JlYXRlRWxlbWVudCh0YWdUeXBlKTtcclxuXHRcdFx0dGFnLmlubmVySFRNTCA9IGF0dHJpYnV0ZXNbYXR0cmlidXRlXSB8fCAnJztcclxuXHRcdFx0XHJcblx0XHRcdERPTS5hZGRDbGFzcyh0YWcsICdwcm9kdWN0LScgKyBTdHIua2ViYWJDYXNlKGF0dHJpYnV0ZSkpO1xyXG5cdFx0XHRvdmVybGF5LmFwcGVuZENoaWxkKHRhZyk7XHJcblx0XHR9XHJcblxyXG5cdFx0bGV0IHRhZyA9IERPTS5jcmVhdGVFbGVtZW50KCdkaXYnLCB7XHJcblx0XHRcdGNsYXNzOiAnYWN0aW9uLWJ1dHRvbnMnXHJcblx0XHR9KTtcclxuXHJcblx0XHRsZXQgYWRkVG9DYXJ0ID0gRE9NLmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicsIHtcclxuXHRcdFx0Y2xhc3M6ICdhZGQtdG8tY2FydCcsXHJcblx0XHRcdHR5cGU6ICdidXR0b24nLFxyXG5cdFx0XHR0ZXh0OiAnKycsXHJcblx0XHR9KTtcclxuXHJcblx0XHRsZXQgZmF2b3JpdGUgPSBET00uY3JlYXRlRWxlbWVudCgnYnV0dG9uJywge1xyXG5cdFx0XHRjbGFzczogJ2Zhdm9yaXRlJyxcclxuXHRcdFx0dHlwZTogJ2J1dHRvbicsXHJcblx0XHRcdHRleHQ6ICcmaGVhcnRzOydcclxuXHRcdH0pO1xyXG5cclxuXHRcdGlmICh0aGlzLnNldHRpbmdzLmFkZF9idXR0b25fY2xhc3MpIHtcclxuXHRcdFx0RE9NLmFkZENsYXNzKGFkZFRvQ2FydCwgdGhpcy5zZXR0aW5ncy5hZGRfYnV0dG9uX2NsYXNzKTtcclxuXHRcdH1cclxuXHJcblx0XHRpZiAodGhpcy5zZXR0aW5ncy5mYXZvcml0ZV9idXR0b25fY2xhc3MpIHtcclxuXHRcdFx0RE9NLmFkZENsYXNzKGZhdm9yaXRlLCB0aGlzLnNldHRpbmdzLmZhdm9yaXRlX2J1dHRvbl9jbGFzcyk7XHJcblx0XHR9XHJcblxyXG5cdFx0dGFnLmFwcGVuZENoaWxkKGFkZFRvQ2FydCk7XHJcblx0XHR0YWcuYXBwZW5kQ2hpbGQoZmF2b3JpdGUpO1xyXG5cclxuXHRcdGFkZFRvQ2FydC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcclxuXHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdFx0XHRFdmVudE1hbmFnZXIkNS5wdWJsaXNoKCdjYXJ0LnByb2R1Y3QuYWRkZWQnLCBhdHRyaWJ1dGVzKTtcclxuXHRcdH0pO1xyXG5cclxuXHRcdGZhdm9yaXRlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xyXG5cdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XHJcblx0XHRcdHRoaXMuaW5uZXJIVE1MID0gJyYjeDI3MTM7JztcclxuXHRcdFx0RXZlbnRNYW5hZ2VyJDUucHVibGlzaCgnY2FydC5wcm9kdWN0LmZhdm9yaXRlZCcsIGF0dHJpYnV0ZXMpO1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0b3ZlcmxheS5hcHBlbmRDaGlsZCh0YWcpO1xyXG5cclxuXHRcdHJldHVybiBwcm9kdWN0O1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQWRkcyBkZWZhdWx0IGF0dHJpYnV0ZXNcclxuXHQgKiB0byB0aGUgc3VwcGxpZWQgYXR0cmlidXRlcy5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSBvYmplY3QgfCBhdHRyaWJ1dGVzXHJcblx0ICogQHJldHVybiBvYmplY3RcclxuXHQgKi9cclxuXHRhZGREZWZhdWx0QXR0cmlidXRlcyhhdHRyaWJ1dGVzKVxyXG5cdHtcclxuXHRcdGlmIChhdHRyaWJ1dGVzLmhhc093blByb3BlcnR5KCdwcmljZScpICYmIHR5cGVvZiBhdHRyaWJ1dGVzLnByaWNlICE9ICdvYmplY3QnKSB7XHJcblx0XHRcdGF0dHJpYnV0ZXMucHJpY2UgPSB7XHJcblx0XHRcdFx0XCJhbW91bnRcIjogYXR0cmlidXRlcy5wcmljZSxcclxuXHRcdFx0XHRcImN1cnJlbmN5XCI6IHRoaXMuc2V0dGluZ3MuY3VycmVuY3lcclxuXHRcdFx0fTtcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gYXR0cmlidXRlcztcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEFkZCB0aGUgZUNvbW1lcmNlIHN0eWxlIHRhZ3MgdG8gdGhlIERPTS5cclxuXHQgKi9cclxuXHRkcmF3KCkgXHJcblx0e1xyXG5cdFx0aWYgKERPTS5maW5kKCcjVHVyYm8tZUNvbW1lcmNlLVByb2R1Y3RzJykpIHtcclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0fVxyXG5cclxuXHRcdGlmICh0aGlzLnNldHRpbmdzLm5vX2Nzcykge1xyXG5cdFx0XHRyZXR1cm47XHJcblx0XHR9XHJcblxyXG5cdFx0bGV0IHdpZHRoID0gdGhpcy5zZXR0aW5ncy53aWR0aCB8fCAnYXV0byc7XHJcblx0XHRsZXQgaGVpZ2h0ID0gdGhpcy5zZXR0aW5ncy5oZWlnaHQgfHwgJzIwMHB4JztcclxuXHRcdGxldCBtaW5XaWR0aCA9IHRoaXMuc2V0dGluZ3MubWluX3dpZHRoIHx8ICcyMDBweCc7XHJcblx0XHRsZXQgbWF4V2lkdGggPSB0aGlzLnNldHRpbmdzLm1heF93aWR0aCB8fCAnMjUwcHgnO1xyXG5cclxuXHRcdGxldCBjc3MgPSBgXHJcblx0XHRcdC5wcm9kdWN0IHtcclxuXHRcdFx0XHRwb3NpdGlvbjogcmVsYXRpdmU7XHJcblx0XHRcdFx0bWFyZ2luOiA1cHggNXB4O1xyXG5cdFx0XHRcdGJvcmRlcjogMXB4IHNvbGlkICNlNGU0ZTQ7XHJcblx0XHRcdFx0d2lkdGg6ICR7d2lkdGh9O1xyXG5cdFx0XHRcdG1pbi13aWR0aDogJHttaW5XaWR0aH07XHJcblx0XHRcdFx0bWF4LXdpZHRoOiAke21heFdpZHRofTtcclxuXHRcdFx0XHRoZWlnaHQ6ICR7aGVpZ2h0fTtcclxuXHRcdFx0XHRjdXJzb3I6IHBvaW50ZXI7XHJcblx0XHRcdFx0Y29sb3I6ICNmZmZmZmY7XHJcblx0XHRcdFx0b3ZlcmZsb3c6IGhpZGRlbjtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0LnByb2R1Y3QgPiAucHJvZHVjdC1vdmVybGF5IHtcclxuXHRcdFx0XHRwb3NpdGlvbjogYWJzb2x1dGU7XHJcblx0XHRcdFx0dG9wOiAwO1xyXG5cdFx0XHRcdGxlZnQ6IDA7XHJcblx0XHRcdFx0d2lkdGg6IDEwMCU7XHJcblx0XHRcdFx0aGVpZ2h0OiAxMDAlO1xyXG5cdFx0XHRcdG9wYWNpdHk6IDAuNTtcclxuXHRcdFx0XHR6LWluZGV4OiA1O1xyXG5cdFx0XHRcdHRyYW5zaXRpb246IDFzIGFsbDtcclxuXHRcdFx0XHR0cmFuc2Zvcm06IHRyYW5zbGF0ZVgoLTI1MHB4KTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0LnByb2R1Y3Q6aG92ZXIgPiAucHJvZHVjdC1vdmVybGF5IHtcclxuXHRcdFx0XHRiYWNrZ3JvdW5kOiByZ2JhKDAsIDAsIDAsIDAuNDUpO1xyXG5cdFx0XHRcdHRyYW5zZm9ybTogdHJhbnNsYXRlWCgwcHgpO1xyXG5cdFx0XHRcdG9wYWNpdHk6IDE7XHJcblx0XHRcdFx0dHJhbnNpdGlvbjogMC41cyBhbGw7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdC5wcm9kdWN0ID4gLnByb2R1Y3QtaW1hZ2UgPiBpbWcge1xyXG5cdFx0XHRcdHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuXHRcdFx0XHRsZWZ0OiAwO1xyXG5cdFx0XHRcdHRvcDogMDtcclxuXHRcdFx0XHR3aWR0aDogMTAwJTtcclxuXHRcdFx0XHRoZWlnaHQ6IDEwMCU7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdC5wcm9kdWN0ID4gLnByb2R1Y3Qtb3ZlcmxheSA+IC5wcm9kdWN0LW5hbWUsIFxyXG5cdFx0XHQucHJvZHVjdCA+IC5wcm9kdWN0LW92ZXJsYXkgPiAucHJvZHVjdC1wcmljZSxcclxuXHRcdFx0LnByb2R1Y3QgPiAucHJvZHVjdC1vdmVybGF5ID4gLnByb2R1Y3QtZGVsaXZlcnktdGltZSB7XHJcblx0XHRcdFx0ei1pbmRleDogMTtcclxuXHRcdFx0XHRwb3NpdGlvbjogcmVsYXRpdmU7XHJcblx0XHRcdFx0dGV4dC1hbGlnbjogY2VudGVyO1xyXG5cdFx0XHRcdG1hcmdpbi10b3A6IDI1cHg7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdC5wcm9kdWN0ID4gLnByb2R1Y3Qtb3ZlcmxheSA+IC5hY3Rpb24tYnV0dG9ucyB7XHJcblx0XHRcdFx0d2lkdGg6IDEwMCU7XHJcblx0XHRcdFx0bWFyZ2luLXRvcDogMTBweDtcclxuXHRcdFx0XHR0ZXh0LWFsaWduOiBjZW50ZXI7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdC5wcm9kdWN0ID4gLnByb2R1Y3Qtb3ZlcmxheSA+IC5hY3Rpb24tYnV0dG9ucyA+IC5mYXZvcml0ZSB7XHJcblx0XHRcdFx0bWFyZ2luLWxlZnQ6IDEwcHg7XHJcblx0XHRcdH1cclxuXHJcblx0XHRgO1xyXG5cdCAgICBcclxuXHQgICAgRE9NLmFkZFN0eWxlKCdUdXJiby1lQ29tbWVyY2UtUHJvZHVjdHMnLCBjc3MpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogSGlkZXMgYWxsIGlycmVsZXZhbnQgZWxlbWVudHMgZnJvbSB0aGUgRE9NLlxyXG5cdCAqXHJcblx0ICogQHJldHVybiB2b2lkIFxyXG5cdCAqL1xyXG5cdGhpZGVBbGwoKVxyXG5cdHtcdFxyXG5cdFx0Q29udGFpbmVyJDQuQ29tcG9uZW50cy5ib290ZWQuZm9yRWFjaChmdW5jdGlvbihjb21wb25lbnQpIHtcclxuXHRcdFx0aWYgKGNvbXBvbmVudC5jb25zdHJ1Y3Rvci5uYW1lICE9ICdQcm9kdWN0cycpIHtcclxuXHRcdFx0XHRjb21wb25lbnQuaGlkZSgpO1xyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHR9XHJcbn1cblxuLy8gQ29tcG9uZW50c1xyXG4vKipcclxuICogVGhlIFNlcnZpY2VzIE9iamVjdCwgaGFuZGxlcyB0aGUgc2VydmljZXMuXHJcbiAqL1xyXG5jbGFzcyBTZXJ2aWNlcyBleHRlbmRzIEJhc2VDb21wb25lbnQgXHJcbntcclxuXHJcbn1cblxubGV0IGRlZmF1bHRNZXNzYWdlJDQgPSAnU29ycnksIG5vIG1vcmUgcGFnZXMuJztcclxuXHJcbmNsYXNzIE5vdEluUGFnZVJhbmdlRXhjZXB0aW9uIGV4dGVuZHMgRXhjZXB0aW9uSGFuZGxlclxyXG57XHJcblx0Y29uc3RydWN0b3IobWVzc2FnZSA9IG51bGwpIFxyXG5cdHtcclxuXHRcdG1lc3NhZ2UgPSBtZXNzYWdlIHx8IGRlZmF1bHRNZXNzYWdlJDQ7XHJcblx0XHRzdXBlcigpO1xyXG4gICAgXHRzdXBlci5zdGFja1RyYWNlKHRoaXMsIG1lc3NhZ2UpO1xyXG4gICAgfVxyXG59XG5cbi8vIEhlbHBlcnNcclxuLy8gQ29tcG9uZW50c1xyXG4vLyBFeGNlcHRpb25zXHJcbi8qKlxyXG4gKiBUaGUgZGVmYXVsdCBzZXR0aW5ncyBvZiB0aGUgcGFnaW5hdGlvbi5cclxuICpcclxuICogQHZhciBvYmplY3RcclxuICovXHJcbmxldCBkZWZhdWx0U2V0dGluZ3MkNiA9IHtcclxuXHRlbGVtZW50OiAnLnBhZ2luYXRpb24tbGlua3MnLFxyXG5cdHByb2Nlc3Npbmc6ICdjbGllbnQtc2lkZScsXHJcblx0Y2xhc3M6ICcnLFxyXG5cdHBlcl9wYWdlOiA1LFxyXG5cdHRvdGFsX2l0ZW1zOiA1LFxyXG5cdHVybF9wYXJhbWV0ZXI6ICdwYWdlJyxcclxuXHRzZXBhcmF0b3I6ICcjJyxcclxuXHRzY3JvbGw6IGZhbHNlLFxyXG59O1xyXG5cclxuLyoqXHJcbiAqIFN0b3JlcyB0aGUgY29udGFpbmVyIG9iamVjdC5cclxuICpcclxuICogQHZhciBcXENvcmVcXENvbnRhaW5lclxyXG4gKi9cclxubGV0IENvbnRhaW5lciQ1O1xyXG5cclxuLyoqXHJcbiAqIFN0b3JlcyB0aGUgcHJvZHVjdHMgY29tcG9uZW50LlxyXG4gKlxyXG4gKiBAdmFyIFxcQ29tcG9uZW50c1xcUHJvZHVjdHNcclxuICovXHJcbmxldCBQcm9kdWN0cyQyO1xyXG5cclxuLyoqXHJcbiAqIFN0b3JlcyB0aGUgY29udGFpbmVyIG9iamVjdC5cclxuICogXHJcbiAqIEB2YXIgXFxDb3JlXFxFdmVudE1hbmFnZXJcclxuICovXHJcbmxldCBFdmVudE1hbmFnZXIkNjtcclxuXHJcbi8qKlxyXG4gKiBAY2xhc3MgUGFnaW5hdGlvblxyXG4gKlxyXG4gKiBUaGUgUGFnaW5hdGlvbiBjb21wb25lbnQsIGhhbmRsZXMgdGhlIHBhZ2luYXRpb24uXHJcbiAqL1xyXG5cclxuY2xhc3MgUGFnaW5hdGlvbiBleHRlbmRzIEJhc2VDb21wb25lbnRcclxue1xyXG5cdC8qKlxyXG5cdCAqIC0gSW5pdGlhbGl6ZSB0aGUgY29udGFpbmVyIG9iamVjdC5cclxuXHQgKiAtIEluaXRpYWxpemUgdGhlIHByb2R1Y3RzIGNvbXBvbmVudC5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSBcXENvcmVcXENvbnRhaW5lciB8IGNvbnRhaW5lclxyXG5cdCAqIEBwYXJhbSBcXENvbXBvbmVudHNcXFByb2R1Y3RzIHwgcHJvZHVjdHNcclxuXHQgKiBAcGFyYW0gXFxDb21wb25lbnRzXFxTZXJ2aWNlcyB8IHNlcnZpY2VzXHJcblx0ICogQHJldHVybiB2b2lkXHJcblx0ICovXHJcblx0Y29uc3RydWN0b3IoY29udGFpbmVyLCBldmVudHMsIHByb2R1Y3RzID0gbnVsbCwgc2VydmljZXMgPSBudWxsKSBcclxuXHR7XHJcblx0XHRzdXBlcigpO1xyXG5cclxuXHRcdENvbnRhaW5lciQ1ID0gY29udGFpbmVyO1xyXG5cdFx0UHJvZHVjdHMkMiA9IHByb2R1Y3RzO1xyXG5cdFx0RXZlbnRNYW5hZ2VyJDYgPSBldmVudHM7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBTZXR1cCB0aGUgcGFnaW5hdGlvbi5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSBvYmplY3QgfCBzZXR0aW5nc1xyXG5cdCAqIEByZXR1cm4gdm9pZFxyXG5cdCAqL1xyXG5cdHNldHVwKHNldHRpbmdzKVxyXG5cdHtcdFxyXG5cdFx0aWYodHlwZW9mIHNldHRpbmdzICE9ICdvYmplY3QnKSB7XHJcblx0XHRcdHRocm93IG5ldyBJbnZhbGlkQXJndW1lbnRFeGNlcHRpb24kMTtcclxuXHRcdH1cclxuXHJcblx0XHR0aGlzLnNldHRpbmdzID0gQ29tbW9uLmV4dGVuZChkZWZhdWx0U2V0dGluZ3MkNiwgc2V0dGluZ3MpO1xyXG5cdFx0dGhpcy5zZXRDdXJyZW50KDEpO1xyXG5cclxuXHRcdGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCBmdW5jdGlvbigpIHtcdFx0XHJcblx0XHRcdHRoaXMuc2V0RWxlbWVudCh0aGlzLnNldHRpbmdzLmVsZW1lbnQpO1xyXG5cclxuXHRcdFx0Ly8gQXMgYSBmYWxsYmFjayBjaG9vc2UgdGhlIHVzZXIncyBzZXR0aW5ncyBmb3IgdGhlIHRvdGFsIGl0ZW1zIGNvdW50LlxyXG5cdFx0XHR0aGlzLnRvdGFsUGFnZXMgPSB0aGlzLmNhbGN1bGF0ZVRvdGFsUGFnZXModGhpcy5zZXR0aW5ncy5wZXJfcGFnZSwgdGhpcy5zZXR0aW5ncy50b3RhbF9pdGVtcyk7XHJcblx0XHRcdHRoaXMuYnVpbGRQYWdpbmF0aW9uKCk7XHJcblx0XHR9LmJpbmQodGhpcykpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQnVpbGRzIHRoZSBwYWdpbmF0aW9uLlxyXG5cdCAqXHJcblx0ICogQHJldHVybiB2b2lkXHJcblx0ICovXHJcblx0YnVpbGRQYWdpbmF0aW9uKClcclxuXHR7XHJcblx0XHRpZiAodGhpcy5zZXR0aW5ncy5zY3JvbGwgPT0gdHJ1ZSkge1xyXG5cclxuXHRcdFx0d2luZG93Lm9uc2Nyb2xsID0gdGhpcy5tb25pdG9yU2Nyb2xsaW5nLmJpbmQodGhpcyk7XHJcblx0XHRcdHJldHVybjtcclxuXHRcdH0gXHJcblxyXG5cdFx0dGhpcy5saW5rcyA9IHRoaXMuY3JlYXRlTGlua3MoKTtcclxuXHRcdHRoaXMucmVwbGFjZUxpbmtzKHRoaXMubGlua3MpO1xyXG5cdFx0dGhpcy5iaW5kRXZlbnRMaXN0ZW5lcnModGhpcy5saW5rcyk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBTZXRzIHRoZSBlbGVtZW50LlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIHN0cmluZyB8IHNlbGVjdG9yXHJcblx0ICogQHJldHVybiB2b2lkXHJcblx0ICovXHJcblx0c2V0RWxlbWVudChzZWxlY3RvcilcclxuXHR7XHJcblx0XHR0aGlzLmVsZW1lbnQgPSBET00uZmluZChzZWxlY3Rvcik7XHJcblx0XHRcclxuXHRcdERPTS5hZGRDbGFzcyh0aGlzLmVsZW1lbnQsIHRoaXMuc2V0dGluZ3MuY2xhc3MpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogUmVwbGFjZXMgdGhlIGxpbmtzIGluIHRoZSBlbGVtZW50LlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIEhUTUxVTGlzdEVsZW1lbnQgfCBsaW5rc1xyXG5cdCAqIEByZXR1cm4gdm9pZFxyXG5cdCAqL1xyXG5cdHJlcGxhY2VMaW5rcyhsaW5rcylcclxuXHR7XHJcblx0XHR0aGlzLmVsZW1lbnQuaW5uZXJIVE1MID0gJyc7XHJcblx0XHR0aGlzLmVsZW1lbnQuYXBwZW5kQ2hpbGQobGlua3MpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQ2FsY3VsYXRlcyB0aGUgdG90YWwgcGFnZXMuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gbnVtYmVyIHwgcGVyUGFnZVxyXG5cdCAqIEBwYXJhbSBudW1iZXIgfCB0b3RhbEl0ZW1zXHJcblx0ICogQHJldHVybiBudW1iZXJcclxuXHQgKi9cclxuXHRjYWxjdWxhdGVUb3RhbFBhZ2VzKHBlclBhZ2UsIHRvdGFsSXRlbXMpXHJcblx0e1xyXG5cdFx0cGVyUGFnZSA9IHBhcnNlSW50KHBlclBhZ2UpO1xyXG5cdFx0dG90YWxJdGVtcyA9IHBhcnNlSW50KHRvdGFsSXRlbXMpO1xyXG5cclxuXHRcdHJldHVybiBNYXRoLmNlaWwodG90YWxJdGVtcyAvIHBlclBhZ2UpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogTGlzdGVuIHRvIHNjcm9sbCBldmVudC5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSBcclxuXHQgKiBAcmV0dXJuIHZvaWRcclxuXHQgKi9cclxuXHRtb25pdG9yU2Nyb2xsaW5nKGV2ZW50KVxyXG5cdHtcclxuXHRcdGxldCBjdXJyZW50WU9mZnNldCA9IERPTS5zY3JvbGxZT2Zmc2V0KCk7XHJcblx0XHRsZXQgZG9jdW1lbnRIZWlnaHQgPSBET00uZG9jdW1lbnRIZWlnaHQoKTtcclxuXHRcdGxldCB3aW5kb3dIZWlnaHQgPSBET00ud2luZG93SGVpZ2h0KCk7XHJcblxyXG5cdFx0aWYgKChkb2N1bWVudEhlaWdodC13aW5kb3dIZWlnaHQpIC0gY3VycmVudFlPZmZzZXQgPD0gNTApIHtcclxuXHRcdFx0bGV0IHJlcXVlc3RlZFBhZ2UgPSB0aGlzLmN1cnJlbnQrMTtcclxuXHJcblx0XHRcdGlmIChQcm9kdWN0cyQyICYmIFByb2R1Y3RzJDIuYm9vdGVkKSB7XHJcblx0XHRcdFx0UHJvZHVjdHMkMi5sb2FkUHJvZHVjdHMocmVxdWVzdGVkUGFnZSwgdHJ1ZSkudGhlbihmdW5jdGlvbihwcm9kdWN0cykge1xyXG5cdFx0XHRcdFx0aWYgKHByb2R1Y3RzKSB7XHJcblx0XHRcdFx0XHRcdHRoaXMuc2V0Q3VycmVudChyZXF1ZXN0ZWRQYWdlKTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9LmJpbmQodGhpcykpO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBCaW5kcyB0aGUgYnV0dG9ucyBldmVudHMgbGlzdGVuZXJzLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIEhUTUxVTGlzdEVsZW1lbnQgfCBsaW5rc1xyXG5cdCAqIEByZXR1cm4gdm9pZFxyXG5cdCAqL1xyXG5cdGJpbmRFdmVudExpc3RlbmVycyhsaW5rcykgXHJcblx0e1xyXG5cdFx0bGV0IGluc3RhbmNlID0gdGhpcztcclxuXHJcblx0XHR0aGlzLm5leHQuY2hpbGROb2Rlc1swXS5vbmNsaWNrID0gZnVuY3Rpb24oZSkge1xyXG5cdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG5cdFx0XHRsZXQgcmVxdWVzdGVkUGFnZSA9IGluc3RhbmNlLmN1cnJlbnQrMTtcclxuXHJcblx0XHRcdGlmIChpbnN0YW5jZS5ub3RJblBhZ2VSYW5nZShyZXF1ZXN0ZWRQYWdlKSkge1xyXG5cdFx0XHRcdHRocm93IG5ldyBOb3RJblBhZ2VSYW5nZUV4Y2VwdGlvbignVGhlIHBhZ2UgeW91IHJlcXVlc3RpbmcgZG9lcyBub3QgZXhpc3RzJyk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGlmIChQcm9kdWN0cyQyICYmIFByb2R1Y3RzJDIuYm9vdGVkKSB7XHJcblx0XHRcdFx0UHJvZHVjdHMkMi5sb2FkUHJvZHVjdHMocmVxdWVzdGVkUGFnZSkudGhlbihmdW5jdGlvbihwcm9kdWN0cykge1xyXG5cdFx0XHRcdFx0aW5zdGFuY2Uuc2V0Q3VycmVudChyZXF1ZXN0ZWRQYWdlKTtcclxuXHRcdFx0XHR9KTtcclxuXHRcdFx0fVxyXG5cdFx0fTtcclxuXHJcblx0XHR0aGlzLnByZXZpb3VzLmNoaWxkTm9kZXNbMF0ub25jbGljayA9IGZ1bmN0aW9uKGUpIHtcclxuXHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuXHRcdFx0bGV0IHJlcXVlc3RlZFBhZ2UgPSBpbnN0YW5jZS5jdXJyZW50LTE7XHJcblxyXG5cdFx0XHRpZihpbnN0YW5jZS5ub3RJblBhZ2VSYW5nZShyZXF1ZXN0ZWRQYWdlKSkge1xyXG5cdFx0XHRcdHRocm93IG5ldyBOb3RJblBhZ2VSYW5nZUV4Y2VwdGlvbignVGhlIHBhZ2UgeW91IHJlcXVlc3RpbmcgZG9lcyBub3QgZXhpc3RzJyk7XHJcblx0XHRcdH1cclxuXHRcdFx0XHJcblx0XHRcdGlmIChQcm9kdWN0cyQyICYmIFByb2R1Y3RzJDIuYm9vdGVkKSB7XHJcblx0XHRcdFx0UHJvZHVjdHMkMi5sb2FkUHJvZHVjdHMocmVxdWVzdGVkUGFnZSkudGhlbihmdW5jdGlvbihwcm9kdWN0cykge1xyXG5cdFx0XHRcdFx0aW5zdGFuY2Uuc2V0Q3VycmVudChyZXF1ZXN0ZWRQYWdlKTtcclxuXHRcdFx0XHR9KTtcclxuXHRcdFx0fVxyXG5cdFx0fTtcclxuXHJcblx0XHRmb3IodmFyIGkgPSAwOyBpIDwgdGhpcy5wYWdlcy5sZW5ndGg7IGkrKykge1xyXG5cdFx0XHR0aGlzLnBhZ2VzW2ldLmNoaWxkTm9kZXNbMF0ub25jbGljayA9IGZ1bmN0aW9uKGUpIHtcclxuXHRcdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XHJcblx0XHRcdFx0XHJcblx0XHRcdFx0bGV0IHJlcXVlc3RlZFBhZ2UgPSB0aGlzLmdldEF0dHJpYnV0ZSgnZGF0YS1wYWdlLW5yJyk7XHJcblx0XHRcdFx0XHJcblx0XHRcdFx0aWYgKFByb2R1Y3RzJDIgJiYgUHJvZHVjdHMkMi5ib290ZWQpIHtcclxuXHRcdFx0XHRcdFByb2R1Y3RzJDIubG9hZFByb2R1Y3RzKHJlcXVlc3RlZFBhZ2UpLnRoZW4oZnVuY3Rpb24ocHJvZHVjdHMpIHtcclxuXHRcdFx0XHRcdFx0aW5zdGFuY2Uuc2V0Q3VycmVudChyZXF1ZXN0ZWRQYWdlKTtcclxuXHRcdFx0XHRcdH0pO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFNldHMgdGhlIGN1cnJlbnQgcGFnZS5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSBudW1iZXIgfCBwYWdlTnVtYmVyXHJcblx0ICogQHJldHVybiB2b2lkXHJcblx0ICovXHJcblx0c2V0Q3VycmVudChwYWdlTnVtYmVyKSBcclxuXHR7XHJcblx0XHR0aGlzLmN1cnJlbnQgPSBwYXJzZUludChwYWdlTnVtYmVyKTtcclxuXHRcdHRoaXMuY2hhbmdlVXJsKHBhZ2VOdW1iZXIpO1xyXG5cdFx0dGhpcy5zZXRBY3RpdmVMaW5rKHBhZ2VOdW1iZXIpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogR2V0cyB0aGUgY3VycmVudCBwYWdlLlxyXG5cdCAqXHJcblx0ICogQHJldHVybiBudW1iZXJcclxuXHQgKi9cclxuXHRnZXRDdXJyZW50KCkgXHJcblx0e1xyXG5cdFx0cmV0dXJuIHRoaXMuY3VycmVudDtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIENyZWF0ZXMgdGhlIHBhZ2luYXRpb24gbGlua3MuXHJcblx0ICpcclxuXHQgKiBAcmV0dXJuIEhUTUxVTGlzdEVsZW1lbnRcclxuXHQgKi9cclxuXHRjcmVhdGVMaW5rcygpIFxyXG5cdHtcclxuXHRcdGxldCB1bCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3VsJyk7XHJcblx0XHRcclxuXHRcdHRoaXMucGFnZXMgPSB0aGlzLmNyZWF0ZVBhZ2VMaW5rcygpO1xyXG5cdFx0dGhpcy5wcmV2aW91cyA9IHRoaXMuY3JlYXRlUHJldmlvdXNCdXR0b24oKTtcclxuXHRcdHRoaXMubmV4dCA9IHRoaXMuY3JlYXRlTmV4dEJ1dHRvbigpO1xyXG5cclxuXHRcdHVsLmNsYXNzTmFtZSA9ICdwYWdpbmF0aW9uJztcclxuXHRcdHVsLmFwcGVuZENoaWxkKHRoaXMucHJldmlvdXMpO1xyXG5cclxuXHRcdHRoaXMucGFnZXMuZm9yRWFjaChmdW5jdGlvbihwYWdlKSB7XHJcblx0XHRcdHVsLmFwcGVuZENoaWxkKHBhZ2UpO1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0dWwuYXBwZW5kQ2hpbGQodGhpcy5uZXh0KTtcclxuXHJcblx0XHRyZXR1cm4gdWw7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBDcmVhdGVzIHRoZSBwYWdlcyBpdGVtIGxpbmtzLlxyXG5cdCAqXHJcblx0ICogQHJldHVybiBhcnJheTxIVE1MTElFbGVtZW50PlxyXG5cdCAqL1xyXG5cdGNyZWF0ZVBhZ2VMaW5rcygpIFxyXG5cdHtcclxuXHRcdHZhciBwYWdlcyA9IFtdO1xyXG5cclxuXHRcdGZvcih2YXIgaSA9IDE7IGkgPD0gdGhpcy50b3RhbFBhZ2VzOyBpKyspIHtcclxuXHRcdFx0dmFyIHBhZ2VJdGVtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKTtcclxuXHRcdFx0dmFyIGxpbmsgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJyk7XHJcblx0XHRcdHBhZ2VJdGVtLmNsYXNzTmFtZSA9ICh0aGlzLmN1cnJlbnQgPT0gaSkgPyAncGFnZS1pdGVtIGFjdGl2ZScgOiAncGFnZS1pdGVtJztcclxuXHRcdFx0bGluay5jbGFzc05hbWUgPSAncGFnZS1saW5rJztcclxuXHRcdFx0bGluay5zZXRBdHRyaWJ1dGUoJ2hyZWYnLCAnP3BhZ2U9JysgaSk7XHJcblx0XHRcdGxpbmsuc2V0QXR0cmlidXRlKCdkYXRhLXBhZ2UtbnInLCBpKTtcclxuXHRcdFx0bGluay5pbm5lckhUTUwgPSBpO1xyXG5cdFx0XHRwYWdlSXRlbS5hcHBlbmRDaGlsZChsaW5rKTtcclxuXHRcdFx0cGFnZXMucHVzaChwYWdlSXRlbSk7XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIHBhZ2VzO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQ3JlYXRlcyB0aGUgcHJldmlvdXMgYnV0dG9uIGxpbmsuXHJcblx0ICpcclxuXHQgKiBAcmV0dXJuIEhUTUxMSUVsZW1lbnRcclxuXHQgKi9cclxuXHRjcmVhdGVQcmV2aW91c0J1dHRvbigpIFxyXG5cdHtcclxuXHRcdHZhciBsaSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJyk7XHJcblx0XHR2YXIgbGluayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKTtcclxuXHRcdHZhciBzcGFuMSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcclxuXHRcdHZhciBzcGFuMiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcclxuXHRcdFxyXG5cdFx0XHJcblx0XHRsaS5jbGFzc05hbWUgPSAncGFnZS1pdGVtJztcclxuXHRcdGxpbmsuY2xhc3NOYW1lID0gJ3BhZ2UtbGluayc7XHJcblx0XHRzcGFuMi5jbGFzc05hbWUgPSAnc3Itb25seSc7XHJcblxyXG5cdFx0bGluay5zZXRBdHRyaWJ1dGUoJ2hyZWYnLCAnJyk7XHJcblx0XHRsaW5rLnNldEF0dHJpYnV0ZSgnYXJpYS1sYWJlbCcsICdQcmV2aW91cycpO1xyXG5cdFx0c3BhbjEuc2V0QXR0cmlidXRlKCdhcmlhLWhpZGRlbicsICd0cnVlJyk7XHJcblxyXG5cdFx0c3BhbjEuaW5uZXJIVE1MID0gJyZsYXF1bzsnO1xyXG5cdFx0c3BhbjIuaW5uZXJIVE1MID0gJ1ByZXZpb3VzJztcclxuXHJcblx0XHRsaW5rLmFwcGVuZENoaWxkKHNwYW4xKTtcclxuXHRcdGxpbmsuYXBwZW5kQ2hpbGQoc3BhbjIpO1xyXG5cdFx0bGkuYXBwZW5kQ2hpbGQobGluayk7XHJcblxyXG5cdFx0cmV0dXJuIGxpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQ3JlYXRlcyB0aGUgbmV4dCBidXR0b24gbGluay5cclxuXHQgKlxyXG5cdCAqIEByZXR1cm4gSFRNTExJRWxlbWVudFxyXG5cdCAqL1xyXG5cdGNyZWF0ZU5leHRCdXR0b24oKSBcclxuXHR7XHJcblx0XHR2YXIgbGkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaScpO1xyXG5cdFx0dmFyIGxpbmsgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJyk7XHJcblx0XHR2YXIgc3BhbjEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XHJcblx0XHR2YXIgc3BhbjIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XHJcblx0XHRcclxuXHRcdGxpLmNsYXNzTmFtZSA9ICdwYWdlLWl0ZW0nO1xyXG5cdFx0bGluay5jbGFzc05hbWUgPSAncGFnZS1saW5rJztcclxuXHRcdHNwYW4yLmNsYXNzTmFtZSA9ICdzci1vbmx5JztcclxuXHJcblx0XHRsaW5rLnNldEF0dHJpYnV0ZSgnaHJlZicsICcnKTtcclxuXHRcdGxpbmsuc2V0QXR0cmlidXRlKCdhcmlhLWxhYmVsJywgJ05leHQnKTtcclxuXHRcdHNwYW4xLnNldEF0dHJpYnV0ZSgnYXJpYS1oaWRkZW4nLCAndHJ1ZScpO1xyXG5cclxuXHRcdHNwYW4xLmlubmVySFRNTCA9ICcmcmFxdW87JztcclxuXHRcdHNwYW4yLmlubmVySFRNTCA9ICdOZXh0JztcclxuXHJcblx0XHRsaW5rLmFwcGVuZENoaWxkKHNwYW4xKTtcclxuXHRcdGxpbmsuYXBwZW5kQ2hpbGQoc3BhbjIpO1xyXG5cdFx0bGkuYXBwZW5kQ2hpbGQobGluayk7XHJcblxyXG5cdFx0cmV0dXJuIGxpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQ2hlY2tzIGlmIHRoZSBnaXZlbiBwYWdlIGlzIGluIHJhbmdlLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIG51bWJlciB8IHBhZ2VOdW1iZXJcclxuXHQgKiBAcmV0dXJuIGJvb2xcclxuXHQgKi9cclxuXHRub3RJblBhZ2VSYW5nZShwYWdlTnVtYmVyKSBcclxuXHR7XHJcblx0XHRyZXR1cm4gKHBhZ2VOdW1iZXIgPiB0aGlzLnRvdGFsUGFnZXMgfHwgcGFnZU51bWJlciA8PSAwKSB8fCBpc05hTihwYWdlTnVtYmVyKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIENoYW5nZXMgdGhlIHVybCB0byBhIGdpdmVuIHBhZ2UgbnVtYmVyLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIG51bWJlciB8IHBhZ2VOdW1iZXJcclxuXHQgKiBAcmV0dXJuIHZvaWRcclxuXHQgKi9cclxuXHRjaGFuZ2VVcmwocGFnZU51bWJlcikgXHJcblx0e1xyXG5cdFx0VXJsLmNoYW5nZVBhcmFtZXRlcih0aGlzLnNldHRpbmdzLnVybF9wYXJhbWV0ZXIsIHBhZ2VOdW1iZXIsIHRoaXMuc2V0dGluZ3Muc2VwYXJhdG9yKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFNldHMgdGhlIGFjdGl2ZSBsaW5rLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIG51bWJlciB8IHBhZ2VOdW1iZXJcclxuXHQgKiBAcmV0dXJuIHZvaWRcclxuXHQgKi9cclxuXHRzZXRBY3RpdmVMaW5rKHBhZ2VOdW1iZXIpXHJcblx0e1xyXG5cdFx0Zm9yKHZhciBwYWdlIGluIHRoaXMucGFnZXMpIHtcclxuXHRcdFx0aWYgKHRoaXMucGFnZXNbcGFnZV0uY2hpbGROb2Rlc1swXS5nZXRBdHRyaWJ1dGUoJ2RhdGEtcGFnZS1ucicpID09IHBhZ2VOdW1iZXIpIHtcclxuXHRcdFx0XHRET00uYWRkQ2xhc3ModGhpcy5wYWdlc1twYWdlXSwgJ2FjdGl2ZScpO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdERPTS5yZW1vdmVDbGFzcyh0aGlzLnBhZ2VzW3BhZ2VdLCAnYWN0aXZlJyk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFJlc2V0cyB0aGUgcGFnaW5hdGlvbi5cclxuXHQgKlxyXG5cdCAqIEByZXR1cm4gdm9pZFxyXG5cdCAqL1xyXG5cdHJlc2V0KCkgXHJcblx0e1xyXG5cdFx0dGhpcy5zZXRDdXJyZW50KDEpO1xyXG5cdFx0dGhpcy5jaGFuZ2VVcmwoMSk7XHJcblx0fVxyXG59XG5cbmxldCBkZWZhdWx0TWVzc2FnZSQ1ID0gJ0luIG9yZGVyIHRvIHVzZSBjb21wb25lbnRzIHlvdSBtdXN0IHJlZ2lzdGVyIHRoZW0gd2l0aCB0aGUgc2hvcCEnOyBcclxuXHJcbmNsYXNzIENvbXBvbmVudE5vdFJlZ2lzdGVyZWRFeGNlcHRpb24gZXh0ZW5kcyBFeGNlcHRpb25IYW5kbGVyXHJcbntcclxuXHRjb25zdHJ1Y3RvcihtZXNzYWdlID0gbnVsbCkgXHJcblx0e1xyXG5cdFx0bWVzc2FnZSA9IG1lc3NhZ2UgfHwgZGVmYXVsdE1lc3NhZ2UkNTtcclxuXHRcdHN1cGVyKG1lc3NhZ2UpO1xyXG4gICAgXHRzdXBlci5zdGFja1RyYWNlKHRoaXMsIG1lc3NhZ2UpO1xyXG4gICAgfVxyXG59XG5cbi8vIENvbXBvbmVudHNcclxuLy8gSGVscGVyc1xyXG4vLyBFeGNlcHRpb25zXHJcbmNsYXNzIENvbXBvbmVudHNQcm92aWRlclxyXG57XHJcblx0LyoqXHJcblx0ICogLSBTZXQgdGhlIGNvbnRhaW5lciBhcyBhIG1lbWJlci5cclxuXHQgKiAtIGRlY2xhcmUgdGhlIGNvbXBvbmVudHMuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gXFxDb3JlXFxDb250YWluZXIgfCBjb250YWluZXJcclxuXHQgKiBAcmV0dXJuIHZvaWRcclxuXHQgKi9cclxuXHRjb25zdHJ1Y3Rvcihjb250YWluZXIpXHJcblx0e1xyXG5cdFx0dGhpcy5jb250YWluZXIgPSBjb250YWluZXI7XHJcblxyXG5cdFx0dGhpcy5jb21wb25lbnRzID0ge307XHJcblx0XHR0aGlzLmNvbXBvbmVudHMuRmlsdGVyID0ge307XHJcblx0XHR0aGlzLmNvbXBvbmVudHMuU2VydmljZXMgPSB7fTtcclxuXHRcdHRoaXMuY29tcG9uZW50cy5Qcm9kdWN0cyA9IHt9O1xyXG5cdFx0dGhpcy5jb21wb25lbnRzLlBhZ2luYXRpb24gPSB7fTtcclxuXHRcdHRoaXMuY29tcG9uZW50cy5DYXJ0ID0ge307XHJcblx0XHR0aGlzLmNvbXBvbmVudHMuQ2hlY2tvdXQgPSB7fTtcclxuXHRcdHRoaXMuY29tcG9uZW50cy5EZXRhaWxzID0ge307XHJcblx0fVxyXG5cclxuICAgLyoqXHJcblx0KiBSZWdpc3RlcnMgdGhlIGNvbXBvbmVudHMuXHJcblx0KlxyXG5cdCogQHBhcmFtIG9iamVjdCB8IGNvbXBvbmVudHNcclxuXHQqIEByZXR1cm4gdm9pZFxyXG5cdCovXHJcblx0cmVnaXN0ZXIoY29tcG9uZW50cylcclxuXHR7XHJcblx0XHR0aGlzLmF2YWlsYWJsZSA9IGNvbXBvbmVudHM7XHJcblx0XHR0aGlzLmJvb3RlZCA9IFtdO1xyXG5cdCBcdHRoaXMuY29tcG9uZW50cy5GaWx0ZXIuYm9vdGVkID0gZmFsc2U7XHJcblx0XHR0aGlzLmNvbXBvbmVudHMuU2VydmljZXMuYm9vdGVkID0gZmFsc2U7XHJcblx0XHR0aGlzLmNvbXBvbmVudHMuUHJvZHVjdHMuYm9vdGVkID0gZmFsc2U7XHJcblx0XHR0aGlzLmNvbXBvbmVudHMuUGFnaW5hdGlvbi5ib290ZWQgPSBmYWxzZTtcclxuXHRcdHRoaXMuY29tcG9uZW50cy5DYXJ0LmJvb3RlZCA9IGZhbHNlO1xyXG5cdFx0dGhpcy5jb21wb25lbnRzLkNoZWNrb3V0LmJvb3RlZCA9IGZhbHNlO1xyXG5cdFx0dGhpcy5jb21wb25lbnRzLkRldGFpbHMuYm9vdGVkID0gZmFsc2U7XHJcblxyXG5cdFx0bGV0IGluc3RhbmNlID0gdGhpcztcclxuXHJcblx0XHR0aGlzLmNvbnRhaW5lci5iaW5kKCdGaWx0ZXInLCBmdW5jdGlvbihjb250YWluZXIsIGNvbXBvbmVudCkge1xyXG5cdFx0XHRpbnN0YW5jZS5jb21wb25lbnRzW2NvbXBvbmVudF0gPSBuZXcgRmlsdGVyKGNvbnRhaW5lcik7XHJcblx0XHRcdGluc3RhbmNlLmNvbXBvbmVudHNbY29tcG9uZW50XS5ib290ZWQgPSB0cnVlO1xyXG5cdFx0XHRpbnN0YW5jZS5ib290ZWQucHVzaChpbnN0YW5jZS5jb21wb25lbnRzW2NvbXBvbmVudF0pO1xyXG5cdFx0XHRyZXR1cm4gaW5zdGFuY2UuY29tcG9uZW50c1tjb21wb25lbnRdO1xyXG5cdFx0fSwgJ2NvbXBvbmVudHMnKTtcclxuXHRcdFxyXG5cdFx0dGhpcy5jb250YWluZXIuYmluZCgnU2VydmljZXMnLCBmdW5jdGlvbihjb250YWluZXIsIGNvbXBvbmVudCkgeyBcclxuXHRcdFx0aW5zdGFuY2UuY29tcG9uZW50c1tjb21wb25lbnRdID0gbmV3IFNlcnZpY2VzKGNvbnRhaW5lcik7XHJcblx0XHRcdGluc3RhbmNlLmNvbXBvbmVudHNbY29tcG9uZW50XS5ib290ZWQgPSB0cnVlO1xyXG5cdFx0XHRpbnN0YW5jZS5ib290ZWQucHVzaChpbnN0YW5jZS5jb21wb25lbnRzW2NvbXBvbmVudF0pO1xyXG5cdFx0XHRyZXR1cm4gaW5zdGFuY2UuY29tcG9uZW50c1tjb21wb25lbnRdO1xyXG5cdFx0fSwgJ2NvbXBvbmVudHMnKTtcclxuXHJcblx0XHR0aGlzLmNvbnRhaW5lci5iaW5kKCdQcm9kdWN0cycsIGZ1bmN0aW9uKGNvbnRhaW5lciwgY29tcG9uZW50KSB7XHJcblx0XHRcdGluc3RhbmNlLmNvbXBvbmVudHNbY29tcG9uZW50XSA9IG5ldyBQcm9kdWN0cyhjb250YWluZXIsIGNvbnRhaW5lci5SZXF1ZXN0LCBjb250YWluZXIuRXZlbnRzKTtcclxuXHRcdFx0aW5zdGFuY2UuY29tcG9uZW50c1tjb21wb25lbnRdLmJvb3RlZCA9IHRydWU7XHJcblx0XHRcdGluc3RhbmNlLmJvb3RlZC5wdXNoKGluc3RhbmNlLmNvbXBvbmVudHNbY29tcG9uZW50XSk7XHJcblx0XHRcdHJldHVybiBpbnN0YW5jZS5jb21wb25lbnRzW2NvbXBvbmVudF07XHJcblx0XHR9LCAnY29tcG9uZW50cycpO1xyXG5cclxuXHRcdHRoaXMuY29udGFpbmVyLmJpbmQoJ1BhZ2luYXRpb24nLCBmdW5jdGlvbihjb250YWluZXIsIGNvbXBvbmVudCkge1xyXG5cdFx0XHRsZXQgcHJvZHVjdHMgPSAoaW5zdGFuY2UuZXhpc3RzKCdQcm9kdWN0cycpKSA/IChpbnN0YW5jZS5jb21wb25lbnRzWydQcm9kdWN0cyddKSA6IG51bGw7IFxyXG5cdFx0XHRsZXQgc2VydmljZXMgPSAoaW5zdGFuY2UuZXhpc3RzKCdTZXJ2aWNlcycpKSA/IChpbnN0YW5jZS5jb21wb25lbnRzWydTZXJ2aWNlcyddKSA6IG51bGw7IFxyXG5cdFx0XHRpbnN0YW5jZS5jb21wb25lbnRzW2NvbXBvbmVudF0gPSBuZXcgUGFnaW5hdGlvbihjb250YWluZXIsIGNvbnRhaW5lci5FdmVudHMsIHByb2R1Y3RzLCBzZXJ2aWNlcyk7XHJcblx0XHRcdGluc3RhbmNlLmNvbXBvbmVudHNbY29tcG9uZW50XS5ib290ZWQgPSB0cnVlO1xyXG5cdFx0XHRpbnN0YW5jZS5ib290ZWQucHVzaChpbnN0YW5jZS5jb21wb25lbnRzW2NvbXBvbmVudF0pO1xyXG5cdFx0XHRyZXR1cm4gaW5zdGFuY2UuY29tcG9uZW50c1tjb21wb25lbnRdO1xyXG5cdFx0fSwgJ2NvbXBvbmVudHMnKTtcclxuXHJcblx0XHR0aGlzLmNvbnRhaW5lci5iaW5kKCdDYXJ0JywgZnVuY3Rpb24oY29udGFpbmVyLCBjb21wb25lbnQpIHtcclxuXHRcdFx0aW5zdGFuY2UuY29tcG9uZW50c1tjb21wb25lbnRdID0gbmV3IENhcnQoY29udGFpbmVyLCBjb250YWluZXIuUmVxdWVzdCwgY29udGFpbmVyLkV2ZW50cyk7XHJcblx0XHRcdGluc3RhbmNlLmNvbXBvbmVudHNbY29tcG9uZW50XS5ib290ZWQgPSB0cnVlO1xyXG5cdFx0XHRpbnN0YW5jZS5ib290ZWQucHVzaChpbnN0YW5jZS5jb21wb25lbnRzW2NvbXBvbmVudF0pO1xyXG5cdFx0XHRyZXR1cm4gaW5zdGFuY2UuY29tcG9uZW50c1tjb21wb25lbnRdO1xyXG5cdFx0fSwgJ2NvbXBvbmVudHMnKTtcclxuXHJcblx0XHR0aGlzLmNvbnRhaW5lci5iaW5kKCdDaGVja291dCcsIGZ1bmN0aW9uKGNvbnRhaW5lciwgY29tcG9uZW50KSB7XHJcblx0XHRcdGluc3RhbmNlLmNvbXBvbmVudHNbY29tcG9uZW50XSA9IG5ldyBDaGVja291dChjb250YWluZXIsIGNvbnRhaW5lci5SZXF1ZXN0LCBjb250YWluZXIuRXZlbnRzKTtcclxuXHRcdFx0aW5zdGFuY2UuY29tcG9uZW50c1tjb21wb25lbnRdLmJvb3RlZCA9IHRydWU7XHJcblx0XHRcdGluc3RhbmNlLmJvb3RlZC5wdXNoKGluc3RhbmNlLmNvbXBvbmVudHNbY29tcG9uZW50XSk7XHJcblx0XHRcdHJldHVybiBpbnN0YW5jZS5jb21wb25lbnRzW2NvbXBvbmVudF07XHJcblx0XHR9LCAnY29tcG9uZW50cycpO1xyXG5cclxuXHRcdHRoaXMuY29udGFpbmVyLmJpbmQoJ0RldGFpbHMnLCBmdW5jdGlvbihjb250YWluZXIsIGNvbXBvbmVudCkge1xyXG5cdFx0XHRpbnN0YW5jZS5jb21wb25lbnRzW2NvbXBvbmVudF0gPSBuZXcgRGV0YWlscyhjb250YWluZXIsIGNvbnRhaW5lci5SZXF1ZXN0LCBjb250YWluZXIuRXZlbnRzKTtcclxuXHRcdFx0aW5zdGFuY2UuY29tcG9uZW50c1tjb21wb25lbnRdLmJvb3RlZCA9IHRydWU7XHJcblx0XHRcdGluc3RhbmNlLmJvb3RlZC5wdXNoKGluc3RhbmNlLmNvbXBvbmVudHNbY29tcG9uZW50XSk7XHJcblx0XHRcdHJldHVybiBpbnN0YW5jZS5jb21wb25lbnRzW2NvbXBvbmVudF07XHJcblx0XHR9LCAnY29tcG9uZW50cycpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogUHJvdmlkZSBhIHJlZ2lzdGVyZWQgY29tcG9uZW50LlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIHN0cmluZyB8IGNvbXBvbmVudFxyXG5cdCAqIEByZXR1cm4gb2JqZWN0XHJcblx0ICovXHJcblx0cHJvdmlkZShjb21wb25lbnQpXHJcblx0e1xyXG5cdFx0aWYgKENvbW1vbi5pbl9hcnJheShjb21wb25lbnQsIHRoaXMuYXZhaWxhYmxlKSkge1xyXG5cdFx0XHRyZXR1cm4gdGhpcy5jb250YWluZXIubWFrZShjb21wb25lbnQpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHRocm93IG5ldyBDb21wb25lbnROb3RSZWdpc3RlcmVkRXhjZXB0aW9uKCdjb21wb25lbnRzIG11c3QgYmUgcmVnaXN0ZXJlZCBpbiBvcmRlciB0byB1c2UgdGhlbS4nKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIENoZWNrcyBpZiBjb21wb25lbnQgZXhpc3RzLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIHN0cmluZyB8IG5hbWVcclxuXHQgKiBAcmV0dXJuIGJvb2xcclxuXHQgKi9cclxuXHRleGlzdHMobmFtZSlcclxuXHR7XHJcblx0XHRyZXR1cm4gdGhpcy5jb21wb25lbnRzLmhhc093blByb3BlcnR5KG5hbWUpO1xyXG5cdH1cclxufVxuXG5sZXQgZGVmYXVsdE1lc3NhZ2UkNiA9ICdUcnlpbmcgdG8gYmluZCBhbiBhbHJlYWR5IGV4aXN0aW5nIGJvdW5kLic7XHJcblxyXG5jbGFzcyBJbnZhbGlkQmluZGluZ0V4Y2VwdGlvbiBleHRlbmRzIEV4Y2VwdGlvbkhhbmRsZXJcclxue1xyXG5cdGNvbnN0cnVjdG9yKG1lc3NhZ2UgPSBudWxsKSBcclxuXHR7XHJcblx0XHRtZXNzYWdlID0gbWVzc2FnZSB8fCBkZWZhdWx0TWVzc2FnZSQ2O1xyXG5cdFx0c3VwZXIobWVzc2FnZSk7XHJcbiAgICBcdHN1cGVyLnN0YWNrVHJhY2UodGhpcywgbWVzc2FnZSk7XHJcbiAgICB9XHJcbn1cblxuLy8gSGVscGVyc1xyXG4vLyBDb3JlXHJcbi8vIEV4Y2VwdGlvbnNcclxuLyoqXHJcbiAqIEBmaWxlIFxyXG4gKiBDb250YWluZXIgY2xhc3MuXHJcbiAqXHJcbiAqIEhhbmRsZXMvQ29udHJvbHMgdGhlIGRlcGVuZGVuY2llcyBvZiBlY29tbWVyY2UuXHJcbiAqL1xyXG5cclxuY2xhc3MgQ29udGFpbmVyJDYgXHJcbntcclxuXHQvKipcclxuXHQgKiAtIEluaXRpYWxpemUgaW5zdGFuY2VzIG1lbWJlci5cclxuXHQgKiAtIFJlZ2lzdGVyIGJpbmRpbmdzLlxyXG5cdCAqXHJcblx0ICogQHJldHVybiB2b2lkXHJcblx0ICovXHJcblx0Y29uc3RydWN0b3IoKVxyXG5cdHtcclxuXHRcdHRoaXMuaW5zdGFuY2VzID0gW107XHJcblx0XHR0aGlzLnJlZ2lzdGVyKCk7XHJcblx0XHR0aGlzLnJlZ2lzdGVyUHJvdmlkZXJzKCk7XHJcblx0XHR0aGlzLnJlZ2lzdGVyUm91dGVyKCk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBCaW5kcyBrZXkgdG8gY29uY3JldGUgY2xhc3MuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gc3RyaW5nIHwga2V5XHJcblx0ICogQHBhcmFtIGNsYXNzIHwgY29uY3JldGVcclxuXHQgKiBAcmV0dXJuIHZvaWRcclxuXHQgKi9cclxuXHRiaW5kKGtleSwgY29uY3JldGUsIG5hbWVzcGFjZSA9IG51bGwpIFxyXG5cdHtcclxuXHRcdGlmICh0eXBlb2Yga2V5ICE9ICdzdHJpbmcnKSB7XHJcblx0XHRcdHRocm93IG5ldyBJbnZhbGlkQXJndW1lbnRFeGNlcHRpb24kMSgnYmluZCgpIGV4cGVjdHMgdGhlIGZpcnN0IHBhcmFtZXRlciB0byBiZSBzdHJpbmcsIGJ1dCAnICsgdHlwZW9mIGtleSArICcgd2FzIHBhc3NlZCBpbnN0ZWFkLicpO1xyXG5cdFx0fVxyXG5cclxuXHRcdGlmICh0eXBlb2YgY29uY3JldGUgIT0gJ2Z1bmN0aW9uJykgeyBcclxuXHRcdFx0dGhyb3cgbmV3IEludmFsaWRBcmd1bWVudEV4Y2VwdGlvbiQxKCdiaW5kKCkgZXhwZWN0cyB0aGUgc2Vjb25kIHBhcmFtZXRlciB0byBiZSBhIGZ1bmN0aW9uLCBidXQgJyArIHR5cGVvZiBjb25jcmV0ZSArICcgd2FzIHBhc3NlZCBpbnN0ZWFkLicpO1xyXG5cdFx0fVxyXG5cclxuXHRcdGlmIChuYW1lc3BhY2UpIHtcclxuXHRcdFx0aWYgKHR5cGVvZiB0aGlzW25hbWVzcGFjZV0gPT0gJ3VuZGVmaW5lZCcpIHtcclxuXHRcdFx0XHR0aGlzW25hbWVzcGFjZV0gPSB7fTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0dGhpc1tuYW1lc3BhY2VdW2tleV0gPSBjb25jcmV0ZS5iaW5kKGNvbmNyZXRlLCB0aGlzLCBrZXkpO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0dGhpc1trZXldID0gY29uY3JldGUuYmluZChjb25jcmV0ZSwgdGhpcywga2V5KTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFNldHMgYW4gaW5zdGFuY2UuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gc3RyaW5nIHwga2V5XHJcblx0ICogQHBhcmFtIG9iamVjdCB8IGluc3RhbmNlXHJcblx0ICogQHBhcmFtIHN0cmluZyB8IGFsaWFzXHJcblx0ICogQHJldHVybiB2b2lkXHJcblx0ICovXHJcblx0c2V0SW5zdGFuY2Uoa2V5LCBpbnN0YW5jZSwgYWxpYXMgPSBudWxsKSBcclxuXHR7XHJcblx0XHRpZiAodHlwZW9mIGtleSAhPSAnc3RyaW5nJykge1xyXG5cdFx0XHR0aHJvdyBuZXcgSW52YWxpZEFyZ3VtZW50RXhjZXB0aW9uJDEoJ3NldEluc3RhY2UoKSBleHBlY3RzIHRoZSBmaXJzdCBwYXJhbWV0ZXIgdG8gYmUgYSBzdHJpbmcsIGJ1dCAnICsgdHlwZW9mIGtleSArICcgd2FzIHBhc3NlZCBpbnN0ZWFkLicpO1xyXG5cdFx0fVxyXG5cclxuXHRcdGlmICh0eXBlb2YgaW5zdGFuY2UgIT0gJ29iamVjdCcpIHtcclxuXHRcdFx0dGhyb3cgbmV3IEludmFsaWRBcmd1bWVudEV4Y2VwdGlvbiQxKCdzZXRJbnN0YW5jZSgpIGV4cGVjdHMgdGhlIHNlY29uZCBwYXJhbWV0ZXIgdG8gYmUgYW4gb2JqZWN0LCBidXQgJyArIHR5cGVvZiBpbnN0YW5jZSArICcgd2FzIHBhc3NlZCBpbnN0ZWFkLicpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHRoaXMuaW5zdGFuY2VzW2tleV0gPSBpbnN0YW5jZTtcclxuXHRcdHRoaXNba2V5XSA9IGluc3RhbmNlO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogUmVzb2x2ZXMgYW4gaW5zdGFuY2Ugb3V0IG9mIFxyXG5cdCAqIHRoZSBpb2MgY29udGFpbmVyLlxyXG5cdCAqIFxyXG5cdCAqIEBwYXJhbSBzdHJpbmcgfCBrZXlcclxuXHQgKiBAcmV0dXJuIG9iamVjdFxyXG5cdCAqL1xyXG5cdGdldEluc3RhbmNlKGtleSkgXHJcblx0e1xyXG5cdFx0aWYgKHR5cGVvZiBrZXkgIT0gJ3N0cmluZycgJiYgdHlwZW9mIGtleSAhPSAnb2JqZWN0Jykge1xyXG5cdFx0XHR0aHJvdyBuZXcgSW52YWxpZEFyZ3VtZW50RXhjZXB0aW9uJDEoJ2dldEluc3RhY2UoKSBleHBlY3RzIHRoZSBmaXJzdCBwYXJhbWV0ZXIgdG8gYmUgYSBzdHJpbmcsIGJ1dCAnICsgdHlwZW9mIGtleSArICcgd2FzIHBhc3NlZCBpbnN0ZWFkLicpO1xyXG5cdFx0fVxyXG5cclxuXHRcdGlmICh0eXBlb2Yga2V5ID09ICdvYmplY3QnKSB7XHJcblx0XHRcdHJldHVybiB0aGlzLmluc3RhbmNlc1trZXkuY29uc3RydWN0b3IubmFtZV0gfHwgbnVsbDtcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gdGhpcy5pbnN0YW5jZXNba2V5XSB8fCBudWxsO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQ2hlY2tzIGlmIGFuIGluc3RhbmNlIGV4aXN0LlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIG1peGVkIHwgaW5zdGFuY2VcclxuXHQgKiBAcmV0dXJuIGJvb2xcclxuXHQgKi9cclxuXHRpbnN0YW5jZUV4aXN0KGluc3RhbmNlKSBcclxuXHR7XHJcblx0XHRpZiAodHlwZW9mIGluc3RhbmNlID09ICdvYmplY3QnIHx8IHR5cGVvZiBpbnN0YW5jZSA9PSAnc3ltYm9sJykge1xyXG5cdFx0XHRyZXR1cm4gKHR5cGVvZiB0aGlzLmluc3RhbmNlc1tpbnN0YW5jZS5jb25zdHJ1Y3Rvci5uYW1lXSAhPT0gJ3VuZGVmaW5lZCcpO1xyXG5cdFx0fSBlbHNlIGlmICh0eXBlb2YgaW5zdGFuY2UgPT0gJ3N0cmluZycpIHtcclxuXHRcdFx0cmV0dXJuICh0eXBlb2YgdGhpcy5pbnN0YW5jZXNbaW5zdGFuY2VdICE9PSAndW5kZWZpbmVkJylcclxuXHRcdH1cclxuXHRcdFxyXG5cdFx0dGhyb3cgbmV3IEludmFsaWRBcmd1bWVudEV4Y2VwdGlvbiQxKCdpbnN0YW5jZUV4aXN0KCkgZXhwZWN0cyB0aGUgZmlyc3QgcGFyYW1ldGVyIHRvIGJlIHN0cmluZyBvciBhbiBvYmplY3QsIGJ1dCAnICsgdHlwZW9mIGluc3RhbmNlICsgJyB3YXMgcGFzc2VkIGluc3RlYWQuJyk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBSZXRyaWV2ZSBhbiBvYmplY3QsIGlmIG5vdCBleGlzdHNcclxuXHQgKiB3aWxsIGNyZWF0ZSBpdCwgc2V0IGl0IGluIHRoZSBpb2MgY29udGFpbmVyXHJcblx0ICogZm9yIGxhdGVyIHVzZSBhbmQgcmV0cmlldmUgaXQuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gbWl4ZWQgfCBvYmplY3QgXHJcblx0ICogQHJldHVybiBvYmplY3RcclxuXHQgKi9cclxuXHRtYWtlKG9iamVjdClcclxuXHR7XHJcblx0XHRsZXQgaW5zdGFuY2UgPSB7fTtcclxuXHRcdGxldCBrZXk7XHJcblx0XHRcclxuXHRcdGlmICh0aGlzLmluc3RhbmNlRXhpc3Qob2JqZWN0KSkge1xyXG5cdFx0XHRyZXR1cm4gdGhpcy5nZXRJbnN0YW5jZShvYmplY3QpO1xyXG5cdFx0fVxyXG5cclxuXHRcdGlmICh0eXBlb2Ygb2JqZWN0ID09ICdvYmplY3QnKSB7XHJcblx0XHRcdGluc3RhbmNlID0gb2JqZWN0O1xyXG5cdFx0XHRrZXkgPSBvYmplY3QuY29uc3RydWN0b3IubmFtZTtcclxuXHRcdFx0dGhpcy5zZXRJbnN0YW5jZShrZXksIGluc3RhbmNlKTsgXHJcblx0XHR9IGVsc2UgaWYgKHR5cGVvZiBvYmplY3QgPT0gJ3N0cmluZycgJiYgdGhpcy5oYXNPd25Qcm9wZXJ0eShvYmplY3QpKSB7XHJcblx0XHRcdGluc3RhbmNlID0gbmV3IHRoaXNbb2JqZWN0XTtcclxuXHRcdFx0a2V5ID0gb2JqZWN0O1xyXG5cdFx0XHR0aGlzLnNldEluc3RhbmNlKGtleSwgaW5zdGFuY2UpO1x0XHJcblx0XHR9IGVsc2UgaWYgKHR5cGVvZiBvYmplY3QgPT0gJ3N0cmluZycgJiYgdGhpcy5Db21wb25lbnRzLmV4aXN0cyhvYmplY3QpKSB7XHJcblx0XHRcdGluc3RhbmNlID0gbmV3IHRoaXMuY29tcG9uZW50c1tvYmplY3RdO1xyXG5cdFx0XHRrZXkgPSBvYmplY3Q7XHJcblx0XHRcdHRoaXMuc2V0SW5zdGFuY2Uoa2V5LCBpbnN0YW5jZSk7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHR0aHJvdyBuZXcgSW52YWxpZEJpbmRpbmdFeGNlcHRpb24oJ0NvbnRhaW5lci5tYWtlKCkgY291bGQgbm90IGNyZWF0ZSB0aGUgb2JqZWN0IScpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiBpbnN0YW5jZTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFJlbW92ZSBhbGwgZXhpc3RpbmcgaW5zdGFuY2VzLlxyXG5cdCAqXHJcblx0ICogQHJldHVybiB2b2lkIFxyXG5cdCAqL1xyXG5cdGZsdXNoKClcclxuXHR7XHJcblx0XHR0aGlzLmluc3RhbmNlcyA9IFtdO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogUmVnaXN0ZXJzIHRoZSBkZXBlbmRlY2llcy5cclxuXHQgKlxyXG5cdCAqIEByZXR1cm4gdm9pZCBcclxuXHQgKi9cclxuXHRyZWdpc3RlcigpXHJcblx0e1xyXG5cdFx0dGhpcy5zZXRJbnN0YW5jZSgnUmVxdWVzdCcsIG5ldyBSZXF1ZXN0KTtcclxuXHRcdHRoaXMuc2V0SW5zdGFuY2UoJ0V2ZW50cycsIG5ldyBFdmVudE1hbmFnZXIpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogUmVnaXN0ZXJzIHRoZSBwcm92aWRlcnMuXHJcblx0ICpcclxuXHQgKiBAcmV0dXJuIHZvaWQgXHJcblx0ICovXHJcblx0cmVnaXN0ZXJQcm92aWRlcnMoKVxyXG5cdHtcclxuXHRcdHRoaXMuc2V0SW5zdGFuY2UoJ0NvbXBvbmVudHMnLCBuZXcgQ29tcG9uZW50c1Byb3ZpZGVyKHRoaXMpKTtcclxuXHR9XHJcblxyXG5cdHJlZ2lzdGVyUm91dGVyKClcclxuXHR7XHJcblx0XHR0aGlzLnNldEluc3RhbmNlKCdSb3V0ZXInLCBuZXcgUm91dGVyKHRoaXMpKTtcclxuXHR9XHJcbn1cblxuLy8gSGVscGVyc1xyXG4vLyBDb3JlXHJcbi8vIEV4Y2VwdGlvbnNcclxuLyoqXHJcbiAqIFN0b3JlcyB0aGUgZGVmYXVsdCBzZXR0aW5ncy5cclxuICpcclxuICogQHZhciBvYmplY3RcclxuICovXHJcbmxldCBkZWZhdWx0U2V0dGluZ3MkNyA9IHtcclxuXHRkZWJ1Z19sZXZlbDogJ2Vycm9yJyxcclxuXHRlbGVtZW50OiAnYm9keScsXHJcblx0aW5qZWN0X2xpYnJhcmllczogW10sXHJcblx0Y29tcG9uZW50czogWydQcm9kdWN0cycsICdTZXJ2aWNlcycsICdGaWx0ZXInLCAnUGFnaW5hdGlvbicsICdDYXJ0J10sXHJcblx0bG9hZGluZ19hbmltYXRpb246IHRydWUsXHJcblx0aGFzaF9uYXZpZ2F0aW9uOiBmYWxzZSxcclxufTtcclxuXHJcbi8qKlxyXG4gKiBTdG9yZXMgdGhlIG9wdGlvbmFsLCBcclxuICogaW5qZWN0YWJsZSBleHRlcm5hbCBsaWJyYXJpZXMgXHJcbiAqXHJcbiAqIEB2YXIgb2JqZWN0XHJcbiAqL1xyXG5sZXQgZXh0ZXJuYWxMaWJyYXJpZXMgPSB7XHJcblx0Ym9vdHN0cmFwOiAnaHR0cHM6Ly9tYXhjZG4uYm9vdHN0cmFwY2RuLmNvbS9ib290c3RyYXAvMy4zLjcvY3NzL2Jvb3RzdHJhcC5taW4uY3NzJyxcclxufTtcclxuXHJcbmNsYXNzIFR1cmJvRWNvbW1lcmNlXHJcbntcclxuXHQvKipcclxuXHQgKiBUaGUgZW50ZXJ5IGZvciB0aGUgc2hvcC5cclxuXHQgKiAtIFNldHRpbmcgdGhlIGV4Y2VwdGlvbiBoYW5kbGVyLlxyXG5cdCAqIC0gU2V0dGluZyB0aGUgaW9jIGNvbnRhaW5lci5cclxuXHQgKiAtIEV4dGVuZGluZyB0aGUgdXNlciBzZXR0aW5ncy5cclxuXHQgKiAtIFNldHRpbmcgdGhlIGVsZW1lbnQuXHJcblx0ICogLSBEaXNhYmxpbmcgZGVmYXVsdCBlcnJvcnMuXHJcblx0ICogLSBQYXNzaW5nIGNhbGxzIHZpYSBwcm94eSB0byB0aGUgY29tcG9uZW50cy5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSBvYmplY3QgfCBzZXR0aW5nc1xyXG5cdCAqIEByZXR1cm4gUHJveHlcclxuXHQgKi9cclxuXHRjb25zdHJ1Y3RvcihzZXR0aW5ncylcclxuXHR7XHJcblx0XHRpZiAodHlwZW9mIHNldHRpbmdzICE9ICdvYmplY3QnKSB7XHJcblx0XHRcdHRocm93IG5ldyBJbnZhbGlkQXJndW1lbnRFeGNlcHRpb24kMTtcclxuXHRcdH1cclxuXHJcblx0XHR0aGlzLnNldHRpbmdzID0gQ29tbW9uLmV4dGVuZChkZWZhdWx0U2V0dGluZ3MkNywgc2V0dGluZ3MpO1xyXG5cclxuXHRcdEV4Y2VwdGlvbkhhbmRsZXIuc2V0RGVidWdMZXZlbCA9IHRoaXMuc2V0dGluZ3MuZGVidWdfbGV2ZWw7XHJcblx0XHRcclxuXHRcdHRoaXMubG9hZEV4dGVybmFsTGlicmFyaWVzKCk7XHJcblx0XHRcclxuXHRcdHRoaXMuY29udGFpbmVyID0gbmV3IENvbnRhaW5lciQ2O1xyXG5cclxuXHRcdHRoaXMuY29tcG9uZW50cyA9IHRoaXMuY29udGFpbmVyLm1ha2UoJ0NvbXBvbmVudHMnKTtcclxuXHRcdHRoaXMuY29tcG9uZW50cy5yZWdpc3Rlcih0aGlzLnNldHRpbmdzLmNvbXBvbmVudHMpO1xyXG5cclxuXHRcdGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCBmdW5jdGlvbigpIHtcclxuXHRcdFx0dGhpcy5zZXRFbGVtZW50KHRoaXMuc2V0dGluZ3MuZWxlbWVudCk7XHJcblxyXG5cdFx0XHR0aGlzLmNvbnRhaW5lci5Sb3V0ZXIuaGFzaE5hdmlnYXRpb24odGhpcy5zZXR0aW5ncy5oYXNoX25hdmlnYXRpb24pLnJlZ2lzdGVyKCk7XHJcblxyXG5cdFx0XHRpZiAodGhpcy5zZXR0aW5ncy5sb2FkaW5nX2FuaW1hdGlvbikge1xyXG5cdFx0XHRcdHN0YXJ0TG9hZGluZy5jYWxsKHRoaXMpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHR0aGlzLmFkZFN0eWxlVGFnKCk7XHJcblx0XHR9LmJpbmQodGhpcykpO1xyXG5cclxuXHRcdHJldHVybiBuZXcgUHJveHkodGhpcywge1xyXG5cdFx0XHRnZXQ6IGZ1bmN0aW9uKHNob3AsIHNvdXJjZSkge1xyXG5cdFx0XHRcdGlmIChzaG9wLmNvbXBvbmVudHMuZXhpc3RzKHNvdXJjZSkpIHtcclxuXHRcdFx0XHRcdHJldHVybiBzaG9wLmNvbXBvbmVudHMucHJvdmlkZShzb3VyY2UpO1xyXG5cdFx0XHRcdH0gXHJcblxyXG5cdFx0XHRcdGlmIChzaG9wLmNvbnRhaW5lci5pbnN0YW5jZUV4aXN0KHNvdXJjZSkpIHtcclxuXHRcdFx0XHRcdHJldHVybiBzaG9wLmNvbnRhaW5lci5nZXRJbnN0YW5jZShzb3VyY2UpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0fSk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBMb2FkcyB0aGUgZXh0ZXJuYWwgbGlicmFyaWVzIHdoaWNoIHdhcyBzcGVjaWZpZWQuXHJcblx0ICogXHJcblx0ICogQHJldHVybiB2b2lkXHJcblx0ICovXHJcblx0bG9hZEV4dGVybmFsTGlicmFyaWVzKClcclxuXHR7XHJcblx0XHRsZXQgaTtcclxuXHRcdGxldCBsaWJyYXJpZXMgPSB0aGlzLnNldHRpbmdzLmluamVjdF9saWJyYXJpZXM7XHJcblxyXG5cdFx0Zm9yIChpID0gMDsgaSA8IGxpYnJhcmllcy5sZW5ndGg7IGkrKykge1xyXG5cdFx0XHRpZiAoZXh0ZXJuYWxMaWJyYXJpZXMuaGFzT3duUHJvcGVydHkobGlicmFyaWVzW2ldKSkge1xyXG5cdFx0XHRcdGxldCBpZCA9ICdUdXJiby1lQ29tbWVyY2UtJyArIFN0ci51Y2ZpcnN0KGxpYnJhcmllc1tpXSk7XHJcblx0XHRcdFx0XHJcblx0XHRcdFx0aWYgKCEgRE9NLmZpbmQoaWQpKSB7XHJcblx0XHRcdFx0XHRET00uYWRkTGlua2VkU3R5bGUoaWQsIGV4dGVybmFsTGlicmFyaWVzW2xpYnJhcmllc1tpXV0pO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogU2V0cyB0aGUgZWxlbWVudCB0byBiZSBib3VuZCB0by5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSBzdHJpbmcgfCBzZWxlY3RvclxyXG5cdCAqIEByZXR1cm4gdm9pZFxyXG5cdCAqL1xyXG5cdHNldEVsZW1lbnQoc2VsZWN0b3IpXHJcblx0e1xyXG5cdFx0dGhpcy5lbGVtZW50ID0gRE9NLmZpbmQoc2VsZWN0b3IpO1xyXG5cdFx0XHJcblx0XHRET00uYWRkQ2xhc3ModGhpcy5lbGVtZW50LCB0aGlzLnNldHRpbmdzLmNsYXNzKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEFkZCB0aGUgZUNvbW1lcmNlIHN0eWxlIHRhZ3MgdG8gdGhlIERPTS5cclxuXHQgKlxyXG5cdCAqIEByZXR1cm4gdm9pZFxyXG5cdCAqL1xyXG5cdGFkZFN0eWxlVGFnKCkgXHJcblx0e1xyXG5cdFx0aWYgKERPTS5maW5kKCcjVHVyYm9lLUNvbW1lcmNlJykpIHtcclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0fVxyXG5cclxuXHRcdGxldCBjc3MgPSBgXHJcblx0XHRcdCR7dGhpcy5zZXR0aW5ncy5lbGVtZW50fSB7XHJcblx0XHRcdFx0cG9zaXRpb246IHJlbGF0aXZlO1xyXG5cdFx0XHRcdGNsZWFyOiBib3RoO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHQubG9hZGluZy1wcm9ncmVzcy1iYXIge1xyXG5cdFx0XHRcdHBvc2l0aW9uOiBmaXhlZDtcclxuXHRcdFx0XHR0b3A6IDA7XHJcblx0XHRcdFx0bGVmdDogMDtcclxuXHRcdFx0XHRoZWlnaHQ6IDVweDtcclxuXHRcdFx0XHR3aWR0aDogMTAwJTtcclxuXHRcdFx0XHQtd2Via2l0LWJveC1zaGFkb3c6IDBweCAwcHggNXB4IDFweCByZ2JhKDE2OCwxNjgsMTY4LDEpO1xyXG5cdFx0XHRcdC1tb3otYm94LXNoYWRvdzogMHB4IDBweCA1cHggMXB4IHJnYmEoMTY4LDE2OCwxNjgsMSk7XHJcblx0XHRcdFx0Ym94LXNoYWRvdzogMHB4IDBweCA1cHggMXB4IHJnYmEoMTY4LDE2OCwxNjgsMSk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdC5sb2FkaW5nLXByb2dyZXNzLWJhciA+IC5sb2FkaW5nLXByb2dyZXNzLWZpbGwge1xyXG5cdFx0XHRcdHdpZHRoOiAxMDAlO1xyXG5cdFx0XHRcdGhlaWdodDogMTAwJTtcclxuXHRcdFx0XHRwb3NpdGlvbjogYWJzb2x1dGU7XHJcblx0XHRcdFx0YmFja2dyb3VuZC1jb2xvcjogIzlkZDJmZjtcclxuXHRcdFx0XHR0cmFuc2Zvcm06IHRyYW5zbGF0ZVgoLSR7ZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudFdpZHRofXB4KTtcclxuXHRcdFx0fVxyXG5cdFx0YDtcclxuXHQgICAgXHJcblx0ICAgIERPTS5hZGRTdHlsZSgnVHVyYm8tZUNvbW1lcmNlJywgY3NzKTtcclxuXHR9XHJcbn1cclxuXHJcblxyXG4vKipcclxuICogQXR0YWNoZXMgYSBsb2FkZXIgdG8gdGhlIHRvcCBvZiB0aGUgc2NyZWVuXHJcbiAqIGFuZCBoaWRlcyB0aGUgY29udGVudC5cclxuICogU3RvcHMgYXV0b21hdGljYWxseSBhZnRlciAyMCUgcmVhY2hlZC5cclxuICpcclxuICogQHJldHVybiB2b2lkIFxyXG4gKi9cclxuZnVuY3Rpb24gc3RhcnRMb2FkaW5nKCkge1xyXG5cdGxldCBsb2FkZXIgPSBET00uY3JlYXRlRWxlbWVudCgnZGl2Jywge1xyXG5cdFx0Y2xhc3M6ICdsb2FkaW5nLXByb2dyZXNzLWJhcidcclxuXHR9KTtcclxuXHJcblx0bGV0IGZpbGwgPSBET00uY3JlYXRlRWxlbWVudCgnc3BhbicsIHtcclxuXHRcdGNsYXNzOiAnbG9hZGluZy1wcm9ncmVzcy1maWxsJ1xyXG5cdH0pO1xyXG5cclxuXHRsb2FkZXIuYXBwZW5kQ2hpbGQoZmlsbCk7XHJcblx0ZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChsb2FkZXIpO1xyXG5cclxuXHJcblx0bGV0IHByb2dyZXNzID0gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudFdpZHRoO1xyXG5cdGxldCBtYXhTaXplID0gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudFdpZHRoICogMC44MDtcclxuXHJcblx0d2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZShwcm9ncmVzc0RyYXcpO1xyXG5cclxuXHRsZXQgY29udGVudCA9IHRoaXMuZWxlbWVudDtcclxuXHJcblx0Y29udGVudC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xyXG5cdFxyXG5cdGZ1bmN0aW9uIHByb2dyZXNzRHJhdygpIHtcclxuXHRcdGZpbGwuc3R5bGUudHJhbnNmb3JtID0gJ3RyYW5zbGF0ZVgoLScgKyBwcm9ncmVzcyArICdweCknO1xyXG5cdFx0cHJvZ3Jlc3MgLT0gNztcclxuXHJcblx0XHRpZiAocHJvZ3Jlc3MgPCBtYXhTaXplKSB7XHJcblx0XHRcdGRvbmUoKTtcclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0fVxyXG5cclxuXHRcdHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUocHJvZ3Jlc3NEcmF3KTtcclxuXHR9XHJcblxyXG5cdGZ1bmN0aW9uIGRvbmUoKSB7XHJcblx0XHRmaWxsLnN0eWxlLm9wYWNpdHkgPSBwcm9ncmVzcyAvIDEwMDA7XHJcblx0XHRmaWxsLnN0eWxlLnRyYW5zZm9ybSA9ICd0cmFuc2xhdGVYKC0nICsgcHJvZ3Jlc3MgKyAncHgpJztcclxuXHRcclxuXHRcdHByb2dyZXNzIC09IDE1O1xyXG5cclxuXHRcdGlmIChwcm9ncmVzcyA8PSAwKSB7XHJcblx0XHRcdGNvbnRlbnQuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XHJcblx0XHRcdFxyXG5cdFx0XHRpZiAodHlwZW9mIGxvYWRlciAhPSAndW5kZWZpbmVkJykge1xyXG5cdFx0XHRcdERPTS5yZW1vdmUobG9hZGVyKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0fVxyXG5cclxuXHRcdHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoZG9uZSk7XHJcblx0fVxyXG59XG5cbnJldHVybiBUdXJib0Vjb21tZXJjZTtcblxufSgpKTtcbiJdfQ==
