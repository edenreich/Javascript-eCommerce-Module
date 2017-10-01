'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var eCommerce = function () {
	'use strict';

	var InvalidArgumentException$1 = function InvalidArgumentException$1() {
		_classCallCheck(this, InvalidArgumentException$1);

		console.error(this.constructor.name + ', passing invalid arguments.');

		throw new Error();
	};

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
				if (element == null) {
					throw new InvalidArgumentException$1();
				}

				if (className == '' || typeof className == 'undefined') {
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
				var element = queryElement(selector);
				return element;
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

				if (options.hasOwnProperty('class')) {
					element.className = options.class;
				}

				if (options.hasOwnProperty('id')) {
					element.setAttribute('id', options.id);
				}

				return element;
			}
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
		}]);

		return DOM;
	}();

	/**
  * Queries an element from the DOM.
  */


	function queryElement(selector) {
		var element = document.querySelectorAll(selector) || null;

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
		}]);

		return Common;
	}();

	var InvalidBindingException = function InvalidBindingException() {
		_classCallCheck(this, InvalidBindingException);

		console.error(this.constructor.name + ', trying to bind an already existing bound.');

		throw new Error();
	};

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
				} else {
					instance = new this[object]();
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

	var ComponentsException = function ComponentsException() {
		_classCallCheck(this, ComponentsException);

		console.error(this.constructor.name + ', expecting for at least one components, but none was given, \n\t\t\t\t\t\t\t\tplease add at least one requirement(Products, Services or/and Filter');

		throw new Error();
	};

	var BadEventCallException$1 = function BadEventCallException$1() {
		_classCallCheck(this, BadEventCallException$1);

		console.error(this.constructor.name + ', listening to a none-existing event');

		throw new Error();
	};

	var ComponentNotRegisteredException = function ComponentNotRegisteredException() {
		_classCallCheck(this, ComponentNotRegisteredException);

		console.error(this.constructor.name + ', components must be registered in order to use them');

		throw new Error();
	};

	var ExceptionHandler = function () {
		function ExceptionHandler() {
			_classCallCheck(this, ExceptionHandler);
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
					} else {
						return false;
					}

					return true;
				};
			}
		}]);

		return ExceptionHandler;
	}();

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
   * Initalize the Container and the paginator.
   */
		function Products(container, paginator) {
			_classCallCheck(this, Products);

			this.setup(defaultSettings$2);

			Container$2 = container;
			this.paginator = paginator;
		}

		/**
   * Sets the given settings from the user.
   */


		_createClass(Products, [{
			key: 'setup',
			value: function setup(settings) {
				if ((typeof settings === 'undefined' ? 'undefined' : _typeof(settings)) != 'object') {
					throw new InvalidArgumentException$1();
				}

				this.settings = Common.extend(defaultSettings$2, settings);

				this.setElement(this.settings.element);

				this.addStyleTag();

				if (typeof Container$2 == 'undefined') {
					return;
				}

				if (Container$2.instanceExist('Pagination')) {
					this.paginator.reset();
					var request = this.getProductsByPage(this.paginator.getCurrent());

					request.then(function (items) {
						this.replaceItems(items);
					}.bind(this)).catch(function (error) {});
				}
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
				if (!Array.isArray(items) || typeof items[0] == 'string') {
					throw new InvalidArgumentException$1();
				}

				if (Container$2.instanceExist('Pagination')) {
					var perPage = this.paginator.settings.per_page;
					items = items.slice(0, perPage);
				}

				var wrappedItems = this.wrapAllWithHTML(items, this.settings.item_class, 'div');

				this.wrapper.innerHTML = wrappedItems;

				return items;
			}

			/**
    * Makes an Ajax call to the server.
    */

		}, {
			key: 'getProductsByPage',
			value: function getProductsByPage(pageNumber) {
				return new Promise(function (resolve, reject) {
					if (this.paginator.notInPageRange(pageNumber)) {
						return reject('Not in pagination range');
					}

					var xhr = new XMLHttpRequest() || new ActiveXObject("Microsoft.XMLHTTP");

					xhr.open('GET', this.settings.url + '?page=' + pageNumber, true);
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
    * Wrap all the items with specifc tag and classname.
    */

		}, {
			key: 'wrapAllWithHTML',
			value: function wrapAllWithHTML(items, className, tagType) {
				className = className || null;

				var wrappedItems = '';

				items = items.map(function (product, index) {
					var item = document.createElement(tagType);
					item = DOM.addClass(item, 'product');
					item = DOM.addClass(item, className);

					var overlay = document.createElement('div');
					overlay = DOM.addClass(overlay, 'product-overlay');
					item.appendChild(overlay);

					for (var prop in product) {
						if (this.settings.attributes.indexOf(prop) == -1) {
							continue;
						}

						var tag = document.createElement(tagType);

						if (prop == 'image') {
							var image = document.createElement('img');
							image.setAttribute('src', product[prop]);
							item.appendChild(image);
						} else {
							tag.innerHTML = product[prop] || '';
						}

						tag.className = 'product-' + Common.kebabCase(prop);
						overlay.appendChild(tag);
					}

					var temp = document.createElement(tagType);
					temp.appendChild(item);

					wrappedItems += temp.innerHTML + "\n";

					return product;
				}.bind(this));

				return wrappedItems;
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

				var css = '\n\t\t\t.product {\n\t\t\t\tposition: relative;\n\t\t\t\tmargin: 5px 5px;\n\t\t\t\tborder: 1px solid #e4e4e4;\n\t\t\t\twidth: ' + this.settings.width + ';\n\t\t\t\theight: ' + this.settings.height + ';\n\t\t\t\tcursor: pointer;\n\t\t\t\tcolor: #ffffff;\n\t\t\t\toverflow: hidden;\n\t\t\t}\n\n\t\t\t.product > .product-overlay {\n\t\t\t\tposition: absolute;\n\t\t\t\ttop: 0;\n\t\t\t\tleft: 0;\n\t\t\t\twidth: 100%;\n\t\t\t\theight: 100%;\n\t\t\t\topacity: 0.5;\n\t\t\t\tz-index: 5;\n\t\t\t\ttransition: 1s all;\n\t\t\t\ttransform: translateX(-250px);\n\t\t\t}\n\n\t\t\t.product:hover > .product-overlay {\n\t\t\t\tbackground: rgba(0, 0, 0, 0.45);\n\t\t\t\ttransform: translateX(0px);\n\t\t\t\topacity: 1;\n\t\t\t\ttransition: 1s all;\n\t\t\t}\n\n\t\t\t.product > img {\n\t\t\t\tposition: absolute;\n\t\t\t\tleft: 0;\n\t\t\t\ttop: 0;\n\t\t\t\twidth: 100%;\n\t\t\t\theight: 100%;\n\t\t\t}\n\n\t\t\t.product > .product-image {\n\t\t\t\tz-index: 0;\n\t\t\t\tposition: absolute;\n\t\t\t\ttop: 0;\n\t\t\t\tleft: 0;\n\t\t\t}\n\n\t\t\t.product > .product-overlay > .product-name, \n\t\t\t.product > .product-overlay > .product-price,\n\t\t\t.product > .product-overlay > .product-delivery-time {\n\t\t\t\tz-index: 1;\n\t\t\t\tposition: relative;\n\t\t\t\ttext-align: center;\n\t\t\t\tmargin-top: 25px;\n\t\t\t}\n\t\t';

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
  * The Pagination Object, handles the pagination.
  */

	var Pagination = function () {
		/**
   * Initialize the container object and the default settings.
   */
		function Pagination(container) {
			_classCallCheck(this, Pagination);

			Container$3 = container;
			this.setup(defaultSettings$3);
		}

		/**
   * Set the Pagination object up.
   */


		_createClass(Pagination, [{
			key: 'setup',
			value: function setup(settings) {
				if ((typeof settings === 'undefined' ? 'undefined' : _typeof(settings)) != 'object') {
					throw new InvalidArgumentException$1();
				}

				this.settings = Common.extend(defaultSettings$3, settings);

				this.totalPages = this.calculateTotalPages(this.settings.per_page, this.settings.total_items);

				this.setElement(this.settings.element);
				this.replaceLinks(this.links);
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
				var Products = Container$3.getInstance('Products');

				this.next.childNodes[0].onclick = function (event) {
					event.preventDefault();

					Products.getProductsByPage(instance.current + 1).then(function (products) {
						Products.replaceItems(products);
					});

					instance.setCurrent(instance.current + 1);
				};

				this.previous.childNodes[0].onclick = function (event) {
					event.preventDefault();

					Products.getProductsByPage(instance.current - 1).then(function (products) {
						Products.replaceItems(products);
					});

					instance.setCurrent(instance.current - 1);
				};

				for (var i = 0; i < this.pages.length; i++) {
					this.pages[i].childNodes[0].onclick = function (event) {
						event.preventDefault();
						var pageNumber = this.getAttribute('data-page-nr');

						Products.getProductsByPage(pageNumber).then(function (products) {
							Products.replaceItems(products);
						});

						instance.setCurrent(pageNumber);
					};
				}
			}

			/**
    * Sets the current page.
    */

		}, {
			key: 'setCurrent',
			value: function setCurrent(pageNumber) {
				if (this.notInPageRange(pageNumber)) {
					return;
				}

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
		components: ['Products', 'Services', 'Filter', 'Pagination']
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
				return target.container.make(object);
			}
		});
	};

	/**
  * Binds components dependencies.
  */


	function bindComponentsDependencies(components) {
		this.container.bind('Filter', function (container) {
			return new Filter(container);
		});

		this.container.bind('Services', function (container) {
			return new Services(container);
		});

		this.container.bind('Pagination', function (container) {
			return new Pagination(container);
		});

		this.container.bind('Products', function (container) {
			return new Products(container, container.make('Pagination'));
		});

		this.container.bind('Cart', function (container) {
			return new Cart(container);
		});
	}

	return eCommerce;
}();
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVDb21tZXJjZS5qcyJdLCJuYW1lcyI6WyJlQ29tbWVyY2UiLCJJbnZhbGlkQXJndW1lbnRFeGNlcHRpb24kMSIsImNvbnNvbGUiLCJlcnJvciIsImNvbnN0cnVjdG9yIiwibmFtZSIsIkVycm9yIiwiRE9NIiwic3RyaW5nIiwicmVwbGFjZSIsImVsZW1lbnQiLCJjbGFzc05hbWUiLCJuZXdDbGFzc05hbWUiLCJyZW1vdmVDbGFzcyIsImFkZENsYXNzIiwiY2xhc3NOYW1lcyIsInNwbGl0IiwiZm9yRWFjaCIsImNsYXNzTGlzdCIsImFkZCIsInJlbW92ZSIsInNlbGVjdG9yIiwicXVlcnlFbGVtZW50IiwiaWQiLCJjc3MiLCJoZWFkIiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50c0J5VGFnTmFtZSIsInN0eWxlVGFnIiwiY3JlYXRlRWxlbWVudCIsIkNTUyIsIm1pbmlmeUNzcyIsImlubmVySFRNTCIsInNldEF0dHJpYnV0ZSIsImFwcGVuZENoaWxkIiwiZWxlbWVudFR5cGUiLCJvcHRpb25zIiwiaGFzT3duUHJvcGVydHkiLCJjbGFzcyIsInNlY29uZENsYXNzTmFtZSIsInVuZGVmaW5lZCIsInRvZ2dsZSIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJsZW5ndGgiLCJFdmVudCIsImNhbGxiYWNrIiwiSW52YWxpZEFyZ3VtZW50RXhjZXB0aW9uIiwiZXZlbnRzIiwiZGF0YSIsIkJhZEV2ZW50Q2FsbEV4Y2VwdGlvbiIsIkFycmF5IiwiQ29tbW9uIiwiY3VycmVudE9iaiIsIm5ld09iaiIsImV4dGVuZGVkIiwicHJvcCIsIk9iamVjdCIsInByb3RvdHlwZSIsImNhbGwiLCJuZWVkbGUiLCJoeXN0YWNrIiwiaSIsIm9iamVjdCIsInRvTG93ZXJDYXNlIiwiSW52YWxpZEJpbmRpbmdFeGNlcHRpb24iLCJpbnN0YW5jZXMiLCJDb250YWluZXIiLCJrZXkiLCJjb25jcmV0ZSIsImJpbmQiLCJpbnN0YW5jZSIsImluc3RhbmNlRXhpc3QiLCJnZXRJbnN0YW5jZSIsInNldEluc3RhbmNlIiwiQ29tcG9uZW50c0V4Y2VwdGlvbiIsIkJhZEV2ZW50Q2FsbEV4Y2VwdGlvbiQxIiwiQ29tcG9uZW50Tm90UmVnaXN0ZXJlZEV4Y2VwdGlvbiIsIkV4Y2VwdGlvbkhhbmRsZXIiLCJ3aW5kb3ciLCJvbmVycm9yIiwibWVzc2FnZSIsInNvdXJjZSIsImxpbmVubyIsImNvbG5vIiwiZGVmYXVsdFNldHRpbmdzJDEiLCJ3aWR0aCIsImhlaWdodCIsIkZpbHRlciIsImNvbnRhaW5lciIsInNldHVwIiwic2V0dGluZ3MiLCJleHRlbmQiLCJzZXRFbGVtZW50Iiwid3JhcHBlciIsImRlZmF1bHRTZXR0aW5ncyQyIiwiaXRlbV9jbGFzcyIsImF0dHJpYnV0ZXMiLCJ1cmwiLCJDb250YWluZXIkMiIsIlByb2R1Y3RzIiwicGFnaW5hdG9yIiwiYWRkU3R5bGVUYWciLCJyZXNldCIsInJlcXVlc3QiLCJnZXRQcm9kdWN0c0J5UGFnZSIsImdldEN1cnJlbnQiLCJ0aGVuIiwiaXRlbXMiLCJyZXBsYWNlSXRlbXMiLCJjYXRjaCIsImlzQXJyYXkiLCJwZXJQYWdlIiwicGVyX3BhZ2UiLCJzbGljZSIsIndyYXBwZWRJdGVtcyIsIndyYXBBbGxXaXRoSFRNTCIsInBhZ2VOdW1iZXIiLCJQcm9taXNlIiwicmVzb2x2ZSIsInJlamVjdCIsIm5vdEluUGFnZVJhbmdlIiwieGhyIiwiWE1MSHR0cFJlcXVlc3QiLCJBY3RpdmVYT2JqZWN0Iiwib3BlbiIsInNldFJlcXVlc3RIZWFkZXIiLCJvbnJlYWR5c3RhdGVjaGFuZ2UiLCJyZWFkeVN0YXRlIiwic3RhdHVzIiwiY3VycmVudEl0ZW1zIiwicmVzcG9uc2VUZXh0IiwiSlNPTiIsInBhcnNlIiwicHJvZHVjdCIsIkFmdGVyTG9hZGVkIiwic3RhdHVzVGV4dCIsInNlbmQiLCJ0YWdUeXBlIiwibWFwIiwiaW5kZXgiLCJpdGVtIiwib3ZlcmxheSIsImluZGV4T2YiLCJ0YWciLCJpbWFnZSIsImtlYmFiQ2FzZSIsInRlbXAiLCJhZGRTdHlsZSIsIlNlcnZpY2VzIiwiZGVmYXVsdFNldHRpbmdzJDMiLCJ0b3RhbF9pdGVtcyIsIkNvbnRhaW5lciQzIiwiUGFnaW5hdGlvbiIsInRvdGFsUGFnZXMiLCJjYWxjdWxhdGVUb3RhbFBhZ2VzIiwicmVwbGFjZUxpbmtzIiwibGlua3MiLCJjcmVhdGVMaW5rcyIsImJpbmRFdmVudExpc3RlbmVycyIsInRvdGFsSXRlbXMiLCJwYXJzZUludCIsIk1hdGgiLCJjZWlsIiwibmV4dCIsImNoaWxkTm9kZXMiLCJvbmNsaWNrIiwiZXZlbnQiLCJwcmV2ZW50RGVmYXVsdCIsImN1cnJlbnQiLCJwcm9kdWN0cyIsInNldEN1cnJlbnQiLCJwcmV2aW91cyIsInBhZ2VzIiwiZ2V0QXR0cmlidXRlIiwiY2hhbmdlVXJsIiwidWwiLCJjcmVhdGVQYWdlTGlua3MiLCJjcmVhdGVQcmV2aW91c0J1dHRvbiIsImNyZWF0ZU5leHRCdXR0b24iLCJwYWdlIiwicGFnZUl0ZW0iLCJsaW5rIiwicHVzaCIsImxpIiwic3BhbjEiLCJzcGFuMiIsImlzTmFOIiwiR0VUX1ZhcnMiLCJoaXN0b3J5IiwicmVwbGFjZVN0YXRlIiwidXBkYXRlVVJMUGFyYW1ldGVyIiwibG9jYXRpb24iLCJocmVmIiwidmFycyIsInBhcnRzIiwibSIsInZhbHVlIiwicGFyYW0iLCJwYXJhbVZhbCIsIm5ld0FkZGl0aW9uYWxVUkwiLCJ0ZW1wQXJyYXkiLCJiYXNlVVJMIiwiYWRkaXRpb25hbFVSTCIsInJvd3NUZXh0IiwiZGVmYXVsdFNldHRpbmdzJDQiLCJwcmV2aWV3X2NsYXNzIiwicGxhY2VtZW50IiwiZml4ZWQiLCJob3Zlcl9jb2xvciIsIkNvbnRhaW5lciQ0IiwiQ2FydCIsInByZXZpZXdFbGVtZW50IiwiY3JlYXRlUHJldmlld0VsZW1lbnQiLCJzdmdJY29uIiwiY3JlYXRlSWNvbiIsImljb24iLCJwb3NpdGlvbiIsInRvZ2dsZUNsYXNzIiwib25tb3VzZW91dCIsImNsb3NlIiwic3dpdGNoQ2xhc3NlcyIsInN2ZyIsImNyZWF0ZUVsZW1lbnROUyIsImciLCJwYXRoIiwiaW5pdGFsaXplZCIsImRlZmF1bHRTZXR0aW5ncyIsImltcG9ydEJvb3RzdHJhcCIsImNvbXBvbmVudHMiLCJpbml0YWxpemUiLCJiaW5kQ29tcG9uZW50c0RlcGVuZGVuY2llcyIsIlByb3h5IiwiZ2V0IiwidGFyZ2V0IiwibWFrZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLElBQUlBLFlBQWEsWUFBWTtBQUM3Qjs7QUFENkIsS0FHdkJDLDBCQUh1QixHQUs1QixzQ0FDQTtBQUFBOztBQUNJQyxVQUFRQyxLQUFSLENBQWlCLEtBQUtDLFdBQUwsQ0FBaUJDLElBQWxDOztBQUVBLFFBQU0sSUFBSUMsS0FBSixFQUFOO0FBQ0EsRUFWd0I7O0FBQUEsS0FhdkJDLEdBYnVCO0FBQUE7QUFBQTtBQUFBOztBQUFBO0FBQUE7O0FBZTVCOzs7QUFmNEIsNkJBa0JYQyxNQWxCVyxFQW1CNUI7QUFDSUEsYUFBU0EsT0FBT0MsT0FBUCxDQUFlLHdDQUFmLEVBQXlELEVBQXpELENBQVQ7QUFDQUQsYUFBU0EsT0FBT0MsT0FBUCxDQUFlLFFBQWYsRUFBeUIsR0FBekIsQ0FBVDtBQUNBRCxhQUFTQSxPQUFPQyxPQUFQLENBQWUsVUFBZixFQUEyQixJQUEzQixDQUFUO0FBQ0FELGFBQVNBLE9BQU9DLE9BQVAsQ0FBZSxVQUFmLEVBQTJCLElBQTNCLENBQVQ7QUFDQUQsYUFBU0EsT0FBT0MsT0FBUCxDQUFlLEtBQWYsRUFBc0IsR0FBdEIsQ0FBVDs7QUFFQSxXQUFPRCxNQUFQO0FBQ0g7O0FBRUQ7Ozs7QUE3QjRCO0FBQUE7QUFBQSxpQ0FnQ1BFLE9BaENPLEVBZ0NFQyxTQWhDRixFQWdDYUMsWUFoQ2IsRUFpQzVCO0FBQ0MsU0FBS0MsV0FBTCxDQUFpQkgsT0FBakIsRUFBMEJDLFNBQTFCO0FBQ0EsU0FBS0csUUFBTCxDQUFjSixPQUFkLEVBQXVCRSxZQUF2QjtBQUNBOztBQUVEOzs7O0FBdEM0QjtBQUFBO0FBQUEsNEJBeUNaRixPQXpDWSxFQXlDSEMsU0F6Q0csRUEwQzVCO0FBQ0MsUUFBR0QsV0FBVyxJQUFk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OiJlQ29tbWVyY2UuanMiLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgZUNvbW1lcmNlID0gKGZ1bmN0aW9uICgpIHtcbid1c2Ugc3RyaWN0JztcblxuY2xhc3MgSW52YWxpZEFyZ3VtZW50RXhjZXB0aW9uJDFcclxue1xyXG5cdGNvbnN0cnVjdG9yKCkgXHJcblx0eyBcclxuICAgIFx0Y29uc29sZS5lcnJvcihgJHt0aGlzLmNvbnN0cnVjdG9yLm5hbWV9LCBwYXNzaW5nIGludmFsaWQgYXJndW1lbnRzLmApO1xyXG5cclxuICAgIFx0dGhyb3cgbmV3IEVycm9yO1xyXG4gICAgfVxyXG59XG5cbmNsYXNzIERPTVxyXG57XHJcblx0LyoqXHJcblx0ICogTWluaWZpZXMgdGhlIGNzcyB0ZXh0LlxyXG5cdCAqL1xyXG5cdHN0YXRpYyBtaW5pZnlDc3Moc3RyaW5nKSBcclxuXHR7XHJcblx0ICAgIHN0cmluZyA9IHN0cmluZy5yZXBsYWNlKC9cXC9cXCooPzooPyFcXCpcXC8pW1xcc1xcU10pKlxcKlxcL3xbXFxyXFxuXFx0XSsvZywgJycpO1xyXG5cdCAgICBzdHJpbmcgPSBzdHJpbmcucmVwbGFjZSgvIHsyLH0vZywgJyAnKTtcclxuXHQgICAgc3RyaW5nID0gc3RyaW5nLnJlcGxhY2UoLyhbezp9XSkvZywgJyQxJyk7XHJcblx0ICAgIHN0cmluZyA9IHN0cmluZy5yZXBsYWNlKC8oWzssXSkgL2csICckMScpO1xyXG5cdCAgICBzdHJpbmcgPSBzdHJpbmcucmVwbGFjZSgvICEvZywgJyEnKTtcclxuXHQgICAgXHJcblx0ICAgIHJldHVybiBzdHJpbmc7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBTd2l0Y2hlcyBiZXR3ZWVuIHR3byBnaXZlbiBjbGFzc2VzLlxyXG5cdCAqL1xyXG5cdHN0YXRpYyBzd2l0Y2hDbGFzc2VzKGVsZW1lbnQsIGNsYXNzTmFtZSwgbmV3Q2xhc3NOYW1lKSBcclxuXHR7XHJcblx0XHR0aGlzLnJlbW92ZUNsYXNzKGVsZW1lbnQsIGNsYXNzTmFtZSk7XHJcblx0XHR0aGlzLmFkZENsYXNzKGVsZW1lbnQsIG5ld0NsYXNzTmFtZSk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBBZGRzIGNsYXNzIHRvIGEgZ2l2ZW4gZWxlbWVudC5cclxuXHQgKi9cclxuXHRzdGF0aWMgYWRkQ2xhc3MoZWxlbWVudCwgY2xhc3NOYW1lKSBcclxuXHR7XHJcblx0XHRpZihlbGVtZW50ID09IG51bGwpIHtcclxuXHRcdFx0dGhyb3cgbmV3IEludmFsaWRBcmd1bWVudEV4Y2VwdGlvbiQxO1xyXG5cdFx0fVxyXG5cclxuXHRcdGlmKGNsYXNzTmFtZSA9PSAnJyB8fCB0eXBlb2YgY2xhc3NOYW1lID09ICd1bmRlZmluZWQnKSB7XHJcblx0XHRcdHJldHVybiBlbGVtZW50O1xyXG5cdFx0fVxyXG5cclxuXHRcdGxldCBjbGFzc05hbWVzID0gY2xhc3NOYW1lLnNwbGl0KCcgJyk7XHJcblxyXG5cdFx0Y2xhc3NOYW1lcy5mb3JFYWNoKGZ1bmN0aW9uKG5hbWUpIHtcclxuXHRcdFx0ZWxlbWVudC5jbGFzc0xpc3QuYWRkKG5hbWUpO1xyXG5cdFx0fSk7XHJcblx0XHRcclxuXHRcdHJldHVybiBlbGVtZW50O1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogUmVtb3ZlcyBjbGFzcyBmcm9tIGEgZ2l2ZW4gZWxlbWVudC5cclxuXHQgKi9cclxuXHRzdGF0aWMgcmVtb3ZlQ2xhc3MoZWxlbWVudCwgY2xhc3NOYW1lKSBcclxuXHR7XHJcblx0XHRpZihlbGVtZW50ID09IG51bGwpIHtcclxuXHRcdFx0dGhyb3cgbmV3IEludmFsaWRBcmd1bWVudEV4Y2VwdGlvbiQxO1xyXG5cdFx0fVxyXG5cclxuXHRcdGlmKGNsYXNzTmFtZSA9PSAnJykge1xyXG5cdFx0XHRlbGVtZW50LmNsYXNzTmFtZSA9ICcnO1xyXG5cdFx0fSBlbHNlIHtcclxuXHJcblx0XHRcdGxldCBjbGFzc05hbWVzID0gY2xhc3NOYW1lLnNwbGl0KCcgJyk7XHJcblxyXG5cdFx0XHRjbGFzc05hbWVzLmZvckVhY2goZnVuY3Rpb24obmFtZSkge1xyXG5cdFx0XHRcdGVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShuYW1lKTtcclxuXHRcdFx0fSk7XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIGVsZW1lbnQ7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBRdWVyaWVzIHRoZSBlbGVtZW50IGZyb20gdGhlIERPTS5cclxuXHQgKi9cclxuXHRzdGF0aWMgZWxlbWVudChzZWxlY3RvcikgXHJcblx0e1xyXG5cdFx0bGV0IGVsZW1lbnQgPSBxdWVyeUVsZW1lbnQoc2VsZWN0b3IpO1xyXG5cdFx0cmV0dXJuIGVsZW1lbnQ7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBBZGRzIHN0eWxlIHRhZyB3aXRoIGdpdmVuIGlkIGFuZCBjc3MgdG8gdGhlIERPTS5cclxuXHQgKi9cclxuXHRzdGF0aWMgYWRkU3R5bGUoaWQsIGNzcykgXHJcblx0e1xyXG5cdFx0aWYodHlwZW9mIGNzcyAhPSAnc3RyaW5nJykge1xyXG5cdFx0XHR0aHJvdyBuZXcgSW52YWxpZEFyZ3VtZW50RXhjZXB0aW9uJDE7XHJcblx0XHR9XHJcblxyXG5cdFx0bGV0IGhlYWQgPSBkb2N1bWVudC5oZWFkIHx8IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdoZWFkJylbMF07XHJcblx0XHRsZXQgc3R5bGVUYWcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzdHlsZScpO1xyXG5cclxuXHRcdC8vIHBpcGUgaXQgdGhyb3VnaCB0aGUgbWluZmllclxyXG5cdCAgICBsZXQgQ1NTID0gdGhpcy5taW5pZnlDc3MoY3NzKTtcclxuXHQgICAgLy8gYWRkaW5nIGl0IHRvIHRoZSBzdHlsZXRhZ1xyXG5cdCAgICBzdHlsZVRhZy5pbm5lckhUTUwgPSBDU1M7XHJcblx0ICAgIC8vIGdpdmUgYW4gaWQgdG8gcmVjb2duaXplIHRoZSBzdHlsZSB0YWdcclxuXHRcdHN0eWxlVGFnLnNldEF0dHJpYnV0ZSgnaWQnLCBpZCk7XHJcblx0XHQvLyBhcHBlbmRpbmcgdGhhdCBzdHlsZSB0YWcgdG8gdGhlIERPTSBoZWFkIHRhZ1xyXG5cdFx0aGVhZC5hcHBlbmRDaGlsZChzdHlsZVRhZyk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBDcmVhdGVzIGFuIGVsZW1lbnQgd2l0aCB0aGUgZ2l2ZW4gb3B0aW9ucy5cclxuXHQgKi9cclxuXHRzdGF0aWMgY3JlYXRlRWxlbWVudChlbGVtZW50VHlwZSwgb3B0aW9ucylcclxuXHR7XHJcblx0XHRsZXQgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoZWxlbWVudFR5cGUpO1xyXG5cdFxyXG5cdFx0aWYgKG9wdGlvbnMuaGFzT3duUHJvcGVydHkoJ2NsYXNzJykpIHtcclxuXHRcdFx0ZWxlbWVudC5jbGFzc05hbWUgPSBvcHRpb25zLmNsYXNzO1xyXG5cdFx0fVxyXG5cclxuXHRcdGlmIChvcHRpb25zLmhhc093blByb3BlcnR5KCdpZCcpKSB7XHJcblx0XHRcdGVsZW1lbnQuc2V0QXR0cmlidXRlKCdpZCcsIG9wdGlvbnMuaWQpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiBlbGVtZW50O1xyXG5cdH1cclxuXHJcblx0c3RhdGljIHRvZ2dsZUNsYXNzKGVsZW1lbnQsIGNsYXNzTmFtZSwgc2Vjb25kQ2xhc3NOYW1lKVxyXG5cdHtcclxuXHRcdGlmKGVsZW1lbnQgPT0gbnVsbCB8fCB0eXBlb2YgZWxlbWVudCA9PSAndW5kZWZpbmVkJykge1xyXG5cdFx0XHR0aHJvdyBuZXcgSW52YWxpZEFyZ3VtZW50RXhjZXB0aW9uJDE7XHJcblx0XHR9XHJcblxyXG5cdFx0c2Vjb25kQ2xhc3NOYW1lID0gc2Vjb25kQ2xhc3NOYW1lIHx8IHVuZGVmaW5lZDtcclxuXHJcblx0XHRlbGVtZW50LmNsYXNzTGlzdC50b2dnbGUoY2xhc3NOYW1lKTtcclxuXHJcblx0XHRpZihzZWNvbmRDbGFzc05hbWUpIHtcclxuXHRcdFx0ZWxlbWVudC5jbGFzc0xpc3QudG9nZ2xlKHNlY29uZENsYXNzTmFtZSk7XHJcblx0XHR9XHJcblx0fVxyXG59XHJcblxyXG4vKipcclxuICogUXVlcmllcyBhbiBlbGVtZW50IGZyb20gdGhlIERPTS5cclxuICovXHJcbmZ1bmN0aW9uIHF1ZXJ5RWxlbWVudChzZWxlY3Rvcikge1xyXG5cdGxldCBlbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChzZWxlY3RvcikgfHwgbnVsbDtcclxuXHJcblx0aWYoZWxlbWVudC5sZW5ndGggPT0gMCkge1xyXG5cdFx0cmV0dXJuIG51bGw7XHJcblx0fVxyXG5cclxuXHRyZXR1cm4gKGVsZW1lbnQubGVuZ3RoID4gMSkgPyBlbGVtZW50IDogZWxlbWVudFswXTtcclxufVxuXG5jbGFzcyBFdmVudFxyXG57XHJcblx0LyoqXHJcblx0ICogTGlzdGVuIHRvIGFuIGV2ZW50LlxyXG5cdCAqL1xyXG5cdHN0YXRpYyBsaXN0ZW4obmFtZSwgY2FsbGJhY2spIHtcclxuXHRcdGlmICh0eXBlb2YgY2FsbGJhY2sgIT09ICdmdW5jdGlvbicpIHtcclxuXHRcdFx0dGhyb3cgbmV3IEludmFsaWRBcmd1bWVudEV4Y2VwdGlvbjtcclxuXHRcdH1cclxuXHJcblx0XHRldmVudHNbbmFtZV0gPSBjYWxsYmFjaztcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEZpcmVzIGFuIGV2ZW50LlxyXG5cdCAqL1xyXG5cdHN0YXRpYyB0cmlnZ2VyKG5hbWUsIGRhdGEpIHtcclxuXHRcdGRhdGEgPSBkYXRhIHx8IG51bGw7XHJcblxyXG5cdFx0aWYodHlwZW9mIGV2ZW50c1tuYW1lXSAhPT0gJ2Z1bmN0aW9uJykge1xyXG5cdFx0XHR0aHJvdyBuZXcgQmFkRXZlbnRDYWxsRXhjZXB0aW9uO1xyXG5cdFx0fVxyXG5cclxuXHRcdGlmKGRhdGEgIT0gbnVsbCAmJiBkYXRhIGluc3RhbmNlb2YgQXJyYXkpIHtcclxuXHRcclxuXHRcdFx0cmV0dXJuIGV2ZW50c1tuYW1lXSguLi5kYXRhKTtcclxuXHRcdH1cclxuXHJcblx0XHRldmVudHNbbmFtZV0oKTtcclxuXHR9XHJcbn1cblxuY2xhc3MgQ29tbW9uXHJcbntcclxuXHQvKipcclxuXHQgKiBFeHRlbmQgYW4gb2JqZWN0LlxyXG5cdCAqL1xyXG5cdHN0YXRpYyBleHRlbmQoY3VycmVudE9iaiwgbmV3T2JqICkge1xyXG5cdFx0dmFyIGV4dGVuZGVkID0ge307XHJcblx0ICAgIHZhciBwcm9wO1xyXG5cclxuXHQgICAgZm9yIChwcm9wIGluIGN1cnJlbnRPYmopIHtcclxuXHQgICAgICAgIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoY3VycmVudE9iaiwgcHJvcCkpIHtcclxuXHQgICAgICAgICAgICBleHRlbmRlZFtwcm9wXSA9IGN1cnJlbnRPYmpbcHJvcF07XHJcblx0ICAgICAgICB9XHJcblx0ICAgIH1cclxuXHJcblx0ICAgIGZvciAocHJvcCBpbiBuZXdPYmopIHtcclxuXHQgICAgICAgIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwobmV3T2JqLCBwcm9wKSkge1xyXG5cdCAgICAgICAgICAgIGV4dGVuZGVkW3Byb3BdID0gbmV3T2JqW3Byb3BdO1xyXG5cdCAgICAgICAgfVxyXG5cdCAgICB9XHJcblxyXG5cdCAgICByZXR1cm4gZXh0ZW5kZWQ7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBDaGVja3MgZm9yIGEgbmVlZGxlIGluIGh5c3RhY2suXHJcblx0ICovXHJcblx0c3RhdGljIGluX2FycmF5KG5lZWRsZSwgaHlzdGFjaykge1xyXG5cdFx0aWYoaHlzdGFjay5jb25zdHJ1Y3RvciAhPT0gQXJyYXkpIHJldHVybjtcclxuXHJcblx0XHRmb3IodmFyIGkgPSAwOyBpIDw9IGh5c3RhY2subGVuZ3RoOyBpKyspIHtcclxuXHRcdFx0aWYobmVlZGxlID09IGh5c3RhY2tbaV0pIHJldHVybiB0cnVlO1x0XHJcblx0XHR9XHJcblx0XHJcblx0XHRyZXR1cm4gZmFsc2U7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBDaGVja3MgaWYgYW4gb2JqZWN0IGlzIGVtcHR5LlxyXG5cdCAqL1xyXG5cdHN0YXRpYyBlbXB0eU9iamVjdChvYmplY3QpIHtcclxuXHRcdGZvcih2YXIgcHJvcCBpbiBvYmplY3QpIHtcclxuXHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiB0cnVlO1xyXG5cdH1cclxuXHJcblx0c3RhdGljIGNvbnRhaW5zT2JqZWN0KG9iamVjdCwgaHlzdGFjaykgXHJcblx0e1xyXG5cdCAgICB2YXIgaTtcclxuXHJcblx0ICAgIGZvciAoaSA9IDA7IGkgPCBoeXN0YWNrLmxlbmd0aDsgaSsrKSB7XHJcblx0ICAgICAgICBpZiAodHlwZW9mIG9iamVjdCA9PSAnc3RyaW5nJyAmJiBoeXN0YWNrW2ldLmNvbnN0cnVjdG9yLm5hbWUgPT09IG9iamVjdCkge1xyXG5cdCAgICAgICAgXHRyZXR1cm4gdHJ1ZTtcclxuXHQgICAgICAgIH1cclxuXHJcblx0ICAgICAgICBpZiAoaHlzdGFja1tpXSA9PT0gb2JqZWN0KSB7XHJcblx0ICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcblx0ICAgICAgICB9XHJcblx0ICAgIH1cclxuXHJcblx0ICAgIHJldHVybiBmYWxzZTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIENvbnZlcnQgY2FtZWxDYXNlIHRvIGtlYmFiLWNhc2UuXHJcblx0ICovXHJcblx0c3RhdGljIGtlYmFiQ2FzZShzdHJpbmcpIHtcclxuXHRcdHJldHVybiBzdHJpbmcucmVwbGFjZSgvKFthLXpdKShbQS1aXSkvZywgJyQxLSQyJykudG9Mb3dlckNhc2UoKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIENoZWNrcyBpZiBhIGdpdmVuIHBhcmFtZXRlciBpcyBhbiBvYmplY3QuXHJcblx0ICovXHJcblx0c3RhdGljIGlzT2JqZWN0KG9iamVjdCkge1xyXG5cdFx0cmV0dXJuIHR5cGVvZiBvYmplY3QgPT0gJ29iamVjdCc7XHJcblx0fVxyXG59XG5cbmNsYXNzIEludmFsaWRCaW5kaW5nRXhjZXB0aW9uXHJcbntcclxuXHRjb25zdHJ1Y3RvcigpIFxyXG5cdHsgXHJcbiAgICBcdGNvbnNvbGUuZXJyb3IoYCR7dGhpcy5jb25zdHJ1Y3Rvci5uYW1lfSwgdHJ5aW5nIHRvIGJpbmQgYW4gYWxyZWFkeSBleGlzdGluZyBib3VuZC5gKTtcclxuXHJcbiAgICBcdHRocm93IG5ldyBFcnJvcjtcclxuICAgIH1cclxufVxuXG5sZXQgaW5zdGFuY2VzID0gW107XHJcblxyXG5jbGFzcyBDb250YWluZXIgXHJcbntcclxuXHQvKipcclxuXHQgKiBCaW5kcyBrZXkgdG8gY29uY3JldGUgY2xhc3MuXHJcblx0ICovXHJcblx0YmluZChrZXksIGNvbmNyZXRlKSBcclxuXHR7XHJcblx0XHRpZiAodHlwZW9mIGtleSAhPSAnc3RyaW5nJyB8fCB0eXBlb2YgY29uY3JldGUgIT0gJ2Z1bmN0aW9uJykge1xyXG5cdFx0XHR0aHJvdyBuZXcgSW52YWxpZEFyZ3VtZW50RXhjZXB0aW9uJDE7XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKHR5cGVvZiB0aGlzW2tleV0gIT0gJ3VuZGVmaW5lZCcpIHtcclxuXHRcdFx0dGhyb3cgbmV3IEludmFsaWRCaW5kaW5nRXhjZXB0aW9uO1xyXG5cdFx0fVxyXG5cclxuXHRcdHRoaXNba2V5XSA9IGNvbmNyZXRlLmJpbmQoY29uY3JldGUsIHRoaXMpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogU2V0cyBhbiBpbnN0YW5jZS5cclxuXHQgKi9cclxuXHRzZXRJbnN0YW5jZShrZXksIGluc3RhbmNlKSBcclxuXHR7XHJcblx0XHRpZih0eXBlb2Yga2V5ICE9ICdzdHJpbmcnIHx8IHR5cGVvZiBpbnN0YW5jZSAhPSAnb2JqZWN0Jykge1xyXG5cdFx0XHR0aHJvdyBuZXcgSW52YWxpZEFyZ3VtZW50RXhjZXB0aW9uJDE7XHJcblx0XHR9XHJcblxyXG5cdFx0aW5zdGFuY2VzW2tleV0gPSBpbnN0YW5jZTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEdldHMgYW4gaW5zdGFuY2UuXHJcblx0ICovXHJcblx0Z2V0SW5zdGFuY2Uoa2V5KSBcclxuXHR7XHJcblx0XHRpZih0eXBlb2Yga2V5ICE9ICdzdHJpbmcnKSB7XHJcblx0XHRcdHRocm93IG5ldyBJbnZhbGlkQXJndW1lbnRFeGNlcHRpb24kMTtcclxuXHRcdH1cclxuXHJcblx0XHRpZih0eXBlb2Yga2V5ID09ICdvYmplY3QnKSB7XHJcblx0XHRcdHJldHVybiBpbnN0YW5jZXNba2V5LmNvbnN0cnVjdG9yLm5hbWVdIHx8IG51bGw7XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIGluc3RhbmNlc1trZXldIHx8IG51bGw7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBDaGVja3MgaWYgYW4gaW5zdGFuY2UgZXhpc3QuXHJcblx0ICovXHJcblx0aW5zdGFuY2VFeGlzdChpbnN0YW5jZSkgXHJcblx0e1xyXG5cdFx0aWYodHlwZW9mIGluc3RhbmNlID09ICdvYmplY3QnKSB7XHJcblx0XHRcdHJldHVybiAodHlwZW9mIGluc3RhbmNlc1tpbnN0YW5jZS5jb25zdHJ1Y3Rvci5uYW1lXSAhPT0gJ3VuZGVmaW5lZCcpO1xyXG5cdFx0fVxyXG5cdFx0XHJcblx0XHRcclxuXHRcdHJldHVybiAoaW5zdGFuY2UgaW4gaW5zdGFuY2VzKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIENyZWF0ZXMgYW4gaW5zdGFuY2UuXHJcblx0ICovXHJcblx0bWFrZShvYmplY3QpXHJcblx0e1xyXG5cdFx0bGV0IGluc3RhbmNlID0ge307XHJcblxyXG5cdFx0aWYgKHRoaXMuaW5zdGFuY2VFeGlzdChvYmplY3QpKSB7XHJcblx0XHRcdHJldHVybiB0aGlzLmdldEluc3RhbmNlKG9iamVjdCk7XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKHR5cGVvZiBvYmplY3QgPT0gJ29iamVjdCcpIHtcclxuXHRcdFx0aW5zdGFuY2UgPSBvYmplY3Q7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRpbnN0YW5jZSA9IG5ldyB0aGlzW29iamVjdF07XHRcclxuXHRcdH1cclxuXHJcblx0XHR0aGlzLnNldEluc3RhbmNlKG9iamVjdCwgaW5zdGFuY2UpOyBcclxuXHJcblx0XHRyZXR1cm4gaW5zdGFuY2U7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBSZXRyaWV2ZSBhbGwgaW5zdGFuY2VzLlxyXG5cdCAqL1xyXG5cdGluc3RhbmNlcygpIFxyXG5cdHtcclxuXHRcdHJldHVybiBpbnN0YW5jZXM7XHJcblx0fVxyXG59XG5cbmNsYXNzIENvbXBvbmVudHNFeGNlcHRpb25cclxue1xyXG5cdGNvbnN0cnVjdG9yKCkgXHJcblx0eyBcclxuICAgIFx0Y29uc29sZS5lcnJvcihgJHt0aGlzLmNvbnN0cnVjdG9yLm5hbWV9LCBleHBlY3RpbmcgZm9yIGF0IGxlYXN0IG9uZSBjb21wb25lbnRzLCBidXQgbm9uZSB3YXMgZ2l2ZW4sIFxyXG5cdFx0XHRcdFx0XHRcdFx0cGxlYXNlIGFkZCBhdCBsZWFzdCBvbmUgcmVxdWlyZW1lbnQoUHJvZHVjdHMsIFNlcnZpY2VzIG9yL2FuZCBGaWx0ZXJgKTtcclxuXHJcbiAgICBcdHRocm93IG5ldyBFcnJvcjtcclxuICAgIH1cclxufVxuXG5jbGFzcyBCYWRFdmVudENhbGxFeGNlcHRpb24kMVxyXG57XHJcblx0Y29uc3RydWN0b3IoKSBcclxuXHR7IFxyXG4gICAgXHRjb25zb2xlLmVycm9yKGAke3RoaXMuY29uc3RydWN0b3IubmFtZX0sIGxpc3RlbmluZyB0byBhIG5vbmUtZXhpc3RpbmcgZXZlbnRgKTtcclxuXHJcbiAgICBcdHRocm93IG5ldyBFcnJvcjtcclxuICAgIH1cclxufVxuXG5jbGFzcyBDb21wb25lbnROb3RSZWdpc3RlcmVkRXhjZXB0aW9uXHJcbntcclxuXHRjb25zdHJ1Y3RvcigpIFxyXG5cdHsgXHJcbiAgICBcdGNvbnNvbGUuZXJyb3IoYCR7dGhpcy5jb25zdHJ1Y3Rvci5uYW1lfSwgY29tcG9uZW50cyBtdXN0IGJlIHJlZ2lzdGVyZWQgaW4gb3JkZXIgdG8gdXNlIHRoZW1gKTtcclxuXHJcbiAgICBcdHRocm93IG5ldyBFcnJvcjtcclxuICAgIH1cclxufVxuXG5jbGFzcyBFeGNlcHRpb25IYW5kbGVyXHJcbntcclxuXHQvKipcclxuXHQgKiBIYW5kbGUgYWxsIHRoZSBlcnJvcnNcclxuXHQgKi9cclxuXHRzdGF0aWMgaW5pdGFsaXplKCkge1x0XHJcblx0XHR3aW5kb3cub25lcnJvciA9IGZ1bmN0aW9uKG1lc3NhZ2UsIHNvdXJjZSwgbGluZW5vLCBjb2xubywgZXJyb3IpIHtcclxuXHJcblx0XHRcdGlmIChlcnJvciBpbnN0YW5jZW9mIEludmFsaWRBcmd1bWVudEV4Y2VwdGlvbiQxKSB7XHJcblx0XHRcdFx0Ly8gaGFuZGxlXHJcblx0XHRcdH0gZWxzZSBpZiAoZXJyb3IgaW5zdGFuY2VvZiBJbnZhbGlkQmluZGluZ0V4Y2VwdGlvbikge1xyXG5cdFx0XHRcdC8vIGhhbmRsZVxyXG5cdFx0XHR9IGVsc2UgaWYgKGVycm9yIGluc3RhbmNlb2YgQmFkRXZlbnRDYWxsRXhjZXB0aW9uJDEpIHtcclxuXHRcdFx0XHQvLyBoYW5kbGVcclxuXHRcdFx0fSBlbHNlIGlmIChlcnJvciBpbnN0YW5jZW9mIENvbXBvbmVudHNFeGNlcHRpb24pIHtcclxuXHRcdFx0XHQvLyBoYW5kbGVcclxuXHRcdFx0fSBlbHNlIGlmIChlcnJvciBpbnN0YW5jZW9mIENvbXBvbmVudE5vdFJlZ2lzdGVyZWRFeGNlcHRpb24pIHtcclxuXHRcdFx0XHQvLyBoYW5kbGVcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHJldHVybiB0cnVlO1xyXG5cdFx0fTtcclxuXHR9XHJcbn1cblxuLyoqXHJcbiAqIFRoZSBkZWZhdWx0IHNldHRpbmdzIG9mIHRoZSBmaWx0ZXIuXHJcbiAqL1xyXG5sZXQgZGVmYXVsdFNldHRpbmdzJDEgPSB7XHJcblx0ZWxlbWVudDogJy5maWx0ZXInLFxyXG5cdGRhdGE6IHt9LFxyXG5cdGNsYXNzOiAnY29sLXhzLTInLFxyXG5cdHdpZHRoOiAnJyxcclxuXHRoZWlnaHQ6ICcnLFxyXG59O1xyXG5cclxuXHJcbi8qKlxyXG4gKiBUaGUgRmlsdGVyIE9iamVjdCwgaGFuZGxlcyB0aGUgZmlsdGVyIG9mIHRoZSBwcm9kdWN0cy9zZXJ2aWNlcy5cclxuICovXHJcbmNsYXNzIEZpbHRlciBcclxue1xyXG5cdGNvbnN0cnVjdG9yKGNvbnRhaW5lcikgXHJcblx0e1xyXG5cdFx0dGhpcy5zZXR1cChkZWZhdWx0U2V0dGluZ3MkMSk7XHJcblx0fVxyXG5cclxuXHRzZXR1cChzZXR0aW5ncylcclxuXHR7XHJcblx0XHRpZih0eXBlb2Ygc2V0dGluZ3MgIT0gJ29iamVjdCcpIHtcclxuXHRcdFx0dGhyb3cgbmV3IEludmFsaWRBcmd1bWVudEV4Y2VwdGlvbiQxO1xyXG5cdFx0fVxyXG5cclxuXHRcdHRoaXMuc2V0dGluZ3MgPSBDb21tb24uZXh0ZW5kKGRlZmF1bHRTZXR0aW5ncyQxLCBzZXR0aW5ncyk7XHJcblxyXG5cdFx0dGhpcy5zZXRFbGVtZW50KHRoaXMuc2V0dGluZ3MuZWxlbWVudCk7XHJcblx0fVxyXG5cclxuXHRzZXRFbGVtZW50KHNlbGVjdG9yKVxyXG5cdHtcclxuXHRcdHRoaXMud3JhcHBlciA9IERPTS5lbGVtZW50KHNlbGVjdG9yKTtcclxuXHRcdFxyXG5cdFx0RE9NLmFkZENsYXNzKHRoaXMud3JhcHBlciwgdGhpcy5zZXR0aW5ncy5jbGFzcyk7XHJcblx0fVxyXG59XG5cbi8qKlxyXG4gKiBUaGUgZGVmYXVsdCBzZXR0aW5ncyBvZiBlYWNoIHByb2R1Y3QuXHJcbiAqL1xyXG5sZXQgZGVmYXVsdFNldHRpbmdzJDIgPSB7XHJcblx0ZWxlbWVudDogJy5wcm9kdWN0cycsXHJcblx0Y2xhc3M6ICcnLFxyXG5cdGl0ZW1fY2xhc3M6ICcnLFxyXG5cdHdpZHRoOiAnMjAwcHgnLFxyXG5cdGhlaWdodDogJzI1MHB4JyxcclxuXHRhdHRyaWJ1dGVzOiBbJ25hbWUnLCAncHJpY2UnLCAnZGVsaXZlcnlUaW1lJywgJ2ltYWdlJ10sXHJcblx0dXJsOiAncHJvZHVjdHMucGhwJyxcclxufTtcclxuXHJcbi8qKlxyXG4gKiBTdG9yZXMgdGhlIGNvbnRhaW5lciBvYmplY3QuXHJcbiAqL1xyXG5sZXQgQ29udGFpbmVyJDI7XHJcblxyXG4vKipcclxuICogVGhlIFByb2R1Y3RzIE9iamVjdCwgaGFuZGxlcyB0aGUgcHJvZHVjdHMuXHJcbiAqL1xyXG5jbGFzcyBQcm9kdWN0cyBcclxue1xyXG5cdC8qKlxyXG5cdCAqIEluaXRhbGl6ZSB0aGUgQ29udGFpbmVyIGFuZCB0aGUgcGFnaW5hdG9yLlxyXG5cdCAqL1xyXG5cdGNvbnN0cnVjdG9yKGNvbnRhaW5lciwgcGFnaW5hdG9yKSBcclxuXHR7XHJcblx0XHR0aGlzLnNldHVwKGRlZmF1bHRTZXR0aW5ncyQyKTtcclxuXHJcblx0XHRDb250YWluZXIkMiA9IGNvbnRhaW5lcjtcclxuXHRcdHRoaXMucGFnaW5hdG9yID0gcGFnaW5hdG9yO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogU2V0cyB0aGUgZ2l2ZW4gc2V0dGluZ3MgZnJvbSB0aGUgdXNlci5cclxuXHQgKi9cclxuXHRzZXR1cChzZXR0aW5ncylcclxuXHR7XHJcblx0XHRpZiAodHlwZW9mIHNldHRpbmdzICE9ICdvYmplY3QnKSB7XHJcblx0XHRcdHRocm93IG5ldyBJbnZhbGlkQXJndW1lbnRFeGNlcHRpb24kMTtcclxuXHRcdH1cclxuXHJcblx0XHR0aGlzLnNldHRpbmdzID0gQ29tbW9uLmV4dGVuZChkZWZhdWx0U2V0dGluZ3MkMiwgc2V0dGluZ3MpO1xyXG5cclxuXHRcdHRoaXMuc2V0RWxlbWVudCh0aGlzLnNldHRpbmdzLmVsZW1lbnQpO1xyXG5cclxuXHRcdHRoaXMuYWRkU3R5bGVUYWcoKTtcdFxyXG5cdFxyXG5cdFx0aWYgKHR5cGVvZiBDb250YWluZXIkMiA9PSAndW5kZWZpbmVkJykge1xyXG5cdFx0XHRyZXR1cm47XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKENvbnRhaW5lciQyLmluc3RhbmNlRXhpc3QoJ1BhZ2luYXRpb24nKSkge1xyXG5cdFx0XHR0aGlzLnBhZ2luYXRvci5yZXNldCgpO1xyXG5cdFx0XHRsZXQgcmVxdWVzdCA9IHRoaXMuZ2V0UHJvZHVjdHNCeVBhZ2UodGhpcy5wYWdpbmF0b3IuZ2V0Q3VycmVudCgpKTtcclxuXHRcdFx0XHJcblx0XHRcdHJlcXVlc3QudGhlbihmdW5jdGlvbihpdGVtcykge1xyXG5cdFx0XHRcdHRoaXMucmVwbGFjZUl0ZW1zKGl0ZW1zKTtcclxuXHRcdFx0fS5iaW5kKHRoaXMpKS5jYXRjaChmdW5jdGlvbihlcnJvcikge1xyXG5cclxuXHRcdFx0fSk7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBTZXRzIHRoZSBET00gZWxlbWVudCBmb3IgcG9wdWxhdGluZyB0aGUgcHJvZHVjdHMuXHJcblx0ICovXHJcblx0c2V0RWxlbWVudChzZWxlY3RvcilcclxuXHR7XHJcblx0XHR0aGlzLndyYXBwZXIgPSBET00uZWxlbWVudChzZWxlY3Rvcik7XHJcblxyXG5cdFx0aWYgKHRoaXMud3JhcHBlcikge1xyXG5cdFx0XHRET00uYWRkQ2xhc3ModGhpcy53cmFwcGVyLCB0aGlzLnNldHRpbmdzLmNsYXNzKTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFJlcGxhY2UgaXRlbXMgaW4gdGhlIGNvbnRhaW5lci5cclxuXHQgKi9cclxuXHRyZXBsYWNlSXRlbXMoaXRlbXMpIFxyXG5cdHtcclxuXHRcdGlmICghIEFycmF5LmlzQXJyYXkoaXRlbXMpIHx8IHR5cGVvZiBpdGVtc1swXSA9PSAnc3RyaW5nJykge1xyXG5cdFx0XHR0aHJvdyBuZXcgSW52YWxpZEFyZ3VtZW50RXhjZXB0aW9uJDE7XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKENvbnRhaW5lciQyLmluc3RhbmNlRXhpc3QoJ1BhZ2luYXRpb24nKSkge1xyXG5cdFx0XHRsZXQgcGVyUGFnZSA9IHRoaXMucGFnaW5hdG9yLnNldHRpbmdzLnBlcl9wYWdlO1xyXG5cdFx0XHRpdGVtcyA9IGl0ZW1zLnNsaWNlKDAsIHBlclBhZ2UpO1xyXG5cdFx0fVxyXG5cclxuXHRcdGxldCB3cmFwcGVkSXRlbXMgPSB0aGlzLndyYXBBbGxXaXRoSFRNTChpdGVtcywgdGhpcy5zZXR0aW5ncy5pdGVtX2NsYXNzLCAnZGl2Jyk7XHJcblxyXG5cdFx0dGhpcy53cmFwcGVyLmlubmVySFRNTCA9IHdyYXBwZWRJdGVtcztcclxuXHJcblx0XHRyZXR1cm4gaXRlbXM7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBNYWtlcyBhbiBBamF4IGNhbGwgdG8gdGhlIHNlcnZlci5cclxuXHQgKi9cclxuXHRnZXRQcm9kdWN0c0J5UGFnZShwYWdlTnVtYmVyKSBcclxuXHR7XHJcblx0XHRyZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XHJcblx0XHRcdGlmICh0aGlzLnBhZ2luYXRvci5ub3RJblBhZ2VSYW5nZShwYWdlTnVtYmVyKSkge1xyXG5cdFx0XHRcdHJldHVybiByZWplY3QoJ05vdCBpbiBwYWdpbmF0aW9uIHJhbmdlJyk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGxldCB4aHIgPSBuZXcgWE1MSHR0cFJlcXVlc3QgfHwgbmV3IEFjdGl2ZVhPYmplY3QoXCJNaWNyb3NvZnQuWE1MSFRUUFwiKTtcclxuXHJcblx0XHRcdHhoci5vcGVuKCdHRVQnLCB0aGlzLnNldHRpbmdzLnVybCArICc/cGFnZT0nICsgcGFnZU51bWJlciwgdHJ1ZSk7IFxyXG5cdFx0XHR4aHIuc2V0UmVxdWVzdEhlYWRlcignQ29udGVudC1UeXBlJywgJ2FwcGxpY2F0aW9uL2pzb24nKTtcclxuXHRcdFx0XHJcblx0XHRcdGxldCBpbnN0YW5jZSA9IHRoaXM7XHJcblxyXG5cdFx0XHR4aHIub25yZWFkeXN0YXRlY2hhbmdlID0gZnVuY3Rpb24oKSB7XHJcblx0XHRcdFx0aWYgKHRoaXMucmVhZHlTdGF0ZSA9PSA0KSB7XHJcblx0XHRcdFx0XHRpZiAodGhpcy5zdGF0dXMgPT0gMjAwKSB7XHJcblx0XHRcdFx0XHRcdGluc3RhbmNlLmN1cnJlbnRJdGVtcyA9ICh0aGlzLnJlc3BvbnNlVGV4dCA9PSAnJykgPyBbXSA6IEpTT04ucGFyc2UodGhpcy5yZXNwb25zZVRleHQpO1xyXG5cdFx0XHRcdFx0XHJcblx0XHRcdFx0XHRcdGlmKGluc3RhbmNlLmN1cnJlbnRJdGVtcy5sZW5ndGggPT09IDApIHtcclxuXHRcdFx0XHRcdFx0XHRyZWplY3QoJ05vIEl0ZW1zIHdlcmUgcmV0cmlldmVkIScpO1xyXG5cdFx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGluc3RhbmNlLmN1cnJlbnRJdGVtcy5sZW5ndGg7IGkrKykge1xyXG5cdFx0XHRcdFx0XHRcdHZhciBwcm9kdWN0ID0gaW5zdGFuY2UuY3VycmVudEl0ZW1zW2ldO1xyXG5cdFx0XHRcdFx0XHRcdGluc3RhbmNlLkFmdGVyTG9hZGVkLmNhbGwodGhpcywgcHJvZHVjdCk7XHJcblx0XHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0XHRcdHJlc29sdmUoaW5zdGFuY2UuY3VycmVudEl0ZW1zKTtcclxuXHRcdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRcdHJlamVjdCh0aGlzLnN0YXR1c1RleHQpO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0fTtcclxuXHJcblx0XHRcdHhoci5vbmVycm9yID0gZnVuY3Rpb24oZXJyb3IpIHtcclxuXHRcdFx0XHRyZWplY3QoZXJyb3IpO1xyXG5cdFx0XHR9O1xyXG5cclxuXHRcdFx0eGhyLnNlbmQobnVsbCk7XHJcblx0XHR9LmJpbmQodGhpcykpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogV3JhcCBhbGwgdGhlIGl0ZW1zIHdpdGggc3BlY2lmYyB0YWcgYW5kIGNsYXNzbmFtZS5cclxuXHQgKi9cclxuXHR3cmFwQWxsV2l0aEhUTUwoaXRlbXMsIGNsYXNzTmFtZSwgdGFnVHlwZSkgXHJcblx0e1xyXG5cdFx0Y2xhc3NOYW1lID0gY2xhc3NOYW1lIHx8IG51bGw7XHJcblxyXG5cdFx0dmFyIHdyYXBwZWRJdGVtcyA9ICcnO1xyXG5cclxuXHRcdGl0ZW1zID0gaXRlbXMubWFwKGZ1bmN0aW9uKHByb2R1Y3QsIGluZGV4KSB7XHJcblx0XHRcdHZhciBpdGVtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCh0YWdUeXBlKTtcclxuXHRcdFx0aXRlbSA9IERPTS5hZGRDbGFzcyhpdGVtLCAncHJvZHVjdCcpO1xyXG5cdFx0XHRpdGVtID0gRE9NLmFkZENsYXNzKGl0ZW0sIGNsYXNzTmFtZSk7XHJcblx0XHRcdFxyXG5cclxuXHRcdFx0dmFyIG92ZXJsYXkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuXHRcdFx0b3ZlcmxheSA9IERPTS5hZGRDbGFzcyhvdmVybGF5LCAncHJvZHVjdC1vdmVybGF5Jyk7XHJcblx0XHRcdGl0ZW0uYXBwZW5kQ2hpbGQob3ZlcmxheSk7XHJcblxyXG5cdFx0XHRmb3IodmFyIHByb3AgaW4gcHJvZHVjdCkge1xyXG5cdFx0XHRcdGlmKHRoaXMuc2V0dGluZ3MuYXR0cmlidXRlcy5pbmRleE9mKHByb3ApID09IC0xKSB7XHJcblx0XHRcdFx0XHRjb250aW51ZTtcclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdHZhciB0YWcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KHRhZ1R5cGUpO1xyXG5cclxuXHRcdFx0XHRpZihwcm9wID09ICdpbWFnZScpIHtcclxuXHRcdFx0XHRcdHZhciBpbWFnZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ltZycpO1xyXG5cdFx0XHRcdFx0aW1hZ2Uuc2V0QXR0cmlidXRlKCdzcmMnLCBwcm9kdWN0W3Byb3BdKTtcclxuXHRcdFx0XHRcdGl0ZW0uYXBwZW5kQ2hpbGQoaW1hZ2UpO1xyXG5cdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHR0YWcuaW5uZXJIVE1MID0gcHJvZHVjdFtwcm9wXSB8fCAnJztcclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdHRhZy5jbGFzc05hbWUgPSAncHJvZHVjdC0nICsgQ29tbW9uLmtlYmFiQ2FzZShwcm9wKTtcclxuXHRcdFx0XHRvdmVybGF5LmFwcGVuZENoaWxkKHRhZyk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHZhciB0ZW1wID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCh0YWdUeXBlKTtcclxuXHRcdFx0dGVtcC5hcHBlbmRDaGlsZChpdGVtKTtcclxuXHRcdFx0XHJcblx0XHRcdHdyYXBwZWRJdGVtcyArPSB0ZW1wLmlubmVySFRNTCArIFwiXFxuXCI7XHJcblxyXG5cdFx0XHRyZXR1cm4gcHJvZHVjdDtcclxuXHRcdH0uYmluZCh0aGlzKSk7XHJcblxyXG5cdFx0cmV0dXJuIHdyYXBwZWRJdGVtcztcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEFuIGV2ZW50IGZvciB0aGUgY2xpZW50IG9mIHdoZW4gdGhlIHByb2R1Y3RzIGFzIGJlZW4gbG9hZGVkLlxyXG5cdCAqL1xyXG5cdEFmdGVyTG9hZGVkKHByb2R1Y3QpIFxyXG5cdHtcclxuXHRcdC8vXHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBBZGQgdGhlIGVDb21tZXJjZSBzdHlsZSB0YWdzIHRvIHRoZSBET00uXHJcblx0ICovXHJcblx0YWRkU3R5bGVUYWcoKSBcclxuXHR7XHJcblx0XHRpZihET00uZWxlbWVudCgnI2VDb21tZXJjZS1Qcm9kdWN0cycpKSB7XHJcblx0XHRcdHJldHVybjtcclxuXHRcdH1cclxuXHJcblx0XHRsZXQgY3NzID0gYFxyXG5cdFx0XHQucHJvZHVjdCB7XHJcblx0XHRcdFx0cG9zaXRpb246IHJlbGF0aXZlO1xyXG5cdFx0XHRcdG1hcmdpbjogNXB4IDVweDtcclxuXHRcdFx0XHRib3JkZXI6IDFweCBzb2xpZCAjZTRlNGU0O1xyXG5cdFx0XHRcdHdpZHRoOiAke3RoaXMuc2V0dGluZ3Mud2lkdGh9O1xyXG5cdFx0XHRcdGhlaWdodDogJHt0aGlzLnNldHRpbmdzLmhlaWdodH07XHJcblx0XHRcdFx0Y3Vyc29yOiBwb2ludGVyO1xyXG5cdFx0XHRcdGNvbG9yOiAjZmZmZmZmO1xyXG5cdFx0XHRcdG92ZXJmbG93OiBoaWRkZW47XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdC5wcm9kdWN0ID4gLnByb2R1Y3Qtb3ZlcmxheSB7XHJcblx0XHRcdFx0cG9zaXRpb246IGFic29sdXRlO1xyXG5cdFx0XHRcdHRvcDogMDtcclxuXHRcdFx0XHRsZWZ0OiAwO1xyXG5cdFx0XHRcdHdpZHRoOiAxMDAlO1xyXG5cdFx0XHRcdGhlaWdodDogMTAwJTtcclxuXHRcdFx0XHRvcGFjaXR5OiAwLjU7XHJcblx0XHRcdFx0ei1pbmRleDogNTtcclxuXHRcdFx0XHR0cmFuc2l0aW9uOiAxcyBhbGw7XHJcblx0XHRcdFx0dHJhbnNmb3JtOiB0cmFuc2xhdGVYKC0yNTBweCk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdC5wcm9kdWN0OmhvdmVyID4gLnByb2R1Y3Qtb3ZlcmxheSB7XHJcblx0XHRcdFx0YmFja2dyb3VuZDogcmdiYSgwLCAwLCAwLCAwLjQ1KTtcclxuXHRcdFx0XHR0cmFuc2Zvcm06IHRyYW5zbGF0ZVgoMHB4KTtcclxuXHRcdFx0XHRvcGFjaXR5OiAxO1xyXG5cdFx0XHRcdHRyYW5zaXRpb246IDFzIGFsbDtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0LnByb2R1Y3QgPiBpbWcge1xyXG5cdFx0XHRcdHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuXHRcdFx0XHRsZWZ0OiAwO1xyXG5cdFx0XHRcdHRvcDogMDtcclxuXHRcdFx0XHR3aWR0aDogMTAwJTtcclxuXHRcdFx0XHRoZWlnaHQ6IDEwMCU7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdC5wcm9kdWN0ID4gLnByb2R1Y3QtaW1hZ2Uge1xyXG5cdFx0XHRcdHotaW5kZXg6IDA7XHJcblx0XHRcdFx0cG9zaXRpb246IGFic29sdXRlO1xyXG5cdFx0XHRcdHRvcDogMDtcclxuXHRcdFx0XHRsZWZ0OiAwO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHQucHJvZHVjdCA+IC5wcm9kdWN0LW92ZXJsYXkgPiAucHJvZHVjdC1uYW1lLCBcclxuXHRcdFx0LnByb2R1Y3QgPiAucHJvZHVjdC1vdmVybGF5ID4gLnByb2R1Y3QtcHJpY2UsXHJcblx0XHRcdC5wcm9kdWN0ID4gLnByb2R1Y3Qtb3ZlcmxheSA+IC5wcm9kdWN0LWRlbGl2ZXJ5LXRpbWUge1xyXG5cdFx0XHRcdHotaW5kZXg6IDE7XHJcblx0XHRcdFx0cG9zaXRpb246IHJlbGF0aXZlO1xyXG5cdFx0XHRcdHRleHQtYWxpZ246IGNlbnRlcjtcclxuXHRcdFx0XHRtYXJnaW4tdG9wOiAyNXB4O1xyXG5cdFx0XHR9XHJcblx0XHRgO1xyXG5cdCAgICBcclxuXHQgICAgRE9NLmFkZFN0eWxlKCdlQ29tbWVyY2UtUHJvZHVjdHMnLCBjc3MpO1xyXG5cdH1cclxufVxuXG4vKipcclxuICogVGhlIFNlcnZpY2VzIE9iamVjdCwgaGFuZGxlcyB0aGUgc2VydmljZXMuXHJcbiAqL1xyXG5jbGFzcyBTZXJ2aWNlcyBcclxue1xyXG5cclxufVxuXG4vKipcclxuICogVGhlIGRlZmF1bHQgc2V0dGluZ3Mgb2YgdGhlIHBhZ2luYXRpb24uXHJcbiAqL1xyXG5sZXQgZGVmYXVsdFNldHRpbmdzJDMgPSB7XHJcblx0ZWxlbWVudDogJy5wYWdpbmF0aW9uLWxpbmtzJyxcclxuXHRjbGFzczogJ2NvbC14cy1vZmZzZXQtNCBjb2wteHMtOCcsXHJcblx0cGVyX3BhZ2U6IDUsXHJcblx0dG90YWxfaXRlbXM6IDEwLFxyXG59O1xyXG5cclxuLyoqXHJcbiAqIFN0b3JlcyB0aGUgY29udGFpbmVyIG9iamVjdC5cclxuICovXHJcbmxldCBDb250YWluZXIkMztcclxuXHJcbi8qKlxyXG4gKiBUaGUgUGFnaW5hdGlvbiBPYmplY3QsIGhhbmRsZXMgdGhlIHBhZ2luYXRpb24uXHJcbiAqL1xyXG5jbGFzcyBQYWdpbmF0aW9uIFxyXG57XHJcblx0LyoqXHJcblx0ICogSW5pdGlhbGl6ZSB0aGUgY29udGFpbmVyIG9iamVjdCBhbmQgdGhlIGRlZmF1bHQgc2V0dGluZ3MuXHJcblx0ICovXHJcblx0Y29uc3RydWN0b3IoY29udGFpbmVyKSBcclxuXHR7XHJcblx0XHRDb250YWluZXIkMyA9IGNvbnRhaW5lcjtcclxuXHRcdHRoaXMuc2V0dXAoZGVmYXVsdFNldHRpbmdzJDMpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogU2V0IHRoZSBQYWdpbmF0aW9uIG9iamVjdCB1cC5cclxuXHQgKi9cclxuXHRzZXR1cChzZXR0aW5ncylcclxuXHR7XHJcblx0XHRpZih0eXBlb2Ygc2V0dGluZ3MgIT0gJ29iamVjdCcpIHtcclxuXHRcdFx0dGhyb3cgbmV3IEludmFsaWRBcmd1bWVudEV4Y2VwdGlvbiQxO1xyXG5cdFx0fVxyXG5cclxuXHRcdHRoaXMuc2V0dGluZ3MgPSBDb21tb24uZXh0ZW5kKGRlZmF1bHRTZXR0aW5ncyQzLCBzZXR0aW5ncyk7XHJcblxyXG5cdFx0dGhpcy50b3RhbFBhZ2VzID0gdGhpcy5jYWxjdWxhdGVUb3RhbFBhZ2VzKHRoaXMuc2V0dGluZ3MucGVyX3BhZ2UsIHRoaXMuc2V0dGluZ3MudG90YWxfaXRlbXMpO1xyXG5cdFx0XHJcblx0XHR0aGlzLnNldEVsZW1lbnQodGhpcy5zZXR0aW5ncy5lbGVtZW50KTtcclxuXHRcdHRoaXMucmVwbGFjZUxpbmtzKHRoaXMubGlua3MpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogU2V0cyB0aGUgd3JhcHBlciBlbGVtZW50LlxyXG5cdCAqL1xyXG5cdHNldEVsZW1lbnQoc2VsZWN0b3IpXHJcblx0e1xyXG5cdFx0dGhpcy53cmFwcGVyID0gRE9NLmVsZW1lbnQoc2VsZWN0b3IpO1xyXG5cdFx0XHJcblx0XHRET00uYWRkQ2xhc3ModGhpcy53cmFwcGVyLCB0aGlzLnNldHRpbmdzLmNsYXNzKTtcclxuXHJcblx0XHR0aGlzLmxpbmtzID0gdGhpcy5jcmVhdGVMaW5rcygpO1xyXG5cdFx0dGhpcy5iaW5kRXZlbnRMaXN0ZW5lcnModGhpcy5saW5rcyk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBSZXBsYWNlcyB0aGUgbGlua3MgaW4gdGhlIHdyYXBwZXIuXHJcblx0ICovXHJcblx0cmVwbGFjZUxpbmtzKGxpbmtzKVxyXG5cdHtcclxuXHRcdHRoaXMud3JhcHBlci5pbm5lckhUTUwgPSAnJztcclxuXHRcdHRoaXMud3JhcHBlci5hcHBlbmRDaGlsZChsaW5rcyk7XHJcblx0fVxyXG5cclxuXHRjYWxjdWxhdGVUb3RhbFBhZ2VzKHBlclBhZ2UsIHRvdGFsSXRlbXMpXHJcblx0e1xyXG5cdFx0cGVyUGFnZSA9IHBhcnNlSW50KHBlclBhZ2UpO1xyXG5cdFx0dG90YWxJdGVtcyA9IHBhcnNlSW50KHRvdGFsSXRlbXMpO1xyXG5cclxuXHRcdHJldHVybiBNYXRoLmNlaWwodG90YWxJdGVtcyAvIHBlclBhZ2UpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQmluZHMgdGhlIGJ1dHRvbnMgZXZlbnRzIGxpc3RlbmVycy5cclxuXHQgKi9cclxuXHRiaW5kRXZlbnRMaXN0ZW5lcnMobGlua3MpIFxyXG5cdHtcclxuXHRcdGxldCBpbnN0YW5jZSA9IHRoaXM7XHJcblx0XHRsZXQgUHJvZHVjdHMgPSBDb250YWluZXIkMy5nZXRJbnN0YW5jZSgnUHJvZHVjdHMnKTtcclxuXHJcblx0XHR0aGlzLm5leHQuY2hpbGROb2Rlc1swXS5vbmNsaWNrID0gZnVuY3Rpb24oZXZlbnQpIHtcclxuXHRcdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuXHJcblx0XHRcdFByb2R1Y3RzLmdldFByb2R1Y3RzQnlQYWdlKGluc3RhbmNlLmN1cnJlbnQrMSkudGhlbihmdW5jdGlvbihwcm9kdWN0cykge1xyXG5cdFx0XHRcdFByb2R1Y3RzLnJlcGxhY2VJdGVtcyhwcm9kdWN0cyk7XHJcblx0XHRcdH0pO1xyXG5cclxuXHRcdFx0aW5zdGFuY2Uuc2V0Q3VycmVudChpbnN0YW5jZS5jdXJyZW50KzEpO1xyXG5cdFx0fTtcclxuXHJcblx0XHR0aGlzLnByZXZpb3VzLmNoaWxkTm9kZXNbMF0ub25jbGljayA9IGZ1bmN0aW9uKGV2ZW50KSB7XHJcblx0XHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcblx0XHRcdFxyXG5cdFx0XHRQcm9kdWN0cy5nZXRQcm9kdWN0c0J5UGFnZShpbnN0YW5jZS5jdXJyZW50LTEpLnRoZW4oZnVuY3Rpb24ocHJvZHVjdHMpIHtcclxuXHRcdFx0XHRQcm9kdWN0cy5yZXBsYWNlSXRlbXMocHJvZHVjdHMpO1xyXG5cdFx0XHR9KTtcclxuXHJcblx0XHRcdGluc3RhbmNlLnNldEN1cnJlbnQoaW5zdGFuY2UuY3VycmVudC0xKTtcclxuXHRcdH07XHJcblxyXG5cdFx0Zm9yKHZhciBpID0gMDsgaSA8IHRoaXMucGFnZXMubGVuZ3RoOyBpKyspIHtcclxuXHRcdFx0dGhpcy5wYWdlc1tpXS5jaGlsZE5vZGVzWzBdLm9uY2xpY2sgPSBmdW5jdGlvbihldmVudCkge1xyXG5cdFx0XHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcblx0XHRcdFx0dmFyIHBhZ2VOdW1iZXIgPSB0aGlzLmdldEF0dHJpYnV0ZSgnZGF0YS1wYWdlLW5yJyk7XHJcblx0XHRcdFx0XHJcblx0XHRcdFx0UHJvZHVjdHMuZ2V0UHJvZHVjdHNCeVBhZ2UocGFnZU51bWJlcikudGhlbihmdW5jdGlvbihwcm9kdWN0cykge1xyXG5cdFx0XHRcdFx0UHJvZHVjdHMucmVwbGFjZUl0ZW1zKHByb2R1Y3RzKTtcclxuXHRcdFx0XHR9KTtcclxuXHRcdFx0XHRcclxuXHRcdFx0XHRpbnN0YW5jZS5zZXRDdXJyZW50KHBhZ2VOdW1iZXIpO1xyXG5cdFx0XHR9O1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogU2V0cyB0aGUgY3VycmVudCBwYWdlLlxyXG5cdCAqL1xyXG5cdHNldEN1cnJlbnQocGFnZU51bWJlcikgXHJcblx0e1xyXG5cdFx0aWYodGhpcy5ub3RJblBhZ2VSYW5nZShwYWdlTnVtYmVyKSkge1xyXG5cdFx0XHRyZXR1cm47XHJcblx0XHR9XHJcblxyXG5cdFx0dGhpcy5jdXJyZW50ID0gcGFyc2VJbnQocGFnZU51bWJlcik7XHJcblx0XHR0aGlzLmNoYW5nZVVybChwYWdlTnVtYmVyKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEdldHMgdGhlIGN1cnJlbnQgcGFnZS5cclxuXHQgKi9cclxuXHRnZXRDdXJyZW50KCkgXHJcblx0e1xyXG5cdFx0cmV0dXJuIHRoaXMuY3VycmVudDtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIENyZWF0ZXMgdGhlIHBhZ2luYXRpb24gbGlua3MuXHJcblx0ICovXHJcblx0Y3JlYXRlTGlua3MoKSBcclxuXHR7XHRcclxuXHRcdGxldCB1bCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3VsJyk7XHJcblx0XHRcclxuXHRcdHRoaXMucGFnZXMgPSB0aGlzLmNyZWF0ZVBhZ2VMaW5rcygpO1xyXG5cdFx0dGhpcy5wcmV2aW91cyA9IHRoaXMuY3JlYXRlUHJldmlvdXNCdXR0b24oKTtcclxuXHRcdHRoaXMubmV4dCA9IHRoaXMuY3JlYXRlTmV4dEJ1dHRvbigpO1xyXG5cclxuXHRcdHVsLmNsYXNzTmFtZSA9ICdwYWdpbmF0aW9uJztcclxuXHRcdHVsLmFwcGVuZENoaWxkKHRoaXMucHJldmlvdXMpO1xyXG5cclxuXHRcdHRoaXMucGFnZXMuZm9yRWFjaChmdW5jdGlvbihwYWdlKSB7XHJcblx0XHRcdHVsLmFwcGVuZENoaWxkKHBhZ2UpO1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0dWwuYXBwZW5kQ2hpbGQodGhpcy5uZXh0KTtcclxuXHJcblx0XHRyZXR1cm4gdWw7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBDcmVhdGVzIHRoZSBwYWdlcyBpdGVtIGxpbmtzLlxyXG5cdCAqL1xyXG5cdGNyZWF0ZVBhZ2VMaW5rcygpIFxyXG5cdHtcclxuXHRcdHZhciBwYWdlcyA9IFtdO1xyXG5cclxuXHRcdGZvcih2YXIgaSA9IDE7IGkgPD0gdGhpcy50b3RhbFBhZ2VzOyBpKyspIHtcclxuXHRcdFx0dmFyIHBhZ2VJdGVtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKTtcclxuXHRcdFx0dmFyIGxpbmsgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJyk7XHJcblx0XHRcdHBhZ2VJdGVtLmNsYXNzTmFtZSA9ICdwYWdlLWl0ZW0nO1xyXG5cdFx0XHRsaW5rLmNsYXNzTmFtZSA9ICdwYWdlLWxpbmsnO1xyXG5cdFx0XHRsaW5rLnNldEF0dHJpYnV0ZSgnaHJlZicsICc/cGFnZT0nKyBpKTtcclxuXHRcdFx0bGluay5zZXRBdHRyaWJ1dGUoJ2RhdGEtcGFnZS1ucicsIGkpO1xyXG5cdFx0XHRsaW5rLmlubmVySFRNTCA9IGk7XHJcblx0XHRcdHBhZ2VJdGVtLmFwcGVuZENoaWxkKGxpbmspO1xyXG5cdFx0XHRwYWdlcy5wdXNoKHBhZ2VJdGVtKTtcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gcGFnZXM7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBDcmVhdGVzIHRoZSBwcmV2aW91cyBidXR0b24gbGluay5cclxuXHQgKi9cclxuXHRjcmVhdGVQcmV2aW91c0J1dHRvbigpIFxyXG5cdHtcclxuXHRcdHZhciBsaSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJyk7XHJcblx0XHR2YXIgbGluayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKTtcclxuXHRcdHZhciBzcGFuMSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcclxuXHRcdHZhciBzcGFuMiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcclxuXHRcdFxyXG5cdFx0XHJcblx0XHRsaS5jbGFzc05hbWUgPSAncGFnZS1pdGVtJztcclxuXHRcdGxpbmsuY2xhc3NOYW1lID0gJ3BhZ2UtbGluayc7XHJcblx0XHRzcGFuMi5jbGFzc05hbWUgPSAnc3Itb25seSc7XHJcblxyXG5cdFx0bGluay5zZXRBdHRyaWJ1dGUoJ2hyZWYnLCAnJyk7XHJcblx0XHRsaW5rLnNldEF0dHJpYnV0ZSgnYXJpYS1sYWJlbCcsICdQcmV2aW91cycpO1xyXG5cdFx0c3BhbjEuc2V0QXR0cmlidXRlKCdhcmlhLWhpZGRlbicsICd0cnVlJyk7XHJcblxyXG5cdFx0c3BhbjEuaW5uZXJIVE1MID0gJyZsYXF1bzsnO1xyXG5cdFx0c3BhbjIuaW5uZXJIVE1MID0gJ1ByZXZpb3VzJztcclxuXHJcblx0XHRsaW5rLmFwcGVuZENoaWxkKHNwYW4xKTtcclxuXHRcdGxpbmsuYXBwZW5kQ2hpbGQoc3BhbjIpO1xyXG5cdFx0bGkuYXBwZW5kQ2hpbGQobGluayk7XHJcblxyXG5cdFx0cmV0dXJuIGxpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQ3JlYXRlcyB0aGUgbmV4dCBidXR0b24gbGluay5cclxuXHQgKi9cclxuXHRjcmVhdGVOZXh0QnV0dG9uKCkgXHJcblx0e1xyXG5cdFx0dmFyIGxpID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKTtcclxuXHRcdHZhciBsaW5rID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpO1xyXG5cdFx0dmFyIHNwYW4xID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xyXG5cdFx0dmFyIHNwYW4yID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xyXG5cdFx0XHJcblx0XHRsaS5jbGFzc05hbWUgPSAncGFnZS1pdGVtJztcclxuXHRcdGxpbmsuY2xhc3NOYW1lID0gJ3BhZ2UtbGluayc7XHJcblx0XHRzcGFuMi5jbGFzc05hbWUgPSAnc3Itb25seSc7XHJcblxyXG5cdFx0bGluay5zZXRBdHRyaWJ1dGUoJ2hyZWYnLCAnJyk7XHJcblx0XHRsaW5rLnNldEF0dHJpYnV0ZSgnYXJpYS1sYWJlbCcsICdOZXh0Jyk7XHJcblx0XHRzcGFuMS5zZXRBdHRyaWJ1dGUoJ2FyaWEtaGlkZGVuJywgJ3RydWUnKTtcclxuXHJcblx0XHRzcGFuMS5pbm5lckhUTUwgPSAnJnJhcXVvOyc7XHJcblx0XHRzcGFuMi5pbm5lckhUTUwgPSAnTmV4dCc7XHJcblxyXG5cdFx0bGluay5hcHBlbmRDaGlsZChzcGFuMSk7XHJcblx0XHRsaW5rLmFwcGVuZENoaWxkKHNwYW4yKTtcclxuXHRcdGxpLmFwcGVuZENoaWxkKGxpbmspO1xyXG5cclxuXHRcdHJldHVybiBsaTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIENoZWNrcyBpZiB0aGUgZ2l2ZW4gcGFnZSBpcyBpbiByYW5nZS5cclxuXHQgKi9cclxuXHRub3RJblBhZ2VSYW5nZShwYWdlTnVtYmVyKSBcclxuXHR7XHJcblx0XHRyZXR1cm4gKHBhZ2VOdW1iZXIgPiB0aGlzLnRvdGFsUGFnZXMgfHwgcGFnZU51bWJlciA8PSAwKSB8fCBpc05hTihwYWdlTnVtYmVyKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIENoYW5nZXMgdGhlIHVybCB0byBhIGdpdmVuIHBhZ2UgbnVtYmVyLlxyXG5cdCAqL1xyXG5cdGNoYW5nZVVybChwYWdlTnVtYmVyKSBcclxuXHR7XHJcblx0XHRwYWdlTnVtYmVyID0gIHBhZ2VOdW1iZXIgfHwgR0VUX1ZhcnMoKVsncGFnZSddO1xyXG5cdFx0d2luZG93Lmhpc3RvcnkucmVwbGFjZVN0YXRlKCcnLCAnJywgdGhpcy51cGRhdGVVUkxQYXJhbWV0ZXIod2luZG93LmxvY2F0aW9uLmhyZWYsICdwYWdlJywgcGFnZU51bWJlcikpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogR2V0IHRoZSBnZXQgdmFyaWFibGVzIGZyb20gdGhlIHVybC5cclxuXHQgKi9cclxuXHRHRVRfVmFycygpIFxyXG5cdHtcclxuXHRcdHZhciB2YXJzID0ge307XHJcblx0XHR2YXIgcGFydHMgPSB3aW5kb3cubG9jYXRpb24uaHJlZi5yZXBsYWNlKC9bPyZdKyhbXj0mXSspPShbXiZdKikvZ2ksIGZ1bmN0aW9uKG0sIGtleSwgdmFsdWUpIHtcclxuXHRcdFx0dmFyc1trZXldID0gdmFsdWU7XHJcblx0XHR9KTtcclxuXHJcblx0XHRyZXR1cm4gdmFycztcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIE1vZGlmaWVzIHRoZSBnZXQgcGFyYW1ldGVyIGluIHRoZSB1cmwuXHJcblx0ICovXHJcblx0dXBkYXRlVVJMUGFyYW1ldGVyKHVybCwgcGFyYW0sIHBhcmFtVmFsKSBcclxuXHR7XHJcblx0ICAgIHZhciBuZXdBZGRpdGlvbmFsVVJMID0gXCJcIjtcclxuXHQgICAgdmFyIHRlbXBBcnJheSA9IHVybC5zcGxpdChcIj9cIik7XHJcblx0ICAgIHZhciBiYXNlVVJMID0gdGVtcEFycmF5WzBdO1xyXG5cdCAgICB2YXIgYWRkaXRpb25hbFVSTCA9IHRlbXBBcnJheVsxXTtcclxuXHQgICAgdmFyIHRlbXAgPSBcIlwiO1xyXG5cclxuXHQgICAgaWYgKGFkZGl0aW9uYWxVUkwpIHtcclxuXHQgICAgICAgIHRlbXBBcnJheSA9IGFkZGl0aW9uYWxVUkwuc3BsaXQoXCImXCIpO1xyXG5cdCAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0ZW1wQXJyYXkubGVuZ3RoOyBpKyspe1xyXG5cdCAgICAgICAgICAgIGlmICh0ZW1wQXJyYXlbaV0uc3BsaXQoJz0nKVswXSAhPSBwYXJhbSl7XHJcblx0ICAgICAgICAgICAgICAgIG5ld0FkZGl0aW9uYWxVUkwgKz0gdGVtcCArIHRlbXBBcnJheVtpXTtcclxuXHQgICAgICAgICAgICAgICAgdGVtcCA9IFwiJlwiO1xyXG5cdCAgICAgICAgICAgIH1cclxuXHQgICAgICAgIH1cclxuXHQgICAgfVxyXG5cclxuXHQgICAgdmFyIHJvd3NUZXh0ID0gdGVtcCArIFwiXCIgKyBwYXJhbSArIFwiPVwiICsgcGFyYW1WYWw7XHJcblx0ICAgIHJldHVybiBiYXNlVVJMICsgXCI/XCIgKyBuZXdBZGRpdGlvbmFsVVJMICsgcm93c1RleHQ7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBSZXNldHMgdGhlIHBhZ2luYXRpb24uXHJcblx0ICovXHJcblx0cmVzZXQoKSBcclxuXHR7XHJcblx0XHR0aGlzLnNldEN1cnJlbnQoMSk7XHJcblx0XHR0aGlzLmNoYW5nZVVybCgxKTtcclxuXHR9XHJcbn1cblxuLyoqXHJcbiAqIFRoZSBkZWZhdWx0IHNldHRpbmdzIG9mIHRoZSBjYXJ0LlxyXG4gKi9cclxubGV0IGRlZmF1bHRTZXR0aW5ncyQ0ID0ge1xyXG5cdGVsZW1lbnQ6ICcuY2FydCcsXHJcblx0cHJldmlld19jbGFzczogJycsXHJcblx0Y2xhc3M6ICcnLFxyXG5cdHdpZHRoOiAnNjBweCcsXHJcblx0aGVpZ2h0OiAnNjBweCcsXHJcblx0cGxhY2VtZW50OiAncmlnaHQtdG9wJyxcclxuXHRmaXhlZDogdHJ1ZSxcclxuXHRob3Zlcl9jb2xvcjogJ29yYW5nZSdcclxufTtcclxuXHJcbi8qKlxyXG4gKiBTdG9yZXMgdGhlIGNvbnRhaW5lciBvYmplY3QuXHJcbiAqL1xyXG5sZXQgQ29udGFpbmVyJDQ7XHJcblxyXG4vKipcclxuICogVGhlIENhcnQgT2JqZWN0LCBoYW5kbGVzIHRoZSBjYXJ0IGljb24gYW5kIHNlc3Npb25zLlxyXG4gKi9cclxuY2xhc3MgQ2FydCBcclxue1xyXG5cdC8qKlxyXG5cdCAqIEluaXRpYWxpemUgdGhlIGRlZmF1bHQgc2V0dGluZ3MsIHNldHRpbmcgdGhlIGVsZW1lbnQsXHJcblx0ICogYW5kIGNyZWF0aW5nIHRoZSBwcmV2aWV3IGZvciB0aGUgY2FydHMgZGV0YWlscy5cclxuXHQgKi9cclxuXHRjb25zdHJ1Y3Rvcihjb250YWluZXIpIFxyXG5cdHtcclxuXHRcdENvbnRhaW5lciQ0ID0gY29udGFpbmVyO1xyXG5cclxuXHRcdHRoaXMucHJldmlld0VsZW1lbnQgPSB0aGlzLmNyZWF0ZVByZXZpZXdFbGVtZW50KCk7XHJcblx0XHR0aGlzLnN2Z0ljb24gPSBjcmVhdGVJY29uLmNhbGwodGhpcyk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBTZXRzIHRoZSBvYmplY3QgYnkgdGhlIHVzZXJzIHNldHRpbmcuXHJcblx0ICovXHJcblx0c2V0dXAoc2V0dGluZ3MpXHJcblx0e1xyXG5cdFx0aWYodHlwZW9mIHNldHRpbmdzICE9ICdvYmplY3QnKSB7XHJcblx0XHRcdHRocm93IG5ldyBJbnZhbGlkQXJndW1lbnRFeGNlcHRpb24kMTtcclxuXHRcdH1cclxuXHJcblx0XHR0aGlzLnNldHRpbmdzID0gQ29tbW9uLmV4dGVuZChkZWZhdWx0U2V0dGluZ3MkNCwgc2V0dGluZ3MpO1xyXG5cclxuXHRcdHRoaXMuc2V0RWxlbWVudCh0aGlzLnNldHRpbmdzLmVsZW1lbnQpO1xyXG5cdFx0RE9NLmFkZENsYXNzKHRoaXMucHJldmlld0VsZW1lbnQsICdjbG9zZWQnKTtcclxuXHRcdERPTS5hZGRDbGFzcyh0aGlzLnByZXZpZXdFbGVtZW50LCB0aGlzLnNldHRpbmdzLnByZXZpZXdfY2xhc3MpO1xyXG5cdFx0dGhpcy5iaW5kRXZlbnRMaXN0ZW5lcnMoKTtcclxuXHJcblx0XHR0aGlzLmFkZFN0eWxlVGFnKCk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBCaW5kcyBldmVydGhpbmcgdG8gdGhlIGVsZW1lbnQuXHJcblx0ICovXHJcblx0c2V0RWxlbWVudChzZWxlY3RvcilcclxuXHR7XHJcblx0XHR0aGlzLmljb24gPSBET00uZWxlbWVudChzZWxlY3Rvcik7XHJcblxyXG5cdFx0aWYgKHRoaXMuaWNvbikge1xyXG5cdFx0XHRET00uYWRkQ2xhc3ModGhpcy5pY29uLCB0aGlzLnNldHRpbmdzLmNsYXNzKTtcclxuXHRcdFx0RE9NLmFkZENsYXNzKHRoaXMuaWNvbiwgdGhpcy5zZXR0aW5ncy5wbGFjZW1lbnQpO1xyXG5cdFx0XHR0aGlzLmljb24uYXBwZW5kQ2hpbGQodGhpcy5zdmdJY29uKTtcclxuXHRcdFx0dGhpcy5pY29uLmFwcGVuZENoaWxkKHRoaXMucHJldmlld0VsZW1lbnQpO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQ3JlYXRlcyB0aGUgY2FydCBkZXRhaWxzIHByZXZpZXcgZWxlbWVudC5cclxuXHQgKi9cclxuXHRjcmVhdGVQcmV2aWV3RWxlbWVudCgpXHJcblx0e1xyXG5cdFx0bGV0IHByZXZpZXdFbGVtZW50ID0gRE9NLmNyZWF0ZUVsZW1lbnQoJ2RpdicsIHtcclxuXHRcdFx0aWQ6ICdwcmV2aWV3J1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0cmV0dXJuIHByZXZpZXdFbGVtZW50O1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQWRkIHRoZSBlQ29tbWVyY2Ugc3R5bGUgdGFncyB0byB0aGUgRE9NLlxyXG5cdCAqL1xyXG5cdGFkZFN0eWxlVGFnKCkgXHJcblx0e1xyXG5cdFx0aWYoRE9NLmVsZW1lbnQoJyNlQ29tbWVyY2UtQ2FydCcpKSB7XHJcblx0XHRcdHJldHVybjtcclxuXHRcdH1cclxuXHJcblx0XHRsZXQgcG9zaXRpb24gPSAodGhpcy5zZXR0aW5ncy5maXhlZCkgPyAnZml4ZWQnIDogJ2Fic29sdXRlJztcclxuXHJcblx0XHRsZXQgY3NzID0gYFxyXG5cdFx0XHQke3RoaXMuc2V0dGluZ3MuZWxlbWVudH0ge1xyXG5cdFx0XHRcdHBvc2l0aW9uOiAke3Bvc2l0aW9ufTtcclxuXHRcdFx0XHRjdXJzb3I6IHBvaW50ZXI7XHJcblx0XHRcdFx0Y29sb3I6ICNmZmZmZmY7XHJcblx0XHRcdFx0ei1pbmRleDogOTk4O1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHQke3RoaXMuc2V0dGluZ3MuZWxlbWVudH0gPiBzdmcge1xyXG5cdFx0XHRcdHdpZHRoOiAke3RoaXMuc2V0dGluZ3Mud2lkdGh9O1xyXG5cdFx0XHRcdGhlaWdodDogJHt0aGlzLnNldHRpbmdzLmhlaWdodH07XHJcblx0XHRcdFx0dHJhbnNpdGlvbjogZmlsbCAwLjNzO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHQke3RoaXMuc2V0dGluZ3MuZWxlbWVudH0gPiBzdmc6aG92ZXIge1xyXG5cdFx0XHRcdGZpbGw6ICR7dGhpcy5zZXR0aW5ncy5ob3Zlcl9jb2xvcn07XHJcblx0XHRcdFx0dHJhbnNpdGlvbjogZmlsbCAwLjNzO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHQke3RoaXMuc2V0dGluZ3MuZWxlbWVudH0udG9wLXJpZ2h0LFxyXG5cdFx0XHQke3RoaXMuc2V0dGluZ3MuZWxlbWVudH0ucmlnaHQtdG9wIHtcclxuXHRcdFx0XHRyaWdodDogMTBweDtcclxuXHRcdFx0XHR0b3A6IDEwcHg7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdCR7dGhpcy5zZXR0aW5ncy5lbGVtZW50fS5sZWZ0LXRvcCxcclxuXHRcdFx0JHt0aGlzLnNldHRpbmdzLmVsZW1lbnR9LnRvcC1sZWZ0IHtcclxuXHRcdFx0XHRsZWZ0OiAxMHB4O1xyXG5cdFx0XHRcdHRvcDogMTBweDtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0JHt0aGlzLnNldHRpbmdzLmVsZW1lbnR9ID4gI3ByZXZpZXcge1xyXG5cdFx0XHRcdHBvc2l0aW9uOiAke3Bvc2l0aW9ufTtcclxuXHRcdFx0XHR6LWluZGV4OiA5OTk5O1xyXG5cdFx0XHRcdHRvcDogY2FsYygxMHB4ICsgJHt0aGlzLnNldHRpbmdzLmhlaWdodH0pO1xyXG5cdFx0XHRcdHRyYW5zZm9ybTogdHJhbnNsYXRlWCg2MHB4KTtcclxuXHRcdFx0XHRoZWlnaHQ6IDQwMHB4O1xyXG5cdFx0XHRcdHdpZHRoOiAzMDBweDtcclxuXHRcdFx0XHRib3JkZXI6IDFweCBzb2xpZCAjZTRlNGU0O1xyXG5cdFx0XHRcdGJhY2tncm91bmQ6ICNmZmZmZmY7XHJcblx0XHRcdFx0dHJhbnNpdGlvbjogdHJhbnNmb3JtIDFzLCB2aXNpYmlsaXR5IDFzO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHQke3RoaXMuc2V0dGluZ3MuZWxlbWVudH0gPiAjcHJldmlldy5vcGVuZWQge1xyXG5cdFx0XHRcdHZpc2liaWxpdHk6IHZpc2libGU7XHJcblx0XHRcdFx0dHJhbnNmb3JtOiB0cmFuc2xhdGVYKC0yNDBweCk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdCR7dGhpcy5zZXR0aW5ncy5lbGVtZW50fSA+ICNwcmV2aWV3LmNsb3NlZCB7XHJcblx0XHRcdFx0dmlzaWJpbGl0eTogaGlkZGVuO1xyXG5cdFx0XHRcdHRyYW5zZm9ybTogdHJhbnNsYXRlWCg2MHB4KTtcclxuXHRcdFx0fVxyXG5cdFx0YDtcclxuXHQgICAgXHJcblx0ICAgIERPTS5hZGRTdHlsZSgnZUNvbW1lcmNlLUNhcnQnLCBjc3MpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQmluZHMgZXZlbnQgbGlzdGVuZXJzIHRvIHRoZSBjYXJ0IGljb24uXHJcblx0ICovXHJcblx0YmluZEV2ZW50TGlzdGVuZXJzKClcclxuXHR7XHJcblx0XHRpZih0aGlzLnN2Z0ljb24gPT0gbnVsbCkge1xyXG5cdFx0XHRyZXR1cm47XHJcblx0XHR9XHJcblxyXG5cdFx0dGhpcy5zdmdJY29uLm9uY2xpY2sgPSBmdW5jdGlvbihldmVudCkge1xyXG5cdFx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdFx0XHRET00udG9nZ2xlQ2xhc3ModGhpcy5wcmV2aWV3RWxlbWVudCwgJ29wZW5lZCcsICdjbG9zZWQnKTtcclxuXHRcdH0uYmluZCh0aGlzKTtcclxuXHJcblx0XHR0aGlzLnByZXZpZXdFbGVtZW50Lm9ubW91c2VvdXQgPSBmdW5jdGlvbihldmVudCkge1xyXG5cdFx0XHRjbG9zZS5jYWxsKHRoaXMsIGV2ZW50KTtcclxuXHRcdH0uYmluZCh0aGlzKTtcclxuXHR9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNsb3NlKGV2ZW50KSB7XHJcblx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuXHRET00uc3dpdGNoQ2xhc3Nlcyh0aGlzLnByZXZpZXdFbGVtZW50LCAnb3BlbmVkJywgJ2Nsb3NlZCcpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBjcmVhdGVJY29uKCkge1xyXG5cdGxldCBzdmcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50TlMoXCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiLCBcInN2Z1wiKTtcclxuXHRsZXQgZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnROUyhcImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIsIFwiZ1wiKTtcclxuXHRsZXQgcGF0aCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnROUyhcImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIsIFwicGF0aFwiKTtcclxuXHJcblx0c3ZnLnNldEF0dHJpYnV0ZSgndmVyc2lvbicsICcxLjEnKTtcclxuXHRzdmcuc2V0QXR0cmlidXRlKCd4bWxucycsICdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZycpO1xyXG5cdHN2Zy5zZXRBdHRyaWJ1dGUoJ3htbG5zOnhsaW5rJywgJ2h0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsnKTtcclxuXHRzdmcuc2V0QXR0cmlidXRlKCd4JywgJzBweCcpO1xyXG5cdHN2Zy5zZXRBdHRyaWJ1dGUoJ3knLCAnMHB4Jyk7XHJcblx0c3ZnLnNldEF0dHJpYnV0ZSgnd2lkdGgnLCAnNDQ2Ljg0M3B4Jyk7XHJcblx0c3ZnLnNldEF0dHJpYnV0ZSgnaGVpZ2h0JywgJzQ0Ni44NDNweCcpO1xyXG5cdHN2Zy5zZXRBdHRyaWJ1dGUoJ3ZpZXdCb3gnLCAnMCAwIDQ0Ni44NDMgNDQ2Ljg0MycpO1xyXG5cdHN2Zy5zZXRBdHRyaWJ1dGUoJ3N0eWxlJywgJ2VuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgNDQ2Ljg0MyA0NDYuODQzOycpO1xyXG5cdHN2Zy5zZXRBdHRyaWJ1dGUoJ3htbDpzcGFjZScsICdwcmVzZXJ2ZScpO1xyXG5cclxuXHRwYXRoLnNldEF0dHJpYnV0ZSgnZCcsICdNNDQ0LjA5LDkzLjEwM2MtMi42OTgtMy42OTktNy4wMDYtNS44ODgtMTEuNTg0LTUuODg4SDEwOS45MmMtMC42MjUsMC0xLjI0OSwwLjAzOC0xLjg1LDAuMTE5bC0xMy4yNzYtMzguMjdjLTEuMzc2LTMuOTU4LTQuNDA2LTcuMTEzLTguMy04LjY0NkwxOS41ODYsMTQuMTM0Yy03LjM3NC0yLjg4Ny0xNS42OTUsMC43MzUtMTguNTkxLDguMWMtMi44OTEsNy4zNjksMC43MywxNS42OTUsOC4xLDE4LjU5MWw2MC43NjgsMjMuODcybDc0LjM4MSwyMTQuMzk5Yy0zLjI4MywxLjE0NC02LjA2NSwzLjY2My03LjMzMiw3LjE4N2wtMjEuNTA2LDU5LjczOWMtMS4zMTgsMy42NjMtMC43NzUsNy43MzMsMS40NjgsMTAuOTE2YzIuMjQsMy4xODMsNS44ODMsNS4wNzgsOS43NzMsNS4wNzhoMTEuMDQ0Yy02Ljg0NCw3LjYxNi0xMS4wNDQsMTcuNjQ2LTExLjA0NCwyOC42NzVjMCwyMy43MTgsMTkuMjk4LDQzLjAxMiw0My4wMTIsNDMuMDEyczQzLjAxMi0xOS4yOTQsNDMuMDEyLTQzLjAxMmMwLTExLjAyOS00LjItMjEuMDU5LTExLjA0NC0yOC42NzVoOTMuNzc2Yy02Ljg0Nyw3LjYxNi0xMS4wNDgsMTcuNjQ2LTExLjA0OCwyOC42NzVjMCwyMy43MTgsMTkuMjk0LDQzLjAxMiw0My4wMTMsNDMuMDEyYzIzLjcxOCwwLDQzLjAxMi0xOS4yOTQsNDMuMDEyLTQzLjAxMmMwLTExLjAyOS00LjItMjEuMDU5LTExLjA0My0yOC42NzVoMTMuNDMzYzYuNTk5LDAsMTEuOTQ3LTUuMzQ5LDExLjk0Ny0xMS45NDhjMC02LjU5OS01LjM0OS0xMS45NDctMTEuOTQ3LTExLjk0N0gxNDMuNjQ3bDEzLjMxOS0zNi45OTZjMS43MiwwLjcyNCwzLjU3OCwxLjE1Miw1LjUyMywxLjE1MmgyMTAuMjc4YzYuMjM0LDAsMTEuNzUxLTQuMDI3LDEzLjY1LTkuOTU5bDU5LjczOS0xODYuMzg3QzQ0Ny41NTcsMTAxLjU2Nyw0NDYuNzg4LDk2LjgwMiw0NDQuMDksOTMuMTAzeiBNMTY5LjY1OSw0MDkuODA3Yy0xMC41NDMsMC0xOS4xMTYtOC41NzMtMTkuMTE2LTE5LjExNnM4LjU3My0xOS4xMTcsMTkuMTE2LTE5LjExN3MxOS4xMTYsOC41NzQsMTkuMTE2LDE5LjExN1MxODAuMjAyLDQwOS44MDcsMTY5LjY1OSw0MDkuODA3eiBNMzI3LjM2Nyw0MDkuODA3Yy0xMC41NDMsMC0xOS4xMTctOC41NzMtMTkuMTE3LTE5LjExNnM4LjU3NC0xOS4xMTcsMTkuMTE3LTE5LjExN2MxMC41NDIsMCwxOS4xMTYsOC41NzQsMTkuMTE2LDE5LjExN1MzMzcuOTA5LDQwOS44MDcsMzI3LjM2Nyw0MDkuODA3eiBNNDAyLjUyLDE0OC4xNDloLTczLjE2MVYxMTUuODloODMuNDk5TDQwMi41MiwxNDguMTQ5eiBNMzgxLjQ1MywyMTMuODYxaC01Mi4wOTR2LTM3LjAzOGg2My45NjdMMzgxLjQ1MywyMTMuODYxeiBNMjM0LjU3MSwyMTMuODYxdi0zNy4wMzhoNjYuMTEzdjM3LjAzOEgyMzQuNTcxeiBNMzAwLjY4NCwyNDIuNTM4djMxLjA2NGgtNjYuMTEzdi0zMS4wNjRIMzAwLjY4NHogTTEzOS4xMTUsMTc2LjgyM2g2Ni43ODR2MzcuMDM4aC01My45MzNMMTM5LjExNSwxNzYuODIzeiBNMjM0LjU3MSwxNDguMTQ5VjExNS44OWg2Ni4xMTN2MzIuMjU5SDIzNC41NzF6IE0yMDUuODk4LDExNS44OXYzMi4yNTloLTc2LjczNGwtMTEuMTkxLTMyLjI1OUgyMDUuODk4eiBNMTYxLjkxNiwyNDIuNTM4aDQzLjk4MnYzMS4wNjRoLTMzLjIwNkwxNjEuOTE2LDI0Mi41Mzh6IE0zMjkuMzU5LDI3My42MDN2LTMxLjA2NGg0Mi45MDlsLTkuOTU1LDMxLjA2NEgzMjkuMzU5eicpO1xyXG5cclxuXHRnLmFwcGVuZENoaWxkKHBhdGgpO1xyXG5cdHN2Zy5hcHBlbmRDaGlsZChnKTtcclxuXHJcblxyXG5cdHJldHVybiBzdmc7XHJcbn1cblxubGV0IGluaXRhbGl6ZWQgPSBmYWxzZTtcblxubGV0IGRlZmF1bHRTZXR0aW5ncyA9IHtcblx0aW1wb3J0Qm9vdHN0cmFwOiBmYWxzZSxcblx0Y29tcG9uZW50czogWydQcm9kdWN0cycsICdTZXJ2aWNlcycsICdGaWx0ZXInLCAnUGFnaW5hdGlvbiddXG59O1xuXG5jbGFzcyBlQ29tbWVyY2Vcbntcblx0Y29uc3RydWN0b3Ioc2V0dGluZ3MpXG5cdHtcblx0XHRFeGNlcHRpb25IYW5kbGVyLmluaXRhbGl6ZSgpO1xuXG5cdFx0aWYodHlwZW9mIHNldHRpbmdzICE9ICdvYmplY3QnKSB7XG5cdFx0XHR0aHJvdyBuZXcgSW52YWxpZEFyZ3VtZW50RXhjZXB0aW9uJDE7XG5cdFx0fVxuXG5cdFx0dGhpcy5jb250YWluZXIgPSBuZXcgQ29udGFpbmVyO1xuXHRcdHRoaXMuc2V0dGluZ3MgPSBDb21tb24uZXh0ZW5kKGRlZmF1bHRTZXR0aW5ncywgc2V0dGluZ3MpO1xuXHRcdFxuXHRcdGJpbmRDb21wb25lbnRzRGVwZW5kZW5jaWVzLmNhbGwodGhpcywgc2V0dGluZ3MuY29tcG9uZW50cyk7XG5cblx0XHRpbml0YWxpemVkID0gdHJ1ZTtcblxuXHRcdHJldHVybiBuZXcgUHJveHkodGhpcywge1xuXHRcdFx0Z2V0OiBmdW5jdGlvbih0YXJnZXQsIG9iamVjdCkge1xuXHRcdFx0XHRyZXR1cm4gdGFyZ2V0LmNvbnRhaW5lci5tYWtlKG9iamVjdCk7XG5cdFx0XHR9XG5cdFx0fSk7XG5cdH1cbn1cblxuLyoqXG4gKiBCaW5kcyBjb21wb25lbnRzIGRlcGVuZGVuY2llcy5cbiAqL1xuZnVuY3Rpb24gYmluZENvbXBvbmVudHNEZXBlbmRlbmNpZXMoY29tcG9uZW50cykge1xuXHR0aGlzLmNvbnRhaW5lci5iaW5kKCdGaWx0ZXInLCBmdW5jdGlvbihjb250YWluZXIpIHtcblx0XHRyZXR1cm4gbmV3IEZpbHRlcihjb250YWluZXIpO1xuXHR9KTtcblx0XG5cdHRoaXMuY29udGFpbmVyLmJpbmQoJ1NlcnZpY2VzJywgZnVuY3Rpb24oY29udGFpbmVyKSB7IFxuXHRcdHJldHVybiBuZXcgU2VydmljZXMoY29udGFpbmVyKTtcblx0fSk7XG5cblx0dGhpcy5jb250YWluZXIuYmluZCgnUGFnaW5hdGlvbicsIGZ1bmN0aW9uKGNvbnRhaW5lcikge1xuXHRcdHJldHVybiBuZXcgUGFnaW5hdGlvbihjb250YWluZXIpO1xuXHR9KTtcblxuXHR0aGlzLmNvbnRhaW5lci5iaW5kKCdQcm9kdWN0cycsIGZ1bmN0aW9uKGNvbnRhaW5lcikge1xuXHRcdHJldHVybiBuZXcgUHJvZHVjdHMoY29udGFpbmVyLCBjb250YWluZXIubWFrZSgnUGFnaW5hdGlvbicpKTtcblx0fSk7XG5cblx0dGhpcy5jb250YWluZXIuYmluZCgnQ2FydCcsIGZ1bmN0aW9uKGNvbnRhaW5lcikge1xuXHRcdHJldHVybiBuZXcgQ2FydChjb250YWluZXIpO1xuXHR9KTtcbn1cblxucmV0dXJuIGVDb21tZXJjZTtcblxufSgpKTtcbiJdfQ==
