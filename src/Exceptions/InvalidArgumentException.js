
let defaultMessage = 'an invalid argument was passed.';

class InvalidArgumentException extends Error
{
	constructor(message) 
	{ 
    	super(message || defaultMessage);
    	console.error('InvalidArgumentException: ' + message || defaultMessage);
    }
}

export default InvalidArgumentException;