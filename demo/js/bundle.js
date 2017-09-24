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
		url: '',
		initStaticData: {}
	};

	var Container$2 = void 0;

	/**
  * The Products Object, handles the products.
  */

	var Products = function () {
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

				if (typeof Container$2 == 'undefined') {
					return;
				}

				if (Container$2.instanceExist('Pagination')) {
					this.paginator.reset(this.settings.initStaticData);
					this.getProducts(this.paginator.getCurrent());
				}

				this.setElement(this.settings.element);

				this.addStyleTag();
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

				var items = this.wrapAllWithHTML(items, this.settings.itemClass, 'div');

				this.wrapper.innerHTML = items.text;

				return items;
			}

			/**
    * Makes an Ajax call to the server.
    */

		}, {
			key: 'getProducts',
			value: function getProducts(pageNumber) {
				return new Promise(function (resolve, reject) {
					if (this.paginator.notInPageRange(pageNumber)) {
						return reject('Not in pagination range');
					}

					var xhr = new XMLHttpRequest() || new ActiveXObject("Microsoft.XMLHTTP");

					xhr.open('GET', this.settings.url + '?page=' + pageNumber, true);

					var instance = this;

					xhr.onreadystatechange = function () {
						if (this.status == 200 && this.readyState == 4) {
							instance.currentItems = JSON.parse(this.responseText);

							for (var i = 0; i < instance.currentItems.length; i++) {
								var product = instance.currentItems[i];
								instance.AfterLoaded.call(this, product);
							}

							instance.replaceItems(instance.currentItems);
							resolve(instance.currentItems);
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

				var text = '';

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

					text += temp.innerHTML + "\n";

					return product;
				}.bind(this));

				return {
					"data": items,
					"text": text
				};
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
				this.next.childNodes[0].onclick = function (event) {
					event.preventDefault();
					Container$3.getInstance('Products').replaceItems(this.current + 1);
					setCurrent(current + 1);
				};

				this.previous.childNodes[0].onclick = function (event) {
					event.preventDefault();
					Container$3.getInstance('Products').replaceItems(this.current - 1);
					setCurrent(current - 1);
				};

				for (var i = 0; i < this.pages.length; i++) {
					this.pages[i].childNodes[0].onclick = function (event) {
						event.preventDefault();
						var pageNumber = this.getAttribute('data-page-nr');
						Container$3.getInstance('Products').replaceItems(pageNumber);
						setCurrent(pageNumber);
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
				return pageNumber > this.totalPages || pageNumber <= 0;
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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVDb21tZXJjZS5qcyJdLCJuYW1lcyI6WyJlQ29tbWVyY2UiLCJET00iLCJzdHJpbmciLCJyZXBsYWNlIiwiZWxlbWVudCIsImNsYXNzTmFtZSIsInRyaW0iLCJzcGxpdCIsImkiLCJsZW5ndGgiLCJjbGFzc0xpc3QiLCJhZGQiLCJyZW1vdmUiLCJzZWxlY3RvciIsInF1ZXJ5RWxlbWVudCIsImlkIiwiY3NzIiwiaW52YWxpZEFyZ3VtZW50RXhjZXB0aW9uIiwiaGVhZCIsImRvY3VtZW50IiwiZ2V0RWxlbWVudHNCeVRhZ05hbWUiLCJzdHlsZVRhZyIsImNyZWF0ZUVsZW1lbnQiLCJDU1MiLCJtaW5pZnlDc3MiLCJpbm5lckhUTUwiLCJzZXRBdHRyaWJ1dGUiLCJhcHBlbmRDaGlsZCIsInF1ZXJ5U2VsZWN0b3IiLCJOb2RlRWxlbWVudERvZXNOb3RFeGlzdEV4Y2VwdGlvbiIsIkV2ZW50IiwibmFtZSIsImNhbGxiYWNrIiwiSW52YWxpZEFyZ3VtZW50RXhjZXB0aW9uIiwiZXZlbnRzIiwiZGF0YSIsIkJhZEV2ZW50Q2FsbEV4Y2VwdGlvbiIsIkFycmF5IiwiQ29tbW9uIiwiY3VycmVudE9iaiIsIm5ld09iaiIsImV4dGVuZGVkIiwicHJvcCIsIk9iamVjdCIsInByb3RvdHlwZSIsImhhc093blByb3BlcnR5IiwiY2FsbCIsIm5lZWRsZSIsImh5c3RhY2siLCJjb25zdHJ1Y3RvciIsIm9iamVjdCIsInRvTG93ZXJDYXNlIiwiSW52YWxpZEJpbmRpbmdFeGNlcHRpb24iLCJjb25zb2xlIiwiZXJyb3IiLCJFcnJvciIsIkludmFsaWRBcmd1bWVudEV4Y2VwdGlvbiQxIiwiaW5zdGFuY2VzIiwiQ29udGFpbmVyIiwia2V5IiwiY29uY3JldGUiLCJiaW5kIiwiaW5zdGFuY2UiLCJpbnN0YW5jZUV4aXN0IiwiZ2V0SW5zdGFuY2UiLCJzZXRJbnN0YW5jZSIsIkNvbXBvbmVudHNFeGNlcHRpb24iLCJCYWRFdmVudENhbGxFeGNlcHRpb24kMSIsIkNvbXBvbmVudE5vdFJlZ2lzdGVyZWRFeGNlcHRpb24iLCJOb2RlRWxlbWVudERvZXNOb3RFeGlzdEV4Y2VwdGlvbiQxIiwiRXhjZXB0aW9uSGFuZGxlciIsIndpbmRvdyIsIm9uZXJyb3IiLCJtZXNzYWdlIiwic291cmNlIiwibGluZW5vIiwiY29sbm8iLCJkZWZhdWx0U2V0dGluZ3MkMSIsImNsYXNzIiwid2lkdGgiLCJoZWlnaHQiLCJGaWx0ZXIiLCJjb250YWluZXIiLCJzZXR1cCIsInNldHRpbmdzIiwiZXh0ZW5kIiwic2V0RWxlbWVudCIsIndyYXBwZXIiLCJhZGRDbGFzcyIsImRlZmF1bHRTZXR0aW5ncyQyIiwiaXRlbUNsYXNzIiwiYXR0cmlidXRlcyIsInVybCIsImluaXRTdGF0aWNEYXRhIiwiQ29udGFpbmVyJDIiLCJQcm9kdWN0cyIsInBhZ2luYXRvciIsInJlc2V0IiwiZ2V0UHJvZHVjdHMiLCJnZXRDdXJyZW50IiwiYWRkU3R5bGVUYWciLCJpdGVtcyIsImlzQXJyYXkiLCJ3cmFwQWxsV2l0aEhUTUwiLCJ0ZXh0IiwicGFnZU51bWJlciIsIlByb21pc2UiLCJyZXNvbHZlIiwicmVqZWN0Iiwibm90SW5QYWdlUmFuZ2UiLCJ4aHIiLCJYTUxIdHRwUmVxdWVzdCIsIkFjdGl2ZVhPYmplY3QiLCJvcGVuIiwib25yZWFkeXN0YXRlY2hhbmdlIiwic3RhdHVzIiwicmVhZHlTdGF0ZSIsImN1cnJlbnRJdGVtcyIsIkpTT04iLCJwYXJzZSIsInJlc3BvbnNlVGV4dCIsInByb2R1Y3QiLCJBZnRlckxvYWRlZCIsInJlcGxhY2VJdGVtcyIsInNlbmQiLCJ0YWdUeXBlIiwibWFwIiwiaW5kZXgiLCJpdGVtIiwib3ZlcmxheSIsImluZGV4T2YiLCJ0YWciLCJpbWFnZSIsImtlYmFiQ2FzZSIsInRlbXAiLCJwcm9kdWN0cyIsImFkZFN0eWxlIiwiU2VydmljZXMiLCJkZWZhdWx0U2V0dGluZ3MkMyIsInBlcl9wYWdlIiwidG90YWxfcGFnZXMiLCJDb250YWluZXIkMyIsIlBhZ2luYXRpb24iLCJyZXBsYWNlTGlua3MiLCJsaW5rcyIsImNyZWF0ZUxpbmtzIiwiYmluZEV2ZW50TGlzdGVuZXJzIiwibmV4dCIsImNoaWxkTm9kZXMiLCJvbmNsaWNrIiwiZXZlbnQiLCJwcmV2ZW50RGVmYXVsdCIsImN1cnJlbnQiLCJzZXRDdXJyZW50IiwicHJldmlvdXMiLCJwYWdlcyIsImdldEF0dHJpYnV0ZSIsImNoYW5nZVVybCIsInVsIiwiY3JlYXRlUGFnZUxpbmtzIiwiY3JlYXRlUHJldmlvdXNCdXR0b24iLCJjcmVhdGVOZXh0QnV0dG9uIiwiZm9yRWFjaCIsInBhZ2UiLCJwYWdlSXRlbSIsImxpbmsiLCJwdXNoIiwibGkiLCJzcGFuMSIsInNwYW4yIiwidG90YWxQYWdlcyIsIkdFVF9WYXJzIiwiaGlzdG9yeSIsInJlcGxhY2VTdGF0ZSIsInVwZGF0ZVVSTFBhcmFtZXRlciIsImxvY2F0aW9uIiwiaHJlZiIsInZhcnMiLCJwYXJ0cyIsIm0iLCJ2YWx1ZSIsInBhcmFtIiwicGFyYW1WYWwiLCJuZXdBZGRpdGlvbmFsVVJMIiwidGVtcEFycmF5IiwiYmFzZVVSTCIsImFkZGl0aW9uYWxVUkwiLCJyb3dzVGV4dCIsImluaXRhbGl6ZWQiLCJkZWZhdWx0U2V0dGluZ3MiLCJjYXJ0U2Vzc2lvbklkIiwiaW1wb3J0Qm9vdHN0cmFwIiwiY29tcG9uZW50cyIsImluaXRhbGl6ZSIsImJpbmRDb21wb25lbnRzRGVwZW5kZW5jaWVzIiwiUHJveHkiLCJnZXQiLCJ0YXJnZXQiLCJtYWtlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsSUFBSUEsWUFBYSxZQUFZO0FBQzdCOztBQUQ2QixLQUd2QkMsR0FIdUI7QUFBQTtBQUFBO0FBQUE7O0FBQUE7QUFBQTs7QUFLNUI7OztBQUw0Qiw2QkFRWEMsTUFSVyxFQVM1QjtBQUNJQSxhQUFTQSxPQUFPQyxPQUFQLENBQWUsd0NBQWYsRUFBeUQsRUFBekQsQ0FBVDtBQUNBRCxhQUFTQSxPQUFPQyxPQUFQLENBQWUsUUFBZixFQUF5QixHQUF6QixDQUFUO0FBQ0FELGFBQVNBLE9BQU9DLE9BQVAs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Q0EsR0FGRDs7QUFJQUEsWUFBVXJCLElBQVYsQ0FBZSxVQUFmLEVBQTJCLFlBQVc7QUFDckMsVUFBTyxJQUFJa0MsUUFBSixDQUFhYixTQUFiLEVBQXdCQSxVQUFVb0gsSUFBVixDQUFlLFlBQWYsQ0FBeEIsQ0FBUDtBQUNBLEdBRkQ7QUFHQTs7QUFFRCxRQUFPdE0sU0FBUDtBQUVDLENBMzlCZ0IsRUFBakIiLCJmaWxlIjoiZUNvbW1lcmNlLmpzIiwic291cmNlc0NvbnRlbnQiOlsidmFyIGVDb21tZXJjZSA9IChmdW5jdGlvbiAoKSB7XG4ndXNlIHN0cmljdCc7XG5cbmNsYXNzIERPTVxyXG57XHJcblx0LyoqXHJcblx0ICogTWluaWZpZXMgdGhlIGNzcyB0ZXh0LlxyXG5cdCAqL1xyXG5cdHN0YXRpYyBtaW5pZnlDc3Moc3RyaW5nKSBcclxuXHR7XHJcblx0ICAgIHN0cmluZyA9IHN0cmluZy5yZXBsYWNlKC9cXC9cXCooPzooPyFcXCpcXC8pW1xcc1xcU10pKlxcKlxcL3xbXFxyXFxuXFx0XSsvZywgJycpO1xyXG5cdCAgICBzdHJpbmcgPSBzdHJpbmcucmVwbGFjZSgvIHsyLH0vZywgJyAnKTtcclxuXHQgICAgc3RyaW5nID0gc3RyaW5nLnJlcGxhY2UoLyhbezp9XSkvZywgJyQxJyk7XHJcblx0ICAgIHN0cmluZyA9IHN0cmluZy5yZXBsYWNlKC8oWzssXSkgL2csICckMScpO1xyXG5cdCAgICBzdHJpbmcgPSBzdHJpbmcucmVwbGFjZSgvICEvZywgJyEnKTtcclxuXHQgICAgXHJcblx0ICAgIHJldHVybiBzdHJpbmc7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBBZGRzIGNsYXNzIHRvIGEgZ2l2ZW4gZWxlbWVudC5cclxuXHQgKi9cclxuXHRzdGF0aWMgYWRkQ2xhc3MoZWxlbWVudCwgY2xhc3NOYW1lKSBcclxuXHR7XHJcblx0XHRpZihjbGFzc05hbWUgPT0gJycpIHJldHVybiBlbGVtZW50O1xyXG5cclxuXHRcdGNsYXNzTmFtZSA9IGNsYXNzTmFtZS50cmltKCk7XHJcblx0XHRjbGFzc05hbWUgPSBjbGFzc05hbWUuc3BsaXQoJyAnKTtcclxuXHJcblx0XHRmb3IodmFyIGkgPSAwOyBpIDwgY2xhc3NOYW1lLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdGVsZW1lbnQuY2xhc3NMaXN0LmFkZChjbGFzc05hbWVbaV0pO1xyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiBlbGVtZW50O1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogUmVtb3ZlcyBjbGFzcyBmcm9tIGEgZ2l2ZW4gZWxlbWVudC5cclxuXHQgKi9cclxuXHRzdGF0aWMgcmVtb3ZlQ2xhc3MoZWxlbWVudCwgY2xhc3NOYW1lKSBcclxuXHR7XHJcblx0XHRlbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoY2xhc3NOYW1lKTtcclxuXHRcdFxyXG5cdFx0cmV0dXJuIGVsZW1lbnQ7XHJcblx0fVxyXG5cclxuXHRzdGF0aWMgZWxlbWVudChzZWxlY3RvcikgXHJcblx0e1xyXG5cdFx0bGV0IGVsZW1lbnQgPSBxdWVyeUVsZW1lbnQoc2VsZWN0b3IpO1xyXG5cdFx0cmV0dXJuIGVsZW1lbnQ7XHJcblx0fVxyXG5cclxuXHRzdGF0aWMgYWRkU3R5bGUoaWQsIGNzcykgXHJcblx0e1xyXG5cdFx0aWYodHlwZW9mIGNzcyAhPSAnc3RyaW5nJykge1xyXG5cdFx0XHR0aHJvdyBuZXcgaW52YWxpZEFyZ3VtZW50RXhjZXB0aW9uO1xyXG5cdFx0fVxyXG5cclxuXHRcdGxldCBoZWFkID0gZG9jdW1lbnQuaGVhZCB8fCBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnaGVhZCcpWzBdO1xyXG5cdFx0bGV0IHN0eWxlVGFnID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3R5bGUnKTtcclxuXHJcblx0XHQvLyBwaXBlIGl0IHRocm91Z2ggdGhlIG1pbmZpZXJcclxuXHQgICAgbGV0IENTUyA9IHRoaXMubWluaWZ5Q3NzKGNzcyk7XHJcblx0ICAgIC8vIGFkZGluZyBpdCB0byB0aGUgc3R5bGV0YWdcclxuXHQgICAgc3R5bGVUYWcuaW5uZXJIVE1MID0gQ1NTO1xyXG5cdCAgICAvLyBnaXZlIGFuIGlkIHRvIHJlY29nbml6ZSB0aGUgc3R5bGUgdGFnXHJcblx0XHRzdHlsZVRhZy5zZXRBdHRyaWJ1dGUoJ2lkJywgaWQpO1xyXG5cdFx0Ly8gYXBwZW5kaW5nIHRoYXQgc3R5bGUgdGFnIHRvIHRoZSBET00gaGVhZCB0YWdcclxuXHRcdGhlYWQuYXBwZW5kQ2hpbGQoc3R5bGVUYWcpO1xyXG5cdH1cclxufVxyXG5cclxuLyoqXHJcbiAqIFF1ZXJpZXMgYW4gZWxlbWVudCBmcm9tIHRoZSBET00uXHJcbiAqL1xyXG5mdW5jdGlvbiBxdWVyeUVsZW1lbnQoc2VsZWN0b3IpIHtcclxuXHRsZXQgZWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3Ioc2VsZWN0b3IpIHx8IG51bGw7XHJcblxyXG5cdGlmKCEgZWxlbWVudCkge1xyXG5cdFx0dGhyb3cgbmV3IE5vZGVFbGVtZW50RG9lc05vdEV4aXN0RXhjZXB0aW9uO1xyXG5cdH1cclxuXHJcblx0cmV0dXJuIGVsZW1lbnQ7XHJcbn1cblxuY2xhc3MgRXZlbnRcclxue1xyXG5cdC8qKlxyXG5cdCAqIExpc3RlbiB0byBhbiBldmVudC5cclxuXHQgKi9cclxuXHRzdGF0aWMgbGlzdGVuKG5hbWUsIGNhbGxiYWNrKSB7XHJcblx0XHRpZiAodHlwZW9mIGNhbGxiYWNrICE9PSAnZnVuY3Rpb24nKSB7XHJcblx0XHRcdHRocm93IG5ldyBJbnZhbGlkQXJndW1lbnRFeGNlcHRpb247XHJcblx0XHR9XHJcblxyXG5cdFx0ZXZlbnRzW25hbWVdID0gY2FsbGJhY2s7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBGaXJlcyBhbiBldmVudC5cclxuXHQgKi9cclxuXHRzdGF0aWMgdHJpZ2dlcihuYW1lLCBkYXRhKSB7XHJcblx0XHRkYXRhID0gZGF0YSB8fCBudWxsO1xyXG5cclxuXHRcdGlmKHR5cGVvZiBldmVudHNbbmFtZV0gIT09ICdmdW5jdGlvbicpIHtcclxuXHRcdFx0dGhyb3cgbmV3IEJhZEV2ZW50Q2FsbEV4Y2VwdGlvbjtcclxuXHRcdH1cclxuXHJcblx0XHRpZihkYXRhICE9IG51bGwgJiYgZGF0YSBpbnN0YW5jZW9mIEFycmF5KSB7XHJcblx0XHJcblx0XHRcdHJldHVybiBldmVudHNbbmFtZV0oLi4uZGF0YSk7XHJcblx0XHR9XHJcblxyXG5cdFx0ZXZlbnRzW25hbWVdKCk7XHJcblx0fVxyXG59XG5cbmNsYXNzIENvbW1vblxyXG57XHJcblx0LyoqXHJcblx0ICogRXh0ZW5kIGFuIG9iamVjdC5cclxuXHQgKi9cclxuXHRzdGF0aWMgZXh0ZW5kKGN1cnJlbnRPYmosIG5ld09iaiApIHtcclxuXHRcdHZhciBleHRlbmRlZCA9IHt9O1xyXG5cdCAgICB2YXIgcHJvcDtcclxuXHJcblx0ICAgIGZvciAocHJvcCBpbiBjdXJyZW50T2JqKSB7XHJcblx0ICAgICAgICBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGN1cnJlbnRPYmosIHByb3ApKSB7XHJcblx0ICAgICAgICAgICAgZXh0ZW5kZWRbcHJvcF0gPSBjdXJyZW50T2JqW3Byb3BdO1xyXG5cdCAgICAgICAgfVxyXG5cdCAgICB9XHJcblxyXG5cdCAgICBmb3IgKHByb3AgaW4gbmV3T2JqKSB7XHJcblx0ICAgICAgICBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG5ld09iaiwgcHJvcCkpIHtcclxuXHQgICAgICAgICAgICBleHRlbmRlZFtwcm9wXSA9IG5ld09ialtwcm9wXTtcclxuXHQgICAgICAgIH1cclxuXHQgICAgfVxyXG5cclxuXHQgICAgcmV0dXJuIGV4dGVuZGVkO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQ2hlY2tzIGZvciBhIG5lZWRsZSBpbiBoeXN0YWNrLlxyXG5cdCAqL1xyXG5cdHN0YXRpYyBpbl9hcnJheShuZWVkbGUsIGh5c3RhY2spIHtcclxuXHRcdGlmKGh5c3RhY2suY29uc3RydWN0b3IgIT09IEFycmF5KSByZXR1cm47XHJcblxyXG5cdFx0Zm9yKHZhciBpID0gMDsgaSA8PSBoeXN0YWNrLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdGlmKG5lZWRsZSA9PSBoeXN0YWNrW2ldKSByZXR1cm4gdHJ1ZTtcdFxyXG5cdFx0fVxyXG5cdFxyXG5cdFx0cmV0dXJuIGZhbHNlO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQ2hlY2tzIGlmIGFuIG9iamVjdCBpcyBlbXB0eS5cclxuXHQgKi9cclxuXHRzdGF0aWMgZW1wdHlPYmplY3Qob2JqZWN0KSB7XHJcblx0XHRmb3IodmFyIHByb3AgaW4gb2JqZWN0KSB7XHJcblx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gdHJ1ZTtcclxuXHR9XHJcblxyXG5cdHN0YXRpYyBjb250YWluc09iamVjdChvYmplY3QsIGh5c3RhY2spIFxyXG5cdHtcclxuXHQgICAgdmFyIGk7XHJcblxyXG5cdCAgICBmb3IgKGkgPSAwOyBpIDwgaHlzdGFjay5sZW5ndGg7IGkrKykge1xyXG5cdCAgICAgICAgaWYgKHR5cGVvZiBvYmplY3QgPT0gJ3N0cmluZycgJiYgaHlzdGFja1tpXS5jb25zdHJ1Y3Rvci5uYW1lID09PSBvYmplY3QpIHtcclxuXHQgICAgICAgIFx0cmV0dXJuIHRydWU7XHJcblx0ICAgICAgICB9XHJcblxyXG5cdCAgICAgICAgaWYgKGh5c3RhY2tbaV0gPT09IG9iamVjdCkge1xyXG5cdCAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG5cdCAgICAgICAgfVxyXG5cdCAgICB9XHJcblxyXG5cdCAgICByZXR1cm4gZmFsc2U7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBDb252ZXJ0IGNhbWVsQ2FzZSB0byBrZWJhYi1jYXNlLlxyXG5cdCAqL1xyXG5cdHN0YXRpYyBrZWJhYkNhc2Uoc3RyaW5nKSB7XHJcblx0XHRyZXR1cm4gc3RyaW5nLnJlcGxhY2UoLyhbYS16XSkoW0EtWl0pL2csICckMS0kMicpLnRvTG93ZXJDYXNlKCk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBDaGVja3MgaWYgYSBnaXZlbiBwYXJhbWV0ZXIgaXMgYW4gb2JqZWN0LlxyXG5cdCAqL1xyXG5cdHN0YXRpYyBpc09iamVjdChvYmplY3QpIHtcclxuXHRcdHJldHVybiB0eXBlb2Ygb2JqZWN0ID09ICdvYmplY3QnO1xyXG5cdH1cclxufVxuXG5jbGFzcyBJbnZhbGlkQmluZGluZ0V4Y2VwdGlvblxyXG57XHJcblx0Y29uc3RydWN0b3IoKSBcclxuXHR7IFxyXG4gICAgXHRjb25zb2xlLmVycm9yKGAke3RoaXMuY29uc3RydWN0b3IubmFtZX0sIHRyeWluZyB0byBiaW5kIGFuIGFscmVhZHkgZXhpc3RpbmcgYm91bmQuYCk7XHJcblxyXG4gICAgXHR0aHJvdyBuZXcgRXJyb3I7XHJcbiAgICB9XHJcbn1cblxuY2xhc3MgSW52YWxpZEFyZ3VtZW50RXhjZXB0aW9uJDFcclxue1xyXG5cdGNvbnN0cnVjdG9yKCkgXHJcblx0eyBcclxuICAgIFx0Y29uc29sZS5lcnJvcihgJHt0aGlzLmNvbnN0cnVjdG9yLm5hbWV9LCBwYXNzaW5nIGludmFsaWQgYXJndW1lbnRzLmApO1xyXG5cclxuICAgIFx0dGhyb3cgbmV3IEVycm9yO1xyXG4gICAgfVxyXG59XG5cbmxldCBpbnN0YW5jZXMgPSBbXTtcclxuXHJcbmNsYXNzIENvbnRhaW5lciBcclxue1xyXG5cdC8qKlxyXG5cdCAqIEJpbmRzIGtleSB0byBjb25jcmV0ZSBjbGFzcy5cclxuXHQgKi9cclxuXHRiaW5kKGtleSwgY29uY3JldGUpIFxyXG5cdHtcclxuXHRcdGlmICh0eXBlb2Yga2V5ICE9ICdzdHJpbmcnIHx8IHR5cGVvZiBjb25jcmV0ZSAhPSAnZnVuY3Rpb24nKSB7XHJcblx0XHRcdHRocm93IG5ldyBJbnZhbGlkQXJndW1lbnRFeGNlcHRpb24kMTtcclxuXHRcdH1cclxuXHJcblx0XHRpZiAodHlwZW9mIHRoaXNba2V5XSAhPSAndW5kZWZpbmVkJykge1xyXG5cdFx0XHR0aHJvdyBuZXcgSW52YWxpZEJpbmRpbmdFeGNlcHRpb247XHJcblx0XHR9XHJcblxyXG5cdFx0dGhpc1trZXldID0gY29uY3JldGU7XHJcblx0XHR0aGlzW2tleV0uYmluZChjb25jcmV0ZSk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBTZXRzIGFuIGluc3RhbmNlLlxyXG5cdCAqL1xyXG5cdHNldEluc3RhbmNlKGtleSwgaW5zdGFuY2UpIFxyXG5cdHtcclxuXHRcdGlmKHR5cGVvZiBrZXkgIT0gJ3N0cmluZycgfHwgdHlwZW9mIGluc3RhbmNlICE9ICdvYmplY3QnKSB7XHJcblx0XHRcdHRocm93IG5ldyBJbnZhbGlkQXJndW1lbnRFeGNlcHRpb24kMTtcclxuXHRcdH1cclxuXHJcblx0XHRpbnN0YW5jZXNba2V5XSA9IGluc3RhbmNlO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogR2V0cyBhbiBpbnN0YW5jZS5cclxuXHQgKi9cclxuXHRnZXRJbnN0YW5jZShrZXkpIFxyXG5cdHtcclxuXHRcdGlmKHR5cGVvZiBrZXkgIT0gJ3N0cmluZycpIHtcclxuXHRcdFx0dGhyb3cgbmV3IEludmFsaWRBcmd1bWVudEV4Y2VwdGlvbiQxO1xyXG5cdFx0fVxyXG5cclxuXHRcdGlmKHR5cGVvZiBrZXkgPT0gJ29iamVjdCcpIHtcclxuXHRcdFx0cmV0dXJuIGluc3RhbmNlc1trZXkuY29uc3RydWN0b3IubmFtZV0gfHwgbnVsbDtcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gaW5zdGFuY2VzW2tleV0gfHwgbnVsbDtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIENoZWNrcyBpZiBhbiBpbnN0YW5jZSBleGlzdC5cclxuXHQgKi9cclxuXHRpbnN0YW5jZUV4aXN0KGluc3RhbmNlKSBcclxuXHR7XHJcblx0XHRpZih0eXBlb2YgaW5zdGFuY2UgPT0gJ29iamVjdCcpIHtcclxuXHRcdFx0cmV0dXJuICh0eXBlb2YgaW5zdGFuY2VzW2luc3RhbmNlLmNvbnN0cnVjdG9yLm5hbWVdICE9PSAndW5kZWZpbmVkJyk7XHJcblx0XHR9XHJcblx0XHRcclxuXHRcdFxyXG5cdFx0cmV0dXJuIChpbnN0YW5jZSBpbiBpbnN0YW5jZXMpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQ3JlYXRlcyBhbiBpbnN0YW5jZS5cclxuXHQgKi9cclxuXHRtYWtlKG9iamVjdClcclxuXHR7XHJcblx0XHRsZXQgaW5zdGFuY2UgPSB7fTtcclxuXHJcblx0XHRpZiAodGhpcy5pbnN0YW5jZUV4aXN0KG9iamVjdCkpIHtcclxuXHRcdFx0cmV0dXJuIHRoaXMuZ2V0SW5zdGFuY2Uob2JqZWN0KTtcclxuXHRcdH1cclxuXHJcblx0XHRpZiAodHlwZW9mIG9iamVjdCA9PSAnb2JqZWN0Jykge1xyXG5cdFx0XHRpbnN0YW5jZSA9IG9iamVjdDtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdGluc3RhbmNlID0gbmV3IHRoaXNbb2JqZWN0XTtcdFxyXG5cdFx0fVxyXG5cclxuXHRcdHRoaXMuc2V0SW5zdGFuY2Uob2JqZWN0LCBpbnN0YW5jZSk7IFxyXG5cclxuXHRcdHJldHVybiBpbnN0YW5jZTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFJldHJpZXZlIGFsbCBpbnN0YW5jZXMuXHJcblx0ICovXHJcblx0aW5zdGFuY2VzKCkge1xyXG5cdFx0cmV0dXJuIGluc3RhbmNlcztcclxuXHR9XHJcbn1cblxuY2xhc3MgQ29tcG9uZW50c0V4Y2VwdGlvblxyXG57XHJcblx0Y29uc3RydWN0b3IoKSBcclxuXHR7IFxyXG4gICAgXHRjb25zb2xlLmVycm9yKGAke3RoaXMuY29uc3RydWN0b3IubmFtZX0sIGV4cGVjdGluZyBmb3IgYXQgbGVhc3Qgb25lIGNvbXBvbmVudHMsIGJ1dCBub25lIHdhcyBnaXZlbiwgXHJcblx0XHRcdFx0XHRcdFx0XHRwbGVhc2UgYWRkIGF0IGxlYXN0IG9uZSByZXF1aXJlbWVudChQcm9kdWN0cywgU2VydmljZXMgb3IvYW5kIEZpbHRlcmApO1xyXG5cclxuICAgIFx0dGhyb3cgbmV3IEVycm9yO1xyXG4gICAgfVxyXG59XG5cbmNsYXNzIEJhZEV2ZW50Q2FsbEV4Y2VwdGlvbiQxXHJcbntcclxuXHRjb25zdHJ1Y3RvcigpIFxyXG5cdHsgXHJcbiAgICBcdGNvbnNvbGUuZXJyb3IoYCR7dGhpcy5jb25zdHJ1Y3Rvci5uYW1lfSwgbGlzdGVuaW5nIHRvIGEgbm9uZS1leGlzdGluZyBldmVudGApO1xyXG5cclxuICAgIFx0dGhyb3cgbmV3IEVycm9yO1xyXG4gICAgfVxyXG59XG5cbmNsYXNzIENvbXBvbmVudE5vdFJlZ2lzdGVyZWRFeGNlcHRpb25cclxue1xyXG5cdGNvbnN0cnVjdG9yKCkgXHJcblx0eyBcclxuICAgIFx0Y29uc29sZS5lcnJvcihgJHt0aGlzLmNvbnN0cnVjdG9yLm5hbWV9LCBjb21wb25lbnRzIG11c3QgYmUgcmVnaXN0ZXJlZCBpbiBvcmRlciB0byB1c2UgdGhlbWApO1xyXG5cclxuICAgIFx0dGhyb3cgbmV3IEVycm9yO1xyXG4gICAgfVxyXG59XG5cbmNsYXNzIE5vZGVFbGVtZW50RG9lc05vdEV4aXN0RXhjZXB0aW9uJDFcclxue1xyXG5cdGNvbnN0cnVjdG9yKCkgXHJcblx0eyBcclxuICAgIFx0Y29uc29sZS5lcnJvcihgJHt0aGlzLmNvbnN0cnVjdG9yLm5hbWV9LCB0cnlpbmcgdG8gZmV0Y2ggYW4gbm9uZS1leGlzdGluZyBlbGVtZW50IGZyb20gdGhlIERPTWApO1xyXG5cclxuICAgIFx0dGhyb3cgbmV3IEVycm9yO1xyXG4gICAgfVxyXG59XG5cbmNsYXNzIEV4Y2VwdGlvbkhhbmRsZXJcclxue1xyXG5cdC8qKlxyXG5cdCAqIEhhbmRsZSBhbGwgdGhlIGVycm9yc1xyXG5cdCAqL1xyXG5cdHN0YXRpYyBpbml0YWxpemUoKSB7XHRcclxuXHRcdHdpbmRvdy5vbmVycm9yID0gZnVuY3Rpb24obWVzc2FnZSwgc291cmNlLCBsaW5lbm8sIGNvbG5vLCBlcnJvcikge1xyXG5cclxuXHRcdFx0aWYgKGVycm9yIGluc3RhbmNlb2YgSW52YWxpZEFyZ3VtZW50RXhjZXB0aW9uJDEpIHtcclxuXHRcdFx0XHQvLyBoYW5kbGVcclxuXHRcdFx0fSBlbHNlIGlmIChlcnJvciBpbnN0YW5jZW9mIEludmFsaWRCaW5kaW5nRXhjZXB0aW9uKSB7XHJcblx0XHRcdFx0Ly8gaGFuZGxlXHJcblx0XHRcdH0gZWxzZSBpZiAoZXJyb3IgaW5zdGFuY2VvZiBCYWRFdmVudENhbGxFeGNlcHRpb24kMSkge1xyXG5cdFx0XHRcdC8vIGhhbmRsZVxyXG5cdFx0XHR9IGVsc2UgaWYgKGVycm9yIGluc3RhbmNlb2YgQ29tcG9uZW50c0V4Y2VwdGlvbikge1xyXG5cdFx0XHRcdC8vIGhhbmRsZVxyXG5cdFx0XHR9IGVsc2UgaWYgKGVycm9yIGluc3RhbmNlb2YgQ29tcG9uZW50Tm90UmVnaXN0ZXJlZEV4Y2VwdGlvbikge1xyXG5cdFx0XHRcdC8vIGhhbmRsZVxyXG5cdFx0XHR9IGVsc2UgaWYgKGVycm9yIGluc3RhbmNlb2YgTm9kZUVsZW1lbnREb2VzTm90RXhpc3RFeGNlcHRpb24kMSkge1xyXG5cdFx0XHRcdFxyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0cmV0dXJuIHRydWU7XHJcblx0XHR9O1xyXG5cdH1cclxufVxuXG4vKipcclxuICogVGhlIGRlZmF1bHQgc2V0dGluZ3Mgb2YgdGhlIGZpbHRlci5cclxuICovXHJcbmxldCBkZWZhdWx0U2V0dGluZ3MkMSA9IHtcclxuXHRlbGVtZW50OiAnLmZpbHRlcicsXHJcblx0ZGF0YToge30sXHJcblx0Y2xhc3M6ICdjb2wteHMtMicsXHJcblx0d2lkdGg6ICcnLFxyXG5cdGhlaWdodDogJycsXHJcbn07XHJcblxyXG5cclxuLyoqXHJcbiAqIFRoZSBGaWx0ZXIgT2JqZWN0LCBoYW5kbGVzIHRoZSBmaWx0ZXIgb2YgdGhlIHByb2R1Y3RzL3NlcnZpY2VzLlxyXG4gKi9cclxuY2xhc3MgRmlsdGVyIFxyXG57XHJcblx0Y29uc3RydWN0b3IoY29udGFpbmVyKSBcclxuXHR7XHJcblx0XHR0aGlzLnNldHVwKGRlZmF1bHRTZXR0aW5ncyQxKTtcclxuXHR9XHJcblxyXG5cdHNldHVwKHNldHRpbmdzKVxyXG5cdHtcclxuXHRcdGlmKHR5cGVvZiBzZXR0aW5ncyAhPSAnb2JqZWN0Jykge1xyXG5cdFx0XHR0aHJvdyBuZXcgSW52YWxpZEFyZ3VtZW50RXhjZXB0aW9uJDE7XHJcblx0XHR9XHJcblxyXG5cdFx0dGhpcy5zZXR0aW5ncyA9IENvbW1vbi5leHRlbmQoZGVmYXVsdFNldHRpbmdzJDEsIHNldHRpbmdzKTtcclxuXHJcblx0XHR0aGlzLnNldEVsZW1lbnQodGhpcy5zZXR0aW5ncy5lbGVtZW50KTtcclxuXHR9XHJcblxyXG5cdHNldEVsZW1lbnQoc2VsZWN0b3IpXHJcblx0e1xyXG5cdFx0dGhpcy53cmFwcGVyID0gRE9NLmVsZW1lbnQoc2VsZWN0b3IpO1xyXG5cdFx0XHJcblx0XHRET00uYWRkQ2xhc3ModGhpcy53cmFwcGVyLCB0aGlzLnNldHRpbmdzLmNsYXNzKTtcclxuXHR9XHJcbn1cblxuLyoqXHJcbiAqIFRoZSBkZWZhdWx0IHNldHRpbmdzIG9mIGVhY2ggcHJvZHVjdC5cclxuICovXHJcbmxldCBkZWZhdWx0U2V0dGluZ3MkMiA9IHtcclxuXHRlbGVtZW50OiAnLnByb2R1Y3RzJyxcclxuXHRjbGFzczogJycsXHJcblx0aXRlbUNsYXNzOiAnJyxcclxuXHR3aWR0aDogJzIwMHB4JyxcclxuXHRoZWlnaHQ6ICcyNTBweCcsXHJcblx0YXR0cmlidXRlczogWyduYW1lJywgJ3ByaWNlJywgJ2RlbGl2ZXJ5VGltZScsICdpbWFnZSddLFxyXG5cdHVybDogJycsXHJcblx0aW5pdFN0YXRpY0RhdGE6IHt9LFxyXG59O1xyXG5cclxubGV0IENvbnRhaW5lciQyO1xyXG5cclxuLyoqXHJcbiAqIFRoZSBQcm9kdWN0cyBPYmplY3QsIGhhbmRsZXMgdGhlIHByb2R1Y3RzLlxyXG4gKi9cclxuY2xhc3MgUHJvZHVjdHMgXHJcbntcclxuXHRjb25zdHJ1Y3Rvcihjb250YWluZXIsIHBhZ2luYXRvcikgXHJcblx0e1xyXG5cdFx0dGhpcy5zZXR1cChkZWZhdWx0U2V0dGluZ3MkMik7XHJcblxyXG5cdFx0Q29udGFpbmVyJDIgPSBjb250YWluZXI7XHJcblx0XHR0aGlzLnBhZ2luYXRvciA9IHBhZ2luYXRvcjtcclxuXHR9XHJcblxyXG5cdHNldHVwKHNldHRpbmdzKVxyXG5cdHtcclxuXHRcdGlmICh0eXBlb2Ygc2V0dGluZ3MgIT0gJ29iamVjdCcpIHtcclxuXHRcdFx0dGhyb3cgbmV3IEludmFsaWRBcmd1bWVudEV4Y2VwdGlvbiQxO1xyXG5cdFx0fVxyXG5cclxuXHRcdHRoaXMuc2V0dGluZ3MgPSBDb21tb24uZXh0ZW5kKGRlZmF1bHRTZXR0aW5ncyQyLCBzZXR0aW5ncyk7XHJcblxyXG5cdFx0aWYgKHR5cGVvZiBDb250YWluZXIkMiA9PSAndW5kZWZpbmVkJykge1xyXG5cdFx0XHRyZXR1cm47XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKENvbnRhaW5lciQyLmluc3RhbmNlRXhpc3QoJ1BhZ2luYXRpb24nKSkgIHtcclxuXHRcdFx0dGhpcy5wYWdpbmF0b3IucmVzZXQodGhpcy5zZXR0aW5ncy5pbml0U3RhdGljRGF0YSk7XHJcblx0XHRcdHRoaXMuZ2V0UHJvZHVjdHModGhpcy5wYWdpbmF0b3IuZ2V0Q3VycmVudCgpKTtcclxuXHRcdH1cclxuXHJcblx0XHR0aGlzLnNldEVsZW1lbnQodGhpcy5zZXR0aW5ncy5lbGVtZW50KTtcclxuXHJcblx0XHR0aGlzLmFkZFN0eWxlVGFnKCk7XHJcblx0fVxyXG5cclxuXHRzZXRFbGVtZW50KHNlbGVjdG9yKVxyXG5cdHtcclxuXHRcdHRoaXMud3JhcHBlciA9IERPTS5lbGVtZW50KHNlbGVjdG9yKTtcclxuXHRcdFxyXG5cdFx0RE9NLmFkZENsYXNzKHRoaXMud3JhcHBlciwgdGhpcy5zZXR0aW5ncy5jbGFzcyk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBSZXBsYWNlIGl0ZW1zIGluIHRoZSBjb250YWluZXIuXHJcblx0ICovXHJcblx0cmVwbGFjZUl0ZW1zKGl0ZW1zKSB7XHJcblx0XHRpZiAoISBBcnJheS5pc0FycmF5KGl0ZW1zKSB8fCB0eXBlb2YgaXRlbXNbMF0gPT0gJ3N0cmluZycpIHtcclxuXHRcdFx0dGhyb3cgbmV3IEludmFsaWRBcmd1bWVudEV4Y2VwdGlvbiQxO1xyXG5cdFx0fVxyXG5cclxuXHRcdHZhciBpdGVtcyA9IHRoaXMud3JhcEFsbFdpdGhIVE1MKGl0ZW1zLCB0aGlzLnNldHRpbmdzLml0ZW1DbGFzcywgJ2RpdicpO1xyXG5cclxuXHRcdHRoaXMud3JhcHBlci5pbm5lckhUTUwgPSBpdGVtcy50ZXh0O1xyXG5cclxuXHRcdHJldHVybiBpdGVtcztcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIE1ha2VzIGFuIEFqYXggY2FsbCB0byB0aGUgc2VydmVyLlxyXG5cdCAqL1xyXG5cdGdldFByb2R1Y3RzKHBhZ2VOdW1iZXIpIFxyXG5cdHtcclxuXHRcdHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcclxuXHRcdFx0aWYgKHRoaXMucGFnaW5hdG9yLm5vdEluUGFnZVJhbmdlKHBhZ2VOdW1iZXIpKSB7XHJcblx0XHRcdFx0cmV0dXJuIHJlamVjdCgnTm90IGluIHBhZ2luYXRpb24gcmFuZ2UnKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0dmFyIHhociA9IG5ldyBYTUxIdHRwUmVxdWVzdCB8fCBuZXcgQWN0aXZlWE9iamVjdChcIk1pY3Jvc29mdC5YTUxIVFRQXCIpO1xyXG5cclxuXHRcdFx0eGhyLm9wZW4oJ0dFVCcsIHRoaXMuc2V0dGluZ3MudXJsICsgJz9wYWdlPScrIHBhZ2VOdW1iZXIsIHRydWUpOyBcclxuXHJcblx0XHRcdGxldCBpbnN0YW5jZSA9IHRoaXM7XHJcblxyXG5cdFx0XHR4aHIub25yZWFkeXN0YXRlY2hhbmdlID0gZnVuY3Rpb24oKSB7XHJcblx0XHRcdFx0aWYodGhpcy5zdGF0dXMgPT0gMjAwICYmIHRoaXMucmVhZHlTdGF0ZSA9PSA0KSB7XHJcblx0XHRcdFx0XHRpbnN0YW5jZS5jdXJyZW50SXRlbXMgPSBKU09OLnBhcnNlKHRoaXMucmVzcG9uc2VUZXh0KTtcclxuXHRcdFx0XHRcdFxyXG5cdFx0XHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBpbnN0YW5jZS5jdXJyZW50SXRlbXMubGVuZ3RoOyBpKyspIHtcclxuXHRcdFx0XHRcdFx0dmFyIHByb2R1Y3QgPSBpbnN0YW5jZS5jdXJyZW50SXRlbXNbaV07XHJcblx0XHRcdFx0XHRcdGluc3RhbmNlLkFmdGVyTG9hZGVkLmNhbGwodGhpcywgcHJvZHVjdCk7XHJcblx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0aW5zdGFuY2UucmVwbGFjZUl0ZW1zKGluc3RhbmNlLmN1cnJlbnRJdGVtcyk7XHJcblx0XHRcdFx0XHRyZXNvbHZlKGluc3RhbmNlLmN1cnJlbnRJdGVtcyk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9O1xyXG5cclxuXHRcdFx0eGhyLm9uZXJyb3IgPSBmdW5jdGlvbihlcnJvcikge1xyXG5cdFx0XHRcdHJlamVjdChlcnJvcik7XHJcblx0XHRcdH07XHJcblxyXG5cdFx0XHR4aHIuc2VuZChudWxsKTtcclxuXHRcdH0uYmluZCh0aGlzKSk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBXcmFwIGFsbCB0aGUgaXRlbXMgd2l0aCBzcGVjaWZjIHRhZyBhbmQgY2xhc3NuYW1lLlxyXG5cdCAqL1xyXG5cdHdyYXBBbGxXaXRoSFRNTChpdGVtcywgY2xhc3NOYW1lLCB0YWdUeXBlKSB7XHJcblx0XHRjbGFzc05hbWUgPSBjbGFzc05hbWUgfHwgbnVsbDtcclxuXHRcdGNsYXNzTmFtZSA9IChjbGFzc05hbWUpID8gJ3Byb2R1Y3QgJyArIGNsYXNzTmFtZSA6ICdwcm9kdWN0JztcclxuXHRcdFxyXG5cdFx0dmFyIHRleHQgPSAnJztcclxuXHJcblx0XHRpdGVtcyA9IGl0ZW1zLm1hcChmdW5jdGlvbihwcm9kdWN0LCBpbmRleCkge1xyXG5cdFx0XHR2YXIgaXRlbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQodGFnVHlwZSk7XHJcblx0XHRcdGl0ZW0gPSBET00uYWRkQ2xhc3MoaXRlbSwgY2xhc3NOYW1lKTtcclxuXHJcblx0XHRcdHZhciBvdmVybGF5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcblx0XHRcdG92ZXJsYXkuY2xhc3NOYW1lID0gJ3Byb2R1Y3Qtb3ZlcmxheSc7XHJcblx0XHRcdGl0ZW0uYXBwZW5kQ2hpbGQob3ZlcmxheSk7XHJcblxyXG5cdFx0XHRmb3IodmFyIHByb3AgaW4gcHJvZHVjdCkge1xyXG5cdFx0XHRcdGlmKHRoaXMuc2V0dGluZ3MuYXR0cmlidXRlcy5pbmRleE9mKHByb3ApID09IC0xKSB7XHJcblx0XHRcdFx0XHRjb250aW51ZTtcclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdHZhciB0YWcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KHRhZ1R5cGUpO1xyXG5cclxuXHRcdFx0XHRpZihwcm9wID09ICdpbWFnZScpIHtcclxuXHRcdFx0XHRcdHZhciBpbWFnZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ltZycpO1xyXG5cdFx0XHRcdFx0aW1hZ2Uuc2V0QXR0cmlidXRlKCdzcmMnLCBwcm9kdWN0W3Byb3BdKTtcclxuXHRcdFx0XHRcdGl0ZW0uYXBwZW5kQ2hpbGQoaW1hZ2UpO1xyXG5cdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHR0YWcuaW5uZXJIVE1MID0gcHJvZHVjdFtwcm9wXSB8fCAnJztcclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdHRhZy5jbGFzc05hbWUgPSAncHJvZHVjdC0nICsgQ29tbW9uLmtlYmFiQ2FzZShwcm9wKTtcclxuXHRcdFx0XHRvdmVybGF5LmFwcGVuZENoaWxkKHRhZyk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHZhciB0ZW1wID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCh0YWdUeXBlKTtcclxuXHRcdFx0dGVtcC5hcHBlbmRDaGlsZChpdGVtKTtcclxuXHRcdFx0XHJcblx0XHRcdHRleHQgKz0gdGVtcC5pbm5lckhUTUwgKyBcIlxcblwiO1xyXG5cclxuXHRcdFx0cmV0dXJuIHByb2R1Y3Q7XHJcblx0XHR9LmJpbmQodGhpcykpO1xyXG5cclxuXHRcdHJldHVybiB7XHJcblx0XHRcdFwiZGF0YVwiOiBpdGVtcyxcclxuXHRcdFx0XCJ0ZXh0XCI6IHRleHRcclxuXHRcdH07XHJcblx0fVxyXG5cclxuXHRBZnRlckxvYWRlZChwcm9kdWN0cykgXHJcblx0e1xyXG5cdFx0Ly9cclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEFkZCB0aGUgZUNvbW1lcmNlIHN0eWxlIHRhZ3MgdG8gdGhlIERPTS5cclxuXHQgKi9cclxuXHRhZGRTdHlsZVRhZygpIFxyXG5cdHtcclxuXHRcdGxldCBjc3MgPSBgXHJcblx0XHRcdC5wcm9kdWN0IHtcclxuXHRcdFx0XHRwb3NpdGlvbjogcmVsYXRpdmU7XHJcblx0XHRcdFx0bWFyZ2luOiA1cHggNXB4O1xyXG5cdFx0XHRcdGJvcmRlcjogMXB4IHNvbGlkICNlNGU0ZTQ7XHJcblx0XHRcdFx0d2lkdGg6ICR7dGhpcy5zZXR0aW5ncy53aWR0aH07XHJcblx0XHRcdFx0aGVpZ2h0OiAke3RoaXMuc2V0dGluZ3MuaGVpZ2h0fTtcclxuXHRcdFx0XHRjdXJzb3I6IHBvaW50ZXI7XHJcblx0XHRcdFx0Y29sb3I6ICNmZmZmZmY7XHJcblx0XHRcdFx0b3ZlcmZsb3c6IGhpZGRlbjtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0LnByb2R1Y3QgPiAucHJvZHVjdC1vdmVybGF5IHtcclxuXHRcdFx0XHRwb3NpdGlvbjogYWJzb2x1dGU7XHJcblx0XHRcdFx0dG9wOiAwO1xyXG5cdFx0XHRcdGxlZnQ6IDA7XHJcblx0XHRcdFx0d2lkdGg6IDEwMCU7XHJcblx0XHRcdFx0aGVpZ2h0OiAxMDAlO1xyXG5cdFx0XHRcdG9wYWNpdHk6IDAuNTtcclxuXHRcdFx0XHR6LWluZGV4OiA1O1xyXG5cdFx0XHRcdHRyYW5zaXRpb246IDFzIGFsbDtcclxuXHRcdFx0XHR0cmFuc2Zvcm06IHRyYW5zbGF0ZVgoLTI1MHB4KTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0LnByb2R1Y3Q6aG92ZXIgPiAucHJvZHVjdC1vdmVybGF5IHtcclxuXHRcdFx0XHRiYWNrZ3JvdW5kOiByZ2JhKDAsIDAsIDAsIDAuNDUpO1xyXG5cdFx0XHRcdHRyYW5zZm9ybTogdHJhbnNsYXRlWCgwcHgpO1xyXG5cdFx0XHRcdG9wYWNpdHk6IDE7XHJcblx0XHRcdFx0dHJhbnNpdGlvbjogMXMgYWxsO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHQucHJvZHVjdCA+IGltZyB7XHJcblx0XHRcdFx0cG9zaXRpb246IGFic29sdXRlO1xyXG5cdFx0XHRcdGxlZnQ6IDA7XHJcblx0XHRcdFx0dG9wOiAwO1xyXG5cdFx0XHRcdHdpZHRoOiAxMDAlO1xyXG5cdFx0XHRcdGhlaWdodDogMTAwJTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0LnByb2R1Y3QgPiAucHJvZHVjdC1pbWFnZSB7XHJcblx0XHRcdFx0ei1pbmRleDogMDtcclxuXHRcdFx0XHRwb3NpdGlvbjogYWJzb2x1dGU7XHJcblx0XHRcdFx0dG9wOiAwO1xyXG5cdFx0XHRcdGxlZnQ6IDA7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdC5wcm9kdWN0ID4gLnByb2R1Y3Qtb3ZlcmxheSA+IC5wcm9kdWN0LW5hbWUsIFxyXG5cdFx0XHQucHJvZHVjdCA+IC5wcm9kdWN0LW92ZXJsYXkgPiAucHJvZHVjdC1wcmljZSxcclxuXHRcdFx0LnByb2R1Y3QgPiAucHJvZHVjdC1vdmVybGF5ID4gLnByb2R1Y3QtZGVsaXZlcnktdGltZSB7XHJcblx0XHRcdFx0ei1pbmRleDogMTtcclxuXHRcdFx0XHRwb3NpdGlvbjogcmVsYXRpdmU7XHJcblx0XHRcdFx0dGV4dC1hbGlnbjogY2VudGVyO1xyXG5cdFx0XHRcdG1hcmdpbi10b3A6IDI1cHg7XHJcblx0XHRcdH1cclxuXHRcdGA7XHJcblx0ICAgIFxyXG5cdCAgICByZXR1cm4gRE9NLmFkZFN0eWxlKCdlQ29tbWVyY2UtUHJvZHVjdHMnLCBjc3MpO1xyXG5cdH1cclxufVxuXG4vKipcclxuICogVGhlIFNlcnZpY2VzIE9iamVjdCwgaGFuZGxlcyB0aGUgc2VydmljZXMuXHJcbiAqL1xyXG5jbGFzcyBTZXJ2aWNlcyBcclxue1xyXG5cclxufVxuXG4vKipcclxuICogVGhlIGRlZmF1bHQgc2V0dGluZ3Mgb2YgdGhlIHBhZ2luYXRpb24uXHJcbiAqL1xyXG5sZXQgZGVmYXVsdFNldHRpbmdzJDMgPSB7XHJcblx0ZWxlbWVudDogJy5wYWdpbmF0aW9uLWxpbmtzJyxcclxuXHRjbGFzczogJ2NvbC14cy1vZmZzZXQtNCBjb2wteHMtOCcsXHJcblx0cGVyX3BhZ2U6IDUsXHJcblx0dG90YWxfcGFnZXM6IDMsXHJcbn07XHJcblxyXG5sZXQgQ29udGFpbmVyJDM7XHJcblxyXG5jbGFzcyBQYWdpbmF0aW9uIFxyXG57XHJcblx0Y29uc3RydWN0b3IoY29udGFpbmVyKSBcclxuXHR7XHJcblx0XHRDb250YWluZXIkMyA9IGNvbnRhaW5lcjtcclxuXHRcdHRoaXMuc2V0dXAoZGVmYXVsdFNldHRpbmdzJDMpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogU2V0IHRoZSBQYWdpbmF0aW9uIG9iamVjdCB1cC5cclxuXHQgKi9cclxuXHRzZXR1cChzZXR0aW5ncylcclxuXHR7XHJcblx0XHRpZih0eXBlb2Ygc2V0dGluZ3MgIT0gJ29iamVjdCcpIHtcclxuXHRcdFx0dGhyb3cgbmV3IEludmFsaWRBcmd1bWVudEV4Y2VwdGlvbiQxO1xyXG5cdFx0fVxyXG5cclxuXHRcdHRoaXMuc2V0dGluZ3MgPSBDb21tb24uZXh0ZW5kKGRlZmF1bHRTZXR0aW5ncyQzLCBzZXR0aW5ncyk7XHJcblxyXG5cdFx0dGhpcy5zZXRFbGVtZW50KHRoaXMuc2V0dGluZ3MuZWxlbWVudCk7XHJcblx0XHR0aGlzLnJlcGxhY2VMaW5rcyh0aGlzLmxpbmtzKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFJlcGxhY2VzIHRoZSBsaW5rcyBpbiB0aGUgd3JhcHBlci5cclxuXHQgKi9cclxuXHRyZXBsYWNlTGlua3MobGlua3MpXHJcblx0e1xyXG5cdFx0dGhpcy53cmFwcGVyLmlubmVySFRNTCA9ICcnO1xyXG5cdFx0dGhpcy53cmFwcGVyLmFwcGVuZENoaWxkKGxpbmtzKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFNldHMgdGhlIHdyYXBwZXIgZWxlbWVudC5cclxuXHQgKi9cclxuXHRzZXRFbGVtZW50KHNlbGVjdG9yKVxyXG5cdHtcclxuXHRcdHRoaXMud3JhcHBlciA9IERPTS5lbGVtZW50KHNlbGVjdG9yKTtcclxuXHRcdFxyXG5cdFx0RE9NLmFkZENsYXNzKHRoaXMud3JhcHBlciwgdGhpcy5zZXR0aW5ncy5jbGFzcyk7XHJcblxyXG5cdFx0dGhpcy5saW5rcyA9IHRoaXMuY3JlYXRlTGlua3MoKTtcclxuXHRcdHRoaXMuYmluZEV2ZW50TGlzdGVuZXJzKHRoaXMubGlua3MpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQmluZHMgdGhlIGJ1dHRvbnMgZXZlbnRzIGxpc3RlbmVycy5cclxuXHQgKi9cclxuXHRiaW5kRXZlbnRMaXN0ZW5lcnMobGlua3MpIFxyXG5cdHtcclxuXHRcdHRoaXMubmV4dC5jaGlsZE5vZGVzWzBdLm9uY2xpY2sgPSBmdW5jdGlvbihldmVudCkge1xyXG5cdFx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdFx0XHRDb250YWluZXIkMy5nZXRJbnN0YW5jZSgnUHJvZHVjdHMnKS5yZXBsYWNlSXRlbXModGhpcy5jdXJyZW50KzEpO1xyXG5cdFx0XHRzZXRDdXJyZW50KGN1cnJlbnQrMSk7XHJcblx0XHR9O1xyXG5cclxuXHRcdHRoaXMucHJldmlvdXMuY2hpbGROb2Rlc1swXS5vbmNsaWNrID0gZnVuY3Rpb24oZXZlbnQpIHtcclxuXHRcdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuXHRcdFx0Q29udGFpbmVyJDMuZ2V0SW5zdGFuY2UoJ1Byb2R1Y3RzJykucmVwbGFjZUl0ZW1zKHRoaXMuY3VycmVudC0xKTtcclxuXHRcdFx0c2V0Q3VycmVudChjdXJyZW50LTEpO1xyXG5cdFx0fTtcclxuXHJcblx0XHRmb3IodmFyIGkgPSAwOyBpIDwgdGhpcy5wYWdlcy5sZW5ndGg7IGkrKykge1xyXG5cdFx0XHR0aGlzLnBhZ2VzW2ldLmNoaWxkTm9kZXNbMF0ub25jbGljayA9IGZ1bmN0aW9uKGV2ZW50KSB7XHJcblx0XHRcdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuXHRcdFx0XHR2YXIgcGFnZU51bWJlciA9IHRoaXMuZ2V0QXR0cmlidXRlKCdkYXRhLXBhZ2UtbnInKTtcclxuXHRcdFx0XHRDb250YWluZXIkMy5nZXRJbnN0YW5jZSgnUHJvZHVjdHMnKS5yZXBsYWNlSXRlbXMocGFnZU51bWJlcik7XHJcblx0XHRcdFx0c2V0Q3VycmVudChwYWdlTnVtYmVyKTtcclxuXHRcdFx0fTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFNldHMgdGhlIGN1cnJlbnQgcGFnZS5cclxuXHQgKi9cclxuXHRzZXRDdXJyZW50KHBhZ2VOdW1iZXIpIFxyXG5cdHtcclxuXHRcdGlmKHRoaXMubm90SW5QYWdlUmFuZ2UocGFnZU51bWJlcikpIHtcclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0fVxyXG5cclxuXHRcdHRoaXMuY3VycmVudCA9IHBhZ2VOdW1iZXI7XHJcblx0XHR0aGlzLmNoYW5nZVVybChwYWdlTnVtYmVyKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEdldHMgdGhlIGN1cnJlbnQgcGFnZS5cclxuXHQgKi9cclxuXHRnZXRDdXJyZW50KCkgXHJcblx0e1xyXG5cdFx0cmV0dXJuIHRoaXMuY3VycmVudDtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIENyZWF0ZXMgdGhlIHBhZ2luYXRpb24gbGlua3MuXHJcblx0ICovXHJcblx0Y3JlYXRlTGlua3MoKSB7XHRcclxuXHRcdGxldCB1bCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3VsJyk7XHJcblx0XHRcclxuXHRcdHRoaXMucGFnZXMgPSB0aGlzLmNyZWF0ZVBhZ2VMaW5rcygpO1xyXG5cdFx0dGhpcy5wcmV2aW91cyA9IHRoaXMuY3JlYXRlUHJldmlvdXNCdXR0b24oKTtcclxuXHRcdHRoaXMubmV4dCA9IHRoaXMuY3JlYXRlTmV4dEJ1dHRvbigpO1xyXG5cclxuXHRcdHVsLmNsYXNzTmFtZSA9ICdwYWdpbmF0aW9uJztcclxuXHRcdHVsLmFwcGVuZENoaWxkKHRoaXMucHJldmlvdXMpO1xyXG5cclxuXHRcdHRoaXMucGFnZXMuZm9yRWFjaChmdW5jdGlvbihwYWdlKSB7XHJcblx0XHRcdHVsLmFwcGVuZENoaWxkKHBhZ2UpO1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0dWwuYXBwZW5kQ2hpbGQodGhpcy5uZXh0KTtcclxuXHJcblx0XHRyZXR1cm4gdWw7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBDcmVhdGVzIHRoZSBwYWdlcyBpdGVtIGxpbmtzLlxyXG5cdCAqL1xyXG5cdGNyZWF0ZVBhZ2VMaW5rcygpIFxyXG5cdHtcclxuXHRcdHZhciBwYWdlcyA9IFtdO1xyXG5cdFx0XHJcblx0XHRmb3IodmFyIGkgPSAxOyBpIDw9IDM7IGkrKykge1xyXG5cdFx0XHR2YXIgcGFnZUl0ZW0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaScpO1xyXG5cdFx0XHR2YXIgbGluayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKTtcclxuXHRcdFx0cGFnZUl0ZW0uY2xhc3NOYW1lID0gJ3BhZ2UtaXRlbSc7XHJcblx0XHRcdGxpbmsuY2xhc3NOYW1lID0gJ3BhZ2UtbGluayc7XHJcblx0XHRcdGxpbmsuc2V0QXR0cmlidXRlKCdocmVmJywgJz9wYWdlPScrIGkpO1xyXG5cdFx0XHRsaW5rLnNldEF0dHJpYnV0ZSgnZGF0YS1wYWdlLW5yJywgaSk7XHJcblx0XHRcdGxpbmsuaW5uZXJIVE1MID0gaTtcclxuXHRcdFx0cGFnZUl0ZW0uYXBwZW5kQ2hpbGQobGluayk7XHJcblx0XHRcdHBhZ2VzLnB1c2gocGFnZUl0ZW0pO1xyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiBwYWdlcztcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIENyZWF0ZXMgdGhlIHByZXZpb3VzIGJ1dHRvbiBsaW5rLlxyXG5cdCAqL1xyXG5cdGNyZWF0ZVByZXZpb3VzQnV0dG9uKCkgXHJcblx0e1xyXG5cdFx0dmFyIGxpID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKTtcclxuXHRcdHZhciBsaW5rID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpO1xyXG5cdFx0dmFyIHNwYW4xID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xyXG5cdFx0dmFyIHNwYW4yID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xyXG5cdFx0XHJcblx0XHRcclxuXHRcdGxpLmNsYXNzTmFtZSA9ICdwYWdlLWl0ZW0nO1xyXG5cdFx0bGluay5jbGFzc05hbWUgPSAncGFnZS1saW5rJztcclxuXHRcdHNwYW4yLmNsYXNzTmFtZSA9ICdzci1vbmx5JztcclxuXHJcblx0XHRsaW5rLnNldEF0dHJpYnV0ZSgnaHJlZicsICcnKTtcclxuXHRcdGxpbmsuc2V0QXR0cmlidXRlKCdhcmlhLWxhYmVsJywgJ1ByZXZpb3VzJyk7XHJcblx0XHRzcGFuMS5zZXRBdHRyaWJ1dGUoJ2FyaWEtaGlkZGVuJywgJ3RydWUnKTtcclxuXHJcblx0XHRzcGFuMS5pbm5lckhUTUwgPSAnJmxhcXVvOyc7XHJcblx0XHRzcGFuMi5pbm5lckhUTUwgPSAnUHJldmlvdXMnO1xyXG5cclxuXHRcdGxpbmsuYXBwZW5kQ2hpbGQoc3BhbjEpO1xyXG5cdFx0bGluay5hcHBlbmRDaGlsZChzcGFuMik7XHJcblx0XHRsaS5hcHBlbmRDaGlsZChsaW5rKTtcclxuXHJcblx0XHRyZXR1cm4gbGk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBDcmVhdGVzIHRoZSBuZXh0IGJ1dHRvbiBsaW5rLlxyXG5cdCAqL1xyXG5cdGNyZWF0ZU5leHRCdXR0b24oKSBcclxuXHR7XHJcblx0XHR2YXIgbGkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaScpO1xyXG5cdFx0dmFyIGxpbmsgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJyk7XHJcblx0XHR2YXIgc3BhbjEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XHJcblx0XHR2YXIgc3BhbjIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XHJcblx0XHRcclxuXHRcdGxpLmNsYXNzTmFtZSA9ICdwYWdlLWl0ZW0nO1xyXG5cdFx0bGluay5jbGFzc05hbWUgPSAncGFnZS1saW5rJztcclxuXHRcdHNwYW4yLmNsYXNzTmFtZSA9ICdzci1vbmx5JztcclxuXHJcblx0XHRsaW5rLnNldEF0dHJpYnV0ZSgnaHJlZicsICcnKTtcclxuXHRcdGxpbmsuc2V0QXR0cmlidXRlKCdhcmlhLWxhYmVsJywgJ05leHQnKTtcclxuXHRcdHNwYW4xLnNldEF0dHJpYnV0ZSgnYXJpYS1oaWRkZW4nLCAndHJ1ZScpO1xyXG5cclxuXHRcdHNwYW4xLmlubmVySFRNTCA9ICcmcmFxdW87JztcclxuXHRcdHNwYW4yLmlubmVySFRNTCA9ICdOZXh0JztcclxuXHJcblx0XHRsaW5rLmFwcGVuZENoaWxkKHNwYW4xKTtcclxuXHRcdGxpbmsuYXBwZW5kQ2hpbGQoc3BhbjIpO1xyXG5cdFx0bGkuYXBwZW5kQ2hpbGQobGluayk7XHJcblxyXG5cdFx0dGhpcy5uZXh0ID0gbGluazsgXHJcblxyXG5cdFx0cmV0dXJuIGxpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQ2hlY2tzIGlmIHRoZSBnaXZlbiBwYWdlIGlzIGluIHJhbmdlLlxyXG5cdCAqL1xyXG5cdG5vdEluUGFnZVJhbmdlKHBhZ2VOdW1iZXIpIFxyXG5cdHtcclxuXHRcdHJldHVybiBwYWdlTnVtYmVyID4gdGhpcy50b3RhbFBhZ2VzIHx8IHBhZ2VOdW1iZXIgPD0gMDtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIENoYW5nZXMgdGhlIHVybCB0byBhIGdpdmVuIHBhZ2UgbnVtYmVyLlxyXG5cdCAqL1xyXG5cdGNoYW5nZVVybChwYWdlTnVtYmVyKSBcclxuXHR7XHJcblx0XHRwYWdlTnVtYmVyID0gIHBhZ2VOdW1iZXIgfHwgR0VUX1ZhcnMoKVsncGFnZSddO1xyXG5cdFx0d2luZG93Lmhpc3RvcnkucmVwbGFjZVN0YXRlKCcnLCAnJywgdGhpcy51cGRhdGVVUkxQYXJhbWV0ZXIod2luZG93LmxvY2F0aW9uLmhyZWYsICdwYWdlJywgcGFnZU51bWJlcikpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogR2V0IHRoZSBnZXQgdmFyaWFibGVzIGZyb20gdGhlIHVybC5cclxuXHQgKi9cclxuXHRHRVRfVmFycygpIFxyXG5cdHtcclxuXHRcdHZhciB2YXJzID0ge307XHJcblx0XHR2YXIgcGFydHMgPSB3aW5kb3cubG9jYXRpb24uaHJlZi5yZXBsYWNlKC9bPyZdKyhbXj0mXSspPShbXiZdKikvZ2ksIGZ1bmN0aW9uKG0sIGtleSwgdmFsdWUpIHtcclxuXHRcdFx0dmFyc1trZXldID0gdmFsdWU7XHJcblx0XHR9KTtcclxuXHJcblx0XHRyZXR1cm4gdmFycztcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIE1vZGlmaWVzIHRoZSBnZXQgcGFyYW1ldGVyIGluIHRoZSB1cmwuXHJcblx0ICovXHJcblx0dXBkYXRlVVJMUGFyYW1ldGVyKHVybCwgcGFyYW0sIHBhcmFtVmFsKSBcclxuXHR7XHJcblx0ICAgIHZhciBuZXdBZGRpdGlvbmFsVVJMID0gXCJcIjtcclxuXHQgICAgdmFyIHRlbXBBcnJheSA9IHVybC5zcGxpdChcIj9cIik7XHJcblx0ICAgIHZhciBiYXNlVVJMID0gdGVtcEFycmF5WzBdO1xyXG5cdCAgICB2YXIgYWRkaXRpb25hbFVSTCA9IHRlbXBBcnJheVsxXTtcclxuXHQgICAgdmFyIHRlbXAgPSBcIlwiO1xyXG5cclxuXHQgICAgaWYgKGFkZGl0aW9uYWxVUkwpIHtcclxuXHQgICAgICAgIHRlbXBBcnJheSA9IGFkZGl0aW9uYWxVUkwuc3BsaXQoXCImXCIpO1xyXG5cdCAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0ZW1wQXJyYXkubGVuZ3RoOyBpKyspe1xyXG5cdCAgICAgICAgICAgIGlmICh0ZW1wQXJyYXlbaV0uc3BsaXQoJz0nKVswXSAhPSBwYXJhbSl7XHJcblx0ICAgICAgICAgICAgICAgIG5ld0FkZGl0aW9uYWxVUkwgKz0gdGVtcCArIHRlbXBBcnJheVtpXTtcclxuXHQgICAgICAgICAgICAgICAgdGVtcCA9IFwiJlwiO1xyXG5cdCAgICAgICAgICAgIH1cclxuXHQgICAgICAgIH1cclxuXHQgICAgfVxyXG5cclxuXHQgICAgdmFyIHJvd3NUZXh0ID0gdGVtcCArIFwiXCIgKyBwYXJhbSArIFwiPVwiICsgcGFyYW1WYWw7XHJcblx0ICAgIHJldHVybiBiYXNlVVJMICsgXCI/XCIgKyBuZXdBZGRpdGlvbmFsVVJMICsgcm93c1RleHQ7XHJcblx0fVxyXG5cclxuXHRyZXNldCgpIFxyXG5cdHtcclxuXHRcdHRoaXMuc2V0Q3VycmVudCgxKTtcclxuXHRcdHRoaXMuY2hhbmdlVXJsKDEpO1xyXG5cdH1cclxufVxuXG5sZXQgaW5pdGFsaXplZCA9IGZhbHNlO1xuXG5sZXQgZGVmYXVsdFNldHRpbmdzID0ge1xuXHRjYXJ0U2Vzc2lvbklkOiBbXSxcblx0aW1wb3J0Qm9vdHN0cmFwOiBmYWxzZSxcblx0Y29tcG9uZW50czogWydQcm9kdWN0cycsICdTZXJ2aWNlcycsICdGaWx0ZXInLCAnUGFnaW5hdGlvbiddXG59O1xuXG5jbGFzcyBlQ29tbWVyY2Vcbntcblx0Y29uc3RydWN0b3Ioc2V0dGluZ3MpXG5cdHtcblx0XHRFeGNlcHRpb25IYW5kbGVyLmluaXRhbGl6ZSgpO1xuXG5cdFx0aWYodHlwZW9mIHNldHRpbmdzICE9ICdvYmplY3QnKSB7XG5cdFx0XHR0aHJvdyBuZXcgSW52YWxpZEFyZ3VtZW50RXhjZXB0aW9uJDE7XG5cdFx0fVxuXG5cdFx0dGhpcy5jb250YWluZXIgPSBuZXcgQ29udGFpbmVyO1xuXHRcdHRoaXMuc2V0dGluZ3MgPSBDb21tb24uZXh0ZW5kKGRlZmF1bHRTZXR0aW5ncywgc2V0dGluZ3MpO1xuXHRcdFxuXHRcdGJpbmRDb21wb25lbnRzRGVwZW5kZW5jaWVzLmNhbGwodGhpcywgc2V0dGluZ3MuY29tcG9uZW50cyk7XG5cblx0XHRpbml0YWxpemVkID0gdHJ1ZTtcblxuXHRcdHJldHVybiBuZXcgUHJveHkodGhpcywge1xuXHRcdFx0Z2V0OiBmdW5jdGlvbih0YXJnZXQsIG9iamVjdCkge1xuXHRcdFx0XHRyZXR1cm4gdGFyZ2V0LmNvbnRhaW5lci5tYWtlKG9iamVjdCk7XG5cdFx0XHR9XG5cdFx0fSk7XG5cdH1cbn1cblxuLyoqXG4gKiBCaW5kcyBjb21wb25lbnRzIGRlcGVuZGVuY2llcy5cbiAqL1xuZnVuY3Rpb24gYmluZENvbXBvbmVudHNEZXBlbmRlbmNpZXMoY29tcG9uZW50cykge1xuXHRsZXQgY29udGFpbmVyID0gdGhpcy5jb250YWluZXI7XG5cblx0Y29udGFpbmVyLmJpbmQoJ0ZpbHRlcicsIGZ1bmN0aW9uKCkge1xuXHRcdHJldHVybiBuZXcgRmlsdGVyKGNvbnRhaW5lcik7XG5cdH0pO1xuXHRcblx0Y29udGFpbmVyLmJpbmQoJ1NlcnZpY2VzJywgZnVuY3Rpb24oKSB7IFxuXHRcdHJldHVybiBuZXcgU2VydmljZXMoY29udGFpbmVyKTtcblx0fSk7XG5cblx0Y29udGFpbmVyLmJpbmQoJ1BhZ2luYXRpb24nLCBmdW5jdGlvbigpIHtcblx0XHRyZXR1cm4gbmV3IFBhZ2luYXRpb24oY29udGFpbmVyKTtcblx0fSk7XG5cblx0Y29udGFpbmVyLmJpbmQoJ1Byb2R1Y3RzJywgZnVuY3Rpb24oKSB7XG5cdFx0cmV0dXJuIG5ldyBQcm9kdWN0cyhjb250YWluZXIsIGNvbnRhaW5lci5tYWtlKCdQYWdpbmF0aW9uJykpO1xuXHR9KTtcbn1cblxucmV0dXJuIGVDb21tZXJjZTtcblxufSgpKTtcbiJdfQ==
