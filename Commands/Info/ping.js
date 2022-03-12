const {
    CommandInteraction,
    Client
} = require('discord.js')

module.exports = {
    name: 'ping',
    description: 'Responde con el ping del bot',
    /**
     * @param {CommandInteraction} interaction
     * @param {Client} client
     */
    execute(interaction, client) {
        interaction.reply({ content: `Mi ping es \`${client.ws.ping}ms\`` })
    }
}