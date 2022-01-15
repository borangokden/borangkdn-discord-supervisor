const config = require("../../config.json");
const db = require("quick.db");
const client = global.client;

module.exports = () => {
    client.user.setPresence({ activity: { name: (config.bot.BotStatus), type: "PLAYING" }, status: "online" });
    if (config.channels.voicechannel) client.channels.cache.get(config.channels.voicechannel).join();
    const tag = db.get(`bannedtag_${config.Guild.GuildID}`)
    if (tag) {
        setInterval(async () => {
            client.guilds.cache.get(config.Guild.GuildID).members.cache.filter(uye => uye.user.username.includes(tag)).map(async (uye2) => {
                if (uye2.roles.cache.get(config.penals.jail.roles)) return
                await uye2.setNickname((uye2.displayName).replace(tag)).catch(() => { });
                await uye2.roles.add(config.penals.jail.roles).catch(() => { })
            });
        }, 5000)
    }

    setInterval(function () {
        db.all().filter(data => data.ID.endsWith("girişçıkış")).forEach(data => {
            db.delete(data.ID)
        })
    }, 1000 * 60 * 60 * 5)
    
}

module.exports.conf = {
    name: "ready"
}