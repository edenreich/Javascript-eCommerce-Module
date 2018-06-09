#!bin/usr/env node

const date = new Date;
const path = require('path');
const fs = require('fs-extra');
const rootFolder = path.resolve(__dirname);

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
	static showError(string) 
	{
		console.log('\x1b[41m%s\x1b[0m', string);
	}

	/**
	 * Displays a success message.
	 *
	 * @param string
	 * @return void
	 */
	static showSuccess(string) 
	{
		console.log('\x1b[32m%s\x1b[0m', string);
	}

	/**
	 * Displays an info message.
	 *
	 * @param string
	 * @return void
	 */
	static showInfo(string) 
	{
		console.log('\x1b[46m%s\x1b[0m', string);	
	}

	/**
	 * Displays the help for the user.
	 *
	 * @return void 
	 */
	static showHelp() 
	{
		let template = fs.readFile(rootFolder + '/../Help/index', 'utf8', function(err, content) {
			if (err) {
				throw err;
			}

			let hr = '\u001b[36m#################################################\x1b[0m';
			let header = '\u001b[36m#\t\tTurbo-eCommerce Help\t\t#\x1b[0m';

			let currentTime = date.getDate()+'-'+date.getMonth()+'-'+date.getFullYear();
			let usageTitle = '\x1b[32mUsage\x1b[0m';
			let optionsTitle = '\x1b[36mOptions\x1b[0m';
			let commandsTitle = '\x1b[33mCommands\x1b[0m';

			content = content.replace(/\[hr\]/g, hr);
			content = content.replace(/\[header\]/g, header);
			content = content.replace(/\[current_time\]/g, currentTime);
			content = content.replace(/\[usage_title\]/g, usageTitle);
			content = content.replace(/\[options_title\]/g, optionsTitle);
			content = content.replace(/\[commands_title\]/g, commandsTitle);

			console.log(content);
		})
	}
}

module.exports = FeedbackGiver;
