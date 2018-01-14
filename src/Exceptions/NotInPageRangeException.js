
import ExceptionHandler from './ExceptionHandler.js';

let defaultMessage = 'sorry, no more pages.';

class NotInPageRangeException extends ExceptionHandler
{
	constructor(message = null) 
	{
		message = message || defaultMessage;
		super();
    	super.stackTrace(this, message);
    }
}

export default NotInPageRangeException;