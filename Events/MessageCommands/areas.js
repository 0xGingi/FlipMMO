const { ActionRowBuilder, ButtonBuilder, EmbedBuilder, Message, Events, ButtonStyle, ComponentType } = require('discord.js');
const Areas2 = require('../../config/areas.json');
const { inlineCode } = require('@discordjs/builders');
const { prefix } = require('../../App/config.json')
const EMOJICONFIG = require('../../config/emoji.json');

module.exports = {
  	name: Events.MessageCreate,
	/**
   	 * @param {Message} message
   	*/
	   async execute(message, args, commandName) {
		//const args = message.content.slice(prefix.length).trim().split(/ +/);
		//const commandName = args.shift().toLowerCase();
		if (message.content.toLowerCase() && this.info.names.some(name => commandName === name)) {

            const itemEmbeds = [];

            for (let i = 0; i < Areas2.length; i += 12) {
                const current = Areas2.slice(i, i + 12);


            var embed = new EmbedBuilder()
                .setColor(0x0099FF)
                .setTitle('All Areas')
                .setDescription('Here are all the areas you can visit:')
                .setTimestamp();


            current.sort((a, b) => a.level - b.level).forEach(area => {
            embed.addFields(
                    { name: area.name, value: `Level: ${area.level}`, inline: true }
                );
            });

            itemEmbeds.push(embed);
        }

        var messageEmbed = await message.reply({ embeds: [itemEmbeds[0]], components: [new ActionRowBuilder().addComponents(
            new ButtonBuilder().setCustomId('previous').setLabel('Previous').setStyle(ButtonStyle.Secondary),
            new ButtonBuilder().setCustomId('next').setLabel('Next').setStyle(ButtonStyle.Secondary),
            )] });  

            const filter = (interaction) => interaction.user.id === message.author.id;
            const collector = messageEmbed.createMessageComponentCollector({ filter, time: 60000 });
            let currentPage = 0;
            //const msg = await message.reply({ embeds: [itemEmbeds[currentPage]], components: [row] });


collector.on('collect', async (interaction) => {
    if (interaction.user.id !== message.author.id) return;

    if (interaction.customId === 'previous') {
        if (currentPage > 0) currentPage--;
    } else if (interaction.customId === 'next') {
        if (currentPage < itemEmbeds.length - 1) currentPage++;
    }
    await interaction.update({ embeds: [itemEmbeds[currentPage]] });
    });

   // await interaction.update({ embeds: [itemEmbeds[currentPage]] });
} },

	info: {
		names: ['areas', 'allareas', 'area']
	}
}