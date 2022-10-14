const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('quit')
        .setDescription('Stops the music and leaves the voice channel'),

        run: async ({client, interaction}) => {
            const queue = client.player.getQueue(interaction.guildId)

            if (!queue) {
                return await interaction.reply("No music is playing.")
            }

            queue.destroy()
            await interaction.editReply("Stopped the music and left the voice channel.")
        }
    }
    