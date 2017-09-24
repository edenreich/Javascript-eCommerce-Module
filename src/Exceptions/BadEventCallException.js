
class BadEventCallException
{
	constructor() 
	{ 
    	console.error(`${this.constructor.name}, listening to a none-existing event`);

    	throw new Error;
    }
}

export default BadEventCallException;