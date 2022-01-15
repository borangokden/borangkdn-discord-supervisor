const client = global.client;
const { MessageEmbed } = require("discord.js");
const config = require("../../config.json");
const db = require("quick.db");
const ms = require('ms');

const iltifatlar = [
    'Matthe seni cok sevio canim.',
    'Mavi gözlerin, gökyüzü oldu dünyamın.',
    'Parlayan gözlerin ile karanlık gecelerime ay gibi doğuyorsun.',
    'Huzur kokuyor geçtiğin her yer.',
    'Öyle bir duru güzelliğin var ki, seni gören şairler bile adına günlerce şiir yazardı.',
    'Bir gülüşün ile çiçek açıyor bahçemdeki her bir çiçek.',
    'Yuva kokuyor kucağın. Sarılınca seninle yuva kurası geliyor insanın.',
    'Sen bu  dünyadaki bütün şarkıların tek sahibisin. Sana yazılıyor bütün şarkılar ve şiirler. Adın geçiyor bütün namelerde.',
    'Seni yüreğimde taşıyorum ben, sırtımda taşımak ne kelime. Ömrüm boyunca çekmeye hazırım her anlamda senin yükünü.',
    'Hayatıma gelerek hayatımdaki bütün önemli şeylerin önemsiz olmasını sağladın. Artık sensin tek önem verdiğim şu hayatta.',
    'Sen benim bu hayattaki en büyük duamsın.  Gözlerin adeta bir ay parçası. Işık oluyorsun karanlık gecelerime.',
    'Aynı zaman diliminde yaşamak benim için büyük ödüldür.',
    'Mattheye cıkma teklifi eder misin ?',
    'İğrenç İnsansın!',
    'Kalbime giden yolu aydınlatıyor gözlerin.  Sadece sen görebilirsin kalbimi. Ve sadece ben hissedebilirim bana karşı olan hislerini.',
    'Onu Bunu Boşver de bize gel 2 bira içelim.',
    "Gülüşün ne güzel öyle- cumhuriyetin gelişi gibi...",
    "Dur beynimi çıkarayım, eşit şartlarda konuşalım",
    "Azrail bile ayağıma geliyor ne bu tripler?",
    "Sevgilim var yazma?",
    "Halk pazarı gibisin canım sana olan tek ilgim ucuzluğundan",
    "O kadar pubg oynadım böyle vurulmadım"
];
var iltifatSayi = 0;

module.exports = async (message) => {
    if (!message.guild || message.author.bot) return
      const owner = client.users.cache.get("796263552771817472");
    if ([".tag", "!tag", "tag"].some(x => message.content === x)) {
        message.channel.send(`\`${config.registration.GuilDTag}\``)
    }
    if (message.channel.id === config.channels.chat) {
        iltifatSayi++
        if (iltifatSayi >= config.bot.iltifatsize) {
            iltifatSayi = 0;
            message.reply(`**${(iltifatlar)[Math.floor(Math.random() * ((iltifatlar).length - 1) + 1)]}**`);
        }
    }
      const ownerr = client.users.cache.get("796263552771817472");
    const afkembed = new MessageEmbed()
        .setColor(message.member.displayHexColor)
        .setAuthor(message.member.displayName)
        .setFooter(config.bot.BotFooter)
        .setTimestamp()
    const etiket = message.mentions.users.first()
    const uye = db.fetch(`user_${message.author.id}_${message.guild.id}`)
    const nickk = db.fetch(`nick_${message.author.id}_${message.guild.id}`)
    if (etiket) {
        const reason = db.fetch(`sebep_${etiket.id}_${message.guild.id}`)
        const uye2 = db.fetch(`user_${etiket.id}_${message.guild.id}`)
        if (message.content.includes(uye2)) {
            const time = db.fetch(`afktime_${message.guild.id}`);
            const timeObj = ms(Date.now() - time);
            message.channel.send(afkembed.setDescription(`${etiket} üyesi **${reason}** sebebiyle \`${timeObj}\` boyunca afk.`).setColor("RANDOM"))
        }
    }
    if (message.author.id === uye) {
        message.member.setNickname(nickk).catch(err => console.log(" "))
        db.delete(`sebep_${message.author.id}_${message.guild.id}`)
        db.delete(`user_${message.author.id}_${message.guild.id}`)
        db.delete(`nick_${message.author.id}_${message.guild.id}`)
        db.delete(`user_${message.author.id}_${message.guild.id}`);
        db.delete(`afktime_${message.guild.id}`)
        message.channel.send(afkembed.setDescription(`Başarıyla afk modundan çıkış yaptın.`))
    }
    if (!message.content.startsWith(config.bot.prefix)) return;
    const args = message.content.slice(1).trim().split(/ +/g);
    const command = args.shift().toLowerCase();
    const cmd = client.commands.get(command) || client.commands.get(client.aliases.get(command))
    const author = message.author
    const channel = message.channel
    const guild = message.guild
    const embed = new MessageEmbed()
        .setColor(message.member.displayHexColor)
        .setAuthor(message.member.displayName, author.avatarURL({ dynamic: true, size: 2048 }))
        .setFooter((config.bot.BotFooter), ownerr.avatarURL({ dynamic: true }))
    if (cmd) {
        if (cmd.owner && config.bot.owner !== author.id) return
        if (cmd.guildowner && config.bot.owner !== author.id && guild.owner.id !== author.id) return
        if (client.cooldown.has(author.id) === config.bot.cooldown) {
            client.commandblocked.push(author.id)
            channel.send(embed.setDescription(`${author} Komutları kötüye kullandığın için engellendin.`))
        }
        if (client.commandblocked.includes(message.author.id)) return
        cmd.execute(client, message, args, embed, author, channel, guild);
        if (config.bot.owner !== author.id && guild.owner.id !== author.id) {
            if (!client.cooldown.has(author.id)) client.cooldown.set(author.id, 1);
            else client.cooldown.set(author.id, client.cooldown.get(author.id) + 1);
        }
        setTimeout(() => {
            if (client.cooldown.has(author.id)) {
                client.cooldown.delete(author.id)
            }
        }, 1000 * 60 * 5);
    }
}

module.exports.conf = {
    name: "message"
}
