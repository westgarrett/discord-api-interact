module.exports = {
	name: 'roleid',
	description: 'Returns the roles of either the guild or a user',
	guildOnly: true,
	args: true,
	optional: false,
	args_info: {
		all: "Finds all roles and role IDs in the guild",
		user: "Finds all role IDs for a given user",
		list_of_users: "Finds all role IDs for a list of users"
	},
	aliases: [],
	cooldown: 1,
	future: 'Update users and permissions in a mongo (or other) database, set an admin property',
	execute(message, args) {
		let output = "Done!\n";
		let handle = "";
		for (arg of args) {
			// Makes sure this works with @mentions
			if (String(arg).startsWith('!')) {
				let argMutable = String(arg).slice(1);
				handle = message.guild.members.get(argMutable).user.username;
			}
			// Outputs the names of all roles in the guild
			if (arg == "all") {
				message.guild.roles.forEach(function(roleCollection) {
					console.log(`${roleCollection.name} : ${roleCollection.id}`);
				});
			// If user is provided, outputs the role(s) of the given user.
			} else {
				if (!arg.length) {
					// pass
				} else {
					let foundBool = false;
					// Finds if the mentioned or plaintext user name/nickname matches a user in the guild, then returns an array of roles.
					message.guild.members.forEach(function(member) {
						if (member.user.username == arg || member.user.username == handle || member.nickname == arg) {
							foundBool = true;
							if (!member.roles.length) {
								console.log(`${member.user.username} : ${message.guild.roles.find(role => role.name == "@everyone").id}`);
							} else {
								idArray = [];
								member.roles.forEach(function(role) {idArray.push(role.id)})
								console.log(`${member.user.username} : ${idArray}`);
							}
						}
					});
					// If user is not in the server, outputs a declination.
					if (!foundBool && arg.length > 0) {
						output = `'${arg}' is not a member in this server. Check your spelling if you believe this is in error.`;
						message.channel.send(output);
						output = "";
					}
				}
			}
			if (arg.length > 0) {
				message.channel.send(output);
			}
		}
	},
};