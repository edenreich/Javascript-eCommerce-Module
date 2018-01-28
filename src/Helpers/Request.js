
import Common from '../Helpers/Common.js';
import InvalidDataStructureException from '../Exceptions/InvalidDataStructureException.js';

/**
 * @file 
 * Request class.
 *
 * Handles ajax requests POST, GET etc...
 */

/**
 * Stores the default settings.
 *
 * @var object
 */

let defaultSettings = {
	headers: {
		'Content-Type': 'application/json'
	},
	async: true
};

class Request
{
	/**
	 * - Initialize the settings object.
	 * - Initialize the xhr object.
	 *
	 * @param object | settings
	 * @return void
	 */
	constructor(settings)
	{
		this.settings = Common.extend(defaultSettings, settings);
		this.setDefaultRequestHeader();
	}

	/**
	 * Sets the default request headers.
	 *
	 * @return void
	 */
	setDefaultRequestHeader()
	{
		let header;
		let headers = this.settings.headers;
		let async = this.settings.async;
		let open = XMLHttpRequest.prototype.open;
		let setRequestHeader = XMLHttpRequest.prototype.setRequestHeader;

		XMLHttpRequest.prototype.open = function() {
			var response = open.apply(this, arguments, async);

			for (header in headers) {
				this.setRequestHeader(header, headers[header]);
			}

	  		return response;
		}
	}

	/**
	 * Makes a POST request.
	 *
	 * @param object | options
	 * @return Promise
	 */
	post(options)
	{
		let xhr = this.xhr;

		if(options.hasOwnProperty('before') && typeof options.before == 'function') {
			options.before.call(this);
		}

		return new Promise(function(resolve, reject) {
			if(typeof options !== 'object') {
				throw new Error('get expecting a json object to be passed as an argument, but '+ typeof options + ' was passed.');
			}

			options.data = options.data || {};

			if(typeof options.data !== 'object') {
				throw new Error('data property expecting a json object to be passed as an argument, but ' + typeof options.data + ' was passed.');
			}

			xhr.open('POST', options.url, true);

			xhr.responseType = options.dataType || 'json';
			xhr.timeout = options.timeout || 3000;

			xhr.onreadystatechange = function() {
			    if(this.readyState != 4 || this.status != 200) {
			    	return;
			    }
	       	
       			resolve(this.response);
       			
       			if(options.hasOwnProperty('after') && typeof options.after == 'function') {
					options.after.call(this);
				}
			};

			xhr.onerror = function(message) {
				if(options.hasOwnProperty('error') && typeof options.error == 'function') {
					options.error(message);
				}

				reject(message);
			};

			if(! options.data) {
				xhr.send(null);
			}

			var queryString = Object.keys(options.data).map(function(key) {
		            return encodeURIComponent(key) + '=' +
		                	encodeURIComponent(options.data[key]);
		        	}).join('&');

			xhr.send(queryString);
		});
	}

	/**
	 * Makes a GET ajax request.
	 * 
	 * @param object | options
	 * @return Promise
	 */
	get(options)
	{
		let xhr = new XMLHttpRequest() || new ActiveXObject("Microsoft.XMLHTTP");			

		if(options.hasOwnProperty('before') && typeof options.before == 'function') {
			options.before.call(this);
		}

		return new Promise(function(resolve, reject) {
			if(typeof options !== 'object') {
				throw new Error('get expecting a json object to be passed as an argument, but '+ typeof options + ' was passed.');
			}

			options.data = options.data || {};

			if(typeof options.data !== 'object') {
				throw new Error('data property expecting a json object to be passed as an argument, but ' + typeof options.data + ' was passed.');
			}

			xhr.open('GET', options.url, true);

			xhr.responseType = options.dataType || 'json';
			xhr.timeout = options.timeout || 3000;

			if (xhr.responseType == 'json') {
				xhr.setRequestHeader('Content-Type', 'application/json');
				xhr.setRequestHeader('Accept', 'application/json');
			}
			
			xhr.onreadystatechange = function() {
			    if(this.readyState != 4 || this.status != 200) {
			    	return;
			    }

			    let response = this.response || this.responseText; 
			    response = (xhr.responseType == 'json' && typeof response != 'object') ? JSON.parse(response) : response;
			    resolve(response);	
       			
       			if(options.hasOwnProperty('after') && typeof options.after == 'function') {
					options.after.call(this);
				}
			};

			xhr.onerror = function(message) {
				if(options.hasOwnProperty('error') && typeof options.error == 'function') {
					options.error(message);
				}

				reject(message);
			};

			if(! options.data) {
				xhr.send(null);
			}

			var queryString = Object.keys(options.data).map(function(key) {
		            return encodeURIComponent(key) + '=' +
		                	encodeURIComponent(options.data[key]);
		        	}).join('&');

			xhr.send(queryString);
		});
	}
}

export default Request;