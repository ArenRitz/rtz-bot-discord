const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('queue')
        .setDescription('Shows the current queue')
        .addNumberOption((option) => option.setName("page").setDescription("The page to show").setMinValue(1)),

        run: async ({client, interaction}) => {
            const queue = client.player.getQueue(interaction.guildId)
            if (!queue || !queue.playing) {
                return await interaction.reply("No music is playing.")
            }
            const totalPages = Math.ceil(queue.tracks.length / 10) || 1
            const page = (interaction.options.getNumber('page') || 1) - 1

            if (page > totalPages) {
                return await interaction.reply(`The page must be less than ${totalPages}`)
            }

            const queueString = queue.tracks.slice(page * 10, page * 10 + 10).map((song, i) => {
                return `${page * 10 + i + 1}. \`[${song.title}]\`(${song.url}) - ${song.duration}`
            })

            const currentSong = queue.current

            await interaction.editReply({
                embeds: [
                    new MessageEmbed()
                        .setDescription(`Now Playing: ` + (currentSong ? `\`${currentSong.title}\`` : "None" + "\n\n" + queueString.join("\n")))
                        .setColor("RANDOM")
                        .setFooter({
                            text: `Page ${page + 1} of ${totalPages}`
                        })
                        .setThumbnail(currentSong.thumbnail)
                ]
            })


        }
    }
