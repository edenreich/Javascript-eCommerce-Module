
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
		this.container = container;
		this.routes = this.buildRoutes();
		
		if (typeof history != 'undefined') {
			history.replaceState('', '', window.location.pathname);
		}

		window.addEventListener('popstate', this.register.bind(this));
		window.addEventListener('hashchange', this.register.bind(this));
		window.addEventListener('touchstart', this.register.bind(this));
		window.addEventListener('click', this.register.bind(this));
	}

	/**
	 * Entry point for the application.
	 * from here will be decided which
	 * component should be displayed.
	 *
	 * @param object | event
	 * @return void
	 */
	register(event)
	{
		let url = this.parseUrl();

		if (typeof event == 'undefined') {
			this.parseHttpRequest(url);
		} else {
			this.parseEvent(event, url);
		}
	}

	parseUrl()
	{
		let url = window.location.href;

		if (Url.hasParameters(url)) {
			this.queryString = url.split('?')[1];
			url = window.location.pathname;
		}

		if (url.indexOf('##/') >= 0) {
			url = url.replace('##/', '');
		}

		return url;
	}

	/**
	 * Parse a full http comming request.
	 *
	 * @param string | url
	 * @return void
	 */
	parseHttpRequest(url)
	{
		this.dispatch(url);
	}

	/**
	 * Parse a request happens by triggered event.
	 *
	 * @param string | url
	 * @return void
	 */
	parseEvent(event, url)
	{
		this.container.Events.subscribe('route.dispatched', function(url) {
			Url.change(url);
		}.bind(this));

		switch(event.type)
		{
			case 'touchstart':
			case 'click':
				event.preventDefault();
				
				// basically exit, stop parsing, the user did not click a link
				if (event.target.tagName.toLowerCase() != 'a') {
					return; 
				}

				// get the link href attribute, only the path segment.
				if (typeof event.target.pathname != 'undefined') {
					url = event.target.pathname;
				}

				break;
			case 'popstate':
				url = event.state.previous;
				break;
			case 'hashchange':

				break;
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