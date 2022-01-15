const db = require("quick.db");

module.exports = async (guild, user) => {
    if (db.get(`ban.${user.id}`) === true) guild.members.ban(user.id, { reason: "Açılmaz banke." });
    if (db.get(`tban_${user.id}`)){guild.members.ban(user.id, {reason: "Süreli Ban."})};
}

module.exports.conf = {
    name: "guildBanRemove"
}