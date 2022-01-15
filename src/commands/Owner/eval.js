const config = require("../../../config.json");

module.exports = {
    name: "eval",
    aliases: [],
    owner: true,
    execute: async (client, message, args, embed, author, channel, guild) => {
        if (!args[0]) return channel.send(embed.setDescription("Kod belirtmelisin!"))
        let code = args.join(" ");

        try {
            var result = clean(await eval(code));
            if (result.includes(client.token))
                return channel.send("ytb matthe token wermezz zaa");
            channel.send(result, { code: "js", split: true });
        } catch (err) {
            channel.send(err, { code: "js", split: true });
        }
    },
};

function clean(text) {
    if (typeof text !== "string")
        text = require("util").inspect(text, { depth: 0 });
    text = text
        .replace(/`/g, "`" + String.fromCharCode(8203))
        .replace(/@/g, "@" + String.fromCharCode(8203));
    return text;
}