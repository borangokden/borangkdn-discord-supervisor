const config = require("../../config.json");

module.exports = async (oldState, newState) => {
    const log = client.channels.cache.get(config.logs.voicelog);
    if (!log) return;
    if (!oldState.channel && newState.channel) return log.send(`${newState.member.displayName} kullanıcısı \`${newState.channel.name}\` adlı sesli kanala girdi!`);
    if (oldState.channel && !newState.channel) return log.send(`${newState.member.displayName} kullanıcısı \`${oldState.channel.name}\` adlı sesli kanaldan ayrıldı!`);
    if (oldState.channel.id && newState.channel.id && oldState.channel.id != newState.channel.id) return log.send(`${newState.member.displayName} kullanıcısı ses kanalını değiştirdi! (\`${oldState.channel.name}\` => \`${newState.channel.name}\`)`);
    if (oldState.channel.id && oldState.selfMute && !newState.selfMute) return log.send(`${newState.member.displayName} kullanıcısı \`${newState.channel.name}\` adlı sesli kanalda kendi susturmasını kaldırdı!`);
    if (oldState.channel.id && !oldState.selfMute && newState.selfMute) return log.send(`${newState.member.displayName} kullanıcısı \`${newState.channel.name}\` adlı sesli kanalda kendini susturdu!`);
    if (oldState.channel.id && oldState.selfDeaf && !newState.selfDeaf) return log.send(`${newState.member.displayName} kullanıcısı \`${newState.channel.name}\` adlı sesli kanalda kendi sağırlaştırmasını kaldırdı!`);
    if (oldState.channel.id && !oldState.selfDeaf && newState.selfDeaf) return log.send(`${newState.member.displayName} kullanıcısı \`${newState.channel.name}\` adlı sesli kanalda kendini sağırlaştırdı!`);
    if (oldState.channel.id && !oldState.streaming && newState.channel.id && newState.streaming) return log.send(`${newState.member.displayName} kullanıcısı \`${newState.channel.name}\` adlı sesli kanalda yayın açtı!`)
    if (oldState.channel.id && oldState.streaming && newState.channel.id && !newState.streaming) return log.send(`${newState.member.displayName} kullanıcısı \`${newState.channel.name}\` adlı sesli kanalda yayını kapattı!`)
    if (oldState.channel.id && !oldState.selfVideo && newState.channel.id && newState.selfVideo) return log.send(`${newState.member.displayName} kullanıcısı \`${newState.channel.name}\` adlı sesli kanalda kamerasını açtı!`)
    if (oldState.channel.id && oldState.selfVideo && newState.channel.id && !newState.selfVideo) return log.send(`${newState.member.displayName} kullanıcısı \`${newState.channel.name}\` adlı sesli kanalda kamerasını kapattı!`)
}

module.exports.conf = {
    name: "voiceStateUpdate"
}