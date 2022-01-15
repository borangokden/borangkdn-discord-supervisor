const Discord = require("discord.js")
const config = require("../../../config.json");
module.exports = {
    name: "avatar",
    aliases: ["avatar", "pp"],
    execute: async (client, message, args, embedcik, author, channel, guild) => {
        let user = message.mentions.users.first() || message.author;
  if (user) {
    const embed = new Discord.MessageEmbed()
      .setAuthor(`${user.tag} Avatar:`)
      .setImage(user.displayAvatarURL({ dynamic: true }))
      .setTimestamp()
      .setFooter("YOUTUBE BORANGKDN", message.guild.iconURL())
    message.channel.send(embed);
  } else {
    const embed = new Discord.MessageEmbed()
      .setAuthor(
        `${message.author.tag} Avatar:`,
        message.author.avatarURL
      )
      .setImage(message.author.avatarURL({ dynamic: true }))
      .setTimestamp()
      .setFooter("YOUTUBE BORANGKDN", message.guild.iconURL())
    message.channel.send(embed);

  }
    }
}
