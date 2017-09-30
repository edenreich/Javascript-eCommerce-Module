'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var eCommerce = function () {
	'use strict';

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
    * Adds class to a given element.
    */

		}, {
			key: 'addClass',
			value: function addClass(element, className) {
				if (className == '') return element;

				className = className.trim();
				className = className.split(' ');

				for (var i = 0; i < className.length; i++) {
					element.classList.add(className[i]);
				}

				return element;
			}

			/**
    * Removes class from a given element.
    */

		}, {
			key: 'removeClass',
			value: function removeClass(element, className) {
				element.classList.remove(className);

				return element;
			}
		}, {
			key: 'element',
			value: function element(selector) {
				var element = queryElement(selector);
				return element;
			}
		}, {
			key: 'addStyle',
			value: function addStyle(id, css) {
				if (typeof css != 'string') {
					throw new invalidArgumentException();
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
		}]);

		return DOM;
	}();

	/**
  * Queries an element from the DOM.
  */


	function queryElement(selector) {
		var element = document.querySelector(selector) || null;

		if (!element) {
			throw new NodeElementDoesNotExistException();
		}

		return element;
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

	var InvalidArgumentException$1 = function InvalidArgumentException$1() {
		_classCallCheck(this, InvalidArgumentException$1);

		console.error(this.constructor.name + ', passing invalid arguments.');

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

				this[key] = concrete;
				this[key].bind(concrete);
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

	var NodeElementDoesNotExistException$1 = function NodeElementDoesNotExistException$1() {
		_classCallCheck(this, NodeElementDoesNotExistException$1);

		console.error(this.constructor.name + ', trying to fetch an none-existing element from the DOM');

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
					} else if (error instanceof NodeElementDoesNotExistException$1) {} else {
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
		url: 'products.php',
		init_static_data: {}
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
					this.paginator.reset(this.settings.init_static_data);
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

				DOM.addClass(this.wrapper, this.settings.class);
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
								instance.currentItems = JSON.parse(this.responseText);

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
				className = className ? 'product ' + className : 'product';

				var wrappedItems = '';

				items = items.map(function (product, index) {
					var item = document.createElement(tagType);
					item = DOM.addClass(item, className);

					var overlay = document.createElement('div');
					overlay.className = 'product-overlay';
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
				var css = '\n\t\t\t.product {\n\t\t\t\tposition: relative;\n\t\t\t\tmargin: 5px 5px;\n\t\t\t\tborder: 1px solid #e4e4e4;\n\t\t\t\twidth: ' + this.settings.width + ';\n\t\t\t\theight: ' + this.settings.height + ';\n\t\t\t\tcursor: pointer;\n\t\t\t\tcolor: #ffffff;\n\t\t\t\toverflow: hidden;\n\t\t\t}\n\n\t\t\t.product > .product-overlay {\n\t\t\t\tposition: absolute;\n\t\t\t\ttop: 0;\n\t\t\t\tleft: 0;\n\t\t\t\twidth: 100%;\n\t\t\t\theight: 100%;\n\t\t\t\topacity: 0.5;\n\t\t\t\tz-index: 5;\n\t\t\t\ttransition: 1s all;\n\t\t\t\ttransform: translateX(-250px);\n\t\t\t}\n\n\t\t\t.product:hover > .product-overlay {\n\t\t\t\tbackground: rgba(0, 0, 0, 0.45);\n\t\t\t\ttransform: translateX(0px);\n\t\t\t\topacity: 1;\n\t\t\t\ttransition: 1s all;\n\t\t\t}\n\n\t\t\t.product > img {\n\t\t\t\tposition: absolute;\n\t\t\t\tleft: 0;\n\t\t\t\ttop: 0;\n\t\t\t\twidth: 100%;\n\t\t\t\theight: 100%;\n\t\t\t}\n\n\t\t\t.product > .product-image {\n\t\t\t\tz-index: 0;\n\t\t\t\tposition: absolute;\n\t\t\t\ttop: 0;\n\t\t\t\tleft: 0;\n\t\t\t}\n\n\t\t\t.product > .product-overlay > .product-name, \n\t\t\t.product > .product-overlay > .product-price,\n\t\t\t.product > .product-overlay > .product-delivery-time {\n\t\t\t\tz-index: 1;\n\t\t\t\tposition: relative;\n\t\t\t\ttext-align: center;\n\t\t\t\tmargin-top: 25px;\n\t\t\t}\n\t\t';

				return DOM.addStyle('eCommerce-Products', css);
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

	var initalized = false;

	var defaultSettings = {
		cartSessionId: [],
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
		var container = this.container;

		container.bind('Filter', function () {
			return new Filter(container);
		});

		container.bind('Services', function () {
			return new Services(container);
		});

		container.bind('Pagination', function () {
			return new Pagination(container);
		});

		container.bind('Products', function () {
			return new Products(container, container.make('Pagination'));
		});
	}

	return eCommerce;
}();
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVDb21tZXJjZS5qcyJdLCJuYW1lcyI6WyJlQ29tbWVyY2UiLCJET00iLCJzdHJpbmciLCJyZXBsYWNlIiwiZWxlbWVudCIsImNsYXNzTmFtZSIsInRyaW0iLCJzcGxpdCIsImkiLCJsZW5ndGgiLCJjbGFzc0xpc3QiLCJhZGQiLCJyZW1vdmUiLCJzZWxlY3RvciIsInF1ZXJ5RWxlbWVudCIsImlkIiwiY3NzIiwiaW52YWxpZEFyZ3VtZW50RXhjZXB0aW9uIiwiaGVhZCIsImRvY3VtZW50IiwiZ2V0RWxlbWVudHNCeVRhZ05hbWUiLCJzdHlsZVRhZyIsImNyZWF0ZUVsZW1lbnQiLCJDU1MiLCJtaW5pZnlDc3MiLCJpbm5lckhUTUwiLCJzZXRBdHRyaWJ1dGUiLCJhcHBlbmRDaGlsZCIsInF1ZXJ5U2VsZWN0b3IiLCJOb2RlRWxlbWVudERvZXNOb3RFeGlzdEV4Y2VwdGlvbiIsIkV2ZW50IiwibmFtZSIsImNhbGxiYWNrIiwiSW52YWxpZEFyZ3VtZW50RXhjZXB0aW9uIiwiZXZlbnRzIiwiZGF0YSIsIkJhZEV2ZW50Q2FsbEV4Y2VwdGlvbiIsIkFycmF5IiwiQ29tbW9uIiwiY3VycmVudE9iaiIsIm5ld09iaiIsImV4dGVuZGVkIiwicHJvcCIsIk9iamVjdCIsInByb3RvdHlwZSIsImhhc093blByb3BlcnR5IiwiY2FsbCIsIm5lZWRsZSIsImh5c3RhY2siLCJjb25zdHJ1Y3RvciIsIm9iamVjdCIsInRvTG93ZXJDYXNlIiwiSW52YWxpZEJpbmRpbmdFeGNlcHRpb24iLCJjb25zb2xlIiwiZXJyb3IiLCJFcnJvciIsIkludmFsaWRBcmd1bWVudEV4Y2VwdGlvbiQxIiwiaW5zdGFuY2VzIiwiQ29udGFpbmVyIiwia2V5IiwiY29uY3JldGUiLCJiaW5kIiwiaW5zdGFuY2UiLCJpbnN0YW5jZUV4aXN0IiwiZ2V0SW5zdGFuY2UiLCJzZXRJbnN0YW5jZSIsIkNvbXBvbmVudHNFeGNlcHRpb24iLCJCYWRFdmVudENhbGxFeGNlcHRpb24kMSIsIkNvbXBvbmVudE5vdFJlZ2lzdGVyZWRFeGNlcHRpb24iLCJOb2RlRWxlbWVudERvZXNOb3RFeGlzdEV4Y2VwdGlvbiQxIiwiRXhjZXB0aW9uSGFuZGxlciIsIndpbmRvdyIsIm9uZXJyb3IiLCJtZXNzYWdlIiwic291cmNlIiwibGluZW5vIiwiY29sbm8iLCJkZWZhdWx0U2V0dGluZ3MkMSIsImNsYXNzIiwid2lkdGgiLCJoZWlnaHQiLCJGaWx0ZXIiLCJjb250YWluZXIiLCJzZXR1cCIsInNldHRpbmdzIiwiZXh0ZW5kIiwic2V0RWxlbWVudCIsIndyYXBwZXIiLCJhZGRDbGFzcyIsImRlZmF1bHRTZXR0aW5ncyQyIiwiaXRlbV9jbGFzcyIsImF0dHJpYnV0ZXMiLCJ1cmwiLCJpbml0X3N0YXRpY19kYXRhIiwiQ29udGFpbmVyJDIiLCJQcm9kdWN0cyIsInBhZ2luYXRvciIsImFkZFN0eWxlVGFnIiwicmVzZXQiLCJyZXF1ZXN0IiwiZ2V0UHJvZHVjdHNCeVBhZ2UiLCJnZXRDdXJyZW50IiwidGhlbiIsIml0ZW1zIiwicmVwbGFjZUl0ZW1zIiwiY2F0Y2giLCJpc0FycmF5IiwicGVyUGFnZSIsInBlcl9wYWdlIiwic2xpY2UiLCJ3cmFwcGVkSXRlbXMiLCJ3cmFwQWxsV2l0aEhUTUwiLCJwYWdlTnVtYmVyIiwiUHJvbWlzZSIsInJlc29sdmUiLCJyZWplY3QiLCJub3RJblBhZ2VSYW5nZSIsInhociIsIlhNTEh0dHBSZXF1ZXN0IiwiQWN0aXZlWE9iamVjdCIsIm9wZW4iLCJzZXRSZXF1ZXN0SGVhZGVyIiwib25yZWFkeXN0YXRlY2hhbmdlIiwicmVhZHlTdGF0ZSIsInN0YXR1cyIsImN1cnJlbnRJdGVtcyIsIkpTT04iLCJwYXJzZSIsInJlc3BvbnNlVGV4dCIsInByb2R1Y3QiLCJBZnRlckxvYWRlZCIsInN0YXR1c1RleHQiLCJzZW5kIiwidGFnVHlwZSIsIm1hcCIsImluZGV4IiwiaXRlbSIsIm92ZXJsYXkiLCJpbmRleE9mIiwidGFnIiwiaW1hZ2UiLCJrZWJhYkNhc2UiLCJ0ZW1wIiwiYWRkU3R5bGUiLCJTZXJ2aWNlcyIsImRlZmF1bHRTZXR0aW5ncyQzIiwidG90YWxfaXRlbXMiLCJDb250YWluZXIkMyIsIlBhZ2luYXRpb24iLCJ0b3RhbFBhZ2VzIiwiY2FsY3VsYXRlVG90YWxQYWdlcyIsInJlcGxhY2VMaW5rcyIsImxpbmtzIiwiY3JlYXRlTGlua3MiLCJiaW5kRXZlbnRMaXN0ZW5lcnMiLCJ0b3RhbEl0ZW1zIiwicGFyc2VJbnQiLCJNYXRoIiwiY2VpbCIsIm5leHQiLCJjaGlsZE5vZGVzIiwib25jbGljayIsImV2ZW50IiwicHJldmVudERlZmF1bHQiLCJjdXJyZW50IiwicHJvZHVjdHMiLCJzZXRDdXJyZW50IiwicHJldmlvdXMiLCJwYWdlcyIsImdldEF0dHJpYnV0ZSIsImNoYW5nZVVybCIsInVsIiwiY3JlYXRlUGFnZUxpbmtzIiwiY3JlYXRlUHJldmlvdXNCdXR0b24iLCJjcmVhdGVOZXh0QnV0dG9uIiwiZm9yRWFjaCIsInBhZ2UiLCJwYWdlSXRlbSIsImxpbmsiLCJwdXNoIiwibGkiLCJzcGFuMSIsInNwYW4yIiwiaXNOYU4iLCJHRVRfVmFycyIsImhpc3RvcnkiLCJyZXBsYWNlU3RhdGUiLCJ1cGRhdGVVUkxQYXJhbWV0ZXIiLCJsb2NhdGlvbiIsImhyZWYiLCJ2YXJzIiwicGFydHMiLCJtIiwidmFsdWUiLCJwYXJhbSIsInBhcmFtVmFsIiwibmV3QWRkaXRpb25hbFVSTCIsInRlbXBBcnJheSIsImJhc2VVUkwiLCJhZGRpdGlvbmFsVVJMIiwicm93c1RleHQiLCJpbml0YWxpemVkIiwiZGVmYXVsdFNldHRpbmdzIiwiY2FydFNlc3Npb25JZCIsImltcG9ydEJvb3RzdHJhcCIsImNvbXBvbmVudHMiLCJpbml0YWxpemUiLCJiaW5kQ29tcG9uZW50c0RlcGVuZGVuY2llcyIsIlByb3h5IiwiZ2V0IiwidGFyZ2V0IiwibWFrZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLElBQUlBLFlBQWEsWUFBWTtBQUM3Qjs7QUFENkIsS0FHdkJDLEdBSHVCO0FBQUE7QUFBQTtBQUFBOztBQUFBO0FB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QyxFQUFnRDtBQUMvQyxNQUFJM0gsWUFBWSxLQUFLQSxTQUFyQjs7QUFFQUEsWUFBVXJCLElBQVYsQ0FBZSxRQUFmLEVBQXlCLFlBQVc7QUFDbkMsVUFBTyxJQUFJb0IsTUFBSixDQUFXQyxTQUFYLENBQVA7QUFDQSxHQUZEOztBQUlBQSxZQUFVckIsSUFBVixDQUFlLFVBQWYsRUFBMkIsWUFBVztBQUNyQyxVQUFPLElBQUltRixRQUFKLENBQWE5RCxTQUFiLENBQVA7QUFDQSxHQUZEOztBQUlBQSxZQUFVckIsSUFBVixDQUFlLFlBQWYsRUFBNkIsWUFBVztBQUN2QyxVQUFPLElBQUl1RixVQUFKLENBQWVsRSxTQUFmLENBQVA7QUFDQSxHQUZEOztBQUlBQSxZQUFVckIsSUFBVixDQUFlLFVBQWYsRUFBMkIsWUFBVztBQUNyQyxVQUFPLElBQUlrQyxRQUFKLENBQWFiLFNBQWIsRUFBd0JBLFVBQVVpSSxJQUFWLENBQWUsWUFBZixDQUF4QixDQUFQO0FBQ0EsR0FGRDtBQUdBOztBQUVELFFBQU9uTixTQUFQO0FBRUMsQ0E1aENnQixFQUFqQiIsImZpbGUiOiJlQ29tbWVyY2UuanMiLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgZUNvbW1lcmNlID0gKGZ1bmN0aW9uICgpIHtcbid1c2Ugc3RyaWN0JztcblxuY2xhc3MgRE9NXHJcbntcclxuXHQvKipcclxuXHQgKiBNaW5pZmllcyB0aGUgY3NzIHRleHQuXHJcblx0ICovXHJcblx0c3RhdGljIG1pbmlmeUNzcyhzdHJpbmcpIFxyXG5cdHtcclxuXHQgICAgc3RyaW5nID0gc3RyaW5nLnJlcGxhY2UoL1xcL1xcKig/Oig/IVxcKlxcLylbXFxzXFxTXSkqXFwqXFwvfFtcXHJcXG5cXHRdKy9nLCAnJyk7XHJcblx0ICAgIHN0cmluZyA9IHN0cmluZy5yZXBsYWNlKC8gezIsfS9nLCAnICcpO1xyXG5cdCAgICBzdHJpbmcgPSBzdHJpbmcucmVwbGFjZSgvKFt7On1dKS9nLCAnJDEnKTtcclxuXHQgICAgc3RyaW5nID0gc3RyaW5nLnJlcGxhY2UoLyhbOyxdKSAvZywgJyQxJyk7XHJcblx0ICAgIHN0cmluZyA9IHN0cmluZy5yZXBsYWNlKC8gIS9nLCAnIScpO1xyXG5cdCAgICBcclxuXHQgICAgcmV0dXJuIHN0cmluZztcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEFkZHMgY2xhc3MgdG8gYSBnaXZlbiBlbGVtZW50LlxyXG5cdCAqL1xyXG5cdHN0YXRpYyBhZGRDbGFzcyhlbGVtZW50LCBjbGFzc05hbWUpIFxyXG5cdHtcclxuXHRcdGlmKGNsYXNzTmFtZSA9PSAnJykgcmV0dXJuIGVsZW1lbnQ7XHJcblxyXG5cdFx0Y2xhc3NOYW1lID0gY2xhc3NOYW1lLnRyaW0oKTtcclxuXHRcdGNsYXNzTmFtZSA9IGNsYXNzTmFtZS5zcGxpdCgnICcpO1xyXG5cclxuXHRcdGZvcih2YXIgaSA9IDA7IGkgPCBjbGFzc05hbWUubGVuZ3RoOyBpKyspIHtcclxuXHRcdFx0ZWxlbWVudC5jbGFzc0xpc3QuYWRkKGNsYXNzTmFtZVtpXSk7XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIGVsZW1lbnQ7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBSZW1vdmVzIGNsYXNzIGZyb20gYSBnaXZlbiBlbGVtZW50LlxyXG5cdCAqL1xyXG5cdHN0YXRpYyByZW1vdmVDbGFzcyhlbGVtZW50LCBjbGFzc05hbWUpIFxyXG5cdHtcclxuXHRcdGVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShjbGFzc05hbWUpO1xyXG5cdFx0XHJcblx0XHRyZXR1cm4gZWxlbWVudDtcclxuXHR9XHJcblxyXG5cdHN0YXRpYyBlbGVtZW50KHNlbGVjdG9yKSBcclxuXHR7XHJcblx0XHRsZXQgZWxlbWVudCA9IHF1ZXJ5RWxlbWVudChzZWxlY3Rvcik7XHJcblx0XHRyZXR1cm4gZWxlbWVudDtcclxuXHR9XHJcblxyXG5cdHN0YXRpYyBhZGRTdHlsZShpZCwgY3NzKSBcclxuXHR7XHJcblx0XHRpZih0eXBlb2YgY3NzICE9ICdzdHJpbmcnKSB7XHJcblx0XHRcdHRocm93IG5ldyBpbnZhbGlkQXJndW1lbnRFeGNlcHRpb247XHJcblx0XHR9XHJcblxyXG5cdFx0bGV0IGhlYWQgPSBkb2N1bWVudC5oZWFkIHx8IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdoZWFkJylbMF07XHJcblx0XHRsZXQgc3R5bGVUYWcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzdHlsZScpO1xyXG5cclxuXHRcdC8vIHBpcGUgaXQgdGhyb3VnaCB0aGUgbWluZmllclxyXG5cdCAgICBsZXQgQ1NTID0gdGhpcy5taW5pZnlDc3MoY3NzKTtcclxuXHQgICAgLy8gYWRkaW5nIGl0IHRvIHRoZSBzdHlsZXRhZ1xyXG5cdCAgICBzdHlsZVRhZy5pbm5lckhUTUwgPSBDU1M7XHJcblx0ICAgIC8vIGdpdmUgYW4gaWQgdG8gcmVjb2duaXplIHRoZSBzdHlsZSB0YWdcclxuXHRcdHN0eWxlVGFnLnNldEF0dHJpYnV0ZSgnaWQnLCBpZCk7XHJcblx0XHQvLyBhcHBlbmRpbmcgdGhhdCBzdHlsZSB0YWcgdG8gdGhlIERPTSBoZWFkIHRhZ1xyXG5cdFx0aGVhZC5hcHBlbmRDaGlsZChzdHlsZVRhZyk7XHJcblx0fVxyXG59XHJcblxyXG4vKipcclxuICogUXVlcmllcyBhbiBlbGVtZW50IGZyb20gdGhlIERPTS5cclxuICovXHJcbmZ1bmN0aW9uIHF1ZXJ5RWxlbWVudChzZWxlY3Rvcikge1xyXG5cdGxldCBlbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihzZWxlY3RvcikgfHwgbnVsbDtcclxuXHJcblx0aWYoISBlbGVtZW50KSB7XHJcblx0XHR0aHJvdyBuZXcgTm9kZUVsZW1lbnREb2VzTm90RXhpc3RFeGNlcHRpb247XHJcblx0fVxyXG5cclxuXHRyZXR1cm4gZWxlbWVudDtcclxufVxuXG5jbGFzcyBFdmVudFxyXG57XHJcblx0LyoqXHJcblx0ICogTGlzdGVuIHRvIGFuIGV2ZW50LlxyXG5cdCAqL1xyXG5cdHN0YXRpYyBsaXN0ZW4obmFtZSwgY2FsbGJhY2spIHtcclxuXHRcdGlmICh0eXBlb2YgY2FsbGJhY2sgIT09ICdmdW5jdGlvbicpIHtcclxuXHRcdFx0dGhyb3cgbmV3IEludmFsaWRBcmd1bWVudEV4Y2VwdGlvbjtcclxuXHRcdH1cclxuXHJcblx0XHRldmVudHNbbmFtZV0gPSBjYWxsYmFjaztcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEZpcmVzIGFuIGV2ZW50LlxyXG5cdCAqL1xyXG5cdHN0YXRpYyB0cmlnZ2VyKG5hbWUsIGRhdGEpIHtcclxuXHRcdGRhdGEgPSBkYXRhIHx8IG51bGw7XHJcblxyXG5cdFx0aWYodHlwZW9mIGV2ZW50c1tuYW1lXSAhPT0gJ2Z1bmN0aW9uJykge1xyXG5cdFx0XHR0aHJvdyBuZXcgQmFkRXZlbnRDYWxsRXhjZXB0aW9uO1xyXG5cdFx0fVxyXG5cclxuXHRcdGlmKGRhdGEgIT0gbnVsbCAmJiBkYXRhIGluc3RhbmNlb2YgQXJyYXkpIHtcclxuXHRcclxuXHRcdFx0cmV0dXJuIGV2ZW50c1tuYW1lXSguLi5kYXRhKTtcclxuXHRcdH1cclxuXHJcblx0XHRldmVudHNbbmFtZV0oKTtcclxuXHR9XHJcbn1cblxuY2xhc3MgQ29tbW9uXHJcbntcclxuXHQvKipcclxuXHQgKiBFeHRlbmQgYW4gb2JqZWN0LlxyXG5cdCAqL1xyXG5cdHN0YXRpYyBleHRlbmQoY3VycmVudE9iaiwgbmV3T2JqICkge1xyXG5cdFx0dmFyIGV4dGVuZGVkID0ge307XHJcblx0ICAgIHZhciBwcm9wO1xyXG5cclxuXHQgICAgZm9yIChwcm9wIGluIGN1cnJlbnRPYmopIHtcclxuXHQgICAgICAgIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoY3VycmVudE9iaiwgcHJvcCkpIHtcclxuXHQgICAgICAgICAgICBleHRlbmRlZFtwcm9wXSA9IGN1cnJlbnRPYmpbcHJvcF07XHJcblx0ICAgICAgICB9XHJcblx0ICAgIH1cclxuXHJcblx0ICAgIGZvciAocHJvcCBpbiBuZXdPYmopIHtcclxuXHQgICAgICAgIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwobmV3T2JqLCBwcm9wKSkge1xyXG5cdCAgICAgICAgICAgIGV4dGVuZGVkW3Byb3BdID0gbmV3T2JqW3Byb3BdO1xyXG5cdCAgICAgICAgfVxyXG5cdCAgICB9XHJcblxyXG5cdCAgICByZXR1cm4gZXh0ZW5kZWQ7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBDaGVja3MgZm9yIGEgbmVlZGxlIGluIGh5c3RhY2suXHJcblx0ICovXHJcblx0c3RhdGljIGluX2FycmF5KG5lZWRsZSwgaHlzdGFjaykge1xyXG5cdFx0aWYoaHlzdGFjay5jb25zdHJ1Y3RvciAhPT0gQXJyYXkpIHJldHVybjtcclxuXHJcblx0XHRmb3IodmFyIGkgPSAwOyBpIDw9IGh5c3RhY2subGVuZ3RoOyBpKyspIHtcclxuXHRcdFx0aWYobmVlZGxlID09IGh5c3RhY2tbaV0pIHJldHVybiB0cnVlO1x0XHJcblx0XHR9XHJcblx0XHJcblx0XHRyZXR1cm4gZmFsc2U7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBDaGVja3MgaWYgYW4gb2JqZWN0IGlzIGVtcHR5LlxyXG5cdCAqL1xyXG5cdHN0YXRpYyBlbXB0eU9iamVjdChvYmplY3QpIHtcclxuXHRcdGZvcih2YXIgcHJvcCBpbiBvYmplY3QpIHtcclxuXHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiB0cnVlO1xyXG5cdH1cclxuXHJcblx0c3RhdGljIGNvbnRhaW5zT2JqZWN0KG9iamVjdCwgaHlzdGFjaykgXHJcblx0e1xyXG5cdCAgICB2YXIgaTtcclxuXHJcblx0ICAgIGZvciAoaSA9IDA7IGkgPCBoeXN0YWNrLmxlbmd0aDsgaSsrKSB7XHJcblx0ICAgICAgICBpZiAodHlwZW9mIG9iamVjdCA9PSAnc3RyaW5nJyAmJiBoeXN0YWNrW2ldLmNvbnN0cnVjdG9yLm5hbWUgPT09IG9iamVjdCkge1xyXG5cdCAgICAgICAgXHRyZXR1cm4gdHJ1ZTtcclxuXHQgICAgICAgIH1cclxuXHJcblx0ICAgICAgICBpZiAoaHlzdGFja1tpXSA9PT0gb2JqZWN0KSB7XHJcblx0ICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcblx0ICAgICAgICB9XHJcblx0ICAgIH1cclxuXHJcblx0ICAgIHJldHVybiBmYWxzZTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIENvbnZlcnQgY2FtZWxDYXNlIHRvIGtlYmFiLWNhc2UuXHJcblx0ICovXHJcblx0c3RhdGljIGtlYmFiQ2FzZShzdHJpbmcpIHtcclxuXHRcdHJldHVybiBzdHJpbmcucmVwbGFjZSgvKFthLXpdKShbQS1aXSkvZywgJyQxLSQyJykudG9Mb3dlckNhc2UoKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIENoZWNrcyBpZiBhIGdpdmVuIHBhcmFtZXRlciBpcyBhbiBvYmplY3QuXHJcblx0ICovXHJcblx0c3RhdGljIGlzT2JqZWN0KG9iamVjdCkge1xyXG5cdFx0cmV0dXJuIHR5cGVvZiBvYmplY3QgPT0gJ29iamVjdCc7XHJcblx0fVxyXG59XG5cbmNsYXNzIEludmFsaWRCaW5kaW5nRXhjZXB0aW9uXHJcbntcclxuXHRjb25zdHJ1Y3RvcigpIFxyXG5cdHsgXHJcbiAgICBcdGNvbnNvbGUuZXJyb3IoYCR7dGhpcy5jb25zdHJ1Y3Rvci5uYW1lfSwgdHJ5aW5nIHRvIGJpbmQgYW4gYWxyZWFkeSBleGlzdGluZyBib3VuZC5gKTtcclxuXHJcbiAgICBcdHRocm93IG5ldyBFcnJvcjtcclxuICAgIH1cclxufVxuXG5jbGFzcyBJbnZhbGlkQXJndW1lbnRFeGNlcHRpb24kMVxyXG57XHJcblx0Y29uc3RydWN0b3IoKSBcclxuXHR7IFxyXG4gICAgXHRjb25zb2xlLmVycm9yKGAke3RoaXMuY29uc3RydWN0b3IubmFtZX0sIHBhc3NpbmcgaW52YWxpZCBhcmd1bWVudHMuYCk7XHJcblxyXG4gICAgXHR0aHJvdyBuZXcgRXJyb3I7XHJcbiAgICB9XHJcbn1cblxubGV0IGluc3RhbmNlcyA9IFtdO1xyXG5cclxuY2xhc3MgQ29udGFpbmVyIFxyXG57XHJcblx0LyoqXHJcblx0ICogQmluZHMga2V5IHRvIGNvbmNyZXRlIGNsYXNzLlxyXG5cdCAqL1xyXG5cdGJpbmQoa2V5LCBjb25jcmV0ZSkgXHJcblx0e1xyXG5cdFx0aWYgKHR5cGVvZiBrZXkgIT0gJ3N0cmluZycgfHwgdHlwZW9mIGNvbmNyZXRlICE9ICdmdW5jdGlvbicpIHtcclxuXHRcdFx0dGhyb3cgbmV3IEludmFsaWRBcmd1bWVudEV4Y2VwdGlvbiQxO1xyXG5cdFx0fVxyXG5cclxuXHRcdGlmICh0eXBlb2YgdGhpc1trZXldICE9ICd1bmRlZmluZWQnKSB7XHJcblx0XHRcdHRocm93IG5ldyBJbnZhbGlkQmluZGluZ0V4Y2VwdGlvbjtcclxuXHRcdH1cclxuXHJcblx0XHR0aGlzW2tleV0gPSBjb25jcmV0ZTtcclxuXHRcdHRoaXNba2V5XS5iaW5kKGNvbmNyZXRlKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFNldHMgYW4gaW5zdGFuY2UuXHJcblx0ICovXHJcblx0c2V0SW5zdGFuY2Uoa2V5LCBpbnN0YW5jZSkgXHJcblx0e1xyXG5cdFx0aWYodHlwZW9mIGtleSAhPSAnc3RyaW5nJyB8fCB0eXBlb2YgaW5zdGFuY2UgIT0gJ29iamVjdCcpIHtcclxuXHRcdFx0dGhyb3cgbmV3IEludmFsaWRBcmd1bWVudEV4Y2VwdGlvbiQxO1xyXG5cdFx0fVxyXG5cclxuXHRcdGluc3RhbmNlc1trZXldID0gaW5zdGFuY2U7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBHZXRzIGFuIGluc3RhbmNlLlxyXG5cdCAqL1xyXG5cdGdldEluc3RhbmNlKGtleSkgXHJcblx0e1xyXG5cdFx0aWYodHlwZW9mIGtleSAhPSAnc3RyaW5nJykge1xyXG5cdFx0XHR0aHJvdyBuZXcgSW52YWxpZEFyZ3VtZW50RXhjZXB0aW9uJDE7XHJcblx0XHR9XHJcblxyXG5cdFx0aWYodHlwZW9mIGtleSA9PSAnb2JqZWN0Jykge1xyXG5cdFx0XHRyZXR1cm4gaW5zdGFuY2VzW2tleS5jb25zdHJ1Y3Rvci5uYW1lXSB8fCBudWxsO1xyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiBpbnN0YW5jZXNba2V5XSB8fCBudWxsO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQ2hlY2tzIGlmIGFuIGluc3RhbmNlIGV4aXN0LlxyXG5cdCAqL1xyXG5cdGluc3RhbmNlRXhpc3QoaW5zdGFuY2UpIFxyXG5cdHtcclxuXHRcdGlmKHR5cGVvZiBpbnN0YW5jZSA9PSAnb2JqZWN0Jykge1xyXG5cdFx0XHRyZXR1cm4gKHR5cGVvZiBpbnN0YW5jZXNbaW5zdGFuY2UuY29uc3RydWN0b3IubmFtZV0gIT09ICd1bmRlZmluZWQnKTtcclxuXHRcdH1cclxuXHRcdFxyXG5cdFx0XHJcblx0XHRyZXR1cm4gKGluc3RhbmNlIGluIGluc3RhbmNlcyk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBDcmVhdGVzIGFuIGluc3RhbmNlLlxyXG5cdCAqL1xyXG5cdG1ha2Uob2JqZWN0KVxyXG5cdHtcclxuXHRcdGxldCBpbnN0YW5jZSA9IHt9O1xyXG5cclxuXHRcdGlmICh0aGlzLmluc3RhbmNlRXhpc3Qob2JqZWN0KSkge1xyXG5cdFx0XHRyZXR1cm4gdGhpcy5nZXRJbnN0YW5jZShvYmplY3QpO1xyXG5cdFx0fVxyXG5cclxuXHRcdGlmICh0eXBlb2Ygb2JqZWN0ID09ICdvYmplY3QnKSB7XHJcblx0XHRcdGluc3RhbmNlID0gb2JqZWN0O1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0aW5zdGFuY2UgPSBuZXcgdGhpc1tvYmplY3RdO1x0XHJcblx0XHR9XHJcblxyXG5cdFx0dGhpcy5zZXRJbnN0YW5jZShvYmplY3QsIGluc3RhbmNlKTsgXHJcblxyXG5cdFx0cmV0dXJuIGluc3RhbmNlO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogUmV0cmlldmUgYWxsIGluc3RhbmNlcy5cclxuXHQgKi9cclxuXHRpbnN0YW5jZXMoKSBcclxuXHR7XHJcblx0XHRyZXR1cm4gaW5zdGFuY2VzO1xyXG5cdH1cclxufVxuXG5jbGFzcyBDb21wb25lbnRzRXhjZXB0aW9uXHJcbntcclxuXHRjb25zdHJ1Y3RvcigpIFxyXG5cdHsgXHJcbiAgICBcdGNvbnNvbGUuZXJyb3IoYCR7dGhpcy5jb25zdHJ1Y3Rvci5uYW1lfSwgZXhwZWN0aW5nIGZvciBhdCBsZWFzdCBvbmUgY29tcG9uZW50cywgYnV0IG5vbmUgd2FzIGdpdmVuLCBcclxuXHRcdFx0XHRcdFx0XHRcdHBsZWFzZSBhZGQgYXQgbGVhc3Qgb25lIHJlcXVpcmVtZW50KFByb2R1Y3RzLCBTZXJ2aWNlcyBvci9hbmQgRmlsdGVyYCk7XHJcblxyXG4gICAgXHR0aHJvdyBuZXcgRXJyb3I7XHJcbiAgICB9XHJcbn1cblxuY2xhc3MgQmFkRXZlbnRDYWxsRXhjZXB0aW9uJDFcclxue1xyXG5cdGNvbnN0cnVjdG9yKCkgXHJcblx0eyBcclxuICAgIFx0Y29uc29sZS5lcnJvcihgJHt0aGlzLmNvbnN0cnVjdG9yLm5hbWV9LCBsaXN0ZW5pbmcgdG8gYSBub25lLWV4aXN0aW5nIGV2ZW50YCk7XHJcblxyXG4gICAgXHR0aHJvdyBuZXcgRXJyb3I7XHJcbiAgICB9XHJcbn1cblxuY2xhc3MgQ29tcG9uZW50Tm90UmVnaXN0ZXJlZEV4Y2VwdGlvblxyXG57XHJcblx0Y29uc3RydWN0b3IoKSBcclxuXHR7IFxyXG4gICAgXHRjb25zb2xlLmVycm9yKGAke3RoaXMuY29uc3RydWN0b3IubmFtZX0sIGNvbXBvbmVudHMgbXVzdCBiZSByZWdpc3RlcmVkIGluIG9yZGVyIHRvIHVzZSB0aGVtYCk7XHJcblxyXG4gICAgXHR0aHJvdyBuZXcgRXJyb3I7XHJcbiAgICB9XHJcbn1cblxuY2xhc3MgTm9kZUVsZW1lbnREb2VzTm90RXhpc3RFeGNlcHRpb24kMVxyXG57XHJcblx0Y29uc3RydWN0b3IoKSBcclxuXHR7IFxyXG4gICAgXHRjb25zb2xlLmVycm9yKGAke3RoaXMuY29uc3RydWN0b3IubmFtZX0sIHRyeWluZyB0byBmZXRjaCBhbiBub25lLWV4aXN0aW5nIGVsZW1lbnQgZnJvbSB0aGUgRE9NYCk7XHJcblxyXG4gICAgXHR0aHJvdyBuZXcgRXJyb3I7XHJcbiAgICB9XHJcbn1cblxuY2xhc3MgRXhjZXB0aW9uSGFuZGxlclxyXG57XHJcblx0LyoqXHJcblx0ICogSGFuZGxlIGFsbCB0aGUgZXJyb3JzXHJcblx0ICovXHJcblx0c3RhdGljIGluaXRhbGl6ZSgpIHtcdFxyXG5cdFx0d2luZG93Lm9uZXJyb3IgPSBmdW5jdGlvbihtZXNzYWdlLCBzb3VyY2UsIGxpbmVubywgY29sbm8sIGVycm9yKSB7XHJcblxyXG5cdFx0XHRpZiAoZXJyb3IgaW5zdGFuY2VvZiBJbnZhbGlkQXJndW1lbnRFeGNlcHRpb24kMSkge1xyXG5cdFx0XHRcdC8vIGhhbmRsZVxyXG5cdFx0XHR9IGVsc2UgaWYgKGVycm9yIGluc3RhbmNlb2YgSW52YWxpZEJpbmRpbmdFeGNlcHRpb24pIHtcclxuXHRcdFx0XHQvLyBoYW5kbGVcclxuXHRcdFx0fSBlbHNlIGlmIChlcnJvciBpbnN0YW5jZW9mIEJhZEV2ZW50Q2FsbEV4Y2VwdGlvbiQxKSB7XHJcblx0XHRcdFx0Ly8gaGFuZGxlXHJcblx0XHRcdH0gZWxzZSBpZiAoZXJyb3IgaW5zdGFuY2VvZiBDb21wb25lbnRzRXhjZXB0aW9uKSB7XHJcblx0XHRcdFx0Ly8gaGFuZGxlXHJcblx0XHRcdH0gZWxzZSBpZiAoZXJyb3IgaW5zdGFuY2VvZiBDb21wb25lbnROb3RSZWdpc3RlcmVkRXhjZXB0aW9uKSB7XHJcblx0XHRcdFx0Ly8gaGFuZGxlXHJcblx0XHRcdH0gZWxzZSBpZiAoZXJyb3IgaW5zdGFuY2VvZiBOb2RlRWxlbWVudERvZXNOb3RFeGlzdEV4Y2VwdGlvbiQxKSB7XHJcblx0XHRcdFx0XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRyZXR1cm4gdHJ1ZTtcclxuXHRcdH07XHJcblx0fVxyXG59XG5cbi8qKlxyXG4gKiBUaGUgZGVmYXVsdCBzZXR0aW5ncyBvZiB0aGUgZmlsdGVyLlxyXG4gKi9cclxubGV0IGRlZmF1bHRTZXR0aW5ncyQxID0ge1xyXG5cdGVsZW1lbnQ6ICcuZmlsdGVyJyxcclxuXHRkYXRhOiB7fSxcclxuXHRjbGFzczogJ2NvbC14cy0yJyxcclxuXHR3aWR0aDogJycsXHJcblx0aGVpZ2h0OiAnJyxcclxufTtcclxuXHJcblxyXG4vKipcclxuICogVGhlIEZpbHRlciBPYmplY3QsIGhhbmRsZXMgdGhlIGZpbHRlciBvZiB0aGUgcHJvZHVjdHMvc2VydmljZXMuXHJcbiAqL1xyXG5jbGFzcyBGaWx0ZXIgXHJcbntcclxuXHRjb25zdHJ1Y3Rvcihjb250YWluZXIpIFxyXG5cdHtcclxuXHRcdHRoaXMuc2V0dXAoZGVmYXVsdFNldHRpbmdzJDEpO1xyXG5cdH1cclxuXHJcblx0c2V0dXAoc2V0dGluZ3MpXHJcblx0e1xyXG5cdFx0aWYodHlwZW9mIHNldHRpbmdzICE9ICdvYmplY3QnKSB7XHJcblx0XHRcdHRocm93IG5ldyBJbnZhbGlkQXJndW1lbnRFeGNlcHRpb24kMTtcclxuXHRcdH1cclxuXHJcblx0XHR0aGlzLnNldHRpbmdzID0gQ29tbW9uLmV4dGVuZChkZWZhdWx0U2V0dGluZ3MkMSwgc2V0dGluZ3MpO1xyXG5cclxuXHRcdHRoaXMuc2V0RWxlbWVudCh0aGlzLnNldHRpbmdzLmVsZW1lbnQpO1xyXG5cdH1cclxuXHJcblx0c2V0RWxlbWVudChzZWxlY3RvcilcclxuXHR7XHJcblx0XHR0aGlzLndyYXBwZXIgPSBET00uZWxlbWVudChzZWxlY3Rvcik7XHJcblx0XHRcclxuXHRcdERPTS5hZGRDbGFzcyh0aGlzLndyYXBwZXIsIHRoaXMuc2V0dGluZ3MuY2xhc3MpO1xyXG5cdH1cclxufVxuXG4vKipcclxuICogVGhlIGRlZmF1bHQgc2V0dGluZ3Mgb2YgZWFjaCBwcm9kdWN0LlxyXG4gKi9cclxubGV0IGRlZmF1bHRTZXR0aW5ncyQyID0ge1xyXG5cdGVsZW1lbnQ6ICcucHJvZHVjdHMnLFxyXG5cdGNsYXNzOiAnJyxcclxuXHRpdGVtX2NsYXNzOiAnJyxcclxuXHR3aWR0aDogJzIwMHB4JyxcclxuXHRoZWlnaHQ6ICcyNTBweCcsXHJcblx0YXR0cmlidXRlczogWyduYW1lJywgJ3ByaWNlJywgJ2RlbGl2ZXJ5VGltZScsICdpbWFnZSddLFxyXG5cdHVybDogJ3Byb2R1Y3RzLnBocCcsXHJcblx0aW5pdF9zdGF0aWNfZGF0YToge30sXHJcbn07XHJcblxyXG4vKipcclxuICogU3RvcmVzIHRoZSBjb250YWluZXIgb2JqZWN0LlxyXG4gKi9cclxubGV0IENvbnRhaW5lciQyO1xyXG5cclxuLyoqXHJcbiAqIFRoZSBQcm9kdWN0cyBPYmplY3QsIGhhbmRsZXMgdGhlIHByb2R1Y3RzLlxyXG4gKi9cclxuY2xhc3MgUHJvZHVjdHMgXHJcbntcclxuXHQvKipcclxuXHQgKiBJbml0YWxpemUgdGhlIENvbnRhaW5lciBhbmQgdGhlIHBhZ2luYXRvci5cclxuXHQgKi9cclxuXHRjb25zdHJ1Y3Rvcihjb250YWluZXIsIHBhZ2luYXRvcikgXHJcblx0e1xyXG5cdFx0dGhpcy5zZXR1cChkZWZhdWx0U2V0dGluZ3MkMik7XHJcblxyXG5cdFx0Q29udGFpbmVyJDIgPSBjb250YWluZXI7XHJcblx0XHR0aGlzLnBhZ2luYXRvciA9IHBhZ2luYXRvcjtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFNldHMgdGhlIGdpdmVuIHNldHRpbmdzIGZyb20gdGhlIHVzZXIuXHJcblx0ICovXHJcblx0c2V0dXAoc2V0dGluZ3MpXHJcblx0e1xyXG5cdFx0aWYgKHR5cGVvZiBzZXR0aW5ncyAhPSAnb2JqZWN0Jykge1xyXG5cdFx0XHR0aHJvdyBuZXcgSW52YWxpZEFyZ3VtZW50RXhjZXB0aW9uJDE7XHJcblx0XHR9XHJcblxyXG5cdFx0dGhpcy5zZXR0aW5ncyA9IENvbW1vbi5leHRlbmQoZGVmYXVsdFNldHRpbmdzJDIsIHNldHRpbmdzKTtcclxuXHJcblx0XHR0aGlzLnNldEVsZW1lbnQodGhpcy5zZXR0aW5ncy5lbGVtZW50KTtcclxuXHJcblx0XHR0aGlzLmFkZFN0eWxlVGFnKCk7XHRcclxuXHRcclxuXHRcdGlmICh0eXBlb2YgQ29udGFpbmVyJDIgPT0gJ3VuZGVmaW5lZCcpIHtcclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0fVxyXG5cclxuXHRcdGlmIChDb250YWluZXIkMi5pbnN0YW5jZUV4aXN0KCdQYWdpbmF0aW9uJykpIHtcclxuXHRcdFx0dGhpcy5wYWdpbmF0b3IucmVzZXQodGhpcy5zZXR0aW5ncy5pbml0X3N0YXRpY19kYXRhKTtcclxuXHRcdFx0bGV0IHJlcXVlc3QgPSB0aGlzLmdldFByb2R1Y3RzQnlQYWdlKHRoaXMucGFnaW5hdG9yLmdldEN1cnJlbnQoKSk7XHJcblx0XHRcdFxyXG5cdFx0XHRyZXF1ZXN0LnRoZW4oZnVuY3Rpb24oaXRlbXMpIHtcclxuXHRcdFx0XHR0aGlzLnJlcGxhY2VJdGVtcyhpdGVtcyk7XHJcblx0XHRcdH0uYmluZCh0aGlzKSkuY2F0Y2goZnVuY3Rpb24oZXJyb3IpIHtcclxuXHJcblx0XHRcdH0pO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogU2V0cyB0aGUgRE9NIGVsZW1lbnQgZm9yIHBvcHVsYXRpbmcgdGhlIHByb2R1Y3RzLlxyXG5cdCAqL1xyXG5cdHNldEVsZW1lbnQoc2VsZWN0b3IpXHJcblx0e1xyXG5cdFx0dGhpcy53cmFwcGVyID0gRE9NLmVsZW1lbnQoc2VsZWN0b3IpO1xyXG5cdFx0XHJcblx0XHRET00uYWRkQ2xhc3ModGhpcy53cmFwcGVyLCB0aGlzLnNldHRpbmdzLmNsYXNzKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFJlcGxhY2UgaXRlbXMgaW4gdGhlIGNvbnRhaW5lci5cclxuXHQgKi9cclxuXHRyZXBsYWNlSXRlbXMoaXRlbXMpIFxyXG5cdHtcclxuXHRcdGlmICghIEFycmF5LmlzQXJyYXkoaXRlbXMpIHx8IHR5cGVvZiBpdGVtc1swXSA9PSAnc3RyaW5nJykge1xyXG5cdFx0XHR0aHJvdyBuZXcgSW52YWxpZEFyZ3VtZW50RXhjZXB0aW9uJDE7XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKENvbnRhaW5lciQyLmluc3RhbmNlRXhpc3QoJ1BhZ2luYXRpb24nKSkge1xyXG5cdFx0XHRsZXQgcGVyUGFnZSA9IHRoaXMucGFnaW5hdG9yLnNldHRpbmdzLnBlcl9wYWdlO1xyXG5cdFx0XHRpdGVtcyA9IGl0ZW1zLnNsaWNlKDAsIHBlclBhZ2UpO1xyXG5cdFx0fVxyXG5cclxuXHRcdGxldCB3cmFwcGVkSXRlbXMgPSB0aGlzLndyYXBBbGxXaXRoSFRNTChpdGVtcywgdGhpcy5zZXR0aW5ncy5pdGVtX2NsYXNzLCAnZGl2Jyk7XHJcblxyXG5cdFx0dGhpcy53cmFwcGVyLmlubmVySFRNTCA9IHdyYXBwZWRJdGVtcztcclxuXHJcblx0XHRyZXR1cm4gaXRlbXM7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBNYWtlcyBhbiBBamF4IGNhbGwgdG8gdGhlIHNlcnZlci5cclxuXHQgKi9cclxuXHRnZXRQcm9kdWN0c0J5UGFnZShwYWdlTnVtYmVyKSBcclxuXHR7XHJcblx0XHRyZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XHJcblx0XHRcdGlmICh0aGlzLnBhZ2luYXRvci5ub3RJblBhZ2VSYW5nZShwYWdlTnVtYmVyKSkge1xyXG5cdFx0XHRcdHJldHVybiByZWplY3QoJ05vdCBpbiBwYWdpbmF0aW9uIHJhbmdlJyk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGxldCB4aHIgPSBuZXcgWE1MSHR0cFJlcXVlc3QgfHwgbmV3IEFjdGl2ZVhPYmplY3QoXCJNaWNyb3NvZnQuWE1MSFRUUFwiKTtcclxuXHJcblx0XHRcdHhoci5vcGVuKCdHRVQnLCB0aGlzLnNldHRpbmdzLnVybCArICc/cGFnZT0nICsgcGFnZU51bWJlciwgdHJ1ZSk7IFxyXG5cdFx0XHR4aHIuc2V0UmVxdWVzdEhlYWRlcignQ29udGVudC1UeXBlJywgJ2FwcGxpY2F0aW9uL2pzb24nKTtcclxuXHRcdFx0XHJcblx0XHRcdGxldCBpbnN0YW5jZSA9IHRoaXM7XHJcblxyXG5cdFx0XHR4aHIub25yZWFkeXN0YXRlY2hhbmdlID0gZnVuY3Rpb24oKSB7XHJcblx0XHRcdFx0aWYgKHRoaXMucmVhZHlTdGF0ZSA9PSA0KSB7XHJcblx0XHRcdFx0XHRpZiAodGhpcy5zdGF0dXMgPT0gMjAwKSB7XHJcblx0XHRcdFx0XHRcdGluc3RhbmNlLmN1cnJlbnRJdGVtcyA9IEpTT04ucGFyc2UodGhpcy5yZXNwb25zZVRleHQpO1xyXG5cdFx0XHRcdFx0XHJcblx0XHRcdFx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgaW5zdGFuY2UuY3VycmVudEl0ZW1zLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdFx0XHRcdFx0dmFyIHByb2R1Y3QgPSBpbnN0YW5jZS5jdXJyZW50SXRlbXNbaV07XHJcblx0XHRcdFx0XHRcdFx0aW5zdGFuY2UuQWZ0ZXJMb2FkZWQuY2FsbCh0aGlzLCBwcm9kdWN0KTtcclxuXHRcdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRcdFx0cmVzb2x2ZShpbnN0YW5jZS5jdXJyZW50SXRlbXMpO1xyXG5cdFx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdFx0cmVqZWN0KHRoaXMuc3RhdHVzVGV4dCk7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9O1xyXG5cclxuXHRcdFx0eGhyLm9uZXJyb3IgPSBmdW5jdGlvbihlcnJvcikge1xyXG5cdFx0XHRcdHJlamVjdChlcnJvcik7XHJcblx0XHRcdH07XHJcblxyXG5cdFx0XHR4aHIuc2VuZChudWxsKTtcclxuXHRcdH0uYmluZCh0aGlzKSk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBXcmFwIGFsbCB0aGUgaXRlbXMgd2l0aCBzcGVjaWZjIHRhZyBhbmQgY2xhc3NuYW1lLlxyXG5cdCAqL1xyXG5cdHdyYXBBbGxXaXRoSFRNTChpdGVtcywgY2xhc3NOYW1lLCB0YWdUeXBlKSBcclxuXHR7XHJcblx0XHRjbGFzc05hbWUgPSBjbGFzc05hbWUgfHwgbnVsbDtcclxuXHRcdGNsYXNzTmFtZSA9IChjbGFzc05hbWUpID8gJ3Byb2R1Y3QgJyArIGNsYXNzTmFtZSA6ICdwcm9kdWN0JztcclxuXHRcdFxyXG5cdFx0dmFyIHdyYXBwZWRJdGVtcyA9ICcnO1xyXG5cclxuXHRcdGl0ZW1zID0gaXRlbXMubWFwKGZ1bmN0aW9uKHByb2R1Y3QsIGluZGV4KSB7XHJcblx0XHRcdHZhciBpdGVtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCh0YWdUeXBlKTtcclxuXHRcdFx0aXRlbSA9IERPTS5hZGRDbGFzcyhpdGVtLCBjbGFzc05hbWUpO1xyXG5cclxuXHRcdFx0dmFyIG92ZXJsYXkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuXHRcdFx0b3ZlcmxheS5jbGFzc05hbWUgPSAncHJvZHVjdC1vdmVybGF5JztcclxuXHRcdFx0aXRlbS5hcHBlbmRDaGlsZChvdmVybGF5KTtcclxuXHJcblx0XHRcdGZvcih2YXIgcHJvcCBpbiBwcm9kdWN0KSB7XHJcblx0XHRcdFx0aWYodGhpcy5zZXR0aW5ncy5hdHRyaWJ1dGVzLmluZGV4T2YocHJvcCkgPT0gLTEpIHtcclxuXHRcdFx0XHRcdGNvbnRpbnVlO1xyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0dmFyIHRhZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQodGFnVHlwZSk7XHJcblxyXG5cdFx0XHRcdGlmKHByb3AgPT0gJ2ltYWdlJykge1xyXG5cdFx0XHRcdFx0dmFyIGltYWdlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW1nJyk7XHJcblx0XHRcdFx0XHRpbWFnZS5zZXRBdHRyaWJ1dGUoJ3NyYycsIHByb2R1Y3RbcHJvcF0pO1xyXG5cdFx0XHRcdFx0aXRlbS5hcHBlbmRDaGlsZChpbWFnZSk7XHJcblx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdHRhZy5pbm5lckhUTUwgPSBwcm9kdWN0W3Byb3BdIHx8ICcnO1xyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0dGFnLmNsYXNzTmFtZSA9ICdwcm9kdWN0LScgKyBDb21tb24ua2ViYWJDYXNlKHByb3ApO1xyXG5cdFx0XHRcdG92ZXJsYXkuYXBwZW5kQ2hpbGQodGFnKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0dmFyIHRlbXAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KHRhZ1R5cGUpO1xyXG5cdFx0XHR0ZW1wLmFwcGVuZENoaWxkKGl0ZW0pO1xyXG5cdFx0XHRcclxuXHRcdFx0d3JhcHBlZEl0ZW1zICs9IHRlbXAuaW5uZXJIVE1MICsgXCJcXG5cIjtcclxuXHJcblx0XHRcdHJldHVybiBwcm9kdWN0O1xyXG5cdFx0fS5iaW5kKHRoaXMpKTtcclxuXHJcblx0XHRyZXR1cm4gd3JhcHBlZEl0ZW1zO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQW4gZXZlbnQgZm9yIHRoZSBjbGllbnQgb2Ygd2hlbiB0aGUgcHJvZHVjdHMgYXMgYmVlbiBsb2FkZWQuXHJcblx0ICovXHJcblx0QWZ0ZXJMb2FkZWQocHJvZHVjdCkgXHJcblx0e1xyXG5cdFx0Ly9cclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEFkZCB0aGUgZUNvbW1lcmNlIHN0eWxlIHRhZ3MgdG8gdGhlIERPTS5cclxuXHQgKi9cclxuXHRhZGRTdHlsZVRhZygpIFxyXG5cdHtcclxuXHRcdGxldCBjc3MgPSBgXHJcblx0XHRcdC5wcm9kdWN0IHtcclxuXHRcdFx0XHRwb3NpdGlvbjogcmVsYXRpdmU7XHJcblx0XHRcdFx0bWFyZ2luOiA1cHggNXB4O1xyXG5cdFx0XHRcdGJvcmRlcjogMXB4IHNvbGlkICNlNGU0ZTQ7XHJcblx0XHRcdFx0d2lkdGg6ICR7dGhpcy5zZXR0aW5ncy53aWR0aH07XHJcblx0XHRcdFx0aGVpZ2h0OiAke3RoaXMuc2V0dGluZ3MuaGVpZ2h0fTtcclxuXHRcdFx0XHRjdXJzb3I6IHBvaW50ZXI7XHJcblx0XHRcdFx0Y29sb3I6ICNmZmZmZmY7XHJcblx0XHRcdFx0b3ZlcmZsb3c6IGhpZGRlbjtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0LnByb2R1Y3QgPiAucHJvZHVjdC1vdmVybGF5IHtcclxuXHRcdFx0XHRwb3NpdGlvbjogYWJzb2x1dGU7XHJcblx0XHRcdFx0dG9wOiAwO1xyXG5cdFx0XHRcdGxlZnQ6IDA7XHJcblx0XHRcdFx0d2lkdGg6IDEwMCU7XHJcblx0XHRcdFx0aGVpZ2h0OiAxMDAlO1xyXG5cdFx0XHRcdG9wYWNpdHk6IDAuNTtcclxuXHRcdFx0XHR6LWluZGV4OiA1O1xyXG5cdFx0XHRcdHRyYW5zaXRpb246IDFzIGFsbDtcclxuXHRcdFx0XHR0cmFuc2Zvcm06IHRyYW5zbGF0ZVgoLTI1MHB4KTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0LnByb2R1Y3Q6aG92ZXIgPiAucHJvZHVjdC1vdmVybGF5IHtcclxuXHRcdFx0XHRiYWNrZ3JvdW5kOiByZ2JhKDAsIDAsIDAsIDAuNDUpO1xyXG5cdFx0XHRcdHRyYW5zZm9ybTogdHJhbnNsYXRlWCgwcHgpO1xyXG5cdFx0XHRcdG9wYWNpdHk6IDE7XHJcblx0XHRcdFx0dHJhbnNpdGlvbjogMXMgYWxsO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHQucHJvZHVjdCA+IGltZyB7XHJcblx0XHRcdFx0cG9zaXRpb246IGFic29sdXRlO1xyXG5cdFx0XHRcdGxlZnQ6IDA7XHJcblx0XHRcdFx0dG9wOiAwO1xyXG5cdFx0XHRcdHdpZHRoOiAxMDAlO1xyXG5cdFx0XHRcdGhlaWdodDogMTAwJTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0LnByb2R1Y3QgPiAucHJvZHVjdC1pbWFnZSB7XHJcblx0XHRcdFx0ei1pbmRleDogMDtcclxuXHRcdFx0XHRwb3NpdGlvbjogYWJzb2x1dGU7XHJcblx0XHRcdFx0dG9wOiAwO1xyXG5cdFx0XHRcdGxlZnQ6IDA7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdC5wcm9kdWN0ID4gLnByb2R1Y3Qtb3ZlcmxheSA+IC5wcm9kdWN0LW5hbWUsIFxyXG5cdFx0XHQucHJvZHVjdCA+IC5wcm9kdWN0LW92ZXJsYXkgPiAucHJvZHVjdC1wcmljZSxcclxuXHRcdFx0LnByb2R1Y3QgPiAucHJvZHVjdC1vdmVybGF5ID4gLnByb2R1Y3QtZGVsaXZlcnktdGltZSB7XHJcblx0XHRcdFx0ei1pbmRleDogMTtcclxuXHRcdFx0XHRwb3NpdGlvbjogcmVsYXRpdmU7XHJcblx0XHRcdFx0dGV4dC1hbGlnbjogY2VudGVyO1xyXG5cdFx0XHRcdG1hcmdpbi10b3A6IDI1cHg7XHJcblx0XHRcdH1cclxuXHRcdGA7XHJcblx0ICAgIFxyXG5cdCAgICByZXR1cm4gRE9NLmFkZFN0eWxlKCdlQ29tbWVyY2UtUHJvZHVjdHMnLCBjc3MpO1xyXG5cdH1cclxufVxuXG4vKipcclxuICogVGhlIFNlcnZpY2VzIE9iamVjdCwgaGFuZGxlcyB0aGUgc2VydmljZXMuXHJcbiAqL1xyXG5jbGFzcyBTZXJ2aWNlcyBcclxue1xyXG5cclxufVxuXG4vKipcclxuICogVGhlIGRlZmF1bHQgc2V0dGluZ3Mgb2YgdGhlIHBhZ2luYXRpb24uXHJcbiAqL1xyXG5sZXQgZGVmYXVsdFNldHRpbmdzJDMgPSB7XHJcblx0ZWxlbWVudDogJy5wYWdpbmF0aW9uLWxpbmtzJyxcclxuXHRjbGFzczogJ2NvbC14cy1vZmZzZXQtNCBjb2wteHMtOCcsXHJcblx0cGVyX3BhZ2U6IDUsXHJcblx0dG90YWxfaXRlbXM6IDEwLFxyXG59O1xyXG5cclxuLyoqXHJcbiAqIFN0b3JlcyB0aGUgY29udGFpbmVyIG9iamVjdC5cclxuICovXHJcbmxldCBDb250YWluZXIkMztcclxuXHJcbi8qKlxyXG4gKiBUaGUgUGFnaW5hdGlvbiBPYmplY3QsIGhhbmRsZXMgdGhlIHBhZ2luYXRpb24uXHJcbiAqL1xyXG5jbGFzcyBQYWdpbmF0aW9uIFxyXG57XHJcblx0LyoqXHJcblx0ICogSW5pdGlhbGl6ZSB0aGUgY29udGFpbmVyIG9iamVjdCBhbmQgdGhlIGRlZmF1bHQgc2V0dGluZ3MuXHJcblx0ICovXHJcblx0Y29uc3RydWN0b3IoY29udGFpbmVyKSBcclxuXHR7XHJcblx0XHRDb250YWluZXIkMyA9IGNvbnRhaW5lcjtcclxuXHRcdHRoaXMuc2V0dXAoZGVmYXVsdFNldHRpbmdzJDMpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogU2V0IHRoZSBQYWdpbmF0aW9uIG9iamVjdCB1cC5cclxuXHQgKi9cclxuXHRzZXR1cChzZXR0aW5ncylcclxuXHR7XHJcblx0XHRpZih0eXBlb2Ygc2V0dGluZ3MgIT0gJ29iamVjdCcpIHtcclxuXHRcdFx0dGhyb3cgbmV3IEludmFsaWRBcmd1bWVudEV4Y2VwdGlvbiQxO1xyXG5cdFx0fVxyXG5cclxuXHRcdHRoaXMuc2V0dGluZ3MgPSBDb21tb24uZXh0ZW5kKGRlZmF1bHRTZXR0aW5ncyQzLCBzZXR0aW5ncyk7XHJcblxyXG5cdFx0dGhpcy50b3RhbFBhZ2VzID0gdGhpcy5jYWxjdWxhdGVUb3RhbFBhZ2VzKHRoaXMuc2V0dGluZ3MucGVyX3BhZ2UsIHRoaXMuc2V0dGluZ3MudG90YWxfaXRlbXMpO1xyXG5cdFx0dGhpcy5zZXRFbGVtZW50KHRoaXMuc2V0dGluZ3MuZWxlbWVudCk7XHJcblx0XHR0aGlzLnJlcGxhY2VMaW5rcyh0aGlzLmxpbmtzKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFNldHMgdGhlIHdyYXBwZXIgZWxlbWVudC5cclxuXHQgKi9cclxuXHRzZXRFbGVtZW50KHNlbGVjdG9yKVxyXG5cdHtcclxuXHRcdHRoaXMud3JhcHBlciA9IERPTS5lbGVtZW50KHNlbGVjdG9yKTtcclxuXHRcdFxyXG5cdFx0RE9NLmFkZENsYXNzKHRoaXMud3JhcHBlciwgdGhpcy5zZXR0aW5ncy5jbGFzcyk7XHJcblxyXG5cdFx0dGhpcy5saW5rcyA9IHRoaXMuY3JlYXRlTGlua3MoKTtcclxuXHRcdHRoaXMuYmluZEV2ZW50TGlzdGVuZXJzKHRoaXMubGlua3MpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogUmVwbGFjZXMgdGhlIGxpbmtzIGluIHRoZSB3cmFwcGVyLlxyXG5cdCAqL1xyXG5cdHJlcGxhY2VMaW5rcyhsaW5rcylcclxuXHR7XHJcblx0XHR0aGlzLndyYXBwZXIuaW5uZXJIVE1MID0gJyc7XHJcblx0XHR0aGlzLndyYXBwZXIuYXBwZW5kQ2hpbGQobGlua3MpO1xyXG5cdH1cclxuXHJcblx0Y2FsY3VsYXRlVG90YWxQYWdlcyhwZXJQYWdlLCB0b3RhbEl0ZW1zKVxyXG5cdHtcclxuXHRcdHBlclBhZ2UgPSBwYXJzZUludChwZXJQYWdlKTtcclxuXHRcdHRvdGFsSXRlbXMgPSBwYXJzZUludCh0b3RhbEl0ZW1zKTtcclxuXHJcblx0XHRyZXR1cm4gTWF0aC5jZWlsKHRvdGFsSXRlbXMgLyBwZXJQYWdlKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEJpbmRzIHRoZSBidXR0b25zIGV2ZW50cyBsaXN0ZW5lcnMuXHJcblx0ICovXHJcblx0YmluZEV2ZW50TGlzdGVuZXJzKGxpbmtzKSBcclxuXHR7XHJcblx0XHRsZXQgaW5zdGFuY2UgPSB0aGlzO1xyXG5cdFx0bGV0IFByb2R1Y3RzID0gQ29udGFpbmVyJDMuZ2V0SW5zdGFuY2UoJ1Byb2R1Y3RzJyk7XHJcblxyXG5cdFx0dGhpcy5uZXh0LmNoaWxkTm9kZXNbMF0ub25jbGljayA9IGZ1bmN0aW9uKGV2ZW50KSB7XHJcblx0XHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG5cdFx0XHRQcm9kdWN0cy5nZXRQcm9kdWN0c0J5UGFnZShpbnN0YW5jZS5jdXJyZW50KzEpLnRoZW4oZnVuY3Rpb24ocHJvZHVjdHMpIHtcclxuXHRcdFx0XHRQcm9kdWN0cy5yZXBsYWNlSXRlbXMocHJvZHVjdHMpO1xyXG5cdFx0XHR9KTtcclxuXHJcblx0XHRcdGluc3RhbmNlLnNldEN1cnJlbnQoaW5zdGFuY2UuY3VycmVudCsxKTtcclxuXHRcdH07XHJcblxyXG5cdFx0dGhpcy5wcmV2aW91cy5jaGlsZE5vZGVzWzBdLm9uY2xpY2sgPSBmdW5jdGlvbihldmVudCkge1xyXG5cdFx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdFx0XHRcclxuXHRcdFx0UHJvZHVjdHMuZ2V0UHJvZHVjdHNCeVBhZ2UoaW5zdGFuY2UuY3VycmVudC0xKS50aGVuKGZ1bmN0aW9uKHByb2R1Y3RzKSB7XHJcblx0XHRcdFx0UHJvZHVjdHMucmVwbGFjZUl0ZW1zKHByb2R1Y3RzKTtcclxuXHRcdFx0fSk7XHJcblxyXG5cdFx0XHRpbnN0YW5jZS5zZXRDdXJyZW50KGluc3RhbmNlLmN1cnJlbnQtMSk7XHJcblx0XHR9O1xyXG5cclxuXHRcdGZvcih2YXIgaSA9IDA7IGkgPCB0aGlzLnBhZ2VzLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdHRoaXMucGFnZXNbaV0uY2hpbGROb2Rlc1swXS5vbmNsaWNrID0gZnVuY3Rpb24oZXZlbnQpIHtcclxuXHRcdFx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdFx0XHRcdHZhciBwYWdlTnVtYmVyID0gdGhpcy5nZXRBdHRyaWJ1dGUoJ2RhdGEtcGFnZS1ucicpO1xyXG5cdFx0XHRcdFxyXG5cdFx0XHRcdFByb2R1Y3RzLmdldFByb2R1Y3RzQnlQYWdlKHBhZ2VOdW1iZXIpLnRoZW4oZnVuY3Rpb24ocHJvZHVjdHMpIHtcclxuXHRcdFx0XHRcdFByb2R1Y3RzLnJlcGxhY2VJdGVtcyhwcm9kdWN0cyk7XHJcblx0XHRcdFx0fSk7XHJcblx0XHRcdFx0XHJcblx0XHRcdFx0aW5zdGFuY2Uuc2V0Q3VycmVudChwYWdlTnVtYmVyKTtcclxuXHRcdFx0fTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFNldHMgdGhlIGN1cnJlbnQgcGFnZS5cclxuXHQgKi9cclxuXHRzZXRDdXJyZW50KHBhZ2VOdW1iZXIpIFxyXG5cdHtcclxuXHRcdGlmKHRoaXMubm90SW5QYWdlUmFuZ2UocGFnZU51bWJlcikpIHtcclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0fVxyXG5cclxuXHRcdHRoaXMuY3VycmVudCA9IHBhcnNlSW50KHBhZ2VOdW1iZXIpO1xyXG5cdFx0dGhpcy5jaGFuZ2VVcmwocGFnZU51bWJlcik7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBHZXRzIHRoZSBjdXJyZW50IHBhZ2UuXHJcblx0ICovXHJcblx0Z2V0Q3VycmVudCgpIFxyXG5cdHtcclxuXHRcdHJldHVybiB0aGlzLmN1cnJlbnQ7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBDcmVhdGVzIHRoZSBwYWdpbmF0aW9uIGxpbmtzLlxyXG5cdCAqL1xyXG5cdGNyZWF0ZUxpbmtzKCkgXHJcblx0e1x0XHJcblx0XHRsZXQgdWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd1bCcpO1xyXG5cdFx0XHJcblx0XHR0aGlzLnBhZ2VzID0gdGhpcy5jcmVhdGVQYWdlTGlua3MoKTtcclxuXHRcdHRoaXMucHJldmlvdXMgPSB0aGlzLmNyZWF0ZVByZXZpb3VzQnV0dG9uKCk7XHJcblx0XHR0aGlzLm5leHQgPSB0aGlzLmNyZWF0ZU5leHRCdXR0b24oKTtcclxuXHJcblx0XHR1bC5jbGFzc05hbWUgPSAncGFnaW5hdGlvbic7XHJcblx0XHR1bC5hcHBlbmRDaGlsZCh0aGlzLnByZXZpb3VzKTtcclxuXHJcblx0XHR0aGlzLnBhZ2VzLmZvckVhY2goZnVuY3Rpb24ocGFnZSkge1xyXG5cdFx0XHR1bC5hcHBlbmRDaGlsZChwYWdlKTtcclxuXHRcdH0pO1xyXG5cclxuXHRcdHVsLmFwcGVuZENoaWxkKHRoaXMubmV4dCk7XHJcblxyXG5cdFx0cmV0dXJuIHVsO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQ3JlYXRlcyB0aGUgcGFnZXMgaXRlbSBsaW5rcy5cclxuXHQgKi9cclxuXHRjcmVhdGVQYWdlTGlua3MoKSBcclxuXHR7XHJcblx0XHR2YXIgcGFnZXMgPSBbXTtcclxuXHJcblx0XHRmb3IodmFyIGkgPSAxOyBpIDw9IHRoaXMudG90YWxQYWdlczsgaSsrKSB7XHJcblx0XHRcdHZhciBwYWdlSXRlbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJyk7XHJcblx0XHRcdHZhciBsaW5rID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpO1xyXG5cdFx0XHRwYWdlSXRlbS5jbGFzc05hbWUgPSAncGFnZS1pdGVtJztcclxuXHRcdFx0bGluay5jbGFzc05hbWUgPSAncGFnZS1saW5rJztcclxuXHRcdFx0bGluay5zZXRBdHRyaWJ1dGUoJ2hyZWYnLCAnP3BhZ2U9JysgaSk7XHJcblx0XHRcdGxpbmsuc2V0QXR0cmlidXRlKCdkYXRhLXBhZ2UtbnInLCBpKTtcclxuXHRcdFx0bGluay5pbm5lckhUTUwgPSBpO1xyXG5cdFx0XHRwYWdlSXRlbS5hcHBlbmRDaGlsZChsaW5rKTtcclxuXHRcdFx0cGFnZXMucHVzaChwYWdlSXRlbSk7XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIHBhZ2VzO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQ3JlYXRlcyB0aGUgcHJldmlvdXMgYnV0dG9uIGxpbmsuXHJcblx0ICovXHJcblx0Y3JlYXRlUHJldmlvdXNCdXR0b24oKSBcclxuXHR7XHJcblx0XHR2YXIgbGkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaScpO1xyXG5cdFx0dmFyIGxpbmsgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJyk7XHJcblx0XHR2YXIgc3BhbjEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XHJcblx0XHR2YXIgc3BhbjIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XHJcblx0XHRcclxuXHRcdFxyXG5cdFx0bGkuY2xhc3NOYW1lID0gJ3BhZ2UtaXRlbSc7XHJcblx0XHRsaW5rLmNsYXNzTmFtZSA9ICdwYWdlLWxpbmsnO1xyXG5cdFx0c3BhbjIuY2xhc3NOYW1lID0gJ3NyLW9ubHknO1xyXG5cclxuXHRcdGxpbmsuc2V0QXR0cmlidXRlKCdocmVmJywgJycpO1xyXG5cdFx0bGluay5zZXRBdHRyaWJ1dGUoJ2FyaWEtbGFiZWwnLCAnUHJldmlvdXMnKTtcclxuXHRcdHNwYW4xLnNldEF0dHJpYnV0ZSgnYXJpYS1oaWRkZW4nLCAndHJ1ZScpO1xyXG5cclxuXHRcdHNwYW4xLmlubmVySFRNTCA9ICcmbGFxdW87JztcclxuXHRcdHNwYW4yLmlubmVySFRNTCA9ICdQcmV2aW91cyc7XHJcblxyXG5cdFx0bGluay5hcHBlbmRDaGlsZChzcGFuMSk7XHJcblx0XHRsaW5rLmFwcGVuZENoaWxkKHNwYW4yKTtcclxuXHRcdGxpLmFwcGVuZENoaWxkKGxpbmspO1xyXG5cclxuXHRcdHJldHVybiBsaTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIENyZWF0ZXMgdGhlIG5leHQgYnV0dG9uIGxpbmsuXHJcblx0ICovXHJcblx0Y3JlYXRlTmV4dEJ1dHRvbigpIFxyXG5cdHtcclxuXHRcdHZhciBsaSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJyk7XHJcblx0XHR2YXIgbGluayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKTtcclxuXHRcdHZhciBzcGFuMSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcclxuXHRcdHZhciBzcGFuMiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcclxuXHRcdFxyXG5cdFx0bGkuY2xhc3NOYW1lID0gJ3BhZ2UtaXRlbSc7XHJcblx0XHRsaW5rLmNsYXNzTmFtZSA9ICdwYWdlLWxpbmsnO1xyXG5cdFx0c3BhbjIuY2xhc3NOYW1lID0gJ3NyLW9ubHknO1xyXG5cclxuXHRcdGxpbmsuc2V0QXR0cmlidXRlKCdocmVmJywgJycpO1xyXG5cdFx0bGluay5zZXRBdHRyaWJ1dGUoJ2FyaWEtbGFiZWwnLCAnTmV4dCcpO1xyXG5cdFx0c3BhbjEuc2V0QXR0cmlidXRlKCdhcmlhLWhpZGRlbicsICd0cnVlJyk7XHJcblxyXG5cdFx0c3BhbjEuaW5uZXJIVE1MID0gJyZyYXF1bzsnO1xyXG5cdFx0c3BhbjIuaW5uZXJIVE1MID0gJ05leHQnO1xyXG5cclxuXHRcdGxpbmsuYXBwZW5kQ2hpbGQoc3BhbjEpO1xyXG5cdFx0bGluay5hcHBlbmRDaGlsZChzcGFuMik7XHJcblx0XHRsaS5hcHBlbmRDaGlsZChsaW5rKTtcclxuXHJcblx0XHRyZXR1cm4gbGk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBDaGVja3MgaWYgdGhlIGdpdmVuIHBhZ2UgaXMgaW4gcmFuZ2UuXHJcblx0ICovXHJcblx0bm90SW5QYWdlUmFuZ2UocGFnZU51bWJlcikgXHJcblx0e1xyXG5cdFx0cmV0dXJuIChwYWdlTnVtYmVyID4gdGhpcy50b3RhbFBhZ2VzIHx8IHBhZ2VOdW1iZXIgPD0gMCkgfHwgaXNOYU4ocGFnZU51bWJlcik7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBDaGFuZ2VzIHRoZSB1cmwgdG8gYSBnaXZlbiBwYWdlIG51bWJlci5cclxuXHQgKi9cclxuXHRjaGFuZ2VVcmwocGFnZU51bWJlcikgXHJcblx0e1xyXG5cdFx0cGFnZU51bWJlciA9ICBwYWdlTnVtYmVyIHx8IEdFVF9WYXJzKClbJ3BhZ2UnXTtcclxuXHRcdHdpbmRvdy5oaXN0b3J5LnJlcGxhY2VTdGF0ZSgnJywgJycsIHRoaXMudXBkYXRlVVJMUGFyYW1ldGVyKHdpbmRvdy5sb2NhdGlvbi5ocmVmLCAncGFnZScsIHBhZ2VOdW1iZXIpKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEdldCB0aGUgZ2V0IHZhcmlhYmxlcyBmcm9tIHRoZSB1cmwuXHJcblx0ICovXHJcblx0R0VUX1ZhcnMoKSBcclxuXHR7XHJcblx0XHR2YXIgdmFycyA9IHt9O1xyXG5cdFx0dmFyIHBhcnRzID0gd2luZG93LmxvY2F0aW9uLmhyZWYucmVwbGFjZSgvWz8mXSsoW149Jl0rKT0oW14mXSopL2dpLCBmdW5jdGlvbihtLCBrZXksIHZhbHVlKSB7XHJcblx0XHRcdHZhcnNba2V5XSA9IHZhbHVlO1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0cmV0dXJuIHZhcnM7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBNb2RpZmllcyB0aGUgZ2V0IHBhcmFtZXRlciBpbiB0aGUgdXJsLlxyXG5cdCAqL1xyXG5cdHVwZGF0ZVVSTFBhcmFtZXRlcih1cmwsIHBhcmFtLCBwYXJhbVZhbCkgXHJcblx0e1xyXG5cdCAgICB2YXIgbmV3QWRkaXRpb25hbFVSTCA9IFwiXCI7XHJcblx0ICAgIHZhciB0ZW1wQXJyYXkgPSB1cmwuc3BsaXQoXCI/XCIpO1xyXG5cdCAgICB2YXIgYmFzZVVSTCA9IHRlbXBBcnJheVswXTtcclxuXHQgICAgdmFyIGFkZGl0aW9uYWxVUkwgPSB0ZW1wQXJyYXlbMV07XHJcblx0ICAgIHZhciB0ZW1wID0gXCJcIjtcclxuXHJcblx0ICAgIGlmIChhZGRpdGlvbmFsVVJMKSB7XHJcblx0ICAgICAgICB0ZW1wQXJyYXkgPSBhZGRpdGlvbmFsVVJMLnNwbGl0KFwiJlwiKTtcclxuXHQgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGVtcEFycmF5Lmxlbmd0aDsgaSsrKXtcclxuXHQgICAgICAgICAgICBpZiAodGVtcEFycmF5W2ldLnNwbGl0KCc9JylbMF0gIT0gcGFyYW0pe1xyXG5cdCAgICAgICAgICAgICAgICBuZXdBZGRpdGlvbmFsVVJMICs9IHRlbXAgKyB0ZW1wQXJyYXlbaV07XHJcblx0ICAgICAgICAgICAgICAgIHRlbXAgPSBcIiZcIjtcclxuXHQgICAgICAgICAgICB9XHJcblx0ICAgICAgICB9XHJcblx0ICAgIH1cclxuXHJcblx0ICAgIHZhciByb3dzVGV4dCA9IHRlbXAgKyBcIlwiICsgcGFyYW0gKyBcIj1cIiArIHBhcmFtVmFsO1xyXG5cdCAgICByZXR1cm4gYmFzZVVSTCArIFwiP1wiICsgbmV3QWRkaXRpb25hbFVSTCArIHJvd3NUZXh0O1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogUmVzZXRzIHRoZSBwYWdpbmF0aW9uLlxyXG5cdCAqL1xyXG5cdHJlc2V0KCkgXHJcblx0e1xyXG5cdFx0dGhpcy5zZXRDdXJyZW50KDEpO1xyXG5cdFx0dGhpcy5jaGFuZ2VVcmwoMSk7XHJcblx0fVxyXG59XG5cbmxldCBpbml0YWxpemVkID0gZmFsc2U7XG5cbmxldCBkZWZhdWx0U2V0dGluZ3MgPSB7XG5cdGNhcnRTZXNzaW9uSWQ6IFtdLFxuXHRpbXBvcnRCb290c3RyYXA6IGZhbHNlLFxuXHRjb21wb25lbnRzOiBbJ1Byb2R1Y3RzJywgJ1NlcnZpY2VzJywgJ0ZpbHRlcicsICdQYWdpbmF0aW9uJ11cbn07XG5cbmNsYXNzIGVDb21tZXJjZVxue1xuXHRjb25zdHJ1Y3RvcihzZXR0aW5ncylcblx0e1xuXHRcdEV4Y2VwdGlvbkhhbmRsZXIuaW5pdGFsaXplKCk7XG5cblx0XHRpZih0eXBlb2Ygc2V0dGluZ3MgIT0gJ29iamVjdCcpIHtcblx0XHRcdHRocm93IG5ldyBJbnZhbGlkQXJndW1lbnRFeGNlcHRpb24kMTtcblx0XHR9XG5cblx0XHR0aGlzLmNvbnRhaW5lciA9IG5ldyBDb250YWluZXI7XG5cdFx0dGhpcy5zZXR0aW5ncyA9IENvbW1vbi5leHRlbmQoZGVmYXVsdFNldHRpbmdzLCBzZXR0aW5ncyk7XG5cdFx0XG5cdFx0YmluZENvbXBvbmVudHNEZXBlbmRlbmNpZXMuY2FsbCh0aGlzLCBzZXR0aW5ncy5jb21wb25lbnRzKTtcblxuXHRcdGluaXRhbGl6ZWQgPSB0cnVlO1xuXG5cdFx0cmV0dXJuIG5ldyBQcm94eSh0aGlzLCB7XG5cdFx0XHRnZXQ6IGZ1bmN0aW9uKHRhcmdldCwgb2JqZWN0KSB7XG5cdFx0XHRcdHJldHVybiB0YXJnZXQuY29udGFpbmVyLm1ha2Uob2JqZWN0KTtcblx0XHRcdH1cblx0XHR9KTtcblx0fVxufVxuXG4vKipcbiAqIEJpbmRzIGNvbXBvbmVudHMgZGVwZW5kZW5jaWVzLlxuICovXG5mdW5jdGlvbiBiaW5kQ29tcG9uZW50c0RlcGVuZGVuY2llcyhjb21wb25lbnRzKSB7XG5cdGxldCBjb250YWluZXIgPSB0aGlzLmNvbnRhaW5lcjtcblxuXHRjb250YWluZXIuYmluZCgnRmlsdGVyJywgZnVuY3Rpb24oKSB7XG5cdFx0cmV0dXJuIG5ldyBGaWx0ZXIoY29udGFpbmVyKTtcblx0fSk7XG5cdFxuXHRjb250YWluZXIuYmluZCgnU2VydmljZXMnLCBmdW5jdGlvbigpIHsgXG5cdFx0cmV0dXJuIG5ldyBTZXJ2aWNlcyhjb250YWluZXIpO1xuXHR9KTtcblxuXHRjb250YWluZXIuYmluZCgnUGFnaW5hdGlvbicsIGZ1bmN0aW9uKCkge1xuXHRcdHJldHVybiBuZXcgUGFnaW5hdGlvbihjb250YWluZXIpO1xuXHR9KTtcblxuXHRjb250YWluZXIuYmluZCgnUHJvZHVjdHMnLCBmdW5jdGlvbigpIHtcblx0XHRyZXR1cm4gbmV3IFByb2R1Y3RzKGNvbnRhaW5lciwgY29udGFpbmVyLm1ha2UoJ1BhZ2luYXRpb24nKSk7XG5cdH0pO1xufVxuXG5yZXR1cm4gZUNvbW1lcmNlO1xuXG59KCkpO1xuIl19
