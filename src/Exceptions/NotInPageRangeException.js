
class NotInPageRangeException extends Error
{
	constructor() 
	{ 
    	super();
    	console.error(`NotInPageRangeException, sorry, no more pages.`);
    }
}

export default NotInPageRangeException;