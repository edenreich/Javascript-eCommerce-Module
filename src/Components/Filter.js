
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
	class: '',
	width: '',
	height: '',
	no_css: false,
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

		document.addEventListener('DOMContentLoaded', function() {

			this.setElement(this.settings.element);

			this.addStyleTag();	
		}.bind(this));
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

	/**
	 * Add the eCommerce style tags to the DOM.
	 */
	addStyleTag() 
	{
		if (DOM.find('#Turbo-eCommerce-Filter')) {
			return;
		}

		if (this.settings.no_css) {
			return;
		}

		let width = (this.settings.width) ? 'width:' + this.settings.width + ';' : '';
		let minWidth = this.settings.min_width || '200px';
		let height = this.settings.height || 'auto';

		let css = `
			${this.settings.element} {
				position: relative;
				margin: 5px 5px;
				border: 1px solid #e4e4e4;
				${width}
				min-width: ${minWidth};
				height: ${height};
				min-height: 200px;
				color: #ffffff;
				overflow: hidden;
			}

		`;
	    
	    DOM.addStyle('Turbo-eCommerce-Filter', css);
	}
}

export default Filter;
