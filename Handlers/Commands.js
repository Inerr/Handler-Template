const { Client } = require('discord.js');
const { promisify } = require('util');
const { glob } = require('glob');
const PG = promisify(glob);
const Ascii = require('ascii-table');

/**
 * @param {Client} client
 */
module.exports = async (client) => {
    const Table = new Ascii("Comandos cargados");

    CommandsArray = [];

    (await PG(`${process.cwd()}/Commands/*/*.js`)).map(async (file) => {
        const command = require(file);

        if(!command.name)
        return Table.addRow(file.split('/')[7], '🔸 Fallido', 'Falta el nombre.');

        if(command.type !== 'USER' && !command.description)
        return Table.addRow(command.name, '🔸 Fallido', 'Falta la descripción.');

        if(command.permission) {
            if(Perms.includes(command.permission))
            command.defaultPermission = false;
            else
            return Table.addRow(command.name, '🔸 Fallido', 'El permiso es invalido.');
        }

        client.commands.set(command.name, command)
        CommandsArray.push(command)

        await Table.addRow(command.name, '🔹 Cargado')
    });

    console.log(Table.toString())

    client.on('ready', async () => {
        client.application.commands.set(CommandsArray)
    })
}