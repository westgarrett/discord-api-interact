const { prefix } = require('../config.json');

module.exports = {
	name: 'help',
	description: 'List all of my commands or info about a specific command.',
	guildOnly: false,
	args: false,
	optional: true,
	args_info: {
		none: "No <command> provided will direct message the user all available commands",
		command: "Lists the command description and usage",
		list_of_commands: "Lists command description and usage of multiple commands"
	},
	aliases: ['commands'],
	cooldown: 5,
	future: "",
	execute(message, args) {
		let data = [];
		const { commands } = message.client;

		if (!args.length) {
			data.push('Here\'s a list of all my commands:');
			data.push(`\`${commands.map(command => command.name).join(',').replace(/[\,]+/g, ", ")}\``);
			data.push(`\nYou can send \`${prefix}help [command name]\` to get info on a specific command!`);

			return message.author.send(data, { split: true }).then( () => {
				if (message.channel.type === 'dm') {
					return;
				}
				message.reply('I\'ve sent you a DM with all my commands!');
			}).catch(error => {
				console.error(`Could not send help DM to ${message.author.tag}.\n`, error);
				message.reply('it seems like I can\'t DM you!');
			});
		} else {
			for (arg of args) {
				if (String(arg).startsWith(`${prefix}`)) {
					arg = String(arg).slice(1);
				}
				const name = arg.toLowerCase();
				const command = commands.get(name) || commands.find(c => c.aliases && c.aliases.includes(name));
				function usage() {
					var cmdArray = [];
					for (cmd in command.args_info) {
						cmd = String(cmd).replace(/[\,]+/g)
						cmdArray.push(`<${cmd}>`);
					}
					return cmdArray.join(', ');
				}

				if (!command) {
					message.reply(`\`${arg}\` is not a valid command! (Yet)`);
				} else {
					data.push(">>> __**Command Help**__\n");
					data.push(`__**Command:**__ \`\`\`css\n${command.name}\`\`\``);

					if (command.description) data.push(`**Description:** ${command.description}`);
					if (command.aliases) data.push(`**Aliases:** ${(command.aliases > 0) ? command.aliases.join(', ') : 'None'}`);
					data.push(`**Optional Arguments:** ${command.optional}`);
					data.push(`**Usage:** \`${prefix}${command.name} ${usage()}\``);

					data.push(`**Cooldown:** ${command.cooldown || 3} second(s)`);

					message.channel.send(data, { split: true });
					data = [];
				}
			}
		}
	},
};
