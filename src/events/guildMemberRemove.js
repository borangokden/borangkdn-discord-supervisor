const db = require("quick.db");

module.exports = async function(member) {
    if (member.user.bot) return
    db.set(`roles_${member.id}`, member.roles.cache.map(x => x.id))
    db.set(`isim_${member.id}`, member.displayName)
}

module.exports.conf = {
    name: "guildMemberRemove"
}