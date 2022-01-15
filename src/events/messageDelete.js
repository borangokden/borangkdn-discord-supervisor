const config = require("../../config.json");
const db = require("quick.db");
const moment = require("moment");
const { MessageEmbed } = require("discord.js")

moment.locale("tr")

module.exports = async message => {
    if (message.channel.type === "dm" || !message.guild || message.author.bot) return;
    const snipe = {
        icerik: message.content,
        yazar: message.author.id,
        yazilmaTarihi: message.createdTimestamp,
        silinmeTarihi: Date.now(),
    }
    await db.set(`snipe.${message.guild.id}.${message.channel.id}`, snipe)
    const channel = message.guild.channels.cache.get(config.logs.messagelog);
    if (!channel) return;
    const embed = new MessageEmbed()
        .setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true }))
        .setColor("RED")
        .setTitle(`${message.channel.name} kanalında bir mesaj silindi.`)
        .setDescription(message.content)
        .setFooter(`ID: ${message.author.id} • ${moment().calendar()}`);

    if (message.attachments.first()) embed.setImage(message.attachments.first().proxyURL);
    channel.send(embed);
}

module.exports.conf = {
    name: "messageDelete"
}