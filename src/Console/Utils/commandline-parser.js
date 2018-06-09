#!bin/usr/env node

const Command = require('../command');
const Commands = require('../commands');
const InputRecognizer = require('./input-recognizer');

/**
 * Parse the commands.
 * 
 * @class CommandlineParser
 */
class CommandlineParser
{
	/**
	 * Setter for the args.
	 *
	 * @return Console\Utils\Command
	 */
	static parse(args)
	{
		let inputs = args.slice(2);
		let help = false;
		let command;
		let options = [];

		inputs.forEach(function(input, index) {
			var inputRecognizer = new InputRecognizer(input);
			
			if (inputRecognizer.needHelp()) {
				help = true;
			}

			if (typeof command == 'undefined' && inputRecognizer.isCommand()) {
				command = input;
			}

			if (inputRecognizer.isOption()) {
				let option = {
					name: input,
					value: inputs[index+1] || true,
				};

				options.push(option);
			}
		});

		if (typeof Commands[command] == 'undefined') {
			help = true;
		}
	
		inputs = {
			help: help,
			command: command,
			options: options
		};

		return new Command(inputs, new Commands);
	}

	/**
	 * Defines the Options.
	 *
	 * @return void
	 */
	static defineOptions(options)
	{
		if (typeof options != 'Array') {
			return;
		}
		
		options = undefined;
	}

	/**
	 * Defines the Commands.
	 *
	 * @return void
	 */
	static defineCommands(commands)
	{
		if (typeof commands != 'Array') {
			return;
		}
		
		commands = undefined;
	}
}

module.exports = CommandlineParser;
