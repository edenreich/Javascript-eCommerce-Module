
import Common from '../Helpers/Common.js';

let defaultSettings = {
	headers: {
		'Content-Type': 'application/json'
	},
	async: true
};


class Request
{
	constructor(settings)
	{
		this.xhr = new XMLHttpRequest() || new ActiveXObject("Microsoft.XMLHTTP");
		this.settings = Common.extend(defaultSettings, settings);
		this.setDefaultRequestHeader();
	}

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

	post(options)
	{
		if(typeof options !== 'object') {
			throw new Error('post expecting a json object to be passed as an argument, but '+ typeof options + ' was passed.');
		}

		if(typeof options.data !== 'object') {
			throw new Error('data property expecting a json object to be passed as an argument, but ' + typeof options.data + ' was passed.');
		}

		options.data = options.data || null;

		xhr.open('POST', options.url, true);
		xhr.setRequestHeader("Content-type", options.headers || "application/x-www-form-urlencoded");

		if(options.hasOwnProperty('before') && typeof options.before == 'function') {
			options.before();
		}

		xhr.onreadystatechange = function() {
		    if(this.readyState == 4 && this.status == 200) {
		       	if(options.hasOwnProperty('success') && typeof options.success == 'function') {
		       		options.success(JSON.parse(this.response));
		   		}
		       
		       	if(options.hasOwnProperty('after') && typeof options.after == 'function') {
		       		options.after(this.response);
		   		}
		    }
		}

		xhr.onerror = function(message, a, b) {
			if(options.hasOwnProperty('error') && typeof options.error == 'function') {
				options.error(message, a, b);
			}
		}

		if(! options.data) {
			xhr.send(null);
			return options;
		}

		var queryString = Object.keys(options.data).map(function(key) {
	            return encodeURIComponent(key) + '=' +
	                	encodeURIComponent(options.data[key]);
	        	}).join('&');

		xhr.send(queryString);

		return options;
	}

	get(options)
	{
		if(typeof options !== 'object') {
			throw new Error('get expecting a json object to be passed as an argument, but '+ typeof options + ' was passed.');
		}

		options.data = options.data || {};

		if(typeof options.data !== 'object') {
			throw new Error('data property expecting a json object to be passed as an argument, but ' + typeof options.data + ' was passed.');
		}

		this.xhr.open('GET', options.url, true);
		//xhr.setRequestHeader("Content-type", options.headers || "application/x-www-form-urlencoded");

		if(options.hasOwnProperty('before') && typeof options.before == 'function') {
			options.before();
		}

		this.xhr.onreadystatechange = function() {
		    if(this.readyState == 4 && this.status == 200) {
		       	if(options.hasOwnProperty('success') && typeof options.success == 'function') {
		       		options.success(JSON.parse(this.response));
		   		}
		       
		       	if(options.hasOwnProperty('after') && typeof options.after == 'function') {
		       		options.after(this.response);
		   		}
		    }
		}

		this.xhr.onerror = function(message) {
			if(options.hasOwnProperty('error') && typeof options.error == 'function') {
				options.error(message);
			}
		}

		if(! options.data) {
			this.xhr.send(null);
			return options;
		}

		var queryString = Object.keys(options.data).map(function(key) {
	            return encodeURIComponent(key) + '=' +
	                	encodeURIComponent(options.data[key]);
	        	}).join('&');

		this.xhr.send(queryString);

		return options;
	}
}

export default Request;