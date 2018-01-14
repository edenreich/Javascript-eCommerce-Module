
import ExceptionHandler from './ExceptionHandler.js';

let defaultMessage = `expecting for at least one components, but none was given, 
					 please add at least one requirement(Products, Services or/and Filter.`;

class ComponentsException extends ExceptionHandler
{
	constructor(message = null) 
	{
		message = message || defaultMessage;
		super(message);
    	super.stackTrace(this, message);
    }
}

export default ComponentsException;