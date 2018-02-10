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

				if (url == '/') {
					url = '/home';
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

			if (typeof history != 'undefined') {
				history.replaceState('', '', window.location.pathname);
			}

			window.addEventListener('popstate', this.register.bind(this));
			window.addEventListener('hashchange', this.register.bind(this));
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

				if (typeof event == 'undefined') {
					this.parseHttpRequest(url);
				} else {
					this.parseEvent(event, url);
				}
			}
		}, {
			key: 'parseUrl',
			value: function parseUrl() {
				var url = window.location.href;

				if (Url.hasParameters(url)) {
					this.queryString = url.split('?')[1];
					url = window.location.pathname;
				}

				if (url.indexOf('##/') >= 0) {
					url = url.replace('##/', '');
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
				this.container.Events.subscribe('route.dispatched', function (url) {
					Url.change(url);
				}.bind(this));

				switch (event.type) {
					case 'touchstart':
					case 'click':
						event.preventDefault();

						// basically exit, stop parsing, the user did not click a link
						if (event.target.tagName.toLowerCase() != 'a') {
							return;
						}

						// get the link href attribute, only the path segment.
						if (typeof event.target.pathname != 'undefined') {
							url = event.target.pathname;
						}

						break;
					case 'popstate':
						url = event.state.previous;
						break;
					case 'hashchange':

						break;
				}

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
							// @todo build product info component
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

	/**
  * @class Checkout
  *
  * Handles the checkout process.
  * payments validation, cart validation etc..
  */

	var Checkout = function (_BaseComponent3) {
		_inherits(Checkout, _BaseComponent3);

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

			var _this7 = _possibleConstructorReturn(this, (Checkout.__proto__ || Object.getPrototypeOf(Checkout)).call(this));

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
				Container$2.Components.booted.forEach(function (component) {
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

	/**
  * @class Products
  *
  * The Products component, handles the products tasks.
  */

	var Products = function (_BaseComponent4) {
		_inherits(Products, _BaseComponent4);

		/**
   * Initalize the Container.
   *
   * @param \Core\Container | container
   * @param \Helpers\Request | http
   * @return void
   */
		function Products(container, http, eventManager) {
			_classCallCheck(this, Products);

			var _this8 = _possibleConstructorReturn(this, (Products.__proto__ || Object.getPrototypeOf(Products)).call(this));

			Container$3 = container;
			Http$2 = http;
			EventManager$4 = eventManager;
			chunkedProducts = [];
			return _this8;
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

				if (Container$3.Pagination && Container$3.Pagination.booted) {

					var limit = Container$3.Pagination.settings.per_page;

					switch (Container$3.Pagination.settings.processing) {
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
			value: function loadPageProductsOnce(pageNumber) {
				var append = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

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
				Container$3.Components.booted.forEach(function (component) {
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


	var Services = function (_BaseComponent5) {
		_inherits(Services, _BaseComponent5);

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

			var _this10 = _possibleConstructorReturn(this, (NotInPageRangeException.__proto__ || Object.getPrototypeOf(NotInPageRangeException)).call(this));

			_get(NotInPageRangeException.prototype.__proto__ || Object.getPrototypeOf(NotInPageRangeException.prototype), 'stackTrace', _this10).call(_this10, _this10, message);
			return _this10;
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


	var defaultSettings$5 = {
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

	/**
  * @class Pagination
  *
  * The Pagination component, handles the pagination.
  */

	var Pagination = function (_BaseComponent6) {
		_inherits(Pagination, _BaseComponent6);

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

			var _this11 = _possibleConstructorReturn(this, (Pagination.__proto__ || Object.getPrototypeOf(Pagination)).call(this));

			Container$4 = container;
			Products$2 = products;
			EventManager$5 = events;
			return _this11;
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

			var _this12 = _possibleConstructorReturn(this, (ComponentNotRegisteredException.__proto__ || Object.getPrototypeOf(ComponentNotRegisteredException)).call(this, message));

			_get(ComponentNotRegisteredException.prototype.__proto__ || Object.getPrototypeOf(ComponentNotRegisteredException.prototype), 'stackTrace', _this12).call(_this12, _this12, message);
			return _this12;
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

			var _this13 = _possibleConstructorReturn(this, (InvalidBindingException.__proto__ || Object.getPrototypeOf(InvalidBindingException)).call(this, message));

			_get(InvalidBindingException.prototype.__proto__ || Object.getPrototypeOf(InvalidBindingException.prototype), 'stackTrace', _this13).call(_this13, _this13, message);
			return _this13;
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
			this.registerRouter();
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
		}, {
			key: 'registerRouter',
			value: function registerRouter() {
				this.setInstance('Router', new Router(this));
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

			this.settings = Common.extend(defaultSettings$6, settings);

			ExceptionHandler.setDebugLevel = this.settings.debug_level;

			this.loadExternalLibraries();

			this.container = new Container$5();

			this.components = this.container.make('Components');
			this.components.register(this.settings.components);

			document.addEventListener('DOMContentLoaded', function () {
				this.setElement(this.settings.element);

				this.container.Router.register();

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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlR1cmJvRWNvbW1lcmNlLmpzIl0sIm5hbWVzIjpbIlR1cmJvRWNvbW1lcmNlIiwiU3RyIiwic3RyaW5nIiwicmVwbGFjZSIsInRvTG93ZXJDYXNlIiwibGVuZ3RoIiwicG9zc2libGUiLCJpIiwiY2hhckF0IiwiTWF0aCIsImZsb29yIiwicmFuZG9tIiwidG9VcHBlckNhc2UiLCJzbGljZSIsImRlYnVnTGV2ZWwiLCJFeGNlcHRpb25IYW5kbGVyIiwibGV2ZWwiLCJ3aW5kb3ciLCJvbmVycm9yIiwiRXJyb3IiLCJjYXB0dXJlU3RhY2tUcmFjZSIsImNvbnN0cnVjdG9yIiwibmFtZSIsImVycm9yIiwibWVzc2FnZSIsImN1c3RvbUFjdGlvbnMiLCJoYW5kbGVFcnJvcnMiLCJoYW5kbGVXYXJuaW5ncyIsImhhbmRsZUluZm9zIiwiY29uc29sZSIsIndhcm4iLCJpbmZvIiwiZGVmYXVsdE1lc3NhZ2UiLCJJbnZhbGlkQXJndW1lbnRFeGNlcHRpb24kMSIsIkRPTSIsImVsZW1lbnQiLCJjbGFzc05hbWUiLCJuZXdDbGFzc05hbWUiLCJyZW1vdmVDbGFzcyIsImFkZENsYXNzIiwidW5kZWZpbmVkIiwiY2xhc3NOYW1lcyIsInNwbGl0IiwiZm9yRWFjaCIsImNsYXNzTGlzdCIsImFkZCIsImluZGV4T2YiLCJyZW1vdmUiLCJwYXJlbnROb2RlIiwicmVtb3ZlQ2hpbGQiLCJpZCIsImNzcyIsImhlYWQiLCJkb2N1bWVudCIsImdldEVsZW1lbnRzQnlUYWdOYW1lIiwic3R5bGVUYWciLCJjcmVhdGVFbGVtZW50IiwiQ1NTIiwibWluaWZ5Q3NzIiwiaW5uZXJIVE1MIiwic2V0QXR0cmlidXRlIiwiYXBwZW5kQ2hpbGQiLCJzb3VyY2UiLCJsaW5rZWRTdHlsZVRhZyIsImVsZW1lbnRUeXBlIiwib3B0aW9ucyIsIm9wdGlvbiIsInNlY29uZENsYXNzTmFtZSIsInRvZ2dsZSIsInNlbGVjdG9yIiwiY29udGV4dCIsInF1ZXJ5RWxlbWVudCIsIm1heCIsImJvZHkiLCJzY3JvbGxIZWlnaHQiLCJkb2N1bWVudEVsZW1lbnQiLCJvZmZzZXRIZWlnaHQiLCJjbGllbnRIZWlnaHQiLCJpbm5lckhlaWdodCIsInBhZ2VZT2Zmc2V0Iiwic2Nyb2xsVG9wIiwicGFyZW50RWxlbWVudCIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJoYXNDaGlsZCIsImNoaWxkRWxlbWVudCIsIm5vZGUiLCJDb21tb24iLCJjdXJyZW50T2JqZWN0IiwibmV3T2JqZWN0IiwiZXh0ZW5kZWQiLCJwcm9wIiwiT2JqZWN0IiwicHJvdG90eXBlIiwiaGFzT3duUHJvcGVydHkiLCJjYWxsIiwibmVlZGxlIiwiaHlzdGFjayIsIkFycmF5IiwidG90YWwiLCJzaXplIiwiaXNOYU4iLCJwYXJzZUludCIsImNvbGxlY3Rpb24iLCJjZWlsIiwic3RhcnQiLCJlbmQiLCJwdXNoIiwib2JqZWN0IiwiZGVmYXVsdE1lc3NhZ2UkMSIsIkludmFsaWREYXRhU3RydWN0dXJlRXhjZXB0aW9uIiwiZGVmYXVsdFNldHRpbmdzIiwiaGVhZGVycyIsImFzeW5jIiwiUmVxdWVzdCIsInNldHRpbmdzIiwiZXh0ZW5kIiwic2V0RGVmYXVsdFJlcXVlc3RIZWFkZXIiLCJoZWFkZXIiLCJvcGVuIiwiWE1MSHR0cFJlcXVlc3QiLCJzZXRSZXF1ZXN0SGVhZGVyIiwicmVzcG9uc2UiLCJhcHBseSIsImFyZ3VtZW50cyIsInhociIsImJlZm9yZSIsIlByb21pc2UiLCJyZXNvbHZlIiwicmVqZWN0IiwiZGF0YSIsInVybCIsInJlc3BvbnNlVHlwZSIsImRhdGFUeXBlIiwidGltZW91dCIsIm9ucmVhZHlzdGF0ZWNoYW5nZSIsInJlYWR5U3RhdGUiLCJzdGF0dXMiLCJyZXNwb25zZVRleHQiLCJhZnRlciIsInNlbmQiLCJxdWVyeVN0cmluZyIsImtleXMiLCJtYXAiLCJrZXkiLCJlbmNvZGVVUklDb21wb25lbnQiLCJqb2luIiwiQWN0aXZlWE9iamVjdCIsIm92ZXJyaWRlTWltZVR5cGUiLCJKU09OIiwicGFyc2UiLCJvbmFib3J0IiwiVXJsIiwiY29udGVudCIsInVybFBhdGgiLCJmaW5kIiwidGl0bGUiLCJoaXN0b3J5IiwicHVzaFN0YXRlIiwidmFsdWUiLCJzZXBhcmF0b3IiLCJyZWdFeHAiLCJSZWdFeHAiLCJwYWlyU2VwYXJhdG9yIiwibWF0Y2giLCJwYXJhbWV0ZXJLZXkiLCJwYXJhbWV0ZXJWYWx1ZSIsInJlcXVlc3RlZFVybCIsImNoYW5nZVF1ZXJ5UGFyYW1ldGVyVmFsdWUiLCJsb2NhdGlvbiIsImhyZWYiLCJyZXBsYWNlU3RhdGUiLCJwcmV2aW91c1VybCIsInBhdGhuYW1lIiwidmFycyIsInBhcnRzIiwibSIsIlJvdXRlciIsImNvbnRhaW5lciIsInJvdXRlcyIsImJ1aWxkUm91dGVzIiwiYWRkRXZlbnRMaXN0ZW5lciIsInJlZ2lzdGVyIiwiYmluZCIsImV2ZW50IiwicGFyc2VVcmwiLCJwYXJzZUh0dHBSZXF1ZXN0IiwicGFyc2VFdmVudCIsImhhc1BhcmFtZXRlcnMiLCJkaXNwYXRjaCIsIkV2ZW50cyIsInN1YnNjcmliZSIsImNoYW5nZSIsInR5cGUiLCJwcmV2ZW50RGVmYXVsdCIsInRhcmdldCIsInRhZ05hbWUiLCJzdGF0ZSIsInByZXZpb3VzIiwiY3VycmVudCIsImxvZyIsIlByb2R1Y3RzIiwiaGlkZUFsbCIsIkZpbHRlciIsInNob3ciLCJDYXJ0IiwiUGFnaW5hdGlvbiIsIkNoZWNrb3V0IiwicHVibGlzaCIsImRlZmF1bHRNZXNzYWdlJDIiLCJCYWRFdmVudENhbGxFeGNlcHRpb24iLCJFdmVudE1hbmFnZXIiLCJldmVudHMiLCJjYWxsYmFjayIsIkludmFsaWRBcmd1bWVudEV4Y2VwdGlvbiIsIkNvb2tpZSIsImRheXMiLCJzdHJpbmdpZnkiLCJleHBpcmVzIiwiZGF0ZSIsIkRhdGUiLCJzZXRUaW1lIiwiZ2V0VGltZSIsInRvR01UU3RyaW5nIiwiY29va2llIiwiY19zdGFydCIsImNfZW5kIiwidW5lc2NhcGUiLCJzdWJzdHJpbmciLCJCYXNlQ29tcG9uZW50Iiwic3R5bGUiLCJkaXNwbGF5IiwiZGVmYXVsdE1lc3NhZ2UkMyIsIkludmFsaWRDYXJ0SXRlbUV4Y2VwdGlvbiIsImRlZmF1bHRTZXR0aW5ncyQxIiwiY29va2llX25hbWUiLCJwcmV2aWV3X2NsYXNzIiwibG9hZGVyIiwiY2xhc3MiLCJ3aWR0aCIsImhlaWdodCIsInBsYWNlbWVudCIsImZpeGVkIiwiaG92ZXJfY29sb3IiLCJub19jc3MiLCJDb250YWluZXIiLCJFdmVudE1hbmFnZXIkMiIsIkh0dHAiLCJsb2FkaW5nT3ZlcmxheSIsIml0ZW1zRGl2IiwiaHR0cCIsImV2ZW50TWFuYWdlciIsInByZXZpZXdFbGVtZW50IiwiY3JlYXRlUHJldmlld0VsZW1lbnQiLCJpY29uIiwiY3JlYXRlSWNvbiIsInNldEVsZW1lbnQiLCJkcmF3IiwiYmluZEV2ZW50TGlzdGVuZXJzIiwiaXNFbXB0eSIsImdldCIsInNldHVwQ2FydCIsImNhcnQiLCJlbXB0eU9iamVjdCIsIml0ZW1zIiwiZmF2b3JpdGVzIiwic2V0IiwiaXRlbSIsInF1YW50aXR5IiwiaW5jcmVtZW50ZWQiLCJhbHJlYWR5RmF2b3JpdGVkIiwic3BsaWNlIiwidGFibGUiLCJhdHRyaWJ1dGVzIiwidHIiLCJ0ZCIsImF0dHJpYnV0ZSIsImltYWdlIiwic3JjIiwic3BhbiIsImh0bWwiLCJjdXJyZW5jeSIsImFtb3VudCIsImNvbHNwYW4iLCJjaGVja291dCIsInRleHQiLCJwYXJzZUZsb2F0IiwicHJpY2UiLCJ0b0ZpeGVkIiwicG9zaXRpb24iLCJhZGRTdHlsZSIsImNyZWF0ZUxvYWRlciIsInByZXZpZXdTdGFydExvYWRpbmciLCJnZXRDYXJ0SXRlbXMiLCJhZGRUb1ByZXZpZXciLCJpbnN0YW5jZSIsInNldFRpbWVvdXQiLCJwcmV2aWV3U3RvcExvYWRpbmciLCJvbmNsaWNrIiwiZSIsInRvZ2dsZUNhcnRQcmV2aWV3Iiwib3BlbkNhcnRQcmV2aWV3IiwiYWRkSXRlbSIsInJlbG9hZENhcnRQcmV2aWV3IiwiZmF2b3JpdGVJdGVtIiwiaGFzQ2xhc3MiLCJzd2l0Y2hDbGFzc2VzIiwib3BlbmluZyIsInRvZ2dsZUNsYXNzIiwiY2xvc2UiLCJzdmciLCJjcmVhdGVFbGVtZW50TlMiLCJnIiwicGF0aCIsImRpdiIsImNvdW50IiwiZ3JvdXBzIiwicmVjdGFuZ2VscyIsImFuaW1hdGlvbnMiLCJyb3RhdGlvbiIsImdyb3VwIiwicmVjdGFuZ2VsIiwiYmVnaW4iLCJhbmltYXRlIiwiZGVmYXVsdFNldHRpbmdzJDIiLCJDb250YWluZXIkMSIsIm1pbldpZHRoIiwibWluX3dpZHRoIiwiZGVmYXVsdFNldHRpbmdzJDMiLCJDb250YWluZXIkMiIsIkV2ZW50TWFuYWdlciQzIiwiSHR0cCQxIiwiaGlkZSIsIkNvbXBvbmVudHMiLCJib290ZWQiLCJjb21wb25lbnQiLCJkZWZhdWx0U2V0dGluZ3MkNCIsIml0ZW1fY2xhc3MiLCJhZGRfYnV0dG9uX2NsYXNzIiwiZmF2b3JpdGVfYnV0dG9uX2NsYXNzIiwiQ29udGFpbmVyJDMiLCJFdmVudE1hbmFnZXIkNCIsIkh0dHAkMiIsImNodW5rZWRQcm9kdWN0cyIsInRvdGFsSXRlbXMiLCJsb2FkUHJvZHVjdHMiLCJwYWdlTnVtYmVyIiwiYXBwZW5kIiwibGltaXQiLCJwZXJfcGFnZSIsInByb2Nlc3NpbmciLCJsb2FkUGFnZVByb2R1Y3RzT25jZSIsImxvYWRQYWdlUHJvZHVjdHMiLCJyZXF1ZXN0IiwiZ2V0UHJvZHVjdHMiLCJ0aGVuIiwicHJvZHVjdHMiLCJjdXJyZW50SXRlbXMiLCJyZXBsYWNlUHJvZHVjdHMiLCJjYXRjaCIsInBhZ2VzIiwiY2FsY3VsYXRlQ2xpZW50UGFnZXMiLCJhcHBlbmRQcm9kdWN0cyIsInRvdGFsX2l0ZW1zIiwicGVyUGFnZSIsImFycmF5X2NodW5rIiwicmF3UHJvZHVjdHMiLCJpc0FycmF5IiwiYnVpbGRQcm9kdWN0cyIsInByb2R1Y3QiLCJhY3Rpb24iLCJhdHRyaWJ1dGVzQ29sbGVjdGlvbiIsInRhZ1R5cGUiLCJidWlsdFByb2R1Y3RzIiwiYnVpbHRQcm9kdWN0IiwiYnVpbGRQcm9kdWN0Iiwib3ZlcmxheSIsImFkZERlZmF1bHRBdHRyaWJ1dGVzIiwidGFnIiwib3V0ZXJIVE1MIiwic3BhbjIiLCJpbl9hcnJheSIsImtlYmFiQ2FzZSIsImFkZFRvQ2FydCIsImZhdm9yaXRlIiwibWF4V2lkdGgiLCJtYXhfd2lkdGgiLCJTZXJ2aWNlcyIsImRlZmF1bHRNZXNzYWdlJDQiLCJOb3RJblBhZ2VSYW5nZUV4Y2VwdGlvbiIsImRlZmF1bHRTZXR0aW5ncyQ1IiwidXJsX3BhcmFtZXRlciIsInNjcm9sbCIsIkNvbnRhaW5lciQ0IiwiUHJvZHVjdHMkMiIsIkV2ZW50TWFuYWdlciQ1Iiwic2VydmljZXMiLCJzZXRDdXJyZW50IiwidG90YWxQYWdlcyIsImNhbGN1bGF0ZVRvdGFsUGFnZXMiLCJidWlsZFBhZ2luYXRpb24iLCJvbnNjcm9sbCIsIm1vbml0b3JTY3JvbGxpbmciLCJsaW5rcyIsImNyZWF0ZUxpbmtzIiwicmVwbGFjZUxpbmtzIiwiY3VycmVudFlPZmZzZXQiLCJzY3JvbGxZT2Zmc2V0IiwiZG9jdW1lbnRIZWlnaHQiLCJ3aW5kb3dIZWlnaHQiLCJyZXF1ZXN0ZWRQYWdlIiwibmV4dCIsImNoaWxkTm9kZXMiLCJub3RJblBhZ2VSYW5nZSIsImdldEF0dHJpYnV0ZSIsImNoYW5nZVVybCIsInNldEFjdGl2ZUxpbmsiLCJ1bCIsImNyZWF0ZVBhZ2VMaW5rcyIsImNyZWF0ZVByZXZpb3VzQnV0dG9uIiwiY3JlYXRlTmV4dEJ1dHRvbiIsInBhZ2UiLCJwYWdlSXRlbSIsImxpbmsiLCJsaSIsInNwYW4xIiwiY2hhbmdlUGFyYW1ldGVyIiwiZGVmYXVsdE1lc3NhZ2UkNSIsIkNvbXBvbmVudE5vdFJlZ2lzdGVyZWRFeGNlcHRpb24iLCJDb21wb25lbnRzUHJvdmlkZXIiLCJjb21wb25lbnRzIiwiYXZhaWxhYmxlIiwiZXhpc3RzIiwibWFrZSIsImRlZmF1bHRNZXNzYWdlJDYiLCJJbnZhbGlkQmluZGluZ0V4Y2VwdGlvbiIsIkNvbnRhaW5lciQ1IiwiaW5zdGFuY2VzIiwicmVnaXN0ZXJQcm92aWRlcnMiLCJyZWdpc3RlclJvdXRlciIsImNvbmNyZXRlIiwibmFtZXNwYWNlIiwiYWxpYXMiLCJpbnN0YW5jZUV4aXN0IiwiZ2V0SW5zdGFuY2UiLCJzZXRJbnN0YW5jZSIsImRlZmF1bHRTZXR0aW5ncyQ2IiwiZGVidWdfbGV2ZWwiLCJpbmplY3RfbGlicmFyaWVzIiwibG9hZGluZ19hbmltYXRpb24iLCJoYXNoX25hdmlnYXRpb24iLCJleHRlcm5hbExpYnJhcmllcyIsImJvb3RzdHJhcCIsInNldERlYnVnTGV2ZWwiLCJsb2FkRXh0ZXJuYWxMaWJyYXJpZXMiLCJzdGFydExvYWRpbmciLCJhZGRTdHlsZVRhZyIsIlByb3h5Iiwic2hvcCIsInByb3ZpZGUiLCJsaWJyYXJpZXMiLCJ1Y2ZpcnN0IiwiYWRkTGlua2VkU3R5bGUiLCJjbGllbnRXaWR0aCIsImZpbGwiLCJwcm9ncmVzcyIsIm1heFNpemUiLCJyZXF1ZXN0QW5pbWF0aW9uRnJhbWUiLCJwcm9ncmVzc0RyYXciLCJ0cmFuc2Zvcm0iLCJkb25lIiwib3BhY2l0eSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLElBQUlBLGlCQUFrQixZQUFZO0FBQ2xDOztBQUVBOzs7Ozs7OztBQUhrQyxLQVc1QkMsR0FYNEI7QUFBQTtBQUFBO0FBQUE7O0FBQUE7QUFBQTs7QUFhakM7Ozs7OztBQWJpQyw2QkFtQmhCQyxNQW5CZ0IsRUFvQmpDO0FBQ0MsV0FBT0EsT0FBT0MsT0FBUCxDQUFlLGlCQUFmLEVBQWtDLE9BQWxDLEVBQTJDQyxXQUEzQyxFQUFQO0FBQ0E7O0FBRUQ7Ozs7Ozs7QUF4QmlDO0FBQUE7QUFBQSwwQkE4Qm5CQyxNQTlCbUIsRUErQmpDO0FBQ0MsUUFBSUgsU0FBUyxFQUFiO0FBQ0EsUUFBSUksV0FBVyxnRUFBZjs7QUFFQSxTQUFLLElBQUlDLElBQUksQ0FBYixFQUFnQkEsSUFBSUYsTUFBcEIsRUFBNEJFLEdBQTVCLEVBQWlDO0FBQzdCTCxlQUFVSSxTQUFTRSxNQUFULENBQWdCQyxLQUFLQyxLQUFMLENBQVdELEtBQUtFLE1BQUwsS0FBZ0JMLFNBQVNELE1B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QUFLMU8sS0FBTCxDQUFXK08sU0FBWCxHQUF1QixpQkFBaUJKLFFBQWpCLEdBQTRCLEtBQW5EO0FBQ0FBLGVBQVksQ0FBWjs7QUFFQSxPQUFJQSxXQUFXQyxPQUFmLEVBQXdCO0FBQ3ZCSTtBQUNBO0FBQ0E7O0FBRURwYyxVQUFPaWMscUJBQVAsQ0FBNkJDLFlBQTdCO0FBQ0E7O0FBRUQsV0FBU0UsSUFBVCxHQUFnQjtBQUNmTixRQUFLMU8sS0FBTCxDQUFXaVAsT0FBWCxHQUFxQk4sV0FBVyxJQUFoQztBQUNBRCxRQUFLMU8sS0FBTCxDQUFXK08sU0FBWCxHQUF1QixpQkFBaUJKLFFBQWpCLEdBQTRCLEtBQW5EOztBQUVBQSxlQUFZLEVBQVo7O0FBRUEsT0FBSUEsWUFBWSxDQUFoQixFQUFtQjtBQUNsQnhULFlBQVE2RSxLQUFSLENBQWNDLE9BQWQsR0FBd0IsT0FBeEI7O0FBRUEsUUFBSSxPQUFPTSxNQUFQLElBQWlCLFdBQXJCLEVBQWtDO0FBQ2pDMU0sU0FBSWEsTUFBSixDQUFXNkwsTUFBWDtBQUNBOztBQUVEO0FBQ0E7O0FBRUQzTixVQUFPaWMscUJBQVAsQ0FBNkJHLElBQTdCO0FBQ0E7QUFDRDs7QUFFRCxRQUFPcmQsY0FBUDtBQUVDLENBcjBIcUIsRUFBdEIiLCJmaWxlIjoiVHVyYm9FY29tbWVyY2UuanMiLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgVHVyYm9FY29tbWVyY2UgPSAoZnVuY3Rpb24gKCkge1xuJ3VzZSBzdHJpY3QnO1xuXG4vKipcclxuICogQGZpbGUgXHJcbiAqIFN0ciBjbGFzcy5cclxuICpcclxuICogQWRkcyBzb21lIHVzZWZ1bCBmdW5jdGlvbmFsaXR5IGZvclxyXG4gKiBtYW5pcHVsYXRpbmcgc3RyaW5ncyBvciBjcmVhdGluZyBzdHJpbmcuXHJcbiAqL1xyXG5cclxuY2xhc3MgU3RyXHJcbntcclxuXHQvKipcclxuXHQgKiBDb252ZXJ0IGNhbWVsQ2FzZSB0byBrZWJhYi1jYXNlLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIHN0cmluZyB8IHN0cmluZ1xyXG5cdCAqIEByZXR1cm4gc3RyaW5nXHJcblx0ICovXHJcblx0c3RhdGljIGtlYmFiQ2FzZShzdHJpbmcpIFxyXG5cdHtcclxuXHRcdHJldHVybiBzdHJpbmcucmVwbGFjZSgvKFthLXpdKShbQS1aXSkvZywgJyQxLSQyJykudG9Mb3dlckNhc2UoKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEdlbmVyYXRlcyBhIHJhbmRvbSBzdHJpbmcuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gaW50ZWdlciB8IGxlbmd0aFxyXG5cdCAqIEByZXR1cm4gc3RyaW5nXHJcblx0ICovXHJcblx0c3RhdGljIHJhbmRvbShsZW5ndGgpIFxyXG5cdHtcclxuXHRcdGxldCBzdHJpbmcgPSAnJztcclxuXHRcdGxldCBwb3NzaWJsZSA9IFwiQUJDREVGR0hJSktMTU5PUFFSU1RVVldYWVphYmNkZWZnaGlqa2xtbm9wcXJzdHV2d3h5ejAxMjM0NTY3ODlcIjtcclxuXHJcblx0XHRmb3IgKGxldCBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XHJcblx0ICAgIFx0c3RyaW5nICs9IHBvc3NpYmxlLmNoYXJBdChNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBwb3NzaWJsZS5sZW5ndGgpKTtcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gc3RyaW5nO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQ2hhbmdlcyB0aGUgZmlyc3QgbGV0dGVyIFxyXG5cdCAqIG9mIHRoZSBzdHJpbmcgdG8gdXBwZXJjYXNlLlxyXG5cdCAqIFxyXG5cdCAqIEBwYXJhbSBzdHJpbmcgfCBzdHJpbmdcclxuXHQgKiBAcmV0dXJuIHN0cmluZ1xyXG5cdCAqL1xyXG5cdHN0YXRpYyB1Y2ZpcnN0KHN0cmluZykgXHJcblx0e1xyXG5cdCAgICByZXR1cm4gc3RyaW5nLmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpICsgc3RyaW5nLnNsaWNlKDEpO1xyXG5cdH1cclxufVxuXG4vKipcclxuICogU3RvcmVzIHRoZSBkZWJ1ZyBsZXZlbC5cclxuICpcclxuICogQHZhciBzdHJpbmcgXHJcbiAqL1xyXG5sZXQgZGVidWdMZXZlbDtcclxuXHJcbmNsYXNzIEV4Y2VwdGlvbkhhbmRsZXJcclxue1xyXG5cdC8qKlxyXG5cdCAqIFNldHRlciBmb3IgdGhlIGRlYnVnIGxldmVsLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIHN0cmluZyB8IGxldmVsXHJcblx0ICogQHJldHVybiB2b2lkXHJcblx0ICovXHJcblx0c3RhdGljIHNldCBzZXREZWJ1Z0xldmVsKGxldmVsKVxyXG5cdHtcclxuXHRcdC8vIFN1cHByZXNzIGVycm9ycyBkZXBlbmRzIG9uIHRoZSBkZWJ1ZyBsZXZlbC5cclxuXHRcdGlmIChsZXZlbCA9PSAnd2FybmluZycgfHwgbGV2ZWwgPT0gJ2luZm8nKSB7XHJcblx0XHRcdHdpbmRvdy5vbmVycm9yID0gZnVuY3Rpb24oKSB7IHJldHVybiB0cnVlOyB9O1xyXG5cdFx0fVxyXG5cclxuXHRcdGRlYnVnTGV2ZWwgPSBsZXZlbDtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEV4dGVuZGVkIGNvbnN0cnVjdG9yLCBjYXB0dXJlcyB0aGVcclxuXHQgKiBzdGFjayB0cmFjZS5cclxuXHQgKlxyXG5cdCAqIEByZXR1cm4gdm9pZFxyXG5cdCAqL1xyXG5cdGNvbnN0cnVjdG9yKClcclxuXHR7XHJcblx0XHRpZiAoRXJyb3IuY2FwdHVyZVN0YWNrVHJhY2UpIHtcclxuXHRcdFx0RXJyb3IuY2FwdHVyZVN0YWNrVHJhY2UodGhpcywgdGhpcy5jb25zdHJ1Y3Rvci5uYW1lKTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEhhbmRsZXMgYWxsIGV4Y2VwdGlvbnMuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gb2JqZWN0IHwgZXJyb3IgfCBUaHJvd2VuIEV4Y2VwdGlvbiBPYmplY3RcclxuXHQgKiBAcGFyYW0gc3RyaW5nIHwgbWVzc2FnZVxyXG5cdCAqIEByZXR1cm4gdm9pZFxyXG5cdCAqL1xyXG5cdHN0YWNrVHJhY2UoZXJyb3IsIG1lc3NhZ2UpIFxyXG5cdHtcclxuXHRcdHRoaXMuY3VzdG9tQWN0aW9ucyhlcnJvciwgbWVzc2FnZSk7XHJcblxyXG5cdFx0c3dpdGNoKGRlYnVnTGV2ZWwpXHJcblx0XHR7XHJcblx0XHRcdGNhc2UgJ2Vycm9yJzogdGhpcy5oYW5kbGVFcnJvcnMoZXJyb3IsIG1lc3NhZ2UpOyBicmVhaztcclxuXHRcdFx0Y2FzZSAnd2FybmluZyc6IHRoaXMuaGFuZGxlV2FybmluZ3MoZXJyb3IsIG1lc3NhZ2UpOyBicmVhaztcclxuXHRcdFx0Y2FzZSAnaW5mbyc6IHRoaXMuaGFuZGxlSW5mb3MoZXJyb3IsIG1lc3NhZ2UpOyBicmVhaztcclxuXHRcdFx0ZGVmYXVsdDogdGhpcy5oYW5kbGVJbmZvcyhlcnJvciwgbWVzc2FnZSk7IGJyZWFrO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogVGFrZSBhY3Rpb24gZm9yIHNwZWNpZmljIEV4Y2VwdGlvbnMuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gb2JqZWN0IHwgZXJyb3IgfCBUaHJvd2VuIEV4Y2VwdGlvbiBPYmplY3RcclxuXHQgKiBAcGFyYW0gc3RyaW5nIHwgbWVzc2FnZVxyXG5cdCAqIEByZXR1cm4gYm9vbFxyXG5cdCAqL1xyXG5cdGN1c3RvbUFjdGlvbnMoZXJyb3IsIG1lc3NhZ2UpXHJcblx0e1xyXG5cdFx0aWYgKGVycm9yLmNvbnN0cnVjdG9yLm5hbWUgPT0gJ0ludmFsaWRBcmd1bWVudEV4Y2VwdGlvbicpIHtcclxuXHRcdFx0Ly8gaGFuZGxlXHJcblx0XHR9IGVsc2UgaWYgKGVycm9yLmNvbnN0cnVjdG9yLm5hbWUgPT0gJ0ludmFsaWRCaW5kaW5nRXhjZXB0aW9uJykge1xyXG5cdFx0XHQvLyBoYW5kbGVcclxuXHRcdH0gZWxzZSBpZiAoZXJyb3IuY29uc3RydWN0b3IubmFtZSA9PSAnQmFkRXZlbnRDYWxsRXhjZXB0aW9uJykge1xyXG5cdFx0XHQvLyBoYW5kbGVcclxuXHRcdH0gZWxzZSBpZiAoZXJyb3IuY29uc3RydWN0b3IubmFtZSA9PSAnQ29tcG9uZW50c0V4Y2VwdGlvbicpIHtcclxuXHRcdFx0Ly8gaGFuZGxlXHJcblx0XHR9IGVsc2UgaWYgKGVycm9yLmNvbnN0cnVjdG9yLm5hbWUgPT0gJ0NvbXBvbmVudE5vdFJlZ2lzdGVyZWRFeGNlcHRpb24nKSB7XHJcblx0XHRcdC8vIGhhbmRsZVxyXG5cdFx0fSBlbHNlIGlmIChlcnJvci5jb25zdHJ1Y3Rvci5uYW1lID09ICdOb3RJblBhZ2VSYW5nZUV4Y2VwdGlvbicpIHtcclxuXHRcdFx0Ly8gaGFuZGxlXHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIGZhbHNlO1xyXG5cdH1cclxuXHJcblx0aGFuZGxlRXJyb3JzKGVycm9yLCBtZXNzYWdlKVxyXG5cdHtcclxuXHRcdGNvbnNvbGUuZXJyb3IoZXJyb3IuY29uc3RydWN0b3IubmFtZSArICc6ICcgKyBtZXNzYWdlKTtcclxuXHR9XHJcblxyXG5cdGhhbmRsZVdhcm5pbmdzKGVycm9yLCBtZXNzYWdlKVxyXG5cdHtcclxuXHRcdGNvbnNvbGUud2FybihlcnJvci5jb25zdHJ1Y3Rvci5uYW1lICsgJzogJyArIG1lc3NhZ2UpO1xyXG5cdH1cclxuXHJcblx0aGFuZGxlSW5mb3MoZXJyb3IsIG1lc3NhZ2UpXHJcblx0e1xyXG5cdFx0Y29uc29sZS5pbmZvKGVycm9yLmNvbnN0cnVjdG9yLm5hbWUgKyAnOiAnICsgbWVzc2FnZSk7XHJcblx0fVxyXG59XG5cbmxldCBkZWZhdWx0TWVzc2FnZSA9ICdBbiBpbnZhbGlkIGFyZ3VtZW50IHdhcyBwYXNzZWQuJztcclxuXHJcbmNsYXNzIEludmFsaWRBcmd1bWVudEV4Y2VwdGlvbiQxIGV4dGVuZHMgRXhjZXB0aW9uSGFuZGxlclxyXG57XHJcblx0Y29uc3RydWN0b3IobWVzc2FnZSA9IG51bGwpIFxyXG5cdHtcclxuXHRcdG1lc3NhZ2UgPSBtZXNzYWdlIHx8IGRlZmF1bHRNZXNzYWdlO1xyXG5cdFx0c3VwZXIobWVzc2FnZSk7XHJcbiAgICBcdHN1cGVyLnN0YWNrVHJhY2UodGhpcywgbWVzc2FnZSk7XHJcbiAgICB9XHJcbn1cblxuLyoqXHJcbiAqIEBmaWxlIFxyXG4gKiBET00gY2xhc3MuXHJcbiAqXHJcbiAqIEFkZHMgc29tZSB1c2VmdWwgZnVuY3Rpb25hbGl0eSBmb3JcclxuICogZmV0Y2hpbmcgb3IgbWFuaXB1bGF0aW5nIERPTSBlbGVtZW50cy5cclxuICovXHJcblxyXG5jbGFzcyBET01cclxue1xyXG5cdC8qKlxyXG5cdCAqIE1pbmlmaWVzIHRoZSBjc3MgdGV4dC5cclxuXHQgKiBcclxuXHQgKiBAcGFyYW0gc3RyaW5nIHwgc3RyaW5nXHJcblx0ICogQHJldHVybiBzdHJpbmdcclxuXHQgKi9cclxuXHRzdGF0aWMgbWluaWZ5Q3NzKHN0cmluZykgXHJcblx0e1xyXG5cdCAgICBzdHJpbmcgPSBzdHJpbmcucmVwbGFjZSgvXFwvXFwqKD86KD8hXFwqXFwvKVtcXHNcXFNdKSpcXCpcXC98W1xcclxcblxcdF0rL2csICcnKTtcclxuXHQgICAgc3RyaW5nID0gc3RyaW5nLnJlcGxhY2UoLyB7Mix9L2csICcgJyk7XHJcblx0ICAgIHN0cmluZyA9IHN0cmluZy5yZXBsYWNlKC8oW3s6fV0pL2csICckMScpO1xyXG5cdCAgICBzdHJpbmcgPSBzdHJpbmcucmVwbGFjZSgvKFs7LF0pIC9nLCAnJDEnKTtcclxuXHQgICAgc3RyaW5nID0gc3RyaW5nLnJlcGxhY2UoLyAhL2csICchJyk7XHJcblx0ICAgIFxyXG5cdCAgICByZXR1cm4gc3RyaW5nO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogU3dpdGNoZXMgYmV0d2VlbiB0d28gZ2l2ZW4gY2xhc3Nlcy5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSBvYmplY3QgfCBlbGVtZW50XHJcblx0ICogQHBhcmFtIHN0cmluZyB8IGNsYXNzTmFtZVxyXG5cdCAqIEBwYXJhbSBzdHJpbmcgfCBuZXdDbGFzc05hbWVcclxuXHQgKiBAcmV0dXJuIG9iamVjdFxyXG5cdCAqL1xyXG5cdHN0YXRpYyBzd2l0Y2hDbGFzc2VzKGVsZW1lbnQsIGNsYXNzTmFtZSwgbmV3Q2xhc3NOYW1lKSBcclxuXHR7XHJcblx0XHR0aGlzLnJlbW92ZUNsYXNzKGVsZW1lbnQsIGNsYXNzTmFtZSk7XHJcblx0XHR0aGlzLmFkZENsYXNzKGVsZW1lbnQsIG5ld0NsYXNzTmFtZSk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBBZGRzIGNsYXNzIHRvIGEgZ2l2ZW4gZWxlbWVudC5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSBvYmplY3QgfCBlbGVtZW50XHJcblx0ICogQHBhcmFtIHN0cmluZyB8IGNsYXNzTmFtZVxyXG5cdCAqIEByZXR1cm4gb2JqZWN0XHJcblx0ICovXHJcblx0c3RhdGljIGFkZENsYXNzKGVsZW1lbnQsIGNsYXNzTmFtZSkgXHJcblx0e1xyXG5cdFx0aWYoZWxlbWVudCA9PT0gbnVsbCkge1xyXG5cdFx0XHR0aHJvdyBuZXcgSW52YWxpZEFyZ3VtZW50RXhjZXB0aW9uJDE7XHJcblx0XHR9XHJcblxyXG5cdFx0aWYoISBjbGFzc05hbWUgfHwgY2xhc3NOYW1lID09ICcnIHx8IHR5cGVvZiBjbGFzc05hbWUgPT09IHVuZGVmaW5lZCkge1xyXG5cdFx0XHRyZXR1cm4gZWxlbWVudDtcclxuXHRcdH1cclxuXHJcblx0XHRsZXQgY2xhc3NOYW1lcyA9IGNsYXNzTmFtZS5zcGxpdCgnICcpO1xyXG5cclxuXHRcdGNsYXNzTmFtZXMuZm9yRWFjaChmdW5jdGlvbihuYW1lKSB7XHJcblx0XHRcdGVsZW1lbnQuY2xhc3NMaXN0LmFkZChuYW1lKTtcclxuXHRcdH0pO1xyXG5cdFx0XHJcblx0XHRyZXR1cm4gZWxlbWVudDtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIENoZWNrcyBpZiBhbiBlbGVtZW50IGhhcyBhIGNsYXNzLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIEhUTUxFbGVtZW50IHwgZWxlbWVudFxyXG5cdCAqIEBwYXJhbSBzdHJpbmcgfCBjbGFzc05hbWVcclxuXHQgKiBAcmV0dXJuIGJvb2xcclxuXHQgKi9cclxuXHRzdGF0aWMgaGFzQ2xhc3MoZWxlbWVudCwgY2xhc3NOYW1lKVxyXG5cdHtcclxuXHRcdGlmIChlbGVtZW50ID09PSBudWxsKSB7XHJcblx0XHRcdHRocm93IG5ldyBJbnZhbGlkQXJndW1lbnRFeGNlcHRpb24kMSgnaGFzQ2xhc3MoKSBleHBlY3RzIHRoZSBmaXJzdCBhcmd1bWVudCB0byBiZSBhbiBIVE1MRWxlbWVudCBidXQgbnVsbCB3YXMgcGFzc2VkLicpO1xyXG5cdFx0fVxyXG5cclxuXHRcdGlmICghIGNsYXNzTmFtZSB8fCBjbGFzc05hbWUgPT0gJycgfHwgdHlwZW9mIGNsYXNzTmFtZSA9PSAndW5kZWZpbmVkJykge1xyXG5cdFx0XHRyZXR1cm47XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIGVsZW1lbnQuY2xhc3NOYW1lLmluZGV4T2YoY2xhc3NOYW1lKSAhPSAtMTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFJlbW92ZXMgY2xhc3MgZnJvbSBhIGdpdmVuIGVsZW1lbnQuXHJcblx0ICogXHJcblx0ICogQHBhcmFtIG9iamVjdCB8IGVsZW1lbnRcclxuXHQgKiBAcGFyYW0gc3RyaW5nIHwgY2xhc3NOYW1lXHJcblx0ICogQHJldHVybiBvYmplY3RcclxuXHQgKi9cclxuXHRzdGF0aWMgcmVtb3ZlQ2xhc3MoZWxlbWVudCwgY2xhc3NOYW1lKSBcclxuXHR7XHJcblx0XHRpZihlbGVtZW50ID09IG51bGwpIHtcclxuXHRcdFx0dGhyb3cgbmV3IEludmFsaWRBcmd1bWVudEV4Y2VwdGlvbiQxO1xyXG5cdFx0fVxyXG5cclxuXHRcdGlmKGNsYXNzTmFtZSA9PSAnJykge1xyXG5cdFx0XHRlbGVtZW50LmNsYXNzTmFtZSA9ICcnO1xyXG5cdFx0fSBlbHNlIHtcclxuXHJcblx0XHRcdGxldCBjbGFzc05hbWVzID0gY2xhc3NOYW1lLnNwbGl0KCcgJyk7XHJcblxyXG5cdFx0XHRjbGFzc05hbWVzLmZvckVhY2goZnVuY3Rpb24obmFtZSkge1xyXG5cdFx0XHRcdGVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShuYW1lKTtcclxuXHRcdFx0fSk7XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIGVsZW1lbnQ7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBSZW1vdmVzIGFuIGVsZW1lbnQgZnJvbSB0aGUgRE9NLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIEhUTUxFbGVtZW50XHJcblx0ICogQHJldHVybiB2b2lkXHJcblx0ICovXHJcblx0c3RhdGljIHJlbW92ZShlbGVtZW50KVxyXG5cdHtcclxuXHRcdGVsZW1lbnQucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChlbGVtZW50KTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEFkZHMgc3R5bGUgdGFnIHdpdGggZ2l2ZW4gaWQgYW5kIGNzcyB0byB0aGUgRE9NLlxyXG5cdCAqIFxyXG5cdCAqIEBwYXJhbSBzdHJpbmcgfCBpZFxyXG5cdCAqIEBwYXJhbSBzdHJpbmcgfCBjc3NcclxuXHQgKiBAcmV0dXJuIHZvaWRcclxuXHQgKi9cclxuXHRzdGF0aWMgYWRkU3R5bGUoaWQsIGNzcylcclxuXHR7XHJcblx0XHRpZiAodHlwZW9mIGNzcyAhPSAnc3RyaW5nJykge1xyXG5cdFx0XHR0aHJvdyBuZXcgSW52YWxpZEFyZ3VtZW50RXhjZXB0aW9uJDE7XHJcblx0XHR9XHJcblxyXG5cdFx0bGV0IGhlYWQgPSBkb2N1bWVudC5oZWFkIHx8IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdoZWFkJylbMF07XHJcblx0XHRsZXQgc3R5bGVUYWcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzdHlsZScpO1xyXG5cclxuXHRcdC8vIHBpcGUgaXQgdGhyb3VnaCB0aGUgbWluZmllclxyXG5cdCAgICBsZXQgQ1NTID0gdGhpcy5taW5pZnlDc3MoY3NzKTtcclxuXHQgICAgLy8gYWRkaW5nIGl0IHRvIHRoZSBzdHlsZXRhZ1xyXG5cdCAgICBzdHlsZVRhZy5pbm5lckhUTUwgPSBDU1M7XHJcblx0ICAgIC8vIGdpdmUgYW4gaWQgdG8gcmVjb2duaXplIHRoZSBzdHlsZSB0YWdcclxuXHRcdHN0eWxlVGFnLnNldEF0dHJpYnV0ZSgnaWQnLCBpZCk7XHJcblx0XHQvLyBhcHBlbmRpbmcgdGhhdCBzdHlsZSB0YWcgdG8gdGhlIERPTSBoZWFkIHRhZ1xyXG5cdFx0aGVhZC5hcHBlbmRDaGlsZChzdHlsZVRhZyk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBBZGRzIGxpbmtlZCBzdHlsZSB0YWcgd2l0aCBnaXZlbiBpZCBhbmQgc3JjIHRvIHRoZSBET00uXHJcblx0ICogXHJcblx0ICogQHBhcmFtIHN0cmluZyB8IGlkXHJcblx0ICogQHBhcmFtIHN0cmluZyB8IHNvdXJjZVxyXG5cdCAqIEByZXR1cm4gdm9pZFxyXG5cdCAqL1xyXG5cdHN0YXRpYyBhZGRMaW5rZWRTdHlsZShpZCwgc291cmNlKSBcclxuXHR7XHJcblx0XHRpZiAodHlwZW9mIHNvdXJjZSAhPSAnc3RyaW5nJykge1xyXG5cdFx0XHR0aHJvdyBuZXcgSW52YWxpZEFyZ3VtZW50RXhjZXB0aW9uJDEoJ0RPTS5hZGRMaW5rZWRTdHlsZSgpIGV4Y3BlY3RzIHRoZSBzZWNvbmQgcGFyYW1ldGVyIHRvIGJlIHN0cmluZywgYnV0ICcgKyB0eXBlb2Ygc291cmNlICsgJyB3YXMgcGFzc2VkIGluc3RlYWQuJyk7XHJcblx0XHR9XHJcblxyXG5cdFx0bGV0IGhlYWQgPSBkb2N1bWVudC5oZWFkIHx8IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdoZWFkJylbMF07XHJcblx0XHRsZXQgbGlua2VkU3R5bGVUYWcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaW5rJyk7XHJcblxyXG5cdCAgICAvLyBnaXZlIGFuIGlkIHRvIHJlY29nbml6ZSB0aGUgc3R5bGUgdGFnXHJcblx0XHRsaW5rZWRTdHlsZVRhZy5zZXRBdHRyaWJ1dGUoJ2lkJywgaWQpO1xyXG5cdFx0bGlua2VkU3R5bGVUYWcuc2V0QXR0cmlidXRlKCdocmVmJywgc291cmNlKTtcclxuXHRcdGxpbmtlZFN0eWxlVGFnLnNldEF0dHJpYnV0ZSgncmVsJywgJ3N0eWxlc2hlZXQnKTtcclxuXHRcdGxpbmtlZFN0eWxlVGFnLnNldEF0dHJpYnV0ZSgndHlwZScsICd0ZXh0L2NzcycpO1xyXG5cdFx0Ly8gYXBwZW5kaW5nIHRoYXQgc3R5bGUgdGFnIHRvIHRoZSBET00gaGVhZCB0YWdcclxuXHRcdGhlYWQuYXBwZW5kQ2hpbGQobGlua2VkU3R5bGVUYWcpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQ3JlYXRlcyBhbiBlbGVtZW50IHdpdGggdGhlIGdpdmVuIG9wdGlvbnMuXHJcblx0ICogXHJcblx0ICogQHBhcmFtIHN0cmluZyB8IGVsZW1lbnRUeXBlXHJcblx0ICogQHBhcmFtIG9iamVjdCB8IG9wdGlvbnNcclxuXHQgKiBAcmV0dXJuIEhUTUxFbGVtZW50XHJcblx0ICovXHJcblx0c3RhdGljIGNyZWF0ZUVsZW1lbnQoZWxlbWVudFR5cGUsIG9wdGlvbnMpXHJcblx0e1xyXG5cdFx0bGV0IGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KGVsZW1lbnRUeXBlKTtcclxuXHRcclxuXHRcdGlmIChvcHRpb25zID09PSB1bmRlZmluZWQpIHtcclxuXHRcdFx0cmV0dXJuIGVsZW1lbnQ7XHJcblx0XHR9XHJcblxyXG5cdFx0Zm9yIChsZXQgb3B0aW9uIGluIG9wdGlvbnMpIHtcclxuXHRcdFx0c3dpdGNoKG9wdGlvbilcclxuXHRcdFx0e1xyXG5cdFx0XHRcdGNhc2UgJ3RleHQnOlxyXG5cdFx0XHRcdGNhc2UgJ2h0bWwnOlxyXG5cdFx0XHRcdFx0ZWxlbWVudC5pbm5lckhUTUwgPSBvcHRpb25zW29wdGlvbl07XHJcblx0XHRcdFx0XHRicmVhaztcclxuXHRcdFx0XHRkZWZhdWx0OlxyXG5cdFx0XHRcdFx0ZWxlbWVudC5zZXRBdHRyaWJ1dGUob3B0aW9uLCBvcHRpb25zW29wdGlvbl0pO1xyXG5cdFx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gZWxlbWVudDtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFRvZ2dsZXMgdGhlIGdpdmVuIGNsYXNzZXMuXHJcblx0ICogXHJcblx0ICogQHBhcmFtIG9iamVjdCB8IGVsZW1lbnRcclxuXHQgKiBAcGFyYW0gc3RyaW5nIHwgY2xhc3NOYW1lXHJcblx0ICogQHJldHVybiBib29sXHJcblx0ICovXHJcblx0c3RhdGljIHRvZ2dsZUNsYXNzKGVsZW1lbnQsIGNsYXNzTmFtZSwgc2Vjb25kQ2xhc3NOYW1lKVxyXG5cdHtcclxuXHRcdGlmIChlbGVtZW50ID09IG51bGwgfHwgdHlwZW9mIGVsZW1lbnQgPT0gJ3VuZGVmaW5lZCcpIHtcclxuXHRcdFx0dGhyb3cgbmV3IEludmFsaWRBcmd1bWVudEV4Y2VwdGlvbiQxO1xyXG5cdFx0fVxyXG5cclxuXHRcdHNlY29uZENsYXNzTmFtZSA9IHNlY29uZENsYXNzTmFtZSB8fCB1bmRlZmluZWQ7XHJcblxyXG5cdFx0aWYoc2Vjb25kQ2xhc3NOYW1lKSB7XHJcblx0XHRcdGVsZW1lbnQuY2xhc3NMaXN0LnRvZ2dsZShzZWNvbmRDbGFzc05hbWUpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiBlbGVtZW50LmNsYXNzTGlzdC50b2dnbGUoY2xhc3NOYW1lKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEZpbmRzIGFuIGVsZW1lbnQgaW5zaWRlIG9mIHBhcmVudC5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSBzdHJpbmcgfCBzZWxlY3RvclxyXG5cdCAqIEBwYXJhbSBvYmplY3QgfCBjb250ZXh0XHJcblx0ICogQHJldHVybiBtaXhlZFxyXG5cdCAqL1xyXG5cdHN0YXRpYyBmaW5kKHNlbGVjdG9yLCBjb250ZXh0ID0gd2luZG93LmRvY3VtZW50KSBcclxuXHR7XHJcblx0XHRyZXR1cm4gcXVlcnlFbGVtZW50KHNlbGVjdG9yLCBjb250ZXh0KTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEdldCB0aGUgZG9jdW1lbnQgaGVpZ2h0LlxyXG5cdCAqXHJcblx0ICogQHJldHVybiBudW1iZXIgXHJcblx0ICovXHJcblx0c3RhdGljIGRvY3VtZW50SGVpZ2h0KClcclxuXHR7XHJcblx0XHRyZXR1cm4gTWF0aC5tYXgoXHJcblx0ICAgICAgICBkb2N1bWVudC5ib2R5LnNjcm9sbEhlaWdodCwgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnNjcm9sbEhlaWdodCxcclxuXHQgICAgICAgXHRkb2N1bWVudC5ib2R5Lm9mZnNldEhlaWdodCwgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50Lm9mZnNldEhlaWdodCxcclxuXHQgICAgICAgIGRvY3VtZW50LmJvZHkuY2xpZW50SGVpZ2h0LCBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50SGVpZ2h0XHJcblx0ICAgIClcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEdldCB0aGUgd2luZG93IGhlaWdodC5cclxuXHQgKlxyXG5cdCAqIEByZXR1cm4gbnVtYmVyIFxyXG5cdCAqL1xyXG5cdHN0YXRpYyB3aW5kb3dIZWlnaHQoKVxyXG5cdHtcclxuXHRcdHJldHVybiB3aW5kb3cuaW5uZXJIZWlnaHQgfHwgKGRvY3VtZW50LmRvY3VtZW50RWxlbWVudCB8fCBkb2N1bWVudC5ib2R5KS5jbGllbnRIZWlnaHQ7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBHZXQgdGhlIHNjcm9sbCBvZmZzZXQgcG9zaXRpb24uXHJcblx0ICpcclxuXHQgKiBAcmV0dXJuIG51bWJlclxyXG5cdCAqL1xyXG5cdHN0YXRpYyBzY3JvbGxZT2Zmc2V0KClcclxuXHR7XHJcblx0XHRyZXR1cm4gd2luZG93LnBhZ2VZT2Zmc2V0IHx8IChkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQgfHwgZG9jdW1lbnQuYm9keS5wYXJlbnROb2RlIHx8IGRvY3VtZW50LmJvZHkpLnNjcm9sbFRvcDtcclxuXHR9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBRdWVyaWVzIGFuIGVsZW1lbnQgZnJvbSB0aGUgRE9NLlxyXG4gKlxyXG4gKiBAcGFyYW0gc3RyaW5nIHwgc2VsZWN0b3JcclxuICogQHBhcmFtIG9iamVjdCB8IHBhcmVudEVsZW1lbnRcclxuICogQHJldHVybiBtaXhlZFxyXG4gKi9cclxuZnVuY3Rpb24gcXVlcnlFbGVtZW50KHNlbGVjdG9yLCBwYXJlbnRFbGVtZW50KSBcclxue1xyXG5cdGlmICh0eXBlb2Ygc2VsZWN0b3IgIT0gJ3N0cmluZycpIHtcclxuXHRcdHRocm93IG5ldyBJbnZhbGlkQXJndW1lbnRFeGNlcHRpb24kMSgncXVlcnlFbGVtZW50KCkgZXhwZWN0cyBmaXJzdCBwYXJhbWV0ZXIgdG8gYmUgYSBzdHJpbmcsIGJ1dCAnICsgdHlwZW9mIHNlbGVjdG9yICsgJyB3YXMgcGFzc2VkIGluc3RlYWQuJyk7XHJcblx0fVxyXG5cclxuXHRsZXQgZWxlbWVudCA9IHBhcmVudEVsZW1lbnQucXVlcnlTZWxlY3RvckFsbChzZWxlY3Rvcik7XHJcblxyXG5cdGlmIChlbGVtZW50Lmxlbmd0aCA9PSAwKSB7XHJcblx0XHRyZXR1cm4gbnVsbDtcclxuXHR9XHJcblxyXG5cdHJldHVybiAoZWxlbWVudC5sZW5ndGggPiAxKSA/IGVsZW1lbnQgOiBlbGVtZW50WzBdO1xyXG59XHJcblxyXG4vKipcclxuICogQ2hlY2tzIGlmIHBhcmVudCBoYXMgY2hpbGQuXHJcbiAqXHJcbiAqIEBwYXJhbSBvYmplY3QgfCBwYXJlbnRFbGVtZW50XHJcbiAqIEBwYXJhbSBvYmplY3QgfCBjaGlsZEVsZW1lbnRcclxuICogQHJldHVybiBib29sXHJcbiAqL1xyXG5mdW5jdGlvbiBoYXNDaGlsZChwYXJlbnRFbGVtZW50LCBjaGlsZEVsZW1lbnQpIFxyXG57XHJcbiAgICAgbGV0IG5vZGUgPSBjaGlsZEVsZW1lbnQucGFyZW50Tm9kZTtcclxuICAgICBcclxuICAgICB3aGlsZSAobm9kZSAhPSBudWxsKSB7XHJcbiAgICAgICAgIGlmIChub2RlID09IHBhcmVudEVsZW1lbnQpIHtcclxuICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICB9XHJcbiAgICAgICAgIG5vZGUgPSBub2RlLnBhcmVudE5vZGU7XHJcbiAgICAgfVxyXG4gICAgIFxyXG4gICAgIHJldHVybiBmYWxzZTtcclxufVxuXG4vKipcclxuICogQGZpbGUgXHJcbiAqIENvbW1vbiBjbGFzcy5cclxuICpcclxuICogQWRkcyBzb21lIHVzZWZ1bCBmdW5jdGlvbmFsaXR5IGZvclxyXG4gKiBjb21tb24gdGFza3MgLSBkYXRhIGNoZWNrcyBvciBkYXRhIG1hbmlwdWxhdGlvbi5cclxuICovXHJcblxyXG5jbGFzcyBDb21tb25cclxue1xyXG5cdC8qKlxyXG5cdCAqIEV4dGVuZCBhbiBvYmplY3QuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gb2JqZWN0IHwgY3VycmVudE9iamVjdFxyXG5cdCAqIEBwYXJhbSBvYmplY3QgfCBuZXdPYmplY3RcclxuXHQgKiBAcmV0dXJuIG9iamVjdFxyXG5cdCAqL1xyXG5cdHN0YXRpYyBleHRlbmQoY3VycmVudE9iamVjdCwgbmV3T2JqZWN0KSB7XHJcblx0XHR2YXIgZXh0ZW5kZWQgPSB7fTtcclxuXHQgICAgdmFyIHByb3A7XHJcblxyXG5cdCAgICBmb3IgKHByb3AgaW4gY3VycmVudE9iamVjdCkge1xyXG5cdCAgICAgICAgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChjdXJyZW50T2JqZWN0LCBwcm9wKSkge1xyXG5cdCAgICAgICAgICAgIGV4dGVuZGVkW3Byb3BdID0gY3VycmVudE9iamVjdFtwcm9wXTtcclxuXHQgICAgICAgIH1cclxuXHQgICAgfVxyXG5cclxuXHQgICAgZm9yIChwcm9wIGluIG5ld09iamVjdCkge1xyXG5cdCAgICAgICAgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChuZXdPYmplY3QsIHByb3ApKSB7XHJcblx0ICAgICAgICAgICAgZXh0ZW5kZWRbcHJvcF0gPSBuZXdPYmplY3RbcHJvcF07XHJcblx0ICAgICAgICB9XHJcblx0ICAgIH1cclxuXHJcblx0ICAgIHJldHVybiBleHRlbmRlZDtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIENoZWNrcyBmb3IgYSBuZWVkbGUgaW4gaHlzdGFjayBhcnJheS5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSBtaXhlZCB8IG5lZWRsZVxyXG5cdCAqIEBwYXJhbSBvYmplY3QgfCBvYmplY3RcclxuXHQgKiBAcmV0dXJuIGJvb2xcclxuXHQgKlxyXG5cdCAqL1xyXG5cdHN0YXRpYyBpbl9hcnJheShuZWVkbGUsIGh5c3RhY2spIHtcclxuXHRcdGlmICh0eXBlb2YgaHlzdGFjayA9PSAndW5kZWZpbmVkJyB8fCBoeXN0YWNrLmNvbnN0cnVjdG9yICE9PSBBcnJheSkge1xyXG5cdFx0XHR0aHJvdyBuZXcgSW52YWxpZEFyZ3VtZW50RXhjZXB0aW9uJDEoJ0NvbW1vbi5pbl9hcnJheSgpIGV4cGVjdHMgdGhlIHNlY29uZCBwYXJhbWV0ZXIgdG8gYmUgYW4gYXJyYXksIGJ1dCAnICsgdHlwZW9mIGh5c3RhY2sgKyAnIHdhcyBwYXNzZCBpbnN0ZWFkJyk7XHJcblx0XHR9XHJcblxyXG5cdFx0Zm9yICh2YXIgaSA9IDA7IGkgPD0gaHlzdGFjay5sZW5ndGg7IGkrKykge1xyXG5cdFx0XHRpZiAobmVlZGxlID09IGh5c3RhY2tbaV0pIHtcclxuXHRcdFx0XHRyZXR1cm4gdHJ1ZTtcdFxyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0XHJcblx0XHRyZXR1cm4gZmFsc2U7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBUYWtlcyBhbiBhcnJheSBhbmQgY2h1bmtzIGl0LlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIGFycmF5IHwgdG90YWxcclxuXHQgKiBAcGFyYW0gbnVtYmVyIHwgY2h1bmtzXHJcblx0ICogQHJldHVybiBhcnJheVxyXG5cdCAqL1xyXG5cdHN0YXRpYyBhcnJheV9jaHVuayh0b3RhbCwgc2l6ZSA9IDUpXHJcblx0eyAgICAgICAgXHJcbiAgICAgIFx0aWYgKGlzTmFOKHNpemUpKSB7XHJcbiAgICAgIFx0XHR0aHJvdyBuZXcgSW52YWxpZEFyZ3VtZW50RXhjZXB0aW9uJDEoJ0NvbW1vbi5hcnJheV9jaHVuaygpIGV4cGVjdHMgdGhlIHNlY29uZCBwYXJhbWV0ZXIgdG8gYmUgYSBudW1iZXIsIGJ1dCAnICsgdHlwZW9mIHNpemUgKyAnIHBhc3NlZCBpbnN0ZWFkLicpXHJcbiAgICAgIFx0fVxyXG5cclxuICAgICAgXHRzaXplID0gcGFyc2VJbnQoc2l6ZSk7XHJcbiAgICAgICBcclxuICAgICAgIFx0bGV0IGk7XHJcbiAgICAgICBcdGxldCBjb2xsZWN0aW9uID0gW107XHJcblxyXG4gICAgICAgIC8vIGFkZCBlYWNoIGNodW5rIHRvIHRoZSByZXN1bHRcclxuICAgICAgICBmb3IgKGkgPSAwOyBpIDwgTWF0aC5jZWlsKHRvdGFsLmxlbmd0aCAvIHNpemUpOyBpKyspIHtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHZhciBzdGFydCA9IGkgKiBzaXplO1xyXG4gICAgICAgICAgICB2YXIgZW5kID0gc3RhcnQgKyBzaXplO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgY29sbGVjdGlvbi5wdXNoKHRvdGFsLnNsaWNlKHN0YXJ0LCBlbmQpKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIHJldHVybiBjb2xsZWN0aW9uO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQ2hlY2tzIGlmIGFuIG9iamVjdCBpcyBlbXB0eS5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSBvYmplY3QgfCBvYmplY3RcclxuXHQgKiBAcmV0dXJuIGJvb2xcclxuXHQgKi9cclxuXHRzdGF0aWMgZW1wdHlPYmplY3Qob2JqZWN0KSB7XHJcblx0XHRmb3IgKGxldCBwcm9wIGluIG9iamVjdCkge1xyXG5cdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIHRydWU7XHJcblx0fVxyXG5cclxuXHJcblx0LyoqXHJcblx0ICogQ2hlY2tzIGlmIGEgZ2l2ZW4gb2JqZWN0IGNvbnRhaW5lZCBpbiBhbiBhcnJheS5cclxuXHQgKiBcclxuXHQgKiBAcGFyYW0gb2JqZWN0IHwgb2JqZWN0XHJcblx0ICogQHBhcmFtIGFycmF5IHwgaGF5c3RhY2tcclxuXHQgKiBAcmV0dXJuIGJvb2xcclxuXHQgKi9cclxuXHRzdGF0aWMgY29udGFpbnNPYmplY3Qob2JqZWN0LCBoeXN0YWNrKSBcclxuXHR7XHJcblx0ICAgIGxldCBpO1xyXG5cclxuXHQgICAgZm9yIChpID0gMDsgaSA8IGh5c3RhY2subGVuZ3RoOyBpKyspIHtcclxuXHQgICAgICAgIGlmICh0eXBlb2Ygb2JqZWN0ID09ICdzdHJpbmcnICYmIGh5c3RhY2tbaV0uY29uc3RydWN0b3IubmFtZSA9PT0gb2JqZWN0KSB7XHJcblx0ICAgICAgICBcdHJldHVybiB0cnVlO1xyXG5cdCAgICAgICAgfVxyXG5cclxuXHQgICAgICAgIGlmIChoeXN0YWNrW2ldID09PSBvYmplY3QpIHtcclxuXHQgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuXHQgICAgICAgIH1cclxuXHQgICAgfVxyXG5cclxuXHQgICAgcmV0dXJuIGZhbHNlO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQ2hlY2tzIGlmIGEgZ2l2ZW4gcGFyYW1ldGVyIGlzIGFuIG9iamVjdC5cclxuXHQgKiBcclxuXHQgKiBAcGFyYW0gb2JqZWN0IHwgb2JqZWN0XHJcblx0ICogQHJldHVybiBib29sXHJcblx0ICovXHJcblx0c3RhdGljIGlzT2JqZWN0KG9iamVjdCkgXHJcblx0e1xyXG5cdFx0cmV0dXJuIHR5cGVvZiBvYmplY3QgPT0gJ29iamVjdCc7XHJcblx0fVxyXG59XG5cbmxldCBkZWZhdWx0TWVzc2FnZSQxID0gJ1RoZSBkYXRhIHN0cnVjdHVyZSBpcyBpbnZhbGlkJztcclxuXHJcbmNsYXNzIEludmFsaWREYXRhU3RydWN0dXJlRXhjZXB0aW9uIGV4dGVuZHMgRXhjZXB0aW9uSGFuZGxlclxyXG57XHJcblx0Y29uc3RydWN0b3IobWVzc2FnZSA9IG51bGwpIFxyXG5cdHtcclxuXHRcdG1lc3NhZ2UgPSBtZXNzYWdlIHx8IGRlZmF1bHRNZXNzYWdlJDE7XHJcblx0XHRzdXBlcihtZXNzYWdlKTtcclxuICAgIFx0c3VwZXIuc3RhY2tUcmFjZSh0aGlzLCBtZXNzYWdlKTtcclxuICAgIH1cclxufVxuXG4vKipcclxuICogQGZpbGUgXHJcbiAqIFJlcXVlc3QgY2xhc3MuXHJcbiAqXHJcbiAqIEhhbmRsZXMgYWpheCByZXF1ZXN0cyBQT1NULCBHRVQgZXRjLi4uXHJcbiAqL1xyXG5cclxuLyoqXHJcbiAqIFN0b3JlcyB0aGUgZGVmYXVsdCBzZXR0aW5ncy5cclxuICpcclxuICogQHZhciBvYmplY3RcclxuICovXHJcblxyXG5sZXQgZGVmYXVsdFNldHRpbmdzID0ge1xyXG5cdGhlYWRlcnM6IHtcclxuXHRcdCdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbidcclxuXHR9LFxyXG5cdGFzeW5jOiB0cnVlXHJcbn07XHJcblxyXG5jbGFzcyBSZXF1ZXN0XHJcbntcclxuXHQvKipcclxuXHQgKiAtIEluaXRpYWxpemUgdGhlIHNldHRpbmdzIG9iamVjdC5cclxuXHQgKiAtIEluaXRpYWxpemUgdGhlIHhociBvYmplY3QuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gb2JqZWN0IHwgc2V0dGluZ3NcclxuXHQgKiBAcmV0dXJuIHZvaWRcclxuXHQgKi9cclxuXHRjb25zdHJ1Y3RvcihzZXR0aW5ncylcclxuXHR7XHJcblx0XHR0aGlzLnNldHRpbmdzID0gQ29tbW9uLmV4dGVuZChkZWZhdWx0U2V0dGluZ3MsIHNldHRpbmdzKTtcclxuXHRcdHRoaXMuc2V0RGVmYXVsdFJlcXVlc3RIZWFkZXIoKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFNldHMgdGhlIGRlZmF1bHQgcmVxdWVzdCBoZWFkZXJzLlxyXG5cdCAqXHJcblx0ICogQHJldHVybiB2b2lkXHJcblx0ICovXHJcblx0c2V0RGVmYXVsdFJlcXVlc3RIZWFkZXIoKVxyXG5cdHtcclxuXHRcdGxldCBoZWFkZXI7XHJcblx0XHRsZXQgaGVhZGVycyA9IHRoaXMuc2V0dGluZ3MuaGVhZGVycztcclxuXHRcdGxldCBhc3luYyA9IHRoaXMuc2V0dGluZ3MuYXN5bmM7XHJcblx0XHRsZXQgb3BlbiA9IFhNTEh0dHBSZXF1ZXN0LnByb3RvdHlwZS5vcGVuO1xyXG5cdFx0bGV0IHNldFJlcXVlc3RIZWFkZXIgPSBYTUxIdHRwUmVxdWVzdC5wcm90b3R5cGUuc2V0UmVxdWVzdEhlYWRlcjtcclxuXHJcblx0XHRYTUxIdHRwUmVxdWVzdC5wcm90b3R5cGUub3BlbiA9IGZ1bmN0aW9uKCkge1xyXG5cdFx0XHR2YXIgcmVzcG9uc2UgPSBvcGVuLmFwcGx5KHRoaXMsIGFyZ3VtZW50cywgYXN5bmMpO1xyXG5cclxuXHRcdFx0Zm9yIChoZWFkZXIgaW4gaGVhZGVycykge1xyXG5cdFx0XHRcdHRoaXMuc2V0UmVxdWVzdEhlYWRlcihoZWFkZXIsIGhlYWRlcnNbaGVhZGVyXSk7XHJcblx0XHRcdH1cclxuXHJcblx0ICBcdFx0cmV0dXJuIHJlc3BvbnNlO1xyXG5cdFx0fTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIE1ha2VzIGEgUE9TVCByZXF1ZXN0LlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIG9iamVjdCB8IG9wdGlvbnNcclxuXHQgKiBAcmV0dXJuIFByb21pc2VcclxuXHQgKi9cclxuXHRwb3N0KG9wdGlvbnMpXHJcblx0e1xyXG5cdFx0bGV0IHhociA9IHRoaXMueGhyO1xyXG5cclxuXHRcdGlmKG9wdGlvbnMuaGFzT3duUHJvcGVydHkoJ2JlZm9yZScpICYmIHR5cGVvZiBvcHRpb25zLmJlZm9yZSA9PSAnZnVuY3Rpb24nKSB7XHJcblx0XHRcdG9wdGlvbnMuYmVmb3JlLmNhbGwodGhpcyk7XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xyXG5cdFx0XHRpZih0eXBlb2Ygb3B0aW9ucyAhPT0gJ29iamVjdCcpIHtcclxuXHRcdFx0XHR0aHJvdyBuZXcgRXJyb3IoJ2dldCBleHBlY3RpbmcgYSBqc29uIG9iamVjdCB0byBiZSBwYXNzZWQgYXMgYW4gYXJndW1lbnQsIGJ1dCAnKyB0eXBlb2Ygb3B0aW9ucyArICcgd2FzIHBhc3NlZC4nKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0b3B0aW9ucy5kYXRhID0gb3B0aW9ucy5kYXRhIHx8IHt9O1xyXG5cclxuXHRcdFx0aWYodHlwZW9mIG9wdGlvbnMuZGF0YSAhPT0gJ29iamVjdCcpIHtcclxuXHRcdFx0XHR0aHJvdyBuZXcgRXJyb3IoJ2RhdGEgcHJvcGVydHkgZXhwZWN0aW5nIGEganNvbiBvYmplY3QgdG8gYmUgcGFzc2VkIGFzIGFuIGFyZ3VtZW50LCBidXQgJyArIHR5cGVvZiBvcHRpb25zLmRhdGEgKyAnIHdhcyBwYXNzZWQuJyk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHhoci5vcGVuKCdQT1NUJywgb3B0aW9ucy51cmwsIHRydWUpO1xyXG5cclxuXHRcdFx0eGhyLnJlc3BvbnNlVHlwZSA9IG9wdGlvbnMuZGF0YVR5cGUgfHwgJ2pzb24nO1xyXG5cdFx0XHR4aHIudGltZW91dCA9IG9wdGlvbnMudGltZW91dCB8fCAzMDAwO1xyXG5cclxuXHRcdFx0eGhyLm9ucmVhZHlzdGF0ZWNoYW5nZSA9IGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRcdGlmICh0aGlzLnJlYWR5U3RhdGUgPT0gNCAmJiAodGhpcy5zdGF0dXMgPj0gNDAwICYmIHRoaXMuc3RhdHVzIDw9IDUwMCkpIHtcclxuXHRcdFx0ICAgIFx0cmVqZWN0KHRoaXMucmVzcG9uc2VUZXh0KTtcclxuXHRcdFx0ICAgIH1cclxuXHRcdFx0ICAgIFxyXG5cdFx0XHQgICAgaWYgKHRoaXMucmVhZHlTdGF0ZSAhPSA0IHx8IHRoaXMuc3RhdHVzICE9IDIwMCkge1xyXG5cdFx0XHQgICAgXHRyZXR1cm47XHJcblx0XHRcdCAgICB9XHJcblx0ICAgICAgIFx0XHJcbiAgICAgICBcdFx0XHRyZXNvbHZlKHRoaXMucmVzcG9uc2UpO1xyXG4gICAgICAgXHRcdFx0XHJcbiAgICAgICBcdFx0XHRpZiAob3B0aW9ucy5oYXNPd25Qcm9wZXJ0eSgnYWZ0ZXInKSAmJiB0eXBlb2Ygb3B0aW9ucy5hZnRlciA9PSAnZnVuY3Rpb24nKSB7XHJcblx0XHRcdFx0XHRvcHRpb25zLmFmdGVyLmNhbGwodGhpcyk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9O1xyXG5cclxuXHRcdFx0eGhyLm9uZXJyb3IgPSBmdW5jdGlvbihtZXNzYWdlKSB7XHJcblx0XHRcdFx0aWYob3B0aW9ucy5oYXNPd25Qcm9wZXJ0eSgnZXJyb3InKSAmJiB0eXBlb2Ygb3B0aW9ucy5lcnJvciA9PSAnZnVuY3Rpb24nKSB7XHJcblx0XHRcdFx0XHRvcHRpb25zLmVycm9yKG1lc3NhZ2UpO1xyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0cmVqZWN0KG1lc3NhZ2UpO1xyXG5cdFx0XHR9O1xyXG5cclxuXHRcdFx0aWYoISBvcHRpb25zLmRhdGEpIHtcclxuXHRcdFx0XHR4aHIuc2VuZChudWxsKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0dmFyIHF1ZXJ5U3RyaW5nID0gT2JqZWN0LmtleXMob3B0aW9ucy5kYXRhKS5tYXAoZnVuY3Rpb24oa2V5KSB7XHJcblx0XHQgICAgICAgICAgICByZXR1cm4gZW5jb2RlVVJJQ29tcG9uZW50KGtleSkgKyAnPScgK1xyXG5cdFx0ICAgICAgICAgICAgICAgIFx0ZW5jb2RlVVJJQ29tcG9uZW50KG9wdGlvbnMuZGF0YVtrZXldKTtcclxuXHRcdCAgICAgICAgXHR9KS5qb2luKCcmJyk7XHJcblxyXG5cdFx0XHR4aHIuc2VuZChxdWVyeVN0cmluZyk7XHJcblx0XHR9KTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIE1ha2VzIGEgR0VUIGFqYXggcmVxdWVzdC5cclxuXHQgKiBcclxuXHQgKiBAcGFyYW0gb2JqZWN0IHwgb3B0aW9uc1xyXG5cdCAqIEByZXR1cm4gUHJvbWlzZVxyXG5cdCAqL1xyXG5cdGdldChvcHRpb25zKVxyXG5cdHtcclxuXHRcdGxldCB4aHIgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKSB8fCBuZXcgQWN0aXZlWE9iamVjdChcIk1pY3Jvc29mdC5YTUxIVFRQXCIpO1x0XHRcdFxyXG5cclxuXHRcdGlmIChvcHRpb25zLmhhc093blByb3BlcnR5KCdiZWZvcmUnKSAmJiB0eXBlb2Ygb3B0aW9ucy5iZWZvcmUgPT0gJ2Z1bmN0aW9uJykge1xyXG5cdFx0XHRvcHRpb25zLmJlZm9yZS5jYWxsKHRoaXMpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcclxuXHRcdFx0aWYgKHR5cGVvZiBvcHRpb25zICE9PSAnb2JqZWN0Jykge1xyXG5cdFx0XHRcdHRocm93IG5ldyBFcnJvcignZ2V0IGV4cGVjdGluZyBhIGpzb24gb2JqZWN0IHRvIGJlIHBhc3NlZCBhcyBhbiBhcmd1bWVudCwgYnV0ICcrIHR5cGVvZiBvcHRpb25zICsgJyB3YXMgcGFzc2VkLicpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRvcHRpb25zLmRhdGEgPSBvcHRpb25zLmRhdGEgfHwge307XHJcblxyXG5cdFx0XHRpZiAodHlwZW9mIG9wdGlvbnMuZGF0YSAhPT0gJ29iamVjdCcpIHtcclxuXHRcdFx0XHR0aHJvdyBuZXcgRXJyb3IoJ2RhdGEgcHJvcGVydHkgZXhwZWN0aW5nIGEganNvbiBvYmplY3QgdG8gYmUgcGFzc2VkIGFzIGFuIGFyZ3VtZW50LCBidXQgJyArIHR5cGVvZiBvcHRpb25zLmRhdGEgKyAnIHdhcyBwYXNzZWQuJyk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHhoci5vcGVuKCdHRVQnLCBvcHRpb25zLnVybCwgdHJ1ZSk7XHJcblxyXG5cdFx0XHR4aHIucmVzcG9uc2VUeXBlID0gb3B0aW9ucy5kYXRhVHlwZSB8fCAnanNvbic7XHJcblx0XHRcdHhoci50aW1lb3V0ID0gb3B0aW9ucy50aW1lb3V0IHx8IDMwMDA7XHJcblxyXG5cdFx0XHRpZiAoeGhyLnJlc3BvbnNlVHlwZSA9PSAnanNvbicpIHtcclxuXHRcdFx0XHR4aHIuc2V0UmVxdWVzdEhlYWRlcignQ29udGVudC1UeXBlJywgJ2FwcGxpY2F0aW9uL2pzb24nKTtcclxuXHRcdFx0XHR4aHIuc2V0UmVxdWVzdEhlYWRlcignQWNjZXB0JywgJ2FwcGxpY2F0aW9uL2pzb24nKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0aWYgKHhoci5yZXNwb25zZVR5cGUgPT0gJ2RvY3VtZW50Jykge1xyXG5cdFx0XHRcdHhoci5vdmVycmlkZU1pbWVUeXBlKCd0ZXh0L3htbCcpO1xyXG5cdFx0XHRcdHhoci5zZXRSZXF1ZXN0SGVhZGVyKCdDb250ZW50LVR5cGUnLCAndGV4dC9odG1sJyk7XHJcblx0XHRcdFx0eGhyLnNldFJlcXVlc3RIZWFkZXIoJ0FjY2VwdCcsICd0ZXh0L2h0bWwnKTtcdFxyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHR4aHIub25yZWFkeXN0YXRlY2hhbmdlID0gZnVuY3Rpb24oKSB7XHJcblx0XHRcdCAgICBpZiAodGhpcy5yZWFkeVN0YXRlID09IDQgJiYgKHRoaXMuc3RhdHVzID49IDQwMCAmJiB0aGlzLnN0YXR1cyA8PSA1MDApKSB7XHJcblx0XHRcdCAgICBcdHJlamVjdCh0aGlzLnJlc3BvbnNlVGV4dCk7XHJcblx0XHRcdCAgICB9XHJcblx0XHRcdCAgIFxyXG5cdFx0XHQgICAgaWYgKHRoaXMucmVhZHlTdGF0ZSA9PSA0ICYmIHRoaXMuc3RhdHVzID09IDIwMCkge1xyXG5cdFx0XHRcdCAgICBsZXQgcmVzcG9uc2UgPSB0aGlzLnJlc3BvbnNlIHx8IHRoaXMucmVzcG9uc2VUZXh0O1xyXG5cdFx0XHRcdCAgICByZXNwb25zZSA9ICh4aHIucmVzcG9uc2VUeXBlID09ICdqc29uJyAmJiB0eXBlb2YgcmVzcG9uc2UgIT0gJ29iamVjdCcpID8gSlNPTi5wYXJzZShyZXNwb25zZSkgOiByZXNwb25zZTtcclxuXHRcdFx0XHQgICAgcmVzb2x2ZShyZXNwb25zZSk7XHJcblx0ICAgICAgIFx0XHRcdFxyXG5cdCAgICAgICBcdFx0XHRpZiAob3B0aW9ucy5oYXNPd25Qcm9wZXJ0eSgnYWZ0ZXInKSAmJiB0eXBlb2Ygb3B0aW9ucy5hZnRlciA9PSAnZnVuY3Rpb24nKSB7XHJcblx0XHRcdFx0XHRcdG9wdGlvbnMuYWZ0ZXIuY2FsbCh0aGlzKTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9XHJcblx0XHRcdH07XHJcblxyXG5cdFx0XHR4aHIub25hYm9ydCA9IHhoci5vbmVycm9yID0gZnVuY3Rpb24obWVzc2FnZSkge1xyXG5cdFx0XHRcdGlmIChvcHRpb25zLmhhc093blByb3BlcnR5KCdlcnJvcicpICYmIHR5cGVvZiBvcHRpb25zLmVycm9yID09ICdmdW5jdGlvbicpIHtcclxuXHRcdFx0XHRcdG9wdGlvbnMuZXJyb3IobWVzc2FnZSk7XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRyZWplY3QobWVzc2FnZSk7XHJcblx0XHRcdH07XHJcblxyXG5cdFx0XHRpZiAoISBvcHRpb25zLmRhdGEpIHtcclxuXHRcdFx0XHR4aHIuc2VuZChudWxsKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0dmFyIHF1ZXJ5U3RyaW5nID0gT2JqZWN0LmtleXMob3B0aW9ucy5kYXRhKS5tYXAoZnVuY3Rpb24oa2V5KSB7XHJcblx0XHQgICAgICAgICAgICByZXR1cm4gZW5jb2RlVVJJQ29tcG9uZW50KGtleSkgKyAnPScgK1xyXG5cdFx0ICAgICAgICAgICAgICAgIFx0ZW5jb2RlVVJJQ29tcG9uZW50KG9wdGlvbnMuZGF0YVtrZXldKTtcclxuXHRcdCAgICAgICAgXHR9KS5qb2luKCcmJyk7XHJcblxyXG5cdFx0XHR4aHIuc2VuZChxdWVyeVN0cmluZyk7XHJcblx0XHR9KTtcclxuXHR9XHJcbn1cblxuY2xhc3MgVXJsXHJcbntcclxuXHQgc3RhdGljIHByb2Nlc3NBamF4RGF0YShzZWxlY3RvciwgY29udGVudCwgdXJsUGF0aClcclxuXHQge1xyXG5cdCAgICBsZXQgY29udGV4dCA9IERPTS5maW5kKHNlbGVjdG9yKTtcclxuXHJcblx0ICAgIGNvbnRleHQuaW5uZXJIVE1MID0gY29udGVudDtcclxuXHQgICAgbGV0IHRpdGxlID0gRE9NLmZpbmQoJ3RpdGxlJywgY29udGV4dCk7XHJcblx0ICAgIGRvY3VtZW50LnRpdGxlID0gdGl0bGUuaW5uZXJIVE1MO1xyXG5cdCAgICB3aW5kb3cuaGlzdG9yeS5wdXNoU3RhdGUoe1wiaHRtbFwiOmNvbnRlbnQsXCJwYWdlVGl0bGVcIjogdGl0bGUuaW5uZXJIVE1MfSwgXCJcIiwgdXJsUGF0aCk7XHJcblx0IH1cclxuXHJcblx0LyoqXHJcblx0ICogTW9kaWZpZXMgdGhlIGdldCBwYXJhbWV0ZXIgaW4gdGhlIHVybC5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSBzdHJpbmcgfCB1cmxcclxuXHQgKiBAcGFyYW0gc3RyaW5nIHwga2V5XHJcblx0ICogQHBhcmFtIG51bWJlciB8IHZhbHVlXHJcblx0ICogQHBhcmFtIHN0cmluZyB8IHNlcGFyYXRvclxyXG5cdCAqIEByZXR1cm4gc3RyaW5nXHJcblx0ICovXHJcblx0c3RhdGljIGNoYW5nZVF1ZXJ5UGFyYW1ldGVyVmFsdWUodXJsLCBrZXksIHZhbHVlLCBzZXBhcmF0b3IgPSAnPScpIFxyXG5cdHtcclxuXHRcdGxldCByZWdFeHAgPSBuZXcgUmVnRXhwKFwiKFs/Jl0pXCIgKyBrZXkgKyBzZXBhcmF0b3IgKyBcIi4qPygmfCQpXCIsIFwiaVwiKTtcclxuXHRcdGxldCBwYWlyU2VwYXJhdG9yID0gdXJsLmluZGV4T2YoJz8nKSAhPT0gLTEgPyBcIiZcIiA6IFwiP1wiO1xyXG5cdFx0ICBcclxuXHRcdGlmICh1cmwubWF0Y2gocmVnRXhwKSkge1xyXG5cdFx0XHRyZXR1cm4gdXJsLnJlcGxhY2UocmVnRXhwLCAnJDEnICsga2V5ICsgc2VwYXJhdG9yICsgdmFsdWUgKyAnJDInKTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHQgICAgcmV0dXJuIHVybCArIHBhaXJTZXBhcmF0b3IgKyBrZXkgKyBzZXBhcmF0b3IgKyB2YWx1ZTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIENoYW5nZXMgdGhlIHVybCB0byBhIGdpdmVuIHBhZ2UgbnVtYmVyLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIHN0cmluZyB8IHBhcmFtZXRlcktleVxyXG5cdCAqIEBwYXJhbSBzdHJpbmcgfCBwYXJhbWV0ZXJWYWx1ZVxyXG5cdCAqIEBwYXJhbSBzdHJpbmcgfCBzZXBhcmF0b3JcclxuXHQgKiBAcmV0dXJuIHZvaWRcclxuXHQgKi9cclxuXHRzdGF0aWMgY2hhbmdlUGFyYW1ldGVyKHBhcmFtZXRlcktleSwgcGFyYW1ldGVyVmFsdWUsIHNlcGFyYXRvciA9ICc9JylcclxuXHR7XHJcblx0XHRwYXJhbWV0ZXJWYWx1ZSA9ICBwYXJhbWV0ZXJWYWx1ZSB8fCB0aGlzLnF1ZXJ5U3RyaW5nKClbcGFyYW1ldGVyS2V5XTtcclxuXHRcdGxldCByZXF1ZXN0ZWRVcmwgPSB0aGlzLmNoYW5nZVF1ZXJ5UGFyYW1ldGVyVmFsdWUod2luZG93LmxvY2F0aW9uLmhyZWYsIHBhcmFtZXRlcktleSwgcGFyYW1ldGVyVmFsdWUsIHNlcGFyYXRvcik7XHJcblx0XHR3aW5kb3cuaGlzdG9yeS5yZXBsYWNlU3RhdGUoJycsICcnLCByZXF1ZXN0ZWRVcmwpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQ2hhbmdlcyB0aGUgdXJsLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIHN0cmluZyB8IHVybFxyXG5cdCAqIEByZXR1cm4gdm9pZFxyXG5cdCAqL1xyXG5cdHN0YXRpYyBjaGFuZ2UodXJsKVxyXG5cdHtcclxuXHRcdGlmICh1cmwuY2hhckF0KDApICE9ICcvJykge1xyXG5cdFx0XHR1cmwgPSAnLycgKyB1cmw7XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKHVybCA9PSAnLycpIHtcclxuXHRcdFx0dXJsID0gJy9ob21lJztcclxuXHRcdH1cclxuXHJcblx0XHRsZXQgcHJldmlvdXNVcmwgPSB3aW5kb3cubG9jYXRpb24ucGF0aG5hbWU7XHJcblx0XHRcclxuXHRcdHdpbmRvdy5oaXN0b3J5LnB1c2hTdGF0ZSh7XCJwcmV2aW91c1wiOiBwcmV2aW91c1VybH0sICcnLCB1cmwpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogR2V0IHRoZSBnZXQgdmFyaWFibGVzIGZyb20gdGhlIHVybC5cclxuXHQgKlxyXG5cdCAqIEByZXR1cm4gYXJyYXlcclxuXHQgKi9cclxuXHRzdGF0aWMgcXVlcnlTdHJpbmcoKSBcclxuXHR7XHJcblx0XHRsZXQgdmFycyA9IHt9O1xyXG5cdFx0bGV0IHBhcnRzID0gd2luZG93LmxvY2F0aW9uLmhyZWYucmVwbGFjZSgvWz8mXSsoW149Jl0rKT0oW14mXSopL2dpLCBmdW5jdGlvbihtLCBrZXksIHZhbHVlKSB7XHJcblx0XHRcdHZhcnNba2V5XSA9IHZhbHVlO1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0cmV0dXJuIHZhcnM7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBDaGVja3MgaWYgYSBnaXZlbiB1cmwgaGF2ZSBwYXJhbWV0ZXJzLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIHN0cmluZyB8IHVybFxyXG5cdCAqIEByZXR1cm4gYm9vbFxyXG5cdCAqL1xyXG5cdHN0YXRpYyBoYXNQYXJhbWV0ZXJzKHVybClcclxuXHR7XHJcblx0XHRyZXR1cm4gdXJsLmluZGV4T2YoJz8nKSA+PSAwO1xyXG5cdH1cclxuXHJcblxyXG59XG5cbi8qKlxyXG4gKiBAY2xhc3MgUm91dGVyXHJcbiAqXHJcbiAqIEhhbmRsZXMgdGhlIGNsaWVudC1zaWRlIHJvdXRpbmcuXHJcbiAqL1xyXG5cclxuY2xhc3MgUm91dGVyXHJcbntcclxuXHQvKipcclxuXHQgKiAtIEluaXRpYWxpemUgdGhlIGNvbnRhaW5lclxyXG5cdCAqIC0gSW5pdGlhbGl6ZSB0aGUgcm91dGVzXHJcblx0ICogLSBBdHRhY2ggZXZlbnQgbGlzdGVuZXJzIGZvcjpcclxuXHQgKiBjbGljaywgcG9wc3RhdGUsIHRvdWNoc3RhcnQsIGhhc2hjaGFuZ2UuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gQXBwXFxDb3JlXFxDb250YWluZXIgXHJcblx0ICogQHJldHVybiB2b2lkXHJcblx0ICovXHJcblx0Y29uc3RydWN0b3IoY29udGFpbmVyKVxyXG5cdHtcclxuXHRcdHRoaXMuY29udGFpbmVyID0gY29udGFpbmVyO1xyXG5cdFx0dGhpcy5yb3V0ZXMgPSB0aGlzLmJ1aWxkUm91dGVzKCk7XHJcblx0XHRcclxuXHRcdGlmICh0eXBlb2YgaGlzdG9yeSAhPSAndW5kZWZpbmVkJykge1xyXG5cdFx0XHRoaXN0b3J5LnJlcGxhY2VTdGF0ZSgnJywgJycsIHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZSk7XHJcblx0XHR9XHJcblxyXG5cdFx0d2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3BvcHN0YXRlJywgdGhpcy5yZWdpc3Rlci5iaW5kKHRoaXMpKTtcclxuXHRcdHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdoYXNoY2hhbmdlJywgdGhpcy5yZWdpc3Rlci5iaW5kKHRoaXMpKTtcclxuXHRcdHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCd0b3VjaHN0YXJ0JywgdGhpcy5yZWdpc3Rlci5iaW5kKHRoaXMpKTtcclxuXHRcdHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMucmVnaXN0ZXIuYmluZCh0aGlzKSk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBFbnRyeSBwb2ludCBmb3IgdGhlIGFwcGxpY2F0aW9uLlxyXG5cdCAqIGZyb20gaGVyZSB3aWxsIGJlIGRlY2lkZWQgd2hpY2hcclxuXHQgKiBjb21wb25lbnQgc2hvdWxkIGJlIGRpc3BsYXllZC5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSBvYmplY3QgfCBldmVudFxyXG5cdCAqIEByZXR1cm4gdm9pZFxyXG5cdCAqL1xyXG5cdHJlZ2lzdGVyKGV2ZW50KVxyXG5cdHtcclxuXHRcdGxldCB1cmwgPSB0aGlzLnBhcnNlVXJsKCk7XHJcblxyXG5cdFx0aWYgKHR5cGVvZiBldmVudCA9PSAndW5kZWZpbmVkJykge1xyXG5cdFx0XHR0aGlzLnBhcnNlSHR0cFJlcXVlc3QodXJsKTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdHRoaXMucGFyc2VFdmVudChldmVudCwgdXJsKTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdHBhcnNlVXJsKClcclxuXHR7XHJcblx0XHRsZXQgdXJsID0gd2luZG93LmxvY2F0aW9uLmhyZWY7XHJcblxyXG5cdFx0aWYgKFVybC5oYXNQYXJhbWV0ZXJzKHVybCkpIHtcclxuXHRcdFx0dGhpcy5xdWVyeVN0cmluZyA9IHVybC5zcGxpdCgnPycpWzFdO1xyXG5cdFx0XHR1cmwgPSB3aW5kb3cubG9jYXRpb24ucGF0aG5hbWU7XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKHVybC5pbmRleE9mKCcjIy8nKSA+PSAwKSB7XHJcblx0XHRcdHVybCA9IHVybC5yZXBsYWNlKCcjIy8nLCAnJyk7XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIHVybDtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFBhcnNlIGEgZnVsbCBodHRwIGNvbW1pbmcgcmVxdWVzdC5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSBzdHJpbmcgfCB1cmxcclxuXHQgKiBAcmV0dXJuIHZvaWRcclxuXHQgKi9cclxuXHRwYXJzZUh0dHBSZXF1ZXN0KHVybClcclxuXHR7XHJcblx0XHR0aGlzLmRpc3BhdGNoKHVybCk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBQYXJzZSBhIHJlcXVlc3QgaGFwcGVucyBieSB0cmlnZ2VyZWQgZXZlbnQuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gc3RyaW5nIHwgdXJsXHJcblx0ICogQHJldHVybiB2b2lkXHJcblx0ICovXHJcblx0cGFyc2VFdmVudChldmVudCwgdXJsKVxyXG5cdHtcclxuXHRcdHRoaXMuY29udGFpbmVyLkV2ZW50cy5zdWJzY3JpYmUoJ3JvdXRlLmRpc3BhdGNoZWQnLCBmdW5jdGlvbih1cmwpIHtcclxuXHRcdFx0VXJsLmNoYW5nZSh1cmwpO1xyXG5cdFx0fS5iaW5kKHRoaXMpKTtcclxuXHJcblx0XHRzd2l0Y2goZXZlbnQudHlwZSlcclxuXHRcdHtcclxuXHRcdFx0Y2FzZSAndG91Y2hzdGFydCc6XHJcblx0XHRcdGNhc2UgJ2NsaWNrJzpcclxuXHRcdFx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdFx0XHRcdFxyXG5cdFx0XHRcdC8vIGJhc2ljYWxseSBleGl0LCBzdG9wIHBhcnNpbmcsIHRoZSB1c2VyIGRpZCBub3QgY2xpY2sgYSBsaW5rXHJcblx0XHRcdFx0aWYgKGV2ZW50LnRhcmdldC50YWdOYW1lLnRvTG93ZXJDYXNlKCkgIT0gJ2EnKSB7XHJcblx0XHRcdFx0XHRyZXR1cm47IFxyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0Ly8gZ2V0IHRoZSBsaW5rIGhyZWYgYXR0cmlidXRlLCBvbmx5IHRoZSBwYXRoIHNlZ21lbnQuXHJcblx0XHRcdFx0aWYgKHR5cGVvZiBldmVudC50YXJnZXQucGF0aG5hbWUgIT0gJ3VuZGVmaW5lZCcpIHtcclxuXHRcdFx0XHRcdHVybCA9IGV2ZW50LnRhcmdldC5wYXRobmFtZTtcclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRjYXNlICdwb3BzdGF0ZSc6XHJcblx0XHRcdFx0dXJsID0gZXZlbnQuc3RhdGUucHJldmlvdXM7XHJcblx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdGNhc2UgJ2hhc2hjaGFuZ2UnOlxyXG5cclxuXHRcdFx0XHRicmVhaztcclxuXHRcdH1cclxuXHJcblx0XHR0aGlzLmN1cnJlbnQgPSB1cmw7XHJcblx0XHR0aGlzLmRpc3BhdGNoKHVybCk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBEaXNwYWNoZXMgdGhlIHJvdXRlIGZvciBhIGdpdmVuIHVybC5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSBzdHJpbmcgfCB1cmxcclxuXHQgKiBAcmV0dXJuIHZvaWRcclxuXHQgKi9cclxuXHRkaXNwYXRjaCh1cmwpXHJcblx0e1xyXG5cdFx0Ly8gQHRvZG8gY2hlY2sgZm9yIHBhcmFtZXRlcnMgcm91dGVzIGFuZCByZXBsYWNlIGZldGNoIHRoZSB2YWx1ZSBmcm9tIHRoZSB1cmwuXHJcblx0XHRjb25zb2xlLmxvZyh1cmwpO1xyXG5cclxuXHRcdGlmICh0aGlzLnJvdXRlcy5pbmRleE9mKHVybCkgIT0gLTEpIHtcclxuXHRcdFx0c3dpdGNoKHVybClcclxuXHRcdFx0e1xyXG5cdFx0XHRcdGNhc2UgJy8nOlxyXG5cdFx0XHRcdGNhc2UgJy9ob21lJzpcclxuXHRcdFx0XHRcdGNvbnNvbGUubG9nKCdob21lJyk7XHJcblx0XHRcdFx0XHR0aGlzLmNvbnRhaW5lci5Qcm9kdWN0cy5oaWRlQWxsKCk7XHJcblx0XHRcdFx0XHR0aGlzLmNvbnRhaW5lci5GaWx0ZXIuc2hvdygpO1xyXG5cdFx0XHRcdFx0dGhpcy5jb250YWluZXIuUHJvZHVjdHMuc2hvdygpO1xyXG5cdFx0XHRcdFx0dGhpcy5jb250YWluZXIuQ2FydC5zaG93KCk7XHJcblx0XHRcdFx0XHR0aGlzLmNvbnRhaW5lci5QYWdpbmF0aW9uLnNob3coKTtcclxuXHRcdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRcdGNhc2UgJy9jaGVja291dCc6XHJcblx0XHRcdFx0XHRjb25zb2xlLmxvZygnY2hlY2tvdXQnKTtcclxuXHRcdFx0XHRcdHRoaXMuY29udGFpbmVyLkNoZWNrb3V0LmhpZGVBbGwoKTtcclxuXHRcdFx0XHRcdHRoaXMuY29udGFpbmVyLkNoZWNrb3V0LnNob3coKTtcclxuXHRcdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRcdGNhc2UgJy9pbmZvLzpwcm9kdWN0JzpcclxuXHRcdFx0XHRcdGNvbnNvbGUubG9nKCdzaW5nbGUgcHJvZHVjdCBpbmZvIHBhZ2UnKTtcclxuXHRcdFx0XHRcdC8vIEB0b2RvIGJ1aWxkIHByb2R1Y3QgaW5mbyBjb21wb25lbnRcclxuXHRcdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRcdGRlZmF1bHQ6XHJcblx0XHRcdFx0XHRjb25zb2xlLmxvZygnZGVmYXVsdCByb3V0ZScpO1xyXG5cdFx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdH1cclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdHRocm93IG5ldyBFcnJvcignTm8gbWF0Y2hpbmcgcm91dGUgZm91bmQhJyk7XHJcblx0XHR9XHJcblxyXG5cdFx0dGhpcy5jb250YWluZXIuRXZlbnRzLnB1Ymxpc2goJ3JvdXRlLmRpc3BhdGNoZWQnLCB1cmwpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQnVpbGRzIHRoZSByb3V0ZXMuXHJcblx0ICpcclxuXHQgKiBAcmV0dXJuIGFycmF5XHJcblx0ICovXHJcblx0YnVpbGRSb3V0ZXMoKVxyXG5cdHtcclxuXHRcdHJldHVybiBbJy8nLCAnL2hvbWUnLCAnL2NoZWNrb3V0JywgJy9pbmZvLzpwcm9kdWN0J107XHJcblx0fVxyXG59XG5cbmxldCBkZWZhdWx0TWVzc2FnZSQyID0gJ1RoZSBldmVudCB5b3UgY2FsbGVkIGRvZXMgbm90IGV4aXN0cyBvciB5b3Ugc3VwcGxpZWQgd3JvbmcgYXJndW1lbnQnO1xyXG5cclxuY2xhc3MgQmFkRXZlbnRDYWxsRXhjZXB0aW9uIGV4dGVuZHMgRXhjZXB0aW9uSGFuZGxlclxyXG57XHJcblx0Y29uc3RydWN0b3IobWVzc2FnZSA9IG51bGwpIFxyXG5cdHtcclxuXHRcdG1lc3NhZ2UgPSBtZXNzYWdlIHx8IGRlZmF1bHRNZXNzYWdlJDI7XHJcblx0XHRzdXBlcihtZXNzYWdlKTtcclxuICAgIFx0c3VwZXIuc3RhY2tUcmFjZSh0aGlzLCBtZXNzYWdlKTtcclxuICAgIH1cclxufVxuXG4vKipcclxuICogQGZpbGUgXHJcbiAqIEV2ZW50TWFuYWdlciBjbGFzcy5cclxuICpcclxuICogSGFuZGxlcyBzdWJzY3JpcGlvbnMgYW5kIHB1Ymxpc2hpbmcgb2YgZXZlbnRzLlxyXG4gKi9cclxuXHJcbmNsYXNzIEV2ZW50TWFuYWdlclxyXG57XHJcblx0LyoqXHJcblx0ICogU3RvcmVzIHRoZSBldmVudHMgY2FsbGJhY2tzLlxyXG5cdCAqIFxyXG5cdCAqIEB2YXIgYXJyYXlcclxuXHQgKi9cclxuXHRjb25zdHJ1Y3RvcigpXHJcblx0e1xyXG5cdFx0dGhpcy5ldmVudHMgPSB7fTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFN1YnNjcmliaW5nIHRvIGFuIGV2ZW50LlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIHN0cmluZyB8IG5hbWVcclxuXHQgKiBAcGFyYW0gZnVuY3Rpb24gfCBjYWxsYmFja1xyXG5cdCAqIEByZXR1cm4gdm9pZFxyXG5cdCAqL1xyXG5cdHN1YnNjcmliZShuYW1lLCBjYWxsYmFjaykgXHJcblx0e1xyXG5cdFx0aWYgKHR5cGVvZiBjYWxsYmFjayAhPT0gJ2Z1bmN0aW9uJykge1xyXG5cdFx0XHR0aHJvdyBuZXcgSW52YWxpZEFyZ3VtZW50RXhjZXB0aW9uO1xyXG5cdFx0fVxyXG5cclxuXHRcdGlmICh0eXBlb2YgdGhpcy5ldmVudHNbbmFtZV0gPT0gJ3VuZGVmaW5lZCcpIHtcclxuXHRcdFx0dGhpcy5ldmVudHNbbmFtZV0gPSBbXTtcclxuXHRcdH1cclxuXHJcblx0XHR0aGlzLmV2ZW50c1tuYW1lXS5wdXNoKGNhbGxiYWNrKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFB1Ymxpc2ggYW4gZXZlbnQgdG8gYWxsIHN1YnNjcmliZXJzLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIHN0cmluZyB8IG5hbWVcclxuXHQgKiBAcGFyYW0gbGlzdCB8IGRhdGFcclxuXHQgKiBAcmV0dXJuIHZvaWRcclxuXHQgKi9cclxuXHRwdWJsaXNoKG5hbWUsIC4uLmRhdGEpIFxyXG5cdHtcclxuXHRcdGRhdGEgPSBkYXRhIHx8IG51bGw7XHJcblxyXG5cdFx0Ly8gSWYgdGhlcmUgYXJlIG5vIHN1YnNjcmliZXJzIHNpbXBseSBpZ25vcmUgdGhhdCBldmVudC5cclxuXHRcdGlmICh0eXBlb2YgdGhpcy5ldmVudHNbbmFtZV0gPT0gJ3VuZGVmaW5lZCcpIHtcclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0fVxyXG5cclxuXHRcdHRoaXMuZXZlbnRzW25hbWVdLmZvckVhY2goZnVuY3Rpb24oY2FsbGJhY2spIHtcclxuXHRcdFx0aWYodHlwZW9mIGNhbGxiYWNrICE9ICdmdW5jdGlvbicpIHtcclxuXHRcdFx0XHR0aHJvdyBuZXcgSW52YWxpZEFyZ3VtZW50RXhjZXB0aW9uKCdzdWJzY3JpYmUoKSBzaG91bGQgcmVjaWV2ZSBjYWxsYmFjayBhcyBzZWNvbmQgcGFyYW1ldGVyLCBidXQgJysgdHlwZW9mIGNhbGxiYWNrICsnIHdhcyBwYXNzZWQnKTtcclxuXHRcdFx0fVxyXG5cdFx0XHRcclxuXHRcdFx0cmV0dXJuIGNhbGxiYWNrKC4uLmRhdGEpO1xyXG5cdFx0fSk7XHJcblx0fVxyXG59XG5cbi8qKlxyXG4gKiBAZmlsZSBcclxuICogQ29va2llIGNsYXNzLlxyXG4gKlxyXG4gKiBBZGRzIHNvbWUgdXNlZnVsIGZ1bmN0aW9uYWxpdHkgZm9yXHJcbiAqIHNldHRpbmcgb3IgZ2V0dGluZyBjb29raWVzLlxyXG4gKi9cclxuXHRcclxuY2xhc3MgQ29va2llXHJcbntcclxuXHQvKipcclxuIFx0KiBTZXRzIGEgY29va2llLlxyXG4gXHQqIFxyXG4gXHQqIEBwYXJhbSBzdHJpbmcgfCBuYW1lXHJcbiBcdCogQHBhcmFtIEpTT04gfCB2YWx1ZVxyXG4gXHQqIEBwYXJhbSBpbnRlZ2VyIHwgZGF5c1xyXG4gXHQqIEByZXR1cm4gdm9pZFxyXG5cdCovXHJcblx0c3RhdGljIHNldChuYW1lLCB2YWx1ZSwgZGF5cykgXHJcblx0e1xyXG5cdFx0aWYgKHZhbHVlLmNvbnN0cnVjdG9yLm5hbWUgID09ICdPYmplY3QnIHx8IHZhbHVlLmNvbnN0cnVjdG9yLm5hbWUgPT0gJ0FycmF5Jykge1xyXG5cdFx0XHR2YWx1ZSA9IEpTT04uc3RyaW5naWZ5KHZhbHVlKTtcclxuXHRcdH1cclxuXHJcblx0XHRkYXlzID0gZGF5cyB8fCAxMDtcclxuXHJcblx0ICAgIGxldCBleHBpcmVzO1xyXG5cdCAgICBcclxuXHQgICAgaWYgKGRheXMpIHtcclxuXHQgICAgICAgIGxldCBkYXRlID0gbmV3IERhdGUoKTtcclxuXHQgICAgICAgIGRhdGUuc2V0VGltZShkYXRlLmdldFRpbWUoKSArIChkYXlzICogMjQgKiA2MCAqIDYwICogMTAwMCkpO1xyXG5cdCAgICAgICAgZXhwaXJlcyA9IFwiOyBleHBpcmVzPVwiICsgZGF0ZS50b0dNVFN0cmluZygpO1xyXG5cdCAgICB9IGVsc2Uge1xyXG5cdCAgICAgICAgZXhwaXJlcyA9IFwiXCI7XHJcblx0ICAgIH1cclxuXHJcblx0ICAgIGRvY3VtZW50LmNvb2tpZSA9IG5hbWUgKyBcIj1cIiArIHZhbHVlICsgZXhwaXJlcyArIFwiOyBwYXRoPS9cIjtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFJldHJpZXZlcyB0aGUgY29va2llIGJ5IG5hbWUuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gc3RyaW5nIHwgbmFtZVxyXG4gXHQgKiBAcmV0dXJuIEpTT05cclxuXHQgKi9cclxuXHRzdGF0aWMgZ2V0KG5hbWUpIFxyXG5cdHtcclxuXHQgICAgaWYgKGRvY3VtZW50LmNvb2tpZS5sZW5ndGggPiAwKSB7XHJcblx0ICAgICAgICBsZXQgY19zdGFydCA9IGRvY3VtZW50LmNvb2tpZS5pbmRleE9mKG5hbWUgKyBcIj1cIik7XHJcblx0ICAgICAgICBcclxuXHQgICAgICAgIGlmIChjX3N0YXJ0ICE9IC0xKSB7XHJcblx0ICAgICAgICAgICAgY19zdGFydCA9IGNfc3RhcnQgKyBuYW1lLmxlbmd0aCArIDE7XHJcblx0ICAgICAgICAgICAgbGV0IGNfZW5kID0gZG9jdW1lbnQuY29va2llLmluZGV4T2YoXCI7XCIsIGNfc3RhcnQpO1xyXG5cdCAgICAgICAgICAgIFxyXG5cdCAgICAgICAgICAgIGlmIChjX2VuZCA9PSAtMSkge1xyXG5cdCAgICAgICAgICAgICAgICBjX2VuZCA9IGRvY3VtZW50LmNvb2tpZS5sZW5ndGg7XHJcblx0ICAgICAgICAgICAgfVxyXG5cclxuXHQgICAgICAgICAgICByZXR1cm4gSlNPTi5wYXJzZSh1bmVzY2FwZShkb2N1bWVudC5jb29raWUuc3Vic3RyaW5nKGNfc3RhcnQsIGNfZW5kKSkpO1xyXG5cdCAgICAgICAgfVxyXG5cdCAgICB9XHJcblxyXG5cdCAgICByZXR1cm4ge307XHJcblx0fVxyXG59XG5cbi8qKlxyXG4gKiBAY2xhc3MgQmFzZUNvbXBvbmVudFxyXG4gKiBcclxuICogQ29tbW9uIGZ1bmN0aW9uYWxsaXR5IG9mIGNvbXBvbmVudHMuIFxyXG4gKi9cclxuXHJcbmNsYXNzIEJhc2VDb21wb25lbnRcclxue1xyXG5cdC8qKlxyXG5cdCAqIEhpZGVzIHRoZSBjb21wb25lbnQgZnJvbSB0aGUgRE9NLlxyXG5cdCAqXHJcblx0ICogQHJldHVybiB2b2lkIFxyXG5cdCAqL1xyXG5cdGhpZGUoKVxyXG5cdHtcclxuXHRcdGlmICh0eXBlb2YgdGhpcy5lbGVtZW50ICE9ICd1bmRlZmluZWQnKSB7XHJcblx0XHRcdHRoaXMuZWxlbWVudC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogU2hvd3MgdGhlIGVsZW1lbnQgb24gdGhlIERPTS5cclxuXHQgKlxyXG5cdCAqIEByZXR1cm4gdm9pZCBcclxuXHQgKi9cclxuXHRzaG93KClcclxuXHR7XHJcblx0XHRpZiAodHlwZW9mIHRoaXMuZWxlbWVudCAhPSAndW5kZWZpbmVkJykge1xyXG5cdFx0XHR0aGlzLmVsZW1lbnQuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBFbXB0eSB0aGUgY29tcG9uZW50LlxyXG5cdCAqXHJcblx0ICogQHJldHVybiB2b2lkIFxyXG5cdCAqL1xyXG5cdGVtcHR5KClcclxuXHR7XHJcblx0XHRpZiAodHlwZW9mIHRoaXMuZWxlbWVudCAhPSAndW5kZWZpbmVkJykge1xyXG5cdFx0XHR0aGlzLmVsZW1lbnQuaW5uZXJIVE1MID0gJyc7XHJcblx0XHR9XHJcblx0fVxyXG59XG5cbmxldCBkZWZhdWx0TWVzc2FnZSQzID0gJ1RoZSBpdGVtIHlvdSBhcmUgdHJ5aW5nIHRvIGFkZCBtdXN0IGNvbnRhaW4gYSB1bmlxdWUgaWQnO1xyXG5cclxuY2xhc3MgSW52YWxpZENhcnRJdGVtRXhjZXB0aW9uIGV4dGVuZHMgRXhjZXB0aW9uSGFuZGxlclxyXG57XHJcblx0Y29uc3RydWN0b3IobWVzc2FnZSA9IG51bGwpIFxyXG5cdHtcclxuXHRcdG1lc3NhZ2UgPSBtZXNzYWdlIHx8IGRlZmF1bHRNZXNzYWdlJDM7XHJcblx0XHRzdXBlcihtZXNzYWdlKTtcclxuICAgIFx0c3VwZXIuc3RhY2tUcmFjZSh0aGlzLCBtZXNzYWdlKTtcclxuICAgIH1cclxufVxuXG4vLyBIZWxwZXJzXHJcbi8vIENvbXBvbmVudHNcclxuLy8gRXhjZXB0aW9uc1xyXG4vKipcclxuICogVGhlIGRlZmF1bHQgc2V0dGluZ3Mgb2YgdGhlIGNhcnQuXHJcbiAqXHJcbiAqIEB2YXIgb2JqZWN0XHJcbiAqL1xyXG5sZXQgZGVmYXVsdFNldHRpbmdzJDEgPSB7XHJcblx0ZWxlbWVudDogJy5jYXJ0JyxcclxuXHRjb29raWVfbmFtZTogJ2NhcnQnLFxyXG5cdHByZXZpZXdfY2xhc3M6ICcnLFxyXG5cdGxvYWRlcjogJycsXHJcblx0Y2xhc3M6ICcnLFxyXG5cdHdpZHRoOiAnNjBweCcsXHJcblx0aGVpZ2h0OiAnNjBweCcsXHJcblx0cGxhY2VtZW50OiAncmlnaHQtdG9wJyxcclxuXHRmaXhlZDogdHJ1ZSxcclxuXHRob3Zlcl9jb2xvcjogJ29yYW5nZScsXHJcblx0bm9fY3NzOiBmYWxzZSxcclxufTtcclxuXHJcbi8qKlxyXG4gKiBTdG9yZXMgdGhlIGNvbnRhaW5lciBvYmplY3QuXHJcbiAqXHJcbiAqIEB2YXIgXFxDb3JlXFxDb250YWluZXJcclxuICovXHJcbmxldCBDb250YWluZXI7XHJcblxyXG4vKipcclxuICogU3RvcmVzIHRoZSBldmVudCBtYW5hZ2VyIG9iamVjdC5cclxuICpcclxuICogQHZhciBcXENvcmVcXEV2ZW50TWFuYWdlclxyXG4gKi9cclxubGV0IEV2ZW50TWFuYWdlciQyO1xyXG5cclxuLyoqXHJcbiAqIFN0b3JlcyB0aGUgcmVxdWVzdCBvYmplY3QuXHJcbiAqXHJcbiAqIEB2YXIgXFxIZWxwZXJzXFxSZXF1ZXN0XHJcbiAqL1xyXG5sZXQgSHR0cDtcclxuXHJcbi8qKlxyXG4gKiBTdG9yZXMgdGhlIGNhcnQgbG9hZGVyLlxyXG4gKlxyXG4gKiBAdmFyIEhUTUxEaXZFbGVtZW50XHJcbiAqL1xyXG5sZXQgbG9hZGluZ092ZXJsYXk7XHJcblxyXG4vKipcclxuICogU3RvcmVzIHRoZSBpdGVtcyB3cmFwcGVyLlxyXG4gKlxyXG4gKiBAdmFyIEhUTUxEaXZFbGVtZW50XHJcbiAqL1xyXG5sZXQgaXRlbXNEaXY7XHJcblxyXG4vKipcclxuICogQGNsYXNzIENhcnRcclxuICpcclxuICogSGFuZGxlcyBhZGRpbmcsIHJlbW92aW5nLCBjYWxjdWxhdGlvbnMgb2YgaXRlbXMuXHJcbiAqL1xyXG5cclxuY2xhc3MgQ2FydCBleHRlbmRzIEJhc2VDb21wb25lbnRcclxue1xyXG5cdC8qKlxyXG5cdCAqIC0gSW5pdGlhbGl6ZSB0aGUgSW9DIGNvbnRhaW5lclxyXG5cdCAqIC0gSW5pdGlhbGl6ZSB0aGUgUmVxdWVzdFxyXG5cdCAqIC0gSW5pdGlhbGl6ZSB0aGUgRXZlbnRNYW5hZ2VyXHJcblx0ICogLSBDcmVhdGVzIHRoZSBwcmV2aWV3IGFuZCB0aGUgaWNvbiBvZiB0aGUgY2FydC5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSBcXENvcmVcXENvbnRhaW5lciB8IGNvbnRhaW5lclxyXG5cdCAqIEBwYXJhbSBcXEhlbHBlcnNcXFJlcXVlc3QgfCBodHRwXHJcblx0ICogQHBhcmFtIFxcQ29yZVxcRXZlbnRNYW5hZ2VyIHwgZXZlbnRNYW5hZ2VyXHJcblx0ICogQHJldHVybiB2b2lkXHJcblx0ICovXHJcblx0Y29uc3RydWN0b3IoY29udGFpbmVyLCBodHRwLCBldmVudE1hbmFnZXIpIFxyXG5cdHtcclxuXHRcdHN1cGVyKCk7XHJcblxyXG5cdFx0Q29udGFpbmVyID0gY29udGFpbmVyO1xyXG5cdFx0SHR0cCA9IGh0dHA7XHJcblx0XHRFdmVudE1hbmFnZXIkMiA9IGV2ZW50TWFuYWdlcjtcclxuXHRcdFxyXG5cdFx0dGhpcy5wcmV2aWV3RWxlbWVudCA9IHRoaXMuY3JlYXRlUHJldmlld0VsZW1lbnQoKTtcclxuXHRcdHRoaXMuaWNvbiA9IGNyZWF0ZUljb24uY2FsbCh0aGlzKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFNldHMgdGhlIG9iamVjdCBieSB0aGUgdXNlcnMgc2V0dGluZy5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSBvYmplY3QgfCBzZXR0aW5nc1xyXG5cdCAqIEByZXR1cm4gdm9pZFxyXG5cdCAqL1xyXG5cdHNldHVwKHNldHRpbmdzKVxyXG5cdHtcclxuXHRcdGlmICh0eXBlb2Ygc2V0dGluZ3MgIT0gJ29iamVjdCcpIHtcclxuXHRcdFx0dGhyb3cgbmV3IEludmFsaWRBcmd1bWVudEV4Y2VwdGlvbiQxO1xyXG5cdFx0fVxyXG5cclxuXHRcdHRoaXMuc2V0dGluZ3MgPSBDb21tb24uZXh0ZW5kKGRlZmF1bHRTZXR0aW5ncyQxLCBzZXR0aW5ncyk7XHJcblxyXG5cdFx0dGhpcy5zZXRFbGVtZW50KHRoaXMuc2V0dGluZ3MuZWxlbWVudCk7XHJcblxyXG5cdFx0RE9NLmFkZENsYXNzKHRoaXMucHJldmlld0VsZW1lbnQsICdjbG9zZWQnKTtcclxuXHRcdERPTS5hZGRDbGFzcyh0aGlzLnByZXZpZXdFbGVtZW50LCB0aGlzLnNldHRpbmdzLnByZXZpZXdfY2xhc3MpO1xyXG5cdFx0XHJcblx0XHR0aGlzLmRyYXcoKTtcclxuXHRcdHRoaXMuYmluZEV2ZW50TGlzdGVuZXJzKCk7XHJcblx0XHRcclxuXHRcdGlmICh0aGlzLmlzRW1wdHkoQ29va2llLmdldCh0aGlzLnNldHRpbmdzLmNvb2tpZV9uYW1lKSkpIHtcclxuXHRcdFx0dGhpcy5zZXR1cENhcnQoKTtcclxuXHRcdFx0XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBDaGVja3MgaWYgdGhlIGNhcnQgaXMgZW1wdHlcclxuXHQgKlxyXG5cdCAqIEBwYXJhbSBvYmplY3QgfCBjYXJ0XHJcblx0ICogQHJldHVybiBib29sXHJcblx0ICovXHJcblx0aXNFbXB0eShjYXJ0KVxyXG5cdHtcclxuXHRcdHJldHVybiBDb21tb24uZW1wdHlPYmplY3QoY2FydCk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBJbml0aWFsaXplL1NldHMgdGhlIGNhcnQgYXMgYSBjb29raWUuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gb2JqZWN0IHwgY2FydFxyXG5cdCAqIEByZXR1cm4gdm9pZFxyXG5cdCAqL1xyXG5cdHNldHVwQ2FydCgpXHJcblx0e1xyXG5cdFx0dGhpcy5jYXJ0ID0ge307XHJcblx0XHR0aGlzLmNhcnQuaWQgPSBTdHIucmFuZG9tKDEwKTtcclxuXHRcdHRoaXMuY2FydC5pdGVtcyA9IFtdO1xyXG5cdFx0dGhpcy5jYXJ0LmZhdm9yaXRlcyA9IFtdO1xyXG5cdFx0Q29va2llLnNldCh0aGlzLnNldHRpbmdzLmNvb2tpZV9uYW1lLCB0aGlzLmNhcnQsIDIpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQWRkcyBhbiBpdGVtIHRvIHRoZSBjYXJ0LlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIG9iamVjdCB8IGl0ZW1cclxuXHQgKiBAcmV0dXJuIHZvaWRcclxuXHQgKi9cclxuXHRhZGRJdGVtKGl0ZW0pXHJcblx0e1xyXG5cdFx0aWYgKHR5cGVvZiBpdGVtICE9ICdvYmplY3QnKSB7XHJcblx0XHRcdHRocm93IG5ldyBJbnZhbGlkQXJndW1lbnRFeGNlcHRpb24kMSgnYWRkSXRlbSgpIGV4cGVjdCB0aGUgZmlyc3QgcGFyYW1ldGVyIHRvIGJlIGFuIG9iamVjdCwgYnV0ICcgKyB0eXBlb2YgaXRlbSArICcgd2FzIHBhc3NlZCBpbnN0ZWFkJyk7XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKCEgaXRlbS5oYXNPd25Qcm9wZXJ0eSgnaWQnKSkge1xyXG5cdFx0XHR0aHJvdyBuZXcgSW52YWxpZENhcnRJdGVtRXhjZXB0aW9uO1xyXG5cdFx0fVxyXG5cclxuXHRcdHRoaXMuY2FydCA9IENvb2tpZS5nZXQodGhpcy5zZXR0aW5ncy5jb29raWVfbmFtZSk7XHJcblxyXG5cdFx0aWYgKCFpdGVtLmhhc093blByb3BlcnR5KCdxdWFudGl0eScpKSB7XHJcblx0XHRcdGl0ZW0ucXVhbnRpdHkgPSAxO1xyXG5cdFx0fVxyXG5cclxuXHRcdGxldCBpO1xyXG5cdFx0bGV0IGluY3JlbWVudGVkID0gZmFsc2U7XHJcblxyXG5cdFx0Zm9yIChpID0gMDsgaSA8IHRoaXMuY2FydC5pdGVtcy5sZW5ndGg7IGkrKykge1xyXG5cdFx0XHRpZiAodGhpcy5jYXJ0Lml0ZW1zW2ldLmlkID09IGl0ZW0uaWQpIHtcclxuXHRcdFx0XHR0aGlzLmNhcnQuaXRlbXNbaV0ucXVhbnRpdHkrKztcclxuXHRcdFx0XHRpbmNyZW1lbnRlZCA9IHRydWU7XHJcblx0XHRcdFx0YnJlYWs7XHRcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdGlmICghIGluY3JlbWVudGVkKSB7XHJcblx0XHRcdHRoaXMuY2FydC5pdGVtcy5wdXNoKGl0ZW0pO1xyXG5cdFx0fVxyXG5cclxuXHRcdENvb2tpZS5zZXQodGhpcy5zZXR0aW5ncy5jb29raWVfbmFtZSwgdGhpcy5jYXJ0LCAyKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEFkZHMgYW4gaXRlbSB0byB0aGUgZmF2b3JpdGVzIGxpc3QuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gb2JqZWN0IHwgaXRlbVxyXG5cdCAqIEByZXR1cm4gdm9pZFxyXG5cdCAqL1xyXG5cdGZhdm9yaXRlSXRlbShpdGVtKVxyXG5cdHtcclxuXHRcdGlmICh0eXBlb2YgaXRlbSAhPSAnb2JqZWN0Jykge1xyXG5cdFx0XHR0aHJvdyBuZXcgSW52YWxpZEFyZ3VtZW50RXhjZXB0aW9uJDEoJ2Zhdm9yaXRlSXRlbSgpIGV4cGVjdCB0aGUgZmlyc3QgcGFyYW1ldGVyIHRvIGJlIGFuIG9iamVjdCwgYnV0ICcgKyB0eXBlb2YgaXRlbSArICcgd2FzIHBhc3NlZCBpbnN0ZWFkJyk7XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKCEgaXRlbS5oYXNPd25Qcm9wZXJ0eSgnaWQnKSkge1xyXG5cdFx0XHR0aHJvdyBuZXcgSW52YWxpZENhcnRJdGVtRXhjZXB0aW9uO1xyXG5cdFx0fVxyXG5cclxuXHRcdHRoaXMuY2FydCA9IENvb2tpZS5nZXQodGhpcy5zZXR0aW5ncy5jb29raWVfbmFtZSk7XHJcblxyXG5cdFx0bGV0IGk7XHJcblx0XHRsZXQgYWxyZWFkeUZhdm9yaXRlZCA9IGZhbHNlO1xyXG5cclxuXHRcdGZvciAoaSA9IDA7IGkgPCB0aGlzLmNhcnQuZmF2b3JpdGVzLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdGlmICh0aGlzLmNhcnQuZmF2b3JpdGVzW2ldLmlkID09IGl0ZW0uaWQpIHtcclxuXHRcdFx0XHRhbHJlYWR5RmF2b3JpdGVkID0gdHJ1ZTtcclxuXHRcdFx0XHRicmVhaztcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdGlmICghIGFscmVhZHlGYXZvcml0ZWQpIHtcclxuXHRcdFx0dGhpcy5jYXJ0LmZhdm9yaXRlcy5wdXNoKGl0ZW0pO1xyXG5cdFx0fVxyXG5cclxuXHRcdENvb2tpZS5zZXQodGhpcy5zZXR0aW5ncy5jb29raWVfbmFtZSwgdGhpcy5jYXJ0LCAyKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFJlbW92ZXMgYW4gaXRlbSBmcm9tIHRoZSBjYXJ0LlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIG9iamVjdCB8IGl0ZW1cclxuXHQgKiBAcmV0dXJuIHZvaWRcclxuXHQgKi9cclxuXHRyZW1vdmVJdGVtKGl0ZW0pXHJcblx0e1xyXG5cdFx0aWYgKHR5cGVvZiBpdGVtICE9ICdvYmplY3QnKSB7XHJcblx0XHRcdHRocm93IG5ldyBJbnZhbGlkQXJndW1lbnRFeGNlcHRpb24kMSgncmVtb3ZlSXRlbSgpIGV4cGVjdCB0aGUgZmlyc3QgcGFyYW1ldGVyIHRvIGJlIGFuIG9iamVjdCwgYnV0ICcgKyB0eXBlb2YgaXRlbSArICcgd2FzIHBhc3NlZCBpbnN0ZWFkJyk7XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKCEgaXRlbS5oYXNPd25Qcm9wZXJ0eSgnaWQnKSkge1xyXG5cdFx0XHR0aHJvdyBuZXcgSW52YWxpZENhcnRJdGVtRXhjZXB0aW9uO1xyXG5cdFx0fVxyXG5cclxuIFx0XHR0aGlzLmNhcnQgPSBDb29raWUuZ2V0KHRoaXMuc2V0dGluZ3MuY29va2llX25hbWUpO1xyXG5cclxuIFx0XHRsZXQgaTtcclxuXHJcbiBcdFx0Zm9yIChpID0gMDsgaSA8IHRoaXMuY2FydC5pdGVtcy5sZW5ndGg7IGkrKykge1xyXG4gXHRcdFx0aWYgKHRoaXMuY2FydC5pdGVtc1tpXS5pZCA9PSBpdGVtLmlkKSB7XHJcbiBcdFx0XHRcdHRoaXMuY2FydC5pdGVtcy5zcGxpY2UoaSwgMSk7XHJcbiBcdFx0XHRcdGJyZWFrO1xyXG4gXHRcdFx0fVxyXG4gXHRcdH1cclxuXHJcbiBcdFx0Q29va2llLnNldCh0aGlzLnNldHRpbmdzLmNvb2tpZV9uYW1lLCB0aGlzLmNhcnQsIDIpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQWRkcyB0aGUgaXRlbSB0byBwcmV2aWV3LlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIGFycmF5IHwgaXRlbXNcclxuXHQgKiBAcmV0dXJuIHZvaWRcclxuXHQgKi9cclxuXHRhZGRUb1ByZXZpZXcoaXRlbXMpXHJcblx0e1xyXG5cdFx0aXRlbXNEaXYuaW5uZXJIVE1MID0gJyc7XHJcblxyXG5cdFx0bGV0IHRhYmxlID0gRE9NLmNyZWF0ZUVsZW1lbnQoJ3RhYmxlJyk7XHJcblxyXG5cdFx0RE9NLmFkZENsYXNzKHRhYmxlLCAncHJldmlldy10YWJsZScpO1xyXG5cclxuXHRcdGZvciAobGV0IGkgPSAwOyBpIDwgaXRlbXMubGVuZ3RoOyBpKyspIHtcclxuXHJcblx0XHRcdGxldCBhdHRyaWJ1dGVzID0gaXRlbXNbaV07XHJcblxyXG5cdFx0XHRsZXQgdHIgPSBET00uY3JlYXRlRWxlbWVudCgndHInLCB7XHJcblx0XHRcdFx0Y2xhc3M6ICdpdGVtJ1xyXG5cdFx0XHR9KTtcclxuXHJcblx0XHRcdC8vIFF1YW50aXR5IGFsd2F5cyBhdCB0aGUgc3RhcnQgb2YgYW4gaXRlbS5cclxuXHRcdFx0bGV0IHRkID0gRE9NLmNyZWF0ZUVsZW1lbnQoJ3RkJyk7XHJcblxyXG5cdFx0XHR0ZC5pbm5lckhUTUwgPSBhdHRyaWJ1dGVzLnF1YW50aXR5ICsneCc7XHJcblx0XHRcdHRyLmFwcGVuZENoaWxkKHRkKTtcclxuXHRcdFx0XHJcblx0XHRcdGZvcihsZXQgYXR0cmlidXRlIGluIGF0dHJpYnV0ZXMpIHtcclxuXHRcdFx0XHRzd2l0Y2goYXR0cmlidXRlKVxyXG5cdFx0XHRcdHtcclxuXHRcdFx0XHRcdGNhc2UgJ2ltYWdlJzpcclxuXHRcdFx0XHRcdFx0dGQgPSBET00uY3JlYXRlRWxlbWVudCgndGQnKTtcclxuXHRcdFx0XHRcdFx0bGV0IGltYWdlID0gRE9NLmNyZWF0ZUVsZW1lbnQoJ2ltZycsIHtcclxuXHRcdFx0XHRcdFx0XHRzcmM6IGF0dHJpYnV0ZXNbYXR0cmlidXRlXSxcclxuXHRcdFx0XHRcdFx0XHR3aWR0aDogJzUwcHgnLFxyXG5cdFx0XHRcdFx0XHRcdGhlaWdodDogJzUwcHgnXHJcblx0XHRcdFx0XHRcdH0pO1xyXG5cclxuXHRcdFx0XHRcdFx0dGQuYXBwZW5kQ2hpbGQoaW1hZ2UpO1xyXG5cdFx0XHRcdFx0XHRicmVhaztcclxuXHRcdFx0XHRcdGNhc2UgJ3ByaWNlJzpcclxuXHRcdFx0XHRcdFx0dGQgPSBET00uY3JlYXRlRWxlbWVudCgndGQnKTtcclxuXHRcdFx0XHRcdFx0bGV0IHNwYW4gPSBET00uY3JlYXRlRWxlbWVudCgnc3BhbicsIHtcclxuXHRcdFx0XHRcdFx0XHRodG1sOiAnJm5ic3AnICsgYXR0cmlidXRlc1thdHRyaWJ1dGVdLmN1cnJlbmN5XHJcblx0XHRcdFx0XHRcdH0pO1xyXG5cdFx0XHRcdFx0XHR0ZC5pbm5lckhUTUwgPSBhdHRyaWJ1dGVzW2F0dHJpYnV0ZV0uYW1vdW50O1xyXG5cdFx0XHRcdFx0XHR0ZC5hcHBlbmRDaGlsZChzcGFuKTtcclxuXHRcdFx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdFx0XHRjYXNlICduYW1lJzpcclxuXHRcdFx0XHRcdFx0dGQgPSBET00uY3JlYXRlRWxlbWVudCgndGQnKTtcclxuXHRcdFx0XHRcdFx0dGQuaW5uZXJIVE1MID0gYXR0cmlidXRlc1thdHRyaWJ1dGVdO1xyXG5cdFx0XHRcdFx0XHRicmVhaztcclxuXHRcdFx0XHR9XHJcblx0XHRcdFxyXG5cdFx0XHRcdHRyLmFwcGVuZENoaWxkKHRkKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0dGFibGUuYXBwZW5kQ2hpbGQodHIpO1xyXG5cdFx0fVxyXG5cclxuXHRcdC8vIGNyZWF0ZSBjaGVja291dCBidXR0b24gYXQgdGhlIGJvdHRvbSBvZiB0aGUgcHJldmlld1xyXG5cdFx0bGV0IHRyID0gRE9NLmNyZWF0ZUVsZW1lbnQoJ3RyJyk7XHJcblx0XHRsZXQgdGQgPSBET00uY3JlYXRlRWxlbWVudCgndGQnLCB7XHJcblx0XHRcdGNvbHNwYW46ICczJyxcclxuXHRcdH0pO1xyXG5cclxuXHRcdGxldCBjaGVja291dCA9IERPTS5jcmVhdGVFbGVtZW50KCdhJywge1xyXG5cdFx0XHRjbGFzczogJ2J0biBidG4tcHJpbWFyeScsXHJcblx0XHRcdHRleHQ6ICdDaGVja291dCcsXHJcblx0XHRcdGhyZWY6ICcvY2hlY2tvdXQnXHJcblx0XHR9KTtcclxuXHJcblxyXG5cdFx0dGQuYXBwZW5kQ2hpbGQoY2hlY2tvdXQpO1xyXG5cdFx0dHIuYXBwZW5kQ2hpbGQodGQpO1xyXG5cclxuXHRcdC8vIGNyZWF0ZSB0b3RhbCBzdW0gYXQgdGhlIGJvdHRvbSBvZiB0aGUgcHJldmlld1xyXG5cdFx0dGQgPSBET00uY3JlYXRlRWxlbWVudCgndGQnLCB7XHJcblx0XHRcdGNvbHNwYW46ICcxJyxcclxuXHRcdH0pO1xyXG5cclxuXHRcdGxldCB0b3RhbCA9IERPTS5jcmVhdGVFbGVtZW50KCdkaXYnLCB7XHJcblx0XHRcdGNsYXNzOiAnY2FydC10b3RhbCcsXHJcblx0XHRcdHRleHQ6IHRoaXMudG90YWwoKVxyXG5cdFx0fSk7XHJcblxyXG5cdFx0dGQuYXBwZW5kQ2hpbGQodG90YWwpO1xyXG5cdFx0dHIuYXBwZW5kQ2hpbGQodGQpO1xyXG5cclxuXHRcdHRhYmxlLmFwcGVuZENoaWxkKHRyKTtcclxuXHJcblx0XHRpdGVtc0Rpdi5hcHBlbmRDaGlsZCh0YWJsZSk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBDYWxjdWxhdGVzIHRoZSB0b3RhbCBvZiB0aGUgY2FydFxyXG5cdCAqIGFuZCByZXRyaWV2ZSBpdC5cclxuXHQgKlxyXG5cdCAqIEByZXR1cm4gbnVtYmVyIFxyXG5cdCAqL1xyXG5cdHRvdGFsKClcclxuXHR7XHJcbiBcdFx0dGhpcy5jYXJ0ID0gQ29va2llLmdldCh0aGlzLnNldHRpbmdzLmNvb2tpZV9uYW1lKTtcclxuXHJcbiBcdFx0dmFyIHRvdGFsID0gMC4wMDtcclxuIFx0XHRsZXQgaTtcclxuXHJcbiBcdFx0Zm9yIChpID0gMDsgaSA8IHRoaXMuY2FydC5pdGVtcy5sZW5ndGg7IGkrKykge1xyXG4gXHRcdFx0dG90YWwgKz0gcGFyc2VGbG9hdCh0aGlzLmNhcnQuaXRlbXNbaV0ucHJpY2UuYW1vdW50KSAqIHRoaXMuY2FydC5pdGVtc1tpXS5xdWFudGl0eTtcclxuIFx0XHR9XHJcblxyXG4gXHRcdHJldHVybiB0b3RhbC50b0ZpeGVkKDIpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQmluZHMgZXZlcnRoaW5nIHRvIHRoZSBlbGVtZW50LlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIHN0cmluZyB8IHNlbGVjdG9yXHJcblx0ICogQHJldHVybiB2b2lkXHJcblx0ICovXHJcblx0c2V0RWxlbWVudChzZWxlY3RvcilcclxuXHR7XHJcblx0XHR0aGlzLmVsZW1lbnQgPSBET00uZmluZChzZWxlY3Rvcik7XHJcblxyXG5cdFx0aWYgKHRoaXMuZWxlbWVudCkge1xyXG5cdFx0XHRET00uYWRkQ2xhc3ModGhpcy5lbGVtZW50LCB0aGlzLnNldHRpbmdzLmNsYXNzKTtcclxuXHRcdFx0RE9NLmFkZENsYXNzKHRoaXMuZWxlbWVudCwgdGhpcy5zZXR0aW5ncy5wbGFjZW1lbnQpO1xyXG5cdFx0XHR0aGlzLmVsZW1lbnQuYXBwZW5kQ2hpbGQodGhpcy5pY29uKTtcclxuXHRcdFx0dGhpcy5lbGVtZW50LmFwcGVuZENoaWxkKHRoaXMucHJldmlld0VsZW1lbnQpO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQ3JlYXRlcyB0aGUgY2FydCBkZXRhaWxzIHByZXZpZXcgZWxlbWVudC5cclxuXHQgKlxyXG5cdCAqIEByZXR1cm4gSFRNTERpdkVsZW1lbnRcclxuXHQgKi9cclxuXHRjcmVhdGVQcmV2aWV3RWxlbWVudCgpXHJcblx0e1xyXG5cdFx0bGV0IHByZXZpZXdFbGVtZW50ID0gRE9NLmNyZWF0ZUVsZW1lbnQoJ2RpdicsIHtcclxuXHRcdFx0aWQ6ICdwcmV2aWV3J1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0aXRlbXNEaXYgPSBET00uY3JlYXRlRWxlbWVudCgndWwnLCB7XHJcblx0XHRcdFx0Y2xhc3M6ICdpdGVtcydcclxuXHRcdFx0fSk7XHJcblxyXG5cdFx0cHJldmlld0VsZW1lbnQuYXBwZW5kQ2hpbGQoaXRlbXNEaXYpO1xyXG5cclxuXHRcdHJldHVybiBwcmV2aWV3RWxlbWVudDtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEFkZCB0aGUgZUNvbW1lcmNlIHN0eWxlIHRhZ3MgdG8gdGhlIERPTS5cclxuXHQgKlxyXG5cdCAqIEByZXR1cm4gdm9pZFxyXG5cdCAqL1xyXG5cdGRyYXcoKSBcclxuXHR7XHJcblx0XHRpZiAoRE9NLmZpbmQoJyNUdXJiby1lQ29tbWVyY2UtQ2FydCcpKSB7XHJcblx0XHRcdHJldHVybjtcclxuXHRcdH1cclxuXHJcblx0XHRpZiAodGhpcy5zZXR0aW5ncy5ub19jc3MpIHtcclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0fVxyXG5cclxuXHRcdGxldCBwb3NpdGlvbiA9ICh0aGlzLnNldHRpbmdzLmZpeGVkKSA/ICdmaXhlZCcgOiAnYWJzb2x1dGUnO1xyXG5cclxuXHRcdGxldCBjc3MgPSBgXHJcblx0XHRcdCR7dGhpcy5zZXR0aW5ncy5lbGVtZW50fSB7XHJcblx0XHRcdFx0cG9zaXRpb246ICR7cG9zaXRpb259O1xyXG5cdFx0XHRcdGN1cnNvcjogcG9pbnRlcjtcclxuXHRcdFx0XHRjb2xvcjogI2ZmZmZmZjtcclxuXHRcdFx0XHR6LWluZGV4OiA5OTg7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdCR7dGhpcy5zZXR0aW5ncy5lbGVtZW50fSBzdmcge1xyXG5cdFx0XHRcdHdpZHRoOiAke3RoaXMuc2V0dGluZ3Mud2lkdGh9O1xyXG5cdFx0XHRcdGhlaWdodDogJHt0aGlzLnNldHRpbmdzLmhlaWdodH07XHJcblx0XHRcdFx0dHJhbnNpdGlvbjogZmlsbCAwLjNzO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHQke3RoaXMuc2V0dGluZ3MuZWxlbWVudH0gc3ZnOmhvdmVyIHtcclxuXHRcdFx0XHRmaWxsOiAke3RoaXMuc2V0dGluZ3MuaG92ZXJfY29sb3J9O1xyXG5cdFx0XHRcdHRyYW5zaXRpb246IGZpbGwgMC4zcztcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0JHt0aGlzLnNldHRpbmdzLmVsZW1lbnR9LnRvcC1yaWdodCxcclxuXHRcdFx0JHt0aGlzLnNldHRpbmdzLmVsZW1lbnR9LnJpZ2h0LXRvcCB7XHJcblx0XHRcdFx0cmlnaHQ6IDEwcHg7XHJcblx0XHRcdFx0dG9wOiAxMHB4O1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHQke3RoaXMuc2V0dGluZ3MuZWxlbWVudH0ubGVmdC10b3AsXHJcblx0XHRcdCR7dGhpcy5zZXR0aW5ncy5lbGVtZW50fS50b3AtbGVmdCB7XHJcblx0XHRcdFx0bGVmdDogMTBweDtcclxuXHRcdFx0XHR0b3A6IDEwcHg7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdCR7dGhpcy5zZXR0aW5ncy5lbGVtZW50fSA+ICNwcmV2aWV3IHtcclxuXHRcdFx0XHRwb3NpdGlvbjogJHtwb3NpdGlvbn07XHJcblx0XHRcdFx0ei1pbmRleDogOTk5OTtcclxuXHRcdFx0XHR0b3A6IGNhbGMoMTBweCArICR7dGhpcy5zZXR0aW5ncy5oZWlnaHR9KTtcclxuXHRcdFx0XHR0cmFuc2Zvcm06IHRyYW5zbGF0ZVgoNjBweCk7XHJcblx0XHRcdFx0aGVpZ2h0OiA0MDBweDtcclxuXHRcdFx0XHR3aWR0aDogMzAwcHg7XHJcblx0XHRcdFx0Ym9yZGVyOiAxcHggc29saWQgI2U0ZTRlNDtcclxuXHRcdFx0XHRiYWNrZ3JvdW5kOiAjZmZmZmZmO1xyXG5cdFx0XHRcdHRyYW5zaXRpb246IHRyYW5zZm9ybSAxcywgdmlzaWJpbGl0eSAxcztcclxuXHRcdFx0XHRjdXJzb3I6IGRlZmF1bHQ7XHJcblx0XHRcdFx0b3ZlcmZsb3ctWTogc2Nyb2xsO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHQke3RoaXMuc2V0dGluZ3MuZWxlbWVudH0gPiAjcHJldmlldy5vcGVuZWQge1xyXG5cdFx0XHRcdHZpc2liaWxpdHk6IHZpc2libGU7XHJcblx0XHRcdFx0dHJhbnNmb3JtOiB0cmFuc2xhdGVYKC0yNDBweCk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdCR7dGhpcy5zZXR0aW5ncy5lbGVtZW50fSA+ICNwcmV2aWV3LmNsb3NlZCB7XHJcblx0XHRcdFx0dmlzaWJpbGl0eTogaGlkZGVuO1xyXG5cdFx0XHRcdHRyYW5zZm9ybTogdHJhbnNsYXRlWCg2MHB4KTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0JHt0aGlzLnNldHRpbmdzLmVsZW1lbnR9ICNwcmV2aWV3ID4gdWwuaXRlbXMge1xyXG5cdFx0XHRcdHBhZGRpbmc6IDA7XHJcblx0XHRcdFx0Y29sb3I6ICMwMDAwMDA7XHJcblx0XHRcdFx0bGlzdC1zdHlsZS10eXBlOiBub25lO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHQke3RoaXMuc2V0dGluZ3MuZWxlbWVudH0gI3ByZXZpZXcgPiB1bC5pdGVtcyA+IC5wcmV2aWV3LXRhYmxlIHtcclxuXHRcdFx0XHR3aWR0aDogMTAwJTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0JHt0aGlzLnNldHRpbmdzLmVsZW1lbnR9ICNwcmV2aWV3ID4gdWwuaXRlbXMgPiAucHJldmlldy10YWJsZSB0ZCB7XHJcblx0XHRcdFx0cGFkZGluZzogNHB4O1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHQke3RoaXMuc2V0dGluZ3MuZWxlbWVudH0gLml0ZW1zLmxvYWRpbmcge1xyXG5cdFx0XHRcdGRpc3BsYXk6IG5vbmU7XHJcblx0XHRcdFx0b3ZlcmZsb3ctWTogbm9uZTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0JHt0aGlzLnNldHRpbmdzLmVsZW1lbnR9IC5jYXJ0LWxvYWRlci1vdmVybGF5IHtcclxuXHRcdFx0XHRwb3NpdGlvbjogZml4ZWQ7XHJcblx0XHRcdFx0dG9wOiAwOyBcclxuXHRcdFx0ICAgIGxlZnQ6IDA7XHJcblx0XHRcdCAgICByaWdodDogMDtcclxuXHRcdFx0ICAgIGJvdHRvbTogMDtcclxuXHRcdFx0XHRiYWNrZ3JvdW5kOiAjZmZmZmZmO1xyXG5cdFx0XHRcdHdpZHRoOiAxMDAlO1xyXG5cdFx0XHRcdGhlaWdodDogMTAwJTtcclxuXHRcdFx0XHRtaW4taGVpZ2h0OiAxMDAlO1xyXG5cdFx0XHRcdG92ZXJmbG93OiBhdXRvO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHQke3RoaXMuc2V0dGluZ3MuZWxlbWVudH0gLmNhcnQtbG9hZGVyLW92ZXJsYXkgLmNhcnQtbG9hZGVyIHtcclxuXHRcdFx0XHRwb3NpdGlvbjogYWJzb2x1dGU7XHJcblx0XHRcdFx0d2lkdGg6IDUwcHg7XHJcblx0XHRcdFx0aGVpZ2h0OiA1MHB4O1xyXG5cdFx0XHRcdG1hcmdpbi1sZWZ0OiAtMjVweDtcclxuXHRcdFx0XHRtYXJnaW4tdG9wOiAtMjVweDtcclxuXHRcdFx0XHRsZWZ0OiA1MCU7XHJcblx0XHRcdFx0cmlnaHQ6IDUwJTtcclxuXHRcdFx0XHR0b3A6IDUwJTtcclxuXHRcdFx0XHRib3R0b206IDUwJTtcclxuXHRcdFx0fVxyXG5cdFx0YDtcclxuXHQgICAgXHJcblx0ICAgIERPTS5hZGRTdHlsZSgnVHVyYm8tZUNvbW1lcmNlLUNhcnQnLCBjc3MpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQ3JlYXRlcyBhbiBsb2FkaW5nIG92ZXJsYXkuXHJcblx0ICpcclxuXHQgKiBAcmV0dXJuIEhUTUxEaXZFbGVtZW50XHJcblx0ICovXHJcblx0bG9hZGluZ092ZXJsYXkoKVxyXG5cdHtcclxuXHRcdGlmIChsb2FkaW5nT3ZlcmxheSkge1xyXG5cdFx0XHRyZXR1cm4gbG9hZGluZ092ZXJsYXk7XHJcblx0XHR9XHJcblxyXG5cdFx0bGV0IGxvYWRlcjtcclxuXHJcblx0XHRpZiAodGhpcy5zZXR0aW5ncy5sb2FkZXIpIHtcclxuXHRcdFx0bG9hZGVyID0gRE9NLmNyZWF0ZUVsZW1lbnQoJ2ltZycsIHtcclxuXHRcdFx0XHRzcmM6IHRoaXMuc2V0dGluZ3MubG9hZGVyLFxyXG5cdFx0XHRcdGNsYXNzOiAnY2FydC1sb2FkZXInXHJcblx0XHRcdH0pO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0bG9hZGVyID0gY3JlYXRlTG9hZGVyKCk7XHJcblx0XHR9XHJcblxyXG5cdFx0bG9hZGluZ092ZXJsYXkgPSBET00uY3JlYXRlRWxlbWVudCgnZGl2Jywge1xyXG5cdFx0XHRjbGFzczogJ2NhcnQtbG9hZGVyLW92ZXJsYXknXHJcblx0XHR9KTtcclxuXHJcblx0XHRsb2FkaW5nT3ZlcmxheS5hcHBlbmRDaGlsZChsb2FkZXIpO1xyXG5cclxuXHRcdHJldHVybiBsb2FkaW5nT3ZlcmxheTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIExvYWRpbmcgdGhlIGNhcnQgcHJldmlldy5cclxuXHQgKlxyXG5cdCAqIEByZXR1cm4gdm9pZFxyXG5cdCAqL1xyXG5cdHByZXZpZXdTdGFydExvYWRpbmcoKVxyXG5cdHtcclxuXHRcdERPTS5hZGRDbGFzcyhpdGVtc0RpdiwgJ2xvYWRpbmcnKTtcclxuXHRcdHRoaXMucHJldmlld0VsZW1lbnQuYXBwZW5kQ2hpbGQodGhpcy5sb2FkaW5nT3ZlcmxheSgpKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIExvYWRpbmcgdGhlIGNhcnQgcHJldmlldy5cclxuXHQgKlxyXG5cdCAqIEByZXR1cm4gdm9pZFxyXG5cdCAqL1xyXG5cdHByZXZpZXdTdG9wTG9hZGluZygpXHJcblx0e1xyXG5cdFx0aWYgKERPTS5maW5kKCcuY2FydC1sb2FkZXItb3ZlcmxheScsIHRoaXMucHJldmlld0VsZW1lbnQpKSB7XHJcblx0XHRcdHRoaXMucHJldmlld0VsZW1lbnQucmVtb3ZlQ2hpbGQodGhpcy5sb2FkaW5nT3ZlcmxheSgpKTtcclxuXHRcdFx0RE9NLnJlbW92ZUNsYXNzKGl0ZW1zRGl2LCAnbG9hZGluZycpO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogUmVsb2FkcyB0aGUgaXRlbXMgaW4gdGhlIGNhcnQgcHJldmlldy5cclxuXHQgKlxyXG5cdCAqIEByZXR1cm4gdm9pZFxyXG5cdCAqL1xyXG5cdHJlbG9hZENhcnRQcmV2aWV3KClcclxuXHR7XHJcblx0XHR0aGlzLnByZXZpZXdTdGFydExvYWRpbmcoKTtcclxuXHRcdGxldCBpdGVtcyA9IHRoaXMuZ2V0Q2FydEl0ZW1zKCk7XHJcblx0XHR0aGlzLmFkZFRvUHJldmlldyhpdGVtcyk7XHJcblx0XHRcclxuXHRcdGxldCBpbnN0YW5jZSA9IHRoaXM7XHJcblxyXG5cdFx0c2V0VGltZW91dChmdW5jdGlvbigpIHtcclxuXHRcdFx0aW5zdGFuY2UucHJldmlld1N0b3BMb2FkaW5nLmNhbGwoaW5zdGFuY2UpO1xyXG5cdFx0fSwgMTAwMCk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBCaW5kcyBldmVudCBsaXN0ZW5lcnMgdG8gdGhlIGNhcnQgaWNvbi5cclxuXHQgKlxyXG5cdCAqIEByZXR1cm4gdm9pZFxyXG5cdCAqL1xyXG5cdGJpbmRFdmVudExpc3RlbmVycygpXHJcblx0e1xyXG5cdFx0dGhpcy5pY29uLm9uY2xpY2sgPSBmdW5jdGlvbihlKSB7XHJcblx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcclxuXHRcdFx0dGhpcy50b2dnbGVDYXJ0UHJldmlldygpO1xyXG5cdFx0fS5iaW5kKHRoaXMpO1xyXG5cclxuXHRcdEV2ZW50TWFuYWdlciQyLnN1YnNjcmliZSgnY2FydC5wcm9kdWN0LmFkZGVkJywgZnVuY3Rpb24oYXR0cmlidXRlcykge1xyXG5cdFx0XHR0aGlzLm9wZW5DYXJ0UHJldmlldygpO1xyXG5cdFx0XHR0aGlzLmFkZEl0ZW0oYXR0cmlidXRlcyk7XHJcblx0XHRcdHRoaXMucmVsb2FkQ2FydFByZXZpZXcoKTtcclxuXHRcdH0uYmluZCh0aGlzKSk7XHJcblxyXG5cdFx0RXZlbnRNYW5hZ2VyJDIuc3Vic2NyaWJlKCdjYXJ0LnByb2R1Y3QuZmF2b3JpdGVkJywgZnVuY3Rpb24oYXR0cmlidXRlcykge1xyXG5cdFx0XHR0aGlzLmZhdm9yaXRlSXRlbShhdHRyaWJ1dGVzKTtcclxuXHRcdH0uYmluZCh0aGlzKSk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBPcGVucyB0aGUgY2FydCBwcmV2aWV3LlxyXG5cdCAqXHJcblx0ICogQHJldHVybiB2b2lkIFxyXG5cdCAqL1xyXG5cdG9wZW5DYXJ0UHJldmlldygpXHJcblx0e1xyXG5cdFx0aWYgKERPTS5oYXNDbGFzcyh0aGlzLnByZXZpZXdFbGVtZW50LCAnb3BlbmVkJykpIHtcclxuXHRcdFx0dGhpcy5yZWxvYWRDYXJ0UHJldmlldygpO1xyXG5cdFx0fVxyXG5cclxuXHRcdERPTS5zd2l0Y2hDbGFzc2VzKHRoaXMucHJldmlld0VsZW1lbnQsICdjbG9zZWQnLCAnb3BlbmVkJyk7XHJcblx0XHR0aGlzLnJlbG9hZENhcnRQcmV2aWV3KCk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBUb2dnbGVzIHRoZSBvcGVuaW5nIGNsb3Npbmcgb2YgdGhlIGNhcnQgcHJldmlldy5cclxuXHQgKlxyXG5cdCAqIEByZXR1cm4gdm9pZCBcclxuXHQgKi9cclxuXHR0b2dnbGVDYXJ0UHJldmlldygpXHJcblx0e1xyXG5cdFx0bGV0IG9wZW5pbmcgPSBET00udG9nZ2xlQ2xhc3ModGhpcy5wcmV2aWV3RWxlbWVudCwgJ29wZW5lZCcsICdjbG9zZWQnKTtcclxuXHRcdFx0XHJcblx0XHRpZiAob3BlbmluZykge1xyXG5cdFx0XHR0aGlzLnJlbG9hZENhcnRQcmV2aWV3KCk7XHRcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFJldHJpZXZlIHRoZSBjYXJ0cyBpdGVtcyBmcm9tIHRoZSBjb29raWUuXHJcblx0ICpcclxuXHQgKiBAcmV0dXJuIG9iamVjdFxyXG5cdCAqL1xyXG5cdGdldENhcnRJdGVtcygpXHJcblx0e1xyXG5cdFx0bGV0IGNhcnQgPSBDb29raWUuZ2V0KHRoaXMuc2V0dGluZ3MuY29va2llX25hbWUpO1xyXG5cclxuXHRcdHJldHVybiAoY2FydCkgPyBjYXJ0Lml0ZW1zIDogW107XHJcblx0fVxyXG59XHJcblxyXG4vKipcclxuICogQ2xvc2VzIHRoZSBjYXJ0IHByZXZpZXcgZWxlbWVudC5cclxuICpcclxuICogQHBhcmFtIGV2ZW50LmNsaWNrXHJcbiAqL1xyXG5mdW5jdGlvbiBjbG9zZShldmVudCkge1xyXG5cdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcblx0RE9NLnN3aXRjaENsYXNzZXModGhpcy5wcmV2aWV3RWxlbWVudCwgJ29wZW5lZCcsICdjbG9zZWQnKTtcclxufVxyXG5cclxuLyoqXHJcbiAqIENyZWF0ZXMgdGhlIGNhcnQgc3ZnIGljb24uXHJcbiAqXHJcbiAqIEByZXR1cm4gU1ZHU1ZHRWxlbWVudFxyXG4gKi9cclxuZnVuY3Rpb24gY3JlYXRlSWNvbigpIHtcclxuXHRsZXQgc3ZnID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKFwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiwgXCJzdmdcIik7XHJcblx0bGV0IGcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50TlMoXCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiLCBcImdcIik7XHJcblx0bGV0IHBhdGggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50TlMoXCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiLCBcInBhdGhcIik7XHJcblxyXG5cdHN2Zy5zZXRBdHRyaWJ1dGUoJ3ZlcnNpb24nLCAnMS4xJyk7XHJcblx0c3ZnLnNldEF0dHJpYnV0ZSgneG1sbnMnLCAnaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnKTtcclxuXHRzdmcuc2V0QXR0cmlidXRlKCd4bWxuczp4bGluaycsICdodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rJyk7XHJcblx0c3ZnLnNldEF0dHJpYnV0ZSgneCcsICcwcHgnKTtcclxuXHRzdmcuc2V0QXR0cmlidXRlKCd5JywgJzBweCcpO1xyXG5cdHN2Zy5zZXRBdHRyaWJ1dGUoJ3dpZHRoJywgJzQwcHgnKTtcclxuXHRzdmcuc2V0QXR0cmlidXRlKCdoZWlnaHQnLCAnNDBweCcpO1xyXG5cdHN2Zy5zZXRBdHRyaWJ1dGUoJ3ZpZXdCb3gnLCAnMCAwIDQ0Ni44NDMgNDQ2Ljg0MycpO1xyXG5cdHN2Zy5zZXRBdHRyaWJ1dGUoJ3N0eWxlJywgJ2VuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgNDQ2Ljg0MyA0NDYuODQzOycpO1xyXG5cdHN2Zy5zZXRBdHRyaWJ1dGUoJ3htbDpzcGFjZScsICdwcmVzZXJ2ZScpO1xyXG5cclxuXHRwYXRoLnNldEF0dHJpYnV0ZSgnZCcsICdNNDQ0LjA5LDkzLjEwM2MtMi42OTgtMy42OTktNy4wMDYtNS44ODgtMTEuNTg0LTUuODg4SDEwOS45MmMtMC42MjUsMC0xLjI0OSwwLjAzOC0xLjg1LDAuMTE5bC0xMy4yNzYtMzguMjdjLTEuMzc2LTMuOTU4LTQuNDA2LTcuMTEzLTguMy04LjY0NkwxOS41ODYsMTQuMTM0Yy03LjM3NC0yLjg4Ny0xNS42OTUsMC43MzUtMTguNTkxLDguMWMtMi44OTEsNy4zNjksMC43MywxNS42OTUsOC4xLDE4LjU5MWw2MC43NjgsMjMuODcybDc0LjM4MSwyMTQuMzk5Yy0zLjI4MywxLjE0NC02LjA2NSwzLjY2My03LjMzMiw3LjE4N2wtMjEuNTA2LDU5LjczOWMtMS4zMTgsMy42NjMtMC43NzUsNy43MzMsMS40NjgsMTAuOTE2YzIuMjQsMy4xODMsNS44ODMsNS4wNzgsOS43NzMsNS4wNzhoMTEuMDQ0Yy02Ljg0NCw3LjYxNi0xMS4wNDQsMTcuNjQ2LTExLjA0NCwyOC42NzVjMCwyMy43MTgsMTkuMjk4LDQzLjAxMiw0My4wMTIsNDMuMDEyczQzLjAxMi0xOS4yOTQsNDMuMDEyLTQzLjAxMmMwLTExLjAyOS00LjItMjEuMDU5LTExLjA0NC0yOC42NzVoOTMuNzc2Yy02Ljg0Nyw3LjYxNi0xMS4wNDgsMTcuNjQ2LTExLjA0OCwyOC42NzVjMCwyMy43MTgsMTkuMjk0LDQzLjAxMiw0My4wMTMsNDMuMDEyYzIzLjcxOCwwLDQzLjAxMi0xOS4yOTQsNDMuMDEyLTQzLjAxMmMwLTExLjAyOS00LjItMjEuMDU5LTExLjA0My0yOC42NzVoMTMuNDMzYzYuNTk5LDAsMTEuOTQ3LTUuMzQ5LDExLjk0Ny0xMS45NDhjMC02LjU5OS01LjM0OS0xMS45NDctMTEuOTQ3LTExLjk0N0gxNDMuNjQ3bDEzLjMxOS0zNi45OTZjMS43MiwwLjcyNCwzLjU3OCwxLjE1Miw1LjUyMywxLjE1MmgyMTAuMjc4YzYuMjM0LDAsMTEuNzUxLTQuMDI3LDEzLjY1LTkuOTU5bDU5LjczOS0xODYuMzg3QzQ0Ny41NTcsMTAxLjU2Nyw0NDYuNzg4LDk2LjgwMiw0NDQuMDksOTMuMTAzeiBNMTY5LjY1OSw0MDkuODA3Yy0xMC41NDMsMC0xOS4xMTYtOC41NzMtMTkuMTE2LTE5LjExNnM4LjU3My0xOS4xMTcsMTkuMTE2LTE5LjExN3MxOS4xMTYsOC41NzQsMTkuMTE2LDE5LjExN1MxODAuMjAyLDQwOS44MDcsMTY5LjY1OSw0MDkuODA3eiBNMzI3LjM2Nyw0MDkuODA3Yy0xMC41NDMsMC0xOS4xMTctOC41NzMtMTkuMTE3LTE5LjExNnM4LjU3NC0xOS4xMTcsMTkuMTE3LTE5LjExN2MxMC41NDIsMCwxOS4xMTYsOC41NzQsMTkuMTE2LDE5LjExN1MzMzcuOTA5LDQwOS44MDcsMzI3LjM2Nyw0MDkuODA3eiBNNDAyLjUyLDE0OC4xNDloLTczLjE2MVYxMTUuODloODMuNDk5TDQwMi41MiwxNDguMTQ5eiBNMzgxLjQ1MywyMTMuODYxaC01Mi4wOTR2LTM3LjAzOGg2My45NjdMMzgxLjQ1MywyMTMuODYxeiBNMjM0LjU3MSwyMTMuODYxdi0zNy4wMzhoNjYuMTEzdjM3LjAzOEgyMzQuNTcxeiBNMzAwLjY4NCwyNDIuNTM4djMxLjA2NGgtNjYuMTEzdi0zMS4wNjRIMzAwLjY4NHogTTEzOS4xMTUsMTc2LjgyM2g2Ni43ODR2MzcuMDM4aC01My45MzNMMTM5LjExNSwxNzYuODIzeiBNMjM0LjU3MSwxNDguMTQ5VjExNS44OWg2Ni4xMTN2MzIuMjU5SDIzNC41NzF6IE0yMDUuODk4LDExNS44OXYzMi4yNTloLTc2LjczNGwtMTEuMTkxLTMyLjI1OUgyMDUuODk4eiBNMTYxLjkxNiwyNDIuNTM4aDQzLjk4MnYzMS4wNjRoLTMzLjIwNkwxNjEuOTE2LDI0Mi41Mzh6IE0zMjkuMzU5LDI3My42MDN2LTMxLjA2NGg0Mi45MDlsLTkuOTU1LDMxLjA2NEgzMjkuMzU5eicpO1xyXG5cclxuXHRnLmFwcGVuZENoaWxkKHBhdGgpO1xyXG5cdHN2Zy5hcHBlbmRDaGlsZChnKTtcclxuXHJcblx0bGV0ICBkaXYgPSBET00uY3JlYXRlRWxlbWVudCgnZGl2Jywge1xyXG5cdFx0aWQ6ICdjYXJ0SWNvbicsXHJcblx0fSk7XHJcblxyXG5cdGRpdi5hcHBlbmRDaGlsZChzdmcpO1xyXG5cclxuXHRyZXR1cm4gZGl2O1xyXG59XHJcblxyXG4vKipcclxuICogQ3JlYXRlcyB0aGUgY2FydCBsb2FkZXIgaWNvbi5cclxuICpcclxuICogQHJldHVybiBTVkdTVkdFbGVtZW50XHJcbiAqL1xyXG5mdW5jdGlvbiBjcmVhdGVMb2FkZXIoKSB7XHJcblx0bGV0IHN2ZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnROUyhcImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIsIFwic3ZnXCIpO1xyXG5cdGxldCBjb3VudCA9IDEyO1xyXG5cdGxldCBncm91cHMgPSBbXTtcclxuXHRsZXQgcmVjdGFuZ2VscyA9IFtdO1xyXG5cdGxldCBhbmltYXRpb25zID0gW107XHJcblxyXG5cdHN2Zy5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgJ2xkcy1zcGlubmVyJyk7XHJcblx0c3ZnLnNldEF0dHJpYnV0ZSgnd2lkdGgnLCAnMjAwcHgnKTtcclxuXHRzdmcuc2V0QXR0cmlidXRlKCdoZWlnaHQnLCAnMjAwcHgnKTtcclxuXHRzdmcuc2V0QXR0cmlidXRlKCd4bWxucycsICdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZycpO1xyXG5cdHN2Zy5zZXRBdHRyaWJ1dGUoJ3htbG5zOnhsaW5rJywgJ2h0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsnKTtcclxuXHRzdmcuc2V0QXR0cmlidXRlKCd2aWV3Qm94JywgJzAgMCAxMDAgMTAwJyk7XHJcblx0c3ZnLnNldEF0dHJpYnV0ZSgncHJlc2VydmVBc3BlY3RSYXRpbycsICd4TWlkWU1pZCcpO1xyXG5cdHN2Zy5zZXRBdHRyaWJ1dGUoJ3N0eWxlJywgJ2JhY2tncm91bmQ6IG5vbmU7Jyk7XHJcblx0XHJcblx0dmFyIHJvdGF0aW9uID0gMDtcclxuXHJcblx0Zm9yICh2YXIgaSA9IDA7IGkgPCBjb3VudDsgaSsrKSB7XHJcblx0XHRsZXQgZ3JvdXAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50TlMoXCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiLCBcImdcIik7XHJcblx0XHRncm91cC5zZXRBdHRyaWJ1dGUoJ3RyYW5zZm9ybScsICdyb3RhdGUoJyArIHJvdGF0aW9uICsgJyA1MCA1MCknKTtcclxuXHRcdHJvdGF0aW9uICs9IDMwO1xyXG5cdFx0Z3JvdXBzLnB1c2goZ3JvdXApO1xyXG5cdH1cclxuXHJcblx0Zm9yICh2YXIgaSA9IDA7IGkgPCBjb3VudDsgaSsrKSB7XHJcblx0XHRsZXQgcmVjdGFuZ2VsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKFwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiwgXCJyZWN0XCIpO1xyXG5cdFx0cmVjdGFuZ2VsLnNldEF0dHJpYnV0ZSgneCcsICc0NycpO1xyXG5cdFx0cmVjdGFuZ2VsLnNldEF0dHJpYnV0ZSgneScsICcyNCcpO1xyXG5cdFx0cmVjdGFuZ2VsLnNldEF0dHJpYnV0ZSgncngnLCAnOS40Jyk7XHJcblx0XHRyZWN0YW5nZWwuc2V0QXR0cmlidXRlKCdyeScsICc0LjgnKTtcclxuXHRcdHJlY3RhbmdlbC5zZXRBdHRyaWJ1dGUoJ3dpZHRoJywgJzYnKTtcclxuXHRcdHJlY3RhbmdlbC5zZXRBdHRyaWJ1dGUoJ2hlaWdodCcsICcxMicpO1xyXG5cdFx0cmVjdGFuZ2VsLnNldEF0dHJpYnV0ZSgnZmlsbCcsICcjNDY1OGFjJyk7XHJcblx0XHRyZWN0YW5nZWxzLnB1c2gocmVjdGFuZ2VsKTtcclxuXHR9XHJcblxyXG5cdHZhciBiZWdpbiA9IDAuMDkgKiAxMTtcclxuXHJcblx0Zm9yICh2YXIgaSA9IDA7IGkgPCBjb3VudDsgaSsrKSB7XHJcblx0XHRsZXQgYW5pbWF0ZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnROUyhcImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIsIFwiYW5pbWF0ZVwiKTtcclxuXHRcdGFuaW1hdGUuc2V0QXR0cmlidXRlKCdhdHRyaWJ1dGVOYW1lJywgJ29wYWNpdHknKTtcclxuXHRcdGFuaW1hdGUuc2V0QXR0cmlidXRlKCd2YWx1ZXMnLCAnMTswJyk7XHJcblx0XHRhbmltYXRlLnNldEF0dHJpYnV0ZSgndGltZXMnLCAnMDsxJyk7XHJcblx0XHRhbmltYXRlLnNldEF0dHJpYnV0ZSgnZHVyJywgJzFzJyk7XHJcblx0XHRhbmltYXRlLnNldEF0dHJpYnV0ZSgnYmVnaW4nLCBiZWdpbi50b0ZpeGVkKDgpICsgJ3MnKTtcclxuXHRcdGFuaW1hdGUuc2V0QXR0cmlidXRlKCdyZXBlYXRDb3VudCcsICdpbmRlZmluaXRlJyk7XHJcblx0XHRhbmltYXRpb25zLnB1c2goYW5pbWF0ZSk7XHJcblx0XHRiZWdpbiAtPSAwLjA5O1xyXG5cdH1cclxuXHJcblx0Zm9yICh2YXIgaSA9IDA7IGkgPCBncm91cHMubGVuZ3RoOyBpKyspIHtcclxuXHRcdGxldCBncm91cCA9IGdyb3Vwc1tpXTtcdFx0XHJcblx0XHRsZXQgcmVjdGFuZ2VsID0gcmVjdGFuZ2Vsc1tpXTtcclxuXHRcdGxldCBhbmltYXRlID0gYW5pbWF0aW9uc1tpXTtcclxuXHRcdHJlY3RhbmdlbC5hcHBlbmRDaGlsZChhbmltYXRlKTtcclxuXHRcdGdyb3VwLmFwcGVuZENoaWxkKHJlY3RhbmdlbCk7XHJcblx0XHRzdmcuYXBwZW5kQ2hpbGQoZ3JvdXApO1xyXG5cdH1cclxuXHJcblx0RE9NLmFkZENsYXNzKHN2ZywgJ2NhcnQtbG9hZGVyJyk7XHJcblxyXG5cdHJldHVybiBzdmc7XHRcclxufVxuXG4vLyBIZWxwZXJzXHJcbi8vIENvbXBvbmVudHNcclxuLy8gRXhjZXB0aW9uc1xyXG4vKipcclxuICogVGhlIGRlZmF1bHQgc2V0dGluZ3Mgb2YgdGhlIGZpbHRlci5cclxuICovXHJcbmxldCBkZWZhdWx0U2V0dGluZ3MkMiA9IHtcclxuXHRlbGVtZW50OiAnLmZpbHRlcicsXHJcblx0Y2xhc3M6ICcnLFxyXG5cdHdpZHRoOiAnJyxcclxuXHRoZWlnaHQ6ICcnLFxyXG5cdG5vX2NzczogZmFsc2UsXHJcbn07XHJcblxyXG4vKipcclxuICogU3RvcmVzIHRoZSBjb250YWluZXIgb2JqZWN0LlxyXG4gKlxyXG4gKiBAdmFyIFxcQ29yZVxcQ29udGFpbmVyXHJcbiAqL1xyXG5sZXQgQ29udGFpbmVyJDE7XHJcblxyXG4vKipcclxuICogQGNsYXNzIEZpbHRlclxyXG4gKlxyXG4gKiBUaGUgRmlsdGVyIE9iamVjdCwgaGFuZGxlcyB0aGUgZmlsdGVyIG9mIHRoZSBwcm9kdWN0cy9zZXJ2aWNlcy5cclxuICovXHJcblxyXG5jbGFzcyBGaWx0ZXIgZXh0ZW5kcyBCYXNlQ29tcG9uZW50XHJcbntcclxuXHQvKipcclxuXHQgKiAtIEluaXRpYWxpemUgdGhlIElvQyBjb250YWluZXIuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gXFxDb3JlXFxDb250YWluZXIgfCBjb250YWluZXJcclxuXHQgKiBAcmV0dXJuIHZvaWRcclxuXHQgKi9cclxuXHRjb25zdHJ1Y3Rvcihjb250YWluZXIpIFxyXG5cdHtcclxuXHRcdHN1cGVyKCk7XHJcblxyXG5cdFx0Q29udGFpbmVyJDEgPSBjb250YWluZXI7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBTZXR1cCB0aGUgZmlsdGVyIGNsYXNzLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIG9iamVjdCB8IHNldHRpbmdzXHJcblx0ICogQHJldHVybiB2b2lkXHJcblx0ICovXHJcblx0c2V0dXAoc2V0dGluZ3MpXHJcblx0e1xyXG5cdFx0aWYodHlwZW9mIHNldHRpbmdzICE9ICdvYmplY3QnKSB7XHJcblx0XHRcdHRocm93IG5ldyBJbnZhbGlkQXJndW1lbnRFeGNlcHRpb24kMTtcclxuXHRcdH1cclxuXHJcblx0XHR0aGlzLnNldHRpbmdzID0gQ29tbW9uLmV4dGVuZChkZWZhdWx0U2V0dGluZ3MkMiwgc2V0dGluZ3MpO1xyXG5cclxuXHRcdGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCBmdW5jdGlvbigpIHtcclxuXHJcblx0XHRcdHRoaXMuc2V0RWxlbWVudCh0aGlzLnNldHRpbmdzLmVsZW1lbnQpO1xyXG5cclxuXHRcdFx0dGhpcy5kcmF3KCk7XHRcclxuXHRcdH0uYmluZCh0aGlzKSk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBTZXRzIHRoZSBlbGVtZW50IHRvIGJlIGJvdW5kIHRvLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIHN0cmluZyB8IHNlbGVjdG9yXHJcblx0ICogQHJldHVybiB2b2lkXHJcblx0ICovXHJcblx0c2V0RWxlbWVudChzZWxlY3RvcilcclxuXHR7XHJcblx0XHR0aGlzLmVsZW1lbnQgPSBET00uZmluZChzZWxlY3Rvcik7XHJcblx0XHRcclxuXHRcdERPTS5hZGRDbGFzcyh0aGlzLmVsZW1lbnQsIHRoaXMuc2V0dGluZ3MuY2xhc3MpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQWRkIHRoZSBlQ29tbWVyY2Ugc3R5bGUgdGFncyB0byB0aGUgRE9NLlxyXG5cdCAqL1xyXG5cdGRyYXcoKSBcclxuXHR7XHJcblx0XHRpZiAoRE9NLmZpbmQoJyNUdXJiby1lQ29tbWVyY2UtRmlsdGVyJykpIHtcclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0fVxyXG5cclxuXHRcdGlmICh0aGlzLnNldHRpbmdzLm5vX2Nzcykge1xyXG5cdFx0XHRyZXR1cm47XHJcblx0XHR9XHJcblxyXG5cdFx0bGV0IHdpZHRoID0gKHRoaXMuc2V0dGluZ3Mud2lkdGgpID8gJ3dpZHRoOicgKyB0aGlzLnNldHRpbmdzLndpZHRoICsgJzsnIDogJyc7XHJcblx0XHRsZXQgbWluV2lkdGggPSB0aGlzLnNldHRpbmdzLm1pbl93aWR0aCB8fCAnMjAwcHgnO1xyXG5cdFx0bGV0IGhlaWdodCA9IHRoaXMuc2V0dGluZ3MuaGVpZ2h0IHx8ICdhdXRvJztcclxuXHJcblx0XHRsZXQgY3NzID0gYFxyXG5cdFx0XHQke3RoaXMuc2V0dGluZ3MuZWxlbWVudH0ge1xyXG5cdFx0XHRcdHBvc2l0aW9uOiByZWxhdGl2ZTtcclxuXHRcdFx0XHRtYXJnaW46IDVweCA1cHg7XHJcblx0XHRcdFx0Ym9yZGVyOiAxcHggc29saWQgI2U0ZTRlNDtcclxuXHRcdFx0XHQke3dpZHRofVxyXG5cdFx0XHRcdG1pbi13aWR0aDogJHttaW5XaWR0aH07XHJcblx0XHRcdFx0aGVpZ2h0OiAke2hlaWdodH07XHJcblx0XHRcdFx0bWluLWhlaWdodDogMjAwcHg7XHJcblx0XHRcdFx0Y29sb3I6ICNmZmZmZmY7XHJcblx0XHRcdFx0b3ZlcmZsb3c6IGhpZGRlbjtcclxuXHRcdFx0fVxyXG5cclxuXHRcdGA7XHJcblx0ICAgIFxyXG5cdCAgICBET00uYWRkU3R5bGUoJ1R1cmJvLWVDb21tZXJjZS1GaWx0ZXInLCBjc3MpO1xyXG5cdH1cclxufVxuXG4vLyBIZWxwZXJzXHJcbi8vIENvbXBvbmVudHNcclxuLy8gRXhjZXB0aW9uc1xyXG4vKipcclxuICogVGhlIGRlZmF1bHQgc2V0dGluZ3Mgb2YgdGhlIGNhcnQuXHJcbiAqXHJcbiAqIEB2YXIgb2JqZWN0XHJcbiAqL1xyXG5sZXQgZGVmYXVsdFNldHRpbmdzJDMgPSB7XHJcblx0ZWxlbWVudDogJy5jaGVja291dCcsXHJcblx0bm9fY3NzOiBmYWxzZSxcclxufTtcclxuXHJcbi8qKlxyXG4gKiBTdG9yZXMgdGhlIGNvbnRhaW5lciBvYmplY3QuXHJcbiAqXHJcbiAqIEB2YXIgXFxDb3JlXFxDb250YWluZXJcclxuICovXHJcbmxldCBDb250YWluZXIkMjtcclxuXHJcbi8qKlxyXG4gKiBTdG9yZXMgdGhlIGV2ZW50IG1hbmFnZXIgb2JqZWN0LlxyXG4gKlxyXG4gKiBAdmFyIFxcQ29yZVxcRXZlbnRNYW5hZ2VyXHJcbiAqL1xyXG5sZXQgRXZlbnRNYW5hZ2VyJDM7XHJcblxyXG4vKipcclxuICogU3RvcmVzIHRoZSByZXF1ZXN0IG9iamVjdC5cclxuICpcclxuICogQHZhciBcXEhlbHBlcnNcXFJlcXVlc3RcclxuICovXHJcbmxldCBIdHRwJDE7XHJcblxyXG4vKipcclxuICogQGNsYXNzIENoZWNrb3V0XHJcbiAqXHJcbiAqIEhhbmRsZXMgdGhlIGNoZWNrb3V0IHByb2Nlc3MuXHJcbiAqIHBheW1lbnRzIHZhbGlkYXRpb24sIGNhcnQgdmFsaWRhdGlvbiBldGMuLlxyXG4gKi9cclxuXHJcbmNsYXNzIENoZWNrb3V0IGV4dGVuZHMgQmFzZUNvbXBvbmVudFxyXG57XHJcblx0LyoqXHJcblx0ICogLSBJbml0aWFsaXplIHRoZSBJb0MgY29udGFpbmVyXHJcblx0ICogLSBJbml0aWFsaXplIHRoZSBSZXF1ZXN0XHJcblx0ICogLSBJbml0aWFsaXplIHRoZSBFdmVudE1hbmFnZXJcclxuXHQgKiAtIExpc3RlbiB0byBjaGVja291dCBldmVudC5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSBcXENvcmVcXENvbnRhaW5lciB8IGNvbnRhaW5lclxyXG5cdCAqIEBwYXJhbSBcXEhlbHBlcnNcXFJlcXVlc3QgfCBodHRwXHJcblx0ICogQHBhcmFtIFxcQ29yZVxcRXZlbnRNYW5hZ2VyIHwgZXZlbnRNYW5hZ2VyXHJcblx0ICogQHJldHVybiB2b2lkXHJcblx0ICovXHJcblx0Y29uc3RydWN0b3IoY29udGFpbmVyLCBodHRwLCBldmVudE1hbmFnZXIpIFxyXG5cdHtcclxuXHRcdHN1cGVyKCk7XHJcblxyXG5cdFx0Q29udGFpbmVyJDIgPSBjb250YWluZXI7XHJcblx0XHRIdHRwJDEgPSBodHRwO1xyXG5cdFx0RXZlbnRNYW5hZ2VyJDMgPSBldmVudE1hbmFnZXI7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBTZXRzIHRoZSBvYmplY3QgYnkgdGhlIHVzZXJzIHNldHRpbmcuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gb2JqZWN0IHwgc2V0dGluZ3NcclxuXHQgKiBAcmV0dXJuIHZvaWRcclxuXHQgKi9cclxuXHRzZXR1cChzZXR0aW5ncylcclxuXHR7XHJcblx0XHRpZiAodHlwZW9mIHNldHRpbmdzICE9ICdvYmplY3QnKSB7XHJcblx0XHRcdHRocm93IG5ldyBJbnZhbGlkQXJndW1lbnRFeGNlcHRpb24kMTtcclxuXHRcdH1cclxuXHJcblx0XHR0aGlzLnNldHRpbmdzID0gQ29tbW9uLmV4dGVuZChkZWZhdWx0U2V0dGluZ3MkMywgc2V0dGluZ3MpO1xyXG5cclxuXHRcdGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCBmdW5jdGlvbigpIHtcclxuXHJcblx0XHRcdHRoaXMuc2V0RWxlbWVudCh0aGlzLnNldHRpbmdzLmVsZW1lbnQpO1xyXG5cdFx0XHR0aGlzLmhpZGUoKTtcclxuXHRcdFx0dGhpcy5kcmF3KCk7XHJcblx0XHR9LmJpbmQodGhpcykpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQmluZHMgZXZlcnRoaW5nIHRvIHRoZSBlbGVtZW50LlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIHN0cmluZyB8IHNlbGVjdG9yXHJcblx0ICogQHJldHVybiB2b2lkXHJcblx0ICovXHJcblx0c2V0RWxlbWVudChzZWxlY3RvcilcclxuXHR7XHJcblx0XHR0aGlzLmVsZW1lbnQgPSBET00uZmluZChzZWxlY3Rvcik7XHJcblxyXG5cdFx0aWYgKHRoaXMuZWxlbWVudCkge1xyXG5cdFx0XHRET00uYWRkQ2xhc3ModGhpcy5lbGVtZW50LCB0aGlzLnNldHRpbmdzLmNsYXNzKTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIENoYW5nZXMgdGhlIHVybCB0byBiZSBjaGVja291dFxyXG5cdCAqXHJcblx0ICogQHJldHVybiB2b2lkIFxyXG5cdCAqL1xyXG5cdGNoYW5nZVVybCgpXHJcblx0e1xyXG5cdFx0VXJsLmNoYW5nZSgnY2hlY2tvdXQnKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEFkZCB0aGUgZUNvbW1lcmNlIHN0eWxlIHRhZ3MgdG8gdGhlIERPTS5cclxuXHQgKlxyXG5cdCAqIEByZXR1cm4gdm9pZFxyXG5cdCAqL1xyXG5cdGRyYXcoKSBcclxuXHR7XHJcblx0XHRpZiAoRE9NLmZpbmQoJyNUdXJiby1lQ29tbWVyY2UtQ2hlY2tvdXQnKSkge1xyXG5cdFx0XHRyZXR1cm47XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKHRoaXMuc2V0dGluZ3Mubm9fY3NzKSB7XHJcblx0XHRcdHJldHVybjtcclxuXHRcdH1cclxuXHJcblx0XHRsZXQgcG9zaXRpb24gPSAodGhpcy5zZXR0aW5ncy5maXhlZCkgPyAnZml4ZWQnIDogJ2Fic29sdXRlJztcclxuXHJcblx0XHRsZXQgY3NzID0gYFxyXG5cdFx0XHQke3RoaXMuc2V0dGluZ3MuZWxlbWVudH0ge1xyXG5cdFx0XHRcdHdpZHRoOiAxMDAlO1xyXG5cdFx0XHRcdG1pbi1oZWlnaHQ6IDQwMHB4O1xyXG5cdFx0XHRcdGJvcmRlcjogMXB4IHNvbGlkICNlNGU0ZTQ7XHJcblx0XHRcdH1cclxuXHRcdGA7XHJcblx0ICAgIFxyXG5cdCAgICBET00uYWRkU3R5bGUoJ1R1cmJvLWVDb21tZXJjZS1DaGVja291dCcsIGNzcyk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBIaWRlcyBhbGwgaXJyZWxldmFudCBlbGVtZW50cyBmcm9tIHRoZSBET00uXHJcblx0ICpcclxuXHQgKiBAcmV0dXJuIHZvaWQgXHJcblx0ICovXHJcblx0aGlkZUFsbCgpXHJcblx0e1x0XHJcblx0XHRDb250YWluZXIkMi5Db21wb25lbnRzLmJvb3RlZC5mb3JFYWNoKGZ1bmN0aW9uKGNvbXBvbmVudCkge1xyXG5cdFx0XHRpZiAoY29tcG9uZW50LmNvbnN0cnVjdG9yLm5hbWUgIT0gJ0NoZWNrb3V0Jykge1xyXG5cdFx0XHRcdGNvbXBvbmVudC5oaWRlKCk7XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cdH1cclxufVxuXG4vLyBIZWxwZXJzXHJcbi8vIENvbXBvbmVudHNcclxuLy8gRXhjZXB0aW9uc1xyXG4vKipcclxuICogVGhlIGRlZmF1bHQgc2V0dGluZ3Mgb2YgZWFjaCBwcm9kdWN0LlxyXG4gKlxyXG4gKiBAdmFyIG9iamVjdFxyXG4gKi9cclxubGV0IGRlZmF1bHRTZXR0aW5ncyQ0ID0ge1xyXG5cdGVsZW1lbnQ6ICcucHJvZHVjdHMnLFxyXG5cdGNsYXNzOiAnJyxcclxuXHRpdGVtX2NsYXNzOiAnJyxcclxuXHRhZGRfYnV0dG9uX2NsYXNzOiAnYnRuIGJ0bi1wcmltYXJ5JyxcclxuXHRmYXZvcml0ZV9idXR0b25fY2xhc3M6ICdidG4gYnRuLWRhbmdlcicsXHJcblx0d2lkdGg6ICcyMDBweCcsXHJcblx0aGVpZ2h0OiAnMjUwcHgnLFxyXG5cdGF0dHJpYnV0ZXM6IFsnbmFtZScsICdwcmljZScsICdkZWxpdmVyeVRpbWUnLCAnaW1hZ2UnXSxcclxuXHR1cmw6ICdwcm9kdWN0cy5waHAnLFxyXG5cdG5vX2NzczogZmFsc2UsXHJcblx0Y3VycmVuY3k6ICckJyxcclxufTtcclxuXHJcbi8qKlxyXG4gKiBTdG9yZXMgdGhlIGNvbnRhaW5lciBvYmplY3QuXHJcbiAqIFxyXG4gKiBAdmFyIFxcQ29yZVxcQ29udGFpbmVyXHJcbiAqL1xyXG5sZXQgQ29udGFpbmVyJDM7XHJcblxyXG4vKipcclxuICogU3RvcmVzIHRoZSBjb250YWluZXIgb2JqZWN0LlxyXG4gKiBcclxuICogQHZhciBcXENvcmVcXEV2ZW50TWFuYWdlclxyXG4gKi9cclxubGV0IEV2ZW50TWFuYWdlciQ0O1xyXG5cclxuLyoqXHJcbiAqIFN0b3JlcyB0aGUgcmVxdWVzdCBvYmplY3QuXHJcbiAqIFxyXG4gKiBAdmFyIFxcSGVscGVyXFxSZXF1ZXN0IFxyXG4gKi9cclxubGV0IEh0dHAkMjtcclxuXHJcbi8qKlxyXG4gKiBTdG9yZXMgdGhlIGNodW5rZWQgcGVyIFxyXG4gKiBwYWdlIHByb2R1Y3RzLlxyXG4gKiBcclxuICogQHZhciBhcnJheVxyXG4gKi9cclxubGV0IGNodW5rZWRQcm9kdWN0cztcclxuXHJcbi8qKlxyXG4gKiBAY2xhc3MgUHJvZHVjdHNcclxuICpcclxuICogVGhlIFByb2R1Y3RzIGNvbXBvbmVudCwgaGFuZGxlcyB0aGUgcHJvZHVjdHMgdGFza3MuXHJcbiAqL1xyXG5cclxuY2xhc3MgUHJvZHVjdHMgZXh0ZW5kcyBCYXNlQ29tcG9uZW50XHJcbntcclxuXHQvKipcclxuXHQgKiBJbml0YWxpemUgdGhlIENvbnRhaW5lci5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSBcXENvcmVcXENvbnRhaW5lciB8IGNvbnRhaW5lclxyXG5cdCAqIEBwYXJhbSBcXEhlbHBlcnNcXFJlcXVlc3QgfCBodHRwXHJcblx0ICogQHJldHVybiB2b2lkXHJcblx0ICovXHJcblx0Y29uc3RydWN0b3IoY29udGFpbmVyLCBodHRwLCBldmVudE1hbmFnZXIpIFxyXG5cdHtcclxuXHRcdHN1cGVyKCk7XHJcblxyXG5cdFx0Q29udGFpbmVyJDMgPSBjb250YWluZXI7XHJcblx0XHRIdHRwJDIgPSBodHRwO1xyXG5cdFx0RXZlbnRNYW5hZ2VyJDQgPSBldmVudE1hbmFnZXI7XHJcblx0XHRjaHVua2VkUHJvZHVjdHMgPSBbXTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFNldHMgdGhlIGdpdmVuIHNldHRpbmdzIGZyb20gdGhlIHVzZXIuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gb2JqZWN0IHwgc2V0dGluZ3NcclxuXHQgKiBAcmV0dXJuIHZvaWRcclxuXHQgKi9cclxuXHRzZXR1cChzZXR0aW5ncylcclxuXHR7XHJcblx0XHRpZiAodHlwZW9mIHNldHRpbmdzICE9ICdvYmplY3QnKSB7XHJcblx0XHRcdHRocm93IG5ldyBJbnZhbGlkQXJndW1lbnRFeGNlcHRpb24kMTtcclxuXHRcdH1cclxuXHJcblx0XHR0aGlzLnNldHRpbmdzID0gQ29tbW9uLmV4dGVuZChkZWZhdWx0U2V0dGluZ3MkNCwgc2V0dGluZ3MpO1xyXG5cdFx0dGhpcy50b3RhbEl0ZW1zID0gbnVsbDtcclxuXHJcblx0XHRkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgZnVuY3Rpb24oKSB7XHJcblxyXG5cdFx0XHR0aGlzLnNldEVsZW1lbnQodGhpcy5zZXR0aW5ncy5lbGVtZW50KTtcclxuXHJcblx0XHRcdHRoaXMuZHJhdygpO1x0XHJcblxyXG5cdFx0XHR0aGlzLmxvYWRQcm9kdWN0cygxKTtcclxuXHRcdH0uYmluZCh0aGlzKSk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBMb2FkcyB0aGUgcHJvZHVjdHMgZm9yIHRoZSBwYWdlLlxyXG5cdCAqIFxyXG5cdCAqIEBwYXJhbSBudW1iZXIgfCBwYWdlTnVtYmVyXHJcblx0ICogQHBhcmFtIGJvb2wgfCBhcHBlbmRcclxuXHQgKiBAcmV0dXJuIHZvaWRcclxuXHQgKi9cclxuXHRsb2FkUHJvZHVjdHMocGFnZU51bWJlciA9IDEsIGFwcGVuZCA9IGZhbHNlKVxyXG5cdHtcclxuXHRcdGlmIChDb250YWluZXIkMy5QYWdpbmF0aW9uICYmIENvbnRhaW5lciQzLlBhZ2luYXRpb24uYm9vdGVkKSB7XHJcblx0XHRcdFxyXG5cdFx0XHRsZXQgbGltaXQgPSBDb250YWluZXIkMy5QYWdpbmF0aW9uLnNldHRpbmdzLnBlcl9wYWdlO1xyXG5cclxuXHRcdFx0c3dpdGNoKENvbnRhaW5lciQzLlBhZ2luYXRpb24uc2V0dGluZ3MucHJvY2Vzc2luZykgXHJcblx0XHRcdHtcclxuXHRcdFx0XHRjYXNlICdjbGllbnQtc2lkZSc6XHJcblx0XHRcdFx0XHRyZXR1cm4gdGhpcy5sb2FkUGFnZVByb2R1Y3RzT25jZShwYWdlTnVtYmVyLCBsaW1pdCwgYXBwZW5kKTtcclxuXHRcdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRcdGNhc2UgJ3NlcnZlci1zaWRlJzpcclxuXHRcdFx0XHRcdHJldHVybiB0aGlzLmxvYWRQYWdlUHJvZHVjdHMocGFnZU51bWJlciwgbGltaXQsIGFwcGVuZCk7XHJcblx0XHRcdFx0XHRicmVhaztcclxuXHRcdFx0XHRkZWZhdWx0OlxyXG5cdFx0XHRcdFx0dGhyb3cgbmV3IEludmFsaWRBcmd1bWVudEV4Y2VwdGlvbiQxKCdmb3IgcHJvY2Vzc2luZyB5b3UgY2FuIGNob29zZSBcXCdzZXJ2ZXItc2lkZVxcJyBvciBcXCdjbGllbnQtc2lkZVxcJyBvcHRpb25zLicpO1xyXG5cdFx0XHR9XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHR0aGlzLmxvYWRQYWdlUHJvZHVjdHMoKTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIExvYWRzIHRoZSBwcm9kdWN0cyBhbmQgXHJcblx0ICogcmVwbGFjZSB0aGVtIGluIHRoZSBkaXYgY29udGFpbmVyLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIG51bWJlciB8IHBhZ2VOdW1iZXJcclxuXHQgKiBAcGFyYW0gbnVtYmVyIHwgbGltaXRcclxuXHQgKiBAcmV0dXJuIHZvaWRcclxuXHQgKi9cclxuXHRsb2FkUGFnZVByb2R1Y3RzKHBhZ2VOdW1iZXIgPSBudWxsLCBsaW1pdCA9IG51bGwpXHJcblx0e1xyXG5cdFx0bGV0IHJlcXVlc3QgPSB0aGlzLmdldFByb2R1Y3RzKHBhZ2VOdW1iZXIpO1xyXG5cclxuXHRcdHJlcXVlc3QudGhlbihmdW5jdGlvbihwcm9kdWN0cykge1xyXG5cdFx0XHRpZiAobGltaXQpIHtcclxuXHRcdFx0XHR0aGlzLmN1cnJlbnRJdGVtcyA9IHByb2R1Y3RzLnNsaWNlKDAsIGxpbWl0KTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHR0aGlzLmN1cnJlbnRJdGVtcyA9IHByb2R1Y3RzO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHR0aGlzLnJlcGxhY2VQcm9kdWN0cyh0aGlzLmN1cnJlbnRJdGVtcyk7XHJcblx0XHRcdFByb21pc2UucmVzb2x2ZSh0aGlzLmN1cnJlbnRJdGVtcyk7XHJcblx0XHR9LmJpbmQodGhpcykpLmNhdGNoKGZ1bmN0aW9uKGVycm9yKSB7XHJcblx0XHRcdC8vIHRocm93IG5ldyBFcnJvcignQ291bGQgbm90IGxvYWQgcHJvZHVjdHMhIFJlYXNvbjogJyArIGVycm9yKTtcclxuXHRcdH0pO1xyXG5cclxuXHRcdHJldHVybiByZXF1ZXN0O1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogTG9hZHMgdGhlIHByb2R1Y3RzIGFuZCBcclxuXHQgKiByZXBsYWNlIHRoZW0gaW4gdGhlIGRpdiBjb250YWluZXIuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gbnVtYmVyIHwgcGFnZU51bWJlclxyXG5cdCAqIEBwYXJhbSBib29sIHwgYXBwZW5kXHJcblx0ICogQHJldHVybiB2b2lkXHJcblx0ICovXHJcblx0bG9hZFBhZ2VQcm9kdWN0c09uY2UocGFnZU51bWJlciwgYXBwZW5kID0gZmFsc2UpXHJcblx0e1xyXG5cdFx0bGV0IHJlcXVlc3Q7XHJcblxyXG5cdFx0aWYgKHRoaXMudG90YWxJdGVtcyA9PSBudWxsKSB7IC8vIG5lZWQgdG8gZmV0Y2ggdGhlbSBmcm9tIHRoZSBzZXJ2ZXIuXHJcblx0XHRcdHJlcXVlc3QgPSB0aGlzLmdldFByb2R1Y3RzKCk7XHJcblx0XHR9IGVsc2UgeyAvLyBubyBuZWVkIHRvIHdhaXQgY2FuIHJlc29sdmUgaW1tZWRpYXRlbHkgd2l0aCB0aGUgcHJvZHVjdHMuIFxyXG5cdFx0XHRyZXF1ZXN0ID0gUHJvbWlzZS5yZXNvbHZlKHRoaXMudG90YWxJdGVtcyk7XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIHJlcXVlc3QudGhlbihmdW5jdGlvbihwcm9kdWN0cykge1xyXG5cdFx0XHR0aGlzLnRvdGFsSXRlbXMgPSBwcm9kdWN0cztcclxuXHRcdFx0bGV0IHBhZ2VzID0gdGhpcy5jYWxjdWxhdGVDbGllbnRQYWdlcyhwcm9kdWN0cyk7XHJcblx0XHRcdHRoaXMuY3VycmVudEl0ZW1zID0gcGFnZXNbcGFnZU51bWJlci0xXTtcclxuXHJcblx0XHRcdGlmICh0eXBlb2YgdGhpcy5jdXJyZW50SXRlbXMgPT0gJ3VuZGVmaW5lZCcpIHtcclxuXHRcdFx0XHRyZXR1cm4gbnVsbDtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0aWYgKGFwcGVuZCkge1xyXG5cdFx0XHRcdHRoaXMuYXBwZW5kUHJvZHVjdHModGhpcy5jdXJyZW50SXRlbXMpO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdHRoaXMucmVwbGFjZVByb2R1Y3RzKHRoaXMuY3VycmVudEl0ZW1zKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0cmV0dXJuIHRoaXMuY3VycmVudEl0ZW1zO1xyXG5cdFx0fS5iaW5kKHRoaXMpKS5jYXRjaChmdW5jdGlvbihlcnJvcikge1xyXG5cdFx0XHQvLyB0aHJvdyBuZXcgRXJyb3IoJ0NvdWxkIG5vdCBsb2FkIHByb2R1Y3RzISBSZWFzb246ICcgKyBlcnJvcik7XHJcblx0XHR9KTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIENhbGN1bGF0ZXMgdGhlIGFtb3VudCBvZiBwYWdlcyBmb3IgdGhlIGNsaWVudC5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSBhcnJheSB8IHByb2R1Y3RzXHJcblx0ICogQHJldHVybiBhcnJheVxyXG5cdCAqL1xyXG5cdGNhbGN1bGF0ZUNsaWVudFBhZ2VzKHByb2R1Y3RzKVxyXG5cdHtcdFxyXG5cdFx0Ly8gV2UgYXJlIHVzaW5nIHBhZ2luYXRpb24gc28gd2UgbmVlZCB0byB1cGRhdGUgaXQgdG9vLlxyXG5cdFx0Q29udGFpbmVyJDMuUGFnaW5hdGlvbi5zZXR0aW5ncy50b3RhbF9pdGVtcyA9IHByb2R1Y3RzLmxlbmd0aDtcclxuXHRcdFxyXG5cdFx0bGV0IHBlclBhZ2UgPSBDb250YWluZXIkMy5QYWdpbmF0aW9uLnNldHRpbmdzLnBlcl9wYWdlOyBcclxuXHJcblx0XHQvLyBXZSBuZWVkIHRvIGNhbGN1bGF0ZSB0aGUgcGFnZXMgb24gZnVsbCBodHRwIHJlcXVlc3QgXHJcblx0XHQvLyBvbmx5IG9uY2UuIHNvIHdlIGNoZWNrIHRvIHNlZSBpZiB3ZSBoYXZlIHJlc3VsdHMgaW4gb3VyIGNhY2hlLlxyXG5cdFx0aWYgKGNodW5rZWRQcm9kdWN0cy5sZW5ndGggIT0gMCkge1xyXG5cdFx0XHRyZXR1cm4gY2h1bmtlZFByb2R1Y3RzO1xyXG5cdFx0fVxyXG5cclxuXHRcdGNodW5rZWRQcm9kdWN0cyA9IENvbW1vbi5hcnJheV9jaHVuayhwcm9kdWN0cywgcGVyUGFnZSk7XHJcblx0XHRyZXR1cm4gY2h1bmtlZFByb2R1Y3RzO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogU2V0cyB0aGUgRE9NIGVsZW1lbnQgXHJcblx0ICogZm9yIHBvcHVsYXRpbmcgdGhlIHByb2R1Y3RzLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIHN0cmluZyB8IHNlbGVjdG9yXHJcblx0ICogQHJldHVybiB2b2lkXHJcblx0ICovXHJcblx0c2V0RWxlbWVudChzZWxlY3RvcilcclxuXHR7XHJcblx0XHR0aGlzLmVsZW1lbnQgPSBET00uZmluZChzZWxlY3Rvcik7XHJcblxyXG5cdFx0aWYgKHRoaXMuZWxlbWVudCkge1xyXG5cdFx0XHRET00uYWRkQ2xhc3ModGhpcy5lbGVtZW50LCB0aGlzLnNldHRpbmdzLmNsYXNzKTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFJlcGxhY2UgcHJvZHVjdHMgaW4gXHJcblx0ICogdGhlIHByb2R1Y3RzIGNvbnRhaW5lci5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSBhcnJheSB8IHJhd1Byb2R1Y3RzXHJcblx0ICogQHJldHVybiBhcnJheVxyXG5cdCAqL1xyXG5cdHJlcGxhY2VQcm9kdWN0cyhyYXdQcm9kdWN0cykgXHJcblx0e1xyXG5cdFx0aWYgKCEgQXJyYXkuaXNBcnJheShyYXdQcm9kdWN0cykgfHwgKHJhd1Byb2R1Y3RzLmxlbmd0aCA8PSAwICYmIHR5cGVvZiByYXdQcm9kdWN0c1swXSA9PSAnc3RyaW5nJykpIHtcclxuXHRcdFx0dGhyb3cgbmV3IEludmFsaWRBcmd1bWVudEV4Y2VwdGlvbiQxO1xyXG5cdFx0fVxyXG5cclxuXHRcdGxldCBwcm9kdWN0cyA9IHRoaXMuYnVpbGRQcm9kdWN0cyhyYXdQcm9kdWN0cywgdGhpcy5zZXR0aW5ncy5pdGVtX2NsYXNzLCAnZGl2Jyk7XHJcblxyXG5cdFx0dGhpcy5lbGVtZW50LmlubmVySFRNTCA9ICcnO1xyXG5cdFx0cHJvZHVjdHMuZm9yRWFjaChmdW5jdGlvbihwcm9kdWN0KSB7XHJcblx0XHRcdEV2ZW50TWFuYWdlciQ0LnB1Ymxpc2goJ3Byb2R1Y3RzLmxvYWRpbmcnLCBwcm9kdWN0KTtcclxuXHRcdFx0dGhpcy5lbGVtZW50LmFwcGVuZENoaWxkKHByb2R1Y3QpO1xyXG5cdFx0fS5iaW5kKHRoaXMpKTtcclxuXHJcblx0XHRFdmVudE1hbmFnZXIkNC5wdWJsaXNoKCdwcm9kdWN0cy5sb2FkZWQnLCBwcm9kdWN0cyk7XHJcblxyXG5cdFx0cmV0dXJuIHByb2R1Y3RzO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQXBwZW5kcyBtb3JlIHByb2R1Y3RzIHRvIHRoZVxyXG5cdCAqIGRpdiBjb250YWluZXIuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gYXJyYXkgfCByYXdQcm9kdWN0c1xyXG5cdCAqIEByZXR1cm4gYXJyYXlcclxuXHQgKi9cclxuXHRhcHBlbmRQcm9kdWN0cyhyYXdQcm9kdWN0cylcclxuXHR7XHJcblx0XHRpZiAoISBBcnJheS5pc0FycmF5KHJhd1Byb2R1Y3RzKSB8fCAocmF3UHJvZHVjdHMubGVuZ3RoIDw9IDAgJiYgdHlwZW9mIHJhd1Byb2R1Y3RzWzBdID09ICdzdHJpbmcnKSkge1xyXG5cdFx0XHR0aHJvdyBuZXcgSW52YWxpZEFyZ3VtZW50RXhjZXB0aW9uJDE7XHJcblx0XHR9XHJcblxyXG5cdFx0bGV0IHByb2R1Y3RzID0gdGhpcy5idWlsZFByb2R1Y3RzKHJhd1Byb2R1Y3RzLCB0aGlzLnNldHRpbmdzLml0ZW1fY2xhc3MsICdkaXYnKTtcclxuXHJcblx0XHRwcm9kdWN0cy5mb3JFYWNoKGZ1bmN0aW9uKHByb2R1Y3QpIHtcclxuXHRcdFx0RXZlbnRNYW5hZ2VyJDQucHVibGlzaCgncHJvZHVjdHMubG9hZGluZycsIHByb2R1Y3QpO1xyXG5cdFx0XHR0aGlzLmVsZW1lbnQuYXBwZW5kQ2hpbGQocHJvZHVjdCk7XHJcblx0XHR9LmJpbmQodGhpcykpO1xyXG5cclxuXHRcdEV2ZW50TWFuYWdlciQ0LnB1Ymxpc2goJ3Byb2R1Y3RzLmxvYWRlZCcsIHByb2R1Y3RzKTtcclxuXHJcblx0XHRyZXR1cm4gcHJvZHVjdHM7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBNYWtlcyBhbiBBamF4IGNhbGwgdG8gdGhlIFxyXG5cdCAqIHNlcnZlciB3aXRob3V0IHBhcmFtZXRlcnMuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gbnVtYmVyIHwgcGFnZU51bWJlclxyXG5cdCAqIEByZXR1cm4gUHJvbWlzZVxyXG5cdCAqL1xyXG5cdGdldFByb2R1Y3RzKHBhZ2VOdW1iZXIgPSBudWxsKVxyXG5cdHtcclxuXHRcdGxldCBhY3Rpb24gPSAocGFnZU51bWJlcikgPyB0aGlzLnNldHRpbmdzLnVybCArICc/cGFnZT0nICsgcGFnZU51bWJlciA6IHRoaXMuc2V0dGluZ3MudXJsO1xyXG5cclxuXHRcdHJldHVybiBIdHRwJDIuZ2V0KHtcclxuXHRcdFx0dXJsOiBhY3Rpb24sXHJcblx0XHR9KTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEJ1aWxkcyB0aGUgaHRtbCBmb3IgdGhlIHByb2R1Y3RzLlxyXG5cdCAqIFxyXG5cdCAqIEBwYXJhbSBhcnJheSB8IGF0dHJpYnV0ZXNDb2xsZWN0aW9uXHJcblx0ICogQHBhcmFtIHN0cmluZyB8IGNsYXNzTmFtZVxyXG5cdCAqIEBwYXJhbSBzdHJpbmcgfCB0YWdUeXBlXHJcblx0ICogQHJldHVybiBhcnJheVxyXG5cdCAqL1xyXG5cdGJ1aWxkUHJvZHVjdHMoYXR0cmlidXRlc0NvbGxlY3Rpb24sIGNsYXNzTmFtZSwgdGFnVHlwZSkgXHJcblx0e1xyXG5cdFx0aWYoYXR0cmlidXRlc0NvbGxlY3Rpb24uY29uc3RydWN0b3IubmFtZSAhPSAnQXJyYXknICkge1xyXG5cdFx0XHR0aHJvdyBuZXcgSW52YWxpZEFyZ3VtZW50RXhjZXB0aW9uJDE7XHJcblx0XHR9XHJcblxyXG5cdFx0bGV0IGJ1aWx0UHJvZHVjdHMgPSBbXTtcclxuXHJcblx0XHQvLyBFbnRlciBkZWZhdWx0IGF0dHJpYnV0ZS5cclxuXHRcdGlmICh0aGlzLnNldHRpbmdzLmF0dHJpYnV0ZXMuaW5kZXhPZignY3VycmVuY3knKSA9PSAtMSkge1xyXG5cdFx0XHR0aGlzLnNldHRpbmdzLmF0dHJpYnV0ZXMucHVzaCgnY3VycmVuY3knKTtcclxuXHRcdH1cclxuXHRcdFxyXG5cdFx0YXR0cmlidXRlc0NvbGxlY3Rpb24uZm9yRWFjaChmdW5jdGlvbihhdHRyaWJ1dGVzKSB7XHJcblx0XHRcdGxldCBidWlsdFByb2R1Y3QgPSB0aGlzLmJ1aWxkUHJvZHVjdChhdHRyaWJ1dGVzLCBjbGFzc05hbWUsIHRhZ1R5cGUpO1xyXG5cdFx0XHRidWlsdFByb2R1Y3RzLnB1c2goYnVpbHRQcm9kdWN0KTtcclxuXHRcdH0uYmluZCh0aGlzKSk7XHJcblxyXG5cdFx0cmV0dXJuIGJ1aWx0UHJvZHVjdHM7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBCdWlsZHMgdGhlIGh0bWwgZm9yIGEgc2luZ2xlIHByb2R1Y3QuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gb2JqZWN0IHwgYXR0cmlidXRlc1xyXG5cdCAqIEBwYXJhbSBzdHJpbmcgfCBjbGFzc05hbWVcclxuXHQgKiBAcGFyYW0gc3RyaW5nIHwgdGFnVHlwZVxyXG5cdCAqIEByZXR1cm4gb2JqZWN0XHJcblx0ICovXHJcblx0YnVpbGRQcm9kdWN0KGF0dHJpYnV0ZXMsIGNsYXNzTmFtZSwgdGFnVHlwZSkgXHJcblx0e1xyXG5cdFx0aWYgKHR5cGVvZiBhdHRyaWJ1dGVzICE9ICdvYmplY3QnIHx8IHR5cGVvZiB0YWdUeXBlICE9ICdzdHJpbmcnKSB7XHJcblx0XHRcdHRocm93IG5ldyBJbnZhbGlkQXJndW1lbnRFeGNlcHRpb24kMTtcclxuXHRcdH1cclxuXHJcblx0XHRjbGFzc05hbWUgPSBjbGFzc05hbWUgfHwgbnVsbDtcclxuXHJcblx0XHRsZXQgcHJvZHVjdCA9IERPTS5jcmVhdGVFbGVtZW50KCdkaXYnLCB7XHJcblx0XHRcdGNsYXNzOiAncHJvZHVjdCdcclxuXHRcdH0pO1xyXG5cclxuXHRcdERPTS5hZGRDbGFzcyhwcm9kdWN0LCBjbGFzc05hbWUpO1xyXG5cclxuXHRcdGxldCBvdmVybGF5ID0gRE9NLmNyZWF0ZUVsZW1lbnQoJ2RpdicsIHtcclxuXHRcdFx0Y2xhc3M6ICdwcm9kdWN0LW92ZXJsYXknLFxyXG5cdFx0fSk7XHJcblxyXG5cdFx0cHJvZHVjdC5hcHBlbmRDaGlsZChvdmVybGF5KTtcclxuXHJcblx0XHRhdHRyaWJ1dGVzID0gdGhpcy5hZGREZWZhdWx0QXR0cmlidXRlcyhhdHRyaWJ1dGVzKTtcclxuXHJcblx0XHRpZiAoYXR0cmlidXRlcy5oYXNPd25Qcm9wZXJ0eSgnaW1hZ2UnKSkge1xyXG5cdFx0XHRsZXQgaW1hZ2UgPSBET00uY3JlYXRlRWxlbWVudCgnaW1nJywge1xyXG5cdFx0XHRcdHNyYzogYXR0cmlidXRlc1snaW1hZ2UnXVxyXG5cdFx0XHR9KTtcclxuXHRcdFx0XHJcblx0XHRcdGxldCB0YWcgPSBET00uY3JlYXRlRWxlbWVudCh0YWdUeXBlLCB7XHJcblx0XHRcdFx0Y2xhc3M6ICdwcm9kdWN0LWltYWdlJyxcclxuXHRcdFx0XHRodG1sOiBpbWFnZS5vdXRlckhUTUxcclxuXHRcdFx0fSk7XHJcblx0XHRcdFxyXG5cdFx0XHRwcm9kdWN0LmFwcGVuZENoaWxkKHRhZyk7XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKGF0dHJpYnV0ZXMuaGFzT3duUHJvcGVydHkoJ3ByaWNlJykpIHtcclxuXHRcdFx0bGV0IHRhZyA9IERPTS5jcmVhdGVFbGVtZW50KHRhZ1R5cGUsIHtcclxuXHRcdFx0XHRjbGFzczogJ3Byb2R1Y3QtcHJpY2UnLFxyXG5cdFx0XHR9KTtcclxuXHJcblx0XHRcdGxldCBzcGFuID0gRE9NLmNyZWF0ZUVsZW1lbnQoJ3NwYW4nLCB7XHJcblx0XHRcdFx0Y2xhc3M6ICdwcm9kdWN0LWFtb3VudCcsXHJcblx0XHRcdFx0aHRtbDogYXR0cmlidXRlcy5wcmljZS5hbW91bnRcclxuXHRcdFx0fSk7XHJcblxyXG5cdFx0XHRsZXQgc3BhbjIgPSBET00uY3JlYXRlRWxlbWVudCgnc3BhbicsIHtcclxuXHRcdFx0XHRjbGFzczogJ3Byb2R1Y3QtY3VycmVuY3knLFxyXG5cdFx0XHRcdGh0bWw6IGF0dHJpYnV0ZXMucHJpY2UuY3VycmVuY3lcclxuXHRcdFx0fSk7XHJcblxyXG5cdFx0XHR0YWcuYXBwZW5kQ2hpbGQoc3Bhbik7XHJcblx0XHRcdHRhZy5hcHBlbmRDaGlsZChzcGFuMik7XHJcblx0XHRcdG92ZXJsYXkuYXBwZW5kQ2hpbGQodGFnKTtcclxuXHRcdH1cclxuXHJcblx0XHRmb3IgKHZhciBhdHRyaWJ1dGUgaW4gYXR0cmlidXRlcykge1xyXG5cdFx0XHRpZiAoISBDb21tb24uaW5fYXJyYXkoYXR0cmlidXRlLCB0aGlzLnNldHRpbmdzLmF0dHJpYnV0ZXMpKSB7XHJcblx0XHRcdFx0Y29udGludWU7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGlmIChhdHRyaWJ1dGUgPT0gJ3ByaWNlJyB8fCBhdHRyaWJ1dGUgPT0gJ2ltYWdlJykge1xyXG5cdFx0XHRcdGNvbnRpbnVlO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRsZXQgdGFnID0gRE9NLmNyZWF0ZUVsZW1lbnQodGFnVHlwZSk7XHJcblx0XHRcdHRhZy5pbm5lckhUTUwgPSBhdHRyaWJ1dGVzW2F0dHJpYnV0ZV0gfHwgJyc7XHJcblx0XHRcdFxyXG5cdFx0XHRET00uYWRkQ2xhc3ModGFnLCAncHJvZHVjdC0nICsgU3RyLmtlYmFiQ2FzZShhdHRyaWJ1dGUpKTtcclxuXHRcdFx0b3ZlcmxheS5hcHBlbmRDaGlsZCh0YWcpO1xyXG5cdFx0fVxyXG5cclxuXHRcdGxldCB0YWcgPSBET00uY3JlYXRlRWxlbWVudCgnZGl2Jywge1xyXG5cdFx0XHRjbGFzczogJ2FjdGlvbi1idXR0b25zJ1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0bGV0IGFkZFRvQ2FydCA9IERPTS5jcmVhdGVFbGVtZW50KCdidXR0b24nLCB7XHJcblx0XHRcdGNsYXNzOiAnYWRkLXRvLWNhcnQnLFxyXG5cdFx0XHR0eXBlOiAnYnV0dG9uJyxcclxuXHRcdFx0dGV4dDogJysnLFxyXG5cdFx0fSk7XHJcblxyXG5cdFx0bGV0IGZhdm9yaXRlID0gRE9NLmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicsIHtcclxuXHRcdFx0Y2xhc3M6ICdmYXZvcml0ZScsXHJcblx0XHRcdHR5cGU6ICdidXR0b24nLFxyXG5cdFx0XHR0ZXh0OiAnJmhlYXJ0czsnXHJcblx0XHR9KTtcclxuXHJcblx0XHRpZiAodGhpcy5zZXR0aW5ncy5hZGRfYnV0dG9uX2NsYXNzKSB7XHJcblx0XHRcdERPTS5hZGRDbGFzcyhhZGRUb0NhcnQsIHRoaXMuc2V0dGluZ3MuYWRkX2J1dHRvbl9jbGFzcyk7XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKHRoaXMuc2V0dGluZ3MuZmF2b3JpdGVfYnV0dG9uX2NsYXNzKSB7XHJcblx0XHRcdERPTS5hZGRDbGFzcyhmYXZvcml0ZSwgdGhpcy5zZXR0aW5ncy5mYXZvcml0ZV9idXR0b25fY2xhc3MpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHRhZy5hcHBlbmRDaGlsZChhZGRUb0NhcnQpO1xyXG5cdFx0dGFnLmFwcGVuZENoaWxkKGZhdm9yaXRlKTtcclxuXHJcblx0XHRhZGRUb0NhcnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbihlKSB7XHJcblx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcclxuXHRcdFx0RXZlbnRNYW5hZ2VyJDQucHVibGlzaCgnY2FydC5wcm9kdWN0LmFkZGVkJywgYXR0cmlidXRlcyk7XHJcblx0XHR9KTtcclxuXHJcblx0XHRmYXZvcml0ZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcclxuXHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdFx0XHR0aGlzLmlubmVySFRNTCA9ICcmI3gyNzEzOyc7XHJcblx0XHRcdEV2ZW50TWFuYWdlciQ0LnB1Ymxpc2goJ2NhcnQucHJvZHVjdC5mYXZvcml0ZWQnLCBhdHRyaWJ1dGVzKTtcclxuXHRcdH0pO1xyXG5cclxuXHRcdG92ZXJsYXkuYXBwZW5kQ2hpbGQodGFnKTtcclxuXHJcblx0XHRyZXR1cm4gcHJvZHVjdDtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEFkZHMgZGVmYXVsdCBhdHRyaWJ1dGVzXHJcblx0ICogdG8gdGhlIHN1cHBsaWVkIGF0dHJpYnV0ZXMuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gb2JqZWN0IHwgYXR0cmlidXRlc1xyXG5cdCAqIEByZXR1cm4gb2JqZWN0XHJcblx0ICovXHJcblx0YWRkRGVmYXVsdEF0dHJpYnV0ZXMoYXR0cmlidXRlcylcclxuXHR7XHJcblx0XHRpZiAoYXR0cmlidXRlcy5oYXNPd25Qcm9wZXJ0eSgncHJpY2UnKSAmJiB0eXBlb2YgYXR0cmlidXRlcy5wcmljZSAhPSAnb2JqZWN0Jykge1xyXG5cdFx0XHRhdHRyaWJ1dGVzLnByaWNlID0ge1xyXG5cdFx0XHRcdFwiYW1vdW50XCI6IGF0dHJpYnV0ZXMucHJpY2UsXHJcblx0XHRcdFx0XCJjdXJyZW5jeVwiOiB0aGlzLnNldHRpbmdzLmN1cnJlbmN5XHJcblx0XHRcdH07XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIGF0dHJpYnV0ZXM7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBBZGQgdGhlIGVDb21tZXJjZSBzdHlsZSB0YWdzIHRvIHRoZSBET00uXHJcblx0ICovXHJcblx0ZHJhdygpIFxyXG5cdHtcclxuXHRcdGlmIChET00uZmluZCgnI1R1cmJvLWVDb21tZXJjZS1Qcm9kdWN0cycpKSB7XHJcblx0XHRcdHJldHVybjtcclxuXHRcdH1cclxuXHJcblx0XHRpZiAodGhpcy5zZXR0aW5ncy5ub19jc3MpIHtcclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0fVxyXG5cclxuXHRcdGxldCB3aWR0aCA9IHRoaXMuc2V0dGluZ3Mud2lkdGggfHwgJ2F1dG8nO1xyXG5cdFx0bGV0IGhlaWdodCA9IHRoaXMuc2V0dGluZ3MuaGVpZ2h0IHx8ICcyMDBweCc7XHJcblx0XHRsZXQgbWluV2lkdGggPSB0aGlzLnNldHRpbmdzLm1pbl93aWR0aCB8fCAnMjAwcHgnO1xyXG5cdFx0bGV0IG1heFdpZHRoID0gdGhpcy5zZXR0aW5ncy5tYXhfd2lkdGggfHwgJzI1MHB4JztcclxuXHJcblx0XHRsZXQgY3NzID0gYFxyXG5cdFx0XHQucHJvZHVjdCB7XHJcblx0XHRcdFx0cG9zaXRpb246IHJlbGF0aXZlO1xyXG5cdFx0XHRcdG1hcmdpbjogNXB4IDVweDtcclxuXHRcdFx0XHRib3JkZXI6IDFweCBzb2xpZCAjZTRlNGU0O1xyXG5cdFx0XHRcdHdpZHRoOiAke3dpZHRofTtcclxuXHRcdFx0XHRtaW4td2lkdGg6ICR7bWluV2lkdGh9O1xyXG5cdFx0XHRcdG1heC13aWR0aDogJHttYXhXaWR0aH07XHJcblx0XHRcdFx0aGVpZ2h0OiAke2hlaWdodH07XHJcblx0XHRcdFx0Y3Vyc29yOiBwb2ludGVyO1xyXG5cdFx0XHRcdGNvbG9yOiAjZmZmZmZmO1xyXG5cdFx0XHRcdG92ZXJmbG93OiBoaWRkZW47XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdC5wcm9kdWN0ID4gLnByb2R1Y3Qtb3ZlcmxheSB7XHJcblx0XHRcdFx0cG9zaXRpb246IGFic29sdXRlO1xyXG5cdFx0XHRcdHRvcDogMDtcclxuXHRcdFx0XHRsZWZ0OiAwO1xyXG5cdFx0XHRcdHdpZHRoOiAxMDAlO1xyXG5cdFx0XHRcdGhlaWdodDogMTAwJTtcclxuXHRcdFx0XHRvcGFjaXR5OiAwLjU7XHJcblx0XHRcdFx0ei1pbmRleDogNTtcclxuXHRcdFx0XHR0cmFuc2l0aW9uOiAxcyBhbGw7XHJcblx0XHRcdFx0dHJhbnNmb3JtOiB0cmFuc2xhdGVYKC0yNTBweCk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdC5wcm9kdWN0OmhvdmVyID4gLnByb2R1Y3Qtb3ZlcmxheSB7XHJcblx0XHRcdFx0YmFja2dyb3VuZDogcmdiYSgwLCAwLCAwLCAwLjQ1KTtcclxuXHRcdFx0XHR0cmFuc2Zvcm06IHRyYW5zbGF0ZVgoMHB4KTtcclxuXHRcdFx0XHRvcGFjaXR5OiAxO1xyXG5cdFx0XHRcdHRyYW5zaXRpb246IDAuNXMgYWxsO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHQucHJvZHVjdCA+IC5wcm9kdWN0LWltYWdlID4gaW1nIHtcclxuXHRcdFx0XHRwb3NpdGlvbjogYWJzb2x1dGU7XHJcblx0XHRcdFx0bGVmdDogMDtcclxuXHRcdFx0XHR0b3A6IDA7XHJcblx0XHRcdFx0d2lkdGg6IDEwMCU7XHJcblx0XHRcdFx0aGVpZ2h0OiAxMDAlO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHQucHJvZHVjdCA+IC5wcm9kdWN0LW92ZXJsYXkgPiAucHJvZHVjdC1uYW1lLCBcclxuXHRcdFx0LnByb2R1Y3QgPiAucHJvZHVjdC1vdmVybGF5ID4gLnByb2R1Y3QtcHJpY2UsXHJcblx0XHRcdC5wcm9kdWN0ID4gLnByb2R1Y3Qtb3ZlcmxheSA+IC5wcm9kdWN0LWRlbGl2ZXJ5LXRpbWUge1xyXG5cdFx0XHRcdHotaW5kZXg6IDE7XHJcblx0XHRcdFx0cG9zaXRpb246IHJlbGF0aXZlO1xyXG5cdFx0XHRcdHRleHQtYWxpZ246IGNlbnRlcjtcclxuXHRcdFx0XHRtYXJnaW4tdG9wOiAyNXB4O1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHQucHJvZHVjdCA+IC5wcm9kdWN0LW92ZXJsYXkgPiAuYWN0aW9uLWJ1dHRvbnMge1xyXG5cdFx0XHRcdHdpZHRoOiAxMDAlO1xyXG5cdFx0XHRcdG1hcmdpbi10b3A6IDEwcHg7XHJcblx0XHRcdFx0dGV4dC1hbGlnbjogY2VudGVyO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHQucHJvZHVjdCA+IC5wcm9kdWN0LW92ZXJsYXkgPiAuYWN0aW9uLWJ1dHRvbnMgPiAuZmF2b3JpdGUge1xyXG5cdFx0XHRcdG1hcmdpbi1sZWZ0OiAxMHB4O1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0YDtcclxuXHQgICAgXHJcblx0ICAgIERPTS5hZGRTdHlsZSgnVHVyYm8tZUNvbW1lcmNlLVByb2R1Y3RzJywgY3NzKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEhpZGVzIGFsbCBpcnJlbGV2YW50IGVsZW1lbnRzIGZyb20gdGhlIERPTS5cclxuXHQgKlxyXG5cdCAqIEByZXR1cm4gdm9pZCBcclxuXHQgKi9cclxuXHRoaWRlQWxsKClcclxuXHR7XHRcclxuXHRcdENvbnRhaW5lciQzLkNvbXBvbmVudHMuYm9vdGVkLmZvckVhY2goZnVuY3Rpb24oY29tcG9uZW50KSB7XHJcblx0XHRcdGlmIChjb21wb25lbnQuY29uc3RydWN0b3IubmFtZSAhPSAnUHJvZHVjdHMnKSB7XHJcblx0XHRcdFx0Y29tcG9uZW50LmhpZGUoKTtcclxuXHRcdFx0fVxyXG5cdFx0fSk7XHJcblx0fVxyXG59XG5cbi8vIENvbXBvbmVudHNcclxuLyoqXHJcbiAqIFRoZSBTZXJ2aWNlcyBPYmplY3QsIGhhbmRsZXMgdGhlIHNlcnZpY2VzLlxyXG4gKi9cclxuY2xhc3MgU2VydmljZXMgZXh0ZW5kcyBCYXNlQ29tcG9uZW50IFxyXG57XHJcblxyXG59XG5cbmxldCBkZWZhdWx0TWVzc2FnZSQ0ID0gJ1NvcnJ5LCBubyBtb3JlIHBhZ2VzLic7XHJcblxyXG5jbGFzcyBOb3RJblBhZ2VSYW5nZUV4Y2VwdGlvbiBleHRlbmRzIEV4Y2VwdGlvbkhhbmRsZXJcclxue1xyXG5cdGNvbnN0cnVjdG9yKG1lc3NhZ2UgPSBudWxsKSBcclxuXHR7XHJcblx0XHRtZXNzYWdlID0gbWVzc2FnZSB8fCBkZWZhdWx0TWVzc2FnZSQ0O1xyXG5cdFx0c3VwZXIoKTtcclxuICAgIFx0c3VwZXIuc3RhY2tUcmFjZSh0aGlzLCBtZXNzYWdlKTtcclxuICAgIH1cclxufVxuXG4vLyBIZWxwZXJzXHJcbi8vIENvbXBvbmVudHNcclxuLy8gRXhjZXB0aW9uc1xyXG4vKipcclxuICogVGhlIGRlZmF1bHQgc2V0dGluZ3Mgb2YgdGhlIHBhZ2luYXRpb24uXHJcbiAqXHJcbiAqIEB2YXIgb2JqZWN0XHJcbiAqL1xyXG5sZXQgZGVmYXVsdFNldHRpbmdzJDUgPSB7XHJcblx0ZWxlbWVudDogJy5wYWdpbmF0aW9uLWxpbmtzJyxcclxuXHRwcm9jZXNzaW5nOiAnY2xpZW50LXNpZGUnLFxyXG5cdGNsYXNzOiAnJyxcclxuXHRwZXJfcGFnZTogNSxcclxuXHR0b3RhbF9pdGVtczogNSxcclxuXHR1cmxfcGFyYW1ldGVyOiAncGFnZScsXHJcblx0c2VwYXJhdG9yOiAnIycsXHJcblx0c2Nyb2xsOiBmYWxzZSxcclxufTtcclxuXHJcbi8qKlxyXG4gKiBTdG9yZXMgdGhlIGNvbnRhaW5lciBvYmplY3QuXHJcbiAqXHJcbiAqIEB2YXIgXFxDb3JlXFxDb250YWluZXJcclxuICovXHJcbmxldCBDb250YWluZXIkNDtcclxuXHJcbi8qKlxyXG4gKiBTdG9yZXMgdGhlIHByb2R1Y3RzIGNvbXBvbmVudC5cclxuICpcclxuICogQHZhciBcXENvbXBvbmVudHNcXFByb2R1Y3RzXHJcbiAqL1xyXG5sZXQgUHJvZHVjdHMkMjtcclxuXHJcbi8qKlxyXG4gKiBTdG9yZXMgdGhlIGNvbnRhaW5lciBvYmplY3QuXHJcbiAqIFxyXG4gKiBAdmFyIFxcQ29yZVxcRXZlbnRNYW5hZ2VyXHJcbiAqL1xyXG5sZXQgRXZlbnRNYW5hZ2VyJDU7XHJcblxyXG4vKipcclxuICogQGNsYXNzIFBhZ2luYXRpb25cclxuICpcclxuICogVGhlIFBhZ2luYXRpb24gY29tcG9uZW50LCBoYW5kbGVzIHRoZSBwYWdpbmF0aW9uLlxyXG4gKi9cclxuXHJcbmNsYXNzIFBhZ2luYXRpb24gZXh0ZW5kcyBCYXNlQ29tcG9uZW50XHJcbntcclxuXHQvKipcclxuXHQgKiAtIEluaXRpYWxpemUgdGhlIGNvbnRhaW5lciBvYmplY3QuXHJcblx0ICogLSBJbml0aWFsaXplIHRoZSBwcm9kdWN0cyBjb21wb25lbnQuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gXFxDb3JlXFxDb250YWluZXIgfCBjb250YWluZXJcclxuXHQgKiBAcGFyYW0gXFxDb21wb25lbnRzXFxQcm9kdWN0cyB8IHByb2R1Y3RzXHJcblx0ICogQHBhcmFtIFxcQ29tcG9uZW50c1xcU2VydmljZXMgfCBzZXJ2aWNlc1xyXG5cdCAqIEByZXR1cm4gdm9pZFxyXG5cdCAqL1xyXG5cdGNvbnN0cnVjdG9yKGNvbnRhaW5lciwgZXZlbnRzLCBwcm9kdWN0cyA9IG51bGwsIHNlcnZpY2VzID0gbnVsbCkgXHJcblx0e1xyXG5cdFx0c3VwZXIoKTtcclxuXHJcblx0XHRDb250YWluZXIkNCA9IGNvbnRhaW5lcjtcclxuXHRcdFByb2R1Y3RzJDIgPSBwcm9kdWN0cztcclxuXHRcdEV2ZW50TWFuYWdlciQ1ID0gZXZlbnRzO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogU2V0dXAgdGhlIHBhZ2luYXRpb24uXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gb2JqZWN0IHwgc2V0dGluZ3NcclxuXHQgKiBAcmV0dXJuIHZvaWRcclxuXHQgKi9cclxuXHRzZXR1cChzZXR0aW5ncylcclxuXHR7XHRcclxuXHRcdGlmKHR5cGVvZiBzZXR0aW5ncyAhPSAnb2JqZWN0Jykge1xyXG5cdFx0XHR0aHJvdyBuZXcgSW52YWxpZEFyZ3VtZW50RXhjZXB0aW9uJDE7XHJcblx0XHR9XHJcblxyXG5cdFx0dGhpcy5zZXR0aW5ncyA9IENvbW1vbi5leHRlbmQoZGVmYXVsdFNldHRpbmdzJDUsIHNldHRpbmdzKTtcclxuXHRcdHRoaXMuc2V0Q3VycmVudCgxKTtcclxuXHJcblx0XHRkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgZnVuY3Rpb24oKSB7XHRcdFxyXG5cdFx0XHR0aGlzLnNldEVsZW1lbnQodGhpcy5zZXR0aW5ncy5lbGVtZW50KTtcclxuXHJcblx0XHRcdC8vIEFzIGEgZmFsbGJhY2sgY2hvb3NlIHRoZSB1c2VyJ3Mgc2V0dGluZ3MgZm9yIHRoZSB0b3RhbCBpdGVtcyBjb3VudC5cclxuXHRcdFx0dGhpcy50b3RhbFBhZ2VzID0gdGhpcy5jYWxjdWxhdGVUb3RhbFBhZ2VzKHRoaXMuc2V0dGluZ3MucGVyX3BhZ2UsIHRoaXMuc2V0dGluZ3MudG90YWxfaXRlbXMpO1xyXG5cdFx0XHR0aGlzLmJ1aWxkUGFnaW5hdGlvbigpO1xyXG5cdFx0fS5iaW5kKHRoaXMpKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEJ1aWxkcyB0aGUgcGFnaW5hdGlvbi5cclxuXHQgKlxyXG5cdCAqIEByZXR1cm4gdm9pZFxyXG5cdCAqL1xyXG5cdGJ1aWxkUGFnaW5hdGlvbigpXHJcblx0e1xyXG5cdFx0aWYgKHRoaXMuc2V0dGluZ3Muc2Nyb2xsID09IHRydWUpIHtcclxuXHJcblx0XHRcdHdpbmRvdy5vbnNjcm9sbCA9IHRoaXMubW9uaXRvclNjcm9sbGluZy5iaW5kKHRoaXMpO1xyXG5cdFx0XHRyZXR1cm47XHJcblx0XHR9IFxyXG5cclxuXHRcdHRoaXMubGlua3MgPSB0aGlzLmNyZWF0ZUxpbmtzKCk7XHJcblx0XHR0aGlzLnJlcGxhY2VMaW5rcyh0aGlzLmxpbmtzKTtcclxuXHRcdHRoaXMuYmluZEV2ZW50TGlzdGVuZXJzKHRoaXMubGlua3MpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogU2V0cyB0aGUgZWxlbWVudC5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSBzdHJpbmcgfCBzZWxlY3RvclxyXG5cdCAqIEByZXR1cm4gdm9pZFxyXG5cdCAqL1xyXG5cdHNldEVsZW1lbnQoc2VsZWN0b3IpXHJcblx0e1xyXG5cdFx0dGhpcy5lbGVtZW50ID0gRE9NLmZpbmQoc2VsZWN0b3IpO1xyXG5cdFx0XHJcblx0XHRET00uYWRkQ2xhc3ModGhpcy5lbGVtZW50LCB0aGlzLnNldHRpbmdzLmNsYXNzKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFJlcGxhY2VzIHRoZSBsaW5rcyBpbiB0aGUgZWxlbWVudC5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSBIVE1MVUxpc3RFbGVtZW50IHwgbGlua3NcclxuXHQgKiBAcmV0dXJuIHZvaWRcclxuXHQgKi9cclxuXHRyZXBsYWNlTGlua3MobGlua3MpXHJcblx0e1xyXG5cdFx0dGhpcy5lbGVtZW50LmlubmVySFRNTCA9ICcnO1xyXG5cdFx0dGhpcy5lbGVtZW50LmFwcGVuZENoaWxkKGxpbmtzKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIENhbGN1bGF0ZXMgdGhlIHRvdGFsIHBhZ2VzLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIG51bWJlciB8IHBlclBhZ2VcclxuXHQgKiBAcGFyYW0gbnVtYmVyIHwgdG90YWxJdGVtc1xyXG5cdCAqIEByZXR1cm4gbnVtYmVyXHJcblx0ICovXHJcblx0Y2FsY3VsYXRlVG90YWxQYWdlcyhwZXJQYWdlLCB0b3RhbEl0ZW1zKVxyXG5cdHtcclxuXHRcdHBlclBhZ2UgPSBwYXJzZUludChwZXJQYWdlKTtcclxuXHRcdHRvdGFsSXRlbXMgPSBwYXJzZUludCh0b3RhbEl0ZW1zKTtcclxuXHJcblx0XHRyZXR1cm4gTWF0aC5jZWlsKHRvdGFsSXRlbXMgLyBwZXJQYWdlKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIExpc3RlbiB0byBzY3JvbGwgZXZlbnQuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gXHJcblx0ICogQHJldHVybiB2b2lkXHJcblx0ICovXHJcblx0bW9uaXRvclNjcm9sbGluZyhldmVudClcclxuXHR7XHJcblx0XHRsZXQgY3VycmVudFlPZmZzZXQgPSBET00uc2Nyb2xsWU9mZnNldCgpO1xyXG5cdFx0bGV0IGRvY3VtZW50SGVpZ2h0ID0gRE9NLmRvY3VtZW50SGVpZ2h0KCk7XHJcblx0XHRsZXQgd2luZG93SGVpZ2h0ID0gRE9NLndpbmRvd0hlaWdodCgpO1xyXG5cclxuXHRcdGlmICgoZG9jdW1lbnRIZWlnaHQtd2luZG93SGVpZ2h0KSAtIGN1cnJlbnRZT2Zmc2V0IDw9IDUwKSB7XHJcblx0XHRcdGxldCByZXF1ZXN0ZWRQYWdlID0gdGhpcy5jdXJyZW50KzE7XHJcblxyXG5cdFx0XHRpZiAoUHJvZHVjdHMkMiAmJiBQcm9kdWN0cyQyLmJvb3RlZCkge1xyXG5cdFx0XHRcdFByb2R1Y3RzJDIubG9hZFByb2R1Y3RzKHJlcXVlc3RlZFBhZ2UsIHRydWUpLnRoZW4oZnVuY3Rpb24ocHJvZHVjdHMpIHtcclxuXHRcdFx0XHRcdGlmIChwcm9kdWN0cykge1xyXG5cdFx0XHRcdFx0XHR0aGlzLnNldEN1cnJlbnQocmVxdWVzdGVkUGFnZSk7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fS5iaW5kKHRoaXMpKTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQmluZHMgdGhlIGJ1dHRvbnMgZXZlbnRzIGxpc3RlbmVycy5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSBIVE1MVUxpc3RFbGVtZW50IHwgbGlua3NcclxuXHQgKiBAcmV0dXJuIHZvaWRcclxuXHQgKi9cclxuXHRiaW5kRXZlbnRMaXN0ZW5lcnMobGlua3MpIFxyXG5cdHtcclxuXHRcdGxldCBpbnN0YW5jZSA9IHRoaXM7XHJcblxyXG5cdFx0dGhpcy5uZXh0LmNoaWxkTm9kZXNbMF0ub25jbGljayA9IGZ1bmN0aW9uKGUpIHtcclxuXHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuXHRcdFx0bGV0IHJlcXVlc3RlZFBhZ2UgPSBpbnN0YW5jZS5jdXJyZW50KzE7XHJcblxyXG5cdFx0XHRpZiAoaW5zdGFuY2Uubm90SW5QYWdlUmFuZ2UocmVxdWVzdGVkUGFnZSkpIHtcclxuXHRcdFx0XHR0aHJvdyBuZXcgTm90SW5QYWdlUmFuZ2VFeGNlcHRpb24oJ1RoZSBwYWdlIHlvdSByZXF1ZXN0aW5nIGRvZXMgbm90IGV4aXN0cycpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRpZiAoUHJvZHVjdHMkMiAmJiBQcm9kdWN0cyQyLmJvb3RlZCkge1xyXG5cdFx0XHRcdFByb2R1Y3RzJDIubG9hZFByb2R1Y3RzKHJlcXVlc3RlZFBhZ2UpLnRoZW4oZnVuY3Rpb24ocHJvZHVjdHMpIHtcclxuXHRcdFx0XHRcdGluc3RhbmNlLnNldEN1cnJlbnQocmVxdWVzdGVkUGFnZSk7XHJcblx0XHRcdFx0fSk7XHJcblx0XHRcdH1cclxuXHRcdH07XHJcblxyXG5cdFx0dGhpcy5wcmV2aW91cy5jaGlsZE5vZGVzWzBdLm9uY2xpY2sgPSBmdW5jdGlvbihlKSB7XHJcblx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcclxuXHJcblx0XHRcdGxldCByZXF1ZXN0ZWRQYWdlID0gaW5zdGFuY2UuY3VycmVudC0xO1xyXG5cclxuXHRcdFx0aWYoaW5zdGFuY2Uubm90SW5QYWdlUmFuZ2UocmVxdWVzdGVkUGFnZSkpIHtcclxuXHRcdFx0XHR0aHJvdyBuZXcgTm90SW5QYWdlUmFuZ2VFeGNlcHRpb24oJ1RoZSBwYWdlIHlvdSByZXF1ZXN0aW5nIGRvZXMgbm90IGV4aXN0cycpO1xyXG5cdFx0XHR9XHJcblx0XHRcdFxyXG5cdFx0XHRpZiAoUHJvZHVjdHMkMiAmJiBQcm9kdWN0cyQyLmJvb3RlZCkge1xyXG5cdFx0XHRcdFByb2R1Y3RzJDIubG9hZFByb2R1Y3RzKHJlcXVlc3RlZFBhZ2UpLnRoZW4oZnVuY3Rpb24ocHJvZHVjdHMpIHtcclxuXHRcdFx0XHRcdGluc3RhbmNlLnNldEN1cnJlbnQocmVxdWVzdGVkUGFnZSk7XHJcblx0XHRcdFx0fSk7XHJcblx0XHRcdH1cclxuXHRcdH07XHJcblxyXG5cdFx0Zm9yKHZhciBpID0gMDsgaSA8IHRoaXMucGFnZXMubGVuZ3RoOyBpKyspIHtcclxuXHRcdFx0dGhpcy5wYWdlc1tpXS5jaGlsZE5vZGVzWzBdLm9uY2xpY2sgPSBmdW5jdGlvbihlKSB7XHJcblx0XHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdFx0XHRcdFxyXG5cdFx0XHRcdGxldCByZXF1ZXN0ZWRQYWdlID0gdGhpcy5nZXRBdHRyaWJ1dGUoJ2RhdGEtcGFnZS1ucicpO1xyXG5cdFx0XHRcdFxyXG5cdFx0XHRcdGlmIChQcm9kdWN0cyQyICYmIFByb2R1Y3RzJDIuYm9vdGVkKSB7XHJcblx0XHRcdFx0XHRQcm9kdWN0cyQyLmxvYWRQcm9kdWN0cyhyZXF1ZXN0ZWRQYWdlKS50aGVuKGZ1bmN0aW9uKHByb2R1Y3RzKSB7XHJcblx0XHRcdFx0XHRcdGluc3RhbmNlLnNldEN1cnJlbnQocmVxdWVzdGVkUGFnZSk7XHJcblx0XHRcdFx0XHR9KTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH07XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBTZXRzIHRoZSBjdXJyZW50IHBhZ2UuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gbnVtYmVyIHwgcGFnZU51bWJlclxyXG5cdCAqIEByZXR1cm4gdm9pZFxyXG5cdCAqL1xyXG5cdHNldEN1cnJlbnQocGFnZU51bWJlcikgXHJcblx0e1xyXG5cdFx0dGhpcy5jdXJyZW50ID0gcGFyc2VJbnQocGFnZU51bWJlcik7XHJcblx0XHR0aGlzLmNoYW5nZVVybChwYWdlTnVtYmVyKTtcclxuXHRcdHRoaXMuc2V0QWN0aXZlTGluayhwYWdlTnVtYmVyKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEdldHMgdGhlIGN1cnJlbnQgcGFnZS5cclxuXHQgKlxyXG5cdCAqIEByZXR1cm4gbnVtYmVyXHJcblx0ICovXHJcblx0Z2V0Q3VycmVudCgpIFxyXG5cdHtcclxuXHRcdHJldHVybiB0aGlzLmN1cnJlbnQ7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBDcmVhdGVzIHRoZSBwYWdpbmF0aW9uIGxpbmtzLlxyXG5cdCAqXHJcblx0ICogQHJldHVybiBIVE1MVUxpc3RFbGVtZW50XHJcblx0ICovXHJcblx0Y3JlYXRlTGlua3MoKSBcclxuXHR7XHJcblx0XHRsZXQgdWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd1bCcpO1xyXG5cdFx0XHJcblx0XHR0aGlzLnBhZ2VzID0gdGhpcy5jcmVhdGVQYWdlTGlua3MoKTtcclxuXHRcdHRoaXMucHJldmlvdXMgPSB0aGlzLmNyZWF0ZVByZXZpb3VzQnV0dG9uKCk7XHJcblx0XHR0aGlzLm5leHQgPSB0aGlzLmNyZWF0ZU5leHRCdXR0b24oKTtcclxuXHJcblx0XHR1bC5jbGFzc05hbWUgPSAncGFnaW5hdGlvbic7XHJcblx0XHR1bC5hcHBlbmRDaGlsZCh0aGlzLnByZXZpb3VzKTtcclxuXHJcblx0XHR0aGlzLnBhZ2VzLmZvckVhY2goZnVuY3Rpb24ocGFnZSkge1xyXG5cdFx0XHR1bC5hcHBlbmRDaGlsZChwYWdlKTtcclxuXHRcdH0pO1xyXG5cclxuXHRcdHVsLmFwcGVuZENoaWxkKHRoaXMubmV4dCk7XHJcblxyXG5cdFx0cmV0dXJuIHVsO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQ3JlYXRlcyB0aGUgcGFnZXMgaXRlbSBsaW5rcy5cclxuXHQgKlxyXG5cdCAqIEByZXR1cm4gYXJyYXk8SFRNTExJRWxlbWVudD5cclxuXHQgKi9cclxuXHRjcmVhdGVQYWdlTGlua3MoKSBcclxuXHR7XHJcblx0XHR2YXIgcGFnZXMgPSBbXTtcclxuXHJcblx0XHRmb3IodmFyIGkgPSAxOyBpIDw9IHRoaXMudG90YWxQYWdlczsgaSsrKSB7XHJcblx0XHRcdHZhciBwYWdlSXRlbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJyk7XHJcblx0XHRcdHZhciBsaW5rID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpO1xyXG5cdFx0XHRwYWdlSXRlbS5jbGFzc05hbWUgPSAodGhpcy5jdXJyZW50ID09IGkpID8gJ3BhZ2UtaXRlbSBhY3RpdmUnIDogJ3BhZ2UtaXRlbSc7XHJcblx0XHRcdGxpbmsuY2xhc3NOYW1lID0gJ3BhZ2UtbGluayc7XHJcblx0XHRcdGxpbmsuc2V0QXR0cmlidXRlKCdocmVmJywgJz9wYWdlPScrIGkpO1xyXG5cdFx0XHRsaW5rLnNldEF0dHJpYnV0ZSgnZGF0YS1wYWdlLW5yJywgaSk7XHJcblx0XHRcdGxpbmsuaW5uZXJIVE1MID0gaTtcclxuXHRcdFx0cGFnZUl0ZW0uYXBwZW5kQ2hpbGQobGluayk7XHJcblx0XHRcdHBhZ2VzLnB1c2gocGFnZUl0ZW0pO1xyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiBwYWdlcztcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIENyZWF0ZXMgdGhlIHByZXZpb3VzIGJ1dHRvbiBsaW5rLlxyXG5cdCAqXHJcblx0ICogQHJldHVybiBIVE1MTElFbGVtZW50XHJcblx0ICovXHJcblx0Y3JlYXRlUHJldmlvdXNCdXR0b24oKSBcclxuXHR7XHJcblx0XHR2YXIgbGkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaScpO1xyXG5cdFx0dmFyIGxpbmsgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJyk7XHJcblx0XHR2YXIgc3BhbjEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XHJcblx0XHR2YXIgc3BhbjIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XHJcblx0XHRcclxuXHRcdFxyXG5cdFx0bGkuY2xhc3NOYW1lID0gJ3BhZ2UtaXRlbSc7XHJcblx0XHRsaW5rLmNsYXNzTmFtZSA9ICdwYWdlLWxpbmsnO1xyXG5cdFx0c3BhbjIuY2xhc3NOYW1lID0gJ3NyLW9ubHknO1xyXG5cclxuXHRcdGxpbmsuc2V0QXR0cmlidXRlKCdocmVmJywgJycpO1xyXG5cdFx0bGluay5zZXRBdHRyaWJ1dGUoJ2FyaWEtbGFiZWwnLCAnUHJldmlvdXMnKTtcclxuXHRcdHNwYW4xLnNldEF0dHJpYnV0ZSgnYXJpYS1oaWRkZW4nLCAndHJ1ZScpO1xyXG5cclxuXHRcdHNwYW4xLmlubmVySFRNTCA9ICcmbGFxdW87JztcclxuXHRcdHNwYW4yLmlubmVySFRNTCA9ICdQcmV2aW91cyc7XHJcblxyXG5cdFx0bGluay5hcHBlbmRDaGlsZChzcGFuMSk7XHJcblx0XHRsaW5rLmFwcGVuZENoaWxkKHNwYW4yKTtcclxuXHRcdGxpLmFwcGVuZENoaWxkKGxpbmspO1xyXG5cclxuXHRcdHJldHVybiBsaTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIENyZWF0ZXMgdGhlIG5leHQgYnV0dG9uIGxpbmsuXHJcblx0ICpcclxuXHQgKiBAcmV0dXJuIEhUTUxMSUVsZW1lbnRcclxuXHQgKi9cclxuXHRjcmVhdGVOZXh0QnV0dG9uKCkgXHJcblx0e1xyXG5cdFx0dmFyIGxpID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKTtcclxuXHRcdHZhciBsaW5rID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpO1xyXG5cdFx0dmFyIHNwYW4xID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xyXG5cdFx0dmFyIHNwYW4yID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xyXG5cdFx0XHJcblx0XHRsaS5jbGFzc05hbWUgPSAncGFnZS1pdGVtJztcclxuXHRcdGxpbmsuY2xhc3NOYW1lID0gJ3BhZ2UtbGluayc7XHJcblx0XHRzcGFuMi5jbGFzc05hbWUgPSAnc3Itb25seSc7XHJcblxyXG5cdFx0bGluay5zZXRBdHRyaWJ1dGUoJ2hyZWYnLCAnJyk7XHJcblx0XHRsaW5rLnNldEF0dHJpYnV0ZSgnYXJpYS1sYWJlbCcsICdOZXh0Jyk7XHJcblx0XHRzcGFuMS5zZXRBdHRyaWJ1dGUoJ2FyaWEtaGlkZGVuJywgJ3RydWUnKTtcclxuXHJcblx0XHRzcGFuMS5pbm5lckhUTUwgPSAnJnJhcXVvOyc7XHJcblx0XHRzcGFuMi5pbm5lckhUTUwgPSAnTmV4dCc7XHJcblxyXG5cdFx0bGluay5hcHBlbmRDaGlsZChzcGFuMSk7XHJcblx0XHRsaW5rLmFwcGVuZENoaWxkKHNwYW4yKTtcclxuXHRcdGxpLmFwcGVuZENoaWxkKGxpbmspO1xyXG5cclxuXHRcdHJldHVybiBsaTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIENoZWNrcyBpZiB0aGUgZ2l2ZW4gcGFnZSBpcyBpbiByYW5nZS5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSBudW1iZXIgfCBwYWdlTnVtYmVyXHJcblx0ICogQHJldHVybiBib29sXHJcblx0ICovXHJcblx0bm90SW5QYWdlUmFuZ2UocGFnZU51bWJlcikgXHJcblx0e1xyXG5cdFx0cmV0dXJuIChwYWdlTnVtYmVyID4gdGhpcy50b3RhbFBhZ2VzIHx8IHBhZ2VOdW1iZXIgPD0gMCkgfHwgaXNOYU4ocGFnZU51bWJlcik7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBDaGFuZ2VzIHRoZSB1cmwgdG8gYSBnaXZlbiBwYWdlIG51bWJlci5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSBudW1iZXIgfCBwYWdlTnVtYmVyXHJcblx0ICogQHJldHVybiB2b2lkXHJcblx0ICovXHJcblx0Y2hhbmdlVXJsKHBhZ2VOdW1iZXIpIFxyXG5cdHtcclxuXHRcdFVybC5jaGFuZ2VQYXJhbWV0ZXIodGhpcy5zZXR0aW5ncy51cmxfcGFyYW1ldGVyLCBwYWdlTnVtYmVyLCB0aGlzLnNldHRpbmdzLnNlcGFyYXRvcik7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBTZXRzIHRoZSBhY3RpdmUgbGluay5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSBudW1iZXIgfCBwYWdlTnVtYmVyXHJcblx0ICogQHJldHVybiB2b2lkXHJcblx0ICovXHJcblx0c2V0QWN0aXZlTGluayhwYWdlTnVtYmVyKVxyXG5cdHtcclxuXHRcdGZvcih2YXIgcGFnZSBpbiB0aGlzLnBhZ2VzKSB7XHJcblx0XHRcdGlmICh0aGlzLnBhZ2VzW3BhZ2VdLmNoaWxkTm9kZXNbMF0uZ2V0QXR0cmlidXRlKCdkYXRhLXBhZ2UtbnInKSA9PSBwYWdlTnVtYmVyKSB7XHJcblx0XHRcdFx0RE9NLmFkZENsYXNzKHRoaXMucGFnZXNbcGFnZV0sICdhY3RpdmUnKTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRET00ucmVtb3ZlQ2xhc3ModGhpcy5wYWdlc1twYWdlXSwgJ2FjdGl2ZScpO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBSZXNldHMgdGhlIHBhZ2luYXRpb24uXHJcblx0ICpcclxuXHQgKiBAcmV0dXJuIHZvaWRcclxuXHQgKi9cclxuXHRyZXNldCgpIFxyXG5cdHtcclxuXHRcdHRoaXMuc2V0Q3VycmVudCgxKTtcclxuXHRcdHRoaXMuY2hhbmdlVXJsKDEpO1xyXG5cdH1cclxufVxuXG5sZXQgZGVmYXVsdE1lc3NhZ2UkNSA9ICdJbiBvcmRlciB0byB1c2UgY29tcG9uZW50cyB5b3UgbXVzdCByZWdpc3RlciB0aGVtIHdpdGggdGhlIHNob3AhJzsgXHJcblxyXG5jbGFzcyBDb21wb25lbnROb3RSZWdpc3RlcmVkRXhjZXB0aW9uIGV4dGVuZHMgRXhjZXB0aW9uSGFuZGxlclxyXG57XHJcblx0Y29uc3RydWN0b3IobWVzc2FnZSA9IG51bGwpIFxyXG5cdHtcclxuXHRcdG1lc3NhZ2UgPSBtZXNzYWdlIHx8IGRlZmF1bHRNZXNzYWdlJDU7XHJcblx0XHRzdXBlcihtZXNzYWdlKTtcclxuICAgIFx0c3VwZXIuc3RhY2tUcmFjZSh0aGlzLCBtZXNzYWdlKTtcclxuICAgIH1cclxufVxuXG4vLyBDb21wb25lbnRzXHJcbi8vIEhlbHBlcnNcclxuLy8gRXhjZXB0aW9uc1xyXG5jbGFzcyBDb21wb25lbnRzUHJvdmlkZXJcclxue1xyXG5cdC8qKlxyXG5cdCAqIC0gU2V0IHRoZSBjb250YWluZXIgYXMgYSBtZW1iZXIuXHJcblx0ICogLSBkZWNsYXJlIHRoZSBjb21wb25lbnRzLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIFxcQ29yZVxcQ29udGFpbmVyIHwgY29udGFpbmVyXHJcblx0ICogQHJldHVybiB2b2lkXHJcblx0ICovXHJcblx0Y29uc3RydWN0b3IoY29udGFpbmVyKVxyXG5cdHtcclxuXHRcdHRoaXMuY29udGFpbmVyID0gY29udGFpbmVyO1xyXG5cclxuXHRcdHRoaXMuY29tcG9uZW50cyA9IHt9O1xyXG5cdFx0dGhpcy5jb21wb25lbnRzLkZpbHRlciA9IHt9O1xyXG5cdFx0dGhpcy5jb21wb25lbnRzLlNlcnZpY2VzID0ge307XHJcblx0XHR0aGlzLmNvbXBvbmVudHMuUHJvZHVjdHMgPSB7fTtcclxuXHRcdHRoaXMuY29tcG9uZW50cy5QYWdpbmF0aW9uID0ge307XHJcblx0XHR0aGlzLmNvbXBvbmVudHMuQ2FydCA9IHt9O1xyXG5cdFx0dGhpcy5jb21wb25lbnRzLkNoZWNrb3V0ID0ge307XHJcblx0fVxyXG5cclxuICAgLyoqXHJcblx0KiBSZWdpc3RlcnMgdGhlIGNvbXBvbmVudHMuXHJcblx0KlxyXG5cdCogQHBhcmFtIG9iamVjdCB8IGNvbXBvbmVudHNcclxuXHQqIEByZXR1cm4gdm9pZFxyXG5cdCovXHJcblx0cmVnaXN0ZXIoY29tcG9uZW50cylcclxuXHR7XHJcblx0XHR0aGlzLmF2YWlsYWJsZSA9IGNvbXBvbmVudHM7XHJcblx0XHR0aGlzLmJvb3RlZCA9IFtdO1xyXG5cdCBcdHRoaXMuY29tcG9uZW50cy5GaWx0ZXIuYm9vdGVkID0gZmFsc2U7XHJcblx0XHR0aGlzLmNvbXBvbmVudHMuU2VydmljZXMuYm9vdGVkID0gZmFsc2U7XHJcblx0XHR0aGlzLmNvbXBvbmVudHMuUHJvZHVjdHMuYm9vdGVkID0gZmFsc2U7XHJcblx0XHR0aGlzLmNvbXBvbmVudHMuUGFnaW5hdGlvbi5ib290ZWQgPSBmYWxzZTtcclxuXHRcdHRoaXMuY29tcG9uZW50cy5DYXJ0LmJvb3RlZCA9IGZhbHNlO1xyXG5cdFx0dGhpcy5jb21wb25lbnRzLkNoZWNrb3V0LmJvb3RlZCA9IGZhbHNlO1xyXG5cclxuXHRcdGxldCBpbnN0YW5jZSA9IHRoaXM7XHJcblxyXG5cdFx0dGhpcy5jb250YWluZXIuYmluZCgnRmlsdGVyJywgZnVuY3Rpb24oY29udGFpbmVyLCBjb21wb25lbnQpIHtcclxuXHRcdFx0aW5zdGFuY2UuY29tcG9uZW50c1tjb21wb25lbnRdID0gbmV3IEZpbHRlcihjb250YWluZXIpO1xyXG5cdFx0XHRpbnN0YW5jZS5jb21wb25lbnRzW2NvbXBvbmVudF0uYm9vdGVkID0gdHJ1ZTtcclxuXHRcdFx0aW5zdGFuY2UuYm9vdGVkLnB1c2goaW5zdGFuY2UuY29tcG9uZW50c1tjb21wb25lbnRdKTtcclxuXHRcdFx0cmV0dXJuIGluc3RhbmNlLmNvbXBvbmVudHNbY29tcG9uZW50XTtcclxuXHRcdH0sICdjb21wb25lbnRzJyk7XHJcblx0XHRcclxuXHRcdHRoaXMuY29udGFpbmVyLmJpbmQoJ1NlcnZpY2VzJywgZnVuY3Rpb24oY29udGFpbmVyLCBjb21wb25lbnQpIHsgXHJcblx0XHRcdGluc3RhbmNlLmNvbXBvbmVudHNbY29tcG9uZW50XSA9IG5ldyBTZXJ2aWNlcyhjb250YWluZXIpO1xyXG5cdFx0XHRpbnN0YW5jZS5jb21wb25lbnRzW2NvbXBvbmVudF0uYm9vdGVkID0gdHJ1ZTtcclxuXHRcdFx0aW5zdGFuY2UuYm9vdGVkLnB1c2goaW5zdGFuY2UuY29tcG9uZW50c1tjb21wb25lbnRdKTtcclxuXHRcdFx0cmV0dXJuIGluc3RhbmNlLmNvbXBvbmVudHNbY29tcG9uZW50XTtcclxuXHRcdH0sICdjb21wb25lbnRzJyk7XHJcblxyXG5cdFx0dGhpcy5jb250YWluZXIuYmluZCgnUHJvZHVjdHMnLCBmdW5jdGlvbihjb250YWluZXIsIGNvbXBvbmVudCkge1xyXG5cdFx0XHRpbnN0YW5jZS5jb21wb25lbnRzW2NvbXBvbmVudF0gPSBuZXcgUHJvZHVjdHMoY29udGFpbmVyLCBjb250YWluZXIuUmVxdWVzdCwgY29udGFpbmVyLkV2ZW50cyk7XHJcblx0XHRcdGluc3RhbmNlLmNvbXBvbmVudHNbY29tcG9uZW50XS5ib290ZWQgPSB0cnVlO1xyXG5cdFx0XHRpbnN0YW5jZS5ib290ZWQucHVzaChpbnN0YW5jZS5jb21wb25lbnRzW2NvbXBvbmVudF0pO1xyXG5cdFx0XHRyZXR1cm4gaW5zdGFuY2UuY29tcG9uZW50c1tjb21wb25lbnRdO1xyXG5cdFx0fSwgJ2NvbXBvbmVudHMnKTtcclxuXHJcblx0XHR0aGlzLmNvbnRhaW5lci5iaW5kKCdQYWdpbmF0aW9uJywgZnVuY3Rpb24oY29udGFpbmVyLCBjb21wb25lbnQpIHtcclxuXHRcdFx0bGV0IHByb2R1Y3RzID0gKGluc3RhbmNlLmV4aXN0cygnUHJvZHVjdHMnKSkgPyAoaW5zdGFuY2UuY29tcG9uZW50c1snUHJvZHVjdHMnXSkgOiBudWxsOyBcclxuXHRcdFx0bGV0IHNlcnZpY2VzID0gKGluc3RhbmNlLmV4aXN0cygnU2VydmljZXMnKSkgPyAoaW5zdGFuY2UuY29tcG9uZW50c1snU2VydmljZXMnXSkgOiBudWxsOyBcclxuXHRcdFx0aW5zdGFuY2UuY29tcG9uZW50c1tjb21wb25lbnRdID0gbmV3IFBhZ2luYXRpb24oY29udGFpbmVyLCBjb250YWluZXIuRXZlbnRzLCBwcm9kdWN0cywgc2VydmljZXMpO1xyXG5cdFx0XHRpbnN0YW5jZS5jb21wb25lbnRzW2NvbXBvbmVudF0uYm9vdGVkID0gdHJ1ZTtcclxuXHRcdFx0aW5zdGFuY2UuYm9vdGVkLnB1c2goaW5zdGFuY2UuY29tcG9uZW50c1tjb21wb25lbnRdKTtcclxuXHRcdFx0cmV0dXJuIGluc3RhbmNlLmNvbXBvbmVudHNbY29tcG9uZW50XTtcclxuXHRcdH0sICdjb21wb25lbnRzJyk7XHJcblxyXG5cdFx0dGhpcy5jb250YWluZXIuYmluZCgnQ2FydCcsIGZ1bmN0aW9uKGNvbnRhaW5lciwgY29tcG9uZW50KSB7XHJcblx0XHRcdGluc3RhbmNlLmNvbXBvbmVudHNbY29tcG9uZW50XSA9IG5ldyBDYXJ0KGNvbnRhaW5lciwgY29udGFpbmVyLlJlcXVlc3QsIGNvbnRhaW5lci5FdmVudHMpO1xyXG5cdFx0XHRpbnN0YW5jZS5jb21wb25lbnRzW2NvbXBvbmVudF0uYm9vdGVkID0gdHJ1ZTtcclxuXHRcdFx0aW5zdGFuY2UuYm9vdGVkLnB1c2goaW5zdGFuY2UuY29tcG9uZW50c1tjb21wb25lbnRdKTtcclxuXHRcdFx0cmV0dXJuIGluc3RhbmNlLmNvbXBvbmVudHNbY29tcG9uZW50XTtcclxuXHRcdH0sICdjb21wb25lbnRzJyk7XHJcblxyXG5cdFx0dGhpcy5jb250YWluZXIuYmluZCgnQ2hlY2tvdXQnLCBmdW5jdGlvbihjb250YWluZXIsIGNvbXBvbmVudCkge1xyXG5cdFx0XHRpbnN0YW5jZS5jb21wb25lbnRzW2NvbXBvbmVudF0gPSBuZXcgQ2hlY2tvdXQoY29udGFpbmVyLCBjb250YWluZXIuUmVxdWVzdCwgY29udGFpbmVyLkV2ZW50cyk7XHJcblx0XHRcdGluc3RhbmNlLmNvbXBvbmVudHNbY29tcG9uZW50XS5ib290ZWQgPSB0cnVlO1xyXG5cdFx0XHRpbnN0YW5jZS5ib290ZWQucHVzaChpbnN0YW5jZS5jb21wb25lbnRzW2NvbXBvbmVudF0pO1xyXG5cdFx0XHRyZXR1cm4gaW5zdGFuY2UuY29tcG9uZW50c1tjb21wb25lbnRdO1xyXG5cdFx0fSwgJ2NvbXBvbmVudHMnKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFByb3ZpZGUgYSByZWdpc3RlcmVkIGNvbXBvbmVudC5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSBzdHJpbmcgfCBjb21wb25lbnRcclxuXHQgKiBAcmV0dXJuIG9iamVjdFxyXG5cdCAqL1xyXG5cdHByb3ZpZGUoY29tcG9uZW50KVxyXG5cdHtcclxuXHRcdGlmIChDb21tb24uaW5fYXJyYXkoY29tcG9uZW50LCB0aGlzLmF2YWlsYWJsZSkpIHtcclxuXHRcdFx0cmV0dXJuIHRoaXMuY29udGFpbmVyLm1ha2UoY29tcG9uZW50KTtcclxuXHRcdH1cclxuXHJcblx0XHR0aHJvdyBuZXcgQ29tcG9uZW50Tm90UmVnaXN0ZXJlZEV4Y2VwdGlvbignY29tcG9uZW50cyBtdXN0IGJlIHJlZ2lzdGVyZWQgaW4gb3JkZXIgdG8gdXNlIHRoZW0uJyk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBDaGVja3MgaWYgY29tcG9uZW50IGV4aXN0cy5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSBzdHJpbmcgfCBuYW1lXHJcblx0ICogQHJldHVybiBib29sXHJcblx0ICovXHJcblx0ZXhpc3RzKG5hbWUpXHJcblx0e1xyXG5cdFx0cmV0dXJuIHRoaXMuY29tcG9uZW50cy5oYXNPd25Qcm9wZXJ0eShuYW1lKTtcclxuXHR9XHJcbn1cblxubGV0IGRlZmF1bHRNZXNzYWdlJDYgPSAnVHJ5aW5nIHRvIGJpbmQgYW4gYWxyZWFkeSBleGlzdGluZyBib3VuZC4nO1xyXG5cclxuY2xhc3MgSW52YWxpZEJpbmRpbmdFeGNlcHRpb24gZXh0ZW5kcyBFeGNlcHRpb25IYW5kbGVyXHJcbntcclxuXHRjb25zdHJ1Y3RvcihtZXNzYWdlID0gbnVsbCkgXHJcblx0e1xyXG5cdFx0bWVzc2FnZSA9IG1lc3NhZ2UgfHwgZGVmYXVsdE1lc3NhZ2UkNjtcclxuXHRcdHN1cGVyKG1lc3NhZ2UpO1xyXG4gICAgXHRzdXBlci5zdGFja1RyYWNlKHRoaXMsIG1lc3NhZ2UpO1xyXG4gICAgfVxyXG59XG5cbi8vIEhlbHBlcnNcclxuLy8gQ29yZVxyXG4vLyBFeGNlcHRpb25zXHJcbi8qKlxyXG4gKiBAZmlsZSBcclxuICogQ29udGFpbmVyIGNsYXNzLlxyXG4gKlxyXG4gKiBIYW5kbGVzL0NvbnRyb2xzIHRoZSBkZXBlbmRlbmNpZXMgb2YgZWNvbW1lcmNlLlxyXG4gKi9cclxuXHJcbmNsYXNzIENvbnRhaW5lciQ1IFxyXG57XHJcblx0LyoqXHJcblx0ICogLSBJbml0aWFsaXplIGluc3RhbmNlcyBtZW1iZXIuXHJcblx0ICogLSBSZWdpc3RlciBiaW5kaW5ncy5cclxuXHQgKlxyXG5cdCAqIEByZXR1cm4gdm9pZFxyXG5cdCAqL1xyXG5cdGNvbnN0cnVjdG9yKClcclxuXHR7XHJcblx0XHR0aGlzLmluc3RhbmNlcyA9IFtdO1xyXG5cdFx0dGhpcy5yZWdpc3RlcigpO1xyXG5cdFx0dGhpcy5yZWdpc3RlclByb3ZpZGVycygpO1xyXG5cdFx0dGhpcy5yZWdpc3RlclJvdXRlcigpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQmluZHMga2V5IHRvIGNvbmNyZXRlIGNsYXNzLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIHN0cmluZyB8IGtleVxyXG5cdCAqIEBwYXJhbSBjbGFzcyB8IGNvbmNyZXRlXHJcblx0ICogQHJldHVybiB2b2lkXHJcblx0ICovXHJcblx0YmluZChrZXksIGNvbmNyZXRlLCBuYW1lc3BhY2UgPSBudWxsKSBcclxuXHR7XHJcblx0XHRpZiAodHlwZW9mIGtleSAhPSAnc3RyaW5nJykge1xyXG5cdFx0XHR0aHJvdyBuZXcgSW52YWxpZEFyZ3VtZW50RXhjZXB0aW9uJDEoJ2JpbmQoKSBleHBlY3RzIHRoZSBmaXJzdCBwYXJhbWV0ZXIgdG8gYmUgc3RyaW5nLCBidXQgJyArIHR5cGVvZiBrZXkgKyAnIHdhcyBwYXNzZWQgaW5zdGVhZC4nKTtcclxuXHRcdH1cclxuXHJcblx0XHRpZiAodHlwZW9mIGNvbmNyZXRlICE9ICdmdW5jdGlvbicpIHsgXHJcblx0XHRcdHRocm93IG5ldyBJbnZhbGlkQXJndW1lbnRFeGNlcHRpb24kMSgnYmluZCgpIGV4cGVjdHMgdGhlIHNlY29uZCBwYXJhbWV0ZXIgdG8gYmUgYSBmdW5jdGlvbiwgYnV0ICcgKyB0eXBlb2YgY29uY3JldGUgKyAnIHdhcyBwYXNzZWQgaW5zdGVhZC4nKTtcclxuXHRcdH1cclxuXHJcblx0XHRpZiAobmFtZXNwYWNlKSB7XHJcblx0XHRcdGlmICh0eXBlb2YgdGhpc1tuYW1lc3BhY2VdID09ICd1bmRlZmluZWQnKSB7XHJcblx0XHRcdFx0dGhpc1tuYW1lc3BhY2VdID0ge307XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHRoaXNbbmFtZXNwYWNlXVtrZXldID0gY29uY3JldGUuYmluZChjb25jcmV0ZSwgdGhpcywga2V5KTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdHRoaXNba2V5XSA9IGNvbmNyZXRlLmJpbmQoY29uY3JldGUsIHRoaXMsIGtleSk7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBTZXRzIGFuIGluc3RhbmNlLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIHN0cmluZyB8IGtleVxyXG5cdCAqIEBwYXJhbSBvYmplY3QgfCBpbnN0YW5jZVxyXG5cdCAqIEBwYXJhbSBzdHJpbmcgfCBhbGlhc1xyXG5cdCAqIEByZXR1cm4gdm9pZFxyXG5cdCAqL1xyXG5cdHNldEluc3RhbmNlKGtleSwgaW5zdGFuY2UsIGFsaWFzID0gbnVsbCkgXHJcblx0e1xyXG5cdFx0aWYgKHR5cGVvZiBrZXkgIT0gJ3N0cmluZycpIHtcclxuXHRcdFx0dGhyb3cgbmV3IEludmFsaWRBcmd1bWVudEV4Y2VwdGlvbiQxKCdzZXRJbnN0YWNlKCkgZXhwZWN0cyB0aGUgZmlyc3QgcGFyYW1ldGVyIHRvIGJlIGEgc3RyaW5nLCBidXQgJyArIHR5cGVvZiBrZXkgKyAnIHdhcyBwYXNzZWQgaW5zdGVhZC4nKTtcclxuXHRcdH1cclxuXHJcblx0XHRpZiAodHlwZW9mIGluc3RhbmNlICE9ICdvYmplY3QnKSB7XHJcblx0XHRcdHRocm93IG5ldyBJbnZhbGlkQXJndW1lbnRFeGNlcHRpb24kMSgnc2V0SW5zdGFuY2UoKSBleHBlY3RzIHRoZSBzZWNvbmQgcGFyYW1ldGVyIHRvIGJlIGFuIG9iamVjdCwgYnV0ICcgKyB0eXBlb2YgaW5zdGFuY2UgKyAnIHdhcyBwYXNzZWQgaW5zdGVhZC4nKTtcclxuXHRcdH1cclxuXHJcblx0XHR0aGlzLmluc3RhbmNlc1trZXldID0gaW5zdGFuY2U7XHJcblx0XHR0aGlzW2tleV0gPSBpbnN0YW5jZTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFJlc29sdmVzIGFuIGluc3RhbmNlIG91dCBvZiBcclxuXHQgKiB0aGUgaW9jIGNvbnRhaW5lci5cclxuXHQgKiBcclxuXHQgKiBAcGFyYW0gc3RyaW5nIHwga2V5XHJcblx0ICogQHJldHVybiBvYmplY3RcclxuXHQgKi9cclxuXHRnZXRJbnN0YW5jZShrZXkpIFxyXG5cdHtcclxuXHRcdGlmICh0eXBlb2Yga2V5ICE9ICdzdHJpbmcnICYmIHR5cGVvZiBrZXkgIT0gJ29iamVjdCcpIHtcclxuXHRcdFx0dGhyb3cgbmV3IEludmFsaWRBcmd1bWVudEV4Y2VwdGlvbiQxKCdnZXRJbnN0YWNlKCkgZXhwZWN0cyB0aGUgZmlyc3QgcGFyYW1ldGVyIHRvIGJlIGEgc3RyaW5nLCBidXQgJyArIHR5cGVvZiBrZXkgKyAnIHdhcyBwYXNzZWQgaW5zdGVhZC4nKTtcclxuXHRcdH1cclxuXHJcblx0XHRpZiAodHlwZW9mIGtleSA9PSAnb2JqZWN0Jykge1xyXG5cdFx0XHRyZXR1cm4gdGhpcy5pbnN0YW5jZXNba2V5LmNvbnN0cnVjdG9yLm5hbWVdIHx8IG51bGw7XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIHRoaXMuaW5zdGFuY2VzW2tleV0gfHwgbnVsbDtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIENoZWNrcyBpZiBhbiBpbnN0YW5jZSBleGlzdC5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSBtaXhlZCB8IGluc3RhbmNlXHJcblx0ICogQHJldHVybiBib29sXHJcblx0ICovXHJcblx0aW5zdGFuY2VFeGlzdChpbnN0YW5jZSkgXHJcblx0e1xyXG5cdFx0aWYgKHR5cGVvZiBpbnN0YW5jZSA9PSAnb2JqZWN0JyB8fCB0eXBlb2YgaW5zdGFuY2UgPT0gJ3N5bWJvbCcpIHtcclxuXHRcdFx0cmV0dXJuICh0eXBlb2YgdGhpcy5pbnN0YW5jZXNbaW5zdGFuY2UuY29uc3RydWN0b3IubmFtZV0gIT09ICd1bmRlZmluZWQnKTtcclxuXHRcdH0gZWxzZSBpZiAodHlwZW9mIGluc3RhbmNlID09ICdzdHJpbmcnKSB7XHJcblx0XHRcdHJldHVybiAodHlwZW9mIHRoaXMuaW5zdGFuY2VzW2luc3RhbmNlXSAhPT0gJ3VuZGVmaW5lZCcpXHJcblx0XHR9XHJcblx0XHRcclxuXHRcdHRocm93IG5ldyBJbnZhbGlkQXJndW1lbnRFeGNlcHRpb24kMSgnaW5zdGFuY2VFeGlzdCgpIGV4cGVjdHMgdGhlIGZpcnN0IHBhcmFtZXRlciB0byBiZSBzdHJpbmcgb3IgYW4gb2JqZWN0LCBidXQgJyArIHR5cGVvZiBpbnN0YW5jZSArICcgd2FzIHBhc3NlZCBpbnN0ZWFkLicpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogUmV0cmlldmUgYW4gb2JqZWN0LCBpZiBub3QgZXhpc3RzXHJcblx0ICogd2lsbCBjcmVhdGUgaXQsIHNldCBpdCBpbiB0aGUgaW9jIGNvbnRhaW5lclxyXG5cdCAqIGZvciBsYXRlciB1c2UgYW5kIHJldHJpZXZlIGl0LlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIG1peGVkIHwgb2JqZWN0IFxyXG5cdCAqIEByZXR1cm4gb2JqZWN0XHJcblx0ICovXHJcblx0bWFrZShvYmplY3QpXHJcblx0e1xyXG5cdFx0bGV0IGluc3RhbmNlID0ge307XHJcblx0XHRsZXQga2V5O1xyXG5cdFx0XHJcblx0XHRpZiAodGhpcy5pbnN0YW5jZUV4aXN0KG9iamVjdCkpIHtcclxuXHRcdFx0cmV0dXJuIHRoaXMuZ2V0SW5zdGFuY2Uob2JqZWN0KTtcclxuXHRcdH1cclxuXHJcblx0XHRpZiAodHlwZW9mIG9iamVjdCA9PSAnb2JqZWN0Jykge1xyXG5cdFx0XHRpbnN0YW5jZSA9IG9iamVjdDtcclxuXHRcdFx0a2V5ID0gb2JqZWN0LmNvbnN0cnVjdG9yLm5hbWU7XHJcblx0XHRcdHRoaXMuc2V0SW5zdGFuY2Uoa2V5LCBpbnN0YW5jZSk7IFxyXG5cdFx0fSBlbHNlIGlmICh0eXBlb2Ygb2JqZWN0ID09ICdzdHJpbmcnICYmIHRoaXMuaGFzT3duUHJvcGVydHkob2JqZWN0KSkge1xyXG5cdFx0XHRpbnN0YW5jZSA9IG5ldyB0aGlzW29iamVjdF07XHJcblx0XHRcdGtleSA9IG9iamVjdDtcclxuXHRcdFx0dGhpcy5zZXRJbnN0YW5jZShrZXksIGluc3RhbmNlKTtcdFxyXG5cdFx0fSBlbHNlIGlmICh0eXBlb2Ygb2JqZWN0ID09ICdzdHJpbmcnICYmIHRoaXMuQ29tcG9uZW50cy5leGlzdHMob2JqZWN0KSkge1xyXG5cdFx0XHRpbnN0YW5jZSA9IG5ldyB0aGlzLmNvbXBvbmVudHNbb2JqZWN0XTtcclxuXHRcdFx0a2V5ID0gb2JqZWN0O1xyXG5cdFx0XHR0aGlzLnNldEluc3RhbmNlKGtleSwgaW5zdGFuY2UpO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0dGhyb3cgbmV3IEludmFsaWRCaW5kaW5nRXhjZXB0aW9uKCdDb250YWluZXIubWFrZSgpIGNvdWxkIG5vdCBjcmVhdGUgdGhlIG9iamVjdCEnKTtcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gaW5zdGFuY2U7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBSZW1vdmUgYWxsIGV4aXN0aW5nIGluc3RhbmNlcy5cclxuXHQgKlxyXG5cdCAqIEByZXR1cm4gdm9pZCBcclxuXHQgKi9cclxuXHRmbHVzaCgpXHJcblx0e1xyXG5cdFx0dGhpcy5pbnN0YW5jZXMgPSBbXTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFJlZ2lzdGVycyB0aGUgZGVwZW5kZWNpZXMuXHJcblx0ICpcclxuXHQgKiBAcmV0dXJuIHZvaWQgXHJcblx0ICovXHJcblx0cmVnaXN0ZXIoKVxyXG5cdHtcclxuXHRcdHRoaXMuc2V0SW5zdGFuY2UoJ1JlcXVlc3QnLCBuZXcgUmVxdWVzdCk7XHJcblx0XHR0aGlzLnNldEluc3RhbmNlKCdFdmVudHMnLCBuZXcgRXZlbnRNYW5hZ2VyKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFJlZ2lzdGVycyB0aGUgcHJvdmlkZXJzLlxyXG5cdCAqXHJcblx0ICogQHJldHVybiB2b2lkIFxyXG5cdCAqL1xyXG5cdHJlZ2lzdGVyUHJvdmlkZXJzKClcclxuXHR7XHJcblx0XHR0aGlzLnNldEluc3RhbmNlKCdDb21wb25lbnRzJywgbmV3IENvbXBvbmVudHNQcm92aWRlcih0aGlzKSk7XHJcblx0fVxyXG5cclxuXHRyZWdpc3RlclJvdXRlcigpXHJcblx0e1xyXG5cdFx0dGhpcy5zZXRJbnN0YW5jZSgnUm91dGVyJywgbmV3IFJvdXRlcih0aGlzKSk7XHJcblx0fVxyXG59XG5cbi8vIEhlbHBlcnNcclxuLy8gQ29yZVxyXG4vLyBFeGNlcHRpb25zXHJcbi8qKlxyXG4gKiBTdG9yZXMgdGhlIGRlZmF1bHQgc2V0dGluZ3MuXHJcbiAqXHJcbiAqIEB2YXIgb2JqZWN0XHJcbiAqL1xyXG5sZXQgZGVmYXVsdFNldHRpbmdzJDYgPSB7XHJcblx0ZGVidWdfbGV2ZWw6ICdlcnJvcicsXHJcblx0ZWxlbWVudDogJ2JvZHknLFxyXG5cdGluamVjdF9saWJyYXJpZXM6IFtdLFxyXG5cdGNvbXBvbmVudHM6IFsnUHJvZHVjdHMnLCAnU2VydmljZXMnLCAnRmlsdGVyJywgJ1BhZ2luYXRpb24nLCAnQ2FydCddLFxyXG5cdGxvYWRpbmdfYW5pbWF0aW9uOiB0cnVlLFxyXG5cdGhhc2hfbmF2aWdhdGlvbjogZmFsc2UsXHJcbn07XHJcblxyXG4vKipcclxuICogU3RvcmVzIHRoZSBvcHRpb25hbCwgXHJcbiAqIGluamVjdGFibGUgZXh0ZXJuYWwgbGlicmFyaWVzIFxyXG4gKlxyXG4gKiBAdmFyIG9iamVjdFxyXG4gKi9cclxubGV0IGV4dGVybmFsTGlicmFyaWVzID0ge1xyXG5cdGJvb3RzdHJhcDogJ2h0dHBzOi8vbWF4Y2RuLmJvb3RzdHJhcGNkbi5jb20vYm9vdHN0cmFwLzMuMy43L2Nzcy9ib290c3RyYXAubWluLmNzcycsXHJcbn07XHJcblxyXG5jbGFzcyBUdXJib0Vjb21tZXJjZVxyXG57XHJcblx0LyoqXHJcblx0ICogVGhlIGVudGVyeSBmb3IgdGhlIHNob3AuXHJcblx0ICogLSBTZXR0aW5nIHRoZSBleGNlcHRpb24gaGFuZGxlci5cclxuXHQgKiAtIFNldHRpbmcgdGhlIGlvYyBjb250YWluZXIuXHJcblx0ICogLSBFeHRlbmRpbmcgdGhlIHVzZXIgc2V0dGluZ3MuXHJcblx0ICogLSBTZXR0aW5nIHRoZSBlbGVtZW50LlxyXG5cdCAqIC0gRGlzYWJsaW5nIGRlZmF1bHQgZXJyb3JzLlxyXG5cdCAqIC0gUGFzc2luZyBjYWxscyB2aWEgcHJveHkgdG8gdGhlIGNvbXBvbmVudHMuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gb2JqZWN0IHwgc2V0dGluZ3NcclxuXHQgKiBAcmV0dXJuIFByb3h5XHJcblx0ICovXHJcblx0Y29uc3RydWN0b3Ioc2V0dGluZ3MpXHJcblx0e1xyXG5cdFx0aWYgKHR5cGVvZiBzZXR0aW5ncyAhPSAnb2JqZWN0Jykge1xyXG5cdFx0XHR0aHJvdyBuZXcgSW52YWxpZEFyZ3VtZW50RXhjZXB0aW9uJDE7XHJcblx0XHR9XHJcblxyXG5cdFx0dGhpcy5zZXR0aW5ncyA9IENvbW1vbi5leHRlbmQoZGVmYXVsdFNldHRpbmdzJDYsIHNldHRpbmdzKTtcclxuXHJcblx0XHRFeGNlcHRpb25IYW5kbGVyLnNldERlYnVnTGV2ZWwgPSB0aGlzLnNldHRpbmdzLmRlYnVnX2xldmVsO1xyXG5cdFx0XHJcblx0XHR0aGlzLmxvYWRFeHRlcm5hbExpYnJhcmllcygpO1xyXG5cdFx0XHJcblx0XHR0aGlzLmNvbnRhaW5lciA9IG5ldyBDb250YWluZXIkNTtcclxuXHJcblx0XHR0aGlzLmNvbXBvbmVudHMgPSB0aGlzLmNvbnRhaW5lci5tYWtlKCdDb21wb25lbnRzJyk7XHJcblx0XHR0aGlzLmNvbXBvbmVudHMucmVnaXN0ZXIodGhpcy5zZXR0aW5ncy5jb21wb25lbnRzKTtcclxuXHJcblx0XHRkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgZnVuY3Rpb24oKSB7XHJcblx0XHRcdHRoaXMuc2V0RWxlbWVudCh0aGlzLnNldHRpbmdzLmVsZW1lbnQpO1xyXG5cclxuXHRcdFx0dGhpcy5jb250YWluZXIuUm91dGVyLnJlZ2lzdGVyKCk7XHJcblxyXG5cdFx0XHRpZiAodGhpcy5zZXR0aW5ncy5sb2FkaW5nX2FuaW1hdGlvbikge1xyXG5cdFx0XHRcdHN0YXJ0TG9hZGluZy5jYWxsKHRoaXMpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHR0aGlzLmFkZFN0eWxlVGFnKCk7XHJcblx0XHR9LmJpbmQodGhpcykpO1xyXG5cclxuXHRcdHJldHVybiBuZXcgUHJveHkodGhpcywge1xyXG5cdFx0XHRnZXQ6IGZ1bmN0aW9uKHNob3AsIHNvdXJjZSkge1xyXG5cdFx0XHRcdGlmIChzaG9wLmNvbXBvbmVudHMuZXhpc3RzKHNvdXJjZSkpIHtcclxuXHRcdFx0XHRcdHJldHVybiBzaG9wLmNvbXBvbmVudHMucHJvdmlkZShzb3VyY2UpO1xyXG5cdFx0XHRcdH0gXHJcblxyXG5cdFx0XHRcdGlmIChzaG9wLmNvbnRhaW5lci5pbnN0YW5jZUV4aXN0KHNvdXJjZSkpIHtcclxuXHRcdFx0XHRcdHJldHVybiBzaG9wLmNvbnRhaW5lci5nZXRJbnN0YW5jZShzb3VyY2UpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0fSk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBMb2FkcyB0aGUgZXh0ZXJuYWwgbGlicmFyaWVzIHdoaWNoIHdhcyBzcGVjaWZpZWQuXHJcblx0ICogXHJcblx0ICogQHJldHVybiB2b2lkXHJcblx0ICovXHJcblx0bG9hZEV4dGVybmFsTGlicmFyaWVzKClcclxuXHR7XHJcblx0XHRsZXQgaTtcclxuXHRcdGxldCBsaWJyYXJpZXMgPSB0aGlzLnNldHRpbmdzLmluamVjdF9saWJyYXJpZXM7XHJcblxyXG5cdFx0Zm9yIChpID0gMDsgaSA8IGxpYnJhcmllcy5sZW5ndGg7IGkrKykge1xyXG5cdFx0XHRpZiAoZXh0ZXJuYWxMaWJyYXJpZXMuaGFzT3duUHJvcGVydHkobGlicmFyaWVzW2ldKSkge1xyXG5cdFx0XHRcdGxldCBpZCA9ICdUdXJiby1lQ29tbWVyY2UtJyArIFN0ci51Y2ZpcnN0KGxpYnJhcmllc1tpXSk7XHJcblx0XHRcdFx0XHJcblx0XHRcdFx0aWYgKCEgRE9NLmZpbmQoaWQpKSB7XHJcblx0XHRcdFx0XHRET00uYWRkTGlua2VkU3R5bGUoaWQsIGV4dGVybmFsTGlicmFyaWVzW2xpYnJhcmllc1tpXV0pO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogU2V0cyB0aGUgZWxlbWVudCB0byBiZSBib3VuZCB0by5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSBzdHJpbmcgfCBzZWxlY3RvclxyXG5cdCAqIEByZXR1cm4gdm9pZFxyXG5cdCAqL1xyXG5cdHNldEVsZW1lbnQoc2VsZWN0b3IpXHJcblx0e1xyXG5cdFx0dGhpcy5lbGVtZW50ID0gRE9NLmZpbmQoc2VsZWN0b3IpO1xyXG5cdFx0XHJcblx0XHRET00uYWRkQ2xhc3ModGhpcy5lbGVtZW50LCB0aGlzLnNldHRpbmdzLmNsYXNzKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEFkZCB0aGUgZUNvbW1lcmNlIHN0eWxlIHRhZ3MgdG8gdGhlIERPTS5cclxuXHQgKlxyXG5cdCAqIEByZXR1cm4gdm9pZFxyXG5cdCAqL1xyXG5cdGFkZFN0eWxlVGFnKCkgXHJcblx0e1xyXG5cdFx0aWYgKERPTS5maW5kKCcjVHVyYm9lLUNvbW1lcmNlJykpIHtcclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0fVxyXG5cclxuXHRcdGxldCBjc3MgPSBgXHJcblx0XHRcdCR7dGhpcy5zZXR0aW5ncy5lbGVtZW50fSB7XHJcblx0XHRcdFx0cG9zaXRpb246IHJlbGF0aXZlO1xyXG5cdFx0XHRcdGNsZWFyOiBib3RoO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHQubG9hZGluZy1wcm9ncmVzcy1iYXIge1xyXG5cdFx0XHRcdHBvc2l0aW9uOiBmaXhlZDtcclxuXHRcdFx0XHR0b3A6IDA7XHJcblx0XHRcdFx0bGVmdDogMDtcclxuXHRcdFx0XHRoZWlnaHQ6IDVweDtcclxuXHRcdFx0XHR3aWR0aDogMTAwJTtcclxuXHRcdFx0XHQtd2Via2l0LWJveC1zaGFkb3c6IDBweCAwcHggNXB4IDFweCByZ2JhKDE2OCwxNjgsMTY4LDEpO1xyXG5cdFx0XHRcdC1tb3otYm94LXNoYWRvdzogMHB4IDBweCA1cHggMXB4IHJnYmEoMTY4LDE2OCwxNjgsMSk7XHJcblx0XHRcdFx0Ym94LXNoYWRvdzogMHB4IDBweCA1cHggMXB4IHJnYmEoMTY4LDE2OCwxNjgsMSk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdC5sb2FkaW5nLXByb2dyZXNzLWJhciA+IC5sb2FkaW5nLXByb2dyZXNzLWZpbGwge1xyXG5cdFx0XHRcdHdpZHRoOiAxMDAlO1xyXG5cdFx0XHRcdGhlaWdodDogMTAwJTtcclxuXHRcdFx0XHRwb3NpdGlvbjogYWJzb2x1dGU7XHJcblx0XHRcdFx0YmFja2dyb3VuZC1jb2xvcjogIzlkZDJmZjtcclxuXHRcdFx0XHR0cmFuc2Zvcm06IHRyYW5zbGF0ZVgoLSR7ZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudFdpZHRofXB4KTtcclxuXHRcdFx0fVxyXG5cdFx0YDtcclxuXHQgICAgXHJcblx0ICAgIERPTS5hZGRTdHlsZSgnVHVyYm8tZUNvbW1lcmNlJywgY3NzKTtcclxuXHR9XHJcbn1cclxuXHJcblxyXG4vKipcclxuICogQXR0YWNoZXMgYSBsb2FkZXIgdG8gdGhlIHRvcCBvZiB0aGUgc2NyZWVuXHJcbiAqIGFuZCBoaWRlcyB0aGUgY29udGVudC5cclxuICogU3RvcHMgYXV0b21hdGljYWxseSBhZnRlciAyMCUgcmVhY2hlZC5cclxuICpcclxuICogQHJldHVybiB2b2lkIFxyXG4gKi9cclxuZnVuY3Rpb24gc3RhcnRMb2FkaW5nKCkge1xyXG5cdGxldCBsb2FkZXIgPSBET00uY3JlYXRlRWxlbWVudCgnZGl2Jywge1xyXG5cdFx0Y2xhc3M6ICdsb2FkaW5nLXByb2dyZXNzLWJhcidcclxuXHR9KTtcclxuXHJcblx0bGV0IGZpbGwgPSBET00uY3JlYXRlRWxlbWVudCgnc3BhbicsIHtcclxuXHRcdGNsYXNzOiAnbG9hZGluZy1wcm9ncmVzcy1maWxsJ1xyXG5cdH0pO1xyXG5cclxuXHRsb2FkZXIuYXBwZW5kQ2hpbGQoZmlsbCk7XHJcblx0ZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChsb2FkZXIpO1xyXG5cclxuXHJcblx0bGV0IHByb2dyZXNzID0gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudFdpZHRoO1xyXG5cdGxldCBtYXhTaXplID0gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudFdpZHRoICogMC44MDtcclxuXHJcblx0d2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZShwcm9ncmVzc0RyYXcpO1xyXG5cclxuXHRsZXQgY29udGVudCA9IHRoaXMuZWxlbWVudDtcclxuXHJcblx0Y29udGVudC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xyXG5cdFxyXG5cdGZ1bmN0aW9uIHByb2dyZXNzRHJhdygpIHtcclxuXHRcdGZpbGwuc3R5bGUudHJhbnNmb3JtID0gJ3RyYW5zbGF0ZVgoLScgKyBwcm9ncmVzcyArICdweCknO1xyXG5cdFx0cHJvZ3Jlc3MgLT0gNztcclxuXHJcblx0XHRpZiAocHJvZ3Jlc3MgPCBtYXhTaXplKSB7XHJcblx0XHRcdGRvbmUoKTtcclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0fVxyXG5cclxuXHRcdHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUocHJvZ3Jlc3NEcmF3KTtcclxuXHR9XHJcblxyXG5cdGZ1bmN0aW9uIGRvbmUoKSB7XHJcblx0XHRmaWxsLnN0eWxlLm9wYWNpdHkgPSBwcm9ncmVzcyAvIDEwMDA7XHJcblx0XHRmaWxsLnN0eWxlLnRyYW5zZm9ybSA9ICd0cmFuc2xhdGVYKC0nICsgcHJvZ3Jlc3MgKyAncHgpJztcclxuXHRcclxuXHRcdHByb2dyZXNzIC09IDE1O1xyXG5cclxuXHRcdGlmIChwcm9ncmVzcyA8PSAwKSB7XHJcblx0XHRcdGNvbnRlbnQuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XHJcblx0XHRcdFxyXG5cdFx0XHRpZiAodHlwZW9mIGxvYWRlciAhPSAndW5kZWZpbmVkJykge1xyXG5cdFx0XHRcdERPTS5yZW1vdmUobG9hZGVyKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0fVxyXG5cclxuXHRcdHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoZG9uZSk7XHJcblx0fVxyXG59XG5cbnJldHVybiBUdXJib0Vjb21tZXJjZTtcblxufSgpKTtcbiJdfQ==
