import { ChatInputCommandInteraction, RESTPostAPIApplicationCommandsJSONBody } from "discord.js"

export const data: RESTPostAPIApplicationCommandsJSONBody = {
    name: "ping",
    description: "Pong"
}

export async function run(interaction: ChatInputCommandInteraction) {
    await interaction.deferReply()
    const reply = await interaction.fetchReply()
    const ping = reply.createdTimestamp - interaction.createdTimestamp
    interaction.followUp({
        embeds: [
            {
                color: 0x5865f2,
                description: `Pong! Client: ${ping}ms \nWebsocket: ${interaction.client.ws.ping}ms`
            }
        ]
    })
}
