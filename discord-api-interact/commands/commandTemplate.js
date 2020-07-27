module.exports = {
	name: 'commandTemplate',
	description: '<description>', // Succint description of command use case
	guildOnly: false, // True if command is guild-scope only
	adminOnly: true, // True if only [admin] class can use. Recommended on troubleshooting commands.
	args: true, // if arguments are explicitly required
	optional: false, // if arguments are not explicitly required but are available
	args_info: {
		command: "Info about command", // information about each argument
		command0: "Info about command0"
	},
	aliases: ['<alias>'], // Aliases available for the command
	cooldown: 0, // An integer denoting how often a command can be called
	future: "", // Description of future adaptations or implementations of a command
	execute(message, args) {
		console.log("Command template only");
	},
};