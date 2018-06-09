#!bin/usr/env node

const date = new Date;

/**
 * Gives feedback to the user.
 *
 * @class FeedbackGiver 
 */
class FeedbackGiver
{
	/**
	 * Displays an error message.
	 *
	 * @param string
	 * @return void
	 */
	static showError(string) {
		console.log('\x1b[41m%s\x1b[0m', string);
	}

	/**
	 * Displays a success message.
	 *
	 * @param string
	 * @return void
	 */
	static showSuccess(string) {
		console.log('\x1b[32m%s\x1b[0m', string);
	}

	/**
	 * Displays an info message.
	 *
	 * @param string
	 * @return void
	 */
	static showInfo(string) {
		console.log('\x1b[46m%s\x1b[0m', string);	
	}

	/**
	 * Displays the help for the user.
	 *
	 * @return void 
	 */
	static showHelp() {
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
}

module.exports = FeedbackGiver;
