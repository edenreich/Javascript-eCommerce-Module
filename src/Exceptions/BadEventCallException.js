
class BadEventCallException extends Error
{
	constructor(message) 
	{ 
		super(message);
    	console.error('BadEventCallException: ' + message);
    }
}

export default BadEventCallException;