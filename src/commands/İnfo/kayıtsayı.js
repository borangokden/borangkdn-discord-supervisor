const db = require("quick.db");
module.exports = {
    name: "kayıtsayı",
    aliases: ["teyitler", "kayıtsayım"],
    execute: async (client, message, args, embed, author, channel, guild) => {
        var member = message.mentions.users.first() || client.fetchUser(args[0]) || author;
        let erkek = db.get(`erkek_${author.id}`) || 0;
        let kadın = db.get(`kadın_${author.id}`) || 0;
        let toplam = db.get(`toplam_${author.id}`) || 0;
        channel.send(embed.setDescription(`
 Toplam Kayıt: **${toplam}**
 
 Erkek Kayıt: **${erkek}**
 Kadın Kayıt: **${kadın}**`))
    }
}