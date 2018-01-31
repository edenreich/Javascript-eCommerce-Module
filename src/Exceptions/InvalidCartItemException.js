
import ExceptionHandler from './ExceptionHandler.js';

let defaultMessage = 'The item you are trying to add must contain a unique id';

class InvalidCartItemException extends ExceptionHandler
{
	constructor(message = null) 
	{
		message = message || defaultMessage;
		super(message);
    	super.stackTrace(this, message);
    }
}

export default InvalidCartItemException;