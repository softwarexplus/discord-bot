import { Client } from "discord.js"
import { command } from "./command"
import { status } from "./status"

export default async function run(client: Client<true>) {
    console.log(`${client.user.tag} is online`)
    command(client)
    status(client)
}
