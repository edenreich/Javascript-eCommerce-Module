
import DOM from '../Helpers/DOM.js';
import Common from '../Helpers/Common.js';

import InvalidArgumentException from '../Exceptions/InvalidArgumentException.js';

/**
 * The default settings of the filter.
 */
let defaultSettings = {
	element: '.filter',
	data: {},
	class: 'col-xs-2',
	width: '',
	height: '',
};


/**
 * The Filter Object, handles the filter of the products/services.
 */
class Filter 
{
	constructor(container) 
	{
		this.setup(defaultSettings);
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
