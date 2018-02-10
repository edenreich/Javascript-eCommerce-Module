
import Url from '../Helpers/Url.js';
import DOM from '../Helpers/DOM.js';

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
		this.hash = '##';

		if (typeof history != 'undefined') {
			history.replaceState({"previous": '/'}, '', window.location.pathname);
		}

		window.addEventListener('hashchange', this.register.bind(this));
		window.addEventListener('popstate', this.register.bind(this));
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

		if (this.hashNavigation) {
			let modifiedUrl = this.hash + url + '?' + this.queryString;
			
			if (typeof event != 'undefined' && event.type == 'popstate') {
				Url.change(modifiedUrl);
			}
		}

		if (typeof event == 'undefined') {
			this.parseHttpRequest(url);
		} else {
			this.parseEvent(event, url);
		}
	}

	/**
	 * Parse the url.
	 * separate query string from url.
	 *
	 * @return url 
	 */
	parseUrl()
	{
		let url = window.location.href;

		if (Url.hasParameters(url)) {
			let parts = url.split('?');
			this.queryString = parts[1];
			url = parts[0].replace(window.location.protocol + '//' + window.location.host, '');
			this.current = url;
			
		}

		if (url.indexOf(this.hash) >= 0) {
			url = window.location.pathname.replace(this.hash, '');
		}

		if (this.hashNavigation) {
			Url.change(this.hash + url + '?' + this.queryString);
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
		this.current = url;
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
		switch(event.type)
		{
			case 'touchstart':
			case 'click':
				event.preventDefault();
				
				// basically exit, stop parsing, the user did not click a link
				if (event.target.tagName.toLowerCase() != 'a' ||
					DOM.hasClass(event.target, 'page-item') ||
					DOM.hasClass(event.target, 'page-link')) {
					return; 
				}

				// get the link href attribute, only the path segment.
				if (typeof event.target.pathname != 'undefined') {
					url = event.target.pathname;
				}

				break;
			case 'popstate':
				if (typeof event.state != 'undefined') {
					url = event.state.previous;
				}
				break;
			case 'hashchange':
				url = window.location.pathname.replace(this.hash, '');
				break;
		}

		this.container.Events.subscribe('route.dispatched', function(url) {
			if (this.hashNavigation) {
				url = this.hash + url; 
			}

			Url.change(url);
		}.bind(this));

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
					this.container.Details.hideAll();
					this.container.Details.show();
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
	 * Based on developer's configuration.
	 * attaches an hash for the navigation
	 * to prevent webserver from not finding files
	 * on page refresh.
	 * 
	 * @param bool | active
	 * @return this
	 */
	hashNavigation(active = false)
	{
		this.hashNavigation = active;

		return this;
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