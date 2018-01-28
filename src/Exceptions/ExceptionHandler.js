
/**
 * Stores the debug level.
 *
 * @var string 
 */
let debugLevel;

class ExceptionHandler
{
	/**
	 * Setter for the debug level.
	 *
	 * @param string | level
	 * @return void
	 */
	static set setDebugLevel(level)
	{
		debugLevel = level;
	}

	/**
	 * Extended constructor, captures the
	 * stack trace.
	 *
	 * @return void
	 */
	constructor()
	{
		if (Error.captureStackTrace) {
			Error.captureStackTrace(this, this.constructor.name);
		}
	}

	/**
	 * Handles all exceptions.
	 *
	 * @param object | error | Throwen Exception Object
	 * @param string | message
	 * @return void
	 */
	stackTrace(error, message) 
	{
		this.customActions(error, message);

		switch(debugLevel)
		{
			case 'error': this.handleErrors(error, message); break;
			case 'warning': this.handleWarnings(error, message); break;
			case 'info': this.handleInfos(error, message); break;
			default: this.handleInfos(error, message); break;
		}
	}

	/**
	 * Take action for specific Exceptions.
	 *
	 * @param object | error | Throwen Exception Object
	 * @param string | message
	 * @return bool
	 */
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
}

export default ExceptionHandler;