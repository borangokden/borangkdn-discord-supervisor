const Discord = require("discord.js");
const config = require("../../../config.json");

module.exports = {
    name: "rolsüz",
    aliases: ["rolsuz"],
    execute: async (client, message, args, embed, author, channel, guild) => {
        if(!message.member.hasPermission("ADMINISTRATOR")) return 


        let user = guild.members.cache.filter(m => m.roles.cache.filter(r => r.id !== guild.id).size == 0)

        if (args[0] == "ver") {
            user.forEach(r => {
                r.roles.add(config.registration.unregistered)
            })
            const info = new Discord.MessageEmbed()
                .setAuthor(" " + author.username + " ", author.avatarURL())
                .setColor("RANDOM")
                .setFooter("YOUTUBE BORANGKDN", message.guild.iconURL())
                .setDescription(`Sunucumuzda rolü olmayan " **` + user.size + `** " kişiye kayıtsız rolü verildi!`)
            return channel.send(info)
        } else {
            const use = new Discord.MessageEmbed()
                .setAuthor("" + author.username + " ", author.avatarURL())
                .setColor("RANDOM")
                .setFooter("YOUTUBE BORANGKDN", message.guild.iconURL())
                .setDescription("Sunucumuzda kayıtsız rolü olmayan \`" + user.size + "\` kişi var.")
            return channel.send(use)
        }
    }
}