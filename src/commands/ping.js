const { SlashCommandBuilder } = require("discord.js");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("ping")
		.setDescription("Geeft een reply van de server!"),
	async execute(interaction) {
		return interaction.reply("Pong!");
	},
};