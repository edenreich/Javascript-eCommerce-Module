
import ExceptionHandler from './ExceptionHandler.js';

let defaultMessage = 'The data structure is invalid';

class InvalidDataStructureException extends ExceptionHandler
{
	constructor(message = null) 
	{
		message = message || defaultMessage;
		super(message);
    	super.stackTrace(this, message);
    }
}

export default InvalidDataStructureException;