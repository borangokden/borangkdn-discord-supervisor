const Discord = require("discord.js");
const db = require("quick.db");
const config = require("../../../config.json")
module.exports = {
    name: "unregistered",
    aliases: ["unreg", "ks", "kayıtsız"],
    execute: async (client, message, args, embed, author, channel, guild) => {
    if (!message.member.roles.cache.has(config.registration.staff) && !message.member.hasPermission("ADMINISTRATOR")) return channel.send(embed.setDescription("Komutu kullanabilmek için geçerli yetkin olmalı"));
 let kullanıcı = message.guild.member(message.mentions.users.first() || message.guild.members.cache.get(args[0]));
  if (!kullanıcı) return message.channel.send(embed.setDescription(`Geçerli bir kullanıcı belirtmelisin!`))
  let user = message.mentions.users.first();
  let rol = message.mentions.roles.first()
  let member = message.guild.member(kullanıcı)
  message.guild.members.cache.get(member.id).roles.cache.forEach(r => {
message.guild.members.cache.get(member.id).roles.remove(r)

})
  member.roles.set((config.registration.unregistered))
  member.setNickname(config.registration.autonickname);
  message.channel.send(embed.setDescription(`${member} kullanıcı başarıyla kayıtsıza (<@&${config.registration.unregistered}>) atıldı!`))

}


  }
