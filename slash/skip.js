const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('skip')
        .setDescription('Skips the current song'),

        run: async ({client, interaction}) => {
            const queue = client.player.getQueue(interaction.guildId)

            if (!queue) {
                return await interaction.reply("No music is playing.")
            }

    
            const currentTrack = queue.current;

            queue.skip()
            await interaction.editReply({
                embeds: [
                    new MessageEmbed()
                        .setDescription(`Skipped **${currentTrack.title}**`)
                        .setColor("RANDOM")
                        .setThumbnail(currentTrack.thumbnail)
                ]

            })
        }
    }
    