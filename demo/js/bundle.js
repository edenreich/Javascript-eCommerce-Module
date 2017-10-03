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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVDb21tZXJjZS5qcyJdLCJuYW1lcyI6WyJlQ29tbWVyY2UiLCJJbnZhbGlkQXJndW1lbnRFeGNlcHRpb24kMSIsImNvbnNvbGUiLCJlcnJvciIsIkVycm9yIiwiRE9NIiwic3RyaW5nIiwicmVwbGFjZSIsImVsZW1lbnQiLCJjbGFzc05hbWUiLCJuZXdDbGFzc05hbWUiLCJyZW1vdmVDbGFzcyIsImFkZENsYXNzIiwidW5kZWZpbmVkIiwiY2xhc3NOYW1lcyIsInNwbGl0IiwiZm9yRWFjaCIsIm5hbWUiLCJjbGFzc0xpc3QiLCJhZGQiLCJyZW1vdmUiLCJzZWxlY3RvciIsInF1ZXJ5RWxlbWVudCIsImNhbGwiLCJkb2N1bWVudCIsImlkIiwiY3NzIiwiaGVhZCIsImdldEVsZW1lbnRzQnlUYWdOYW1lIiwic3R5bGVUYWciLCJjcmVhdGVFbGVtZW50IiwiQ1NTIiwibWluaWZ5Q3NzIiwiaW5uZXJIVE1MIiwic2V0QXR0cmlidXRlIiwiYXBwZW5kQ2hpbGQiLCJlbGVtZW50VHlwZSIsIm9wdGlvbnMiLCJvcHRpb24iLCJzZWNvbmRDbGFzc05hbWUiLCJ0b2dnbGUiLCJwYXJlbnQiLCJxdWVyeVNlbGVjdG9yQWxsIiwibGVuZ3RoIiwiZXZlbnRzIiwiRXZlbnQiLCJjYWxsYmFjayIsIkludmFsaWRBcmd1bWVudEV4Y2VwdGlvbiIsInB1c2giLCJkYXRhIiwiQmFkRXZlbnRDYWxsRXhjZXB0aW9uIiwiQ29tbW9uIiwiY3VycmVudE9iaiIsIm5ld09iaiIsImV4dGVuZGVkIiwicHJvcCIsIk9iamVjdCIsInByb3RvdHlwZSIsImhhc093blByb3BlcnR5IiwibmVlZGxlIiwiaHlzdGFjayIsImNvbnN0cnVjdG9yIiwiQXJyYXkiLCJpIiwib2JqZWN0IiwiSW52YWxpZEJpbmRpbmdFeGNlcHRpb24iLCJpbnN0YW5jZXMiLCJDb250YWluZXIiLCJrZXkiLCJjb25jcmV0ZSIsImJpbmQiLCJpbnN0YW5jZSIsImluc3RhbmNlRXhpc3QiLCJnZXRJbnN0YW5jZSIsInNldEluc3RhbmNlIiwiQ29tcG9uZW50c0V4Y2VwdGlvbiIsIkJhZEV2ZW50Q2FsbEV4Y2VwdGlvbiQxIiwiTm90SW5QYWdlUmFuZ2VFeGNlcHRpb24iLCJDb21wb25lbnROb3RSZWdpc3RlcmVkRXhjZXB0aW9uIiwiRXhjZXB0aW9uSGFuZGxlciIsIndpbmRvdyIsIm9uZXJyb3IiLCJtZXNzYWdlIiwic291cmNlIiwibGluZW5vIiwiY29sbm8iLCJkZWZhdWx0U2V0dGluZ3MkMSIsImNsYXNzIiwid2lkdGgiLCJoZWlnaHQiLCJDb250YWluZXIkMiIsIkZpbHRlciIsImNvbnRhaW5lciIsInNldHRpbmdzIiwiZXh0ZW5kIiwic2V0RWxlbWVudCIsIndyYXBwZXIiLCJTdHIiLCJ0b0xvd2VyQ2FzZSIsInBvc3NpYmxlIiwiY2hhckF0IiwiTWF0aCIsImZsb29yIiwicmFuZG9tIiwiZGVmYXVsdFNldHRpbmdzJDIiLCJpdGVtX2NsYXNzIiwiYWRkX2J1dHRvbl9jbGFzcyIsImZhdm9yaXRlX2J1dHRvbl9jbGFzcyIsImF0dHJpYnV0ZXMiLCJ1cmwiLCJDb250YWluZXIkMyIsIlByb2R1Y3RzIiwiYWRkRXZlbnRMaXN0ZW5lciIsImFkZFN0eWxlVGFnIiwiUGFnaW5hdGlvbiIsImJvb3RlZCIsImdldFByb2R1Y3RzQnlQYWdlIiwidGhlbiIsInByb2R1Y3RzIiwicmVwbGFjZUl0ZW1zIiwibG9hZEFsbFByb2R1Y3RzIiwicmVxdWVzdCIsImdldFByb2R1Y3RzIiwiaXRlbXMiLCJ0cmlnZ2VyIiwiY2F0Y2giLCJpc0FycmF5IiwiYnVpbGRQcm9kdWN0cyIsInByb2R1Y3QiLCJhc2tTZXJ2ZXIiLCJwYWdlTnVtYmVyIiwiUHJvbWlzZSIsInJlc29sdmUiLCJyZWplY3QiLCJ4aHIiLCJYTUxIdHRwUmVxdWVzdCIsIkFjdGl2ZVhPYmplY3QiLCJvcGVuIiwic2V0UmVxdWVzdEhlYWRlciIsIm9ucmVhZHlzdGF0ZWNoYW5nZSIsInJlYWR5U3RhdGUiLCJzdGF0dXMiLCJjdXJyZW50SXRlbXMiLCJyZXNwb25zZVRleHQiLCJKU09OIiwicGFyc2UiLCJBZnRlckxvYWRlZCIsInN0YXR1c1RleHQiLCJzZW5kIiwiYXR0cmlidXRlc0NvbGxlY3Rpb24iLCJ0YWdUeXBlIiwiYnVpbHRQcm9kdWN0cyIsImJ1aWx0UHJvZHVjdCIsImJ1aWxkUHJvZHVjdCIsIm92ZXJsYXkiLCJhdHRyaWJ1dGUiLCJpbl9hcnJheSIsInRhZyIsImltYWdlIiwic3JjIiwia2ViYWJDYXNlIiwiYWRkVG9DYXJ0IiwidHlwZSIsInRleHQiLCJmYXZvcml0ZSIsImV2ZW50IiwicHJldmVudERlZmF1bHQiLCJhZGRJdGVtIiwiYWRkU3R5bGUiLCJTZXJ2aWNlcyIsImRlZmF1bHRTZXR0aW5ncyQzIiwicGVyX3BhZ2UiLCJ0b3RhbF9pdGVtcyIsIkNvbnRhaW5lciQ0IiwiUHJvZHVjdHMkMiIsInRvdGFsUGFnZXMiLCJjYWxjdWxhdGVUb3RhbFBhZ2VzIiwicmVwbGFjZUxpbmtzIiwibGlua3MiLCJjcmVhdGVMaW5rcyIsImJpbmRFdmVudExpc3RlbmVycyIsInBlclBhZ2UiLCJ0b3RhbEl0ZW1zIiwicGFyc2VJbnQiLCJjZWlsIiwibmV4dCIsImNoaWxkTm9kZXMiLCJvbmNsaWNrIiwicmVxdWVzdGVkUGFnZSIsImN1cnJlbnQiLCJub3RJblBhZ2VSYW5nZSIsInNldEN1cnJlbnQiLCJwcmV2aW91cyIsInBhZ2VzIiwiZ2V0QXR0cmlidXRlIiwiY2hhbmdlVXJsIiwidWwiLCJjcmVhdGVQYWdlTGlua3MiLCJjcmVhdGVQcmV2aW91c0J1dHRvbiIsImNyZWF0ZU5leHRCdXR0b24iLCJwYWdlIiwicGFnZUl0ZW0iLCJsaW5rIiwibGkiLCJzcGFuMSIsInNwYW4yIiwiaXNOYU4iLCJHRVRfVmFycyIsImhpc3RvcnkiLCJyZXBsYWNlU3RhdGUiLCJ1cGRhdGVVUkxQYXJhbWV0ZXIiLCJsb2NhdGlvbiIsImhyZWYiLCJ2YXJzIiwicGFydHMiLCJtIiwidmFsdWUiLCJwYXJhbSIsInBhcmFtVmFsIiwibmV3QWRkaXRpb25hbFVSTCIsInRlbXBBcnJheSIsImJhc2VVUkwiLCJhZGRpdGlvbmFsVVJMIiwidGVtcCIsInJvd3NUZXh0IiwiQ29va2llIiwiZGF5cyIsInN0cmluZ2lmeSIsImV4cGlyZXMiLCJkYXRlIiwiRGF0ZSIsInNldFRpbWUiLCJnZXRUaW1lIiwidG9HTVRTdHJpbmciLCJjb29raWUiLCJjX3N0YXJ0IiwiaW5kZXhPZiIsImNfZW5kIiwidW5lc2NhcGUiLCJzdWJzdHJpbmciLCJkZWZhdWx0U2V0dGluZ3MkNCIsImNvb2tpZV9uYW1lIiwicHJldmlld19jbGFzcyIsInBsYWNlbWVudCIsImZpeGVkIiwiaG92ZXJfY29sb3IiLCJDb250YWluZXIkNSIsIkNhcnQiLCJwcmV2aWV3RWxlbWVudCIsImNyZWF0ZVByZXZpZXdFbGVtZW50Iiwic3ZnSWNvbiIsImNyZWF0ZUljb24iLCJpc0VtcHR5IiwiZ2V0IiwiY2FydCIsInNldENhcnQiLCJsaXN0ZW4iLCJhZGRUb1ByZXZpZXciLCJlbXB0eU9iamVjdCIsImZhdm9yaXRlcyIsInNldCIsIml0ZW0iLCJzcGxpY2UiLCJzcGFuIiwicXVlcnlTZWxlY3RvciIsImljb24iLCJwb3NpdGlvbiIsInRvZ2dsZUNsYXNzIiwiY2xvc2UiLCJzd2l0Y2hDbGFzc2VzIiwic3ZnIiwiY3JlYXRlRWxlbWVudE5TIiwiZyIsInBhdGgiLCJpbml0YWxpemVkIiwiZGVmYXVsdFNldHRpbmdzIiwiaW1wb3J0Qm9vdHN0cmFwIiwiY29tcG9uZW50cyIsImluaXRhbGl6ZSIsImJpbmRDb21wb25lbnRzRGVwZW5kZW5jaWVzIiwiUHJveHkiLCJ0YXJnZXQiLCJtYWtlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUFBLElBQUlBLFlBQWEsWUFBWTtBQUM3Qjs7QUFENkIsS0FHdkJDLDBCQUh1QjtBQUFBOztBQUs1Qix3Q0FDQTtBQUFBOztBQUFBOztBQUVJQyxXQUFRQyxLQUFSO0FBRko7QUFHSTs7QUFUd0I7QUFBQSxHQUdZQyxLQUhaOztBQUFBLEtBWXZCQyxHQVp1QjtBQUFBO0FBQUE7QUFBQTs7QUFBQTtB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dkM7QUFDQSxPQUFLQSxTQUFMLENBQWUsWUFBZixFQUE2QixRQUE3QixJQUF5QyxLQUF6QztBQUNBLE9BQUtBLFNBQUwsQ0FBZSxNQUFmLEVBQXVCLFFBQXZCLElBQW1DLEtBQW5DO0FBQ0E7O0FBRUQsUUFBTzVGLFNBQVA7QUFFQyxDQTVsRGdCLEVBQWpCIiwiZmlsZSI6ImVDb21tZXJjZS5qcyIsInNvdXJjZXNDb250ZW50IjpbInZhciBlQ29tbWVyY2UgPSAoZnVuY3Rpb24gKCkge1xuJ3VzZSBzdHJpY3QnO1xuXG5jbGFzcyBJbnZhbGlkQXJndW1lbnRFeGNlcHRpb24kMSBleHRlbmRzIEVycm9yXHJcbntcclxuXHRjb25zdHJ1Y3RvcigpIFxyXG5cdHsgXHJcbiAgICBcdHN1cGVyKCk7XHJcbiAgICBcdGNvbnNvbGUuZXJyb3IoYEludmFsaWRBcmd1bWVudEV4Y2VwdGlvbiwgYW4gaW52YWxpZCBhcmd1bWVudCB3YXMgcGFzc2VkLmApO1xyXG4gICAgfVxyXG59XG5cbmNsYXNzIERPTVxyXG57XHJcblx0LyoqXHJcblx0ICogTWluaWZpZXMgdGhlIGNzcyB0ZXh0LlxyXG5cdCAqL1xyXG5cdHN0YXRpYyBtaW5pZnlDc3Moc3RyaW5nKSBcclxuXHR7XHJcblx0ICAgIHN0cmluZyA9IHN0cmluZy5yZXBsYWNlKC9cXC9cXCooPzooPyFcXCpcXC8pW1xcc1xcU10pKlxcKlxcL3xbXFxyXFxuXFx0XSsvZywgJycpO1xyXG5cdCAgICBzdHJpbmcgPSBzdHJpbmcucmVwbGFjZSgvIHsyLH0vZywgJyAnKTtcclxuXHQgICAgc3RyaW5nID0gc3RyaW5nLnJlcGxhY2UoLyhbezp9XSkvZywgJyQxJyk7XHJcblx0ICAgIHN0cmluZyA9IHN0cmluZy5yZXBsYWNlKC8oWzssXSkgL2csICckMScpO1xyXG5cdCAgICBzdHJpbmcgPSBzdHJpbmcucmVwbGFjZSgvICEvZywgJyEnKTtcclxuXHQgICAgXHJcblx0ICAgIHJldHVybiBzdHJpbmc7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBTd2l0Y2hlcyBiZXR3ZWVuIHR3byBnaXZlbiBjbGFzc2VzLlxyXG5cdCAqL1xyXG5cdHN0YXRpYyBzd2l0Y2hDbGFzc2VzKGVsZW1lbnQsIGNsYXNzTmFtZSwgbmV3Q2xhc3NOYW1lKSBcclxuXHR7XHJcblx0XHR0aGlzLnJlbW92ZUNsYXNzKGVsZW1lbnQsIGNsYXNzTmFtZSk7XHJcblx0XHR0aGlzLmFkZENsYXNzKGVsZW1lbnQsIG5ld0NsYXNzTmFtZSk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBBZGRzIGNsYXNzIHRvIGEgZ2l2ZW4gZWxlbWVudC5cclxuXHQgKi9cclxuXHRzdGF0aWMgYWRkQ2xhc3MoZWxlbWVudCwgY2xhc3NOYW1lKSBcclxuXHR7XHJcblx0XHRpZihlbGVtZW50ID09PSBudWxsKSB7XHJcblx0XHRcdHRocm93IG5ldyBJbnZhbGlkQXJndW1lbnRFeGNlcHRpb24kMTtcclxuXHRcdH1cclxuXHJcblx0XHRpZighIGNsYXNzTmFtZSB8fCBjbGFzc05hbWUgPT0gJycgfHwgdHlwZW9mIGNsYXNzTmFtZSA9PT0gdW5kZWZpbmVkKSB7XHJcblx0XHRcdHJldHVybiBlbGVtZW50O1xyXG5cdFx0fVxyXG5cclxuXHRcdGxldCBjbGFzc05hbWVzID0gY2xhc3NOYW1lLnNwbGl0KCcgJyk7XHJcblxyXG5cdFx0Y2xhc3NOYW1lcy5mb3JFYWNoKGZ1bmN0aW9uKG5hbWUpIHtcclxuXHRcdFx0ZWxlbWVudC5jbGFzc0xpc3QuYWRkKG5hbWUpO1xyXG5cdFx0fSk7XHJcblx0XHRcclxuXHRcdHJldHVybiBlbGVtZW50O1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogUmVtb3ZlcyBjbGFzcyBmcm9tIGEgZ2l2ZW4gZWxlbWVudC5cclxuXHQgKi9cclxuXHRzdGF0aWMgcmVtb3ZlQ2xhc3MoZWxlbWVudCwgY2xhc3NOYW1lKSBcclxuXHR7XHJcblx0XHRpZihlbGVtZW50ID09IG51bGwpIHtcclxuXHRcdFx0dGhyb3cgbmV3IEludmFsaWRBcmd1bWVudEV4Y2VwdGlvbiQxO1xyXG5cdFx0fVxyXG5cclxuXHRcdGlmKGNsYXNzTmFtZSA9PSAnJykge1xyXG5cdFx0XHRlbGVtZW50LmNsYXNzTmFtZSA9ICcnO1xyXG5cdFx0fSBlbHNlIHtcclxuXHJcblx0XHRcdGxldCBjbGFzc05hbWVzID0gY2xhc3NOYW1lLnNwbGl0KCcgJyk7XHJcblxyXG5cdFx0XHRjbGFzc05hbWVzLmZvckVhY2goZnVuY3Rpb24obmFtZSkge1xyXG5cdFx0XHRcdGVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShuYW1lKTtcclxuXHRcdFx0fSk7XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIGVsZW1lbnQ7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBRdWVyaWVzIHRoZSBlbGVtZW50IGZyb20gdGhlIERPTS5cclxuXHQgKi9cclxuXHRzdGF0aWMgZWxlbWVudChzZWxlY3RvcikgXHJcblx0e1xyXG5cdFx0cmV0dXJuIHF1ZXJ5RWxlbWVudC5jYWxsKHRoaXMsIGRvY3VtZW50LCBzZWxlY3Rvcik7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBBZGRzIHN0eWxlIHRhZyB3aXRoIGdpdmVuIGlkIGFuZCBjc3MgdG8gdGhlIERPTS5cclxuXHQgKi9cclxuXHRzdGF0aWMgYWRkU3R5bGUoaWQsIGNzcykgXHJcblx0e1xyXG5cdFx0aWYodHlwZW9mIGNzcyAhPSAnc3RyaW5nJykge1xyXG5cdFx0XHR0aHJvdyBuZXcgSW52YWxpZEFyZ3VtZW50RXhjZXB0aW9uJDE7XHJcblx0XHR9XHJcblxyXG5cdFx0bGV0IGhlYWQgPSBkb2N1bWVudC5oZWFkIHx8IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdoZWFkJylbMF07XHJcblx0XHRsZXQgc3R5bGVUYWcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzdHlsZScpO1xyXG5cclxuXHRcdC8vIHBpcGUgaXQgdGhyb3VnaCB0aGUgbWluZmllclxyXG5cdCAgICBsZXQgQ1NTID0gdGhpcy5taW5pZnlDc3MoY3NzKTtcclxuXHQgICAgLy8gYWRkaW5nIGl0IHRvIHRoZSBzdHlsZXRhZ1xyXG5cdCAgICBzdHlsZVRhZy5pbm5lckhUTUwgPSBDU1M7XHJcblx0ICAgIC8vIGdpdmUgYW4gaWQgdG8gcmVjb2duaXplIHRoZSBzdHlsZSB0YWdcclxuXHRcdHN0eWxlVGFnLnNldEF0dHJpYnV0ZSgnaWQnLCBpZCk7XHJcblx0XHQvLyBhcHBlbmRpbmcgdGhhdCBzdHlsZSB0YWcgdG8gdGhlIERPTSBoZWFkIHRhZ1xyXG5cdFx0aGVhZC5hcHBlbmRDaGlsZChzdHlsZVRhZyk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBDcmVhdGVzIGFuIGVsZW1lbnQgd2l0aCB0aGUgZ2l2ZW4gb3B0aW9ucy5cclxuXHQgKi9cclxuXHRzdGF0aWMgY3JlYXRlRWxlbWVudChlbGVtZW50VHlwZSwgb3B0aW9ucylcclxuXHR7XHJcblx0XHRsZXQgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoZWxlbWVudFR5cGUpO1xyXG5cdFxyXG5cdFx0aWYgKG9wdGlvbnMgPT09IHVuZGVmaW5lZCkge1xyXG5cdFx0XHRyZXR1cm4gZWxlbWVudDtcclxuXHRcdH1cclxuXHJcblx0XHRmb3IgKGxldCBvcHRpb24gaW4gb3B0aW9ucykge1xyXG5cdFx0XHRpZihvcHRpb24gPT0gJ3RleHQnKSB7XHJcblx0XHRcdFx0ZWxlbWVudC5pbm5lckhUTUwgPSBvcHRpb25zW29wdGlvbl07XHJcblx0XHRcdFx0Y29udGludWU7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGVsZW1lbnQuc2V0QXR0cmlidXRlKG9wdGlvbiwgb3B0aW9uc1tvcHRpb25dKTtcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gZWxlbWVudDtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFRvZ2dsZXMgdGhlIGdpdmVuIGNsYXNzZXMuXHJcblx0ICovXHJcblx0c3RhdGljIHRvZ2dsZUNsYXNzKGVsZW1lbnQsIGNsYXNzTmFtZSwgc2Vjb25kQ2xhc3NOYW1lKVxyXG5cdHtcclxuXHRcdGlmKGVsZW1lbnQgPT0gbnVsbCB8fCB0eXBlb2YgZWxlbWVudCA9PSAndW5kZWZpbmVkJykge1xyXG5cdFx0XHR0aHJvdyBuZXcgSW52YWxpZEFyZ3VtZW50RXhjZXB0aW9uJDE7XHJcblx0XHR9XHJcblxyXG5cdFx0c2Vjb25kQ2xhc3NOYW1lID0gc2Vjb25kQ2xhc3NOYW1lIHx8IHVuZGVmaW5lZDtcclxuXHJcblx0XHRlbGVtZW50LmNsYXNzTGlzdC50b2dnbGUoY2xhc3NOYW1lKTtcclxuXHJcblx0XHRpZihzZWNvbmRDbGFzc05hbWUpIHtcclxuXHRcdFx0ZWxlbWVudC5jbGFzc0xpc3QudG9nZ2xlKHNlY29uZENsYXNzTmFtZSk7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBGaW5kcyBhbiBlbGVtZW50IGluc2lkZSBvZiBwYXJlbnQuXHJcblx0ICovXHJcblx0c3RhdGljIGZpbmQoZWxlbWVudCwgc2VsZWN0b3IpIFxyXG5cdHtcclxuXHRcdHJldHVybiBxdWVyeUVsZW1lbnQoZWxlbWVudCwgc2VsZWN0b3IpO1xyXG5cdH1cclxufVxyXG5cclxuLyoqXHJcbiAqIFF1ZXJpZXMgYW4gZWxlbWVudCBmcm9tIHRoZSBET00uXHJcbiAqL1xyXG5mdW5jdGlvbiBxdWVyeUVsZW1lbnQocGFyZW50LCBzZWxlY3Rvcikge1xyXG5cdHZhciBlbGVtZW50ID0gcGFyZW50LnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3IpO1xyXG5cclxuXHRpZihlbGVtZW50Lmxlbmd0aCA9PSAwKSB7XHJcblx0XHRyZXR1cm4gbnVsbDtcclxuXHR9XHJcblxyXG5cdHJldHVybiAoZWxlbWVudC5sZW5ndGggPiAxKSA/IGVsZW1lbnQgOiBlbGVtZW50WzBdO1xyXG59XG5cbmxldCBldmVudHMgPSBbXTtcclxuXHJcbmNsYXNzIEV2ZW50XHJcbntcclxuXHQvKipcclxuXHQgKiBMaXN0ZW4gdG8gYW4gZXZlbnQuXHJcblx0ICovXHJcblx0c3RhdGljIGxpc3RlbihuYW1lLCBjYWxsYmFjaykge1xyXG5cdFx0aWYgKHR5cGVvZiBjYWxsYmFjayAhPT0gJ2Z1bmN0aW9uJykge1xyXG5cdFx0XHR0aHJvdyBuZXcgSW52YWxpZEFyZ3VtZW50RXhjZXB0aW9uO1xyXG5cdFx0fVxyXG5cclxuXHRcdGlmICh0eXBlb2YgZXZlbnRzW25hbWVdID09ICd1bmRlZmluZWQnKSB7XHJcblx0XHRcdGV2ZW50c1tuYW1lXSA9IFtdO1xyXG5cdFx0fVxyXG5cclxuXHRcdGV2ZW50c1tuYW1lXS5wdXNoKGNhbGxiYWNrKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEZpcmVzIGFuIGV2ZW50LlxyXG5cdCAqL1xyXG5cdHN0YXRpYyB0cmlnZ2VyKG5hbWUsIC4uLmRhdGEpIHtcclxuXHRcdGRhdGEgPSBkYXRhIHx8IG51bGw7XHJcblxyXG5cdFx0ZXZlbnRzW25hbWVdLmZvckVhY2goZnVuY3Rpb24oY2FsbGJhY2spIHtcclxuXHRcdFx0aWYodHlwZW9mIGNhbGxiYWNrICE9PSAnZnVuY3Rpb24nKSB7XHJcblx0XHRcdFx0dGhyb3cgbmV3IEJhZEV2ZW50Q2FsbEV4Y2VwdGlvbjtcclxuXHRcdFx0fVxyXG5cdFx0XHRcclxuXHRcdFx0cmV0dXJuIGNhbGxiYWNrKC4uLmRhdGEpO1xyXG5cdFx0fSk7XHJcblx0fVxyXG59XG5cbmNsYXNzIENvbW1vblxyXG57XHJcblx0LyoqXHJcblx0ICogRXh0ZW5kIGFuIG9iamVjdC5cclxuXHQgKi9cclxuXHRzdGF0aWMgZXh0ZW5kKGN1cnJlbnRPYmosIG5ld09iaiApIHtcclxuXHRcdHZhciBleHRlbmRlZCA9IHt9O1xyXG5cdCAgICB2YXIgcHJvcDtcclxuXHJcblx0ICAgIGZvciAocHJvcCBpbiBjdXJyZW50T2JqKSB7XHJcblx0ICAgICAgICBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGN1cnJlbnRPYmosIHByb3ApKSB7XHJcblx0ICAgICAgICAgICAgZXh0ZW5kZWRbcHJvcF0gPSBjdXJyZW50T2JqW3Byb3BdO1xyXG5cdCAgICAgICAgfVxyXG5cdCAgICB9XHJcblxyXG5cdCAgICBmb3IgKHByb3AgaW4gbmV3T2JqKSB7XHJcblx0ICAgICAgICBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG5ld09iaiwgcHJvcCkpIHtcclxuXHQgICAgICAgICAgICBleHRlbmRlZFtwcm9wXSA9IG5ld09ialtwcm9wXTtcclxuXHQgICAgICAgIH1cclxuXHQgICAgfVxyXG5cclxuXHQgICAgcmV0dXJuIGV4dGVuZGVkO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQ2hlY2tzIGZvciBhIG5lZWRsZSBpbiBoeXN0YWNrLlxyXG5cdCAqL1xyXG5cdHN0YXRpYyBpbl9hcnJheShuZWVkbGUsIGh5c3RhY2spIHtcclxuXHRcdGlmKGh5c3RhY2suY29uc3RydWN0b3IgIT09IEFycmF5KSByZXR1cm47XHJcblxyXG5cdFx0Zm9yKHZhciBpID0gMDsgaSA8PSBoeXN0YWNrLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdGlmKG5lZWRsZSA9PSBoeXN0YWNrW2ldKSByZXR1cm4gdHJ1ZTtcdFxyXG5cdFx0fVxyXG5cdFxyXG5cdFx0cmV0dXJuIGZhbHNlO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQ2hlY2tzIGlmIGFuIG9iamVjdCBpcyBlbXB0eS5cclxuXHQgKi9cclxuXHRzdGF0aWMgZW1wdHlPYmplY3Qob2JqZWN0KSB7XHJcblx0XHRmb3IodmFyIHByb3AgaW4gb2JqZWN0KSB7XHJcblx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gdHJ1ZTtcclxuXHR9XHJcblxyXG5cdHN0YXRpYyBjb250YWluc09iamVjdChvYmplY3QsIGh5c3RhY2spIFxyXG5cdHtcclxuXHQgICAgdmFyIGk7XHJcblxyXG5cdCAgICBmb3IgKGkgPSAwOyBpIDwgaHlzdGFjay5sZW5ndGg7IGkrKykge1xyXG5cdCAgICAgICAgaWYgKHR5cGVvZiBvYmplY3QgPT0gJ3N0cmluZycgJiYgaHlzdGFja1tpXS5jb25zdHJ1Y3Rvci5uYW1lID09PSBvYmplY3QpIHtcclxuXHQgICAgICAgIFx0cmV0dXJuIHRydWU7XHJcblx0ICAgICAgICB9XHJcblxyXG5cdCAgICAgICAgaWYgKGh5c3RhY2tbaV0gPT09IG9iamVjdCkge1xyXG5cdCAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG5cdCAgICAgICAgfVxyXG5cdCAgICB9XHJcblxyXG5cdCAgICByZXR1cm4gZmFsc2U7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBDaGVja3MgaWYgYSBnaXZlbiBwYXJhbWV0ZXIgaXMgYW4gb2JqZWN0LlxyXG5cdCAqL1xyXG5cdHN0YXRpYyBpc09iamVjdChvYmplY3QpIFxyXG5cdHtcclxuXHRcdHJldHVybiB0eXBlb2Ygb2JqZWN0ID09ICdvYmplY3QnO1xyXG5cdH1cclxufVxuXG5jbGFzcyBJbnZhbGlkQmluZGluZ0V4Y2VwdGlvbiBleHRlbmRzIEVycm9yXHJcbntcclxuXHRjb25zdHJ1Y3RvcigpIFxyXG5cdHsgXHJcbiAgICBcdHN1cGVyKCk7XHJcbiAgICBcdGNvbnNvbGUuZXJyb3IoYEludmFsaWRCaW5kaW5nRXhjZXB0aW9uLCB0cnlpbmcgdG8gYmluZCBhbiBhbHJlYWR5IGV4aXN0aW5nIGJvdW5kLmApO1xyXG4gICAgfVxyXG59XG5cbmxldCBpbnN0YW5jZXMgPSBbXTtcclxuXHJcbmNsYXNzIENvbnRhaW5lciBcclxue1xyXG5cdC8qKlxyXG5cdCAqIEJpbmRzIGtleSB0byBjb25jcmV0ZSBjbGFzcy5cclxuXHQgKi9cclxuXHRiaW5kKGtleSwgY29uY3JldGUpIFxyXG5cdHtcclxuXHRcdGlmICh0eXBlb2Yga2V5ICE9ICdzdHJpbmcnIHx8IHR5cGVvZiBjb25jcmV0ZSAhPSAnZnVuY3Rpb24nKSB7XHJcblx0XHRcdHRocm93IG5ldyBJbnZhbGlkQXJndW1lbnRFeGNlcHRpb24kMTtcclxuXHRcdH1cclxuXHJcblx0XHRpZiAodHlwZW9mIHRoaXNba2V5XSAhPSAndW5kZWZpbmVkJykge1xyXG5cdFx0XHR0aHJvdyBuZXcgSW52YWxpZEJpbmRpbmdFeGNlcHRpb247XHJcblx0XHR9XHJcblxyXG5cdFx0dGhpc1trZXldID0gY29uY3JldGUuYmluZChjb25jcmV0ZSwgdGhpcyk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBTZXRzIGFuIGluc3RhbmNlLlxyXG5cdCAqL1xyXG5cdHNldEluc3RhbmNlKGtleSwgaW5zdGFuY2UpIFxyXG5cdHtcclxuXHRcdGlmKHR5cGVvZiBrZXkgIT0gJ3N0cmluZycgfHwgdHlwZW9mIGluc3RhbmNlICE9ICdvYmplY3QnKSB7XHJcblx0XHRcdHRocm93IG5ldyBJbnZhbGlkQXJndW1lbnRFeGNlcHRpb24kMTtcclxuXHRcdH1cclxuXHJcblx0XHRpbnN0YW5jZXNba2V5XSA9IGluc3RhbmNlO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogR2V0cyBhbiBpbnN0YW5jZS5cclxuXHQgKi9cclxuXHRnZXRJbnN0YW5jZShrZXkpIFxyXG5cdHtcclxuXHRcdGlmKHR5cGVvZiBrZXkgIT0gJ3N0cmluZycpIHtcclxuXHRcdFx0dGhyb3cgbmV3IEludmFsaWRBcmd1bWVudEV4Y2VwdGlvbiQxO1xyXG5cdFx0fVxyXG5cclxuXHRcdGlmKHR5cGVvZiBrZXkgPT0gJ29iamVjdCcpIHtcclxuXHRcdFx0cmV0dXJuIGluc3RhbmNlc1trZXkuY29uc3RydWN0b3IubmFtZV0gfHwgbnVsbDtcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gaW5zdGFuY2VzW2tleV0gfHwgbnVsbDtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIENoZWNrcyBpZiBhbiBpbnN0YW5jZSBleGlzdC5cclxuXHQgKi9cclxuXHRpbnN0YW5jZUV4aXN0KGluc3RhbmNlKSBcclxuXHR7XHJcblx0XHRpZih0eXBlb2YgaW5zdGFuY2UgPT0gJ29iamVjdCcpIHtcclxuXHRcdFx0cmV0dXJuICh0eXBlb2YgaW5zdGFuY2VzW2luc3RhbmNlLmNvbnN0cnVjdG9yLm5hbWVdICE9PSAndW5kZWZpbmVkJyk7XHJcblx0XHR9XHJcblx0XHRcclxuXHRcdFxyXG5cdFx0cmV0dXJuIChpbnN0YW5jZSBpbiBpbnN0YW5jZXMpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQ3JlYXRlcyBhbiBpbnN0YW5jZS5cclxuXHQgKi9cclxuXHRtYWtlKG9iamVjdClcclxuXHR7XHJcblx0XHRsZXQgaW5zdGFuY2UgPSB7fTtcclxuXHJcblx0XHRpZiAodGhpcy5pbnN0YW5jZUV4aXN0KG9iamVjdCkpIHtcclxuXHRcdFx0cmV0dXJuIHRoaXMuZ2V0SW5zdGFuY2Uob2JqZWN0KTtcclxuXHRcdH1cclxuXHJcblx0XHRpZiAodHlwZW9mIG9iamVjdCA9PSAnb2JqZWN0Jykge1xyXG5cdFx0XHRpbnN0YW5jZSA9IG9iamVjdDtcclxuXHRcdH0gZWxzZSBpZih0eXBlb2Ygb2JqZWN0ID09ICdzdHJpbmcnICYmIHRoaXMuaGFzT3duUHJvcGVydHkob2JqZWN0KSkge1xyXG5cdFx0XHRpbnN0YW5jZSA9IG5ldyB0aGlzW29iamVjdF07XHRcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdHRocm93IG5ldyBJbnZhbGlkQmluZGluZ0V4Y2VwdGlvbjtcclxuXHRcdH1cclxuXHJcblx0XHR0aGlzLnNldEluc3RhbmNlKG9iamVjdCwgaW5zdGFuY2UpOyBcclxuXHJcblx0XHRyZXR1cm4gaW5zdGFuY2U7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBSZXRyaWV2ZSBhbGwgaW5zdGFuY2VzLlxyXG5cdCAqL1xyXG5cdGluc3RhbmNlcygpIFxyXG5cdHtcclxuXHRcdHJldHVybiBpbnN0YW5jZXM7XHJcblx0fVxyXG59XG5cbmNsYXNzIENvbXBvbmVudHNFeGNlcHRpb24gZXh0ZW5kcyBFcnJvclxyXG57XHJcblx0Y29uc3RydWN0b3IoKSBcclxuXHR7IFxyXG4gICAgXHRzdXBlcigpO1xyXG4gICAgXHRjb25zb2xlLmVycm9yKGBDb21wb25lbnRzRXhjZXB0aW9uLCBleHBlY3RpbmcgZm9yIGF0IGxlYXN0IG9uZSBjb21wb25lbnRzLCBidXQgbm9uZSB3YXMgZ2l2ZW4sIFxyXG5cdFx0XHRcdFx0XHRcdFx0cGxlYXNlIGFkZCBhdCBsZWFzdCBvbmUgcmVxdWlyZW1lbnQoUHJvZHVjdHMsIFNlcnZpY2VzIG9yL2FuZCBGaWx0ZXIuYCk7XHJcbiAgICB9XHJcbn1cblxuY2xhc3MgQmFkRXZlbnRDYWxsRXhjZXB0aW9uJDEgZXh0ZW5kcyBFcnJvclxyXG57XHJcblx0Y29uc3RydWN0b3IoKSBcclxuXHR7IFxyXG5cdFx0c3VwZXIoKTtcclxuICAgIFx0Y29uc29sZS5lcnJvcihgQmFkRXZlbnRDYWxsRXhjZXB0aW9uLCBsaXN0ZW5pbmcgdG8gYSBub25lLWV4aXN0aW5nIGV2ZW50LmApO1xyXG4gICAgfVxyXG59XG5cbmNsYXNzIE5vdEluUGFnZVJhbmdlRXhjZXB0aW9uIGV4dGVuZHMgRXJyb3Jcclxue1xyXG5cdGNvbnN0cnVjdG9yKCkgXHJcblx0eyBcclxuICAgIFx0c3VwZXIoKTtcclxuICAgIFx0Y29uc29sZS5lcnJvcihgTm90SW5QYWdlUmFuZ2VFeGNlcHRpb24sIHNvcnJ5LCBubyBtb3JlIHBhZ2VzLmApO1xyXG4gICAgfVxyXG59XG5cbmNsYXNzIENvbXBvbmVudE5vdFJlZ2lzdGVyZWRFeGNlcHRpb24gZXh0ZW5kcyBFcnJvclxyXG57XHJcblx0Y29uc3RydWN0b3IoKSBcclxuXHR7IFxyXG4gICAgXHRzdXBlcigpO1xyXG4gICAgXHRjb25zb2xlLmVycm9yKGBDb21wb25lbnROb3RSZWdpc3RlcmVkRXhjZXB0aW9uLCBjb21wb25lbnRzIG11c3QgYmUgcmVnaXN0ZXJlZCBpbiBvcmRlciB0byB1c2UgdGhlbS5gKTtcclxuICAgIH1cclxufVxuXG5jbGFzcyBFeGNlcHRpb25IYW5kbGVyIGV4dGVuZHMgRXJyb3Jcclxue1xyXG5cdC8qKlxyXG5cdCAqIEhhbmRsZSBhbGwgdGhlIGVycm9yc1xyXG5cdCAqL1xyXG5cdHN0YXRpYyBpbml0YWxpemUoKSB7XHRcclxuXHRcdHdpbmRvdy5vbmVycm9yID0gZnVuY3Rpb24obWVzc2FnZSwgc291cmNlLCBsaW5lbm8sIGNvbG5vLCBlcnJvcikge1xyXG5cdFx0XHRcclxuXHRcdFx0aWYgKGVycm9yIGluc3RhbmNlb2YgSW52YWxpZEFyZ3VtZW50RXhjZXB0aW9uJDEpIHtcclxuXHRcdFx0XHQvLyBoYW5kbGVcclxuXHRcdFx0fSBlbHNlIGlmIChlcnJvciBpbnN0YW5jZW9mIEludmFsaWRCaW5kaW5nRXhjZXB0aW9uKSB7XHJcblx0XHRcdFx0Ly8gaGFuZGxlXHJcblx0XHRcdH0gZWxzZSBpZiAoZXJyb3IgaW5zdGFuY2VvZiBCYWRFdmVudENhbGxFeGNlcHRpb24kMSkge1xyXG5cdFx0XHRcdC8vIGhhbmRsZVxyXG5cdFx0XHR9IGVsc2UgaWYgKGVycm9yIGluc3RhbmNlb2YgQ29tcG9uZW50c0V4Y2VwdGlvbikge1xyXG5cdFx0XHRcdC8vIGhhbmRsZVxyXG5cdFx0XHR9IGVsc2UgaWYgKGVycm9yIGluc3RhbmNlb2YgQ29tcG9uZW50Tm90UmVnaXN0ZXJlZEV4Y2VwdGlvbikge1xyXG5cdFx0XHRcdC8vIGhhbmRsZVxyXG5cdFx0XHR9IGVsc2UgaWYgKGVycm9yIGluc3RhbmNlb2YgTm90SW5QYWdlUmFuZ2VFeGNlcHRpb24pIHtcclxuXHRcdFx0XHQvLyBoYW5kbGUgXHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRyZXR1cm4gdHJ1ZTtcclxuXHRcdH07XHJcblx0fVxyXG59XG5cbi8qKlxyXG4gKiBUaGUgZGVmYXVsdCBzZXR0aW5ncyBvZiB0aGUgZmlsdGVyLlxyXG4gKi9cclxubGV0IGRlZmF1bHRTZXR0aW5ncyQxID0ge1xyXG5cdGVsZW1lbnQ6ICcuZmlsdGVyJyxcclxuXHRkYXRhOiB7fSxcclxuXHRjbGFzczogJycsXHJcblx0d2lkdGg6ICcnLFxyXG5cdGhlaWdodDogJycsXHJcbn07XHJcblxyXG4vKipcclxuICogU3RvcmVzIHRoZSBjb250YWluZXIgb2JqZWN0LlxyXG4gKi9cclxubGV0IENvbnRhaW5lciQyO1xyXG5cclxuLyoqXHJcbiAqIFRoZSBGaWx0ZXIgT2JqZWN0LCBoYW5kbGVzIHRoZSBmaWx0ZXIgb2YgdGhlIHByb2R1Y3RzL3NlcnZpY2VzLlxyXG4gKi9cclxuY2xhc3MgRmlsdGVyIFxyXG57XHJcblx0Y29uc3RydWN0b3IoY29udGFpbmVyKSBcclxuXHR7XHJcblx0XHRDb250YWluZXIkMiA9IGNvbnRhaW5lcjtcclxuXHR9XHJcblxyXG5cdHNldHVwKHNldHRpbmdzKVxyXG5cdHtcclxuXHRcdGlmKHR5cGVvZiBzZXR0aW5ncyAhPSAnb2JqZWN0Jykge1xyXG5cdFx0XHR0aHJvdyBuZXcgSW52YWxpZEFyZ3VtZW50RXhjZXB0aW9uJDE7XHJcblx0XHR9XHJcblxyXG5cdFx0dGhpcy5zZXR0aW5ncyA9IENvbW1vbi5leHRlbmQoZGVmYXVsdFNldHRpbmdzJDEsIHNldHRpbmdzKTtcclxuXHJcblx0XHR0aGlzLnNldEVsZW1lbnQodGhpcy5zZXR0aW5ncy5lbGVtZW50KTtcclxuXHR9XHJcblxyXG5cdHNldEVsZW1lbnQoc2VsZWN0b3IpXHJcblx0e1xyXG5cdFx0dGhpcy53cmFwcGVyID0gRE9NLmVsZW1lbnQoc2VsZWN0b3IpO1xyXG5cdFx0XHJcblx0XHRET00uYWRkQ2xhc3ModGhpcy53cmFwcGVyLCB0aGlzLnNldHRpbmdzLmNsYXNzKTtcclxuXHR9XHJcbn1cblxuY2xhc3MgU3RyXHJcbntcclxuXHJcblx0LyoqXHJcblx0ICogQ29udmVydCBjYW1lbENhc2UgdG8ga2ViYWItY2FzZS5cclxuXHQgKi9cclxuXHRzdGF0aWMga2ViYWJDYXNlKHN0cmluZykgXHJcblx0e1xyXG5cdFx0cmV0dXJuIHN0cmluZy5yZXBsYWNlKC8oW2Etel0pKFtBLVpdKS9nLCAnJDEtJDInKS50b0xvd2VyQ2FzZSgpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogR2VuZXJhdGVzIGEgcmFuZG9tIHN0cmluZy5cclxuXHQgKi9cclxuXHRzdGF0aWMgcmFuZG9tKGxlbmd0aCkgXHJcblx0e1xyXG5cdFx0bGV0IHN0cmluZyA9ICcnO1xyXG5cdFx0bGV0IHBvc3NpYmxlID0gXCJBQkNERUZHSElKS0xNTk9QUVJTVFVWV1hZWmFiY2RlZmdoaWprbG1ub3BxcnN0dXZ3eHl6MDEyMzQ1Njc4OVwiO1xyXG5cclxuXHRcdGZvciAobGV0IGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcclxuXHQgICAgXHRzdHJpbmcgKz0gcG9zc2libGUuY2hhckF0KE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIHBvc3NpYmxlLmxlbmd0aCkpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiBzdHJpbmc7XHJcblx0fVxyXG5cclxufVxuXG4vKipcclxuICogVGhlIGRlZmF1bHQgc2V0dGluZ3Mgb2YgZWFjaCBwcm9kdWN0LlxyXG4gKi9cclxubGV0IGRlZmF1bHRTZXR0aW5ncyQyID0ge1xyXG5cdGVsZW1lbnQ6ICcucHJvZHVjdHMnLFxyXG5cdGNsYXNzOiAnJyxcclxuXHRpdGVtX2NsYXNzOiAnJyxcclxuXHRhZGRfYnV0dG9uX2NsYXNzOiAnYnRuIGJ0bi1wcmltYXJ5JyxcclxuXHRmYXZvcml0ZV9idXR0b25fY2xhc3M6ICdidG4gYnRuLWRhbmdlcicsXHJcblx0d2lkdGg6ICcyMDBweCcsXHJcblx0aGVpZ2h0OiAnMjUwcHgnLFxyXG5cdGF0dHJpYnV0ZXM6IFsnbmFtZScsICdwcmljZScsICdkZWxpdmVyeVRpbWUnLCAnaW1hZ2UnXSxcclxuXHR1cmw6ICdwcm9kdWN0cy5waHAnLFxyXG59O1xyXG5cclxuLyoqXHJcbiAqIFN0b3JlcyB0aGUgY29udGFpbmVyIG9iamVjdC5cclxuICovXHJcbmxldCBDb250YWluZXIkMztcclxuXHJcbi8qKlxyXG4gKiBUaGUgUHJvZHVjdHMgT2JqZWN0LCBoYW5kbGVzIHRoZSBwcm9kdWN0cy5cclxuICovXHJcbmNsYXNzIFByb2R1Y3RzIFxyXG57XHJcblx0LyoqXHJcblx0ICogSW5pdGFsaXplIHRoZSBDb250YWluZXIuXHJcblx0ICovXHJcblx0Y29uc3RydWN0b3IoY29udGFpbmVyKSBcclxuXHR7XHJcblx0XHRDb250YWluZXIkMyA9IGNvbnRhaW5lcjtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFNldHMgdGhlIGdpdmVuIHNldHRpbmdzIGZyb20gdGhlIHVzZXIuXHJcblx0ICovXHJcblx0c2V0dXAoc2V0dGluZ3MpXHJcblx0e1xyXG5cdFx0ZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsIGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRcclxuXHRcdGlmICh0eXBlb2Ygc2V0dGluZ3MgIT0gJ29iamVjdCcpIHtcclxuXHRcdFx0dGhyb3cgbmV3IEludmFsaWRBcmd1bWVudEV4Y2VwdGlvbiQxO1xyXG5cdFx0fVxyXG5cclxuXHRcdHRoaXMuc2V0dGluZ3MgPSBDb21tb24uZXh0ZW5kKGRlZmF1bHRTZXR0aW5ncyQyLCBzZXR0aW5ncyk7XHJcblxyXG5cdFx0dGhpcy5zZXRFbGVtZW50KHRoaXMuc2V0dGluZ3MuZWxlbWVudCk7XHJcblxyXG5cdFx0dGhpcy5hZGRTdHlsZVRhZygpO1x0XHJcblx0XHRcclxuXHRcdGlmIChDb250YWluZXIkMy5QYWdpbmF0aW9uICYmIENvbnRhaW5lciQzLlBhZ2luYXRpb24uYm9vdGVkKSB7XHJcblx0XHRcdGxldCBpbnN0YW5jZSA9IHRoaXM7XHJcblxyXG5cdFx0XHRpbnN0YW5jZS5nZXRQcm9kdWN0c0J5UGFnZSgxKS50aGVuKGZ1bmN0aW9uKHByb2R1Y3RzKSB7XHJcblx0XHRcdFx0aW5zdGFuY2UucmVwbGFjZUl0ZW1zKHByb2R1Y3RzKTtcclxuXHRcdFx0fSk7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHR0aGlzLmxvYWRBbGxQcm9kdWN0cygpO1xyXG5cdFx0fVxyXG5cclxuXHRcdH0uYmluZCh0aGlzKSk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBMb2FkcyB0aGUgcHJvZHVjdHMgYW5kIHJlcGxhY2UgdGhlbSBpbiB0aGUgZGl2IGNvbnRhaW5lci5cclxuXHQgKi9cclxuXHRsb2FkQWxsUHJvZHVjdHMoKVxyXG5cdHtcclxuXHRcdGxldCByZXF1ZXN0ID0gdGhpcy5nZXRQcm9kdWN0cygpO1xyXG5cdFx0XHRcclxuXHRcdHJlcXVlc3QudGhlbihmdW5jdGlvbihpdGVtcykge1xyXG5cdFx0XHRFdmVudC50cmlnZ2VyKCdQcm9kdWN0c1dlcmVGZXRjaGVkJywgaXRlbXMpO1xyXG5cdFx0XHR0aGlzLnJlcGxhY2VJdGVtcyhpdGVtcyk7XHJcblx0XHR9LmJpbmQodGhpcykpLmNhdGNoKGZ1bmN0aW9uKGVycm9yKSB7XHJcblxyXG5cdFx0fSk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBTZXRzIHRoZSBET00gZWxlbWVudCBmb3IgcG9wdWxhdGluZyB0aGUgcHJvZHVjdHMuXHJcblx0ICovXHJcblx0c2V0RWxlbWVudChzZWxlY3RvcilcclxuXHR7XHJcblx0XHR0aGlzLndyYXBwZXIgPSBET00uZWxlbWVudChzZWxlY3Rvcik7XHJcblxyXG5cdFx0aWYgKHRoaXMud3JhcHBlcikge1xyXG5cdFx0XHRET00uYWRkQ2xhc3ModGhpcy53cmFwcGVyLCB0aGlzLnNldHRpbmdzLmNsYXNzKTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFJlcGxhY2UgaXRlbXMgaW4gdGhlIGNvbnRhaW5lci5cclxuXHQgKi9cclxuXHRyZXBsYWNlSXRlbXMoaXRlbXMpIFxyXG5cdHtcclxuXHRcdGlmICghIEFycmF5LmlzQXJyYXkoaXRlbXMpIHx8IChpdGVtcy5sZW5ndGggPD0gMCAmJiB0eXBlb2YgaXRlbXNbMF0gPT0gJ3N0cmluZycpKSB7XHJcblx0XHRcdHRocm93IG5ldyBJbnZhbGlkQXJndW1lbnRFeGNlcHRpb24kMTtcclxuXHRcdH1cclxuXHJcblx0XHRsZXQgcHJvZHVjdHMgPSB0aGlzLmJ1aWxkUHJvZHVjdHMoaXRlbXMsIHRoaXMuc2V0dGluZ3MuaXRlbV9jbGFzcywgJ2RpdicpO1xyXG5cclxuXHRcdHRoaXMud3JhcHBlci5pbm5lckhUTUwgPSAnJztcclxuXHRcdHByb2R1Y3RzLmZvckVhY2goZnVuY3Rpb24ocHJvZHVjdCkge1xyXG5cdFx0XHR0aGlzLndyYXBwZXIuYXBwZW5kQ2hpbGQocHJvZHVjdCk7XHJcblx0XHR9LmJpbmQodGhpcykpO1xyXG5cclxuXHRcdHJldHVybiBpdGVtcztcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIE1ha2VzIGFuIEFqYXggY2FsbCB0byB0aGUgc2VydmVyIHdpdGhvdXQgcGFyYW1ldGVycy5cclxuXHQgKi9cclxuXHRnZXRQcm9kdWN0cygpXHJcblx0e1xyXG5cdFx0cmV0dXJuIHRoaXMuYXNrU2VydmVyKCk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBNYWtlcyBhbiBBamF4IGNhbGwgdG8gdGhlIHNlcnZlci5cclxuXHQgKi9cclxuXHRnZXRQcm9kdWN0c0J5UGFnZShwYWdlTnVtYmVyKSBcclxuXHR7XHJcblx0XHRyZXR1cm4gdGhpcy5hc2tTZXJ2ZXIocGFnZU51bWJlcik7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBTZW5kcyB0aGUgcmVxdWVzdCB0byB0aGUgc2VydmVyLlxyXG5cdCAqL1xyXG5cdGFza1NlcnZlcihwYWdlTnVtYmVyKVxyXG5cdHtcclxuXHRcdHBhZ2VOdW1iZXIgPSBwYWdlTnVtYmVyIHx8IG51bGw7XHJcblxyXG5cdFx0cmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xyXG5cclxuXHRcdFx0bGV0IHhociA9IG5ldyBYTUxIdHRwUmVxdWVzdCB8fCBuZXcgQWN0aXZlWE9iamVjdChcIk1pY3Jvc29mdC5YTUxIVFRQXCIpO1xyXG5cclxuXHRcdFx0aWYocGFnZU51bWJlcikge1xyXG5cdFx0XHRcdHhoci5vcGVuKCdHRVQnLCB0aGlzLnNldHRpbmdzLnVybCArICc/cGFnZT0nICsgcGFnZU51bWJlciwgdHJ1ZSk7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0eGhyLm9wZW4oJ0dFVCcsIHRoaXMuc2V0dGluZ3MudXJsLCB0cnVlKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0eGhyLnNldFJlcXVlc3RIZWFkZXIoJ0NvbnRlbnQtVHlwZScsICdhcHBsaWNhdGlvbi9qc29uJyk7XHJcblx0XHRcdFxyXG5cdFx0XHRsZXQgaW5zdGFuY2UgPSB0aGlzO1xyXG5cclxuXHRcdFx0eGhyLm9ucmVhZHlzdGF0ZWNoYW5nZSA9IGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRcdGlmICh0aGlzLnJlYWR5U3RhdGUgPT0gNCkge1xyXG5cdFx0XHRcdFx0aWYgKHRoaXMuc3RhdHVzID09IDIwMCkge1xyXG5cdFx0XHRcdFx0XHRpbnN0YW5jZS5jdXJyZW50SXRlbXMgPSAodGhpcy5yZXNwb25zZVRleHQgPT0gJycpID8gW10gOiBKU09OLnBhcnNlKHRoaXMucmVzcG9uc2VUZXh0KTtcclxuXHRcdFx0XHRcdFxyXG5cdFx0XHRcdFx0XHRpZihpbnN0YW5jZS5jdXJyZW50SXRlbXMubGVuZ3RoID09PSAwKSB7XHJcblx0XHRcdFx0XHRcdFx0cmVqZWN0KCdObyBJdGVtcyB3ZXJlIHJldHJpZXZlZCEnKTtcclxuXHRcdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBpbnN0YW5jZS5jdXJyZW50SXRlbXMubGVuZ3RoOyBpKyspIHtcclxuXHRcdFx0XHRcdFx0XHR2YXIgcHJvZHVjdCA9IGluc3RhbmNlLmN1cnJlbnRJdGVtc1tpXTtcclxuXHRcdFx0XHRcdFx0XHRpbnN0YW5jZS5BZnRlckxvYWRlZC5jYWxsKHRoaXMsIHByb2R1Y3QpO1xyXG5cdFx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0XHRyZXNvbHZlKGluc3RhbmNlLmN1cnJlbnRJdGVtcyk7XHJcblx0XHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0XHRyZWplY3QodGhpcy5zdGF0dXNUZXh0KTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9XHJcblx0XHRcdH07XHJcblxyXG5cdFx0XHR4aHIub25lcnJvciA9IGZ1bmN0aW9uKGVycm9yKSB7XHJcblx0XHRcdFx0cmVqZWN0KGVycm9yKTtcclxuXHRcdFx0fTtcclxuXHJcblx0XHRcdHhoci5zZW5kKG51bGwpO1xyXG5cdFx0fS5iaW5kKHRoaXMpKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEJ1aWxkcyB0aGUgaHRtbCBmb3IgdGhlIHByb2R1Y3RzLlxyXG5cdCAqL1xyXG5cdGJ1aWxkUHJvZHVjdHMoYXR0cmlidXRlc0NvbGxlY3Rpb24sIGNsYXNzTmFtZSwgdGFnVHlwZSkgXHJcblx0e1xyXG5cdFx0aWYoYXR0cmlidXRlc0NvbGxlY3Rpb24uY29uc3RydWN0b3IubmFtZSAhPSAnQXJyYXknICkge1xyXG5cdFx0XHR0aHJvdyBuZXcgSW52YWxpZEFyZ3VtZW50RXhjZXB0aW9uJDE7XHJcblx0XHR9XHJcblxyXG5cdFx0bGV0IGJ1aWx0UHJvZHVjdHMgPSBbXTtcclxuXHJcblx0XHRhdHRyaWJ1dGVzQ29sbGVjdGlvbi5mb3JFYWNoKGZ1bmN0aW9uKGF0dHJpYnV0ZXMpIHtcclxuXHRcdFx0bGV0IGJ1aWx0UHJvZHVjdCA9IHRoaXMuYnVpbGRQcm9kdWN0KGF0dHJpYnV0ZXMsIGNsYXNzTmFtZSwgdGFnVHlwZSk7XHJcblx0XHRcdGJ1aWx0UHJvZHVjdHMucHVzaChidWlsdFByb2R1Y3QpO1xyXG5cdFx0fS5iaW5kKHRoaXMpKTtcclxuXHJcblx0XHRyZXR1cm4gYnVpbHRQcm9kdWN0cztcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEJ1aWxkcyB0aGUgaHRtbCBmb3IgYSBzaW5nbGUgcHJvZHVjdC5cclxuXHQgKi9cclxuXHRidWlsZFByb2R1Y3QoYXR0cmlidXRlcywgY2xhc3NOYW1lLCB0YWdUeXBlKSBcclxuXHR7XHJcblx0XHRpZiAodHlwZW9mIGF0dHJpYnV0ZXMgIT0gJ29iamVjdCcgfHwgdHlwZW9mIHRhZ1R5cGUgIT0gJ3N0cmluZycpIHtcclxuXHRcdFx0dGhyb3cgbmV3IEludmFsaWRBcmd1bWVudEV4Y2VwdGlvbiQxO1xyXG5cdFx0fVxyXG5cclxuXHRcdGNsYXNzTmFtZSA9IGNsYXNzTmFtZSB8fCBudWxsO1xyXG5cclxuXHRcdGxldCBwcm9kdWN0ID0gRE9NLmNyZWF0ZUVsZW1lbnQoJ2RpdicsIHtcclxuXHRcdFx0Y2xhc3M6ICdwcm9kdWN0J1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0RE9NLmFkZENsYXNzKHByb2R1Y3QsIGNsYXNzTmFtZSk7XHJcblxyXG5cdFx0bGV0IG92ZXJsYXkgPSBET00uY3JlYXRlRWxlbWVudCgnZGl2Jywge1xyXG5cdFx0XHRjbGFzczogJ3Byb2R1Y3Qtb3ZlcmxheScsXHJcblx0XHR9KTtcclxuXHJcblx0XHRwcm9kdWN0LmFwcGVuZENoaWxkKG92ZXJsYXkpO1xyXG5cclxuXHRcdGZvciAodmFyIGF0dHJpYnV0ZSBpbiBhdHRyaWJ1dGVzKSB7XHJcblx0XHRcdGlmICghIENvbW1vbi5pbl9hcnJheShhdHRyaWJ1dGUsIHRoaXMuc2V0dGluZ3MuYXR0cmlidXRlcykpIHtcclxuXHRcdFx0XHRjb250aW51ZTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0bGV0IHRhZyA9IERPTS5jcmVhdGVFbGVtZW50KHRhZ1R5cGUpO1xyXG5cclxuXHRcdFx0aWYgKGF0dHJpYnV0ZSA9PSAnaW1hZ2UnKSB7XHJcblx0XHRcdFx0bGV0IGltYWdlID0gRE9NLmNyZWF0ZUVsZW1lbnQoJ2ltZycsIHtcclxuXHRcdFx0XHRcdHNyYzogYXR0cmlidXRlc1thdHRyaWJ1dGVdXHJcblx0XHRcdFx0fSk7XHJcblx0XHRcdFx0cHJvZHVjdC5hcHBlbmRDaGlsZChpbWFnZSk7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0dGFnLmlubmVySFRNTCA9IGF0dHJpYnV0ZXNbYXR0cmlidXRlXSB8fCAnJztcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0RE9NLmFkZENsYXNzKHRhZywgJ3Byb2R1Y3QtJyArIFN0ci5rZWJhYkNhc2UoYXR0cmlidXRlKSk7XHJcblx0XHRcdG92ZXJsYXkuYXBwZW5kQ2hpbGQodGFnKTtcclxuXHRcdH1cclxuXHJcblx0XHRsZXQgdGFnID0gRE9NLmNyZWF0ZUVsZW1lbnQoJ2RpdicsIHtcclxuXHRcdFx0aWQ6ICdhY3Rpb25CdXR0b25zJyxcclxuXHRcdFx0Y2xhc3M6ICdhY3Rpb24tYnV0dG9ucydcclxuXHRcdH0pO1xyXG5cclxuXHRcdGxldCBhZGRUb0NhcnQgPSBET00uY3JlYXRlRWxlbWVudCgnYnV0dG9uJywge1xyXG5cdFx0XHRpZDogJ2FkZFRvQ2FydCcsXHJcblx0XHRcdGNsYXNzOiB0aGlzLnNldHRpbmdzLmFkZF9idXR0b25fY2xhc3MsXHJcblx0XHRcdHR5cGU6ICdidXR0b24nLFxyXG5cdFx0XHR0ZXh0OiAnKycsXHJcblx0XHR9KTtcclxuXHJcblx0XHRsZXQgZmF2b3JpdGUgPSBET00uY3JlYXRlRWxlbWVudCgnYnV0dG9uJywge1xyXG5cdFx0XHRpZDogJ2Zhdm9yaXRlJyxcclxuXHRcdFx0Y2xhc3M6IHRoaXMuc2V0dGluZ3MuZmF2b3JpdGVfYnV0dG9uX2NsYXNzLFxyXG5cdFx0XHR0eXBlOiAnYnV0dG9uJyxcclxuXHRcdFx0dGV4dDogJyZoZWFydHM7J1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0dGFnLmFwcGVuZENoaWxkKGFkZFRvQ2FydCk7XHJcblx0XHR0YWcuYXBwZW5kQ2hpbGQoZmF2b3JpdGUpO1xyXG5cclxuXHRcdGFkZFRvQ2FydC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKGV2ZW50KSB7XHJcblx0XHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcblx0XHRcdENvbnRhaW5lciQzLmdldEluc3RhbmNlKCdDYXJ0JykuYWRkSXRlbShhdHRyaWJ1dGVzKTtcclxuXHRcdFx0RXZlbnQudHJpZ2dlcignUHJvZHVjdFdhc0FkZGVkJywgYXR0cmlidXRlcyk7XHJcblx0XHR9KTtcclxuXHJcblx0XHRvdmVybGF5LmFwcGVuZENoaWxkKHRhZyk7XHJcblxyXG5cdFx0cmV0dXJuIHByb2R1Y3Q7XHJcblx0fVxyXG5cclxuXHRhZGRUb0NhcnQoZXZlbnQpXHJcblx0e1xyXG5cdFx0XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBBbiBldmVudCBmb3IgdGhlIGNsaWVudCBvZiB3aGVuIHRoZSBwcm9kdWN0cyBhcyBiZWVuIGxvYWRlZC5cclxuXHQgKi9cclxuXHRBZnRlckxvYWRlZChwcm9kdWN0KSBcclxuXHR7XHJcblx0XHQvL1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQWRkIHRoZSBlQ29tbWVyY2Ugc3R5bGUgdGFncyB0byB0aGUgRE9NLlxyXG5cdCAqL1xyXG5cdGFkZFN0eWxlVGFnKCkgXHJcblx0e1xyXG5cdFx0aWYoRE9NLmVsZW1lbnQoJyNlQ29tbWVyY2UtUHJvZHVjdHMnKSkge1xyXG5cdFx0XHRyZXR1cm47XHJcblx0XHR9XHJcblxyXG5cdFx0bGV0IGNzcyA9IGBcclxuXHRcdFx0LnByb2R1Y3Qge1xyXG5cdFx0XHRcdHBvc2l0aW9uOiByZWxhdGl2ZTtcclxuXHRcdFx0XHRtYXJnaW46IDVweCA1cHg7XHJcblx0XHRcdFx0Ym9yZGVyOiAxcHggc29saWQgI2U0ZTRlNDtcclxuXHRcdFx0XHR3aWR0aDogJHt0aGlzLnNldHRpbmdzLndpZHRofTtcclxuXHRcdFx0XHRoZWlnaHQ6ICR7dGhpcy5zZXR0aW5ncy5oZWlnaHR9O1xyXG5cdFx0XHRcdGN1cnNvcjogcG9pbnRlcjtcclxuXHRcdFx0XHRjb2xvcjogI2ZmZmZmZjtcclxuXHRcdFx0XHRvdmVyZmxvdzogaGlkZGVuO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHQucHJvZHVjdCA+IC5wcm9kdWN0LW92ZXJsYXkge1xyXG5cdFx0XHRcdHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuXHRcdFx0XHR0b3A6IDA7XHJcblx0XHRcdFx0bGVmdDogMDtcclxuXHRcdFx0XHR3aWR0aDogMTAwJTtcclxuXHRcdFx0XHRoZWlnaHQ6IDEwMCU7XHJcblx0XHRcdFx0b3BhY2l0eTogMC41O1xyXG5cdFx0XHRcdHotaW5kZXg6IDU7XHJcblx0XHRcdFx0dHJhbnNpdGlvbjogMXMgYWxsO1xyXG5cdFx0XHRcdHRyYW5zZm9ybTogdHJhbnNsYXRlWCgtMjUwcHgpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHQucHJvZHVjdDpob3ZlciA+IC5wcm9kdWN0LW92ZXJsYXkge1xyXG5cdFx0XHRcdGJhY2tncm91bmQ6IHJnYmEoMCwgMCwgMCwgMC40NSk7XHJcblx0XHRcdFx0dHJhbnNmb3JtOiB0cmFuc2xhdGVYKDBweCk7XHJcblx0XHRcdFx0b3BhY2l0eTogMTtcclxuXHRcdFx0XHR0cmFuc2l0aW9uOiAxcyBhbGw7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdC5wcm9kdWN0ID4gaW1nIHtcclxuXHRcdFx0XHRwb3NpdGlvbjogYWJzb2x1dGU7XHJcblx0XHRcdFx0bGVmdDogMDtcclxuXHRcdFx0XHR0b3A6IDA7XHJcblx0XHRcdFx0d2lkdGg6IDEwMCU7XHJcblx0XHRcdFx0aGVpZ2h0OiAxMDAlO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHQucHJvZHVjdCA+IC5wcm9kdWN0LWltYWdlIHtcclxuXHRcdFx0XHR6LWluZGV4OiAwO1xyXG5cdFx0XHRcdHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuXHRcdFx0XHR0b3A6IDA7XHJcblx0XHRcdFx0bGVmdDogMDtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0LnByb2R1Y3QgPiAucHJvZHVjdC1vdmVybGF5ID4gLnByb2R1Y3QtbmFtZSwgXHJcblx0XHRcdC5wcm9kdWN0ID4gLnByb2R1Y3Qtb3ZlcmxheSA+IC5wcm9kdWN0LXByaWNlLFxyXG5cdFx0XHQucHJvZHVjdCA+IC5wcm9kdWN0LW92ZXJsYXkgPiAucHJvZHVjdC1kZWxpdmVyeS10aW1lIHtcclxuXHRcdFx0XHR6LWluZGV4OiAxO1xyXG5cdFx0XHRcdHBvc2l0aW9uOiByZWxhdGl2ZTtcclxuXHRcdFx0XHR0ZXh0LWFsaWduOiBjZW50ZXI7XHJcblx0XHRcdFx0bWFyZ2luLXRvcDogMjVweDtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0LnByb2R1Y3QgPiAucHJvZHVjdC1vdmVybGF5ID4gLmFjdGlvbi1idXR0b25zIHtcclxuXHRcdFx0XHR3aWR0aDogMTAwJTtcclxuXHRcdFx0XHRtYXJnaW4tdG9wOiAxMHB4O1xyXG5cdFx0XHRcdHRleHQtYWxpZ246IGNlbnRlcjtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0LnByb2R1Y3QgPiAucHJvZHVjdC1vdmVybGF5ID4gLmFjdGlvbi1idXR0b25zID4gI2Zhdm9yaXRlIHtcclxuXHRcdFx0XHRtYXJnaW4tbGVmdDogMTBweDtcclxuXHRcdFx0fVxyXG5cclxuXHRcdGA7XHJcblx0ICAgIFxyXG5cdCAgICBET00uYWRkU3R5bGUoJ2VDb21tZXJjZS1Qcm9kdWN0cycsIGNzcyk7XHJcblx0fVxyXG59XG5cbi8qKlxyXG4gKiBUaGUgU2VydmljZXMgT2JqZWN0LCBoYW5kbGVzIHRoZSBzZXJ2aWNlcy5cclxuICovXHJcbmNsYXNzIFNlcnZpY2VzIFxyXG57XHJcblxyXG59XG5cbi8qKlxyXG4gKiBUaGUgZGVmYXVsdCBzZXR0aW5ncyBvZiB0aGUgcGFnaW5hdGlvbi5cclxuICovXHJcbmxldCBkZWZhdWx0U2V0dGluZ3MkMyA9IHtcclxuXHRlbGVtZW50OiAnLnBhZ2luYXRpb24tbGlua3MnLFxyXG5cdGNsYXNzOiAnJyxcclxuXHRwZXJfcGFnZTogNSxcclxuXHR0b3RhbF9pdGVtczogMTAsXHJcbn07XHJcblxyXG4vKipcclxuICogU3RvcmVzIHRoZSBjb250YWluZXIgb2JqZWN0LlxyXG4gKi9cclxubGV0IENvbnRhaW5lciQ0O1xyXG5cclxuLyoqXHJcbiAqIFN0b3JlcyB0aGUgcHJvZHVjdHMgY29tcG9uZW50LlxyXG4gKi9cclxubGV0IFByb2R1Y3RzJDI7XHJcblxyXG4vKipcclxuICogVGhlIFBhZ2luYXRpb24gT2JqZWN0LCBoYW5kbGVzIHRoZSBwYWdpbmF0aW9uLlxyXG4gKi9cclxuY2xhc3MgUGFnaW5hdGlvbiBcclxue1xyXG5cdC8qKlxyXG5cdCAqIEluaXRpYWxpemUgdGhlIGNvbnRhaW5lciBvYmplY3QgYW5kIHRoZSBkZWZhdWx0IHNldHRpbmdzLlxyXG5cdCAqL1xyXG5cdGNvbnN0cnVjdG9yKGNvbnRhaW5lciwgcHJvZHVjdHMpIFxyXG5cdHtcclxuXHRcdENvbnRhaW5lciQ0ID0gY29udGFpbmVyO1xyXG5cdFx0UHJvZHVjdHMkMiA9IHByb2R1Y3RzO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogU2V0IHRoZSBQYWdpbmF0aW9uIG9iamVjdCB1cC5cclxuXHQgKi9cclxuXHRzZXR1cChzZXR0aW5ncylcclxuXHR7XHJcblx0XHRkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgZnVuY3Rpb24oKSB7XHJcblxyXG5cdFx0aWYodHlwZW9mIHNldHRpbmdzICE9ICdvYmplY3QnKSB7XHJcblx0XHRcdHRocm93IG5ldyBJbnZhbGlkQXJndW1lbnRFeGNlcHRpb24kMTtcclxuXHRcdH1cclxuXHJcblx0XHR0aGlzLnNldHRpbmdzID0gQ29tbW9uLmV4dGVuZChkZWZhdWx0U2V0dGluZ3MkMywgc2V0dGluZ3MpO1xyXG5cclxuXHRcdHRoaXMudG90YWxQYWdlcyA9IHRoaXMuY2FsY3VsYXRlVG90YWxQYWdlcyh0aGlzLnNldHRpbmdzLnBlcl9wYWdlLCB0aGlzLnNldHRpbmdzLnRvdGFsX2l0ZW1zKTtcclxuXHRcdFxyXG5cdFx0dGhpcy5zZXRFbGVtZW50KHRoaXMuc2V0dGluZ3MuZWxlbWVudCk7XHJcblx0XHR0aGlzLnJlcGxhY2VMaW5rcyh0aGlzLmxpbmtzKTtcclxuXHJcblx0XHR9LmJpbmQodGhpcykpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogU2V0cyB0aGUgd3JhcHBlciBlbGVtZW50LlxyXG5cdCAqL1xyXG5cdHNldEVsZW1lbnQoc2VsZWN0b3IpXHJcblx0e1xyXG5cdFx0dGhpcy53cmFwcGVyID0gRE9NLmVsZW1lbnQoc2VsZWN0b3IpO1xyXG5cdFx0XHJcblx0XHRET00uYWRkQ2xhc3ModGhpcy53cmFwcGVyLCB0aGlzLnNldHRpbmdzLmNsYXNzKTtcclxuXHJcblx0XHR0aGlzLmxpbmtzID0gdGhpcy5jcmVhdGVMaW5rcygpO1xyXG5cdFx0dGhpcy5iaW5kRXZlbnRMaXN0ZW5lcnModGhpcy5saW5rcyk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBSZXBsYWNlcyB0aGUgbGlua3MgaW4gdGhlIHdyYXBwZXIuXHJcblx0ICovXHJcblx0cmVwbGFjZUxpbmtzKGxpbmtzKVxyXG5cdHtcclxuXHRcdHRoaXMud3JhcHBlci5pbm5lckhUTUwgPSAnJztcclxuXHRcdHRoaXMud3JhcHBlci5hcHBlbmRDaGlsZChsaW5rcyk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBDYWxjdWxhdGVzIHRoZSB0b3RhbCBwYWdlcy5cclxuXHQgKi9cclxuXHRjYWxjdWxhdGVUb3RhbFBhZ2VzKHBlclBhZ2UsIHRvdGFsSXRlbXMpXHJcblx0e1xyXG5cdFx0cGVyUGFnZSA9IHBhcnNlSW50KHBlclBhZ2UpO1xyXG5cdFx0dG90YWxJdGVtcyA9IHBhcnNlSW50KHRvdGFsSXRlbXMpO1xyXG5cclxuXHRcdHJldHVybiBNYXRoLmNlaWwodG90YWxJdGVtcyAvIHBlclBhZ2UpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQmluZHMgdGhlIGJ1dHRvbnMgZXZlbnRzIGxpc3RlbmVycy5cclxuXHQgKi9cclxuXHRiaW5kRXZlbnRMaXN0ZW5lcnMobGlua3MpIFxyXG5cdHtcclxuXHRcdGxldCBpbnN0YW5jZSA9IHRoaXM7XHJcblxyXG5cdFx0dGhpcy5uZXh0LmNoaWxkTm9kZXNbMF0ub25jbGljayA9IGZ1bmN0aW9uKGV2ZW50KSB7XHJcblx0XHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG5cdFx0XHRsZXQgcmVxdWVzdGVkUGFnZSA9IGluc3RhbmNlLmN1cnJlbnQrMTtcclxuXHJcblx0XHRcdGlmIChpbnN0YW5jZS5ub3RJblBhZ2VSYW5nZShyZXF1ZXN0ZWRQYWdlKSkge1xyXG5cdFx0XHRcdHRocm93IG5ldyBOb3RJblBhZ2VSYW5nZUV4Y2VwdGlvbjtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0UHJvZHVjdHMkMi5nZXRQcm9kdWN0c0J5UGFnZShyZXF1ZXN0ZWRQYWdlKS50aGVuKGZ1bmN0aW9uKHByb2R1Y3RzKSB7XHJcblx0XHRcdFx0UHJvZHVjdHMkMi5yZXBsYWNlSXRlbXMocHJvZHVjdHMpO1xyXG5cdFx0XHR9KTtcclxuXHJcblx0XHRcdGluc3RhbmNlLnNldEN1cnJlbnQocmVxdWVzdGVkUGFnZSk7XHJcblx0XHR9O1xyXG5cclxuXHRcdHRoaXMucHJldmlvdXMuY2hpbGROb2Rlc1swXS5vbmNsaWNrID0gZnVuY3Rpb24oZXZlbnQpIHtcclxuXHRcdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuXHJcblx0XHRcdGxldCByZXF1ZXN0ZWRQYWdlID0gaW5zdGFuY2UuY3VycmVudC0xO1xyXG5cclxuXHRcdFx0aWYoaW5zdGFuY2Uubm90SW5QYWdlUmFuZ2UocmVxdWVzdGVkUGFnZSkpIHtcclxuXHRcdFx0XHR0aHJvdyBuZXcgTm90SW5QYWdlUmFuZ2VFeGNlcHRpb247XHJcblx0XHRcdH1cclxuXHRcdFx0XHJcblx0XHRcdFByb2R1Y3RzJDIuZ2V0UHJvZHVjdHNCeVBhZ2UocmVxdWVzdGVkUGFnZSkudGhlbihmdW5jdGlvbihwcm9kdWN0cykge1xyXG5cdFx0XHRcdFByb2R1Y3RzJDIucmVwbGFjZUl0ZW1zKHByb2R1Y3RzKTtcclxuXHRcdFx0fSk7XHJcblxyXG5cdFx0XHRpbnN0YW5jZS5zZXRDdXJyZW50KHJlcXVlc3RlZFBhZ2UpO1xyXG5cdFx0fTtcclxuXHJcblx0XHRmb3IodmFyIGkgPSAwOyBpIDwgdGhpcy5wYWdlcy5sZW5ndGg7IGkrKykge1xyXG5cdFx0XHR0aGlzLnBhZ2VzW2ldLmNoaWxkTm9kZXNbMF0ub25jbGljayA9IGZ1bmN0aW9uKGV2ZW50KSB7XHJcblx0XHRcdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuXHRcdFx0XHRcclxuXHRcdFx0XHRsZXQgcmVxdWVzdGVkUGFnZSA9IHRoaXMuZ2V0QXR0cmlidXRlKCdkYXRhLXBhZ2UtbnInKTtcclxuXHRcdFx0XHRcclxuXHRcdFx0XHRQcm9kdWN0cyQyLmdldFByb2R1Y3RzQnlQYWdlKHJlcXVlc3RlZFBhZ2UpLnRoZW4oZnVuY3Rpb24ocHJvZHVjdHMpIHtcclxuXHRcdFx0XHRcdFByb2R1Y3RzJDIucmVwbGFjZUl0ZW1zKHByb2R1Y3RzKTtcclxuXHRcdFx0XHR9KTtcclxuXHRcdFx0XHRcclxuXHRcdFx0XHRpbnN0YW5jZS5zZXRDdXJyZW50KHJlcXVlc3RlZFBhZ2UpO1xyXG5cdFx0XHR9O1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogU2V0cyB0aGUgY3VycmVudCBwYWdlLlxyXG5cdCAqL1xyXG5cdHNldEN1cnJlbnQocGFnZU51bWJlcikgXHJcblx0e1xyXG5cdFx0dGhpcy5jdXJyZW50ID0gcGFyc2VJbnQocGFnZU51bWJlcik7XHJcblx0XHR0aGlzLmNoYW5nZVVybChwYWdlTnVtYmVyKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEdldHMgdGhlIGN1cnJlbnQgcGFnZS5cclxuXHQgKi9cclxuXHRnZXRDdXJyZW50KCkgXHJcblx0e1xyXG5cdFx0cmV0dXJuIHRoaXMuY3VycmVudDtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIENyZWF0ZXMgdGhlIHBhZ2luYXRpb24gbGlua3MuXHJcblx0ICovXHJcblx0Y3JlYXRlTGlua3MoKSBcclxuXHR7XHRcclxuXHRcdGxldCB1bCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3VsJyk7XHJcblx0XHRcclxuXHRcdHRoaXMucGFnZXMgPSB0aGlzLmNyZWF0ZVBhZ2VMaW5rcygpO1xyXG5cdFx0dGhpcy5wcmV2aW91cyA9IHRoaXMuY3JlYXRlUHJldmlvdXNCdXR0b24oKTtcclxuXHRcdHRoaXMubmV4dCA9IHRoaXMuY3JlYXRlTmV4dEJ1dHRvbigpO1xyXG5cclxuXHRcdHVsLmNsYXNzTmFtZSA9ICdwYWdpbmF0aW9uJztcclxuXHRcdHVsLmFwcGVuZENoaWxkKHRoaXMucHJldmlvdXMpO1xyXG5cclxuXHRcdHRoaXMucGFnZXMuZm9yRWFjaChmdW5jdGlvbihwYWdlKSB7XHJcblx0XHRcdHVsLmFwcGVuZENoaWxkKHBhZ2UpO1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0dWwuYXBwZW5kQ2hpbGQodGhpcy5uZXh0KTtcclxuXHJcblx0XHRyZXR1cm4gdWw7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBDcmVhdGVzIHRoZSBwYWdlcyBpdGVtIGxpbmtzLlxyXG5cdCAqL1xyXG5cdGNyZWF0ZVBhZ2VMaW5rcygpIFxyXG5cdHtcclxuXHRcdHZhciBwYWdlcyA9IFtdO1xyXG5cclxuXHRcdGZvcih2YXIgaSA9IDE7IGkgPD0gdGhpcy50b3RhbFBhZ2VzOyBpKyspIHtcclxuXHRcdFx0dmFyIHBhZ2VJdGVtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKTtcclxuXHRcdFx0dmFyIGxpbmsgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJyk7XHJcblx0XHRcdHBhZ2VJdGVtLmNsYXNzTmFtZSA9ICdwYWdlLWl0ZW0nO1xyXG5cdFx0XHRsaW5rLmNsYXNzTmFtZSA9ICdwYWdlLWxpbmsnO1xyXG5cdFx0XHRsaW5rLnNldEF0dHJpYnV0ZSgnaHJlZicsICc/cGFnZT0nKyBpKTtcclxuXHRcdFx0bGluay5zZXRBdHRyaWJ1dGUoJ2RhdGEtcGFnZS1ucicsIGkpO1xyXG5cdFx0XHRsaW5rLmlubmVySFRNTCA9IGk7XHJcblx0XHRcdHBhZ2VJdGVtLmFwcGVuZENoaWxkKGxpbmspO1xyXG5cdFx0XHRwYWdlcy5wdXNoKHBhZ2VJdGVtKTtcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gcGFnZXM7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBDcmVhdGVzIHRoZSBwcmV2aW91cyBidXR0b24gbGluay5cclxuXHQgKi9cclxuXHRjcmVhdGVQcmV2aW91c0J1dHRvbigpIFxyXG5cdHtcclxuXHRcdHZhciBsaSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJyk7XHJcblx0XHR2YXIgbGluayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKTtcclxuXHRcdHZhciBzcGFuMSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcclxuXHRcdHZhciBzcGFuMiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcclxuXHRcdFxyXG5cdFx0XHJcblx0XHRsaS5jbGFzc05hbWUgPSAncGFnZS1pdGVtJztcclxuXHRcdGxpbmsuY2xhc3NOYW1lID0gJ3BhZ2UtbGluayc7XHJcblx0XHRzcGFuMi5jbGFzc05hbWUgPSAnc3Itb25seSc7XHJcblxyXG5cdFx0bGluay5zZXRBdHRyaWJ1dGUoJ2hyZWYnLCAnJyk7XHJcblx0XHRsaW5rLnNldEF0dHJpYnV0ZSgnYXJpYS1sYWJlbCcsICdQcmV2aW91cycpO1xyXG5cdFx0c3BhbjEuc2V0QXR0cmlidXRlKCdhcmlhLWhpZGRlbicsICd0cnVlJyk7XHJcblxyXG5cdFx0c3BhbjEuaW5uZXJIVE1MID0gJyZsYXF1bzsnO1xyXG5cdFx0c3BhbjIuaW5uZXJIVE1MID0gJ1ByZXZpb3VzJztcclxuXHJcblx0XHRsaW5rLmFwcGVuZENoaWxkKHNwYW4xKTtcclxuXHRcdGxpbmsuYXBwZW5kQ2hpbGQoc3BhbjIpO1xyXG5cdFx0bGkuYXBwZW5kQ2hpbGQobGluayk7XHJcblxyXG5cdFx0cmV0dXJuIGxpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQ3JlYXRlcyB0aGUgbmV4dCBidXR0b24gbGluay5cclxuXHQgKi9cclxuXHRjcmVhdGVOZXh0QnV0dG9uKCkgXHJcblx0e1xyXG5cdFx0dmFyIGxpID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKTtcclxuXHRcdHZhciBsaW5rID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpO1xyXG5cdFx0dmFyIHNwYW4xID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xyXG5cdFx0dmFyIHNwYW4yID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xyXG5cdFx0XHJcblx0XHRsaS5jbGFzc05hbWUgPSAncGFnZS1pdGVtJztcclxuXHRcdGxpbmsuY2xhc3NOYW1lID0gJ3BhZ2UtbGluayc7XHJcblx0XHRzcGFuMi5jbGFzc05hbWUgPSAnc3Itb25seSc7XHJcblxyXG5cdFx0bGluay5zZXRBdHRyaWJ1dGUoJ2hyZWYnLCAnJyk7XHJcblx0XHRsaW5rLnNldEF0dHJpYnV0ZSgnYXJpYS1sYWJlbCcsICdOZXh0Jyk7XHJcblx0XHRzcGFuMS5zZXRBdHRyaWJ1dGUoJ2FyaWEtaGlkZGVuJywgJ3RydWUnKTtcclxuXHJcblx0XHRzcGFuMS5pbm5lckhUTUwgPSAnJnJhcXVvOyc7XHJcblx0XHRzcGFuMi5pbm5lckhUTUwgPSAnTmV4dCc7XHJcblxyXG5cdFx0bGluay5hcHBlbmRDaGlsZChzcGFuMSk7XHJcblx0XHRsaW5rLmFwcGVuZENoaWxkKHNwYW4yKTtcclxuXHRcdGxpLmFwcGVuZENoaWxkKGxpbmspO1xyXG5cclxuXHRcdHJldHVybiBsaTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIENoZWNrcyBpZiB0aGUgZ2l2ZW4gcGFnZSBpcyBpbiByYW5nZS5cclxuXHQgKi9cclxuXHRub3RJblBhZ2VSYW5nZShwYWdlTnVtYmVyKSBcclxuXHR7XHJcblx0XHRyZXR1cm4gKHBhZ2VOdW1iZXIgPiB0aGlzLnRvdGFsUGFnZXMgfHwgcGFnZU51bWJlciA8PSAwKSB8fCBpc05hTihwYWdlTnVtYmVyKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIENoYW5nZXMgdGhlIHVybCB0byBhIGdpdmVuIHBhZ2UgbnVtYmVyLlxyXG5cdCAqL1xyXG5cdGNoYW5nZVVybChwYWdlTnVtYmVyKSBcclxuXHR7XHJcblx0XHRwYWdlTnVtYmVyID0gIHBhZ2VOdW1iZXIgfHwgR0VUX1ZhcnMoKVsncGFnZSddO1xyXG5cdFx0d2luZG93Lmhpc3RvcnkucmVwbGFjZVN0YXRlKCcnLCAnJywgdGhpcy51cGRhdGVVUkxQYXJhbWV0ZXIod2luZG93LmxvY2F0aW9uLmhyZWYsICdwYWdlJywgcGFnZU51bWJlcikpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogR2V0IHRoZSBnZXQgdmFyaWFibGVzIGZyb20gdGhlIHVybC5cclxuXHQgKi9cclxuXHRHRVRfVmFycygpIFxyXG5cdHtcclxuXHRcdHZhciB2YXJzID0ge307XHJcblx0XHR2YXIgcGFydHMgPSB3aW5kb3cubG9jYXRpb24uaHJlZi5yZXBsYWNlKC9bPyZdKyhbXj0mXSspPShbXiZdKikvZ2ksIGZ1bmN0aW9uKG0sIGtleSwgdmFsdWUpIHtcclxuXHRcdFx0dmFyc1trZXldID0gdmFsdWU7XHJcblx0XHR9KTtcclxuXHJcblx0XHRyZXR1cm4gdmFycztcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIE1vZGlmaWVzIHRoZSBnZXQgcGFyYW1ldGVyIGluIHRoZSB1cmwuXHJcblx0ICovXHJcblx0dXBkYXRlVVJMUGFyYW1ldGVyKHVybCwgcGFyYW0sIHBhcmFtVmFsKSBcclxuXHR7XHJcblx0ICAgIHZhciBuZXdBZGRpdGlvbmFsVVJMID0gXCJcIjtcclxuXHQgICAgdmFyIHRlbXBBcnJheSA9IHVybC5zcGxpdChcIj9cIik7XHJcblx0ICAgIHZhciBiYXNlVVJMID0gdGVtcEFycmF5WzBdO1xyXG5cdCAgICB2YXIgYWRkaXRpb25hbFVSTCA9IHRlbXBBcnJheVsxXTtcclxuXHQgICAgdmFyIHRlbXAgPSBcIlwiO1xyXG5cclxuXHQgICAgaWYgKGFkZGl0aW9uYWxVUkwpIHtcclxuXHQgICAgICAgIHRlbXBBcnJheSA9IGFkZGl0aW9uYWxVUkwuc3BsaXQoXCImXCIpO1xyXG5cdCAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0ZW1wQXJyYXkubGVuZ3RoOyBpKyspe1xyXG5cdCAgICAgICAgICAgIGlmICh0ZW1wQXJyYXlbaV0uc3BsaXQoJz0nKVswXSAhPSBwYXJhbSl7XHJcblx0ICAgICAgICAgICAgICAgIG5ld0FkZGl0aW9uYWxVUkwgKz0gdGVtcCArIHRlbXBBcnJheVtpXTtcclxuXHQgICAgICAgICAgICAgICAgdGVtcCA9IFwiJlwiO1xyXG5cdCAgICAgICAgICAgIH1cclxuXHQgICAgICAgIH1cclxuXHQgICAgfVxyXG5cclxuXHQgICAgdmFyIHJvd3NUZXh0ID0gdGVtcCArIFwiXCIgKyBwYXJhbSArIFwiPVwiICsgcGFyYW1WYWw7XHJcblx0ICAgIHJldHVybiBiYXNlVVJMICsgXCI/XCIgKyBuZXdBZGRpdGlvbmFsVVJMICsgcm93c1RleHQ7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBSZXNldHMgdGhlIHBhZ2luYXRpb24uXHJcblx0ICovXHJcblx0cmVzZXQoKSBcclxuXHR7XHJcblx0XHR0aGlzLnNldEN1cnJlbnQoMSk7XHJcblx0XHR0aGlzLmNoYW5nZVVybCgxKTtcclxuXHR9XHJcbn1cblxuY2xhc3MgQ29va2llXHJcbntcclxuXHQvKipcclxuIFx0KiBTZXRzIGEgY29va2llLiBcclxuXHQqL1xyXG5cdHN0YXRpYyBzZXQobmFtZSwgdmFsdWUsIGRheXMpIFxyXG5cdHtcclxuXHRcdGlmICh2YWx1ZS5jb25zdHJ1Y3Rvci5uYW1lICA9PSAnT2JqZWN0JyB8fCB2YWx1ZS5jb25zdHJ1Y3Rvci5uYW1lID09ICdBcnJheScpIHtcclxuXHRcdFx0dmFsdWUgPSBKU09OLnN0cmluZ2lmeSh2YWx1ZSk7XHJcblx0XHR9XHJcblxyXG5cdCAgICBsZXQgZXhwaXJlcztcclxuXHQgICAgXHJcblx0ICAgIGlmIChkYXlzKSB7XHJcblx0ICAgICAgICBsZXQgZGF0ZSA9IG5ldyBEYXRlKCk7XHJcblx0ICAgICAgICBkYXRlLnNldFRpbWUoZGF0ZS5nZXRUaW1lKCkgKyAoZGF5cyAqIDI0ICogNjAgKiA2MCAqIDEwMDApKTtcclxuXHQgICAgICAgIGV4cGlyZXMgPSBcIjsgZXhwaXJlcz1cIiArIGRhdGUudG9HTVRTdHJpbmcoKTtcclxuXHQgICAgfSBlbHNlIHtcclxuXHQgICAgICAgIGV4cGlyZXMgPSBcIlwiO1xyXG5cdCAgICB9XHJcblxyXG5cdCAgICBkb2N1bWVudC5jb29raWUgPSBuYW1lICsgXCI9XCIgKyB2YWx1ZSArIGV4cGlyZXMgKyBcIjsgcGF0aD0vXCI7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBSZXRyaWV2ZXMgdGhlIGNvb2tpZSBieSBuYW1lLlxyXG5cdCAqL1xyXG5cdHN0YXRpYyBnZXQobmFtZSkgXHJcblx0e1xyXG5cdCAgICBpZiAoZG9jdW1lbnQuY29va2llLmxlbmd0aCA+IDApIHtcclxuXHQgICAgICAgIGxldCBjX3N0YXJ0ID0gZG9jdW1lbnQuY29va2llLmluZGV4T2YobmFtZSArIFwiPVwiKTtcclxuXHQgICAgICAgIFxyXG5cdCAgICAgICAgaWYgKGNfc3RhcnQgIT0gLTEpIHtcclxuXHQgICAgICAgICAgICBjX3N0YXJ0ID0gY19zdGFydCArIG5hbWUubGVuZ3RoICsgMTtcclxuXHQgICAgICAgICAgICBsZXQgY19lbmQgPSBkb2N1bWVudC5jb29raWUuaW5kZXhPZihcIjtcIiwgY19zdGFydCk7XHJcblx0ICAgICAgICAgICAgXHJcblx0ICAgICAgICAgICAgaWYgKGNfZW5kID09IC0xKSB7XHJcblx0ICAgICAgICAgICAgICAgIGNfZW5kID0gZG9jdW1lbnQuY29va2llLmxlbmd0aDtcclxuXHQgICAgICAgICAgICB9XHJcblxyXG5cdCAgICAgICAgICAgIHJldHVybiBKU09OLnBhcnNlKHVuZXNjYXBlKGRvY3VtZW50LmNvb2tpZS5zdWJzdHJpbmcoY19zdGFydCwgY19lbmQpKSk7XHJcblx0ICAgICAgICB9XHJcblx0ICAgIH1cclxuXHJcblx0ICAgIHJldHVybiBbXTtcclxuXHR9XHJcbn1cblxuLyoqXHJcbiAqIFRoZSBkZWZhdWx0IHNldHRpbmdzIG9mIHRoZSBjYXJ0LlxyXG4gKi9cclxubGV0IGRlZmF1bHRTZXR0aW5ncyQ0ID0ge1xyXG5cdGVsZW1lbnQ6ICcuY2FydCcsXHJcblx0Y29va2llX25hbWU6ICdjYXJ0JyxcclxuXHRwcmV2aWV3X2NsYXNzOiAnJyxcclxuXHRjbGFzczogJycsXHJcblx0d2lkdGg6ICc2MHB4JyxcclxuXHRoZWlnaHQ6ICc2MHB4JyxcclxuXHRwbGFjZW1lbnQ6ICdyaWdodC10b3AnLFxyXG5cdGZpeGVkOiB0cnVlLFxyXG5cdGhvdmVyX2NvbG9yOiAnb3JhbmdlJ1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIFN0b3JlcyB0aGUgY29udGFpbmVyIG9iamVjdC5cclxuICovXHJcbmxldCBDb250YWluZXIkNTtcclxuXHJcbi8qKlxyXG4gKiBUaGUgQ2FydCBPYmplY3QsIGhhbmRsZXMgdGhlIGNhcnQgaWNvbiBhbmQgc2Vzc2lvbnMuXHJcbiAqL1xyXG5jbGFzcyBDYXJ0IFxyXG57XHJcblx0LyoqXHJcblx0ICogSW5pdGlhbGl6ZSB0aGUgZGVmYXVsdCBzZXR0aW5ncywgc2V0dGluZyB0aGUgZWxlbWVudCxcclxuXHQgKiBhbmQgY3JlYXRpbmcgdGhlIHByZXZpZXcgZm9yIHRoZSBjYXJ0cyBkZXRhaWxzLlxyXG5cdCAqL1xyXG5cdGNvbnN0cnVjdG9yKGNvbnRhaW5lcikgXHJcblx0e1xyXG5cdFx0Q29udGFpbmVyJDUgPSBjb250YWluZXI7XHJcblx0XHRcclxuXHRcdHRoaXMucHJldmlld0VsZW1lbnQgPSB0aGlzLmNyZWF0ZVByZXZpZXdFbGVtZW50KCk7XHJcblx0XHR0aGlzLnN2Z0ljb24gPSBjcmVhdGVJY29uLmNhbGwodGhpcyk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBTZXRzIHRoZSBvYmplY3QgYnkgdGhlIHVzZXJzIHNldHRpbmcuXHJcblx0ICovXHJcblx0c2V0dXAoc2V0dGluZ3MpXHJcblx0e1xyXG5cdFx0aWYodHlwZW9mIHNldHRpbmdzICE9ICdvYmplY3QnKSB7XHJcblx0XHRcdHRocm93IG5ldyBJbnZhbGlkQXJndW1lbnRFeGNlcHRpb24kMTtcclxuXHRcdH1cclxuXHJcblx0XHR0aGlzLnNldHRpbmdzID0gQ29tbW9uLmV4dGVuZChkZWZhdWx0U2V0dGluZ3MkNCwgc2V0dGluZ3MpO1xyXG5cclxuXHRcdHRoaXMuc2V0RWxlbWVudCh0aGlzLnNldHRpbmdzLmVsZW1lbnQpO1xyXG5cclxuXHRcdERPTS5hZGRDbGFzcyh0aGlzLnByZXZpZXdFbGVtZW50LCAnY2xvc2VkJyk7XHJcblx0XHRET00uYWRkQ2xhc3ModGhpcy5wcmV2aWV3RWxlbWVudCwgdGhpcy5zZXR0aW5ncy5wcmV2aWV3X2NsYXNzKTtcclxuXHRcdFxyXG5cdFx0dGhpcy5iaW5kRXZlbnRMaXN0ZW5lcnMoKTtcclxuXHRcdHRoaXMuYWRkU3R5bGVUYWcoKTtcclxuXHJcblx0XHRpZih0aGlzLmlzRW1wdHkoQ29va2llLmdldCh0aGlzLnNldHRpbmdzLmNvb2tpZV9uYW1lKSkpIHtcclxuXHRcdFx0dGhpcy5jYXJ0ID0ge307XHJcblx0XHRcdHRoaXMuc2V0Q2FydCh0aGlzLmNhcnQpO1xyXG5cdFx0fVxyXG5cclxuXHJcblx0XHRFdmVudC5saXN0ZW4oJ1Byb2R1Y3RXYXNBZGRlZCcsIGZ1bmN0aW9uKGF0dHJpYnV0ZXMpIHtcclxuXHRcdFx0dGhpcy5hZGRUb1ByZXZpZXcoYXR0cmlidXRlcyk7XHJcblx0XHR9LmJpbmQodGhpcykpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQ2hlY2tzIGlmIHRoZSBjYXJ0IGlzIGVtcHR5XHJcblx0ICovXHJcblx0aXNFbXB0eShjYXJ0KVxyXG5cdHtcclxuXHRcdHJldHVybiBDb21tb24uZW1wdHlPYmplY3QoY2FydCk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBTZXRzIHRoZSBjYXJ0IGFzIGEgY29va2llLlxyXG5cdCAqL1xyXG5cdHNldENhcnQoY2FydClcclxuXHR7XHJcblx0XHR0aGlzLmNhcnQuaWQgPSBTdHIucmFuZG9tKDEwKTtcclxuXHRcdHRoaXMuY2FydC5pdGVtcyA9IFtdO1xyXG5cdFx0dGhpcy5jYXJ0LmZhdm9yaXRlcyA9IFtdO1xyXG5cdFx0Q29va2llLnNldCh0aGlzLnNldHRpbmdzLmNvb2tpZV9uYW1lLCBjYXJ0LCAyKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEFkZHMgYW4gaXRlbSB0byB0aGUgY2FydC5cclxuXHQgKi9cclxuXHRhZGRJdGVtKGl0ZW0pXHJcblx0e1xyXG5cdFx0dGhpcy5jYXJ0ID0gQ29va2llLmdldCh0aGlzLnNldHRpbmdzLmNvb2tpZV9uYW1lKTtcclxuXHJcblx0XHR0aGlzLmNhcnQuaXRlbXMucHVzaChpdGVtKTtcclxuXHJcblx0XHRDb29raWUuc2V0KHRoaXMuc2V0dGluZ3MuY29va2llX25hbWUsIHRoaXMuY2FydCwgMik7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBSZW1vdmVzIGFuIGl0ZW0gZnJvbSB0aGUgY2FydC5cclxuXHQgKi9cclxuXHRyZW1vdmVJdGVtKGl0ZW0pXHJcblx0e1xyXG4gXHRcdHRoaXMuY2FydCA9IENvb2tpZS5nZXQodGhpcy5zZXR0aW5ncy5jb29raWVfbmFtZSk7XHJcblxyXG4gXHRcdHRoaXMuY2FydC5pdGVtcy5zcGxpY2UodGhpcy5jYXJ0Lml0ZW1zLmluZGV4T2YoaXRlbSksIDEpO1xyXG5cclxuIFx0XHRDb29raWUuc2V0KHRoaXMuc2V0dGluZ3MuY29va2llX25hbWUsIHRoaXMuY2FydCwgMik7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBBZGRzIHRoZSBpdGVtIHRvIHByZXZpZXcuXHJcblx0ICovXHJcblx0YWRkVG9QcmV2aWV3KGl0ZW0pXHJcblx0e1xyXG5cdFx0bGV0IGxpID0gRE9NLmNyZWF0ZUVsZW1lbnQoJ2xpJywge1xyXG5cdFx0XHRcdGNsYXNzOiAnaXRlbSdcclxuXHRcdFx0fSk7XHJcblxyXG5cdFx0Zm9yKGxldCBhdHRyaWJ1dGUgaW4gaXRlbSkge1xyXG5cdFx0XHRsZXQgc3BhbiA9IERPTS5jcmVhdGVFbGVtZW50KCdzcGFuJywge1xyXG5cdFx0XHRcdHRleHQ6IGl0ZW1bYXR0cmlidXRlXVxyXG5cdFx0XHR9KTtcclxuXHJcblx0XHRcdGxpLmFwcGVuZENoaWxkKHNwYW4pO1xyXG5cdFx0fVxyXG5cclxuXHRcdHRoaXMucHJldmlld0VsZW1lbnQucXVlcnlTZWxlY3RvcignLml0ZW1zJykuYXBwZW5kQ2hpbGQobGkpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQmluZHMgZXZlcnRoaW5nIHRvIHRoZSBlbGVtZW50LlxyXG5cdCAqL1xyXG5cdHNldEVsZW1lbnQoc2VsZWN0b3IpXHJcblx0e1xyXG5cdFx0dGhpcy5pY29uID0gRE9NLmVsZW1lbnQoc2VsZWN0b3IpO1xyXG5cclxuXHRcdGlmICh0aGlzLmljb24pIHtcclxuXHRcdFx0RE9NLmFkZENsYXNzKHRoaXMuaWNvbiwgdGhpcy5zZXR0aW5ncy5jbGFzcyk7XHJcblx0XHRcdERPTS5hZGRDbGFzcyh0aGlzLmljb24sIHRoaXMuc2V0dGluZ3MucGxhY2VtZW50KTtcclxuXHRcdFx0dGhpcy5pY29uLmFwcGVuZENoaWxkKHRoaXMuc3ZnSWNvbik7XHJcblx0XHRcdHRoaXMuaWNvbi5hcHBlbmRDaGlsZCh0aGlzLnByZXZpZXdFbGVtZW50KTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIENyZWF0ZXMgdGhlIGNhcnQgZGV0YWlscyBwcmV2aWV3IGVsZW1lbnQuXHJcblx0ICovXHJcblx0Y3JlYXRlUHJldmlld0VsZW1lbnQoKVxyXG5cdHtcclxuXHRcdGxldCBwcmV2aWV3RWxlbWVudCA9IERPTS5jcmVhdGVFbGVtZW50KCdkaXYnLCB7XHJcblx0XHRcdGlkOiAncHJldmlldydcclxuXHRcdH0pO1xyXG5cclxuXHRcdGxldCB1bCA9IERPTS5jcmVhdGVFbGVtZW50KCd1bCcsIHtcclxuXHRcdFx0XHRjbGFzczogJ2l0ZW1zJ1xyXG5cdFx0XHR9KTtcclxuXHJcblx0XHRwcmV2aWV3RWxlbWVudC5hcHBlbmRDaGlsZCh1bCk7XHJcblxyXG5cdFx0cmV0dXJuIHByZXZpZXdFbGVtZW50O1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQWRkIHRoZSBlQ29tbWVyY2Ugc3R5bGUgdGFncyB0byB0aGUgRE9NLlxyXG5cdCAqL1xyXG5cdGFkZFN0eWxlVGFnKCkgXHJcblx0e1xyXG5cdFx0aWYoRE9NLmVsZW1lbnQoJyNlQ29tbWVyY2UtQ2FydCcpKSB7XHJcblx0XHRcdHJldHVybjtcclxuXHRcdH1cclxuXHJcblx0XHRsZXQgcG9zaXRpb24gPSAodGhpcy5zZXR0aW5ncy5maXhlZCkgPyAnZml4ZWQnIDogJ2Fic29sdXRlJztcclxuXHJcblx0XHRsZXQgY3NzID0gYFxyXG5cdFx0XHQke3RoaXMuc2V0dGluZ3MuZWxlbWVudH0ge1xyXG5cdFx0XHRcdHBvc2l0aW9uOiAke3Bvc2l0aW9ufTtcclxuXHRcdFx0XHRjdXJzb3I6IHBvaW50ZXI7XHJcblx0XHRcdFx0Y29sb3I6ICNmZmZmZmY7XHJcblx0XHRcdFx0ei1pbmRleDogOTk4O1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHQke3RoaXMuc2V0dGluZ3MuZWxlbWVudH0gPiBzdmcge1xyXG5cdFx0XHRcdHdpZHRoOiAke3RoaXMuc2V0dGluZ3Mud2lkdGh9O1xyXG5cdFx0XHRcdGhlaWdodDogJHt0aGlzLnNldHRpbmdzLmhlaWdodH07XHJcblx0XHRcdFx0dHJhbnNpdGlvbjogZmlsbCAwLjNzO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHQke3RoaXMuc2V0dGluZ3MuZWxlbWVudH0gPiBzdmc6aG92ZXIge1xyXG5cdFx0XHRcdGZpbGw6ICR7dGhpcy5zZXR0aW5ncy5ob3Zlcl9jb2xvcn07XHJcblx0XHRcdFx0dHJhbnNpdGlvbjogZmlsbCAwLjNzO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHQke3RoaXMuc2V0dGluZ3MuZWxlbWVudH0udG9wLXJpZ2h0LFxyXG5cdFx0XHQke3RoaXMuc2V0dGluZ3MuZWxlbWVudH0ucmlnaHQtdG9wIHtcclxuXHRcdFx0XHRyaWdodDogMTBweDtcclxuXHRcdFx0XHR0b3A6IDEwcHg7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdCR7dGhpcy5zZXR0aW5ncy5lbGVtZW50fS5sZWZ0LXRvcCxcclxuXHRcdFx0JHt0aGlzLnNldHRpbmdzLmVsZW1lbnR9LnRvcC1sZWZ0IHtcclxuXHRcdFx0XHRsZWZ0OiAxMHB4O1xyXG5cdFx0XHRcdHRvcDogMTBweDtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0JHt0aGlzLnNldHRpbmdzLmVsZW1lbnR9ID4gI3ByZXZpZXcge1xyXG5cdFx0XHRcdHBvc2l0aW9uOiAke3Bvc2l0aW9ufTtcclxuXHRcdFx0XHR6LWluZGV4OiA5OTk5O1xyXG5cdFx0XHRcdHRvcDogY2FsYygxMHB4ICsgJHt0aGlzLnNldHRpbmdzLmhlaWdodH0pO1xyXG5cdFx0XHRcdHRyYW5zZm9ybTogdHJhbnNsYXRlWCg2MHB4KTtcclxuXHRcdFx0XHRoZWlnaHQ6IDQwMHB4O1xyXG5cdFx0XHRcdHdpZHRoOiAzMDBweDtcclxuXHRcdFx0XHRib3JkZXI6IDFweCBzb2xpZCAjZTRlNGU0O1xyXG5cdFx0XHRcdGJhY2tncm91bmQ6ICNmZmZmZmY7XHJcblx0XHRcdFx0dHJhbnNpdGlvbjogdHJhbnNmb3JtIDFzLCB2aXNpYmlsaXR5IDFzO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHQke3RoaXMuc2V0dGluZ3MuZWxlbWVudH0gPiAjcHJldmlldy5vcGVuZWQge1xyXG5cdFx0XHRcdHZpc2liaWxpdHk6IHZpc2libGU7XHJcblx0XHRcdFx0dHJhbnNmb3JtOiB0cmFuc2xhdGVYKC0yNDBweCk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdCR7dGhpcy5zZXR0aW5ncy5lbGVtZW50fSA+ICNwcmV2aWV3LmNsb3NlZCB7XHJcblx0XHRcdFx0dmlzaWJpbGl0eTogaGlkZGVuO1xyXG5cdFx0XHRcdHRyYW5zZm9ybTogdHJhbnNsYXRlWCg2MHB4KTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0JHt0aGlzLnNldHRpbmdzLmVsZW1lbnR9ID4gI3ByZXZpZXcgPiB1bC5pdGVtcyxcclxuXHRcdFx0JHt0aGlzLnNldHRpbmdzLmVsZW1lbnR9ID4gI3ByZXZpZXcgPiB1bC5pdGVtcyA+IGxpLml0ZW0ge1xyXG5cdFx0XHRcdGNvbG9yOiAjMDAwMDAwO1xyXG5cdFx0XHRcdGxpc3Qtc3R5bGUtdHlwZTogbm9uZTtcclxuXHRcdFx0fVxyXG5cdFx0YDtcclxuXHQgICAgXHJcblx0ICAgIERPTS5hZGRTdHlsZSgnZUNvbW1lcmNlLUNhcnQnLCBjc3MpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQmluZHMgZXZlbnQgbGlzdGVuZXJzIHRvIHRoZSBjYXJ0IGljb24uXHJcblx0ICovXHJcblx0YmluZEV2ZW50TGlzdGVuZXJzKClcclxuXHR7XHJcblx0XHRpZih0aGlzLnN2Z0ljb24gPT0gbnVsbCkge1xyXG5cdFx0XHRyZXR1cm47XHJcblx0XHR9XHJcblxyXG5cdFx0dGhpcy5zdmdJY29uLm9uY2xpY2sgPSBmdW5jdGlvbihldmVudCkge1xyXG5cdFx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdFx0XHRET00udG9nZ2xlQ2xhc3ModGhpcy5wcmV2aWV3RWxlbWVudCwgJ29wZW5lZCcsICdjbG9zZWQnKTtcclxuXHRcdH0uYmluZCh0aGlzKTtcclxuXHR9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNsb3NlKGV2ZW50KSB7XHJcblx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuXHRET00uc3dpdGNoQ2xhc3Nlcyh0aGlzLnByZXZpZXdFbGVtZW50LCAnb3BlbmVkJywgJ2Nsb3NlZCcpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBjcmVhdGVJY29uKCkge1xyXG5cdGxldCBzdmcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50TlMoXCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiLCBcInN2Z1wiKTtcclxuXHRsZXQgZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnROUyhcImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIsIFwiZ1wiKTtcclxuXHRsZXQgcGF0aCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnROUyhcImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIsIFwicGF0aFwiKTtcclxuXHJcblx0c3ZnLnNldEF0dHJpYnV0ZSgndmVyc2lvbicsICcxLjEnKTtcclxuXHRzdmcuc2V0QXR0cmlidXRlKCd4bWxucycsICdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZycpO1xyXG5cdHN2Zy5zZXRBdHRyaWJ1dGUoJ3htbG5zOnhsaW5rJywgJ2h0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsnKTtcclxuXHRzdmcuc2V0QXR0cmlidXRlKCd4JywgJzBweCcpO1xyXG5cdHN2Zy5zZXRBdHRyaWJ1dGUoJ3knLCAnMHB4Jyk7XHJcblx0c3ZnLnNldEF0dHJpYnV0ZSgnd2lkdGgnLCAnNDQ2Ljg0M3B4Jyk7XHJcblx0c3ZnLnNldEF0dHJpYnV0ZSgnaGVpZ2h0JywgJzQ0Ni44NDNweCcpO1xyXG5cdHN2Zy5zZXRBdHRyaWJ1dGUoJ3ZpZXdCb3gnLCAnMCAwIDQ0Ni44NDMgNDQ2Ljg0MycpO1xyXG5cdHN2Zy5zZXRBdHRyaWJ1dGUoJ3N0eWxlJywgJ2VuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgNDQ2Ljg0MyA0NDYuODQzOycpO1xyXG5cdHN2Zy5zZXRBdHRyaWJ1dGUoJ3htbDpzcGFjZScsICdwcmVzZXJ2ZScpO1xyXG5cclxuXHRwYXRoLnNldEF0dHJpYnV0ZSgnZCcsICdNNDQ0LjA5LDkzLjEwM2MtMi42OTgtMy42OTktNy4wMDYtNS44ODgtMTEuNTg0LTUuODg4SDEwOS45MmMtMC42MjUsMC0xLjI0OSwwLjAzOC0xLjg1LDAuMTE5bC0xMy4yNzYtMzguMjdjLTEuMzc2LTMuOTU4LTQuNDA2LTcuMTEzLTguMy04LjY0NkwxOS41ODYsMTQuMTM0Yy03LjM3NC0yLjg4Ny0xNS42OTUsMC43MzUtMTguNTkxLDguMWMtMi44OTEsNy4zNjksMC43MywxNS42OTUsOC4xLDE4LjU5MWw2MC43NjgsMjMuODcybDc0LjM4MSwyMTQuMzk5Yy0zLjI4MywxLjE0NC02LjA2NSwzLjY2My03LjMzMiw3LjE4N2wtMjEuNTA2LDU5LjczOWMtMS4zMTgsMy42NjMtMC43NzUsNy43MzMsMS40NjgsMTAuOTE2YzIuMjQsMy4xODMsNS44ODMsNS4wNzgsOS43NzMsNS4wNzhoMTEuMDQ0Yy02Ljg0NCw3LjYxNi0xMS4wNDQsMTcuNjQ2LTExLjA0NCwyOC42NzVjMCwyMy43MTgsMTkuMjk4LDQzLjAxMiw0My4wMTIsNDMuMDEyczQzLjAxMi0xOS4yOTQsNDMuMDEyLTQzLjAxMmMwLTExLjAyOS00LjItMjEuMDU5LTExLjA0NC0yOC42NzVoOTMuNzc2Yy02Ljg0Nyw3LjYxNi0xMS4wNDgsMTcuNjQ2LTExLjA0OCwyOC42NzVjMCwyMy43MTgsMTkuMjk0LDQzLjAxMiw0My4wMTMsNDMuMDEyYzIzLjcxOCwwLDQzLjAxMi0xOS4yOTQsNDMuMDEyLTQzLjAxMmMwLTExLjAyOS00LjItMjEuMDU5LTExLjA0My0yOC42NzVoMTMuNDMzYzYuNTk5LDAsMTEuOTQ3LTUuMzQ5LDExLjk0Ny0xMS45NDhjMC02LjU5OS01LjM0OS0xMS45NDctMTEuOTQ3LTExLjk0N0gxNDMuNjQ3bDEzLjMxOS0zNi45OTZjMS43MiwwLjcyNCwzLjU3OCwxLjE1Miw1LjUyMywxLjE1MmgyMTAuMjc4YzYuMjM0LDAsMTEuNzUxLTQuMDI3LDEzLjY1LTkuOTU5bDU5LjczOS0xODYuMzg3QzQ0Ny41NTcsMTAxLjU2Nyw0NDYuNzg4LDk2LjgwMiw0NDQuMDksOTMuMTAzeiBNMTY5LjY1OSw0MDkuODA3Yy0xMC41NDMsMC0xOS4xMTYtOC41NzMtMTkuMTE2LTE5LjExNnM4LjU3My0xOS4xMTcsMTkuMTE2LTE5LjExN3MxOS4xMTYsOC41NzQsMTkuMTE2LDE5LjExN1MxODAuMjAyLDQwOS44MDcsMTY5LjY1OSw0MDkuODA3eiBNMzI3LjM2Nyw0MDkuODA3Yy0xMC41NDMsMC0xOS4xMTctOC41NzMtMTkuMTE3LTE5LjExNnM4LjU3NC0xOS4xMTcsMTkuMTE3LTE5LjExN2MxMC41NDIsMCwxOS4xMTYsOC41NzQsMTkuMTE2LDE5LjExN1MzMzcuOTA5LDQwOS44MDcsMzI3LjM2Nyw0MDkuODA3eiBNNDAyLjUyLDE0OC4xNDloLTczLjE2MVYxMTUuODloODMuNDk5TDQwMi41MiwxNDguMTQ5eiBNMzgxLjQ1MywyMTMuODYxaC01Mi4wOTR2LTM3LjAzOGg2My45NjdMMzgxLjQ1MywyMTMuODYxeiBNMjM0LjU3MSwyMTMuODYxdi0zNy4wMzhoNjYuMTEzdjM3LjAzOEgyMzQuNTcxeiBNMzAwLjY4NCwyNDIuNTM4djMxLjA2NGgtNjYuMTEzdi0zMS4wNjRIMzAwLjY4NHogTTEzOS4xMTUsMTc2LjgyM2g2Ni43ODR2MzcuMDM4aC01My45MzNMMTM5LjExNSwxNzYuODIzeiBNMjM0LjU3MSwxNDguMTQ5VjExNS44OWg2Ni4xMTN2MzIuMjU5SDIzNC41NzF6IE0yMDUuODk4LDExNS44OXYzMi4yNTloLTc2LjczNGwtMTEuMTkxLTMyLjI1OUgyMDUuODk4eiBNMTYxLjkxNiwyNDIuNTM4aDQzLjk4MnYzMS4wNjRoLTMzLjIwNkwxNjEuOTE2LDI0Mi41Mzh6IE0zMjkuMzU5LDI3My42MDN2LTMxLjA2NGg0Mi45MDlsLTkuOTU1LDMxLjA2NEgzMjkuMzU5eicpO1xyXG5cclxuXHRnLmFwcGVuZENoaWxkKHBhdGgpO1xyXG5cdHN2Zy5hcHBlbmRDaGlsZChnKTtcclxuXHJcblxyXG5cdHJldHVybiBzdmc7XHJcbn1cblxubGV0IGluaXRhbGl6ZWQgPSBmYWxzZTtcblxubGV0IGRlZmF1bHRTZXR0aW5ncyA9IHtcblx0aW1wb3J0Qm9vdHN0cmFwOiBmYWxzZSxcblx0Y29tcG9uZW50czogWydQcm9kdWN0cycsICdTZXJ2aWNlcycsICdGaWx0ZXInLCAnUGFnaW5hdGlvbicsICdDYXJ0J11cbn07XG5cbmNsYXNzIGVDb21tZXJjZVxue1xuXHRjb25zdHJ1Y3RvcihzZXR0aW5ncylcblx0e1xuXHRcdEV4Y2VwdGlvbkhhbmRsZXIuaW5pdGFsaXplKCk7XG5cblx0XHRpZih0eXBlb2Ygc2V0dGluZ3MgIT0gJ29iamVjdCcpIHtcblx0XHRcdHRocm93IG5ldyBJbnZhbGlkQXJndW1lbnRFeGNlcHRpb24kMTtcblx0XHR9XG5cblx0XHR0aGlzLmNvbnRhaW5lciA9IG5ldyBDb250YWluZXI7XG5cdFx0dGhpcy5zZXR0aW5ncyA9IENvbW1vbi5leHRlbmQoZGVmYXVsdFNldHRpbmdzLCBzZXR0aW5ncyk7XG5cdFx0XG5cdFx0YmluZENvbXBvbmVudHNEZXBlbmRlbmNpZXMuY2FsbCh0aGlzLCBzZXR0aW5ncy5jb21wb25lbnRzKTtcblxuXHRcdGluaXRhbGl6ZWQgPSB0cnVlO1xuXG5cdFx0cmV0dXJuIG5ldyBQcm94eSh0aGlzLCB7XG5cdFx0XHRnZXQ6IGZ1bmN0aW9uKHRhcmdldCwgb2JqZWN0KSB7XG5cdFx0XHRcdGlmKCEgQ29tbW9uLmluX2FycmF5KG9iamVjdCwgc2V0dGluZ3MuY29tcG9uZW50cykpIHtcblx0XHRcdFx0XHR0aHJvdyBuZXcgQ29tcG9uZW50Tm90UmVnaXN0ZXJlZEV4Y2VwdGlvbjtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdHJldHVybiB0YXJnZXQuY29udGFpbmVyLm1ha2Uob2JqZWN0KTtcblx0XHRcdH1cblx0XHR9KTtcblx0fVxufVxuXG4vKipcbiAqIEJpbmRzIGNvbXBvbmVudHMgZGVwZW5kZW5jaWVzLlxuICovXG5mdW5jdGlvbiBiaW5kQ29tcG9uZW50c0RlcGVuZGVuY2llcyhjb21wb25lbnRzKSB7XG5cdHRoaXMuY29udGFpbmVyLmJpbmQoJ0ZpbHRlcicsIGZ1bmN0aW9uKGNvbnRhaW5lcikge1xuXHRcdGNvbnRhaW5lclsnRmlsdGVyJ10uYm9vdGVkID0gdHJ1ZTtcblx0XHRyZXR1cm4gbmV3IEZpbHRlcihjb250YWluZXIpO1xuXHR9KTtcblx0XG5cdHRoaXMuY29udGFpbmVyLmJpbmQoJ1NlcnZpY2VzJywgZnVuY3Rpb24oY29udGFpbmVyKSB7IFxuXHRcdGNvbnRhaW5lclsnU2VydmljZXMnXS5ib290ZWQgPSB0cnVlO1xuXHRcdHJldHVybiBuZXcgU2VydmljZXMoY29udGFpbmVyKTtcblx0fSk7XG5cblx0dGhpcy5jb250YWluZXIuYmluZCgnUHJvZHVjdHMnLCBmdW5jdGlvbihjb250YWluZXIpIHtcblx0XHRjb250YWluZXJbJ1Byb2R1Y3RzJ10uYm9vdGVkID0gdHJ1ZTtcblx0XHRyZXR1cm4gbmV3IFByb2R1Y3RzKGNvbnRhaW5lcik7XG5cdH0pO1xuXG5cdHRoaXMuY29udGFpbmVyLmJpbmQoJ1BhZ2luYXRpb24nLCBmdW5jdGlvbihjb250YWluZXIpIHtcblx0XHRjb250YWluZXJbJ1BhZ2luYXRpb24nXS5ib290ZWQgPSB0cnVlO1xuXHRcdHJldHVybiBuZXcgUGFnaW5hdGlvbihjb250YWluZXIsIGNvbnRhaW5lci5tYWtlKCdQcm9kdWN0cycpKTtcblx0fSk7XG5cblx0dGhpcy5jb250YWluZXIuYmluZCgnQ2FydCcsIGZ1bmN0aW9uKGNvbnRhaW5lcikge1xuXHRcdGNvbnRhaW5lclsnQ2FydCddLmJvb3RlZCA9IHRydWU7XG5cdFx0cmV0dXJuIG5ldyBDYXJ0KGNvbnRhaW5lcik7XG5cdH0pO1xuXG5cdHRoaXMuY29udGFpbmVyWydGaWx0ZXInXVsnYm9vdGVkJ10gPSBmYWxzZTtcblx0dGhpcy5jb250YWluZXJbJ1NlcnZpY2VzJ11bJ2Jvb3RlZCddID0gZmFsc2U7XG5cdHRoaXMuY29udGFpbmVyWydQcm9kdWN0cyddWydib290ZWQnXSA9IGZhbHNlO1xuXHR0aGlzLmNvbnRhaW5lclsnUGFnaW5hdGlvbiddWydib290ZWQnXSA9IGZhbHNlO1xuXHR0aGlzLmNvbnRhaW5lclsnQ2FydCddWydib290ZWQnXSA9IGZhbHNlO1xufVxuXG5yZXR1cm4gZUNvbW1lcmNlO1xuXG59KCkpO1xuIl19
