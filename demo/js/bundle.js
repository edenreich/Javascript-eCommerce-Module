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
				return pageNumber > this.settings.total_pages || pageNumber <= 0 || isNaN(pageNumber);
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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVDb21tZXJjZS5qcyJdLCJuYW1lcyI6WyJlQ29tbWVyY2UiLCJET00iLCJzdHJpbmciLCJyZXBsYWNlIiwiZWxlbWVudCIsImNsYXNzTmFtZSIsInRyaW0iLCJzcGxpdCIsImkiLCJsZW5ndGgiLCJjbGFzc0xpc3QiLCJhZGQiLCJyZW1vdmUiLCJzZWxlY3RvciIsInF1ZXJ5RWxlbWVudCIsImlkIiwiY3NzIiwiaW52YWxpZEFyZ3VtZW50RXhjZXB0aW9uIiwiaGVhZCIsImRvY3VtZW50IiwiZ2V0RWxlbWVudHNCeVRhZ05hbWUiLCJzdHlsZVRhZyIsImNyZWF0ZUVsZW1lbnQiLCJDU1MiLCJtaW5pZnlDc3MiLCJpbm5lckhUTUwiLCJzZXRBdHRyaWJ1dGUiLCJhcHBlbmRDaGlsZCIsInF1ZXJ5U2VsZWN0b3IiLCJOb2RlRWxlbWVudERvZXNOb3RFeGlzdEV4Y2VwdGlvbiIsIkV2ZW50IiwibmFtZSIsImNhbGxiYWNrIiwiSW52YWxpZEFyZ3VtZW50RXhjZXB0aW9uIiwiZXZlbnRzIiwiZGF0YSIsIkJhZEV2ZW50Q2FsbEV4Y2VwdGlvbiIsIkFycmF5IiwiQ29tbW9uIiwiY3VycmVudE9iaiIsIm5ld09iaiIsImV4dGVuZGVkIiwicHJvcCIsIk9iamVjdCIsInByb3RvdHlwZSIsImhhc093blByb3BlcnR5IiwiY2FsbCIsIm5lZWRsZSIsImh5c3RhY2siLCJjb25zdHJ1Y3RvciIsIm9iamVjdCIsInRvTG93ZXJDYXNlIiwiSW52YWxpZEJpbmRpbmdFeGNlcHRpb24iLCJjb25zb2xlIiwiZXJyb3IiLCJFcnJvciIsIkludmFsaWRBcmd1bWVudEV4Y2VwdGlvbiQxIiwiaW5zdGFuY2VzIiwiQ29udGFpbmVyIiwia2V5IiwiY29uY3JldGUiLCJiaW5kIiwiaW5zdGFuY2UiLCJpbnN0YW5jZUV4aXN0IiwiZ2V0SW5zdGFuY2UiLCJzZXRJbnN0YW5jZSIsIkNvbXBvbmVudHNFeGNlcHRpb24iLCJCYWRFdmVudENhbGxFeGNlcHRpb24kMSIsIkNvbXBvbmVudE5vdFJlZ2lzdGVyZWRFeGNlcHRpb24iLCJOb2RlRWxlbWVudERvZXNOb3RFeGlzdEV4Y2VwdGlvbiQxIiwiRXhjZXB0aW9uSGFuZGxlciIsIndpbmRvdyIsIm9uZXJyb3IiLCJtZXNzYWdlIiwic291cmNlIiwibGluZW5vIiwiY29sbm8iLCJkZWZhdWx0U2V0dGluZ3MkMSIsImNsYXNzIiwid2lkdGgiLCJoZWlnaHQiLCJGaWx0ZXIiLCJjb250YWluZXIiLCJzZXR1cCIsInNldHRpbmdzIiwiZXh0ZW5kIiwic2V0RWxlbWVudCIsIndyYXBwZXIiLCJhZGRDbGFzcyIsImRlZmF1bHRTZXR0aW5ncyQyIiwiaXRlbUNsYXNzIiwiYXR0cmlidXRlcyIsInVybCIsImluaXRTdGF0aWNEYXRhIiwiQ29udGFpbmVyJDIiLCJQcm9kdWN0cyIsInBhZ2luYXRvciIsImFkZFN0eWxlVGFnIiwicmVzZXQiLCJyZXF1ZXN0IiwiZ2V0UHJvZHVjdHNCeVBhZ2UiLCJnZXRDdXJyZW50IiwidGhlbiIsIml0ZW1zIiwicmVwbGFjZUl0ZW1zIiwiY2F0Y2giLCJpc0FycmF5Iiwid3JhcHBlZEl0ZW1zIiwid3JhcEFsbFdpdGhIVE1MIiwicGFnZU51bWJlciIsIlByb21pc2UiLCJyZXNvbHZlIiwicmVqZWN0Iiwibm90SW5QYWdlUmFuZ2UiLCJ4aHIiLCJYTUxIdHRwUmVxdWVzdCIsIkFjdGl2ZVhPYmplY3QiLCJvcGVuIiwic2V0UmVxdWVzdEhlYWRlciIsIm9ucmVhZHlzdGF0ZWNoYW5nZSIsImxvZyIsInN0YXR1cyIsInJlYWR5U3RhdGUiLCJjdXJyZW50SXRlbXMiLCJKU09OIiwicGFyc2UiLCJyZXNwb25zZVRleHQiLCJwcm9kdWN0IiwiQWZ0ZXJMb2FkZWQiLCJzdGF0dXNUZXh0Iiwic2VuZCIsInRhZ1R5cGUiLCJtYXAiLCJpbmRleCIsIml0ZW0iLCJvdmVybGF5IiwiaW5kZXhPZiIsInRhZyIsImltYWdlIiwia2ViYWJDYXNlIiwidGVtcCIsInByb2R1Y3RzIiwiYWRkU3R5bGUiLCJTZXJ2aWNlcyIsImRlZmF1bHRTZXR0aW5ncyQzIiwicGVyX3BhZ2UiLCJ0b3RhbF9wYWdlcyIsIkNvbnRhaW5lciQzIiwiUGFnaW5hdGlvbiIsInJlcGxhY2VMaW5rcyIsImxpbmtzIiwiY3JlYXRlTGlua3MiLCJiaW5kRXZlbnRMaXN0ZW5lcnMiLCJuZXh0IiwiY2hpbGROb2RlcyIsIm9uY2xpY2siLCJldmVudCIsInByZXZlbnREZWZhdWx0IiwiY3VycmVudCIsInNldEN1cnJlbnQiLCJwcmV2aW91cyIsInBhZ2VzIiwiZ2V0QXR0cmlidXRlIiwicGFyc2VJbnQiLCJjaGFuZ2VVcmwiLCJ1bCIsImNyZWF0ZVBhZ2VMaW5rcyIsImNyZWF0ZVByZXZpb3VzQnV0dG9uIiwiY3JlYXRlTmV4dEJ1dHRvbiIsImZvckVhY2giLCJwYWdlIiwicGFnZUl0ZW0iLCJsaW5rIiwicHVzaCIsImxpIiwic3BhbjEiLCJzcGFuMiIsImlzTmFOIiwiR0VUX1ZhcnMiLCJoaXN0b3J5IiwicmVwbGFjZVN0YXRlIiwidXBkYXRlVVJMUGFyYW1ldGVyIiwibG9jYXRpb24iLCJocmVmIiwidmFycyIsInBhcnRzIiwibSIsInZhbHVlIiwicGFyYW0iLCJwYXJhbVZhbCIsIm5ld0FkZGl0aW9uYWxVUkwiLCJ0ZW1wQXJyYXkiLCJiYXNlVVJMIiwiYWRkaXRpb25hbFVSTCIsInJvd3NUZXh0IiwiaW5pdGFsaXplZCIsImRlZmF1bHRTZXR0aW5ncyIsImNhcnRTZXNzaW9uSWQiLCJpbXBvcnRCb290c3RyYXAiLCJjb21wb25lbnRzIiwiaW5pdGFsaXplIiwiYmluZENvbXBvbmVudHNEZXBlbmRlbmNpZXMiLCJQcm94eSIsImdldCIsInRhcmdldCIsIm1ha2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSxJQUFJQSxZQUFhLFlBQVk7QUFDN0I7O0FBRDZCLEtBR3ZCQyxHQUh1QjtBQUFBO0FBQUE7QUFBQTs7QUFBQTtBQUFBOztBQUs1Qjs7O0FBTDRCLDZCQVFYQyxNQVJXLEVBUzVCO0FBQ0lBLGFBQVNBLE9BQU9DLE9BQVAsQ0FBZSx3Q0FBZixFQUF5RCxFQUF6RCxDQUFUO0FBQ0FELGFBQVNBLE9BQU9DLE9BQVAsQ0FBZSxRQUFmLEVBQXlCLEdBQXpCLENBQVQ7QUFDQUQsYUFBU0EsT0FBT0MsT0FBUCxDQUFlLFVBQWYsRUFBMkIsSUFBM0IsQ0FBVDtBQUNBRCxhQUFTQSxPQUFPQyxPQUFQLENBQWUsVUFBZixFQUEyQixJQUEzQixDQUFUO0FBQ0FELGFBQVNBLE9BQU9DLE9BQVAsQ0FBZSxLQUFmLEVBQXNCLEdBQXRCLENBQVQ7O0FBRUEsV0FBT0QsTUFBUDtBQUNIOztBQUVEOzs7O0FBbkI0QjtBQUFBO0FBQUEsNEJBc0JaRSxPQXRCWSxFQXNCSEMsU0F0QkcsRUF1QjVCO0FBQ0MsUUFBR0EsYUFBYSxFQUFoQixFQUFvQixPQUFPRCxPQUFQOztBQUVwQkMsZ0JBQVlBLFVBQVVDLElBQVYsRUFBWjtBQUNBRCxnQkFBWUEsVUFBVUUsS0FBVixDQUFnQixHQUFoQixDQUFaOztBQUVBLFNBQUksSUFBSUMsSUFBSSxDQUFaLEVBQWVBLElBQUlILFVBQVVJLE1BQTdCLEVBQXFDRCxHQUFyQyxFQUEwQztBQUN6Q0osYUFBUU0sU0FBUixDQUFrQkMsR0FBbEIsQ0FBc0JOLFVBQVVHLENBQVYsQ0FBdEI7QUFDQTs7QUFFRCxXQUFPSixPQUFQO0FBQ0E7O0FBRUQ7Ozs7QUFwQzRCO0FBQUE7QUFBQSwrQkF1Q1RBLE9BdkNTLEVBdUNBQyxTQXZDQSxFQXdDNUI7QUFDQ0QsWUFBUU0sU0FBUixDQUFrQkUsTUFBbEIsQ0FBeUJQLFNBQXpCOztBQUVBLFdBQU9ELE9BQVA7QUFDQTtBQTVDMkI7QUFBQTtBQUFBLDJCQThDYlMsUUE5Q2EsRUErQzVCO0FBQ0MsUUFBSVQsVUFBVVUsYUFBYUQsUUFBYixDQUFkO0FBQ0EsV0FBT1QsT0FBUDtBQUNBO0FBbEQyQjtBQUFBO0FBQUEsNEJBb0RaVyxFQXBEWSxFQW9EUkMsR0FwRFEsRUFxRDVCO0FBQ0MsUUFBRyxPQUFPQSxHQUFQLElBQWMsUUFBakIsRUFBMkI7QUFDMUIsV0FBTSxJQUFJQyx3QkFBSixFQUFOO0FBQ0E7O0FBRUQsUUFBSUMsT0FBT0MsU0FBU0QsSUFBVCxJQUFpQkMsU0FBU0Msb0JBQVQsQ0FBOEIsTUFBOUIsRUFBc0MsQ0FBdEMsQ0FBNUI7QUFDQSxRQUFJQyxXQUFXRixTQUFTRyxhQUFULENBQXVCLE9BQXZCLENBQWY7O0FBRUE7QUFDRyxRQUFJQyxNQUFNLEtBQUtDLFNBQUwsQ0FBZVIsR0FBZixDQUFWO0FBQ0E7QUFDQUssYUFBU0ksU0FBVCxHQUFxQkYsR0FBckI7QUFDQTtBQUNIRixhQUFTSyxZQUFULENBQXNCLElBQXRCLEVBQTRCWCxFQUE1QjtBQUNBO0FBQ0FHLFNBQUtTLFdBQUwsQ0FBaUJOLFFBQWpCO0FBQ0E7QUFyRTJCOztBQUFBO0FBQUE7O0FBd0U3Qjs7Ozs7QUFHQSxVQUFTUCxZQUFULENBQXNCRCxRQUF0QixFQUFnQztBQUMvQixNQUFJVCxVQUFVZSxTQUFTUyxhQUFULENBQXVCZixRQUF2QixLQUFvQyxJQUFsRDs7QUFFQSxNQUFHLENBQUVULE9BQUwsRUFBYztBQUNiLFNBQU0sSUFBSXlCLGdDQUFKLEVBQU47QUFDQTs7QUFFRCxTQUFPekIsT0FBUDtBQUNBOztBQW5GNEIsS0FxRnZCMEIsS0FyRnVCO0FBQUE7QUFBQTtBQUFBOztBQUFBO0FBQUE7O0FBdUY1Qjs7O0FBdkY0QiwwQkEwRmRDLElBMUZjLEVBMEZSQyxRQTFGUSxFQTBGRTtBQUM3QixRQUFJLE9BQU9BLFFBQVAsS0FBb0IsVUFBeEIsRUFBb0M7QUFDbkMsV0FBTSxJQUFJQyx3QkFBSixFQUFOO0FBQ0E7O0FBRURDLFdBQU9ILElBQVAsSUFBZUMsUUFBZjtBQUNBOztBQUVEOzs7O0FBbEc0QjtBQUFBO0FBQUEsMkJBcUdiRCxJQXJHYSxFQXFHUEksSUFyR08sRUFxR0Q7QUFDMUJBLFdBQU9BLFFBQVEsSUFBZjs7QUFFQSxRQUFHLE9BQU9ELE9BQU9ILElBQVAsQ0FBUCxLQUF3QixVQUEzQixFQUF1QztBQUN0QyxXQUFNLElBQUlLLHFCQUFKLEVBQU47QUFDQTs7QUFFRCxRQUFHRCxRQUFRLElBQVIsSUFBZ0JBLGdCQUFnQkUsS0FBbkMsRUFBMEM7QUFBQTs7QUFFekMsWUFBTyxtQkFBT04sSUFBUCxvQ0FBZ0JJLElBQWhCLEVBQVA7QUFDQTs7QUFFREQsV0FBT0gsSUFBUDtBQUNBO0FBbEgyQjs7QUFBQTtBQUFBOztBQUFBLEtBcUh2Qk8sTUFySHVCO0FBQUE7QUFBQTtBQUFBOztBQUFBO0FBQUE7O0FBdUg1Qjs7O0FBdkg0QiwwQkEwSGRDLFVBMUhjLEVBMEhGQyxNQTFIRSxFQTBITztBQUNsQyxRQUFJQyxXQUFXLEVBQWY7QUFDRyxRQUFJQyxJQUFKOztBQUVBLFNBQUtBLElBQUwsSUFBYUgsVUFBYixFQUF5QjtBQUNyQixTQUFJSSxPQUFPQyxTQUFQLENBQWlCQyxjQUFqQixDQUFnQ0MsSUFBaEMsQ0FBcUNQLFVBQXJDLEVBQWlERyxJQUFqRCxDQUFKLEVBQTREO0FBQ3hERCxlQUFTQyxJQUFULElBQWlCSCxXQUFXRyxJQUFYLENBQWpCO0FBQ0g7QUFDSjs7QUFFRCxTQUFLQSxJQUFMLElBQWFGLE1BQWIsRUFBcUI7QUFDakIsU0FBSUcsT0FBT0MsU0FBUCxDQUFpQkMsY0FBakIsQ0FBZ0NDLElBQWhDLENBQXFDTixNQUFyQyxFQUE2Q0UsSUFBN0MsQ0FBSixFQUF3RDtBQUNwREQsZUFBU0MsSUFBVCxJQUFpQkYsT0FBT0UsSUFBUCxDQUFqQjtBQUNIO0FBQ0o7O0FBRUQsV0FBT0QsUUFBUDtBQUNIOztBQUVEOzs7O0FBN0k0QjtBQUFBO0FBQUEsNEJBZ0paTSxNQWhKWSxFQWdKSkMsT0FoSkksRUFnSks7QUFDaEMsUUFBR0EsUUFBUUMsV0FBUixLQUF3QlosS0FBM0IsRUFBa0M7O0FBRWxDLFNBQUksSUFBSTdCLElBQUksQ0FBWixFQUFlQSxLQUFLd0MsUUFBUXZDLE1BQTVCLEVBQW9DRCxHQUFwQyxFQUF5QztBQUN4QyxTQUFHdUMsVUFBVUMsUUFBUXhDLENBQVIsQ0FBYixFQUF5QixPQUFPLElBQVA7QUFDekI7O0FBRUQsV0FBTyxLQUFQO0FBQ0E7O0FBRUQ7Ozs7QUExSjRCO0FBQUE7QUFBQSwrQkE2SlQwQyxNQTdKUyxFQTZKRDtBQUMxQixTQUFJLElBQUlSLElBQVIsSUFBZ0JRLE1BQWhCLEVBQXdCO0FBQ3ZCLFlBQU8sS0FBUDtBQUNBOztBQUVELFdBQU8sSUFBUDtBQUNBO0FBbksyQjtBQUFBO0FBQUEsa0NBcUtOQSxNQXJLTSxFQXFLRUYsT0FyS0YsRUFzSzVCO0FBQ0ksUUFBSXhDLENBQUo7O0FBRUEsU0FBS0EsSUFBSSxDQUFULEVBQVlBLElBQUl3QyxRQUFRdkMsTUFBeEIsRUFBZ0NELEdBQWhDLEVBQXFDO0FBQ2pDLFNBQUksT0FBTzBDLE1BQVAsSUFBaUIsUUFBakIsSUFBNkJGLFFBQVF4QyxDQUFSLEVBQVd5QyxXQUFYLENBQXVCbEIsSUFBdkIsS0FBZ0NtQixNQUFqRSxFQUF5RTtBQUN4RSxhQUFPLElBQVA7QUFDQTs7QUFFRCxTQUFJRixRQUFReEMsQ0FBUixNQUFlMEMsTUFBbkIsRUFBMkI7QUFDdkIsYUFBTyxJQUFQO0FBQ0g7QUFDSjs7QUFFRCxXQUFPLEtBQVA7QUFDSDs7QUFFRDs7OztBQXRMNEI7QUFBQTtBQUFBLDZCQXlMWGhELE1BekxXLEVBeUxIO0FBQ3hCLFdBQU9BLE9BQU9DLE9BQVAsQ0FBZSxpQkFBZixFQUFrQyxPQUFsQyxFQUEyQ2dELFdBQTNDLEVBQVA7QUFDQTs7QUFFRDs7OztBQTdMNEI7QUFBQTtBQUFBLDRCQWdNWkQsTUFoTVksRUFnTUo7QUFDdkIsV0FBTyxRQUFPQSxNQUFQLHlDQUFPQSxNQUFQLE1BQWlCLFFBQXhCO0FBQ0E7QUFsTTJCOztBQUFBO0FBQUE7O0FBQUEsS0FxTXZCRSx1QkFyTXVCLEdBdU01QixtQ0FDQTtBQUFBOztBQUNJQyxVQUFRQyxLQUFSLENBQWlCLEtBQUtMLFdBQUwsQ0FBaUJsQixJQUFsQzs7QUFFQSxRQUFNLElBQUl3QixLQUFKLEVBQU47QUFDQSxFQTVNd0I7O0FBQUEsS0ErTXZCQywwQkEvTXVCLEdBaU41QixzQ0FDQTtBQUFBOztBQUNJSCxVQUFRQyxLQUFSLENBQWlCLEtBQUtMLFdBQUwsQ0FBaUJsQixJQUFsQzs7QUFFQSxRQUFNLElBQUl3QixLQUFKLEVBQU47QUFDQSxFQXROd0I7O0FBeU43QixLQUFJRSxhQUFZLEVBQWhCOztBQXpONkIsS0EyTnZCQyxTQTNOdUI7QUFBQTtBQUFBO0FBQUE7O0FBQUE7QUFBQTs7QUE2TjVCOzs7QUE3TjRCLHdCQWdPdkJDLEdBaE91QixFQWdPbEJDLFFBaE9rQixFQWlPNUI7QUFDQyxRQUFJLE9BQU9ELEdBQVAsSUFBYyxRQUFkLElBQTBCLE9BQU9DLFFBQVAsSUFBbUIsVUFBakQsRUFBNkQ7QUFDNUQsV0FBTSxJQUFJSiwwQkFBSixFQUFOO0FBQ0E7O0FBRUQsUUFBSSxPQUFPLEtBQUtHLEdBQUwsQ0FBUCxJQUFvQixXQUF4QixFQUFxQztBQUNwQyxXQUFNLElBQUlQLHVCQUFKLEVBQU47QUFDQTs7QUFFRCxTQUFLTyxHQUFMLElBQVlDLFFBQVo7QUFDQSxTQUFLRCxHQUFMLEVBQVVFLElBQVYsQ0FBZUQsUUFBZjtBQUNBOztBQUVEOzs7O0FBOU80QjtBQUFBO0FBQUEsK0JBaVBoQkQsR0FqUGdCLEVBaVBYRyxRQWpQVyxFQWtQNUI7QUFDQyxRQUFHLE9BQU9ILEdBQVAsSUFBYyxRQUFkLElBQTBCLFFBQU9HLFFBQVAseUNBQU9BLFFBQVAsTUFBbUIsUUFBaEQsRUFBMEQ7QUFDekQsV0FBTSxJQUFJTiwwQkFBSixFQUFOO0FBQ0E7O0FBRURDLGVBQVVFLEdBQVYsSUFBaUJHLFFBQWpCO0FBQ0E7O0FBRUQ7Ozs7QUExUDRCO0FBQUE7QUFBQSwrQkE2UGhCSCxHQTdQZ0IsRUE4UDVCO0FBQ0MsUUFBRyxPQUFPQSxHQUFQLElBQWMsUUFBakIsRUFBMkI7QUFDMUIsV0FBTSxJQUFJSCwwQkFBSixFQUFOO0FBQ0E7O0FBRUQsUUFBRyxRQUFPRyxHQUFQLHlDQUFPQSxHQUFQLE1BQWMsUUFBakIsRUFBMkI7QUFDMUIsWUFBT0YsV0FBVUUsSUFBSVYsV0FBSixDQUFnQmxCLElBQTFCLEtBQW1DLElBQTFDO0FBQ0E7O0FBRUQsV0FBTzBCLFdBQVVFLEdBQVYsS0FBa0IsSUFBekI7QUFDQTs7QUFFRDs7OztBQTFRNEI7QUFBQTtBQUFBLGlDQTZRZEcsUUE3UWMsRUE4UTVCO0FBQ0MsUUFBRyxRQUFPQSxRQUFQLHlDQUFPQSxRQUFQLE1BQW1CLFFBQXRCLEVBQWdDO0FBQy9CLFlBQVEsT0FBT0wsV0FBVUssU0FBU2IsV0FBVCxDQUFxQmxCLElBQS9CLENBQVAsS0FBZ0QsV0FBeEQ7QUFDQTs7QUFHRCxXQUFRK0IsWUFBWUwsVUFBcEI7QUFDQTs7QUFFRDs7OztBQXZSNEI7QUFBQTtBQUFBLHdCQTBSdkJQLE1BMVJ1QixFQTJSNUI7QUFDQyxRQUFJWSxXQUFXLEVBQWY7O0FBRUEsUUFBSSxLQUFLQyxhQUFMLENBQW1CYixNQUFuQixDQUFKLEVBQWdDO0FBQy9CLFlBQU8sS0FBS2MsV0FBTCxDQUFpQmQsTUFBakIsQ0FBUDtBQUNBOztBQUVELFFBQUksUUFBT0EsTUFBUCx5Q0FBT0EsTUFBUCxNQUFpQixRQUFyQixFQUErQjtBQUM5QlksZ0JBQVdaLE1BQVg7QUFDQSxLQUZELE1BRU87QUFDTlksZ0JBQVcsSUFBSSxLQUFLWixNQUFMLENBQUosRUFBWDtBQUNBOztBQUVELFNBQUtlLFdBQUwsQ0FBaUJmLE1BQWpCLEVBQXlCWSxRQUF6Qjs7QUFFQSxXQUFPQSxRQUFQO0FBQ0E7O0FBRUQ7Ozs7QUE3UzRCO0FBQUE7QUFBQSwrQkFpVDVCO0FBQ0MsV0FBT0wsVUFBUDtBQUNBO0FBblQyQjs7QUFBQTtBQUFBOztBQUFBLEtBc1R2QlMsbUJBdFR1QixHQXdUNUIsK0JBQ0E7QUFBQTs7QUFDSWIsVUFBUUMsS0FBUixDQUFpQixLQUFLTCxXQUFMLENBQWlCbEIsSUFBbEM7O0FBR0EsUUFBTSxJQUFJd0IsS0FBSixFQUFOO0FBQ0EsRUE5VHdCOztBQUFBLEtBaVV2QlksdUJBalV1QixHQW1VNUIsbUNBQ0E7QUFBQTs7QUFDSWQsVUFBUUMsS0FBUixDQUFpQixLQUFLTCxXQUFMLENBQWlCbEIsSUFBbEM7O0FBRUEsUUFBTSxJQUFJd0IsS0FBSixFQUFOO0FBQ0EsRUF4VXdCOztBQUFBLEtBMlV2QmEsK0JBM1V1QixHQTZVNUIsMkNBQ0E7QUFBQTs7QUFDSWYsVUFBUUMsS0FBUixDQUFpQixLQUFLTCxXQUFMLENBQWlCbEIsSUFBbEM7O0FBRUEsUUFBTSxJQUFJd0IsS0FBSixFQUFOO0FBQ0EsRUFsVndCOztBQUFBLEtBcVZ2QmMsa0NBclZ1QixHQXVWNUIsOENBQ0E7QUFBQTs7QUFDSWhCLFVBQVFDLEtBQVIsQ0FBaUIsS0FBS0wsV0FBTCxDQUFpQmxCLElBQWxDOztBQUVBLFFBQU0sSUFBSXdCLEtBQUosRUFBTjtBQUNBLEVBNVZ3Qjs7QUFBQSxLQStWdkJlLGdCQS9WdUI7QUFBQTtBQUFBO0FBQUE7O0FBQUE7QUFBQTs7QUFpVzVCOzs7QUFqVzRCLCtCQW9XVDtBQUNsQkMsV0FBT0MsT0FBUCxHQUFpQixVQUFTQyxPQUFULEVBQWtCQyxNQUFsQixFQUEwQkMsTUFBMUIsRUFBa0NDLEtBQWxDLEVBQXlDdEIsS0FBekMsRUFBZ0Q7O0FBRWhFLFNBQUlBLGlCQUFpQkUsMEJBQXJCLEVBQWlEO0FBQ2hEO0FBQ0EsTUFGRCxNQUVPLElBQUlGLGlCQUFpQkYsdUJBQXJCLEVBQThDO0FBQ3BEO0FBQ0EsTUFGTSxNQUVBLElBQUlFLGlCQUFpQmEsdUJBQXJCLEVBQThDO0FBQ3BEO0FBQ0EsTUFGTSxNQUVBLElBQUliLGlCQUFpQlksbUJBQXJCLEVBQTBDO0FBQ2hEO0FBQ0EsTUFGTSxNQUVBLElBQUlaLGlCQUFpQmMsK0JBQXJCLEVBQXNEO0FBQzVEO0FBQ0EsTUFGTSxNQUVBLElBQUlkLGlCQUFpQmUsa0NBQXJCLEVBQXlELENBRS9ELENBRk0sTUFFQTtBQUNOLGFBQU8sS0FBUDtBQUNBOztBQUVELFlBQU8sSUFBUDtBQUNBLEtBbkJEO0FBb0JBO0FBelgyQjs7QUFBQTtBQUFBOztBQTRYN0I7Ozs7O0FBR0EsS0FBSVEsb0JBQW9CO0FBQ3ZCekUsV0FBUyxTQURjO0FBRXZCK0IsUUFBTSxFQUZpQjtBQUd2QjJDLFNBQU8sVUFIZ0I7QUFJdkJDLFNBQU8sRUFKZ0I7QUFLdkJDLFVBQVE7QUFMZSxFQUF4Qjs7QUFTQTs7OztBQXhZNkIsS0EyWXZCQyxNQTNZdUI7QUE2WTVCLGtCQUFZQyxTQUFaLEVBQ0E7QUFBQTs7QUFDQyxRQUFLQyxLQUFMLENBQVdOLGlCQUFYO0FBQ0E7O0FBaFoyQjtBQUFBO0FBQUEseUJBa1p0Qk8sUUFsWnNCLEVBbVo1QjtBQUNDLFFBQUcsUUFBT0EsUUFBUCx5Q0FBT0EsUUFBUCxNQUFtQixRQUF0QixFQUFnQztBQUMvQixXQUFNLElBQUk1QiwwQkFBSixFQUFOO0FBQ0E7O0FBRUQsU0FBSzRCLFFBQUwsR0FBZ0I5QyxPQUFPK0MsTUFBUCxDQUFjUixpQkFBZCxFQUFpQ08sUUFBakMsQ0FBaEI7O0FBRUEsU0FBS0UsVUFBTCxDQUFnQixLQUFLRixRQUFMLENBQWNoRixPQUE5QjtBQUNBO0FBM1oyQjtBQUFBO0FBQUEsOEJBNlpqQlMsUUE3WmlCLEVBOFo1QjtBQUNDLFNBQUswRSxPQUFMLEdBQWV0RixJQUFJRyxPQUFKLENBQVlTLFFBQVosQ0FBZjs7QUFFQVosUUFBSXVGLFFBQUosQ0FBYSxLQUFLRCxPQUFsQixFQUEyQixLQUFLSCxRQUFMLENBQWNOLEtBQXpDO0FBQ0E7QUFsYTJCOztBQUFBO0FBQUE7O0FBcWE3Qjs7Ozs7QUFHQSxLQUFJVyxvQkFBb0I7QUFDdkJyRixXQUFTLFdBRGM7QUFFdkIwRSxTQUFPLEVBRmdCO0FBR3ZCWSxhQUFXLEVBSFk7QUFJdkJYLFNBQU8sT0FKZ0I7QUFLdkJDLFVBQVEsT0FMZTtBQU12QlcsY0FBWSxDQUFDLE1BQUQsRUFBUyxPQUFULEVBQWtCLGNBQWxCLEVBQWtDLE9BQWxDLENBTlc7QUFPdkJDLE9BQUssY0FQa0I7QUFRdkJDLGtCQUFnQjtBQVJPLEVBQXhCOztBQVdBLEtBQUlDLG9CQUFKOztBQUVBOzs7O0FBcmI2QixLQXdidkJDLFFBeGJ1QjtBQTBiNUI7OztBQUdBLG9CQUFZYixTQUFaLEVBQXVCYyxTQUF2QixFQUNBO0FBQUE7O0FBQ0MsUUFBS2IsS0FBTCxDQUFXTSxpQkFBWDs7QUFFQUssaUJBQWNaLFNBQWQ7QUFDQSxRQUFLYyxTQUFMLEdBQWlCQSxTQUFqQjtBQUNBOztBQW5jMkI7QUFBQTtBQUFBLHlCQXFjdEJaLFFBcmNzQixFQXNjNUI7QUFDQyxRQUFJLFFBQU9BLFFBQVAseUNBQU9BLFFBQVAsTUFBbUIsUUFBdkIsRUFBaUM7QUFDaEMsV0FBTSxJQUFJNUIsMEJBQUosRUFBTjtBQUNBOztBQUVELFNBQUs0QixRQUFMLEdBQWdCOUMsT0FBTytDLE1BQVAsQ0FBY0ksaUJBQWQsRUFBaUNMLFFBQWpDLENBQWhCOztBQUVBLFNBQUtFLFVBQUwsQ0FBZ0IsS0FBS0YsUUFBTCxDQUFjaEYsT0FBOUI7O0FBRUEsU0FBSzZGLFdBQUw7O0FBRUEsUUFBSSxPQUFPSCxXQUFQLElBQXNCLFdBQTFCLEVBQXVDO0FBQ3RDO0FBQ0E7O0FBRUQsUUFBSUEsWUFBWS9CLGFBQVosQ0FBMEIsWUFBMUIsQ0FBSixFQUE2QztBQUM1QyxVQUFLaUMsU0FBTCxDQUFlRSxLQUFmLENBQXFCLEtBQUtkLFFBQUwsQ0FBY1MsY0FBbkM7QUFDQSxTQUFJTSxVQUFVLEtBQUtDLGlCQUFMLENBQXVCLEtBQUtKLFNBQUwsQ0FBZUssVUFBZixFQUF2QixDQUFkOztBQUVBRixhQUFRRyxJQUFSLENBQWEsVUFBU0MsS0FBVCxFQUFnQjtBQUM1QixXQUFLQyxZQUFMLENBQWtCRCxLQUFsQjtBQUNBLE1BRlksQ0FFWDFDLElBRlcsQ0FFTixJQUZNLENBQWIsRUFFYzRDLEtBRmQsQ0FFb0IsVUFBU25ELEtBQVQsRUFBZ0IsQ0FFbkMsQ0FKRDtBQUtBO0FBQ0Q7QUEvZDJCO0FBQUE7QUFBQSw4QkFpZWpCekMsUUFqZWlCLEVBa2U1QjtBQUNDLFNBQUswRSxPQUFMLEdBQWV0RixJQUFJRyxPQUFKLENBQVlTLFFBQVosQ0FBZjs7QUFFQVosUUFBSXVGLFFBQUosQ0FBYSxLQUFLRCxPQUFsQixFQUEyQixLQUFLSCxRQUFMLENBQWNOLEtBQXpDO0FBQ0E7O0FBRUQ7Ozs7QUF4ZTRCO0FBQUE7QUFBQSxnQ0EyZWZ5QixLQTNlZSxFQTRlNUI7QUFDQyxRQUFJLENBQUVsRSxNQUFNcUUsT0FBTixDQUFjSCxLQUFkLENBQUYsSUFBMEIsT0FBT0EsTUFBTSxDQUFOLENBQVAsSUFBbUIsUUFBakQsRUFBMkQ7QUFDMUQsV0FBTSxJQUFJL0MsMEJBQUosRUFBTjtBQUNBOztBQUVELFFBQUltRCxlQUFlLEtBQUtDLGVBQUwsQ0FBcUJMLEtBQXJCLEVBQTRCLEtBQUtuQixRQUFMLENBQWNNLFNBQTFDLEVBQXFELEtBQXJELENBQW5COztBQUVBLFNBQUtILE9BQUwsQ0FBYTlELFNBQWIsR0FBeUJrRixZQUF6Qjs7QUFFQSxXQUFPSixLQUFQO0FBQ0E7O0FBRUQ7Ozs7QUF4ZjRCO0FBQUE7QUFBQSxxQ0EyZlZNLFVBM2ZVLEVBNGY1QjtBQUNDLFdBQU8sSUFBSUMsT0FBSixDQUFZLFVBQVNDLE9BQVQsRUFBa0JDLE1BQWxCLEVBQTBCO0FBQzVDLFNBQUksS0FBS2hCLFNBQUwsQ0FBZWlCLGNBQWYsQ0FBOEJKLFVBQTlCLENBQUosRUFBK0M7QUFDOUMsYUFBT0csT0FBTyx5QkFBUCxDQUFQO0FBQ0E7O0FBRUQsU0FBSUUsTUFBTSxJQUFJQyxjQUFKLE1BQXNCLElBQUlDLGFBQUosQ0FBa0IsbUJBQWxCLENBQWhDOztBQUVBRixTQUFJRyxJQUFKLENBQVMsS0FBVCxFQUFnQixLQUFLakMsUUFBTCxDQUFjUSxHQUFkLEdBQW9CLFFBQXBCLEdBQStCaUIsVUFBL0MsRUFBMkQsSUFBM0Q7QUFDQUssU0FBSUksZ0JBQUosQ0FBcUIsY0FBckIsRUFBcUMsa0JBQXJDOztBQUVBLFNBQUl4RCxXQUFXLElBQWY7O0FBRUFvRCxTQUFJSyxrQkFBSixHQUF5QixZQUFXO0FBQUNsRSxjQUFRbUUsR0FBUixDQUFZLEtBQUtDLE1BQWpCO0FBQ3BDLFVBQUksS0FBS0MsVUFBTCxJQUFtQixDQUF2QixFQUEwQjtBQUN6QixXQUFJLEtBQUtELE1BQUwsSUFBZSxHQUFuQixFQUF3QjtBQUN2QjNELGlCQUFTNkQsWUFBVCxHQUF3QkMsS0FBS0MsS0FBTCxDQUFXLEtBQUtDLFlBQWhCLENBQXhCOztBQUVBLGFBQUssSUFBSXRILElBQUksQ0FBYixFQUFnQkEsSUFBSXNELFNBQVM2RCxZQUFULENBQXNCbEgsTUFBMUMsRUFBa0RELEdBQWxELEVBQXVEO0FBQ3RELGFBQUl1SCxVQUFVakUsU0FBUzZELFlBQVQsQ0FBc0JuSCxDQUF0QixDQUFkO0FBQ0FzRCxrQkFBU2tFLFdBQVQsQ0FBcUJsRixJQUFyQixDQUEwQixJQUExQixFQUFnQ2lGLE9BQWhDO0FBQ0E7O0FBRURoQixnQkFBUWpELFNBQVM2RCxZQUFqQjtBQUNBLFFBVEQsTUFTTztBQUNOWCxlQUFPLEtBQUtpQixVQUFaO0FBQ0E7QUFDRDtBQUNELE1BZkQ7O0FBaUJBZixTQUFJMUMsT0FBSixHQUFjLFVBQVNsQixLQUFULEVBQWdCO0FBQzdCMEQsYUFBTzFELEtBQVA7QUFDQSxNQUZEOztBQUlBNEQsU0FBSWdCLElBQUosQ0FBUyxJQUFUO0FBQ0EsS0FsQ2tCLENBa0NqQnJFLElBbENpQixDQWtDWixJQWxDWSxDQUFaLENBQVA7QUFtQ0E7O0FBRUQ7Ozs7QUFsaUI0QjtBQUFBO0FBQUEsbUNBcWlCWjBDLEtBcmlCWSxFQXFpQkxsRyxTQXJpQkssRUFxaUJNOEgsT0FyaUJOLEVBc2lCNUI7QUFDQzlILGdCQUFZQSxhQUFhLElBQXpCO0FBQ0FBLGdCQUFhQSxTQUFELEdBQWMsYUFBYUEsU0FBM0IsR0FBdUMsU0FBbkQ7O0FBRUEsUUFBSXNHLGVBQWUsRUFBbkI7O0FBRUFKLFlBQVFBLE1BQU02QixHQUFOLENBQVUsVUFBU0wsT0FBVCxFQUFrQk0sS0FBbEIsRUFBeUI7QUFDMUMsU0FBSUMsT0FBT25ILFNBQVNHLGFBQVQsQ0FBdUI2RyxPQUF2QixDQUFYO0FBQ0FHLFlBQU9ySSxJQUFJdUYsUUFBSixDQUFhOEMsSUFBYixFQUFtQmpJLFNBQW5CLENBQVA7O0FBRUEsU0FBSWtJLFVBQVVwSCxTQUFTRyxhQUFULENBQXVCLEtBQXZCLENBQWQ7QUFDQWlILGFBQVFsSSxTQUFSLEdBQW9CLGlCQUFwQjtBQUNBaUksVUFBSzNHLFdBQUwsQ0FBaUI0RyxPQUFqQjs7QUFFQSxVQUFJLElBQUk3RixJQUFSLElBQWdCcUYsT0FBaEIsRUFBeUI7QUFDeEIsVUFBRyxLQUFLM0MsUUFBTCxDQUFjTyxVQUFkLENBQXlCNkMsT0FBekIsQ0FBaUM5RixJQUFqQyxLQUEwQyxDQUFDLENBQTlDLEVBQWlEO0FBQ2hEO0FBQ0E7O0FBRUQsVUFBSStGLE1BQU10SCxTQUFTRyxhQUFULENBQXVCNkcsT0FBdkIsQ0FBVjs7QUFFQSxVQUFHekYsUUFBUSxPQUFYLEVBQW9CO0FBQ25CLFdBQUlnRyxRQUFRdkgsU0FBU0csYUFBVCxDQUF1QixLQUF2QixDQUFaO0FBQ0FvSCxhQUFNaEgsWUFBTixDQUFtQixLQUFuQixFQUEwQnFHLFFBQVFyRixJQUFSLENBQTFCO0FBQ0E0RixZQUFLM0csV0FBTCxDQUFpQitHLEtBQWpCO0FBQ0EsT0FKRCxNQUlPO0FBQ05ELFdBQUloSCxTQUFKLEdBQWdCc0csUUFBUXJGLElBQVIsS0FBaUIsRUFBakM7QUFDQTs7QUFFRCtGLFVBQUlwSSxTQUFKLEdBQWdCLGFBQWFpQyxPQUFPcUcsU0FBUCxDQUFpQmpHLElBQWpCLENBQTdCO0FBQ0E2RixjQUFRNUcsV0FBUixDQUFvQjhHLEdBQXBCO0FBQ0E7O0FBRUQsU0FBSUcsT0FBT3pILFNBQVNHLGFBQVQsQ0FBdUI2RyxPQUF2QixDQUFYO0FBQ0FTLFVBQUtqSCxXQUFMLENBQWlCMkcsSUFBakI7O0FBRUEzQixxQkFBZ0JpQyxLQUFLbkgsU0FBTCxHQUFpQixJQUFqQzs7QUFFQSxZQUFPc0csT0FBUDtBQUNBLEtBakNpQixDQWlDaEJsRSxJQWpDZ0IsQ0FpQ1gsSUFqQ1csQ0FBVixDQUFSOztBQW1DQSxXQUFPOEMsWUFBUDtBQUNBO0FBaGxCMkI7QUFBQTtBQUFBLCtCQWtsQmhCa0MsUUFsbEJnQixFQW1sQjVCLENBRUM7QUFEQTs7O0FBR0Q7Ozs7QUF2bEI0QjtBQUFBO0FBQUEsaUNBMmxCNUI7QUFDQyxRQUFJN0gseUlBS08sS0FBS29FLFFBQUwsQ0FBY0wsS0FMckIsMkJBTVEsS0FBS0ssUUFBTCxDQUFjSixNQU50Qix3bENBQUo7O0FBd0RHLFdBQU8vRSxJQUFJNkksUUFBSixDQUFhLG9CQUFiLEVBQW1DOUgsR0FBbkMsQ0FBUDtBQUNIO0FBcnBCMkI7O0FBQUE7QUFBQTs7QUF3cEI3Qjs7Ozs7QUF4cEI2QixLQTJwQnZCK0gsUUEzcEJ1QjtBQUFBO0FBQUE7O0FBZ3FCN0I7Ozs7O0FBR0EsS0FBSUMsb0JBQW9CO0FBQ3ZCNUksV0FBUyxtQkFEYztBQUV2QjBFLFNBQU8sMEJBRmdCO0FBR3ZCbUUsWUFBVSxDQUhhO0FBSXZCQyxlQUFhO0FBSlUsRUFBeEI7O0FBT0EsS0FBSUMsb0JBQUo7O0FBMXFCNkIsS0E0cUJ2QkMsVUE1cUJ1QjtBQThxQjVCLHNCQUFZbEUsU0FBWixFQUNBO0FBQUE7O0FBQ0NpRSxpQkFBY2pFLFNBQWQ7QUFDQSxRQUFLQyxLQUFMLENBQVc2RCxpQkFBWDtBQUNBOztBQUVEOzs7OztBQXByQjRCO0FBQUE7QUFBQSx5QkF1ckJ0QjVELFFBdnJCc0IsRUF3ckI1QjtBQUNDLFFBQUcsUUFBT0EsUUFBUCx5Q0FBT0EsUUFBUCxNQUFtQixRQUF0QixFQUFnQztBQUMvQixXQUFNLElBQUk1QiwwQkFBSixFQUFOO0FBQ0E7O0FBRUQsU0FBSzRCLFFBQUwsR0FBZ0I5QyxPQUFPK0MsTUFBUCxDQUFjMkQsaUJBQWQsRUFBaUM1RCxRQUFqQyxDQUFoQjs7QUFFQSxTQUFLRSxVQUFMLENBQWdCLEtBQUtGLFFBQUwsQ0FBY2hGLE9BQTlCO0FBQ0EsU0FBS2lKLFlBQUwsQ0FBa0IsS0FBS0MsS0FBdkI7QUFDQTs7QUFFRDs7OztBQW5zQjRCO0FBQUE7QUFBQSxnQ0Fzc0JmQSxLQXRzQmUsRUF1c0I1QjtBQUNDLFNBQUsvRCxPQUFMLENBQWE5RCxTQUFiLEdBQXlCLEVBQXpCO0FBQ0EsU0FBSzhELE9BQUwsQ0FBYTVELFdBQWIsQ0FBeUIySCxLQUF6QjtBQUNBOztBQUVEOzs7O0FBNXNCNEI7QUFBQTtBQUFBLDhCQStzQmpCekksUUEvc0JpQixFQWd0QjVCO0FBQ0MsU0FBSzBFLE9BQUwsR0FBZXRGLElBQUlHLE9BQUosQ0FBWVMsUUFBWixDQUFmOztBQUVBWixRQUFJdUYsUUFBSixDQUFhLEtBQUtELE9BQWxCLEVBQTJCLEtBQUtILFFBQUwsQ0FBY04sS0FBekM7O0FBRUEsU0FBS3dFLEtBQUwsR0FBYSxLQUFLQyxXQUFMLEVBQWI7QUFDQSxTQUFLQyxrQkFBTCxDQUF3QixLQUFLRixLQUE3QjtBQUNBOztBQUVEOzs7O0FBenRCNEI7QUFBQTtBQUFBLHNDQTR0QlRBLEtBNXRCUyxFQTZ0QjVCO0FBQ0MsUUFBSXhGLFdBQVcsSUFBZjtBQUNBLFFBQUlpQyxXQUFXb0QsWUFBWW5GLFdBQVosQ0FBd0IsVUFBeEIsQ0FBZjs7QUFFQSxTQUFLeUYsSUFBTCxDQUFVQyxVQUFWLENBQXFCLENBQXJCLEVBQXdCQyxPQUF4QixHQUFrQyxVQUFTQyxLQUFULEVBQWdCO0FBQ2pEQSxXQUFNQyxjQUFOOztBQUVBOUQsY0FBU0ssaUJBQVQsQ0FBMkJ0QyxTQUFTZ0csT0FBVCxHQUFpQixDQUE1QyxFQUErQ3hELElBQS9DLENBQW9ELFVBQVN1QyxRQUFULEVBQW1CO0FBQ3RFOUMsZUFBU1MsWUFBVCxDQUFzQnFDLFFBQXRCO0FBQ0EsTUFGRDs7QUFJQS9FLGNBQVNpRyxVQUFULENBQW9CakcsU0FBU2dHLE9BQVQsR0FBaUIsQ0FBckM7QUFDQSxLQVJEOztBQVVBLFNBQUtFLFFBQUwsQ0FBY04sVUFBZCxDQUF5QixDQUF6QixFQUE0QkMsT0FBNUIsR0FBc0MsVUFBU0MsS0FBVCxFQUFnQjtBQUNyREEsV0FBTUMsY0FBTjs7QUFFQTlELGNBQVNLLGlCQUFULENBQTJCdEMsU0FBU2dHLE9BQVQsR0FBaUIsQ0FBNUMsRUFBK0N4RCxJQUEvQyxDQUFvRCxVQUFTdUMsUUFBVCxFQUFtQjtBQUN0RTlDLGVBQVNTLFlBQVQsQ0FBc0JxQyxRQUF0QjtBQUNBLE1BRkQ7O0FBSUEvRSxjQUFTaUcsVUFBVCxDQUFvQmpHLFNBQVNnRyxPQUFULEdBQWlCLENBQXJDO0FBQ0EsS0FSRDs7QUFVQSxTQUFJLElBQUl0SixJQUFJLENBQVosRUFBZUEsSUFBSSxLQUFLeUosS0FBTCxDQUFXeEosTUFBOUIsRUFBc0NELEdBQXRDLEVBQTJDO0FBQzFDLFVBQUt5SixLQUFMLENBQVd6SixDQUFYLEVBQWNrSixVQUFkLENBQXlCLENBQXpCLEVBQTRCQyxPQUE1QixHQUFzQyxVQUFTQyxLQUFULEVBQWdCO0FBQ3JEQSxZQUFNQyxjQUFOO0FBQ0EsVUFBSWhELGFBQWEsS0FBS3FELFlBQUwsQ0FBa0IsY0FBbEIsQ0FBakI7O0FBRUFuRSxlQUFTSyxpQkFBVCxDQUEyQlMsVUFBM0IsRUFBdUNQLElBQXZDLENBQTRDLFVBQVN1QyxRQUFULEVBQW1CO0FBQzlEOUMsZ0JBQVNTLFlBQVQsQ0FBc0JxQyxRQUF0QjtBQUNBLE9BRkQ7O0FBSUEvRSxlQUFTaUcsVUFBVCxDQUFvQmxELFVBQXBCO0FBQ0EsTUFURDtBQVVBO0FBQ0Q7O0FBRUQ7Ozs7QUFud0I0QjtBQUFBO0FBQUEsOEJBc3dCakJBLFVBdHdCaUIsRUF1d0I1QjtBQUNDLFFBQUcsS0FBS0ksY0FBTCxDQUFvQkosVUFBcEIsQ0FBSCxFQUFvQztBQUNuQztBQUNBOztBQUVELFNBQUtpRCxPQUFMLEdBQWVLLFNBQVN0RCxVQUFULENBQWY7QUFDQSxTQUFLdUQsU0FBTCxDQUFldkQsVUFBZjtBQUNBOztBQUVEOzs7O0FBaHhCNEI7QUFBQTtBQUFBLGdDQW94QjVCO0FBQ0MsV0FBTyxLQUFLaUQsT0FBWjtBQUNBOztBQUVEOzs7O0FBeHhCNEI7QUFBQTtBQUFBLGlDQTR4QjVCO0FBQ0MsUUFBSU8sS0FBS2xKLFNBQVNHLGFBQVQsQ0FBdUIsSUFBdkIsQ0FBVDs7QUFFQSxTQUFLMkksS0FBTCxHQUFhLEtBQUtLLGVBQUwsRUFBYjtBQUNBLFNBQUtOLFFBQUwsR0FBZ0IsS0FBS08sb0JBQUwsRUFBaEI7QUFDQSxTQUFLZCxJQUFMLEdBQVksS0FBS2UsZ0JBQUwsRUFBWjs7QUFFQUgsT0FBR2hLLFNBQUgsR0FBZSxZQUFmO0FBQ0FnSyxPQUFHMUksV0FBSCxDQUFlLEtBQUtxSSxRQUFwQjs7QUFFQSxTQUFLQyxLQUFMLENBQVdRLE9BQVgsQ0FBbUIsVUFBU0MsSUFBVCxFQUFlO0FBQ2pDTCxRQUFHMUksV0FBSCxDQUFlK0ksSUFBZjtBQUNBLEtBRkQ7O0FBSUFMLE9BQUcxSSxXQUFILENBQWUsS0FBSzhILElBQXBCOztBQUVBLFdBQU9ZLEVBQVA7QUFDQTs7QUFFRDs7OztBQS95QjRCO0FBQUE7QUFBQSxxQ0FtekI1QjtBQUNDLFFBQUlKLFFBQVEsRUFBWjs7QUFFQSxTQUFJLElBQUl6SixJQUFJLENBQVosRUFBZUEsS0FBSyxDQUFwQixFQUF1QkEsR0FBdkIsRUFBNEI7QUFDM0IsU0FBSW1LLFdBQVd4SixTQUFTRyxhQUFULENBQXVCLElBQXZCLENBQWY7QUFDQSxTQUFJc0osT0FBT3pKLFNBQVNHLGFBQVQsQ0FBdUIsR0FBdkIsQ0FBWDtBQUNBcUosY0FBU3RLLFNBQVQsR0FBcUIsV0FBckI7QUFDQXVLLFVBQUt2SyxTQUFMLEdBQWlCLFdBQWpCO0FBQ0F1SyxVQUFLbEosWUFBTCxDQUFrQixNQUFsQixFQUEwQixXQUFVbEIsQ0FBcEM7QUFDQW9LLFVBQUtsSixZQUFMLENBQWtCLGNBQWxCLEVBQWtDbEIsQ0FBbEM7QUFDQW9LLFVBQUtuSixTQUFMLEdBQWlCakIsQ0FBakI7QUFDQW1LLGNBQVNoSixXQUFULENBQXFCaUosSUFBckI7QUFDQVgsV0FBTVksSUFBTixDQUFXRixRQUFYO0FBQ0E7O0FBRUQsV0FBT1YsS0FBUDtBQUNBOztBQUVEOzs7O0FBcjBCNEI7QUFBQTtBQUFBLDBDQXkwQjVCO0FBQ0MsUUFBSWEsS0FBSzNKLFNBQVNHLGFBQVQsQ0FBdUIsSUFBdkIsQ0FBVDtBQUNBLFFBQUlzSixPQUFPekosU0FBU0csYUFBVCxDQUF1QixHQUF2QixDQUFYO0FBQ0EsUUFBSXlKLFFBQVE1SixTQUFTRyxhQUFULENBQXVCLE1BQXZCLENBQVo7QUFDQSxRQUFJMEosUUFBUTdKLFNBQVNHLGFBQVQsQ0FBdUIsTUFBdkIsQ0FBWjs7QUFHQXdKLE9BQUd6SyxTQUFILEdBQWUsV0FBZjtBQUNBdUssU0FBS3ZLLFNBQUwsR0FBaUIsV0FBakI7QUFDQTJLLFVBQU0zSyxTQUFOLEdBQWtCLFNBQWxCOztBQUVBdUssU0FBS2xKLFlBQUwsQ0FBa0IsTUFBbEIsRUFBMEIsRUFBMUI7QUFDQWtKLFNBQUtsSixZQUFMLENBQWtCLFlBQWxCLEVBQWdDLFVBQWhDO0FBQ0FxSixVQUFNckosWUFBTixDQUFtQixhQUFuQixFQUFrQyxNQUFsQzs7QUFFQXFKLFVBQU10SixTQUFOLEdBQWtCLFNBQWxCO0FBQ0F1SixVQUFNdkosU0FBTixHQUFrQixVQUFsQjs7QUFFQW1KLFNBQUtqSixXQUFMLENBQWlCb0osS0FBakI7QUFDQUgsU0FBS2pKLFdBQUwsQ0FBaUJxSixLQUFqQjtBQUNBRixPQUFHbkosV0FBSCxDQUFlaUosSUFBZjs7QUFFQSxXQUFPRSxFQUFQO0FBQ0E7O0FBRUQ7Ozs7QUFsMkI0QjtBQUFBO0FBQUEsc0NBczJCNUI7QUFDQyxRQUFJQSxLQUFLM0osU0FBU0csYUFBVCxDQUF1QixJQUF2QixDQUFUO0FBQ0EsUUFBSXNKLE9BQU96SixTQUFTRyxhQUFULENBQXVCLEdBQXZCLENBQVg7QUFDQSxRQUFJeUosUUFBUTVKLFNBQVNHLGFBQVQsQ0FBdUIsTUFBdkIsQ0FBWjtBQUNBLFFBQUkwSixRQUFRN0osU0FBU0csYUFBVCxDQUF1QixNQUF2QixDQUFaOztBQUVBd0osT0FBR3pLLFNBQUgsR0FBZSxXQUFmO0FBQ0F1SyxTQUFLdkssU0FBTCxHQUFpQixXQUFqQjtBQUNBMkssVUFBTTNLLFNBQU4sR0FBa0IsU0FBbEI7O0FBRUF1SyxTQUFLbEosWUFBTCxDQUFrQixNQUFsQixFQUEwQixFQUExQjtBQUNBa0osU0FBS2xKLFlBQUwsQ0FBa0IsWUFBbEIsRUFBZ0MsTUFBaEM7QUFDQXFKLFVBQU1ySixZQUFOLENBQW1CLGFBQW5CLEVBQWtDLE1BQWxDOztBQUVBcUosVUFBTXRKLFNBQU4sR0FBa0IsU0FBbEI7QUFDQXVKLFVBQU12SixTQUFOLEdBQWtCLE1BQWxCOztBQUVBbUosU0FBS2pKLFdBQUwsQ0FBaUJvSixLQUFqQjtBQUNBSCxTQUFLakosV0FBTCxDQUFpQnFKLEtBQWpCO0FBQ0FGLE9BQUduSixXQUFILENBQWVpSixJQUFmOztBQUVBLFNBQUtuQixJQUFMLEdBQVltQixJQUFaOztBQUVBLFdBQU9FLEVBQVA7QUFDQTs7QUFFRDs7OztBQWg0QjRCO0FBQUE7QUFBQSxrQ0FtNEJiakUsVUFuNEJhLEVBbzRCNUI7QUFDQyxXQUFRQSxhQUFhLEtBQUt6QixRQUFMLENBQWM4RCxXQUEzQixJQUEwQ3JDLGNBQWMsQ0FBekQsSUFBK0RvRSxNQUFNcEUsVUFBTixDQUF0RTtBQUNBOztBQUVEOzs7O0FBeDRCNEI7QUFBQTtBQUFBLDZCQTI0QmxCQSxVQTM0QmtCLEVBNDRCNUI7QUFDQ0EsaUJBQWNBLGNBQWNxRSxXQUFXLE1BQVgsQ0FBNUI7QUFDQTNHLFdBQU80RyxPQUFQLENBQWVDLFlBQWYsQ0FBNEIsRUFBNUIsRUFBZ0MsRUFBaEMsRUFBb0MsS0FBS0Msa0JBQUwsQ0FBd0I5RyxPQUFPK0csUUFBUCxDQUFnQkMsSUFBeEMsRUFBOEMsTUFBOUMsRUFBc0QxRSxVQUF0RCxDQUFwQztBQUNBOztBQUVEOzs7O0FBajVCNEI7QUFBQTtBQUFBLDhCQXE1QjVCO0FBQ0MsUUFBSTJFLE9BQU8sRUFBWDtBQUNBLFFBQUlDLFFBQVFsSCxPQUFPK0csUUFBUCxDQUFnQkMsSUFBaEIsQ0FBcUJwTCxPQUFyQixDQUE2Qix5QkFBN0IsRUFBd0QsVUFBU3VMLENBQVQsRUFBWS9ILEdBQVosRUFBaUJnSSxLQUFqQixFQUF3QjtBQUMzRkgsVUFBSzdILEdBQUwsSUFBWWdJLEtBQVo7QUFDQSxLQUZXLENBQVo7O0FBSUEsV0FBT0gsSUFBUDtBQUNBOztBQUVEOzs7O0FBOTVCNEI7QUFBQTtBQUFBLHNDQWk2QlQ1RixHQWo2QlMsRUFpNkJKZ0csS0FqNkJJLEVBaTZCR0MsUUFqNkJILEVBazZCNUI7QUFDSSxRQUFJQyxtQkFBbUIsRUFBdkI7QUFDQSxRQUFJQyxZQUFZbkcsSUFBSXJGLEtBQUosQ0FBVSxHQUFWLENBQWhCO0FBQ0EsUUFBSXlMLFVBQVVELFVBQVUsQ0FBVixDQUFkO0FBQ0EsUUFBSUUsZ0JBQWdCRixVQUFVLENBQVYsQ0FBcEI7QUFDQSxRQUFJbkQsT0FBTyxFQUFYOztBQUVBLFFBQUlxRCxhQUFKLEVBQW1CO0FBQ2ZGLGlCQUFZRSxjQUFjMUwsS0FBZCxDQUFvQixHQUFwQixDQUFaO0FBQ0EsVUFBSyxJQUFJQyxJQUFJLENBQWIsRUFBZ0JBLElBQUl1TCxVQUFVdEwsTUFBOUIsRUFBc0NELEdBQXRDLEVBQTBDO0FBQ3RDLFVBQUl1TCxVQUFVdkwsQ0FBVixFQUFhRCxLQUFiLENBQW1CLEdBQW5CLEVBQXdCLENBQXhCLEtBQThCcUwsS0FBbEMsRUFBd0M7QUFDcENFLDJCQUFvQmxELE9BQU9tRCxVQUFVdkwsQ0FBVixDQUEzQjtBQUNBb0ksY0FBTyxHQUFQO0FBQ0g7QUFDSjtBQUNKOztBQUVELFFBQUlzRCxXQUFXdEQsT0FBTyxFQUFQLEdBQVlnRCxLQUFaLEdBQW9CLEdBQXBCLEdBQTBCQyxRQUF6QztBQUNBLFdBQU9HLFVBQVUsR0FBVixHQUFnQkYsZ0JBQWhCLEdBQW1DSSxRQUExQztBQUNIO0FBcjdCMkI7QUFBQTtBQUFBLDJCQXc3QjVCO0FBQ0MsU0FBS25DLFVBQUwsQ0FBZ0IsQ0FBaEI7QUFDQSxTQUFLSyxTQUFMLENBQWUsQ0FBZjtBQUNBO0FBMzdCMkI7O0FBQUE7QUFBQTs7QUE4N0I3QixLQUFJK0IsYUFBYSxLQUFqQjs7QUFFQSxLQUFJQyxrQkFBa0I7QUFDckJDLGlCQUFlLEVBRE07QUFFckJDLG1CQUFpQixLQUZJO0FBR3JCQyxjQUFZLENBQUMsVUFBRCxFQUFhLFVBQWIsRUFBeUIsUUFBekIsRUFBbUMsWUFBbkM7QUFIUyxFQUF0Qjs7QUFoOEI2QixLQXM4QnZCdk0sU0F0OEJ1QixHQXc4QjVCLG1CQUFZb0YsUUFBWixFQUNBO0FBQUE7O0FBQ0NkLG1CQUFpQmtJLFNBQWpCOztBQUVBLE1BQUcsUUFBT3BILFFBQVAseUNBQU9BLFFBQVAsTUFBbUIsUUFBdEIsRUFBZ0M7QUFDL0IsU0FBTSxJQUFJNUIsMEJBQUosRUFBTjtBQUNBOztBQUVELE9BQUswQixTQUFMLEdBQWlCLElBQUl4QixTQUFKLEVBQWpCO0FBQ0EsT0FBSzBCLFFBQUwsR0FBZ0I5QyxPQUFPK0MsTUFBUCxDQUFjK0csZUFBZCxFQUErQmhILFFBQS9CLENBQWhCOztBQUVBcUgsNkJBQTJCM0osSUFBM0IsQ0FBZ0MsSUFBaEMsRUFBc0NzQyxTQUFTbUgsVUFBL0M7O0FBRUFKLGVBQWEsSUFBYjs7QUFFQSxTQUFPLElBQUlPLEtBQUosQ0FBVSxJQUFWLEVBQWdCO0FBQ3RCQyxRQUFLLGFBQVNDLE1BQVQsRUFBaUIxSixNQUFqQixFQUF5QjtBQUM3QixXQUFPMEosT0FBTzFILFNBQVAsQ0FBaUIySCxJQUFqQixDQUFzQjNKLE1BQXRCLENBQVA7QUFDQTtBQUhxQixHQUFoQixDQUFQO0FBS0EsRUE1OUIyQjs7QUErOUI3Qjs7Ozs7QUFHQSxVQUFTdUosMEJBQVQsQ0FBb0NGLFVBQXBDLEVBQWdEO0FBQy9DLE1BQUlySCxZQUFZLEtBQUtBLFNBQXJCOztBQUVBQSxZQUFVckIsSUFBVixDQUFlLFFBQWYsRUFBeUIsWUFBVztBQUNuQyxVQUFPLElBQUlvQixNQUFKLENBQVdDLFNBQVgsQ0FBUDtBQUNBLEdBRkQ7O0FBSUFBLFlBQVVyQixJQUFWLENBQWUsVUFBZixFQUEyQixZQUFXO0FBQ3JDLFVBQU8sSUFBSWtGLFFBQUosQ0FBYTdELFNBQWIsQ0FBUDtBQUNBLEdBRkQ7O0FBSUFBLFlBQVVyQixJQUFWLENBQWUsWUFBZixFQUE2QixZQUFXO0FBQ3ZDLFVBQU8sSUFBSXVGLFVBQUosQ0FBZWxFLFNBQWYsQ0FBUDtBQUNBLEdBRkQ7O0FBSUFBLFlBQVVyQixJQUFWLENBQWUsVUFBZixFQUEyQixZQUFXO0FBQ3JDLFVBQU8sSUFBSWtDLFFBQUosQ0FBYWIsU0FBYixFQUF3QkEsVUFBVTJILElBQVYsQ0FBZSxZQUFmLENBQXhCLENBQVA7QUFDQSxHQUZEO0FBR0E7O0FBRUQsUUFBTzdNLFNBQVA7QUFFQyxDQXgvQmdCLEVBQWpCIiwiZmlsZSI6ImVDb21tZXJjZS5qcyIsInNvdXJjZXNDb250ZW50IjpbInZhciBlQ29tbWVyY2UgPSAoZnVuY3Rpb24gKCkge1xuJ3VzZSBzdHJpY3QnO1xuXG5jbGFzcyBET01cclxue1xyXG5cdC8qKlxyXG5cdCAqIE1pbmlmaWVzIHRoZSBjc3MgdGV4dC5cclxuXHQgKi9cclxuXHRzdGF0aWMgbWluaWZ5Q3NzKHN0cmluZykgXHJcblx0e1xyXG5cdCAgICBzdHJpbmcgPSBzdHJpbmcucmVwbGFjZSgvXFwvXFwqKD86KD8hXFwqXFwvKVtcXHNcXFNdKSpcXCpcXC98W1xcclxcblxcdF0rL2csICcnKTtcclxuXHQgICAgc3RyaW5nID0gc3RyaW5nLnJlcGxhY2UoLyB7Mix9L2csICcgJyk7XHJcblx0ICAgIHN0cmluZyA9IHN0cmluZy5yZXBsYWNlKC8oW3s6fV0pL2csICckMScpO1xyXG5cdCAgICBzdHJpbmcgPSBzdHJpbmcucmVwbGFjZSgvKFs7LF0pIC9nLCAnJDEnKTtcclxuXHQgICAgc3RyaW5nID0gc3RyaW5nLnJlcGxhY2UoLyAhL2csICchJyk7XHJcblx0ICAgIFxyXG5cdCAgICByZXR1cm4gc3RyaW5nO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQWRkcyBjbGFzcyB0byBhIGdpdmVuIGVsZW1lbnQuXHJcblx0ICovXHJcblx0c3RhdGljIGFkZENsYXNzKGVsZW1lbnQsIGNsYXNzTmFtZSkgXHJcblx0e1xyXG5cdFx0aWYoY2xhc3NOYW1lID09ICcnKSByZXR1cm4gZWxlbWVudDtcclxuXHJcblx0XHRjbGFzc05hbWUgPSBjbGFzc05hbWUudHJpbSgpO1xyXG5cdFx0Y2xhc3NOYW1lID0gY2xhc3NOYW1lLnNwbGl0KCcgJyk7XHJcblxyXG5cdFx0Zm9yKHZhciBpID0gMDsgaSA8IGNsYXNzTmFtZS5sZW5ndGg7IGkrKykge1xyXG5cdFx0XHRlbGVtZW50LmNsYXNzTGlzdC5hZGQoY2xhc3NOYW1lW2ldKTtcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gZWxlbWVudDtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFJlbW92ZXMgY2xhc3MgZnJvbSBhIGdpdmVuIGVsZW1lbnQuXHJcblx0ICovXHJcblx0c3RhdGljIHJlbW92ZUNsYXNzKGVsZW1lbnQsIGNsYXNzTmFtZSkgXHJcblx0e1xyXG5cdFx0ZWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKGNsYXNzTmFtZSk7XHJcblx0XHRcclxuXHRcdHJldHVybiBlbGVtZW50O1xyXG5cdH1cclxuXHJcblx0c3RhdGljIGVsZW1lbnQoc2VsZWN0b3IpIFxyXG5cdHtcclxuXHRcdGxldCBlbGVtZW50ID0gcXVlcnlFbGVtZW50KHNlbGVjdG9yKTtcclxuXHRcdHJldHVybiBlbGVtZW50O1xyXG5cdH1cclxuXHJcblx0c3RhdGljIGFkZFN0eWxlKGlkLCBjc3MpIFxyXG5cdHtcclxuXHRcdGlmKHR5cGVvZiBjc3MgIT0gJ3N0cmluZycpIHtcclxuXHRcdFx0dGhyb3cgbmV3IGludmFsaWRBcmd1bWVudEV4Y2VwdGlvbjtcclxuXHRcdH1cclxuXHJcblx0XHRsZXQgaGVhZCA9IGRvY3VtZW50LmhlYWQgfHwgZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2hlYWQnKVswXTtcclxuXHRcdGxldCBzdHlsZVRhZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3N0eWxlJyk7XHJcblxyXG5cdFx0Ly8gcGlwZSBpdCB0aHJvdWdoIHRoZSBtaW5maWVyXHJcblx0ICAgIGxldCBDU1MgPSB0aGlzLm1pbmlmeUNzcyhjc3MpO1xyXG5cdCAgICAvLyBhZGRpbmcgaXQgdG8gdGhlIHN0eWxldGFnXHJcblx0ICAgIHN0eWxlVGFnLmlubmVySFRNTCA9IENTUztcclxuXHQgICAgLy8gZ2l2ZSBhbiBpZCB0byByZWNvZ25pemUgdGhlIHN0eWxlIHRhZ1xyXG5cdFx0c3R5bGVUYWcuc2V0QXR0cmlidXRlKCdpZCcsIGlkKTtcclxuXHRcdC8vIGFwcGVuZGluZyB0aGF0IHN0eWxlIHRhZyB0byB0aGUgRE9NIGhlYWQgdGFnXHJcblx0XHRoZWFkLmFwcGVuZENoaWxkKHN0eWxlVGFnKTtcclxuXHR9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBRdWVyaWVzIGFuIGVsZW1lbnQgZnJvbSB0aGUgRE9NLlxyXG4gKi9cclxuZnVuY3Rpb24gcXVlcnlFbGVtZW50KHNlbGVjdG9yKSB7XHJcblx0bGV0IGVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHNlbGVjdG9yKSB8fCBudWxsO1xyXG5cclxuXHRpZighIGVsZW1lbnQpIHtcclxuXHRcdHRocm93IG5ldyBOb2RlRWxlbWVudERvZXNOb3RFeGlzdEV4Y2VwdGlvbjtcclxuXHR9XHJcblxyXG5cdHJldHVybiBlbGVtZW50O1xyXG59XG5cbmNsYXNzIEV2ZW50XHJcbntcclxuXHQvKipcclxuXHQgKiBMaXN0ZW4gdG8gYW4gZXZlbnQuXHJcblx0ICovXHJcblx0c3RhdGljIGxpc3RlbihuYW1lLCBjYWxsYmFjaykge1xyXG5cdFx0aWYgKHR5cGVvZiBjYWxsYmFjayAhPT0gJ2Z1bmN0aW9uJykge1xyXG5cdFx0XHR0aHJvdyBuZXcgSW52YWxpZEFyZ3VtZW50RXhjZXB0aW9uO1xyXG5cdFx0fVxyXG5cclxuXHRcdGV2ZW50c1tuYW1lXSA9IGNhbGxiYWNrO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogRmlyZXMgYW4gZXZlbnQuXHJcblx0ICovXHJcblx0c3RhdGljIHRyaWdnZXIobmFtZSwgZGF0YSkge1xyXG5cdFx0ZGF0YSA9IGRhdGEgfHwgbnVsbDtcclxuXHJcblx0XHRpZih0eXBlb2YgZXZlbnRzW25hbWVdICE9PSAnZnVuY3Rpb24nKSB7XHJcblx0XHRcdHRocm93IG5ldyBCYWRFdmVudENhbGxFeGNlcHRpb247XHJcblx0XHR9XHJcblxyXG5cdFx0aWYoZGF0YSAhPSBudWxsICYmIGRhdGEgaW5zdGFuY2VvZiBBcnJheSkge1xyXG5cdFxyXG5cdFx0XHRyZXR1cm4gZXZlbnRzW25hbWVdKC4uLmRhdGEpO1xyXG5cdFx0fVxyXG5cclxuXHRcdGV2ZW50c1tuYW1lXSgpO1xyXG5cdH1cclxufVxuXG5jbGFzcyBDb21tb25cclxue1xyXG5cdC8qKlxyXG5cdCAqIEV4dGVuZCBhbiBvYmplY3QuXHJcblx0ICovXHJcblx0c3RhdGljIGV4dGVuZChjdXJyZW50T2JqLCBuZXdPYmogKSB7XHJcblx0XHR2YXIgZXh0ZW5kZWQgPSB7fTtcclxuXHQgICAgdmFyIHByb3A7XHJcblxyXG5cdCAgICBmb3IgKHByb3AgaW4gY3VycmVudE9iaikge1xyXG5cdCAgICAgICAgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChjdXJyZW50T2JqLCBwcm9wKSkge1xyXG5cdCAgICAgICAgICAgIGV4dGVuZGVkW3Byb3BdID0gY3VycmVudE9ialtwcm9wXTtcclxuXHQgICAgICAgIH1cclxuXHQgICAgfVxyXG5cclxuXHQgICAgZm9yIChwcm9wIGluIG5ld09iaikge1xyXG5cdCAgICAgICAgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChuZXdPYmosIHByb3ApKSB7XHJcblx0ICAgICAgICAgICAgZXh0ZW5kZWRbcHJvcF0gPSBuZXdPYmpbcHJvcF07XHJcblx0ICAgICAgICB9XHJcblx0ICAgIH1cclxuXHJcblx0ICAgIHJldHVybiBleHRlbmRlZDtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIENoZWNrcyBmb3IgYSBuZWVkbGUgaW4gaHlzdGFjay5cclxuXHQgKi9cclxuXHRzdGF0aWMgaW5fYXJyYXkobmVlZGxlLCBoeXN0YWNrKSB7XHJcblx0XHRpZihoeXN0YWNrLmNvbnN0cnVjdG9yICE9PSBBcnJheSkgcmV0dXJuO1xyXG5cclxuXHRcdGZvcih2YXIgaSA9IDA7IGkgPD0gaHlzdGFjay5sZW5ndGg7IGkrKykge1xyXG5cdFx0XHRpZihuZWVkbGUgPT0gaHlzdGFja1tpXSkgcmV0dXJuIHRydWU7XHRcclxuXHRcdH1cclxuXHRcclxuXHRcdHJldHVybiBmYWxzZTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIENoZWNrcyBpZiBhbiBvYmplY3QgaXMgZW1wdHkuXHJcblx0ICovXHJcblx0c3RhdGljIGVtcHR5T2JqZWN0KG9iamVjdCkge1xyXG5cdFx0Zm9yKHZhciBwcm9wIGluIG9iamVjdCkge1xyXG5cdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIHRydWU7XHJcblx0fVxyXG5cclxuXHRzdGF0aWMgY29udGFpbnNPYmplY3Qob2JqZWN0LCBoeXN0YWNrKSBcclxuXHR7XHJcblx0ICAgIHZhciBpO1xyXG5cclxuXHQgICAgZm9yIChpID0gMDsgaSA8IGh5c3RhY2subGVuZ3RoOyBpKyspIHtcclxuXHQgICAgICAgIGlmICh0eXBlb2Ygb2JqZWN0ID09ICdzdHJpbmcnICYmIGh5c3RhY2tbaV0uY29uc3RydWN0b3IubmFtZSA9PT0gb2JqZWN0KSB7XHJcblx0ICAgICAgICBcdHJldHVybiB0cnVlO1xyXG5cdCAgICAgICAgfVxyXG5cclxuXHQgICAgICAgIGlmIChoeXN0YWNrW2ldID09PSBvYmplY3QpIHtcclxuXHQgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuXHQgICAgICAgIH1cclxuXHQgICAgfVxyXG5cclxuXHQgICAgcmV0dXJuIGZhbHNlO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQ29udmVydCBjYW1lbENhc2UgdG8ga2ViYWItY2FzZS5cclxuXHQgKi9cclxuXHRzdGF0aWMga2ViYWJDYXNlKHN0cmluZykge1xyXG5cdFx0cmV0dXJuIHN0cmluZy5yZXBsYWNlKC8oW2Etel0pKFtBLVpdKS9nLCAnJDEtJDInKS50b0xvd2VyQ2FzZSgpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQ2hlY2tzIGlmIGEgZ2l2ZW4gcGFyYW1ldGVyIGlzIGFuIG9iamVjdC5cclxuXHQgKi9cclxuXHRzdGF0aWMgaXNPYmplY3Qob2JqZWN0KSB7XHJcblx0XHRyZXR1cm4gdHlwZW9mIG9iamVjdCA9PSAnb2JqZWN0JztcclxuXHR9XHJcbn1cblxuY2xhc3MgSW52YWxpZEJpbmRpbmdFeGNlcHRpb25cclxue1xyXG5cdGNvbnN0cnVjdG9yKCkgXHJcblx0eyBcclxuICAgIFx0Y29uc29sZS5lcnJvcihgJHt0aGlzLmNvbnN0cnVjdG9yLm5hbWV9LCB0cnlpbmcgdG8gYmluZCBhbiBhbHJlYWR5IGV4aXN0aW5nIGJvdW5kLmApO1xyXG5cclxuICAgIFx0dGhyb3cgbmV3IEVycm9yO1xyXG4gICAgfVxyXG59XG5cbmNsYXNzIEludmFsaWRBcmd1bWVudEV4Y2VwdGlvbiQxXHJcbntcclxuXHRjb25zdHJ1Y3RvcigpIFxyXG5cdHsgXHJcbiAgICBcdGNvbnNvbGUuZXJyb3IoYCR7dGhpcy5jb25zdHJ1Y3Rvci5uYW1lfSwgcGFzc2luZyBpbnZhbGlkIGFyZ3VtZW50cy5gKTtcclxuXHJcbiAgICBcdHRocm93IG5ldyBFcnJvcjtcclxuICAgIH1cclxufVxuXG5sZXQgaW5zdGFuY2VzID0gW107XHJcblxyXG5jbGFzcyBDb250YWluZXIgXHJcbntcclxuXHQvKipcclxuXHQgKiBCaW5kcyBrZXkgdG8gY29uY3JldGUgY2xhc3MuXHJcblx0ICovXHJcblx0YmluZChrZXksIGNvbmNyZXRlKSBcclxuXHR7XHJcblx0XHRpZiAodHlwZW9mIGtleSAhPSAnc3RyaW5nJyB8fCB0eXBlb2YgY29uY3JldGUgIT0gJ2Z1bmN0aW9uJykge1xyXG5cdFx0XHR0aHJvdyBuZXcgSW52YWxpZEFyZ3VtZW50RXhjZXB0aW9uJDE7XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKHR5cGVvZiB0aGlzW2tleV0gIT0gJ3VuZGVmaW5lZCcpIHtcclxuXHRcdFx0dGhyb3cgbmV3IEludmFsaWRCaW5kaW5nRXhjZXB0aW9uO1xyXG5cdFx0fVxyXG5cclxuXHRcdHRoaXNba2V5XSA9IGNvbmNyZXRlO1xyXG5cdFx0dGhpc1trZXldLmJpbmQoY29uY3JldGUpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogU2V0cyBhbiBpbnN0YW5jZS5cclxuXHQgKi9cclxuXHRzZXRJbnN0YW5jZShrZXksIGluc3RhbmNlKSBcclxuXHR7XHJcblx0XHRpZih0eXBlb2Yga2V5ICE9ICdzdHJpbmcnIHx8IHR5cGVvZiBpbnN0YW5jZSAhPSAnb2JqZWN0Jykge1xyXG5cdFx0XHR0aHJvdyBuZXcgSW52YWxpZEFyZ3VtZW50RXhjZXB0aW9uJDE7XHJcblx0XHR9XHJcblxyXG5cdFx0aW5zdGFuY2VzW2tleV0gPSBpbnN0YW5jZTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEdldHMgYW4gaW5zdGFuY2UuXHJcblx0ICovXHJcblx0Z2V0SW5zdGFuY2Uoa2V5KSBcclxuXHR7XHJcblx0XHRpZih0eXBlb2Yga2V5ICE9ICdzdHJpbmcnKSB7XHJcblx0XHRcdHRocm93IG5ldyBJbnZhbGlkQXJndW1lbnRFeGNlcHRpb24kMTtcclxuXHRcdH1cclxuXHJcblx0XHRpZih0eXBlb2Yga2V5ID09ICdvYmplY3QnKSB7XHJcblx0XHRcdHJldHVybiBpbnN0YW5jZXNba2V5LmNvbnN0cnVjdG9yLm5hbWVdIHx8IG51bGw7XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIGluc3RhbmNlc1trZXldIHx8IG51bGw7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBDaGVja3MgaWYgYW4gaW5zdGFuY2UgZXhpc3QuXHJcblx0ICovXHJcblx0aW5zdGFuY2VFeGlzdChpbnN0YW5jZSkgXHJcblx0e1xyXG5cdFx0aWYodHlwZW9mIGluc3RhbmNlID09ICdvYmplY3QnKSB7XHJcblx0XHRcdHJldHVybiAodHlwZW9mIGluc3RhbmNlc1tpbnN0YW5jZS5jb25zdHJ1Y3Rvci5uYW1lXSAhPT0gJ3VuZGVmaW5lZCcpO1xyXG5cdFx0fVxyXG5cdFx0XHJcblx0XHRcclxuXHRcdHJldHVybiAoaW5zdGFuY2UgaW4gaW5zdGFuY2VzKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIENyZWF0ZXMgYW4gaW5zdGFuY2UuXHJcblx0ICovXHJcblx0bWFrZShvYmplY3QpXHJcblx0e1xyXG5cdFx0bGV0IGluc3RhbmNlID0ge307XHJcblxyXG5cdFx0aWYgKHRoaXMuaW5zdGFuY2VFeGlzdChvYmplY3QpKSB7XHJcblx0XHRcdHJldHVybiB0aGlzLmdldEluc3RhbmNlKG9iamVjdCk7XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKHR5cGVvZiBvYmplY3QgPT0gJ29iamVjdCcpIHtcclxuXHRcdFx0aW5zdGFuY2UgPSBvYmplY3Q7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRpbnN0YW5jZSA9IG5ldyB0aGlzW29iamVjdF07XHRcclxuXHRcdH1cclxuXHJcblx0XHR0aGlzLnNldEluc3RhbmNlKG9iamVjdCwgaW5zdGFuY2UpOyBcclxuXHJcblx0XHRyZXR1cm4gaW5zdGFuY2U7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBSZXRyaWV2ZSBhbGwgaW5zdGFuY2VzLlxyXG5cdCAqL1xyXG5cdGluc3RhbmNlcygpIFxyXG5cdHtcclxuXHRcdHJldHVybiBpbnN0YW5jZXM7XHJcblx0fVxyXG59XG5cbmNsYXNzIENvbXBvbmVudHNFeGNlcHRpb25cclxue1xyXG5cdGNvbnN0cnVjdG9yKCkgXHJcblx0eyBcclxuICAgIFx0Y29uc29sZS5lcnJvcihgJHt0aGlzLmNvbnN0cnVjdG9yLm5hbWV9LCBleHBlY3RpbmcgZm9yIGF0IGxlYXN0IG9uZSBjb21wb25lbnRzLCBidXQgbm9uZSB3YXMgZ2l2ZW4sIFxyXG5cdFx0XHRcdFx0XHRcdFx0cGxlYXNlIGFkZCBhdCBsZWFzdCBvbmUgcmVxdWlyZW1lbnQoUHJvZHVjdHMsIFNlcnZpY2VzIG9yL2FuZCBGaWx0ZXJgKTtcclxuXHJcbiAgICBcdHRocm93IG5ldyBFcnJvcjtcclxuICAgIH1cclxufVxuXG5jbGFzcyBCYWRFdmVudENhbGxFeGNlcHRpb24kMVxyXG57XHJcblx0Y29uc3RydWN0b3IoKSBcclxuXHR7IFxyXG4gICAgXHRjb25zb2xlLmVycm9yKGAke3RoaXMuY29uc3RydWN0b3IubmFtZX0sIGxpc3RlbmluZyB0byBhIG5vbmUtZXhpc3RpbmcgZXZlbnRgKTtcclxuXHJcbiAgICBcdHRocm93IG5ldyBFcnJvcjtcclxuICAgIH1cclxufVxuXG5jbGFzcyBDb21wb25lbnROb3RSZWdpc3RlcmVkRXhjZXB0aW9uXHJcbntcclxuXHRjb25zdHJ1Y3RvcigpIFxyXG5cdHsgXHJcbiAgICBcdGNvbnNvbGUuZXJyb3IoYCR7dGhpcy5jb25zdHJ1Y3Rvci5uYW1lfSwgY29tcG9uZW50cyBtdXN0IGJlIHJlZ2lzdGVyZWQgaW4gb3JkZXIgdG8gdXNlIHRoZW1gKTtcclxuXHJcbiAgICBcdHRocm93IG5ldyBFcnJvcjtcclxuICAgIH1cclxufVxuXG5jbGFzcyBOb2RlRWxlbWVudERvZXNOb3RFeGlzdEV4Y2VwdGlvbiQxXHJcbntcclxuXHRjb25zdHJ1Y3RvcigpIFxyXG5cdHsgXHJcbiAgICBcdGNvbnNvbGUuZXJyb3IoYCR7dGhpcy5jb25zdHJ1Y3Rvci5uYW1lfSwgdHJ5aW5nIHRvIGZldGNoIGFuIG5vbmUtZXhpc3RpbmcgZWxlbWVudCBmcm9tIHRoZSBET01gKTtcclxuXHJcbiAgICBcdHRocm93IG5ldyBFcnJvcjtcclxuICAgIH1cclxufVxuXG5jbGFzcyBFeGNlcHRpb25IYW5kbGVyXHJcbntcclxuXHQvKipcclxuXHQgKiBIYW5kbGUgYWxsIHRoZSBlcnJvcnNcclxuXHQgKi9cclxuXHRzdGF0aWMgaW5pdGFsaXplKCkge1x0XHJcblx0XHR3aW5kb3cub25lcnJvciA9IGZ1bmN0aW9uKG1lc3NhZ2UsIHNvdXJjZSwgbGluZW5vLCBjb2xubywgZXJyb3IpIHtcclxuXHJcblx0XHRcdGlmIChlcnJvciBpbnN0YW5jZW9mIEludmFsaWRBcmd1bWVudEV4Y2VwdGlvbiQxKSB7XHJcblx0XHRcdFx0Ly8gaGFuZGxlXHJcblx0XHRcdH0gZWxzZSBpZiAoZXJyb3IgaW5zdGFuY2VvZiBJbnZhbGlkQmluZGluZ0V4Y2VwdGlvbikge1xyXG5cdFx0XHRcdC8vIGhhbmRsZVxyXG5cdFx0XHR9IGVsc2UgaWYgKGVycm9yIGluc3RhbmNlb2YgQmFkRXZlbnRDYWxsRXhjZXB0aW9uJDEpIHtcclxuXHRcdFx0XHQvLyBoYW5kbGVcclxuXHRcdFx0fSBlbHNlIGlmIChlcnJvciBpbnN0YW5jZW9mIENvbXBvbmVudHNFeGNlcHRpb24pIHtcclxuXHRcdFx0XHQvLyBoYW5kbGVcclxuXHRcdFx0fSBlbHNlIGlmIChlcnJvciBpbnN0YW5jZW9mIENvbXBvbmVudE5vdFJlZ2lzdGVyZWRFeGNlcHRpb24pIHtcclxuXHRcdFx0XHQvLyBoYW5kbGVcclxuXHRcdFx0fSBlbHNlIGlmIChlcnJvciBpbnN0YW5jZW9mIE5vZGVFbGVtZW50RG9lc05vdEV4aXN0RXhjZXB0aW9uJDEpIHtcclxuXHRcdFx0XHRcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHJldHVybiB0cnVlO1xyXG5cdFx0fTtcclxuXHR9XHJcbn1cblxuLyoqXHJcbiAqIFRoZSBkZWZhdWx0IHNldHRpbmdzIG9mIHRoZSBmaWx0ZXIuXHJcbiAqL1xyXG5sZXQgZGVmYXVsdFNldHRpbmdzJDEgPSB7XHJcblx0ZWxlbWVudDogJy5maWx0ZXInLFxyXG5cdGRhdGE6IHt9LFxyXG5cdGNsYXNzOiAnY29sLXhzLTInLFxyXG5cdHdpZHRoOiAnJyxcclxuXHRoZWlnaHQ6ICcnLFxyXG59O1xyXG5cclxuXHJcbi8qKlxyXG4gKiBUaGUgRmlsdGVyIE9iamVjdCwgaGFuZGxlcyB0aGUgZmlsdGVyIG9mIHRoZSBwcm9kdWN0cy9zZXJ2aWNlcy5cclxuICovXHJcbmNsYXNzIEZpbHRlciBcclxue1xyXG5cdGNvbnN0cnVjdG9yKGNvbnRhaW5lcikgXHJcblx0e1xyXG5cdFx0dGhpcy5zZXR1cChkZWZhdWx0U2V0dGluZ3MkMSk7XHJcblx0fVxyXG5cclxuXHRzZXR1cChzZXR0aW5ncylcclxuXHR7XHJcblx0XHRpZih0eXBlb2Ygc2V0dGluZ3MgIT0gJ29iamVjdCcpIHtcclxuXHRcdFx0dGhyb3cgbmV3IEludmFsaWRBcmd1bWVudEV4Y2VwdGlvbiQxO1xyXG5cdFx0fVxyXG5cclxuXHRcdHRoaXMuc2V0dGluZ3MgPSBDb21tb24uZXh0ZW5kKGRlZmF1bHRTZXR0aW5ncyQxLCBzZXR0aW5ncyk7XHJcblxyXG5cdFx0dGhpcy5zZXRFbGVtZW50KHRoaXMuc2V0dGluZ3MuZWxlbWVudCk7XHJcblx0fVxyXG5cclxuXHRzZXRFbGVtZW50KHNlbGVjdG9yKVxyXG5cdHtcclxuXHRcdHRoaXMud3JhcHBlciA9IERPTS5lbGVtZW50KHNlbGVjdG9yKTtcclxuXHRcdFxyXG5cdFx0RE9NLmFkZENsYXNzKHRoaXMud3JhcHBlciwgdGhpcy5zZXR0aW5ncy5jbGFzcyk7XHJcblx0fVxyXG59XG5cbi8qKlxyXG4gKiBUaGUgZGVmYXVsdCBzZXR0aW5ncyBvZiBlYWNoIHByb2R1Y3QuXHJcbiAqL1xyXG5sZXQgZGVmYXVsdFNldHRpbmdzJDIgPSB7XHJcblx0ZWxlbWVudDogJy5wcm9kdWN0cycsXHJcblx0Y2xhc3M6ICcnLFxyXG5cdGl0ZW1DbGFzczogJycsXHJcblx0d2lkdGg6ICcyMDBweCcsXHJcblx0aGVpZ2h0OiAnMjUwcHgnLFxyXG5cdGF0dHJpYnV0ZXM6IFsnbmFtZScsICdwcmljZScsICdkZWxpdmVyeVRpbWUnLCAnaW1hZ2UnXSxcclxuXHR1cmw6ICdwcm9kdWN0cy5waHAnLFxyXG5cdGluaXRTdGF0aWNEYXRhOiB7fSxcclxufTtcclxuXHJcbmxldCBDb250YWluZXIkMjtcclxuXHJcbi8qKlxyXG4gKiBUaGUgUHJvZHVjdHMgT2JqZWN0LCBoYW5kbGVzIHRoZSBwcm9kdWN0cy5cclxuICovXHJcbmNsYXNzIFByb2R1Y3RzIFxyXG57XHJcblx0LyoqXHJcblx0ICogSW5pdGFsaXplIHRoZSBDb250YWluZXIgYW5kIHRoZSBwYWdpbmF0b3JcclxuXHQgKi9cclxuXHRjb25zdHJ1Y3Rvcihjb250YWluZXIsIHBhZ2luYXRvcikgXHJcblx0e1xyXG5cdFx0dGhpcy5zZXR1cChkZWZhdWx0U2V0dGluZ3MkMik7XHJcblxyXG5cdFx0Q29udGFpbmVyJDIgPSBjb250YWluZXI7XHJcblx0XHR0aGlzLnBhZ2luYXRvciA9IHBhZ2luYXRvcjtcclxuXHR9XHJcblxyXG5cdHNldHVwKHNldHRpbmdzKVxyXG5cdHtcclxuXHRcdGlmICh0eXBlb2Ygc2V0dGluZ3MgIT0gJ29iamVjdCcpIHtcclxuXHRcdFx0dGhyb3cgbmV3IEludmFsaWRBcmd1bWVudEV4Y2VwdGlvbiQxO1xyXG5cdFx0fVxyXG5cclxuXHRcdHRoaXMuc2V0dGluZ3MgPSBDb21tb24uZXh0ZW5kKGRlZmF1bHRTZXR0aW5ncyQyLCBzZXR0aW5ncyk7XHJcblxyXG5cdFx0dGhpcy5zZXRFbGVtZW50KHRoaXMuc2V0dGluZ3MuZWxlbWVudCk7XHJcblxyXG5cdFx0dGhpcy5hZGRTdHlsZVRhZygpO1x0XHJcblx0XHJcblx0XHRpZiAodHlwZW9mIENvbnRhaW5lciQyID09ICd1bmRlZmluZWQnKSB7XHJcblx0XHRcdHJldHVybjtcclxuXHRcdH1cclxuXHJcblx0XHRpZiAoQ29udGFpbmVyJDIuaW5zdGFuY2VFeGlzdCgnUGFnaW5hdGlvbicpKSB7XHJcblx0XHRcdHRoaXMucGFnaW5hdG9yLnJlc2V0KHRoaXMuc2V0dGluZ3MuaW5pdFN0YXRpY0RhdGEpO1xyXG5cdFx0XHRsZXQgcmVxdWVzdCA9IHRoaXMuZ2V0UHJvZHVjdHNCeVBhZ2UodGhpcy5wYWdpbmF0b3IuZ2V0Q3VycmVudCgpKTtcclxuXHRcdFx0XHJcblx0XHRcdHJlcXVlc3QudGhlbihmdW5jdGlvbihpdGVtcykge1xyXG5cdFx0XHRcdHRoaXMucmVwbGFjZUl0ZW1zKGl0ZW1zKTtcclxuXHRcdFx0fS5iaW5kKHRoaXMpKS5jYXRjaChmdW5jdGlvbihlcnJvcikge1xyXG5cclxuXHRcdFx0fSk7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRzZXRFbGVtZW50KHNlbGVjdG9yKVxyXG5cdHtcclxuXHRcdHRoaXMud3JhcHBlciA9IERPTS5lbGVtZW50KHNlbGVjdG9yKTtcclxuXHRcdFxyXG5cdFx0RE9NLmFkZENsYXNzKHRoaXMud3JhcHBlciwgdGhpcy5zZXR0aW5ncy5jbGFzcyk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBSZXBsYWNlIGl0ZW1zIGluIHRoZSBjb250YWluZXIuXHJcblx0ICovXHJcblx0cmVwbGFjZUl0ZW1zKGl0ZW1zKSBcclxuXHR7XHJcblx0XHRpZiAoISBBcnJheS5pc0FycmF5KGl0ZW1zKSB8fCB0eXBlb2YgaXRlbXNbMF0gPT0gJ3N0cmluZycpIHtcclxuXHRcdFx0dGhyb3cgbmV3IEludmFsaWRBcmd1bWVudEV4Y2VwdGlvbiQxO1xyXG5cdFx0fVxyXG5cclxuXHRcdGxldCB3cmFwcGVkSXRlbXMgPSB0aGlzLndyYXBBbGxXaXRoSFRNTChpdGVtcywgdGhpcy5zZXR0aW5ncy5pdGVtQ2xhc3MsICdkaXYnKTtcclxuXHJcblx0XHR0aGlzLndyYXBwZXIuaW5uZXJIVE1MID0gd3JhcHBlZEl0ZW1zO1xyXG5cclxuXHRcdHJldHVybiBpdGVtcztcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIE1ha2VzIGFuIEFqYXggY2FsbCB0byB0aGUgc2VydmVyLlxyXG5cdCAqL1xyXG5cdGdldFByb2R1Y3RzQnlQYWdlKHBhZ2VOdW1iZXIpIFxyXG5cdHtcclxuXHRcdHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcclxuXHRcdFx0aWYgKHRoaXMucGFnaW5hdG9yLm5vdEluUGFnZVJhbmdlKHBhZ2VOdW1iZXIpKSB7XHJcblx0XHRcdFx0cmV0dXJuIHJlamVjdCgnTm90IGluIHBhZ2luYXRpb24gcmFuZ2UnKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0bGV0IHhociA9IG5ldyBYTUxIdHRwUmVxdWVzdCB8fCBuZXcgQWN0aXZlWE9iamVjdChcIk1pY3Jvc29mdC5YTUxIVFRQXCIpO1xyXG5cclxuXHRcdFx0eGhyLm9wZW4oJ0dFVCcsIHRoaXMuc2V0dGluZ3MudXJsICsgJz9wYWdlPScgKyBwYWdlTnVtYmVyLCB0cnVlKTsgXHJcblx0XHRcdHhoci5zZXRSZXF1ZXN0SGVhZGVyKCdDb250ZW50LVR5cGUnLCAnYXBwbGljYXRpb24vanNvbicpO1xyXG5cdFx0XHRcclxuXHRcdFx0bGV0IGluc3RhbmNlID0gdGhpcztcclxuXHJcblx0XHRcdHhoci5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBmdW5jdGlvbigpIHtjb25zb2xlLmxvZyh0aGlzLnN0YXR1cyk7XHJcblx0XHRcdFx0aWYgKHRoaXMucmVhZHlTdGF0ZSA9PSA0KSB7XHJcblx0XHRcdFx0XHRpZiAodGhpcy5zdGF0dXMgPT0gMjAwKSB7XHJcblx0XHRcdFx0XHRcdGluc3RhbmNlLmN1cnJlbnRJdGVtcyA9IEpTT04ucGFyc2UodGhpcy5yZXNwb25zZVRleHQpO1xyXG5cdFx0XHRcdFx0XHJcblx0XHRcdFx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgaW5zdGFuY2UuY3VycmVudEl0ZW1zLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdFx0XHRcdFx0dmFyIHByb2R1Y3QgPSBpbnN0YW5jZS5jdXJyZW50SXRlbXNbaV07XHJcblx0XHRcdFx0XHRcdFx0aW5zdGFuY2UuQWZ0ZXJMb2FkZWQuY2FsbCh0aGlzLCBwcm9kdWN0KTtcclxuXHRcdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRcdFx0cmVzb2x2ZShpbnN0YW5jZS5jdXJyZW50SXRlbXMpO1xyXG5cdFx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdFx0cmVqZWN0KHRoaXMuc3RhdHVzVGV4dCk7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9O1xyXG5cclxuXHRcdFx0eGhyLm9uZXJyb3IgPSBmdW5jdGlvbihlcnJvcikge1xyXG5cdFx0XHRcdHJlamVjdChlcnJvcik7XHJcblx0XHRcdH07XHJcblxyXG5cdFx0XHR4aHIuc2VuZChudWxsKTtcclxuXHRcdH0uYmluZCh0aGlzKSk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBXcmFwIGFsbCB0aGUgaXRlbXMgd2l0aCBzcGVjaWZjIHRhZyBhbmQgY2xhc3NuYW1lLlxyXG5cdCAqL1xyXG5cdHdyYXBBbGxXaXRoSFRNTChpdGVtcywgY2xhc3NOYW1lLCB0YWdUeXBlKSBcclxuXHR7XHJcblx0XHRjbGFzc05hbWUgPSBjbGFzc05hbWUgfHwgbnVsbDtcclxuXHRcdGNsYXNzTmFtZSA9IChjbGFzc05hbWUpID8gJ3Byb2R1Y3QgJyArIGNsYXNzTmFtZSA6ICdwcm9kdWN0JztcclxuXHRcdFxyXG5cdFx0dmFyIHdyYXBwZWRJdGVtcyA9ICcnO1xyXG5cclxuXHRcdGl0ZW1zID0gaXRlbXMubWFwKGZ1bmN0aW9uKHByb2R1Y3QsIGluZGV4KSB7XHJcblx0XHRcdHZhciBpdGVtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCh0YWdUeXBlKTtcclxuXHRcdFx0aXRlbSA9IERPTS5hZGRDbGFzcyhpdGVtLCBjbGFzc05hbWUpO1xyXG5cclxuXHRcdFx0dmFyIG92ZXJsYXkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuXHRcdFx0b3ZlcmxheS5jbGFzc05hbWUgPSAncHJvZHVjdC1vdmVybGF5JztcclxuXHRcdFx0aXRlbS5hcHBlbmRDaGlsZChvdmVybGF5KTtcclxuXHJcblx0XHRcdGZvcih2YXIgcHJvcCBpbiBwcm9kdWN0KSB7XHJcblx0XHRcdFx0aWYodGhpcy5zZXR0aW5ncy5hdHRyaWJ1dGVzLmluZGV4T2YocHJvcCkgPT0gLTEpIHtcclxuXHRcdFx0XHRcdGNvbnRpbnVlO1xyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0dmFyIHRhZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQodGFnVHlwZSk7XHJcblxyXG5cdFx0XHRcdGlmKHByb3AgPT0gJ2ltYWdlJykge1xyXG5cdFx0XHRcdFx0dmFyIGltYWdlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW1nJyk7XHJcblx0XHRcdFx0XHRpbWFnZS5zZXRBdHRyaWJ1dGUoJ3NyYycsIHByb2R1Y3RbcHJvcF0pO1xyXG5cdFx0XHRcdFx0aXRlbS5hcHBlbmRDaGlsZChpbWFnZSk7XHJcblx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdHRhZy5pbm5lckhUTUwgPSBwcm9kdWN0W3Byb3BdIHx8ICcnO1xyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0dGFnLmNsYXNzTmFtZSA9ICdwcm9kdWN0LScgKyBDb21tb24ua2ViYWJDYXNlKHByb3ApO1xyXG5cdFx0XHRcdG92ZXJsYXkuYXBwZW5kQ2hpbGQodGFnKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0dmFyIHRlbXAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KHRhZ1R5cGUpO1xyXG5cdFx0XHR0ZW1wLmFwcGVuZENoaWxkKGl0ZW0pO1xyXG5cdFx0XHRcclxuXHRcdFx0d3JhcHBlZEl0ZW1zICs9IHRlbXAuaW5uZXJIVE1MICsgXCJcXG5cIjtcclxuXHJcblx0XHRcdHJldHVybiBwcm9kdWN0O1xyXG5cdFx0fS5iaW5kKHRoaXMpKTtcclxuXHJcblx0XHRyZXR1cm4gd3JhcHBlZEl0ZW1zO1xyXG5cdH1cclxuXHJcblx0QWZ0ZXJMb2FkZWQocHJvZHVjdHMpIFxyXG5cdHtcclxuXHRcdC8vXHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBBZGQgdGhlIGVDb21tZXJjZSBzdHlsZSB0YWdzIHRvIHRoZSBET00uXHJcblx0ICovXHJcblx0YWRkU3R5bGVUYWcoKSBcclxuXHR7XHJcblx0XHRsZXQgY3NzID0gYFxyXG5cdFx0XHQucHJvZHVjdCB7XHJcblx0XHRcdFx0cG9zaXRpb246IHJlbGF0aXZlO1xyXG5cdFx0XHRcdG1hcmdpbjogNXB4IDVweDtcclxuXHRcdFx0XHRib3JkZXI6IDFweCBzb2xpZCAjZTRlNGU0O1xyXG5cdFx0XHRcdHdpZHRoOiAke3RoaXMuc2V0dGluZ3Mud2lkdGh9O1xyXG5cdFx0XHRcdGhlaWdodDogJHt0aGlzLnNldHRpbmdzLmhlaWdodH07XHJcblx0XHRcdFx0Y3Vyc29yOiBwb2ludGVyO1xyXG5cdFx0XHRcdGNvbG9yOiAjZmZmZmZmO1xyXG5cdFx0XHRcdG92ZXJmbG93OiBoaWRkZW47XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdC5wcm9kdWN0ID4gLnByb2R1Y3Qtb3ZlcmxheSB7XHJcblx0XHRcdFx0cG9zaXRpb246IGFic29sdXRlO1xyXG5cdFx0XHRcdHRvcDogMDtcclxuXHRcdFx0XHRsZWZ0OiAwO1xyXG5cdFx0XHRcdHdpZHRoOiAxMDAlO1xyXG5cdFx0XHRcdGhlaWdodDogMTAwJTtcclxuXHRcdFx0XHRvcGFjaXR5OiAwLjU7XHJcblx0XHRcdFx0ei1pbmRleDogNTtcclxuXHRcdFx0XHR0cmFuc2l0aW9uOiAxcyBhbGw7XHJcblx0XHRcdFx0dHJhbnNmb3JtOiB0cmFuc2xhdGVYKC0yNTBweCk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdC5wcm9kdWN0OmhvdmVyID4gLnByb2R1Y3Qtb3ZlcmxheSB7XHJcblx0XHRcdFx0YmFja2dyb3VuZDogcmdiYSgwLCAwLCAwLCAwLjQ1KTtcclxuXHRcdFx0XHR0cmFuc2Zvcm06IHRyYW5zbGF0ZVgoMHB4KTtcclxuXHRcdFx0XHRvcGFjaXR5OiAxO1xyXG5cdFx0XHRcdHRyYW5zaXRpb246IDFzIGFsbDtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0LnByb2R1Y3QgPiBpbWcge1xyXG5cdFx0XHRcdHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuXHRcdFx0XHRsZWZ0OiAwO1xyXG5cdFx0XHRcdHRvcDogMDtcclxuXHRcdFx0XHR3aWR0aDogMTAwJTtcclxuXHRcdFx0XHRoZWlnaHQ6IDEwMCU7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdC5wcm9kdWN0ID4gLnByb2R1Y3QtaW1hZ2Uge1xyXG5cdFx0XHRcdHotaW5kZXg6IDA7XHJcblx0XHRcdFx0cG9zaXRpb246IGFic29sdXRlO1xyXG5cdFx0XHRcdHRvcDogMDtcclxuXHRcdFx0XHRsZWZ0OiAwO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHQucHJvZHVjdCA+IC5wcm9kdWN0LW92ZXJsYXkgPiAucHJvZHVjdC1uYW1lLCBcclxuXHRcdFx0LnByb2R1Y3QgPiAucHJvZHVjdC1vdmVybGF5ID4gLnByb2R1Y3QtcHJpY2UsXHJcblx0XHRcdC5wcm9kdWN0ID4gLnByb2R1Y3Qtb3ZlcmxheSA+IC5wcm9kdWN0LWRlbGl2ZXJ5LXRpbWUge1xyXG5cdFx0XHRcdHotaW5kZXg6IDE7XHJcblx0XHRcdFx0cG9zaXRpb246IHJlbGF0aXZlO1xyXG5cdFx0XHRcdHRleHQtYWxpZ246IGNlbnRlcjtcclxuXHRcdFx0XHRtYXJnaW4tdG9wOiAyNXB4O1xyXG5cdFx0XHR9XHJcblx0XHRgO1xyXG5cdCAgICBcclxuXHQgICAgcmV0dXJuIERPTS5hZGRTdHlsZSgnZUNvbW1lcmNlLVByb2R1Y3RzJywgY3NzKTtcclxuXHR9XHJcbn1cblxuLyoqXHJcbiAqIFRoZSBTZXJ2aWNlcyBPYmplY3QsIGhhbmRsZXMgdGhlIHNlcnZpY2VzLlxyXG4gKi9cclxuY2xhc3MgU2VydmljZXMgXHJcbntcclxuXHJcbn1cblxuLyoqXHJcbiAqIFRoZSBkZWZhdWx0IHNldHRpbmdzIG9mIHRoZSBwYWdpbmF0aW9uLlxyXG4gKi9cclxubGV0IGRlZmF1bHRTZXR0aW5ncyQzID0ge1xyXG5cdGVsZW1lbnQ6ICcucGFnaW5hdGlvbi1saW5rcycsXHJcblx0Y2xhc3M6ICdjb2wteHMtb2Zmc2V0LTQgY29sLXhzLTgnLFxyXG5cdHBlcl9wYWdlOiA1LFxyXG5cdHRvdGFsX3BhZ2VzOiAzLFxyXG59O1xyXG5cclxubGV0IENvbnRhaW5lciQzO1xyXG5cclxuY2xhc3MgUGFnaW5hdGlvbiBcclxue1xyXG5cdGNvbnN0cnVjdG9yKGNvbnRhaW5lcikgXHJcblx0e1xyXG5cdFx0Q29udGFpbmVyJDMgPSBjb250YWluZXI7XHJcblx0XHR0aGlzLnNldHVwKGRlZmF1bHRTZXR0aW5ncyQzKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFNldCB0aGUgUGFnaW5hdGlvbiBvYmplY3QgdXAuXHJcblx0ICovXHJcblx0c2V0dXAoc2V0dGluZ3MpXHJcblx0e1xyXG5cdFx0aWYodHlwZW9mIHNldHRpbmdzICE9ICdvYmplY3QnKSB7XHJcblx0XHRcdHRocm93IG5ldyBJbnZhbGlkQXJndW1lbnRFeGNlcHRpb24kMTtcclxuXHRcdH1cclxuXHJcblx0XHR0aGlzLnNldHRpbmdzID0gQ29tbW9uLmV4dGVuZChkZWZhdWx0U2V0dGluZ3MkMywgc2V0dGluZ3MpO1xyXG5cclxuXHRcdHRoaXMuc2V0RWxlbWVudCh0aGlzLnNldHRpbmdzLmVsZW1lbnQpO1xyXG5cdFx0dGhpcy5yZXBsYWNlTGlua3ModGhpcy5saW5rcyk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBSZXBsYWNlcyB0aGUgbGlua3MgaW4gdGhlIHdyYXBwZXIuXHJcblx0ICovXHJcblx0cmVwbGFjZUxpbmtzKGxpbmtzKVxyXG5cdHtcclxuXHRcdHRoaXMud3JhcHBlci5pbm5lckhUTUwgPSAnJztcclxuXHRcdHRoaXMud3JhcHBlci5hcHBlbmRDaGlsZChsaW5rcyk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBTZXRzIHRoZSB3cmFwcGVyIGVsZW1lbnQuXHJcblx0ICovXHJcblx0c2V0RWxlbWVudChzZWxlY3RvcilcclxuXHR7XHJcblx0XHR0aGlzLndyYXBwZXIgPSBET00uZWxlbWVudChzZWxlY3Rvcik7XHJcblx0XHRcclxuXHRcdERPTS5hZGRDbGFzcyh0aGlzLndyYXBwZXIsIHRoaXMuc2V0dGluZ3MuY2xhc3MpO1xyXG5cclxuXHRcdHRoaXMubGlua3MgPSB0aGlzLmNyZWF0ZUxpbmtzKCk7XHJcblx0XHR0aGlzLmJpbmRFdmVudExpc3RlbmVycyh0aGlzLmxpbmtzKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEJpbmRzIHRoZSBidXR0b25zIGV2ZW50cyBsaXN0ZW5lcnMuXHJcblx0ICovXHJcblx0YmluZEV2ZW50TGlzdGVuZXJzKGxpbmtzKSBcclxuXHR7XHJcblx0XHRsZXQgaW5zdGFuY2UgPSB0aGlzO1xyXG5cdFx0bGV0IFByb2R1Y3RzID0gQ29udGFpbmVyJDMuZ2V0SW5zdGFuY2UoJ1Byb2R1Y3RzJyk7XHJcblxyXG5cdFx0dGhpcy5uZXh0LmNoaWxkTm9kZXNbMF0ub25jbGljayA9IGZ1bmN0aW9uKGV2ZW50KSB7XHJcblx0XHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG5cdFx0XHRQcm9kdWN0cy5nZXRQcm9kdWN0c0J5UGFnZShpbnN0YW5jZS5jdXJyZW50KzEpLnRoZW4oZnVuY3Rpb24ocHJvZHVjdHMpIHtcclxuXHRcdFx0XHRQcm9kdWN0cy5yZXBsYWNlSXRlbXMocHJvZHVjdHMpO1xyXG5cdFx0XHR9KTtcclxuXHJcblx0XHRcdGluc3RhbmNlLnNldEN1cnJlbnQoaW5zdGFuY2UuY3VycmVudCsxKTtcclxuXHRcdH07XHJcblxyXG5cdFx0dGhpcy5wcmV2aW91cy5jaGlsZE5vZGVzWzBdLm9uY2xpY2sgPSBmdW5jdGlvbihldmVudCkge1xyXG5cdFx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdFx0XHRcclxuXHRcdFx0UHJvZHVjdHMuZ2V0UHJvZHVjdHNCeVBhZ2UoaW5zdGFuY2UuY3VycmVudC0xKS50aGVuKGZ1bmN0aW9uKHByb2R1Y3RzKSB7XHJcblx0XHRcdFx0UHJvZHVjdHMucmVwbGFjZUl0ZW1zKHByb2R1Y3RzKTtcclxuXHRcdFx0fSk7XHJcblxyXG5cdFx0XHRpbnN0YW5jZS5zZXRDdXJyZW50KGluc3RhbmNlLmN1cnJlbnQtMSk7XHJcblx0XHR9O1xyXG5cclxuXHRcdGZvcih2YXIgaSA9IDA7IGkgPCB0aGlzLnBhZ2VzLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdHRoaXMucGFnZXNbaV0uY2hpbGROb2Rlc1swXS5vbmNsaWNrID0gZnVuY3Rpb24oZXZlbnQpIHtcclxuXHRcdFx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdFx0XHRcdHZhciBwYWdlTnVtYmVyID0gdGhpcy5nZXRBdHRyaWJ1dGUoJ2RhdGEtcGFnZS1ucicpO1xyXG5cdFx0XHRcdFxyXG5cdFx0XHRcdFByb2R1Y3RzLmdldFByb2R1Y3RzQnlQYWdlKHBhZ2VOdW1iZXIpLnRoZW4oZnVuY3Rpb24ocHJvZHVjdHMpIHtcclxuXHRcdFx0XHRcdFByb2R1Y3RzLnJlcGxhY2VJdGVtcyhwcm9kdWN0cyk7XHJcblx0XHRcdFx0fSk7XHJcblx0XHRcdFx0XHJcblx0XHRcdFx0aW5zdGFuY2Uuc2V0Q3VycmVudChwYWdlTnVtYmVyKTtcclxuXHRcdFx0fTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFNldHMgdGhlIGN1cnJlbnQgcGFnZS5cclxuXHQgKi9cclxuXHRzZXRDdXJyZW50KHBhZ2VOdW1iZXIpIFxyXG5cdHtcclxuXHRcdGlmKHRoaXMubm90SW5QYWdlUmFuZ2UocGFnZU51bWJlcikpIHtcclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0fVxyXG5cclxuXHRcdHRoaXMuY3VycmVudCA9IHBhcnNlSW50KHBhZ2VOdW1iZXIpO1xyXG5cdFx0dGhpcy5jaGFuZ2VVcmwocGFnZU51bWJlcik7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBHZXRzIHRoZSBjdXJyZW50IHBhZ2UuXHJcblx0ICovXHJcblx0Z2V0Q3VycmVudCgpIFxyXG5cdHtcclxuXHRcdHJldHVybiB0aGlzLmN1cnJlbnQ7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBDcmVhdGVzIHRoZSBwYWdpbmF0aW9uIGxpbmtzLlxyXG5cdCAqL1xyXG5cdGNyZWF0ZUxpbmtzKCkgXHJcblx0e1x0XHJcblx0XHRsZXQgdWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd1bCcpO1xyXG5cdFx0XHJcblx0XHR0aGlzLnBhZ2VzID0gdGhpcy5jcmVhdGVQYWdlTGlua3MoKTtcclxuXHRcdHRoaXMucHJldmlvdXMgPSB0aGlzLmNyZWF0ZVByZXZpb3VzQnV0dG9uKCk7XHJcblx0XHR0aGlzLm5leHQgPSB0aGlzLmNyZWF0ZU5leHRCdXR0b24oKTtcclxuXHJcblx0XHR1bC5jbGFzc05hbWUgPSAncGFnaW5hdGlvbic7XHJcblx0XHR1bC5hcHBlbmRDaGlsZCh0aGlzLnByZXZpb3VzKTtcclxuXHJcblx0XHR0aGlzLnBhZ2VzLmZvckVhY2goZnVuY3Rpb24ocGFnZSkge1xyXG5cdFx0XHR1bC5hcHBlbmRDaGlsZChwYWdlKTtcclxuXHRcdH0pO1xyXG5cclxuXHRcdHVsLmFwcGVuZENoaWxkKHRoaXMubmV4dCk7XHJcblxyXG5cdFx0cmV0dXJuIHVsO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQ3JlYXRlcyB0aGUgcGFnZXMgaXRlbSBsaW5rcy5cclxuXHQgKi9cclxuXHRjcmVhdGVQYWdlTGlua3MoKSBcclxuXHR7XHJcblx0XHR2YXIgcGFnZXMgPSBbXTtcclxuXHRcdFxyXG5cdFx0Zm9yKHZhciBpID0gMTsgaSA8PSAzOyBpKyspIHtcclxuXHRcdFx0dmFyIHBhZ2VJdGVtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKTtcclxuXHRcdFx0dmFyIGxpbmsgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJyk7XHJcblx0XHRcdHBhZ2VJdGVtLmNsYXNzTmFtZSA9ICdwYWdlLWl0ZW0nO1xyXG5cdFx0XHRsaW5rLmNsYXNzTmFtZSA9ICdwYWdlLWxpbmsnO1xyXG5cdFx0XHRsaW5rLnNldEF0dHJpYnV0ZSgnaHJlZicsICc/cGFnZT0nKyBpKTtcclxuXHRcdFx0bGluay5zZXRBdHRyaWJ1dGUoJ2RhdGEtcGFnZS1ucicsIGkpO1xyXG5cdFx0XHRsaW5rLmlubmVySFRNTCA9IGk7XHJcblx0XHRcdHBhZ2VJdGVtLmFwcGVuZENoaWxkKGxpbmspO1xyXG5cdFx0XHRwYWdlcy5wdXNoKHBhZ2VJdGVtKTtcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gcGFnZXM7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBDcmVhdGVzIHRoZSBwcmV2aW91cyBidXR0b24gbGluay5cclxuXHQgKi9cclxuXHRjcmVhdGVQcmV2aW91c0J1dHRvbigpIFxyXG5cdHtcclxuXHRcdHZhciBsaSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJyk7XHJcblx0XHR2YXIgbGluayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKTtcclxuXHRcdHZhciBzcGFuMSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcclxuXHRcdHZhciBzcGFuMiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcclxuXHRcdFxyXG5cdFx0XHJcblx0XHRsaS5jbGFzc05hbWUgPSAncGFnZS1pdGVtJztcclxuXHRcdGxpbmsuY2xhc3NOYW1lID0gJ3BhZ2UtbGluayc7XHJcblx0XHRzcGFuMi5jbGFzc05hbWUgPSAnc3Itb25seSc7XHJcblxyXG5cdFx0bGluay5zZXRBdHRyaWJ1dGUoJ2hyZWYnLCAnJyk7XHJcblx0XHRsaW5rLnNldEF0dHJpYnV0ZSgnYXJpYS1sYWJlbCcsICdQcmV2aW91cycpO1xyXG5cdFx0c3BhbjEuc2V0QXR0cmlidXRlKCdhcmlhLWhpZGRlbicsICd0cnVlJyk7XHJcblxyXG5cdFx0c3BhbjEuaW5uZXJIVE1MID0gJyZsYXF1bzsnO1xyXG5cdFx0c3BhbjIuaW5uZXJIVE1MID0gJ1ByZXZpb3VzJztcclxuXHJcblx0XHRsaW5rLmFwcGVuZENoaWxkKHNwYW4xKTtcclxuXHRcdGxpbmsuYXBwZW5kQ2hpbGQoc3BhbjIpO1xyXG5cdFx0bGkuYXBwZW5kQ2hpbGQobGluayk7XHJcblxyXG5cdFx0cmV0dXJuIGxpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQ3JlYXRlcyB0aGUgbmV4dCBidXR0b24gbGluay5cclxuXHQgKi9cclxuXHRjcmVhdGVOZXh0QnV0dG9uKCkgXHJcblx0e1xyXG5cdFx0dmFyIGxpID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKTtcclxuXHRcdHZhciBsaW5rID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpO1xyXG5cdFx0dmFyIHNwYW4xID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xyXG5cdFx0dmFyIHNwYW4yID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xyXG5cdFx0XHJcblx0XHRsaS5jbGFzc05hbWUgPSAncGFnZS1pdGVtJztcclxuXHRcdGxpbmsuY2xhc3NOYW1lID0gJ3BhZ2UtbGluayc7XHJcblx0XHRzcGFuMi5jbGFzc05hbWUgPSAnc3Itb25seSc7XHJcblxyXG5cdFx0bGluay5zZXRBdHRyaWJ1dGUoJ2hyZWYnLCAnJyk7XHJcblx0XHRsaW5rLnNldEF0dHJpYnV0ZSgnYXJpYS1sYWJlbCcsICdOZXh0Jyk7XHJcblx0XHRzcGFuMS5zZXRBdHRyaWJ1dGUoJ2FyaWEtaGlkZGVuJywgJ3RydWUnKTtcclxuXHJcblx0XHRzcGFuMS5pbm5lckhUTUwgPSAnJnJhcXVvOyc7XHJcblx0XHRzcGFuMi5pbm5lckhUTUwgPSAnTmV4dCc7XHJcblxyXG5cdFx0bGluay5hcHBlbmRDaGlsZChzcGFuMSk7XHJcblx0XHRsaW5rLmFwcGVuZENoaWxkKHNwYW4yKTtcclxuXHRcdGxpLmFwcGVuZENoaWxkKGxpbmspO1xyXG5cclxuXHRcdHRoaXMubmV4dCA9IGxpbms7IFxyXG5cclxuXHRcdHJldHVybiBsaTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIENoZWNrcyBpZiB0aGUgZ2l2ZW4gcGFnZSBpcyBpbiByYW5nZS5cclxuXHQgKi9cclxuXHRub3RJblBhZ2VSYW5nZShwYWdlTnVtYmVyKSBcclxuXHR7XHJcblx0XHRyZXR1cm4gKHBhZ2VOdW1iZXIgPiB0aGlzLnNldHRpbmdzLnRvdGFsX3BhZ2VzIHx8IHBhZ2VOdW1iZXIgPD0gMCkgfHwgaXNOYU4ocGFnZU51bWJlcik7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBDaGFuZ2VzIHRoZSB1cmwgdG8gYSBnaXZlbiBwYWdlIG51bWJlci5cclxuXHQgKi9cclxuXHRjaGFuZ2VVcmwocGFnZU51bWJlcikgXHJcblx0e1xyXG5cdFx0cGFnZU51bWJlciA9ICBwYWdlTnVtYmVyIHx8IEdFVF9WYXJzKClbJ3BhZ2UnXTtcclxuXHRcdHdpbmRvdy5oaXN0b3J5LnJlcGxhY2VTdGF0ZSgnJywgJycsIHRoaXMudXBkYXRlVVJMUGFyYW1ldGVyKHdpbmRvdy5sb2NhdGlvbi5ocmVmLCAncGFnZScsIHBhZ2VOdW1iZXIpKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEdldCB0aGUgZ2V0IHZhcmlhYmxlcyBmcm9tIHRoZSB1cmwuXHJcblx0ICovXHJcblx0R0VUX1ZhcnMoKSBcclxuXHR7XHJcblx0XHR2YXIgdmFycyA9IHt9O1xyXG5cdFx0dmFyIHBhcnRzID0gd2luZG93LmxvY2F0aW9uLmhyZWYucmVwbGFjZSgvWz8mXSsoW149Jl0rKT0oW14mXSopL2dpLCBmdW5jdGlvbihtLCBrZXksIHZhbHVlKSB7XHJcblx0XHRcdHZhcnNba2V5XSA9IHZhbHVlO1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0cmV0dXJuIHZhcnM7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBNb2RpZmllcyB0aGUgZ2V0IHBhcmFtZXRlciBpbiB0aGUgdXJsLlxyXG5cdCAqL1xyXG5cdHVwZGF0ZVVSTFBhcmFtZXRlcih1cmwsIHBhcmFtLCBwYXJhbVZhbCkgXHJcblx0e1xyXG5cdCAgICB2YXIgbmV3QWRkaXRpb25hbFVSTCA9IFwiXCI7XHJcblx0ICAgIHZhciB0ZW1wQXJyYXkgPSB1cmwuc3BsaXQoXCI/XCIpO1xyXG5cdCAgICB2YXIgYmFzZVVSTCA9IHRlbXBBcnJheVswXTtcclxuXHQgICAgdmFyIGFkZGl0aW9uYWxVUkwgPSB0ZW1wQXJyYXlbMV07XHJcblx0ICAgIHZhciB0ZW1wID0gXCJcIjtcclxuXHJcblx0ICAgIGlmIChhZGRpdGlvbmFsVVJMKSB7XHJcblx0ICAgICAgICB0ZW1wQXJyYXkgPSBhZGRpdGlvbmFsVVJMLnNwbGl0KFwiJlwiKTtcclxuXHQgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGVtcEFycmF5Lmxlbmd0aDsgaSsrKXtcclxuXHQgICAgICAgICAgICBpZiAodGVtcEFycmF5W2ldLnNwbGl0KCc9JylbMF0gIT0gcGFyYW0pe1xyXG5cdCAgICAgICAgICAgICAgICBuZXdBZGRpdGlvbmFsVVJMICs9IHRlbXAgKyB0ZW1wQXJyYXlbaV07XHJcblx0ICAgICAgICAgICAgICAgIHRlbXAgPSBcIiZcIjtcclxuXHQgICAgICAgICAgICB9XHJcblx0ICAgICAgICB9XHJcblx0ICAgIH1cclxuXHJcblx0ICAgIHZhciByb3dzVGV4dCA9IHRlbXAgKyBcIlwiICsgcGFyYW0gKyBcIj1cIiArIHBhcmFtVmFsO1xyXG5cdCAgICByZXR1cm4gYmFzZVVSTCArIFwiP1wiICsgbmV3QWRkaXRpb25hbFVSTCArIHJvd3NUZXh0O1xyXG5cdH1cclxuXHJcblx0cmVzZXQoKSBcclxuXHR7XHJcblx0XHR0aGlzLnNldEN1cnJlbnQoMSk7XHJcblx0XHR0aGlzLmNoYW5nZVVybCgxKTtcclxuXHR9XHJcbn1cblxubGV0IGluaXRhbGl6ZWQgPSBmYWxzZTtcblxubGV0IGRlZmF1bHRTZXR0aW5ncyA9IHtcblx0Y2FydFNlc3Npb25JZDogW10sXG5cdGltcG9ydEJvb3RzdHJhcDogZmFsc2UsXG5cdGNvbXBvbmVudHM6IFsnUHJvZHVjdHMnLCAnU2VydmljZXMnLCAnRmlsdGVyJywgJ1BhZ2luYXRpb24nXVxufTtcblxuY2xhc3MgZUNvbW1lcmNlXG57XG5cdGNvbnN0cnVjdG9yKHNldHRpbmdzKVxuXHR7XG5cdFx0RXhjZXB0aW9uSGFuZGxlci5pbml0YWxpemUoKTtcblxuXHRcdGlmKHR5cGVvZiBzZXR0aW5ncyAhPSAnb2JqZWN0Jykge1xuXHRcdFx0dGhyb3cgbmV3IEludmFsaWRBcmd1bWVudEV4Y2VwdGlvbiQxO1xuXHRcdH1cblxuXHRcdHRoaXMuY29udGFpbmVyID0gbmV3IENvbnRhaW5lcjtcblx0XHR0aGlzLnNldHRpbmdzID0gQ29tbW9uLmV4dGVuZChkZWZhdWx0U2V0dGluZ3MsIHNldHRpbmdzKTtcblx0XHRcblx0XHRiaW5kQ29tcG9uZW50c0RlcGVuZGVuY2llcy5jYWxsKHRoaXMsIHNldHRpbmdzLmNvbXBvbmVudHMpO1xuXG5cdFx0aW5pdGFsaXplZCA9IHRydWU7XG5cblx0XHRyZXR1cm4gbmV3IFByb3h5KHRoaXMsIHtcblx0XHRcdGdldDogZnVuY3Rpb24odGFyZ2V0LCBvYmplY3QpIHtcblx0XHRcdFx0cmV0dXJuIHRhcmdldC5jb250YWluZXIubWFrZShvYmplY3QpO1xuXHRcdFx0fVxuXHRcdH0pO1xuXHR9XG59XG5cbi8qKlxuICogQmluZHMgY29tcG9uZW50cyBkZXBlbmRlbmNpZXMuXG4gKi9cbmZ1bmN0aW9uIGJpbmRDb21wb25lbnRzRGVwZW5kZW5jaWVzKGNvbXBvbmVudHMpIHtcblx0bGV0IGNvbnRhaW5lciA9IHRoaXMuY29udGFpbmVyO1xuXG5cdGNvbnRhaW5lci5iaW5kKCdGaWx0ZXInLCBmdW5jdGlvbigpIHtcblx0XHRyZXR1cm4gbmV3IEZpbHRlcihjb250YWluZXIpO1xuXHR9KTtcblx0XG5cdGNvbnRhaW5lci5iaW5kKCdTZXJ2aWNlcycsIGZ1bmN0aW9uKCkgeyBcblx0XHRyZXR1cm4gbmV3IFNlcnZpY2VzKGNvbnRhaW5lcik7XG5cdH0pO1xuXG5cdGNvbnRhaW5lci5iaW5kKCdQYWdpbmF0aW9uJywgZnVuY3Rpb24oKSB7XG5cdFx0cmV0dXJuIG5ldyBQYWdpbmF0aW9uKGNvbnRhaW5lcik7XG5cdH0pO1xuXG5cdGNvbnRhaW5lci5iaW5kKCdQcm9kdWN0cycsIGZ1bmN0aW9uKCkge1xuXHRcdHJldHVybiBuZXcgUHJvZHVjdHMoY29udGFpbmVyLCBjb250YWluZXIubWFrZSgnUGFnaW5hdGlvbicpKTtcblx0fSk7XG59XG5cbnJldHVybiBlQ29tbWVyY2U7XG5cbn0oKSk7XG4iXX0=
