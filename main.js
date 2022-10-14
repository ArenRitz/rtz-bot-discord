import { config } from "dotenv";
import { Client, GatewayIntentBits } from "discord.js";
import { REST } from "@discordjs/rest";
import { Routes } from "discord.js";
import { SlashCommandBuilder } from "@discordjs/builders";

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
  if (interaction.commandName === "order") {
    await interaction.reply({
      content: `You ordered ${interaction.options.getString(
        "food"
      )} and ${interaction.options.getString("drink")} to drink!`,
    });
  }
});

async function main() {
  const orderCommand = new SlashCommandBuilder()
    .setName("order")
    .setDescription("Order food and drink")
    .addStringOption((option) =>
      option
        .setName("food")
        .setDescription("What food would you like?")
        .setRequired(true)
        .setChoices(
          {
            name: "Pizza",
            value: "pizza",
          },
          {
            name: "Pasta",
            value: "pasta",
          },
          {
            name: "Burger",
            value: "burger",
          }
        )
    )
    .addStringOption((option) =>
      option
        .setName("drink")
        .setDescription("What drink would you like?")
        .setRequired(true)
        .setChoices(
          {
            name: "Coke",
            value: "coke",
          },
          {
            name: "Pepsi",
            value: "pepsi",
          },
          {
            name: "Sprite",
            value: "sprite",
          }
        )
    );

  const commands = [orderCommand.toJSON()];

  try {
    console.log("Started refreshing application (/) commands.");
    await rest.put(Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID), {
      body: commands,
    });

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
