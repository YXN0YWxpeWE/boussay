const { Client, IntentsBitField } = require("discord.js");
const myIntents = new IntentsBitField();
myIntents.add(IntentsBitField.Flags.GuildPresences, IntentsBitField.Flags.GuildMembers, IntentsBitField.Flags.Guilds);
const client = new Client({ intents: myIntents });
const fs = require("fs");
const path = require("path");
const config = JSON.parse(fs.readFileSync(path.join(__dirname, "..", "Config", "config.json")).toString());

const log = require("../structs/log.js");

client.once("ready", () => {
    log.bot("Bot is up and running!");

    let commands = client.application.commands;

    fs.readdirSync("./DiscordBot/commands").forEach(fileName => {
        const command = require(`./commands/${fileName}`);

        commands.create(command.commandInfo);
    });
});

client.on("interactionCreate", interaction => {
    if (fs.existsSync(`./DiscordBot/commands/${interaction.commandName}.js`)) {
        require(`./commands/${interaction.commandName}.js`).execute(interaction);
    }
});

client.login(config.discord.bot_token);