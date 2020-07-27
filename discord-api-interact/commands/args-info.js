const { prefix } = require('../config.json');

module.exports = {
	name: 'args-info',
	description: 'Information about the arguments provided for a given command.',
	args: true,
	optional: false,
	args_info: {
		command: "Lists the arguments associated with a given command",
		list_of_commands: "Lists the arguments associated with each given command"
	},
	aliases: [],
	cooldown: 2,
	future: "Output information from an object instead of a string. Less formatting required in development.",
	execute(message, args) {
		for (arg of args) {
			var data = [];
			if (arg.length > 0) {
				if (String(arg).startsWith(`${prefix}`)) {
					arg = String(arg).slice(1);
				}
				var command = require(`./${arg}.js`);
				data.push(">>> __**Argument Information**__\n");
				data.push(`__**Command:**__ \`\`\`css\n${command.name}\`\`\``);

				var args_infoString = "";
				var args_infoArray = [];

				// Output "<command>: <Command argument description>" from args_info property
				for (const cmd in command.args_info) {
					args_infoString = `<${cmd}>: ${command.args_info[cmd]}`;
					args_infoArray.push(args_infoString);
				}

				let outputArgsInfo = () => {
					var output = "";
					for (description of args_infoArray) {
						output += "\t" + String(description) + "\n";
					}
					return output.slice(0, -1);
				}
			data.push(`**Arguments:** \`\`\`${outputArgsInfo()}\`\`\``);
			message.channel.send(data, { split: true });
			}
		}
	},
};
