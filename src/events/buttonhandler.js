const config = require("../../config.json");
const db = require("quick.db");
const moment = require("moment");
moment.locale("tr")

module.exports = async button => {
    if (button.id === "Giveaway") {
        if (button.clicker.member.roles.cache.get(config.buttons.giveaway)) {
            await button.clicker.member.roles.remove(config.buttons.giveaway);
            await button.reply.think(true);
            await button.reply.edit("Çekiliş Katılımcısı rolü başarıyla üzerinizden alındı!");
        } else {
            await button.clicker.member.roles.add(config.buttons.giveaway);
            await button.reply.think(true);
            await button.reply.edit("Çekiliş Katılımcısı rolünü başarıyla aldınız!");
        }
    };

    if (button.id === "Activity") {
        if (button.clicker.member.roles.cache.get(config.buttons.activity)) {
            await button.clicker.member.roles.remove(config.buttons.giveaway);
            await button.reply.think(true);
            await button.reply.edit("Etkinlik Katılımcısı rolü başarıyla üzerinizden alındı!");
        } else {
            await button.clicker.member.roles.add(config.buttons.activity);
            await button.reply.think(true);
            await button.reply.edit("Etkinlik Katılımcısı rolünü başarıyla aldınız!");
        }
    };

    if (button.id === "one") {
        const names = db.get(`isimler_${button.clicker.id}`)
        await button.reply.think(true);
        if (!names) return button.reply.edit("Sunucumuza daha önce kayıt olmamışsınız.")
        await button.reply.edit(`Sunucumuza daha önceden kayıt olduğunuz isimler:\n${names.map((data, n) => `**${n + 1}.** ${data}`).join("\n")}`);
    };

    if (button.id === "two") {
        const kke = db.get(`kke_${button.clicker.id}`)
        await button.reply.think(true)
        if (!kke) return button.reply.edit("Sunucumuza daha önce kayıt olmamışsınız.")
        await button.reply.edit(`Sunucumuza daha önceden kayıt olurken sizi kayıt eden yetkililerimiz:\n${kke.map(data => `${data}`).join("\n")}!`)
    };

    if (button.id === "three") {
        const sicil = db.get(`sicil_${button.clicker.id}`);
        const points = db.get(`points_${button.clicker.id}`) || 0
        await button.reply.think(true);
        if (!sicil) return button.reply.edit("Herhangi bir sicil geçmişiniz bulunmamakta!");
        await button.reply.edit(`Toplam ceza puanınız: ${points}, aldığınız cezalar: ${sicil.map(data => `${data}`).join("\n")}!`)
    };

    if (button.id === "four") {
        await button.reply.think(true);
        await button.reply.edit(`${button.clicker.member.roles.cache.filter(xd => xd.name !== "@everyone").map(x => x).join("\n")}`);
    };

    if (button.id === "five") {
        const guild = button.guild.joinedAt
        await button.reply.think(true);
        await button.reply.edit(`Sunucumuza ${moment(guild).format("LLL")} tarihinde katılmışsınız.`)
    }

}

module.exports.conf = {
    name: "clickButton"
}