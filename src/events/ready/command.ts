import { ApplicationCommandDataResolvable, Client } from "discord.js"
import { ChatInput, Context } from "../../interaction"

export async function command(client: Client<true>) {
    const commands: Array<ApplicationCommandDataResolvable> = []

    ChatInput.forEach((command) => {
        if (command.data && typeof command.data.name === "string") {
            if (/^[a-z\-_]{1,32}$/.test(command.data.name)) {
                commands.push(command.data)
            } else {
                console.log(`Invalid command`, command.data.name)
            }
        }
    })

    Context.forEach((context) => {
        if (context.data && typeof context.data.name === "string") commands.push(context.data)
    })

    try {
        await client.application.commands.set(commands)
        console.log(`Successfully reloaded ${commands.length} application (/) commands.`)
    } catch (error) {
        console.trace(error)
    }
}
