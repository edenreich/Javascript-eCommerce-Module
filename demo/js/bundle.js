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
					Container$3.getInstance('Cart').addItem(attributes);
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

				Event.listen('ProductWasAdded', function (attributes) {
					this.addToPreview(attributes);
				}.bind(this));
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
			value: function addToPreview(item) {
				var li = DOM.createElement('li', {
					class: 'item'
				});

				for (var attribute in item) {
					var span = DOM.createElement('span', {
						text: item[attribute]
					});

					li.appendChild(span);
				}

				this.previewElement.querySelector('.items').appendChild(li);
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

				var css = '\n\t\t\t' + this.settings.element + ' {\n\t\t\t\tposition: ' + position + ';\n\t\t\t\tcursor: pointer;\n\t\t\t\tcolor: #ffffff;\n\t\t\t\tz-index: 998;\n\t\t\t}\n\n\t\t\t' + this.settings.element + ' > svg {\n\t\t\t\twidth: ' + this.settings.width + ';\n\t\t\t\theight: ' + this.settings.height + ';\n\t\t\t\ttransition: fill 0.3s;\n\t\t\t}\n\n\t\t\t' + this.settings.element + ' > svg:hover {\n\t\t\t\tfill: ' + this.settings.hover_color + ';\n\t\t\t\ttransition: fill 0.3s;\n\t\t\t}\n\n\t\t\t' + this.settings.element + '.top-right,\n\t\t\t' + this.settings.element + '.right-top {\n\t\t\t\tright: 10px;\n\t\t\t\ttop: 10px;\n\t\t\t}\n\n\t\t\t' + this.settings.element + '.left-top,\n\t\t\t' + this.settings.element + '.top-left {\n\t\t\t\tleft: 10px;\n\t\t\t\ttop: 10px;\n\t\t\t}\n\n\t\t\t' + this.settings.element + ' > #preview {\n\t\t\t\tposition: ' + position + ';\n\t\t\t\tz-index: 9999;\n\t\t\t\ttop: calc(10px + ' + this.settings.height + ');\n\t\t\t\ttransform: translateX(60px);\n\t\t\t\theight: 400px;\n\t\t\t\twidth: 300px;\n\t\t\t\tborder: 1px solid #e4e4e4;\n\t\t\t\tbackground: #ffffff;\n\t\t\t\ttransition: transform 1s, visibility 1s;\n\t\t\t}\n\n\t\t\t' + this.settings.element + ' > #preview.opened {\n\t\t\t\tvisibility: visible;\n\t\t\t\ttransform: translateX(-240px);\n\t\t\t}\n\n\t\t\t' + this.settings.element + ' > #preview.closed {\n\t\t\t\tvisibility: hidden;\n\t\t\t\ttransform: translateX(60px);\n\t\t\t}\n\n\t\t\t' + this.settings.element + ' > #preview > ul.items,\n\t\t\t' + this.settings.element + ' > #preview > ul.items > li.item {\n\t\t\t\tcolor: #000000;\n\t\t\t\tlist-style-type: none;\n\t\t\t}\n\t\t';

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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVDb21tZXJjZS5qcyJdLCJuYW1lcyI6WyJlQ29tbWVyY2UiLCJJbnZhbGlkQXJndW1lbnRFeGNlcHRpb24kMSIsImNvbnNvbGUiLCJlcnJvciIsIkVycm9yIiwiRE9NIiwic3RyaW5nIiwicmVwbGFjZSIsImVsZW1lbnQiLCJjbGFzc05hbWUiLCJuZXdDbGFzc05hbWUiLCJyZW1vdmVDbGFzcyIsImFkZENsYXNzIiwidW5kZWZpbmVkIiwiY2xhc3NOYW1lcyIsInNwbGl0IiwiZm9yRWFjaCIsIm5hbWUiLCJjbGFzc0xpc3QiLCJhZGQiLCJyZW1vdmUiLCJzZWxlY3RvciIsInF1ZXJ5RWxlbWVudCIsImNhbGwiLCJkb2N1bWVudCIsImlkIiwiY3NzIiwiaGVhZCIsImdldEVsZW1lbnRzQnlUYWdOYW1lIiwic3R5bGVUYWciLCJjcmVhdGVFbGVtZW50IiwiQ1NTIiwibWluaWZ5Q3NzIiwiaW5uZXJIVE1MIiwic2V0QXR0cmlidXRlIiwiYXBwZW5kQ2hpbGQiLCJlbGVtZW50VHlwZSIsIm9wdGlvbnMiLCJvcHRpb24iLCJzZWNvbmRDbGFzc05hbWUiLCJ0b2dnbGUiLCJwYXJlbnQiLCJxdWVyeVNlbGVjdG9yQWxsIiwibGVuZ3RoIiwiZXZlbnRzIiwiRXZlbnQiLCJjYWxsYmFjayIsIkludmFsaWRBcmd1bWVudEV4Y2VwdGlvbiIsInB1c2giLCJkYXRhIiwiQmFkRXZlbnRDYWxsRXhjZXB0aW9uIiwiQ29tbW9uIiwiY3VycmVudE9iaiIsIm5ld09iaiIsImV4dGVuZGVkIiwicHJvcCIsIk9iamVjdCIsInByb3RvdHlwZSIsImhhc093blByb3BlcnR5IiwibmVlZGxlIiwiaHlzdGFjayIsImNvbnN0cnVjdG9yIiwiQXJyYXkiLCJpIiwib2JqZWN0IiwiSW52YWxpZEJpbmRpbmdFeGNlcHRpb24iLCJpbnN0YW5jZXMiLCJDb250YWluZXIiLCJrZXkiLCJjb25jcmV0ZSIsImJpbmQiLCJpbnN0YW5jZSIsImluc3RhbmNlRXhpc3QiLCJnZXRJbnN0YW5jZSIsInNldEluc3RhbmNlIiwiQ29tcG9uZW50c0V4Y2VwdGlvbiIsIkJhZEV2ZW50Q2FsbEV4Y2VwdGlvbiQxIiwiTm90SW5QYWdlUmFuZ2VFeGNlcHRpb24iLCJDb21wb25lbnROb3RSZWdpc3RlcmVkRXhjZXB0aW9uIiwiRXhjZXB0aW9uSGFuZGxlciIsIndpbmRvdyIsIm9uZXJyb3IiLCJtZXNzYWdlIiwic291cmNlIiwibGluZW5vIiwiY29sbm8iLCJkZWZhdWx0U2V0dGluZ3MkMSIsImNsYXNzIiwid2lkdGgiLCJoZWlnaHQiLCJDb250YWluZXIkMiIsIkZpbHRlciIsImNvbnRhaW5lciIsInNldHRpbmdzIiwiZXh0ZW5kIiwic2V0RWxlbWVudCIsIndyYXBwZXIiLCJTdHIiLCJ0b0xvd2VyQ2FzZSIsInBvc3NpYmxlIiwiY2hhckF0IiwiTWF0aCIsImZsb29yIiwicmFuZG9tIiwiZGVmYXVsdFNldHRpbmdzJDIiLCJpdGVtX2NsYXNzIiwiYWRkX2J1dHRvbl9jbGFzcyIsImZhdm9yaXRlX2J1dHRvbl9jbGFzcyIsImF0dHJpYnV0ZXMiLCJ1cmwiLCJDb250YWluZXIkMyIsIlByb2R1Y3RzIiwiYWRkRXZlbnRMaXN0ZW5lciIsImFkZFN0eWxlVGFnIiwiUGFnaW5hdGlvbiIsImJvb3RlZCIsImdldFByb2R1Y3RzQnlQYWdlIiwidGhlbiIsInByb2R1Y3RzIiwicmVwbGFjZUl0ZW1zIiwibG9hZEFsbFByb2R1Y3RzIiwicmVxdWVzdCIsImdldFByb2R1Y3RzIiwiaXRlbXMiLCJ0cmlnZ2VyIiwiY2F0Y2giLCJpc0FycmF5IiwiYnVpbGRQcm9kdWN0cyIsInByb2R1Y3QiLCJhc2tTZXJ2ZXIiLCJwYWdlTnVtYmVyIiwiUHJvbWlzZSIsInJlc29sdmUiLCJyZWplY3QiLCJ4aHIiLCJYTUxIdHRwUmVxdWVzdCIsIkFjdGl2ZVhPYmplY3QiLCJvcGVuIiwic2V0UmVxdWVzdEhlYWRlciIsIm9ucmVhZHlzdGF0ZWNoYW5nZSIsInJlYWR5U3RhdGUiLCJzdGF0dXMiLCJjdXJyZW50SXRlbXMiLCJyZXNwb25zZVRleHQiLCJKU09OIiwicGFyc2UiLCJBZnRlckxvYWRlZCIsInN0YXR1c1RleHQiLCJzZW5kIiwiYXR0cmlidXRlc0NvbGxlY3Rpb24iLCJ0YWdUeXBlIiwiYnVpbHRQcm9kdWN0cyIsImJ1aWx0UHJvZHVjdCIsImJ1aWxkUHJvZHVjdCIsIm92ZXJsYXkiLCJhdHRyaWJ1dGUiLCJpbl9hcnJheSIsInRhZyIsImltYWdlIiwic3JjIiwia2ViYWJDYXNlIiwiYWRkVG9DYXJ0IiwidHlwZSIsInRleHQiLCJmYXZvcml0ZSIsImV2ZW50IiwicHJldmVudERlZmF1bHQiLCJhZGRJdGVtIiwiYWRkU3R5bGUiLCJTZXJ2aWNlcyIsImRlZmF1bHRTZXR0aW5ncyQzIiwicGVyX3BhZ2UiLCJ0b3RhbF9pdGVtcyIsIkNvbnRhaW5lciQ0IiwiUHJvZHVjdHMkMiIsInNldEN1cnJlbnQiLCJ0b3RhbFBhZ2VzIiwiY2FsY3VsYXRlVG90YWxQYWdlcyIsInJlcGxhY2VMaW5rcyIsImxpbmtzIiwiY3JlYXRlTGlua3MiLCJiaW5kRXZlbnRMaXN0ZW5lcnMiLCJwZXJQYWdlIiwidG90YWxJdGVtcyIsInBhcnNlSW50IiwiY2VpbCIsIm5leHQiLCJjaGlsZE5vZGVzIiwib25jbGljayIsInJlcXVlc3RlZFBhZ2UiLCJjdXJyZW50Iiwibm90SW5QYWdlUmFuZ2UiLCJwcmV2aW91cyIsInBhZ2VzIiwiZ2V0QXR0cmlidXRlIiwiY2hhbmdlVXJsIiwic2V0QWN0aXZlTGluayIsInVsIiwiY3JlYXRlUGFnZUxpbmtzIiwiY3JlYXRlUHJldmlvdXNCdXR0b24iLCJjcmVhdGVOZXh0QnV0dG9uIiwicGFnZSIsInBhZ2VJdGVtIiwibGluayIsImxpIiwic3BhbjEiLCJzcGFuMiIsImlzTmFOIiwiR0VUX1ZhcnMiLCJoaXN0b3J5IiwicmVwbGFjZVN0YXRlIiwidXBkYXRlVVJMUGFyYW1ldGVyIiwibG9jYXRpb24iLCJocmVmIiwidmFycyIsInBhcnRzIiwibSIsInZhbHVlIiwicGFyYW0iLCJwYXJhbVZhbCIsIm5ld0FkZGl0aW9uYWxVUkwiLCJ0ZW1wQXJyYXkiLCJiYXNlVVJMIiwiYWRkaXRpb25hbFVSTCIsInRlbXAiLCJyb3dzVGV4dCIsIkNvb2tpZSIsImRheXMiLCJzdHJpbmdpZnkiLCJleHBpcmVzIiwiZGF0ZSIsIkRhdGUiLCJzZXRUaW1lIiwiZ2V0VGltZSIsInRvR01UU3RyaW5nIiwiY29va2llIiwiY19zdGFydCIsImluZGV4T2YiLCJjX2VuZCIsInVuZXNjYXBlIiwic3Vic3RyaW5nIiwiZGVmYXVsdFNldHRpbmdzJDQiLCJjb29raWVfbmFtZSIsInByZXZpZXdfY2xhc3MiLCJwbGFjZW1lbnQiLCJmaXhlZCIsImhvdmVyX2NvbG9yIiwiQ29udGFpbmVyJDUiLCJDYXJ0IiwicHJldmlld0VsZW1lbnQiLCJjcmVhdGVQcmV2aWV3RWxlbWVudCIsInN2Z0ljb24iLCJjcmVhdGVJY29uIiwiaXNFbXB0eSIsImdldCIsImNhcnQiLCJzZXRDYXJ0IiwibGlzdGVuIiwiYWRkVG9QcmV2aWV3IiwiZW1wdHlPYmplY3QiLCJmYXZvcml0ZXMiLCJzZXQiLCJpdGVtIiwic3BsaWNlIiwic3BhbiIsInF1ZXJ5U2VsZWN0b3IiLCJpY29uIiwicG9zaXRpb24iLCJ0b2dnbGVDbGFzcyIsImNsb3NlIiwic3dpdGNoQ2xhc3NlcyIsInN2ZyIsImNyZWF0ZUVsZW1lbnROUyIsImciLCJwYXRoIiwiaW5pdGFsaXplZCIsImRlZmF1bHRTZXR0aW5ncyIsImltcG9ydEJvb3RzdHJhcCIsImNvbXBvbmVudHMiLCJpbml0YWxpemUiLCJiaW5kQ29tcG9uZW50c0RlcGVuZGVuY2llcyIsIlByb3h5IiwidGFyZ2V0IiwibWFrZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFBQSxJQUFJQSxZQUFhLFlBQVk7QUFDN0I7O0FBRDZCLEtBR3ZCQywwQkFIdUI7QUFBQTs7QUFLNUIsd0NBQ0E7QUFBQTs7QUFBQTs7QUFFSUMsV0FBUUMsS0FBUjtBQUZKO0FBR0k7O0FBVHdCO0FBQUEsR0FHWUMsS0FIWjs7QUFBQSxLQVl2QkMsR0FadUI7QUFBQTtB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ZixDQUFvQixZQUFwQixFQUFrQyxVQUFTc0IsU0FBVCxFQUFvQjtBQUNyREEsYUFBVSxZQUFWLEVBQXdCdUIsTUFBeEIsR0FBaUMsSUFBakM7QUFDQSxVQUFPLElBQUlELFVBQUosQ0FBZXRCLFNBQWYsRUFBMEJBLFVBQVUrTCxJQUFWLENBQWUsVUFBZixDQUExQixDQUFQO0FBQ0EsR0FIRDs7QUFLQSxPQUFLL0wsU0FBTCxDQUFldEIsSUFBZixDQUFvQixNQUFwQixFQUE0QixVQUFTc0IsU0FBVCxFQUFvQjtBQUMvQ0EsYUFBVSxNQUFWLEVBQWtCdUIsTUFBbEIsR0FBMkIsSUFBM0I7QUFDQSxVQUFPLElBQUlxSSxJQUFKLENBQVM1SixTQUFULENBQVA7QUFDQSxHQUhEOztBQUtBLE9BQUtBLFNBQUwsQ0FBZSxRQUFmLEVBQXlCLFFBQXpCLElBQXFDLEtBQXJDO0FBQ0EsT0FBS0EsU0FBTCxDQUFlLFVBQWYsRUFBMkIsUUFBM0IsSUFBdUMsS0FBdkM7QUFDQSxPQUFLQSxTQUFMLENBQWUsVUFBZixFQUEyQixRQUEzQixJQUF1QyxLQUF2QztBQUNBLE9BQUtBLFNBQUwsQ0FBZSxZQUFmLEVBQTZCLFFBQTdCLElBQXlDLEtBQXpDO0FBQ0EsT0FBS0EsU0FBTCxDQUFlLE1BQWYsRUFBdUIsUUFBdkIsSUFBbUMsS0FBbkM7QUFDQTs7QUFFRCxRQUFPNUYsU0FBUDtBQUVDLENBem1EZ0IsRUFBakIiLCJmaWxlIjoiZUNvbW1lcmNlLmpzIiwic291cmNlc0NvbnRlbnQiOlsidmFyIGVDb21tZXJjZSA9IChmdW5jdGlvbiAoKSB7XG4ndXNlIHN0cmljdCc7XG5cbmNsYXNzIEludmFsaWRBcmd1bWVudEV4Y2VwdGlvbiQxIGV4dGVuZHMgRXJyb3Jcclxue1xyXG5cdGNvbnN0cnVjdG9yKCkgXHJcblx0eyBcclxuICAgIFx0c3VwZXIoKTtcclxuICAgIFx0Y29uc29sZS5lcnJvcihgSW52YWxpZEFyZ3VtZW50RXhjZXB0aW9uLCBhbiBpbnZhbGlkIGFyZ3VtZW50IHdhcyBwYXNzZWQuYCk7XHJcbiAgICB9XHJcbn1cblxuY2xhc3MgRE9NXHJcbntcclxuXHQvKipcclxuXHQgKiBNaW5pZmllcyB0aGUgY3NzIHRleHQuXHJcblx0ICovXHJcblx0c3RhdGljIG1pbmlmeUNzcyhzdHJpbmcpIFxyXG5cdHtcclxuXHQgICAgc3RyaW5nID0gc3RyaW5nLnJlcGxhY2UoL1xcL1xcKig/Oig/IVxcKlxcLylbXFxzXFxTXSkqXFwqXFwvfFtcXHJcXG5cXHRdKy9nLCAnJyk7XHJcblx0ICAgIHN0cmluZyA9IHN0cmluZy5yZXBsYWNlKC8gezIsfS9nLCAnICcpO1xyXG5cdCAgICBzdHJpbmcgPSBzdHJpbmcucmVwbGFjZSgvKFt7On1dKS9nLCAnJDEnKTtcclxuXHQgICAgc3RyaW5nID0gc3RyaW5nLnJlcGxhY2UoLyhbOyxdKSAvZywgJyQxJyk7XHJcblx0ICAgIHN0cmluZyA9IHN0cmluZy5yZXBsYWNlKC8gIS9nLCAnIScpO1xyXG5cdCAgICBcclxuXHQgICAgcmV0dXJuIHN0cmluZztcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFN3aXRjaGVzIGJldHdlZW4gdHdvIGdpdmVuIGNsYXNzZXMuXHJcblx0ICovXHJcblx0c3RhdGljIHN3aXRjaENsYXNzZXMoZWxlbWVudCwgY2xhc3NOYW1lLCBuZXdDbGFzc05hbWUpIFxyXG5cdHtcclxuXHRcdHRoaXMucmVtb3ZlQ2xhc3MoZWxlbWVudCwgY2xhc3NOYW1lKTtcclxuXHRcdHRoaXMuYWRkQ2xhc3MoZWxlbWVudCwgbmV3Q2xhc3NOYW1lKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEFkZHMgY2xhc3MgdG8gYSBnaXZlbiBlbGVtZW50LlxyXG5cdCAqL1xyXG5cdHN0YXRpYyBhZGRDbGFzcyhlbGVtZW50LCBjbGFzc05hbWUpIFxyXG5cdHtcclxuXHRcdGlmKGVsZW1lbnQgPT09IG51bGwpIHtcclxuXHRcdFx0dGhyb3cgbmV3IEludmFsaWRBcmd1bWVudEV4Y2VwdGlvbiQxO1xyXG5cdFx0fVxyXG5cclxuXHRcdGlmKCEgY2xhc3NOYW1lIHx8IGNsYXNzTmFtZSA9PSAnJyB8fCB0eXBlb2YgY2xhc3NOYW1lID09PSB1bmRlZmluZWQpIHtcclxuXHRcdFx0cmV0dXJuIGVsZW1lbnQ7XHJcblx0XHR9XHJcblxyXG5cdFx0bGV0IGNsYXNzTmFtZXMgPSBjbGFzc05hbWUuc3BsaXQoJyAnKTtcclxuXHJcblx0XHRjbGFzc05hbWVzLmZvckVhY2goZnVuY3Rpb24obmFtZSkge1xyXG5cdFx0XHRlbGVtZW50LmNsYXNzTGlzdC5hZGQobmFtZSk7XHJcblx0XHR9KTtcclxuXHRcdFxyXG5cdFx0cmV0dXJuIGVsZW1lbnQ7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBSZW1vdmVzIGNsYXNzIGZyb20gYSBnaXZlbiBlbGVtZW50LlxyXG5cdCAqL1xyXG5cdHN0YXRpYyByZW1vdmVDbGFzcyhlbGVtZW50LCBjbGFzc05hbWUpIFxyXG5cdHtcclxuXHRcdGlmKGVsZW1lbnQgPT0gbnVsbCkge1xyXG5cdFx0XHR0aHJvdyBuZXcgSW52YWxpZEFyZ3VtZW50RXhjZXB0aW9uJDE7XHJcblx0XHR9XHJcblxyXG5cdFx0aWYoY2xhc3NOYW1lID09ICcnKSB7XHJcblx0XHRcdGVsZW1lbnQuY2xhc3NOYW1lID0gJyc7XHJcblx0XHR9IGVsc2Uge1xyXG5cclxuXHRcdFx0bGV0IGNsYXNzTmFtZXMgPSBjbGFzc05hbWUuc3BsaXQoJyAnKTtcclxuXHJcblx0XHRcdGNsYXNzTmFtZXMuZm9yRWFjaChmdW5jdGlvbihuYW1lKSB7XHJcblx0XHRcdFx0ZWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKG5hbWUpO1xyXG5cdFx0XHR9KTtcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gZWxlbWVudDtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFF1ZXJpZXMgdGhlIGVsZW1lbnQgZnJvbSB0aGUgRE9NLlxyXG5cdCAqL1xyXG5cdHN0YXRpYyBlbGVtZW50KHNlbGVjdG9yKSBcclxuXHR7XHJcblx0XHRyZXR1cm4gcXVlcnlFbGVtZW50LmNhbGwodGhpcywgZG9jdW1lbnQsIHNlbGVjdG9yKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEFkZHMgc3R5bGUgdGFnIHdpdGggZ2l2ZW4gaWQgYW5kIGNzcyB0byB0aGUgRE9NLlxyXG5cdCAqL1xyXG5cdHN0YXRpYyBhZGRTdHlsZShpZCwgY3NzKSBcclxuXHR7XHJcblx0XHRpZih0eXBlb2YgY3NzICE9ICdzdHJpbmcnKSB7XHJcblx0XHRcdHRocm93IG5ldyBJbnZhbGlkQXJndW1lbnRFeGNlcHRpb24kMTtcclxuXHRcdH1cclxuXHJcblx0XHRsZXQgaGVhZCA9IGRvY3VtZW50LmhlYWQgfHwgZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2hlYWQnKVswXTtcclxuXHRcdGxldCBzdHlsZVRhZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3N0eWxlJyk7XHJcblxyXG5cdFx0Ly8gcGlwZSBpdCB0aHJvdWdoIHRoZSBtaW5maWVyXHJcblx0ICAgIGxldCBDU1MgPSB0aGlzLm1pbmlmeUNzcyhjc3MpO1xyXG5cdCAgICAvLyBhZGRpbmcgaXQgdG8gdGhlIHN0eWxldGFnXHJcblx0ICAgIHN0eWxlVGFnLmlubmVySFRNTCA9IENTUztcclxuXHQgICAgLy8gZ2l2ZSBhbiBpZCB0byByZWNvZ25pemUgdGhlIHN0eWxlIHRhZ1xyXG5cdFx0c3R5bGVUYWcuc2V0QXR0cmlidXRlKCdpZCcsIGlkKTtcclxuXHRcdC8vIGFwcGVuZGluZyB0aGF0IHN0eWxlIHRhZyB0byB0aGUgRE9NIGhlYWQgdGFnXHJcblx0XHRoZWFkLmFwcGVuZENoaWxkKHN0eWxlVGFnKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIENyZWF0ZXMgYW4gZWxlbWVudCB3aXRoIHRoZSBnaXZlbiBvcHRpb25zLlxyXG5cdCAqL1xyXG5cdHN0YXRpYyBjcmVhdGVFbGVtZW50KGVsZW1lbnRUeXBlLCBvcHRpb25zKVxyXG5cdHtcclxuXHRcdGxldCBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChlbGVtZW50VHlwZSk7XHJcblx0XHJcblx0XHRpZiAob3B0aW9ucyA9PT0gdW5kZWZpbmVkKSB7XHJcblx0XHRcdHJldHVybiBlbGVtZW50O1xyXG5cdFx0fVxyXG5cclxuXHRcdGZvciAobGV0IG9wdGlvbiBpbiBvcHRpb25zKSB7XHJcblx0XHRcdGlmKG9wdGlvbiA9PSAndGV4dCcpIHtcclxuXHRcdFx0XHRlbGVtZW50LmlubmVySFRNTCA9IG9wdGlvbnNbb3B0aW9uXTtcclxuXHRcdFx0XHRjb250aW51ZTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0ZWxlbWVudC5zZXRBdHRyaWJ1dGUob3B0aW9uLCBvcHRpb25zW29wdGlvbl0pO1xyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiBlbGVtZW50O1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogVG9nZ2xlcyB0aGUgZ2l2ZW4gY2xhc3Nlcy5cclxuXHQgKi9cclxuXHRzdGF0aWMgdG9nZ2xlQ2xhc3MoZWxlbWVudCwgY2xhc3NOYW1lLCBzZWNvbmRDbGFzc05hbWUpXHJcblx0e1xyXG5cdFx0aWYoZWxlbWVudCA9PSBudWxsIHx8IHR5cGVvZiBlbGVtZW50ID09ICd1bmRlZmluZWQnKSB7XHJcblx0XHRcdHRocm93IG5ldyBJbnZhbGlkQXJndW1lbnRFeGNlcHRpb24kMTtcclxuXHRcdH1cclxuXHJcblx0XHRzZWNvbmRDbGFzc05hbWUgPSBzZWNvbmRDbGFzc05hbWUgfHwgdW5kZWZpbmVkO1xyXG5cclxuXHRcdGVsZW1lbnQuY2xhc3NMaXN0LnRvZ2dsZShjbGFzc05hbWUpO1xyXG5cclxuXHRcdGlmKHNlY29uZENsYXNzTmFtZSkge1xyXG5cdFx0XHRlbGVtZW50LmNsYXNzTGlzdC50b2dnbGUoc2Vjb25kQ2xhc3NOYW1lKTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEZpbmRzIGFuIGVsZW1lbnQgaW5zaWRlIG9mIHBhcmVudC5cclxuXHQgKi9cclxuXHRzdGF0aWMgZmluZChlbGVtZW50LCBzZWxlY3RvcikgXHJcblx0e1xyXG5cdFx0cmV0dXJuIHF1ZXJ5RWxlbWVudChlbGVtZW50LCBzZWxlY3Rvcik7XHJcblx0fVxyXG59XHJcblxyXG4vKipcclxuICogUXVlcmllcyBhbiBlbGVtZW50IGZyb20gdGhlIERPTS5cclxuICovXHJcbmZ1bmN0aW9uIHF1ZXJ5RWxlbWVudChwYXJlbnQsIHNlbGVjdG9yKSB7XHJcblx0dmFyIGVsZW1lbnQgPSBwYXJlbnQucXVlcnlTZWxlY3RvckFsbChzZWxlY3Rvcik7XHJcblxyXG5cdGlmKGVsZW1lbnQubGVuZ3RoID09IDApIHtcclxuXHRcdHJldHVybiBudWxsO1xyXG5cdH1cclxuXHJcblx0cmV0dXJuIChlbGVtZW50Lmxlbmd0aCA+IDEpID8gZWxlbWVudCA6IGVsZW1lbnRbMF07XHJcbn1cblxubGV0IGV2ZW50cyA9IFtdO1xyXG5cclxuY2xhc3MgRXZlbnRcclxue1xyXG5cdC8qKlxyXG5cdCAqIExpc3RlbiB0byBhbiBldmVudC5cclxuXHQgKi9cclxuXHRzdGF0aWMgbGlzdGVuKG5hbWUsIGNhbGxiYWNrKSB7XHJcblx0XHRpZiAodHlwZW9mIGNhbGxiYWNrICE9PSAnZnVuY3Rpb24nKSB7XHJcblx0XHRcdHRocm93IG5ldyBJbnZhbGlkQXJndW1lbnRFeGNlcHRpb247XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKHR5cGVvZiBldmVudHNbbmFtZV0gPT0gJ3VuZGVmaW5lZCcpIHtcclxuXHRcdFx0ZXZlbnRzW25hbWVdID0gW107XHJcblx0XHR9XHJcblxyXG5cdFx0ZXZlbnRzW25hbWVdLnB1c2goY2FsbGJhY2spO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogRmlyZXMgYW4gZXZlbnQuXHJcblx0ICovXHJcblx0c3RhdGljIHRyaWdnZXIobmFtZSwgLi4uZGF0YSkge1xyXG5cdFx0ZGF0YSA9IGRhdGEgfHwgbnVsbDtcclxuXHJcblx0XHRldmVudHNbbmFtZV0uZm9yRWFjaChmdW5jdGlvbihjYWxsYmFjaykge1xyXG5cdFx0XHRpZih0eXBlb2YgY2FsbGJhY2sgIT09ICdmdW5jdGlvbicpIHtcclxuXHRcdFx0XHR0aHJvdyBuZXcgQmFkRXZlbnRDYWxsRXhjZXB0aW9uO1xyXG5cdFx0XHR9XHJcblx0XHRcdFxyXG5cdFx0XHRyZXR1cm4gY2FsbGJhY2soLi4uZGF0YSk7XHJcblx0XHR9KTtcclxuXHR9XHJcbn1cblxuY2xhc3MgQ29tbW9uXHJcbntcclxuXHQvKipcclxuXHQgKiBFeHRlbmQgYW4gb2JqZWN0LlxyXG5cdCAqL1xyXG5cdHN0YXRpYyBleHRlbmQoY3VycmVudE9iaiwgbmV3T2JqICkge1xyXG5cdFx0dmFyIGV4dGVuZGVkID0ge307XHJcblx0ICAgIHZhciBwcm9wO1xyXG5cclxuXHQgICAgZm9yIChwcm9wIGluIGN1cnJlbnRPYmopIHtcclxuXHQgICAgICAgIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoY3VycmVudE9iaiwgcHJvcCkpIHtcclxuXHQgICAgICAgICAgICBleHRlbmRlZFtwcm9wXSA9IGN1cnJlbnRPYmpbcHJvcF07XHJcblx0ICAgICAgICB9XHJcblx0ICAgIH1cclxuXHJcblx0ICAgIGZvciAocHJvcCBpbiBuZXdPYmopIHtcclxuXHQgICAgICAgIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwobmV3T2JqLCBwcm9wKSkge1xyXG5cdCAgICAgICAgICAgIGV4dGVuZGVkW3Byb3BdID0gbmV3T2JqW3Byb3BdO1xyXG5cdCAgICAgICAgfVxyXG5cdCAgICB9XHJcblxyXG5cdCAgICByZXR1cm4gZXh0ZW5kZWQ7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBDaGVja3MgZm9yIGEgbmVlZGxlIGluIGh5c3RhY2suXHJcblx0ICovXHJcblx0c3RhdGljIGluX2FycmF5KG5lZWRsZSwgaHlzdGFjaykge1xyXG5cdFx0aWYoaHlzdGFjay5jb25zdHJ1Y3RvciAhPT0gQXJyYXkpIHJldHVybjtcclxuXHJcblx0XHRmb3IodmFyIGkgPSAwOyBpIDw9IGh5c3RhY2subGVuZ3RoOyBpKyspIHtcclxuXHRcdFx0aWYobmVlZGxlID09IGh5c3RhY2tbaV0pIHJldHVybiB0cnVlO1x0XHJcblx0XHR9XHJcblx0XHJcblx0XHRyZXR1cm4gZmFsc2U7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBDaGVja3MgaWYgYW4gb2JqZWN0IGlzIGVtcHR5LlxyXG5cdCAqL1xyXG5cdHN0YXRpYyBlbXB0eU9iamVjdChvYmplY3QpIHtcclxuXHRcdGZvcih2YXIgcHJvcCBpbiBvYmplY3QpIHtcclxuXHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiB0cnVlO1xyXG5cdH1cclxuXHJcblx0c3RhdGljIGNvbnRhaW5zT2JqZWN0KG9iamVjdCwgaHlzdGFjaykgXHJcblx0e1xyXG5cdCAgICB2YXIgaTtcclxuXHJcblx0ICAgIGZvciAoaSA9IDA7IGkgPCBoeXN0YWNrLmxlbmd0aDsgaSsrKSB7XHJcblx0ICAgICAgICBpZiAodHlwZW9mIG9iamVjdCA9PSAnc3RyaW5nJyAmJiBoeXN0YWNrW2ldLmNvbnN0cnVjdG9yLm5hbWUgPT09IG9iamVjdCkge1xyXG5cdCAgICAgICAgXHRyZXR1cm4gdHJ1ZTtcclxuXHQgICAgICAgIH1cclxuXHJcblx0ICAgICAgICBpZiAoaHlzdGFja1tpXSA9PT0gb2JqZWN0KSB7XHJcblx0ICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcblx0ICAgICAgICB9XHJcblx0ICAgIH1cclxuXHJcblx0ICAgIHJldHVybiBmYWxzZTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIENoZWNrcyBpZiBhIGdpdmVuIHBhcmFtZXRlciBpcyBhbiBvYmplY3QuXHJcblx0ICovXHJcblx0c3RhdGljIGlzT2JqZWN0KG9iamVjdCkgXHJcblx0e1xyXG5cdFx0cmV0dXJuIHR5cGVvZiBvYmplY3QgPT0gJ29iamVjdCc7XHJcblx0fVxyXG59XG5cbmNsYXNzIEludmFsaWRCaW5kaW5nRXhjZXB0aW9uIGV4dGVuZHMgRXJyb3Jcclxue1xyXG5cdGNvbnN0cnVjdG9yKCkgXHJcblx0eyBcclxuICAgIFx0c3VwZXIoKTtcclxuICAgIFx0Y29uc29sZS5lcnJvcihgSW52YWxpZEJpbmRpbmdFeGNlcHRpb24sIHRyeWluZyB0byBiaW5kIGFuIGFscmVhZHkgZXhpc3RpbmcgYm91bmQuYCk7XHJcbiAgICB9XHJcbn1cblxubGV0IGluc3RhbmNlcyA9IFtdO1xyXG5cclxuY2xhc3MgQ29udGFpbmVyIFxyXG57XHJcblx0LyoqXHJcblx0ICogQmluZHMga2V5IHRvIGNvbmNyZXRlIGNsYXNzLlxyXG5cdCAqL1xyXG5cdGJpbmQoa2V5LCBjb25jcmV0ZSkgXHJcblx0e1xyXG5cdFx0aWYgKHR5cGVvZiBrZXkgIT0gJ3N0cmluZycgfHwgdHlwZW9mIGNvbmNyZXRlICE9ICdmdW5jdGlvbicpIHtcclxuXHRcdFx0dGhyb3cgbmV3IEludmFsaWRBcmd1bWVudEV4Y2VwdGlvbiQxO1xyXG5cdFx0fVxyXG5cclxuXHRcdGlmICh0eXBlb2YgdGhpc1trZXldICE9ICd1bmRlZmluZWQnKSB7XHJcblx0XHRcdHRocm93IG5ldyBJbnZhbGlkQmluZGluZ0V4Y2VwdGlvbjtcclxuXHRcdH1cclxuXHJcblx0XHR0aGlzW2tleV0gPSBjb25jcmV0ZS5iaW5kKGNvbmNyZXRlLCB0aGlzKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFNldHMgYW4gaW5zdGFuY2UuXHJcblx0ICovXHJcblx0c2V0SW5zdGFuY2Uoa2V5LCBpbnN0YW5jZSkgXHJcblx0e1xyXG5cdFx0aWYodHlwZW9mIGtleSAhPSAnc3RyaW5nJyB8fCB0eXBlb2YgaW5zdGFuY2UgIT0gJ29iamVjdCcpIHtcclxuXHRcdFx0dGhyb3cgbmV3IEludmFsaWRBcmd1bWVudEV4Y2VwdGlvbiQxO1xyXG5cdFx0fVxyXG5cclxuXHRcdGluc3RhbmNlc1trZXldID0gaW5zdGFuY2U7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBHZXRzIGFuIGluc3RhbmNlLlxyXG5cdCAqL1xyXG5cdGdldEluc3RhbmNlKGtleSkgXHJcblx0e1xyXG5cdFx0aWYodHlwZW9mIGtleSAhPSAnc3RyaW5nJykge1xyXG5cdFx0XHR0aHJvdyBuZXcgSW52YWxpZEFyZ3VtZW50RXhjZXB0aW9uJDE7XHJcblx0XHR9XHJcblxyXG5cdFx0aWYodHlwZW9mIGtleSA9PSAnb2JqZWN0Jykge1xyXG5cdFx0XHRyZXR1cm4gaW5zdGFuY2VzW2tleS5jb25zdHJ1Y3Rvci5uYW1lXSB8fCBudWxsO1xyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiBpbnN0YW5jZXNba2V5XSB8fCBudWxsO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQ2hlY2tzIGlmIGFuIGluc3RhbmNlIGV4aXN0LlxyXG5cdCAqL1xyXG5cdGluc3RhbmNlRXhpc3QoaW5zdGFuY2UpIFxyXG5cdHtcclxuXHRcdGlmKHR5cGVvZiBpbnN0YW5jZSA9PSAnb2JqZWN0Jykge1xyXG5cdFx0XHRyZXR1cm4gKHR5cGVvZiBpbnN0YW5jZXNbaW5zdGFuY2UuY29uc3RydWN0b3IubmFtZV0gIT09ICd1bmRlZmluZWQnKTtcclxuXHRcdH1cclxuXHRcdFxyXG5cdFx0XHJcblx0XHRyZXR1cm4gKGluc3RhbmNlIGluIGluc3RhbmNlcyk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBDcmVhdGVzIGFuIGluc3RhbmNlLlxyXG5cdCAqL1xyXG5cdG1ha2Uob2JqZWN0KVxyXG5cdHtcclxuXHRcdGxldCBpbnN0YW5jZSA9IHt9O1xyXG5cclxuXHRcdGlmICh0aGlzLmluc3RhbmNlRXhpc3Qob2JqZWN0KSkge1xyXG5cdFx0XHRyZXR1cm4gdGhpcy5nZXRJbnN0YW5jZShvYmplY3QpO1xyXG5cdFx0fVxyXG5cclxuXHRcdGlmICh0eXBlb2Ygb2JqZWN0ID09ICdvYmplY3QnKSB7XHJcblx0XHRcdGluc3RhbmNlID0gb2JqZWN0O1xyXG5cdFx0fSBlbHNlIGlmKHR5cGVvZiBvYmplY3QgPT0gJ3N0cmluZycgJiYgdGhpcy5oYXNPd25Qcm9wZXJ0eShvYmplY3QpKSB7XHJcblx0XHRcdGluc3RhbmNlID0gbmV3IHRoaXNbb2JqZWN0XTtcdFxyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0dGhyb3cgbmV3IEludmFsaWRCaW5kaW5nRXhjZXB0aW9uO1xyXG5cdFx0fVxyXG5cclxuXHRcdHRoaXMuc2V0SW5zdGFuY2Uob2JqZWN0LCBpbnN0YW5jZSk7IFxyXG5cclxuXHRcdHJldHVybiBpbnN0YW5jZTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFJldHJpZXZlIGFsbCBpbnN0YW5jZXMuXHJcblx0ICovXHJcblx0aW5zdGFuY2VzKCkgXHJcblx0e1xyXG5cdFx0cmV0dXJuIGluc3RhbmNlcztcclxuXHR9XHJcbn1cblxuY2xhc3MgQ29tcG9uZW50c0V4Y2VwdGlvbiBleHRlbmRzIEVycm9yXHJcbntcclxuXHRjb25zdHJ1Y3RvcigpIFxyXG5cdHsgXHJcbiAgICBcdHN1cGVyKCk7XHJcbiAgICBcdGNvbnNvbGUuZXJyb3IoYENvbXBvbmVudHNFeGNlcHRpb24sIGV4cGVjdGluZyBmb3IgYXQgbGVhc3Qgb25lIGNvbXBvbmVudHMsIGJ1dCBub25lIHdhcyBnaXZlbiwgXHJcblx0XHRcdFx0XHRcdFx0XHRwbGVhc2UgYWRkIGF0IGxlYXN0IG9uZSByZXF1aXJlbWVudChQcm9kdWN0cywgU2VydmljZXMgb3IvYW5kIEZpbHRlci5gKTtcclxuICAgIH1cclxufVxuXG5jbGFzcyBCYWRFdmVudENhbGxFeGNlcHRpb24kMSBleHRlbmRzIEVycm9yXHJcbntcclxuXHRjb25zdHJ1Y3RvcigpIFxyXG5cdHsgXHJcblx0XHRzdXBlcigpO1xyXG4gICAgXHRjb25zb2xlLmVycm9yKGBCYWRFdmVudENhbGxFeGNlcHRpb24sIGxpc3RlbmluZyB0byBhIG5vbmUtZXhpc3RpbmcgZXZlbnQuYCk7XHJcbiAgICB9XHJcbn1cblxuY2xhc3MgTm90SW5QYWdlUmFuZ2VFeGNlcHRpb24gZXh0ZW5kcyBFcnJvclxyXG57XHJcblx0Y29uc3RydWN0b3IoKSBcclxuXHR7IFxyXG4gICAgXHRzdXBlcigpO1xyXG4gICAgXHRjb25zb2xlLmVycm9yKGBOb3RJblBhZ2VSYW5nZUV4Y2VwdGlvbiwgc29ycnksIG5vIG1vcmUgcGFnZXMuYCk7XHJcbiAgICB9XHJcbn1cblxuY2xhc3MgQ29tcG9uZW50Tm90UmVnaXN0ZXJlZEV4Y2VwdGlvbiBleHRlbmRzIEVycm9yXHJcbntcclxuXHRjb25zdHJ1Y3RvcigpIFxyXG5cdHsgXHJcbiAgICBcdHN1cGVyKCk7XHJcbiAgICBcdGNvbnNvbGUuZXJyb3IoYENvbXBvbmVudE5vdFJlZ2lzdGVyZWRFeGNlcHRpb24sIGNvbXBvbmVudHMgbXVzdCBiZSByZWdpc3RlcmVkIGluIG9yZGVyIHRvIHVzZSB0aGVtLmApO1xyXG4gICAgfVxyXG59XG5cbmNsYXNzIEV4Y2VwdGlvbkhhbmRsZXIgZXh0ZW5kcyBFcnJvclxyXG57XHJcblx0LyoqXHJcblx0ICogSGFuZGxlIGFsbCB0aGUgZXJyb3JzXHJcblx0ICovXHJcblx0c3RhdGljIGluaXRhbGl6ZSgpIHtcdFxyXG5cdFx0d2luZG93Lm9uZXJyb3IgPSBmdW5jdGlvbihtZXNzYWdlLCBzb3VyY2UsIGxpbmVubywgY29sbm8sIGVycm9yKSB7XHJcblx0XHRcdFxyXG5cdFx0XHRpZiAoZXJyb3IgaW5zdGFuY2VvZiBJbnZhbGlkQXJndW1lbnRFeGNlcHRpb24kMSkge1xyXG5cdFx0XHRcdC8vIGhhbmRsZVxyXG5cdFx0XHR9IGVsc2UgaWYgKGVycm9yIGluc3RhbmNlb2YgSW52YWxpZEJpbmRpbmdFeGNlcHRpb24pIHtcclxuXHRcdFx0XHQvLyBoYW5kbGVcclxuXHRcdFx0fSBlbHNlIGlmIChlcnJvciBpbnN0YW5jZW9mIEJhZEV2ZW50Q2FsbEV4Y2VwdGlvbiQxKSB7XHJcblx0XHRcdFx0Ly8gaGFuZGxlXHJcblx0XHRcdH0gZWxzZSBpZiAoZXJyb3IgaW5zdGFuY2VvZiBDb21wb25lbnRzRXhjZXB0aW9uKSB7XHJcblx0XHRcdFx0Ly8gaGFuZGxlXHJcblx0XHRcdH0gZWxzZSBpZiAoZXJyb3IgaW5zdGFuY2VvZiBDb21wb25lbnROb3RSZWdpc3RlcmVkRXhjZXB0aW9uKSB7XHJcblx0XHRcdFx0Ly8gaGFuZGxlXHJcblx0XHRcdH0gZWxzZSBpZiAoZXJyb3IgaW5zdGFuY2VvZiBOb3RJblBhZ2VSYW5nZUV4Y2VwdGlvbikge1xyXG5cdFx0XHRcdC8vIGhhbmRsZSBcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHJldHVybiB0cnVlO1xyXG5cdFx0fTtcclxuXHR9XHJcbn1cblxuLyoqXHJcbiAqIFRoZSBkZWZhdWx0IHNldHRpbmdzIG9mIHRoZSBmaWx0ZXIuXHJcbiAqL1xyXG5sZXQgZGVmYXVsdFNldHRpbmdzJDEgPSB7XHJcblx0ZWxlbWVudDogJy5maWx0ZXInLFxyXG5cdGRhdGE6IHt9LFxyXG5cdGNsYXNzOiAnJyxcclxuXHR3aWR0aDogJycsXHJcblx0aGVpZ2h0OiAnJyxcclxufTtcclxuXHJcbi8qKlxyXG4gKiBTdG9yZXMgdGhlIGNvbnRhaW5lciBvYmplY3QuXHJcbiAqL1xyXG5sZXQgQ29udGFpbmVyJDI7XHJcblxyXG4vKipcclxuICogVGhlIEZpbHRlciBPYmplY3QsIGhhbmRsZXMgdGhlIGZpbHRlciBvZiB0aGUgcHJvZHVjdHMvc2VydmljZXMuXHJcbiAqL1xyXG5jbGFzcyBGaWx0ZXIgXHJcbntcclxuXHRjb25zdHJ1Y3Rvcihjb250YWluZXIpIFxyXG5cdHtcclxuXHRcdENvbnRhaW5lciQyID0gY29udGFpbmVyO1xyXG5cdH1cclxuXHJcblx0c2V0dXAoc2V0dGluZ3MpXHJcblx0e1xyXG5cdFx0aWYodHlwZW9mIHNldHRpbmdzICE9ICdvYmplY3QnKSB7XHJcblx0XHRcdHRocm93IG5ldyBJbnZhbGlkQXJndW1lbnRFeGNlcHRpb24kMTtcclxuXHRcdH1cclxuXHJcblx0XHR0aGlzLnNldHRpbmdzID0gQ29tbW9uLmV4dGVuZChkZWZhdWx0U2V0dGluZ3MkMSwgc2V0dGluZ3MpO1xyXG5cclxuXHRcdHRoaXMuc2V0RWxlbWVudCh0aGlzLnNldHRpbmdzLmVsZW1lbnQpO1xyXG5cdH1cclxuXHJcblx0c2V0RWxlbWVudChzZWxlY3RvcilcclxuXHR7XHJcblx0XHR0aGlzLndyYXBwZXIgPSBET00uZWxlbWVudChzZWxlY3Rvcik7XHJcblx0XHRcclxuXHRcdERPTS5hZGRDbGFzcyh0aGlzLndyYXBwZXIsIHRoaXMuc2V0dGluZ3MuY2xhc3MpO1xyXG5cdH1cclxufVxuXG5jbGFzcyBTdHJcclxue1xyXG5cclxuXHQvKipcclxuXHQgKiBDb252ZXJ0IGNhbWVsQ2FzZSB0byBrZWJhYi1jYXNlLlxyXG5cdCAqL1xyXG5cdHN0YXRpYyBrZWJhYkNhc2Uoc3RyaW5nKSBcclxuXHR7XHJcblx0XHRyZXR1cm4gc3RyaW5nLnJlcGxhY2UoLyhbYS16XSkoW0EtWl0pL2csICckMS0kMicpLnRvTG93ZXJDYXNlKCk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBHZW5lcmF0ZXMgYSByYW5kb20gc3RyaW5nLlxyXG5cdCAqL1xyXG5cdHN0YXRpYyByYW5kb20obGVuZ3RoKSBcclxuXHR7XHJcblx0XHRsZXQgc3RyaW5nID0gJyc7XHJcblx0XHRsZXQgcG9zc2libGUgPSBcIkFCQ0RFRkdISUpLTE1OT1BRUlNUVVZXWFlaYWJjZGVmZ2hpamtsbW5vcHFyc3R1dnd4eXowMTIzNDU2Nzg5XCI7XHJcblxyXG5cdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xyXG5cdCAgICBcdHN0cmluZyArPSBwb3NzaWJsZS5jaGFyQXQoTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogcG9zc2libGUubGVuZ3RoKSk7XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIHN0cmluZztcclxuXHR9XHJcblxyXG59XG5cbi8qKlxyXG4gKiBUaGUgZGVmYXVsdCBzZXR0aW5ncyBvZiBlYWNoIHByb2R1Y3QuXHJcbiAqL1xyXG5sZXQgZGVmYXVsdFNldHRpbmdzJDIgPSB7XHJcblx0ZWxlbWVudDogJy5wcm9kdWN0cycsXHJcblx0Y2xhc3M6ICcnLFxyXG5cdGl0ZW1fY2xhc3M6ICcnLFxyXG5cdGFkZF9idXR0b25fY2xhc3M6ICdidG4gYnRuLXByaW1hcnknLFxyXG5cdGZhdm9yaXRlX2J1dHRvbl9jbGFzczogJ2J0biBidG4tZGFuZ2VyJyxcclxuXHR3aWR0aDogJzIwMHB4JyxcclxuXHRoZWlnaHQ6ICcyNTBweCcsXHJcblx0YXR0cmlidXRlczogWyduYW1lJywgJ3ByaWNlJywgJ2RlbGl2ZXJ5VGltZScsICdpbWFnZSddLFxyXG5cdHVybDogJ3Byb2R1Y3RzLnBocCcsXHJcbn07XHJcblxyXG4vKipcclxuICogU3RvcmVzIHRoZSBjb250YWluZXIgb2JqZWN0LlxyXG4gKi9cclxubGV0IENvbnRhaW5lciQzO1xyXG5cclxuLyoqXHJcbiAqIFRoZSBQcm9kdWN0cyBPYmplY3QsIGhhbmRsZXMgdGhlIHByb2R1Y3RzLlxyXG4gKi9cclxuY2xhc3MgUHJvZHVjdHMgXHJcbntcclxuXHQvKipcclxuXHQgKiBJbml0YWxpemUgdGhlIENvbnRhaW5lci5cclxuXHQgKi9cclxuXHRjb25zdHJ1Y3Rvcihjb250YWluZXIpIFxyXG5cdHtcclxuXHRcdENvbnRhaW5lciQzID0gY29udGFpbmVyO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogU2V0cyB0aGUgZ2l2ZW4gc2V0dGluZ3MgZnJvbSB0aGUgdXNlci5cclxuXHQgKi9cclxuXHRzZXR1cChzZXR0aW5ncylcclxuXHR7XHJcblx0XHRkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgZnVuY3Rpb24oKSB7XHJcblx0XHRcdFxyXG5cdFx0aWYgKHR5cGVvZiBzZXR0aW5ncyAhPSAnb2JqZWN0Jykge1xyXG5cdFx0XHR0aHJvdyBuZXcgSW52YWxpZEFyZ3VtZW50RXhjZXB0aW9uJDE7XHJcblx0XHR9XHJcblxyXG5cdFx0dGhpcy5zZXR0aW5ncyA9IENvbW1vbi5leHRlbmQoZGVmYXVsdFNldHRpbmdzJDIsIHNldHRpbmdzKTtcclxuXHJcblx0XHR0aGlzLnNldEVsZW1lbnQodGhpcy5zZXR0aW5ncy5lbGVtZW50KTtcclxuXHJcblx0XHR0aGlzLmFkZFN0eWxlVGFnKCk7XHRcclxuXHRcdFxyXG5cdFx0aWYgKENvbnRhaW5lciQzLlBhZ2luYXRpb24gJiYgQ29udGFpbmVyJDMuUGFnaW5hdGlvbi5ib290ZWQpIHtcclxuXHRcdFx0bGV0IGluc3RhbmNlID0gdGhpcztcclxuXHJcblx0XHRcdGluc3RhbmNlLmdldFByb2R1Y3RzQnlQYWdlKDEpLnRoZW4oZnVuY3Rpb24ocHJvZHVjdHMpIHtcclxuXHRcdFx0XHRpbnN0YW5jZS5yZXBsYWNlSXRlbXMocHJvZHVjdHMpO1xyXG5cdFx0XHR9KTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdHRoaXMubG9hZEFsbFByb2R1Y3RzKCk7XHJcblx0XHR9XHJcblxyXG5cdFx0fS5iaW5kKHRoaXMpKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIExvYWRzIHRoZSBwcm9kdWN0cyBhbmQgcmVwbGFjZSB0aGVtIGluIHRoZSBkaXYgY29udGFpbmVyLlxyXG5cdCAqL1xyXG5cdGxvYWRBbGxQcm9kdWN0cygpXHJcblx0e1xyXG5cdFx0bGV0IHJlcXVlc3QgPSB0aGlzLmdldFByb2R1Y3RzKCk7XHJcblx0XHRcdFxyXG5cdFx0cmVxdWVzdC50aGVuKGZ1bmN0aW9uKGl0ZW1zKSB7XHJcblx0XHRcdEV2ZW50LnRyaWdnZXIoJ1Byb2R1Y3RzV2VyZUZldGNoZWQnLCBpdGVtcyk7XHJcblx0XHRcdHRoaXMucmVwbGFjZUl0ZW1zKGl0ZW1zKTtcclxuXHRcdH0uYmluZCh0aGlzKSkuY2F0Y2goZnVuY3Rpb24oZXJyb3IpIHtcclxuXHJcblx0XHR9KTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFNldHMgdGhlIERPTSBlbGVtZW50IGZvciBwb3B1bGF0aW5nIHRoZSBwcm9kdWN0cy5cclxuXHQgKi9cclxuXHRzZXRFbGVtZW50KHNlbGVjdG9yKVxyXG5cdHtcclxuXHRcdHRoaXMud3JhcHBlciA9IERPTS5lbGVtZW50KHNlbGVjdG9yKTtcclxuXHJcblx0XHRpZiAodGhpcy53cmFwcGVyKSB7XHJcblx0XHRcdERPTS5hZGRDbGFzcyh0aGlzLndyYXBwZXIsIHRoaXMuc2V0dGluZ3MuY2xhc3MpO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogUmVwbGFjZSBpdGVtcyBpbiB0aGUgY29udGFpbmVyLlxyXG5cdCAqL1xyXG5cdHJlcGxhY2VJdGVtcyhpdGVtcykgXHJcblx0e1xyXG5cdFx0aWYgKCEgQXJyYXkuaXNBcnJheShpdGVtcykgfHwgKGl0ZW1zLmxlbmd0aCA8PSAwICYmIHR5cGVvZiBpdGVtc1swXSA9PSAnc3RyaW5nJykpIHtcclxuXHRcdFx0dGhyb3cgbmV3IEludmFsaWRBcmd1bWVudEV4Y2VwdGlvbiQxO1xyXG5cdFx0fVxyXG5cclxuXHRcdGxldCBwcm9kdWN0cyA9IHRoaXMuYnVpbGRQcm9kdWN0cyhpdGVtcywgdGhpcy5zZXR0aW5ncy5pdGVtX2NsYXNzLCAnZGl2Jyk7XHJcblxyXG5cdFx0dGhpcy53cmFwcGVyLmlubmVySFRNTCA9ICcnO1xyXG5cdFx0cHJvZHVjdHMuZm9yRWFjaChmdW5jdGlvbihwcm9kdWN0KSB7XHJcblx0XHRcdHRoaXMud3JhcHBlci5hcHBlbmRDaGlsZChwcm9kdWN0KTtcclxuXHRcdH0uYmluZCh0aGlzKSk7XHJcblxyXG5cdFx0cmV0dXJuIGl0ZW1zO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogTWFrZXMgYW4gQWpheCBjYWxsIHRvIHRoZSBzZXJ2ZXIgd2l0aG91dCBwYXJhbWV0ZXJzLlxyXG5cdCAqL1xyXG5cdGdldFByb2R1Y3RzKClcclxuXHR7XHJcblx0XHRyZXR1cm4gdGhpcy5hc2tTZXJ2ZXIoKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIE1ha2VzIGFuIEFqYXggY2FsbCB0byB0aGUgc2VydmVyLlxyXG5cdCAqL1xyXG5cdGdldFByb2R1Y3RzQnlQYWdlKHBhZ2VOdW1iZXIpIFxyXG5cdHtcclxuXHRcdHJldHVybiB0aGlzLmFza1NlcnZlcihwYWdlTnVtYmVyKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFNlbmRzIHRoZSByZXF1ZXN0IHRvIHRoZSBzZXJ2ZXIuXHJcblx0ICovXHJcblx0YXNrU2VydmVyKHBhZ2VOdW1iZXIpXHJcblx0e1xyXG5cdFx0cGFnZU51bWJlciA9IHBhZ2VOdW1iZXIgfHwgbnVsbDtcclxuXHJcblx0XHRyZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XHJcblxyXG5cdFx0XHRsZXQgeGhyID0gbmV3IFhNTEh0dHBSZXF1ZXN0IHx8IG5ldyBBY3RpdmVYT2JqZWN0KFwiTWljcm9zb2Z0LlhNTEhUVFBcIik7XHJcblxyXG5cdFx0XHRpZihwYWdlTnVtYmVyKSB7XHJcblx0XHRcdFx0eGhyLm9wZW4oJ0dFVCcsIHRoaXMuc2V0dGluZ3MudXJsICsgJz9wYWdlPScgKyBwYWdlTnVtYmVyLCB0cnVlKTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHR4aHIub3BlbignR0VUJywgdGhpcy5zZXR0aW5ncy51cmwsIHRydWUpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHR4aHIuc2V0UmVxdWVzdEhlYWRlcignQ29udGVudC1UeXBlJywgJ2FwcGxpY2F0aW9uL2pzb24nKTtcclxuXHRcdFx0XHJcblx0XHRcdGxldCBpbnN0YW5jZSA9IHRoaXM7XHJcblxyXG5cdFx0XHR4aHIub25yZWFkeXN0YXRlY2hhbmdlID0gZnVuY3Rpb24oKSB7XHJcblx0XHRcdFx0aWYgKHRoaXMucmVhZHlTdGF0ZSA9PSA0KSB7XHJcblx0XHRcdFx0XHRpZiAodGhpcy5zdGF0dXMgPT0gMjAwKSB7XHJcblx0XHRcdFx0XHRcdGluc3RhbmNlLmN1cnJlbnRJdGVtcyA9ICh0aGlzLnJlc3BvbnNlVGV4dCA9PSAnJykgPyBbXSA6IEpTT04ucGFyc2UodGhpcy5yZXNwb25zZVRleHQpO1xyXG5cdFx0XHRcdFx0XHJcblx0XHRcdFx0XHRcdGlmKGluc3RhbmNlLmN1cnJlbnRJdGVtcy5sZW5ndGggPT09IDApIHtcclxuXHRcdFx0XHRcdFx0XHRyZWplY3QoJ05vIEl0ZW1zIHdlcmUgcmV0cmlldmVkIScpO1xyXG5cdFx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGluc3RhbmNlLmN1cnJlbnRJdGVtcy5sZW5ndGg7IGkrKykge1xyXG5cdFx0XHRcdFx0XHRcdHZhciBwcm9kdWN0ID0gaW5zdGFuY2UuY3VycmVudEl0ZW1zW2ldO1xyXG5cdFx0XHRcdFx0XHRcdGluc3RhbmNlLkFmdGVyTG9hZGVkLmNhbGwodGhpcywgcHJvZHVjdCk7XHJcblx0XHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0XHRcdHJlc29sdmUoaW5zdGFuY2UuY3VycmVudEl0ZW1zKTtcclxuXHRcdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRcdHJlamVjdCh0aGlzLnN0YXR1c1RleHQpO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0fTtcclxuXHJcblx0XHRcdHhoci5vbmVycm9yID0gZnVuY3Rpb24oZXJyb3IpIHtcclxuXHRcdFx0XHRyZWplY3QoZXJyb3IpO1xyXG5cdFx0XHR9O1xyXG5cclxuXHRcdFx0eGhyLnNlbmQobnVsbCk7XHJcblx0XHR9LmJpbmQodGhpcykpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQnVpbGRzIHRoZSBodG1sIGZvciB0aGUgcHJvZHVjdHMuXHJcblx0ICovXHJcblx0YnVpbGRQcm9kdWN0cyhhdHRyaWJ1dGVzQ29sbGVjdGlvbiwgY2xhc3NOYW1lLCB0YWdUeXBlKSBcclxuXHR7XHJcblx0XHRpZihhdHRyaWJ1dGVzQ29sbGVjdGlvbi5jb25zdHJ1Y3Rvci5uYW1lICE9ICdBcnJheScgKSB7XHJcblx0XHRcdHRocm93IG5ldyBJbnZhbGlkQXJndW1lbnRFeGNlcHRpb24kMTtcclxuXHRcdH1cclxuXHJcblx0XHRsZXQgYnVpbHRQcm9kdWN0cyA9IFtdO1xyXG5cclxuXHRcdGF0dHJpYnV0ZXNDb2xsZWN0aW9uLmZvckVhY2goZnVuY3Rpb24oYXR0cmlidXRlcykge1xyXG5cdFx0XHRsZXQgYnVpbHRQcm9kdWN0ID0gdGhpcy5idWlsZFByb2R1Y3QoYXR0cmlidXRlcywgY2xhc3NOYW1lLCB0YWdUeXBlKTtcclxuXHRcdFx0YnVpbHRQcm9kdWN0cy5wdXNoKGJ1aWx0UHJvZHVjdCk7XHJcblx0XHR9LmJpbmQodGhpcykpO1xyXG5cclxuXHRcdHJldHVybiBidWlsdFByb2R1Y3RzO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQnVpbGRzIHRoZSBodG1sIGZvciBhIHNpbmdsZSBwcm9kdWN0LlxyXG5cdCAqL1xyXG5cdGJ1aWxkUHJvZHVjdChhdHRyaWJ1dGVzLCBjbGFzc05hbWUsIHRhZ1R5cGUpIFxyXG5cdHtcclxuXHRcdGlmICh0eXBlb2YgYXR0cmlidXRlcyAhPSAnb2JqZWN0JyB8fCB0eXBlb2YgdGFnVHlwZSAhPSAnc3RyaW5nJykge1xyXG5cdFx0XHR0aHJvdyBuZXcgSW52YWxpZEFyZ3VtZW50RXhjZXB0aW9uJDE7XHJcblx0XHR9XHJcblxyXG5cdFx0Y2xhc3NOYW1lID0gY2xhc3NOYW1lIHx8IG51bGw7XHJcblxyXG5cdFx0bGV0IHByb2R1Y3QgPSBET00uY3JlYXRlRWxlbWVudCgnZGl2Jywge1xyXG5cdFx0XHRjbGFzczogJ3Byb2R1Y3QnXHJcblx0XHR9KTtcclxuXHJcblx0XHRET00uYWRkQ2xhc3MocHJvZHVjdCwgY2xhc3NOYW1lKTtcclxuXHJcblx0XHRsZXQgb3ZlcmxheSA9IERPTS5jcmVhdGVFbGVtZW50KCdkaXYnLCB7XHJcblx0XHRcdGNsYXNzOiAncHJvZHVjdC1vdmVybGF5JyxcclxuXHRcdH0pO1xyXG5cclxuXHRcdHByb2R1Y3QuYXBwZW5kQ2hpbGQob3ZlcmxheSk7XHJcblxyXG5cdFx0Zm9yICh2YXIgYXR0cmlidXRlIGluIGF0dHJpYnV0ZXMpIHtcclxuXHRcdFx0aWYgKCEgQ29tbW9uLmluX2FycmF5KGF0dHJpYnV0ZSwgdGhpcy5zZXR0aW5ncy5hdHRyaWJ1dGVzKSkge1xyXG5cdFx0XHRcdGNvbnRpbnVlO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRsZXQgdGFnID0gRE9NLmNyZWF0ZUVsZW1lbnQodGFnVHlwZSk7XHJcblxyXG5cdFx0XHRpZiAoYXR0cmlidXRlID09ICdpbWFnZScpIHtcclxuXHRcdFx0XHRsZXQgaW1hZ2UgPSBET00uY3JlYXRlRWxlbWVudCgnaW1nJywge1xyXG5cdFx0XHRcdFx0c3JjOiBhdHRyaWJ1dGVzW2F0dHJpYnV0ZV1cclxuXHRcdFx0XHR9KTtcclxuXHRcdFx0XHRwcm9kdWN0LmFwcGVuZENoaWxkKGltYWdlKTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHR0YWcuaW5uZXJIVE1MID0gYXR0cmlidXRlc1thdHRyaWJ1dGVdIHx8ICcnO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRET00uYWRkQ2xhc3ModGFnLCAncHJvZHVjdC0nICsgU3RyLmtlYmFiQ2FzZShhdHRyaWJ1dGUpKTtcclxuXHRcdFx0b3ZlcmxheS5hcHBlbmRDaGlsZCh0YWcpO1xyXG5cdFx0fVxyXG5cclxuXHRcdGxldCB0YWcgPSBET00uY3JlYXRlRWxlbWVudCgnZGl2Jywge1xyXG5cdFx0XHRpZDogJ2FjdGlvbkJ1dHRvbnMnLFxyXG5cdFx0XHRjbGFzczogJ2FjdGlvbi1idXR0b25zJ1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0bGV0IGFkZFRvQ2FydCA9IERPTS5jcmVhdGVFbGVtZW50KCdidXR0b24nLCB7XHJcblx0XHRcdGlkOiAnYWRkVG9DYXJ0JyxcclxuXHRcdFx0Y2xhc3M6IHRoaXMuc2V0dGluZ3MuYWRkX2J1dHRvbl9jbGFzcyxcclxuXHRcdFx0dHlwZTogJ2J1dHRvbicsXHJcblx0XHRcdHRleHQ6ICcrJyxcclxuXHRcdH0pO1xyXG5cclxuXHRcdGxldCBmYXZvcml0ZSA9IERPTS5jcmVhdGVFbGVtZW50KCdidXR0b24nLCB7XHJcblx0XHRcdGlkOiAnZmF2b3JpdGUnLFxyXG5cdFx0XHRjbGFzczogdGhpcy5zZXR0aW5ncy5mYXZvcml0ZV9idXR0b25fY2xhc3MsXHJcblx0XHRcdHR5cGU6ICdidXR0b24nLFxyXG5cdFx0XHR0ZXh0OiAnJmhlYXJ0czsnXHJcblx0XHR9KTtcclxuXHJcblx0XHR0YWcuYXBwZW5kQ2hpbGQoYWRkVG9DYXJ0KTtcclxuXHRcdHRhZy5hcHBlbmRDaGlsZChmYXZvcml0ZSk7XHJcblxyXG5cdFx0YWRkVG9DYXJ0LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oZXZlbnQpIHtcclxuXHRcdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuXHRcdFx0Q29udGFpbmVyJDMuZ2V0SW5zdGFuY2UoJ0NhcnQnKS5hZGRJdGVtKGF0dHJpYnV0ZXMpO1xyXG5cdFx0XHRFdmVudC50cmlnZ2VyKCdQcm9kdWN0V2FzQWRkZWQnLCBhdHRyaWJ1dGVzKTtcclxuXHRcdH0pO1xyXG5cclxuXHRcdG92ZXJsYXkuYXBwZW5kQ2hpbGQodGFnKTtcclxuXHJcblx0XHRyZXR1cm4gcHJvZHVjdDtcclxuXHR9XHJcblxyXG5cdGFkZFRvQ2FydChldmVudClcclxuXHR7XHJcblx0XHRcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEFuIGV2ZW50IGZvciB0aGUgY2xpZW50IG9mIHdoZW4gdGhlIHByb2R1Y3RzIGFzIGJlZW4gbG9hZGVkLlxyXG5cdCAqL1xyXG5cdEFmdGVyTG9hZGVkKHByb2R1Y3QpIFxyXG5cdHtcclxuXHRcdC8vXHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBBZGQgdGhlIGVDb21tZXJjZSBzdHlsZSB0YWdzIHRvIHRoZSBET00uXHJcblx0ICovXHJcblx0YWRkU3R5bGVUYWcoKSBcclxuXHR7XHJcblx0XHRpZihET00uZWxlbWVudCgnI2VDb21tZXJjZS1Qcm9kdWN0cycpKSB7XHJcblx0XHRcdHJldHVybjtcclxuXHRcdH1cclxuXHJcblx0XHRsZXQgY3NzID0gYFxyXG5cdFx0XHQucHJvZHVjdCB7XHJcblx0XHRcdFx0cG9zaXRpb246IHJlbGF0aXZlO1xyXG5cdFx0XHRcdG1hcmdpbjogNXB4IDVweDtcclxuXHRcdFx0XHRib3JkZXI6IDFweCBzb2xpZCAjZTRlNGU0O1xyXG5cdFx0XHRcdHdpZHRoOiAke3RoaXMuc2V0dGluZ3Mud2lkdGh9O1xyXG5cdFx0XHRcdGhlaWdodDogJHt0aGlzLnNldHRpbmdzLmhlaWdodH07XHJcblx0XHRcdFx0Y3Vyc29yOiBwb2ludGVyO1xyXG5cdFx0XHRcdGNvbG9yOiAjZmZmZmZmO1xyXG5cdFx0XHRcdG92ZXJmbG93OiBoaWRkZW47XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdC5wcm9kdWN0ID4gLnByb2R1Y3Qtb3ZlcmxheSB7XHJcblx0XHRcdFx0cG9zaXRpb246IGFic29sdXRlO1xyXG5cdFx0XHRcdHRvcDogMDtcclxuXHRcdFx0XHRsZWZ0OiAwO1xyXG5cdFx0XHRcdHdpZHRoOiAxMDAlO1xyXG5cdFx0XHRcdGhlaWdodDogMTAwJTtcclxuXHRcdFx0XHRvcGFjaXR5OiAwLjU7XHJcblx0XHRcdFx0ei1pbmRleDogNTtcclxuXHRcdFx0XHR0cmFuc2l0aW9uOiAxcyBhbGw7XHJcblx0XHRcdFx0dHJhbnNmb3JtOiB0cmFuc2xhdGVYKC0yNTBweCk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdC5wcm9kdWN0OmhvdmVyID4gLnByb2R1Y3Qtb3ZlcmxheSB7XHJcblx0XHRcdFx0YmFja2dyb3VuZDogcmdiYSgwLCAwLCAwLCAwLjQ1KTtcclxuXHRcdFx0XHR0cmFuc2Zvcm06IHRyYW5zbGF0ZVgoMHB4KTtcclxuXHRcdFx0XHRvcGFjaXR5OiAxO1xyXG5cdFx0XHRcdHRyYW5zaXRpb246IDFzIGFsbDtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0LnByb2R1Y3QgPiBpbWcge1xyXG5cdFx0XHRcdHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuXHRcdFx0XHRsZWZ0OiAwO1xyXG5cdFx0XHRcdHRvcDogMDtcclxuXHRcdFx0XHR3aWR0aDogMTAwJTtcclxuXHRcdFx0XHRoZWlnaHQ6IDEwMCU7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdC5wcm9kdWN0ID4gLnByb2R1Y3QtaW1hZ2Uge1xyXG5cdFx0XHRcdHotaW5kZXg6IDA7XHJcblx0XHRcdFx0cG9zaXRpb246IGFic29sdXRlO1xyXG5cdFx0XHRcdHRvcDogMDtcclxuXHRcdFx0XHRsZWZ0OiAwO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHQucHJvZHVjdCA+IC5wcm9kdWN0LW92ZXJsYXkgPiAucHJvZHVjdC1uYW1lLCBcclxuXHRcdFx0LnByb2R1Y3QgPiAucHJvZHVjdC1vdmVybGF5ID4gLnByb2R1Y3QtcHJpY2UsXHJcblx0XHRcdC5wcm9kdWN0ID4gLnByb2R1Y3Qtb3ZlcmxheSA+IC5wcm9kdWN0LWRlbGl2ZXJ5LXRpbWUge1xyXG5cdFx0XHRcdHotaW5kZXg6IDE7XHJcblx0XHRcdFx0cG9zaXRpb246IHJlbGF0aXZlO1xyXG5cdFx0XHRcdHRleHQtYWxpZ246IGNlbnRlcjtcclxuXHRcdFx0XHRtYXJnaW4tdG9wOiAyNXB4O1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHQucHJvZHVjdCA+IC5wcm9kdWN0LW92ZXJsYXkgPiAuYWN0aW9uLWJ1dHRvbnMge1xyXG5cdFx0XHRcdHdpZHRoOiAxMDAlO1xyXG5cdFx0XHRcdG1hcmdpbi10b3A6IDEwcHg7XHJcblx0XHRcdFx0dGV4dC1hbGlnbjogY2VudGVyO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHQucHJvZHVjdCA+IC5wcm9kdWN0LW92ZXJsYXkgPiAuYWN0aW9uLWJ1dHRvbnMgPiAjZmF2b3JpdGUge1xyXG5cdFx0XHRcdG1hcmdpbi1sZWZ0OiAxMHB4O1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0YDtcclxuXHQgICAgXHJcblx0ICAgIERPTS5hZGRTdHlsZSgnZUNvbW1lcmNlLVByb2R1Y3RzJywgY3NzKTtcclxuXHR9XHJcbn1cblxuLyoqXHJcbiAqIFRoZSBTZXJ2aWNlcyBPYmplY3QsIGhhbmRsZXMgdGhlIHNlcnZpY2VzLlxyXG4gKi9cclxuY2xhc3MgU2VydmljZXMgXHJcbntcclxuXHJcbn1cblxuLyoqXHJcbiAqIFRoZSBkZWZhdWx0IHNldHRpbmdzIG9mIHRoZSBwYWdpbmF0aW9uLlxyXG4gKi9cclxubGV0IGRlZmF1bHRTZXR0aW5ncyQzID0ge1xyXG5cdGVsZW1lbnQ6ICcucGFnaW5hdGlvbi1saW5rcycsXHJcblx0Y2xhc3M6ICcnLFxyXG5cdHBlcl9wYWdlOiA1LFxyXG5cdHRvdGFsX2l0ZW1zOiAxMCxcclxufTtcclxuXHJcbi8qKlxyXG4gKiBTdG9yZXMgdGhlIGNvbnRhaW5lciBvYmplY3QuXHJcbiAqL1xyXG5sZXQgQ29udGFpbmVyJDQ7XHJcblxyXG4vKipcclxuICogU3RvcmVzIHRoZSBwcm9kdWN0cyBjb21wb25lbnQuXHJcbiAqL1xyXG5sZXQgUHJvZHVjdHMkMjtcclxuXHJcbi8qKlxyXG4gKiBUaGUgUGFnaW5hdGlvbiBPYmplY3QsIGhhbmRsZXMgdGhlIHBhZ2luYXRpb24uXHJcbiAqL1xyXG5jbGFzcyBQYWdpbmF0aW9uIFxyXG57XHJcblx0LyoqXHJcblx0ICogSW5pdGlhbGl6ZSB0aGUgY29udGFpbmVyIG9iamVjdCBhbmQgdGhlIGRlZmF1bHQgc2V0dGluZ3MuXHJcblx0ICovXHJcblx0Y29uc3RydWN0b3IoY29udGFpbmVyLCBwcm9kdWN0cykgXHJcblx0e1xyXG5cdFx0dGhpcy5zZXRDdXJyZW50KDEpO1xyXG5cdFx0Q29udGFpbmVyJDQgPSBjb250YWluZXI7XHJcblx0XHRQcm9kdWN0cyQyID0gcHJvZHVjdHM7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBTZXQgdGhlIFBhZ2luYXRpb24gb2JqZWN0IHVwLlxyXG5cdCAqL1xyXG5cdHNldHVwKHNldHRpbmdzKVxyXG5cdHtcclxuXHRcdGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCBmdW5jdGlvbigpIHtcclxuXHJcblx0XHRpZih0eXBlb2Ygc2V0dGluZ3MgIT0gJ29iamVjdCcpIHtcclxuXHRcdFx0dGhyb3cgbmV3IEludmFsaWRBcmd1bWVudEV4Y2VwdGlvbiQxO1xyXG5cdFx0fVxyXG5cclxuXHRcdHRoaXMuc2V0dGluZ3MgPSBDb21tb24uZXh0ZW5kKGRlZmF1bHRTZXR0aW5ncyQzLCBzZXR0aW5ncyk7XHJcblxyXG5cdFx0dGhpcy50b3RhbFBhZ2VzID0gdGhpcy5jYWxjdWxhdGVUb3RhbFBhZ2VzKHRoaXMuc2V0dGluZ3MucGVyX3BhZ2UsIHRoaXMuc2V0dGluZ3MudG90YWxfaXRlbXMpO1xyXG5cdFx0XHJcblx0XHR0aGlzLnNldEVsZW1lbnQodGhpcy5zZXR0aW5ncy5lbGVtZW50KTtcclxuXHRcdHRoaXMucmVwbGFjZUxpbmtzKHRoaXMubGlua3MpO1xyXG5cclxuXHRcdH0uYmluZCh0aGlzKSk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBTZXRzIHRoZSB3cmFwcGVyIGVsZW1lbnQuXHJcblx0ICovXHJcblx0c2V0RWxlbWVudChzZWxlY3RvcilcclxuXHR7XHJcblx0XHR0aGlzLndyYXBwZXIgPSBET00uZWxlbWVudChzZWxlY3Rvcik7XHJcblx0XHRcclxuXHRcdERPTS5hZGRDbGFzcyh0aGlzLndyYXBwZXIsIHRoaXMuc2V0dGluZ3MuY2xhc3MpO1xyXG5cclxuXHRcdHRoaXMubGlua3MgPSB0aGlzLmNyZWF0ZUxpbmtzKCk7XHJcblx0XHR0aGlzLmJpbmRFdmVudExpc3RlbmVycyh0aGlzLmxpbmtzKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFJlcGxhY2VzIHRoZSBsaW5rcyBpbiB0aGUgd3JhcHBlci5cclxuXHQgKi9cclxuXHRyZXBsYWNlTGlua3MobGlua3MpXHJcblx0e1xyXG5cdFx0dGhpcy53cmFwcGVyLmlubmVySFRNTCA9ICcnO1xyXG5cdFx0dGhpcy53cmFwcGVyLmFwcGVuZENoaWxkKGxpbmtzKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIENhbGN1bGF0ZXMgdGhlIHRvdGFsIHBhZ2VzLlxyXG5cdCAqL1xyXG5cdGNhbGN1bGF0ZVRvdGFsUGFnZXMocGVyUGFnZSwgdG90YWxJdGVtcylcclxuXHR7XHJcblx0XHRwZXJQYWdlID0gcGFyc2VJbnQocGVyUGFnZSk7XHJcblx0XHR0b3RhbEl0ZW1zID0gcGFyc2VJbnQodG90YWxJdGVtcyk7XHJcblxyXG5cdFx0cmV0dXJuIE1hdGguY2VpbCh0b3RhbEl0ZW1zIC8gcGVyUGFnZSk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBCaW5kcyB0aGUgYnV0dG9ucyBldmVudHMgbGlzdGVuZXJzLlxyXG5cdCAqL1xyXG5cdGJpbmRFdmVudExpc3RlbmVycyhsaW5rcykgXHJcblx0e1xyXG5cdFx0bGV0IGluc3RhbmNlID0gdGhpcztcclxuXHJcblx0XHR0aGlzLm5leHQuY2hpbGROb2Rlc1swXS5vbmNsaWNrID0gZnVuY3Rpb24oZXZlbnQpIHtcclxuXHRcdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuXHJcblx0XHRcdGxldCByZXF1ZXN0ZWRQYWdlID0gaW5zdGFuY2UuY3VycmVudCsxO1xyXG5cclxuXHRcdFx0aWYgKGluc3RhbmNlLm5vdEluUGFnZVJhbmdlKHJlcXVlc3RlZFBhZ2UpKSB7XHJcblx0XHRcdFx0dGhyb3cgbmV3IE5vdEluUGFnZVJhbmdlRXhjZXB0aW9uO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRQcm9kdWN0cyQyLmdldFByb2R1Y3RzQnlQYWdlKHJlcXVlc3RlZFBhZ2UpLnRoZW4oZnVuY3Rpb24ocHJvZHVjdHMpIHtcclxuXHRcdFx0XHRQcm9kdWN0cyQyLnJlcGxhY2VJdGVtcyhwcm9kdWN0cyk7XHJcblx0XHRcdH0pO1xyXG5cclxuXHRcdFx0aW5zdGFuY2Uuc2V0Q3VycmVudChyZXF1ZXN0ZWRQYWdlKTtcclxuXHRcdH07XHJcblxyXG5cdFx0dGhpcy5wcmV2aW91cy5jaGlsZE5vZGVzWzBdLm9uY2xpY2sgPSBmdW5jdGlvbihldmVudCkge1xyXG5cdFx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuXHRcdFx0bGV0IHJlcXVlc3RlZFBhZ2UgPSBpbnN0YW5jZS5jdXJyZW50LTE7XHJcblxyXG5cdFx0XHRpZihpbnN0YW5jZS5ub3RJblBhZ2VSYW5nZShyZXF1ZXN0ZWRQYWdlKSkge1xyXG5cdFx0XHRcdHRocm93IG5ldyBOb3RJblBhZ2VSYW5nZUV4Y2VwdGlvbjtcclxuXHRcdFx0fVxyXG5cdFx0XHRcclxuXHRcdFx0UHJvZHVjdHMkMi5nZXRQcm9kdWN0c0J5UGFnZShyZXF1ZXN0ZWRQYWdlKS50aGVuKGZ1bmN0aW9uKHByb2R1Y3RzKSB7XHJcblx0XHRcdFx0UHJvZHVjdHMkMi5yZXBsYWNlSXRlbXMocHJvZHVjdHMpO1xyXG5cdFx0XHR9KTtcclxuXHJcblx0XHRcdGluc3RhbmNlLnNldEN1cnJlbnQocmVxdWVzdGVkUGFnZSk7XHJcblx0XHR9O1xyXG5cclxuXHRcdGZvcih2YXIgaSA9IDA7IGkgPCB0aGlzLnBhZ2VzLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdHRoaXMucGFnZXNbaV0uY2hpbGROb2Rlc1swXS5vbmNsaWNrID0gZnVuY3Rpb24oZXZlbnQpIHtcclxuXHRcdFx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdFx0XHRcdFxyXG5cdFx0XHRcdGxldCByZXF1ZXN0ZWRQYWdlID0gdGhpcy5nZXRBdHRyaWJ1dGUoJ2RhdGEtcGFnZS1ucicpO1xyXG5cdFx0XHRcdFxyXG5cdFx0XHRcdFByb2R1Y3RzJDIuZ2V0UHJvZHVjdHNCeVBhZ2UocmVxdWVzdGVkUGFnZSkudGhlbihmdW5jdGlvbihwcm9kdWN0cykge1xyXG5cdFx0XHRcdFx0UHJvZHVjdHMkMi5yZXBsYWNlSXRlbXMocHJvZHVjdHMpO1xyXG5cdFx0XHRcdH0pO1xyXG5cdFx0XHRcdFxyXG5cdFx0XHRcdGluc3RhbmNlLnNldEN1cnJlbnQocmVxdWVzdGVkUGFnZSk7XHJcblx0XHRcdH07XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBTZXRzIHRoZSBjdXJyZW50IHBhZ2UuXHJcblx0ICovXHJcblx0c2V0Q3VycmVudChwYWdlTnVtYmVyKSBcclxuXHR7XHJcblx0XHR0aGlzLmN1cnJlbnQgPSBwYXJzZUludChwYWdlTnVtYmVyKTtcclxuXHRcdHRoaXMuY2hhbmdlVXJsKHBhZ2VOdW1iZXIpO1xyXG5cdFx0dGhpcy5zZXRBY3RpdmVMaW5rKHBhZ2VOdW1iZXIpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogR2V0cyB0aGUgY3VycmVudCBwYWdlLlxyXG5cdCAqL1xyXG5cdGdldEN1cnJlbnQoKSBcclxuXHR7XHJcblx0XHRyZXR1cm4gdGhpcy5jdXJyZW50O1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQ3JlYXRlcyB0aGUgcGFnaW5hdGlvbiBsaW5rcy5cclxuXHQgKi9cclxuXHRjcmVhdGVMaW5rcygpIFxyXG5cdHtcclxuXHRcdGxldCB1bCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3VsJyk7XHJcblx0XHRcclxuXHRcdHRoaXMucGFnZXMgPSB0aGlzLmNyZWF0ZVBhZ2VMaW5rcygpO1xyXG5cdFx0dGhpcy5wcmV2aW91cyA9IHRoaXMuY3JlYXRlUHJldmlvdXNCdXR0b24oKTtcclxuXHRcdHRoaXMubmV4dCA9IHRoaXMuY3JlYXRlTmV4dEJ1dHRvbigpO1xyXG5cclxuXHRcdHVsLmNsYXNzTmFtZSA9ICdwYWdpbmF0aW9uJztcclxuXHRcdHVsLmFwcGVuZENoaWxkKHRoaXMucHJldmlvdXMpO1xyXG5cclxuXHRcdHRoaXMucGFnZXMuZm9yRWFjaChmdW5jdGlvbihwYWdlKSB7XHJcblx0XHRcdHVsLmFwcGVuZENoaWxkKHBhZ2UpO1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0dWwuYXBwZW5kQ2hpbGQodGhpcy5uZXh0KTtcclxuXHJcblx0XHRyZXR1cm4gdWw7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBDcmVhdGVzIHRoZSBwYWdlcyBpdGVtIGxpbmtzLlxyXG5cdCAqL1xyXG5cdGNyZWF0ZVBhZ2VMaW5rcygpIFxyXG5cdHtcclxuXHRcdHZhciBwYWdlcyA9IFtdO1xyXG5cclxuXHRcdGZvcih2YXIgaSA9IDE7IGkgPD0gdGhpcy50b3RhbFBhZ2VzOyBpKyspIHtcclxuXHRcdFx0dmFyIHBhZ2VJdGVtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKTtcclxuXHRcdFx0dmFyIGxpbmsgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJyk7XHJcblx0XHRcdHBhZ2VJdGVtLmNsYXNzTmFtZSA9ICh0aGlzLmN1cnJlbnQgPT0gaSkgPyAncGFnZS1pdGVtIGFjdGl2ZScgOiAncGFnZS1pdGVtJztcclxuXHRcdFx0bGluay5jbGFzc05hbWUgPSAncGFnZS1saW5rJztcclxuXHRcdFx0bGluay5zZXRBdHRyaWJ1dGUoJ2hyZWYnLCAnP3BhZ2U9JysgaSk7XHJcblx0XHRcdGxpbmsuc2V0QXR0cmlidXRlKCdkYXRhLXBhZ2UtbnInLCBpKTtcclxuXHRcdFx0bGluay5pbm5lckhUTUwgPSBpO1xyXG5cdFx0XHRwYWdlSXRlbS5hcHBlbmRDaGlsZChsaW5rKTtcclxuXHRcdFx0cGFnZXMucHVzaChwYWdlSXRlbSk7XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIHBhZ2VzO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQ3JlYXRlcyB0aGUgcHJldmlvdXMgYnV0dG9uIGxpbmsuXHJcblx0ICovXHJcblx0Y3JlYXRlUHJldmlvdXNCdXR0b24oKSBcclxuXHR7XHJcblx0XHR2YXIgbGkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaScpO1xyXG5cdFx0dmFyIGxpbmsgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJyk7XHJcblx0XHR2YXIgc3BhbjEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XHJcblx0XHR2YXIgc3BhbjIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XHJcblx0XHRcclxuXHRcdFxyXG5cdFx0bGkuY2xhc3NOYW1lID0gJ3BhZ2UtaXRlbSc7XHJcblx0XHRsaW5rLmNsYXNzTmFtZSA9ICdwYWdlLWxpbmsnO1xyXG5cdFx0c3BhbjIuY2xhc3NOYW1lID0gJ3NyLW9ubHknO1xyXG5cclxuXHRcdGxpbmsuc2V0QXR0cmlidXRlKCdocmVmJywgJycpO1xyXG5cdFx0bGluay5zZXRBdHRyaWJ1dGUoJ2FyaWEtbGFiZWwnLCAnUHJldmlvdXMnKTtcclxuXHRcdHNwYW4xLnNldEF0dHJpYnV0ZSgnYXJpYS1oaWRkZW4nLCAndHJ1ZScpO1xyXG5cclxuXHRcdHNwYW4xLmlubmVySFRNTCA9ICcmbGFxdW87JztcclxuXHRcdHNwYW4yLmlubmVySFRNTCA9ICdQcmV2aW91cyc7XHJcblxyXG5cdFx0bGluay5hcHBlbmRDaGlsZChzcGFuMSk7XHJcblx0XHRsaW5rLmFwcGVuZENoaWxkKHNwYW4yKTtcclxuXHRcdGxpLmFwcGVuZENoaWxkKGxpbmspO1xyXG5cclxuXHRcdHJldHVybiBsaTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIENyZWF0ZXMgdGhlIG5leHQgYnV0dG9uIGxpbmsuXHJcblx0ICovXHJcblx0Y3JlYXRlTmV4dEJ1dHRvbigpIFxyXG5cdHtcclxuXHRcdHZhciBsaSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJyk7XHJcblx0XHR2YXIgbGluayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKTtcclxuXHRcdHZhciBzcGFuMSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcclxuXHRcdHZhciBzcGFuMiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcclxuXHRcdFxyXG5cdFx0bGkuY2xhc3NOYW1lID0gJ3BhZ2UtaXRlbSc7XHJcblx0XHRsaW5rLmNsYXNzTmFtZSA9ICdwYWdlLWxpbmsnO1xyXG5cdFx0c3BhbjIuY2xhc3NOYW1lID0gJ3NyLW9ubHknO1xyXG5cclxuXHRcdGxpbmsuc2V0QXR0cmlidXRlKCdocmVmJywgJycpO1xyXG5cdFx0bGluay5zZXRBdHRyaWJ1dGUoJ2FyaWEtbGFiZWwnLCAnTmV4dCcpO1xyXG5cdFx0c3BhbjEuc2V0QXR0cmlidXRlKCdhcmlhLWhpZGRlbicsICd0cnVlJyk7XHJcblxyXG5cdFx0c3BhbjEuaW5uZXJIVE1MID0gJyZyYXF1bzsnO1xyXG5cdFx0c3BhbjIuaW5uZXJIVE1MID0gJ05leHQnO1xyXG5cclxuXHRcdGxpbmsuYXBwZW5kQ2hpbGQoc3BhbjEpO1xyXG5cdFx0bGluay5hcHBlbmRDaGlsZChzcGFuMik7XHJcblx0XHRsaS5hcHBlbmRDaGlsZChsaW5rKTtcclxuXHJcblx0XHRyZXR1cm4gbGk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBDaGVja3MgaWYgdGhlIGdpdmVuIHBhZ2UgaXMgaW4gcmFuZ2UuXHJcblx0ICovXHJcblx0bm90SW5QYWdlUmFuZ2UocGFnZU51bWJlcikgXHJcblx0e1xyXG5cdFx0cmV0dXJuIChwYWdlTnVtYmVyID4gdGhpcy50b3RhbFBhZ2VzIHx8IHBhZ2VOdW1iZXIgPD0gMCkgfHwgaXNOYU4ocGFnZU51bWJlcik7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBDaGFuZ2VzIHRoZSB1cmwgdG8gYSBnaXZlbiBwYWdlIG51bWJlci5cclxuXHQgKi9cclxuXHRjaGFuZ2VVcmwocGFnZU51bWJlcikgXHJcblx0e1xyXG5cdFx0cGFnZU51bWJlciA9ICBwYWdlTnVtYmVyIHx8IEdFVF9WYXJzKClbJ3BhZ2UnXTtcclxuXHRcdHdpbmRvdy5oaXN0b3J5LnJlcGxhY2VTdGF0ZSgnJywgJycsIHRoaXMudXBkYXRlVVJMUGFyYW1ldGVyKHdpbmRvdy5sb2NhdGlvbi5ocmVmLCAncGFnZScsIHBhZ2VOdW1iZXIpKTtcclxuXHR9XHJcblxyXG5cdHNldEFjdGl2ZUxpbmsocGFnZU51bWJlcilcclxuXHR7XHJcblx0XHRmb3IodmFyIHBhZ2UgaW4gdGhpcy5wYWdlcykge1xyXG5cdFx0XHRpZiAodGhpcy5wYWdlc1twYWdlXS5jaGlsZE5vZGVzWzBdLmdldEF0dHJpYnV0ZSgnZGF0YS1wYWdlLW5yJykgPT0gcGFnZU51bWJlcikge1xyXG5cdFx0XHRcdERPTS5hZGRDbGFzcyh0aGlzLnBhZ2VzW3BhZ2VdLCAnYWN0aXZlJyk7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0RE9NLnJlbW92ZUNsYXNzKHRoaXMucGFnZXNbcGFnZV0sICdhY3RpdmUnKTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogR2V0IHRoZSBnZXQgdmFyaWFibGVzIGZyb20gdGhlIHVybC5cclxuXHQgKi9cclxuXHRHRVRfVmFycygpIFxyXG5cdHtcclxuXHRcdHZhciB2YXJzID0ge307XHJcblx0XHR2YXIgcGFydHMgPSB3aW5kb3cubG9jYXRpb24uaHJlZi5yZXBsYWNlKC9bPyZdKyhbXj0mXSspPShbXiZdKikvZ2ksIGZ1bmN0aW9uKG0sIGtleSwgdmFsdWUpIHtcclxuXHRcdFx0dmFyc1trZXldID0gdmFsdWU7XHJcblx0XHR9KTtcclxuXHJcblx0XHRyZXR1cm4gdmFycztcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIE1vZGlmaWVzIHRoZSBnZXQgcGFyYW1ldGVyIGluIHRoZSB1cmwuXHJcblx0ICovXHJcblx0dXBkYXRlVVJMUGFyYW1ldGVyKHVybCwgcGFyYW0sIHBhcmFtVmFsKSBcclxuXHR7XHJcblx0ICAgIHZhciBuZXdBZGRpdGlvbmFsVVJMID0gXCJcIjtcclxuXHQgICAgdmFyIHRlbXBBcnJheSA9IHVybC5zcGxpdChcIj9cIik7XHJcblx0ICAgIHZhciBiYXNlVVJMID0gdGVtcEFycmF5WzBdO1xyXG5cdCAgICB2YXIgYWRkaXRpb25hbFVSTCA9IHRlbXBBcnJheVsxXTtcclxuXHQgICAgdmFyIHRlbXAgPSBcIlwiO1xyXG5cclxuXHQgICAgaWYgKGFkZGl0aW9uYWxVUkwpIHtcclxuXHQgICAgICAgIHRlbXBBcnJheSA9IGFkZGl0aW9uYWxVUkwuc3BsaXQoXCImXCIpO1xyXG5cdCAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0ZW1wQXJyYXkubGVuZ3RoOyBpKyspe1xyXG5cdCAgICAgICAgICAgIGlmICh0ZW1wQXJyYXlbaV0uc3BsaXQoJz0nKVswXSAhPSBwYXJhbSl7XHJcblx0ICAgICAgICAgICAgICAgIG5ld0FkZGl0aW9uYWxVUkwgKz0gdGVtcCArIHRlbXBBcnJheVtpXTtcclxuXHQgICAgICAgICAgICAgICAgdGVtcCA9IFwiJlwiO1xyXG5cdCAgICAgICAgICAgIH1cclxuXHQgICAgICAgIH1cclxuXHQgICAgfVxyXG5cclxuXHQgICAgdmFyIHJvd3NUZXh0ID0gdGVtcCArIFwiXCIgKyBwYXJhbSArIFwiPVwiICsgcGFyYW1WYWw7XHJcblx0ICAgIHJldHVybiBiYXNlVVJMICsgXCI/XCIgKyBuZXdBZGRpdGlvbmFsVVJMICsgcm93c1RleHQ7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBSZXNldHMgdGhlIHBhZ2luYXRpb24uXHJcblx0ICovXHJcblx0cmVzZXQoKSBcclxuXHR7XHJcblx0XHR0aGlzLnNldEN1cnJlbnQoMSk7XHJcblx0XHR0aGlzLmNoYW5nZVVybCgxKTtcclxuXHR9XHJcbn1cblxuY2xhc3MgQ29va2llXHJcbntcclxuXHQvKipcclxuIFx0KiBTZXRzIGEgY29va2llLiBcclxuXHQqL1xyXG5cdHN0YXRpYyBzZXQobmFtZSwgdmFsdWUsIGRheXMpIFxyXG5cdHtcclxuXHRcdGlmICh2YWx1ZS5jb25zdHJ1Y3Rvci5uYW1lICA9PSAnT2JqZWN0JyB8fCB2YWx1ZS5jb25zdHJ1Y3Rvci5uYW1lID09ICdBcnJheScpIHtcclxuXHRcdFx0dmFsdWUgPSBKU09OLnN0cmluZ2lmeSh2YWx1ZSk7XHJcblx0XHR9XHJcblxyXG5cdCAgICBsZXQgZXhwaXJlcztcclxuXHQgICAgXHJcblx0ICAgIGlmIChkYXlzKSB7XHJcblx0ICAgICAgICBsZXQgZGF0ZSA9IG5ldyBEYXRlKCk7XHJcblx0ICAgICAgICBkYXRlLnNldFRpbWUoZGF0ZS5nZXRUaW1lKCkgKyAoZGF5cyAqIDI0ICogNjAgKiA2MCAqIDEwMDApKTtcclxuXHQgICAgICAgIGV4cGlyZXMgPSBcIjsgZXhwaXJlcz1cIiArIGRhdGUudG9HTVRTdHJpbmcoKTtcclxuXHQgICAgfSBlbHNlIHtcclxuXHQgICAgICAgIGV4cGlyZXMgPSBcIlwiO1xyXG5cdCAgICB9XHJcblxyXG5cdCAgICBkb2N1bWVudC5jb29raWUgPSBuYW1lICsgXCI9XCIgKyB2YWx1ZSArIGV4cGlyZXMgKyBcIjsgcGF0aD0vXCI7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBSZXRyaWV2ZXMgdGhlIGNvb2tpZSBieSBuYW1lLlxyXG5cdCAqL1xyXG5cdHN0YXRpYyBnZXQobmFtZSkgXHJcblx0e1xyXG5cdCAgICBpZiAoZG9jdW1lbnQuY29va2llLmxlbmd0aCA+IDApIHtcclxuXHQgICAgICAgIGxldCBjX3N0YXJ0ID0gZG9jdW1lbnQuY29va2llLmluZGV4T2YobmFtZSArIFwiPVwiKTtcclxuXHQgICAgICAgIFxyXG5cdCAgICAgICAgaWYgKGNfc3RhcnQgIT0gLTEpIHtcclxuXHQgICAgICAgICAgICBjX3N0YXJ0ID0gY19zdGFydCArIG5hbWUubGVuZ3RoICsgMTtcclxuXHQgICAgICAgICAgICBsZXQgY19lbmQgPSBkb2N1bWVudC5jb29raWUuaW5kZXhPZihcIjtcIiwgY19zdGFydCk7XHJcblx0ICAgICAgICAgICAgXHJcblx0ICAgICAgICAgICAgaWYgKGNfZW5kID09IC0xKSB7XHJcblx0ICAgICAgICAgICAgICAgIGNfZW5kID0gZG9jdW1lbnQuY29va2llLmxlbmd0aDtcclxuXHQgICAgICAgICAgICB9XHJcblxyXG5cdCAgICAgICAgICAgIHJldHVybiBKU09OLnBhcnNlKHVuZXNjYXBlKGRvY3VtZW50LmNvb2tpZS5zdWJzdHJpbmcoY19zdGFydCwgY19lbmQpKSk7XHJcblx0ICAgICAgICB9XHJcblx0ICAgIH1cclxuXHJcblx0ICAgIHJldHVybiBbXTtcclxuXHR9XHJcbn1cblxuLyoqXHJcbiAqIFRoZSBkZWZhdWx0IHNldHRpbmdzIG9mIHRoZSBjYXJ0LlxyXG4gKi9cclxubGV0IGRlZmF1bHRTZXR0aW5ncyQ0ID0ge1xyXG5cdGVsZW1lbnQ6ICcuY2FydCcsXHJcblx0Y29va2llX25hbWU6ICdjYXJ0JyxcclxuXHRwcmV2aWV3X2NsYXNzOiAnJyxcclxuXHRjbGFzczogJycsXHJcblx0d2lkdGg6ICc2MHB4JyxcclxuXHRoZWlnaHQ6ICc2MHB4JyxcclxuXHRwbGFjZW1lbnQ6ICdyaWdodC10b3AnLFxyXG5cdGZpeGVkOiB0cnVlLFxyXG5cdGhvdmVyX2NvbG9yOiAnb3JhbmdlJ1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIFN0b3JlcyB0aGUgY29udGFpbmVyIG9iamVjdC5cclxuICovXHJcbmxldCBDb250YWluZXIkNTtcclxuXHJcbi8qKlxyXG4gKiBUaGUgQ2FydCBPYmplY3QsIGhhbmRsZXMgdGhlIGNhcnQgaWNvbiBhbmQgc2Vzc2lvbnMuXHJcbiAqL1xyXG5jbGFzcyBDYXJ0IFxyXG57XHJcblx0LyoqXHJcblx0ICogSW5pdGlhbGl6ZSB0aGUgZGVmYXVsdCBzZXR0aW5ncywgc2V0dGluZyB0aGUgZWxlbWVudCxcclxuXHQgKiBhbmQgY3JlYXRpbmcgdGhlIHByZXZpZXcgZm9yIHRoZSBjYXJ0cyBkZXRhaWxzLlxyXG5cdCAqL1xyXG5cdGNvbnN0cnVjdG9yKGNvbnRhaW5lcikgXHJcblx0e1xyXG5cdFx0Q29udGFpbmVyJDUgPSBjb250YWluZXI7XHJcblx0XHRcclxuXHRcdHRoaXMucHJldmlld0VsZW1lbnQgPSB0aGlzLmNyZWF0ZVByZXZpZXdFbGVtZW50KCk7XHJcblx0XHR0aGlzLnN2Z0ljb24gPSBjcmVhdGVJY29uLmNhbGwodGhpcyk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBTZXRzIHRoZSBvYmplY3QgYnkgdGhlIHVzZXJzIHNldHRpbmcuXHJcblx0ICovXHJcblx0c2V0dXAoc2V0dGluZ3MpXHJcblx0e1xyXG5cdFx0aWYodHlwZW9mIHNldHRpbmdzICE9ICdvYmplY3QnKSB7XHJcblx0XHRcdHRocm93IG5ldyBJbnZhbGlkQXJndW1lbnRFeGNlcHRpb24kMTtcclxuXHRcdH1cclxuXHJcblx0XHR0aGlzLnNldHRpbmdzID0gQ29tbW9uLmV4dGVuZChkZWZhdWx0U2V0dGluZ3MkNCwgc2V0dGluZ3MpO1xyXG5cclxuXHRcdHRoaXMuc2V0RWxlbWVudCh0aGlzLnNldHRpbmdzLmVsZW1lbnQpO1xyXG5cclxuXHRcdERPTS5hZGRDbGFzcyh0aGlzLnByZXZpZXdFbGVtZW50LCAnY2xvc2VkJyk7XHJcblx0XHRET00uYWRkQ2xhc3ModGhpcy5wcmV2aWV3RWxlbWVudCwgdGhpcy5zZXR0aW5ncy5wcmV2aWV3X2NsYXNzKTtcclxuXHRcdFxyXG5cdFx0dGhpcy5iaW5kRXZlbnRMaXN0ZW5lcnMoKTtcclxuXHRcdHRoaXMuYWRkU3R5bGVUYWcoKTtcclxuXHJcblx0XHRpZih0aGlzLmlzRW1wdHkoQ29va2llLmdldCh0aGlzLnNldHRpbmdzLmNvb2tpZV9uYW1lKSkpIHtcclxuXHRcdFx0dGhpcy5jYXJ0ID0ge307XHJcblx0XHRcdHRoaXMuc2V0Q2FydCh0aGlzLmNhcnQpO1xyXG5cdFx0fVxyXG5cclxuXHJcblx0XHRFdmVudC5saXN0ZW4oJ1Byb2R1Y3RXYXNBZGRlZCcsIGZ1bmN0aW9uKGF0dHJpYnV0ZXMpIHtcclxuXHRcdFx0dGhpcy5hZGRUb1ByZXZpZXcoYXR0cmlidXRlcyk7XHJcblx0XHR9LmJpbmQodGhpcykpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQ2hlY2tzIGlmIHRoZSBjYXJ0IGlzIGVtcHR5XHJcblx0ICovXHJcblx0aXNFbXB0eShjYXJ0KVxyXG5cdHtcclxuXHRcdHJldHVybiBDb21tb24uZW1wdHlPYmplY3QoY2FydCk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBTZXRzIHRoZSBjYXJ0IGFzIGEgY29va2llLlxyXG5cdCAqL1xyXG5cdHNldENhcnQoY2FydClcclxuXHR7XHJcblx0XHR0aGlzLmNhcnQuaWQgPSBTdHIucmFuZG9tKDEwKTtcclxuXHRcdHRoaXMuY2FydC5pdGVtcyA9IFtdO1xyXG5cdFx0dGhpcy5jYXJ0LmZhdm9yaXRlcyA9IFtdO1xyXG5cdFx0Q29va2llLnNldCh0aGlzLnNldHRpbmdzLmNvb2tpZV9uYW1lLCBjYXJ0LCAyKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEFkZHMgYW4gaXRlbSB0byB0aGUgY2FydC5cclxuXHQgKi9cclxuXHRhZGRJdGVtKGl0ZW0pXHJcblx0e1xyXG5cdFx0dGhpcy5jYXJ0ID0gQ29va2llLmdldCh0aGlzLnNldHRpbmdzLmNvb2tpZV9uYW1lKTtcclxuXHJcblx0XHR0aGlzLmNhcnQuaXRlbXMucHVzaChpdGVtKTtcclxuXHJcblx0XHRDb29raWUuc2V0KHRoaXMuc2V0dGluZ3MuY29va2llX25hbWUsIHRoaXMuY2FydCwgMik7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBSZW1vdmVzIGFuIGl0ZW0gZnJvbSB0aGUgY2FydC5cclxuXHQgKi9cclxuXHRyZW1vdmVJdGVtKGl0ZW0pXHJcblx0e1xyXG4gXHRcdHRoaXMuY2FydCA9IENvb2tpZS5nZXQodGhpcy5zZXR0aW5ncy5jb29raWVfbmFtZSk7XHJcblxyXG4gXHRcdHRoaXMuY2FydC5pdGVtcy5zcGxpY2UodGhpcy5jYXJ0Lml0ZW1zLmluZGV4T2YoaXRlbSksIDEpO1xyXG5cclxuIFx0XHRDb29raWUuc2V0KHRoaXMuc2V0dGluZ3MuY29va2llX25hbWUsIHRoaXMuY2FydCwgMik7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBBZGRzIHRoZSBpdGVtIHRvIHByZXZpZXcuXHJcblx0ICovXHJcblx0YWRkVG9QcmV2aWV3KGl0ZW0pXHJcblx0e1xyXG5cdFx0bGV0IGxpID0gRE9NLmNyZWF0ZUVsZW1lbnQoJ2xpJywge1xyXG5cdFx0XHRcdGNsYXNzOiAnaXRlbSdcclxuXHRcdFx0fSk7XHJcblxyXG5cdFx0Zm9yKGxldCBhdHRyaWJ1dGUgaW4gaXRlbSkge1xyXG5cdFx0XHRsZXQgc3BhbiA9IERPTS5jcmVhdGVFbGVtZW50KCdzcGFuJywge1xyXG5cdFx0XHRcdHRleHQ6IGl0ZW1bYXR0cmlidXRlXVxyXG5cdFx0XHR9KTtcclxuXHJcblx0XHRcdGxpLmFwcGVuZENoaWxkKHNwYW4pO1xyXG5cdFx0fVxyXG5cclxuXHRcdHRoaXMucHJldmlld0VsZW1lbnQucXVlcnlTZWxlY3RvcignLml0ZW1zJykuYXBwZW5kQ2hpbGQobGkpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQmluZHMgZXZlcnRoaW5nIHRvIHRoZSBlbGVtZW50LlxyXG5cdCAqL1xyXG5cdHNldEVsZW1lbnQoc2VsZWN0b3IpXHJcblx0e1xyXG5cdFx0dGhpcy5pY29uID0gRE9NLmVsZW1lbnQoc2VsZWN0b3IpO1xyXG5cclxuXHRcdGlmICh0aGlzLmljb24pIHtcclxuXHRcdFx0RE9NLmFkZENsYXNzKHRoaXMuaWNvbiwgdGhpcy5zZXR0aW5ncy5jbGFzcyk7XHJcblx0XHRcdERPTS5hZGRDbGFzcyh0aGlzLmljb24sIHRoaXMuc2V0dGluZ3MucGxhY2VtZW50KTtcclxuXHRcdFx0dGhpcy5pY29uLmFwcGVuZENoaWxkKHRoaXMuc3ZnSWNvbik7XHJcblx0XHRcdHRoaXMuaWNvbi5hcHBlbmRDaGlsZCh0aGlzLnByZXZpZXdFbGVtZW50KTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIENyZWF0ZXMgdGhlIGNhcnQgZGV0YWlscyBwcmV2aWV3IGVsZW1lbnQuXHJcblx0ICovXHJcblx0Y3JlYXRlUHJldmlld0VsZW1lbnQoKVxyXG5cdHtcclxuXHRcdGxldCBwcmV2aWV3RWxlbWVudCA9IERPTS5jcmVhdGVFbGVtZW50KCdkaXYnLCB7XHJcblx0XHRcdGlkOiAncHJldmlldydcclxuXHRcdH0pO1xyXG5cclxuXHRcdGxldCB1bCA9IERPTS5jcmVhdGVFbGVtZW50KCd1bCcsIHtcclxuXHRcdFx0XHRjbGFzczogJ2l0ZW1zJ1xyXG5cdFx0XHR9KTtcclxuXHJcblx0XHRwcmV2aWV3RWxlbWVudC5hcHBlbmRDaGlsZCh1bCk7XHJcblxyXG5cdFx0cmV0dXJuIHByZXZpZXdFbGVtZW50O1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQWRkIHRoZSBlQ29tbWVyY2Ugc3R5bGUgdGFncyB0byB0aGUgRE9NLlxyXG5cdCAqL1xyXG5cdGFkZFN0eWxlVGFnKCkgXHJcblx0e1xyXG5cdFx0aWYoRE9NLmVsZW1lbnQoJyNlQ29tbWVyY2UtQ2FydCcpKSB7XHJcblx0XHRcdHJldHVybjtcclxuXHRcdH1cclxuXHJcblx0XHRsZXQgcG9zaXRpb24gPSAodGhpcy5zZXR0aW5ncy5maXhlZCkgPyAnZml4ZWQnIDogJ2Fic29sdXRlJztcclxuXHJcblx0XHRsZXQgY3NzID0gYFxyXG5cdFx0XHQke3RoaXMuc2V0dGluZ3MuZWxlbWVudH0ge1xyXG5cdFx0XHRcdHBvc2l0aW9uOiAke3Bvc2l0aW9ufTtcclxuXHRcdFx0XHRjdXJzb3I6IHBvaW50ZXI7XHJcblx0XHRcdFx0Y29sb3I6ICNmZmZmZmY7XHJcblx0XHRcdFx0ei1pbmRleDogOTk4O1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHQke3RoaXMuc2V0dGluZ3MuZWxlbWVudH0gPiBzdmcge1xyXG5cdFx0XHRcdHdpZHRoOiAke3RoaXMuc2V0dGluZ3Mud2lkdGh9O1xyXG5cdFx0XHRcdGhlaWdodDogJHt0aGlzLnNldHRpbmdzLmhlaWdodH07XHJcblx0XHRcdFx0dHJhbnNpdGlvbjogZmlsbCAwLjNzO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHQke3RoaXMuc2V0dGluZ3MuZWxlbWVudH0gPiBzdmc6aG92ZXIge1xyXG5cdFx0XHRcdGZpbGw6ICR7dGhpcy5zZXR0aW5ncy5ob3Zlcl9jb2xvcn07XHJcblx0XHRcdFx0dHJhbnNpdGlvbjogZmlsbCAwLjNzO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHQke3RoaXMuc2V0dGluZ3MuZWxlbWVudH0udG9wLXJpZ2h0LFxyXG5cdFx0XHQke3RoaXMuc2V0dGluZ3MuZWxlbWVudH0ucmlnaHQtdG9wIHtcclxuXHRcdFx0XHRyaWdodDogMTBweDtcclxuXHRcdFx0XHR0b3A6IDEwcHg7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdCR7dGhpcy5zZXR0aW5ncy5lbGVtZW50fS5sZWZ0LXRvcCxcclxuXHRcdFx0JHt0aGlzLnNldHRpbmdzLmVsZW1lbnR9LnRvcC1sZWZ0IHtcclxuXHRcdFx0XHRsZWZ0OiAxMHB4O1xyXG5cdFx0XHRcdHRvcDogMTBweDtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0JHt0aGlzLnNldHRpbmdzLmVsZW1lbnR9ID4gI3ByZXZpZXcge1xyXG5cdFx0XHRcdHBvc2l0aW9uOiAke3Bvc2l0aW9ufTtcclxuXHRcdFx0XHR6LWluZGV4OiA5OTk5O1xyXG5cdFx0XHRcdHRvcDogY2FsYygxMHB4ICsgJHt0aGlzLnNldHRpbmdzLmhlaWdodH0pO1xyXG5cdFx0XHRcdHRyYW5zZm9ybTogdHJhbnNsYXRlWCg2MHB4KTtcclxuXHRcdFx0XHRoZWlnaHQ6IDQwMHB4O1xyXG5cdFx0XHRcdHdpZHRoOiAzMDBweDtcclxuXHRcdFx0XHRib3JkZXI6IDFweCBzb2xpZCAjZTRlNGU0O1xyXG5cdFx0XHRcdGJhY2tncm91bmQ6ICNmZmZmZmY7XHJcblx0XHRcdFx0dHJhbnNpdGlvbjogdHJhbnNmb3JtIDFzLCB2aXNpYmlsaXR5IDFzO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHQke3RoaXMuc2V0dGluZ3MuZWxlbWVudH0gPiAjcHJldmlldy5vcGVuZWQge1xyXG5cdFx0XHRcdHZpc2liaWxpdHk6IHZpc2libGU7XHJcblx0XHRcdFx0dHJhbnNmb3JtOiB0cmFuc2xhdGVYKC0yNDBweCk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdCR7dGhpcy5zZXR0aW5ncy5lbGVtZW50fSA+ICNwcmV2aWV3LmNsb3NlZCB7XHJcblx0XHRcdFx0dmlzaWJpbGl0eTogaGlkZGVuO1xyXG5cdFx0XHRcdHRyYW5zZm9ybTogdHJhbnNsYXRlWCg2MHB4KTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0JHt0aGlzLnNldHRpbmdzLmVsZW1lbnR9ID4gI3ByZXZpZXcgPiB1bC5pdGVtcyxcclxuXHRcdFx0JHt0aGlzLnNldHRpbmdzLmVsZW1lbnR9ID4gI3ByZXZpZXcgPiB1bC5pdGVtcyA+IGxpLml0ZW0ge1xyXG5cdFx0XHRcdGNvbG9yOiAjMDAwMDAwO1xyXG5cdFx0XHRcdGxpc3Qtc3R5bGUtdHlwZTogbm9uZTtcclxuXHRcdFx0fVxyXG5cdFx0YDtcclxuXHQgICAgXHJcblx0ICAgIERPTS5hZGRTdHlsZSgnZUNvbW1lcmNlLUNhcnQnLCBjc3MpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQmluZHMgZXZlbnQgbGlzdGVuZXJzIHRvIHRoZSBjYXJ0IGljb24uXHJcblx0ICovXHJcblx0YmluZEV2ZW50TGlzdGVuZXJzKClcclxuXHR7XHJcblx0XHRpZih0aGlzLnN2Z0ljb24gPT0gbnVsbCkge1xyXG5cdFx0XHRyZXR1cm47XHJcblx0XHR9XHJcblxyXG5cdFx0dGhpcy5zdmdJY29uLm9uY2xpY2sgPSBmdW5jdGlvbihldmVudCkge1xyXG5cdFx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdFx0XHRET00udG9nZ2xlQ2xhc3ModGhpcy5wcmV2aWV3RWxlbWVudCwgJ29wZW5lZCcsICdjbG9zZWQnKTtcclxuXHRcdH0uYmluZCh0aGlzKTtcclxuXHR9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNsb3NlKGV2ZW50KSB7XHJcblx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuXHRET00uc3dpdGNoQ2xhc3Nlcyh0aGlzLnByZXZpZXdFbGVtZW50LCAnb3BlbmVkJywgJ2Nsb3NlZCcpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBjcmVhdGVJY29uKCkge1xyXG5cdGxldCBzdmcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50TlMoXCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiLCBcInN2Z1wiKTtcclxuXHRsZXQgZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnROUyhcImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIsIFwiZ1wiKTtcclxuXHRsZXQgcGF0aCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnROUyhcImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIsIFwicGF0aFwiKTtcclxuXHJcblx0c3ZnLnNldEF0dHJpYnV0ZSgndmVyc2lvbicsICcxLjEnKTtcclxuXHRzdmcuc2V0QXR0cmlidXRlKCd4bWxucycsICdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZycpO1xyXG5cdHN2Zy5zZXRBdHRyaWJ1dGUoJ3htbG5zOnhsaW5rJywgJ2h0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsnKTtcclxuXHRzdmcuc2V0QXR0cmlidXRlKCd4JywgJzBweCcpO1xyXG5cdHN2Zy5zZXRBdHRyaWJ1dGUoJ3knLCAnMHB4Jyk7XHJcblx0c3ZnLnNldEF0dHJpYnV0ZSgnd2lkdGgnLCAnNDQ2Ljg0M3B4Jyk7XHJcblx0c3ZnLnNldEF0dHJpYnV0ZSgnaGVpZ2h0JywgJzQ0Ni44NDNweCcpO1xyXG5cdHN2Zy5zZXRBdHRyaWJ1dGUoJ3ZpZXdCb3gnLCAnMCAwIDQ0Ni44NDMgNDQ2Ljg0MycpO1xyXG5cdHN2Zy5zZXRBdHRyaWJ1dGUoJ3N0eWxlJywgJ2VuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgNDQ2Ljg0MyA0NDYuODQzOycpO1xyXG5cdHN2Zy5zZXRBdHRyaWJ1dGUoJ3htbDpzcGFjZScsICdwcmVzZXJ2ZScpO1xyXG5cclxuXHRwYXRoLnNldEF0dHJpYnV0ZSgnZCcsICdNNDQ0LjA5LDkzLjEwM2MtMi42OTgtMy42OTktNy4wMDYtNS44ODgtMTEuNTg0LTUuODg4SDEwOS45MmMtMC42MjUsMC0xLjI0OSwwLjAzOC0xLjg1LDAuMTE5bC0xMy4yNzYtMzguMjdjLTEuMzc2LTMuOTU4LTQuNDA2LTcuMTEzLTguMy04LjY0NkwxOS41ODYsMTQuMTM0Yy03LjM3NC0yLjg4Ny0xNS42OTUsMC43MzUtMTguNTkxLDguMWMtMi44OTEsNy4zNjksMC43MywxNS42OTUsOC4xLDE4LjU5MWw2MC43NjgsMjMuODcybDc0LjM4MSwyMTQuMzk5Yy0zLjI4MywxLjE0NC02LjA2NSwzLjY2My03LjMzMiw3LjE4N2wtMjEuNTA2LDU5LjczOWMtMS4zMTgsMy42NjMtMC43NzUsNy43MzMsMS40NjgsMTAuOTE2YzIuMjQsMy4xODMsNS44ODMsNS4wNzgsOS43NzMsNS4wNzhoMTEuMDQ0Yy02Ljg0NCw3LjYxNi0xMS4wNDQsMTcuNjQ2LTExLjA0NCwyOC42NzVjMCwyMy43MTgsMTkuMjk4LDQzLjAxMiw0My4wMTIsNDMuMDEyczQzLjAxMi0xOS4yOTQsNDMuMDEyLTQzLjAxMmMwLTExLjAyOS00LjItMjEuMDU5LTExLjA0NC0yOC42NzVoOTMuNzc2Yy02Ljg0Nyw3LjYxNi0xMS4wNDgsMTcuNjQ2LTExLjA0OCwyOC42NzVjMCwyMy43MTgsMTkuMjk0LDQzLjAxMiw0My4wMTMsNDMuMDEyYzIzLjcxOCwwLDQzLjAxMi0xOS4yOTQsNDMuMDEyLTQzLjAxMmMwLTExLjAyOS00LjItMjEuMDU5LTExLjA0My0yOC42NzVoMTMuNDMzYzYuNTk5LDAsMTEuOTQ3LTUuMzQ5LDExLjk0Ny0xMS45NDhjMC02LjU5OS01LjM0OS0xMS45NDctMTEuOTQ3LTExLjk0N0gxNDMuNjQ3bDEzLjMxOS0zNi45OTZjMS43MiwwLjcyNCwzLjU3OCwxLjE1Miw1LjUyMywxLjE1MmgyMTAuMjc4YzYuMjM0LDAsMTEuNzUxLTQuMDI3LDEzLjY1LTkuOTU5bDU5LjczOS0xODYuMzg3QzQ0Ny41NTcsMTAxLjU2Nyw0NDYuNzg4LDk2LjgwMiw0NDQuMDksOTMuMTAzeiBNMTY5LjY1OSw0MDkuODA3Yy0xMC41NDMsMC0xOS4xMTYtOC41NzMtMTkuMTE2LTE5LjExNnM4LjU3My0xOS4xMTcsMTkuMTE2LTE5LjExN3MxOS4xMTYsOC41NzQsMTkuMTE2LDE5LjExN1MxODAuMjAyLDQwOS44MDcsMTY5LjY1OSw0MDkuODA3eiBNMzI3LjM2Nyw0MDkuODA3Yy0xMC41NDMsMC0xOS4xMTctOC41NzMtMTkuMTE3LTE5LjExNnM4LjU3NC0xOS4xMTcsMTkuMTE3LTE5LjExN2MxMC41NDIsMCwxOS4xMTYsOC41NzQsMTkuMTE2LDE5LjExN1MzMzcuOTA5LDQwOS44MDcsMzI3LjM2Nyw0MDkuODA3eiBNNDAyLjUyLDE0OC4xNDloLTczLjE2MVYxMTUuODloODMuNDk5TDQwMi41MiwxNDguMTQ5eiBNMzgxLjQ1MywyMTMuODYxaC01Mi4wOTR2LTM3LjAzOGg2My45NjdMMzgxLjQ1MywyMTMuODYxeiBNMjM0LjU3MSwyMTMuODYxdi0zNy4wMzhoNjYuMTEzdjM3LjAzOEgyMzQuNTcxeiBNMzAwLjY4NCwyNDIuNTM4djMxLjA2NGgtNjYuMTEzdi0zMS4wNjRIMzAwLjY4NHogTTEzOS4xMTUsMTc2LjgyM2g2Ni43ODR2MzcuMDM4aC01My45MzNMMTM5LjExNSwxNzYuODIzeiBNMjM0LjU3MSwxNDguMTQ5VjExNS44OWg2Ni4xMTN2MzIuMjU5SDIzNC41NzF6IE0yMDUuODk4LDExNS44OXYzMi4yNTloLTc2LjczNGwtMTEuMTkxLTMyLjI1OUgyMDUuODk4eiBNMTYxLjkxNiwyNDIuNTM4aDQzLjk4MnYzMS4wNjRoLTMzLjIwNkwxNjEuOTE2LDI0Mi41Mzh6IE0zMjkuMzU5LDI3My42MDN2LTMxLjA2NGg0Mi45MDlsLTkuOTU1LDMxLjA2NEgzMjkuMzU5eicpO1xyXG5cclxuXHRnLmFwcGVuZENoaWxkKHBhdGgpO1xyXG5cdHN2Zy5hcHBlbmRDaGlsZChnKTtcclxuXHJcblxyXG5cdHJldHVybiBzdmc7XHJcbn1cblxubGV0IGluaXRhbGl6ZWQgPSBmYWxzZTtcblxubGV0IGRlZmF1bHRTZXR0aW5ncyA9IHtcblx0aW1wb3J0Qm9vdHN0cmFwOiBmYWxzZSxcblx0Y29tcG9uZW50czogWydQcm9kdWN0cycsICdTZXJ2aWNlcycsICdGaWx0ZXInLCAnUGFnaW5hdGlvbicsICdDYXJ0J11cbn07XG5cbmNsYXNzIGVDb21tZXJjZVxue1xuXHRjb25zdHJ1Y3RvcihzZXR0aW5ncylcblx0e1xuXHRcdEV4Y2VwdGlvbkhhbmRsZXIuaW5pdGFsaXplKCk7XG5cblx0XHRpZih0eXBlb2Ygc2V0dGluZ3MgIT0gJ29iamVjdCcpIHtcblx0XHRcdHRocm93IG5ldyBJbnZhbGlkQXJndW1lbnRFeGNlcHRpb24kMTtcblx0XHR9XG5cblx0XHR0aGlzLmNvbnRhaW5lciA9IG5ldyBDb250YWluZXI7XG5cdFx0dGhpcy5zZXR0aW5ncyA9IENvbW1vbi5leHRlbmQoZGVmYXVsdFNldHRpbmdzLCBzZXR0aW5ncyk7XG5cdFx0XG5cdFx0YmluZENvbXBvbmVudHNEZXBlbmRlbmNpZXMuY2FsbCh0aGlzLCBzZXR0aW5ncy5jb21wb25lbnRzKTtcblxuXHRcdGluaXRhbGl6ZWQgPSB0cnVlO1xuXG5cdFx0cmV0dXJuIG5ldyBQcm94eSh0aGlzLCB7XG5cdFx0XHRnZXQ6IGZ1bmN0aW9uKHRhcmdldCwgb2JqZWN0KSB7XG5cdFx0XHRcdGlmKCEgQ29tbW9uLmluX2FycmF5KG9iamVjdCwgc2V0dGluZ3MuY29tcG9uZW50cykpIHtcblx0XHRcdFx0XHR0aHJvdyBuZXcgQ29tcG9uZW50Tm90UmVnaXN0ZXJlZEV4Y2VwdGlvbjtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdHJldHVybiB0YXJnZXQuY29udGFpbmVyLm1ha2Uob2JqZWN0KTtcblx0XHRcdH1cblx0XHR9KTtcblx0fVxufVxuXG4vKipcbiAqIEJpbmRzIGNvbXBvbmVudHMgZGVwZW5kZW5jaWVzLlxuICovXG5mdW5jdGlvbiBiaW5kQ29tcG9uZW50c0RlcGVuZGVuY2llcyhjb21wb25lbnRzKSB7XG5cdHRoaXMuY29udGFpbmVyLmJpbmQoJ0ZpbHRlcicsIGZ1bmN0aW9uKGNvbnRhaW5lcikge1xuXHRcdGNvbnRhaW5lclsnRmlsdGVyJ10uYm9vdGVkID0gdHJ1ZTtcblx0XHRyZXR1cm4gbmV3IEZpbHRlcihjb250YWluZXIpO1xuXHR9KTtcblx0XG5cdHRoaXMuY29udGFpbmVyLmJpbmQoJ1NlcnZpY2VzJywgZnVuY3Rpb24oY29udGFpbmVyKSB7IFxuXHRcdGNvbnRhaW5lclsnU2VydmljZXMnXS5ib290ZWQgPSB0cnVlO1xuXHRcdHJldHVybiBuZXcgU2VydmljZXMoY29udGFpbmVyKTtcblx0fSk7XG5cblx0dGhpcy5jb250YWluZXIuYmluZCgnUHJvZHVjdHMnLCBmdW5jdGlvbihjb250YWluZXIpIHtcblx0XHRjb250YWluZXJbJ1Byb2R1Y3RzJ10uYm9vdGVkID0gdHJ1ZTtcblx0XHRyZXR1cm4gbmV3IFByb2R1Y3RzKGNvbnRhaW5lcik7XG5cdH0pO1xuXG5cdHRoaXMuY29udGFpbmVyLmJpbmQoJ1BhZ2luYXRpb24nLCBmdW5jdGlvbihjb250YWluZXIpIHtcblx0XHRjb250YWluZXJbJ1BhZ2luYXRpb24nXS5ib290ZWQgPSB0cnVlO1xuXHRcdHJldHVybiBuZXcgUGFnaW5hdGlvbihjb250YWluZXIsIGNvbnRhaW5lci5tYWtlKCdQcm9kdWN0cycpKTtcblx0fSk7XG5cblx0dGhpcy5jb250YWluZXIuYmluZCgnQ2FydCcsIGZ1bmN0aW9uKGNvbnRhaW5lcikge1xuXHRcdGNvbnRhaW5lclsnQ2FydCddLmJvb3RlZCA9IHRydWU7XG5cdFx0cmV0dXJuIG5ldyBDYXJ0KGNvbnRhaW5lcik7XG5cdH0pO1xuXG5cdHRoaXMuY29udGFpbmVyWydGaWx0ZXInXVsnYm9vdGVkJ10gPSBmYWxzZTtcblx0dGhpcy5jb250YWluZXJbJ1NlcnZpY2VzJ11bJ2Jvb3RlZCddID0gZmFsc2U7XG5cdHRoaXMuY29udGFpbmVyWydQcm9kdWN0cyddWydib290ZWQnXSA9IGZhbHNlO1xuXHR0aGlzLmNvbnRhaW5lclsnUGFnaW5hdGlvbiddWydib290ZWQnXSA9IGZhbHNlO1xuXHR0aGlzLmNvbnRhaW5lclsnQ2FydCddWydib290ZWQnXSA9IGZhbHNlO1xufVxuXG5yZXR1cm4gZUNvbW1lcmNlO1xuXG59KCkpO1xuIl19
