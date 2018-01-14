
import ExceptionHandler from './ExceptionHandler.js';

let defaultMessage = 'In order to use components you must register them with the shop!'; 

class ComponentNotRegisteredException extends ExceptionHandler
{
	constructor(message = null) 
	{
		message = message || defaultMessage;
		super(message);
    	super.stackTrace(this, message);
    }
}

export default ComponentNotRegisteredException;