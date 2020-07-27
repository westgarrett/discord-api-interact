module.exports = {
	name: 'ping',
	description: 'Ping! This command is used for troubleshooting.',
	guildOnly: false,
	args: false,
	optional: false,
	args_info: {none: "This command takes no arguments!"},
	aliases: [],
	cooldown: 1,
	future: "",
	execute(message) {
		message.channel.send('Pong');
	},
};

