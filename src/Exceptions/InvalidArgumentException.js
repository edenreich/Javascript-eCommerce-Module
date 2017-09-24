
class InvalidArgumentException
{
	constructor() 
	{ 
    	console.error(`${this.constructor.name}, passing invalid arguments.`);

    	throw new Error;
    }
}

export default InvalidArgumentException;