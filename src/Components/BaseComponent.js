
/**
 * @class BaseComponent
 * 
 * Common functionallity of components. 
 */

class BaseComponent
{
	/**
	 * Hides the component from the DOM.
	 *
	 * @return void 
	 */
	hide()
	{
		if (typeof this.element != 'undefined') {
			this.element.style.display = 'none';
		}
	}

	/**
	 * Shows the element on the DOM.
	 *
	 * @return void 
	 */
	show()
	{
		if (typeof this.element != 'undefined') {
			this.element.style.display = 'block';
		}
	}

	/**
	 * Empty the component.
	 *
	 * @return void 
	 */
	empty()
	{
		if (typeof this.element != 'undefined') {
			this.element.innerHTML = '';
		}
	}
}

export default BaseComponent;