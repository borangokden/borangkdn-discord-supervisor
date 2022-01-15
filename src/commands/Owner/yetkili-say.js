const config = require("../../../config.json")
module.exports = {
  name: "yetkili-say",
  aliases: ["ysay"],
  execute: async (client, message, args, embed, author, channel, guild) => {
    if (message.member.hasPermission('ADMINISTRATOR')) {
      let matthe = args[0];

      let sesdedeğil = message.guild.members.cache.filter(x => x.roles.cache.has(config.registration.staff)).filter(y => !y.voice.channel && y.presence.status != "offline")
      message.channel.send(`
        Aktif olup seste olmayan yetkililer:
    ${sesdedeğil.map(s => `${s} \`${s.user.tag}\``).join('\n')}`)
    } else
      return message.channel.send(`Bu komutu kullanabilmek için öncelikle gerekli yetkin olmalı!`)
  }
}