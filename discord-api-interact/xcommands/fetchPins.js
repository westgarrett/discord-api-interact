const axios = require('axios');
const { prefix, token }  = require('../config.json');
const package = require('../package.json')
// Reference: https://discordapp.com/developers/docs/resources/channel#get-pinned-messages

async function fetchPins(channelID) {
	console.log(`Fetching an array of pins from ${channelID}`);
	const url = `https://discordapp.com/api/channels/${channelID}/pins`;
	get_request = await axios.request({
		method: 'GET',
		url: `${url}`,
		headers: {
			Authorization: `Bot ${token}`,
			'User-Agent': `${package.name}/${package.version}`, //User-Agent: DiscordBot ($url, $versionNumber)
			'Content-Type': 'application/json'
		}
	});

	// An array of pin objects
	const pins = get_request.data;

	// Return array of pin objects as Promise
	return pins;
}

Object.freeze(fetchPins);

module.exports = {
	fetchPins
}

// Future functionality
/*	for (const channel of client.channels) {
		if (channel[1].type == "text") {
			console.log(channel[1].name);
			var channelID = channel[0];
			fetchPins.fetchPins(channelID).then(pins => client.numPins.set({channelID, pins}));
		}
	}
*/


/* get_request.data format:
[
  {
    id: '679453933047119872',
    type: 0,
    content: 'string!',
    channel_id: '550062325638365201',
    author: {
      id: '671956650491379722',
      username: 'discord-api-interact',
      avatar: null,
      discriminator: '0899',
      bot: true
    },
    attachments: [],
    embeds: [],
    mentions: [],
    mention_roles: [],
    pinned: true,
    mention_everyone: false,
    tts: false,
    timestamp: '2020-02-18T22:27:21.282000+00:00',
    edited_timestamp: null,
    flags: 0
  }
]
*/