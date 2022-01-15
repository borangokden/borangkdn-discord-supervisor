module.exports = {
    name: "nerede",
    aliases: ["ss", "n"],
    execute: async (client, message, args, embed, author, channel, guild) => {
        let user = message.mentions.members.first() || guild.members.cache.get(args[0])
        if (!user) return channel.error(message, "Geçerli bir kullanıcı etiketle!")
        let sonuc; if (!user.voice.channelID) sonuc = `**${user}** kullanıcısı herhangi bir ses kanalında değil.`; if (user.voice.channelID) sonuc = `${user} kullanıcısı \`${user.voice.channel.name}\` isimli sesli odada.`
        channel.send(embed.setDescription(sonuc))
    }
}