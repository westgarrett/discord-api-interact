const {prefix, token} = require('../config.json');
const execSync = require('child_process').execSync;

module.exports = {
	name: 'reset',
	description: 'Reset the discord bot',
	arguments: false,
	optional: false,
	execute(message) {
		// Resets the bot automatically
		message.channel.send("Resetting bot...");
		//var output = execSync('node index.js');
		//console.log(output);
		message.channel.send("Done!");
	}
}