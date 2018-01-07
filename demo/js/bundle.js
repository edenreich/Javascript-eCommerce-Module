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

	var events = [];

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

				if (typeof events[name] == 'undefined') {
					events[name] = [];
				}

				events[name].push(callback);
			}

			/**
    * Fires an event.
    */

		}, {
			key: 'trigger',
			value: function trigger(name) {
				for (var _len = arguments.length, data = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
					data[_key - 1] = arguments[_key];
				}

				data = data || null;

				events[name].forEach(function (callback) {
					if (typeof callback !== 'function') {
						throw new BadEventCallException();
					}

					return callback.apply(undefined, _toConsumableArray(data));
				});
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
    * Checks if a given parameter is an object.
    */

		}, {
			key: 'isObject',
			value: function isObject(object) {
				return (typeof object === 'undefined' ? 'undefined' : _typeof(object)) == 'object';
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
		class: '',
		width: '',
		height: ''
	};

	/**
  * Stores the container object.
  */
	var Container$2 = void 0;

	/**
  * The Filter Object, handles the filter of the products/services.
  */

	var Filter = function () {
		function Filter(container) {
			_classCallCheck(this, Filter);

			Container$2 = container;
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
				this.wrapper = DOM.find(selector);

				DOM.addClass(this.wrapper, this.settings.class);
			}
		}]);

		return Filter;
	}();

	var Str = function () {
		function Str() {
			_classCallCheck(this, Str);
		}

		_createClass(Str, null, [{
			key: 'kebabCase',


			/**
    * Convert camelCase to kebab-case.
    */
			value: function kebabCase(string) {
				return string.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
			}

			/**
    * Generates a random string.
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
		}]);

		return Str;
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
	var Container$3 = void 0;

	/**
  * The Products Object, handles the products.
  */

	var Products = function () {
		/**
   * Initalize the Container.
   */
		function Products(container) {
			_classCallCheck(this, Products);

			Container$3 = container;
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

					if (Container$3.Pagination && Container$3.Pagination.booted) {
						var instance = this;

						instance.getProductsByPage(1).then(function (products) {
							instance.replaceItems(products);
						});
					} else {
						this.loadAllProducts();
					}
				}.bind(this));
			}

			/**
    * Loads the products and replace them in the div container.
    */

		}, {
			key: 'loadAllProducts',
			value: function loadAllProducts() {
				var request = this.getProducts();

				request.then(function (items) {
					Event.trigger('ProductsWereFetched', items);
					this.replaceItems(items);
				}.bind(this)).catch(function (error) {});
			}

			/**
    * Sets the DOM element for populating the products.
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
    * Replace items in the container.
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

			/**
    * Sends the request to the server.
    */

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

				var builtProducts = [];

				attributesCollection.forEach(function (attributes) {
					var builtProduct = this.buildProduct(attributes, className, tagType);
					builtProducts.push(builtProduct);
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

				addToCart.addEventListener('click', function (event) {
					event.preventDefault();
					Event.trigger('ProductWasAdded', attributes);
				});

				overlay.appendChild(tag);

				return product;
			}
		}, {
			key: 'addToCart',
			value: function addToCart(event) {}

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
				if (DOM.find('#eCommerce-Products')) {
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
		class: '',
		per_page: 5,
		total_items: 10
	};

	/**
  * Stores the container object.
  */
	var Container$4 = void 0;

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

			this.setCurrent(1);
			Container$4 = container;
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
				this.wrapper = DOM.find(selector);

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

			/**
    * Calculates the total pages.
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
				this.setActiveLink(pageNumber);
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

	var Cookie = function () {
		function Cookie() {
			_classCallCheck(this, Cookie);
		}

		_createClass(Cookie, null, [{
			key: 'set',

			/**
   	* Sets a cookie. 
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

				return [];
			}
		}]);

		return Cookie;
	}();

	/**
  * The default settings of the cart.
  */


	var defaultSettings$4 = {
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
  */
	var Container$5 = void 0;

	/**
  * Stores the cart loader.
  */
	var _loadingOverlay = void 0;

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

			Container$5 = container;

			this.previewElement = this.createPreviewElement();
			this.svgIcon = createIcon.call(this);
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

				if (this.isEmpty(Cookie.get(this.settings.cookie_name))) {
					this.cart = {};
					this.setCart(this.cart);
				}
			}

			/**
    * Checks if the cart is empty
    */

		}, {
			key: 'isEmpty',
			value: function isEmpty(cart) {
				return Common.emptyObject(cart);
			}

			/**
    * Sets the cart as a cookie.
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
    */

		}, {
			key: 'addToPreview',
			value: function addToPreview(items) {
				var itemsDiv = DOM.find('.items', this.previewElement);

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
    */

		}, {
			key: 'createPreviewElement',
			value: function createPreviewElement() {
				var previewElement = DOM.createElement('div', {
					id: 'preview'
				});

				var ul = DOM.createElement('ul', {
					class: 'items'
				});

				previewElement.appendChild(ul);

				return previewElement;
			}

			/**
    * Add the eCommerce style tags to the DOM.
    */

		}, {
			key: 'addStyleTag',
			value: function addStyleTag() {
				if (DOM.find('#eCommerce-Cart')) {
					return;
				}

				var position = this.settings.fixed ? 'fixed' : 'absolute';

				var css = '\n\t\t\t' + this.settings.element + ' {\n\t\t\t\tposition: ' + position + ';\n\t\t\t\tcursor: pointer;\n\t\t\t\tcolor: #ffffff;\n\t\t\t\tz-index: 998;\n\t\t\t}\n\n\t\t\t' + this.settings.element + ' > svg {\n\t\t\t\twidth: ' + this.settings.width + ';\n\t\t\t\theight: ' + this.settings.height + ';\n\t\t\t\ttransition: fill 0.3s;\n\t\t\t}\n\n\t\t\t' + this.settings.element + ' > svg:hover {\n\t\t\t\tfill: ' + this.settings.hover_color + ';\n\t\t\t\ttransition: fill 0.3s;\n\t\t\t}\n\n\t\t\t' + this.settings.element + '.top-right,\n\t\t\t' + this.settings.element + '.right-top {\n\t\t\t\tright: 10px;\n\t\t\t\ttop: 10px;\n\t\t\t}\n\n\t\t\t' + this.settings.element + '.left-top,\n\t\t\t' + this.settings.element + '.top-left {\n\t\t\t\tleft: 10px;\n\t\t\t\ttop: 10px;\n\t\t\t}\n\n\t\t\t' + this.settings.element + ' > #preview {\n\t\t\t\tposition: ' + position + ';\n\t\t\t\tz-index: 9999;\n\t\t\t\ttop: calc(10px + ' + this.settings.height + ');\n\t\t\t\ttransform: translateX(60px);\n\t\t\t\theight: 400px;\n\t\t\t\twidth: 300px;\n\t\t\t\tborder: 1px solid #e4e4e4;\n\t\t\t\tbackground: #ffffff;\n\t\t\t\ttransition: transform 1s, visibility 1s;\n\t\t\t\tcursor: default;\n\t\t\t\toverflow-Y: scroll;\n\t\t\t}\n\n\t\t\t' + this.settings.element + ' > #preview.opened {\n\t\t\t\tvisibility: visible;\n\t\t\t\ttransform: translateX(-240px);\n\t\t\t}\n\n\t\t\t' + this.settings.element + ' > #preview.closed {\n\t\t\t\tvisibility: hidden;\n\t\t\t\ttransform: translateX(60px);\n\t\t\t}\n\n\t\t\t' + this.settings.element + ' > #preview > ul.items,\n\t\t\t' + this.settings.element + ' > #preview > ul.items > li.item {\n\t\t\t\tcolor: #000000;\n\t\t\t\tlist-style-type: none;\n\t\t\t}\n\n\t\t\t.cart-loader-overlay {\n\t\t\t\tposition: absolute;\n\t\t\t\ttop: 0;\n\t\t\t\tleft: 0;\n\t\t\t\tbackground: #ffffff;\n\t\t\t\twidth: 100%;\n\t\t\t\theight: 100%;\n\t\t\t}\n\n\t\t\t.cart-loader-overlay .cart-loader {\n\t\t\t\tposition: absolute;\n\t\t\t\twidth: 50px;\n\t\t\t\theight: 50px;\n\t\t\t\tmargin-left: -25px;\n\t\t\t\tmargin-top: -25px;\n\t\t\t\tleft: 50%;\n\t\t\t\tright: 50%;\n\t\t\t\ttop: 50%;\n\t\t\t\tbottom: 50%;\n\t\t\t}\n\t\t';

				DOM.addStyle('eCommerce-Cart', css);
			}

			/**
    * Creates an loading overlay.
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
    */

		}, {
			key: 'previewStartLoading',
			value: function previewStartLoading() {
				this.previewElement.appendChild(this.loadingOverlay());
			}

			/**
    * Loading the cart preview.
    */

		}, {
			key: 'previewStopLoading',
			value: function previewStopLoading() {
				if (DOM.find('.cart-loader-overlay', this.previewElement)) {
					this.previewElement.removeChild(this.loadingOverlay());
				}
			}

			/**
    * Reloads the items in the cart preview.
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
				}, 2000);
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

				this.svgIcon.onclick = function (e) {
					e.preventDefault();
					var opening = DOM.toggleClass(this.previewElement, 'opened', 'closed');

					if (opening) {
						this.reloadCartPreview();
					}
				}.bind(this);

				Event.listen('ProductWasAdded', function (attributes) {
					var cart = Cookie.get(this.settings.cookie_name);
					cart.items.push(attributes);
					Cookie.set(this.settings.cookie_name, cart);
					this.reloadCartPreview();
				}.bind(this));
			}

			/**
    * Retrieve the carts items from the cookie.
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
		element: 'body',
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
		this.settings.element = DOM.find(this.settings.element);

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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVDb21tZXJjZS5qcyJdLCJuYW1lcyI6WyJlQ29tbWVyY2UiLCJJbnZhbGlkQXJndW1lbnRFeGNlcHRpb24kMSIsImNvbnNvbGUiLCJlcnJvciIsIkVycm9yIiwiRE9NIiwic3RyaW5nIiwicmVwbGFjZSIsImVsZW1lbnQiLCJjbGFzc05hbWUiLCJuZXdDbGFzc05hbWUiLCJyZW1vdmVDbGFzcyIsImFkZENsYXNzIiwidW5kZWZpbmVkIiwiY2xhc3NOYW1lcyIsInNwbGl0IiwiZm9yRWFjaCIsIm5hbWUiLCJjbGFzc0xpc3QiLCJhZGQiLCJyZW1vdmUiLCJpZCIsImNzcyIsImhlYWQiLCJkb2N1bWVudCIsImdldEVsZW1lbnRzQnlUYWdOYW1lIiwic3R5bGVUYWciLCJjcmVhdGVFbGVtZW50IiwiQ1NTIiwibWluaWZ5Q3NzIiwiaW5uZXJIVE1MIiwic2V0QXR0cmlidXRlIiwiYXBwZW5kQ2hpbGQiLCJlbGVtZW50VHlwZSIsIm9wdGlvbnMiLCJvcHRpb24iLCJzZWNvbmRDbGFzc05hbWUiLCJ0b2dnbGUiLCJzZWxlY3RvciIsImNvbnRleHQiLCJ3aW5kb3ciLCJxdWVyeUVsZW1lbnQiLCJwYXJlbnRFbGVtZW50IiwicXVlcnlTZWxlY3RvckFsbCIsImxlbmd0aCIsImhhc0NoaWxkIiwiY2hpbGRFbGVtZW50Iiwibm9kZSIsInBhcmVudE5vZGUiLCJldmVudHMiLCJFdmVudCIsImNhbGxiYWNrIiwiSW52YWxpZEFyZ3VtZW50RXhjZXB0aW9uIiwicHVzaCIsImRhdGEiLCJCYWRFdmVudENhbGxFeGNlcHRpb24iLCJDb21tb24iLCJjdXJyZW50T2JqIiwibmV3T2JqIiwiZXh0ZW5kZWQiLCJwcm9wIiwiT2JqZWN0IiwicHJvdG90eXBlIiwiaGFzT3duUHJvcGVydHkiLCJjYWxsIiwibmVlZGxlIiwiaHlzdGFjayIsImNvbnN0cnVjdG9yIiwiQXJyYXkiLCJpIiwib2JqZWN0IiwiSW52YWxpZEJpbmRpbmdFeGNlcHRpb24iLCJpbnN0YW5jZXMiLCJDb250YWluZXIiLCJrZXkiLCJjb25jcmV0ZSIsImJpbmQiLCJpbnN0YW5jZSIsImluc3RhbmNlRXhpc3QiLCJnZXRJbnN0YW5jZSIsInNldEluc3RhbmNlIiwiQ29tcG9uZW50c0V4Y2VwdGlvbiIsIkJhZEV2ZW50Q2FsbEV4Y2VwdGlvbiQxIiwiTm90SW5QYWdlUmFuZ2VFeGNlcHRpb24iLCJDb21wb25lbnROb3RSZWdpc3RlcmVkRXhjZXB0aW9uIiwiRXhjZXB0aW9uSGFuZGxlciIsIm9uZXJyb3IiLCJtZXNzYWdlIiwic291cmNlIiwibGluZW5vIiwiY29sbm8iLCJkZWZhdWx0U2V0dGluZ3MkMSIsImNsYXNzIiwid2lkdGgiLCJoZWlnaHQiLCJDb250YWluZXIkMiIsIkZpbHRlciIsImNvbnRhaW5lciIsInNldHRpbmdzIiwiZXh0ZW5kIiwic2V0RWxlbWVudCIsIndyYXBwZXIiLCJmaW5kIiwiU3RyIiwidG9Mb3dlckNhc2UiLCJwb3NzaWJsZSIsImNoYXJBdCIsIk1hdGgiLCJmbG9vciIsInJhbmRvbSIsImRlZmF1bHRTZXR0aW5ncyQyIiwiaXRlbV9jbGFzcyIsImFkZF9idXR0b25fY2xhc3MiLCJmYXZvcml0ZV9idXR0b25fY2xhc3MiLCJhdHRyaWJ1dGVzIiwidXJsIiwiQ29udGFpbmVyJDMiLCJQcm9kdWN0cyIsImFkZEV2ZW50TGlzdGVuZXIiLCJhZGRTdHlsZVRhZyIsIlBhZ2luYXRpb24iLCJib290ZWQiLCJnZXRQcm9kdWN0c0J5UGFnZSIsInRoZW4iLCJwcm9kdWN0cyIsInJlcGxhY2VJdGVtcyIsImxvYWRBbGxQcm9kdWN0cyIsInJlcXVlc3QiLCJnZXRQcm9kdWN0cyIsIml0ZW1zIiwidHJpZ2dlciIsImNhdGNoIiwiaXNBcnJheSIsImJ1aWxkUHJvZHVjdHMiLCJwcm9kdWN0IiwiYXNrU2VydmVyIiwicGFnZU51bWJlciIsIlByb21pc2UiLCJyZXNvbHZlIiwicmVqZWN0IiwieGhyIiwiWE1MSHR0cFJlcXVlc3QiLCJBY3RpdmVYT2JqZWN0Iiwib3BlbiIsInNldFJlcXVlc3RIZWFkZXIiLCJvbnJlYWR5c3RhdGVjaGFuZ2UiLCJyZWFkeVN0YXRlIiwic3RhdHVzIiwiY3VycmVudEl0ZW1zIiwicmVzcG9uc2VUZXh0IiwiSlNPTiIsInBhcnNlIiwiQWZ0ZXJMb2FkZWQiLCJzdGF0dXNUZXh0Iiwic2VuZCIsImF0dHJpYnV0ZXNDb2xsZWN0aW9uIiwidGFnVHlwZSIsImJ1aWx0UHJvZHVjdHMiLCJidWlsdFByb2R1Y3QiLCJidWlsZFByb2R1Y3QiLCJvdmVybGF5IiwiYXR0cmlidXRlIiwiaW5fYXJyYXkiLCJ0YWciLCJpbWFnZSIsInNyYyIsImtlYmFiQ2FzZSIsImFkZFRvQ2FydCIsInR5cGUiLCJ0ZXh0IiwiZmF2b3JpdGUiLCJldmVudCIsInByZXZlbnREZWZhdWx0IiwiYWRkU3R5bGUiLCJTZXJ2aWNlcyIsImRlZmF1bHRTZXR0aW5ncyQzIiwicGVyX3BhZ2UiLCJ0b3RhbF9pdGVtcyIsIkNvbnRhaW5lciQ0IiwiUHJvZHVjdHMkMiIsInNldEN1cnJlbnQiLCJ0b3RhbFBhZ2VzIiwiY2FsY3VsYXRlVG90YWxQYWdlcyIsInJlcGxhY2VMaW5rcyIsImxpbmtzIiwiY3JlYXRlTGlua3MiLCJiaW5kRXZlbnRMaXN0ZW5lcnMiLCJwZXJQYWdlIiwidG90YWxJdGVtcyIsInBhcnNlSW50IiwiY2VpbCIsIm5leHQiLCJjaGlsZE5vZGVzIiwib25jbGljayIsInJlcXVlc3RlZFBhZ2UiLCJjdXJyZW50Iiwibm90SW5QYWdlUmFuZ2UiLCJwcmV2aW91cyIsInBhZ2VzIiwiZ2V0QXR0cmlidXRlIiwiY2hhbmdlVXJsIiwic2V0QWN0aXZlTGluayIsInVsIiwiY3JlYXRlUGFnZUxpbmtzIiwiY3JlYXRlUHJldmlvdXNCdXR0b24iLCJjcmVhdGVOZXh0QnV0dG9uIiwicGFnZSIsInBhZ2VJdGVtIiwibGluayIsImxpIiwic3BhbjEiLCJzcGFuMiIsImlzTmFOIiwiR0VUX1ZhcnMiLCJoaXN0b3J5IiwicmVwbGFjZVN0YXRlIiwidXBkYXRlVVJMUGFyYW1ldGVyIiwibG9jYXRpb24iLCJocmVmIiwidmFycyIsInBhcnRzIiwibSIsInZhbHVlIiwicGFyYW0iLCJwYXJhbVZhbCIsIm5ld0FkZGl0aW9uYWxVUkwiLCJ0ZW1wQXJyYXkiLCJiYXNlVVJMIiwiYWRkaXRpb25hbFVSTCIsInRlbXAiLCJyb3dzVGV4dCIsIkNvb2tpZSIsImRheXMiLCJzdHJpbmdpZnkiLCJleHBpcmVzIiwiZGF0ZSIsIkRhdGUiLCJzZXRUaW1lIiwiZ2V0VGltZSIsInRvR01UU3RyaW5nIiwiY29va2llIiwiY19zdGFydCIsImluZGV4T2YiLCJjX2VuZCIsInVuZXNjYXBlIiwic3Vic3RyaW5nIiwiZGVmYXVsdFNldHRpbmdzJDQiLCJjb29raWVfbmFtZSIsInByZXZpZXdfY2xhc3MiLCJsb2FkZXIiLCJwbGFjZW1lbnQiLCJmaXhlZCIsImhvdmVyX2NvbG9yIiwiQ29udGFpbmVyJDUiLCJsb2FkaW5nT3ZlcmxheSIsIkNhcnQiLCJwcmV2aWV3RWxlbWVudCIsImNyZWF0ZVByZXZpZXdFbGVtZW50Iiwic3ZnSWNvbiIsImNyZWF0ZUljb24iLCJpc0VtcHR5IiwiZ2V0IiwiY2FydCIsInNldENhcnQiLCJlbXB0eU9iamVjdCIsImZhdm9yaXRlcyIsInNldCIsIml0ZW0iLCJzcGxpY2UiLCJpdGVtc0RpdiIsInNwYW4iLCJpY29uIiwicG9zaXRpb24iLCJyZW1vdmVDaGlsZCIsInByZXZpZXdTdGFydExvYWRpbmciLCJnZXRDYXJ0SXRlbXMiLCJhZGRUb1ByZXZpZXciLCJzZXRUaW1lb3V0IiwicHJldmlld1N0b3BMb2FkaW5nIiwiZSIsIm9wZW5pbmciLCJ0b2dnbGVDbGFzcyIsInJlbG9hZENhcnRQcmV2aWV3IiwibGlzdGVuIiwiY2xvc2UiLCJzd2l0Y2hDbGFzc2VzIiwic3ZnIiwiY3JlYXRlRWxlbWVudE5TIiwiZyIsInBhdGgiLCJpbml0YWxpemVkIiwiZGVmYXVsdFNldHRpbmdzIiwiaW1wb3J0Qm9vdHN0cmFwIiwiY29tcG9uZW50cyIsImluaXRhbGl6ZSIsImJpbmRDb21wb25lbnRzRGVwZW5kZW5jaWVzIiwiUHJv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QUFWLEVBQXNCd0IsTUFBdEIsR0FBK0IsSUFBL0I7QUFDQSxVQUFPLElBQUlKLFFBQUosQ0FBYXBCLFNBQWIsQ0FBUDtBQUNBLEdBSEQ7O0FBS0EsT0FBS0EsU0FBTCxDQUFlckIsSUFBZixDQUFvQixZQUFwQixFQUFrQyxVQUFTcUIsU0FBVCxFQUFvQjtBQUNyREEsYUFBVSxZQUFWLEVBQXdCd0IsTUFBeEIsR0FBaUMsSUFBakM7QUFDQSxVQUFPLElBQUlELFVBQUosQ0FBZXZCLFNBQWYsRUFBMEJBLFVBQVV5TSxJQUFWLENBQWUsVUFBZixDQUExQixDQUFQO0FBQ0EsR0FIRDs7QUFLQSxPQUFLek0sU0FBTCxDQUFlckIsSUFBZixDQUFvQixNQUFwQixFQUE0QixVQUFTcUIsU0FBVCxFQUFvQjtBQUMvQ0EsYUFBVSxNQUFWLEVBQWtCd0IsTUFBbEIsR0FBMkIsSUFBM0I7QUFDQSxVQUFPLElBQUlzSSxJQUFKLENBQVM5SixTQUFULENBQVA7QUFDQSxHQUhEOztBQUtBLE9BQUtBLFNBQUwsQ0FBZSxRQUFmLEVBQXlCLFFBQXpCLElBQXFDLEtBQXJDO0FBQ0EsT0FBS0EsU0FBTCxDQUFlLFVBQWYsRUFBMkIsUUFBM0IsSUFBdUMsS0FBdkM7QUFDQSxPQUFLQSxTQUFMLENBQWUsVUFBZixFQUEyQixRQUEzQixJQUF1QyxLQUF2QztBQUNBLE9BQUtBLFNBQUwsQ0FBZSxZQUFmLEVBQTZCLFFBQTdCLElBQXlDLEtBQXpDO0FBQ0EsT0FBS0EsU0FBTCxDQUFlLE1BQWYsRUFBdUIsUUFBdkIsSUFBbUMsS0FBbkM7QUFDQTs7QUFFRCxRQUFPakcsU0FBUDtBQUVDLENBbnhEZ0IsRUFBakIiLCJmaWxlIjoiZUNvbW1lcmNlLmpzIiwic291cmNlc0NvbnRlbnQiOlsidmFyIGVDb21tZXJjZSA9IChmdW5jdGlvbiAoKSB7XG4ndXNlIHN0cmljdCc7XG5cbmNsYXNzIEludmFsaWRBcmd1bWVudEV4Y2VwdGlvbiQxIGV4dGVuZHMgRXJyb3Jcclxue1xyXG5cdGNvbnN0cnVjdG9yKCkgXHJcblx0eyBcclxuICAgIFx0c3VwZXIoKTtcclxuICAgIFx0Y29uc29sZS5lcnJvcihgSW52YWxpZEFyZ3VtZW50RXhjZXB0aW9uLCBhbiBpbnZhbGlkIGFyZ3VtZW50IHdhcyBwYXNzZWQuYCk7XHJcbiAgICB9XHJcbn1cblxuLyoqXHJcbiAqIEBmaWxlIFxyXG4gKiBET00gY2xhc3MuXHJcbiAqXHJcbiAqIEFkZHMgc29tZSB1c2VmdWwgZnVuY3Rpb25hbGl0eSBmb3JcclxuICogZmV0Y2hpbmcgb3IgbWFuaXB1bGF0aW5nIERPTSBlbGVtZW50cy5cclxuICovXHJcblxyXG5jbGFzcyBET01cclxue1xyXG5cdC8qKlxyXG5cdCAqIE1pbmlmaWVzIHRoZSBjc3MgdGV4dC5cclxuXHQgKiBcclxuXHQgKiBAcGFyYW0gc3RyaW5nIHwgc3RyaW5nXHJcblx0ICogQHJldHVybiBzdHJpbmdcclxuXHQgKi9cclxuXHRzdGF0aWMgbWluaWZ5Q3NzKHN0cmluZykgXHJcblx0e1xyXG5cdCAgICBzdHJpbmcgPSBzdHJpbmcucmVwbGFjZSgvXFwvXFwqKD86KD8hXFwqXFwvKVtcXHNcXFNdKSpcXCpcXC98W1xcclxcblxcdF0rL2csICcnKTtcclxuXHQgICAgc3RyaW5nID0gc3RyaW5nLnJlcGxhY2UoLyB7Mix9L2csICcgJyk7XHJcblx0ICAgIHN0cmluZyA9IHN0cmluZy5yZXBsYWNlKC8oW3s6fV0pL2csICckMScpO1xyXG5cdCAgICBzdHJpbmcgPSBzdHJpbmcucmVwbGFjZSgvKFs7LF0pIC9nLCAnJDEnKTtcclxuXHQgICAgc3RyaW5nID0gc3RyaW5nLnJlcGxhY2UoLyAhL2csICchJyk7XHJcblx0ICAgIFxyXG5cdCAgICByZXR1cm4gc3RyaW5nO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogU3dpdGNoZXMgYmV0d2VlbiB0d28gZ2l2ZW4gY2xhc3Nlcy5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSBvYmplY3QgfCBlbGVtZW50XHJcblx0ICogQHBhcmFtIHN0cmluZyB8IGNsYXNzTmFtZVxyXG5cdCAqIEBwYXJhbSBzdHJpbmcgfCBuZXdDbGFzc05hbWVcclxuXHQgKiBAcmV0dXJuIG9iamVjdFxyXG5cdCAqL1xyXG5cdHN0YXRpYyBzd2l0Y2hDbGFzc2VzKGVsZW1lbnQsIGNsYXNzTmFtZSwgbmV3Q2xhc3NOYW1lKSBcclxuXHR7XHJcblx0XHR0aGlzLnJlbW92ZUNsYXNzKGVsZW1lbnQsIGNsYXNzTmFtZSk7XHJcblx0XHR0aGlzLmFkZENsYXNzKGVsZW1lbnQsIG5ld0NsYXNzTmFtZSk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBBZGRzIGNsYXNzIHRvIGEgZ2l2ZW4gZWxlbWVudC5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSBvYmplY3QgfCBlbGVtZW50XHJcblx0ICogQHBhcmFtIHN0cmluZyB8IGNsYXNzTmFtZVxyXG5cdCAqIEByZXR1cm4gb2JqZWN0XHJcblx0ICovXHJcblx0c3RhdGljIGFkZENsYXNzKGVsZW1lbnQsIGNsYXNzTmFtZSkgXHJcblx0e1xyXG5cdFx0aWYoZWxlbWVudCA9PT0gbnVsbCkge1xyXG5cdFx0XHR0aHJvdyBuZXcgSW52YWxpZEFyZ3VtZW50RXhjZXB0aW9uJDE7XHJcblx0XHR9XHJcblxyXG5cdFx0aWYoISBjbGFzc05hbWUgfHwgY2xhc3NOYW1lID09ICcnIHx8IHR5cGVvZiBjbGFzc05hbWUgPT09IHVuZGVmaW5lZCkge1xyXG5cdFx0XHRyZXR1cm4gZWxlbWVudDtcclxuXHRcdH1cclxuXHJcblx0XHRsZXQgY2xhc3NOYW1lcyA9IGNsYXNzTmFtZS5zcGxpdCgnICcpO1xyXG5cclxuXHRcdGNsYXNzTmFtZXMuZm9yRWFjaChmdW5jdGlvbihuYW1lKSB7XHJcblx0XHRcdGVsZW1lbnQuY2xhc3NMaXN0LmFkZChuYW1lKTtcclxuXHRcdH0pO1xyXG5cdFx0XHJcblx0XHRyZXR1cm4gZWxlbWVudDtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFJlbW92ZXMgY2xhc3MgZnJvbSBhIGdpdmVuIGVsZW1lbnQuXHJcblx0ICogXHJcblx0ICogQHBhcmFtIG9iamVjdCB8IGVsZW1lbnRcclxuXHQgKiBAcGFyYW0gc3RyaW5nIHwgY2xhc3NOYW1lXHJcblx0ICogQHJldHVybiBvYmplY3RcclxuXHQgKi9cclxuXHRzdGF0aWMgcmVtb3ZlQ2xhc3MoZWxlbWVudCwgY2xhc3NOYW1lKSBcclxuXHR7XHJcblx0XHRpZihlbGVtZW50ID09IG51bGwpIHtcclxuXHRcdFx0dGhyb3cgbmV3IEludmFsaWRBcmd1bWVudEV4Y2VwdGlvbiQxO1xyXG5cdFx0fVxyXG5cclxuXHRcdGlmKGNsYXNzTmFtZSA9PSAnJykge1xyXG5cdFx0XHRlbGVtZW50LmNsYXNzTmFtZSA9ICcnO1xyXG5cdFx0fSBlbHNlIHtcclxuXHJcblx0XHRcdGxldCBjbGFzc05hbWVzID0gY2xhc3NOYW1lLnNwbGl0KCcgJyk7XHJcblxyXG5cdFx0XHRjbGFzc05hbWVzLmZvckVhY2goZnVuY3Rpb24obmFtZSkge1xyXG5cdFx0XHRcdGVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShuYW1lKTtcclxuXHRcdFx0fSk7XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIGVsZW1lbnQ7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBBZGRzIHN0eWxlIHRhZyB3aXRoIGdpdmVuIGlkIGFuZCBjc3MgdG8gdGhlIERPTS5cclxuXHQgKiBcclxuXHQgKiBAcGFyYW0gc3RyaW5nIHwgaWRcclxuXHQgKiBAcGFyYW0gc3RyaW5nIHwgY3NzXHJcblx0ICogQHJldHVybiB2b2lkXHJcblx0ICovXHJcblx0c3RhdGljIGFkZFN0eWxlKGlkLCBjc3MpIFxyXG5cdHtcclxuXHRcdGlmICh0eXBlb2YgY3NzICE9ICdzdHJpbmcnKSB7XHJcblx0XHRcdHRocm93IG5ldyBJbnZhbGlkQXJndW1lbnRFeGNlcHRpb24kMTtcclxuXHRcdH1cclxuXHJcblx0XHRsZXQgaGVhZCA9IGRvY3VtZW50LmhlYWQgfHwgZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2hlYWQnKVswXTtcclxuXHRcdGxldCBzdHlsZVRhZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3N0eWxlJyk7XHJcblxyXG5cdFx0Ly8gcGlwZSBpdCB0aHJvdWdoIHRoZSBtaW5maWVyXHJcblx0ICAgIGxldCBDU1MgPSB0aGlzLm1pbmlmeUNzcyhjc3MpO1xyXG5cdCAgICAvLyBhZGRpbmcgaXQgdG8gdGhlIHN0eWxldGFnXHJcblx0ICAgIHN0eWxlVGFnLmlubmVySFRNTCA9IENTUztcclxuXHQgICAgLy8gZ2l2ZSBhbiBpZCB0byByZWNvZ25pemUgdGhlIHN0eWxlIHRhZ1xyXG5cdFx0c3R5bGVUYWcuc2V0QXR0cmlidXRlKCdpZCcsIGlkKTtcclxuXHRcdC8vIGFwcGVuZGluZyB0aGF0IHN0eWxlIHRhZyB0byB0aGUgRE9NIGhlYWQgdGFnXHJcblx0XHRoZWFkLmFwcGVuZENoaWxkKHN0eWxlVGFnKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIENyZWF0ZXMgYW4gZWxlbWVudCB3aXRoIHRoZSBnaXZlbiBvcHRpb25zLlxyXG5cdCAqIFxyXG5cdCAqIEBwYXJhbSBzdHJpbmcgfCBlbGVtZW50VHlwZVxyXG5cdCAqIEBwYXJhbSBvYmplY3QgfCBvcHRpb25zXHJcblx0ICogQHJldHVybiBIVE1MRWxlbWVudFxyXG5cdCAqL1xyXG5cdHN0YXRpYyBjcmVhdGVFbGVtZW50KGVsZW1lbnRUeXBlLCBvcHRpb25zKVxyXG5cdHtcclxuXHRcdGxldCBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChlbGVtZW50VHlwZSk7XHJcblx0XHJcblx0XHRpZiAob3B0aW9ucyA9PT0gdW5kZWZpbmVkKSB7XHJcblx0XHRcdHJldHVybiBlbGVtZW50O1xyXG5cdFx0fVxyXG5cclxuXHRcdGZvciAobGV0IG9wdGlvbiBpbiBvcHRpb25zKSB7XHJcblx0XHRcdGlmKG9wdGlvbiA9PSAndGV4dCcpIHtcclxuXHRcdFx0XHRlbGVtZW50LmlubmVySFRNTCA9IG9wdGlvbnNbb3B0aW9uXTtcclxuXHRcdFx0XHRjb250aW51ZTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0ZWxlbWVudC5zZXRBdHRyaWJ1dGUob3B0aW9uLCBvcHRpb25zW29wdGlvbl0pO1xyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiBlbGVtZW50O1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogVG9nZ2xlcyB0aGUgZ2l2ZW4gY2xhc3Nlcy5cclxuXHQgKiBcclxuXHQgKiBAcGFyYW0gb2JqZWN0IHwgZWxlbWVudFxyXG5cdCAqIEBwYXJhbSBzdHJpbmcgfCBjbGFzc05hbWVcclxuXHQgKiBAcmV0dXJuIGJvb2xcclxuXHQgKi9cclxuXHRzdGF0aWMgdG9nZ2xlQ2xhc3MoZWxlbWVudCwgY2xhc3NOYW1lLCBzZWNvbmRDbGFzc05hbWUpXHJcblx0e1xyXG5cdFx0aWYgKGVsZW1lbnQgPT0gbnVsbCB8fCB0eXBlb2YgZWxlbWVudCA9PSAndW5kZWZpbmVkJykge1xyXG5cdFx0XHR0aHJvdyBuZXcgSW52YWxpZEFyZ3VtZW50RXhjZXB0aW9uJDE7XHJcblx0XHR9XHJcblxyXG5cdFx0c2Vjb25kQ2xhc3NOYW1lID0gc2Vjb25kQ2xhc3NOYW1lIHx8IHVuZGVmaW5lZDtcclxuXHJcblx0XHRpZihzZWNvbmRDbGFzc05hbWUpIHtcclxuXHRcdFx0ZWxlbWVudC5jbGFzc0xpc3QudG9nZ2xlKHNlY29uZENsYXNzTmFtZSk7XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIGVsZW1lbnQuY2xhc3NMaXN0LnRvZ2dsZShjbGFzc05hbWUpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogRmluZHMgYW4gZWxlbWVudCBpbnNpZGUgb2YgcGFyZW50LlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIHN0cmluZyB8IHNlbGVjdG9yXHJcblx0ICogQHBhcmFtIG9iamVjdCB8IGNvbnRleHRcclxuXHQgKiBAcmV0dXJuIG1peGVkXHJcblx0ICovXHJcblx0c3RhdGljIGZpbmQoc2VsZWN0b3IsIGNvbnRleHQgPSB3aW5kb3cuZG9jdW1lbnQpIFxyXG5cdHtcclxuXHRcdHJldHVybiBxdWVyeUVsZW1lbnQoc2VsZWN0b3IsIGNvbnRleHQpO1xyXG5cdH1cclxufVxyXG5cclxuLyoqXHJcbiAqIFF1ZXJpZXMgYW4gZWxlbWVudCBmcm9tIHRoZSBET00uXHJcbiAqXHJcbiAqIEBwYXJhbSBzdHJpbmcgfCBzZWxlY3RvclxyXG4gKiBAcGFyYW0gb2JqZWN0IHwgcGFyZW50RWxlbWVudFxyXG4gKiBAcmV0dXJuIG1peGVkXHJcbiAqL1xyXG5mdW5jdGlvbiBxdWVyeUVsZW1lbnQoc2VsZWN0b3IsIHBhcmVudEVsZW1lbnQpIFxyXG57XHJcblx0bGV0IGVsZW1lbnQgPSBwYXJlbnRFbGVtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3IpO1xyXG5cclxuXHRpZiAoZWxlbWVudC5sZW5ndGggPT0gMCkge1xyXG5cdFx0cmV0dXJuIG51bGw7XHJcblx0fVxyXG5cclxuXHRyZXR1cm4gKGVsZW1lbnQubGVuZ3RoID4gMSkgPyBlbGVtZW50IDogZWxlbWVudFswXTtcclxufVxyXG5cclxuLyoqXHJcbiAqIENoZWNrcyBpZiBwYXJlbnQgaGFzIGNoaWxkLlxyXG4gKlxyXG4gKiBAcGFyYW0gb2JqZWN0IHwgcGFyZW50RWxlbWVudFxyXG4gKiBAcGFyYW0gb2JqZWN0IHwgY2hpbGRFbGVtZW50XHJcbiAqIEByZXR1cm4gYm9vbFxyXG4gKi9cclxuZnVuY3Rpb24gaGFzQ2hpbGQocGFyZW50RWxlbWVudCwgY2hpbGRFbGVtZW50KSBcclxue1xyXG4gICAgIGxldCBub2RlID0gY2hpbGRFbGVtZW50LnBhcmVudE5vZGU7XHJcbiAgICAgXHJcbiAgICAgd2hpbGUgKG5vZGUgIT0gbnVsbCkge1xyXG4gICAgICAgICBpZiAobm9kZSA9PSBwYXJlbnRFbGVtZW50KSB7XHJcbiAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgfVxyXG4gICAgICAgICBub2RlID0gbm9kZS5wYXJlbnROb2RlO1xyXG4gICAgIH1cclxuICAgICBcclxuICAgICByZXR1cm4gZmFsc2U7XHJcbn1cblxubGV0IGV2ZW50cyA9IFtdO1xyXG5cclxuY2xhc3MgRXZlbnRcclxue1xyXG5cdC8qKlxyXG5cdCAqIExpc3RlbiB0byBhbiBldmVudC5cclxuXHQgKi9cclxuXHRzdGF0aWMgbGlzdGVuKG5hbWUsIGNhbGxiYWNrKSB7XHJcblx0XHRpZiAodHlwZW9mIGNhbGxiYWNrICE9PSAnZnVuY3Rpb24nKSB7XHJcblx0XHRcdHRocm93IG5ldyBJbnZhbGlkQXJndW1lbnRFeGNlcHRpb247XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKHR5cGVvZiBldmVudHNbbmFtZV0gPT0gJ3VuZGVmaW5lZCcpIHtcclxuXHRcdFx0ZXZlbnRzW25hbWVdID0gW107XHJcblx0XHR9XHJcblxyXG5cdFx0ZXZlbnRzW25hbWVdLnB1c2goY2FsbGJhY2spO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogRmlyZXMgYW4gZXZlbnQuXHJcblx0ICovXHJcblx0c3RhdGljIHRyaWdnZXIobmFtZSwgLi4uZGF0YSkge1xyXG5cdFx0ZGF0YSA9IGRhdGEgfHwgbnVsbDtcclxuXHJcblx0XHRldmVudHNbbmFtZV0uZm9yRWFjaChmdW5jdGlvbihjYWxsYmFjaykge1xyXG5cdFx0XHRpZih0eXBlb2YgY2FsbGJhY2sgIT09ICdmdW5jdGlvbicpIHtcclxuXHRcdFx0XHR0aHJvdyBuZXcgQmFkRXZlbnRDYWxsRXhjZXB0aW9uO1xyXG5cdFx0XHR9XHJcblx0XHRcdFxyXG5cdFx0XHRyZXR1cm4gY2FsbGJhY2soLi4uZGF0YSk7XHJcblx0XHR9KTtcclxuXHR9XHJcbn1cblxuY2xhc3MgQ29tbW9uXHJcbntcclxuXHQvKipcclxuXHQgKiBFeHRlbmQgYW4gb2JqZWN0LlxyXG5cdCAqL1xyXG5cdHN0YXRpYyBleHRlbmQoY3VycmVudE9iaiwgbmV3T2JqICkge1xyXG5cdFx0dmFyIGV4dGVuZGVkID0ge307XHJcblx0ICAgIHZhciBwcm9wO1xyXG5cclxuXHQgICAgZm9yIChwcm9wIGluIGN1cnJlbnRPYmopIHtcclxuXHQgICAgICAgIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoY3VycmVudE9iaiwgcHJvcCkpIHtcclxuXHQgICAgICAgICAgICBleHRlbmRlZFtwcm9wXSA9IGN1cnJlbnRPYmpbcHJvcF07XHJcblx0ICAgICAgICB9XHJcblx0ICAgIH1cclxuXHJcblx0ICAgIGZvciAocHJvcCBpbiBuZXdPYmopIHtcclxuXHQgICAgICAgIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwobmV3T2JqLCBwcm9wKSkge1xyXG5cdCAgICAgICAgICAgIGV4dGVuZGVkW3Byb3BdID0gbmV3T2JqW3Byb3BdO1xyXG5cdCAgICAgICAgfVxyXG5cdCAgICB9XHJcblxyXG5cdCAgICByZXR1cm4gZXh0ZW5kZWQ7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBDaGVja3MgZm9yIGEgbmVlZGxlIGluIGh5c3RhY2suXHJcblx0ICovXHJcblx0c3RhdGljIGluX2FycmF5KG5lZWRsZSwgaHlzdGFjaykge1xyXG5cdFx0aWYoaHlzdGFjay5jb25zdHJ1Y3RvciAhPT0gQXJyYXkpIHJldHVybjtcclxuXHJcblx0XHRmb3IodmFyIGkgPSAwOyBpIDw9IGh5c3RhY2subGVuZ3RoOyBpKyspIHtcclxuXHRcdFx0aWYobmVlZGxlID09IGh5c3RhY2tbaV0pIHJldHVybiB0cnVlO1x0XHJcblx0XHR9XHJcblx0XHJcblx0XHRyZXR1cm4gZmFsc2U7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBDaGVja3MgaWYgYW4gb2JqZWN0IGlzIGVtcHR5LlxyXG5cdCAqL1xyXG5cdHN0YXRpYyBlbXB0eU9iamVjdChvYmplY3QpIHtcclxuXHRcdGZvcih2YXIgcHJvcCBpbiBvYmplY3QpIHtcclxuXHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiB0cnVlO1xyXG5cdH1cclxuXHJcblx0c3RhdGljIGNvbnRhaW5zT2JqZWN0KG9iamVjdCwgaHlzdGFjaykgXHJcblx0e1xyXG5cdCAgICB2YXIgaTtcclxuXHJcblx0ICAgIGZvciAoaSA9IDA7IGkgPCBoeXN0YWNrLmxlbmd0aDsgaSsrKSB7XHJcblx0ICAgICAgICBpZiAodHlwZW9mIG9iamVjdCA9PSAnc3RyaW5nJyAmJiBoeXN0YWNrW2ldLmNvbnN0cnVjdG9yLm5hbWUgPT09IG9iamVjdCkge1xyXG5cdCAgICAgICAgXHRyZXR1cm4gdHJ1ZTtcclxuXHQgICAgICAgIH1cclxuXHJcblx0ICAgICAgICBpZiAoaHlzdGFja1tpXSA9PT0gb2JqZWN0KSB7XHJcblx0ICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcblx0ICAgICAgICB9XHJcblx0ICAgIH1cclxuXHJcblx0ICAgIHJldHVybiBmYWxzZTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIENoZWNrcyBpZiBhIGdpdmVuIHBhcmFtZXRlciBpcyBhbiBvYmplY3QuXHJcblx0ICovXHJcblx0c3RhdGljIGlzT2JqZWN0KG9iamVjdCkgXHJcblx0e1xyXG5cdFx0cmV0dXJuIHR5cGVvZiBvYmplY3QgPT0gJ29iamVjdCc7XHJcblx0fVxyXG59XG5cbmNsYXNzIEludmFsaWRCaW5kaW5nRXhjZXB0aW9uIGV4dGVuZHMgRXJyb3Jcclxue1xyXG5cdGNvbnN0cnVjdG9yKCkgXHJcblx0eyBcclxuICAgIFx0c3VwZXIoKTtcclxuICAgIFx0Y29uc29sZS5lcnJvcihgSW52YWxpZEJpbmRpbmdFeGNlcHRpb24sIHRyeWluZyB0byBiaW5kIGFuIGFscmVhZHkgZXhpc3RpbmcgYm91bmQuYCk7XHJcbiAgICB9XHJcbn1cblxubGV0IGluc3RhbmNlcyA9IFtdO1xyXG5cclxuY2xhc3MgQ29udGFpbmVyIFxyXG57XHJcblx0LyoqXHJcblx0ICogQmluZHMga2V5IHRvIGNvbmNyZXRlIGNsYXNzLlxyXG5cdCAqL1xyXG5cdGJpbmQoa2V5LCBjb25jcmV0ZSkgXHJcblx0e1xyXG5cdFx0aWYgKHR5cGVvZiBrZXkgIT0gJ3N0cmluZycgfHwgdHlwZW9mIGNvbmNyZXRlICE9ICdmdW5jdGlvbicpIHtcclxuXHRcdFx0dGhyb3cgbmV3IEludmFsaWRBcmd1bWVudEV4Y2VwdGlvbiQxO1xyXG5cdFx0fVxyXG5cclxuXHRcdGlmICh0eXBlb2YgdGhpc1trZXldICE9ICd1bmRlZmluZWQnKSB7XHJcblx0XHRcdHRocm93IG5ldyBJbnZhbGlkQmluZGluZ0V4Y2VwdGlvbjtcclxuXHRcdH1cclxuXHJcblx0XHR0aGlzW2tleV0gPSBjb25jcmV0ZS5iaW5kKGNvbmNyZXRlLCB0aGlzKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFNldHMgYW4gaW5zdGFuY2UuXHJcblx0ICovXHJcblx0c2V0SW5zdGFuY2Uoa2V5LCBpbnN0YW5jZSkgXHJcblx0e1xyXG5cdFx0aWYodHlwZW9mIGtleSAhPSAnc3RyaW5nJyB8fCB0eXBlb2YgaW5zdGFuY2UgIT0gJ29iamVjdCcpIHtcclxuXHRcdFx0dGhyb3cgbmV3IEludmFsaWRBcmd1bWVudEV4Y2VwdGlvbiQxO1xyXG5cdFx0fVxyXG5cclxuXHRcdGluc3RhbmNlc1trZXldID0gaW5zdGFuY2U7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBHZXRzIGFuIGluc3RhbmNlLlxyXG5cdCAqL1xyXG5cdGdldEluc3RhbmNlKGtleSkgXHJcblx0e1xyXG5cdFx0aWYodHlwZW9mIGtleSAhPSAnc3RyaW5nJykge1xyXG5cdFx0XHR0aHJvdyBuZXcgSW52YWxpZEFyZ3VtZW50RXhjZXB0aW9uJDE7XHJcblx0XHR9XHJcblxyXG5cdFx0aWYodHlwZW9mIGtleSA9PSAnb2JqZWN0Jykge1xyXG5cdFx0XHRyZXR1cm4gaW5zdGFuY2VzW2tleS5jb25zdHJ1Y3Rvci5uYW1lXSB8fCBudWxsO1xyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiBpbnN0YW5jZXNba2V5XSB8fCBudWxsO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQ2hlY2tzIGlmIGFuIGluc3RhbmNlIGV4aXN0LlxyXG5cdCAqL1xyXG5cdGluc3RhbmNlRXhpc3QoaW5zdGFuY2UpIFxyXG5cdHtcclxuXHRcdGlmKHR5cGVvZiBpbnN0YW5jZSA9PSAnb2JqZWN0Jykge1xyXG5cdFx0XHRyZXR1cm4gKHR5cGVvZiBpbnN0YW5jZXNbaW5zdGFuY2UuY29uc3RydWN0b3IubmFtZV0gIT09ICd1bmRlZmluZWQnKTtcclxuXHRcdH1cclxuXHRcdFxyXG5cdFx0XHJcblx0XHRyZXR1cm4gKGluc3RhbmNlIGluIGluc3RhbmNlcyk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBDcmVhdGVzIGFuIGluc3RhbmNlLlxyXG5cdCAqL1xyXG5cdG1ha2Uob2JqZWN0KVxyXG5cdHtcclxuXHRcdGxldCBpbnN0YW5jZSA9IHt9O1xyXG5cclxuXHRcdGlmICh0aGlzLmluc3RhbmNlRXhpc3Qob2JqZWN0KSkge1xyXG5cdFx0XHRyZXR1cm4gdGhpcy5nZXRJbnN0YW5jZShvYmplY3QpO1xyXG5cdFx0fVxyXG5cclxuXHRcdGlmICh0eXBlb2Ygb2JqZWN0ID09ICdvYmplY3QnKSB7XHJcblx0XHRcdGluc3RhbmNlID0gb2JqZWN0O1xyXG5cdFx0fSBlbHNlIGlmKHR5cGVvZiBvYmplY3QgPT0gJ3N0cmluZycgJiYgdGhpcy5oYXNPd25Qcm9wZXJ0eShvYmplY3QpKSB7XHJcblx0XHRcdGluc3RhbmNlID0gbmV3IHRoaXNbb2JqZWN0XTtcdFxyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0dGhyb3cgbmV3IEludmFsaWRCaW5kaW5nRXhjZXB0aW9uO1xyXG5cdFx0fVxyXG5cclxuXHRcdHRoaXMuc2V0SW5zdGFuY2Uob2JqZWN0LCBpbnN0YW5jZSk7IFxyXG5cclxuXHRcdHJldHVybiBpbnN0YW5jZTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFJldHJpZXZlIGFsbCBpbnN0YW5jZXMuXHJcblx0ICovXHJcblx0aW5zdGFuY2VzKCkgXHJcblx0e1xyXG5cdFx0cmV0dXJuIGluc3RhbmNlcztcclxuXHR9XHJcbn1cblxuY2xhc3MgQ29tcG9uZW50c0V4Y2VwdGlvbiBleHRlbmRzIEVycm9yXHJcbntcclxuXHRjb25zdHJ1Y3RvcigpIFxyXG5cdHsgXHJcbiAgICBcdHN1cGVyKCk7XHJcbiAgICBcdGNvbnNvbGUuZXJyb3IoYENvbXBvbmVudHNFeGNlcHRpb24sIGV4cGVjdGluZyBmb3IgYXQgbGVhc3Qgb25lIGNvbXBvbmVudHMsIGJ1dCBub25lIHdhcyBnaXZlbiwgXHJcblx0XHRcdFx0XHRcdFx0XHRwbGVhc2UgYWRkIGF0IGxlYXN0IG9uZSByZXF1aXJlbWVudChQcm9kdWN0cywgU2VydmljZXMgb3IvYW5kIEZpbHRlci5gKTtcclxuICAgIH1cclxufVxuXG5jbGFzcyBCYWRFdmVudENhbGxFeGNlcHRpb24kMSBleHRlbmRzIEVycm9yXHJcbntcclxuXHRjb25zdHJ1Y3RvcigpIFxyXG5cdHsgXHJcblx0XHRzdXBlcigpO1xyXG4gICAgXHRjb25zb2xlLmVycm9yKGBCYWRFdmVudENhbGxFeGNlcHRpb24sIGxpc3RlbmluZyB0byBhIG5vbmUtZXhpc3RpbmcgZXZlbnQuYCk7XHJcbiAgICB9XHJcbn1cblxuY2xhc3MgTm90SW5QYWdlUmFuZ2VFeGNlcHRpb24gZXh0ZW5kcyBFcnJvclxyXG57XHJcblx0Y29uc3RydWN0b3IoKSBcclxuXHR7IFxyXG4gICAgXHRzdXBlcigpO1xyXG4gICAgXHRjb25zb2xlLmVycm9yKGBOb3RJblBhZ2VSYW5nZUV4Y2VwdGlvbiwgc29ycnksIG5vIG1vcmUgcGFnZXMuYCk7XHJcbiAgICB9XHJcbn1cblxuY2xhc3MgQ29tcG9uZW50Tm90UmVnaXN0ZXJlZEV4Y2VwdGlvbiBleHRlbmRzIEVycm9yXHJcbntcclxuXHRjb25zdHJ1Y3RvcigpIFxyXG5cdHsgXHJcbiAgICBcdHN1cGVyKCk7XHJcbiAgICBcdGNvbnNvbGUuZXJyb3IoYENvbXBvbmVudE5vdFJlZ2lzdGVyZWRFeGNlcHRpb24sIGNvbXBvbmVudHMgbXVzdCBiZSByZWdpc3RlcmVkIGluIG9yZGVyIHRvIHVzZSB0aGVtLmApO1xyXG4gICAgfVxyXG59XG5cbmNsYXNzIEV4Y2VwdGlvbkhhbmRsZXIgZXh0ZW5kcyBFcnJvclxyXG57XHJcblx0LyoqXHJcblx0ICogSGFuZGxlIGFsbCB0aGUgZXJyb3JzXHJcblx0ICovXHJcblx0c3RhdGljIGluaXRhbGl6ZSgpIHtcdFxyXG5cdFx0d2luZG93Lm9uZXJyb3IgPSBmdW5jdGlvbihtZXNzYWdlLCBzb3VyY2UsIGxpbmVubywgY29sbm8sIGVycm9yKSB7XHJcblx0XHRcdFxyXG5cdFx0XHRpZiAoZXJyb3IgaW5zdGFuY2VvZiBJbnZhbGlkQXJndW1lbnRFeGNlcHRpb24kMSkge1xyXG5cdFx0XHRcdC8vIGhhbmRsZVxyXG5cdFx0XHR9IGVsc2UgaWYgKGVycm9yIGluc3RhbmNlb2YgSW52YWxpZEJpbmRpbmdFeGNlcHRpb24pIHtcclxuXHRcdFx0XHQvLyBoYW5kbGVcclxuXHRcdFx0fSBlbHNlIGlmIChlcnJvciBpbnN0YW5jZW9mIEJhZEV2ZW50Q2FsbEV4Y2VwdGlvbiQxKSB7XHJcblx0XHRcdFx0Ly8gaGFuZGxlXHJcblx0XHRcdH0gZWxzZSBpZiAoZXJyb3IgaW5zdGFuY2VvZiBDb21wb25lbnRzRXhjZXB0aW9uKSB7XHJcblx0XHRcdFx0Ly8gaGFuZGxlXHJcblx0XHRcdH0gZWxzZSBpZiAoZXJyb3IgaW5zdGFuY2VvZiBDb21wb25lbnROb3RSZWdpc3RlcmVkRXhjZXB0aW9uKSB7XHJcblx0XHRcdFx0Ly8gaGFuZGxlXHJcblx0XHRcdH0gZWxzZSBpZiAoZXJyb3IgaW5zdGFuY2VvZiBOb3RJblBhZ2VSYW5nZUV4Y2VwdGlvbikge1xyXG5cdFx0XHRcdC8vIGhhbmRsZSBcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHJldHVybiB0cnVlO1xyXG5cdFx0fTtcclxuXHR9XHJcbn1cblxuLyoqXHJcbiAqIFRoZSBkZWZhdWx0IHNldHRpbmdzIG9mIHRoZSBmaWx0ZXIuXHJcbiAqL1xyXG5sZXQgZGVmYXVsdFNldHRpbmdzJDEgPSB7XHJcblx0ZWxlbWVudDogJy5maWx0ZXInLFxyXG5cdGRhdGE6IHt9LFxyXG5cdGNsYXNzOiAnJyxcclxuXHR3aWR0aDogJycsXHJcblx0aGVpZ2h0OiAnJyxcclxufTtcclxuXHJcbi8qKlxyXG4gKiBTdG9yZXMgdGhlIGNvbnRhaW5lciBvYmplY3QuXHJcbiAqL1xyXG5sZXQgQ29udGFpbmVyJDI7XHJcblxyXG4vKipcclxuICogVGhlIEZpbHRlciBPYmplY3QsIGhhbmRsZXMgdGhlIGZpbHRlciBvZiB0aGUgcHJvZHVjdHMvc2VydmljZXMuXHJcbiAqL1xyXG5jbGFzcyBGaWx0ZXIgXHJcbntcclxuXHRjb25zdHJ1Y3Rvcihjb250YWluZXIpIFxyXG5cdHtcclxuXHRcdENvbnRhaW5lciQyID0gY29udGFpbmVyO1xyXG5cdH1cclxuXHJcblx0c2V0dXAoc2V0dGluZ3MpXHJcblx0e1xyXG5cdFx0aWYodHlwZW9mIHNldHRpbmdzICE9ICdvYmplY3QnKSB7XHJcblx0XHRcdHRocm93IG5ldyBJbnZhbGlkQXJndW1lbnRFeGNlcHRpb24kMTtcclxuXHRcdH1cclxuXHJcblx0XHR0aGlzLnNldHRpbmdzID0gQ29tbW9uLmV4dGVuZChkZWZhdWx0U2V0dGluZ3MkMSwgc2V0dGluZ3MpO1xyXG5cclxuXHRcdHRoaXMuc2V0RWxlbWVudCh0aGlzLnNldHRpbmdzLmVsZW1lbnQpO1xyXG5cdH1cclxuXHJcblx0c2V0RWxlbWVudChzZWxlY3RvcilcclxuXHR7XHJcblx0XHR0aGlzLndyYXBwZXIgPSBET00uZmluZChzZWxlY3Rvcik7XHJcblx0XHRcclxuXHRcdERPTS5hZGRDbGFzcyh0aGlzLndyYXBwZXIsIHRoaXMuc2V0dGluZ3MuY2xhc3MpO1xyXG5cdH1cclxufVxuXG5jbGFzcyBTdHJcclxue1xyXG5cclxuXHQvKipcclxuXHQgKiBDb252ZXJ0IGNhbWVsQ2FzZSB0byBrZWJhYi1jYXNlLlxyXG5cdCAqL1xyXG5cdHN0YXRpYyBrZWJhYkNhc2Uoc3RyaW5nKSBcclxuXHR7XHJcblx0XHRyZXR1cm4gc3RyaW5nLnJlcGxhY2UoLyhbYS16XSkoW0EtWl0pL2csICckMS0kMicpLnRvTG93ZXJDYXNlKCk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBHZW5lcmF0ZXMgYSByYW5kb20gc3RyaW5nLlxyXG5cdCAqL1xyXG5cdHN0YXRpYyByYW5kb20obGVuZ3RoKSBcclxuXHR7XHJcblx0XHRsZXQgc3RyaW5nID0gJyc7XHJcblx0XHRsZXQgcG9zc2libGUgPSBcIkFCQ0RFRkdISUpLTE1OT1BRUlNUVVZXWFlaYWJjZGVmZ2hpamtsbW5vcHFyc3R1dnd4eXowMTIzNDU2Nzg5XCI7XHJcblxyXG5cdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xyXG5cdCAgICBcdHN0cmluZyArPSBwb3NzaWJsZS5jaGFyQXQoTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogcG9zc2libGUubGVuZ3RoKSk7XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIHN0cmluZztcclxuXHR9XHJcblxyXG59XG5cbi8qKlxyXG4gKiBUaGUgZGVmYXVsdCBzZXR0aW5ncyBvZiBlYWNoIHByb2R1Y3QuXHJcbiAqL1xyXG5sZXQgZGVmYXVsdFNldHRpbmdzJDIgPSB7XHJcblx0ZWxlbWVudDogJy5wcm9kdWN0cycsXHJcblx0Y2xhc3M6ICcnLFxyXG5cdGl0ZW1fY2xhc3M6ICcnLFxyXG5cdGFkZF9idXR0b25fY2xhc3M6ICdidG4gYnRuLXByaW1hcnknLFxyXG5cdGZhdm9yaXRlX2J1dHRvbl9jbGFzczogJ2J0biBidG4tZGFuZ2VyJyxcclxuXHR3aWR0aDogJzIwMHB4JyxcclxuXHRoZWlnaHQ6ICcyNTBweCcsXHJcblx0YXR0cmlidXRlczogWyduYW1lJywgJ3ByaWNlJywgJ2RlbGl2ZXJ5VGltZScsICdpbWFnZSddLFxyXG5cdHVybDogJ3Byb2R1Y3RzLnBocCcsXHJcbn07XHJcblxyXG4vKipcclxuICogU3RvcmVzIHRoZSBjb250YWluZXIgb2JqZWN0LlxyXG4gKi9cclxubGV0IENvbnRhaW5lciQzO1xyXG5cclxuLyoqXHJcbiAqIFRoZSBQcm9kdWN0cyBPYmplY3QsIGhhbmRsZXMgdGhlIHByb2R1Y3RzLlxyXG4gKi9cclxuY2xhc3MgUHJvZHVjdHMgXHJcbntcclxuXHQvKipcclxuXHQgKiBJbml0YWxpemUgdGhlIENvbnRhaW5lci5cclxuXHQgKi9cclxuXHRjb25zdHJ1Y3Rvcihjb250YWluZXIpIFxyXG5cdHtcclxuXHRcdENvbnRhaW5lciQzID0gY29udGFpbmVyO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogU2V0cyB0aGUgZ2l2ZW4gc2V0dGluZ3MgZnJvbSB0aGUgdXNlci5cclxuXHQgKi9cclxuXHRzZXR1cChzZXR0aW5ncylcclxuXHR7XHJcblx0XHRkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgZnVuY3Rpb24oKSB7XHJcblx0XHRcdFxyXG5cdFx0aWYgKHR5cGVvZiBzZXR0aW5ncyAhPSAnb2JqZWN0Jykge1xyXG5cdFx0XHR0aHJvdyBuZXcgSW52YWxpZEFyZ3VtZW50RXhjZXB0aW9uJDE7XHJcblx0XHR9XHJcblxyXG5cdFx0dGhpcy5zZXR0aW5ncyA9IENvbW1vbi5leHRlbmQoZGVmYXVsdFNldHRpbmdzJDIsIHNldHRpbmdzKTtcclxuXHJcblx0XHR0aGlzLnNldEVsZW1lbnQodGhpcy5zZXR0aW5ncy5lbGVtZW50KTtcclxuXHJcblx0XHR0aGlzLmFkZFN0eWxlVGFnKCk7XHRcclxuXHRcdFxyXG5cdFx0aWYgKENvbnRhaW5lciQzLlBhZ2luYXRpb24gJiYgQ29udGFpbmVyJDMuUGFnaW5hdGlvbi5ib290ZWQpIHtcclxuXHRcdFx0bGV0IGluc3RhbmNlID0gdGhpcztcclxuXHJcblx0XHRcdGluc3RhbmNlLmdldFByb2R1Y3RzQnlQYWdlKDEpLnRoZW4oZnVuY3Rpb24ocHJvZHVjdHMpIHtcclxuXHRcdFx0XHRpbnN0YW5jZS5yZXBsYWNlSXRlbXMocHJvZHVjdHMpO1xyXG5cdFx0XHR9KTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdHRoaXMubG9hZEFsbFByb2R1Y3RzKCk7XHJcblx0XHR9XHJcblxyXG5cdFx0fS5iaW5kKHRoaXMpKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIExvYWRzIHRoZSBwcm9kdWN0cyBhbmQgcmVwbGFjZSB0aGVtIGluIHRoZSBkaXYgY29udGFpbmVyLlxyXG5cdCAqL1xyXG5cdGxvYWRBbGxQcm9kdWN0cygpXHJcblx0e1xyXG5cdFx0bGV0IHJlcXVlc3QgPSB0aGlzLmdldFByb2R1Y3RzKCk7XHJcblx0XHRcdFxyXG5cdFx0cmVxdWVzdC50aGVuKGZ1bmN0aW9uKGl0ZW1zKSB7XHJcblx0XHRcdEV2ZW50LnRyaWdnZXIoJ1Byb2R1Y3RzV2VyZUZldGNoZWQnLCBpdGVtcyk7XHJcblx0XHRcdHRoaXMucmVwbGFjZUl0ZW1zKGl0ZW1zKTtcclxuXHRcdH0uYmluZCh0aGlzKSkuY2F0Y2goZnVuY3Rpb24oZXJyb3IpIHtcclxuXHJcblx0XHR9KTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFNldHMgdGhlIERPTSBlbGVtZW50IGZvciBwb3B1bGF0aW5nIHRoZSBwcm9kdWN0cy5cclxuXHQgKi9cclxuXHRzZXRFbGVtZW50KHNlbGVjdG9yKVxyXG5cdHtcclxuXHRcdHRoaXMud3JhcHBlciA9IERPTS5maW5kKHNlbGVjdG9yKTtcclxuXHJcblx0XHRpZiAodGhpcy53cmFwcGVyKSB7XHJcblx0XHRcdERPTS5hZGRDbGFzcyh0aGlzLndyYXBwZXIsIHRoaXMuc2V0dGluZ3MuY2xhc3MpO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogUmVwbGFjZSBpdGVtcyBpbiB0aGUgY29udGFpbmVyLlxyXG5cdCAqL1xyXG5cdHJlcGxhY2VJdGVtcyhpdGVtcykgXHJcblx0e1xyXG5cdFx0aWYgKCEgQXJyYXkuaXNBcnJheShpdGVtcykgfHwgKGl0ZW1zLmxlbmd0aCA8PSAwICYmIHR5cGVvZiBpdGVtc1swXSA9PSAnc3RyaW5nJykpIHtcclxuXHRcdFx0dGhyb3cgbmV3IEludmFsaWRBcmd1bWVudEV4Y2VwdGlvbiQxO1xyXG5cdFx0fVxyXG5cclxuXHRcdGxldCBwcm9kdWN0cyA9IHRoaXMuYnVpbGRQcm9kdWN0cyhpdGVtcywgdGhpcy5zZXR0aW5ncy5pdGVtX2NsYXNzLCAnZGl2Jyk7XHJcblxyXG5cdFx0dGhpcy53cmFwcGVyLmlubmVySFRNTCA9ICcnO1xyXG5cdFx0cHJvZHVjdHMuZm9yRWFjaChmdW5jdGlvbihwcm9kdWN0KSB7XHJcblx0XHRcdHRoaXMud3JhcHBlci5hcHBlbmRDaGlsZChwcm9kdWN0KTtcclxuXHRcdH0uYmluZCh0aGlzKSk7XHJcblxyXG5cdFx0cmV0dXJuIGl0ZW1zO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogTWFrZXMgYW4gQWpheCBjYWxsIHRvIHRoZSBzZXJ2ZXIgd2l0aG91dCBwYXJhbWV0ZXJzLlxyXG5cdCAqL1xyXG5cdGdldFByb2R1Y3RzKClcclxuXHR7XHJcblx0XHRyZXR1cm4gdGhpcy5hc2tTZXJ2ZXIoKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIE1ha2VzIGFuIEFqYXggY2FsbCB0byB0aGUgc2VydmVyLlxyXG5cdCAqL1xyXG5cdGdldFByb2R1Y3RzQnlQYWdlKHBhZ2VOdW1iZXIpIFxyXG5cdHtcclxuXHRcdHJldHVybiB0aGlzLmFza1NlcnZlcihwYWdlTnVtYmVyKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFNlbmRzIHRoZSByZXF1ZXN0IHRvIHRoZSBzZXJ2ZXIuXHJcblx0ICovXHJcblx0YXNrU2VydmVyKHBhZ2VOdW1iZXIpXHJcblx0e1xyXG5cdFx0cGFnZU51bWJlciA9IHBhZ2VOdW1iZXIgfHwgbnVsbDtcclxuXHJcblx0XHRyZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XHJcblxyXG5cdFx0XHRsZXQgeGhyID0gbmV3IFhNTEh0dHBSZXF1ZXN0IHx8IG5ldyBBY3RpdmVYT2JqZWN0KFwiTWljcm9zb2Z0LlhNTEhUVFBcIik7XHJcblxyXG5cdFx0XHRpZihwYWdlTnVtYmVyKSB7XHJcblx0XHRcdFx0eGhyLm9wZW4oJ0dFVCcsIHRoaXMuc2V0dGluZ3MudXJsICsgJz9wYWdlPScgKyBwYWdlTnVtYmVyLCB0cnVlKTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHR4aHIub3BlbignR0VUJywgdGhpcy5zZXR0aW5ncy51cmwsIHRydWUpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHR4aHIuc2V0UmVxdWVzdEhlYWRlcignQ29udGVudC1UeXBlJywgJ2FwcGxpY2F0aW9uL2pzb24nKTtcclxuXHRcdFx0XHJcblx0XHRcdGxldCBpbnN0YW5jZSA9IHRoaXM7XHJcblxyXG5cdFx0XHR4aHIub25yZWFkeXN0YXRlY2hhbmdlID0gZnVuY3Rpb24oKSB7XHJcblx0XHRcdFx0aWYgKHRoaXMucmVhZHlTdGF0ZSA9PSA0KSB7XHJcblx0XHRcdFx0XHRpZiAodGhpcy5zdGF0dXMgPT0gMjAwKSB7XHJcblx0XHRcdFx0XHRcdGluc3RhbmNlLmN1cnJlbnRJdGVtcyA9ICh0aGlzLnJlc3BvbnNlVGV4dCA9PSAnJykgPyBbXSA6IEpTT04ucGFyc2UodGhpcy5yZXNwb25zZVRleHQpO1xyXG5cdFx0XHRcdFx0XHJcblx0XHRcdFx0XHRcdGlmKGluc3RhbmNlLmN1cnJlbnRJdGVtcy5sZW5ndGggPT09IDApIHtcclxuXHRcdFx0XHRcdFx0XHRyZWplY3QoJ05vIEl0ZW1zIHdlcmUgcmV0cmlldmVkIScpO1xyXG5cdFx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGluc3RhbmNlLmN1cnJlbnRJdGVtcy5sZW5ndGg7IGkrKykge1xyXG5cdFx0XHRcdFx0XHRcdHZhciBwcm9kdWN0ID0gaW5zdGFuY2UuY3VycmVudEl0ZW1zW2ldO1xyXG5cdFx0XHRcdFx0XHRcdGluc3RhbmNlLkFmdGVyTG9hZGVkLmNhbGwodGhpcywgcHJvZHVjdCk7XHJcblx0XHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0XHRcdHJlc29sdmUoaW5zdGFuY2UuY3VycmVudEl0ZW1zKTtcclxuXHRcdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRcdHJlamVjdCh0aGlzLnN0YXR1c1RleHQpO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0fTtcclxuXHJcblx0XHRcdHhoci5vbmVycm9yID0gZnVuY3Rpb24oZXJyb3IpIHtcclxuXHRcdFx0XHRyZWplY3QoZXJyb3IpO1xyXG5cdFx0XHR9O1xyXG5cclxuXHRcdFx0eGhyLnNlbmQobnVsbCk7XHJcblx0XHR9LmJpbmQodGhpcykpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQnVpbGRzIHRoZSBodG1sIGZvciB0aGUgcHJvZHVjdHMuXHJcblx0ICovXHJcblx0YnVpbGRQcm9kdWN0cyhhdHRyaWJ1dGVzQ29sbGVjdGlvbiwgY2xhc3NOYW1lLCB0YWdUeXBlKSBcclxuXHR7XHJcblx0XHRpZihhdHRyaWJ1dGVzQ29sbGVjdGlvbi5jb25zdHJ1Y3Rvci5uYW1lICE9ICdBcnJheScgKSB7XHJcblx0XHRcdHRocm93IG5ldyBJbnZhbGlkQXJndW1lbnRFeGNlcHRpb24kMTtcclxuXHRcdH1cclxuXHJcblx0XHRsZXQgYnVpbHRQcm9kdWN0cyA9IFtdO1xyXG5cclxuXHRcdGF0dHJpYnV0ZXNDb2xsZWN0aW9uLmZvckVhY2goZnVuY3Rpb24oYXR0cmlidXRlcykge1xyXG5cdFx0XHRsZXQgYnVpbHRQcm9kdWN0ID0gdGhpcy5idWlsZFByb2R1Y3QoYXR0cmlidXRlcywgY2xhc3NOYW1lLCB0YWdUeXBlKTtcclxuXHRcdFx0YnVpbHRQcm9kdWN0cy5wdXNoKGJ1aWx0UHJvZHVjdCk7XHJcblx0XHR9LmJpbmQodGhpcykpO1xyXG5cclxuXHRcdHJldHVybiBidWlsdFByb2R1Y3RzO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQnVpbGRzIHRoZSBodG1sIGZvciBhIHNpbmdsZSBwcm9kdWN0LlxyXG5cdCAqL1xyXG5cdGJ1aWxkUHJvZHVjdChhdHRyaWJ1dGVzLCBjbGFzc05hbWUsIHRhZ1R5cGUpIFxyXG5cdHtcclxuXHRcdGlmICh0eXBlb2YgYXR0cmlidXRlcyAhPSAnb2JqZWN0JyB8fCB0eXBlb2YgdGFnVHlwZSAhPSAnc3RyaW5nJykge1xyXG5cdFx0XHR0aHJvdyBuZXcgSW52YWxpZEFyZ3VtZW50RXhjZXB0aW9uJDE7XHJcblx0XHR9XHJcblxyXG5cdFx0Y2xhc3NOYW1lID0gY2xhc3NOYW1lIHx8IG51bGw7XHJcblxyXG5cdFx0bGV0IHByb2R1Y3QgPSBET00uY3JlYXRlRWxlbWVudCgnZGl2Jywge1xyXG5cdFx0XHRjbGFzczogJ3Byb2R1Y3QnXHJcblx0XHR9KTtcclxuXHJcblx0XHRET00uYWRkQ2xhc3MocHJvZHVjdCwgY2xhc3NOYW1lKTtcclxuXHJcblx0XHRsZXQgb3ZlcmxheSA9IERPTS5jcmVhdGVFbGVtZW50KCdkaXYnLCB7XHJcblx0XHRcdGNsYXNzOiAncHJvZHVjdC1vdmVybGF5JyxcclxuXHRcdH0pO1xyXG5cclxuXHRcdHByb2R1Y3QuYXBwZW5kQ2hpbGQob3ZlcmxheSk7XHJcblxyXG5cdFx0Zm9yICh2YXIgYXR0cmlidXRlIGluIGF0dHJpYnV0ZXMpIHtcclxuXHRcdFx0aWYgKCEgQ29tbW9uLmluX2FycmF5KGF0dHJpYnV0ZSwgdGhpcy5zZXR0aW5ncy5hdHRyaWJ1dGVzKSkge1xyXG5cdFx0XHRcdGNvbnRpbnVlO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRsZXQgdGFnID0gRE9NLmNyZWF0ZUVsZW1lbnQodGFnVHlwZSk7XHJcblxyXG5cdFx0XHRpZiAoYXR0cmlidXRlID09ICdpbWFnZScpIHtcclxuXHRcdFx0XHRsZXQgaW1hZ2UgPSBET00uY3JlYXRlRWxlbWVudCgnaW1nJywge1xyXG5cdFx0XHRcdFx0c3JjOiBhdHRyaWJ1dGVzW2F0dHJpYnV0ZV1cclxuXHRcdFx0XHR9KTtcclxuXHRcdFx0XHRwcm9kdWN0LmFwcGVuZENoaWxkKGltYWdlKTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHR0YWcuaW5uZXJIVE1MID0gYXR0cmlidXRlc1thdHRyaWJ1dGVdIHx8ICcnO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRET00uYWRkQ2xhc3ModGFnLCAncHJvZHVjdC0nICsgU3RyLmtlYmFiQ2FzZShhdHRyaWJ1dGUpKTtcclxuXHRcdFx0b3ZlcmxheS5hcHBlbmRDaGlsZCh0YWcpO1xyXG5cdFx0fVxyXG5cclxuXHRcdGxldCB0YWcgPSBET00uY3JlYXRlRWxlbWVudCgnZGl2Jywge1xyXG5cdFx0XHRpZDogJ2FjdGlvbkJ1dHRvbnMnLFxyXG5cdFx0XHRjbGFzczogJ2FjdGlvbi1idXR0b25zJ1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0bGV0IGFkZFRvQ2FydCA9IERPTS5jcmVhdGVFbGVtZW50KCdidXR0b24nLCB7XHJcblx0XHRcdGlkOiAnYWRkVG9DYXJ0JyxcclxuXHRcdFx0Y2xhc3M6IHRoaXMuc2V0dGluZ3MuYWRkX2J1dHRvbl9jbGFzcyxcclxuXHRcdFx0dHlwZTogJ2J1dHRvbicsXHJcblx0XHRcdHRleHQ6ICcrJyxcclxuXHRcdH0pO1xyXG5cclxuXHRcdGxldCBmYXZvcml0ZSA9IERPTS5jcmVhdGVFbGVtZW50KCdidXR0b24nLCB7XHJcblx0XHRcdGlkOiAnZmF2b3JpdGUnLFxyXG5cdFx0XHRjbGFzczogdGhpcy5zZXR0aW5ncy5mYXZvcml0ZV9idXR0b25fY2xhc3MsXHJcblx0XHRcdHR5cGU6ICdidXR0b24nLFxyXG5cdFx0XHR0ZXh0OiAnJmhlYXJ0czsnXHJcblx0XHR9KTtcclxuXHJcblx0XHR0YWcuYXBwZW5kQ2hpbGQoYWRkVG9DYXJ0KTtcclxuXHRcdHRhZy5hcHBlbmRDaGlsZChmYXZvcml0ZSk7XHJcblxyXG5cdFx0YWRkVG9DYXJ0LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oZXZlbnQpIHtcclxuXHRcdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuXHRcdFx0RXZlbnQudHJpZ2dlcignUHJvZHVjdFdhc0FkZGVkJywgYXR0cmlidXRlcyk7XHJcblx0XHR9KTtcclxuXHJcblx0XHRvdmVybGF5LmFwcGVuZENoaWxkKHRhZyk7XHJcblxyXG5cdFx0cmV0dXJuIHByb2R1Y3Q7XHJcblx0fVxyXG5cclxuXHRhZGRUb0NhcnQoZXZlbnQpXHJcblx0e1xyXG5cdFx0XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBBbiBldmVudCBmb3IgdGhlIGNsaWVudCBvZiB3aGVuIHRoZSBwcm9kdWN0cyBhcyBiZWVuIGxvYWRlZC5cclxuXHQgKi9cclxuXHRBZnRlckxvYWRlZChwcm9kdWN0KSBcclxuXHR7XHJcblx0XHQvL1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQWRkIHRoZSBlQ29tbWVyY2Ugc3R5bGUgdGFncyB0byB0aGUgRE9NLlxyXG5cdCAqL1xyXG5cdGFkZFN0eWxlVGFnKCkgXHJcblx0e1xyXG5cdFx0aWYoRE9NLmZpbmQoJyNlQ29tbWVyY2UtUHJvZHVjdHMnKSkge1xyXG5cdFx0XHRyZXR1cm47XHJcblx0XHR9XHJcblxyXG5cdFx0bGV0IGNzcyA9IGBcclxuXHRcdFx0LnByb2R1Y3Qge1xyXG5cdFx0XHRcdHBvc2l0aW9uOiByZWxhdGl2ZTtcclxuXHRcdFx0XHRtYXJnaW46IDVweCA1cHg7XHJcblx0XHRcdFx0Ym9yZGVyOiAxcHggc29saWQgI2U0ZTRlNDtcclxuXHRcdFx0XHR3aWR0aDogJHt0aGlzLnNldHRpbmdzLndpZHRofTtcclxuXHRcdFx0XHRoZWlnaHQ6ICR7dGhpcy5zZXR0aW5ncy5oZWlnaHR9O1xyXG5cdFx0XHRcdGN1cnNvcjogcG9pbnRlcjtcclxuXHRcdFx0XHRjb2xvcjogI2ZmZmZmZjtcclxuXHRcdFx0XHRvdmVyZmxvdzogaGlkZGVuO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHQucHJvZHVjdCA+IC5wcm9kdWN0LW92ZXJsYXkge1xyXG5cdFx0XHRcdHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuXHRcdFx0XHR0b3A6IDA7XHJcblx0XHRcdFx0bGVmdDogMDtcclxuXHRcdFx0XHR3aWR0aDogMTAwJTtcclxuXHRcdFx0XHRoZWlnaHQ6IDEwMCU7XHJcblx0XHRcdFx0b3BhY2l0eTogMC41O1xyXG5cdFx0XHRcdHotaW5kZXg6IDU7XHJcblx0XHRcdFx0dHJhbnNpdGlvbjogMXMgYWxsO1xyXG5cdFx0XHRcdHRyYW5zZm9ybTogdHJhbnNsYXRlWCgtMjUwcHgpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHQucHJvZHVjdDpob3ZlciA+IC5wcm9kdWN0LW92ZXJsYXkge1xyXG5cdFx0XHRcdGJhY2tncm91bmQ6IHJnYmEoMCwgMCwgMCwgMC40NSk7XHJcblx0XHRcdFx0dHJhbnNmb3JtOiB0cmFuc2xhdGVYKDBweCk7XHJcblx0XHRcdFx0b3BhY2l0eTogMTtcclxuXHRcdFx0XHR0cmFuc2l0aW9uOiAxcyBhbGw7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdC5wcm9kdWN0ID4gaW1nIHtcclxuXHRcdFx0XHRwb3NpdGlvbjogYWJzb2x1dGU7XHJcblx0XHRcdFx0bGVmdDogMDtcclxuXHRcdFx0XHR0b3A6IDA7XHJcblx0XHRcdFx0d2lkdGg6IDEwMCU7XHJcblx0XHRcdFx0aGVpZ2h0OiAxMDAlO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHQucHJvZHVjdCA+IC5wcm9kdWN0LWltYWdlIHtcclxuXHRcdFx0XHR6LWluZGV4OiAwO1xyXG5cdFx0XHRcdHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuXHRcdFx0XHR0b3A6IDA7XHJcblx0XHRcdFx0bGVmdDogMDtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0LnByb2R1Y3QgPiAucHJvZHVjdC1vdmVybGF5ID4gLnByb2R1Y3QtbmFtZSwgXHJcblx0XHRcdC5wcm9kdWN0ID4gLnByb2R1Y3Qtb3ZlcmxheSA+IC5wcm9kdWN0LXByaWNlLFxyXG5cdFx0XHQucHJvZHVjdCA+IC5wcm9kdWN0LW92ZXJsYXkgPiAucHJvZHVjdC1kZWxpdmVyeS10aW1lIHtcclxuXHRcdFx0XHR6LWluZGV4OiAxO1xyXG5cdFx0XHRcdHBvc2l0aW9uOiByZWxhdGl2ZTtcclxuXHRcdFx0XHR0ZXh0LWFsaWduOiBjZW50ZXI7XHJcblx0XHRcdFx0bWFyZ2luLXRvcDogMjVweDtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0LnByb2R1Y3QgPiAucHJvZHVjdC1vdmVybGF5ID4gLmFjdGlvbi1idXR0b25zIHtcclxuXHRcdFx0XHR3aWR0aDogMTAwJTtcclxuXHRcdFx0XHRtYXJnaW4tdG9wOiAxMHB4O1xyXG5cdFx0XHRcdHRleHQtYWxpZ246IGNlbnRlcjtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0LnByb2R1Y3QgPiAucHJvZHVjdC1vdmVybGF5ID4gLmFjdGlvbi1idXR0b25zID4gI2Zhdm9yaXRlIHtcclxuXHRcdFx0XHRtYXJnaW4tbGVmdDogMTBweDtcclxuXHRcdFx0fVxyXG5cclxuXHRcdGA7XHJcblx0ICAgIFxyXG5cdCAgICBET00uYWRkU3R5bGUoJ2VDb21tZXJjZS1Qcm9kdWN0cycsIGNzcyk7XHJcblx0fVxyXG59XG5cbi8qKlxyXG4gKiBUaGUgU2VydmljZXMgT2JqZWN0LCBoYW5kbGVzIHRoZSBzZXJ2aWNlcy5cclxuICovXHJcbmNsYXNzIFNlcnZpY2VzIFxyXG57XHJcblxyXG59XG5cbi8qKlxyXG4gKiBUaGUgZGVmYXVsdCBzZXR0aW5ncyBvZiB0aGUgcGFnaW5hdGlvbi5cclxuICovXHJcbmxldCBkZWZhdWx0U2V0dGluZ3MkMyA9IHtcclxuXHRlbGVtZW50OiAnLnBhZ2luYXRpb24tbGlua3MnLFxyXG5cdGNsYXNzOiAnJyxcclxuXHRwZXJfcGFnZTogNSxcclxuXHR0b3RhbF9pdGVtczogMTAsXHJcbn07XHJcblxyXG4vKipcclxuICogU3RvcmVzIHRoZSBjb250YWluZXIgb2JqZWN0LlxyXG4gKi9cclxubGV0IENvbnRhaW5lciQ0O1xyXG5cclxuLyoqXHJcbiAqIFN0b3JlcyB0aGUgcHJvZHVjdHMgY29tcG9uZW50LlxyXG4gKi9cclxubGV0IFByb2R1Y3RzJDI7XHJcblxyXG4vKipcclxuICogVGhlIFBhZ2luYXRpb24gT2JqZWN0LCBoYW5kbGVzIHRoZSBwYWdpbmF0aW9uLlxyXG4gKi9cclxuY2xhc3MgUGFnaW5hdGlvbiBcclxue1xyXG5cdC8qKlxyXG5cdCAqIEluaXRpYWxpemUgdGhlIGNvbnRhaW5lciBvYmplY3QgYW5kIHRoZSBkZWZhdWx0IHNldHRpbmdzLlxyXG5cdCAqL1xyXG5cdGNvbnN0cnVjdG9yKGNvbnRhaW5lciwgcHJvZHVjdHMpIFxyXG5cdHtcclxuXHRcdHRoaXMuc2V0Q3VycmVudCgxKTtcclxuXHRcdENvbnRhaW5lciQ0ID0gY29udGFpbmVyO1xyXG5cdFx0UHJvZHVjdHMkMiA9IHByb2R1Y3RzO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogU2V0IHRoZSBQYWdpbmF0aW9uIG9iamVjdCB1cC5cclxuXHQgKi9cclxuXHRzZXR1cChzZXR0aW5ncylcclxuXHR7XHJcblx0XHRkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgZnVuY3Rpb24oKSB7XHJcblxyXG5cdFx0aWYodHlwZW9mIHNldHRpbmdzICE9ICdvYmplY3QnKSB7XHJcblx0XHRcdHRocm93IG5ldyBJbnZhbGlkQXJndW1lbnRFeGNlcHRpb24kMTtcclxuXHRcdH1cclxuXHJcblx0XHR0aGlzLnNldHRpbmdzID0gQ29tbW9uLmV4dGVuZChkZWZhdWx0U2V0dGluZ3MkMywgc2V0dGluZ3MpO1xyXG5cclxuXHRcdHRoaXMudG90YWxQYWdlcyA9IHRoaXMuY2FsY3VsYXRlVG90YWxQYWdlcyh0aGlzLnNldHRpbmdzLnBlcl9wYWdlLCB0aGlzLnNldHRpbmdzLnRvdGFsX2l0ZW1zKTtcclxuXHRcdFxyXG5cdFx0dGhpcy5zZXRFbGVtZW50KHRoaXMuc2V0dGluZ3MuZWxlbWVudCk7XHJcblx0XHR0aGlzLnJlcGxhY2VMaW5rcyh0aGlzLmxpbmtzKTtcclxuXHJcblx0XHR9LmJpbmQodGhpcykpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogU2V0cyB0aGUgd3JhcHBlciBlbGVtZW50LlxyXG5cdCAqL1xyXG5cdHNldEVsZW1lbnQoc2VsZWN0b3IpXHJcblx0e1xyXG5cdFx0dGhpcy53cmFwcGVyID0gRE9NLmZpbmQoc2VsZWN0b3IpO1xyXG5cdFx0XHJcblx0XHRET00uYWRkQ2xhc3ModGhpcy53cmFwcGVyLCB0aGlzLnNldHRpbmdzLmNsYXNzKTtcclxuXHJcblx0XHR0aGlzLmxpbmtzID0gdGhpcy5jcmVhdGVMaW5rcygpO1xyXG5cdFx0dGhpcy5iaW5kRXZlbnRMaXN0ZW5lcnModGhpcy5saW5rcyk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBSZXBsYWNlcyB0aGUgbGlua3MgaW4gdGhlIHdyYXBwZXIuXHJcblx0ICovXHJcblx0cmVwbGFjZUxpbmtzKGxpbmtzKVxyXG5cdHtcclxuXHRcdHRoaXMud3JhcHBlci5pbm5lckhUTUwgPSAnJztcclxuXHRcdHRoaXMud3JhcHBlci5hcHBlbmRDaGlsZChsaW5rcyk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBDYWxjdWxhdGVzIHRoZSB0b3RhbCBwYWdlcy5cclxuXHQgKi9cclxuXHRjYWxjdWxhdGVUb3RhbFBhZ2VzKHBlclBhZ2UsIHRvdGFsSXRlbXMpXHJcblx0e1xyXG5cdFx0cGVyUGFnZSA9IHBhcnNlSW50KHBlclBhZ2UpO1xyXG5cdFx0dG90YWxJdGVtcyA9IHBhcnNlSW50KHRvdGFsSXRlbXMpO1xyXG5cclxuXHRcdHJldHVybiBNYXRoLmNlaWwodG90YWxJdGVtcyAvIHBlclBhZ2UpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQmluZHMgdGhlIGJ1dHRvbnMgZXZlbnRzIGxpc3RlbmVycy5cclxuXHQgKi9cclxuXHRiaW5kRXZlbnRMaXN0ZW5lcnMobGlua3MpIFxyXG5cdHtcclxuXHRcdGxldCBpbnN0YW5jZSA9IHRoaXM7XHJcblxyXG5cdFx0dGhpcy5uZXh0LmNoaWxkTm9kZXNbMF0ub25jbGljayA9IGZ1bmN0aW9uKGV2ZW50KSB7XHJcblx0XHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG5cdFx0XHRsZXQgcmVxdWVzdGVkUGFnZSA9IGluc3RhbmNlLmN1cnJlbnQrMTtcclxuXHJcblx0XHRcdGlmIChpbnN0YW5jZS5ub3RJblBhZ2VSYW5nZShyZXF1ZXN0ZWRQYWdlKSkge1xyXG5cdFx0XHRcdHRocm93IG5ldyBOb3RJblBhZ2VSYW5nZUV4Y2VwdGlvbjtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0UHJvZHVjdHMkMi5nZXRQcm9kdWN0c0J5UGFnZShyZXF1ZXN0ZWRQYWdlKS50aGVuKGZ1bmN0aW9uKHByb2R1Y3RzKSB7XHJcblx0XHRcdFx0UHJvZHVjdHMkMi5yZXBsYWNlSXRlbXMocHJvZHVjdHMpO1xyXG5cdFx0XHR9KTtcclxuXHJcblx0XHRcdGluc3RhbmNlLnNldEN1cnJlbnQocmVxdWVzdGVkUGFnZSk7XHJcblx0XHR9O1xyXG5cclxuXHRcdHRoaXMucHJldmlvdXMuY2hpbGROb2Rlc1swXS5vbmNsaWNrID0gZnVuY3Rpb24oZXZlbnQpIHtcclxuXHRcdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuXHJcblx0XHRcdGxldCByZXF1ZXN0ZWRQYWdlID0gaW5zdGFuY2UuY3VycmVudC0xO1xyXG5cclxuXHRcdFx0aWYoaW5zdGFuY2Uubm90SW5QYWdlUmFuZ2UocmVxdWVzdGVkUGFnZSkpIHtcclxuXHRcdFx0XHR0aHJvdyBuZXcgTm90SW5QYWdlUmFuZ2VFeGNlcHRpb247XHJcblx0XHRcdH1cclxuXHRcdFx0XHJcblx0XHRcdFByb2R1Y3RzJDIuZ2V0UHJvZHVjdHNCeVBhZ2UocmVxdWVzdGVkUGFnZSkudGhlbihmdW5jdGlvbihwcm9kdWN0cykge1xyXG5cdFx0XHRcdFByb2R1Y3RzJDIucmVwbGFjZUl0ZW1zKHByb2R1Y3RzKTtcclxuXHRcdFx0fSk7XHJcblxyXG5cdFx0XHRpbnN0YW5jZS5zZXRDdXJyZW50KHJlcXVlc3RlZFBhZ2UpO1xyXG5cdFx0fTtcclxuXHJcblx0XHRmb3IodmFyIGkgPSAwOyBpIDwgdGhpcy5wYWdlcy5sZW5ndGg7IGkrKykge1xyXG5cdFx0XHR0aGlzLnBhZ2VzW2ldLmNoaWxkTm9kZXNbMF0ub25jbGljayA9IGZ1bmN0aW9uKGV2ZW50KSB7XHJcblx0XHRcdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuXHRcdFx0XHRcclxuXHRcdFx0XHRsZXQgcmVxdWVzdGVkUGFnZSA9IHRoaXMuZ2V0QXR0cmlidXRlKCdkYXRhLXBhZ2UtbnInKTtcclxuXHRcdFx0XHRcclxuXHRcdFx0XHRQcm9kdWN0cyQyLmdldFByb2R1Y3RzQnlQYWdlKHJlcXVlc3RlZFBhZ2UpLnRoZW4oZnVuY3Rpb24ocHJvZHVjdHMpIHtcclxuXHRcdFx0XHRcdFByb2R1Y3RzJDIucmVwbGFjZUl0ZW1zKHByb2R1Y3RzKTtcclxuXHRcdFx0XHR9KTtcclxuXHRcdFx0XHRcclxuXHRcdFx0XHRpbnN0YW5jZS5zZXRDdXJyZW50KHJlcXVlc3RlZFBhZ2UpO1xyXG5cdFx0XHR9O1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogU2V0cyB0aGUgY3VycmVudCBwYWdlLlxyXG5cdCAqL1xyXG5cdHNldEN1cnJlbnQocGFnZU51bWJlcikgXHJcblx0e1xyXG5cdFx0dGhpcy5jdXJyZW50ID0gcGFyc2VJbnQocGFnZU51bWJlcik7XHJcblx0XHR0aGlzLmNoYW5nZVVybChwYWdlTnVtYmVyKTtcclxuXHRcdHRoaXMuc2V0QWN0aXZlTGluayhwYWdlTnVtYmVyKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEdldHMgdGhlIGN1cnJlbnQgcGFnZS5cclxuXHQgKi9cclxuXHRnZXRDdXJyZW50KCkgXHJcblx0e1xyXG5cdFx0cmV0dXJuIHRoaXMuY3VycmVudDtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIENyZWF0ZXMgdGhlIHBhZ2luYXRpb24gbGlua3MuXHJcblx0ICovXHJcblx0Y3JlYXRlTGlua3MoKSBcclxuXHR7XHJcblx0XHRsZXQgdWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd1bCcpO1xyXG5cdFx0XHJcblx0XHR0aGlzLnBhZ2VzID0gdGhpcy5jcmVhdGVQYWdlTGlua3MoKTtcclxuXHRcdHRoaXMucHJldmlvdXMgPSB0aGlzLmNyZWF0ZVByZXZpb3VzQnV0dG9uKCk7XHJcblx0XHR0aGlzLm5leHQgPSB0aGlzLmNyZWF0ZU5leHRCdXR0b24oKTtcclxuXHJcblx0XHR1bC5jbGFzc05hbWUgPSAncGFnaW5hdGlvbic7XHJcblx0XHR1bC5hcHBlbmRDaGlsZCh0aGlzLnByZXZpb3VzKTtcclxuXHJcblx0XHR0aGlzLnBhZ2VzLmZvckVhY2goZnVuY3Rpb24ocGFnZSkge1xyXG5cdFx0XHR1bC5hcHBlbmRDaGlsZChwYWdlKTtcclxuXHRcdH0pO1xyXG5cclxuXHRcdHVsLmFwcGVuZENoaWxkKHRoaXMubmV4dCk7XHJcblxyXG5cdFx0cmV0dXJuIHVsO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQ3JlYXRlcyB0aGUgcGFnZXMgaXRlbSBsaW5rcy5cclxuXHQgKi9cclxuXHRjcmVhdGVQYWdlTGlua3MoKSBcclxuXHR7XHJcblx0XHR2YXIgcGFnZXMgPSBbXTtcclxuXHJcblx0XHRmb3IodmFyIGkgPSAxOyBpIDw9IHRoaXMudG90YWxQYWdlczsgaSsrKSB7XHJcblx0XHRcdHZhciBwYWdlSXRlbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJyk7XHJcblx0XHRcdHZhciBsaW5rID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpO1xyXG5cdFx0XHRwYWdlSXRlbS5jbGFzc05hbWUgPSAodGhpcy5jdXJyZW50ID09IGkpID8gJ3BhZ2UtaXRlbSBhY3RpdmUnIDogJ3BhZ2UtaXRlbSc7XHJcblx0XHRcdGxpbmsuY2xhc3NOYW1lID0gJ3BhZ2UtbGluayc7XHJcblx0XHRcdGxpbmsuc2V0QXR0cmlidXRlKCdocmVmJywgJz9wYWdlPScrIGkpO1xyXG5cdFx0XHRsaW5rLnNldEF0dHJpYnV0ZSgnZGF0YS1wYWdlLW5yJywgaSk7XHJcblx0XHRcdGxpbmsuaW5uZXJIVE1MID0gaTtcclxuXHRcdFx0cGFnZUl0ZW0uYXBwZW5kQ2hpbGQobGluayk7XHJcblx0XHRcdHBhZ2VzLnB1c2gocGFnZUl0ZW0pO1xyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiBwYWdlcztcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIENyZWF0ZXMgdGhlIHByZXZpb3VzIGJ1dHRvbiBsaW5rLlxyXG5cdCAqL1xyXG5cdGNyZWF0ZVByZXZpb3VzQnV0dG9uKCkgXHJcblx0e1xyXG5cdFx0dmFyIGxpID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKTtcclxuXHRcdHZhciBsaW5rID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpO1xyXG5cdFx0dmFyIHNwYW4xID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xyXG5cdFx0dmFyIHNwYW4yID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xyXG5cdFx0XHJcblx0XHRcclxuXHRcdGxpLmNsYXNzTmFtZSA9ICdwYWdlLWl0ZW0nO1xyXG5cdFx0bGluay5jbGFzc05hbWUgPSAncGFnZS1saW5rJztcclxuXHRcdHNwYW4yLmNsYXNzTmFtZSA9ICdzci1vbmx5JztcclxuXHJcblx0XHRsaW5rLnNldEF0dHJpYnV0ZSgnaHJlZicsICcnKTtcclxuXHRcdGxpbmsuc2V0QXR0cmlidXRlKCdhcmlhLWxhYmVsJywgJ1ByZXZpb3VzJyk7XHJcblx0XHRzcGFuMS5zZXRBdHRyaWJ1dGUoJ2FyaWEtaGlkZGVuJywgJ3RydWUnKTtcclxuXHJcblx0XHRzcGFuMS5pbm5lckhUTUwgPSAnJmxhcXVvOyc7XHJcblx0XHRzcGFuMi5pbm5lckhUTUwgPSAnUHJldmlvdXMnO1xyXG5cclxuXHRcdGxpbmsuYXBwZW5kQ2hpbGQoc3BhbjEpO1xyXG5cdFx0bGluay5hcHBlbmRDaGlsZChzcGFuMik7XHJcblx0XHRsaS5hcHBlbmRDaGlsZChsaW5rKTtcclxuXHJcblx0XHRyZXR1cm4gbGk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBDcmVhdGVzIHRoZSBuZXh0IGJ1dHRvbiBsaW5rLlxyXG5cdCAqL1xyXG5cdGNyZWF0ZU5leHRCdXR0b24oKSBcclxuXHR7XHJcblx0XHR2YXIgbGkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaScpO1xyXG5cdFx0dmFyIGxpbmsgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJyk7XHJcblx0XHR2YXIgc3BhbjEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XHJcblx0XHR2YXIgc3BhbjIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XHJcblx0XHRcclxuXHRcdGxpLmNsYXNzTmFtZSA9ICdwYWdlLWl0ZW0nO1xyXG5cdFx0bGluay5jbGFzc05hbWUgPSAncGFnZS1saW5rJztcclxuXHRcdHNwYW4yLmNsYXNzTmFtZSA9ICdzci1vbmx5JztcclxuXHJcblx0XHRsaW5rLnNldEF0dHJpYnV0ZSgnaHJlZicsICcnKTtcclxuXHRcdGxpbmsuc2V0QXR0cmlidXRlKCdhcmlhLWxhYmVsJywgJ05leHQnKTtcclxuXHRcdHNwYW4xLnNldEF0dHJpYnV0ZSgnYXJpYS1oaWRkZW4nLCAndHJ1ZScpO1xyXG5cclxuXHRcdHNwYW4xLmlubmVySFRNTCA9ICcmcmFxdW87JztcclxuXHRcdHNwYW4yLmlubmVySFRNTCA9ICdOZXh0JztcclxuXHJcblx0XHRsaW5rLmFwcGVuZENoaWxkKHNwYW4xKTtcclxuXHRcdGxpbmsuYXBwZW5kQ2hpbGQoc3BhbjIpO1xyXG5cdFx0bGkuYXBwZW5kQ2hpbGQobGluayk7XHJcblxyXG5cdFx0cmV0dXJuIGxpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQ2hlY2tzIGlmIHRoZSBnaXZlbiBwYWdlIGlzIGluIHJhbmdlLlxyXG5cdCAqL1xyXG5cdG5vdEluUGFnZVJhbmdlKHBhZ2VOdW1iZXIpIFxyXG5cdHtcclxuXHRcdHJldHVybiAocGFnZU51bWJlciA+IHRoaXMudG90YWxQYWdlcyB8fCBwYWdlTnVtYmVyIDw9IDApIHx8IGlzTmFOKHBhZ2VOdW1iZXIpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQ2hhbmdlcyB0aGUgdXJsIHRvIGEgZ2l2ZW4gcGFnZSBudW1iZXIuXHJcblx0ICovXHJcblx0Y2hhbmdlVXJsKHBhZ2VOdW1iZXIpIFxyXG5cdHtcclxuXHRcdHBhZ2VOdW1iZXIgPSAgcGFnZU51bWJlciB8fCBHRVRfVmFycygpWydwYWdlJ107XHJcblx0XHR3aW5kb3cuaGlzdG9yeS5yZXBsYWNlU3RhdGUoJycsICcnLCB0aGlzLnVwZGF0ZVVSTFBhcmFtZXRlcih3aW5kb3cubG9jYXRpb24uaHJlZiwgJ3BhZ2UnLCBwYWdlTnVtYmVyKSk7XHJcblx0fVxyXG5cclxuXHRzZXRBY3RpdmVMaW5rKHBhZ2VOdW1iZXIpXHJcblx0e1xyXG5cdFx0Zm9yKHZhciBwYWdlIGluIHRoaXMucGFnZXMpIHtcclxuXHRcdFx0aWYgKHRoaXMucGFnZXNbcGFnZV0uY2hpbGROb2Rlc1swXS5nZXRBdHRyaWJ1dGUoJ2RhdGEtcGFnZS1ucicpID09IHBhZ2VOdW1iZXIpIHtcclxuXHRcdFx0XHRET00uYWRkQ2xhc3ModGhpcy5wYWdlc1twYWdlXSwgJ2FjdGl2ZScpO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdERPTS5yZW1vdmVDbGFzcyh0aGlzLnBhZ2VzW3BhZ2VdLCAnYWN0aXZlJyk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEdldCB0aGUgZ2V0IHZhcmlhYmxlcyBmcm9tIHRoZSB1cmwuXHJcblx0ICovXHJcblx0R0VUX1ZhcnMoKSBcclxuXHR7XHJcblx0XHR2YXIgdmFycyA9IHt9O1xyXG5cdFx0dmFyIHBhcnRzID0gd2luZG93LmxvY2F0aW9uLmhyZWYucmVwbGFjZSgvWz8mXSsoW149Jl0rKT0oW14mXSopL2dpLCBmdW5jdGlvbihtLCBrZXksIHZhbHVlKSB7XHJcblx0XHRcdHZhcnNba2V5XSA9IHZhbHVlO1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0cmV0dXJuIHZhcnM7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBNb2RpZmllcyB0aGUgZ2V0IHBhcmFtZXRlciBpbiB0aGUgdXJsLlxyXG5cdCAqL1xyXG5cdHVwZGF0ZVVSTFBhcmFtZXRlcih1cmwsIHBhcmFtLCBwYXJhbVZhbCkgXHJcblx0e1xyXG5cdCAgICB2YXIgbmV3QWRkaXRpb25hbFVSTCA9IFwiXCI7XHJcblx0ICAgIHZhciB0ZW1wQXJyYXkgPSB1cmwuc3BsaXQoXCI/XCIpO1xyXG5cdCAgICB2YXIgYmFzZVVSTCA9IHRlbXBBcnJheVswXTtcclxuXHQgICAgdmFyIGFkZGl0aW9uYWxVUkwgPSB0ZW1wQXJyYXlbMV07XHJcblx0ICAgIHZhciB0ZW1wID0gXCJcIjtcclxuXHJcblx0ICAgIGlmIChhZGRpdGlvbmFsVVJMKSB7XHJcblx0ICAgICAgICB0ZW1wQXJyYXkgPSBhZGRpdGlvbmFsVVJMLnNwbGl0KFwiJlwiKTtcclxuXHQgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGVtcEFycmF5Lmxlbmd0aDsgaSsrKXtcclxuXHQgICAgICAgICAgICBpZiAodGVtcEFycmF5W2ldLnNwbGl0KCc9JylbMF0gIT0gcGFyYW0pe1xyXG5cdCAgICAgICAgICAgICAgICBuZXdBZGRpdGlvbmFsVVJMICs9IHRlbXAgKyB0ZW1wQXJyYXlbaV07XHJcblx0ICAgICAgICAgICAgICAgIHRlbXAgPSBcIiZcIjtcclxuXHQgICAgICAgICAgICB9XHJcblx0ICAgICAgICB9XHJcblx0ICAgIH1cclxuXHJcblx0ICAgIHZhciByb3dzVGV4dCA9IHRlbXAgKyBcIlwiICsgcGFyYW0gKyBcIj1cIiArIHBhcmFtVmFsO1xyXG5cdCAgICByZXR1cm4gYmFzZVVSTCArIFwiP1wiICsgbmV3QWRkaXRpb25hbFVSTCArIHJvd3NUZXh0O1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogUmVzZXRzIHRoZSBwYWdpbmF0aW9uLlxyXG5cdCAqL1xyXG5cdHJlc2V0KCkgXHJcblx0e1xyXG5cdFx0dGhpcy5zZXRDdXJyZW50KDEpO1xyXG5cdFx0dGhpcy5jaGFuZ2VVcmwoMSk7XHJcblx0fVxyXG59XG5cbmNsYXNzIENvb2tpZVxyXG57XHJcblx0LyoqXHJcbiBcdCogU2V0cyBhIGNvb2tpZS4gXHJcblx0Ki9cclxuXHRzdGF0aWMgc2V0KG5hbWUsIHZhbHVlLCBkYXlzKSBcclxuXHR7XHJcblx0XHRpZiAodmFsdWUuY29uc3RydWN0b3IubmFtZSAgPT0gJ09iamVjdCcgfHwgdmFsdWUuY29uc3RydWN0b3IubmFtZSA9PSAnQXJyYXknKSB7XHJcblx0XHRcdHZhbHVlID0gSlNPTi5zdHJpbmdpZnkodmFsdWUpO1xyXG5cdFx0fVxyXG5cclxuXHRcdGRheXMgPSBkYXlzIHx8IDEwO1xyXG5cclxuXHQgICAgbGV0IGV4cGlyZXM7XHJcblx0ICAgIFxyXG5cdCAgICBpZiAoZGF5cykge1xyXG5cdCAgICAgICAgbGV0IGRhdGUgPSBuZXcgRGF0ZSgpO1xyXG5cdCAgICAgICAgZGF0ZS5zZXRUaW1lKGRhdGUuZ2V0VGltZSgpICsgKGRheXMgKiAyNCAqIDYwICogNjAgKiAxMDAwKSk7XHJcblx0ICAgICAgICBleHBpcmVzID0gXCI7IGV4cGlyZXM9XCIgKyBkYXRlLnRvR01UU3RyaW5nKCk7XHJcblx0ICAgIH0gZWxzZSB7XHJcblx0ICAgICAgICBleHBpcmVzID0gXCJcIjtcclxuXHQgICAgfVxyXG5cclxuXHQgICAgZG9jdW1lbnQuY29va2llID0gbmFtZSArIFwiPVwiICsgdmFsdWUgKyBleHBpcmVzICsgXCI7IHBhdGg9L1wiO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogUmV0cmlldmVzIHRoZSBjb29raWUgYnkgbmFtZS5cclxuXHQgKi9cclxuXHRzdGF0aWMgZ2V0KG5hbWUpIFxyXG5cdHtcclxuXHQgICAgaWYgKGRvY3VtZW50LmNvb2tpZS5sZW5ndGggPiAwKSB7XHJcblx0ICAgICAgICBsZXQgY19zdGFydCA9IGRvY3VtZW50LmNvb2tpZS5pbmRleE9mKG5hbWUgKyBcIj1cIik7XHJcblx0ICAgICAgICBcclxuXHQgICAgICAgIGlmIChjX3N0YXJ0ICE9IC0xKSB7XHJcblx0ICAgICAgICAgICAgY19zdGFydCA9IGNfc3RhcnQgKyBuYW1lLmxlbmd0aCArIDE7XHJcblx0ICAgICAgICAgICAgbGV0IGNfZW5kID0gZG9jdW1lbnQuY29va2llLmluZGV4T2YoXCI7XCIsIGNfc3RhcnQpO1xyXG5cdCAgICAgICAgICAgIFxyXG5cdCAgICAgICAgICAgIGlmIChjX2VuZCA9PSAtMSkge1xyXG5cdCAgICAgICAgICAgICAgICBjX2VuZCA9IGRvY3VtZW50LmNvb2tpZS5sZW5ndGg7XHJcblx0ICAgICAgICAgICAgfVxyXG5cclxuXHQgICAgICAgICAgICByZXR1cm4gSlNPTi5wYXJzZSh1bmVzY2FwZShkb2N1bWVudC5jb29raWUuc3Vic3RyaW5nKGNfc3RhcnQsIGNfZW5kKSkpO1xyXG5cdCAgICAgICAgfVxyXG5cdCAgICB9XHJcblxyXG5cdCAgICByZXR1cm4gW107XHJcblx0fVxyXG59XG5cbi8qKlxyXG4gKiBUaGUgZGVmYXVsdCBzZXR0aW5ncyBvZiB0aGUgY2FydC5cclxuICovXHJcbmxldCBkZWZhdWx0U2V0dGluZ3MkNCA9IHtcclxuXHRlbGVtZW50OiAnLmNhcnQnLFxyXG5cdGNvb2tpZV9uYW1lOiAnY2FydCcsXHJcblx0cHJldmlld19jbGFzczogJycsXHJcblx0bG9hZGVyOiAnL2ltYWdlcy9pY29ucy9zcGlubmVyLnN2ZycsXHJcblx0Y2xhc3M6ICcnLFxyXG5cdHdpZHRoOiAnNjBweCcsXHJcblx0aGVpZ2h0OiAnNjBweCcsXHJcblx0cGxhY2VtZW50OiAncmlnaHQtdG9wJyxcclxuXHRmaXhlZDogdHJ1ZSxcclxuXHRob3Zlcl9jb2xvcjogJ29yYW5nZSdcclxufTtcclxuXHJcbi8qKlxyXG4gKiBTdG9yZXMgdGhlIGNvbnRhaW5lciBvYmplY3QuXHJcbiAqL1xyXG5sZXQgQ29udGFpbmVyJDU7XHJcblxyXG4vKipcclxuICogU3RvcmVzIHRoZSBjYXJ0IGxvYWRlci5cclxuICovXHJcbmxldCBsb2FkaW5nT3ZlcmxheTtcclxuXHJcbi8qKlxyXG4gKiBUaGUgQ2FydCBPYmplY3QsIGhhbmRsZXMgdGhlIGNhcnQgaWNvbiBhbmQgc2Vzc2lvbnMuXHJcbiAqL1xyXG5jbGFzcyBDYXJ0IFxyXG57XHJcblx0LyoqXHJcblx0ICogSW5pdGlhbGl6ZSB0aGUgZGVmYXVsdCBzZXR0aW5ncywgc2V0dGluZyB0aGUgZWxlbWVudCxcclxuXHQgKiBhbmQgY3JlYXRpbmcgdGhlIHByZXZpZXcgZm9yIHRoZSBjYXJ0cyBkZXRhaWxzLlxyXG5cdCAqL1xyXG5cdGNvbnN0cnVjdG9yKGNvbnRhaW5lcikgXHJcblx0e1xyXG5cdFx0Q29udGFpbmVyJDUgPSBjb250YWluZXI7XHJcblx0XHRcclxuXHRcdHRoaXMucHJldmlld0VsZW1lbnQgPSB0aGlzLmNyZWF0ZVByZXZpZXdFbGVtZW50KCk7XHJcblx0XHR0aGlzLnN2Z0ljb24gPSBjcmVhdGVJY29uLmNhbGwodGhpcyk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBTZXRzIHRoZSBvYmplY3QgYnkgdGhlIHVzZXJzIHNldHRpbmcuXHJcblx0ICovXHJcblx0c2V0dXAoc2V0dGluZ3MpXHJcblx0e1xyXG5cdFx0aWYodHlwZW9mIHNldHRpbmdzICE9ICdvYmplY3QnKSB7XHJcblx0XHRcdHRocm93IG5ldyBJbnZhbGlkQXJndW1lbnRFeGNlcHRpb24kMTtcclxuXHRcdH1cclxuXHJcblx0XHR0aGlzLnNldHRpbmdzID0gQ29tbW9uLmV4dGVuZChkZWZhdWx0U2V0dGluZ3MkNCwgc2V0dGluZ3MpO1xyXG5cclxuXHRcdHRoaXMuc2V0RWxlbWVudCh0aGlzLnNldHRpbmdzLmVsZW1lbnQpO1xyXG5cclxuXHRcdERPTS5hZGRDbGFzcyh0aGlzLnByZXZpZXdFbGVtZW50LCAnY2xvc2VkJyk7XHJcblx0XHRET00uYWRkQ2xhc3ModGhpcy5wcmV2aWV3RWxlbWVudCwgdGhpcy5zZXR0aW5ncy5wcmV2aWV3X2NsYXNzKTtcclxuXHRcdFxyXG5cdFx0dGhpcy5iaW5kRXZlbnRMaXN0ZW5lcnMoKTtcclxuXHRcdHRoaXMuYWRkU3R5bGVUYWcoKTtcclxuXHJcblx0XHRpZih0aGlzLmlzRW1wdHkoQ29va2llLmdldCh0aGlzLnNldHRpbmdzLmNvb2tpZV9uYW1lKSkpIHtcclxuXHRcdFx0dGhpcy5jYXJ0ID0ge307XHJcblx0XHRcdHRoaXMuc2V0Q2FydCh0aGlzLmNhcnQpO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQ2hlY2tzIGlmIHRoZSBjYXJ0IGlzIGVtcHR5XHJcblx0ICovXHJcblx0aXNFbXB0eShjYXJ0KVxyXG5cdHtcclxuXHRcdHJldHVybiBDb21tb24uZW1wdHlPYmplY3QoY2FydCk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBTZXRzIHRoZSBjYXJ0IGFzIGEgY29va2llLlxyXG5cdCAqL1xyXG5cdHNldENhcnQoY2FydClcclxuXHR7XHJcblx0XHR0aGlzLmNhcnQuaWQgPSBTdHIucmFuZG9tKDEwKTtcclxuXHRcdHRoaXMuY2FydC5pdGVtcyA9IFtdO1xyXG5cdFx0dGhpcy5jYXJ0LmZhdm9yaXRlcyA9IFtdO1xyXG5cdFx0Q29va2llLnNldCh0aGlzLnNldHRpbmdzLmNvb2tpZV9uYW1lLCBjYXJ0LCAyKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEFkZHMgYW4gaXRlbSB0byB0aGUgY2FydC5cclxuXHQgKi9cclxuXHRhZGRJdGVtKGl0ZW0pXHJcblx0e1xyXG5cdFx0dGhpcy5jYXJ0ID0gQ29va2llLmdldCh0aGlzLnNldHRpbmdzLmNvb2tpZV9uYW1lKTtcclxuXHJcblx0XHR0aGlzLmNhcnQuaXRlbXMucHVzaChpdGVtKTtcclxuXHJcblx0XHRDb29raWUuc2V0KHRoaXMuc2V0dGluZ3MuY29va2llX25hbWUsIHRoaXMuY2FydCwgMik7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBSZW1vdmVzIGFuIGl0ZW0gZnJvbSB0aGUgY2FydC5cclxuXHQgKi9cclxuXHRyZW1vdmVJdGVtKGl0ZW0pXHJcblx0e1xyXG4gXHRcdHRoaXMuY2FydCA9IENvb2tpZS5nZXQodGhpcy5zZXR0aW5ncy5jb29raWVfbmFtZSk7XHJcblxyXG4gXHRcdHRoaXMuY2FydC5pdGVtcy5zcGxpY2UodGhpcy5jYXJ0Lml0ZW1zLmluZGV4T2YoaXRlbSksIDEpO1xyXG5cclxuIFx0XHRDb29raWUuc2V0KHRoaXMuc2V0dGluZ3MuY29va2llX25hbWUsIHRoaXMuY2FydCwgMik7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBBZGRzIHRoZSBpdGVtIHRvIHByZXZpZXcuXHJcblx0ICovXHJcblx0YWRkVG9QcmV2aWV3KGl0ZW1zKVxyXG5cdHtcclxuXHRcdGxldCBpdGVtc0RpdiA9IERPTS5maW5kKCcuaXRlbXMnLCB0aGlzLnByZXZpZXdFbGVtZW50KTtcclxuXHJcblx0XHRpdGVtc0Rpdi5pbm5lckhUTUwgPSAnJztcclxuXHRcdGZvciAobGV0IGkgPSAwOyBpIDwgaXRlbXMubGVuZ3RoOyBpKyspIHtcclxuXHJcblx0XHRcdGxldCBsaSA9IERPTS5jcmVhdGVFbGVtZW50KCdsaScsIHtcclxuXHRcdFx0XHRcdGNsYXNzOiAnaXRlbSdcclxuXHRcdFx0XHR9KTtcclxuXHJcblx0XHRcdGxldCBhdHRyaWJ1dGVzID0gaXRlbXNbaV07XHJcblxyXG5cdFx0XHRmb3IobGV0IGF0dHJpYnV0ZSBpbiBhdHRyaWJ1dGVzKSB7XHJcblx0XHRcdFx0bGV0IHNwYW4gPSBET00uY3JlYXRlRWxlbWVudCgnc3BhbicsIHtcclxuXHRcdFx0XHRcdHRleHQ6IGF0dHJpYnV0ZXNbYXR0cmlidXRlXVxyXG5cdFx0XHRcdH0pO1xyXG5cclxuXHRcdFx0XHRsaS5hcHBlbmRDaGlsZChzcGFuKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0aXRlbXNEaXYuYXBwZW5kQ2hpbGQobGkpO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQmluZHMgZXZlcnRoaW5nIHRvIHRoZSBlbGVtZW50LlxyXG5cdCAqL1xyXG5cdHNldEVsZW1lbnQoc2VsZWN0b3IpXHJcblx0e1xyXG5cdFx0dGhpcy5pY29uID0gRE9NLmZpbmQoc2VsZWN0b3IpO1xyXG5cclxuXHRcdGlmICh0aGlzLmljb24pIHtcclxuXHRcdFx0RE9NLmFkZENsYXNzKHRoaXMuaWNvbiwgdGhpcy5zZXR0aW5ncy5jbGFzcyk7XHJcblx0XHRcdERPTS5hZGRDbGFzcyh0aGlzLmljb24sIHRoaXMuc2V0dGluZ3MucGxhY2VtZW50KTtcclxuXHRcdFx0dGhpcy5pY29uLmFwcGVuZENoaWxkKHRoaXMuc3ZnSWNvbik7XHJcblx0XHRcdHRoaXMuaWNvbi5hcHBlbmRDaGlsZCh0aGlzLnByZXZpZXdFbGVtZW50KTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIENyZWF0ZXMgdGhlIGNhcnQgZGV0YWlscyBwcmV2aWV3IGVsZW1lbnQuXHJcblx0ICovXHJcblx0Y3JlYXRlUHJldmlld0VsZW1lbnQoKVxyXG5cdHtcclxuXHRcdGxldCBwcmV2aWV3RWxlbWVudCA9IERPTS5jcmVhdGVFbGVtZW50KCdkaXYnLCB7XHJcblx0XHRcdGlkOiAncHJldmlldydcclxuXHRcdH0pO1xyXG5cclxuXHRcdGxldCB1bCA9IERPTS5jcmVhdGVFbGVtZW50KCd1bCcsIHtcclxuXHRcdFx0XHRjbGFzczogJ2l0ZW1zJ1xyXG5cdFx0XHR9KTtcclxuXHJcblx0XHRwcmV2aWV3RWxlbWVudC5hcHBlbmRDaGlsZCh1bCk7XHJcblxyXG5cdFx0cmV0dXJuIHByZXZpZXdFbGVtZW50O1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQWRkIHRoZSBlQ29tbWVyY2Ugc3R5bGUgdGFncyB0byB0aGUgRE9NLlxyXG5cdCAqL1xyXG5cdGFkZFN0eWxlVGFnKCkgXHJcblx0e1xyXG5cdFx0aWYoRE9NLmZpbmQoJyNlQ29tbWVyY2UtQ2FydCcpKSB7XHJcblx0XHRcdHJldHVybjtcclxuXHRcdH1cclxuXHJcblx0XHRsZXQgcG9zaXRpb24gPSAodGhpcy5zZXR0aW5ncy5maXhlZCkgPyAnZml4ZWQnIDogJ2Fic29sdXRlJztcclxuXHJcblx0XHRsZXQgY3NzID0gYFxyXG5cdFx0XHQke3RoaXMuc2V0dGluZ3MuZWxlbWVudH0ge1xyXG5cdFx0XHRcdHBvc2l0aW9uOiAke3Bvc2l0aW9ufTtcclxuXHRcdFx0XHRjdXJzb3I6IHBvaW50ZXI7XHJcblx0XHRcdFx0Y29sb3I6ICNmZmZmZmY7XHJcblx0XHRcdFx0ei1pbmRleDogOTk4O1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHQke3RoaXMuc2V0dGluZ3MuZWxlbWVudH0gPiBzdmcge1xyXG5cdFx0XHRcdHdpZHRoOiAke3RoaXMuc2V0dGluZ3Mud2lkdGh9O1xyXG5cdFx0XHRcdGhlaWdodDogJHt0aGlzLnNldHRpbmdzLmhlaWdodH07XHJcblx0XHRcdFx0dHJhbnNpdGlvbjogZmlsbCAwLjNzO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHQke3RoaXMuc2V0dGluZ3MuZWxlbWVudH0gPiBzdmc6aG92ZXIge1xyXG5cdFx0XHRcdGZpbGw6ICR7dGhpcy5zZXR0aW5ncy5ob3Zlcl9jb2xvcn07XHJcblx0XHRcdFx0dHJhbnNpdGlvbjogZmlsbCAwLjNzO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHQke3RoaXMuc2V0dGluZ3MuZWxlbWVudH0udG9wLXJpZ2h0LFxyXG5cdFx0XHQke3RoaXMuc2V0dGluZ3MuZWxlbWVudH0ucmlnaHQtdG9wIHtcclxuXHRcdFx0XHRyaWdodDogMTBweDtcclxuXHRcdFx0XHR0b3A6IDEwcHg7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdCR7dGhpcy5zZXR0aW5ncy5lbGVtZW50fS5sZWZ0LXRvcCxcclxuXHRcdFx0JHt0aGlzLnNldHRpbmdzLmVsZW1lbnR9LnRvcC1sZWZ0IHtcclxuXHRcdFx0XHRsZWZ0OiAxMHB4O1xyXG5cdFx0XHRcdHRvcDogMTBweDtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0JHt0aGlzLnNldHRpbmdzLmVsZW1lbnR9ID4gI3ByZXZpZXcge1xyXG5cdFx0XHRcdHBvc2l0aW9uOiAke3Bvc2l0aW9ufTtcclxuXHRcdFx0XHR6LWluZGV4OiA5OTk5O1xyXG5cdFx0XHRcdHRvcDogY2FsYygxMHB4ICsgJHt0aGlzLnNldHRpbmdzLmhlaWdodH0pO1xyXG5cdFx0XHRcdHRyYW5zZm9ybTogdHJhbnNsYXRlWCg2MHB4KTtcclxuXHRcdFx0XHRoZWlnaHQ6IDQwMHB4O1xyXG5cdFx0XHRcdHdpZHRoOiAzMDBweDtcclxuXHRcdFx0XHRib3JkZXI6IDFweCBzb2xpZCAjZTRlNGU0O1xyXG5cdFx0XHRcdGJhY2tncm91bmQ6ICNmZmZmZmY7XHJcblx0XHRcdFx0dHJhbnNpdGlvbjogdHJhbnNmb3JtIDFzLCB2aXNpYmlsaXR5IDFzO1xyXG5cdFx0XHRcdGN1cnNvcjogZGVmYXVsdDtcclxuXHRcdFx0XHRvdmVyZmxvdy1ZOiBzY3JvbGw7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdCR7dGhpcy5zZXR0aW5ncy5lbGVtZW50fSA+ICNwcmV2aWV3Lm9wZW5lZCB7XHJcblx0XHRcdFx0dmlzaWJpbGl0eTogdmlzaWJsZTtcclxuXHRcdFx0XHR0cmFuc2Zvcm06IHRyYW5zbGF0ZVgoLTI0MHB4KTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0JHt0aGlzLnNldHRpbmdzLmVsZW1lbnR9ID4gI3ByZXZpZXcuY2xvc2VkIHtcclxuXHRcdFx0XHR2aXNpYmlsaXR5OiBoaWRkZW47XHJcblx0XHRcdFx0dHJhbnNmb3JtOiB0cmFuc2xhdGVYKDYwcHgpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHQke3RoaXMuc2V0dGluZ3MuZWxlbWVudH0gPiAjcHJldmlldyA+IHVsLml0ZW1zLFxyXG5cdFx0XHQke3RoaXMuc2V0dGluZ3MuZWxlbWVudH0gPiAjcHJldmlldyA+IHVsLml0ZW1zID4gbGkuaXRlbSB7XHJcblx0XHRcdFx0Y29sb3I6ICMwMDAwMDA7XHJcblx0XHRcdFx0bGlzdC1zdHlsZS10eXBlOiBub25lO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHQuY2FydC1sb2FkZXItb3ZlcmxheSB7XHJcblx0XHRcdFx0cG9zaXRpb246IGFic29sdXRlO1xyXG5cdFx0XHRcdHRvcDogMDtcclxuXHRcdFx0XHRsZWZ0OiAwO1xyXG5cdFx0XHRcdGJhY2tncm91bmQ6ICNmZmZmZmY7XHJcblx0XHRcdFx0d2lkdGg6IDEwMCU7XHJcblx0XHRcdFx0aGVpZ2h0OiAxMDAlO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHQuY2FydC1sb2FkZXItb3ZlcmxheSAuY2FydC1sb2FkZXIge1xyXG5cdFx0XHRcdHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuXHRcdFx0XHR3aWR0aDogNTBweDtcclxuXHRcdFx0XHRoZWlnaHQ6IDUwcHg7XHJcblx0XHRcdFx0bWFyZ2luLWxlZnQ6IC0yNXB4O1xyXG5cdFx0XHRcdG1hcmdpbi10b3A6IC0yNXB4O1xyXG5cdFx0XHRcdGxlZnQ6IDUwJTtcclxuXHRcdFx0XHRyaWdodDogNTAlO1xyXG5cdFx0XHRcdHRvcDogNTAlO1xyXG5cdFx0XHRcdGJvdHRvbTogNTAlO1xyXG5cdFx0XHR9XHJcblx0XHRgO1xyXG5cdCAgICBcclxuXHQgICAgRE9NLmFkZFN0eWxlKCdlQ29tbWVyY2UtQ2FydCcsIGNzcyk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBDcmVhdGVzIGFuIGxvYWRpbmcgb3ZlcmxheS5cclxuXHQgKi9cclxuXHRsb2FkaW5nT3ZlcmxheSgpXHJcblx0e1xyXG5cdFx0aWYgKGxvYWRpbmdPdmVybGF5KSB7XHJcblx0XHRcdHJldHVybiBsb2FkaW5nT3ZlcmxheTtcclxuXHRcdH1cclxuXHJcblx0XHRsZXQgbG9hZGVyID0gRE9NLmNyZWF0ZUVsZW1lbnQoJ2ltZycsIHtcclxuXHRcdFx0c3JjOiB0aGlzLnNldHRpbmdzLmxvYWRlcixcclxuXHRcdFx0Y2xhc3M6ICdjYXJ0LWxvYWRlcidcclxuXHRcdH0pO1xyXG5cclxuXHRcdGxvYWRpbmdPdmVybGF5ID0gRE9NLmNyZWF0ZUVsZW1lbnQoJ2RpdicsIHtcclxuXHRcdFx0Y2xhc3M6ICdjYXJ0LWxvYWRlci1vdmVybGF5J1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0bG9hZGluZ092ZXJsYXkuYXBwZW5kQ2hpbGQobG9hZGVyKTtcclxuXHJcblx0XHRyZXR1cm4gbG9hZGluZ092ZXJsYXk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBMb2FkaW5nIHRoZSBjYXJ0IHByZXZpZXcuXHJcblx0ICovXHJcblx0cHJldmlld1N0YXJ0TG9hZGluZygpXHJcblx0e1xyXG5cdFx0dGhpcy5wcmV2aWV3RWxlbWVudC5hcHBlbmRDaGlsZCh0aGlzLmxvYWRpbmdPdmVybGF5KCkpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogTG9hZGluZyB0aGUgY2FydCBwcmV2aWV3LlxyXG5cdCAqL1xyXG5cdHByZXZpZXdTdG9wTG9hZGluZygpXHJcblx0e1xyXG5cdFx0aWYgKERPTS5maW5kKCcuY2FydC1sb2FkZXItb3ZlcmxheScsIHRoaXMucHJldmlld0VsZW1lbnQpKSB7XHJcblx0XHRcdHRoaXMucHJldmlld0VsZW1lbnQucmVtb3ZlQ2hpbGQodGhpcy5sb2FkaW5nT3ZlcmxheSgpKTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFJlbG9hZHMgdGhlIGl0ZW1zIGluIHRoZSBjYXJ0IHByZXZpZXcuXHJcblx0ICovXHJcblx0cmVsb2FkQ2FydFByZXZpZXcoKVxyXG5cdHtcclxuXHRcdHRoaXMucHJldmlld1N0YXJ0TG9hZGluZygpO1xyXG5cdFx0bGV0IGl0ZW1zID0gdGhpcy5nZXRDYXJ0SXRlbXMoKTtcclxuXHRcdHRoaXMuYWRkVG9QcmV2aWV3KGl0ZW1zKTtcclxuXHRcdFxyXG5cdFx0bGV0IGluc3RhbmNlID0gdGhpcztcclxuXHJcblx0XHRzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRpbnN0YW5jZS5wcmV2aWV3U3RvcExvYWRpbmcuY2FsbChpbnN0YW5jZSk7XHJcblx0XHR9LCAyMDAwKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEJpbmRzIGV2ZW50IGxpc3RlbmVycyB0byB0aGUgY2FydCBpY29uLlxyXG5cdCAqL1xyXG5cdGJpbmRFdmVudExpc3RlbmVycygpXHJcblx0e1xyXG5cdFx0aWYodGhpcy5zdmdJY29uID09IG51bGwpIHtcclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0fVxyXG5cclxuXHRcdHRoaXMuc3ZnSWNvbi5vbmNsaWNrID0gZnVuY3Rpb24oZSkge1xyXG5cdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XHJcblx0XHRcdGxldCBvcGVuaW5nID0gRE9NLnRvZ2dsZUNsYXNzKHRoaXMucHJldmlld0VsZW1lbnQsICdvcGVuZWQnLCAnY2xvc2VkJyk7XHJcblx0XHRcdFxyXG5cdFx0XHRpZiAob3BlbmluZykge1xyXG5cdFx0XHRcdHRoaXMucmVsb2FkQ2FydFByZXZpZXcoKTtcdFxyXG5cdFx0XHR9XHJcblx0XHR9LmJpbmQodGhpcyk7XHJcblxyXG5cdFx0RXZlbnQubGlzdGVuKCdQcm9kdWN0V2FzQWRkZWQnLCBmdW5jdGlvbihhdHRyaWJ1dGVzKSB7XHJcblx0XHRcdGxldCBjYXJ0ID0gQ29va2llLmdldCh0aGlzLnNldHRpbmdzLmNvb2tpZV9uYW1lKTtcclxuXHRcdFx0Y2FydC5pdGVtcy5wdXNoKGF0dHJpYnV0ZXMpO1xyXG5cdFx0XHRDb29raWUuc2V0KHRoaXMuc2V0dGluZ3MuY29va2llX25hbWUsIGNhcnQpO1xyXG5cdFx0XHR0aGlzLnJlbG9hZENhcnRQcmV2aWV3KCk7XHJcblx0XHR9LmJpbmQodGhpcykpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogUmV0cmlldmUgdGhlIGNhcnRzIGl0ZW1zIGZyb20gdGhlIGNvb2tpZS5cclxuXHQgKi9cclxuXHRnZXRDYXJ0SXRlbXMoKVxyXG5cdHtcclxuXHRcdGxldCBjYXJ0ID0gQ29va2llLmdldCh0aGlzLnNldHRpbmdzLmNvb2tpZV9uYW1lKTtcclxuXHJcblx0XHRyZXR1cm4gKGNhcnQpID8gY2FydC5pdGVtcyA6IFtdO1xyXG5cdH1cclxufVxyXG5cclxuZnVuY3Rpb24gY2xvc2UoZXZlbnQpIHtcclxuXHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdERPTS5zd2l0Y2hDbGFzc2VzKHRoaXMucHJldmlld0VsZW1lbnQsICdvcGVuZWQnLCAnY2xvc2VkJyk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNyZWF0ZUljb24oKSB7XHJcblx0bGV0IHN2ZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnROUyhcImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIsIFwic3ZnXCIpO1xyXG5cdGxldCBnID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKFwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiwgXCJnXCIpO1xyXG5cdGxldCBwYXRoID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKFwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiwgXCJwYXRoXCIpO1xyXG5cclxuXHRzdmcuc2V0QXR0cmlidXRlKCd2ZXJzaW9uJywgJzEuMScpO1xyXG5cdHN2Zy5zZXRBdHRyaWJ1dGUoJ3htbG5zJywgJ2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJyk7XHJcblx0c3ZnLnNldEF0dHJpYnV0ZSgneG1sbnM6eGxpbmsnLCAnaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluaycpO1xyXG5cdHN2Zy5zZXRBdHRyaWJ1dGUoJ3gnLCAnMHB4Jyk7XHJcblx0c3ZnLnNldEF0dHJpYnV0ZSgneScsICcwcHgnKTtcclxuXHRzdmcuc2V0QXR0cmlidXRlKCd3aWR0aCcsICc0NDYuODQzcHgnKTtcclxuXHRzdmcuc2V0QXR0cmlidXRlKCdoZWlnaHQnLCAnNDQ2Ljg0M3B4Jyk7XHJcblx0c3ZnLnNldEF0dHJpYnV0ZSgndmlld0JveCcsICcwIDAgNDQ2Ljg0MyA0NDYuODQzJyk7XHJcblx0c3ZnLnNldEF0dHJpYnV0ZSgnc3R5bGUnLCAnZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA0NDYuODQzIDQ0Ni44NDM7Jyk7XHJcblx0c3ZnLnNldEF0dHJpYnV0ZSgneG1sOnNwYWNlJywgJ3ByZXNlcnZlJyk7XHJcblxyXG5cdHBhdGguc2V0QXR0cmlidXRlKCdkJywgJ000NDQuMDksOTMuMTAzYy0yLjY5OC0zLjY5OS03LjAwNi01Ljg4OC0xMS41ODQtNS44ODhIMTA5LjkyYy0wLjYyNSwwLTEuMjQ5LDAuMDM4LTEuODUsMC4xMTlsLTEzLjI3Ni0zOC4yN2MtMS4zNzYtMy45NTgtNC40MDYtNy4xMTMtOC4zLTguNjQ2TDE5LjU4NiwxNC4xMzRjLTcuMzc0LTIuODg3LTE1LjY5NSwwLjczNS0xOC41OTEsOC4xYy0yLjg5MSw3LjM2OSwwLjczLDE1LjY5NSw4LjEsMTguNTkxbDYwLjc2OCwyMy44NzJsNzQuMzgxLDIxNC4zOTljLTMuMjgzLDEuMTQ0LTYuMDY1LDMuNjYzLTcuMzMyLDcuMTg3bC0yMS41MDYsNTkuNzM5Yy0xLjMxOCwzLjY2My0wLjc3NSw3LjczMywxLjQ2OCwxMC45MTZjMi4yNCwzLjE4Myw1Ljg4Myw1LjA3OCw5Ljc3Myw1LjA3OGgxMS4wNDRjLTYuODQ0LDcuNjE2LTExLjA0NCwxNy42NDYtMTEuMDQ0LDI4LjY3NWMwLDIzLjcxOCwxOS4yOTgsNDMuMDEyLDQzLjAxMiw0My4wMTJzNDMuMDEyLTE5LjI5NCw0My4wMTItNDMuMDEyYzAtMTEuMDI5LTQuMi0yMS4wNTktMTEuMDQ0LTI4LjY3NWg5My43NzZjLTYuODQ3LDcuNjE2LTExLjA0OCwxNy42NDYtMTEuMDQ4LDI4LjY3NWMwLDIzLjcxOCwxOS4yOTQsNDMuMDEyLDQzLjAxMyw0My4wMTJjMjMuNzE4LDAsNDMuMDEyLTE5LjI5NCw0My4wMTItNDMuMDEyYzAtMTEuMDI5LTQuMi0yMS4wNTktMTEuMDQzLTI4LjY3NWgxMy40MzNjNi41OTksMCwxMS45NDctNS4zNDksMTEuOTQ3LTExLjk0OGMwLTYuNTk5LTUuMzQ5LTExLjk0Ny0xMS45NDctMTEuOTQ3SDE0My42NDdsMTMuMzE5LTM2Ljk5NmMxLjcyLDAuNzI0LDMuNTc4LDEuMTUyLDUuNTIzLDEuMTUyaDIxMC4yNzhjNi4yMzQsMCwxMS43NTEtNC4wMjcsMTMuNjUtOS45NTlsNTkuNzM5LTE4Ni4zODdDNDQ3LjU1NywxMDEuNTY3LDQ0Ni43ODgsOTYuODAyLDQ0NC4wOSw5My4xMDN6IE0xNjkuNjU5LDQwOS44MDdjLTEwLjU0MywwLTE5LjExNi04LjU3My0xOS4xMTYtMTkuMTE2czguNTczLTE5LjExNywxOS4xMTYtMTkuMTE3czE5LjExNiw4LjU3NCwxOS4xMTYsMTkuMTE3UzE4MC4yMDIsNDA5LjgwNywxNjkuNjU5LDQwOS44MDd6IE0zMjcuMzY3LDQwOS44MDdjLTEwLjU0MywwLTE5LjExNy04LjU3My0xOS4xMTctMTkuMTE2czguNTc0LTE5LjExNywxOS4xMTctMTkuMTE3YzEwLjU0MiwwLDE5LjExNiw4LjU3NCwxOS4xMTYsMTkuMTE3UzMzNy45MDksNDA5LjgwNywzMjcuMzY3LDQwOS44MDd6IE00MDIuNTIsMTQ4LjE0OWgtNzMuMTYxVjExNS44OWg4My40OTlMNDAyLjUyLDE0OC4xNDl6IE0zODEuNDUzLDIxMy44NjFoLTUyLjA5NHYtMzcuMDM4aDYzLjk2N0wzODEuNDUzLDIxMy44NjF6IE0yMzQuNTcxLDIxMy44NjF2LTM3LjAzOGg2Ni4xMTN2MzcuMDM4SDIzNC41NzF6IE0zMDAuNjg0LDI0Mi41Mzh2MzEuMDY0aC02Ni4xMTN2LTMxLjA2NEgzMDAuNjg0eiBNMTM5LjExNSwxNzYuODIzaDY2Ljc4NHYzNy4wMzhoLTUzLjkzM0wxMzkuMTE1LDE3Ni44MjN6IE0yMzQuNTcxLDE0OC4xNDlWMTE1Ljg5aDY2LjExM3YzMi4yNTlIMjM0LjU3MXogTTIwNS44OTgsMTE1Ljg5djMyLjI1OWgtNzYuNzM0bC0xMS4xOTEtMzIuMjU5SDIwNS44OTh6IE0xNjEuOTE2LDI0Mi41MzhoNDMuOTgydjMxLjA2NGgtMzMuMjA2TDE2MS45MTYsMjQyLjUzOHogTTMyOS4zNTksMjczLjYwM3YtMzEuMDY0aDQyLjkwOWwtOS45NTUsMzEuMDY0SDMyOS4zNTl6Jyk7XHJcblxyXG5cdGcuYXBwZW5kQ2hpbGQocGF0aCk7XHJcblx0c3ZnLmFwcGVuZENoaWxkKGcpO1xyXG5cclxuXHRyZXR1cm4gc3ZnO1xyXG59XG5cbmxldCBpbml0YWxpemVkID0gZmFsc2U7XG5cbmxldCBkZWZhdWx0U2V0dGluZ3MgPSB7XG5cdGVsZW1lbnQ6ICdib2R5Jyxcblx0aW1wb3J0Qm9vdHN0cmFwOiBmYWxzZSxcblx0Y29tcG9uZW50czogWydQcm9kdWN0cycsICdTZXJ2aWNlcycsICdGaWx0ZXInLCAnUGFnaW5hdGlvbicsICdDYXJ0J11cbn07XG5cbmNsYXNzIGVDb21tZXJjZVxue1xuXHRjb25zdHJ1Y3RvcihzZXR0aW5ncylcblx0e1xuXHRcdEV4Y2VwdGlvbkhhbmRsZXIuaW5pdGFsaXplKCk7XG5cblx0XHRpZih0eXBlb2Ygc2V0dGluZ3MgIT0gJ29iamVjdCcpIHtcblx0XHRcdHRocm93IG5ldyBJbnZhbGlkQXJndW1lbnRFeGNlcHRpb24kMTtcblx0XHR9XG5cblx0XHR0aGlzLmNvbnRhaW5lciA9IG5ldyBDb250YWluZXI7XG5cdFx0dGhpcy5zZXR0aW5ncyA9IENvbW1vbi5leHRlbmQoZGVmYXVsdFNldHRpbmdzLCBzZXR0aW5ncyk7XG5cdFx0dGhpcy5zZXR0aW5ncy5lbGVtZW50ID0gRE9NLmZpbmQodGhpcy5zZXR0aW5ncy5lbGVtZW50KTtcblx0XHRcblx0XHRiaW5kQ29tcG9uZW50c0RlcGVuZGVuY2llcy5jYWxsKHRoaXMsIHNldHRpbmdzLmNvbXBvbmVudHMpO1xuXG5cdFx0aW5pdGFsaXplZCA9IHRydWU7XG5cblx0XHRyZXR1cm4gbmV3IFByb3h5KHRoaXMsIHtcblx0XHRcdGdldDogZnVuY3Rpb24odGFyZ2V0LCBvYmplY3QpIHtcblx0XHRcdFx0aWYoISBDb21tb24uaW5fYXJyYXkob2JqZWN0LCBzZXR0aW5ncy5jb21wb25lbnRzKSkge1xuXHRcdFx0XHRcdHRocm93IG5ldyBDb21wb25lbnROb3RSZWdpc3RlcmVkRXhjZXB0aW9uO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0cmV0dXJuIHRhcmdldC5jb250YWluZXIubWFrZShvYmplY3QpO1xuXHRcdFx0fVxuXHRcdH0pO1xuXHR9XG59XG5cbi8qKlxuICogQmluZHMgY29tcG9uZW50cyBkZXBlbmRlbmNpZXMuXG4gKi9cbmZ1bmN0aW9uIGJpbmRDb21wb25lbnRzRGVwZW5kZW5jaWVzKGNvbXBvbmVudHMpIHtcblx0dGhpcy5jb250YWluZXIuYmluZCgnRmlsdGVyJywgZnVuY3Rpb24oY29udGFpbmVyKSB7XG5cdFx0Y29udGFpbmVyWydGaWx0ZXInXS5ib290ZWQgPSB0cnVlO1xuXHRcdHJldHVybiBuZXcgRmlsdGVyKGNvbnRhaW5lcik7XG5cdH0pO1xuXHRcblx0dGhpcy5jb250YWluZXIuYmluZCgnU2VydmljZXMnLCBmdW5jdGlvbihjb250YWluZXIpIHsgXG5cdFx0Y29udGFpbmVyWydTZXJ2aWNlcyddLmJvb3RlZCA9IHRydWU7XG5cdFx0cmV0dXJuIG5ldyBTZXJ2aWNlcyhjb250YWluZXIpO1xuXHR9KTtcblxuXHR0aGlzLmNvbnRhaW5lci5iaW5kKCdQcm9kdWN0cycsIGZ1bmN0aW9uKGNvbnRhaW5lcikge1xuXHRcdGNvbnRhaW5lclsnUHJvZHVjdHMnXS5ib290ZWQgPSB0cnVlO1xuXHRcdHJldHVybiBuZXcgUHJvZHVjdHMoY29udGFpbmVyKTtcblx0fSk7XG5cblx0dGhpcy5jb250YWluZXIuYmluZCgnUGFnaW5hdGlvbicsIGZ1bmN0aW9uKGNvbnRhaW5lcikge1xuXHRcdGNvbnRhaW5lclsnUGFnaW5hdGlvbiddLmJvb3RlZCA9IHRydWU7XG5cdFx0cmV0dXJuIG5ldyBQYWdpbmF0aW9uKGNvbnRhaW5lciwgY29udGFpbmVyLm1ha2UoJ1Byb2R1Y3RzJykpO1xuXHR9KTtcblxuXHR0aGlzLmNvbnRhaW5lci5iaW5kKCdDYXJ0JywgZnVuY3Rpb24oY29udGFpbmVyKSB7XG5cdFx0Y29udGFpbmVyWydDYXJ0J10uYm9vdGVkID0gdHJ1ZTtcblx0XHRyZXR1cm4gbmV3IENhcnQoY29udGFpbmVyKTtcblx0fSk7XG5cblx0dGhpcy5jb250YWluZXJbJ0ZpbHRlciddWydib290ZWQnXSA9IGZhbHNlO1xuXHR0aGlzLmNvbnRhaW5lclsnU2VydmljZXMnXVsnYm9vdGVkJ10gPSBmYWxzZTtcblx0dGhpcy5jb250YWluZXJbJ1Byb2R1Y3RzJ11bJ2Jvb3RlZCddID0gZmFsc2U7XG5cdHRoaXMuY29udGFpbmVyWydQYWdpbmF0aW9uJ11bJ2Jvb3RlZCddID0gZmFsc2U7XG5cdHRoaXMuY29udGFpbmVyWydDYXJ0J11bJ2Jvb3RlZCddID0gZmFsc2U7XG59XG5cbnJldHVybiBlQ29tbWVyY2U7XG5cbn0oKSk7XG4iXX0=
