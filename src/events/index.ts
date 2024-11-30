import { ClientEvents } from "discord.js"
import interactionCreate from "./interactionCreate"
import ready from "./ready"

export default new Map<keyof ClientEvents, (...arg: any) => any>([
    ["interactionCreate", interactionCreate],
    ["ready", ready]
])
