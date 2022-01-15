const Discord = require('discord.js');
const db = require('quick.db');
const config = require("../../../config.json")
const limit = new Map();
const moment = require("moment");
moment.locale("tr");
const ms = require("ms")
module.exports = {
  name: "kayıt-sıfırla",
  aliases: ["kayıt-sifirla"],
  execute: async (client, message, args, embed, author, channel, guild) => {
    
if (!message.member.roles.cache.has(config.bot.owner) && !message.member.hasPermission("ADMİNİSTRATOR")) return channel.send(embed.setDescription("Komutu kullanabilmek için geçerli yetkin olmalı."));
  
let member = message.guild.member(message.mentions.users.first() || message.guild.members.cache.get(args[0]));
if(!member) channel.send(embed.setDescription(`Geçerli bir kullanıcı belirtmelisin!`))

if (!member) {
let erkek = db.delete(`erkek_${member}`) || [];
let kadın = db.delete(`kadın_${member}`) || [];
let toplam = db.delete(`toplam_${member}`) || [];
channel.send(embed.setDescription(`Kayıt verilerin silindi.`))
}
  
if(member) {
let erkek = db.delete(`erkek_${member}`) || [];
let kadın = db.delete(`kadın_${member}`) || [];
let toplam = db.delete(`toplam_${member}`) || [];
channel.send(embed.setDescription(`${member} kullanıcısının kayıt verileri başarıyla silindi.`))

};
  
}
  

  }
