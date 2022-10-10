const Discord = require("discord.js")
const { Client, GatewayIntentBits } = require('discord.js');


console.log('im working')
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages] });
// when the bot starts up
client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`)
  console.log("Bot is online!")
})

// when someone types a message
client.on("messageCreate", message => {
  // check if the message is ping
  console.log(`received message ${message.content}`)
  if (message.content === "ping") {
    // if the message is ping, reply with pong
    message.reply("pong")

  }
})

// Add bot token in the "quotes" below
client.login(process.env['DISCORD_KEY'])


