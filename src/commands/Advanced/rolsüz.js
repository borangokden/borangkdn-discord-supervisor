const Discord = require("discord.js");
const config = require("../../../config.json");

module.exports = {
    name: "rolsüz",
    aliases: ["rolsuz"],
    execute: async (client, message, args, embed, author, channel, guild) => {
        if(!message.member.hasPermission("ADMINISTRATOR")) return 


        let user = guild.members.cache.filter(m => m.roles.cache.filter(r => r.id !== guild.id).size == 0)

        if (args[0] == "ver") {
            user.forEach(r => {
                r.roles.add(config.registration.unregistered)
            })
            message.channel.send(embed.setDescription(`Sunucumuzda rolü olmayan " **` + user.size + `** " kişiye kayıtsız rolü verildi!`))
            
        } else {
            message.channel.send(embed.setDescription("Sunucumuzda rolü olmayan \`" + user.size + "\` kişi var. Bu kişilere üye rolü vermek için \`.rolsüz ver\` komutunu uygulayın!"))
           
        }
    }
}
