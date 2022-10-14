const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('skipto')
        .setDescription('Skips to a specific song in the queue')
        .addNumberOption(option => option.setName('tracknumber').setDescription('The song to skip to').setMinValue(1).setRequired(true)),

        run: async ({client, interaction}) => {
            const queue = client.player.getQueue(interaction.guildId)

            if (!queue) {
                return await interaction.reply("No music is playing.")
            }

            const trackNum = interaction.options.getNumber('tracknumber')
            if (trackNum > queue.tracks.length) {
                return await interaction.reply("That song is not in the queue.")
            }

            queue.skipTo(trackNum - 1)
            await interaction.editReply("Skipped to song " + trackNum)
        }
    }
    