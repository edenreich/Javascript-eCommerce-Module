
class InvalidBindingException extends Error
{
	constructor() 
	{ 
    	super();
    	console.error(`InvalidBindingException, trying to bind an already existing bound.`);
    }
}

export default InvalidBindingException;