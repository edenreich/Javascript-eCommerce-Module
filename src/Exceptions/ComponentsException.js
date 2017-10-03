
class ComponentsException extends Error
{
	constructor() 
	{ 
    	super();
    	console.error(`ComponentsException, expecting for at least one components, but none was given, 
								please add at least one requirement(Products, Services or/and Filter.`);
    }
}

export default ComponentsException;