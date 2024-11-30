import { errorHandler } from "./function"
import { Client } from "discord.js"
import config from "./config"
import events from "./events"

export const client = new Client({ intents: ["Guilds"] })

client.login(config.token)
process.on("uncaughtException", (err: Error, origin: string) => error("Uncaught Exception", err, origin))
process.on("unhandledRejection", (reason: Error, origin: string) => error("Unhandled Rejection", reason, origin))
process.on("uncaughtExceptionMonitor", (err: Error, origin: string) => error("Uncaught Exception", err, origin))
events.forEach((func, name) => (typeof func === "function" ? client.on(name, (...arg) => func(...arg, client)) : null))

function error(type: string, error: Error, origin: any) {
    if (error.message === "getaddrinfo ENOTFOUND discord.com") return console.log(error.stack)
    if (error.message === "getaddrinfo EAI_AGAIN discord.com") return console.log(error.stack)
    errorHandler(error, type, origin)
}
