const { SlashCommandBuilder } = require('@discordjs/builders');


module.exports = {
    data: new SlashCommandBuilder()
        .setName('info')
        .setDescription('Shows info about the current song'),
    run: async ({client, interaction}) => {
        const queue = client.player.getQueue(interaction.guildId)
        if (!queue) {
            return await interaction.reply("No music is playing.")
        }
        let bar = client.player.createProgressBar({
            queue: queue,
            length: 19,
        })

        const song = queue.current

        await interaction.editReply({
            embeds: [new MessageEmbed()
                .setThumbnail(song.thumbnail)
                .setColor("RANDOM")
                .setDescription(`Now Playing: \`${song.title}\`\n\n${bar}\n\n${song.duration} - ${song.requestedBy}`)
            ]
        })

    }


    }
