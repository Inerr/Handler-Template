const {
    Client,
    Collection,
    MessageAttachment
} = require('discord.js');
const Discord = require('discord.js')
const client = new Client({
    intents: 32767
});
const {
    token
} = require('./config.json');

client.commands = new Collection()

require('./Handlers/Events')(client);
require('./Handlers/Commands')(client);

client.login(token);
