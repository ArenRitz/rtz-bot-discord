const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('resume')
        .setDescription('Resumes playing music'),

        run: async ({client, interaction}) => {
            const queue = client.player.getQueue(interaction.guildId)

            if (!queue) {
                return await interaction.reply("No music is playing.")
            }

            queue.setPaused(false)
            await interaction.editReply("Paused the music.")
        }
    }
    