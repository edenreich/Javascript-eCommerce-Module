#!/usr/bin/env  node

const fs = require('fs');
const path = require('path');

const date = new Date;
const rootFolder = path.resolve(__dirname);
const UserRootFolder = path.resolve(__dirname, '../../');

let destination;
let hasErrors = 0;

/**
 * Loops through the users arguments.
 */
process.argv.slice(2).forEach(function(argument) {

	if (typeof(argument) == 'string' && argument.indexOf('--') >= 0) {
		
		let parts = argument.split('=');
		let option = parts[0];
		let optionValue = parts[1];

		if (option) {
			switch(option) {
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
	} else {

		let command = argument;

		if (command) {
			switch(command) {
				case 'publish':
					publishFiles();
					break;
				default:
					showInfo('Unknowen command, please refer to help using --help');
					hasErrors = 1;		
					break;
			}
		}
	}
});

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
 * Copy the bundle.js file to the user's directory.
 *
 * @return void
 */
function publishFiles() {
	if (hasErrors) {
		return;
	}

	destination = destination || 'bundle.js';
	destination = (destination[0] == '/') ? destination.substr(1) : destination;

	fs.copyFile(rootFolder + '/demo/js/bundle.min.js', UserRootFolder + '/' + destination, (err) => {
		if (err) {
			showError(err);
			return;
		}

		showSuccess('bundle.js was copied to ' + UserRootFolder + '/' + destination);
	});
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
Turbo-eCommerce version: 2.0.1 date: ${date.getDate()}-${date.getMonth()+1}-${date.getFullYear()}

\x1b[32mUsage:\x1b[0m
  turbo-ecommerce [options] [command]

\x1b[36mOptions:\x1b[0m
  --help                     Display this help message
  --destination              Choose path for your bundle.js
  
\x1b[33mCommands:\x1b[0m
  publish                    Publish the bundle.js to your project

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