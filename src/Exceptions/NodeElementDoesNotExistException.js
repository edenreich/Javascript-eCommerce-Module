
class NodeElementDoesNotExistException
{
	constructor() 
	{ 
    	console.error(`${this.constructor.name}, trying to fetch an none-existing element from the DOM`);

    	throw new Error;
    }
}

export default NodeElementDoesNotExistException;