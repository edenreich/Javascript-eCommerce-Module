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
				if (url.charAt(0) != '/') {
					url = '/' + url;
				}

				if (url == '/') {
					url = '/home';
				}

				window.history.pushState('', '', url);
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

			this.local = true;
			this.container = container;
			this.routes = this.buildRoutes();
			window.addEventListener('popstate', this.entry.bind(this));
			window.addEventListener('hashchange', this.entry.bind(this));
			window.addEventListener('touchstart', this.entry.bind(this));
			window.addEventListener('click', this.entry.bind(this));
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
			key: 'entry',
			value: function entry(event) {
				var url = window.location.pathname;
				var queryString = void 0;

				if (typeof url == 'undefined') {
					return;
				}

				if (Url.hasParameters(url)) {
					var parts = url.split('?')[1];
					queryString = parts[1];
					url = parts[0].substring(parts[0].length - 1);
				}

				if (url.indexOf('##/') != -1) {
					url = url.replace('##/', '');
				}

				if (queryString) {
					url = url + queryString;
				}

				if (event) {
					event.preventDefault();

					if (typeof event.target.pathname != 'undefined') {
						url = event.target.pathname;
					}
				}

				this.container.Events.subscribe('route.dispatched', function (url) {
					if (this.local) {
						url = '/client' + url;
					}

					Url.change(url);
				}.bind(this));

				// means this is a demo.
				// for the meanwhile, @todo find a different solution
				if (this.local) {
					url = url.replace('/client', '');
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
					href: 'checkout'
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

				this.container.Router.entry();

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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlR1cmJvRWNvbW1lcmNlLmpzIl0sIm5hbWVzIjpbIlR1cmJvRWNvbW1lcmNlIiwiU3RyIiwic3RyaW5nIiwicmVwbGFjZSIsInRvTG93ZXJDYXNlIiwibGVuZ3RoIiwicG9zc2libGUiLCJpIiwiY2hhckF0IiwiTWF0aCIsImZsb29yIiwicmFuZG9tIiwidG9VcHBlckNhc2UiLCJzbGljZSIsImRlYnVnTGV2ZWwiLCJFeGNlcHRpb25IYW5kbGVyIiwibGV2ZWwiLCJ3aW5kb3ciLCJvbmVycm9yIiwiRXJyb3IiLCJjYXB0dXJlU3RhY2tUcmFjZSIsImNvbnN0cnVjdG9yIiwibmFtZSIsImVycm9yIiwibWVzc2FnZSIsImN1c3RvbUFjdGlvbnMiLCJoYW5kbGVFcnJvcnMiLCJoYW5kbGVXYXJuaW5ncyIsImhhbmRsZUluZm9zIiwiY29uc29sZSIsIndhcm4iLCJpbmZvIiwiZGVmYXVsdE1lc3NhZ2UiLCJJbnZhbGlkQXJndW1lbnRFeGNlcHRpb24kMSIsIkRPTSIsImVsZW1lbnQiLCJjbGFzc05hbWUiLCJuZXdDbGFzc05hbWUiLCJyZW1vdmVDbGFzcyIsImFkZENsYXNzIiwidW5kZWZpbmVkIiwiY2xhc3NOYW1lcyIsInNwbGl0IiwiZm9yRWFjaCIsImNsYXNzTGlzdCIsImFkZCIsImluZGV4T2YiLCJyZW1vdmUiLCJwYXJlbnROb2RlIiwicmVtb3ZlQ2hpbGQiLCJpZCIsImNzcyIsImhlYWQiLCJkb2N1bWVudCIsImdldEVsZW1lbnRzQnlUYWdOYW1lIiwic3R5bGVUYWciLCJjcmVhdGVFbGVtZW50IiwiQ1NTIiwibWluaWZ5Q3NzIiwiaW5uZXJIVE1MIiwic2V0QXR0cmlidXRlIiwiYXBwZW5kQ2hpbGQiLCJzb3VyY2UiLCJsaW5rZWRTdHlsZVRhZyIsImVsZW1lbnRUeXBlIiwib3B0aW9ucyIsIm9wdGlvbiIsInNlY29uZENsYXNzTmFtZSIsInRvZ2dsZSIsInNlbGVjdG9yIiwiY29udGV4dCIsInF1ZXJ5RWxlbWVudCIsInBhcmVudEVsZW1lbnQiLCJxdWVyeVNlbGVjdG9yQWxsIiwiaGFzQ2hpbGQiLCJjaGlsZEVsZW1lbnQiLCJub2RlIiwiQ29tbW9uIiwiY3VycmVudE9iamVjdCIsIm5ld09iamVjdCIsImV4dGVuZGVkIiwicHJvcCIsIk9iamVjdCIsInByb3RvdHlwZSIsImhhc093blByb3BlcnR5IiwiY2FsbCIsIm5lZWRsZSIsImh5c3RhY2siLCJBcnJheSIsInRvdGFsIiwic2l6ZSIsImlzTmFOIiwicGFyc2VJbnQiLCJjb2xsZWN0aW9uIiwiY2VpbCIsInN0YXJ0IiwiZW5kIiwicHVzaCIsIm9iamVjdCIsImRlZmF1bHRNZXNzYWdlJDEiLCJJbnZhbGlkRGF0YVN0cnVjdHVyZUV4Y2VwdGlvbiIsImRlZmF1bHRTZXR0aW5ncyIsImhlYWRlcnMiLCJhc3luYyIsIlJlcXVlc3QiLCJzZXR0aW5ncyIsImV4dGVuZCIsInNldERlZmF1bHRSZXF1ZXN0SGVhZGVyIiwiaGVhZGVyIiwib3BlbiIsIlhNTEh0dHBSZXF1ZXN0Iiwic2V0UmVxdWVzdEhlYWRlciIsInJlc3BvbnNlIiwiYXBwbHkiLCJhcmd1bWVudHMiLCJ4aHIiLCJiZWZvcmUiLCJQcm9taXNlIiwicmVzb2x2ZSIsInJlamVjdCIsImRhdGEiLCJ1cmwiLCJyZXNwb25zZVR5cGUiLCJkYXRhVHlwZSIsInRpbWVvdXQiLCJvbnJlYWR5c3RhdGVjaGFuZ2UiLCJyZWFkeVN0YXRlIiwic3RhdHVzIiwicmVzcG9uc2VUZXh0IiwiYWZ0ZXIiLCJzZW5kIiwicXVlcnlTdHJpbmciLCJrZXlzIiwibWFwIiwia2V5IiwiZW5jb2RlVVJJQ29tcG9uZW50Iiwiam9pbiIsIkFjdGl2ZVhPYmplY3QiLCJvdmVycmlkZU1pbWVUeXBlIiwiSlNPTiIsInBhcnNlIiwib25hYm9ydCIsIlVybCIsImNvbnRlbnQiLCJ1cmxQYXRoIiwiZmluZCIsInRpdGxlIiwiaGlzdG9yeSIsInB1c2hTdGF0ZSIsIm9ucG9wc3RhdGUiLCJlIiwic3RhdGUiLCJodG1sIiwicGFnZVRpdGxlIiwidmFsdWUiLCJzZXBhcmF0b3IiLCJyZWdFeHAiLCJSZWdFeHAiLCJwYWlyU2VwYXJhdG9yIiwibWF0Y2giLCJwYXJhbWV0ZXJLZXkiLCJwYXJhbWV0ZXJWYWx1ZSIsInJlcXVlc3RlZFVybCIsImNoYW5nZVF1ZXJ5UGFyYW1ldGVyVmFsdWUiLCJsb2NhdGlvbiIsImhyZWYiLCJyZXBsYWNlU3RhdGUiLCJ2YXJzIiwicGFydHMiLCJtIiwiUm91dGVyIiwiY29udGFpbmVyIiwibG9jYWwiLCJyb3V0ZXMiLCJidWlsZFJvdXRlcyIsImFkZEV2ZW50TGlzdGVuZXIiLCJlbnRyeSIsImJpbmQiLCJldmVudCIsInBhdGhuYW1lIiwiaGFzUGFyYW1ldGVycyIsInN1YnN0cmluZyIsInByZXZlbnREZWZhdWx0IiwidGFyZ2V0IiwiRXZlbnRzIiwic3Vic2NyaWJlIiwiY2hhbmdlIiwiY3VycmVudCIsImRpc3BhdGNoIiwibG9nIiwiUHJvZHVjdHMiLCJoaWRlQWxsIiwiRmlsdGVyIiwic2hvdyIsIkNhcnQiLCJQYWdpbmF0aW9uIiwiQ2hlY2tvdXQiLCJwdWJsaXNoIiwiZGVmYXVsdE1lc3NhZ2UkMiIsIkJhZEV2ZW50Q2FsbEV4Y2VwdGlvbiIsIkV2ZW50TWFuYWdlciIsImV2ZW50cyIsImNhbGxiYWNrIiwiSW52YWxpZEFyZ3VtZW50RXhjZXB0aW9uIiwiQ29va2llIiwiZGF5cyIsInN0cmluZ2lmeSIsImV4cGlyZXMiLCJkYXRlIiwiRGF0ZSIsInNldFRpbWUiLCJnZXRUaW1lIiwidG9HTVRTdHJpbmciLCJjb29raWUiLCJjX3N0YXJ0IiwiY19lbmQiLCJ1bmVzY2FwZSIsIkJhc2VDb21wb25lbnQiLCJzdHlsZSIsImRpc3BsYXkiLCJkZWZhdWx0TWVzc2FnZSQzIiwiSW52YWxpZENhcnRJdGVtRXhjZXB0aW9uIiwiZGVmYXVsdFNldHRpbmdzJDEiLCJjb29raWVfbmFtZSIsInByZXZpZXdfY2xhc3MiLCJsb2FkZXIiLCJjbGFzcyIsIndpZHRoIiwiaGVpZ2h0IiwicGxhY2VtZW50IiwiZml4ZWQiLCJob3Zlcl9jb2xvciIsIm5vX2NzcyIsIkNvbnRhaW5lciIsIkV2ZW50TWFuYWdlciQyIiwiSHR0cCIsImxvYWRpbmdPdmVybGF5IiwiaXRlbXNEaXYiLCJodHRwIiwiZXZlbnRNYW5hZ2VyIiwicHJldmlld0VsZW1lbnQiLCJjcmVhdGVQcmV2aWV3RWxlbWVudCIsImljb24iLCJjcmVhdGVJY29uIiwic2V0RWxlbWVudCIsImRyYXciLCJiaW5kRXZlbnRMaXN0ZW5lcnMiLCJpc0VtcHR5IiwiZ2V0Iiwic2V0dXBDYXJ0IiwiY2FydCIsImVtcHR5T2JqZWN0IiwiaXRlbXMiLCJmYXZvcml0ZXMiLCJzZXQiLCJpdGVtIiwicXVhbnRpdHkiLCJpbmNyZW1lbnRlZCIsImFscmVhZHlGYXZvcml0ZWQiLCJzcGxpY2UiLCJ0YWJsZSIsImF0dHJpYnV0ZXMiLCJ0ciIsInRkIiwiYXR0cmlidXRlIiwiaW1hZ2UiLCJzcmMiLCJzcGFuIiwiY3VycmVuY3kiLCJhbW91bnQiLCJjb2xzcGFuIiwiY2hlY2tvdXQiLCJ0ZXh0IiwicGFyc2VGbG9hdCIsInByaWNlIiwidG9GaXhlZCIsInBvc2l0aW9uIiwiYWRkU3R5bGUiLCJjcmVhdGVMb2FkZXIiLCJwcmV2aWV3U3RhcnRMb2FkaW5nIiwiZ2V0Q2FydEl0ZW1zIiwiYWRkVG9QcmV2aWV3IiwiaW5zdGFuY2UiLCJzZXRUaW1lb3V0IiwicHJldmlld1N0b3BMb2FkaW5nIiwib25jbGljayIsInRvZ2dsZUNhcnRQcmV2aWV3Iiwib3BlbkNhcnRQcmV2aWV3IiwiYWRkSXRlbSIsInJlbG9hZENhcnRQcmV2aWV3IiwiZmF2b3JpdGVJdGVtIiwiaGFzQ2xhc3MiLCJzd2l0Y2hDbGFzc2VzIiwib3BlbmluZyIsInRvZ2dsZUNsYXNzIiwiY2xvc2UiLCJzdmciLCJjcmVhdGVFbGVtZW50TlMiLCJnIiwicGF0aCIsImRpdiIsImNvdW50IiwiZ3JvdXBzIiwicmVjdGFuZ2VscyIsImFuaW1hdGlvbnMiLCJyb3RhdGlvbiIsImdyb3VwIiwicmVjdGFuZ2VsIiwiYmVnaW4iLCJhbmltYXRlIiwiZGVmYXVsdFNldHRpbmdzJDIiLCJDb250YWluZXIkMSIsIm1pbldpZHRoIiwibWluX3dpZHRoIiwiZGVmYXVsdFNldHRpbmdzJDMiLCJDb250YWluZXIkMiIsIkV2ZW50TWFuYWdlciQzIiwiSHR0cCQxIiwiaGlkZSIsIkNvbXBvbmVudHMiLCJib290ZWQiLCJjb21wb25lbnQiLCJkZWZhdWx0U2V0dGluZ3MkNCIsIml0ZW1fY2xhc3MiLCJhZGRfYnV0dG9uX2NsYXNzIiwiZmF2b3JpdGVfYnV0dG9uX2NsYXNzIiwiQ29udGFpbmVyJDMiLCJFdmVudE1hbmFnZXIkNCIsIkh0dHAkMiIsImNodW5rZWRQcm9kdWN0cyIsInRvdGFsSXRlbXMiLCJsb2FkUHJvZHVjdHMiLCJwYWdlTnVtYmVyIiwibGltaXQiLCJwZXJfcGFnZSIsInByb2Nlc3NpbmciLCJsb2FkUGFnZVByb2R1Y3RzT25jZSIsImxvYWRQYWdlUHJvZHVjdHMiLCJyZXF1ZXN0IiwiZ2V0UHJvZHVjdHMiLCJ0aGVuIiwicHJvZHVjdHMiLCJjdXJyZW50SXRlbXMiLCJyZXBsYWNlUHJvZHVjdHMiLCJjYXRjaCIsInBhZ2VzIiwiY2FsY3VsYXRlQ2xpZW50UGFnZXMiLCJ0b3RhbF9pdGVtcyIsInBlclBhZ2UiLCJhcnJheV9jaHVuayIsInJhd1Byb2R1Y3RzIiwiaXNBcnJheSIsImJ1aWxkUHJvZHVjdHMiLCJwcm9kdWN0IiwiYWN0aW9uIiwiYXR0cmlidXRlc0NvbGxlY3Rpb24iLCJ0YWdUeXBlIiwiYnVpbHRQcm9kdWN0cyIsImJ1aWx0UHJvZHVjdCIsImJ1aWxkUHJvZHVjdCIsIm92ZXJsYXkiLCJhZGREZWZhdWx0QXR0cmlidXRlcyIsInRhZyIsIm91dGVySFRNTCIsInNwYW4yIiwiaW5fYXJyYXkiLCJrZWJhYkNhc2UiLCJhZGRUb0NhcnQiLCJ0eXBlIiwiZmF2b3JpdGUiLCJtYXhXaWR0aCIsIm1heF93aWR0aCIsIlNlcnZpY2VzIiwiZGVmYXVsdE1lc3NhZ2UkNCIsIk5vdEluUGFnZVJhbmdlRXhjZXB0aW9uIiwiZGVmYXVsdFNldHRpbmdzJDUiLCJ1cmxfcGFyYW1ldGVyIiwiQ29udGFpbmVyJDQiLCJQcm9kdWN0cyQyIiwiRXZlbnRNYW5hZ2VyJDUiLCJzZXJ2aWNlcyIsInNldEN1cnJlbnQiLCJ0b3RhbFBhZ2VzIiwiY2FsY3VsYXRlVG90YWxQYWdlcyIsImJ1aWxkUGFnaW5hdGlvbiIsImxpbmtzIiwiY3JlYXRlTGlua3MiLCJyZXBsYWNlTGlua3MiLCJuZXh0IiwiY2hpbGROb2RlcyIsInJlcXVlc3RlZFBhZ2UiLCJub3RJblBhZ2VSYW5nZSIsInByZXZpb3VzIiwiZ2V0QXR0cmlidXRlIiwiY2hhbmdlVXJsIiwic2V0QWN0aXZlTGluayIsInVsIiwiY3JlYXRlUGFnZUxpbmtzIiwiY3JlYXRlUHJldmlvdXNCdXR0b24iLCJjcmVhdGVOZXh0QnV0dG9uIiwicGFnZSIsInBhZ2VJdGVtIiwibGluayIsImxpIiwic3BhbjEiLCJjaGFuZ2VQYXJhbWV0ZXIiLCJkZWZhdWx0TWVzc2FnZSQ1IiwiQ29tcG9uZW50Tm90UmVnaXN0ZXJlZEV4Y2VwdGlvbiIsIkNvbXBvbmVudHNQcm92aWRlciIsImNvbXBvbmVudHMiLCJhdmFpbGFibGUiLCJleGlzdHMiLCJtYWtlIiwiZGVmYXVsdE1lc3NhZ2UkNiIsIkludmFsaWRCaW5kaW5nRXhjZXB0aW9uIiwiQ29udGFpbmVyJDUiLCJpbnN0YW5jZXMiLCJyZWdpc3RlciIsInJlZ2lzdGVyUHJvdmlkZXJzIiwicmVnaXN0ZXJSb3V0ZXIiLCJjb25jcmV0ZSIsIm5hbWVzcGFjZSIsImFsaWFzIiwiaW5zdGFuY2VFeGlzdCIsImdldEluc3RhbmNlIiwic2V0SW5zdGFuY2UiLCJkZWZhdWx0U2V0dGluZ3MkNiIsImRlYnVnX2xldmVsIiwiaW5qZWN0X2xpYnJhcmllcyIsImxvYWRpbmdfYW5pbWF0aW9uIiwiaGFzaF9uYXZpZ2F0aW9uIiwiZXh0ZXJuYWxMaWJyYXJpZXMiLCJib290c3RyYXAiLCJzZXREZWJ1Z0xldmVsIiwibG9hZEV4dGVybmFsTGlicmFyaWVzIiwic3RhcnRMb2FkaW5nIiwiYWRkU3R5bGVUYWciLCJQcm94eSIsInNob3AiLCJwcm92aWRlIiwibGlicmFyaWVzIiwidWNmaXJzdCIsImFkZExpbmtlZFN0eWxlIiwiZG9jdW1lbnRFbGVtZW50IiwiY2xpZW50V2lkdGgiLCJmaWxsIiwiYm9keSIsInByb2dyZXNzIiwibWF4U2l6ZSIsInJlcXVlc3RBbmltYXRpb25GcmFtZSIsInByb2dyZXNzRHJhdyIsInRyYW5zZm9ybSIsImRvbmUiLCJvcGFjaXR5Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsSUFBSUEsaUJBQWtCLFlBQVk7QUFDbEM7O0FBRUE7Ozs7Ozs7O0FBSGtDLEtBVzVCQyxHQVg0QjtBQUFBO0FBQUE7QUFBQTs7QUFBQTtBQUFBOztBQWFqQzs7Ozs7O0FBYmlDLDZCQW1CaEJDLE1BbkJnQixFQW9CakM7QUFDQyxXQUFPQSxPQUFPQyxPQUFQLENBQWUsaUJBQWYsRUFBa0MsT0FBbEMsRUFBMkNDLFdBQTNDLEVBQVA7QUFDQTs7QUFFRDs7Ozs7OztBQXhCaUM7QUFBQTtBQUFBLDBCQThCbkJDLE1BOUJtQixFQStCakM7QUFDQyxRQUFJSCxTQUFTLEVBQWI7QUFDQSxRQUFJSSxXQUFXLGdFQUFmOztBQUVBLFNBQUssSUFBSUMsSUFBSSxDQUFiLEVBQWdCQSxJQUFJRixNQUFwQixFQUE0QkUsR0FBNUIsRUFBaUM7QUFDN0JMLGVBQVVJLFNBQVNFLE1BQVQsQ0FBZ0JDLEtBQUtDLEtBQUwsQ0FBV0QsS0FBS0UsTUFBTCxLQUFnQkwsU0FBU0QsTUFBcEMsQ0FBaEIsQ0FBVjtBQUNIOztBQUVELFdBQU9ILE1BQVA7QUFDQTs7QUFFRDs7Ozs7Ozs7QUExQ2lDO0FBQUE7QUFBQSwyQkFpRGxCQSxNQWpEa0IsRUFrRGpDO0FBQ0ksV0FBT0EsT0FBT00sTUFBUCxDQUFjLENBQWQsRUFBaUJJLFdBQWpCLEtBQWlDVixPQUFPVyxLQUFQLENBQWEsQ0FBYixDQUF4QztBQUNIO0FBcERnQzs7QUFBQTtBQUFBOztBQXVEbEM7Ozs7Ozs7QUFLQSxLQUFJQyxtQkFBSjs7QUE1RGtDLEtBOEQ1QkMsZ0JB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alksV0FBZCxDQUEwQm9LLE1BQTFCOztBQUdBLE1BQUk4TixXQUFXMVksU0FBU3NZLGVBQVQsQ0FBeUJDLFdBQXhDO0FBQ0EsTUFBSUksVUFBVTNZLFNBQVNzWSxlQUFULENBQXlCQyxXQUF6QixHQUF1QyxJQUFyRDs7QUFFQTNhLFNBQU9nYixxQkFBUCxDQUE2QkMsWUFBN0I7O0FBRUEsTUFBSW5ULFVBQVUsS0FBSzVHLE9BQW5COztBQUVBNEcsVUFBUTJFLEtBQVIsQ0FBY0MsT0FBZCxHQUF3QixNQUF4Qjs7QUFFQSxXQUFTdU8sWUFBVCxHQUF3QjtBQUN2QkwsUUFBS25PLEtBQUwsQ0FBV3lPLFNBQVgsR0FBdUIsaUJBQWlCSixRQUFqQixHQUE0QixLQUFuRDtBQUNBQSxlQUFZLENBQVo7O0FBRUEsT0FBSUEsV0FBV0MsT0FBZixFQUF3QjtBQUN2Qkk7QUFDQTtBQUNBOztBQUVEbmIsVUFBT2diLHFCQUFQLENBQTZCQyxZQUE3QjtBQUNBOztBQUVELFdBQVNFLElBQVQsR0FBZ0I7QUFDZlAsUUFBS25PLEtBQUwsQ0FBVzJPLE9BQVgsR0FBcUJOLFdBQVcsSUFBaEM7QUFDQUYsUUFBS25PLEtBQUwsQ0FBV3lPLFNBQVgsR0FBdUIsaUJBQWlCSixRQUFqQixHQUE0QixLQUFuRDs7QUFFQUEsZUFBWSxFQUFaOztBQUVBLE9BQUlBLFlBQVksQ0FBaEIsRUFBbUI7QUFDbEJoVCxZQUFRMkUsS0FBUixDQUFjQyxPQUFkLEdBQXdCLE9BQXhCOztBQUVBLFFBQUksT0FBT00sTUFBUCxJQUFpQixXQUFyQixFQUFrQztBQUNqQy9MLFNBQUlhLE1BQUosQ0FBV2tMLE1BQVg7QUFDQTs7QUFFRDtBQUNBOztBQUVEaE4sVUFBT2diLHFCQUFQLENBQTZCRyxJQUE3QjtBQUNBO0FBQ0Q7O0FBRUQsUUFBT3BjLGNBQVA7QUFFQyxDQXBzSHFCLEVBQXRCIiwiZmlsZSI6IlR1cmJvRWNvbW1lcmNlLmpzIiwic291cmNlc0NvbnRlbnQiOlsidmFyIFR1cmJvRWNvbW1lcmNlID0gKGZ1bmN0aW9uICgpIHtcbid1c2Ugc3RyaWN0JztcblxuLyoqXHJcbiAqIEBmaWxlIFxyXG4gKiBTdHIgY2xhc3MuXHJcbiAqXHJcbiAqIEFkZHMgc29tZSB1c2VmdWwgZnVuY3Rpb25hbGl0eSBmb3JcclxuICogbWFuaXB1bGF0aW5nIHN0cmluZ3Mgb3IgY3JlYXRpbmcgc3RyaW5nLlxyXG4gKi9cclxuXHJcbmNsYXNzIFN0clxyXG57XHJcblx0LyoqXHJcblx0ICogQ29udmVydCBjYW1lbENhc2UgdG8ga2ViYWItY2FzZS5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSBzdHJpbmcgfCBzdHJpbmdcclxuXHQgKiBAcmV0dXJuIHN0cmluZ1xyXG5cdCAqL1xyXG5cdHN0YXRpYyBrZWJhYkNhc2Uoc3RyaW5nKSBcclxuXHR7XHJcblx0XHRyZXR1cm4gc3RyaW5nLnJlcGxhY2UoLyhbYS16XSkoW0EtWl0pL2csICckMS0kMicpLnRvTG93ZXJDYXNlKCk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBHZW5lcmF0ZXMgYSByYW5kb20gc3RyaW5nLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIGludGVnZXIgfCBsZW5ndGhcclxuXHQgKiBAcmV0dXJuIHN0cmluZ1xyXG5cdCAqL1xyXG5cdHN0YXRpYyByYW5kb20obGVuZ3RoKSBcclxuXHR7XHJcblx0XHRsZXQgc3RyaW5nID0gJyc7XHJcblx0XHRsZXQgcG9zc2libGUgPSBcIkFCQ0RFRkdISUpLTE1OT1BRUlNUVVZXWFlaYWJjZGVmZ2hpamtsbW5vcHFyc3R1dnd4eXowMTIzNDU2Nzg5XCI7XHJcblxyXG5cdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xyXG5cdCAgICBcdHN0cmluZyArPSBwb3NzaWJsZS5jaGFyQXQoTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogcG9zc2libGUubGVuZ3RoKSk7XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIHN0cmluZztcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIENoYW5nZXMgdGhlIGZpcnN0IGxldHRlciBcclxuXHQgKiBvZiB0aGUgc3RyaW5nIHRvIHVwcGVyY2FzZS5cclxuXHQgKiBcclxuXHQgKiBAcGFyYW0gc3RyaW5nIHwgc3RyaW5nXHJcblx0ICogQHJldHVybiBzdHJpbmdcclxuXHQgKi9cclxuXHRzdGF0aWMgdWNmaXJzdChzdHJpbmcpIFxyXG5cdHtcclxuXHQgICAgcmV0dXJuIHN0cmluZy5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSArIHN0cmluZy5zbGljZSgxKTtcclxuXHR9XHJcbn1cblxuLyoqXHJcbiAqIFN0b3JlcyB0aGUgZGVidWcgbGV2ZWwuXHJcbiAqXHJcbiAqIEB2YXIgc3RyaW5nIFxyXG4gKi9cclxubGV0IGRlYnVnTGV2ZWw7XHJcblxyXG5jbGFzcyBFeGNlcHRpb25IYW5kbGVyXHJcbntcclxuXHQvKipcclxuXHQgKiBTZXR0ZXIgZm9yIHRoZSBkZWJ1ZyBsZXZlbC5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSBzdHJpbmcgfCBsZXZlbFxyXG5cdCAqIEByZXR1cm4gdm9pZFxyXG5cdCAqL1xyXG5cdHN0YXRpYyBzZXQgc2V0RGVidWdMZXZlbChsZXZlbClcclxuXHR7XHJcblx0XHQvLyBTdXBwcmVzcyBlcnJvcnMgZGVwZW5kcyBvbiB0aGUgZGVidWcgbGV2ZWwuXHJcblx0XHRpZiAobGV2ZWwgPT0gJ3dhcm5pbmcnIHx8IGxldmVsID09ICdpbmZvJykge1xyXG5cdFx0XHR3aW5kb3cub25lcnJvciA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gdHJ1ZTsgfTtcclxuXHRcdH1cclxuXHJcblx0XHRkZWJ1Z0xldmVsID0gbGV2ZWw7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBFeHRlbmRlZCBjb25zdHJ1Y3RvciwgY2FwdHVyZXMgdGhlXHJcblx0ICogc3RhY2sgdHJhY2UuXHJcblx0ICpcclxuXHQgKiBAcmV0dXJuIHZvaWRcclxuXHQgKi9cclxuXHRjb25zdHJ1Y3RvcigpXHJcblx0e1xyXG5cdFx0aWYgKEVycm9yLmNhcHR1cmVTdGFja1RyYWNlKSB7XHJcblx0XHRcdEVycm9yLmNhcHR1cmVTdGFja1RyYWNlKHRoaXMsIHRoaXMuY29uc3RydWN0b3IubmFtZSk7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBIYW5kbGVzIGFsbCBleGNlcHRpb25zLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIG9iamVjdCB8IGVycm9yIHwgVGhyb3dlbiBFeGNlcHRpb24gT2JqZWN0XHJcblx0ICogQHBhcmFtIHN0cmluZyB8IG1lc3NhZ2VcclxuXHQgKiBAcmV0dXJuIHZvaWRcclxuXHQgKi9cclxuXHRzdGFja1RyYWNlKGVycm9yLCBtZXNzYWdlKSBcclxuXHR7XHJcblx0XHR0aGlzLmN1c3RvbUFjdGlvbnMoZXJyb3IsIG1lc3NhZ2UpO1xyXG5cclxuXHRcdHN3aXRjaChkZWJ1Z0xldmVsKVxyXG5cdFx0e1xyXG5cdFx0XHRjYXNlICdlcnJvcic6IHRoaXMuaGFuZGxlRXJyb3JzKGVycm9yLCBtZXNzYWdlKTsgYnJlYWs7XHJcblx0XHRcdGNhc2UgJ3dhcm5pbmcnOiB0aGlzLmhhbmRsZVdhcm5pbmdzKGVycm9yLCBtZXNzYWdlKTsgYnJlYWs7XHJcblx0XHRcdGNhc2UgJ2luZm8nOiB0aGlzLmhhbmRsZUluZm9zKGVycm9yLCBtZXNzYWdlKTsgYnJlYWs7XHJcblx0XHRcdGRlZmF1bHQ6IHRoaXMuaGFuZGxlSW5mb3MoZXJyb3IsIG1lc3NhZ2UpOyBicmVhaztcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFRha2UgYWN0aW9uIGZvciBzcGVjaWZpYyBFeGNlcHRpb25zLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIG9iamVjdCB8IGVycm9yIHwgVGhyb3dlbiBFeGNlcHRpb24gT2JqZWN0XHJcblx0ICogQHBhcmFtIHN0cmluZyB8IG1lc3NhZ2VcclxuXHQgKiBAcmV0dXJuIGJvb2xcclxuXHQgKi9cclxuXHRjdXN0b21BY3Rpb25zKGVycm9yLCBtZXNzYWdlKVxyXG5cdHtcclxuXHRcdGlmIChlcnJvci5jb25zdHJ1Y3Rvci5uYW1lID09ICdJbnZhbGlkQXJndW1lbnRFeGNlcHRpb24nKSB7XHJcblx0XHRcdC8vIGhhbmRsZVxyXG5cdFx0fSBlbHNlIGlmIChlcnJvci5jb25zdHJ1Y3Rvci5uYW1lID09ICdJbnZhbGlkQmluZGluZ0V4Y2VwdGlvbicpIHtcclxuXHRcdFx0Ly8gaGFuZGxlXHJcblx0XHR9IGVsc2UgaWYgKGVycm9yLmNvbnN0cnVjdG9yLm5hbWUgPT0gJ0JhZEV2ZW50Q2FsbEV4Y2VwdGlvbicpIHtcclxuXHRcdFx0Ly8gaGFuZGxlXHJcblx0XHR9IGVsc2UgaWYgKGVycm9yLmNvbnN0cnVjdG9yLm5hbWUgPT0gJ0NvbXBvbmVudHNFeGNlcHRpb24nKSB7XHJcblx0XHRcdC8vIGhhbmRsZVxyXG5cdFx0fSBlbHNlIGlmIChlcnJvci5jb25zdHJ1Y3Rvci5uYW1lID09ICdDb21wb25lbnROb3RSZWdpc3RlcmVkRXhjZXB0aW9uJykge1xyXG5cdFx0XHQvLyBoYW5kbGVcclxuXHRcdH0gZWxzZSBpZiAoZXJyb3IuY29uc3RydWN0b3IubmFtZSA9PSAnTm90SW5QYWdlUmFuZ2VFeGNlcHRpb24nKSB7XHJcblx0XHRcdC8vIGhhbmRsZVxyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiBmYWxzZTtcclxuXHR9XHJcblxyXG5cdGhhbmRsZUVycm9ycyhlcnJvciwgbWVzc2FnZSlcclxuXHR7XHJcblx0XHRjb25zb2xlLmVycm9yKGVycm9yLmNvbnN0cnVjdG9yLm5hbWUgKyAnOiAnICsgbWVzc2FnZSk7XHJcblx0fVxyXG5cclxuXHRoYW5kbGVXYXJuaW5ncyhlcnJvciwgbWVzc2FnZSlcclxuXHR7XHJcblx0XHRjb25zb2xlLndhcm4oZXJyb3IuY29uc3RydWN0b3IubmFtZSArICc6ICcgKyBtZXNzYWdlKTtcclxuXHR9XHJcblxyXG5cdGhhbmRsZUluZm9zKGVycm9yLCBtZXNzYWdlKVxyXG5cdHtcclxuXHRcdGNvbnNvbGUuaW5mbyhlcnJvci5jb25zdHJ1Y3Rvci5uYW1lICsgJzogJyArIG1lc3NhZ2UpO1xyXG5cdH1cclxufVxuXG5sZXQgZGVmYXVsdE1lc3NhZ2UgPSAnQW4gaW52YWxpZCBhcmd1bWVudCB3YXMgcGFzc2VkLic7XHJcblxyXG5jbGFzcyBJbnZhbGlkQXJndW1lbnRFeGNlcHRpb24kMSBleHRlbmRzIEV4Y2VwdGlvbkhhbmRsZXJcclxue1xyXG5cdGNvbnN0cnVjdG9yKG1lc3NhZ2UgPSBudWxsKSBcclxuXHR7XHJcblx0XHRtZXNzYWdlID0gbWVzc2FnZSB8fCBkZWZhdWx0TWVzc2FnZTtcclxuXHRcdHN1cGVyKG1lc3NhZ2UpO1xyXG4gICAgXHRzdXBlci5zdGFja1RyYWNlKHRoaXMsIG1lc3NhZ2UpO1xyXG4gICAgfVxyXG59XG5cbi8qKlxyXG4gKiBAZmlsZSBcclxuICogRE9NIGNsYXNzLlxyXG4gKlxyXG4gKiBBZGRzIHNvbWUgdXNlZnVsIGZ1bmN0aW9uYWxpdHkgZm9yXHJcbiAqIGZldGNoaW5nIG9yIG1hbmlwdWxhdGluZyBET00gZWxlbWVudHMuXHJcbiAqL1xyXG5cclxuY2xhc3MgRE9NXHJcbntcclxuXHQvKipcclxuXHQgKiBNaW5pZmllcyB0aGUgY3NzIHRleHQuXHJcblx0ICogXHJcblx0ICogQHBhcmFtIHN0cmluZyB8IHN0cmluZ1xyXG5cdCAqIEByZXR1cm4gc3RyaW5nXHJcblx0ICovXHJcblx0c3RhdGljIG1pbmlmeUNzcyhzdHJpbmcpIFxyXG5cdHtcclxuXHQgICAgc3RyaW5nID0gc3RyaW5nLnJlcGxhY2UoL1xcL1xcKig/Oig/IVxcKlxcLylbXFxzXFxTXSkqXFwqXFwvfFtcXHJcXG5cXHRdKy9nLCAnJyk7XHJcblx0ICAgIHN0cmluZyA9IHN0cmluZy5yZXBsYWNlKC8gezIsfS9nLCAnICcpO1xyXG5cdCAgICBzdHJpbmcgPSBzdHJpbmcucmVwbGFjZSgvKFt7On1dKS9nLCAnJDEnKTtcclxuXHQgICAgc3RyaW5nID0gc3RyaW5nLnJlcGxhY2UoLyhbOyxdKSAvZywgJyQxJyk7XHJcblx0ICAgIHN0cmluZyA9IHN0cmluZy5yZXBsYWNlKC8gIS9nLCAnIScpO1xyXG5cdCAgICBcclxuXHQgICAgcmV0dXJuIHN0cmluZztcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFN3aXRjaGVzIGJldHdlZW4gdHdvIGdpdmVuIGNsYXNzZXMuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gb2JqZWN0IHwgZWxlbWVudFxyXG5cdCAqIEBwYXJhbSBzdHJpbmcgfCBjbGFzc05hbWVcclxuXHQgKiBAcGFyYW0gc3RyaW5nIHwgbmV3Q2xhc3NOYW1lXHJcblx0ICogQHJldHVybiBvYmplY3RcclxuXHQgKi9cclxuXHRzdGF0aWMgc3dpdGNoQ2xhc3NlcyhlbGVtZW50LCBjbGFzc05hbWUsIG5ld0NsYXNzTmFtZSkgXHJcblx0e1xyXG5cdFx0dGhpcy5yZW1vdmVDbGFzcyhlbGVtZW50LCBjbGFzc05hbWUpO1xyXG5cdFx0dGhpcy5hZGRDbGFzcyhlbGVtZW50LCBuZXdDbGFzc05hbWUpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQWRkcyBjbGFzcyB0byBhIGdpdmVuIGVsZW1lbnQuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gb2JqZWN0IHwgZWxlbWVudFxyXG5cdCAqIEBwYXJhbSBzdHJpbmcgfCBjbGFzc05hbWVcclxuXHQgKiBAcmV0dXJuIG9iamVjdFxyXG5cdCAqL1xyXG5cdHN0YXRpYyBhZGRDbGFzcyhlbGVtZW50LCBjbGFzc05hbWUpIFxyXG5cdHtcclxuXHRcdGlmKGVsZW1lbnQgPT09IG51bGwpIHtcclxuXHRcdFx0dGhyb3cgbmV3IEludmFsaWRBcmd1bWVudEV4Y2VwdGlvbiQxO1xyXG5cdFx0fVxyXG5cclxuXHRcdGlmKCEgY2xhc3NOYW1lIHx8IGNsYXNzTmFtZSA9PSAnJyB8fCB0eXBlb2YgY2xhc3NOYW1lID09PSB1bmRlZmluZWQpIHtcclxuXHRcdFx0cmV0dXJuIGVsZW1lbnQ7XHJcblx0XHR9XHJcblxyXG5cdFx0bGV0IGNsYXNzTmFtZXMgPSBjbGFzc05hbWUuc3BsaXQoJyAnKTtcclxuXHJcblx0XHRjbGFzc05hbWVzLmZvckVhY2goZnVuY3Rpb24obmFtZSkge1xyXG5cdFx0XHRlbGVtZW50LmNsYXNzTGlzdC5hZGQobmFtZSk7XHJcblx0XHR9KTtcclxuXHRcdFxyXG5cdFx0cmV0dXJuIGVsZW1lbnQ7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBDaGVja3MgaWYgYW4gZWxlbWVudCBoYXMgYSBjbGFzcy5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSBIVE1MRWxlbWVudCB8IGVsZW1lbnRcclxuXHQgKiBAcGFyYW0gc3RyaW5nIHwgY2xhc3NOYW1lXHJcblx0ICogQHJldHVybiBib29sXHJcblx0ICovXHJcblx0c3RhdGljIGhhc0NsYXNzKGVsZW1lbnQsIGNsYXNzTmFtZSlcclxuXHR7XHJcblx0XHRpZiAoZWxlbWVudCA9PT0gbnVsbCkge1xyXG5cdFx0XHR0aHJvdyBuZXcgSW52YWxpZEFyZ3VtZW50RXhjZXB0aW9uJDEoJ2hhc0NsYXNzKCkgZXhwZWN0cyB0aGUgZmlyc3QgYXJndW1lbnQgdG8gYmUgYW4gSFRNTEVsZW1lbnQgYnV0IG51bGwgd2FzIHBhc3NlZC4nKTtcclxuXHRcdH1cclxuXHJcblx0XHRpZiAoISBjbGFzc05hbWUgfHwgY2xhc3NOYW1lID09ICcnIHx8IHR5cGVvZiBjbGFzc05hbWUgPT0gJ3VuZGVmaW5lZCcpIHtcclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiBlbGVtZW50LmNsYXNzTmFtZS5pbmRleE9mKGNsYXNzTmFtZSkgIT0gLTE7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBSZW1vdmVzIGNsYXNzIGZyb20gYSBnaXZlbiBlbGVtZW50LlxyXG5cdCAqIFxyXG5cdCAqIEBwYXJhbSBvYmplY3QgfCBlbGVtZW50XHJcblx0ICogQHBhcmFtIHN0cmluZyB8IGNsYXNzTmFtZVxyXG5cdCAqIEByZXR1cm4gb2JqZWN0XHJcblx0ICovXHJcblx0c3RhdGljIHJlbW92ZUNsYXNzKGVsZW1lbnQsIGNsYXNzTmFtZSkgXHJcblx0e1xyXG5cdFx0aWYoZWxlbWVudCA9PSBudWxsKSB7XHJcblx0XHRcdHRocm93IG5ldyBJbnZhbGlkQXJndW1lbnRFeGNlcHRpb24kMTtcclxuXHRcdH1cclxuXHJcblx0XHRpZihjbGFzc05hbWUgPT0gJycpIHtcclxuXHRcdFx0ZWxlbWVudC5jbGFzc05hbWUgPSAnJztcclxuXHRcdH0gZWxzZSB7XHJcblxyXG5cdFx0XHRsZXQgY2xhc3NOYW1lcyA9IGNsYXNzTmFtZS5zcGxpdCgnICcpO1xyXG5cclxuXHRcdFx0Y2xhc3NOYW1lcy5mb3JFYWNoKGZ1bmN0aW9uKG5hbWUpIHtcclxuXHRcdFx0XHRlbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUobmFtZSk7XHJcblx0XHRcdH0pO1xyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiBlbGVtZW50O1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogUmVtb3ZlcyBhbiBlbGVtZW50IGZyb20gdGhlIERPTS5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSBIVE1MRWxlbWVudFxyXG5cdCAqIEByZXR1cm4gdm9pZFxyXG5cdCAqL1xyXG5cdHN0YXRpYyByZW1vdmUoZWxlbWVudClcclxuXHR7XHJcblx0XHRlbGVtZW50LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoZWxlbWVudCk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBBZGRzIHN0eWxlIHRhZyB3aXRoIGdpdmVuIGlkIGFuZCBjc3MgdG8gdGhlIERPTS5cclxuXHQgKiBcclxuXHQgKiBAcGFyYW0gc3RyaW5nIHwgaWRcclxuXHQgKiBAcGFyYW0gc3RyaW5nIHwgY3NzXHJcblx0ICogQHJldHVybiB2b2lkXHJcblx0ICovXHJcblx0c3RhdGljIGFkZFN0eWxlKGlkLCBjc3MpXHJcblx0e1xyXG5cdFx0aWYgKHR5cGVvZiBjc3MgIT0gJ3N0cmluZycpIHtcclxuXHRcdFx0dGhyb3cgbmV3IEludmFsaWRBcmd1bWVudEV4Y2VwdGlvbiQxO1xyXG5cdFx0fVxyXG5cclxuXHRcdGxldCBoZWFkID0gZG9jdW1lbnQuaGVhZCB8fCBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnaGVhZCcpWzBdO1xyXG5cdFx0bGV0IHN0eWxlVGFnID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3R5bGUnKTtcclxuXHJcblx0XHQvLyBwaXBlIGl0IHRocm91Z2ggdGhlIG1pbmZpZXJcclxuXHQgICAgbGV0IENTUyA9IHRoaXMubWluaWZ5Q3NzKGNzcyk7XHJcblx0ICAgIC8vIGFkZGluZyBpdCB0byB0aGUgc3R5bGV0YWdcclxuXHQgICAgc3R5bGVUYWcuaW5uZXJIVE1MID0gQ1NTO1xyXG5cdCAgICAvLyBnaXZlIGFuIGlkIHRvIHJlY29nbml6ZSB0aGUgc3R5bGUgdGFnXHJcblx0XHRzdHlsZVRhZy5zZXRBdHRyaWJ1dGUoJ2lkJywgaWQpO1xyXG5cdFx0Ly8gYXBwZW5kaW5nIHRoYXQgc3R5bGUgdGFnIHRvIHRoZSBET00gaGVhZCB0YWdcclxuXHRcdGhlYWQuYXBwZW5kQ2hpbGQoc3R5bGVUYWcpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQWRkcyBsaW5rZWQgc3R5bGUgdGFnIHdpdGggZ2l2ZW4gaWQgYW5kIHNyYyB0byB0aGUgRE9NLlxyXG5cdCAqIFxyXG5cdCAqIEBwYXJhbSBzdHJpbmcgfCBpZFxyXG5cdCAqIEBwYXJhbSBzdHJpbmcgfCBzb3VyY2VcclxuXHQgKiBAcmV0dXJuIHZvaWRcclxuXHQgKi9cclxuXHRzdGF0aWMgYWRkTGlua2VkU3R5bGUoaWQsIHNvdXJjZSkgXHJcblx0e1xyXG5cdFx0aWYgKHR5cGVvZiBzb3VyY2UgIT0gJ3N0cmluZycpIHtcclxuXHRcdFx0dGhyb3cgbmV3IEludmFsaWRBcmd1bWVudEV4Y2VwdGlvbiQxKCdET00uYWRkTGlua2VkU3R5bGUoKSBleGNwZWN0cyB0aGUgc2Vjb25kIHBhcmFtZXRlciB0byBiZSBzdHJpbmcsIGJ1dCAnICsgdHlwZW9mIHNvdXJjZSArICcgd2FzIHBhc3NlZCBpbnN0ZWFkLicpO1xyXG5cdFx0fVxyXG5cclxuXHRcdGxldCBoZWFkID0gZG9jdW1lbnQuaGVhZCB8fCBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnaGVhZCcpWzBdO1xyXG5cdFx0bGV0IGxpbmtlZFN0eWxlVGFnID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGluaycpO1xyXG5cclxuXHQgICAgLy8gZ2l2ZSBhbiBpZCB0byByZWNvZ25pemUgdGhlIHN0eWxlIHRhZ1xyXG5cdFx0bGlua2VkU3R5bGVUYWcuc2V0QXR0cmlidXRlKCdpZCcsIGlkKTtcclxuXHRcdGxpbmtlZFN0eWxlVGFnLnNldEF0dHJpYnV0ZSgnaHJlZicsIHNvdXJjZSk7XHJcblx0XHRsaW5rZWRTdHlsZVRhZy5zZXRBdHRyaWJ1dGUoJ3JlbCcsICdzdHlsZXNoZWV0Jyk7XHJcblx0XHRsaW5rZWRTdHlsZVRhZy5zZXRBdHRyaWJ1dGUoJ3R5cGUnLCAndGV4dC9jc3MnKTtcclxuXHRcdC8vIGFwcGVuZGluZyB0aGF0IHN0eWxlIHRhZyB0byB0aGUgRE9NIGhlYWQgdGFnXHJcblx0XHRoZWFkLmFwcGVuZENoaWxkKGxpbmtlZFN0eWxlVGFnKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIENyZWF0ZXMgYW4gZWxlbWVudCB3aXRoIHRoZSBnaXZlbiBvcHRpb25zLlxyXG5cdCAqIFxyXG5cdCAqIEBwYXJhbSBzdHJpbmcgfCBlbGVtZW50VHlwZVxyXG5cdCAqIEBwYXJhbSBvYmplY3QgfCBvcHRpb25zXHJcblx0ICogQHJldHVybiBIVE1MRWxlbWVudFxyXG5cdCAqL1xyXG5cdHN0YXRpYyBjcmVhdGVFbGVtZW50KGVsZW1lbnRUeXBlLCBvcHRpb25zKVxyXG5cdHtcclxuXHRcdGxldCBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChlbGVtZW50VHlwZSk7XHJcblx0XHJcblx0XHRpZiAob3B0aW9ucyA9PT0gdW5kZWZpbmVkKSB7XHJcblx0XHRcdHJldHVybiBlbGVtZW50O1xyXG5cdFx0fVxyXG5cclxuXHRcdGZvciAobGV0IG9wdGlvbiBpbiBvcHRpb25zKSB7XHJcblx0XHRcdHN3aXRjaChvcHRpb24pXHJcblx0XHRcdHtcclxuXHRcdFx0XHRjYXNlICd0ZXh0JzpcclxuXHRcdFx0XHRjYXNlICdodG1sJzpcclxuXHRcdFx0XHRcdGVsZW1lbnQuaW5uZXJIVE1MID0gb3B0aW9uc1tvcHRpb25dO1xyXG5cdFx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdFx0ZGVmYXVsdDpcclxuXHRcdFx0XHRcdGVsZW1lbnQuc2V0QXR0cmlidXRlKG9wdGlvbiwgb3B0aW9uc1tvcHRpb25dKTtcclxuXHRcdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIGVsZW1lbnQ7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBUb2dnbGVzIHRoZSBnaXZlbiBjbGFzc2VzLlxyXG5cdCAqIFxyXG5cdCAqIEBwYXJhbSBvYmplY3QgfCBlbGVtZW50XHJcblx0ICogQHBhcmFtIHN0cmluZyB8IGNsYXNzTmFtZVxyXG5cdCAqIEByZXR1cm4gYm9vbFxyXG5cdCAqL1xyXG5cdHN0YXRpYyB0b2dnbGVDbGFzcyhlbGVtZW50LCBjbGFzc05hbWUsIHNlY29uZENsYXNzTmFtZSlcclxuXHR7XHJcblx0XHRpZiAoZWxlbWVudCA9PSBudWxsIHx8IHR5cGVvZiBlbGVtZW50ID09ICd1bmRlZmluZWQnKSB7XHJcblx0XHRcdHRocm93IG5ldyBJbnZhbGlkQXJndW1lbnRFeGNlcHRpb24kMTtcclxuXHRcdH1cclxuXHJcblx0XHRzZWNvbmRDbGFzc05hbWUgPSBzZWNvbmRDbGFzc05hbWUgfHwgdW5kZWZpbmVkO1xyXG5cclxuXHRcdGlmKHNlY29uZENsYXNzTmFtZSkge1xyXG5cdFx0XHRlbGVtZW50LmNsYXNzTGlzdC50b2dnbGUoc2Vjb25kQ2xhc3NOYW1lKTtcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gZWxlbWVudC5jbGFzc0xpc3QudG9nZ2xlKGNsYXNzTmFtZSk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBGaW5kcyBhbiBlbGVtZW50IGluc2lkZSBvZiBwYXJlbnQuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gc3RyaW5nIHwgc2VsZWN0b3JcclxuXHQgKiBAcGFyYW0gb2JqZWN0IHwgY29udGV4dFxyXG5cdCAqIEByZXR1cm4gbWl4ZWRcclxuXHQgKi9cclxuXHRzdGF0aWMgZmluZChzZWxlY3RvciwgY29udGV4dCA9IHdpbmRvdy5kb2N1bWVudCkgXHJcblx0e1xyXG5cdFx0cmV0dXJuIHF1ZXJ5RWxlbWVudChzZWxlY3RvciwgY29udGV4dCk7XHJcblx0fVxyXG59XHJcblxyXG4vKipcclxuICogUXVlcmllcyBhbiBlbGVtZW50IGZyb20gdGhlIERPTS5cclxuICpcclxuICogQHBhcmFtIHN0cmluZyB8IHNlbGVjdG9yXHJcbiAqIEBwYXJhbSBvYmplY3QgfCBwYXJlbnRFbGVtZW50XHJcbiAqIEByZXR1cm4gbWl4ZWRcclxuICovXHJcbmZ1bmN0aW9uIHF1ZXJ5RWxlbWVudChzZWxlY3RvciwgcGFyZW50RWxlbWVudCkgXHJcbntcclxuXHRpZiAodHlwZW9mIHNlbGVjdG9yICE9ICdzdHJpbmcnKSB7XHJcblx0XHR0aHJvdyBuZXcgSW52YWxpZEFyZ3VtZW50RXhjZXB0aW9uJDEoJ3F1ZXJ5RWxlbWVudCgpIGV4cGVjdHMgZmlyc3QgcGFyYW1ldGVyIHRvIGJlIGEgc3RyaW5nLCBidXQgJyArIHR5cGVvZiBzZWxlY3RvciArICcgd2FzIHBhc3NlZCBpbnN0ZWFkLicpO1xyXG5cdH1cclxuXHJcblx0bGV0IGVsZW1lbnQgPSBwYXJlbnRFbGVtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3IpO1xyXG5cclxuXHRpZiAoZWxlbWVudC5sZW5ndGggPT0gMCkge1xyXG5cdFx0cmV0dXJuIG51bGw7XHJcblx0fVxyXG5cclxuXHRyZXR1cm4gKGVsZW1lbnQubGVuZ3RoID4gMSkgPyBlbGVtZW50IDogZWxlbWVudFswXTtcclxufVxyXG5cclxuLyoqXHJcbiAqIENoZWNrcyBpZiBwYXJlbnQgaGFzIGNoaWxkLlxyXG4gKlxyXG4gKiBAcGFyYW0gb2JqZWN0IHwgcGFyZW50RWxlbWVudFxyXG4gKiBAcGFyYW0gb2JqZWN0IHwgY2hpbGRFbGVtZW50XHJcbiAqIEByZXR1cm4gYm9vbFxyXG4gKi9cclxuZnVuY3Rpb24gaGFzQ2hpbGQocGFyZW50RWxlbWVudCwgY2hpbGRFbGVtZW50KSBcclxue1xyXG4gICAgIGxldCBub2RlID0gY2hpbGRFbGVtZW50LnBhcmVudE5vZGU7XHJcbiAgICAgXHJcbiAgICAgd2hpbGUgKG5vZGUgIT0gbnVsbCkge1xyXG4gICAgICAgICBpZiAobm9kZSA9PSBwYXJlbnRFbGVtZW50KSB7XHJcbiAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgfVxyXG4gICAgICAgICBub2RlID0gbm9kZS5wYXJlbnROb2RlO1xyXG4gICAgIH1cclxuICAgICBcclxuICAgICByZXR1cm4gZmFsc2U7XHJcbn1cblxuLyoqXHJcbiAqIEBmaWxlIFxyXG4gKiBDb21tb24gY2xhc3MuXHJcbiAqXHJcbiAqIEFkZHMgc29tZSB1c2VmdWwgZnVuY3Rpb25hbGl0eSBmb3JcclxuICogY29tbW9uIHRhc2tzIC0gZGF0YSBjaGVja3Mgb3IgZGF0YSBtYW5pcHVsYXRpb24uXHJcbiAqL1xyXG5cclxuY2xhc3MgQ29tbW9uXHJcbntcclxuXHQvKipcclxuXHQgKiBFeHRlbmQgYW4gb2JqZWN0LlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIG9iamVjdCB8IGN1cnJlbnRPYmplY3RcclxuXHQgKiBAcGFyYW0gb2JqZWN0IHwgbmV3T2JqZWN0XHJcblx0ICogQHJldHVybiBvYmplY3RcclxuXHQgKi9cclxuXHRzdGF0aWMgZXh0ZW5kKGN1cnJlbnRPYmplY3QsIG5ld09iamVjdCkge1xyXG5cdFx0dmFyIGV4dGVuZGVkID0ge307XHJcblx0ICAgIHZhciBwcm9wO1xyXG5cclxuXHQgICAgZm9yIChwcm9wIGluIGN1cnJlbnRPYmplY3QpIHtcclxuXHQgICAgICAgIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoY3VycmVudE9iamVjdCwgcHJvcCkpIHtcclxuXHQgICAgICAgICAgICBleHRlbmRlZFtwcm9wXSA9IGN1cnJlbnRPYmplY3RbcHJvcF07XHJcblx0ICAgICAgICB9XHJcblx0ICAgIH1cclxuXHJcblx0ICAgIGZvciAocHJvcCBpbiBuZXdPYmplY3QpIHtcclxuXHQgICAgICAgIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwobmV3T2JqZWN0LCBwcm9wKSkge1xyXG5cdCAgICAgICAgICAgIGV4dGVuZGVkW3Byb3BdID0gbmV3T2JqZWN0W3Byb3BdO1xyXG5cdCAgICAgICAgfVxyXG5cdCAgICB9XHJcblxyXG5cdCAgICByZXR1cm4gZXh0ZW5kZWQ7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBDaGVja3MgZm9yIGEgbmVlZGxlIGluIGh5c3RhY2sgYXJyYXkuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gbWl4ZWQgfCBuZWVkbGVcclxuXHQgKiBAcGFyYW0gb2JqZWN0IHwgb2JqZWN0XHJcblx0ICogQHJldHVybiBib29sXHJcblx0ICpcclxuXHQgKi9cclxuXHRzdGF0aWMgaW5fYXJyYXkobmVlZGxlLCBoeXN0YWNrKSB7XHJcblx0XHRpZiAodHlwZW9mIGh5c3RhY2sgPT0gJ3VuZGVmaW5lZCcgfHwgaHlzdGFjay5jb25zdHJ1Y3RvciAhPT0gQXJyYXkpIHtcclxuXHRcdFx0dGhyb3cgbmV3IEludmFsaWRBcmd1bWVudEV4Y2VwdGlvbiQxKCdDb21tb24uaW5fYXJyYXkoKSBleHBlY3RzIHRoZSBzZWNvbmQgcGFyYW1ldGVyIHRvIGJlIGFuIGFycmF5LCBidXQgJyArIHR5cGVvZiBoeXN0YWNrICsgJyB3YXMgcGFzc2QgaW5zdGVhZCcpO1xyXG5cdFx0fVxyXG5cclxuXHRcdGZvciAodmFyIGkgPSAwOyBpIDw9IGh5c3RhY2subGVuZ3RoOyBpKyspIHtcclxuXHRcdFx0aWYgKG5lZWRsZSA9PSBoeXN0YWNrW2ldKSB7XHJcblx0XHRcdFx0cmV0dXJuIHRydWU7XHRcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdFxyXG5cdFx0cmV0dXJuIGZhbHNlO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogVGFrZXMgYW4gYXJyYXkgYW5kIGNodW5rcyBpdC5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSBhcnJheSB8IHRvdGFsXHJcblx0ICogQHBhcmFtIG51bWJlciB8IGNodW5rc1xyXG5cdCAqIEByZXR1cm4gYXJyYXlcclxuXHQgKi9cclxuXHRzdGF0aWMgYXJyYXlfY2h1bmsodG90YWwsIHNpemUgPSA1KVxyXG5cdHsgICAgICAgIFxyXG4gICAgICBcdGlmIChpc05hTihzaXplKSkge1xyXG4gICAgICBcdFx0dGhyb3cgbmV3IEludmFsaWRBcmd1bWVudEV4Y2VwdGlvbiQxKCdDb21tb24uYXJyYXlfY2h1bmsoKSBleHBlY3RzIHRoZSBzZWNvbmQgcGFyYW1ldGVyIHRvIGJlIGEgbnVtYmVyLCBidXQgJyArIHR5cGVvZiBzaXplICsgJyBwYXNzZWQgaW5zdGVhZC4nKVxyXG4gICAgICBcdH1cclxuXHJcbiAgICAgIFx0c2l6ZSA9IHBhcnNlSW50KHNpemUpO1xyXG4gICAgICAgXHJcbiAgICAgICBcdGxldCBpO1xyXG4gICAgICAgXHRsZXQgY29sbGVjdGlvbiA9IFtdO1xyXG5cclxuICAgICAgICAvLyBhZGQgZWFjaCBjaHVuayB0byB0aGUgcmVzdWx0XHJcbiAgICAgICAgZm9yIChpID0gMDsgaSA8IE1hdGguY2VpbCh0b3RhbC5sZW5ndGggLyBzaXplKTsgaSsrKSB7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB2YXIgc3RhcnQgPSBpICogc2l6ZTtcclxuICAgICAgICAgICAgdmFyIGVuZCA9IHN0YXJ0ICsgc2l6ZTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGNvbGxlY3Rpb24ucHVzaCh0b3RhbC5zbGljZShzdGFydCwgZW5kKSk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICByZXR1cm4gY29sbGVjdGlvbjtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIENoZWNrcyBpZiBhbiBvYmplY3QgaXMgZW1wdHkuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gb2JqZWN0IHwgb2JqZWN0XHJcblx0ICogQHJldHVybiBib29sXHJcblx0ICovXHJcblx0c3RhdGljIGVtcHR5T2JqZWN0KG9iamVjdCkge1xyXG5cdFx0Zm9yIChsZXQgcHJvcCBpbiBvYmplY3QpIHtcclxuXHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiB0cnVlO1xyXG5cdH1cclxuXHJcblxyXG5cdC8qKlxyXG5cdCAqIENoZWNrcyBpZiBhIGdpdmVuIG9iamVjdCBjb250YWluZWQgaW4gYW4gYXJyYXkuXHJcblx0ICogXHJcblx0ICogQHBhcmFtIG9iamVjdCB8IG9iamVjdFxyXG5cdCAqIEBwYXJhbSBhcnJheSB8IGhheXN0YWNrXHJcblx0ICogQHJldHVybiBib29sXHJcblx0ICovXHJcblx0c3RhdGljIGNvbnRhaW5zT2JqZWN0KG9iamVjdCwgaHlzdGFjaykgXHJcblx0e1xyXG5cdCAgICBsZXQgaTtcclxuXHJcblx0ICAgIGZvciAoaSA9IDA7IGkgPCBoeXN0YWNrLmxlbmd0aDsgaSsrKSB7XHJcblx0ICAgICAgICBpZiAodHlwZW9mIG9iamVjdCA9PSAnc3RyaW5nJyAmJiBoeXN0YWNrW2ldLmNvbnN0cnVjdG9yLm5hbWUgPT09IG9iamVjdCkge1xyXG5cdCAgICAgICAgXHRyZXR1cm4gdHJ1ZTtcclxuXHQgICAgICAgIH1cclxuXHJcblx0ICAgICAgICBpZiAoaHlzdGFja1tpXSA9PT0gb2JqZWN0KSB7XHJcblx0ICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcblx0ICAgICAgICB9XHJcblx0ICAgIH1cclxuXHJcblx0ICAgIHJldHVybiBmYWxzZTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIENoZWNrcyBpZiBhIGdpdmVuIHBhcmFtZXRlciBpcyBhbiBvYmplY3QuXHJcblx0ICogXHJcblx0ICogQHBhcmFtIG9iamVjdCB8IG9iamVjdFxyXG5cdCAqIEByZXR1cm4gYm9vbFxyXG5cdCAqL1xyXG5cdHN0YXRpYyBpc09iamVjdChvYmplY3QpIFxyXG5cdHtcclxuXHRcdHJldHVybiB0eXBlb2Ygb2JqZWN0ID09ICdvYmplY3QnO1xyXG5cdH1cclxufVxuXG5sZXQgZGVmYXVsdE1lc3NhZ2UkMSA9ICdUaGUgZGF0YSBzdHJ1Y3R1cmUgaXMgaW52YWxpZCc7XHJcblxyXG5jbGFzcyBJbnZhbGlkRGF0YVN0cnVjdHVyZUV4Y2VwdGlvbiBleHRlbmRzIEV4Y2VwdGlvbkhhbmRsZXJcclxue1xyXG5cdGNvbnN0cnVjdG9yKG1lc3NhZ2UgPSBudWxsKSBcclxuXHR7XHJcblx0XHRtZXNzYWdlID0gbWVzc2FnZSB8fCBkZWZhdWx0TWVzc2FnZSQxO1xyXG5cdFx0c3VwZXIobWVzc2FnZSk7XHJcbiAgICBcdHN1cGVyLnN0YWNrVHJhY2UodGhpcywgbWVzc2FnZSk7XHJcbiAgICB9XHJcbn1cblxuLyoqXHJcbiAqIEBmaWxlIFxyXG4gKiBSZXF1ZXN0IGNsYXNzLlxyXG4gKlxyXG4gKiBIYW5kbGVzIGFqYXggcmVxdWVzdHMgUE9TVCwgR0VUIGV0Yy4uLlxyXG4gKi9cclxuXHJcbi8qKlxyXG4gKiBTdG9yZXMgdGhlIGRlZmF1bHQgc2V0dGluZ3MuXHJcbiAqXHJcbiAqIEB2YXIgb2JqZWN0XHJcbiAqL1xyXG5cclxubGV0IGRlZmF1bHRTZXR0aW5ncyA9IHtcclxuXHRoZWFkZXJzOiB7XHJcblx0XHQnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nXHJcblx0fSxcclxuXHRhc3luYzogdHJ1ZVxyXG59O1xyXG5cclxuY2xhc3MgUmVxdWVzdFxyXG57XHJcblx0LyoqXHJcblx0ICogLSBJbml0aWFsaXplIHRoZSBzZXR0aW5ncyBvYmplY3QuXHJcblx0ICogLSBJbml0aWFsaXplIHRoZSB4aHIgb2JqZWN0LlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIG9iamVjdCB8IHNldHRpbmdzXHJcblx0ICogQHJldHVybiB2b2lkXHJcblx0ICovXHJcblx0Y29uc3RydWN0b3Ioc2V0dGluZ3MpXHJcblx0e1xyXG5cdFx0dGhpcy5zZXR0aW5ncyA9IENvbW1vbi5leHRlbmQoZGVmYXVsdFNldHRpbmdzLCBzZXR0aW5ncyk7XHJcblx0XHR0aGlzLnNldERlZmF1bHRSZXF1ZXN0SGVhZGVyKCk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBTZXRzIHRoZSBkZWZhdWx0IHJlcXVlc3QgaGVhZGVycy5cclxuXHQgKlxyXG5cdCAqIEByZXR1cm4gdm9pZFxyXG5cdCAqL1xyXG5cdHNldERlZmF1bHRSZXF1ZXN0SGVhZGVyKClcclxuXHR7XHJcblx0XHRsZXQgaGVhZGVyO1xyXG5cdFx0bGV0IGhlYWRlcnMgPSB0aGlzLnNldHRpbmdzLmhlYWRlcnM7XHJcblx0XHRsZXQgYXN5bmMgPSB0aGlzLnNldHRpbmdzLmFzeW5jO1xyXG5cdFx0bGV0IG9wZW4gPSBYTUxIdHRwUmVxdWVzdC5wcm90b3R5cGUub3BlbjtcclxuXHRcdGxldCBzZXRSZXF1ZXN0SGVhZGVyID0gWE1MSHR0cFJlcXVlc3QucHJvdG90eXBlLnNldFJlcXVlc3RIZWFkZXI7XHJcblxyXG5cdFx0WE1MSHR0cFJlcXVlc3QucHJvdG90eXBlLm9wZW4gPSBmdW5jdGlvbigpIHtcclxuXHRcdFx0dmFyIHJlc3BvbnNlID0gb3Blbi5hcHBseSh0aGlzLCBhcmd1bWVudHMsIGFzeW5jKTtcclxuXHJcblx0XHRcdGZvciAoaGVhZGVyIGluIGhlYWRlcnMpIHtcclxuXHRcdFx0XHR0aGlzLnNldFJlcXVlc3RIZWFkZXIoaGVhZGVyLCBoZWFkZXJzW2hlYWRlcl0pO1xyXG5cdFx0XHR9XHJcblxyXG5cdCAgXHRcdHJldHVybiByZXNwb25zZTtcclxuXHRcdH07XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBNYWtlcyBhIFBPU1QgcmVxdWVzdC5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSBvYmplY3QgfCBvcHRpb25zXHJcblx0ICogQHJldHVybiBQcm9taXNlXHJcblx0ICovXHJcblx0cG9zdChvcHRpb25zKVxyXG5cdHtcclxuXHRcdGxldCB4aHIgPSB0aGlzLnhocjtcclxuXHJcblx0XHRpZihvcHRpb25zLmhhc093blByb3BlcnR5KCdiZWZvcmUnKSAmJiB0eXBlb2Ygb3B0aW9ucy5iZWZvcmUgPT0gJ2Z1bmN0aW9uJykge1xyXG5cdFx0XHRvcHRpb25zLmJlZm9yZS5jYWxsKHRoaXMpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcclxuXHRcdFx0aWYodHlwZW9mIG9wdGlvbnMgIT09ICdvYmplY3QnKSB7XHJcblx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKCdnZXQgZXhwZWN0aW5nIGEganNvbiBvYmplY3QgdG8gYmUgcGFzc2VkIGFzIGFuIGFyZ3VtZW50LCBidXQgJysgdHlwZW9mIG9wdGlvbnMgKyAnIHdhcyBwYXNzZWQuJyk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdG9wdGlvbnMuZGF0YSA9IG9wdGlvbnMuZGF0YSB8fCB7fTtcclxuXHJcblx0XHRcdGlmKHR5cGVvZiBvcHRpb25zLmRhdGEgIT09ICdvYmplY3QnKSB7XHJcblx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKCdkYXRhIHByb3BlcnR5IGV4cGVjdGluZyBhIGpzb24gb2JqZWN0IHRvIGJlIHBhc3NlZCBhcyBhbiBhcmd1bWVudCwgYnV0ICcgKyB0eXBlb2Ygb3B0aW9ucy5kYXRhICsgJyB3YXMgcGFzc2VkLicpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHR4aHIub3BlbignUE9TVCcsIG9wdGlvbnMudXJsLCB0cnVlKTtcclxuXHJcblx0XHRcdHhoci5yZXNwb25zZVR5cGUgPSBvcHRpb25zLmRhdGFUeXBlIHx8ICdqc29uJztcclxuXHRcdFx0eGhyLnRpbWVvdXQgPSBvcHRpb25zLnRpbWVvdXQgfHwgMzAwMDtcclxuXHJcblx0XHRcdHhoci5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBmdW5jdGlvbigpIHtcclxuXHRcdFx0XHRpZiAodGhpcy5yZWFkeVN0YXRlID09IDQgJiYgKHRoaXMuc3RhdHVzID49IDQwMCAmJiB0aGlzLnN0YXR1cyA8PSA1MDApKSB7XHJcblx0XHRcdCAgICBcdHJlamVjdCh0aGlzLnJlc3BvbnNlVGV4dCk7XHJcblx0XHRcdCAgICB9XHJcblx0XHRcdCAgICBcclxuXHRcdFx0ICAgIGlmICh0aGlzLnJlYWR5U3RhdGUgIT0gNCB8fCB0aGlzLnN0YXR1cyAhPSAyMDApIHtcclxuXHRcdFx0ICAgIFx0cmV0dXJuO1xyXG5cdFx0XHQgICAgfVxyXG5cdCAgICAgICBcdFxyXG4gICAgICAgXHRcdFx0cmVzb2x2ZSh0aGlzLnJlc3BvbnNlKTtcclxuICAgICAgIFx0XHRcdFxyXG4gICAgICAgXHRcdFx0aWYgKG9wdGlvbnMuaGFzT3duUHJvcGVydHkoJ2FmdGVyJykgJiYgdHlwZW9mIG9wdGlvbnMuYWZ0ZXIgPT0gJ2Z1bmN0aW9uJykge1xyXG5cdFx0XHRcdFx0b3B0aW9ucy5hZnRlci5jYWxsKHRoaXMpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fTtcclxuXHJcblx0XHRcdHhoci5vbmVycm9yID0gZnVuY3Rpb24obWVzc2FnZSkge1xyXG5cdFx0XHRcdGlmKG9wdGlvbnMuaGFzT3duUHJvcGVydHkoJ2Vycm9yJykgJiYgdHlwZW9mIG9wdGlvbnMuZXJyb3IgPT0gJ2Z1bmN0aW9uJykge1xyXG5cdFx0XHRcdFx0b3B0aW9ucy5lcnJvcihtZXNzYWdlKTtcclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdHJlamVjdChtZXNzYWdlKTtcclxuXHRcdFx0fTtcclxuXHJcblx0XHRcdGlmKCEgb3B0aW9ucy5kYXRhKSB7XHJcblx0XHRcdFx0eGhyLnNlbmQobnVsbCk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHZhciBxdWVyeVN0cmluZyA9IE9iamVjdC5rZXlzKG9wdGlvbnMuZGF0YSkubWFwKGZ1bmN0aW9uKGtleSkge1xyXG5cdFx0ICAgICAgICAgICAgcmV0dXJuIGVuY29kZVVSSUNvbXBvbmVudChrZXkpICsgJz0nICtcclxuXHRcdCAgICAgICAgICAgICAgICBcdGVuY29kZVVSSUNvbXBvbmVudChvcHRpb25zLmRhdGFba2V5XSk7XHJcblx0XHQgICAgICAgIFx0fSkuam9pbignJicpO1xyXG5cclxuXHRcdFx0eGhyLnNlbmQocXVlcnlTdHJpbmcpO1xyXG5cdFx0fSk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBNYWtlcyBhIEdFVCBhamF4IHJlcXVlc3QuXHJcblx0ICogXHJcblx0ICogQHBhcmFtIG9iamVjdCB8IG9wdGlvbnNcclxuXHQgKiBAcmV0dXJuIFByb21pc2VcclxuXHQgKi9cclxuXHRnZXQob3B0aW9ucylcclxuXHR7XHJcblx0XHRsZXQgeGhyID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCkgfHwgbmV3IEFjdGl2ZVhPYmplY3QoXCJNaWNyb3NvZnQuWE1MSFRUUFwiKTtcdFx0XHRcclxuXHJcblx0XHRpZiAob3B0aW9ucy5oYXNPd25Qcm9wZXJ0eSgnYmVmb3JlJykgJiYgdHlwZW9mIG9wdGlvbnMuYmVmb3JlID09ICdmdW5jdGlvbicpIHtcclxuXHRcdFx0b3B0aW9ucy5iZWZvcmUuY2FsbCh0aGlzKTtcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XHJcblx0XHRcdGlmICh0eXBlb2Ygb3B0aW9ucyAhPT0gJ29iamVjdCcpIHtcclxuXHRcdFx0XHR0aHJvdyBuZXcgRXJyb3IoJ2dldCBleHBlY3RpbmcgYSBqc29uIG9iamVjdCB0byBiZSBwYXNzZWQgYXMgYW4gYXJndW1lbnQsIGJ1dCAnKyB0eXBlb2Ygb3B0aW9ucyArICcgd2FzIHBhc3NlZC4nKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0b3B0aW9ucy5kYXRhID0gb3B0aW9ucy5kYXRhIHx8IHt9O1xyXG5cclxuXHRcdFx0aWYgKHR5cGVvZiBvcHRpb25zLmRhdGEgIT09ICdvYmplY3QnKSB7XHJcblx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKCdkYXRhIHByb3BlcnR5IGV4cGVjdGluZyBhIGpzb24gb2JqZWN0IHRvIGJlIHBhc3NlZCBhcyBhbiBhcmd1bWVudCwgYnV0ICcgKyB0eXBlb2Ygb3B0aW9ucy5kYXRhICsgJyB3YXMgcGFzc2VkLicpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHR4aHIub3BlbignR0VUJywgb3B0aW9ucy51cmwsIHRydWUpO1xyXG5cclxuXHRcdFx0eGhyLnJlc3BvbnNlVHlwZSA9IG9wdGlvbnMuZGF0YVR5cGUgfHwgJ2pzb24nO1xyXG5cdFx0XHR4aHIudGltZW91dCA9IG9wdGlvbnMudGltZW91dCB8fCAzMDAwO1xyXG5cclxuXHRcdFx0aWYgKHhoci5yZXNwb25zZVR5cGUgPT0gJ2pzb24nKSB7XHJcblx0XHRcdFx0eGhyLnNldFJlcXVlc3RIZWFkZXIoJ0NvbnRlbnQtVHlwZScsICdhcHBsaWNhdGlvbi9qc29uJyk7XHJcblx0XHRcdFx0eGhyLnNldFJlcXVlc3RIZWFkZXIoJ0FjY2VwdCcsICdhcHBsaWNhdGlvbi9qc29uJyk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGlmICh4aHIucmVzcG9uc2VUeXBlID09ICdkb2N1bWVudCcpIHtcclxuXHRcdFx0XHR4aHIub3ZlcnJpZGVNaW1lVHlwZSgndGV4dC94bWwnKTtcclxuXHRcdFx0XHR4aHIuc2V0UmVxdWVzdEhlYWRlcignQ29udGVudC1UeXBlJywgJ3RleHQvaHRtbCcpO1xyXG5cdFx0XHRcdHhoci5zZXRSZXF1ZXN0SGVhZGVyKCdBY2NlcHQnLCAndGV4dC9odG1sJyk7XHRcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0eGhyLm9ucmVhZHlzdGF0ZWNoYW5nZSA9IGZ1bmN0aW9uKCkge1xyXG5cdFx0XHQgICAgaWYgKHRoaXMucmVhZHlTdGF0ZSA9PSA0ICYmICh0aGlzLnN0YXR1cyA+PSA0MDAgJiYgdGhpcy5zdGF0dXMgPD0gNTAwKSkge1xyXG5cdFx0XHQgICAgXHRyZWplY3QodGhpcy5yZXNwb25zZVRleHQpO1xyXG5cdFx0XHQgICAgfVxyXG5cdFx0XHQgICBcclxuXHRcdFx0ICAgIGlmICh0aGlzLnJlYWR5U3RhdGUgPT0gNCAmJiB0aGlzLnN0YXR1cyA9PSAyMDApIHtcclxuXHRcdFx0XHQgICAgbGV0IHJlc3BvbnNlID0gdGhpcy5yZXNwb25zZSB8fCB0aGlzLnJlc3BvbnNlVGV4dDtcclxuXHRcdFx0XHQgICAgcmVzcG9uc2UgPSAoeGhyLnJlc3BvbnNlVHlwZSA9PSAnanNvbicgJiYgdHlwZW9mIHJlc3BvbnNlICE9ICdvYmplY3QnKSA/IEpTT04ucGFyc2UocmVzcG9uc2UpIDogcmVzcG9uc2U7XHJcblx0XHRcdFx0ICAgIHJlc29sdmUocmVzcG9uc2UpO1xyXG5cdCAgICAgICBcdFx0XHRcclxuXHQgICAgICAgXHRcdFx0aWYgKG9wdGlvbnMuaGFzT3duUHJvcGVydHkoJ2FmdGVyJykgJiYgdHlwZW9mIG9wdGlvbnMuYWZ0ZXIgPT0gJ2Z1bmN0aW9uJykge1xyXG5cdFx0XHRcdFx0XHRvcHRpb25zLmFmdGVyLmNhbGwodGhpcyk7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9O1xyXG5cclxuXHRcdFx0eGhyLm9uYWJvcnQgPSB4aHIub25lcnJvciA9IGZ1bmN0aW9uKG1lc3NhZ2UpIHtcclxuXHRcdFx0XHRpZiAob3B0aW9ucy5oYXNPd25Qcm9wZXJ0eSgnZXJyb3InKSAmJiB0eXBlb2Ygb3B0aW9ucy5lcnJvciA9PSAnZnVuY3Rpb24nKSB7XHJcblx0XHRcdFx0XHRvcHRpb25zLmVycm9yKG1lc3NhZ2UpO1xyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0cmVqZWN0KG1lc3NhZ2UpO1xyXG5cdFx0XHR9O1xyXG5cclxuXHRcdFx0aWYgKCEgb3B0aW9ucy5kYXRhKSB7XHJcblx0XHRcdFx0eGhyLnNlbmQobnVsbCk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHZhciBxdWVyeVN0cmluZyA9IE9iamVjdC5rZXlzKG9wdGlvbnMuZGF0YSkubWFwKGZ1bmN0aW9uKGtleSkge1xyXG5cdFx0ICAgICAgICAgICAgcmV0dXJuIGVuY29kZVVSSUNvbXBvbmVudChrZXkpICsgJz0nICtcclxuXHRcdCAgICAgICAgICAgICAgICBcdGVuY29kZVVSSUNvbXBvbmVudChvcHRpb25zLmRhdGFba2V5XSk7XHJcblx0XHQgICAgICAgIFx0fSkuam9pbignJicpO1xyXG5cclxuXHRcdFx0eGhyLnNlbmQocXVlcnlTdHJpbmcpO1xyXG5cdFx0fSk7XHJcblx0fVxyXG59XG5cbmNsYXNzIFVybFxyXG57XHJcblx0IHN0YXRpYyBwcm9jZXNzQWpheERhdGEoc2VsZWN0b3IsIGNvbnRlbnQsIHVybFBhdGgpXHJcblx0IHtcclxuXHQgICAgbGV0IGNvbnRleHQgPSBET00uZmluZChzZWxlY3Rvcik7XHJcblxyXG5cdCAgICBjb250ZXh0LmlubmVySFRNTCA9IGNvbnRlbnQ7XHJcblx0ICAgIGxldCB0aXRsZSA9IERPTS5maW5kKCd0aXRsZScsIGNvbnRleHQpO1xyXG5cdCAgICBkb2N1bWVudC50aXRsZSA9IHRpdGxlLmlubmVySFRNTDtcclxuXHQgICAgd2luZG93Lmhpc3RvcnkucHVzaFN0YXRlKHtcImh0bWxcIjpjb250ZW50LFwicGFnZVRpdGxlXCI6IHRpdGxlLmlubmVySFRNTH0sIFwiXCIsIHVybFBhdGgpO1xyXG5cclxuXHQgXHR3aW5kb3cub25wb3BzdGF0ZSA9IGZ1bmN0aW9uKGUpIHtcclxuXHRcdCAgICBpZiAoZS5zdGF0ZSkge1xyXG5cdFx0ICAgICAgICBjb250ZXh0LmlubmVySFRNTCA9IGUuc3RhdGUuaHRtbDtcclxuXHRcdCAgICAgICAgZG9jdW1lbnQudGl0bGUgPSBlLnN0YXRlLnBhZ2VUaXRsZTtcclxuXHRcdCAgICB9XHJcblx0XHR9O1xyXG5cdCB9XHJcblxyXG5cdC8qKlxyXG5cdCAqIE1vZGlmaWVzIHRoZSBnZXQgcGFyYW1ldGVyIGluIHRoZSB1cmwuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gc3RyaW5nIHwgdXJsXHJcblx0ICogQHBhcmFtIHN0cmluZyB8IGtleVxyXG5cdCAqIEBwYXJhbSBudW1iZXIgfCB2YWx1ZVxyXG5cdCAqIEBwYXJhbSBzdHJpbmcgfCBzZXBhcmF0b3JcclxuXHQgKiBAcmV0dXJuIHN0cmluZ1xyXG5cdCAqL1xyXG5cdHN0YXRpYyBjaGFuZ2VRdWVyeVBhcmFtZXRlclZhbHVlKHVybCwga2V5LCB2YWx1ZSwgc2VwYXJhdG9yID0gJz0nKSBcclxuXHR7XHJcblx0XHRsZXQgcmVnRXhwID0gbmV3IFJlZ0V4cChcIihbPyZdKVwiICsga2V5ICsgc2VwYXJhdG9yICsgXCIuKj8oJnwkKVwiLCBcImlcIik7XHJcblx0XHRsZXQgcGFpclNlcGFyYXRvciA9IHVybC5pbmRleE9mKCc/JykgIT09IC0xID8gXCImXCIgOiBcIj9cIjtcclxuXHRcdCAgXHJcblx0XHRpZiAodXJsLm1hdGNoKHJlZ0V4cCkpIHtcclxuXHRcdFx0cmV0dXJuIHVybC5yZXBsYWNlKHJlZ0V4cCwgJyQxJyArIGtleSArIHNlcGFyYXRvciArIHZhbHVlICsgJyQyJyk7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0ICAgIHJldHVybiB1cmwgKyBwYWlyU2VwYXJhdG9yICsga2V5ICsgc2VwYXJhdG9yICsgdmFsdWU7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBDaGFuZ2VzIHRoZSB1cmwgdG8gYSBnaXZlbiBwYWdlIG51bWJlci5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSBzdHJpbmcgfCBwYXJhbWV0ZXJLZXlcclxuXHQgKiBAcGFyYW0gc3RyaW5nIHwgcGFyYW1ldGVyVmFsdWVcclxuXHQgKiBAcGFyYW0gc3RyaW5nIHwgc2VwYXJhdG9yXHJcblx0ICogQHJldHVybiB2b2lkXHJcblx0ICovXHJcblx0c3RhdGljIGNoYW5nZVBhcmFtZXRlcihwYXJhbWV0ZXJLZXksIHBhcmFtZXRlclZhbHVlLCBzZXBhcmF0b3IgPSAnPScpXHJcblx0e1xyXG5cdFx0cGFyYW1ldGVyVmFsdWUgPSAgcGFyYW1ldGVyVmFsdWUgfHwgdGhpcy5xdWVyeVN0cmluZygpW3BhcmFtZXRlcktleV07XHJcblx0XHRsZXQgcmVxdWVzdGVkVXJsID0gdGhpcy5jaGFuZ2VRdWVyeVBhcmFtZXRlclZhbHVlKHdpbmRvdy5sb2NhdGlvbi5ocmVmLCBwYXJhbWV0ZXJLZXksIHBhcmFtZXRlclZhbHVlLCBzZXBhcmF0b3IpO1xyXG5cdFx0d2luZG93Lmhpc3RvcnkucmVwbGFjZVN0YXRlKCcnLCAnJywgcmVxdWVzdGVkVXJsKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIENoYW5nZXMgdGhlIHVybC5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSBzdHJpbmcgfCB1cmxcclxuXHQgKiBAcmV0dXJuIHZvaWRcclxuXHQgKi9cclxuXHRzdGF0aWMgY2hhbmdlKHVybClcclxuXHR7XHJcblx0XHRpZiAodXJsLmNoYXJBdCgwKSAhPSAnLycpIHtcclxuXHRcdFx0dXJsID0gJy8nICsgdXJsO1xyXG5cdFx0fVxyXG5cclxuXHRcdGlmICh1cmwgPT0gJy8nKSB7XHJcblx0XHRcdHVybCA9ICcvaG9tZSc7XHJcblx0XHR9XHJcblx0XHRcclxuXHRcdHdpbmRvdy5oaXN0b3J5LnB1c2hTdGF0ZSgnJywgJycsIHVybCk7XHJcblx0XHRcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEdldCB0aGUgZ2V0IHZhcmlhYmxlcyBmcm9tIHRoZSB1cmwuXHJcblx0ICpcclxuXHQgKiBAcmV0dXJuIGFycmF5XHJcblx0ICovXHJcblx0c3RhdGljIHF1ZXJ5U3RyaW5nKCkgXHJcblx0e1xyXG5cdFx0bGV0IHZhcnMgPSB7fTtcclxuXHRcdGxldCBwYXJ0cyA9IHdpbmRvdy5sb2NhdGlvbi5ocmVmLnJlcGxhY2UoL1s/Jl0rKFtePSZdKyk9KFteJl0qKS9naSwgZnVuY3Rpb24obSwga2V5LCB2YWx1ZSkge1xyXG5cdFx0XHR2YXJzW2tleV0gPSB2YWx1ZTtcclxuXHRcdH0pO1xyXG5cclxuXHRcdHJldHVybiB2YXJzO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQ2hlY2tzIGlmIGEgZ2l2ZW4gdXJsIGhhdmUgcGFyYW1ldGVycy5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSBzdHJpbmcgfCB1cmxcclxuXHQgKiBAcmV0dXJuIGJvb2xcclxuXHQgKi9cclxuXHRzdGF0aWMgaGFzUGFyYW1ldGVycyh1cmwpXHJcblx0e1xyXG5cdFx0cmV0dXJuIHVybC5pbmRleE9mKCc/JykgPj0gMDtcclxuXHR9XHJcblxyXG5cclxufVxuXG4vKipcclxuICogQGNsYXNzIFJvdXRlclxyXG4gKlxyXG4gKiBIYW5kbGVzIHRoZSBjbGllbnQtc2lkZSByb3V0aW5nLlxyXG4gKi9cclxuXHJcbmNsYXNzIFJvdXRlclxyXG57XHJcblx0LyoqXHJcblx0ICogLSBJbml0aWFsaXplIHRoZSBjb250YWluZXJcclxuXHQgKiAtIEluaXRpYWxpemUgdGhlIHJvdXRlc1xyXG5cdCAqIC0gQXR0YWNoIGV2ZW50IGxpc3RlbmVycyBmb3I6XHJcblx0ICogY2xpY2ssIHBvcHN0YXRlLCB0b3VjaHN0YXJ0LCBoYXNoY2hhbmdlLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIEFwcFxcQ29yZVxcQ29udGFpbmVyIFxyXG5cdCAqIEByZXR1cm4gdm9pZFxyXG5cdCAqL1xyXG5cdGNvbnN0cnVjdG9yKGNvbnRhaW5lcilcclxuXHR7XHJcblx0XHR0aGlzLmxvY2FsID0gdHJ1ZTtcclxuXHRcdHRoaXMuY29udGFpbmVyID0gY29udGFpbmVyO1xyXG5cdFx0dGhpcy5yb3V0ZXMgPSB0aGlzLmJ1aWxkUm91dGVzKCk7XHJcblx0XHR3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncG9wc3RhdGUnLCB0aGlzLmVudHJ5LmJpbmQodGhpcykpO1xyXG5cdFx0d2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2hhc2hjaGFuZ2UnLCB0aGlzLmVudHJ5LmJpbmQodGhpcykpO1xyXG5cdFx0d2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoc3RhcnQnLCB0aGlzLmVudHJ5LmJpbmQodGhpcykpO1xyXG5cdFx0d2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5lbnRyeS5iaW5kKHRoaXMpKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEVudHJ5IHBvaW50IGZvciB0aGUgYXBwbGljYXRpb24uXHJcblx0ICogZnJvbSBoZXJlIHdpbGwgYmUgZGVjaWRlZCB3aGljaFxyXG5cdCAqIGNvbXBvbmVudCBzaG91bGQgYmUgZGlzcGxheWVkLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIG9iamVjdCB8IGV2ZW50XHJcblx0ICogQHJldHVybiB2b2lkXHJcblx0ICovXHJcblx0ZW50cnkoZXZlbnQpXHJcblx0e1xyXG5cdFx0bGV0IHVybCA9IHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZTtcclxuXHRcdGxldCBxdWVyeVN0cmluZztcclxuXHJcblx0XHRpZiAodHlwZW9mIHVybCA9PSAndW5kZWZpbmVkJykge1xyXG5cdFx0XHRyZXR1cm47XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKFVybC5oYXNQYXJhbWV0ZXJzKHVybCkpIHtcclxuXHRcdFx0bGV0IHBhcnRzID0gdXJsLnNwbGl0KCc/JylbMV07XHJcblx0XHRcdHF1ZXJ5U3RyaW5nID0gcGFydHNbMV07XHJcblx0XHRcdHVybCA9IHBhcnRzWzBdLnN1YnN0cmluZyhwYXJ0c1swXS5sZW5ndGgtMSk7XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKHVybC5pbmRleE9mKCcjIy8nKSAhPSAtMSkge1xyXG5cdFx0XHR1cmwgPSB1cmwucmVwbGFjZSgnIyMvJywgJycpO1xyXG5cdFx0fVxyXG5cclxuXHRcdGlmIChxdWVyeVN0cmluZykge1xyXG5cdFx0XHR1cmwgPSB1cmwgKyBxdWVyeVN0cmluZztcclxuXHRcdH1cclxuXHJcblx0XHRpZiAoZXZlbnQpIHtcclxuXHRcdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuXHJcblx0XHRcdGlmICh0eXBlb2YgZXZlbnQudGFyZ2V0LnBhdGhuYW1lICE9ICd1bmRlZmluZWQnKSB7XHJcblx0XHRcdFx0dXJsID0gZXZlbnQudGFyZ2V0LnBhdGhuYW1lO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0dGhpcy5jb250YWluZXIuRXZlbnRzLnN1YnNjcmliZSgncm91dGUuZGlzcGF0Y2hlZCcsIGZ1bmN0aW9uKHVybCkge1xyXG5cdFx0XHRpZiAodGhpcy5sb2NhbCkge1xyXG5cdFx0XHRcdHVybCA9ICcvY2xpZW50JyArIHVybDtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0VXJsLmNoYW5nZSh1cmwpO1xyXG5cdFx0XHRcclxuXHRcdH0uYmluZCh0aGlzKSk7XHJcblxyXG5cdFx0Ly8gbWVhbnMgdGhpcyBpcyBhIGRlbW8uXHJcblx0XHQvLyBmb3IgdGhlIG1lYW53aGlsZSwgQHRvZG8gZmluZCBhIGRpZmZlcmVudCBzb2x1dGlvblxyXG5cdFx0aWYgKHRoaXMubG9jYWwpIHtcclxuXHRcdFx0dXJsID0gdXJsLnJlcGxhY2UoJy9jbGllbnQnLCAnJyk7XHJcblx0XHR9XHJcblxyXG5cdFx0dGhpcy5jdXJyZW50ID0gdXJsO1xyXG5cdFx0dGhpcy5kaXNwYXRjaCh1cmwpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogRGlzcGFjaGVzIHRoZSByb3V0ZSBmb3IgYSBnaXZlbiB1cmwuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gc3RyaW5nIHwgdXJsXHJcblx0ICogQHJldHVybiB2b2lkXHJcblx0ICovXHJcblx0ZGlzcGF0Y2godXJsKVxyXG5cdHtcclxuXHRcdC8vIEB0b2RvIGNoZWNrIGZvciBwYXJhbWV0ZXJzIHJvdXRlcyBhbmQgcmVwbGFjZSBmZXRjaCB0aGUgdmFsdWUgZnJvbSB0aGUgdXJsLlxyXG5cdFx0Y29uc29sZS5sb2codXJsKTtcclxuXHJcblx0XHRpZiAodGhpcy5yb3V0ZXMuaW5kZXhPZih1cmwpICE9IC0xKSB7XHJcblx0XHRcdHN3aXRjaCh1cmwpXHJcblx0XHRcdHtcclxuXHRcdFx0XHRjYXNlICcvJzpcclxuXHRcdFx0XHRjYXNlICcvaG9tZSc6XHJcblx0XHRcdFx0XHRjb25zb2xlLmxvZygnaG9tZScpO1xyXG5cdFx0XHRcdFx0dGhpcy5jb250YWluZXIuUHJvZHVjdHMuaGlkZUFsbCgpO1xyXG5cdFx0XHRcdFx0dGhpcy5jb250YWluZXIuRmlsdGVyLnNob3coKTtcclxuXHRcdFx0XHRcdHRoaXMuY29udGFpbmVyLlByb2R1Y3RzLnNob3coKTtcclxuXHRcdFx0XHRcdHRoaXMuY29udGFpbmVyLkNhcnQuc2hvdygpO1xyXG5cdFx0XHRcdFx0dGhpcy5jb250YWluZXIuUGFnaW5hdGlvbi5zaG93KCk7XHJcblx0XHRcdFx0XHRicmVhaztcclxuXHRcdFx0XHRjYXNlICcvY2hlY2tvdXQnOlxyXG5cdFx0XHRcdFx0Y29uc29sZS5sb2coJ2NoZWNrb3V0Jyk7XHJcblx0XHRcdFx0XHR0aGlzLmNvbnRhaW5lci5DaGVja291dC5oaWRlQWxsKCk7XHJcblx0XHRcdFx0XHR0aGlzLmNvbnRhaW5lci5DaGVja291dC5zaG93KCk7XHJcblx0XHRcdFx0XHRicmVhaztcclxuXHRcdFx0XHRjYXNlICcvaW5mby86cHJvZHVjdCc6XHJcblx0XHRcdFx0XHRjb25zb2xlLmxvZygnc2luZ2xlIHByb2R1Y3QgaW5mbyBwYWdlJyk7XHJcblx0XHRcdFx0XHQvLyBAdG9kbyBidWlsZCBwcm9kdWN0IGluZm8gY29tcG9uZW50XHJcblx0XHRcdFx0XHRicmVhaztcclxuXHRcdFx0XHRkZWZhdWx0OlxyXG5cdFx0XHRcdFx0Y29uc29sZS5sb2coJ2RlZmF1bHQgcm91dGUnKTtcclxuXHRcdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHR9XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHR0aHJvdyBuZXcgRXJyb3IoJ05vIG1hdGNoaW5nIHJvdXRlIGZvdW5kIScpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHRoaXMuY29udGFpbmVyLkV2ZW50cy5wdWJsaXNoKCdyb3V0ZS5kaXNwYXRjaGVkJywgdXJsKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEJ1aWxkcyB0aGUgcm91dGVzLlxyXG5cdCAqXHJcblx0ICogQHJldHVybiBhcnJheVxyXG5cdCAqL1xyXG5cdGJ1aWxkUm91dGVzKClcclxuXHR7XHJcblx0XHRyZXR1cm4gWycvJywgJy9ob21lJywgJy9jaGVja291dCcsICcvaW5mby86cHJvZHVjdCddO1xyXG5cdH1cclxufVxuXG5sZXQgZGVmYXVsdE1lc3NhZ2UkMiA9ICdUaGUgZXZlbnQgeW91IGNhbGxlZCBkb2VzIG5vdCBleGlzdHMgb3IgeW91IHN1cHBsaWVkIHdyb25nIGFyZ3VtZW50JztcclxuXHJcbmNsYXNzIEJhZEV2ZW50Q2FsbEV4Y2VwdGlvbiBleHRlbmRzIEV4Y2VwdGlvbkhhbmRsZXJcclxue1xyXG5cdGNvbnN0cnVjdG9yKG1lc3NhZ2UgPSBudWxsKSBcclxuXHR7XHJcblx0XHRtZXNzYWdlID0gbWVzc2FnZSB8fCBkZWZhdWx0TWVzc2FnZSQyO1xyXG5cdFx0c3VwZXIobWVzc2FnZSk7XHJcbiAgICBcdHN1cGVyLnN0YWNrVHJhY2UodGhpcywgbWVzc2FnZSk7XHJcbiAgICB9XHJcbn1cblxuLyoqXHJcbiAqIEBmaWxlIFxyXG4gKiBFdmVudE1hbmFnZXIgY2xhc3MuXHJcbiAqXHJcbiAqIEhhbmRsZXMgc3Vic2NyaXBpb25zIGFuZCBwdWJsaXNoaW5nIG9mIGV2ZW50cy5cclxuICovXHJcblxyXG5jbGFzcyBFdmVudE1hbmFnZXJcclxue1xyXG5cdC8qKlxyXG5cdCAqIFN0b3JlcyB0aGUgZXZlbnRzIGNhbGxiYWNrcy5cclxuXHQgKiBcclxuXHQgKiBAdmFyIGFycmF5XHJcblx0ICovXHJcblx0Y29uc3RydWN0b3IoKVxyXG5cdHtcclxuXHRcdHRoaXMuZXZlbnRzID0ge307XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBTdWJzY3JpYmluZyB0byBhbiBldmVudC5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSBzdHJpbmcgfCBuYW1lXHJcblx0ICogQHBhcmFtIGZ1bmN0aW9uIHwgY2FsbGJhY2tcclxuXHQgKiBAcmV0dXJuIHZvaWRcclxuXHQgKi9cclxuXHRzdWJzY3JpYmUobmFtZSwgY2FsbGJhY2spIFxyXG5cdHtcclxuXHRcdGlmICh0eXBlb2YgY2FsbGJhY2sgIT09ICdmdW5jdGlvbicpIHtcclxuXHRcdFx0dGhyb3cgbmV3IEludmFsaWRBcmd1bWVudEV4Y2VwdGlvbjtcclxuXHRcdH1cclxuXHJcblx0XHRpZiAodHlwZW9mIHRoaXMuZXZlbnRzW25hbWVdID09ICd1bmRlZmluZWQnKSB7XHJcblx0XHRcdHRoaXMuZXZlbnRzW25hbWVdID0gW107XHJcblx0XHR9XHJcblxyXG5cdFx0dGhpcy5ldmVudHNbbmFtZV0ucHVzaChjYWxsYmFjayk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBQdWJsaXNoIGFuIGV2ZW50IHRvIGFsbCBzdWJzY3JpYmVycy5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSBzdHJpbmcgfCBuYW1lXHJcblx0ICogQHBhcmFtIGxpc3QgfCBkYXRhXHJcblx0ICogQHJldHVybiB2b2lkXHJcblx0ICovXHJcblx0cHVibGlzaChuYW1lLCAuLi5kYXRhKSBcclxuXHR7XHJcblx0XHRkYXRhID0gZGF0YSB8fCBudWxsO1xyXG5cclxuXHRcdC8vIElmIHRoZXJlIGFyZSBubyBzdWJzY3JpYmVycyBzaW1wbHkgaWdub3JlIHRoYXQgZXZlbnQuXHJcblx0XHRpZiAodHlwZW9mIHRoaXMuZXZlbnRzW25hbWVdID09ICd1bmRlZmluZWQnKSB7XHJcblx0XHRcdHJldHVybjtcclxuXHRcdH1cclxuXHJcblx0XHR0aGlzLmV2ZW50c1tuYW1lXS5mb3JFYWNoKGZ1bmN0aW9uKGNhbGxiYWNrKSB7XHJcblx0XHRcdGlmKHR5cGVvZiBjYWxsYmFjayAhPSAnZnVuY3Rpb24nKSB7XHJcblx0XHRcdFx0dGhyb3cgbmV3IEludmFsaWRBcmd1bWVudEV4Y2VwdGlvbignc3Vic2NyaWJlKCkgc2hvdWxkIHJlY2lldmUgY2FsbGJhY2sgYXMgc2Vjb25kIHBhcmFtZXRlciwgYnV0ICcrIHR5cGVvZiBjYWxsYmFjayArJyB3YXMgcGFzc2VkJyk7XHJcblx0XHRcdH1cclxuXHRcdFx0XHJcblx0XHRcdHJldHVybiBjYWxsYmFjayguLi5kYXRhKTtcclxuXHRcdH0pO1xyXG5cdH1cclxufVxuXG4vKipcclxuICogQGZpbGUgXHJcbiAqIENvb2tpZSBjbGFzcy5cclxuICpcclxuICogQWRkcyBzb21lIHVzZWZ1bCBmdW5jdGlvbmFsaXR5IGZvclxyXG4gKiBzZXR0aW5nIG9yIGdldHRpbmcgY29va2llcy5cclxuICovXHJcblx0XHJcbmNsYXNzIENvb2tpZVxyXG57XHJcblx0LyoqXHJcbiBcdCogU2V0cyBhIGNvb2tpZS5cclxuIFx0KiBcclxuIFx0KiBAcGFyYW0gc3RyaW5nIHwgbmFtZVxyXG4gXHQqIEBwYXJhbSBKU09OIHwgdmFsdWVcclxuIFx0KiBAcGFyYW0gaW50ZWdlciB8IGRheXNcclxuIFx0KiBAcmV0dXJuIHZvaWRcclxuXHQqL1xyXG5cdHN0YXRpYyBzZXQobmFtZSwgdmFsdWUsIGRheXMpIFxyXG5cdHtcclxuXHRcdGlmICh2YWx1ZS5jb25zdHJ1Y3Rvci5uYW1lICA9PSAnT2JqZWN0JyB8fCB2YWx1ZS5jb25zdHJ1Y3Rvci5uYW1lID09ICdBcnJheScpIHtcclxuXHRcdFx0dmFsdWUgPSBKU09OLnN0cmluZ2lmeSh2YWx1ZSk7XHJcblx0XHR9XHJcblxyXG5cdFx0ZGF5cyA9IGRheXMgfHwgMTA7XHJcblxyXG5cdCAgICBsZXQgZXhwaXJlcztcclxuXHQgICAgXHJcblx0ICAgIGlmIChkYXlzKSB7XHJcblx0ICAgICAgICBsZXQgZGF0ZSA9IG5ldyBEYXRlKCk7XHJcblx0ICAgICAgICBkYXRlLnNldFRpbWUoZGF0ZS5nZXRUaW1lKCkgKyAoZGF5cyAqIDI0ICogNjAgKiA2MCAqIDEwMDApKTtcclxuXHQgICAgICAgIGV4cGlyZXMgPSBcIjsgZXhwaXJlcz1cIiArIGRhdGUudG9HTVRTdHJpbmcoKTtcclxuXHQgICAgfSBlbHNlIHtcclxuXHQgICAgICAgIGV4cGlyZXMgPSBcIlwiO1xyXG5cdCAgICB9XHJcblxyXG5cdCAgICBkb2N1bWVudC5jb29raWUgPSBuYW1lICsgXCI9XCIgKyB2YWx1ZSArIGV4cGlyZXMgKyBcIjsgcGF0aD0vXCI7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBSZXRyaWV2ZXMgdGhlIGNvb2tpZSBieSBuYW1lLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIHN0cmluZyB8IG5hbWVcclxuIFx0ICogQHJldHVybiBKU09OXHJcblx0ICovXHJcblx0c3RhdGljIGdldChuYW1lKSBcclxuXHR7XHJcblx0ICAgIGlmIChkb2N1bWVudC5jb29raWUubGVuZ3RoID4gMCkge1xyXG5cdCAgICAgICAgbGV0IGNfc3RhcnQgPSBkb2N1bWVudC5jb29raWUuaW5kZXhPZihuYW1lICsgXCI9XCIpO1xyXG5cdCAgICAgICAgXHJcblx0ICAgICAgICBpZiAoY19zdGFydCAhPSAtMSkge1xyXG5cdCAgICAgICAgICAgIGNfc3RhcnQgPSBjX3N0YXJ0ICsgbmFtZS5sZW5ndGggKyAxO1xyXG5cdCAgICAgICAgICAgIGxldCBjX2VuZCA9IGRvY3VtZW50LmNvb2tpZS5pbmRleE9mKFwiO1wiLCBjX3N0YXJ0KTtcclxuXHQgICAgICAgICAgICBcclxuXHQgICAgICAgICAgICBpZiAoY19lbmQgPT0gLTEpIHtcclxuXHQgICAgICAgICAgICAgICAgY19lbmQgPSBkb2N1bWVudC5jb29raWUubGVuZ3RoO1xyXG5cdCAgICAgICAgICAgIH1cclxuXHJcblx0ICAgICAgICAgICAgcmV0dXJuIEpTT04ucGFyc2UodW5lc2NhcGUoZG9jdW1lbnQuY29va2llLnN1YnN0cmluZyhjX3N0YXJ0LCBjX2VuZCkpKTtcclxuXHQgICAgICAgIH1cclxuXHQgICAgfVxyXG5cclxuXHQgICAgcmV0dXJuIHt9O1xyXG5cdH1cclxufVxuXG4vKipcclxuICogQGNsYXNzIEJhc2VDb21wb25lbnRcclxuICogXHJcbiAqIENvbW1vbiBmdW5jdGlvbmFsbGl0eSBvZiBjb21wb25lbnRzLiBcclxuICovXHJcblxyXG5jbGFzcyBCYXNlQ29tcG9uZW50XHJcbntcclxuXHQvKipcclxuXHQgKiBIaWRlcyB0aGUgY29tcG9uZW50IGZyb20gdGhlIERPTS5cclxuXHQgKlxyXG5cdCAqIEByZXR1cm4gdm9pZCBcclxuXHQgKi9cclxuXHRoaWRlKClcclxuXHR7XHJcblx0XHRpZiAodHlwZW9mIHRoaXMuZWxlbWVudCAhPSAndW5kZWZpbmVkJykge1xyXG5cdFx0XHR0aGlzLmVsZW1lbnQuc3R5bGUuZGlzcGxheSA9ICdub25lJztcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFNob3dzIHRoZSBlbGVtZW50IG9uIHRoZSBET00uXHJcblx0ICpcclxuXHQgKiBAcmV0dXJuIHZvaWQgXHJcblx0ICovXHJcblx0c2hvdygpXHJcblx0e1xyXG5cdFx0aWYgKHR5cGVvZiB0aGlzLmVsZW1lbnQgIT0gJ3VuZGVmaW5lZCcpIHtcclxuXHRcdFx0dGhpcy5lbGVtZW50LnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogRW1wdHkgdGhlIGNvbXBvbmVudC5cclxuXHQgKlxyXG5cdCAqIEByZXR1cm4gdm9pZCBcclxuXHQgKi9cclxuXHRlbXB0eSgpXHJcblx0e1xyXG5cdFx0aWYgKHR5cGVvZiB0aGlzLmVsZW1lbnQgIT0gJ3VuZGVmaW5lZCcpIHtcclxuXHRcdFx0dGhpcy5lbGVtZW50LmlubmVySFRNTCA9ICcnO1xyXG5cdFx0fVxyXG5cdH1cclxufVxuXG5sZXQgZGVmYXVsdE1lc3NhZ2UkMyA9ICdUaGUgaXRlbSB5b3UgYXJlIHRyeWluZyB0byBhZGQgbXVzdCBjb250YWluIGEgdW5pcXVlIGlkJztcclxuXHJcbmNsYXNzIEludmFsaWRDYXJ0SXRlbUV4Y2VwdGlvbiBleHRlbmRzIEV4Y2VwdGlvbkhhbmRsZXJcclxue1xyXG5cdGNvbnN0cnVjdG9yKG1lc3NhZ2UgPSBudWxsKSBcclxuXHR7XHJcblx0XHRtZXNzYWdlID0gbWVzc2FnZSB8fCBkZWZhdWx0TWVzc2FnZSQzO1xyXG5cdFx0c3VwZXIobWVzc2FnZSk7XHJcbiAgICBcdHN1cGVyLnN0YWNrVHJhY2UodGhpcywgbWVzc2FnZSk7XHJcbiAgICB9XHJcbn1cblxuLy8gSGVscGVyc1xyXG4vLyBDb21wb25lbnRzXHJcbi8vIEV4Y2VwdGlvbnNcclxuLyoqXHJcbiAqIFRoZSBkZWZhdWx0IHNldHRpbmdzIG9mIHRoZSBjYXJ0LlxyXG4gKlxyXG4gKiBAdmFyIG9iamVjdFxyXG4gKi9cclxubGV0IGRlZmF1bHRTZXR0aW5ncyQxID0ge1xyXG5cdGVsZW1lbnQ6ICcuY2FydCcsXHJcblx0Y29va2llX25hbWU6ICdjYXJ0JyxcclxuXHRwcmV2aWV3X2NsYXNzOiAnJyxcclxuXHRsb2FkZXI6ICcnLFxyXG5cdGNsYXNzOiAnJyxcclxuXHR3aWR0aDogJzYwcHgnLFxyXG5cdGhlaWdodDogJzYwcHgnLFxyXG5cdHBsYWNlbWVudDogJ3JpZ2h0LXRvcCcsXHJcblx0Zml4ZWQ6IHRydWUsXHJcblx0aG92ZXJfY29sb3I6ICdvcmFuZ2UnLFxyXG5cdG5vX2NzczogZmFsc2UsXHJcbn07XHJcblxyXG4vKipcclxuICogU3RvcmVzIHRoZSBjb250YWluZXIgb2JqZWN0LlxyXG4gKlxyXG4gKiBAdmFyIFxcQ29yZVxcQ29udGFpbmVyXHJcbiAqL1xyXG5sZXQgQ29udGFpbmVyO1xyXG5cclxuLyoqXHJcbiAqIFN0b3JlcyB0aGUgZXZlbnQgbWFuYWdlciBvYmplY3QuXHJcbiAqXHJcbiAqIEB2YXIgXFxDb3JlXFxFdmVudE1hbmFnZXJcclxuICovXHJcbmxldCBFdmVudE1hbmFnZXIkMjtcclxuXHJcbi8qKlxyXG4gKiBTdG9yZXMgdGhlIHJlcXVlc3Qgb2JqZWN0LlxyXG4gKlxyXG4gKiBAdmFyIFxcSGVscGVyc1xcUmVxdWVzdFxyXG4gKi9cclxubGV0IEh0dHA7XHJcblxyXG4vKipcclxuICogU3RvcmVzIHRoZSBjYXJ0IGxvYWRlci5cclxuICpcclxuICogQHZhciBIVE1MRGl2RWxlbWVudFxyXG4gKi9cclxubGV0IGxvYWRpbmdPdmVybGF5O1xyXG5cclxuLyoqXHJcbiAqIFN0b3JlcyB0aGUgaXRlbXMgd3JhcHBlci5cclxuICpcclxuICogQHZhciBIVE1MRGl2RWxlbWVudFxyXG4gKi9cclxubGV0IGl0ZW1zRGl2O1xyXG5cclxuLyoqXHJcbiAqIEBjbGFzcyBDYXJ0XHJcbiAqXHJcbiAqIEhhbmRsZXMgYWRkaW5nLCByZW1vdmluZywgY2FsY3VsYXRpb25zIG9mIGl0ZW1zLlxyXG4gKi9cclxuXHJcbmNsYXNzIENhcnQgZXh0ZW5kcyBCYXNlQ29tcG9uZW50XHJcbntcclxuXHQvKipcclxuXHQgKiAtIEluaXRpYWxpemUgdGhlIElvQyBjb250YWluZXJcclxuXHQgKiAtIEluaXRpYWxpemUgdGhlIFJlcXVlc3RcclxuXHQgKiAtIEluaXRpYWxpemUgdGhlIEV2ZW50TWFuYWdlclxyXG5cdCAqIC0gQ3JlYXRlcyB0aGUgcHJldmlldyBhbmQgdGhlIGljb24gb2YgdGhlIGNhcnQuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gXFxDb3JlXFxDb250YWluZXIgfCBjb250YWluZXJcclxuXHQgKiBAcGFyYW0gXFxIZWxwZXJzXFxSZXF1ZXN0IHwgaHR0cFxyXG5cdCAqIEBwYXJhbSBcXENvcmVcXEV2ZW50TWFuYWdlciB8IGV2ZW50TWFuYWdlclxyXG5cdCAqIEByZXR1cm4gdm9pZFxyXG5cdCAqL1xyXG5cdGNvbnN0cnVjdG9yKGNvbnRhaW5lciwgaHR0cCwgZXZlbnRNYW5hZ2VyKSBcclxuXHR7XHJcblx0XHRzdXBlcigpO1xyXG5cclxuXHRcdENvbnRhaW5lciA9IGNvbnRhaW5lcjtcclxuXHRcdEh0dHAgPSBodHRwO1xyXG5cdFx0RXZlbnRNYW5hZ2VyJDIgPSBldmVudE1hbmFnZXI7XHJcblx0XHRcclxuXHRcdHRoaXMucHJldmlld0VsZW1lbnQgPSB0aGlzLmNyZWF0ZVByZXZpZXdFbGVtZW50KCk7XHJcblx0XHR0aGlzLmljb24gPSBjcmVhdGVJY29uLmNhbGwodGhpcyk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBTZXRzIHRoZSBvYmplY3QgYnkgdGhlIHVzZXJzIHNldHRpbmcuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gb2JqZWN0IHwgc2V0dGluZ3NcclxuXHQgKiBAcmV0dXJuIHZvaWRcclxuXHQgKi9cclxuXHRzZXR1cChzZXR0aW5ncylcclxuXHR7XHJcblx0XHRpZiAodHlwZW9mIHNldHRpbmdzICE9ICdvYmplY3QnKSB7XHJcblx0XHRcdHRocm93IG5ldyBJbnZhbGlkQXJndW1lbnRFeGNlcHRpb24kMTtcclxuXHRcdH1cclxuXHJcblx0XHR0aGlzLnNldHRpbmdzID0gQ29tbW9uLmV4dGVuZChkZWZhdWx0U2V0dGluZ3MkMSwgc2V0dGluZ3MpO1xyXG5cclxuXHRcdHRoaXMuc2V0RWxlbWVudCh0aGlzLnNldHRpbmdzLmVsZW1lbnQpO1xyXG5cclxuXHRcdERPTS5hZGRDbGFzcyh0aGlzLnByZXZpZXdFbGVtZW50LCAnY2xvc2VkJyk7XHJcblx0XHRET00uYWRkQ2xhc3ModGhpcy5wcmV2aWV3RWxlbWVudCwgdGhpcy5zZXR0aW5ncy5wcmV2aWV3X2NsYXNzKTtcclxuXHRcdFxyXG5cdFx0dGhpcy5kcmF3KCk7XHJcblx0XHR0aGlzLmJpbmRFdmVudExpc3RlbmVycygpO1xyXG5cdFx0XHJcblx0XHRpZiAodGhpcy5pc0VtcHR5KENvb2tpZS5nZXQodGhpcy5zZXR0aW5ncy5jb29raWVfbmFtZSkpKSB7XHJcblx0XHRcdHRoaXMuc2V0dXBDYXJ0KCk7XHJcblx0XHRcdFxyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQ2hlY2tzIGlmIHRoZSBjYXJ0IGlzIGVtcHR5XHJcblx0ICpcclxuXHQgKiBAcGFyYW0gb2JqZWN0IHwgY2FydFxyXG5cdCAqIEByZXR1cm4gYm9vbFxyXG5cdCAqL1xyXG5cdGlzRW1wdHkoY2FydClcclxuXHR7XHJcblx0XHRyZXR1cm4gQ29tbW9uLmVtcHR5T2JqZWN0KGNhcnQpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogSW5pdGlhbGl6ZS9TZXRzIHRoZSBjYXJ0IGFzIGEgY29va2llLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIG9iamVjdCB8IGNhcnRcclxuXHQgKiBAcmV0dXJuIHZvaWRcclxuXHQgKi9cclxuXHRzZXR1cENhcnQoKVxyXG5cdHtcclxuXHRcdHRoaXMuY2FydCA9IHt9O1xyXG5cdFx0dGhpcy5jYXJ0LmlkID0gU3RyLnJhbmRvbSgxMCk7XHJcblx0XHR0aGlzLmNhcnQuaXRlbXMgPSBbXTtcclxuXHRcdHRoaXMuY2FydC5mYXZvcml0ZXMgPSBbXTtcclxuXHRcdENvb2tpZS5zZXQodGhpcy5zZXR0aW5ncy5jb29raWVfbmFtZSwgdGhpcy5jYXJ0LCAyKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEFkZHMgYW4gaXRlbSB0byB0aGUgY2FydC5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSBvYmplY3QgfCBpdGVtXHJcblx0ICogQHJldHVybiB2b2lkXHJcblx0ICovXHJcblx0YWRkSXRlbShpdGVtKVxyXG5cdHtcclxuXHRcdGlmICh0eXBlb2YgaXRlbSAhPSAnb2JqZWN0Jykge1xyXG5cdFx0XHR0aHJvdyBuZXcgSW52YWxpZEFyZ3VtZW50RXhjZXB0aW9uJDEoJ2FkZEl0ZW0oKSBleHBlY3QgdGhlIGZpcnN0IHBhcmFtZXRlciB0byBiZSBhbiBvYmplY3QsIGJ1dCAnICsgdHlwZW9mIGl0ZW0gKyAnIHdhcyBwYXNzZWQgaW5zdGVhZCcpO1xyXG5cdFx0fVxyXG5cclxuXHRcdGlmICghIGl0ZW0uaGFzT3duUHJvcGVydHkoJ2lkJykpIHtcclxuXHRcdFx0dGhyb3cgbmV3IEludmFsaWRDYXJ0SXRlbUV4Y2VwdGlvbjtcclxuXHRcdH1cclxuXHJcblx0XHR0aGlzLmNhcnQgPSBDb29raWUuZ2V0KHRoaXMuc2V0dGluZ3MuY29va2llX25hbWUpO1xyXG5cclxuXHRcdGlmICghaXRlbS5oYXNPd25Qcm9wZXJ0eSgncXVhbnRpdHknKSkge1xyXG5cdFx0XHRpdGVtLnF1YW50aXR5ID0gMTtcclxuXHRcdH1cclxuXHJcblx0XHRsZXQgaTtcclxuXHRcdGxldCBpbmNyZW1lbnRlZCA9IGZhbHNlO1xyXG5cclxuXHRcdGZvciAoaSA9IDA7IGkgPCB0aGlzLmNhcnQuaXRlbXMubGVuZ3RoOyBpKyspIHtcclxuXHRcdFx0aWYgKHRoaXMuY2FydC5pdGVtc1tpXS5pZCA9PSBpdGVtLmlkKSB7XHJcblx0XHRcdFx0dGhpcy5jYXJ0Lml0ZW1zW2ldLnF1YW50aXR5Kys7XHJcblx0XHRcdFx0aW5jcmVtZW50ZWQgPSB0cnVlO1xyXG5cdFx0XHRcdGJyZWFrO1x0XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0XHRpZiAoISBpbmNyZW1lbnRlZCkge1xyXG5cdFx0XHR0aGlzLmNhcnQuaXRlbXMucHVzaChpdGVtKTtcclxuXHRcdH1cclxuXHJcblx0XHRDb29raWUuc2V0KHRoaXMuc2V0dGluZ3MuY29va2llX25hbWUsIHRoaXMuY2FydCwgMik7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBBZGRzIGFuIGl0ZW0gdG8gdGhlIGZhdm9yaXRlcyBsaXN0LlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIG9iamVjdCB8IGl0ZW1cclxuXHQgKiBAcmV0dXJuIHZvaWRcclxuXHQgKi9cclxuXHRmYXZvcml0ZUl0ZW0oaXRlbSlcclxuXHR7XHJcblx0XHRpZiAodHlwZW9mIGl0ZW0gIT0gJ29iamVjdCcpIHtcclxuXHRcdFx0dGhyb3cgbmV3IEludmFsaWRBcmd1bWVudEV4Y2VwdGlvbiQxKCdmYXZvcml0ZUl0ZW0oKSBleHBlY3QgdGhlIGZpcnN0IHBhcmFtZXRlciB0byBiZSBhbiBvYmplY3QsIGJ1dCAnICsgdHlwZW9mIGl0ZW0gKyAnIHdhcyBwYXNzZWQgaW5zdGVhZCcpO1xyXG5cdFx0fVxyXG5cclxuXHRcdGlmICghIGl0ZW0uaGFzT3duUHJvcGVydHkoJ2lkJykpIHtcclxuXHRcdFx0dGhyb3cgbmV3IEludmFsaWRDYXJ0SXRlbUV4Y2VwdGlvbjtcclxuXHRcdH1cclxuXHJcblx0XHR0aGlzLmNhcnQgPSBDb29raWUuZ2V0KHRoaXMuc2V0dGluZ3MuY29va2llX25hbWUpO1xyXG5cclxuXHRcdGxldCBpO1xyXG5cdFx0bGV0IGFscmVhZHlGYXZvcml0ZWQgPSBmYWxzZTtcclxuXHJcblx0XHRmb3IgKGkgPSAwOyBpIDwgdGhpcy5jYXJ0LmZhdm9yaXRlcy5sZW5ndGg7IGkrKykge1xyXG5cdFx0XHRpZiAodGhpcy5jYXJ0LmZhdm9yaXRlc1tpXS5pZCA9PSBpdGVtLmlkKSB7XHJcblx0XHRcdFx0YWxyZWFkeUZhdm9yaXRlZCA9IHRydWU7XHJcblx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0XHRpZiAoISBhbHJlYWR5RmF2b3JpdGVkKSB7XHJcblx0XHRcdHRoaXMuY2FydC5mYXZvcml0ZXMucHVzaChpdGVtKTtcclxuXHRcdH1cclxuXHJcblx0XHRDb29raWUuc2V0KHRoaXMuc2V0dGluZ3MuY29va2llX25hbWUsIHRoaXMuY2FydCwgMik7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBSZW1vdmVzIGFuIGl0ZW0gZnJvbSB0aGUgY2FydC5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSBvYmplY3QgfCBpdGVtXHJcblx0ICogQHJldHVybiB2b2lkXHJcblx0ICovXHJcblx0cmVtb3ZlSXRlbShpdGVtKVxyXG5cdHtcclxuXHRcdGlmICh0eXBlb2YgaXRlbSAhPSAnb2JqZWN0Jykge1xyXG5cdFx0XHR0aHJvdyBuZXcgSW52YWxpZEFyZ3VtZW50RXhjZXB0aW9uJDEoJ3JlbW92ZUl0ZW0oKSBleHBlY3QgdGhlIGZpcnN0IHBhcmFtZXRlciB0byBiZSBhbiBvYmplY3QsIGJ1dCAnICsgdHlwZW9mIGl0ZW0gKyAnIHdhcyBwYXNzZWQgaW5zdGVhZCcpO1xyXG5cdFx0fVxyXG5cclxuXHRcdGlmICghIGl0ZW0uaGFzT3duUHJvcGVydHkoJ2lkJykpIHtcclxuXHRcdFx0dGhyb3cgbmV3IEludmFsaWRDYXJ0SXRlbUV4Y2VwdGlvbjtcclxuXHRcdH1cclxuXHJcbiBcdFx0dGhpcy5jYXJ0ID0gQ29va2llLmdldCh0aGlzLnNldHRpbmdzLmNvb2tpZV9uYW1lKTtcclxuXHJcbiBcdFx0bGV0IGk7XHJcblxyXG4gXHRcdGZvciAoaSA9IDA7IGkgPCB0aGlzLmNhcnQuaXRlbXMubGVuZ3RoOyBpKyspIHtcclxuIFx0XHRcdGlmICh0aGlzLmNhcnQuaXRlbXNbaV0uaWQgPT0gaXRlbS5pZCkge1xyXG4gXHRcdFx0XHR0aGlzLmNhcnQuaXRlbXMuc3BsaWNlKGksIDEpO1xyXG4gXHRcdFx0XHRicmVhaztcclxuIFx0XHRcdH1cclxuIFx0XHR9XHJcblxyXG4gXHRcdENvb2tpZS5zZXQodGhpcy5zZXR0aW5ncy5jb29raWVfbmFtZSwgdGhpcy5jYXJ0LCAyKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEFkZHMgdGhlIGl0ZW0gdG8gcHJldmlldy5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSBhcnJheSB8IGl0ZW1zXHJcblx0ICogQHJldHVybiB2b2lkXHJcblx0ICovXHJcblx0YWRkVG9QcmV2aWV3KGl0ZW1zKVxyXG5cdHtcclxuXHRcdGl0ZW1zRGl2LmlubmVySFRNTCA9ICcnO1xyXG5cclxuXHRcdGxldCB0YWJsZSA9IERPTS5jcmVhdGVFbGVtZW50KCd0YWJsZScpO1xyXG5cclxuXHRcdERPTS5hZGRDbGFzcyh0YWJsZSwgJ3ByZXZpZXctdGFibGUnKTtcclxuXHJcblx0XHRmb3IgKGxldCBpID0gMDsgaSA8IGl0ZW1zLmxlbmd0aDsgaSsrKSB7XHJcblxyXG5cdFx0XHRsZXQgYXR0cmlidXRlcyA9IGl0ZW1zW2ldO1xyXG5cclxuXHRcdFx0bGV0IHRyID0gRE9NLmNyZWF0ZUVsZW1lbnQoJ3RyJywge1xyXG5cdFx0XHRcdGNsYXNzOiAnaXRlbSdcclxuXHRcdFx0fSk7XHJcblxyXG5cdFx0XHQvLyBRdWFudGl0eSBhbHdheXMgYXQgdGhlIHN0YXJ0IG9mIGFuIGl0ZW0uXHJcblx0XHRcdGxldCB0ZCA9IERPTS5jcmVhdGVFbGVtZW50KCd0ZCcpO1xyXG5cclxuXHRcdFx0dGQuaW5uZXJIVE1MID0gYXR0cmlidXRlcy5xdWFudGl0eSArJ3gnO1xyXG5cdFx0XHR0ci5hcHBlbmRDaGlsZCh0ZCk7XHJcblx0XHRcdFxyXG5cdFx0XHRmb3IobGV0IGF0dHJpYnV0ZSBpbiBhdHRyaWJ1dGVzKSB7XHJcblx0XHRcdFx0c3dpdGNoKGF0dHJpYnV0ZSlcclxuXHRcdFx0XHR7XHJcblx0XHRcdFx0XHRjYXNlICdpbWFnZSc6XHJcblx0XHRcdFx0XHRcdHRkID0gRE9NLmNyZWF0ZUVsZW1lbnQoJ3RkJyk7XHJcblx0XHRcdFx0XHRcdGxldCBpbWFnZSA9IERPTS5jcmVhdGVFbGVtZW50KCdpbWcnLCB7XHJcblx0XHRcdFx0XHRcdFx0c3JjOiBhdHRyaWJ1dGVzW2F0dHJpYnV0ZV0sXHJcblx0XHRcdFx0XHRcdFx0d2lkdGg6ICc1MHB4JyxcclxuXHRcdFx0XHRcdFx0XHRoZWlnaHQ6ICc1MHB4J1xyXG5cdFx0XHRcdFx0XHR9KTtcclxuXHJcblx0XHRcdFx0XHRcdHRkLmFwcGVuZENoaWxkKGltYWdlKTtcclxuXHRcdFx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdFx0XHRjYXNlICdwcmljZSc6XHJcblx0XHRcdFx0XHRcdHRkID0gRE9NLmNyZWF0ZUVsZW1lbnQoJ3RkJyk7XHJcblx0XHRcdFx0XHRcdGxldCBzcGFuID0gRE9NLmNyZWF0ZUVsZW1lbnQoJ3NwYW4nLCB7XHJcblx0XHRcdFx0XHRcdFx0aHRtbDogJyZuYnNwJyArIGF0dHJpYnV0ZXNbYXR0cmlidXRlXS5jdXJyZW5jeVxyXG5cdFx0XHRcdFx0XHR9KTtcclxuXHRcdFx0XHRcdFx0dGQuaW5uZXJIVE1MID0gYXR0cmlidXRlc1thdHRyaWJ1dGVdLmFtb3VudDtcclxuXHRcdFx0XHRcdFx0dGQuYXBwZW5kQ2hpbGQoc3Bhbik7XHJcblx0XHRcdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRcdFx0Y2FzZSAnbmFtZSc6XHJcblx0XHRcdFx0XHRcdHRkID0gRE9NLmNyZWF0ZUVsZW1lbnQoJ3RkJyk7XHJcblx0XHRcdFx0XHRcdHRkLmlubmVySFRNTCA9IGF0dHJpYnV0ZXNbYXR0cmlidXRlXTtcclxuXHRcdFx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcclxuXHRcdFx0XHR0ci5hcHBlbmRDaGlsZCh0ZCk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHRhYmxlLmFwcGVuZENoaWxkKHRyKTtcclxuXHRcdH1cclxuXHJcblx0XHQvLyBjcmVhdGUgY2hlY2tvdXQgYnV0dG9uIGF0IHRoZSBib3R0b20gb2YgdGhlIHByZXZpZXdcclxuXHRcdGxldCB0ciA9IERPTS5jcmVhdGVFbGVtZW50KCd0cicpO1xyXG5cdFx0bGV0IHRkID0gRE9NLmNyZWF0ZUVsZW1lbnQoJ3RkJywge1xyXG5cdFx0XHRjb2xzcGFuOiAnMycsXHJcblx0XHR9KTtcclxuXHJcblx0XHRsZXQgY2hlY2tvdXQgPSBET00uY3JlYXRlRWxlbWVudCgnYScsIHtcclxuXHRcdFx0Y2xhc3M6ICdidG4gYnRuLXByaW1hcnknLFxyXG5cdFx0XHR0ZXh0OiAnQ2hlY2tvdXQnLFxyXG5cdFx0XHRocmVmOiAnY2hlY2tvdXQnXHJcblx0XHR9KTtcclxuXHJcblxyXG5cdFx0dGQuYXBwZW5kQ2hpbGQoY2hlY2tvdXQpO1xyXG5cdFx0dHIuYXBwZW5kQ2hpbGQodGQpO1xyXG5cclxuXHRcdC8vIGNyZWF0ZSB0b3RhbCBzdW0gYXQgdGhlIGJvdHRvbSBvZiB0aGUgcHJldmlld1xyXG5cdFx0dGQgPSBET00uY3JlYXRlRWxlbWVudCgndGQnLCB7XHJcblx0XHRcdGNvbHNwYW46ICcxJyxcclxuXHRcdH0pO1xyXG5cclxuXHRcdGxldCB0b3RhbCA9IERPTS5jcmVhdGVFbGVtZW50KCdkaXYnLCB7XHJcblx0XHRcdGNsYXNzOiAnY2FydC10b3RhbCcsXHJcblx0XHRcdHRleHQ6IHRoaXMudG90YWwoKVxyXG5cdFx0fSk7XHJcblxyXG5cdFx0dGQuYXBwZW5kQ2hpbGQodG90YWwpO1xyXG5cdFx0dHIuYXBwZW5kQ2hpbGQodGQpO1xyXG5cclxuXHRcdHRhYmxlLmFwcGVuZENoaWxkKHRyKTtcclxuXHJcblx0XHRpdGVtc0Rpdi5hcHBlbmRDaGlsZCh0YWJsZSk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBDYWxjdWxhdGVzIHRoZSB0b3RhbCBvZiB0aGUgY2FydFxyXG5cdCAqIGFuZCByZXRyaWV2ZSBpdC5cclxuXHQgKlxyXG5cdCAqIEByZXR1cm4gbnVtYmVyIFxyXG5cdCAqL1xyXG5cdHRvdGFsKClcclxuXHR7XHJcbiBcdFx0dGhpcy5jYXJ0ID0gQ29va2llLmdldCh0aGlzLnNldHRpbmdzLmNvb2tpZV9uYW1lKTtcclxuXHJcbiBcdFx0dmFyIHRvdGFsID0gMC4wMDtcclxuIFx0XHRsZXQgaTtcclxuXHJcbiBcdFx0Zm9yIChpID0gMDsgaSA8IHRoaXMuY2FydC5pdGVtcy5sZW5ndGg7IGkrKykge1xyXG4gXHRcdFx0dG90YWwgKz0gcGFyc2VGbG9hdCh0aGlzLmNhcnQuaXRlbXNbaV0ucHJpY2UuYW1vdW50KSAqIHRoaXMuY2FydC5pdGVtc1tpXS5xdWFudGl0eTtcclxuIFx0XHR9XHJcblxyXG4gXHRcdHJldHVybiB0b3RhbC50b0ZpeGVkKDIpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQmluZHMgZXZlcnRoaW5nIHRvIHRoZSBlbGVtZW50LlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIHN0cmluZyB8IHNlbGVjdG9yXHJcblx0ICogQHJldHVybiB2b2lkXHJcblx0ICovXHJcblx0c2V0RWxlbWVudChzZWxlY3RvcilcclxuXHR7XHJcblx0XHR0aGlzLmVsZW1lbnQgPSBET00uZmluZChzZWxlY3Rvcik7XHJcblxyXG5cdFx0aWYgKHRoaXMuZWxlbWVudCkge1xyXG5cdFx0XHRET00uYWRkQ2xhc3ModGhpcy5lbGVtZW50LCB0aGlzLnNldHRpbmdzLmNsYXNzKTtcclxuXHRcdFx0RE9NLmFkZENsYXNzKHRoaXMuZWxlbWVudCwgdGhpcy5zZXR0aW5ncy5wbGFjZW1lbnQpO1xyXG5cdFx0XHR0aGlzLmVsZW1lbnQuYXBwZW5kQ2hpbGQodGhpcy5pY29uKTtcclxuXHRcdFx0dGhpcy5lbGVtZW50LmFwcGVuZENoaWxkKHRoaXMucHJldmlld0VsZW1lbnQpO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQ3JlYXRlcyB0aGUgY2FydCBkZXRhaWxzIHByZXZpZXcgZWxlbWVudC5cclxuXHQgKlxyXG5cdCAqIEByZXR1cm4gSFRNTERpdkVsZW1lbnRcclxuXHQgKi9cclxuXHRjcmVhdGVQcmV2aWV3RWxlbWVudCgpXHJcblx0e1xyXG5cdFx0bGV0IHByZXZpZXdFbGVtZW50ID0gRE9NLmNyZWF0ZUVsZW1lbnQoJ2RpdicsIHtcclxuXHRcdFx0aWQ6ICdwcmV2aWV3J1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0aXRlbXNEaXYgPSBET00uY3JlYXRlRWxlbWVudCgndWwnLCB7XHJcblx0XHRcdFx0Y2xhc3M6ICdpdGVtcydcclxuXHRcdFx0fSk7XHJcblxyXG5cdFx0cHJldmlld0VsZW1lbnQuYXBwZW5kQ2hpbGQoaXRlbXNEaXYpO1xyXG5cclxuXHRcdHJldHVybiBwcmV2aWV3RWxlbWVudDtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEFkZCB0aGUgZUNvbW1lcmNlIHN0eWxlIHRhZ3MgdG8gdGhlIERPTS5cclxuXHQgKlxyXG5cdCAqIEByZXR1cm4gdm9pZFxyXG5cdCAqL1xyXG5cdGRyYXcoKSBcclxuXHR7XHJcblx0XHRpZiAoRE9NLmZpbmQoJyNUdXJiby1lQ29tbWVyY2UtQ2FydCcpKSB7XHJcblx0XHRcdHJldHVybjtcclxuXHRcdH1cclxuXHJcblx0XHRpZiAodGhpcy5zZXR0aW5ncy5ub19jc3MpIHtcclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0fVxyXG5cclxuXHRcdGxldCBwb3NpdGlvbiA9ICh0aGlzLnNldHRpbmdzLmZpeGVkKSA/ICdmaXhlZCcgOiAnYWJzb2x1dGUnO1xyXG5cclxuXHRcdGxldCBjc3MgPSBgXHJcblx0XHRcdCR7dGhpcy5zZXR0aW5ncy5lbGVtZW50fSB7XHJcblx0XHRcdFx0cG9zaXRpb246ICR7cG9zaXRpb259O1xyXG5cdFx0XHRcdGN1cnNvcjogcG9pbnRlcjtcclxuXHRcdFx0XHRjb2xvcjogI2ZmZmZmZjtcclxuXHRcdFx0XHR6LWluZGV4OiA5OTg7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdCR7dGhpcy5zZXR0aW5ncy5lbGVtZW50fSBzdmcge1xyXG5cdFx0XHRcdHdpZHRoOiAke3RoaXMuc2V0dGluZ3Mud2lkdGh9O1xyXG5cdFx0XHRcdGhlaWdodDogJHt0aGlzLnNldHRpbmdzLmhlaWdodH07XHJcblx0XHRcdFx0dHJhbnNpdGlvbjogZmlsbCAwLjNzO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHQke3RoaXMuc2V0dGluZ3MuZWxlbWVudH0gc3ZnOmhvdmVyIHtcclxuXHRcdFx0XHRmaWxsOiAke3RoaXMuc2V0dGluZ3MuaG92ZXJfY29sb3J9O1xyXG5cdFx0XHRcdHRyYW5zaXRpb246IGZpbGwgMC4zcztcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0JHt0aGlzLnNldHRpbmdzLmVsZW1lbnR9LnRvcC1yaWdodCxcclxuXHRcdFx0JHt0aGlzLnNldHRpbmdzLmVsZW1lbnR9LnJpZ2h0LXRvcCB7XHJcblx0XHRcdFx0cmlnaHQ6IDEwcHg7XHJcblx0XHRcdFx0dG9wOiAxMHB4O1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHQke3RoaXMuc2V0dGluZ3MuZWxlbWVudH0ubGVmdC10b3AsXHJcblx0XHRcdCR7dGhpcy5zZXR0aW5ncy5lbGVtZW50fS50b3AtbGVmdCB7XHJcblx0XHRcdFx0bGVmdDogMTBweDtcclxuXHRcdFx0XHR0b3A6IDEwcHg7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdCR7dGhpcy5zZXR0aW5ncy5lbGVtZW50fSA+ICNwcmV2aWV3IHtcclxuXHRcdFx0XHRwb3NpdGlvbjogJHtwb3NpdGlvbn07XHJcblx0XHRcdFx0ei1pbmRleDogOTk5OTtcclxuXHRcdFx0XHR0b3A6IGNhbGMoMTBweCArICR7dGhpcy5zZXR0aW5ncy5oZWlnaHR9KTtcclxuXHRcdFx0XHR0cmFuc2Zvcm06IHRyYW5zbGF0ZVgoNjBweCk7XHJcblx0XHRcdFx0aGVpZ2h0OiA0MDBweDtcclxuXHRcdFx0XHR3aWR0aDogMzAwcHg7XHJcblx0XHRcdFx0Ym9yZGVyOiAxcHggc29saWQgI2U0ZTRlNDtcclxuXHRcdFx0XHRiYWNrZ3JvdW5kOiAjZmZmZmZmO1xyXG5cdFx0XHRcdHRyYW5zaXRpb246IHRyYW5zZm9ybSAxcywgdmlzaWJpbGl0eSAxcztcclxuXHRcdFx0XHRjdXJzb3I6IGRlZmF1bHQ7XHJcblx0XHRcdFx0b3ZlcmZsb3ctWTogc2Nyb2xsO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHQke3RoaXMuc2V0dGluZ3MuZWxlbWVudH0gPiAjcHJldmlldy5vcGVuZWQge1xyXG5cdFx0XHRcdHZpc2liaWxpdHk6IHZpc2libGU7XHJcblx0XHRcdFx0dHJhbnNmb3JtOiB0cmFuc2xhdGVYKC0yNDBweCk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdCR7dGhpcy5zZXR0aW5ncy5lbGVtZW50fSA+ICNwcmV2aWV3LmNsb3NlZCB7XHJcblx0XHRcdFx0dmlzaWJpbGl0eTogaGlkZGVuO1xyXG5cdFx0XHRcdHRyYW5zZm9ybTogdHJhbnNsYXRlWCg2MHB4KTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0JHt0aGlzLnNldHRpbmdzLmVsZW1lbnR9ICNwcmV2aWV3ID4gdWwuaXRlbXMge1xyXG5cdFx0XHRcdHBhZGRpbmc6IDA7XHJcblx0XHRcdFx0Y29sb3I6ICMwMDAwMDA7XHJcblx0XHRcdFx0bGlzdC1zdHlsZS10eXBlOiBub25lO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHQke3RoaXMuc2V0dGluZ3MuZWxlbWVudH0gI3ByZXZpZXcgPiB1bC5pdGVtcyA+IC5wcmV2aWV3LXRhYmxlIHtcclxuXHRcdFx0XHR3aWR0aDogMTAwJTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0JHt0aGlzLnNldHRpbmdzLmVsZW1lbnR9ICNwcmV2aWV3ID4gdWwuaXRlbXMgPiAucHJldmlldy10YWJsZSB0ZCB7XHJcblx0XHRcdFx0cGFkZGluZzogNHB4O1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHQke3RoaXMuc2V0dGluZ3MuZWxlbWVudH0gLml0ZW1zLmxvYWRpbmcge1xyXG5cdFx0XHRcdGRpc3BsYXk6IG5vbmU7XHJcblx0XHRcdFx0b3ZlcmZsb3ctWTogbm9uZTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0JHt0aGlzLnNldHRpbmdzLmVsZW1lbnR9IC5jYXJ0LWxvYWRlci1vdmVybGF5IHtcclxuXHRcdFx0XHRwb3NpdGlvbjogZml4ZWQ7XHJcblx0XHRcdFx0dG9wOiAwOyBcclxuXHRcdFx0ICAgIGxlZnQ6IDA7XHJcblx0XHRcdCAgICByaWdodDogMDtcclxuXHRcdFx0ICAgIGJvdHRvbTogMDtcclxuXHRcdFx0XHRiYWNrZ3JvdW5kOiAjZmZmZmZmO1xyXG5cdFx0XHRcdHdpZHRoOiAxMDAlO1xyXG5cdFx0XHRcdGhlaWdodDogMTAwJTtcclxuXHRcdFx0XHRtaW4taGVpZ2h0OiAxMDAlO1xyXG5cdFx0XHRcdG92ZXJmbG93OiBhdXRvO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHQke3RoaXMuc2V0dGluZ3MuZWxlbWVudH0gLmNhcnQtbG9hZGVyLW92ZXJsYXkgLmNhcnQtbG9hZGVyIHtcclxuXHRcdFx0XHRwb3NpdGlvbjogYWJzb2x1dGU7XHJcblx0XHRcdFx0d2lkdGg6IDUwcHg7XHJcblx0XHRcdFx0aGVpZ2h0OiA1MHB4O1xyXG5cdFx0XHRcdG1hcmdpbi1sZWZ0OiAtMjVweDtcclxuXHRcdFx0XHRtYXJnaW4tdG9wOiAtMjVweDtcclxuXHRcdFx0XHRsZWZ0OiA1MCU7XHJcblx0XHRcdFx0cmlnaHQ6IDUwJTtcclxuXHRcdFx0XHR0b3A6IDUwJTtcclxuXHRcdFx0XHRib3R0b206IDUwJTtcclxuXHRcdFx0fVxyXG5cdFx0YDtcclxuXHQgICAgXHJcblx0ICAgIERPTS5hZGRTdHlsZSgnVHVyYm8tZUNvbW1lcmNlLUNhcnQnLCBjc3MpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQ3JlYXRlcyBhbiBsb2FkaW5nIG92ZXJsYXkuXHJcblx0ICpcclxuXHQgKiBAcmV0dXJuIEhUTUxEaXZFbGVtZW50XHJcblx0ICovXHJcblx0bG9hZGluZ092ZXJsYXkoKVxyXG5cdHtcclxuXHRcdGlmIChsb2FkaW5nT3ZlcmxheSkge1xyXG5cdFx0XHRyZXR1cm4gbG9hZGluZ092ZXJsYXk7XHJcblx0XHR9XHJcblxyXG5cdFx0bGV0IGxvYWRlcjtcclxuXHJcblx0XHRpZiAodGhpcy5zZXR0aW5ncy5sb2FkZXIpIHtcclxuXHRcdFx0bG9hZGVyID0gRE9NLmNyZWF0ZUVsZW1lbnQoJ2ltZycsIHtcclxuXHRcdFx0XHRzcmM6IHRoaXMuc2V0dGluZ3MubG9hZGVyLFxyXG5cdFx0XHRcdGNsYXNzOiAnY2FydC1sb2FkZXInXHJcblx0XHRcdH0pO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0bG9hZGVyID0gY3JlYXRlTG9hZGVyKCk7XHJcblx0XHR9XHJcblxyXG5cdFx0bG9hZGluZ092ZXJsYXkgPSBET00uY3JlYXRlRWxlbWVudCgnZGl2Jywge1xyXG5cdFx0XHRjbGFzczogJ2NhcnQtbG9hZGVyLW92ZXJsYXknXHJcblx0XHR9KTtcclxuXHJcblx0XHRsb2FkaW5nT3ZlcmxheS5hcHBlbmRDaGlsZChsb2FkZXIpO1xyXG5cclxuXHRcdHJldHVybiBsb2FkaW5nT3ZlcmxheTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIExvYWRpbmcgdGhlIGNhcnQgcHJldmlldy5cclxuXHQgKlxyXG5cdCAqIEByZXR1cm4gdm9pZFxyXG5cdCAqL1xyXG5cdHByZXZpZXdTdGFydExvYWRpbmcoKVxyXG5cdHtcclxuXHRcdERPTS5hZGRDbGFzcyhpdGVtc0RpdiwgJ2xvYWRpbmcnKTtcclxuXHRcdHRoaXMucHJldmlld0VsZW1lbnQuYXBwZW5kQ2hpbGQodGhpcy5sb2FkaW5nT3ZlcmxheSgpKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIExvYWRpbmcgdGhlIGNhcnQgcHJldmlldy5cclxuXHQgKlxyXG5cdCAqIEByZXR1cm4gdm9pZFxyXG5cdCAqL1xyXG5cdHByZXZpZXdTdG9wTG9hZGluZygpXHJcblx0e1xyXG5cdFx0aWYgKERPTS5maW5kKCcuY2FydC1sb2FkZXItb3ZlcmxheScsIHRoaXMucHJldmlld0VsZW1lbnQpKSB7XHJcblx0XHRcdHRoaXMucHJldmlld0VsZW1lbnQucmVtb3ZlQ2hpbGQodGhpcy5sb2FkaW5nT3ZlcmxheSgpKTtcclxuXHRcdFx0RE9NLnJlbW92ZUNsYXNzKGl0ZW1zRGl2LCAnbG9hZGluZycpO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogUmVsb2FkcyB0aGUgaXRlbXMgaW4gdGhlIGNhcnQgcHJldmlldy5cclxuXHQgKlxyXG5cdCAqIEByZXR1cm4gdm9pZFxyXG5cdCAqL1xyXG5cdHJlbG9hZENhcnRQcmV2aWV3KClcclxuXHR7XHJcblx0XHR0aGlzLnByZXZpZXdTdGFydExvYWRpbmcoKTtcclxuXHRcdGxldCBpdGVtcyA9IHRoaXMuZ2V0Q2FydEl0ZW1zKCk7XHJcblx0XHR0aGlzLmFkZFRvUHJldmlldyhpdGVtcyk7XHJcblx0XHRcclxuXHRcdGxldCBpbnN0YW5jZSA9IHRoaXM7XHJcblxyXG5cdFx0c2V0VGltZW91dChmdW5jdGlvbigpIHtcclxuXHRcdFx0aW5zdGFuY2UucHJldmlld1N0b3BMb2FkaW5nLmNhbGwoaW5zdGFuY2UpO1xyXG5cdFx0fSwgMTAwMCk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBCaW5kcyBldmVudCBsaXN0ZW5lcnMgdG8gdGhlIGNhcnQgaWNvbi5cclxuXHQgKlxyXG5cdCAqIEByZXR1cm4gdm9pZFxyXG5cdCAqL1xyXG5cdGJpbmRFdmVudExpc3RlbmVycygpXHJcblx0e1xyXG5cdFx0dGhpcy5pY29uLm9uY2xpY2sgPSBmdW5jdGlvbihlKSB7XHJcblx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcclxuXHRcdFx0dGhpcy50b2dnbGVDYXJ0UHJldmlldygpO1xyXG5cdFx0fS5iaW5kKHRoaXMpO1xyXG5cclxuXHRcdEV2ZW50TWFuYWdlciQyLnN1YnNjcmliZSgnY2FydC5wcm9kdWN0LmFkZGVkJywgZnVuY3Rpb24oYXR0cmlidXRlcykge1xyXG5cdFx0XHR0aGlzLm9wZW5DYXJ0UHJldmlldygpO1xyXG5cdFx0XHR0aGlzLmFkZEl0ZW0oYXR0cmlidXRlcyk7XHJcblx0XHRcdHRoaXMucmVsb2FkQ2FydFByZXZpZXcoKTtcclxuXHRcdH0uYmluZCh0aGlzKSk7XHJcblxyXG5cdFx0RXZlbnRNYW5hZ2VyJDIuc3Vic2NyaWJlKCdjYXJ0LnByb2R1Y3QuZmF2b3JpdGVkJywgZnVuY3Rpb24oYXR0cmlidXRlcykge1xyXG5cdFx0XHR0aGlzLmZhdm9yaXRlSXRlbShhdHRyaWJ1dGVzKTtcclxuXHRcdH0uYmluZCh0aGlzKSk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBPcGVucyB0aGUgY2FydCBwcmV2aWV3LlxyXG5cdCAqXHJcblx0ICogQHJldHVybiB2b2lkIFxyXG5cdCAqL1xyXG5cdG9wZW5DYXJ0UHJldmlldygpXHJcblx0e1xyXG5cdFx0aWYgKERPTS5oYXNDbGFzcyh0aGlzLnByZXZpZXdFbGVtZW50LCAnb3BlbmVkJykpIHtcclxuXHRcdFx0dGhpcy5yZWxvYWRDYXJ0UHJldmlldygpO1xyXG5cdFx0fVxyXG5cclxuXHRcdERPTS5zd2l0Y2hDbGFzc2VzKHRoaXMucHJldmlld0VsZW1lbnQsICdjbG9zZWQnLCAnb3BlbmVkJyk7XHJcblx0XHR0aGlzLnJlbG9hZENhcnRQcmV2aWV3KCk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBUb2dnbGVzIHRoZSBvcGVuaW5nIGNsb3Npbmcgb2YgdGhlIGNhcnQgcHJldmlldy5cclxuXHQgKlxyXG5cdCAqIEByZXR1cm4gdm9pZCBcclxuXHQgKi9cclxuXHR0b2dnbGVDYXJ0UHJldmlldygpXHJcblx0e1xyXG5cdFx0bGV0IG9wZW5pbmcgPSBET00udG9nZ2xlQ2xhc3ModGhpcy5wcmV2aWV3RWxlbWVudCwgJ29wZW5lZCcsICdjbG9zZWQnKTtcclxuXHRcdFx0XHJcblx0XHRpZiAob3BlbmluZykge1xyXG5cdFx0XHR0aGlzLnJlbG9hZENhcnRQcmV2aWV3KCk7XHRcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFJldHJpZXZlIHRoZSBjYXJ0cyBpdGVtcyBmcm9tIHRoZSBjb29raWUuXHJcblx0ICpcclxuXHQgKiBAcmV0dXJuIG9iamVjdFxyXG5cdCAqL1xyXG5cdGdldENhcnRJdGVtcygpXHJcblx0e1xyXG5cdFx0bGV0IGNhcnQgPSBDb29raWUuZ2V0KHRoaXMuc2V0dGluZ3MuY29va2llX25hbWUpO1xyXG5cclxuXHRcdHJldHVybiAoY2FydCkgPyBjYXJ0Lml0ZW1zIDogW107XHJcblx0fVxyXG59XHJcblxyXG4vKipcclxuICogQ2xvc2VzIHRoZSBjYXJ0IHByZXZpZXcgZWxlbWVudC5cclxuICpcclxuICogQHBhcmFtIGV2ZW50LmNsaWNrXHJcbiAqL1xyXG5mdW5jdGlvbiBjbG9zZShldmVudCkge1xyXG5cdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcblx0RE9NLnN3aXRjaENsYXNzZXModGhpcy5wcmV2aWV3RWxlbWVudCwgJ29wZW5lZCcsICdjbG9zZWQnKTtcclxufVxyXG5cclxuLyoqXHJcbiAqIENyZWF0ZXMgdGhlIGNhcnQgc3ZnIGljb24uXHJcbiAqXHJcbiAqIEByZXR1cm4gU1ZHU1ZHRWxlbWVudFxyXG4gKi9cclxuZnVuY3Rpb24gY3JlYXRlSWNvbigpIHtcclxuXHRsZXQgc3ZnID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKFwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiwgXCJzdmdcIik7XHJcblx0bGV0IGcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50TlMoXCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiLCBcImdcIik7XHJcblx0bGV0IHBhdGggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50TlMoXCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiLCBcInBhdGhcIik7XHJcblxyXG5cdHN2Zy5zZXRBdHRyaWJ1dGUoJ3ZlcnNpb24nLCAnMS4xJyk7XHJcblx0c3ZnLnNldEF0dHJpYnV0ZSgneG1sbnMnLCAnaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnKTtcclxuXHRzdmcuc2V0QXR0cmlidXRlKCd4bWxuczp4bGluaycsICdodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rJyk7XHJcblx0c3ZnLnNldEF0dHJpYnV0ZSgneCcsICcwcHgnKTtcclxuXHRzdmcuc2V0QXR0cmlidXRlKCd5JywgJzBweCcpO1xyXG5cdHN2Zy5zZXRBdHRyaWJ1dGUoJ3dpZHRoJywgJzQwcHgnKTtcclxuXHRzdmcuc2V0QXR0cmlidXRlKCdoZWlnaHQnLCAnNDBweCcpO1xyXG5cdHN2Zy5zZXRBdHRyaWJ1dGUoJ3ZpZXdCb3gnLCAnMCAwIDQ0Ni44NDMgNDQ2Ljg0MycpO1xyXG5cdHN2Zy5zZXRBdHRyaWJ1dGUoJ3N0eWxlJywgJ2VuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgNDQ2Ljg0MyA0NDYuODQzOycpO1xyXG5cdHN2Zy5zZXRBdHRyaWJ1dGUoJ3htbDpzcGFjZScsICdwcmVzZXJ2ZScpO1xyXG5cclxuXHRwYXRoLnNldEF0dHJpYnV0ZSgnZCcsICdNNDQ0LjA5LDkzLjEwM2MtMi42OTgtMy42OTktNy4wMDYtNS44ODgtMTEuNTg0LTUuODg4SDEwOS45MmMtMC42MjUsMC0xLjI0OSwwLjAzOC0xLjg1LDAuMTE5bC0xMy4yNzYtMzguMjdjLTEuMzc2LTMuOTU4LTQuNDA2LTcuMTEzLTguMy04LjY0NkwxOS41ODYsMTQuMTM0Yy03LjM3NC0yLjg4Ny0xNS42OTUsMC43MzUtMTguNTkxLDguMWMtMi44OTEsNy4zNjksMC43MywxNS42OTUsOC4xLDE4LjU5MWw2MC43NjgsMjMuODcybDc0LjM4MSwyMTQuMzk5Yy0zLjI4MywxLjE0NC02LjA2NSwzLjY2My03LjMzMiw3LjE4N2wtMjEuNTA2LDU5LjczOWMtMS4zMTgsMy42NjMtMC43NzUsNy43MzMsMS40NjgsMTAuOTE2YzIuMjQsMy4xODMsNS44ODMsNS4wNzgsOS43NzMsNS4wNzhoMTEuMDQ0Yy02Ljg0NCw3LjYxNi0xMS4wNDQsMTcuNjQ2LTExLjA0NCwyOC42NzVjMCwyMy43MTgsMTkuMjk4LDQzLjAxMiw0My4wMTIsNDMuMDEyczQzLjAxMi0xOS4yOTQsNDMuMDEyLTQzLjAxMmMwLTExLjAyOS00LjItMjEuMDU5LTExLjA0NC0yOC42NzVoOTMuNzc2Yy02Ljg0Nyw3LjYxNi0xMS4wNDgsMTcuNjQ2LTExLjA0OCwyOC42NzVjMCwyMy43MTgsMTkuMjk0LDQzLjAxMiw0My4wMTMsNDMuMDEyYzIzLjcxOCwwLDQzLjAxMi0xOS4yOTQsNDMuMDEyLTQzLjAxMmMwLTExLjAyOS00LjItMjEuMDU5LTExLjA0My0yOC42NzVoMTMuNDMzYzYuNTk5LDAsMTEuOTQ3LTUuMzQ5LDExLjk0Ny0xMS45NDhjMC02LjU5OS01LjM0OS0xMS45NDctMTEuOTQ3LTExLjk0N0gxNDMuNjQ3bDEzLjMxOS0zNi45OTZjMS43MiwwLjcyNCwzLjU3OCwxLjE1Miw1LjUyMywxLjE1MmgyMTAuMjc4YzYuMjM0LDAsMTEuNzUxLTQuMDI3LDEzLjY1LTkuOTU5bDU5LjczOS0xODYuMzg3QzQ0Ny41NTcsMTAxLjU2Nyw0NDYuNzg4LDk2LjgwMiw0NDQuMDksOTMuMTAzeiBNMTY5LjY1OSw0MDkuODA3Yy0xMC41NDMsMC0xOS4xMTYtOC41NzMtMTkuMTE2LTE5LjExNnM4LjU3My0xOS4xMTcsMTkuMTE2LTE5LjExN3MxOS4xMTYsOC41NzQsMTkuMTE2LDE5LjExN1MxODAuMjAyLDQwOS44MDcsMTY5LjY1OSw0MDkuODA3eiBNMzI3LjM2Nyw0MDkuODA3Yy0xMC41NDMsMC0xOS4xMTctOC41NzMtMTkuMTE3LTE5LjExNnM4LjU3NC0xOS4xMTcsMTkuMTE3LTE5LjExN2MxMC41NDIsMCwxOS4xMTYsOC41NzQsMTkuMTE2LDE5LjExN1MzMzcuOTA5LDQwOS44MDcsMzI3LjM2Nyw0MDkuODA3eiBNNDAyLjUyLDE0OC4xNDloLTczLjE2MVYxMTUuODloODMuNDk5TDQwMi41MiwxNDguMTQ5eiBNMzgxLjQ1MywyMTMuODYxaC01Mi4wOTR2LTM3LjAzOGg2My45NjdMMzgxLjQ1MywyMTMuODYxeiBNMjM0LjU3MSwyMTMuODYxdi0zNy4wMzhoNjYuMTEzdjM3LjAzOEgyMzQuNTcxeiBNMzAwLjY4NCwyNDIuNTM4djMxLjA2NGgtNjYuMTEzdi0zMS4wNjRIMzAwLjY4NHogTTEzOS4xMTUsMTc2LjgyM2g2Ni43ODR2MzcuMDM4aC01My45MzNMMTM5LjExNSwxNzYuODIzeiBNMjM0LjU3MSwxNDguMTQ5VjExNS44OWg2Ni4xMTN2MzIuMjU5SDIzNC41NzF6IE0yMDUuODk4LDExNS44OXYzMi4yNTloLTc2LjczNGwtMTEuMTkxLTMyLjI1OUgyMDUuODk4eiBNMTYxLjkxNiwyNDIuNTM4aDQzLjk4MnYzMS4wNjRoLTMzLjIwNkwxNjEuOTE2LDI0Mi41Mzh6IE0zMjkuMzU5LDI3My42MDN2LTMxLjA2NGg0Mi45MDlsLTkuOTU1LDMxLjA2NEgzMjkuMzU5eicpO1xyXG5cclxuXHRnLmFwcGVuZENoaWxkKHBhdGgpO1xyXG5cdHN2Zy5hcHBlbmRDaGlsZChnKTtcclxuXHJcblx0bGV0ICBkaXYgPSBET00uY3JlYXRlRWxlbWVudCgnZGl2Jywge1xyXG5cdFx0aWQ6ICdjYXJ0SWNvbicsXHJcblx0fSk7XHJcblxyXG5cdGRpdi5hcHBlbmRDaGlsZChzdmcpO1xyXG5cclxuXHRyZXR1cm4gZGl2O1xyXG59XHJcblxyXG4vKipcclxuICogQ3JlYXRlcyB0aGUgY2FydCBsb2FkZXIgaWNvbi5cclxuICpcclxuICogQHJldHVybiBTVkdTVkdFbGVtZW50XHJcbiAqL1xyXG5mdW5jdGlvbiBjcmVhdGVMb2FkZXIoKSB7XHJcblx0bGV0IHN2ZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnROUyhcImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIsIFwic3ZnXCIpO1xyXG5cdGxldCBjb3VudCA9IDEyO1xyXG5cdGxldCBncm91cHMgPSBbXTtcclxuXHRsZXQgcmVjdGFuZ2VscyA9IFtdO1xyXG5cdGxldCBhbmltYXRpb25zID0gW107XHJcblxyXG5cdHN2Zy5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgJ2xkcy1zcGlubmVyJyk7XHJcblx0c3ZnLnNldEF0dHJpYnV0ZSgnd2lkdGgnLCAnMjAwcHgnKTtcclxuXHRzdmcuc2V0QXR0cmlidXRlKCdoZWlnaHQnLCAnMjAwcHgnKTtcclxuXHRzdmcuc2V0QXR0cmlidXRlKCd4bWxucycsICdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZycpO1xyXG5cdHN2Zy5zZXRBdHRyaWJ1dGUoJ3htbG5zOnhsaW5rJywgJ2h0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsnKTtcclxuXHRzdmcuc2V0QXR0cmlidXRlKCd2aWV3Qm94JywgJzAgMCAxMDAgMTAwJyk7XHJcblx0c3ZnLnNldEF0dHJpYnV0ZSgncHJlc2VydmVBc3BlY3RSYXRpbycsICd4TWlkWU1pZCcpO1xyXG5cdHN2Zy5zZXRBdHRyaWJ1dGUoJ3N0eWxlJywgJ2JhY2tncm91bmQ6IG5vbmU7Jyk7XHJcblx0XHJcblx0dmFyIHJvdGF0aW9uID0gMDtcclxuXHJcblx0Zm9yICh2YXIgaSA9IDA7IGkgPCBjb3VudDsgaSsrKSB7XHJcblx0XHRsZXQgZ3JvdXAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50TlMoXCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiLCBcImdcIik7XHJcblx0XHRncm91cC5zZXRBdHRyaWJ1dGUoJ3RyYW5zZm9ybScsICdyb3RhdGUoJyArIHJvdGF0aW9uICsgJyA1MCA1MCknKTtcclxuXHRcdHJvdGF0aW9uICs9IDMwO1xyXG5cdFx0Z3JvdXBzLnB1c2goZ3JvdXApO1xyXG5cdH1cclxuXHJcblx0Zm9yICh2YXIgaSA9IDA7IGkgPCBjb3VudDsgaSsrKSB7XHJcblx0XHRsZXQgcmVjdGFuZ2VsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKFwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiwgXCJyZWN0XCIpO1xyXG5cdFx0cmVjdGFuZ2VsLnNldEF0dHJpYnV0ZSgneCcsICc0NycpO1xyXG5cdFx0cmVjdGFuZ2VsLnNldEF0dHJpYnV0ZSgneScsICcyNCcpO1xyXG5cdFx0cmVjdGFuZ2VsLnNldEF0dHJpYnV0ZSgncngnLCAnOS40Jyk7XHJcblx0XHRyZWN0YW5nZWwuc2V0QXR0cmlidXRlKCdyeScsICc0LjgnKTtcclxuXHRcdHJlY3RhbmdlbC5zZXRBdHRyaWJ1dGUoJ3dpZHRoJywgJzYnKTtcclxuXHRcdHJlY3RhbmdlbC5zZXRBdHRyaWJ1dGUoJ2hlaWdodCcsICcxMicpO1xyXG5cdFx0cmVjdGFuZ2VsLnNldEF0dHJpYnV0ZSgnZmlsbCcsICcjNDY1OGFjJyk7XHJcblx0XHRyZWN0YW5nZWxzLnB1c2gocmVjdGFuZ2VsKTtcclxuXHR9XHJcblxyXG5cdHZhciBiZWdpbiA9IDAuMDkgKiAxMTtcclxuXHJcblx0Zm9yICh2YXIgaSA9IDA7IGkgPCBjb3VudDsgaSsrKSB7XHJcblx0XHRsZXQgYW5pbWF0ZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnROUyhcImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIsIFwiYW5pbWF0ZVwiKTtcclxuXHRcdGFuaW1hdGUuc2V0QXR0cmlidXRlKCdhdHRyaWJ1dGVOYW1lJywgJ29wYWNpdHknKTtcclxuXHRcdGFuaW1hdGUuc2V0QXR0cmlidXRlKCd2YWx1ZXMnLCAnMTswJyk7XHJcblx0XHRhbmltYXRlLnNldEF0dHJpYnV0ZSgndGltZXMnLCAnMDsxJyk7XHJcblx0XHRhbmltYXRlLnNldEF0dHJpYnV0ZSgnZHVyJywgJzFzJyk7XHJcblx0XHRhbmltYXRlLnNldEF0dHJpYnV0ZSgnYmVnaW4nLCBiZWdpbi50b0ZpeGVkKDgpICsgJ3MnKTtcclxuXHRcdGFuaW1hdGUuc2V0QXR0cmlidXRlKCdyZXBlYXRDb3VudCcsICdpbmRlZmluaXRlJyk7XHJcblx0XHRhbmltYXRpb25zLnB1c2goYW5pbWF0ZSk7XHJcblx0XHRiZWdpbiAtPSAwLjA5O1xyXG5cdH1cclxuXHJcblx0Zm9yICh2YXIgaSA9IDA7IGkgPCBncm91cHMubGVuZ3RoOyBpKyspIHtcclxuXHRcdGxldCBncm91cCA9IGdyb3Vwc1tpXTtcdFx0XHJcblx0XHRsZXQgcmVjdGFuZ2VsID0gcmVjdGFuZ2Vsc1tpXTtcclxuXHRcdGxldCBhbmltYXRlID0gYW5pbWF0aW9uc1tpXTtcclxuXHRcdHJlY3RhbmdlbC5hcHBlbmRDaGlsZChhbmltYXRlKTtcclxuXHRcdGdyb3VwLmFwcGVuZENoaWxkKHJlY3RhbmdlbCk7XHJcblx0XHRzdmcuYXBwZW5kQ2hpbGQoZ3JvdXApO1xyXG5cdH1cclxuXHJcblx0RE9NLmFkZENsYXNzKHN2ZywgJ2NhcnQtbG9hZGVyJyk7XHJcblxyXG5cdHJldHVybiBzdmc7XHRcclxufVxuXG4vLyBIZWxwZXJzXHJcbi8vIENvbXBvbmVudHNcclxuLy8gRXhjZXB0aW9uc1xyXG4vKipcclxuICogVGhlIGRlZmF1bHQgc2V0dGluZ3Mgb2YgdGhlIGZpbHRlci5cclxuICovXHJcbmxldCBkZWZhdWx0U2V0dGluZ3MkMiA9IHtcclxuXHRlbGVtZW50OiAnLmZpbHRlcicsXHJcblx0Y2xhc3M6ICcnLFxyXG5cdHdpZHRoOiAnJyxcclxuXHRoZWlnaHQ6ICcnLFxyXG5cdG5vX2NzczogZmFsc2UsXHJcbn07XHJcblxyXG4vKipcclxuICogU3RvcmVzIHRoZSBjb250YWluZXIgb2JqZWN0LlxyXG4gKlxyXG4gKiBAdmFyIFxcQ29yZVxcQ29udGFpbmVyXHJcbiAqL1xyXG5sZXQgQ29udGFpbmVyJDE7XHJcblxyXG4vKipcclxuICogQGNsYXNzIEZpbHRlclxyXG4gKlxyXG4gKiBUaGUgRmlsdGVyIE9iamVjdCwgaGFuZGxlcyB0aGUgZmlsdGVyIG9mIHRoZSBwcm9kdWN0cy9zZXJ2aWNlcy5cclxuICovXHJcblxyXG5jbGFzcyBGaWx0ZXIgZXh0ZW5kcyBCYXNlQ29tcG9uZW50XHJcbntcclxuXHQvKipcclxuXHQgKiAtIEluaXRpYWxpemUgdGhlIElvQyBjb250YWluZXIuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gXFxDb3JlXFxDb250YWluZXIgfCBjb250YWluZXJcclxuXHQgKiBAcmV0dXJuIHZvaWRcclxuXHQgKi9cclxuXHRjb25zdHJ1Y3Rvcihjb250YWluZXIpIFxyXG5cdHtcclxuXHRcdHN1cGVyKCk7XHJcblxyXG5cdFx0Q29udGFpbmVyJDEgPSBjb250YWluZXI7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBTZXR1cCB0aGUgZmlsdGVyIGNsYXNzLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIG9iamVjdCB8IHNldHRpbmdzXHJcblx0ICogQHJldHVybiB2b2lkXHJcblx0ICovXHJcblx0c2V0dXAoc2V0dGluZ3MpXHJcblx0e1xyXG5cdFx0aWYodHlwZW9mIHNldHRpbmdzICE9ICdvYmplY3QnKSB7XHJcblx0XHRcdHRocm93IG5ldyBJbnZhbGlkQXJndW1lbnRFeGNlcHRpb24kMTtcclxuXHRcdH1cclxuXHJcblx0XHR0aGlzLnNldHRpbmdzID0gQ29tbW9uLmV4dGVuZChkZWZhdWx0U2V0dGluZ3MkMiwgc2V0dGluZ3MpO1xyXG5cclxuXHRcdGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCBmdW5jdGlvbigpIHtcclxuXHJcblx0XHRcdHRoaXMuc2V0RWxlbWVudCh0aGlzLnNldHRpbmdzLmVsZW1lbnQpO1xyXG5cclxuXHRcdFx0dGhpcy5kcmF3KCk7XHRcclxuXHRcdH0uYmluZCh0aGlzKSk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBTZXRzIHRoZSBlbGVtZW50IHRvIGJlIGJvdW5kIHRvLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIHN0cmluZyB8IHNlbGVjdG9yXHJcblx0ICogQHJldHVybiB2b2lkXHJcblx0ICovXHJcblx0c2V0RWxlbWVudChzZWxlY3RvcilcclxuXHR7XHJcblx0XHR0aGlzLmVsZW1lbnQgPSBET00uZmluZChzZWxlY3Rvcik7XHJcblx0XHRcclxuXHRcdERPTS5hZGRDbGFzcyh0aGlzLmVsZW1lbnQsIHRoaXMuc2V0dGluZ3MuY2xhc3MpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQWRkIHRoZSBlQ29tbWVyY2Ugc3R5bGUgdGFncyB0byB0aGUgRE9NLlxyXG5cdCAqL1xyXG5cdGRyYXcoKSBcclxuXHR7XHJcblx0XHRpZiAoRE9NLmZpbmQoJyNUdXJiby1lQ29tbWVyY2UtRmlsdGVyJykpIHtcclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0fVxyXG5cclxuXHRcdGlmICh0aGlzLnNldHRpbmdzLm5vX2Nzcykge1xyXG5cdFx0XHRyZXR1cm47XHJcblx0XHR9XHJcblxyXG5cdFx0bGV0IHdpZHRoID0gKHRoaXMuc2V0dGluZ3Mud2lkdGgpID8gJ3dpZHRoOicgKyB0aGlzLnNldHRpbmdzLndpZHRoICsgJzsnIDogJyc7XHJcblx0XHRsZXQgbWluV2lkdGggPSB0aGlzLnNldHRpbmdzLm1pbl93aWR0aCB8fCAnMjAwcHgnO1xyXG5cdFx0bGV0IGhlaWdodCA9IHRoaXMuc2V0dGluZ3MuaGVpZ2h0IHx8ICdhdXRvJztcclxuXHJcblx0XHRsZXQgY3NzID0gYFxyXG5cdFx0XHQke3RoaXMuc2V0dGluZ3MuZWxlbWVudH0ge1xyXG5cdFx0XHRcdHBvc2l0aW9uOiByZWxhdGl2ZTtcclxuXHRcdFx0XHRtYXJnaW46IDVweCA1cHg7XHJcblx0XHRcdFx0Ym9yZGVyOiAxcHggc29saWQgI2U0ZTRlNDtcclxuXHRcdFx0XHQke3dpZHRofVxyXG5cdFx0XHRcdG1pbi13aWR0aDogJHttaW5XaWR0aH07XHJcblx0XHRcdFx0aGVpZ2h0OiAke2hlaWdodH07XHJcblx0XHRcdFx0bWluLWhlaWdodDogMjAwcHg7XHJcblx0XHRcdFx0Y29sb3I6ICNmZmZmZmY7XHJcblx0XHRcdFx0b3ZlcmZsb3c6IGhpZGRlbjtcclxuXHRcdFx0fVxyXG5cclxuXHRcdGA7XHJcblx0ICAgIFxyXG5cdCAgICBET00uYWRkU3R5bGUoJ1R1cmJvLWVDb21tZXJjZS1GaWx0ZXInLCBjc3MpO1xyXG5cdH1cclxufVxuXG4vLyBIZWxwZXJzXHJcbi8vIENvbXBvbmVudHNcclxuLy8gRXhjZXB0aW9uc1xyXG4vKipcclxuICogVGhlIGRlZmF1bHQgc2V0dGluZ3Mgb2YgdGhlIGNhcnQuXHJcbiAqXHJcbiAqIEB2YXIgb2JqZWN0XHJcbiAqL1xyXG5sZXQgZGVmYXVsdFNldHRpbmdzJDMgPSB7XHJcblx0ZWxlbWVudDogJy5jaGVja291dCcsXHJcblx0bm9fY3NzOiBmYWxzZSxcclxufTtcclxuXHJcbi8qKlxyXG4gKiBTdG9yZXMgdGhlIGNvbnRhaW5lciBvYmplY3QuXHJcbiAqXHJcbiAqIEB2YXIgXFxDb3JlXFxDb250YWluZXJcclxuICovXHJcbmxldCBDb250YWluZXIkMjtcclxuXHJcbi8qKlxyXG4gKiBTdG9yZXMgdGhlIGV2ZW50IG1hbmFnZXIgb2JqZWN0LlxyXG4gKlxyXG4gKiBAdmFyIFxcQ29yZVxcRXZlbnRNYW5hZ2VyXHJcbiAqL1xyXG5sZXQgRXZlbnRNYW5hZ2VyJDM7XHJcblxyXG4vKipcclxuICogU3RvcmVzIHRoZSByZXF1ZXN0IG9iamVjdC5cclxuICpcclxuICogQHZhciBcXEhlbHBlcnNcXFJlcXVlc3RcclxuICovXHJcbmxldCBIdHRwJDE7XHJcblxyXG4vKipcclxuICogQGNsYXNzIENoZWNrb3V0XHJcbiAqXHJcbiAqIEhhbmRsZXMgdGhlIGNoZWNrb3V0IHByb2Nlc3MuXHJcbiAqIHBheW1lbnRzIHZhbGlkYXRpb24sIGNhcnQgdmFsaWRhdGlvbiBldGMuLlxyXG4gKi9cclxuXHJcbmNsYXNzIENoZWNrb3V0IGV4dGVuZHMgQmFzZUNvbXBvbmVudFxyXG57XHJcblx0LyoqXHJcblx0ICogLSBJbml0aWFsaXplIHRoZSBJb0MgY29udGFpbmVyXHJcblx0ICogLSBJbml0aWFsaXplIHRoZSBSZXF1ZXN0XHJcblx0ICogLSBJbml0aWFsaXplIHRoZSBFdmVudE1hbmFnZXJcclxuXHQgKiAtIExpc3RlbiB0byBjaGVja291dCBldmVudC5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSBcXENvcmVcXENvbnRhaW5lciB8IGNvbnRhaW5lclxyXG5cdCAqIEBwYXJhbSBcXEhlbHBlcnNcXFJlcXVlc3QgfCBodHRwXHJcblx0ICogQHBhcmFtIFxcQ29yZVxcRXZlbnRNYW5hZ2VyIHwgZXZlbnRNYW5hZ2VyXHJcblx0ICogQHJldHVybiB2b2lkXHJcblx0ICovXHJcblx0Y29uc3RydWN0b3IoY29udGFpbmVyLCBodHRwLCBldmVudE1hbmFnZXIpIFxyXG5cdHtcclxuXHRcdHN1cGVyKCk7XHJcblxyXG5cdFx0Q29udGFpbmVyJDIgPSBjb250YWluZXI7XHJcblx0XHRIdHRwJDEgPSBodHRwO1xyXG5cdFx0RXZlbnRNYW5hZ2VyJDMgPSBldmVudE1hbmFnZXI7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBTZXRzIHRoZSBvYmplY3QgYnkgdGhlIHVzZXJzIHNldHRpbmcuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gb2JqZWN0IHwgc2V0dGluZ3NcclxuXHQgKiBAcmV0dXJuIHZvaWRcclxuXHQgKi9cclxuXHRzZXR1cChzZXR0aW5ncylcclxuXHR7XHJcblx0XHRpZiAodHlwZW9mIHNldHRpbmdzICE9ICdvYmplY3QnKSB7XHJcblx0XHRcdHRocm93IG5ldyBJbnZhbGlkQXJndW1lbnRFeGNlcHRpb24kMTtcclxuXHRcdH1cclxuXHJcblx0XHR0aGlzLnNldHRpbmdzID0gQ29tbW9uLmV4dGVuZChkZWZhdWx0U2V0dGluZ3MkMywgc2V0dGluZ3MpO1xyXG5cclxuXHRcdGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCBmdW5jdGlvbigpIHtcclxuXHJcblx0XHRcdHRoaXMuc2V0RWxlbWVudCh0aGlzLnNldHRpbmdzLmVsZW1lbnQpO1xyXG5cdFx0XHR0aGlzLmhpZGUoKTtcclxuXHRcdFx0dGhpcy5kcmF3KCk7XHJcblx0XHR9LmJpbmQodGhpcykpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQmluZHMgZXZlcnRoaW5nIHRvIHRoZSBlbGVtZW50LlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIHN0cmluZyB8IHNlbGVjdG9yXHJcblx0ICogQHJldHVybiB2b2lkXHJcblx0ICovXHJcblx0c2V0RWxlbWVudChzZWxlY3RvcilcclxuXHR7XHJcblx0XHR0aGlzLmVsZW1lbnQgPSBET00uZmluZChzZWxlY3Rvcik7XHJcblxyXG5cdFx0aWYgKHRoaXMuZWxlbWVudCkge1xyXG5cdFx0XHRET00uYWRkQ2xhc3ModGhpcy5lbGVtZW50LCB0aGlzLnNldHRpbmdzLmNsYXNzKTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIENoYW5nZXMgdGhlIHVybCB0byBiZSBjaGVja291dFxyXG5cdCAqXHJcblx0ICogQHJldHVybiB2b2lkIFxyXG5cdCAqL1xyXG5cdGNoYW5nZVVybCgpXHJcblx0e1xyXG5cdFx0VXJsLmNoYW5nZSgnY2hlY2tvdXQnKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEFkZCB0aGUgZUNvbW1lcmNlIHN0eWxlIHRhZ3MgdG8gdGhlIERPTS5cclxuXHQgKlxyXG5cdCAqIEByZXR1cm4gdm9pZFxyXG5cdCAqL1xyXG5cdGRyYXcoKSBcclxuXHR7XHJcblx0XHRpZiAoRE9NLmZpbmQoJyNUdXJiby1lQ29tbWVyY2UtQ2hlY2tvdXQnKSkge1xyXG5cdFx0XHRyZXR1cm47XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKHRoaXMuc2V0dGluZ3Mubm9fY3NzKSB7XHJcblx0XHRcdHJldHVybjtcclxuXHRcdH1cclxuXHJcblx0XHRsZXQgcG9zaXRpb24gPSAodGhpcy5zZXR0aW5ncy5maXhlZCkgPyAnZml4ZWQnIDogJ2Fic29sdXRlJztcclxuXHJcblx0XHRsZXQgY3NzID0gYFxyXG5cdFx0XHQke3RoaXMuc2V0dGluZ3MuZWxlbWVudH0ge1xyXG5cdFx0XHRcdHdpZHRoOiAxMDAlO1xyXG5cdFx0XHRcdG1pbi1oZWlnaHQ6IDQwMHB4O1xyXG5cdFx0XHRcdGJvcmRlcjogMXB4IHNvbGlkICNlNGU0ZTQ7XHJcblx0XHRcdH1cclxuXHRcdGA7XHJcblx0ICAgIFxyXG5cdCAgICBET00uYWRkU3R5bGUoJ1R1cmJvLWVDb21tZXJjZS1DaGVja291dCcsIGNzcyk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBIaWRlcyBhbGwgaXJyZWxldmFudCBlbGVtZW50cyBmcm9tIHRoZSBET00uXHJcblx0ICpcclxuXHQgKiBAcmV0dXJuIHZvaWQgXHJcblx0ICovXHJcblx0aGlkZUFsbCgpXHJcblx0e1x0XHJcblx0XHRDb250YWluZXIkMi5Db21wb25lbnRzLmJvb3RlZC5mb3JFYWNoKGZ1bmN0aW9uKGNvbXBvbmVudCkge1xyXG5cdFx0XHRpZiAoY29tcG9uZW50LmNvbnN0cnVjdG9yLm5hbWUgIT0gJ0NoZWNrb3V0Jykge1xyXG5cdFx0XHRcdGNvbXBvbmVudC5oaWRlKCk7XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cdH1cclxufVxuXG4vLyBIZWxwZXJzXHJcbi8vIENvbXBvbmVudHNcclxuLy8gRXhjZXB0aW9uc1xyXG4vKipcclxuICogVGhlIGRlZmF1bHQgc2V0dGluZ3Mgb2YgZWFjaCBwcm9kdWN0LlxyXG4gKlxyXG4gKiBAdmFyIG9iamVjdFxyXG4gKi9cclxubGV0IGRlZmF1bHRTZXR0aW5ncyQ0ID0ge1xyXG5cdGVsZW1lbnQ6ICcucHJvZHVjdHMnLFxyXG5cdGNsYXNzOiAnJyxcclxuXHRpdGVtX2NsYXNzOiAnJyxcclxuXHRhZGRfYnV0dG9uX2NsYXNzOiAnYnRuIGJ0bi1wcmltYXJ5JyxcclxuXHRmYXZvcml0ZV9idXR0b25fY2xhc3M6ICdidG4gYnRuLWRhbmdlcicsXHJcblx0d2lkdGg6ICcyMDBweCcsXHJcblx0aGVpZ2h0OiAnMjUwcHgnLFxyXG5cdGF0dHJpYnV0ZXM6IFsnbmFtZScsICdwcmljZScsICdkZWxpdmVyeVRpbWUnLCAnaW1hZ2UnXSxcclxuXHR1cmw6ICdwcm9kdWN0cy5waHAnLFxyXG5cdG5vX2NzczogZmFsc2UsXHJcblx0Y3VycmVuY3k6ICckJyxcclxufTtcclxuXHJcbi8qKlxyXG4gKiBTdG9yZXMgdGhlIGNvbnRhaW5lciBvYmplY3QuXHJcbiAqIFxyXG4gKiBAdmFyIFxcQ29yZVxcQ29udGFpbmVyXHJcbiAqL1xyXG5sZXQgQ29udGFpbmVyJDM7XHJcblxyXG4vKipcclxuICogU3RvcmVzIHRoZSBjb250YWluZXIgb2JqZWN0LlxyXG4gKiBcclxuICogQHZhciBcXENvcmVcXEV2ZW50TWFuYWdlclxyXG4gKi9cclxubGV0IEV2ZW50TWFuYWdlciQ0O1xyXG5cclxuLyoqXHJcbiAqIFN0b3JlcyB0aGUgcmVxdWVzdCBvYmplY3QuXHJcbiAqIFxyXG4gKiBAdmFyIFxcSGVscGVyXFxSZXF1ZXN0IFxyXG4gKi9cclxubGV0IEh0dHAkMjtcclxuXHJcbi8qKlxyXG4gKiBTdG9yZXMgdGhlIGNodW5rZWQgcGVyIFxyXG4gKiBwYWdlIHByb2R1Y3RzLlxyXG4gKiBcclxuICogQHZhciBhcnJheVxyXG4gKi9cclxubGV0IGNodW5rZWRQcm9kdWN0cztcclxuXHJcbi8qKlxyXG4gKiBAY2xhc3MgUHJvZHVjdHNcclxuICpcclxuICogVGhlIFByb2R1Y3RzIGNvbXBvbmVudCwgaGFuZGxlcyB0aGUgcHJvZHVjdHMgdGFza3MuXHJcbiAqL1xyXG5cclxuY2xhc3MgUHJvZHVjdHMgZXh0ZW5kcyBCYXNlQ29tcG9uZW50XHJcbntcclxuXHQvKipcclxuXHQgKiBJbml0YWxpemUgdGhlIENvbnRhaW5lci5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSBcXENvcmVcXENvbnRhaW5lciB8IGNvbnRhaW5lclxyXG5cdCAqIEBwYXJhbSBcXEhlbHBlcnNcXFJlcXVlc3QgfCBodHRwXHJcblx0ICogQHJldHVybiB2b2lkXHJcblx0ICovXHJcblx0Y29uc3RydWN0b3IoY29udGFpbmVyLCBodHRwLCBldmVudE1hbmFnZXIpIFxyXG5cdHtcclxuXHRcdHN1cGVyKCk7XHJcblxyXG5cdFx0Q29udGFpbmVyJDMgPSBjb250YWluZXI7XHJcblx0XHRIdHRwJDIgPSBodHRwO1xyXG5cdFx0RXZlbnRNYW5hZ2VyJDQgPSBldmVudE1hbmFnZXI7XHJcblx0XHRjaHVua2VkUHJvZHVjdHMgPSBbXTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFNldHMgdGhlIGdpdmVuIHNldHRpbmdzIGZyb20gdGhlIHVzZXIuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gb2JqZWN0IHwgc2V0dGluZ3NcclxuXHQgKiBAcmV0dXJuIHZvaWRcclxuXHQgKi9cclxuXHRzZXR1cChzZXR0aW5ncylcclxuXHR7XHJcblx0XHRpZiAodHlwZW9mIHNldHRpbmdzICE9ICdvYmplY3QnKSB7XHJcblx0XHRcdHRocm93IG5ldyBJbnZhbGlkQXJndW1lbnRFeGNlcHRpb24kMTtcclxuXHRcdH1cclxuXHJcblx0XHR0aGlzLnNldHRpbmdzID0gQ29tbW9uLmV4dGVuZChkZWZhdWx0U2V0dGluZ3MkNCwgc2V0dGluZ3MpO1xyXG5cdFx0dGhpcy50b3RhbEl0ZW1zID0gbnVsbDtcclxuXHJcblx0XHRkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgZnVuY3Rpb24oKSB7XHJcblxyXG5cdFx0XHR0aGlzLnNldEVsZW1lbnQodGhpcy5zZXR0aW5ncy5lbGVtZW50KTtcclxuXHJcblx0XHRcdHRoaXMuZHJhdygpO1x0XHJcblxyXG5cdFx0XHR0aGlzLmxvYWRQcm9kdWN0cygxKTtcclxuXHRcdH0uYmluZCh0aGlzKSk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBMb2FkcyB0aGUgcHJvZHVjdHMgZm9yIHRoZSBwYWdlLlxyXG5cdCAqIFxyXG5cdCAqIEBwYXJhbSBudW1iZXIgfCBwYWdlTnVtYmVyXHJcblx0ICogQHJldHVybiB2b2lkXHJcblx0ICovXHJcblx0bG9hZFByb2R1Y3RzKHBhZ2VOdW1iZXIgPSAxKVxyXG5cdHtcclxuXHRcdGlmIChDb250YWluZXIkMy5QYWdpbmF0aW9uICYmIENvbnRhaW5lciQzLlBhZ2luYXRpb24uYm9vdGVkKSB7XHJcblx0XHRcdFxyXG5cdFx0XHRsZXQgbGltaXQgPSBDb250YWluZXIkMy5QYWdpbmF0aW9uLnNldHRpbmdzLnBlcl9wYWdlO1xyXG5cclxuXHRcdFx0c3dpdGNoKENvbnRhaW5lciQzLlBhZ2luYXRpb24uc2V0dGluZ3MucHJvY2Vzc2luZykgXHJcblx0XHRcdHtcclxuXHRcdFx0XHRjYXNlICdjbGllbnQtc2lkZSc6XHJcblx0XHRcdFx0XHRyZXR1cm4gdGhpcy5sb2FkUGFnZVByb2R1Y3RzT25jZShwYWdlTnVtYmVyLCBsaW1pdCk7XHJcblx0XHRcdFx0XHRicmVhaztcclxuXHRcdFx0XHRjYXNlICdzZXJ2ZXItc2lkZSc6XHJcblx0XHRcdFx0XHRyZXR1cm4gdGhpcy5sb2FkUGFnZVByb2R1Y3RzKHBhZ2VOdW1iZXIsIGxpbWl0KTtcclxuXHRcdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRcdGRlZmF1bHQ6XHJcblx0XHRcdFx0XHR0aHJvdyBuZXcgSW52YWxpZEFyZ3VtZW50RXhjZXB0aW9uJDEoJ2ZvciBwcm9jZXNzaW5nIHlvdSBjYW4gY2hvb3NlIFxcJ3NlcnZlci1zaWRlXFwnIG9yIFxcJ2NsaWVudC1zaWRlXFwnIG9wdGlvbnMuJyk7XHJcblx0XHRcdH1cclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdHRoaXMubG9hZFBhZ2VQcm9kdWN0cygpO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogTG9hZHMgdGhlIHByb2R1Y3RzIGFuZCBcclxuXHQgKiByZXBsYWNlIHRoZW0gaW4gdGhlIGRpdiBjb250YWluZXIuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gbnVtYmVyIHwgcGFnZU51bWJlclxyXG5cdCAqIEBwYXJhbSBudW1iZXIgfCBsaW1pdFxyXG5cdCAqIEByZXR1cm4gdm9pZFxyXG5cdCAqL1xyXG5cdGxvYWRQYWdlUHJvZHVjdHMocGFnZU51bWJlciA9IG51bGwsIGxpbWl0ID0gbnVsbClcclxuXHR7XHJcblx0XHRsZXQgcmVxdWVzdCA9IHRoaXMuZ2V0UHJvZHVjdHMocGFnZU51bWJlcik7XHJcblxyXG5cdFx0cmVxdWVzdC50aGVuKGZ1bmN0aW9uKHByb2R1Y3RzKSB7XHJcblx0XHRcdGlmIChsaW1pdCkge1xyXG5cdFx0XHRcdHRoaXMuY3VycmVudEl0ZW1zID0gcHJvZHVjdHMuc2xpY2UoMCwgbGltaXQpO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdHRoaXMuY3VycmVudEl0ZW1zID0gcHJvZHVjdHM7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHRoaXMucmVwbGFjZVByb2R1Y3RzKHRoaXMuY3VycmVudEl0ZW1zKTtcclxuXHRcdFx0UHJvbWlzZS5yZXNvbHZlKHRoaXMuY3VycmVudEl0ZW1zKTtcclxuXHRcdH0uYmluZCh0aGlzKSkuY2F0Y2goZnVuY3Rpb24oZXJyb3IpIHtcclxuXHRcdFx0Ly8gdGhyb3cgbmV3IEVycm9yKCdDb3VsZCBub3QgbG9hZCBwcm9kdWN0cyEgUmVhc29uOiAnICsgZXJyb3IpO1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0cmV0dXJuIHJlcXVlc3Q7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBMb2FkcyB0aGUgcHJvZHVjdHMgYW5kIFxyXG5cdCAqIHJlcGxhY2UgdGhlbSBpbiB0aGUgZGl2IGNvbnRhaW5lci5cclxuXHQgKlxyXG5cdCAqIEByZXR1cm4gdm9pZFxyXG5cdCAqL1xyXG5cdGxvYWRQYWdlUHJvZHVjdHNPbmNlKHBhZ2VOdW1iZXIpXHJcblx0e1xyXG5cdFx0bGV0IHJlcXVlc3Q7XHJcblxyXG5cdFx0aWYgKHRoaXMudG90YWxJdGVtcyA9PSBudWxsKSB7IC8vIG5lZWQgdG8gZmV0Y2ggdGhlbSBmcm9tIHRoZSBzZXJ2ZXIuXHJcblx0XHRcdHJlcXVlc3QgPSB0aGlzLmdldFByb2R1Y3RzKCk7XHJcblx0XHR9IGVsc2UgeyAvLyBubyBuZWVkIHRvIHdhaXQgY2FuIHJlc29sdmUgaW1tZWRpYXRlbHkgd2l0aCB0aGUgcHJvZHVjdHMuIFxyXG5cdFx0XHRyZXF1ZXN0ID0gUHJvbWlzZS5yZXNvbHZlKHRoaXMudG90YWxJdGVtcyk7XHJcblx0XHR9XHJcblxyXG5cdFx0cmVxdWVzdC50aGVuKGZ1bmN0aW9uKHByb2R1Y3RzKSB7XHJcblx0XHRcdHRoaXMudG90YWxJdGVtcyA9IHByb2R1Y3RzO1xyXG5cdFx0XHRsZXQgcGFnZXMgPSB0aGlzLmNhbGN1bGF0ZUNsaWVudFBhZ2VzKHByb2R1Y3RzKTtcclxuXHRcdFx0dGhpcy5jdXJyZW50SXRlbXMgPSBwYWdlc1twYWdlTnVtYmVyLTFdO1xyXG5cdFx0XHR0aGlzLnJlcGxhY2VQcm9kdWN0cyh0aGlzLmN1cnJlbnRJdGVtcyk7XHJcblx0XHRcdFByb21pc2UucmVzb2x2ZSh0aGlzLmN1cnJlbnRJdGVtcyk7XHJcblx0XHR9LmJpbmQodGhpcykpLmNhdGNoKGZ1bmN0aW9uKGVycm9yKSB7XHJcblx0XHRcdC8vIHRocm93IG5ldyBFcnJvcignQ291bGQgbm90IGxvYWQgcHJvZHVjdHMhIFJlYXNvbjogJyArIGVycm9yKTtcclxuXHRcdH0pO1xyXG5cclxuXHRcdHJldHVybiByZXF1ZXN0O1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQ2FsY3VsYXRlcyB0aGUgYW1vdW50IG9mIHBhZ2VzIGZvciB0aGUgY2xpZW50LlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIGFycmF5IHwgcHJvZHVjdHNcclxuXHQgKiBAcmV0dXJuIGFycmF5XHJcblx0ICovXHJcblx0Y2FsY3VsYXRlQ2xpZW50UGFnZXMocHJvZHVjdHMpXHJcblx0e1x0XHJcblx0XHQvLyBXZSBhcmUgdXNpbmcgcGFnaW5hdGlvbiBzbyB3ZSBuZWVkIHRvIHVwZGF0ZSBpdCB0b28uXHJcblx0XHRDb250YWluZXIkMy5QYWdpbmF0aW9uLnNldHRpbmdzLnRvdGFsX2l0ZW1zID0gcHJvZHVjdHMubGVuZ3RoO1xyXG5cdFx0XHJcblx0XHRsZXQgcGVyUGFnZSA9IENvbnRhaW5lciQzLlBhZ2luYXRpb24uc2V0dGluZ3MucGVyX3BhZ2U7IFxyXG5cclxuXHRcdC8vIFdlIG5lZWQgdG8gY2FsY3VsYXRlIHRoZSBwYWdlcyBvbiBmdWxsIGh0dHAgcmVxdWVzdCBcclxuXHRcdC8vIG9ubHkgb25jZS4gc28gd2UgY2hlY2sgdG8gc2VlIGlmIHdlIGhhdmUgcmVzdWx0cyBpbiBvdXIgY2FjaGUuXHJcblx0XHRpZiAoY2h1bmtlZFByb2R1Y3RzLmxlbmd0aCAhPSAwKSB7XHJcblx0XHRcdHJldHVybiBjaHVua2VkUHJvZHVjdHM7XHJcblx0XHR9XHJcblxyXG5cdFx0Y2h1bmtlZFByb2R1Y3RzID0gQ29tbW9uLmFycmF5X2NodW5rKHByb2R1Y3RzLCBwZXJQYWdlKTtcclxuXHRcdHJldHVybiBjaHVua2VkUHJvZHVjdHM7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBTZXRzIHRoZSBET00gZWxlbWVudCBcclxuXHQgKiBmb3IgcG9wdWxhdGluZyB0aGUgcHJvZHVjdHMuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gc3RyaW5nIHwgc2VsZWN0b3JcclxuXHQgKiBAcmV0dXJuIHZvaWRcclxuXHQgKi9cclxuXHRzZXRFbGVtZW50KHNlbGVjdG9yKVxyXG5cdHtcclxuXHRcdHRoaXMuZWxlbWVudCA9IERPTS5maW5kKHNlbGVjdG9yKTtcclxuXHJcblx0XHRpZiAodGhpcy5lbGVtZW50KSB7XHJcblx0XHRcdERPTS5hZGRDbGFzcyh0aGlzLmVsZW1lbnQsIHRoaXMuc2V0dGluZ3MuY2xhc3MpO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogUmVwbGFjZSBwcm9kdWN0cyBpbiBcclxuXHQgKiB0aGUgcHJvZHVjdHMgY29udGFpbmVyLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIGFycmF5IHwgcmF3UHJvZHVjdHNcclxuXHQgKiBAcmV0dXJuIGFycmF5XHJcblx0ICovXHJcblx0cmVwbGFjZVByb2R1Y3RzKHJhd1Byb2R1Y3RzKSBcclxuXHR7XHJcblx0XHRpZiAoISBBcnJheS5pc0FycmF5KHJhd1Byb2R1Y3RzKSB8fCAocmF3UHJvZHVjdHMubGVuZ3RoIDw9IDAgJiYgdHlwZW9mIHJhd1Byb2R1Y3RzWzBdID09ICdzdHJpbmcnKSkge1xyXG5cdFx0XHR0aHJvdyBuZXcgSW52YWxpZEFyZ3VtZW50RXhjZXB0aW9uJDE7XHJcblx0XHR9XHJcblxyXG5cdFx0bGV0IHByb2R1Y3RzID0gdGhpcy5idWlsZFByb2R1Y3RzKHJhd1Byb2R1Y3RzLCB0aGlzLnNldHRpbmdzLml0ZW1fY2xhc3MsICdkaXYnKTtcclxuXHJcblx0XHR0aGlzLmVsZW1lbnQuaW5uZXJIVE1MID0gJyc7XHJcblx0XHRwcm9kdWN0cy5mb3JFYWNoKGZ1bmN0aW9uKHByb2R1Y3QpIHtcclxuXHRcdFx0RXZlbnRNYW5hZ2VyJDQucHVibGlzaCgncHJvZHVjdHMubG9hZGluZycsIHByb2R1Y3QpO1xyXG5cdFx0XHR0aGlzLmVsZW1lbnQuYXBwZW5kQ2hpbGQocHJvZHVjdCk7XHJcblx0XHR9LmJpbmQodGhpcykpO1xyXG5cclxuXHRcdEV2ZW50TWFuYWdlciQ0LnB1Ymxpc2goJ3Byb2R1Y3RzLmxvYWRlZCcsIHByb2R1Y3RzKTtcclxuXHJcblx0XHRyZXR1cm4gcHJvZHVjdHM7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBNYWtlcyBhbiBBamF4IGNhbGwgdG8gdGhlIFxyXG5cdCAqIHNlcnZlciB3aXRob3V0IHBhcmFtZXRlcnMuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gbnVtYmVyIHwgcGFnZU51bWJlclxyXG5cdCAqIEByZXR1cm4gUHJvbWlzZVxyXG5cdCAqL1xyXG5cdGdldFByb2R1Y3RzKHBhZ2VOdW1iZXIgPSBudWxsKVxyXG5cdHtcclxuXHRcdGxldCBhY3Rpb24gPSAocGFnZU51bWJlcikgPyB0aGlzLnNldHRpbmdzLnVybCArICc/cGFnZT0nICsgcGFnZU51bWJlciA6IHRoaXMuc2V0dGluZ3MudXJsO1xyXG5cclxuXHRcdHJldHVybiBIdHRwJDIuZ2V0KHtcclxuXHRcdFx0dXJsOiBhY3Rpb24sXHJcblx0XHR9KTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEJ1aWxkcyB0aGUgaHRtbCBmb3IgdGhlIHByb2R1Y3RzLlxyXG5cdCAqIFxyXG5cdCAqIEBwYXJhbSBhcnJheSB8IGF0dHJpYnV0ZXNDb2xsZWN0aW9uXHJcblx0ICogQHBhcmFtIHN0cmluZyB8IGNsYXNzTmFtZVxyXG5cdCAqIEBwYXJhbSBzdHJpbmcgfCB0YWdUeXBlXHJcblx0ICogQHJldHVybiBhcnJheVxyXG5cdCAqL1xyXG5cdGJ1aWxkUHJvZHVjdHMoYXR0cmlidXRlc0NvbGxlY3Rpb24sIGNsYXNzTmFtZSwgdGFnVHlwZSkgXHJcblx0e1xyXG5cdFx0aWYoYXR0cmlidXRlc0NvbGxlY3Rpb24uY29uc3RydWN0b3IubmFtZSAhPSAnQXJyYXknICkge1xyXG5cdFx0XHR0aHJvdyBuZXcgSW52YWxpZEFyZ3VtZW50RXhjZXB0aW9uJDE7XHJcblx0XHR9XHJcblxyXG5cdFx0bGV0IGJ1aWx0UHJvZHVjdHMgPSBbXTtcclxuXHJcblx0XHQvLyBFbnRlciBkZWZhdWx0IGF0dHJpYnV0ZS5cclxuXHRcdGlmICh0aGlzLnNldHRpbmdzLmF0dHJpYnV0ZXMuaW5kZXhPZignY3VycmVuY3knKSA9PSAtMSkge1xyXG5cdFx0XHR0aGlzLnNldHRpbmdzLmF0dHJpYnV0ZXMucHVzaCgnY3VycmVuY3knKTtcclxuXHRcdH1cclxuXHRcdFxyXG5cdFx0YXR0cmlidXRlc0NvbGxlY3Rpb24uZm9yRWFjaChmdW5jdGlvbihhdHRyaWJ1dGVzKSB7XHJcblx0XHRcdGxldCBidWlsdFByb2R1Y3QgPSB0aGlzLmJ1aWxkUHJvZHVjdChhdHRyaWJ1dGVzLCBjbGFzc05hbWUsIHRhZ1R5cGUpO1xyXG5cdFx0XHRidWlsdFByb2R1Y3RzLnB1c2goYnVpbHRQcm9kdWN0KTtcclxuXHRcdH0uYmluZCh0aGlzKSk7XHJcblxyXG5cdFx0cmV0dXJuIGJ1aWx0UHJvZHVjdHM7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBCdWlsZHMgdGhlIGh0bWwgZm9yIGEgc2luZ2xlIHByb2R1Y3QuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gb2JqZWN0IHwgYXR0cmlidXRlc1xyXG5cdCAqIEBwYXJhbSBzdHJpbmcgfCBjbGFzc05hbWVcclxuXHQgKiBAcGFyYW0gc3RyaW5nIHwgdGFnVHlwZVxyXG5cdCAqIEByZXR1cm4gb2JqZWN0XHJcblx0ICovXHJcblx0YnVpbGRQcm9kdWN0KGF0dHJpYnV0ZXMsIGNsYXNzTmFtZSwgdGFnVHlwZSkgXHJcblx0e1xyXG5cdFx0aWYgKHR5cGVvZiBhdHRyaWJ1dGVzICE9ICdvYmplY3QnIHx8IHR5cGVvZiB0YWdUeXBlICE9ICdzdHJpbmcnKSB7XHJcblx0XHRcdHRocm93IG5ldyBJbnZhbGlkQXJndW1lbnRFeGNlcHRpb24kMTtcclxuXHRcdH1cclxuXHJcblx0XHRjbGFzc05hbWUgPSBjbGFzc05hbWUgfHwgbnVsbDtcclxuXHJcblx0XHRsZXQgcHJvZHVjdCA9IERPTS5jcmVhdGVFbGVtZW50KCdkaXYnLCB7XHJcblx0XHRcdGNsYXNzOiAncHJvZHVjdCdcclxuXHRcdH0pO1xyXG5cclxuXHRcdERPTS5hZGRDbGFzcyhwcm9kdWN0LCBjbGFzc05hbWUpO1xyXG5cclxuXHRcdGxldCBvdmVybGF5ID0gRE9NLmNyZWF0ZUVsZW1lbnQoJ2RpdicsIHtcclxuXHRcdFx0Y2xhc3M6ICdwcm9kdWN0LW92ZXJsYXknLFxyXG5cdFx0fSk7XHJcblxyXG5cdFx0cHJvZHVjdC5hcHBlbmRDaGlsZChvdmVybGF5KTtcclxuXHJcblx0XHRhdHRyaWJ1dGVzID0gdGhpcy5hZGREZWZhdWx0QXR0cmlidXRlcyhhdHRyaWJ1dGVzKTtcclxuXHJcblx0XHRpZiAoYXR0cmlidXRlcy5oYXNPd25Qcm9wZXJ0eSgnaW1hZ2UnKSkge1xyXG5cdFx0XHRsZXQgaW1hZ2UgPSBET00uY3JlYXRlRWxlbWVudCgnaW1nJywge1xyXG5cdFx0XHRcdHNyYzogYXR0cmlidXRlc1snaW1hZ2UnXVxyXG5cdFx0XHR9KTtcclxuXHRcdFx0XHJcblx0XHRcdGxldCB0YWcgPSBET00uY3JlYXRlRWxlbWVudCh0YWdUeXBlLCB7XHJcblx0XHRcdFx0Y2xhc3M6ICdwcm9kdWN0LWltYWdlJyxcclxuXHRcdFx0XHRodG1sOiBpbWFnZS5vdXRlckhUTUxcclxuXHRcdFx0fSk7XHJcblx0XHRcdFxyXG5cdFx0XHRwcm9kdWN0LmFwcGVuZENoaWxkKHRhZyk7XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKGF0dHJpYnV0ZXMuaGFzT3duUHJvcGVydHkoJ3ByaWNlJykpIHtcclxuXHRcdFx0bGV0IHRhZyA9IERPTS5jcmVhdGVFbGVtZW50KHRhZ1R5cGUsIHtcclxuXHRcdFx0XHRjbGFzczogJ3Byb2R1Y3QtcHJpY2UnLFxyXG5cdFx0XHR9KTtcclxuXHJcblx0XHRcdGxldCBzcGFuID0gRE9NLmNyZWF0ZUVsZW1lbnQoJ3NwYW4nLCB7XHJcblx0XHRcdFx0Y2xhc3M6ICdwcm9kdWN0LWFtb3VudCcsXHJcblx0XHRcdFx0aHRtbDogYXR0cmlidXRlcy5wcmljZS5hbW91bnRcclxuXHRcdFx0fSk7XHJcblxyXG5cdFx0XHRsZXQgc3BhbjIgPSBET00uY3JlYXRlRWxlbWVudCgnc3BhbicsIHtcclxuXHRcdFx0XHRjbGFzczogJ3Byb2R1Y3QtY3VycmVuY3knLFxyXG5cdFx0XHRcdGh0bWw6IGF0dHJpYnV0ZXMucHJpY2UuY3VycmVuY3lcclxuXHRcdFx0fSk7XHJcblxyXG5cdFx0XHR0YWcuYXBwZW5kQ2hpbGQoc3Bhbik7XHJcblx0XHRcdHRhZy5hcHBlbmRDaGlsZChzcGFuMik7XHJcblx0XHRcdG92ZXJsYXkuYXBwZW5kQ2hpbGQodGFnKTtcclxuXHRcdH1cclxuXHJcblx0XHRmb3IgKHZhciBhdHRyaWJ1dGUgaW4gYXR0cmlidXRlcykge1xyXG5cdFx0XHRpZiAoISBDb21tb24uaW5fYXJyYXkoYXR0cmlidXRlLCB0aGlzLnNldHRpbmdzLmF0dHJpYnV0ZXMpKSB7XHJcblx0XHRcdFx0Y29udGludWU7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGlmIChhdHRyaWJ1dGUgPT0gJ3ByaWNlJyB8fCBhdHRyaWJ1dGUgPT0gJ2ltYWdlJykge1xyXG5cdFx0XHRcdGNvbnRpbnVlO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRsZXQgdGFnID0gRE9NLmNyZWF0ZUVsZW1lbnQodGFnVHlwZSk7XHJcblx0XHRcdHRhZy5pbm5lckhUTUwgPSBhdHRyaWJ1dGVzW2F0dHJpYnV0ZV0gfHwgJyc7XHJcblx0XHRcdFxyXG5cdFx0XHRET00uYWRkQ2xhc3ModGFnLCAncHJvZHVjdC0nICsgU3RyLmtlYmFiQ2FzZShhdHRyaWJ1dGUpKTtcclxuXHRcdFx0b3ZlcmxheS5hcHBlbmRDaGlsZCh0YWcpO1xyXG5cdFx0fVxyXG5cclxuXHRcdGxldCB0YWcgPSBET00uY3JlYXRlRWxlbWVudCgnZGl2Jywge1xyXG5cdFx0XHRjbGFzczogJ2FjdGlvbi1idXR0b25zJ1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0bGV0IGFkZFRvQ2FydCA9IERPTS5jcmVhdGVFbGVtZW50KCdidXR0b24nLCB7XHJcblx0XHRcdGNsYXNzOiAnYWRkLXRvLWNhcnQnLFxyXG5cdFx0XHR0eXBlOiAnYnV0dG9uJyxcclxuXHRcdFx0dGV4dDogJysnLFxyXG5cdFx0fSk7XHJcblxyXG5cdFx0bGV0IGZhdm9yaXRlID0gRE9NLmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicsIHtcclxuXHRcdFx0Y2xhc3M6ICdmYXZvcml0ZScsXHJcblx0XHRcdHR5cGU6ICdidXR0b24nLFxyXG5cdFx0XHR0ZXh0OiAnJmhlYXJ0czsnXHJcblx0XHR9KTtcclxuXHJcblx0XHRpZiAodGhpcy5zZXR0aW5ncy5hZGRfYnV0dG9uX2NsYXNzKSB7XHJcblx0XHRcdERPTS5hZGRDbGFzcyhhZGRUb0NhcnQsIHRoaXMuc2V0dGluZ3MuYWRkX2J1dHRvbl9jbGFzcyk7XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKHRoaXMuc2V0dGluZ3MuZmF2b3JpdGVfYnV0dG9uX2NsYXNzKSB7XHJcblx0XHRcdERPTS5hZGRDbGFzcyhmYXZvcml0ZSwgdGhpcy5zZXR0aW5ncy5mYXZvcml0ZV9idXR0b25fY2xhc3MpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHRhZy5hcHBlbmRDaGlsZChhZGRUb0NhcnQpO1xyXG5cdFx0dGFnLmFwcGVuZENoaWxkKGZhdm9yaXRlKTtcclxuXHJcblx0XHRhZGRUb0NhcnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbihlKSB7XHJcblx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcclxuXHRcdFx0RXZlbnRNYW5hZ2VyJDQucHVibGlzaCgnY2FydC5wcm9kdWN0LmFkZGVkJywgYXR0cmlidXRlcyk7XHJcblx0XHR9KTtcclxuXHJcblx0XHRmYXZvcml0ZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcclxuXHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdFx0XHR0aGlzLmlubmVySFRNTCA9ICcmI3gyNzEzOyc7XHJcblx0XHRcdEV2ZW50TWFuYWdlciQ0LnB1Ymxpc2goJ2NhcnQucHJvZHVjdC5mYXZvcml0ZWQnLCBhdHRyaWJ1dGVzKTtcclxuXHRcdH0pO1xyXG5cclxuXHRcdG92ZXJsYXkuYXBwZW5kQ2hpbGQodGFnKTtcclxuXHJcblx0XHRyZXR1cm4gcHJvZHVjdDtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEFkZHMgZGVmYXVsdCBhdHRyaWJ1dGVzXHJcblx0ICogdG8gdGhlIHN1cHBsaWVkIGF0dHJpYnV0ZXMuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gb2JqZWN0IHwgYXR0cmlidXRlc1xyXG5cdCAqIEByZXR1cm4gb2JqZWN0XHJcblx0ICovXHJcblx0YWRkRGVmYXVsdEF0dHJpYnV0ZXMoYXR0cmlidXRlcylcclxuXHR7XHJcblx0XHRpZiAoYXR0cmlidXRlcy5oYXNPd25Qcm9wZXJ0eSgncHJpY2UnKSAmJiB0eXBlb2YgYXR0cmlidXRlcy5wcmljZSAhPSAnb2JqZWN0Jykge1xyXG5cdFx0XHRhdHRyaWJ1dGVzLnByaWNlID0ge1xyXG5cdFx0XHRcdFwiYW1vdW50XCI6IGF0dHJpYnV0ZXMucHJpY2UsXHJcblx0XHRcdFx0XCJjdXJyZW5jeVwiOiB0aGlzLnNldHRpbmdzLmN1cnJlbmN5XHJcblx0XHRcdH07XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIGF0dHJpYnV0ZXM7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBBZGQgdGhlIGVDb21tZXJjZSBzdHlsZSB0YWdzIHRvIHRoZSBET00uXHJcblx0ICovXHJcblx0ZHJhdygpIFxyXG5cdHtcclxuXHRcdGlmIChET00uZmluZCgnI1R1cmJvLWVDb21tZXJjZS1Qcm9kdWN0cycpKSB7XHJcblx0XHRcdHJldHVybjtcclxuXHRcdH1cclxuXHJcblx0XHRpZiAodGhpcy5zZXR0aW5ncy5ub19jc3MpIHtcclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0fVxyXG5cclxuXHRcdGxldCB3aWR0aCA9IHRoaXMuc2V0dGluZ3Mud2lkdGggfHwgJ2F1dG8nO1xyXG5cdFx0bGV0IGhlaWdodCA9IHRoaXMuc2V0dGluZ3MuaGVpZ2h0IHx8ICcyMDBweCc7XHJcblx0XHRsZXQgbWluV2lkdGggPSB0aGlzLnNldHRpbmdzLm1pbl93aWR0aCB8fCAnMjAwcHgnO1xyXG5cdFx0bGV0IG1heFdpZHRoID0gdGhpcy5zZXR0aW5ncy5tYXhfd2lkdGggfHwgJzI1MHB4JztcclxuXHJcblx0XHRsZXQgY3NzID0gYFxyXG5cdFx0XHQucHJvZHVjdCB7XHJcblx0XHRcdFx0cG9zaXRpb246IHJlbGF0aXZlO1xyXG5cdFx0XHRcdG1hcmdpbjogNXB4IDVweDtcclxuXHRcdFx0XHRib3JkZXI6IDFweCBzb2xpZCAjZTRlNGU0O1xyXG5cdFx0XHRcdHdpZHRoOiAke3dpZHRofTtcclxuXHRcdFx0XHRtaW4td2lkdGg6ICR7bWluV2lkdGh9O1xyXG5cdFx0XHRcdG1heC13aWR0aDogJHttYXhXaWR0aH07XHJcblx0XHRcdFx0aGVpZ2h0OiAke2hlaWdodH07XHJcblx0XHRcdFx0Y3Vyc29yOiBwb2ludGVyO1xyXG5cdFx0XHRcdGNvbG9yOiAjZmZmZmZmO1xyXG5cdFx0XHRcdG92ZXJmbG93OiBoaWRkZW47XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdC5wcm9kdWN0ID4gLnByb2R1Y3Qtb3ZlcmxheSB7XHJcblx0XHRcdFx0cG9zaXRpb246IGFic29sdXRlO1xyXG5cdFx0XHRcdHRvcDogMDtcclxuXHRcdFx0XHRsZWZ0OiAwO1xyXG5cdFx0XHRcdHdpZHRoOiAxMDAlO1xyXG5cdFx0XHRcdGhlaWdodDogMTAwJTtcclxuXHRcdFx0XHRvcGFjaXR5OiAwLjU7XHJcblx0XHRcdFx0ei1pbmRleDogNTtcclxuXHRcdFx0XHR0cmFuc2l0aW9uOiAxcyBhbGw7XHJcblx0XHRcdFx0dHJhbnNmb3JtOiB0cmFuc2xhdGVYKC0yNTBweCk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdC5wcm9kdWN0OmhvdmVyID4gLnByb2R1Y3Qtb3ZlcmxheSB7XHJcblx0XHRcdFx0YmFja2dyb3VuZDogcmdiYSgwLCAwLCAwLCAwLjQ1KTtcclxuXHRcdFx0XHR0cmFuc2Zvcm06IHRyYW5zbGF0ZVgoMHB4KTtcclxuXHRcdFx0XHRvcGFjaXR5OiAxO1xyXG5cdFx0XHRcdHRyYW5zaXRpb246IDAuNXMgYWxsO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHQucHJvZHVjdCA+IC5wcm9kdWN0LWltYWdlID4gaW1nIHtcclxuXHRcdFx0XHRwb3NpdGlvbjogYWJzb2x1dGU7XHJcblx0XHRcdFx0bGVmdDogMDtcclxuXHRcdFx0XHR0b3A6IDA7XHJcblx0XHRcdFx0d2lkdGg6IDEwMCU7XHJcblx0XHRcdFx0aGVpZ2h0OiAxMDAlO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHQucHJvZHVjdCA+IC5wcm9kdWN0LW92ZXJsYXkgPiAucHJvZHVjdC1uYW1lLCBcclxuXHRcdFx0LnByb2R1Y3QgPiAucHJvZHVjdC1vdmVybGF5ID4gLnByb2R1Y3QtcHJpY2UsXHJcblx0XHRcdC5wcm9kdWN0ID4gLnByb2R1Y3Qtb3ZlcmxheSA+IC5wcm9kdWN0LWRlbGl2ZXJ5LXRpbWUge1xyXG5cdFx0XHRcdHotaW5kZXg6IDE7XHJcblx0XHRcdFx0cG9zaXRpb246IHJlbGF0aXZlO1xyXG5cdFx0XHRcdHRleHQtYWxpZ246IGNlbnRlcjtcclxuXHRcdFx0XHRtYXJnaW4tdG9wOiAyNXB4O1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHQucHJvZHVjdCA+IC5wcm9kdWN0LW92ZXJsYXkgPiAuYWN0aW9uLWJ1dHRvbnMge1xyXG5cdFx0XHRcdHdpZHRoOiAxMDAlO1xyXG5cdFx0XHRcdG1hcmdpbi10b3A6IDEwcHg7XHJcblx0XHRcdFx0dGV4dC1hbGlnbjogY2VudGVyO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHQucHJvZHVjdCA+IC5wcm9kdWN0LW92ZXJsYXkgPiAuYWN0aW9uLWJ1dHRvbnMgPiAuZmF2b3JpdGUge1xyXG5cdFx0XHRcdG1hcmdpbi1sZWZ0OiAxMHB4O1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0YDtcclxuXHQgICAgXHJcblx0ICAgIERPTS5hZGRTdHlsZSgnVHVyYm8tZUNvbW1lcmNlLVByb2R1Y3RzJywgY3NzKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEhpZGVzIGFsbCBpcnJlbGV2YW50IGVsZW1lbnRzIGZyb20gdGhlIERPTS5cclxuXHQgKlxyXG5cdCAqIEByZXR1cm4gdm9pZCBcclxuXHQgKi9cclxuXHRoaWRlQWxsKClcclxuXHR7XHRcclxuXHRcdENvbnRhaW5lciQzLkNvbXBvbmVudHMuYm9vdGVkLmZvckVhY2goZnVuY3Rpb24oY29tcG9uZW50KSB7XHJcblx0XHRcdGlmIChjb21wb25lbnQuY29uc3RydWN0b3IubmFtZSAhPSAnUHJvZHVjdHMnKSB7XHJcblx0XHRcdFx0Y29tcG9uZW50LmhpZGUoKTtcclxuXHRcdFx0fVxyXG5cdFx0fSk7XHJcblx0fVxyXG59XG5cbi8vIENvbXBvbmVudHNcclxuLyoqXHJcbiAqIFRoZSBTZXJ2aWNlcyBPYmplY3QsIGhhbmRsZXMgdGhlIHNlcnZpY2VzLlxyXG4gKi9cclxuY2xhc3MgU2VydmljZXMgZXh0ZW5kcyBCYXNlQ29tcG9uZW50IFxyXG57XHJcblxyXG59XG5cbmxldCBkZWZhdWx0TWVzc2FnZSQ0ID0gJ1NvcnJ5LCBubyBtb3JlIHBhZ2VzLic7XHJcblxyXG5jbGFzcyBOb3RJblBhZ2VSYW5nZUV4Y2VwdGlvbiBleHRlbmRzIEV4Y2VwdGlvbkhhbmRsZXJcclxue1xyXG5cdGNvbnN0cnVjdG9yKG1lc3NhZ2UgPSBudWxsKSBcclxuXHR7XHJcblx0XHRtZXNzYWdlID0gbWVzc2FnZSB8fCBkZWZhdWx0TWVzc2FnZSQ0O1xyXG5cdFx0c3VwZXIoKTtcclxuICAgIFx0c3VwZXIuc3RhY2tUcmFjZSh0aGlzLCBtZXNzYWdlKTtcclxuICAgIH1cclxufVxuXG4vLyBIZWxwZXJzXHJcbi8vIENvbXBvbmVudHNcclxuLy8gRXhjZXB0aW9uc1xyXG4vKipcclxuICogVGhlIGRlZmF1bHQgc2V0dGluZ3Mgb2YgdGhlIHBhZ2luYXRpb24uXHJcbiAqXHJcbiAqIEB2YXIgb2JqZWN0XHJcbiAqL1xyXG5sZXQgZGVmYXVsdFNldHRpbmdzJDUgPSB7XHJcblx0ZWxlbWVudDogJy5wYWdpbmF0aW9uLWxpbmtzJyxcclxuXHRwcm9jZXNzaW5nOiAnY2xpZW50LXNpZGUnLFxyXG5cdGNsYXNzOiAnJyxcclxuXHRwZXJfcGFnZTogNSxcclxuXHR0b3RhbF9pdGVtczogNSxcclxuXHR1cmxfcGFyYW1ldGVyOiAncGFnZScsXHJcblx0c2VwYXJhdG9yOiAnIycgXHJcbn07XHJcblxyXG4vKipcclxuICogU3RvcmVzIHRoZSBjb250YWluZXIgb2JqZWN0LlxyXG4gKlxyXG4gKiBAdmFyIFxcQ29yZVxcQ29udGFpbmVyXHJcbiAqL1xyXG5sZXQgQ29udGFpbmVyJDQ7XHJcblxyXG4vKipcclxuICogU3RvcmVzIHRoZSBwcm9kdWN0cyBjb21wb25lbnQuXHJcbiAqXHJcbiAqIEB2YXIgXFxDb21wb25lbnRzXFxQcm9kdWN0c1xyXG4gKi9cclxubGV0IFByb2R1Y3RzJDI7XHJcblxyXG4vKipcclxuICogU3RvcmVzIHRoZSBjb250YWluZXIgb2JqZWN0LlxyXG4gKiBcclxuICogQHZhciBcXENvcmVcXEV2ZW50TWFuYWdlclxyXG4gKi9cclxubGV0IEV2ZW50TWFuYWdlciQ1O1xyXG5cclxuLyoqXHJcbiAqIEBjbGFzcyBQYWdpbmF0aW9uXHJcbiAqXHJcbiAqIFRoZSBQYWdpbmF0aW9uIGNvbXBvbmVudCwgaGFuZGxlcyB0aGUgcGFnaW5hdGlvbi5cclxuICovXHJcblxyXG5jbGFzcyBQYWdpbmF0aW9uIGV4dGVuZHMgQmFzZUNvbXBvbmVudFxyXG57XHJcblx0LyoqXHJcblx0ICogLSBJbml0aWFsaXplIHRoZSBjb250YWluZXIgb2JqZWN0LlxyXG5cdCAqIC0gSW5pdGlhbGl6ZSB0aGUgcHJvZHVjdHMgY29tcG9uZW50LlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIFxcQ29yZVxcQ29udGFpbmVyIHwgY29udGFpbmVyXHJcblx0ICogQHBhcmFtIFxcQ29tcG9uZW50c1xcUHJvZHVjdHMgfCBwcm9kdWN0c1xyXG5cdCAqIEBwYXJhbSBcXENvbXBvbmVudHNcXFNlcnZpY2VzIHwgc2VydmljZXNcclxuXHQgKiBAcmV0dXJuIHZvaWRcclxuXHQgKi9cclxuXHRjb25zdHJ1Y3Rvcihjb250YWluZXIsIGV2ZW50cywgcHJvZHVjdHMgPSBudWxsLCBzZXJ2aWNlcyA9IG51bGwpIFxyXG5cdHtcclxuXHRcdHN1cGVyKCk7XHJcblxyXG5cdFx0Q29udGFpbmVyJDQgPSBjb250YWluZXI7XHJcblx0XHRQcm9kdWN0cyQyID0gcHJvZHVjdHM7XHJcblx0XHRFdmVudE1hbmFnZXIkNSA9IGV2ZW50cztcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFNldHVwIHRoZSBwYWdpbmF0aW9uLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIG9iamVjdCB8IHNldHRpbmdzXHJcblx0ICogQHJldHVybiB2b2lkXHJcblx0ICovXHJcblx0c2V0dXAoc2V0dGluZ3MpXHJcblx0e1x0XHJcblx0XHRpZih0eXBlb2Ygc2V0dGluZ3MgIT0gJ29iamVjdCcpIHtcclxuXHRcdFx0dGhyb3cgbmV3IEludmFsaWRBcmd1bWVudEV4Y2VwdGlvbiQxO1xyXG5cdFx0fVxyXG5cclxuXHRcdHRoaXMuc2V0dGluZ3MgPSBDb21tb24uZXh0ZW5kKGRlZmF1bHRTZXR0aW5ncyQ1LCBzZXR0aW5ncyk7XHJcblx0XHR0aGlzLnNldEN1cnJlbnQoMSk7XHJcblxyXG5cdFx0ZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsIGZ1bmN0aW9uKCkge1x0XHRcclxuXHRcdFx0dGhpcy5zZXRFbGVtZW50KHRoaXMuc2V0dGluZ3MuZWxlbWVudCk7XHJcblxyXG5cdFx0XHQvLyBBcyBhIGZhbGxiYWNrIGNob29zZSB0aGUgdXNlcidzIHNldHRpbmdzIGZvciB0aGUgdG90YWwgaXRlbXMgY291bnQuXHJcblx0XHRcdHRoaXMudG90YWxQYWdlcyA9IHRoaXMuY2FsY3VsYXRlVG90YWxQYWdlcyh0aGlzLnNldHRpbmdzLnBlcl9wYWdlLCB0aGlzLnNldHRpbmdzLnRvdGFsX2l0ZW1zKTtcclxuXHRcdFx0dGhpcy5idWlsZFBhZ2luYXRpb24oKTtcclxuXHRcdH0uYmluZCh0aGlzKSk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBCdWlsZHMgdGhlIHBhZ2luYXRpb24uXHJcblx0ICpcclxuXHQgKiBAcmV0dXJuIHZvaWRcclxuXHQgKi9cclxuXHRidWlsZFBhZ2luYXRpb24oKVxyXG5cdHtcclxuXHRcdHRoaXMubGlua3MgPSB0aGlzLmNyZWF0ZUxpbmtzKCk7XHJcblx0XHR0aGlzLnJlcGxhY2VMaW5rcyh0aGlzLmxpbmtzKTtcclxuXHRcdHRoaXMuYmluZEV2ZW50TGlzdGVuZXJzKHRoaXMubGlua3MpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogU2V0cyB0aGUgZWxlbWVudC5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSBzdHJpbmcgfCBzZWxlY3RvclxyXG5cdCAqIEByZXR1cm4gdm9pZFxyXG5cdCAqL1xyXG5cdHNldEVsZW1lbnQoc2VsZWN0b3IpXHJcblx0e1xyXG5cdFx0dGhpcy5lbGVtZW50ID0gRE9NLmZpbmQoc2VsZWN0b3IpO1xyXG5cdFx0XHJcblx0XHRET00uYWRkQ2xhc3ModGhpcy5lbGVtZW50LCB0aGlzLnNldHRpbmdzLmNsYXNzKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFJlcGxhY2VzIHRoZSBsaW5rcyBpbiB0aGUgZWxlbWVudC5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSBIVE1MVUxpc3RFbGVtZW50IHwgbGlua3NcclxuXHQgKiBAcmV0dXJuIHZvaWRcclxuXHQgKi9cclxuXHRyZXBsYWNlTGlua3MobGlua3MpXHJcblx0e1xyXG5cdFx0dGhpcy5lbGVtZW50LmlubmVySFRNTCA9ICcnO1xyXG5cdFx0dGhpcy5lbGVtZW50LmFwcGVuZENoaWxkKGxpbmtzKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIENhbGN1bGF0ZXMgdGhlIHRvdGFsIHBhZ2VzLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIG51bWJlciB8IHBlclBhZ2VcclxuXHQgKiBAcGFyYW0gbnVtYmVyIHwgdG90YWxJdGVtc1xyXG5cdCAqIEByZXR1cm4gbnVtYmVyXHJcblx0ICovXHJcblx0Y2FsY3VsYXRlVG90YWxQYWdlcyhwZXJQYWdlLCB0b3RhbEl0ZW1zKVxyXG5cdHtcclxuXHRcdHBlclBhZ2UgPSBwYXJzZUludChwZXJQYWdlKTtcclxuXHRcdHRvdGFsSXRlbXMgPSBwYXJzZUludCh0b3RhbEl0ZW1zKTtcclxuXHJcblx0XHRyZXR1cm4gTWF0aC5jZWlsKHRvdGFsSXRlbXMgLyBwZXJQYWdlKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEJpbmRzIHRoZSBidXR0b25zIGV2ZW50cyBsaXN0ZW5lcnMuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gSFRNTFVMaXN0RWxlbWVudCB8IGxpbmtzXHJcblx0ICogQHJldHVybiB2b2lkXHJcblx0ICovXHJcblx0YmluZEV2ZW50TGlzdGVuZXJzKGxpbmtzKSBcclxuXHR7XHJcblx0XHRsZXQgaW5zdGFuY2UgPSB0aGlzO1xyXG5cclxuXHRcdHRoaXMubmV4dC5jaGlsZE5vZGVzWzBdLm9uY2xpY2sgPSBmdW5jdGlvbihlKSB7XHJcblx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcclxuXHJcblx0XHRcdGxldCByZXF1ZXN0ZWRQYWdlID0gaW5zdGFuY2UuY3VycmVudCsxO1xyXG5cclxuXHRcdFx0aWYgKGluc3RhbmNlLm5vdEluUGFnZVJhbmdlKHJlcXVlc3RlZFBhZ2UpKSB7XHJcblx0XHRcdFx0dGhyb3cgbmV3IE5vdEluUGFnZVJhbmdlRXhjZXB0aW9uKCdUaGUgcGFnZSB5b3UgcmVxdWVzdGluZyBkb2VzIG5vdCBleGlzdHMnKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0aWYgKFByb2R1Y3RzJDIgJiYgUHJvZHVjdHMkMi5ib290ZWQpIHtcclxuXHRcdFx0XHRQcm9kdWN0cyQyLmxvYWRQcm9kdWN0cyhyZXF1ZXN0ZWRQYWdlKS50aGVuKGZ1bmN0aW9uKHByb2R1Y3RzKSB7XHJcblx0XHRcdFx0XHRpbnN0YW5jZS5zZXRDdXJyZW50KHJlcXVlc3RlZFBhZ2UpO1xyXG5cdFx0XHRcdH0pO1xyXG5cdFx0XHR9XHJcblx0XHR9O1xyXG5cclxuXHRcdHRoaXMucHJldmlvdXMuY2hpbGROb2Rlc1swXS5vbmNsaWNrID0gZnVuY3Rpb24oZSkge1xyXG5cdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG5cdFx0XHRsZXQgcmVxdWVzdGVkUGFnZSA9IGluc3RhbmNlLmN1cnJlbnQtMTtcclxuXHJcblx0XHRcdGlmKGluc3RhbmNlLm5vdEluUGFnZVJhbmdlKHJlcXVlc3RlZFBhZ2UpKSB7XHJcblx0XHRcdFx0dGhyb3cgbmV3IE5vdEluUGFnZVJhbmdlRXhjZXB0aW9uKCdUaGUgcGFnZSB5b3UgcmVxdWVzdGluZyBkb2VzIG5vdCBleGlzdHMnKTtcclxuXHRcdFx0fVxyXG5cdFx0XHRcclxuXHRcdFx0aWYgKFByb2R1Y3RzJDIgJiYgUHJvZHVjdHMkMi5ib290ZWQpIHtcclxuXHRcdFx0XHRQcm9kdWN0cyQyLmxvYWRQcm9kdWN0cyhyZXF1ZXN0ZWRQYWdlKS50aGVuKGZ1bmN0aW9uKHByb2R1Y3RzKSB7XHJcblx0XHRcdFx0XHRpbnN0YW5jZS5zZXRDdXJyZW50KHJlcXVlc3RlZFBhZ2UpO1xyXG5cdFx0XHRcdH0pO1xyXG5cdFx0XHR9XHJcblx0XHR9O1xyXG5cclxuXHRcdGZvcih2YXIgaSA9IDA7IGkgPCB0aGlzLnBhZ2VzLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdHRoaXMucGFnZXNbaV0uY2hpbGROb2Rlc1swXS5vbmNsaWNrID0gZnVuY3Rpb24oZSkge1xyXG5cdFx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcclxuXHRcdFx0XHRcclxuXHRcdFx0XHRsZXQgcmVxdWVzdGVkUGFnZSA9IHRoaXMuZ2V0QXR0cmlidXRlKCdkYXRhLXBhZ2UtbnInKTtcclxuXHRcdFx0XHRcclxuXHRcdFx0XHRpZiAoUHJvZHVjdHMkMiAmJiBQcm9kdWN0cyQyLmJvb3RlZCkge1xyXG5cdFx0XHRcdFx0UHJvZHVjdHMkMi5sb2FkUHJvZHVjdHMocmVxdWVzdGVkUGFnZSkudGhlbihmdW5jdGlvbihwcm9kdWN0cykge1xyXG5cdFx0XHRcdFx0XHRpbnN0YW5jZS5zZXRDdXJyZW50KHJlcXVlc3RlZFBhZ2UpO1xyXG5cdFx0XHRcdFx0fSk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9O1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogU2V0cyB0aGUgY3VycmVudCBwYWdlLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIG51bWJlciB8IHBhZ2VOdW1iZXJcclxuXHQgKiBAcmV0dXJuIHZvaWRcclxuXHQgKi9cclxuXHRzZXRDdXJyZW50KHBhZ2VOdW1iZXIpIFxyXG5cdHtcclxuXHRcdHRoaXMuY3VycmVudCA9IHBhcnNlSW50KHBhZ2VOdW1iZXIpO1xyXG5cdFx0dGhpcy5jaGFuZ2VVcmwocGFnZU51bWJlcik7XHJcblx0XHR0aGlzLnNldEFjdGl2ZUxpbmsocGFnZU51bWJlcik7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBHZXRzIHRoZSBjdXJyZW50IHBhZ2UuXHJcblx0ICpcclxuXHQgKiBAcmV0dXJuIG51bWJlclxyXG5cdCAqL1xyXG5cdGdldEN1cnJlbnQoKSBcclxuXHR7XHJcblx0XHRyZXR1cm4gdGhpcy5jdXJyZW50O1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQ3JlYXRlcyB0aGUgcGFnaW5hdGlvbiBsaW5rcy5cclxuXHQgKlxyXG5cdCAqIEByZXR1cm4gSFRNTFVMaXN0RWxlbWVudFxyXG5cdCAqL1xyXG5cdGNyZWF0ZUxpbmtzKCkgXHJcblx0e1xyXG5cdFx0bGV0IHVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndWwnKTtcclxuXHRcdFxyXG5cdFx0dGhpcy5wYWdlcyA9IHRoaXMuY3JlYXRlUGFnZUxpbmtzKCk7XHJcblx0XHR0aGlzLnByZXZpb3VzID0gdGhpcy5jcmVhdGVQcmV2aW91c0J1dHRvbigpO1xyXG5cdFx0dGhpcy5uZXh0ID0gdGhpcy5jcmVhdGVOZXh0QnV0dG9uKCk7XHJcblxyXG5cdFx0dWwuY2xhc3NOYW1lID0gJ3BhZ2luYXRpb24nO1xyXG5cdFx0dWwuYXBwZW5kQ2hpbGQodGhpcy5wcmV2aW91cyk7XHJcblxyXG5cdFx0dGhpcy5wYWdlcy5mb3JFYWNoKGZ1bmN0aW9uKHBhZ2UpIHtcclxuXHRcdFx0dWwuYXBwZW5kQ2hpbGQocGFnZSk7XHJcblx0XHR9KTtcclxuXHJcblx0XHR1bC5hcHBlbmRDaGlsZCh0aGlzLm5leHQpO1xyXG5cclxuXHRcdHJldHVybiB1bDtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIENyZWF0ZXMgdGhlIHBhZ2VzIGl0ZW0gbGlua3MuXHJcblx0ICpcclxuXHQgKiBAcmV0dXJuIGFycmF5PEhUTUxMSUVsZW1lbnQ+XHJcblx0ICovXHJcblx0Y3JlYXRlUGFnZUxpbmtzKCkgXHJcblx0e1xyXG5cdFx0dmFyIHBhZ2VzID0gW107XHJcblxyXG5cdFx0Zm9yKHZhciBpID0gMTsgaSA8PSB0aGlzLnRvdGFsUGFnZXM7IGkrKykge1xyXG5cdFx0XHR2YXIgcGFnZUl0ZW0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaScpO1xyXG5cdFx0XHR2YXIgbGluayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKTtcclxuXHRcdFx0cGFnZUl0ZW0uY2xhc3NOYW1lID0gKHRoaXMuY3VycmVudCA9PSBpKSA/ICdwYWdlLWl0ZW0gYWN0aXZlJyA6ICdwYWdlLWl0ZW0nO1xyXG5cdFx0XHRsaW5rLmNsYXNzTmFtZSA9ICdwYWdlLWxpbmsnO1xyXG5cdFx0XHRsaW5rLnNldEF0dHJpYnV0ZSgnaHJlZicsICc/cGFnZT0nKyBpKTtcclxuXHRcdFx0bGluay5zZXRBdHRyaWJ1dGUoJ2RhdGEtcGFnZS1ucicsIGkpO1xyXG5cdFx0XHRsaW5rLmlubmVySFRNTCA9IGk7XHJcblx0XHRcdHBhZ2VJdGVtLmFwcGVuZENoaWxkKGxpbmspO1xyXG5cdFx0XHRwYWdlcy5wdXNoKHBhZ2VJdGVtKTtcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gcGFnZXM7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBDcmVhdGVzIHRoZSBwcmV2aW91cyBidXR0b24gbGluay5cclxuXHQgKlxyXG5cdCAqIEByZXR1cm4gSFRNTExJRWxlbWVudFxyXG5cdCAqL1xyXG5cdGNyZWF0ZVByZXZpb3VzQnV0dG9uKCkgXHJcblx0e1xyXG5cdFx0dmFyIGxpID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKTtcclxuXHRcdHZhciBsaW5rID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpO1xyXG5cdFx0dmFyIHNwYW4xID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xyXG5cdFx0dmFyIHNwYW4yID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xyXG5cdFx0XHJcblx0XHRcclxuXHRcdGxpLmNsYXNzTmFtZSA9ICdwYWdlLWl0ZW0nO1xyXG5cdFx0bGluay5jbGFzc05hbWUgPSAncGFnZS1saW5rJztcclxuXHRcdHNwYW4yLmNsYXNzTmFtZSA9ICdzci1vbmx5JztcclxuXHJcblx0XHRsaW5rLnNldEF0dHJpYnV0ZSgnaHJlZicsICcnKTtcclxuXHRcdGxpbmsuc2V0QXR0cmlidXRlKCdhcmlhLWxhYmVsJywgJ1ByZXZpb3VzJyk7XHJcblx0XHRzcGFuMS5zZXRBdHRyaWJ1dGUoJ2FyaWEtaGlkZGVuJywgJ3RydWUnKTtcclxuXHJcblx0XHRzcGFuMS5pbm5lckhUTUwgPSAnJmxhcXVvOyc7XHJcblx0XHRzcGFuMi5pbm5lckhUTUwgPSAnUHJldmlvdXMnO1xyXG5cclxuXHRcdGxpbmsuYXBwZW5kQ2hpbGQoc3BhbjEpO1xyXG5cdFx0bGluay5hcHBlbmRDaGlsZChzcGFuMik7XHJcblx0XHRsaS5hcHBlbmRDaGlsZChsaW5rKTtcclxuXHJcblx0XHRyZXR1cm4gbGk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBDcmVhdGVzIHRoZSBuZXh0IGJ1dHRvbiBsaW5rLlxyXG5cdCAqXHJcblx0ICogQHJldHVybiBIVE1MTElFbGVtZW50XHJcblx0ICovXHJcblx0Y3JlYXRlTmV4dEJ1dHRvbigpIFxyXG5cdHtcclxuXHRcdHZhciBsaSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJyk7XHJcblx0XHR2YXIgbGluayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKTtcclxuXHRcdHZhciBzcGFuMSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcclxuXHRcdHZhciBzcGFuMiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcclxuXHRcdFxyXG5cdFx0bGkuY2xhc3NOYW1lID0gJ3BhZ2UtaXRlbSc7XHJcblx0XHRsaW5rLmNsYXNzTmFtZSA9ICdwYWdlLWxpbmsnO1xyXG5cdFx0c3BhbjIuY2xhc3NOYW1lID0gJ3NyLW9ubHknO1xyXG5cclxuXHRcdGxpbmsuc2V0QXR0cmlidXRlKCdocmVmJywgJycpO1xyXG5cdFx0bGluay5zZXRBdHRyaWJ1dGUoJ2FyaWEtbGFiZWwnLCAnTmV4dCcpO1xyXG5cdFx0c3BhbjEuc2V0QXR0cmlidXRlKCdhcmlhLWhpZGRlbicsICd0cnVlJyk7XHJcblxyXG5cdFx0c3BhbjEuaW5uZXJIVE1MID0gJyZyYXF1bzsnO1xyXG5cdFx0c3BhbjIuaW5uZXJIVE1MID0gJ05leHQnO1xyXG5cclxuXHRcdGxpbmsuYXBwZW5kQ2hpbGQoc3BhbjEpO1xyXG5cdFx0bGluay5hcHBlbmRDaGlsZChzcGFuMik7XHJcblx0XHRsaS5hcHBlbmRDaGlsZChsaW5rKTtcclxuXHJcblx0XHRyZXR1cm4gbGk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBDaGVja3MgaWYgdGhlIGdpdmVuIHBhZ2UgaXMgaW4gcmFuZ2UuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gbnVtYmVyIHwgcGFnZU51bWJlclxyXG5cdCAqIEByZXR1cm4gYm9vbFxyXG5cdCAqL1xyXG5cdG5vdEluUGFnZVJhbmdlKHBhZ2VOdW1iZXIpIFxyXG5cdHtcclxuXHRcdHJldHVybiAocGFnZU51bWJlciA+IHRoaXMudG90YWxQYWdlcyB8fCBwYWdlTnVtYmVyIDw9IDApIHx8IGlzTmFOKHBhZ2VOdW1iZXIpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQ2hhbmdlcyB0aGUgdXJsIHRvIGEgZ2l2ZW4gcGFnZSBudW1iZXIuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gbnVtYmVyIHwgcGFnZU51bWJlclxyXG5cdCAqIEByZXR1cm4gdm9pZFxyXG5cdCAqL1xyXG5cdGNoYW5nZVVybChwYWdlTnVtYmVyKSBcclxuXHR7XHJcblx0XHRVcmwuY2hhbmdlUGFyYW1ldGVyKHRoaXMuc2V0dGluZ3MudXJsX3BhcmFtZXRlciwgcGFnZU51bWJlciwgdGhpcy5zZXR0aW5ncy5zZXBhcmF0b3IpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogU2V0cyB0aGUgYWN0aXZlIGxpbmsuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gbnVtYmVyIHwgcGFnZU51bWJlclxyXG5cdCAqIEByZXR1cm4gdm9pZFxyXG5cdCAqL1xyXG5cdHNldEFjdGl2ZUxpbmsocGFnZU51bWJlcilcclxuXHR7XHJcblx0XHRmb3IodmFyIHBhZ2UgaW4gdGhpcy5wYWdlcykge1xyXG5cdFx0XHRpZiAodGhpcy5wYWdlc1twYWdlXS5jaGlsZE5vZGVzWzBdLmdldEF0dHJpYnV0ZSgnZGF0YS1wYWdlLW5yJykgPT0gcGFnZU51bWJlcikge1xyXG5cdFx0XHRcdERPTS5hZGRDbGFzcyh0aGlzLnBhZ2VzW3BhZ2VdLCAnYWN0aXZlJyk7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0RE9NLnJlbW92ZUNsYXNzKHRoaXMucGFnZXNbcGFnZV0sICdhY3RpdmUnKTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogUmVzZXRzIHRoZSBwYWdpbmF0aW9uLlxyXG5cdCAqXHJcblx0ICogQHJldHVybiB2b2lkXHJcblx0ICovXHJcblx0cmVzZXQoKSBcclxuXHR7XHJcblx0XHR0aGlzLnNldEN1cnJlbnQoMSk7XHJcblx0XHR0aGlzLmNoYW5nZVVybCgxKTtcclxuXHR9XHJcbn1cblxubGV0IGRlZmF1bHRNZXNzYWdlJDUgPSAnSW4gb3JkZXIgdG8gdXNlIGNvbXBvbmVudHMgeW91IG11c3QgcmVnaXN0ZXIgdGhlbSB3aXRoIHRoZSBzaG9wISc7IFxyXG5cclxuY2xhc3MgQ29tcG9uZW50Tm90UmVnaXN0ZXJlZEV4Y2VwdGlvbiBleHRlbmRzIEV4Y2VwdGlvbkhhbmRsZXJcclxue1xyXG5cdGNvbnN0cnVjdG9yKG1lc3NhZ2UgPSBudWxsKSBcclxuXHR7XHJcblx0XHRtZXNzYWdlID0gbWVzc2FnZSB8fCBkZWZhdWx0TWVzc2FnZSQ1O1xyXG5cdFx0c3VwZXIobWVzc2FnZSk7XHJcbiAgICBcdHN1cGVyLnN0YWNrVHJhY2UodGhpcywgbWVzc2FnZSk7XHJcbiAgICB9XHJcbn1cblxuLy8gQ29tcG9uZW50c1xyXG4vLyBIZWxwZXJzXHJcbi8vIEV4Y2VwdGlvbnNcclxuY2xhc3MgQ29tcG9uZW50c1Byb3ZpZGVyXHJcbntcclxuXHQvKipcclxuXHQgKiAtIFNldCB0aGUgY29udGFpbmVyIGFzIGEgbWVtYmVyLlxyXG5cdCAqIC0gZGVjbGFyZSB0aGUgY29tcG9uZW50cy5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSBcXENvcmVcXENvbnRhaW5lciB8IGNvbnRhaW5lclxyXG5cdCAqIEByZXR1cm4gdm9pZFxyXG5cdCAqL1xyXG5cdGNvbnN0cnVjdG9yKGNvbnRhaW5lcilcclxuXHR7XHJcblx0XHR0aGlzLmNvbnRhaW5lciA9IGNvbnRhaW5lcjtcclxuXHJcblx0XHR0aGlzLmNvbXBvbmVudHMgPSB7fTtcclxuXHRcdHRoaXMuY29tcG9uZW50cy5GaWx0ZXIgPSB7fTtcclxuXHRcdHRoaXMuY29tcG9uZW50cy5TZXJ2aWNlcyA9IHt9O1xyXG5cdFx0dGhpcy5jb21wb25lbnRzLlByb2R1Y3RzID0ge307XHJcblx0XHR0aGlzLmNvbXBvbmVudHMuUGFnaW5hdGlvbiA9IHt9O1xyXG5cdFx0dGhpcy5jb21wb25lbnRzLkNhcnQgPSB7fTtcclxuXHRcdHRoaXMuY29tcG9uZW50cy5DaGVja291dCA9IHt9O1xyXG5cdH1cclxuXHJcbiAgIC8qKlxyXG5cdCogUmVnaXN0ZXJzIHRoZSBjb21wb25lbnRzLlxyXG5cdCpcclxuXHQqIEBwYXJhbSBvYmplY3QgfCBjb21wb25lbnRzXHJcblx0KiBAcmV0dXJuIHZvaWRcclxuXHQqL1xyXG5cdHJlZ2lzdGVyKGNvbXBvbmVudHMpXHJcblx0e1xyXG5cdFx0dGhpcy5hdmFpbGFibGUgPSBjb21wb25lbnRzO1xyXG5cdFx0dGhpcy5ib290ZWQgPSBbXTtcclxuXHQgXHR0aGlzLmNvbXBvbmVudHMuRmlsdGVyLmJvb3RlZCA9IGZhbHNlO1xyXG5cdFx0dGhpcy5jb21wb25lbnRzLlNlcnZpY2VzLmJvb3RlZCA9IGZhbHNlO1xyXG5cdFx0dGhpcy5jb21wb25lbnRzLlByb2R1Y3RzLmJvb3RlZCA9IGZhbHNlO1xyXG5cdFx0dGhpcy5jb21wb25lbnRzLlBhZ2luYXRpb24uYm9vdGVkID0gZmFsc2U7XHJcblx0XHR0aGlzLmNvbXBvbmVudHMuQ2FydC5ib290ZWQgPSBmYWxzZTtcclxuXHRcdHRoaXMuY29tcG9uZW50cy5DaGVja291dC5ib290ZWQgPSBmYWxzZTtcclxuXHJcblx0XHRsZXQgaW5zdGFuY2UgPSB0aGlzO1xyXG5cclxuXHRcdHRoaXMuY29udGFpbmVyLmJpbmQoJ0ZpbHRlcicsIGZ1bmN0aW9uKGNvbnRhaW5lciwgY29tcG9uZW50KSB7XHJcblx0XHRcdGluc3RhbmNlLmNvbXBvbmVudHNbY29tcG9uZW50XSA9IG5ldyBGaWx0ZXIoY29udGFpbmVyKTtcclxuXHRcdFx0aW5zdGFuY2UuY29tcG9uZW50c1tjb21wb25lbnRdLmJvb3RlZCA9IHRydWU7XHJcblx0XHRcdGluc3RhbmNlLmJvb3RlZC5wdXNoKGluc3RhbmNlLmNvbXBvbmVudHNbY29tcG9uZW50XSk7XHJcblx0XHRcdHJldHVybiBpbnN0YW5jZS5jb21wb25lbnRzW2NvbXBvbmVudF07XHJcblx0XHR9LCAnY29tcG9uZW50cycpO1xyXG5cdFx0XHJcblx0XHR0aGlzLmNvbnRhaW5lci5iaW5kKCdTZXJ2aWNlcycsIGZ1bmN0aW9uKGNvbnRhaW5lciwgY29tcG9uZW50KSB7IFxyXG5cdFx0XHRpbnN0YW5jZS5jb21wb25lbnRzW2NvbXBvbmVudF0gPSBuZXcgU2VydmljZXMoY29udGFpbmVyKTtcclxuXHRcdFx0aW5zdGFuY2UuY29tcG9uZW50c1tjb21wb25lbnRdLmJvb3RlZCA9IHRydWU7XHJcblx0XHRcdGluc3RhbmNlLmJvb3RlZC5wdXNoKGluc3RhbmNlLmNvbXBvbmVudHNbY29tcG9uZW50XSk7XHJcblx0XHRcdHJldHVybiBpbnN0YW5jZS5jb21wb25lbnRzW2NvbXBvbmVudF07XHJcblx0XHR9LCAnY29tcG9uZW50cycpO1xyXG5cclxuXHRcdHRoaXMuY29udGFpbmVyLmJpbmQoJ1Byb2R1Y3RzJywgZnVuY3Rpb24oY29udGFpbmVyLCBjb21wb25lbnQpIHtcclxuXHRcdFx0aW5zdGFuY2UuY29tcG9uZW50c1tjb21wb25lbnRdID0gbmV3IFByb2R1Y3RzKGNvbnRhaW5lciwgY29udGFpbmVyLlJlcXVlc3QsIGNvbnRhaW5lci5FdmVudHMpO1xyXG5cdFx0XHRpbnN0YW5jZS5jb21wb25lbnRzW2NvbXBvbmVudF0uYm9vdGVkID0gdHJ1ZTtcclxuXHRcdFx0aW5zdGFuY2UuYm9vdGVkLnB1c2goaW5zdGFuY2UuY29tcG9uZW50c1tjb21wb25lbnRdKTtcclxuXHRcdFx0cmV0dXJuIGluc3RhbmNlLmNvbXBvbmVudHNbY29tcG9uZW50XTtcclxuXHRcdH0sICdjb21wb25lbnRzJyk7XHJcblxyXG5cdFx0dGhpcy5jb250YWluZXIuYmluZCgnUGFnaW5hdGlvbicsIGZ1bmN0aW9uKGNvbnRhaW5lciwgY29tcG9uZW50KSB7XHJcblx0XHRcdGxldCBwcm9kdWN0cyA9IChpbnN0YW5jZS5leGlzdHMoJ1Byb2R1Y3RzJykpID8gKGluc3RhbmNlLmNvbXBvbmVudHNbJ1Byb2R1Y3RzJ10pIDogbnVsbDsgXHJcblx0XHRcdGxldCBzZXJ2aWNlcyA9IChpbnN0YW5jZS5leGlzdHMoJ1NlcnZpY2VzJykpID8gKGluc3RhbmNlLmNvbXBvbmVudHNbJ1NlcnZpY2VzJ10pIDogbnVsbDsgXHJcblx0XHRcdGluc3RhbmNlLmNvbXBvbmVudHNbY29tcG9uZW50XSA9IG5ldyBQYWdpbmF0aW9uKGNvbnRhaW5lciwgY29udGFpbmVyLkV2ZW50cywgcHJvZHVjdHMsIHNlcnZpY2VzKTtcclxuXHRcdFx0aW5zdGFuY2UuY29tcG9uZW50c1tjb21wb25lbnRdLmJvb3RlZCA9IHRydWU7XHJcblx0XHRcdGluc3RhbmNlLmJvb3RlZC5wdXNoKGluc3RhbmNlLmNvbXBvbmVudHNbY29tcG9uZW50XSk7XHJcblx0XHRcdHJldHVybiBpbnN0YW5jZS5jb21wb25lbnRzW2NvbXBvbmVudF07XHJcblx0XHR9LCAnY29tcG9uZW50cycpO1xyXG5cclxuXHRcdHRoaXMuY29udGFpbmVyLmJpbmQoJ0NhcnQnLCBmdW5jdGlvbihjb250YWluZXIsIGNvbXBvbmVudCkge1xyXG5cdFx0XHRpbnN0YW5jZS5jb21wb25lbnRzW2NvbXBvbmVudF0gPSBuZXcgQ2FydChjb250YWluZXIsIGNvbnRhaW5lci5SZXF1ZXN0LCBjb250YWluZXIuRXZlbnRzKTtcclxuXHRcdFx0aW5zdGFuY2UuY29tcG9uZW50c1tjb21wb25lbnRdLmJvb3RlZCA9IHRydWU7XHJcblx0XHRcdGluc3RhbmNlLmJvb3RlZC5wdXNoKGluc3RhbmNlLmNvbXBvbmVudHNbY29tcG9uZW50XSk7XHJcblx0XHRcdHJldHVybiBpbnN0YW5jZS5jb21wb25lbnRzW2NvbXBvbmVudF07XHJcblx0XHR9LCAnY29tcG9uZW50cycpO1xyXG5cclxuXHRcdHRoaXMuY29udGFpbmVyLmJpbmQoJ0NoZWNrb3V0JywgZnVuY3Rpb24oY29udGFpbmVyLCBjb21wb25lbnQpIHtcclxuXHRcdFx0aW5zdGFuY2UuY29tcG9uZW50c1tjb21wb25lbnRdID0gbmV3IENoZWNrb3V0KGNvbnRhaW5lciwgY29udGFpbmVyLlJlcXVlc3QsIGNvbnRhaW5lci5FdmVudHMpO1xyXG5cdFx0XHRpbnN0YW5jZS5jb21wb25lbnRzW2NvbXBvbmVudF0uYm9vdGVkID0gdHJ1ZTtcclxuXHRcdFx0aW5zdGFuY2UuYm9vdGVkLnB1c2goaW5zdGFuY2UuY29tcG9uZW50c1tjb21wb25lbnRdKTtcclxuXHRcdFx0cmV0dXJuIGluc3RhbmNlLmNvbXBvbmVudHNbY29tcG9uZW50XTtcclxuXHRcdH0sICdjb21wb25lbnRzJyk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBQcm92aWRlIGEgcmVnaXN0ZXJlZCBjb21wb25lbnQuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gc3RyaW5nIHwgY29tcG9uZW50XHJcblx0ICogQHJldHVybiBvYmplY3RcclxuXHQgKi9cclxuXHRwcm92aWRlKGNvbXBvbmVudClcclxuXHR7XHJcblx0XHRpZiAoQ29tbW9uLmluX2FycmF5KGNvbXBvbmVudCwgdGhpcy5hdmFpbGFibGUpKSB7XHJcblx0XHRcdHJldHVybiB0aGlzLmNvbnRhaW5lci5tYWtlKGNvbXBvbmVudCk7XHJcblx0XHR9XHJcblxyXG5cdFx0dGhyb3cgbmV3IENvbXBvbmVudE5vdFJlZ2lzdGVyZWRFeGNlcHRpb24oJ2NvbXBvbmVudHMgbXVzdCBiZSByZWdpc3RlcmVkIGluIG9yZGVyIHRvIHVzZSB0aGVtLicpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQ2hlY2tzIGlmIGNvbXBvbmVudCBleGlzdHMuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gc3RyaW5nIHwgbmFtZVxyXG5cdCAqIEByZXR1cm4gYm9vbFxyXG5cdCAqL1xyXG5cdGV4aXN0cyhuYW1lKVxyXG5cdHtcclxuXHRcdHJldHVybiB0aGlzLmNvbXBvbmVudHMuaGFzT3duUHJvcGVydHkobmFtZSk7XHJcblx0fVxyXG59XG5cbmxldCBkZWZhdWx0TWVzc2FnZSQ2ID0gJ1RyeWluZyB0byBiaW5kIGFuIGFscmVhZHkgZXhpc3RpbmcgYm91bmQuJztcclxuXHJcbmNsYXNzIEludmFsaWRCaW5kaW5nRXhjZXB0aW9uIGV4dGVuZHMgRXhjZXB0aW9uSGFuZGxlclxyXG57XHJcblx0Y29uc3RydWN0b3IobWVzc2FnZSA9IG51bGwpIFxyXG5cdHtcclxuXHRcdG1lc3NhZ2UgPSBtZXNzYWdlIHx8IGRlZmF1bHRNZXNzYWdlJDY7XHJcblx0XHRzdXBlcihtZXNzYWdlKTtcclxuICAgIFx0c3VwZXIuc3RhY2tUcmFjZSh0aGlzLCBtZXNzYWdlKTtcclxuICAgIH1cclxufVxuXG4vLyBIZWxwZXJzXHJcbi8vIENvcmVcclxuLy8gRXhjZXB0aW9uc1xyXG4vKipcclxuICogQGZpbGUgXHJcbiAqIENvbnRhaW5lciBjbGFzcy5cclxuICpcclxuICogSGFuZGxlcy9Db250cm9scyB0aGUgZGVwZW5kZW5jaWVzIG9mIGVjb21tZXJjZS5cclxuICovXHJcblxyXG5jbGFzcyBDb250YWluZXIkNSBcclxue1xyXG5cdC8qKlxyXG5cdCAqIC0gSW5pdGlhbGl6ZSBpbnN0YW5jZXMgbWVtYmVyLlxyXG5cdCAqIC0gUmVnaXN0ZXIgYmluZGluZ3MuXHJcblx0ICpcclxuXHQgKiBAcmV0dXJuIHZvaWRcclxuXHQgKi9cclxuXHRjb25zdHJ1Y3RvcigpXHJcblx0e1xyXG5cdFx0dGhpcy5pbnN0YW5jZXMgPSBbXTtcclxuXHRcdHRoaXMucmVnaXN0ZXIoKTtcclxuXHRcdHRoaXMucmVnaXN0ZXJQcm92aWRlcnMoKTtcclxuXHRcdHRoaXMucmVnaXN0ZXJSb3V0ZXIoKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEJpbmRzIGtleSB0byBjb25jcmV0ZSBjbGFzcy5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSBzdHJpbmcgfCBrZXlcclxuXHQgKiBAcGFyYW0gY2xhc3MgfCBjb25jcmV0ZVxyXG5cdCAqIEByZXR1cm4gdm9pZFxyXG5cdCAqL1xyXG5cdGJpbmQoa2V5LCBjb25jcmV0ZSwgbmFtZXNwYWNlID0gbnVsbCkgXHJcblx0e1xyXG5cdFx0aWYgKHR5cGVvZiBrZXkgIT0gJ3N0cmluZycpIHtcclxuXHRcdFx0dGhyb3cgbmV3IEludmFsaWRBcmd1bWVudEV4Y2VwdGlvbiQxKCdiaW5kKCkgZXhwZWN0cyB0aGUgZmlyc3QgcGFyYW1ldGVyIHRvIGJlIHN0cmluZywgYnV0ICcgKyB0eXBlb2Yga2V5ICsgJyB3YXMgcGFzc2VkIGluc3RlYWQuJyk7XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKHR5cGVvZiBjb25jcmV0ZSAhPSAnZnVuY3Rpb24nKSB7IFxyXG5cdFx0XHR0aHJvdyBuZXcgSW52YWxpZEFyZ3VtZW50RXhjZXB0aW9uJDEoJ2JpbmQoKSBleHBlY3RzIHRoZSBzZWNvbmQgcGFyYW1ldGVyIHRvIGJlIGEgZnVuY3Rpb24sIGJ1dCAnICsgdHlwZW9mIGNvbmNyZXRlICsgJyB3YXMgcGFzc2VkIGluc3RlYWQuJyk7XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKG5hbWVzcGFjZSkge1xyXG5cdFx0XHRpZiAodHlwZW9mIHRoaXNbbmFtZXNwYWNlXSA9PSAndW5kZWZpbmVkJykge1xyXG5cdFx0XHRcdHRoaXNbbmFtZXNwYWNlXSA9IHt9O1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHR0aGlzW25hbWVzcGFjZV1ba2V5XSA9IGNvbmNyZXRlLmJpbmQoY29uY3JldGUsIHRoaXMsIGtleSk7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHR0aGlzW2tleV0gPSBjb25jcmV0ZS5iaW5kKGNvbmNyZXRlLCB0aGlzLCBrZXkpO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogU2V0cyBhbiBpbnN0YW5jZS5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSBzdHJpbmcgfCBrZXlcclxuXHQgKiBAcGFyYW0gb2JqZWN0IHwgaW5zdGFuY2VcclxuXHQgKiBAcGFyYW0gc3RyaW5nIHwgYWxpYXNcclxuXHQgKiBAcmV0dXJuIHZvaWRcclxuXHQgKi9cclxuXHRzZXRJbnN0YW5jZShrZXksIGluc3RhbmNlLCBhbGlhcyA9IG51bGwpIFxyXG5cdHtcclxuXHRcdGlmICh0eXBlb2Yga2V5ICE9ICdzdHJpbmcnKSB7XHJcblx0XHRcdHRocm93IG5ldyBJbnZhbGlkQXJndW1lbnRFeGNlcHRpb24kMSgnc2V0SW5zdGFjZSgpIGV4cGVjdHMgdGhlIGZpcnN0IHBhcmFtZXRlciB0byBiZSBhIHN0cmluZywgYnV0ICcgKyB0eXBlb2Yga2V5ICsgJyB3YXMgcGFzc2VkIGluc3RlYWQuJyk7XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKHR5cGVvZiBpbnN0YW5jZSAhPSAnb2JqZWN0Jykge1xyXG5cdFx0XHR0aHJvdyBuZXcgSW52YWxpZEFyZ3VtZW50RXhjZXB0aW9uJDEoJ3NldEluc3RhbmNlKCkgZXhwZWN0cyB0aGUgc2Vjb25kIHBhcmFtZXRlciB0byBiZSBhbiBvYmplY3QsIGJ1dCAnICsgdHlwZW9mIGluc3RhbmNlICsgJyB3YXMgcGFzc2VkIGluc3RlYWQuJyk7XHJcblx0XHR9XHJcblxyXG5cdFx0dGhpcy5pbnN0YW5jZXNba2V5XSA9IGluc3RhbmNlO1xyXG5cdFx0dGhpc1trZXldID0gaW5zdGFuY2U7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBSZXNvbHZlcyBhbiBpbnN0YW5jZSBvdXQgb2YgXHJcblx0ICogdGhlIGlvYyBjb250YWluZXIuXHJcblx0ICogXHJcblx0ICogQHBhcmFtIHN0cmluZyB8IGtleVxyXG5cdCAqIEByZXR1cm4gb2JqZWN0XHJcblx0ICovXHJcblx0Z2V0SW5zdGFuY2Uoa2V5KSBcclxuXHR7XHJcblx0XHRpZiAodHlwZW9mIGtleSAhPSAnc3RyaW5nJyAmJiB0eXBlb2Yga2V5ICE9ICdvYmplY3QnKSB7XHJcblx0XHRcdHRocm93IG5ldyBJbnZhbGlkQXJndW1lbnRFeGNlcHRpb24kMSgnZ2V0SW5zdGFjZSgpIGV4cGVjdHMgdGhlIGZpcnN0IHBhcmFtZXRlciB0byBiZSBhIHN0cmluZywgYnV0ICcgKyB0eXBlb2Yga2V5ICsgJyB3YXMgcGFzc2VkIGluc3RlYWQuJyk7XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKHR5cGVvZiBrZXkgPT0gJ29iamVjdCcpIHtcclxuXHRcdFx0cmV0dXJuIHRoaXMuaW5zdGFuY2VzW2tleS5jb25zdHJ1Y3Rvci5uYW1lXSB8fCBudWxsO1xyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiB0aGlzLmluc3RhbmNlc1trZXldIHx8IG51bGw7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBDaGVja3MgaWYgYW4gaW5zdGFuY2UgZXhpc3QuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gbWl4ZWQgfCBpbnN0YW5jZVxyXG5cdCAqIEByZXR1cm4gYm9vbFxyXG5cdCAqL1xyXG5cdGluc3RhbmNlRXhpc3QoaW5zdGFuY2UpIFxyXG5cdHtcclxuXHRcdGlmICh0eXBlb2YgaW5zdGFuY2UgPT0gJ29iamVjdCcgfHwgdHlwZW9mIGluc3RhbmNlID09ICdzeW1ib2wnKSB7XHJcblx0XHRcdHJldHVybiAodHlwZW9mIHRoaXMuaW5zdGFuY2VzW2luc3RhbmNlLmNvbnN0cnVjdG9yLm5hbWVdICE9PSAndW5kZWZpbmVkJyk7XHJcblx0XHR9IGVsc2UgaWYgKHR5cGVvZiBpbnN0YW5jZSA9PSAnc3RyaW5nJykge1xyXG5cdFx0XHRyZXR1cm4gKHR5cGVvZiB0aGlzLmluc3RhbmNlc1tpbnN0YW5jZV0gIT09ICd1bmRlZmluZWQnKVxyXG5cdFx0fVxyXG5cdFx0XHJcblx0XHR0aHJvdyBuZXcgSW52YWxpZEFyZ3VtZW50RXhjZXB0aW9uJDEoJ2luc3RhbmNlRXhpc3QoKSBleHBlY3RzIHRoZSBmaXJzdCBwYXJhbWV0ZXIgdG8gYmUgc3RyaW5nIG9yIGFuIG9iamVjdCwgYnV0ICcgKyB0eXBlb2YgaW5zdGFuY2UgKyAnIHdhcyBwYXNzZWQgaW5zdGVhZC4nKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFJldHJpZXZlIGFuIG9iamVjdCwgaWYgbm90IGV4aXN0c1xyXG5cdCAqIHdpbGwgY3JlYXRlIGl0LCBzZXQgaXQgaW4gdGhlIGlvYyBjb250YWluZXJcclxuXHQgKiBmb3IgbGF0ZXIgdXNlIGFuZCByZXRyaWV2ZSBpdC5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSBtaXhlZCB8IG9iamVjdCBcclxuXHQgKiBAcmV0dXJuIG9iamVjdFxyXG5cdCAqL1xyXG5cdG1ha2Uob2JqZWN0KVxyXG5cdHtcclxuXHRcdGxldCBpbnN0YW5jZSA9IHt9O1xyXG5cdFx0bGV0IGtleTtcclxuXHRcdFxyXG5cdFx0aWYgKHRoaXMuaW5zdGFuY2VFeGlzdChvYmplY3QpKSB7XHJcblx0XHRcdHJldHVybiB0aGlzLmdldEluc3RhbmNlKG9iamVjdCk7XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKHR5cGVvZiBvYmplY3QgPT0gJ29iamVjdCcpIHtcclxuXHRcdFx0aW5zdGFuY2UgPSBvYmplY3Q7XHJcblx0XHRcdGtleSA9IG9iamVjdC5jb25zdHJ1Y3Rvci5uYW1lO1xyXG5cdFx0XHR0aGlzLnNldEluc3RhbmNlKGtleSwgaW5zdGFuY2UpOyBcclxuXHRcdH0gZWxzZSBpZiAodHlwZW9mIG9iamVjdCA9PSAnc3RyaW5nJyAmJiB0aGlzLmhhc093blByb3BlcnR5KG9iamVjdCkpIHtcclxuXHRcdFx0aW5zdGFuY2UgPSBuZXcgdGhpc1tvYmplY3RdO1xyXG5cdFx0XHRrZXkgPSBvYmplY3Q7XHJcblx0XHRcdHRoaXMuc2V0SW5zdGFuY2Uoa2V5LCBpbnN0YW5jZSk7XHRcclxuXHRcdH0gZWxzZSBpZiAodHlwZW9mIG9iamVjdCA9PSAnc3RyaW5nJyAmJiB0aGlzLkNvbXBvbmVudHMuZXhpc3RzKG9iamVjdCkpIHtcclxuXHRcdFx0aW5zdGFuY2UgPSBuZXcgdGhpcy5jb21wb25lbnRzW29iamVjdF07XHJcblx0XHRcdGtleSA9IG9iamVjdDtcclxuXHRcdFx0dGhpcy5zZXRJbnN0YW5jZShrZXksIGluc3RhbmNlKTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdHRocm93IG5ldyBJbnZhbGlkQmluZGluZ0V4Y2VwdGlvbignQ29udGFpbmVyLm1ha2UoKSBjb3VsZCBub3QgY3JlYXRlIHRoZSBvYmplY3QhJyk7XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIGluc3RhbmNlO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogUmVtb3ZlIGFsbCBleGlzdGluZyBpbnN0YW5jZXMuXHJcblx0ICpcclxuXHQgKiBAcmV0dXJuIHZvaWQgXHJcblx0ICovXHJcblx0Zmx1c2goKVxyXG5cdHtcclxuXHRcdHRoaXMuaW5zdGFuY2VzID0gW107XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBSZWdpc3RlcnMgdGhlIGRlcGVuZGVjaWVzLlxyXG5cdCAqXHJcblx0ICogQHJldHVybiB2b2lkIFxyXG5cdCAqL1xyXG5cdHJlZ2lzdGVyKClcclxuXHR7XHJcblx0XHR0aGlzLnNldEluc3RhbmNlKCdSZXF1ZXN0JywgbmV3IFJlcXVlc3QpO1xyXG5cdFx0dGhpcy5zZXRJbnN0YW5jZSgnRXZlbnRzJywgbmV3IEV2ZW50TWFuYWdlcik7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBSZWdpc3RlcnMgdGhlIHByb3ZpZGVycy5cclxuXHQgKlxyXG5cdCAqIEByZXR1cm4gdm9pZCBcclxuXHQgKi9cclxuXHRyZWdpc3RlclByb3ZpZGVycygpXHJcblx0e1xyXG5cdFx0dGhpcy5zZXRJbnN0YW5jZSgnQ29tcG9uZW50cycsIG5ldyBDb21wb25lbnRzUHJvdmlkZXIodGhpcykpO1xyXG5cdH1cclxuXHJcblx0cmVnaXN0ZXJSb3V0ZXIoKVxyXG5cdHtcclxuXHRcdHRoaXMuc2V0SW5zdGFuY2UoJ1JvdXRlcicsIG5ldyBSb3V0ZXIodGhpcykpO1xyXG5cdH1cclxufVxuXG4vLyBIZWxwZXJzXHJcbi8vIENvcmVcclxuLy8gRXhjZXB0aW9uc1xyXG4vKipcclxuICogU3RvcmVzIHRoZSBkZWZhdWx0IHNldHRpbmdzLlxyXG4gKlxyXG4gKiBAdmFyIG9iamVjdFxyXG4gKi9cclxubGV0IGRlZmF1bHRTZXR0aW5ncyQ2ID0ge1xyXG5cdGRlYnVnX2xldmVsOiAnZXJyb3InLFxyXG5cdGVsZW1lbnQ6ICdib2R5JyxcclxuXHRpbmplY3RfbGlicmFyaWVzOiBbXSxcclxuXHRjb21wb25lbnRzOiBbJ1Byb2R1Y3RzJywgJ1NlcnZpY2VzJywgJ0ZpbHRlcicsICdQYWdpbmF0aW9uJywgJ0NhcnQnXSxcclxuXHRsb2FkaW5nX2FuaW1hdGlvbjogdHJ1ZSxcclxuXHRoYXNoX25hdmlnYXRpb246IGZhbHNlLFxyXG59O1xyXG5cclxuLyoqXHJcbiAqIFN0b3JlcyB0aGUgb3B0aW9uYWwsIFxyXG4gKiBpbmplY3RhYmxlIGV4dGVybmFsIGxpYnJhcmllcyBcclxuICpcclxuICogQHZhciBvYmplY3RcclxuICovXHJcbmxldCBleHRlcm5hbExpYnJhcmllcyA9IHtcclxuXHRib290c3RyYXA6ICdodHRwczovL21heGNkbi5ib290c3RyYXBjZG4uY29tL2Jvb3RzdHJhcC8zLjMuNy9jc3MvYm9vdHN0cmFwLm1pbi5jc3MnLFxyXG59O1xyXG5cclxuY2xhc3MgVHVyYm9FY29tbWVyY2Vcclxue1xyXG5cdC8qKlxyXG5cdCAqIFRoZSBlbnRlcnkgZm9yIHRoZSBzaG9wLlxyXG5cdCAqIC0gU2V0dGluZyB0aGUgZXhjZXB0aW9uIGhhbmRsZXIuXHJcblx0ICogLSBTZXR0aW5nIHRoZSBpb2MgY29udGFpbmVyLlxyXG5cdCAqIC0gRXh0ZW5kaW5nIHRoZSB1c2VyIHNldHRpbmdzLlxyXG5cdCAqIC0gU2V0dGluZyB0aGUgZWxlbWVudC5cclxuXHQgKiAtIERpc2FibGluZyBkZWZhdWx0IGVycm9ycy5cclxuXHQgKiAtIFBhc3NpbmcgY2FsbHMgdmlhIHByb3h5IHRvIHRoZSBjb21wb25lbnRzLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIG9iamVjdCB8IHNldHRpbmdzXHJcblx0ICogQHJldHVybiBQcm94eVxyXG5cdCAqL1xyXG5cdGNvbnN0cnVjdG9yKHNldHRpbmdzKVxyXG5cdHtcclxuXHRcdGlmICh0eXBlb2Ygc2V0dGluZ3MgIT0gJ29iamVjdCcpIHtcclxuXHRcdFx0dGhyb3cgbmV3IEludmFsaWRBcmd1bWVudEV4Y2VwdGlvbiQxO1xyXG5cdFx0fVxyXG5cclxuXHRcdHRoaXMuc2V0dGluZ3MgPSBDb21tb24uZXh0ZW5kKGRlZmF1bHRTZXR0aW5ncyQ2LCBzZXR0aW5ncyk7XHJcblxyXG5cdFx0RXhjZXB0aW9uSGFuZGxlci5zZXREZWJ1Z0xldmVsID0gdGhpcy5zZXR0aW5ncy5kZWJ1Z19sZXZlbDtcclxuXHRcdFxyXG5cdFx0dGhpcy5sb2FkRXh0ZXJuYWxMaWJyYXJpZXMoKTtcclxuXHRcdFxyXG5cdFx0dGhpcy5jb250YWluZXIgPSBuZXcgQ29udGFpbmVyJDU7XHJcblxyXG5cdFx0dGhpcy5jb21wb25lbnRzID0gdGhpcy5jb250YWluZXIubWFrZSgnQ29tcG9uZW50cycpO1xyXG5cdFx0dGhpcy5jb21wb25lbnRzLnJlZ2lzdGVyKHRoaXMuc2V0dGluZ3MuY29tcG9uZW50cyk7XHJcblxyXG5cdFx0ZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsIGZ1bmN0aW9uKCkge1xyXG5cdFx0XHR0aGlzLnNldEVsZW1lbnQodGhpcy5zZXR0aW5ncy5lbGVtZW50KTtcclxuXHJcblx0XHRcdHRoaXMuY29udGFpbmVyLlJvdXRlci5lbnRyeSgpO1xyXG5cclxuXHRcdFx0aWYgKHRoaXMuc2V0dGluZ3MubG9hZGluZ19hbmltYXRpb24pIHtcclxuXHRcdFx0XHRzdGFydExvYWRpbmcuY2FsbCh0aGlzKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0dGhpcy5hZGRTdHlsZVRhZygpO1xyXG5cdFx0fS5iaW5kKHRoaXMpKTtcclxuXHJcblx0XHRyZXR1cm4gbmV3IFByb3h5KHRoaXMsIHtcclxuXHRcdFx0Z2V0OiBmdW5jdGlvbihzaG9wLCBzb3VyY2UpIHtcclxuXHRcdFx0XHRpZiAoc2hvcC5jb21wb25lbnRzLmV4aXN0cyhzb3VyY2UpKSB7XHJcblx0XHRcdFx0XHRyZXR1cm4gc2hvcC5jb21wb25lbnRzLnByb3ZpZGUoc291cmNlKTtcclxuXHRcdFx0XHR9IFxyXG5cclxuXHRcdFx0XHRpZiAoc2hvcC5jb250YWluZXIuaW5zdGFuY2VFeGlzdChzb3VyY2UpKSB7XHJcblx0XHRcdFx0XHRyZXR1cm4gc2hvcC5jb250YWluZXIuZ2V0SW5zdGFuY2Uoc291cmNlKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogTG9hZHMgdGhlIGV4dGVybmFsIGxpYnJhcmllcyB3aGljaCB3YXMgc3BlY2lmaWVkLlxyXG5cdCAqIFxyXG5cdCAqIEByZXR1cm4gdm9pZFxyXG5cdCAqL1xyXG5cdGxvYWRFeHRlcm5hbExpYnJhcmllcygpXHJcblx0e1xyXG5cdFx0bGV0IGk7XHJcblx0XHRsZXQgbGlicmFyaWVzID0gdGhpcy5zZXR0aW5ncy5pbmplY3RfbGlicmFyaWVzO1xyXG5cclxuXHRcdGZvciAoaSA9IDA7IGkgPCBsaWJyYXJpZXMubGVuZ3RoOyBpKyspIHtcclxuXHRcdFx0aWYgKGV4dGVybmFsTGlicmFyaWVzLmhhc093blByb3BlcnR5KGxpYnJhcmllc1tpXSkpIHtcclxuXHRcdFx0XHRsZXQgaWQgPSAnVHVyYm8tZUNvbW1lcmNlLScgKyBTdHIudWNmaXJzdChsaWJyYXJpZXNbaV0pO1xyXG5cdFx0XHRcdFxyXG5cdFx0XHRcdGlmICghIERPTS5maW5kKGlkKSkge1xyXG5cdFx0XHRcdFx0RE9NLmFkZExpbmtlZFN0eWxlKGlkLCBleHRlcm5hbExpYnJhcmllc1tsaWJyYXJpZXNbaV1dKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFNldHMgdGhlIGVsZW1lbnQgdG8gYmUgYm91bmQgdG8uXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gc3RyaW5nIHwgc2VsZWN0b3JcclxuXHQgKiBAcmV0dXJuIHZvaWRcclxuXHQgKi9cclxuXHRzZXRFbGVtZW50KHNlbGVjdG9yKVxyXG5cdHtcclxuXHRcdHRoaXMuZWxlbWVudCA9IERPTS5maW5kKHNlbGVjdG9yKTtcclxuXHRcdFxyXG5cdFx0RE9NLmFkZENsYXNzKHRoaXMuZWxlbWVudCwgdGhpcy5zZXR0aW5ncy5jbGFzcyk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBBZGQgdGhlIGVDb21tZXJjZSBzdHlsZSB0YWdzIHRvIHRoZSBET00uXHJcblx0ICpcclxuXHQgKiBAcmV0dXJuIHZvaWRcclxuXHQgKi9cclxuXHRhZGRTdHlsZVRhZygpIFxyXG5cdHtcclxuXHRcdGlmIChET00uZmluZCgnI1R1cmJvZS1Db21tZXJjZScpKSB7XHJcblx0XHRcdHJldHVybjtcclxuXHRcdH1cclxuXHJcblx0XHRsZXQgY3NzID0gYFxyXG5cdFx0XHQke3RoaXMuc2V0dGluZ3MuZWxlbWVudH0ge1xyXG5cdFx0XHRcdHBvc2l0aW9uOiByZWxhdGl2ZTtcclxuXHRcdFx0XHRjbGVhcjogYm90aDtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0LmxvYWRpbmctcHJvZ3Jlc3MtYmFyIHtcclxuXHRcdFx0XHRwb3NpdGlvbjogZml4ZWQ7XHJcblx0XHRcdFx0dG9wOiAwO1xyXG5cdFx0XHRcdGxlZnQ6IDA7XHJcblx0XHRcdFx0aGVpZ2h0OiA1cHg7XHJcblx0XHRcdFx0d2lkdGg6IDEwMCU7XHJcblx0XHRcdFx0LXdlYmtpdC1ib3gtc2hhZG93OiAwcHggMHB4IDVweCAxcHggcmdiYSgxNjgsMTY4LDE2OCwxKTtcclxuXHRcdFx0XHQtbW96LWJveC1zaGFkb3c6IDBweCAwcHggNXB4IDFweCByZ2JhKDE2OCwxNjgsMTY4LDEpO1xyXG5cdFx0XHRcdGJveC1zaGFkb3c6IDBweCAwcHggNXB4IDFweCByZ2JhKDE2OCwxNjgsMTY4LDEpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHQubG9hZGluZy1wcm9ncmVzcy1iYXIgPiAubG9hZGluZy1wcm9ncmVzcy1maWxsIHtcclxuXHRcdFx0XHR3aWR0aDogMTAwJTtcclxuXHRcdFx0XHRoZWlnaHQ6IDEwMCU7XHJcblx0XHRcdFx0cG9zaXRpb246IGFic29sdXRlO1xyXG5cdFx0XHRcdGJhY2tncm91bmQtY29sb3I6ICM5ZGQyZmY7XHJcblx0XHRcdFx0dHJhbnNmb3JtOiB0cmFuc2xhdGVYKC0ke2RvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRXaWR0aH1weCk7XHJcblx0XHRcdH1cclxuXHRcdGA7XHJcblx0ICAgIFxyXG5cdCAgICBET00uYWRkU3R5bGUoJ1R1cmJvLWVDb21tZXJjZScsIGNzcyk7XHJcblx0fVxyXG59XHJcblxyXG5cclxuLyoqXHJcbiAqIEF0dGFjaGVzIGEgbG9hZGVyIHRvIHRoZSB0b3Agb2YgdGhlIHNjcmVlblxyXG4gKiBhbmQgaGlkZXMgdGhlIGNvbnRlbnQuXHJcbiAqIFN0b3BzIGF1dG9tYXRpY2FsbHkgYWZ0ZXIgMjAlIHJlYWNoZWQuXHJcbiAqXHJcbiAqIEByZXR1cm4gdm9pZCBcclxuICovXHJcbmZ1bmN0aW9uIHN0YXJ0TG9hZGluZygpIHtcclxuXHRsZXQgbG9hZGVyID0gRE9NLmNyZWF0ZUVsZW1lbnQoJ2RpdicsIHtcclxuXHRcdGNsYXNzOiAnbG9hZGluZy1wcm9ncmVzcy1iYXInXHJcblx0fSk7XHJcblxyXG5cdGxldCBmaWxsID0gRE9NLmNyZWF0ZUVsZW1lbnQoJ3NwYW4nLCB7XHJcblx0XHRjbGFzczogJ2xvYWRpbmctcHJvZ3Jlc3MtZmlsbCdcclxuXHR9KTtcclxuXHJcblx0bG9hZGVyLmFwcGVuZENoaWxkKGZpbGwpO1xyXG5cdGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQobG9hZGVyKTtcclxuXHJcblxyXG5cdGxldCBwcm9ncmVzcyA9IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRXaWR0aDtcclxuXHRsZXQgbWF4U2l6ZSA9IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRXaWR0aCAqIDAuODA7XHJcblxyXG5cdHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUocHJvZ3Jlc3NEcmF3KTtcclxuXHJcblx0bGV0IGNvbnRlbnQgPSB0aGlzLmVsZW1lbnQ7XHJcblxyXG5cdGNvbnRlbnQuc3R5bGUuZGlzcGxheSA9ICdub25lJztcclxuXHRcclxuXHRmdW5jdGlvbiBwcm9ncmVzc0RyYXcoKSB7XHJcblx0XHRmaWxsLnN0eWxlLnRyYW5zZm9ybSA9ICd0cmFuc2xhdGVYKC0nICsgcHJvZ3Jlc3MgKyAncHgpJztcclxuXHRcdHByb2dyZXNzIC09IDc7XHJcblxyXG5cdFx0aWYgKHByb2dyZXNzIDwgbWF4U2l6ZSkge1xyXG5cdFx0XHRkb25lKCk7XHJcblx0XHRcdHJldHVybjtcclxuXHRcdH1cclxuXHJcblx0XHR3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKHByb2dyZXNzRHJhdyk7XHJcblx0fVxyXG5cclxuXHRmdW5jdGlvbiBkb25lKCkge1xyXG5cdFx0ZmlsbC5zdHlsZS5vcGFjaXR5ID0gcHJvZ3Jlc3MgLyAxMDAwO1xyXG5cdFx0ZmlsbC5zdHlsZS50cmFuc2Zvcm0gPSAndHJhbnNsYXRlWCgtJyArIHByb2dyZXNzICsgJ3B4KSc7XHJcblx0XHJcblx0XHRwcm9ncmVzcyAtPSAxNTtcclxuXHJcblx0XHRpZiAocHJvZ3Jlc3MgPD0gMCkge1xyXG5cdFx0XHRjb250ZW50LnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xyXG5cdFx0XHRcclxuXHRcdFx0aWYgKHR5cGVvZiBsb2FkZXIgIT0gJ3VuZGVmaW5lZCcpIHtcclxuXHRcdFx0XHRET00ucmVtb3ZlKGxvYWRlcik7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHJldHVybjtcclxuXHRcdH1cclxuXHJcblx0XHR3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKGRvbmUpO1xyXG5cdH1cclxufVxuXG5yZXR1cm4gVHVyYm9FY29tbWVyY2U7XG5cbn0oKSk7XG4iXX0=
