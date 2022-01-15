const config = require("../../../config.json")
module.exports = {
    name: "ban-bilgi",
    aliases: ["bansor"],
    execute: async (client, message, args, embed, author, channel, guild) => {
        if (!message.member.hasPermission("BAN_MEMBERS") && message.member.roles.cache.has(config.penals.ban.staff)) return channel.error(message, "Komutu kullanabilmek için geçerli yetkin olmalı.")

        let kullanici = args[0];

        if (!kullanici) return channel.error(message, "Geçerli bir kullanıcı ID belirtmelisin!")

        guild.fetchBans()

            .then(bans => {

                if (!bans.has(kullanici)) {

                    return channel.error(message, `Belirttiğiniz kullanıcı banlanmamış.`)

                }

            })

        guild.fetchBan(kullanici).then(({ user, reason }) => {

            channel.send(embed.setDescription(`${user.tag} kullanıcısının ban sebebi: **${reason}**`))



        })

    }
}