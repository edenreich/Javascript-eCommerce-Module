
let defaultMessage = 'The data structure is invalid';

class InvalidDataStructureException  extends Error
{
	constructor(message) 
	{ 
    	super(message || defaultMessage);
    	console.error('InvalidDataStructureException: ' + message || defaultMessage);
    }
}

export default InvalidDataStructureException;