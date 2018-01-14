
class ExceptionHandler
{
	constructor(message = null)
	{
		if (Error.captureStackTrace) {
			Error.captureStackTrace(this, this.constructor.name);
		}
	}

	/**
	 * Handle all the errors
	 */
	stackTrace(error, message) 
	{
		this.customActions(error, message);

		let debugLevel = TurboeCommerce.debugLevel();

		if (debugLevel == 'error') {
    		this.handleErrors(error, message);
    	} else if (debugLevel == 'warning') {
    		this.handleWarnings(error, message);	
    	} else if (debugLevel == 'info') {
    		this.handleInfos(error, message);
    	}
	}

	handleErrors(error, message)
	{
		console.error(error.constructor.name + ': ' + message);
	}

	handleWarnings(error, message)
	{
		console.warn(error.constructor.name + ': ' + message);
	}

	handleInfos(error, message)
	{
		console.info(error.constructor.name + ': ' + message);
	}

	customActions(error, message)
	{
		if (error.constructor.name == 'InvalidArgumentException') {
			// handle
		} else if (error.constructor.name == 'InvalidBindingException') {
			// handle
		} else if (error.constructor.name == 'BadEventCallException') {
			// handle
		} else if (error.constructor.name == 'ComponentsException') {
			// handle
		} else if (error.constructor.name == 'ComponentNotRegisteredException') {
			// handle
		} else if (error.constructor.name == 'NotInPageRangeException') {
			// handle
		} else {
			return false;
		}

		return false;
	}
}

export default ExceptionHandler;