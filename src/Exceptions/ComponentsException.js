
class ComponentsException
{
	constructor() 
	{ 
    	console.error(`${this.constructor.name}, expecting for at least one components, but none was given, 
								please add at least one requirement(Products, Services or/and Filter`);

    	throw new Error;
    }
}

export default ComponentsException;