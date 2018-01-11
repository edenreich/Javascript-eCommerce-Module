
import DOM from '../Helpers/DOM.js';
import Common from '../Helpers/Common.js';

import InvalidArgumentException from '../Exceptions/InvalidArgumentException.js';

/**
 * @file 
 * Filter class.
 *
 * The Filter Object, handles the filter of the products/services.
 */

/**
 * The default settings of the filter.
 */
let defaultSettings = {
	element: '.filter',
	data: {},
	class: '',
	width: '',
	height: '',
};

/**
 * Stores the container object.
 *
 * @var \Core\Container
 */
let Container;

class Filter 
{
	/**
	 * - Initialize the IoC container.
	 *
	 * @param \Core\Container | container
	 * @return void
	 */
	constructor(container) 
	{
		Container = container;
	}

	/**
	 * Setup the filter class.
	 *
	 * @param object | settings
	 * @return void
	 */
	setup(settings)
	{
		if(typeof settings != 'object') {
			throw new InvalidArgumentException;
		}

		this.settings = Common.extend(defaultSettings, settings);

		this.setElement(this.settings.element);
	}

	/**
	 * Sets the element to be bound to.
	 *
	 * @param string | selector
	 * @return void
	 */
	setElement(selector)
	{
		this.wrapper = DOM.find(selector);
		
		DOM.addClass(this.wrapper, this.settings.class);
	}
}

export default Filter;
