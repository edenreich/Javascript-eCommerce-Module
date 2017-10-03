
class ComponentNotRegisteredException extends Error
{
	constructor() 
	{ 
    	super();
    	console.error(`ComponentNotRegisteredException, components must be registered in order to use them.`);
    }
}

export default ComponentNotRegisteredException;