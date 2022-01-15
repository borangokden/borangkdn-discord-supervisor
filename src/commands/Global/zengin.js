const config = require("../../../config.json");
const db = require("quick.db");

module.exports = {
  name: "zengin",
  aliases: ["booster"],
  execute: async (client, message, args, embed, author, channel, guild) => {
    if (!message.member.roles.cache.has(config.roles.boosterrole)) return channel.error(message, "Komutu kullanabilmek için geçerli booster olman gerek.")
    let name = args.slice(0).join(' ');
    if (!name) return channel.error(message, `Geçerli bir kullanıcı adı giriniz!`)
    if (name.length > 32) return channel.error(message, `**32** karakteri geçmeyen bir isim belirtiniz!`)
    guild.members.cache.get(author.id).setNickname(name).then(x => channel.send(embed.setDescription(`Kullanıcı adın **${name}** olarak değiştirildi!`), client.tick(message)), db.push(`isimler_`, (`${name} (Booster)`))).catch(err => console.log(err), client.ytick(message))
  }
}