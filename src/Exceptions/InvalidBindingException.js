
class InvalidBindingException
{
	constructor() 
	{ 
    	console.error(`${this.constructor.name}, trying to bind an already existing bound.`);

    	throw new Error;
    }
}

export default InvalidBindingException;