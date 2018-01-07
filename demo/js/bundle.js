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

				if (secondClassName) {
					element.classList.toggle(secondClassName);
				}

				return element.classList.toggle(className);
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

	/**
  * Checks if parent has child.
  */
	function hasChild(parent, child) {
		var node = child.parentNode;

		while (node != null) {
			if (node == parent) {
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
				this.wrapper = DOM.element(selector);

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
				var itemsDiv = DOM.find(this.previewElement, '.items');

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
				if (DOM.element('#eCommerce-Cart')) {
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
				if (DOM.find(this.previewElement, '.cart-loader-overlay')) {
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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVDb21tZXJjZS5qcyJdLCJuYW1lcyI6WyJlQ29tbWVyY2UiLCJJbnZhbGlkQXJndW1lbnRFeGNlcHRpb24kMSIsImNvbnNvbGUiLCJlcnJvciIsIkVycm9yIiwiRE9NIiwic3RyaW5nIiwicmVwbGFjZSIsImVsZW1lbnQiLCJjbGFzc05hbWUiLCJuZXdDbGFzc05hbWUiLCJyZW1vdmVDbGFzcyIsImFkZENsYXNzIiwidW5kZWZpbmVkIiwiY2xhc3NOYW1lcyIsInNwbGl0IiwiZm9yRWFjaCIsIm5hbWUiLCJjbGFzc0xpc3QiLCJhZGQiLCJyZW1vdmUiLCJzZWxlY3RvciIsInF1ZXJ5RWxlbWVudCIsImNhbGwiLCJkb2N1bWVudCIsImlkIiwiY3NzIiwiaGVhZCIsImdldEVsZW1lbnRzQnlUYWdOYW1lIiwic3R5bGVUYWciLCJjcmVhdGVFbGVtZW50IiwiQ1NTIiwibWluaWZ5Q3NzIiwiaW5uZXJIVE1MIiwic2V0QXR0cmlidXRlIiwiYXBwZW5kQ2hpbGQiLCJlbGVtZW50VHlwZSIsIm9wdGlvbnMiLCJvcHRpb24iLCJzZWNvbmRDbGFzc05hbWUiLCJ0b2dnbGUiLCJwYXJlbnQiLCJxdWVyeVNlbGVjdG9yQWxsIiwibGVuZ3RoIiwiaGFzQ2hpbGQiLCJjaGlsZCIsIm5vZGUiLCJwYXJlbnROb2RlIiwiZXZlbnRzIiwiRXZlbnQiLCJjYWxsYmFjayIsIkludmFsaWRBcmd1bWVudEV4Y2VwdGlvbiIsInB1c2giLCJkYXRhIiwiQmFkRXZlbnRDYWxsRXhjZXB0aW9uIiwiQ29tbW9uIiwiY3VycmVudE9iaiIsIm5ld09iaiIsImV4dGVuZGVkIiwicHJvcCIsIk9iamVjdCIsInByb3RvdHlwZSIsImhhc093blByb3BlcnR5IiwibmVlZGxlIiwiaHlzdGFjayIsImNvbnN0cnVjdG9yIiwiQXJyYXkiLCJpIiwib2JqZWN0IiwiSW52YWxpZEJpbmRpbmdFeGNlcHRpb24iLCJpbnN0YW5jZXMiLCJDb250YWluZXIiLCJrZXkiLCJjb25jcmV0ZSIsImJpbmQiLCJpbnN0YW5jZSIsImluc3RhbmNlRXhpc3QiLCJnZXRJbnN0YW5jZSIsInNldEluc3RhbmNlIiwiQ29tcG9uZW50c0V4Y2VwdGlvbiIsIkJhZEV2ZW50Q2FsbEV4Y2VwdGlvbiQxIiwiTm90SW5QYWdlUmFuZ2VFeGNlcHRpb24iLCJDb21wb25lbnROb3RSZWdpc3RlcmVkRXhjZXB0aW9uIiwiRXhjZXB0aW9uSGFuZGxlciIsIndpbmRvdyIsIm9uZXJyb3IiLCJtZXNzYWdlIiwic291cmNlIiwibGluZW5vIiwiY29sbm8iLCJkZWZhdWx0U2V0dGluZ3MkMSIsImNsYXNzIiwid2lkdGgiLCJoZWlnaHQiLCJDb250YWluZXIkMiIsIkZpbHRlciIsImNvbnRhaW5lciIsInNldHRpbmdzIiwiZXh0ZW5kIiwic2V0RWxlbWVudCIsIndyYXBwZXIiLCJTdHIiLCJ0b0xvd2VyQ2FzZSIsInBvc3NpYmxlIiwiY2hhckF0IiwiTWF0aCIsImZsb29yIiwicmFuZG9tIiwiZGVmYXVsdFNldHRpbmdzJDIiLCJpdGVtX2NsYXNzIiwiYWRkX2J1dHRvbl9jbGFzcyIsImZhdm9yaXRlX2J1dHRvbl9jbGFzcyIsImF0dHJpYnV0ZXMiLCJ1cmwiLCJDb250YWluZXIkMyIsIlByb2R1Y3RzIiwiYWRkRXZlbnRMaXN0ZW5lciIsImFkZFN0eWxlVGFnIiwiUGFnaW5hdGlvbiIsImJvb3RlZCIsImdldFByb2R1Y3RzQnlQYWdlIiwidGhlbiIsInByb2R1Y3RzIiwicmVwbGFjZUl0ZW1zIiwibG9hZEFsbFByb2R1Y3RzIiwicmVxdWVzdCIsImdldFByb2R1Y3RzIiwiaXRlbXMiLCJ0cmlnZ2VyIiwiY2F0Y2giLCJpc0FycmF5IiwiYnVpbGRQcm9kdWN0cyIsInByb2R1Y3QiLCJhc2tTZXJ2ZXIiLCJwYWdlTnVtYmVyIiwiUHJvbWlzZSIsInJlc29sdmUiLCJyZWplY3QiLCJ4aHIiLCJYTUxIdHRwUmVxdWVzdCIsIkFjdGl2ZVhPYmplY3QiLCJvcGVuIiwic2V0UmVxdWVzdEhlYWRlciIsIm9ucmVhZHlzdGF0ZWNoYW5nZSIsInJlYWR5U3RhdGUiLCJzdGF0dXMiLCJjdXJyZW50SXRlbXMiLCJyZXNwb25zZVRleHQiLCJKU09OIiwicGFyc2UiLCJBZnRlckxvYWRlZCIsInN0YXR1c1RleHQiLCJzZW5kIiwiYXR0cmlidXRlc0NvbGxlY3Rpb24iLCJ0YWdUeXBlIiwiYnVpbHRQcm9kdWN0cyIsImJ1aWx0UHJvZHVjdCIsImJ1aWxkUHJvZHVjdCIsIm92ZXJsYXkiLCJhdHRyaWJ1dGUiLCJpbl9hcnJheSIsInRhZyIsImltYWdlIiwic3JjIiwia2ViYWJDYXNlIiwiYWRkVG9DYXJ0IiwidHlwZSIsInRleHQiLCJmYXZvcml0ZSIsImV2ZW50IiwicHJldmVudERlZmF1bHQiLCJhZGRTdHlsZSIsIlNlcnZpY2VzIiwiZGVmYXVsdFNldHRpbmdzJDMiLCJwZXJfcGFnZSIsInRvdGFsX2l0ZW1zIiwiQ29udGFpbmVyJDQiLCJQcm9kdWN0cyQyIiwic2V0Q3VycmVudCIsInRvdGFsUGFnZXMiLCJjYWxjdWxhdGVUb3RhbFBhZ2VzIiwicmVwbGFjZUxpbmtzIiwibGlua3MiLCJjcmVhdGVMaW5rcyIsImJpbmRFdmVudExpc3RlbmVycyIsInBlclBhZ2UiLCJ0b3RhbEl0ZW1zIiwicGFyc2VJbnQiLCJjZWlsIiwibmV4dCIsImNoaWxkTm9kZXMiLCJvbmNsaWNrIiwicmVxdWVzdGVkUGFnZSIsImN1cnJlbnQiLCJub3RJblBhZ2VSYW5nZSIsInByZXZpb3VzIiwicGFnZXMiLCJnZXRBdHRyaWJ1dGUiLCJjaGFuZ2VVcmwiLCJzZXRBY3RpdmVMaW5rIiwidWwiLCJjcmVhdGVQYWdlTGlua3MiLCJjcmVhdGVQcmV2aW91c0J1dHRvbiIsImNyZWF0ZU5leHRCdXR0b24iLCJwYWdlIiwicGFnZUl0ZW0iLCJsaW5rIiwibGkiLCJzcGFuMSIsInNwYW4yIiwiaXNOYU4iLCJHRVRfVmFycyIsImhpc3RvcnkiLCJyZXBsYWNlU3RhdGUiLCJ1cGRhdGVVUkxQYXJhbWV0ZXIiLCJsb2NhdGlvbiIsImhyZWYiLCJ2YXJzIiwicGFydHMiLCJtIiwidmFsdWUiLCJwYXJhbSIsInBhcmFtVmFsIiwibmV3QWRkaXRpb25hbFVSTCIsInRlbXBBcnJheSIsImJhc2VVUkwiLCJhZGRpdGlvbmFsVVJMIiwidGVtcCIsInJvd3NUZXh0IiwiQ29va2llIiwiZGF5cyIsInN0cmluZ2lmeSIsImV4cGlyZXMiLCJkYXRlIiwiRGF0ZSIsInNldFRpbWUiLCJnZXRUaW1lIiwidG9HTVRTdHJpbmciLCJjb29raWUiLCJjX3N0YXJ0IiwiaW5kZXhPZiIsImNfZW5kIiwidW5lc2NhcGUiLCJzdWJzdHJpbmciLCJkZWZhdWx0U2V0dGluZ3MkNCIsImNvb2tpZV9uYW1lIiwicHJldmlld19jbGFzcyIsImxvYWRlciIsInBsYWNlbWVudCIsImZpeGVkIiwiaG92ZXJfY29sb3IiLCJDb250YWluZXIkNSIsImxvYWRpbmdPdmVybGF5IiwiQ2FydCIsInByZXZpZXdFbGVtZW50IiwiY3JlYXRlUHJldmlld0VsZW1lbnQiLCJzdmdJY29uIiwiY3JlYXRlSWNvbiIsImlzRW1wdHkiLCJnZXQiLCJjYXJ0Iiwic2V0Q2FydCIsImVtcHR5T2JqZWN0IiwiZmF2b3JpdGVzIiwic2V0IiwiaXRlbSIsInNwbGljZSIsIml0ZW1zRGl2IiwiZmluZCIsInNwYW4iLCJpY29uIiwicG9zaXRpb24iLCJyZW1vdmVDaGlsZCIsInByZXZpZXdTdGFydExvYWRpbmciLCJnZXRDYXJ0SXRlbXMiLCJhZGRUb1ByZXZpZXciLCJzZXRUaW1lb3V0IiwicHJldmlld1N0b3BMb2FkaW5nIiwiZSIsIm9wZW5pbmciLCJ0b2dnbGVDbGFzcyIsInJlbG9hZENhcnRQcmV2aWV3IiwibGlzdGVuIiwiY2xvc2UiLCJzd2l0Y2hDbGFzc2VzIiwic3ZnIiwiY3JlYXRlRWxlbWVudE5TIiwiZyIsInBhdGgiLCJpbml0YWxpemVkIiwiZGVmYXVsdFNldHRpbmdzIiwiaW1wb3J0Qm9vdHN0cmFwIiwiY29tcG9uZW50cyIsImluaXRhbGl6ZSIsImJpbmRDb21wb25lbnRzRGVwZW5kZW5jaWVzIiwiUHJveHkiLCJ0YXJnZXQiLCJtYWtlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUFBLElBQUlBLFlBQWEsWUFBWTtBQUM3Qjs7QUFENkIsS0FHdkJDLDBCQUh1QjtBQUFBOztBQUs1Qix3Q0FDQTtBQUFBOztBQUFBOztBQUVJQyxXQUFRQyxLQUFSO0FBRko7QUFHSTs7QUFUd0I7QUFBQSxHQUdZQyxLQUhaOztBQUFBLEtBWXZCQyxHQVp1QjtBQUFBO0FBQUE7QUFBQTs7QUFBQTtBQUFBOztBQWM1Qjs7O0FBZDRCLDZCQWlCWEMsTUFqQlcsRUFrQjVCO0FBQ0lBLGFBQVNBLE9BQU9DLE9BQVAsQ0FBZSx3Q0FBZixFQUF5RCxFQUF6RCxDQUFUO0FBQ0FELGFBQVNBLE9BQU9DLE9BQVAsQ0FBZSxRQUFmLEVBQXlCLEdBQXpCLENBQVQ7QUFDQUQsYUFBU0EsT0FBT0MsT0FBUCxDQUFlLFVBQWYsRUFBMkIsSUFBM0IsQ0FBVDtBQUNBRCxhQUFTQSxPQUFPQyxPQUFQLENBQWUsVUFBZixFQUEyQixJQUEzQixDQUFUO0FBQ0FELGFBQVNBLE9BQU9DLE9BQVAsQ0FBZSxLQUFmLEVBQXNCLEdBQXRCLENBQVQ7O0FBRUEsV0FBT0QsTUFBUDtBQUNIOztBQUVEOzs7O0FBNUI0QjtBQUFBO0FBQUEsaUNBK0JQRSxPQS9CTyxFQStCRUMsU0EvQkYsRUErQmFDLFlBL0JiLEVBZ0M1QjtBQUNDLFNBQUtDLFdBQUwsQ0FBaUJILE9BQWpCLEVBQTBCQyxTQUExQjtBQUNBLFNBQUtHLFFBQUwsQ0FBY0osT0FBZCxFQUF1QkUsWUFBdkI7QUFDQTs7QUFFRDs7OztBQXJDNEI7QUFBQTtBQUFBLDRCQXdDWkYsT0F4Q1ksRUF3Q0hDLFNBeENHLEVBeUM1QjtBQUNDLFFBQUdELFlBQVksSUFBZixFQUFxQjtBQUNwQixXQUFNLElBQUlQLDBCQUFKLEVBQU47QUFDQTs7QUFFRCxRQUFHLENBQUVRLFNBQUYsSUFBZUEsYUFBYSxFQUE1QixJQUFrQyxRQUFPQSxTQUFQLHlDQUFPQSxTQUFQLE9BQXFCSSxTQUExRCxFQUFxRTtBQUNwRSxZQUFPTCxPQUFQO0FBQ0E7O0FBRUQsUUFBSU0sYUFBYUwsVUFBVU0sS0FBVixDQUFnQixHQUFoQixDQUFqQjs7QUFFQUQsZUFBV0UsT0FBWCxDQUFtQixVQUFTQyxJQUFULEVBQWU7QUFDakNULGFBQVFVLFNBQVIsQ0FBa0JDLEdBQWxCLENBQXNCRixJQUF0QjtBQUNBLEtBRkQ7O0FBSUEsV0FBT1QsT0FBUDtBQUNBOztBQUVEOzs7O0FBM0Q0QjtBQUFBO0FBQUEsK0JBOERUQSxPQTlEUyxFQThEQUMsU0E5REEsRUErRDVCO0FBQ0MsUUFBR0QsV0FBVyxJQUFkLEVBQW9CO0FBQ25CLFdBQU0sSUFBSVAsMEJBQUosRUFBTjtBQUNBOztBQUVELFFBQUdRLGFBQWEsRUFBaEIsRUFBb0I7QUFDbkJELGFBQVFDLFNBQVIsR0FBb0IsRUFBcEI7QUFDQSxLQUZELE1BRU87O0FBRU4sU0FBSUssYUFBYUwsVUFBVU0sS0FBVixDQUFnQixHQUFoQixDQUFqQjs7QUFFQUQsZ0JBQVdFLE9BQVgsQ0FBbUIsVUFBU0MsSUFBVCxFQUFlO0FBQ2pDVCxjQUFRVSxTQUFSLENBQWtCRSxNQUFsQixDQUF5QkgsSUFBekI7QUFDQSxNQUZEO0FBR0E7O0FBRUQsV0FBT1QsT0FBUDtBQUNBOztBQUVEOzs7O0FBbEY0QjtBQUFBO0FBQUEsMkJBcUZiYSxRQXJGYSxFQXNGNUI7QUFDQyxXQUFPQyxhQUFhQyxJQUFiLENBQWtCLElBQWxCLEVBQXdCQyxRQUF4QixFQUFrQ0gsUUFBbEMsQ0FBUDtBQUNBOztBQUVEOzs7O0FBMUY0QjtBQUFBO0FBQUEsNEJBNkZaSSxFQTdGWSxFQTZGUkMsR0E3RlEsRUE4RjVCO0FBQ0MsUUFBRyxPQUFPQSxHQUFQLElBQWMsUUFBakIsRUFBMkI7QUFDMUIsV0FBTSxJQUFJekIsMEJBQUosRUFBTjtBQUNBOztBQUVELFFBQUkwQixPQUFPSCxTQUFTRyxJQUFULElBQWlCSCxTQUFTSSxvQkFBVCxDQUE4QixNQUE5QixFQUFzQyxDQUF0QyxDQUE1QjtBQUNBLFFBQUlDLFdBQVdMLFNBQVNNLGFBQVQsQ0FBdUIsT0FBdkIsQ0FBZjs7QUFFQTtBQUNHLFFBQUlDLE1BQU0sS0FBS0MsU0FBTCxDQUFlTixHQUFmLENBQVY7QUFDQTtBQUNBRyxhQUFTSSxTQUFULEdBQXFCRixHQUFyQjtBQUNBO0FBQ0hGLGFBQVNLLFlBQVQsQ0FBc0IsSUFBdEIsRUFBNEJULEVBQTVCO0FBQ0E7QUFDQUUsU0FBS1EsV0FBTCxDQUFpQk4sUUFBakI7QUFDQTs7QUFFRDs7OztBQWhINEI7QUFBQTtBQUFBLGlDQW1IUE8sV0FuSE8sRUFtSE1DLE9BbkhOLEVBb0g1QjtBQUNDLFFBQUk3QixVQUFVZ0IsU0FBU00sYUFBVCxDQUF1Qk0sV0FBdkIsQ0FBZDs7QUFFQSxRQUFJQyxZQUFZeEIsU0FBaEIsRUFBMkI7QUFDMUIsWUFBT0wsT0FBUDtBQUNBOztBQUVELFNBQUssSUFBSThCLE1BQVQsSUFBbUJELE9BQW5CLEVBQTRCO0FBQzNCLFNBQUdDLFVBQVUsTUFBYixFQUFxQjtBQUNwQjlCLGNBQVF5QixTQUFSLEdBQW9CSSxRQUFRQyxNQUFSLENBQXBCO0FBQ0E7QUFDQTs7QUFFRDlCLGFBQVEwQixZQUFSLENBQXFCSSxNQUFyQixFQUE2QkQsUUFBUUMsTUFBUixDQUE3QjtBQUNBOztBQUVELFdBQU85QixPQUFQO0FBQ0E7O0FBRUQ7Ozs7QUF2STRCO0FBQUE7QUFBQSwrQkEwSVRBLE9BMUlTLEVBMElBQyxTQTFJQSxFQTBJVzhCLGVBMUlYLEVBMkk1QjtBQUNDLFFBQUcvQixXQUFXLElBQVgsSUFBbUIsT0FBT0EsT0FBUCxJQUFrQixXQUF4QyxFQUFxRDtBQUNwRCxXQUFNLElBQUlQLDBCQUFKLEVBQU47QUFDQTs7QUFFRHNDLHNCQUFrQkEsbUJBQW1CMUIsU0FBckM7O0FBRUEsUUFBRzBCLGVBQUgsRUFBb0I7QUFDbkIvQixhQUFRVSxTQUFSLENBQWtCc0IsTUFBbEIsQ0FBeUJELGVBQXpCO0FBQ0E7O0FBRUQsV0FBTy9CLFFBQVFVLFNBQVIsQ0FBa0JzQixNQUFsQixDQUF5Qi9CLFNBQXpCLENBQVA7QUFDQTs7QUFFRDs7OztBQXpKNEI7QUFBQTtBQUFBLHdCQTRKaEJELE9BNUpnQixFQTRKUGEsUUE1Sk8sRUE2SjVCO0FBQ0MsV0FBT0MsYUFBYWQsT0FBYixFQUFzQmEsUUFBdEIsQ0FBUDtBQUNBO0FBL0oyQjs7QUFBQTtBQUFBOztBQWtLN0I7Ozs7O0FBR0EsVUFBU0MsWUFBVCxDQUFzQm1CLE1BQXRCLEVBQThCcEIsUUFBOUIsRUFBd0M7QUFDdkMsTUFBSWIsVUFBVWlDLE9BQU9DLGdCQUFQLENBQXdCckIsUUFBeEIsQ0FBZDs7QUFFQSxNQUFHYixRQUFRbUMsTUFBUixJQUFrQixDQUFyQixFQUF3QjtBQUN2QixVQUFPLElBQVA7QUFDQTs7QUFFRCxTQUFRbkMsUUFBUW1DLE1BQVIsR0FBaUIsQ0FBbEIsR0FBdUJuQyxPQUF2QixHQUFpQ0EsUUFBUSxDQUFSLENBQXhDO0FBQ0E7O0FBRUQ7OztBQUdBLFVBQVNvQyxRQUFULENBQWtCSCxNQUFsQixFQUEwQkksS0FBMUIsRUFBaUM7QUFDNUIsTUFBSUMsT0FBT0QsTUFBTUUsVUFBakI7O0FBRUEsU0FBT0QsUUFBUSxJQUFmLEVBQXFCO0FBQ2pCLE9BQUlBLFFBQVFMLE1BQVosRUFBb0I7QUFDaEIsV0FBTyxJQUFQO0FBQ0g7QUFDREssVUFBT0EsS0FBS0MsVUFBWjtBQUNIOztBQUVELFNBQU8sS0FBUDtBQUNKOztBQUVELEtBQUlDLFNBQVMsRUFBYjs7QUEvTDZCLEtBaU12QkMsS0FqTXVCO0FBQUE7QUFBQTtBQUFBOztBQUFBO0FBQUE7O0FBbU01Qjs7O0FBbk00QiwwQkFzTWRoQyxJQXRNYyxFQXNNUmlDLFFBdE1RLEVBc01FO0FBQzdCLFFBQUksT0FBT0EsUUFBUCxLQUFvQixVQUF4QixFQUFvQztBQUNuQyxXQUFNLElBQUlDLHdCQUFKLEVBQU47QUFDQTs7QUFFRCxRQUFJLE9BQU9ILE9BQU8vQixJQUFQLENBQVAsSUFBdUIsV0FBM0IsRUFBd0M7QUFDdkMrQixZQUFPL0IsSUFBUCxJQUFlLEVBQWY7QUFDQTs7QUFFRCtCLFdBQU8vQixJQUFQLEVBQWFtQyxJQUFiLENBQWtCRixRQUFsQjtBQUNBOztBQUVEOzs7O0FBbE40QjtBQUFBO0FBQUEsMkJBcU5iakMsSUFyTmEsRUFxTkU7QUFBQSxzQ0FBTm9DLElBQU07QUFBTkEsU0FBTTtBQUFBOztBQUM3QkEsV0FBT0EsUUFBUSxJQUFmOztBQUVBTCxXQUFPL0IsSUFBUCxFQUFhRCxPQUFiLENBQXFCLFVBQVNrQyxRQUFULEVBQW1CO0FBQ3ZDLFNBQUcsT0FBT0EsUUFBUCxLQUFvQixVQUF2QixFQUFtQztBQUNsQyxZQUFNLElBQUlJLHFCQUFKLEVBQU47QUFDQTs7QUFFRCxZQUFPSiw2Q0FBWUcsSUFBWixFQUFQO0FBQ0EsS0FORDtBQU9BO0FBL04yQjs7QUFBQTtBQUFBOztBQUFBLEtBa092QkUsTUFsT3VCO0FBQUE7QUFBQTtBQUFBOztBQUFBO0FBQUE7O0FBb081Qjs7O0FBcE80QiwwQkF1T2RDLFVBdk9jLEVBdU9GQyxNQXZPRSxFQXVPTztBQUNsQyxRQUFJQyxXQUFXLEVBQWY7QUFDRyxRQUFJQyxJQUFKOztBQUVBLFNBQUtBLElBQUwsSUFBYUgsVUFBYixFQUF5QjtBQUNyQixTQUFJSSxPQUFPQyxTQUFQLENBQWlCQyxjQUFqQixDQUFnQ3ZDLElBQWhDLENBQXFDaUMsVUFBckMsRUFBaURHLElBQWpELENBQUosRUFBNEQ7QUFDeERELGVBQVNDLElBQVQsSUFBaUJILFdBQVdHLElBQVgsQ0FBakI7QUFDSDtBQUNKOztBQUVELFNBQUtBLElBQUwsSUFBYUYsTUFBYixFQUFxQjtBQUNqQixTQUFJRyxPQUFPQyxTQUFQLENBQWlCQyxjQUFqQixDQUFnQ3ZDLElBQWhDLENBQXFDa0MsTUFBckMsRUFBNkNFLElBQTdDLENBQUosRUFBd0Q7QUFDcERELGVBQVNDLElBQVQsSUFBaUJGLE9BQU9FLElBQVAsQ0FBakI7QUFDSDtBQUNKOztBQUVELFdBQU9ELFFBQVA7QUFDSDs7QUFFRDs7OztBQTFQNEI7QUFBQTtBQUFBLDRCQTZQWkssTUE3UFksRUE2UEpDLE9BN1BJLEVBNlBLO0FBQ2hDLFFBQUdBLFFBQVFDLFdBQVIsS0FBd0JDLEtBQTNCLEVBQWtDOztBQUVsQyxTQUFJLElBQUlDLElBQUksQ0FBWixFQUFlQSxLQUFLSCxRQUFRckIsTUFBNUIsRUFBb0N3QixHQUFwQyxFQUF5QztBQUN4QyxTQUFHSixVQUFVQyxRQUFRRyxDQUFSLENBQWIsRUFBeUIsT0FBTyxJQUFQO0FBQ3pCOztBQUVELFdBQU8sS0FBUDtBQUNBOztBQUVEOzs7O0FBdlE0QjtBQUFBO0FBQUEsK0JBMFFUQyxNQTFRUyxFQTBRRDtBQUMxQixTQUFJLElBQUlULElBQVIsSUFBZ0JTLE1BQWhCLEVBQXdCO0FBQ3ZCLFlBQU8sS0FBUDtBQUNBOztBQUVELFdBQU8sSUFBUDtBQUNBO0FBaFIyQjtBQUFBO0FBQUEsa0NBa1JOQSxNQWxSTSxFQWtSRUosT0FsUkYsRUFtUjVCO0FBQ0ksUUFBSUcsQ0FBSjs7QUFFQSxTQUFLQSxJQUFJLENBQVQsRUFBWUEsSUFBSUgsUUFBUXJCLE1BQXhCLEVBQWdDd0IsR0FBaEMsRUFBcUM7QUFDakMsU0FBSSxPQUFPQyxNQUFQLElBQWlCLFFBQWpCLElBQTZCSixRQUFRRyxDQUFSLEVBQVdGLFdBQVgsQ0FBdUJoRCxJQUF2QixLQUFnQ21ELE1BQWpFLEVBQXlFO0FBQ3hFLGFBQU8sSUFBUDtBQUNBOztBQUVELFNBQUlKLFFBQVFHLENBQVIsTUFBZUMsTUFBbkIsRUFBMkI7QUFDdkIsYUFBTyxJQUFQO0FBQ0g7QUFDSjs7QUFFRCxXQUFPLEtBQVA7QUFDSDs7QUFFRDs7OztBQW5TNEI7QUFBQTtBQUFBLDRCQXNTWkEsTUF0U1ksRUF1UzVCO0FBQ0MsV0FBTyxRQUFPQSxNQUFQLHlDQUFPQSxNQUFQLE1BQWlCLFFBQXhCO0FBQ0E7QUF6UzJCOztBQUFBO0FBQUE7O0FBQUEsS0E0U3ZCQyx1QkE1U3VCO0FBQUE7O0FBOFM1QixxQ0FDQTtBQUFBOztBQUFBOztBQUVJbkUsV0FBUUMsS0FBUjtBQUZKO0FBR0k7O0FBbFR3QjtBQUFBLEdBNFNTQyxLQTVTVDs7QUFxVDdCLEtBQUlrRSxhQUFZLEVBQWhCOztBQXJUNkIsS0F1VHZCQyxTQXZUdUI7QUFBQTtBQUFBO0FBQUE7O0FBQUE7QUFBQTs7QUF5VDVCOzs7QUF6VDRCLHdCQTRUdkJDLEdBNVR1QixFQTRUbEJDLFFBNVRrQixFQTZUNUI7QUFDQyxRQUFJLE9BQU9ELEdBQVAsSUFBYyxRQUFkLElBQTBCLE9BQU9DLFFBQVAsSUFBbUIsVUFBakQsRUFBNkQ7QUFDNUQsV0FBTSxJQUFJeEUsMEJBQUosRUFBTjtBQUNBOztBQUVELFFBQUksT0FBTyxLQUFLdUUsR0FBTCxDQUFQLElBQW9CLFdBQXhCLEVBQXFDO0FBQ3BDLFdBQU0sSUFBSUgsdUJBQUosRUFBTjtBQUNBOztBQUVELFNBQUtHLEdBQUwsSUFBWUMsU0FBU0MsSUFBVCxDQUFjRCxRQUFkLEVBQXdCLElBQXhCLENBQVo7QUFDQTs7QUFFRDs7OztBQXpVNEI7QUFBQTtBQUFBLCtCQTRVaEJELEdBNVVnQixFQTRVWEcsUUE1VVcsRUE2VTVCO0FBQ0MsUUFBRyxPQUFPSCxHQUFQLElBQWMsUUFBZCxJQUEwQixRQUFPRyxRQUFQLHlDQUFPQSxRQUFQLE1BQW1CLFFBQWhELEVBQTBEO0FBQ3pELFdBQU0sSUFBSTFFLDBCQUFKLEVBQU47QUFDQTs7QUFFRHFFLGVBQVVFLEdBQVYsSUFBaUJHLFFBQWpCO0FBQ0E7O0FBRUQ7Ozs7QUFyVjRCO0FBQUE7QUFBQSwrQkF3VmhCSCxHQXhWZ0IsRUF5VjVCO0FBQ0MsUUFBRyxPQUFPQSxHQUFQLElBQWMsUUFBakIsRUFBMkI7QUFDMUIsV0FBTSxJQUFJdkUsMEJBQUosRUFBTjtBQUNBOztBQUVELFFBQUcsUUFBT3VFLEdBQVAseUNBQU9BLEdBQVAsTUFBYyxRQUFqQixFQUEyQjtBQUMxQixZQUFPRixXQUFVRSxJQUFJUCxXQUFKLENBQWdCaEQsSUFBMUIsS0FBbUMsSUFBMUM7QUFDQTs7QUFFRCxXQUFPcUQsV0FBVUUsR0FBVixLQUFrQixJQUF6QjtBQUNBOztBQUVEOzs7O0FBclc0QjtBQUFBO0FBQUEsaUNBd1dkRyxRQXhXYyxFQXlXNUI7QUFDQyxRQUFHLFFBQU9BLFFBQVAseUNBQU9BLFFBQVAsTUFBbUIsUUFBdEIsRUFBZ0M7QUFDL0IsWUFBUSxPQUFPTCxXQUFVSyxTQUFTVixXQUFULENBQXFCaEQsSUFBL0IsQ0FBUCxLQUFnRCxXQUF4RDtBQUNBOztBQUdELFdBQVEwRCxZQUFZTCxVQUFwQjtBQUNBOztBQUVEOzs7O0FBbFg0QjtBQUFBO0FBQUEsd0JBcVh2QkYsTUFyWHVCLEVBc1g1QjtBQUNDLFFBQUlPLFdBQVcsRUFBZjs7QUFFQSxRQUFJLEtBQUtDLGFBQUwsQ0FBbUJSLE1BQW5CLENBQUosRUFBZ0M7QUFDL0IsWUFBTyxLQUFLUyxXQUFMLENBQWlCVCxNQUFqQixDQUFQO0FBQ0E7O0FBRUQsUUFBSSxRQUFPQSxNQUFQLHlDQUFPQSxNQUFQLE1BQWlCLFFBQXJCLEVBQStCO0FBQzlCTyxnQkFBV1AsTUFBWDtBQUNBLEtBRkQsTUFFTyxJQUFHLE9BQU9BLE1BQVAsSUFBaUIsUUFBakIsSUFBNkIsS0FBS04sY0FBTCxDQUFvQk0sTUFBcEIsQ0FBaEMsRUFBNkQ7QUFDbkVPLGdCQUFXLElBQUksS0FBS1AsTUFBTCxDQUFKLEVBQVg7QUFDQSxLQUZNLE1BRUE7QUFDTixXQUFNLElBQUlDLHVCQUFKLEVBQU47QUFDQTs7QUFFRCxTQUFLUyxXQUFMLENBQWlCVixNQUFqQixFQUF5Qk8sUUFBekI7O0FBRUEsV0FBT0EsUUFBUDtBQUNBOztBQUVEOzs7O0FBMVk0QjtBQUFBO0FBQUEsK0JBOFk1QjtBQUNDLFdBQU9MLFVBQVA7QUFDQTtBQWhaMkI7O0FBQUE7QUFBQTs7QUFBQSxLQW1adkJTLG1CQW5adUI7QUFBQTs7QUFxWjVCLGlDQUNBO0FBQUE7O0FBQUE7O0FBRUk3RSxXQUFRQyxLQUFSO0FBRko7QUFJSTs7QUExWndCO0FBQUEsR0FtWktDLEtBblpMOztBQUFBLEtBNlp2QjRFLHVCQTdadUI7QUFBQTs7QUErWjVCLHFDQUNBO0FBQUE7O0FBQUE7O0FBRUk5RSxXQUFRQyxLQUFSO0FBRko7QUFHSTs7QUFuYXdCO0FBQUEsR0E2WlNDLEtBN1pUOztBQUFBLEtBc2F2QjZFLHVCQXRhdUI7QUFBQTs7QUF3YTVCLHFDQUNBO0FBQUE7O0FBQUE7O0FBRUkvRSxXQUFRQyxLQUFSO0FBRko7QUFHSTs7QUE1YXdCO0FBQUEsR0FzYVNDLEtBdGFUOztBQUFBLEtBK2F2QjhFLCtCQS9hdUI7QUFBQTs7QUFpYjVCLDZDQUNBO0FBQUE7O0FBQUE7O0FBRUloRixXQUFRQyxLQUFSO0FBRko7QUFHSTs7QUFyYndCO0FBQUEsR0ErYWlCQyxLQS9hakI7O0FBQUEsS0F3YnZCK0UsZ0JBeGJ1QjtBQUFBOztBQUFBO0FBQUE7O0FBQUE7QUFBQTs7QUFBQTtBQUFBOztBQTBiNUI7OztBQTFiNEIsK0JBNmJUO0FBQ2xCQyxXQUFPQyxPQUFQLEdBQWlCLFVBQVNDLE9BQVQsRUFBa0JDLE1BQWxCLEVBQTBCQyxNQUExQixFQUFrQ0MsS0FBbEMsRUFBeUN0RixLQUF6QyxFQUFnRDs7QUFFaEUsU0FBSUEsaUJBQWlCRiwwQkFBckIsRUFBaUQ7QUFDaEQ7QUFDQSxNQUZELE1BRU8sSUFBSUUsaUJBQWlCa0UsdUJBQXJCLEVBQThDO0FBQ3BEO0FBQ0EsTUFGTSxNQUVBLElBQUlsRSxpQkFBaUI2RSx1QkFBckIsRUFBOEM7QUFDcEQ7QUFDQSxNQUZNLE1BRUEsSUFBSTdFLGlCQUFpQjRFLG1CQUFyQixFQUEwQztBQUNoRDtBQUNBLE1BRk0sTUFFQSxJQUFJNUUsaUJBQWlCK0UsK0JBQXJCLEVBQXNEO0FBQzVEO0FBQ0EsTUFGTSxNQUVBLElBQUkvRSxpQkFBaUI4RSx1QkFBckIsRUFBOEM7QUFDcEQ7QUFDQSxNQUZNLE1BRUE7QUFDTixhQUFPLEtBQVA7QUFDQTs7QUFFRCxZQUFPLElBQVA7QUFDQSxLQW5CRDtBQW9CQTtBQWxkMkI7O0FBQUE7QUFBQSxHQXdiRTdFLEtBeGJGOztBQXFkN0I7Ozs7O0FBR0EsS0FBSXNGLG9CQUFvQjtBQUN2QmxGLFdBQVMsU0FEYztBQUV2QjZDLFFBQU0sRUFGaUI7QUFHdkJzQyxTQUFPLEVBSGdCO0FBSXZCQyxTQUFPLEVBSmdCO0FBS3ZCQyxVQUFRO0FBTGUsRUFBeEI7O0FBUUE7OztBQUdBLEtBQUlDLG9CQUFKOztBQUVBOzs7O0FBcmU2QixLQXdldkJDLE1BeGV1QjtBQTBlNUIsa0JBQVlDLFNBQVosRUFDQTtBQUFBOztBQUNDRixpQkFBY0UsU0FBZDtBQUNBOztBQTdlMkI7QUFBQTtBQUFBLHlCQStldEJDLFFBL2VzQixFQWdmNUI7QUFDQyxRQUFHLFFBQU9BLFFBQVAseUNBQU9BLFFBQVAsTUFBbUIsUUFBdEIsRUFBZ0M7QUFDL0IsV0FBTSxJQUFJaEcsMEJBQUosRUFBTjtBQUNBOztBQUVELFNBQUtnRyxRQUFMLEdBQWdCMUMsT0FBTzJDLE1BQVAsQ0FBY1IsaUJBQWQsRUFBaUNPLFFBQWpDLENBQWhCOztBQUVBLFNBQUtFLFVBQUwsQ0FBZ0IsS0FBS0YsUUFBTCxDQUFjekYsT0FBOUI7QUFDQTtBQXhmMkI7QUFBQTtBQUFBLDhCQTBmakJhLFFBMWZpQixFQTJmNUI7QUFDQyxTQUFLK0UsT0FBTCxHQUFlL0YsSUFBSUcsT0FBSixDQUFZYSxRQUFaLENBQWY7O0FBRUFoQixRQUFJTyxRQUFKLENBQWEsS0FBS3dGLE9BQWxCLEVBQTJCLEtBQUtILFFBQUwsQ0FBY04sS0FBekM7QUFDQTtBQS9mMkI7O0FBQUE7QUFBQTs7QUFBQSxLQWtnQnZCVSxHQWxnQnVCO0FBQUE7QUFBQTtBQUFBOztBQUFBO0FBQUE7OztBQXFnQjVCOzs7QUFyZ0I0Qiw2QkF3Z0JYL0YsTUF4Z0JXLEVBeWdCNUI7QUFDQyxXQUFPQSxPQUFPQyxPQUFQLENBQWUsaUJBQWYsRUFBa0MsT0FBbEMsRUFBMkMrRixXQUEzQyxFQUFQO0FBQ0E7O0FBRUQ7Ozs7QUE3Z0I0QjtBQUFBO0FBQUEsMEJBZ2hCZDNELE1BaGhCYyxFQWloQjVCO0FBQ0MsUUFBSXJDLFNBQVMsRUFBYjtBQUNBLFFBQUlpRyxXQUFXLGdFQUFmOztBQUVBLFNBQUssSUFBSXBDLElBQUksQ0FBYixFQUFnQkEsSUFBSXhCLE1BQXBCLEVBQTRCd0IsR0FBNUIsRUFBaUM7QUFDN0I3RCxlQUFVaUcsU0FBU0MsTUFBVCxDQUFnQkMsS0FBS0MsS0FBTCxDQUFXRCxLQUFLRSxNQUFMLEtBQWdCSixTQUFTNUQsTUFBcEMsQ0FBaEIsQ0FBVjtBQUNIOztBQUVELFdBQU9yQyxNQUFQO0FBQ0E7QUExaEIyQjs7QUFBQTtBQUFBOztBQThoQjdCOzs7OztBQUdBLEtBQUlzRyxvQkFBb0I7QUFDdkJwRyxXQUFTLFdBRGM7QUFFdkJtRixTQUFPLEVBRmdCO0FBR3ZCa0IsY0FBWSxFQUhXO0FBSXZCQyxvQkFBa0IsaUJBSks7QUFLdkJDLHlCQUF1QixnQkFMQTtBQU12Qm5CLFNBQU8sT0FOZ0I7QUFPdkJDLFVBQVEsT0FQZTtBQVF2Qm1CLGNBQVksQ0FBQyxNQUFELEVBQVMsT0FBVCxFQUFrQixjQUFsQixFQUFrQyxPQUFsQyxDQVJXO0FBU3ZCQyxPQUFLO0FBVGtCLEVBQXhCOztBQVlBOzs7QUFHQSxLQUFJQyxvQkFBSjs7QUFFQTs7OztBQWxqQjZCLEtBcWpCdkJDLFFBcmpCdUI7QUF1akI1Qjs7O0FBR0Esb0JBQVluQixTQUFaLEVBQ0E7QUFBQTs7QUFDQ2tCLGlCQUFjbEIsU0FBZDtBQUNBOztBQUVEOzs7OztBQS9qQjRCO0FBQUE7QUFBQSx5QkFra0J0QkMsUUFsa0JzQixFQW1rQjVCO0FBQ0N6RSxhQUFTNEYsZ0JBQVQsQ0FBMEIsa0JBQTFCLEVBQThDLFlBQVc7O0FBRXpELFNBQUksUUFBT25CLFFBQVAseUNBQU9BLFFBQVAsTUFBbUIsUUFBdkIsRUFBaUM7QUFDaEMsWUFBTSxJQUFJaEcsMEJBQUosRUFBTjtBQUNBOztBQUVELFVBQUtnRyxRQUFMLEdBQWdCMUMsT0FBTzJDLE1BQVAsQ0FBY1UsaUJBQWQsRUFBaUNYLFFBQWpDLENBQWhCOztBQUVBLFVBQUtFLFVBQUwsQ0FBZ0IsS0FBS0YsUUFBTCxDQUFjekYsT0FBOUI7O0FBRUEsVUFBSzZHLFdBQUw7O0FBRUEsU0FBSUgsWUFBWUksVUFBWixJQUEwQkosWUFBWUksVUFBWixDQUF1QkMsTUFBckQsRUFBNkQ7QUFDNUQsVUFBSTVDLFdBQVcsSUFBZjs7QUFFQUEsZUFBUzZDLGlCQUFULENBQTJCLENBQTNCLEVBQThCQyxJQUE5QixDQUFtQyxVQUFTQyxRQUFULEVBQW1CO0FBQ3JEL0MsZ0JBQVNnRCxZQUFULENBQXNCRCxRQUF0QjtBQUNBLE9BRkQ7QUFHQSxNQU5ELE1BTU87QUFDTixXQUFLRSxlQUFMO0FBQ0E7QUFFQSxLQXRCNkMsQ0FzQjVDbEQsSUF0QjRDLENBc0J2QyxJQXRCdUMsQ0FBOUM7QUF1QkE7O0FBRUQ7Ozs7QUE3bEI0QjtBQUFBO0FBQUEscUNBaW1CNUI7QUFDQyxRQUFJbUQsVUFBVSxLQUFLQyxXQUFMLEVBQWQ7O0FBRUFELFlBQVFKLElBQVIsQ0FBYSxVQUFTTSxLQUFULEVBQWdCO0FBQzVCOUUsV0FBTStFLE9BQU4sQ0FBYyxxQkFBZCxFQUFxQ0QsS0FBckM7QUFDQSxVQUFLSixZQUFMLENBQWtCSSxLQUFsQjtBQUNBLEtBSFksQ0FHWHJELElBSFcsQ0FHTixJQUhNLENBQWIsRUFHY3VELEtBSGQsQ0FHb0IsVUFBUzlILEtBQVQsRUFBZ0IsQ0FFbkMsQ0FMRDtBQU1BOztBQUVEOzs7O0FBNW1CNEI7QUFBQTtBQUFBLDhCQSttQmpCa0IsUUEvbUJpQixFQWduQjVCO0FBQ0MsU0FBSytFLE9BQUwsR0FBZS9GLElBQUlHLE9BQUosQ0FBWWEsUUFBWixDQUFmOztBQUVBLFFBQUksS0FBSytFLE9BQVQsRUFBa0I7QUFDakIvRixTQUFJTyxRQUFKLENBQWEsS0FBS3dGLE9BQWxCLEVBQTJCLEtBQUtILFFBQUwsQ0FBY04sS0FBekM7QUFDQTtBQUNEOztBQUVEOzs7O0FBeG5CNEI7QUFBQTtBQUFBLGdDQTJuQmZvQyxLQTNuQmUsRUE0bkI1QjtBQUNDLFFBQUksQ0FBRTdELE1BQU1nRSxPQUFOLENBQWNILEtBQWQsQ0FBRixJQUEyQkEsTUFBTXBGLE1BQU4sSUFBZ0IsQ0FBaEIsSUFBcUIsT0FBT29GLE1BQU0sQ0FBTixDQUFQLElBQW1CLFFBQXZFLEVBQWtGO0FBQ2pGLFdBQU0sSUFBSTlILDBCQUFKLEVBQU47QUFDQTs7QUFFRCxRQUFJeUgsV0FBVyxLQUFLUyxhQUFMLENBQW1CSixLQUFuQixFQUEwQixLQUFLOUIsUUFBTCxDQUFjWSxVQUF4QyxFQUFvRCxLQUFwRCxDQUFmOztBQUVBLFNBQUtULE9BQUwsQ0FBYW5FLFNBQWIsR0FBeUIsRUFBekI7QUFDQXlGLGFBQVMxRyxPQUFULENBQWlCLFVBQVNvSCxPQUFULEVBQWtCO0FBQ2xDLFVBQUtoQyxPQUFMLENBQWFqRSxXQUFiLENBQXlCaUcsT0FBekI7QUFDQSxLQUZnQixDQUVmMUQsSUFGZSxDQUVWLElBRlUsQ0FBakI7O0FBSUEsV0FBT3FELEtBQVA7QUFDQTs7QUFFRDs7OztBQTNvQjRCO0FBQUE7QUFBQSxpQ0Erb0I1QjtBQUNDLFdBQU8sS0FBS00sU0FBTCxFQUFQO0FBQ0E7O0FBRUQ7Ozs7QUFucEI0QjtBQUFBO0FBQUEscUNBc3BCVkMsVUF0cEJVLEVBdXBCNUI7QUFDQyxXQUFPLEtBQUtELFNBQUwsQ0FBZUMsVUFBZixDQUFQO0FBQ0E7O0FBRUQ7Ozs7QUEzcEI0QjtBQUFBO0FBQUEsNkJBOHBCbEJBLFVBOXBCa0IsRUErcEI1QjtBQUNDQSxpQkFBYUEsY0FBYyxJQUEzQjs7QUFFQSxXQUFPLElBQUlDLE9BQUosQ0FBWSxVQUFTQyxPQUFULEVBQWtCQyxNQUFsQixFQUEwQjs7QUFFNUMsU0FBSUMsTUFBTSxJQUFJQyxjQUFKLE1BQXNCLElBQUlDLGFBQUosQ0FBa0IsbUJBQWxCLENBQWhDOztBQUVBLFNBQUdOLFVBQUgsRUFBZTtBQUNkSSxVQUFJRyxJQUFKLENBQVMsS0FBVCxFQUFnQixLQUFLNUMsUUFBTCxDQUFjZ0IsR0FBZCxHQUFvQixRQUFwQixHQUErQnFCLFVBQS9DLEVBQTJELElBQTNEO0FBQ0EsTUFGRCxNQUVPO0FBQ05JLFVBQUlHLElBQUosQ0FBUyxLQUFULEVBQWdCLEtBQUs1QyxRQUFMLENBQWNnQixHQUE5QixFQUFtQyxJQUFuQztBQUNBOztBQUVEeUIsU0FBSUksZ0JBQUosQ0FBcUIsY0FBckIsRUFBcUMsa0JBQXJDOztBQUVBLFNBQUluRSxXQUFXLElBQWY7O0FBRUErRCxTQUFJSyxrQkFBSixHQUF5QixZQUFXO0FBQ25DLFVBQUksS0FBS0MsVUFBTCxJQUFtQixDQUF2QixFQUEwQjtBQUN6QixXQUFJLEtBQUtDLE1BQUwsSUFBZSxHQUFuQixFQUF3QjtBQUN2QnRFLGlCQUFTdUUsWUFBVCxHQUF5QixLQUFLQyxZQUFMLElBQXFCLEVBQXRCLEdBQTRCLEVBQTVCLEdBQWlDQyxLQUFLQyxLQUFMLENBQVcsS0FBS0YsWUFBaEIsQ0FBekQ7O0FBRUEsWUFBR3hFLFNBQVN1RSxZQUFULENBQXNCdkcsTUFBdEIsS0FBaUMsQ0FBcEMsRUFBdUM7QUFDdEM4RixnQkFBTywwQkFBUDtBQUNBOztBQUVELGFBQUssSUFBSXRFLElBQUksQ0FBYixFQUFnQkEsSUFBSVEsU0FBU3VFLFlBQVQsQ0FBc0J2RyxNQUExQyxFQUFrRHdCLEdBQWxELEVBQXVEO0FBQ3RELGFBQUlpRSxVQUFVekQsU0FBU3VFLFlBQVQsQ0FBc0IvRSxDQUF0QixDQUFkO0FBQ0FRLGtCQUFTMkUsV0FBVCxDQUFxQi9ILElBQXJCLENBQTBCLElBQTFCLEVBQWdDNkcsT0FBaEM7QUFDQTs7QUFFREksZ0JBQVE3RCxTQUFTdUUsWUFBakI7QUFDQSxRQWJELE1BYU87QUFDTlQsZUFBTyxLQUFLYyxVQUFaO0FBQ0E7QUFDRDtBQUNELE1BbkJEOztBQXFCQWIsU0FBSXJELE9BQUosR0FBYyxVQUFTbEYsS0FBVCxFQUFnQjtBQUM3QnNJLGFBQU90SSxLQUFQO0FBQ0EsTUFGRDs7QUFJQXVJLFNBQUljLElBQUosQ0FBUyxJQUFUO0FBQ0EsS0F4Q2tCLENBd0NqQjlFLElBeENpQixDQXdDWixJQXhDWSxDQUFaLENBQVA7QUF5Q0E7O0FBRUQ7Ozs7QUE3c0I0QjtBQUFBO0FBQUEsaUNBZ3RCZCtFLG9CQWh0QmMsRUFndEJRaEosU0FodEJSLEVBZ3RCbUJpSixPQWh0Qm5CLEVBaXRCNUI7QUFDQyxRQUFHRCxxQkFBcUJ4RixXQUFyQixDQUFpQ2hELElBQWpDLElBQXlDLE9BQTVDLEVBQXNEO0FBQ3JELFdBQU0sSUFBSWhCLDBCQUFKLEVBQU47QUFDQTs7QUFFRCxRQUFJMEosZ0JBQWdCLEVBQXBCOztBQUVBRix5QkFBcUJ6SSxPQUFyQixDQUE2QixVQUFTZ0csVUFBVCxFQUFxQjtBQUNqRCxTQUFJNEMsZUFBZSxLQUFLQyxZQUFMLENBQWtCN0MsVUFBbEIsRUFBOEJ2RyxTQUE5QixFQUF5Q2lKLE9BQXpDLENBQW5CO0FBQ0FDLG1CQUFjdkcsSUFBZCxDQUFtQndHLFlBQW5CO0FBQ0EsS0FINEIsQ0FHM0JsRixJQUgyQixDQUd0QixJQUhzQixDQUE3Qjs7QUFLQSxXQUFPaUYsYUFBUDtBQUNBOztBQUVEOzs7O0FBaHVCNEI7QUFBQTtBQUFBLGdDQW11QmYzQyxVQW51QmUsRUFtdUJIdkcsU0FudUJHLEVBbXVCUWlKLE9BbnVCUixFQW91QjVCO0FBQ0MsUUFBSSxRQUFPMUMsVUFBUCx5Q0FBT0EsVUFBUCxNQUFxQixRQUFyQixJQUFpQyxPQUFPMEMsT0FBUCxJQUFrQixRQUF2RCxFQUFpRTtBQUNoRSxXQUFNLElBQUl6SiwwQkFBSixFQUFOO0FBQ0E7O0FBRURRLGdCQUFZQSxhQUFhLElBQXpCOztBQUVBLFFBQUkySCxVQUFVL0gsSUFBSXlCLGFBQUosQ0FBa0IsS0FBbEIsRUFBeUI7QUFDdEM2RCxZQUFPO0FBRCtCLEtBQXpCLENBQWQ7O0FBSUF0RixRQUFJTyxRQUFKLENBQWF3SCxPQUFiLEVBQXNCM0gsU0FBdEI7O0FBRUEsUUFBSXFKLFVBQVV6SixJQUFJeUIsYUFBSixDQUFrQixLQUFsQixFQUF5QjtBQUN0QzZELFlBQU87QUFEK0IsS0FBekIsQ0FBZDs7QUFJQXlDLFlBQVFqRyxXQUFSLENBQW9CMkgsT0FBcEI7O0FBRUEsU0FBSyxJQUFJQyxTQUFULElBQXNCL0MsVUFBdEIsRUFBa0M7QUFDakMsU0FBSSxDQUFFekQsT0FBT3lHLFFBQVAsQ0FBZ0JELFNBQWhCLEVBQTJCLEtBQUs5RCxRQUFMLENBQWNlLFVBQXpDLENBQU4sRUFBNEQ7QUFDM0Q7QUFDQTs7QUFFRCxTQUFJaUQsT0FBTTVKLElBQUl5QixhQUFKLENBQWtCNEgsT0FBbEIsQ0FBVjs7QUFFQSxTQUFJSyxhQUFhLE9BQWpCLEVBQTBCO0FBQ3pCLFVBQUlHLFFBQVE3SixJQUFJeUIsYUFBSixDQUFrQixLQUFsQixFQUF5QjtBQUNwQ3FJLFlBQUtuRCxXQUFXK0MsU0FBWDtBQUQrQixPQUF6QixDQUFaO0FBR0EzQixjQUFRakcsV0FBUixDQUFvQitILEtBQXBCO0FBQ0EsTUFMRCxNQUtPO0FBQ05ELFdBQUloSSxTQUFKLEdBQWdCK0UsV0FBVytDLFNBQVgsS0FBeUIsRUFBekM7QUFDQTs7QUFFRDFKLFNBQUlPLFFBQUosQ0FBYXFKLElBQWIsRUFBa0IsYUFBYTVELElBQUkrRCxTQUFKLENBQWNMLFNBQWQsQ0FBL0I7QUFDQUQsYUFBUTNILFdBQVIsQ0FBb0I4SCxJQUFwQjtBQUNBOztBQUVELFFBQUlBLE1BQU01SixJQUFJeUIsYUFBSixDQUFrQixLQUFsQixFQUF5QjtBQUNsQ0wsU0FBSSxlQUQ4QjtBQUVsQ2tFLFlBQU87QUFGMkIsS0FBekIsQ0FBVjs7QUFLQSxRQUFJMEUsWUFBWWhLLElBQUl5QixhQUFKLENBQWtCLFFBQWxCLEVBQTRCO0FBQzNDTCxTQUFJLFdBRHVDO0FBRTNDa0UsWUFBTyxLQUFLTSxRQUFMLENBQWNhLGdCQUZzQjtBQUczQ3dELFdBQU0sUUFIcUM7QUFJM0NDLFdBQU07QUFKcUMsS0FBNUIsQ0FBaEI7O0FBT0EsUUFBSUMsV0FBV25LLElBQUl5QixhQUFKLENBQWtCLFFBQWxCLEVBQTRCO0FBQzFDTCxTQUFJLFVBRHNDO0FBRTFDa0UsWUFBTyxLQUFLTSxRQUFMLENBQWNjLHFCQUZxQjtBQUcxQ3VELFdBQU0sUUFIb0M7QUFJMUNDLFdBQU07QUFKb0MsS0FBNUIsQ0FBZjs7QUFPQU4sUUFBSTlILFdBQUosQ0FBZ0JrSSxTQUFoQjtBQUNBSixRQUFJOUgsV0FBSixDQUFnQnFJLFFBQWhCOztBQUVBSCxjQUFVakQsZ0JBQVYsQ0FBMkIsT0FBM0IsRUFBb0MsVUFBU3FELEtBQVQsRUFBZ0I7QUFDbkRBLFdBQU1DLGNBQU47QUFDQXpILFdBQU0rRSxPQUFOLENBQWMsaUJBQWQsRUFBaUNoQixVQUFqQztBQUNBLEtBSEQ7O0FBS0E4QyxZQUFRM0gsV0FBUixDQUFvQjhILEdBQXBCOztBQUVBLFdBQU83QixPQUFQO0FBQ0E7QUF6eUIyQjtBQUFBO0FBQUEsNkJBMnlCbEJxQyxLQTN5QmtCLEVBNHlCNUIsQ0FFQzs7QUFFRDs7OztBQWh6QjRCO0FBQUE7QUFBQSwrQkFtekJoQnJDLE9BbnpCZ0IsRUFvekI1QixDQUVDO0FBREE7OztBQUdEOzs7O0FBeHpCNEI7QUFBQTtBQUFBLGlDQTR6QjVCO0FBQ0MsUUFBRy9ILElBQUlHLE9BQUosQ0FBWSxxQkFBWixDQUFILEVBQXVDO0FBQ3RDO0FBQ0E7O0FBRUQsUUFBSWtCLHlJQUtPLEtBQUt1RSxRQUFMLENBQWNMLEtBTHJCLDJCQU1RLEtBQUtLLFFBQUwsQ0FBY0osTUFOdEIsbzFDQUFKOztBQW1FR3hGLFFBQUlzSyxRQUFKLENBQWEsb0JBQWIsRUFBbUNqSixHQUFuQztBQUNIO0FBcjRCMkI7O0FBQUE7QUFBQTs7QUF3NEI3Qjs7Ozs7QUF4NEI2QixLQTI0QnZCa0osUUEzNEJ1QjtBQUFBO0FBQUE7O0FBZzVCN0I7Ozs7O0FBR0EsS0FBSUMsb0JBQW9CO0FBQ3ZCckssV0FBUyxtQkFEYztBQUV2Qm1GLFNBQU8sRUFGZ0I7QUFHdkJtRixZQUFVLENBSGE7QUFJdkJDLGVBQWE7QUFKVSxFQUF4Qjs7QUFPQTs7O0FBR0EsS0FBSUMsb0JBQUo7O0FBRUE7OztBQUdBLEtBQUlDLG1CQUFKOztBQUVBOzs7O0FBcDZCNkIsS0F1NkJ2QjNELFVBdjZCdUI7QUF5NkI1Qjs7O0FBR0Esc0JBQVl0QixTQUFaLEVBQXVCMEIsUUFBdkIsRUFDQTtBQUFBOztBQUNDLFFBQUt3RCxVQUFMLENBQWdCLENBQWhCO0FBQ0FGLGlCQUFjaEYsU0FBZDtBQUNBaUYsZ0JBQWF2RCxRQUFiO0FBQ0E7O0FBRUQ7Ozs7O0FBbjdCNEI7QUFBQTtBQUFBLHlCQXM3QnRCekIsUUF0N0JzQixFQXU3QjVCO0FBQ0N6RSxhQUFTNEYsZ0JBQVQsQ0FBMEIsa0JBQTFCLEVBQThDLFlBQVc7O0FBRXpELFNBQUcsUUFBT25CLFFBQVAseUNBQU9BLFFBQVAsTUFBbUIsUUFBdEIsRUFBZ0M7QUFDL0IsWUFBTSxJQUFJaEcsMEJBQUosRUFBTjtBQUNBOztBQUVELFVBQUtnRyxRQUFMLEdBQWdCMUMsT0FBTzJDLE1BQVAsQ0FBYzJFLGlCQUFkLEVBQWlDNUUsUUFBakMsQ0FBaEI7O0FBRUEsVUFBS2tGLFVBQUwsR0FBa0IsS0FBS0MsbUJBQUwsQ0FBeUIsS0FBS25GLFFBQUwsQ0FBYzZFLFFBQXZDLEVBQWlELEtBQUs3RSxRQUFMLENBQWM4RSxXQUEvRCxDQUFsQjs7QUFFQSxVQUFLNUUsVUFBTCxDQUFnQixLQUFLRixRQUFMLENBQWN6RixPQUE5QjtBQUNBLFVBQUs2SyxZQUFMLENBQWtCLEtBQUtDLEtBQXZCO0FBRUMsS0FiNkMsQ0FhNUM1RyxJQWI0QyxDQWF2QyxJQWJ1QyxDQUE5QztBQWNBOztBQUVEOzs7O0FBeDhCNEI7QUFBQTtBQUFBLDhCQTI4QmpCckQsUUEzOEJpQixFQTQ4QjVCO0FBQ0MsU0FBSytFLE9BQUwsR0FBZS9GLElBQUlHLE9BQUosQ0FBWWEsUUFBWixDQUFmOztBQUVBaEIsUUFBSU8sUUFBSixDQUFhLEtBQUt3RixPQUFsQixFQUEyQixLQUFLSCxRQUFMLENBQWNOLEtBQXpDOztBQUVBLFNBQUsyRixLQUFMLEdBQWEsS0FBS0MsV0FBTCxFQUFiO0FBQ0EsU0FBS0Msa0JBQUwsQ0FBd0IsS0FBS0YsS0FBN0I7QUFDQTs7QUFFRDs7OztBQXI5QjRCO0FBQUE7QUFBQSxnQ0F3OUJmQSxLQXg5QmUsRUF5OUI1QjtBQUNDLFNBQUtsRixPQUFMLENBQWFuRSxTQUFiLEdBQXlCLEVBQXpCO0FBQ0EsU0FBS21FLE9BQUwsQ0FBYWpFLFdBQWIsQ0FBeUJtSixLQUF6QjtBQUNBOztBQUVEOzs7O0FBOTlCNEI7QUFBQTtBQUFBLHVDQWkrQlJHLE9BaitCUSxFQWkrQkNDLFVBaitCRCxFQWsrQjVCO0FBQ0NELGNBQVVFLFNBQVNGLE9BQVQsQ0FBVjtBQUNBQyxpQkFBYUMsU0FBU0QsVUFBVCxDQUFiOztBQUVBLFdBQU9qRixLQUFLbUYsSUFBTCxDQUFVRixhQUFhRCxPQUF2QixDQUFQO0FBQ0E7O0FBRUQ7Ozs7QUF6K0I0QjtBQUFBO0FBQUEsc0NBNCtCVEgsS0E1K0JTLEVBNitCNUI7QUFDQyxRQUFJM0csV0FBVyxJQUFmOztBQUVBLFNBQUtrSCxJQUFMLENBQVVDLFVBQVYsQ0FBcUIsQ0FBckIsRUFBd0JDLE9BQXhCLEdBQWtDLFVBQVN0QixLQUFULEVBQWdCO0FBQ2pEQSxXQUFNQyxjQUFOOztBQUVBLFNBQUlzQixnQkFBZ0JySCxTQUFTc0gsT0FBVCxHQUFpQixDQUFyQzs7QUFFQSxTQUFJdEgsU0FBU3VILGNBQVQsQ0FBd0JGLGFBQXhCLENBQUosRUFBNEM7QUFDM0MsWUFBTSxJQUFJL0csdUJBQUosRUFBTjtBQUNBOztBQUVEZ0csZ0JBQVd6RCxpQkFBWCxDQUE2QndFLGFBQTdCLEVBQTRDdkUsSUFBNUMsQ0FBaUQsVUFBU0MsUUFBVCxFQUFtQjtBQUNuRXVELGlCQUFXdEQsWUFBWCxDQUF3QkQsUUFBeEI7QUFDQSxNQUZEOztBQUlBL0MsY0FBU3VHLFVBQVQsQ0FBb0JjLGFBQXBCO0FBQ0EsS0FkRDs7QUFnQkEsU0FBS0csUUFBTCxDQUFjTCxVQUFkLENBQXlCLENBQXpCLEVBQTRCQyxPQUE1QixHQUFzQyxVQUFTdEIsS0FBVCxFQUFnQjtBQUNyREEsV0FBTUMsY0FBTjs7QUFFQSxTQUFJc0IsZ0JBQWdCckgsU0FBU3NILE9BQVQsR0FBaUIsQ0FBckM7O0FBRUEsU0FBR3RILFNBQVN1SCxjQUFULENBQXdCRixhQUF4QixDQUFILEVBQTJDO0FBQzFDLFlBQU0sSUFBSS9HLHVCQUFKLEVBQU47QUFDQTs7QUFFRGdHLGdCQUFXekQsaUJBQVgsQ0FBNkJ3RSxhQUE3QixFQUE0Q3ZFLElBQTVDLENBQWlELFVBQVNDLFFBQVQsRUFBbUI7QUFDbkV1RCxpQkFBV3RELFlBQVgsQ0FBd0JELFFBQXhCO0FBQ0EsTUFGRDs7QUFJQS9DLGNBQVN1RyxVQUFULENBQW9CYyxhQUFwQjtBQUNBLEtBZEQ7O0FBZ0JBLFNBQUksSUFBSTdILElBQUksQ0FBWixFQUFlQSxJQUFJLEtBQUtpSSxLQUFMLENBQVd6SixNQUE5QixFQUFzQ3dCLEdBQXRDLEVBQTJDO0FBQzFDLFVBQUtpSSxLQUFMLENBQVdqSSxDQUFYLEVBQWMySCxVQUFkLENBQXlCLENBQXpCLEVBQTRCQyxPQUE1QixHQUFzQyxVQUFTdEIsS0FBVCxFQUFnQjtBQUNyREEsWUFBTUMsY0FBTjs7QUFFQSxVQUFJc0IsZ0JBQWdCLEtBQUtLLFlBQUwsQ0FBa0IsY0FBbEIsQ0FBcEI7O0FBRUFwQixpQkFBV3pELGlCQUFYLENBQTZCd0UsYUFBN0IsRUFBNEN2RSxJQUE1QyxDQUFpRCxVQUFTQyxRQUFULEVBQW1CO0FBQ25FdUQsa0JBQVd0RCxZQUFYLENBQXdCRCxRQUF4QjtBQUNBLE9BRkQ7O0FBSUEvQyxlQUFTdUcsVUFBVCxDQUFvQmMsYUFBcEI7QUFDQSxNQVZEO0FBV0E7QUFDRDs7QUFFRDs7OztBQS9oQzRCO0FBQUE7QUFBQSw4QkFraUNqQjFELFVBbGlDaUIsRUFtaUM1QjtBQUNDLFNBQUsyRCxPQUFMLEdBQWVOLFNBQVNyRCxVQUFULENBQWY7QUFDQSxTQUFLZ0UsU0FBTCxDQUFlaEUsVUFBZjtBQUNBLFNBQUtpRSxhQUFMLENBQW1CakUsVUFBbkI7QUFDQTs7QUFFRDs7OztBQXppQzRCO0FBQUE7QUFBQSxnQ0E2aUM1QjtBQUNDLFdBQU8sS0FBSzJELE9BQVo7QUFDQTs7QUFFRDs7OztBQWpqQzRCO0FBQUE7QUFBQSxpQ0FxakM1QjtBQUNDLFFBQUlPLEtBQUtoTCxTQUFTTSxhQUFULENBQXVCLElBQXZCLENBQVQ7O0FBRUEsU0FBS3NLLEtBQUwsR0FBYSxLQUFLSyxlQUFMLEVBQWI7QUFDQSxTQUFLTixRQUFMLEdBQWdCLEtBQUtPLG9CQUFMLEVBQWhCO0FBQ0EsU0FBS2IsSUFBTCxHQUFZLEtBQUtjLGdCQUFMLEVBQVo7O0FBRUFILE9BQUcvTCxTQUFILEdBQWUsWUFBZjtBQUNBK0wsT0FBR3JLLFdBQUgsQ0FBZSxLQUFLZ0ssUUFBcEI7O0FBRUEsU0FBS0MsS0FBTCxDQUFXcEwsT0FBWCxDQUFtQixVQUFTNEwsSUFBVCxFQUFlO0FBQ2pDSixRQUFHckssV0FBSCxDQUFleUssSUFBZjtBQUNBLEtBRkQ7O0FBSUFKLE9BQUdySyxXQUFILENBQWUsS0FBSzBKLElBQXBCOztBQUVBLFdBQU9XLEVBQVA7QUFDQTs7QUFFRDs7OztBQXhrQzRCO0FBQUE7QUFBQSxxQ0E0a0M1QjtBQUNDLFFBQUlKLFFBQVEsRUFBWjs7QUFFQSxTQUFJLElBQUlqSSxJQUFJLENBQVosRUFBZUEsS0FBSyxLQUFLZ0gsVUFBekIsRUFBcUNoSCxHQUFyQyxFQUEwQztBQUN6QyxTQUFJMEksV0FBV3JMLFNBQVNNLGFBQVQsQ0FBdUIsSUFBdkIsQ0FBZjtBQUNBLFNBQUlnTCxPQUFPdEwsU0FBU00sYUFBVCxDQUF1QixHQUF2QixDQUFYO0FBQ0ErSyxjQUFTcE0sU0FBVCxHQUFzQixLQUFLd0wsT0FBTCxJQUFnQjlILENBQWpCLEdBQXNCLGtCQUF0QixHQUEyQyxXQUFoRTtBQUNBMkksVUFBS3JNLFNBQUwsR0FBaUIsV0FBakI7QUFDQXFNLFVBQUs1SyxZQUFMLENBQWtCLE1BQWxCLEVBQTBCLFdBQVVpQyxDQUFwQztBQUNBMkksVUFBSzVLLFlBQUwsQ0FBa0IsY0FBbEIsRUFBa0NpQyxDQUFsQztBQUNBMkksVUFBSzdLLFNBQUwsR0FBaUJrQyxDQUFqQjtBQUNBMEksY0FBUzFLLFdBQVQsQ0FBcUIySyxJQUFyQjtBQUNBVixXQUFNaEosSUFBTixDQUFXeUosUUFBWDtBQUNBOztBQUVELFdBQU9ULEtBQVA7QUFDQTs7QUFFRDs7OztBQTlsQzRCO0FBQUE7QUFBQSwwQ0FrbUM1QjtBQUNDLFFBQUlXLEtBQUt2TCxTQUFTTSxhQUFULENBQXVCLElBQXZCLENBQVQ7QUFDQSxRQUFJZ0wsT0FBT3RMLFNBQVNNLGFBQVQsQ0FBdUIsR0FBdkIsQ0FBWDtBQUNBLFFBQUlrTCxRQUFReEwsU0FBU00sYUFBVCxDQUF1QixNQUF2QixDQUFaO0FBQ0EsUUFBSW1MLFFBQVF6TCxTQUFTTSxhQUFULENBQXVCLE1BQXZCLENBQVo7O0FBR0FpTCxPQUFHdE0sU0FBSCxHQUFlLFdBQWY7QUFDQXFNLFNBQUtyTSxTQUFMLEdBQWlCLFdBQWpCO0FBQ0F3TSxVQUFNeE0sU0FBTixHQUFrQixTQUFsQjs7QUFFQXFNLFNBQUs1SyxZQUFMLENBQWtCLE1BQWxCLEVBQTBCLEVBQTFCO0FBQ0E0SyxTQUFLNUssWUFBTCxDQUFrQixZQUFsQixFQUFnQyxVQUFoQztBQUNBOEssVUFBTTlLLFlBQU4sQ0FBbUIsYUFBbkIsRUFBa0MsTUFBbEM7O0FBRUE4SyxVQUFNL0ssU0FBTixHQUFrQixTQUFsQjtBQUNBZ0wsVUFBTWhMLFNBQU4sR0FBa0IsVUFBbEI7O0FBRUE2SyxTQUFLM0ssV0FBTCxDQUFpQjZLLEtBQWpCO0FBQ0FGLFNBQUszSyxXQUFMLENBQWlCOEssS0FBakI7QUFDQUYsT0FBRzVLLFdBQUgsQ0FBZTJLLElBQWY7O0FBRUEsV0FBT0MsRUFBUDtBQUNBOztBQUVEOzs7O0FBM25DNEI7QUFBQTtBQUFBLHNDQStuQzVCO0FBQ0MsUUFBSUEsS0FBS3ZMLFNBQVNNLGFBQVQsQ0FBdUIsSUFBdkIsQ0FBVDtBQUNBLFFBQUlnTCxPQUFPdEwsU0FBU00sYUFBVCxDQUF1QixHQUF2QixDQUFYO0FBQ0EsUUFBSWtMLFFBQVF4TCxTQUFTTSxhQUFULENBQXVCLE1BQXZCLENBQVo7QUFDQSxRQUFJbUwsUUFBUXpMLFNBQVNNLGFBQVQsQ0FBdUIsTUFBdkIsQ0FBWjs7QUFFQWlMLE9BQUd0TSxTQUFILEdBQWUsV0FBZjtBQUNBcU0sU0FBS3JNLFNBQUwsR0FBaUIsV0FBakI7QUFDQXdNLFVBQU14TSxTQUFOLEdBQWtCLFNBQWxCOztBQUVBcU0sU0FBSzVLLFlBQUwsQ0FBa0IsTUFBbEIsRUFBMEIsRUFBMUI7QUFDQTRLLFNBQUs1SyxZQUFMLENBQWtCLFlBQWxCLEVBQWdDLE1BQWhDO0FBQ0E4SyxVQUFNOUssWUFBTixDQUFtQixhQUFuQixFQUFrQyxNQUFsQzs7QUFFQThLLFVBQU0vSyxTQUFOLEdBQWtCLFNBQWxCO0FBQ0FnTCxVQUFNaEwsU0FBTixHQUFrQixNQUFsQjs7QUFFQTZLLFNBQUszSyxXQUFMLENBQWlCNkssS0FBakI7QUFDQUYsU0FBSzNLLFdBQUwsQ0FBaUI4SyxLQUFqQjtBQUNBRixPQUFHNUssV0FBSCxDQUFlMkssSUFBZjs7QUFFQSxXQUFPQyxFQUFQO0FBQ0E7O0FBRUQ7Ozs7QUF2cEM0QjtBQUFBO0FBQUEsa0NBMHBDYnpFLFVBMXBDYSxFQTJwQzVCO0FBQ0MsV0FBUUEsYUFBYSxLQUFLNkMsVUFBbEIsSUFBZ0M3QyxjQUFjLENBQS9DLElBQXFENEUsTUFBTTVFLFVBQU4sQ0FBNUQ7QUFDQTs7QUFFRDs7OztBQS9wQzRCO0FBQUE7QUFBQSw2QkFrcUNsQkEsVUFscUNrQixFQW1xQzVCO0FBQ0NBLGlCQUFjQSxjQUFjNkUsV0FBVyxNQUFYLENBQTVCO0FBQ0EvSCxXQUFPZ0ksT0FBUCxDQUFlQyxZQUFmLENBQTRCLEVBQTVCLEVBQWdDLEVBQWhDLEVBQW9DLEtBQUtDLGtCQUFMLENBQXdCbEksT0FBT21JLFFBQVAsQ0FBZ0JDLElBQXhDLEVBQThDLE1BQTlDLEVBQXNEbEYsVUFBdEQsQ0FBcEM7QUFDQTtBQXRxQzJCO0FBQUE7QUFBQSxpQ0F3cUNkQSxVQXhxQ2MsRUF5cUM1QjtBQUNDLFNBQUksSUFBSXNFLElBQVIsSUFBZ0IsS0FBS1IsS0FBckIsRUFBNEI7QUFDM0IsU0FBSSxLQUFLQSxLQUFMLENBQVdRLElBQVgsRUFBaUJkLFVBQWpCLENBQTRCLENBQTVCLEVBQStCTyxZQUEvQixDQUE0QyxjQUE1QyxLQUErRC9ELFVBQW5FLEVBQStFO0FBQzlFakksVUFBSU8sUUFBSixDQUFhLEtBQUt3TCxLQUFMLENBQVdRLElBQVgsQ0FBYixFQUErQixRQUEvQjtBQUNBLE1BRkQsTUFFTztBQUNOdk0sVUFBSU0sV0FBSixDQUFnQixLQUFLeUwsS0FBTCxDQUFXUSxJQUFYLENBQWhCLEVBQWtDLFFBQWxDO0FBQ0E7QUFDRDtBQUNEOztBQUVEOzs7O0FBbnJDNEI7QUFBQTtBQUFBLDhCQXVyQzVCO0FBQ0MsUUFBSWEsT0FBTyxFQUFYO0FBQ0EsUUFBSUMsUUFBUXRJLE9BQU9tSSxRQUFQLENBQWdCQyxJQUFoQixDQUFxQmpOLE9BQXJCLENBQTZCLHlCQUE3QixFQUF3RCxVQUFTb04sQ0FBVCxFQUFZbkosR0FBWixFQUFpQm9KLEtBQWpCLEVBQXdCO0FBQzNGSCxVQUFLakosR0FBTCxJQUFZb0osS0FBWjtBQUNBLEtBRlcsQ0FBWjs7QUFJQSxXQUFPSCxJQUFQO0FBQ0E7O0FBRUQ7Ozs7QUFoc0M0QjtBQUFBO0FBQUEsc0NBbXNDVHhHLEdBbnNDUyxFQW1zQ0o0RyxLQW5zQ0ksRUFtc0NHQyxRQW5zQ0gsRUFvc0M1QjtBQUNJLFFBQUlDLG1CQUFtQixFQUF2QjtBQUNBLFFBQUlDLFlBQVkvRyxJQUFJbEcsS0FBSixDQUFVLEdBQVYsQ0FBaEI7QUFDQSxRQUFJa04sVUFBVUQsVUFBVSxDQUFWLENBQWQ7QUFDQSxRQUFJRSxnQkFBZ0JGLFVBQVUsQ0FBVixDQUFwQjtBQUNBLFFBQUlHLE9BQU8sRUFBWDs7QUFFQSxRQUFJRCxhQUFKLEVBQW1CO0FBQ2ZGLGlCQUFZRSxjQUFjbk4sS0FBZCxDQUFvQixHQUFwQixDQUFaO0FBQ0EsVUFBSyxJQUFJb0QsSUFBSSxDQUFiLEVBQWdCQSxJQUFJNkosVUFBVXJMLE1BQTlCLEVBQXNDd0IsR0FBdEMsRUFBMEM7QUFDdEMsVUFBSTZKLFVBQVU3SixDQUFWLEVBQWFwRCxLQUFiLENBQW1CLEdBQW5CLEVBQXdCLENBQXhCLEtBQThCOE0sS0FBbEMsRUFBd0M7QUFDcENFLDJCQUFvQkksT0FBT0gsVUFBVTdKLENBQVYsQ0FBM0I7QUFDQWdLLGNBQU8sR0FBUDtBQUNIO0FBQ0o7QUFDSjs7QUFFRCxRQUFJQyxXQUFXRCxPQUFPLEVBQVAsR0FBWU4sS0FBWixHQUFvQixHQUFwQixHQUEwQkMsUUFBekM7QUFDQSxXQUFPRyxVQUFVLEdBQVYsR0FBZ0JGLGdCQUFoQixHQUFtQ0ssUUFBMUM7QUFDSDs7QUFFRDs7OztBQXp0QzRCO0FBQUE7QUFBQSwyQkE2dEM1QjtBQUNDLFNBQUtsRCxVQUFMLENBQWdCLENBQWhCO0FBQ0EsU0FBS29CLFNBQUwsQ0FBZSxDQUFmO0FBQ0E7QUFodUMyQjs7QUFBQTtBQUFBOztBQUFBLEtBbXVDdkIrQixNQW51Q3VCO0FBQUE7QUFBQTtBQUFBOztBQUFBO0FBQUE7O0FBcXVDNUI7OztBQXJ1QzRCLHVCQXd1Q2pCcE4sSUF4dUNpQixFQXd1Q1gyTSxLQXh1Q1csRUF3dUNKVSxJQXh1Q0ksRUF5dUM1QjtBQUNDLFFBQUlWLE1BQU0zSixXQUFOLENBQWtCaEQsSUFBbEIsSUFBMkIsUUFBM0IsSUFBdUMyTSxNQUFNM0osV0FBTixDQUFrQmhELElBQWxCLElBQTBCLE9BQXJFLEVBQThFO0FBQzdFMk0sYUFBUXhFLEtBQUttRixTQUFMLENBQWVYLEtBQWYsQ0FBUjtBQUNBOztBQUVEVSxXQUFPQSxRQUFRLEVBQWY7O0FBRUcsUUFBSUUsZ0JBQUo7O0FBRUEsUUFBSUYsSUFBSixFQUFVO0FBQ04sU0FBSUcsT0FBTyxJQUFJQyxJQUFKLEVBQVg7QUFDQUQsVUFBS0UsT0FBTCxDQUFhRixLQUFLRyxPQUFMLEtBQWtCTixPQUFPLEVBQVAsR0FBWSxFQUFaLEdBQWlCLEVBQWpCLEdBQXNCLElBQXJEO0FBQ0FFLGVBQVUsZUFBZUMsS0FBS0ksV0FBTCxFQUF6QjtBQUNILEtBSkQsTUFJTztBQUNITCxlQUFVLEVBQVY7QUFDSDs7QUFFRGhOLGFBQVNzTixNQUFULEdBQWtCN04sT0FBTyxHQUFQLEdBQWEyTSxLQUFiLEdBQXFCWSxPQUFyQixHQUErQixVQUFqRDtBQUNIOztBQUVEOzs7O0FBN3ZDNEI7QUFBQTtBQUFBLHVCQWd3Q2pCdk4sSUFod0NpQixFQWl3QzVCO0FBQ0ksUUFBSU8sU0FBU3NOLE1BQVQsQ0FBZ0JuTSxNQUFoQixHQUF5QixDQUE3QixFQUFnQztBQUM1QixTQUFJb00sVUFBVXZOLFNBQVNzTixNQUFULENBQWdCRSxPQUFoQixDQUF3Qi9OLE9BQU8sR0FBL0IsQ0FBZDs7QUFFQSxTQUFJOE4sV0FBVyxDQUFDLENBQWhCLEVBQW1CO0FBQ2ZBLGdCQUFVQSxVQUFVOU4sS0FBSzBCLE1BQWYsR0FBd0IsQ0FBbEM7QUFDQSxVQUFJc00sUUFBUXpOLFNBQVNzTixNQUFULENBQWdCRSxPQUFoQixDQUF3QixHQUF4QixFQUE2QkQsT0FBN0IsQ0FBWjs7QUFFQSxVQUFJRSxTQUFTLENBQUMsQ0FBZCxFQUFpQjtBQUNiQSxlQUFRek4sU0FBU3NOLE1BQVQsQ0FBZ0JuTSxNQUF4QjtBQUNIOztBQUVELGFBQU95RyxLQUFLQyxLQUFMLENBQVc2RixTQUFTMU4sU0FBU3NOLE1BQVQsQ0FBZ0JLLFNBQWhCLENBQTBCSixPQUExQixFQUFtQ0UsS0FBbkMsQ0FBVCxDQUFYLENBQVA7QUFDSDtBQUNKOztBQUVELFdBQU8sRUFBUDtBQUNIO0FBbHhDMkI7O0FBQUE7QUFBQTs7QUFxeEM3Qjs7Ozs7QUFHQSxLQUFJRyxvQkFBb0I7QUFDdkI1TyxXQUFTLE9BRGM7QUFFdkI2TyxlQUFhLE1BRlU7QUFHdkJDLGlCQUFlLEVBSFE7QUFJdkJDLFVBQVEsMkJBSmU7QUFLdkI1SixTQUFPLEVBTGdCO0FBTXZCQyxTQUFPLE1BTmdCO0FBT3ZCQyxVQUFRLE1BUGU7QUFRdkIySixhQUFXLFdBUlk7QUFTdkJDLFNBQU8sSUFUZ0I7QUFVdkJDLGVBQWE7QUFWVSxFQUF4Qjs7QUFhQTs7O0FBR0EsS0FBSUMsb0JBQUo7O0FBRUE7OztBQUdBLEtBQUlDLHdCQUFKOztBQUVBOzs7O0FBL3lDNkIsS0FrekN2QkMsSUFsekN1QjtBQW96QzVCOzs7O0FBSUEsZ0JBQVk3SixTQUFaLEVBQ0E7QUFBQTs7QUFDQzJKLGlCQUFjM0osU0FBZDs7QUFFQSxRQUFLOEosY0FBTCxHQUFzQixLQUFLQyxvQkFBTCxFQUF0QjtBQUNBLFFBQUtDLE9BQUwsR0FBZUMsV0FBVzFPLElBQVgsQ0FBZ0IsSUFBaEIsQ0FBZjtBQUNBOztBQUVEOzs7OztBQWgwQzRCO0FBQUE7QUFBQSx5QkFtMEN0QjBFLFFBbjBDc0IsRUFvMEM1QjtBQUNDLFFBQUcsUUFBT0EsUUFBUCx5Q0FBT0EsUUFBUCxNQUFtQixRQUF0QixFQUFnQztBQUMvQixXQUFNLElBQUloRywwQkFBSixFQUFOO0FBQ0E7O0FBRUQsU0FBS2dHLFFBQUwsR0FBZ0IxQyxPQUFPMkMsTUFBUCxDQUFja0osaUJBQWQsRUFBaUNuSixRQUFqQyxDQUFoQjs7QUFFQSxTQUFLRSxVQUFMLENBQWdCLEtBQUtGLFFBQUwsQ0FBY3pGLE9BQTlCOztBQUVBSCxRQUFJTyxRQUFKLENBQWEsS0FBS2tQLGNBQWxCLEVBQWtDLFFBQWxDO0FBQ0F6UCxRQUFJTyxRQUFKLENBQWEsS0FBS2tQLGNBQWxCLEVBQWtDLEtBQUs3SixRQUFMLENBQWNxSixhQUFoRDs7QUFFQSxTQUFLOUQsa0JBQUw7QUFDQSxTQUFLbkUsV0FBTDs7QUFFQSxRQUFHLEtBQUs2SSxPQUFMLENBQWE3QixPQUFPOEIsR0FBUCxDQUFXLEtBQUtsSyxRQUFMLENBQWNvSixXQUF6QixDQUFiLENBQUgsRUFBd0Q7QUFDdkQsVUFBS2UsSUFBTCxHQUFZLEVBQVo7QUFDQSxVQUFLQyxPQUFMLENBQWEsS0FBS0QsSUFBbEI7QUFDQTtBQUNEOztBQUVEOzs7O0FBejFDNEI7QUFBQTtBQUFBLDJCQTQxQ3BCQSxJQTUxQ29CLEVBNjFDNUI7QUFDQyxXQUFPN00sT0FBTytNLFdBQVAsQ0FBbUJGLElBQW5CLENBQVA7QUFDQTs7QUFFRDs7OztBQWoyQzRCO0FBQUE7QUFBQSwyQkFvMkNwQkEsSUFwMkNvQixFQXEyQzVCO0FBQ0MsU0FBS0EsSUFBTCxDQUFVM08sRUFBVixHQUFlNEUsSUFBSU0sTUFBSixDQUFXLEVBQVgsQ0FBZjtBQUNBLFNBQUt5SixJQUFMLENBQVVySSxLQUFWLEdBQWtCLEVBQWxCO0FBQ0EsU0FBS3FJLElBQUwsQ0FBVUcsU0FBVixHQUFzQixFQUF0QjtBQUNBbEMsV0FBT21DLEdBQVAsQ0FBVyxLQUFLdkssUUFBTCxDQUFjb0osV0FBekIsRUFBc0NlLElBQXRDLEVBQTRDLENBQTVDO0FBQ0E7O0FBRUQ7Ozs7QUE1MkM0QjtBQUFBO0FBQUEsMkJBKzJDcEJLLElBLzJDb0IsRUFnM0M1QjtBQUNDLFNBQUtMLElBQUwsR0FBWS9CLE9BQU84QixHQUFQLENBQVcsS0FBS2xLLFFBQUwsQ0FBY29KLFdBQXpCLENBQVo7O0FBRUEsU0FBS2UsSUFBTCxDQUFVckksS0FBVixDQUFnQjNFLElBQWhCLENBQXFCcU4sSUFBckI7O0FBRUFwQyxXQUFPbUMsR0FBUCxDQUFXLEtBQUt2SyxRQUFMLENBQWNvSixXQUF6QixFQUFzQyxLQUFLZSxJQUEzQyxFQUFpRCxDQUFqRDtBQUNBOztBQUVEOzs7O0FBeDNDNEI7QUFBQTtBQUFBLDhCQTIzQ2pCSyxJQTMzQ2lCLEVBNDNDNUI7QUFDRSxTQUFLTCxJQUFMLEdBQVkvQixPQUFPOEIsR0FBUCxDQUFXLEtBQUtsSyxRQUFMLENBQWNvSixXQUF6QixDQUFaOztBQUVBLFNBQUtlLElBQUwsQ0FBVXJJLEtBQVYsQ0FBZ0IySSxNQUFoQixDQUF1QixLQUFLTixJQUFMLENBQVVySSxLQUFWLENBQWdCaUgsT0FBaEIsQ0FBd0J5QixJQUF4QixDQUF2QixFQUFzRCxDQUF0RDs7QUFFQXBDLFdBQU9tQyxHQUFQLENBQVcsS0FBS3ZLLFFBQUwsQ0FBY29KLFdBQXpCLEVBQXNDLEtBQUtlLElBQTNDLEVBQWlELENBQWpEO0FBQ0Q7O0FBRUQ7Ozs7QUFwNEM0QjtBQUFBO0FBQUEsZ0NBdTRDZnJJLEtBdjRDZSxFQXc0QzVCO0FBQ0MsUUFBSTRJLFdBQVd0USxJQUFJdVEsSUFBSixDQUFTLEtBQUtkLGNBQWQsRUFBOEIsUUFBOUIsQ0FBZjs7QUFFQWEsYUFBUzFPLFNBQVQsR0FBcUIsRUFBckI7QUFDQSxTQUFLLElBQUlrQyxJQUFJLENBQWIsRUFBZ0JBLElBQUk0RCxNQUFNcEYsTUFBMUIsRUFBa0N3QixHQUFsQyxFQUF1Qzs7QUFFdEMsU0FBSTRJLEtBQUsxTSxJQUFJeUIsYUFBSixDQUFrQixJQUFsQixFQUF3QjtBQUMvQjZELGFBQU87QUFEd0IsTUFBeEIsQ0FBVDs7QUFJQSxTQUFJcUIsYUFBYWUsTUFBTTVELENBQU4sQ0FBakI7O0FBRUEsVUFBSSxJQUFJNEYsU0FBUixJQUFxQi9DLFVBQXJCLEVBQWlDO0FBQ2hDLFVBQUk2SixPQUFPeFEsSUFBSXlCLGFBQUosQ0FBa0IsTUFBbEIsRUFBMEI7QUFDcEN5SSxhQUFNdkQsV0FBVytDLFNBQVg7QUFEOEIsT0FBMUIsQ0FBWDs7QUFJQWdELFNBQUc1SyxXQUFILENBQWUwTyxJQUFmO0FBQ0E7O0FBRURGLGNBQVN4TyxXQUFULENBQXFCNEssRUFBckI7QUFDQTtBQUNEOztBQUVEOzs7O0FBaDZDNEI7QUFBQTtBQUFBLDhCQW02Q2pCMUwsUUFuNkNpQixFQW82QzVCO0FBQ0MsU0FBS3lQLElBQUwsR0FBWXpRLElBQUlHLE9BQUosQ0FBWWEsUUFBWixDQUFaOztBQUVBLFFBQUksS0FBS3lQLElBQVQsRUFBZTtBQUNkelEsU0FBSU8sUUFBSixDQUFhLEtBQUtrUSxJQUFsQixFQUF3QixLQUFLN0ssUUFBTCxDQUFjTixLQUF0QztBQUNBdEYsU0FBSU8sUUFBSixDQUFhLEtBQUtrUSxJQUFsQixFQUF3QixLQUFLN0ssUUFBTCxDQUFjdUosU0FBdEM7QUFDQSxVQUFLc0IsSUFBTCxDQUFVM08sV0FBVixDQUFzQixLQUFLNk4sT0FBM0I7QUFDQSxVQUFLYyxJQUFMLENBQVUzTyxXQUFWLENBQXNCLEtBQUsyTixjQUEzQjtBQUNBO0FBQ0Q7O0FBRUQ7Ozs7QUEvNkM0QjtBQUFBO0FBQUEsMENBbTdDNUI7QUFDQyxRQUFJQSxpQkFBaUJ6UCxJQUFJeUIsYUFBSixDQUFrQixLQUFsQixFQUF5QjtBQUM3Q0wsU0FBSTtBQUR5QyxLQUF6QixDQUFyQjs7QUFJQSxRQUFJK0ssS0FBS25NLElBQUl5QixhQUFKLENBQWtCLElBQWxCLEVBQXdCO0FBQy9CNkQsWUFBTztBQUR3QixLQUF4QixDQUFUOztBQUlBbUssbUJBQWUzTixXQUFmLENBQTJCcUssRUFBM0I7O0FBRUEsV0FBT3NELGNBQVA7QUFDQTs7QUFFRDs7OztBQWo4QzRCO0FBQUE7QUFBQSxpQ0FxOEM1QjtBQUNDLFFBQUd6UCxJQUFJRyxPQUFKLENBQVksaUJBQVosQ0FBSCxFQUFtQztBQUNsQztBQUNBOztBQUVELFFBQUl1USxXQUFZLEtBQUs5SyxRQUFMLENBQWN3SixLQUFmLEdBQXdCLE9BQXhCLEdBQWtDLFVBQWpEOztBQUVBLFFBQUkvTixtQkFDRCxLQUFLdUUsUUFBTCxDQUFjekYsT0FEYiw4QkFFVXVRLFFBRlYsc0dBUUQsS0FBSzlLLFFBQUwsQ0FBY3pGLE9BUmIsaUNBU08sS0FBS3lGLFFBQUwsQ0FBY0wsS0FUckIsMkJBVVEsS0FBS0ssUUFBTCxDQUFjSixNQVZ0Qiw0REFjRCxLQUFLSSxRQUFMLENBQWN6RixPQWRiLHNDQWVNLEtBQUt5RixRQUFMLENBQWN5SixXQWZwQiw0REFtQkQsS0FBS3pKLFFBQUwsQ0FBY3pGLE9BbkJiLDJCQW9CRCxLQUFLeUYsUUFBTCxDQUFjekYsT0FwQmIsaUZBeUJELEtBQUt5RixRQUFMLENBQWN6RixPQXpCYiwwQkEwQkQsS0FBS3lGLFFBQUwsQ0FBY3pGLE9BMUJiLCtFQStCRCxLQUFLeUYsUUFBTCxDQUFjekYsT0EvQmIseUNBZ0NVdVEsUUFoQ1YsNERBa0NpQixLQUFLOUssUUFBTCxDQUFjSixNQWxDL0IsNlJBNkNELEtBQUtJLFFBQUwsQ0FBY3pGLE9BN0NiLHFIQWtERCxLQUFLeUYsUUFBTCxDQUFjekYsT0FsRGIsa0hBdURELEtBQUt5RixRQUFMLENBQWN6RixPQXZEYix1Q0F3REQsS0FBS3lGLFFBQUwsQ0FBY3pGLE9BeERiLDhpQkFBSjs7QUFtRkdILFFBQUlzSyxRQUFKLENBQWEsZ0JBQWIsRUFBK0JqSixHQUEvQjtBQUNIOztBQUVEOzs7O0FBbGlENEI7QUFBQTtBQUFBLG9DQXNpRDVCO0FBQ0MsUUFBSWtPLGVBQUosRUFBb0I7QUFDbkIsWUFBT0EsZUFBUDtBQUNBOztBQUVELFFBQUlMLFNBQVNsUCxJQUFJeUIsYUFBSixDQUFrQixLQUFsQixFQUF5QjtBQUNyQ3FJLFVBQUssS0FBS2xFLFFBQUwsQ0FBY3NKLE1BRGtCO0FBRXJDNUosWUFBTztBQUY4QixLQUF6QixDQUFiOztBQUtBaUssc0JBQWlCdlAsSUFBSXlCLGFBQUosQ0FBa0IsS0FBbEIsRUFBeUI7QUFDekM2RCxZQUFPO0FBRGtDLEtBQXpCLENBQWpCOztBQUlBaUssb0JBQWV6TixXQUFmLENBQTJCb04sTUFBM0I7O0FBRUEsV0FBT0ssZUFBUDtBQUNBOztBQUVEOzs7O0FBempENEI7QUFBQTtBQUFBLHlDQTZqRDVCO0FBQ0MsU0FBS0UsY0FBTCxDQUFvQjNOLFdBQXBCLENBQWdDLEtBQUt5TixjQUFMLEVBQWhDO0FBQ0E7O0FBRUQ7Ozs7QUFqa0Q0QjtBQUFBO0FBQUEsd0NBcWtENUI7QUFDQyxRQUFJdlAsSUFBSXVRLElBQUosQ0FBUyxLQUFLZCxjQUFkLEVBQThCLHNCQUE5QixDQUFKLEVBQTJEO0FBQzFELFVBQUtBLGNBQUwsQ0FBb0JrQixXQUFwQixDQUFnQyxLQUFLcEIsY0FBTCxFQUFoQztBQUNBO0FBQ0Q7O0FBRUQ7Ozs7QUEza0Q0QjtBQUFBO0FBQUEsdUNBK2tENUI7O0FBRUMsU0FBS3FCLG1CQUFMO0FBQ0EsUUFBSWxKLFFBQVEsS0FBS21KLFlBQUwsRUFBWjtBQUNBLFNBQUtDLFlBQUwsQ0FBa0JwSixLQUFsQjs7QUFFQSxRQUFJcEQsV0FBVyxJQUFmOztBQUVBeU0sZUFBVyxZQUFXO0FBQ3JCek0sY0FBUzBNLGtCQUFULENBQTRCOVAsSUFBNUIsQ0FBaUNvRCxRQUFqQztBQUNBLEtBRkQsRUFFRyxJQUZIO0FBR0E7O0FBRUQ7Ozs7QUE1bEQ0QjtBQUFBO0FBQUEsd0NBZ21ENUI7QUFDQyxRQUFHLEtBQUtxTCxPQUFMLElBQWdCLElBQW5CLEVBQXlCO0FBQ3hCO0FBQ0E7O0FBRUQsU0FBS0EsT0FBTCxDQUFhakUsT0FBYixHQUF1QixVQUFTdUYsQ0FBVCxFQUFZO0FBQ2xDQSxPQUFFNUcsY0FBRjtBQUNBLFNBQUk2RyxVQUFVbFIsSUFBSW1SLFdBQUosQ0FBZ0IsS0FBSzFCLGNBQXJCLEVBQXFDLFFBQXJDLEVBQStDLFFBQS9DLENBQWQ7O0FBRUEsU0FBSXlCLE9BQUosRUFBYTtBQUNaLFdBQUtFLGlCQUFMO0FBQ0E7QUFDRCxLQVBzQixDQU9yQi9NLElBUHFCLENBT2hCLElBUGdCLENBQXZCOztBQVNBekIsVUFBTXlPLE1BQU4sQ0FBYSxpQkFBYixFQUFnQyxVQUFTMUssVUFBVCxFQUFxQjtBQUNwRCxTQUFJb0osT0FBTy9CLE9BQU84QixHQUFQLENBQVcsS0FBS2xLLFFBQUwsQ0FBY29KLFdBQXpCLENBQVg7QUFDQWUsVUFBS3JJLEtBQUwsQ0FBVzNFLElBQVgsQ0FBZ0I0RCxVQUFoQjtBQUNBcUgsWUFBT21DLEdBQVAsQ0FBVyxLQUFLdkssUUFBTCxDQUFjb0osV0FBekIsRUFBc0NlLElBQXRDO0FBQ0EsVUFBS3FCLGlCQUFMO0FBQ0EsS0FMK0IsQ0FLOUIvTSxJQUw4QixDQUt6QixJQUx5QixDQUFoQztBQU1BOztBQUVEOzs7O0FBdG5ENEI7QUFBQTtBQUFBLGtDQTBuRDVCO0FBQ0MsUUFBSTBMLE9BQU8vQixPQUFPOEIsR0FBUCxDQUFXLEtBQUtsSyxRQUFMLENBQWNvSixXQUF6QixDQUFYOztBQUVBLFdBQVFlLElBQUQsR0FBU0EsS0FBS3JJLEtBQWQsR0FBc0IsRUFBN0I7QUFDQTtBQTluRDJCOztBQUFBO0FBQUE7O0FBaW9EN0IsVUFBUzRKLEtBQVQsQ0FBZWxILEtBQWYsRUFBc0I7QUFDckJBLFFBQU1DLGNBQU47QUFDQXJLLE1BQUl1UixhQUFKLENBQWtCLEtBQUs5QixjQUF2QixFQUF1QyxRQUF2QyxFQUFpRCxRQUFqRDtBQUNBOztBQUVELFVBQVNHLFVBQVQsR0FBc0I7QUFDckIsTUFBSTRCLE1BQU1yUSxTQUFTc1EsZUFBVCxDQUF5Qiw0QkFBekIsRUFBdUQsS0FBdkQsQ0FBVjtBQUNBLE1BQUlDLElBQUl2USxTQUFTc1EsZUFBVCxDQUF5Qiw0QkFBekIsRUFBdUQsR0FBdkQsQ0FBUjtBQUNBLE1BQUlFLE9BQU94USxTQUFTc1EsZUFBVCxDQUF5Qiw0QkFBekIsRUFBdUQsTUFBdkQsQ0FBWDs7QUFFQUQsTUFBSTNQLFlBQUosQ0FBaUIsU0FBakIsRUFBNEIsS0FBNUI7QUFDQTJQLE1BQUkzUCxZQUFKLENBQWlCLE9BQWpCLEVBQTBCLDRCQUExQjtBQUNBMlAsTUFBSTNQLFlBQUosQ0FBaUIsYUFBakIsRUFBZ0MsOEJBQWhDO0FBQ0EyUCxNQUFJM1AsWUFBSixDQUFpQixHQUFqQixFQUFzQixLQUF0QjtBQUNBMlAsTUFBSTNQLFlBQUosQ0FBaUIsR0FBakIsRUFBc0IsS0FBdEI7QUFDQTJQLE1BQUkzUCxZQUFKLENBQWlCLE9BQWpCLEVBQTBCLFdBQTFCO0FBQ0EyUCxNQUFJM1AsWUFBSixDQUFpQixRQUFqQixFQUEyQixXQUEzQjtBQUNBMlAsTUFBSTNQLFlBQUosQ0FBaUIsU0FBakIsRUFBNEIscUJBQTVCO0FBQ0EyUCxNQUFJM1AsWUFBSixDQUFpQixPQUFqQixFQUEwQiw0Q0FBMUI7QUFDQTJQLE1BQUkzUCxZQUFKLENBQWlCLFdBQWpCLEVBQThCLFVBQTlCOztBQUVBOFAsT0FBSzlQLFlBQUwsQ0FBa0IsR0FBbEIsRUFBdUIsMHBEQUF2Qjs7QUFFQTZQLElBQUU1UCxXQUFGLENBQWM2UCxJQUFkO0FBQ0FILE1BQUkxUCxXQUFKLENBQWdCNFAsQ0FBaEI7O0FBRUEsU0FBT0YsR0FBUDtBQUNBOztBQUVELEtBQUlJLGFBQWEsS0FBakI7O0FBRUEsS0FBSUMsa0JBQWtCO0FBQ3JCQyxtQkFBaUIsS0FESTtBQUVyQkMsY0FBWSxDQUFDLFVBQUQsRUFBYSxVQUFiLEVBQXlCLFFBQXpCLEVBQW1DLFlBQW5DLEVBQWlELE1BQWpEO0FBRlMsRUFBdEI7O0FBaHFENkIsS0FxcUR2QnBTLFNBcnFEdUIsR0F1cUQ1QixtQkFBWWlHLFFBQVosRUFDQTtBQUFBOztBQUNDZCxtQkFBaUJrTixTQUFqQjs7QUFFQSxNQUFHLFFBQU9wTSxRQUFQLHlDQUFPQSxRQUFQLE1BQW1CLFFBQXRCLEVBQWdDO0FBQy9CLFNBQU0sSUFBSWhHLDBCQUFKLEVBQU47QUFDQTs7QUFFRCxPQUFLK0YsU0FBTCxHQUFpQixJQUFJekIsU0FBSixFQUFqQjtBQUNBLE9BQUswQixRQUFMLEdBQWdCMUMsT0FBTzJDLE1BQVAsQ0FBY2dNLGVBQWQsRUFBK0JqTSxRQUEvQixDQUFoQjs7QUFFQXFNLDZCQUEyQi9RLElBQTNCLENBQWdDLElBQWhDLEVBQXNDMEUsU0FBU21NLFVBQS9DOztBQUVBSCxlQUFhLElBQWI7O0FBRUEsU0FBTyxJQUFJTSxLQUFKLENBQVUsSUFBVixFQUFnQjtBQUN0QnBDLFFBQUssYUFBU3FDLE1BQVQsRUFBaUJwTyxNQUFqQixFQUF5QjtBQUM3QixRQUFHLENBQUViLE9BQU95RyxRQUFQLENBQWdCNUYsTUFBaEIsRUFBd0I2QixTQUFTbU0sVUFBakMsQ0FBTCxFQUFtRDtBQUNsRCxXQUFNLElBQUlsTiwrQkFBSixFQUFOO0FBQ0E7O0FBRUQsV0FBT3NOLE9BQU94TSxTQUFQLENBQWlCeU0sSUFBakIsQ0FBc0JyTyxNQUF0QixDQUFQO0FBQ0E7QUFQcUIsR0FBaEIsQ0FBUDtBQVNBLEVBL3JEMkI7O0FBa3NEN0I7Ozs7O0FBR0EsVUFBU2tPLDBCQUFULENBQW9DRixVQUFwQyxFQUFnRDtBQUMvQyxPQUFLcE0sU0FBTCxDQUFldEIsSUFBZixDQUFvQixRQUFwQixFQUE4QixVQUFTc0IsU0FBVCxFQUFvQjtBQUNqREEsYUFBVSxRQUFWLEVBQW9CdUIsTUFBcEIsR0FBNkIsSUFBN0I7QUFDQSxVQUFPLElBQUl4QixNQUFKLENBQVdDLFNBQVgsQ0FBUDtBQUNBLEdBSEQ7O0FBS0EsT0FBS0EsU0FBTCxDQUFldEIsSUFBZixDQUFvQixVQUFwQixFQUFnQyxVQUFTc0IsU0FBVCxFQUFvQjtBQUNuREEsYUFBVSxVQUFWLEVBQXNCdUIsTUFBdEIsR0FBK0IsSUFBL0I7QUFDQSxVQUFPLElBQUlxRCxRQUFKLENBQWE1RSxTQUFiLENBQVA7QUFDQSxHQUhEOztBQUtBLE9BQUtBLFNBQUwsQ0FBZXRCLElBQWYsQ0FBb0IsVUFBcEIsRUFBZ0MsVUFBU3NCLFNBQVQsRUFBb0I7QUFDbkRBLGFBQVUsVUFBVixFQUFzQnVCLE1BQXRCLEdBQStCLElBQS9CO0FBQ0EsVUFBTyxJQUFJSixRQUFKLENBQWFuQixTQUFiLENBQVA7QUFDQSxHQUhEOztBQUtBLE9BQUtBLFNBQUwsQ0FBZXRCLElBQWYsQ0FBb0IsWUFBcEIsRUFBa0MsVUFBU3NCLFNBQVQsRUFBb0I7QUFDckRBLGFBQVUsWUFBVixFQUF3QnVCLE1BQXhCLEdBQWlDLElBQWpDO0FBQ0EsVUFBTyxJQUFJRCxVQUFKLENBQWV0QixTQUFmLEVBQTBCQSxVQUFVeU0sSUFBVixDQUFlLFVBQWYsQ0FBMUIsQ0FBUDtBQUNBLEdBSEQ7O0FBS0EsT0FBS3pNLFNBQUwsQ0FBZXRCLElBQWYsQ0FBb0IsTUFBcEIsRUFBNEIsVUFBU3NCLFNBQVQsRUFBb0I7QUFDL0NBLGFBQVUsTUFBVixFQUFrQnVCLE1BQWxCLEdBQTJCLElBQTNCO0FBQ0EsVUFBTyxJQUFJc0ksSUFBSixDQUFTN0osU0FBVCxDQUFQO0FBQ0EsR0FIRDs7QUFLQSxPQUFLQSxTQUFMLENBQWUsUUFBZixFQUF5QixRQUF6QixJQUFxQyxLQUFyQztBQUNBLE9BQUtBLFNBQUwsQ0FBZSxVQUFmLEVBQTJCLFFBQTNCLElBQXVDLEtBQXZDO0FBQ0EsT0FBS0EsU0FBTCxDQUFlLFVBQWYsRUFBMkIsUUFBM0IsSUFBdUMsS0FBdkM7QUFDQSxPQUFLQSxTQUFMLENBQWUsWUFBZixFQUE2QixRQUE3QixJQUF5QyxLQUF6QztBQUNBLE9BQUtBLFNBQUwsQ0FBZSxNQUFmLEVBQXVCLFFBQXZCLElBQW1DLEtBQW5DO0FBQ0E7O0FBRUQsUUFBT2hHLFNBQVA7QUFFQyxDQXh1RGdCLEVBQWpCIiwiZmlsZSI6ImVDb21tZXJjZS5qcyIsInNvdXJjZXNDb250ZW50IjpbInZhciBlQ29tbWVyY2UgPSAoZnVuY3Rpb24gKCkge1xuJ3VzZSBzdHJpY3QnO1xuXG5jbGFzcyBJbnZhbGlkQXJndW1lbnRFeGNlcHRpb24kMSBleHRlbmRzIEVycm9yXHJcbntcclxuXHRjb25zdHJ1Y3RvcigpIFxyXG5cdHsgXHJcbiAgICBcdHN1cGVyKCk7XHJcbiAgICBcdGNvbnNvbGUuZXJyb3IoYEludmFsaWRBcmd1bWVudEV4Y2VwdGlvbiwgYW4gaW52YWxpZCBhcmd1bWVudCB3YXMgcGFzc2VkLmApO1xyXG4gICAgfVxyXG59XG5cbmNsYXNzIERPTVxyXG57XHJcblx0LyoqXHJcblx0ICogTWluaWZpZXMgdGhlIGNzcyB0ZXh0LlxyXG5cdCAqL1xyXG5cdHN0YXRpYyBtaW5pZnlDc3Moc3RyaW5nKSBcclxuXHR7XHJcblx0ICAgIHN0cmluZyA9IHN0cmluZy5yZXBsYWNlKC9cXC9cXCooPzooPyFcXCpcXC8pW1xcc1xcU10pKlxcKlxcL3xbXFxyXFxuXFx0XSsvZywgJycpO1xyXG5cdCAgICBzdHJpbmcgPSBzdHJpbmcucmVwbGFjZSgvIHsyLH0vZywgJyAnKTtcclxuXHQgICAgc3RyaW5nID0gc3RyaW5nLnJlcGxhY2UoLyhbezp9XSkvZywgJyQxJyk7XHJcblx0ICAgIHN0cmluZyA9IHN0cmluZy5yZXBsYWNlKC8oWzssXSkgL2csICckMScpO1xyXG5cdCAgICBzdHJpbmcgPSBzdHJpbmcucmVwbGFjZSgvICEvZywgJyEnKTtcclxuXHQgICAgXHJcblx0ICAgIHJldHVybiBzdHJpbmc7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBTd2l0Y2hlcyBiZXR3ZWVuIHR3byBnaXZlbiBjbGFzc2VzLlxyXG5cdCAqL1xyXG5cdHN0YXRpYyBzd2l0Y2hDbGFzc2VzKGVsZW1lbnQsIGNsYXNzTmFtZSwgbmV3Q2xhc3NOYW1lKSBcclxuXHR7XHJcblx0XHR0aGlzLnJlbW92ZUNsYXNzKGVsZW1lbnQsIGNsYXNzTmFtZSk7XHJcblx0XHR0aGlzLmFkZENsYXNzKGVsZW1lbnQsIG5ld0NsYXNzTmFtZSk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBBZGRzIGNsYXNzIHRvIGEgZ2l2ZW4gZWxlbWVudC5cclxuXHQgKi9cclxuXHRzdGF0aWMgYWRkQ2xhc3MoZWxlbWVudCwgY2xhc3NOYW1lKSBcclxuXHR7XHJcblx0XHRpZihlbGVtZW50ID09PSBudWxsKSB7XHJcblx0XHRcdHRocm93IG5ldyBJbnZhbGlkQXJndW1lbnRFeGNlcHRpb24kMTtcclxuXHRcdH1cclxuXHJcblx0XHRpZighIGNsYXNzTmFtZSB8fCBjbGFzc05hbWUgPT0gJycgfHwgdHlwZW9mIGNsYXNzTmFtZSA9PT0gdW5kZWZpbmVkKSB7XHJcblx0XHRcdHJldHVybiBlbGVtZW50O1xyXG5cdFx0fVxyXG5cclxuXHRcdGxldCBjbGFzc05hbWVzID0gY2xhc3NOYW1lLnNwbGl0KCcgJyk7XHJcblxyXG5cdFx0Y2xhc3NOYW1lcy5mb3JFYWNoKGZ1bmN0aW9uKG5hbWUpIHtcclxuXHRcdFx0ZWxlbWVudC5jbGFzc0xpc3QuYWRkKG5hbWUpO1xyXG5cdFx0fSk7XHJcblx0XHRcclxuXHRcdHJldHVybiBlbGVtZW50O1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogUmVtb3ZlcyBjbGFzcyBmcm9tIGEgZ2l2ZW4gZWxlbWVudC5cclxuXHQgKi9cclxuXHRzdGF0aWMgcmVtb3ZlQ2xhc3MoZWxlbWVudCwgY2xhc3NOYW1lKSBcclxuXHR7XHJcblx0XHRpZihlbGVtZW50ID09IG51bGwpIHtcclxuXHRcdFx0dGhyb3cgbmV3IEludmFsaWRBcmd1bWVudEV4Y2VwdGlvbiQxO1xyXG5cdFx0fVxyXG5cclxuXHRcdGlmKGNsYXNzTmFtZSA9PSAnJykge1xyXG5cdFx0XHRlbGVtZW50LmNsYXNzTmFtZSA9ICcnO1xyXG5cdFx0fSBlbHNlIHtcclxuXHJcblx0XHRcdGxldCBjbGFzc05hbWVzID0gY2xhc3NOYW1lLnNwbGl0KCcgJyk7XHJcblxyXG5cdFx0XHRjbGFzc05hbWVzLmZvckVhY2goZnVuY3Rpb24obmFtZSkge1xyXG5cdFx0XHRcdGVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShuYW1lKTtcclxuXHRcdFx0fSk7XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIGVsZW1lbnQ7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBRdWVyaWVzIHRoZSBlbGVtZW50IGZyb20gdGhlIERPTS5cclxuXHQgKi9cclxuXHRzdGF0aWMgZWxlbWVudChzZWxlY3RvcikgXHJcblx0e1xyXG5cdFx0cmV0dXJuIHF1ZXJ5RWxlbWVudC5jYWxsKHRoaXMsIGRvY3VtZW50LCBzZWxlY3Rvcik7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBBZGRzIHN0eWxlIHRhZyB3aXRoIGdpdmVuIGlkIGFuZCBjc3MgdG8gdGhlIERPTS5cclxuXHQgKi9cclxuXHRzdGF0aWMgYWRkU3R5bGUoaWQsIGNzcykgXHJcblx0e1xyXG5cdFx0aWYodHlwZW9mIGNzcyAhPSAnc3RyaW5nJykge1xyXG5cdFx0XHR0aHJvdyBuZXcgSW52YWxpZEFyZ3VtZW50RXhjZXB0aW9uJDE7XHJcblx0XHR9XHJcblxyXG5cdFx0bGV0IGhlYWQgPSBkb2N1bWVudC5oZWFkIHx8IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdoZWFkJylbMF07XHJcblx0XHRsZXQgc3R5bGVUYWcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzdHlsZScpO1xyXG5cclxuXHRcdC8vIHBpcGUgaXQgdGhyb3VnaCB0aGUgbWluZmllclxyXG5cdCAgICBsZXQgQ1NTID0gdGhpcy5taW5pZnlDc3MoY3NzKTtcclxuXHQgICAgLy8gYWRkaW5nIGl0IHRvIHRoZSBzdHlsZXRhZ1xyXG5cdCAgICBzdHlsZVRhZy5pbm5lckhUTUwgPSBDU1M7XHJcblx0ICAgIC8vIGdpdmUgYW4gaWQgdG8gcmVjb2duaXplIHRoZSBzdHlsZSB0YWdcclxuXHRcdHN0eWxlVGFnLnNldEF0dHJpYnV0ZSgnaWQnLCBpZCk7XHJcblx0XHQvLyBhcHBlbmRpbmcgdGhhdCBzdHlsZSB0YWcgdG8gdGhlIERPTSBoZWFkIHRhZ1xyXG5cdFx0aGVhZC5hcHBlbmRDaGlsZChzdHlsZVRhZyk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBDcmVhdGVzIGFuIGVsZW1lbnQgd2l0aCB0aGUgZ2l2ZW4gb3B0aW9ucy5cclxuXHQgKi9cclxuXHRzdGF0aWMgY3JlYXRlRWxlbWVudChlbGVtZW50VHlwZSwgb3B0aW9ucylcclxuXHR7XHJcblx0XHRsZXQgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoZWxlbWVudFR5cGUpO1xyXG5cdFxyXG5cdFx0aWYgKG9wdGlvbnMgPT09IHVuZGVmaW5lZCkge1xyXG5cdFx0XHRyZXR1cm4gZWxlbWVudDtcclxuXHRcdH1cclxuXHJcblx0XHRmb3IgKGxldCBvcHRpb24gaW4gb3B0aW9ucykge1xyXG5cdFx0XHRpZihvcHRpb24gPT0gJ3RleHQnKSB7XHJcblx0XHRcdFx0ZWxlbWVudC5pbm5lckhUTUwgPSBvcHRpb25zW29wdGlvbl07XHJcblx0XHRcdFx0Y29udGludWU7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGVsZW1lbnQuc2V0QXR0cmlidXRlKG9wdGlvbiwgb3B0aW9uc1tvcHRpb25dKTtcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gZWxlbWVudDtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFRvZ2dsZXMgdGhlIGdpdmVuIGNsYXNzZXMuXHJcblx0ICovXHJcblx0c3RhdGljIHRvZ2dsZUNsYXNzKGVsZW1lbnQsIGNsYXNzTmFtZSwgc2Vjb25kQ2xhc3NOYW1lKVxyXG5cdHtcclxuXHRcdGlmKGVsZW1lbnQgPT0gbnVsbCB8fCB0eXBlb2YgZWxlbWVudCA9PSAndW5kZWZpbmVkJykge1xyXG5cdFx0XHR0aHJvdyBuZXcgSW52YWxpZEFyZ3VtZW50RXhjZXB0aW9uJDE7XHJcblx0XHR9XHJcblxyXG5cdFx0c2Vjb25kQ2xhc3NOYW1lID0gc2Vjb25kQ2xhc3NOYW1lIHx8IHVuZGVmaW5lZDtcclxuXHJcblx0XHRpZihzZWNvbmRDbGFzc05hbWUpIHtcclxuXHRcdFx0ZWxlbWVudC5jbGFzc0xpc3QudG9nZ2xlKHNlY29uZENsYXNzTmFtZSk7XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIGVsZW1lbnQuY2xhc3NMaXN0LnRvZ2dsZShjbGFzc05hbWUpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogRmluZHMgYW4gZWxlbWVudCBpbnNpZGUgb2YgcGFyZW50LlxyXG5cdCAqL1xyXG5cdHN0YXRpYyBmaW5kKGVsZW1lbnQsIHNlbGVjdG9yKSBcclxuXHR7XHJcblx0XHRyZXR1cm4gcXVlcnlFbGVtZW50KGVsZW1lbnQsIHNlbGVjdG9yKTtcclxuXHR9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBRdWVyaWVzIGFuIGVsZW1lbnQgZnJvbSB0aGUgRE9NLlxyXG4gKi9cclxuZnVuY3Rpb24gcXVlcnlFbGVtZW50KHBhcmVudCwgc2VsZWN0b3IpIHtcclxuXHRsZXQgZWxlbWVudCA9IHBhcmVudC5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9yKTtcclxuXHJcblx0aWYoZWxlbWVudC5sZW5ndGggPT0gMCkge1xyXG5cdFx0cmV0dXJuIG51bGw7XHJcblx0fVxyXG5cclxuXHRyZXR1cm4gKGVsZW1lbnQubGVuZ3RoID4gMSkgPyBlbGVtZW50IDogZWxlbWVudFswXTtcclxufVxyXG5cclxuLyoqXHJcbiAqIENoZWNrcyBpZiBwYXJlbnQgaGFzIGNoaWxkLlxyXG4gKi9cclxuZnVuY3Rpb24gaGFzQ2hpbGQocGFyZW50LCBjaGlsZCkge1xyXG4gICAgIGxldCBub2RlID0gY2hpbGQucGFyZW50Tm9kZTtcclxuICAgICBcclxuICAgICB3aGlsZSAobm9kZSAhPSBudWxsKSB7XHJcbiAgICAgICAgIGlmIChub2RlID09IHBhcmVudCkge1xyXG4gICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgIH1cclxuICAgICAgICAgbm9kZSA9IG5vZGUucGFyZW50Tm9kZTtcclxuICAgICB9XHJcbiAgICAgXHJcbiAgICAgcmV0dXJuIGZhbHNlO1xyXG59XG5cbmxldCBldmVudHMgPSBbXTtcclxuXHJcbmNsYXNzIEV2ZW50XHJcbntcclxuXHQvKipcclxuXHQgKiBMaXN0ZW4gdG8gYW4gZXZlbnQuXHJcblx0ICovXHJcblx0c3RhdGljIGxpc3RlbihuYW1lLCBjYWxsYmFjaykge1xyXG5cdFx0aWYgKHR5cGVvZiBjYWxsYmFjayAhPT0gJ2Z1bmN0aW9uJykge1xyXG5cdFx0XHR0aHJvdyBuZXcgSW52YWxpZEFyZ3VtZW50RXhjZXB0aW9uO1xyXG5cdFx0fVxyXG5cclxuXHRcdGlmICh0eXBlb2YgZXZlbnRzW25hbWVdID09ICd1bmRlZmluZWQnKSB7XHJcblx0XHRcdGV2ZW50c1tuYW1lXSA9IFtdO1xyXG5cdFx0fVxyXG5cclxuXHRcdGV2ZW50c1tuYW1lXS5wdXNoKGNhbGxiYWNrKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEZpcmVzIGFuIGV2ZW50LlxyXG5cdCAqL1xyXG5cdHN0YXRpYyB0cmlnZ2VyKG5hbWUsIC4uLmRhdGEpIHtcclxuXHRcdGRhdGEgPSBkYXRhIHx8IG51bGw7XHJcblxyXG5cdFx0ZXZlbnRzW25hbWVdLmZvckVhY2goZnVuY3Rpb24oY2FsbGJhY2spIHtcclxuXHRcdFx0aWYodHlwZW9mIGNhbGxiYWNrICE9PSAnZnVuY3Rpb24nKSB7XHJcblx0XHRcdFx0dGhyb3cgbmV3IEJhZEV2ZW50Q2FsbEV4Y2VwdGlvbjtcclxuXHRcdFx0fVxyXG5cdFx0XHRcclxuXHRcdFx0cmV0dXJuIGNhbGxiYWNrKC4uLmRhdGEpO1xyXG5cdFx0fSk7XHJcblx0fVxyXG59XG5cbmNsYXNzIENvbW1vblxyXG57XHJcblx0LyoqXHJcblx0ICogRXh0ZW5kIGFuIG9iamVjdC5cclxuXHQgKi9cclxuXHRzdGF0aWMgZXh0ZW5kKGN1cnJlbnRPYmosIG5ld09iaiApIHtcclxuXHRcdHZhciBleHRlbmRlZCA9IHt9O1xyXG5cdCAgICB2YXIgcHJvcDtcclxuXHJcblx0ICAgIGZvciAocHJvcCBpbiBjdXJyZW50T2JqKSB7XHJcblx0ICAgICAgICBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGN1cnJlbnRPYmosIHByb3ApKSB7XHJcblx0ICAgICAgICAgICAgZXh0ZW5kZWRbcHJvcF0gPSBjdXJyZW50T2JqW3Byb3BdO1xyXG5cdCAgICAgICAgfVxyXG5cdCAgICB9XHJcblxyXG5cdCAgICBmb3IgKHByb3AgaW4gbmV3T2JqKSB7XHJcblx0ICAgICAgICBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG5ld09iaiwgcHJvcCkpIHtcclxuXHQgICAgICAgICAgICBleHRlbmRlZFtwcm9wXSA9IG5ld09ialtwcm9wXTtcclxuXHQgICAgICAgIH1cclxuXHQgICAgfVxyXG5cclxuXHQgICAgcmV0dXJuIGV4dGVuZGVkO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQ2hlY2tzIGZvciBhIG5lZWRsZSBpbiBoeXN0YWNrLlxyXG5cdCAqL1xyXG5cdHN0YXRpYyBpbl9hcnJheShuZWVkbGUsIGh5c3RhY2spIHtcclxuXHRcdGlmKGh5c3RhY2suY29uc3RydWN0b3IgIT09IEFycmF5KSByZXR1cm47XHJcblxyXG5cdFx0Zm9yKHZhciBpID0gMDsgaSA8PSBoeXN0YWNrLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdGlmKG5lZWRsZSA9PSBoeXN0YWNrW2ldKSByZXR1cm4gdHJ1ZTtcdFxyXG5cdFx0fVxyXG5cdFxyXG5cdFx0cmV0dXJuIGZhbHNlO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQ2hlY2tzIGlmIGFuIG9iamVjdCBpcyBlbXB0eS5cclxuXHQgKi9cclxuXHRzdGF0aWMgZW1wdHlPYmplY3Qob2JqZWN0KSB7XHJcblx0XHRmb3IodmFyIHByb3AgaW4gb2JqZWN0KSB7XHJcblx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gdHJ1ZTtcclxuXHR9XHJcblxyXG5cdHN0YXRpYyBjb250YWluc09iamVjdChvYmplY3QsIGh5c3RhY2spIFxyXG5cdHtcclxuXHQgICAgdmFyIGk7XHJcblxyXG5cdCAgICBmb3IgKGkgPSAwOyBpIDwgaHlzdGFjay5sZW5ndGg7IGkrKykge1xyXG5cdCAgICAgICAgaWYgKHR5cGVvZiBvYmplY3QgPT0gJ3N0cmluZycgJiYgaHlzdGFja1tpXS5jb25zdHJ1Y3Rvci5uYW1lID09PSBvYmplY3QpIHtcclxuXHQgICAgICAgIFx0cmV0dXJuIHRydWU7XHJcblx0ICAgICAgICB9XHJcblxyXG5cdCAgICAgICAgaWYgKGh5c3RhY2tbaV0gPT09IG9iamVjdCkge1xyXG5cdCAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG5cdCAgICAgICAgfVxyXG5cdCAgICB9XHJcblxyXG5cdCAgICByZXR1cm4gZmFsc2U7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBDaGVja3MgaWYgYSBnaXZlbiBwYXJhbWV0ZXIgaXMgYW4gb2JqZWN0LlxyXG5cdCAqL1xyXG5cdHN0YXRpYyBpc09iamVjdChvYmplY3QpIFxyXG5cdHtcclxuXHRcdHJldHVybiB0eXBlb2Ygb2JqZWN0ID09ICdvYmplY3QnO1xyXG5cdH1cclxufVxuXG5jbGFzcyBJbnZhbGlkQmluZGluZ0V4Y2VwdGlvbiBleHRlbmRzIEVycm9yXHJcbntcclxuXHRjb25zdHJ1Y3RvcigpIFxyXG5cdHsgXHJcbiAgICBcdHN1cGVyKCk7XHJcbiAgICBcdGNvbnNvbGUuZXJyb3IoYEludmFsaWRCaW5kaW5nRXhjZXB0aW9uLCB0cnlpbmcgdG8gYmluZCBhbiBhbHJlYWR5IGV4aXN0aW5nIGJvdW5kLmApO1xyXG4gICAgfVxyXG59XG5cbmxldCBpbnN0YW5jZXMgPSBbXTtcclxuXHJcbmNsYXNzIENvbnRhaW5lciBcclxue1xyXG5cdC8qKlxyXG5cdCAqIEJpbmRzIGtleSB0byBjb25jcmV0ZSBjbGFzcy5cclxuXHQgKi9cclxuXHRiaW5kKGtleSwgY29uY3JldGUpIFxyXG5cdHtcclxuXHRcdGlmICh0eXBlb2Yga2V5ICE9ICdzdHJpbmcnIHx8IHR5cGVvZiBjb25jcmV0ZSAhPSAnZnVuY3Rpb24nKSB7XHJcblx0XHRcdHRocm93IG5ldyBJbnZhbGlkQXJndW1lbnRFeGNlcHRpb24kMTtcclxuXHRcdH1cclxuXHJcblx0XHRpZiAodHlwZW9mIHRoaXNba2V5XSAhPSAndW5kZWZpbmVkJykge1xyXG5cdFx0XHR0aHJvdyBuZXcgSW52YWxpZEJpbmRpbmdFeGNlcHRpb247XHJcblx0XHR9XHJcblxyXG5cdFx0dGhpc1trZXldID0gY29uY3JldGUuYmluZChjb25jcmV0ZSwgdGhpcyk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBTZXRzIGFuIGluc3RhbmNlLlxyXG5cdCAqL1xyXG5cdHNldEluc3RhbmNlKGtleSwgaW5zdGFuY2UpIFxyXG5cdHtcclxuXHRcdGlmKHR5cGVvZiBrZXkgIT0gJ3N0cmluZycgfHwgdHlwZW9mIGluc3RhbmNlICE9ICdvYmplY3QnKSB7XHJcblx0XHRcdHRocm93IG5ldyBJbnZhbGlkQXJndW1lbnRFeGNlcHRpb24kMTtcclxuXHRcdH1cclxuXHJcblx0XHRpbnN0YW5jZXNba2V5XSA9IGluc3RhbmNlO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogR2V0cyBhbiBpbnN0YW5jZS5cclxuXHQgKi9cclxuXHRnZXRJbnN0YW5jZShrZXkpIFxyXG5cdHtcclxuXHRcdGlmKHR5cGVvZiBrZXkgIT0gJ3N0cmluZycpIHtcclxuXHRcdFx0dGhyb3cgbmV3IEludmFsaWRBcmd1bWVudEV4Y2VwdGlvbiQxO1xyXG5cdFx0fVxyXG5cclxuXHRcdGlmKHR5cGVvZiBrZXkgPT0gJ29iamVjdCcpIHtcclxuXHRcdFx0cmV0dXJuIGluc3RhbmNlc1trZXkuY29uc3RydWN0b3IubmFtZV0gfHwgbnVsbDtcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gaW5zdGFuY2VzW2tleV0gfHwgbnVsbDtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIENoZWNrcyBpZiBhbiBpbnN0YW5jZSBleGlzdC5cclxuXHQgKi9cclxuXHRpbnN0YW5jZUV4aXN0KGluc3RhbmNlKSBcclxuXHR7XHJcblx0XHRpZih0eXBlb2YgaW5zdGFuY2UgPT0gJ29iamVjdCcpIHtcclxuXHRcdFx0cmV0dXJuICh0eXBlb2YgaW5zdGFuY2VzW2luc3RhbmNlLmNvbnN0cnVjdG9yLm5hbWVdICE9PSAndW5kZWZpbmVkJyk7XHJcblx0XHR9XHJcblx0XHRcclxuXHRcdFxyXG5cdFx0cmV0dXJuIChpbnN0YW5jZSBpbiBpbnN0YW5jZXMpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQ3JlYXRlcyBhbiBpbnN0YW5jZS5cclxuXHQgKi9cclxuXHRtYWtlKG9iamVjdClcclxuXHR7XHJcblx0XHRsZXQgaW5zdGFuY2UgPSB7fTtcclxuXHJcblx0XHRpZiAodGhpcy5pbnN0YW5jZUV4aXN0KG9iamVjdCkpIHtcclxuXHRcdFx0cmV0dXJuIHRoaXMuZ2V0SW5zdGFuY2Uob2JqZWN0KTtcclxuXHRcdH1cclxuXHJcblx0XHRpZiAodHlwZW9mIG9iamVjdCA9PSAnb2JqZWN0Jykge1xyXG5cdFx0XHRpbnN0YW5jZSA9IG9iamVjdDtcclxuXHRcdH0gZWxzZSBpZih0eXBlb2Ygb2JqZWN0ID09ICdzdHJpbmcnICYmIHRoaXMuaGFzT3duUHJvcGVydHkob2JqZWN0KSkge1xyXG5cdFx0XHRpbnN0YW5jZSA9IG5ldyB0aGlzW29iamVjdF07XHRcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdHRocm93IG5ldyBJbnZhbGlkQmluZGluZ0V4Y2VwdGlvbjtcclxuXHRcdH1cclxuXHJcblx0XHR0aGlzLnNldEluc3RhbmNlKG9iamVjdCwgaW5zdGFuY2UpOyBcclxuXHJcblx0XHRyZXR1cm4gaW5zdGFuY2U7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBSZXRyaWV2ZSBhbGwgaW5zdGFuY2VzLlxyXG5cdCAqL1xyXG5cdGluc3RhbmNlcygpIFxyXG5cdHtcclxuXHRcdHJldHVybiBpbnN0YW5jZXM7XHJcblx0fVxyXG59XG5cbmNsYXNzIENvbXBvbmVudHNFeGNlcHRpb24gZXh0ZW5kcyBFcnJvclxyXG57XHJcblx0Y29uc3RydWN0b3IoKSBcclxuXHR7IFxyXG4gICAgXHRzdXBlcigpO1xyXG4gICAgXHRjb25zb2xlLmVycm9yKGBDb21wb25lbnRzRXhjZXB0aW9uLCBleHBlY3RpbmcgZm9yIGF0IGxlYXN0IG9uZSBjb21wb25lbnRzLCBidXQgbm9uZSB3YXMgZ2l2ZW4sIFxyXG5cdFx0XHRcdFx0XHRcdFx0cGxlYXNlIGFkZCBhdCBsZWFzdCBvbmUgcmVxdWlyZW1lbnQoUHJvZHVjdHMsIFNlcnZpY2VzIG9yL2FuZCBGaWx0ZXIuYCk7XHJcbiAgICB9XHJcbn1cblxuY2xhc3MgQmFkRXZlbnRDYWxsRXhjZXB0aW9uJDEgZXh0ZW5kcyBFcnJvclxyXG57XHJcblx0Y29uc3RydWN0b3IoKSBcclxuXHR7IFxyXG5cdFx0c3VwZXIoKTtcclxuICAgIFx0Y29uc29sZS5lcnJvcihgQmFkRXZlbnRDYWxsRXhjZXB0aW9uLCBsaXN0ZW5pbmcgdG8gYSBub25lLWV4aXN0aW5nIGV2ZW50LmApO1xyXG4gICAgfVxyXG59XG5cbmNsYXNzIE5vdEluUGFnZVJhbmdlRXhjZXB0aW9uIGV4dGVuZHMgRXJyb3Jcclxue1xyXG5cdGNvbnN0cnVjdG9yKCkgXHJcblx0eyBcclxuICAgIFx0c3VwZXIoKTtcclxuICAgIFx0Y29uc29sZS5lcnJvcihgTm90SW5QYWdlUmFuZ2VFeGNlcHRpb24sIHNvcnJ5LCBubyBtb3JlIHBhZ2VzLmApO1xyXG4gICAgfVxyXG59XG5cbmNsYXNzIENvbXBvbmVudE5vdFJlZ2lzdGVyZWRFeGNlcHRpb24gZXh0ZW5kcyBFcnJvclxyXG57XHJcblx0Y29uc3RydWN0b3IoKSBcclxuXHR7IFxyXG4gICAgXHRzdXBlcigpO1xyXG4gICAgXHRjb25zb2xlLmVycm9yKGBDb21wb25lbnROb3RSZWdpc3RlcmVkRXhjZXB0aW9uLCBjb21wb25lbnRzIG11c3QgYmUgcmVnaXN0ZXJlZCBpbiBvcmRlciB0byB1c2UgdGhlbS5gKTtcclxuICAgIH1cclxufVxuXG5jbGFzcyBFeGNlcHRpb25IYW5kbGVyIGV4dGVuZHMgRXJyb3Jcclxue1xyXG5cdC8qKlxyXG5cdCAqIEhhbmRsZSBhbGwgdGhlIGVycm9yc1xyXG5cdCAqL1xyXG5cdHN0YXRpYyBpbml0YWxpemUoKSB7XHRcclxuXHRcdHdpbmRvdy5vbmVycm9yID0gZnVuY3Rpb24obWVzc2FnZSwgc291cmNlLCBsaW5lbm8sIGNvbG5vLCBlcnJvcikge1xyXG5cdFx0XHRcclxuXHRcdFx0aWYgKGVycm9yIGluc3RhbmNlb2YgSW52YWxpZEFyZ3VtZW50RXhjZXB0aW9uJDEpIHtcclxuXHRcdFx0XHQvLyBoYW5kbGVcclxuXHRcdFx0fSBlbHNlIGlmIChlcnJvciBpbnN0YW5jZW9mIEludmFsaWRCaW5kaW5nRXhjZXB0aW9uKSB7XHJcblx0XHRcdFx0Ly8gaGFuZGxlXHJcblx0XHRcdH0gZWxzZSBpZiAoZXJyb3IgaW5zdGFuY2VvZiBCYWRFdmVudENhbGxFeGNlcHRpb24kMSkge1xyXG5cdFx0XHRcdC8vIGhhbmRsZVxyXG5cdFx0XHR9IGVsc2UgaWYgKGVycm9yIGluc3RhbmNlb2YgQ29tcG9uZW50c0V4Y2VwdGlvbikge1xyXG5cdFx0XHRcdC8vIGhhbmRsZVxyXG5cdFx0XHR9IGVsc2UgaWYgKGVycm9yIGluc3RhbmNlb2YgQ29tcG9uZW50Tm90UmVnaXN0ZXJlZEV4Y2VwdGlvbikge1xyXG5cdFx0XHRcdC8vIGhhbmRsZVxyXG5cdFx0XHR9IGVsc2UgaWYgKGVycm9yIGluc3RhbmNlb2YgTm90SW5QYWdlUmFuZ2VFeGNlcHRpb24pIHtcclxuXHRcdFx0XHQvLyBoYW5kbGUgXHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRyZXR1cm4gdHJ1ZTtcclxuXHRcdH07XHJcblx0fVxyXG59XG5cbi8qKlxyXG4gKiBUaGUgZGVmYXVsdCBzZXR0aW5ncyBvZiB0aGUgZmlsdGVyLlxyXG4gKi9cclxubGV0IGRlZmF1bHRTZXR0aW5ncyQxID0ge1xyXG5cdGVsZW1lbnQ6ICcuZmlsdGVyJyxcclxuXHRkYXRhOiB7fSxcclxuXHRjbGFzczogJycsXHJcblx0d2lkdGg6ICcnLFxyXG5cdGhlaWdodDogJycsXHJcbn07XHJcblxyXG4vKipcclxuICogU3RvcmVzIHRoZSBjb250YWluZXIgb2JqZWN0LlxyXG4gKi9cclxubGV0IENvbnRhaW5lciQyO1xyXG5cclxuLyoqXHJcbiAqIFRoZSBGaWx0ZXIgT2JqZWN0LCBoYW5kbGVzIHRoZSBmaWx0ZXIgb2YgdGhlIHByb2R1Y3RzL3NlcnZpY2VzLlxyXG4gKi9cclxuY2xhc3MgRmlsdGVyIFxyXG57XHJcblx0Y29uc3RydWN0b3IoY29udGFpbmVyKSBcclxuXHR7XHJcblx0XHRDb250YWluZXIkMiA9IGNvbnRhaW5lcjtcclxuXHR9XHJcblxyXG5cdHNldHVwKHNldHRpbmdzKVxyXG5cdHtcclxuXHRcdGlmKHR5cGVvZiBzZXR0aW5ncyAhPSAnb2JqZWN0Jykge1xyXG5cdFx0XHR0aHJvdyBuZXcgSW52YWxpZEFyZ3VtZW50RXhjZXB0aW9uJDE7XHJcblx0XHR9XHJcblxyXG5cdFx0dGhpcy5zZXR0aW5ncyA9IENvbW1vbi5leHRlbmQoZGVmYXVsdFNldHRpbmdzJDEsIHNldHRpbmdzKTtcclxuXHJcblx0XHR0aGlzLnNldEVsZW1lbnQodGhpcy5zZXR0aW5ncy5lbGVtZW50KTtcclxuXHR9XHJcblxyXG5cdHNldEVsZW1lbnQoc2VsZWN0b3IpXHJcblx0e1xyXG5cdFx0dGhpcy53cmFwcGVyID0gRE9NLmVsZW1lbnQoc2VsZWN0b3IpO1xyXG5cdFx0XHJcblx0XHRET00uYWRkQ2xhc3ModGhpcy53cmFwcGVyLCB0aGlzLnNldHRpbmdzLmNsYXNzKTtcclxuXHR9XHJcbn1cblxuY2xhc3MgU3RyXHJcbntcclxuXHJcblx0LyoqXHJcblx0ICogQ29udmVydCBjYW1lbENhc2UgdG8ga2ViYWItY2FzZS5cclxuXHQgKi9cclxuXHRzdGF0aWMga2ViYWJDYXNlKHN0cmluZykgXHJcblx0e1xyXG5cdFx0cmV0dXJuIHN0cmluZy5yZXBsYWNlKC8oW2Etel0pKFtBLVpdKS9nLCAnJDEtJDInKS50b0xvd2VyQ2FzZSgpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogR2VuZXJhdGVzIGEgcmFuZG9tIHN0cmluZy5cclxuXHQgKi9cclxuXHRzdGF0aWMgcmFuZG9tKGxlbmd0aCkgXHJcblx0e1xyXG5cdFx0bGV0IHN0cmluZyA9ICcnO1xyXG5cdFx0bGV0IHBvc3NpYmxlID0gXCJBQkNERUZHSElKS0xNTk9QUVJTVFVWV1hZWmFiY2RlZmdoaWprbG1ub3BxcnN0dXZ3eHl6MDEyMzQ1Njc4OVwiO1xyXG5cclxuXHRcdGZvciAobGV0IGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcclxuXHQgICAgXHRzdHJpbmcgKz0gcG9zc2libGUuY2hhckF0KE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIHBvc3NpYmxlLmxlbmd0aCkpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiBzdHJpbmc7XHJcblx0fVxyXG5cclxufVxuXG4vKipcclxuICogVGhlIGRlZmF1bHQgc2V0dGluZ3Mgb2YgZWFjaCBwcm9kdWN0LlxyXG4gKi9cclxubGV0IGRlZmF1bHRTZXR0aW5ncyQyID0ge1xyXG5cdGVsZW1lbnQ6ICcucHJvZHVjdHMnLFxyXG5cdGNsYXNzOiAnJyxcclxuXHRpdGVtX2NsYXNzOiAnJyxcclxuXHRhZGRfYnV0dG9uX2NsYXNzOiAnYnRuIGJ0bi1wcmltYXJ5JyxcclxuXHRmYXZvcml0ZV9idXR0b25fY2xhc3M6ICdidG4gYnRuLWRhbmdlcicsXHJcblx0d2lkdGg6ICcyMDBweCcsXHJcblx0aGVpZ2h0OiAnMjUwcHgnLFxyXG5cdGF0dHJpYnV0ZXM6IFsnbmFtZScsICdwcmljZScsICdkZWxpdmVyeVRpbWUnLCAnaW1hZ2UnXSxcclxuXHR1cmw6ICdwcm9kdWN0cy5waHAnLFxyXG59O1xyXG5cclxuLyoqXHJcbiAqIFN0b3JlcyB0aGUgY29udGFpbmVyIG9iamVjdC5cclxuICovXHJcbmxldCBDb250YWluZXIkMztcclxuXHJcbi8qKlxyXG4gKiBUaGUgUHJvZHVjdHMgT2JqZWN0LCBoYW5kbGVzIHRoZSBwcm9kdWN0cy5cclxuICovXHJcbmNsYXNzIFByb2R1Y3RzIFxyXG57XHJcblx0LyoqXHJcblx0ICogSW5pdGFsaXplIHRoZSBDb250YWluZXIuXHJcblx0ICovXHJcblx0Y29uc3RydWN0b3IoY29udGFpbmVyKSBcclxuXHR7XHJcblx0XHRDb250YWluZXIkMyA9IGNvbnRhaW5lcjtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFNldHMgdGhlIGdpdmVuIHNldHRpbmdzIGZyb20gdGhlIHVzZXIuXHJcblx0ICovXHJcblx0c2V0dXAoc2V0dGluZ3MpXHJcblx0e1xyXG5cdFx0ZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsIGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRcclxuXHRcdGlmICh0eXBlb2Ygc2V0dGluZ3MgIT0gJ29iamVjdCcpIHtcclxuXHRcdFx0dGhyb3cgbmV3IEludmFsaWRBcmd1bWVudEV4Y2VwdGlvbiQxO1xyXG5cdFx0fVxyXG5cclxuXHRcdHRoaXMuc2V0dGluZ3MgPSBDb21tb24uZXh0ZW5kKGRlZmF1bHRTZXR0aW5ncyQyLCBzZXR0aW5ncyk7XHJcblxyXG5cdFx0dGhpcy5zZXRFbGVtZW50KHRoaXMuc2V0dGluZ3MuZWxlbWVudCk7XHJcblxyXG5cdFx0dGhpcy5hZGRTdHlsZVRhZygpO1x0XHJcblx0XHRcclxuXHRcdGlmIChDb250YWluZXIkMy5QYWdpbmF0aW9uICYmIENvbnRhaW5lciQzLlBhZ2luYXRpb24uYm9vdGVkKSB7XHJcblx0XHRcdGxldCBpbnN0YW5jZSA9IHRoaXM7XHJcblxyXG5cdFx0XHRpbnN0YW5jZS5nZXRQcm9kdWN0c0J5UGFnZSgxKS50aGVuKGZ1bmN0aW9uKHByb2R1Y3RzKSB7XHJcblx0XHRcdFx0aW5zdGFuY2UucmVwbGFjZUl0ZW1zKHByb2R1Y3RzKTtcclxuXHRcdFx0fSk7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHR0aGlzLmxvYWRBbGxQcm9kdWN0cygpO1xyXG5cdFx0fVxyXG5cclxuXHRcdH0uYmluZCh0aGlzKSk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBMb2FkcyB0aGUgcHJvZHVjdHMgYW5kIHJlcGxhY2UgdGhlbSBpbiB0aGUgZGl2IGNvbnRhaW5lci5cclxuXHQgKi9cclxuXHRsb2FkQWxsUHJvZHVjdHMoKVxyXG5cdHtcclxuXHRcdGxldCByZXF1ZXN0ID0gdGhpcy5nZXRQcm9kdWN0cygpO1xyXG5cdFx0XHRcclxuXHRcdHJlcXVlc3QudGhlbihmdW5jdGlvbihpdGVtcykge1xyXG5cdFx0XHRFdmVudC50cmlnZ2VyKCdQcm9kdWN0c1dlcmVGZXRjaGVkJywgaXRlbXMpO1xyXG5cdFx0XHR0aGlzLnJlcGxhY2VJdGVtcyhpdGVtcyk7XHJcblx0XHR9LmJpbmQodGhpcykpLmNhdGNoKGZ1bmN0aW9uKGVycm9yKSB7XHJcblxyXG5cdFx0fSk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBTZXRzIHRoZSBET00gZWxlbWVudCBmb3IgcG9wdWxhdGluZyB0aGUgcHJvZHVjdHMuXHJcblx0ICovXHJcblx0c2V0RWxlbWVudChzZWxlY3RvcilcclxuXHR7XHJcblx0XHR0aGlzLndyYXBwZXIgPSBET00uZWxlbWVudChzZWxlY3Rvcik7XHJcblxyXG5cdFx0aWYgKHRoaXMud3JhcHBlcikge1xyXG5cdFx0XHRET00uYWRkQ2xhc3ModGhpcy53cmFwcGVyLCB0aGlzLnNldHRpbmdzLmNsYXNzKTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFJlcGxhY2UgaXRlbXMgaW4gdGhlIGNvbnRhaW5lci5cclxuXHQgKi9cclxuXHRyZXBsYWNlSXRlbXMoaXRlbXMpIFxyXG5cdHtcclxuXHRcdGlmICghIEFycmF5LmlzQXJyYXkoaXRlbXMpIHx8IChpdGVtcy5sZW5ndGggPD0gMCAmJiB0eXBlb2YgaXRlbXNbMF0gPT0gJ3N0cmluZycpKSB7XHJcblx0XHRcdHRocm93IG5ldyBJbnZhbGlkQXJndW1lbnRFeGNlcHRpb24kMTtcclxuXHRcdH1cclxuXHJcblx0XHRsZXQgcHJvZHVjdHMgPSB0aGlzLmJ1aWxkUHJvZHVjdHMoaXRlbXMsIHRoaXMuc2V0dGluZ3MuaXRlbV9jbGFzcywgJ2RpdicpO1xyXG5cclxuXHRcdHRoaXMud3JhcHBlci5pbm5lckhUTUwgPSAnJztcclxuXHRcdHByb2R1Y3RzLmZvckVhY2goZnVuY3Rpb24ocHJvZHVjdCkge1xyXG5cdFx0XHR0aGlzLndyYXBwZXIuYXBwZW5kQ2hpbGQocHJvZHVjdCk7XHJcblx0XHR9LmJpbmQodGhpcykpO1xyXG5cclxuXHRcdHJldHVybiBpdGVtcztcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIE1ha2VzIGFuIEFqYXggY2FsbCB0byB0aGUgc2VydmVyIHdpdGhvdXQgcGFyYW1ldGVycy5cclxuXHQgKi9cclxuXHRnZXRQcm9kdWN0cygpXHJcblx0e1xyXG5cdFx0cmV0dXJuIHRoaXMuYXNrU2VydmVyKCk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBNYWtlcyBhbiBBamF4IGNhbGwgdG8gdGhlIHNlcnZlci5cclxuXHQgKi9cclxuXHRnZXRQcm9kdWN0c0J5UGFnZShwYWdlTnVtYmVyKSBcclxuXHR7XHJcblx0XHRyZXR1cm4gdGhpcy5hc2tTZXJ2ZXIocGFnZU51bWJlcik7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBTZW5kcyB0aGUgcmVxdWVzdCB0byB0aGUgc2VydmVyLlxyXG5cdCAqL1xyXG5cdGFza1NlcnZlcihwYWdlTnVtYmVyKVxyXG5cdHtcclxuXHRcdHBhZ2VOdW1iZXIgPSBwYWdlTnVtYmVyIHx8IG51bGw7XHJcblxyXG5cdFx0cmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xyXG5cclxuXHRcdFx0bGV0IHhociA9IG5ldyBYTUxIdHRwUmVxdWVzdCB8fCBuZXcgQWN0aXZlWE9iamVjdChcIk1pY3Jvc29mdC5YTUxIVFRQXCIpO1xyXG5cclxuXHRcdFx0aWYocGFnZU51bWJlcikge1xyXG5cdFx0XHRcdHhoci5vcGVuKCdHRVQnLCB0aGlzLnNldHRpbmdzLnVybCArICc/cGFnZT0nICsgcGFnZU51bWJlciwgdHJ1ZSk7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0eGhyLm9wZW4oJ0dFVCcsIHRoaXMuc2V0dGluZ3MudXJsLCB0cnVlKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0eGhyLnNldFJlcXVlc3RIZWFkZXIoJ0NvbnRlbnQtVHlwZScsICdhcHBsaWNhdGlvbi9qc29uJyk7XHJcblx0XHRcdFxyXG5cdFx0XHRsZXQgaW5zdGFuY2UgPSB0aGlzO1xyXG5cclxuXHRcdFx0eGhyLm9ucmVhZHlzdGF0ZWNoYW5nZSA9IGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRcdGlmICh0aGlzLnJlYWR5U3RhdGUgPT0gNCkge1xyXG5cdFx0XHRcdFx0aWYgKHRoaXMuc3RhdHVzID09IDIwMCkge1xyXG5cdFx0XHRcdFx0XHRpbnN0YW5jZS5jdXJyZW50SXRlbXMgPSAodGhpcy5yZXNwb25zZVRleHQgPT0gJycpID8gW10gOiBKU09OLnBhcnNlKHRoaXMucmVzcG9uc2VUZXh0KTtcclxuXHRcdFx0XHRcdFxyXG5cdFx0XHRcdFx0XHRpZihpbnN0YW5jZS5jdXJyZW50SXRlbXMubGVuZ3RoID09PSAwKSB7XHJcblx0XHRcdFx0XHRcdFx0cmVqZWN0KCdObyBJdGVtcyB3ZXJlIHJldHJpZXZlZCEnKTtcclxuXHRcdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBpbnN0YW5jZS5jdXJyZW50SXRlbXMubGVuZ3RoOyBpKyspIHtcclxuXHRcdFx0XHRcdFx0XHR2YXIgcHJvZHVjdCA9IGluc3RhbmNlLmN1cnJlbnRJdGVtc1tpXTtcclxuXHRcdFx0XHRcdFx0XHRpbnN0YW5jZS5BZnRlckxvYWRlZC5jYWxsKHRoaXMsIHByb2R1Y3QpO1xyXG5cdFx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0XHRyZXNvbHZlKGluc3RhbmNlLmN1cnJlbnRJdGVtcyk7XHJcblx0XHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0XHRyZWplY3QodGhpcy5zdGF0dXNUZXh0KTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9XHJcblx0XHRcdH07XHJcblxyXG5cdFx0XHR4aHIub25lcnJvciA9IGZ1bmN0aW9uKGVycm9yKSB7XHJcblx0XHRcdFx0cmVqZWN0KGVycm9yKTtcclxuXHRcdFx0fTtcclxuXHJcblx0XHRcdHhoci5zZW5kKG51bGwpO1xyXG5cdFx0fS5iaW5kKHRoaXMpKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEJ1aWxkcyB0aGUgaHRtbCBmb3IgdGhlIHByb2R1Y3RzLlxyXG5cdCAqL1xyXG5cdGJ1aWxkUHJvZHVjdHMoYXR0cmlidXRlc0NvbGxlY3Rpb24sIGNsYXNzTmFtZSwgdGFnVHlwZSkgXHJcblx0e1xyXG5cdFx0aWYoYXR0cmlidXRlc0NvbGxlY3Rpb24uY29uc3RydWN0b3IubmFtZSAhPSAnQXJyYXknICkge1xyXG5cdFx0XHR0aHJvdyBuZXcgSW52YWxpZEFyZ3VtZW50RXhjZXB0aW9uJDE7XHJcblx0XHR9XHJcblxyXG5cdFx0bGV0IGJ1aWx0UHJvZHVjdHMgPSBbXTtcclxuXHJcblx0XHRhdHRyaWJ1dGVzQ29sbGVjdGlvbi5mb3JFYWNoKGZ1bmN0aW9uKGF0dHJpYnV0ZXMpIHtcclxuXHRcdFx0bGV0IGJ1aWx0UHJvZHVjdCA9IHRoaXMuYnVpbGRQcm9kdWN0KGF0dHJpYnV0ZXMsIGNsYXNzTmFtZSwgdGFnVHlwZSk7XHJcblx0XHRcdGJ1aWx0UHJvZHVjdHMucHVzaChidWlsdFByb2R1Y3QpO1xyXG5cdFx0fS5iaW5kKHRoaXMpKTtcclxuXHJcblx0XHRyZXR1cm4gYnVpbHRQcm9kdWN0cztcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEJ1aWxkcyB0aGUgaHRtbCBmb3IgYSBzaW5nbGUgcHJvZHVjdC5cclxuXHQgKi9cclxuXHRidWlsZFByb2R1Y3QoYXR0cmlidXRlcywgY2xhc3NOYW1lLCB0YWdUeXBlKSBcclxuXHR7XHJcblx0XHRpZiAodHlwZW9mIGF0dHJpYnV0ZXMgIT0gJ29iamVjdCcgfHwgdHlwZW9mIHRhZ1R5cGUgIT0gJ3N0cmluZycpIHtcclxuXHRcdFx0dGhyb3cgbmV3IEludmFsaWRBcmd1bWVudEV4Y2VwdGlvbiQxO1xyXG5cdFx0fVxyXG5cclxuXHRcdGNsYXNzTmFtZSA9IGNsYXNzTmFtZSB8fCBudWxsO1xyXG5cclxuXHRcdGxldCBwcm9kdWN0ID0gRE9NLmNyZWF0ZUVsZW1lbnQoJ2RpdicsIHtcclxuXHRcdFx0Y2xhc3M6ICdwcm9kdWN0J1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0RE9NLmFkZENsYXNzKHByb2R1Y3QsIGNsYXNzTmFtZSk7XHJcblxyXG5cdFx0bGV0IG92ZXJsYXkgPSBET00uY3JlYXRlRWxlbWVudCgnZGl2Jywge1xyXG5cdFx0XHRjbGFzczogJ3Byb2R1Y3Qtb3ZlcmxheScsXHJcblx0XHR9KTtcclxuXHJcblx0XHRwcm9kdWN0LmFwcGVuZENoaWxkKG92ZXJsYXkpO1xyXG5cclxuXHRcdGZvciAodmFyIGF0dHJpYnV0ZSBpbiBhdHRyaWJ1dGVzKSB7XHJcblx0XHRcdGlmICghIENvbW1vbi5pbl9hcnJheShhdHRyaWJ1dGUsIHRoaXMuc2V0dGluZ3MuYXR0cmlidXRlcykpIHtcclxuXHRcdFx0XHRjb250aW51ZTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0bGV0IHRhZyA9IERPTS5jcmVhdGVFbGVtZW50KHRhZ1R5cGUpO1xyXG5cclxuXHRcdFx0aWYgKGF0dHJpYnV0ZSA9PSAnaW1hZ2UnKSB7XHJcblx0XHRcdFx0bGV0IGltYWdlID0gRE9NLmNyZWF0ZUVsZW1lbnQoJ2ltZycsIHtcclxuXHRcdFx0XHRcdHNyYzogYXR0cmlidXRlc1thdHRyaWJ1dGVdXHJcblx0XHRcdFx0fSk7XHJcblx0XHRcdFx0cHJvZHVjdC5hcHBlbmRDaGlsZChpbWFnZSk7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0dGFnLmlubmVySFRNTCA9IGF0dHJpYnV0ZXNbYXR0cmlidXRlXSB8fCAnJztcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0RE9NLmFkZENsYXNzKHRhZywgJ3Byb2R1Y3QtJyArIFN0ci5rZWJhYkNhc2UoYXR0cmlidXRlKSk7XHJcblx0XHRcdG92ZXJsYXkuYXBwZW5kQ2hpbGQodGFnKTtcclxuXHRcdH1cclxuXHJcblx0XHRsZXQgdGFnID0gRE9NLmNyZWF0ZUVsZW1lbnQoJ2RpdicsIHtcclxuXHRcdFx0aWQ6ICdhY3Rpb25CdXR0b25zJyxcclxuXHRcdFx0Y2xhc3M6ICdhY3Rpb24tYnV0dG9ucydcclxuXHRcdH0pO1xyXG5cclxuXHRcdGxldCBhZGRUb0NhcnQgPSBET00uY3JlYXRlRWxlbWVudCgnYnV0dG9uJywge1xyXG5cdFx0XHRpZDogJ2FkZFRvQ2FydCcsXHJcblx0XHRcdGNsYXNzOiB0aGlzLnNldHRpbmdzLmFkZF9idXR0b25fY2xhc3MsXHJcblx0XHRcdHR5cGU6ICdidXR0b24nLFxyXG5cdFx0XHR0ZXh0OiAnKycsXHJcblx0XHR9KTtcclxuXHJcblx0XHRsZXQgZmF2b3JpdGUgPSBET00uY3JlYXRlRWxlbWVudCgnYnV0dG9uJywge1xyXG5cdFx0XHRpZDogJ2Zhdm9yaXRlJyxcclxuXHRcdFx0Y2xhc3M6IHRoaXMuc2V0dGluZ3MuZmF2b3JpdGVfYnV0dG9uX2NsYXNzLFxyXG5cdFx0XHR0eXBlOiAnYnV0dG9uJyxcclxuXHRcdFx0dGV4dDogJyZoZWFydHM7J1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0dGFnLmFwcGVuZENoaWxkKGFkZFRvQ2FydCk7XHJcblx0XHR0YWcuYXBwZW5kQ2hpbGQoZmF2b3JpdGUpO1xyXG5cclxuXHRcdGFkZFRvQ2FydC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKGV2ZW50KSB7XHJcblx0XHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcblx0XHRcdEV2ZW50LnRyaWdnZXIoJ1Byb2R1Y3RXYXNBZGRlZCcsIGF0dHJpYnV0ZXMpO1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0b3ZlcmxheS5hcHBlbmRDaGlsZCh0YWcpO1xyXG5cclxuXHRcdHJldHVybiBwcm9kdWN0O1xyXG5cdH1cclxuXHJcblx0YWRkVG9DYXJ0KGV2ZW50KVxyXG5cdHtcclxuXHRcdFxyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQW4gZXZlbnQgZm9yIHRoZSBjbGllbnQgb2Ygd2hlbiB0aGUgcHJvZHVjdHMgYXMgYmVlbiBsb2FkZWQuXHJcblx0ICovXHJcblx0QWZ0ZXJMb2FkZWQocHJvZHVjdCkgXHJcblx0e1xyXG5cdFx0Ly9cclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEFkZCB0aGUgZUNvbW1lcmNlIHN0eWxlIHRhZ3MgdG8gdGhlIERPTS5cclxuXHQgKi9cclxuXHRhZGRTdHlsZVRhZygpIFxyXG5cdHtcclxuXHRcdGlmKERPTS5lbGVtZW50KCcjZUNvbW1lcmNlLVByb2R1Y3RzJykpIHtcclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0fVxyXG5cclxuXHRcdGxldCBjc3MgPSBgXHJcblx0XHRcdC5wcm9kdWN0IHtcclxuXHRcdFx0XHRwb3NpdGlvbjogcmVsYXRpdmU7XHJcblx0XHRcdFx0bWFyZ2luOiA1cHggNXB4O1xyXG5cdFx0XHRcdGJvcmRlcjogMXB4IHNvbGlkICNlNGU0ZTQ7XHJcblx0XHRcdFx0d2lkdGg6ICR7dGhpcy5zZXR0aW5ncy53aWR0aH07XHJcblx0XHRcdFx0aGVpZ2h0OiAke3RoaXMuc2V0dGluZ3MuaGVpZ2h0fTtcclxuXHRcdFx0XHRjdXJzb3I6IHBvaW50ZXI7XHJcblx0XHRcdFx0Y29sb3I6ICNmZmZmZmY7XHJcblx0XHRcdFx0b3ZlcmZsb3c6IGhpZGRlbjtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0LnByb2R1Y3QgPiAucHJvZHVjdC1vdmVybGF5IHtcclxuXHRcdFx0XHRwb3NpdGlvbjogYWJzb2x1dGU7XHJcblx0XHRcdFx0dG9wOiAwO1xyXG5cdFx0XHRcdGxlZnQ6IDA7XHJcblx0XHRcdFx0d2lkdGg6IDEwMCU7XHJcblx0XHRcdFx0aGVpZ2h0OiAxMDAlO1xyXG5cdFx0XHRcdG9wYWNpdHk6IDAuNTtcclxuXHRcdFx0XHR6LWluZGV4OiA1O1xyXG5cdFx0XHRcdHRyYW5zaXRpb246IDFzIGFsbDtcclxuXHRcdFx0XHR0cmFuc2Zvcm06IHRyYW5zbGF0ZVgoLTI1MHB4KTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0LnByb2R1Y3Q6aG92ZXIgPiAucHJvZHVjdC1vdmVybGF5IHtcclxuXHRcdFx0XHRiYWNrZ3JvdW5kOiByZ2JhKDAsIDAsIDAsIDAuNDUpO1xyXG5cdFx0XHRcdHRyYW5zZm9ybTogdHJhbnNsYXRlWCgwcHgpO1xyXG5cdFx0XHRcdG9wYWNpdHk6IDE7XHJcblx0XHRcdFx0dHJhbnNpdGlvbjogMXMgYWxsO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHQucHJvZHVjdCA+IGltZyB7XHJcblx0XHRcdFx0cG9zaXRpb246IGFic29sdXRlO1xyXG5cdFx0XHRcdGxlZnQ6IDA7XHJcblx0XHRcdFx0dG9wOiAwO1xyXG5cdFx0XHRcdHdpZHRoOiAxMDAlO1xyXG5cdFx0XHRcdGhlaWdodDogMTAwJTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0LnByb2R1Y3QgPiAucHJvZHVjdC1pbWFnZSB7XHJcblx0XHRcdFx0ei1pbmRleDogMDtcclxuXHRcdFx0XHRwb3NpdGlvbjogYWJzb2x1dGU7XHJcblx0XHRcdFx0dG9wOiAwO1xyXG5cdFx0XHRcdGxlZnQ6IDA7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdC5wcm9kdWN0ID4gLnByb2R1Y3Qtb3ZlcmxheSA+IC5wcm9kdWN0LW5hbWUsIFxyXG5cdFx0XHQucHJvZHVjdCA+IC5wcm9kdWN0LW92ZXJsYXkgPiAucHJvZHVjdC1wcmljZSxcclxuXHRcdFx0LnByb2R1Y3QgPiAucHJvZHVjdC1vdmVybGF5ID4gLnByb2R1Y3QtZGVsaXZlcnktdGltZSB7XHJcblx0XHRcdFx0ei1pbmRleDogMTtcclxuXHRcdFx0XHRwb3NpdGlvbjogcmVsYXRpdmU7XHJcblx0XHRcdFx0dGV4dC1hbGlnbjogY2VudGVyO1xyXG5cdFx0XHRcdG1hcmdpbi10b3A6IDI1cHg7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdC5wcm9kdWN0ID4gLnByb2R1Y3Qtb3ZlcmxheSA+IC5hY3Rpb24tYnV0dG9ucyB7XHJcblx0XHRcdFx0d2lkdGg6IDEwMCU7XHJcblx0XHRcdFx0bWFyZ2luLXRvcDogMTBweDtcclxuXHRcdFx0XHR0ZXh0LWFsaWduOiBjZW50ZXI7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdC5wcm9kdWN0ID4gLnByb2R1Y3Qtb3ZlcmxheSA+IC5hY3Rpb24tYnV0dG9ucyA+ICNmYXZvcml0ZSB7XHJcblx0XHRcdFx0bWFyZ2luLWxlZnQ6IDEwcHg7XHJcblx0XHRcdH1cclxuXHJcblx0XHRgO1xyXG5cdCAgICBcclxuXHQgICAgRE9NLmFkZFN0eWxlKCdlQ29tbWVyY2UtUHJvZHVjdHMnLCBjc3MpO1xyXG5cdH1cclxufVxuXG4vKipcclxuICogVGhlIFNlcnZpY2VzIE9iamVjdCwgaGFuZGxlcyB0aGUgc2VydmljZXMuXHJcbiAqL1xyXG5jbGFzcyBTZXJ2aWNlcyBcclxue1xyXG5cclxufVxuXG4vKipcclxuICogVGhlIGRlZmF1bHQgc2V0dGluZ3Mgb2YgdGhlIHBhZ2luYXRpb24uXHJcbiAqL1xyXG5sZXQgZGVmYXVsdFNldHRpbmdzJDMgPSB7XHJcblx0ZWxlbWVudDogJy5wYWdpbmF0aW9uLWxpbmtzJyxcclxuXHRjbGFzczogJycsXHJcblx0cGVyX3BhZ2U6IDUsXHJcblx0dG90YWxfaXRlbXM6IDEwLFxyXG59O1xyXG5cclxuLyoqXHJcbiAqIFN0b3JlcyB0aGUgY29udGFpbmVyIG9iamVjdC5cclxuICovXHJcbmxldCBDb250YWluZXIkNDtcclxuXHJcbi8qKlxyXG4gKiBTdG9yZXMgdGhlIHByb2R1Y3RzIGNvbXBvbmVudC5cclxuICovXHJcbmxldCBQcm9kdWN0cyQyO1xyXG5cclxuLyoqXHJcbiAqIFRoZSBQYWdpbmF0aW9uIE9iamVjdCwgaGFuZGxlcyB0aGUgcGFnaW5hdGlvbi5cclxuICovXHJcbmNsYXNzIFBhZ2luYXRpb24gXHJcbntcclxuXHQvKipcclxuXHQgKiBJbml0aWFsaXplIHRoZSBjb250YWluZXIgb2JqZWN0IGFuZCB0aGUgZGVmYXVsdCBzZXR0aW5ncy5cclxuXHQgKi9cclxuXHRjb25zdHJ1Y3Rvcihjb250YWluZXIsIHByb2R1Y3RzKSBcclxuXHR7XHJcblx0XHR0aGlzLnNldEN1cnJlbnQoMSk7XHJcblx0XHRDb250YWluZXIkNCA9IGNvbnRhaW5lcjtcclxuXHRcdFByb2R1Y3RzJDIgPSBwcm9kdWN0cztcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFNldCB0aGUgUGFnaW5hdGlvbiBvYmplY3QgdXAuXHJcblx0ICovXHJcblx0c2V0dXAoc2V0dGluZ3MpXHJcblx0e1xyXG5cdFx0ZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsIGZ1bmN0aW9uKCkge1xyXG5cclxuXHRcdGlmKHR5cGVvZiBzZXR0aW5ncyAhPSAnb2JqZWN0Jykge1xyXG5cdFx0XHR0aHJvdyBuZXcgSW52YWxpZEFyZ3VtZW50RXhjZXB0aW9uJDE7XHJcblx0XHR9XHJcblxyXG5cdFx0dGhpcy5zZXR0aW5ncyA9IENvbW1vbi5leHRlbmQoZGVmYXVsdFNldHRpbmdzJDMsIHNldHRpbmdzKTtcclxuXHJcblx0XHR0aGlzLnRvdGFsUGFnZXMgPSB0aGlzLmNhbGN1bGF0ZVRvdGFsUGFnZXModGhpcy5zZXR0aW5ncy5wZXJfcGFnZSwgdGhpcy5zZXR0aW5ncy50b3RhbF9pdGVtcyk7XHJcblx0XHRcclxuXHRcdHRoaXMuc2V0RWxlbWVudCh0aGlzLnNldHRpbmdzLmVsZW1lbnQpO1xyXG5cdFx0dGhpcy5yZXBsYWNlTGlua3ModGhpcy5saW5rcyk7XHJcblxyXG5cdFx0fS5iaW5kKHRoaXMpKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFNldHMgdGhlIHdyYXBwZXIgZWxlbWVudC5cclxuXHQgKi9cclxuXHRzZXRFbGVtZW50KHNlbGVjdG9yKVxyXG5cdHtcclxuXHRcdHRoaXMud3JhcHBlciA9IERPTS5lbGVtZW50KHNlbGVjdG9yKTtcclxuXHRcdFxyXG5cdFx0RE9NLmFkZENsYXNzKHRoaXMud3JhcHBlciwgdGhpcy5zZXR0aW5ncy5jbGFzcyk7XHJcblxyXG5cdFx0dGhpcy5saW5rcyA9IHRoaXMuY3JlYXRlTGlua3MoKTtcclxuXHRcdHRoaXMuYmluZEV2ZW50TGlzdGVuZXJzKHRoaXMubGlua3MpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogUmVwbGFjZXMgdGhlIGxpbmtzIGluIHRoZSB3cmFwcGVyLlxyXG5cdCAqL1xyXG5cdHJlcGxhY2VMaW5rcyhsaW5rcylcclxuXHR7XHJcblx0XHR0aGlzLndyYXBwZXIuaW5uZXJIVE1MID0gJyc7XHJcblx0XHR0aGlzLndyYXBwZXIuYXBwZW5kQ2hpbGQobGlua3MpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQ2FsY3VsYXRlcyB0aGUgdG90YWwgcGFnZXMuXHJcblx0ICovXHJcblx0Y2FsY3VsYXRlVG90YWxQYWdlcyhwZXJQYWdlLCB0b3RhbEl0ZW1zKVxyXG5cdHtcclxuXHRcdHBlclBhZ2UgPSBwYXJzZUludChwZXJQYWdlKTtcclxuXHRcdHRvdGFsSXRlbXMgPSBwYXJzZUludCh0b3RhbEl0ZW1zKTtcclxuXHJcblx0XHRyZXR1cm4gTWF0aC5jZWlsKHRvdGFsSXRlbXMgLyBwZXJQYWdlKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEJpbmRzIHRoZSBidXR0b25zIGV2ZW50cyBsaXN0ZW5lcnMuXHJcblx0ICovXHJcblx0YmluZEV2ZW50TGlzdGVuZXJzKGxpbmtzKSBcclxuXHR7XHJcblx0XHRsZXQgaW5zdGFuY2UgPSB0aGlzO1xyXG5cclxuXHRcdHRoaXMubmV4dC5jaGlsZE5vZGVzWzBdLm9uY2xpY2sgPSBmdW5jdGlvbihldmVudCkge1xyXG5cdFx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuXHRcdFx0bGV0IHJlcXVlc3RlZFBhZ2UgPSBpbnN0YW5jZS5jdXJyZW50KzE7XHJcblxyXG5cdFx0XHRpZiAoaW5zdGFuY2Uubm90SW5QYWdlUmFuZ2UocmVxdWVzdGVkUGFnZSkpIHtcclxuXHRcdFx0XHR0aHJvdyBuZXcgTm90SW5QYWdlUmFuZ2VFeGNlcHRpb247XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdFByb2R1Y3RzJDIuZ2V0UHJvZHVjdHNCeVBhZ2UocmVxdWVzdGVkUGFnZSkudGhlbihmdW5jdGlvbihwcm9kdWN0cykge1xyXG5cdFx0XHRcdFByb2R1Y3RzJDIucmVwbGFjZUl0ZW1zKHByb2R1Y3RzKTtcclxuXHRcdFx0fSk7XHJcblxyXG5cdFx0XHRpbnN0YW5jZS5zZXRDdXJyZW50KHJlcXVlc3RlZFBhZ2UpO1xyXG5cdFx0fTtcclxuXHJcblx0XHR0aGlzLnByZXZpb3VzLmNoaWxkTm9kZXNbMF0ub25jbGljayA9IGZ1bmN0aW9uKGV2ZW50KSB7XHJcblx0XHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG5cdFx0XHRsZXQgcmVxdWVzdGVkUGFnZSA9IGluc3RhbmNlLmN1cnJlbnQtMTtcclxuXHJcblx0XHRcdGlmKGluc3RhbmNlLm5vdEluUGFnZVJhbmdlKHJlcXVlc3RlZFBhZ2UpKSB7XHJcblx0XHRcdFx0dGhyb3cgbmV3IE5vdEluUGFnZVJhbmdlRXhjZXB0aW9uO1xyXG5cdFx0XHR9XHJcblx0XHRcdFxyXG5cdFx0XHRQcm9kdWN0cyQyLmdldFByb2R1Y3RzQnlQYWdlKHJlcXVlc3RlZFBhZ2UpLnRoZW4oZnVuY3Rpb24ocHJvZHVjdHMpIHtcclxuXHRcdFx0XHRQcm9kdWN0cyQyLnJlcGxhY2VJdGVtcyhwcm9kdWN0cyk7XHJcblx0XHRcdH0pO1xyXG5cclxuXHRcdFx0aW5zdGFuY2Uuc2V0Q3VycmVudChyZXF1ZXN0ZWRQYWdlKTtcclxuXHRcdH07XHJcblxyXG5cdFx0Zm9yKHZhciBpID0gMDsgaSA8IHRoaXMucGFnZXMubGVuZ3RoOyBpKyspIHtcclxuXHRcdFx0dGhpcy5wYWdlc1tpXS5jaGlsZE5vZGVzWzBdLm9uY2xpY2sgPSBmdW5jdGlvbihldmVudCkge1xyXG5cdFx0XHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcblx0XHRcdFx0XHJcblx0XHRcdFx0bGV0IHJlcXVlc3RlZFBhZ2UgPSB0aGlzLmdldEF0dHJpYnV0ZSgnZGF0YS1wYWdlLW5yJyk7XHJcblx0XHRcdFx0XHJcblx0XHRcdFx0UHJvZHVjdHMkMi5nZXRQcm9kdWN0c0J5UGFnZShyZXF1ZXN0ZWRQYWdlKS50aGVuKGZ1bmN0aW9uKHByb2R1Y3RzKSB7XHJcblx0XHRcdFx0XHRQcm9kdWN0cyQyLnJlcGxhY2VJdGVtcyhwcm9kdWN0cyk7XHJcblx0XHRcdFx0fSk7XHJcblx0XHRcdFx0XHJcblx0XHRcdFx0aW5zdGFuY2Uuc2V0Q3VycmVudChyZXF1ZXN0ZWRQYWdlKTtcclxuXHRcdFx0fTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFNldHMgdGhlIGN1cnJlbnQgcGFnZS5cclxuXHQgKi9cclxuXHRzZXRDdXJyZW50KHBhZ2VOdW1iZXIpIFxyXG5cdHtcclxuXHRcdHRoaXMuY3VycmVudCA9IHBhcnNlSW50KHBhZ2VOdW1iZXIpO1xyXG5cdFx0dGhpcy5jaGFuZ2VVcmwocGFnZU51bWJlcik7XHJcblx0XHR0aGlzLnNldEFjdGl2ZUxpbmsocGFnZU51bWJlcik7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBHZXRzIHRoZSBjdXJyZW50IHBhZ2UuXHJcblx0ICovXHJcblx0Z2V0Q3VycmVudCgpIFxyXG5cdHtcclxuXHRcdHJldHVybiB0aGlzLmN1cnJlbnQ7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBDcmVhdGVzIHRoZSBwYWdpbmF0aW9uIGxpbmtzLlxyXG5cdCAqL1xyXG5cdGNyZWF0ZUxpbmtzKCkgXHJcblx0e1xyXG5cdFx0bGV0IHVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndWwnKTtcclxuXHRcdFxyXG5cdFx0dGhpcy5wYWdlcyA9IHRoaXMuY3JlYXRlUGFnZUxpbmtzKCk7XHJcblx0XHR0aGlzLnByZXZpb3VzID0gdGhpcy5jcmVhdGVQcmV2aW91c0J1dHRvbigpO1xyXG5cdFx0dGhpcy5uZXh0ID0gdGhpcy5jcmVhdGVOZXh0QnV0dG9uKCk7XHJcblxyXG5cdFx0dWwuY2xhc3NOYW1lID0gJ3BhZ2luYXRpb24nO1xyXG5cdFx0dWwuYXBwZW5kQ2hpbGQodGhpcy5wcmV2aW91cyk7XHJcblxyXG5cdFx0dGhpcy5wYWdlcy5mb3JFYWNoKGZ1bmN0aW9uKHBhZ2UpIHtcclxuXHRcdFx0dWwuYXBwZW5kQ2hpbGQocGFnZSk7XHJcblx0XHR9KTtcclxuXHJcblx0XHR1bC5hcHBlbmRDaGlsZCh0aGlzLm5leHQpO1xyXG5cclxuXHRcdHJldHVybiB1bDtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIENyZWF0ZXMgdGhlIHBhZ2VzIGl0ZW0gbGlua3MuXHJcblx0ICovXHJcblx0Y3JlYXRlUGFnZUxpbmtzKCkgXHJcblx0e1xyXG5cdFx0dmFyIHBhZ2VzID0gW107XHJcblxyXG5cdFx0Zm9yKHZhciBpID0gMTsgaSA8PSB0aGlzLnRvdGFsUGFnZXM7IGkrKykge1xyXG5cdFx0XHR2YXIgcGFnZUl0ZW0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaScpO1xyXG5cdFx0XHR2YXIgbGluayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKTtcclxuXHRcdFx0cGFnZUl0ZW0uY2xhc3NOYW1lID0gKHRoaXMuY3VycmVudCA9PSBpKSA/ICdwYWdlLWl0ZW0gYWN0aXZlJyA6ICdwYWdlLWl0ZW0nO1xyXG5cdFx0XHRsaW5rLmNsYXNzTmFtZSA9ICdwYWdlLWxpbmsnO1xyXG5cdFx0XHRsaW5rLnNldEF0dHJpYnV0ZSgnaHJlZicsICc/cGFnZT0nKyBpKTtcclxuXHRcdFx0bGluay5zZXRBdHRyaWJ1dGUoJ2RhdGEtcGFnZS1ucicsIGkpO1xyXG5cdFx0XHRsaW5rLmlubmVySFRNTCA9IGk7XHJcblx0XHRcdHBhZ2VJdGVtLmFwcGVuZENoaWxkKGxpbmspO1xyXG5cdFx0XHRwYWdlcy5wdXNoKHBhZ2VJdGVtKTtcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gcGFnZXM7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBDcmVhdGVzIHRoZSBwcmV2aW91cyBidXR0b24gbGluay5cclxuXHQgKi9cclxuXHRjcmVhdGVQcmV2aW91c0J1dHRvbigpIFxyXG5cdHtcclxuXHRcdHZhciBsaSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJyk7XHJcblx0XHR2YXIgbGluayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKTtcclxuXHRcdHZhciBzcGFuMSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcclxuXHRcdHZhciBzcGFuMiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcclxuXHRcdFxyXG5cdFx0XHJcblx0XHRsaS5jbGFzc05hbWUgPSAncGFnZS1pdGVtJztcclxuXHRcdGxpbmsuY2xhc3NOYW1lID0gJ3BhZ2UtbGluayc7XHJcblx0XHRzcGFuMi5jbGFzc05hbWUgPSAnc3Itb25seSc7XHJcblxyXG5cdFx0bGluay5zZXRBdHRyaWJ1dGUoJ2hyZWYnLCAnJyk7XHJcblx0XHRsaW5rLnNldEF0dHJpYnV0ZSgnYXJpYS1sYWJlbCcsICdQcmV2aW91cycpO1xyXG5cdFx0c3BhbjEuc2V0QXR0cmlidXRlKCdhcmlhLWhpZGRlbicsICd0cnVlJyk7XHJcblxyXG5cdFx0c3BhbjEuaW5uZXJIVE1MID0gJyZsYXF1bzsnO1xyXG5cdFx0c3BhbjIuaW5uZXJIVE1MID0gJ1ByZXZpb3VzJztcclxuXHJcblx0XHRsaW5rLmFwcGVuZENoaWxkKHNwYW4xKTtcclxuXHRcdGxpbmsuYXBwZW5kQ2hpbGQoc3BhbjIpO1xyXG5cdFx0bGkuYXBwZW5kQ2hpbGQobGluayk7XHJcblxyXG5cdFx0cmV0dXJuIGxpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQ3JlYXRlcyB0aGUgbmV4dCBidXR0b24gbGluay5cclxuXHQgKi9cclxuXHRjcmVhdGVOZXh0QnV0dG9uKCkgXHJcblx0e1xyXG5cdFx0dmFyIGxpID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKTtcclxuXHRcdHZhciBsaW5rID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpO1xyXG5cdFx0dmFyIHNwYW4xID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xyXG5cdFx0dmFyIHNwYW4yID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xyXG5cdFx0XHJcblx0XHRsaS5jbGFzc05hbWUgPSAncGFnZS1pdGVtJztcclxuXHRcdGxpbmsuY2xhc3NOYW1lID0gJ3BhZ2UtbGluayc7XHJcblx0XHRzcGFuMi5jbGFzc05hbWUgPSAnc3Itb25seSc7XHJcblxyXG5cdFx0bGluay5zZXRBdHRyaWJ1dGUoJ2hyZWYnLCAnJyk7XHJcblx0XHRsaW5rLnNldEF0dHJpYnV0ZSgnYXJpYS1sYWJlbCcsICdOZXh0Jyk7XHJcblx0XHRzcGFuMS5zZXRBdHRyaWJ1dGUoJ2FyaWEtaGlkZGVuJywgJ3RydWUnKTtcclxuXHJcblx0XHRzcGFuMS5pbm5lckhUTUwgPSAnJnJhcXVvOyc7XHJcblx0XHRzcGFuMi5pbm5lckhUTUwgPSAnTmV4dCc7XHJcblxyXG5cdFx0bGluay5hcHBlbmRDaGlsZChzcGFuMSk7XHJcblx0XHRsaW5rLmFwcGVuZENoaWxkKHNwYW4yKTtcclxuXHRcdGxpLmFwcGVuZENoaWxkKGxpbmspO1xyXG5cclxuXHRcdHJldHVybiBsaTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIENoZWNrcyBpZiB0aGUgZ2l2ZW4gcGFnZSBpcyBpbiByYW5nZS5cclxuXHQgKi9cclxuXHRub3RJblBhZ2VSYW5nZShwYWdlTnVtYmVyKSBcclxuXHR7XHJcblx0XHRyZXR1cm4gKHBhZ2VOdW1iZXIgPiB0aGlzLnRvdGFsUGFnZXMgfHwgcGFnZU51bWJlciA8PSAwKSB8fCBpc05hTihwYWdlTnVtYmVyKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIENoYW5nZXMgdGhlIHVybCB0byBhIGdpdmVuIHBhZ2UgbnVtYmVyLlxyXG5cdCAqL1xyXG5cdGNoYW5nZVVybChwYWdlTnVtYmVyKSBcclxuXHR7XHJcblx0XHRwYWdlTnVtYmVyID0gIHBhZ2VOdW1iZXIgfHwgR0VUX1ZhcnMoKVsncGFnZSddO1xyXG5cdFx0d2luZG93Lmhpc3RvcnkucmVwbGFjZVN0YXRlKCcnLCAnJywgdGhpcy51cGRhdGVVUkxQYXJhbWV0ZXIod2luZG93LmxvY2F0aW9uLmhyZWYsICdwYWdlJywgcGFnZU51bWJlcikpO1xyXG5cdH1cclxuXHJcblx0c2V0QWN0aXZlTGluayhwYWdlTnVtYmVyKVxyXG5cdHtcclxuXHRcdGZvcih2YXIgcGFnZSBpbiB0aGlzLnBhZ2VzKSB7XHJcblx0XHRcdGlmICh0aGlzLnBhZ2VzW3BhZ2VdLmNoaWxkTm9kZXNbMF0uZ2V0QXR0cmlidXRlKCdkYXRhLXBhZ2UtbnInKSA9PSBwYWdlTnVtYmVyKSB7XHJcblx0XHRcdFx0RE9NLmFkZENsYXNzKHRoaXMucGFnZXNbcGFnZV0sICdhY3RpdmUnKTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRET00ucmVtb3ZlQ2xhc3ModGhpcy5wYWdlc1twYWdlXSwgJ2FjdGl2ZScpO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBHZXQgdGhlIGdldCB2YXJpYWJsZXMgZnJvbSB0aGUgdXJsLlxyXG5cdCAqL1xyXG5cdEdFVF9WYXJzKCkgXHJcblx0e1xyXG5cdFx0dmFyIHZhcnMgPSB7fTtcclxuXHRcdHZhciBwYXJ0cyA9IHdpbmRvdy5sb2NhdGlvbi5ocmVmLnJlcGxhY2UoL1s/Jl0rKFtePSZdKyk9KFteJl0qKS9naSwgZnVuY3Rpb24obSwga2V5LCB2YWx1ZSkge1xyXG5cdFx0XHR2YXJzW2tleV0gPSB2YWx1ZTtcclxuXHRcdH0pO1xyXG5cclxuXHRcdHJldHVybiB2YXJzO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogTW9kaWZpZXMgdGhlIGdldCBwYXJhbWV0ZXIgaW4gdGhlIHVybC5cclxuXHQgKi9cclxuXHR1cGRhdGVVUkxQYXJhbWV0ZXIodXJsLCBwYXJhbSwgcGFyYW1WYWwpIFxyXG5cdHtcclxuXHQgICAgdmFyIG5ld0FkZGl0aW9uYWxVUkwgPSBcIlwiO1xyXG5cdCAgICB2YXIgdGVtcEFycmF5ID0gdXJsLnNwbGl0KFwiP1wiKTtcclxuXHQgICAgdmFyIGJhc2VVUkwgPSB0ZW1wQXJyYXlbMF07XHJcblx0ICAgIHZhciBhZGRpdGlvbmFsVVJMID0gdGVtcEFycmF5WzFdO1xyXG5cdCAgICB2YXIgdGVtcCA9IFwiXCI7XHJcblxyXG5cdCAgICBpZiAoYWRkaXRpb25hbFVSTCkge1xyXG5cdCAgICAgICAgdGVtcEFycmF5ID0gYWRkaXRpb25hbFVSTC5zcGxpdChcIiZcIik7XHJcblx0ICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRlbXBBcnJheS5sZW5ndGg7IGkrKyl7XHJcblx0ICAgICAgICAgICAgaWYgKHRlbXBBcnJheVtpXS5zcGxpdCgnPScpWzBdICE9IHBhcmFtKXtcclxuXHQgICAgICAgICAgICAgICAgbmV3QWRkaXRpb25hbFVSTCArPSB0ZW1wICsgdGVtcEFycmF5W2ldO1xyXG5cdCAgICAgICAgICAgICAgICB0ZW1wID0gXCImXCI7XHJcblx0ICAgICAgICAgICAgfVxyXG5cdCAgICAgICAgfVxyXG5cdCAgICB9XHJcblxyXG5cdCAgICB2YXIgcm93c1RleHQgPSB0ZW1wICsgXCJcIiArIHBhcmFtICsgXCI9XCIgKyBwYXJhbVZhbDtcclxuXHQgICAgcmV0dXJuIGJhc2VVUkwgKyBcIj9cIiArIG5ld0FkZGl0aW9uYWxVUkwgKyByb3dzVGV4dDtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFJlc2V0cyB0aGUgcGFnaW5hdGlvbi5cclxuXHQgKi9cclxuXHRyZXNldCgpIFxyXG5cdHtcclxuXHRcdHRoaXMuc2V0Q3VycmVudCgxKTtcclxuXHRcdHRoaXMuY2hhbmdlVXJsKDEpO1xyXG5cdH1cclxufVxuXG5jbGFzcyBDb29raWVcclxue1xyXG5cdC8qKlxyXG4gXHQqIFNldHMgYSBjb29raWUuIFxyXG5cdCovXHJcblx0c3RhdGljIHNldChuYW1lLCB2YWx1ZSwgZGF5cykgXHJcblx0e1xyXG5cdFx0aWYgKHZhbHVlLmNvbnN0cnVjdG9yLm5hbWUgID09ICdPYmplY3QnIHx8IHZhbHVlLmNvbnN0cnVjdG9yLm5hbWUgPT0gJ0FycmF5Jykge1xyXG5cdFx0XHR2YWx1ZSA9IEpTT04uc3RyaW5naWZ5KHZhbHVlKTtcclxuXHRcdH1cclxuXHJcblx0XHRkYXlzID0gZGF5cyB8fCAxMDtcclxuXHJcblx0ICAgIGxldCBleHBpcmVzO1xyXG5cdCAgICBcclxuXHQgICAgaWYgKGRheXMpIHtcclxuXHQgICAgICAgIGxldCBkYXRlID0gbmV3IERhdGUoKTtcclxuXHQgICAgICAgIGRhdGUuc2V0VGltZShkYXRlLmdldFRpbWUoKSArIChkYXlzICogMjQgKiA2MCAqIDYwICogMTAwMCkpO1xyXG5cdCAgICAgICAgZXhwaXJlcyA9IFwiOyBleHBpcmVzPVwiICsgZGF0ZS50b0dNVFN0cmluZygpO1xyXG5cdCAgICB9IGVsc2Uge1xyXG5cdCAgICAgICAgZXhwaXJlcyA9IFwiXCI7XHJcblx0ICAgIH1cclxuXHJcblx0ICAgIGRvY3VtZW50LmNvb2tpZSA9IG5hbWUgKyBcIj1cIiArIHZhbHVlICsgZXhwaXJlcyArIFwiOyBwYXRoPS9cIjtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFJldHJpZXZlcyB0aGUgY29va2llIGJ5IG5hbWUuXHJcblx0ICovXHJcblx0c3RhdGljIGdldChuYW1lKSBcclxuXHR7XHJcblx0ICAgIGlmIChkb2N1bWVudC5jb29raWUubGVuZ3RoID4gMCkge1xyXG5cdCAgICAgICAgbGV0IGNfc3RhcnQgPSBkb2N1bWVudC5jb29raWUuaW5kZXhPZihuYW1lICsgXCI9XCIpO1xyXG5cdCAgICAgICAgXHJcblx0ICAgICAgICBpZiAoY19zdGFydCAhPSAtMSkge1xyXG5cdCAgICAgICAgICAgIGNfc3RhcnQgPSBjX3N0YXJ0ICsgbmFtZS5sZW5ndGggKyAxO1xyXG5cdCAgICAgICAgICAgIGxldCBjX2VuZCA9IGRvY3VtZW50LmNvb2tpZS5pbmRleE9mKFwiO1wiLCBjX3N0YXJ0KTtcclxuXHQgICAgICAgICAgICBcclxuXHQgICAgICAgICAgICBpZiAoY19lbmQgPT0gLTEpIHtcclxuXHQgICAgICAgICAgICAgICAgY19lbmQgPSBkb2N1bWVudC5jb29raWUubGVuZ3RoO1xyXG5cdCAgICAgICAgICAgIH1cclxuXHJcblx0ICAgICAgICAgICAgcmV0dXJuIEpTT04ucGFyc2UodW5lc2NhcGUoZG9jdW1lbnQuY29va2llLnN1YnN0cmluZyhjX3N0YXJ0LCBjX2VuZCkpKTtcclxuXHQgICAgICAgIH1cclxuXHQgICAgfVxyXG5cclxuXHQgICAgcmV0dXJuIFtdO1xyXG5cdH1cclxufVxuXG4vKipcclxuICogVGhlIGRlZmF1bHQgc2V0dGluZ3Mgb2YgdGhlIGNhcnQuXHJcbiAqL1xyXG5sZXQgZGVmYXVsdFNldHRpbmdzJDQgPSB7XHJcblx0ZWxlbWVudDogJy5jYXJ0JyxcclxuXHRjb29raWVfbmFtZTogJ2NhcnQnLFxyXG5cdHByZXZpZXdfY2xhc3M6ICcnLFxyXG5cdGxvYWRlcjogJy9pbWFnZXMvaWNvbnMvc3Bpbm5lci5zdmcnLFxyXG5cdGNsYXNzOiAnJyxcclxuXHR3aWR0aDogJzYwcHgnLFxyXG5cdGhlaWdodDogJzYwcHgnLFxyXG5cdHBsYWNlbWVudDogJ3JpZ2h0LXRvcCcsXHJcblx0Zml4ZWQ6IHRydWUsXHJcblx0aG92ZXJfY29sb3I6ICdvcmFuZ2UnXHJcbn07XHJcblxyXG4vKipcclxuICogU3RvcmVzIHRoZSBjb250YWluZXIgb2JqZWN0LlxyXG4gKi9cclxubGV0IENvbnRhaW5lciQ1O1xyXG5cclxuLyoqXHJcbiAqIFN0b3JlcyB0aGUgY2FydCBsb2FkZXIuXHJcbiAqL1xyXG5sZXQgbG9hZGluZ092ZXJsYXk7XHJcblxyXG4vKipcclxuICogVGhlIENhcnQgT2JqZWN0LCBoYW5kbGVzIHRoZSBjYXJ0IGljb24gYW5kIHNlc3Npb25zLlxyXG4gKi9cclxuY2xhc3MgQ2FydCBcclxue1xyXG5cdC8qKlxyXG5cdCAqIEluaXRpYWxpemUgdGhlIGRlZmF1bHQgc2V0dGluZ3MsIHNldHRpbmcgdGhlIGVsZW1lbnQsXHJcblx0ICogYW5kIGNyZWF0aW5nIHRoZSBwcmV2aWV3IGZvciB0aGUgY2FydHMgZGV0YWlscy5cclxuXHQgKi9cclxuXHRjb25zdHJ1Y3Rvcihjb250YWluZXIpIFxyXG5cdHtcclxuXHRcdENvbnRhaW5lciQ1ID0gY29udGFpbmVyO1xyXG5cdFx0XHJcblx0XHR0aGlzLnByZXZpZXdFbGVtZW50ID0gdGhpcy5jcmVhdGVQcmV2aWV3RWxlbWVudCgpO1xyXG5cdFx0dGhpcy5zdmdJY29uID0gY3JlYXRlSWNvbi5jYWxsKHRoaXMpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogU2V0cyB0aGUgb2JqZWN0IGJ5IHRoZSB1c2VycyBzZXR0aW5nLlxyXG5cdCAqL1xyXG5cdHNldHVwKHNldHRpbmdzKVxyXG5cdHtcclxuXHRcdGlmKHR5cGVvZiBzZXR0aW5ncyAhPSAnb2JqZWN0Jykge1xyXG5cdFx0XHR0aHJvdyBuZXcgSW52YWxpZEFyZ3VtZW50RXhjZXB0aW9uJDE7XHJcblx0XHR9XHJcblxyXG5cdFx0dGhpcy5zZXR0aW5ncyA9IENvbW1vbi5leHRlbmQoZGVmYXVsdFNldHRpbmdzJDQsIHNldHRpbmdzKTtcclxuXHJcblx0XHR0aGlzLnNldEVsZW1lbnQodGhpcy5zZXR0aW5ncy5lbGVtZW50KTtcclxuXHJcblx0XHRET00uYWRkQ2xhc3ModGhpcy5wcmV2aWV3RWxlbWVudCwgJ2Nsb3NlZCcpO1xyXG5cdFx0RE9NLmFkZENsYXNzKHRoaXMucHJldmlld0VsZW1lbnQsIHRoaXMuc2V0dGluZ3MucHJldmlld19jbGFzcyk7XHJcblx0XHRcclxuXHRcdHRoaXMuYmluZEV2ZW50TGlzdGVuZXJzKCk7XHJcblx0XHR0aGlzLmFkZFN0eWxlVGFnKCk7XHJcblxyXG5cdFx0aWYodGhpcy5pc0VtcHR5KENvb2tpZS5nZXQodGhpcy5zZXR0aW5ncy5jb29raWVfbmFtZSkpKSB7XHJcblx0XHRcdHRoaXMuY2FydCA9IHt9O1xyXG5cdFx0XHR0aGlzLnNldENhcnQodGhpcy5jYXJ0KTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIENoZWNrcyBpZiB0aGUgY2FydCBpcyBlbXB0eVxyXG5cdCAqL1xyXG5cdGlzRW1wdHkoY2FydClcclxuXHR7XHJcblx0XHRyZXR1cm4gQ29tbW9uLmVtcHR5T2JqZWN0KGNhcnQpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogU2V0cyB0aGUgY2FydCBhcyBhIGNvb2tpZS5cclxuXHQgKi9cclxuXHRzZXRDYXJ0KGNhcnQpXHJcblx0e1xyXG5cdFx0dGhpcy5jYXJ0LmlkID0gU3RyLnJhbmRvbSgxMCk7XHJcblx0XHR0aGlzLmNhcnQuaXRlbXMgPSBbXTtcclxuXHRcdHRoaXMuY2FydC5mYXZvcml0ZXMgPSBbXTtcclxuXHRcdENvb2tpZS5zZXQodGhpcy5zZXR0aW5ncy5jb29raWVfbmFtZSwgY2FydCwgMik7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBBZGRzIGFuIGl0ZW0gdG8gdGhlIGNhcnQuXHJcblx0ICovXHJcblx0YWRkSXRlbShpdGVtKVxyXG5cdHtcclxuXHRcdHRoaXMuY2FydCA9IENvb2tpZS5nZXQodGhpcy5zZXR0aW5ncy5jb29raWVfbmFtZSk7XHJcblxyXG5cdFx0dGhpcy5jYXJ0Lml0ZW1zLnB1c2goaXRlbSk7XHJcblxyXG5cdFx0Q29va2llLnNldCh0aGlzLnNldHRpbmdzLmNvb2tpZV9uYW1lLCB0aGlzLmNhcnQsIDIpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogUmVtb3ZlcyBhbiBpdGVtIGZyb20gdGhlIGNhcnQuXHJcblx0ICovXHJcblx0cmVtb3ZlSXRlbShpdGVtKVxyXG5cdHtcclxuIFx0XHR0aGlzLmNhcnQgPSBDb29raWUuZ2V0KHRoaXMuc2V0dGluZ3MuY29va2llX25hbWUpO1xyXG5cclxuIFx0XHR0aGlzLmNhcnQuaXRlbXMuc3BsaWNlKHRoaXMuY2FydC5pdGVtcy5pbmRleE9mKGl0ZW0pLCAxKTtcclxuXHJcbiBcdFx0Q29va2llLnNldCh0aGlzLnNldHRpbmdzLmNvb2tpZV9uYW1lLCB0aGlzLmNhcnQsIDIpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQWRkcyB0aGUgaXRlbSB0byBwcmV2aWV3LlxyXG5cdCAqL1xyXG5cdGFkZFRvUHJldmlldyhpdGVtcylcclxuXHR7XHJcblx0XHRsZXQgaXRlbXNEaXYgPSBET00uZmluZCh0aGlzLnByZXZpZXdFbGVtZW50LCAnLml0ZW1zJyk7XHJcblxyXG5cdFx0aXRlbXNEaXYuaW5uZXJIVE1MID0gJyc7XHJcblx0XHRmb3IgKGxldCBpID0gMDsgaSA8IGl0ZW1zLmxlbmd0aDsgaSsrKSB7XHJcblxyXG5cdFx0XHRsZXQgbGkgPSBET00uY3JlYXRlRWxlbWVudCgnbGknLCB7XHJcblx0XHRcdFx0XHRjbGFzczogJ2l0ZW0nXHJcblx0XHRcdFx0fSk7XHJcblxyXG5cdFx0XHRsZXQgYXR0cmlidXRlcyA9IGl0ZW1zW2ldO1xyXG5cclxuXHRcdFx0Zm9yKGxldCBhdHRyaWJ1dGUgaW4gYXR0cmlidXRlcykge1xyXG5cdFx0XHRcdGxldCBzcGFuID0gRE9NLmNyZWF0ZUVsZW1lbnQoJ3NwYW4nLCB7XHJcblx0XHRcdFx0XHR0ZXh0OiBhdHRyaWJ1dGVzW2F0dHJpYnV0ZV1cclxuXHRcdFx0XHR9KTtcclxuXHJcblx0XHRcdFx0bGkuYXBwZW5kQ2hpbGQoc3Bhbik7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGl0ZW1zRGl2LmFwcGVuZENoaWxkKGxpKTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEJpbmRzIGV2ZXJ0aGluZyB0byB0aGUgZWxlbWVudC5cclxuXHQgKi9cclxuXHRzZXRFbGVtZW50KHNlbGVjdG9yKVxyXG5cdHtcclxuXHRcdHRoaXMuaWNvbiA9IERPTS5lbGVtZW50KHNlbGVjdG9yKTtcclxuXHJcblx0XHRpZiAodGhpcy5pY29uKSB7XHJcblx0XHRcdERPTS5hZGRDbGFzcyh0aGlzLmljb24sIHRoaXMuc2V0dGluZ3MuY2xhc3MpO1xyXG5cdFx0XHRET00uYWRkQ2xhc3ModGhpcy5pY29uLCB0aGlzLnNldHRpbmdzLnBsYWNlbWVudCk7XHJcblx0XHRcdHRoaXMuaWNvbi5hcHBlbmRDaGlsZCh0aGlzLnN2Z0ljb24pO1xyXG5cdFx0XHR0aGlzLmljb24uYXBwZW5kQ2hpbGQodGhpcy5wcmV2aWV3RWxlbWVudCk7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBDcmVhdGVzIHRoZSBjYXJ0IGRldGFpbHMgcHJldmlldyBlbGVtZW50LlxyXG5cdCAqL1xyXG5cdGNyZWF0ZVByZXZpZXdFbGVtZW50KClcclxuXHR7XHJcblx0XHRsZXQgcHJldmlld0VsZW1lbnQgPSBET00uY3JlYXRlRWxlbWVudCgnZGl2Jywge1xyXG5cdFx0XHRpZDogJ3ByZXZpZXcnXHJcblx0XHR9KTtcclxuXHJcblx0XHRsZXQgdWwgPSBET00uY3JlYXRlRWxlbWVudCgndWwnLCB7XHJcblx0XHRcdFx0Y2xhc3M6ICdpdGVtcydcclxuXHRcdFx0fSk7XHJcblxyXG5cdFx0cHJldmlld0VsZW1lbnQuYXBwZW5kQ2hpbGQodWwpO1xyXG5cclxuXHRcdHJldHVybiBwcmV2aWV3RWxlbWVudDtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEFkZCB0aGUgZUNvbW1lcmNlIHN0eWxlIHRhZ3MgdG8gdGhlIERPTS5cclxuXHQgKi9cclxuXHRhZGRTdHlsZVRhZygpIFxyXG5cdHtcclxuXHRcdGlmKERPTS5lbGVtZW50KCcjZUNvbW1lcmNlLUNhcnQnKSkge1xyXG5cdFx0XHRyZXR1cm47XHJcblx0XHR9XHJcblxyXG5cdFx0bGV0IHBvc2l0aW9uID0gKHRoaXMuc2V0dGluZ3MuZml4ZWQpID8gJ2ZpeGVkJyA6ICdhYnNvbHV0ZSc7XHJcblxyXG5cdFx0bGV0IGNzcyA9IGBcclxuXHRcdFx0JHt0aGlzLnNldHRpbmdzLmVsZW1lbnR9IHtcclxuXHRcdFx0XHRwb3NpdGlvbjogJHtwb3NpdGlvbn07XHJcblx0XHRcdFx0Y3Vyc29yOiBwb2ludGVyO1xyXG5cdFx0XHRcdGNvbG9yOiAjZmZmZmZmO1xyXG5cdFx0XHRcdHotaW5kZXg6IDk5ODtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0JHt0aGlzLnNldHRpbmdzLmVsZW1lbnR9ID4gc3ZnIHtcclxuXHRcdFx0XHR3aWR0aDogJHt0aGlzLnNldHRpbmdzLndpZHRofTtcclxuXHRcdFx0XHRoZWlnaHQ6ICR7dGhpcy5zZXR0aW5ncy5oZWlnaHR9O1xyXG5cdFx0XHRcdHRyYW5zaXRpb246IGZpbGwgMC4zcztcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0JHt0aGlzLnNldHRpbmdzLmVsZW1lbnR9ID4gc3ZnOmhvdmVyIHtcclxuXHRcdFx0XHRmaWxsOiAke3RoaXMuc2V0dGluZ3MuaG92ZXJfY29sb3J9O1xyXG5cdFx0XHRcdHRyYW5zaXRpb246IGZpbGwgMC4zcztcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0JHt0aGlzLnNldHRpbmdzLmVsZW1lbnR9LnRvcC1yaWdodCxcclxuXHRcdFx0JHt0aGlzLnNldHRpbmdzLmVsZW1lbnR9LnJpZ2h0LXRvcCB7XHJcblx0XHRcdFx0cmlnaHQ6IDEwcHg7XHJcblx0XHRcdFx0dG9wOiAxMHB4O1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHQke3RoaXMuc2V0dGluZ3MuZWxlbWVudH0ubGVmdC10b3AsXHJcblx0XHRcdCR7dGhpcy5zZXR0aW5ncy5lbGVtZW50fS50b3AtbGVmdCB7XHJcblx0XHRcdFx0bGVmdDogMTBweDtcclxuXHRcdFx0XHR0b3A6IDEwcHg7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdCR7dGhpcy5zZXR0aW5ncy5lbGVtZW50fSA+ICNwcmV2aWV3IHtcclxuXHRcdFx0XHRwb3NpdGlvbjogJHtwb3NpdGlvbn07XHJcblx0XHRcdFx0ei1pbmRleDogOTk5OTtcclxuXHRcdFx0XHR0b3A6IGNhbGMoMTBweCArICR7dGhpcy5zZXR0aW5ncy5oZWlnaHR9KTtcclxuXHRcdFx0XHR0cmFuc2Zvcm06IHRyYW5zbGF0ZVgoNjBweCk7XHJcblx0XHRcdFx0aGVpZ2h0OiA0MDBweDtcclxuXHRcdFx0XHR3aWR0aDogMzAwcHg7XHJcblx0XHRcdFx0Ym9yZGVyOiAxcHggc29saWQgI2U0ZTRlNDtcclxuXHRcdFx0XHRiYWNrZ3JvdW5kOiAjZmZmZmZmO1xyXG5cdFx0XHRcdHRyYW5zaXRpb246IHRyYW5zZm9ybSAxcywgdmlzaWJpbGl0eSAxcztcclxuXHRcdFx0XHRjdXJzb3I6IGRlZmF1bHQ7XHJcblx0XHRcdFx0b3ZlcmZsb3ctWTogc2Nyb2xsO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHQke3RoaXMuc2V0dGluZ3MuZWxlbWVudH0gPiAjcHJldmlldy5vcGVuZWQge1xyXG5cdFx0XHRcdHZpc2liaWxpdHk6IHZpc2libGU7XHJcblx0XHRcdFx0dHJhbnNmb3JtOiB0cmFuc2xhdGVYKC0yNDBweCk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdCR7dGhpcy5zZXR0aW5ncy5lbGVtZW50fSA+ICNwcmV2aWV3LmNsb3NlZCB7XHJcblx0XHRcdFx0dmlzaWJpbGl0eTogaGlkZGVuO1xyXG5cdFx0XHRcdHRyYW5zZm9ybTogdHJhbnNsYXRlWCg2MHB4KTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0JHt0aGlzLnNldHRpbmdzLmVsZW1lbnR9ID4gI3ByZXZpZXcgPiB1bC5pdGVtcyxcclxuXHRcdFx0JHt0aGlzLnNldHRpbmdzLmVsZW1lbnR9ID4gI3ByZXZpZXcgPiB1bC5pdGVtcyA+IGxpLml0ZW0ge1xyXG5cdFx0XHRcdGNvbG9yOiAjMDAwMDAwO1xyXG5cdFx0XHRcdGxpc3Qtc3R5bGUtdHlwZTogbm9uZTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0LmNhcnQtbG9hZGVyLW92ZXJsYXkge1xyXG5cdFx0XHRcdHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuXHRcdFx0XHR0b3A6IDA7XHJcblx0XHRcdFx0bGVmdDogMDtcclxuXHRcdFx0XHRiYWNrZ3JvdW5kOiAjZmZmZmZmO1xyXG5cdFx0XHRcdHdpZHRoOiAxMDAlO1xyXG5cdFx0XHRcdGhlaWdodDogMTAwJTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0LmNhcnQtbG9hZGVyLW92ZXJsYXkgLmNhcnQtbG9hZGVyIHtcclxuXHRcdFx0XHRwb3NpdGlvbjogYWJzb2x1dGU7XHJcblx0XHRcdFx0d2lkdGg6IDUwcHg7XHJcblx0XHRcdFx0aGVpZ2h0OiA1MHB4O1xyXG5cdFx0XHRcdG1hcmdpbi1sZWZ0OiAtMjVweDtcclxuXHRcdFx0XHRtYXJnaW4tdG9wOiAtMjVweDtcclxuXHRcdFx0XHRsZWZ0OiA1MCU7XHJcblx0XHRcdFx0cmlnaHQ6IDUwJTtcclxuXHRcdFx0XHR0b3A6IDUwJTtcclxuXHRcdFx0XHRib3R0b206IDUwJTtcclxuXHRcdFx0fVxyXG5cdFx0YDtcclxuXHQgICAgXHJcblx0ICAgIERPTS5hZGRTdHlsZSgnZUNvbW1lcmNlLUNhcnQnLCBjc3MpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQ3JlYXRlcyBhbiBsb2FkaW5nIG92ZXJsYXkuXHJcblx0ICovXHJcblx0bG9hZGluZ092ZXJsYXkoKVxyXG5cdHtcclxuXHRcdGlmIChsb2FkaW5nT3ZlcmxheSkge1xyXG5cdFx0XHRyZXR1cm4gbG9hZGluZ092ZXJsYXk7XHJcblx0XHR9XHJcblxyXG5cdFx0bGV0IGxvYWRlciA9IERPTS5jcmVhdGVFbGVtZW50KCdpbWcnLCB7XHJcblx0XHRcdHNyYzogdGhpcy5zZXR0aW5ncy5sb2FkZXIsXHJcblx0XHRcdGNsYXNzOiAnY2FydC1sb2FkZXInXHJcblx0XHR9KTtcclxuXHJcblx0XHRsb2FkaW5nT3ZlcmxheSA9IERPTS5jcmVhdGVFbGVtZW50KCdkaXYnLCB7XHJcblx0XHRcdGNsYXNzOiAnY2FydC1sb2FkZXItb3ZlcmxheSdcclxuXHRcdH0pO1xyXG5cclxuXHRcdGxvYWRpbmdPdmVybGF5LmFwcGVuZENoaWxkKGxvYWRlcik7XHJcblxyXG5cdFx0cmV0dXJuIGxvYWRpbmdPdmVybGF5O1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogTG9hZGluZyB0aGUgY2FydCBwcmV2aWV3LlxyXG5cdCAqL1xyXG5cdHByZXZpZXdTdGFydExvYWRpbmcoKVxyXG5cdHtcclxuXHRcdHRoaXMucHJldmlld0VsZW1lbnQuYXBwZW5kQ2hpbGQodGhpcy5sb2FkaW5nT3ZlcmxheSgpKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIExvYWRpbmcgdGhlIGNhcnQgcHJldmlldy5cclxuXHQgKi9cclxuXHRwcmV2aWV3U3RvcExvYWRpbmcoKVxyXG5cdHtcclxuXHRcdGlmIChET00uZmluZCh0aGlzLnByZXZpZXdFbGVtZW50LCAnLmNhcnQtbG9hZGVyLW92ZXJsYXknKSkge1xyXG5cdFx0XHR0aGlzLnByZXZpZXdFbGVtZW50LnJlbW92ZUNoaWxkKHRoaXMubG9hZGluZ092ZXJsYXkoKSk7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBSZWxvYWRzIHRoZSBpdGVtcyBpbiB0aGUgY2FydCBwcmV2aWV3LlxyXG5cdCAqL1xyXG5cdHJlbG9hZENhcnRQcmV2aWV3KClcclxuXHR7XHJcblxyXG5cdFx0dGhpcy5wcmV2aWV3U3RhcnRMb2FkaW5nKCk7XHJcblx0XHRsZXQgaXRlbXMgPSB0aGlzLmdldENhcnRJdGVtcygpO1xyXG5cdFx0dGhpcy5hZGRUb1ByZXZpZXcoaXRlbXMpO1xyXG5cdFx0XHJcblx0XHRsZXQgaW5zdGFuY2UgPSB0aGlzO1xyXG5cclxuXHRcdHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XHJcblx0XHRcdGluc3RhbmNlLnByZXZpZXdTdG9wTG9hZGluZy5jYWxsKGluc3RhbmNlKTtcclxuXHRcdH0sIDIwMDApO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQmluZHMgZXZlbnQgbGlzdGVuZXJzIHRvIHRoZSBjYXJ0IGljb24uXHJcblx0ICovXHJcblx0YmluZEV2ZW50TGlzdGVuZXJzKClcclxuXHR7XHJcblx0XHRpZih0aGlzLnN2Z0ljb24gPT0gbnVsbCkge1xyXG5cdFx0XHRyZXR1cm47XHJcblx0XHR9XHJcblxyXG5cdFx0dGhpcy5zdmdJY29uLm9uY2xpY2sgPSBmdW5jdGlvbihlKSB7XHJcblx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcclxuXHRcdFx0bGV0IG9wZW5pbmcgPSBET00udG9nZ2xlQ2xhc3ModGhpcy5wcmV2aWV3RWxlbWVudCwgJ29wZW5lZCcsICdjbG9zZWQnKTtcclxuXHRcdFx0XHJcblx0XHRcdGlmIChvcGVuaW5nKSB7XHJcblx0XHRcdFx0dGhpcy5yZWxvYWRDYXJ0UHJldmlldygpO1x0XHJcblx0XHRcdH1cclxuXHRcdH0uYmluZCh0aGlzKTtcclxuXHJcblx0XHRFdmVudC5saXN0ZW4oJ1Byb2R1Y3RXYXNBZGRlZCcsIGZ1bmN0aW9uKGF0dHJpYnV0ZXMpIHtcclxuXHRcdFx0bGV0IGNhcnQgPSBDb29raWUuZ2V0KHRoaXMuc2V0dGluZ3MuY29va2llX25hbWUpO1xyXG5cdFx0XHRjYXJ0Lml0ZW1zLnB1c2goYXR0cmlidXRlcyk7XHJcblx0XHRcdENvb2tpZS5zZXQodGhpcy5zZXR0aW5ncy5jb29raWVfbmFtZSwgY2FydCk7XHJcblx0XHRcdHRoaXMucmVsb2FkQ2FydFByZXZpZXcoKTtcclxuXHRcdH0uYmluZCh0aGlzKSk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBSZXRyaWV2ZSB0aGUgY2FydHMgaXRlbXMgZnJvbSB0aGUgY29va2llLlxyXG5cdCAqL1xyXG5cdGdldENhcnRJdGVtcygpXHJcblx0e1xyXG5cdFx0bGV0IGNhcnQgPSBDb29raWUuZ2V0KHRoaXMuc2V0dGluZ3MuY29va2llX25hbWUpO1xyXG5cclxuXHRcdHJldHVybiAoY2FydCkgPyBjYXJ0Lml0ZW1zIDogW107XHJcblx0fVxyXG59XHJcblxyXG5mdW5jdGlvbiBjbG9zZShldmVudCkge1xyXG5cdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcblx0RE9NLnN3aXRjaENsYXNzZXModGhpcy5wcmV2aWV3RWxlbWVudCwgJ29wZW5lZCcsICdjbG9zZWQnKTtcclxufVxyXG5cclxuZnVuY3Rpb24gY3JlYXRlSWNvbigpIHtcclxuXHRsZXQgc3ZnID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKFwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiwgXCJzdmdcIik7XHJcblx0bGV0IGcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50TlMoXCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiLCBcImdcIik7XHJcblx0bGV0IHBhdGggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50TlMoXCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiLCBcInBhdGhcIik7XHJcblxyXG5cdHN2Zy5zZXRBdHRyaWJ1dGUoJ3ZlcnNpb24nLCAnMS4xJyk7XHJcblx0c3ZnLnNldEF0dHJpYnV0ZSgneG1sbnMnLCAnaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnKTtcclxuXHRzdmcuc2V0QXR0cmlidXRlKCd4bWxuczp4bGluaycsICdodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rJyk7XHJcblx0c3ZnLnNldEF0dHJpYnV0ZSgneCcsICcwcHgnKTtcclxuXHRzdmcuc2V0QXR0cmlidXRlKCd5JywgJzBweCcpO1xyXG5cdHN2Zy5zZXRBdHRyaWJ1dGUoJ3dpZHRoJywgJzQ0Ni44NDNweCcpO1xyXG5cdHN2Zy5zZXRBdHRyaWJ1dGUoJ2hlaWdodCcsICc0NDYuODQzcHgnKTtcclxuXHRzdmcuc2V0QXR0cmlidXRlKCd2aWV3Qm94JywgJzAgMCA0NDYuODQzIDQ0Ni44NDMnKTtcclxuXHRzdmcuc2V0QXR0cmlidXRlKCdzdHlsZScsICdlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDQ0Ni44NDMgNDQ2Ljg0MzsnKTtcclxuXHRzdmcuc2V0QXR0cmlidXRlKCd4bWw6c3BhY2UnLCAncHJlc2VydmUnKTtcclxuXHJcblx0cGF0aC5zZXRBdHRyaWJ1dGUoJ2QnLCAnTTQ0NC4wOSw5My4xMDNjLTIuNjk4LTMuNjk5LTcuMDA2LTUuODg4LTExLjU4NC01Ljg4OEgxMDkuOTJjLTAuNjI1LDAtMS4yNDksMC4wMzgtMS44NSwwLjExOWwtMTMuMjc2LTM4LjI3Yy0xLjM3Ni0zLjk1OC00LjQwNi03LjExMy04LjMtOC42NDZMMTkuNTg2LDE0LjEzNGMtNy4zNzQtMi44ODctMTUuNjk1LDAuNzM1LTE4LjU5MSw4LjFjLTIuODkxLDcuMzY5LDAuNzMsMTUuNjk1LDguMSwxOC41OTFsNjAuNzY4LDIzLjg3Mmw3NC4zODEsMjE0LjM5OWMtMy4yODMsMS4xNDQtNi4wNjUsMy42NjMtNy4zMzIsNy4xODdsLTIxLjUwNiw1OS43MzljLTEuMzE4LDMuNjYzLTAuNzc1LDcuNzMzLDEuNDY4LDEwLjkxNmMyLjI0LDMuMTgzLDUuODgzLDUuMDc4LDkuNzczLDUuMDc4aDExLjA0NGMtNi44NDQsNy42MTYtMTEuMDQ0LDE3LjY0Ni0xMS4wNDQsMjguNjc1YzAsMjMuNzE4LDE5LjI5OCw0My4wMTIsNDMuMDEyLDQzLjAxMnM0My4wMTItMTkuMjk0LDQzLjAxMi00My4wMTJjMC0xMS4wMjktNC4yLTIxLjA1OS0xMS4wNDQtMjguNjc1aDkzLjc3NmMtNi44NDcsNy42MTYtMTEuMDQ4LDE3LjY0Ni0xMS4wNDgsMjguNjc1YzAsMjMuNzE4LDE5LjI5NCw0My4wMTIsNDMuMDEzLDQzLjAxMmMyMy43MTgsMCw0My4wMTItMTkuMjk0LDQzLjAxMi00My4wMTJjMC0xMS4wMjktNC4yLTIxLjA1OS0xMS4wNDMtMjguNjc1aDEzLjQzM2M2LjU5OSwwLDExLjk0Ny01LjM0OSwxMS45NDctMTEuOTQ4YzAtNi41OTktNS4zNDktMTEuOTQ3LTExLjk0Ny0xMS45NDdIMTQzLjY0N2wxMy4zMTktMzYuOTk2YzEuNzIsMC43MjQsMy41NzgsMS4xNTIsNS41MjMsMS4xNTJoMjEwLjI3OGM2LjIzNCwwLDExLjc1MS00LjAyNywxMy42NS05Ljk1OWw1OS43MzktMTg2LjM4N0M0NDcuNTU3LDEwMS41NjcsNDQ2Ljc4OCw5Ni44MDIsNDQ0LjA5LDkzLjEwM3ogTTE2OS42NTksNDA5LjgwN2MtMTAuNTQzLDAtMTkuMTE2LTguNTczLTE5LjExNi0xOS4xMTZzOC41NzMtMTkuMTE3LDE5LjExNi0xOS4xMTdzMTkuMTE2LDguNTc0LDE5LjExNiwxOS4xMTdTMTgwLjIwMiw0MDkuODA3LDE2OS42NTksNDA5LjgwN3ogTTMyNy4zNjcsNDA5LjgwN2MtMTAuNTQzLDAtMTkuMTE3LTguNTczLTE5LjExNy0xOS4xMTZzOC41NzQtMTkuMTE3LDE5LjExNy0xOS4xMTdjMTAuNTQyLDAsMTkuMTE2LDguNTc0LDE5LjExNiwxOS4xMTdTMzM3LjkwOSw0MDkuODA3LDMyNy4zNjcsNDA5LjgwN3ogTTQwMi41MiwxNDguMTQ5aC03My4xNjFWMTE1Ljg5aDgzLjQ5OUw0MDIuNTIsMTQ4LjE0OXogTTM4MS40NTMsMjEzLjg2MWgtNTIuMDk0di0zNy4wMzhoNjMuOTY3TDM4MS40NTMsMjEzLjg2MXogTTIzNC41NzEsMjEzLjg2MXYtMzcuMDM4aDY2LjExM3YzNy4wMzhIMjM0LjU3MXogTTMwMC42ODQsMjQyLjUzOHYzMS4wNjRoLTY2LjExM3YtMzEuMDY0SDMwMC42ODR6IE0xMzkuMTE1LDE3Ni44MjNoNjYuNzg0djM3LjAzOGgtNTMuOTMzTDEzOS4xMTUsMTc2LjgyM3ogTTIzNC41NzEsMTQ4LjE0OVYxMTUuODloNjYuMTEzdjMyLjI1OUgyMzQuNTcxeiBNMjA1Ljg5OCwxMTUuODl2MzIuMjU5aC03Ni43MzRsLTExLjE5MS0zMi4yNTlIMjA1Ljg5OHogTTE2MS45MTYsMjQyLjUzOGg0My45ODJ2MzEuMDY0aC0zMy4yMDZMMTYxLjkxNiwyNDIuNTM4eiBNMzI5LjM1OSwyNzMuNjAzdi0zMS4wNjRoNDIuOTA5bC05Ljk1NSwzMS4wNjRIMzI5LjM1OXonKTtcclxuXHJcblx0Zy5hcHBlbmRDaGlsZChwYXRoKTtcclxuXHRzdmcuYXBwZW5kQ2hpbGQoZyk7XHJcblxyXG5cdHJldHVybiBzdmc7XHJcbn1cblxubGV0IGluaXRhbGl6ZWQgPSBmYWxzZTtcblxubGV0IGRlZmF1bHRTZXR0aW5ncyA9IHtcblx0aW1wb3J0Qm9vdHN0cmFwOiBmYWxzZSxcblx0Y29tcG9uZW50czogWydQcm9kdWN0cycsICdTZXJ2aWNlcycsICdGaWx0ZXInLCAnUGFnaW5hdGlvbicsICdDYXJ0J11cbn07XG5cbmNsYXNzIGVDb21tZXJjZVxue1xuXHRjb25zdHJ1Y3RvcihzZXR0aW5ncylcblx0e1xuXHRcdEV4Y2VwdGlvbkhhbmRsZXIuaW5pdGFsaXplKCk7XG5cblx0XHRpZih0eXBlb2Ygc2V0dGluZ3MgIT0gJ29iamVjdCcpIHtcblx0XHRcdHRocm93IG5ldyBJbnZhbGlkQXJndW1lbnRFeGNlcHRpb24kMTtcblx0XHR9XG5cblx0XHR0aGlzLmNvbnRhaW5lciA9IG5ldyBDb250YWluZXI7XG5cdFx0dGhpcy5zZXR0aW5ncyA9IENvbW1vbi5leHRlbmQoZGVmYXVsdFNldHRpbmdzLCBzZXR0aW5ncyk7XG5cdFx0XG5cdFx0YmluZENvbXBvbmVudHNEZXBlbmRlbmNpZXMuY2FsbCh0aGlzLCBzZXR0aW5ncy5jb21wb25lbnRzKTtcblxuXHRcdGluaXRhbGl6ZWQgPSB0cnVlO1xuXG5cdFx0cmV0dXJuIG5ldyBQcm94eSh0aGlzLCB7XG5cdFx0XHRnZXQ6IGZ1bmN0aW9uKHRhcmdldCwgb2JqZWN0KSB7XG5cdFx0XHRcdGlmKCEgQ29tbW9uLmluX2FycmF5KG9iamVjdCwgc2V0dGluZ3MuY29tcG9uZW50cykpIHtcblx0XHRcdFx0XHR0aHJvdyBuZXcgQ29tcG9uZW50Tm90UmVnaXN0ZXJlZEV4Y2VwdGlvbjtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdHJldHVybiB0YXJnZXQuY29udGFpbmVyLm1ha2Uob2JqZWN0KTtcblx0XHRcdH1cblx0XHR9KTtcblx0fVxufVxuXG4vKipcbiAqIEJpbmRzIGNvbXBvbmVudHMgZGVwZW5kZW5jaWVzLlxuICovXG5mdW5jdGlvbiBiaW5kQ29tcG9uZW50c0RlcGVuZGVuY2llcyhjb21wb25lbnRzKSB7XG5cdHRoaXMuY29udGFpbmVyLmJpbmQoJ0ZpbHRlcicsIGZ1bmN0aW9uKGNvbnRhaW5lcikge1xuXHRcdGNvbnRhaW5lclsnRmlsdGVyJ10uYm9vdGVkID0gdHJ1ZTtcblx0XHRyZXR1cm4gbmV3IEZpbHRlcihjb250YWluZXIpO1xuXHR9KTtcblx0XG5cdHRoaXMuY29udGFpbmVyLmJpbmQoJ1NlcnZpY2VzJywgZnVuY3Rpb24oY29udGFpbmVyKSB7IFxuXHRcdGNvbnRhaW5lclsnU2VydmljZXMnXS5ib290ZWQgPSB0cnVlO1xuXHRcdHJldHVybiBuZXcgU2VydmljZXMoY29udGFpbmVyKTtcblx0fSk7XG5cblx0dGhpcy5jb250YWluZXIuYmluZCgnUHJvZHVjdHMnLCBmdW5jdGlvbihjb250YWluZXIpIHtcblx0XHRjb250YWluZXJbJ1Byb2R1Y3RzJ10uYm9vdGVkID0gdHJ1ZTtcblx0XHRyZXR1cm4gbmV3IFByb2R1Y3RzKGNvbnRhaW5lcik7XG5cdH0pO1xuXG5cdHRoaXMuY29udGFpbmVyLmJpbmQoJ1BhZ2luYXRpb24nLCBmdW5jdGlvbihjb250YWluZXIpIHtcblx0XHRjb250YWluZXJbJ1BhZ2luYXRpb24nXS5ib290ZWQgPSB0cnVlO1xuXHRcdHJldHVybiBuZXcgUGFnaW5hdGlvbihjb250YWluZXIsIGNvbnRhaW5lci5tYWtlKCdQcm9kdWN0cycpKTtcblx0fSk7XG5cblx0dGhpcy5jb250YWluZXIuYmluZCgnQ2FydCcsIGZ1bmN0aW9uKGNvbnRhaW5lcikge1xuXHRcdGNvbnRhaW5lclsnQ2FydCddLmJvb3RlZCA9IHRydWU7XG5cdFx0cmV0dXJuIG5ldyBDYXJ0KGNvbnRhaW5lcik7XG5cdH0pO1xuXG5cdHRoaXMuY29udGFpbmVyWydGaWx0ZXInXVsnYm9vdGVkJ10gPSBmYWxzZTtcblx0dGhpcy5jb250YWluZXJbJ1NlcnZpY2VzJ11bJ2Jvb3RlZCddID0gZmFsc2U7XG5cdHRoaXMuY29udGFpbmVyWydQcm9kdWN0cyddWydib290ZWQnXSA9IGZhbHNlO1xuXHR0aGlzLmNvbnRhaW5lclsnUGFnaW5hdGlvbiddWydib290ZWQnXSA9IGZhbHNlO1xuXHR0aGlzLmNvbnRhaW5lclsnQ2FydCddWydib290ZWQnXSA9IGZhbHNlO1xufVxuXG5yZXR1cm4gZUNvbW1lcmNlO1xuXG59KCkpO1xuIl19
