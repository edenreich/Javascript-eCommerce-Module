
class BadEventCallException extends Error
{
	constructor() 
	{ 
		super();
    	console.error(`BadEventCallException, listening to a none-existing event.`);
    }
}

export default BadEventCallException;