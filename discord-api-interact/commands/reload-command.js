const { prefix } = require('../config.json');

module.exports = {
	name: 'reload-command',
	description: 'Reload changes on a command. For development only.',
	guildOnly: false,
	args: true,
	optional: false,
	args_info: {
		command: "The command to reload.",
		list_of_commands: "A list of commands to reload."
	},
	aliases: [],
	cooldown: 0,
	future: "",
	execute(message, args) {
		for (arg of args) {
			// Cleans up the prefix on the command if entered.
			if (String(arg).startsWith(`${prefix}`)) {
				arg = String(arg).slice(1);
			}

			const commandName = arg.toLowerCase();
			// finds the command in the command list, and if not found attempts to find the command in the command aliases.
			const command = message.client.commands.get(commandName) || message.client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

			if (!command) {
				return message.channel.send(`\`${commandName}\` is not defined, or an alias is not assigned, ${message.author}.`);
			}

			// remove the chached command file
			delete require.cache[require.resolve(`./${commandName}`)];

			// try to require the file again. This will reflect changes to the command live.
			try {
				const newCommand = require(`./${commandName}.js`);
				message.client.commands.set(newCommand.name, newCommand);
			} catch (error) {
				return message.channel.send(`\`${commandName}\` could not be reloaded. Encountered \`${error.message}\`.`);
				console.log(error);
			}
			message.channel.send(`\`${commandName}\` was reloaded.`);
		}
	},
};