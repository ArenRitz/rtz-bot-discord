import { config } from "dotenv";
import { Client, GatewayIntentBits } from "discord.js";
import { REST } from "@discordjs/rest";
import { Routes } from "discord.js";
config();

const CLIENT_ID = process.env.CLIENT_ID;
const GUILD_ID = process.env.GUILD_ID;
const TOKEN = process.env.TOKEN;


const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildVoiceStates,
  ],
});

const rest = new REST({ version: "10" }).setToken(TOKEN);




// when the bot starts up
client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});


client.on("interactionCreate", async (interaction) => {
    if (!interaction.isCommand()) return;
    if (interaction.commandName === "ping") {
        console.log(interaction.type);
         
        await interaction.reply({content: "Pong!"});
    }



});




async function main() {
    const commands = [{
        name: "ping",
        description: "Replies with Pong!",
    }];

    try {
        console.log("Started refreshing application (/) commands.");
        await rest.put(Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID), { body: commands });


        client.login(TOKEN);
    } catch (error) {

        console.error(error);
    }
}

main();






// client.on("messageCreate", (message) => {
//   //react to messages
//   if (
//     message.content === "are we alone" ||
//     message.content === "Are we alone" ||
//     message.content === "Are We Alone" ||
//     message.content === "are we alone?" ||
//     message.content === "Are we alone?" ||
//     message.content === "Are We Alone?"
//   ) {
//     message.reply("no");
//     message.react("👀");
//   }
// });


