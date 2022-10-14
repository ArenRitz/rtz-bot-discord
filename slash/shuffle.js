const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('shuffle')
        .setDescription('Shuffles the queue'),

        run: async ({client, interaction}) => {
            const queue = client.player.getQueue(interaction.guildId)

            if (!queue) {
                return await interaction.reply("No music is playing.")
            }

            queue.shuffle()
            await interaction.editReply(`Shuffled the queue. ${queue.tracks.length} songs.`)
        },

        
    }
