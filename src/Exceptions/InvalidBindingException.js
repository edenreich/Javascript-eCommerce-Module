
let defaultMessage = 'trying to bind an already existing bound.';

class InvalidBindingException extends Error
{
	constructor() 
	{ 
    	super();
    	console.error('InvalidBindingException: ' + message || defaultMessage);
    }
}

export default InvalidBindingException;