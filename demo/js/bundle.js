'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var eCommerce = function () {
	'use strict';

	var InvalidArgumentException$1 = function (_Error) {
		_inherits(InvalidArgumentException$1, _Error);

		function InvalidArgumentException$1() {
			_classCallCheck(this, InvalidArgumentException$1);

			var _this = _possibleConstructorReturn(this, (InvalidArgumentException$1.__proto__ || Object.getPrototypeOf(InvalidArgumentException$1)).call(this));

			console.error('InvalidArgumentException, an invalid argument was passed.');
			return _this;
		}

		return InvalidArgumentException$1;
	}(Error);

	var DOM = function () {
		function DOM() {
			_classCallCheck(this, DOM);
		}

		_createClass(DOM, null, [{
			key: 'minifyCss',

			/**
    * Minifies the css text.
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
    */

		}, {
			key: 'switchClasses',
			value: function switchClasses(element, className, newClassName) {
				this.removeClass(element, className);
				this.addClass(element, newClassName);
			}

			/**
    * Adds class to a given element.
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
    * Queries the element from the DOM.
    */

		}, {
			key: 'element',
			value: function element(selector) {
				return queryElement.call(this, document, selector);
			}

			/**
    * Adds style tag with given id and css to the DOM.
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
    * Creates an element with the given options.
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
    */

		}, {
			key: 'toggleClass',
			value: function toggleClass(element, className, secondClassName) {
				if (element == null || typeof element == 'undefined') {
					throw new InvalidArgumentException$1();
				}

				secondClassName = secondClassName || undefined;

				element.classList.toggle(className);

				if (secondClassName) {
					element.classList.toggle(secondClassName);
				}
			}

			/**
    * Finds an element inside of parent.
    */

		}, {
			key: 'find',
			value: function find(element, selector) {
				return queryElement(element, selector);
			}
		}]);

		return DOM;
	}();

	/**
  * Queries an element from the DOM.
  */


	function queryElement(parent, selector) {
		var element = parent.querySelectorAll(selector);

		if (element.length == 0) {
			return null;
		}

		return element.length > 1 ? element : element[0];
	}

	var Event = function () {
		function Event() {
			_classCallCheck(this, Event);
		}

		_createClass(Event, null, [{
			key: 'listen',

			/**
    * Listen to an event.
    */
			value: function listen(name, callback) {
				if (typeof callback !== 'function') {
					throw new InvalidArgumentException();
				}

				events[name] = callback;
			}

			/**
    * Fires an event.
    */

		}, {
			key: 'trigger',
			value: function trigger(name, data) {
				data = data || null;

				if (typeof events[name] !== 'function') {
					throw new BadEventCallException();
				}

				if (data != null && data instanceof Array) {
					var _events;

					return (_events = events)[name].apply(_events, _toConsumableArray(data));
				}

				events[name]();
			}
		}]);

		return Event;
	}();

	var Common = function () {
		function Common() {
			_classCallCheck(this, Common);
		}

		_createClass(Common, null, [{
			key: 'extend',

			/**
    * Extend an object.
    */
			value: function extend(currentObj, newObj) {
				var extended = {};
				var prop;

				for (prop in currentObj) {
					if (Object.prototype.hasOwnProperty.call(currentObj, prop)) {
						extended[prop] = currentObj[prop];
					}
				}

				for (prop in newObj) {
					if (Object.prototype.hasOwnProperty.call(newObj, prop)) {
						extended[prop] = newObj[prop];
					}
				}

				return extended;
			}

			/**
    * Checks for a needle in hystack.
    */

		}, {
			key: 'in_array',
			value: function in_array(needle, hystack) {
				if (hystack.constructor !== Array) return;

				for (var i = 0; i <= hystack.length; i++) {
					if (needle == hystack[i]) return true;
				}

				return false;
			}

			/**
    * Checks if an object is empty.
    */

		}, {
			key: 'emptyObject',
			value: function emptyObject(object) {
				for (var prop in object) {
					return false;
				}

				return true;
			}
		}, {
			key: 'containsObject',
			value: function containsObject(object, hystack) {
				var i;

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
    * Convert camelCase to kebab-case.
    */

		}, {
			key: 'kebabCase',
			value: function kebabCase(string) {
				return string.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
			}

			/**
    * Checks if a given parameter is an object.
    */

		}, {
			key: 'isObject',
			value: function isObject(object) {
				return (typeof object === 'undefined' ? 'undefined' : _typeof(object)) == 'object';
			}

			/**
   	* Sets a cookie. 
   */

		}, {
			key: 'createCookie',
			value: function createCookie(name, value, days) {
				if (value.constructor.name == 'Array') {
					value = JSON.stringify(value);
				}

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
    */

		}, {
			key: 'getCookie',
			value: function getCookie(name) {
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

				return [];
			}

			/**
    * Generates a random string.
    */

		}, {
			key: 'randomStr',
			value: function randomStr(length) {
				var string = '';
				var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

				for (var i = 0; i < length; i++) {
					string += possible.charAt(Math.floor(Math.random() * possible.length));
				}

				return string;
			}
		}]);

		return Common;
	}();

	var InvalidBindingException = function (_Error2) {
		_inherits(InvalidBindingException, _Error2);

		function InvalidBindingException() {
			_classCallCheck(this, InvalidBindingException);

			var _this2 = _possibleConstructorReturn(this, (InvalidBindingException.__proto__ || Object.getPrototypeOf(InvalidBindingException)).call(this));

			console.error('InvalidBindingException, trying to bind an already existing bound.');
			return _this2;
		}

		return InvalidBindingException;
	}(Error);

	var _instances = [];

	var Container = function () {
		function Container() {
			_classCallCheck(this, Container);
		}

		_createClass(Container, [{
			key: 'bind',

			/**
    * Binds key to concrete class.
    */
			value: function bind(key, concrete) {
				if (typeof key != 'string' || typeof concrete != 'function') {
					throw new InvalidArgumentException$1();
				}

				if (typeof this[key] != 'undefined') {
					throw new InvalidBindingException();
				}

				this[key] = concrete.bind(concrete, this);
			}

			/**
    * Sets an instance.
    */

		}, {
			key: 'setInstance',
			value: function setInstance(key, instance) {
				if (typeof key != 'string' || (typeof instance === 'undefined' ? 'undefined' : _typeof(instance)) != 'object') {
					throw new InvalidArgumentException$1();
				}

				_instances[key] = instance;
			}

			/**
    * Gets an instance.
    */

		}, {
			key: 'getInstance',
			value: function getInstance(key) {
				if (typeof key != 'string') {
					throw new InvalidArgumentException$1();
				}

				if ((typeof key === 'undefined' ? 'undefined' : _typeof(key)) == 'object') {
					return _instances[key.constructor.name] || null;
				}

				return _instances[key] || null;
			}

			/**
    * Checks if an instance exist.
    */

		}, {
			key: 'instanceExist',
			value: function instanceExist(instance) {
				if ((typeof instance === 'undefined' ? 'undefined' : _typeof(instance)) == 'object') {
					return typeof _instances[instance.constructor.name] !== 'undefined';
				}

				return instance in _instances;
			}

			/**
    * Creates an instance.
    */

		}, {
			key: 'make',
			value: function make(object) {
				var instance = {};

				if (this.instanceExist(object)) {
					return this.getInstance(object);
				}

				if ((typeof object === 'undefined' ? 'undefined' : _typeof(object)) == 'object') {
					instance = object;
				} else if (typeof object == 'string' && this.hasOwnProperty(object)) {
					instance = new this[object]();
				} else {
					throw new InvalidBindingException();
				}

				this.setInstance(object, instance);

				return instance;
			}

			/**
    * Retrieve all instances.
    */

		}, {
			key: 'instances',
			value: function instances() {
				return _instances;
			}
		}]);

		return Container;
	}();

	var ComponentsException = function (_Error3) {
		_inherits(ComponentsException, _Error3);

		function ComponentsException() {
			_classCallCheck(this, ComponentsException);

			var _this3 = _possibleConstructorReturn(this, (ComponentsException.__proto__ || Object.getPrototypeOf(ComponentsException)).call(this));

			console.error('ComponentsException, expecting for at least one components, but none was given, \n\t\t\t\t\t\t\t\tplease add at least one requirement(Products, Services or/and Filter.');
			return _this3;
		}

		return ComponentsException;
	}(Error);

	var BadEventCallException$1 = function (_Error4) {
		_inherits(BadEventCallException$1, _Error4);

		function BadEventCallException$1() {
			_classCallCheck(this, BadEventCallException$1);

			var _this4 = _possibleConstructorReturn(this, (BadEventCallException$1.__proto__ || Object.getPrototypeOf(BadEventCallException$1)).call(this));

			console.error('BadEventCallException, listening to a none-existing event.');
			return _this4;
		}

		return BadEventCallException$1;
	}(Error);

	var NotInPageRangeException = function (_Error5) {
		_inherits(NotInPageRangeException, _Error5);

		function NotInPageRangeException() {
			_classCallCheck(this, NotInPageRangeException);

			var _this5 = _possibleConstructorReturn(this, (NotInPageRangeException.__proto__ || Object.getPrototypeOf(NotInPageRangeException)).call(this));

			console.error('NotInPageRangeException, sorry, no more pages.');
			return _this5;
		}

		return NotInPageRangeException;
	}(Error);

	var ComponentNotRegisteredException = function (_Error6) {
		_inherits(ComponentNotRegisteredException, _Error6);

		function ComponentNotRegisteredException() {
			_classCallCheck(this, ComponentNotRegisteredException);

			var _this6 = _possibleConstructorReturn(this, (ComponentNotRegisteredException.__proto__ || Object.getPrototypeOf(ComponentNotRegisteredException)).call(this));

			console.error('ComponentNotRegisteredException, components must be registered in order to use them.');
			return _this6;
		}

		return ComponentNotRegisteredException;
	}(Error);

	var ExceptionHandler = function (_Error7) {
		_inherits(ExceptionHandler, _Error7);

		function ExceptionHandler() {
			_classCallCheck(this, ExceptionHandler);

			return _possibleConstructorReturn(this, (ExceptionHandler.__proto__ || Object.getPrototypeOf(ExceptionHandler)).apply(this, arguments));
		}

		_createClass(ExceptionHandler, null, [{
			key: 'initalize',

			/**
    * Handle all the errors
    */
			value: function initalize() {
				window.onerror = function (message, source, lineno, colno, error) {

					if (error instanceof InvalidArgumentException$1) {
						// handle
					} else if (error instanceof InvalidBindingException) {
						// handle
					} else if (error instanceof BadEventCallException$1) {
						// handle
					} else if (error instanceof ComponentsException) {
						// handle
					} else if (error instanceof ComponentNotRegisteredException) {
						// handle
					} else if (error instanceof NotInPageRangeException) {
						// handle 
					} else {
						return false;
					}

					return true;
				};
			}
		}]);

		return ExceptionHandler;
	}(Error);

	/**
  * The default settings of the filter.
  */


	var defaultSettings$1 = {
		element: '.filter',
		data: {},
		class: 'col-xs-2',
		width: '',
		height: ''
	};

	/**
  * The Filter Object, handles the filter of the products/services.
  */

	var Filter = function () {
		function Filter(container) {
			_classCallCheck(this, Filter);

			this.setup(defaultSettings$1);
		}

		_createClass(Filter, [{
			key: 'setup',
			value: function setup(settings) {
				if ((typeof settings === 'undefined' ? 'undefined' : _typeof(settings)) != 'object') {
					throw new InvalidArgumentException$1();
				}

				this.settings = Common.extend(defaultSettings$1, settings);

				this.setElement(this.settings.element);
			}
		}, {
			key: 'setElement',
			value: function setElement(selector) {
				this.wrapper = DOM.element(selector);

				DOM.addClass(this.wrapper, this.settings.class);
			}
		}]);

		return Filter;
	}();

	/**
  * The default settings of each product.
  */


	var defaultSettings$2 = {
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
  */
	var Container$2 = void 0;

	/**
  * The Products Object, handles the products.
  */

	var Products = function () {
		/**
   * Initalize the Container.
   */
		function Products(container) {
			_classCallCheck(this, Products);

			Container$2 = container;
		}

		/**
   * Sets the given settings from the user.
   */


		_createClass(Products, [{
			key: 'setup',
			value: function setup(settings) {
				document.addEventListener('DOMContentLoaded', function () {

					if ((typeof settings === 'undefined' ? 'undefined' : _typeof(settings)) != 'object') {
						throw new InvalidArgumentException$1();
					}

					this.settings = Common.extend(defaultSettings$2, settings);

					this.setElement(this.settings.element);

					this.addStyleTag();

					this.loadProducts();
				}.bind(this));
			}

			/**
    * Loads the products and replace them in the div container.
    */

		}, {
			key: 'loadProducts',
			value: function loadProducts() {
				var request = this.getProducts();

				request.then(function (items) {
					this.replaceItems(items);
				}.bind(this)).catch(function (error) {});
			}

			/**
    * Sets the DOM element for populating the products.
    */

		}, {
			key: 'setElement',
			value: function setElement(selector) {
				this.wrapper = DOM.element(selector);

				if (this.wrapper) {
					DOM.addClass(this.wrapper, this.settings.class);
				}
			}

			/**
    * Replace items in the container.
    */

		}, {
			key: 'replaceItems',
			value: function replaceItems(items) {
				if (!Array.isArray(items) || items.length <= 0 && typeof items[0] == 'string') {
					throw new InvalidArgumentException$1();
				}

				var products = this.buildProducts(items, this.settings.item_class, 'div');

				this.wrapper.innerHTML = products;

				return items;
			}

			/**
    * Makes an Ajax call to the server without parameters.
    */

		}, {
			key: 'getProducts',
			value: function getProducts() {
				return this.askServer();
			}

			/**
    * Makes an Ajax call to the server.
    */

		}, {
			key: 'getProductsByPage',
			value: function getProductsByPage(pageNumber) {
				return this.askServer(pageNumber);
			}
		}, {
			key: 'askServer',
			value: function askServer(pageNumber) {
				pageNumber = pageNumber || null;

				return new Promise(function (resolve, reject) {

					var xhr = new XMLHttpRequest() || new ActiveXObject("Microsoft.XMLHTTP");

					if (pageNumber) {
						xhr.open('GET', this.settings.url + '?page=' + pageNumber, true);
					} else {
						xhr.open('GET', this.settings.url, true);
					}

					xhr.setRequestHeader('Content-Type', 'application/json');

					var instance = this;

					xhr.onreadystatechange = function () {
						if (this.readyState == 4) {
							if (this.status == 200) {
								instance.currentItems = this.responseText == '' ? [] : JSON.parse(this.responseText);

								if (instance.currentItems.length === 0) {
									reject('No Items were retrieved!');
								}

								for (var i = 0; i < instance.currentItems.length; i++) {
									var product = instance.currentItems[i];
									instance.AfterLoaded.call(this, product);
								}

								resolve(instance.currentItems);
							} else {
								reject(this.statusText);
							}
						}
					};

					xhr.onerror = function (error) {
						reject(error);
					};

					xhr.send(null);
				}.bind(this));
			}

			/**
    * Builds the html for the products.
    */

		}, {
			key: 'buildProducts',
			value: function buildProducts(attributesCollection, className, tagType) {
				if (attributesCollection.constructor.name != 'Array') {
					throw new InvalidArgumentException$1();
				}

				var builtProducts = '';

				attributesCollection.forEach(function (attributes) {
					builtProducts += this.buildProduct(attributes, className, tagType);
				}.bind(this));

				return builtProducts;
			}

			/**
    * Builds the html for a single product.
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

					DOM.addClass(_tag, 'product-' + Common.kebabCase(attribute));
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

				overlay.appendChild(tag);

				return product.outerHTML;
			}

			/**
    * An event for the client of when the products as been loaded.
    */

		}, {
			key: 'AfterLoaded',
			value: function AfterLoaded(product) {}
			//


			/**
    * Add the eCommerce style tags to the DOM.
    */

		}, {
			key: 'addStyleTag',
			value: function addStyleTag() {
				if (DOM.element('#eCommerce-Products')) {
					return;
				}

				var css = '\n\t\t\t.product {\n\t\t\t\tposition: relative;\n\t\t\t\tmargin: 5px 5px;\n\t\t\t\tborder: 1px solid #e4e4e4;\n\t\t\t\twidth: ' + this.settings.width + ';\n\t\t\t\theight: ' + this.settings.height + ';\n\t\t\t\tcursor: pointer;\n\t\t\t\tcolor: #ffffff;\n\t\t\t\toverflow: hidden;\n\t\t\t}\n\n\t\t\t.product > .product-overlay {\n\t\t\t\tposition: absolute;\n\t\t\t\ttop: 0;\n\t\t\t\tleft: 0;\n\t\t\t\twidth: 100%;\n\t\t\t\theight: 100%;\n\t\t\t\topacity: 0.5;\n\t\t\t\tz-index: 5;\n\t\t\t\ttransition: 1s all;\n\t\t\t\ttransform: translateX(-250px);\n\t\t\t}\n\n\t\t\t.product:hover > .product-overlay {\n\t\t\t\tbackground: rgba(0, 0, 0, 0.45);\n\t\t\t\ttransform: translateX(0px);\n\t\t\t\topacity: 1;\n\t\t\t\ttransition: 1s all;\n\t\t\t}\n\n\t\t\t.product > img {\n\t\t\t\tposition: absolute;\n\t\t\t\tleft: 0;\n\t\t\t\ttop: 0;\n\t\t\t\twidth: 100%;\n\t\t\t\theight: 100%;\n\t\t\t}\n\n\t\t\t.product > .product-image {\n\t\t\t\tz-index: 0;\n\t\t\t\tposition: absolute;\n\t\t\t\ttop: 0;\n\t\t\t\tleft: 0;\n\t\t\t}\n\n\t\t\t.product > .product-overlay > .product-name, \n\t\t\t.product > .product-overlay > .product-price,\n\t\t\t.product > .product-overlay > .product-delivery-time {\n\t\t\t\tz-index: 1;\n\t\t\t\tposition: relative;\n\t\t\t\ttext-align: center;\n\t\t\t\tmargin-top: 25px;\n\t\t\t}\n\n\t\t\t.product > .product-overlay > .action-buttons {\n\t\t\t\twidth: 100%;\n\t\t\t\tmargin-top: 10px;\n\t\t\t\ttext-align: center;\n\t\t\t}\n\n\t\t\t.product > .product-overlay > .action-buttons > #favorite {\n\t\t\t\tmargin-left: 10px;\n\t\t\t}\n\n\t\t';

				DOM.addStyle('eCommerce-Products', css);
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

	/**
  * The default settings of the pagination.
  */


	var defaultSettings$3 = {
		element: '.pagination-links',
		class: 'col-xs-offset-4 col-xs-8',
		per_page: 5,
		total_items: 10
	};

	/**
  * Stores the container object.
  */
	var Container$3 = void 0;

	/**
  * Stores the products component.
  */
	var Products$2 = void 0;

	/**
  * The Pagination Object, handles the pagination.
  */

	var Pagination = function () {
		/**
   * Initialize the container object and the default settings.
   */
		function Pagination(container, products) {
			_classCallCheck(this, Pagination);

			Container$3 = container;
			Products$2 = products;
		}

		/**
   * Set the Pagination object up.
   */


		_createClass(Pagination, [{
			key: 'setup',
			value: function setup(settings) {
				document.addEventListener('DOMContentLoaded', function () {

					if ((typeof settings === 'undefined' ? 'undefined' : _typeof(settings)) != 'object') {
						throw new InvalidArgumentException$1();
					}

					this.settings = Common.extend(defaultSettings$3, settings);

					this.totalPages = this.calculateTotalPages(this.settings.per_page, this.settings.total_items);

					this.setElement(this.settings.element);
					this.replaceLinks(this.links);
				}.bind(this));
			}

			/**
    * Sets the wrapper element.
    */

		}, {
			key: 'setElement',
			value: function setElement(selector) {
				this.wrapper = DOM.element(selector);

				DOM.addClass(this.wrapper, this.settings.class);

				this.links = this.createLinks();
				this.bindEventListeners(this.links);
			}

			/**
    * Replaces the links in the wrapper.
    */

		}, {
			key: 'replaceLinks',
			value: function replaceLinks(links) {
				this.wrapper.innerHTML = '';
				this.wrapper.appendChild(links);
			}
		}, {
			key: 'calculateTotalPages',
			value: function calculateTotalPages(perPage, totalItems) {
				perPage = parseInt(perPage);
				totalItems = parseInt(totalItems);

				return Math.ceil(totalItems / perPage);
			}

			/**
    * Binds the buttons events listeners.
    */

		}, {
			key: 'bindEventListeners',
			value: function bindEventListeners(links) {
				var instance = this;

				this.next.childNodes[0].onclick = function (event) {
					event.preventDefault();

					var requestedPage = instance.current + 1;

					if (instance.notInPageRange(requestedPage)) {
						throw new NotInPageRangeException();
					}

					Products$2.getProductsByPage(requestedPage).then(function (products) {
						Products$2.replaceItems(products);
					});

					instance.setCurrent(requestedPage);
				};

				this.previous.childNodes[0].onclick = function (event) {
					event.preventDefault();

					var requestedPage = instance.current - 1;

					if (instance.notInPageRange(requestedPage)) {
						throw new NotInPageRangeException();
					}

					Products$2.getProductsByPage(requestedPage).then(function (products) {
						Products$2.replaceItems(products);
					});

					instance.setCurrent(requestedPage);
				};

				for (var i = 0; i < this.pages.length; i++) {
					this.pages[i].childNodes[0].onclick = function (event) {
						event.preventDefault();

						var requestedPage = this.getAttribute('data-page-nr');

						Products$2.getProductsByPage(requestedPage).then(function (products) {
							Products$2.replaceItems(products);
						});

						instance.setCurrent(requestedPage);
					};
				}
			}

			/**
    * Sets the current page.
    */

		}, {
			key: 'setCurrent',
			value: function setCurrent(pageNumber) {
				this.current = parseInt(pageNumber);
				this.changeUrl(pageNumber);
			}

			/**
    * Gets the current page.
    */

		}, {
			key: 'getCurrent',
			value: function getCurrent() {
				return this.current;
			}

			/**
    * Creates the pagination links.
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
    */

		}, {
			key: 'createPageLinks',
			value: function createPageLinks() {
				var pages = [];

				for (var i = 1; i <= this.totalPages; i++) {
					var pageItem = document.createElement('li');
					var link = document.createElement('a');
					pageItem.className = 'page-item';
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
    */

		}, {
			key: 'notInPageRange',
			value: function notInPageRange(pageNumber) {
				return pageNumber > this.totalPages || pageNumber <= 0 || isNaN(pageNumber);
			}

			/**
    * Changes the url to a given page number.
    */

		}, {
			key: 'changeUrl',
			value: function changeUrl(pageNumber) {
				pageNumber = pageNumber || GET_Vars()['page'];
				window.history.replaceState('', '', this.updateURLParameter(window.location.href, 'page', pageNumber));
			}

			/**
    * Get the get variables from the url.
    */

		}, {
			key: 'GET_Vars',
			value: function GET_Vars() {
				var vars = {};
				var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (m, key, value) {
					vars[key] = value;
				});

				return vars;
			}

			/**
    * Modifies the get parameter in the url.
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

	/**
  * The default settings of the cart.
  */


	var defaultSettings$4 = {
		element: '.cart',
		cookie_name: 'cart',
		preview_class: '',
		class: '',
		width: '60px',
		height: '60px',
		placement: 'right-top',
		fixed: true,
		hover_color: 'orange'
	};

	/**
  * Stores the container object.
  */
	var Container$4 = void 0;

	/**
  * The Cart Object, handles the cart icon and sessions.
  */

	var Cart = function () {
		/**
   * Initialize the default settings, setting the element,
   * and creating the preview for the carts details.
   */
		function Cart(container) {
			_classCallCheck(this, Cart);

			Container$4 = container;

			this.previewElement = this.createPreviewElement();
			this.svgIcon = createIcon.call(this);
			this.items = [];
		}

		/**
   * Sets the object by the users setting.
   */


		_createClass(Cart, [{
			key: 'setup',
			value: function setup(settings) {
				if ((typeof settings === 'undefined' ? 'undefined' : _typeof(settings)) != 'object') {
					throw new InvalidArgumentException$1();
				}

				this.settings = Common.extend(defaultSettings$4, settings);

				this.setElement(this.settings.element);
				DOM.addClass(this.previewElement, 'closed');
				DOM.addClass(this.previewElement, this.settings.preview_class);

				this.bindEventListeners();
				this.addStyleTag();

				this.setCartCookie(this.settings.cookie_name);
			}
		}, {
			key: 'addItem',
			value: function addItem(item) {
				this.items = Common.getCookie('cart');

				this.items.push(item);

				Common.createCookie(this.settings.cookie_name, this.items, 2);
			}

			/**
    * Binds everthing to the element.
    */

		}, {
			key: 'setElement',
			value: function setElement(selector) {
				this.icon = DOM.element(selector);

				if (this.icon) {
					DOM.addClass(this.icon, this.settings.class);
					DOM.addClass(this.icon, this.settings.placement);
					this.icon.appendChild(this.svgIcon);
					this.icon.appendChild(this.previewElement);
				}
			}

			/**
    * Creates the cart details preview element.
    */

		}, {
			key: 'createPreviewElement',
			value: function createPreviewElement() {
				var previewElement = DOM.createElement('div', {
					id: 'preview'
				});

				return previewElement;
			}

			/**
    * Add the eCommerce style tags to the DOM.
    */

		}, {
			key: 'addStyleTag',
			value: function addStyleTag() {
				if (DOM.element('#eCommerce-Cart')) {
					return;
				}

				var position = this.settings.fixed ? 'fixed' : 'absolute';

				var css = '\n\t\t\t' + this.settings.element + ' {\n\t\t\t\tposition: ' + position + ';\n\t\t\t\tcursor: pointer;\n\t\t\t\tcolor: #ffffff;\n\t\t\t\tz-index: 998;\n\t\t\t}\n\n\t\t\t' + this.settings.element + ' > svg {\n\t\t\t\twidth: ' + this.settings.width + ';\n\t\t\t\theight: ' + this.settings.height + ';\n\t\t\t\ttransition: fill 0.3s;\n\t\t\t}\n\n\t\t\t' + this.settings.element + ' > svg:hover {\n\t\t\t\tfill: ' + this.settings.hover_color + ';\n\t\t\t\ttransition: fill 0.3s;\n\t\t\t}\n\n\t\t\t' + this.settings.element + '.top-right,\n\t\t\t' + this.settings.element + '.right-top {\n\t\t\t\tright: 10px;\n\t\t\t\ttop: 10px;\n\t\t\t}\n\n\t\t\t' + this.settings.element + '.left-top,\n\t\t\t' + this.settings.element + '.top-left {\n\t\t\t\tleft: 10px;\n\t\t\t\ttop: 10px;\n\t\t\t}\n\n\t\t\t' + this.settings.element + ' > #preview {\n\t\t\t\tposition: ' + position + ';\n\t\t\t\tz-index: 9999;\n\t\t\t\ttop: calc(10px + ' + this.settings.height + ');\n\t\t\t\ttransform: translateX(60px);\n\t\t\t\theight: 400px;\n\t\t\t\twidth: 300px;\n\t\t\t\tborder: 1px solid #e4e4e4;\n\t\t\t\tbackground: #ffffff;\n\t\t\t\ttransition: transform 1s, visibility 1s;\n\t\t\t}\n\n\t\t\t' + this.settings.element + ' > #preview.opened {\n\t\t\t\tvisibility: visible;\n\t\t\t\ttransform: translateX(-240px);\n\t\t\t}\n\n\t\t\t' + this.settings.element + ' > #preview.closed {\n\t\t\t\tvisibility: hidden;\n\t\t\t\ttransform: translateX(60px);\n\t\t\t}\n\t\t';

				DOM.addStyle('eCommerce-Cart', css);
			}

			/**
    * Binds event listeners to the cart icon.
    */

		}, {
			key: 'bindEventListeners',
			value: function bindEventListeners() {
				if (this.svgIcon == null) {
					return;
				}

				this.svgIcon.onclick = function (event) {
					event.preventDefault();
					DOM.toggleClass(this.previewElement, 'opened', 'closed');
				}.bind(this);

				this.previewElement.onmouseout = function (event) {
					close.call(this, event);
				}.bind(this);
			}
		}, {
			key: 'setCartCookie',
			value: function setCartCookie(name) {
				if (Common.getCookie(name)) {
					return;
				}

				Common.createCookie('cart', [], 2);
			}
		}]);

		return Cart;
	}();

	function close(event) {
		event.preventDefault();
		DOM.switchClasses(this.previewElement, 'opened', 'closed');
	}

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

	var initalized = false;

	var defaultSettings = {
		importBootstrap: false,
		components: ['Products', 'Services', 'Filter', 'Pagination', 'Cart']
	};

	var eCommerce = function eCommerce(settings) {
		_classCallCheck(this, eCommerce);

		ExceptionHandler.initalize();

		if ((typeof settings === 'undefined' ? 'undefined' : _typeof(settings)) != 'object') {
			throw new InvalidArgumentException$1();
		}

		this.container = new Container();
		this.settings = Common.extend(defaultSettings, settings);

		bindComponentsDependencies.call(this, settings.components);

		initalized = true;

		return new Proxy(this, {
			get: function get(target, object) {
				if (!Common.in_array(object, settings.components)) {
					throw new ComponentNotRegisteredException();
				}

				return target.container.make(object);
			}
		});
	};

	/**
  * Binds components dependencies.
  */


	function bindComponentsDependencies(components) {
		this.container.bind('Filter', function (container) {
			container['Filter'].booted = true;
			return new Filter(container);
		});

		this.container.bind('Services', function (container) {
			container['Services'].booted = true;
			return new Services(container);
		});

		this.container.bind('Products', function (container) {
			container['Products'].booted = true;
			return new Products(container);
		});

		this.container.bind('Pagination', function (container) {
			container['Pagination'].booted = true;
			return new Pagination(container, container.make('Products'));
		});

		this.container.bind('Cart', function (container) {
			container['Cart'].booted = true;
			return new Cart(container);
		});

		this.container['Filter']['booted'] = false;
		this.container['Services']['booted'] = false;
		this.container['Products']['booted'] = false;
		this.container['Pagination']['booted'] = false;
		this.container['Cart']['booted'] = false;
	}

	return eCommerce;
}();
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVDb21tZXJjZS5qcyJdLCJuYW1lcyI6WyJlQ29tbWVyY2UiLCJJbnZhbGlkQXJndW1lbnRFeGNlcHRpb24kMSIsImNvbnNvbGUiLCJlcnJvciIsIkVycm9yIiwiRE9NIiwic3RyaW5nIiwicmVwbGFjZSIsImVsZW1lbnQiLCJjbGFzc05hbWUiLCJuZXdDbGFzc05hbWUiLCJyZW1vdmVDbGFzcyIsImFkZENsYXNzIiwidW5kZWZpbmVkIiwiY2xhc3NOYW1lcyIsInNwbGl0IiwiZm9yRWFjaCIsIm5hbWUiLCJjbGFzc0xpc3QiLCJhZGQiLCJyZW1vdmUiLCJzZWxlY3RvciIsInF1ZXJ5RWxlbWVudCIsImNhbGwiLCJkb2N1bWVudCIsImlkIiwiY3NzIiwiaGVhZCIsImdldEVsZW1lbnRzQnlUYWdOYW1lIiwic3R5bGVUYWciLCJjcmVhdGVFbGVtZW50IiwiQ1NTIiwibWluaWZ5Q3NzIiwiaW5uZXJIVE1MIiwic2V0QXR0cmlidXRlIiwiYXBwZW5kQ2hpbGQiLCJlbGVtZW50VHlwZSIsIm9wdGlvbnMiLCJvcHRpb24iLCJzZWNvbmRDbGFzc05hbWUiLCJ0b2dnbGUiLCJwYXJlbnQiLCJxdWVyeVNlbGVjdG9yQWxsIiwibGVuZ3RoIiwiRXZlbnQiLCJjYWxsYmFjayIsIkludmFsaWRBcmd1bWVudEV4Y2VwdGlvbiIsImV2ZW50cyIsImRhdGEiLCJCYWRFdmVudENhbGxFeGNlcHRpb24iLCJBcnJheSIsIkNvbW1vbiIsImN1cnJlbnRPYmoiLCJuZXdPYmoiLCJleHRlbmRlZCIsInByb3AiLCJPYmplY3QiLCJwcm90b3R5cGUiLCJoYXNPd25Qcm9wZXJ0eSIsIm5lZWRsZSIsImh5c3RhY2siLCJjb25zdHJ1Y3RvciIsImkiLCJvYmplY3QiLCJ0b0xvd2VyQ2FzZSIsInZhbHVlIiwiZGF5cyIsIkpTT04iLCJzdHJpbmdpZnkiLCJleHBpcmVzIiwiZGF0ZSIsIkRhdGUiLCJzZXRUaW1lIiwiZ2V0VGltZSIsInRvR01UU3RyaW5nIiwiY29va2llIiwiY19zdGFydCIsImluZGV4T2YiLCJjX2VuZCIsInBhcnNlIiwidW5lc2NhcGUiLCJzdWJzdHJpbmciLCJwb3NzaWJsZSIsImNoYXJBdCIsIk1hdGgiLCJmbG9vciIsInJhbmRvbSIsIkludmFsaWRCaW5kaW5nRXhjZXB0aW9uIiwiaW5zdGFuY2VzIiwiQ29udGFpbmVyIiwia2V5IiwiY29uY3JldGUiLCJiaW5kIiwiaW5zdGFuY2UiLCJpbnN0YW5jZUV4aXN0IiwiZ2V0SW5zdGFuY2UiLCJzZXRJbnN0YW5jZSIsIkNvbXBvbmVudHNFeGNlcHRpb24iLCJCYWRFdmVudENhbGxFeGNlcHRpb24kMSIsIk5vdEluUGFnZVJhbmdlRXhjZXB0aW9uIiwiQ29tcG9uZW50Tm90UmVnaXN0ZXJlZEV4Y2VwdGlvbiIsIkV4Y2VwdGlvbkhhbmRsZXIiLCJ3aW5kb3ciLCJvbmVycm9yIiwibWVzc2FnZSIsInNvdXJjZSIsImxpbmVubyIsImNvbG5vIiwiZGVmYXVsdFNldHRpbmdzJDEiLCJjbGFzcyIsIndpZHRoIiwiaGVpZ2h0IiwiRmlsdGVyIiwiY29udGFpbmVyIiwic2V0dXAiLCJzZXR0aW5ncyIsImV4dGVuZCIsInNldEVsZW1lbnQiLCJ3cmFwcGVyIiwiZGVmYXVsdFNldHRpbmdzJDIiLCJpdGVtX2NsYXNzIiwiYWRkX2J1dHRvbl9jbGFzcyIsImZhdm9yaXRlX2J1dHRvbl9jbGFzcyIsImF0dHJpYnV0ZXMiLCJ1cmwiLCJDb250YWluZXIkMiIsIlByb2R1Y3RzIiwiYWRkRXZlbnRMaXN0ZW5lciIsImFkZFN0eWxlVGFnIiwibG9hZFByb2R1Y3RzIiwicmVxdWVzdCIsImdldFByb2R1Y3RzIiwidGhlbiIsIml0ZW1zIiwicmVwbGFjZUl0ZW1zIiwiY2F0Y2giLCJpc0FycmF5IiwicHJvZHVjdHMiLCJidWlsZFByb2R1Y3RzIiwiYXNrU2VydmVyIiwicGFnZU51bWJlciIsIlByb21pc2UiLCJyZXNvbHZlIiwicmVqZWN0IiwieGhyIiwiWE1MSHR0cFJlcXVlc3QiLCJBY3RpdmVYT2JqZWN0Iiwib3BlbiIsInNldFJlcXVlc3RIZWFkZXIiLCJvbnJlYWR5c3RhdGVjaGFuZ2UiLCJyZWFkeVN0YXRlIiwic3RhdHVzIiwiY3VycmVudEl0ZW1zIiwicmVzcG9uc2VUZXh0IiwicHJvZHVjdCIsIkFmdGVyTG9hZGVkIiwic3RhdHVzVGV4dCIsInNlbmQiLCJhdHRyaWJ1dGVzQ29sbGVjdGlvbiIsInRhZ1R5cGUiLCJidWlsdFByb2R1Y3RzIiwiYnVpbGRQcm9kdWN0Iiwib3ZlcmxheSIsImF0dHJpYnV0ZSIsImluX2FycmF5IiwidGFnIiwiaW1hZ2UiLCJzcmMiLCJrZWJhYkNhc2UiLCJhZGRUb0NhcnQiLCJ0eXBlIiwidGV4dCIsImZhdm9yaXRlIiwib3V0ZXJIVE1MIiwiYWRkU3R5bGUiLCJTZXJ2aWNlcyIsImRlZmF1bHRTZXR0aW5ncyQzIiwicGVyX3BhZ2UiLCJ0b3RhbF9pdGVtcyIsIkNvbnRhaW5lciQzIiwiUHJvZHVjdHMkMiIsIlBhZ2luYXRpb24iLCJ0b3RhbFBhZ2VzIiwiY2FsY3VsYXRlVG90YWxQYWdlcyIsInJlcGxhY2VMaW5rcyIsImxpbmtzIiwiY3JlYXRlTGlua3MiLCJiaW5kRXZlbnRMaXN0ZW5lcnMiLCJwZXJQYWdlIiwidG90YWxJdGVtcyIsInBhcnNlSW50IiwiY2VpbCIsIm5leHQiLCJjaGlsZE5vZGVzIiwib25jbGljayIsImV2ZW50IiwicHJldmVudERlZmF1bHQiLCJyZXF1ZXN0ZWRQYWdlIiwiY3VycmVudCIsIm5vdEluUGFnZVJhbmdlIiwiZ2V0UHJvZHVjdHNCeVBhZ2UiLCJzZXRDdXJyZW50IiwicHJldmlvdXMiLCJwYWdlcyIsImdldEF0dHJpYnV0ZSIsImNoYW5nZVVybCIsInVsIiwiY3JlYXRlUGFnZUxpbmtzIiwiY3JlYXRlUHJldmlvdXNCdXR0b24iLCJjcmVhdGVOZXh0QnV0dG9uIiwicGFnZSIsInBhZ2VJdGVtIiwibGluayIsInB1c2giLCJsaSIsInNwYW4xIiwic3BhbjIiLCJpc05hTiIsIkdFVF9WYXJzIiwiaGlzdG9yeSIsInJlcGxhY2VTdGF0ZSIsInVwZGF0ZVVSTFBhcmFtZXRlciIsImxvY2F0aW9uIiwiaHJlZiIsInZhcnMiLCJwYXJ0cyIsIm0iLCJwYXJhbSIsInBhcmFtVmFsIiwibmV3QWRkaXRpb25hbFVSTCIsInRlbXBBcnJheSIsImJhc2VVUkwiLCJhZGRpdGlvbmFsVVJMIiwidGVtcCIsInJvd3NUZXh0IiwiZGVmYXVsdFNldHRpbmdzJDQiLCJjb29raWVfbmFtZSIsInByZXZpZXdfY2xhc3MiLCJwbGFjZW1lbnQiLCJmaXhlZCIsImhvdmVyX2NvbG9yIiwiQ29udGFpbmVyJDQiLCJDYXJ0IiwicHJldmlld0VsZW1lbnQiLCJjcmVhdGVQcmV2aWV3RWxlbWVudCIsInN2Z0ljb24iLCJjcmVhdGVJY29uIiwic2V0Q2FydENvb2tpZSIsIml0ZW0iLCJnZXRDb29raWUiLCJjcmVhdGVDb29raWUiLCJpY29uIiwicG9zaXRpb24iLCJ0b2dnbGVDbGFzcyIsIm9ubW91c2VvdXQiLCJjbG9zZSIsInN3aXRjaENsYXNzZXMiLCJzdmciLCJjcmVhdGVFbGVtZW50TlMiLCJnIiwicGF0aCIsImluaXRhbGl6ZWQiLCJkZWZhdWx0U2V0dGluZ3MiLCJpbXBvcnRCb290c3RyYXAiLCJjb21wb25lbnRzIiwiaW5pdGFsaXplIiwiYmluZENvbXBvbmVudHNEZXBlbmRlbmNpZXMiLCJQcm94eSIsImdldCIsInRhcmdldCIsIm1ha2UiLCJib290ZWQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUEsSUFBSUEsWUFBYSxZQUFZO0FBQzdCOztBQUQ2QixLQUd2QkMsMEJBSHVCO0FBQUE7O0FBSzVCLHdDQUNBO0FBQUE7O0FBQUE7O0FBRUlDLFdBQVFDLEtBQVI7QUFGSjtBQUdJOztBQVR3QjtBQUFBLEdBR1lDLEtBSFo7O0FBQUEsS0FZdkJDLEdBWnVCO0FBQUE7QUFBQTtBQUFBOztBQUFBO0FBQUE7O0FBYzVCOzs7QUFkNEIsNkJBaUJYQyxNQWpCVyxFQWtCNUI7QUFDSUEsYUFBU0EsT0FBT0MsT0FBUCxDQUFlLHdDQUFmLEVBQXlELEVBQXpELENBQVQ7QUFDQUQsYUFBU0EsT0FBT0MsT0FBUCxDQUFlLFFBQWYsRUFBeUIsR0FBekIsQ0FBVDtBQUNBRCxhQUFTQSxPQUFPQyxPQUFQLENBQWUsVUFBZixFQUEyQixJQUEzQixDQUFUO0FBQ0FELGFBQVNBLE9BQU9DLE9BQVAsQ0FBZSxVQUFmLEVBQTJCLElBQTNCLENBQVQ7QUFDQUQsYUFBU0EsT0FBT0MsT0FBUCxDQUFlLEtBQWYsRUFBc0IsR0FBdEIsQ0FBVDs7QUFFQSxXQUFPRCxNQUFQO0FBQ0g7O0FBRUQ7Ozs7QUE1QjRCO0FBQUE7QUFBQSxpQ0ErQlBFLE9BL0JPLEVBK0JFQyxTQS9CRixFQStCYUMsWUEvQmIsRUFnQzVCO0FBQ0MsU0FBS0MsV0FBTCxDQUFpQkgsT0FBakIsRUFBMEJDLFNBQTFCO0FBQ0EsU0FBS0csUUFBTCxDQUFjSixPQUFkLEVBQXVCRSxZQUF2QjtBQUNBOztBQUVEOzs7O0FBckM0QjtBQUFBO0FBQUEsNEJBd0NaRixPQXhDWSxFQXdDSEMsU0F4Q0csRUF5QzVCO0FBQ0MsUUFBR0QsWUFBWSxJQUFmLEVBQXFCO0FBQ3BCLFdBQU0sSUFBSVAsMEJBQUosRUFBTjtBQUNBOztBQUVELFFBQUcsQ0FBRVEsU0FBRixJQUFlQSxhQUFhLEVBQTVCLElBQWtDLFFBQU9BLFNBQVAseUNBQU9BLFNBQVAsT0FBcUJJLFNBQTFELEVBQXFFO0FBQ3BFLFlBQU9MLE9BQVA7QUFDQTs7QUFFRCxRQUFJTSxhQUFhTCxVQUFVTSxLQUFWLENBQWdCLEdBQWhCLENBQWpCOztBQUVBRCxlQUFXRSxPQUFYLENBQW1CLFVBQVNDLElBQVQsRUFBZTtBQUNqQ1QsYUFBUVUsU0FBUixDQUFrQkMsR0FBbEIsQ0FBc0JGLElBQXRCO0FBQ0EsS0FGRDs7QUFJQSxXQUFPVCxPQUFQO0FBQ0E7O0FBRUQ7Ozs7QUEzRDRCO0FBQUE7QUFBQSwrQkE4RFRBLE9BOURTLEVBOERBQyxTQTlEQSxFQStENUI7QUFDQyxRQUFHRCxXQUFXLElBQWQsRUFBb0I7QUFDbkIsV0FBTSxJQUFJUCwwQkFBSixFQUFOO0FBQ0E7O0FBRUQsUUFBR1EsYUFBYSxFQUFoQixFQUFvQjtBQUNuQkQsYUFBUUMsU0FBUixHQUFvQixFQUFwQjtBQUNBLEtBRkQsTUFFTzs7QUFFTixTQUFJSyxhQUFhTCxVQUFVTSxLQUFWLENBQWdCLEdBQWhCLENBQWpCOztBQUVBRCxnQkFBV0UsT0FBWCxDQUFtQixVQUFTQyxJQUFULEVBQWU7QUFDakNULGNBQVFVLFNBQVIsQ0FBa0JFLE1BQWxCLENBQXlCSCxJQUF6QjtBQUNBLE1BRkQ7QUFHQTs7QUFFRCxXQUFPVCxPQUFQO0FBQ0E7O0FBRUQ7Ozs7QUFsRjRCO0FBQUE7QUFBQSwyQkFxRmJhLFFBckZhLEVBc0Y1QjtBQUNDLFdBQU9DLGFBQWFDLElBQWIsQ0FBa0IsSUFBbEIsRUFBd0JDLFFBQXhCLEVBQWtDSCxRQUFsQyxDQUFQO0FBQ0E7O0FBRUQ7Ozs7QUExRjRCO0FBQUE7QUFBQSw0QkE2RlpJLEVBN0ZZLEVBNkZSQyxHQTdGUSxFQThGNUI7QUFDQyxRQUFHLE9BQU9BLEdBQVAsSUFBYyxRQUFqQixFQUEyQjtBQUMxQixXQUFNLElBQUl6QiwwQkFBSixFQUFOO0FBQ0E7O0FBRUQsUUFBSTBCLE9BQU9ILFNBQVNHLElBQVQsSUFBaUJILFNBQVNJLG9CQUFULENBQThCLE1BQTlCLEVBQXNDLENBQXRDLENBQTVCO0FBQ0EsUUFBSUMsV0FBV0wsU0FBU00sYUFBVCxDQUF1QixPQUF2QixDQUFmOztBQUVBO0FBQ0csUUFBSUMsTUFBTSxLQUFLQyxTQUFMLENBQWVOLEdBQWYsQ0FBVjtBQUNBO0FBQ0FHLGFBQVNJLFNBQVQsR0FBcUJGLEdBQXJCO0FBQ0E7QUFDSEYsYUFBU0ssWUFBVCxDQUFzQixJQUF0QixFQUE0QlQsRUFBNUI7QUFDQTtBQUNBRSxTQUFLUSxXQUFMLENBQWlCTixRQUFqQjtBQUNBOztBQUVEOzs7O0FBaEg0QjtBQUFBO0FBQUEsaUNBbUhQTyxXQW5ITyxFQW1ITUMsT0FuSE4sRUFvSDVCO0FBQ0MsUUFBSTdCLFVBQVVnQixTQUFTTSxhQUFULENBQXVCTSxXQUF2QixDQUFkOztBQUVBLFFBQUlDLFlBQVl4QixTQUFoQixFQUEyQjtBQUMxQixZQUFPTCxPQUFQO0FBQ0E7O0FBRUQsU0FBSyxJQUFJOEIsTUFBVCxJQUFtQkQsT0FBbkIsRUFBNEI7QUFDM0IsU0FBR0MsVUFBVSxNQUFiLEVBQXFCO0FBQ3BCOUIsY0FBUXlCLFNBQVIsR0FBb0JJLFFBQVFDLE1BQVIsQ0FBcEI7QUFDQTtBQUNBOztBQUVEOUIsYUFBUTBCLFlBQVIsQ0FBcUJJLE1BQXJCLEVBQTZCRCxRQUFRQyxNQUFSLENBQTdCO0FBQ0E7O0FBRUQsV0FBTzlCLE9BQVA7QUFDQTs7QUFFRDs7OztBQXZJNEI7QUFBQTtBQUFBLCtCQTBJVEEsT0ExSVMsRUEwSUFDLFNBMUlBLEVBMElXOEIsZUExSVgsRUEySTVCO0FBQ0MsUUFBRy9CLFdBQVcsSUFBWCxJQUFtQixPQUFPQSxPQUFQLElBQWtCLFdBQXhDLEVBQXFEO0FBQ3BELFdBQU0sSUFBSVAsMEJBQUosRUFBTjtBQUNBOztBQUVEc0Msc0JBQWtCQSxtQkFBbUIxQixTQUFyQzs7QUFFQUwsWUFBUVUsU0FBUixDQUFrQnNCLE1BQWxCLENBQXlCL0IsU0FBekI7O0FBRUEsUUFBRzhCLGVBQUgsRUFBb0I7QUFDbkIvQixhQUFRVSxTQUFSLENBQWtCc0IsTUFBbEIsQ0FBeUJELGVBQXpCO0FBQ0E7QUFDRDs7QUFFRDs7OztBQXpKNEI7QUFBQTtBQUFBLHdCQTRKaEIvQixPQTVKZ0IsRUE0SlBhLFFBNUpPLEVBNko1QjtBQUNDLFdBQU9DLGFBQWFkLE9BQWIsRUFBc0JhLFFBQXRCLENBQVA7QUFDQTtBQS9KMkI7O0FBQUE7QUFBQTs7QUFrSzdCOzs7OztBQUdBLFVBQVNDLFlBQVQsQ0FBc0JtQixNQUF0QixFQUE4QnBCLFFBQTlCLEVBQXdDO0FBQ3ZDLE1BQUliLFVBQVVpQyxPQUFPQyxnQkFBUCxDQUF3QnJCLFFBQXhCLENBQWQ7O0FBRUEsTUFBR2IsUUFBUW1DLE1BQVIsSUFBa0IsQ0FBckIsRUFBd0I7QUFDdkIsVUFBTyxJQUFQO0FBQ0E7O0FBRUQsU0FBUW5DLFFBQVFtQyxNQUFSLEdBQWlCLENBQWxCLEdBQXVCbkMsT0FBdkIsR0FBaUNBLFFBQVEsQ0FBUixDQUF4QztBQUNBOztBQTdLNEIsS0ErS3ZCb0MsS0EvS3VCO0FBQUE7QUFBQTtBQUFBOztBQUFBO0FBQUE7O0FBaUw1Qjs7O0FBakw0QiwwQkFvTGQzQixJQXBMYyxFQW9MUjRCLFFBcExRLEVBb0xFO0FBQzdCLFFBQUksT0FBT0EsUUFBUCxLQUFvQixVQUF4QixFQUFvQztBQUNuQyxXQUFNLElBQUlDLHdCQUFKLEVBQU47QUFDQTs7QUFFREMsV0FBTzlCLElBQVAsSUFBZTRCLFFBQWY7QUFDQTs7QUFFRDs7OztBQTVMNEI7QUFBQTtBQUFBLDJCQStMYjVCLElBL0xhLEVBK0xQK0IsSUEvTE8sRUErTEQ7QUFDMUJBLFdBQU9BLFFBQVEsSUFBZjs7QUFFQSxRQUFHLE9BQU9ELE9BQU85QixJQUFQLENBQVAsS0FBd0IsVUFBM0IsRUFBdUM7QUFDdEMsV0FBTSxJQUFJZ0MscUJBQUosRUFBTjtBQUNBOztBQUVELFFBQUdELFFBQVEsSUFBUixJQUFnQkEsZ0JBQWdCRSxLQUFuQyxFQUEwQztBQUFBOztBQUV6QyxZQUFPLG1CQUFPakMsSUFBUCxvQ0FBZ0IrQixJQUFoQixFQUFQO0FBQ0E7O0FBRURELFdBQU85QixJQUFQO0FBQ0E7QUE1TTJCOztBQUFBO0FBQUE7O0FBQUEsS0ErTXZCa0MsTUEvTXVCO0FBQUE7QUFBQTtBQUFBOztBQUFBO0FBQUE7O0FBaU41Qjs7O0FBak40QiwwQkFvTmRDLFVBcE5jLEVBb05GQyxNQXBORSxFQW9OTztBQUNsQyxRQUFJQyxXQUFXLEVBQWY7QUFDRyxRQUFJQyxJQUFKOztBQUVBLFNBQUtBLElBQUwsSUFBYUgsVUFBYixFQUF5QjtBQUNyQixTQUFJSSxPQUFPQyxTQUFQLENBQWlCQyxjQUFqQixDQUFnQ25DLElBQWhDLENBQXFDNkIsVUFBckMsRUFBaURHLElBQWpELENBQUosRUFBNEQ7QUFDeERELGVBQVNDLElBQVQsSUFBaUJILFdBQVdHLElBQVgsQ0FBakI7QUFDSDtBQUNKOztBQUVELFNBQUtBLElBQUwsSUFBYUYsTUFBYixFQUFxQjtBQUNqQixTQUFJRyxPQUFPQyxTQUFQLENBQWlCQyxjQUFqQixDQUFnQ25DLElBQWhDLENBQXFDOEIsTUFBckMsRUFBNkNFLElBQTdDLENBQUosRUFBd0Q7QUFDcERELGVBQVNDLElBQVQsSUFBaUJGLE9BQU9FLElBQVAsQ0FBakI7QUFDSDtBQUNKOztBQUVELFdBQU9ELFFBQVA7QUFDSDs7QUFFRDs7OztBQXZPNEI7QUFBQTtBQUFBLDRCQTBPWkssTUExT1ksRUEwT0pDLE9BMU9JLEVBME9LO0FBQ2hDLFFBQUdBLFFBQVFDLFdBQVIsS0FBd0JYLEtBQTNCLEVBQWtDOztBQUVsQyxTQUFJLElBQUlZLElBQUksQ0FBWixFQUFlQSxLQUFLRixRQUFRakIsTUFBNUIsRUFBb0NtQixHQUFwQyxFQUF5QztBQUN4QyxTQUFHSCxVQUFVQyxRQUFRRSxDQUFSLENBQWIsRUFBeUIsT0FBTyxJQUFQO0FBQ3pCOztBQUVELFdBQU8sS0FBUDtBQUNBOztBQUVEOzs7O0FBcFA0QjtBQUFBO0FBQUEsK0JBdVBUQyxNQXZQUyxFQXVQRDtBQUMxQixTQUFJLElBQUlSLElBQVIsSUFBZ0JRLE1BQWhCLEVBQXdCO0FBQ3ZCLFlBQU8sS0FBUDtBQUNBOztBQUVELFdBQU8sSUFBUDtBQUNBO0FBN1AyQjtBQUFBO0FBQUEsa0NBK1BOQSxNQS9QTSxFQStQRUgsT0EvUEYsRUFnUTVCO0FBQ0ksUUFBSUUsQ0FBSjs7QUFFQSxTQUFLQSxJQUFJLENBQVQsRUFBWUEsSUFBSUYsUUFBUWpCLE1BQXhCLEVBQWdDbUIsR0FBaEMsRUFBcUM7QUFDakMsU0FBSSxPQUFPQyxNQUFQLElBQWlCLFFBQWpCLElBQTZCSCxRQUFRRSxDQUFSLEVBQVdELFdBQVgsQ0FBdUI1QyxJQUF2QixLQUFnQzhDLE1BQWpFLEVBQXlFO0FBQ3hFLGFBQU8sSUFBUDtBQUNBOztBQUVELFNBQUlILFFBQVFFLENBQVIsTUFBZUMsTUFBbkIsRUFBMkI7QUFDdkIsYUFBTyxJQUFQO0FBQ0g7QUFDSjs7QUFFRCxXQUFPLEtBQVA7QUFDSDs7QUFFRDs7OztBQWhSNEI7QUFBQTtBQUFBLDZCQW1SWHpELE1BblJXLEVBb1I1QjtBQUNDLFdBQU9BLE9BQU9DLE9BQVAsQ0FBZSxpQkFBZixFQUFrQyxPQUFsQyxFQUEyQ3lELFdBQTNDLEVBQVA7QUFDQTs7QUFFRDs7OztBQXhSNEI7QUFBQTtBQUFBLDRCQTJSWkQsTUEzUlksRUE0UjVCO0FBQ0MsV0FBTyxRQUFPQSxNQUFQLHlDQUFPQSxNQUFQLE1BQWlCLFFBQXhCO0FBQ0E7O0FBRUQ7Ozs7QUFoUzRCO0FBQUE7QUFBQSxnQ0FtU1I5QyxJQW5TUSxFQW1TRmdELEtBblNFLEVBbVNLQyxJQW5TTCxFQW9TNUI7QUFDQyxRQUFJRCxNQUFNSixXQUFOLENBQWtCNUMsSUFBbEIsSUFBMEIsT0FBOUIsRUFBdUM7QUFDdENnRCxhQUFRRSxLQUFLQyxTQUFMLENBQWVILEtBQWYsQ0FBUjtBQUNBOztBQUVFLFFBQUlJLGdCQUFKOztBQUVBLFFBQUlILElBQUosRUFBVTtBQUNOLFNBQUlJLE9BQU8sSUFBSUMsSUFBSixFQUFYO0FBQ0FELFVBQUtFLE9BQUwsQ0FBYUYsS0FBS0csT0FBTCxLQUFrQlAsT0FBTyxFQUFQLEdBQVksRUFBWixHQUFpQixFQUFqQixHQUFzQixJQUFyRDtBQUNBRyxlQUFVLGVBQWVDLEtBQUtJLFdBQUwsRUFBekI7QUFDSCxLQUpELE1BSU87QUFDSEwsZUFBVSxFQUFWO0FBQ0g7O0FBRUQ3QyxhQUFTbUQsTUFBVCxHQUFrQjFELE9BQU8sR0FBUCxHQUFhZ0QsS0FBYixHQUFxQkksT0FBckIsR0FBK0IsVUFBakQ7QUFDSDs7QUFFRDs7OztBQXRUNEI7QUFBQTtBQUFBLDZCQXlUWHBELElBelRXLEVBMFQ1QjtBQUNJLFFBQUlPLFNBQVNtRCxNQUFULENBQWdCaEMsTUFBaEIsR0FBeUIsQ0FBN0IsRUFBZ0M7QUFDNUIsU0FBSWlDLFVBQVVwRCxTQUFTbUQsTUFBVCxDQUFnQkUsT0FBaEIsQ0FBd0I1RCxPQUFPLEdBQS9CLENBQWQ7O0FBRUEsU0FBSTJELFdBQVcsQ0FBQyxDQUFoQixFQUFtQjtBQUNmQSxnQkFBVUEsVUFBVTNELEtBQUswQixNQUFmLEdBQXdCLENBQWxDO0FBQ0EsVUFBSW1DLFFBQVF0RCxTQUFTbUQsTUFBVCxDQUFnQkUsT0FBaEIsQ0FBd0IsR0FBeEIsRUFBNkJELE9BQTdCLENBQVo7O0FBRUEsVUFBSUUsU0FBUyxDQUFDLENBQWQsRUFBaUI7QUFDYkEsZUFBUXRELFNBQVNtRCxNQUFULENBQWdCaEMsTUFBeEI7QUFDSDs7QUFFRCxhQUFPd0IsS0FBS1ksS0FBTCxDQUFXQyxTQUFTeEQsU0FBU21ELE1BQVQsQ0FBZ0JNLFNBQWhCLENBQTBCTCxPQUExQixFQUFtQ0UsS0FBbkMsQ0FBVCxDQUFYLENBQVA7QUFDSDtBQUNKOztBQUVELFdBQU8sRUFBUDtBQUNIOztBQUVEOzs7O0FBN1U0QjtBQUFBO0FBQUEsNkJBZ1ZYbkMsTUFoVlcsRUFpVjVCO0FBQ0MsUUFBSXJDLFNBQVMsRUFBYjtBQUNBLFFBQUk0RSxXQUFXLGdFQUFmOztBQUVBLFNBQUssSUFBSXBCLElBQUksQ0FBYixFQUFnQkEsSUFBSW5CLE1BQXBCLEVBQTRCbUIsR0FBNUIsRUFBaUM7QUFDN0J4RCxlQUFVNEUsU0FBU0MsTUFBVCxDQUFnQkMsS0FBS0MsS0FBTCxDQUFXRCxLQUFLRSxNQUFMLEtBQWdCSixTQUFTdkMsTUFBcEMsQ0FBaEIsQ0FBVjtBQUNIOztBQUVELFdBQU9yQyxNQUFQO0FBQ0E7QUExVjJCOztBQUFBO0FBQUE7O0FBQUEsS0E2VnZCaUYsdUJBN1Z1QjtBQUFBOztBQStWNUIscUNBQ0E7QUFBQTs7QUFBQTs7QUFFSXJGLFdBQVFDLEtBQVI7QUFGSjtBQUdJOztBQW5Xd0I7QUFBQSxHQTZWU0MsS0E3VlQ7O0FBc1c3QixLQUFJb0YsYUFBWSxFQUFoQjs7QUF0VzZCLEtBd1d2QkMsU0F4V3VCO0FBQUE7QUFBQTtBQUFBOztBQUFBO0FBQUE7O0FBMFc1Qjs7O0FBMVc0Qix3QkE2V3ZCQyxHQTdXdUIsRUE2V2xCQyxRQTdXa0IsRUE4VzVCO0FBQ0MsUUFBSSxPQUFPRCxHQUFQLElBQWMsUUFBZCxJQUEwQixPQUFPQyxRQUFQLElBQW1CLFVBQWpELEVBQTZEO0FBQzVELFdBQU0sSUFBSTFGLDBCQUFKLEVBQU47QUFDQTs7QUFFRCxRQUFJLE9BQU8sS0FBS3lGLEdBQUwsQ0FBUCxJQUFvQixXQUF4QixFQUFxQztBQUNwQyxXQUFNLElBQUlILHVCQUFKLEVBQU47QUFDQTs7QUFFRCxTQUFLRyxHQUFMLElBQVlDLFNBQVNDLElBQVQsQ0FBY0QsUUFBZCxFQUF3QixJQUF4QixDQUFaO0FBQ0E7O0FBRUQ7Ozs7QUExWDRCO0FBQUE7QUFBQSwrQkE2WGhCRCxHQTdYZ0IsRUE2WFhHLFFBN1hXLEVBOFg1QjtBQUNDLFFBQUcsT0FBT0gsR0FBUCxJQUFjLFFBQWQsSUFBMEIsUUFBT0csUUFBUCx5Q0FBT0EsUUFBUCxNQUFtQixRQUFoRCxFQUEwRDtBQUN6RCxXQUFNLElBQUk1RiwwQkFBSixFQUFOO0FBQ0E7O0FBRUR1RixlQUFVRSxHQUFWLElBQWlCRyxRQUFqQjtBQUNBOztBQUVEOzs7O0FBdFk0QjtBQUFBO0FBQUEsK0JBeVloQkgsR0F6WWdCLEVBMFk1QjtBQUNDLFFBQUcsT0FBT0EsR0FBUCxJQUFjLFFBQWpCLEVBQTJCO0FBQzFCLFdBQU0sSUFBSXpGLDBCQUFKLEVBQU47QUFDQTs7QUFFRCxRQUFHLFFBQU95RixHQUFQLHlDQUFPQSxHQUFQLE1BQWMsUUFBakIsRUFBMkI7QUFDMUIsWUFBT0YsV0FBVUUsSUFBSTdCLFdBQUosQ0FBZ0I1QyxJQUExQixLQUFtQyxJQUExQztBQUNBOztBQUVELFdBQU91RSxXQUFVRSxHQUFWLEtBQWtCLElBQXpCO0FBQ0E7O0FBRUQ7Ozs7QUF0WjRCO0FBQUE7QUFBQSxpQ0F5WmRHLFFBelpjLEVBMFo1QjtBQUNDLFFBQUcsUUFBT0EsUUFBUCx5Q0FBT0EsUUFBUCxNQUFtQixRQUF0QixFQUFnQztBQUMvQixZQUFRLE9BQU9MLFdBQVVLLFNBQVNoQyxXQUFULENBQXFCNUMsSUFBL0IsQ0FBUCxLQUFnRCxXQUF4RDtBQUNBOztBQUdELFdBQVE0RSxZQUFZTCxVQUFwQjtBQUNBOztBQUVEOzs7O0FBbmE0QjtBQUFBO0FBQUEsd0JBc2F2QnpCLE1BdGF1QixFQXVhNUI7QUFDQyxRQUFJOEIsV0FBVyxFQUFmOztBQUVBLFFBQUksS0FBS0MsYUFBTCxDQUFtQi9CLE1BQW5CLENBQUosRUFBZ0M7QUFDL0IsWUFBTyxLQUFLZ0MsV0FBTCxDQUFpQmhDLE1BQWpCLENBQVA7QUFDQTs7QUFFRCxRQUFJLFFBQU9BLE1BQVAseUNBQU9BLE1BQVAsTUFBaUIsUUFBckIsRUFBK0I7QUFDOUI4QixnQkFBVzlCLE1BQVg7QUFDQSxLQUZELE1BRU8sSUFBRyxPQUFPQSxNQUFQLElBQWlCLFFBQWpCLElBQTZCLEtBQUtMLGNBQUwsQ0FBb0JLLE1BQXBCLENBQWhDLEVBQTZEO0FBQ25FOEIsZ0JBQVcsSUFBSSxLQUFLOUIsTUFBTCxDQUFKLEVBQVg7QUFDQSxLQUZNLE1BRUE7QUFDTixXQUFNLElBQUl3Qix1QkFBSixFQUFOO0FBQ0E7O0FBRUQsU0FBS1MsV0FBTCxDQUFpQmpDLE1BQWpCLEVBQXlCOEIsUUFBekI7O0FBRUEsV0FBT0EsUUFBUDtBQUNBOztBQUVEOzs7O0FBM2I0QjtBQUFBO0FBQUEsK0JBK2I1QjtBQUNDLFdBQU9MLFVBQVA7QUFDQTtBQWpjMkI7O0FBQUE7QUFBQTs7QUFBQSxLQW9jdkJTLG1CQXBjdUI7QUFBQTs7QUFzYzVCLGlDQUNBO0FBQUE7O0FBQUE7O0FBRUkvRixXQUFRQyxLQUFSO0FBRko7QUFJSTs7QUEzY3dCO0FBQUEsR0FvY0tDLEtBcGNMOztBQUFBLEtBOGN2QjhGLHVCQTljdUI7QUFBQTs7QUFnZDVCLHFDQUNBO0FBQUE7O0FBQUE7O0FBRUloRyxXQUFRQyxLQUFSO0FBRko7QUFHSTs7QUFwZHdCO0FBQUEsR0E4Y1NDLEtBOWNUOztBQUFBLEtBdWR2QitGLHVCQXZkdUI7QUFBQTs7QUF5ZDVCLHFDQUNBO0FBQUE7O0FBQUE7O0FBRUlqRyxXQUFRQyxLQUFSO0FBRko7QUFHSTs7QUE3ZHdCO0FBQUEsR0F1ZFNDLEtBdmRUOztBQUFBLEtBZ2V2QmdHLCtCQWhldUI7QUFBQTs7QUFrZTVCLDZDQUNBO0FBQUE7O0FBQUE7O0FBRUlsRyxXQUFRQyxLQUFSO0FBRko7QUFHSTs7QUF0ZXdCO0FBQUEsR0FnZWlCQyxLQWhlakI7O0FBQUEsS0F5ZXZCaUcsZ0JBemV1QjtBQUFBOztBQUFBO0FBQUE7O0FBQUE7QUFBQTs7QUFBQTtBQUFBOztBQTJlNUI7OztBQTNlNEIsK0JBOGVUO0FBQ2xCQyxXQUFPQyxPQUFQLEdBQWlCLFVBQVNDLE9BQVQsRUFBa0JDLE1BQWxCLEVBQTBCQyxNQUExQixFQUFrQ0MsS0FBbEMsRUFBeUN4RyxLQUF6QyxFQUFnRDs7QUFFaEUsU0FBSUEsaUJBQWlCRiwwQkFBckIsRUFBaUQ7QUFDaEQ7QUFDQSxNQUZELE1BRU8sSUFBSUUsaUJBQWlCb0YsdUJBQXJCLEVBQThDO0FBQ3BEO0FBQ0EsTUFGTSxNQUVBLElBQUlwRixpQkFBaUIrRix1QkFBckIsRUFBOEM7QUFDcEQ7QUFDQSxNQUZNLE1BRUEsSUFBSS9GLGlCQUFpQjhGLG1CQUFyQixFQUEwQztBQUNoRDtBQUNBLE1BRk0sTUFFQSxJQUFJOUYsaUJBQWlCaUcsK0JBQXJCLEVBQXNEO0FBQzVEO0FBQ0EsTUFGTSxNQUVBLElBQUlqRyxpQkFBaUJnRyx1QkFBckIsRUFBOEM7QUFDcEQ7QUFDQSxNQUZNLE1BRUE7QUFDTixhQUFPLEtBQVA7QUFDQTs7QUFFRCxZQUFPLElBQVA7QUFDQSxLQW5CRDtBQW9CQTtBQW5nQjJCOztBQUFBO0FBQUEsR0F5ZUUvRixLQXplRjs7QUFzZ0I3Qjs7Ozs7QUFHQSxLQUFJd0csb0JBQW9CO0FBQ3ZCcEcsV0FBUyxTQURjO0FBRXZCd0MsUUFBTSxFQUZpQjtBQUd2QjZELFNBQU8sVUFIZ0I7QUFJdkJDLFNBQU8sRUFKZ0I7QUFLdkJDLFVBQVE7QUFMZSxFQUF4Qjs7QUFTQTs7OztBQWxoQjZCLEtBcWhCdkJDLE1BcmhCdUI7QUF1aEI1QixrQkFBWUMsU0FBWixFQUNBO0FBQUE7O0FBQ0MsUUFBS0MsS0FBTCxDQUFXTixpQkFBWDtBQUNBOztBQTFoQjJCO0FBQUE7QUFBQSx5QkE0aEJ0Qk8sUUE1aEJzQixFQTZoQjVCO0FBQ0MsUUFBRyxRQUFPQSxRQUFQLHlDQUFPQSxRQUFQLE1BQW1CLFFBQXRCLEVBQWdDO0FBQy9CLFdBQU0sSUFBSWxILDBCQUFKLEVBQU47QUFDQTs7QUFFRCxTQUFLa0gsUUFBTCxHQUFnQmhFLE9BQU9pRSxNQUFQLENBQWNSLGlCQUFkLEVBQWlDTyxRQUFqQyxDQUFoQjs7QUFFQSxTQUFLRSxVQUFMLENBQWdCLEtBQUtGLFFBQUwsQ0FBYzNHLE9BQTlCO0FBQ0E7QUFyaUIyQjtBQUFBO0FBQUEsOEJBdWlCakJhLFFBdmlCaUIsRUF3aUI1QjtBQUNDLFNBQUtpRyxPQUFMLEdBQWVqSCxJQUFJRyxPQUFKLENBQVlhLFFBQVosQ0FBZjs7QUFFQWhCLFFBQUlPLFFBQUosQ0FBYSxLQUFLMEcsT0FBbEIsRUFBMkIsS0FBS0gsUUFBTCxDQUFjTixLQUF6QztBQUNBO0FBNWlCMkI7O0FBQUE7QUFBQTs7QUEraUI3Qjs7Ozs7QUFHQSxLQUFJVSxvQkFBb0I7QUFDdkIvRyxXQUFTLFdBRGM7QUFFdkJxRyxTQUFPLEVBRmdCO0FBR3ZCVyxjQUFZLEVBSFc7QUFJdkJDLG9CQUFrQixpQkFKSztBQUt2QkMseUJBQXVCLGdCQUxBO0FBTXZCWixTQUFPLE9BTmdCO0FBT3ZCQyxVQUFRLE9BUGU7QUFRdkJZLGNBQVksQ0FBQyxNQUFELEVBQVMsT0FBVCxFQUFrQixjQUFsQixFQUFrQyxPQUFsQyxDQVJXO0FBU3ZCQyxPQUFLO0FBVGtCLEVBQXhCOztBQVlBOzs7QUFHQSxLQUFJQyxvQkFBSjs7QUFFQTs7OztBQW5rQjZCLEtBc2tCdkJDLFFBdGtCdUI7QUF3a0I1Qjs7O0FBR0Esb0JBQVliLFNBQVosRUFDQTtBQUFBOztBQUNDWSxpQkFBY1osU0FBZDtBQUNBOztBQUVEOzs7OztBQWhsQjRCO0FBQUE7QUFBQSx5QkFtbEJ0QkUsUUFubEJzQixFQW9sQjVCO0FBQ0MzRixhQUFTdUcsZ0JBQVQsQ0FBMEIsa0JBQTFCLEVBQThDLFlBQVc7O0FBRXpELFNBQUksUUFBT1osUUFBUCx5Q0FBT0EsUUFBUCxNQUFtQixRQUF2QixFQUFpQztBQUNoQyxZQUFNLElBQUlsSCwwQkFBSixFQUFOO0FBQ0E7O0FBRUQsVUFBS2tILFFBQUwsR0FBZ0JoRSxPQUFPaUUsTUFBUCxDQUFjRyxpQkFBZCxFQUFpQ0osUUFBakMsQ0FBaEI7O0FBRUEsVUFBS0UsVUFBTCxDQUFnQixLQUFLRixRQUFMLENBQWMzRyxPQUE5Qjs7QUFFQSxVQUFLd0gsV0FBTDs7QUFFQSxVQUFLQyxZQUFMO0FBRUMsS0FkNkMsQ0FjNUNyQyxJQWQ0QyxDQWN2QyxJQWR1QyxDQUE5QztBQWVBOztBQUVEOzs7O0FBdG1CNEI7QUFBQTtBQUFBLGtDQTBtQjVCO0FBQ0MsUUFBSXNDLFVBQVUsS0FBS0MsV0FBTCxFQUFkOztBQUVBRCxZQUFRRSxJQUFSLENBQWEsVUFBU0MsS0FBVCxFQUFnQjtBQUM1QixVQUFLQyxZQUFMLENBQWtCRCxLQUFsQjtBQUNBLEtBRlksQ0FFWHpDLElBRlcsQ0FFTixJQUZNLENBQWIsRUFFYzJDLEtBRmQsQ0FFb0IsVUFBU3BJLEtBQVQsRUFBZ0IsQ0FFbkMsQ0FKRDtBQUtBOztBQUVEOzs7O0FBcG5CNEI7QUFBQTtBQUFBLDhCQXVuQmpCa0IsUUF2bkJpQixFQXduQjVCO0FBQ0MsU0FBS2lHLE9BQUwsR0FBZWpILElBQUlHLE9BQUosQ0FBWWEsUUFBWixDQUFmOztBQUVBLFFBQUksS0FBS2lHLE9BQVQsRUFBa0I7QUFDakJqSCxTQUFJTyxRQUFKLENBQWEsS0FBSzBHLE9BQWxCLEVBQTJCLEtBQUtILFFBQUwsQ0FBY04sS0FBekM7QUFDQTtBQUNEOztBQUVEOzs7O0FBaG9CNEI7QUFBQTtBQUFBLGdDQW1vQmZ3QixLQW5vQmUsRUFvb0I1QjtBQUNDLFFBQUksQ0FBRW5GLE1BQU1zRixPQUFOLENBQWNILEtBQWQsQ0FBRixJQUEyQkEsTUFBTTFGLE1BQU4sSUFBZ0IsQ0FBaEIsSUFBcUIsT0FBTzBGLE1BQU0sQ0FBTixDQUFQLElBQW1CLFFBQXZFLEVBQWtGO0FBQ2pGLFdBQU0sSUFBSXBJLDBCQUFKLEVBQU47QUFDQTs7QUFFRCxRQUFJd0ksV0FBVyxLQUFLQyxhQUFMLENBQW1CTCxLQUFuQixFQUEwQixLQUFLbEIsUUFBTCxDQUFjSyxVQUF4QyxFQUFvRCxLQUFwRCxDQUFmOztBQUVBLFNBQUtGLE9BQUwsQ0FBYXJGLFNBQWIsR0FBeUJ3RyxRQUF6Qjs7QUFFQSxXQUFPSixLQUFQO0FBQ0E7O0FBRUQ7Ozs7QUFocEI0QjtBQUFBO0FBQUEsaUNBb3BCNUI7QUFDQyxXQUFPLEtBQUtNLFNBQUwsRUFBUDtBQUNBOztBQUVEOzs7O0FBeHBCNEI7QUFBQTtBQUFBLHFDQTJwQlZDLFVBM3BCVSxFQTRwQjVCO0FBQ0MsV0FBTyxLQUFLRCxTQUFMLENBQWVDLFVBQWYsQ0FBUDtBQUNBO0FBOXBCMkI7QUFBQTtBQUFBLDZCQWdxQmxCQSxVQWhxQmtCLEVBaXFCNUI7QUFDQ0EsaUJBQWFBLGNBQWMsSUFBM0I7O0FBRUEsV0FBTyxJQUFJQyxPQUFKLENBQVksVUFBU0MsT0FBVCxFQUFrQkMsTUFBbEIsRUFBMEI7O0FBRTVDLFNBQUlDLE1BQU0sSUFBSUMsY0FBSixNQUFzQixJQUFJQyxhQUFKLENBQWtCLG1CQUFsQixDQUFoQzs7QUFFQSxTQUFHTixVQUFILEVBQWU7QUFDZEksVUFBSUcsSUFBSixDQUFTLEtBQVQsRUFBZ0IsS0FBS2hDLFFBQUwsQ0FBY1MsR0FBZCxHQUFvQixRQUFwQixHQUErQmdCLFVBQS9DLEVBQTJELElBQTNEO0FBQ0EsTUFGRCxNQUVPO0FBQ05JLFVBQUlHLElBQUosQ0FBUyxLQUFULEVBQWdCLEtBQUtoQyxRQUFMLENBQWNTLEdBQTlCLEVBQW1DLElBQW5DO0FBQ0E7O0FBRURvQixTQUFJSSxnQkFBSixDQUFxQixjQUFyQixFQUFxQyxrQkFBckM7O0FBRUEsU0FBSXZELFdBQVcsSUFBZjs7QUFFQW1ELFNBQUlLLGtCQUFKLEdBQXlCLFlBQVc7QUFDbkMsVUFBSSxLQUFLQyxVQUFMLElBQW1CLENBQXZCLEVBQTBCO0FBQ3pCLFdBQUksS0FBS0MsTUFBTCxJQUFlLEdBQW5CLEVBQXdCO0FBQ3ZCMUQsaUJBQVMyRCxZQUFULEdBQXlCLEtBQUtDLFlBQUwsSUFBcUIsRUFBdEIsR0FBNEIsRUFBNUIsR0FBaUN0RixLQUFLWSxLQUFMLENBQVcsS0FBSzBFLFlBQWhCLENBQXpEOztBQUVBLFlBQUc1RCxTQUFTMkQsWUFBVCxDQUFzQjdHLE1BQXRCLEtBQWlDLENBQXBDLEVBQXVDO0FBQ3RDb0csZ0JBQU8sMEJBQVA7QUFDQTs7QUFFRCxhQUFLLElBQUlqRixJQUFJLENBQWIsRUFBZ0JBLElBQUkrQixTQUFTMkQsWUFBVCxDQUFzQjdHLE1BQTFDLEVBQWtEbUIsR0FBbEQsRUFBdUQ7QUFDdEQsYUFBSTRGLFVBQVU3RCxTQUFTMkQsWUFBVCxDQUFzQjFGLENBQXRCLENBQWQ7QUFDQStCLGtCQUFTOEQsV0FBVCxDQUFxQnBJLElBQXJCLENBQTBCLElBQTFCLEVBQWdDbUksT0FBaEM7QUFDQTs7QUFFRFosZ0JBQVFqRCxTQUFTMkQsWUFBakI7QUFDQSxRQWJELE1BYU87QUFDTlQsZUFBTyxLQUFLYSxVQUFaO0FBQ0E7QUFDRDtBQUNELE1BbkJEOztBQXFCQVosU0FBSXpDLE9BQUosR0FBYyxVQUFTcEcsS0FBVCxFQUFnQjtBQUM3QjRJLGFBQU81SSxLQUFQO0FBQ0EsTUFGRDs7QUFJQTZJLFNBQUlhLElBQUosQ0FBUyxJQUFUO0FBQ0EsS0F4Q2tCLENBd0NqQmpFLElBeENpQixDQXdDWixJQXhDWSxDQUFaLENBQVA7QUF5Q0E7O0FBRUQ7Ozs7QUEvc0I0QjtBQUFBO0FBQUEsaUNBa3RCZGtFLG9CQWx0QmMsRUFrdEJRckosU0FsdEJSLEVBa3RCbUJzSixPQWx0Qm5CLEVBbXRCNUI7QUFDQyxRQUFHRCxxQkFBcUJqRyxXQUFyQixDQUFpQzVDLElBQWpDLElBQXlDLE9BQTVDLEVBQXNEO0FBQ3JELFdBQU0sSUFBSWhCLDBCQUFKLEVBQU47QUFDQTs7QUFFRCxRQUFJK0osZ0JBQWdCLEVBQXBCOztBQUVBRix5QkFBcUI5SSxPQUFyQixDQUE2QixVQUFTMkcsVUFBVCxFQUFxQjtBQUNqRHFDLHNCQUFpQixLQUFLQyxZQUFMLENBQWtCdEMsVUFBbEIsRUFBOEJsSCxTQUE5QixFQUF5Q3NKLE9BQXpDLENBQWpCO0FBQ0EsS0FGNEIsQ0FFM0JuRSxJQUYyQixDQUV0QixJQUZzQixDQUE3Qjs7QUFJQSxXQUFPb0UsYUFBUDtBQUNBOztBQUVEOzs7O0FBanVCNEI7QUFBQTtBQUFBLGdDQW91QmZyQyxVQXB1QmUsRUFvdUJIbEgsU0FwdUJHLEVBb3VCUXNKLE9BcHVCUixFQXF1QjVCO0FBQ0MsUUFBSSxRQUFPcEMsVUFBUCx5Q0FBT0EsVUFBUCxNQUFxQixRQUFyQixJQUFpQyxPQUFPb0MsT0FBUCxJQUFrQixRQUF2RCxFQUFpRTtBQUNoRSxXQUFNLElBQUk5SiwwQkFBSixFQUFOO0FBQ0E7O0FBRURRLGdCQUFZQSxhQUFhLElBQXpCOztBQUVBLFFBQUlpSixVQUFVckosSUFBSXlCLGFBQUosQ0FBa0IsS0FBbEIsRUFBeUI7QUFDdEMrRSxZQUFPO0FBRCtCLEtBQXpCLENBQWQ7O0FBSUF4RyxRQUFJTyxRQUFKLENBQWE4SSxPQUFiLEVBQXNCakosU0FBdEI7O0FBRUEsUUFBSXlKLFVBQVU3SixJQUFJeUIsYUFBSixDQUFrQixLQUFsQixFQUF5QjtBQUN0QytFLFlBQU87QUFEK0IsS0FBekIsQ0FBZDs7QUFJQTZDLFlBQVF2SCxXQUFSLENBQW9CK0gsT0FBcEI7O0FBRUEsU0FBSyxJQUFJQyxTQUFULElBQXNCeEMsVUFBdEIsRUFBa0M7QUFDakMsU0FBSSxDQUFFeEUsT0FBT2lILFFBQVAsQ0FBZ0JELFNBQWhCLEVBQTJCLEtBQUtoRCxRQUFMLENBQWNRLFVBQXpDLENBQU4sRUFBNEQ7QUFDM0Q7QUFDQTs7QUFFRCxTQUFJMEMsT0FBTWhLLElBQUl5QixhQUFKLENBQWtCaUksT0FBbEIsQ0FBVjs7QUFFQSxTQUFJSSxhQUFhLE9BQWpCLEVBQTBCO0FBQ3pCLFVBQUlHLFFBQVFqSyxJQUFJeUIsYUFBSixDQUFrQixLQUFsQixFQUF5QjtBQUNwQ3lJLFlBQUs1QyxXQUFXd0MsU0FBWDtBQUQrQixPQUF6QixDQUFaO0FBR0FULGNBQVF2SCxXQUFSLENBQW9CbUksS0FBcEI7QUFDQSxNQUxELE1BS087QUFDTkQsV0FBSXBJLFNBQUosR0FBZ0IwRixXQUFXd0MsU0FBWCxLQUF5QixFQUF6QztBQUNBOztBQUVEOUosU0FBSU8sUUFBSixDQUFheUosSUFBYixFQUFrQixhQUFhbEgsT0FBT3FILFNBQVAsQ0FBaUJMLFNBQWpCLENBQS9CO0FBQ0FELGFBQVEvSCxXQUFSLENBQW9Ca0ksSUFBcEI7QUFDQTs7QUFFRCxRQUFJQSxNQUFNaEssSUFBSXlCLGFBQUosQ0FBa0IsS0FBbEIsRUFBeUI7QUFDbENMLFNBQUksZUFEOEI7QUFFbENvRixZQUFPO0FBRjJCLEtBQXpCLENBQVY7O0FBS0EsUUFBSTRELFlBQVlwSyxJQUFJeUIsYUFBSixDQUFrQixRQUFsQixFQUE0QjtBQUMzQ0wsU0FBSSxXQUR1QztBQUUzQ29GLFlBQU8sS0FBS00sUUFBTCxDQUFjTSxnQkFGc0I7QUFHM0NpRCxXQUFNLFFBSHFDO0FBSTNDQyxXQUFNO0FBSnFDLEtBQTVCLENBQWhCOztBQU9BLFFBQUlDLFdBQVd2SyxJQUFJeUIsYUFBSixDQUFrQixRQUFsQixFQUE0QjtBQUMxQ0wsU0FBSSxVQURzQztBQUUxQ29GLFlBQU8sS0FBS00sUUFBTCxDQUFjTyxxQkFGcUI7QUFHMUNnRCxXQUFNLFFBSG9DO0FBSTFDQyxXQUFNO0FBSm9DLEtBQTVCLENBQWY7O0FBT0FOLFFBQUlsSSxXQUFKLENBQWdCc0ksU0FBaEI7QUFDQUosUUFBSWxJLFdBQUosQ0FBZ0J5SSxRQUFoQjs7QUFFQVYsWUFBUS9ILFdBQVIsQ0FBb0JrSSxHQUFwQjs7QUFFQSxXQUFPWCxRQUFRbUIsU0FBZjtBQUNBOztBQUVEOzs7O0FBdnlCNEI7QUFBQTtBQUFBLCtCQTB5QmhCbkIsT0ExeUJnQixFQTJ5QjVCLENBRUM7QUFEQTs7O0FBR0Q7Ozs7QUEveUI0QjtBQUFBO0FBQUEsaUNBbXpCNUI7QUFDQyxRQUFHckosSUFBSUcsT0FBSixDQUFZLHFCQUFaLENBQUgsRUFBdUM7QUFDdEM7QUFDQTs7QUFFRCxRQUFJa0IseUlBS08sS0FBS3lGLFFBQUwsQ0FBY0wsS0FMckIsMkJBTVEsS0FBS0ssUUFBTCxDQUFjSixNQU50QixvMUNBQUo7O0FBbUVHMUcsUUFBSXlLLFFBQUosQ0FBYSxvQkFBYixFQUFtQ3BKLEdBQW5DO0FBQ0g7QUE1M0IyQjs7QUFBQTtBQUFBOztBQSszQjdCOzs7OztBQS8zQjZCLEtBazRCdkJxSixRQWw0QnVCO0FBQUE7QUFBQTs7QUF1NEI3Qjs7Ozs7QUFHQSxLQUFJQyxvQkFBb0I7QUFDdkJ4SyxXQUFTLG1CQURjO0FBRXZCcUcsU0FBTywwQkFGZ0I7QUFHdkJvRSxZQUFVLENBSGE7QUFJdkJDLGVBQWE7QUFKVSxFQUF4Qjs7QUFPQTs7O0FBR0EsS0FBSUMsb0JBQUo7O0FBRUE7OztBQUdBLEtBQUlDLG1CQUFKOztBQUVBOzs7O0FBMzVCNkIsS0E4NUJ2QkMsVUE5NUJ1QjtBQWc2QjVCOzs7QUFHQSxzQkFBWXBFLFNBQVosRUFBdUJ3QixRQUF2QixFQUNBO0FBQUE7O0FBQ0MwQyxpQkFBY2xFLFNBQWQ7QUFDQW1FLGdCQUFhM0MsUUFBYjtBQUNBOztBQUVEOzs7OztBQXo2QjRCO0FBQUE7QUFBQSx5QkE0NkJ0QnRCLFFBNTZCc0IsRUE2NkI1QjtBQUNDM0YsYUFBU3VHLGdCQUFULENBQTBCLGtCQUExQixFQUE4QyxZQUFXOztBQUV6RCxTQUFHLFFBQU9aLFFBQVAseUNBQU9BLFFBQVAsTUFBbUIsUUFBdEIsRUFBZ0M7QUFDL0IsWUFBTSxJQUFJbEgsMEJBQUosRUFBTjtBQUNBOztBQUVELFVBQUtrSCxRQUFMLEdBQWdCaEUsT0FBT2lFLE1BQVAsQ0FBYzRELGlCQUFkLEVBQWlDN0QsUUFBakMsQ0FBaEI7O0FBRUEsVUFBS21FLFVBQUwsR0FBa0IsS0FBS0MsbUJBQUwsQ0FBeUIsS0FBS3BFLFFBQUwsQ0FBYzhELFFBQXZDLEVBQWlELEtBQUs5RCxRQUFMLENBQWMrRCxXQUEvRCxDQUFsQjs7QUFFQSxVQUFLN0QsVUFBTCxDQUFnQixLQUFLRixRQUFMLENBQWMzRyxPQUE5QjtBQUNBLFVBQUtnTCxZQUFMLENBQWtCLEtBQUtDLEtBQXZCO0FBRUMsS0FiNkMsQ0FhNUM3RixJQWI0QyxDQWF2QyxJQWJ1QyxDQUE5QztBQWNBOztBQUVEOzs7O0FBOTdCNEI7QUFBQTtBQUFBLDhCQWk4QmpCdkUsUUFqOEJpQixFQWs4QjVCO0FBQ0MsU0FBS2lHLE9BQUwsR0FBZWpILElBQUlHLE9BQUosQ0FBWWEsUUFBWixDQUFmOztBQUVBaEIsUUFBSU8sUUFBSixDQUFhLEtBQUswRyxPQUFsQixFQUEyQixLQUFLSCxRQUFMLENBQWNOLEtBQXpDOztBQUVBLFNBQUs0RSxLQUFMLEdBQWEsS0FBS0MsV0FBTCxFQUFiO0FBQ0EsU0FBS0Msa0JBQUwsQ0FBd0IsS0FBS0YsS0FBN0I7QUFDQTs7QUFFRDs7OztBQTM4QjRCO0FBQUE7QUFBQSxnQ0E4OEJmQSxLQTk4QmUsRUErOEI1QjtBQUNDLFNBQUtuRSxPQUFMLENBQWFyRixTQUFiLEdBQXlCLEVBQXpCO0FBQ0EsU0FBS3FGLE9BQUwsQ0FBYW5GLFdBQWIsQ0FBeUJzSixLQUF6QjtBQUNBO0FBbDlCMkI7QUFBQTtBQUFBLHVDQW85QlJHLE9BcDlCUSxFQW85QkNDLFVBcDlCRCxFQXE5QjVCO0FBQ0NELGNBQVVFLFNBQVNGLE9BQVQsQ0FBVjtBQUNBQyxpQkFBYUMsU0FBU0QsVUFBVCxDQUFiOztBQUVBLFdBQU96RyxLQUFLMkcsSUFBTCxDQUFVRixhQUFhRCxPQUF2QixDQUFQO0FBQ0E7O0FBRUQ7Ozs7QUE1OUI0QjtBQUFBO0FBQUEsc0NBKzlCVEgsS0EvOUJTLEVBZytCNUI7QUFDQyxRQUFJNUYsV0FBVyxJQUFmOztBQUVBLFNBQUttRyxJQUFMLENBQVVDLFVBQVYsQ0FBcUIsQ0FBckIsRUFBd0JDLE9BQXhCLEdBQWtDLFVBQVNDLEtBQVQsRUFBZ0I7QUFDakRBLFdBQU1DLGNBQU47O0FBRUEsU0FBSUMsZ0JBQWdCeEcsU0FBU3lHLE9BQVQsR0FBaUIsQ0FBckM7O0FBRUEsU0FBR3pHLFNBQVMwRyxjQUFULENBQXdCRixhQUF4QixDQUFILEVBQTJDO0FBQzFDLFlBQU0sSUFBSWxHLHVCQUFKLEVBQU47QUFDQTs7QUFFRGlGLGdCQUFXb0IsaUJBQVgsQ0FBNkJILGFBQTdCLEVBQTRDakUsSUFBNUMsQ0FBaUQsVUFBU0ssUUFBVCxFQUFtQjtBQUNuRTJDLGlCQUFXOUMsWUFBWCxDQUF3QkcsUUFBeEI7QUFDQSxNQUZEOztBQUlBNUMsY0FBUzRHLFVBQVQsQ0FBb0JKLGFBQXBCO0FBQ0EsS0FkRDs7QUFnQkEsU0FBS0ssUUFBTCxDQUFjVCxVQUFkLENBQXlCLENBQXpCLEVBQTRCQyxPQUE1QixHQUFzQyxVQUFTQyxLQUFULEVBQWdCO0FBQ3JEQSxXQUFNQyxjQUFOOztBQUVBLFNBQUlDLGdCQUFnQnhHLFNBQVN5RyxPQUFULEdBQWlCLENBQXJDOztBQUVBLFNBQUd6RyxTQUFTMEcsY0FBVCxDQUF3QkYsYUFBeEIsQ0FBSCxFQUEyQztBQUMxQyxZQUFNLElBQUlsRyx1QkFBSixFQUFOO0FBQ0E7O0FBRURpRixnQkFBV29CLGlCQUFYLENBQTZCSCxhQUE3QixFQUE0Q2pFLElBQTVDLENBQWlELFVBQVNLLFFBQVQsRUFBbUI7QUFDbkUyQyxpQkFBVzlDLFlBQVgsQ0FBd0JHLFFBQXhCO0FBQ0EsTUFGRDs7QUFJQTVDLGNBQVM0RyxVQUFULENBQW9CSixhQUFwQjtBQUNBLEtBZEQ7O0FBZ0JBLFNBQUksSUFBSXZJLElBQUksQ0FBWixFQUFlQSxJQUFJLEtBQUs2SSxLQUFMLENBQVdoSyxNQUE5QixFQUFzQ21CLEdBQXRDLEVBQTJDO0FBQzFDLFVBQUs2SSxLQUFMLENBQVc3SSxDQUFYLEVBQWNtSSxVQUFkLENBQXlCLENBQXpCLEVBQTRCQyxPQUE1QixHQUFzQyxVQUFTQyxLQUFULEVBQWdCO0FBQ3JEQSxZQUFNQyxjQUFOOztBQUVBLFVBQUlDLGdCQUFnQixLQUFLTyxZQUFMLENBQWtCLGNBQWxCLENBQXBCOztBQUVBeEIsaUJBQVdvQixpQkFBWCxDQUE2QkgsYUFBN0IsRUFBNENqRSxJQUE1QyxDQUFpRCxVQUFTSyxRQUFULEVBQW1CO0FBQ25FMkMsa0JBQVc5QyxZQUFYLENBQXdCRyxRQUF4QjtBQUNBLE9BRkQ7O0FBSUE1QyxlQUFTNEcsVUFBVCxDQUFvQkosYUFBcEI7QUFDQSxNQVZEO0FBV0E7QUFDRDs7QUFFRDs7OztBQWxoQzRCO0FBQUE7QUFBQSw4QkFxaENqQnpELFVBcmhDaUIsRUFzaEM1QjtBQUNDLFNBQUswRCxPQUFMLEdBQWVSLFNBQVNsRCxVQUFULENBQWY7QUFDQSxTQUFLaUUsU0FBTCxDQUFlakUsVUFBZjtBQUNBOztBQUVEOzs7O0FBM2hDNEI7QUFBQTtBQUFBLGdDQStoQzVCO0FBQ0MsV0FBTyxLQUFLMEQsT0FBWjtBQUNBOztBQUVEOzs7O0FBbmlDNEI7QUFBQTtBQUFBLGlDQXVpQzVCO0FBQ0MsUUFBSVEsS0FBS3RMLFNBQVNNLGFBQVQsQ0FBdUIsSUFBdkIsQ0FBVDs7QUFFQSxTQUFLNkssS0FBTCxHQUFhLEtBQUtJLGVBQUwsRUFBYjtBQUNBLFNBQUtMLFFBQUwsR0FBZ0IsS0FBS00sb0JBQUwsRUFBaEI7QUFDQSxTQUFLaEIsSUFBTCxHQUFZLEtBQUtpQixnQkFBTCxFQUFaOztBQUVBSCxPQUFHck0sU0FBSCxHQUFlLFlBQWY7QUFDQXFNLE9BQUczSyxXQUFILENBQWUsS0FBS3VLLFFBQXBCOztBQUVBLFNBQUtDLEtBQUwsQ0FBVzNMLE9BQVgsQ0FBbUIsVUFBU2tNLElBQVQsRUFBZTtBQUNqQ0osUUFBRzNLLFdBQUgsQ0FBZStLLElBQWY7QUFDQSxLQUZEOztBQUlBSixPQUFHM0ssV0FBSCxDQUFlLEtBQUs2SixJQUFwQjs7QUFFQSxXQUFPYyxFQUFQO0FBQ0E7O0FBRUQ7Ozs7QUExakM0QjtBQUFBO0FBQUEscUNBOGpDNUI7QUFDQyxRQUFJSCxRQUFRLEVBQVo7O0FBRUEsU0FBSSxJQUFJN0ksSUFBSSxDQUFaLEVBQWVBLEtBQUssS0FBS3dILFVBQXpCLEVBQXFDeEgsR0FBckMsRUFBMEM7QUFDekMsU0FBSXFKLFdBQVczTCxTQUFTTSxhQUFULENBQXVCLElBQXZCLENBQWY7QUFDQSxTQUFJc0wsT0FBTzVMLFNBQVNNLGFBQVQsQ0FBdUIsR0FBdkIsQ0FBWDtBQUNBcUwsY0FBUzFNLFNBQVQsR0FBcUIsV0FBckI7QUFDQTJNLFVBQUszTSxTQUFMLEdBQWlCLFdBQWpCO0FBQ0EyTSxVQUFLbEwsWUFBTCxDQUFrQixNQUFsQixFQUEwQixXQUFVNEIsQ0FBcEM7QUFDQXNKLFVBQUtsTCxZQUFMLENBQWtCLGNBQWxCLEVBQWtDNEIsQ0FBbEM7QUFDQXNKLFVBQUtuTCxTQUFMLEdBQWlCNkIsQ0FBakI7QUFDQXFKLGNBQVNoTCxXQUFULENBQXFCaUwsSUFBckI7QUFDQVQsV0FBTVUsSUFBTixDQUFXRixRQUFYO0FBQ0E7O0FBRUQsV0FBT1IsS0FBUDtBQUNBOztBQUVEOzs7O0FBaGxDNEI7QUFBQTtBQUFBLDBDQW9sQzVCO0FBQ0MsUUFBSVcsS0FBSzlMLFNBQVNNLGFBQVQsQ0FBdUIsSUFBdkIsQ0FBVDtBQUNBLFFBQUlzTCxPQUFPNUwsU0FBU00sYUFBVCxDQUF1QixHQUF2QixDQUFYO0FBQ0EsUUFBSXlMLFFBQVEvTCxTQUFTTSxhQUFULENBQXVCLE1BQXZCLENBQVo7QUFDQSxRQUFJMEwsUUFBUWhNLFNBQVNNLGFBQVQsQ0FBdUIsTUFBdkIsQ0FBWjs7QUFHQXdMLE9BQUc3TSxTQUFILEdBQWUsV0FBZjtBQUNBMk0sU0FBSzNNLFNBQUwsR0FBaUIsV0FBakI7QUFDQStNLFVBQU0vTSxTQUFOLEdBQWtCLFNBQWxCOztBQUVBMk0sU0FBS2xMLFlBQUwsQ0FBa0IsTUFBbEIsRUFBMEIsRUFBMUI7QUFDQWtMLFNBQUtsTCxZQUFMLENBQWtCLFlBQWxCLEVBQWdDLFVBQWhDO0FBQ0FxTCxVQUFNckwsWUFBTixDQUFtQixhQUFuQixFQUFrQyxNQUFsQzs7QUFFQXFMLFVBQU10TCxTQUFOLEdBQWtCLFNBQWxCO0FBQ0F1TCxVQUFNdkwsU0FBTixHQUFrQixVQUFsQjs7QUFFQW1MLFNBQUtqTCxXQUFMLENBQWlCb0wsS0FBakI7QUFDQUgsU0FBS2pMLFdBQUwsQ0FBaUJxTCxLQUFqQjtBQUNBRixPQUFHbkwsV0FBSCxDQUFlaUwsSUFBZjs7QUFFQSxXQUFPRSxFQUFQO0FBQ0E7O0FBRUQ7Ozs7QUE3bUM0QjtBQUFBO0FBQUEsc0NBaW5DNUI7QUFDQyxRQUFJQSxLQUFLOUwsU0FBU00sYUFBVCxDQUF1QixJQUF2QixDQUFUO0FBQ0EsUUFBSXNMLE9BQU81TCxTQUFTTSxhQUFULENBQXVCLEdBQXZCLENBQVg7QUFDQSxRQUFJeUwsUUFBUS9MLFNBQVNNLGFBQVQsQ0FBdUIsTUFBdkIsQ0FBWjtBQUNBLFFBQUkwTCxRQUFRaE0sU0FBU00sYUFBVCxDQUF1QixNQUF2QixDQUFaOztBQUVBd0wsT0FBRzdNLFNBQUgsR0FBZSxXQUFmO0FBQ0EyTSxTQUFLM00sU0FBTCxHQUFpQixXQUFqQjtBQUNBK00sVUFBTS9NLFNBQU4sR0FBa0IsU0FBbEI7O0FBRUEyTSxTQUFLbEwsWUFBTCxDQUFrQixNQUFsQixFQUEwQixFQUExQjtBQUNBa0wsU0FBS2xMLFlBQUwsQ0FBa0IsWUFBbEIsRUFBZ0MsTUFBaEM7QUFDQXFMLFVBQU1yTCxZQUFOLENBQW1CLGFBQW5CLEVBQWtDLE1BQWxDOztBQUVBcUwsVUFBTXRMLFNBQU4sR0FBa0IsU0FBbEI7QUFDQXVMLFVBQU12TCxTQUFOLEdBQWtCLE1BQWxCOztBQUVBbUwsU0FBS2pMLFdBQUwsQ0FBaUJvTCxLQUFqQjtBQUNBSCxTQUFLakwsV0FBTCxDQUFpQnFMLEtBQWpCO0FBQ0FGLE9BQUduTCxXQUFILENBQWVpTCxJQUFmOztBQUVBLFdBQU9FLEVBQVA7QUFDQTs7QUFFRDs7OztBQXpvQzRCO0FBQUE7QUFBQSxrQ0E0b0NiMUUsVUE1b0NhLEVBNm9DNUI7QUFDQyxXQUFRQSxhQUFhLEtBQUswQyxVQUFsQixJQUFnQzFDLGNBQWMsQ0FBL0MsSUFBcUQ2RSxNQUFNN0UsVUFBTixDQUE1RDtBQUNBOztBQUVEOzs7O0FBanBDNEI7QUFBQTtBQUFBLDZCQW9wQ2xCQSxVQXBwQ2tCLEVBcXBDNUI7QUFDQ0EsaUJBQWNBLGNBQWM4RSxXQUFXLE1BQVgsQ0FBNUI7QUFDQXBILFdBQU9xSCxPQUFQLENBQWVDLFlBQWYsQ0FBNEIsRUFBNUIsRUFBZ0MsRUFBaEMsRUFBb0MsS0FBS0Msa0JBQUwsQ0FBd0J2SCxPQUFPd0gsUUFBUCxDQUFnQkMsSUFBeEMsRUFBOEMsTUFBOUMsRUFBc0RuRixVQUF0RCxDQUFwQztBQUNBOztBQUVEOzs7O0FBMXBDNEI7QUFBQTtBQUFBLDhCQThwQzVCO0FBQ0MsUUFBSW9GLE9BQU8sRUFBWDtBQUNBLFFBQUlDLFFBQVEzSCxPQUFPd0gsUUFBUCxDQUFnQkMsSUFBaEIsQ0FBcUJ4TixPQUFyQixDQUE2Qix5QkFBN0IsRUFBd0QsVUFBUzJOLENBQVQsRUFBWXhJLEdBQVosRUFBaUJ6QixLQUFqQixFQUF3QjtBQUMzRitKLFVBQUt0SSxHQUFMLElBQVl6QixLQUFaO0FBQ0EsS0FGVyxDQUFaOztBQUlBLFdBQU8rSixJQUFQO0FBQ0E7O0FBRUQ7Ozs7QUF2cUM0QjtBQUFBO0FBQUEsc0NBMHFDVHBHLEdBMXFDUyxFQTBxQ0p1RyxLQTFxQ0ksRUEwcUNHQyxRQTFxQ0gsRUEycUM1QjtBQUNJLFFBQUlDLG1CQUFtQixFQUF2QjtBQUNBLFFBQUlDLFlBQVkxRyxJQUFJN0csS0FBSixDQUFVLEdBQVYsQ0FBaEI7QUFDQSxRQUFJd04sVUFBVUQsVUFBVSxDQUFWLENBQWQ7QUFDQSxRQUFJRSxnQkFBZ0JGLFVBQVUsQ0FBVixDQUFwQjtBQUNBLFFBQUlHLE9BQU8sRUFBWDs7QUFFQSxRQUFJRCxhQUFKLEVBQW1CO0FBQ2ZGLGlCQUFZRSxjQUFjek4sS0FBZCxDQUFvQixHQUFwQixDQUFaO0FBQ0EsVUFBSyxJQUFJK0MsSUFBSSxDQUFiLEVBQWdCQSxJQUFJd0ssVUFBVTNMLE1BQTlCLEVBQXNDbUIsR0FBdEMsRUFBMEM7QUFDdEMsVUFBSXdLLFVBQVV4SyxDQUFWLEVBQWEvQyxLQUFiLENBQW1CLEdBQW5CLEVBQXdCLENBQXhCLEtBQThCb04sS0FBbEMsRUFBd0M7QUFDcENFLDJCQUFvQkksT0FBT0gsVUFBVXhLLENBQVYsQ0FBM0I7QUFDQTJLLGNBQU8sR0FBUDtBQUNIO0FBQ0o7QUFDSjs7QUFFRCxRQUFJQyxXQUFXRCxPQUFPLEVBQVAsR0FBWU4sS0FBWixHQUFvQixHQUFwQixHQUEwQkMsUUFBekM7QUFDQSxXQUFPRyxVQUFVLEdBQVYsR0FBZ0JGLGdCQUFoQixHQUFtQ0ssUUFBMUM7QUFDSDs7QUFFRDs7OztBQWhzQzRCO0FBQUE7QUFBQSwyQkFvc0M1QjtBQUNDLFNBQUtqQyxVQUFMLENBQWdCLENBQWhCO0FBQ0EsU0FBS0ksU0FBTCxDQUFlLENBQWY7QUFDQTtBQXZzQzJCOztBQUFBO0FBQUE7O0FBMHNDN0I7Ozs7O0FBR0EsS0FBSThCLG9CQUFvQjtBQUN2Qm5PLFdBQVMsT0FEYztBQUV2Qm9PLGVBQWEsTUFGVTtBQUd2QkMsaUJBQWUsRUFIUTtBQUl2QmhJLFNBQU8sRUFKZ0I7QUFLdkJDLFNBQU8sTUFMZ0I7QUFNdkJDLFVBQVEsTUFOZTtBQU92QitILGFBQVcsV0FQWTtBQVF2QkMsU0FBTyxJQVJnQjtBQVN2QkMsZUFBYTtBQVRVLEVBQXhCOztBQVlBOzs7QUFHQSxLQUFJQyxvQkFBSjs7QUFFQTs7OztBQTl0QzZCLEtBaXVDdkJDLElBanVDdUI7QUFtdUM1Qjs7OztBQUlBLGdCQUFZakksU0FBWixFQUNBO0FBQUE7O0FBQ0NnSSxpQkFBY2hJLFNBQWQ7O0FBRUEsUUFBS2tJLGNBQUwsR0FBc0IsS0FBS0Msb0JBQUwsRUFBdEI7QUFDQSxRQUFLQyxPQUFMLEdBQWVDLFdBQVcvTixJQUFYLENBQWdCLElBQWhCLENBQWY7QUFDQSxRQUFLOEcsS0FBTCxHQUFhLEVBQWI7QUFDQTs7QUFFRDs7Ozs7QUFodkM0QjtBQUFBO0FBQUEseUJBbXZDdEJsQixRQW52Q3NCLEVBb3ZDNUI7QUFDQyxRQUFHLFFBQU9BLFFBQVAseUNBQU9BLFFBQVAsTUFBbUIsUUFBdEIsRUFBZ0M7QUFDL0IsV0FBTSxJQUFJbEgsMEJBQUosRUFBTjtBQUNBOztBQUVELFNBQUtrSCxRQUFMLEdBQWdCaEUsT0FBT2lFLE1BQVAsQ0FBY3VILGlCQUFkLEVBQWlDeEgsUUFBakMsQ0FBaEI7O0FBRUEsU0FBS0UsVUFBTCxDQUFnQixLQUFLRixRQUFMLENBQWMzRyxPQUE5QjtBQUNBSCxRQUFJTyxRQUFKLENBQWEsS0FBS3VPLGNBQWxCLEVBQWtDLFFBQWxDO0FBQ0E5TyxRQUFJTyxRQUFKLENBQWEsS0FBS3VPLGNBQWxCLEVBQWtDLEtBQUtoSSxRQUFMLENBQWMwSCxhQUFoRDs7QUFFQSxTQUFLbEQsa0JBQUw7QUFDQSxTQUFLM0QsV0FBTDs7QUFFQSxTQUFLdUgsYUFBTCxDQUFtQixLQUFLcEksUUFBTCxDQUFjeUgsV0FBakM7QUFDQTtBQW53QzJCO0FBQUE7QUFBQSwyQkFxd0NwQlksSUFyd0NvQixFQXN3QzVCO0FBQ0MsU0FBS25ILEtBQUwsR0FBYWxGLE9BQU9zTSxTQUFQLENBQWlCLE1BQWpCLENBQWI7O0FBRUEsU0FBS3BILEtBQUwsQ0FBV2dGLElBQVgsQ0FBZ0JtQyxJQUFoQjs7QUFFQXJNLFdBQU91TSxZQUFQLENBQW9CLEtBQUt2SSxRQUFMLENBQWN5SCxXQUFsQyxFQUErQyxLQUFLdkcsS0FBcEQsRUFBMkQsQ0FBM0Q7QUFDQTs7QUFFRDs7OztBQTl3QzRCO0FBQUE7QUFBQSw4QkFpeENqQmhILFFBanhDaUIsRUFreEM1QjtBQUNDLFNBQUtzTyxJQUFMLEdBQVl0UCxJQUFJRyxPQUFKLENBQVlhLFFBQVosQ0FBWjs7QUFFQSxRQUFJLEtBQUtzTyxJQUFULEVBQWU7QUFDZHRQLFNBQUlPLFFBQUosQ0FBYSxLQUFLK08sSUFBbEIsRUFBd0IsS0FBS3hJLFFBQUwsQ0FBY04sS0FBdEM7QUFDQXhHLFNBQUlPLFFBQUosQ0FBYSxLQUFLK08sSUFBbEIsRUFBd0IsS0FBS3hJLFFBQUwsQ0FBYzJILFNBQXRDO0FBQ0EsVUFBS2EsSUFBTCxDQUFVeE4sV0FBVixDQUFzQixLQUFLa04sT0FBM0I7QUFDQSxVQUFLTSxJQUFMLENBQVV4TixXQUFWLENBQXNCLEtBQUtnTixjQUEzQjtBQUNBO0FBQ0Q7O0FBRUQ7Ozs7QUE3eEM0QjtBQUFBO0FBQUEsMENBaXlDNUI7QUFDQyxRQUFJQSxpQkFBaUI5TyxJQUFJeUIsYUFBSixDQUFrQixLQUFsQixFQUF5QjtBQUM3Q0wsU0FBSTtBQUR5QyxLQUF6QixDQUFyQjs7QUFJQSxXQUFPME4sY0FBUDtBQUNBOztBQUVEOzs7O0FBenlDNEI7QUFBQTtBQUFBLGlDQTZ5QzVCO0FBQ0MsUUFBRzlPLElBQUlHLE9BQUosQ0FBWSxpQkFBWixDQUFILEVBQW1DO0FBQ2xDO0FBQ0E7O0FBRUQsUUFBSW9QLFdBQVksS0FBS3pJLFFBQUwsQ0FBYzRILEtBQWYsR0FBd0IsT0FBeEIsR0FBa0MsVUFBakQ7O0FBRUEsUUFBSXJOLG1CQUNELEtBQUt5RixRQUFMLENBQWMzRyxPQURiLDhCQUVVb1AsUUFGVixzR0FRRCxLQUFLekksUUFBTCxDQUFjM0csT0FSYixpQ0FTTyxLQUFLMkcsUUFBTCxDQUFjTCxLQVRyQiwyQkFVUSxLQUFLSyxRQUFMLENBQWNKLE1BVnRCLDREQWNELEtBQUtJLFFBQUwsQ0FBYzNHLE9BZGIsc0NBZU0sS0FBSzJHLFFBQUwsQ0FBYzZILFdBZnBCLDREQW1CRCxLQUFLN0gsUUFBTCxDQUFjM0csT0FuQmIsMkJBb0JELEtBQUsyRyxRQUFMLENBQWMzRyxPQXBCYixpRkF5QkQsS0FBSzJHLFFBQUwsQ0FBYzNHLE9BekJiLDBCQTBCRCxLQUFLMkcsUUFBTCxDQUFjM0csT0ExQmIsK0VBK0JELEtBQUsyRyxRQUFMLENBQWMzRyxPQS9CYix5Q0FnQ1VvUCxRQWhDViw0REFrQ2lCLEtBQUt6SSxRQUFMLENBQWNKLE1BbEMvQixzT0EyQ0QsS0FBS0ksUUFBTCxDQUFjM0csT0EzQ2IscUhBZ0RELEtBQUsyRyxRQUFMLENBQWMzRyxPQWhEYiwyR0FBSjs7QUFzREdILFFBQUl5SyxRQUFKLENBQWEsZ0JBQWIsRUFBK0JwSixHQUEvQjtBQUNIOztBQUVEOzs7O0FBNzJDNEI7QUFBQTtBQUFBLHdDQWkzQzVCO0FBQ0MsUUFBRyxLQUFLMk4sT0FBTCxJQUFnQixJQUFuQixFQUF5QjtBQUN4QjtBQUNBOztBQUVELFNBQUtBLE9BQUwsQ0FBYW5ELE9BQWIsR0FBdUIsVUFBU0MsS0FBVCxFQUFnQjtBQUN0Q0EsV0FBTUMsY0FBTjtBQUNBL0wsU0FBSXdQLFdBQUosQ0FBZ0IsS0FBS1YsY0FBckIsRUFBcUMsUUFBckMsRUFBK0MsUUFBL0M7QUFDQSxLQUhzQixDQUdyQnZKLElBSHFCLENBR2hCLElBSGdCLENBQXZCOztBQUtBLFNBQUt1SixjQUFMLENBQW9CVyxVQUFwQixHQUFpQyxVQUFTM0QsS0FBVCxFQUFnQjtBQUNoRDRELFdBQU14TyxJQUFOLENBQVcsSUFBWCxFQUFpQjRLLEtBQWpCO0FBQ0EsS0FGZ0MsQ0FFL0J2RyxJQUYrQixDQUUxQixJQUYwQixDQUFqQztBQUdBO0FBOTNDMkI7QUFBQTtBQUFBLGlDQWc0Q2QzRSxJQWg0Q2MsRUFpNEM1QjtBQUNDLFFBQUdrQyxPQUFPc00sU0FBUCxDQUFpQnhPLElBQWpCLENBQUgsRUFBMkI7QUFDMUI7QUFDQTs7QUFFRGtDLFdBQU91TSxZQUFQLENBQW9CLE1BQXBCLEVBQTRCLEVBQTVCLEVBQWdDLENBQWhDO0FBQ0E7QUF2NEMyQjs7QUFBQTtBQUFBOztBQTA0QzdCLFVBQVNLLEtBQVQsQ0FBZTVELEtBQWYsRUFBc0I7QUFDckJBLFFBQU1DLGNBQU47QUFDQS9MLE1BQUkyUCxhQUFKLENBQWtCLEtBQUtiLGNBQXZCLEVBQXVDLFFBQXZDLEVBQWlELFFBQWpEO0FBQ0E7O0FBRUQsVUFBU0csVUFBVCxHQUFzQjtBQUNyQixNQUFJVyxNQUFNek8sU0FBUzBPLGVBQVQsQ0FBeUIsNEJBQXpCLEVBQXVELEtBQXZELENBQVY7QUFDQSxNQUFJQyxJQUFJM08sU0FBUzBPLGVBQVQsQ0FBeUIsNEJBQXpCLEVBQXVELEdBQXZELENBQVI7QUFDQSxNQUFJRSxPQUFPNU8sU0FBUzBPLGVBQVQsQ0FBeUIsNEJBQXpCLEVBQXVELE1BQXZELENBQVg7O0FBRUFELE1BQUkvTixZQUFKLENBQWlCLFNBQWpCLEVBQTRCLEtBQTVCO0FBQ0ErTixNQUFJL04sWUFBSixDQUFpQixPQUFqQixFQUEwQiw0QkFBMUI7QUFDQStOLE1BQUkvTixZQUFKLENBQWlCLGFBQWpCLEVBQWdDLDhCQUFoQztBQUNBK04sTUFBSS9OLFlBQUosQ0FBaUIsR0FBakIsRUFBc0IsS0FBdEI7QUFDQStOLE1BQUkvTixZQUFKLENBQWlCLEdBQWpCLEVBQXNCLEtBQXRCO0FBQ0ErTixNQUFJL04sWUFBSixDQUFpQixPQUFqQixFQUEwQixXQUExQjtBQUNBK04sTUFBSS9OLFlBQUosQ0FBaUIsUUFBakIsRUFBMkIsV0FBM0I7QUFDQStOLE1BQUkvTixZQUFKLENBQWlCLFNBQWpCLEVBQTRCLHFCQUE1QjtBQUNBK04sTUFBSS9OLFlBQUosQ0FBaUIsT0FBakIsRUFBMEIsNENBQTFCO0FBQ0ErTixNQUFJL04sWUFBSixDQUFpQixXQUFqQixFQUE4QixVQUE5Qjs7QUFFQWtPLE9BQUtsTyxZQUFMLENBQWtCLEdBQWxCLEVBQXVCLDBwREFBdkI7O0FBRUFpTyxJQUFFaE8sV0FBRixDQUFjaU8sSUFBZDtBQUNBSCxNQUFJOU4sV0FBSixDQUFnQmdPLENBQWhCOztBQUdBLFNBQU9GLEdBQVA7QUFDQTs7QUFFRCxLQUFJSSxhQUFhLEtBQWpCOztBQUVBLEtBQUlDLGtCQUFrQjtBQUNyQkMsbUJBQWlCLEtBREk7QUFFckJDLGNBQVksQ0FBQyxVQUFELEVBQWEsVUFBYixFQUF5QixRQUF6QixFQUFtQyxZQUFuQyxFQUFpRCxNQUFqRDtBQUZTLEVBQXRCOztBQTE2QzZCLEtBKzZDdkJ4USxTQS82Q3VCLEdBaTdDNUIsbUJBQVltSCxRQUFaLEVBQ0E7QUFBQTs7QUFDQ2QsbUJBQWlCb0ssU0FBakI7O0FBRUEsTUFBRyxRQUFPdEosUUFBUCx5Q0FBT0EsUUFBUCxNQUFtQixRQUF0QixFQUFnQztBQUMvQixTQUFNLElBQUlsSCwwQkFBSixFQUFOO0FBQ0E7O0FBRUQsT0FBS2dILFNBQUwsR0FBaUIsSUFBSXhCLFNBQUosRUFBakI7QUFDQSxPQUFLMEIsUUFBTCxHQUFnQmhFLE9BQU9pRSxNQUFQLENBQWNrSixlQUFkLEVBQStCbkosUUFBL0IsQ0FBaEI7O0FBRUF1Siw2QkFBMkJuUCxJQUEzQixDQUFnQyxJQUFoQyxFQUFzQzRGLFNBQVNxSixVQUEvQzs7QUFFQUgsZUFBYSxJQUFiOztBQUVBLFNBQU8sSUFBSU0sS0FBSixDQUFVLElBQVYsRUFBZ0I7QUFDdEJDLFFBQUssYUFBU0MsTUFBVCxFQUFpQjlNLE1BQWpCLEVBQXlCO0FBQzdCLFFBQUcsQ0FBRVosT0FBT2lILFFBQVAsQ0FBZ0JyRyxNQUFoQixFQUF3Qm9ELFNBQVNxSixVQUFqQyxDQUFMLEVBQW1EO0FBQ2xELFdBQU0sSUFBSXBLLCtCQUFKLEVBQU47QUFDQTs7QUFFRCxXQUFPeUssT0FBTzVKLFNBQVAsQ0FBaUI2SixJQUFqQixDQUFzQi9NLE1BQXRCLENBQVA7QUFDQTtBQVBxQixHQUFoQixDQUFQO0FBU0EsRUF6OEMyQjs7QUE0OEM3Qjs7Ozs7QUFHQSxVQUFTMk0sMEJBQVQsQ0FBb0NGLFVBQXBDLEVBQWdEO0FBQy9DLE9BQUt2SixTQUFMLENBQWVyQixJQUFmLENBQW9CLFFBQXBCLEVBQThCLFVBQVNxQixTQUFULEVBQW9CO0FBQ2pEQSxhQUFVLFFBQVYsRUFBb0I4SixNQUFwQixHQUE2QixJQUE3QjtBQUNBLFVBQU8sSUFBSS9KLE1BQUosQ0FBV0MsU0FBWCxDQUFQO0FBQ0EsR0FIRDs7QUFLQSxPQUFLQSxTQUFMLENBQWVyQixJQUFmLENBQW9CLFVBQXBCLEVBQWdDLFVBQVNxQixTQUFULEVBQW9CO0FBQ25EQSxhQUFVLFVBQVYsRUFBc0I4SixNQUF0QixHQUErQixJQUEvQjtBQUNBLFVBQU8sSUFBSWhHLFFBQUosQ0FBYTlELFNBQWIsQ0FBUDtBQUNBLEdBSEQ7O0FBS0EsT0FBS0EsU0FBTCxDQUFlckIsSUFBZixDQUFvQixVQUFwQixFQUFnQyxVQUFTcUIsU0FBVCxFQUFvQjtBQUNuREEsYUFBVSxVQUFWLEVBQXNCOEosTUFBdEIsR0FBK0IsSUFBL0I7QUFDQSxVQUFPLElBQUlqSixRQUFKLENBQWFiLFNBQWIsQ0FBUDtBQUNBLEdBSEQ7O0FBS0EsT0FBS0EsU0FBTCxDQUFlckIsSUFBZixDQUFvQixZQUFwQixFQUFrQyxVQUFTcUIsU0FBVCxFQUFvQjtBQUNyREEsYUFBVSxZQUFWLEVBQXdCOEosTUFBeEIsR0FBaUMsSUFBakM7QUFDQSxVQUFPLElBQUkxRixVQUFKLENBQWVwRSxTQUFmLEVBQTBCQSxVQUFVNkosSUFBVixDQUFlLFVBQWYsQ0FBMUIsQ0FBUDtBQUNBLEdBSEQ7O0FBS0EsT0FBSzdKLFNBQUwsQ0FBZXJCLElBQWYsQ0FBb0IsTUFBcEIsRUFBNEIsVUFBU3FCLFNBQVQsRUFBb0I7QUFDL0NBLGFBQVUsTUFBVixFQUFrQjhKLE1BQWxCLEdBQTJCLElBQTNCO0FBQ0EsVUFBTyxJQUFJN0IsSUFBSixDQUFTakksU0FBVCxDQUFQO0FBQ0EsR0FIRDs7QUFLQSxPQUFLQSxTQUFMLENBQWUsUUFBZixFQUF5QixRQUF6QixJQUFxQyxLQUFyQztBQUNBLE9BQUtBLFNBQUwsQ0FBZSxVQUFmLEVBQTJCLFFBQTNCLElBQXVDLEtBQXZDO0FBQ0EsT0FBS0EsU0FBTCxDQUFlLFVBQWYsRUFBMkIsUUFBM0IsSUFBdUMsS0FBdkM7QUFDQSxPQUFLQSxTQUFMLENBQWUsWUFBZixFQUE2QixRQUE3QixJQUF5QyxLQUF6QztBQUNBLE9BQUtBLFNBQUwsQ0FBZSxNQUFmLEVBQXVCLFFBQXZCLElBQW1DLEtBQW5DO0FBQ0E7O0FBRUQsUUFBT2pILFNBQVA7QUFFQyxDQWwvQ2dCLEVBQWpCIiwiZmlsZSI6ImVDb21tZXJjZS5qcyIsInNvdXJjZXNDb250ZW50IjpbInZhciBlQ29tbWVyY2UgPSAoZnVuY3Rpb24gKCkge1xuJ3VzZSBzdHJpY3QnO1xuXG5jbGFzcyBJbnZhbGlkQXJndW1lbnRFeGNlcHRpb24kMSBleHRlbmRzIEVycm9yXHJcbntcclxuXHRjb25zdHJ1Y3RvcigpIFxyXG5cdHsgXHJcbiAgICBcdHN1cGVyKCk7XHJcbiAgICBcdGNvbnNvbGUuZXJyb3IoYEludmFsaWRBcmd1bWVudEV4Y2VwdGlvbiwgYW4gaW52YWxpZCBhcmd1bWVudCB3YXMgcGFzc2VkLmApO1xyXG4gICAgfVxyXG59XG5cbmNsYXNzIERPTVxyXG57XHJcblx0LyoqXHJcblx0ICogTWluaWZpZXMgdGhlIGNzcyB0ZXh0LlxyXG5cdCAqL1xyXG5cdHN0YXRpYyBtaW5pZnlDc3Moc3RyaW5nKSBcclxuXHR7XHJcblx0ICAgIHN0cmluZyA9IHN0cmluZy5yZXBsYWNlKC9cXC9cXCooPzooPyFcXCpcXC8pW1xcc1xcU10pKlxcKlxcL3xbXFxyXFxuXFx0XSsvZywgJycpO1xyXG5cdCAgICBzdHJpbmcgPSBzdHJpbmcucmVwbGFjZSgvIHsyLH0vZywgJyAnKTtcclxuXHQgICAgc3RyaW5nID0gc3RyaW5nLnJlcGxhY2UoLyhbezp9XSkvZywgJyQxJyk7XHJcblx0ICAgIHN0cmluZyA9IHN0cmluZy5yZXBsYWNlKC8oWzssXSkgL2csICckMScpO1xyXG5cdCAgICBzdHJpbmcgPSBzdHJpbmcucmVwbGFjZSgvICEvZywgJyEnKTtcclxuXHQgICAgXHJcblx0ICAgIHJldHVybiBzdHJpbmc7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBTd2l0Y2hlcyBiZXR3ZWVuIHR3byBnaXZlbiBjbGFzc2VzLlxyXG5cdCAqL1xyXG5cdHN0YXRpYyBzd2l0Y2hDbGFzc2VzKGVsZW1lbnQsIGNsYXNzTmFtZSwgbmV3Q2xhc3NOYW1lKSBcclxuXHR7XHJcblx0XHR0aGlzLnJlbW92ZUNsYXNzKGVsZW1lbnQsIGNsYXNzTmFtZSk7XHJcblx0XHR0aGlzLmFkZENsYXNzKGVsZW1lbnQsIG5ld0NsYXNzTmFtZSk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBBZGRzIGNsYXNzIHRvIGEgZ2l2ZW4gZWxlbWVudC5cclxuXHQgKi9cclxuXHRzdGF0aWMgYWRkQ2xhc3MoZWxlbWVudCwgY2xhc3NOYW1lKSBcclxuXHR7XHJcblx0XHRpZihlbGVtZW50ID09PSBudWxsKSB7XHJcblx0XHRcdHRocm93IG5ldyBJbnZhbGlkQXJndW1lbnRFeGNlcHRpb24kMTtcclxuXHRcdH1cclxuXHJcblx0XHRpZighIGNsYXNzTmFtZSB8fCBjbGFzc05hbWUgPT0gJycgfHwgdHlwZW9mIGNsYXNzTmFtZSA9PT0gdW5kZWZpbmVkKSB7XHJcblx0XHRcdHJldHVybiBlbGVtZW50O1xyXG5cdFx0fVxyXG5cclxuXHRcdGxldCBjbGFzc05hbWVzID0gY2xhc3NOYW1lLnNwbGl0KCcgJyk7XHJcblxyXG5cdFx0Y2xhc3NOYW1lcy5mb3JFYWNoKGZ1bmN0aW9uKG5hbWUpIHtcclxuXHRcdFx0ZWxlbWVudC5jbGFzc0xpc3QuYWRkKG5hbWUpO1xyXG5cdFx0fSk7XHJcblx0XHRcclxuXHRcdHJldHVybiBlbGVtZW50O1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogUmVtb3ZlcyBjbGFzcyBmcm9tIGEgZ2l2ZW4gZWxlbWVudC5cclxuXHQgKi9cclxuXHRzdGF0aWMgcmVtb3ZlQ2xhc3MoZWxlbWVudCwgY2xhc3NOYW1lKSBcclxuXHR7XHJcblx0XHRpZihlbGVtZW50ID09IG51bGwpIHtcclxuXHRcdFx0dGhyb3cgbmV3IEludmFsaWRBcmd1bWVudEV4Y2VwdGlvbiQxO1xyXG5cdFx0fVxyXG5cclxuXHRcdGlmKGNsYXNzTmFtZSA9PSAnJykge1xyXG5cdFx0XHRlbGVtZW50LmNsYXNzTmFtZSA9ICcnO1xyXG5cdFx0fSBlbHNlIHtcclxuXHJcblx0XHRcdGxldCBjbGFzc05hbWVzID0gY2xhc3NOYW1lLnNwbGl0KCcgJyk7XHJcblxyXG5cdFx0XHRjbGFzc05hbWVzLmZvckVhY2goZnVuY3Rpb24obmFtZSkge1xyXG5cdFx0XHRcdGVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShuYW1lKTtcclxuXHRcdFx0fSk7XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIGVsZW1lbnQ7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBRdWVyaWVzIHRoZSBlbGVtZW50IGZyb20gdGhlIERPTS5cclxuXHQgKi9cclxuXHRzdGF0aWMgZWxlbWVudChzZWxlY3RvcikgXHJcblx0e1xyXG5cdFx0cmV0dXJuIHF1ZXJ5RWxlbWVudC5jYWxsKHRoaXMsIGRvY3VtZW50LCBzZWxlY3Rvcik7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBBZGRzIHN0eWxlIHRhZyB3aXRoIGdpdmVuIGlkIGFuZCBjc3MgdG8gdGhlIERPTS5cclxuXHQgKi9cclxuXHRzdGF0aWMgYWRkU3R5bGUoaWQsIGNzcykgXHJcblx0e1xyXG5cdFx0aWYodHlwZW9mIGNzcyAhPSAnc3RyaW5nJykge1xyXG5cdFx0XHR0aHJvdyBuZXcgSW52YWxpZEFyZ3VtZW50RXhjZXB0aW9uJDE7XHJcblx0XHR9XHJcblxyXG5cdFx0bGV0IGhlYWQgPSBkb2N1bWVudC5oZWFkIHx8IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdoZWFkJylbMF07XHJcblx0XHRsZXQgc3R5bGVUYWcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzdHlsZScpO1xyXG5cclxuXHRcdC8vIHBpcGUgaXQgdGhyb3VnaCB0aGUgbWluZmllclxyXG5cdCAgICBsZXQgQ1NTID0gdGhpcy5taW5pZnlDc3MoY3NzKTtcclxuXHQgICAgLy8gYWRkaW5nIGl0IHRvIHRoZSBzdHlsZXRhZ1xyXG5cdCAgICBzdHlsZVRhZy5pbm5lckhUTUwgPSBDU1M7XHJcblx0ICAgIC8vIGdpdmUgYW4gaWQgdG8gcmVjb2duaXplIHRoZSBzdHlsZSB0YWdcclxuXHRcdHN0eWxlVGFnLnNldEF0dHJpYnV0ZSgnaWQnLCBpZCk7XHJcblx0XHQvLyBhcHBlbmRpbmcgdGhhdCBzdHlsZSB0YWcgdG8gdGhlIERPTSBoZWFkIHRhZ1xyXG5cdFx0aGVhZC5hcHBlbmRDaGlsZChzdHlsZVRhZyk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBDcmVhdGVzIGFuIGVsZW1lbnQgd2l0aCB0aGUgZ2l2ZW4gb3B0aW9ucy5cclxuXHQgKi9cclxuXHRzdGF0aWMgY3JlYXRlRWxlbWVudChlbGVtZW50VHlwZSwgb3B0aW9ucylcclxuXHR7XHJcblx0XHRsZXQgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoZWxlbWVudFR5cGUpO1xyXG5cdFxyXG5cdFx0aWYgKG9wdGlvbnMgPT09IHVuZGVmaW5lZCkge1xyXG5cdFx0XHRyZXR1cm4gZWxlbWVudDtcclxuXHRcdH1cclxuXHJcblx0XHRmb3IgKGxldCBvcHRpb24gaW4gb3B0aW9ucykge1xyXG5cdFx0XHRpZihvcHRpb24gPT0gJ3RleHQnKSB7XHJcblx0XHRcdFx0ZWxlbWVudC5pbm5lckhUTUwgPSBvcHRpb25zW29wdGlvbl07XHJcblx0XHRcdFx0Y29udGludWU7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGVsZW1lbnQuc2V0QXR0cmlidXRlKG9wdGlvbiwgb3B0aW9uc1tvcHRpb25dKTtcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gZWxlbWVudDtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFRvZ2dsZXMgdGhlIGdpdmVuIGNsYXNzZXMuXHJcblx0ICovXHJcblx0c3RhdGljIHRvZ2dsZUNsYXNzKGVsZW1lbnQsIGNsYXNzTmFtZSwgc2Vjb25kQ2xhc3NOYW1lKVxyXG5cdHtcclxuXHRcdGlmKGVsZW1lbnQgPT0gbnVsbCB8fCB0eXBlb2YgZWxlbWVudCA9PSAndW5kZWZpbmVkJykge1xyXG5cdFx0XHR0aHJvdyBuZXcgSW52YWxpZEFyZ3VtZW50RXhjZXB0aW9uJDE7XHJcblx0XHR9XHJcblxyXG5cdFx0c2Vjb25kQ2xhc3NOYW1lID0gc2Vjb25kQ2xhc3NOYW1lIHx8IHVuZGVmaW5lZDtcclxuXHJcblx0XHRlbGVtZW50LmNsYXNzTGlzdC50b2dnbGUoY2xhc3NOYW1lKTtcclxuXHJcblx0XHRpZihzZWNvbmRDbGFzc05hbWUpIHtcclxuXHRcdFx0ZWxlbWVudC5jbGFzc0xpc3QudG9nZ2xlKHNlY29uZENsYXNzTmFtZSk7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBGaW5kcyBhbiBlbGVtZW50IGluc2lkZSBvZiBwYXJlbnQuXHJcblx0ICovXHJcblx0c3RhdGljIGZpbmQoZWxlbWVudCwgc2VsZWN0b3IpIFxyXG5cdHtcclxuXHRcdHJldHVybiBxdWVyeUVsZW1lbnQoZWxlbWVudCwgc2VsZWN0b3IpO1xyXG5cdH1cclxufVxyXG5cclxuLyoqXHJcbiAqIFF1ZXJpZXMgYW4gZWxlbWVudCBmcm9tIHRoZSBET00uXHJcbiAqL1xyXG5mdW5jdGlvbiBxdWVyeUVsZW1lbnQocGFyZW50LCBzZWxlY3Rvcikge1xyXG5cdHZhciBlbGVtZW50ID0gcGFyZW50LnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3IpO1xyXG5cclxuXHRpZihlbGVtZW50Lmxlbmd0aCA9PSAwKSB7XHJcblx0XHRyZXR1cm4gbnVsbDtcclxuXHR9XHJcblxyXG5cdHJldHVybiAoZWxlbWVudC5sZW5ndGggPiAxKSA/IGVsZW1lbnQgOiBlbGVtZW50WzBdO1xyXG59XG5cbmNsYXNzIEV2ZW50XHJcbntcclxuXHQvKipcclxuXHQgKiBMaXN0ZW4gdG8gYW4gZXZlbnQuXHJcblx0ICovXHJcblx0c3RhdGljIGxpc3RlbihuYW1lLCBjYWxsYmFjaykge1xyXG5cdFx0aWYgKHR5cGVvZiBjYWxsYmFjayAhPT0gJ2Z1bmN0aW9uJykge1xyXG5cdFx0XHR0aHJvdyBuZXcgSW52YWxpZEFyZ3VtZW50RXhjZXB0aW9uO1xyXG5cdFx0fVxyXG5cclxuXHRcdGV2ZW50c1tuYW1lXSA9IGNhbGxiYWNrO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogRmlyZXMgYW4gZXZlbnQuXHJcblx0ICovXHJcblx0c3RhdGljIHRyaWdnZXIobmFtZSwgZGF0YSkge1xyXG5cdFx0ZGF0YSA9IGRhdGEgfHwgbnVsbDtcclxuXHJcblx0XHRpZih0eXBlb2YgZXZlbnRzW25hbWVdICE9PSAnZnVuY3Rpb24nKSB7XHJcblx0XHRcdHRocm93IG5ldyBCYWRFdmVudENhbGxFeGNlcHRpb247XHJcblx0XHR9XHJcblxyXG5cdFx0aWYoZGF0YSAhPSBudWxsICYmIGRhdGEgaW5zdGFuY2VvZiBBcnJheSkge1xyXG5cdFxyXG5cdFx0XHRyZXR1cm4gZXZlbnRzW25hbWVdKC4uLmRhdGEpO1xyXG5cdFx0fVxyXG5cclxuXHRcdGV2ZW50c1tuYW1lXSgpO1xyXG5cdH1cclxufVxuXG5jbGFzcyBDb21tb25cclxue1xyXG5cdC8qKlxyXG5cdCAqIEV4dGVuZCBhbiBvYmplY3QuXHJcblx0ICovXHJcblx0c3RhdGljIGV4dGVuZChjdXJyZW50T2JqLCBuZXdPYmogKSB7XHJcblx0XHR2YXIgZXh0ZW5kZWQgPSB7fTtcclxuXHQgICAgdmFyIHByb3A7XHJcblxyXG5cdCAgICBmb3IgKHByb3AgaW4gY3VycmVudE9iaikge1xyXG5cdCAgICAgICAgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChjdXJyZW50T2JqLCBwcm9wKSkge1xyXG5cdCAgICAgICAgICAgIGV4dGVuZGVkW3Byb3BdID0gY3VycmVudE9ialtwcm9wXTtcclxuXHQgICAgICAgIH1cclxuXHQgICAgfVxyXG5cclxuXHQgICAgZm9yIChwcm9wIGluIG5ld09iaikge1xyXG5cdCAgICAgICAgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChuZXdPYmosIHByb3ApKSB7XHJcblx0ICAgICAgICAgICAgZXh0ZW5kZWRbcHJvcF0gPSBuZXdPYmpbcHJvcF07XHJcblx0ICAgICAgICB9XHJcblx0ICAgIH1cclxuXHJcblx0ICAgIHJldHVybiBleHRlbmRlZDtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIENoZWNrcyBmb3IgYSBuZWVkbGUgaW4gaHlzdGFjay5cclxuXHQgKi9cclxuXHRzdGF0aWMgaW5fYXJyYXkobmVlZGxlLCBoeXN0YWNrKSB7XHJcblx0XHRpZihoeXN0YWNrLmNvbnN0cnVjdG9yICE9PSBBcnJheSkgcmV0dXJuO1xyXG5cclxuXHRcdGZvcih2YXIgaSA9IDA7IGkgPD0gaHlzdGFjay5sZW5ndGg7IGkrKykge1xyXG5cdFx0XHRpZihuZWVkbGUgPT0gaHlzdGFja1tpXSkgcmV0dXJuIHRydWU7XHRcclxuXHRcdH1cclxuXHRcclxuXHRcdHJldHVybiBmYWxzZTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIENoZWNrcyBpZiBhbiBvYmplY3QgaXMgZW1wdHkuXHJcblx0ICovXHJcblx0c3RhdGljIGVtcHR5T2JqZWN0KG9iamVjdCkge1xyXG5cdFx0Zm9yKHZhciBwcm9wIGluIG9iamVjdCkge1xyXG5cdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIHRydWU7XHJcblx0fVxyXG5cclxuXHRzdGF0aWMgY29udGFpbnNPYmplY3Qob2JqZWN0LCBoeXN0YWNrKSBcclxuXHR7XHJcblx0ICAgIHZhciBpO1xyXG5cclxuXHQgICAgZm9yIChpID0gMDsgaSA8IGh5c3RhY2subGVuZ3RoOyBpKyspIHtcclxuXHQgICAgICAgIGlmICh0eXBlb2Ygb2JqZWN0ID09ICdzdHJpbmcnICYmIGh5c3RhY2tbaV0uY29uc3RydWN0b3IubmFtZSA9PT0gb2JqZWN0KSB7XHJcblx0ICAgICAgICBcdHJldHVybiB0cnVlO1xyXG5cdCAgICAgICAgfVxyXG5cclxuXHQgICAgICAgIGlmIChoeXN0YWNrW2ldID09PSBvYmplY3QpIHtcclxuXHQgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuXHQgICAgICAgIH1cclxuXHQgICAgfVxyXG5cclxuXHQgICAgcmV0dXJuIGZhbHNlO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQ29udmVydCBjYW1lbENhc2UgdG8ga2ViYWItY2FzZS5cclxuXHQgKi9cclxuXHRzdGF0aWMga2ViYWJDYXNlKHN0cmluZykgXHJcblx0e1xyXG5cdFx0cmV0dXJuIHN0cmluZy5yZXBsYWNlKC8oW2Etel0pKFtBLVpdKS9nLCAnJDEtJDInKS50b0xvd2VyQ2FzZSgpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQ2hlY2tzIGlmIGEgZ2l2ZW4gcGFyYW1ldGVyIGlzIGFuIG9iamVjdC5cclxuXHQgKi9cclxuXHRzdGF0aWMgaXNPYmplY3Qob2JqZWN0KSBcclxuXHR7XHJcblx0XHRyZXR1cm4gdHlwZW9mIG9iamVjdCA9PSAnb2JqZWN0JztcclxuXHR9XHJcblxyXG5cdC8qKlxyXG4gXHQqIFNldHMgYSBjb29raWUuIFxyXG5cdCovXHJcblx0c3RhdGljIGNyZWF0ZUNvb2tpZShuYW1lLCB2YWx1ZSwgZGF5cykgXHJcblx0e1xyXG5cdFx0aWYgKHZhbHVlLmNvbnN0cnVjdG9yLm5hbWUgPT0gJ0FycmF5Jykge1xyXG5cdFx0XHR2YWx1ZSA9IEpTT04uc3RyaW5naWZ5KHZhbHVlKTtcclxuXHRcdH1cclxuXHJcblx0ICAgIGxldCBleHBpcmVzO1xyXG5cdCAgICBcclxuXHQgICAgaWYgKGRheXMpIHtcclxuXHQgICAgICAgIGxldCBkYXRlID0gbmV3IERhdGUoKTtcclxuXHQgICAgICAgIGRhdGUuc2V0VGltZShkYXRlLmdldFRpbWUoKSArIChkYXlzICogMjQgKiA2MCAqIDYwICogMTAwMCkpO1xyXG5cdCAgICAgICAgZXhwaXJlcyA9IFwiOyBleHBpcmVzPVwiICsgZGF0ZS50b0dNVFN0cmluZygpO1xyXG5cdCAgICB9IGVsc2Uge1xyXG5cdCAgICAgICAgZXhwaXJlcyA9IFwiXCI7XHJcblx0ICAgIH1cclxuXHJcblx0ICAgIGRvY3VtZW50LmNvb2tpZSA9IG5hbWUgKyBcIj1cIiArIHZhbHVlICsgZXhwaXJlcyArIFwiOyBwYXRoPS9cIjtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFJldHJpZXZlcyB0aGUgY29va2llIGJ5IG5hbWUuXHJcblx0ICovXHJcblx0c3RhdGljIGdldENvb2tpZShuYW1lKSBcclxuXHR7XHJcblx0ICAgIGlmIChkb2N1bWVudC5jb29raWUubGVuZ3RoID4gMCkge1xyXG5cdCAgICAgICAgbGV0IGNfc3RhcnQgPSBkb2N1bWVudC5jb29raWUuaW5kZXhPZihuYW1lICsgXCI9XCIpO1xyXG5cdCAgICAgICAgXHJcblx0ICAgICAgICBpZiAoY19zdGFydCAhPSAtMSkge1xyXG5cdCAgICAgICAgICAgIGNfc3RhcnQgPSBjX3N0YXJ0ICsgbmFtZS5sZW5ndGggKyAxO1xyXG5cdCAgICAgICAgICAgIGxldCBjX2VuZCA9IGRvY3VtZW50LmNvb2tpZS5pbmRleE9mKFwiO1wiLCBjX3N0YXJ0KTtcclxuXHQgICAgICAgICAgICBcclxuXHQgICAgICAgICAgICBpZiAoY19lbmQgPT0gLTEpIHtcclxuXHQgICAgICAgICAgICAgICAgY19lbmQgPSBkb2N1bWVudC5jb29raWUubGVuZ3RoO1xyXG5cdCAgICAgICAgICAgIH1cclxuXHJcblx0ICAgICAgICAgICAgcmV0dXJuIEpTT04ucGFyc2UodW5lc2NhcGUoZG9jdW1lbnQuY29va2llLnN1YnN0cmluZyhjX3N0YXJ0LCBjX2VuZCkpKTtcclxuXHQgICAgICAgIH1cclxuXHQgICAgfVxyXG5cclxuXHQgICAgcmV0dXJuIFtdO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogR2VuZXJhdGVzIGEgcmFuZG9tIHN0cmluZy5cclxuXHQgKi9cclxuXHRzdGF0aWMgcmFuZG9tU3RyKGxlbmd0aCkgXHJcblx0e1xyXG5cdFx0bGV0IHN0cmluZyA9ICcnO1xyXG5cdFx0bGV0IHBvc3NpYmxlID0gXCJBQkNERUZHSElKS0xNTk9QUVJTVFVWV1hZWmFiY2RlZmdoaWprbG1ub3BxcnN0dXZ3eHl6MDEyMzQ1Njc4OVwiO1xyXG5cclxuXHRcdGZvciAobGV0IGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcclxuXHQgICAgXHRzdHJpbmcgKz0gcG9zc2libGUuY2hhckF0KE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIHBvc3NpYmxlLmxlbmd0aCkpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiBzdHJpbmc7XHJcblx0fVxyXG59XG5cbmNsYXNzIEludmFsaWRCaW5kaW5nRXhjZXB0aW9uIGV4dGVuZHMgRXJyb3Jcclxue1xyXG5cdGNvbnN0cnVjdG9yKCkgXHJcblx0eyBcclxuICAgIFx0c3VwZXIoKTtcclxuICAgIFx0Y29uc29sZS5lcnJvcihgSW52YWxpZEJpbmRpbmdFeGNlcHRpb24sIHRyeWluZyB0byBiaW5kIGFuIGFscmVhZHkgZXhpc3RpbmcgYm91bmQuYCk7XHJcbiAgICB9XHJcbn1cblxubGV0IGluc3RhbmNlcyA9IFtdO1xyXG5cclxuY2xhc3MgQ29udGFpbmVyIFxyXG57XHJcblx0LyoqXHJcblx0ICogQmluZHMga2V5IHRvIGNvbmNyZXRlIGNsYXNzLlxyXG5cdCAqL1xyXG5cdGJpbmQoa2V5LCBjb25jcmV0ZSkgXHJcblx0e1xyXG5cdFx0aWYgKHR5cGVvZiBrZXkgIT0gJ3N0cmluZycgfHwgdHlwZW9mIGNvbmNyZXRlICE9ICdmdW5jdGlvbicpIHtcclxuXHRcdFx0dGhyb3cgbmV3IEludmFsaWRBcmd1bWVudEV4Y2VwdGlvbiQxO1xyXG5cdFx0fVxyXG5cclxuXHRcdGlmICh0eXBlb2YgdGhpc1trZXldICE9ICd1bmRlZmluZWQnKSB7XHJcblx0XHRcdHRocm93IG5ldyBJbnZhbGlkQmluZGluZ0V4Y2VwdGlvbjtcclxuXHRcdH1cclxuXHJcblx0XHR0aGlzW2tleV0gPSBjb25jcmV0ZS5iaW5kKGNvbmNyZXRlLCB0aGlzKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFNldHMgYW4gaW5zdGFuY2UuXHJcblx0ICovXHJcblx0c2V0SW5zdGFuY2Uoa2V5LCBpbnN0YW5jZSkgXHJcblx0e1xyXG5cdFx0aWYodHlwZW9mIGtleSAhPSAnc3RyaW5nJyB8fCB0eXBlb2YgaW5zdGFuY2UgIT0gJ29iamVjdCcpIHtcclxuXHRcdFx0dGhyb3cgbmV3IEludmFsaWRBcmd1bWVudEV4Y2VwdGlvbiQxO1xyXG5cdFx0fVxyXG5cclxuXHRcdGluc3RhbmNlc1trZXldID0gaW5zdGFuY2U7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBHZXRzIGFuIGluc3RhbmNlLlxyXG5cdCAqL1xyXG5cdGdldEluc3RhbmNlKGtleSkgXHJcblx0e1xyXG5cdFx0aWYodHlwZW9mIGtleSAhPSAnc3RyaW5nJykge1xyXG5cdFx0XHR0aHJvdyBuZXcgSW52YWxpZEFyZ3VtZW50RXhjZXB0aW9uJDE7XHJcblx0XHR9XHJcblxyXG5cdFx0aWYodHlwZW9mIGtleSA9PSAnb2JqZWN0Jykge1xyXG5cdFx0XHRyZXR1cm4gaW5zdGFuY2VzW2tleS5jb25zdHJ1Y3Rvci5uYW1lXSB8fCBudWxsO1xyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiBpbnN0YW5jZXNba2V5XSB8fCBudWxsO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQ2hlY2tzIGlmIGFuIGluc3RhbmNlIGV4aXN0LlxyXG5cdCAqL1xyXG5cdGluc3RhbmNlRXhpc3QoaW5zdGFuY2UpIFxyXG5cdHtcclxuXHRcdGlmKHR5cGVvZiBpbnN0YW5jZSA9PSAnb2JqZWN0Jykge1xyXG5cdFx0XHRyZXR1cm4gKHR5cGVvZiBpbnN0YW5jZXNbaW5zdGFuY2UuY29uc3RydWN0b3IubmFtZV0gIT09ICd1bmRlZmluZWQnKTtcclxuXHRcdH1cclxuXHRcdFxyXG5cdFx0XHJcblx0XHRyZXR1cm4gKGluc3RhbmNlIGluIGluc3RhbmNlcyk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBDcmVhdGVzIGFuIGluc3RhbmNlLlxyXG5cdCAqL1xyXG5cdG1ha2Uob2JqZWN0KVxyXG5cdHtcclxuXHRcdGxldCBpbnN0YW5jZSA9IHt9O1xyXG5cclxuXHRcdGlmICh0aGlzLmluc3RhbmNlRXhpc3Qob2JqZWN0KSkge1xyXG5cdFx0XHRyZXR1cm4gdGhpcy5nZXRJbnN0YW5jZShvYmplY3QpO1xyXG5cdFx0fVxyXG5cclxuXHRcdGlmICh0eXBlb2Ygb2JqZWN0ID09ICdvYmplY3QnKSB7XHJcblx0XHRcdGluc3RhbmNlID0gb2JqZWN0O1xyXG5cdFx0fSBlbHNlIGlmKHR5cGVvZiBvYmplY3QgPT0gJ3N0cmluZycgJiYgdGhpcy5oYXNPd25Qcm9wZXJ0eShvYmplY3QpKSB7XHJcblx0XHRcdGluc3RhbmNlID0gbmV3IHRoaXNbb2JqZWN0XTtcdFxyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0dGhyb3cgbmV3IEludmFsaWRCaW5kaW5nRXhjZXB0aW9uO1xyXG5cdFx0fVxyXG5cclxuXHRcdHRoaXMuc2V0SW5zdGFuY2Uob2JqZWN0LCBpbnN0YW5jZSk7IFxyXG5cclxuXHRcdHJldHVybiBpbnN0YW5jZTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFJldHJpZXZlIGFsbCBpbnN0YW5jZXMuXHJcblx0ICovXHJcblx0aW5zdGFuY2VzKCkgXHJcblx0e1xyXG5cdFx0cmV0dXJuIGluc3RhbmNlcztcclxuXHR9XHJcbn1cblxuY2xhc3MgQ29tcG9uZW50c0V4Y2VwdGlvbiBleHRlbmRzIEVycm9yXHJcbntcclxuXHRjb25zdHJ1Y3RvcigpIFxyXG5cdHsgXHJcbiAgICBcdHN1cGVyKCk7XHJcbiAgICBcdGNvbnNvbGUuZXJyb3IoYENvbXBvbmVudHNFeGNlcHRpb24sIGV4cGVjdGluZyBmb3IgYXQgbGVhc3Qgb25lIGNvbXBvbmVudHMsIGJ1dCBub25lIHdhcyBnaXZlbiwgXHJcblx0XHRcdFx0XHRcdFx0XHRwbGVhc2UgYWRkIGF0IGxlYXN0IG9uZSByZXF1aXJlbWVudChQcm9kdWN0cywgU2VydmljZXMgb3IvYW5kIEZpbHRlci5gKTtcclxuICAgIH1cclxufVxuXG5jbGFzcyBCYWRFdmVudENhbGxFeGNlcHRpb24kMSBleHRlbmRzIEVycm9yXHJcbntcclxuXHRjb25zdHJ1Y3RvcigpIFxyXG5cdHsgXHJcblx0XHRzdXBlcigpO1xyXG4gICAgXHRjb25zb2xlLmVycm9yKGBCYWRFdmVudENhbGxFeGNlcHRpb24sIGxpc3RlbmluZyB0byBhIG5vbmUtZXhpc3RpbmcgZXZlbnQuYCk7XHJcbiAgICB9XHJcbn1cblxuY2xhc3MgTm90SW5QYWdlUmFuZ2VFeGNlcHRpb24gZXh0ZW5kcyBFcnJvclxyXG57XHJcblx0Y29uc3RydWN0b3IoKSBcclxuXHR7IFxyXG4gICAgXHRzdXBlcigpO1xyXG4gICAgXHRjb25zb2xlLmVycm9yKGBOb3RJblBhZ2VSYW5nZUV4Y2VwdGlvbiwgc29ycnksIG5vIG1vcmUgcGFnZXMuYCk7XHJcbiAgICB9XHJcbn1cblxuY2xhc3MgQ29tcG9uZW50Tm90UmVnaXN0ZXJlZEV4Y2VwdGlvbiBleHRlbmRzIEVycm9yXHJcbntcclxuXHRjb25zdHJ1Y3RvcigpIFxyXG5cdHsgXHJcbiAgICBcdHN1cGVyKCk7XHJcbiAgICBcdGNvbnNvbGUuZXJyb3IoYENvbXBvbmVudE5vdFJlZ2lzdGVyZWRFeGNlcHRpb24sIGNvbXBvbmVudHMgbXVzdCBiZSByZWdpc3RlcmVkIGluIG9yZGVyIHRvIHVzZSB0aGVtLmApO1xyXG4gICAgfVxyXG59XG5cbmNsYXNzIEV4Y2VwdGlvbkhhbmRsZXIgZXh0ZW5kcyBFcnJvclxyXG57XHJcblx0LyoqXHJcblx0ICogSGFuZGxlIGFsbCB0aGUgZXJyb3JzXHJcblx0ICovXHJcblx0c3RhdGljIGluaXRhbGl6ZSgpIHtcdFxyXG5cdFx0d2luZG93Lm9uZXJyb3IgPSBmdW5jdGlvbihtZXNzYWdlLCBzb3VyY2UsIGxpbmVubywgY29sbm8sIGVycm9yKSB7XHJcblx0XHRcdFxyXG5cdFx0XHRpZiAoZXJyb3IgaW5zdGFuY2VvZiBJbnZhbGlkQXJndW1lbnRFeGNlcHRpb24kMSkge1xyXG5cdFx0XHRcdC8vIGhhbmRsZVxyXG5cdFx0XHR9IGVsc2UgaWYgKGVycm9yIGluc3RhbmNlb2YgSW52YWxpZEJpbmRpbmdFeGNlcHRpb24pIHtcclxuXHRcdFx0XHQvLyBoYW5kbGVcclxuXHRcdFx0fSBlbHNlIGlmIChlcnJvciBpbnN0YW5jZW9mIEJhZEV2ZW50Q2FsbEV4Y2VwdGlvbiQxKSB7XHJcblx0XHRcdFx0Ly8gaGFuZGxlXHJcblx0XHRcdH0gZWxzZSBpZiAoZXJyb3IgaW5zdGFuY2VvZiBDb21wb25lbnRzRXhjZXB0aW9uKSB7XHJcblx0XHRcdFx0Ly8gaGFuZGxlXHJcblx0XHRcdH0gZWxzZSBpZiAoZXJyb3IgaW5zdGFuY2VvZiBDb21wb25lbnROb3RSZWdpc3RlcmVkRXhjZXB0aW9uKSB7XHJcblx0XHRcdFx0Ly8gaGFuZGxlXHJcblx0XHRcdH0gZWxzZSBpZiAoZXJyb3IgaW5zdGFuY2VvZiBOb3RJblBhZ2VSYW5nZUV4Y2VwdGlvbikge1xyXG5cdFx0XHRcdC8vIGhhbmRsZSBcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHJldHVybiB0cnVlO1xyXG5cdFx0fTtcclxuXHR9XHJcbn1cblxuLyoqXHJcbiAqIFRoZSBkZWZhdWx0IHNldHRpbmdzIG9mIHRoZSBmaWx0ZXIuXHJcbiAqL1xyXG5sZXQgZGVmYXVsdFNldHRpbmdzJDEgPSB7XHJcblx0ZWxlbWVudDogJy5maWx0ZXInLFxyXG5cdGRhdGE6IHt9LFxyXG5cdGNsYXNzOiAnY29sLXhzLTInLFxyXG5cdHdpZHRoOiAnJyxcclxuXHRoZWlnaHQ6ICcnLFxyXG59O1xyXG5cclxuXHJcbi8qKlxyXG4gKiBUaGUgRmlsdGVyIE9iamVjdCwgaGFuZGxlcyB0aGUgZmlsdGVyIG9mIHRoZSBwcm9kdWN0cy9zZXJ2aWNlcy5cclxuICovXHJcbmNsYXNzIEZpbHRlciBcclxue1xyXG5cdGNvbnN0cnVjdG9yKGNvbnRhaW5lcikgXHJcblx0e1xyXG5cdFx0dGhpcy5zZXR1cChkZWZhdWx0U2V0dGluZ3MkMSk7XHJcblx0fVxyXG5cclxuXHRzZXR1cChzZXR0aW5ncylcclxuXHR7XHJcblx0XHRpZih0eXBlb2Ygc2V0dGluZ3MgIT0gJ29iamVjdCcpIHtcclxuXHRcdFx0dGhyb3cgbmV3IEludmFsaWRBcmd1bWVudEV4Y2VwdGlvbiQxO1xyXG5cdFx0fVxyXG5cclxuXHRcdHRoaXMuc2V0dGluZ3MgPSBDb21tb24uZXh0ZW5kKGRlZmF1bHRTZXR0aW5ncyQxLCBzZXR0aW5ncyk7XHJcblxyXG5cdFx0dGhpcy5zZXRFbGVtZW50KHRoaXMuc2V0dGluZ3MuZWxlbWVudCk7XHJcblx0fVxyXG5cclxuXHRzZXRFbGVtZW50KHNlbGVjdG9yKVxyXG5cdHtcclxuXHRcdHRoaXMud3JhcHBlciA9IERPTS5lbGVtZW50KHNlbGVjdG9yKTtcclxuXHRcdFxyXG5cdFx0RE9NLmFkZENsYXNzKHRoaXMud3JhcHBlciwgdGhpcy5zZXR0aW5ncy5jbGFzcyk7XHJcblx0fVxyXG59XG5cbi8qKlxyXG4gKiBUaGUgZGVmYXVsdCBzZXR0aW5ncyBvZiBlYWNoIHByb2R1Y3QuXHJcbiAqL1xyXG5sZXQgZGVmYXVsdFNldHRpbmdzJDIgPSB7XHJcblx0ZWxlbWVudDogJy5wcm9kdWN0cycsXHJcblx0Y2xhc3M6ICcnLFxyXG5cdGl0ZW1fY2xhc3M6ICcnLFxyXG5cdGFkZF9idXR0b25fY2xhc3M6ICdidG4gYnRuLXByaW1hcnknLFxyXG5cdGZhdm9yaXRlX2J1dHRvbl9jbGFzczogJ2J0biBidG4tZGFuZ2VyJyxcclxuXHR3aWR0aDogJzIwMHB4JyxcclxuXHRoZWlnaHQ6ICcyNTBweCcsXHJcblx0YXR0cmlidXRlczogWyduYW1lJywgJ3ByaWNlJywgJ2RlbGl2ZXJ5VGltZScsICdpbWFnZSddLFxyXG5cdHVybDogJ3Byb2R1Y3RzLnBocCcsXHJcbn07XHJcblxyXG4vKipcclxuICogU3RvcmVzIHRoZSBjb250YWluZXIgb2JqZWN0LlxyXG4gKi9cclxubGV0IENvbnRhaW5lciQyO1xyXG5cclxuLyoqXHJcbiAqIFRoZSBQcm9kdWN0cyBPYmplY3QsIGhhbmRsZXMgdGhlIHByb2R1Y3RzLlxyXG4gKi9cclxuY2xhc3MgUHJvZHVjdHMgXHJcbntcclxuXHQvKipcclxuXHQgKiBJbml0YWxpemUgdGhlIENvbnRhaW5lci5cclxuXHQgKi9cclxuXHRjb25zdHJ1Y3Rvcihjb250YWluZXIpIFxyXG5cdHtcclxuXHRcdENvbnRhaW5lciQyID0gY29udGFpbmVyO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogU2V0cyB0aGUgZ2l2ZW4gc2V0dGluZ3MgZnJvbSB0aGUgdXNlci5cclxuXHQgKi9cclxuXHRzZXR1cChzZXR0aW5ncylcclxuXHR7XHJcblx0XHRkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgZnVuY3Rpb24oKSB7XHJcblx0XHRcdFxyXG5cdFx0aWYgKHR5cGVvZiBzZXR0aW5ncyAhPSAnb2JqZWN0Jykge1xyXG5cdFx0XHR0aHJvdyBuZXcgSW52YWxpZEFyZ3VtZW50RXhjZXB0aW9uJDE7XHJcblx0XHR9XHJcblxyXG5cdFx0dGhpcy5zZXR0aW5ncyA9IENvbW1vbi5leHRlbmQoZGVmYXVsdFNldHRpbmdzJDIsIHNldHRpbmdzKTtcclxuXHJcblx0XHR0aGlzLnNldEVsZW1lbnQodGhpcy5zZXR0aW5ncy5lbGVtZW50KTtcclxuXHJcblx0XHR0aGlzLmFkZFN0eWxlVGFnKCk7XHRcclxuXHRcdFxyXG5cdFx0dGhpcy5sb2FkUHJvZHVjdHMoKTtcclxuXHJcblx0XHR9LmJpbmQodGhpcykpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogTG9hZHMgdGhlIHByb2R1Y3RzIGFuZCByZXBsYWNlIHRoZW0gaW4gdGhlIGRpdiBjb250YWluZXIuXHJcblx0ICovXHJcblx0bG9hZFByb2R1Y3RzKClcclxuXHR7XHJcblx0XHRsZXQgcmVxdWVzdCA9IHRoaXMuZ2V0UHJvZHVjdHMoKTtcclxuXHRcdFx0XHJcblx0XHRyZXF1ZXN0LnRoZW4oZnVuY3Rpb24oaXRlbXMpIHtcclxuXHRcdFx0dGhpcy5yZXBsYWNlSXRlbXMoaXRlbXMpO1xyXG5cdFx0fS5iaW5kKHRoaXMpKS5jYXRjaChmdW5jdGlvbihlcnJvcikge1xyXG5cclxuXHRcdH0pO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogU2V0cyB0aGUgRE9NIGVsZW1lbnQgZm9yIHBvcHVsYXRpbmcgdGhlIHByb2R1Y3RzLlxyXG5cdCAqL1xyXG5cdHNldEVsZW1lbnQoc2VsZWN0b3IpXHJcblx0e1xyXG5cdFx0dGhpcy53cmFwcGVyID0gRE9NLmVsZW1lbnQoc2VsZWN0b3IpO1xyXG5cclxuXHRcdGlmICh0aGlzLndyYXBwZXIpIHtcclxuXHRcdFx0RE9NLmFkZENsYXNzKHRoaXMud3JhcHBlciwgdGhpcy5zZXR0aW5ncy5jbGFzcyk7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBSZXBsYWNlIGl0ZW1zIGluIHRoZSBjb250YWluZXIuXHJcblx0ICovXHJcblx0cmVwbGFjZUl0ZW1zKGl0ZW1zKSBcclxuXHR7XHJcblx0XHRpZiAoISBBcnJheS5pc0FycmF5KGl0ZW1zKSB8fCAoaXRlbXMubGVuZ3RoIDw9IDAgJiYgdHlwZW9mIGl0ZW1zWzBdID09ICdzdHJpbmcnKSkge1xyXG5cdFx0XHR0aHJvdyBuZXcgSW52YWxpZEFyZ3VtZW50RXhjZXB0aW9uJDE7XHJcblx0XHR9XHJcblxyXG5cdFx0bGV0IHByb2R1Y3RzID0gdGhpcy5idWlsZFByb2R1Y3RzKGl0ZW1zLCB0aGlzLnNldHRpbmdzLml0ZW1fY2xhc3MsICdkaXYnKTtcclxuXHJcblx0XHR0aGlzLndyYXBwZXIuaW5uZXJIVE1MID0gcHJvZHVjdHM7XHJcblxyXG5cdFx0cmV0dXJuIGl0ZW1zO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogTWFrZXMgYW4gQWpheCBjYWxsIHRvIHRoZSBzZXJ2ZXIgd2l0aG91dCBwYXJhbWV0ZXJzLlxyXG5cdCAqL1xyXG5cdGdldFByb2R1Y3RzKClcclxuXHR7XHJcblx0XHRyZXR1cm4gdGhpcy5hc2tTZXJ2ZXIoKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIE1ha2VzIGFuIEFqYXggY2FsbCB0byB0aGUgc2VydmVyLlxyXG5cdCAqL1xyXG5cdGdldFByb2R1Y3RzQnlQYWdlKHBhZ2VOdW1iZXIpIFxyXG5cdHtcclxuXHRcdHJldHVybiB0aGlzLmFza1NlcnZlcihwYWdlTnVtYmVyKTtcclxuXHR9XHJcblxyXG5cdGFza1NlcnZlcihwYWdlTnVtYmVyKVxyXG5cdHtcclxuXHRcdHBhZ2VOdW1iZXIgPSBwYWdlTnVtYmVyIHx8IG51bGw7XHJcblxyXG5cdFx0cmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xyXG5cclxuXHRcdFx0bGV0IHhociA9IG5ldyBYTUxIdHRwUmVxdWVzdCB8fCBuZXcgQWN0aXZlWE9iamVjdChcIk1pY3Jvc29mdC5YTUxIVFRQXCIpO1xyXG5cclxuXHRcdFx0aWYocGFnZU51bWJlcikge1xyXG5cdFx0XHRcdHhoci5vcGVuKCdHRVQnLCB0aGlzLnNldHRpbmdzLnVybCArICc/cGFnZT0nICsgcGFnZU51bWJlciwgdHJ1ZSk7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0eGhyLm9wZW4oJ0dFVCcsIHRoaXMuc2V0dGluZ3MudXJsLCB0cnVlKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0eGhyLnNldFJlcXVlc3RIZWFkZXIoJ0NvbnRlbnQtVHlwZScsICdhcHBsaWNhdGlvbi9qc29uJyk7XHJcblx0XHRcdFxyXG5cdFx0XHRsZXQgaW5zdGFuY2UgPSB0aGlzO1xyXG5cclxuXHRcdFx0eGhyLm9ucmVhZHlzdGF0ZWNoYW5nZSA9IGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRcdGlmICh0aGlzLnJlYWR5U3RhdGUgPT0gNCkge1xyXG5cdFx0XHRcdFx0aWYgKHRoaXMuc3RhdHVzID09IDIwMCkge1xyXG5cdFx0XHRcdFx0XHRpbnN0YW5jZS5jdXJyZW50SXRlbXMgPSAodGhpcy5yZXNwb25zZVRleHQgPT0gJycpID8gW10gOiBKU09OLnBhcnNlKHRoaXMucmVzcG9uc2VUZXh0KTtcclxuXHRcdFx0XHRcdFxyXG5cdFx0XHRcdFx0XHRpZihpbnN0YW5jZS5jdXJyZW50SXRlbXMubGVuZ3RoID09PSAwKSB7XHJcblx0XHRcdFx0XHRcdFx0cmVqZWN0KCdObyBJdGVtcyB3ZXJlIHJldHJpZXZlZCEnKTtcclxuXHRcdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBpbnN0YW5jZS5jdXJyZW50SXRlbXMubGVuZ3RoOyBpKyspIHtcclxuXHRcdFx0XHRcdFx0XHR2YXIgcHJvZHVjdCA9IGluc3RhbmNlLmN1cnJlbnRJdGVtc1tpXTtcclxuXHRcdFx0XHRcdFx0XHRpbnN0YW5jZS5BZnRlckxvYWRlZC5jYWxsKHRoaXMsIHByb2R1Y3QpO1xyXG5cdFx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0XHRyZXNvbHZlKGluc3RhbmNlLmN1cnJlbnRJdGVtcyk7XHJcblx0XHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0XHRyZWplY3QodGhpcy5zdGF0dXNUZXh0KTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9XHJcblx0XHRcdH07XHJcblxyXG5cdFx0XHR4aHIub25lcnJvciA9IGZ1bmN0aW9uKGVycm9yKSB7XHJcblx0XHRcdFx0cmVqZWN0KGVycm9yKTtcclxuXHRcdFx0fTtcclxuXHJcblx0XHRcdHhoci5zZW5kKG51bGwpO1xyXG5cdFx0fS5iaW5kKHRoaXMpKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEJ1aWxkcyB0aGUgaHRtbCBmb3IgdGhlIHByb2R1Y3RzLlxyXG5cdCAqL1xyXG5cdGJ1aWxkUHJvZHVjdHMoYXR0cmlidXRlc0NvbGxlY3Rpb24sIGNsYXNzTmFtZSwgdGFnVHlwZSkgXHJcblx0e1xyXG5cdFx0aWYoYXR0cmlidXRlc0NvbGxlY3Rpb24uY29uc3RydWN0b3IubmFtZSAhPSAnQXJyYXknICkge1xyXG5cdFx0XHR0aHJvdyBuZXcgSW52YWxpZEFyZ3VtZW50RXhjZXB0aW9uJDE7XHJcblx0XHR9XHJcblxyXG5cdFx0bGV0IGJ1aWx0UHJvZHVjdHMgPSAnJztcclxuXHJcblx0XHRhdHRyaWJ1dGVzQ29sbGVjdGlvbi5mb3JFYWNoKGZ1bmN0aW9uKGF0dHJpYnV0ZXMpIHtcclxuXHRcdFx0YnVpbHRQcm9kdWN0cyArPSB0aGlzLmJ1aWxkUHJvZHVjdChhdHRyaWJ1dGVzLCBjbGFzc05hbWUsIHRhZ1R5cGUpO1xyXG5cdFx0fS5iaW5kKHRoaXMpKTtcclxuXHJcblx0XHRyZXR1cm4gYnVpbHRQcm9kdWN0cztcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEJ1aWxkcyB0aGUgaHRtbCBmb3IgYSBzaW5nbGUgcHJvZHVjdC5cclxuXHQgKi9cclxuXHRidWlsZFByb2R1Y3QoYXR0cmlidXRlcywgY2xhc3NOYW1lLCB0YWdUeXBlKSBcclxuXHR7XHJcblx0XHRpZiAodHlwZW9mIGF0dHJpYnV0ZXMgIT0gJ29iamVjdCcgfHwgdHlwZW9mIHRhZ1R5cGUgIT0gJ3N0cmluZycpIHtcclxuXHRcdFx0dGhyb3cgbmV3IEludmFsaWRBcmd1bWVudEV4Y2VwdGlvbiQxO1xyXG5cdFx0fVxyXG5cclxuXHRcdGNsYXNzTmFtZSA9IGNsYXNzTmFtZSB8fCBudWxsO1xyXG5cclxuXHRcdGxldCBwcm9kdWN0ID0gRE9NLmNyZWF0ZUVsZW1lbnQoJ2RpdicsIHtcclxuXHRcdFx0Y2xhc3M6ICdwcm9kdWN0J1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0RE9NLmFkZENsYXNzKHByb2R1Y3QsIGNsYXNzTmFtZSk7XHJcblxyXG5cdFx0bGV0IG92ZXJsYXkgPSBET00uY3JlYXRlRWxlbWVudCgnZGl2Jywge1xyXG5cdFx0XHRjbGFzczogJ3Byb2R1Y3Qtb3ZlcmxheScsXHJcblx0XHR9KTtcclxuXHJcblx0XHRwcm9kdWN0LmFwcGVuZENoaWxkKG92ZXJsYXkpO1xyXG5cclxuXHRcdGZvciAodmFyIGF0dHJpYnV0ZSBpbiBhdHRyaWJ1dGVzKSB7XHJcblx0XHRcdGlmICghIENvbW1vbi5pbl9hcnJheShhdHRyaWJ1dGUsIHRoaXMuc2V0dGluZ3MuYXR0cmlidXRlcykpIHtcclxuXHRcdFx0XHRjb250aW51ZTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0bGV0IHRhZyA9IERPTS5jcmVhdGVFbGVtZW50KHRhZ1R5cGUpO1xyXG5cclxuXHRcdFx0aWYgKGF0dHJpYnV0ZSA9PSAnaW1hZ2UnKSB7XHJcblx0XHRcdFx0bGV0IGltYWdlID0gRE9NLmNyZWF0ZUVsZW1lbnQoJ2ltZycsIHtcclxuXHRcdFx0XHRcdHNyYzogYXR0cmlidXRlc1thdHRyaWJ1dGVdXHJcblx0XHRcdFx0fSk7XHJcblx0XHRcdFx0cHJvZHVjdC5hcHBlbmRDaGlsZChpbWFnZSk7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0dGFnLmlubmVySFRNTCA9IGF0dHJpYnV0ZXNbYXR0cmlidXRlXSB8fCAnJztcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0RE9NLmFkZENsYXNzKHRhZywgJ3Byb2R1Y3QtJyArIENvbW1vbi5rZWJhYkNhc2UoYXR0cmlidXRlKSk7XHJcblx0XHRcdG92ZXJsYXkuYXBwZW5kQ2hpbGQodGFnKTtcclxuXHRcdH1cclxuXHJcblx0XHRsZXQgdGFnID0gRE9NLmNyZWF0ZUVsZW1lbnQoJ2RpdicsIHtcclxuXHRcdFx0aWQ6ICdhY3Rpb25CdXR0b25zJyxcclxuXHRcdFx0Y2xhc3M6ICdhY3Rpb24tYnV0dG9ucydcclxuXHRcdH0pO1xyXG5cclxuXHRcdGxldCBhZGRUb0NhcnQgPSBET00uY3JlYXRlRWxlbWVudCgnYnV0dG9uJywge1xyXG5cdFx0XHRpZDogJ2FkZFRvQ2FydCcsXHJcblx0XHRcdGNsYXNzOiB0aGlzLnNldHRpbmdzLmFkZF9idXR0b25fY2xhc3MsXHJcblx0XHRcdHR5cGU6ICdidXR0b24nLFxyXG5cdFx0XHR0ZXh0OiAnKycsXHJcblx0XHR9KTtcclxuXHJcblx0XHRsZXQgZmF2b3JpdGUgPSBET00uY3JlYXRlRWxlbWVudCgnYnV0dG9uJywge1xyXG5cdFx0XHRpZDogJ2Zhdm9yaXRlJyxcclxuXHRcdFx0Y2xhc3M6IHRoaXMuc2V0dGluZ3MuZmF2b3JpdGVfYnV0dG9uX2NsYXNzLFxyXG5cdFx0XHR0eXBlOiAnYnV0dG9uJyxcclxuXHRcdFx0dGV4dDogJyZoZWFydHM7J1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0dGFnLmFwcGVuZENoaWxkKGFkZFRvQ2FydCk7XHJcblx0XHR0YWcuYXBwZW5kQ2hpbGQoZmF2b3JpdGUpO1xyXG5cclxuXHRcdG92ZXJsYXkuYXBwZW5kQ2hpbGQodGFnKTtcclxuXHJcblx0XHRyZXR1cm4gcHJvZHVjdC5vdXRlckhUTUw7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBBbiBldmVudCBmb3IgdGhlIGNsaWVudCBvZiB3aGVuIHRoZSBwcm9kdWN0cyBhcyBiZWVuIGxvYWRlZC5cclxuXHQgKi9cclxuXHRBZnRlckxvYWRlZChwcm9kdWN0KSBcclxuXHR7XHJcblx0XHQvL1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQWRkIHRoZSBlQ29tbWVyY2Ugc3R5bGUgdGFncyB0byB0aGUgRE9NLlxyXG5cdCAqL1xyXG5cdGFkZFN0eWxlVGFnKCkgXHJcblx0e1xyXG5cdFx0aWYoRE9NLmVsZW1lbnQoJyNlQ29tbWVyY2UtUHJvZHVjdHMnKSkge1xyXG5cdFx0XHRyZXR1cm47XHJcblx0XHR9XHJcblxyXG5cdFx0bGV0IGNzcyA9IGBcclxuXHRcdFx0LnByb2R1Y3Qge1xyXG5cdFx0XHRcdHBvc2l0aW9uOiByZWxhdGl2ZTtcclxuXHRcdFx0XHRtYXJnaW46IDVweCA1cHg7XHJcblx0XHRcdFx0Ym9yZGVyOiAxcHggc29saWQgI2U0ZTRlNDtcclxuXHRcdFx0XHR3aWR0aDogJHt0aGlzLnNldHRpbmdzLndpZHRofTtcclxuXHRcdFx0XHRoZWlnaHQ6ICR7dGhpcy5zZXR0aW5ncy5oZWlnaHR9O1xyXG5cdFx0XHRcdGN1cnNvcjogcG9pbnRlcjtcclxuXHRcdFx0XHRjb2xvcjogI2ZmZmZmZjtcclxuXHRcdFx0XHRvdmVyZmxvdzogaGlkZGVuO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHQucHJvZHVjdCA+IC5wcm9kdWN0LW92ZXJsYXkge1xyXG5cdFx0XHRcdHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuXHRcdFx0XHR0b3A6IDA7XHJcblx0XHRcdFx0bGVmdDogMDtcclxuXHRcdFx0XHR3aWR0aDogMTAwJTtcclxuXHRcdFx0XHRoZWlnaHQ6IDEwMCU7XHJcblx0XHRcdFx0b3BhY2l0eTogMC41O1xyXG5cdFx0XHRcdHotaW5kZXg6IDU7XHJcblx0XHRcdFx0dHJhbnNpdGlvbjogMXMgYWxsO1xyXG5cdFx0XHRcdHRyYW5zZm9ybTogdHJhbnNsYXRlWCgtMjUwcHgpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHQucHJvZHVjdDpob3ZlciA+IC5wcm9kdWN0LW92ZXJsYXkge1xyXG5cdFx0XHRcdGJhY2tncm91bmQ6IHJnYmEoMCwgMCwgMCwgMC40NSk7XHJcblx0XHRcdFx0dHJhbnNmb3JtOiB0cmFuc2xhdGVYKDBweCk7XHJcblx0XHRcdFx0b3BhY2l0eTogMTtcclxuXHRcdFx0XHR0cmFuc2l0aW9uOiAxcyBhbGw7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdC5wcm9kdWN0ID4gaW1nIHtcclxuXHRcdFx0XHRwb3NpdGlvbjogYWJzb2x1dGU7XHJcblx0XHRcdFx0bGVmdDogMDtcclxuXHRcdFx0XHR0b3A6IDA7XHJcblx0XHRcdFx0d2lkdGg6IDEwMCU7XHJcblx0XHRcdFx0aGVpZ2h0OiAxMDAlO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHQucHJvZHVjdCA+IC5wcm9kdWN0LWltYWdlIHtcclxuXHRcdFx0XHR6LWluZGV4OiAwO1xyXG5cdFx0XHRcdHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuXHRcdFx0XHR0b3A6IDA7XHJcblx0XHRcdFx0bGVmdDogMDtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0LnByb2R1Y3QgPiAucHJvZHVjdC1vdmVybGF5ID4gLnByb2R1Y3QtbmFtZSwgXHJcblx0XHRcdC5wcm9kdWN0ID4gLnByb2R1Y3Qtb3ZlcmxheSA+IC5wcm9kdWN0LXByaWNlLFxyXG5cdFx0XHQucHJvZHVjdCA+IC5wcm9kdWN0LW92ZXJsYXkgPiAucHJvZHVjdC1kZWxpdmVyeS10aW1lIHtcclxuXHRcdFx0XHR6LWluZGV4OiAxO1xyXG5cdFx0XHRcdHBvc2l0aW9uOiByZWxhdGl2ZTtcclxuXHRcdFx0XHR0ZXh0LWFsaWduOiBjZW50ZXI7XHJcblx0XHRcdFx0bWFyZ2luLXRvcDogMjVweDtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0LnByb2R1Y3QgPiAucHJvZHVjdC1vdmVybGF5ID4gLmFjdGlvbi1idXR0b25zIHtcclxuXHRcdFx0XHR3aWR0aDogMTAwJTtcclxuXHRcdFx0XHRtYXJnaW4tdG9wOiAxMHB4O1xyXG5cdFx0XHRcdHRleHQtYWxpZ246IGNlbnRlcjtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0LnByb2R1Y3QgPiAucHJvZHVjdC1vdmVybGF5ID4gLmFjdGlvbi1idXR0b25zID4gI2Zhdm9yaXRlIHtcclxuXHRcdFx0XHRtYXJnaW4tbGVmdDogMTBweDtcclxuXHRcdFx0fVxyXG5cclxuXHRcdGA7XHJcblx0ICAgIFxyXG5cdCAgICBET00uYWRkU3R5bGUoJ2VDb21tZXJjZS1Qcm9kdWN0cycsIGNzcyk7XHJcblx0fVxyXG59XG5cbi8qKlxyXG4gKiBUaGUgU2VydmljZXMgT2JqZWN0LCBoYW5kbGVzIHRoZSBzZXJ2aWNlcy5cclxuICovXHJcbmNsYXNzIFNlcnZpY2VzIFxyXG57XHJcblxyXG59XG5cbi8qKlxyXG4gKiBUaGUgZGVmYXVsdCBzZXR0aW5ncyBvZiB0aGUgcGFnaW5hdGlvbi5cclxuICovXHJcbmxldCBkZWZhdWx0U2V0dGluZ3MkMyA9IHtcclxuXHRlbGVtZW50OiAnLnBhZ2luYXRpb24tbGlua3MnLFxyXG5cdGNsYXNzOiAnY29sLXhzLW9mZnNldC00IGNvbC14cy04JyxcclxuXHRwZXJfcGFnZTogNSxcclxuXHR0b3RhbF9pdGVtczogMTAsXHJcbn07XHJcblxyXG4vKipcclxuICogU3RvcmVzIHRoZSBjb250YWluZXIgb2JqZWN0LlxyXG4gKi9cclxubGV0IENvbnRhaW5lciQzO1xyXG5cclxuLyoqXHJcbiAqIFN0b3JlcyB0aGUgcHJvZHVjdHMgY29tcG9uZW50LlxyXG4gKi9cclxubGV0IFByb2R1Y3RzJDI7XHJcblxyXG4vKipcclxuICogVGhlIFBhZ2luYXRpb24gT2JqZWN0LCBoYW5kbGVzIHRoZSBwYWdpbmF0aW9uLlxyXG4gKi9cclxuY2xhc3MgUGFnaW5hdGlvbiBcclxue1xyXG5cdC8qKlxyXG5cdCAqIEluaXRpYWxpemUgdGhlIGNvbnRhaW5lciBvYmplY3QgYW5kIHRoZSBkZWZhdWx0IHNldHRpbmdzLlxyXG5cdCAqL1xyXG5cdGNvbnN0cnVjdG9yKGNvbnRhaW5lciwgcHJvZHVjdHMpIFxyXG5cdHtcclxuXHRcdENvbnRhaW5lciQzID0gY29udGFpbmVyO1xyXG5cdFx0UHJvZHVjdHMkMiA9IHByb2R1Y3RzO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogU2V0IHRoZSBQYWdpbmF0aW9uIG9iamVjdCB1cC5cclxuXHQgKi9cclxuXHRzZXR1cChzZXR0aW5ncylcclxuXHR7XHJcblx0XHRkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgZnVuY3Rpb24oKSB7XHJcblxyXG5cdFx0aWYodHlwZW9mIHNldHRpbmdzICE9ICdvYmplY3QnKSB7XHJcblx0XHRcdHRocm93IG5ldyBJbnZhbGlkQXJndW1lbnRFeGNlcHRpb24kMTtcclxuXHRcdH1cclxuXHJcblx0XHR0aGlzLnNldHRpbmdzID0gQ29tbW9uLmV4dGVuZChkZWZhdWx0U2V0dGluZ3MkMywgc2V0dGluZ3MpO1xyXG5cclxuXHRcdHRoaXMudG90YWxQYWdlcyA9IHRoaXMuY2FsY3VsYXRlVG90YWxQYWdlcyh0aGlzLnNldHRpbmdzLnBlcl9wYWdlLCB0aGlzLnNldHRpbmdzLnRvdGFsX2l0ZW1zKTtcclxuXHRcdFxyXG5cdFx0dGhpcy5zZXRFbGVtZW50KHRoaXMuc2V0dGluZ3MuZWxlbWVudCk7XHJcblx0XHR0aGlzLnJlcGxhY2VMaW5rcyh0aGlzLmxpbmtzKTtcclxuXHJcblx0XHR9LmJpbmQodGhpcykpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogU2V0cyB0aGUgd3JhcHBlciBlbGVtZW50LlxyXG5cdCAqL1xyXG5cdHNldEVsZW1lbnQoc2VsZWN0b3IpXHJcblx0e1xyXG5cdFx0dGhpcy53cmFwcGVyID0gRE9NLmVsZW1lbnQoc2VsZWN0b3IpO1xyXG5cdFx0XHJcblx0XHRET00uYWRkQ2xhc3ModGhpcy53cmFwcGVyLCB0aGlzLnNldHRpbmdzLmNsYXNzKTtcclxuXHJcblx0XHR0aGlzLmxpbmtzID0gdGhpcy5jcmVhdGVMaW5rcygpO1xyXG5cdFx0dGhpcy5iaW5kRXZlbnRMaXN0ZW5lcnModGhpcy5saW5rcyk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBSZXBsYWNlcyB0aGUgbGlua3MgaW4gdGhlIHdyYXBwZXIuXHJcblx0ICovXHJcblx0cmVwbGFjZUxpbmtzKGxpbmtzKVxyXG5cdHtcclxuXHRcdHRoaXMud3JhcHBlci5pbm5lckhUTUwgPSAnJztcclxuXHRcdHRoaXMud3JhcHBlci5hcHBlbmRDaGlsZChsaW5rcyk7XHJcblx0fVxyXG5cclxuXHRjYWxjdWxhdGVUb3RhbFBhZ2VzKHBlclBhZ2UsIHRvdGFsSXRlbXMpXHJcblx0e1xyXG5cdFx0cGVyUGFnZSA9IHBhcnNlSW50KHBlclBhZ2UpO1xyXG5cdFx0dG90YWxJdGVtcyA9IHBhcnNlSW50KHRvdGFsSXRlbXMpO1xyXG5cclxuXHRcdHJldHVybiBNYXRoLmNlaWwodG90YWxJdGVtcyAvIHBlclBhZ2UpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQmluZHMgdGhlIGJ1dHRvbnMgZXZlbnRzIGxpc3RlbmVycy5cclxuXHQgKi9cclxuXHRiaW5kRXZlbnRMaXN0ZW5lcnMobGlua3MpIFxyXG5cdHtcclxuXHRcdGxldCBpbnN0YW5jZSA9IHRoaXM7XHJcblxyXG5cdFx0dGhpcy5uZXh0LmNoaWxkTm9kZXNbMF0ub25jbGljayA9IGZ1bmN0aW9uKGV2ZW50KSB7XHJcblx0XHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG5cdFx0XHRsZXQgcmVxdWVzdGVkUGFnZSA9IGluc3RhbmNlLmN1cnJlbnQrMTtcclxuXHJcblx0XHRcdGlmKGluc3RhbmNlLm5vdEluUGFnZVJhbmdlKHJlcXVlc3RlZFBhZ2UpKSB7XHJcblx0XHRcdFx0dGhyb3cgbmV3IE5vdEluUGFnZVJhbmdlRXhjZXB0aW9uO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRQcm9kdWN0cyQyLmdldFByb2R1Y3RzQnlQYWdlKHJlcXVlc3RlZFBhZ2UpLnRoZW4oZnVuY3Rpb24ocHJvZHVjdHMpIHtcclxuXHRcdFx0XHRQcm9kdWN0cyQyLnJlcGxhY2VJdGVtcyhwcm9kdWN0cyk7XHJcblx0XHRcdH0pO1xyXG5cclxuXHRcdFx0aW5zdGFuY2Uuc2V0Q3VycmVudChyZXF1ZXN0ZWRQYWdlKTtcclxuXHRcdH07XHJcblxyXG5cdFx0dGhpcy5wcmV2aW91cy5jaGlsZE5vZGVzWzBdLm9uY2xpY2sgPSBmdW5jdGlvbihldmVudCkge1xyXG5cdFx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuXHRcdFx0bGV0IHJlcXVlc3RlZFBhZ2UgPSBpbnN0YW5jZS5jdXJyZW50LTE7XHJcblxyXG5cdFx0XHRpZihpbnN0YW5jZS5ub3RJblBhZ2VSYW5nZShyZXF1ZXN0ZWRQYWdlKSkge1xyXG5cdFx0XHRcdHRocm93IG5ldyBOb3RJblBhZ2VSYW5nZUV4Y2VwdGlvbjtcclxuXHRcdFx0fVxyXG5cdFx0XHRcclxuXHRcdFx0UHJvZHVjdHMkMi5nZXRQcm9kdWN0c0J5UGFnZShyZXF1ZXN0ZWRQYWdlKS50aGVuKGZ1bmN0aW9uKHByb2R1Y3RzKSB7XHJcblx0XHRcdFx0UHJvZHVjdHMkMi5yZXBsYWNlSXRlbXMocHJvZHVjdHMpO1xyXG5cdFx0XHR9KTtcclxuXHJcblx0XHRcdGluc3RhbmNlLnNldEN1cnJlbnQocmVxdWVzdGVkUGFnZSk7XHJcblx0XHR9O1xyXG5cclxuXHRcdGZvcih2YXIgaSA9IDA7IGkgPCB0aGlzLnBhZ2VzLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdHRoaXMucGFnZXNbaV0uY2hpbGROb2Rlc1swXS5vbmNsaWNrID0gZnVuY3Rpb24oZXZlbnQpIHtcclxuXHRcdFx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdFx0XHRcdFxyXG5cdFx0XHRcdGxldCByZXF1ZXN0ZWRQYWdlID0gdGhpcy5nZXRBdHRyaWJ1dGUoJ2RhdGEtcGFnZS1ucicpO1xyXG5cdFx0XHRcdFxyXG5cdFx0XHRcdFByb2R1Y3RzJDIuZ2V0UHJvZHVjdHNCeVBhZ2UocmVxdWVzdGVkUGFnZSkudGhlbihmdW5jdGlvbihwcm9kdWN0cykge1xyXG5cdFx0XHRcdFx0UHJvZHVjdHMkMi5yZXBsYWNlSXRlbXMocHJvZHVjdHMpO1xyXG5cdFx0XHRcdH0pO1xyXG5cdFx0XHRcdFxyXG5cdFx0XHRcdGluc3RhbmNlLnNldEN1cnJlbnQocmVxdWVzdGVkUGFnZSk7XHJcblx0XHRcdH07XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBTZXRzIHRoZSBjdXJyZW50IHBhZ2UuXHJcblx0ICovXHJcblx0c2V0Q3VycmVudChwYWdlTnVtYmVyKSBcclxuXHR7XHJcblx0XHR0aGlzLmN1cnJlbnQgPSBwYXJzZUludChwYWdlTnVtYmVyKTtcclxuXHRcdHRoaXMuY2hhbmdlVXJsKHBhZ2VOdW1iZXIpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogR2V0cyB0aGUgY3VycmVudCBwYWdlLlxyXG5cdCAqL1xyXG5cdGdldEN1cnJlbnQoKSBcclxuXHR7XHJcblx0XHRyZXR1cm4gdGhpcy5jdXJyZW50O1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQ3JlYXRlcyB0aGUgcGFnaW5hdGlvbiBsaW5rcy5cclxuXHQgKi9cclxuXHRjcmVhdGVMaW5rcygpIFxyXG5cdHtcdFxyXG5cdFx0bGV0IHVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndWwnKTtcclxuXHRcdFxyXG5cdFx0dGhpcy5wYWdlcyA9IHRoaXMuY3JlYXRlUGFnZUxpbmtzKCk7XHJcblx0XHR0aGlzLnByZXZpb3VzID0gdGhpcy5jcmVhdGVQcmV2aW91c0J1dHRvbigpO1xyXG5cdFx0dGhpcy5uZXh0ID0gdGhpcy5jcmVhdGVOZXh0QnV0dG9uKCk7XHJcblxyXG5cdFx0dWwuY2xhc3NOYW1lID0gJ3BhZ2luYXRpb24nO1xyXG5cdFx0dWwuYXBwZW5kQ2hpbGQodGhpcy5wcmV2aW91cyk7XHJcblxyXG5cdFx0dGhpcy5wYWdlcy5mb3JFYWNoKGZ1bmN0aW9uKHBhZ2UpIHtcclxuXHRcdFx0dWwuYXBwZW5kQ2hpbGQocGFnZSk7XHJcblx0XHR9KTtcclxuXHJcblx0XHR1bC5hcHBlbmRDaGlsZCh0aGlzLm5leHQpO1xyXG5cclxuXHRcdHJldHVybiB1bDtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIENyZWF0ZXMgdGhlIHBhZ2VzIGl0ZW0gbGlua3MuXHJcblx0ICovXHJcblx0Y3JlYXRlUGFnZUxpbmtzKCkgXHJcblx0e1xyXG5cdFx0dmFyIHBhZ2VzID0gW107XHJcblxyXG5cdFx0Zm9yKHZhciBpID0gMTsgaSA8PSB0aGlzLnRvdGFsUGFnZXM7IGkrKykge1xyXG5cdFx0XHR2YXIgcGFnZUl0ZW0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaScpO1xyXG5cdFx0XHR2YXIgbGluayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKTtcclxuXHRcdFx0cGFnZUl0ZW0uY2xhc3NOYW1lID0gJ3BhZ2UtaXRlbSc7XHJcblx0XHRcdGxpbmsuY2xhc3NOYW1lID0gJ3BhZ2UtbGluayc7XHJcblx0XHRcdGxpbmsuc2V0QXR0cmlidXRlKCdocmVmJywgJz9wYWdlPScrIGkpO1xyXG5cdFx0XHRsaW5rLnNldEF0dHJpYnV0ZSgnZGF0YS1wYWdlLW5yJywgaSk7XHJcblx0XHRcdGxpbmsuaW5uZXJIVE1MID0gaTtcclxuXHRcdFx0cGFnZUl0ZW0uYXBwZW5kQ2hpbGQobGluayk7XHJcblx0XHRcdHBhZ2VzLnB1c2gocGFnZUl0ZW0pO1xyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiBwYWdlcztcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIENyZWF0ZXMgdGhlIHByZXZpb3VzIGJ1dHRvbiBsaW5rLlxyXG5cdCAqL1xyXG5cdGNyZWF0ZVByZXZpb3VzQnV0dG9uKCkgXHJcblx0e1xyXG5cdFx0dmFyIGxpID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKTtcclxuXHRcdHZhciBsaW5rID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpO1xyXG5cdFx0dmFyIHNwYW4xID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xyXG5cdFx0dmFyIHNwYW4yID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xyXG5cdFx0XHJcblx0XHRcclxuXHRcdGxpLmNsYXNzTmFtZSA9ICdwYWdlLWl0ZW0nO1xyXG5cdFx0bGluay5jbGFzc05hbWUgPSAncGFnZS1saW5rJztcclxuXHRcdHNwYW4yLmNsYXNzTmFtZSA9ICdzci1vbmx5JztcclxuXHJcblx0XHRsaW5rLnNldEF0dHJpYnV0ZSgnaHJlZicsICcnKTtcclxuXHRcdGxpbmsuc2V0QXR0cmlidXRlKCdhcmlhLWxhYmVsJywgJ1ByZXZpb3VzJyk7XHJcblx0XHRzcGFuMS5zZXRBdHRyaWJ1dGUoJ2FyaWEtaGlkZGVuJywgJ3RydWUnKTtcclxuXHJcblx0XHRzcGFuMS5pbm5lckhUTUwgPSAnJmxhcXVvOyc7XHJcblx0XHRzcGFuMi5pbm5lckhUTUwgPSAnUHJldmlvdXMnO1xyXG5cclxuXHRcdGxpbmsuYXBwZW5kQ2hpbGQoc3BhbjEpO1xyXG5cdFx0bGluay5hcHBlbmRDaGlsZChzcGFuMik7XHJcblx0XHRsaS5hcHBlbmRDaGlsZChsaW5rKTtcclxuXHJcblx0XHRyZXR1cm4gbGk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBDcmVhdGVzIHRoZSBuZXh0IGJ1dHRvbiBsaW5rLlxyXG5cdCAqL1xyXG5cdGNyZWF0ZU5leHRCdXR0b24oKSBcclxuXHR7XHJcblx0XHR2YXIgbGkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaScpO1xyXG5cdFx0dmFyIGxpbmsgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJyk7XHJcblx0XHR2YXIgc3BhbjEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XHJcblx0XHR2YXIgc3BhbjIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XHJcblx0XHRcclxuXHRcdGxpLmNsYXNzTmFtZSA9ICdwYWdlLWl0ZW0nO1xyXG5cdFx0bGluay5jbGFzc05hbWUgPSAncGFnZS1saW5rJztcclxuXHRcdHNwYW4yLmNsYXNzTmFtZSA9ICdzci1vbmx5JztcclxuXHJcblx0XHRsaW5rLnNldEF0dHJpYnV0ZSgnaHJlZicsICcnKTtcclxuXHRcdGxpbmsuc2V0QXR0cmlidXRlKCdhcmlhLWxhYmVsJywgJ05leHQnKTtcclxuXHRcdHNwYW4xLnNldEF0dHJpYnV0ZSgnYXJpYS1oaWRkZW4nLCAndHJ1ZScpO1xyXG5cclxuXHRcdHNwYW4xLmlubmVySFRNTCA9ICcmcmFxdW87JztcclxuXHRcdHNwYW4yLmlubmVySFRNTCA9ICdOZXh0JztcclxuXHJcblx0XHRsaW5rLmFwcGVuZENoaWxkKHNwYW4xKTtcclxuXHRcdGxpbmsuYXBwZW5kQ2hpbGQoc3BhbjIpO1xyXG5cdFx0bGkuYXBwZW5kQ2hpbGQobGluayk7XHJcblxyXG5cdFx0cmV0dXJuIGxpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQ2hlY2tzIGlmIHRoZSBnaXZlbiBwYWdlIGlzIGluIHJhbmdlLlxyXG5cdCAqL1xyXG5cdG5vdEluUGFnZVJhbmdlKHBhZ2VOdW1iZXIpIFxyXG5cdHtcclxuXHRcdHJldHVybiAocGFnZU51bWJlciA+IHRoaXMudG90YWxQYWdlcyB8fCBwYWdlTnVtYmVyIDw9IDApIHx8IGlzTmFOKHBhZ2VOdW1iZXIpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQ2hhbmdlcyB0aGUgdXJsIHRvIGEgZ2l2ZW4gcGFnZSBudW1iZXIuXHJcblx0ICovXHJcblx0Y2hhbmdlVXJsKHBhZ2VOdW1iZXIpIFxyXG5cdHtcclxuXHRcdHBhZ2VOdW1iZXIgPSAgcGFnZU51bWJlciB8fCBHRVRfVmFycygpWydwYWdlJ107XHJcblx0XHR3aW5kb3cuaGlzdG9yeS5yZXBsYWNlU3RhdGUoJycsICcnLCB0aGlzLnVwZGF0ZVVSTFBhcmFtZXRlcih3aW5kb3cubG9jYXRpb24uaHJlZiwgJ3BhZ2UnLCBwYWdlTnVtYmVyKSk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBHZXQgdGhlIGdldCB2YXJpYWJsZXMgZnJvbSB0aGUgdXJsLlxyXG5cdCAqL1xyXG5cdEdFVF9WYXJzKCkgXHJcblx0e1xyXG5cdFx0dmFyIHZhcnMgPSB7fTtcclxuXHRcdHZhciBwYXJ0cyA9IHdpbmRvdy5sb2NhdGlvbi5ocmVmLnJlcGxhY2UoL1s/Jl0rKFtePSZdKyk9KFteJl0qKS9naSwgZnVuY3Rpb24obSwga2V5LCB2YWx1ZSkge1xyXG5cdFx0XHR2YXJzW2tleV0gPSB2YWx1ZTtcclxuXHRcdH0pO1xyXG5cclxuXHRcdHJldHVybiB2YXJzO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogTW9kaWZpZXMgdGhlIGdldCBwYXJhbWV0ZXIgaW4gdGhlIHVybC5cclxuXHQgKi9cclxuXHR1cGRhdGVVUkxQYXJhbWV0ZXIodXJsLCBwYXJhbSwgcGFyYW1WYWwpIFxyXG5cdHtcclxuXHQgICAgdmFyIG5ld0FkZGl0aW9uYWxVUkwgPSBcIlwiO1xyXG5cdCAgICB2YXIgdGVtcEFycmF5ID0gdXJsLnNwbGl0KFwiP1wiKTtcclxuXHQgICAgdmFyIGJhc2VVUkwgPSB0ZW1wQXJyYXlbMF07XHJcblx0ICAgIHZhciBhZGRpdGlvbmFsVVJMID0gdGVtcEFycmF5WzFdO1xyXG5cdCAgICB2YXIgdGVtcCA9IFwiXCI7XHJcblxyXG5cdCAgICBpZiAoYWRkaXRpb25hbFVSTCkge1xyXG5cdCAgICAgICAgdGVtcEFycmF5ID0gYWRkaXRpb25hbFVSTC5zcGxpdChcIiZcIik7XHJcblx0ICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRlbXBBcnJheS5sZW5ndGg7IGkrKyl7XHJcblx0ICAgICAgICAgICAgaWYgKHRlbXBBcnJheVtpXS5zcGxpdCgnPScpWzBdICE9IHBhcmFtKXtcclxuXHQgICAgICAgICAgICAgICAgbmV3QWRkaXRpb25hbFVSTCArPSB0ZW1wICsgdGVtcEFycmF5W2ldO1xyXG5cdCAgICAgICAgICAgICAgICB0ZW1wID0gXCImXCI7XHJcblx0ICAgICAgICAgICAgfVxyXG5cdCAgICAgICAgfVxyXG5cdCAgICB9XHJcblxyXG5cdCAgICB2YXIgcm93c1RleHQgPSB0ZW1wICsgXCJcIiArIHBhcmFtICsgXCI9XCIgKyBwYXJhbVZhbDtcclxuXHQgICAgcmV0dXJuIGJhc2VVUkwgKyBcIj9cIiArIG5ld0FkZGl0aW9uYWxVUkwgKyByb3dzVGV4dDtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFJlc2V0cyB0aGUgcGFnaW5hdGlvbi5cclxuXHQgKi9cclxuXHRyZXNldCgpIFxyXG5cdHtcclxuXHRcdHRoaXMuc2V0Q3VycmVudCgxKTtcclxuXHRcdHRoaXMuY2hhbmdlVXJsKDEpO1xyXG5cdH1cclxufVxuXG4vKipcclxuICogVGhlIGRlZmF1bHQgc2V0dGluZ3Mgb2YgdGhlIGNhcnQuXHJcbiAqL1xyXG5sZXQgZGVmYXVsdFNldHRpbmdzJDQgPSB7XHJcblx0ZWxlbWVudDogJy5jYXJ0JyxcclxuXHRjb29raWVfbmFtZTogJ2NhcnQnLFxyXG5cdHByZXZpZXdfY2xhc3M6ICcnLFxyXG5cdGNsYXNzOiAnJyxcclxuXHR3aWR0aDogJzYwcHgnLFxyXG5cdGhlaWdodDogJzYwcHgnLFxyXG5cdHBsYWNlbWVudDogJ3JpZ2h0LXRvcCcsXHJcblx0Zml4ZWQ6IHRydWUsXHJcblx0aG92ZXJfY29sb3I6ICdvcmFuZ2UnXHJcbn07XHJcblxyXG4vKipcclxuICogU3RvcmVzIHRoZSBjb250YWluZXIgb2JqZWN0LlxyXG4gKi9cclxubGV0IENvbnRhaW5lciQ0O1xyXG5cclxuLyoqXHJcbiAqIFRoZSBDYXJ0IE9iamVjdCwgaGFuZGxlcyB0aGUgY2FydCBpY29uIGFuZCBzZXNzaW9ucy5cclxuICovXHJcbmNsYXNzIENhcnQgXHJcbntcclxuXHQvKipcclxuXHQgKiBJbml0aWFsaXplIHRoZSBkZWZhdWx0IHNldHRpbmdzLCBzZXR0aW5nIHRoZSBlbGVtZW50LFxyXG5cdCAqIGFuZCBjcmVhdGluZyB0aGUgcHJldmlldyBmb3IgdGhlIGNhcnRzIGRldGFpbHMuXHJcblx0ICovXHJcblx0Y29uc3RydWN0b3IoY29udGFpbmVyKSBcclxuXHR7XHJcblx0XHRDb250YWluZXIkNCA9IGNvbnRhaW5lcjtcclxuXHRcdFxyXG5cdFx0dGhpcy5wcmV2aWV3RWxlbWVudCA9IHRoaXMuY3JlYXRlUHJldmlld0VsZW1lbnQoKTtcclxuXHRcdHRoaXMuc3ZnSWNvbiA9IGNyZWF0ZUljb24uY2FsbCh0aGlzKTtcclxuXHRcdHRoaXMuaXRlbXMgPSBbXTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFNldHMgdGhlIG9iamVjdCBieSB0aGUgdXNlcnMgc2V0dGluZy5cclxuXHQgKi9cclxuXHRzZXR1cChzZXR0aW5ncylcclxuXHR7XHJcblx0XHRpZih0eXBlb2Ygc2V0dGluZ3MgIT0gJ29iamVjdCcpIHtcclxuXHRcdFx0dGhyb3cgbmV3IEludmFsaWRBcmd1bWVudEV4Y2VwdGlvbiQxO1xyXG5cdFx0fVxyXG5cclxuXHRcdHRoaXMuc2V0dGluZ3MgPSBDb21tb24uZXh0ZW5kKGRlZmF1bHRTZXR0aW5ncyQ0LCBzZXR0aW5ncyk7XHJcblxyXG5cdFx0dGhpcy5zZXRFbGVtZW50KHRoaXMuc2V0dGluZ3MuZWxlbWVudCk7XHJcblx0XHRET00uYWRkQ2xhc3ModGhpcy5wcmV2aWV3RWxlbWVudCwgJ2Nsb3NlZCcpO1xyXG5cdFx0RE9NLmFkZENsYXNzKHRoaXMucHJldmlld0VsZW1lbnQsIHRoaXMuc2V0dGluZ3MucHJldmlld19jbGFzcyk7XHJcblx0XHRcclxuXHRcdHRoaXMuYmluZEV2ZW50TGlzdGVuZXJzKCk7XHJcblx0XHR0aGlzLmFkZFN0eWxlVGFnKCk7XHJcblx0XHRcclxuXHRcdHRoaXMuc2V0Q2FydENvb2tpZSh0aGlzLnNldHRpbmdzLmNvb2tpZV9uYW1lKTtcclxuXHR9XHJcblxyXG5cdGFkZEl0ZW0oaXRlbSlcclxuXHR7XHJcblx0XHR0aGlzLml0ZW1zID0gQ29tbW9uLmdldENvb2tpZSgnY2FydCcpO1xyXG5cclxuXHRcdHRoaXMuaXRlbXMucHVzaChpdGVtKTtcclxuXHJcblx0XHRDb21tb24uY3JlYXRlQ29va2llKHRoaXMuc2V0dGluZ3MuY29va2llX25hbWUsIHRoaXMuaXRlbXMsIDIpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQmluZHMgZXZlcnRoaW5nIHRvIHRoZSBlbGVtZW50LlxyXG5cdCAqL1xyXG5cdHNldEVsZW1lbnQoc2VsZWN0b3IpXHJcblx0e1xyXG5cdFx0dGhpcy5pY29uID0gRE9NLmVsZW1lbnQoc2VsZWN0b3IpO1xyXG5cclxuXHRcdGlmICh0aGlzLmljb24pIHtcclxuXHRcdFx0RE9NLmFkZENsYXNzKHRoaXMuaWNvbiwgdGhpcy5zZXR0aW5ncy5jbGFzcyk7XHJcblx0XHRcdERPTS5hZGRDbGFzcyh0aGlzLmljb24sIHRoaXMuc2V0dGluZ3MucGxhY2VtZW50KTtcclxuXHRcdFx0dGhpcy5pY29uLmFwcGVuZENoaWxkKHRoaXMuc3ZnSWNvbik7XHJcblx0XHRcdHRoaXMuaWNvbi5hcHBlbmRDaGlsZCh0aGlzLnByZXZpZXdFbGVtZW50KTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIENyZWF0ZXMgdGhlIGNhcnQgZGV0YWlscyBwcmV2aWV3IGVsZW1lbnQuXHJcblx0ICovXHJcblx0Y3JlYXRlUHJldmlld0VsZW1lbnQoKVxyXG5cdHtcclxuXHRcdGxldCBwcmV2aWV3RWxlbWVudCA9IERPTS5jcmVhdGVFbGVtZW50KCdkaXYnLCB7XHJcblx0XHRcdGlkOiAncHJldmlldydcclxuXHRcdH0pO1xyXG5cclxuXHRcdHJldHVybiBwcmV2aWV3RWxlbWVudDtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEFkZCB0aGUgZUNvbW1lcmNlIHN0eWxlIHRhZ3MgdG8gdGhlIERPTS5cclxuXHQgKi9cclxuXHRhZGRTdHlsZVRhZygpIFxyXG5cdHtcclxuXHRcdGlmKERPTS5lbGVtZW50KCcjZUNvbW1lcmNlLUNhcnQnKSkge1xyXG5cdFx0XHRyZXR1cm47XHJcblx0XHR9XHJcblxyXG5cdFx0bGV0IHBvc2l0aW9uID0gKHRoaXMuc2V0dGluZ3MuZml4ZWQpID8gJ2ZpeGVkJyA6ICdhYnNvbHV0ZSc7XHJcblxyXG5cdFx0bGV0IGNzcyA9IGBcclxuXHRcdFx0JHt0aGlzLnNldHRpbmdzLmVsZW1lbnR9IHtcclxuXHRcdFx0XHRwb3NpdGlvbjogJHtwb3NpdGlvbn07XHJcblx0XHRcdFx0Y3Vyc29yOiBwb2ludGVyO1xyXG5cdFx0XHRcdGNvbG9yOiAjZmZmZmZmO1xyXG5cdFx0XHRcdHotaW5kZXg6IDk5ODtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0JHt0aGlzLnNldHRpbmdzLmVsZW1lbnR9ID4gc3ZnIHtcclxuXHRcdFx0XHR3aWR0aDogJHt0aGlzLnNldHRpbmdzLndpZHRofTtcclxuXHRcdFx0XHRoZWlnaHQ6ICR7dGhpcy5zZXR0aW5ncy5oZWlnaHR9O1xyXG5cdFx0XHRcdHRyYW5zaXRpb246IGZpbGwgMC4zcztcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0JHt0aGlzLnNldHRpbmdzLmVsZW1lbnR9ID4gc3ZnOmhvdmVyIHtcclxuXHRcdFx0XHRmaWxsOiAke3RoaXMuc2V0dGluZ3MuaG92ZXJfY29sb3J9O1xyXG5cdFx0XHRcdHRyYW5zaXRpb246IGZpbGwgMC4zcztcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0JHt0aGlzLnNldHRpbmdzLmVsZW1lbnR9LnRvcC1yaWdodCxcclxuXHRcdFx0JHt0aGlzLnNldHRpbmdzLmVsZW1lbnR9LnJpZ2h0LXRvcCB7XHJcblx0XHRcdFx0cmlnaHQ6IDEwcHg7XHJcblx0XHRcdFx0dG9wOiAxMHB4O1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHQke3RoaXMuc2V0dGluZ3MuZWxlbWVudH0ubGVmdC10b3AsXHJcblx0XHRcdCR7dGhpcy5zZXR0aW5ncy5lbGVtZW50fS50b3AtbGVmdCB7XHJcblx0XHRcdFx0bGVmdDogMTBweDtcclxuXHRcdFx0XHR0b3A6IDEwcHg7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdCR7dGhpcy5zZXR0aW5ncy5lbGVtZW50fSA+ICNwcmV2aWV3IHtcclxuXHRcdFx0XHRwb3NpdGlvbjogJHtwb3NpdGlvbn07XHJcblx0XHRcdFx0ei1pbmRleDogOTk5OTtcclxuXHRcdFx0XHR0b3A6IGNhbGMoMTBweCArICR7dGhpcy5zZXR0aW5ncy5oZWlnaHR9KTtcclxuXHRcdFx0XHR0cmFuc2Zvcm06IHRyYW5zbGF0ZVgoNjBweCk7XHJcblx0XHRcdFx0aGVpZ2h0OiA0MDBweDtcclxuXHRcdFx0XHR3aWR0aDogMzAwcHg7XHJcblx0XHRcdFx0Ym9yZGVyOiAxcHggc29saWQgI2U0ZTRlNDtcclxuXHRcdFx0XHRiYWNrZ3JvdW5kOiAjZmZmZmZmO1xyXG5cdFx0XHRcdHRyYW5zaXRpb246IHRyYW5zZm9ybSAxcywgdmlzaWJpbGl0eSAxcztcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0JHt0aGlzLnNldHRpbmdzLmVsZW1lbnR9ID4gI3ByZXZpZXcub3BlbmVkIHtcclxuXHRcdFx0XHR2aXNpYmlsaXR5OiB2aXNpYmxlO1xyXG5cdFx0XHRcdHRyYW5zZm9ybTogdHJhbnNsYXRlWCgtMjQwcHgpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHQke3RoaXMuc2V0dGluZ3MuZWxlbWVudH0gPiAjcHJldmlldy5jbG9zZWQge1xyXG5cdFx0XHRcdHZpc2liaWxpdHk6IGhpZGRlbjtcclxuXHRcdFx0XHR0cmFuc2Zvcm06IHRyYW5zbGF0ZVgoNjBweCk7XHJcblx0XHRcdH1cclxuXHRcdGA7XHJcblx0ICAgIFxyXG5cdCAgICBET00uYWRkU3R5bGUoJ2VDb21tZXJjZS1DYXJ0JywgY3NzKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEJpbmRzIGV2ZW50IGxpc3RlbmVycyB0byB0aGUgY2FydCBpY29uLlxyXG5cdCAqL1xyXG5cdGJpbmRFdmVudExpc3RlbmVycygpXHJcblx0e1xyXG5cdFx0aWYodGhpcy5zdmdJY29uID09IG51bGwpIHtcclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0fVxyXG5cclxuXHRcdHRoaXMuc3ZnSWNvbi5vbmNsaWNrID0gZnVuY3Rpb24oZXZlbnQpIHtcclxuXHRcdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuXHRcdFx0RE9NLnRvZ2dsZUNsYXNzKHRoaXMucHJldmlld0VsZW1lbnQsICdvcGVuZWQnLCAnY2xvc2VkJyk7XHJcblx0XHR9LmJpbmQodGhpcyk7XHJcblxyXG5cdFx0dGhpcy5wcmV2aWV3RWxlbWVudC5vbm1vdXNlb3V0ID0gZnVuY3Rpb24oZXZlbnQpIHtcclxuXHRcdFx0Y2xvc2UuY2FsbCh0aGlzLCBldmVudCk7XHJcblx0XHR9LmJpbmQodGhpcyk7XHJcblx0fVxyXG5cclxuXHRzZXRDYXJ0Q29va2llKG5hbWUpXHJcblx0e1xyXG5cdFx0aWYoQ29tbW9uLmdldENvb2tpZShuYW1lKSkge1xyXG5cdFx0XHRyZXR1cm47XHJcblx0XHR9XHJcblxyXG5cdFx0Q29tbW9uLmNyZWF0ZUNvb2tpZSgnY2FydCcsIFtdLCAyKTsgXHJcblx0fVxyXG59XHJcblxyXG5mdW5jdGlvbiBjbG9zZShldmVudCkge1xyXG5cdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcblx0RE9NLnN3aXRjaENsYXNzZXModGhpcy5wcmV2aWV3RWxlbWVudCwgJ29wZW5lZCcsICdjbG9zZWQnKTtcclxufVxyXG5cclxuZnVuY3Rpb24gY3JlYXRlSWNvbigpIHtcclxuXHRsZXQgc3ZnID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKFwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiwgXCJzdmdcIik7XHJcblx0bGV0IGcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50TlMoXCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiLCBcImdcIik7XHJcblx0bGV0IHBhdGggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50TlMoXCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiLCBcInBhdGhcIik7XHJcblxyXG5cdHN2Zy5zZXRBdHRyaWJ1dGUoJ3ZlcnNpb24nLCAnMS4xJyk7XHJcblx0c3ZnLnNldEF0dHJpYnV0ZSgneG1sbnMnLCAnaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnKTtcclxuXHRzdmcuc2V0QXR0cmlidXRlKCd4bWxuczp4bGluaycsICdodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rJyk7XHJcblx0c3ZnLnNldEF0dHJpYnV0ZSgneCcsICcwcHgnKTtcclxuXHRzdmcuc2V0QXR0cmlidXRlKCd5JywgJzBweCcpO1xyXG5cdHN2Zy5zZXRBdHRyaWJ1dGUoJ3dpZHRoJywgJzQ0Ni44NDNweCcpO1xyXG5cdHN2Zy5zZXRBdHRyaWJ1dGUoJ2hlaWdodCcsICc0NDYuODQzcHgnKTtcclxuXHRzdmcuc2V0QXR0cmlidXRlKCd2aWV3Qm94JywgJzAgMCA0NDYuODQzIDQ0Ni44NDMnKTtcclxuXHRzdmcuc2V0QXR0cmlidXRlKCdzdHlsZScsICdlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDQ0Ni44NDMgNDQ2Ljg0MzsnKTtcclxuXHRzdmcuc2V0QXR0cmlidXRlKCd4bWw6c3BhY2UnLCAncHJlc2VydmUnKTtcclxuXHJcblx0cGF0aC5zZXRBdHRyaWJ1dGUoJ2QnLCAnTTQ0NC4wOSw5My4xMDNjLTIuNjk4LTMuNjk5LTcuMDA2LTUuODg4LTExLjU4NC01Ljg4OEgxMDkuOTJjLTAuNjI1LDAtMS4yNDksMC4wMzgtMS44NSwwLjExOWwtMTMuMjc2LTM4LjI3Yy0xLjM3Ni0zLjk1OC00LjQwNi03LjExMy04LjMtOC42NDZMMTkuNTg2LDE0LjEzNGMtNy4zNzQtMi44ODctMTUuNjk1LDAuNzM1LTE4LjU5MSw4LjFjLTIuODkxLDcuMzY5LDAuNzMsMTUuNjk1LDguMSwxOC41OTFsNjAuNzY4LDIzLjg3Mmw3NC4zODEsMjE0LjM5OWMtMy4yODMsMS4xNDQtNi4wNjUsMy42NjMtNy4zMzIsNy4xODdsLTIxLjUwNiw1OS43MzljLTEuMzE4LDMuNjYzLTAuNzc1LDcuNzMzLDEuNDY4LDEwLjkxNmMyLjI0LDMuMTgzLDUuODgzLDUuMDc4LDkuNzczLDUuMDc4aDExLjA0NGMtNi44NDQsNy42MTYtMTEuMDQ0LDE3LjY0Ni0xMS4wNDQsMjguNjc1YzAsMjMuNzE4LDE5LjI5OCw0My4wMTIsNDMuMDEyLDQzLjAxMnM0My4wMTItMTkuMjk0LDQzLjAxMi00My4wMTJjMC0xMS4wMjktNC4yLTIxLjA1OS0xMS4wNDQtMjguNjc1aDkzLjc3NmMtNi44NDcsNy42MTYtMTEuMDQ4LDE3LjY0Ni0xMS4wNDgsMjguNjc1YzAsMjMuNzE4LDE5LjI5NCw0My4wMTIsNDMuMDEzLDQzLjAxMmMyMy43MTgsMCw0My4wMTItMTkuMjk0LDQzLjAxMi00My4wMTJjMC0xMS4wMjktNC4yLTIxLjA1OS0xMS4wNDMtMjguNjc1aDEzLjQzM2M2LjU5OSwwLDExLjk0Ny01LjM0OSwxMS45NDctMTEuOTQ4YzAtNi41OTktNS4zNDktMTEuOTQ3LTExLjk0Ny0xMS45NDdIMTQzLjY0N2wxMy4zMTktMzYuOTk2YzEuNzIsMC43MjQsMy41NzgsMS4xNTIsNS41MjMsMS4xNTJoMjEwLjI3OGM2LjIzNCwwLDExLjc1MS00LjAyNywxMy42NS05Ljk1OWw1OS43MzktMTg2LjM4N0M0NDcuNTU3LDEwMS41NjcsNDQ2Ljc4OCw5Ni44MDIsNDQ0LjA5LDkzLjEwM3ogTTE2OS42NTksNDA5LjgwN2MtMTAuNTQzLDAtMTkuMTE2LTguNTczLTE5LjExNi0xOS4xMTZzOC41NzMtMTkuMTE3LDE5LjExNi0xOS4xMTdzMTkuMTE2LDguNTc0LDE5LjExNiwxOS4xMTdTMTgwLjIwMiw0MDkuODA3LDE2OS42NTksNDA5LjgwN3ogTTMyNy4zNjcsNDA5LjgwN2MtMTAuNTQzLDAtMTkuMTE3LTguNTczLTE5LjExNy0xOS4xMTZzOC41NzQtMTkuMTE3LDE5LjExNy0xOS4xMTdjMTAuNTQyLDAsMTkuMTE2LDguNTc0LDE5LjExNiwxOS4xMTdTMzM3LjkwOSw0MDkuODA3LDMyNy4zNjcsNDA5LjgwN3ogTTQwMi41MiwxNDguMTQ5aC03My4xNjFWMTE1Ljg5aDgzLjQ5OUw0MDIuNTIsMTQ4LjE0OXogTTM4MS40NTMsMjEzLjg2MWgtNTIuMDk0di0zNy4wMzhoNjMuOTY3TDM4MS40NTMsMjEzLjg2MXogTTIzNC41NzEsMjEzLjg2MXYtMzcuMDM4aDY2LjExM3YzNy4wMzhIMjM0LjU3MXogTTMwMC42ODQsMjQyLjUzOHYzMS4wNjRoLTY2LjExM3YtMzEuMDY0SDMwMC42ODR6IE0xMzkuMTE1LDE3Ni44MjNoNjYuNzg0djM3LjAzOGgtNTMuOTMzTDEzOS4xMTUsMTc2LjgyM3ogTTIzNC41NzEsMTQ4LjE0OVYxMTUuODloNjYuMTEzdjMyLjI1OUgyMzQuNTcxeiBNMjA1Ljg5OCwxMTUuODl2MzIuMjU5aC03Ni43MzRsLTExLjE5MS0zMi4yNTlIMjA1Ljg5OHogTTE2MS45MTYsMjQyLjUzOGg0My45ODJ2MzEuMDY0aC0zMy4yMDZMMTYxLjkxNiwyNDIuNTM4eiBNMzI5LjM1OSwyNzMuNjAzdi0zMS4wNjRoNDIuOTA5bC05Ljk1NSwzMS4wNjRIMzI5LjM1OXonKTtcclxuXHJcblx0Zy5hcHBlbmRDaGlsZChwYXRoKTtcclxuXHRzdmcuYXBwZW5kQ2hpbGQoZyk7XHJcblxyXG5cclxuXHRyZXR1cm4gc3ZnO1xyXG59XG5cbmxldCBpbml0YWxpemVkID0gZmFsc2U7XG5cbmxldCBkZWZhdWx0U2V0dGluZ3MgPSB7XG5cdGltcG9ydEJvb3RzdHJhcDogZmFsc2UsXG5cdGNvbXBvbmVudHM6IFsnUHJvZHVjdHMnLCAnU2VydmljZXMnLCAnRmlsdGVyJywgJ1BhZ2luYXRpb24nLCAnQ2FydCddXG59O1xuXG5jbGFzcyBlQ29tbWVyY2Vcbntcblx0Y29uc3RydWN0b3Ioc2V0dGluZ3MpXG5cdHtcblx0XHRFeGNlcHRpb25IYW5kbGVyLmluaXRhbGl6ZSgpO1xuXG5cdFx0aWYodHlwZW9mIHNldHRpbmdzICE9ICdvYmplY3QnKSB7XG5cdFx0XHR0aHJvdyBuZXcgSW52YWxpZEFyZ3VtZW50RXhjZXB0aW9uJDE7XG5cdFx0fVxuXG5cdFx0dGhpcy5jb250YWluZXIgPSBuZXcgQ29udGFpbmVyO1xuXHRcdHRoaXMuc2V0dGluZ3MgPSBDb21tb24uZXh0ZW5kKGRlZmF1bHRTZXR0aW5ncywgc2V0dGluZ3MpO1xuXHRcdFxuXHRcdGJpbmRDb21wb25lbnRzRGVwZW5kZW5jaWVzLmNhbGwodGhpcywgc2V0dGluZ3MuY29tcG9uZW50cyk7XG5cblx0XHRpbml0YWxpemVkID0gdHJ1ZTtcblxuXHRcdHJldHVybiBuZXcgUHJveHkodGhpcywge1xuXHRcdFx0Z2V0OiBmdW5jdGlvbih0YXJnZXQsIG9iamVjdCkge1xuXHRcdFx0XHRpZighIENvbW1vbi5pbl9hcnJheShvYmplY3QsIHNldHRpbmdzLmNvbXBvbmVudHMpKSB7XG5cdFx0XHRcdFx0dGhyb3cgbmV3IENvbXBvbmVudE5vdFJlZ2lzdGVyZWRFeGNlcHRpb247XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRyZXR1cm4gdGFyZ2V0LmNvbnRhaW5lci5tYWtlKG9iamVjdCk7XG5cdFx0XHR9XG5cdFx0fSk7XG5cdH1cbn1cblxuLyoqXG4gKiBCaW5kcyBjb21wb25lbnRzIGRlcGVuZGVuY2llcy5cbiAqL1xuZnVuY3Rpb24gYmluZENvbXBvbmVudHNEZXBlbmRlbmNpZXMoY29tcG9uZW50cykge1xuXHR0aGlzLmNvbnRhaW5lci5iaW5kKCdGaWx0ZXInLCBmdW5jdGlvbihjb250YWluZXIpIHtcblx0XHRjb250YWluZXJbJ0ZpbHRlciddLmJvb3RlZCA9IHRydWU7XG5cdFx0cmV0dXJuIG5ldyBGaWx0ZXIoY29udGFpbmVyKTtcblx0fSk7XG5cdFxuXHR0aGlzLmNvbnRhaW5lci5iaW5kKCdTZXJ2aWNlcycsIGZ1bmN0aW9uKGNvbnRhaW5lcikgeyBcblx0XHRjb250YWluZXJbJ1NlcnZpY2VzJ10uYm9vdGVkID0gdHJ1ZTtcblx0XHRyZXR1cm4gbmV3IFNlcnZpY2VzKGNvbnRhaW5lcik7XG5cdH0pO1xuXG5cdHRoaXMuY29udGFpbmVyLmJpbmQoJ1Byb2R1Y3RzJywgZnVuY3Rpb24oY29udGFpbmVyKSB7XG5cdFx0Y29udGFpbmVyWydQcm9kdWN0cyddLmJvb3RlZCA9IHRydWU7XG5cdFx0cmV0dXJuIG5ldyBQcm9kdWN0cyhjb250YWluZXIpO1xuXHR9KTtcblxuXHR0aGlzLmNvbnRhaW5lci5iaW5kKCdQYWdpbmF0aW9uJywgZnVuY3Rpb24oY29udGFpbmVyKSB7XG5cdFx0Y29udGFpbmVyWydQYWdpbmF0aW9uJ10uYm9vdGVkID0gdHJ1ZTtcblx0XHRyZXR1cm4gbmV3IFBhZ2luYXRpb24oY29udGFpbmVyLCBjb250YWluZXIubWFrZSgnUHJvZHVjdHMnKSk7XG5cdH0pO1xuXG5cdHRoaXMuY29udGFpbmVyLmJpbmQoJ0NhcnQnLCBmdW5jdGlvbihjb250YWluZXIpIHtcblx0XHRjb250YWluZXJbJ0NhcnQnXS5ib290ZWQgPSB0cnVlO1xuXHRcdHJldHVybiBuZXcgQ2FydChjb250YWluZXIpO1xuXHR9KTtcblxuXHR0aGlzLmNvbnRhaW5lclsnRmlsdGVyJ11bJ2Jvb3RlZCddID0gZmFsc2U7XG5cdHRoaXMuY29udGFpbmVyWydTZXJ2aWNlcyddWydib290ZWQnXSA9IGZhbHNlO1xuXHR0aGlzLmNvbnRhaW5lclsnUHJvZHVjdHMnXVsnYm9vdGVkJ10gPSBmYWxzZTtcblx0dGhpcy5jb250YWluZXJbJ1BhZ2luYXRpb24nXVsnYm9vdGVkJ10gPSBmYWxzZTtcblx0dGhpcy5jb250YWluZXJbJ0NhcnQnXVsnYm9vdGVkJ10gPSBmYWxzZTtcbn1cblxucmV0dXJuIGVDb21tZXJjZTtcblxufSgpKTtcbiJdfQ==
