
let defaultMessage = 'The event you called does not exists or you supplied wrong argument';

class BadEventCallException extends Error
{
	constructor(message) 
	{ 
		super(message || defaultMessage);
    	console.error('BadEventCallException: ' + message || defaultMessage);
    }
}

export default BadEventCallException;