module.exports = {
	name: 'kill',
	description: '"Kill" the provided user.',
	guildOnly: true,
	args: true,
	optional: true,
	args_info: {
		none: "Valuable advice, maybe?",
		user: "A user in the discord server. Can be a <@!mention> or plaintext."
	},
	usage: function() {
		var cmdArray = [];
		for (cmd in this.args_info) {
			cmdArray.push(cmd);
		}
		return String(cmdArray).replace(/[\,]+/g, ", ");
	},
	aliases: [],
	cooldown: 5,
	future: "More scenarios with timings can be added",
	execute(message, args) {
		if (args.length < 1) {
			return message.channel.send(`Unbridled rage toward the void, ${message.author}? Try killing yourself!`);
		}
		if (args.length > 1) {
			return message.channel.send(`The mob of ${args.length} knaves overpowers ${message.author}.`);
		} else {
			let handle = "";
			// Makes sure this works with @mentions
			if (String(args).startsWith('!')) {
				let argMutable = String(args).slice(1);
				handle = message.guild.members.get(argMutable).user.username;
			}
			var data = [];
			let foundBool = false;
			message.guild.members.forEach(function(member) {
				if (message.author == args || message.author.username == handle  && !foundBool) {
					foundBool = true;
					return message.channel.send(`${message.author} puts a pistol to their temple. Unfortunately they fuck that up, too, and shoot their dog.`);
				} else if (member.user.username == args || member.user.username == handle && !foundBool) {
					foundBool = true;
					data.push(`${message.author} draws their weapon. It's a tiny dagger, but it will do the job. ${message.author} slowly creeps behind <@${args}>...`);
					const randInt = Math.random() * 11;
					if (randInt > 5) {
						data.push(`${message.author} plunges the shining dagger into <@${args}>'s chest!`);
					} else {
						data.push(`<@${args}> overpowers ${message.author}'s teeny tiny gamer arms and John Wick chokes them to death, spitting on their dead corpse.`);
					}
					return message.channel.send(data, { split: true});
				}
			});
			if (!foundBool) {
				// If user is not in the server, outputs a declination.
				return message.channel.send(`${args} is not a member in this server. ${message.author} rolls a natural 1 on their assassination attempt and trips on their own sword.`);
			}
		}
	}
}