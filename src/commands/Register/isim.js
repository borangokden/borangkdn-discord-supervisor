const config = require("../../../config.json")
const db = require("quick.db");

module.exports = {
    name: "isim",
    aliases: ["i", "nickname"],
    execute: async (client, message, args, embed, author, channel, guild) => {
        var member = message.mentions.users.first() || guild.members.cache.get(args[0]);
        var name = args[1]
        var age = args[2]
        if (!message.member.roles.cache.has(config.registration.staff) && !message.member.hasPermission("ADMINISTRATOR")) return channel.send(embed.setDescription("Komutu kullanabilmek için geçerli yetkin olmalı"));
        if (!member) return channel.send(embed.setDescription("Geçerli bir kullanıcı belirtmelisin!"))
        if (!name) return channel.send(embed.setDescription("Geçerli bir isim belirtmelisin!"))
        if (!age) return channel.send(embed.setDescription("Geçerli bir yaş belirtmelisin!"))
        if (isNaN(age)) return channel.send(embed.setDescription("Yaş geçerli rakamlardan oluşsun!"))
        if (age < config.registration.minage) return channel.send(embed.setDescription("Kullanıcı için belirtilen yaş minimum yaştan küçük!"))
        db.push(`isimler_${member.id}`, ` \`${config.registration.TagSymbol} ${name} ${config.registration.symbol} ${age}\` İsim Değiştirme`);
        await guild.members.cache.get(member.id).setNickname(`${config.registration.TagSymbol} ${name} ${config.registration.symbol} ${age}`);
        channel.send(embed.setDescription(`Kullanıcının ismi \`${config.registration.TagSymbol} ${name} ${config.registration.symbol} ${age}\` olarak değiştirildi!`)).catch(err => console.log(err), client.ytick(message)).then(m => m.delete({timeout: 10000}));
    }
}