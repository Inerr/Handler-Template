const {
    Client,
    CommandInteraction,
    MessageEmbed
} = require('discord.js');

module.exports = {
    name: 'interactionCreate',
    /**
     * 
     * @param {CommandInteraction} interaction 
     * @param {Client} client 
     */
    async execute(interaction, client) {
        if (interaction.isCommand()) {
            const command = client.commands.get(interaction.commandName)
            if (!interaction.member.permissions.has(command.permissions || [])) return interaction.reply({
                embeds: [
                    new MessageEmbed()
                    .setDescription(`<:error:949438822360420362> No tienes permisos para ejecutar este comando\nPermiso requerido: \`${command.permissions}\``)
                    .setColor('RED')
                ],
                ephemeral: true
            })
            if (!command) return interaction.reply({
                embeds: [
                    new MessageEmbed()
                    .setColor('RED')
                    .setDescription('<:error:949438822360420362> Ocurrio un error al ejecutar este comando.')
                ],
                ephemeral: true
            }) && client.commands.delete(interaction.commandName);

            command.execute(interaction, client)
        }
    }
}