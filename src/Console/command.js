#!bin/usr/env node

const Commands = require('./commands');

/**
 * Stores a command.
 * 
 * @class Command
 */
class Command
{
	/**
	 * Initialize the parsed inputs.
	 *
	 * @return void
	 */
	constructor(parsedInputs, commands)
	{
		this.inputs = parsedInputs;
		this.commands = commands;
	}

	/**
	 * Executes the command.
	 *
	 * @return void
	 */
	run()
	{
		if (typeof Commands[this.inputs.command] != 'undefined') {
			
			Commands[this.inputs.command].call(this.commands, this.inputs.options);
		}
	}
}

module.exports = Command;
