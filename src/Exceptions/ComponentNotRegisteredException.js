
class ComponentNotRegisteredException
{
	constructor() 
	{ 
    	console.error(`${this.constructor.name}, components must be registered in order to use them`);

    	throw new Error;
    }
}

export default ComponentNotRegisteredException;