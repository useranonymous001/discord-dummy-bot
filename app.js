require("dotenv").config();
const { ask } = require("./openAI");
const token = process.env.TOKEN;
const { searchVideoFromYoutube } = require("./play_video");
// requiring virtual clinet and gatewayIntents i.e., like a permissions to the bot
const { Client, GatewayIntentBits } = require("discord.js");

// creating a client
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds, // for all guilds
    GatewayIntentBits.GuildMessages, // for reading messages from the clients
    GatewayIntentBits.MessageContent, // for reading message contents
  ],
});

// message when bot is online
client.on("ready", () => {
  console.log("aaye sakey mah feri maidan ma. ");
});

// response from the api if the beginning of the message contains "!"
client.on("messageCreate", async (message) => {
  if (message.author.bot) return;

  try {
    if (message.content.substring(0, 1) === "#") {
      const prompt = message.content.substring(1);
      const answer = await ask(prompt);
      if (answer.typeOf !== String) {
        message.reply({
          content:
            "i cannot answer unless the owner pays some dollars for the api request",
        });
      }
      // need to add the response from the openAI after getting the right model ....
    }
  } catch (error) {
    let errMessage =
      "i cannot answer unless the owner pays some dollars for the api request";
    message.reply({
      content: errMessage,
    });
  }
});

client.on("messageCreate", async (message) => {
  const PREFIX = "!";
  if (message.author.bot) return;
  if (!message.content.startsWith(PREFIX)) return;

  const args = message.content.slice(PREFIX.length).trim().split(" ");
  const command = args[0].toLowerCase();
  if (command == "play") {
    const query = args.slice(1).join(" ");
    if (!query) {
      return message.reply({
        content: "please provide some query...",
      });
    }
    const video = await searchVideoFromYoutube(query);
    if (video) {
      const videoUrl = `https://www.youtube.com/watch?v=${video.id.videoId}`;
      message.reply({
        content: `Here's your video url: ${videoUrl}`,
      });
    } else {
      message.reply({
        content: "No results found",
      });
    }
  }
});

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === "ping") {
    await interaction.reply("pong pong !! ");
  }

  if (interaction.commandName === "create") {
    await interaction.reply(
      "Sorry, but i am not fully developed to create anything right now !!"
    );
  }
});

client.login(token);
