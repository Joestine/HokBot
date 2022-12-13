const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("hok")
		.setDescription("Check of het Syntaxis Hok open is!"),

	execute: async function (interaction) {
		const url = "https://beheer.syntaxis.nl/api/ishethokalopen";
		const settings = { method: "Get" };
		let desc = "";
		let imgurl = "";
		fetch(url, settings)
			.then((res) => res.json())
			.then((json) => {
				desc = "Het hok is open! Tijd voor Koffie! ☕\r\n";
				imgurl = "https://img.freepik.com/vrije-vector/leuke-happy-coffee-cup-cartoon-vectorillustratie-pictogram-drinken-karakter-pictogram-concept-platte-cartoon-stijl_138676-2587.jpg?w=2000";

				const date = new Date();
				if (
					!json.payload.open ||
					date.getHours() >= 22 ||
					(date.getHours() >= 17 &&
						date.getMinutes() >= 30 &&
						date.getDay() === 5) ||
					[0, 6].includes(date.getDay()) ||
					(date.getHours() <= 10 && date.getMinutes() <= 30)
				) {
					desc = "Het hok is nog dicht, geen koffie.. 😭\r\n";
					imgurl =
						"https://rlv.zcache.nl/depresso_cute_sad_espresso_coffee_pun_ronde_sticker-r71004bcb2fd0423e8a27cddbbbfe845e_0ugmp_8byvr_736.jpg";
				}
				desc += `(Laatst geüpdated: ${json.payload.updated_at})`;

				const embed = new EmbedBuilder()
					.setColor(0x00ff00)
					.setTitle("Is het Hok al Open?")
					.setURL("http://ishethokalopen.nl/")
					.setDescription(desc)
					.setImage(imgurl);

				interaction.reply({ embeds: [embed] });
			});
	},
};
