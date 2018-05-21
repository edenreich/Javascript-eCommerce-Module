
const http = require('http');
const fs = require('fs');

/**
 * Simple class to help testing http requests.
 *
 * @class Server 
 */
class Server
{
	/**
	 * - Sets the first/index file to serve.
	 * - Sets the server.
	 *
	 * @param 
	 * @return 
	 */
	constructor(indexfile = null)
	{
		this.indexfile = process.cwd() + '/tests/' + indexfile;
		this.server = http.createServer(this.onConnection.bind(this));
	}

	/**
	 * Start listening on specific port.
	 * Im using Virtual Box so make sure
	 * your port is open or is forwarded to
	 * an open port.
	 *
	 * @param arguments
	 * @return void
	 */
	listen()
	{
		arguments[0] = arguments[0] || 6300;

		this.server.listen.apply(this.server, arguments);
		console.log('Start listening on port: ' + arguments[0]);
	}

	/**
	 * Stops listening on that port /
	 * Closing the server.
	 *
	 * @param function | callback
	 * @return void
	 */
	close(callback = null)
	{
		this.server.close(callback);
		console.log('Stop listening');
	}

	/**
	 * A http request was made.
	 *
	 * @param object | request
	 * @param object | response
	 * @return source
	 */
	onConnection(request, response)
	{  
	  	if (request.method != 'GET') {
	  		response.writeHead(404, {"Content-Type": "text/html"});
	  		response.end();
	  	}
	  	
	  	response.writeHead(200, { "Content-Type": "text/html" });
	  	
	  	fs.readFile(this.indexfile, function(err, data) {
	  		if (err) {
	  			response.statusCode = 500;
	  			response.end('Error: ' + err);
	  		}

	  		response.end(data);
	  	});
	}
}

module.exports = Server;