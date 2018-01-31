
import ExceptionHandler from './ExceptionHandler.js';

let defaultMessage = 'Trying to bind an already existing bound.';

class InvalidBindingException extends ExceptionHandler
{
	constructor(message = null) 
	{
		message = message || defaultMessage;
		super(message);
    	super.stackTrace(this, message);
    }
}

export default InvalidBindingException;