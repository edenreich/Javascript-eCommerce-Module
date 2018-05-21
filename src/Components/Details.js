
// Helpers
import Url from '../Helpers/Url.js';
import Str from '../Helpers/Str.js';
import DOM from '../Helpers/DOM.js';
import Cookie from '../Helpers/Cookie.js';
import Common from '../Helpers/Common.js';

// Components
import BaseComponent from './BaseComponent.js';

// Exceptions
import InvalidCartItemException from '../Exceptions/InvalidCartItemException.js';
import InvalidArgumentException from '../Exceptions/InvalidArgumentException.js';

/**
 * The default settings of the cart.
 *
 * @var object
 */
let defaultSettings = {
	element: '.details',
	no_css: false,
};

/**
 * Stores the container object.
 *
 * @var \Core\Container
 */
let Container;

/**
 * Stores the event manager object.
 *
 * @var \Core\EventManager
 */
let EventManager;

/**
 * Stores the request object.
 *
 * @var \Helpers\Request
 */
let Http;

/**
 * @class Checkout
 *
 * Handles the checkout process.
 * payments validation, cart validation etc..
 */

class Details extends BaseComponent
{
	/**
	 * - Initialize the IoC container
	 * - Initialize the Request
	 * - Initialize the EventManager
	 * - Listen to checkout event.
	 *
	 * @param \Core\Container | container
	 * @param \Helpers\Request | http
	 * @param \Core\EventManager | eventManager
	 * @return void
	 */
	constructor(container, http, eventManager) 
	{
		super();

		Container = container;
		Http = http;
		EventManager = eventManager;
	}

	/**
	 * Sets the object by the users setting.
	 *
	 * @param object | settings
	 * @return void
	 */
	setup(settings)
	{
		if (typeof settings != 'object') {
			throw new InvalidArgumentException;
		}

		this.settings = Common.extend(defaultSettings, settings);

		document.addEventListener('DOMContentLoaded', function() {

			this.setElement(this.settings.element);
			this.hide();
			this.draw();
		}.bind(this));
	}

	/**
	 * Binds everthing to the element.
	 *
	 * @param string | selector
	 * @return void
	 */
	setElement(selector)
	{
		this.element = DOM.find(selector);

		if (this.element) {
			DOM.addClass(this.element, this.settings.class);
		}
	}

	/**
	 * Changes the url to be checkout
	 *
	 * @return void 
	 */
	changeUrl()
	{
		Url.change('checkout');
	}

	/**
	 * Add the eCommerce style tags to the DOM.
	 *
	 * @return void
	 */
	draw() 
	{
		if (DOM.find('#Turbo-eCommerce-Details')) {
			return;
		}

		if (this.settings.no_css) {
			return;
		}

		let position = (this.settings.fixed) ? 'fixed' : 'absolute';

		let css = `
			${this.settings.element} {
				width: 100%;
				min-height: 400px;
				border: 1px solid #e4e4e4;
			}
		`;
	    
	    DOM.addStyle('Turbo-eCommerce-Details', css);
	}

	/**
	 * Hides all irrelevant elements from the DOM.
	 *
	 * @return void 
	 */
	hideAll()
	{	
		Container.Components.booted.forEach(function(component) {
			if (component.constructor.name != 'Details') {
				component.hide();
			}
		});
	}
}

export default Details;
