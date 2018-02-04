
// Components
import Cart from '../Components/Cart.js';
import Filter from '../Components/Filter.js';
import Checkout from '../Components/Checkout.js';
import Products from '../Components/Products.js';
import Services from '../Components/Services.js';
import Pagination from '../Components/Pagination.js';

// Helpers
import Common from '../Helpers/Common.js';

// Exceptions
import ComponentNotRegisteredException from '../Exceptions/ComponentNotRegisteredException.js';

class ComponentsProvider
{
	/**
	 * - Set the container as a member.
	 * - declare the components.
	 *
	 * @param \Core\Container | container
	 * @return void
	 */
	constructor(container)
	{
		this.container = container;

		this.components = {};
		this.components.Filter = {};
		this.components.Services = {};
		this.components.Products = {};
		this.components.Pagination = {};
		this.components.Cart = {};
		this.components.Checkout = {};
	}

   /**
	* Registers the components.
	*
	* @param object | components
	* @return void
	*/
	register(components)
	{
		this.available = components;
		this.booted = [];
	 	this.components.Filter.booted = false;
		this.components.Services.booted = false;
		this.components.Products.booted = false;
		this.components.Pagination.booted = false;
		this.components.Cart.booted = false;
		this.components.Checkout.booted = false;

		let instance = this;

		this.container.bind('Filter', function(container, component) {
			instance.components[component] = new Filter(container);
			instance.components[component].booted = true;
			instance.booted.push(instance.components[component]);
			return instance.components[component];
		}, 'components');
		
		this.container.bind('Services', function(container, component) { 
			instance.components[component] = new Services(container);
			instance.components[component].booted = true;
			instance.booted.push(instance.components[component]);
			return instance.components[component];
		}, 'components');

		this.container.bind('Products', function(container, component) {
			instance.components[component] = new Products(container, container.Request, container.Events);
			instance.components[component].booted = true;
			instance.booted.push(instance.components[component]);
			return instance.components[component];
		}, 'components');

		this.container.bind('Pagination', function(container, component) {
			let products = (instance.exists('Products')) ? (instance.components['Products']) : null; 
			let services = (instance.exists('Services')) ? (instance.components['Services']) : null; 
			instance.components[component] = new Pagination(container, container.Events, products, services);
			instance.components[component].booted = true;
			instance.booted.push(instance.components[component]);
			return instance.components[component];
		}, 'components');

		this.container.bind('Cart', function(container, component) {
			instance.components[component] = new Cart(container, container.Request, container.Events);
			instance.components[component].booted = true;
			instance.booted.push(instance.components[component]);
			return instance.components[component];
		}, 'components');

		this.container.bind('Checkout', function(container, component) {
			instance.components[component] = new Checkout(container, container.Request, container.Events);
			instance.components[component].booted = true;
			instance.booted.push(instance.components[component]);
			return instance.components[component];
		}, 'components');
	}

	/**
	 * Provide a registered component.
	 *
	 * @param string | component
	 * @return object
	 */
	provide(component)
	{
		if (Common.in_array(component, this.available)) {
			return this.container.make(component);
		}

		throw new ComponentNotRegisteredException('components must be registered in order to use them.');
	}

	/**
	 * Checks if component exists.
	 *
	 * @param string | name
	 * @return bool
	 */
	exists(name)
	{
		return this.components.hasOwnProperty(name);
	}
}

export default ComponentsProvider;