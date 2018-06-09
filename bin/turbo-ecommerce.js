#!/usr/bin/env node

const CommandlineParser = require('../src/Console/Utils/commandline-parser');
const FeedbackGiver = require('../src/Console/Utils/feedback-giver');

const args = process.argv;

CommandlineParser.defineCommands(['publish','publish-demo']);
CommandlineParser.defineOptions(['--destination']);

let command = CommandlineParser.parse(args);

if (command.inputs.help) {
	return FeedbackGiver.showHelp();
}

command.run();


