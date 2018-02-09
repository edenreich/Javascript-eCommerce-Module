
import DOM from './DOM.js';

class Url
{
	 static processAjaxData(selector, content, urlPath)
	 {
	    let context = DOM.find(selector);

	    context.innerHTML = content;
	    let title = DOM.find('title', context);
	    document.title = title.innerHTML;
	    window.history.pushState({"html":content,"pageTitle": title.innerHTML}, "", urlPath);
	 }

	/**
	 * Modifies the get parameter in the url.
	 *
	 * @param string | url
	 * @param string | key
	 * @param number | value
	 * @param string | separator
	 * @return string
	 */
	static changeQueryParameterValue(url, key, value, separator = '=') 
	{
		let regExp = new RegExp("([?&])" + key + separator + ".*?(&|$)", "i");
		let pairSeparator = url.indexOf('?') !== -1 ? "&" : "?";
		  
		if (url.match(regExp)) {
			return url.replace(regExp, '$1' + key + separator + value + '$2');
		} else {
		    return url + pairSeparator + key + separator + value;
		}
	}

	/**
	 * Changes the url to a given page number.
	 *
	 * @param string | parameterKey
	 * @param string | parameterValue
	 * @param string | separator
	 * @return void
	 */
	static changeParameter(parameterKey, parameterValue, separator = '=')
	{
		parameterValue =  parameterValue || this.queryString()[parameterKey];
		let requestedUrl = this.changeQueryParameterValue(window.location.href, parameterKey, parameterValue, separator);
		window.history.replaceState('', '', requestedUrl);
	}

	/**
	 * Changes the url.
	 *
	 * @param string | url
	 * @return void
	 */
	static change(url)
	{
		if (url.charAt(0) != '/') {
			url = '/' + url;
		}

		if (url == '/') {
			url = '/home';
		}

		let previousUrl = window.location.pathname;
		
		window.history.pushState({"previous": previousUrl}, '', url);
	}

	/**
	 * Get the get variables from the url.
	 *
	 * @return array
	 */
	static queryString() 
	{
		let vars = {};
		let parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m, key, value) {
			vars[key] = value;
		});

		return vars;
	}

	/**
	 * Checks if a given url have parameters.
	 *
	 * @param string | url
	 * @return bool
	 */
	static hasParameters(url)
	{
		return url.indexOf('?') >= 0;
	}


}

export default Url;