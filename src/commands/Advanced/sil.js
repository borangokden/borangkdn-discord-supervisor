module.exports = {
    name: "sil",
    aliases: ["temizle", "sil"],
    execute: async (client, message, args, embed, author, channel, guild) => {
        if (!message.member.hasPermission("MANAGE_MESSAGES")) return channel.error(message, "Komutu kullanabilmek için geçerli yetkin olmalı.")
        if (!args[0]) return channel.error(message, "Geçerli bir rakam belirtiniz.")
        if (isNaN(args[0])) return channel.error(message, "Geçerli bir sayı belirt!")
        channel.bulkDelete(args[0]).then(() => {
            channel.send(`${args[0]} mesaj silindi!`)
        })
    }
}