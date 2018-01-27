#!bin/usr/env node

const fs = require('fs-extra');
const path = require('path');

const date = new Date;
const rootFolder = path.resolve(__dirname);
const userRootFolder = path.resolve(__dirname, '../../');

let destination;
let hasErrors = 0;

let command;
const commands = [ 'publish', 'publish-demo' ];
const options = [ '--help', '--destination' ];

/**
 * Handles the commands.
 * 
 * @class CommandRunner
 */
class CommandRunner
{
	/**
	 * Adds option or command.
	 *
	 * @return Input
	 */
	static get input()
	{
		return Input;
	}

	/**
	 * Executes the command.
	 *
	 * @return void
	 */
	static run()
	{
		if (typeof command == 'undefined') {
			return;
		}
		
		command.call();
		command = undefined;
	}

	/**
	 * Displays the help.
	 *
	 * @return void
	 */
	static help()
	{
		showHelp();
	}
}

/**
 * Handles the command inputs.
 * 
 * @class Input
 */
class Input
{
	/**
	 * Setting the option of the user.
	 *
	 * @param string | option
	 * @return void
	 */
	static option(option)
	{
		let parts = option.split('=');
		let optionName = parts[0];
		let optionValue = parts[1];

		if (optionName) {
			switch(optionName) {
				case '--help':
					showHelp();
					break;
				case '--destination':
					setDestination(optionValue);
					break;
				default:
					showInfo('Unknowen option you can always use --help');
					hasErrors = 1;
					break;
			}
		}
	}

	/**
	 * Setting the command of the user.
	 *
	 * @param string | userCommand
	 * @return void
	 */
	static command(userCommand)
	{
		if (typeof userCommand == 'undefined') {
			return;
		}

		if (typeof command != 'undefined') {
			showError('Command already given');
			return;
		}

		if (commands.indexOf(userCommand) == -1) {
			showInfo('Unknowen command, please refer to help using --help');
			return;
		}	
		
		switch (userCommand) 
		{
			case 'publish-demo':
				command = Commands.publish.bind(this, true);
				break;
			default:
				command = Commands[userCommand];		
				break;
		}
	}
}

/**
 * Stores the commands functions.
 * 
 * @class Commands
 */
class Commands
{
	/**
	 * Publishing the files to the user directory.
	 *
	 * @param bool | withDemo
	 * @return void
	 */
	static publish(withDemo = false)
	{
		if (hasErrors) {
			return;
		}

		let source = '';

		if (withDemo) {
			source = rootFolder + '/demo';
			destination = destination || 'demo';
			destination = (destination[0] == '/') ? destination.substr(1) : destination;

			fs.copy(source, userRootFolder + '/' + destination, (err) => {
				if (err) {
					showError(err);
					return;
				}

				showSuccess('demo folder was copied to ' + userRootFolder + '/' + destination);
			});
		} else {
			source = rootFolder + '/demo/js/bundle.min.js';
			destination = destination || 'bundle.js';
			destination = (destination[0] == '/') ? destination.substr(1) : destination;
		
			fs.copyFile(source, userRootFolder + '/' + destination, (err) => {
				if (err) {
					showError(err);
					return;
				}

				showSuccess('bundle.js was copied to ' + userRootFolder + '/' + destination);
			});
		}
	}
}

/**
 * Sets the destination the user specified.
 *
 * @param string | dest
 * @return void
 */
function setDestination(dest) {
	if (dest.indexOf('.js') == -1) {
		showError('Please supply a file name with js extension!');
		hasErrors = 1;
		return;
	}

	destination = dest;
}

/**
 * Displays the help for the user.
 *
 * @return void 
 */
function showHelp() {
	let template =`\x1b[36m
#################################################
#\t\tTurbo-eCommerce Help\t\t#
#################################################
\x1b[0m
Turbo-eCommerce version: 2.0.3 date: ${date.getDate()}-${date.getMonth()+1}-${date.getFullYear()}

\x1b[32mUsage:\x1b[0m
  turbo-ecommerce [options] [command]

\x1b[36mOptions:\x1b[0m
  --help                     Display this help message
  --destination              Choose path for your bundle.js
  
\x1b[33mCommands:\x1b[0m
  publish                    Publish the bundle.js to your project
  publish-demo               Publish the bundle.js along with all the demo files.

`;

	console.log(template);
}

/**
 * Displays an error message.
 *
 * @param string
 * @return void
 */
function showError(string) {
	console.log('\x1b[41m%s\x1b[0m', string);
}

/**
 * Displays a success message.
 *
 * @param string
 * @return void
 */
function showSuccess(string) {
	console.log('\x1b[32m%s\x1b[0m', string);
}

/**
 * Displays an info message.
 *
 * @param string
 * @return void
 */
function showInfo(string) {
	console.log('\x1b[46m%s\x1b[0m', string);	
}

module.exports = CommandRunner;