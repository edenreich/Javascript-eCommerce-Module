#!/usr/bin/env  node

const CommandRunner = require('./command-runner');
let args = process.argv.slice(2); // ignore first 2 parameters (node cli.js)


if (args.length == 0) {
	CommandRunner.help();
}


/**
 * Loops through the users arguments.
 */
args.forEach(function(argument, index) {

	if (typeof(argument) == 'string' && argument.indexOf('--') >= 0) {

		CommandRunner.input.option(argument);
	} else {
		CommandRunner.input.command(argument);
	}

	// If there are no more argument trigger the command.
	if (args.length-1 == index) {
		CommandRunner.run();
	}
});