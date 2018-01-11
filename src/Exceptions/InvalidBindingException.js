
let defaultMessage = 'trying to bind an already existing bound.';

class InvalidBindingException extends Error
{
	constructor(message) 
	{ 
    	super(message || defaultMessage);
    	console.error('InvalidBindingException: ' + message || defaultMessage);
    }
}

export default InvalidBindingException;