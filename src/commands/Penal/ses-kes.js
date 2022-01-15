const Discord = require("discord.js");
const moment = require("moment");
const config = require("../../../config.json")

module.exports = {
    name: "ses-kes",
    aliases: ["seskes", "sk", "kes"],
    execute: async (client, message, args, embed, author, channel, guild) => {
  
if (!message.member.roles.cache.has(config.penals.ban.staff) && !message.member.hasPermission("ADMİNİSTRATOR")) return channel.send(embed.setDescription("Komutu kullanabilmek için geçerli yetkin olmalı."));
  
const kanal = message.member.voiceChannel
const member = message.guild.member(message.mentions.members.first() || message.guild.members.cache.get(args[0]));
if (!member) return channel.send(embed.setDescription(`Geçerli bir kullanıcı belirtmelisin!`))
if(!member.voice.channel) return channel.send(embed.setDescription(`Kullanıcı sesli kanallarda bulunmamakta!`))
if(message.member.roles.highest.position <= member.roles.highest.position) return channel.send(embed.setDescription(`Aynı veya yüksek yetki!`))
message.guild.member(member.id).voice.setChannel(null)
 
   channel.send(embed.setDescription(`${member} kullanıcısının bağlantısı kesildi.`))
}

 }

