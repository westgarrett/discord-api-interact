module.exports = {
	name: 'showCollection',
	args: false,
	description: 'Returns a collection object in the console',
	execute(message, args) {
		message.guild.members.forEach(function(guildMember, guildMemberId) {
			console.log(guildMemberId, guildMember.roles);
		});
		message.channel.send('This is a message to say I\'ve finished what I\'ve started.');
	},

};
