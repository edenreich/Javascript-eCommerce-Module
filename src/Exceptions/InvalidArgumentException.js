
import ExceptionHandler from './ExceptionHandler.js';

let defaultMessage = 'an invalid argument was passed.';

class InvalidArgumentException extends ExceptionHandler
{
	constructor(message = null) 
	{
		message = message || defaultMessage;
		super(message);
    	super.stackTrace(this, message);
    }
}

export default InvalidArgumentException;