import { APIEmbed, ChannelType, Client, GatewayIntentBits, WebhookClient } from "discord.js";
import config from "./config";
import events from "./events";

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.login(config.token);
process.on("uncaughtException", (err: Error, origin: string) => error("Uncaught Exception", err, origin));
process.on("unhandledRejection", (reason: Error, origin: string) => error("Unhandled Rejection", reason, origin));
process.on("uncaughtExceptionMonitor", (err: Error, origin: string) => error("Uncaught Exception", err, origin));
events.forEach((func, name) => (typeof func === "function" ? client.on(name, (...arg) => func(...arg, client)) : null));

function error(type: string, error: Error, origin: any) {
    console.trace(error, origin);
    if (error.message === "getaddrinfo ENOTFOUND discord.com") return;

    const embed: APIEmbed = {
        color: 0x5865f2,
        title: type,
        description: "```js\n" + error.stack + "\n```",
        timestamp: new Date().toISOString()
    };

    const Logger = new WebhookClient({ url: config.webhook });
    Logger.send({ embeds: [embed] });
}
