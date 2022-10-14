const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('pause')
        .setDescription('Pauses the music'),

        run: async ({client, interaction}) => {
            const queue = client.player.getQueue(interaction.guildId)

            if (!queue) {
                return await interaction.reply("No music is playing.")
            }

            queue.setPaused(true)
            await interaction.editReply("Paused the music.")
        }
    }
    