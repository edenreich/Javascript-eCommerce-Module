
import DOM from '../Helpers/DOM.js';
import Common from '../Helpers/Common.js';

import InvalidArgumentException from '../Exceptions/InvalidArgumentException.js';

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
 */
let Container;

/**
 * The Filter Object, handles the filter of the products/services.
 */
class Filter 
{
	constructor(container) 
	{
		Container = container;
	}

	setup(settings)
	{
		if(typeof settings != 'object') {
			throw new InvalidArgumentException;
		}

		this.settings = Common.extend(defaultSettings, settings);

		this.setElement(this.settings.element);
	}

	setElement(selector)
	{
		this.wrapper = DOM.element(selector);
		
		DOM.addClass(this.wrapper, this.settings.class);
	}
}

export default Filter;
