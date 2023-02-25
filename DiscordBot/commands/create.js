const { MessageEmbed } = require("discord.js");
const { EmbedBuilder } = require('discord.js');
const functions = require("../../structs/functions.js");

module.exports = {
    commandInfo: {
        name: "create",
        description: "Creates an account on Lawin.",
        options: [
            {
                name: "email",
                description: "Your email.",
                required: true,
                type: 3 // string
            },
            {
                name: "username",
                description: "Your username.",
                required: true,
                type: 3
            },
            {
                name: "password",
                description: "Your password.",
                required: true,
                type: 3
            }
        ],
    },
    execute: async (interaction) => {
        const { options } = interaction;

        const discordId = interaction.user.id;
        const email = options.get("email").value;
        const username = options.get("username").value;
        const password = options.get("password").value;

        await functions.registerUser(discordId, username, email, password).then(resp => {
            if (resp.status >= 400) {
                const embed = new EmbedBuilder()
                .setColor("#ff0000")
                .setAuthor({ name: interaction.user.tag, iconURL: interaction.user.avatarURL() })
                .setFields(
                    { name: 'Message', value: resp.message }
                )
                .setTimestamp()
    
                return interaction.reply({ embeds: [embed], ephemeral: true })
            }

            const embed2 = new EmbedBuilder()
            .setColor("#56ff00")
            .setAuthor({ name: interaction.user.tag, iconURL: interaction.user.avatarURL() })
            .setFields(
                { name: 'Message', value: resp.message },
            )
            .setTimestamp()

            interaction.channel.send({ embeds: [embed2] });
            interaction.reply({ content: "You successfully created an account!", ephemeral: true })
        })
    }
}