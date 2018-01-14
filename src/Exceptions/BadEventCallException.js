
import ExceptionHandler from './ExceptionHandler.js';

let defaultMessage = 'The event you called does not exists or you supplied wrong argument';

class BadEventCallException extends ExceptionHandler
{
	constructor(message = null) 
	{
		message = message || defaultMessage;
		super(message);
    	super.stackTrace(this, message);
    }
}

export default BadEventCallException;