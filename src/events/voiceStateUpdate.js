clint = global.client;

module.exports = async function(___, newState) {
       //---SELFDEAF
       if (
        newState.member.user.bot &&
        newState.channelID &&
        newState.member.user.id == client.user.id && !newState.selfDeaf
    ) return newState.setSelfDeaf(true);

    //---SELFMUTE
    if (
        newState.member.user.bot &&
        newState.channelID &&
        newState.member.user.id == client.user.id && !newState.selfMute
    ) return newState.setSelfMute(true);
}

module.exports.conf = {
    name: "voiceStateUpdate"
}