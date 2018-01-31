
// Helpers
import Str from '../Helpers/Str.js';
import DOM from '../Helpers/DOM.js';
import Cookie from '../Helpers/Cookie.js';
import Common from '../Helpers/Common.js';

// Exceptions
import InvalidCartItemException from '../Exceptions/InvalidCartItemException.js';
import InvalidArgumentException from '../Exceptions/InvalidArgumentException.js';

/**
 * @file 
 * Cart class.
 *
 * Handles adding, removing etc... of items.
 */

/**
 * The default settings of the cart.
 *
 * @var object
 */
let defaultSettings = {
	element: '.checkout',
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


class Checkout 
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
		Container = container;
		Http = http;
		EventManager = eventManager;
		
		EventManager.subscribe('cart.checkout', function() {	
			this.hideAll();
			this.show();
		}.bind(this));	
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
		
			this.addStyleTag();
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
	 * Add the eCommerce style tags to the DOM.
	 *
	 * @return void
	 */
	addStyleTag() 
	{
		if (DOM.find('#Turbo-eCommerce-Checkout')) {
			return;
		}

		if (this.settings.no_css) {
			return;
		}

		let position = (this.settings.fixed) ? 'fixed' : 'absolute';

		let css = `
			${this.settings.element} {
				
			}
		`;
	    
	    DOM.addStyle('Turbo-eCommerce-Checkout', css);
	}

	/**
	 * Hides all irrelevant elements from the DOM.
	 *
	 * @return void 
	 */
	hideAll()
	{
		console.log(this);
		console.log(Container.instances());
	}

	/**
	 * Shows the element on the DOM.
	 *
	 * @return void 
	 */
	show()
	{
		this.element.style.display = 'block';
	}
}

export default Checkout;
