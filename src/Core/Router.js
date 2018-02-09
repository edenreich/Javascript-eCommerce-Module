
import Url from '../Helpers/Url.js';

/**
 * @class Router
 *
 * Handles the client-side routing.
 */

class Router
{
	/**
	 * - Initialize the container
	 * - Initialize the routes
	 * - Attach event listeners for:
	 * click, popstate, touchstart, hashchange.
	 *
	 * @param App\Core\Container 
	 * @return void
	 */
	constructor(container)
	{
		this.local = true;
		this.container = container;
		this.routes = this.buildRoutes();
		
		if (typeof history != 'undefined') {
			history.replaceState('', '', window.location.pathname);
		}

		window.addEventListener('popstate', this.entry.bind(this));
		window.addEventListener('hashchange', this.entry.bind(this));
		window.addEventListener('touchstart', this.entry.bind(this));
		window.addEventListener('click', this.entry.bind(this));
	}

	/**
	 * Entry point for the application.
	 * from here will be decided which
	 * component should be displayed.
	 *
	 * @param object | event
	 * @return void
	 */
	entry(event)
	{
		if (typeof event != 'undefined' && event.type == 'click') {
			event.preventDefault();
		}

		if (typeof event != 'undefined' && event.type == 'click' && 
			event.target.tagName.toLowerCase() != 'a') {
			return;
		}

		let dispatchedUrl;
		let url = dispatchedUrl || window.location.pathname;
		let queryString;

		if (typeof url == 'undefined') {
			return;
		}

		if (typeof event != 'undefined' && event.type == 'popstate') {
			url = event.state.previous;
		}

		if (Url.hasParameters(url)) {
			let parts = url.split('?')[1];
			queryString = parts[1];
			url = parts[0].substring(parts[0].length-1);
		}

		if (url.indexOf('##/') != -1) {
			url = url.replace('##/', '');
		}

		if (queryString) {
			url = url + queryString;
		}

		if (typeof event != 'undefined' && typeof event.target.pathname != 'undefined') {
			url = event.target.pathname || event.target.href;
		}

		this.container.Events.subscribe('route.dispatched', function(url) {
			if (this.local) {
				url = '/client' + url;
			}

			dispatchedUrl = url;

			Url.change(url);
		}.bind(this));

		// means this is a demo.
		// for the meanwhile, @todo find a different solution
		if (this.local) {
			url = url.replace('/client', '');
		}

		this.current = url;
		this.dispatch(url);
	}

	/**
	 * Dispaches the route for a given url.
	 *
	 * @param string | url
	 * @return void
	 */
	dispatch(url)
	{
		// @todo check for parameters routes and replace fetch the value from the url.
		console.log(url);

		if (this.routes.indexOf(url) != -1) {
			switch(url)
			{
				case '/':
				case '/home':
					console.log('home');
					this.container.Products.hideAll();
					this.container.Filter.show();
					this.container.Products.show();
					this.container.Cart.show();
					this.container.Pagination.show();
					break;
				case '/checkout':
					console.log('checkout');
					this.container.Checkout.hideAll();
					this.container.Checkout.show();
					break;
				case '/info/:product':
					console.log('single product info page');
					// @todo build product info component
					break;
				default:
					console.log('default route');
					break;
			}
		} else {
			throw new Error('No matching route found!');
		}

		this.container.Events.publish('route.dispatched', url);
	}

	/**
	 * Builds the routes.
	 *
	 * @return array
	 */
	buildRoutes()
	{
		return ['/', '/home', '/checkout', '/info/:product'];
	}
}

export default Router;