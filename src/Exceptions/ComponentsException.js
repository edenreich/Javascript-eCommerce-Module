
let defaultMessage = `expecting for at least one components, but none was given, 
					 please add at least one requirement(Products, Services or/and Filter.`;

class ComponentsException extends Error
{
	constructor(message) 
	{ 
    	super(message || defaultMessage);
    	console.error('ComponentsException: ' + message || defaultMessage);
    }
}

export default ComponentsException;