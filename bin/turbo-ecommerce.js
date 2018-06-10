#!bin/usr/env node

const CommandlineParser = require('edenreich-commandline-parser');
const args = process.argv;

// Configure the Application.
const config = {
  handler: 'src/Console/commands',
  labels: {
    application_name: "Turbo-eCommerce Help",
    application_filename: "turbo-ecommerce",
    application_version: "1.0.0"
  },
  commands: [{
    name: "publish",
    description: "publish the minified files",
    options: [{
      name: "--destination",
      description: "to specifc destination"
    },
    {
      name: "--with-demo",
      description: "with demo files"
    }]
  }]
};

let cliParser = new CommandlineParser(config);

// Parse the arguments.
let command = cliParser.parse(args);

// Execute the command.
if (command.requestedForHelp()) {
  cliParser.showHelp('index');
} else {
  command.execute();
}