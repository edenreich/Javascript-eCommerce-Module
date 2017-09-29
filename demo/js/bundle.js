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
		itemClass: '',
		width: '200px',
		height: '250px',
		attributes: ['name', 'price', 'deliveryTime', 'image'],
		url: 'products.php',
		initStaticData: {}
	};

	var Container$2 = void 0;

	/**
  * The Products Object, handles the products.
  */

	var Products = function () {
		/**
   * Initalize the Container and the paginator
   */
		function Products(container, paginator) {
			_classCallCheck(this, Products);

			this.setup(defaultSettings$2);

			Container$2 = container;
			this.paginator = paginator;
		}

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
					this.paginator.reset(this.settings.initStaticData);
					var request = this.getProductsByPage(this.paginator.getCurrent());

					request.then(function (items) {
						this.replaceItems(items);
					}.bind(this)).catch(function (error) {});
				}
			}
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

				var wrappedItems = this.wrapAllWithHTML(items, this.settings.itemClass, 'div');

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
						console.log(this.status);
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
		}, {
			key: 'AfterLoaded',
			value: function AfterLoaded(products) {}
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
		total_pages: 3
	};

	var Container$3 = void 0;

	var Pagination = function () {
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

				this.setElement(this.settings.element);
				this.replaceLinks(this.links);
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

				this.current = pageNumber;
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

				for (var i = 1; i <= 3; i++) {
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

				this.next = link;

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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVDb21tZXJjZS5qcyJdLCJuYW1lcyI6WyJlQ29tbWVyY2UiLCJET00iLCJzdHJpbmciLCJyZXBsYWNlIiwiZWxlbWVudCIsImNsYXNzTmFtZSIsInRyaW0iLCJzcGxpdCIsImkiLCJsZW5ndGgiLCJjbGFzc0xpc3QiLCJhZGQiLCJyZW1vdmUiLCJzZWxlY3RvciIsInF1ZXJ5RWxlbWVudCIsImlkIiwiY3NzIiwiaW52YWxpZEFyZ3VtZW50RXhjZXB0aW9uIiwiaGVhZCIsImRvY3VtZW50IiwiZ2V0RWxlbWVudHNCeVRhZ05hbWUiLCJzdHlsZVRhZyIsImNyZWF0ZUVsZW1lbnQiLCJDU1MiLCJtaW5pZnlDc3MiLCJpbm5lckhUTUwiLCJzZXRBdHRyaWJ1dGUiLCJhcHBlbmRDaGlsZCIsInF1ZXJ5U2VsZWN0b3IiLCJOb2RlRWxlbWVudERvZXNOb3RFeGlzdEV4Y2VwdGlvbiIsIkV2ZW50IiwibmFtZSIsImNhbGxiYWNrIiwiSW52YWxpZEFyZ3VtZW50RXhjZXB0aW9uIiwiZXZlbnRzIiwiZGF0YSIsIkJhZEV2ZW50Q2FsbEV4Y2VwdGlvbiIsIkFycmF5IiwiQ29tbW9uIiwiY3VycmVudE9iaiIsIm5ld09iaiIsImV4dGVuZGVkIiwicHJvcCIsIk9iamVjdCIsInByb3RvdHlwZSIsImhhc093blByb3BlcnR5IiwiY2FsbCIsIm5lZWRsZSIsImh5c3RhY2siLCJjb25zdHJ1Y3RvciIsIm9iamVjdCIsInRvTG93ZXJDYXNlIiwiSW52YWxpZEJpbmRpbmdFeGNlcHRpb24iLCJjb25zb2xlIiwiZXJyb3IiLCJFcnJvciIsIkludmFsaWRBcmd1bWVudEV4Y2VwdGlvbiQxIiwiaW5zdGFuY2VzIiwiQ29udGFpbmVyIiwia2V5IiwiY29uY3JldGUiLCJiaW5kIiwiaW5zdGFuY2UiLCJpbnN0YW5jZUV4aXN0IiwiZ2V0SW5zdGFuY2UiLCJzZXRJbnN0YW5jZSIsIkNvbXBvbmVudHNFeGNlcHRpb24iLCJCYWRFdmVudENhbGxFeGNlcHRpb24kMSIsIkNvbXBvbmVudE5vdFJlZ2lzdGVyZWRFeGNlcHRpb24iLCJOb2RlRWxlbWVudERvZXNOb3RFeGlzdEV4Y2VwdGlvbiQxIiwiRXhjZXB0aW9uSGFuZGxlciIsIndpbmRvdyIsIm9uZXJyb3IiLCJtZXNzYWdlIiwic291cmNlIiwibGluZW5vIiwiY29sbm8iLCJkZWZhdWx0U2V0dGluZ3MkMSIsImNsYXNzIiwid2lkdGgiLCJoZWlnaHQiLCJGaWx0ZXIiLCJjb250YWluZXIiLCJzZXR1cCIsInNldHRpbmdzIiwiZXh0ZW5kIiwic2V0RWxlbWVudCIsIndyYXBwZXIiLCJhZGRDbGFzcyIsImRlZmF1bHRTZXR0aW5ncyQyIiwiaXRlbUNsYXNzIiwiYXR0cmlidXRlcyIsInVybCIsImluaXRTdGF0aWNEYXRhIiwiQ29udGFpbmVyJDIiLCJQcm9kdWN0cyIsInBhZ2luYXRvciIsImFkZFN0eWxlVGFnIiwicmVzZXQiLCJyZXF1ZXN0IiwiZ2V0UHJvZHVjdHNCeVBhZ2UiLCJnZXRDdXJyZW50IiwidGhlbiIsIml0ZW1zIiwicmVwbGFjZUl0ZW1zIiwiY2F0Y2giLCJpc0FycmF5Iiwid3JhcHBlZEl0ZW1zIiwid3JhcEFsbFdpdGhIVE1MIiwicGFnZU51bWJlciIsIlByb21pc2UiLCJyZXNvbHZlIiwicmVqZWN0Iiwibm90SW5QYWdlUmFuZ2UiLCJ4aHIiLCJYTUxIdHRwUmVxdWVzdCIsIkFjdGl2ZVhPYmplY3QiLCJvcGVuIiwic2V0UmVxdWVzdEhlYWRlciIsIm9ucmVhZHlzdGF0ZWNoYW5nZSIsImxvZyIsInN0YXR1cyIsInJlYWR5U3RhdGUiLCJjdXJyZW50SXRlbXMiLCJKU09OIiwicGFyc2UiLCJyZXNwb25zZVRleHQiLCJwcm9kdWN0IiwiQWZ0ZXJMb2FkZWQiLCJzdGF0dXNUZXh0Iiwic2VuZCIsInRhZ1R5cGUiLCJtYXAiLCJpbmRleCIsIml0ZW0iLCJvdmVybGF5IiwiaW5kZXhPZiIsInRhZyIsImltYWdlIiwia2ViYWJDYXNlIiwidGVtcCIsInByb2R1Y3RzIiwiYWRkU3R5bGUiLCJTZXJ2aWNlcyIsImRlZmF1bHRTZXR0aW5ncyQzIiwicGVyX3BhZ2UiLCJ0b3RhbF9wYWdlcyIsIkNvbnRhaW5lciQzIiwiUGFnaW5hdGlvbiIsInJlcGxhY2VMaW5rcyIsImxpbmtzIiwiY3JlYXRlTGlua3MiLCJiaW5kRXZlbnRMaXN0ZW5lcnMiLCJuZXh0IiwiY2hpbGROb2RlcyIsIm9uY2xpY2siLCJldmVudCIsInByZXZlbnREZWZhdWx0IiwiY3VycmVudCIsInNldEN1cnJlbnQiLCJwcmV2aW91cyIsInBhZ2VzIiwiZ2V0QXR0cmlidXRlIiwiY2hhbmdlVXJsIiwidWwiLCJjcmVhdGVQYWdlTGlua3MiLCJjcmVhdGVQcmV2aW91c0J1dHRvbiIsImNyZWF0ZU5leHRCdXR0b24iLCJmb3JFYWNoIiwicGFnZSIsInBhZ2VJdGVtIiwibGluayIsInB1c2giLCJsaSIsInNwYW4xIiwic3BhbjIiLCJ0b3RhbFBhZ2VzIiwiaXNOYU4iLCJHRVRfVmFycyIsImhpc3RvcnkiLCJyZXBsYWNlU3RhdGUiLCJ1cGRhdGVVUkxQYXJhbWV0ZXIiLCJsb2NhdGlvbiIsImhyZWYiLCJ2YXJzIiwicGFydHMiLCJtIiwidmFsdWUiLCJwYXJhbSIsInBhcmFtVmFsIiwibmV3QWRkaXRpb25hbFVSTCIsInRlbXBBcnJheSIsImJhc2VVUkwiLCJhZGRpdGlvbmFsVVJMIiwicm93c1RleHQiLCJpbml0YWxpemVkIiwiZGVmYXVsdFNldHRpbmdzIiwiY2FydFNlc3Npb25JZCIsImltcG9ydEJvb3RzdHJhcCIsImNvbXBvbmVudHMiLCJpbml0YWxpemUiLCJiaW5kQ29tcG9uZW50c0RlcGVuZGVuY2llcyIsIlByb3h5IiwiZ2V0IiwidGFyZ2V0IiwibWFrZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLElBQUlBLFlBQWEsWUFBWTtBQUM3Qjs7QUFENkIsS0FHdkJDLEdBSHVCO0FBQUE7QUFBQTtBQUFBOztBQUFBO0FBQUE7O0FBSzVCOzs7QUFMNEIsNkJBUVhDLE1BUlcsRUFTNUI7QUFDSUEsYUFBU0EsT0FBT0MsT0FBUCxDQUFlLHdDQUFmLEVBQXlE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PSAoZnVuY3Rpb24gKCkge1xuJ3VzZSBzdHJpY3QnO1xuXG5jbGFzcyBET01cclxue1xyXG5cdC8qKlxyXG5cdCAqIE1pbmlmaWVzIHRoZSBjc3MgdGV4dC5cclxuXHQgKi9cclxuXHRzdGF0aWMgbWluaWZ5Q3NzKHN0cmluZykgXHJcblx0e1xyXG5cdCAgICBzdHJpbmcgPSBzdHJpbmcucmVwbGFjZSgvXFwvXFwqKD86KD8hXFwqXFwvKVtcXHNcXFNdKSpcXCpcXC98W1xcclxcblxcdF0rL2csICcnKTtcclxuXHQgICAgc3RyaW5nID0gc3RyaW5nLnJlcGxhY2UoLyB7Mix9L2csICcgJyk7XHJcblx0ICAgIHN0cmluZyA9IHN0cmluZy5yZXBsYWNlKC8oW3s6fV0pL2csICckMScpO1xyXG5cdCAgICBzdHJpbmcgPSBzdHJpbmcucmVwbGFjZSgvKFs7LF0pIC9nLCAnJDEnKTtcclxuXHQgICAgc3RyaW5nID0gc3RyaW5nLnJlcGxhY2UoLyAhL2csICchJyk7XHJcblx0ICAgIFxyXG5cdCAgICByZXR1cm4gc3RyaW5nO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQWRkcyBjbGFzcyB0byBhIGdpdmVuIGVsZW1lbnQuXHJcblx0ICovXHJcblx0c3RhdGljIGFkZENsYXNzKGVsZW1lbnQsIGNsYXNzTmFtZSkgXHJcblx0e1xyXG5cdFx0aWYoY2xhc3NOYW1lID09ICcnKSByZXR1cm4gZWxlbWVudDtcclxuXHJcblx0XHRjbGFzc05hbWUgPSBjbGFzc05hbWUudHJpbSgpO1xyXG5cdFx0Y2xhc3NOYW1lID0gY2xhc3NOYW1lLnNwbGl0KCcgJyk7XHJcblxyXG5cdFx0Zm9yKHZhciBpID0gMDsgaSA8IGNsYXNzTmFtZS5sZW5ndGg7IGkrKykge1xyXG5cdFx0XHRlbGVtZW50LmNsYXNzTGlzdC5hZGQoY2xhc3NOYW1lW2ldKTtcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gZWxlbWVudDtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFJlbW92ZXMgY2xhc3MgZnJvbSBhIGdpdmVuIGVsZW1lbnQuXHJcblx0ICovXHJcblx0c3RhdGljIHJlbW92ZUNsYXNzKGVsZW1lbnQsIGNsYXNzTmFtZSkgXHJcblx0e1xyXG5cdFx0ZWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKGNsYXNzTmFtZSk7XHJcblx0XHRcclxuXHRcdHJldHVybiBlbGVtZW50O1xyXG5cdH1cclxuXHJcblx0c3RhdGljIGVsZW1lbnQoc2VsZWN0b3IpIFxyXG5cdHtcclxuXHRcdGxldCBlbGVtZW50ID0gcXVlcnlFbGVtZW50KHNlbGVjdG9yKTtcclxuXHRcdHJldHVybiBlbGVtZW50O1xyXG5cdH1cclxuXHJcblx0c3RhdGljIGFkZFN0eWxlKGlkLCBjc3MpIFxyXG5cdHtcclxuXHRcdGlmKHR5cGVvZiBjc3MgIT0gJ3N0cmluZycpIHtcclxuXHRcdFx0dGhyb3cgbmV3IGludmFsaWRBcmd1bWVudEV4Y2VwdGlvbjtcclxuXHRcdH1cclxuXHJcblx0XHRsZXQgaGVhZCA9IGRvY3VtZW50LmhlYWQgfHwgZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2hlYWQnKVswXTtcclxuXHRcdGxldCBzdHlsZVRhZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3N0eWxlJyk7XHJcblxyXG5cdFx0Ly8gcGlwZSBpdCB0aHJvdWdoIHRoZSBtaW5maWVyXHJcblx0ICAgIGxldCBDU1MgPSB0aGlzLm1pbmlmeUNzcyhjc3MpO1xyXG5cdCAgICAvLyBhZGRpbmcgaXQgdG8gdGhlIHN0eWxldGFnXHJcblx0ICAgIHN0eWxlVGFnLmlubmVySFRNTCA9IENTUztcclxuXHQgICAgLy8gZ2l2ZSBhbiBpZCB0byByZWNvZ25pemUgdGhlIHN0eWxlIHRhZ1xyXG5cdFx0c3R5bGVUYWcuc2V0QXR0cmlidXRlKCdpZCcsIGlkKTtcclxuXHRcdC8vIGFwcGVuZGluZyB0aGF0IHN0eWxlIHRhZyB0byB0aGUgRE9NIGhlYWQgdGFnXHJcblx0XHRoZWFkLmFwcGVuZENoaWxkKHN0eWxlVGFnKTtcclxuXHR9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBRdWVyaWVzIGFuIGVsZW1lbnQgZnJvbSB0aGUgRE9NLlxyXG4gKi9cclxuZnVuY3Rpb24gcXVlcnlFbGVtZW50KHNlbGVjdG9yKSB7XHJcblx0bGV0IGVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHNlbGVjdG9yKSB8fCBudWxsO1xyXG5cclxuXHRpZighIGVsZW1lbnQpIHtcclxuXHRcdHRocm93IG5ldyBOb2RlRWxlbWVudERvZXNOb3RFeGlzdEV4Y2VwdGlvbjtcclxuXHR9XHJcblxyXG5cdHJldHVybiBlbGVtZW50O1xyXG59XG5cbmNsYXNzIEV2ZW50XHJcbntcclxuXHQvKipcclxuXHQgKiBMaXN0ZW4gdG8gYW4gZXZlbnQuXHJcblx0ICovXHJcblx0c3RhdGljIGxpc3RlbihuYW1lLCBjYWxsYmFjaykge1xyXG5cdFx0aWYgKHR5cGVvZiBjYWxsYmFjayAhPT0gJ2Z1bmN0aW9uJykge1xyXG5cdFx0XHR0aHJvdyBuZXcgSW52YWxpZEFyZ3VtZW50RXhjZXB0aW9uO1xyXG5cdFx0fVxyXG5cclxuXHRcdGV2ZW50c1tuYW1lXSA9IGNhbGxiYWNrO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogRmlyZXMgYW4gZXZlbnQuXHJcblx0ICovXHJcblx0c3RhdGljIHRyaWdnZXIobmFtZSwgZGF0YSkge1xyXG5cdFx0ZGF0YSA9IGRhdGEgfHwgbnVsbDtcclxuXHJcblx0XHRpZih0eXBlb2YgZXZlbnRzW25hbWVdICE9PSAnZnVuY3Rpb24nKSB7XHJcblx0XHRcdHRocm93IG5ldyBCYWRFdmVudENhbGxFeGNlcHRpb247XHJcblx0XHR9XHJcblxyXG5cdFx0aWYoZGF0YSAhPSBudWxsICYmIGRhdGEgaW5zdGFuY2VvZiBBcnJheSkge1xyXG5cdFxyXG5cdFx0XHRyZXR1cm4gZXZlbnRzW25hbWVdKC4uLmRhdGEpO1xyXG5cdFx0fVxyXG5cclxuXHRcdGV2ZW50c1tuYW1lXSgpO1xyXG5cdH1cclxufVxuXG5jbGFzcyBDb21tb25cclxue1xyXG5cdC8qKlxyXG5cdCAqIEV4dGVuZCBhbiBvYmplY3QuXHJcblx0ICovXHJcblx0c3RhdGljIGV4dGVuZChjdXJyZW50T2JqLCBuZXdPYmogKSB7XHJcblx0XHR2YXIgZXh0ZW5kZWQgPSB7fTtcclxuXHQgICAgdmFyIHByb3A7XHJcblxyXG5cdCAgICBmb3IgKHByb3AgaW4gY3VycmVudE9iaikge1xyXG5cdCAgICAgICAgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChjdXJyZW50T2JqLCBwcm9wKSkge1xyXG5cdCAgICAgICAgICAgIGV4dGVuZGVkW3Byb3BdID0gY3VycmVudE9ialtwcm9wXTtcclxuXHQgICAgICAgIH1cclxuXHQgICAgfVxyXG5cclxuXHQgICAgZm9yIChwcm9wIGluIG5ld09iaikge1xyXG5cdCAgICAgICAgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChuZXdPYmosIHByb3ApKSB7XHJcblx0ICAgICAgICAgICAgZXh0ZW5kZWRbcHJvcF0gPSBuZXdPYmpbcHJvcF07XHJcblx0ICAgICAgICB9XHJcblx0ICAgIH1cclxuXHJcblx0ICAgIHJldHVybiBleHRlbmRlZDtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIENoZWNrcyBmb3IgYSBuZWVkbGUgaW4gaHlzdGFjay5cclxuXHQgKi9cclxuXHRzdGF0aWMgaW5fYXJyYXkobmVlZGxlLCBoeXN0YWNrKSB7XHJcblx0XHRpZihoeXN0YWNrLmNvbnN0cnVjdG9yICE9PSBBcnJheSkgcmV0dXJuO1xyXG5cclxuXHRcdGZvcih2YXIgaSA9IDA7IGkgPD0gaHlzdGFjay5sZW5ndGg7IGkrKykge1xyXG5cdFx0XHRpZihuZWVkbGUgPT0gaHlzdGFja1tpXSkgcmV0dXJuIHRydWU7XHRcclxuXHRcdH1cclxuXHRcclxuXHRcdHJldHVybiBmYWxzZTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIENoZWNrcyBpZiBhbiBvYmplY3QgaXMgZW1wdHkuXHJcblx0ICovXHJcblx0c3RhdGljIGVtcHR5T2JqZWN0KG9iamVjdCkge1xyXG5cdFx0Zm9yKHZhciBwcm9wIGluIG9iamVjdCkge1xyXG5cdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIHRydWU7XHJcblx0fVxyXG5cclxuXHRzdGF0aWMgY29udGFpbnNPYmplY3Qob2JqZWN0LCBoeXN0YWNrKSBcclxuXHR7XHJcblx0ICAgIHZhciBpO1xyXG5cclxuXHQgICAgZm9yIChpID0gMDsgaSA8IGh5c3RhY2subGVuZ3RoOyBpKyspIHtcclxuXHQgICAgICAgIGlmICh0eXBlb2Ygb2JqZWN0ID09ICdzdHJpbmcnICYmIGh5c3RhY2tbaV0uY29uc3RydWN0b3IubmFtZSA9PT0gb2JqZWN0KSB7XHJcblx0ICAgICAgICBcdHJldHVybiB0cnVlO1xyXG5cdCAgICAgICAgfVxyXG5cclxuXHQgICAgICAgIGlmIChoeXN0YWNrW2ldID09PSBvYmplY3QpIHtcclxuXHQgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuXHQgICAgICAgIH1cclxuXHQgICAgfVxyXG5cclxuXHQgICAgcmV0dXJuIGZhbHNlO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQ29udmVydCBjYW1lbENhc2UgdG8ga2ViYWItY2FzZS5cclxuXHQgKi9cclxuXHRzdGF0aWMga2ViYWJDYXNlKHN0cmluZykge1xyXG5cdFx0cmV0dXJuIHN0cmluZy5yZXBsYWNlKC8oW2Etel0pKFtBLVpdKS9nLCAnJDEtJDInKS50b0xvd2VyQ2FzZSgpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQ2hlY2tzIGlmIGEgZ2l2ZW4gcGFyYW1ldGVyIGlzIGFuIG9iamVjdC5cclxuXHQgKi9cclxuXHRzdGF0aWMgaXNPYmplY3Qob2JqZWN0KSB7XHJcblx0XHRyZXR1cm4gdHlwZW9mIG9iamVjdCA9PSAnb2JqZWN0JztcclxuXHR9XHJcbn1cblxuY2xhc3MgSW52YWxpZEJpbmRpbmdFeGNlcHRpb25cclxue1xyXG5cdGNvbnN0cnVjdG9yKCkgXHJcblx0eyBcclxuICAgIFx0Y29uc29sZS5lcnJvcihgJHt0aGlzLmNvbnN0cnVjdG9yLm5hbWV9LCB0cnlpbmcgdG8gYmluZCBhbiBhbHJlYWR5IGV4aXN0aW5nIGJvdW5kLmApO1xyXG5cclxuICAgIFx0dGhyb3cgbmV3IEVycm9yO1xyXG4gICAgfVxyXG59XG5cbmNsYXNzIEludmFsaWRBcmd1bWVudEV4Y2VwdGlvbiQxXHJcbntcclxuXHRjb25zdHJ1Y3RvcigpIFxyXG5cdHsgXHJcbiAgICBcdGNvbnNvbGUuZXJyb3IoYCR7dGhpcy5jb25zdHJ1Y3Rvci5uYW1lfSwgcGFzc2luZyBpbnZhbGlkIGFyZ3VtZW50cy5gKTtcclxuXHJcbiAgICBcdHRocm93IG5ldyBFcnJvcjtcclxuICAgIH1cclxufVxuXG5sZXQgaW5zdGFuY2VzID0gW107XHJcblxyXG5jbGFzcyBDb250YWluZXIgXHJcbntcclxuXHQvKipcclxuXHQgKiBCaW5kcyBrZXkgdG8gY29uY3JldGUgY2xhc3MuXHJcblx0ICovXHJcblx0YmluZChrZXksIGNvbmNyZXRlKSBcclxuXHR7XHJcblx0XHRpZiAodHlwZW9mIGtleSAhPSAnc3RyaW5nJyB8fCB0eXBlb2YgY29uY3JldGUgIT0gJ2Z1bmN0aW9uJykge1xyXG5cdFx0XHR0aHJvdyBuZXcgSW52YWxpZEFyZ3VtZW50RXhjZXB0aW9uJDE7XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKHR5cGVvZiB0aGlzW2tleV0gIT0gJ3VuZGVmaW5lZCcpIHtcclxuXHRcdFx0dGhyb3cgbmV3IEludmFsaWRCaW5kaW5nRXhjZXB0aW9uO1xyXG5cdFx0fVxyXG5cclxuXHRcdHRoaXNba2V5XSA9IGNvbmNyZXRlO1xyXG5cdFx0dGhpc1trZXldLmJpbmQoY29uY3JldGUpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogU2V0cyBhbiBpbnN0YW5jZS5cclxuXHQgKi9cclxuXHRzZXRJbnN0YW5jZShrZXksIGluc3RhbmNlKSBcclxuXHR7XHJcblx0XHRpZih0eXBlb2Yga2V5ICE9ICdzdHJpbmcnIHx8IHR5cGVvZiBpbnN0YW5jZSAhPSAnb2JqZWN0Jykge1xyXG5cdFx0XHR0aHJvdyBuZXcgSW52YWxpZEFyZ3VtZW50RXhjZXB0aW9uJDE7XHJcblx0XHR9XHJcblxyXG5cdFx0aW5zdGFuY2VzW2tleV0gPSBpbnN0YW5jZTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEdldHMgYW4gaW5zdGFuY2UuXHJcblx0ICovXHJcblx0Z2V0SW5zdGFuY2Uoa2V5KSBcclxuXHR7XHJcblx0XHRpZih0eXBlb2Yga2V5ICE9ICdzdHJpbmcnKSB7XHJcblx0XHRcdHRocm93IG5ldyBJbnZhbGlkQXJndW1lbnRFeGNlcHRpb24kMTtcclxuXHRcdH1cclxuXHJcblx0XHRpZih0eXBlb2Yga2V5ID09ICdvYmplY3QnKSB7XHJcblx0XHRcdHJldHVybiBpbnN0YW5jZXNba2V5LmNvbnN0cnVjdG9yLm5hbWVdIHx8IG51bGw7XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIGluc3RhbmNlc1trZXldIHx8IG51bGw7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBDaGVja3MgaWYgYW4gaW5zdGFuY2UgZXhpc3QuXHJcblx0ICovXHJcblx0aW5zdGFuY2VFeGlzdChpbnN0YW5jZSkgXHJcblx0e1xyXG5cdFx0aWYodHlwZW9mIGluc3RhbmNlID09ICdvYmplY3QnKSB7XHJcblx0XHRcdHJldHVybiAodHlwZW9mIGluc3RhbmNlc1tpbnN0YW5jZS5jb25zdHJ1Y3Rvci5uYW1lXSAhPT0gJ3VuZGVmaW5lZCcpO1xyXG5cdFx0fVxyXG5cdFx0XHJcblx0XHRcclxuXHRcdHJldHVybiAoaW5zdGFuY2UgaW4gaW5zdGFuY2VzKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIENyZWF0ZXMgYW4gaW5zdGFuY2UuXHJcblx0ICovXHJcblx0bWFrZShvYmplY3QpXHJcblx0e1xyXG5cdFx0bGV0IGluc3RhbmNlID0ge307XHJcblxyXG5cdFx0aWYgKHRoaXMuaW5zdGFuY2VFeGlzdChvYmplY3QpKSB7XHJcblx0XHRcdHJldHVybiB0aGlzLmdldEluc3RhbmNlKG9iamVjdCk7XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKHR5cGVvZiBvYmplY3QgPT0gJ29iamVjdCcpIHtcclxuXHRcdFx0aW5zdGFuY2UgPSBvYmplY3Q7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRpbnN0YW5jZSA9IG5ldyB0aGlzW29iamVjdF07XHRcclxuXHRcdH1cclxuXHJcblx0XHR0aGlzLnNldEluc3RhbmNlKG9iamVjdCwgaW5zdGFuY2UpOyBcclxuXHJcblx0XHRyZXR1cm4gaW5zdGFuY2U7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBSZXRyaWV2ZSBhbGwgaW5zdGFuY2VzLlxyXG5cdCAqL1xyXG5cdGluc3RhbmNlcygpIFxyXG5cdHtcclxuXHRcdHJldHVybiBpbnN0YW5jZXM7XHJcblx0fVxyXG59XG5cbmNsYXNzIENvbXBvbmVudHNFeGNlcHRpb25cclxue1xyXG5cdGNvbnN0cnVjdG9yKCkgXHJcblx0eyBcclxuICAgIFx0Y29uc29sZS5lcnJvcihgJHt0aGlzLmNvbnN0cnVjdG9yLm5hbWV9LCBleHBlY3RpbmcgZm9yIGF0IGxlYXN0IG9uZSBjb21wb25lbnRzLCBidXQgbm9uZSB3YXMgZ2l2ZW4sIFxyXG5cdFx0XHRcdFx0XHRcdFx0cGxlYXNlIGFkZCBhdCBsZWFzdCBvbmUgcmVxdWlyZW1lbnQoUHJvZHVjdHMsIFNlcnZpY2VzIG9yL2FuZCBGaWx0ZXJgKTtcclxuXHJcbiAgICBcdHRocm93IG5ldyBFcnJvcjtcclxuICAgIH1cclxufVxuXG5jbGFzcyBCYWRFdmVudENhbGxFeGNlcHRpb24kMVxyXG57XHJcblx0Y29uc3RydWN0b3IoKSBcclxuXHR7IFxyXG4gICAgXHRjb25zb2xlLmVycm9yKGAke3RoaXMuY29uc3RydWN0b3IubmFtZX0sIGxpc3RlbmluZyB0byBhIG5vbmUtZXhpc3RpbmcgZXZlbnRgKTtcclxuXHJcbiAgICBcdHRocm93IG5ldyBFcnJvcjtcclxuICAgIH1cclxufVxuXG5jbGFzcyBDb21wb25lbnROb3RSZWdpc3RlcmVkRXhjZXB0aW9uXHJcbntcclxuXHRjb25zdHJ1Y3RvcigpIFxyXG5cdHsgXHJcbiAgICBcdGNvbnNvbGUuZXJyb3IoYCR7dGhpcy5jb25zdHJ1Y3Rvci5uYW1lfSwgY29tcG9uZW50cyBtdXN0IGJlIHJlZ2lzdGVyZWQgaW4gb3JkZXIgdG8gdXNlIHRoZW1gKTtcclxuXHJcbiAgICBcdHRocm93IG5ldyBFcnJvcjtcclxuICAgIH1cclxufVxuXG5jbGFzcyBOb2RlRWxlbWVudERvZXNOb3RFeGlzdEV4Y2VwdGlvbiQxXHJcbntcclxuXHRjb25zdHJ1Y3RvcigpIFxyXG5cdHsgXHJcbiAgICBcdGNvbnNvbGUuZXJyb3IoYCR7dGhpcy5jb25zdHJ1Y3Rvci5uYW1lfSwgdHJ5aW5nIHRvIGZldGNoIGFuIG5vbmUtZXhpc3RpbmcgZWxlbWVudCBmcm9tIHRoZSBET01gKTtcclxuXHJcbiAgICBcdHRocm93IG5ldyBFcnJvcjtcclxuICAgIH1cclxufVxuXG5jbGFzcyBFeGNlcHRpb25IYW5kbGVyXHJcbntcclxuXHQvKipcclxuXHQgKiBIYW5kbGUgYWxsIHRoZSBlcnJvcnNcclxuXHQgKi9cclxuXHRzdGF0aWMgaW5pdGFsaXplKCkge1x0XHJcblx0XHR3aW5kb3cub25lcnJvciA9IGZ1bmN0aW9uKG1lc3NhZ2UsIHNvdXJjZSwgbGluZW5vLCBjb2xubywgZXJyb3IpIHtcclxuXHJcblx0XHRcdGlmIChlcnJvciBpbnN0YW5jZW9mIEludmFsaWRBcmd1bWVudEV4Y2VwdGlvbiQxKSB7XHJcblx0XHRcdFx0Ly8gaGFuZGxlXHJcblx0XHRcdH0gZWxzZSBpZiAoZXJyb3IgaW5zdGFuY2VvZiBJbnZhbGlkQmluZGluZ0V4Y2VwdGlvbikge1xyXG5cdFx0XHRcdC8vIGhhbmRsZVxyXG5cdFx0XHR9IGVsc2UgaWYgKGVycm9yIGluc3RhbmNlb2YgQmFkRXZlbnRDYWxsRXhjZXB0aW9uJDEpIHtcclxuXHRcdFx0XHQvLyBoYW5kbGVcclxuXHRcdFx0fSBlbHNlIGlmIChlcnJvciBpbnN0YW5jZW9mIENvbXBvbmVudHNFeGNlcHRpb24pIHtcclxuXHRcdFx0XHQvLyBoYW5kbGVcclxuXHRcdFx0fSBlbHNlIGlmIChlcnJvciBpbnN0YW5jZW9mIENvbXBvbmVudE5vdFJlZ2lzdGVyZWRFeGNlcHRpb24pIHtcclxuXHRcdFx0XHQvLyBoYW5kbGVcclxuXHRcdFx0fSBlbHNlIGlmIChlcnJvciBpbnN0YW5jZW9mIE5vZGVFbGVtZW50RG9lc05vdEV4aXN0RXhjZXB0aW9uJDEpIHtcclxuXHRcdFx0XHRcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHJldHVybiB0cnVlO1xyXG5cdFx0fTtcclxuXHR9XHJcbn1cblxuLyoqXHJcbiAqIFRoZSBkZWZhdWx0IHNldHRpbmdzIG9mIHRoZSBmaWx0ZXIuXHJcbiAqL1xyXG5sZXQgZGVmYXVsdFNldHRpbmdzJDEgPSB7XHJcblx0ZWxlbWVudDogJy5maWx0ZXInLFxyXG5cdGRhdGE6IHt9LFxyXG5cdGNsYXNzOiAnY29sLXhzLTInLFxyXG5cdHdpZHRoOiAnJyxcclxuXHRoZWlnaHQ6ICcnLFxyXG59O1xyXG5cclxuXHJcbi8qKlxyXG4gKiBUaGUgRmlsdGVyIE9iamVjdCwgaGFuZGxlcyB0aGUgZmlsdGVyIG9mIHRoZSBwcm9kdWN0cy9zZXJ2aWNlcy5cclxuICovXHJcbmNsYXNzIEZpbHRlciBcclxue1xyXG5cdGNvbnN0cnVjdG9yKGNvbnRhaW5lcikgXHJcblx0e1xyXG5cdFx0dGhpcy5zZXR1cChkZWZhdWx0U2V0dGluZ3MkMSk7XHJcblx0fVxyXG5cclxuXHRzZXR1cChzZXR0aW5ncylcclxuXHR7XHJcblx0XHRpZih0eXBlb2Ygc2V0dGluZ3MgIT0gJ29iamVjdCcpIHtcclxuXHRcdFx0dGhyb3cgbmV3IEludmFsaWRBcmd1bWVudEV4Y2VwdGlvbiQxO1xyXG5cdFx0fVxyXG5cclxuXHRcdHRoaXMuc2V0dGluZ3MgPSBDb21tb24uZXh0ZW5kKGRlZmF1bHRTZXR0aW5ncyQxLCBzZXR0aW5ncyk7XHJcblxyXG5cdFx0dGhpcy5zZXRFbGVtZW50KHRoaXMuc2V0dGluZ3MuZWxlbWVudCk7XHJcblx0fVxyXG5cclxuXHRzZXRFbGVtZW50KHNlbGVjdG9yKVxyXG5cdHtcclxuXHRcdHRoaXMud3JhcHBlciA9IERPTS5lbGVtZW50KHNlbGVjdG9yKTtcclxuXHRcdFxyXG5cdFx0RE9NLmFkZENsYXNzKHRoaXMud3JhcHBlciwgdGhpcy5zZXR0aW5ncy5jbGFzcyk7XHJcblx0fVxyXG59XG5cbi8qKlxyXG4gKiBUaGUgZGVmYXVsdCBzZXR0aW5ncyBvZiBlYWNoIHByb2R1Y3QuXHJcbiAqL1xyXG5sZXQgZGVmYXVsdFNldHRpbmdzJDIgPSB7XHJcblx0ZWxlbWVudDogJy5wcm9kdWN0cycsXHJcblx0Y2xhc3M6ICcnLFxyXG5cdGl0ZW1DbGFzczogJycsXHJcblx0d2lkdGg6ICcyMDBweCcsXHJcblx0aGVpZ2h0OiAnMjUwcHgnLFxyXG5cdGF0dHJpYnV0ZXM6IFsnbmFtZScsICdwcmljZScsICdkZWxpdmVyeVRpbWUnLCAnaW1hZ2UnXSxcclxuXHR1cmw6ICdwcm9kdWN0cy5waHAnLFxyXG5cdGluaXRTdGF0aWNEYXRhOiB7fSxcclxufTtcclxuXHJcbmxldCBDb250YWluZXIkMjtcclxuXHJcbi8qKlxyXG4gKiBUaGUgUHJvZHVjdHMgT2JqZWN0LCBoYW5kbGVzIHRoZSBwcm9kdWN0cy5cclxuICovXHJcbmNsYXNzIFByb2R1Y3RzIFxyXG57XHJcblx0LyoqXHJcblx0ICogSW5pdGFsaXplIHRoZSBDb250YWluZXIgYW5kIHRoZSBwYWdpbmF0b3JcclxuXHQgKi9cclxuXHRjb25zdHJ1Y3Rvcihjb250YWluZXIsIHBhZ2luYXRvcikgXHJcblx0e1xyXG5cdFx0dGhpcy5zZXR1cChkZWZhdWx0U2V0dGluZ3MkMik7XHJcblxyXG5cdFx0Q29udGFpbmVyJDIgPSBjb250YWluZXI7XHJcblx0XHR0aGlzLnBhZ2luYXRvciA9IHBhZ2luYXRvcjtcclxuXHR9XHJcblxyXG5cdHNldHVwKHNldHRpbmdzKVxyXG5cdHtcclxuXHRcdGlmICh0eXBlb2Ygc2V0dGluZ3MgIT0gJ29iamVjdCcpIHtcclxuXHRcdFx0dGhyb3cgbmV3IEludmFsaWRBcmd1bWVudEV4Y2VwdGlvbiQxO1xyXG5cdFx0fVxyXG5cclxuXHRcdHRoaXMuc2V0dGluZ3MgPSBDb21tb24uZXh0ZW5kKGRlZmF1bHRTZXR0aW5ncyQyLCBzZXR0aW5ncyk7XHJcblxyXG5cdFx0dGhpcy5zZXRFbGVtZW50KHRoaXMuc2V0dGluZ3MuZWxlbWVudCk7XHJcblxyXG5cdFx0dGhpcy5hZGRTdHlsZVRhZygpO1x0XHJcblx0XHJcblx0XHRpZiAodHlwZW9mIENvbnRhaW5lciQyID09ICd1bmRlZmluZWQnKSB7XHJcblx0XHRcdHJldHVybjtcclxuXHRcdH1cclxuXHJcblx0XHRpZiAoQ29udGFpbmVyJDIuaW5zdGFuY2VFeGlzdCgnUGFnaW5hdGlvbicpKSB7XHJcblx0XHRcdHRoaXMucGFnaW5hdG9yLnJlc2V0KHRoaXMuc2V0dGluZ3MuaW5pdFN0YXRpY0RhdGEpO1xyXG5cdFx0XHRsZXQgcmVxdWVzdCA9IHRoaXMuZ2V0UHJvZHVjdHNCeVBhZ2UodGhpcy5wYWdpbmF0b3IuZ2V0Q3VycmVudCgpKTtcclxuXHRcdFx0XHJcblx0XHRcdHJlcXVlc3QudGhlbihmdW5jdGlvbihpdGVtcykge1xyXG5cdFx0XHRcdHRoaXMucmVwbGFjZUl0ZW1zKGl0ZW1zKTtcclxuXHRcdFx0fS5iaW5kKHRoaXMpKS5jYXRjaChmdW5jdGlvbihlcnJvcikge1xyXG5cclxuXHRcdFx0fSk7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRzZXRFbGVtZW50KHNlbGVjdG9yKVxyXG5cdHtcclxuXHRcdHRoaXMud3JhcHBlciA9IERPTS5lbGVtZW50KHNlbGVjdG9yKTtcclxuXHRcdFxyXG5cdFx0RE9NLmFkZENsYXNzKHRoaXMud3JhcHBlciwgdGhpcy5zZXR0aW5ncy5jbGFzcyk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBSZXBsYWNlIGl0ZW1zIGluIHRoZSBjb250YWluZXIuXHJcblx0ICovXHJcblx0cmVwbGFjZUl0ZW1zKGl0ZW1zKSBcclxuXHR7XHJcblx0XHRpZiAoISBBcnJheS5pc0FycmF5KGl0ZW1zKSB8fCB0eXBlb2YgaXRlbXNbMF0gPT0gJ3N0cmluZycpIHtcclxuXHRcdFx0dGhyb3cgbmV3IEludmFsaWRBcmd1bWVudEV4Y2VwdGlvbiQxO1xyXG5cdFx0fVxyXG5cclxuXHRcdGxldCB3cmFwcGVkSXRlbXMgPSB0aGlzLndyYXBBbGxXaXRoSFRNTChpdGVtcywgdGhpcy5zZXR0aW5ncy5pdGVtQ2xhc3MsICdkaXYnKTtcclxuXHJcblx0XHR0aGlzLndyYXBwZXIuaW5uZXJIVE1MID0gd3JhcHBlZEl0ZW1zO1xyXG5cclxuXHRcdHJldHVybiBpdGVtcztcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIE1ha2VzIGFuIEFqYXggY2FsbCB0byB0aGUgc2VydmVyLlxyXG5cdCAqL1xyXG5cdGdldFByb2R1Y3RzQnlQYWdlKHBhZ2VOdW1iZXIpIFxyXG5cdHtcclxuXHRcdHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcclxuXHRcdFx0aWYgKHRoaXMucGFnaW5hdG9yLm5vdEluUGFnZVJhbmdlKHBhZ2VOdW1iZXIpKSB7XHJcblx0XHRcdFx0cmV0dXJuIHJlamVjdCgnTm90IGluIHBhZ2luYXRpb24gcmFuZ2UnKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0bGV0IHhociA9IG5ldyBYTUxIdHRwUmVxdWVzdCB8fCBuZXcgQWN0aXZlWE9iamVjdChcIk1pY3Jvc29mdC5YTUxIVFRQXCIpO1xyXG5cclxuXHRcdFx0eGhyLm9wZW4oJ0dFVCcsIHRoaXMuc2V0dGluZ3MudXJsICsgJz9wYWdlPScgKyBwYWdlTnVtYmVyLCB0cnVlKTsgXHJcblx0XHRcdHhoci5zZXRSZXF1ZXN0SGVhZGVyKCdDb250ZW50LVR5cGUnLCAnYXBwbGljYXRpb24vanNvbicpO1xyXG5cdFx0XHRcclxuXHRcdFx0bGV0IGluc3RhbmNlID0gdGhpcztcclxuXHJcblx0XHRcdHhoci5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBmdW5jdGlvbigpIHtjb25zb2xlLmxvZyh0aGlzLnN0YXR1cyk7XHJcblx0XHRcdFx0aWYgKHRoaXMucmVhZHlTdGF0ZSA9PSA0KSB7XHJcblx0XHRcdFx0XHRpZiAodGhpcy5zdGF0dXMgPT0gMjAwKSB7XHJcblx0XHRcdFx0XHRcdGluc3RhbmNlLmN1cnJlbnRJdGVtcyA9IEpTT04ucGFyc2UodGhpcy5yZXNwb25zZVRleHQpO1xyXG5cdFx0XHRcdFx0XHJcblx0XHRcdFx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgaW5zdGFuY2UuY3VycmVudEl0ZW1zLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdFx0XHRcdFx0dmFyIHByb2R1Y3QgPSBpbnN0YW5jZS5jdXJyZW50SXRlbXNbaV07XHJcblx0XHRcdFx0XHRcdFx0aW5zdGFuY2UuQWZ0ZXJMb2FkZWQuY2FsbCh0aGlzLCBwcm9kdWN0KTtcclxuXHRcdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRcdFx0cmVzb2x2ZShpbnN0YW5jZS5jdXJyZW50SXRlbXMpO1xyXG5cdFx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdFx0cmVqZWN0KHRoaXMuc3RhdHVzVGV4dCk7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9O1xyXG5cclxuXHRcdFx0eGhyLm9uZXJyb3IgPSBmdW5jdGlvbihlcnJvcikge1xyXG5cdFx0XHRcdHJlamVjdChlcnJvcik7XHJcblx0XHRcdH07XHJcblxyXG5cdFx0XHR4aHIuc2VuZChudWxsKTtcclxuXHRcdH0uYmluZCh0aGlzKSk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBXcmFwIGFsbCB0aGUgaXRlbXMgd2l0aCBzcGVjaWZjIHRhZyBhbmQgY2xhc3NuYW1lLlxyXG5cdCAqL1xyXG5cdHdyYXBBbGxXaXRoSFRNTChpdGVtcywgY2xhc3NOYW1lLCB0YWdUeXBlKSBcclxuXHR7XHJcblx0XHRjbGFzc05hbWUgPSBjbGFzc05hbWUgfHwgbnVsbDtcclxuXHRcdGNsYXNzTmFtZSA9IChjbGFzc05hbWUpID8gJ3Byb2R1Y3QgJyArIGNsYXNzTmFtZSA6ICdwcm9kdWN0JztcclxuXHRcdFxyXG5cdFx0dmFyIHdyYXBwZWRJdGVtcyA9ICcnO1xyXG5cclxuXHRcdGl0ZW1zID0gaXRlbXMubWFwKGZ1bmN0aW9uKHByb2R1Y3QsIGluZGV4KSB7XHJcblx0XHRcdHZhciBpdGVtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCh0YWdUeXBlKTtcclxuXHRcdFx0aXRlbSA9IERPTS5hZGRDbGFzcyhpdGVtLCBjbGFzc05hbWUpO1xyXG5cclxuXHRcdFx0dmFyIG92ZXJsYXkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuXHRcdFx0b3ZlcmxheS5jbGFzc05hbWUgPSAncHJvZHVjdC1vdmVybGF5JztcclxuXHRcdFx0aXRlbS5hcHBlbmRDaGlsZChvdmVybGF5KTtcclxuXHJcblx0XHRcdGZvcih2YXIgcHJvcCBpbiBwcm9kdWN0KSB7XHJcblx0XHRcdFx0aWYodGhpcy5zZXR0aW5ncy5hdHRyaWJ1dGVzLmluZGV4T2YocHJvcCkgPT0gLTEpIHtcclxuXHRcdFx0XHRcdGNvbnRpbnVlO1xyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0dmFyIHRhZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQodGFnVHlwZSk7XHJcblxyXG5cdFx0XHRcdGlmKHByb3AgPT0gJ2ltYWdlJykge1xyXG5cdFx0XHRcdFx0dmFyIGltYWdlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW1nJyk7XHJcblx0XHRcdFx0XHRpbWFnZS5zZXRBdHRyaWJ1dGUoJ3NyYycsIHByb2R1Y3RbcHJvcF0pO1xyXG5cdFx0XHRcdFx0aXRlbS5hcHBlbmRDaGlsZChpbWFnZSk7XHJcblx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdHRhZy5pbm5lckhUTUwgPSBwcm9kdWN0W3Byb3BdIHx8ICcnO1xyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0dGFnLmNsYXNzTmFtZSA9ICdwcm9kdWN0LScgKyBDb21tb24ua2ViYWJDYXNlKHByb3ApO1xyXG5cdFx0XHRcdG92ZXJsYXkuYXBwZW5kQ2hpbGQodGFnKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0dmFyIHRlbXAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KHRhZ1R5cGUpO1xyXG5cdFx0XHR0ZW1wLmFwcGVuZENoaWxkKGl0ZW0pO1xyXG5cdFx0XHRcclxuXHRcdFx0d3JhcHBlZEl0ZW1zICs9IHRlbXAuaW5uZXJIVE1MICsgXCJcXG5cIjtcclxuXHJcblx0XHRcdHJldHVybiBwcm9kdWN0O1xyXG5cdFx0fS5iaW5kKHRoaXMpKTtcclxuXHJcblx0XHRyZXR1cm4gd3JhcHBlZEl0ZW1zO1xyXG5cdH1cclxuXHJcblx0QWZ0ZXJMb2FkZWQocHJvZHVjdHMpIFxyXG5cdHtcclxuXHRcdC8vXHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBBZGQgdGhlIGVDb21tZXJjZSBzdHlsZSB0YWdzIHRvIHRoZSBET00uXHJcblx0ICovXHJcblx0YWRkU3R5bGVUYWcoKSBcclxuXHR7XHJcblx0XHRsZXQgY3NzID0gYFxyXG5cdFx0XHQucHJvZHVjdCB7XHJcblx0XHRcdFx0cG9zaXRpb246IHJlbGF0aXZlO1xyXG5cdFx0XHRcdG1hcmdpbjogNXB4IDVweDtcclxuXHRcdFx0XHRib3JkZXI6IDFweCBzb2xpZCAjZTRlNGU0O1xyXG5cdFx0XHRcdHdpZHRoOiAke3RoaXMuc2V0dGluZ3Mud2lkdGh9O1xyXG5cdFx0XHRcdGhlaWdodDogJHt0aGlzLnNldHRpbmdzLmhlaWdodH07XHJcblx0XHRcdFx0Y3Vyc29yOiBwb2ludGVyO1xyXG5cdFx0XHRcdGNvbG9yOiAjZmZmZmZmO1xyXG5cdFx0XHRcdG92ZXJmbG93OiBoaWRkZW47XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdC5wcm9kdWN0ID4gLnByb2R1Y3Qtb3ZlcmxheSB7XHJcblx0XHRcdFx0cG9zaXRpb246IGFic29sdXRlO1xyXG5cdFx0XHRcdHRvcDogMDtcclxuXHRcdFx0XHRsZWZ0OiAwO1xyXG5cdFx0XHRcdHdpZHRoOiAxMDAlO1xyXG5cdFx0XHRcdGhlaWdodDogMTAwJTtcclxuXHRcdFx0XHRvcGFjaXR5OiAwLjU7XHJcblx0XHRcdFx0ei1pbmRleDogNTtcclxuXHRcdFx0XHR0cmFuc2l0aW9uOiAxcyBhbGw7XHJcblx0XHRcdFx0dHJhbnNmb3JtOiB0cmFuc2xhdGVYKC0yNTBweCk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdC5wcm9kdWN0OmhvdmVyID4gLnByb2R1Y3Qtb3ZlcmxheSB7XHJcblx0XHRcdFx0YmFja2dyb3VuZDogcmdiYSgwLCAwLCAwLCAwLjQ1KTtcclxuXHRcdFx0XHR0cmFuc2Zvcm06IHRyYW5zbGF0ZVgoMHB4KTtcclxuXHRcdFx0XHRvcGFjaXR5OiAxO1xyXG5cdFx0XHRcdHRyYW5zaXRpb246IDFzIGFsbDtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0LnByb2R1Y3QgPiBpbWcge1xyXG5cdFx0XHRcdHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuXHRcdFx0XHRsZWZ0OiAwO1xyXG5cdFx0XHRcdHRvcDogMDtcclxuXHRcdFx0XHR3aWR0aDogMTAwJTtcclxuXHRcdFx0XHRoZWlnaHQ6IDEwMCU7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdC5wcm9kdWN0ID4gLnByb2R1Y3QtaW1hZ2Uge1xyXG5cdFx0XHRcdHotaW5kZXg6IDA7XHJcblx0XHRcdFx0cG9zaXRpb246IGFic29sdXRlO1xyXG5cdFx0XHRcdHRvcDogMDtcclxuXHRcdFx0XHRsZWZ0OiAwO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHQucHJvZHVjdCA+IC5wcm9kdWN0LW92ZXJsYXkgPiAucHJvZHVjdC1uYW1lLCBcclxuXHRcdFx0LnByb2R1Y3QgPiAucHJvZHVjdC1vdmVybGF5ID4gLnByb2R1Y3QtcHJpY2UsXHJcblx0XHRcdC5wcm9kdWN0ID4gLnByb2R1Y3Qtb3ZlcmxheSA+IC5wcm9kdWN0LWRlbGl2ZXJ5LXRpbWUge1xyXG5cdFx0XHRcdHotaW5kZXg6IDE7XHJcblx0XHRcdFx0cG9zaXRpb246IHJlbGF0aXZlO1xyXG5cdFx0XHRcdHRleHQtYWxpZ246IGNlbnRlcjtcclxuXHRcdFx0XHRtYXJnaW4tdG9wOiAyNXB4O1xyXG5cdFx0XHR9XHJcblx0XHRgO1xyXG5cdCAgICBcclxuXHQgICAgcmV0dXJuIERPTS5hZGRTdHlsZSgnZUNvbW1lcmNlLVByb2R1Y3RzJywgY3NzKTtcclxuXHR9XHJcbn1cblxuLyoqXHJcbiAqIFRoZSBTZXJ2aWNlcyBPYmplY3QsIGhhbmRsZXMgdGhlIHNlcnZpY2VzLlxyXG4gKi9cclxuY2xhc3MgU2VydmljZXMgXHJcbntcclxuXHJcbn1cblxuLyoqXHJcbiAqIFRoZSBkZWZhdWx0IHNldHRpbmdzIG9mIHRoZSBwYWdpbmF0aW9uLlxyXG4gKi9cclxubGV0IGRlZmF1bHRTZXR0aW5ncyQzID0ge1xyXG5cdGVsZW1lbnQ6ICcucGFnaW5hdGlvbi1saW5rcycsXHJcblx0Y2xhc3M6ICdjb2wteHMtb2Zmc2V0LTQgY29sLXhzLTgnLFxyXG5cdHBlcl9wYWdlOiA1LFxyXG5cdHRvdGFsX3BhZ2VzOiAzLFxyXG59O1xyXG5cclxubGV0IENvbnRhaW5lciQzO1xyXG5cclxuY2xhc3MgUGFnaW5hdGlvbiBcclxue1xyXG5cdGNvbnN0cnVjdG9yKGNvbnRhaW5lcikgXHJcblx0e1xyXG5cdFx0Q29udGFpbmVyJDMgPSBjb250YWluZXI7XHJcblx0XHR0aGlzLnNldHVwKGRlZmF1bHRTZXR0aW5ncyQzKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFNldCB0aGUgUGFnaW5hdGlvbiBvYmplY3QgdXAuXHJcblx0ICovXHJcblx0c2V0dXAoc2V0dGluZ3MpXHJcblx0e1xyXG5cdFx0aWYodHlwZW9mIHNldHRpbmdzICE9ICdvYmplY3QnKSB7XHJcblx0XHRcdHRocm93IG5ldyBJbnZhbGlkQXJndW1lbnRFeGNlcHRpb24kMTtcclxuXHRcdH1cclxuXHJcblx0XHR0aGlzLnNldHRpbmdzID0gQ29tbW9uLmV4dGVuZChkZWZhdWx0U2V0dGluZ3MkMywgc2V0dGluZ3MpO1xyXG5cclxuXHRcdHRoaXMuc2V0RWxlbWVudCh0aGlzLnNldHRpbmdzLmVsZW1lbnQpO1xyXG5cdFx0dGhpcy5yZXBsYWNlTGlua3ModGhpcy5saW5rcyk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBSZXBsYWNlcyB0aGUgbGlua3MgaW4gdGhlIHdyYXBwZXIuXHJcblx0ICovXHJcblx0cmVwbGFjZUxpbmtzKGxpbmtzKVxyXG5cdHtcclxuXHRcdHRoaXMud3JhcHBlci5pbm5lckhUTUwgPSAnJztcclxuXHRcdHRoaXMud3JhcHBlci5hcHBlbmRDaGlsZChsaW5rcyk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBTZXRzIHRoZSB3cmFwcGVyIGVsZW1lbnQuXHJcblx0ICovXHJcblx0c2V0RWxlbWVudChzZWxlY3RvcilcclxuXHR7XHJcblx0XHR0aGlzLndyYXBwZXIgPSBET00uZWxlbWVudChzZWxlY3Rvcik7XHJcblx0XHRcclxuXHRcdERPTS5hZGRDbGFzcyh0aGlzLndyYXBwZXIsIHRoaXMuc2V0dGluZ3MuY2xhc3MpO1xyXG5cclxuXHRcdHRoaXMubGlua3MgPSB0aGlzLmNyZWF0ZUxpbmtzKCk7XHJcblx0XHR0aGlzLmJpbmRFdmVudExpc3RlbmVycyh0aGlzLmxpbmtzKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEJpbmRzIHRoZSBidXR0b25zIGV2ZW50cyBsaXN0ZW5lcnMuXHJcblx0ICovXHJcblx0YmluZEV2ZW50TGlzdGVuZXJzKGxpbmtzKSBcclxuXHR7XHJcblx0XHRsZXQgaW5zdGFuY2UgPSB0aGlzO1xyXG5cdFx0bGV0IFByb2R1Y3RzID0gQ29udGFpbmVyJDMuZ2V0SW5zdGFuY2UoJ1Byb2R1Y3RzJyk7XHJcblxyXG5cdFx0dGhpcy5uZXh0LmNoaWxkTm9kZXNbMF0ub25jbGljayA9IGZ1bmN0aW9uKGV2ZW50KSB7XHJcblx0XHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcblx0XHRcdFxyXG5cdFx0XHRQcm9kdWN0cy5nZXRQcm9kdWN0c0J5UGFnZShpbnN0YW5jZS5jdXJyZW50KzEpLnRoZW4oZnVuY3Rpb24ocHJvZHVjdHMpIHtcclxuXHRcdFx0XHRQcm9kdWN0cy5yZXBsYWNlSXRlbXMocHJvZHVjdHMpO1xyXG5cdFx0XHR9KTtcclxuXHJcblx0XHRcdGluc3RhbmNlLnNldEN1cnJlbnQoaW5zdGFuY2UuY3VycmVudCsxKTtcclxuXHRcdH07XHJcblxyXG5cdFx0dGhpcy5wcmV2aW91cy5jaGlsZE5vZGVzWzBdLm9uY2xpY2sgPSBmdW5jdGlvbihldmVudCkge1xyXG5cdFx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdFx0XHRcclxuXHRcdFx0UHJvZHVjdHMuZ2V0UHJvZHVjdHNCeVBhZ2UoaW5zdGFuY2UuY3VycmVudC0xKS50aGVuKGZ1bmN0aW9uKHByb2R1Y3RzKSB7XHJcblx0XHRcdFx0UHJvZHVjdHMucmVwbGFjZUl0ZW1zKHByb2R1Y3RzKTtcclxuXHRcdFx0fSk7XHJcblxyXG5cdFx0XHRpbnN0YW5jZS5zZXRDdXJyZW50KGluc3RhbmNlLmN1cnJlbnQtMSk7XHJcblx0XHR9O1xyXG5cclxuXHRcdGZvcih2YXIgaSA9IDA7IGkgPCB0aGlzLnBhZ2VzLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdHRoaXMucGFnZXNbaV0uY2hpbGROb2Rlc1swXS5vbmNsaWNrID0gZnVuY3Rpb24oZXZlbnQpIHtcclxuXHRcdFx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdFx0XHRcdHZhciBwYWdlTnVtYmVyID0gdGhpcy5nZXRBdHRyaWJ1dGUoJ2RhdGEtcGFnZS1ucicpO1xyXG5cdFx0XHRcdFxyXG5cdFx0XHRcdFByb2R1Y3RzLmdldFByb2R1Y3RzQnlQYWdlKHBhZ2VOdW1iZXIpLnRoZW4oZnVuY3Rpb24ocHJvZHVjdHMpIHtcclxuXHRcdFx0XHRcdFByb2R1Y3RzLnJlcGxhY2VJdGVtcyhwcm9kdWN0cyk7XHJcblx0XHRcdFx0fSk7XHJcblx0XHRcdFx0XHJcblx0XHRcdFx0aW5zdGFuY2Uuc2V0Q3VycmVudChwYWdlTnVtYmVyKTtcclxuXHRcdFx0fTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFNldHMgdGhlIGN1cnJlbnQgcGFnZS5cclxuXHQgKi9cclxuXHRzZXRDdXJyZW50KHBhZ2VOdW1iZXIpIFxyXG5cdHtcclxuXHRcdGlmKHRoaXMubm90SW5QYWdlUmFuZ2UocGFnZU51bWJlcikpIHtcclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0fVxyXG5cclxuXHRcdHRoaXMuY3VycmVudCA9IHBhZ2VOdW1iZXI7XHJcblx0XHR0aGlzLmNoYW5nZVVybChwYWdlTnVtYmVyKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEdldHMgdGhlIGN1cnJlbnQgcGFnZS5cclxuXHQgKi9cclxuXHRnZXRDdXJyZW50KCkgXHJcblx0e1xyXG5cdFx0cmV0dXJuIHRoaXMuY3VycmVudDtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIENyZWF0ZXMgdGhlIHBhZ2luYXRpb24gbGlua3MuXHJcblx0ICovXHJcblx0Y3JlYXRlTGlua3MoKSBcclxuXHR7XHRcclxuXHRcdGxldCB1bCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3VsJyk7XHJcblx0XHRcclxuXHRcdHRoaXMucGFnZXMgPSB0aGlzLmNyZWF0ZVBhZ2VMaW5rcygpO1xyXG5cdFx0dGhpcy5wcmV2aW91cyA9IHRoaXMuY3JlYXRlUHJldmlvdXNCdXR0b24oKTtcclxuXHRcdHRoaXMubmV4dCA9IHRoaXMuY3JlYXRlTmV4dEJ1dHRvbigpO1xyXG5cclxuXHRcdHVsLmNsYXNzTmFtZSA9ICdwYWdpbmF0aW9uJztcclxuXHRcdHVsLmFwcGVuZENoaWxkKHRoaXMucHJldmlvdXMpO1xyXG5cclxuXHRcdHRoaXMucGFnZXMuZm9yRWFjaChmdW5jdGlvbihwYWdlKSB7XHJcblx0XHRcdHVsLmFwcGVuZENoaWxkKHBhZ2UpO1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0dWwuYXBwZW5kQ2hpbGQodGhpcy5uZXh0KTtcclxuXHJcblx0XHRyZXR1cm4gdWw7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBDcmVhdGVzIHRoZSBwYWdlcyBpdGVtIGxpbmtzLlxyXG5cdCAqL1xyXG5cdGNyZWF0ZVBhZ2VMaW5rcygpIFxyXG5cdHtcclxuXHRcdHZhciBwYWdlcyA9IFtdO1xyXG5cdFx0XHJcblx0XHRmb3IodmFyIGkgPSAxOyBpIDw9IDM7IGkrKykge1xyXG5cdFx0XHR2YXIgcGFnZUl0ZW0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaScpO1xyXG5cdFx0XHR2YXIgbGluayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKTtcclxuXHRcdFx0cGFnZUl0ZW0uY2xhc3NOYW1lID0gJ3BhZ2UtaXRlbSc7XHJcblx0XHRcdGxpbmsuY2xhc3NOYW1lID0gJ3BhZ2UtbGluayc7XHJcblx0XHRcdGxpbmsuc2V0QXR0cmlidXRlKCdocmVmJywgJz9wYWdlPScrIGkpO1xyXG5cdFx0XHRsaW5rLnNldEF0dHJpYnV0ZSgnZGF0YS1wYWdlLW5yJywgaSk7XHJcblx0XHRcdGxpbmsuaW5uZXJIVE1MID0gaTtcclxuXHRcdFx0cGFnZUl0ZW0uYXBwZW5kQ2hpbGQobGluayk7XHJcblx0XHRcdHBhZ2VzLnB1c2gocGFnZUl0ZW0pO1xyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiBwYWdlcztcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIENyZWF0ZXMgdGhlIHByZXZpb3VzIGJ1dHRvbiBsaW5rLlxyXG5cdCAqL1xyXG5cdGNyZWF0ZVByZXZpb3VzQnV0dG9uKCkgXHJcblx0e1xyXG5cdFx0dmFyIGxpID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKTtcclxuXHRcdHZhciBsaW5rID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpO1xyXG5cdFx0dmFyIHNwYW4xID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xyXG5cdFx0dmFyIHNwYW4yID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xyXG5cdFx0XHJcblx0XHRcclxuXHRcdGxpLmNsYXNzTmFtZSA9ICdwYWdlLWl0ZW0nO1xyXG5cdFx0bGluay5jbGFzc05hbWUgPSAncGFnZS1saW5rJztcclxuXHRcdHNwYW4yLmNsYXNzTmFtZSA9ICdzci1vbmx5JztcclxuXHJcblx0XHRsaW5rLnNldEF0dHJpYnV0ZSgnaHJlZicsICcnKTtcclxuXHRcdGxpbmsuc2V0QXR0cmlidXRlKCdhcmlhLWxhYmVsJywgJ1ByZXZpb3VzJyk7XHJcblx0XHRzcGFuMS5zZXRBdHRyaWJ1dGUoJ2FyaWEtaGlkZGVuJywgJ3RydWUnKTtcclxuXHJcblx0XHRzcGFuMS5pbm5lckhUTUwgPSAnJmxhcXVvOyc7XHJcblx0XHRzcGFuMi5pbm5lckhUTUwgPSAnUHJldmlvdXMnO1xyXG5cclxuXHRcdGxpbmsuYXBwZW5kQ2hpbGQoc3BhbjEpO1xyXG5cdFx0bGluay5hcHBlbmRDaGlsZChzcGFuMik7XHJcblx0XHRsaS5hcHBlbmRDaGlsZChsaW5rKTtcclxuXHJcblx0XHRyZXR1cm4gbGk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBDcmVhdGVzIHRoZSBuZXh0IGJ1dHRvbiBsaW5rLlxyXG5cdCAqL1xyXG5cdGNyZWF0ZU5leHRCdXR0b24oKSBcclxuXHR7XHJcblx0XHR2YXIgbGkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaScpO1xyXG5cdFx0dmFyIGxpbmsgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJyk7XHJcblx0XHR2YXIgc3BhbjEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XHJcblx0XHR2YXIgc3BhbjIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XHJcblx0XHRcclxuXHRcdGxpLmNsYXNzTmFtZSA9ICdwYWdlLWl0ZW0nO1xyXG5cdFx0bGluay5jbGFzc05hbWUgPSAncGFnZS1saW5rJztcclxuXHRcdHNwYW4yLmNsYXNzTmFtZSA9ICdzci1vbmx5JztcclxuXHJcblx0XHRsaW5rLnNldEF0dHJpYnV0ZSgnaHJlZicsICcnKTtcclxuXHRcdGxpbmsuc2V0QXR0cmlidXRlKCdhcmlhLWxhYmVsJywgJ05leHQnKTtcclxuXHRcdHNwYW4xLnNldEF0dHJpYnV0ZSgnYXJpYS1oaWRkZW4nLCAndHJ1ZScpO1xyXG5cclxuXHRcdHNwYW4xLmlubmVySFRNTCA9ICcmcmFxdW87JztcclxuXHRcdHNwYW4yLmlubmVySFRNTCA9ICdOZXh0JztcclxuXHJcblx0XHRsaW5rLmFwcGVuZENoaWxkKHNwYW4xKTtcclxuXHRcdGxpbmsuYXBwZW5kQ2hpbGQoc3BhbjIpO1xyXG5cdFx0bGkuYXBwZW5kQ2hpbGQobGluayk7XHJcblxyXG5cdFx0dGhpcy5uZXh0ID0gbGluazsgXHJcblxyXG5cdFx0cmV0dXJuIGxpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQ2hlY2tzIGlmIHRoZSBnaXZlbiBwYWdlIGlzIGluIHJhbmdlLlxyXG5cdCAqL1xyXG5cdG5vdEluUGFnZVJhbmdlKHBhZ2VOdW1iZXIpIFxyXG5cdHtcclxuXHRcdHJldHVybiAocGFnZU51bWJlciA+IHRoaXMudG90YWxQYWdlcyB8fCBwYWdlTnVtYmVyIDw9IDApIHx8IGlzTmFOKHBhZ2VOdW1iZXIpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQ2hhbmdlcyB0aGUgdXJsIHRvIGEgZ2l2ZW4gcGFnZSBudW1iZXIuXHJcblx0ICovXHJcblx0Y2hhbmdlVXJsKHBhZ2VOdW1iZXIpIFxyXG5cdHtcclxuXHRcdHBhZ2VOdW1iZXIgPSAgcGFnZU51bWJlciB8fCBHRVRfVmFycygpWydwYWdlJ107XHJcblx0XHR3aW5kb3cuaGlzdG9yeS5yZXBsYWNlU3RhdGUoJycsICcnLCB0aGlzLnVwZGF0ZVVSTFBhcmFtZXRlcih3aW5kb3cubG9jYXRpb24uaHJlZiwgJ3BhZ2UnLCBwYWdlTnVtYmVyKSk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBHZXQgdGhlIGdldCB2YXJpYWJsZXMgZnJvbSB0aGUgdXJsLlxyXG5cdCAqL1xyXG5cdEdFVF9WYXJzKCkgXHJcblx0e1xyXG5cdFx0dmFyIHZhcnMgPSB7fTtcclxuXHRcdHZhciBwYXJ0cyA9IHdpbmRvdy5sb2NhdGlvbi5ocmVmLnJlcGxhY2UoL1s/Jl0rKFtePSZdKyk9KFteJl0qKS9naSwgZnVuY3Rpb24obSwga2V5LCB2YWx1ZSkge1xyXG5cdFx0XHR2YXJzW2tleV0gPSB2YWx1ZTtcclxuXHRcdH0pO1xyXG5cclxuXHRcdHJldHVybiB2YXJzO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogTW9kaWZpZXMgdGhlIGdldCBwYXJhbWV0ZXIgaW4gdGhlIHVybC5cclxuXHQgKi9cclxuXHR1cGRhdGVVUkxQYXJhbWV0ZXIodXJsLCBwYXJhbSwgcGFyYW1WYWwpIFxyXG5cdHtcclxuXHQgICAgdmFyIG5ld0FkZGl0aW9uYWxVUkwgPSBcIlwiO1xyXG5cdCAgICB2YXIgdGVtcEFycmF5ID0gdXJsLnNwbGl0KFwiP1wiKTtcclxuXHQgICAgdmFyIGJhc2VVUkwgPSB0ZW1wQXJyYXlbMF07XHJcblx0ICAgIHZhciBhZGRpdGlvbmFsVVJMID0gdGVtcEFycmF5WzFdO1xyXG5cdCAgICB2YXIgdGVtcCA9IFwiXCI7XHJcblxyXG5cdCAgICBpZiAoYWRkaXRpb25hbFVSTCkge1xyXG5cdCAgICAgICAgdGVtcEFycmF5ID0gYWRkaXRpb25hbFVSTC5zcGxpdChcIiZcIik7XHJcblx0ICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRlbXBBcnJheS5sZW5ndGg7IGkrKyl7XHJcblx0ICAgICAgICAgICAgaWYgKHRlbXBBcnJheVtpXS5zcGxpdCgnPScpWzBdICE9IHBhcmFtKXtcclxuXHQgICAgICAgICAgICAgICAgbmV3QWRkaXRpb25hbFVSTCArPSB0ZW1wICsgdGVtcEFycmF5W2ldO1xyXG5cdCAgICAgICAgICAgICAgICB0ZW1wID0gXCImXCI7XHJcblx0ICAgICAgICAgICAgfVxyXG5cdCAgICAgICAgfVxyXG5cdCAgICB9XHJcblxyXG5cdCAgICB2YXIgcm93c1RleHQgPSB0ZW1wICsgXCJcIiArIHBhcmFtICsgXCI9XCIgKyBwYXJhbVZhbDtcclxuXHQgICAgcmV0dXJuIGJhc2VVUkwgKyBcIj9cIiArIG5ld0FkZGl0aW9uYWxVUkwgKyByb3dzVGV4dDtcclxuXHR9XHJcblxyXG5cdHJlc2V0KCkgXHJcblx0e1xyXG5cdFx0dGhpcy5zZXRDdXJyZW50KDEpO1xyXG5cdFx0dGhpcy5jaGFuZ2VVcmwoMSk7XHJcblx0fVxyXG59XG5cbmxldCBpbml0YWxpemVkID0gZmFsc2U7XG5cbmxldCBkZWZhdWx0U2V0dGluZ3MgPSB7XG5cdGNhcnRTZXNzaW9uSWQ6IFtdLFxuXHRpbXBvcnRCb290c3RyYXA6IGZhbHNlLFxuXHRjb21wb25lbnRzOiBbJ1Byb2R1Y3RzJywgJ1NlcnZpY2VzJywgJ0ZpbHRlcicsICdQYWdpbmF0aW9uJ11cbn07XG5cbmNsYXNzIGVDb21tZXJjZVxue1xuXHRjb25zdHJ1Y3RvcihzZXR0aW5ncylcblx0e1xuXHRcdEV4Y2VwdGlvbkhhbmRsZXIuaW5pdGFsaXplKCk7XG5cblx0XHRpZih0eXBlb2Ygc2V0dGluZ3MgIT0gJ29iamVjdCcpIHtcblx0XHRcdHRocm93IG5ldyBJbnZhbGlkQXJndW1lbnRFeGNlcHRpb24kMTtcblx0XHR9XG5cblx0XHR0aGlzLmNvbnRhaW5lciA9IG5ldyBDb250YWluZXI7XG5cdFx0dGhpcy5zZXR0aW5ncyA9IENvbW1vbi5leHRlbmQoZGVmYXVsdFNldHRpbmdzLCBzZXR0aW5ncyk7XG5cdFx0XG5cdFx0YmluZENvbXBvbmVudHNEZXBlbmRlbmNpZXMuY2FsbCh0aGlzLCBzZXR0aW5ncy5jb21wb25lbnRzKTtcblxuXHRcdGluaXRhbGl6ZWQgPSB0cnVlO1xuXG5cdFx0cmV0dXJuIG5ldyBQcm94eSh0aGlzLCB7XG5cdFx0XHRnZXQ6IGZ1bmN0aW9uKHRhcmdldCwgb2JqZWN0KSB7XG5cdFx0XHRcdHJldHVybiB0YXJnZXQuY29udGFpbmVyLm1ha2Uob2JqZWN0KTtcblx0XHRcdH1cblx0XHR9KTtcblx0fVxufVxuXG4vKipcbiAqIEJpbmRzIGNvbXBvbmVudHMgZGVwZW5kZW5jaWVzLlxuICovXG5mdW5jdGlvbiBiaW5kQ29tcG9uZW50c0RlcGVuZGVuY2llcyhjb21wb25lbnRzKSB7XG5cdGxldCBjb250YWluZXIgPSB0aGlzLmNvbnRhaW5lcjtcblxuXHRjb250YWluZXIuYmluZCgnRmlsdGVyJywgZnVuY3Rpb24oKSB7XG5cdFx0cmV0dXJuIG5ldyBGaWx0ZXIoY29udGFpbmVyKTtcblx0fSk7XG5cdFxuXHRjb250YWluZXIuYmluZCgnU2VydmljZXMnLCBmdW5jdGlvbigpIHsgXG5cdFx0cmV0dXJuIG5ldyBTZXJ2aWNlcyhjb250YWluZXIpO1xuXHR9KTtcblxuXHRjb250YWluZXIuYmluZCgnUGFnaW5hdGlvbicsIGZ1bmN0aW9uKCkge1xuXHRcdHJldHVybiBuZXcgUGFnaW5hdGlvbihjb250YWluZXIpO1xuXHR9KTtcblxuXHRjb250YWluZXIuYmluZCgnUHJvZHVjdHMnLCBmdW5jdGlvbigpIHtcblx0XHRyZXR1cm4gbmV3IFByb2R1Y3RzKGNvbnRhaW5lciwgY29udGFpbmVyLm1ha2UoJ1BhZ2luYXRpb24nKSk7XG5cdH0pO1xufVxuXG5yZXR1cm4gZUNvbW1lcmNlO1xuXG59KCkpO1xuIl19
