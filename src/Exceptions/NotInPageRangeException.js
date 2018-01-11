
let defaultMessage = 'sorry, no more pages.';

class NotInPageRangeException extends Error
{
	constructor(message) 
	{ 
    	super(message || defaultMessage);
    	console.error('NotInPageRangeException: ' + message || defaultMessage);
    }
}

export default NotInPageRangeException;