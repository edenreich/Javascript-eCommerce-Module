
let defaultMessage = 'In order to use components you must register them with the shop!'; 

class ComponentNotRegisteredException extends Error
{
	constructor(message) 
	{ 
    	super();
    	console.error('ComponentNotRegisteredException: ' + message || defaultMessage);
    }
}

export default ComponentNotRegisteredException;