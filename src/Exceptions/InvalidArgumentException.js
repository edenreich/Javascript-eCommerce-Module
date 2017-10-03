
class InvalidArgumentException extends Error
{
	constructor() 
	{ 
    	super();
    	console.error(`InvalidArgumentException, an invalid argument was passed.`);
    }
}

export default InvalidArgumentException;