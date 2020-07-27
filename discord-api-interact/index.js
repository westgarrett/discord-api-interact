// const moment = require('moment');
const fs = require('fs');
const Discord = require('discord.js');
const { prefix, token }  = require('./config.json');
const mongo = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';
//const fetchPins = require("./xcommands/fetchPins.js");

const admin = '';
const client = new Discord.Client();
const cooldowns = new Discord.Collection();

client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

// Add all command files to a commands client property
for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

client.events = new Discord.Collection();
const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));

// Add all event files to an events client property
for (const file of eventFiles) {
	const event = require(`./events/${file}`);
	client.events.set(event.name, event);
}

// Add a numPins property to track the number of pins present in each channel
// client.numPins = new Discord.Collection();

// Processes events when the bot is started.
client.once('ready', () => {
	console.log('Ready!');
});

// Main message loop
client.on('message', message => {
	// End call early if message doesn't start with the given prefix or a bot uses it.
	if (!message.content.startsWith(prefix) || message.author.bot) return;

	// Adjust commands to cut the prefix, extraneous spaces, and separators, then toLowerCase
	const args = message.content.slice(prefix.length).replace(/[^\w\-\!]+/g, " ").trim().split(" ");
	const commandName = args.shift().toLowerCase();
	
	// Get aliases and end call early if command does not exist
	const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

	if (!command) return;
	// console.log(message.author);
	// Check for user permissions: adminOnly
	//if (command.adminOnly) {}

	// Scope commands to guild only
	if (command.guildOnly && message.channel.type !== 'text') {
		return message.reply(`The \`${commandName}\` command is for use in a server text channel, ${message.author}!`);
	}

	// If a command takes arguments and none are provided and optional flag is not excercised, provides feedback
	if (command.args && !args.length && !command.optional) {
		let reply = `You didn't provide any arguments, ${message.author}!`;

		if (command.usage) {
			reply += `\nUse \`!help ${command.name}\` to see the proper usage.`;
		}
		return message.channel.send(reply);
	}

	// Set a cooldown flag to make sure processes can complete before a command is given again.
	if (!cooldowns.has(command.name)) {
		cooldowns.set(command.name, new Discord.Collection());
	}
	
	const now = Date.now();
	const timestamps = cooldowns.get(command.name);
	const cooldownAmount = (command.cooldown || 3) * 1000;

	if (timestamps.has(message.author.id)) {
		const expirationTime = timestamps.get(message.author.id) + cooldownAmount;
		
		if (now < expirationTime) {
			const timeLeft = (expirationTime - now) / 1000;
			return message.reply(`Please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.name}\` command.`); 
		}
	}
	
	try {
		command.execute(message, args);
	} catch (error) {
		console.error(error);
		message.reply('There was an error executing that command');
	}
});


client.on("channelPinsUpdate", pinChannel => {
	const currentTime = Date.now();
	// Makes sure there are pins in the channel. If not, has a different output.
	if (pinChannel.lastPinAt) {
		const lastPinTime = pinChannel.lastPinAt
		console.log(`The code below should output based on if ${currentTime - lastPinTime} is less than 300ms.`);
		// Decide if the pin is being removed or not because apparently that isn't an option in discord.js
		if (currentTime - lastPinTime < 300) {
			pinChannel.send(`Is that black ice?`);
		} else {
			pinChannel.send(`Don't get rid of the black ice!`);
		}
	} else {
		pinChannel.send(`We don't have any black ice? What is this, a pussy menagerie?`);
	}
});

client.login(token);